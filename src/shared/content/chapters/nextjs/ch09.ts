import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh09: Chapter = {
  id: 'next-ch9',
  title: L('Data layer patterns', 'Паттерны слоя данных'),
  summary: L(
    'How to reach the database from the server, when a route handler becomes a public API, what typed clients buy, and how to keep slow work out of the request.',
    'Как обращаться к базе с сервера, когда обработчик маршрута становится публичным API, что дают типизированные клиенты и как убрать медленную работу из запроса.'
  ),
  sections: [
    {
      id: 'next-ch9-s1',
      title: L('Server-side data access', 'Доступ к данным на сервере'),
      body: L(
        'The shortest path to the database is a server component that imports the client and queries it. There is no HTTP hop, no serialization of the result and no second place where the shape of the data has to be described. The price is that the query runs while the request is being rendered, so it belongs behind a Suspense boundary when it is slow, and its result is not shared between visitors unless it is cached.\n\nThe connection itself needs care. A serverless instance handles many requests over its life, and each of them may open a connection, so a client created per request exhausts the pool of the database. The standard solution is a singleton held on `globalThis`, which survives the hot reload of a development server and gives one pool per instance. Pooling itself comes from the driver, and the connection string in the environment decides how many connections an instance may open.\n\nThe module that opens the connection should import `server-only`. The package turns any attempt to include it in a client bundle into a build error, which is a cheap way to guarantee that a database password never reaches the browser. The same applies to a module that reads a secret, and the check is worth adding to every module that talks to a third party with a key.',
        'Самый короткий путь к базе — это серверный компонент, который импортирует клиента и делает запрос. Никаких HTTP-переходов, никакой сериализации результата и никакого второго места, где пришлось бы описывать форму данных. Цена в том, что запрос выполняется во время рендера запроса пользователя, поэтому медленный запрос должен жить за границей Suspense, а его результат не разделяется между посетителями, пока не закэширован.\n\nС самим подключением нужна осторожность. Серверный инстанс обрабатывает много запросов за свою жизнь, и каждый из них может открыть соединение, поэтому клиент, создаваемый на каждый запрос, исчерпывает пул базы. Стандартное решение — синглтон, хранящийся на `globalThis`: он переживает горячую перезагрузку сервера разработки и даёт один пул на инстанс. Сам пул даёт драйвер, а строка подключения в окружении решает, сколько соединений может открыть инстанс.\n\nМодуль, который открывает подключение, должен импортировать `server-only`. Пакет превращает любую попытку включить его в клиентский бандл в ошибку сборки, и это дешёвый способ гарантировать, что пароль базы никогда не попадёт в браузер. То же относится к модулю, читающему секрет, и такую проверку стоит добавить каждому модулю, который говорит с третьей стороной по ключу.'
      ),
      bullets: [
        L('A server component queries the database directly, with no HTTP hop in between.', 'Серверный компонент обращается к базе напрямую, без HTTP-перехода между.'),
        L('Hold one pooled client per instance so the pool of the database is not exhausted.', 'Держите один пул на инстанс, чтобы не исчерпать пул базы.'),
        L('The server-only import turns an accidental client import into a build error.', 'Импорт server-only превращает случайное попадание в клиентский бандл в ошибку сборки.'),
        L('A query inside a loop is the N plus one problem and scales with the size of the list.', 'Запрос внутри цикла — это проблема N+1, и она растёт вместе с размером списка.'),
      ],
      code: `// lib/db.ts
import 'server-only';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['query'] : [] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;`,
      table: {
        caption: L('Where the data access happens', 'Где происходит доступ к данным'),
        headers: [
          L('Place', 'Место'),
          L('Talks to the database', 'Ходит в базу'),
          L('Reaches the browser', 'Попадает в браузер'),
        ],
        rows: [
          [L('A server component', 'Серверный компонент'), L('Yes', 'Да'), L('No, only as rendered HTML', 'Нет, только как готовый HTML')],
          [L('A route handler', 'Обработчик маршрута'), L('Yes', 'Да'), L('Only what the response contains', 'Только содержимое ответа')],
          [L('A server action', 'Серверное действие'), L('Yes', 'Да'), L('Only the returned value', 'Только возвращённое значение')],
          [L('A client component', 'Клиентский компонент'), L('Never', 'Никогда'), L('The request would leak the credentials', 'Запрос унёс бы учётные данные')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A client per request exhausts the pool', 'Клиент на каждый запрос исчерпывает пул'),
          text: L(
            'On a platform that keeps instances alive, creating a new pool for every request opens connections faster than the database releases them, and the first symptom is a timeout under load that looks like a slow query. One pool per instance removes the problem entirely.',
            'На платформе, где инстансы живут долго, новый пул на каждый запрос открывает соединения быстрее, чем база их освобождает, и первый симптом — таймаут под нагрузкой, который выглядит как медленный запрос. Один пул на инстанс снимает проблему целиком.'
          ),
        },
        {
          tone: 'note',
          title: L('server-only turns a leak into a build error', 'server-only превращает утечку в ошибку сборки'),
          text: L(
            'The package is a one line import with no runtime cost, and it converts the most expensive mistake of this layer, a database client in the browser bundle, from a silent leak into a failure of the build that stops the deployment.',
            'Это импорт в одну строку без затрат во время выполнения, и он превращает самую дорогую ошибку этого слоя — клиент базы в браузерном бандле — из тихой утечки в провал сборки, который останавливает развёртывание.'
          ),
        },
      ],
      takeaway: L(
        'Query the database from the server, hold one pooled client per instance, and mark the module server-only.',
        'Обращайтесь к базе с сервера, держите один пул на инстанс и помечайте модуль как server-only.'
      ),
      seeAlso: [
        L('Section 8-1: environment variables', 'Секция 8-1: переменные окружения'),
        L('Section 2-1: the server component model', 'Секция 2-1: модель серверных компонентов'),
        L('Section 9-5: migrations and schema changes', 'Секция 9-5: миграции и изменения схемы'),
      ],
    },
    {
      id: 'next-ch9-s2',
      title: L('Route handlers as an API', 'Обработчики маршрута как API'),
      body: L(
        'A route handler is an HTTP endpoint inside the same application: `app/api/orders/route.ts` answers `/api/orders`, exports one function per method and works with the standard `Request` and `Response`. It is the right shape for a small public API, for a webhook and for the endpoints a mobile client needs, because the contract is HTTP and it does not depend on the router or on the layout of the pages.\n\nThe limits are worth naming. A route handler has no automatic versioning, no schema, no documentation and no rate limiting; those come from the platform or from code you write. It shares the deployment, the timeout and the instance with the pages, so a handler that runs a heavy query slows the pages down as well. And it is reachable from anywhere on the internet, which means the authorization checks have to be written for it as for any public endpoint, whether or not the interface hides it.\n\nThe handler itself is short and has three parts: read and validate the input, do the work, and answer with a status code that means something. A validation failure is a 400, a missing record is a 404, a missing permission is a 403 and a failed authentication is a 401, and the difference between the last two is what the client should do next. Answering 200 with an error object in the body pushes that decision onto every caller.',
        'Обработчик маршрута — это HTTP-эндпоинт внутри того же приложения: `app/api/orders/route.ts` отвечает на `/api/orders`, экспортирует по функции на метод и работает со стандартными `Request` и `Response`. Это правильная форма для небольшого публичного API, для вебхука и для эндпоинтов, нужных мобильному клиенту, потому что контракт здесь — HTTP, и он не зависит ни от роутера, ни от компоновки страниц.\n\nОграничения стоит назвать. У обработчика маршрута нет автоматической версионизации, схемы, документации и ограничения частоты запросов — всё это приходит от платформы или от написанного вами кода. Он делит развёртывание, таймаут и инстанс со страницами, поэтому тяжёлый запрос в обработчике замедляет и страницы. И он доступен из любой точки интернета, а значит проверки авторизации надо написать для него так же, как для любого публичного эндпоинта, независимо от того, прячет ли его интерфейс.\n\nСам обработчик короткий и состоит из трёх частей: прочитать и проверить входные данные, сделать работу и ответить кодом статуса, который что-то значит. Ошибка валидации — это 400, отсутствующая запись — 404, недостаточное право — 403, а неуспешная аутентификация — 401, и разница между последними двумя говорит клиенту, что делать дальше. Ответ 200 с объектом ошибки в теле перекладывает это решение на каждого вызывающего.'
      ),
      bullets: [
        L('A route handler answers HTTP with a standard Request and a standard Response.', 'Обработчик маршрута отвечает по HTTP стандартными Request и Response.'),
        L('Handlers share the deployment, the timeout and the instance with the pages.', 'Обработчики делят развёртывание, таймаут и инстанс со страницами.'),
        L('Use the status code that matches the failure: 400, 401, 403, 404.', 'Используйте код статуса, соответствующий сбою: 400, 401, 403, 404.'),
        L('Middleware may filter the traffic, but the handler authorizes the request itself.', 'Middleware может фильтровать трафик, но авторизует запрос сам обработчик.'),
      ],
      code: `// app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({ status: z.enum(['paid', 'cancelled']) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const order = await db.order.update({ where: { id }, data: parsed.data });
  return NextResponse.json(order);
}`,
      table: {
        caption: L('The status code that matches the failure', 'Код статуса, соответствующий сбою'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Code', 'Код'),
          L('What the client does', 'Что делает клиент'),
        ],
        rows: [
          [L('The input is invalid', 'Входные данные неверны'), L('400', '400'), L('Fix the request', 'Исправить запрос')],
          [L('No session', 'Нет сессии'), L('401', '401'), L('Ask for authentication', 'Запросить аутентификацию')],
          [L('No permission', 'Нет прав'), L('403', '403'), L('Stop, do not retry', 'Остановиться, не повторять')],
          [L('The record is missing', 'Записи нет'), L('404', '404'), L('Show an empty state', 'Показать пустое состояние')],
          [L('The state conflicts', 'Состояние конфликтует'), L('409', '409'), L('Reload and try again', 'Перезагрузить и повторить')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two hundred with an error in the body', 'Двести с ошибкой в теле'),
          text: L(
            'An answer of 200 whose body says error makes every client invent its own handling, and a monitoring system sees only successes. The status code is the part of the answer that the network, the proxies and the dashboards all understand.',
            'Ответ 200, в теле которого написано error, заставляет каждого клиента придумывать собственную обработку, а система мониторинга видит только успехи. Код статуса — та часть ответа, которую понимают и сеть, и прокси, и дашборды.'
          ),
        },
        {
          tone: 'warning',
          title: L('The handler shares the timeout of the pages', 'Обработчик делит таймаут страниц'),
          text: L(
            'A heavy query inside a handler competes with the pages for the same instance and the same time limit. When the work is genuinely heavy, it belongs in a background job, and the handler should only accept it and return an identifier.',
            'Тяжёлый запрос внутри обработчика конкурирует со страницами за один инстанс и один лимит времени. Когда работа действительно тяжёлая, ей место в фоновой задаче, а обработчик должен только принять её и вернуть идентификатор.'
          ),
        },
      ],
      takeaway: L(
        'A handler is a public API: validate the input, authorize the caller and use the status code that matches the failure.',
        'Обработчик — это публичный API: проверяйте входные данные, авторизуйте вызывающего и ставьте код статуса, соответствующий сбою.'
      ),
      seeAlso: [
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
        L('Section 5-1: what middleware can and cannot do', 'Секция 5-1: что middleware может и чего не может'),
        L('Section 9-4: background jobs and webhooks', 'Секция 9-4: фоновые задачи и вебхуки'),
      ],
    },
    {
      id: 'next-ch9-s3',
      title: L('tRPC and typed APIs', 'tRPC и типизированные API'),
      body: L(
        'An API between the frontend and the backend is only safe while somebody keeps the two sides in sync, and tRPC removes that job. A router declares procedures, each procedure declares its input with a schema, and the client gets a function with the same name and the same argument type. A change to the schema breaks the compilation of the caller instead of the production request, and that is the whole point of the approach.\n\nThe procedures are grouped into routers, and a router is mounted at a route handler: `app/api/trpc/[trpc]/route.ts` calls `fetchRequestHandler` and answers with the transport of the client, usually HTTP batching, so several small calls travel in one request. The context is created per request and carries what every procedure needs, the session, the headers, the database handle. The middleware of tRPC runs before every procedure, and that is where a single authorization rule lives.\n\nInside the server there is a second way to call the same procedures. `createCaller` builds a function that runs them in process, with the context you pass, and it needs no address, no fetch and no serialization. That is the version to use inside a server component, because a self request from the server to its own route handler is the classic way to turn a fast page into a slow one and to lose the request context along the way.',
        'API между фронтендом и бэкендом безопасен, только пока кто-то держит две стороны в синхроне, и tRPC снимает эту работу. Роутер объявляет процедуры, каждая процедура объявляет свой вход через схему, а клиент получает функцию с тем же именем и тем же типом аргумента. Изменение схемы ломает компиляцию вызывающего, а не продакшен-запрос, и в этом весь смысл подхода.\n\nПроцедуры группируются в роутеры, а роутер подключается в обработчике маршрута: `app/api/trpc/[trpc]/route.ts` вызывает `fetchRequestHandler` и отвечает транспортом клиента, обычно с пакетированием запросов, так что несколько мелких вызовов едут одним запросом. Контекст создаётся на каждый запрос и несёт то, что нужно каждой процедуре: сессию, заголовки, подключение к базе. Промежуточный слой tRPC выполняется перед каждой процедурой, и там живёт единое правило авторизации.\n\nВнутри сервера есть второй способ вызвать те же процедуры. `createCaller` собирает функцию, которая выполняет их в процессе, с контекстом, который вы передали, и ей не нужны ни адрес, ни fetch, ни сериализация. Именно этот вариант используется внутри серверного компонента, потому что запрос сервера к собственному обработчику маршрута — классический способ превратить быструю страницу в медленную и потерять по дороге контекст запроса.'
      ),
      bullets: [
        L('A procedure declares its input with a schema, and the client is typed from it.', 'Процедура объявляет вход через схему, и клиент типизируется от неё.'),
        L('The router is mounted at a route handler, and the context carries the request data.', 'Роутер подключается в обработчике маршрута, а контекст несёт данные запроса.'),
        L('The middleware of tRPC runs before every procedure and holds the shared checks.', 'Промежуточный слой tRPC выполняется перед каждой процедурой и хранит общие проверки.'),
        L('createCaller calls the procedures in process, without a network round trip.', 'createCaller вызывает процедуры в процессе, без сетевого оборота.'),
      ],
      code: `// server/routers/order.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.context<{ db: typeof db }>().create();

export const orderRouter = t.router({
  byId: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({ where: { id: input.id } });
      if (!order) throw new TRPCError({ code: 'NOT_FOUND' });
      return order;
    }),
});`,
      table: {
        caption: L('What tRPC gives and what it costs', 'Что даёт tRPC и чего стоит'),
        headers: [
          L('Aspect', 'Аспект'),
          L('tRPC', 'tRPC'),
          L('A plain REST API', 'Обычный REST API'),
        ],
        rows: [
          [L('Type safety', 'Типобезопасность'), L('Checked at compile time', 'Проверяется при компиляции'), L('None', 'Отсутствует')],
          [L('Validation', 'Валидация'), L('Part of the procedure', 'Часть процедуры'), L('Hand written per route', 'Пишется вручную для каждого маршрута')],
          [L('Versioning', 'Версионирование'), L('Routers', 'Роутеры'), L('Paths', 'Пути')],
          [L('Third party access', 'Доступ третьих лиц'), L('Needs an adapter', 'Нужен адаптер'), L('Natural', 'Естественный')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Calling your own API from the server', 'Вызов собственного API с сервера'),
          text: L(
            'A server component that fetches the route handler of the same application makes a network request to itself: it pays for the address, for the serialization and for the loss of the request context, and on a platform with few instances it can deadlock against its own concurrency limit.',
            'Серверный компонент, который делает fetch к обработчику собственного приложения, обращается к самому себе по сети: платит за адрес, за сериализацию и за потерю контекста запроса, а на платформе с малым числом инстансов рискует упереться в собственный лимит параллелизма.'
          ),
        },
        {
          tone: 'tip',
          title: L('Put the shared checks in the middleware', 'Общие проверки — в промежуточный слой'),
          text: L(
            'The middleware of tRPC runs before every procedure and sees the context, so the rule that a procedure must belong to an authenticated user is written once. A procedure that skips it looks ordinary, and the audit is a search for the missing call.',
            'Промежуточный слой tRPC выполняется перед каждой процедурой и видит контекст, поэтому правило «процедура доступна только авторизованному пользователю» пишется один раз. Процедура без него выглядит обычной, а проверка сводится к поиску пропущенного вызова.'
          ),
        },
      ],
      takeaway: L(
        'Use tRPC when the frontend and the backend ship together, and call the procedures in process from the server.',
        'Используйте tRPC, когда фронтенд и бэкенд выходят вместе, и вызывайте процедуры в процессе с сервера.'
      ),
      seeAlso: [
        L('Section 9-2: route handlers as an API', 'Секция 9-2: обработчики маршрута как API'),
        L('Section 9-1: server-side data access', 'Секция 9-1: доступ к данным на сервере'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
    {
      id: 'next-ch9-s4',
      title: L('Background jobs and webhooks', 'Фоновые задачи и вебхуки'),
      body: L(
        'A request has a short life. The browser waits a few seconds, the platform stops the function after its timeout, and the connection is closed. Any work that takes minutes does not belong inside a request, and neither does work that depends on a third party answering slowly. The pattern is to accept the request, record the intent, answer immediately, and process the work somewhere that is allowed to take its time.\n\nInbound webhooks are the sharpest case. The provider sends a POST, often with a retry policy, and the answer must be fast, because a timeout makes the provider send the same event again. The handler therefore does three things: it verifies the signature, it stores the event with an identifier that makes the second delivery harmless, and it queues the work. The signature check is the security boundary, and the comparison has to be constant time, otherwise the comparison itself leaks the secret.\n\nOutbound webhooks need the same care in the other direction. The payload is signed with a shared secret, the delivery is retried with a growing delay, and every attempt is stored with its response, because the question that always arrives later is whether the customer received the event. A queue with a dead letter path is the usual answer to a provider that is down for an hour.',
        'У запроса короткая жизнь. Браузер ждёт несколько секунд, платформа останавливает функцию после её таймаута, соединение закрывается. Любая работа, для которой нужны минуты, не должна жить внутри запроса, и туда же не относится работа, зависящая от медленного ответа третьей стороны. Паттерн такой: принять запрос, зафиксировать намерение, сразу ответить и выполнить работу там, где ей разрешено задерживаться.\n\nВходящие вебхуки — самый острый случай. Провайдер присылает POST, часто с политикой повторов, и ответ должен быть быстрым, потому что таймаут заставит провайдера прислать то же событие снова. Поэтому обработчик делает три вещи: проверяет подпись, сохраняет событие с идентификатором, делающим повторную доставку безвредной, и ставит работу в очередь. Проверка подписи — это граница безопасности, и сравнение должно быть за постоянное время, иначе само сравнение раскрывает секрет.\n\nИсходящим вебхукам нужна та же осторожность, только в другую сторону. Полезная нагрузка подписывается общим секретом, доставка повторяется с растущей задержкой, а каждая попытка сохраняется вместе с ответом, потому что вопрос, который приходит всегда позже, звучит так: получил ли клиент событие. Очередь с путём для мёртвых сообщений — обычный ответ на провайдера, который лежит уже час.'
      ),
      bullets: [
        L('Answer the webhook fast, verify the signature and queue the work.', 'Отвечайте на вебхук быстро, проверяйте подпись и ставьте работу в очередь.'),
        L('Store an idempotency key so a repeated delivery is harmless.', 'Сохраняйте ключ идемпотентности, чтобы повторная доставка была безвредной.'),
        L('Compare the signatures in constant time, a timing difference leaks the secret.', 'Сравнивайте подписи за постоянное время, разница во времени раскрывает секрет.'),
        L('after runs in the same instance and is not durable, a queue is.', 'after выполняется в том же инстансе и не гарантирует сохранность, очередь — гарантирует.'),
      ],
      code: `// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { after } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = (await headers()).get('stripe-signature') ?? '';

  if (!verifySignature(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)) {
    return new Response('invalid signature', { status: 400 });
  }

  const event = JSON.parse(payload);
  await queue.enqueue('process-event', { id: event.id, type: event.type });

  after(() => logDelivery(event.id));
  return Response.json({ received: true });
}`,
      table: {
        caption: L('Where the work runs', 'Где выполняется работа'),
        headers: [
          L('Mechanism', 'Механизм'),
          L('Survives a restart', 'Переживает перезапуск'),
          L('Good for', 'Подходит для'),
        ],
        rows: [
          [L('Inside the handler', 'Внутри обработчика'), L('No', 'Нет'), L('Work under a second', 'Работа меньше секунды')],
          [L('after()', 'after()'), L('No', 'Нет'), L('A short cleanup or a log line', 'Короткая уборка или запись в лог')],
          [L('A queue and a worker', 'Очередь и воркер'), L('Yes', 'Да'), L('Long or important work', 'Долгая или важная работа')],
          [L('A scheduled job', 'Планировщик'), L('Yes', 'Да'), L('Recurring work', 'Повторяющаяся работа')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('after is not a queue', 'after — это не очередь'),
          text: L(
            'The function runs in the instance that served the request, and that instance may be frozen or stopped the moment the response is written. Everything scheduled there is a promise with no guarantee, so it works for a log line and fails silently for a payment.',
            'Функция выполняется в том инстансе, который обслужил запрос, а этот инстанс может быть заморожен или остановлен сразу после записи ответа. Всё, что там запланировано, — обещание без гарантий: для записи в лог оно годится, а для платежа молча пропадает.'
          ),
        },
        {
          tone: 'warning',
          title: L('A slow answer causes a retry storm', 'Медленный ответ вызывает шторм повторов'),
          text: L(
            'Providers retry on timeout, and a handler that does its work before answering turns one slow run into many parallel deliveries of the same event. Answer first, work later, and make the second delivery harmless.',
            'Провайдеры повторяют запросы по таймауту, и обработчик, который делает работу до ответа, превращает один медленный запуск в много параллельных доставок одного события. Сначала ответьте, потом работайте и сделайте повторную доставку безвредной.'
          ),
        },
      ],
      takeaway: L(
        'Acknowledge the webhook fast, make the delivery idempotent and put the real work in a durable queue.',
        'Быстро подтверждайте вебхук, делайте доставку идемпотентной и кладите настоящую работу в надёжную очередь.'
      ),
      seeAlso: [
        L('Section 9-2: route handlers as an API', 'Секция 9-2: обработчики маршрута как API'),
        L('Section 8-4: observability and error reporting', 'Секция 8-4: наблюдаемость и отчёты об ошибках'),
        L('Section 4-2: validation and authorisation', 'Секция 4-2: валидация и авторизация'),
      ],
    },
    {
      id: 'next-ch9-s5',
      title: L('Migrations and schema changes', 'Миграции и изменения схемы'),
      body: L(
        'A migration changes the shape of the data while the old code is still running. That sentence is the whole problem: the deployed code does not know about the migration yet, and the code that knows about the migration is not deployed yet. The solution is to stop changing the schema in one step. The standard sequence is expand, migrate, contract, and each step is safe on its own with the previous version of the code still in place.\n\nExpand adds what the new code needs without removing anything: a new nullable column, a new table, a new index. The old code keeps working because it does not know the column exists, and the new code works because the column can be null. Then the application is deployed and starts writing to the new shape. Only after every instance runs the new code does the contract step begin, where the old column is dropped and the new one becomes required.\n\nThe data has to be moved as well, and the move is a separate program rather than part of the migration. A backfill that touches millions of rows in one statement holds locks for a long time and can take the site down, so it runs in small batches with a pause between them, and it is restartable, because it will be interrupted. The code reads both the old and the new shape while the backfill is running, and that is what makes the intermediate state tolerable.',
        'Миграция меняет форму данных, пока старый код ещё работает. В этом предложении вся проблема: задеплоенный код о миграции ещё не знает, а код, который о ней знает, ещё не задеплоен. Решение — перестать менять схему за один шаг. Стандартная последовательность: расширить, перенести, сузить, и каждый шаг безопасен сам по себе, пока рядом работает предыдущая версия кода.\n\nШаг расширения добавляет то, что нужно новому коду, ничего не убирая: новый nullable-столбец, новую таблицу, новый индекс. Старый код продолжает работать, потому что о столбце не знает, а новый работает, потому что столбец может быть пустым. Затем приложение разворачивается и начинает писать в новую форму. И только когда каждый инстанс работает на новом коде, начинается шаг сужения: старый столбец удаляется, а новый становится обязательным.\n\nДанные тоже нужно перенести, и перенос — это отдельная программа, а не часть миграции. Заливка, которая трогает миллионы строк одним запросом, долго держит блокировки и может уронить сайт, поэтому она идёт маленькими порциями с паузой между ними и её можно перезапустить, потому что её будут прерывать. Пока заливка идёт, код читает и старую, и новую форму, и именно это делает промежуточное состояние терпимым.'
      ),
      bullets: [
        L('Expand, migrate, contract: each step is safe with the previous version of the code.', 'Расширить, перенести, сузить: каждый шаг безопасен с предыдущей версией кода.'),
        L('A new column is added as nullable first, so the old code keeps working.', 'Новый столбец сначала добавляется пустым, чтобы старый код продолжал работать.'),
        L('A backfill runs in small batches, is restartable and reads both shapes at once.', 'Заливка идёт маленькими порциями, её можно перезапустить, и она читает обе формы сразу.'),
        L('Migrations run as a separate step of the pipeline, never at application start.', 'Миграции выполняются отдельным шагом пайплайна, а не при старте приложения.'),
      ],
      code: `// migrations/002_add_orders_status.sql
-- expand: the new column is nullable, the old code does not see it
ALTER TABLE orders ADD COLUMN status text;

-- backfill in batches, not in one statement
UPDATE orders SET status = 'new'
WHERE status IS NULL AND id IN (
  SELECT id FROM orders WHERE status IS NULL LIMIT 1000
);

-- contract: only after every instance runs the new code, in a later release
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;`,
      table: {
        caption: L('The three steps of a safe schema change', 'Три шага безопасного изменения схемы'),
        headers: [
          L('Step', 'Шаг'),
          L('Change', 'Изменение'),
          L('Safe with the old code', 'Безопасно со старым кодом'),
        ],
        rows: [
          [L('Expand', 'Расширить'), L('Add a nullable column or a new table', 'Добавить пустой столбец или новую таблицу'), L('Yes', 'Да')],
          [L('Migrate', 'Перенести'), L('Backfill the new shape in batches', 'Залить новую форму порциями'), L('Yes, if the code reads both shapes', 'Да, если код читает обе формы')],
          [L('Contract', 'Сузить'), L('Drop the old column, add the constraint', 'Убрать старый столбец, добавить ограничение'), L('No, deploy the new code first', 'Нет, сначала задеплойте новый код')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Migrations at application start', 'Миграции при старте приложения'),
          text: L(
            'Every instance that starts runs the migration, and on a platform that scales to many instances at once they collide over the same lock. Some of them wait, some of them fail, and the deployment ends in a state where the schema is halfway migrated.',
            'Каждый поднявшийся инстанс выполняет миграцию, и на платформе, которая поднимает много инстансов сразу, они сталкиваются за одну блокировку. Часть ждёт, часть падает, и развёртывание заканчивается состоянием, в котором схема мигрирована наполовину.'
          ),
        },
        {
          tone: 'tip',
          title: L('Split the release when the change is not backward compatible', 'Делите релиз, когда изменение не обратно совместимо'),
          text: L(
            'When the new code cannot work with the old schema, ship it in two releases with a migration between them. The cost is one extra deployment, and the price of skipping it is a rollback that does not work, because the data is already in the new shape.',
            'Когда новый код не может работать со старой схемой, выпускайте его двумя релизами с миграцией между ними. Цена — один лишний деплой, а цена отказа от этого — откат, который не сработает, потому что данные уже в новой форме.'
          ),
        },
      ],
      takeaway: L(
        'Never change the schema in one step: expand, backfill in batches, deploy the new code, and only then contract.',
        'Никогда не меняйте схему за один шаг: расширьте, залейте порциями, задеплойте новый код и только потом сузьте.'
      ),
      seeAlso: [
        L('Section 9-1: server-side data access', 'Секция 9-1: доступ к данным на сервере'),
        L('Section 8-2: deployment targets and adapters', 'Секция 8-2: цели развёртывания и адаптеры'),
        L('Section 4-4: revalidation after a mutation', 'Секция 4-4: ревалидация после мутации'),
      ],
    },
  ],
};
