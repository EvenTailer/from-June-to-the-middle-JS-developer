import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextTasks: PracticeTask[] = [
  {
    id: 'topic-next-1',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'basic',
    title: L('A server component page', 'Страница из серверного компонента'),
    brief: L(
      'Write a page of the App Router that loads the products on the server. The file is app/products/page.tsx and the component is the default export. A product has id of type string, title of type string and price of type number. Write an async function getProducts that requests the address "https://api.example.com/products" with the option cache "no-store", throws an Error with the text "Failed to load products" when the response is not ok, and returns the parsed body as an array of products. The page component is async, awaits getProducts and renders a main element with an h1 containing the text "Products" and a ul with one li per product, where the li contains the title of the product, the text " — " and the price. The file must not contain the directive "use client", and the component must not use useState or useEffect. Example: for the products [{ id: "1", title: "Desk lamp", price: 45 }] the page shows the heading "Products" and one list item with the text "Desk lamp — 45".',
      'Напиши страницу App Router, которая загружает товары на сервере. Файл — app/products/page.tsx, компонент экспортируется по умолчанию. Товар имеет id типа string, title типа string и price типа number. Напиши async-функцию getProducts, которая обращается по адресу "https://api.example.com/products" с опцией cache "no-store", бросает Error с текстом "Failed to load products", если ответ не ok, и возвращает распарсенное тело как массив товаров. Компонент страницы async, ждёт getProducts и рендерит main с h1, содержащим текст "Products", и ul с одним li на товар, где li содержит title товара, текст " — " и price. В файле не должно быть директивы "use client", и компонент не должен использовать useState или useEffect. Пример: для товаров [{ id: "1", title: "Desk lamp", price: 45 }] страница показывает заголовок "Products" и один пункт списка с текстом "Desk lamp — 45".'
    ),
    hint: L(
      'A server component is an async function, so it can await directly in the body. The directive "use client" at the top of the file would turn it into a client component and would forbid the direct access to the server data.',
      'Серверный компонент — это async-функция, поэтому await работает прямо в её теле. Директива "use client" в начале файла превратила бы его в клиентский компонент и запретила бы прямой доступ к серверным данным.'
    ),
    solution: `// app/products/page.tsx
export interface Product {
  id: string;
  title: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://api.example.com/products', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return (await response.json()) as Product[];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} — {product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}`,
    explanation: L(
      'A server component runs only on the server, so it can read secrets, talk to a database and use node APIs, and none of that code ever reaches the browser. The result of the await is baked into the HTML that the server sends, and the browser downloads only the JavaScript that is really needed for the interactivity. The key of the list element must be the id of the product, because the id identifies the item itself and keeps the DOM node attached to it when the list changes. The directive "use client" is what switches the file to the client side, and it is not needed here: the page has no state and no event handlers, so there is nothing for the browser to do.',
      'Серверный компонент выполняется только на сервере, поэтому он читает секреты, ходит в базу и использует node API, и ничего из этого кода не попадает в браузер. Результат await попадает в HTML, который отправляет сервер, а браузер скачивает только тот JavaScript, который действительно нужен для интерактивности. Ключом элемента списка должен быть id товара, потому что id определяет сам элемент и держит DOM-узел привязанным к нему при изменении списка. Директива "use client" переключает файл на клиентскую сторону, и здесь она не нужна: у страницы нет состояния и обработчиков, то есть браузеру нечего делать.'
    ),
  },
  {
    id: 'topic-next-2',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'basic',
    title: L('A dynamic route with generateStaticParams', 'Динамический маршрут с generateStaticParams'),
    brief: L(
      'Create a dynamic page for the blog. The file is app/blog/[slug]/page.tsx. A post has slug of type string, title of type string and body of type string. Write an async function getPost that takes a slug and requests the address "https://api.example.com/posts/" plus that slug, returns null when the status of the response is 404, throws an Error with the text "Failed to load post" for any other bad status, and returns the parsed body otherwise. Export the async function generateStaticParams that requests the address "https://api.example.com/posts", reads the array of posts and returns an array of objects with the field slug for every post. Export the default async page component that takes the props with the field params, awaits params to get the slug, calls getPost and, when the post is null, renders an h1 with the text "Post not found", and otherwise renders an article with an h1 containing the title and a p containing the body. Example: for the slug "hello-world" the page shows the title and the body of that post, and for an unknown slug it shows the heading "Post not found".',
      'Создай динамическую страницу блога. Файл — app/blog/[slug]/page.tsx. Пост имеет slug типа string, title типа string и body типа string. Напиши async-функцию getPost, которая принимает slug и обращается по адресу "https://api.example.com/posts/" плюс этот slug, возвращает null, когда статус ответа 404, бросает Error с текстом "Failed to load post" при любом другом плохом статусе, и возвращает распарсенное тело в остальных случаях. Экспортируй async-функцию generateStaticParams, которая обращается по адресу "https://api.example.com/posts", читает массив постов и возвращает массив объектов с полем slug для каждого поста. Экспортируй async-компонент страницы по умолчанию, который принимает пропсы с полем params, ждёт params, чтобы получить slug, вызывает getPost и, когда пост null, рендерит h1 с текстом "Post not found", иначе рендерит article с h1, содержащим title, и p, содержащим body. Пример: для slug "hello-world" страница показывает title и body этого поста, а для неизвестного slug — заголовок "Post not found".'
    ),
    hint: L(
      'In the App Router the params of a page are a promise, so they have to be awaited. The function generateStaticParams tells the framework which values of the dynamic segment to pre-render at build time.',
      'В App Router параметры страницы — это промис, поэтому их нужно дождаться. Функция generateStaticParams сообщает фреймворку, какие значения динамического сегмента нужно отрендерить заранее при сборке.'
    ),
    solution: `// app/blog/[slug]/page.tsx
export interface Post {
  slug: string;
  title: string;
  body: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const response = await fetch('https://api.example.com/posts/' + slug);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to load post');
  }

  return (await response.json()) as Post;
}

export async function generateStaticParams() {
  const response = await fetch('https://api.example.com/posts');
  const posts = (await response.json()) as Post[];

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
    explanation: L(
      'The square brackets around slug in the folder name mark the segment as dynamic, and the page receives the value of that segment in params. In the App Router params is a promise, because the framework can start rendering before it knows every value, so it has to be awaited. generateStaticParams runs at build time and lists the slugs that must exist in the HTML, which turns the page into a static one for those slugs. The remaining slugs are rendered on demand and cached. Returning null for a missing post and checking it in the component is what lets a missing post produce a normal page instead of a crash, and the status 404 is handled separately from a real failure of the server so that the two are not confused.',
      'Квадратные скобки вокруг slug в имени папки помечают сегмент как динамический, и страница получает значение этого сегмента в params. В App Router params — это промис, потому что фреймворк может начать рендер раньше, чем узнает все значения, поэтому его нужно дождаться. generateStaticParams выполняется при сборке и перечисляет слаги, которые должны быть в HTML, что делает страницу статической для этих слагов. Остальные слаги рендерятся по требованию и кэшируются. Возврат null для отсутствующего поста и проверка в компоненте дают обычную страницу вместо падения, а статус 404 обрабатывается отдельно от настоящего сбоя сервера, чтобы не путать их.'
    ),
  },
  {
    id: 'topic-next-3',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'basic',
    title: L('A route handler that accepts a POST', 'Route handler, принимающий POST'),
    brief: L(
      'Create an API endpoint for todos. The file is app/api/todos/route.ts. Export an async function GET that returns the array of two todos, each with id of type string, title of type string and done of type boolean. Export an async function POST that takes the request, reads the JSON body and returns a Response. The body of the request must contain the field title of type string. If the body is not valid JSON, the handler must return a response with the status 400 and the JSON body { error: "Invalid JSON body" }. If the title is missing or its trimmed value is empty, the handler must return a response with the status 422 and the JSON body { error: "title is required" }. Otherwise the handler creates a todo with a new id, the trimmed title and done false, and returns it with the status 201. Use NextResponse.json for every answer. Example: sending the body { "title": "Buy milk" } gives the status 201 and the answer { "id": "...", "title": "Buy milk", "done": false }, and sending the body {} gives the status 422 with the message "title is required".',
      'Создай API-эндпоинт для задач. Файл — app/api/todos/route.ts. Экспортируй async-функцию GET, которая возвращает массив из двух задач, каждая с id типа string, title типа string и done типа boolean. Экспортируй async-функцию POST, которая принимает request, читает JSON-тело и возвращает Response. В теле запроса должно быть поле title типа string. Если тело не является валидным JSON, обработчик должен вернуть ответ со статусом 400 и JSON-телом { error: "Invalid JSON body" }. Если title отсутствует или его обрезанное значение пустое, обработчик должен вернуть ответ со статусом 422 и JSON-телом { error: "title is required" }. Иначе обработчик создаёт задачу с новым id, обрезанным title и done false и возвращает её со статусом 201. Для каждого ответа используй NextResponse.json. Пример: при теле { "title": "Buy milk" } получается статус 201 и ответ { "id": "...", "title": "Buy milk", "done": false }, а при теле {} — статус 422 с сообщением "title is required".'
    ),
    hint: L(
      'Inside a route handler the request is a standard Request object, so it has a json method that may throw. The status codes 400, 422 and 201 have different meanings: the body is broken, the body is understood but the data is invalid, and the resource was created.',
      'Внутри route handler request — это обычный объект Request, у него есть метод json, который может бросить исключение. Статусы 400, 422 и 201 означают разное: тело сломано, тело понято, но данные невалидны, ресурс создан.'
    ),
    solution: `// app/api/todos/route.ts
import { NextResponse } from 'next/server';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const todos: Todo[] = [
  { id: '1', title: 'Buy milk', done: false },
  { id: '2', title: 'Write code', done: true },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  let payload: { title?: string };

  try {
    payload = (await request.json()) as { title?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const title = (payload.title ?? '').trim();

  if (title.length === 0) {
    return NextResponse.json({ error: 'title is required' }, { status: 422 });
  }

  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    done: false,
  };

  todos.push(todo);

  return NextResponse.json(todo, { status: 201 });
}`,
    explanation: L(
      'A route handler replaces an API controller: the name of the exported function is the HTTP method, and the file name gives the path. The handler runs on the server, so it can read the database and the environment variables, and it never ships that code to the browser. Parsing the body may fail, and a broken body is a client error, so the answer is 400. A body that parses but carries an empty title is a different problem: the request was understood but the data is not acceptable, so the answer is 422. A successful creation is 201 with the created object in the body. Distinguishing the two error statuses is not pedantry: a client can retry after a 400, but it has to fix the data before a 422 will ever succeed.',
      'Route handler заменяет API-контроллер: имя экспортируемой функции — это HTTP-метод, а имя файла задаёт путь. Обработчик выполняется на сервере, поэтому читает базу и переменные окружения, и этот код никогда не попадает в браузер. Разбор тела может упасть, и сломанное тело — это ошибка клиента, поэтому ответ 400. Тело, которое разобралось, но несёт пустой title, — это другая проблема: запрос поняли, но данные неприемлемы, поэтому ответ 422. Успешное создание — это 201 с созданным объектом в теле. Различать эти два статуса не занудство: после 400 клиент может повторить попытку, а вот после 422 данные надо сначала исправить.'
    ),
  },
  {
    id: 'topic-next-4',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'intermediate',
    title: L('A server action that validates the form', 'Server action с валидацией формы'),
    brief: L(
      'Write a server action that creates a post and validates the input. The file is app/actions.ts and it starts with the directive "use server". Export an async function createPost that takes two arguments: the previous state of type { error?: string; success?: boolean } and the form data of type FormData. The previous state is not used. Read the field "title" and the field "body" from the form data, convert them to strings and trim them. If the title is shorter than 3 characters, return an object with the field error and the text "Title must be at least 3 characters". If the body is shorter than 10 characters, return an object with the field error and the text "Body must be at least 10 characters". Otherwise send a POST request to the address "https://api.example.com/posts" with the JSON body that contains the title and the body, and return an object with the field success and the value true. Write a client component NewPostForm that uses the action with useActionState from React, renders a label with the htmlFor "title", an input with the id "title" and the name "title", a label with the htmlFor "body", a textarea with the id "body" and the name "body", a p element with the role "alert" that shows the error when there is one, and a submit button with the text "Publish". Example: publishing with the title "Hi" shows the alert with the text "Title must be at least 3 characters" and nothing is sent to the server.',
      'Напиши server action, который создаёт пост и проверяет ввод. Файл — app/actions.ts, он начинается с директивы "use server". Экспортируй async-функцию createPost, которая принимает два аргумента: предыдущее состояние типа { error?: string; success?: boolean } и данные формы типа FormData. Предыдущее состояние не используется. Прочитай из данных формы поля "title" и "body", приведи их к строкам и обрежь. Если title короче 3 символов, верни объект с полем error и текстом "Title must be at least 3 characters". Если body короче 10 символов, верни объект с полем error и текстом "Body must be at least 10 characters". Иначе отправь POST-запрос на адрес "https://api.example.com/posts" с JSON-телом, содержащим title и body, и верни объект с полем success и значением true. Напиши клиентский компонент NewPostForm, который использует действие через useActionState из React, рендерит label с htmlFor "title", input с id "title" и именем "title", label с htmlFor "body", textarea с id "body" и именем "body", элемент p с ролью "alert", показывающий ошибку, когда она есть, и submit-кнопку с текстом "Publish". Пример: публикация с title "Hi" показывает alert с текстом "Title must be at least 3 characters", и на сервер ничего не уходит.'
    ),
    hint: L(
      'The directive "use server" marks every exported async function of the file as a server action. The hook useActionState calls the action and gives back both the state and the function that starts it.',
      'Директива "use server" помечает каждую экспортированную async-функцию файла как server action. Хук useActionState вызывает действие и отдаёт и состояние, и функцию запуска.'
    ),
    solution: `// app/actions.ts
'use server';

export interface CreatePostState {
  error?: string;
  success?: boolean;
}

export async function createPost(
  _previousState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const title = String(formData.get('title') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();

  if (title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }

  if (body.length < 10) {
    return { error: 'Body must be at least 10 characters' };
  }

  await fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });

  return { success: true };
}

// app/new-post/NewPostForm.tsx
'use client';

import { useActionState } from 'react';
import { createPost, type CreatePostState } from '../actions';

const initialState: CreatePostState = {};

export function NewPostForm() {
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" />

      <label htmlFor="body">Body</label>
      <textarea id="body" name="body" />

      {state.error ? <p role="alert">{state.error}</p> : null}

      <button type="submit">Publish</button>
    </form>
  );
}`,
    explanation: L(
      'A server action is a function that runs on the server and is called from the client as if it were an ordinary function. The directive "use server" is what turns the exports of the file into actions, and the browser sends the arguments over the network instead of the code. The action therefore owns the validation, and the client cannot skip it by changing the markup, which is the reason to validate on the server rather than in the component. The signature with the previous state and the form data is the shape that useActionState expects: the hook keeps the returned object as the state, so the error message appears in the component after the call without any extra plumbing. The form is a plain form with the action attribute, and the browser posts the fields to the server action by itself.',
      'Server action — это функция, которая выполняется на сервере и вызывается с клиента как обычная функция. Директива "use server" превращает экспорты файла в действия, и браузер отправляет аргументы по сети, а не сам код. Поэтому валидацию владеет действие, и клиент не может её обойти, изменив разметку, — именно поэтому проверку делают на сервере, а не в компоненте. Сигнатура с предыдущим состоянием и данными формы — это форма, которую ожидает useActionState: хук сохраняет возвращённый объект как состояние, поэтому текст ошибки появляется в компоненте после вызова без лишней обвязки. Форма обычная, с атрибутом action, и браузер сам отправляет поля в server action.'
    ),
  },
  {
    id: 'topic-next-5',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'intermediate',
    title: L('Revalidating a path after a mutation', 'Ревалидация пути после мутации'),
    brief: L(
      'Delete a product on the server and make the list page show the change. Write a server action deleteProduct in the file app/actions.ts that starts with the directive "use server". The action takes the id of the product of type string, sends a DELETE request to the address "https://api.example.com/products/" plus that id, throws an Error with the text "Delete failed" when the response is not ok, and otherwise calls revalidatePath from next/cache with the path "/products". Write a page app/products/page.tsx that loads the products with a function getProducts that requests the address "https://api.example.com/products" and returns the parsed body as an array of products with id, title and price, and renders a main element with an h1 containing the text "Products" and a ul with one li per product that contains a form with the method "post" and a submit button with the text "Delete " followed by the title of the product. The form of each item must call the action deleteProduct with the id of that product. Example: after deleting the product "Desk lamp" the next visit of the list page shows that the product is gone.',
      'Удали товар на сервере и сделай так, чтобы страница списка показала изменение. Напиши server action deleteProduct в файле app/actions.ts, начинающемся с директивы "use server". Действие принимает id товара типа string, отправляет DELETE-запрос на адрес "https://api.example.com/products/" плюс этот id, бросает Error с текстом "Delete failed", если ответ не ok, и иначе вызывает revalidatePath из next/cache с путём "/products". Напиши страницу app/products/page.tsx, которая загружает товары функцией getProducts, обращающейся по адресу "https://api.example.com/products" и возвращающей распарсенное тело как массив товаров с id, title и price, и рендерит main с h1, содержащим текст "Products", и ul, где на каждый товар приходится li с формой method "post" и submit-кнопкой с текстом "Delete " и title товара после него. Форма каждого элемента должна вызывать действие deleteProduct с id этого товара. Пример: после удаления товара "Desk lamp" следующий визит страницы списка показывает, что товара больше нет.'
    ),
    hint: L(
      'The pages of the App Router are cached, so after a mutation the cache has to be told that something changed. The function revalidatePath marks a path as stale and the next visit renders it again.',
      'Страницы App Router кэшируются, поэтому после мутации кэшу надо сообщить, что что-то изменилось. Функция revalidatePath помечает путь устаревшим, и следующий визит отрисует его заново.'
    ),
    solution: `// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch('https://api.example.com/products/' + id, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }

  revalidatePath('/products');
}

// app/products/page.tsx
import { deleteProduct } from '../actions';

export interface Product {
  id: string;
  title: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://api.example.com/products');
  return (await response.json()) as Product[];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}
            <form action={deleteProduct.bind(null, product.id)} method="post">
              <button type="submit">Delete {product.title}</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}`,
    explanation: L(
      'The pages of the App Router are rendered on the server and cached, which is what makes them fast, and the same mechanism means that a cached page keeps showing old data after a change on the server. revalidatePath is the explicit way to say that the cached page of that path is no longer valid, so the next request renders it again and the new data appears. The action is bound to the id of the product with bind, so the form sends only the product it belongs to, and the form posts to the action without any client code. The order matters: the revalidation must happen after the request to the server succeeded, otherwise a failed deletion would still throw away the cached page.',
      'Страницы App Router рендерятся на сервере и кэшируются, и именно это делает их быстрыми, но по той же причине кэшированная страница продолжает показывать старые данные после изменения на сервере. revalidatePath — это явный способ сказать, что кэш страницы по этому пути больше не действителен, поэтому следующий запрос отрисует её заново и новые данные появятся. Действие привязывается к id товара через bind, поэтому форма отправляет только свой товар, и она отправляется в действие вообще без клиентского кода. Порядок важен: ревалидация должна происходить после успешного ответа сервера, иначе при неудачном удалении кэш страницы всё равно будет выброшен.'
    ),
  },
  {
    id: 'topic-next-6',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'advanced',
    title: L('Streaming a page with Suspense', 'Стриминг страницы через Suspense'),
    brief: L(
      'Render a dashboard where the slow parts arrive later. The file is app/dashboard/page.tsx. Write an async component Revenue that requests the address "https://api.example.com/revenue" and renders a p with the text "Revenue: " followed by the number from the response. Write an async component Orders that requests the address "https://api.example.com/orders" and renders a ul with one li per order, where the li contains the id of the order. The page component is not async and renders a main element with an h1 containing the text "Dashboard", a Suspense boundary with the fallback "Loading revenue..." around the Revenue component, and a second Suspense boundary with the fallback "Loading orders..." around the Orders component. The headings and the fallbacks must reach the browser before the data arrives. Example: while the revenue request is in flight the page shows "Loading revenue...", and the orders section renders on its own as soon as its own request finishes, without waiting for the revenue.',
      'Отрендери дашборд, где медленные части приходят позже. Файл — app/dashboard/page.tsx. Напиши async-компонент Revenue, который обращается по адресу "https://api.example.com/revenue" и рендерит p с текстом "Revenue: " и числом из ответа. Напиши async-компонент Orders, который обращается по адресу "https://api.example.com/orders" и рендерит ul с одним li на заказ, где li содержит id заказа. Компонент страницы не async и рендерит main с h1, содержащим текст "Dashboard", границу Suspense с fallback "Loading revenue..." вокруг компонента Revenue и вторую границу Suspense с fallback "Loading orders..." вокруг компонента Orders. Заголовки и fallback-ы должны дойти до браузера раньше данных. Пример: пока идёт запрос выручки, страница показывает "Loading revenue...", а секция заказов отрисовывается сама, как только закончится её собственный запрос, не дожидаясь выручки.'
    ),
    hint: L(
      'In the App Router an async component inside a Suspense boundary does not block the whole page: the shell is sent first and the boundary streams in later. Each boundary streams independently.',
      'В App Router async-компонент внутри границы Suspense не блокирует всю страницу: сначала отправляется оболочка, а граница дописывается позже. Каждая граница стримится независимо.'
    ),
    solution: `// app/dashboard/page.tsx
import { Suspense } from 'react';

async function Revenue() {
  const response = await fetch('https://api.example.com/revenue');
  const revenue = (await response.json()) as number;

  return <p>Revenue: {revenue}</p>;
}

async function Orders() {
  const response = await fetch('https://api.example.com/orders');
  const orders = (await response.json()) as { id: string }[];

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>{order.id}</li>
      ))}
    </ul>
  );
}

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>

      <Suspense fallback={<p>Loading revenue...</p>}>
        <Revenue />
      </Suspense>

      <Suspense fallback={<p>Loading orders...</p>}>
        <Orders />
      </Suspense>
    </main>
  );
}`,
    explanation: L(
      'Without a boundary the page waits for the slowest request, and the user sees nothing until everything is ready. With a boundary around every slow part the server sends the shell of the page immediately, with the placeholders, and then pushes each finished part into the same stream of HTML. The browser starts to display the layout right away, and the fastest section appears first. Each boundary is independent, so a slow revenue request does not hold back the orders. The tradeoff is that the loading state is written twice: once as the fallback and once as the real content, and the two must look the same, otherwise the page jumps when the data replaces the placeholder.',
      'Без границы страница ждёт самый медленный запрос, и пользователь не видит ничего, пока всё не готово. С границей вокруг каждой медленной части сервер сразу отправляет оболочку страницы с заполнителями, а затем досылает каждую готовую часть в тот же поток HTML. Браузер начинает показывать раскладку сразу, а самая быстрая секция появляется первой. Каждая граница независима, поэтому медленный запрос выручки не задерживает заказы. Плата за это — состояние загрузки описывается дважды: один раз в fallback и один раз в настоящем содержимом, и оба должны выглядеть одинаково, иначе страница дёрнется, когда данные заменят заглушку.'
    ),
  },
  {
    id: 'topic-next-7',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'advanced',
    title: L('Metadata of a page', 'Метаданные страницы'),
    brief: L(
      'Give a page a title and a description. The file is app/products/[id]/page.tsx. Export a constant metadata of the type Metadata from next with the title "Store" and the description "Everything for the shop". Export an async function generateMetadata that takes the props with the field params, awaits params to get the id, requests the address "https://api.example.com/products/" plus that id, reads the product with the fields title and description of type string, and returns an object with the title built as the title of the product, the text " | ", and the text "Store", the description of the product, and the openGraph object with the title of the product and the description of the product. Export the default async page component that awaits params, loads the same product and renders an article with an h1 containing the title of the product and a p containing the price and the text " USD". Example: for the product "Desk lamp" the title of the page is "Desk lamp | Store" and the description is the description of that product.',
      'Дай странице заголовок и описание. Файл — app/products/[id]/page.tsx. Экспортируй константу metadata типа Metadata из next с заголовком "Store" и описанием "Everything for the shop". Экспортируй async-функцию generateMetadata, которая принимает пропсы с полем params, ждёт params, чтобы получить id, обращается по адресу "https://api.example.com/products/" плюс этот id, читает товар с полями title и description типа string, и возвращает объект с заголовком, собранным как title товара, текст " | " и текст "Store", описанием товара и объектом openGraph с title товара и description товара. Экспортируй async-компонент страницы по умолчанию, который ждёт params, загружает тот же товар и рендерит article с h1, содержащим title товара, и p, содержащим price и текст " USD". Пример: для товара "Desk lamp" заголовок страницы — "Desk lamp | Store", а описание — description этого товара.'
    ),
    hint: L(
      'The static export metadata and the function generateMetadata are alternatives: if the function is exported, it wins for the dynamic values. The type Metadata comes from the package next.',
      'Статический экспорт metadata и функция generateMetadata — альтернативы: если экспортирована функция, она побеждает для динамических значений. Тип Metadata берётся из пакета next.'
    ),
    solution: `// app/products/[id]/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Everything for the shop',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch('https://api.example.com/products/' + id);
  const product = (await response.json()) as { title: string; description: string };

  return {
    title: product.title + ' | Store',
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch('https://api.example.com/products/' + id);
  const product = (await response.json()) as {
    title: string;
    description: string;
    price: number;
  };

  return (
    <article>
      <h1>{product.title}</h1>
      <p>{product.price} USD</p>
    </article>
  );
}`,
    explanation: L(
      'The metadata of a page is the title in the browser tab, the description for the search engines and the data that the social networks show in the preview. Next renders it into the head of the document on the server, so the crawler of a search engine sees it without executing any JavaScript. The static export covers the pages whose data is known in advance, and generateMetadata covers the dynamic ones: the framework calls it during the render of the route and awaits the result, so the title can depend on the params. The openGraph object is what the networks read when the link is shared, and it is written separately from the description, because a link in a chat is not the same surface as a link in a search result.',
      'Метаданные страницы — это заголовок во вкладке браузера, описание для поисковиков и данные, которые показывают социальные сети в предпросмотре. Next отрисовывает их в head документа на сервере, поэтому краулер поисковика видит их без выполнения JavaScript. Статический экспорт покрывает страницы, данные которых известны заранее, а generateMetadata — динамические: фреймворк вызывает её во время рендера маршрута и ждёт результат, поэтому заголовок может зависеть от params. Объект openGraph — это то, что читают сети, когда ссылкой делятся, и он пишется отдельно от description, потому что ссылка в чате и ссылка в поисковой выдаче — разные поверхности.'
    ),
  },
  {
    id: 'topic-next-8',
    moduleId: 'nextjs',
    topic: 'next',
    level: 'advanced',
    title: L('A middleware that redirects', 'Middleware, который перенаправляет'),
    brief: L(
      'Write a middleware that protects the admin section. The file is middleware.ts at the root of the project. Export a function middleware that takes a NextRequest and returns a NextResponse. Read the pathname from the request and read the cookie with the name "role". If the pathname starts with "/admin" and the value of the cookie is not "admin", build the url with the clone method of nextUrl, set its pathname to "/login", set the search parameter "from" to the original pathname and return NextResponse.redirect with that url. In every other case return NextResponse.next. Export the constant config with the matcher that covers the admin section: the array with the string "/admin/:path*". Example: a request to "/admin/users" without the role cookie is answered with a redirect to "/login?from=%2Fadmin%2Fusers", and a request to "/admin/users" with the cookie "role=admin" is answered with the normal next response.',
      'Напиши middleware, который защищает админский раздел. Файл — middleware.ts в корне проекта. Экспортируй функцию middleware, которая принимает NextRequest и возвращает NextResponse. Прочитай pathname из запроса и прочитай cookie с именем "role". Если pathname начинается с "/admin" и значение cookie не равно "admin", построй url методом clone у nextUrl, задай ему pathname "/login", задай параметр запроса "from" исходным pathname и верни NextResponse.redirect с этим url. Во всех остальных случаях верни NextResponse.next. Экспортируй константу config с matcher, покрывающим админский раздел: массив со строкой "/admin/:path*". Пример: запрос "/admin/users" без cookie role получает ответ с перенаправлением на "/login?from=%2Fadmin%2Fusers", а запрос "/admin/users" с cookie "role=admin" получает обычный ответ next.'
    ),
    hint: L(
      'The middleware runs on the server before the request reaches the route, and the matcher limits the files it is applied to. The method clone of nextUrl gives a copy of the url that can be changed safely.',
      'Middleware выполняется на сервере до того, как запрос дойдёт до маршрута, а matcher ограничивает список файлов, к которым он применяется. Метод clone у nextUrl даёт копию url, которую можно безопасно менять.'
    ),
    solution: `// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('role')?.value;

  if (pathname.startsWith('/admin') && role !== 'admin') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};`,
    explanation: L(
      'The middleware is the outermost layer of the request, it runs before the router decides which page to render, and it is the right place for the checks that must not depend on the page at all. The matcher is what keeps it cheap: the middleware file is loaded into the edge runtime, so the list of paths it applies to has to be narrow, and a matcher with a wildcard covers the whole section and everything under it. The url is cloned rather than modified, because nextUrl of the request is shared and changing it in place would affect the rest of the pipeline. The original path is passed in the query string so that the login page can send the user back. The check here is a convenience for the interface, and the real access control must stay on the server of the data, not only in the middleware.',
      'Middleware — это внешний слой обработки запроса, он выполняется до того, как роутер решит, какую страницу отрисовывать, и это правильное место для проверок, которые вообще не зависят от страницы. Matcher делает его дешёвым: файл middleware загружается в edge runtime, поэтому список подходящих путей должен быть узким, а matcher с шаблоном покрывает весь раздел и всё, что внутри него. Url клонируется, а не меняется на месте, потому что nextUrl запроса общий и его изменение повлияло бы на остальную обработку. Исходный путь передаётся в параметре запроса, чтобы страница входа могла вернуть пользователя назад. Проверка здесь — удобство для интерфейса, а настоящий контроль доступа к данным должен остаться на сервере данных, а не только в middleware.'
    ),
  },
];
