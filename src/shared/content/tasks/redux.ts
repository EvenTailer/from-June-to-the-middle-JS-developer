import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxTasks: PracticeTask[] = [
  {
    id: 'redux-task-4',
    topic: 'redux',
    level: 'basic',
    title: L('Memoized selectors with createSelector', 'Мемоизированные селекторы через createSelector'),
    brief: L(
      'Write selectors for a todo list: visibleTodos filtered by the current filter, and stats with total and done counts. Build both with createSelector so unrelated state changes do not recompute them.',
      'Напишите селекторы для списка задач: visibleTodos с фильтрацией по текущему фильтру и stats с количеством всех и выполненных задач. Постройте оба через createSelector, чтобы несвязанные изменения состояния не вызывали пересчёт.'
    ),
    hint: L(
      'Pass an array of input selectors and a result function. Selectors must stay pure.',
      'Передайте массив входных селекторов и функцию результата. Селекторы должны оставаться чистыми.'
    ),
    solution: `import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

type Filter = 'all' | 'active' | 'done';

const selectTodos = (state: RootState) => state.todos;
const selectFilter = (state: RootState) => state.filter;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos: Todo[], filter: Filter) => {
    if (filter === 'active') return todos.filter((todo) => !todo.done);
    if (filter === 'done') return todos.filter((todo) => todo.done);
    return todos;
  }
);

export const selectStats = createSelector([selectTodos], (todos: Todo[]) => ({
  total: todos.length,
  done: todos.filter((todo) => todo.done).length,
}));`,
    explanation: L(
      'createSelector caches the last result and recomputes only when an input selector returns a different reference. The filter and stats selectors stay cheap even when the store updates often.',
      'createSelector кэширует последний результат и пересчитывает его только когда входной селектор вернул другую ссылку. Селекторы фильтра и статистики остаются дешёвыми даже при частых обновлениях store.'
    ),
  },
  {
    id: 'redux-task-5',
    topic: 'redux',
    level: 'basic',
    title: L('Normalize users by id', 'Нормализовать пользователей по id'),
    brief: L(
      'Store users as a byId map plus an allIds array. Add a reducer to upsert a user, a reducer to remove one, and a selector that returns the list in insertion order.',
      'Храните пользователей как map byId и массив allIds. Добавьте редьюсер для вставки или обновления пользователя, редьюсер удаления и селектор, возвращающий список в порядке добавления.'
    ),
    hint: L(
      'Check byId before pushing an id into allIds so an update does not create a duplicate.',
      'Проверяйте byId перед добавлением id в allIds, чтобы обновление не создавало дубликат.'
    ),
    solution: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface UsersState {
  byId: Record<string, User>;
  allIds: string[];
}

const initialState: UsersState = { byId: {}, allIds: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userUpserted: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      if (!state.byId[user.id]) state.allIds.push(user.id);
      state.byId[user.id] = user;
    },
    userRemoved: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
  },
});

export const { userUpserted, userRemoved } = usersSlice.actions;

export const selectAllUsers = (state: { users: UsersState }): User[] =>
  state.users.allIds.map((id) => state.users.byId[id]);

export default usersSlice.reducer;`,
    explanation: L(
      'Normalized state keeps one copy of each entity. Updating a user touches one map entry instead of scanning and replacing an array element, and lookups by id become O(1).',
      'Нормализованное состояние хранит одну копию каждой сущности. Обновление пользователя меняет одну запись map вместо поиска и замены элемента массива, а поиск по id становится O(1).'
    ),
  },
  {
    id: 'redux-task-6',
    topic: 'redux',
    level: 'basic',
    title: L('Define product query endpoints', 'Описать query-эндпоинты для товаров'),
    brief: L(
      'Create an RTK Query API with two queries: a product list that accepts an optional category and a single product by id that unwraps a response shaped as { data }.',
      'Создайте RTK Query API с двумя запросами: список товаров с необязательной категорией и один товар по id, который разворачивает ответ вида { data }.'
    ),
    hint: L(
      'builder.query<Result, Arg> describes the cache. Use transformResponse to unwrap the payload.',
      'builder.query<Result, Arg> описывает кеш. Используйте transformResponse, чтобы развернуть payload.'
    ),
    solution: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  id: string;
  title: string;
  priceCents: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { category?: string }>({
      query: ({ category } = {}) => ({
        url: '/products',
        params: category ? { category } : undefined,
      }),
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => '/products/' + id,
      transformResponse: (response: { data: Product }) => response.data,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;`,
    explanation: L(
      'Each endpoint gets a generated hook and its own cache entry keyed by the argument. transformResponse lets components consume a clean model instead of the transport envelope.',
      'Каждый эндпоинт получает сгенерированный хук и собственную запись кеша с ключом по аргументу. transformResponse позволяет компонентам работать с чистой моделью вместо транспортной обёртки.'
    ),
  },
  {
    id: 'redux-task-7',
    topic: 'redux',
    level: 'intermediate',
    title: L('Optimistic rename with updateQueryData', 'Оптимистичное переименование через updateQueryData'),
    brief: L(
      'Add a renameTodo mutation that immediately updates the cached todo list, then rolls the patch back if the request fails.',
      'Добавьте мутацию renameTodo, которая сразу обновляет кешированный список задач и откатывает изменение, если запрос завершился ошибкой.'
    ),
    hint: L(
      'updateQueryData returns a patch object. For a void argument the cache key is undefined.',
      'updateQueryData возвращает объект patch. Для аргумента void ключ кеша — undefined.'
    ),
    solution: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      providesTags: ['Todo'],
    }),
    renameTodo: builder.mutation<Todo, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: '/todos/' + id,
        method: 'PATCH',
        body: { text },
      }),
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find((item) => item.id === id);
            if (todo) todo.text = text;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const { useGetTodosQuery, useRenameTodoMutation } = todosApi;`,
    explanation: L(
      'The UI updates before the network finishes. If the server rejects the change, patch.undo restores the exact cache snapshot, so the user never sees a lie.',
      'Интерфейс обновляется до завершения запроса. Если сервер отклонил изменение, patch.undo восстанавливает точный снимок кеша, и пользователь не видит ложных данных.'
    ),
  },
  {
    id: 'redux-task-8',
    topic: 'redux',
    level: 'intermediate',
    title: L('Log todo changes with listener middleware', 'Логировать изменения задач через listener middleware'),
    brief: L(
      'Create a listener middleware that logs the previous and next todo count whenever addTodo or removeTodo is dispatched.',
      'Создайте listener middleware, который логирует предыдущее и новое количество задач при dispatch addTodo или removeTodo.'
    ),
    hint: L(
      'Use isAnyOf as the matcher. getOriginalState returns the state before the reducer ran.',
      'Используйте isAnyOf как matcher. getOriginalState возвращает состояние до выполнения редьюсера.'
    ),
    solution: `import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { addTodo, removeTodo } from './todosSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, removeTodo),
  effect: async (action, listenerApi) => {
    const previous = listenerApi.getOriginalState() as RootState;
    const next = listenerApi.getState() as RootState;

    console.log(
      action.type,
      'todo count:',
      previous.todos.length,
      '->',
      next.todos.length
    );
  },
});

// store.ts
// configureStore({
//   reducer: { todos: todosReducer },
//   middleware: (getDefault) =>
//     getDefault().prepend(listenerMiddleware.middleware),
// });`,
    explanation: L(
      'Listener middleware reacts to actions without changing reducer purity. It runs after the reducer, sees both states, and can start async work, which a reducer must never do.',
      'Listener middleware реагирует на действия, не нарушая чистоту редьюсеров. Он выполняется после редьюсера, видит оба состояния и может запускать асинхронную работу, чего редьюсер делать не должен.'
    ),
  },
  {
    id: 'redux-task-9',
    topic: 'redux',
    level: 'intermediate',
    title: L('Persist the store manually', 'Сохранять store вручную'),
    brief: L(
      'Restore state from localStorage when the store is created and write a snapshot after every real change. Ignore malformed JSON.',
      'Восстанавливайте состояние из localStorage при создании store и записывайте снимок после каждого реального изменения. Некорректный JSON игнорируйте.'
    ),
    hint: L(
      'Pass preloadedState to configureStore. Keep the last state reference to skip notifications that did not change the state.',
      'Передайте preloadedState в configureStore. Храните ссылку на последнее состояние, чтобы пропускать уведомления без изменений.'
    ),
    solution: `import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

const STORAGE_KEY = 'app-state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { todos: todosReducer },
  preloadedState: loadState(),
});

let lastState = store.getState();

store.subscribe(() => {
  const state = store.getState();
  if (state === lastState) return;
  lastState = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});`,
    explanation: L(
      'preloadedState hydrates the store once. The subscribe callback compares references, so notifications that leave state untouched do not cause redundant writes.',
      'preloadedState наполняет store один раз. Колбэк subscribe сравнивает ссылки, поэтому уведомления без изменений состояния не вызывают лишних записей.'
    ),
  },
  {
    id: 'redux-task-10',
    topic: 'redux',
    level: 'intermediate',
    title: L('CRUD with createEntityAdapter', 'CRUD через createEntityAdapter'),
    brief: L(
      'Manage a book collection with createEntityAdapter: add one book, update one by id, remove one, and export selectAll and selectById.',
      'Управляйте коллекцией книг через createEntityAdapter: добавление одной книги, обновление по id, удаление одной книги и экспорт selectAll и selectById.'
    ),
    hint: L(
      'The adapter reducers already accept standard action payloads. getSelectors returns memoized selectors.',
      'Редьюсеры адаптера уже принимают стандартные payload действий. getSelectors возвращает мемоизированные селекторы.'
    ),
    solution: `import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

interface Book {
  id: string;
  title: string;
  author: string;
}

const booksAdapter = createEntityAdapter<Book>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    bookAdded: booksAdapter.addOne,
    bookUpdated: booksAdapter.updateOne,
    bookRemoved: booksAdapter.removeOne,
  },
});

export const { bookAdded, bookUpdated, bookRemoved } = booksSlice.actions;

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
} = booksAdapter.getSelectors();

export default booksSlice.reducer;`,
    explanation: L(
      'The adapter supplies normalized state and ready-made reducers. selectAll applies the sort comparer and returns a stable array while the collection is unchanged.',
      'Адаптер даёт нормализованное состояние и готовые редьюсеры. selectAll применяет компаратор сортировки и возвращает стабильный массив, пока коллекция не изменилась.'
    ),
  },
  {
    id: 'redux-task-11',
    topic: 'redux',
    level: 'advanced',
    title: L('Model loading and error states in extraReducers', 'Состояния загрузки и ошибки в extraReducers'),
    brief: L(
      'Fetch a user list with createAsyncThunk and track idle, loading, succeeded and failed states. A failed request must store a readable error message.',
      'Загрузите список пользователей через createAsyncThunk и отслеживайте состояния idle, loading, succeeded и failed. Неудачный запрос должен сохранять понятное сообщение об ошибке.'
    ),
    hint: L(
      'Use rejectWithValue for expected HTTP failures and read action.payload in the rejected case.',
      'Используйте rejectWithValue для ожидаемых HTTP-ошибок и читайте action.payload в случае rejected.'
    ),
    solution: `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('users/fetchAll', async (_, { rejectWithValue }) => {
  const response = await fetch('/api/users');
  if (!response.ok) return rejectWithValue('HTTP ' + response.status);
  return response.json();
});

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export default usersSlice.reducer;`,
    explanation: L(
      'The discriminated status makes impossible combinations hard to render. Clearing the error on pending prevents a stale message from flashing during a retry.',
      'Дискриминированный status затрудняет отрисовку невозможных комбинаций. Сброс ошибки в pending не даёт старому сообщению мелькнуть во время повторной попытки.'
    ),
  },
  {
    id: 'redux-task-12',
    topic: 'redux',
    level: 'advanced',
    title: L('Test a reducer without a store', 'Протестировать редьюсер без store'),
    brief: L(
      'Write Vitest tests for the todos reducer: adding a todo, toggling one, and returning the same state for an unknown action.',
      'Напишите тесты Vitest для редьюсера задач: добавление задачи, переключение и возврат того же состояния для неизвестного действия.'
    ),
    hint: L(
      'A reducer is a pure function, so call it with a state and an action. No store or Provider is needed.',
      'Редьюсер — чистая функция, поэтому вызывайте его с состоянием и действием. Store или Provider не нужны.'
    ),
    solution: `import { describe, expect, it } from 'vitest';
import reducer, { addTodo, toggleTodo } from './todosSlice';

describe('todos reducer', () => {
  it('adds a todo', () => {
    const state = reducer([], addTodo('Write tests'));

    expect(state).toHaveLength(1);
    expect(state[0].text).toBe('Write tests');
    expect(state[0].done).toBe(false);
  });

  it('toggles a todo', () => {
    const added = reducer([], addTodo('Write tests'));
    const state = reducer(added, toggleTodo(added[0].id));

    expect(state[0].done).toBe(true);
  });

  it('keeps state for an unknown action', () => {
    const state = reducer([], { type: 'unknown/action' });

    expect(state).toEqual([]);
  });
});`,
    explanation: L(
      'Testing the reducer directly isolates state logic from React and from the store. Assertions on the returned value document the contract that components rely on.',
      'Прямое тестирование редьюсера изолирует логику состояния от React и store. Проверки возвращаемого значения фиксируют контракт, на который опираются компоненты.'
    ),
  },
  {
    id: 'redux-task-13',
    topic: 'redux',
    level: 'advanced',
    title: L('Undo and redo history', 'История undo/redo'),
    brief: L(
      'Add undo and redo to a counter. Keep past and future stacks, and drop the redo stack after a new increment.',
      'Добавьте undo и redo для счётчика. Храните стеки past и future и очищайте future после нового increment.'
    ),
    hint: L(
      'Past holds previous values, future holds reverted values. Guard against empty stacks.',
      'past хранит предыдущие значения, future — отменённые. Проверяйте, что стек не пуст.'
    ),
    solution: `import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  past: number[];
  present: number;
  future: number[];
}

const initialState: CounterState = {
  past: [],
  present: 0,
  future: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.past.push(state.present);
      state.present += 1;
      state.future = [];
    },
    undo: (state) => {
      const previous = state.past.pop();
      if (previous === undefined) return;
      state.future.unshift(state.present);
      state.present = previous;
    },
    redo: (state) => {
      const next = state.future.shift();
      if (next === undefined) return;
      state.past.push(state.present);
      state.present = next;
    },
  },
});

export const { increment, undo, redo } = counterSlice.actions;
export default counterSlice.reducer;`,
    explanation: L(
      'The three fields form a classic history stack. A new edit clears future because the redo branch is no longer valid, while undo and redo simply move one value between stacks.',
      'Три поля образуют классический стек истории. Новое изменение очищает future, потому что ветка redo больше недействительна, а undo и redo просто переносят одно значение между стеками.'
    ),
  },
  {
    id: 'redux-task-14',
    topic: 'redux',
    level: 'advanced',
    title: L('Roll back an optimistic create', 'Откатить оптимистичное создание'),
    brief: L(
      'Insert a temporary todo immediately when addTodo starts, replace it with the server copy on success, and remove it if the request fails.',
      'Сразу вставляйте временную задачу при старте addTodo, заменяйте её серверной копией при успехе и удаляйте при ошибке запроса.'
    ),
    hint: L(
      'The request id is available as action.meta.requestId in all three thunk cases. Use it to find the temporary item.',
      'Id запроса доступен как action.meta.requestId во всех трёх случаях thunk. Используйте его для поиска временного элемента.'
    ),
    solution: `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  pending?: boolean;
}

export const addTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>('todos/add', async (text, { rejectWithValue }) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) return rejectWithValue('Could not save the todo');
  return response.json();
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state, action) => {
        state.push({
          id: 'temp-' + action.meta.requestId,
          text: action.meta.arg,
          pending: true,
        });
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === 'temp-' + action.meta.requestId
        );
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(addTodo.rejected, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === 'temp-' + action.meta.requestId
        );
        if (index !== -1) state.splice(index, 1);
      });
  },
});

export default todosSlice.reducer;`,
    explanation: L(
      'The pending case renders the new todo instantly. The requestId links all three lifecycle actions to the same temporary record, so success replaces it and failure removes it without touching other rows.',
      'Случай pending сразу показывает новую задачу. requestId связывает все три действия жизненного цикла с одной временной записью, поэтому успех заменяет её, а ошибка удаляет, не затрагивая другие строки.'
    ),
  },
  {
    id: 'redux-task-15',
    topic: 'redux',
    level: 'advanced',
    title: L('Invalidate cached posts with tags', 'Инвалидировать кеш постов через теги'),
    brief: L(
      'Configure tag-based cache invalidation: the list and each post provide Post tags, createPost invalidates the list, and updatePost invalidates only the edited post.',
      'Настройте инвалидацию кеша по тегам: список и каждый пост предоставляют тег Post, createPost инвалидирует список, а updatePost — только изменённый пост.'
    ),
    hint: L(
      'providesTags and invalidatesTags may be functions. Use a LIST id for the collection and the entity id for details.',
      'providesTags и invalidatesTags могут быть функциями. Используйте id LIST для коллекции и id сущности для деталей.'
    ),
    solution: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: string;
  title: string;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => '/posts/' + id,
      providesTags: (_result, _error, id) => [{ type: 'Post' as const, id }],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: '/posts/' + post.id,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: (_result, _error, post) => [
        { type: 'Post', id: post.id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postsApi;`,
    explanation: L(
      'Tags connect mutations to the exact cache entries they affect. Creating a post refreshes the list, while editing one refreshes that detail and leaves every other cached post untouched.',
      'Теги связывают мутации с конкретными записями кеша. Создание поста обновляет список, а редактирование — только детали этого поста, не затрагивая остальные кешированные посты.'
    ),
  },
];
