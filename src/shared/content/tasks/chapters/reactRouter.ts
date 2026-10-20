import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const reactRouterChapterTasks: PracticeTask[] = [
  {
    id: 'ch-router-ch1-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch1',
    level: 'basic',
    title: L('A nested route tree with a layout route', 'Вложенное дерево маршрутов с layout-маршрутом'),
    brief: L(
      'Build a route tree where /app renders a layout with a navigation and an Outlet, /app itself renders an index route and /app/users/:id renders a user page. The child paths must be relative so that they stay under the parent.',
      'Соберите дерево маршрутов, где /app рендерит layout с навигацией и Outlet, сам /app рендерит index-маршрут, а /app/users/:id — страницу пользователя. Пути потомков должны быть относительными, чтобы остаться внутри родителя.'
    ),
    hint: L(
      'A layout route has a path and an element with children, and the child that matches the parent path exactly carries index: true. The layout renders the matched child through an Outlet.',
      'Layout-маршрут имеет путь, элемент и потомков, а потомок, совпадающий с путём родителя, несёт index: true. Layout рендерит совпавшего потомка через Outlet.'
    ),
    solution: `import { createBrowserRouter, Link, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="shell">
      <nav><Link to="/app">Home</Link></nav>
      <main><Outlet /></main>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <p>Dashboard</p> },
      { path: 'users/:id', element: <p>User page</p> },
    ],
  },
]);`,
    explanation: L(
      'The layout route adds a prefix without a path of its own, the index route makes the parent path reachable, and the Outlet is the slot where the matched child appears. The task checks that the URL tree and the interface tree stay in sync.',
      'Layout-маршрут добавляет префикс без собственного пути, index-маршрут делает путь родителя достижимым, а Outlet — это место, где появляется совпавший потомок. Задача проверяет, что дерево URL и дерево интерфейса идут вместе.'
    ),
  },
  {
    id: 'ch-router-ch2-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch2',
    level: 'basic',
    title: L('Filters that live in the query string', 'Фильтры, которые живут в строке запроса'),
    brief: L(
      'Write a helper that reads the page, the query and the sort order from the search parameters, and a component that uses it. Changing the sort must reset the page to one and replace the current history entry instead of pushing a new one.',
      'Напишите хелпер, который читает номер страницы, поисковый запрос и порядок сортировки из параметров, и компонент, который его использует. Смена сортировки должна сбрасывать страницу на первую и заменять текущую запись истории, а не добавлять новую.'
    ),
    hint: L(
      'useSearchParams returns the parameters and the setter. The setter accepts a callback that receives the current parameters and returns the new ones.',
      'useSearchParams возвращает параметры и сеттер. Сеттер принимает колбэк, который получает текущие параметры и возвращает новые.'
    ),
    solution: `import { useSearchParams } from 'react-router-dom';

export function readFilters(params: URLSearchParams) {
  return {
    page: Math.max(1, Number(params.get('page') ?? '1')),
    query: params.get('q') ?? '',
    sort: params.get('sort') ?? 'createdAt',
  };
}
export function UsersTable() {
  const [params, setParams] = useSearchParams();
  const filters = readFilters(params);
  function changeSort(sort: string) {
    // a new sort starts from the first page and replaces the history entry
    setParams((current) => {
      current.set('sort', sort);
      current.set('page', '1');
      return current;
    }, { replace: true });
  }
  return <button onClick={() => changeSort('name')}>{filters.sort}</button>;
}`,
    explanation: L(
      'The query string describes the state of the view, so the screen can be reproduced from the URL. The helper is the only place that parses the parameters, and both the loader and the component use it.',
      'Строка запроса описывает состояние вида, поэтому экран воспроизводится по URL. Хелпер — единственное место, где разбираются параметры, и им пользуются и загрузчик, и компонент.'
    ),
  },
  {
    id: 'ch-router-ch3-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch3',
    level: 'basic',
    title: L('A loader with an error boundary', 'Загрузчик с границей ошибки'),
    brief: L(
      'Create a route that loads a user by id in the loader and renders the result with useLoaderData. When the request fails, the loader must throw a Response with status 404 and the route must show the status in an errorElement that checks isRouteErrorResponse first.',
      'Создайте маршрут, который загружает пользователя по id в загрузчике и рендерит результат через useLoaderData. Если запрос не удался, загрузчик должен бросить Response со статусом 404, а маршрут — показать статус в errorElement, который сначала проверяет isRouteErrorResponse.'
    ),
    hint: L(
      'A thrown Response renders the nearest errorElement, and useRouteError returns the thrown value there. A thrown Response is not an Error, so check the type before reading it.',
      'Брошенный Response рендерит ближайший errorElement, а useRouteError возвращает брошенное значение. Response не является Error, поэтому сначала проверьте тип.'
    ),
    solution: `import { createBrowserRouter, isRouteErrorResponse, useLoaderData, useRouteError } from 'react-router-dom';
export const router = createBrowserRouter([
  {
    path: '/users/:id',
    loader: async ({ params }) => {
      const response = await fetch('/api/users/' + params.id);
      if (!response.ok) throw new Response('User not found', { status: 404 });
      return { user: await response.json() };
    },
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
]);
function UserPage() {
  const { user } = useLoaderData();
  return <h1>{user.name}</h1>;
}
function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) return <p role="alert">{error.status}</p>;
  return <p role="alert">Something went wrong</p>;
}`,
    explanation: L(
      'The loader runs before the route renders, so the data is ready when the component appears. The boundary sits on the route itself, so a broken user page does not take the rest of the application down.',
      'Загрузчик выполняется до рендера маршрута, поэтому данные готовы, когда появляется компонент. Граница стоит на самом маршруте, поэтому сломанная страница пользователя не роняет всё приложение.'
    ),
  },
  {
    id: 'ch-router-ch4-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch4',
    level: 'intermediate',
    title: L('Refusing the request in the loader', 'Отказ в загрузчике'),
    brief: L(
      'Write a requireUser helper that reads the session from the request and throws a 401 Response when there is no user. Use it in the loader of a billing route and answer 403 when the user lacks the billing:read permission. The check must run before the data is read.',
      'Напишите хелпер requireUser, который читает сессию из запроса и бросает Response со статусом 401, если пользователя нет. Используйте его в загрузчике маршрута биллинга и отвечайте 403, когда у пользователя нет права billing:read. Проверка должна выполняться до чтения данных.'
    ),
    hint: L(
      'A loader receives the request, and the request carries the cookies. The status codes differ: 401 means an unknown identity, 403 means a known identity without the rights.',
      'Загрузчик получает request, а request несёт cookies. Статусы различаются: 401 — личность неизвестна, 403 — личность известна, но прав нет.'
    ),
    solution: `import { createBrowserRouter } from 'react-router-dom';

async function requireUser(request: Request) {
  const user = await readSession(request.headers.get('Cookie'));
  if (!user) throw new Response('Unauthorized', { status: 401 });
  return user;
}

export const router = createBrowserRouter([
  {
    path: '/billing',
    loader: async ({ request }) => {
      // the rule is enforced here, before the private data is read
      const user = await requireUser(request);
      if (!user.permissions.includes('billing:read')) {
        throw new Response('Forbidden', { status: 403 });
      }
      return { invoices: await listInvoices(user.id) };
    },
    element: <Billing />,
  },
]);`,
    explanation: L(
      'The client guard is a user interface decision, while the loader is where the rule is enforced before any data is read. Sharing one requireUser helper keeps the status codes consistent across the routes.',
      'Клиентский guard — решение интерфейса, а загрузчик — место, где правило применяется до чтения данных. Общий хелпер requireUser держит статусы одинаковыми во всех маршрутах.'
    ),
  },
  {
    id: 'ch-router-ch5-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch5',
    level: 'intermediate',
    title: L('Splitting a route into its own chunk', 'Разделение маршрута на отдельный чанк'),
    brief: L(
      'Split the reports route with the lazy property of the route object, so that its loader and its component are loaded on demand. A component inside an element that uses React.lazy must sit under its own Suspense boundary with a fallback.',
      'Разделите маршрут reports через свойство lazy объекта маршрута, чтобы его загрузчик и компонент загружались по требованию. Компонент внутри элемента, использующий React.lazy, должен находиться под собственной границей Suspense с запасным экраном.'
    ),
    hint: L(
      'The lazy function may return loader, Component and ErrorBoundary. React.lazy inside an element always needs a Suspense boundary around it, and the boundary belongs as low as possible.',
      'Функция lazy может вернуть loader, Component и ErrorBoundary. React.lazy внутри элемента всегда требует границы Suspense вокруг себя, и граница должна быть как можно ниже.'
    ),
    solution: `import { lazy } from 'react';
import { createBrowserRouter, Suspense } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/reports',
    // the loader and the component of the route arrive on demand
    lazy: async () => {
      const { loader, Component } = await import('./routes/reports');
      return { loader, Component };
    },
    element: <ReportsPage />,
  },
]);
const Charts = lazy(() => import('./routes/charts'));
function ReportsPage() {
  return (
    <Suspense fallback={<p>Loading charts...</p>}>
      <Charts />
    </Suspense>
  );
}`,
    explanation: L(
      'The router splits the route implementation while the path stays in the first bundle, so the matching stays synchronous. The Suspense boundary sits around the lazy component only, so the shell of the page does not blink.',
      'Роутер делит реализацию маршрута, а путь остаётся в первом бандле, поэтому сопоставление остаётся синхронным. Граница Suspense стоит только вокруг ленивого компонента, так что оболочка страницы не мигает.'
    ),
  },
  {
    id: 'ch-router-ch6-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch6',
    level: 'intermediate',
    title: L('Deciding when the loaders revalidate', 'Решение о том, когда перезагружать данные'),
    brief: L(
      'Add a shouldRevalidate to the stats route: a write must refresh the data, any other navigation must keep the default behaviour. The page reads its data with useLoaderData and offers a refresh button that calls useRevalidator without navigating.',
      'Добавьте shouldRevalidate к маршруту stats: запись должна обновлять данные, любая другая навигация сохраняет поведение по умолчанию. Страница читает данные через useLoaderData и предлагает кнопку обновления, которая вызывает useRevalidator без навигации.'
    ),
    hint: L(
      'shouldRevalidate receives the URLs, the form method, the action result and the default decision. useRevalidator returns a state and a revalidate function.',
      'shouldRevalidate получает URL, метод формы, результат действия и решение по умолчанию. useRevalidator возвращает состояние и функцию revalidate.'
    ),
    solution: `import { createBrowserRouter, useLoaderData, useRevalidator } from 'react-router-dom';
export const router = createBrowserRouter([
  {
    path: '/stats',
    loader: ({ params }) => loadStats(params.range),
    shouldRevalidate: ({ formMethod, defaultShouldRevalidate }) => {
      // a write refreshes the data, a plain navigation keeps the default
      if (formMethod && formMethod !== 'GET') return true;
      return defaultShouldRevalidate;
    },
    element: <StatsPage />,
  },
]);
function StatsPage() {
  const stats = useLoaderData();
  const revalidator = useRevalidator();
  return (
    <button type="button" onClick={() => revalidator.revalidate()} disabled={revalidator.state !== 'idle'}>
      {stats.total} (refresh)
    </button>
  );
}`,
    explanation: L(
      'The loader cache is keyed by the route, and every revalidation is a network request, so the route that owns the data answers the question about it. useRevalidator refreshes the data in place, without a navigation.',
      'Кэш загрузчиков привязан к маршруту, а каждая ревалидация — это сетевой запрос, поэтому вопрос об обновлении решает маршрут, который владеет данными. useRevalidator обновляет данные на месте, без навигации.'
    ),
  },
  {
    id: 'ch-router-ch7-1',
    moduleId: 'react-router',
    topic: 'router',
    chapterId: 'router-ch7',
    level: 'intermediate',
    title: L('Testing a route tree with a memory router', 'Тестирование дерева маршрутов через memory router'),
    brief: L(
      'Write a test that creates a memory router with the initial entry /events/7, renders it and checks that the loader ran once with the id from the URL. The loaded data must be read from the loaderData of the router state.',
      'Напишите тест, который создаёт memory router с начальной записью /events/7, рендерит его и проверяет, что загрузчик отработал один раз с id из URL. Загруженные данные нужно читать из loaderData состояния роутера.'
    ),
    hint: L(
      'createMemoryRouter takes the routes and the initialEntries. The router keeps the loaded data per route id in router.state.loaderData.',
      'createMemoryRouter принимает маршруты и initialEntries. Роутер хранит загруженные данные по id маршрута в router.state.loaderData.'
    ),
    solution: `import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';

const calls: string[] = [];
const loader = ({ params }: { params: { id: string } }) => {
  calls.push(params.id);
  return { id: params.id };
};
const routes = [{ id: 'event', path: '/events/:id', loader, element: <EventPage /> }];

export async function checkLoader() {
  const router = createMemoryRouter(routes, { initialEntries: ['/events/7'] });
  render(<RouterProvider router={router} />);
  await waitFor(() => expect(calls).toHaveLength(1));
  expect(calls[0]).toBe('7');
  expect(router.state.loaderData.event).toEqual({ id: '7' });
}`,
    explanation: L(
      'A memory router keeps the history in memory, so the test controls where it starts and never touches the browser. Asserting on the number of calls and on the loaded data proves the wiring of the route, not only the logic of the loader.',
      'Memory router держит историю в памяти, поэтому тест сам задаёт стартовую точку и не трогает браузер. Проверка числа вызовов и загруженных данных доказывает связность маршрута, а не только логику загрузчика.'
    ),
  },
];
