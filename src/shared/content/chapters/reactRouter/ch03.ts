import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh03: Chapter = {
  id: 'router-ch3',
  title: L('The data router', 'Data-роутер'),
  summary: L(
    'How createBrowserRouter, loaders, actions, forms and fetchers move data work out of the components and into the route tree, and how errors and deferred data are handled.',
    'Как createBrowserRouter, загрузчики, действия, формы и fetcher выносят работу с данными из компонентов в дерево маршрутов и как обрабатываются ошибки и отложенные данные.'
  ),
  sections: [
    {
      id: 'router-ch3-s1',
      title: L('createBrowserRouter and the router object', 'createBrowserRouter и объект роутера'),
      body: L(
        'A data router is created with createBrowserRouter and rendered with RouterProvider. The function takes an array of route objects and returns a router instance: an object that owns the location, the matched branches, the loader cache and the navigation state, and that exposes methods such as navigate, subscribe and fetch. Rendering the provider is enough to start the router, and there is nothing else to wire.\n\nThe same tree of route objects can be executed in different places, because the routing logic does not depend on the environment. A memory router runs the same routes with a history kept in memory, a static handler runs them on a server, and a test runs them with a history the test controls. That is the reason the data router API is built around plain data rather than around components with magic attached to them.\n\nTwo details are easy to miss. The router subscribes to the history, so the browser back button becomes an ordinary navigation instead of a page unload, and the router object itself is mutable state. It should be created once at module level or inside a state initializer, because creating it during render would build a new router on every update and throw away the cache it holds.',
        'Data-роутер создаётся через createBrowserRouter и отрисовывается через RouterProvider. Функция принимает массив объектов маршрутов и возвращает экземпляр роутера: объект, который владеет местоположением, совпавшими ветками, кешем загрузчиков и состоянием навигации, а также предоставляет методы navigate, subscribe и fetch. Отрисовки провайдера достаточно, чтобы роутер заработал, подключать больше нечего.\n\nОдно и то же дерево объектов маршрутов можно выполнить в разных местах, потому что логика маршрутизации не зависит от окружения. Memory-роутер выполняет те же маршруты с историей в памяти, статический обработчик — на сервере, а тест — с историей, которой управляет сам тест. Именно поэтому API data-роутера построен вокруг обычных данных, а не вокруг компонентов с магией, привязанной к среде.\n\nЕсть две детали, которые легко пропустить. Роутер подписывается на историю, поэтому кнопка «назад» в браузере становится обычной навигацией, а не перезагрузкой страницы, и сам объект роутера — изменяемое состояние. Его нужно создавать один раз на уровне модуля или внутри инициализатора состояния, потому что создание во время рендера собирает новый роутер на каждом обновлении и выбрасывает кеш, который он держит.'
      ),
      bullets: [
        L('createBrowserRouter returns a router object and RouterProvider renders it.', 'createBrowserRouter возвращает объект роутера, а RouterProvider его отрисовывает.'),
        L('The router owns the location, the matches and the loader cache.', 'Роутер владеет местоположением, совпадениями и кешем загрузчиков.'),
        L('The route tree is plain data, so it can run in a browser, on a server or in a test.', 'Дерево маршрутов — обычные данные, поэтому оно работает в браузере, на сервере и в тесте.'),
        L('Create the router once, not during render.', 'Создавайте роутер один раз, а не во время рендера.'),
        L('The history is wired to the router, so the back button navigates.', 'История подключена к роутеру, поэтому кнопка «назад» навигирует.'),
      ],
      code: `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// created once, at module level, so the cache survives re-renders
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/users/:id', element: <UserPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}`,
      table: {
        caption: L('Router flavours and where they run', 'Виды роутеров и где они работают'),
        headers: [L('Router', 'Роутер'), L('History', 'История'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('createBrowserRouter', 'createBrowserRouter'), L('the browser address bar', 'адресная строка браузера'), L('an application', 'приложение')],
          [L('createMemoryRouter', 'createMemoryRouter'), L('in memory', 'в памяти'), L('tests, sandboxed demos', 'тесты, песочницы')],
          [L('createStaticHandler', 'createStaticHandler'), L('none, it is a request handler', 'нет, это обработчик запроса'), L('server rendering', 'серверный рендеринг')],
          [L('RouterProvider', 'RouterProvider'), L('the router owns it', 'её владеет роутер'), L('rendering any of them', 'отрисовка любого из них')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A router built during render', 'Роутер, созданный во время рендера'),
          text: L(
            'Creating the router inside the component body rebuilds it on every render, and every rebuild throws away the loaded data and starts the navigation state from scratch. Build it once, outside the component.',
            'Создание роутера в теле компонента пересобирает его на каждом рендере, и каждая пересборка выбрасывает загруженные данные и начинает состояние навигации заново. Собирайте его один раз, вне компонента.'
          ),
        },
      ],
      takeaway: L(
        'Build the router once from plain route data and render it with RouterProvider.',
        'Соберите роутер один раз из обычных данных маршрутов и отрисуйте его через RouterProvider.'
      ),
      seeAlso: [
        L('Section 1-1: nested routes, layout routes and index routes', 'Секция 1-1: вложенные, layout- и index-маршруты'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Section 7-1: createMemoryRouter in tests', 'Секция 7-1: createMemoryRouter в тестах'),
      ],
    },
    {
      id: 'router-ch3-s2',
      title: L('Loaders and useLoaderData', 'Загрузчики и useLoaderData'),
      body: L(
        'A loader is an async function attached to a route that runs before that route renders. The router calls the loaders of all matched routes in parallel, waits for them and only then renders, so a component never paints an empty state while its own request is in flight. The data is read with useLoaderData, which returns exactly what the loader returned and nothing else.\n\nThe loader receives an object with the request, the route parameters and the router context. It can return a plain object, throw a Response to fail, or return a redirect to send the user somewhere else, and the router handles all three before the element renders. That makes the loader the right place for validation: if the parameter is wrong, throw a 400 instead of rendering a broken page and reporting the failure later.\n\nThe data belongs to the route rather than to the component, and that is the real reason to use loaders. Sibling routes can request different data and the router fetches both at once, and navigating away discards the data with the route instead of leaving it in a global cache forever. The drawback is that a loader runs outside React, so it cannot use hooks, context or the store; whatever it needs must arrive through the router context.',
        'Загрузчик — это асинхронная функция, прикреплённая к маршруту, которая выполняется до того, как маршрут отрисуется. Роутер вызывает загрузчики всех совпавших маршрутов параллельно, дожидается их и только потом рендерит, поэтому компонент никогда не рисует пустое состояние, пока его собственный запрос в полёте. Данные читаются через useLoaderData, который возвращает ровно то, что вернул загрузчик, и ничего больше.\n\nЗагрузчик получает объект с запросом, параметрами маршрута и контекстом роутера. Он может вернуть обычный объект, бросить Response, чтобы сообщить об ошибке, или вернуть redirect, чтобы увести пользователя, и роутер обрабатывает все три случая до того, как элемент будет отрисован. Это делает загрузчик правильным местом для проверки: если параметр неверен, бросьте 400, вместо того чтобы рисовать сломанную страницу и сообщать об ошибке позже.\n\nДанные принадлежат маршруту, а не компоненту, и в этом главная причина использовать загрузчики. Соседние маршруты могут запрашивать разные данные, и роутер загрузит оба сразу, а уход со страницы выбрасывает данные вместе с маршрутом, а не оставляет их в глобальном кеше навсегда. Обратная сторона: загрузчик выполняется вне React, поэтому ему недоступны хуки, контекст и стор, и всё нужное должно приходить через контекст роутера.'
      ),
      bullets: [
        L('Loaders run before rendering, in parallel for every matched route.', 'Загрузчики выполняются до рендера, параллельно для всех совпавших маршрутов.'),
        L('useLoaderData returns the value that the loader returned.', 'useLoaderData возвращает то значение, которое вернул загрузчик.'),
        L('Throw a Response to fail, return a redirect to send the user away.', 'Бросьте Response, чтобы сообщить об ошибке, верните redirect, чтобы увести пользователя.'),
        L('Loaders run outside React, so no hooks, no context, no store.', 'Загрузчики выполняются вне React, поэтому без хуков, контекста и стора.'),
        L('A loader that needs the session gets it from the router context.', 'Загрузчику, которому нужна сессия, её даёт контекст роутера.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/users/:id',
    loader: async ({ params, request }) => {
      const response = await fetch('/api/users/' + params.id, {
        signal: request.signal,
      });
      if (response.status === 404) throw new Response('User not found', { status: 404 });
      if (!response.ok) throw new Response('Server error', { status: 500 });
      return { user: await response.json() };
    },
    element: <UserPage />,
  },
]);

function UserPage() {
  const { user } = useLoaderData();
  return <Profile user={user} />;
}`,
      table: {
        caption: L('What a loader can do', 'Что может делать загрузчик'),
        headers: [L('Return or throw', 'Вернуть или бросить'), L('The router does', 'Роутер делает'), L('The component sees', 'Компонент видит')],
        rows: [
          [L('a plain object', 'обычный объект'), L('renders the route with the data', 'рендерит маршрут с данными'), L('the object through useLoaderData', 'объект через useLoaderData')],
          [L('a thrown Response', 'брошенный Response'), L('renders the nearest errorElement', 'рендерит ближайший errorElement'), L('the response through useRouteError', 'ответ через useRouteError')],
          [L('a redirect', 'перенаправление'), L('performs the navigation', 'выполняет переход'), L('nothing, the route is left', 'ничего, маршрут покинут')],
          [L('a thrown Error', 'брошенная Error'), L('renders the nearest errorElement', 'рендерит ближайший errorElement'), L('the error through useRouteError', 'ошибка через useRouteError')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A loader cannot use hooks', 'Загрузчик не может использовать хуки'),
          text: L(
            'The loader runs outside the React tree, so useContext and useSelector are not available and calling one throws. Pass what the loader needs through the router context and keep the component thin.',
            'Загрузчик выполняется вне дерева React, поэтому useContext и useSelector недоступны, и вызов такого хука приведёт к ошибке. Передавайте нужное через контекст роутера и держите компонент тонким.'
          ),
        },
      ],
      takeaway: L(
        'A loader owns the data of its route, runs before the route renders and receives what it needs from the router context.',
        'Загрузчик отвечает за данные своего маршрута, выполняется до рендера и получает нужное из контекста роутера.'
      ),
      seeAlso: [
        L('Section 3-3: actions and useActionData', 'Секция 3-3: действия и useActionData'),
        L('Section 4-3: protecting server loaders', 'Секция 4-3: защита загрузчиков на сервере'),
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кеш загрузчиков и ревалидация'),
      ],
    },
    {
      id: 'router-ch3-s3',
      title: L('Actions and useActionData', 'Действия и useActionData'),
      body: L(
        'Where a loader reads, an action writes. An action is an async function attached to a route that handles a submission: it receives a Request whose body is a FormData, and whatever it returns is available through useActionData. After the action finishes, the router revalidates the loaders of the affected routes, so the list the user came from is refreshed without a line of fetch code in the component.\n\nAn action reports failure by throwing a Response with a status of 400 and a body describing the problem, and the component reads that body from useActionData when the failure is a validation error and from useRouteError when it is not. Returning a redirect after a successful submission ends the flow: the user lands on another route and the history entry of the form is replaced instead of being pushed.\n\nThe action is the right place for the checks a server would make anyway: is the input valid, does the user own this record, is the transition allowed. Because the router calls it before the change is announced, a rejected action leaves the screen exactly as it was with an error attached, which is much safer than a client-side check that only a determined user can bypass.',
        'Там, где загрузчик читает, действие пишет. Действие — асинхронная функция, прикреплённая к маршруту и обрабатывающая отправку: она получает Request, тело которого является FormData, а то, что она возвращает, доступно через useActionData. Когда действие завершится, роутер перепроверяет загрузчики затронутых маршрутов, и список, с которого пользователь пришёл, обновляется без единой строки кода загрузки в компоненте.\n\nДействие сообщает об отказе, бросая Response со статусом 400 и телом, описывающим проблему, а компонент читает это тело из useActionData, когда отказ — это ошибка валидации, и из useRouteError, когда это не так. Возврат redirect после успешной отправки завершает поток: пользователь оказывается на другом маршруте, а запись истории страницы формы заменяется, а не добавляется.\n\nДействие — правильное место для проверок, которые сервер всё равно должен делать: корректен ли ввод, владеет ли пользователь этой записью, разрешён ли переход. Поскольку роутер вызывает действие до того, как изменение объявлено, отклонённое действие оставляет экран ровно таким, каким он был, с прикреплённой ошибкой, и это намного безопаснее клиентской проверки, которую пользователь может обойти.'
      ),
      bullets: [
        L('An action handles a submission and the router revalidates loaders afterwards.', 'Действие обрабатывает отправку, а после него роутер перепроверяет загрузчики.'),
        L('useActionData returns the value that the action returned.', 'useActionData возвращает то значение, которое вернуло действие.'),
        L('Throw a Response with status 400 to report a validation failure.', 'Бросьте Response со статусом 400, чтобы сообщить об ошибке валидации.'),
        L('Return a redirect to finish the flow and change the URL.', 'Верните redirect, чтобы завершить поток и сменить URL.'),
        L('The action is where authorisation belongs, not the component.', 'Авторизация принадлежит действию, а не компоненту.'),
      ],
      code: `{
  path: '/users/new',
  action: async ({ request }) => {
    const form = await request.formData();
    const name = String(form.get('name') ?? '').trim();
    if (!name) return { errors: { name: 'Name is required' } };
    const user = await api.createUser({ name });
    return redirect('/users/' + user.id);
  },
  element: <NewUserForm />,
}

function NewUserForm() {
  const data = useActionData();
  return (
    <Form method="post">
      <input name="name" />
      {data?.errors?.name ? <p role="alert">{data.errors.name}</p> : null}
      <button type="submit">Create</button>
    </Form>
  );
}`,
      table: {
        caption: L('Loader against action', 'Загрузчик против действия'),
        headers: [L('Aspect', 'Аспект'), L('Loader', 'Загрузчик'), L('Action', 'Действие')],
        rows: [
          [L('Direction', 'Направление'), L('reads', 'читает'), L('writes', 'пишет')],
          [L('Runs on', 'Запускается при'), L('navigation', 'навигации'), L('submission', 'отправке')],
          [L('Input', 'Входные данные'), L('params and request', 'параметры и запрос'), L('request.formData()', 'request.formData()')],
          [L('Result is read with', 'Результат читается через'), L('useLoaderData', 'useLoaderData'), L('useActionData', 'useActionData')],
          [L('Typical answer', 'Типичный ответ'), L('the data of the page', 'данные страницы'), L('validation errors or a redirect', 'ошибки валидации или переход')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Validate on the server side', 'Проверяйте на стороне сервера'),
          text: L(
            'A check written in the component runs in the browser, and the browser belongs to the user. The action runs where the data is produced, so a check there cannot be skipped by calling the endpoint directly.',
            'Проверка, написанная в компоненте, выполняется в браузере, а браузер принадлежит пользователю. Действие выполняется там, где данные создаются, поэтому проверку в нём нельзя обойти прямым вызовом эндпоинта.'
          ),
        },
      ],
      takeaway: L(
        'An action is the write side of a route: it validates, performs the change and answers with data or a redirect.',
        'Действие — это сторона записи маршрута: оно проверяет, выполняет изменение и отвечает данными или перенаправлением.'
      ),
      seeAlso: [
        L('Section 3-4: forms, fetchers and progressive enhancement', 'Секция 3-4: формы, fetcher и прогрессивное улучшение'),
        L('Section 4-2: authentication versus authorisation', 'Секция 4-2: аутентификация против авторизации'),
        L('Section 6-3: optimistic UI with actions', 'Секция 6-3: оптимистичный интерфейс с действиями'),
      ],
    },
    {
      id: 'router-ch3-s4',
      title: L('Forms, fetchers and progressive enhancement', 'Формы, fetcher и прогрессивное улучшение'),
      body: L(
        'The Form component of the router submits without a full page reload: it collects the form data, sends it to the action of the matched route and re-renders with the result. A plain form with method="post" and no action attribute behaves the same inside a data router, because the router intercepts the submit. The difference from a manual onSubmit handler is that the flow becomes declarative and the action becomes a function that can be tested on its own.\n\nProgressive enhancement means the form works before the JavaScript arrives. Because the action is addressed by URL and the router only intercepts what it can, the same markup can post to the action while the bundle has not loaded, and the router takes over afterwards. That works only if the action does not depend on client state and if the fields carry real names, because a form without names sends nothing.\n\nA fetcher is the tool for a change that must not navigate. It loads data or submits a form in the background and exposes the result through its own state, with useFetcher returning an object that carries data, formData, state and the submit and load functions. A search field that filters a list, a like button that updates a counter and a delete button inside a list all belong to a fetcher, because moving the user to another URL would misdescribe what happened.',
        'Компонент Form из роутера отправляет данные без полной перезагрузки страницы: он собирает данные формы, отправляет их в действие совпавшего маршрута и перерисовывает страницу с результатом. Обычная форма с method="post" и без атрибута action внутри data-роутера ведёт себя так же, потому что перехват отправки делает роутер. Отличие от ручного обработчика onSubmit в том, что поток становится декларативным, а действие превращается в функцию, которую можно протестировать отдельно.\n\nПрогрессивное улучшение означает, что форма работает ещё до прихода JavaScript. Поскольку действие адресуется URL и роутер перехватывает только то, что может, одна и та же разметка может отправить данные в действие, пока бандл ещё не загрузился, а роутер подхватит её позже. Это работает, только если действие не зависит от состояния клиента и у полей есть настоящие имена, потому что форма без имён не отправляет ничего.\n\nFetcher — инструмент для изменений, которые не должны вызывать навигацию. Он грузит данные или отправляет форму в фоне и отдаёт результат через своё собственное состояние, а useFetcher возвращает объект с полями data, formData, state и функциями submit и load. Поле поиска, фильтрующее список, кнопка лайка, обновляющая счётчик, и кнопка удаления внутри списка — всё это задачи для fetcher, потому что переход на другой URL исказил бы смысл происходящего.'
      ),
      bullets: [
        L('Form posts to the action of the matched route without a reload.', 'Form отправляет данные в действие совпавшего маршрута без перезагрузки.'),
        L('A plain form with method="post" behaves the same inside a data router.', 'Обычная форма с method="post" внутри data-роутера ведёт себя так же.'),
        L('Progressive enhancement requires an action that does not depend on client state.', 'Прогрессивное улучшение требует действия, не зависящего от состояния клиента.'),
        L('useFetcher submits and loads in the background without navigating.', 'useFetcher отправляет и грузит в фоне, без навигации.'),
        L('A fetcher keeps the user on the page for a change that is not a page.', 'Fetcher оставляет пользователя на странице для изменения, которое не является страницей.'),
      ],
      code: `function LikeButton({ postId, initialCount }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/posts/like">
      <input type="hidden" name="postId" value={postId} />
      <button type="submit">
        {fetcher.state !== 'idle' ? 'Saving' : 'Like'} ({initialCount})
      </button>
    </fetcher.Form>
  );
}`,
      table: {
        caption: L('Form against fetcher', 'Форма против fetcher'),
        headers: [L('Aspect', 'Аспект'), L('Form', 'Form'), L('Fetcher', 'Fetcher')],
        rows: [
          [L('Changes the URL', 'Меняет URL'), L('yes, it navigates', 'да, навигирует'), L('no', 'нет')],
          [L('Where the result appears', 'Где появляется результат'), L('useActionData of the route', 'useActionData маршрута'), L('fetcher.data of this component', 'fetcher.data этого компонента')],
          [L('Pending state', 'Состояние ожидания'), L('useNavigation', 'useNavigation'), L('fetcher.state', 'fetcher.state')],
          [L('Typical use', 'Типичное применение'), L('a page that submits a form', 'страница с отправкой формы'), L('a like, a delete, a filter', 'лайк, удаление, фильтр')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Name every field', 'Давайте имена всем полям'),
          text: L(
            'A field without a name attribute is not part of the submitted data, so the action receives null for it. This is the most common reason a form seems to submit nothing at all.',
            'Поле без атрибута name не попадает в отправляемые данные, поэтому действие получает для него null. Это самая частая причина того, что форма вроде бы отправляется, но ничего не приходит.'
          ),
        },
      ],
      takeaway: L(
        'Use Form when the submission is the page, and a fetcher when the submission is a detail of the page.',
        'Form — когда отправка это и есть страница, fetcher — когда отправка это деталь внутри страницы.'
      ),
      seeAlso: [
        L('Section 3-3: actions and useActionData', 'Секция 3-3: действия и useActionData'),
        L('Section 6-3: optimistic UI with actions', 'Секция 6-3: оптимистичный интерфейс с действиями'),
        L('Section 6-4: mutations and error handling', 'Секция 6-4: мутации и обработка ошибок'),
      ],
    },
    {
      id: 'router-ch3-s5',
      title: L('errorElement and error boundaries', 'errorElement и границы ошибок'),
      body: L(
        'Every route in a data router can declare an errorElement. When a loader, an action or the rendering of the route throws, the router renders that element instead of the route, and the error is available through useRouteError. Because the boundary belongs to a route, an error element on a layout catches the failures of all its children, while a boundary declared lower catches only its own branch.\n\nThe value handed to the boundary is not always an Error. When a loader throws a Response, the router passes a Response with the status, and isRouteErrorResponse tells the two cases apart. A deliberate 404 and a genuine network failure take different branches, so the boundary can show a friendly message for one and a retry button for the other. A boundary that skips the check tries to read error.message of a Response and gets undefined.\n\nA boundary on a layout route replaces the layout itself, not only the failing child, so the header and the navigation disappear together with the page. When the shell has to survive a failure, put the error element on a lower route or keep the shell outside the router. Deciding where the boundaries sit is part of designing the error experience and not a detail to settle later.',
        'Каждый маршрут в data-роутере может объявить errorElement. Когда загрузчик, действие или сама отрисовка маршрута бросает исключение, роутер рисует этот элемент вместо маршрута, а само исключение доступно через useRouteError. Поскольку граница принадлежит маршруту, элемент ошибки на макете ловит сбои всех своих детей, а граница, объявленная ниже, ловит только свою ветку.\n\nЗначение, попадающее в границу, не всегда Error. Когда загрузчик бросает Response, роутер передаёт Response со статусом, а isRouteErrorResponse позволяет отличить два случая. Намеренный 404 и настоящий сетевой сбой попадают в разные ветки, и граница может показать для одного вежливое сообщение, а для другого кнопку повтора. Граница, пропустившая проверку, пытается прочитать error.message у Response и получает undefined.\n\nГраница на layout-маршруте заменяет сам макет, а не только сбойный ребёнок, поэтому шапка и навигация исчезают вместе со страницей. Если оболочка должна переживать сбой, поставьте элемент ошибки на маршрут ниже или держите оболочку вне роутера. Где стоят границы — часть проектирования опыта с ошибками, а не деталь, которую решают потом.'
      ),
      bullets: [
        L('errorElement is per route, and a parent boundary catches what children throw.', 'errorElement задаётся на маршруте, и родитель ловит то, что бросают дети.'),
        L('A thrown Response is not an Error, so check isRouteErrorResponse first.', 'Брошенный Response — не Error, поэтому сначала проверьте isRouteErrorResponse.'),
        L('useRouteError returns the thrown value inside the boundary.', 'useRouteError возвращает брошенное значение внутри границы.'),
        L('A boundary on a layout replaces the layout too.', 'Граница на макете заменяет и сам макет.'),
        L('isRouteErrorResponse separates a missing page from a crash.', 'isRouteErrorResponse отделяет отсутствующую страницу от сбоя.'),
      ],
      code: `function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // a thrown Response: status 404 means the page does not exist
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return <p>Something went wrong. Try again.</p>;
}

const router = createBrowserRouter([
  { path: '/users/:id', loader: loadUser, element: <UserPage />, errorElement: <ErrorPage /> },
]);`,
      table: {
        caption: L('What the boundary receives', 'Что получает граница ошибок'),
        headers: [L('Thrown value', 'Брошенное значение'), L('Detected with', 'Определяется через'), L('Typical message', 'Типичное сообщение')],
        rows: [
          [L('a Response with a status', 'Response со статусом'), L('isRouteErrorResponse', 'isRouteErrorResponse'), L('404, 403, 500', '404, 403, 500')],
          [L('an Error instance', 'экземпляр Error'), L('error instanceof Error', 'error instanceof Error'), L('something went wrong', 'что-то пошло не так')],
          [L('a string', 'строка'), L('typeof error', 'typeof error'), L('the string itself', 'сама строка')],
          [L('a thrown promise', 'брошенный промис'), L('the Await error element', 'элемент ошибки Await'), L('the deferred data failed', 'отложенные данные не пришли')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Reading message of a Response', 'Чтение message у Response'),
          text: L(
            'A thrown Response has no message property, so a boundary that renders error.message for every case shows an empty box for a perfectly ordinary 404. Check the type of the error first and branch on the status.',
            'У брошенного Response нет свойства message, поэтому граница, которая рисует error.message во всех случаях, покажет пустое поле для совершенно обычного 404. Сначала проверьте тип ошибки и ветвитесь по статусу.'
          ),
        },
      ],
      takeaway: L(
        'Give every branch of the tree an error boundary, and check the type of the error before you render it.',
        'Дайте каждой ветке дерева границу ошибок и проверяйте тип ошибки до того, как её рисуете.'
      ),
      seeAlso: [
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Section 7-4: nested error handling', 'Секция 7-4: вложенная обработка ошибок'),
        L('Section 4-1: redirects and route guards', 'Секция 4-1: перенаправления и защита маршрутов'),
      ],
    },
    {
      id: 'router-ch3-s6',
      title: L('defer and streaming data', 'defer и потоковая доставка данных'),
      body: L(
        'Not every request on a page is equally important. When a loader returns an object that contains a promise, the router renders the page as soon as the rest of the object is ready and streams the promise in later. The component reads it with Await inside a Suspense boundary that shows a placeholder while the promise is pending and an error element for a rejection.\n\nThe older defer helper wrapped a promise to mark it as deferred, and in current versions a plain promise returned from a loader is streamed in the same way, while defer stays available for the code that still uses it. The difference is in the syntax rather than in the behaviour: what matters is that the router knows the page can be rendered without that piece of data.\n\nStreaming suits a slow panel next to a fast summary, because the summary appears immediately and the panel fills in when it is ready. It is useless for data the page cannot render without, since the router has to wait for it anyway. The mistake to avoid is putting everything into one promise, because that hides the distinction and quietly turns the fast part of the page slow.',
        'Не каждый запрос на странице одинаково важен. Когда загрузчик возвращает объект, внутри которого лежит промис, роутер отрисовывает страницу, как только готов остальной объект, и доставляет промис позже. Компонент читает его через Await внутри границы Suspense, которая показывает заглушку, пока промис в ожидании, и элемент ошибки для отклонённого промиса.\n\nБолее старый хелпер defer оборачивал промис, помечая его как отложенный, а в текущих версиях обычный промис, возвращённый из загрузчика, доставляется так же, и defer остаётся доступным для кода, который его ещё использует. Разница в синтаксисе, а не в поведении: важно, что роутер знает, что страницу можно отрисовать и без этой части данных.\n\nПотоковая доставка подходит медленной панели рядом с быстрой сводкой: сводка появляется сразу, а панель наполняется, когда готова. Она бесполезна для данных, без которых страница не отрисуется, потому что роутер всё равно будет ждать. Ошибка, которой стоит избегать, — запрятать всё в один промис, потому что это скрывает различие и тихо делает быструю часть страницы медленной.'
      ),
      bullets: [
        L('Return a promise from a loader to stream that part of the page later.', 'Верните промис из загрузчика, чтобы доставить эту часть страницы позже.'),
        L('Await reads the promise and Suspense shows the placeholder while it is pending.', 'Await читает промис, а Suspense показывает заглушку, пока он в ожидании.'),
        L('A rejected promise needs its own error element.', 'Отклонённому промису нужен собственный элемент ошибки.'),
        L('defer still works, but a plain promise is the current way.', 'defer по-прежнему работает, но обычный промис — актуальный способ.'),
        L('Never put the critical data into the promise, it makes the fast part slow.', 'Никогда не кладите критичные данные в промис, это делает быструю часть медленной.'),
      ],
      code: `{
  path: '/dashboard',
  loader: () => ({
    summary: fetchSummary(),        // resolved before the first render
    activity: fetchActivity(),      // streamed in later
  }),
  element: <Dashboard />,
}

function Dashboard() {
  const { summary, activity } = useLoaderData();

  return (
    <>
      <SummaryPanel summary={summary} />
      <Suspense fallback={<ActivitySkeleton />}>
        <Await resolve={activity}>{(data) => <ActivityList items={data} />}</Await>
      </Suspense>
    </>
  );
}`,
      table: {
        caption: L('Data that blocks the page and data that does not', 'Данные, которые блокируют страницу, и данные, которые не блокируют'),
        headers: [L('Aspect', 'Аспект'), L('Plain value', 'Обычное значение'), L('Promise in the loader', 'Промис в загрузчике')],
        rows: [
          [L('When the route renders', 'Когда отрисуется маршрут'), L('immediately', 'сразу'), L('when the critical data is ready', 'когда готовы критичные данные')],
          [L('How it is read', 'Как читается'), L('directly from useLoaderData', 'прямо из useLoaderData'), L('through Await and resolve', 'через Await и resolve')],
          [L('While it is pending', 'Пока ожидается'), L('nothing', 'ничего'), L('the Suspense fallback', 'заглушка Suspense')],
          [L('On failure', 'При сбое'), L('the error element', 'элемент ошибки'), L('the error element of the Await', 'элемент ошибки Await')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Streaming needs a boundary', 'Потоковой доставке нужна граница'),
          text: L(
            'A promise in the loader without a Suspense boundary above it suspends the whole route, including the part that was already ready. Put the boundary around the slow piece only.',
            'Промис в загрузчике без границы Suspense над ним подвешивает весь маршрут, включая уже готовую часть. Оборачивайте границей только медленный кусок.'
          ),
        },
      ],
      takeaway: L(
        'Split the page into the data it cannot render without and the data it can, and stream only the second part.',
        'Разделите страницу на данные, без которых её не отрисовать, и на остальные, и доставляйте потоком только вторые.'
      ),
      seeAlso: [
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Section 5-2: Suspense and route-level fallbacks', 'Секция 5-2: Suspense и заглушки на уровне маршрута'),
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кеш загрузчиков и ревалидация'),
      ],
    },
  ],
};
