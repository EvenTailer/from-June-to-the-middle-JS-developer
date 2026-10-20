import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh04: Chapter = {
  id: 'router-ch4',
  title: L('Protection and authorisation', 'Защита и авторизация'),
  summary: L(
    'How redirects and route guards keep unauthorised users out, why a client guard is never a security boundary, and how the rules are enforced where the data is produced.',
    'Как перенаправления и защита маршрутов не пускают неавторизованных пользователей, почему клиентская проверка не является границей безопасности и как правила применяются там, где создаются данные.'
  ),
  sections: [
    {
      id: 'router-ch4-s1',
      title: L('Redirects and route guards', 'Перенаправления и защита маршрутов'),
      body: L(
        'A redirect is a value that a loader or an action returns, and the router performs the navigation instead of rendering the route. It is the cleanest way to send a user away from a page they may not see, because the decision happens before the component exists, so there is no flash of protected content and no data request for a page the user is not allowed to open.\n\nA route guard is the component version of the same idea: a wrapper that checks the session and renders the login page or triggers the redirect when the check fails. The component form is easier to read and easier to reuse, but it has two weaknesses. The data of the protected route may still be requested, and the redirect happens after the component has mounted, so the user sees a flash of the protected shell.\n\nThe stronger pattern combines both. The loader of the protected branch checks the session and returns a redirect, and the guard element only covers the case where the client reaches the route without going through the loader. Doing the check twice is not redundancy, because the loader runs where the decision can be trusted and the element runs where the check is cheap.',
        'Перенаправление — это значение, которое возвращает загрузчик или действие, а роутер выполняет переход вместо отрисовки маршрута. Это самый чистый способ увести пользователя со страницы, на которую ему нельзя, потому что решение принимается до появления компонента: нет ни вспышки защищённого контента, ни запроса данных для страницы, которую открывать нельзя.\n\nЗащита маршрута — компонентная версия той же идеи: обёртка, которая проверяет сессию и рисует страницу входа или выполняет переход, когда проверка не прошла. Компонентная форма читается проще и переиспользуется легче, но у неё две слабости. Данные защищённого маршрута всё равно могут быть запрошены, а переход происходит уже после монтирования компонента, поэтому пользователь видит вспышку защищённой оболочки.\n\nНадёжнее комбинировать оба приёма. Загрузчик защищённой ветки проверяет сессию и возвращает перенаправление, а элемент-защита закрывает только случай, когда клиент попал в маршрут в обход загрузчика. Двойная проверка — это не избыточность: загрузчик выполняется там, где решение можно доверять, а элемент — там, где проверка дешёвая.'
      ),
      bullets: [
        L('A redirect returned from a loader or an action moves the user.', 'Перенаправление, возвращённое из загрузчика или действия, уводит пользователя.'),
        L('A guard component checks in the browser and can flash the protected shell.', 'Компонент-защита проверяет в браузере и может показать вспышку защищённой оболочки.'),
        L('The loader check happens before the element renders and before the data loads.', 'Проверка в загрузчике происходит до рендера элемента и до загрузки данных.'),
        L('Use the loader for the decision and the guard for the fast path.', 'Загрузчик принимает решение, а элемент-защита закрывает быстрый путь.'),
        L('A guard that only hides the interface protects nothing.', 'Защита, которая лишь прячет интерфейс, не защищает ничего.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/dashboard',
    loader: async ({ request }) => {
      const user = await getUser(request);
      if (!user) {
        return redirect('/login?next=' + encodeURIComponent('/dashboard'));
      }
      return { user };
    },
    element: <Dashboard />,
  },
  { path: '/login', element: <LoginPage /> },
]);

function Dashboard() {
  const { user } = useLoaderData();
  return <h1>Hello, {user.name}</h1>;
}`,
      table: {
        caption: L('Two ways to keep a user out', 'Два способа не пустить пользователя'),
        headers: [L('Aspect', 'Аспект'), L('Redirect from a loader', 'Перенаправление из загрузчика'), L('Guard component', 'Компонент-защита')],
        rows: [
          [L('When the check runs', 'Когда выполняется проверка'), L('before the route renders', 'до рендера маршрута'), L('after the component mounts', 'после монтирования компонента')],
          [L('Data request', 'Запрос данных'), L('not sent', 'не отправляется'), L('may already be sent', 'может быть уже отправлен')],
          [L('Flash of protected content', 'Вспышка защищённого контента'), L('no', 'нет'), L('possible', 'возможна')],
          [L('Works without JavaScript', 'Работает без JavaScript'), L('yes, the redirect is in the response', 'да, переход в ответе'), L('no', 'нет')],
          [L('Trust level', 'Уровень доверия'), L('the server decides', 'решает сервер'), L('the browser decides', 'решает браузер')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The guard is not the boundary', 'Защита — не граница'),
          text: L(
            'A guard that renders a login page instead of the dashboard leaves the dashboard data reachable with a direct request to the loader endpoint. The guard is a user interface decision, and the server has to make its own.',
            'Защита, которая рисует страницу входа вместо дашборда, оставляет данные дашборда доступными при прямом запросе к загрузчику. Защита — это решение интерфейса, а сервер обязан принять своё.'
          ),
        },
      ],
      takeaway: L(
        'Redirect from the loader when the rule matters, and keep a guard element only as a fast path for the client.',
        'Перенаправляйте из загрузчика, когда правило важно, а элемент-защиту оставьте только как быстрый путь для клиента.'
      ),
      seeAlso: [
        L('Section 4-3: protecting server loaders', 'Секция 4-3: защита загрузчиков на сервере'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Section 1-2: pathless routes and splat routes', 'Секция 1-2: маршруты без пути и сплат-маршруты'),
      ],
    },
    {
      id: 'router-ch4-s2',
      title: L('Authentication versus authorisation', 'Аутентификация против авторизации'),
      body: L(
        'Authentication asks who the user is. Authorisation asks what that user may do. The two are confused constantly, and the confusion is expensive: a session check in the interface makes the application feel protected while the data is still being served to anyone who asks for it directly.\n\nA route tree makes the confusion visible. A pathless route around a branch expresses a shared authentication requirement, and a per-route check expresses a specific authorisation rule. When both are expressed only as components, the tree says nothing about what the server will actually do, and a new route added to the branch can silently inherit a check that was never applied to it.\n\nThe rule that survives every refactor is that the client decides what to show and the server decides what to give. The client check is a convenience that avoids rendering a page the user cannot use. The server check is the boundary that actually holds, because the server is the only side of the conversation the user does not control.',
        'Аутентификация спрашивает, кто пользователь. Авторизация спрашивает, что ему можно. Эти две вещи постоянно путают, и путаница обходится дорого: проверка сессии в интерфейсе создаёт ощущение защищённости, хотя данные продолжают отдавать любому, кто за ними пришёл.\n\nДерево маршрутов делает путаницу заметной. Маршрут без пути вокруг ветки выражает общее требование аутентификации, а проверка на конкретном маршруте — конкретное правило авторизации. Когда и то и другое выражено только компонентами, дерево ничего не говорит о том, что сервер действительно сделает, а новый маршрут, добавленный в ветку, молча наследует проверку, которую к нему никогда не применяли.\n\nПравило, переживающее любой рефакторинг: клиент решает, что показать, а сервер решает, что отдать. Клиентская проверка — удобство, которое избавляет от рендера страницы, недоступной пользователю. Серверная проверка — это и есть граница, потому что сервер единственная сторона разговора, которой пользователь не управляет.'
      ),
      bullets: [
        L('Authentication is who, authorisation is what.', 'Аутентификация — это кто, авторизация — это что.'),
        L('A client guard is a convenience and not a security boundary.', 'Клиентская защита — удобство, а не граница безопасности.'),
        L('A pathless route expresses a shared authentication requirement.', 'Маршрут без пути выражает общее требование аутентификации.'),
        L('The server must enforce the rule the client merely displays.', 'Сервер должен применять правило, которое клиент только показывает.'),
        L('A missing check on one route of a branch is a data leak.', 'Отсутствие проверки на одном маршруте ветки — это утечка данных.'),
      ],
      code: `const router = createBrowserRouter([
  {
    element: <RequireUser />,        // shared authentication for the branch
    children: [
      { path: 'profile', element: <Profile /> },
      {
        path: 'billing',
        handle: { permission: 'billing:read' },
        loader: async ({ request }) => {
          const user = await requireUser(request);
          if (!user.permissions.includes('billing:read')) {
            throw new Response('Forbidden', { status: 403 });
          }
          return { invoices: await listInvoices(user.id) };
        },
        element: <Billing />,
      },
    ],
  },
]);`,
      table: {
        caption: L('The two questions and where they are answered', 'Два вопроса и место, где на них отвечают'),
        headers: [L('Question', 'Вопрос'), L('Authentication', 'Аутентификация'), L('Authorisation', 'Авторизация')],
        rows: [
          [L('Who is the user?', 'Кто пользователь?'), L('a session, a token, a cookie', 'сессия, токен, cookie'), L('the authenticated identity', 'аутентифицированная личность')],
          [L('What may they do?', 'Что ему можно?'), L('not answered', 'не отвечает'), L('a role, a permission, ownership', 'роль, право, владение')],
          [L('Where is it decided?', 'Где решается?'), L('the login page and the session', 'страница входа и сессия'), L('the server, per resource', 'сервер, для каждого ресурса')],
          [L('What happens on failure?', 'Что будет при отказе?'), L('401 and a login prompt', '401 и приглашение войти'), L('403 and a message', '403 и сообщение')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two names for one check', 'Два имени для одной проверки'),
          text: L(
            'Code that calls a session check an authorisation check hides the real question. Name the check after what it answers: requireUser answers who, requireRole answers what, and the difference shows up in the status codes.',
            'Код, который называет проверку сессии проверкой прав, прячет настоящий вопрос. Называйте проверку по тому, на что она отвечает: requireUser отвечает на вопрос кто, requireRole — на вопрос что, и разница видна в кодах статуса.'
          ),
        },
      ],
      takeaway: L(
        'The client decides what to show, the server decides what to give, and only the second one is a boundary.',
        'Клиент решает, что показать, сервер решает, что отдать, и только второе является границей.'
      ),
      seeAlso: [
        L('Section 4-3: protecting server loaders', 'Секция 4-3: защита загрузчиков на сервере'),
        L('Section 4-5: role-based access control in the router', 'Секция 4-5: ролевое управление доступом в роутере'),
        L('Section 4-4: handling unauthenticated responses', 'Секция 4-4: обработка неавторизованных ответов'),
      ],
    },
    {
      id: 'router-ch4-s3',
      title: L('Protecting server loaders', 'Защита загрузчиков на сервере'),
      body: L(
        'The loader is the first place where the request and the data meet, so it is the right place for a server-side check. The loader receives the Request, and the Request carries the cookies, so the session can be read from it and the user identified before any query runs. A loader that answers 401 or 403 for a user who may not see the data never issues that query at all.\n\nThe check has to happen on the server side of the boundary, not in the component that displays the data. The client is exactly the part of the system an attacker controls, so a check that lives there proves nothing. A loader that reads the session and refuses the request is a real check, and it holds for every consumer of the endpoint rather than only for the browser.\n\nThe loader also has to give the component what it checked, otherwise the component makes a second request to learn the same thing. Returning the user together with the data is one round trip, and it guarantees that the screen and the check are based on the same session rather than on two slightly different versions of it.',
        'Загрузчик — первое место, где встречаются запрос и данные, поэтому это правильное место для серверной проверки. Загрузчик получает Request, а Request несёт cookie, значит сессию можно прочитать и определить пользователя до того, как выполнится запрос в базу. Загрузчик, отвечающий 401 или 403 пользователю, которому данные не положены, вообще не делает этот запрос.\n\nПроверка должна происходить на серверной стороне границы, а не в компоненте, который показывает данные. Клиент — это ровно та часть системы, которой управляет атакующий, поэтому проверка, живущая там, ничего не доказывает. Загрузчик, который читает сессию и отказывает в запросе, — настоящая проверка, и она работает для любого потребителя эндпоинта, а не только для браузера.\n\nЗагрузчик должен также отдать компоненту то, что проверил, иначе компонент сделает второй запрос ради того же самого. Возврат пользователя вместе с данными — это один круг, и он гарантирует, что экран и проверка опираются на одну и ту же сессию, а не на две слегка разные версии её.'
      ),
      bullets: [
        L('The loader receives the Request, and the Request carries the cookies.', 'Загрузчик получает Request, а Request несёт cookie.'),
        L('Refuse before the query, not after the data has been fetched.', 'Отказывайте до запроса, а не после того, как данные получены.'),
        L('The client check is never the security boundary.', 'Клиентская проверка никогда не является границей безопасности.'),
        L('Return the session user with the data to avoid a second request.', 'Отдавайте пользователя сессии вместе с данными, чтобы не делать второй запрос.'),
        L('The same rule must hold for every consumer of the API.', 'То же правило должно действовать для любого потребителя API.'),
      ],
      code: `async function requireUser(request) {
  const user = await readSession(request.headers.get('Cookie'));
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return user;
}

{
  path: '/invoices',
  loader: async ({ request }) => {
    const user = await requireUser(request);
    const invoices = await db.invoices.forUser(user.id);
    return { invoices, user };
  },
  element: <InvoiceList />,
}`,
      table: {
        caption: L('Where the check belongs', 'Где должна быть проверка'),
        headers: [L('Place', 'Место'), L('Reads the session', 'Читает сессию'), L('Blocks the data', 'Блокирует данные'), L('Trustworthy', 'Достоверна')],
        rows: [
          [L('Component before render', 'Компонент до рендера'), L('yes', 'да'), L('no', 'нет'), L('no', 'нет')],
          [L('Guard element', 'Элемент-защита'), L('yes', 'да'), L('no', 'нет'), L('no', 'нет')],
          [L('Loader on the server', 'Загрузчик на сервере'), L('yes', 'да'), L('yes', 'да'), L('yes', 'да')],
          [L('The API that serves the data', 'API, отдающий данные'), L('yes', 'да'), L('yes', 'да'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Share one helper', 'Один общий помощник'),
          text: L(
            'Write requireUser once and call it from every loader that touches private data. A per-route reimplementation is where the inconsistent status codes and the missing check come from.',
            'Напишите requireUser один раз и вызывайте его из каждого загрузчика, который трогает приватные данные. Расхождения в кодах статуса и пропущенные проверки появляются именно из собственных реализаций в каждом маршруте.'
          ),
        },
      ],
      takeaway: L(
        'Identify the user in the loader, refuse there, and return the session with the data so the screen and the check agree.',
        'Определяйте пользователя в загрузчике, отказывайте там же и отдавайте сессию вместе с данными, чтобы экран и проверка совпадали.'
      ),
      seeAlso: [
        L('Section 4-1: redirects and route guards', 'Секция 4-1: перенаправления и защита маршрутов'),
        L('Section 4-4: handling unauthenticated responses', 'Секция 4-4: обработка неавторизованных ответов'),
        L('Section 3-5: errorElement and error boundaries', 'Секция 3-5: errorElement и границы ошибок'),
      ],
    },
    {
      id: 'router-ch4-s4',
      title: L('Handling unauthenticated responses', 'Обработка неавторизованных ответов'),
      body: L(
        'A 401 means the request was not authenticated: no session, an expired session, or a token that is no longer valid. A 403 means the request was authenticated but the user is not allowed to perform it. The distinction matters because the two need different screens. A 401 means log in again and come back, while a 403 means the account is fine and the operation is simply not permitted.\n\nThe redirect that follows a 401 must preserve where the user was going, otherwise a login form that ends on the home page loses the context and the user has to find the page again. The destination travels as a query parameter, and after a successful login the application navigates back to it. That parameter has to be validated, because an open redirect built from user input is a security problem of its own.\n\nFor a session that expires in the middle of a working session, the useful reaction is not a full page change but a re-authentication flow: the app asks the server who the user is and, on a 401, opens the login form and replays the failed request afterwards. A fetcher makes this possible, because the request can be repeated without navigating away from the page the user is on.',
        'Ответ 401 означает, что запрос не был аутентифицирован: нет сессии, сессия истекла или токен больше не действителен. Ответ 403 означает, что запрос был аутентифицирован, но пользователю это действие не разрешено. Различие важно, потому что двум случаям нужны разные экраны. 401 означает войти заново и вернуться, а 403 означает, что учётная запись в порядке и операция просто не разрешена.\n\nПеренаправление после 401 должно сохранять, куда шёл пользователь, иначе форма входа, которая заканчивается на главной, теряет контекст и пользователю приходится снова искать нужную страницу. Назначение передаётся параметром запроса, а после успешного входа приложение возвращается туда. Этот параметр нужно проверять, потому что открытый редирект, собранный из пользовательского ввода, сам по себе является дырой в безопасности.\n\nКогда сессия истекает посреди работы, полезная реакция — не полная смена страницы, а поток повторной аутентификации: приложение спрашивает у сервера, кто пользователь, и на 401 открывает форму входа, а после неё повторяет неудавшийся запрос. Fetcher делает это возможным, потому что запрос можно повторить, не уходя со страницы, на которой находится пользователь.'
      ),
      bullets: [
        L('401 means not authenticated, 403 means authenticated but not allowed.', '401 — не аутентифицирован, 403 — аутентифицирован, но не разрешено.'),
        L('A login redirect should carry the original destination.', 'Перенаправление на вход должно нести исходное назначение.'),
        L('Validate the return path, because an open redirect is a security bug.', 'Проверяйте путь возврата, открытый редирект — это дыра в безопасности.'),
        L('An expired session mid-flow needs a re-login and a replay.', 'Истёкшая в середине сессия требует повторного входа и повтора запроса.'),
        L('A fetcher can repeat the failed request without a navigation.', 'Fetcher может повторить неудавшийся запрос без навигации.'),
      ],
      code: `function InvoiceList() {
  const invoices = useLoaderData();
  const fetcher = useFetcher();

  if (fetcher.data?.status === 401) {
    // the session expired while the user was working
    return <LoginPrompt next="/invoices" />;
  }

  return (
    <ul>
      {invoices.map((invoice) => (
        <li key={invoice.id}>{invoice.number}</li>
      ))}
    </ul>
  );
}`,
      table: {
        caption: L('How the two refusals differ', 'Чем отличаются два отказа'),
        headers: [L('Aspect', 'Аспект'), L('401 Unauthorized', '401 Unauthorized'), L('403 Forbidden', '403 Forbidden')],
        rows: [
          [L('Meaning', 'Значение'), L('the identity is unknown', 'личность неизвестна'), L('the identity is known', 'личность известна')],
          [L('Typical cause', 'Типичная причина'), L('expired session, missing cookie', 'истёкшая сессия, нет cookie'), L('not enough rights', 'недостаточно прав')],
          [L('What the app does', 'Что делает приложение'), L('log in again, then repeat', 'войти заново и повторить'), L('show a message, do not retry', 'показать сообщение, не повторять')],
          [L('Wrong screen for it', 'Неверный экран для него'), L('an access denied message', 'сообщение «доступ запрещён»'), L('a login form', 'форма входа')],
          [L('Should it be retried?', 'Стоит ли повторять?'), L('yes, after the login', 'да, после входа'), L('no, not without new rights', 'нет, пока нет новых прав')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The open redirect', 'Открытый редирект'),
          text: L(
            'A next parameter taken from the address and used as a redirect target lets an attacker send users to a page that looks like yours. Accept only a path that starts with a single slash and no scheme.',
            'Параметр next, взятый из адреса и использованный как цель перехода, позволяет злоумышленнику отправить пользователя на страницу, похожую на вашу. Принимайте только путь, начинающийся с одного слэша и без схемы.'
          ),
        },
      ],
      takeaway: L(
        'Answer 401 with a login that returns the user to the same place, and answer 403 with a refusal that asks for nothing more.',
        'На 401 отвечайте входом с возвратом на то же место, а на 403 — отказом, который ничего больше не требует.'
      ),
      seeAlso: [
        L('Section 4-3: protecting server loaders', 'Секция 4-3: защита загрузчиков на сервере'),
        L('Section 3-4: forms, fetchers and progressive enhancement', 'Секция 3-4: формы, fetcher и прогрессивное улучшение'),
        L('Section 3-5: errorElement and error boundaries', 'Секция 3-5: errorElement и границы ошибок'),
      ],
    },
    {
      id: 'router-ch4-s5',
      title: L('Role-based access control in the router', 'Ролевое управление доступом в роутере'),
      body: L(
        'Roles are a coarse label, and the router is a good place to express them, because the tree says which routes a role can reach. A route object can carry a handle with the metadata a guard needs, so the check reads the permission from the matched route instead of from a hardcoded list inside the guard.\n\nThe trap is to put the role check only in the interface. The tree then describes a policy the server never sees, and the same route reached through a direct request is unguarded. A role check in a loader filters what is returned, and the role check in the element is only the visible consequence of it. Both have to exist, and the server one is the one that matters.\n\nPermissions are finer than roles and follow the same shape. Instead of a role name, the handle carries the permission the route needs, and a single guard compares the permissions of the user with the permission of the route. That keeps the policy in one place and stops every new route from inventing its own comparison.',
        'Роли — грубая метка, а роутер хорошее место, чтобы их выразить, потому что дерево показывает, до каких маршрутов роль дотягивается. Объект маршрута может нести handle с метаданными, которые нужны защите, и тогда проверка читает право из совпавшего маршрута, а не из захардкоженного списка внутри защиты.\n\nЛовушка в том, что проверка роли живёт только в интерфейсе. Дерево тогда описывает политику, которой сервер никогда не видел, а тот же маршрут, достигнутый прямым запросом, остаётся без защиты. Проверка роли в загрузчике фильтрует то, что отдаётся, а проверка роли в элементе — лишь видимое следствие её. Обе должны быть, и важна серверная.\n\nПрава — тоньше, чем роли, и устроены так же. Вместо имени роли handle несёт право, которое нужно маршруту, а единая защита сравнивает права пользователя с правом маршрута. Так политика живёт в одном месте, и каждый новый маршрут не придумывает собственное сравнение.'
      ),
      bullets: [
        L('A handle carries the role or the permission a route needs.', 'Handle несёт роль или право, нужное маршруту.'),
        L('The guard reads the handle of the matched route.', 'Защита читает handle совпавшего маршрута.'),
        L('A role check in the interface protects nothing on its own.', 'Проверка роли только в интерфейсе не защищает ничего.'),
        L('Permissions are finer than roles and use the same mechanism.', 'Права тоньше ролей и работают тем же механизмом.'),
        L('Every route that needs a check must declare it explicitly.', 'Каждый маршрут, которому нужна проверка, объявляет её явно.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/admin',
    handle: { permission: 'admin:read' },
    loader: async ({ request }) => {
      const user = await requireUser(request);
      if (!user.permissions.includes('admin:read')) {
        throw new Response('Forbidden', { status: 403 });
      }
      return { user };
    },
    element: <AdminArea />,
  },
]);`,
      table: {
        caption: L('Roles against permissions', 'Роли против прав'),
        headers: [L('Aspect', 'Аспект'), L('Role', 'Роль'), L('Permission', 'Право')],
        rows: [
          [L('Granularity', 'Гранулярность'), L('coarse, a label', 'грубая, метка'), L('fine, one capability', 'мелкое, одна возможность')],
          [L('Example', 'Пример'), L('editor', 'редактор'), L('invoice:approve', 'invoice:approve')],
          [L('Where it is checked', 'Где проверяется'), L('one place per role', 'одно место на роль'), L('one place per permission', 'одно место на право')],
          [L('Cost of adding one', 'Цена добавления'), L('a new role for everyone', 'новая роль для всех'), L('a new entry for a few', 'новая запись для немногих')],
          [L('Fits in a handle', 'Помещается в handle'), L('yes', 'да'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The handle is metadata, not a mechanism', 'Handle — это метаданные, а не механизм'),
          text: L(
            'Putting a permission in a handle does not enforce anything by itself. The loader and the guard have to read it, and the server has to enforce it separately, otherwise the handle is only a comment with a nice shape.',
            'Право в handle само по себе ничего не обеспечивает. Его должны читать загрузчик и защита, а сервер обязан проверить его отдельно, иначе handle — это просто комментарий красивой формы.'
          ),
        },
      ],
      takeaway: L(
        'Declare the permission a route needs in its handle, and enforce it in the loader that serves the data.',
        'Объявляйте нужное маршруту право в его handle и применяйте его в загрузчике, который отдаёт данные.'
      ),
      seeAlso: [
        L('Section 4-2: authentication versus authorisation', 'Секция 4-2: аутентификация против авторизации'),
        L('Section 4-3: protecting server loaders', 'Секция 4-3: защита загрузчиков на сервере'),
        L('Chapter 7: useMatches and breadcrumbs', 'Глава 7: useMatches и хлебные крошки'),
      ],
    },
  ],
};
