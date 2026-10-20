import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh01: Chapter = {
  id: 'router-ch1',
  title: L('Route trees and navigation', 'Деревья маршрутов и навигация'),
  summary: L(
    'How a configuration of route objects becomes a tree of interface: nested, layout, index, pathless and splat routes, how Outlet renders them, and how links and programmatic navigation move between the branches.',
    'Как конфигурация объектов маршрутов превращается в дерево интерфейса: вложенные маршруты, layout-, index-, маршруты без пути и сплат-маршруты, как их отрисовывает Outlet и как ссылки и программная навигация перемещают между ветками.'
  ),
  sections: [
    {
      id: 'router-ch1-s1',
      title: L('Nested routes, layout routes and index routes', 'Вложенные, layout- и index-маршруты'),
      body: L(
        'A data router is configured with an array of route objects, and that array is a tree. Each object contributes a piece of the URL path, a piece of the interface, or both. A request for /users/42 walks the tree, finds the branch whose segments match, and renders every element along that branch, each one nested inside the previous one. The path segments decide which branch is taken; the elements decide what the user sees.\n\nThe path of a child is relative to its parent unless it starts with a slash, which makes it absolute from the root of the router. This single rule explains most routing bugs: path "users/:id" under a parent with path "app" produces /app/users/:id, while the same child without that parent produces /users/:id. Relative paths keep a subtree movable, because the whole branch can be mounted under another prefix without touching its children.\n\nA route with an element and no path of its own is a layout route: it adds no segment to the URL and renders its children through an Outlet. An index route is the opposite case: it carries no path either, but it renders when the path of the parent matches exactly, which makes it the default child of /users, while /users/:id is a sibling that matches one user.\n\nIf a parent has no index route, its own path matches nothing and the router falls through to the next candidate or to the not-found route. That fall-through is silent, which is why a list page that renders an empty shell is almost always a missing index route rather than a broken component.',
        'Data-роутер настраивается массивом объектов маршрутов, и этот массив — дерево. Каждый объект добавляет часть пути URL, часть интерфейса или и то и другое. Запрос /users/42 обходит дерево, находит ветку, чьи сегменты совпали, и отрисовывает все её элементы, вкладывая каждый в предыдущий. Сегменты пути решают, какая ветка выбрана, а элементы — что увидит пользователь.\n\nПуть ребёнка относителен к родителю, если не начинается со слэша, а слэш делает его абсолютным от корня роутера. Именно это правило объясняет большинство ошибок маршрутизации: path "users/:id" под родителем с path "app" даёт /app/users/:id, а тот же ребёнок без такого родителя даёт /users/:id. Относительные пути делают поддерево переносимым: всю ветку можно подвесить под другой префикс, не трогая её детей.\n\nМаршрут с элементом и без собственного пути — это layout-маршрут: он не добавляет сегмент к URL и отрисовывает своих детей через Outlet. Index-маршрут — обратный случай: пути у него тоже нет, но он рендерится, когда путь родителя совпадает точно, поэтому он становится маршрутом по умолчанию для /users, тогда как /users/:id — его сосед, отвечающий за одного пользователя.\n\nЕсли у родителя нет index-маршрута, его собственный путь не совпадает ни с чем, и роутер переходит к следующему кандидату или к странице «не найдено». Этот переход происходит молча, поэтому пустая оболочка вместо списка почти всегда означает отсутствующий index-маршрут, а не сломанный компонент.'
      ),
      bullets: [
        L('A route object contributes a path, an element, or both; children form the tree.', 'Объект маршрута даёт путь, элемент или и то и другое; дети образуют дерево.'),
        L('A child path without a leading slash is relative to its parent.', 'Путь ребёнка без ведущего слэша относителен к родителю.'),
        L('A layout route adds no path segment and renders its children through an Outlet.', 'Layout-маршрут не добавляет сегмент пути и рисует детей через Outlet.'),
        L('An index route renders when the path of the parent matches exactly.', 'Index-маршрут рендерится, когда путь родителя совпадает точно.'),
        L('Without an index route the path of the parent matches nothing.', 'Без index-маршрута путь родителя не совпадает ни с чем.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/app',            // prefix for every child below
    element: <AppLayout />,  // layout route: children render in its Outlet
    children: [
      { index: true, element: <Dashboard /> },      // matches /app exactly
      {
        path: 'users',       // relative, so the URL is /app/users
        element: <UsersLayout />,
        children: [
          { index: true, element: <UserList /> },   // matches /app/users
          { path: ':id', element: <UserPage /> },    // matches /app/users/42
        ],
      },
    ],
  },
]);`,
      table: {
        caption: L('Route object kinds and what each one adds', 'Виды объектов маршрута и что каждый добавляет'),
        headers: [L('Kind', 'Вид'), L('Path', 'Путь'), L('What it matches', 'Что совпадает')],
        rows: [
          [
            L('Layout route', 'Layout-маршрут'),
            L('none', 'нет'),
            L('anything nested inside the parent', 'любой вложенный маршрут'),
          ],
          [
            L('Index route', 'Index-маршрут'),
            L('index: true', 'index: true'),
            L('the path of the parent, exactly', 'путь родителя, точно'),
          ],
          [
            L('Child route', 'Дочерний маршрут'),
            L('a relative path', 'относительный путь'),
            L('the parent path plus one segment', 'путь родителя плюс сегмент'),
          ],
          [
            L('Splat route', 'Сплат-маршрут'),
            L('*', '*'),
            L('the parent path plus any tail', 'путь родителя плюс любой хвост'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A slash changes the meaning', 'Слэш меняет смысл'),
          text: L(
            'A leading slash in a child path makes it absolute, so the branch silently stops nesting under its parent and the layout around it disappears. Write child paths relative and let the parent decide the prefix.',
            'Ведущий слэш в пути ребёнка делает его абсолютным, ветка перестаёт вкладываться в родителя, и общая обвязка вокруг неё исчезает. Пишите пути детей относительными, а префикс пусть задаёт родитель.'
          ),
        },
      ],
      takeaway: L(
        'Paths build the URL tree, elements build the interface tree, and an index route is what makes the path of the parent itself reachable.',
        'Пути строят дерево URL, элементы — дерево интерфейса, а index-маршрут делает доступным сам путь родителя.'
      ),
      seeAlso: [
        L('Section 1-2: pathless routes and splat routes', 'Секция 1-2: маршруты без пути и сплат-маршруты'),
        L('Section 1-3: Outlet and the layout hierarchy', 'Секция 1-3: Outlet и иерархия layout-маршрутов'),
        L('Chapter 3: the data router and its route objects', 'Глава 3: data-роутер и его объекты маршрутов'),
      ],
    },
    {
      id: 'router-ch1-s2',
      title: L('Pathless routes and splat routes', 'Маршруты без пути и сплат-маршруты'),
      body: L(
        'A pathless route has an element and no path, so it matches everything inside its parent and contributes nothing to the URL. That makes it the right tool for shared chrome that is not tied to a segment: an authentication wrapper, an error boundary, a modal layer that should not change the address bar. The price is that a pathless route needs children, because on its own it renders an Outlet with nothing in it.\n\nA splat route is written as path "*" and matches any number of remaining segments. It is the standard way to build the not-found page, and it can capture what did not match: path "docs/*" puts the rest of the path into params["*"], so a documentation viewer can route inside itself. Splat routes rank lowest in the matching order, so a specific route always wins over the catch-all.\n\nBoth kinds exist to keep a URL clean. A pathless route lets you group routes that belong together without inventing a segment for the group, and a splat route lets one route handle an open-ended tail instead of enumerating every possible depth. The trap runs in the opposite direction: if you find several splat routes and switch on the captured string inside one component, you have rebuilt a router by hand and thrown away the tree.',
        'Маршрут без пути — это элемент без path: он совпадает со всем, что внутри родителя, и ничего не добавляет к URL. Поэтому он подходит для общей обвязки, не привязанной к сегменту: обёртки с требованием входа, границы ошибок, слоя модальных окон, которому не нужно менять адресную строку. Обратная сторона: у маршрута без пути должны быть дети, иначе он отрисует Outlet, в котором пусто.\n\nСплат-маршрут записывается как path "*" и совпадает с любым числом оставшихся сегментов. Это стандартный способ сделать страницу «не найдено», а заодно он умеет захватывать несовпавшую часть: path "docs/*" кладёт остаток пути в params["*"], и просмотрщик документации может маршрутизировать внутри себя. Сплат-маршруты имеют низший ранг в порядке сопоставления, поэтому конкретный маршрут всегда побеждает catch-all.\n\nОба вида существуют ради чистоты URL. Маршрут без пути позволяет сгруппировать родственные маршруты, не выдумывая сегмент для группы, а сплат-маршрут позволяет обработать открытый хвост, не перечисляя все возможные глубины. Ловушка работает в обратную сторону: если в проекте появляется несколько сплат-маршрутов и один компонент переключает захваченную строку вручную, вы пересобрали роутер вручную и выбросили дерево.'
      ),
      bullets: [
        L('A pathless route matches any child and adds no segment to the URL.', 'Маршрут без пути совпадает с любым ребёнком и не добавляет сегмент URL.'),
        L('A pathless route without children renders nothing useful.', 'Маршрут без пути без детей не рисует ничего полезного.'),
        L('A splat route matches any remaining segments and ranks lowest.', 'Сплат-маршрут ловит любой остаток сегментов и имеет низший ранг.'),
        L('The unmatched tail of path "docs/*" is available as params["*"].', 'Несовпавший хвост path "docs/*" доступен как params["*"].'),
        L('A specific route always beats a splat route, whatever the order.', 'Конкретный маршрут всегда побеждает сплат-маршрут независимо от порядка.'),
      ],
      code: `const router = createBrowserRouter([
  {
    element: <RequireAuth />,      // pathless: adds no URL segment
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: 'docs/*', element: <DocsViewer /> },  // params['*'] holds the tail
  { path: '*', element: <NotFound /> },          // lowest rank, runs last
]);

function DocsViewer() {
  const params = useParams();
  return <Doc path={params['*'] ?? ''} />;
}`,
      table: {
        caption: L('Two kinds that keep the URL clean', 'Два вида маршрутов, которые не засоряют URL'),
        headers: [L('Kind', 'Вид'), L('Adds a segment', 'Добавляет сегмент'), L('Typical use', 'Типичное применение')],
        rows: [
          [
            L('Pathless', 'Без пути'),
            L('no', 'нет'),
            L('shared wrappers, guards, error shells', 'общие обёртки, защита, оболочки ошибок'),
          ],
          [
            L('Splat', 'Сплат'),
            L('no, it consumes the tail', 'нет, поглощает хвост'),
            L('not found pages, catch-all views', 'страница «не найдено», catch-all'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('One splat at the end', 'Один сплат в конце'),
          text: L(
            'A splat route is a promise that everything below it is unknown. Keep one per level of the tree, at the end of the branch, and let it render a not-found page. Several splat routes in one tree usually mean the tree needs new real routes instead.',
            'Сплат-маршрут — это обещание, что всё, что ниже, неизвестно. Держите по одному на уровень дерева, в конце ветки, и рисуйте в нём страницу «не найдено». Несколько сплат-маршрутов в дереве обычно означают, что дереву нужны настоящие маршруты.'
          ),
        },
      ],
      takeaway: L(
        'Use a pathless route to group routes without adding a URL segment, and a splat route only for the open tail of the URL.',
        'Маршрут без пути группирует маршруты, не добавляя сегмент URL, а сплат-маршрут нужен только для открытого хвоста URL.'
      ),
      seeAlso: [
        L('Section 1-1: nested routes, layout routes and index routes', 'Секция 1-1: вложенные, layout- и index-маршруты'),
        L('Section 4-1: redirects and route guards', 'Секция 4-1: перенаправления и защита маршрутов'),
      ],
    },
    {
      id: 'router-ch1-s3',
      title: L('Outlet and the layout hierarchy', 'Outlet и иерархия layout-маршрутов'),
      body: L(
        'Outlet is the placeholder where a matched child route renders. A layout route that forgets it shows an empty content area, and one that puts it in the wrong place scrambles the hierarchy, so the sidebar ends up inside the content column. The order of the elements in a layout decides where the child appears: the header, the navigation and the Outlet are three siblings in one layout element.\n\nThe layout hierarchy is the reason nested routes pay off. A change to the shell, the header or the navigation happens in one place and every page below inherits it, while the child route stays focused on its own data. The cost is that the depth of nesting becomes an invisible dependency, because a component three levels down may rely on something a layout three levels up decided to provide.\n\nuseOutletContext passes a value from the layout to its children without adding a prop to every component in between. It is the sanctioned way to give a child access to the state of the layout, but it also hides a dependency, because the child no longer declares what it needs. When the same value is needed under different layouts, it belongs in the router context instead.',
        'Outlet — это место, где отрисовывается совпавший дочерний маршрут. Layout-маршрут, который о нём забыл, покажет пустую область контента, а тот, что поставил его не туда, ломает иерархию: сайдбар оказывается внутри колонки контента. Порядок элементов в layout-маршруте определяет, где появится ребёнок: шапка, навигация и Outlet — три соседа в одном элементе макета.\n\nИерархия макетов и есть причина, по которой вложенные маршруты окупаются. Изменение оболочки, шапки или навигации делается в одном месте, и его наследуют все страницы ниже, а дочерний маршрут занимается только своими данными. Обратная сторона: глубина вложенности превращается в невидимую зависимость, потому что компонент на три уровня ниже может рассчитывать на то, что решил layout на три уровня выше.\n\nuseOutletContext передаёт значение от макета к детям, не добавляя проп каждому компоненту по дороге. Это штатный способ дать ребёнку доступ к состоянию макета, но заодно он прячет зависимость, потому что ребёнок больше не объявляет, что ему нужно. Если одно и то же значение требуется под разными макетами, ему место в контексте роутера.'
      ),
      bullets: [
        L('Outlet marks the slot where the matched child route renders.', 'Outlet отмечает слот, в котором отрисовывается совпавший ребёнок.'),
        L('A layout without an Outlet renders an empty content area.', 'Макет без Outlet отрисовывает пустую область контента.'),
        L('The element order in a layout decides where the child appears.', 'Порядок элементов в макете решает, где появится ребёнок.'),
        L('useOutletContext passes layout data down without prop drilling.', 'useOutletContext передаёт данные макета вниз без prop drilling.'),
        L('Deep nesting turns layout dependencies into invisible ones.', 'Глубокая вложенность делает зависимости от макета невидимыми.'),
      ],
      code: `function AppLayout() {
  return (
    <div className="shell">
      <header><Logo /></header>
      <nav><NavLinks /></nav>
      <main><Outlet />   {/* the matched child renders here */}</main>
    </div>
  );
}

function UsersLayout() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className="users">
      <UserList selectedId={selectedId} onSelect={setSelectedId} />
      <Outlet context={{ selectedId, setSelectedId }} />
    </div>
  );
}`,
      table: {
        caption: L('Three ways to hand data down the tree', 'Три способа передать данные вниз по дереву'),
        headers: [L('Mechanism', 'Механизм'), L('Scope', 'Охват'), L('Use for', 'Для чего')],
        rows: [
          [
            L('Outlet', 'Outlet'),
            L('the matched child route', 'совпавший дочерний маршрут'),
            L('rendering the child at all', 'сам рендер ребёнка'),
          ],
          [
            L('useOutletContext', 'useOutletContext'),
            L('the children of one layout', 'дети одного макета'),
            L('values the layout owns', 'значения, которыми владеет макет'),
          ],
          [
            L('useRouteLoaderData(id)', 'useRouteLoaderData(id)'),
            L('any route in the tree', 'любой маршрут в дереве'),
            L('data another route has loaded', 'данные, загруженные другим маршрутом'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A layout without an Outlet', 'Макет без Outlet'),
          text: L(
            'The route matches, the URL is right, the loader runs, and the screen stays empty. The element never had a slot for the child, so nothing can appear. This looks like a broken loader until you check the layout for a missing Outlet.',
            'Маршрут совпал, URL правильный, loader отработал, а экран пустой. В элементе просто не было места для ребёнка, поэтому показать нечего. Это выглядит как сломанный loader, пока не проверишь макет на отсутствие Outlet.'
          ),
        },
      ],
      takeaway: L(
        'Every layout route needs an Outlet exactly where the child should appear, and the order of the elements defines the interface hierarchy.',
        'Каждому layout-маршруту нужен Outlet ровно там, где должен появиться ребёнок, а порядок элементов задаёт иерархию интерфейса.'
      ),
      seeAlso: [
        L('Section 1-1: nested routes, layout routes and index routes', 'Секция 1-1: вложенные, layout- и index-маршруты'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Chapter 7: useMatches and breadcrumbs', 'Глава 7: useMatches и хлебные крошки'),
      ],
    },
    {
      id: 'router-ch1-s4',
      title: L('Link, NavLink and relative navigation', 'Link, NavLink и относительная навигация'),
      body: L(
        'Link renders a real anchor element, so the middle click, the right click and the keyboard behaviour people expect all keep working, but it intercepts the click and asks the router to change the location through the history API instead of reloading the document. That is why Link beats a plain anchor for internal navigation: a full reload throws away the React tree, the store and every cache. An external destination still belongs in a plain anchor.\n\nNavLink is a Link that knows whether it is active for the current location. It sets aria-current="page" and lets className or style be a function receiving { isActive, isPending }, so a navigation item highlights itself without any state of its own. The end prop requires a full match, which is what a link to the root needs, otherwise it stays active on every nested page.\n\nNavigation can be absolute or relative. An absolute path starts with a slash and resolves from the root of the router, ignoring the current route. A relative path resolves against the current route, and ".." moves up one level, so to="../edit" from /users/42 reaches /users/edit. Relative links keep a feature folder self-contained, because the branch can be mounted under another prefix and the links inside it still work.',
        'Link рисует настоящий элемент anchor, поэтому открытие средней кнопкой, открытие в новой вкладке и поведение с клавиатуры сохраняются, но сам щелчок перехватывается, и роутер меняет местоположение через history API вместо перезагрузки документа. Именно поэтому для внутренней навигации Link лучше обычного anchor: полная перезагрузка выбрасывает дерево React, стор и все кеши. Внешний адрес всё равно требует обычного anchor.\n\nNavLink — это Link, который знает, активен ли он для текущего местоположения. Он ставит aria-current="page" и позволяет className или style быть функцией, получающей { isActive, isPending }, так что пункт меню подсвечивает себя сам, без собственного состояния. Проп end требует полного совпадения — он нужен ссылке на корень, иначе она остаётся активной на каждой вложенной странице.\n\nНавигация бывает абсолютной и относительной. Абсолютный путь начинается со слэша и разрешается от корня роутера, игнорируя текущий маршрут. Относительный путь разрешается относительно текущего маршрута, а ".." поднимает на уровень выше, поэтому to="../edit" из /users/42 ведёт в /users/edit. Относительные ссылки делают папку фичи самодостаточной: ветку можно подвесить под другой префикс, и ссылки внутри неё продолжат работать.'
      ),
      bullets: [
        L('Link renders an anchor and navigates without reloading the document.', 'Link рисует anchor и навигирует без перезагрузки документа.'),
        L('A plain anchor is the right choice for an external destination.', 'Для внешнего адреса правильный выбор — обычный anchor.'),
        L('NavLink exposes isActive and isPending to its className function.', 'NavLink передаёт isActive и isPending в функцию className.'),
        L('The end prop activates a link only on an exact match.', 'Проп end включает ссылку только при точном совпадении.'),
        L('Relative paths resolve against the current route, and ".." moves up one level.', 'Относительные пути считаются от текущего маршрута, а ".." поднимает на уровень.'),
      ],
      code: `<NavLink
  to="/users"
  end
  className={({ isActive, isPending }) =>
    isActive ? 'nav-link active' : isPending ? 'nav-link pending' : 'nav-link'
  }
>
  Users
</NavLink>

<Link to="../edit">Edit</Link>                {/* from /users/42 to /users/edit */}
<a href="https://reactrouter.com">Docs</a>  {/* external: plain anchor */}`,
      table: {
        caption: L('Which navigation tool to reach for', 'Каким инструментом навигации пользоваться'),
        headers: [L('Tool', 'Инструмент'), L('Renders', 'Рендерит'), L('Active state', 'Активное состояние'), L('Use for', 'Для чего')],
        rows: [
          [L('Link', 'Link'), L('anchor', 'anchor'), L('no', 'нет'), L('internal navigation', 'внутренняя навигация')],
          [L('NavLink', 'NavLink'), L('anchor', 'anchor'), L('yes', 'да'), L('menus and tabs', 'меню и вкладки')],
          [L('<a href>', '<a href>'), L('anchor', 'anchor'), L('no', 'нет'), L('external links', 'внешние ссылки')],
          [L('navigate()', 'navigate()'), L('nothing', 'ничего'), L('no', 'нет'), L('navigation from code', 'навигация из кода')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('An anchor reloads everything', 'Anchor перезагружает всё'),
          text: L(
            'A plain anchor to an internal address throws away the React tree and every cache the application has built. It works, and it is exactly the kind of link that makes an interface feel slow and loses the scroll position.',
            'Обычный anchor на внутренний адрес выбрасывает дерево React и все кеши приложения. Работает он, и именно такие ссылки делают интерфейс медленным и теряют позицию прокрутки.'
          ),
        },
      ],
      takeaway: L(
        'Use Link for internal destinations, NavLink when the active item matters, and a plain anchor only for external URLs.',
        'Link — для внутренних адресов, NavLink — когда важно активное состояние, обычный anchor — только для внешних URL.'
      ),
      seeAlso: [
        L('Section 1-5: programmatic navigation', 'Секция 1-5: программная навигация'),
        L('Section 2-5: choosing what lives in the URL', 'Секция 2-5: что живёт в URL'),
        L('Chapter 5: scroll restoration and focus management', 'Глава 5: восстановление прокрутки и работа с фокусом'),
      ],
    },
    {
      id: 'router-ch1-s5',
      title: L('Programmatic navigation', 'Программная навигация'),
      body: L(
        'useNavigate returns a function that changes the location from code. It accepts a path, a relative path or a history delta such as -1 to go back, and a second argument that carries options such as replace and state. The returned function is stable for the whole life of the component, so it is safe in a dependency array, unlike a navigator built inline from the location object.\n\nThe difference between push and replace is the difference between a new entry in the history and an overwrite of the current one. A search that narrows the results should replace, otherwise the back button walks through every keystroke. A link to a detail page should push, because the user expects to come back to the list. The choice is not cosmetic, it decides whether the back button means anything.\n\nNavigating inside an effect is the classic mistake. Calling navigate in useEffect after the data arrives costs an extra render, and without a guard it can loop. The better pattern is to redirect from the loader or the action, where the decision is made before the component ever exists, and to keep useNavigate for events the user caused, such as a click or a submit handler.',
        'useNavigate возвращает функцию, которая меняет местоположение из кода. Она принимает путь, относительный путь или дельту истории вроде -1, чтобы вернуться назад, и второй аргумент с опциями replace и state. Возвращённая функция стабильна всё время жизни компонента, поэтому её безопасно класть в массив зависимостей, в отличие от навигатора, собранного на лету из объекта location.\n\nРазница между push и replace — это разница между новой записью в истории и перезаписью текущей. Поиск, сужающий результаты, должен делать replace, иначе кнопка «назад» пройдёт по каждому нажатию клавиши. Ссылка на страницу деталей должна делать push, потому что пользователь рассчитывает вернуться к списку. Выбор не косметический: он определяет, что вообще означает кнопка «назад».\n\nНавигация внутри эффекта — классическая ошибка. Вызов navigate в useEffect после прихода данных стоит лишнего рендера, а без защиты от повтора может зациклиться. Правильнее перенаправлять из загрузчика или действия, где решение принимается до появления компонента, а useNavigate оставить для действий пользователя: щелчка или отправки формы.'
      ),
      bullets: [
        L('useNavigate returns a stable function for the whole life of the component.', 'useNavigate возвращает стабильную функцию на всё время жизни компонента.'),
        L('navigate(-1) moves back through the entries of the history.', 'navigate(-1) возвращает назад по записям истории.'),
        L('replace overwrites the current entry, push adds a new one.', 'replace перезаписывает текущую запись, push добавляет новую.'),
        L('Use replace for filters and search, push for detail pages.', 'replace — для фильтров и поиска, push — для страниц деталей.'),
        L('Calling navigate inside an effect costs a render and can loop.', 'Вызов navigate внутри эффекта стоит рендера и может зациклиться.'),
      ],
      code: `function SearchPage() {
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get('q') ?? '');
    // replace: the back button must not walk through every keystroke
    navigate('/search?q=' + encodeURIComponent(query), { replace: true });
  }

  function openDetail(id) {
    navigate('/users/' + id);   // push: the user expects to come back
  }

  return <button onClick={() => openDetail(42)}>Open</button>;
}`,
      table: {
        caption: L('Options accepted by navigate', 'Опции, которые принимает navigate'),
        headers: [L('Option', 'Опция'), L('Effect on the history', 'Влияние на историю'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('replace: true', 'replace: true'), L('overwrites the current entry', 'перезаписывает текущую запись'), L('filters, search, redirects after save', 'фильтры, поиск, редирект после сохранения')],
          [L('state: {...}', 'state: {...}'), L('attaches data to the new entry', 'прикрепляет данные к новой записи'), L('a toast, a return target', 'тост, точка возврата')],
          [L('a negative number', 'отрицательное число'), L('moves back or forward in the history', 'перемещает назад или вперёд по истории'), L('the cancel button of a dialog', 'кнопка отмены в диалоге')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Guard the effect', 'Защитите эффект'),
          text: L(
            'If you must navigate in an effect, compare against the current location first, so the navigation happens once and not on every re-render. The cleaner option remains a redirect returned from the loader.',
            'Если всё же приходится навигировать в эффекте, сначала сравните с текущим местоположением, иначе переход повторится на каждом рендере. Чище остаётся перенаправление, возвращённое из загрузчика.'
          ),
        },
      ],
      takeaway: L(
        'Navigate from a user event or redirect from the loader, and decide deliberately between push and replace.',
        'Навигируйте из действия пользователя или перенаправляйте из загрузчика и осознанно выбирайте между push и replace.'
      ),
      seeAlso: [
        L('Section 1-4: Link, NavLink and relative navigation', 'Секция 1-4: Link, NavLink и относительная навигация'),
        L('Section 4-1: redirects and route guards', 'Секция 4-1: перенаправления и защита маршрутов'),
        L('Section 6-3: optimistic UI with actions', 'Секция 6-3: оптимистичный интерфейс с действиями'),
      ],
    },
  ],
};
