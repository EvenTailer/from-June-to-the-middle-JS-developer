import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh06: Chapter = {
  id: 'next-ch6',
  title: L('Rendering strategies', 'Стратегии рендеринга'),
  summary: L(
    'The ways a Next.js route can be produced at build time or at request time, what each one costs, and how to pick a strategy per route instead of one global setting.',
    'Способы произвести маршрут Next.js во время сборки или во время запроса, чего стоит каждый из них и как выбирать стратегию по маршрутам, а не одним общим правилом.'
  ),
  sections: [
    {
      id: 'next-ch6-s1',
      title: L('Static generation', 'Статическая генерация'),
      body: L(
        'Static generation means the route is produced once, at build time, and stored as HTML plus a serialized React payload. The build walks the tree under `app/` and prerenders every route that does not depend on request-time data. Serving such a route costs a file read and a CDN lookup, and the server never runs the component code again. A static route is not a cached route with a short lifetime: the HTML is finished at build time, which is why it can be served from a CDN.\n\nA route qualifies for static generation when nothing in it depends on the request. Reading `cookies()` or `headers()`, awaiting `searchParams`, calling `connection()` or using an uncached `fetch` all make it dynamic. A dynamic segment additionally needs `generateStaticParams` to say which parameter values exist, and each of them becomes its own static page. The build output is the report on what happened: a hollow circle marks a fully static route, a filled circle marks a route generated from parameters, and a letter marks a dynamic one.\n\nThe one cost is build time. A site with ten thousand static pages builds ten thousand pages, and that build has to fit inside the deployment window. When the set of pages is large or unknown, generation moves to the first request instead, which is what the next sections describe.',
        'Статическая генерация означает, что маршрут производится один раз, во время сборки, и сохраняется как HTML плюс сериализованная полезная нагрузка React. Сборка обходит дерево внутри `app/` и пререндерит каждый маршрут, не зависящий от данных времени запроса. Отдача такого маршрута стоит чтения файла и обращения к CDN, и сервер больше никогда не выполняет код компонента. Статичный маршрут — это не закэшированный маршрут с коротким временем жизни: HTML готов уже на этапе сборки, и именно поэтому его может отдать CDN.\n\nМаршрут подходит для статической генерации, когда ничто в нём не зависит от запроса. Чтение `cookies()` или `headers()`, ожидание `searchParams`, вызов `connection()` и `fetch` без кэша делают его динамическим. Динамическому сегменту дополнительно нужна `generateStaticParams`, чтобы назвать существующие значения параметров, и каждое из них становится отдельной статичной страницей. Вывод сборки и есть отчёт о произшедшем: полый кружок помечает полностью статичный маршрут, закрашенный — маршрут, собранный из параметров, а буква — динамический.\n\nУ этого есть своя цена — время сборки. Сайт с десятью тысячами статичных страниц собирает десять тысяч страниц, и эта сборка должна уложиться в окно развёртывания. Когда множество страниц велико или неизвестно, генерация переносится на первый запрос, о чём и пойдёт речь дальше.'
      ),
      bullets: [
        L('A static route is rendered during the build and served from the output, not rendered per request.', 'Статичный маршрут рендерится во время сборки и отдаётся из вывода, а не рендерится на каждый запрос.'),
        L('Static generation requires that nothing request-specific is read: no cookies, headers, searchParams or connection().', 'Статичная генерация требует, чтобы ничего зависящего от запроса не читалось: ни cookies, ни headers, ни searchParams, ни connection().'),
        L('generateStaticParams names the parameter values that become separate static pages.', 'generateStaticParams называет значения параметров, которые станут отдельными статичными страницами.'),
        L('The build output marks every route as static, generated from parameters, or dynamic.', 'Вывод сборки помечает каждый маршрут как статичный, собранный из параметров или динамический.'),
      ],
      code: `// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) notFound();

  return <article>{product.title}</article>;
}`,
      table: {
        caption: L('What the build output tells you', 'Что сообщает вывод сборки'),
        headers: [
          L('Marker', 'Метка'),
          L('Route', 'Маршрут'),
          L('When it runs', 'Когда выполняется'),
        ],
        rows: [
          [L('Static', 'Статичный'), L('A page with no parameter', 'Страница без параметров'), L('Once, at build time', 'Один раз, во время сборки')],
          [L('Generated', 'Собранный из параметров'), L('A dynamic segment with generateStaticParams', 'Динамический сегмент с generateStaticParams'), L('Once per parameter set', 'Один раз на набор параметров')],
          [L('Dynamic', 'Динамический'), L('A page that reads the request', 'Страница, читающая запрос'), L('On every request', 'На каждый запрос')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Static means finished, not merely cached', 'Статичный значит готовый, а не просто закэшированный'),
          text: L(
            'The HTML of a static route is produced during the build, so it cannot vary per visitor. When a page has to show something that depends on the request, it is a different route, not a static route with a fresh cache entry.',
            'HTML статичного маршрута производится во время сборки, поэтому он не может отличаться от посетителя к посетителю. Если страница должна показать что-то зависящее от запроса, это другой маршрут, а не статичный маршрут со свежей записью кэша.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('One cookies() call makes the whole segment dynamic', 'Один вызов cookies() делает динамическим весь сегмент'),
          text: L(
            'Request-time APIs are detected anywhere in the tree of a segment, including in a component several levels below the page. The segment stops being static and the build output says so, but only if you read it after every change.',
            'API времени запроса обнаруживаются в любом месте дерева сегмента, в том числе в компоненте на несколько уровней ниже страницы. Сегмент перестаёт быть статичным, и вывод сборки скажет об этом, но только если читать его после каждого изменения.'
          ),
        },
      ],
      takeaway: L(
        'A route is static when its output does not depend on the request, and keeping it that way is the cheapest performance work available.',
        'Маршрут статичен, когда его вывод не зависит от запроса, и сохранение этого свойства — самая дешёвая работа над производительностью.'
      ),
      seeAlso: [
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
        L('Section 6-3: incremental static regeneration', 'Секция 6-3: инкрементальная статическая регенерация'),
        L('Chapter 3: data fetching and caching', 'Глава 3: получение данных и кэширование'),
      ],
    },
    {
      id: 'next-ch6-s2',
      title: L('Dynamic rendering', 'Динамический рендеринг'),
      body: L(
        'Dynamic rendering is the opposite decision: the route is produced per request. The component tree runs on the server for every visitor, the HTML is generated on the fly, and nothing is stored in the Full Route Cache. The cost is not the framework but the data access behind it. A dynamic route that issues five queries pays for them on every request, and only the browser cache and the CDN stand in front of it, and only if the response headers allow them to store the answer.\n\nYou get dynamic rendering in three ways. The explicit one is the segment config `export const dynamic = \'force-dynamic\'`. The implicit one is reading request-time data: `await cookies()`, `await headers()`, awaiting `searchParams` in a page, or calling `await connection()`. The third is the absence of caching in the data layer, an uncached `fetch` or a direct database call, which cannot be prerendered because the answer may be different on the next request.\n\nDynamic rendering is the honest choice for a page that shows the current state of something: an inbox, an order confirmation, a dashboard. The mistake is not choosing it, it is choosing it by accident. A layout that reads the session cookie makes every page under it dynamic, including the marketing pages that never needed to know who is asking, and one forgotten `await cookies()` in a shared component can quietly turn a fast site into a slow one.',
        'Динамический рендеринг — противоположное решение: маршрут производится на каждый запрос. Дерево компонентов выполняется на сервере для каждого посетителя, HTML генерируется на лету, и в Full Route Cache ничего не попадает. Стоимость здесь не в самом фреймворке, а в доступе к данным за ним. Динамический маршрут, делающий пять запросов, платит за пять запросов на каждый запрос пользователя, а перед ним стоят только кэш браузера и CDN, и то лишь если заголовки ответа разрешают им сохранить результат.\n\nДинамический рендеринг включается тремя способами. Явный — конфиг сегмента `export const dynamic = \'force-dynamic\'`. Неявный — чтение данных времени запроса: `await cookies()`, `await headers()`, ожидание `searchParams` на странице или вызов `await connection()`. Третий — отсутствие кэша в слое данных: `fetch` без кэша или прямой запрос в базу, который нельзя пререндерить, потому что ответ при следующем запросе может быть другим.\n\nДинамический рендеринг — честный выбор для страницы, показывающей текущее состояние чего-то: почтовый ящик, подтверждение заказа, дашборд. Ошибка не в самом выборе, а в том, что он сделан случайно. Компоновка, читающая cookie сессии, делает динамическими все страницы под ней, включая маркетинговые, которым никогда не нужно было знать, кто спрашивает, и одна забытая `await cookies()` в общем компоненте тихо превращает быстрый сайт в медленный.'
      ),
      bullets: [
        L('force-dynamic opts in explicitly, and the request-time APIs opt in implicitly.', 'force-dynamic включает динамику явно, а API времени запроса — неявно.'),
        L('A dynamic route runs the component tree on every request and stores nothing in the Full Route Cache.', 'Динамический маршрут выполняет дерево компонентов на каждый запрос и ничего не сохраняет в Full Route Cache.'),
        L('An uncached fetch or a direct database call also prevents prerendering.', 'Запрос без кэша или прямой запрос в базу тоже мешают пререндеру.'),
        L('One request-time read in a shared layout makes every route below it dynamic.', 'Одно чтение времени запроса в общей компоновке делает динамическими все маршруты под ней.'),
      ],
      code: `// app/dashboard/page.tsx
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await cookies();
  const token = session.get('session')?.value;

  const stats = await getStats(token); // runs on every request

  return <section>Balance: {stats.balance}</section>;
}

// app/marketing/page.tsx
// A parent layout that awaits cookies() makes this page dynamic too.
export default function MarketingPage() {
  return <main>Welcome</main>;
}`,
      table: {
        caption: L('How a route becomes dynamic', 'Как маршрут становится динамическим'),
        headers: [
          L('Trigger', 'Триггер'),
          L('Where it lives', 'Где живёт'),
          L('Effect', 'Эффект'),
        ],
        rows: [
          [L('force-dynamic', 'force-dynamic'), L('Segment config', 'Конфиг сегмента'), L('Rendered per request', 'Рендерится на каждый запрос')],
          [L('cookies() and headers()', 'cookies() и headers()'), L('Any server component', 'Любой серверный компонент'), L('Rendered per request', 'Рендерится на каждый запрос')],
          [L('searchParams', 'searchParams'), L('Page props', 'Пропсы страницы'), L('Rendered per request', 'Рендерится на каждый запрос')],
          [L('Uncached data access', 'Данные без кэша'), L('Data layer', 'Слой данных'), L('No prerender possible', 'Пререндер невозможен')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The session check belongs below the dynamic part', 'Проверка сессии должна быть ниже динамичной части'),
          text: L(
            'A layout that awaits cookies() turns every page of the application into a dynamic one, because the layout wraps all of them. Read the session in the smallest segment that needs it, and leave the shared shell static.',
            'Компоновка, в которой ожидается cookies(), делает динамическими все страницы приложения, потому что она оборачивает их все. Читайте сессию в самом маленьком сегменте, которому это нужно, и оставляйте общую оболочку статичной.'
          ),
        },
        {
          tone: 'tip',
          title: L('Cache the data, not the page', 'Кэшируйте данные, а не страницу'),
          text: L(
            'A dynamic page that fetches a catalogue which changes once a day can still be fast if the fetch is cached and the request-time parts are small. The route stays dynamic, the work is not repeated.',
            'Динамическая страница, которая берёт каталог, меняющийся раз в день, всё равно будет быстрой, если запрос кэширован, а зависящие от запроса части невелики. Маршрут остаётся динамическим, а работа не повторяется.'
          ),
        },
      ],
      takeaway: L(
        'Dynamic rendering is paid per request, so opt into it deliberately and cache the data inside it rather than the page.',
        'Динамический рендеринг оплачивается на каждый запрос, поэтому включайте его осознанно и кэшируйте внутри него данные, а не страницу.'
      ),
      seeAlso: [
        L('Section 6-1: static generation', 'Секция 6-1: статическая генерация'),
        L('Section 3-2: the full route cache', 'Секция 3-2: Full Route Cache'),
        L('Section 4-4: revalidation after a mutation', 'Секция 4-4: ревалидация после мутации'),
      ],
    },
    {
      id: 'next-ch6-s3',
      title: L('Incremental static regeneration', 'Инкрементальная статическая регенерация'),
      body: L(
        'Incremental static regeneration is a compromise that became the default answer for content sites. The page is generated once and then regenerated in the background after an interval, while visitors keep receiving the previous version. The first request after the interval is served the stale copy and triggers the rebuild, the rest of the traffic sees the fresh page, and nobody waits for the regeneration. The latency of the page therefore does not depend on the cost of the data behind it.\n\nThe interval comes from the segment config `export const revalidate = 60`, which applies to every fetch inside the route that does not define its own lifetime. Such a route is still static in the build output, and the response carries a cache policy that lets a shared cache serve it for a minute. When the interval is wrong, either the content is stale for too long or the origin works harder than it needs to, so sixty seconds is a starting point rather than a rule.\n\nTime-based regeneration is not enough when the change happens inside your own application. A published article should appear immediately, not a minute later, so the write path calls `revalidateTag(\'posts\')` or `revalidatePath(\'/blog\')` right after the mutation. Tags are the precise instrument, because they are attached to the request that produced the data, while a path invalidates everything below it. The most common failure is calling the revalidation and still seeing old data, which usually means the tag was never attached to the request that returned it.',
        'Инкрементальная статическая регенерация — компромисс, который стал ответом по умолчанию для контентных сайтов. Страница генерируется один раз, а потом пересобирается в фоне через заданный интервал, пока посетители продолжают получать предыдущую версию. Первый запрос после интервала получает устаревшую копию и запускает пересборку, весь остальной трафик видит свежую страницу, и никто не ждёт перегенерации. Задержка страницы, таким образом, не зависит от стоимости данных за ней.\n\nИнтервал задаётся конфигом сегмента `export const revalidate = 60`, и он применяется ко всем запросам внутри маршрута, которые не определяют собственное время жизни. Маршрут с такой настройкой остаётся статичным в выводе сборки, а ответ получает политику кэша, позволяющую общему кэшу отдавать его до минуты. Когда интервал подобран неверно, содержимое либо устаревает слишком долго, либо источник работает больше нужного, поэтому шестьдесят секунд — это отправная точка, а не правило.\n\nРегенерации по времени не хватает, когда изменение происходит внутри вашего приложения. Опубликованная статья должна появиться сразу, а не через минуту, поэтому путь записи вызывает `revalidateTag(\'posts\')` или `revalidatePath(\'/blog\')` сразу после мутации. Теги — точный инструмент, потому что привязаны к запросу, который произвёл данные, а путь инвалидирует всё под ним. Самая частая неудача — вызвать ревалидацию и всё равно увидеть старые данные, и обычно это значит, что тег так и не повесили на тот запрос, который их вернул.'
      ),
      bullets: [
        L('revalidate = 60 regenerates the page in the background while visitors keep the stale copy.', 'revalidate = 60 пересобирает страницу в фоне, пока посетители получают устаревшую копию.'),
        L('A revalidated route is still static in the build output, the rebuild blocks no request.', 'Маршрут с ревалидацией остаётся статичным в выводе сборки, пересборка не блокирует ни один запрос.'),
        L('revalidateTag invalidates the requests that carry the tag, revalidatePath invalidates a path.', 'revalidateTag сбрасывает запросы с тегом, revalidatePath — путь.'),
        L('ISR needs a persistent cache and a server, so it does not exist in a fully static export.', 'ISR требует постоянного кэша и сервера, поэтому в полностью статичной сборке его нет.'),
      ],
      code: `// app/blog/[slug]/page.tsx
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

// app/actions.ts
'use server';

import { revalidateTag } from 'next/cache';

export async function publishPost(slug: string) {
  await db.post.update({ where: { slug }, data: { status: 'published' } });
  revalidateTag('post:' + slug);
}`,
      table: {
        caption: L('Time based against on demand regeneration', 'Регенерация по времени против по требованию'),
        headers: [
          L('Aspect', 'Аспект'),
          L('revalidate = 60', 'revalidate = 60'),
          L('revalidateTag', 'revalidateTag'),
        ],
        rows: [
          [L('When it runs', 'Когда выполняется'), L('On a schedule', 'По расписанию'), L('Right after the write', 'Сразу после записи')],
          [L('What it invalidates', 'Что сбрасывает'), L('The whole route', 'Весь маршрут'), L('The tagged requests only', 'Только запросы с тегом')],
          [L('Delay before the change is visible', 'Задержка до появления изменения'), L('Up to the interval', 'До конца интервала'), L('One request', 'Один запрос')],
          [L('Needs a cache', 'Нужен кэш'), L('Yes', 'Да'), L('Yes', 'Да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A tag that was never attached', 'Тег, который так и не повесили'),
          text: L(
            'revalidateTag only invalidates the requests that were cached with that tag. If the fetch never declared next.tags, the call succeeds and does nothing, and the page keeps serving the old version until the time-based window expires.',
            'revalidateTag сбрасывает только те запросы, которые были закэшированы с этим тегом. Если запрос не объявлял next.tags, вызов проходит успешно и ничего не делает, а страница продолжает отдавать старую версию, пока не истечёт окно по времени.'
          ),
        },
        {
          tone: 'warning',
          title: L('ISR does not exist in a static export', 'В статичной сборке ISR не существует'),
          text: L(
            'A static export has no server and no background process, so nothing can regenerate a page. If the content changes, the only way to publish it is another build and another deploy.',
            'У статичной сборки нет ни сервера, ни фонового процесса, поэтому пересобирать страницу некому. Если содержимое меняется, единственный способ опубликовать его — новая сборка и новый деплой.'
          ),
        },
      ],
      takeaway: L(
        'Regenerate on a schedule for content that ages and on demand for content you publish, and always tag the request you want to invalidate.',
        'Регенерируйте по расписанию для стареющего содержимого и по требованию для публикуемого, и всегда вешайте тег на запрос, который хотите сбросить.'
      ),
      seeAlso: [
        L('Section 3-5: tags and on-demand revalidation', 'Секция 3-5: теги и ревалидация по требованию'),
        L('Section 6-1: static generation', 'Секция 6-1: статическая генерация'),
        L('Section 4-4: revalidation after a mutation', 'Секция 4-4: ревалидация после мутации'),
      ],
    },
    {
      id: 'next-ch6-s4',
      title: L('Streaming and Suspense', 'Стриминг и Suspense'),
      body: L(
        'Streaming lets a response start before it is finished. The server sends a shell containing everything it already knows, and the slow parts arrive later, each one taking the place of a placeholder that was sent earlier. The browser paints the header and the navigation immediately, and the page becomes interactive while the slowest query is still running. The unit of streaming is a Suspense boundary: `loading.tsx` creates one for its segment, and an explicit `<Suspense>` creates one wherever it is needed.\n\nA boundary is a promise about the layout of the page. The fallback is not a spinner over everything, it is a placeholder that should occupy roughly the space the final content will take, otherwise the content arrives and pushes everything below it down. The old advice to keep the fallback small was written for spinners; with skeletons, matching the size is what keeps the page from jumping.\n\nStreaming changes what a status code can say. The response headers are sent as soon as the shell is flushed, so an error or a `notFound()` that happens after that point cannot change the status. The page shows the 404 view inside a 200 response, and crawlers and monitoring see a success. The safe order is to resolve everything that can produce a status code before the first flush, and to keep the risky calls inside a boundary whose failure is a local error rather than a failed document.',
        'Стриминг позволяет ответу начаться до того, как он закончен. Сервер отправляет оболочку со всем, что уже известно, а медленные части приходят позже, каждая занимая место заглушки, отправленной раньше. Браузер сразу рисует шапку и навигацию, а страница становится интерактивной, пока самый медленный запрос ещё выполняется. Единица стриминга — граница Suspense: `loading.tsx` создаёт её для своего сегмента, а явный `<Suspense>` создаёт границу там, где она нужна.\n\nГраница — это обещание насчёт макета страницы. Заглушка не спиннер поверх всего, а плейсхолдер, который должен занимать примерно столько же места, сколько займёт финальное содержимое, иначе содержимое придёт и сдвинет всё, что под ним. Старый совет держать заглушку маленьким писался для спиннеров; со скелетонами именно совпадение размера убирает прыжки страницы.\n\nСтриминг меняет то, что может сказать код статуса. Заголовки ответа уходят, как только оболочка отправлена, поэтому ошибка или `notFound()`, случившиеся после этого, уже не могут изменить статус. Страница показывает вид 404 внутри ответа 200, а краулеры и мониторинг видят успех. Безопасный порядок такой: всё, что может дать код статуса, разрешается до первой отправки, а рискованные вызовы живут внутри границы, где их сбой остаётся локальной ошибкой, а не упавшим документом.'
      ),
      bullets: [
        L('loading.tsx creates a Suspense boundary for the segment, an explicit Suspense gives finer control.', 'loading.tsx создаёт границу Suspense для сегмента, явный Suspense даёт более тонкий контроль.'),
        L('The fallback should occupy about the same space as the content that replaces it.', 'Заглушка должна занимать примерно столько же места, сколько финальный контент.'),
        L('Once the shell is flushed the status code is fixed, so a late notFound() becomes a 200.', 'После отправки оболочки код статуса фиксирован, и поздний notFound() превращается в 200.'),
        L('Streaming needs a server that can flush the response, a buffering proxy removes the effect.', 'Стриминг требует сервера, умеющего отправлять ответ частями, буферизующий прокси убирает эффект.'),
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
  const report = await slowRevenueQuery();
  return <Chart data={report} />;
}`,
      table: {
        caption: L('Where a failure is caught, with and without streaming', 'Где ловится сбой со стримингом и без него'),
        headers: [
          L('Failure', 'Сбой'),
          L('With streaming', 'Со стримингом'),
          L('Without streaming', 'Без стриминга'),
        ],
        rows: [
          [L('Before the first flush', 'До первой отправки'), L('Error page with a real status code', 'Страница ошибки с настоящим кодом статуса'), L('Error page with a real status code', 'Страница ошибки с настоящим кодом статуса')],
          [L('Inside a boundary', 'Внутри границы'), L('Local error boundary, the shell survives', 'Локальная граница ошибок, оболочка сохраняется'), L('Nothing survives, the page is replaced', 'Ничего не сохраняется, страница заменяется')],
          [L('After the last boundary', 'После последней границы'), L('Already committed to a 200', 'Статус 200 уже отправлен'), L('Already committed to a 200', 'Статус 200 уже отправлен')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A late notFound() becomes a success', 'Поздний notFound() становится успехом'),
          text: L(
            'Once the shell has been flushed the status is 200, so a missing record discovered during streaming produces a 404 view inside a successful response. Crawlers index the page and monitoring records no error, which is why the check has to happen before the first flush.',
            'После отправки оболочки статус равен 200, поэтому отсутствие записи, обнаруженное во время стриминга, даёт вид 404 внутри успешного ответа. Краулеры индексируют страницу, а мониторинг не фиксирует ошибку — поэтому проверку надо делать до первой отправки.'
          ),
        },
        {
          tone: 'tip',
          title: L('Size the fallback like the content', 'Размер заглушки — как у контента'),
          text: L(
            'A skeleton that matches the height of the real content removes the layout shift, while a small spinner in a big empty area guarantees one. This is the cheapest measurable improvement on a page that streams.',
            'Скелетон, совпадающий по высоте с настоящим контентом, убирает сдвиг макета, а маленький спиннер в большой пустой области гарантирует его. Это самое дешёвое измеримое улучшение на стримящейся странице.'
          ),
        },
      ],
      takeaway: L(
        'Stream every slow region behind its own boundary, and resolve anything that can change the status code before the first flush.',
        'Стримьте каждую медленную часть за своей границей и разрешайте всё, что может изменить код статуса, до первой отправки.'
      ),
      seeAlso: [
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
        L('Section 6-5: partial prerendering', 'Секция 6-5: частичный пререндеринг'),
      ],
    },
    {
      id: 'next-ch6-s5',
      title: L('Partial prerendering', 'Частичный пререндеринг'),
      body: L(
        'Partial prerendering splits one route into parts that are produced at different times and delivered together. The shell, which holds everything that does not depend on the request, is prerendered at build time and served from the cache on every request. The dynamic holes inside it suspend during the request and stream in afterwards. The visitor gets the fast part instantly and the fresh part a moment later, and the origin only does the work that genuinely depends on who is asking.\n\nThe mechanism needs the cache components model. It is enabled in the configuration with `cacheComponents`, and the static parts are marked with the `use cache` directive: a component or a data function that says so keeps its result between requests, while everything else stays dynamic. Earlier releases exposed the same idea behind the experimental `ppr` flag. The vocabulary changes between versions, but the shape of the model does not: declare what is cacheable, and the framework prerenders the rest of the shell around it.\n\nPartial prerendering is the natural answer to a page that is mostly static and slightly personal. A product page with a title, a description and a price is static in every part except the stock counter. An article with a comments section is static except for the last comment. Without prerendering, one request-time read forces the whole page to be rendered on every visit, and with it the expensive part is built once and reused.',
        'Частичный пререндеринг делит один маршрут на части, которые производятся в разное время и доставляются вместе. Оболочка, в которой лежит всё, не зависящее от запроса, пререндерится во время сборки и отдаётся из кэша на каждый запрос. Динамические дыры внутри неё приостанавливаются во время запроса и стримятся позже. Посетитель мгновенно получает быструю часть и чуть позже свежую, а источник делает только ту работу, которая действительно зависит от того, кто спрашивает.\n\nМеханизму нужна модель cache components. Она включается в конфигурации через `cacheComponents`, а статичные части помечаются директивой `use cache`: компонент или функция данных с такой директивой сохраняет результат между запросами, а всё остальное остаётся динамическим. В более ранних версиях та же идея была за флагом `ppr` в экспериментальном разделе. Словарь меняется от версии к версии, но форма модели нет: объявите, что кэшируемо, и фреймворк пререндерит остальную оболочку вокруг этого.\n\nЧастичный пререндеринг — естественный ответ для страницы, которая почти вся статична и слегка персональна. Страница товара с заголовком, описанием и ценой статична во всех частях, кроме счётчика остатков. Статья с комментариями статична, кроме последнего комментария. Без частичного пререндеринга одно чтение времени запроса заставляет рендерить всю страницу при каждом визите, а с ним дорогая часть собирается один раз и переиспользуется.'
      ),
      bullets: [
        L('Partial prerendering serves a prerendered shell and streams the request-dependent parts into it.', 'Частичный пререндеринг отдаёт пререндеренную оболочку и стримит в неё зависящие от запроса части.'),
        L('The cache components model and the use cache directive mark what may be prerendered.', 'Модель cache components и директива use cache помечают то, что можно пререндерить.'),
        L('A component that reads request data cannot live in the prerendered shell.', 'Компонент, читающий данные запроса, не может жить в пререндеренной оболочке.'),
        L('Partial prerendering removes the choice between a fully static page and a fully dynamic one.', 'Частичный пререндеринг снимает выбор между полностью статичной и полностью динамичной страницей.'),
      ],
      code: `// app/catalog/page.tsx
import { Suspense } from 'react';

export default function CatalogPage() {
  return (
    <>
      {/* 'use cache' keeps the list in the prerendered shell */}
      <CatalogList />
      <Suspense fallback={<StockSkeleton />}>
        {/* resolved per request */}
        <LiveStock />
      </Suspense>
    </>
  );
}

// app/catalog/stock.tsx - reads request data, so it stays out of the shell
import { cookies } from 'next/headers';
export async function LiveStock() {
  const region = (await cookies()).get('region')?.value ?? 'eu';
  return <p>Stock for {region}</p>;
}`,
      table: {
        caption: L('Prerendered shell against dynamic hole', 'Пререндеренная оболочка против динамичной дыры'),
        headers: [
          L('Part', 'Часть'),
          L('Depends on the request', 'Зависит от запроса'),
          L('Delivered', 'Доставляется'),
        ],
        rows: [
          [L('Shell without a request API', 'Оболочка без API запроса'), L('No', 'Нет'), L('Immediately, from the cache', 'Сразу, из кэша')],
          [L('Marked with use cache', 'Помечено use cache'), L('No, the result is cached', 'Нет, результат кэширован'), L('Immediately, from the cache', 'Сразу, из кэша')],
          [L('Uncached dynamic part', 'Незакэшированная динамичная часть'), L('Yes', 'Да'), L('Streamed in during the request', 'Стримится во время запроса')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The directive marks a unit, not a route', 'Директива помечает единицу, а не маршрут'),
          text: L(
            'use cache is written on a function or a component. Everything that is not marked stays dynamic, and the shell is assembled from the marked parts. The decision moves from the route to the data, which is the shift the whole model is about.',
            'Директива use cache пишется на функции или компоненте. Всё, что не помечено, остаётся динамическим, а оболочка собирается из помеченных частей. Решение переносится с маршрута на данные — в этом и состоит сдвиг всей модели.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The shell must not read the request', 'Оболочка не должна читать запрос'),
          text: L(
            'A component inside the shell that awaits cookies() makes the shell dynamic again, and the prerendering of that route is lost. Keep the request-dependent reading in a child that lives behind a Suspense boundary.',
            'Компонент внутри оболочки, в котором ожидается cookies(), делает оболочку динамичной снова, и пререндер этого маршрута теряется. Держите чтение данных запроса в потомке за границей Suspense.'
          ),
        },
      ],
      takeaway: L(
        'Mark the cacheable parts with use cache, keep the request-dependent parts in children behind a boundary, and let the shell be prerendered.',
        'Помечайте кэшируемое через use cache, держите зависящее от запроса в потомках за границей и позволяйте оболочке пререндериться.'
      ),
      seeAlso: [
        L('Section 3-6: cache components and the new model', 'Секция 3-6: cache components и новая модель'),
        L('Section 6-4: streaming and Suspense', 'Секция 6-4: стриминг и Suspense'),
        L('Section 6-6: choosing a strategy per route', 'Секция 6-6: выбор стратегии по маршрутам'),
      ],
    },
    {
      id: 'next-ch6-s6',
      title: L('Choosing a strategy per route', 'Выбор стратегии по маршрутам'),
      body: L(
        'Every rendering decision in Next.js is per segment, not per application. The segment config exports `dynamic`, `revalidate`, `dynamicParams` and `runtime` apply to the folder they sit in and to everything nested below it, so one application can serve a static marketing page, a regenerated product page and a personalised dashboard without a single global switch. The mistake is to look for a project-wide setting, because there is none, and then to let one accidental dynamic read spread through the tree.\n\nThe practical method is to look at the data. If the output is the same for everybody and changes rarely, generate it statically and let the build handle the updates. If it changes with the request but is cheap to produce, render it dynamically and let the CDN absorb the traffic through cache headers. If it is expensive and changes slowly, generate it on demand and cache it. If it is expensive and changes with the user, the only answer left is to make the expensive part smaller.\n\nSegment configs are inherited, so the location of a config matters. A `revalidate` in the root layout reaches the whole application, and a `dynamic = \'force-dynamic\'` in a shared parent segment disables static rendering for every page below it. Put the config in the smallest segment that needs it and let the defaults do their job. The build output is the report on all of this: it lists every route and its rendering mode, and it is the fastest way to notice that a page you believed was static is not.',
        'Каждое решение о рендеринге в Next.js принимается на уровне сегмента, а не приложения. Экспорты конфига сегмента `dynamic`, `revalidate`, `dynamicParams` и `runtime` действуют на папку, в которой лежат, и на всё вложенное в неё, поэтому одно приложение может отдавать статичную маркетинговую страницу, регенерируемую страницу товара и персональный дашборд без единого глобального переключателя. Ошибка — искать настройку на весь проект, потому что её нет, и позволить одному случайному динамическому чтению растечься по дереву.\n\nПрактический метод — смотреть на данные. Если вывод одинаков для всех и меняется редко, генерируйте его статично и поручите обновления сборке или окну ревалидации. Если он меняется от запроса, но производится дёшево, рендерьте динамически и настройте заголовки кэша, чтобы CDN забрал трафик. Если он дорогой и меняется медленно, генерируйте по требованию и кэшируйте с временем жизни. Если он дорогой и меняется в зависимости от пользователя, единственный оставшийся ответ — сделать дорогую часть меньше.\n\nКонфиги сегментов наследуются, поэтому место конфига имеет значение. `revalidate` в корневой компоновке достаётся всему приложению, а `dynamic = \'force-dynamic\'` в общем родительском сегменте отключает статичный рендер для всех страниц под ним. Кладите конфиг в самый маленький сегмент, которому он нужен, а остальным оставьте умолчания. Вывод сборки и есть отчёт обо всём этом: он перечисляет маршруты, их режим рендеринга и размер, и это самый быстрый способ заметить, что страница, которую считали статичной, статичной не является.'
      ),
      bullets: [
        L('Segment configs are inherited, a config in the root layout reaches the whole application.', 'Конфиги сегментов наследуются, конфиг в корневой компоновке достаётся всему приложению.'),
        L('Choose by data: same for everybody, changes with the request, expensive to produce, or all three.', 'Выбирайте по данным: одинаковый для всех, меняется от запроса, дорогой или всё сразу.'),
        L('The build output shows the rendering mode of every route and is the fastest audit available.', 'Вывод сборки показывает режим рендеринга каждого маршрута и остаётся самой быстрой проверкой.'),
        L('output: export removes the server, and with it regeneration, dynamic rendering and server actions.', 'output: export убирает сервер, а вместе с ним регенерацию, динамический рендеринг и серверные действия.'),
      ],
      code: `// app/marketing/page.tsx
export const dynamic = 'force-static';
export const revalidate = 3600;

// app/products/[slug]/page.tsx
export const revalidate = 60;
export const dynamicParams = true;

// app/account/page.tsx
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';`,
      table: {
        caption: L('A strategy for each kind of route', 'Стратегия для каждого вида маршрута'),
        headers: [
          L('Route', 'Маршрут'),
          L('Strategy', 'Стратегия'),
          L('Configuration', 'Конфигурация'),
        ],
        rows: [
          [L('Marketing page', 'Маркетинговая страница'), L('Static', 'Статичная'), L('force-static', 'force-static')],
          [L('Product page', 'Страница товара'), L('Regenerated statically', 'Регенерируемая'), L('revalidate = 60', 'revalidate = 60')],
          [L('Article', 'Статья'), L('Static, rebuilt daily', 'Статичная, пересборка раз в день'), L('revalidate = 86400', 'revalidate = 86400')],
          [L('Dashboard', 'Дашборд'), L('Dynamic', 'Динамичная'), L('force-dynamic', 'force-dynamic')],
          [L('Search results', 'Результаты поиска'), L('Dynamic, cached at the CDN', 'Динамичная, кэш в CDN'), L('Cache-Control header', 'Заголовок Cache-Control')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A config in the root layout reaches everything', 'Конфиг в корневой компоновке достаётся всему'),
          text: L(
            'One revalidate export in the root layout gives the entire application the same lifetime, and one force-dynamic in a shared segment removes static rendering from every page under it. Inheritance is convenient until the setting is wrong, and then it is wrong everywhere at once.',
            'Один экспорт revalidate в корневой компоновке задаёт всему приложению одинаковое время жизни, а один force-dynamic в общем сегменте убирает статичный рендер у всех страниц под ним. Наследование удобно, пока настройка верна, а когда она неверна, она неверна сразу везде.'
          ),
        },
        {
          tone: 'tip',
          title: L('Read the build output after every change', 'Читайте вывод сборки после каждого изменения'),
          text: L(
            'The build lists every route with its rendering mode and its size. It is the cheapest audit in the framework: a route that changed from static to dynamic shows up as one letter in one line.',
            'Сборка перечисляет каждый маршрут с его режимом рендеринга и размером. Это самая дешёвая проверка во фреймворке: маршрут, сменивший статичный режим на динамичный, виден как одна буква в одной строке.'
          ),
        },
      ],
      takeaway: L(
        'Decide per segment from the data, keep the config in the smallest segment that needs it, and check the build output before shipping.',
        'Решайте по сегментам, исходя из данных, держите конфиг в самом маленьком нужном сегменте и проверяйте вывод сборки перед выкладкой.'
      ),
      seeAlso: [
        L('Section 6-1: static generation', 'Секция 6-1: статическая генерация'),
        L('Section 6-3: incremental static regeneration', 'Секция 6-3: инкрементальная статическая регенерация'),
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
      ],
    },
  ],
};
