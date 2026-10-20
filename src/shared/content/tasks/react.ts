import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactTasks: PracticeTask[] = [
  {
    id: 'react-task-4',
    topic: 'forms',
    level: 'basic',
    title: L('Form state with useReducer', 'Состояние формы через useReducer'),
    brief: L(
      'Manage a profile form with useReducer. Support changing a named field and resetting the form.',
      'Управляйте формой профиля через useReducer. Поддержите изменение поля по имени и сброс формы.'
    ),
    hint: L(
      'Type the action as a union so the field name and value stay connected.',
      'Типизируйте действие как union, чтобы имя поля и значение были связаны.'
    ),
    solution: `import { useReducer } from 'react';

interface FormState {
  name: string;
  email: string;
}

type FormAction =
  | { type: 'change'; field: keyof FormState; value: string }
  | { type: 'reset' };

const initialState: FormState = { name: '', email: '' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'change':
      return action.field === 'name'
        ? { ...state, name: action.value }
        : { ...state, email: action.value };
    case 'reset':
      return initialState;
  }
}

export function ProfileForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <form>
      <label>
        Name
        <input
          value={state.name}
          onChange={(event) =>
            dispatch({ type: 'change', field: 'name', value: event.target.value })
          }
        />
      </label>

      <label>
        Email
        <input
          value={state.email}
          onChange={(event) =>
            dispatch({ type: 'change', field: 'email', value: event.target.value })
          }
        />
      </label>

      <button type="button" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </form>
  );
}`,
    explanation: L(
      'useReducer keeps every transition in one pure function. The action union documents which changes are possible and protects the field name.',
      'useReducer собирает все переходы в одной чистой функции. Union действий документирует возможные изменения и защищает имя поля.'
    ),
  },
  {
    id: 'react-task-5',
    topic: 'react',
    level: 'basic',
    title: L('Theme context with a safe hook', 'Контекст темы с безопасным хуком'),
    brief: L(
      'Create a ThemeProvider that stores light or dark mode and a useTheme hook that fails clearly outside the provider.',
      'Создайте ThemeProvider, который хранит светлую или тёмную тему, и хук useTheme, который понятно падает вне провайдера.'
    ),
    hint: L(
      'Default the context to null, then throw in the hook when it is missing.',
      'Задайте контексту значение null по умолчанию, затем выбрасывайте ошибку в хуке, если значения нет.'
    ),
    solution: `import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggle: () =>
        setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}`,
    explanation: L(
      'The null default forces every consumer through the hook. useMemo keeps the context object stable until the theme actually changes.',
      'Значение null по умолчанию заставляет всех потребителей использовать хук. useMemo сохраняет объект контекста стабильным, пока тема не изменилась.'
    ),
  },
  {
    id: 'react-task-6',
    topic: 'forms',
    level: 'basic',
    title: L('Controlled form validation', 'Валидация контролируемой формы'),
    brief: L(
      'Build a signup form with controlled email and password inputs, inline errors after submit and accessible error messages.',
      'Сделайте форму регистрации с контролируемыми полями email и password, ошибками после отправки и доступными сообщениями об ошибках.'
    ),
    hint: L(
      'Derive errors from state during render and use role="alert" for messages.',
      'Вычисляйте ошибки из состояния при рендере и используйте role="alert" для сообщений.'
    ),
    solution: `import { useState, type FormEvent } from 'react';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = !email.includes('@') ? 'Enter a valid email address' : '';
  const passwordError =
    password.length < 8 ? 'Use at least 8 characters' : '';
  const isValid = !emailError && !passwordError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    console.log('Submitting', { email, password });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={submitted && Boolean(emailError)}
        />
      </label>
      {submitted && emailError && <p role="alert">{emailError}</p>}

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={submitted && Boolean(passwordError)}
        />
      </label>
      {submitted && passwordError && <p role="alert">{passwordError}</p>}

      <button type="submit">Create account</button>
    </form>
  );
}`,
    explanation: L(
      'Errors are derived from state, so they cannot go stale. The submitted flag delays messages until the user tries to continue.',
      'Ошибки вычисляются из состояния, поэтому не устаревают. Флаг submitted откладывает сообщения до попытки продолжить.'
    ),
  },
  {
    id: 'react-task-7',
    topic: 'hooks',
    level: 'intermediate',
    title: L('Focus management with useRef', 'Управление фокусом через useRef'),
    brief: L(
      'Focus a search input on mount and return focus to it when the form is submitted with an empty value.',
      'Фокусируйте поле поиска при монтировании и возвращайте фокус, если форма отправлена с пустым значением.'
    ),
    hint: L(
      'Use useRef<HTMLInputElement>(null) and call inputRef.current.focus().',
      'Используйте useRef<HTMLInputElement>(null) и вызывайте inputRef.current.focus().'
    ),
    solution: `import { useEffect, useRef, type FormEvent } from 'react';

export function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputRef.current?.value.trim() ?? '';

    if (!value) {
      inputRef.current?.focus();
      return;
    }

    console.log('Searching for ' + value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} name="query" placeholder="Search" />
      <button type="submit">Search</button>
    </form>
  );
}`,
    explanation: L(
      'A ref points at the DOM node without causing renders. The optional chaining handles the moment before the input is mounted.',
      'Ref указывает на DOM-узел, не вызывая рендеров. Опциональная цепочка учитывает момент до монтирования поля.'
    ),
  },
  {
    id: 'react-task-8',
    topic: 'react-perf',
    level: 'intermediate',
    title: L('Memoized list row', 'Мемоизированная строка списка'),
    brief: L(
      'Render a todo list where toggling one item does not re-render every other row.',
      'Отрисуйте список задач так, чтобы переключение одного элемента не перерисовывало остальные строки.'
    ),
    hint: L(
      'Wrap the row in memo and pass a stable callback from useCallback.',
      'Оберните строку в memo и передайте стабильный колбэк из useCallback.'
    ),
    solution: `import { memo, useCallback, useState } from 'react';

interface Item {
  id: number;
  title: string;
  done: boolean;
}

interface RowProps {
  item: Item;
  onToggle: (id: number) => void;
}

const Row = memo(function Row({ item, onToggle }: RowProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
        />
        {item.title}
      </label>
    </li>
  );
});

export function TodoList({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState(initial);

  const toggle = useCallback((id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <Row key={item.id} item={item} onToggle={toggle} />
      ))}
    </ul>
  );
}`,
    explanation: L(
      'memo skips a row when its props are equal. The unchanged item objects and the stable toggle callback let the comparison succeed.',
      'memo пропускает строку, если её пропсы равны. Неизменённые объекты элементов и стабильный колбэк toggle позволяют сравнению сработать.'
    ),
  },
  {
    id: 'react-task-9',
    topic: 'hooks',
    level: 'intermediate',
    title: L('useFetch with abort', 'useFetch с отменой запроса'),
    brief: L(
      'Create a generic useFetch hook that returns data, loading and error, and aborts the request when the url changes or the component unmounts.',
      'Создайте обобщённый хук useFetch, который возвращает data, loading и error и отменяет запрос при смене url или размонтировании.'
    ),
    hint: L(
      'Create an AbortController inside the effect and abort it in the cleanup function.',
      'Создайте AbortController внутри эффекта и отменяйте его в функции очистки.'
    ),
    solution: `import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json() as Promise<T>;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}`,
    explanation: L(
      'The cleanup aborts the previous request before the next effect runs. Ignoring AbortError prevents a cancelled request from showing an error.',
      'Очистка отменяет предыдущий запрос до запуска следующего эффекта. Игнорирование AbortError не даёт отменённому запросу показать ошибку.'
    ),
  },
  {
    id: 'react-task-10',
    topic: 'react',
    level: 'advanced',
    title: L('Error boundary for render failures', 'Error boundary для ошибок рендера'),
    brief: L(
      'Create a class ErrorBoundary that shows a fallback when a child throws during rendering and logs the component stack.',
      'Создайте класс ErrorBoundary, который показывает fallback, если дочерний компонент падает при рендере, и логирует стек компонентов.'
    ),
    hint: L(
      'Use static getDerivedStateFromError and componentDidCatch. Boundaries must be class components.',
      'Используйте static getDerivedStateFromError и componentDidCatch. Boundary обязан быть классовым компонентом.'
    ),
    solution: `import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Rendering failed', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

// Usage:
// <ErrorBoundary fallback={<p>Could not load the page.</p>}>
//   <Dashboard />
// </ErrorBoundary>`,
    explanation: L(
      'getDerivedStateFromError switches to the fallback, while componentDidCatch reports the failure. Event handler and async errors still need try/catch.',
      'getDerivedStateFromError переключает на fallback, а componentDidCatch сообщает об ошибке. Ошибки обработчиков событий и асинхронного кода всё ещё требуют try/catch.'
    ),
  },
  {
    id: 'react-task-11',
    topic: 'react',
    level: 'advanced',
    title: L('Optimistic todo creation', 'Оптимистичное создание задачи'),
    brief: L(
      'Add a todo to the list before the server responds. Replace it with the saved item on success and remove it on failure.',
      'Добавьте задачу в список до ответа сервера. Замените её сохранённым элементом при успехе и удалите при ошибке.'
    ),
    hint: L(
      'Keep a temporary id, then map or filter the list in the success and catch branches.',
      'Сохраните временный id, затем преобразуйте или отфильтруйте список в ветках успеха и ошибки.'
    ),
    solution: `import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
}

export function TodoList({ initial }: { initial: Todo[] }) {
  const [todos, setTodos] = useState(initial);

  async function addTodo(title: string) {
    const temporary: Todo = { id: Date.now(), title };
    setTodos((current) => [...current, temporary]);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error('Save failed');

      const saved = (await response.json()) as Todo;
      setTodos((current) =>
        current.map((todo) => (todo.id === temporary.id ? saved : todo))
      );
    } catch {
      setTodos((current) =>
        current.filter((todo) => todo.id !== temporary.id)
      );
    }
  }

  return (
    <section>
      <button type="button" onClick={() => addTodo('New task')}>
        Add task
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}`,
    explanation: L(
      'The UI updates immediately, then reconciles with the server response. The catch branch rolls the list back so a failed save is not shown as successful.',
      'Интерфейс обновляется сразу, затем сверяется с ответом сервера. Ветка catch откатывает список, чтобы неудачное сохранение не выглядело успешным.'
    ),
  },
  {
    id: 'react-task-12',
    topic: 'react',
    level: 'advanced',
    title: L('Accessible modal dialog', 'Доступный модальный диалог'),
    brief: L(
      'Build a modal with dialog semantics, a labelled title, Escape to close and focus restored to the trigger.',
      'Сделайте модальное окно с семантикой dialog, связанным заголовком, закрытием по Escape и возвратом фокуса на кнопку открытия.'
    ),
    hint: L(
      'Use role="dialog", aria-modal, aria-labelledby and tabIndex={-1} for the initial focus.',
      'Используйте role="dialog", aria-modal, aria-labelledby и tabIndex={-1} для начального фокуса.'
    ),
    solution: `import { useEffect, useId, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const trigger = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{title}</h2>
        {children}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}`,
    explanation: L(
      'The dialog is labelled by its heading and moves focus inside on open. The cleanup restores the previous element, which is essential for keyboard users.',
      'Диалог связан с заголовком и при открытии переносит фокус внутрь. Очистка возвращает фокус предыдущему элементу — это критично для клавиатурных пользователей.'
    ),
  },
  {
    id: 'react-task-13',
    topic: 'react-perf',
    level: 'advanced',
    title: L('Lazy page with Suspense', 'Ленивая страница с Suspense'),
    brief: L(
      'Load a profile page lazily and show a fallback while the chunk downloads.',
      'Загружайте страницу профиля лениво и показывайте fallback, пока скачивается чанк.'
    ),
    hint: L(
      'React.lazy needs a module with a default export. Wrap the element in Suspense.',
      'React.lazy требует модуль с default-экспортом. Оберните элемент в Suspense.'
    ),
    solution: `import { lazy, Suspense } from 'react';

const ProfilePage = lazy(() => import('./ProfilePage'));

export function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <ProfilePage userId={42} />
    </Suspense>
  );
}

// ProfilePage.tsx must have a default export:
// export default function ProfilePage({ userId }: { userId: number }) {
//   return <h1>Profile {userId}</h1>;
// }`,
    explanation: L(
      'lazy splits the page into a separate chunk that is requested on first render. Suspense keeps the rest of the app interactive while the chunk loads.',
      'lazy выносит страницу в отдельный чанк, который запрашивается при первом рендере. Suspense сохраняет остальное приложение интерактивным, пока чанк загружается.'
    ),
  },
  {
    id: 'react-task-14',
    topic: 'react-perf',
    level: 'advanced',
    title: L('Search with useTransition', 'Поиск через useTransition'),
    brief: L(
      'Keep typing responsive while filtering a large user list by marking the list update as a transition.',
      'Сохраняйте отзывчивость ввода при фильтрации большого списка пользователей, помечая обновление списка как transition.'
    ),
    hint: L(
      'Keep the input value urgent and call setQuery inside startTransition.',
      'Обновляйте значение поля срочно, а setQuery вызывайте внутри startTransition.'
    ),
    solution: `import { useState, useTransition } from 'react';

export function UserSearch({ users }: { users: string[] }) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setInput(value);
    startTransition(() => setQuery(value));
  }

  const filtered = users.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <input
        value={input}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search users"
      />
      {isPending && <p>Filtering...</p>}

      <ul>
        {filtered.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </section>
  );
}`,
    explanation: L(
      'The input renders from urgent state, while the expensive list update is interruptible. React can abandon an outdated transition when the next keystroke arrives.',
      'Поле рендерится из срочного состояния, а дорогое обновление списка можно прервать. React может отменить устаревший transition при следующем нажатии.'
    ),
  },
  {
    id: 'react-task-15',
    topic: 'react',
    level: 'advanced',
    title: L('Compound tabs component', 'Составной компонент табов'),
    brief: L(
      'Build Tabs with List, Tab and Panel subcomponents that share the active tab through context and expose correct ARIA roles.',
      'Соберите Tabs с подкомпонентами List, Tab и Panel, которые делят активный таб через контекст и используют корректные ARIA-роли.'
    ),
    hint: L(
      'Create a context for active and setActive, then attach the subcomponents with Object.assign.',
      'Создайте контекст для active и setActive, затем прикрепите подкомпоненты через Object.assign.'
    ),
    solution: `import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react';

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs>');
  }

  return context;
}

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div role="tablist" aria-label="Sections">
      {children}
    </div>
  );
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs();
  const selected = active === value;

  return (
    <button
      type="button"
      role="tab"
      id={baseId + '-tab-' + value}
      aria-selected={selected}
      aria-controls={baseId + '-panel-' + value}
      tabIndex={selected ? 0 : -1}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs();

  if (active !== value) return null;

  return (
    <div
      role="tabpanel"
      id={baseId + '-panel-' + value}
      aria-labelledby={baseId + '-tab-' + value}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab,
  Panel: TabPanel,
});

// Usage:
// <Tabs defaultValue="profile">
//   <Tabs.List>
//     <Tabs.Tab value="profile">Profile</Tabs.Tab>
//     <Tabs.Tab value="settings">Settings</Tabs.Tab>
//   </Tabs.List>
//   <Tabs.Panel value="profile">Profile content</Tabs.Panel>
//   <Tabs.Panel value="settings">Settings content</Tabs.Panel>
// </Tabs>`,
    explanation: L(
      'Context removes prop drilling between Tabs and its children, while Object.assign provides the compound API. Arrow-key navigation can be added on the tablist for the full ARIA pattern.',
      'Контекст убирает передачу пропсов через промежуточные компоненты, а Object.assign даёт составной API. Для полного ARIA-паттерна на tablist можно добавить навигацию стрелками.'
    ),
  },
];
