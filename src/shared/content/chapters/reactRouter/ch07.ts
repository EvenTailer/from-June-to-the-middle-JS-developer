import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh07: Chapter = {
  id: 'router-ch7',
  title: L('Testing and advanced routing', 'Тестирование и продвинутая маршрутизация'),
  summary: L(
    'How a memory router makes a route tree testable, how loaders and actions are asserted on, how the matched routes produce breadcrumbs, which error boundary catches what, and how the route tree can come from files.',
    'Как memory-роутер делает дерево маршрутов тестируемым, как проверяют загрузчики и действия, как совпавшие маршруты дают хлебные крошки, какая граница ошибок что ловит и как дерево маршрутов может прийти из файлов.'
  ),
  sections: [
    {
      id: 'router-ch7-s1',
      title: L('createMemoryRouter in tests', 'createMemoryRouter в тестах'),
      body: L(
        'A test that renders the application needs a router, and the browser one is the wrong tool: it reads the location of the real window, it pushes entries into the history of the test page, and it leaves state behind between the tests. createMemoryRouter replaces the browser history with a stack that lives in memory, so the test decides where the application starts and what the user is able to go back to.\n\nThe options are small and precise. initialEntries is the history stack the test starts with, so a test of the back button needs two entries and an initialIndex that points at the one being tested. basename mounts the application under a prefix, which is how the tests of an application served from a subdirectory are written without touching a single link.\n\nRendering is the same as in production: the router is created outside the React tree and passed to RouterProvider. That detail matters, because a router created inside a component would be rebuilt on every render and the whole history would reset. The router is a singleton of the test exactly as it is a singleton of the application.\n\nTwo rules follow from this. Every test creates its own router with its own initialEntries, so the tests do not depend on the order they run in. And when a test needs a component that only makes sense inside a router, createRoutesStub builds exactly that: a small component that renders a route tree in isolation, without a router instance to manage.',
        'Тесту, который рисует приложение, нужен роутер, и браузерный для этого не подходит: он читает местоположение настоящего окна, добавляет записи в историю тестовой страницы и оставляет состояние между тестами. createMemoryRouter заменяет историю браузера стеком в памяти, поэтому тест сам решает, с какого места стартует приложение и куда пользователь может вернуться назад.\n\nОпции небольшие и точные. initialEntries это стек истории, с которого начинается тест, поэтому тест кнопки «назад» требует двух записей и initialIndex, указывающего на проверяемую. basename монтирует приложение под префиксом, и так пишутся тесты приложения, которое раздаётся из подкаталога, не трогая ни одной ссылки.\n\nОтрисовка такая же, как в продакшене: роутер создаётся вне React-дерева и передаётся в RouterProvider. Эта деталь важна, потому что роутер, созданный внутри компонента, пересоздавался бы на каждом рендере, и вся история сбрасывалась бы. Роутер это синглтон теста ровно так же, как синглтон приложения.\n\nОтсюда два правила. Каждый тест создаёт свой роутер со своими initialEntries, поэтому тесты не зависят от порядка запуска. А когда тесту нужен компонент, который имеет смысл только внутри роутера, createRoutesStub собирает ровно это: маленький компонент, который рисует дерево маршрутов изолированно, без экземпляра роутера, которым надо управлять.'
      ),
      bullets: [
        L('createMemoryRouter keeps the history stack in memory.', 'createMemoryRouter держит стек истории в памяти.'),
        L('initialEntries is the stack the test starts with.', 'initialEntries это стек, с которого начинается тест.'),
        L('initialIndex picks the entry the test starts on.', 'initialIndex выбирает запись, на которой начинается тест.'),
        L('Create the router outside the React tree, exactly as in production.', 'Создавайте роутер вне React-дерева, ровно как в продакшене.'),
        L('createRoutesStub renders a route tree without a router instance.', 'createRoutesStub рисует дерево маршрутов без экземпляра роутера.'),
      ],
      code: `import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

const routes = [
  { path: '/', element: <Home /> },
  {
    path: '/events/:id',
    element: <EventPage />,
    loader: ({ params }) => ({ id: params.id }),
  },
];

test('renders the event page', async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/events/123'],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => screen.getByRole('heading'));
  expect(screen.getByRole('heading')).toHaveTextContent('123');
});`,
      table: {
        caption: L('Options of the memory router', 'Опции memory-роутера'),
        headers: [L('Option', 'Опция'), L('Value', 'Значение'), L('Use', 'Для чего')],
        rows: [
          [
            L('initialEntries', 'initialEntries'),
            L('an array of paths', 'массив путей'),
            L('the history the test starts with', 'история, с которой начинается тест'),
          ],
          [
            L('initialIndex', 'initialIndex'),
            L('a number', 'число'),
            L('which entry is shown first', 'какая запись показывается первой'),
          ],
          [
            L('basename', 'basename'),
            L('a string', 'строка'),
            L('the application lives under a prefix', 'приложение живёт под префиксом'),
          ],
          [
            L('hydrationData', 'hydrationData'),
            L('an object', 'объект'),
            L('the data the server already sent', 'данные, которые сервер уже прислал'),
          ],
          [
            L('future', 'future'),
            L('an object', 'объект'),
            L('behaviour flags, the same as in production', 'флаги поведения, как в продакшене'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A router inside the component', 'Роутер внутри компонента'),
          text: L(
            'Creating the router in the body of a component rebuilds it on every render, which resets the history and runs the loaders again. Create it once, outside the tree, exactly as the application does.',
            'Создание роутера в теле компонента пересоздаёт его на каждом рендере, сбрасывает историю и заново запускает загрузчики. Создавайте его один раз, вне дерева, ровно как это делает приложение.'
          ),
        },
        {
          tone: 'tip',
          title: L('One router per test', 'Один роутер на тест'),
          text: L(
            'Give every test its own router with its own initialEntries. A shared router makes the tests depend on the order they run in, and the failure appears in an unrelated test.',
            'Давайте каждому тесту свой роутер со своими initialEntries. Общий роутер делает тесты зависимыми от порядка запуска, и падение всплывает в несвязанном тесте.'
          ),
        },
      ],
      takeaway: L(
        'Create the router once per test, outside the React tree, and control where the test starts with initialEntries.',
        'Создавайте роутер один раз на тест, вне React-дерева, и управляйте стартовой точкой через initialEntries.'
      ),
      seeAlso: [
        L('Section 7-2: asserting on loaders and actions', 'Секция 7-2: проверки загрузчиков и действий'),
        L('Section 7-5: custom history and file-based routing', 'Секция 7-5: своя history и маршрутизация по файлам'),
      ],
    },
    {
      id: 'router-ch7-s2',
      title: L('Asserting on loaders and actions', 'Проверки загрузчиков и действий'),
      body: L(
        'The loader and the action are plain functions, and a test can call them directly. That is the cheapest and the most precise assertion available: give the loader the arguments the router would give it, await the result and compare it with what the route is supposed to return. It catches the errors of the logic and says nothing about the wiring.\n\nThe wiring is what a router test adds. A spy around the loader tells you whether it ran at all, with which parameters and how many times, and that is exactly the question the revalidation sections ask: did the list refetch after the save, and did it refetch twice? A spy keeps the arguments of every call, so the test can assert on the parameters and on the number of calls at the same time.\n\nThe action is asserted in the same two ways: call it and check the returned value, or submit a form through the rendered route and check what the user sees. The second form is the valuable one, because it covers the whole cycle: the form is submitted, the action runs, the router revalidates and the screen updates.\n\nThe trap is asserting on the wrong layer. A test that mocks the loader and checks the rendered text proves that the component renders the data it was given, and nothing about the loader. A test that calls the loader directly proves that the loader computes the right value, and nothing about the form. Write both, and let each one answer the question it is actually able to answer.',
        'Загрузчик и action — обычные функции, и тест может вызвать их напрямую. Это самая дешёвая и самая точная проверка из возможных: дайте загрузчику те аргументы, которые дал бы роутер, дождитесь результата и сравните его с тем, что маршрут должен вернуть. Она ловит ошибки логики и ничего не говорит о wiring.\n\nИменно wiring добавляет тест с роутером. Шпион вокруг загрузчика покажет, вызывался ли он вообще, с какими параметрами и сколько раз, и это ровно тот вопрос, который задают разделы про ревалидацию: перезапросился ли список после сохранения и не перезапросился ли он дважды. Шпион сохраняет аргументы каждого вызова, поэтому тест может проверить и параметры, и число вызовов одновременно.\n\nAction проверяется теми же двумя способами: вызвать его и проверить возвращённое значение или отправить форму через отрисованный маршрут и посмотреть, что увидит пользователь. Второй способ ценнее, потому что он покрывает весь цикл: форма отправляется, action отрабатывает, роутер ревалидирует и экран обновляется.\n\nЛовушка — проверять не тот слой. Тест, который мокает загрузчик и проверяет отрисованный текст, доказывает, что компонент рисует переданные ему данные, и ничего не говорит о загрузчике. Тест, который вызывает загрузчик напрямую, доказывает, что загрузчик считает верное значение, и ничего не говорит о форме. Пишите оба и пусть каждый отвечает на вопрос, на который он действительно способен ответить.'
      ),
      bullets: [
        L('A loader is a plain function and can be called directly.', 'Загрузчик это обычная функция, и его можно вызвать напрямую.'),
        L('A spy on the loader tells you how many times it ran.', 'Шпион на загрузчике покажет, сколько раз он отработал.'),
        L('The router state exposes the loaded data per route id.', 'Состояние роутера отдаёт загруженные данные по id маршрута.'),
        L('Submitting a form covers the whole cycle: action, revalidation, render.', 'Отправка формы покрывает весь цикл: action, ревалидация, рендер.'),
        L('Mocking the loader proves nothing about the loader itself.', 'Мок загрузчика ничего не говорит о самом загрузчике.'),
      ],
      code: `const calls = [];
const loader = (args) => {
  calls.push(args);
  return { id: args.params.id };
};

const routes = [
  { id: 'event', path: '/events/:id', loader, element: <EventPage /> },
];

test('the loader ran once for the event page', async () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/events/7'] });
  render(<RouterProvider router={router} />);

  await waitFor(() => expect(calls).toHaveLength(1));
  expect(calls[0].params.id).toBe('7');
  expect(router.state.loaderData.event).toEqual({ id: '7' });
});`,
      table: {
        caption: L('What each assertion proves', 'Что доказывает каждая проверка'),
        headers: [L('Assertion', 'Проверка'), L('Proves', 'Доказывает'), L('Misses', 'Не покрывает')],
        rows: [
          [
            L('call the loader directly', 'вызов загрузчика напрямую'),
            L('the logic of the loader', 'логику загрузчика'),
            L('the wiring', 'wiring'),
          ],
          [
            L('the number of calls of the spy', 'число вызовов шпиона'),
            L('how often the router called it', 'как часто роутер его вызывал'),
            L('the returned value', 'возвращённое значение'),
          ],
          [
            L('router.state.loaderData', 'router.state.loaderData'),
            L('what the screen will render', 'что отрисует экран'),
            L('the markup of the component', 'разметку компонента'),
          ],
          [
            L('submit a form', 'отправка формы'),
            L('the whole cycle', 'весь цикл'),
            L('nothing', 'ничего'),
          ],
          [
            L('createRoutesStub', 'createRoutesStub'),
            L('a component inside a router', 'компонент внутри роутера'),
            L('the route tree of the app', 'дерево маршрутов приложения'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A mocked loader hides the loader', 'Мок загрузчика прячет загрузчик'),
          text: L(
            'If the test mocks the loader and asserts on the rendered output, it proves only that the component renders what it was given. Keep one test that calls the real loader directly, otherwise the bug lives in the untested gap.',
            'Если тест мокает загрузчик и проверяет отрисованный вывод, он доказывает только, что компонент рисует переданные данные. Оставьте один тест, который вызывает настоящий загрузчик напрямую, иначе баг живёт в непроверенном промежутке.'
          ),
        },
        {
          tone: 'note',
          title: L('Wait for the router, not for a tick', 'Ждите роутер, а не такт'),
          text: L(
            'The loader runs after the first render, so a synchronous assertion right after render sees nothing. Wait for the element, not for a timeout, and the test stays fast and stable.',
            'Загрузчик выполняется после первого рендера, поэтому синхронная проверка сразу после render ничего не увидит. Ждите элемент, а не таймаут, и тест останется быстрым и стабильным.'
          ),
        },
      ],
      takeaway: L(
        'Test the loader as a function and the loader as part of the router, and never let one of the two tests stand in for the other.',
        'Проверяйте загрузчик и как функцию, и как часть роутера, и никогда не подменяйте одну проверку другой.'
      ),
      seeAlso: [
        L('Section 7-1: createMemoryRouter in tests', 'Секция 7-1: createMemoryRouter в тестах'),
        L('Section 6-2: revalidation strategies', 'Секция 6-2: стратегии ревалидации'),
        L('Section 7-4: nested error handling', 'Секция 7-4: вложенная обработка ошибок'),
      ],
    },
    {
      id: 'router-ch7-s3',
      title: L('useMatches and breadcrumbs', 'useMatches и хлебные крошки'),
      body: L(
        'useMatches returns the list of routes the current URL matched, from the root down to the deepest one. Each match carries its id, the pathname it occupies, the parameters it parsed, the data its loader returned and the handle the route declared. That array is the answer to the question where am I in the tree, and it is the raw material for breadcrumbs, page titles, analytics and decisions about the layout of a branch.\n\nThe handle is the part that developers use most. It is any data the route attaches to itself, and it survives in the match, so a route that knows its own label can publish it with handle: { label: "Users" }. The breadcrumb is then a map over the matches that read the handle, and the depth comes from the array itself, with no parsing of the URL and no guessing.\n\nThe advantage over parsing the pathname is that the tree is the source of truth. A route can change its path without touching the breadcrumb, a parameterised segment can name itself dynamically, and a layout route can contribute a crumb for the whole branch. The price is that the handle has to be filled in, and a route that forgets it leaves a hole in the trail.\n\nThe trap is using the pathname as the source of truth. Splitting it on slashes gives the segments of the URL and not the structure of the interface, so a splat route produces a meaningless crumb, a pathless layout disappears and a parameter shows a colon instead of a value. The matches array already contains everything, so the parsing is unnecessary work.',
        'useMatches возвращает список маршрутов, которым совпал текущий URL, от корня до самого глубокого. Каждый match несёт свой id, pathname, который он занимает, разобранные параметры, данные своего загрузчика и handle, объявленный маршрутом. Этот массив и есть ответ на вопрос «где я в дереве», и это сырьё для хлебных крошек, заголовков страниц, аналитики и решений об обвязке ветки.\n\nЧаще всего используют handle. Это любые данные, которые маршрут прикрепляет к себе, и они сохраняются в match, поэтому маршрут, знающий свою метку, может опубликовать её через handle: { label: "Users" }. Хлебные крошки после этого — это map по совпавшим маршрутам, который читает handle, а глубина берётся из самого массива, без разбора URL и без догадок.\n\nПреимущество перед разбором pathname в том, что источником правды остаётся дерево. Маршрут может сменить путь, не трогая крошки, сегмент с параметром может назвать себя динамически, а layout-маршрут может добавить крошку для всей ветки. Цена в том, что handle надо заполнять, и маршрут, который его забыл, оставляет дыру в цепочке.\n\nЛовушка — использовать pathname как источник правды. Разбиение его по слэшам даёт сегменты URL, а не структуру интерфейса: сплат-маршрут даёт бессмысленную крошку, маршрут без пути исчезает, а параметр показывается двоеточием вместо значения. Массив matches уже содержит всё, поэтому разбор здесь лишняя работа.'
      ),
      bullets: [
        L('useMatches returns the matched routes from the root down.', 'useMatches возвращает совпавшие маршруты от корня вниз.'),
        L('Each match carries id, pathname, params, data and handle.', 'Каждый match несёт id, pathname, params, data и handle.'),
        L('The handle is the field a route publishes for the interface.', 'handle это поле, которым маршрут публикует данные для интерфейса.'),
        L('Breadcrumbs are a map over the matches.', 'Хлебные крошки это map по совпавшим маршрутам.'),
        L('Parsing the pathname gives URL segments, not the structure of the tree.', 'Разбор pathname даёт сегменты URL, а не структуру дерева.'),
      ],
      code: `const routes = [
  {
    path: '/',
    handle: { label: 'Home' },
    children: [
      {
        path: 'projects',
        handle: { label: 'Projects' },
        children: [
          { path: ':id', handle: { label: 'Project' }, loader: loadProject },
        ],
      },
    ],
  },
];

function Breadcrumbs() {
  const matches = useMatches();
  return (
    <nav aria-label="Breadcrumb">
      {matches.map((match) => (
        <span key={match.id}>{match.handle?.label ?? match.pathname}</span>
      ))}
    </nav>
  );
}`,
      table: {
        caption: L('What each match gives you', 'Что даёт каждый match'),
        headers: [L('Field', 'Поле'), L('Example', 'Пример'), L('Use', 'Для чего')],
        rows: [
          [
            L('id', 'id'),
            L('0-1', '0-1'),
            L('a stable key for React', 'стабильный ключ для React'),
          ],
          [
            L('pathname', 'pathname'),
            L('/projects/7', '/projects/7'),
            L('the part of the URL the route owns', 'часть URL, которой владеет маршрут'),
          ],
          [
            L('params', 'params'),
            L('{ id: "7" }', '{ id: "7" }'),
            L('the parsed parameters', 'разобранные параметры'),
          ],
          [
            L('data', 'data'),
            L('{ name: "Atlas" }', '{ name: "Atlas" }'),
            L('what the loader returned', 'что вернул загрузчик'),
          ],
          [
            L('handle', 'handle'),
            L('{ label: "Projects" }', '{ label: "Projects" }'),
            L('what the route publishes', 'что публикует маршрут'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Breadcrumbs from the pathname', 'Крошки из pathname'),
          text: L(
            'Splitting the pathname gives segments, not structure: a splat route yields a meaningless crumb, a pathless layout vanishes and a parameter shows a colon. Build the trail from the matches and the handle of each route.',
            'Разбиение pathname даёт сегменты, а не структуру: сплат-маршрут даёт бессмысленную крошку, маршрут без пути исчезает, а параметр показывается двоеточием. Собирайте цепочку из matches и handle каждого маршрута.'
          ),
        },
        {
          tone: 'note',
          title: L('Every match needs a handle', 'У каждого match нужен handle'),
          text: L(
            'A route without a handle produces a gap in the trail. Give every route of the branch a label, including the layout routes, or filter them out explicitly.',
            'Маршрут без handle оставляет дыру в цепочке. Дайте метку каждому маршруту ветки, включая layout-маршруты, или отфильтруйте их явно.'
          ),
        },
      ],
      takeaway: L(
        'Build the breadcrumb from useMatches and the handle of each route, never from the segments of the URL.',
        'Собирайте хлебные крошки из useMatches и handle каждого маршрута, а не из сегментов URL.'
      ),
      seeAlso: [
        L('Section 1-3: Outlet and the layout hierarchy', 'Секция 1-3: Outlet и иерархия layout-маршрутов'),
        L('Section 2-5: choosing what lives in the URL', 'Секция 2-5: что живёт в URL'),
        L('Section 5-3: scroll restoration and focus management', 'Секция 5-3: восстановление прокрутки и управление фокусом'),
      ],
    },
    {
      id: 'router-ch7-s4',
      title: L('Nested error handling', 'Вложенная обработка ошибок'),
      body: L(
        'Every route can declare an errorElement, and the boundary of a route covers the route itself and everything below it. The router renders the nearest boundary above the failure, so a component that throws inside a branch does not take the whole application down: the layout above stays on screen and only the broken part is replaced by the error element.\n\nThe hierarchy decides what the user sees. A boundary on the root route catches everything and replaces the entire interface with a single message, which is heavy-handed for a failed widget. A boundary on the branch keeps the navigation and the header and shows the failure exactly where it happened, which tells the user what to do next.\n\nThe error object is not always an Error. When a loader throws a Response, the boundary receives that Response, with its status and its statusText. isRouteErrorResponse tells the two cases apart, so a deliberate 404 can produce a friendly page while a network failure produces a retry button. Reading error.message without that check gives undefined.\n\nThe nesting also decides the recovery. A boundary in the middle of the tree renders instead of its children, so the user has no way back to the page that failed except the navigation above it. When a route is likely to fail often, put the boundary as low as possible and give it a link that reloads the data of that route.',
        'Каждый маршрут может объявить errorElement, и граница маршрута покрывает сам маршрут и всё, что под ним. Роутер рисует ближайшую границу над местом сбоя, поэтому компонент, бросивший исключение внутри ветки, не роняет всё приложение: обвязка над веткой остаётся на экране, а сломанная часть заменяется элементом ошибки.\n\nИерархия решает, что увидит пользователь. Граница на корневом маршруте ловит всё и заменяет весь интерфейс одним сообщением, а это слишком грубо для упавшего виджета. Граница на ветке сохраняет навигацию и шапку и показывает сбой ровно там, где он случился, что подсказывает пользователю следующий шаг.\n\nОбъект ошибки — не всегда Error. Когда загрузчик бросает Response, граница получает этот Response вместе с его статусом и statusText. isRouteErrorResponse отделяет два случая, поэтому намеренный 404 может дать понятную страницу, а сетевой сбой — кнопку повтора. Чтение error.message без этой проверки даёт undefined.\n\nВложенность решает и вопрос восстановления. Граница в середине дерева рисуется вместо своих детей, поэтому у пользователя нет пути назад к упавшей странице, кроме навигации над ней. Если маршрут часто падает, ставьте границу как можно ниже и дайте ей ссылку, перезагружающую данные этого маршрута.'
      ),
      bullets: [
        L('The nearest errorElement above the failure renders.', 'Рендерится ближайший errorElement над местом сбоя.'),
        L('A boundary on the root replaces the whole interface.', 'Граница на корне заменяет весь интерфейс.'),
        L('A thrown Response is not an Error.', 'Брошенный Response это не Error.'),
        L('isRouteErrorResponse separates a 404 from a crash.', 'isRouteErrorResponse отделяет 404 от сбоя.'),
        L('A boundary replaces its children, so the recovery needs a link.', 'Граница заменяет своих детей, поэтому восстановление требует ссылки.'),
      ],
      code: `const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootError />,        // catches everything below the root
    children: [
      {
        path: 'reports',
        element: <ReportsLayout />,
        errorElement: <ReportsError />,  // only the reports branch
        children: [{ path: ':id', loader: loadReport, element: <ReportPage /> }],
      },
    ],
  },
];

function ReportsError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <p role="alert">{error.status} {error.statusText}</p>;
  }
  return <p role="alert">Something went wrong.</p>;
}`,
      table: {
        caption: L('Where to put the boundary', 'Где ставить границу'),
        headers: [L('Boundary', 'Граница'), L('Catches', 'Ловит'), L('The screen', 'Экран')],
        rows: [
          [
            L('On the route that fails', 'На маршруте, который падает'),
            L('that route and its children', 'этот маршрут и его дети'),
            L('the branch is replaced', 'ветка заменяется'),
          ],
          [
            L('On the layout above', 'На макете выше'),
            L('everything under the layout', 'всё под макетом'),
            L('the layout stays, the branch is replaced', 'макет остаётся, ветка заменяется'),
          ],
          [
            L('On the root route', 'На корневом маршруте'),
            L('the whole application', 'всё приложение'),
            L('the interface is replaced by one message', 'интерфейс заменяется одним сообщением'),
          ],
          [
            L('No boundary at all', 'Границы нет вовсе'),
            L('nothing', 'ничего'),
            L('the failure escapes', 'сбой выходит наружу'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Reading error.message of a Response', 'Чтение error.message у Response'),
          text: L(
            'A thrown Response has no message property, so a boundary that prints error.message shows nothing at all. Check isRouteErrorResponse first and read the status of the Response.',
            'У брошенного Response нет свойства message, поэтому граница, которая печатает error.message, не показывает вообще ничего. Сначала проверьте isRouteErrorResponse и читайте статус Response.'
          ),
        },
        {
          tone: 'tip',
          title: L('Boundaries near the failure', 'Границы ближе к сбою'),
          text: L(
            'The closer the boundary sits to the failure, the more of the interface survives. A branch that loads a third-party widget deserves its own boundary instead of taking the page down.',
            'Чем ближе граница к сбою, тем больше интерфейса выживает. Ветка, которая грузит чужой виджет, заслуживает своей границы, а не падения всей страницы.'
          ),
        },
      ],
      takeaway: L(
        'Put the error boundary as low as the failure allows, and check isRouteErrorResponse before reading the error.',
        'Ставьте границу ошибок как можно ниже, насколько позволяет сбой, и проверяйте isRouteErrorResponse, прежде чем читать ошибку.'
      ),
      seeAlso: [
        L('Section 3-5: errorElement and error boundaries', 'Секция 3-5: errorElement и границы ошибок'),
        L('Section 6-4: mutations and error handling', 'Секция 6-4: мутации и обработка ошибок'),
        L('Section 4-5: role-based access control in the router', 'Секция 4-5: ролевое управление доступом в роутере'),
      ],
    },
    {
      id: 'router-ch7-s5',
      title: L('Custom history and file-based routing', 'Своя history и маршрутизация по файлам'),
      body: L(
        'The browser router is built on the history API of a window, and the memory router on a stack in memory. Both are created for you, and the difference shows up in exactly one place: the environment the router talks to. createBrowserRouter accepts a window option, so a test or a browser extension can hand the router a different window, and the router will read and write the history of that window instead of the global one.\n\nThe other thing a project controls is the prefix. The basename option tells the router that the application does not live at the root of the domain, and every link, every loader request and every revalidation is resolved with that prefix. It is the difference between an application that works in production and one that answers 404 on every route except the root.\n\nReact Router also offers the opposite direction: a framework mode where the route tree is derived from the files of the project. A configuration file describes the routes with helpers such as index, route and layout, the framework compiles that configuration into the same route objects the data router expects, and the module of each route file becomes the automatic code splitting of that route.\n\nThe rule that keeps both approaches honest is the same: the file tree is a way of writing the route tree, not a replacement for it. When the mapping gets complicated, a file convention starts describing the folder layout instead of the URL, and the moment the route configuration can no longer be read at a glance, it is time to write the route objects by hand.',
        'Браузерный роутер построен на history API окна, а memory-роутер на стеке в памяти. Оба создаются за вас, и разница проявляется ровно в одном месте: в окружении, с которым говорит роутер. createBrowserRouter принимает опцию window, поэтому тест или расширение браузера может передать роутеру другое окно, и роутер будет читать и писать историю этого окна, а не глобального.\n\nВторое, чем управляет проект, это префикс. Опция basename говорит роутеру, что приложение живёт не в корне домена, и каждая ссылка, каждый запрос загрузчика и каждая ревалидация разрешаются с этим префиксом. Это разница между приложением, которое работает в продакшене, и тем, которое отвечает 404 на любом маршруте, кроме корня.\n\nReact Router предлагает и обратное направление: framework mode, где дерево маршрутов выводится из файлов проекта. Файл конфигурации описывает маршруты помощниками index, route и layout, фреймворк компилирует эту конфигурацию в те же объекты маршрутов, которых ждёт data-роутер, а модуль каждого файла маршрута становится автоматическим разделением кода этого маршрута.\n\nПравило, которое держит оба подхода честными, одно: дерево файлов это способ записать дерево маршрутов, а не замена ему. Когда соответствие становится сложным, соглашение по файлам начинает описывать папку вместо URL, и в тот момент, когда конфигурацию маршрутов уже нельзя прочитать с одного взгляда, пора писать объекты маршрутов руками.'
      ),
      bullets: [
        L('createBrowserRouter accepts a window option for a different environment.', 'createBrowserRouter принимает опцию window для другого окружения.'),
        L('basename prefixes every link and every loader request.', 'basename добавляет префикс к каждой ссылке и каждому запросу загрузчика.'),
        L('File-based routing compiles into the same route objects.', 'Маршрутизация по файлам компилируется в те же объекты маршрутов.'),
        L('A file convention describes the folder, not the URL.', 'Соглашение по файлам описывает папку, а не URL.'),
        L('Route objects by hand win when the tree gets unusual.', 'Ручные объекты маршрутов выигрывают, когда дерево становится нестандартным.'),
      ],
      code: `// the router can talk to a window other than the global one
const router = createBrowserRouter(routes, {
  basename: '/app',        // every link and request gets the prefix
  window: testWindow,      // optional: a different window object
});

// routes.ts of a framework mode application
import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('root.tsx', [
    index('home.tsx'),
    route('projects', 'projects/index.tsx'),
    route('projects/:id', 'projects/detail.tsx'),
  ]),
] satisfies RouteConfig;`,
      table: {
        caption: L('Who owns the route tree', 'Кто владеет деревом маршрутов'),
        headers: [L('Approach', 'Подход'), L('Where the routes live', 'Где живут маршруты'), L('Splitting', 'Разделение')],
        rows: [
          [
            L('Route objects', 'Объекты маршрутов'),
            L('a JavaScript file', 'файл JavaScript'),
            L('manual, through lazy', 'вручную, через lazy'),
          ],
          [
            L('File-based routes', 'Маршруты по файлам'),
            L('the project structure', 'структура проекта'),
            L('automatic, per file', 'автоматически, по файлу'),
          ],
          [
            L('Framework mode', 'Framework mode'),
            L('the config file and the folder', 'файл конфигурации и папка'),
            L('automatic, per route module', 'автоматически, по модулю маршрута'),
          ],
          [
            L('The data router', 'Data-роутер'),
            L('the same objects in both', 'те же объекты в обоих случаях'),
            L('lazy works the same way', 'lazy работает так же'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The basename is not optional', 'basename не опция, а необходимость'),
          text: L(
            'An application served from a subdirectory without the basename option produces links to the root of the domain, and every one of them answers 404. Set the basename once, in the router, and never repeat it in the links.',
            'Приложение, раздаваемое из подкаталога, без опции basename строит ссылки на корень домена, и каждая из них отвечает 404. Задайте basename один раз, в роутере, и никогда не повторяйте его в ссылках.'
          ),
        },
        {
          tone: 'note',
          title: L('Choose one owner of the route tree', 'Выберите одного владельца дерева'),
          text: L(
            'A project that mixes a file convention with hand-written patches ends up with two sources of truth for the same URL. Pick the file convention or the route objects, and let the other one stay out.',
            'Проект, который смешивает соглашение по файлам с ручными правками, получает два источника правды для одного URL. Выберите либо соглашение по файлам, либо объекты маршрутов, и пусть второй подход не участвует.'
          ),
        },
      ],
      takeaway: L(
        'Set the basename in the router, and treat a file-based route tree as a way of writing the same route objects, not as a different model.',
        'Задавайте basename в роутере и относитесь к дереву маршрутов по файлам как к способу записать те же объекты маршрутов, а не как к другой модели.'
      ),
      seeAlso: [
        L('Section 7-1: createMemoryRouter in tests', 'Секция 7-1: createMemoryRouter в тестах'),
        L('Section 5-1: lazy route segments', 'Секция 5-1: ленивая загрузка маршрутов'),
        L('Chapter 3: the data router and its route objects', 'Глава 3: data-роутер и его объекты маршрутов'),
      ],
    },
  ],
};
