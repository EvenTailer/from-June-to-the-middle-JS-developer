import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactRouterChapters: Chapter[] = [
  {
    id: 'router-ch1',
    title: L('Route Trees and Navigation', 'Деревья маршрутов и навигация'),
    summary: L(
      'How a nested route configuration becomes a tree of interface, which kinds of routes exist, and how links are built without breaking the back button.',
      'Как вложенная конфигурация маршрутов превращается в дерево интерфейса, какие бывают виды маршрутов и как строить ссылки, не ломая кнопку «назад».'
    ),
    sections: [
      {
        id: 'router-ch1-s1',
        title: L('Nested routes, layout routes and index routes', 'Вложенные, layout- и index-маршруты'),
        body: L(
          'A route configuration is a tree. Each node contributes a piece of the URL path and a piece of the interface, and a request for `/users/42` walks the tree, finds the branch whose segments match, and renders every element along it, nesting each one inside the previous. A parent that only contributes a path is a grouping node; a parent that contributes an element is a layout route rendering an `Outlet` where the matched child appears.\n\nThe path of a child is relative to its parent unless it starts with a slash, which makes it absolute. That rule is the source of most routing bugs: a child declared as `path="users/:id"` under a parent with `path="app"` produces `/app/users/:id`, and without a parent it produces `/users/:id`. Relative paths keep a subtree movable: the whole branch can be mounted under another prefix without touching its children.\n\nAn index route has no path of its own and renders when the parent path matches exactly. It is the child route of `/users` that shows the list, while `/users/:id` shows one user. The index route is the only one that may sit at the same level as the parent path, and if a parent has none then `/users` matches nothing and the router falls through to the next candidate or to the not-found route.',
          'Index-маршрут не имеет собственного пути и рендерится, когда путь родителя совпадает точно. Это тот дочерний маршрут `/users`, который показывает список, тогда как `/users/:id` показывает одну запись. Index-маршрут — единственный, который может лежать на одном уровне с путём родителя, и если у родителя нет index-маршрута, то `/users` не совпадает ни с чем и роутер переходит к следующему кандидату или к странице «не найдено».\n\nПуть ребёнка относителен к родителю, если не начинается со слэша, а слэш делает его абсолютным от корня. Именно это правило служит источником большинства ошибок маршрутизации: ребёнок с `path="users/:id"` под родителем с `path="app"` даёт `/app/users/:id`, а тот же ребёнок без родителя даёт `/users/:id`. Относительные пути делают поддерево переносимым: всю ветку можно подвесить под другой префикс, не трогая её детей.\n\nIndex-маршрут не имеет собственного пути и рендерится, когда путь родителя совпадает точно. Это тот дочерний маршрут `/users`, который показывает список, тогда как `/users/:id` показывает одну запись. Index-маршрут — единственный, который может лежать на одном уровне с путём родителя, и если у родителя нет index-маршрута, то `/users` не совпадает ни с чем и роутер переходит к следующему кандидату или к странице «не найдено». Layout-маршруты без пути — крайний случай той же идеи: они оборачивают детей общим интерфейсом, не занимая ни одного сегмента пути.',
        ),
        bullets: [
          L('Every matched route renders, nested one inside the next.', 'Каждый совпавший маршрут рендерится, вложенный в предыдущий.'),
          L('A child path without a leading slash is relative to its parent.', 'Путь ребёнка без ведущего слэша относителен к родителю.'),
          L('A layout route renders an Outlet where the child appears.', 'Layout-маршрут рисует Outlet там, где появляется ребёнок.'),
          L('Without an index route the path of the parent matches nothing.', 'Без index-маршрута путь родителя не совпадает ни с чем.'),
        ],
        code: `<Routes>
  <Route path="/app" element={<AppLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="users" element={<UsersLayout />}>
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserPage />} />
    </Route>
  </Route>
</Routes>`,
        takeaway: L(
          'Paths build the URL tree, elements build the interface tree, and they are matched together.',
          'Пути строят дерево URL, элементы — дерево интерфейса, и сопоставляются они вместе.'
        ),
      },
      {
        id: 'router-ch1-s2',
        title: L('Pathless routes, splat routes and Outlet', 'Pathless-маршруты, splat-маршруты и Outlet'),
        body: L(
          '`Outlet` is the placeholder where a child route renders. A layout route that forgets it shows an empty area; one that renders the outlet in the wrong place scrambles the nesting. The order of elements in the parent decides where the child appears, so a sidebar, a header and a content area are three siblings, with the `Outlet` marking the content slot. `useOutletContext` passes values from the layout down to the child without adding a prop to every intermediate component.\n\nA splat route is written as `path="*"` and matches any number of remaining segments. It is the standard way to build a 404 page, and it can capture the unmatched part: `path="docs/*"` puts the remaining path into `params["*"]`, so a documentation viewer can route inside itself. Splat routes rank lowest in the matching algorithm, so a specific route always wins over the catch-all whatever the order.\n\n`Outlet` is the placeholder where a child route renders. A layout route that forgets it shows an empty area; one that renders the outlet in the wrong place scrambles the nesting. The order of elements in the parent decides where the child appears, so the `Outlet` marks which sibling is the content slot. `useOutletContext` passes values from the layout down to the child without adding a prop to every intermediate component.',
          'Pathless-маршрут — это маршрут с элементом и без пути. Он совпадает со всем, что внутри него, и ничего не добавляет к URL, что делает его правильным инструментом для общей обвязки, не привязанной к сегменту URL: обёртки с требованием входа, границы ошибок, слоя модальных окон, которому не нужно менять адресную строку. Цена в том, что у pathless-маршрута должны быть дети, иначе он ничего полезного не отрисует.\n\nSplat-маршрут записывается как `path="*"` и совпадает с любым числом оставшихся сегментов. Это стандартный способ сделать страницу 404, а заодно он умеет захватывать несовпавшую часть: `path="docs/*"` кладёт остаток пути в `params["*"]`, и просмотрщик документации может маршрутизировать внутри себя. Splat-маршруты имеют низший ранг в алгоритме сопоставления, поэтому конкретный маршрут всегда побеждает catch-all независимо от порядка объявления.\n\n`Outlet` — это место, где рендерится дочерний маршрут. Layout-маршрут, который о нём забыл, покажет пустую область; layout-маршрут, который поставил outlet не туда, путает вложенность. Порядок элементов в родителе определяет, где появится ребёнок, поэтому сайдбар, шапка и область контента — три соседа в JSX родителя, а `Outlet` отмечает, кто из них является местом для содержимого. `useOutletContext` передаёт значения от layout к ребёнку, не добавляя проп каждому промежуточному компоненту.',
        ),
        bullets: [
          L('A pathless route contributes no URL segment but still renders.', 'Pathless-маршрут не добавляет сегмент URL, но всё равно рендерится.'),
          L('A splat route matches any leftover path and ranks lowest.', 'Splat-маршрут ловит любой остаток пути и имеет низший ранг.'),
          L('Outlet marks the slot where the matched child renders.', 'Outlet — это слот, в котором рендерится совпавший ребёнок.'),
          L('useOutletContext passes layout data down without prop drilling.', 'useOutletContext передаёт данные layout вниз без prop drilling.'),
        ],
        code: `<Routes>
  <Route element={<RequireAuth />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="settings" element={<Settings />} />
  </Route>
  <Route path="docs/*" element={<DocsViewer />} />
  <Route path="*" element={<NotFound />} />
</Routes>`,
        takeaway: L(
          'Use pathless routes for shared chrome, splat routes for the tail of the URL.',
          'Pathless-маршруты — для общей обвязки, splat-маршруты — для хвоста URL.'
        ),
      },
      {
        id: 'router-ch1-s3',
        title: L('Link, NavLink and relative navigation', 'Link, NavLink и относительная навигация'),
        body: L(
          '`Link` renders a real anchor and keeps the middle click, the right click and the keyboard behaviour people expect, but it intercepts the click and asks the router to change the location through the history API instead of reloading the page. That is why `Link` beats a plain `<a href>` for internal navigation: a full page reload throws away the React tree, the store and every cache. An external destination still belongs in a plain anchor.\n\n`NavLink` is a `Link` that knows whether it is active for the current location. It sets `aria-current="page"` and lets the `className` or `style` prop be a function receiving `{ isActive, isPending }`, so a navigation item highlights itself without state of its own. It accepts `end` to require a full match, for a link to `/` that must not stay active on nested pages.\n\nNavigation can be absolute or relative. An absolute path starts with `/` and is resolved from the root of the router, ignoring the current route. A relative path is resolved against the current route, and `..` moves up one level, so `to="../edit"` from `/users/42` reaches `/users/edit`. Relative links keep a feature folder self-contained: mount the branch under another prefix and the links still work. The `useNavigate` hook offers the same choice and accepts a history delta such as `-1`.',
          '`Link` рисует настоящую ссылку-anchor, и это сохраняет открытие средней кнопкой, правой кнопкой и поведение с клавиатуры, к которому люди привыкли, но перехватывает щелчок и просит роутер сменить местоположение через history API вместо перезагрузки документа. Именно поэтому для внутренней навигации `Link` лучше обычного `<a href>`: полная перезагрузка выбрасывает дерево React, стор и все кеши. Внешний адрес всё равно требует обычного anchor.\n\n`NavLink` — это `Link`, который знает, активен ли он для текущего местоположения. Он ставит `aria-current="page"` и позволяет пропу `className` или `style` быть функцией, получающей `{ isActive, isPending }`, так что пункт меню подсвечивает себя сам, без собственного состояния. Он принимает `end`, требующий полного совпадения, — это нужно ссылке на `/`, чтобы не оставаться активной на каждой вложенной странице.\n\nНавигация бывает абсолютной и относительной. Абсолютный путь начинается с `/` и разрешается от корня роутера, игнорируя текущий маршрут. Относительный путь разрешается относительно текущего маршрута, а `..` поднимает на уровень выше, поэтому `to="../edit"` из `/users/42` ведёт в `/users/edit`. Относительные ссылки делают папку фичи самодостаточной: если всю ветку подвесить под другой префикс, ссылки внутри неё продолжат работать. Хук `useNavigate` даёт тот же выбор для программной навигации и вдобавок принимает дельту истории, например `-1`, чтобы вернуться назад.',
        ),
        bullets: [
          L('Link renders an anchor but navigates without reloading the page.', 'Link рисует anchor, но навигирует без перезагрузки страницы.'),
          L('NavLink exposes isActive and isPending to its className function.', 'NavLink передаёт isActive и isPending в функцию className.'),
          L('The end prop activates a link only on an exact match.', 'Проп end включает ссылку только при точном совпадении.'),
          L('Relative links keep a feature branch movable.', 'Относительные ссылки делают ветку фичи переносимой.'),
        ],
        code: `<NavLink
  to="/users"
  end
  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
>
  Users
</NavLink>

const navigate = useNavigate();
navigate('../edit', { state: { from: 'list' } });
navigate(-1);`,
        takeaway: L(
          'Absolute links for global destinations, relative links for movable branches.',
          'Абсолютные ссылки для глобальных целей, относительные — для переносимых веток.'
        ),
      },
    ],
  },
  {
    id: 'router-ch2',
    title: L('Data in the URL', 'Данные в URL'),
    summary: L(
      'How path parameters, query strings and navigation state each carry a different kind of data, and how to choose between them.',
      'Как параметры пути, строка запроса и состояние навигации несут разные виды данных и как выбрать между ними.'
    ),
    sections: [
      {
        id: 'router-ch2-s1',
        title: L('Path parameters with useParams', 'Параметры пути и useParams'),
        body: L(
          'A path parameter names a resource in the URL: `/users/42/posts/7`. The router captures the values and exposes them through `useParams` as an object of strings, keyed by the names in the pattern. The value is always a string, even when it looks like a number, so anything that needs a real number or a date must be parsed and validated explicitly.\n\nPath parameters identify what the page is about, and that is the test for putting something in the path. If two values must produce two pages that can be linked, bookmarked and shared, it belongs in the path. If it only filters or configures the current view, it belongs in the query string. A profile page at `/users/42` is addressable; a profile page filtered to posts only is a different resource and belongs behind a query parameter.\n\nBecause the parameter is part of the path, changing it is a navigation: the router unmounts the old route and mounts the new one, running loaders again and discarding the state that was local to the previous parameter. That is a feature when the parameter identifies a genuinely different thing and a nuisance when it is only a filter. The optional syntax `path="search/:query?"` lets the same route serve the empty and the filled case without a redirect.',
          'Параметр пути называет ресурс в URL: `/users/42/posts/7`. Роутер перехватывает значения и отдаёт их через `useParams` как объект строк, ключи которого совпадают с именами в шаблоне. Значение всегда строка, даже когда выглядит как число, поэтому всё, что требует настоящего числа или даты, нужно разобрать и проверить явно.\n\nПараметры пути определяют, о чём страница, и это и есть проверка на то, что класть в путь. Если два разных значения должны давать две разные страницы, на которые можно дать ссылку, добавить в закладки и поделиться, — это путь. Если значение лишь фильтрует или настраивает текущий вид, — это строка запроса. Страница профиля по адресу `/users/42` адресуема; та же страница, отфильтрованная до одних постов, — другой ресурс, и ей место за параметром запроса.\n\nПоскольку параметр входит в путь, его смена — это навигация: роутер размонтирует старый маршрут и монтирует новый, заново выполняет loaders и выбрасывает состояние, принадлежавшее прежнему параметру. Это преимущество, когда параметр обозначает действительно другое, и помеха, когда он лишь фильтр. Синтаксис необязательного параметра `path="search/:query?"` позволяет одному маршруту обслуживать и пустой, и заполненный случай без редиректа.',
        ),
        bullets: [
          L('useParams returns strings keyed by the names in the route pattern.', 'useParams возвращает строки по именам из шаблона маршрута.'),
          L('Path parameters identify the resource, and the route is remounted when they change.', 'Параметры пути определяют ресурс, и при их смене маршрут перемонтируется.'),
          L('Parse and validate path parameters, because they arrive as strings.', 'Параметры пути нужно разбирать и проверять, они приходят строками.'),
          L('Optional parameters let one route serve two URL shapes.', 'Необязательные параметры позволяют одному маршруту обслуживать два вида URL.'),
        ],
        code: `<Route path="/users/:userId/posts/:postId" element={<Post />} />

function Post() {
  const { userId, postId } = useParams();
  const id = Number(postId);

  if (!Number.isInteger(id)) {
    throw new Response('Bad post id', { status: 400 });
  }
  return <PostBody postId={id} userId={userId} />;
}`,
        takeaway: L(
          'Put what identifies the page in the path, and parse it before you trust it.',
          'Кладите в путь то, что определяет страницу, и разбирайте это перед использованием.'
        ),
      },
      {
        id: 'router-ch2-s2',
        title: L('Query strings with useSearchParams', 'Строка запроса и useSearchParams'),
        body: L(
          'The query string after the `?` in the URL is the natural place for the state of a view: the current page of a table, a search term, a sort order or a date range. `useSearchParams` returns a tuple: an object with a `get` method for reading and a `setSearchParams` function for writing. Writing replaces the current history entry by default, which keeps the back button from walking through every keystroke of a search.\n\nThe `setSearchParams` function accepts a plain object, which replaces the whole query string, or a callback that receives the current parameters and returns the next ones. The callback form makes partial updates possible: `setSearchParams((params) => { params.set("page", "2"); return params; })` changes one parameter and leaves the rest alone. Reading a missing parameter returns `null`, not `undefined`, so a default has to be written explicitly.\n\nFilters in the query string have two advantages over component state: the URL can be shared and bookmarked, and the back button restores the previous filter set. The cost is that a change of query string is a navigation, so writing to it on every keystroke produces many history entries and re-runs of the loaders. The usual compromise is to keep the text field in local state and push it into the URL on submit or on a debounce.',
          'Строка запроса — это всё после `?` в URL, и это естественное место для состояния вида: текущая страница таблицы, поисковый запрос, выбранная сортировка, диапазон дат. `useSearchParams` возвращает пару: объект с методом `get` для чтения и функцию `setSearchParams` для записи. Запись по умолчанию заменяет текущую запись в истории, благодаря чему кнопка «назад» не проходит по каждому нажатию клавиши в поиске.\n\nФункция `setSearchParams` принимает либо обычный объект, который заменяет строку запроса целиком, либо функцию, получающую текущие параметры и возвращающую следующие. Именно форма с функцией позволяет менять часть параметров: `setSearchParams((params) => { params.set("page", "2"); return params; })` меняет один параметр и не трогает остальные. Чтение отсутствующего параметра возвращает `null`, а не `undefined`, поэтому значение по умолчанию приходится задавать явно.\n\nФильтры, живущие в строке запроса, дают два преимущества перед состоянием компонента: ссылку на URL можно переслать и добавить в закладки, а кнопка «назад» восстанавливает предыдущий набор фильтров. Цена в том, что изменение строки запроса — это навигация, поэтому компонент, пишущий в неё на каждое нажатие клавиши, порождает множество записей истории и множество перезапусков loaders. Обычный компромисс: текстовое поле держится в локальном состоянии, а в URL значение попадает по отправке или с задержкой.',
        ),
        bullets: [
          L('The query string holds the state of the view: page, sort, filters, search.', 'Строка запроса хранит состояние вида: страница, сортировка, фильтры, поиск.'),
          L('setSearchParams replaces the query string unless you pass a callback.', 'setSearchParams заменяет строку запроса, если не передан обратный вызов.'),
          L('A missing parameter reads as null, not undefined.', 'Отсутствующий параметр читается как null, а не undefined.'),
          L('Writing to the URL on every keystroke pollutes the history.', 'Запись в URL на каждое нажатие засоряет историю.'),
        ],
        code: `const [searchParams, setSearchParams] = useSearchParams();
const page = Number(searchParams.get('page') ?? '1');
const sort = searchParams.get('sort') ?? 'createdAt';

function changeSort(next: string) {
  setSearchParams((params) => {
    params.set('sort', next);
    params.set('page', '1');
    return params;
  });
}`,
        takeaway: L(
          'Query parameters describe how the page is displayed, path parameters describe what it is.',
          'Параметры запроса описывают вид страницы, параметры пути — что это за страница.'
        ),
      },
      {
        id: 'router-ch2-s3',
        title: L('Location state and choosing where data lives', 'Состояние навигации и выбор места для данных'),
        body: L(
          '`useLocation` returns the current location: pathname, search string, hash and a `state` object. The state is set by whoever performed the navigation, through the `state` prop of `Link` or the second argument of `navigate`. It is the one part of the URL invisible to the user, ideal for data describing the transition rather than the destination: where the user came from, which row was clicked, a flash message.\n\nThe catch is that location state is not durable. It lives in the history entry, so it survives a reload of the same entry in some browsers but disappears when the page opens in a new tab, and it is gone if the destination is reached another way. The rule is simple: if the user must be able to arrive at the destination and see the same thing, the data belongs in the URL. Location state decorates the transition.\n\nThe decision can be made with a short checklist. Can the user copy the URL, and should a colleague see the same screen? Then the data is in the URL. Should the back button restore the previous variant of the screen? Then it is in the URL too. Is the data useful only for the navigation that just happened, like a toast message or a scroll target? Then it is state.',
          '`useLocation` возвращает текущее местоположение: pathname, строку запроса, хеш и объект `state`. Состояние задаёт тот, кто выполнил навигацию, через проп `state` у `Link` или через второй аргумент `navigate`. Это единственная часть URL, невидимая пользователю, а значит она идеально подходит для данных, описывающих переход, а не назначение: откуда пришёл пользователь, какую строку нажали, всплывающее сообщение.\n\nЗагвоздка в том, что состояние местоположения недолговечно. Оно живёт в записи истории, поэтому в некоторых браузерах переживает перезагрузку той же записи, но исчезает, когда пользователь открывает страницу в новой вкладке, и пропадает совсем, если на страницу попали другим путём. Правило простое: если пользователь должен иметь возможность прийти на страницу и увидеть то же самое, данные лежат в URL, в пути или в строке запроса. Состояние местоположения — это украшение перехода.\n\nРешение принимается по короткому списку. Может ли пользователь скопировать URL, отправить коллеге, и коллега должен увидеть тот же экран? Тогда данные в URL. Должна ли кнопка «назад» возвращать предыдущий вариант экрана? Тоже в URL. Нужны ли данные только для того перехода, который только что произошёл, например всплывающее сообщение или цель прокрутки? Тогда это состояние. Всё, что обязано пережить перезагрузку или пересланную ссылку, в состоянии жить не может.',
        ),
        bullets: [
          L('Location state describes the transition, not the destination.', 'Состояние местоположения описывает переход, а не назначение.'),
          L('State is lost when the URL is opened fresh or shared.', 'Состояние теряется, когда URL открывают заново или передают другому.'),
          L('Anything that must survive a reload belongs in the URL.', 'Всё, что должно пережить перезагрузку, принадлежит URL.'),
          L('State is the right place for toasts, return targets and scroll hints.', 'Состояние — правильное место для тостов, точки возврата и подсказок прокрутки.'),
        ],
        code: `<Link to={\`/users/\${user.id}\`} state={{ from: '/team', highlight: true }}>
  {user.name}
</Link>

function UserPage() {
  const { highlight } = useLocation().state as { highlight?: boolean } | null;
  return <Profile highlighted={highlight === true} />;
}`,
        takeaway: L(
          'Put it in the URL if it must survive a reload, in state if it only describes the jump.',
          'Кладите в URL то, что должно пережить перезагрузку, в состояние — то, что описывает лишь переход.'
        ),
      },
    ],
  },
  {
    id: 'router-ch3',
    title: L('The Data Router', 'Data-роутер'),
    summary: L(
      'How loaders and actions move data fetching into the router, what useLoaderData and useActionData return, and how errors and deferred data are handled.',
      'Как loaders и actions переносят загрузку данных в роутер, что возвращают useLoaderData и useActionData и как обрабатываются ошибки и отложенные данные.'
    ),
    sections: [
      {
        id: 'router-ch3-s1',
        title: L('Loaders and useLoaderData', 'Loaders и useLoaderData'),
        body: L(
          'A data router is created with `createBrowserRouter` and rendered with `RouterProvider`. Instead of fetching inside a component, a route can declare a `loader`: an async function that runs before the route renders and returns the data it needs. The router calls the loaders of all matched routes in parallel and only then renders the route. The data is available through `useLoaderData`.\n\nThe loader receives a request object, route parameters and context. It can return a plain object or a `Response` built with the `json` helper, which tells the router the status code. It can also throw a `Response` to signal a failure, or return a `redirect` to send the user elsewhere, and both are handled before the element renders. That makes the loader a good place for validation: if the parameter is wrong, throw a 400 instead of rendering a broken page.\n\nThe benefit is that the data belongs to the route, not to the component. Two sibling routes can request different data and the router fetches both, and navigating away discards the data with the route. The drawback is that the loader runs outside React, so it cannot use hooks, context or the store. The usual solution is to pass what is needed through the router context or `extra`, and to keep the loader focused on one resource.',
          'Data-роутер создаётся через `createBrowserRouter` и отрисовывается через `RouterProvider`. Вместо загрузки данных внутри компонента маршрут может объявить `loader`: асинхронную функцию, которая выполняется до рендера маршрута и возвращает нужные данные. Роутер вызывает loaders всех совпавших маршрутов параллельно, дожидается их и только после этого рендерит. Данные доступны через `useLoaderData`.\n\nLoader получает объект запроса, параметры маршрута и контекст. Он может вернуть обычный объект или `Response`, собранный хелпером `json`, который сообщает роутеру код статуса и заголовки. Loader может также бросить `Response`, чтобы сообщить об ошибке, или вернуть `redirect`, чтобы увести пользователя, и то и другое роутер обрабатывает до того, как элемент будет отрисован. Это делает loader хорошим местом для проверки входных данных: если параметр неверен, бросьте 400 вместо отрисовки сломанной страницы.\n\nГлавное преимущество в том, что данные принадлежат маршруту, а не компоненту. Два соседних маршрута могут запрашивать разные данные, и роутер загрузит оба сразу, а уход со страницы выбрасывает данные вместе с маршрутом. Главный недостаток в том, что loader выполняется вне React, поэтому ему недоступны хуки, контекст провайдера и стор напрямую. Обычное решение — передать нужное через контекст роутера или через `extra` роутера и держать loader сосредоточенным на одном ресурсе.',
        ),
        bullets: [
          L('Loaders run before rendering, in parallel for all matched routes.', 'Loaders выполняются до рендера, параллельно для всех совпавших маршрутов.'),
          L('useLoaderData returns the value the loader returned.', 'useLoaderData возвращает то, что вернул loader.'),
          L('Throw a Response to fail, return a redirect to move the user.', 'Бросьте Response, чтобы сообщить об ошибке, верните redirect, чтобы увести пользователя.'),
          L('Loaders run outside React, so they cannot use hooks or context.', 'Loaders выполняются вне React, поэтому им недоступны хуки и контекст.'),
        ],
        code: `const router = createBrowserRouter([
  {
    path: '/users/:id',
    loader: async ({ params, request }) => {
      const response = await fetch(\`/api/users/\${params.id}\`, { signal: request.signal });
      if (response.status === 404) throw new Response('Not found', { status: 404 });
      if (!response.ok) throw new Response('Server error', { status: 500 });
      return json({ user: await response.json() });
    },
    element: <UserPage />,
  },
]);

function UserPage() {
  const { user } = useLoaderData() as { user: User };
  return <Profile user={user} />;
}`,
        takeaway: L(
          'A loader owns the data of its route and runs before the route renders.',
          'Loader отвечает за данные своего маршрута и выполняется до рендера.'
        ),
      },
      {
        id: 'router-ch3-s2',
        title: L('Actions, forms and useActionData', 'Actions, формы и useActionData'),
        body: L(
          'Where a loader reads, an action writes. An action is an async function attached to a route that handles submissions: it receives a `Request` whose body is a `FormData`, and what it returns is available through `useActionData`. After the action finishes, the router revalidates the loaders of the affected routes, so the list the user came from stays up to date.\n\nThe `Form` component from the router submits without a full page reload: it captures the form data, sends it to the action of the matched route and re-renders with the result. A plain `<form method="post">` without an `action` attribute does the same, because the router intercepts the submit. The difference from a manual `onSubmit` handler is that the flow becomes declarative: the action is a function you can test, and validation errors travel back as data.\n\nAn action signals failure by throwing a `Response` with a status of 400 and a body describing the problem, and the component reads that body from `useActionData` or from `useRouteError` depending on where the failure was caught. Returning a `redirect` after a successful submission ends the flow: the user lands on a different route and the history entry of the form page is replaced. This gives a complete form lifecycle without any client-side state machine.',
          'Там, где loader читает, action пишет. Action — асинхронная функция, прикреплённая к маршруту и обрабатывающая отправку: она получает `Request`, тело которого является `FormData`, а то, что она возвращает, доступно компоненту через `useActionData`. Когда action завершится, роутер перепроверяет loaders затронутых маршрутов, так что список, с которого пользователь пришёл, остаётся актуальным без единой строки дополнительного кода загрузки.\n\nКомпонент `Form` из роутера отправляет данные без полной перезагрузки страницы: он собирает данные формы, отправляет их в action совпавшего маршрута и перерисовывает страницу с результатом. Обычная `<form method="post">` внутри data-роутера ведёт себя так же, если у неё нет атрибута `action`, потому что перехват отправки делает роутер. Отличие от ручного обработчика `onSubmit` в том, что поток становится декларативным: action — это функция, которую можно протестировать, а ошибки валидации возвращаются как данные, а не как брошенные исключения.\n\nAction сообщает об отказе, бросая `Response` со статусом 400 и телом, описывающим проблему, а компонент читает это тело из `useActionData` или из `useRouteError` в зависимости от того, где перехвачен отказ. Возврат `redirect` после успешной отправки завершает поток: пользователь оказывается на другом маршруте, а запись истории страницы формы заменяется. Схема даёт полный жизненный цикл формы — проверить, отправить, сообщить об ошибках, перенаправить — и не требует никакого клиентского конечного автомата.',
        ),
        bullets: [
          L('An action handles a submission, and the router revalidates loaders afterwards.', 'Action обрабатывает отправку, а после неё роутер перепроверяет loaders.'),
          L('Form submits to the action of the matched route without a reload.', 'Form отправляет данные в action совпавшего маршрута без перезагрузки.'),
          L('Throw a Response with status 400 to report validation errors.', 'Бросьте Response со статусом 400, чтобы сообщить об ошибках валидации.'),
          L('Return a redirect to end the flow and change the URL.', 'Верните redirect, чтобы завершить поток и сменить URL.'),
        ],
        code: `{
  path: '/users/new',
  action: async ({ request }) => {
    const form = await request.formData();
    const name = String(form.get('name') ?? '').trim();

    if (!name) {
      return json({ errors: { name: 'Name is required' } }, { status: 400 });
    }
    const user = await api.createUser({ name });
    return redirect(\`/users/\${user.id}\`);
  },
  element: <NewUserForm />,
}`,
        takeaway: L(
          'A form plus an action is a complete write cycle: validate, submit, report, redirect.',
          'Форма плюс action — полный цикл записи: проверить, отправить, сообщить, перенаправить.'
        ),
      },
      {
        id: 'router-ch3-s3',
        title: L('errorElement and deferred data', 'errorElement и отложенные данные'),
        body: L(
          'Every route in a data router can declare an `errorElement`. When a loader, an action or the rendering of that route throws, the router renders the error element instead, with the error available via `useRouteError`. Because the boundary is per route, an error element on a layout route catches failures from all its children.\n\nThe error object is not always an error. When a loader throws a `Response`, the router hands the error element a `Response` with the status, and `isRouteErrorResponse` tells the cases apart. A deliberate 404 and a genuine network failure take different branches, so the boundary can show a friendly message for one and a retry button for the other. A boundary that forgets the check reads `error.message` of a Response and gets `undefined`.\n\nDeferred data splits one slow request into a fast and a slow part. A loader returns the critical data and wraps the rest in `defer`, so the router renders the page as soon as the first part is ready and the slow part streams in later. The component reads it with `Await` and `resolve` inside a `Suspense` boundary that shows a placeholder while the promise is pending, and an error element for rejections. It suits a slow panel next to a fast summary, and is useless for data the page cannot render without.',
          'Каждый маршрут в data-роутере может объявить `errorElement`. Когда loader, action или сама отрисовка маршрута бросает исключение, роутер останавливается и рисует элемент ошибки вместо маршрута, а само исключение доступно через `useRouteError`. Поскольку граница задаётся на маршруте, элемент ошибки на layout-маршруте ловит сбои всех своих детей, а границы ниже уровнем имеют приоритет. Это куда более точный инструмент, чем единственная граница ошибок на всё приложение.\n\nОбъект ошибки — не всегда объект Error. Когда loader бросает `Response`, роутер отдаёт элементу ошибки объект `Response` со статусом, а `isRouteErrorResponse` позволяет отличить два случая. Намеренный 404 и настоящий сетевой сбой попадают в разные ветки, и граница может показать для одного вежливое сообщение, а для другого кнопку повтора. Граница, забывшая проверить тип, попытается прочитать `error.message` у Response и получит `undefined`.\n\nОтложенные данные делят один медленный запрос на быструю и медленную части. Loader возвращает критичные данные сразу, а остальное оборачивает в `defer`, и тогда роутер отрисовывает страницу, как только готова первая часть, а медленная приходит следом. Компонент читает их через `Await` и `resolve`, обёрнутые в границу `Suspense`, которая показывает заглушку, пока промис не разрешён, и в элемент ошибки, ловящий отклонённый промис. Это годится странице с медленной аналитикой рядом с быстрой сводкой и бесполезно для данных, без которых страница не отрисуется.',
        ),
        bullets: [
          L('errorElement is per route, and parents catch what children throw.', 'errorElement задаётся на маршруте, и родитель ловит то, что бросают дети.'),
          L('A thrown Response is not an Error, so check isRouteErrorResponse.', 'Брошенный Response — не Error, поэтому проверяйте isRouteErrorResponse.'),
          L('defer streams the slow part of a page after the fast part renders.', 'defer доставляет медленную часть страницы уже после рендера быстрой.'),
          L('Await and Suspense read deferred data, a rejection needs an error element.', 'Await и Suspense читают отложенные данные, а отказ ловит элемент ошибки.'),
        ],
        code: `import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

{
  path: '/dashboard',
  loader: () => ({
    summary: fetchSummary(),
    activity: defer(fetchActivity()),
  }),
  element: <Dashboard />,
}

function Dashboard() {
  const { summary, activity } = useLoaderData() as {
    summary: Summary;
    activity: Deferred<Promise<Activity[]>>;
  };

  return (
    <>
      <SummaryPanel summary={summary} />
      <Suspense fallback={<ActivitySkeleton />}>
        <Await resolve={activity}>{(data) => <ActivityList items={data} />}</Await>
      </Suspense>
    </>
  );
}`,
        takeaway: L(
          'Route-level error boundaries localise failures, defer keeps the fast part fast.',
          'Границы ошибок на уровне маршрута локализуют сбои, defer сохраняет быструю часть быстрой.'
        ),
      },
    ],
  },
  {
    id: 'router-ch4',
    title: L('Protection, Lazy Loading and Testing', 'Защита, ленивая загрузка и тестирование'),
    summary: L(
      'How to guard routes, split the bundle with lazy routes, restore the scroll position, build breadcrumbs and test the whole thing in memory.',
      'Как защищать маршруты, делить бандл ленивыми маршрутами, восстанавливать прокрутку, строить хлебные крошки и тестировать всё в памяти.'
    ),
    sections: [
      {
        id: 'router-ch4-s1',
        title: L('Redirects and route guards', 'Редиректы и защита маршрутов'),
        body: L(
          'A guard is a component that decides whether the current user may see the route. The straightforward version reads the session from the store and returns a `<Navigate>` to the login page with `replace` and the attempted location in the state, so the user can be sent back after signing in. Because a guard is just a component, it can also render a spinner while the session is being restored.\n\nIn a data router the more reliable place for the check is the loader. A loader runs before the route renders, so a redirect happens without the protected component being mounted or its data being requested, and there is no flash of the wrong screen. The loader can read the session from the router context and return a `redirect("/login")` or throw a 401. The same argument applies to the action: the check has to guard writes, not only reads.\n\nGuards that exist only in the client are a convenience, not a security measure. The server must enforce the same rule on every endpoint, because the API does not know which route the request came from. A client-side guard decides what to show; the server decides what is allowed. When the two disagree, the server wins, and the client must handle the 401 it receives.',
          'Гард — это компонент, который решает, может ли текущий пользователь видеть маршрут. Простейший вариант читает сессию из стора и возвращает `<Navigate>` на страницу входа с `replace` и с попыткой перейти в состоянии, чтобы после входа пользователя вернули обратно. Поскольку гард — обычный компонент, он может показать и спиннер загрузки, пока сессия ещё восстанавливается, и вот эту часть часто забывают.\n\nВ data-роутере более надёжное место для проверки — loader. Loader выполняется до рендера маршрута, поэтому редирект происходит без того, чтобы защищённый компонент когда-либо смонтировался или его данные были запрошены, и вспышки неверного экрана не происходит. Loader может прочитать сессию из контекста роутера, проверить её и вернуть `redirect("/login")` или бросить 401. Тот же довод применим к action: та же проверка обязана защищать запись, а не только чтение.\n\nГарды, существующие только на клиенте, — это удобство, а не мера безопасности. Сервер обязан обеспечивать то же правило на каждом эндпоинте, потому что API не знает, из какого маршрута пришёл запрос, и вызвать его можно напрямую. Клиентский гард решает, что показать, сервер решает, что разрешено. Когда они расходятся, выигрывает сервер, а клиент обязан обработать полученный 401, а не считать, что редирект всегда случился раньше.',
        ),
        bullets: [
          L('A guard must handle the loading state while the session is restored.', 'Гард должен обрабатывать состояние загрузки, пока сессия восстанавливается.'),
          L('A loader guard redirects before the protected route renders.', 'Гард в loader перенаправляет до рендера защищённого маршрута.'),
          L('Guard writes as well as reads, the action needs the same check.', 'Защищайте запись так же, как чтение, action требует той же проверки.'),
          L('Client guards are a convenience, the server enforces the rule.', 'Клиентский гард — удобство, правило обеспечивает сервер.'),
        ],
        code: `{
  path: '/admin',
  loader: async ({ request }) => {
    const session = await getSession(request);
    if (!session) {
      const url = new URL(request.url);
      throw redirect(\`/login?next=\${encodeURIComponent(url.pathname)}\`);
    }
    if (!session.isAdmin) throw new Response('Forbidden', { status: 403 });
    return { session };
  },
  element: <AdminLayout />,
  errorElement: <AccessDenied />,
}`,
        takeaway: L(
          'Guard the loader so the protected route never renders, and let the server have the final word.',
          'Защищайте loader, чтобы маршрут не рендерился, а решающее слово оставалось за сервером.'
        ),
      },
      {
        id: 'router-ch4-s2',
        title: L('Lazy routes, Suspense and scroll restoration', 'Ленивые маршруты, Suspense и восстановление прокрутки'),
        body: L(
          'Routes are a natural boundary for code splitting: each screen is usually a separate chunk the user needs at a specific moment. In a data router the `lazy` property takes a function returning a promise of the route definition, and the router waits for it. The element itself can also be wrapped in `React.lazy`: `lazy` on the route defers the definition and the loader, while `React.lazy` defers only the component.\n\nA lazy route needs a fallback, and the router provides one: `HydrateFallback` is rendered while the lazy chunk loads on the first visit. Inside, `React.Suspense` with a skeleton is the usual choice. The subtle failure mode is a lazy route that suspends without a Suspense boundary above it: the error mentions suspending during synchronous input, confusing until you realise the boundary is missing.\n\n`ScrollRestoration` restores the scroll position of the previous entry when the user navigates back, and scrolls to the top on a new entry. It needs a `getKey` function, because the default key is the location key, unique per navigation and useless for restoring the same page reached twice. The usual implementation returns the pathname, so a detail page restores its own offset and a list page goes back to the top. Without it, every navigation lands at the top of the document.',
          'Маршруты — естественная граница для разделения кода, потому что каждый экран обычно отдельным куском, который нужен пользователю в определённый момент. В data-роутере свойство `lazy` принимает функцию, возвращающую промис с определением маршрута, и роутер ждёт его перед рендером. Сам элемент тоже можно обернуть в `React.lazy`, и разница существенна: `lazy` на маршруте откладывает всё определение вместе с loader, а `React.lazy` откладывает только компонент, и к этому моменту loader уже отработал.\n\nЛенивому маршруту нужен запасной экран, и роутер его предоставляет: элемент `HydrateFallback` рисуется, пока ленивый кусок грузится при первом посещении. Для вложенных компонентов обычно используют `React.Suspense` со скелетоном. Тонкий отказ выглядит так: ленивый маршрут приостанавливается без границы Suspense над ним, и ошибка сообщает, что компонент приостановился во время синхронного ввода, что сбивает с толку, пока не выяснится, что дело не в данных, а в отсутствующей границе.\n\n`ScrollRestoration` восстанавливает позицию прокрутки предыдущей записи при возврате назад и прокручивает вверх на новой записи. В общем случае ему нужна функция `getKey`, потому что ключ по умолчанию — это ключ местоположения, уникальный для каждой навигации, а значит бесполезный для восстановления позиции у одной и той же страницы, открытой дважды. Обычная реализация возвращает pathname, и тогда страница деталей восстанавливает свою позицию, а список возвращается наверх. Без этого каждая навигация попадает в начало документа, и это самая частая жалоба на клиентскую маршрутизацию.',
        ),
        bullets: [
          L('Route-level lazy defers the definition and the loader together.', 'Ленивый маршрут откладывает и определение, и loader.'),
          L('React.lazy defers only the component, the loader has already run.', 'React.lazy откладывает только компонент, loader уже отработал.'),
          L('A lazy route without a Suspense boundary above it fails confusingly.', 'Ленивый маршрут без границы Suspense над ним падает непонятно.'),
          L('ScrollRestoration needs a getKey based on the pathname.', 'ScrollRestoration требует getKey на основе pathname.'),
        ],
        code: `{
  path: 'reports',
  lazy: async () => {
    const { ReportLayout } = await import('./routes/reports');
    return { Component: ReportLayout };
  },
  HydrateFallback: <ReportsSkeleton />,
  children: [
    {
      path: ':id',
      lazy: async () => {
        const { ReportPage } = await import('./routes/report');
        return { Component: ReportPage };
      },
    },
  ],
}

<ScrollRestoration getKey={(location) => location.pathname} />`,
        takeaway: L(
          'Split by route, give every lazy branch a fallback and restore scroll by pathname.',
          'Делите по маршрутам, давайте каждой ленивой ветке запасной экран и восстанавливайте прокрутку по pathname.'
        ),
      },
      {
        id: 'router-ch4-s3',
        title: L('Breadcrumbs with useMatches and testing with createMemoryRouter', 'Хлебные крошки с useMatches и тестирование с createMemoryRouter'),
        body: L(
          '`useMatches` returns the array of routes that matched the current location, from the root to the leaf. Each entry has the route id, the pathname, the params, the loader data and the handle the route declared. The `handle` property is the key: a route can attach metadata such as a breadcrumb title, and the layout reads the whole chain to render the trail without duplicating configuration.\n\nBreadcrumbs built this way stay correct when the route tree changes, because the trail is derived from the matches rather than hard-coded. A typical route declares `handle: { crumb: "Users" }` or a function of the params, and the layout maps the matches into links. A route hidden from the trail simply omits the handle, and the parent decides how to treat a match without one.\n\nTesting a router does not need a browser. `createMemoryRouter` builds the same router from the same route objects but keeps the history in memory, so a test can start at any URL with `initialEntries` and assert on what was rendered or on the state the router reached. The routes array is the single source of truth, so a test reuses the application configuration and stubs only the network layer; `createRoutesStub` does the same for a single component.',
          '`useMatches` возвращает массив маршрутов, совпавших с текущим местоположением, от корня к листу. Каждая запись содержит идентификатор маршрута, pathname, параметры, данные, вернутые loader, и объявленный маршрутом `handle`. Ключевое здесь — свойство `handle`: маршрут может прикрепить к нему произвольные метаданные, например заголовок хлебной крошки, а layout читает всю цепочку и строит по ней тропу, ничего не дублируя в конфигурации.\n\nКрошки, построенные так, остаются верными при изменении дерева маршрутов, потому что тропа выводится из совпадений, а не зашита в layout. Типичный маршрут объявляет `handle: { crumb: "Users" }` или функцию от параметров, а layout превращает совпадения в список ссылок. Маршрут, который не должен попасть в тропу, просто не объявляет handle, а родитель решает, как поступать с совпадением без него.\n\nТестировать роутер браузер не требует. `createMemoryRouter` строит тот же роутер из тех же объектов маршрутов, но хранит историю в памяти, поэтому тест может начать с любого URL через `initialEntries` и затем проверить, что отрисовано, или в каком состоянии оказался роутер. Массив маршрутов остаётся единственным источником истины, так что тест может переиспользовать конфигурацию приложения как есть, подменив только сетевой слой, а `createRoutesStub` делает то же самое для одного компонента вместе с его маршрутами.',
        ),
        bullets: [
          L('useMatches returns the whole matched chain, root first.', 'useMatches возвращает всю цепочку совпадений, начиная с корня.'),
          L('handle carries metadata such as the breadcrumb title.', 'handle несёт метаданные, например заголовок хлебной крошки.'),
          L('Breadcrumbs derived from the matches survive changes in the route tree.', 'Крошки, построенные по совпадениям, переживают изменения дерева маршрутов.'),
          L('createMemoryRouter tests the real route configuration in memory.', 'createMemoryRouter тестирует настоящую конфигурацию маршрутов в памяти.'),
        ],
        code: `{
  path: 'users/:id',
  handle: { crumb: ({ params }) => \`User \${params.id}\` },
  element: <UserPage />,
}

function Breadcrumbs() {
  const matches = useMatches();
  return (
    <nav>
      {matches.map((match) =>
        match.handle?.crumb ? (
          <Link key={match.id} to={match.pathname}>
            {match.handle.crumb(match.params)}
          </Link>
        ) : null,
      )}
    </nav>
  );
}

const router = createMemoryRouter(routes, { initialEntries: ['/users/42'] });
render(<RouterProvider router={router} />);`,
        takeaway: L(
          'Derive breadcrumbs from the matches and test the real route tree in memory.',
          'Строите крошки по совпадениям и тестируйте настоящее дерево маршрутов в памяти.'
        ),
      },
    ],
  },
];
