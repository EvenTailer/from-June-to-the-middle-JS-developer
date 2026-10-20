import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxChapters: Chapter[] = [
  {
    id: 'redux-ch1',
    title: L('The Mental Model of Redux', 'Ментальная модель Redux'),
    summary: L(
      'How a store turns a stream of events into a new state tree, why the data flow is one-directional, and where immutability and middleware fit into it.',
      'Как стор превращает поток событий в новое дерево состояния, почему поток данных однонаправленный и куда в него вписываются неизменяемость и middleware.'
    ),
    sections: [
      {
        id: 'redux-ch1-s1',
        title: L('The store and the state tree', 'Стор и дерево состояния'),
        body: L(
          'Redux keeps the whole application state in one place: a single object tree in a store. Every key corresponds to a domain area such as `users`, `cart` or `settings`, and nothing outside the store keeps a second copy of that data. This is the single source of truth idea: a component does not keep its own version of the order it just fetched, it reads the order from the store.\n\nThe store exposes a tiny API. `getState()` returns the current tree, `dispatch(action)` hands an event to the reducers, and `subscribe(listener)` registers a callback fired after every change. There is no setter for the tree, because the store never mutates state in place; data changes only when an action is dispatched that a reducer recognises. That restriction makes the flow traceable.\n\nThe tree is a snapshot, not a live document. Two components reading the same branch in one render see the same values, and a change deep inside one branch is invisible to code reading another. That is why Redux is easy to reason about and persist: the state can be serialised, logged and restored. The cost shows too: a large tree read on every dispatch costs more than a small one, and a shape mixing server data, interface state and form drafts is hard to change.',
          'Redux держит всё состояние приложения в одном месте: одно дерево объектов JavaScript, которое хранится в сторе. Каждый ключ соответствует предметной области: `users`, `cart`, `settings`, и вне стора нет второй достоверной копии этих данных. В этом и состоит идея единого источника истины: компонент не хранит собственную версию только что загруженного заказа, а читает заказ из стора и рисует то, что там лежит.\n\nУ стора крошечный API. `getState()` возвращает текущее дерево, `dispatch(action)` передаёт событие редьюдерам, а `subscribe(listener)` регистрирует обработчик, который срабатывает после каждого изменения состояния. Сеттера для дерева нет, потому что стор никогда не мутирует состояние на месте; единственный способ изменить данные — отправить экшен, который узнает какой-то редьюдер. Именно это ограничение делает поток приложения прослеживаемым: у каждого изменения есть имя, полезная нагрузка и место в истории.\n\nДерево — это снимок, а не живой документ. Два компонента, читающие одну и ту же ветку во время одного рендера, видят одинаковые значения, а изменение глубоко внутри одной ветки невидимо для кода, который читает другую ветку. Поэтому Redux легко рассуждать о нём и легко сохранять: всё состояние можно сериализовать, записать в лог и восстановить. Здесь же и появляется цена: большое дерево, которое читается на каждом dispatch, обходится дороже маленького, а форма состояния, смешивающая данные сервера, состояние интерфейса и черновики форм в одном объекте, меняется с трудом.',
        ),
        bullets: [
          L('The store holds one state tree; components read it instead of keeping copies.', 'Стор хранит одно дерево состояния, а компоненты читают его, а не держат копии.'),
          L('State changes only through dispatch; the store has no setter for the tree.', 'Состояние меняется только через dispatch, у стора нет сеттера для дерева.'),
          L('subscribe fires after every change, and that is what the React binding hooks into.', 'subscribe срабатывает после каждого изменения, и на этом построена привязка к React.'),
          L('A tree that mixes server data, interface state and form drafts is hard to change.', 'Дерево, смешивающее данные сервера, состояние интерфейса и черновики форм, меняется с трудом.'),
        ],
        code: `const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    cart: cartSlice.reducer,
  },
});

store.getState();          // { users: { ... }, cart: { ... } }
store.dispatch(cartSlice.actions.add({ id: 'sku-1', price: 900 }));`,
        takeaway: L(
          'One store, one tree, one way in: every change is an action you can name.',
          'Один стор, одно дерево, один вход: любое изменение — именуемый экшен.'
        ),
      },
      {
        id: 'redux-ch1-s2',
        title: L('Actions, reducers and dispatch', 'Экшены, редьюдеры и dispatch'),
        body: L(
          'An action is a plain object with a `type` field and, usually, a `payload`. It describes what happened, not what should happen: `cart/itemAdded` rather than `incrementCounter`. Actions are the only way to talk to the store, and they are plain data, so they can be serialised, logged, replayed in Redux DevTools and tested without rendering.\n\nA reducer is a pure function `(state, action) => newState`. It looks at the action type, decides whether it cares, and returns the state unchanged if it does not. Purity means three things: no mutation of the incoming state, no side effects such as fetching or writing to storage, and the same inputs produce the same output. Because reducers are pure, replaying an action against the same state produces the same result, which makes time-travel debugging possible.\n\nDispatch runs the action through the middleware chain, hands it to the root reducer, and notifies subscribers when the tree changes. The root reducer is usually built by `combineReducers`, which calls each slice reducer with its part of state and reassembles the tree. If a reducer returns the same object reference, the store treats that branch as unchanged. That reference check is why immutability is not a style preference: an array mutated in place is invisible to the store, to React and to selectors that compare by equality.',
          'Экшен — обычный объект с полем `type` и, обычно, с `payload`. Он описывает, что произошло, а не что должно произойти: `cart/itemAdded`, а не `incrementCounter`. Экшены — единственный способ обратиться к стору, и при этом они простые данные, поэтому их можно сериализовать, писать в лог, воспроизводить в Redux DevTools и проверять тестами вообще без рендеринга.\n\nРедьюсер — чистая функция `(state, action) => newState`. Она смотрит на тип экшена, решает, касается ли её это, и если не касается, возвращает состояние без изменений. Чистота означает три вещи: входящее состояние не мутируется, побочных эффектов нет (ни запросов, ни записи в local storage), а одинаковые входные данные всегда дают одинаковый результат. Именно из-за чистоты повторное применение того же экшена к тому же состоянию даёт тот же результат, и на этом стоит отладка с путешествием во времени.\n\nDispatch прогоняет экшен через цепочку middleware, передаёт его корневому редьюдеру и оповещает подписчиков, если дерево изменилось. Корневой редьюдер обычно собирается функцией `combineReducers`, которая вызывает редьюдер каждого слайса с его частью состояния и заново собирает дерево. Если редьюсер возвращает ту же ссылку на объект, стор считает ветку неизменной. Именно эта проверка по ссылке объясняет, почему неизменяемость — не стилистическое предпочтение: мутированный на месте массив невидим для стора, для React и для любого селектора, сравнивающего по равенству.',
        ),
        bullets: [
          L('Actions describe facts; reducers decide what a fact changes.', 'Экшены описывают факты, а редьюсеры решают, что этот факт меняет.'),
          L('A reducer must not mutate its argument and must not perform side effects.', 'Редьюсер не мутирует аргумент и не выполняет побочных эффектов.'),
          L('combineReducers isolates the slices and rebuilds the tree from them.', 'combineReducers изолирует слайсы и собирает дерево заново.'),
          L('Mutating state in place hides the change from the store and from React.', 'Мутация состояния на месте скрывает изменение от стора и от React.'),
        ],
        code: `const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as Line[] },
  reducers: {
    add: (state, action: PayloadAction<Line>) => {
      state.items.push(action.payload); // Immer keeps this immutable
    },
  },
});

store.dispatch(cartSlice.actions.add({ id: 'sku-1', price: 900 }));
// dispatched action: { type: 'cart/add', payload: { id: 'sku-1', price: 900 } }`,
        takeaway: L(
          'Reducers are pure, so side effects belong to middleware.',
          'Редьюдеры чистые, значит побочные эффекты — в middleware.'
        ),
      },
      {
        id: 'redux-ch1-s3',
        title: L('Immutability, Immer and configureStore', 'Неизменяемость, Immer и configureStore'),
        body: L(
          'Redux compares state branches by reference, so a reducer that mutates an array with `push` produces the same object, and React never re-renders. The classic solution is to copy every path you touch, which is verbose and easy to get wrong: a forgotten spread in a nested object silently drops a sibling. Immer solves this by letting you write the mutation you mean and deriving the copy for you.\n\nInside a `createSlice` reducer the `state` argument is a draft, a proxy that records what you change. When the reducer returns, Immer produces a new state in which only the modified path is copied and every untouched branch keeps its original reference. That is structural sharing, and it makes cheap reference comparisons work: an untouched subtree can be skipped by a memoised selector, by `React.memo` or by a manual comparison.\n\n`configureStore` assembles the production store: it combines the reducers, adds the two default middlewares, turns on the DevTools integration and enables the Immer and serialisability checks in development. The default pair is the thunk middleware, which lets an action creator return a function instead of a plain object, and the DevTools enhancer. Extra middleware follows the same shape: a function that receives the store and returns a function that receives the next middleware and returns a function handling the action.',
          'Redux сравнивает ветки состояния по ссылке, поэтому редьюсер, который мутирует массив через `push`, возвращает тот же объект, что получил, и React не перерисовывается. Классическое решение — копировать каждый затронутый путь, но это многословно и легко испортить: забытое раскрытие объекта в глубине молча теряет соседнее поле. Immer снимает проблему: вы пишете ту мутацию, которую имеете в виду, а копию он строит сам.\n\nВнутри редьюсера `createSlice` аргумент `state` — это черновик, прокси, который записывает все ваши изменения. Когда редьюдер возвращает результат, Immer создаёт новое состояние, в котором скопирован только изменённый путь, а нетронутые ветки сохраняют исходные ссылки. Это и есть структурное разделение, и именно оно делает возможными дешёвые проверки по ссылке: нетронутое поддерево пропускается мемоизированным селектором, `React.memo` или ручным сравнением.\n\n`configureStore` собирает production-стор: объединяет редьюдеры, добавляет два middleware по умолчанию, включает интеграцию с Redux DevTools и включает проверки Immer и сериализуемости в режиме разработки. Стандартная пара middleware — это thunk-middleware, позволяющая создателю экшена возвращать функцию вместо обычного объекта, и расширение DevTools. Дополнительный middleware устроен так же: функция получает стор и возвращает функцию, которая получает следующий middleware и возвращает функцию, обрабатывающую экшен.',
        ),
        bullets: [
          L('Mutating state in place hides the change from React and from the store.', 'Мутация состояния на месте скрывает изменение от React и от стора.'),
          L('Immer lets you write mutations and derives a copy with structural sharing.', 'Immer позволяет писать мутации и сам строит копию со структурным разделением.'),
          L('The default middleware is the thunk middleware plus the DevTools extension.', 'Middleware по умолчанию — это thunk-middleware и расширение DevTools.'),
          L('Serialisability checks in development catch bad payloads early.', 'Проверки сериализуемости в режиме разработки рано ловят плохие payload.'),
        ],
        code: `const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(analyticsMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});`,
        takeaway: L(
          'Immer gives you safe mutation syntax, but the store still only ever sees new references.',
          'Immer даёт безопасный синтаксис мутаций, но стор по-прежнему видит только новые ссылки.'
        ),
      },
    ],
  },
  {
    id: 'redux-ch2',
    title: L('Slices and Selectors', 'Слайсы и селекторы'),
    summary: L(
      'How to split an application into slices, where a reducer belongs, and how to read derived data with memoised selectors.',
      'Как разбить приложение на слайсы, где должен жить редьюсер и как читать производные данные мемоизированными селекторами.'
    ),
    sections: [
      {
        id: 'redux-ch2-s1',
        title: L('createSlice and the shape of a domain', 'createSlice и форма домена'),
        body: L(
          '`createSlice` is the entry point of modern Redux. One call produces a reducer, a set of action creators and the action type strings, and it gives the slice a name that prefixes every type it owns, so `todos/addTodo` and `filters/addTodo` never collide. That name is also the key under which the slice state lives, so the two should match.\n\nThe object passed to `createSlice` has three parts: `name`, `initialState` and `reducers`. Each key in `reducers` becomes an action creator named after the key, and the type of the dispatched action is `name/key`. The reducer receives `(state, action)`, where the state is typed from `initialState`, and in TypeScript the payload type comes from `PayloadAction<T>` or from an explicit reducer return type. The whole slice is inferred, so no separate types file is needed.\n\nA slice should map to a domain concept, not to a screen. `todos` and `filters` are separate slices because they change for different reasons and are read by different components; `settingsPage` is not a slice because it holds no domain state. The test is simple: if two parts of the app need the same data and must stay consistent, they belong to the same slice; if they change independently, to separate ones. The slices are combined into one root reducer with `combineReducers` or an object map.',
          '`createSlice` — входная точка современного Redux. Один вызов создаёт редьюдер, набор создателей экшенов и строки типов экшенов, а ещё задаёт слайсу имя, которым префиксуется каждый принадлежащий ему тип, поэтому `todos/addTodo` и `filters/addTodo` никогда не сталкиваются. Это же имя является ключом, под которым состояние слайса лежит в дереве, и потому имя слайса и ключ состояния должны совпадать.\n\nОбъект, передаваемый в `createSlice`, имеет три значимые части: `name`, `initialState` и `reducers`. Каждый ключ в `reducers` становится создателем экшена, названным по этому ключу, а тип отправленного экшена равен `name/key`. Редьюсер получает `(state, action)`, где тип state выводится из `initialState`, а в TypeScript тип payload задаётся через `PayloadAction<T>` или через явную аннотацию возвращаемого типа. Весь слайс выводится типами, поэтому в простом случае отдельный файл с типами не нужен.\n\nСлайс должен соответствовать предметному понятию, а не экрану. `todos` и `filters` — разные слайсы, потому что они меняются по разным причинам и читаются разными компонентами; `settingsPage` не слайс, потому что не содержит собственного доменного состояния. Проверка простая: если двум частям приложения нужны одни и те же данные и они обязаны оставаться согласованными, это один слайс; если они меняются независимо — разные. Слайсы собираются в корневой редьюдер через `combineReducers` или через объект с картой.',
        ),
        bullets: [
          L('One slice name prefixes all of its action types, so types never collide.', 'Имя слайса добавляет префикс ко всем его типам экшенов, поэтому коллизий не бывает.'),
          L('The slice name usually matches the key its state lives under.', 'Имя слайса обычно совпадает с ключом, под которым лежит его состояние.'),
          L('A slice maps to a domain concept, not to a screen.', 'Слайс отвечает предметному понятию, а не экрану.'),
          L('combineReducers assembles the slices into the root reducer.', 'combineReducers собирает слайсы в корневой редьюдер.'),
        ],
        code: `const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});`,
        takeaway: L(
          'A slice is a domain boundary, not a screen.',
          'Слайс — это граница предметной области, а не экран.'
        ),
      },
      {
        id: 'redux-ch2-s2',
        title: L('Reducers, extraReducers and prepare', 'Редьюдеры, extraReducers и prepare'),
        body: L(
          'Reducers inside a slice handle the actions that slice owns. `extraReducers` handles the actions it does not own: a thunk from another feature, a logout action from the session slice, an action dispatched by a third-party library. The builder syntax is the one to use in TypeScript, because the action creators are passed as values and the payload type is inferred rather than written as a string.\n\n`builder.addCase` handles one action type, `addMatcher` handles every action whose predicate returns true, and `addDefaultCase` handles the rest. The object syntax is equivalent but loses the type link and forces you to write the type name by hand as `todos/added`. A mismatch between that string and the real action type fails silently, and the reducer simply never runs.\n\nThe `prepare` callback lets you shape the action before it is dispatched. The action creator you get back accepts friendly arguments, such as a text string or an id, and the prepare function returns the payload the reducer actually sees, with a generated id, a timestamp or a normalised shape. It keeps randomness and id generation out of the reducer, which matters because a reducer must be pure: calling `Math.random()` inside a reducer makes the same action produce different state on replay, and the time travel in the DevTools stops reproducing the original run.',
          'Редьюсеры внутри слайса обрабатывают те экшены, которыми слайс владеет. `extraReducers` обрабатывает те, которыми он не владеет: thunk из другой фичи, экшен выхода из сессии, экшен сторонней библиотеки. В TypeScript следует использовать синтаксис builder, потому что туда передаются сами создатели экшенов, и тип payload выводится, а не выписывается строкой, которая однажды перестанет совпадать.\n\n`builder.addCase` обрабатывает один тип экшена, `addMatcher` — все экшены, для которых предикат возвращает истину, а `addDefaultCase` — остальные. Синтаксис объекта эквивалентен, но теряет связь с типами и заставляет писать имя типа руками: `todos/added`. Расхождение между этой строкой и настоящим типом экшена падает молча: редьюсер просто никогда не выполнится.\n\nКолбэк `prepare` позволяет сформировать экшен до отправки. Полученный создатель экшена принимает понятные аргументы, например строку текста или идентификатор, а prepare возвращает тот payload, который увидит редьюдер: сгенерированный id, временную метку или нормализованную форму. Так случайность и генерация идентификаторов остаются вне редьюдера, а это важно, потому что редьюдер обязан быть чистым: вызов `Math.random()` внутри редьюсера заставит один и тот же экшен давать разное состояние при повторе, и путешествие во времени в DevTools перестанет воспроизводить исходный запуск.',
        ),
        bullets: [
          L('extraReducers reacts to actions defined outside the slice.', 'extraReducers реагирует на экшены, определённые вне слайса.'),
          L('The builder syntax keeps payload types; the object syntax loses them.', 'Синтаксис builder сохраняет типы payload, объектный — теряет.'),
          L('A wrong type string in the object syntax fails silently.', 'Неверная строка типа в объектном синтаксисе падает молча.'),
          L('prepare keeps id generation and timestamps out of the pure reducer.', 'prepare уносит генерацию id и временные метки из чистого редьюсера.'),
        ],
        code: `const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: { id: nanoid(), text, done: false, createdAt: Date.now() },
      }),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sessionSlice.actions.loggedOut, () => []);
  },
});`,
        takeaway: L(
          'Reducers own their actions, extraReducers borrow everyone else.',
          'Редьюдеры владеют своими экшенами, extraReducers заимствуют чужие.'
        ),
      },
      {
        id: 'redux-ch2-s3',
        title: L('Reading state: selectors and memoisation', 'Чтение состояния: селекторы и мемоизация'),
        body: L(
          'A selector is a function from state to a value. The simplest is `(state) => state.todos.length`: its value is a number, so comparing it costs nothing and the component re-renders only when the count changes. The dangerous variant returns a new object or array on every call. `state.todos.filter(...)` builds a fresh array each time, and `useSelector` compares by reference, so the component re-renders on every store change.\n\n`createSelector` from Reselect fixes that. It runs the input selectors, compares their results by reference and recomputes the output only when an input changed. The output stays stable across unrelated store updates, so it works with `useMemo` or `React.memo`. The memoisation is one level deep by default: the last inputs and result are kept, so such a selector caches exactly one result, and a custom `createSelectorCreator` or the `lruMemoize` variant raises that to a small cache.\n\nMemoisation has a cost. Every `createSelector` holds references to the last inputs and output, so thousands of them keep parts of the state alive and slow development builds. There is a failure mode too: a selector that takes the whole state as an input is never memoised, because the root object changes on every update. The fix is to select the narrowest slice you need and to keep derived arrays in the store.',
          'Селектор — это функция из состояния в значение. Самая простая выглядит как `(state) => state.todos.length`. Её значение — число, поэтому сравнение ничего не стоит, а компонент перерисовывается только когда количество действительно изменилось. Опасный вариант возвращает новый объект или массив при каждом вызове: `state.todos.filter(...)` строит свежий массив, а `useSelector` сравнивает результат по ссылке, поэтому компонент перерисовывается на любое изменение стора, даже если показываемые данные те же.\n\n`createSelector` из Reselect это чинит. Он выполняет входные селекторы, сравнивает их результаты по ссылке и пересчитывает выход, только если изменился хотя бы один вход. После этого выход стабилен при посторонних изменениях стора, поэтому он годится как зависимость `useMemo` или для сравнения через `React.memo`. Мемоизация по умолчанию глубиной в один: хранятся входы и результат последнего вызова, то есть селектор кеширует ровно один результат, а `createSelectorCreator` со своей функцией или вариант `lruMemoize` поднимают кеш до нескольких записей.\n\nУ мемоизации есть цена. Каждый `createSelector` удерживает ссылки на последние входы и выход, поэтому тысячи таких селекторов держат в памяти части состояния и заметно замедляют сборку в режиме разработки. У неё есть и режим отказа: селектор, берущий на вход всё состояние целиком, не мемоизируется никогда, потому что корневой объект меняется при каждом обновлении. Лечится это выбором самой узкой нужной ветки на вход и хранением производных массивов в сторе.',
        ),
        bullets: [
          L('A selector that builds a new object re-renders the component on every store change.', 'Селектор, создающий новый объект, перерендеривает компонент при любом изменении стора.'),
          L('createSelector recomputes only when an input selector changed.', 'createSelector пересчитывает только тогда, когда изменился входной селектор.'),
          L('Default memoisation caches one result, lruMemoize keeps several.', 'Мемоизация по умолчанию хранит один результат, lruMemoize — несколько.'),
          L('Selecting the whole root state defeats memoisation.', 'Выборка всего корневого состояния ломает мемоизацию.'),
        ],
        code: `const selectTodos = (state: RootState) => state.todos.items;

export const selectOpenTodos = createSelector(
  [selectTodos, (state: RootState) => state.filters.showOnlyOpen],
  (todos, showOnlyOpen) =>
    showOnlyOpen ? todos.filter((todo) => !todo.done) : todos,
);`,
        takeaway: L(
          'Return primitives or memoise, otherwise every dispatch re-renders your component.',
          'Возвращайте примитивы или мемоизируйте, иначе каждый dispatch перерендерит компонент.'
        ),
      },
    ],
  },
  {
    id: 'redux-ch3',
    title: L('Asynchronous Data Flow', 'Асинхронный поток данных'),
    summary: L(
      'How createAsyncThunk models a request as three actions, how failures are surfaced, and how RTK Query replaces hand-written caching with tags and invalidation.',
      'Как createAsyncThunk превращает запрос в три экшена, как выносятся ошибки и как RTK Query заменяет ручное кеширование тегами и инвалидацией.'
    ),
    sections: [
      {
        id: 'redux-ch3-s1',
        title: L('The createAsyncThunk lifecycle', 'Жизненный цикл createAsyncThunk'),
        body: L(
          'A thunk is a function the middleware executes instead of a plain action. `createAsyncThunk` builds one around an async payload creator and automatically dispatches three actions around the call: `pending` before the work starts, `fulfilled` with the returned value on success, and `rejected` with a serialised error on failure. Each of them is an ordinary action, so a reducer can handle it with `addCase`, and the DevTools timeline shows the request as three entries with the timing between them.\n\nThe payload creator receives the argument the action creator was called with and a `thunkAPI` object with `dispatch`, `getState`, `signal` and `extra`. The `signal` is an `AbortSignal` that fires when the caller unsubscribes, and honouring it lets a cancelled request stop wasting bandwidth. `getState` gives access to the current tree, which is how a thunk decides whether it needs to run at all or how to build a request from existing data.\n\nThe returned value of the payload creator becomes the payload of the `fulfilled` action, so it must be serialisable: plain objects, arrays and primitives. Returning a class instance or a `Date` usually works but breaks the serialisability check in development and complicates persistence. Thunks also give you `unwrapResult` and `rejectWithValue` for the case when an HTTP error should be treated as data rather than as an exception.',
          'Thunk — это функция, которую middleware выполняет вместо обычного экшена. `createAsyncThunk` строит такую функцию вокруг асинхронного создателя payload и автоматически отправляет вокруг вызова три экшена: `pending` до начала работы, `fulfilled` с возвращённым значением при успехе и `rejected` с сериализованной ошибкой при неудаче. Каждый из них — обычный экшен, поэтому редьюдер может обработать его через `addCase`, а таймлайн DevTools покажет запрос тремя записями с интервалами между ними.\n\nСоздатель payload получает аргумент, с которым вызвали создателя экшена, и объект `thunkAPI` с полями `dispatch`, `getState`, `signal` и `extra`. `signal` — это `AbortSignal`, который срабатывает, когда вызывающая сторона отписывается, и если его учитывать, отменённый запрос перестаёт впустую качать трафик. `getState` даёт доступ к текущему дереву, и через него thunk решает, нужно ли вообще выполняться и как собрать запрос из уже имеющихся данных.\n\nВозвращённое значение создателя payload становится payload экшена `fulfilled`, поэтому оно обязано быть сериализуемым: обычные объекты, массивы и примитивы. Возврат экземпляра класса или `Date` обычно работает, но ломает проверку сериализуемости в режиме разработки и усложняет сохранение состояния. Thunk также дают `unwrapResult` и `rejectWithValue` для случая, когда ошибку HTTP стоит считать данными, а не исключением.'
        ),
        bullets: [
          L('One async call produces three actions: pending, fulfilled, rejected.', 'Один асинхронный вызов даёт три экшена: pending, fulfilled, rejected.'),
          L('The payload creator gets the argument plus dispatch, getState and an AbortSignal.', 'Создатель payload получает аргумент, а также dispatch, getState и AbortSignal.'),
          L('The fulfilled payload has to be serialisable.', 'Payload у fulfilled должен быть сериализуемым.'),
          L('rejectWithValue turns an expected error into a normal payload.', 'rejectWithValue превращает ожидаемую ошибку в обычный payload.'),
        ],
        code: `export const fetchTodo = createAsyncThunk(
  'todos/fetch',
  async (id: string, { signal }) => {
    const response = await fetch(\`/api/todos/\${id}\`, { signal });
    if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);
    return (await response.json()) as Todo;
  },
);`,
        takeaway: L(
          'A thunk is a request modelled as three ordinary actions.',
          'Thunk — это запрос, разложенный на три обычных экшена.'
        ),
      },
      {
        id: 'redux-ch3-s2',
        title: L('Handling pending, fulfilled and rejected', 'Обработка pending, fulfilled и rejected'),
        body: L(
          'The `pending` action sets a loading flag, and the `rejected` action carries the error message. The `rejected` payload is not the original exception: it is a serialised `SerializedError` with `name`, `message`, `stack` and `code`. The original value is available only if you call `rejectWithValue` yourself, and then the payload is your own object, the right way to pass a structured error such as a list of field validation messages.\n\nA common mistake is to store the request status as a free-form string such as `loading`, `success` or `error`. This works, but allows impossible combinations: an error message next to stale data, or a success state with no data. A discriminated union instead, in the shape `{ status: "idle" } | { status: "loading" } | { status: "succeeded", data: Todo } | { status: "failed", error: string }`, makes illegal states unrepresentable and lets TypeScript narrow the type after one check on `status`.\n\nTwo options shape when a thunk runs. `condition` receives the argument and the thunk API and returns false to skip the request entirely; it is the simplest way to avoid a duplicate fetch when the data is already there. `dispatchConditionRejection` decides whether a skipped request also dispatches a `rejected` action with the code `CONDITION_REJECTED`, which matters when the component shows a message in that case.',
          'Экшен `pending` — место, где вы ставите флаг загрузки, а `rejected` — место, где храните сообщение об ошибке. Payload у `rejected` — это не исходное исключение, а сериализованный `SerializedError` с полями `name`, `message`, `stack` и `code`. Исходное значение доступно, только если вы сами вызвали `rejectWithValue`, и тогда payload — ваш собственный объект, а не сериализованная ошибка. Это правильный способ передать структурированную ошибку, например список сообщений о валидации полей.\n\nЧастая ошибка — хранить статус запроса свободной строкой вроде `loading`, `success` или `error`. Это работает, но допускает невозможные сочетания: компонент может показать сообщение об ошибке рядом с устаревшими данными или состояние успеха вообще без данных. Хранение дискриминируемого объединения вместо этого, в виде `{ status: "idle" } | { status: "loading" } | { status: "succeeded", data: Todo } | { status: "failed", error: string }`, делает недопустимые состояния непредставимыми и позволяет TypeScript сузить тип после одной проверки `status`.\n\nЕщё две опции определяют, когда thunk выполняется. `condition` — функция, получающая аргумент и API thunk и возвращающая false, чтобы пропустить запрос целиком; это самый простой способ избежать повторной загрузки, когда данные уже есть в сторе. `dispatchConditionRejection` решает, отправлять ли пропущенному запросу экшен `rejected` с кодом `CONDITION_REJECTED`, и это важно, когда компонент показывает сообщение именно в ветке rejected.',
        ),
        bullets: [
          L('The rejected payload is a serialised error unless you use rejectWithValue.', 'Payload у rejected — сериализованная ошибка, если вы не вызвали rejectWithValue.'),
          L('A discriminated union of request states makes impossible states unrepresentable.', 'Дискриминируемое объединение состояний запроса делает невозможные состояния непредставимыми.'),
          L('condition skips a request before pending is dispatched.', 'condition пропускает запрос ещё до отправки pending.'),
          L('A skipped request can still dispatch a rejected action.', 'Пропущенный запрос всё равно может отправить rejected.'),
        ],
        code: `builder
  .addCase(fetchTodo.pending, (state) => {
    state.status = 'loading';
  })
  .addCase(fetchTodo.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.data = action.payload;
  })
  .addCase(fetchTodo.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message ?? 'Something went wrong';
  });`,
        takeaway: L(
          'Model the request status as a union, not as a loose string.',
          'Храните статус запроса как объединение, а не как свободную строку.'
        ),
      },
      {
        id: 'redux-ch3-s3',
        title: L('RTK Query: endpoints, tags and optimistic updates', 'RTK Query: эндпоинты, теги и оптимистичные обновления'),
        body: L(
          'RTK Query is a data layer built on the same store. You declare an API slice with `createApi`, give it a `baseQuery` that knows how to talk to the server, and define endpoints: a query endpoint describes a read, a mutation endpoint describes a write. From those declarations RTK Query generates hooks that return the data together with `isLoading`, `isSuccess`, `isError` and a `refetch` function, and it owns the cache and the status flags.\n\nCache invalidation is declared with tags. A query endpoint lists the tags its data belongs to with `providesTags`, and a mutation lists the tags it invalidates with `invalidatesTags`. When the mutation succeeds, every cached query that provided a matching tag is refetched. Tags can be granular: `{ type: "Todo", id: id }` refetches only the queries about that todo, while a plain `Todo` tag invalidates all of them.\n\nOptimistic updates are written in `onQueryStarted`, where you patch the cache with `updateQueryData` and receive a handle with an `undo` method. The moment the mutation starts the interface shows the new value; if the request fails, `undo` rolls the cache back to the snapshot. The pattern suits interactions that are usually accepted and rarely rejected, such as toggling a like. It is wrong for payments and deletions, where a visible rollback is worse than a short wait.',
          'RTK Query — это слой данных, построенный на том же сторе. Вы объявляете API-слайс через `createApi`, задаёте ему `baseQuery`, который умеет ходить на сервер, и описываете эндпоинты. Эндпоинт типа query описывает чтение, эндпоинт типа mutation — запись. Из этих объявлений RTK Query генерирует хуки, возвращающие данные вместе с `isLoading`, `isSuccess`, `isError` и функцией `refetch`, и берёт на себя кеш, флаги загрузки и состояние ошибки, так что вашим редьюдерам это больше не нужно.\n\nИнвалидация кеша описывается тегами. Эндпоинт-запрос перечисляет теги, к которым относится его данные, в `providesTags`, а мутация — теги, которые она инвалидирует, в `invalidatesTags`. Когда мутация завершилась успешно, все закешированные запросы, предоставившие совпадающий тег, перезапрашиваются. Теги бывают гранулярными: если предоставить `{ type: "Todo", id: id }`, правка одной задачи перезапустит только запросы об этой задаче, а простой тег `Todo` инвалидирует все задачи разом.\n\nОптимистичные обновления пишутся в `onQueryStarted`, где вы правите кеш через `updateQueryData` и получаете дескриптор с методом `undo`. Стоит мутации начаться, интерфейс показывает новое значение; если запрос провалится, вызов `undo` откатывает кеш к снимку. Схема подходит взаимодействиям, которые обычно принимают и редко отклоняют, например переключению лайка. Она не подходит платежам и удалениям, где видимый откат хуже короткого ожидания.',
        ),
        bullets: [
          L('RTK Query generates hooks, the cache and the status flags from endpoint declarations.', 'RTK Query генерирует хуки, кеш и флаги состояния из объявлений эндпоинтов.'),
          L('Tags connect a mutation to the queries it invalidates.', 'Теги связывают мутацию с запросами, которые она инвалидирует.'),
          L('Granular tags refetch only the affected queries.', 'Гранулярные теги перезапрашивают только затронутые запросы.'),
          L('An optimistic update needs an undo path when the request fails.', 'Оптимистичному обновлению нужен путь отката при неудаче.'),
        ],
        code: `const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: (result) => [
        { type: 'Todo', id: 'LIST' },
        ...(result ?? []).map((todo) => ({ type: 'Todo' as const, id: todo.id })),
      ],
    }),
    addTodo: builder.mutation<Todo, NewTodo>({
      query: (body) => ({ url: 'todos', method: 'POST', body }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
});`,
        takeaway: L(
          'Let the data layer own the cache and describe invalidation with tags.',
          'Отдайте кеширование слою данных, а инвалидацию описывайте тегами.'
        ),
      },
    ],
  },
  {
    id: 'redux-ch4',
    title: L('Collections, Side Effects and Testing', 'Коллекции, побочные эффекты и тестирование'),
    summary: L(
      'How to keep collections normalised with an entity adapter, where long-running side effects belong, and how to test reducers and store behaviour.',
      'Как нормализовать коллекции адаптером сущностей, где живут долгие побочные эффекты и как тестировать редьюдеры и поведение стора.'
    ),
    sections: [
      {
        id: 'redux-ch4-s1',
        title: L('Normalised state and the entity adapter', 'Нормализованное состояние и адаптер сущностей'),
        body: L(
          'A collection stored as an array is easy to read and awkward to update: finding an item means a scan, and editing one means copying the array and the object. Normalised state splits the collection into a list of identifiers and a map of records, so a lookup becomes a single property access and an update touches only the record that changed. The cost is that a component must join the two parts before rendering, which is what a selector is for.\n\n`createEntityAdapter` implements this shape and the operations over it. It produces reducers such as `addOne`, `addMany`, `updateOne`, `upsertOne`, `removeOne`, `removeAll` and `setAll`, and selectors: `selectAll`, `selectById`, `selectIds`, `selectEntities` and `selectTotal`. The adapter owns the state shape, so the slice only wires the reducer functions in and lets the adapter decide what changed.\n\nTwo details catch people out. First, `getInitialState` can be given existing data, and the adapter will normalise it, so a server payload can be loaded into the slice without hand-written conversion. Second, the adapter `selectAll` returns a new array when the records change, but keeps the same reference when they do not, which makes it safe to use with `useSelector` without extra memoisation. Adapter selectors are parameterised too, so `selectById` takes the id and returns a function you call with it.',
          'Коллекция, хранимая массивом, читается легко, но обновляется неудобно: найти элемент значит просканировать массив, а изменить — скопировать и его, и объект. Нормализованное состояние делит коллекцию на список идентификаторов и отображение записей, поэтому поиск превращается в одно обращение к свойству, а изменение трогает только затронутую запись. Цена в том, что компоненту перед отрисовкой нужно соединить обе части, и для этого существует селектор.\n\n`createEntityAdapter` реализует и эту форму, и операции над ней. Он даёт набор редьюдеров: `addOne`, `addMany`, `updateOne`, `upsertOne`, `removeOne`, `removeAll`, `setAll`, и набор селекторов: `selectAll`, `selectById`, `selectIds`, `selectEntities`, `selectTotal`. Форму состояния владеет адаптер, поэтому слайс лишь подключает эти редьюдеры и позволяет адаптеру решать, что именно изменилось.\n\nДве детали сбивают с толку. Первая: `getInitialState` можно передать готовые данные, и адаптер сам их нормализует, поэтому ответ сервера попадает в слайс без самописной конвертации. Вторая: `selectAll` адаптера возвращает новый массив, когда записи изменились, и ту же ссылку, когда не изменились, — именно поэтому его безопасно использовать в `useSelector` без дополнительной мемоизации. Селекторы адаптера ещё и параметризованы: `selectById` принимает id и возвращает функцию, которую вы вызываете с id.',
        ),
        bullets: [
          L('Normalised state makes lookups constant time and updates local.', 'Нормализованное состояние даёт быстрый поиск и локальные обновления.'),
          L('The entity adapter supplies ready reducers and selectors for CRUD.', 'Адаптер сущностей даёт готовые редьюдеры и селекторы для CRUD.'),
          L('getInitialState can seed the slice from server data.', 'getInitialState может заполнить слайс серверными данными.'),
          L('Adapter selectors keep stable references when nothing changed.', 'Селекторы адаптера сохраняют стабильные ссылки, если ничего не изменилось.'),
        ],
        code: `const usersAdapter = createEntityAdapter<User>({ selectId: (user) => user.id });

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    userUpdated: usersAdapter.updateOne,
    userRemoved: usersAdapter.removeOne,
  },
});

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
);`,
        takeaway: L(
          'Normalise a collection once, then let the adapter handle the updates.',
          'Нормализуйте коллекцию один раз, а обновления отдайте адаптеру.'
        ),
      },
      {
        id: 'redux-ch4-s2',
        title: L('Listener middleware', 'Listener middleware'),
        body: L(
          'Reducers must stay pure, so anything that talks to the outside world, such as a timer, a socket or a write to local storage, has to run somewhere else. Thunks cover the common case of a request triggered by a component. Listener middleware covers the case where a side effect is triggered by an action dispatched elsewhere, and that effect must react to the action, not to a user gesture.\n\nA listener is registered with `startListening`, a matcher saying which actions it cares about, and an `effect`, an async function receiving the action and a listener API. The API gives `dispatch`, `getState`, `signal` and `cancelActiveListeners`. That last one makes listeners powerful: a request for a search term can cancel the previous pending one, so typing quickly leaves no queue of stale responses racing to the store.\n\nListener middleware also removes the pattern of dispatching an action purely to trigger a listener, a source of accidental coupling. Because the effect is an ordinary async function, it can be extracted and tested alone, and the `take` helper turns a sequence of actions into a promise without hand-written subscription bookkeeping. The cost is that the flow of a feature ends up spread across a slice and a listener file, so it should be obvious where a listener lives and what it does.',
          'Редьюдеры обязаны оставаться чистыми, поэтому всё, что обращается к внешнему миру, будь то таймер, сокет, отправка аналитики или запись в local storage, должно выполняться где-то ещё. Thunk покрывает частый случай: запрос, инициированный компонентом. Listener middleware покрывает случай, когда побочный эффект должен вызываться экшеном, отправленным в другом месте, и реагировать на сам экшен, а не на действие пользователя.\n\nListener регистрируется через `startListening`, матчер, который говорит, какие экшены его касаются, и `effect` — асинхронную функцию, получающую экшен и API listener. API даёт `dispatch`, `getState`, `signal` и `cancelActiveListeners`. Именно последнее делает listener мощным: запрос по поисковой строке может отменить предыдущий, и быстрый набор текста не оставит очередь устаревших ответов, соревнующихся за обновление стора.\n\nListener middleware заодно убирает приём с отправкой экшена исключительно ради того, чтобы разбудить listener, — источник случайной связанности. Поскольку effect — обычная асинхронная функция, её можно вынести и протестировать напрямую, а helper `take` внутри превращает последовательность экшенов в промис без самописной подписки. Цена в том, что поток фичи оказывается размазан между слайсом и файлом listener, поэтому местонахождение listener и список отвечаемых им экшенов должны быть очевидны.',
        ),
        bullets: [
          L('Reducers stay pure, so anything external belongs in a thunk or a listener.', 'Редьюдеры остаются чистыми, поэтому всё внешнее — в thunk или listener.'),
          L('Listeners react to actions dispatched anywhere, not to user gestures.', 'Listener реагирует на экшены откуда угодно, а не на действия пользователя.'),
          L('cancelActiveListeners and take handle cancellation and sequencing.', 'cancelActiveListeners и take решают отмену и последовательность.'),
          L('Side effects spread across files, so keep listeners easy to find.', 'Побочные эффекты расходятся по файлам, поэтому listener легко найти.'),
        ],
        code: `const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: searchChanged,
  effect: async (action, api) => {
    api.cancelActiveListeners();
    await api.delay(300);
    const result = await api.fetchResults(action.payload);
    api.dispatch(resultsLoaded(result));
  },
});`,
        takeaway: L(
          'Use a listener when the side effect follows the action, not the click.',
          'Берите listener, когда побочный эффект следует за экшеном, а не за кликом.'
        ),
      },
      {
        id: 'redux-ch4-s3',
        title: L('Persistence, testing and DevTools', 'Сохранение, тестирование и DevTools'),
        body: L(
          'The state is a plain serialisable tree, so persisting it means writing it out and reading it back. The `redux-persist` package subscribes to the store, writes the tree to storage with a debounce, and rehydrates it at start-up; a `whitelist` of slice keys limits what is stored. The subtlety is timing: a rehydrated state arrives after the first render, so components must tolerate both the empty and restored shapes, and a version number lets you migrate it.\n\nReducers are the easiest part of an app to test because they are pure functions. Calling `reducer(undefined, { type: "@@INIT" })` gives the initial state, and calling it with a prepared action gives the next state. A reducer test does not render a component, mock a store or wait for anything, so it runs in milliseconds and catches the most important bug class in Redux: a wrong state transition.\n\nFor behaviour that crosses several slices, test the store instead. `configureStore` returns a real store, and `store.dispatch` with `store.getState` is enough to assert on a whole flow. Do not reach into internals in the test: a refactor that keeps the behaviour but changes the shape breaks the suite. Redux DevTools complements both: it records every action, lets you replay the sequence and jump to any point in time, and shows which slice produced it.',
          'Поскольку состояние — обычное сериализуемое дерево, его сохранение сводится к записи и чтению. Пакет `redux-persist` подписывается на стор, пишет дерево в хранилище при каждом изменении с задержкой и восстанавливает его при старте, а `whitelist` со списком ключей слайсов ограничивает объём сохраняемого. Тонкость в тайминге: восстановленное состояние приходит уже после первого рендера, поэтому компоненты должны терпеть и пустую, и восстановленную форму, а номер версии позволяет мигрировать или выбросить старые данные.\n\nРедьюдеры проще всего тестировать, потому что это чистые функции. Вызов `reducer(undefined, { type: "@@INIT" })` даёт начальное состояние, а вызов с подготовленным экшеном — следующее, и больше ничего не нужно. Тест редьюдера не рендерит компонент, не подменяет стор и ни о чём не ждёт, поэтому выполняется за миллисекунды и ловит самый важный класс ошибок в приложении на Redux: неверный переход состояния.\n\nДля поведения, пересекающего несколько слайсов, тестируйте стор. `configureStore` возвращает настоящий стор, и `store.dispatch` вместе с `store.getState` хватает, чтобы проверить весь поток. При этом не стоит заглядывать во внутренности в тесте: тогда рефакторинг, сохраняющий поведение, но меняющий форму, сломает набор. Redux DevTools дополняет оба подхода: он записывает каждый экшен, позволяет повторить последовательность и перейти в любую точку времени и показывает, какой слайс породил изменение.',
        ),
        bullets: [
          L('Persisted state has to be rehydrated before the app trusts it.', 'Сохранённое состояние нужно восстановить до того, как приложение ему поверит.'),
          L('A reducer test is a pure call: initial state, action, next state.', 'Тест редьюдера — чистый вызов: начальное состояние, экшен, следующее состояние.'),
          L('Test the store for flows that cross several slices.', 'Проверяйте стор для потоков, пересекающих несколько слайсов.'),
          L('DevTools time travel replays the exact action sequence.', 'Путешествие во времени в DevTools повторяет ту же последовательность экшенов.'),
        ],
        code: `it('removes a todo when the todo is removed', () => {
  const initial = todosSlice.reducer(undefined, { type: '@@INIT' });
  const withTodo = todosSlice.reducer(initial, todosSlice.actions.addTodo(todo));
  const next = todosSlice.reducer(withTodo, todosSlice.actions.removeTodo(todo.id));

  expect(next).toHaveLength(0);
});`,
        takeaway: L(
          'Pure reducers make the most important tests cheap and fast.',
          'Чистые редьюдеры делают самые важные тесты дешёвыми и быстрыми.'
        ),
      },
    ],
  },
];
