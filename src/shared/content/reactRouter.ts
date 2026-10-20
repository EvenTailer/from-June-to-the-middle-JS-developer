import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerModule: Module = {
  id: 'react-router',
  title: L('React Router', 'React Router'),
  description: L('Routing, navigation, data loading, nested routes.', 'Маршрутизация, навигация, загрузка данных, вложенные маршруты.'),
  lessons: [
    { id: 'router-001', title: L('React Router basics', 'Основы React Router'), question: L('What is React Router?', 'Что такое React Router?'), answer: L('React Router is a declarative routing library for React. It synchronizes UI with URL, enabling navigation without full page reloads.', 'React Router — декларативная библиотека маршрутизации для React. Синхронизирует UI с URL, позволяя навигацию без полной перезагрузки страницы.'), code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';` },
    { id: 'router-002', title: L('BrowserRouter', 'BrowserRouter'), question: L('What does BrowserRouter do?', 'Что делает BrowserRouter?'), answer: L('BrowserRouter uses HTML5 history API (pushState, replaceState, popstate) to keep UI in sync with URL. Requires server configuration to serve index.html for all routes.', 'BrowserRouter использует HTML5 history API (pushState, replaceState, popstate) для синхронизации UI с URL. Требует настройки сервера для отдачи index.html на все маршруты.'), code: `import { BrowserRouter } from 'react-router-dom';\n<BrowserRouter><App /></BrowserRouter>` },
    { id: 'router-003', title: L('HashRouter', 'HashRouter'), question: L('When to use HashRouter?', 'Когда использовать HashRouter?'), answer: L('HashRouter uses URL hash (#/path) for routing. Works without server configuration. Suitable for static hosting, legacy browsers, or when server rewrites are impossible.', 'HashRouter использует хэш URL (#/path) для маршрутизации. Работает без настройки сервера. Подходит для статического хостинга, legacy-браузеров или когда невозможны перезаписи сервера.'), code: `import { HashRouter } from 'react-router-dom';\n<HashRouter><App /></HashRouter>` },
    { id: 'router-004', title: L('MemoryRouter', 'MemoryRouter'), question: L('What is MemoryRouter used for?', 'Для чего используется MemoryRouter?'), answer: L('MemoryRouter keeps history in memory (not URL). Used in tests, React Native, Electron, and server-side rendering where URL bar is not accessible.', 'MemoryRouter хранит историю в памяти (не в URL). Используется в тестах, React Native, Electron и серверном рендеринге, где недостаден доступ к адресной строке.'), code: `import { MemoryRouter } from 'react-router-dom';\n<MemoryRouter initialEntries={['/home']}><App /></MemoryRouter>` },
    { id: 'router-005', title: L('Routes', 'Routes'), question: L('What is Routes component?', 'Что такой компонент Routes?'), answer: L('Routes is a container that matches child Route components against current URL. Only one Route renders (first match in v6+). Replaces Switch from v5.', 'Routes — контейнер, который сопоставляет дочерние Route с текущим URL. Рендерится только один Route (первый совпадение в v6+). Заменяет Switch из v5.'), code: `<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n</Routes>` },
    { id: 'router-006', title: L('Route', 'Route'), question: L('How does Route work?', 'Как работает Route?'), answer: L('Route declares a path and the element to render when path matches URL. Path can be static, dynamic, or catch-all. element prop takes a React element (not component reference).', 'Route объявляет путь и элемент для рендера при совпадении с URL. Путь может быть статическим, динамическим или catch-all. element принимает React-элемент (не ссылку на компонент).'), code: `<Route path="/users/:id" element={<User />} />` },
    { id: 'router-007', title: L('Link', 'Link'), question: L('What is Link and how does it differ from anchor?', 'Что такое Link и чем отличается от anchor?'), answer: L('Link renders an anchor but prevents default full-page navigation. Uses history API for client-side routing. Accepts to (string or object), replace, state props.', 'Link рендерит anchor, но предотвращает полную перезагрузку. Использует history API для клиентской маршрутизации. Принимает to (строка или объект), replace, state.'), code: `import { Link } from 'react-router-dom';\n<Link to="/about">About</Link>` },
    { id: 'router-008', title: L('NavLink', 'NavLink'), question: L('NavLink vs Link: what is the difference?', 'NavLink vs Link: в чём разница?'), answer: L('NavLink is a Link that knows if it is active. Adds aria-current="page" and className/style based on active state. Useful for styling navigation menus.', 'NavLink — это Link, который знает, активен ли он. Добавляет aria-current="page" и className/style на основе активного состояния. Полезен для стилизации навигационных меню.'), code: `<NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>` },
    { id: 'router-009', title: L('Navigate', 'Navigate'), question: L('What does Navigate component do?', 'Что делает компонент Navigate?'), answer: L('Navigate redirects to another route when rendered. Replaces current history entry (or appends with replace={false}). Used for auth guards and conditional redirects.', 'Navigate перенаправляет на другой маршрут при рендере. Заменяет текущую запись истории (или добавляет с replace={false}). Используется для гардов авторизации и условных редиректов.'), code: `<Navigate to="/login" replace state={{ from: location }} />` },
    { id: 'router-010', title: L('Outlet', 'Outlet'), question: L('What is Outlet?', 'Что такое Outlet?'), answer: L('Outlet renders the matched child route element inside a parent route. Enables nested routes. Parent provides layout, Outlet renders children. Context available via useOutletContext.', 'Outlet рендерит сопоставленный дочерний маршрут внутри родительского. Позволяет вложенные маршруты. Родитель даёт layout, Outlet рендерит детей. Контекст доступен через useOutletContext.'), code: `function Layout() {\n  return <div><nav>...</nav><Outlet /></div>;\n}` },
    { id: 'router-011', title: L('useNavigate', 'useNavigate'), question: L('How does useNavigate work?', 'Как работает useNavigate?'), answer: L('useNavigate returns a function to programmatically navigate. Accepts delta (number) for history traversal or path string. Supports replace and state options.', 'useNavigate возвращает функцию для программной навигации. Принимает delta (число) для обхода истории или путь-строку. Поддерживает replace и state.'), code: `const navigate = useNavigate();\nnavigate('/home');\nnavigate(-1); // go back\nnavigate('/edit', { replace: true, state: { id } });` },
    { id: 'router-012', title: L('useParams', 'useParams'), question: L('How to access URL parameters?', 'Как получить доступ к параметрам URL?'), answer: L('useParams returns an object of dynamic segment values from current route. Keys are parameter names defined in path pattern. Values are strings.', 'useParams возвращает объект значений динамических сегментов текущего маршрута. Ключи — имена параметров из шаблона пути. Значения — строки.'), code: `const { id } = useParams();\n// URL /users/42 → id = '42'` },
    { id: 'router-013', title: L('useLocation', 'useLocation'), question: L('What does useLocation return?', 'Что возвращает useLocation?'), answer: L('useLocation returns current location object with pathname, search, hash, state, and key. State is set via navigation (Link/navigate). Key is unique per navigation.', 'useLocation возвращает объект текущего местоположения с pathname, search, hash, state и key. State задаётся при навигации (Link/navigate). Key уникален для каждой навигации.'), code: `const { pathname, search, hash, state, key } = useLocation();` },
    { id: 'router-014', title: L('useSearchParams', 'useSearchParams'), question: L('How does useSearchParams work?', 'Как работает useSearchParams?'), answer: L('useSearchParams returns [searchParams, setSearchParams]. searchParams is URLSearchParams instance. setSearchParams updates query string without full navigation (replaces by default).', 'useSearchParams возвращает [searchParams, setSearchParams]. searchParams — экземпляр URLSearchParams. setSearchParams обновляет query-строку без полной навигации (заменяет по умолчанию).'), code: `const [searchParams, setSearchParams] = useSearchParams();\nconst q = searchParams.get('q');\nsetSearchParams({ q: 'new' });` },
    { id: 'router-015', title: L('useMatch', 'useMatch'), question: L('What is useMatch used for?', 'Для чего используется useMatch?'), answer: L('useMatch returns match data if current location matches given pattern. Useful for highlighting active routes outside NavLink. Returns null if no match.', 'useMatch возвращает данные совпадения, если текущее местоположение соответствует шаблону. Полезен для подсветки активных маршрутов вне NavLink. Возвращает null при отсутствии совпадения.'), code: `const match = useMatch('/users/:id');\nif (match) console.log('Active:', match.params.id);` },
    { id: 'router-016', title: L('useOutletContext', 'useOutletContext'), question: L('How to pass data from layout to nested routes?', 'Как передать данные из layout во вложенные маршруты?'), answer: L('Outlet accepts context prop. useOutletContext retrieves it in child routes. Useful for passing auth state, config, or shared data from layout to nested content.', 'Outlet принимает проп context. useOutletContext извлекает его в дочерних маршрутах. Полезно для передачи состояния авторизации, конфигурации или общих данных из layout во вложенное содержимое.'), code: `<Outlet context={{ user }} />\n// In child:\nconst { user } = useOutletContext();` },
    { id: 'router-017', title: L('useResolvedPath', 'useResolvedPath'), question: L('What does useResolvedPath do?', 'Что делает useResolvedPath?'), answer: L('useResolvedPath resolves a to value against current location. Returns absolute pathname. Useful for computing canonical URLs or comparing paths programmatically.', 'useResolvedPath разрешает значение to относительно текущего местоположения. Возвращает абсолютный pathname. Полезно для вычисления канонических URL или сравнения путей программно.'), code: `const resolved = useResolvedPath('../profile');\n// /users/42 → /users/profile` },
    { id: 'router-018', title: L('useHref', 'useHref'), question: L('When to use useHref?', 'Когда использовать useHref?'), answer: L('useHref computes the full href for a to value, including basename. Used when you need the actual URL (e.g., for sharing, meta tags, or custom link components).', 'useHref вычисляет полный href для значения to, включая basename. Используется, когда нужен реальный URL (например, для шаринга, мета-тегов или кастомных компонентов ссылок).'), code: `const href = useHref('/about');\n// /app/about if basename is /app` },
    { id: 'router-019', title: L('useInRouterContext', 'useInRouterContext'), question: L('What does useInRouterContext check?', 'Что проверяет useInRouterContext?'), answer: L('useInRouterContext returns true if component is rendered inside a Router context. Useful for components that can be used both inside and outside routing (e.g., reusable UI libraries).', 'useInRouterContext возвращает true, если компонент рендерится внутри Router-контекста. Полезно для компонентов, которые могут использоваться внутри и вне маршрутизации (например, UI-библиотеки).'), code: `const inRouter = useInRouterContext();\nif (!inRouter) return <a href={to}>{children}</a>;\nreturn <Link to={to}>{children}</Link>;` },
    { id: 'router-020', title: L('useLinkClickHandler', 'useLinkClickHandler'), question: L('What is useLinkClickHandler?', 'Что такое useLinkClickHandler?'), answer: L('useLinkClickHandler creates a click handler that navigates like Link. Used to build custom link components (buttons, menu items) that behave like links with proper event handling.', 'useLinkClickHandler создаёт обработчик клика, который навигирует как Link. Используется для построения кастомных компонентов ссылок (кнопки, пункты меню), которые ведут себя как ссылки с правильной обработкой событий.'), code: `const handleClick = useLinkClickHandler('/about');\n<button onClick={handleClick}>About</button>` },
    { id: 'router-021', title: L('Nested routes', 'Вложенные маршруты'), question: L('How do nested routes work?', 'Как работают вложенные маршруты?'), answer: L('Nested routes are Route components inside other Route elements. Parent renders layout with Outlet. Child renders inside Outlet. Path is relative to parent path.', 'Вложенные маршруты — Route внутри элементов других Route. Родитель рендерит layout с Outlet. Ребёнок рендерится внутри Outlet. Путь относителен пути родителя.'), code: `<Route path="/users" element={<UsersLayout />}>\n  <Route path=":id" element={<User />} />\n</Route>` },
    { id: 'router-022', title: L('Index routes', 'Index-маршруты'), question: L('What is an index route?', 'Что такой index-маршрут?'), answer: L('Index route renders when parent path matches exactly (no trailing segments). Uses index prop instead of path. Replaces parent Outlet when parent path is exact match.', 'Index-маршрут рендерится, когда путь родителя совпадает точно (без конечных сегментов). Использует проп index вместо path. Заменяет Outlet родителя при точном совпадении пути родителя.'), code: `<Route path="/users" element={<UsersLayout />}>\n  <Route index element={<UserList />} />\n  <Route path=":id" element={<User />} />\n</Route>` },
    { id: 'router-023', title: L('Layout routes', 'Layout-маршруты'), question: L('What are layout routes?', 'Что такое layout-маршруты?'), answer: L('Layout routes are routes with element but no path. Wrap children with shared UI (nav, sidebar). Element must contain Outlet. Can be nested for hierarchical layouts.', 'Layout-маршруты — маршруты с element, но без path. Оборачивают детей в общий UI (навигация, сайдбар). Element должен содержать Outlet. Могут быть вложенными для иерархических layout.'), code: `<Route element={<DashboardLayout />}>\n  <Route path="dashboard" element={<Dashboard />} />\n  <Route path="settings" element={<Settings />} />\n</Route>` },
    { id: 'router-024', title: L('Pathless layout routes', 'Pathless layout-маршруты'), question: L('What are pathless layout routes?', 'Что такое pathless layout-маршруты?'), answer: L('Pathless routes have no path attribute. Used for layouts that apply regardless of URL, or for error boundaries wrapping children. Element provides UI without consuming URL segment.', 'Pathless-маршруты не имеют атрибута path. Используются для layout, применяемых независимо от URL, или для границ ошибок, оборачивающих детей. Element предоставляет UI без потребления сегмента URL.'), code: `<Route element={<ErrorBoundary />}>\n  <Route path="*" element={<NotFound />} />\n</Route>` },
    { id: 'router-025', title: L('Dynamic segments', 'Динамические сегменты'), question: L('How do dynamic segments work?', 'Как работают динамические сегменты?'), answer: L('Dynamic segments start with colon (:id) in path. Captured value available via useParams. Multiple segments allowed. Values are always strings (parse if needed).', 'Динамические сегменты начинаются с двоеточия (:id) в пути. Значение доступно через useParams. Допускаются множественные сегменты. Значения всегда строки (парсите при необходимости).'), code: `<Route path="/users/:userId/posts/:postId" element={<Post />} />` },
    { id: 'router-026', title: L('Catch-all routes', 'Catch-all маршруты'), question: L('What are catch-all routes?', 'Что такое catch-all маршруты?'), answer: L('Catch-all routes use * (or ...slug) to match any remaining path segments. Params contain splat value after prefix. Used for 404 pages, catch-all redirects, or deep routing.', 'Catch-all маршруты используют * (или ...slug) для совпадения с оставшимися сегментами пути. Параметры содержат значение splat после префикса. Используются для страниц 404, catch-all редиректов или глубокой маршрутизации.'), code: `<Route path="*" element={<NotFound />} />\n<Route path="/docs/*" element={<Docs />} />` },
    { id: 'router-027', title: L('Optional parameters', 'Необязательные параметры'), question: L('How to make route parameters optional?', 'Как сделать параметры маршрута необязательными?'), answer: L('Append ? to parameter name: /search/:query?. Parameter is undefined when absent. Can be combined with other segments.', 'Добавьте ? к имени параметра: /search/:query?. Параметр undefined при отсутствии. Можно комбинировать с другими сегментами.'), code: `<Route path="/search/:query?" element={<Search />} />` },
    { id: 'router-028', title: L('Splat routes', 'Splat-маршруты'), question: L('What are splat routes?', 'Что такое splat-маршруты?'), answer: L('Splat routes use * to capture all remaining segments after matched prefix. useParams returns key "*" with remaining path. Different from catch-all which matches everything.', 'Splat-маршруты используют * для захвата всех оставшихся сегментов после сопоставленного префикса. useParams возвращает ключ "*" с оставшимся путём. Отличаются от catch-all, которые всё сопоставляют.'), code: `<Route path="/files/*" element={<FileViewer />} />` },
    { id: 'router-029', title: L('Route precedence', 'Приоритет маршрутов'), question: L('How is route precedence determined?', 'Как определяется приоритет маршрутов?'), answer: L('v6+ uses ranking algorithm, not order. Static segments rank higher than dynamic. More segments rank higher. Splat ranks lowest. Order in Routes does not matter (unlike v5 Switch).', 'v6+ использует алгоритм ранжирования, а не порядок. Статические сегменты ранжируются выше динамических. Больше сегментов — выше ранг. Splat ранжируется ниже всех. Порядок в Routes не имеет значения (в отличие от Switch в v5).'), code: `//  /users/new ranks higher than /users/:id` },
    { id: 'router-030', title: L('Relative routes', 'Относительные маршруты'), question: L('How do relative routes work?', 'Как работают относительные маршруты?'), answer: L('Paths without leading / are relative to parent route. Relative navigation in navigate() and Link to uses current route context. "../" goes up one level.', 'Пути без ведущего / относятся к родительскому маршруту. Относительная навигация в navigate() и Link to использует контекст текущего маршрута. "../" поднимается на уровень вверх.'), code: `<Route path="/users" element={<Users />}>\n  <Route path=":id" element={<User />} /> {/* /users/:id */}\n</Route>` },
    { id: 'router-031', title: L('Absolute routes', 'Абсолютные маршруты'), question: L('What are absolute routes?', 'Что такое абсолютные маршруты?'), answer: L('Paths with leading / are absolute from root, ignoring parent route context. navigate("/home") always goes to /home regardless of current route. Link to="/home" is absolute.', 'Пути с ведущим / абсолютны от корня, игнорируя контекст родительского маршрута. navigate("/home") всегда ведёт на /home независимо от текущего маршрута. Link to="/home" абсолютен.'), code: `// From /users/42, navigate("/home") goes to /home` },
    { id: 'router-032', title: L('Parent routes', 'Родительские маршруты'), question: L('What are parent routes?', 'Что такое родительские маршруты?'), answer: L('Parent routes contain child routes in their element. Define path prefix. Render layout with Outlet. Can have index route. Children inherit parent path prefix.', 'Родительские маршруты содержат дочерние маршруты в своём element. Определяют префикс пути. Рендерят layout с Outlet. Могут иметь index-маршрут. Дети наследуют префикс пути родителя.'), code: `<Route path="/app" element={<AppLayout />}>\n  <Route index element={<Dashboard />} />\n  <Route path="settings" element={<Settings />} />\n</Route>` },
    { id: 'router-033', title: L('Descendant routes', 'Descendant-маршруты'), question: L('What are descendant routes?', 'Что такое descendant-маршруты?'), answer: L('Descendant routes are Routes nested inside Route elements (not just nested Route declarations). Enable route-based code splitting and layout composition. Render within parent Outlet.', 'Descendant-маршруты — Routes, вложенные внутрь элементов Route (не просто вложенные объявления Route). Позволяют разделение кода по маршрутам и композицию layout. Рендерятся внутри Outlet родителя.'), code: `<Route path="*" element={<RequireAuth />}>\n  <Routes>\n    <Route path="/admin" element={<Admin />} />\n  </Routes>\n</Route>` },
    { id: 'router-034', title: L('Data routers', 'Data-маршруты'), question: L('What are data routers?', 'Что такое data-маршруты?'), answer: L('Data routers (v6.4+) use createBrowserRouter and RouterProvider. Enable loaders, actions, and revalidation before render. Replace useRoutes with declarative route objects.', 'Data-маршруты (v6.4+) используют createBrowserRouter и RouterProvider. Позволяют loaders, actions и ревалидацию до рендера. Заменяют useRoutes на декларативные объекты маршрутов.'), code: `const router = createBrowserRouter(routes);\n<RouterProvider router={router} />;` },
    { id: 'router-035', title: L('createBrowserRouter', 'createBrowserRouter'), question: L('How to create a browser router?', 'Как создать browser-маршрутизатор?'), answer: L('createBrowserRouter takes route config array and options (basename, hydrationData). Returns router instance for RouterProvider. Supports loaders, actions, and future flags.', 'createBrowserRouter принимает массив конфигурации маршрутов и опции (basename, hydrationData). Возвращает экземпляр маршрутизатора для RouterProvider. Поддерживает loaders, actions и future-флаги.'), code: `import { createBrowserRouter } from 'react-router-dom';\nconst router = createBrowserRouter(routeConfig);` },
    { id: 'router-036', title: L('createHashRouter', 'createHashRouter'), question: L('When to use createHashRouter?', 'Когда использовать createHashRouter?'), answer: L('createHashRouter creates data router with hash history. Same API as createBrowserRouter but uses URL hash. Ideal for static hosting without server rewrites.', 'createHashRouter создаёт data-маршрутизатор с hash-историей. Тот же API, что createBrowserRouter, но использует хэш URL. Идеален для статического хостинга без перезаписей сервера.'), code: `import { createHashRouter } from 'react-router-dom';\nconst router = createHashRouter(routeConfig);` },
    { id: 'router-037', title: L('createMemoryRouter', 'createMemoryRouter'), question: L('What is createMemoryRouter used for?', 'Для чего используется createMemoryRouter?'), answer: L('createMemoryRouter creates in-memory data router for testing. Renders in memory without URL changes. Supports same loader/action APIs. Used with RouterProvider in tests.', 'createMemoryRouter создаёт in-memory data-маршрутизатор для тестирования. Рендерится в памяти без изменений URL. Поддерживает те же loader/action API. Используется с RouterProvider в тестах.'), code: `import { createMemoryRouter } from 'react-router-dom';\nconst router = createMemoryRouter(routeConfig, { initialEntries: ['/'] });` },
    { id: 'router-038', title: L('RouterProvider', 'RouterProvider'), question: L('What does RouterProvider do?', 'Что делает RouterProvider?'), answer: L('RouterProvider renders a router created by createBrowserRouter/HashRouter/MemoryRouter. Replaces Routes/Route for data routers. Must be top-level component (no BrowserRouter wrapper).', 'RouterProvider рендерит маршрутизатор, созданный createBrowserRouter/HashRouter/MemoryRouter. Заменяет Routes/Route для data-маршрутов. Должен быть компонентом верхнего уровня (без обёртки BrowserRouter).'), code: `import { RouterProvider } from 'react-router-dom';\n<RouterProvider router={router} />;` },
    { id: 'router-039', title: L('createRoutesFromElements', 'createRoutesFromElements'), question: L('What is createRoutesFromElements?', 'Что такое createRoutesFromElements?'), answer: L('createRoutesFromElements converts JSX Route elements to route objects for data routers. Useful when migrating from JSX routes to data router config, or mixing both patterns.', 'createRoutesFromElements конвертирует JSX-элементы Route в объекты маршрутов для data-маршрутизаторов. Полезно при миграции от JSX-маршрутов к конфигурации data-маршрутизатора или смешивании обоих паттернов.'), code: `import { createRoutesFromElements, createBrowserRouter } from 'react-router-dom';\nconst router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<Layout />} />));` },
    { id: 'router-040', title: L('loader', 'loader'), question: L('What is a route loader?', 'Что такой loader маршрута?'), answer: L('Loader is async function that runs before route renders. Returns data available via useLoaderData. Runs in parallel for sibling routes. Can redirect or throw responses.', 'Loader — асинхронная функция, выполняющаяся до рендера маршрута. Возвращает данные, доступные через useLoaderData. Выполняется параллельно для сиблинг-маршрутов. Может редиректить или бросать ответы.'), code: `{\n  path: '/users',\n  element: <Users />,\n  loader: async () => fetch('/api/users').then(r => r.json()),\n}` },
    { id: 'router-041', title: L('action', 'action'), question: L('What is a route action?', 'Что такое action маршрута?'), answer: L('Action is async function that handles non-GET requests (POST, PUT, DELETE). Receives FormData. Returns data via useActionData. Triggers revalidation of loaders after mutation.', 'Action — асинхронная функция, обрабатывающая не-GET запросы (POST, PUT, DELETE). Получает FormData. Возвращает данные через useActionData. Вызывает ревалидацию loaders после мутации.'), code: `{\n  path: '/users/new',\n  action: async ({ request }) => {\n    const data = await request.formData();\n    return createUser(data);\n  },\n}` },
    { id: 'router-042', title: L('shouldRevalidate', 'shouldRevalidate'), question: L('What does shouldRevalidate control?', 'Что контролирует shouldRevalidate?'), answer: L('shouldRevalidate determines if loaders re-run after navigation or action. Receives args (action, location, matches). Return false to skip revalidation for performance.', 'shouldRevalidate определяет, перезапускаются ли loaders после навигации или action. Получает args (action, location, matches). Верните false для пропуска ревалидации ради производительности.'), code: `{\n  loader: loadUsers,\n  shouldRevalidate: ({ actionResult }) => actionResult?.reload === true,\n}` },
    { id: 'router-043', title: L('ErrorBoundary route', 'ErrorBoundary маршрута'), question: L('How to handle errors in route?', 'Как обрабатывать ошибки в маршруте?'), answer: L('Route accepts errorElement prop. Rendered when loader/action throws. Catch errors in loaders and throw responses (json, redirect). ErrorElement receives useRouteError.', 'Route принимает проп errorElement. Рендерится когда loader/action бросает ошибку. Ловите ошибки в loaders и бросайте ответы (json, redirect). ErrorElement получает useRouteError.'), code: `{ path: '/users', element: <Users />, errorElement: <UsersError /> }` },
    { id: 'router-044', title: L('Route errorElement', 'errorElement маршрута'), question: L('What is errorElement?', 'Что такое errorElement?'), answer: L('errorElement is component rendered when route throws error during render, loader, or action. Provides fallback UI. Can be nested at any route level.', 'errorElement — компонент, рендерящийся когда маршрут бросает ошибку при рендере, loader или action. Предоставляет fallback UI. Может быть вложенным на любом уровне маршрута.'), code: `<Route path="/users" element={<Users />} errorElement={<ErrorFallback />} />` },
    { id: 'router-045', title: L('defer', 'defer'), question: L('How does deferred data loading work?', 'Как работает отложенная загрузка данных?'), answer: L('defer allows route to resolve initial data while streaming slow data. Wrap promises in defer(). Use <Await> in component. Requires Suspense boundary. Suspends only the deferred part.', 'defer позволяет маршруту разрешить начальные данные, стримленные медленные данные. Оберните промисы в defer(). Используйте <Await> в компоненте. Требует границы Suspense. Приостанавливает только отложенную часть.'), code: `loader: () => ({ users: fetchUsers(), stats: defer(fetchStats()) })` },
  ],
  quiz: [
    {
      id: 'router-q01',
      question: L(
        'Which browser API does BrowserRouter use to keep the URL and the interface in sync?',
        'Какое API браузера использует BrowserRouter, чтобы URL и интерфейс оставались синхронными?'
      ),
      options: [
        L('The hash part of the URL', 'Хэш-часть URL'),
        L('The HTML5 history API with pushState and popstate', 'HTML5 History API с pushState и popstate'),
        L('The Web Storage API', 'Web Storage API'),
        L('The server sent events API', 'Server Sent Events API'),
      ],
      correctIndex: 1,
      explanation: L(
        'BrowserRouter stores the current location in the browser history: pushState adds an entry without a reload and popstate tells the router that the user pressed the back button. The hash is what HashRouter uses, and the other two APIs have nothing to do with routing.',
        'BrowserRouter хранит текущее местоположение в истории браузера: pushState добавляет запись без перезагрузки, а popstate сообщает роутеру, что пользователь нажал «назад». Хэш использует HashRouter, а два других API к маршрутизации отношения не имеют.'
      ),
    },
    {
      id: 'router-q02',
      question: L(
        'A user opens /users/42 directly and the server answers with 404. What is missing?',
        'Пользователь открывает /users/42 напрямую, а сервер отвечает 404. Чего не хватает?'
      ),
      options: [
        L('The server must return index.html for every path, so the client router can take over', 'Сервер должен отдавать index.html на любой путь, чтобы клиентский роутер мог взять управление'),
        L('The application must use HashRouter instead of BrowserRouter', 'Приложение должно использовать HashRouter вместо BrowserRouter'),
        L('The routes must be declared with absolute paths', 'Маршруты должны быть объявлены с абсолютными путями'),
        L('The dev server must listen on port 3000', 'Dev-сервер должен слушать на порту 3000'),
      ],
      correctIndex: 0,
      explanation: L(
        'With the HTML5 history API the browser asks the server for the real path, and if the server has no file for it the request fails before React even starts. The fix is a rewrite rule that returns index.html for every path. HashRouter avoids the problem because the server only ever sees the file, and the other options do not change what the server does.',
        'С HTML5 History API браузер спрашивает у сервера настоящий путь, и если у сервера нет такого файла, запрос падает ещё до старта React. Лечение — правило перезаписи, которое отдаёт index.html на любой путь. HashRouter проблему снимает, потому что сервер видит только файл, а остальные варианты на поведение сервера не влияют.'
      ),
    },
    {
      id: 'router-q03',
      question: L(
        'When is HashRouter the better choice?',
        'Когда лучше выбрать HashRouter?'
      ),
      options: [
        L('When you need the shortest possible URLs', 'Когда нужны максимально короткие URL'),
        L('When you use server side rendering', 'Когда вы используете серверный рендеринг'),
        L('When the app is hosted statically and the server cannot rewrite unknown paths to index.html', 'Когда приложение хостится статически и сервер не может перезаписывать неизвестные пути на index.html'),
        L('When you need loaders and actions', 'Когда нужны loaders и actions'),
      ],
      correctIndex: 2,
      explanation: L(
        'The hash is never sent to the server, so any static host can serve the application and the router reads the path after the #, which is why HashRouter works without rewrite rules. It is not about the length of the URL, it does not support server side rendering, and loaders and actions belong to the data routers, not to the history type.',
        'Хэш никогда не отправляется на сервер, поэтому любая статическая платформа отдаст приложение, а роутер прочитает путь после # — вот почему HashRouter работает без правил перезаписи. Он не про длину URL, не поддерживает серверный рендеринг, а loaders и actions относятся к data-роутерам, а не к типу истории.'
      ),
    },
    {
      id: 'router-q04',
      question: L(
        'Where is MemoryRouter used?',
        'Где используется MemoryRouter?'
      ),
      options: [
        L('In production applications that need SEO', 'В продакшен-приложениях, которым нужен SEO'),
        L('In applications that need the real browser history', 'В приложениях, которым нужна настоящая история браузера'),
        L('In components that render outside of a router', 'В компонентах, которые рендерятся вне роутера'),
        L('In tests and in server side rendering, where the history must stay in memory', 'В тестах и при серверном рендеринге, где история должна оставаться в памяти'),
      ],
      correctIndex: 3,
      explanation: L(
        'MemoryRouter keeps the history in an internal array and never touches the URL, which makes it the right choice for tests where you need a predictable starting entry and for environments without an address bar. Production apps want the real history, SEO needs a real URL, and being outside a router is not a reason to use it.',
        'MemoryRouter держит историю во внутреннем массиве и не трогает URL, поэтому он подходит для тестов с предсказуемой начальной записью и для сред без адресной строки. Продакшену нужна настоящая история, SEO — настоящий URL, а «рендерится вне роутера» поводом для него не является.'
      ),
    },
    {
      id: 'router-q05',
      question: L(
        'How many routes of a Routes block can be rendered at the same time?',
        'Сколько маршрутов блока Routes может отрисовываться одновременно?'
      ),
      options: [
        L('Only one: the route that matches the URL best', 'Только один: маршрут, который лучше всего совпал с URL'),
        L('All the routes whose path is a prefix of the URL', 'Все маршруты, чей путь является префиксом URL'),
        L('All of them, in the order they are declared', 'Все их, в порядке объявления'),
        L('The one with the longest path, even if it does not match', 'Тот, у которого путь длиннее, даже если он не совпадает'),
      ],
      correctIndex: 0,
      explanation: L(
        'Since version 6 the Routes component picks a single branch of the tree, so only the element of the best matching route is rendered. A prefix match is not enough, the branch has to match completely, and the declaration order does not decide which one wins.',
        'Начиная с шестой версии Routes выбирает одну ветку дерева, поэтому отрисовывается только элемент лучше всего совпавшего маршрута. Совпадения по префиксу мало, ветка должна совпасть полностью, а порядок объявления не решает, кто победит.'
      ),
    },
    {
      id: 'router-q06',
      question: L(
        'What should the element prop of a Route contain?',
        'Что должно содержаться в пропе element у Route?'
      ),
      options: [
        L('The name of the component as a string', 'Имя компонента в виде строки'),
        L('A React element, for example element={<Home />}', 'React-элемент, например element={<Home />}'),
        L('A lazy import function', 'Функция ленивого импорта'),
        L('The path of the file with the component', 'Путь к файлу с компонентом'),
      ],
      correctIndex: 1,
      explanation: L(
        'The element prop takes an element that is created when the route is rendered, so the component is mounted and the hooks inside it work. Passing a string does not create a component, and the lazy import is handled by React.lazy inside a Suspense boundary, not by the Route itself.',
        'Проп element принимает элемент, который создаётся при отрисовке маршрута, поэтому компонент монтируется и его хуки работают. Строка компонент не создаёт, а ленивый импорт берёт на себя React.lazy внутри границы Suspense, а не сам Route.'
      ),
    },
    {
      id: 'router-q07',
      question: L(
        'In version 6, how is the best matching route chosen?',
        'В шестой версии как выбирается лучше всего совпавший маршрут?'
      ),
      options: [
        L('The route that is declared first in the JSX wins', 'Побеждает маршрут, объявленный первым в JSX'),
        L('The route with the shortest path wins', 'Побеждает маршрут с самым коротким путём'),
        L('By a ranking algorithm where static segments beat dynamic ones and a splat ranks last', 'Алгоритмом ранжирования: статические сегменты сильнее динамических, а splat слабее всех'),
        L('By the order in which the user visited the pages', 'Порядком, в котором пользователь посещал страницы'),
      ],
      correctIndex: 2,
      explanation: L(
        'React Router 6 ranks the candidates: a static segment is more specific than a dynamic one, more segments beat fewer, and a splat has the lowest rank, so /users/new wins over /users/:id no matter how they are written. The declaration order only mattered in version 5 with Switch.',
        'React Router 6 ранжирует кандидатов: статический сегмент конкретнее динамического, больше сегментов лучше меньшего, а splat рангом ниже всех, поэтому /users/new побеждает /users/:id независимо от порядка записи. Порядок объявления имел значение только в пятой версии с Switch.'
      ),
    },
    {
      id: 'router-q08',
      question: L(
        'What does an index route render?',
        'Что отрисовывает index-маршрут?'
      ),
      options: [
        L('The parent route element when the parent path matches only partially', 'Элемент родительского маршрута, когда путь родителя совпал лишь частично'),
        L('A route that matches every URL', 'Маршрут, совпадающий с любым URL'),
        L('A route that replaces the parent element', 'Маршрут, заменяющий элемент родителя'),
        L('The child route when the path of the parent matches exactly', 'Дочерний маршрут, когда путь родителя совпал точно'),
      ],
      correctIndex: 3,
      explanation: L(
        'An index route has no path of its own and renders when the path of the parent is matched exactly, so /users shows the index child and /users/42 shows the parameter child. It does not replace the parent element, the parent layout with the Outlet still wraps it, and it does not match every URL.',
        'У index-маршрута нет собственного пути, и он отрисовывается, когда путь родителя совпал точно: на /users виден index-ребёнок, а на /users/42 — ребёнок с параметром. Элемент родителя он не заменяет, родительский layout с Outlet по-прежнему его оборачивает, и любой URL он не ловит.'
      ),
    },
    {
      id: 'router-q09',
      question: L(
        'What is a layout route?',
        'Что такое layout-маршрут?'
      ),
      options: [
        L('A route that has an element but no path and renders an Outlet for its children', 'Маршрут с элементом, но без пути, который отрисовывает Outlet для детей'),
        L('A route whose path is an empty string', 'Маршрут, у которого путь — пустая строка'),
        L('A route that only defines a loader', 'Маршрут, у которого определён только loader'),
        L('A route that redirects to another route', 'Маршрут, который перенаправляет на другой маршрут'),
      ],
      correctIndex: 0,
      explanation: L(
        'A layout route has no path, so it consumes no part of the URL, but it has an element that usually contains an Outlet, which is where the children are rendered. That is how a sidebar or a header is shared by several routes. It is not the same as an empty path, and it has nothing to do with loaders or redirects.',
        'У layout-маршрута нет пути, поэтому он не забирает ни часть URL, но есть элемент, обычно с Outlet — именно там отрисовываются дети. Так несколько маршрутов делят сайдбар или шапку. Это не то же самое, что пустой путь, и к loaders или редиректам отношения не имеет.'
      ),
    },
    {
      id: 'router-q10',
      question: L(
        'What is a pathless layout route used for?',
        'Для чего используется pathless layout-маршрут?'
      ),
      options: [
        L('For a route that matches every URL and renders nothing', 'Для маршрута, совпадающего с любым URL и ничего не отрисовывающего'),
        L('For a layout that applies to a group of routes regardless of the URL', 'Для layout, применяемого к группе маршрутов независимо от URL'),
        L('For a route that only has a loader and no element', 'Для маршрута, у которого есть только loader и нет элемента'),
        L('For redirecting unknown paths to the home page', 'Для перенаправления неизвестных путей на главную страницу'),
      ],
      correctIndex: 1,
      explanation: L(
        'A pathless route groups routes under a shared layout without adding a segment to the URL, which is how you wrap a set of pages in a layout or in an error boundary. It still renders its children through the Outlet, so it is not an empty route, and it is not a redirect.',
        'Pathless-маршрут группирует маршруты под общим layout, не добавляя сегмент к URL, — так набор страниц заворачивают в layout или в границу ошибок. Он по-прежнему отрисовывает детей через Outlet, поэтому это не пустой маршрут, и редиректом он не является.'
      ),
    },
    {
      id: 'router-q11',
      question: L(
        'Which path pattern captures the segment 42 of the URL /users/42?',
        'Какой шаблон пути захватывает сегмент 42 в URL /users/42?'
      ),
      options: [
        L('/users/*', '/users/*'),
        L('/users/:id?', '/users/:id?'),
        L('/users/:id', '/users/:id'),
        L('/users/42', '/users/42'),
      ],
      correctIndex: 2,
      explanation: L(
        'A dynamic segment is written with a colon followed by the name of the parameter, so :id captures 42 and it is read with useParams. The star is a splat that captures everything that is left, the question mark makes the parameter optional, and a literal segment would only match that exact value.',
        'Динамический сегмент записывается с двоеточием и именем параметра, поэтому :id захватывает 42, и его читают через useParams. Звёздочка — это splat, захватывающий всё остальное, вопросительный знак делает параметр необязательным, а литеральный сегмент совпадёт только с этим точным значением.'
      ),
    },
    {
      id: 'router-q12',
      question: L(
        'What type is the value that useParams returns for the parameter id?',
        'Какого типа значение возвращает useParams для параметра id?'
      ),
      options: [
        L('A number, because the segment of the URL is a number', 'Число, потому что сегмент URL — это число'),
        L('An object with the parsed value and the raw string', 'Объект с разобранным значением и сырой строкой'),
        L('A string or a number, depending on the route', 'Строка или число, в зависимости от маршрута'),
        L('A string, always', 'Всегда строка'),
      ],
      correctIndex: 3,
      explanation: L(
        'URL segments are always strings, so useParams gives you strings even when the segment looks like a number and you have to convert it yourself. The router does not guess a type and it does not return a wrapper object, it returns the raw parameter values.',
        'Сегменты URL — всегда строки, поэтому useParams отдаёт строки, даже если сегмент похож на число, и преобразовывать нужно самому. Роутер не угадывает тип и не возвращает объект-обёртку, он отдаёт сырые значения параметров.'
      ),
    },
    {
      id: 'router-q13',
      question: L(
        'How do you declare a route that matches every path nothing else matched?',
        'Как объявить маршрут, совпадающий со всеми путями, которые не совпали с остальными?'
      ),
      options: [
        L('path="*"', 'path="*"'),
        L('path="?"', 'path="?"'),
        L('path="**"', 'path="**"'),
        L('path="/:any"', 'path="/:any"'),
      ],
      correctIndex: 0,
      explanation: L(
        'The star is the splat: it matches every remaining segment, so it is the standard way to write a not found page. The question mark marks an optional parameter, two stars are not a thing, and a named parameter would only match a single segment.',
        'Звёздочка — это splat: она совпадает со всеми оставшимися сегментами, и это стандартный способ написать страницу 404. Вопросительный знак помечает необязательный параметр, двух звёздочек не бывает, а именованный параметр поймал бы только один сегмент.'
      ),
    },
    {
      id: 'router-q14',
      question: L(
        'How do you make the parameter query of the route /search/:query optional?',
        'Как сделать параметр query маршрута /search/:query необязательным?'
      ),
      options: [
        L('path="/search/:query/?"', 'path="/search/:query/?"'),
        L('path="/search/:query?"', 'path="/search/:query?"'),
        L('path="/search/query?"', 'path="/search/query?"'),
        L('path="/search/:query*?"', 'path="/search/:query*?"'),
      ],
      correctIndex: 1,
      explanation: L(
        'A question mark right after the name of the parameter makes it optional, and the value is undefined when the segment is missing. A trailing slash changes the path, the name has to stay, and a star turns it into a splat instead of an optional parameter.',
        'Вопросительный знак сразу после имени параметра делает его необязательным, и значение равно undefined, когда сегмента нет. Слэш в конце меняет сам путь, имя параметра сохраняется, а звёздочка превращает его в splat, а не в необязательный параметр.'
      ),
    },
    {
      id: 'router-q15',
      question: L(
        'A child route is declared as path=":id" inside a parent with path="/users". Which URL does it match?',
        'Дочерний маршрут объявлен как path=":id" внутри родителя с path="/users". Какой URL он совпадает?'
      ),
      options: [
        L('/:id', '/:id'),
        L('/id', '/id'),
        L('/users/:id', '/users/:id'),
        L('It depends on the order of the routes', 'Это зависит от порядка маршрутов'),
      ],
      correctIndex: 2,
      explanation: L(
        'A path without a leading slash is relative, so it is appended to the path of the parent and the result is /users/:id. A path with a leading slash would be absolute and would ignore the parent, and the order of the routes does not change how a nested path is composed.',
        'Путь без ведущей косой черты относительный, поэтому он приписывается к пути родителя, и получается /users/:id. Путь с ведущей косой чертой абсолютный и игнорирует родителя, а порядок маршрутов на составление вложенного пути не влияет.'
      ),
    },
    {
      id: 'router-q16',
      question: L(
        'What happens when navigate("/home") is called from the page /users/42?',
        'Что произойдёт, если со страницы /users/42 вызвать navigate("/home")?'
      ),
      options: [
        L('It navigates to /users/42/home, because the current route is used as the base', 'Переход на /users/42/home, потому что базой служит текущий маршрут'),
        L('It goes to the parent route /users', 'Переход на родительский маршрут /users'),
        L('It does nothing, because the path is not relative', 'Ничего не произойдёт, потому что путь не относительный'),
        L('It goes to /home, because a leading slash makes the path absolute', 'Переход на /home, потому что ведущая косая черта делает путь абсолютным'),
      ],
      correctIndex: 3,
      explanation: L(
        'A path that starts with a slash is absolute and is resolved from the root of the router, so the current location is ignored. It is the relative navigation that uses the route hierarchy as the base, and there is no such thing as going to the parent route with a path.',
        'Путь, начинающийся с косой черты, абсолютный и разрешается от корня роутера, поэтому текущее местоположение игнорируется. Именно относительная навигация использует иерархию маршрутов как базу, а «перейти к родительскому маршруту путём» не существует.'
      ),
    },
    {
      id: 'router-q17',
      question: L(
        'What does the Outlet component render?',
        'Что отрисовывает компонент Outlet?'
      ),
      options: [
        L('The element of the matched child route inside the parent layout', 'Элемент совпавшего дочернего маршрута внутри родительского layout'),
        L('The whole application, like a root layout', 'Всё приложение, как корневой layout'),
        L('The element of the route that has no children', 'Элемент маршрута, у которого нет детей'),
        L('The loader data of the parent route', 'Данные loader родительского маршрута'),
      ],
      correctIndex: 0,
      explanation: L(
        'The Outlet is the placeholder where the child route appears, so the parent component keeps the header, the sidebar and the layout while the child fills the content area. It renders the matched child element and nothing else, and it has nothing to do with loader data.',
        'Outlet — это место, где появляется дочерний маршрут: родительский компонент сохраняет шапку, сайдбар и общий layout, а ребёнок занимает область контента. Он отрисовывает только совпавший дочерний элемент и никак не связан с данными loader.'
      ),
    },
    {
      id: 'router-q18',
      question: L(
        'How is the path of a nested route composed?',
        'Как составляется путь вложенного маршрута?'
      ),
      options: [
        L('The path of the child replaces the path of the parent', 'Путь ребёнка заменяет путь родителя'),
        L('The path of the parent is the prefix and the path of the child is appended to it', 'Путь родителя становится префиксом, и к нему приписывается путь ребёнка'),
        L('Only the path of the child is used', 'Используется только путь ребёнка'),
        L('The paths are joined with a slash, so a slash inside the child breaks the route', 'Пути соединяются косой чертой, поэтому слеш внутри ребёнка ломает маршрут'),
      ],
      correctIndex: 1,
      explanation: L(
        'The path of the child is relative to the parent, so the path of the parent is the prefix and the path of the child is appended to it. A child path that starts with a slash is absolute and breaks out of the parent, but a slash inside a relative path is fine.',
        'Путь ребёнка относителен родителю, поэтому путь родителя становится префиксом, а путь ребёнка приписывается к нему. Путь ребёнка с ведущей косой чертой абсолютный и вырывается из родителя, но слеш внутри относительного пути вполне допустим.'
      ),
    },
    {
      id: 'router-q19',
      question: L(
        'What does useNavigate return?',
        'Что возвращает useNavigate?'
      ),
      options: [
        L('The current location object', 'Объект текущего местоположения'),
        L('A React state setter', 'Функцию обновления состояния React'),
        L('A function that navigates to a path or moves through the history with a number', 'Функцию, которая переходит по пути или двигается по истории числом'),
        L('The matched route object', 'Объект совпавшего маршрута'),
      ],
      correctIndex: 2,
      explanation: L(
        'useNavigate gives you the navigation function: you pass it a path to go somewhere or a number such as -1 to move through the history. It is not a state setter, and it does not return the location, that is what useLocation is for.',
        'useNavigate отдаёт функцию навигации: ей передают путь, чтобы перейти, или число вроде -1, чтобы пройти по истории. Это не функция обновления состояния, и она не возвращает местоположение — для этого есть useLocation.'
      ),
    },
    {
      id: 'router-q20',
      question: L(
        'What does navigate(-1) do?',
        'Что делает navigate(-1)?'
      ),
      options: [
        L('It reloads the current page', 'Перезагружает текущую страницу'),
        L('It removes the current route from the configuration', 'Удаляет текущий маршрут из конфигурации'),
        L('It navigates to the parent route', 'Переходит на родительский маршрут'),
        L('It goes one entry back in the history', 'Отходит на одну запись назад по истории'),
      ],
      correctIndex: 3,
      explanation: L(
        'A negative number is a delta in the browser history, so -1 goes back one entry, exactly like the back button of the browser. A reload is not navigation, the configuration of the routes cannot be changed at runtime, and going to the parent route is done with a relative path such as ..',
        'Отрицательное число — это дельта по истории браузера, поэтому -1 отходит на запись назад, ровно как кнопка «назад». Перезагрузка — не навигация, конфигурацию маршрутов не меняют в рантайме, а к родительскому маршруту идут относительным путём вроде ..'
      ),
    },
    {
      id: 'router-q21',
      question: L(
        'When is the Navigate component used?',
        'Когда используется компонент Navigate?'
      ),
      options: [
        L('When a component has to redirect while it renders, for example because the user is not signed in', 'Когда компоненту нужно перенаправить при отрисовке, например из-за отсутствия авторизации'),
        L('When a link has to look like a button', 'Когда ссылка должна выглядеть как кнопка'),
        L('When the history has to be cleaned up', 'Когда нужно почистить историю'),
        L('When a loader has to return data', 'Когда loader должен вернуть данные'),
      ],
      correctIndex: 0,
      explanation: L(
        'Navigate performs the redirect while the component renders, which is what a guard for a not signed in user needs. It is not a link, it does not touch the history entries, and the data of a route comes from a loader.',
        'Navigate выполняет перенаправление во время отрисовки компонента — именно это и нужно гарду для неавторизованного пользователя. Это не ссылка, записи истории он не трогает, а данные маршрута приходят из loader.'
      ),
    },
    {
      id: 'router-q22',
      question: L(
        'Which fields does the object returned by useLocation contain?',
        'Какие поля содержит объект, возвращаемый useLocation?'
      ),
      options: [
        L('Only the pathname', 'Только pathname'),
        L('pathname, search, hash, state and key', 'pathname, search, hash, state и key'),
        L('pathname, params and data', 'pathname, params и data'),
        L('pathname, search and the matched routes', 'pathname, search и совпавшие маршруты'),
      ],
      correctIndex: 1,
      explanation: L(
        'The location describes where the user is and how they got there: the pathname, the query string, the hash, the state that was passed during the navigation and a key that is unique per navigation. The params come from useParams and the data from useLoaderData.',
        'Location описывает, где находится пользователь и как он туда пришёл: pathname, строку запроса, хэш, состояние, переданное при навигации, и уникальный для каждой навигации key. Параметры берутся из useParams, а данные — из useLoaderData.'
      ),
    },
    {
      id: 'router-q23',
      question: L(
        'How do you pass data to the next page during a navigation?',
        'Как передать данные на следующую страницу при навигации?'
      ),
      options: [
        L('With a query parameter in the path', 'Через параметр запроса в пути'),
        L('With a global variable', 'Через глобальную переменную'),
        L('With the state property of the location, set by the state option of Link or navigate', 'Через свойство state местоположения, которое задаёт опция state у Link или navigate'),
        L('With a prop of the target component', 'Через проп целевого компонента'),
      ],
      correctIndex: 2,
      explanation: L(
        'The state option of Link and navigate puts data into location.state, where the next page reads it with useLocation. It does not appear in the URL and it disappears on a reload, while a query parameter would be visible and shareable.',
        'Опция state у Link и navigate кладёт данные в location.state, откуда следующая страница читает их через useLocation. В URL они не попадают и исчезают при перезагрузке, тогда как параметр запроса был бы виден и мог бы передаваться ссылкой.'
      ),
    },
    {
      id: 'router-q24',
      question: L(
        'What does useSearchParams return?',
        'Что возвращает useSearchParams?'
      ),
      options: [
        L('Only the current query string as a string', 'Только текущую строку запроса как строку'),
        L('A function that reloads the page', 'Функцию, перезагружающую страницу'),
        L('An object with the parsed parameters', 'Объект с разобранными параметрами'),
        L('A tuple with the URLSearchParams object and a function that updates the query string', 'Кортеж с объектом URLSearchParams и функцией, обновляющей строку запроса'),
      ],
      correctIndex: 3,
      explanation: L(
        'The hook gives you the current parameters as a URLSearchParams instance and a setter that writes new parameters into the URL. The setter is the second item of the tuple, and the parameters are read with methods such as get and getAll.',
        'Хук отдаёт текущие параметры в виде экземпляра URLSearchParams и сеттер, который записывает новые параметры в URL. Сеттер — второй элемент кортежа, а параметры читают методами вроде get и getAll.'
      ),
    },
    {
      id: 'router-q25',
      question: L(
        'What happens to the history when setSearchParams is called?',
        'Что происходит с историей при вызове setSearchParams?'
      ),
      options: [
        L('The current entry is replaced by default, so the back button skips the change', 'Текущая запись по умолчанию заменяется, поэтому кнопка «назад» пропускает изменение'),
        L('A new entry is always added', 'Всегда добавляется новая запись'),
        L('The whole page is reloaded with the new query string', 'Вся страница перезагружается с новой строкой запроса'),
        L('The pathname is replaced by the query string', 'Pathname заменяется строкой запроса'),
      ],
      correctIndex: 0,
      explanation: L(
        'By default the setter replaces the current history entry, which is what you want for filters and pages, because the back button should return to the previous page and not to every intermediate filter. The setter also accepts a replace option to add a new entry instead, and only the query string changes, the path stays the same.',
        'По умолчанию сеттер заменяет текущую запись истории — это удобно для фильтров и пагинации, потому что кнопка «назад» должна возвращать на предыдущую страницу, а не на каждый промежуточный фильтр. Сеттер принимает и опцию replace, чтобы добавить запись, и меняется только строка запроса — путь остаётся прежним.'
      ),
    },
    {
      id: 'router-q26',
      question: L(
        'What is the difference between Link and a plain anchor tag?',
        'Чем Link отличается от обычного тега anchor?'
      ),
      options: [
        L('The anchor tag cannot be styled with CSS', 'Тег anchor нельзя стилизовать через CSS'),
        L('Link renders an anchor but intercepts the click, so the page is not reloaded', 'Link отрисовывает anchor, но перехватывает клик, поэтому страница не перезагружается'),
        L('Link sends the user to another browser', 'Link отправляет пользователя в другой браузер'),
        L('The anchor tag cannot be used for internal navigation', 'Тег anchor нельзя использовать для внутренней навигации'),
      ],
      correctIndex: 1,
      explanation: L(
        'Link renders a real anchor, so it keeps the accessibility and the middle click behaviour, but it prevents the default navigation and pushes the path into the history instead of loading the page again. An anchor with href does a full page reload, which is what you want for external links but not for internal ones.',
        'Link отрисовывает настоящий anchor, поэтому сохраняются доступность и поведение средней кнопки мыши, но переход по умолчанию отменяется, а путь кладётся в историю вместо полной перезагрузки. Обычный anchor с href перезагружает страницу — для внешних ссылок это нужно, а для внутренних нет.'
      ),
    },
    {
      id: 'router-q27',
      question: L(
        'What does NavLink add when the link points to the current location?',
        'Что добавляет NavLink, когда ссылка ведёт на текущее местоположение?'
      ),
      options: [
        L('A class called current', 'Класс с именем current'),
        L('An attribute data-active', 'Атрибут data-active'),
        L('The attribute aria-current with the value page', 'Атрибут aria-current со значением page'),
        L('A red colour by default', 'Красный цвет по умолчанию'),
      ],
      correctIndex: 2,
      explanation: L(
        'NavLink knows whether it is active and adds aria-current="page", which is the accessible way to mark the current page, and it can pass the state to the className and style functions. It does not add a class on its own and it has no built in colours.',
        'NavLink знает, активен ли он, и добавляет aria-current="page" — доступный способ отметить текущую страницу; состояние он передаёт в функции className и style. Сам по себе класс он не навешивает и никаких встроенных цветов у него нет.'
      ),
    },
    {
      id: 'router-q28',
      question: L(
        'What does useMatch return when the given pattern does not match the current location?',
        'Что возвращает useMatch, когда заданный шаблон не совпадает с текущим местоположением?'
      ),
      options: [
        L('An empty object', 'Пустой объект'),
        L('The boolean false', 'Логическое false'),
        L('The same match object with empty params', 'Тот же объект совпадения с пустыми параметрами'),
        L('null', 'null'),
      ],
      correctIndex: 3,
      explanation: L(
        'useMatch returns the match object with the params when the pattern matches and null when it does not, so the check is a simple if on the result. It never returns an empty object or false, and the params are filled in only in the matching case.',
        'useMatch возвращает объект совпадения с параметрами, если шаблон подошёл, и null, если не подошёл, поэтому проверка — обычный if по результату. Пустой объект или false он не возвращает, и параметры заполняются только при совпадении.'
      ),
    },
    {
      id: 'router-q29',
      question: L(
        'How does a layout route pass data to its children?',
        'Как layout-маршрут передаёт данные своим детям?'
      ),
      options: [
        L('With the context property of the Outlet, read in the child with useOutletContext', 'Через свойство context у Outlet, которое ребёнок читает через useOutletContext'),
        L('With a prop on the child route', 'Через проп у дочернего маршрута'),
        L('With a global variable', 'Через глобальную переменную'),
        L('With the state of the location', 'Через состояние местоположения'),
      ],
      correctIndex: 0,
      explanation: L(
        'The Outlet accepts a context property and the child reads it with useOutletContext, which is the usual way to pass the current user or a configuration from the layout down to the pages. Props and the location state do not cross the route boundary.',
        'Outlet принимает свойство context, а ребёнок читает его через useOutletContext — обычно так передают текущего пользователя или конфигурацию от layout к страницам. Пропы и состояние местоположения через границу маршрута не проходят.'
      ),
    },
    {
      id: 'router-q30',
      question: L(
        'What does useInRouterContext tell you?',
        'Что сообщает useInRouterContext?'
      ),
      options: [
        L('Whether the current path matches a route', 'Совпадает ли текущий путь с каким-либо маршрутом'),
        L('Whether the component is rendered inside a router', 'Отрисован ли компонент внутри роутера'),
        L('How many routes are configured', 'Сколько маршрутов настроено'),
        L('Whether the router is still loading', 'Загружается ли ещё роутер'),
      ],
      correctIndex: 1,
      explanation: L(
        'The hook returns true when the component is inside a router and false otherwise, so a reusable component can fall back to a plain anchor when it is used outside the routing tree. It says nothing about the path, the number of routes or the loading state.',
        'Хук возвращает true, если компонент внутри роутера, и false иначе, поэтому переиспользуемый компонент может откатиться на обычный anchor вне дерева маршрутизации. Ни о пути, ни о числе маршрутов, ни о состоянии загрузки он не говорит.'
      ),
    },
    {
      id: 'router-q31',
      question: L(
        'What is useLinkClickHandler for?',
        'Для чего нужен useLinkClickHandler?'
      ),
      options: [
        L('For blocking the click on a link', 'Чтобы блокировать клик по ссылке'),
        L('For logging every navigation', 'Чтобы логировать каждую навигацию'),
        L('For building custom components that navigate like a link, such as a button', 'Чтобы строить свои компоненты, навигирующие как ссылка, например кнопку'),
        L('For measuring how long the navigation took', 'Чтобы измерять, сколько заняла навигация'),
      ],
      correctIndex: 2,
      explanation: L(
        'The handler does exactly what the click of a Link does, including the modifiers and the prevention of the default behaviour, so you can attach it to a button or to a menu item. It is not a way to block or to log the navigation.',
        'Обработчик делает ровно то же, что клик по Link, включая учёт модификаторов и отмену поведения по умолчанию, поэтому его вешают на кнопку или пункт меню. Это не способ блокировать или логировать навигацию.'
      ),
    },
    {
      id: 'router-q32',
      question: L(
        'Which pair of pieces creates a data router in version 6?',
        'Какая пара создаёт data-роутер в шестой версии?'
      ),
      options: [
        L('BrowserRouter and Routes', 'BrowserRouter и Routes'),
        L('RouterProvider and useNavigate', 'RouterProvider и useNavigate'),
        L('Routes and Route', 'Routes и Route'),
        L('createBrowserRouter and RouterProvider', 'createBrowserRouter и RouterProvider'),
      ],
      correctIndex: 3,
      explanation: L(
        'A data router is created with createBrowserRouter (or the hash and memory variants) from a configuration of route objects, and the RouterProvider renders it. BrowserRouter with Routes belongs to the classic mode and cannot run loaders and actions.',
        'Data-роутер создаётся через createBrowserRouter (или hash и memory варианты) из конфигурации объектов маршрутов, а отрисовывает его RouterProvider. BrowserRouter с Routes — это классический режим, он не умеет выполнять loaders и actions.'
      ),
    },
    {
      id: 'router-q33',
      question: L(
        'Can RouterProvider be wrapped in a BrowserRouter?',
        'Можно ли обернуть RouterProvider в BrowserRouter?'
      ),
      options: [
        L('No, the router created by createBrowserRouter already provides the routing context', 'Нет, роутер из createBrowserRouter уже предоставляет контекст маршрутизации'),
        L('Yes, but the inner router is then ignored', 'Да, но внутренний роутер тогда игнорируется'),
        L('Yes, and it is the recommended way', 'Да, и это рекомендуемый способ'),
        L('No, because RouterProvider must be inside a Provider', 'Нет, потому что RouterProvider должен быть внутри Provider'),
      ],
      correctIndex: 0,
      explanation: L(
        'RouterProvider is the top level component of a data router: it mounts the router that already contains the history, so adding a BrowserRouter around it would create a second, conflicting routing context. Provider is the react-redux component and has nothing to do with this.',
        'RouterProvider — компонент верхнего уровня для data-роутера: он монтирует роутер, в котором уже есть история, поэтому обёртка из BrowserRouter создала бы второй, конфликтующий контекст маршрутизации. Provider — это компонент react-redux, к делу он отношения не имеет.'
      ),
    },
    {
      id: 'router-q34',
      question: L(
        'How do you test a component that uses routers?',
        'Как протестировать компонент, использующий роутер?'
      ),
      options: [
        L('With createBrowserRouter, because it is the only one that supports loaders', 'Через createBrowserRouter, потому что он единственный поддерживает loaders'),
        L('With createMemoryRouter and a given initial entry, so the URL stays under control', 'Через createMemoryRouter с заданной начальной записью, чтобы URL оставался под контролем'),
        L('By rendering the component without any router at all', 'Отрисовав компонент вообще без роутера'),
        L('With HashRouter and a real browser window', 'Через HashRouter и настоящее окно браузера'),
      ],
      correctIndex: 1,
      explanation: L(
        'createMemoryRouter keeps the history in memory and lets you define the starting entries, so a test can navigate to /users/42 and assert what is rendered without touching the address bar. The browser router changes the real URL, and a component that uses router hooks needs a router around it.',
        'createMemoryRouter держит историю в памяти и позволяет задать начальные записи, поэтому в тесте можно перейти на /users/42 и проверить результат, не трогая адресную строку. Браузерный роутер меняет настоящий URL, а компоненту с роутерными хуками роутер вокруг нужен обязательно.'
      ),
    },
    {
      id: 'router-q35',
      question: L(
        'When does a route loader run?',
        'Когда выполняется loader маршрута?'
      ),
      options: [
        L('After the element of the route is rendered', 'После отрисовки элемента маршрута'),
        L('Only when the user opens the network panel', 'Только когда пользователь открывает панель сети'),
        L('When the action of the route is submitted', 'Когда отправляется action маршрута'),
        L('Before the route is rendered, as part of the navigation', 'До отрисовки маршрута, как часть навигации'),
      ],
      correctIndex: 3,
      explanation: L(
        'The loader is part of the navigation: it runs before the route is rendered and its result is ready when the element appears, which removes the loading state from the component. It does not run after the render, and it is not triggered by the action, the action is the one that runs on a submission.',
        'Loader — часть навигации: он выполняется до отрисовки маршрута, и его результат уже готов, когда элемент появляется, поэтому состояние загрузки уходит из компонента. После отрисовки он не запускается и экшеном не вызывается: action запускается по отправке формы.'
      ),
    },
    {
      id: 'router-q36',
      question: L(
        'What does useLoaderData return?',
        'Что возвращает useLoaderData?'
      ),
      options: [
        L('The data returned by the loader of the closest route in the matched branch', 'Данные, возвращённые loader ближайшего маршрута в совпавшей ветке'),
        L('The data of all the loaders of the application', 'Данные всех loader приложения'),
        L('The result of the last action', 'Результат последнего action'),
        L('The state of the store', 'Состояние стора'),
      ],
      correctIndex: 0,
      explanation: L(
        'useLoaderData gives the data of the loader of the route that renders the component, so a child component sees the data of its own route and a layout sees the data of the layout loader. It does not merge the loaders and it has nothing to do with actions or with the store.',
        'useLoaderData отдаёт данные loader того маршрута, который отрисовывает компонент: дочерний компонент видит данные своего маршрута, а layout — данные своего loader. Они не объединяются, и к actions или стору хук отношения не имеет.'
      ),
    },
    {
      id: 'router-q37',
      question: L(
        'A page has a layout loader and a child loader. How do they run?',
        'У страницы есть loader у layout и loader у ребёнка. Как они выполняются?'
      ),
      options: [
        L('The child loader runs first, then the layout loader', 'Сначала выполняется loader ребёнка, затем loader layout'),
        L('They run in parallel, so the total time is the slower of the two', 'Они выполняются параллельно, поэтому общее время равно времени более медленного'),
        L('They run one after the other, because the child depends on the layout', 'Они выполняются по очереди, потому что ребёнок зависит от layout'),
        L('Only the layout loader runs, the child data comes from the layout', 'Выполняется только loader layout, данные ребёнка приходят из layout'),
      ],
      correctIndex: 1,
      explanation: L(
        'React Router starts the loaders of the matched branch together, so the page waits for the slowest one instead of the sum of both. This is why a layout loader that a child needs should read the request data itself instead of waiting for the parent result.',
        'React Router запускает loaders совпавшей ветки одновременно, поэтому страница ждёт самого медленного, а не суммы обоих. Именно поэтому layout loader, который нужен ребёнку, должен сам читать данные запроса, а не ждать результата родителя.'
      ),
    },
    {
      id: 'router-q38',
      question: L(
        'How does a loader send the user to the login page?',
        'Как loader отправляет пользователя на страницу входа?'
      ),
      options: [
        L('By returning the string /login', 'Возвращая строку /login'),
        L('By calling navigate from inside the loader', 'Вызывая navigate внутри loader'),
        L('By throwing a redirect, which stops the navigation', 'Бросая redirect, что останавливает навигацию'),
        L('By setting the state of the location', 'Задавая state у местоположения'),
      ],
      correctIndex: 2,
      explanation: L(
        'A loader cannot navigate imperatively, because the navigation is still running, so it throws a redirect response and the router performs the redirect instead of the navigation. Returning a path would render it as data, and navigate inside a loader is not available there.',
        'Loader не может навигировать императивно, потому что навигация ещё выполняется, поэтому он бросает ответ redirect, и перенаправление делает роутер. Возврат пути отрисовал бы его как данные, а navigate внутри loader недоступен.'
      ),
    },
    {
      id: 'router-q39',
      question: L(
        'A loader throws a Response with the status 404. What happens?',
        'Loader бросает Response со статусом 404. Что произойдёт?'
      ),
      options: [
        L('The router renders the element of the route with the status code', 'Роутер отрисует элемент маршрута вместе с кодом статуса'),
        L('The router retries the request once', 'Роутер повторит запрос один раз'),
        L('The whole application is unmounted', 'Всё приложение будет размонтировано'),
        L('The errorElement of the closest route that has one is rendered', 'Отрисуется errorElement ближайшего маршрута, у которого он есть'),
      ],
      correctIndex: 3,
      explanation: L(
        'The router catches the thrown response and renders the errorElement of the nearest route that declares one, so a failure of a deep child does not blank the application. Without an errorElement the nearest boundary of the router is used, and the status of the response is what the error component reads with useRouteError.',
        'Роутер перехватывает брошенный ответ и отрисовывает errorElement ближайшего маршрута, где он объявлен, поэтому сбой глубокого ребёнка не оставляет приложение пустым. Если errorElement нет, работает ближайшая граница роутера, а статус ответа читает компонент ошибки через useRouteError.'
      ),
    },
    {
      id: 'router-q40',
      question: L(
        'Which requests does a route action handle?',
        'Какие запросы обрабатывает action маршрута?'
      ),
      options: [
        L('The non GET submissions, such as POST, PUT and DELETE', 'Отправки, отличные от GET, то есть POST, PUT и DELETE'),
        L('The data loading of the route', 'Загрузку данных маршрута'),
        L('Only the validation of the form of the route', 'Только валидацию формы маршрута'),
        L('The redirect of the route', 'Перенаправление маршрута'),
      ],
      correctIndex: 0,
      explanation: L(
        'The action is the write side of a route: it receives the request of a submission and performs the mutation, while the loader is the read side. The action also triggers the revalidation of the loaders afterwards, and it never loads the data of the page by itself.',
        'Action — это сторона записи маршрута: он получает запрос отправки и выполняет мутацию, а loader — сторона чтения. Action заодно вызывает ревалидацию loaders и сам по себе никогда не грузит данные страницы.'
      ),
    },
    {
      id: 'router-q41',
      question: L(
        'What does the Form component of React Router do?',
        'Что делает компонент Form из React Router?'
      ),
      options: [
        L('It renders a plain html form that does nothing special', 'Отрисовывает обычную html-форму, которая ничего особенного не делает'),
        L('It submits the data to the action of the route and lets the router handle the navigation', 'Отправляет данные в action маршрута и позволяет роутеру обработать навигацию'),
        L('It validates the fields before the submission', 'Проверяет поля перед отправкой'),
        L('It sends the data with fetch in the background', 'Отправляет данные через fetch в фоне'),
      ],
      correctIndex: 1,
      explanation: L(
        'The Form works like a normal html form but instead of a full page request it sends the data to the action of the current route, and the result is handled by the router, so the page is not reloaded. Validation is still your job and there is no fetch call behind it.',
        'Form работает как обычная html-форма, но вместо полной перезагрузки страницы отправляет данные в action текущего маршрута, а результат обрабатывает роутер. Валидация остаётся вашей заботой, и никакого fetch внутри нет.'
      ),
    },
    {
      id: 'router-q42',
      question: L(
        'What does useActionData return?',
        'Что возвращает useActionData?'
      ),
      options: [
        L('The data of the loader of the route', 'Данные loader маршрута'),
        L('The FormData of the submission', 'FormData отправленной формы'),
        L('The result of the last action of the route', 'Результат последнего action маршрута'),
        L('The state of the location', 'Состояние местоположения'),
      ],
      correctIndex: 2,
      explanation: L(
        'useActionData gives the value that the action returned, so you can show a confirmation or a validation message after a submission. The loader data comes from useLoaderData, the FormData is what the action receives, and the location state comes from the navigation.',
        'useActionData отдаёт значение, которое вернул action, чтобы показать подтверждение или сообщение об ошибке после отправки. Данные loader берутся из useLoaderData, FormData — это то, что получает action, а state местоположения приходит из навигации.'
      ),
    },
    {
      id: 'router-q43',
      question: L(
        'What happens to the loaders after an action succeeds?',
        'Что происходит с loaders после успешного action?'
      ),
      options: [
        L('Nothing, they only run on a navigation', 'Ничего, они выполняются только при навигации'),
        L('They run only if the component asks for it', 'Они выполняются, только если компонент попросит'),
        L('They run before the action, to prepare the data', 'Они выполняются до action, чтобы подготовить данные'),
        L('They are revalidated, so the page shows the new data', 'Они ревалидируются, и страница показывает новые данные'),
      ],
      correctIndex: 3,
      explanation: L(
        'After an action the router revalidates the loaders of the branch, which is what makes the updated data appear without a manual reload. The revalidation runs after the action, not before, and it happens automatically, so the component does not have to ask for it.',
        'После action роутер ревалидирует loaders ветки — именно так обновлённые данные появляются без ручной перезагрузки. Ревалидация идёт после action, а не до, и происходит автоматически, так что компоненту просить об этом не нужно.'
      ),
    },
    {
      id: 'router-q44',
      question: L(
        'What does shouldRevalidate control?',
        'Что контролирует shouldRevalidate?'
      ),
      options: [
        L('Whether the loaders run again after a navigation or after an action', 'Будут ли loaders запускаться снова после навигации или после action'),
        L('Whether the errorElement is rendered', 'Отрисуется ли errorElement'),
        L('Whether the component re-renders', 'Перерисуется ли компонент'),
        L('Whether the action is allowed to run', 'Разрешено ли выполняться action'),
      ],
      correctIndex: 0,
      explanation: L(
        'shouldRevalidate is a per route hook that receives the result of the action, the location and the matches, and returning false skips the revalidation, which saves requests on routes whose data did not change. It does not control rendering, the error element or the action itself.',
        'shouldRevalidate — хук на уровне маршрута: он получает результат action, местоположение и список совпадений, а возврат false пропускает ревалидацию и экономит запросы на маршрутах, где данные не менялись. Отрисовку, элемент ошибки и сам action он не управляет.'
      ),
    },
    {
      id: 'router-q45',
      question: L(
        'When is the errorElement of a route rendered?',
        'Когда отрисовывается errorElement маршрута?'
      ),
      options: [
        L('While the loader is still running', 'Пока loader ещё выполняется'),
        L('Instead of the element of the route, when the route throws', 'Вместо элемента маршрута, когда маршрут бросает ошибку'),
        L('Whenever the route has no children', 'Всегда, когда у маршрута нет детей'),
        L('After every successful navigation', 'После каждой успешной навигации'),
      ],
      correctIndex: 1,
      explanation: L(
        'The errorElement replaces the element of the route when something in that route fails, in the loader, in the action or during the render, and it is the fallback of the closest boundary. It is not a loading state and it is not related to the children of the route.',
        'errorElement заменяет элемент маршрута, когда что-то в этом маршруте падает: в loader, в action или во время рендера, и он служит запасным вариантом ближайшей границы. Это не состояние загрузки и не связано с детьми маршрута.'
      ),
    },
    {
      id: 'router-q46',
      question: L(
        'How does an error component tell a thrown response from a thrown error?',
        'Как компонент ошибки отличает брошенный Response от брошенной Error?'
      ),
      options: [
        L('With a try/catch around the hook', 'Через try/catch вокруг хука'),
        L('By reading the message of the error', 'По сообщению ошибки'),
        L('With the type guard isRouteErrorResponse, and useRouteError gives the error itself', 'Через защитник типа isRouteErrorResponse, а саму ошибку даёт useRouteError'),
        L('By comparing the status with 500', 'Сравнением статуса с 500'),
      ],
      correctIndex: 2,
      explanation: L(
        'useRouteError returns the unknown error and isRouteErrorResponse narrows it to a response with status, statusText and data, so the component can render a different message for a 404 that the loader threw on purpose and for an unexpected exception. A try/catch cannot catch an error that was thrown earlier, and the status alone does not say what kind of failure it was.',
        'useRouteError отдаёт ошибку типа unknown, а isRouteErrorResponse сужает её до Response с полями status, statusText и data, поэтому компонент может показать разные сообщения для намеренного 404 и для неожиданного исключения. try/catch не поймает ошибку, брошенную раньше, а один лишь статус не говорит о виде сбоя.'
      ),
    },
    {
      id: 'router-q47',
      question: L(
        'Where should the check for a protected page live?',
        'Где должна жить проверка доступа к защищённой странице?'
      ),
      options: [
        L('In the component, with a conditional render of the login form', 'В компоненте, с условным рендером формы входа'),
        L('In the loader, which throws a redirect before the protected data is requested', 'В loader, который бросает redirect до запроса защищённых данных'),
        L('In the reducer of the auth slice', 'В редьюсере слайса авторизации'),
        L('In a useEffect that runs after the first render', 'В useEffect, который выполняется после первого рендера'),
      ],
      correctIndex: 3,
      explanation: L(
        'A guard in the loader stops the navigation before the protected content and its loaders run, so there is no flash of protected data and no request to the protected endpoint. A check in the component renders the page first, an effect runs even later, and the auth state does not belong in a reducer.',
        'Гард в loader останавливает навигацию до запуска защищённого контента и его loaders, поэтому нет вспышки защищённых данных и запроса к закрытому эндпоинту. Проверка в компоненте сначала отрисует страницу, эффект запустится ещё позже, а состояние авторизации в редьюсере не живёт.'
      ),
    },
    {
      id: 'router-q48',
      question: L(
        'How do you split a rarely used page into its own bundle?',
        'Как вынести редко используемую страницу в отдельный бандл?'
      ),
      options: [
        L('With React.lazy for the component and a Suspense boundary around it', 'Через React.lazy для компонента и границу Suspense вокруг него'),
        L('With a dynamic import in a useEffect and a state flag', 'Через динамический импорт в useEffect и флаг состояния'),
        L('With a separate store for the page', 'Через отдельный стор для страницы'),
        L('With the defer option of the loader', 'Через опцию defer у loader'),
      ],
      correctIndex: 0,
      explanation: L(
        'React.lazy turns a dynamic import into a component that suspends until the chunk arrives, and the nearest Suspense boundary shows its fallback in the meantime, so the rest of the application stays usable. A dynamic import inside an effect with a state flag is the manual version of the same idea, a separate store has nothing to do with bundling, and defer is about streaming data inside the loader.',
        'React.lazy превращает динамический импорт в компонент, который приостанавливается до прихода чанка, а ближайшая граница Suspense показывает fallback, так что остальное приложение остаётся рабочим. Динамический импорт в эффекте с флагом — ручная версия той же идеи, отдельный стор к бандлингу отношения не имеет, а defer — про потоковую передачу данных внутри loader.'
      ),
    },
    {
      id: 'router-q49',
      question: L(
        'What does the ScrollRestoration component do?',
        'Что делает компонент ScrollRestoration?'
      ),
      options: [
        L('It scrolls the window to the top after every navigation', 'Прокручивает окно наверх после каждой навигации'),
        L('It restores the previous scroll position when the user goes back and keeps it in the session storage', 'Восстанавливает прежнюю позицию прокрутки при возврате назад и хранит её в session storage'),
        L('It blocks the scroll while a loader is running', 'Блокирует прокрутку, пока работает loader'),
        L('It adds smooth scrolling to the anchor links', 'Добавляет плавную прокрутку к якорным ссылкам'),
      ],
      correctIndex: 1,
      explanation: L(
        'ScrollRestoration keeps the scroll position of the entries in the session storage, so returning with the back button lands where the user left the page, and a new navigation starts at the top. It does not force the top on every navigation and it has nothing to do with loaders or with the smooth behaviour of the anchors.',
        'ScrollRestoration хранит позицию прокрутки записей в session storage, поэтому возврат кнопкой «назад» попадает туда, где пользователь остановился, а новая навигация начинается сверху. Он не принуждает прокрутку наверх при каждом переходе и не связан ни с loaders, ни с плавностью якорей.'
      ),
    },
    {
      id: 'router-q50',
      question: L(
        'How do you build breadcrumbs from the routes that are currently matched?',
        'Как построить хлебные крошки из текущих совпавших маршрутов?'
      ),
      options: [
        L('With useLocation and a manual list of the paths', 'Через useLocation и ручной список путей'),
        L('With a useEffect that parses the pathname', 'Через useEffect, разбирающий pathname'),
        L('With useMatches, which returns one entry per matched route with its id, pathname and loader data', 'Через useMatches, возвращающий по записи на каждый совпавший маршрут с id, pathname и данными loader'),
        L('With useParams, which contains the whole path', 'Через useParams, содержащий весь путь'),
      ],
      correctIndex: 2,
      explanation: L(
        'useMatches returns the chain of the matched routes from the outermost to the innermost, and every entry carries the id, the pathname and the data of its loader, so each crumb can use its own label and the last one can be rendered as the current page. useLocation gives only the current path, useParams only the dynamic segments, and parsing the pathname by hand breaks with every new nesting level.',
        'useMatches возвращает цепочку совпавших маршрутов от внешнего к вложенному, и в каждой записи есть id, pathname и данные его loader, поэтому у каждой крошки своя подпись, а последнюю можно отрисовать как текущую страницу. useLocation даёт только текущий путь, useParams — только динамические сегменты, а разбор pathname вручную ломается на каждом новом уровне вложенности.'
      ),
    },
  ],
};
