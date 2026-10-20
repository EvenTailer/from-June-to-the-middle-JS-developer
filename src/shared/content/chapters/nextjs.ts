import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextjsChapters: Chapter[] = [
  {
    id: 'next-ch1',
    title: L('The App Router', 'App Router'),
    summary: L(
      'How the folder tree defines the URL structure, how segments compose into layouts and pages, and how the special files give every part of the tree its own loading, error and not-found behaviour.',
      'Как дерево папок задаёт структуру URL, как сегменты складываются в layouts и страницы и как служебные файлы дают каждой части дерева собственное поведение загрузки, ошибок и 404.'
    ),
    sections: [
      {
        id: 'next-ch1-s1',
        title: L('Folder conventions', 'Соглашения по папкам'),
        body: L(
          'The App Router turns the folder tree into the URL structure. A folder under `app/` is one URL segment, and a `page.tsx` file inside it makes that segment addressable: `app/blog/page.tsx` serves `/blog`, and `app/blog/[slug]/page.tsx` serves `/blog/anything`. A folder without a `page.tsx` is not a route: it holds a layout, a loading state or files that only make sense next to their neighbours. This differs from the old `pages/` router, where a file path and a route were one and the same.\n\nTwo special files carry most of the weight. `layout.tsx` is the persistent shell of a segment: it wraps that segment and everything nested inside it, renders once, and stays mounted while the user navigates, which makes it the right place for navigation, sidebars and providers. `page.tsx` is the leaf with the actual content. A layout receives a `children` prop and must render it; a page does not. The same folder can hold both, and then the layout wraps the page.\n\n`route.ts` is the third convention: it defines an HTTP endpoint instead of a page. A folder never needs both `page.tsx` and `route.ts`, because they would claim the same URL. Route handlers take a standard `Request` and return a `Response`, which suits webhooks, small API endpoints and anything that is not really a page.',
          'App Router превращает дерево папок в структуру URL. Папка внутри `app/` — это один сегмент URL, а файл `page.tsx` в ней делает сегмент доступным: `app/blog/page.tsx` отдаёт `/blog`, а `app/blog/[slug]/page.tsx` — `/blog/что-угодно`. Папка без `page.tsx` маршрутом не является: в ней лежат layout, состояние загрузки или файлы, осмысленные только рядом со своими соседями. Это отличие от старого роутера `pages/`, где путь к файлу и маршрут были одним и тем же.\n\nОсновную работу несут два служебных файла. `layout.tsx` — постоянная оболочка сегмента: она оборачивает сам сегмент и всё вложенное в него, рендерится один раз и остаётся смонтированной, пока пользователь ходит внутри, поэтому именно сюда кладут навигацию, сайдбары и провайдеры. `page.tsx` — лист с реальным содержимым. Layout получает проп `children` и обязан его отрисовать, страница — нет. В одной папке могут лежать оба файла, и тогда layout оборачивает страницу.\n\nТретье соглашение — `route.ts`: он задаёт HTTP-эндпоинт вместо страницы. В одной папке не нужны и `page.tsx`, и `route.ts`, потому что они претендуют на один и тот же URL. Обработчики маршрута принимают стандартный `Request` и возвращают `Response`, что делает их удобным местом для вебхуков, небольших API и всего, что по сути не является страницей.'
        ),
        bullets: [
          L('A folder is a URL segment; only page.tsx makes it addressable.', 'Папка — это сегмент URL, и только page.tsx делает его доступным.'),
          L('layout.tsx survives navigation, page.tsx renders the leaf.', 'layout.tsx переживает навигацию, page.tsx рендерит лист.'),
          L('route.ts replaces the page for HTTP endpoints and cannot coexist with it.', 'route.ts заменяет страницу для HTTP-эндпоинтов и не может существовать вместе с ней.'),
          L('Metadata files such as icon.tsx and sitemap.ts follow the same convention.', 'Метаданные вроде icon.tsx и sitemap.ts подчиняются тому же соглашению.'),
        ],
        code: `// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/blog/page.tsx
export default function BlogPage() {
  return <main>All blog posts</main>;
}`,
        takeaway: L(
          'Folders are segments and page.tsx makes a segment public; layout.tsx is the shell that survives navigation.',
          'Папки — это сегменты, а page.tsx делает сегмент публичным; layout.tsx — оболочка, которая переживает навигацию.'
        ),
      },
      {
        id: 'next-ch1-s2',
        title: L('Route groups, dynamic and catch-all segments', 'Группы маршрутов, динамические и catch-all сегменты'),
        body: L(
          'Not every folder should become a URL segment. A folder in parentheses is a route group: `(marketing)` and `(shop)` can hold different layouts for the same URL space without leaking the group name into the path. The rule is simple: parentheses change the organization of the tree and never the URL. Because a group has no segment of its own, two groups cannot define the same path, and Next.js rejects the conflict. Groups let one feature be split across folders.\n\nSquare brackets mark a parameter. `[slug]` captures one segment and hands it over as `params.slug`; `[id]` in `/orders/[id]` works the same way. The catch-all form `[...slug]` matches one or more segments and returns them as an array, the usual way to serve documentation trees. The optional form `[[...slug]]` also matches the bare parent URL, so `/docs` renders the same component as `/docs/a/b`, with the parameter equal to `undefined`. A plain catch-all always has an array; an optional one can be empty.\n\nIn the current App Router, params is a promise. A page receives `params` and `searchParams` as async values and must await them, a price for rendering a segment before its parameters are known. Awaiting them inside a streamed component also tells the framework that the segment depends on the URL, so results are never shared between parameter values.',
          'Не каждая папка должна становиться сегментом URL. Папка в круглых скобках — это группа маршрутов: `(marketing)` и `(shop)` могут содержать разные layout-ы для одного и того же пространства URL, а имя группы в путь не попадает. Правило простое: скобки меняют организацию дерева и никогда — URL. Поскольку у группы нет собственного сегмента, две группы не могут задать один и тот же путь, и Next.js такую коллизию отклоняет. Группы позволяют разложить одну фичу по нескольким папкам.\n\nКвадратные скобки означают параметр. `[slug]` захватывает один сегмент и отдаёт его как `params.slug`; `[id]` в `/orders/[id]` ведёт себя так же. Форма catch-all `[...slug]` ловит один или несколько сегментов и возвращает их массивом — так обычно отдают дерево документации. Необязательная форма `[[...slug]]` совпадает и с голым родительским URL, поэтому `/docs` рендерит тот же компонент, что и `/docs/a/b`, а параметр при этом равен `undefined`. В коде это важно: у обычного catch-all массив есть всегда, у необязательного он может быть пустым.\n\nВ текущем App Router params — это промис. Страница получает `params` и `searchParams` как асинхронные значения и обязана их дождаться: это плата за возможность отрисовать сегмент до того, как известны его параметры. Ожидание params внутри стримящегося компонента заодно сообщает фреймворку, что сегмент зависит от URL, поэтому результаты не переиспользуются между разными значениями параметра.'
        ),
        bullets: [
          L('Parentheses group folders without adding a URL segment.', 'Круглые скобки группируют папки, не добавляя сегмент URL.'),
          L('Square brackets capture one segment, three dots capture many.', 'Квадратные скобки захватывают один сегмент, три точки — много.'),
          L('The optional catch-all also matches the parent path.', 'Необязательный catch-all совпадает и с родительским путём.'),
          L('params and searchParams are async and must be awaited.', 'params и searchParams асинхронны, их нужно дождаться.'),
        ],
        code: `// app/(shop)/products/[...path]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const [category, id] = path;
  return <h1>{category} / {id}</h1>;
}`,
        takeaway: L(
          'Parentheses organize, brackets parameterize: the folder tree and the URL are two different things.',
          'Скобки группируют, квадратные скобки параметризуют: дерево файлов и URL — это две разные вещи.'
        ),
      },
      {
        id: 'next-ch1-s3',
        title: L('Loading, error and not-found boundaries', 'Границы загрузки, ошибок и 404'),
        body: L(
          'A route is not only a page. Next.js defines files that give a segment its own states, each one scoped to its segment and everything nested inside it. `loading.tsx` is a Suspense fallback, `error.tsx` an error boundary, `not-found.tsx` the 404 view, `template.tsx` a wrapper remounted on every navigation. The scoping matters most: an `error.tsx` next to `app/dashboard` catches failures in that segment and below, but not in a sibling one.\n\n`error.tsx` must be a client component, because it receives the `error` and `reset` props. `reset` re-renders the segment and re-runs the failed server work: the right button for a transient network error, the wrong one for a bug, which fails the same way and leaves the user in a retry loop. An error thrown while rendering a layout is not caught by that segment own error boundary, because the boundary lives inside the layout it protects.\n\n`not-found.tsx` renders for unmatched URLs and whenever a server component calls `notFound()`. `global-not-found.tsx` covers the case where even the root layout fails and is rendered outside it, so it must supply its own `<html>` and `<body>`. Call `notFound()` when a record is missing and let the segment decide how that absence looks.',
          'Маршрут — это не только страница. Next.js определяет файлы, которые дают сегменту собственные состояния, и каждый действует на свой сегмент и на всё, что вложено в него. `loading.tsx` — запасной UI для Suspense, `error.tsx` — граница ошибок, `not-found.tsx` — вид для 404, `template.tsx` — обёртка, перемонтируемая при каждой навигации. Важнее всего область действия: `error.tsx` рядом с `app/dashboard` ловит сбои в этом сегменте и ниже, но не в соседнем.\n\n`error.tsx` обязан быть клиентским компонентом, потому что он получает пропы `error` и `reset`. `reset` перерендеривает сегмент и повторяет упавшую серверную работу: правильная кнопка для случайной сетевой ошибки и неправильная для бага, который упадёт точно так же и оставит пользователя в цикле повторов. Ошибка, выброшенная при рендере layout-а, не перехватывается границей ошибок того же сегмента, потому что граница живёт внутри того layout-а, который она защищает.\n\n`not-found.tsx` рендерится для несуществующих URL и всякий раз, когда серверный компонент вызывает `notFound()`. `global-not-found.tsx` закрывает случай, когда даже корневой layout не отрисовался, и рендерится вне него, поэтому обязан содержать собственные теги `<html>` и `<body>`. Вызывайте `notFound()`, когда запись не найдена, и поручите сегменту решать, как это отсутствие должно выглядеть.'
        ),
        bullets: [
          L('loading.tsx, error.tsx and not-found.tsx apply to their segment and everything below it.', 'loading.tsx, error.tsx и not-found.tsx действуют на свой сегмент и всё, что ниже.'),
          L('error.tsx must be a client component and receives error and reset.', 'error.tsx обязан быть клиентским компонентом и получает error и reset.'),
          L('notFound() from a server component renders the closest not-found.tsx.', 'notFound() из серверного компонента рендерит ближайший not-found.tsx.'),
          L('An error thrown in a layout is not caught by that layout own error.tsx.', 'Ошибка в layout-е не перехватывается его же error.tsx.'),
        ],
        code: `// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Could not load the dashboard.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
        takeaway: L(
          'The special files are per-segment boundaries: a failure stops at the closest error.tsx above it.',
          'Служебные файлы — это границы по сегментам: сбой останавливается на ближайшем error.tsx выше по дереву.'
        ),
      },
    ],
  },
  {
    id: 'next-ch2',
    title: L('Server and client components', 'Серверные и клиентские компоненты'),
    summary: L(
      'How the React Server Component model splits rendering between the server and the browser, what the "use client" directive really changes, and how streaming delivers a page in pieces.',
      'Как модель React Server Components делит рендеринг между сервером и браузером, что на самом деле меняет директива "use client" и как стриминг доставляет страницу по частям.'
    ),
    sections: [
      {
        id: 'next-ch2-s1',
        title: L('The server component model', 'Модель серверных компонентов'),
        body: L(
          'In the App Router every component is a Server Component by default. It runs on the server, and its output never reaches the browser as JavaScript: it becomes HTML plus a serialized payload of the React tree. Two consequences follow: such a component can read the database and use Node APIs, because it never runs in a browser, and it costs nothing in the client bundle.\n\nThe catch is that a server component cannot use state, effects, event handlers or browser APIs: during server rendering there is no browser and no usual React runtime. The framework solves this with an interop layer. The client bundle holds a placeholder for the server subtree, and the server sends the real content as a payload that React merges into the tree, so the bundle of a page is not a list of all components but only the parts that must run in the browser.\n\nThe model is per file and inherited through imports. A file without a directive is a server component; a file starting with "use client" is a client component, and so is everything it imports, unless a module explicitly uses "use server". That is why the directive belongs on leaf components: it does not mean "this file is interactive" but "everything below ships to the browser".',
          'В App Router любой компонент является серверным, если не сказано иное. Серверный компонент выполняется во время сборки или во время запроса, на сервере, и его вывод не уезжает в браузер как JavaScript: он превращается в HTML плюс сериализованную полезную нагрузку React-дерева. Отсюда два следствия. Серверные компоненты могут ходить в базу, вызывать внутренние сервисы и пользоваться Node API, потому что в браузере они не выполняются. И они ничего не весят в клиентском бандле — поэтому страница, целиком собранная из серверных компонентов, отдаёт почти ноль JavaScript.\n\nОбратная сторона в том, что серверный компонент не может использовать состояние, эффекты, обработчики событий и браузерные API: во время серверного рендера нет ни браузера, ни привычного рантайма React. Фреймворк решает это прослойкой совместимости: в клиентском бандле лежит заглушка вместо серверного поддерева, а сервер присылает настоящее содержимое полезной нагрузкой, которую React вклеивает в дерево. Поэтому бандл страницы — это не список всех компонентов, а только те части, которым действительно нужно выполняться в браузере.\n\nМодель действует на уровне файла и наследуется через импорты. Файл без директивы — серверный компонент; файл, начинающийся с "use client", — клиентский, и всё, что он импортирует, тоже клиентское, если только какой-то модуль в дереве явно не использует "use server". Поэтому директиву и вешают на листья: граница означает не «этот файл интерактивный», а «всё ниже этой строки уезжает в браузер».'
        ),
        bullets: [
          L('Server components run on the server and never enter the client bundle.', 'Серверные компоненты исполняются на сервере и не попадают в клиентский бандл.'),
          L('They can use Node APIs and read data directly.', 'Они могут пользоваться Node API и читать данные напрямую.'),
          L('No state, effects or event handlers in a server component.', 'В серверном компоненте нет состояния, эффектов и обработчиков событий.'),
          L('A "use client" file turns its whole import subtree into client code.', 'Файл с "use client" делает клиентским всё поддерево своих импортов.'),
        ],
        code: `// app/products/page.tsx  (server component, no directive)
export default async function ProductsPage() {
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`,
        takeaway: L(
          'Server components are the default: they run on the server, ship no JavaScript and can touch data directly.',
          'Серверные компоненты — это умолчание: они исполняются на сервере, не отправляют JavaScript и напрямую обращаются к данным.'
        ),
      },
      {
        id: 'next-ch2-s2',
        title: L('Client boundaries and what can cross them', 'Клиентские границы и что через них проходит'),
        body: L(
          '"use client" is a boundary marker, not an optimization switch: it says that from this point down the code runs in the browser. Everything the client component imports joins the client bundle, so pulling in a large charting library adds that weight to the page even if the library is used in one branch. Push the directive as deep as possible and mark the interactive leaf, not the page that hosts it.\n\nValues that cross from a server component into a client component are serialized, and the format is restricted. Plain objects, arrays, strings, numbers, booleans, null, undefined, Date, Map, Set, TypedArray and promises are supported. Functions are not: you cannot pass an event handler as a prop, because the server has no way to ship a closure to the browser. The same applies to class instances: they are not plain data and are rejected unless supported.\n\nA client component can still receive server-rendered content, because children and other React elements are serialized as a special element type. That is the escape hatch: the server renders the expensive subtree and passes it as children to a small client wrapper that adds interactivity. The reverse direction is what "use server" enables: the client calls a server function and the framework turns the call into a request.',
          '"use client" — это маркер границы, а не переключатель оптимизации. Его работа простая: сказать, что отсюда вниз код выполняется в браузере. Всё, что импортирует клиентский компонент, попадает в клиентский бандл, поэтому компонент, втягивающий тяжёлую библиотеку графиков, утяжеляет страницу, даже если библиотека используется в одной ветке. Практическое правило: директиву опускать как можно глубже и вешать на интерактивный лист, а не на страницу, которая его содержит.\n\nЗначения, переходящие из серверного компонента в клиентский, сериализуются, и набор допустимых форм ограничен. Поддерживаются простые объекты, массивы, строки, числа, булевы значения, null, undefined, Date, Map, Set, TypedArray и промисы. Функции — нет: обработчик нельзя передать пропом, потому что у сервера нет способа отправить замыкание в браузер. То же ограничение касается экземпляров классов: они не являются простыми данными и отклоняются, если не относятся к поддерживаемым типам.\n\nКлиентский компонент всё же может получить серверный контент: children и другие React-элементы сериализуются специальным типом элемента. Это и есть выход: сервер рендерит дорогое поддерево и передаёт его как children небольшой клиентской обёртке, добавляющей интерактивность. Обратное направление обеспечивает "use server": клиент может вызвать серверную функцию, и фреймворк превращает этот вызов в запрос.'
        ),
        bullets: [
          L('"use client" ships the file and everything it imports to the browser.', '"use client" отправляет в браузер файл и всё, что он импортирует.'),
          L('Props must be serializable: no functions and no class instances.', 'Props должны быть сериализуемыми: без функций и экземпляров классов.'),
          L('React elements can cross the boundary, so the server can pass rendered subtrees.', 'React-элементы проходят через границу, поэтому сервер может передать отрендеренное поддерево.'),
          L('The server cannot pass a callback; that is what server actions are for.', 'Сервер не может передать колбэк — для этого и нужны server actions.'),
        ],
        code: `// app/cart/CartShell.tsx  (client component)
'use client';

import { useState } from 'react';

export function CartShell({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setOpen((value) => !value)}>Total: {total}</button>
      {open ? children : null}
    </section>
  );
}`,
        takeaway: L(
          'Across the client boundary only serializable data and React elements travel; callbacks must become server actions.',
          'Через клиентскую границу проходят только сериализуемые данные и React-элементы; обработчики превращаются в server actions.'
        ),
      },
      {
        id: 'next-ch2-s3',
        title: L('Streaming and Suspense', 'Стриминг и Suspense'),
        body: L(
          'A server render does not have to be one atomic response. The HTML stream can start with a shell containing everything already known, and the slow parts arrive later, each wrapped in a placeholder the browser replaces when the data lands. That is what streaming means in the App Router: a slow query in the middle of a page does not delay the header and the navigation above it.\n\nThe unit of streaming is a Suspense boundary. A boundary is created automatically by `loading.tsx` for its segment, and can be written explicitly with `<Suspense fallback={...}>`. Inside it, an async component suspends; the server sends the fallback immediately and keeps working on the rest of the page. When the promise resolves, React streams the finished subtree into the same place. The fallback is not a spinner over the whole page but a local placeholder that should occupy roughly the space the real content will take.\n\nStreaming changes where errors can be caught. An error thrown while a boundary is loading is handled by the error boundary around it, but the shell and everything already flushed have been sent, so the user sees a partial page with a localized error instead of a blank screen. The client also becomes usable earlier: navigation can start before the slowest query finishes.',
          'Серверный рендер не обязан быть одним цельным ответом. HTML-поток может начаться с оболочки, в которой есть всё уже известное, а медленные части приходят позже, каждая в своём заглушечном месте, которое браузер заменяет, когда данные приходят. Именно это и называется стримингом в App Router, и поэтому медленный запрос в базу в середине страницы не обязан задерживать шапку и навигацию над ней.\n\nЕдиница стриминга — граница Suspense. Граница создаётся автоматически файлом `loading.tsx` для его сегмента, а её можно написать и явно через `<Suspense fallback={...}>`. Внутри границы асинхронный компонент приостанавливается: сервер сразу отправляет заглушку и продолжает работать над остальной страницей. Когда промис разрешается, React доставляет готовое поддерево в то же место. Значит, заглушка — это не спиннер поверх всей страницы, а локальный плейсхолдер, который должен занимать примерно столько же места, сколько займёт настоящий контент.\n\nСтриминг меняет то, где ловятся ошибки. Ошибка, выброшенная при загрузке содержимого границы, обрабатывается error boundary вокруг этой границы, но оболочка и всё, что уже отправлено, к пользователю пришло, поэтому он видит частичную страницу с локальной ошибкой, а не пустой экран. Клиент при этом становится пригодным раньше: навигацию можно начать до того, как завершился самый медленный запрос.'
        ),
        bullets: [
          L('The response starts with a shell and the slow parts stream in later.', 'Ответ начинается с оболочки, а медленные части приходят позже.'),
          L('loading.tsx creates a Suspense boundary for its segment automatically.', 'loading.tsx автоматически создаёт границу Suspense для своего сегмента.'),
          L('The fallback should match the size of the final content to avoid layout shift.', 'Заглушка должна совпадать по размеру с финальным контентом, чтобы не было сдвига макета.'),
          L('Errors inside a streamed boundary are localized, the rest of the page survives.', 'Ошибки внутри стримящейся границы локальны, остальная страница сохраняется.'),
        ],
        code: `// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<RevenueSkeleton />}>
        <Revenue />
      </Suspense>
    </>
  );
}

async function Revenue() {
  const data = await slowQuery();
  return <Chart data={data} />;
}`,
        takeaway: L(
          'Suspense boundaries split the page into independently streamable units, so one slow query does not block the whole render.',
          'Границы Suspense делят страницу на независимо стримящиеся части, и один медленный запрос не блокирует весь рендер.'
        ),
      },
    ],
  },
  {
    id: 'next-ch3',
    title: L('Data and caching', 'Данные и кэширование'),
    summary: L(
      'How requests and rendered routes are cached, when a route turns dynamic, and how to invalidate stale data on demand or on a schedule.',
      'Как кэшируются запросы и отрендеренные маршруты, когда маршрут становится динамическим и как сбрасывать устаревшие данные по требованию или по расписанию.'
    ),
    sections: [
      {
        id: 'next-ch3-s1',
        title: L('The caches and how fetch behaves', 'Кэши и поведение fetch'),
        body: L(
          'Next.js keeps three caches. The Data Cache stores the result of `fetch` on the server, keyed by URL, method, body and part of the headers. The Full Route Cache stores the rendered HTML and the RSC payload of a whole route. The Router Cache lives in the browser and keeps recently visited segments, so client navigation can paint instantly. One request may touch all three, and clearing one does not clear the others.\n\nIn the App Router a GET `fetch` with no dynamic options is cached by default; `cache: "no-store"` opts out. The `next` option configures the rest: `next: { revalidate: 60 }` sets a lifetime, `next: { tags: ["posts"] }` attaches tags for targeted invalidation, and `next: { revalidate: 0 }` disables the cache for that call. The same options exist at route level through the `revalidate` segment config.\n\nCaching is not the same as the rendering mode. A route can be static and still read from the Data Cache: it is rendered once at build time and served from the Full Route Cache until invalidated. A route becomes dynamic when it depends on request-time information, such as reading cookies or headers, or using a search parameter. The current versions prefer static rendering whenever possible, and one accidental read of `cookies()` turns the whole segment dynamic.',
          'В Next.js три кэша, и полезно понимать, какой отвечает на конкретный вопрос. Data Cache хранит на сервере результат `fetch` по ключу из URL, метода, тела и участвующих в ключе заголовков. Full Route Cache хранит отрендеренный HTML и RSC-полезную нагрузку целого маршрута. Router Cache живёт в браузере и держит недавно посещённые сегменты, чтобы клиентская навигация рисовалась мгновенно. Один запрос может задеть все три кэша, и очистка одного не чистит остальные.\n\nВ App Router запрос `fetch` методом GET без динамических опций кэшируется по умолчанию, а `cache: "no-store"` отключает кэширование. Опция `next` настраивает остальное: `next: { revalidate: 60 }` задаёт время жизни, `next: { tags: ["posts"] }` вешает теги для точечной инвалидации, а `next: { revalidate: 0 }` выключает Data Cache для этого вызова. Те же опции есть на уровне маршрута: конфиг сегмента `revalidate` задаёт значение по умолчанию для всех запросов внутри.\n\nКэширование — не то же самое, что режим рендеринга. Маршрут может быть статичным и при этом читать из Data Cache: он рендерится один раз при сборке и раздаётся из Full Route Cache, пока что-то его не инвалидирует. Динамическим маршрут становится, когда зависит от информации времени запроса: читает cookies или headers либо использует search-параметр. Текущие версии предпочитают статичный рендер везде, где он возможен, и это поведение стоит проверять, а не предполагать: одна случайная попытка прочитать `cookies()` делает динамическим весь сегмент.'
        ),
        bullets: [
          L('Data Cache holds fetch results, Full Route Cache holds rendered routes, Router Cache lives in the browser.', 'Data Cache хранит результаты fetch, Full Route Cache — отрендеренные маршруты, Router Cache живёт в браузере.'),
          L('A GET fetch is cached by default in the App Router.', 'GET-запрос fetch в App Router кэшируется по умолчанию.'),
          L('next.revalidate sets a lifetime and next.tags enables targeted invalidation.', 'next.revalidate задаёт время жизни, а next.tags — точечную инвалидацию.'),
          L('Reading cookies or headers makes the whole segment dynamic.', 'Чтение cookies или headers делает динамическим весь сегмент.'),
        ],
        code: `// app/posts/[slug]/page.tsx
const res = await fetch('https://api.example.com/posts/' + slug, {
  next: { revalidate: 60, tags: ['post:' + slug] },
});

const stats = await fetch('https://api.example.com/stats', {
  cache: 'no-store',
});`,
        takeaway: L(
          'A cached fetch plus a static route is fast; one uncached request or one read of cookies is enough to make a segment dynamic.',
          'Кэшированный fetch и статичный маршрут — быстро; достаточно одного запроса без кэша или чтения cookies, чтобы сегмент стал динамическим.'
        ),
      },
      {
        id: 'next-ch3-s2',
        title: L('Dynamic rendering and on-demand invalidation', 'Динамический рендеринг и инвалидация по требованию'),
        body: L(
          'Dynamic rendering means the route is produced per request. You opt into it with `export const dynamic = "force-dynamic"`, trigger it implicitly by reading `cookies()` or `headers()`, or use `connection()` to wait for the request stream. In the current releases `cookies()` and `headers()` are async, so they must be awaited, and both mark the route dynamic. A `searchParams` prop does the same, because one URL with different query strings is a different response and a different cache entry.\n\nTime-based revalidation is the other half of the static story. The segment config `export const revalidate = 60` means the cached version is served for up to 60 seconds and then regenerated in the background while users keep receiving the stale copy. This stale-while-revalidate behaviour is what makes a CDN-friendly page work with fresh data. When data is edited inside your application, waiting a minute is unacceptable — here comes on-demand invalidation.\n\n`revalidatePath("/blog")` marks a path for regeneration, and `revalidateTag("posts")` marks every request that carries that tag. Both are called right after a mutation, usually in a server action, and both affect the server-side caches; the Router Cache in the browser refreshes separately, on navigation or focus. The most common mistake is to revalidate and still see old data: the tag was never attached to the request that produced it.',
          'Динамический рендер означает, что маршрут производится на каждый запрос. Включают его через `export const dynamic = "force-dynamic"`, получают неявно при чтении `cookies()` или `headers()`, либо через хелпер `connection()`, который дожидается потока запроса. API отличается от версии к версии: в текущих релизах `cookies()` и `headers()` асинхронны, их нужно дождаться, и оба помечают маршрут динамическим. Проп `searchParams` делает то же самое для любой страницы, которая его получает, потому что один и тот же URL с разными query-строками — это разные ответы и разные записи кэша.\n\nРевалидация по времени — вторая половина статичной истории. Конфиг сегмента `export const revalidate = 60` означает, что кэшированная версия раздаётся до 60 секунд, а потом пересобирается в фоне, пока пользователи продолжают получать устаревшую копию. Именно поведение stale-while-revalidate позволяет статичной странице, дружащей с CDN, показывать свежие данные. А когда данные меняются внутри приложения, ждать до минуты обычно неприемлемо — и тут появляется инвалидация по требованию.\n\n`revalidatePath("/blog")` помечает путь на пересборку, а `revalidateTag("posts")` — все запросы с этим тегом. И то и другое вызывают сразу после мутации, обычно внутри server action, и оба влияют на серверные кэши; Router Cache в браузере обновляется отдельно, при навигации или когда вкладка снова получает фокус. Самая частая ошибка — вызвать ревалидацию и всё равно увидеть старые данные: обычно это значит, что тег так и не повесили на тот запрос, который их вернул.'
        ),
        bullets: [
          L('cookies(), headers() and connection() make a route dynamic and must be awaited.', 'cookies(), headers() и connection() делают маршрут динамическим, их нужно дождаться.'),
          L('export const revalidate = 60 regenerates the route in the background.', 'export const revalidate = 60 пересобирает маршрут в фоне.'),
          L('revalidatePath invalidates a path, revalidateTag invalidates tagged requests.', 'revalidatePath сбрасывает путь, revalidateTag — запросы с тегом.'),
          L('Invalidate after the write, never before it.', 'Сбрасывай кэш после записи, а не до неё.'),
        ],
        code: `// app/actions.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function publishPost(id: string) {
  await db.post.update({ where: { id }, data: { status: 'published' } });

  revalidateTag('posts');
  revalidatePath('/posts/' + id);
}`,
        takeaway: L(
          'Static by default, dynamic when the request demands it, and invalidate explicitly right after a write.',
          'По умолчанию статично, динамично там, где этого требует запрос, а после записи кэш сбрасывается явно.'
        ),
      },
      {
        id: 'next-ch3-s3',
        title: L('Static params, ISR and cache components', 'Статические параметры, ISR и cache components'),
        body: L(
          'A dynamic segment cannot be pre-rendered unless you name the values to render. `generateStaticParams` returns the parameter sets to build at deploy time, and each becomes a static page in the Full Route Cache. The `dynamicParams` option decides what happens to values outside that list: by default they are generated on the first request and then cached, giving static speed for the known set and correctness for the rest.\n\nIncremental Static Regeneration combines these two ideas. A page is generated once, then regenerated in the background after an interval, while users keep seeing the previous version. The interval can come from the segment config `revalidate` or from a tag-based policy. ISR gives you a page served from a cache that still eventually reflects new data, with no server work on every request.\n\nThe newer cache components model changes the vocabulary. A function or component marked with `use cache` caches its own result instead of relying on the whole route to be static; `cacheLife` sets a lifetime and `cacheTag` attaches tags. A page can then be static in some parts and dynamic in others, and the route-wide `revalidate` export is replaced by per-unit policies. The practical shift is the same: caching becomes something you declare at the level of the data or the component, not a property of the route.',
          'Динамический сегмент нельзя пререндерить, пока вы не скажете фреймворку, какие значения рендерить. `generateStaticParams` возвращает список наборов параметров для сборки при деплое, и каждый из них становится статичной страницей в Full Route Cache. Опция `dynamicParams` решает судьбу значений, которых в списке не было: по умолчанию они генерируются при первом запросе и затем кэшируются, что даёт статичную скорость для известного набора и корректность для всего остального.\n\nIncremental Static Regeneration соединяет эти две идеи. Страница генерируется один раз, а потом пересобирается в фоне через заданный интервал, и пользователи видят предыдущую версию, пока готовится новая. Интервал может приходить из конфига сегмента `revalidate` или из политики по тегам. Что даёт ISR: страница раздаётся из кэша, но в итоге всё же показывает новые данные, и серверному процессу не нужно делать работу на каждый запрос.\n\nНовее модель cache components меняет словарь. Функция или компонент с директивой `use cache` кэширует собственный результат, а не полагается на статичность всего маршрута; время жизни задаётся через `cacheLife`, теги — через `cacheTag`. Страница может быть статичной в одних частях и динамичной в других одновременно, а маршрутный экспорт `revalidate` заменяется политиками на уровне отдельных частей. Практический сдвиг одинаков: кэширование становится тем, что объявляется на уровне данных или компонента, а не свойством всего маршрута.'
        ),
        bullets: [
          L('generateStaticParams pre-renders a known set of parameter values.', 'generateStaticParams пререндерит известный набор значений параметров.'),
          L('dynamicParams decides what happens to values outside that set.', 'dynamicParams решает судьбу значений вне этого набора.'),
          L('ISR serves the stale copy while the new version is generated.', 'ISR раздаёт устаревшую копию, пока готовится новая.'),
          L('use cache with cacheLife and cacheTag caches per unit, not per route.', 'use cache вместе с cacheLife и cacheTag кэширует по частям, а не по маршруту.'),
        ],
        code: `// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const ids = await db.product.findMany({ select: { id: true } });
  return ids.map(({ id }) => ({ id }));
}

export const dynamicParams = true;

// app/lib/products.ts
'use cache';

export async function getProduct(id: string) {
  return db.product.findUnique({ where: { id } });
}`,
        takeaway: L(
          'Pre-render what you know, regenerate on a schedule, and cache individual units when a route is only partly static.',
          'Пререндери то, что известно, регенерируй по расписанию, а кэшируй отдельные части, когда маршрут статичен лишь частично.'
        ),
      },
    ],
  },
  {
    id: 'next-ch4',
    title: L('Mutations, middleware and deployment', 'Мутации, middleware и деплой'),
    summary: L(
      'How server actions change data safely, how middleware intercepts requests before routing, and how metadata, images, environment variables and the build output shape a deployment.',
      'Как server actions безопасно меняют данные, как middleware перехватывает запросы до маршрутизации и как метаданные, изображения, переменные окружения и сборка влияют на деплой.'
    ),
    sections: [
      {
        id: 'next-ch4-s1',
        title: L('Server actions and validation', 'Server actions и валидация'),
        body: L(
          'A server action is an async function marked with "use server" that the client can call as if it were local code; the framework turns the call into a request. The body runs on the server, so it can use the database, secrets and Node APIs. Next.js checks its identity and rejects calls from a page that never imported it, so an action is a server endpoint with a generated identifier, not a guessable URL.\n\nThe action receives untrusted input: a user can post any field with any value. Validate at the boundary, before touching the database, and treat a failure as a normal return value rather than an exception. The authorization check belongs in the same place: a payload that passes validation says nothing about whether the current user may perform the operation. After a write, refresh what the user is about to see with `revalidatePath` or `revalidateTag`.\n\n`useActionState` connects a form to the result of an action: the action returns a state object, the hook exposes it, and the component renders the error from it. `useFormStatus` reports the pending state of the closest form and disables the submit button, so the user does not submit twice. Both are client hooks, so the form is a client component, while the action it calls stays on the server.',
          'Server action — это асинхронная функция с директивой "use server", которую клиент может вызвать как будто она локальная, а фреймворк превращает этот вызов в запрос к серверу. Тело функции выполняется на сервере, поэтому в нём доступны база, секреты и Node API, а идентичность действия проверяет сам Next.js: вызов со страницы, которая его не импортировала, отклоняется. Вот и модель безопасности: действие — это серверная точка входа с сгенерированным идентификатором, а не URL, который можно угадать.\n\nДействие получает недоверенный ввод, а FormData недоверен по определению: пользователь может прислать любое поле, в любом порядке, с любым значением. Проверяйте на границе, до обращения к базе, и относитесь к ошибке как к обычному возвращаемому значению, а не как к исключению. Проверка прав должна лежать рядом, потому что прошедший валидацию payload ничего не говорит о том, может ли текущий пользователь выполнить операцию. После успешной записи обновите то, что пользователь сейчас увидит, через `revalidatePath` или `revalidateTag`.\n\n`useActionState` связывает форму с результатом действия: действие возвращает объект состояния, хук его отдаёт, а компонент по нему рисует сообщение об ошибке. `useFormStatus` сообщает о состоянии ожидания ближайшей формы и используется, чтобы заблокировать кнопку отправки и не дать отправить форму дважды. Оба хука — клиентские, поэтому форма с ними является клиентским компонентом, а само действие остаётся на сервере.'
        ),
        bullets: [
          L('An action is a server endpoint with a generated id; only imported actions can be called.', 'Действие — серверная точка входа с сгенерированным id; вызвать можно только импортированное.'),
          L('Validate the payload and check the actor before any write.', 'Проверяйте payload и права пользователя до любой записи.'),
          L('Return errors as state instead of throwing them into the error boundary.', 'Возвращайте ошибки состоянием, а не выбрасывайте их в error boundary.'),
          L('useActionState exposes the result, useFormStatus reports the pending state.', 'useActionState отдаёт результат, useFormStatus сообщает о состоянии ожидания.'),
        ],
        code: `// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({ title: z.string().min(3).max(120) });

export async function createPost(
  prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const session = await requireUser();
  const parsed = schema.safeParse({ title: formData.get('title') });

  if (!parsed.success) {
    return { error: 'Title must be 3 to 120 characters' };
  }

  await db.post.create({ data: { ...parsed.data, authorId: session.id } });
  revalidatePath('/posts');

  return {};
}`,
        takeaway: L(
          'A server action is an untrusted entry point: validate the payload, check the actor, write, then revalidate.',
          'Server action — недоверенная точка входа: проверь ввод, проверь права, запиши, потом сбрось кэш.'
        ),
      },
      {
        id: 'next-ch4-s2',
        title: L('Middleware', 'Middleware'),
        body: L(
          'Middleware is a function that runs before a request is routed, defined in `middleware.ts` at the root of the project. It receives a `NextRequest` and returns a response, a redirect, a rewrite, or `NextResponse.next()` to let the request continue. That position makes it useful for work many routes need at once: reading a cookie to decide whether to send the user to a login page, or rewriting an old URL.\n\nThe `matcher` config decides which requests the middleware sees. Without a matcher it runs for every request, including static files, which is wasteful and can break caching. A typical matcher lists the paths worth intercepting, and can assert on the method or on specific headers. The matcher is also where you exclude a path such as a webhook that must never redirect.\n\nThe limits of middleware follow from where it runs. It executes in the Edge runtime by default: a restricted set of Node APIs and no long database work. It runs on every matching request, so on the hot path it must stay cheap. And it is not the place for authorization decisions: a request can reach an action through paths the middleware does not match. Real access checks belong in the server action or the data access layer, where both actor and resource are known.',
          'Middleware — это функция, которая выполняется до маршрутизации запроса; живёт она в файле `middleware.ts` в корне проекта. Она получает `NextRequest` и возвращает ответ, редирект, rewrite или `NextResponse.next()`, чтобы запрос продолжился дальше. Именно это место в конвейере делает middleware полезной для работы, нужной сразу многим маршрутам: прочитать cookie, чтобы решить, отправлять ли пользователя на страницу входа, добавить заголовок, переписать старый URL на новый или провести эксперимент на части трафика.\n\nКонфиг `matcher` решает, какие запросы middleware увидит. Без matcher-а она выполняется для каждого запроса, включая статические файлы, — это и расточительно, и может мешать кэшированию. Типичный matcher перечисляет пути, которые стоит перехватывать, а объект конфига может дополнительно проверять метод запроса или наличие конкретных заголовков, чтобы middleware не вызывалась для ассетов. Там же обычно исключают путь вроде вебхука, который не должен редиректиться.\n\nПределы middleware следуют из того, где она выполняется. По умолчанию это Edge runtime, то есть ограниченный набор Node API и никакой долгой работы с базой. Она выполняется на каждый подходящий запрос, поэтому на горячем пути ей место лишь пока она остаётся дешёвой. И это не место для решений о доступе: middleware — периметр, а запрос может попасть в action или в route handler по пути, который matcher не покрывает. Настоящие проверки прав живут в server action или в слое доступа к данным, где известны и актор, и ресурс.'
        ),
        bullets: [
          L('middleware.ts runs before routing and can redirect, rewrite, add headers or continue.', 'middleware.ts выполняется до маршрутизации и может редиректить, переписывать, добавлять заголовки или пропускать запрос дальше.'),
          L('Use the matcher to limit it to relevant paths and methods.', 'Через matcher ограничьте её нужными путями и методами.'),
          L('It runs in the Edge runtime on every matching request, so keep it cheap.', 'Она работает в Edge runtime на каждый подходящий запрос, поэтому держите её дешёвой.'),
          L('Do not use it for authorization: check permissions where the resource is loaded.', 'Не используйте её для авторизации: проверяйте права там, где грузятся данные.'),
        ],
        code: `// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-request-id', crypto.randomUUID());
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`,
        takeaway: L(
          'Middleware is the cheap perimeter in front of routing; real permission checks live next to the data.',
          'Middleware — дешёвый периметр перед маршрутизацией; настоящие проверки прав живут рядом с данными.'
        ),
      },
      {
        id: 'next-ch4-s3',
        title: L('Metadata, images, environment and deployment', 'Метаданные, изображения, окружение и деплой'),
        body: L(
          'Metadata is declared, not written by hand. A static `metadata` object or a `generateMetadata` function supplies the title, description, canonical URL and Open Graph tags, and the framework merges that with the parent metadata. A dynamic page awaits the data it renders and takes the title and description from it, so a blog post has its own title in search results and link previews without an extra request. `generateViewport` is a separate export for the theme colour and viewport settings.\n\n`next/image` renders an `img` tag with the attributes the browser needs to avoid layout shift: width and height reserve the space, and the loader produces a resized modern format. It allows a remote host only if listed in `images.remotePatterns`, a deliberate whitelist rather than a free-for-all. A plain `img` gives up resizing and lazy loading.\n\nConfiguration comes from the environment. Variables without the `NEXT_PUBLIC_` prefix stay on the server, and prefixed ones are inlined into the client bundle at build time, so they are public and cannot change without a rebuild: secrets never belong there. The build produces a server bundle, and `output: "standalone"` emits a minimal server with its own dependencies, which is what a container deployment wants. The runtime choice follows the same logic: Node for the full API, Edge for a small dependency-free function.',
          'Метаданные объявляются, а не пишутся в head руками. Статический объект `metadata` или функция `generateMetadata` на странице задают title, description, canonical URL и теги Open Graph, а фреймворк сливает результат с метаданными родительских сегментов. Динамическая страница дожидается тех же данных, которые рендерит, и берёт title и description оттуда, так что у поста в блоге свой заголовок и в поисковой выдаче, и в превью ссылки — без единого дополнительного запроса. `generateViewport` — отдельный экспорт для цвета темы и параметров viewport.\n\n`next/image` рендерит тег `img` с теми атрибутами, которые нужны браузеру, чтобы не было сдвига макета: width и height резервируют место, а loader отдаёт уменьшенное изображение в современном формате. Компонент допускает удалённый хост только если тот перечислен в `images.remotePatterns` в конфигурации, и это осознанный белый список, а не всё подряд. Обычный `img` не запрещён, но вы теряете ресайз, ленивую загрузку и встроенный плейсхолдер.\n\nКонфигурация приходит из окружения. Переменные без префикса `NEXT_PUBLIC_` остаются на сервере, а с префиксом инлайнятся в клиентский бандл во время сборки — значит, они публичны и не меняются без пересборки, поэтому секретам там не место. Сборка формирует серверный бандл, а `output: "standalone"` выдаёт минимальный сервер со своим деревом зависимостей, и это ровно то, что нужно контейнерному деплою. Выбор рантайма следует той же логике: Node runtime для полного API, Edge runtime для маленькой функции без зависимостей.'
        ),
        bullets: [
          L('metadata and generateMetadata describe a page for crawlers and link previews.', 'metadata и generateMetadata описывают страницу для краулеров и превью ссылок.'),
          L('next/image reserves space and resizes; remote hosts need images.remotePatterns.', 'next/image резервирует место и ресайзит; удалённые хосты требуют images.remotePatterns.'),
          L('NEXT_PUBLIC_ variables are inlined into the client bundle at build time.', 'Переменные NEXT_PUBLIC_ инлайнятся в клиентский бандл во время сборки.'),
          L('output: "standalone" produces a minimal server image for containers.', 'output: "standalone" даёт минимальный серверный образ для контейнеров.'),
        ],
        code: `// app/posts/[slug]/page.tsx
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.cover] },
  };
}

export default function Post({ cover }: { cover: string }) {
  return <Image src={cover} alt="Cover" width={1200} height={630} />;
}`,
        takeaway: L(
          'Metadata is data the framework renders, images are optimized by the framework, and secrets stay out of NEXT_PUBLIC_.',
          'Метаданные — данные, которые рендерит фреймворк, картинки оптимизирует фреймворк, а секреты не попадают в NEXT_PUBLIC_.'
        ),
      },
    ],
  },
];
