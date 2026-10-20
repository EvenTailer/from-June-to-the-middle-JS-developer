import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh05: Chapter = {
  id: 'router-ch5',
  title: L('Lazy loading and performance', 'Ленивая загрузка и производительность'),
  summary: L(
    'How a data router splits its bundle per route, how a Suspense boundary keeps the shell on screen while a chunk arrives, how the scroll position and the focus survive a navigation, and how prefetching on intent removes the wait.',
    'Как data-роутер делит бандл по маршрутам, как граница Suspense удерживает обвязку на экране, пока приходит чанк, как прокрутка и фокус переживают навигацию и как предзагрузка по намерению убирает ожидание.'
  ),
  sections: [
    {
      id: 'router-ch5-s1',
      title: L('Lazy route segments', 'Ленивая загрузка маршрутов'),
      body: L(
        'A data router is configured with plain objects, so every route can decide when its own code is downloaded. The lazy property of a route takes an async function that returns the route properties the router needs at runtime: loader, action, Component, ErrorBoundary. The router calls that function only when the route is about to be rendered, and the route definition itself, the path and the index flag, stays in the initial bundle so that matching remains synchronous and fast.\n\nThere are two ways to split a route and they solve different problems. The lazy property splits the route implementation while the router keeps the data flow, so the loader is still called by the router and the data still arrives before the first render. React.lazy splits a component inside an element and needs a Suspense boundary to show something while the chunk downloads. The first is native to the router, the second is what you use for a heavy widget inside a route that is not split.\n\nSplitting only pays off when the modules are really independent. If every lazy route imports the same heavy library through a shared file, the bundler extracts that library into a common chunk, and every route still waits for it. A table of twenty lazy routes can therefore produce a bundle exactly as heavy as one without splitting. Measure the chunks that the build produces instead of counting the lazy routes.\n\nThe lazy function runs during the loading phase, so a route nobody ever visited costs not a single byte, and the first navigation to it pays for the download. If the import fails, the failure is handled like any other error of that route: the nearest error boundary above it renders. A broken chunk is a failure of one route and not a blank application, and the boundary is the place that tells the user what to do next.',
        'Data-роутер настраивается обычными объектами, поэтому каждый маршрут сам решает, когда скачивается его код. Свойство lazy маршрута принимает асинхронную функцию, которая возвращает те свойства маршрута, которые роутеру нужны во время работы: loader, action, Component, ErrorBoundary. Эта функция вызывается только тогда, когда маршрут собирается отрисовываться, а само определение маршрута, путь и флаг index, остаётся в начальном бандле, поэтому сопоставление остаётся синхронным и быстрым.\n\nДелить маршрут можно двумя способами, и они решают разные задачи. Свойство lazy делит реализацию маршрута, оставляя поток данных под управлением роутера: загрузчик по-прежнему вызывает роутер, и данные по-прежнему приходят до первого рендера. React.lazy делит компонент внутри элемента и требует границу Suspense, чтобы показать что-то, пока приходит чанк. Первый способ родной для роутера, второй нужен для тяжёлого виджета внутри маршрута, который не делили.\n\nДеление окупается, только если модули действительно независимы. Если каждый ленивый маршрут импортирует одну и ту же тяжёлую библиотеку через общий файл, сборщик выносит её в общий чанк, и каждый маршрут всё равно её ждёт. Таблица из двадцати ленивых маршрутов может дать бандл ровно той же тяжести, что и код без деления. Смотрите на чанки, которые выдаёт сборка, а не на число ленивых маршрутов.\n\nФункция lazy выполняется на фазе загрузки, поэтому маршрут, в который ни разу не заходили, не стоит ни одного байта, а первый переход в него оплачивает загрузку. Если импорт падает, сбой обрабатывается как любая другая ошибка маршрута: отрисовывается ближайшая граница ошибок над ним. Сломанный чанк — это сбой одного маршрута, а не пустое приложение, и именно граница рассказывает пользователю, что делать дальше.'
      ),
      bullets: [
        L('lazy splits the route implementation while the path and the index flag stay in the initial bundle.', 'lazy делит реализацию маршрута, а путь и флаг index остаются в начальном бандле.'),
        L('The lazy function may return loader, action, Component and ErrorBoundary.', 'Функция lazy может вернуть loader, action, Component и ErrorBoundary.'),
        L('A route that is never visited never downloads its chunk.', 'Маршрут, в который не заходили, не скачивает свой чанк.'),
        L('Shared imports end up in a common chunk and are loaded anyway.', 'Общие импорты попадают в общий чанк и всё равно загружаются.'),
        L('A failing import is caught by the nearest error boundary.', 'Упавший импорт ловит ближайшая граница ошибок.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'reports',
        // the loader and the component arrive on demand
        lazy: async () => {
          const { loader, Component } = await import('./routes/reports');
          return { loader, Component };
        },
      },
    ],
  },
]);`,
      table: {
        caption: L('Three ways to split a route tree', 'Три способа разделить дерево маршрутов'),
        headers: [L('Mechanism', 'Механизм'), L('What it splits', 'Что делит'), L('Who owns the loading state', 'Кто отвечает за состояние загрузки'), L('Needs Suspense', 'Нужен Suspense')],
        rows: [
          [
            L('lazy route property', 'свойство lazy маршрута'),
            L('loader, action and component of one route', 'loader, action и компонент одного маршрута'),
            L('the router', 'роутер'),
            L('no', 'нет'),
          ],
          [
            L('React.lazy', 'React.lazy'),
            L('a component inside an element', 'компонент внутри элемента'),
            L('React', 'React'),
            L('yes', 'да'),
          ],
          [
            L('patchRoutesOnNavigation', 'patchRoutesOnNavigation'),
            L('whole branches of the tree', 'целые ветки дерева'),
            L('the router', 'роутер'),
            L('no', 'нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Shared chunks defeat the split', 'Общие чанки обесценивают деление'),
          text: L(
            'If every lazy route imports the same heavy dependency through a shared module, the bundler extracts it into a common chunk and every route waits for it. Lazy routes shrink the bundle only when the split boundary matches the way the code is actually used.',
            'Если каждый ленивый маршрут тянет одну и ту же тяжёлую зависимость через общий модуль, сборщик выносит её в общий чанк, и каждый маршрут ждёт его. Ленивые маршруты уменьшают бандл только тогда, когда граница деления совпадает с тем, как код используется на самом деле.'
          ),
        },
      ],
      takeaway: L(
        'Split the route implementation with lazy, and keep the route definition in the initial bundle so matching stays synchronous.',
        'Делите реализацию маршрута через lazy, а определение маршрута оставляйте в начальном бандле, чтобы сопоставление оставалось синхронным.'
      ),
      seeAlso: [
        L('Section 5-2: Suspense and route-level fallbacks', 'Секция 5-2: Suspense и fallback на уровне маршрута'),
        L('Section 5-4: preloading on intent', 'Секция 5-4: предзагрузка по намерению'),
        L('Chapter 7: custom history and file-based routing', 'Глава 7: своя history и маршрутизация по файлам'),
      ],
    },
    {
      id: 'router-ch5-s2',
      title: L('Suspense and route-level fallbacks', 'Suspense и fallback на уровне маршрута'),
      body: L(
        'A fallback is what the user sees while something is loading, and the classic mistake is to put one Suspense boundary at the root of the application. A nested route then loads, the whole interface unmounts, a spinner covers the screen, and the interface comes back. The rule is the opposite: put the boundary as low as possible, around the part that is actually loading, so the header, the navigation and the rest of the page stay exactly where they were.\n\nTwo different fallbacks coexist in a data router, and they answer different questions. The Suspense fallback covers the gap between the click and the moment the component can be drawn, and it belongs to the React tree that owns the boundary. The navigation state, read through useNavigation, covers the whole navigation: it says whether the router is loading or submitting and which location it is heading to, but it says nothing about whether a particular piece of the page is ready.\n\nConfusing the two is what produces interfaces that hang. A boundary whose fallback depends on the navigation state stays visible after the data has arrived, because the navigation may still be revalidating something else. A boundary that depends only on its own promise is the only accurate signal that the content can be drawn, and it is the boundary that React controls.\n\nFor a route split with lazy, the fallback must live inside the element, because the router cannot render the route before its component arrives. Wrapping the whole Outlet in one Suspense boundary is therefore the worst of both worlds: the shell blinks on every navigation instead of only when a chunk is missing, and the user pays for a full repaint of the layout each time.',
        'Fallback — это то, что пользователь видит, пока что-то грузится, и классическая ошибка — повесить одну границу Suspense в корне приложения. Тогда вложенный маршрут грузится, весь интерфейс размонтируется, спиннер закрывает экран, и интерфейс возвращается. Правило обратное: ставьте границу как можно ниже, вокруг той части, которая грузится, чтобы шапка, навигация и остальная страница остались на своих местах.\n\nВ data-роутере живут два разных fallback, и они отвечают на разные вопросы. Fallback границы Suspense закрывает промежуток между щелчком и моментом, когда компонент можно нарисовать, и принадлежит дереву React, которое владеет границей. Состояние навигации, прочитанное через useNavigation, описывает всю навигацию: грузит роутер или отправляет форму и куда он идёт, но ничего не говорит о готовности конкретной части страницы.\n\nСмешение этих двух состояний и порождает интерфейсы, которые зависают. Граница, fallback которой зависит от состояния навигации, остаётся на экране и после прихода данных, потому что навигация всё ещё может перепроверять что-то другое. Граница, зависящая только от своего промиса, — единственный точный сигнал, что содержимое можно рисовать, и именно её состоянием управляет React.\n\nДля маршрута, разделённого через lazy, fallback должен жить внутри элемента, потому что роутер не может отрисовать маршрут раньше его компонента. Поэтому оборачивать весь Outlet в одну границу Suspense — худший из вариантов: обвязка моргает при каждой навигации вместо случая, когда не хватает чанка, и пользователь платит полной перерисовкой макета.'
      ),
      bullets: [
        L('Put the Suspense boundary as low as possible, around the loading part.', 'Ставьте границу Suspense как можно ниже, вокруг загружаемой части.'),
        L('The router waits for the loaders, so data driven routes need no Suspense.', 'Роутер ждёт загрузчиков, поэтому маршрутам с данными Suspense не нужен.'),
        L('React.lazy inside an element always needs its own boundary.', 'React.lazy внутри элемента всегда требует своей границы.'),
        L('useNavigation().state is idle, loading or submitting.', 'useNavigation().state бывает idle, loading или submitting.'),
        L('A skeleton with the geometry of the final content removes the jump.', 'Скелетон с разметкой итогового содержимого убирает прыжок.'),
      ],
      code: `function ReportsRoute() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <LazyReports />   {/* React.lazy(() => import('./reports')) */}
    </Suspense>
  );
}

function Shell() {
  const navigation = useNavigation();
  const busy = navigation.state !== 'idle';

  return (
    <div className="app" aria-busy={busy}>
      <Header />
      <Outlet />
    </div>
  );
}`,
      table: {
        caption: L('What each signal tells you', 'Что сообщает каждый сигнал'),
        headers: [L('Signal', 'Сигнал'), L('Value', 'Значение'), L('Means', 'Означает'), L('Does not mean', 'Не означает')],
        rows: [
          [
            L('useNavigation().state', 'useNavigation().state'),
            L('loading', 'loading'),
            L('the router is fetching data for the next route', 'роутер грузит данные для следующего маршрута'),
            L('the new component is on screen', 'новый компонент уже на экране'),
          ],
          [
            L('useNavigation().location', 'useNavigation().location'),
            L('a location object', 'объект местоположения'),
            L('where the navigation is going', 'куда идёт навигация'),
            L('that it succeeded', 'что она удалась'),
          ],
          [
            L('React Suspense', 'React Suspense'),
            L('a pending promise', 'неразрешённый промис'),
            L('this part of the tree cannot be drawn yet', 'эту часть дерева пока нельзя нарисовать'),
            L('that the whole page is blocked', 'что заблокирована вся страница'),
          ],
          [
            L('fetcher.state', 'fetcher.state'),
            L('submitting', 'submitting'),
            L('a background submission is running', 'идёт фоновая отправка'),
            L('that the page is navigating', 'что страница навигирует'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A root boundary blanks the application', 'Граница в корне обнуляет приложение'),
          text: L(
            'One Suspense boundary around the Outlet makes every navigation unmount the whole tree and show a fallback in its place. Put the boundary around the lazy component instead, so the shell stays visible and only the new part waits.',
            'Одна граница Suspense вокруг Outlet заставляет каждую навигацию размонтировать всё дерево и показать fallback вместо него. Ставьте границу вокруг ленивого компонента, чтобы обвязка оставалась на экране, а ждал только новый кусок.'
          ),
        },
        {
          tone: 'tip',
          title: L('Match the fallback to the content', 'Fallback должен повторять содержимое'),
          text: L(
            'A skeleton with the same geometry as the final content removes the layout shift when the real data arrives. A centred spinner in an empty box makes the page jump twice: once when the fallback appears and once when it disappears.',
            'Скелетон с той же геометрией, что и итоговое содержимое, убирает прыжок вёрстки, когда приходят настоящие данные. Спиннер по центру пустого блока заставляет страницу прыгать дважды: когда fallback появляется и когда исчезает.'
          ),
        },
      ],
      takeaway: L(
        'Keep the Suspense boundary next to the thing that loads, and use the navigation state only for the indicators around it.',
        'Держите границу Suspense рядом с тем, что грузится, а состояние навигации используйте только для индикаторов вокруг него.'
      ),
      seeAlso: [
        L('Section 5-1: lazy route segments', 'Секция 5-1: ленивая загрузка маршрутов'),
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кэш загрузчиков и ревалидация'),
        L('Chapter 3: loaders and useLoaderData', 'Глава 3: загрузчики и useLoaderData'),
      ],
    },
    {
      id: 'router-ch5-s3',
      title: L('Scroll restoration and focus management', 'Восстановление прокрутки и управление фокусом'),
      body: L(
        'After a navigation the browser no longer knows where the user was, and two things have to be restored by hand: the scroll position and the focus. The scroll position is the visible half. The user returns to the list and expects to land where they left it, not at the top of the page. The focus is the invisible half: the keyboard and the screen reader must arrive at the new content instead of staying on a link that no longer exists.\n\nThe router ships a component for the first half. ScrollRestoration, rendered once in the root route, stores the scroll position of every history entry and puts it back when the user returns to that entry, even after a full reload of the page. By default it keys the position by the key of the location, so every entry in the history keeps its own position, exactly as a browser does. A getKey function changes that rule when one page should always keep the same position, no matter how the user reached it.\n\nA new navigation resets the scroll to the top, which is the right default, but an anchor inside the page needs the opposite, and preventScrollReset on a Link or a Form keeps the current position when the target is on the same screen. The focus is not handled by the router at all: the page has to move it, usually by focusing the heading of the new view once the navigation has completed.\n\nThe usual implementation is an effect that runs when the location changes and the navigation is no longer pending, calls focus on a ref attached to the heading, and passes preventScroll so the browser does not scroll the heading into view a second time. The heading needs tabIndex={-1}: without it the element is not focusable and the call silently does nothing, leaving the keyboard on the link the user just pressed.',
        'После навигации браузер больше не знает, где был пользователь, и два вещи приходится восстанавливать вручную: позицию прокрутки и фокус. Позиция прокрутки — видимая половина: пользователь возвращается к списку и ожидает оказаться там, где остановился, а не в начале страницы. Фокус — невидимая половина: клавиатура и скринридер должны попасть на новое содержимое, а не остаться на ссылке, которой уже нет.\n\nДля первой половины в роутере есть готовый компонент. ScrollRestoration, отрисованный один раз в корневом маршруте, сохраняет позицию прокрутки каждой записи истории и возвращает её, когда пользователь снова попадает в эту запись, даже после полной перезагрузки страницы. По умолчанию позиция ключуется ключом местоположения, поэтому у каждой записи своя позиция, ровно как в браузере. Функция getKey меняет это правило, если одна страница должна всегда сохранять позицию, независимо от того, как пользователь в неё пришёл.\n\nНовая навигация сбрасывает прокрутку наверх, и это правильное поведение по умолчанию, но якорю внутри страницы нужно обратное, а preventScrollReset у Link или у Form сохраняет текущую позицию, когда цель на том же экране. Фокус роутер не обрабатывает вообще: перемещать его должна страница, обычно фокусом на заголовке нового экрана после того, как навигация завершилась.\n\nОбычная реализация — эффект, который срабатывает при смене местоположения, когда навигация уже не в процессе, вызывает focus у ref, привязанного к заголовку, и передаёт preventScroll, чтобы браузер не прокрутил заголовок к виду второй раз. Заголовку нужен tabIndex={-1}: без него элемент не получает фокус и вызов молча ничего не делает, оставляя клавиатуру на нажатой ссылке.'
      ),
      bullets: [
        L('ScrollRestoration restores the position per history entry by default.', 'ScrollRestoration восстанавливает позицию по записи истории.'),
        L('getKey decides which entries share one scroll position.', 'getKey решает, какие записи делят одну позицию прокрутки.'),
        L('preventScrollReset keeps the position when the target is on the same page.', 'preventScrollReset сохраняет позицию, когда цель на той же странице.'),
        L('The router never moves the focus, the page has to do it.', 'Роутер не перемещает фокус, это делает страница.'),
        L('A heading needs tabIndex={-1} before focus() works on it.', 'Заголовку нужен tabIndex={-1}, иначе focus() не сработает.'),
      ],
      code: `function RootLayout() {
  return (
    <>
      <ScrollRestoration />   {/* one per app, in the root route */}
      <Outlet />
    </>
  );
}

function PageHeading({ title }) {
  const headingRef = useRef(null);
  const { pathname } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state !== 'idle') return;
    headingRef.current?.focus({ preventScroll: true });
  }, [pathname, navigation.state]);

  // tabIndex={-1} is what makes focus() work on a heading
  return <h1 ref={headingRef} tabIndex={-1}>{title}</h1>;
}`,
      table: {
        caption: L('What restores what after a navigation', 'Что что восстанавливает после навигации'),
        headers: [L('Concern', 'Задача'), L('Tool', 'Инструмент'), L('Key detail', 'Важная деталь')],
        rows: [
          [
            L('Position of a previous entry', 'позиция прежней записи'),
            L('ScrollRestoration', 'ScrollRestoration'),
            L('keyed by the location key by default', 'по умолчанию по ключу местоположения'),
          ],
          [
            L('Position of a new page', 'позиция новой страницы'),
            L('the router', 'роутер'),
            L('resets to the top on a new key', 'сбрасывается наверх при новом ключе'),
          ],
          [
            L('Anchor on the same page', 'якорь на той же странице'),
            L('preventScrollReset', 'preventScrollReset'),
            L('keeps the current position', 'сохраняет текущую позицию'),
          ],
          [
            L('Keyboard focus', 'фокус клавиатуры'),
            L('your own component', 'ваш компонент'),
            L('focus the heading after the navigation', 'фокус на заголовке после навигации'),
          ],
          [
            L('Announcement for a screen reader', 'объявление для скринридера'),
            L('the heading text', 'текст заголовка'),
            L('the focused heading is announced', 'сфокусированный заголовок объявляется'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Focus without tabIndex does nothing', 'Фокус без tabIndex не работает'),
          text: L(
            'Calling focus() on an h1 does nothing until the element is focusable. Add tabIndex={-1} to the heading, otherwise the keyboard stays on the link the user has just activated and the next Tab press jumps to an unrelated control.',
            'Вызов focus() у h1 ничего не делает, пока элемент не может получить фокус. Добавьте заголовку tabIndex={-1}, иначе клавиатура остаётся на ссылке, которую пользователь только что нажал, и следующий Tab уводит куда-то в сторону.'
          ),
        },
        {
          tone: 'tip',
          title: L('Focus with preventScroll', 'Фокус с preventScroll'),
          text: L(
            'focus({ preventScroll: true }) moves the caret without scrolling the page. Without it the browser scrolls the heading into view and undoes the scroll position that was just restored.',
            'focus({ preventScroll: true }) перемещает каретку без прокрутки страницы. Без неё браузер прокрутит заголовок к виду и отменит только что восстановленную позицию прокрутки.'
          ),
        },
      ],
      takeaway: L(
        'Restore the scroll position with ScrollRestoration and move the focus to the new heading yourself, with tabIndex={-1} and preventScroll.',
        'Восстанавливайте прокрутку через ScrollRestoration, а фокус перемещайте на новый заголовок сами, с tabIndex={-1} и preventScroll.'
      ),
      seeAlso: [
        L('Section 5-2: Suspense and route-level fallbacks', 'Секция 5-2: Suspense и fallback на уровне маршрута'),
        L('Section 1-5: programmatic navigation', 'Секция 1-5: программная навигация'),
        L('Section 7-3: useMatches and breadcrumbs', 'Секция 7-3: useMatches и хлебные крошки'),
      ],
    },
    {
      id: 'router-ch5-s4',
      title: L('Preloading on intent', 'Предзагрузка по намерению'),
      body: L(
        'The user reveals the intent before the click lands: the pointer enters the link, the link receives the focus, the tab key reaches it. That is the moment to start the work the navigation will need, so the click finds the route already downloaded. The gain is not the download itself but the overlap between the download and the hesitation of a human being, which is usually several hundred milliseconds.\n\nIn a data router two things have to be ready: the code of the route and the data of its loader. The code is a bundler question, and the cheapest way to solve it is to trigger the same dynamic import the lazy property uses, because the bundler keeps the module and the later call resolves immediately. The data is a server question, and the honest answer is that the router revalidates the loaders on navigation, so a prefetched response is a warm cache and not a guaranteed hit.\n\nThe trap is prefetching everything. A prefetch on every link of a list turns the first click into a hundred parallel requests and the tab stops responding. Prefetch on intent only, only for the links the user actually points at, and keep a small cache of promises so a repeated hover does not start a second import of the same module.\n\nIn framework mode with server rendering the router does part of this for you: the prefetch prop of Link asks the framework to send the route module early when the user hovers or focuses the link. A data mode application has no manifest to work with, so the small prefetch helper has to be written by hand, and the reward is the same: the navigation starts from a warm cache instead of a cold one.',
        'Пользователь выдаёт намерение раньше, чем приходит щелчок: указатель попадает на ссылку, ссылка получает фокус, до неё доходит клавиша табуляции. Вот в этот момент стоит начать работу, которая понадобится навигации, чтобы щелчок нашёл маршрут уже скачанным. Выигрыш даёт не сам скачивание, а совпадение скачивания с паузой человека, которая обычно занимает несколько сотен миллисекунд.\n\nВ data-роутере должны быть готовы две вещи: код маршрута и данные его загрузчика. Код — вопрос сборщика, и дешевле всего решить его, вызвав тот же динамический импорт, который использует свойство lazy, потому что сборщик сохраняет модуль и повторный вызов разрешается мгновенно. Данные — вопрос сервера, и честный ответ здесь такой: роутер ревалидирует загрузчики при навигации, поэтому предзагруженный ответ это тёплый кэш, а не гарантированное попадание.\n\nЛовушка — предзагружать всё. Предзагрузка на каждой ссылке списка превращает первый щелчок в сто параллельных запросов, и вкладка перестаёт отвечать. Предзагружайте только по намерению, только для ссылок, на которые пользователь реально наводится, и держите небольшой кэш промисов, чтобы повторное наведение не запускало второй импорт того же модуля.\n\nВ framework mode с серверным рендерином роутер делает часть этой работы сам: проп prefetch у Link просит фреймворк заранее прислать модуль маршрута, когда пользователь наводится на ссылку или фокусирует её. У приложения в data mode нет манифеста, с которым можно работать, поэтому маленький помощник для предзагрузки приходится писать руками, а выигрыш остаётся тем же: навигация стартует из тёплого кэша, а не из холодного.'
      ),
      bullets: [
        L('Intent is visible before the click: hovering and focusing both count.', 'Намерение видно до щелчка: наведение и фокус считаются.'),
        L('Reuse the same dynamic import that the lazy property uses.', 'Переиспользуйте тот же динамический импорт, что и у свойства lazy.'),
        L('Keep one promise per path so a second hover starts nothing.', 'Храните по одному промису на путь, чтобы второе наведение ничего не запускало.'),
        L('A prefetched response is a warm cache, not a guaranteed loader hit.', 'Предзагруженный ответ это тёплый кэш, а не гарантированное попадание в загрузчик.'),
        L('Prefetching every link turns one click into a hundred requests.', 'Предзагрузка всех ссылок превращает один щелчок в сто запросов.'),
      ],
      code: `const routeModules = {
  '/reports': () => import('./routes/reports'),
  '/settings': () => import('./routes/settings'),
};

const started = new Map();

function prefetchRoute(path) {
  const load = routeModules[path];
  if (!load || started.has(path)) return;
  started.set(path, load());   // the bundler keeps the module in its cache
}

function NavItem({ to, children }) {
  return (
    <Link to={to} onMouseEnter={() => prefetchRoute(to)} onFocus={() => prefetchRoute(to)}>
      {children}
    </Link>
  );
}`,
      table: {
        caption: L('What to warm up and how', 'Что прогревать и чем'),
        headers: [L('Resource', 'Ресурс'), L('Mechanism', 'Механизм'), L('Trigger', 'Триггер'), L('Guarantee', 'Что гарантировано')],
        rows: [
          [
            L('Code of the route', 'Код маршрута'),
            L('dynamic import', 'динамический импорт'),
            L('hover or focus', 'наведение или фокус'),
            L('the module sits in the bundler cache', 'модуль лежит в кэше сборщика'),
          ],
          [
            L('Data of the route', 'Данные маршрута'),
            L('a loader request', 'запрос загрузчика'),
            L('hover or focus', 'наведение или фокус'),
            L('only if the server caches it', 'только если сервер кэширует'),
          ],
          [
            L('Every link of a list', 'Каждая ссылка списка'),
            L('prefetch on render', 'предзагрузка при рендере'),
            L('the page load', 'загрузка страницы'),
            L('wasted bandwidth', 'пустая трата трафика'),
          ],
          [
            L('Nothing', 'Ничего'),
            L('no prefetch', 'без предзагрузки'),
            L('the click', 'щелчок'),
            L('the user waits for the whole chain', 'пользователь ждёт всю цепочку'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Prefetching is not caching', 'Предзагрузка это не кэш'),
          text: L(
            'A prefetched response does not fill the loader cache of the route. The router revalidates the loaders on navigation, so the prefetch only saves time when the server or the network layer answers from its own cache.',
            'Предзагруженный ответ не заполняет кэш загрузчиков маршрута. Роутер ревалидирует загрузчики при навигации, поэтому предзагрузка экономит время только тогда, когда сервер или сетевой слой отвечает из своего собственного кэша.'
          ),
        },
        {
          tone: 'tip',
          title: L('Start with the links that matter', 'Начните с важных ссылок'),
          text: L(
            'The navigation bar and the main call to action are worth prefetching. A table with two hundred rows is not: prefetch only the links the pointer actually reaches, and let the rest load when they are opened.',
            'Панель навигации и главная кнопка действия — их стоит предзагружать. Таблица на двести строк — нет: предзагружайте только те ссылки, до которых доходит указатель, а остальные пусть грузятся по факту открытия.'
          ),
        },
      ],
      takeaway: L(
        'Warm the route code on hover and focus, keep one promise per path, and never prefetch a whole list.',
        'Прогревайте код маршрута при наведении и фокусе, держите по одному промису на путь и никогда не предзагружайте целый список.'
      ),
      seeAlso: [
        L('Section 5-1: lazy route segments', 'Секция 5-1: ленивая загрузка маршрутов'),
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кэш загрузчиков и ревалидация'),
        L('Section 1-4: Link, NavLink and relative navigation', 'Секция 1-4: Link, NavLink и относительная навигация'),
      ],
    },
  ],
};
