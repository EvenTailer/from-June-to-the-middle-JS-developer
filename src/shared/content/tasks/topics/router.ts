import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerTasks: PracticeTask[] = [
  {
    id: 'topic-router-1',
    moduleId: 'react-router',
    topic: 'router',
    level: 'basic',
    title: L('A nested route with a layout', 'Вложенный маршрут с макетом'),
    brief: L(
      'Build a router with a layout route and two pages inside it. The root route has the path "/" and renders a layout component called RootLayout. The layout renders a header with an h1 element containing the text "Shop", a nav element with two links, one to "/" with the text "Home" and one to "/catalog" with the text "Catalog", and a main element. Inside the main element the layout renders the child route with the Outlet component. The root route has two children: an index route with the element HomePage that renders the text "Home page", and a child route with the path "catalog" and the element CatalogPage that renders the text "Catalog". The layout must not be written twice: visiting /catalog must show the header and the nav of the layout together with the catalog content. Example: on the URL /catalog the page shows the heading "Shop", both links and the text "Catalog" inside the main element.',
      'Построй роутер с маршрутом-макетом и двумя страницами внутри него. Корневой маршрут имеет путь "/" и рендерит компонент макета RootLayout. Макет рендерит header с элементом h1, содержащим текст "Shop", элемент nav с двумя ссылками: одной на "/" с текстом "Home" и одной на "/catalog" с текстом "Catalog", и элемент main. Внутри main макет рендерит дочерний маршрут компонентом Outlet. У корневого маршрута два дочерних: индексный маршрут с элементом HomePage, рендерящим текст "Home page", и дочерний маршрут с путём "catalog" и элементом CatalogPage, рендерящим текст "Catalog". Макет не должен писаться дважды: при переходе на /catalog должны показываться header и nav макета вместе с содержимым каталога. Пример: по адресу /catalog страница показывает заголовок "Shop", обе ссылки и текст "Catalog" внутри элемента main.'
    ),
    hint: L(
      'A child route with the index property renders at the path of its parent. The Outlet component is the place where the child route is placed inside the parent element.',
      'Дочерний маршрут со свойством index рендерится по пути своего родителя. Компонент Outlet — это место, куда попадает дочерний маршрут внутри элемента родителя.'
    ),
    solution: `import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

function RootLayout() {
  return (
    <div className="app">
      <header>
        <h1>Shop</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function HomePage() {
  return <p>Home page</p>;
}

function CatalogPage() {
  return <p>Catalog</p>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}`,
    explanation: L(
      'A route tree describes the interface of the application as data, and the nesting of the objects is the nesting of the layout. The parent route renders the layout, the child routes render the content, and the Outlet marks the exact spot in the layout where the content goes. The index route is what makes the parent path show a page of its own: it has no path of its own and matches the path of the parent exactly. The child paths are relative, so "catalog" becomes "/catalog" under the parent. This is what removes the duplication: the header and the nav exist in one component, and adding a third page means adding one more child object, not copying the layout.',
      'Дерево маршрутов описывает интерфейс приложения как данные, и вложенность объектов — это вложенность макета. Родительский маршрут рендерит макет, дочерние — содержимое, а Outlet отмечает точное место в макете, куда попадает содержимое. Индексный маршрут отвечает за то, что путь родителя показывает собственную страницу: у него нет своего пути, и он совпадает с путём родителя. Пути дочерних относительные, поэтому "catalog" становится "/catalog" внутри родителя. Именно это убирает дублирование: header и nav существуют в одном компоненте, а третья страница — это ещё один дочерний объект, а не копия макета.'
    ),
  },
  {
    id: 'topic-router-2',
    moduleId: 'react-router',
    topic: 'router',
    level: 'basic',
    title: L('Reading params and query string', 'Чтение параметров и строки запроса'),
    brief: L(
      'Write a product page that reads both the route parameter and the query string. The route is "products/:productId". The component gets the id of the product from useParams and types it as a string. The component gets the query string from useSearchParams: the parameter "tab" selects the active tab, and when it is missing the value must be "description". The component renders an h1 with the text "Product " followed by the id, a nav with three links to the tabs "description", "specs" and "reviews", a p element with the text "Active tab: " followed by the active tab, and a button with the text "Jump to reviews" that sets the query string to the pairs tab=reviews and page=2. The links to the tabs must keep the current path and change only the query string. Example: on the URL /products/42?tab=specs the component shows "Product 42" and "Active tab: specs", and after pressing the button it shows "Active tab: reviews".',
      'Напишите страницу товара, которая читает и параметр маршрута, и строку запроса. Маршрут — "products/:productId". Компонент берёт id товара из useParams и типизирует его как string. Строку запроса компонент берёт из useSearchParams: параметр "tab" выбирает активную вкладку, а если его нет, значение должно быть "description". Компонент рендерит h1 с текстом "Product " и id после него, nav с тремя ссылками на вкладки "description", "specs" и "reviews", элемент p с текстом "Active tab: " и активной вкладкой после него, и кнопку с текстом "Jump to reviews", которая задаёт строку запроса в пары tab=reviews и page=2. Ссылки на вкладки должны сохранять текущий путь и менять только строку запроса. Пример: по адресу /products/42?tab=specs компонент показывает "Product 42" и "Active tab: specs", а после нажатия кнопки — "Active tab: reviews".'
    ),
    hint: L(
      'A link with the address that starts with a question mark keeps the current path and replaces the query string. The setter returned by useSearchParams accepts an object with the pairs. The generic argument of useParams types the parameters of the route.',
      'Ссылка с адресом, начинающимся с вопросительного знака, сохраняет текущий путь и заменяет строку запроса. Сеттер, который возвращает useSearchParams, принимает объект с парами. Обобщение useParams задаёт тип параметров маршрута.'
    ),
    solution: `import { Link, useParams, useSearchParams } from 'react-router-dom';

const TABS = ['description', 'specs', 'reviews'] as const;

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'description';

  return (
    <section className="product">
      <h1>Product {productId}</h1>

      <nav aria-label="Product sections">
        {TABS.map((tab) => (
          <Link key={tab} to={'?tab=' + tab}>
            {tab}
          </Link>
        ))}
      </nav>

      <p>Active tab: {activeTab}</p>

      <button
        type="button"
        onClick={() => setSearchParams({ tab: 'reviews', page: '2' })}
      >
        Jump to reviews
      </button>
    </section>
  );
}`,
    explanation: L(
      'The path parameter and the query string are two different things and they are read with two different hooks. The parameter is part of the path pattern, so it identifies the resource and it is typed by the generic argument of useParams, which makes the name of the parameter and its type a compile time fact. The query string is not part of the matching, it is extra data for the same page, and useSearchParams returns both the current parameters and a function to change them. A link whose address starts with a question mark is a relative link to the current path with a new query string, so switching tabs never leaves the product. The value is read with get, which returns null when the parameter is missing, and the fallback with ?? is what turns that null into a usable default.',
      'Параметр пути и строка запроса — разные вещи, и читаются они разными хуками. Параметр входит в шаблон пути, поэтому он определяет ресурс, и его тип задаётся обобщением useParams, что делает имя параметра и его тип фактом времени компиляции. Строка запроса не участвует в сопоставлении, это дополнительные данные для той же страницы, а useSearchParams возвращает и текущие параметры, и функцию их изменения. Ссылка, адрес которой начинается с вопросительного знака, — относительная ссылка на текущий путь с новой строкой запроса, поэтому переключение вкладок не уводит с товара. Значение читается через get, который возвращает null, если параметра нет, и запасной вариант через ?? превращает этот null в рабочее значение по умолчанию.'
    ),
  },
  {
    id: 'topic-router-3',
    moduleId: 'react-router',
    topic: 'router',
    level: 'basic',
    title: L('A loader that feeds the component', 'Loader, отдающий данные компоненту'),
    brief: L(
      'Load a product before the page is rendered. Write a loader function productLoader that receives the loader arguments and takes the id of the product from the params of the arguments. The loader requests the address "/api/products/" plus that id, and if the response is not ok it throws a Response with the body "Product not found" and the status 404. If the response is ok, the loader returns the parsed body as an object with the fields id of type string, title of type string and price of type number. Write a component ProductRoute that reads the data with useLoaderData and renders an article with an h1 containing the title and a p containing the price followed by the text " USD". Example: for a product with the title "Desk lamp" and the price 45 the article shows the heading "Desk lamp" and the text "45 USD", and for a missing product the loader throws and the route error handling takes over.',
      'Загрузи товар до отрисовки страницы. Напиши функцию productLoader, которая получает аргументы загрузчика и берёт id товара из params аргументов. Загрузчик обращается по адресу "/api/products/" плюс этот id, и если ответ не ok, бросает Response с телом "Product not found" и статусом 404. Если ответ ok, загрузчик возвращает распарсенное тело как объект с полями id типа string, title типа string и price типа number. Напиши компонент ProductRoute, который читает данные через useLoaderData и рендерит article с h1, содержащим title, и p, содержащим price и текст " USD" после него. Пример: для товара с title "Desk lamp" и price 45 статья показывает заголовок "Desk lamp" и текст "45 USD", а для отсутствующего товара загрузчик бросает Response и срабатывает обработка ошибок маршрута.'
    ),
    hint: L(
      'The loader arguments have the shape of the request, the params and the context. Throwing a Response from a loader is the way to send the router to the error boundary of the route.',
      'Аргументы загрузчика имеют форму запроса, params и контекста. Бросок Response из загрузчика — это способ отправить роутер к границе ошибок маршрута.'
    ),
    solution: `import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';

export interface Product {
  id: string;
  title: string;
  price: number;
}

export async function productLoader({ params }: LoaderFunctionArgs) {
  const response = await fetch('/api/products/' + params.productId);

  if (!response.ok) {
    throw new Response('Product not found', { status: 404 });
  }

  return (await response.json()) as Product;
}

export function ProductRoute() {
  const product = useLoaderData() as Product;

  return (
    <article className="product">
      <h1>{product.title}</h1>
      <p>{product.price} USD</p>
    </article>
  );
}

export const productRouteObject = {
  path: 'products/:productId',
  loader: productLoader,
  element: <ProductRoute />,
};`,
    explanation: L(
      'A loader runs before the route renders, so the component receives data that is already there and never has to handle the loading state itself. The router waits for the loader, and while it waits the old screen stays on the place, which is much better than a spinner on every navigation. The loader returns plain data, not a response, and the router serializes it, which is why useLoaderData gives the value directly. Throwing a Response is the way to fail on purpose: the router catches it and renders the error element of the nearest route that has one, and the status and the body of the response are available there. The result is a single source of truth for the data of the route, which is also what lets the router prefetch and cache it.',
      'Loader выполняется до того, как маршрут отрисовается, поэтому компонент получает уже готовые данные и не занимается состоянием загрузки. Роутер ждёт загрузчик, и пока ждёт, на экране остаётся предыдущая страница — это намного лучше, чем спиннер при каждом переходе. Загрузчик возвращает обычные данные, а не ответ, и роутер их сериализует, поэтому useLoaderData отдаёт значение напрямую. Бросок Response — это способ осознанно завершиться ошибкой: роутер ловит его и рендерит элемент ошибки ближайшего маршрута, у которого он есть, причём статус и тело ответа там доступны. В итоге у маршрута один источник истины для данных, и именно это позволяет роутеру предзагружать и кэшировать их.'
    ),
  },
  {
    id: 'topic-router-4',
    moduleId: 'react-router',
    topic: 'router',
    level: 'intermediate',
    title: L('An action with a form', 'Action вместе с формой'),
    brief: L(
      'Submit a form to the server through a route action. Write an action createTodoAction that receives the action arguments and takes the form data from the request. The field with the name "title" is required: if the trimmed value is empty, the action returns an object with the field error and the text "Title is required". Otherwise the action sends a POST request to the address "/api/todos" with the JSON body that contains the title, and then redirects to the path "/todos". Write a component NewTodoPage that renders a Form with the method "post", a label with the htmlFor "title" and the text "Title", an input with the id "title", the name "title" and the attribute required, a p element with the role "alert" that shows the error from useActionData when there is one, and a submit button with the text "Create". While the submission is in flight the button must be disabled and its text must be "Saving...". Example: submitting an empty title shows the alert with the text "Title is required" and the page stays, a valid title creates the todo and the router moves to /todos.',
      'Отправь форму серверу через action маршрута. Напиши action createTodoAction, который получает аргументы action и берёт данные формы из request. Поле с именем "title" обязательно: если обрезанное значение пустое, action возвращает объект с полем error и текстом "Title is required". Иначе action отправляет POST-запрос на адрес "/api/todos" с JSON-телом, содержащим title, и затем перенаправляет на путь "/todos". Напиши компонент NewTodoPage, который рендерит Form с методом "post", label с htmlFor "title" и текстом "Title", input с id "title", именем "title" и атрибутом required, элемент p с ролью "alert", показывающий ошибку из useActionData, когда она есть, и submit-кнопку с текстом "Create". Пока отправка в процессе, кнопка должна быть заблокирована, а её текст — "Saving...". Пример: отправка пустого title показывает alert с текстом "Title is required" и страница остаётся, корректный title создаёт задачу, и роутер переходит на /todos.'
    ),
    hint: L(
      'The Form component of the router submits without a page reload and knows which action of the route to call. The navigation state tells you what is happening right now, and the state "submitting" means the action is running.',
      'Компонент Form роутера отправляет без перезагрузки страницы и знает, какое action маршрута вызвать. Состояние навигации говорит, что происходит прямо сейчас, и состояние "submitting" означает, что action выполняется.'
    ),
    solution: `import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from 'react-router-dom';

export async function createTodoAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get('title') ?? '').trim();

  if (title.length === 0) {
    return { error: 'Title is required' };
  }

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  return redirect('/todos');
}

export function NewTodoPage() {
  const actionData = useActionData<{ error: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className="todo-form">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" required />

      {actionData?.error ? <p role="alert">{actionData.error}</p> : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Create'}
      </button>
    </Form>
  );
}`,
    explanation: L(
      'The action is the server side of the route: it receives a request, does the work and returns either data or a redirect. The Form component is aware of the route, so the form posts to the action of that route without a full page reload, and the browser keeps working with the client side router. Returning plain data from the action puts it into useActionData, which is how a validation error comes back to the form and is rendered near the field, while returning a redirect leaves the page. The navigation state gives a uniform way to know that the submission is running, which is what disables the button and prevents a second submit while the first one is still in flight. Validation lives on the server because the server is the one that must trust the data, and the required attribute on the input is only a convenience for the user.',
      'Action — это серверная сторона маршрута: он получает запрос, делает работу и возвращает либо данные, либо перенаправление. Компонент Form знает свой маршрут, поэтому форма отправляется в action этого маршрута без полной перезагрузки страницы, и браузер продолжает работать с клиентским роутером. Обычные данные, возвращённые из action, попадают в useActionData — так ошибка валидации возвращается в форму и рисуется рядом с полем, а перенаправление уводит со страницы. Состояние навигации даёт единый способ узнать, что отправка идёт, и на этом основании кнопка блокируется, пока первый запрос ещё не завершён. Валидация живёт на сервере, потому что именно сервер должен доверять данным, а атрибут required на поле — только удобство для пользователя.'
    ),
  },
  {
    id: 'topic-router-5',
    moduleId: 'react-router',
    topic: 'router',
    level: 'intermediate',
    title: L('A protected route that redirects', 'Защищённый маршрут с перенаправлением'),
    brief: L(
      'Protect a part of the application so that only a signed in user can see it. Write a loader protectedLoader that receives the loader arguments, reads the cookie header of the request and extracts the value of the cookie named "session" with a regular expression of the form /session=([^;]+)/. If there is no such cookie, the loader throws a redirect to the path "/login" with the query parameter "from" that holds the path the user wanted, url encoded. If the cookie is there, the loader returns an object with the field user that holds an object with id of type string and name of type string, where the name is the decoded value of the cookie. Write a component ProtectedLayout that reads the data with useLoaderData, shows the text "Signed in as " followed by the name of the user, and renders the Outlet for the protected children. Example: with the cookie "session=Ann" the loader returns the user Ann and the layout shows "Signed in as Ann", and without the cookie the router moves to "/login?from=%2Fadmin".',
      'Защити часть приложения так, чтобы её видел только вошедший пользователь. Напиши loader protectedLoader, который получает аргументы загрузчика, читает заголовок Cookie запроса и извлекает значение cookie с именем "session" регулярным выражением вида /session=([^;]+)/. Если такой cookie нет, загрузчик бросает перенаправление на путь "/login" с параметром запроса "from", в котором закодирован путь, куда хотел попасть пользователь. Если cookie есть, загрузчик возвращает объект с полем user, содержащим объект с id типа string и name типа string, где name — декодированное значение cookie. Напиши компонент ProtectedLayout, который читает данные через useLoaderData, показывает текст "Signed in as " и имя пользователя после него, и рендерит Outlet для защищённых дочерних маршрутов. Пример: при cookie "session=Ann" загрузчик возвращает пользователя Ann и макет показывает "Signed in as Ann", а без cookie роутер уходит на "/login?from=%2Fadmin".'
    ),
    hint: L(
      'A loader that throws a redirect stops the navigation and sends the router to the new location, and the query string keeps the original target so the login page can send the user back. Throwing a Response is how a loader reports a failure.',
      'Загрузчик, бросающий перенаправление, останавливает навигацию и отправляет роутер на новое место, а параметр запроса сохраняет исходную цель, чтобы страница входа могла вернуть пользователя назад. Бросок Response — это способ загрузчика сообщить об ошибке.'
    ),
    solution: `import {
  Outlet,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router-dom';

export interface SessionUser {
  id: string;
  name: string;
}

function getSessionUser(request: Request): SessionUser | null {
  const cookieHeader = request.headers.get('Cookie') ?? '';
  const match = /session=([^;]+)/.exec(cookieHeader);

  if (!match) {
    return null;
  }

  return {
    id: 'u-1',
    name: decodeURIComponent(match[1]),
  };
}

export async function protectedLoader({ request }: LoaderFunctionArgs) {
  const user = getSessionUser(request);

  if (!user) {
    const url = new URL(request.url);
    const from = encodeURIComponent(url.pathname);
    throw redirect('/login?from=' + from);
  }

  return { user };
}

export function ProtectedLayout() {
  const { user } = useLoaderData() as { user: SessionUser };

  return (
    <div className="protected">
      <p>Signed in as {user.name}</p>
      <Outlet />
    </div>
  );
}

export const protectedRouteObject = {
  path: 'admin',
  loader: protectedLoader,
  element: <ProtectedLayout />,
  children: [{ index: true, element: <p>Admin home</p> }],
};`,
    explanation: L(
      'The guard belongs in the loader, not in the component, because the loader runs before the route renders and before the data of the child routes is fetched. A component level check would let the child loaders start and would show a flash of the protected content before the redirect happens. Throwing a redirect from the loader stops the whole navigation, so no protected data is ever requested. The original path is passed in the query string, encoded, so the login page can send the user back to the page they wanted instead of the home page. The layout itself stays simple: it reads the user that the loader already checked and renders the Outlet, and the same layout protects any number of child routes.',
      'Проверка доступа должна жить в загрузчике, а не в компоненте, потому что загрузчик выполняется до отрисовки маршрута и до запроса данных дочерних маршрутов. Проверка в компоненте запустила бы дочерние загрузчики и показала бы вспышку защищённого содержимого до перенаправления. Бросок перенаправления из загрузчика останавливает всю навигацию, поэтому защищённые данные не запрашиваются вообще. Исходный путь передаётся в параметре запроса в закодированном виде, чтобы страница входа могла вернуть пользователя туда, куда он шёл, а не на главную. Сам макет остаётся простым: он читает пользователя, которого загрузчик уже проверил, и рендерит Outlet, и такой макет защищает любое число дочерних маршрутов.'
    ),
  },
  {
    id: 'topic-router-6',
    moduleId: 'react-router',
    topic: 'router',
    level: 'advanced',
    title: L('An error element for a route', 'Элемент ошибки для маршрута'),
    brief: L(
      'Write an error element that handles both kinds of failure. The component calls useRouteError to get the error. If the error is a route error response, checked with isRouteErrorResponse, the component renders an h1 with the status and the status text of the response, a p with the data of the response when the data is a string and the text "Something went wrong" otherwise, and a Link to the path "/" with the text "Back home". If the error is not a route error response, the component renders an h1 with the text "Unexpected error" and a p with the message of the error when it is an instance of Error and the text "Unknown error" otherwise. The component must never throw itself, because it is rendered when something else has already failed. Attach the component as the errorElement of the route with the path "products/:productId" that loads the product. Example: when the loader throws a Response with the status 404 and the body "Product not found", the error element shows the status 404 and the text "Product not found".',
      'Напиши элемент ошибки, обрабатывающий оба вида сбоев. Компонент получает ошибку через useRouteError. Если ошибка — это ответ маршрута, проверенный через isRouteErrorResponse, компонент рендерит h1 со статусом и статус-текстом ответа, p с данными ответа, если данные — строка, и текстом "Something went wrong" в противном случае, и Link на путь "/" с текстом "Back home". Если ошибка не является ответом маршрута, компонент рендерит h1 с текстом "Unexpected error" и p с сообщением ошибки, если это экземпляр Error, и текстом "Unknown error" в противном случае. Компонент не должен сам бросать исключения, потому что он рендерится, когда что-то другое уже упало. Подключи компонент как errorElement маршрута с путём "products/:productId", который загружает товар. Пример: когда загрузчик бросает Response со статусом 404 и телом "Product not found", элемент ошибки показывает статус 404 и текст "Product not found".'
    ),
    hint: L(
      'isRouteErrorResponse tells a thrown Response apart from a thrown Error, so the two branches can render different messages. The status and the data of the response are the details that the loader provided.',
      'isRouteErrorResponse отличает брошенный Response от брошенной Error, поэтому две ветки могут показывать разные сообщения. Статус и данные ответа — это те подробности, которые дал загрузчик.'
    ),
    solution: `import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{typeof error.data === 'string' ? error.data : 'Something went wrong'}</p>
        <Link to="/">Back home</Link>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>Unexpected error</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </main>
  );
}

export const productRouteObject = {
  path: 'products/:productId',
  loader: async ({ params }: { params: { productId?: string } }) => {
    const response = await fetch('/api/products/' + params.productId);
    if (!response.ok) {
      throw new Response('Product not found', { status: 404 });
    }
    return (await response.json()) as { id: string; title: string; price: number };
  },
  element: <p>Product page</p>,
  errorElement: <ErrorBoundary />,
};`,
    explanation: L(
      'The router catches the errors of a route and renders the error element of the closest route that has one, so a failure of a deep child does not blank the whole application. The error element is the only place where the error is available, which is why it must not assume anything about the shape of the failure. isRouteErrorResponse is a type guard: it narrows the unknown error to a Response with the fields status, statusText and data, so the two branches can be completely different. A loader that throws a Response carries a message that was written on purpose, while a real Error carries a stack trace of an unexpected failure, and the second branch shows a neutral message instead of the internals. The error element must not throw itself, otherwise the failure of the error handling replaces the original error.',
      'Роутер перехватывает ошибки маршрута и рендерит элемент ошибки ближайшего маршрута, у которого он есть, поэтому сбой глубокого дочернего маршрута не оставляет приложение пустым. Элемент ошибки — единственное место, где ошибка доступна, поэтому он не должен ничего предполагать о её форме. isRouteErrorResponse — это защитник типа: он сужает unknown до Response с полями status, statusText и data, и благодаря этому две ветки могут отличаться друг от друга. Загрузчик, бросающий Response, несёт сообщение, написанное намеренно, а настоящая Error несёт стек неожиданного сбоя, и вторая ветка показывает нейтральный текст вместо внутренностей. Элемент ошибки не должен бросать исключения сам, иначе сбой обработки заменит исходную ошибку.'
    ),
  },
  {
    id: 'topic-router-7',
    moduleId: 'react-router',
    topic: 'router',
    level: 'advanced',
    title: L('A lazy route behind a Suspense boundary', 'Ленивый маршрут за границей Suspense'),
    brief: L(
      'Split a rarely used page into a separate chunk and show a placeholder while it loads. Create the component ReportsPage in a separate module and load it with the lazy function of React, so that it is not part of the main bundle. Wrap the lazy component in a Suspense boundary whose fallback is a p element with the role "status" and the text "Loading reports...". Put the lazy component and the boundary into a component ReportsRoute, and use that component as the element of the route with the path "/reports" in a router created with createBrowserRouter. The application root renders the RouterProvider with that router. Example: on the first visit to /reports the browser downloads the chunk of the page, the fallback is shown while the download is in progress, and then the content of the page replaces it.',
      'Раздели редко используемую страницу на отдельный чанк и покажи заглушку, пока она грузится. Создай компонент ReportsPage в отдельном модуле и загрузи его функцией lazy из React, чтобы он не попал в основной бандл. Оберни ленивый компонент в границу Suspense, у которой fallback — это элемент p с ролью "status" и текстом "Loading reports...". Помести ленивый компонент и границу в компонент ReportsRoute и используй этот компонент как element маршрута с путём "/reports" в роутере, созданном через createBrowserRouter. Корень приложения рендерит RouterProvider с этим роутером. Пример: при первом переходе на /reports браузер скачивает чанк страницы, во время загрузки показывается fallback, а затем содержимое страницы заменяет его.'
    ),
    hint: L(
      'The lazy function takes a function that returns a promise of the module and returns a component that suspends until the module arrives. The Suspense boundary must be an ancestor of that component.',
      'Функция lazy принимает функцию, возвращающую промис модуля, и отдаёт компонент, который приостанавливается до прихода модуля. Граница Suspense должна быть предком этого компонента.'
    ),
    solution: `import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const ReportsPage = lazy(() => import('./pages/ReportsPage'));

function ReportsFallback() {
  return <p role="status">Loading reports...</p>;
}

export function ReportsRoute() {
  return (
    <Suspense fallback={<ReportsFallback />}>
      <ReportsPage />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/reports',
    element: <ReportsRoute />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}`,
    explanation: L(
      'The import inside lazy is a dynamic import, so the module is requested only when the component is rendered for the first time, and it ends up in a separate chunk that the browser downloads on demand. Until that chunk arrives, the component suspends, and the nearest Suspense boundary renders its fallback instead of the whole application. That is why the boundary has to be an ancestor of the lazy component and not somewhere else in the tree. Splitting the code pays off when the page is heavy or rarely visited: the first visit costs one extra request, and every later visit is served from the cache of the browser. The role "status" on the fallback tells the assistive technology that the content is loading, and it does not interrupt the reading of the page.',
      'Импорт внутри lazy — это динамический импорт, поэтому модуль запрашивается только при первом рендере компонента и попадает в отдельный чанк, который браузер скачивает по требованию. Пока чанк не пришёл, компонент приостанавливается, и ближайшая граница Suspense показывает свой fallback вместо всего приложения. Поэтому граница должна быть предком ленивого компонента, а не где-то ещё в дереве. Разделение кода окупается, когда страница тяжёлая или открывается редко: первый визит стоит одного лишнего запроса, а все последующие берутся из кэша браузера. Роль "status" у заглушки сообщает вспомогательным технологиям, что содержимое загружается, и не прерывает чтение страницы.'
    ),
  },
  {
    id: 'topic-router-8',
    moduleId: 'react-router',
    topic: 'router',
    level: 'advanced',
    title: L('Breadcrumbs built from the matched routes', 'Хлебные крошки из совпавших маршрутов'),
    brief: L(
      'Build a breadcrumb trail from the routes that are currently matched. Write a component Breadcrumbs that calls useMatches and gets the array of the matched routes. Every matched route has an id, a pathname and the data returned by its loader. The label of a crumb is the field crumb of the loader data when it is a string, and the pathname of the route otherwise. The component renders a nav with the aria-label "Breadcrumb" and inside it an ol with one li per matched route, in the order of the matches. The last crumb is rendered as a span with the aria-current "page" and the text of the label, and every other crumb is rendered as a Link to the pathname of its route with the text of the label. The key of each li must be the id of the matched route. To make the labels work, every route of the trail returns an object with the field crumb from its loader: the root loader returns the crumb "Home", the catalog loader returns "Catalog" and the product loader returns the title of the product. Example: on the URL /catalog/7 the trail shows "Home", "Catalog" and the title of the product, and the last one is not a link.',
      'Построй хлебные крошки из маршрутов, которые совпали сейчас. Напиши компонент Breadcrumbs, который вызывает useMatches и получает массив совпавших маршрутов. У каждого совпавшего маршрута есть id, pathname и данные, которые вернул его загрузчик. Метка крошки — это поле crumb из данных загрузчика, если это строка, и pathname маршрута в противном случае. Компонент рендерит nav с aria-label "Breadcrumb", а внутри — ol с одним li на каждый совпавший маршрут в порядке совпадений. Последняя крошка рендерится как span с aria-current "page" и текстом метки, а все остальные — как Link на pathname своего маршрута с текстом метки. Ключом каждого li должен быть id совпавшего маршрута. Чтобы метки работали, каждый маршрут цепочки возвращает из своего загрузчика объект с полем crumb: корневой загрузчик возвращает "Home", загрузчик каталога — "Catalog", а загрузчик товара — title товара. Пример: по адресу /catalog/7 цепочка показывает "Home", "Catalog" и title товара, причём последняя не является ссылкой.'
    ),
    hint: L(
      'useMatches returns one entry per matched route, from the outermost to the innermost, and each entry carries the id, the pathname and the data of the loader of that route.',
      'useMatches возвращает по одной записи на каждый совпавший маршрут, от самого внешнего к самому вложенному, и в каждой записи есть id, pathname и данные загрузчика этого маршрута.'
    ),
    solution: `import { Link, useMatches } from 'react-router-dom';

interface CrumbData {
  crumb?: string;
}

export function Breadcrumbs() {
  const matches = useMatches();
  const lastId = matches.length > 0 ? matches[matches.length - 1].id : null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs">
        {matches.map((match) => {
          const data = match.loaderData as CrumbData | undefined;
          const label = typeof data?.crumb === 'string' ? data.crumb : match.pathname;
          const isLast = match.id === lastId;

          return (
            <li key={match.id}>
              {isLast ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link to={match.pathname}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const rootLoader = () => ({ crumb: 'Home' });
export const catalogLoader = () => ({ crumb: 'Catalog' });
export const productLoader = async ({ params }: { params: { productId?: string } }) => {
  const response = await fetch('/api/products/' + params.productId);
  if (!response.ok) {
    throw new Response('Product not found', { status: 404 });
  }
  const product = (await response.json()) as { id: string; title: string };
  return { crumb: product.title };
};`,
    explanation: L(
      'The breadcrumb trail is not stored anywhere, it is derived from the routes that matched, so it can never disagree with the current location. The order of the matches is the order of the nesting, from the outermost route to the innermost, which is exactly the order the trail needs. The data of a loader is the natural place for the label, because the label of a crumb is often the title of the entity, and the loader already has it. The last crumb is rendered as a span, since a link to the page you are already on is noise for the user and for the assistive technology, and the aria-current attribute says that this is the current page. The id of the match is used as the key, because it is stable for the route and changes when the route changes.',
      'Хлебные крошки нигде не хранятся, они выводятся из совпавших маршрутов, поэтому не могут разойтись с текущим адресом. Порядок совпадений — это порядок вложенности, от самого внешнего маршрута к самому вложенному, и это ровно тот порядок, который нужен цепочке. Данные загрузчика — естественное место для метки, потому что метка крошки часто совпадает с названием сущности, а у загрузчика оно уже есть. Последняя крошка рендерится как span, потому что ссылка на страницу, на которой вы уже находитесь, только мешает и человеку, и вспомогательным технологиям, а атрибут aria-current сообщает, что это текущая страница. Ключом служит id совпадения: он стабилен для маршрута и меняется вместе с маршрутом.'
    ),
  },
];
