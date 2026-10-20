import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh08: Chapter = {
  id: 'next-ch8',
  title: L('Production concerns', 'Продакшен-аспекты'),
  summary: L(
    'Configuration, deployment, caching headers, observability and bundle size, the five places where a working application turns into a production system.',
    'Конфигурация, развёртывание, заголовки кэша, наблюдаемость и размер бандла — пять мест, где работающее приложение превращается в продакшен-систему.'
  ),
  sections: [
    {
      id: 'next-ch8-s1',
      title: L('Environment variables', 'Переменные окружения'),
      body: L(
        'An application that behaves differently in production needs configuration that differs too, and Next.js gives the configuration two channels. A variable whose name starts with `NEXT_PUBLIC_` is inlined into the client bundle during the build, so any code in the browser can read it. Every other variable stays on the server, and reading it from a client component yields undefined instead of the value. The prefix is a promise about visibility, and a secret carrying that prefix is published.\n\nThe inlining is a build time substitution, not a runtime lookup, and that has two consequences. The value that reaches the browser is the one that was set when the bundle was built, so changing the variable in the hosting panel does nothing until the next deployment, and the string appears verbatim in the JavaScript, where anyone can read it. A dynamic lookup such as `process.env[key]` does not work in the client bundle at all, because the compiler can only substitute a literal property access.\n\nThe files follow a simple precedence. `.env` holds the defaults, `.env.local` overrides them for local work and is not committed, `.env.production` and `.env.development` apply per environment, and `.env.test` is used by the test runner. Values already present in the environment win over the files, which is what lets a container or a hosting platform override a committed default without touching the repository.',
        'Приложению, которое ведёт себя в продакшене иначе, нужна и конфигурация, которая отличается, а Next.js даёт конфигурации два канала. Переменная, имя которой начинается с `NEXT_PUBLIC_`, встраивается в клиентский бандл во время сборки, поэтому её может прочитать любой код в браузере. Любая другая переменная остаётся на сервере, и чтение её из клиентского компонента даёт undefined вместо значения. Префикс — обещание о видимости, и секрет с таким префиксом публикуется.\n\nВстраивание — это подстановка на этапе сборки, а не обращение во время выполнения, и отсюда два следствия. В браузер попадает то значение, которое было задано в момент сборки бандла, поэтому изменение переменной в панели хостинга ничего не даёт до следующего деплоя, а сама строка лежит в JavaScript дословно, где её прочитает кто угодно. Динамическое обращение вида `process.env[key]` в клиентском бандле не работает вовсе, потому что компилятор умеет подставлять только обращение к литеральному свойству.\n\nФайлы подчиняются простому порядку. `.env` хранит умолчания, `.env.local` перекрывает их для локальной работы и не коммитится, `.env.production` и `.env.development` действуют в зависимости от окружения, а `.env.test` использует тестовый раннер. Значения, уже присутствующие в окружении, побеждают файлы, и именно так контейнер или хостинг перекрывает закоммиченное умолчание, не трогая репозиторий.'
      ),
      bullets: [
        L('A NEXT_PUBLIC_ variable is inlined into the client bundle at build time and is readable by anyone.', 'Переменная NEXT_PUBLIC_ встраивается в клиентский бандл во время сборки и доступна всем.'),
        L('Every other variable stays on the server and evaluates to undefined in a client component.', 'Любая другая переменная остаётся на сервере и даёт undefined в клиентском компоненте.'),
        L('A dynamic lookup such as process.env[key] does not work in the browser.', 'Динамическое обращение вида process.env[key] в браузере не работает.'),
        L('Environment variables from the platform override the ones written in the .env files.', 'Переменные окружения платформы перекрывают значения из файлов .env.'),
      ],
      code: `// lib/db.ts - server only
import 'server-only';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, values: unknown[]) => pool.query(text, values);

// app/page.tsx - a public value, inlined into the client bundle at build time
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;`,
      table: {
        caption: L('Where a variable lives', 'Где живёт переменная'),
        headers: [
          L('Name', 'Имя'),
          L('Visible in the browser', 'Видна в браузере'),
          L('Read', 'Читается'),
        ],
        rows: [
          [L('NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_SITE_URL'), L('Yes', 'Да'), L('At build time', 'Во время сборки')],
          [L('DATABASE_URL', 'DATABASE_URL'), L('No', 'Нет'), L('At runtime on the server', 'Во время выполнения на сервере')],
          [L('STRIPE_SECRET_KEY', 'STRIPE_SECRET_KEY'), L('No', 'Нет'), L('At runtime on the server', 'Во время выполнения на сервере')],
          [L('NEXT_PUBLIC_ANALYTICS_ID', 'NEXT_PUBLIC_ANALYTICS_ID'), L('Yes', 'Да'), L('At build time', 'Во время сборки')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A secret with the public prefix is published', 'Секрет с публичным префиксом публикуется'),
          text: L(
            'The prefix does not encrypt anything, it only makes the value readable by the browser. A database password named NEXT_PUBLIC_DB_PASSWORD is in the JavaScript of every page, and no deployment setting takes it back out of the files that are already in circulation.',
            'Префикс ничего не шифрует, он лишь делает значение читаемым браузером. Пароль базы с именем NEXT_PUBLIC_DB_PASSWORD лежит в JavaScript каждой страницы, и никакая настройка развёртывания не уберёт его из файлов, которые уже разошлись.'
          ),
        },
        {
          tone: 'warning',
          title: L('Changing a public value needs a rebuild', 'Изменение публичного значения требует пересборки'),
          text: L(
            'A public variable is a constant in the bundle. Setting it in the hosting panel changes the server behaviour at once, but the browser keeps the old string until the next build, and the two versions of the application then disagree about the same value.',
            'Публичная переменная — константа в бандле. Её изменение в панели хостинга сразу меняет поведение сервера, но браузер сохраняет старую строку до следующей сборки, и две версии приложения начинают расходиться в одном значении.'
          ),
        },
      ],
      takeaway: L(
        'The NEXT_PUBLIC_ prefix publishes the value to the browser, and public values are frozen at build time.',
        'Префикс NEXT_PUBLIC_ публикует значение браузеру, а публичные значения фиксируются на этапе сборки.'
      ),
      seeAlso: [
        L('Section 2-1: the server component model', 'Секция 2-1: модель серверных компонентов'),
        L('Section 9-1: server-side data access', 'Секция 9-1: доступ к данным на сервере'),
        L('Section 8-2: deployment targets and adapters', 'Секция 8-2: цели развёртывания и адаптеры'),
      ],
    },
    {
      id: 'next-ch8-s2',
      title: L('Deployment targets and adapters', 'Цели развёртывания и адаптеры'),
      body: L(
        'A Next.js application is not one artifact but three: the JavaScript bundles, the static files and the images the optimizer produced, and a server that runs the dynamic parts. The build writes them into the output directory, and the deployment decides how they are served. `next start` runs the Node server from that directory, `output: \'standalone\'` produces a smaller server with only the files it needs, and `output: \'export\'` produces no server at all, just a folder of HTML that any static host can serve.\n\nThe runtime is a per segment decision. `export const runtime = \'edge\'` runs the segment on a lightweight runtime without Node APIs, which starts fast and sits close to the user, and rules out anything that needs the file system, a native module or a database driver. The Node.js runtime is the default and gives the full Node API. `maxDuration` sets how long a serverless function may run before the platform stops it, and that number decides whether a background job finishes or is cut in half.\n\nAdapters exist because the platforms differ. The reference deployment is the Node server, and a container image running it is the portable answer, which is what `output: \'standalone\'` is for. For AWS, the OpenNext adapter turns the build into functions and a CDN distribution, and other platforms have their own build steps. The rule when choosing an adapter is to check what the target does not support, because the features that differ are exactly the features a team relies on without thinking.',
        'Приложение Next.js — это не один артефакт, а три: бандлы JavaScript, статические файлы из папки `public` с картинками оптимизатора и сервер, выполняющий динамическую часть. Сборка складывает их в выходной каталог, а развёртывание решает, как они будут отдаваться. `next start` запускает Node-сервер из этого каталога, `output: \'standalone\'` создаёт меньший сервер только с нужными файлами и зависимостями, а `output: \'export\'` не создаёт сервера вовсе — только папку с HTML, которую отдаст любой статический хостинг.\n\nСреда выполнения выбирается на уровне сегмента. `export const runtime = \'edge\'` выполняет сегмент в лёгкой среде без Node API: она стартует быстро и находится рядом с пользователем, но исключает всё, что требует файловой системы, нативного модуля или драйвера базы данных. Среда Node.js стоит по умолчанию и даёт полный Node API. `maxDuration` задаёт, сколько серверная функция может работать до остановки платформой, и именно это число отличает фоновую задачу, которая завершится, от задачи, которую срежут пополам.\n\nАдаптеры существуют, потому что платформы разные. Эталонное развёртывание — Node-сервер, и переносимый ответ — контейнерный образ, запускающий его; именно для этого и нужен `output: \'standalone\'`. Для AWS адаптер OpenNext превращает сборку в функции и CDN-дистрибуцию, а у других платформ свои шаги сборки. Правило выбора адаптера — проверять, чего целевая платформа не поддерживает, потому что отличаются как раз те возможности, на которые команда опирается не задумываясь.'
      ),
      bullets: [
        L('output: standalone builds a minimal Node server, output: export builds no server at all.', 'output: standalone собирает минимальный Node-сервер, output: export — вообще без сервера.'),
        L('The runtime is chosen per segment, and the edge runtime has no Node APIs.', 'Среда выполнения выбирается по сегментам, а у edge-среды нет Node API.'),
        L('maxDuration is the timeout the platform applies to a serverless function.', 'maxDuration — это таймаут, который платформа применяет к серверной функции.'),
        L('Build time values and writes to the local file system do not survive a serverless instance.', 'Значения времени сборки и записи в локальную файловую систему не переживают серверный инстанс.'),
      ],
      code: `// app/api/report/route.ts
export const runtime = 'nodejs';   // edge has no Node APIs
export const maxDuration = 30;      // seconds the platform allows

export async function GET() {
  const report = await buildHeavyReport();
  return Response.json({ report }, { status: 200 });
}

// next.config.ts
const nextConfig = { output: 'standalone' };

export default nextConfig;`,
      table: {
        caption: L('Deployment options and what each one costs', 'Варианты развёртывания и цена каждого'),
        headers: [
          L('Option', 'Вариант'),
          L('What you get', 'Что получаете'),
          L('What you lose', 'Что теряете'),
        ],
        rows: [
          [L('next start', 'next start'), L('The Node server from the build output', 'Node-сервер из выхода сборки'), L('Nothing, this is the reference', 'Ничего, это эталон')],
          [L('standalone', 'standalone'), L('A small image with only the needed files', 'Малый образ только с нужными файлами'), L('The output folder must travel with it', 'Выходной каталог должен ехать вместе с ним')],
          [L('export', 'export'), L('A folder of static files', 'Папка со статическими файлами'), L('Regeneration, dynamic rendering, server actions', 'Регенерация, динамический рендеринг, серверные действия')],
          [L('Edge runtime', 'Edge-среда'), L('A fast start close to the user', 'Быстрый старт рядом с пользователем'), L('Node APIs and long running tasks', 'Node API и долгие задачи')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A static export removes the server and everything on it', 'Статичная сборка убирает сервер и всё, что на нём'),
          text: L(
            'With output: export there is nothing to run a regeneration, nothing to answer a request-time read and nowhere to execute a server action. A project that relied on those features can be exported, but only after each of them has been replaced by something static.',
            'С output: export некому выполнять регенерацию, некому отвечать на чтение времени запроса и негде исполнить серверное действие. Проект с такими возможностями можно экспортировать, но только после замены каждой из них чем-то статичным.'
          ),
        },
        {
          tone: 'note',
          title: L('The timeout is part of the design', 'Таймаут — часть проектирования'),
          text: L(
            'maxDuration decides whether a long operation survives on a serverless platform. A report that takes forty seconds needs a worker or a bigger limit, and discovering this during the first request is more expensive than reading the limit when the route was written.',
            'maxDuration решает, переживёт ли долгая операция на серверной платформе. Отчёт на сорок секунд требует воркера или большего лимита, и узнать об этом на первом же запросе дороже, чем прочитать лимит при написании маршрута.'
          ),
        },
      ],
      takeaway: L(
        'Pick the runtime and the output mode per application, then check that the platform supports every feature you actually use.',
        'Выберите среду выполнения и режим вывода для приложения, а затем проверьте, что платформа поддерживает все возможности, которыми вы пользуетесь.'
      ),
      seeAlso: [
        L('Section 8-1: environment variables', 'Секция 8-1: переменные окружения'),
        L('Section 8-3: caching headers and the CDN', 'Секция 8-3: заголовки кэша и CDN'),
        L('Section 6-6: choosing a strategy per route', 'Секция 6-6: выбор стратегии по маршрутам'),
      ],
    },
    {
      id: 'next-ch8-s3',
      title: L('Caching headers and the CDN', 'Заголовки кэша и CDN'),
      body: L(
        'A CDN sits in front of the application and keeps copies of the responses. Whether it may serve a copy to another visitor is decided by the `Cache-Control` header, and the two directives that matter have different audiences. `max-age` tells the browser how long it may reuse the response, `s-maxage` tells a shared cache such as a CDN, and when only `max-age` is present the response can also be stored by intermediate proxies under older heuristics, which is rarely what a team intends.\n\nNext.js writes this header for you in the common cases. A static route gets a long lifetime, a route with a revalidation window gets a policy that allows the CDN to serve the copy for that window and to keep serving it while a fresh version is generated, and a dynamic route gets a private policy so that nothing is shared. These defaults are correct, and a custom header is exactly where they get broken.\n\nTwo directives carry the useful behaviour. `stale-while-revalidate` lets a shared cache keep serving the old copy while it fetches a new one in the background, so nobody waits, and `stale-if-error` keeps the copy alive when the origin fails, which turns a short outage into a delay instead of an error page. A route handler sets them on the response it builds, and a global rule can be added in the `headers` function of the configuration.',
        'CDN стоит перед приложением и хранит копии ответов. Имеет ли право отдать копию другому посетителю, решает заголовок `Cache-Control`, и две важные директивы адресованы разным аудиториям. `max-age` говорит браузеру, сколько он может переиспользовать ответ, `s-maxage` — общему кэшу, то есть CDN, а когда присутствует только `max-age`, ответ может сохранить и промежуточный прокси по старым эвристикам, чего команда почти никогда не хочет.\n\nNext.js пишет этот заголовок за вас в типичных случаях. Статичный маршрут получает долгое время жизни, маршрут с окном ревалидации — политику, которая позволяет CDN отдавать копию в пределах этого окна и продолжать отдавать её, пока готовится свежая версия, а динамический маршрут — приватную политику, чтобы ничего не расходилось. Умолчания корректны, и ломают их именно вручную заданные заголовки.\n\nДве директивы несут полезное поведение. `stale-while-revalidate` позволяет общему кэшу продолжать отдавать старую копию, пока тот в фоне забирает новую, и никто не ждёт, а `stale-if-error` оставляет копию в живых, когда источник падает, превращая короткий сбой в задержку вместо страницы ошибки. Обработчик маршрута задаёт их у собираемого ответа, а глобальное правило добавляется в функции `headers` конфигурации.'
      ),
      bullets: [
        L('max-age is for the browser, s-maxage is for a shared cache, and they mean different things.', 'max-age — для браузера, s-maxage — для общего кэша, и смысл у них разный.'),
        L('A route with a revalidation window gets stale-while-revalidate behaviour at the CDN.', 'Маршрут с окном ревалидации получает поведение stale-while-revalidate на CDN.'),
        L('stale-if-error keeps the cached copy alive while the origin is down.', 'stale-if-error оставляет копию в живых, пока источник не работает.'),
        L('A page that depends on the session must be private, and a header-dependent answer needs Vary.', 'Страница, зависящая от сессии, должна быть приватной, а зависящий от заголовка ответ — объявлять Vary.'),
      ],
      code: `// app/api/catalog/route.ts
export async function GET() {
  const items = await db.item.findMany();

  return Response.json(items, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

// next.config.ts - a global rule for hashed assets
const nextConfig = {
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }],
      },
    ];
  },
};`,
      table: {
        caption: L('Cache directives and the audience they address', 'Директивы кэша и их аудитория'),
        headers: [
          L('Directive', 'Директива'),
          L('Audience', 'Аудитория'),
          L('Effect', 'Эффект'),
        ],
        rows: [
          [L('max-age', 'max-age'), L('The browser', 'Браузер'), L('Reuse the answer for N seconds', 'Переиспользовать ответ N секунд')],
          [L('s-maxage', 's-maxage'), L('A shared cache', 'Общий кэш'), L('Serve the copy for N seconds', 'Отдавать копию N секунд')],
          [L('stale-while-revalidate', 'stale-while-revalidate'), L('A shared cache', 'Общий кэш'), L('Serve the old copy, refresh in the background', 'Отдавать старую копию, обновлять в фоне')],
          [L('stale-if-error', 'stale-if-error'), L('A shared cache', 'Общий кэш'), L('Serve the old copy if the origin fails', 'Отдавать старую копию при сбое источника')],
          [L('private', 'private'), L('A shared cache', 'Общий кэш'), L('Never store the answer there', 'Никогда не хранить ответ там')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A shared cache serving a personal page', 'Общий кэш отдаёт персональную страницу'),
          text: L(
            'A page built from the session cookie and answered with a public policy is stored once and then handed to every visitor with the wrong name in it. The header that prevents this is private or no-store, and the mistake is invisible in development, where there is no shared cache.',
            'Страница, собранная из cookie сессии и отданная с публичной политикой, сохраняется один раз и потом раздаётся всем посетителям с чужим именем внутри. Мешает этому заголовок private или no-store, и в разработке ошибка не видна, потому что общего кэша там нет.'
          ),
        },
        {
          tone: 'warning',
          title: L('max-age alone is read by proxies', 'Один max-age читают и прокси'),
          text: L(
            'Without s-maxage the answer may be stored by intermediate caches under the older heuristics of the HTTP specification, with a lifetime you did not choose. When a route must be cached by the browser but never by a shared cache, say private explicitly.',
            'Без s-maxage ответ может сохранить промежуточные кэши по старым эвристикам спецификации HTTP, с временем жизни, которое вы не выбирали. Когда маршрут должен кэшироваться браузером, но никогда общим кэшем, скажите private явно.'
          ),
        },
      ],
      takeaway: L(
        'Decide who may cache the response, name that in Cache-Control, and never let a personalised page reach a shared cache.',
        'Решите, кому разрешено кэшировать ответ, отразите это в Cache-Control и никогда не пускайте персональную страницу в общий кэш.'
      ),
      seeAlso: [
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
        L('Section 6-3: incremental static regeneration', 'Секция 6-3: инкрементальная статическая регенерация'),
        L('Section 9-2: route handlers as an API', 'Секция 9-2: обработчики маршрута как API'),
      ],
    },
    {
      id: 'next-ch8-s4',
      title: L('Observability and error reporting', 'Наблюдаемость и отчёты об ошибках'),
      body: L(
        'A production application fails in ways a development machine never shows, and the difference between a five minute incident and a five hour one is usually whether the error reached somewhere a human reads. Next.js offers two hooks for that. `instrumentation.ts` runs once when the server starts, which is where a tracing or reporting library is initialised, and `onRequestError` in the same file receives every server-side error together with the request that caused it, the route and the digest.\n\nThe client has its own file, `instrumentation-client.ts`, which is bundled into the browser and can report errors and performance data from there. Together with the `useReportWebVitals` hook from `next/web-vitals`, which reports the layout shift, the interaction latency and the paint timings of the real user, they give the two halves of the picture: what the server did and what the browser experienced. A deployment that logs only to the platform console is invisible to a team that does not sit in that console.\n\nThe digest is the join between the two halves. In production the message of a server error is replaced with a generic one, because the real message may contain a query, a path or a secret, and the framework returns a digest instead. The digest appears in the browser, where the error boundary can show it, and in the server log, where the real stack trace is written, so the two can be matched without shipping internals to the client.',
        'Продакшен-приложение падает так, как машина разработчика никогда не падает, и разница между пятиминутным и пятичасовым инцидентом обычно в том, дошло ли сообщение об ошибке туда, где его читает человек. Next.js даёт для этого два хука. `instrumentation.ts` выполняется один раз при старте сервера, и там инициализируется библиотека трассировки или отчётов, а `onRequestError` в том же файле получает каждую серверную ошибку вместе с запросом, который её вызвал, маршрутом и digest.\n\nУ клиента есть свой файл, `instrumentation-client.ts`, который попадает в бандл браузера и позволяет отправлять отчёты об ошибках и данные о производительности оттуда. Вместе с хуком `useReportWebVitals` из `next/web-vitals`, который сообщает о сдвиге макета, задержке реакции на действие и времени отрисовки реального пользователя, они дают обе половины картины: что делал сервер и что пережил браузер. Развёртывание, пишущее только в консоль платформы, невидимо команде, которая в этой консоли не сидит.\n\nDigest — это ключ, соединяющий две половины. В продакшене сообщение серверной ошибки заменяется общим, потому что настоящее может содержать запрос, путь или секрет, и фреймворк возвращает вместо него digest. Digest появляется в браузере, где его может показать граница ошибок, и в серверном логе, где пишется настоящий стек-трейс, поэтому их можно сопоставить, не отправляя внутренности клиенту.'
      ),
      bullets: [
        L('instrumentation.ts runs at server start and hosts the onRequestError hook.', 'instrumentation.ts выполняется при старте сервера и содержит хук onRequestError.'),
        L('instrumentation-client.ts reports from the browser, useReportWebVitals reports the real user timings.', 'instrumentation-client.ts отчитывается из браузера, useReportWebVitals — о таймингах реального пользователя.'),
        L('The digest joins the redacted client error with the full server stack trace.', 'Digest соединяет обезличенную клиентскую ошибку с полным серверным стек-трейсом.'),
        L('Log the route and the status, and decide explicitly what must never be logged.', 'Логируйте маршрут и статус и явно решите, что не должно попадать в лог.'),
      ],
      code: `// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { init } = await import('./monitoring');
    init();
  }
}

export async function onRequestError(
  error: unknown,
  request: Request,
  context: { routerKind: string; routePath: string; routeType: string },
) {
  await reportError(error, {
    path: context.routePath,
    url: request.url,
    kind: context.routerKind,
  });
}`,
      table: {
        caption: L('Where to look when something breaks', 'Куда смотреть, когда что-то сломалось'),
        headers: [
          L('Symptom', 'Симптом'),
          L('Where it shows', 'Где видно'),
          L('Tool', 'Инструмент'),
        ],
        rows: [
          [L('A server error', 'Серверная ошибка'), L('The server log', 'Серверный лог'), L('onRequestError', 'onRequestError')],
          [L('A client error', 'Клиентская ошибка'), L('The browser console', 'Консоль браузера'), L('error.tsx boundary', 'Граница error.tsx')],
          [L('A slow interaction', 'Медленная реакция'), L('The real user metrics', 'Метрики реального пользователя'), L('useReportWebVitals', 'useReportWebVitals')],
          [L('A layout shift', 'Сдвиг макета'), L('The real user metrics', 'Метрики реального пользователя'), L('useReportWebVitals', 'useReportWebVitals')],
          [L('A slow route', 'Медленный маршрут'), L('A trace', 'Трасса'), L('OpenTelemetry', 'OpenTelemetry')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The digest is the join key', 'Digest — ключ соединения'),
          text: L(
            'Without the digest the browser and the server log cannot be matched, and every report is read twice by hand. Send the digest to the user interface, keep the stack trace on the server and correlate them in the reporting tool.',
            'Без digest браузер и серверный лог невозможно сопоставить, и каждый отчёт читают дважды вручную. Отправляйте digest в интерфейс, храните стек-трейс на сервере и связывайте их в инструменте отчётов.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Logs are data too', 'Логи — это тоже данные'),
          text: L(
            'Request bodies, session tokens and personal details end up in the log store, which is usually replicated to the widest audience and the shortest retention of anything you own. Deciding what may be written to the log is a privacy decision, not a formatting decision.',
            'Тела запросов, токены сессий и личные данные попадают в хранилище логов, которое обычно реплицируется шире всех и хранится меньше всех остальных ваших данных. Решение о том, что можно писать в лог, — это решение о приватности, а не о форматировании.'
          ),
        },
      ],
      takeaway: L(
        'Wire the reporting hooks in the first week, log the digest and the route together, and treat the log store as production data.',
        'Подключите хуки отчётов на первой неделе, логируйте digest и маршрут вместе и относитесь к хранилищу логов как к продакшен-данным.'
      ),
      seeAlso: [
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
        L('Section 8-2: deployment targets and adapters', 'Секция 8-2: цели развёртывания и адаптеры'),
        L('Section 9-4: background jobs and webhooks', 'Секция 9-4: фоновые задачи и вебхуки'),
      ],
    },
    {
      id: 'next-ch8-s5',
      title: L('Bundle size and the client boundary', 'Размер бандла и клиентская граница'),
      body: L(
        'The build prints the size of every route, and the number that matters is the first load: the JavaScript a browser must download and execute before the page becomes interactive. It is a sum of the framework, the shared chunks and the code of every client component in the tree. A page made entirely of server components ships almost nothing, because its output is HTML, and every byte of JavaScript is work the phone has to do before it can answer a tap.\n\nThe client boundary is where that work comes from. The directive `use client` marks a subtree as browser code, and everything that subtree imports joins the client bundle, whether or not the imported module is used on the screen. A charting library imported in a file that also defines a small button is a charting library in the bundle of every page that renders the button. The directive belongs on the leaf that needs interactivity, and the code around it should stay on the server.\n\nThe way to keep a server component inside a client component is to pass it as children. The server renders the expensive subtree, the client component receives it as a prop and puts it where it belongs, and the client bundle contains only the interactive part. The reverse direction is impossible, a server component cannot be imported by a client component, and the compiler says so at build time, which is why the `server-only` package is worth adding to any module that holds a secret or a database connection.',
        'Сборка печатает размер каждого маршрута, и важное число здесь — первая загрузка: тот JavaScript, который браузер должен скачать и выполнить, прежде чем страница станет интерактивной. Это сумма фреймворка, общих чанков и кода всех клиентских компонентов в дереве. Страница, собранная целиком из серверных компонентов, отдаёт почти ничего, потому что её вывод — HTML, а каждый байт JavaScript это работа, которую телефон обязан сделать до того, как ответит на нажатие.\n\nКлиентская граница — источник этой работы. Директива `use client` помечает поддерево как код браузера, и всё, что это поддерево импортирует, попадает в клиентский бандл, независимо от того, используется ли импортированный модуль на экране. Библиотека графиков, импортированная в файле, где определена ещё и маленькая кнопка, становится библиотекой графиков в бандле каждой страницы с этой кнопкой. Директива принадлежит листу, которому нужна интерактивность, а код вокруг него должен остаться на сервере.\n\nСпособ оставить серверный компонент внутри клиентского — передать его как children. Сервер рендерит дорогое поддерево, клиентский компонент получает его пропом и ставит на место, а в клиентском бандле остаётся только интерактивная часть. Обратное направление невозможно: серверный компонент нельзя импортировать из клиентского, и компилятор говорит об этом во время сборки — именно поэтому пакет `server-only` стоит добавить любому модулю с секретом или подключением к базе.'
      ),
      bullets: [
        L('The first load number in the build output is the JavaScript a visitor must run first.', 'Число первой загрузки в выводе сборки — это JavaScript, который посетитель обязан выполнить первым.'),
        L('use client pulls the whole import subtree into the browser bundle.', 'use client утягивает в браузерный бандл всё поддерево импортов.'),
        L('Passing server-rendered children into a client component keeps the heavy part on the server.', 'Передача серверных потомков в клиентский компонент оставляет тяжёлое на сервере.'),
        L('next/dynamic and optimizePackageImports shrink the graph once the boundary is right.', 'next/dynamic и optimizePackageImports уменьшают граф, когда граница уже на своём месте.'),
      ],
      code: `// app/dashboard/panel.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Chart = dynamic(() => import('./chart'));

export function Panel({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((value) => !value)}>Toggle</button>
      {open ? <Chart /> : null}
      {children}
    </div>
  );
}`,
      table: {
        caption: L('What ends up in the client bundle', 'Что попадает в клиентский бандл'),
        headers: [
          L('Source', 'Источник'),
          L('In the bundle', 'В бандле'),
          L('Repair', 'Что делать'),
        ],
        rows: [
          [L('A file with use client', 'Файл с use client'), L('Yes, with its imports', 'Да, вместе с импортами'), L('Move the directive deeper', 'Перенести директиву глубже')],
          [L('A library imported by a client component', 'Библиотека из клиентского компонента'), L('Yes', 'Да'), L('Import it inside a dynamically loaded module', 'Импортировать в динамически загружаемом модуле')],
          [L('A server component', 'Серверный компонент'), L('No', 'Нет'), L('Nothing to do', 'Ничего')],
          [L('A function passed as a prop', 'Функция, переданная пропом'), L('Rejected at build time', 'Отклоняется при сборке'), L('Use a server action', 'Использовать серверное действие')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The import subtree, not the used exports', 'Поддерево импортов, а не используемые экспорты'),
          text: L(
            'The client bundle is built from the import graph of the client files, not from the code paths that actually execute. A helper imported for one rarely used branch is shipped to every visitor of every page that includes the file.',
            'Клиентский бандл собирается из графа импортов клиентских файлов, а не из тех веток кода, которые действительно выполняются. Вспомогательная функция, импортированная ради одной редкой ветки, уезжает каждому посетителю каждой страницы с этим файлом.'
          ),
        },
        {
          tone: 'tip',
          title: L('Compare the first load number before and after', 'Сравнивайте число первой загрузки до и после'),
          text: L(
            'The build prints the first load size for every route, so a change in the client boundary is visible as a number rather than an opinion. Record it for the heaviest pages and check it in review.',
            'Сборка печатает размер первой загрузки для каждого маршрута, поэтому изменение клиентской границы видно как число, а не как мнение. Запишите его для самых тяжёлых страниц и проверяйте на ревью.'
          ),
        },
      ],
      takeaway: L(
        'The client boundary decides the bundle, so put it on the smallest interactive leaf and pass server-rendered content through it.',
        'Клиентская граница определяет бандл, поэтому ставьте её на самый маленький интерактивный лист и пропускайте через неё серверный контент.'
      ),
      seeAlso: [
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
        L('Section 2-6: common use client mistakes', 'Секция 2-6: типичные ошибки с use client'),
        L('Section 7-3: next/image and the loader', 'Секция 7-3: next/image и загрузчик'),
      ],
    },
  ],
};
