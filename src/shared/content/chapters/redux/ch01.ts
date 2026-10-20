import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh01: Chapter = {
  id: 'redux-ch1',
  title: L('The mental model of Redux', 'Ментальная модель Redux'),
  summary: L(
    'How a store holds one state tree, what an action is and what must never end up in it, the (state, action) => state contract of a reducer, why dispatch is the only way to change anything, and how Immer produces immutable updates.',
    'Как хранилище держит одно дерево состояния, что такое действие и что в нём быть не должно, контракт редьюсера (state, action) => state, почему dispatch — единственный способ что-то изменить и как Immer делает обновления иммутабельными.'
  ),
  sections: [
    {
      id: 'redux-ch1-s1',
      title: L('The store and the state tree', 'Хранилище и дерево состояния'),
      body: L(
        'Redux keeps the entire state of an application in a single JavaScript object. That object is the state tree, and its top level is divided into branches, one per domain. The store is the object that owns the tree and offers exactly three things: getState to read it, dispatch to change it and subscribe to observe it. Components, hooks and thunks never touch the tree directly, they go through the store, and that is what makes the flow of data in the application something you can trace.\n\nThe tree is plain data. It holds objects, arrays, strings and numbers, and nothing exotic, which means it can be serialised to JSON, written to a log, sent to a worker, compared with a previous version and replaced by an older snapshot. The Redux DevTools do exactly that when you travel in time, and they can do it because every version of the state is just a value that can be stored.\n\nA store is created once, at the boundary of the application, and lives as long as the page does. configureStore wires the root reducer, the middleware chain and the development checks into one call and returns the store. The root reducer is usually a map of slice reducers, so every branch of the tree has exactly one owner. That single owner is the reason a change in one domain cannot silently corrupt another.',
        'Redux держит всё состояние приложения в одном объекте JavaScript. Этот объект — дерево состояния, а его верхний уровень разбит на ветви, по одной на домен. Хранилище — это объект, который владеет деревом и предоставляет ровно три вещи: getState для чтения, dispatch для изменения и subscribe для наблюдения. Компоненты, хуки и thunk не трогают дерево напрямую, они идут через хранилище — именно поэтому поток данных в приложении можно проследить.\n\nДерево — это обычные данные. В нём есть объекты, массивы, строки и числа, и ничего экзотического, а значит его можно сериализовать в JSON, записать в лог, отправить в воркер, сравнить с предыдущей версией и подменить старым снимком. Именно так и работает Redux DevTools, когда вы путешествуете во времени: каждая версия состояния — просто значение, которое можно сохранить.\n\nХранилище создаётся один раз, на границе приложения, и живёт столько же, сколько страница. configureStore связывает корневой редьюсер, цепочку middleware и проверки для разработки в один вызов и возвращает хранилище. Корневой редьюсер обычно является картой редьюсеров слайсов, поэтому у каждой ветви дерева ровно один владелец. Именно этот владелец не даёт изменению в одном домене незаметно испортить другой.'
      ),
      bullets: [
        L('The store owns one state tree and exposes getState, dispatch and subscribe.', 'Хранилище владеет одним деревом состояния и предоставляет getState, dispatch и subscribe.'),
        L('The tree holds plain, serialisable data and nothing else.', 'В дереве лежат только обычные сериализуемые данные.'),
        L('Every branch of the tree is owned by exactly one reducer.', 'У каждой ветви дерева ровно один владелец — редьюсер.'),
        L('The store is created once, at the boundary of the application.', 'Хранилище создаётся один раз, на границе приложения.'),
        L('Nothing outside the store writes into the state tree.', 'Ничто вне хранилища не пишет в дерево состояния.'),
      ],
      code: `import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' },
  reducers: {},
});

// The root reducer is a map: one branch of the tree, one owner.
export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks keep every component honest about the tree it reads.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`,
      table: {
        caption: L('The three things a store offers', 'Три вещи, которые предоставляет хранилище'),
        headers: [L('API', 'API'), L('What it does', 'Что делает'), L('Typical use', 'Типичное применение')],
        rows: [
          [
            L('getState()', 'getState()'),
            L('Returns the current state tree', 'Возвращает текущее дерево состояния'),
            L('Reading it inside a thunk or a listener', 'Чтение внутри thunk или прослушивателя'),
          ],
          [
            L('dispatch(action)', 'dispatch(action)'),
            L('Sends an action through the middleware and the reducers', 'Отправляет действие через middleware и редьюсеры'),
            L('The only way to change the state', 'Единственный способ изменить состояние'),
          ],
          [
            L('subscribe(listener)', 'subscribe(listener)'),
            L('Calls the listener after every dispatch', 'Вызывает слушателя после каждого dispatch'),
            L('Wiring React to the store', 'Связывание React с хранилищем'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Keep the tree serialisable', 'Дерево должно оставаться сериализуемым'),
          text: L(
            'The development checks warn when a non-serialisable value enters the state, for example a Date or a class instance. The warning is not pedantry: serialisability is what makes the DevTools, the server rendering and the time travel work.',
            'Проверки в режиме разработки предупреждают, если в состояние попало значение, которое нельзя сериализовать, например Date или экземпляр класса. Предупреждение не занудство: сериализуемость — это то, благодаря чему работают DevTools, серверный рендеринг и путешествие во времени.'
          ),
        },
      ],
      takeaway: L(
        'One store holds one tree, and every change to that tree goes through dispatch.',
        'Одно хранилище держит одно дерево, и любое изменение этого дерева проходит через dispatch.'
      ),
      seeAlso: [
        L('Chapter 2: slices and the shape of a domain', 'Глава 2: слайсы и форма домена'),
        L('Chapter 3: reading state, selectors and memoisation', 'Глава 3: чтение состояния, селекторы и мемоизация'),
      ],
    },
    {
      id: 'redux-ch1-s2',
      title: L('Actions and the reducer contract', 'Действия и контракт редьюсера'),
      body: L(
        'An action is a plain object with a type field and, usually, a payload. It describes something that already happened: a todo was added, a request failed, the user signed out. It is not a command, it is not a function, and it must not contain anything that depends on the current state. Nothing in an action should read the store, call the API or make a decision, because the reducer that receives it has to handle it without knowing where it came from.\n\nThe reducer is a function of exactly two arguments: the current state and the action. It returns the next state. It does not mutate the state it was given, it performs no input and output, and it does not depend on anything outside its two arguments. Given the same state and the same action it returns the same result, every time, and that is what makes the history of the application replayable.\n\nThe contract is short enough to write on one line: (state, action) => state. Redux core is not more complicated than that, and everything in the surrounding ecosystem exists to fill in the details the contract leaves to you. Redux Toolkit adds a store setup, generated action creators, a case reducer syntax and immutable updates, but underneath it is still the same function from the first day of Redux.',
        'Действие — это обычный объект с полем type и, обычно, payload. Оно описывает то, что уже произошло: задачу добавили, запрос упал, пользователь вышел. Это не команда и не функция, и в нём не должно быть ничего, зависящего от текущего состояния. Действие не читает хранилище, не ходит в API и не принимает решений, потому что редьюсер, который его получит, обязан обработать его, не зная происхождения.\n\nРедьюсер — это функция ровно от двух аргументов: текущего состояния и действия. Она возвращает следующее состояние. Она не мутирует переданное состояние, не делает ввода-вывода и не зависит ни от чего, кроме своих двух аргументов. На одни и те же состояние и действие она всегда возвращает один и тот же результат, и именно поэтому историю приложения можно воспроизвести заново.\n\nКонтракт помещается в одну строку: (state, action) => state. Ядро Redux сложнее этого не устроено, и всё вокруг него существует ровно затем, чтобы заполнить детали, которые контракт оставляет на вас. Redux Toolkit добавляет настройку хранилища, генерацию создателей действий, синтаксис case-редьюсеров и иммутабельные обновления, но внутри остаётся той же функцией с первого дня Redux.'
      ),
      bullets: [
        L('An action is plain data: a type and an optional payload.', 'Действие — это обычные данные: type и, возможно, payload.'),
        L('An action describes what happened, never what to do.', 'Действие описывает, что произошло, а не что делать.'),
        L('A reducer takes (state, action) and returns the next state.', 'Редьюсер принимает (state, action) и возвращает следующее состояние.'),
        L('The same state and action must always produce the same result.', 'Одни и те же состояние и действие всегда дают один и тот же результат.'),
        L('An unknown action must leave the state untouched.', 'Неизвестное действие должно оставлять состояние нетронутым.'),
      ],
      code: `type CounterAction =
  | { type: 'counter/increment'; by: number }
  | { type: 'counter/reset' };

interface CounterState { value: number }

const initialState: CounterState = { value: 0 };

// (state, action) => state, and nothing else.
export function counterReducer(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, value: state.value + action.by };
    case 'counter/reset':
      return initialState;
    default:
      return state;
  }
}`,
      table: {
        caption: L('What may live inside an action', 'Что допустимо внутри действия'),
        headers: [L('Part', 'Часть'), L('Example', 'Пример'), L('Why', 'Почему')],
        rows: [
          [
            L('type', 'type'),
            L("'todos/addTodo'", "'todos/addTodo'"),
            L('Identifies the case in the reducer', 'Идентифицирует случай в редьюсере'),
          ],
          [
            L('payload', 'payload'),
            L("'buy milk'", "'buy milk'"),
            L('The data the reducer needs', 'Данные, нужные редьюсеру'),
          ],
          [
            L('meta', 'meta'),
            L('{ requestId }', '{ requestId }'),
            L('Technical details, ignored by the reducer', 'Технические детали, которые редьюсер игнорирует'),
          ],
          [
            L('state, Date.now(), fetch()', 'state, Date.now(), fetch()'),
            L('not allowed', 'запрещено'),
            L('Breaks purity and replayability', 'Ломает чистоту и воспроизводимость'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Logic does not belong in an action creator', 'Логике не место в создателе действия'),
          text: L(
            'An action creator that filters a list or decides which id to use hides a decision from the reducer and makes the action unreplayable. Move the decision into the reducer, where it becomes part of the state transition and can be tested on its own.',
            'Создатель действия, который фильтрует список или решает, какой id взять, прячет решение от редьюсера и делает действие невоспроизводимым. Перенесите решение в редьюсер: там оно станет частью перехода состояния и его можно проверить отдельно.'
          ),
        },
      ],
      takeaway: L(
        'An action is data about the past, and a reducer is a pure function of state and action.',
        'Действие — это данные о прошлом, а редьюсер — чистая функция состояния и действия.'
      ),
      seeAlso: [
        L('Section 1-4: why reducers must be pure', 'Секция 1-4: почему редьюсеры должны быть чистыми'),
        L('Section 2-1: createSlice and its parts', 'Секция 2-1: createSlice и его части'),
      ],
    },
    {
      id: 'redux-ch1-s3',
      title: L('dispatch and the unidirectional flow', 'dispatch и однонаправленный поток'),
      body: L(
        'dispatch is the only entry point into the store. It takes an action, runs it through the middleware chain, hands it to the root reducer, replaces the state with the result and notifies the subscribers. The flow has exactly one direction: an event in the interface becomes an action, the action becomes a new state, the new state becomes props and a re-render. No component writes into the data of another component, and no component mutates the tree, so the path from an event to a pixel can always be followed.\n\nReact closes the loop. useSelector subscribes a component to a part of the tree, and useDispatch gives it the function that starts the cycle. The component never decides what the next state is, it reports what happened and lets the reducer decide. That is the unidirectional flow, and it is what makes the data flow of a React and Redux application readable at a glance.\n\ndispatch is synchronous, so the line right after it already sees the new state. Asynchronous work does not belong inside the dispatch call itself: it belongs in a thunk, which dispatches actions when the request starts, when it succeeds and when it fails. Keeping that split small is what keeps the model small: actions in, state out, and every side effect expressed as a sequence of actions.',
        'dispatch — единственный вход в хранилище. Он принимает действие, прогоняет его через цепочку middleware, отдаёт корневому редьюсеру, заменяет состояние результатом и уведомляет подписчиков. Поток идёт строго в одну сторону: событие в интерфейсе превращается в действие, действие — в новое состояние, новое состояние — в пропсы и перерисовку. Ни один компонент не пишет в данные другого компонента и не мутирует дерево, поэтому путь от события до пикселя всегда можно проследить.\n\nReact замыкает цикл. useSelector подписывает компонент на часть дерева, а useDispatch даёт ему функцию, которая запускает цикл. Компонент не решает, каким будет следующее состояние, он сообщает, что произошло, а решение принимает редьюсер. Это и есть однонаправленный поток, и именно он делает поток данных в приложении на React и Redux читаемым с первого взгляда.\n\ndispatch синхронен, поэтому строка сразу после него уже видит новое состояние. Асинхронная работа не должна жить внутри самого dispatch: ей место в thunk, который отправляет действия, когда запрос начался, когда он удался и когда он провалился. Чем меньше эта система, тем проще модель: действия на входе, состояние на выходе, а любой побочный эффект выражен последовательностью действий.'
      ),
      bullets: [
        L('dispatch is the only way to change the state.', 'dispatch — единственный способ изменить состояние.'),
        L('The flow has one direction: event, action, new state, re-render.', 'Поток идёт в одну сторону: событие, действие, новое состояние, перерисовка.'),
        L('dispatch is synchronous, so the next line sees the new state.', 'dispatch синхронен, поэтому следующая строка видит новое состояние.'),
        L('subscribe returns the function that cancels the subscription.', 'subscribe возвращает функцию, отменяющую подписку.'),
        L('Asynchronous work lives in a thunk, not inside dispatch.', 'Асинхронная работа живёт в thunk, а не внутри dispatch.'),
      ],
      code: `import { configureStore } from '@reduxjs/toolkit';

const reducer = (state: { value: number } = { value: 0 }, action: { type: string }) => {
  if (action.type === 'counter/increment') return { value: state.value + 1 };
  return state;
};

const store = configureStore({ reducer });

// The only way to change the state.
store.dispatch({ type: 'counter/increment' });
console.log(store.getState().value); // 1

// Subscribers are notified after every dispatch.
const unsubscribe = store.subscribe(() => {
  console.log('new value:', store.getState().value);
});

store.dispatch({ type: 'counter/increment' });
unsubscribe();`,
      table: {
        caption: L('What happens during one dispatch', 'Что происходит за один dispatch'),
        headers: [L('Step', 'Шаг'), L('What happens', 'Что происходит')],
        rows: [
          [
            L('1', '1'),
            L('The action passes through the middleware chain', 'Действие проходит через цепочку middleware'),
          ],
          [
            L('2', '2'),
            L('The root reducer computes the next state', 'Корневой редьюсер вычисляет следующее состояние'),
          ],
          [
            L('3', '3'),
            L('The store replaces its state with the result', 'Хранилище заменяет состояние результатом'),
          ],
          [
            L('4', '4'),
            L('The subscribers are notified', 'Подписчики уведомляются'),
          ],
          [
            L('5', '5'),
            L('React re-renders the components that read the changed values', 'React перерисовывает компоненты, читающие изменившиеся значения'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Do not dispatch during render', 'Не отправляйте действия во время рендера'),
          text: L(
            'Dispatching inside a component body or inside an effect without a dependency array produces an endless loop of updates. If a value can be derived from the state, derive it with a selector instead of storing it.',
            'Отправка действия в теле компонента или в эффекте без массива зависимостей даёт бесконечный цикл обновлений. Если значение выводится из состояния, выводите его селекторомом, а не храните.'
          ),
        },
      ],
      takeaway: L(
        'Everything enters the store through dispatch, and the state only ever flows in one direction.',
        'Всё попадает в хранилище только через dispatch, а состояние течёт строго в одном направлении.'
      ),
      seeAlso: [
        L('Section 1-2: actions and the reducer contract', 'Секция 1-2: действия и контракт редьюсера'),
        L('Chapter 4: asynchronous data flow', 'Глава 4: асинхронный поток данных'),
      ],
    },
    {
      id: 'redux-ch1-s4',
      title: L('Why reducers must be pure', 'Почему редьюсеры должны быть чистыми'),
      body: L(
        'A reducer must be a pure function: the same arguments always give the same result, and nothing outside the function is touched. It may not mutate the state it receives, may not read the clock or a random source, and may not perform input and output. Purity is what lets Redux compare the previous state with the next one, skip re-renders when nothing changed and replay the whole history in the DevTools. Break purity and the replay produces a different tree than the one the user actually saw.\n\nThe most common violation is mutation. Writing state.count += 1 inside a reducer changes the old tree in place, so the previous state and the next state are the same object, the comparison sees no difference and the interface does not update. The second most common violation is reading Date.now() or Math.random(): the reducer becomes a function of the wall clock, so the same action applied twice produces two different states, and travelling back in time rewrites the past instead of showing it.\n\nThe rule is not negotiable, but it is also easy to honour by hand in a small application: write a new object, spread the old one, copy the array you changed. The next section shows how Redux Toolkit removes that bookkeeping completely with Immer, so a reducer reads like a mutation but still produces a new tree.',
        'Редьюсер должен быть чистой функцией: одни и те же аргументы всегда дают один и тот же результат, и ничего за пределами функции не затрагивается. Он не мутирует переданное состояние, не читает часы и случайные источники, не делает ввода-вывода. Именно чистота позволяет Redux сравнивать предыдущее состояние со следующим, пропускать перерисовку, когда ничего не изменилось, и воспроизводить всю историю в DevTools. Сломайте чистоту — и воспроизведение даст другое дерево, чем то, которое видел пользователь.\n\nСамое частое нарушение — мутация. Запись state.count += 1 внутри редьюсера меняет старое дерево на месте, поэтому предыдущее и следующее состояние оказываются одним и тем же объектом, сравнение не находит разницы, и интерфейс не обновляется. Второе по частоте нарушение — чтение Date.now() или Math.random(): редьюсер становится функцией от часов, одно и то же действие даёт два разных состояния, а путешествие назад переписывает прошлое вместо того, чтобы его показать.\n\nПравило не обсуждается, но в небольшом приложении его легко соблюсти руками: создайте новый объект, разверните старый, скопируйте изменённый массив. В следующей секции показано, как Redux Toolkit полностью снимает эту рутину через Immer: редьюсер читается как мутация, а дерево всё равно остаётся новым.'
      ),
      bullets: [
        L('A pure reducer returns the same result for the same state and action.', 'Чистый редьюсер возвращает один и тот же результат для одних и тех же состояния и действия.'),
        L('Mutating the state breaks change detection entirely.', 'Мутация состояния полностью ломает определение изменений.'),
        L('Date.now() and Math.random() make the reducer depend on the outside world.', 'Date.now() и Math.random() делают редьюсер зависимым от внешнего мира.'),
        L('Side effects belong in a thunk or a listener, never in a reducer.', 'Побочные эффекты живут в thunk или в прослушивателе, а не в редьюсере.'),
        L('Purity is the precondition for time travel and for tests.', 'Чистота — это предусловие путешествий во времени и тестов.'),
      ],
      code: `interface State { count: number; at?: number }

// Impure: mutates the input and reads the clock.
function badReducer(state: State, action: { type: 'inc' }): State {
  state.count += 1;
  return { ...state, at: Date.now() };
}

// Pure: the same state and action give the same result, every time.
function goodReducer(state: State, action: { type: 'inc' }): State {
  if (action.type !== 'inc') return state;
  return { ...state, count: state.count + 1 };
}

const before: State = { count: 0 };
const after = badReducer(before, { type: 'inc' });
console.log(before.count);     // 1 - the old state was mutated
console.log(after === before); // true - no new object was created`,
      table: {
        caption: L('Pure or not', 'Чисто или нет'),
        headers: [L('Expression', 'Выражение'), L('Pure?', 'Чисто?'), L('Consequence', 'Последствие')],
        rows: [
          [
            L('return { ...state, count: state.count + 1 }', 'return { ...state, count: state.count + 1 }'),
            L('yes', 'да'),
            L('A new tree, the old one is intact', 'Новое дерево, старое цело'),
          ],
          [
            L('state.count += 1', 'state.count += 1'),
            L('no', 'нет'),
            L('No re-render, the old state is destroyed', 'Нет перерисовки, старое состояние испорчено'),
          ],
          [
            L('createdAt: Date.now()', 'createdAt: Date.now()'),
            L('no', 'нет'),
            L('The replay rewrites the past', 'Воспроизведение переписывает прошлое'),
          ],
          [
            L('await fetch(url)', 'await fetch(url)'),
            L('no', 'нет'),
            L('A network call while the state changes', 'Сетевой запрос во время изменения состояния'),
          ],
          [
            L('id: Math.random()', 'id: Math.random()'),
            L('no', 'нет'),
            L('Untestable and irreproducible', 'Непроверяемо и невоспроизводимо'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The nested mutation', 'Мутация во вложенности'),
          text: L(
            'Mutating a nested object is the same bug one level deeper: the outer object is new, so the change is detected, but the branch you touched was shared with the previous state, and the old snapshot now shows the new value too. That is how time travel starts lying.',
            'Мутация вложенного объекта — тот же баг на уровень глубже: внешний объект новый, поэтому изменение заметят, но ветку, которую вы тронули, вы делили с предыдущим состоянием, и в старом снимке теперь тоже новое значение. Именно так путешествие во времени начинает врать.'
          ),
        },
      ],
      takeaway: L(
        'A reducer that reads the clock or mutates its input breaks replay, change detection and tests at the same time.',
        'Редьюсер, который читает часы или мутирует свой аргумент, одновременно ломает воспроизведение, определение изменений и тесты.'
      ),
      seeAlso: [
        L('Section 1-5: Immer and immutable updates', 'Секция 1-5: Immer и иммутабельные обновления'),
        L('Section 7-3: the DevTools and time travel', 'Секция 7-3: DevTools и путешествие во времени'),
      ],
    },
    {
      id: 'redux-ch1-s5',
      title: L('Immer and immutable updates', 'Immer и иммутабельные обновления'),
      body: L(
        'Redux Toolkit wraps every case reducer in Immer. Inside the reducer you receive a draft: a mutable looking copy of the state. You change it as if it were the real object, and when the reducer returns, Immer compares the draft with the original and produces a new state, but only for the branches that actually changed. Nothing outside the reducer ever sees the draft, and the state that was handed in is never modified.\n\nThis is the meeting point of two worlds. JavaScript has no built-in immutable data structures, so the classic tutorials spend a third of their length teaching you to copy objects and arrays by hand, and a wrong copy silently breaks change detection. Immer moves that burden into a library that understands structural sharing: unchanged branches keep their identity, so a memoised selector or a React memo does not see a new reference for data that did not change.\n\nThe cost of that convenience is one rule you must respect: only the draft may be mutated. Assigning a whole new object to a draft property, for example state.user = newUser, is allowed and is the right way to replace data. Mutating a value that came from outside the draft, such as an argument or an object you received from a selector, is not tracked, and the reducer will return the old state without any change.',
        'Redux Toolkit оборачивает каждый case-редьюсер в Immer. Внутри редьюсера вы получаете черновик: выглядящую как обычный объект изменяемую копию состояния. Вы меняете её так, будто это настоящий объект, а когда редьюсер возвращает результат, Immer сравнивает черновик с оригиналом и строит новое состояние, но только для тех ветвей, которые действительно изменились. Снаружи редьюсера черновик не виден никогда, а переданное состояние не меняется.\n\nЭто точка встречи двух миров. В JavaScript нет встроенных иммутабельных структур, поэтому в классических руководствах целая треть объёма уходит на то, чтобы научиться вручную копировать объекты и массивы, и ошибка в копировании молча ломает определение изменений. Immer перекладывает эту рутину в библиотеку, которая понимает структурное разделение: неизменённые ветви сохраняют свою идентичность, поэтому мемоизированный селектор или React memo не видят новой ссылки у данных, которые не менялись.\n\nЦена этого удобства — одно правило, которое надо соблюдать: мутировать можно только черновик. Присвоение нового объекта свойству черновика, например state.user = newUser, разрешено и является правильным способом заменить данные. А вот мутация значения, пришедшего извне черновика, — аргумента или объекта из селектора, — не отслеживается, и редьюсер вернёт то же самое состояние.'
      ),
      bullets: [
        L('A case reducer receives a draft, not the real state.', 'Case-редьюсер получает черновик, а не настоящее состояние.'),
        L('Mutating the draft produces a new state with structural sharing.', 'Мутация черновика даёт новое состояние со структурным разделением.'),
        L('Unchanged branches keep their reference, so memoisation still works.', 'Неизменённые ветви сохраняют ссылку, поэтому мемоизация работает.'),
        L('Assigning a new object to a draft property is the way to replace data.', 'Присвоение нового объекта свойству черновика — правильный способ заменить данные.'),
        L('Mutating a value from outside the draft is not tracked.', 'Мутация значения извне черновика не отслеживается.'),
      ],
      code: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState { items: string[]; total: number }

const initialState: CartState = { items: [], total: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // The state is a draft: mutate it, Immer builds the new tree.
    itemAdded(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
      state.total += 1;
    },
    cartCleared(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { itemAdded, cartCleared } = cartSlice.actions;
export default cartSlice.reducer;`,
      table: {
        caption: L('What you write and what the state becomes', 'Что вы пишете и во что превращается состояние'),
        headers: [L('In the reducer', 'В редьюсере'), L('In the state tree', 'В дереве состояния'), L('Old branches', 'Старые ветви')],
        rows: [
          [
            L('state.total += 1', 'state.total += 1'),
            L('A new object with a new total', 'Новый объект с новым total'),
            L('Keep their identity', 'Сохраняют идентичность'),
          ],
          [
            L('state.items.push(x)', 'state.items.push(x)'),
            L('A new array with one more item', 'Новый массив с одним элементом больше'),
            L('Keep their identity', 'Сохраняют идентичность'),
          ],
          [
            L('state.user = newUser', 'state.user = newUser'),
            L('A new object with the new user', 'Новый объект с новым пользователем'),
            L('Keep their identity', 'Сохраняют идентичность'),
          ],
          [
            L('state.items = []', 'state.items = []'),
            L('An empty array', 'Пустой массив'),
            L('Keep their identity', 'Сохраняют идентичность'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Drafts stop at the reducer', 'Черновик не выходит за пределы редьюсера'),
          text: L(
            'Immer freezes the produced state in development, so a piece of code that mutates the state outside a reducer fails loudly instead of corrupting the tree quietly. Keep that behaviour on while you develop.',
            'В режиме разработки Immer замораживает полученное состояние, и код, который мутирует состояние вне редьюсера, падает громко, а не портит дерево тихо. Не выключайте это поведение, пока идёт разработка.'
          ),
        },
      ],
      takeaway: L(
        'Inside a reducer you may mutate the draft; everywhere else the state stays untouched.',
        'Внутри редьюсера можно мутировать черновик; во всех остальных местах состояние не трогают.'
      ),
      seeAlso: [
        L('Section 1-4: why reducers must be pure', 'Секция 1-4: почему редьюсеры должны быть чистыми'),
        L('Chapter 2: slices and the shape of a domain', 'Глава 2: слайсы и форма домена'),
      ],
    },
  ],
};
