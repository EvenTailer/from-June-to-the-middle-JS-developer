import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh03: Chapter = {
  id: 'next-ch3',
  title: L('Data fetching and caching', 'Получение данных и кэширование'),
  summary: L(
    'How requests, rendered routes and data are cached, what makes a route dynamic, how stale data is invalidated on demand, and what changes when caching becomes an explicit choice.',
    'Как кэшируются запросы, отрендеренные маршруты и данные, что делает маршрут динамическим, как устаревшие данные сбрасываются по требованию и что меняется, когда кэширование становится явным выбором.'
  ),
  sections: [
    {
      id: 'next-ch3-s1',
      title: L('fetch and the request memoisation cache', 'fetch и кэш мемоизации запросов'),
      body: L(
        'Two caches answer two different questions, and confusing them causes most caching bugs. The request memoisation cache answers: within one render, do I need to ask the network the same question twice? The Data Cache answers: between requests, do I need to ask the network at all? The first lives for the duration of a single render pass; the second survives across requests and across deployments.\n\nRequest memoisation is a React feature. When the same GET request with the same URL and options appears several times in one component tree, React executes it once and hands the same promise to every caller. It applies to GET and HEAD only, it does not apply inside route handlers because those are not part of a React tree, and it can be switched off by passing an AbortSignal. The Data Cache behaves differently: it persists between requests, so the second visitor of the day gets the answer the first visitor fetched.\n\nSince Next.js 15 the default for `fetch` changed. A request without an explicit cache option is not stored in the Data Cache, and the fetch option `cache: "force-cache"` opts back in, while `cache: "no-store"` forbids caching explicitly. This is a deliberate change: an implicit cache hid stale data behind a convenient default, and the framework now asks you to say what you mean.\n\nMemoisation also shapes the code. Two components that both need the same record can both call the same helper and cost one query, but only if they call it during the same render pass and with the same arguments. A helper that reads the current time or generates a random identifier inside breaks the memoisation and turns one query into two, which is why such helpers take their inputs as parameters.',
        'Два кэша отвечают на два разных вопроса, и их путаница — источник большинства багов с кэшированием. Кэш мемоизации запросов отвечает: внутри одного рендера нужно ли спрашивать сеть один и тот же вопрос дважды? Data Cache отвечает: между запросами нужно ли вообще спрашивать сеть? Первый живёт в пределах одного прохода рендера, второй переживает запросы и деплои.\n\nМемоизация запросов — возможность React. Когда одинаковый GET-запрос с одинаковым URL и опциями встречается в дереве компонентов несколько раз, React выполняет его один раз и отдаёт один и тот же промис всем вызывающим. Это касается только GET и HEAD, не работает внутри обработчиков маршрута, потому что те не часть React-дерева, и отключается через AbortSignal. Data Cache ведёт себя иначе: он переживает запросы, поэтому второй посетитель дня получает ответ, который загрузил первый.\n\nС Next.js 15 изменился умолчательный режим `fetch`. Запрос без явной опции кэша больше не попадает в Data Cache, опция `cache: "force-cache"` включает кэширование обратно, а `cache: "no-store"` запрещает его явно. Это осознанное изменение: неявный кэш прятал устаревшие данные за удобным умолчанием, и теперь фреймворк просит сказать, что именно имеется в виду.\n\nМемоизация заодно диктует форму кода. Два компонента, которым нужна одна и та же запись, могут оба вызвать один помощник и получить один запрос, но только если вызывают его в одном проходе рендера и с одинаковыми аргументами. Помощник, который внутри читает текущее время или генерирует случайный идентификатор, ломает мемоизацию и превращает один запрос в два, поэтому такие входные данные передаются параметрами.'
      ),
      bullets: [
        L('Memoisation lasts one render pass, the Data Cache lasts across requests.', 'Мемоизация живёт один проход рендера, Data Cache — между запросами.'),
        L('Only GET and HEAD are memoised, and only inside the React tree.', 'Мемоизируются только GET и HEAD и только внутри React-дерева.'),
        L('Since Next.js 15 fetch is uncached by default, use force-cache to opt in.', 'С Next.js 15 fetch не кэшируется по умолчанию, включение через force-cache.'),
        L('An AbortSignal opts a request out of memoisation.', 'AbortSignal выводит запрос из мемоизации.'),
        L('Memoisation needs identical arguments, a random value inside breaks it.', 'Мемоизация требует одинаковых аргументов, случайное значение внутри ломает её.'),
      ],
      code: `// app/lib/products.ts
import { cache } from 'react';

export const getProduct = cache(async (id: string) => {
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    cache: 'force-cache', // opt into the Data Cache
  });
  return res.json();
});

// two callers in one render pass, one network request
export default async function Page() {
  const [a, b] = await Promise.all([getProduct('1'), getProduct('1')]);
  return <p>{a.name} {b.name}</p>;
}`,
      table: {
        caption: L('The caches of a Next.js application', 'Кэши приложения Next.js'),
        headers: [
          L('Cache', 'Кэш'),
          L('Scope', 'Область'),
          L('Holds', 'Хранит'),
          L('Cleared by', 'Сбрасывается'),
        ],
        rows: [
          [
            L('Request memoisation', 'Мемоизация запросов'),
            L('One render pass', 'Один проход рендера'),
            L('Promises of identical GET requests', 'Промисы одинаковых GET-запросов'),
            L('The end of the request', 'Конец запроса'),
          ],
          [
            L('Data Cache', 'Data Cache'),
            L('Across requests and deploys', 'Между запросами и деплоями'),
            L('Fetch responses', 'Ответы fetch'),
            L('revalidate, revalidateTag, updateTag', 'revalidate, revalidateTag, updateTag'),
          ],
          [
            L('Full Route Cache', 'Full Route Cache'),
            L('Across requests', 'Между запросами'),
            L('Rendered HTML and the RSC payload', 'Отрендеренный HTML и RSC-полезная нагрузка'),
            L('revalidate, revalidatePath', 'revalidate, revalidatePath'),
          ],
          [
            L('Router Cache', 'Router Cache'),
            L('The browser tab', 'Вкладка браузера'),
            L('Visited segments', 'Посещённые сегменты'),
            L('Navigation, refresh, staleTimes', 'Навигация, обновление, staleTimes'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Memoisation is not caching', 'Мемоизация — это не кэширование'),
          text: L(
            'A memoised request disappears with the request that created it. The next visitor runs it again, and if the origin is slow the page is slow for everybody. Memoisation removes duplicate work inside one render, it does not protect the next render.',
            'Запромоизированный запрос исчезает вместе с запросом, который его создал. Следующий посетитель выполнит его снова, и если источник медленный, страница будет медленной для всех. Мемоизация убирает повторную работу внутри одного рендера, но не защищает следующий.'
          ),
        },
        {
          tone: 'note',
          title: L('Uncached by default since Next.js 15', 'Без кэша по умолчанию с Next.js 15'),
          text: L(
            'Code written for Next.js 14 relied on an implicit cache and now hits the origin on every request. The migration is deliberate: add cache: "force-cache" where the old behaviour was correct and leave the rest uncached.',
            'Код, написанный под Next.js 14, полагался на неявный кэш и теперь ходит в источник на каждый запрос. Миграция осознанная: добавьте cache: "force-cache" там, где старое поведение было правильным, а остальное оставьте без кэша.'
          ),
        },
      ],
      takeaway: L(
        'Memoisation removes duplicate calls inside one render, the Data Cache removes calls between requests.',
        'Мемоизация убирает повторы внутри одного рендера, а Data Cache — между запросами.'
      ),
      seeAlso: [
        L('Section 3-2: the full route cache', 'Секция 3-2: кэш полных маршрутов'),
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
      ],
    },
    {
      id: 'next-ch3-s2',
      title: L('The full route cache', 'Кэш полных маршрутов'),
      body: L(
        'The Full Route Cache stores the finished output of a route: the HTML and the RSC payload. When a route is static, the request never reaches a running server for the page body. The framework serves the stored result and the application code is not involved at all. That is the strongest performance contract Next.js offers, and it is the default for every route that does not need request-time information.\n\nA route lands in the Full Route Cache when it can be determined at build time. That happens for a page with no dynamic segment and no dynamic API, and for a dynamic segment whose parameter values are named by `generateStaticParams`. Values outside that list are generated on the first request and then cached, unless `dynamicParams` is set to false, in which case they return a 404 instead.\n\nThe Full Route Cache has its own lifetime, separate from the data it was built from. A route can be static and still read from the Data Cache, in which case the two lifetimes interact: the route is served from the Full Route Cache until it is regenerated, and regeneration happens on the schedule or the tag that the underlying data declares. If the page is regenerated but the data is still cached, the new page shows old data, which is a common and confusing symptom.\n\nRoute handlers have their own cache, separate from the Full Route Cache of pages. Since Next.js 15 a GET handler is dynamic by default and is never stored there unless it opts in. The two caches never mix: invalidating a page does not invalidate an endpoint, and invalidating an endpoint does not change a page that calls it.',
        'Full Route Cache хранит готовый вывод маршрута: HTML и RSC-полезную нагрузку. Когда маршрут статичный, запрос вообще не доходит до работающего сервера за телом страницы: фреймворк отдаёт сохранённый результат, и код приложения в этом не участвует. Это самый сильный контракт производительности, который предлагает Next.js, и он действует по умолчанию для каждого маршрута, которому не нужна информация времени запроса.\n\nМаршрут попадает в Full Route Cache тогда, когда его можно определить во время сборки. Так бывает для страницы без динамического сегмента и без динамических API, и для динамического сегмента, значения параметров которого перечислены в `generateStaticParams`. Значения вне этого списка генерируются при первом запросе и затем кэшируются, если только `dynamicParams` не выставлен в false — тогда приходит 404.\n\nУ Full Route Cache своя продолжительность жизни, отдельная от данных, из которых он построен. Маршрут может быть статичным и при этом читать из Data Cache, и тогда две схемы устаревания взаимодействуют: маршрут раздаётся из Full Route Cache до пересборки, а пересборка происходит по расписанию или по тегу, который объявили сами данные. Если страницу пересобрали, а данные остались в кэше, новая страница покажет старые данные — симптом частый и сбивает с толку.\n\nУ обработчиков маршрута свой кэш, отдельный от Full Route Cache страниц. С Next.js 15 GET-обработчик динамический по умолчанию и туда не попадает, пока сам не объявит. Кэши не смешиваются: сброс страницы не трогает эндпоинт, а сброс эндпоинта не меняет страницу, которая его вызывает.'
      ),
      bullets: [
        L('The Full Route Cache stores the HTML and the RSC payload of a whole route.', 'Full Route Cache хранит HTML и RSC-полезную нагрузку целого маршрута.'),
        L('A static route is served without running any application code.', 'Статичный маршрут раздаётся без выполнения кода приложения.'),
        L('generateStaticParams names the parameter values that are pre-rendered.', 'generateStaticParams называет значения параметров для пререндера.'),
        L('A route and its data can have different lifetimes, which is how stale pages appear.', 'У маршрута и его данных могут быть разные схемы устаревания, отсюда устаревшие страницы.'),
        L('Route handlers do not use the Full Route Cache of pages.', 'Обработчики маршрута не используют Full Route Cache страниц.'),
      ],
      code: `// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = true; // unknown slugs render on demand

// app/api/health/route.ts
export async function GET() {
  // dynamic by default since Next.js 15
  return Response.json({ ok: true, at: Date.now() });
}`,
      table: {
        caption: L('Full Route Cache against the Data Cache', 'Full Route Cache против Data Cache'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Full Route Cache', 'Full Route Cache'),
          L('Data Cache', 'Data Cache'),
        ],
        rows: [
          [
            L('Stores', 'Хранит'),
            L('Rendered HTML and the RSC payload', 'Отрендеренный HTML и RSC-полезную нагрузку'),
            L('Raw fetch responses', 'Сырые ответы fetch'),
          ],
          [
            L('Keyed by', 'Ключ'),
            L('The route path and its parameters', 'Путь маршрута и его параметры'),
            L('URL, method, body and headers', 'URL, метод, тело и заголовки'),
          ],
          [
            L('Filled when', 'Заполняется'),
            L('The route is built', 'Маршрут собран'),
            L('A cached fetch runs', 'Выполнен кэшированный fetch'),
          ],
          [
            L('Cleared by', 'Сбрасывается'),
            L('revalidate, revalidatePath', 'revalidate, revalidatePath'),
            L('revalidate, revalidateTag, updateTag', 'revalidate, revalidateTag, updateTag'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A fresh page built from stale data', 'Свежая страница из устаревших данных'),
          text: L(
            'Regenerating a page does not regenerate the data it reads. If the underlying fetch still has a long lifetime, the rebuilt page renders yesterday values and looks like a bug in the page instead of a policy problem in the data layer.',
            'Пересборка страницы не пересобирает данные, которые она читает. Если у базового fetch длинное время жизни, пересобранная страница покажет вчерашние значения, и это выглядит как баг страницы, а не как проблема политики в слое данных.'
          ),
        },
        {
          tone: 'note',
          title: L('The Router Cache lives in the browser', 'Router Cache живёт в браузере'),
          text: L(
            'The third cache is client side. It keeps recently visited segments so that navigation paints instantly, and it has its own lifetime controlled by the staleTimes settings. It is separate from both server caches and is refreshed by navigation rather than by revalidateTag.',
            'Третий кэш находится на клиенте. Он хранит недавно посещённые сегменты, чтобы навигация рисовалась мгновенно, и имеет собственную продолжительность жизни, заданную настройками staleTimes. Он отделён от обоих серверных кэшей и обновляется навигацией, а не revalidateTag.'
          ),
        },
      ],
      takeaway: L(
        'The route cache holds finished pages and the data cache holds raw responses, and they expire on their own schedules.',
        'Кэш маршрутов хранит готовые страницы, а кэш данных — сырые ответы, и у каждого своя схема устаревания.'
      ),
      seeAlso: [
        L('Section 3-1: fetch and the request memoisation cache', 'Секция 3-1: fetch и кэш мемоизации запросов'),
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
      ],
    },
    {
      id: 'next-ch3-s3',
      title: L('The data cache and revalidation', 'Кэш данных и ревалидация'),
      body: L(
        'The Data Cache is a persistent HTTP cache for `fetch` responses, keyed by URL, method, body and the parts of the headers that take part in the key. It is filled by a cached fetch and read by later requests, which means the second visitor of the day does not touch the origin API at all. Since Next.js 15 nothing is cached unless you ask for it, so the Data Cache is now an explicit layer rather than an ambient one.\n\nThere are two ways to ask. The `cache` option on the fetch call sets the policy for that one request: `force-cache` stores it, `no-store` never stores it. The `next` option configures the framework side: `next: { revalidate: 60 }` gives the entry a lifetime of a minute, and `next: { tags: ["posts"] }` attaches a label that a later invalidation can target.\n\nTime-based revalidation serves the stale copy while a fresh one is fetched in the background. Users never wait for the update, and the entry is replaced when the background request succeeds. If the revalidation fails, the last good copy keeps being served and the next request tries again, so a broken origin does not empty the cache.\n\nA route level `export const revalidate = 60` applies the same idea to the whole segment and sets a default for every fetch inside it. When two fetches in one route declare different lifetimes, the shorter one wins for the route, because a route cannot be regenerated from data that is older than its own policy. That rule is worth remembering: the shortest lifetime in a segment governs the segment.',
        'Data Cache — это постоянный HTTP-кэш ответов `fetch`, с ключом из URL, метода, тела и тех заголовков, которые в ключ входят. Его заполняет кэшированный fetch, и он читается следующими запросами, поэтому второй посетитель дня вообще не ходит в исходный API. С Next.js 15 ничего не кэшируется, пока об этом не попросят, и Data Cache стал явным слоем вместо фонового.\n\nПопросить можно двумя способами. Опция `cache` у запроса задаёт политику для этого одного вызова: `force-cache` сохраняет, `no-store` не сохраняет никогда. Опция `next` настраивает сторону фреймворка: `next: { revalidate: 60 }` задаёт минуту жизни записи, а `next: { tags: ["posts"] }` вешает метку, на которую потом нацелится инвалидация.\n\nРевалидация по времени раздаёт устаревшую копию, пока свежая загружается в фоне. Пользователи никогда не ждут обновления, а запись заменяется, когда фоновый запрос завершается успешно. Если ревалидация не удалась, последняя рабочая копия продолжает раздаваться, а следующий запрос пробует снова, так что сломанный источник не опустошает кэш.\n\nМаршрутный `export const revalidate = 60` применяет ту же идею ко всему сегменту и задаёт умолчание для каждого fetch внутри него. Когда два fetch-а в одном маршруте объявляют разные времена жизни, выигрывает более короткое, потому что маршрут нельзя пересобрать из данных, которые старше его собственной политики. Правило это стоит запомнить: самое короткое время жизни в сегменте управляет всем сегментом.'
      ),
      bullets: [
        L('The Data Cache is a persistent cache of fetch responses.', 'Data Cache — постоянный кэш ответов fetch.'),
        L('Nothing is cached by default since Next.js 15.', 'С Next.js 15 по умолчанию не кэшируется ничего.'),
        L('force-cache opts a request in, no-store opts it out.', 'force-cache включает кэш для запроса, no-store выключает.'),
        L('next.revalidate sets a lifetime, next.tags attaches an invalidation label.', 'next.revalidate задаёт время жизни, next.tags вешает метку инвалидации.'),
        L('The shortest revalidate value in a segment governs the whole segment.', 'Самое короткое значение revalidate в сегменте управляет всем сегментом.'),
      ],
      code: `// app/lib/posts.ts
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['posts'] },
  });
  return res.json();
}

// app/posts/page.tsx - a default for every fetch in the segment
export const revalidate = 300;

export default async function PostsPage() {
  const posts = await getPosts();
  return <ul>{posts.map((p: { id: string; title: string }) => <li key={p.id}>{p.title}</li>)}</ul>;
}`,
      table: {
        caption: L('What each fetch option controls', 'Что контролирует каждая опция fetch'),
        headers: [
          L('Option', 'Опция'),
          L('Effect', 'Эффект'),
          L('Scope', 'Область'),
        ],
        rows: [
          [
            L("cache: 'no-store'", "cache: 'no-store'"),
            L('Never stored', 'Никогда не сохраняется'),
            L('One request', 'Один запрос'),
          ],
          [
            L("cache: 'force-cache'", "cache: 'force-cache'"),
            L('Stored until it expires', 'Хранится до истечения'),
            L('One request', 'Один запрос'),
          ],
          [
            L('next.revalidate', 'next.revalidate'),
            L('Lifetime in seconds', 'Время жизни в секундах'),
            L('One request', 'Один запрос'),
          ],
          [
            L('next.tags', 'next.tags'),
            L('Invalidation label', 'Метка инвалидации'),
            L('One request', 'Один запрос'),
          ],
          [
            L('segment revalidate', 'revalidate сегмента'),
            L('Default lifetime', 'Время жизни по умолчанию'),
            L('The whole segment', 'Весь сегмент'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A stale page built from stale data', 'Устаревшая страница из устаревших данных'),
          text: L(
            'The route lifetime and the data lifetime are chosen separately. A page that regenerates every minute while its data lives for an hour will show the same old rows for an hour, and the fix is in the fetch options, not in the route.',
            'Время жизни маршрута и время жизни данных выбираются независимо. Страница, которая пересобирается каждую минуту, но читает данные, живущие час, будет показывать одни и те же старые строки, и лечится это в опциях fetch, а не в маршруте.'
          ),
        },
        {
          tone: 'note',
          title: L('revalidate 0 means no caching', 'revalidate 0 означает отсутствие кэша'),
          text: L(
            'The value zero is not "revalidate instantly", it is "do not store this entry". A route level export const revalidate = 0 therefore behaves like force-dynamic for the data it reads.',
            'Ноль — это не «пересобирать мгновенно», это «не хранить запись». Маршрутный export const revalidate = 0 ведёт себя как force-dynamic для данных, которые он читает.'
          ),
        },
      ],
      takeaway: L(
        'Caching is opt-in since Next.js 15, and a lifetime shorter than the data it serves makes pages stale.',
        'С Next.js 15 кэширование включается явно, и время жизни меньше времени жизни данных делает страницы устаревшими.'
      ),
      seeAlso: [
        L('Section 3-1: fetch and the request memoisation cache', 'Секция 3-1: fetch и кэш мемоизации запросов'),
        L('Section 3-5: tags and on-demand revalidation', 'Секция 3-5: теги и инвалидация по требованию'),
        L('Section 4-4: revalidation after a mutation', 'Секция 4-4: ревалидация после мутации'),
      ],
    },
    {
      id: 'next-ch3-s4',
      title: L('Dynamic versus static rendering', 'Динамический рендеринг против статичной генерации'),
      body: L(
        'Static generation means the route is produced once and then served from a cache. Dynamic rendering means it is produced per request, and the cost of that production, the queries and the API calls, is paid on every visit. The two are not chosen by a setting on the route but inferred: a route becomes dynamic as soon as it depends on information that exists only at request time.\n\nThe usual culprits are the dynamic APIs. Reading `cookies()` or `headers()` inside a server component or a layout marks the segment dynamic, and both are asynchronous in the current versions, so they must be awaited. Using `searchParams` does the same for a page, because one URL with different query strings is a different response and a different cache entry. `connection()` opts in explicitly when you want to wait for the request stream.\n\nYou can also force the choice. `export const dynamic = "force-dynamic"` marks a segment dynamic, `export const dynamic = "force-static"` marks it static, and `export const revalidate = 0` is another way to say the same thing as force-dynamic. The point of forcing is to stop the framework from guessing: a single accidental read of `cookies()` inside a shared layout makes every page below it dynamic, which is slow and hard to notice.\n\nThe practical decision is per route, not per project. A marketing page, a documentation page and a product listing have no request-time dependency and should be static. A dashboard, a checkout and an account page depend on the session and must be dynamic. Mixing the two in one project is normal, and the failure mode is a project that is dynamic everywhere because the shared layout reads a cookie.',
        'Статичная генерация означает, что маршрут производится один раз и потом раздаётся из кэша. Динамический рендеринг означает, что маршрут производится на каждый запрос, и стоимость этого производства, запросы и вызовы API, оплачивается каждым визитом. Эти два режима не выбираются настройкой маршрута, а выводятся: маршрут становится динамическим, как только зависит от информации, существующей только в момент запроса.\n\nОбычные виновники — динамические API. Чтение `cookies()` или `headers()` внутри серверного компонента или компоновки помечает сегмент динамическим, и оба они асинхронны в текущих версиях, поэтому их нужно дождаться. Использование `searchParams` делает то же для страницы, потому что один URL с разными query-строками — это разные ответы и разные записи кэша. `connection()` включает ожидание потока запроса явно.\n\nВыбор можно и форсировать. `export const dynamic = "force-dynamic"` помечает сегмент динамическим, `export const dynamic = "force-static"` — статичным, а `export const revalidate = 0` говорит то же самое, что force-dynamic. Смысл форсирования в том, чтобы фреймворк не угадывал: одна случайная попытка прочитать `cookies()` в общей компоновке делает динамическими все страницы под ней, и это медленно и трудно заметить.\n\nПрактическое решение принимается на маршрут, а не на проект. Маркетинговая страница, документация и каталог товаров не зависят от времени запроса и должны быть статичными. Дашборд, оформление заказа и личный кабинет зависят от сессии и должны быть динамическими. Смешивание в одном проекте — норма, а вот полностью динамический проект из-за чтения cookie в общей компоновке — это как раз поломка.'
      ),
      bullets: [
        L('A route becomes dynamic when it reads request-time information.', 'Маршрут становится динамическим, когда читает информацию времени запроса.'),
        L('cookies(), headers(), searchParams and connection() all opt a segment into dynamic rendering.', 'cookies(), headers(), searchParams и connection() переводят сегмент в динамический режим.'),
        L('The dynamic APIs are async and must be awaited.', 'Динамические API асинхронны, их нужно дождаться.'),
        L('force-dynamic and force-static stop the framework from guessing.', 'force-dynamic и force-static не дают фреймворку гадать.'),
        L('One cookie read in a shared layout makes every page below it dynamic.', 'Одно чтение cookie в общей компоновке делает динамическими все страницы под ней.'),
      ],
      code: `// app/layout.tsx
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}

// app/pricing/page.tsx - static, no request-time data
export const dynamic = 'force-static';

export default async function PricingPage() {
  const plans = await db.plan.findMany();
  return <ul>{plans.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
}`,
      table: {
        caption: L('Static and dynamic rendering', 'Статичная генерация и динамический рендеринг'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Static', 'Статичная'),
          L('Dynamic', 'Динамическая'),
        ],
        rows: [
          [
            L('Produced', 'Производится'),
            L('At build time or once', 'При сборке или один раз'),
            L('On every request', 'На каждый запрос'),
          ],
          [
            L('Cost per request', 'Стоимость на запрос'),
            L('A cache read', 'Чтение кэша'),
            L('The full render', 'Полный рендер'),
          ],
          [
            L('Needs request data', 'Нужны данные запроса'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('Reading cookies', 'Чтение cookies'),
            L('Not allowed', 'Недопустимо'),
            L('Allowed', 'Допустимо'),
          ],
          [
            L('Opt in with', 'Включается'),
            L('Nothing, or force-static', 'Ничем или force-static'),
            L('force-dynamic, or a dynamic API', 'force-dynamic или динамическим API'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The shared layout that reads a cookie', 'Общая компоновка, читающая cookie'),
          text: L(
            'One line in the root layout turns every page into a dynamic route, and the effect is invisible in the code of the pages themselves. The build output shows which routes became dynamic, and that is where the question should be asked.',
            'Одна строка в корневой компоновке делает динамическим каждый маршрут, и в коде самих страниц это не видно. Вывод сборки показывает, какие маршруты стали динамическими, и там и стоит задавать вопрос.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the session read in the leaf', 'Держите чтение сессии в листе'),
          text: L(
            'Read the session in the account page and in the account layout, not in the root layout. The same protection then applies to the pages that need it and the pages that stay static.',
            'Читайте сессию на странице личного кабинета и в его компоновке, а не в корневой. Та же защита тогда покрывает страницы, которым она нужна, и не трогает те, что остаются статичными.'
          ),
        },
      ],
      takeaway: L(
        'A route is dynamic the moment it reads request-time data, so keep the dynamic reads out of shared layouts.',
        'Маршрут становится динамическим, как только читает данные времени запроса, поэтому не держите такие чтения в общих компоновках.'
      ),
      seeAlso: [
        L('Section 3-2: the full route cache', 'Секция 3-2: кэш полных маршрутов'),
        L('Section 3-5: tags and on-demand revalidation', 'Секция 3-5: теги и инвалидация по требованию'),
        L('Section 1-2: layouts, templates and route groups', 'Секция 1-2: компоновки, шаблоны и группы маршрутов'),
      ],
    },
    {
      id: 'next-ch3-s5',
      title: L('Tags and on-demand revalidation', 'Теги и инвалидация по требованию'),
      body: L(
        'Time-based revalidation answers the question "how stale is acceptable?". On-demand revalidation answers a different one: "invalidate exactly this, right now". It is the mechanism a write path needs, because a user who saves a post expects to see the change on the next request and not sixty seconds later.\n\n`revalidateTag(tag)` marks every cached entry carrying that tag as stale, and `revalidatePath(path)` marks a specific route path. Tags are attached where the data is produced: `next: { tags: ["posts"] }` on a fetch, or `cacheTag("posts")` inside a function marked `use cache`. `revalidatePath` is coarser and works on paths, which is the right tool when one route is affected and tagging would be overhead.\n\nThe two calls behave differently in a way that matters. `updateTag` expires the tagged data immediately: the next read waits for fresh data, which is exactly what read-your-own-writes requires after a write. `revalidateTag` with a cache profile marks the data stale and serves the stale copy while the fresh one is fetched in the background, which is better for content that changes rarely and where a small delay is acceptable.\n\nThe most common failure is invalidating a tag that was never attached. If the fetch that produced the data did not carry the tag, the revalidation has nothing to act on, the old data keeps being served and the developer concludes that revalidation does not work. Tags are not inferred from the data, they are written next to the data, and the two places must match exactly, including the case of the string.',
        'Ревалидация по времени отвечает на вопрос «насколько устаревшим может быть ответ?». Инвалидация по требованию отвечает на другой: «сбрось вот это, прямо сейчас». Это механизм, который нужен пути записи: человек, сохранивший пост, ожидает увидеть изменение на следующем запросе, а не через минуту.\n\n`revalidateTag(tag)` помечает устаревшими все записи кэша с этим тегом, а `revalidatePath(path)` — конкретный путь маршрута. Теги вешаются там, где данные создаются: `next: { tags: ["posts"] }` у запроса или `cacheTag("posts")` внутри функции с директивой `use cache`. `revalidatePath` грубее и работает с путями, что правильно, когда затронут один маршрут и тегирование было бы лишней работой.\n\nДва вызова ведут себя по-разному, и это важно. `updateTag` немедленно истекает тегированные данные: следующее чтение ждёт свежих данных, и это ровно то, что требуется автору после записи, чтобы увидеть свой результат. `revalidateTag` с профилем кэша помечает данные устаревшими и раздаёт устаревшую копию, пока свежая грузится в фоне, что лучше для контента, который меняется редко.\n\nСамая частая ошибка — сбросить тег, который никогда не вешали. Если запрос, породивший данные, не нёс тега, инвалидации не на что действовать, старые данные продолжают раздаваться, и разработчик делает вывод, что ревалидация не работает. Теги не выводятся из данных, их пишут рядом с данными, и места должны совпадать точно, вплоть до регистра букв.'
      ),
      bullets: [
        L('revalidateTag targets a label, revalidatePath targets a route path.', 'revalidateTag нацелен на метку, revalidatePath — на путь маршрута.'),
        L('Tags must be attached where the data is produced, not where it is invalidated.', 'Теги вешаются там, где данные создаются, а не там, где сбрасываются.'),
        L('updateTag expires immediately, revalidateTag serves stale while refreshing.', 'updateTag истекает немедленно, revalidateTag раздаёт устаревшее и обновляет.'),
        L('A typo in the tag string silently disables invalidation.', 'Опечатка в строке тега молча отключает инвалидацию.'),
        L('Revalidate after the write, never before it.', 'Сбрасывайте кэш после записи, а не до неё.'),
      ],
      code: `// app/lib/posts.ts - requires cacheComponents: true
import { cacheTag } from 'next/cache';

export async function getPosts() {
  'use cache';
  cacheTag('posts');
  return db.post.findMany();
}

// app/posts/actions.ts
'use server';

import { revalidatePath, updateTag } from 'next/cache';

export async function publishPost(id: string) {
  await db.post.update({ where: { id }, data: { status: 'published' } });

  updateTag('posts'); // the reader sees the change at once
  revalidatePath('/posts/' + id);
}`,
      table: {
        caption: L('Choosing a cache update after a write', 'Выбор обновления кэша после записи'),
        headers: [
          L('Call', 'Вызов'),
          L('Effect', 'Эффект'),
          L('Use when', 'Когда применять'),
        ],
        rows: [
          [
            L('updateTag', 'updateTag'),
            L('Expires the tag immediately', 'Немедленно истекает тег'),
            L('The writer must see their own write', 'Автор должен увидеть свою запись'),
          ],
          [
            L('revalidateTag', 'revalidateTag'),
            L('Serves stale while refreshing', 'Раздаёт устаревшее и обновляет'),
            L('A small delay is acceptable', 'Небольшая задержка допустима'),
          ],
          [
            L('revalidatePath', 'revalidatePath'),
            L('Invalidates a route path', 'Сбрасывает путь маршрута'),
            L('One route is affected', 'Затронут один маршрут'),
          ],
          [
            L('refresh', 'refresh'),
            L('Refetches the RSC payload', 'Перезапрашивает RSC-полезную нагрузку'),
            L('The change is outside the cache', 'Изменение вне кэша'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Revalidating a tag that was never attached', 'Сброс тега, который никогда не вешали'),
          text: L(
            'The invalidation call looks correct, the data still updates in the database, and the page keeps showing the old value. The cause is almost always a mismatch between the string in the tag option and the string in the revalidation call.',
            'Вызов инвалидации выглядит правильным, данные в базе обновляются, а страница продолжает показывать старое значение. Причина почти всегда в расхождении строки в опции тега и строки в вызове сброса.'
          ),
        },
        {
          tone: 'warning',
          title: L('Never invalidate before the write commits', 'Никогда не сбрасывайте до фиксации записи'),
          text: L(
            'A tag that expires before the data has changed simply gets repopulated with the old value, and the invalidation is lost. The order is write, then invalidate, and if a redirect follows it must come last.',
            'Тег, истёкший до того, как данные изменились, просто наполняется старым значением, и инвалидация теряется. Порядок такой: запись, потом сброс, а редирект, если он есть, в конце.'
          ),
        },
      ],
      takeaway: L(
        'Tags are written where the data is produced and read where it is invalidated, and both strings must match.',
        'Теги пишутся там, где данные создаются, и читаются там, где сбрасываются, и строки должны совпадать.'
      ),
      seeAlso: [
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
        L('Section 4-4: revalidation after a mutation', 'Секция 4-4: ревалидация после мутации'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
    {
      id: 'next-ch3-s6',
      title: L('Cache components and the new model', 'Cache components и новая модель'),
      body: L(
        'Until now caching was a property of the route: the route was static or dynamic, and the whole segment shared one `revalidate` value. Cache Components, which shipped in Next.js 16 and is enabled with `cacheComponents: true`, moves the decision down to the unit. A function, a component or a page marked with `use cache` caches its own output, and everything around it stays dynamic.\n\nThe vocabulary follows. `cacheLife` sets how long an entry stays fresh, using a named profile such as `hours` or a custom object with `stale`, `revalidate` and `expire`. `cacheTag` attaches an invalidation label to the entry. `updateTag` expires it immediately. The output of a cached function is serialized into an RSC payload and stored by a cache handler, in memory by default, which means the cache lives inside a single deployment unless a shared handler is configured.\n\nThis makes the mixed page normal. A page can show static marketing copy, a cached list of posts that refreshes every hour, and a live widget that reads the current session, all in one document. The static parts are pre-rendered into the shell, the cached parts are filled from the cache, and the live parts stream in behind a Suspense boundary.\n\nThe shift is a trade-off, and it should be named. With nothing cached by default, the developer has to say what is cacheable, which is more typing and more thinking. What it buys is precise control: a page can be half static and half live without the whole segment falling back to dynamic rendering, and the cache lifetime lives next to the data it describes instead of in a route-wide export that is easy to forget.',
        'До сих пор кэширование было свойством маршрута: маршрут был статичным или динамическим, и весь сегмент делил одно значение `revalidate`. Cache Components, пришедшие в Next.js 16 и включаемые флагом `cacheComponents: true`, опускают решение на уровень единицы. Функция, компонент или страница с директивой `use cache` кэширует собственный вывод, а всё вокруг остаётся динамическим.\n\nСловарь следует за этим. `cacheLife` задаёт, сколько запись остаётся свежей, через именованный профиль вроде `hours` или через свой объект с полями `stale`, `revalidate` и `expire`. `cacheTag` вешает на запись метку инвалидации. `updateTag` истекает её немедленно. Вывод кэшированной функции сериализуется в RSC-полезную нагрузку и хранится обработчиком кэша, по умолчанию в памяти, то есть кэш живёт внутри одного деплоя, пока не настроен общий обработчик.\n\nТак смешанная страница становится обычным делом. Страница может показывать статичный рекламный текст, кэшированный список постов, обновляемый каждый час, и живой виджет, читающий текущую сессию, всё в одном документе. Статичные части пререндерятся в оболочку, кэшированные наполняются из кэша, а живые приходят стримом за границей Suspense.\n\nСдвиг — это размен, и его надо назвать. Когда по умолчанию не кэшируется ничего, разработчик обязан сказать, что кэшируется, и это больше букв и больше размышлений. Покупает он точность: страница может быть наполовину статичной и наполовину живой, не проваливаясь целиком в динамический рендер, а время жизни кэша живёт рядом с описываемыми данными, а не в маршрутном экспорте, который легко забыть.'
      ),
      bullets: [
        L('Cache Components moves caching from the route to the individual function or component.', 'Cache Components переносит кэширование с маршрута на отдельную функцию или компонент.'),
        L('use cache stores the output of one unit, cacheLife sets its lifetime, cacheTag labels it.', 'use cache хранит вывод одной единицы, cacheLife задаёт время жизни, cacheTag вешает метку.'),
        L('The cached output is serialized into an RSC payload.', 'Кэшированный вывод сериализуется в RSC-полезную нагрузку.'),
        L('A page can mix static copy, cached data and live data.', 'Страница может смешивать статичный текст, кэшированные данные и живые данные.'),
        L('Nothing is cached by default, so the decision has to be written down.', 'По умолчанию не кэшируется ничего, и решение приходится записывать.'),
      ],
      code: `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;

// app/lib/stats.ts
import { cacheLife, cacheTag } from 'next/cache';

export async function getStats() {
  'use cache';
  cacheLife('hours');
  cacheTag('stats');
  return db.stats.aggregate({ _sum: { views: true } });
}`,
      table: {
        caption: L('The two caching models', 'Две модели кэширования'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Previous model', 'Прежняя модель'),
          L('Cache Components', 'Cache Components'),
        ],
        rows: [
          [
            L('Cache lives on', 'Кэш живёт на'),
            L('The route', 'Маршруте'),
            L('The function or component', 'Функции или компоненте'),
          ],
          [
            L('Opt in with', 'Включается'),
            L('Nothing, or a segment config', 'Ничем или конфигом сегмента'),
            L('use cache', 'use cache'),
          ],
          [
            L('Lifetime', 'Время жизни'),
            L('export const revalidate', 'export const revalidate'),
            L('cacheLife', 'cacheLife'),
          ],
          [
            L('Invalidation', 'Инвалидация'),
            L('revalidatePath, revalidateTag', 'revalidatePath, revalidateTag'),
            L('The same, plus updateTag', 'То же, плюс updateTag'),
          ],
          [
            L('Default', 'По умолчанию'),
            L('Static where possible', 'Статично, где возможно'),
            L('Nothing cached unless declared', 'Ничего не кэшируется без объявления'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Cache Components is opt-in', 'Cache Components включается явно'),
          text: L(
            'The feature lives behind the cacheComponents flag in next.config.ts. A project that does not enable it keeps the previous model, where the route is the unit of caching and fetch options decide everything.',
            'Возможность живёт за флагом cacheComponents в next.config.ts. Проект, который его не включает, остаётся на прежней модели, где единицей кэширования выступает маршрут, а всё решают опции fetch.'
          ),
        },
        {
          tone: 'tip',
          title: L('Pair every use cache scope with a cacheLife', 'Пишите cacheLife рядом с каждым use cache'),
          text: L(
            'Without an explicit lifetime the default profile applies, and in nested cached scopes that default becomes hard to reason about. Writing the lifetime at the call site makes the behaviour of the data visible where the data is.',
            'Без явного времени жизни применяется профиль по умолчанию, и во вложенных кэшированных областях этот умолчательный уже не разобрать. Запись времени жизни на месте вызова делает поведение данных видимым там же, где и данные.'
          ),
        },
      ],
      takeaway: L(
        'Caching is declared where the data lives, not where the route happens to be.',
        'Кэширование объявляется рядом с данными, а не там, где оказался маршрут.'
      ),
      seeAlso: [
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
        L('Section 3-5: tags and on-demand revalidation', 'Секция 3-5: теги и инвалидация по требованию'),
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
      ],
    },
  ],
};
