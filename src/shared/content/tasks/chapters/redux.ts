import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const reduxChapterTasks: PracticeTask[] = [
  {
    id: 'ch-redux-ch1-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch1',
    level: 'basic',
    title: L('A pure reducer for a counter', 'Чистый редьюсер для счётчика'),
    brief: L(
      'Write a reducer for a counter that handles increment, decrement and reset. The reducer must be pure: it returns a new state object, it never mutates the state it received, and it returns the same state for an unknown action.',
      'Напишите редьюдер счётчика, который обрабатывает increment, decrement и reset. Редьюсер должен быть чистым: возвращает новый объект состояния, не мутирует полученное состояние и возвращает то же состояние для неизвестного действия.'
    ),
    hint: L(
      'Type the action as a union of literals and switch on action.type. A new state comes from spreading the old one, and the default branch returns the state untouched.',
      'Типизируйте действие как union литералов и сделайте switch по action.type. Новое состояние получается spread-ом старого, а ветка default возвращает состояние без изменений.'
    ),
    solution: `type CounterAction =
  | { type: 'counter/increment'; by: number }
  | { type: 'counter/decrement' }
  | { type: 'counter/reset' };
interface CounterState { value: number }
const initialState: CounterState = { value: 0 };
// (state, action) => state: the same input always gives the same output.
export function counterReducer(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, value: state.value + action.by };
    case 'counter/decrement':
      return { ...state, value: state.value - 1 };
    case 'counter/reset':
      return initialState;
    default:
      return state;
  }
}`,
    explanation: L(
      'The reducer is a pure function of state and action, so the same action always produces the same tree and an unknown action leaves the state untouched. The task checks the contract that every later chapter of the module builds on.',
      'Редьюсер — чистая функция состояния и действия, поэтому одно и то же действие всегда даёт одно и то же дерево, а неизвестное действие не меняет состояние. Задача проверяет контракт, на который опираются все следующие главы модуля.'
    ),
  },
  {
    id: 'ch-redux-ch2-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch2',
    level: 'basic',
    title: L('A slice with prepare and its own selectors', 'Слайс с prepare и собственными селекторами'),
    brief: L(
      'Create a todos slice whose todoAdded action takes a plain text. Use prepare to build the payload (id, text, done) before the reducer runs, and declare two selectors on the slice: one that returns the items and one that counts the open ones.',
      'Создайте слайс todos, у которого действие todoAdded принимает обычный текст. С помощью prepare соберите payload (id, text, done) до запуска редьюсера и объявите в слайсе два селектора: один возвращает элементы, другой считает незакрытые.'
    ),
    hint: L(
      'A case reducer can be an object with prepare and reducer. The selectors option of createSlice receives the state of the slice, so a component does not walk the tree.',
      'Редьюсер случая может быть объектом с prepare и reducer. Опция selectors у createSlice получает состояние слайса, поэтому компоненту не нужно обходить дерево.'
    ),
    solution: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface Todo { id: string; text: string; done: boolean }
const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [] as Todo[] },
  reducers: {
    todoAdded: {
      // prepare normalises the arguments before the reducer sees them
      prepare(text: string) {
        return { payload: { id: crypto.randomUUID(), text, done: false } };
      },
      reducer(state, action: PayloadAction<Todo>) {
        state.items.push(action.payload);
      },
    },
  },
  // the slice declares how it is read
  selectors: {
    selectItems: (state) => state.items,
    selectOpenCount: (state) => state.items.filter((todo) => !todo.done).length,
  },
});`,
    explanation: L(
      'prepare is the last place where the shape of the incoming data can be fixed, so the reducer only ever sees the final payload. Declared selectors keep the derivation next to the reducer, where it can be tested on its own.',
      'prepare — последнее место, где можно исправить форму входящих данных, поэтому редьюсер видит только готовый payload. Объявленные селекторы держат производную рядом с редьюсером, где её можно проверить отдельно.'
    ),
  },
  {
    id: 'ch-redux-ch3-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch3',
    level: 'basic',
    title: L('Memoised selectors for a todo list', 'Мемоизированные селекторы для списка задач'),
    brief: L(
      'Write the read side of a todos slice: a plain selector for the items, a memoised selector that returns the open todos, a count derived from it and a parameterised selector factory that finds one todo by id. The memoised selector must return the same array reference while the items do not change.',
      'Напишите сторону чтения слайса todos: обычный селектор элементов, мемоизированный селектор незакрытых задач, производный от него счётчик и фабрику параметризованного селектора, который находит задачу по id. Мемоизированный селектор должен возвращать ту же ссылку на массив, пока элементы не меняются.'
    ),
    hint: L(
      'createSelector takes the input selectors as an array and the result function as the second argument. A parameterised selector is a factory that returns a selector.',
      'createSelector принимает входные селекторы массивом, а функцию результата — вторым аргументом. Параметризованный селектор — это фабрика, которая возвращает селектор.'
    ),
    solution: `import { createSelector } from '@reduxjs/toolkit';

interface Todo { id: string; text: string; done: boolean }
interface RootState { todos: { items: Todo[] } }
const selectItems = (state: RootState) => state.todos.items;
// the cache is keyed on the reference of the input
export const selectOpenTodos = createSelector([selectItems], (items) =>
  items.filter((todo) => !todo.done),
);
export const selectOpenCount = createSelector(
  [selectOpenTodos],
  (open) => open.length,
);
// a parameterised selector is a factory that returns a selector
export const selectTodoById = (id: string) => (state: RootState) =>
  state.todos.items.find((todo) => todo.id === id);`,
    explanation: L(
      'The memoised selector caches the last result and hands back the same array reference while the input array is unchanged, which is what lets useSelector skip a re-render. The task checks the read side of the store: plain, memoised and parameterised selectors.',
      'Мемоизированный селектор кэширует последний результат и отдаёт ту же ссылку на массив, пока входной массив не изменился, — именно это позволяет useSelector пропустить перерисовку. Задача проверяет сторону чтения стора: обычные, мемоизированные и параметризованные селекторы.'
    ),
  },
  {
    id: 'ch-redux-ch4-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch4',
    level: 'intermediate',
    title: L('The lifecycle of an async request in one slice', 'Жизненный цикл асинхронного запроса в одном слайсе'),
    brief: L(
      'Create a thunk that loads a user by id and a slice that keeps one status field for the request. Handle pending, fulfilled and rejected, and make sure the rejected case stores the message of the failure.',
      'Создайте thunk, который загружает пользователя по id, и слайс с одним полем статуса для запроса. Обработайте pending, fulfilled и rejected, а в rejected сохраняйте сообщение об ошибке.'
    ),
    hint: L(
      'A thunk dispatches three actions of its own. The status is a union of literals, and the pending case clears the error of the previous request.',
      'Thunk сам диспатчит три действия. Статус — это union литералов, а в pending очищается ошибка предыдущего запроса.'
    ),
    solution: `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk<{ id: string }, string>(
  'users/fetchUser',
  async (id) => (await fetch('/api/users/' + id)).json() as { id: string },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', user: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload; })
      .addCase(fetchUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? 'Unknown error'; });
  },
});`,
    explanation: L(
      'One status field replaces three booleans, so the interface has four states instead of eight combinations. Handling pending, fulfilled and rejected together keeps the data and the error from ever appearing at the same time.',
      'Одно поле статуса заменяет три булевы флага, поэтому у интерфейса четыре состояния вместо восьми комбинаций. Обработка pending, fulfilled и rejected вместе не даёт данным и ошибке появиться одновременно.'
    ),
  },
  {
    id: 'ch-redux-ch5-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch5',
    level: 'intermediate',
    title: L('RTK Query endpoints with tags and invalidation', 'Эндпоинты RTK Query с тегами и инвалидацией'),
    brief: L(
      'Create an RTK Query api for posts. The query endpoint must provide a general tag for the whole collection and a tag per post, and the delete mutation must invalidate the tag of the post it removes, computed from its argument.',
      'Создайте api RTK Query для постов. Query-эндпоинт должен отдавать общий тег для всей коллекции и отдельный тег на каждый пост, а мутация удаления — инвалидировать тег удаляемого поста, вычисленный из аргумента.'
    ),
    hint: L(
      'tagTypes lists the tag names, providesTags describes what a cache entry contains, and invalidatesTags can be a function of the result, the error and the arguments.',
      'tagTypes перечисляет имена тегов, providesTags описывает содержимое записи кэша, а invalidatesTags может быть функцией от результата, ошибки и аргументов.'
    ),
    solution: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post { id: string; title: string }
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'] as const,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      // the general tag covers the whole collection
      providesTags: (result) =>
        result ? [{ type: 'Post', id: 'LIST' }, ...result.map((post) => ({ type: 'Post' as const, id: post.id }))] : [],
    }),
    deletePost: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: '/posts/' + id, method: 'DELETE' }),
      // the tags are computed from the arguments of the mutation
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
  }),
});`,
    explanation: L(
      'The api object owns the cache, so the server data lives in its own slice and never in a slice of your own. Tags describe what a cache entry contains, and invalidating a tag is what tells the cache that the data changed.',
      'Объект api владеет кэшем, поэтому серверные данные живут в его собственном слайсе, а не в вашем. Теги описывают содержимое записи кэша, и инвалидация тега сообщает кэшу, что данные изменились.'
    ),
  },
  {
    id: 'ch-redux-ch6-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch6',
    level: 'intermediate',
    title: L('A normalised collection with the entity adapter', 'Нормализованная коллекция через entity adapter'),
    brief: L(
      'Create a posts slice on top of the entity adapter. The state must come from getInitialState, the adapter must sort the posts by title, one reducer adds a post and another archives it with a partial change, and a memoised selector returns the posts that are not archived.',
      'Создайте слайс posts поверх entity adapter. Состояние должно приходить из getInitialState, адаптер должен сортировать посты по заголовку, один редьюсер добавляет пост, другой архивирует его частичным изменением, а мемоизированный селектор возвращает неархивированные посты.'
    ),
    hint: L(
      'The adapter owns the shape of the state: addOne, updateOne and getSelectors work on it. getSelectors gives selectAll and selectById, and createSelector keeps the result reference stable.',
      'Форму состояния владеет адаптер: addOne, updateOne и getSelectors работают именно с ним. getSelectors даёт selectAll и selectById, а createSelector сохраняет ссылку на результат.'
    ),
    solution: `import { createEntityAdapter, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Post { id: string; title: string; archived?: boolean }
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});
const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    postAdded: (state, action: PayloadAction<Post>) => postsAdapter.addOne(state, action.payload),
    postArchived: (state, action: PayloadAction<{ id: string; changes: Partial<Post> }>) =>
      postsAdapter.updateOne(state, action.payload),
  },
});
const postsSelectors = postsAdapter.getSelectors((state: { posts: typeof postsSlice.initialState }) => state.posts);
export const selectActivePosts = createSelector([postsSelectors.selectAll], (posts) => posts.filter((p) => !p.archived));`,
    explanation: L(
      'The adapter keeps one entry per id, so the same post sent twice updates one record instead of creating a copy. A memoised selector on top of selectAll keeps the filtered list stable between the changes of the collection.',
      'Адаптер держит одну запись на каждый id, поэтому один и тот же пост, пришедший дважды, обновляет запись, а не создаёт копию. Мемоизированный селектор поверх selectAll сохраняет ссылку на отфильтрованный список между изменениями коллекции.'
    ),
  },
  {
    id: 'ch-redux-ch7-1',
    moduleId: 'redux',
    topic: 'redux',
    chapterId: 'redux-ch7',
    level: 'intermediate',
    title: L('A listener that persists the state after a write', 'Листенер, который сохраняет состояние после записи'),
    brief: L(
      'Create a listener middleware that reacts to the postAdded action and writes the posts of the store into localStorage. The stored payload must carry a version number, and the listener must read the state after the reducers have run.',
      'Создайте listener middleware, который реагирует на действие postAdded и записывает посты из стора в localStorage. Сохраняемый payload должен содержать номер версии, а листенер — читать состояние после того, как отработали редьюсеры.'
    ),
    hint: L(
      'startListening takes an actionCreator and an effect. Inside the effect the api object gives getState, cancelActiveListeners and delay.',
      'startListening принимает actionCreator и effect. Внутри эффекта объект api даёт getState, cancelActiveListeners и delay.'
    ),
    solution: `import { createListenerMiddleware } from '@reduxjs/toolkit';
import { postAdded } from './postsSlice';

const STORAGE_KEY = 'app-posts';
const STATE_VERSION = 1;
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: postAdded,
  effect: async (action, api) => {
    // the reducers already ran, so the state is up to date here
    api.cancelActiveListeners();
    const posts = (api.getState() as { posts: unknown }).posts;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, posts }));
    console.log('tracked post', action.payload.id);
  },
});`,
    explanation: L(
      'A listener runs after the reducers, so the state it writes is already up to date. The version number next to the payload lets the application drop the stored state when the shape of the tree changes.',
      'Листенер выполняется после редьюсеров, поэтому записываемое состояние уже актуально. Номер версии рядом с payload позволяет выбросить сохранённое состояние, когда форма дерева изменится.'
    ),
  },
];
