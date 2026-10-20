import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh07: Chapter = {
  id: 'redux-ch7',
  title: L('Side effects, persistence and testing', 'Побочные эффекты, персистентность и тестирование'),
  summary: L(
    'Where side effects belong when they are not thunks, how to persist the store and hydrate it back safely, what the DevTools and time travel are actually good for, how to test slices, thunks, selectors and components, and the state mistakes that show up in real applications.',
    'Где жить побочным эффектам, если это не thunk, как сохранить состояние и безопасно его восстановить, что действительно дают DevTools и путешествие во времени, как тестировать слайсы, thunk, селекторы и компоненты и какие ошибки в организации состояния встречаются в реальных приложениях.'
  ),
  sections: [
    {
      id: 'redux-ch7-s1',
      title: L('Listener middleware', 'Middleware с листенерами'),
      body: L(
        'A thunk is a function that does the work of an asynchronous action, and a listener is a function that reacts to what already happened. createListenerMiddleware gives you a place to put the second kind: analytics calls, notifications, writing to localStorage, refetching a related resource. The listener runs after the reducers have produced the new state, so it can read the result of the action through getState.\n\nA listener is registered with startListening. It takes a trigger, an effect and options. The trigger is an action creator, a matcher such as isAnyOf(a, b), or a predicate function that inspects the action. The effect is an async function that receives the action and an api object with dispatch, getState, signal and the delay helper.\n\nThe options decide how concurrent runs behave. takeLatest cancels the previous run of the same listener when a new one starts, which is the right choice for a search box. cancelActiveListeners does the same from inside the effect, and the signal tells a running request that it should stop.\n\nThe trap is a feedback loop. A listener that dispatches an action the same listener listens to runs again, and again. The predicate has to be narrow enough to break the cycle, and a listener that dispatches in a loop has to check what it has already seen.',
        'Thunk — это функция, которая делает работу асинхронного действия, а листенер — функция, которая реагирует на то, что уже произошло. createListenerMiddleware даёт место для второго: вызовы аналитики, уведомления, запись в localStorage, перезапрос связанного ресурса. Листенер выполняется после того, как редьюсеры произвели новое состояние, поэтому он может прочитать результат действия через getState.\n\nЛистенер регистрируется через startListening. Он принимает триггер, эффект и опции. Триггер — это создатель действия, matcher вида isAnyOf(a, b) или функция-предикат, которая смотрит на действие. Эффект — асинхронная функция, получающая действие и объект api с dispatch, getState, signal и помощником delay.\n\nОпции решают, как ведут себя параллельные запуски. takeLatest отменяет предыдущий запуск того же листенера, когда начинается новый, — это правильный выбор для поисковой строки. cancelActiveListeners делает то же самое изнутри эффекта, а signal говорит выполняющемуся запросу, что пора остановиться.\n\nЛовушка — цикл обратной связи. Листенер, который отправляет действие, на которое сам же слушает, запускается снова и снова. Предикат должен быть достаточно узким, чтобы разорвать цикл, а листенер, который отправляет действия в цикле, обязан проверять, что он уже видел.'
      ),
      bullets: [
        L('A listener reacts to actions after the reducers have run.', 'Листенер реагирует на действия после того, как отработали редьюсеры.'),
        L('startListening takes a trigger, an effect and options.', 'startListening принимает триггер, эффект и опции.'),
        L('The trigger is an action creator, isAnyOf or a predicate.', 'Триггер — это создатель действия, isAnyOf или предикат.'),
        L('takeLatest cancels the previous run of the same listener.', 'takeLatest отменяет предыдущий запуск того же листенера.'),
        L('A listener that dispatches what it listens to loops forever.', 'Листенер, отправляющий то, что слушает, зацикливается.'),
      ],
      code: `import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { postAdded, postDeleted } from './postsSlice';
import type { RootState } from './store';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: postAdded,
  effect: async (action, api) => {
    // The reducers already ran, so the state is up to date here.
    api.cancelActiveListeners();
    await api.delay(300);
    console.log('tracked post', action.payload.id);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(postAdded, postDeleted),
  effect: async (action, api) => {
    const posts = (api.getState() as RootState).posts;
    localStorage.setItem('posts', JSON.stringify(posts));
  },
});`,
      table: {
        caption: L('A thunk and a listener side by side', 'Thunk и листенер рядом'),
        headers: [L('Aspect', 'Аспект'), L('Thunk', 'Thunk'), L('Listener', 'Листенер')],
        rows: [
          [
            L('When it runs', 'Когда выполняется'),
            L('you call it', 'когда вы его вызываете'),
            L('after an action is dispatched', 'после отправки действия'),
          ],
          [
            L('What it receives', 'Что получает'),
            L('the arguments you passed', 'аргументы, которые вы передали'),
            L('the action and the api object', 'действие и объект api'),
          ],
          [
            L('Cancellation', 'Отмена'),
            L('you abort the request yourself', 'вы сами прерываете запрос'),
            L('takeLatest and the signal', 'takeLatest и signal'),
          ],
          [
            L('Good for', 'Хорошо подходит для'),
            L('a request and its three states', 'запроса и его трёх состояний'),
            L('reactions to what happened', 'реакций на случившееся'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The feedback loop', 'Цикл обратной связи'),
          text: L(
            'A listener that dispatches an action it also listens to will run again on every dispatch, and the loop only becomes visible when the application starts to eat the processor. Make the predicate narrow enough to exclude the actions the listener itself produces.',
            'Листенер, который отправляет действие, на которое сам же слушает, запустится снова при каждой отправке, и цикл заметен только тогда, когда приложение начинает съедать процессор. Сделайте предикат достаточно узким, чтобы исключить действия, которые производит сам листенер.'
          ),
        },
        {
          tone: 'tip',
          title: L('One effect, one responsibility', 'Один эффект — одна задача'),
          text: L(
            'A listener that writes to the network, updates the cache and shows a notification is three listeners wearing a trench coat. Split it, and each part becomes testable on its own.',
            'Листенер, который ходит в сеть, обновляет кэш и показывает уведомление, — это три листенера в одном плаще. Разделите, и каждая часть станет проверяемой сама по себе.'
          ),
        },
      ],
      takeaway: L(
        'Use a thunk to do the work and a listener to react to the result, and give every listener a predicate that cannot loop.',
        'Thunk делает работу, а листенер реагирует на результат, и у каждого листенера должен быть предикат, который не зацикливается.'
      ),
      seeAlso: [
        L('Chapter 4: asynchronous data flow', 'Глава 4: асинхронный поток данных'),
        L('Section 7-2: persistence and rehydration', 'Секция 7-2: персистентность и гидратация'),
        L('Section 5-4: mutations and invalidation strategies', 'Секция 5-4: мутации и стратегии инвалидации'),
      ],
    },
    {
      id: 'redux-ch7-s2',
      title: L('Persistence and rehydration', 'Персистентность и гидратация'),
      body: L(
        'Persisting the store means writing a part of the state to a durable place and putting it back when the application starts. The place is usually localStorage, because it is synchronous and available before the first render, and the value is a JSON string of the part of the tree you decided to keep.\n\nThere are two ways to put the state back. The preloadedState option of configureStore fills the store before the first render, which is what you want for a session token or a saved preference. A hydration action dispatched after the store exists fits the cases where the state has to be merged into what the application already built, and it is handled in the extraReducers of the slice.\n\nThe edge cases are where this goes wrong. A payload written by an older version of the application has an unknown shape, so it needs a version number and has to be thrown away when the shape changes. A rehydration must not overwrite data that is newer than the payload, so the merge has to be explicit. And the storage is small: localStorage holds about five megabytes per origin, so a big tree has to be trimmed before it is written, or it belongs in IndexedDB.\n\nAnd the cache of RTK Query is usually not worth persisting: it is rebuilt by a refetch, and a stale cache in localStorage turns into a flash of old data on every start. Persist the session, the preferences and the draft of a form, not the server data.',
        'Персистентность хранилища — это запись части состояния в надёжное место и восстановление её при старте приложения. Местом обычно служит localStorage: он синхронный и доступен до первого рендера, а значение — это JSON-строка той части дерева, которую вы решили сохранить.\n\nВернуть состояние можно двумя способами. Опция preloadedState у configureStore наполняет хранилище до первого рендера — это то, что нужно для токена сессии или сохранённой настройки. Действие гидратации, отправленное после создания хранилища, подходит для случаев, когда состояние надо слить с тем, что приложение уже собрало, и обрабатывается оно в extraReducers слайса.\n\nКрая — это место, где всё ломается. Payload, записанный старой версией приложения, имеет неизвестную форму, поэтому нужен номер версии и отбрасывание payload при смене формы. Гидратация не должна затирать данные, которые свежее payload, значит, слияние должно быть явным. И место хранения маленькое: localStorage вмещает около пяти мегабайт на один origin, поэтому большое дерево надо урезать перед записью, либо оно должно жить в IndexedDB.\n\nИ кэш RTK Query обычно сохранять не стоит: он пересобирается перезапросом, а устаревший кэш в localStorage превращается в вспышку старых данных при каждом старте. Сохраняйте сессию, настройки и черновик формы, а не серверные данные.'
      ),
      bullets: [
        L('preloadedState fills the store before the first render.', 'preloadedState наполняет хранилище до первого рендера.'),
        L('A hydration action merges the payload into the running state.', 'Действие гидратации сливает payload в работающее состояние.'),
        L('Version the payload and drop it when the shape changes.', 'Версионируйте payload и отбрасывайте его при смене формы.'),
        L('localStorage holds about five megabytes per origin.', 'localStorage вмещает около пяти мегабайт на один origin.'),
        L('Do not persist the RTK Query cache, it goes stale on its own.', 'Не сохраняйте кэш RTK Query, он устаревает сам по себе.'),
      ],
      code: `import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

const STORAGE_KEY = 'app-state';
const STATE_VERSION = 1;

interface PersistedState {
  version: number;
  state: unknown;
}

function loadPersistedState(): unknown {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as PersistedState;
    // A changed shape means the old payload cannot be trusted.
    if (parsed.version !== STATE_VERSION) return undefined;
    return parsed.state;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadPersistedState() as ReturnType<typeof rootReducer> | undefined,
});`,
      table: {
        caption: L('Two ways to hydrate the store', 'Два способа восстановить состояние'),
        headers: [L('Way', 'Способ'), L('When it runs', 'Когда выполняется'), L('Good for', 'Подходит для')],
        rows: [
          [
            L('preloadedState', 'preloadedState'),
            L('before the first render', 'до первого рендера'),
            L('a session token, a saved preference', 'токена сессии, сохранённой настройки'),
          ],
          [
            L('a hydration action', 'действие гидратации'),
            L('after the store exists', 'после создания хранилища'),
            L('merging into a state that is already built', 'слияния с уже собранным состоянием'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The payload from last year', 'Payload из прошлого года'),
          text: L(
            'After a refactor the stored payload has a shape the code no longer understands, and hydrating it puts undefined into the state. Keep a version number next to the payload and throw it away when the version does not match.',
            'После рефакторинга сохранённый payload имеет форму, которую код больше не понимает, и гидратация положит в состояние undefined. Держите рядом с payload номер версии и отбрасывайте его, если версия не совпадает.'
          ),
        },
        {
          tone: 'tip',
          title: L('Save less than you think', 'Сохраняйте меньше, чем кажется'),
          text: L(
            'Only the values that a user would miss after a reload belong in storage: the session, the chosen language, the draft of an unsaved form. Everything else can be fetched again.',
            'В хранилище принадлежит только то, о чём пользователь пожалеет после перезагрузки: сессия, выбранный язык, черновик несохранённой формы. Всё остальное можно запросить заново.'
          ),
        },
      ],
      takeaway: L(
        'Persist the little that has to survive a reload, version the payload, and never let the stored state overwrite fresher data.',
        'Сохраняйте только то, что должно пережить перезагрузку, версионируйте payload и никогда не давайте сохранённому состоянию затереть более свежие данные.'
      ),
      seeAlso: [
        L('Section 7-1: listener middleware', 'Секция 7-1: middleware с листенерами'),
        L('Section 7-3: DevTools and time travel', 'Секция 7-3: DevTools и путешествие во времени'),
        L('Section 5-1: endpoints and the cache', 'Секция 5-1: эндпоинты и кэш'),
      ],
    },
    {
      id: 'redux-ch7-s3',
      title: L('DevTools and time travel', 'DevTools и путешествие во времени'),
      body: L(
        'The Redux DevTools extension records every action and every state snapshot. The window shows the action log on the left, the diff of the state in the middle and the whole tree on the right. From there you can dispatch an action by hand, watch which part of the tree it touches, and export the current state as a file that reproduces the exact situation in another machine.\n\nTime travel is the feature the name refers to. Jump to any point in the recorded history and the extension replays the actions through the reducers to rebuild the state of that moment. It works only because the reducers are pure: the same actions always produce the same states, so the replay lands on the tree the user really saw.\n\nThe same purity makes the limits visible. A reducer that reads the clock or a random source produces a different tree on the replay, and the jump lands on something that never existed. A side effect in a reducer is not re-run at all, so the history shows the intent but not the effect.\n\nSo the DevTools are a microscope for the data flow and a recorder for bugs, not a profiler and not a replacement for tests. The moment you find yourself reproducing a bug by hand in the extension, that bug deserves an automated test.',
        'Расширение Redux DevTools записывает каждое действие и каждый снимок состояния. Окно показывает журнал действий слева, разницу состояний посередине и всё дерево справа. Оттуда можно отправить действие руками, посмотреть, какую часть дерева оно затронуло, и выгрузить текущее состояние в файл, который воспроизводит ту же ситуацию на другой машине.\n\nПутешествие во времени — это то, что даёт название функции. Перейдите в любую точку записанной истории, и расширение проиграет действия через редьюсеры, воссоздавая состояние того момента. Работает это только благодаря чистоте редьюсеров: одни и те же действия всегда дают одни и те же состояния, поэтому воспроизведение приводит ровно в то дерево, которое видел пользователь.\n\nТа же чистота делает видимыми и границы. Редьюсер, читающий часы или случайный источник, даст при воспроизведении другое дерево, и переход приведёт в состояние, которого не существовало. Побочный эффект в редьюсере вообще не повторится, поэтому история покажет намерение, но не результат.\n\nТак что DevTools — это микроскоп для потока данных и регистратор для багов, а не профилировщик и не замена тестам. Как только вы начинаете воспроизводить баг руками в расширении, этому багу пора завести автотест.'
      ),
      bullets: [
        L('The DevTools record every action and every state snapshot.', 'DevTools записывают каждое действие и каждый снимок состояния.'),
        L('Time travel replays the actions through the reducers to rebuild an earlier state.', 'Путешествие во времени проигрывает действия через редьюсеры, воссоздавая прежнее состояние.'),
        L('It works only because the reducers are pure.', 'Оно работает только благодаря чистоте редьюсеров.'),
        L('The action log shows which dispatch caused a change.', 'Журнал действий показывает, какой dispatch вызвал изменение.'),
        L('The state can be exported and imported to reproduce a bug.', 'Состояние можно выгрузить и загрузить, чтобы воспроизвести баг.'),
      ],
      code: `import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

// The extension instruments the store on its own, but the switch is yours.
export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

// The same history without the extension, if you need it in a log.
const unsubscribe = store.subscribe(() => {
  console.log('state after the last action:', store.getState());
});

store.dispatch({ type: 'counter/increment' });

// Export the state to reproduce the situation somewhere else.
console.log(JSON.stringify(store.getState()));
unsubscribe();`,
      table: {
        caption: L('What the DevTools are good for', 'Для чего годится DevTools'),
        headers: [L('Task', 'Задача'), L('Verdict', 'Вердикт'), L('Why', 'Почему')],
        rows: [
          [
            L('Find the action that changed the state', 'Найти действие, изменившее состояние'),
            L('yes', 'да'),
            L('The action log shows every dispatch in order', 'Журнал показывает все dispatch по порядку'),
          ],
          [
            L('Reproduce a bug on another machine', 'Воспроизвести баг на другой машине'),
            L('yes', 'да'),
            L('The exported state contains the whole tree', 'Выгруженное состояние содержит всё дерево'),
          ],
          [
            L('Check that a middleware chain dispatches nothing extra', 'Проверить, что цепочка middleware не шлёт лишнего'),
            L('yes', 'да'),
            L('Every action is visible, including the ones you did not expect', 'Видно каждое действие, включая неожиданные'),
          ],
          [
            L('Measure the performance of a render', 'Измерить производительность рендера'),
            L('no', 'нет'),
            L('The extension measures the store, not the DOM', 'Расширение измеряет хранилище, а не DOM'),
          ],
          [
            L('Replace a test suite', 'Заменить набор тестов'),
            L('no', 'нет'),
            L('Nothing fails automatically when the behaviour changes', 'Ничто не падает само, когда поведение меняется'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Time travel over impure code', 'Путешествие во времени по нечистому коду'),
          text: L(
            'If a reducer reads Date.now() or Math.random(), the replay produces a different tree and the jump lands somewhere that never existed. The extension will not warn you, because from its point of view the action history is perfectly valid.',
            'Если редьюсер читает Date.now() или Math.random(), воспроизведение даст другое дерево, и переход приведёт туда, где никто не бывал. Расширение не предупредит: с его точки зрения история действий совершенно корректна.'
          ),
        },
        {
          tone: 'tip',
          title: L('Export the state with the bug', 'Выгружайте состояние вместе с багом'),
          text: L(
            'A bug report with the exported state attached is worth ten sentences of description: the next person reproduces the exact tree in one click instead of guessing the sequence of clicks that leads to it.',
            'Баг-репорт с прикреплённым состоянием стоит десяти предложений описания: следующий человек воспроизводит точное дерево в один клик, а не угадывает последовательность кликов, которая к нему ведёт.'
          ),
        },
      ],
      takeaway: L(
        'The DevTools are a microscope for the data flow, and time travel is only trustworthy while the reducers stay pure.',
        'DevTools — это микроскоп для потока данных, а путешествию во времени можно доверять, только пока редьюсеры остаются чистыми.'
      ),
      seeAlso: [
        L('Section 1-4: why reducers must be pure', 'Секция 1-4: почему редьюсеры должны быть чистыми'),
        L('Section 7-4: testing slices, thunks and selectors', 'Секция 7-4: тестирование слайсов, thunk и селекторов'),
        L('Section 7-2: persistence and rehydration', 'Секция 7-2: персистентность и гидратация'),
      ],
    },
    {
      id: 'redux-ch7-s4',
      title: L('Testing slices, thunks and selectors', 'Тестирование слайсов, thunk и селекторов'),
      body: L(
        'A slice is a pure function, so testing it needs no store at all: call the exported reducer with a state and an action and assert on the result. The reducer has a name in the module, the initial state is exported by the slice, and the case reducers are reachable through the generated action creators. A test of a reducer is a function call with a comparison.\n\nA thunk is tested by dispatching it into a real store, not by mocking the dispatch. A mock proves that the thunk called the functions you expected, which is a test of the implementation; a real store proves that the state after the dispatch is the one the application needs, which is a test of the behaviour.\n\nA selector is tested by giving it a state and checking what it returns, including the edge cases: an empty collection, a missing entity, a filter that matches nothing. Those are the branches that the application hits in production and that never appear in the happy path of a manual check.\n\nThe rule behind all three: assert on the state, not on the calls. A test that counts how many times a function was called breaks when the implementation changes and keeps passing when the behaviour breaks, which is the worst possible combination.',
        'Слайс — это чистая функция, поэтому для его теста хранилище вообще не нужно: вызовите экспортированный редьюсер с состоянием и действием и проверьте результат. У редьюсера есть имя в модуле, начальное состояние экспортируется слайсом, а case-редьюсеры доступны через сгенерированные создатели действий. Тест редьюсера — это вызов функции с проверкой.\n\nThunk тестируется отправкой в настоящее хранилище, а не моком на dispatch. Мок доказывает, что thunk вызвал ожидаемые функции, то есть тестирует реализацию; настоящее хранилище доказывает, что состояние после отправки именно то, которое нужно приложению, то есть тестирует поведение.\n\nСелектор тестируется подачей ему состояния и проверкой результата, включая краевые случаи: пустая коллекция, отсутствующая сущность, фильтр, не нашедший ничего. Именно эти ветки приложение встречает в проде, и их никогда не бывает в счастливом пути ручной проверки.\n\nПравило, стоящее за всем тремя: проверяйте состояние, а не вызовы. Тест, который считает, сколько раз вызвали функцию, ломается при смене реализации и продолжает проходить при поломке поведения, а это худшее из двух сочетаний.'
      ),
      bullets: [
        L('A slice reducer is a pure function, so it is tested without a store.', 'Редьюсер слайса — чистая функция, поэтому его тестируют без хранилища.'),
        L('A thunk is tested by dispatching it into a real store.', 'Thunk тестируется отправкой в настоящее хранилище.'),
        L('Assert on the resulting state, not on the calls that produced it.', 'Проверяйте получившееся состояние, а не вызовы, которые его создали.'),
        L('A selector is tested with a state and its edge cases.', 'Селектор тестируется состоянием и краевыми случаями.'),
        L('Mocks belong at the network boundary, not between the test and the reducer.', 'Моки живут на границе сети, а не между тестом и редьюсером.'),
      ],
      code: `import { postsReducer, postAdded, postArchived } from './postsSlice';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

// A reducer is a function call, so a test is a function call.
const start = postsReducer(undefined, { type: '@@INIT' });
const next = postsReducer(start, postAdded({ id: 'a', title: 'First' }));

assert(next !== start, 'the state must be a new object');
assert(next.ids.length === 1, 'the post must be added');
assert(next.entities.a.title === 'First', 'the title must be stored');

// The same reducer handles the second case without any setup.
const archived = postsReducer(next, postArchived({ id: 'a', changes: { archived: true } }));
assert(archived.entities.a.archived === true, 'the post must be archived');`,
      table: {
        caption: L('What to test and what to assert on', 'Что тестировать и на чём проверять'),
        headers: [L('Unit', 'Модуль'), L('How to drive it', 'Как запустить'), L('Assert on', 'Проверять')],
        rows: [
          [
            L('a reducer', 'редьюсер'),
            L('call it with a state and an action', 'вызвать с состоянием и действием'),
            L('the next state', 'следующее состояние'),
          ],
          [
            L('a thunk', 'thunk'),
            L('dispatch it into a real store', 'отправить в настоящее хранилище'),
            L('the state after the dispatch', 'состояние после отправки'),
          ],
          [
            L('a selector', 'селектор'),
            L('call it with a state', 'вызвать с состоянием'),
            L('the returned value', 'возвращённое значение'),
          ],
          [
            L('an API call', 'вызов API'),
            L('mock at the network boundary', 'замокать на границе сети'),
            L('the error the user sees', 'ошибку, которую увидит пользователь'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Testing the implementation', 'Тест реализации вместо поведения'),
          text: L(
            'A test that asserts the order of the calls inside a thunk passes even when the state ends up wrong, and fails the day you rename a helper. Assert on the state and the failure message stays the same for the reader.',
            'Тест, проверяющий порядок вызовов внутри thunk, проходит, даже если состояние получилось неправильным, и падает в день переименования вспомогательной функции. Проверяйте состояние — тогда сообщение об ошибке останется понятным.'
          ),
        },
        {
          tone: 'tip',
          title: L('Test the branches nobody clicks', 'Тестируйте ветки, по которым никто не кликает'),
          text: L(
            'The empty list, the missing entity, the failed request and the slow answer are the branches that reach production. They are also the ones a manual check never opens, so they are the ones a test has to cover.',
            'Пустой список, отсутствующая сущность, упавший запрос и медленный ответ — это ветки, которые доезжают до продакшена. Именно их ручная проверка не открывает, поэтому их и должен покрывать тест.'
          ),
        },
      ],
      takeaway: L(
        'Drive the real code and assert on the state, because a test that counts calls breaks on every refactor and misses every behaviour bug.',
        'Проверяйте настоящий код и проверяйте состояние: тест, считающий вызовы, ломается на каждом рефакторинге и пропускает каждую поведенческую ошибку.'
      ),
      seeAlso: [
        L('Section 7-5: testing components with a store', 'Секция 7-5: тестирование компонентов с хранилищем'),
        L('Section 4-3: unwrapResult and error handling', 'Секция 4-3: unwrapResult и обработка ошибок'),
        L('Section 3-1: writing selectors', 'Секция 3-1: написание селекторов'),
      ],
    },
    {
      id: 'redux-ch7-s5',
      title: L('Testing components with a store', 'Тестирование компонентов с хранилищем'),
      body: L(
        'A component that reads from the store needs two things around it: a Provider and a store that already holds the state under test. The store is created with configureStore exactly as in the application, and preloadedState fills it with the fixture, so the component renders from the state and no request is sent at all. That is the fastest test of the rendering path, and it fails the moment the component depends on data that is not in the fixture.\n\nThe network is mocked at the boundary. With RTK Query that boundary is the baseQuery: a fake baseQuery returns canned answers, so the hooks, the cache and the loading states are all exercised for real, while nothing goes over the wire. Between the tests the cache has to be cleared, because the entries of one test are visible to the next one unless you reset them.\n\nThe store must be built per test. A store shared between the tests leaks the state of one test into the next one, and the failure appears in a test that has nothing to do with the change that caused it.\n\nAnd the mock belongs to the test file, not to the source. A mocked module inside the application code turns every test into a lie about the code that ships.',
        'Компоненту, который читает из хранилища, нужны две вещи вокруг: Provider и хранилище, в котором уже лежит состояние под тестом. Хранилище создаётся через configureStore ровно так же, как в приложении, а preloadedState наполняет его фикстурой, поэтому компонент рендерится из состояния и запрос вообще не отправляется. Это самый быстрый тест пути рендеринга, и он падает ровно тогда, когда компонент зависит от данных, которых в фикстуре нет.\n\nСеть мокают на границе. В случае RTK Query граница — это baseQuery: поддельный baseQuery возвращает заготовленные ответы, поэтому хуки, кэш и состояния загрузки проверяются по-настоящему, а по сети не уходит ничего. Между тестами кэш надо сбрасывать, иначе записи одного теста видны следующему.\n\nХранилище нужно создавать на каждый тест. Общее на тесты хранилище пропускает состояние одного теста в следующий, и ошибка всплывает в тесте, который никак не связан с изменением, её вызвавшим.\n\nИ мок должен жить в файле теста, а не в исходниках. Замоканный модуль внутри кода приложения превращает каждый тест в ложь о том коде, который уходит в продакшен.'
      ),
      bullets: [
        L('A component test needs a Provider and a store that holds the state under test.', 'Тесту компонента нужен Provider и хранилище с состоянием под тестом.'),
        L('preloadedState fills the store, so no request is sent.', 'preloadedState наполняет хранилище, поэтому запрос не отправляется.'),
        L('Mock at the boundary, with a fake baseQuery or a request interceptor.', 'Мокайте на границе: поддельный baseQuery или перехватчик запросов.'),
        L('Clear the RTK Query cache between the tests.', 'Сбрасывайте кэш RTK Query между тестами.'),
        L('Build a fresh store per test, otherwise the state leaks.', 'Создавайте новое хранилище на каждый тест, иначе состояние утекает.'),
      ],
      code: `import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { postsApi } from './postsApi';
import type { RootState } from './store';

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
  });
}

// Between the tests the cache is cleared, so nothing leaks into the next one.
const store = createTestStore();
store.dispatch(postsApi.util.resetApiState());`,
      table: {
        caption: L('What to put in the store of a component test', 'Что класть в хранилище теста компонента'),
        headers: [L('Part', 'Часть'), L('Filled with', 'Чем наполнить'), L('Why', 'Почему')],
        rows: [
          [
            L('the slices', 'слайсы'),
            L('preloadedState', 'preloadedState'),
            L('the component renders from the state', 'компонент рендерится из состояния'),
          ],
          [
            L('the api reducer', 'редьюсер api'),
            L('the real reducer', 'настоящий редьюсер'),
            L('the cache behaves as in production', 'кэш ведёт себя как в продакшене'),
          ],
          [
            L('the api middleware', 'middleware api'),
            L('the real middleware', 'настоящий middleware'),
            L('the hooks and the loading states are real', 'хуки и состояния загрузки настоящие'),
          ],
          [
            L('the network', 'сеть'),
            L('a fake baseQuery', 'поддельный baseQuery'),
            L('nothing goes over the wire', 'по сети не уходит ничего'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('One store for the whole suite', 'Одно хранилище на весь прогон'),
          text: L(
            'A store created once at the top of the test file keeps every entry of every test. The suite passes until the order changes, and then two tests fail for a reason that has nothing to do with either of them.',
            'Хранилище, созданное один раз в начале файла тестов, сохраняет все записи всех тестов. Набор проходит, пока не меняется порядок, а потом два теста падают по причине, не связанной ни с одним из них.'
          ),
        },
        {
          tone: 'tip',
          title: L('Two levels of tests', 'Два уровня тестов'),
          text: L(
            'A test with a preloaded state checks the rendering and the interaction, and it is fast. A test with a fake baseQuery checks the whole data flow, from the hook to the cache to the screen, and it is slower. Keep both, because they fail for different reasons.',
            'Тест с готовым состоянием проверяет рендеринг и взаимодействие, и он быстрый. Тест с поддельным baseQuery проверяет весь поток данных, от хука через кэш до экрана, и он медленнее. Держите оба: они падают по разным причинам.'
          ),
        },
      ],
      takeaway: L(
        'Build a fresh store for every test, fill it with preloadedState and mock the network at the boundary of the API.',
        'Создавайте новое хранилище на каждый тест, наполняйте его через preloadedState и мокайте сеть на границе API.'
      ),
      seeAlso: [
        L('Section 7-4: testing slices, thunks and selectors', 'Секция 7-4: тестирование слайсов, thunk и селекторов'),
        L('Section 7-6: common state architecture mistakes', 'Секция 7-6: типичные ошибки в организации состояния'),
        L('Section 5-5: the generated hooks', 'Секция 5-5: сгенерированные хуки'),
      ],
    },
    {
      id: 'redux-ch7-s6',
      title: L('Common state architecture mistakes', 'Типичные ошибки в организации состояния'),
      body: L(
        'The same handful of mistakes shows up in every codebase that grew without a plan. The state is duplicated: the same list lives in the RTK Query cache and in a slice, or in the store and in a component. The same data is fetched twice, because two components each start a request and neither invalidates the tags. The business logic lives in the components, which decide when to fetch and compute the derived values themselves.\n\nThree smaller mistakes complete the list. One giant slice replaces the slices per feature, so any change touches one file and every change touches everything. Derived data is stored, so a value that could be computed from the state goes stale the moment one of its sources changes. And a value that only one component reads is put into the global store, where it outlives the component and confuses the next reader.\n\nThe repair is a small set of rules. Server data lives in the RTK Query cache and nowhere else. Client data lives in a slice per feature. Derived data is computed by a selector. Business rules live in the slice, the thunk or the listener, not in the component. And the state holds no value that cannot be serialised.\n\nThese rules are not bureaucracy. Each of them removes a class of bugs that have nothing to do with Redux: two copies of one fact, a stale derived value, a request that runs twice.',
        'Один и тот же набор ошибок встречается в каждом кодовой базе, выросшей без плана. Состояние дублируется: один и тот же список лежит в кэше RTK Query и в слайсе или в хранилище и в компоненте. Одни и те же данные запрашиваются дважды, потому что два компонента начинают по запросу и никто не инвалидирует теги. Бизнес-логика живёт в компонентах, которые сами решают, когда запрашивать, и сами вычисляют производные значения.\n\nЕщё три ошибки дополняют список. Один огромный слайс заменяет слайсы по фичам, и любое изменение трогает один файл, а значит, трогает всё. Производные данные хранятся, и значение, которое можно вычислить из состояния, устаревает в тот момент, когда меняется один из его источников. А значение, которое читает один компонент, попадает в глобальное хранилище, где оно переживает компонент и сбивает с толку следующего читателя.\n\nЛечится это небольшим набором правил. Серверные данные лежат в кэше RTK Query и больше нигде. Клиентские данные лежат в слайсе по фиче. Производные данные вычисляет селектор. Бизнес-правила живут в слайсе, в thunk или в листенере, а не в компоненте. И в состоянии нет ни одного значения, которое нельзя сериализовать.\n\nЭти правила — не бюрократия. Каждое убирает класс багов, не связанных с Redux: две копии одного факта, устаревшее производное значение, запрос, который уходит дважды.'
      ),
      bullets: [
        L('One source of truth per fact: server data in the cache, client data in a slice.', 'Один источник правды на факт: серверные данные в кэше, клиентские в слайсе.'),
        L('Derived data belongs in a selector, not in the state.', 'Производные данные принадлежат селектору, а не состоянию.'),
        L('Business logic belongs in the slice, the thunk or the listener.', 'Бизнес-логика живёт в слайсе, в thunk или в листенере.'),
        L('Fetch a resource once and share the cache entry through tags.', 'Запрашивайте ресурс один раз и делитесь записью кэша через теги.'),
        L('Keep local UI state in the component when nothing else reads it.', 'Локальное состояние интерфейса оставляйте в компоненте, если его больше никто не читает.'),
      ],
      code: `import { useEffect, useState } from 'react';
import { useGetPostsQuery } from './postsApi';
import { useAppSelector, selectVisiblePosts } from './store';
import type { Post } from './types';

// Wrong: the same fact in two places, and a request per component.
const [localPosts, setLocalPosts] = useState<Post[]>([]);
useEffect(() => {
  fetch('/api/posts')
    .then((response) => response.json())
    .then(setLocalPosts);
}, []);
const cachedPosts = useAppSelector((state) => state.feed.items);

// Right: one request, one cache entry, one projection for the screen.
const { data: posts } = useGetPostsQuery();
const visiblePosts = useAppSelector(selectVisiblePosts);`,
      table: {
        caption: L('The mistakes and their repair', 'Ошибки и их лечение'),
        headers: [L('Mistake', 'Ошибка'), L('Symptom', 'Симптом'), L('Repair', 'Лечение')],
        rows: [
          [
            L('the state is duplicated', 'состояние дублируется'),
            L('two versions of one screen', 'две версии одного экрана'),
            L('keep one owner per fact', 'один владелец на факт'),
          ],
          [
            L('the same request runs twice', 'один и тот же запрос уходит дважды'),
            L('a doubled bill and a flicker', 'двойной счёт и мигание'),
            L('tags and a shared cache entry', 'теги и общая запись кэша'),
          ],
          [
            L('the logic sits in the component', 'логика живёт в компоненте'),
            L('the behaviour differs between screens', 'поведение отличается на разных экранах'),
            L('move it into the slice or the thunk', 'перенести в слайс или в thunk'),
          ],
          [
            L('derived data is stored', 'производные данные хранятся'),
            L('a stale total next to fresh rows', 'устаревшая сумма рядом со свежими строками'),
            L('compute it in a selector', 'вычислять в селекторе'),
          ],
          [
            L('everything goes into one slice', 'всё лежит в одном слайсе'),
            L('every change touches every feature', 'каждое изменение трогает каждую фичу'),
            L('a slice per feature', 'слайс на фичу'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The fetch inside the component', 'Запрос внутри компонента'),
          text: L(
            'A component that fetches on mount runs the request again every time it is mounted, and two components mounted at the same time run it twice. Move the request into a query or a thunk and let the cache decide whether it is needed.',
            'Компонент, который запрашивает данные при монтировании, повторяет запрос при каждом монтировании, а два компонента, смонтированные одновременно, запускают его дважды. Перенесите запрос в query или в thunk, а решение о нём отдайте кэшу.'
          ),
        },
        {
          tone: 'note',
          title: L('One fact, one owner', 'Один факт — один владелец'),
          text: L(
            'The rule is not about the size of the state but about the number of copies of a fact. A large normalised state is fine. One entity stored in the cache, in a slice and in a local copy is not.',
            'Правило касается не размера состояния, а числа копий одного факта. Большое нормализованное состояние — нормально. Одна сущность в кэше, в слайсе и в локальной копии — нет.'
          ),
        },
      ],
      takeaway: L(
        'One owner per fact, derived data in selectors, business rules out of the components, and nothing in the state that cannot be serialised.',
        'Один владелец на факт, производные данные в селекторах, бизнес-правила вне компонентов и в состоянии только то, что сериализуется.'
      ),
      seeAlso: [
        L('Section 7-5: testing components with a store', 'Секция 7-5: тестирование компонентов с хранилищем'),
        L('Section 5-6: when RTK Query is the wrong tool', 'Секция 5-6: когда RTK Query не нужен'),
        L('Chapter 2: slices and the shape of a domain', 'Глава 2: слайсы и форма домена'),
      ],
    },
  ],
};
