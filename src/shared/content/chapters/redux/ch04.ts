import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh04: Chapter = {
  id: 'redux-ch4',
  title: L('Asynchronous data flow', 'Асинхронный поток данных'),
  summary: L(
    'The three actions a createAsyncThunk dispatches, how a slice handles them, how to unwrap the result and read the error, how to cancel a request and how to poll, why the last request to start is not the last one to finish, and how to keep a whole request lifecycle inside one slice.',
    'Три действия, которые отправляет createAsyncThunk, как их обрабатывает слайс, как развернуть результат и прочитать ошибку, как отменить запрос и как опрашивать, почему последний начатый запрос не всегда последний завершённый и как держать весь жизненный цикл запроса в одном слайсе.'
  ),
  sections: [
    {
      id: 'redux-ch4-s1',
      title: L('The createAsyncThunk lifecycle', 'Жизненный цикл createAsyncThunk'),
      body: L(
        'Redux itself knows nothing about asynchronous work: a reducer is a pure function and has to stay one. Redux Toolkit therefore keeps the reducer pure and puts the asynchronous part into a thunk, a function that receives the dispatch and the getState and dispatches actions when it is done. createAsyncThunk is the typed version of that idea: you write the request, and the library writes the three actions around it.\n\nThose actions are pending, fulfilled and rejected, and their types are built from the name of the thunk and the name of the slice, in the form sliceName/thunkName/pending. A thunk declared as createAsyncThunk("users/fetchUser", ...) inside a slice called users produces the types users/fetchUser/pending, users/fetchUser/fulfilled and users/fetchUser/rejected. The payload creator receives the argument you dispatched the thunk with, and it may also receive a second object with the signal, the dispatch and the state.\n\nThe promise returned by dispatching a thunk is the handle on the whole operation. It resolves with the action, it carries an abort method, and it can be unwrapped to give the payload or to throw the error. Nothing about the request is hidden from the store: every step shows up in the action log, which is exactly what makes an asynchronous flow debuggable.',
        'Redux сам по себе ничего не знает про асинхронную работу: редьюсер — чистая функция, и им он и должен оставаться. Поэтому Redux Toolkit держит редьюсер чистым, а асинхронную часть выносит в thunk — функцию, которая получает dispatch и getState и отправляет действия, когда работа завершена. createAsyncThunk — типизированная версия этой идеи: вы пишете запрос, а библиотека пишет три действия вокруг него.\n\nЭто действия pending, fulfilled и rejected, и их типы собираются из имени thunk и имени слайса по схеме sliceName/thunkName/pending. Thunk, объявленный как createAsyncThunk("users/fetchUser", ...) внутри слайса users, даёт типы users/fetchUser/pending, users/fetchUser/fulfilled и users/fetchUser/rejected. Создатель payload получает аргумент, с которым вы отправили thunk, а вторым объектом — signal, dispatch и состояние.\n\nПромис, который возвращает dispatch thunk, — это ручка на всю операцию. Он разрешается действием, у него есть метод abort, и его можно развернуть, чтобы получить payload или выбросить ошибку. Ничто в запросе не скрыто от хранилища: каждый шаг виден в логе действий, и именно это делает асинхронный поток отлаживаемым.'
      ),
      bullets: [
        L('A thunk does the asynchronous work, the reducer stays pure.', 'Thunk делает асинхронную работу, а редьюсер остаётся чистым.'),
        L('Every thunk produces pending, fulfilled and rejected actions.', 'Каждый thunk даёт действия pending, fulfilled и rejected.'),
        L('The type strings are sliceName/thunkName/pending and so on.', 'Строки типов имеют вид sliceName/thunkName/pending и далее.'),
        L('The payload creator receives the argument of the dispatch.', 'Создатель payload получает аргумент, с которым отправили thunk.'),
        L('The promise returned by dispatch is the handle on the operation.', 'Промис, возвращённый dispatch, — это ручка на всю операцию.'),
      ],
      code: `import { createAsyncThunk } from '@reduxjs/toolkit';

interface User { id: string; name: string }

// The payload creator does the request, the library writes the actions.
export const fetchUser = createAsyncThunk<User, string>(
  'users/fetchUser',
  async (id, { signal }) => {
    const response = await fetch(\`/api/users/\${id}\`, { signal });
    if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);
    return (await response.json()) as User;
  },
);

// Dispatching it returns a promise that can be unwrapped or aborted.
const promise = dispatch(fetchUser('42'));`,
      table: {
        caption: L('The three actions of a thunk', 'Три действия thunk'),
        headers: [L('Action', 'Действие'), L('Payload', 'Payload'), L('Meta', 'Meta'), L('Meaning', 'Смысл')],
        rows: [
          [
            L('pending', 'pending'),
            L('The argument', 'Аргумент'),
            L('requestId', 'requestId'),
            L('The request started', 'Запрос начался'),
          ],
          [
            L('fulfilled', 'fulfilled'),
            L('The returned value', 'Возвращённое значение'),
            L('requestId, arg', 'requestId, arg'),
            L('The request succeeded', 'Запрос удался'),
          ],
          [
            L('rejected', 'rejected'),
            L('The reason, when there is one', 'Причина, если она есть'),
            L('requestId, arg, aborted', 'requestId, arg, aborted'),
            L('The request failed or was aborted', 'Запрос провалился или был отменён'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The thunk name is part of the type', 'Имя thunk входит в тип'),
          text: L(
            'The first argument of createAsyncThunk is the name of the operation, and it becomes the prefix of the three action types. Two thunks with the same name in different slices are still different actions, but two thunks with the same name in the same slice are not.',
            'Первый аргумент createAsyncThunk — имя операции, и оно становится префиксом трёх типов действий. Два thunk с одинаковым именем в разных слайсах всё равно разные действия, а два с одинаковым именем в одном слайсе — нет.'
          ),
        },
      ],
      takeaway: L(
        'A thunk writes the request, the library writes the three actions, and the promise you get back is the handle on all of it.',
        'Thunk пишет запрос, библиотека пишет три действия, а промис на выходе — ручка на всё это вместе.'
      ),
      seeAlso: [
        L('Section 4-2: handling pending, fulfilled and rejected', 'Секция 4-2: обработка pending, fulfilled и rejected'),
        L('Section 1-4: why reducers must be pure', 'Секция 1-4: почему редьюсеры должны быть чистыми'),
      ],
    },
    {
      id: 'redux-ch4-s2',
      title: L('Handling pending, fulfilled and rejected', 'Обработка pending, fulfilled и rejected'),
      body: L(
        'A slice handles the three actions of a thunk in extraReducers, and the reducer stays pure while the request runs. The pending action carries the argument of the thunk in meta.arg, the fulfilled action carries the payload in payload, and the rejected action carries a serialised error in error and the reason in payload. All three are ordinary actions, so they can be logged, replayed and inspected in the DevTools.\n\nThe state you keep for a request is small and explicit: a status, the data and the error message. Writing the status as a union of literals instead of three booleans removes the impossible combination in which loading and error are both true, and it makes the switch in the component exhaustive, so adding a status becomes a compile error in every place that handles it.\n\nThe pitfall is the missing case. If the slice handles fulfilled and rejected but not pending, the spinner never appears. If it handles pending but not rejected, the error is swallowed and the interface looks like it is loading forever. The three cases belong together, and a good check is that the rejected case ends with something the user can act on, not with a raw error object.',
        'Слайс обрабатывает три действия thunk в extraReducers, и редьюсер остаётся чистым, пока идёт запрос. Действие pending несёт аргумент thunk в meta.arg, действие fulfilled несёт payload в payload, а rejected несёт сериализованную ошибку в error и причину в payload. Все три — обычные действия, их можно логировать, воспроизводить и смотреть в DevTools.\n\nСостояние запроса должно быть небольшим и явным: статус, данные и сообщение об ошибке. Статус в виде объединения литералов вместо трёх булевых флагов убирает невозможное сочетание, где loading и error истинны одновременно, и делает switch в компоненте исчерпывающим: добавление нового статуса превращается в ошибку компиляции везде, где он обрабатывается.\n\nЛовушка — пропущенный случай. Если слайс обрабатывает fulfilled и rejected, но не pending, спиннер так и не появится. Если обрабатывает pending, но не rejected, ошибка проглатывается, и интерфейс выглядит так, будто грузится вечно. Три случая должны идти вместе, и хорошая проверка: случай rejected заканчивается чем-то, на что пользователь может отреагировать, а не сырым объектом ошибки.'
      ),
      bullets: [
        L('The three cases live in extraReducers of the slice that owns the data.', 'Три случая живут в extraReducers слайса, который владеет данными.'),
        L('pending carries the argument in meta.arg.', 'pending несёт аргумент в meta.arg.'),
        L('fulfilled carries the result in payload.', 'fulfilled несёт результат в payload.'),
        L('rejected carries a serialised error in error.', 'rejected несёт сериализованную ошибку в error.'),
        L('A status as a union of literals beats three booleans.', 'Статус как объединение литералов лучше трёх булевых флагов.'),
      ],
      code: `import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, type User } from './usersThunks';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UsersState {
  status: Status;
  user: User | null;
  error: string | null;
}

const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', user: null, error: null } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});`,
      table: {
        caption: L('What each action carries', 'Что несёт каждое действие'),
        headers: [L('Action', 'Действие'), L('Where the data is', 'Где данные'), L('What the slice does', 'Что делает слайс')],
        rows: [
          [
            L('pending', 'pending'),
            L('action.meta.arg', 'action.meta.arg'),
            L('Sets the status to loading', 'Ставит статус loading'),
          ],
          [
            L('fulfilled', 'fulfilled'),
            L('action.payload', 'action.payload'),
            L('Stores the data, sets succeeded', 'Сохраняет данные, ставит succeeded'),
          ],
          [
            L('rejected', 'rejected'),
            L('action.error.message', 'action.error.message'),
            L('Stores the message, sets failed', 'Сохраняет сообщение, ставит failed'),
          ],
          [
            L('all three', 'все три'),
            L('action.meta.requestId', 'action.meta.requestId'),
            L('Identifies which request the action belongs to', 'Показывает, к какому запросу относится действие'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The forgotten rejected case', 'Забытый случай rejected'),
          text: L(
            'A slice that handles pending and fulfilled looks correct until the first network error, and then the interface is stuck in the loading state forever. Write the rejected case in the same breath as the other two, even before the first failure arrives.',
            'Слайс, обрабатывающий pending и fulfilled, выглядит правильным до первой сетевой ошибки, а потом интерфейс навсегда застревает в состоянии загрузки. Пишите случай rejected вместе с остальными, ещё до того, как первая ошибка случится.'
          ),
        },
      ],
      takeaway: L(
        'Handle pending, fulfilled and rejected together, and keep a single status field instead of a set of booleans.',
        'Обрабатывайте pending, fulfilled и rejected вместе и держите одно поле статуса вместо набора булевых флагов.'
      ),
      seeAlso: [
        L('Section 4-1: the createAsyncThunk lifecycle', 'Секция 4-1: жизненный цикл createAsyncThunk'),
        L('Section 4-6: normalising a request inside a slice', 'Секция 4-6: нормализация запроса внутри слайса'),
      ],
    },
    {
      id: 'redux-ch4-s3',
      title: L('unwrapResult and error handling', 'unwrapResult и обработка ошибок'),
      body: L(
        'Dispatching a thunk returns a promise that resolves with an action, not with the data. The data is in action.payload, and when the request failed the promise still resolves: the failure is in action.error. Reading result.payload without checking the status is the trap, because a failed request gives you undefined where you expected an object, and the undefined travels further into the interface before anyone notices.\n\nThere are two ways to handle it. The unwrap method on the returned promise throws the error when the thunk was rejected and gives the payload when it was fulfilled, which pairs naturally with try and catch. The unwrapResult function does the same for an action you already have, which is the right tool when the action travelled through the middleware first and you want to unwrap it somewhere else.\n\nThe error a thunk rejects with is serialised into a plain object, because an action has to stay serialisable. The message and the stack survive as strings, but the class does not: an error that was an instance of a custom error type arrives as a plain SerializedError. That is why the rejection handler should check the shape of the error instead of relying on instanceof.',
        'Отправка thunk возвращает промис, который разрешается действием, а не данными. Данные лежат в action.payload, а когда запрос провалился, промис всё равно разрешается: ошибка находится в action.error. Чтение result.payload без проверки статуса — ловушка, потому что провалившийся запрос отдаёт undefined вместо объекта, и этот undefined уходит дальше в интерфейс, прежде чем его заметят.\n\nОбработать это можно двумя способами. Метод unwrap у возвращённого промиса выбрасывает ошибку, когда thunk был отклонён, и отдаёт payload, когда был выполнен, — он естественно сочетается с try и catch. Функция unwrapResult делает то же самое с уже имеющимся действием, и она подходит, когда действие прошло через middleware и его разворачивают в другом месте.\n\nОшибка, которой thunk отклоняется, сериализуется в обычный объект, потому что действие должно оставаться сериализуемым. Сообщение и стек сохраняются строками, а класс — нет: ошибка, бывшая экземпляром собственного типа, приходит как обычный SerializedError. Поэтому обработчик отказа должен проверять форму ошибки, а не полагаться на instanceof.'
      ),
      bullets: [
        L('The promise resolves with an action, never with the payload itself.', 'Промис разрешается действием, а не самим payload.'),
        L('unwrap throws on rejection and returns the payload on success.', 'unwrap выбрасывает ошибку при отказе и отдаёт payload при успехе.'),
        L('unwrapResult does the same for an action you already hold.', 'unwrapResult делает то же с уже имеющимся действием.'),
        L('A rejected thunk still resolves the promise.', 'Отклонённый thunk всё равно разрешает промис.'),
        L('Rejection errors are serialised, so instanceof does not survive.', 'Ошибки отказа сериализуются, поэтому instanceof не работает.'),
      ],
      code: `import { unwrapResult } from '@reduxjs/toolkit';

// The promise resolves with an action, not with the data.
const action = await dispatch(fetchUser('42'));

// unwrapResult throws when the thunk was rejected.
try {
  const user = unwrapResult(action);
  console.log(user.name);
} catch (error) {
  console.error('Request failed', error);
}

// The promise has an unwrap method and an abort method.
const promise = dispatch(fetchUser('42'));
promise.abort();`,
      table: {
        caption: L('Three ways to read the outcome', 'Три способа прочитать результат'),
        headers: [L('Way', 'Способ'), L('On success', 'При успехе'), L('On failure', 'При ошибке')],
        rows: [
          [
            L('await dispatch(thunk)', 'await dispatch(thunk)'),
            L('The action', 'Действие'),
            L('The action, with the error inside', 'Действие, внутри ошибка'),
          ],
          [
            L('await dispatch(thunk).unwrap()', 'await dispatch(thunk).unwrap()'),
            L('The payload', 'Payload'),
            L('Throws', 'Выбрасывает ошибку'),
          ],
          [
            L('unwrapResult(action)', 'unwrapResult(action)'),
            L('The payload', 'Payload'),
            L('Throws', 'Выбрасывает ошибку'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The error loses its class', 'Ошибка теряет свой класс'),
          text: L(
            'After the trip through the action, a custom error is a plain object with a message and a stack. If your code needs to distinguish a validation error from a network error, carry a code in the rejected payload or check the message, not the class.',
            'После пути через действие собственная ошибка становится обычным объектом с сообщением и стеком. Если коду нужно отличить ошибку валидации от сетевой, переносите код в payload отказа или проверяйте сообщение, а не класс.'
          ),
        },
      ],
      takeaway: L(
        'Unwrap the result before you use it, and treat a rejected thunk as an exception rather than as data.',
        'Разворачивайте результат перед использованием и относитесь к отказу как к исключению, а не как к данным.'
      ),
      seeAlso: [
        L('Section 4-4: polling and cancellation', 'Секция 4-4: опрос и отмена'),
        L('Chapter 7: side effects, persistence and testing', 'Глава 7: побочные эффекты, сохранение и тесты'),
      ],
    },
    {
      id: 'redux-ch4-s4',
      title: L('Polling and cancellation', 'Опрос и отмена'),
      body: L(
        'A request that is no longer needed should be cancelled, and Redux Toolkit gives you that for free. The promise returned by dispatching a thunk has an abort method, and the signal it carries is passed to the payload creator, so an aborted request rejects with an AbortError and the rejected action says aborted. Cancelling is not an error case for the interface: the pending state simply never gets its answer, so the state must be able to live with a pending that was cancelled.\n\nPolling is the opposite problem: the request is needed again and again. The manual version is a timer that dispatches the thunk, and the timer has to be cleaned up when the component unmounts, or the application keeps asking the server for data that nobody is watching any more. The interval belongs to the component that started it, not to the store.\n\nThe alternative is to let the data layer own the schedule. RTK Query caches the result, can refetch it on an interval, on focus and on demand, and drops the data nobody uses any more. For a screen that mostly reads data, that removes the whole class of bugs around timers, cleanup and duplicated requests.',
        'Запрос, который больше не нужен, следует отменить, и Redux Toolkit даёт это бесплатно. У промиса, возвращённого отправкой thunk, есть метод abort, а сигнал, который он несёт, попадает в создатель payload, поэтому отменённый запрос отклоняется с AbortError, и в действии rejected будет aborted. Отмена — не ошибка для интерфейса: ответ на pending просто не приходит, значит состояние должно уметь жить с отменённым pending.\n\nОпрос — обратная задача: запрос нужен снова и снова. Ручная версия — таймер, который отправляет thunk, и таймер обязательно надо убрать при размонтировании компонента, иначе приложение продолжает спрашивать сервер о данных, на которые никто не смотрит. Интервал принадлежит компоненту, который его запустил, а не хранилищу.\n\nАльтернатива — отдать расписание слою данных. RTK Query кэширует результат, умеет перезапрашивать его по интервалу, по фокусу и по требованию, и выбрасывает данные, которыми никто не пользуется. Для экрана, который в основном читает данные, это снимает целый класс багов вокруг таймеров, очистки и повторяющихся запросов.'
      ),
      bullets: [
        L('The promise of a dispatched thunk has an abort method.', 'У промиса отправленного thunk есть метод abort.'),
        L('The signal reaches fetch through the payload creator.', 'Сигнал доходит до fetch через создателя payload.'),
        L('An aborted request rejects with an AbortError, not with a failure.', 'Отменённый запрос отклоняется с AbortError, а не с ошибкой.'),
        L('A polling interval must be cleared when the component unmounts.', 'Интервал опроса надо очищать при размонтировании компонента.'),
        L('RTK Query owns the schedule, the cache and the cancellation.', 'Расписание, кэш и отмену в RTK Query ведёт библиотека.'),
      ],
      code: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User { id: string; name: string }

// RTK Query owns the request, the cache and the schedule.
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({ query: (id) => \`users/\${id}\` }),
  }),
});

export const { useGetUserQuery } = usersApi;

// Polling is a refetch interval, and the previous request is cancelled for you.
const { data, isFetching, refetch } = useGetUserQuery('42', {
  pollingInterval: 30_000,
});`,
      table: {
        caption: L('Who owns the request', 'Кто владеет запросом'),
        headers: [L('Approach', 'Подход'), L('Polling', 'Опрос'), L('Cancellation', 'Отмена'), L('Cache', 'Кэш')],
        rows: [
          [
            L('A thunk and a timer', 'Thunk и таймер'),
            L('setInterval in the component', 'setInterval в компоненте'),
            L('promise.abort()', 'promise.abort()'),
            L('None', 'Нет'),
          ],
          [
            L('RTK Query', 'RTK Query'),
            L('pollingInterval', 'pollingInterval'),
            L('Automatic', 'Автоматическая'),
            L('Built in', 'Встроенный'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('RTK Query removes the whole class of bugs', 'RTK Query снимает целый класс багов'),
          text: L(
            'A request that nobody needs any more is still on the network, and a polling interval that was not cleared keeps the application alive. When the data layer owns the schedule, both problems disappear by construction.',
            'Запрос, который больше не нужен, всё ещё висит на сети, а не убранный интервал опроса не даёт приложению уснуть. Когда расписание ведёт слой данных, обе проблемы исчезают по построению.'
          ),
        },
      ],
      takeaway: L(
        'Cancel a request with abort, and let the data layer own the polling schedule when you can.',
        'Отменяйте запрос через abort, а расписание опроса по возможности отдайте слою данных.'
      ),
      seeAlso: [
        L('Chapter 5: RTK Query', 'Глава 5: RTK Query'),
        L('Section 4-3: unwrapResult and error handling', 'Секция 4-3: unwrapResult и обработка ошибок'),
      ],
    },
    {
      id: 'redux-ch4-s5',
      title: L('Race conditions and the last request wins', 'Гонки и правило последнего запроса'),
      body: L(
        'When two requests for the same resource overlap, the answers can arrive in any order. If the user types ad and then ada, the second request starts later but the first one may finish later too, and if the first answer wins, the interface shows results for the wrong query. The name of the problem is a race condition, and it is not a fault of the network: it is a fault of the state, which accepted an answer nobody asked for any more.\n\nEvery action dispatched by a thunk carries a requestId in meta, and it is unique per dispatch. The reducer can remember the id of the request it is currently waiting for and ignore the answer of every other one. This turns the race into a decision the state makes explicitly, and the rule is simple: the answer of the newest request wins, everything older is dropped.\n\nThe alternative is to cancel the previous request when a new one starts, using the abort method. Cancellation is cleaner when the transport supports it, but it is not always possible, and a request that is already on its way may still deliver its answer, so the requestId guard is the reliable part. Many codebases use both: cancel to save bandwidth, guard to stay correct.',
        'Когда два запроса одного и того же ресурса накладываются, ответы могут прийти в любом порядке. Если пользователь напечатал ad, а потом ada, второй запрос стартует позже, но первый может завершиться позже первого, и тогда интерфейс покажет результаты по неверному запросу. Это называется гонкой, и виноват тут не сеть: виновато состояние, которое приняло ответ, который уже никто не ждёт.\n\nКаждое действие, отправленное thunk, несёт уникальный requestId в meta. Редьюсер может запомнить id запроса, которого он ждёт, и игнорировать ответ любого другого. Так гонка превращается в решение, которое состояние принимает явно, и правило простое: побеждает ответ самого нового запроса, все более старые отбрасываются.\n\nАльтернатива — отменять предыдущий запрос при старте нового, через метод abort. Отмена чище, когда транспорт её поддерживает, но она доступна не всегда, а запрос, уже ушедший в сеть, всё равно может доставить ответ, поэтому надёжная часть — это проверка по requestId. Во многих кодовых базах используют оба приёма: отмена экономит трафик, а проверка гарантирует корректность.'
      ),
      bullets: [
        L('Overlapping requests can resolve in any order.', 'Наложенные запросы могут разрешиться в любом порядке.'),
        L('Every thunk action carries a unique requestId in meta.', 'Каждое действие thunk несёт уникальный requestId в meta.'),
        L('The pending case remembers the id of the current request.', 'Случай pending запоминает id текущего запроса.'),
        L('The fulfilled case ignores answers of older requests.', 'Случай fulfilled игнорирует ответы более старых запросов.'),
        L('Cancelling saves bandwidth, the guard keeps the state correct.', 'Отмена экономит трафик, а проверка id сохраняет корректность состояния.'),
      ],
      code: `const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', user: null, requestId: null } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // Remember which request we are waiting for.
        state.requestId = action.meta.requestId;
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Drop the answer of an older request.
        if (action.meta.requestId !== state.requestId) return;
        state.status = 'succeeded';
        state.user = action.payload;
      });
  },
});`,
      table: {
        caption: L('Two requests, two answers', 'Два запроса, два ответа'),
        headers: [L('Moment', 'Момент'), L('Request id', 'Id запроса'), L('State', 'Состояние'), L('Result', 'Итог')],
        rows: [
          [
            L('The first request starts', 'Первый запрос начался'),
            L('1', '1'),
            L('Waiting for 1', 'Ждём 1'),
            L('The answer will be accepted', 'Ответ будет принят'),
          ],
          [
            L('The second request starts', 'Второй запрос начался'),
            L('2', '2'),
            L('Waiting for 2', 'Ждём 2'),
            L('The answer of 1 is now stale', 'Ответ 1 устарел'),
          ],
          [
            L('The first answer arrives', 'Пришёл первый ответ'),
            L('1', '1'),
            L('Waiting for 2', 'Ждём 2'),
            L('Ignored by the guard', 'Отброшен проверкой'),
          ],
          [
            L('The second answer arrives', 'Пришёл второй ответ'),
            L('2', '2'),
            L('Waiting for 2', 'Ждём 2'),
            L('Accepted', 'Принят'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The silent race', 'Тихая гонка'),
          text: L(
            'Without the guard nothing warns you: the state changes, the interface updates, and the data on screen belongs to a query the user has already replaced. It shows up as a search that sometimes shows the previous result.',
            'Без проверки ничто не предупредит: состояние изменится, интерфейс обновится, а на экране окажутся данные по запросу, который пользователь уже заменил. Выглядит это как поиск, который иногда показывает предыдущий результат.'
          ),
        },
      ],
      takeaway: L(
        'Remember the requestId of the current request and drop the answers of all older ones.',
        'Запоминайте requestId текущего запроса и отбрасывайте ответы всех более старых.'
      ),
      seeAlso: [
        L('Section 4-2: handling pending, fulfilled and rejected', 'Секция 4-2: обработка pending, fulfilled и rejected'),
        L('Section 5-2: tags and invalidation', 'Секция 5-2: теги и инвалидация'),
      ],
    },
    {
      id: 'redux-ch4-s6',
      title: L('Normalising a request inside a slice', 'Нормализация запроса внутри слайса'),
      body: L(
        'When a domain has more than one request, the pattern that keeps working is the same for all of them: a status, the data, the error, and the three cases in extraReducers. The repetition in the slice is the price of not inventing a framework, and the repetition is visible, which is exactly what you want from a state machine: the reader can see every possible outcome of a request in one place.\n\nThe state should describe the request in the terms of the interface rather than in the terms of the network. A single status field that moves through idle, loading, succeeded and failed cannot show two contradictory things at once, while three booleans can. The data and the error should never be present at the same time, and the reducer should clear the error when a new request starts, otherwise a stale message survives under a fresh spinner.\n\nThe trap is scattering the lifecycle. If the status lives in one slice, the error in another and the data in a third, no component can decide what to render, because the three answers can disagree. Keep the whole lifecycle of one request in one slice, and let the selectors decide how it is presented.',
        'Когда у домена больше одного запроса, работающая схема одна и та же для всех: статус, данные, ошибка и три случая в extraReducers. Повторение в слайсе — это цена отказа от собственного фреймворка, и повторение это видимое, а это как раз то, что нужно конечному автомату: читатель видит все возможные исходы запроса в одном месте.\n\nСостояние должно описывать запрос в терминах интерфейса, а не в терминах сети. Одно поле статуса, проходящее через idle, loading, succeeded и failed, не может показать два противоречивых факта сразу, а три булевых флага могут. Данные и ошибка не должны присутствовать одновременно, и редьюсер должен очищать ошибку в начале нового запроса, иначе старое сообщение переживёт свежий спиннер.\n\nЛовушка — разбросанный по слайсам жизненный цикл. Если статус лежит в одном слайсе, ошибка в другом, а данные в третьем, ни один компонент не может решить, что рисовать, потому что три ответа могут противоречить друг другу. Держите весь жизненный цикл одного запроса в одном слайсе, а как это показывать, решают селекторы.'
      ),
      bullets: [
        L('One status field, not three booleans.', 'Одно поле статуса, а не три булевых флага.'),
        L('The error is cleared when a new request starts.', 'Ошибка очищается в начале нового запроса.'),
        L('Data and error never appear together.', 'Данные и ошибка не появляются вместе.'),
        L('Every request of the domain follows the same three cases.', 'Каждый запрос домена проходит одни и те же три случая.'),
        L('The lifecycle of one request lives in one slice.', 'Жизненный цикл одного запроса живёт в одном слайсе.'),
      ],
      code: `const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', data: null, error: null } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});`,
      table: {
        caption: L('The four states of a request', 'Четыре состояния запроса'),
        headers: [L('Status', 'Статус'), L('Data', 'Данные'), L('Error', 'Ошибка'), L('What the user sees', 'Что видит пользователь')],
        rows: [
          [
            L('idle', 'idle'),
            L('null', 'null'),
            L('null', 'null'),
            L('The empty state', 'Пустое состояние'),
          ],
          [
            L('loading', 'loading'),
            L('null', 'null'),
            L('null', 'null'),
            L('The spinner', 'Спиннер'),
          ],
          [
            L('succeeded', 'succeeded'),
            L('Present', 'Есть'),
            L('null', 'null'),
            L('The data', 'Данные'),
          ],
          [
            L('failed', 'failed'),
            L('null', 'null'),
            L('A message', 'Сообщение'),
            L('The error and a way to retry', 'Ошибка и возможность повторить'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Booleans multiply', 'Булевы флаги размножаются'),
          text: L(
            'isLoading, isError and isLoaded are three independent flags, so the interface has eight possible combinations and four of them are nonsense. A single status field has four states, and every one of them means something.',
            'isLoading, isError и isLoaded — это три независимых флага, поэтому у интерфейса восемь возможных сочетаний, и половина из них бессмысленна. Одно поле статуса даёт четыре состояния, и каждое что-то значит.'
          ),
        },
      ],
      takeaway: L(
        'Keep the whole lifecycle of a request in one slice, with one status field instead of a set of booleans.',
        'Держите весь жизненный цикл запроса в одном слайсе, с одним полем статуса вместо набора булевых флагов.'
      ),
      seeAlso: [
        L('Chapter 6: collections and the entity adapter', 'Глава 6: коллекции и entity adapter'),
        L('Section 3-1: writing selectors', 'Секция 3-1: написание селекторов'),
      ],
    },
  ],
};
