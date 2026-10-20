import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactRouterTasks: PracticeTask[] = [
  {
    id: 'router-task-4',
    topic: 'router',
    level: 'basic',
    title: L('Keep filters in the URL', 'Хранить фильтры в URL'),
    brief: L(
      'Build a product filter bar with category and sort selects. Read the values from search params and update the URL without dropping the other params.',
      'Сделайте панель фильтров товаров с селектами категории и сортировки. Читайте значения из search params и обновляйте URL, не теряя остальные параметры.'
    ),
    hint: L(
      'Search params are strings. Copy the existing URLSearchParams before changing it, and remove a param when the default value is chosen.',
      'Search params — это строки. Копируйте существующий URLSearchParams перед изменением и удаляйте параметр при выборе значения по умолчанию.'
    ),
    solution: `import { useSearchParams } from 'react-router-dom';

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'newest';

  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'newest') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  }

  return (
    <form>
      <label>
        Category
        <select
          value={category}
          onChange={(event) => update('category', event.target.value)}
        >
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="games">Games</option>
        </select>
      </label>

      <label>
        Sort
        <select
          value={sort}
          onChange={(event) => update('sort', event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price">Cheapest</option>
        </select>
      </label>
    </form>
  );
}`,
    explanation: L(
      'URL search params make filter state shareable, bookmarkable and restorable on reload. Copying the current params preserves filters that this control does not own.',
      'Search params в URL делают состояние фильтров доступным для ссылки, закладки и восстановления после перезагрузки. Копирование текущих параметров сохраняет фильтры, которыми этот контрол не управляет.'
    ),
  },
  {
    id: 'router-task-5',
    topic: 'router',
    level: 'basic',
    title: L('Lazy-load route modules', 'Ленивая загрузка модулей маршрутов'),
    brief: L(
      'Configure a data router where the layout and the reports page are loaded with dynamic import, so they land in separate chunks.',
      'Настройте data router, в котором layout и страница отчётов загружаются через динамический import и попадают в отдельные чанки.'
    ),
    hint: L(
      'The lazy property returns a promise of route properties such as Component or loader.',
      'Свойство lazy возвращает промис с полями маршрута, например Component или loader.'
    ),
    solution: `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Layout } = await import('./Layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import('./pages/Home');
          return { Component: module.default };
        },
      },
      {
        path: 'reports',
        lazy: async () => {
          const module = await import('./pages/Reports');
          return { Component: module.default };
        },
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}`,
    explanation: L(
      'React Router starts the import only when the route is first matched. The initial bundle stays small, and pages that the user never visits are never downloaded.',
      'React Router запускает import только при первом совпадении маршрута. Начальный бандл остаётся маленьким, а страницы, которые пользователь не открывал, не загружаются вовсе.'
    ),
  },
  {
    id: 'router-task-6',
    topic: 'router',
    level: 'basic',
    title: L('Render data from a route loader', 'Отрисовать данные из loader маршрута'),
    brief: L(
      'Load a user by id in a route loader, throw a 404 Response when the API fails, and render the result with useLoaderData.',
      'Загрузите пользователя по id в loader маршрута, выбрасывайте Response со статусом 404 при ошибке API и отрисуйте результат через useLoaderData.'
    ),
    hint: L(
      'A loader receives params and request. Throwing a Response sends the router to the nearest errorElement.',
      'Loader получает params и request. Выброшенный Response переводит роутер к ближайшему errorElement.'
    ),
    solution: `import {
  createBrowserRouter,
  useLoaderData,
} from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

async function userLoader({ params }: { params: { id: string } }) {
  const response = await fetch('/api/users/' + params.id);

  if (!response.ok) {
    throw new Response('User not found', { status: 404 });
  }

  return (await response.json()) as User;
}

function UserPage() {
  const user = useLoaderData() as User;

  return (
    <article>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </article>
  );
}

const router = createBrowserRouter([
  {
    path: 'users/:id',
    element: <UserPage />,
    loader: userLoader,
    errorElement: <RouteError />,
  },
]);`,
    explanation: L(
      'The loader runs before the component renders, so UserPage never handles a loading state or a missing user. The thrown Response is rendered by errorElement.',
      'Loader выполняется до рендера компонента, поэтому UserPage не обрабатывает загрузку и отсутствующего пользователя. Выброшенный Response отрисовывает errorElement.'
    ),
  },
  {
    id: 'router-task-7',
    topic: 'router',
    level: 'intermediate',
    title: L('Handle a form with a route action', 'Обработать форму через action маршрута'),
    brief: L(
      'Create a new-user form with Form and an action. Validate the name, return an error for the UI, and redirect to the users list on success.',
      'Создайте форму нового пользователя через Form и action. Проверяйте имя, возвращайте ошибку для интерфейса и перенаправляйте к списку пользователей при успехе.'
    ),
    hint: L(
      'Read fields with request.formData(). Returning a value makes it available through useActionData; returning redirect() navigates.',
      'Читайте поля через request.formData(). Возвращённое значение доступно через useActionData, а redirect() выполняет переход.'
    ),
    solution: `import {
  Form,
  redirect,
  useActionData,
} from 'react-router-dom';

async function createUserAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();

  if (!name) {
    return { error: 'Name is required' };
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    return { error: 'Could not save the user' };
  }

  return redirect('/users');
}

function NewUserPage() {
  const data = useActionData() as { error?: string } | undefined;

  return (
    <Form method="post">
      <label>
        Name
        <input name="name" />
      </label>

      {data?.error && <p role="alert">{data.error}</p>}

      <button type="submit">Create user</button>
    </Form>
  );
}`,
    explanation: L(
      'The action owns validation and mutation, so the component only renders the result. Form disables the browser navigation and lets the router manage the request lifecycle.',
      'Action отвечает за валидацию и изменение данных, поэтому компонент только отрисовывает результат. Form отключает навигацию браузера и передаёт управление запросом роутеру.'
    ),
  },
  {
    id: 'router-task-8',
    topic: 'router',
    level: 'intermediate',
    title: L('Show a route error boundary', 'Показать границу ошибок маршрута'),
    brief: L(
      'Create an errorElement that distinguishes router responses from unexpected exceptions and shows status and message for both.',
      'Создайте errorElement, который отличает ответы роутера от неожиданных исключений и показывает статус и сообщение для обоих случаев.'
    ),
    hint: L(
      'useRouteError returns unknown. isRouteErrorResponse narrows it to a response with status, statusText and data.',
      'useRouteError возвращает unknown. isRouteErrorResponse сужает тип до ответа со status, statusText и data.'
    ),
    solution: `import {
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{String(error.data)}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </section>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'users/:id', element: <UserPage />, loader: userLoader },
    ],
  },
]);`,
    explanation: L(
      'One errorElement covers loader, action and render failures for its subtree. The type guard separates expected HTTP responses from programming errors so each gets a useful message.',
      'Один errorElement покрывает ошибки loader, action и рендера для своего поддерева. Проверка типа отличает ожидаемые HTTP-ответы от ошибок программирования, чтобы каждая получила полезное сообщение.'
    ),
  },
  {
    id: 'router-task-9',
    topic: 'router',
    level: 'intermediate',
    title: L('Build breadcrumbs with useMatches', 'Построить хлебные крошки через useMatches'),
    brief: L(
      'Render breadcrumbs from the matched route chain. Only routes with a handle.crumb function contribute a crumb, and each crumb receives the route loader data.',
      'Отрисуйте хлебные крошки из цепочки совпавших маршрутов. В крошки попадают только маршруты с функцией handle.crumb, и каждая получает данные loader своего маршрута.'
    ),
    hint: L(
      'useMatches returns matches from the root to the leaf, with id, data and handle for each one.',
      'useMatches возвращает совпадения от корня до листа, с id, data и handle для каждого.'
    ),
    solution: `import { useMatches } from 'react-router-dom';

interface CrumbHandle {
  crumb: (data: unknown) => string;
}

function Breadcrumbs() {
  const matches = useMatches();

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {matches.map((match) => {
          const handle = match.handle as CrumbHandle | undefined;
          if (!handle?.crumb) return null;

          return <li key={match.id}>{handle.crumb(match.data)}</li>;
        })}
      </ol>
    </nav>
  );
}

// Route configuration:
// {
//   path: 'users/:id',
//   loader: userLoader,
//   handle: {
//     crumb: (data: unknown) => (data as { name: string }).name,
//   },
// }`,
    explanation: L(
      'useMatches exposes the active route tree, so the breadcrumb does not need to know the URL structure. Attaching labels to routes keeps navigation and content in sync.',
      'useMatches показывает активное дерево маршрутов, поэтому хлебным крошкам не нужно знать структуру URL. Подписи рядом с маршрутами не дают навигации и контенту расходиться.'
    ),
  },
  {
    id: 'router-task-10',
    topic: 'router',
    level: 'intermediate',
    title: L('Return to the page after login', 'Вернуться на страницу после входа'),
    brief: L(
      'On the login page, read the location that RequireAuth saved in history state and navigate back to it after a successful sign-in. Fall back to the dashboard.',
      'На странице входа прочитайте location, сохранённый RequireAuth в состоянии истории, и перейдите обратно после успешного входа. Если его нет, открывайте dashboard.'
    ),
    hint: L(
      'The saved value is a full location object, so pass it straight to navigate. Use replace so the login page leaves no history entry.',
      'Сохранённое значение — полный объект location, его можно сразу передать в navigate. Используйте replace, чтобы страница входа не осталась в истории.'
    ),
    solution: `import type { FormEvent } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';

interface LoginState {
  from?: Location;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    await login(email, password);

    const state = location.state as LoginState | null;
    navigate(state?.from ?? '/dashboard', { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign in</button>
    </form>
  );
}`,
    explanation: L(
      'The guard stores the whole location, including search and hash, so the user returns to exactly the page they tried to open. replace prevents the back button from bouncing them to the login form again.',
      'Защита сохраняет весь location, включая search и hash, поэтому пользователь возвращается ровно на ту страницу, которую пытался открыть. replace не даёт кнопке назад снова вернуть на форму входа.'
    ),
  },
  {
    id: 'router-task-11',
    topic: 'router',
    level: 'advanced',
    title: L('Share layout state through outlet context', 'Передать состояние layout через outlet context'),
    brief: L(
      'A dashboard layout owns the current user and theme. Pass them to child routes with Outlet context and consume them in a settings page with useOutletContext.',
      'Layout дашборда хранит текущего пользователя и тему. Передайте их дочерним маршрутам через context у Outlet и прочитайте на странице настроек через useOutletContext.'
    ),
    hint: L(
      'Type the context once and pass the same generic to useOutletContext. The object identity can change on every render, which is fine for this use case.',
      'Опишите тип контекста один раз и передайте тот же generic в useOutletContext. Идентичность объекта может меняться на каждом рендере, для этого случая это нормально.'
    ),
    solution: `import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

interface DashboardContext {
  user: { name: string };
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function DashboardLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const user = { name: 'Ann' };

  const context: DashboardContext = {
    user,
    theme,
    toggleTheme: () =>
      setTheme((current) => (current === 'light' ? 'dark' : 'light')),
  };

  return (
    <section data-theme={theme}>
      <header>Signed in as {user.name}</header>
      <Outlet context={context} />
    </section>
  );
}

function SettingsPage() {
  const { user, theme, toggleTheme } =
    useOutletContext<DashboardContext>();

  return (
    <div>
      <p>
        {user.name} uses the {theme} theme.
      </p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}`,
    explanation: L(
      'Outlet context avoids prop drilling through intermediate routes while keeping the shared state owned by the layout. Child pages stay reusable because they only depend on the context shape.',
      'Context у Outlet избавляет от передачи props через промежуточные маршруты и оставляет общее состояние у layout. Дочерние страницы остаются переиспользуемыми, потому что зависят только от формы контекста.'
    ),
  },
  {
    id: 'router-task-12',
    topic: 'router',
    level: 'advanced',
    title: L('Restore scroll position between pages', 'Восстанавливать позицию скролла между страницами'),
    brief: L(
      'Add scroll restoration to a data router. Restore the saved position on back and forward, but treat a different search string as a different page.',
      'Добавьте восстановление скролла в data router. Восстанавливайте позицию при назад и вперёд, но считайте другую строку поиска другой страницей.'
    ),
    hint: L(
      'ScrollRestoration must render inside the data router, usually in the root layout. getKey overrides how locations are grouped.',
      'ScrollRestoration должен рендериться внутри data router, обычно в корневом layout. getKey переопределяет группировку location.'
    ),
    solution: `import { Outlet, ScrollRestoration } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <ScrollRestoration
        getKey={(location) => location.pathname + location.search}
      />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
    ],
  },
]);`,
    explanation: L(
      'The router remembers a scroll offset per history key. Including search in getKey gives filtered result pages their own offset instead of sharing one with the base list.',
      'Роутер запоминает смещение скролла для каждого ключа истории. Включение search в getKey даёт страницам с фильтрами собственное смещение вместо общего со списком без фильтра.'
    ),
  },
  {
    id: 'router-task-13',
    topic: 'router',
    level: 'advanced',
    title: L('Protect a route with a loader', 'Защитить маршрут через loader'),
    brief: L(
      'Guard an account route in its loader. Unauthenticated users must be redirected to login with the original path in a redirectTo query param, and the loader must return the current user.',
      'Защитите маршрут аккаунта в его loader. Неавторизованных перенаправляйте на вход с исходным путём в параметре redirectTo, а loader должен возвращать текущего пользователя.'
    ),
    hint: L(
      'Loaders run before rendering. Throw redirect() instead of returning a Navigate element, and encode the target path.',
      'Loader выполняется до рендера. Выбрасывайте redirect() вместо возврата элемента Navigate и кодируйте целевой путь.'
    ),
    solution: `import { createBrowserRouter, redirect } from 'react-router-dom';
import { store } from './store';

function requireAuthLoader({ request }: { request: Request }) {
  const user = store.getState().auth.user;

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;

    throw redirect('/login?redirectTo=' + encodeURIComponent(redirectTo));
  }

  return user;
}

const router = createBrowserRouter([
  {
    path: '/account',
    element: <AccountPage />,
    loader: requireAuthLoader,
    errorElement: <RouteError />,
  },
]);

// Login page:
// const [params] = useSearchParams();
// const redirectTo = params.get('redirectTo') ?? '/account';
// navigate(redirectTo, { replace: true });`,
    explanation: L(
      'A loader guard blocks the route before any protected UI mounts. Encoding the original path preserves query params, and the login page can send the user straight back after authentication.',
      'Защита в loader блокирует маршрут до монтирования защищённого интерфейса. Кодирование исходного пути сохраняет query params, и страница входа может сразу вернуть пользователя после авторизации.'
    ),
  },
  {
    id: 'router-task-14',
    topic: 'router',
    level: 'advanced',
    title: L('Paginate with loader search params', 'Пагинация через search params в loader'),
    brief: L(
      'Load one page of products in a loader using the page query param. Render previous and next links that change only the search string.',
      'Загружайте одну страницу товаров в loader по параметру page. Отрисуйте ссылки назад и вперёд, которые меняют только строку поиска.'
    ),
    hint: L(
      'Build the request URL from request.url. Relative links such as ?page=2 keep the current pathname.',
      'Стройте URL запроса из request.url. Относительные ссылки вида ?page=2 сохраняют текущий pathname.'
    ),
    solution: `import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router-dom';

interface ProductsPageData {
  items: string[];
  page: number;
  hasNext: boolean;
}

async function productsLoader({
  request,
}: LoaderFunctionArgs): Promise<ProductsPageData> {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));

  const response = await fetch(
    '/api/products?page=' + page + '&limit=10'
  );

  if (!response.ok) {
    throw new Response('Could not load products', { status: 500 });
  }

  return response.json();
}

function ProductsPage() {
  const { items, page, hasNext } =
    useLoaderData() as ProductsPageData;

  return (
    <section>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <nav aria-label="Pagination">
        {page > 1 && <Link to={'?page=' + (page - 1)}>Previous</Link>}
        {hasNext && <Link to={'?page=' + (page + 1)}>Next</Link>}
      </nav>
    </section>
  );
}

const router = createBrowserRouter([
  { path: 'products', element: <ProductsPage />, loader: productsLoader },
]);`,
    explanation: L(
      'Changing the query string reruns the loader and renders the next page without a full reload. Because the page number lives in the URL, the current page survives refresh and can be shared.',
      'Изменение строки запроса перезапускает loader и рендерит следующую страницу без полной перезагрузки. Номер страницы хранится в URL, поэтому текущая страница переживает обновление и её можно передать ссылкой.'
    ),
  },
  {
    id: 'router-task-15',
    topic: 'router',
    level: 'advanced',
    title: L('Show pending UI during navigation', 'Показать ожидание во время навигации'),
    brief: L(
      'A search form submits to a loader. Disable the submit button while the router is submitting or loading, and show which query is being searched.',
      'Форма поиска отправляет запрос в loader. Отключайте кнопку, пока роутер отправляет или загружает данные, и показывайте, по какому запросу идёт поиск.'
    ),
    hint: L(
      'useNavigation exposes state idle, submitting or loading, plus formData and location for the pending navigation.',
      'useNavigation отдаёт состояние idle, submitting или loading, а также formData и location текущей навигации.'
    ),
    solution: `import { Form, useNavigation } from 'react-router-dom';

function SearchForm() {
  const navigation = useNavigation();
  const isBusy = navigation.state !== 'idle';

  const pendingQuery =
    navigation.state === 'loading'
      ? new URLSearchParams(navigation.location.search).get('q')
      : String(navigation.formData?.get('q') ?? '');

  return (
    <Form method="get" action="/search">
      <input name="q" placeholder="Search products" />
      <button type="submit" disabled={isBusy}>
        {isBusy ? 'Searching...' : 'Search'}
      </button>

      {isBusy && <p aria-live="polite">Looking for {pendingQuery}</p>}
    </Form>
  );
}`,
    explanation: L(
      'useNavigation reports the router request that is in flight, so the form can react before the new route renders. aria-live announces the pending query to screen reader users.',
      'useNavigation сообщает о выполняющемся запросе роутера, поэтому форма реагирует до рендера нового маршрута. aria-live объявляет текущий запрос пользователям скринридеров.'
    ),
  },
];
