import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxModule: Module = {
  id: 'redux',
  title: L('Redux Toolkit', 'Redux Toolkit'),
  description: L('Modern Redux with RTK: slices, store, hooks.', 'Современный Redux с RTK: слайсы, стор, хуки.'),
  lessons: [
    { id: 'redux-001', title: L('Why Redux Toolkit', 'Зачем Redux Toolkit'), question: L('What problem does Redux Toolkit solve?', 'Какую проблему решает Redux Toolkit?'), answer: L('RTK eliminates boilerplate: no action type constants, no action creator functions, no immutable update logic written by hand, no store configuration complexity.', 'RTK устраняет шаблонный код: не нужно писать константы типов экшенов, функции-создатели экшенов, логику неизменяемых обновлений и настройку стора.'), code: `// Before RTK: types, action creators, immutable updates by hand\n// After RTK: one createSlice call\nconst slice = createSlice({ name: 'counter', initialState: 0, reducers: { inc: s => s + 1 } });` },
    { id: 'redux-002', title: L('Redux Principles', 'Принципы Redux'), question: L('What are the three core Redux principles?', 'Каковы три основных принципа Redux?'), answer: L('1) Single source of truth — one store. 2) State is read-only — only actions change state. 3) Changes via pure functions (reducers).', '1) Единый источник истины — один стор. 2) Состояние только для чтения — меняют его только экшены. 3) Изменения через чистые функции (редьюсеры).'), code: `// One store, read-only state, pure reducers` },
    { id: 'redux-003', title: L('What is a Slice', 'Что такое слайс'), question: L('What does createSlice do?', 'Что делает createSlice?'), answer: L('Generates action types, action creators, and a reducer function from a single config object. Each slice owns a piece of state.', 'Генерирует типы экшенов, создателей экшенов и функцию-редьюсер из одного объекта конфигурации. Каждый слайс владеет частью состояния.'), code: `const counterSlice = createSlice({ name: 'counter', initialState: 0, reducers: { inc: s => s + 1 } });\n// counterSlice.actions.inc() => { type: 'counter/inc' }\n// counterSlice.reducer` },
    { id: 'redux-004', title: L('Store & Provider', 'Стор и Провайдер'), question: L('How does the store reach React components?', 'Как стор попадает в React-компоненты?'), answer: L('configureStore creates the store. The <Provider store={store}> component from react-redux makes it available via context to all descendants.', 'configureStore создаёт стор. Компонент <Provider store={store}> из react-redux делает его доступным через контекст всем потомкам.'), code: `const store = configureStore({ reducer: { counter: counterSlice.reducer } });\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <Provider store={store}><App /></Provider>\n);` },
    { id: 'redux-005', title: L('createSlice reducers', 'Редьюсеры createSlice'), question: L('How do you define reducers inside createSlice?', 'Как определяются редьюсеры внутри createSlice?'), answer: L('Pass an object where keys are action type suffixes and values are reducer functions. Immer lets you write "mutating" logic safely.', 'Передайте объект, где ключи — суффиксы типов экшенов, а значения — функции-редьюсеры. Immer позволяет писать "мутирующую" логику безопасно.'), code: `reducers: {\n  increment: state => { state.value += 1; },\n  addBy: (state, action: PayloadAction<number>) => { state.value += action.payload; }\n}` },
    { id: 'redux-006', title: L('prepare Callback', 'Колбэк prepare'), question: L('When do you use the prepare callback in createSlice?', 'Когда используется колбэк prepare в createSlice?'), answer: L('When action payload needs transformation before reaching the reducer — e.g., generating IDs, timestamps, or serializing data.', 'Когда полезная нагрузка экшена нуждается в трансформации перед редьюсером — например, генерация ID, временные метки или сериализация.'), code: `reducers: {\n  addTodo: {\n    reducer: (state, action: PayloadAction<Todo>) => { state.push(action.payload); },\n    prepare: (text: string) => ({ payload: { id: nanoid(), text, done: false } })\n  }\n}` },
    { id: 'redux-007', title: L('extraReducers', 'Дополнительные редьюсеры'), question: L('What are extraReducers for?', 'Для чего нужны extraReducers?'), answer: L('Handle actions defined outside the slice (e.g., from createAsyncThunk or other slices). Your slice can respond to foreign action types.', 'Обработка экшенов, определённых вне слайса (например, из createAsyncThunk или других слайсов). Слайс может реагировать на внешние типы экшенов.'), code: `extraReducers: builder => {\n  builder.addCase(fetchUser.fulfilled, (state, action) => { state.user = action.payload; });\n}` },
    { id: 'redux-008', title: L('Builder vs Object Syntax', 'Синтаксис builder против объекта'), question: L('What is the difference between builder and object syntax in extraReducers?', 'В чём разница между синтаксисом builder и объекта в extraReducers?'), answer: L('Builder: addCase/addMatcher/addDefaultCase with type safety. Object: map action type strings to handlers. Builder is recommended for TypeScript.', 'Builder: addCase/addMatcher/addDefaultCase с типобезопасностью. Объект: сопоставление строковых типов с обработчиками. Builder рекомендуется для TypeScript.'), code: `// Builder syntax (recommended for TS)\nextraReducers: b => b.addCase(fulfilled, (s, a) => { s.push(a.payload); })\n// Object syntax\nextraReducers: { [fulfilled.type]: (s, a) => { s.push(a.payload); } }` },
    { id: 'redux-009', title: L('createAsyncThunk', 'Асинхронные анки'), question: L('What does createAsyncThunk do?', 'Что делает createAsyncThunk?'), answer: L('Creates an action creator that dispatches pending, fulfilled, and rejected actions around an async callback. Standard pattern for side effects.', 'Создаёт создателя экшенов, который отправляет pending, fulfilled и rejected экшены вокруг асинхронного колбэка. Стандартный паттерн для побочных эффектов.'), code: `const fetchUser = createAsyncThunk('user/fetch', async (id: string) => {\n  const res = await fetch(\`/api/users/\${id}\`);\n  return res.json();\n});` },
    { id: 'redux-010', title: L('Thunk Lifecycle Actions', 'Жизненный цикл экшенов thunk'), question: L('What actions does a thunk dispatch?', 'Какие экшены отправляет thunk?'), answer: L('pending (when started), fulfilled (on success with payload), rejected (on error with error). Each has matching action types you can match in extraReducers.', 'pending (при старте), fulfilled (при успехе с данными), rejected (при ошибке). Каждый имеет соответствующий тип экшена для extraReducers.'), code: `builder\n  .addCase(fetchUser.pending, s => { s.loading = 'pending'; })\n  .addCase(fetchUser.fulfilled, (s, a) => { s.loading = 'succeeded'; s.data = a.payload; })\n  .addCase(fetchUser.rejected, (s, a) => { s.loading = 'failed'; s.error = a.error.message; })` },
    { id: 'redux-011', title: L('Thunk with Condition', 'Thunk с условием'), question: L('How do you conditionally skip a thunk?', 'Как пропустить thunk условно?'), answer: L('Use the condition option in thunkAPI config. Return false to skip dispatching pending action. Useful for deduplication.', 'Используйте опцию condition в конфиге thunkAPI. Верните false чтобы пропустить отправку pending экшена. Полезно для дедупликации.'), code: `const fetchUser = createAsyncThunk('user/fetch', async (id: string, { condition }) => {\n  return fetch(...).then(r => r.json());\n}, { condition: (id, { getState }) => !getState().user.loading });` },
    { id: 'redux-012', title: L('RTK Query Overview', 'Обзор RTK Query'), question: L('What is RTK Query?', 'Что такое RTK Query?'), answer: L('A data fetching and caching tool built into Redux Toolkit. Eliminates manual loading/error/data state tracking. Declarative API endpoints.', 'Инструмент для загрузки и кеширования данных, встроенный в Redux Toolkit. Устраняет ручное отслеживание loading/error/data. Декларативные эндпоинты API.'), code: `const api = createApi({ reducerPath: 'api', baseQuery: fetchBaseQuery({ baseUrl: '/api' }), endpoints: b => ({ getUsers: b.query<User[], void>({ query: () => 'users' }) }) });` },
    { id: 'redux-013', title: L('RTK Query Endpoints', 'Эндпоинты RTK Query'), question: L('What are query and mutation endpoints?', 'Что такое query и mutation эндпоинты?'), answer: L('query fetches data (GET). mutation modifies data (POST/PUT/DELETE). Both are defined with builder syntax in createApi.', 'query загружает данные (GET). mutation изменяет данные (POST/PUT/DELETE). Оба определяются через builder-синтаксис в createApi.'), code: `endpoints: b => ({\n  getUsers: b.query<User[], void>({ query: () => 'users' }),\n  addUser: b.mutation<User, Partial<User>>({ query: body => ({ url: 'users', method: 'POST', body }) })\n})` },
    { id: 'redux-014', title: L('RTK Query Hooks', 'Хуки RTK Query'), question: L('What hooks does RTK Query auto-generate?', 'Какие хуки автогенерирует RTK Query?'), answer: L('use[Endpoint]Query for queries (data, isLoading, isError, refetch). use[Endpoint]Mutation for mutations (mutate, isLoading, isSuccess).', 'use[Endpoint]Query для запросов (data, isLoading, isError, refetch). use[Endpoint]Mutation для мутаций (mutate, isLoading, isSuccess).'), code: `const { data, isLoading, isError, refetch } = useGetUsersQuery();\nconst [addUser, { isLoading: adding }] = useAddUserMutation();` },
    { id: 'redux-015', title: L('Cache Invalidation', 'Инвалидация кеша'), question: L('How does RTK Query handle cache invalidation?', 'Как RTK Query инвалидирует кеш?'), answer: L('Tags! provideTags on queries, invalidatesTags on mutations. Mutations invalidate cache entries that provide matching tags.', 'Теги! provideTags на запросах, invalidatesTags на мутациях. Мутации инвалидируют записи кеша с совпадающими тегами.'), code: `getUsers: b.query<User[], void>({ query: () => 'users', providesTags: ['Users'] }),\naddUser: b.mutation({ query: ..., invalidatesTags: ['Users'] })` },
    { id: 'redux-016', title: L('Optimistic Updates', 'Оптимистичные обновления'), question: L('How to implement optimistic updates in RTK Query?', 'Как реализовать оптимистичные обновления в RTK Query?'), answer: L('In onQueryStarted: update cache with patchQueryData, cache data via updateQueryData, revert on failure with the original snapshot.', 'В onQueryStarted: обновите кеш через patchQueryData, сохраните снимок через updateQueryData, откатите при ошибке с оригинальным снимком.'), code: `onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {\n  const p = dispatch(api.util.updateQueryData('getUsers', undefined, d => { d.push(arg); }));\n  try { await queryFulfilled; } catch { p.undo(); }\n}` },
    { id: 'redux-017', title: L('Pessimistic Updates', 'Пессимистичные обновления'), question: L('What are pessimistic updates?', 'Что такое пессимистичные обновления?'), answer: L('Wait for mutation to complete before updating UI. Show loading state during request. Default mutation behavior without optimistic cache changes.', 'Ожидание завершения мутации перед обновлением UI. Показ состояния загрузки. Поведение мутации по умолчанию без оптимистичных изменений кеша.'), code: `const [updateUser, { isLoading }] = useUpdateUserMutation();\n// UI shows spinner until isSuccess` },
    { id: 'redux-018', title: L('Polling', 'Опрос'), question: L('How to poll with RTK Query?', 'Как реализовать опрос с RTK Query?'), answer: L('Pass pollingInterval to the query hook (in milliseconds). RTK Query re-fetches at the interval while component is mounted.', 'Передайте pollingInterval в хук запроса (в миллисекундах). RTK Query повторно загружает данные с интервалом, пока компонент смонтирован.'), code: `const { data } = useGetUsersQuery(undefined, { pollingInterval: 5000 });` },
    { id: 'redux-019', title: L('Prefetching', 'Предзагрузка'), question: L('How does prefetching work in RTK Query?', 'Как работает предзагрузка в RTK Query?'), answer: L('Use api.util.prefetch or dispatch(fetchEndpoint()) on hover/focus. Data loads before navigation.', 'Используйте api.util.prefetch или dispatch(fetchEndpoint()) при наведении/фокусе. Данные загружаются до навигации.'), code: `const handleMouseEnter = () => { dispatch(api.endpoints.getUsers.initiate()); };` },
    { id: 'redux-020', title: L('Conditional Fetching', 'Условная загрузка'), question: L('How to conditionally fetch data?', 'Как условно загружать данные?'), answer: L('Pass skip option to the query hook (skip: true prevents fetching). Or conditionally call dispatch based on state.', 'Передайте опцию skip в хук запроса (skip: true предотвращает загрузку). Или условно вызывайте dispatch на основе состояния.'), code: `const { data } = useGetUserQuery(userId, { skip: !userId });` },
    { id: 'redux-021', title: L('Selectors', 'Селекторы'), question: L('What are selectors in Redux?', 'Что такое селекторы в Redux?'), answer: L('Pure functions that extract and compute derived data from state. Receive state (and args), return a value. Keep components decoupled from state shape.', 'Чистые функции, извлекающие и вычисляемые производные данные из состояния. Получают состояние (и аргументы), возвращают значение. Отделяют компоненты от структуры состояния.'), code: `const selectCount = (state: RootState) => state.counter.value;\nconst doubled = createSelector(selectCount, c => c * 2);` },
    { id: 'redux-022', title: L('createSelector', 'Мемоизированные селекторы'), question: L('What does reselect createSelector do?', 'Что делает createSelector из reselect?'), answer: L('Creates memoized selectors. Only recompute when input selectors return different values. Prevents unnecessary re-renders from new object references.', 'Создаёт мемоизированные селекторы. Пересчитывает только когда входные селекторы вернули другие значения. Предотвращает лишние ре-рендеры от новых ссылок.'), code: `const selectActiveUsers = createSelector(\n  [(s: RootState) => s.users.items, (s: RootState) => s.filters],\n  ([users, filters]) => users.filter(u => !filters.hideInactive || u.active)\n);` },
    { id: 'redux-023', title: L('Normalized State', 'Нормализованное состояние'), question: L('Why normalize state shape?', 'Почему нужно нормализовать состояние?'), answer: L('Avoids deeply nested data. Store entities as { ids: [], entities: {} }. Simplifies updates and lookups. O(1) access by ID.', 'Избегает глубоко вложенных данных. Храните сущности как { ids: [], entities: {} }. Упрощает обновления и поиск. Доступ O(1) по ID.'), code: `interface NormalizedState<T> { ids: string[]; entities: Record<string, T>; }\n// Instead of: { users: { byId: {...}, allIds: [...] } } nested` },
    { id: 'redux-024', title: L('createEntityAdapter', 'Адаптер сущностей'), question: L('What does createEntityAdapter provide?', 'Что предоставляет createEntityAdapter?'), answer: L('Pre-built reducers and selectors for CRUD on normalized collections. addOne, setAll, updateOne, removeOne. selectAll, selectById, selectEntities.', 'Готовые редьюсеры и селекторы для CRUD над нормализованными коллекциями. addOne, setAll, updateOne, removeOne. selectAll, selectById, selectEntities.'), code: `const usersAdapter = createEntityAdapter<User>({ selectId: u => u.id });\nconst slice = createSlice({ name: 'users', initialState: usersAdapter.getInitialState(), reducers: {\n  userAdded: usersAdapter.addOne, userUpdated: usersAdapter.updateOne\n}});` },
    { id: 'redux-025', title: L('Entity Adapter Selectors', 'Селекторы адаптера сущностей'), question: L('What selectors does entity adapter generate?', 'Какие селекторы генерирует адаптер сущностей?'), answer: L('selectAll (all items as array), selectById (single item), selectEntities (raw entity map), selectIds (array of IDs), selectTotal (count).', 'selectAll (все элементы как массив), selectById (один элемент), selectEntities (необработанная карта), selectIds (массив ID), selectTotal (количество).'), code: `const { selectAll, selectById, selectEntities, selectTotal } = usersAdapter.getSelectors((s: RootState) => s.users);` },
    { id: 'redux-026', title: L('Middleware', 'Промежуточное ПО'), question: L('What is Redux middleware?', 'Что такое промежуточное ПО (middleware) в Redux?'), answer: L('Functions that intercept dispatched actions before they reach reducers. Used for logging, crash reports, async logic (thunks), and routing.', 'Функции, перехватывающие отправленные экшены до того как они достигнут редьюсеров. Используются для логирования, отчётов об ошибках, асинхронной логики (thunks) и маршрутизации.'), code: `const logger = store => next => action => {\n  console.log('dispatching', action);\n  const result = next(action);\n  console.log('next state', store.getState());\n  return result;\n};` },
    { id: 'redux-027', title: L('Listener Middleware', 'Слушающее middleware'), question: L('What is createListenerMiddleware?', 'Что такое createListenerMiddleware?'), answer: L('Alternative to thunks/sagas for side effects. Listens to actions, runs async logic, can dispatch new actions, cancel previous runs.', 'Альтернатива thunk/saga для побочных эффектов. Слушает экшены, запускает асинхронную логику, может отправлять новые экшены, отменяет предыдущие запуски.'), code: `const listener = createListenerMiddleware();\nlistener.startListening({ actionCreator: userAdded, effect: async (action, api) => { await api.delay(1000); api.dispatch(userProcessed(action.payload.id)); } });` },
      { id: 'redux-028', title: L('Thunk vs Saga vs Listeners', 'Thunk против Saga против Listeners'), question: L('When to use thunk, saga, or listener middleware?', 'Когда использовать thunk, saga или listener middleware?'), answer: L('Thunks: simple async, 90% of cases. Listeners: complex flows needing cancellation/parallelism. Sagas: extremely complex, long-running, or needs generator-based control. Most apps never need sagas.', 'Thunks: простая асинхронность, 90% случаев. Listeners: сложные потоки с отменой/параллелизмом. Sagas: крайне сложные, длительные или нуждающиеся в генераторах. Большинству приложений не нужны saga.'), code: `// Simple: createAsyncThunk\n// Complex flow: createListenerMiddleware\n// Rarely: redux-saga` },
    { id: 'redux-029', title: L('DevTools', 'Инструменты разработчика'), question: L('What does Redux DevTools provide?', 'Что предоставляет Redux DevTools?'), answer: L('Time-travel debugging (rewind/replay actions), action log with payloads, state diff between actions, import/export state, live editing of actions.', 'Отладка с путешествием во времени (перемотка/повтор экшенов), журнал экшенов с данными, разница состояний между экшенами, импорт/экспорт состояния, живое редактирование экшенов.'), code: `// Works out of the box with configureStore\n// Requires browser extension for time-travel` },
    { id: 'redux-030', title: L('Project Structure', 'Структура проекта'), question: L('What is a good Redux project structure?', 'Какова хорошая структура Redux-проекта?'), answer: L('Feature-based folders: each feature has slice, selectors, types, components. Or ducks pattern. Group by domain, not by file type.', 'Папки по функциям: каждая функция имеет слайс, селекторы, типы, компоненты. Или паттерн ducks. Группировка по домену, а не по типу файла.'), code: `src/features/counter/counterSlice.ts\nsrc/features/counter/counterSelectors.ts\nsrc/features/counter/Counter.tsx\nsrc/app/store.ts` },
    { id: 'redux-031', title: L('Immutability with Immer', 'Неизменяемость с Immer'), question: L('How does Immer work with Redux Toolkit?', 'Как Immer работет с Redux Toolkit?'), answer: L('Immer wraps reducers. You "mutate" a draft state. Immer produces a new immutable state with structural sharing — unchanged references are preserved.', 'Immer оборачивает редьюсеры. Вы "мутируете" черновик состояния. Immer создаёт новое неизменяемое состояние со структурным разделением — неизменённые ссылки сохраняются.'), code: `reducers: {\n  addTodo: (state, action) => { state.todos.push(action.payload); } // Immer handles immutability\n}` },
    { id: 'redux-032', title: L('Structural Sharing', 'Структурное разделение'), question: L('What is structural sharing?', 'Что такое структурное разделение?'), answer: L('When state changes, only the changed path is copied. Unchanged branches keep their references. Enables cheap reference equality checks.', 'При изменении состояния копируется только изменённый путь. Неизменённые ветви сохраняют свои ссылки. Позволяет дешёвые проверки по ссылке.'), code: `// If user.name changes, user object is new, but user.posts reference is same` },
    { id: 'redux-033', title: L('Reference Equality', 'Ссылочное равенство'), question: L('Why does reference equality matter in Redux?', 'Почему ссылочное равенство важно в Redux?'), answer: L('React.memo, useMemo, useCallback rely on reference equality. Selectors returning new references on every call break memoization and cause re-renders.', 'React.memo, useMemo, useCallback полагаются на ссылочное равенство. Селекторы, возвращающие новые ссылки при каждом вызове, ломают мемоизацию и вызывают ре-рендеры.'), code: `const selectBad = (s) => ({ ...s.items }); // new object each time\nconst selectGood = (s) => s.items; // stable reference` },
    { id: 'redux-034', title: L('Shallow Equality', 'Поверхностное равенство'), question: L('What is shallowEqual and when to use it?', 'Что такое shallowEqual и когда его использовать?'), answer: L('Utility from react-redux for comparing objects by their own enumerable properties. Use in useSelector to avoid re-renders when selector returns new object with same values.', 'Утилита из react-redux для сравнения объектов по их свойствам. Используйте в useSelector чтобы избежать ре-рендеров когда селектор возвращает новый объект с теми же значениями.'), code: `const user = useSelector(s => s.user.profile, shallowEqual);` },
    { id: 'redux-035', title: L('useSelector', 'Хук useSelector'), question: L('How does useSelector work?', 'Как работает useSelector?'), answer: L('Subscribes to store. Runs selector on each state change. Re-renders component if result changes (by reference). Runs selector twice in StrictMode to detect impure selectors.', 'Подписывается на стор. Запускает селектор при каждом изменении состояния. Перерендеривает компонент если результат изменился (по ссылке). Запускает селектор дважды в StrictMode для обнаружения нечистых селекторов.'), code: `const count = useSelector((state: RootState) => state.counter.value);` },
    { id: 'redux-036', title: L('useDispatch', 'Хук useDispatch'), question: L('What does useDispatch return?', 'Что возвращает useDispatch?'), answer: L('A reference to the store.dispatch function. Use to dispatch actions from components. Stable across re-renders.', 'Ссылку на функцию store.dispatch. Используется для отправки экшенов из компонентов. Стабильна между ре-рендерами.'), code: `const dispatch = useDispatch();\ndispatch(counterSlice.actions.increment());` },
    { id: 'redux-037', title: L('useStore', 'Хук useStore'), question: L('When should you use useStore?', 'Когда использовать useStore?'), answer: L('Rarely! Only when you need direct store access outside React or for debugging. Prefer useSelector/useDispatch for data.', 'Редко! Только когда нужен прямой доступ к стору вне React или для отладки. Предпочитайте useSelector/useDispatch для данных.'), code: `const store = useStore();\nstore.getState(); // direct access` },
    { id: 'redux-038', title: L('Typed Hooks', 'Типизированные хуки'), question: L('How to type Redux hooks for TypeScript?', 'Как типизировать хуки Redux для TypeScript?'), answer: L('Create typed versions: useAppSelector and useAppDispatch using TypedUseSelectorHook. Provides full type safety in components.', 'Создайте типизированные версии: useAppSelector и useAppDispatch используя TypedUseSelectorHook. Обеспечивает полную типобезопасность в компонентах.'), code: `export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;\nexport const useAppDispatch = () => useDispatch<AppDispatch>();` },
    { id: 'redux-039', title: L('Provider', 'Провайдер'), question: L('What does the Provider component do?', 'Что делает компонент Provider?'), answer: L('Makes the Redux store available to nested components via React context. Must wrap any component using Redux hooks.', 'Делает стор Redux доступным для вложенных компонентов через React context. Должен оборачивать любой компонент, использующий хуки Redux.'), code: `import { Provider } from 'react-redux';\n<Provider store={store}><App /></Provider>` },
    { id: 'redux-040', title: L('connect HOC', 'connect HOC'), question: L('What is the connect function and is it still used?', 'Что такое функция connect и используется ли она?'), answer: L('Higher-order component connecting Redux to class or function components via mapStateToProps/mapDispatchToProps. Legacy — hooks are preferred now.', 'Компонент высшего порядка, соединяющий Redux с компонентами через mapStateToProps/mapDispatchToProps. Устаревший — теперь предпочитают хуки.'), code: `export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);` },
    { id: 'redux-041', title: L('mapStateToProps', 'mapStateToProps'), question: L('What does mapStateToProps do?', 'Что делает mapStateToProps?'), answer: L('Maps Redux state to component props. Called on store changes. Only returns changed props shouldComponentUpdate optimization.', 'Сопоставляет состояние Redux с пропсами компонента. Вызывается при изменениях стора. Возвращает только изменённые пропсы для оптимизации shouldComponentUpdate.'), code: `const mapStateToProps = (state) => ({ count: state.counter.value });` },
    { id: 'redux-042', title: L('mapDispatchToProps', 'mapDispatchToProps'), question: L('What does mapDispatchToProps do?', 'Что делает mapDispatchToProps?'), answer: L('Binds action creators to dispatch and passes them as props. Can be a function or object of action creators.', 'Привязывает создателей экшенов к dispatch и передаёт их как пропсы. Может быть функцией или объектом создателей экшенов.'), code: `const mapDispatchToProps = { increment: () => dispatch({ type: 'counter/increment' }) };\n// Or object shorthand: { increment: () => ({ type: 'counter/increment' }) }` },
    { id: 'redux-043', title: L('mergeProps', 'mergeProps'), question: L('What is the mergeProps option in connect?', 'Что такая опция mergeProps в connect?'), answer: L('Custom function to merge stateProps, dispatchProps, and ownProps into final props. Rarely needed — connect does shallow merge by default.', 'Пользовательская функция для слияния stateProps, dispatchProps и ownProps в финальные пропсы. Редко нужна — connect делает поверхностное слияние по умолчанию.'), code: `connect(mapState, mapDispatch, (stateProps, dispatchProps, ownProps) => ({ ...stateProps, ...dispatchProps, ...ownProps }))` },
    { id: 'redux-044', title: L('React-Redux v9', 'React-Redux версии 9'), question: L('What changed in react-redux v9?', 'Что изменилось в react-redux версии 9?'), answer: L('Uses React 18\'s useSyncExternalStore instead of context for store subscription. Better performance, less boilerplate. Provider still uses context.', 'Использует useSyncExternalStore из React 18 вместо контекста для подписки на стор. Лучшая производительность, меньше кода. Provider всё ещё использует контекст.'), code: `// Internal: useSyncExternalStore(store.subscribe, store.getState)\n// Public API unchanged: useSelector, useDispatch, Provider` },
    { id: 'redux-045', title: L('batch', 'Пакетное обновление'), question: L('What does the batch function do?', 'Что делает функция batch?'), answer: L('Groups multiple state updates into a single re-render. From react-redux. Useful when dispatching multiple actions that trigger different components.', 'Группирует несколько обновлений состояния в один ре-рендер. Из react-redux. Полезно при отправке нескольких экшенов, затрагивающих разные компоненты.'), code: `import { batch } from 'react-redux';\nbatch(() => { dispatch(action1()); dispatch(action2()); });` },
  ],
  quiz: [
    {
      id: 'redux-q01',
      question: L(
        'Which Redux principle is broken when a reducer mutates the state object directly?',
        'Какой принцип Redux нарушается, когда редьюсер напрямую мутирует объект состояния?'
      ),
      options: [
        L('The store is the single source of truth', 'Стор — единый источник истины'),
        L('State is read-only and only actions change it', 'Состояние только для чтения, меняют его только экшены'),
        L('State changes happen through pure reducer functions', 'Изменения состояния происходят через чистые функции-редьюдеры'),
        L('There is exactly one store per application', 'В приложении ровно один стор'),
      ],
      correctIndex: 2,
      explanation: L(
        'Redux requires reducers to be pure, so a reducer that changes the state in place breaks the third principle and also the read-only principle: the old state and the new state become the very same object. The rules about one store and about a single source of truth are still respected, which is why those options are wrong.',
        'Redux требует, чтобы редьюсеры были чистыми, поэтому мутация состояния на месте нарушает третий принцип и принцип «состояние только для чтения»: старое и новое состояние становятся одним и тем же объектом. Правила про один стор и про единый источник истины при этом соблюдаются, поэтому эти варианты неверны.'
      ),
    },
    {
      id: 'redux-q02',
      question: L(
        'What does configureStore return?',
        'Что возвращает configureStore?'
      ),
      options: [
        L('A store instance with dispatch, getState and subscribe', 'Экземпляр стора с dispatch, getState и subscribe'),
        L('A reducer function that you pass to Provider', 'Функцию-редьюдер, которую передают в Provider'),
        L('A React context that components read directly', 'React-контекст, который компоненты читают напрямую'),
        L('A hook that gives access to the state', 'Хук, дающий доступ к состоянию'),
      ],
      correctIndex: 0,
      explanation: L(
        'configureStore combines the reducers, the default middleware and the development checks into one object that exposes dispatch, getState and subscribe. The reducer goes into the reducer map, the hooks come from react-redux, and the store reaches the components through the Provider, so the other options describe different pieces of the setup.',
        'configureStore собирает редьюсеры, middleware по умолчанию и проверки для разработки в один объект с dispatch, getState и subscribe. Редьюсер попадает в карту редьюсеров, хуки приходят из react-redux, а стор доходит до компонентов через Provider — остальные варианты описывают другие части настройки.'
      ),
    },
    {
      id: 'redux-q03',
      question: L(
        'In a slice named counter with a reducer called increment, what action type does createSlice generate?',
        'В слайсе с именем counter и редьюсером increment какой тип экшена генерирует createSlice?'
      ),
      options: [
        L('counter.increment', 'counter.increment'),
        L('counter/increment', 'counter/increment'),
        L('increment/counter', 'increment/counter'),
        L('slice-counter-increment', 'slice-counter-increment'),
      ],
      correctIndex: 1,
      explanation: L(
        'createSlice joins the name of the slice and the name of the reducer with a slash, so increment inside the counter slice produces counter/increment. There is no dot separator and the order is not reversed, and the namespacing exists exactly so that two slices cannot produce the same type.',
        'createSlice соединяет имя слайса и имя редьюдера косой чертой, поэтому increment в слайсе counter даёт counter/increment. Точки-разделителя нет, порядок не перевёрнут, а пространство имён нужно ровно для того, чтобы два слайса не дали одинаковый тип.'
      ),
    },
    {
      id: 'redux-q04',
      question: L(
        'Where should the actual HTTP request live in a Redux Toolkit application?',
        'Где должен выполняться реальный HTTP-запрос в приложении на Redux Toolkit?'
      ),
      options: [
        L('Inside the reducer, right next to the state update', 'В редьюсере, рядом с обновлением состояния'),
        L('Inside a selector, so it runs when the data is read', 'В селекторе, чтобы он выполнялся при чтении данных'),
        L('Inside the component, just before the result is rendered', 'В компоненте, прямо перед отрисовкой результата'),
        L('Inside a thunk or a listener, while the reducer only stores the result', 'В thunk или слушателе, а редьюсер только хранит результат'),
      ],
      correctIndex: 3,
      explanation: L(
        'Reducers must stay pure and synchronous, so a request cannot live there. A thunk or a listener performs the request and dispatches actions with the outcome, and the reducer only writes that outcome into the state. Doing the request in a selector or in a component turns reading data into a side effect that React cannot track.',
        'Редьюдеры должны оставаться чистыми и синхронными, поэтому запрос там невозможен. Thunk или слушатель выполняют запрос и отправляют экшены с результатом, а редьюдер только записывает этот результат в состояние. Запрос в селекторе или в компоненте превращает чтение данных в побочный эффект, который React не отслеживает.'
      ),
    },
    {
      id: 'redux-q05',
      question: L(
        'How do you get the action creators and the reducer of a slice named counterSlice?',
        'Как получить создателей экшенов и редьюдер слайса с именем counterSlice?'
      ),
      options: [
        L('counterSlice.reducers and counterSlice.actions', 'counterSlice.reducers и counterSlice.actions'),
        L('createSlice.reducers and createSlice.actions', 'createSlice.reducers и createSlice.actions'),
        L('counterSlice.actions and counterSlice.reducer', 'counterSlice.actions и counterSlice.reducer'),
        L('getActions(counterSlice) and getReducer(counterSlice)', 'getActions(counterSlice) и getReducer(counterSlice)'),
      ],
      correctIndex: 2,
      explanation: L(
        'createSlice returns an object whose actions property holds the generated action creators and whose reducer property holds the combined reducer of that slice. The reducers property of the returned object is the configuration you passed in, not the output, and there are no separate getActions or getReducer helpers.',
        'createSlice возвращает объект, у которого свойство actions содержит созданных создателей экшенов, а свойство reducer — объединённый редьюдер слайса. Свойство reducers у результата — это конфигурация, которую вы передали, а не результат, и отдельных хелперов getActions или getReducer нет.'
      ),
    },
    {
      id: 'redux-q06',
      question: L(
        'Inside a reducer, what does state.todos.push(newTodo) do when the state comes from Redux Toolkit?',
        'Что делает state.todos.push(newTodo) внутри редьюдера, если состояние пришло из Redux Toolkit?'
      ),
      options: [
        L('It throws, because the state is frozen in development', 'Бросает исключение, потому что в разработке состояние заморожено'),
        L('It mutates the Immer draft, and Immer produces a new immutable state', 'Мутирует черновик Immer, а Immer создаёт новое неизменяемое состояние'),
        L('It changes the original state object in place', 'Изменяет исходный объект состояния на месте'),
        L('It queues the change until the action is dispatched again', 'Ставит изменение в очередь до следующей отправки экшена'),
      ],
      correctIndex: 1,
      explanation: L(
        'Redux Toolkit runs reducers through Immer, so the state argument is a draft proxy. Writing to it records the change, and Immer builds a fresh state object with structural sharing. The original state is never modified and nothing is queued: the new state is returned by the reducer right away.',
        'Redux Toolkit выполняет редьюдеры через Immer, поэтому аргумент state — это прокси-черновик. Запись в него фиксирует изменение, а Immer собирает новый объект состояния со структурным разделением. Исходное состояние не меняется, и ничего не ставится в очередь: новое состояние редьюдер возвращает сразу.'
      ),
    },
    {
      id: 'redux-q07',
      question: L(
        'After a reducer changes state.user.name, what happens to the state.user.posts array?',
        'После того как редьюсер изменил state.user.name, что происходит с массивом state.user.posts?'
      ),
      options: [
        L('It keeps the same reference, because only the changed path is copied', 'Сохраняет ту же ссылку, потому что копируется только изменённый путь'),
        L('It gets a new reference, because the whole user object is cloned deeply', 'Получает новую ссылку, потому что весь объект user клонируется глубоко'),
        L('It becomes undefined, because the user object is replaced', 'Становится undefined, потому что объект user заменяется'),
        L('It is copied on every update, because Immer clones the whole state', 'Копируется при каждом обновлении, потому что Immer клонирует всё состояние'),
      ],
      correctIndex: 0,
      explanation: L(
        'This is structural sharing: Immer copies only the nodes on the path that changed, and every untouched branch keeps its old reference. A deep clone of the whole state would break the reference equality checks and make every connected component re-render.',
        'Это и есть структурное разделение: Immer копирует только узлы на изменившемся пути, а все нетронутые ветви сохраняют прежнюю ссылку. Глубокое клонирование всего состояния сломало бы проверки по ссылке и заставляло бы перерисовываться каждый подключённый компонент.'
      ),
    },
    {
      id: 'redux-q08',
      question: L(
        'A component keeps showing old data after the state was changed outside of a reducer. Why?',
        'Компонент продолжает показывать старые данные после того, как состояние изменили вне редьюдера. Почему?'
      ),
      options: [
        L('The component is not wrapped in Provider, so it reads a default state', 'Компонент не обёрнут в Provider, поэтому читает состояние по умолчанию'),
        L('The action type does not match the name of the reducer, so the reducer never runs', 'Тип экшена не совпадает с именем редьюдера, поэтому редьюдер не запускается'),
        L('The state was changed in a different store instance than the one in Provider', 'Состояние изменили в другом экземпляре стора, а не в том, что в Provider'),
        L('The state object was mutated in place, so its reference did not change and no subscriber was notified', 'Объект состояния мутировали на месте, поэтому ссылка не изменилась и подписчики не получили уведомление'),
      ],
      correctIndex: 3,
      explanation: L(
        'Redux tells the subscribers about a change by comparing references. Mutating the state in place keeps the same object, so nobody is notified and useSelector never re-runs. The other options describe real problems, but they would break the update completely instead of leaving the old values on the screen.',
        'Redux сообщает подписчикам об изменении по ссылкам. Мутация состояния на месте оставляет тот же объект, поэтому уведомления нет и useSelector не перезапускается. Остальные варианты описывают реальные проблемы, но они ломали бы обновление полностью, а не оставляли бы старые значения на экране.'
      ),
    },
    {
      id: 'redux-q09',
      question: L(
        'What is the prepare callback in createSlice used for?',
        'Для чего используется колбэк prepare в createSlice?'
      ),
      options: [
        L('To transform the arguments into the payload before the reducer runs', 'Чтобы превратить аргументы в payload до запуска редьюдера'),
        L('To run an asynchronous request and dispatch its result', 'Чтобы выполнить асинхронный запрос и отправить его результат'),
        L('To add extra keys to the string of the action type', 'Чтобы добавить дополнительные части к строке типа экшена'),
        L('To decide whether the reducer should handle the action', 'Чтобы решить, должен ли редьюдер обрабатывать экшен'),
      ],
      correctIndex: 0,
      explanation: L(
        'prepare is a synchronous transformation step: it receives the arguments of the action creator and returns an object with the payload, so ids, timestamps or serialised values are built before the reducer sees them. It cannot be asynchronous, it does not change the type, and the decision to handle the action belongs to the map of reducers.',
        'prepare — это синхронный шаг трансформации: он получает аргументы создателя экшена и возвращает объект с payload, поэтому идентификаторы, временные метки или сериализованные значения готовятся до того, как их увидит редьюдер. Он не может быть асинхронным, не меняет тип, а решение обрабатывать ли экшен принимает карта редьюдеров.'
      ),
    },
    {
      id: 'redux-q10',
      question: L(
        'A reducer is defined as { reducer: ..., prepare: ... }. How does createSlice use the two parts?',
        'Редьюдер определён как { reducer: ..., prepare: ... }. Как createSlice использует обе части?'
      ),
      options: [
        L('The reducer runs first, then prepare converts its result into the payload', 'Сначала работает редьюдер, затем prepare превращает его результат в payload'),
        L('The prepare callback runs first and its payload is passed to the reducer', 'Сначала работает колбэк prepare, и его payload передаётся редьюдеру'),
        L('Both run at the same time and the reducer receives both results', 'Оба работают одновременно, и редьюдер получает оба результата'),
        L('Only the prepare callback runs, the reducer defines the action type', 'Работает только колбэк prepare, а редьюдер задаёт тип экшена'),
      ],
      correctIndex: 1,
      explanation: L(
        'The prepare callback is the action creator: it turns the arguments into the payload of the action. The reducer then receives that prepared payload as the second argument of the action and updates the state. The two parts are not alternatives, a reducer written in this form needs both.',
        'Колбэк prepare — это создатель экшена: он превращает аргументы в payload экшена. Затем редьюдер получает этот подготовленный payload вторым аргументом экшена и обновляет состояние. Это не альтернативы: у редьюдера в такой форме нужны обе части.'
      ),
    },
    {
      id: 'redux-q11',
      question: L(
        'What are extraReducers for?',
        'Для чего нужны extraReducers?'
      ),
      options: [
        L('For extra reducers that run after the reducer of the slice on every action', 'Для дополнительных редьюдеров, которые идут после редьюдера слайса на каждом экшене'),
        L('For adding new state keys to the slice without new action types', 'Для добавления новых ключей состояния в слайс без новых типов экшенов'),
        L('For reacting to actions that are defined outside of this slice', 'Для реакции на экшены, определённые вне этого слайса'),
        L('For handling actions that no other slice reacts to', 'Для обработки экшенов, на которые не реагирует ни один другой слайс'),
      ],
      correctIndex: 2,
      explanation: L(
        'extraReducers extends the slice with handlers for foreign action types, for example the pending, fulfilled and rejected actions of a thunk or the actions of another slice. The reducers property still owns the own actions of the slice, and extraReducers are not a fallback for actions nobody handled.',
        'extraReducers расширяют слайс обработчиками чужих типов экшенов — например, pending, fulfilled и rejected из thunk или экшенов другого слайса. Свойство reducers по-прежнему владеет собственными экшенами слайса, а extraReducers не являются запасным вариантом для незамеченных экшенов.'
      ),
    },
    {
      id: 'redux-q12',
      question: L(
        'Which extraReducers syntax is recommended for TypeScript projects?',
        'Какой синтаксис extraReducers рекомендуется для проектов на TypeScript?'
      ),
      options: [
        L('The object syntax with string keys such as [fetchUser.fulfilled.type]', 'Объектный синтаксис со строковыми ключами вида [fetchUser.fulfilled.type]'),
        L('Both of them, they are generated to the same type', 'Оба варианта, они генерируются в один и тот же тип'),
        L('The builder API with addCase, addMatcher and addDefaultCase', 'Builder API с addCase, addMatcher и addDefaultCase'),
        L('Neither of them, the action types must be declared by hand', 'Ни один, типы экшенов нужно объявлять вручную'),
      ],
      correctIndex: 2,
      explanation: L(
        'The builder API is typed: addCase checks the action creator you pass and infers the payload type inside the handler, and addMatcher gives you a discriminated union of several action types. The object syntax works but is only loosely typed, and nothing has to be declared by hand in either case.',
        'Builder API типизирован: addCase проверяет переданный создатель экшена и выводит тип payload внутри обработчика, а addMatcher даёт объединение типов по дискриминанту. Объектный синтаксис работает, но типизирован слабее, и вручную объявлять ничего не нужно ни в одном случае.'
      ),
    },
    {
      id: 'redux-q13',
      question: L(
        'How do you handle the successful result of the thunk fetchUser inside a slice?',
        'Как обработать успешный результат thunk fetchUser внутри слайса?'
      ),
      options: [
        L('In the reducers object, under the key fetchUser', 'В объекте reducers, под ключом fetchUser'),
        L('In a listener that watches the fulfilled action', 'В слушателе, который следит за экшеном fulfilled'),
        L('By dispatching fetchUser.fulfilled yourself after the request', 'Отправив fetchUser.fulfilled вручную после запроса'),
        L('In extraReducers, with builder.addCase(fetchUser.fulfilled, handler)', 'В extraReducers, через builder.addCase(fetchUser.fulfilled, обработчик)'),
      ],
      correctIndex: 3,
      explanation: L(
        'The fulfilled action is dispatched by the thunk itself, so the slice reacts to it in extraReducers with addCase and reads the payload from the action. The reducers object only holds handlers for the own action types of the slice, and dispatching a fulfilled action by hand would break the lifecycle.',
        'Экшен fulfilled отправляет сам thunk, поэтому слайс реагирует на него в extraReducers через addCase и читает payload из экшена. Объект reducers содержит только обработчики собственных типов экшенов слайса, а ручная отправка fulfilled сломала бы жизненный цикл.'
      ),
    },
    {
      id: 'redux-q14',
      question: L(
        'Which action types does createAsyncThunk dispatch?',
        'Какие типы экшенов отправляет createAsyncThunk?'
      ),
      options: [
        L('start, success and failure', 'start, success и failure'),
        L('request, response and throw', 'request, response и throw'),
        L('loading, done and error', 'loading, done и error'),
        L('pending, fulfilled and rejected', 'pending, fulfilled и rejected'),
      ],
      correctIndex: 3,
      explanation: L(
        'createAsyncThunk dispatches the pending action before the payload creator runs, the fulfilled action with the payload on success and the rejected action with the error on failure. The other names are not used by Redux Toolkit, and that matters because extraReducers matches on the exact type strings.',
        'createAsyncThunk отправляет pending до запуска payload-функции, fulfilled с payload при успехе и rejected с ошибкой при неудаче. Других имён в Redux Toolkit нет, и это важно, потому что extraReducers сопоставляют по точным строкам типов.'
      ),
    },
    {
      id: 'redux-q15',
      question: L(
        'A thunk fails. Where does the error message end up?',
        'Thunk завершился ошибкой. Где окажется сообщение об ошибке?'
      ),
      options: [
        L('In action.payload of the rejected action', 'В action.payload отклонённого экшена'),
        L('In action.meta.arg of the rejected action', 'В action.meta.arg отклонённого экшена'),
        L('In the value that the dispatch call returns', 'В значении, которое возвращает вызов dispatch'),
        L('In action.error of the rejected action', 'В action.error отклонённого экшена'),
      ],
      correctIndex: 3,
      explanation: L(
        'By default the rejected action carries a serialised error in action.error, and the message sits under action.error.message. The payload of a rejected action is undefined unless the thunk explicitly rejects with a value, and meta.arg holds the arguments, not the error.',
        'По умолчанию отклонённый экшен несёт сериализованную ошибку в action.error, а сообщение лежит в action.error.message. Payload отклонённого экшена равен undefined, если thunk явно не отклонил значением, а meta.arg хранит аргументы, а не ошибку.'
      ),
    },
    {
      id: 'redux-q16',
      question: L(
        'How do you skip a thunk when the data is already in the store?',
        'Как пропустить thunk, если данные уже есть в сторе?'
      ),
      options: [
        L('By checking the state inside the reducer and returning the old state', 'Проверив состояние в редьюсере и вернув прежнее состояние'),
        L('With the condition option, which returns false to abort the dispatch', 'Через опцию condition, которая возвращает false и прерывает отправку'),
        L('By throwing an error inside the payload creator', 'Бросив ошибку внутри payload-функции'),
        L('By dispatching a reset action before the thunk', 'Отправив перед thunk экшен сброса состояния'),
      ],
      correctIndex: 1,
      explanation: L(
        'The condition option runs before the thunk starts: when it returns false the pending action is not dispatched and the payload creator never runs, which is the standard way to avoid duplicate requests. A reducer cannot prevent an action, throwing would produce a rejected action, and resetting the state would only throw away the data.',
        'Опция condition выполняется до старта thunk: если она вернула false, экшен pending не отправляется и payload-функция не запускается — это стандартный способ избежать повторных запросов. Редьюдер не может запретить экшен, бросок дал бы отклонённый экшен, а сброс состояния только потерял бы данные.'
      ),
    },
    {
      id: 'redux-q17',
      question: L(
        'How do you catch the error of a thunk in a component?',
        'Как поймать ошибку thunk в компоненте?'
      ),
      options: [
        L('With a try/catch around the dispatch call itself', 'Через try/catch вокруг самого вызова dispatch'),
        L('By listening to the rejected action type in extraReducers', 'Слушая тип отклонённого экшена в extraReducers'),
        L('By awaiting the dispatch and calling unwrap on the result', 'Дождавшись dispatch и вызвав unwrap на результате'),
        L('By reading the error field of the store state after the dispatch', 'Прочитав поле error из состояния стора после отправки'),
      ],
      correctIndex: 2,
      explanation: L(
        'Dispatching a thunk returns a promise that always resolves with an action, so the failure stays hidden until you unwrap it: awaiting dispatch(fetchUser(id)).unwrap() turns the rejection into a thrown error you can catch. A plain try/catch around dispatch without unwrap never sees the failure.',
        'Отправка thunk возвращает промис, который всегда разрешается экшеном, поэтому сбой остаётся незамеченным, пока не вызван unwrap: await dispatch(fetchUser(id)).unwrap() превращает отказ в выброшенную ошибку, которую можно перехватить. Обычный try/catch вокруг dispatch без unwrap сбой не увидит.'
      ),
    },
    {
      id: 'redux-q18',
      question: L(
        'What does rejectWithValue do inside a thunk?',
        'Что делает rejectWithValue внутри thunk?'
      ),
      options: [
        L('It rejects the promise of the dispatch with the thrown Error object', 'Оно отклоняет промис dispatch брошенным объектом Error'),
        L('It cancels the request through the abort signal', 'Оно отменяет запрос через сигнал прерывания'),
        L('It marks the pending action as skipped', 'Оно помечает экшен pending как пропущенный'),
        L('It rejects the thunk with a custom payload that arrives in action.payload', 'Оно отклоняет thunk с собственным payload, который приходит в action.payload'),
      ],
      correctIndex: 3,
      explanation: L(
        'rejectWithValue lets the payload creator reject with data of your own choice, and that data arrives in action.payload of the rejected action while action.error keeps the generic information. Throwing an Error would put the message into action.error instead, and the other options describe unrelated mechanisms.',
        'rejectWithValue позволяет payload-функции отклонить собственными данными: они приходят в action.payload отклонённого экшена, а action.error сохраняет общую информацию. Бросок Error положил бы сообщение в action.error, а остальные варианты описывают несвязанные механизмы.'
      ),
    },
    {
      id: 'redux-q19',
      question: L(
        'What is a selector in Redux?',
        'Что такое селектор в Redux?'
      ),
      options: [
        L('A pure function that reads the state and returns a value or a derived value', 'Чистая функция, которая читает состояние и возвращает значение или производное значение'),
        L('A function that changes the state and returns the new value', 'Функция, которая меняет состояние и возвращает новое значение'),
        L('A middleware that intercepts the dispatched actions', 'Middleware, перехватывающий отправленные экшены'),
        L('A component that renders a part of the state', 'Компонент, отрисовывающий часть состояния'),
      ],
      correctIndex: 0,
      explanation: L(
        'A selector is a pure function that takes the state (and optionally arguments) and returns the data a component needs, so the component does not have to know the shape of the state. Reducers change the state, middleware sits between dispatch and the reducers, and a component is not a selector.',
        'Селектор — это чистая функция, которая принимает состояние (и, возможно, аргументы) и возвращает данные для компонента, поэтому компоненту не нужно знать форму состояния. Редьюдеры меняют состояние, middleware стоит между dispatch и редьюдерами, а компонент — не селектор.'
      ),
    },
    {
      id: 'redux-q20',
      question: L(
        'When does a selector created with createSelector recompute its result?',
        'Когда селектор, созданный через createSelector, пересчитывает результат?'
      ),
      options: [
        L('On every dispatch, no matter what changed in the state', 'На каждой отправке экшена, независимо от изменений в состоянии'),
        L('When one of the input selectors returns a value different from the previous run', 'Когда один из входных селекторов вернул значение, отличное от прошлого'),
        L('When the component that uses it re-renders', 'Когда перерисовывается компонент, который его использует'),
        L('Only when the whole state object is replaced by a new one', 'Только когда весь объект состояния заменяется новым'),
      ],
      correctIndex: 1,
      explanation: L(
        'createSelector caches the last result and compares the values returned by the input selectors, so the expensive computation runs again only when one of them really changed. React re-renders do not trigger it, and replacing the whole state object is not required, only a changed input matters.',
        'createSelector кэширует последний результат и сравнивает значения входных селекторов, поэтому дорогое вычисление повторяется, только если одно из них действительно изменилось. Перерисовки React его не запускают, и заменять весь объект состояния не нужно — важен только изменившийся вход.'
      ),
    },
    {
      id: 'redux-q21',
      question: L(
        'A component re-renders on every action even though the data it shows never changes. What is the usual cause?',
        'Компонент перерисовывается на каждом экшене, хотя показываемые данные не меняются. В чём обычная причина?'
      ),
      options: [
        L('The component is not wrapped in memo', 'Компонент не обёрнут в memo'),
        L('The store was created outside of the component tree', 'Стор был создан вне дерева компонентов'),
        L('The selector returns a new object or array on every call, so the reference always differs', 'Селектор возвращает новый объект или массив при каждом вызове, поэтому ссылка всегда отличается'),
        L('The payload of the action is larger than the state', 'Payload экшена больше, чем состояние'),
      ],
      correctIndex: 2,
      explanation: L(
        'useSelector compares the result by reference, so a selector that builds a new object or array each time always looks changed and forces a re-render. memo does not help here, because the props never change, and the size of the payload has nothing to do with the comparison.',
        'useSelector сравнивает результат по ссылке, поэтому селектор, создающий новый объект или массив при каждом вызове, всегда выглядит изменившимся и заставляет перерисовываться. memo тут не помогает, ведь пропсы не меняются, а размер payload не имеет отношения к сравнению.'
      ),
    },
    {
      id: 'redux-q22',
      question: L(
        'How do you fix a selector that returns a new object on every call?',
        'Как исправить селектор, который при каждом вызове возвращает новый объект?'
      ),
      options: [
        L('Build it with createSelector so the result is reused while the inputs stay the same', 'Собрать его через createSelector, чтобы результат переиспользовался при неизменных входах'),
        L('Mutate the object in place so that the reference stays the same', 'Мутировать объект на месте, чтобы ссылка не менялась'),
        L('Convert the state to a JSON string before reading it', 'Преобразовать состояние в JSON-строку перед чтением'),
        L('Call the selector inside useMemo on every render', 'Вызывать селектор внутри useMemo при каждом рендере'),
      ],
      correctIndex: 0,
      explanation: L(
        'createSelector memoizes the result, so the same object reference is returned until one of the input selectors changes. Mutating a value to keep the reference defeats the purpose of immutability, a JSON string loses the types and is slow, and useMemo inside the component does not help the other components that use the same selector.',
        'createSelector мемоизирует результат, поэтому та же ссылка возвращается, пока не изменился один из входных селекторов. Мутация ради сохранения ссылки противоречит неизменяемости, JSON-строка теряет типы и медленна, а useMemo внутри компонента не поможет другим компонентам с тем же селектором.'
      ),
    },
    {
      id: 'redux-q23',
      question: L(
        'When is shallowEqual useful in useSelector?',
        'Когда shallowEqual полезен в useSelector?'
      ),
      options: [
        L('When the selector returns a primitive value such as a number', 'Когда селектор возвращает примитивное значение, например число'),
        L('When the state contains big arrays that must not be compared', 'Когда в состоянии есть большие массивы, которые не нужно сравнивать'),
        L('When the component reads several different slices at once', 'Когда компонент читает сразу несколько разных частей состояния'),
        L('When the selector returns a new object with the same values as before', 'Когда селектор возвращает новый объект с теми же значениями, что и раньше'),
      ],
      correctIndex: 3,
      explanation: L(
        'shallowEqual compares the own properties of the result, so a fresh object with identical values counts as unchanged and no re-render happens. It is not needed for primitives, which are compared by value anyway, and it does not help with combining slices or with big arrays.',
        'shallowEqual сравнивает собственные свойства результата, поэтому свежий объект с теми же значениями считается неизменившимся и перерисовки не будет. Примитивам он не нужен, они сравниваются по значению, и ни объединению частей состояния, ни большим массивам он не помогает.'
      ),
    },
    {
      id: 'redux-q24',
      question: L(
        'Why is it a problem to create a selector inside the body of a component?',
        'Почему плохо создавать селектор внутри тела компонента?'
      ),
      options: [
        L('Selectors cannot be used inside components at all', 'Селекторы вообще нельзя использовать внутри компонентов'),
        L('A new selector is created on every render, so the memoization of createSelector is lost', 'При каждом рендере создаётся новый селектор, и мемоизация createSelector теряется'),
        L('The component can no longer read the state', 'Компонент больше не может читать состояние'),
        L('A selector is not allowed to take arguments in that position', 'Селектору запрещено принимать аргументы в такой позиции'),
      ],
      correctIndex: 1,
      explanation: L(
        'A selector defined in the render body is a new function on every render, so a createSelector that uses it as an input loses its cache and recomputes every time. Selectors belong outside the component, in a module or in a selectors file, so their identity stays stable.',
        'Селектор, объявленный в теле рендера, — это новая функция при каждом рендере, поэтому createSelector, берущий его как вход, теряет кэш и пересчитывается всегда. Селекторы живут вне компонента, в модуле или в файле селекторов, чтобы их идентичность была стабильной.'
      ),
    },
    {
      id: 'redux-q25',
      question: L(
        'What is the normalized shape for a collection of users?',
        'Какова нормализованная форма для коллекции пользователей?'
      ),
      options: [
        L('{ users: [ { id: 1, name: "Ann" } ] }', '{ users: [ { id: 1, name: "Ann" } ] }'),
        L('{ ids: [1], entities: { "1": { id: 1, name: "Ann" } } }', '{ ids: [1], entities: { "1": { id: 1, name: "Ann" } } }'),
        L('{ users: { byId: { "1": {} }, allIds: [1] } }', '{ users: { byId: { "1": {} }, allIds: [1] } }'),
        L('{ users: { "1": { id: 1, name: "Ann" } } }', '{ users: { "1": { id: 1, name: "Ann" } } }'),
      ],
      correctIndex: 1,
      explanation: L(
        'The normalized shape keeps a flat list of ids and a map of entities, which gives O(1) lookup by id and makes the updates local. A plain array makes the lookup linear, a deep nesting makes the updates messy, and the byId plus allIds variant is the older shape that the entity adapter replaces.',
        'Нормализованная форма хранит плоский список id и карту сущностей, что даёт доступ за O(1) по id и делает обновления локальными. Обычный массив даёт линейный поиск, глубокая вложенность делает обновления неудобными, а вариант byId плюс allIds — устаревшая форма, которую заменяет адаптер сущностей.'
      ),
    },
    {
      id: 'redux-q26',
      question: L(
        'What does createEntityAdapter provide?',
        'Что предоставляет createEntityAdapter?'
      ),
      options: [
        L('Ready reducers for CRUD operations and selectors for reading the collection', 'Готовые редьюдеры для CRUD и селекторы для чтения коллекции'),
        L('A single reducer that replaces the whole state of the slice', 'Один редьюдер, заменяющий всё состояние слайса'),
        L('A hook that fetches the entities from an API', 'Хук, который загружает сущности из API'),
        L('A middleware that caches the requests per entity', 'Middleware, кэширующая запросы по каждой сущности'),
      ],
      correctIndex: 0,
      explanation: L(
        'The adapter gives you both sides of the work: addOne, updateOne, removeOne and setAll as reducers, and selectAll, selectById, selectIds and selectTotal as selectors over a normalised collection. It does not fetch anything and it does not replace the state of the slice, it works with it.',
        'Адаптер даёт обе стороны работы: addOne, updateOne, removeOne и setAll как редьюдеры, а selectAll, selectById, selectIds и selectTotal — как селекторы над нормализованной коллекцией. Он ничего не загружает и не заменяет состояние слайса, он с ним работает.'
      ),
    },
    {
      id: 'redux-q27',
      question: L(
        'How do you set up the initial state of a slice that uses an entity adapter?',
        'Как настроить начальное состояние слайса, который использует адаптер сущностей?'
      ),
      options: [
        L('Pass usersAdapter.getInitialState() as the initialState of the slice', 'Передать usersAdapter.getInitialState() как initialState слайса'),
        L('Pass an empty array, the adapter converts it on the first action', 'Передать пустой массив, адаптер преобразует его при первом экшене'),
        L('Write { ids: [], entities: {} } by hand every time', 'Каждый раз писать { ids: [], entities: {} } вручную'),
        L('Pass usersAdapter.getInitialState() to configureStore instead of the slice', 'Передать usersAdapter.getInitialState() в configureStore, а не в слайс'),
      ],
      correctIndex: 0,
      explanation: L(
        'getInitialState returns the normalised empty structure with the shape the adapter expects, and passing it as the initialState of the slice keeps the two in sync. An array is not the shape the adapter works with, writing the object by hand works but duplicates knowledge the adapter already owns, and configureStore only takes reducers.',
        'getInitialState возвращает нормализованную пустую структуру нужной адаптеру формы, и передача её как initialState слайса держит обе части в согласии. Массив — не та форма, с которой работает адаптер, ручная запись объекта работает, но дублирует то, что адаптер уже знает, а configureStore принимает только редьюдеры.'
      ),
    },
    {
      id: 'redux-q28',
      question: L(
        'What do you pass to adapter.getSelectors to scope its selectors?',
        'Что передаётся в adapter.getSelectors, чтобы ограничить область селекторов?'
      ),
      options: [
        L('The name of the slice, so it can find the state', 'Имя слайса, чтобы он нашёл состояние'),
        L('A selector that returns the part of the state holding the collection', 'Селектор, возвращающий часть состояния с коллекцией'),
        L('The adapter instance itself, so it can read the entities', 'Сам экземпляр адаптера, чтобы он мог читать сущности'),
        L('The list of the entity ids, so it can filter the result', 'Список id сущностей, чтобы он мог отфильтровать результат'),
      ],
      correctIndex: 1,
      explanation: L(
        'getSelectors takes a function that receives the root state and returns the slice with the collection, for example (state) => state.users. Everything the adapter returns is then relative to that slice. The adapter instance and the list of ids are not what the selector needs.',
        'getSelectors принимает функцию, которая получает корневое состояние и возвращает часть с коллекцией, например (state) => state.users. Всё, что возвращает адаптер, становится относительным этой части. Экземпляр адаптера и список id селектору не нужны.'
      ),
    },
    {
      id: 'redux-q29',
      question: L(
        'How does the updateOne reducer of an entity adapter apply the changes you pass?',
        'Как редьюдер updateOne адаптера сущностей применяет переданные изменения?'
      ),
      options: [
        L('It replaces the whole entity with the object you pass', 'Он полностью заменяет сущность переданным объектом'),
        L('It stores the changes in a separate list next to the entities', 'Он хранит изменения в отдельном списке рядом с сущностями'),
        L('It merges the changes shallowly into the existing entity', 'Он поверхностно сливает изменения с существующей сущностью'),
        L('It updates only the id field and ignores the rest', 'Он обновляет только поле id и игнорирует остальное'),
      ],
      correctIndex: 2,
      explanation: L(
        'updateOne merges the fields you pass into the existing entity, and the merge is shallow, so a nested object is replaced as a whole instead of being merged deeply. Passing a complete entity is not needed, and the adapter never keeps a shadow list of the changes.',
        'updateOne сливает переданные поля с существующей сущностью, причём слияние поверхностное: вложенный объект заменяется целиком, а не сливается глубоко. Передавать сущность целиком не нужно, и адаптер никогда не хранит отдельный список изменений.'
      ),
    },
    {
      id: 'redux-q30',
      question: L(
        'How do you type the Redux hooks in a TypeScript project?',
        'Как типизировать хуки Redux в проекте на TypeScript?'
      ),
      options: [
        L('Cast the state inside every useSelector call with as RootState', 'Приводить тип состояния в каждом вызове useSelector через as RootState'),
        L('Add the return type to useSelector inside the react-redux package', 'Добавить тип возврата к useSelector внутри пакета react-redux'),
        L('Use useStore and read the state manually in every component', 'Использовать useStore и читать состояние вручную в каждом компоненте'),
        L('Create useAppSelector with TypedUseSelectorHook and useAppDispatch with AppDispatch', 'Создать useAppSelector с TypedUseSelectorHook и useAppDispatch с AppDispatch'),
      ],
      correctIndex: 3,
      explanation: L(
        'The typed hooks wrap the react-redux hooks so the state and the dispatch types are already correct in every component: useAppSelector knows RootState and useAppDispatch knows the thunk capable AppDispatch. Casting in every call is noisy, and useStore gives no type help at all.',
        'Типизированные хуки оборачивают хуки react-redux, поэтому типы состояния и dispatch уже верны в каждом компоненте: useAppSelector знает RootState, а useAppDispatch — AppDispatch, умеющий работать с thunk. Приведение типов в каждом вызове шумно, а useStore не даёт никакой типизации.'
      ),
    },
    {
      id: 'redux-q31',
      question: L(
        'What problem does RTK Query solve?',
        'Какую проблему решает RTK Query?'
      ),
      options: [
        L('It caches the server data and removes the manual tracking of the loading and error state', 'Она кэширует данные сервера и снимает ручной учёт состояния загрузки и ошибки'),
        L('It removes the need for a store in simple applications', 'Она убирает необходимость в сторе для простых приложений'),
        L('It turns every request into a reducer, so all the state stays in one place', 'Она превращает каждый запрос в редьюдер, чтобы всё состояние было в одном месте'),
        L('It adds a cache layer on top of the browser fetch API', 'Она добавляет слой кэша поверх браузерного fetch API'),
      ],
      correctIndex: 0,
      explanation: L(
        'RTK Query is a data layer built on the store: it keeps the cache, the status flags and the error information for you and exposes them through generated hooks. It still uses the store, requests are not turned into reducers, and it manages them with its own middleware and cache.',
        'RTK Query — это слой данных поверх стора: он ведёт кэш, флаги состояния и информацию об ошибках и отдаёт их через сгенерированные хуки. Стор он по-прежнему использует, запросы в редьюсеры не превращаются, а управляет ими через собственный middleware и кэш.'
      ),
    },
    {
      id: 'redux-q32',
      question: L(
        'Which two options does createApi normally require?',
        'Какие две опции обычно нужны createApi?'
      ),
      options: [
        L('baseUrl and endpoints', 'baseUrl и endpoints'),
        L('reducerPath and endpoints', 'reducerPath и endpoints'),
        L('reducerPath and baseQuery', 'reducerPath и baseQuery'),
        L('tagTypes and middleware', 'tagTypes и middleware'),
      ],
      correctIndex: 2,
      explanation: L(
        'createApi needs a reducerPath, which tells the store where to mount the state of the api, and a baseQuery, which performs the requests, usually fetchBaseQuery with a baseUrl. The endpoints are defined afterwards in the builder, and tagTypes is optional because tags can be plain strings.',
        'createApi нужен reducerPath, который указывает стору, где разместить состояние api, и baseQuery, который выполняет запросы — обычно fetchBaseQuery с baseUrl. Эндпоинты задаются позже в builder, а tagTypes необязателен, потому что тегами могут быть обычные строки.'
      ),
    },
    {
      id: 'redux-q33',
      question: L(
        'How do the query and the mutation endpoints differ in RTK Query?',
        'Чем query- и mutation-эндпоинты отличаются в RTK Query?'
      ),
      options: [
        L('Queries cannot use tags, only mutations can', 'Запросы не могут использовать теги, только мутации могут'),
        L('Queries read data, mutations change data and can invalidate the cache', 'Запросы читают данные, мутации меняют их и могут инвалидировать кэш'),
        L('Mutations have to be written with the fetch API directly', 'Мутации приходится писать напрямую через fetch API'),
        L('Queries run on the server, mutations run in the browser', 'Запросы выполняются на сервере, мутации — в браузере'),
      ],
      correctIndex: 1,
      explanation: L(
        'A query endpoint fetches and caches data, a mutation endpoint sends changes to the server. Tags belong to both sides, so the first option is wrong, mutations use the same baseQuery as the queries, and there is no split between a server and a client here.',
        'Query-эндпоинт загружает и кэширует данные, mutation-эндпоинт отправляет изменения на сервер. Теги доступны обеим сторонам, поэтому первый вариант неверен, мутации используют тот же baseQuery, и никакого разделения на сервер и клиент тут нет.'
      ),
    },
    {
      id: 'redux-q34',
      question: L(
        'What hooks does RTK Query generate for the endpoints getUsers and addUser?',
        'Какие хуки генерирует RTK Query для эндпоинтов getUsers и addUser?'
      ),
      options: [
        L('useGetUsersQuery and useAddUserMutation', 'useGetUsersQuery и useAddUserMutation'),
        L('useGetUsers and useAddUser', 'useGetUsers и useAddUser'),
        L('useQueryGetUsers and useMutationAddUser', 'useQueryGetUsers и useMutationAddUser'),
        L('useApiGetUsersQuery and useApiAddUserMutation', 'useApiGetUsersQuery и useApiAddUserMutation'),
      ],
      correctIndex: 0,
      explanation: L(
        'The generated names follow the name of the endpoint: a query endpoint gets use plus the endpoint name in PascalCase plus Query, a mutation endpoint gets use plus the name plus Mutation. There is no Api prefix, and the suffix is always there, otherwise the hook could not be told apart.',
        'Сгенерированные имена следуют за именем эндпоинта: query-эндпоинт получает use плюс имя эндпоинта в PascalCase плюс Query, mutation-эндпоинт — use плюс имя плюс Mutation. Префикса Api нет, а суффикс всегда присутствует, иначе хуки нельзя было бы различить.'
      ),
    },
    {
      id: 'redux-q35',
      question: L(
        'How does RTK Query invalidate the cached queries?',
        'Как RTK Query инвалидирует кэшированные запросы?'
      ),
      options: [
        L('The query sets an expiration time and the mutation lowers it', 'Запрос задаёт время устаревания, а мутация его уменьшает'),
        L('The query registers a listener and the mutation triggers it', 'Запрос регистрирует слушателя, а мутация его запускает'),
        L('The mutation dispatches a Redux action that removes the query from the store', 'Мутация отправляет экшен Redux, удаляющий запрос из стора'),
        L('The query providesTags and the mutation invalidatesTags with a matching tag', 'Запрос объявляет providesTags, а мутация инвалидирует совпадающий тег через invalidatesTags'),
      ],
      correctIndex: 3,
      explanation: L(
        'Tags connect the two sides: a query declares which tags it provides and a mutation declares which tags it invalidates. Every cached query that provided an invalidated tag is refetched if it is still subscribed. Expiration times and listeners do not take part in the invalidation mechanism.',
        'Теги связывают обе стороны: запрос объявляет, какие теги он предоставляет, а мутация — какие инвалидирует. Каждый кэшированный запрос, предоставивший инвалидированный тег, перезапрашивается, если он всё ещё используется. Время устаревания и слушатели в механизме инвалидации не участвуют.'
      ),
    },
    {
      id: 'redux-q36',
      question: L(
        'A mutation invalidates the tag Posts. What happens to a cached posts query?',
        'Мутация инвалидирует тег Posts. Что происходит с кэшированным запросом posts?'
      ),
      options: [
        L('It is deleted from the cache and the component gets undefined data', 'Он удаляется из кэша, и компонент получает undefined вместо данных'),
        L('It is refetched if a component is still using it', 'Он перезапрашивается, если его всё ещё использует компонент'),
        L('It keeps the old data until the page is reloaded', 'Он хранит старые данные, пока страницу не перезагрузят'),
        L('It is refetched only when the user presses the refresh button', 'Он перезапрашивается, только если пользователь нажмёт кнопку обновления'),
      ],
      correctIndex: 1,
      explanation: L(
        'Invalidation marks the tagged queries as stale, and the queries that are still subscribed are refetched automatically, while the ones nobody uses are dropped later. The old data is not thrown away instantly, and no manual refresh is needed.',
        'Инвалидация помечает запросы с этим тегом как устаревшие: те, на которые ещё подписаны, перезапрашиваются автоматически, а неиспользуемые позже просто отбрасываются. Старые данные не исчезают мгновенно, и никакая ручная кнопка обновления не нужна.'
      ),
    },
    {
      id: 'redux-q37',
      question: L(
        'How is an optimistic update implemented in RTK Query?',
        'Как реализовать оптимистичное обновление в RTK Query?'
      ),
      options: [
        L('In onQueryStarted, the cache is patched with updateQueryData and the patch is undone if the request fails', 'В onQueryStarted кэш патчится через updateQueryData, а патч откатывается, если запрос не удался'),
        L('By setting the isSuccess flag of the mutation to true before the request', 'Тем, что флаг isSuccess мутации выставляется в true до запроса'),
        L('By dispatching a separate action that changes the store before the mutation', 'Отправкой отдельного экшена, меняющего стор до мутации'),
        L('By caching the response of the next request in advance', 'Кэшированием ответа следующего запроса заранее'),
      ],
      correctIndex: 0,
      explanation: L(
        'onQueryStarted gives you the cache draft and the promise of the request: you patch the cache with updateQueryData, keep the returned patch object and call undo on it if the request rejects, which rolls the UI back. The success flag is only a reaction to the result, and the cache is not filled in advance.',
        'onQueryStarted даёт черновик кэша и промис запроса: вы патчите кэш через updateQueryData, сохраняете возвращённый объект патча и вызываете у него undo при отказе запроса — это откатывает интерфейс. Флаг успеха лишь реагирует на результат, а кэш заранее не заполняется.'
      ),
    },
    {
      id: 'redux-q38',
      question: L(
        'What is a pessimistic update?',
        'Что такое пессимистичное обновление?'
      ),
      options: [
        L('The interface changes before the server confirms it', 'Интерфейс меняется до подтверждения сервером'),
        L('The server sends the change to the client without a request', 'Сервер присылает изменение клиенту без запроса'),
        L('The interface waits for the server to confirm before it shows the new value', 'Интерфейс ждёт подтверждения сервера, прежде чем показать новое значение'),
        L('The change is applied locally and confirmed later', 'Изменение применяется локально и подтверждается позже'),
      ],
      correctIndex: 2,
      explanation: L(
        'A pessimistic update is the default behaviour of a mutation: the interface shows a loading state and switches to the new value only after the server answered. The optimistic variant changes the interface first, so the first and the last options describe the optimistic case.',
        'Пессимистичное обновление — поведение мутации по умолчанию: интерфейс показывает состояние загрузки и переключается на новое значение только после ответа сервера. Оптимистичный вариант меняет интерфейс сразу, поэтому первый и последний варианты описывают именно его.'
      ),
    },
    {
      id: 'redux-q39',
      question: L(
        'How do you make a query refetch every five seconds?',
        'Как заставить запрос перезапрашиваться каждые пять секунд?'
      ),
      options: [
        L('With the refetchEvery option set to 5', 'Опцией refetchEvery со значением 5'),
        L('With the pollingInterval option set to 5000', 'Опцией pollingInterval со значением 5000'),
        L('By calling refetch from a setInterval in the component', 'Вызовом refetch из setInterval внутри компонента'),
        L('By adding the endpoint to the middleware list', 'Добавлением эндпоинта в список middleware'),
      ],
      correctIndex: 1,
      explanation: L(
        'pollingInterval takes milliseconds, so 5000 means every five seconds, and the polling stops automatically when the component unmounts. The option is not called refetchEvery, a manual setInterval keeps running after unmount and leaks, and the middleware list has nothing to do with polling.',
        'pollingInterval задаётся в миллисекундах, поэтому 5000 — это каждые пять секунд, а опрос сам прекращается при размонтировании компонента. Опция называется не refetchEvery, ручной setInterval продолжает работать после размонтирования и течёт, а список middleware к опросу отношения не имеет.'
      ),
    },
    {
      id: 'redux-q40',
      question: L(
        'How do you prevent a query from running while a required argument is missing?',
        'Как не дать запросу выполниться, пока не хватает обязательного аргумента?'
      ),
      options: [
        L('By passing null as the argument of the hook', 'Передачей null в аргумент хука'),
        L('By passing enabled: false to the hook', 'Передачей enabled: false в хук'),
        L('By calling the hook conditionally inside an if', 'Вызовом хука условно внутри if'),
        L('By passing the skip option, for example skip: !userId', 'Передачей опции skip, например skip: !userId'),
      ],
      correctIndex: 3,
      explanation: L(
        'The skip option tells the hook not to start the request, and the query stays in the idle state until the option changes. Passing null would still be a request with a null argument, enabled is not an option of the hook, and calling a hook conditionally breaks the rules of hooks.',
        'Опция skip говорит хуку не начинать запрос, и запрос остаётся в состоянии ожидания, пока опция не изменится. Передача null всё равно была бы запросом с null-аргументом, enabled у хука нет, а условный вызов хука нарушает правила хуков.'
      ),
    },
    {
      id: 'redux-q41',
      question: L(
        'How do you load the data before the user opens a page?',
        'Как загрузить данные до того, как пользователь откроет страницу?'
      ),
      options: [
        L('Call the prefetch util or dispatch the initiate action of the endpoint on hover or focus', 'Вызовом утилиты prefetch или отправкой экшена initiate эндпоинта при наведении или фокусе'),
        L('Render the page component in advance inside a hidden container', 'Отрисовкой компонента страницы заранее в скрытом контейнере'),
        L('Call the loader of the route from the component', 'Вызовом loader маршрута из компонента'),
        L('Add the endpoint to the prefetched list of the store', 'Добавлением эндпоинта в список prefetched стора'),
      ],
      correctIndex: 0,
      explanation: L(
        'The api exposes a prefetch util and the endpoints expose an initiate action, and both start the request and fill the cache, so the page finds the data in the cache when it mounts. Rendering the page in advance is wasteful, a route loader belongs to the router, and there is no prefetched list in the store.',
        'У api есть утилита prefetch, а у эндпоинтов — экшен initiate, и оба запускают запрос и заполняют кэш, поэтому страница при монтировании находит данные в кэше. Заранее отрисовывать страницу расточительно, loader принадлежит роутеру, а списка prefetched в сторе нет.'
      ),
    },
    {
      id: 'redux-q42',
      question: L(
        'What does the transformResponse option of an endpoint do?',
        'Что делает опция transformResponse у эндпоинта?'
      ),
      options: [
        L('It changes the request before it is sent to the server', 'Она меняет запрос до отправки на сервер'),
        L('It adds headers to the request', 'Она добавляет заголовки к запросу'),
        L('It transforms the body of the response before it is stored in the cache', 'Она преобразует тело ответа перед сохранением в кэш'),
        L('It retries the request when the response is not successful', 'Она повторяет запрос, когда ответ неуспешный'),
      ],
      correctIndex: 2,
      explanation: L(
        'transformResponse receives the raw body of the response and returns what should be cached, so you can unwrap a wrapper object or reshape the data. It runs after the request, it does not touch the request itself, and retries are configured with the retry option of the base query.',
        'transformResponse получает сырое тело ответа и возвращает то, что должно попасть в кэш, — так можно развернуть обёртку или перестроить данные. Она работает после запроса, сам запрос не трогает, а повторы настраиваются опцией retry базового запроса.'
      ),
    },
    {
      id: 'redux-q43',
      question: L(
        'What is the shape of a Redux middleware function?',
        'Какова форма middleware-функции в Redux?'
      ),
      options: [
        L('store => next => action => result', 'store => next => action => result'),
        L('action => state => next => result', 'action => state => next => result'),
        L('next => action => store => result', 'next => action => store => result'),
        L('state => action => result', 'state => action => result'),
      ],
      correctIndex: 0,
      explanation: L(
        'A middleware is a function that receives the store, returns a function that receives the next middleware of the chain, and that returns a function that receives the action. It can do something before calling next, do something with the result, or skip next altogether and stop the action.',
        'Middleware — это функция, которая получает стор, возвращает функцию, принимающую следующий middleware в цепочке, и та возвращает функцию, принимающую экшен. Она может что-то сделать до вызова next, обработать результат или вовсе не вызвать next и остановить экшен.'
      ),
    },
    {
      id: 'redux-q44',
      question: L(
        'What is createListenerMiddleware used for?',
        'Для чего используется createListenerMiddleware?'
      ),
      options: [
        L('For replacing the reducers of a slice', 'Для замены редьюдеров слайса'),
        L('For serialising the state before it is saved', 'Для сериализации состояния перед сохранением'),
        L('For making the components re-render faster', 'Для ускорения перерисовки компонентов'),
        L('For reacting to actions with side effects, with cancellation and access to the state', 'Для реакции на экшены побочными эффектами, с отменой и доступом к состоянию'),
      ],
      correctIndex: 3,
      explanation: L(
        'The listener middleware is an alternative to thunks and sagas for side effects: it listens to actions, receives the state and the dispatch, and can cancel a previous run when a new one starts. It does not change reducers, does not serialise the state and has no effect on rendering.',
        'Listener middleware — альтернатива thunk и saga для побочных эффектов: он слушает экшены, получает состояние и dispatch и может отменить предыдущий запуск при новом. Редьюдеры он не меняет, состояние не сериализует и на отрисовку не влияет.'
      ),
    },
    {
      id: 'redux-q45',
      question: L(
        'What does cancelPreviousRuns do in a listener?',
        'Что делает cancelPreviousRuns в слушателе?'
      ),
      options: [
        L('It stops the listener middleware from being added to the store', 'Оно запрещает добавлять listener middleware в стор'),
        L('It removes the listener after the first matching action', 'Оно удаляет слушатель после первого подходящего экшена'),
        L('It aborts the effect of the previous run when a new matching action arrives', 'Оно прерывает эффект предыдущего запуска, когда приходит новый подходящий экшен'),
        L('It cancels the action that triggered the listener', 'Оно отменяет сам экшен, запустивший слушатель'),
      ],
      correctIndex: 2,
      explanation: L(
        'With cancelPreviousRuns the running effect is cancelled as soon as the same listener fires again, which gives the behaviour of takeLatest and protects against stale responses. The action itself is never cancelled, and the listener keeps listening for the later actions.',
        'С cancelPreviousRuns текущий эффект прерывается, как только тот же слушатель сработает снова: это поведение takeLatest, защищающее от устаревших ответов. Сам экшен не отменяется, и слушатель продолжает слушать последующие экшены.'
      ),
    },
    {
      id: 'redux-q46',
      question: L(
        'Which tool should you pick for a simple asynchronous request?',
        'Какой инструмент выбрать для простого асинхронного запроса?'
      ),
      options: [
        L('redux-saga, because it handles every asynchronous case', 'redux-saga, потому что она покрывает любой асинхронный случай'),
        L('createAsyncThunk, because it covers the great majority of cases', 'createAsyncThunk, потому что он покрывает подавляющее большинство случаев'),
        L('createListenerMiddleware, because it is the newest API', 'createListenerMiddleware, потому что это самый новый API'),
        L('A plain action creator with async code inside', 'Обычный создатель экшенов с async-кодом внутри'),
      ],
      correctIndex: 1,
      explanation: L(
        'createAsyncThunk covers the common case of one request with the pending, fulfilled and rejected lifecycle and needs no extra dependency. Sagas are justified for long running or generator based flows and are rarely needed, the listener middleware is for flows that need cancellation, and async code in a plain action creator has no lifecycle at all.',
        'createAsyncThunk закрывает частый случай одного запроса с жизненным циклом pending, fulfilled и rejected и не требует дополнительных зависимостей. Saga оправдана для долгих или генераторных потоков и нужна редко, listener middleware — для потоков с отменой, а async-код в обычном создателе экшенов вообще не имеет жизненного цикла.'
      ),
    },
    {
      id: 'redux-q47',
      question: L(
        'How is the Redux state persisted between page reloads?',
        'Как состояние Redux сохраняется между перезагрузками страницы?'
      ),
      options: [
        L('With a persistence library or with a store subscription that writes the state to localStorage', 'Библиотекой персистентности или подпиской на стор, которая пишет состояние в localStorage'),
        L('By keeping it in a module level variable, because the module stays alive', 'Хранением в переменной уровня модуля, потому что модуль остаётся живым'),
        L('By sending the whole state to the server on every action', 'Отправкой всего состояния на сервер при каждом экшене'),
        L('By relying on the browser cache of the store object', 'Расчётом на кэш браузера для объекта стора'),
      ],
      correctIndex: 0,
      explanation: L(
        'Redux keeps nothing between reloads on its own, so you subscribe to the store and write the serialisable part of the state to localStorage, or use a library such as redux-persist that does the same with rehydration. A module variable dies with the page, sending the state on every action is not persistence, and the browser does not cache the store object.',
        'Сам Redux не хранит ничего между перезагрузками, поэтому вы подписываетесь на стор и пишете сериализуемую часть состояния в localStorage либо используете библиотеку вроде redux-persist, которая делает то же самое с восстановлением. Переменная модуля умирает вместе со страницей, отправка состояния на каждый экшен — не персистентность, а браузер не кэширует объект стора.'
      ),
    },
    {
      id: 'redux-q48',
      question: L(
        'Which middleware does configureStore enable by default?',
        'Какое middleware configureStore включает по умолчанию?'
      ),
      options: [
        L('None, you add every middleware yourself', 'Никакое, всё middleware вы добавляете сами'),
        L('Only the thunk middleware, the checks are opt in', 'Только thunk middleware, проверки включаются вручную'),
        L('The thunk middleware plus the immutable and serialisable state checks in development', 'Thunk middleware плюс проверки неизменяемости и сериализуемости в разработке'),
        L('The thunk middleware and a logger that prints every action', 'Thunk middleware и логгер, печатающий каждый экшен'),
      ],
      correctIndex: 2,
      explanation: L(
        'configureStore installs the thunk middleware and, in development, the immutableCheck and the serializableCheck that warn when the state is mutated or when a non serialisable value such as a Date or a function is stored. The logger is not added by default, and the checks can be switched off, but they are on when you start.',
        'configureStore устанавливает thunk middleware и, в разработке, immutableCheck и serializableCheck, которые предупреждают о мутации состояния и о несериализуемых значениях вроде Date или функции. Логгер по умолчанию не добавляется, проверки можно выключить, но изначально они включены.'
      ),
    },
    {
      id: 'redux-q49',
      question: L(
        'When is useStore the right choice instead of useSelector and useDispatch?',
        'Когда useStore лучше, чем useSelector и useDispatch?'
      ),
      options: [
        L('For every component that reads a value from the state', 'Для каждого компонента, который читает значение из состояния'),
        L('For rare cases where the whole store is needed outside of the subscription model, such as debugging or an imperative api', 'Для редких случаев, когда нужен весь стор вне модели подписки, например для отладки или императивного api'),
        L('For components that dispatch actions, because it is faster', 'Для компонентов, отправляющих экшены, потому что это быстрее'),
        L('For reading the state outside of React entirely', 'Для чтения состояния вообще вне React'),
      ],
      correctIndex: 1,
      explanation: L(
        'useStore gives the store object itself, so you can call getState or dispatch imperatively, but it does not subscribe the component to any slice, so the component does not re-render when the state changes. For reading data use useSelector and for dispatching use useDispatch, and outside React you do not need a hook at all.',
        'useStore отдаёт сам объект стора, так что можно императивно вызвать getState или dispatch, но он не подписывает компонент ни на одну часть состояния, поэтому компонент не перерисовывается при изменениях. Для чтения данных нужен useSelector, для отправки — useDispatch, а вне React хук вообще не требуется.'
      ),
    },
    {
      id: 'redux-q50',
      question: L(
        'What changed in react-redux version 9?',
        'Что изменилось в react-redux версии 9?'
      ),
      options: [
        L('useSelector was removed in favour of useSyncExternalStore', 'useSelector удалили в пользу useSyncExternalStore'),
        L('The Provider no longer uses React context', 'Provider больше не использует React-контекст'),
        L('The hooks now require the store to be passed as an argument', 'Хуки теперь требуют передавать стор аргументом'),
        L('The subscription is based on useSyncExternalStore, and the public API of the hooks stayed the same', 'Подписка построена на useSyncExternalStore, а публичный API хуков не изменился'),
      ],
      correctIndex: 3,
      explanation: L(
        'Version 9 subscribes to the store with the useSyncExternalStore hook of React 18, which makes the updates tear free and lets React do the batching. useSelector, useDispatch and Provider all kept their interface, so only the internals changed.',
        'Девятая версия подписывается на стор через хук useSyncExternalStore из React 18: обновления становятся согласованными, а пакетирование делает React. Интерфейсы useSelector, useDispatch и Provider не изменились — поменялась только внутренняя реализация.'
      ),
    },
  ],
};
