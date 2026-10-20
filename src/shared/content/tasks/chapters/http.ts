import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const httpChapterTasks: PracticeTask[] = [
  {
    id: 'ch-http-ch1-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch1',
    level: 'basic',
    title: L('Classify a response by its status code', 'Классифицируйте ответ по коду состояния'),
    brief: L(
      'Write a loadOrder function that fetches an order, returns undefined for 404 and 204, throws with the problem title for any other error status, and parses the body only when the response is successful. Send an Accept header and a timeout, and remember that fetch rejects only on network failures.',
      'Напишите функцию loadOrder, которая получает заказ, возвращает undefined для 404 и 204, выбрасывает исключение с заголовком problem для любого другого ошибочного статуса и разбирает тело только при успешном ответе. Отправьте заголовок Accept и таймаут и помните, что fetch отклоняет промис только при сетевых сбоях.'
    ),
    hint: L(
      'Check response.status before the generic error branch, and read the body only once. The ok property is false for every status from 400 to 599, and 204 carries no body at all.',
      'Проверяйте response.status до общей ветки ошибок и читайте тело только один раз. Свойство ok ложно для любого статуса от 400 до 599, а 204 вообще не несёт тела.'
    ),
    solution: `// $ curl -i https://api.example.com/orders/42
// HTTP/1.1 200 OK
// Content-Type: application/json; charset=utf-8
// {"id":42,"status":"paid"}

type Order = { id: number; status: string };

// fetch rejects on network failures only, never on a 4xx or a 5xx.
export async function loadOrder(id: number): Promise<Order | undefined> {
  const response = await fetch('https://api.example.com/orders/' + id, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(5000),
  });

  if (response.status === 404) return undefined;
  if (response.status === 204) return undefined;
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}));
    throw new Error('HTTP ' + response.status + ': ' + (problem.title ?? 'unknown'));
  }
  return response.json();
}`,
    explanation: L(
      'The first digit of the status tells the client what to do next: fix the request, wait or give up, and each of those cases deserves its own branch. Because fetch does not reject on a 4xx or a 5xx, the error path has to be written explicitly, and a body that may be missing is parsed only after the status has been checked.',
      'Первая цифра кода состояния говорит клиенту, что делать дальше: исправить запрос, подождать или сдаться, и каждому случаю нужна своя ветка. Поскольку fetch не отклоняет промис на 4xx или 5xx, путь ошибки приходится описывать явно, а тело, которого может не быть, разбирается только после проверки статуса.'
    ),
  },
  {
    id: 'ch-http-ch2-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch2',
    level: 'basic',
    title: L('Headers, negotiation and the CORS preflight', 'Заголовки, согласование и preflight-запрос CORS'),
    brief: L(
      'Send a PATCH request with the Accept, Authorization and Content-Type headers, and read the response headers that describe the representation: Content-Type, Content-Encoding and Vary. Model the preflight request the browser sends before that PATCH and the 204 answer that allows it.',
      'Отправьте PATCH-запрос с заголовками Accept, Authorization и Content-Type и прочитайте заголовки ответа, описывающие представление: Content-Type, Content-Encoding и Vary. Опишите preflight-запрос, который браузер отправляет перед этим PATCH, и ответ 204, который его разрешает.'
    ),
    hint: L(
      'CORS decides whether the page may read the answer, not whether the caller may have the data. A request with a custom header or a method other than GET triggers a preflight that the browser sends on its own.',
      'CORS решает, может ли страница прочитать ответ, а не имеет ли вызывающий право на данные. Запрос с нестандартным заголовком или методом, отличным от GET, вызывает preflight, который браузер отправляет сам.'
    ),
    solution: `// $ curl -i -X OPTIONS https://api.example.com/api/orders
//     -H 'Origin: https://app.example.com'
//     -H 'Access-Control-Request-Method: PATCH'
// HTTP/1.1 204 No Content
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST, PATCH

// The browser sends the preflight, the code sets the simple headers.
export async function patchOrder(id: string, token: string): Promise<Response> {
  return fetch('https://api.example.com/api/orders/' + id, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'paid' }),
  });
}

// The response headers describe the representation and its reuse policy.
export const describeRepresentation = (response: Response): string =>
  (response.headers.get('content-type') ?? 'none') +
  ' | encoding: ' + (response.headers.get('content-encoding') ?? 'identity') +
  ' | vary: ' + (response.headers.get('vary') ?? 'none');`,
    explanation: L(
      'Accept asks for a representation, Content-Type announces the one that is being sent, and Vary records the request header the answer depends on, so that a cache never mixes two variants. The preflight is a request about the request: the browser asks the server whether the PATCH with those headers is allowed, and the 204 answer carries the policy.',
      'Accept просит представление, Content-Type объявляет отправляемое, а Vary записывает заголовок запроса, от которого зависит ответ, чтобы кэш не смешивал два варианта. Preflight — это запрос о запросе: браузер спрашивает у сервера, разрешён ли такой PATCH с этими заголовками, и ответ 204 несёт политику.'
    ),
  },
  {
    id: 'ch-http-ch3-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch3',
    level: 'basic',
    title: L('Conditional requests and the 304 answer', 'Условные запросы и ответ 304'),
    brief: L(
      'Send a conditional GET with the If-None-Match header built from the ETag you already have and turn a 304 answer into the body you cached before. Choose the Cache-Control policy for a fingerprinted asset and for a personalized account page, and show how a single path is purged at the CDN.',
      'Отправьте условный GET с заголовком If-None-Match, собранным из уже известного ETag, и превратите ответ 304 в закэшированное ранее тело. Подберите политику Cache-Control для файла с хешем в имени и для персональной страницы аккаунта и покажите, как сбросить один путь на CDN.'
    ),
    hint: L(
      'A validator is only useful when it changes together with the content, and a conditional request turns a full download into a 304 with no body. Never reuse a URL for different content, and prefer versioned URLs over purges.',
      'Валидатор полезен только тогда, когда меняется вместе с содержимым, а условный запрос превращает полную загрузку в ответ 304 без тела. Никогда не переиспользуйте URL для разного содержимого и предпочитайте версионированные URL сбросу кэша.'
    ),
    solution: `// $ curl -i -H 'If-None-Match: "orders-v3"' https://api.example.com/api/orders
// HTTP/1.1 304 Not Modified
// $ curl -X PURGE https://api.cdn.example.com/purge -d '{"paths":["/index.html"]}'

// A fingerprinted asset is cached forever, a personal page is not.
export const cachePolicy = {
  asset: 'public, max-age=31536000, immutable',
  account: 'private, max-age=0, must-revalidate',
};

const CACHE = new Map<string, { etag: string; body: string }>();

// A conditional request turns a full download into a 304.
export async function loadOrders(): Promise<string> {
  const cached = CACHE.get('orders');
  const response = await fetch('https://api.example.com/api/orders', {
    headers: cached ? { 'If-None-Match': cached.etag } : {},
  });
  if (response.status === 304 && cached) return cached.body;
  const body = await response.text();
  CACHE.set('orders', { etag: response.headers.get('etag') ?? '', body });
  return body;
}`,
    explanation: L(
      'The client keeps the ETag it received and sends it back as If-None-Match, so an unchanged answer costs a 304 with no body instead of a full download. The Cache-Control policy is chosen from the sensitivity of the data: a fingerprinted asset is immutable and lives on the edge, while a personalized page must never be stored in a shared cache.',
      'Клиент хранит полученный ETag и отправляет его обратно как If-None-Match, поэтому неизменившийся ответ стоит пустого 304 вместо полной загрузки. Политика Cache-Control выбирается по чувствительности данных: файл с хешем в имени неизменяем и живёт на краю, а персональная страница никогда не должна попадать в общий кэш.'
    ),
  },
  {
    id: 'ch-http-ch4-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch4',
    level: 'intermediate',
    title: L('Compress the payload and label the encoding', 'Сожмите ответ и укажите кодирование'),
    brief: L(
      'Compress a JSON payload with gzip and with brotli, report how much each of them saved, and answer with the matching Content-Encoding and the Vary: Accept-Encoding header. Compare a single request over HTTP/1.1 and over HTTP/2 with curl and explain what the numbers show.',
      'Сожмите JSON-ответ через gzip и через brotli, покажите, сколько каждый из них сэкономил, и ответьте с соответствующим заголовком Content-Encoding и заголовком Vary: Accept-Encoding. Сравните один запрос по HTTP/1.1 и по HTTP/2 через curl и объясните, что показывают эти числа.'
    ),
    hint: L(
      'Compress the text once, name the algorithm in Content-Encoding and vary on Accept-Encoding, otherwise a cache will serve the compressed bytes to a client that cannot read them. HTTP/2 removes the queue in front of the origin, not the work inside it.',
      'Сжимайте текст один раз, называйте алгоритм в Content-Encoding и варьируйте по Accept-Encoding, иначе кэш отдаст сжатые байты клиенту, который их не прочитает. HTTP/2 убирает очередь перед origin, но не работу внутри него.'
    ),
    solution: `import { gzipSync, brotliCompressSync } from 'node:zlib';

const payload = JSON.stringify({ orders: Array.from({ length: 100 }, (_, i) => ({ id: i })) });
const gzipped = gzipSync(payload);
const brotlied = brotliCompressSync(payload);

// The server must label the encoding and vary on the request header.
export const headers = {
  'Content-Type': 'application/json',
  'Content-Encoding': 'br',
  'Vary': 'Accept-Encoding',
  'Content-Length': brotlied.length,
};

// $ curl -s --http1.1 -o /dev/null -w '%{http_version} %{time_total}' https://api.example.com/orders/42
// 1.1 0.048
// $ curl -s --http2 -o /dev/null -w '%{http_version} %{time_total}' https://api.example.com/orders/42
// 2 0.031
export const sizes = { raw: payload.length, gzip: gzipped.length, brotli: brotlied.length };`,
    explanation: L(
      'Content-Encoding describes the bytes on the wire, not the meaning of the document, and the Vary header tells every cache in the chain that the answer depends on Accept-Encoding. Brotli usually wins on text, and HTTP/2 spends less time on the connection itself, but neither of them reduces the work your handler does.',
      'Content-Encoding описывает байты на проводе, а не смысл документа, и заголовок Vary говорит каждому кэшу в цепочке, что ответ зависит от Accept-Encoding. Brotli обычно выигрывает на тексте, а HTTP/2 тратит меньше времени на само соединение, но ни то ни другое не уменьшает работу вашего обработчика.'
    ),
  },
  {
    id: 'ch-http-ch5-1',
    moduleId: 'http',
    topic: 'security',
    chapterId: 'http-ch5',
    level: 'intermediate',
    title: L('A session cookie and a verified token', 'Session-cookie и проверенный токен'),
    brief: L(
      'Issue a session cookie with the narrowest scope that works, build the Authorization header for an API call, and verify a JWT by pinning the algorithm, checking the audience and the expiry before trusting the claims. The token must never be allowed to choose its own algorithm.',
      'Выпусти session-cookie с самой узкой областью действия, которая работает, собери заголовок Authorization для вызова API и проверь JWT, зафиксировав алгоритм, проверив аудиторию и срок действия до того, как доверишь claims. Токен никогда не должен сам выбирать свой алгоритм.'
    ),
    hint: L(
      'Every cookie needs the narrowest scope that works: host, path, lifetime, Secure, HttpOnly and SameSite. A JWT proves exactly three things, and the algorithm comes from your configuration, never from the token header.',
      'Каждой cookie нужен самый узкий рабочий scope: хост, путь, время жизни, Secure, HttpOnly и SameSite. JWT доказывает ровно три вещи, а алгоритм берётся из вашей конфигурации, а не из заголовка токена.'
    ),
    solution: `import { createVerify } from 'node:crypto';

// Set-Cookie: sid=8f14e45f; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax
export function sessionCookie(sid: string): string {
  return 'sid=' + sid + '; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax';
}

// The token travels in the header, the session state stays on the server.
export const authHeader = (accessToken: string): string => 'Bearer ' + accessToken;

// The algorithm is pinned, the audience and the expiry are checked.
export function verifyClaims(token: string, publicKey: string): boolean {
  const parts = token.split('.');
  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  if (header.alg !== 'RS256') return false;
  if (claims.aud !== 'https://api.example.com') return false;
  if (claims.exp * 1000 < Date.now()) return false;
  return createVerify('RSA-SHA256')
    .update(parts[0] + '.' + parts[1])
    .verify(publicKey, Buffer.from(parts[2], 'base64url'));
}`,
    explanation: L(
      'The cookie carries an opaque identifier while the state stays on the server, and its attributes decide who may send it and who may read it, so HttpOnly and SameSite matter as much as the signature. The verification checks three things and no more: the signature is valid, the audience is yours and the token has not expired, with the algorithm taken from your own configuration.',
      'Cookie несёт непрозрачный идентификатор, а состояние остаётся на сервере, и её атрибуты решают, кто может её отправить и кто прочитать, поэтому HttpOnly и SameSite важны не меньше подписи. Проверка отвечает ровно за три вещи: подпись верна, аудитория ваша и срок не истёк, причём алгоритм берётся из собственной конфигурации.'
    ),
  },
  {
    id: 'ch-http-ch6-1',
    moduleId: 'http',
    topic: 'security',
    chapterId: 'http-ch6',
    level: 'intermediate',
    title: L('HSTS, CSP and escaping the output', 'HSTS, CSP и экранирование вывода'),
    brief: L(
      'Send HSTS with the includeSubDomains flag, set Secure, HttpOnly and SameSite on the session cookie, build a strict Content Security Policy, and escape a user supplied value before it reaches innerHTML. Issue a CSRF token that the client sends back in a header, so that a cross-origin page cannot produce it.',
      'Отправь HSTS с флагом includeSubDomains, выставь Secure, HttpOnly и SameSite на session-cookie, собери строгую Content Security Policy и экранируй значение от пользователя до того, как оно попадёт в innerHTML. Выпусти CSRF-токен, который клиент отправляет обратно в заголовке, чтобы кросс-доменная страница не смогла его подделать.'
    ),
    hint: L(
      'Encode every value where it is inserted and add a strict CSP on top, because the two fail in different ways. Keep SameSite at Lax or Strict and treat the CSRF token as the layer that actually decides.',
      'Экранируйте значение там, где оно вставляется, и добавляйте строгую CSP поверх, потому что они ломаются по-разному. Держите SameSite на Lax или Strict, а CSRF-токен считайте тем слоем, который действительно решает.'
    ),
    solution: `// Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
// Set-Cookie: sid=abc123; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
// Content-Security-Policy: default-src 'self'; script-src 'self'; frame-ancestors 'none'

const ESCAPES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};

// Encode the value where it is inserted, never where it is parsed.
export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch);

export const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join('; ');

// The token lives in a cookie and travels in a header.
export const issueCsrfToken = (token: string): string =>
  'csrf=' + token + '; Path=/; Secure; SameSite=Strict';`,
    explanation: L(
      'HSTS tells the browser to refuse plain HTTP from now on, and it only works if it is sent from the very first HTTPS response. Output encoding and CSP are two different layers: encoding removes the markup from the value, while the policy removes the ability to execute it, so a mistake in one is not fatal when the other is in place.',
      'HSTS говорит браузеру больше не принимать обычный HTTP, и работает только тогда, когда отправлен с первого же HTTPS-ответа. Экранирование вывода и CSP — два разных слоя: экранирование убирает разметку из значения, а политика убирает саму возможность выполнить её, поэтому ошибка в одном не смертельна, когда на месте другой.'
    ),
  },
  {
    id: 'ch-http-ch7-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch7',
    level: 'intermediate',
    title: L('Flat resources, cursor pages and idempotent writes', 'Плоские ресурсы, курсорные страницы и идемпотентные записи'),
    brief: L(
      'Model the orders feature as a flat resource where the verb lives in the method and the identifier in the path, answer with the status codes that match the outcome, page through the list with a cursor, and make a retried POST safe by sending an idempotency key that the server claims before the side effect.',
      'Опишите фичу заказов как плоский ресурс, где глагол живёт в методе, а идентификатор — в пути, ответьте кодами состояния, которые соответствуют результату, пройдите по списку с курсором и сделайте повторный POST безопасным с помощью ключа идемпотентности, который сервер забирает до побочного эффекта.'
    ),
    hint: L(
      'Model nouns, keep the verb in the method and prefer flat resources with links over deep hierarchies. Use offset only over stable collections, and claim the idempotency key before the write happens.',
      'Моделируйте существительные, держите глагол в методе и выбирайте плоские ресурсы со ссылками вместо глубоких иерархий. Offset используйте только для стабильных коллекций, а ключ идемпотентности забирайте до записи.'
    ),
    solution: `// $ curl -i -X POST https://api.example.com/orders
// HTTP/1.1 201 Created
// Location: /orders/ord_1042

// A flat resource with the verb in the method and the id in the path.
const ROUTES = [
  { method: 'GET', path: '/orders' },
  { method: 'POST', path: '/orders' },
  { method: 'PATCH', path: '/orders/:orderId' },
];

// The client owns the key and reuses it across every retry.
export async function createOrder(sku: string, key: string): Promise<Response> {
  return fetch('https://api.example.com/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ sku, quantity: 1 }),
  });
}

// A cursor carries the last seen key, so new rows cannot shift the page.
export function nextPage(cursor: string | null): string {
  const params = new URLSearchParams({ limit: '20' });
  if (cursor) params.set('cursor', cursor);
  return 'https://api.example.com/orders?' + params.toString();
}`,
    explanation: L(
      'The resource is a noun and the method is the verb, so the URI never grows a hierarchy that has to be kept in sync. The cursor pagination keeps the position on the server side of the last seen key, so rows inserted meanwhile cannot shift the page under the client, and the idempotency key turns a blind retry into a safe replay.',
      'Ресурс — существительное, а метод — глагол, поэтому URI не растёт иерархией, которую нужно держать синхронизированной. Курсорная пагинация хранит позицию по последнему ключу на стороне сервера, поэтому новые строки не сдвигают страницу под клиентом, а ключ идемпотентности превращает слепой повтор в безопасный переигров запроса.'
    ),
  },
  {
    id: 'ch-http-ch8-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch8',
    level: 'advanced',
    title: L('One envelope, one problem format, one allowlist', 'Одна обёртка, один формат ошибки, один allowlist'),
    brief: L(
      'Build a single response envelope that keeps the resource in data and the transfer details in meta, report every failure as a problem document with a stable machine readable code and the request identifier, and read the sort and limit from the query string against an allowlist. The limit must be clamped and the sort field must never be interpolated raw.',
      'Собери единую обёртку ответа, которая держит ресурс в data, а детали передачи в meta, опиши любую ошибку как problem-документ со стабильным машиночитаемым кодом и идентификатором запроса, а sort и limit читай из query-строки по allowlist. Limit нужно ограничить сверху, а поле sort нельзя подставлять в запрос как есть.'
    ),
    hint: L(
      'Fix the format of every field type once: ISO 8601 timestamps in UTC, money as an integer amount plus a currency code, lowercase closed enums. Put filters in the query string and validate every value against an allowlist.',
      'Зафиксируйте формат каждого типа поля: даты ISO 8601 в UTC, деньги как целая сумма плюс код валюты, закрытые перечисления в нижнем регистре. Фильтры кладите в query-строку и проверяйте каждое значение по allowlist.'
    ),
    solution: `// $ curl -i -X POST https://api.example.com/orders -d '{"sku":"A-1","quantity":0}'
// HTTP/1.1 422 Unprocessable Content
// Content-Type: application/problem+json

// One envelope for every answer, success or failure.
export const envelope = (data: unknown, requestId: string): unknown => ({
  data,
  meta: { requestId, timestamp: '2024-05-01T10:00:00Z' },
});

// The failure carries a stable machine readable code and the request id.
export const problem = (requestId: string, field: string, code: string): unknown => ({
  type: 'https://api.example.com/problems/validation-error',
  title: 'Request validation failed',
  status: 422,
  detail: field + ' must be a positive integer',
  errors: [{ field, code }],
  traceId: requestId,
});

// The sort field comes from an allowlist and the limit is clamped.
const ALLOWED_SORTS = new Set(['created_at', 'total', 'status']);
export function readQuery(search: string): { sort: string; limit: number } {
  const query = new URLSearchParams(search);
  const sort = query.get('sort') ?? '';
  return { sort: ALLOWED_SORTS.has(sort) ? sort : 'created_at',
           limit: Math.min(Number(query.get('limit') ?? 20), 100) };
}`,
    explanation: L(
      'One envelope and one problem format mean a client parses two shapes instead of as many as there are endpoints, and the machine readable code is the part a program can act on. The sort field is checked against an allowlist before it is used, so a query string can never choose an arbitrary column, and the limit is clamped so one request cannot ask for the whole table.',
      'Одна обёртка и один формат ошибки означают, что клиент разбирает две формы вместо стольких, сколько есть эндпоинтов, а машиночитаемый код — это то, на что программа может среагировать. Поле sort проверяется по allowlist до использования, поэтому query-строка не может выбрать произвольную колонку, а limit ограничивается, чтобы один запрос не забрал всю таблицу.'
    ),
  },
  {
    id: 'ch-http-ch9-1',
    moduleId: 'http',
    topic: 'http',
    chapterId: 'http-ch9',
    level: 'advanced',
    title: L('Split the latency and cap the excess work', 'Разделите задержку и ограничьте лишнюю работу'),
    brief: L(
      'Measure the request time in two phases, the time to the response headers and the time to download the body, and report both. Implement a token bucket that refills at a constant rate and refuses the excess work with 429 and a Retry-After header, and expose a liveness check that touches no dependency next to a readiness check that pings them all.',
      'Измерьте время запроса в двух фазах: до заголовков ответа и до скачивания тела, и сообщите оба значения. Реализуйте корзину токенов, которая пополняется с постоянной скоростью и отказывает в лишней работе ответом 429 с заголовком Retry-After, и сделайте рядом проверку живости, которая не трогает зависимости, и проверку готовности, которая пингует их все.'
    ),
    hint: L(
      'Split the latency into phases and fix the phase that grew. A token bucket refills at a constant rate and caps at the burst size, and liveness must stay free of dependencies while readiness checks them.',
      'Разделите задержку на фазы и чините ту фазу, которая выросла. Корзина токенов пополняется с постоянной скоростью и ограничена размером всплеска, а проверка живости не должна зависеть от зависимостей, в отличие от проверки готовности.'
    ),
    solution: `// The phases of the request are measured separately.
export async function measure(url: string): Promise<string> {
  const startedAt = performance.now();
  const response = await fetch(url);
  const headersAt = performance.now();
  const text = await response.text();
  const bodyAt = performance.now();
  return 'TTFB ' + Math.round(headersAt - startedAt) +
    'ms, download ' + Math.round(bodyAt - headersAt) + 'ms';
}

// A token bucket refills at a constant rate and caps at the burst size.
function createBucket(capacity: number, refillPerSecond: number): () => boolean {
  let tokens = capacity;
  let last = Date.now();
  return () => {
    const now = Date.now();
    tokens = Math.min(capacity, tokens + ((now - last) / 1000) * refillPerSecond);
    last = now;
    if (tokens < 1) return false;
    tokens -= 1;
    return true;
  };
}

// Liveness touches no dependency, readiness pings all of them.
export const ready = async (pings: (() => Promise<boolean>)[]): Promise<boolean> =>
  (await Promise.all(pings.map((ping) => ping()))).every(Boolean);`,
    explanation: L(
      'A single total time hides where the request actually spent its budget, so the measurement splits the wait for the headers from the download of the body. The token bucket protects the capacity by refusing work with 429 instead of queueing it without a limit, and the two health endpoints answer different questions: is the process alive and can it serve traffic right now.',
      'Одно суммарное время скрывает, где запрос на самом деле потратил бюджет, поэтому измерение делит ожидание заголовков и скачивание тела. Корзина токенов защищает пропускную способность, отказывая в работе ответом 429 вместо бесконечной очереди, а две проверки отвечают на разные вопросы: жив ли процесс и может ли он сейчас обслуживать трафик.'
    ),
  },
];
