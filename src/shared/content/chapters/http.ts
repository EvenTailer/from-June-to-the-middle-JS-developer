import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpChapters: Chapter[] = [
  {
    id: 'http-ch1',
    title: L('HTTP protocol basics', 'Основы протокола HTTP'),
    summary: L(
      'How a request and a response are built, what the methods promise about idempotency, and how status codes, protocol versions and connection reuse shape the exchange.',
      'Как устроены запрос и ответ, что методы обещают про идемпотентность и как коды статуса, версии протокола и переиспользование соединений формируют обмен.'
    ),
    sections: [
      {
        id: 'http-ch1-s1',
        title: L('Anatomy of a request and a response', 'Анатомия запроса и ответа'),
        body: L(
          'Every HTTP exchange is a plain-text message in two directions. A request starts with a request line — method, target, protocol version — then headers, a blank line and an optional body. A response starts with a status line — version, three-digit code, reason phrase — and continues with the same structure. The blank line separates the head from the body and is mandatory even when the body is empty.\n\nThe target is usually an origin-form path such as /orders/42. The body is opaque bytes: HTTP does not care whether it carries JSON, HTML or a binary blob, which is why Content-Type exists. Bodies are framed either by Content-Length, which states the byte count, or by Transfer-Encoding: chunked, which streams size-prefixed chunks. The two are mutually exclusive, and request smuggling lives in the gap between what two proxy hops each believe the framing is.\n\nIn the browser, fetch and XMLHttpRequest write the raw text for you, while the developer tools show the wire format exactly. The consequence that matters: everything the server needs to act on — the verb, the path, the query, the headers, the body — is explicit and inspectable. The protocol itself keeps no session state; anything that looks like state is a convention built on top.',
          'Каждый обмен по HTTP — это текстовое сообщение в двух направлениях. Запрос начинается со строки запроса — метод, цель, версия протокола, — затем идут заголовки, пустая строка и необязательное тело. Ответ начинается со строки статуса — версия, трёхзначный код и текст причины, — и продолжается той же структурой. Пустая строка отделяет заголовки от тела и обязательна, даже когда тело пустое.\n\nЦель обычно задаётся в origin-form, как /orders/42. Тело — непрозрачные байты: HTTP всё равно, это JSON, HTML или двоичный блоб, и именно поэтому существует Content-Type. Тело обрамляется либо Content-Length, который задаёт точное число байтов, либо Transfer-Encoding: chunked, который передаёт фрагменты с префиксом размера. Способы взаимоисключающи, и request smuggling живёт в зазоре между тем, как один хоп прокси понимает обрамление, и тем, как понимает другой.\n\nВ браузере за вас пишут сырой текст fetch и XMLHttpRequest, а вкладка Network инструментов разработчика показывает формат на проводе в точности. Важное следствие: всё, на что серверу нужно среагировать — глагол, путь, query, заголовки, тело, — выражено явно и доступно для инспекции. Сам протокол не хранит состояние сессии, и всё, что выглядит как состояние, является соглашением поверх него.'
        ),
        bullets: [
          L('A message is a start line, headers, a blank line and an optional body.', 'Сообщение — это стартовая строка, заголовки, пустая строка и необязательное тело.'),
          L('Content-Length and Transfer-Encoding frame the body and are mutually exclusive.', 'Content-Length и Transfer-Encoding обрамляют тело и взаимоисключающи.'),
          L('HTTP keeps no session state of its own; sessions are a convention.', 'HTTP сам по себе не хранит состояние сессии; сессия — это соглашение.'),
        ],
        code: `GET /orders/42?include=items HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 27

{"id":42,"status":"paid"}`,
        takeaway: L(
          'The blank line is what makes the split between headers and body unambiguous.',
          'Именно пустая строка однозначно делит заголовки и тело.'
        ),
      },
      {
        id: 'http-ch1-s2',
        title: L('Methods and idempotency', 'Методы и идемпотентность'),
        body: L(
          'The method tells the server what to do with the identified resource: GET reads, POST creates or triggers processing, PUT replaces the resource entirely, PATCH applies a partial modification, DELETE removes it, HEAD returns only the headers of a GET, OPTIONS describes the available options. CONNECT and TRACE serve special purposes and are rarely used in application code.\n\nTwo properties decide whether a request may be retried. A method is safe when it only reads: GET, HEAD, OPTIONS and TRACE are safe. A method is idempotent when repeating it produces the same effect as performing it once: GET, HEAD, PUT, DELETE, OPTIONS and TRACE qualify, while POST and PATCH carry no guarantee. Idempotency is what lets a proxy or a client replay a request that timed out, and that is why a DELETE can be retried but a payment POST cannot.\n\nIdempotency is a promise about semantics, not about the absence of side effects. PUT /orders/42 with the same body twice leaves the order in the same state. PATCH is not idempotent by specification, because a relative patch such as {"balance": {"$increment": 10}} applied twice gives a different result, while an absolute {"balance": 100} applied twice gives the same one. Choosing the right method and stating which patch shapes the endpoint accepts removes a family of duplicate-payment bugs.',
          'Метод говорит серверу, что делать с указанным ресурсом: GET читает, POST создаёт или запускает обработку, PUT полностью заменяет ресурс, PATCH вносит частичное изменение, DELETE удаляет, HEAD возвращает только заголовки ответа GET, OPTIONS описывает доступные способы обмена. CONNECT и TRACE нужны для особых случаев и в прикладном коде редко используются.\n\nДва свойства решают, можно ли запрос повторить. Метод безопасен, если он только читает: безопасны GET, HEAD, OPTIONS и TRACE. Метод идемпотентен, если повторение даёт тот же эффект, что и однократное выполнение: идемпотентны GET, HEAD, PUT, DELETE, OPTIONS и TRACE, а для POST и PATCH гарантии нет. Идемпотентность позволяет прокси или клиенту переиграть запрос, истёкший по таймауту, и поэтому DELETE повторять можно, а платёжный POST — нет.\n\nИдемпотентность — обещание о семантике, а не об отсутствии побочных эффектов. PUT /orders/42 с одинаковым телом дважды оставит заказ в том же состоянии. PATCH по спецификации не идемпотентен: относительный патч вида {"balance": {"$increment": 10}}, применённый дважды, даст разный результат, а абсолютный {"balance": 100} — тот же. Правильный метод и явное описание принимаемых форм патча убирают семейство багов с двойным списанием.'
        ),
        bullets: [
          L('Safe means read-only; idempotent means a repeat has the same effect.', 'Безопасный значит только чтение; идемпотентный значит, что повтор даёт тот же эффект.'),
          L('GET, HEAD, PUT and DELETE are idempotent; POST and PATCH are not guaranteed to be.', 'GET, HEAD, PUT и DELETE идемпотентны; для POST и PATCH гарантий нет.'),
          L('Idempotency is the precondition for an automatic retry.', 'Идемпотентность — необходимое условие для автоматического повтора.'),
          L('A relative PATCH is not idempotent, an absolute one can be.', 'Относительный PATCH не идемпотентен, абсолютный может быть.'),
        ],
        code: `// idempotent: safe to replay after a timeout
await fetch('/api/orders/42', { method: 'DELETE' });

// not idempotent: a retry can create two orders
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sku: 'A-1', qty: 2 }),
});`,
        takeaway: L(
          'Retry a request only when the method is idempotent or the request carries an idempotency key.',
          'Повторяйте запрос, только если метод идемпотентен или у запроса есть ключ идемпотентности.'
        ),
      },
      {
        id: 'http-ch1-s3',
        title: L('Status codes, versions and keep-alive', 'Коды статуса, версии и keep-alive'),
        body: L(
          'The status code classifies the outcome, and its first digit carries most of the meaning: 1xx informational, 2xx success, 3xx look elsewhere, 4xx the client got it wrong, 5xx the server did. Inside the classes the exact code matters more than the reason phrase, which humans read and machines ignore: 200 for a successful read, 201 with a Location header for a created resource, 204 for an action with no body.\n\nThe split between 4xx and 5xx is a contract with the caller. A 4xx says the request will not succeed as written: 400 for a malformed body, 401 for missing credentials, 403 for a valid identity without rights, 429 for a rate limit. A 5xx says the server failed to handle a request it should have: 500 for an unhandled exception, 502 for a broken upstream, 503 for overload. Retrying a 5xx may help; a 4xx will not.\n\nThe protocol version decides how many requests share a connection. HTTP/1.1 makes keep-alive the default and Host mandatory, but one connection still carries one request at a time, so a slow response blocks everything queued behind it. That is head-of-line blocking, and browsers work around it with about six connections per origin. HTTP/2 multiplexes many streams over one connection, and HTTP/3 moves the transport to QUIC over UDP.',
          'Код статуса классифицирует исход, и большую часть смысла несёт его первая цифра: 1xx — информационный, 2xx — успех, 3xx — ищите дальше, 4xx — ошибка на стороне клиента, 5xx — на стороне сервера. Внутри классов важнее точный код, а не текст причины: его читают люди, машины его игнорируют. Так 200 означает успешное чтение, 201 с заголовком Location — созданный ресурс, 204 — успешное действие без тела.\n\nРазделение на 4xx и 5xx — это контракт с вызывающим. 4xx говорит, что запрос в таком виде не сработает: 400 для некорректного тела, 401 для отсутствующих учётных данных, 403 для верной личности без прав, 409 для конфликта, 422 для невалидных данных, 429 для превышения лимита. 5xx говорит, что сервер не смог обработать запрос, который обязан был: 500 для необработанного исключения, 502 для сломанного апстрима, 503 для перегрузки, 504 для таймаута. Повтор 5xx может помочь, повтор 4xx — нет.\n\nВерсия протокола определяет, сколько запросов может делить одно соединение. HTTP/1.1 делает keep-alive поведением по умолчанию, а Host — обязательным, но по соединению по-прежнему идёт один запрос за раз, поэтому медленный ответ блокирует всё, что стоит за ним в очереди. Это head-of-line blocking, и браузеры обходят его, открывая около шести соединений на origin. HTTP/2 мультиплексирует потоки в одном соединении, а HTTP/3 переносит транспорт на QUIC над UDP.'
        ),
        bullets: [
          L('The first digit of the status code tells you who is responsible for the failure.', 'Первая цифра кода статуса говорит, чья это ошибка.'),
          L('A 4xx will not succeed on retry; a 5xx sometimes will.', '4xx не пройдёт при повторе, 5xx — иногда пройдёт.'),
          L('HTTP/1.1 made keep-alive the default and Host mandatory.', 'HTTP/1.1 сделал keep-alive поведением по умолчанию, а Host — обязательным.'),
          L('HTTP/2 removes head-of-line blocking, HTTP/3 removes the TCP transport entirely.', 'HTTP/2 снимает head-of-line blocking, а HTTP/3 — и сам TCP-транспорт.'),
        ],
        code: `// 201 Created, with the location of the new resource
HTTP/1.1 201 Created
Location: /api/orders/1042

// 429 Too Many Requests, the client is told when to come back
HTTP/1.1 429 Too Many Requests
Retry-After: 30`,
        takeaway: L(
          'The status code class tells the client whether to fix the request, wait, or give up.',
          'Класс кода статуса говорит клиенту: исправлять запрос, подождать или сдаться.'
        ),
      },
    ],
  },
  {
    id: 'http-ch2',
    title: L('Headers, content negotiation and identity', 'Заголовки, согласование контента и идентификация'),
    summary: L(
      'How headers negotiate the representation, how cookies and tokens differ as carriers of identity, which authentication schemes exist and how CORS governs cross-origin access.',
      'Как заголовки согласуют представление данных, чем cookie отличаются от токенов как носителя личности, какие схемы аутентификации бывают и как CORS управляет кросс-доменным доступом.'
    ),
    sections: [
      {
        id: 'http-ch2-s1',
        title: L('Headers and content negotiation', 'Заголовки и согласование контента'),
        body: L(
          'Headers carry all the metadata of a message: who is calling, what representation is acceptable, how the body is encoded, how long it may be cached. Some are request headers such as Accept, Accept-Language, Accept-Encoding, Authorization and Content-Type, some are response headers such as Content-Type, Cache-Control, ETag and Location. Names are case-insensitive, order does not matter, and repeated headers may be combined with commas.\n\nContent negotiation is the client describing its preferences while the server picks a representation. The client sends Accept with a weighted list of media types, for example Accept: application/json;q=0.9, text/html;q=0.8, and the server answers with the Content-Type of what it actually sent. Accept-Encoding does the same for compression, Accept-Language for locale. Quality values from 0 to 1 order the preferences, and a value of 0 means never send this.\n\nThe response header Vary is the part people forget. If the server chooses a representation based on Accept-Encoding or Accept-Language, it must list those request headers in Vary, so a cache stores a separate entry per combination instead of serving the wrong variant to the wrong client. Vary: Accept-Encoding is what makes a CDN keep a compressed and an uncompressed copy side by side; omit it and one of them will poison the other.',
          'Заголовки несут всю метаинформацию сообщения: кто обращается, какое представление приемлемо, чем закодировано тело, сколько оно может храниться в кэше. Одни бывают заголовками запроса — Accept, Accept-Language, Accept-Encoding, Authorization, Content-Type, — другие заголовками ответа: Content-Type, Cache-Control, ETag, Location. Имена нечувствительны к регистру, порядок не важен, повторяющиеся заголовки объединяются запятыми.\n\nСогласование контента — это клиент описывает предпочтения, а сервер выбирает представление. Клиент шлёт Accept со взвешенным списком типов, например Accept: application/json;q=0.9, text/html;q=0.8, а сервер отвечает заголовком Content-Type того, что реально отправил. Accept-Encoding делает то же для сжатия, Accept-Language — для локали. Значения качества от 0 до 1 задают приоритет, а нулевое значение означает «не присылать это».\n\nЗаголовок ответа Vary — та часть, о которой забывают. Если сервер выбирает представление по Accept-Encoding или Accept-Language, он обязан перечислить эти заголовки запроса в Vary, иначе кэш сохранит одну запись на комбинацию и начнёт отдавать не тот вариант не тому клиенту. Именно Vary: Accept-Encoding заставляет CDN держать сжатую и несжатую копию рядом; без него одна из них испортит другую.'
        ),
        bullets: [
          L('Accept states what the client can receive, Content-Type states what arrived.', 'Accept — что клиент способен принять, Content-Type — что пришло на самом деле.'),
          L('A quality value of 0 forbids the type, values below 1 rank the preferences.', 'Нулевое качество запрещает тип, значения меньше единицы задают приоритет.'),
          L('Vary must list every request header that changed the response.', 'Vary должен перечислять все заголовки запроса, из-за которых ответ изменился.'),
          L('Content-Encoding says how the body was compressed, Content-Type says what it is.', 'Content-Encoding говорит, чем сжато тело, Content-Type — что это за содержимое.'),
        ],
        code: `GET /articles HTTP/1.1
Accept: application/json;q=0.9, text/html;q=0.8
Accept-Encoding: br, gzip
Accept-Language: ru-RU, en;q=0.8

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: br
Vary: Accept-Encoding, Accept-Language`,
        takeaway: L(
          'If the response depends on a request header, name that header in Vary, or the cache will serve the wrong variant.',
          'Если ответ зависит от заголовка запроса, укажите его в Vary, иначе кэш отдаст не тот вариант.'
        ),
      },
      {
        id: 'http-ch2-s2',
        title: L('Cookies versus tokens', 'Cookies против токенов'),
        body: L(
          'Two mechanisms carry identity between requests, and they model different things. A cookie is a small key-value pair that the browser stores per site and attaches automatically to matching requests. A token is an opaque or signed string that the application stores, usually in memory, and sends explicitly in the Authorization header. Cookies model a browser session that the browser manages; tokens model a credential the client holds.\n\nCookies are exposed to CSRF, because any site can make the browser send a form to another site and the cookie rides along. The defences are the SameSite attribute, where Lax blocks cookies on cross-site POSTs and Strict on all cross-site requests, a CSRF token, and checking the Origin header. HttpOnly hides the cookie from JavaScript, Secure restricts it to HTTPS, Path and Domain scope it.\n\nTokens move the responsibility to the client and remove ambient authority, which is why they are the default for single-page apps and mobile clients. A bearer token is sent by anyone who holds it, so it must be short-lived and stored carefully: an in-memory copy plus a refresh token in an HttpOnly cookie is the common compromise. Tokens scale better, because the server validates a signature without a session lookup. Revoking one early is hard.',
          'Личность между запросами переносят два механизма, и моделируют они разное. Cookie — небольшая пара ключ-значение, которую браузер хранит для сайта и сам добавляет к подходящим запросам. Токен — непрозрачная или подписанная строка, которую приложение хранит, обычно в памяти, и отправляет явно в заголовке Authorization. Cookie моделируют сессию браузера: ими управляет браузер, сервер задаёт их через Set-Cookie, а браузер возвращает с каждым подходящим запросом.\n\nCookie уязвимы к CSRF: любой сайт может заставить браузер отправить форму на другой сайт, и cookie уедет вместе с ней. Защита — атрибут SameSite, где Lax блокирует cookie на кросс-сайтовых POST, а Strict на всех кросс-сайтовых запросах, плюс CSRF-токен и проверка заголовка Origin. HttpOnly прячет cookie от JavaScript, Secure ограничивает их HTTPS, Path и Domain задают область. Ничто из этого не заменяет защиту от CSRF само по себе.\n\nТокены переносят ответственность на клиента и убирают «окружающую» авторизацию, поэтому для SPA и мобильных клиентов они стали стандартом. Bearer-токен отправляет любой, кто им владеет, значит он должен быть короткоживущим и храниться аккуратно: копия в памяти плюс refresh-токен в HttpOnly-cookie — обычный компромисс. Токены лучше масштабируются, потому что сервер проверяет подпись без обращения к хранилищу сессий. Цена — отозвать stateless-токен до истечения трудно, а токен в localStorage можно украсть одним XSS.'
        ),
        bullets: [
          L('Cookies are ambient and arrive whether you want them or not; tokens are explicit.', 'Cookies приходят с запросом, хотите вы того или нет; токены отправляются явно.'),
          L('SameSite and a CSRF token are what protect cookie authentication.', 'SameSite и CSRF-токен — вот что защищает аутентификацию по cookie.'),
          L('HttpOnly hides a cookie from scripts, Secure restricts it to HTTPS.', 'HttpOnly прячет cookie от скриптов, Secure ограничивает их HTTPS.'),
          L('Stateless tokens scale well but revoke badly and leak easily.', 'Токены без состояния масштабируются, но плохо отзываются и легко утекают.'),
        ],
        code: `// the server sets a session cookie
Set-Cookie: sid=abc123; Path=/; HttpOnly; Secure; SameSite=Lax

// the client sends a bearer token instead
fetch('/api/profile', {
  headers: { Authorization: 'Bearer ' + accessToken },
});`,
        takeaway: L(
          'Cookies are sent automatically, tokens are sent on purpose, and that is the whole security difference.',
          'Cookies отправляются автоматически, токены — намеренно, и в этом вся разница в безопасности.'
        ),
      },
      {
        id: 'http-ch2-s3',
        title: L('Authentication schemes and CORS', 'Схемы аутентификации и CORS'),
        body: L(
          'The Authorization header carries credentials with a scheme prefix: Basic for base64-encoded user and password, Bearer for an opaque token or a JWT, Digest for the older challenge-response scheme. Basic over HTTPS is base64, not encryption, so it must never travel in the clear. A JWT is only one possible bearer token: the server must validate its signature and claims before trusting the payload.\n\nCORS is the rule the browser applies when a page on one origin calls another. The server declares which origins may read the response with Access-Control-Allow-Origin, and the browser enforces it, not the server. A simple request, a GET or POST with a limited set of headers, is sent directly, and the browser hides the response if headers do not allow it. A non-simple request, a custom header like Authorization or a PUT or DELETE, triggers a preflight: an OPTIONS request sent before the real one, asking which methods and headers are allowed.\n\nThe rules that trip people up are precise. With credentials, Access-Control-Allow-Origin must name an exact origin and never a wildcard, Access-Control-Allow-Credentials must be true, and the client must ask for credentials with credentials: include. Only the headers listed in Access-Control-Expose-Headers become readable to JavaScript. And CORS is not authorization: allowing an origin says nothing about the caller rights.',
          'Заголовок Authorization переносит учётные данные с префиксом схемы: Basic для пользователя и пароля в base64, Bearer для непрозрачного токена или JWT, Digest для старой схемы «запрос-ответ», Negotiate для Kerberos. Basic поверх HTTPS — это base64, а не шифрование, поэтому в открытом виде он ходить не должен. JWT — лишь один из возможных bearer-токенов: сервер обязан проверить подпись и claims, прежде чем доверять полезной нагрузке.\n\nCORS — это правило, которое браузер применяет, чтобы позволить странице с одного origin обратиться к другому. Сервер объявляет, каким origin разрешено читать ответ, через Access-Control-Allow-Origin, а обеспечивает это браузер, а не сервер. Простой запрос — GET или POST с ограниченным набором заголовков — уходит сразу, и браузер прячет ответ от страницы, если заголовки не разрешают. Непростой запрос — свой заголовок вроде Authorization или PUT, PATCH, DELETE — вызывает preflight: запрос OPTIONS перед настоящим, спрашивающий, какие методы и заголовки разрешены и как долго можно переиспользовать ответ.\n\nПравила, на которых чаще всего спотыкаются, очень точны. С учётными данными Access-Control-Allow-Origin должен называть конкретный origin и никогда не подстановочный знак, Access-Control-Allow-Credentials должен быть true, а клиент обязан запросить credentials: include. Читаемыми для JavaScript становятся только заголовки из Access-Control-Expose-Headers. И CORS — не авторизация: разрешение origin ничего не говорит о том, может ли вызывающий читать чужие данные.'
        ),
        bullets: [
          L('Authorization: Bearer is the default scheme for modern APIs.', 'Authorization: Bearer — схема по умолчанию для современных API.'),
          L('CORS is enforced by the browser, the server only declares the policy.', 'CORS обеспечивает браузер, сервер лишь объявляет политику.'),
          L('Custom headers and non-simple methods trigger an OPTIONS preflight.', 'Свои заголовки и непростые методы вызывают preflight через OPTIONS.'),
          L('Credentials forbid the wildcard origin and require an explicit origin list.', 'С учётными данными подстановочный знак запрещён, origin перечисляют явно.'),
        ],
        code: `OPTIONS /api/orders HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: authorization, content-type

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PATCH
Access-Control-Allow-Headers: authorization, content-type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 600`,
        takeaway: L(
          'CORS decides whether the page may read the response, authorization decides whether the caller may have the data.',
          'CORS решает, может ли страница прочитать ответ, а авторизация — может ли вызывающий получить данные.'
        ),
      },
    ],
  },
  {
    id: 'http-ch3',
    title: L('Caching and performance', 'Кэширование и производительность'),
    summary: L(
      'How Cache-Control directives define cache lifetimes, how validators turn a full download into a 304, and what CDNs, compression and connection reuse add to the performance budget.',
      'Как директивы Cache-Control задают сроки жизни кэша, как валидаторы превращают загрузку в 304 и что добавляют к бюджету производительности CDN, сжатие и переиспользование соединений.'
    ),
    sections: [
      {
        id: 'http-ch3-s1',
        title: L('Cache-Control and cache lifetimes', 'Cache-Control и сроки жизни кэша'),
        body: L(
          'Caching is the cheapest performance lever in HTTP: a cached answer costs the network nothing. The Cache-Control header on the response is the control surface, and every directive says who may store the answer and for how long. max-age=600 makes the response fresh for ten minutes, no-cache allows storage but demands revalidation before reuse, no-store forbids writing it to a disk cache, private forbids shared caches, and public allows them.\n\nThe distinction between no-cache and no-store causes real bugs. The name no-cache is a misnomer: it does not mean do not cache, it means do not reuse without asking. Only no-store genuinely forbids writing the response anywhere, and it is what you use for responses holding personal data. When a fresh browser tab instantly shows a response marked no-cache, that is the stored copy reused after revalidation.\n\nCaches are layered, and each layer reads its own directives. The browser cache, a proxy cache and a CDN edge all honour Cache-Control, but the CDN also honours s-maxage, which applies only to shared caches and overrides max-age there. The pattern s-maxage=600, max-age=0 suits a page that may be stale for the user but served from the edge. stale-while-revalidate lets a cache serve an expired answer and refresh it in the background.',
          'Кэширование — самый дешёвый рычаг производительности в HTTP, потому что кэшированный ответ не стоит сети ничего. Заголовок Cache-Control в ответе — современная поверхность управления, и каждая директива произносит фразу о том, кто может хранить ответ и как долго. max-age=600 означает свежесть на десять минут, no-cache — что ответ можно хранить, но перед повторным использованием надо перепроверить, no-store — что его нельзя писать ни в какой дисковый кэш, private — что общим кэшам нельзя, а public явно разрешает.\n\nРазличие между no-cache и no-store порождает настоящие баги. Имя no-cache вводит в заблуждение: оно значит не «не кэшировать», а «не использовать без проверки». Только no-store действительно запрещает запись ответа куда-либо, и его применяют к ответам с персональными или медицинскими данными. Когда свежая вкладка браузера мгновенно показывает ответ с пометкой no-cache, это сохранённая копия после успешной перепроверки, а не нарушение политики.\n\nКэши многослойны, и каждый слой читает свои директивы. Кэш браузера, промежуточный прокси и край CDN — все уважают Cache-Control, но CDN дополнительно уважает s-maxage, который действует только для общих кэшей и там перекрывает max-age. Схема s-maxage=600, max-age=0 стандартна для страницы, которая должна быть устаревшей для пользователя, но может раздаваться с края. stale-while-revalidate позволяет кэшу мгновенно отдать просроченный ответ и обновить его в фоне.'
        ),
        bullets: [
          L('no-cache means revalidate before reuse, no-store means never write it down.', 'no-cache — перепроверь перед повторным использованием, no-store — не записывай вообще.'),
          L('s-maxage applies to shared caches only and wins over max-age there.', 's-maxage действует только для общих кэшей и там важнее max-age.'),
          L('private forbids shared caches, public explicitly allows them.', 'private запрещает общие кэши, public явно их разрешает.'),
          L('stale-while-revalidate trades freshness for latency.', 'stale-while-revalidate меняет свежесть на задержку.'),
        ],
        code: `// cached in the browser for a minute, served from the CDN for ten
Cache-Control: public, max-age=60, s-maxage=600, stale-while-revalidate=30

// sensitive response: never written to any cache
Cache-Control: no-store`,
        takeaway: L(
          'Pick the directive from the sensitivity of the data and how stale it may be, not from habit.',
          'Выбирайте директиву по чувствительности данных и допустимой устареванию, а не по привычке.'
        ),
      },
      {
        id: 'http-ch3-s2',
        title: L('Validators, ETag and 304', 'Валидаторы, ETag и 304'),
        body: L(
          'A cache that expires every entry is a cache that re-downloads everything. Validators let a client ask has this changed in one cheap round trip. The server attaches an ETag, an opaque string that changes whenever the representation changes, and the client stores it next to the cached body. On the next request the client sends If-None-Match with that value; if the tag still matches, the server replies 304 Not Modified and the client reuses its stored copy.\n\nThere is a second, older validator: Last-Modified with If-Modified-Since. It is cheaper to compute but has one-second granularity, so a resource modified twice within the same second can produce a stale hit. ETag has no such limit and comes in two flavours: strong, where the bytes match, and weak, where the representation is only semantically equal. Only a strong validator may be used for range requests.\n\nIf-None-Match on GET and HEAD is the read case; If-Match and If-Unmodified-Since are the write case. A client that read a document at version 7 can send If-Match with that tag along with an update; if the document is now at version 8, the server must reject the write with 412 Precondition Failed. This optimistic concurrency check stops two clients from overwriting each other, and it costs one header instead of a lock.',
          'Кэш, у которого истекают все записи, — это кэш, который заново скачивает всё. Валидаторы позволяют клиенту одним дешёвым round trip спросить, изменилось ли. Сервер вешает ETag — непрозрачную строку, меняющуюся вместе с представлением, — а клиент хранит её рядом с кэшированным телом. При следующем запросе клиент шлёт If-None-Match с этим значением; если текущее представление имеет тот же тег, сервер отвечает 304 Not Modified без тела, и клиент берёт сохранённую копию.\n\nВторой, более старый валидатор — Last-Modified вместе с If-Modified-Since. Он дешевле в вычислении, но имеет гранулярность в одну секунду, поэтому ресурс, изменённый дважды за секунду, способен дать устаревший попадание. У ETag такого ограничения нет, и бывает он двух видов: сильный, когда байты совпадают, и слабый, когда представления лишь семантически равны. Сильный валидатор годится для range-запросов, слабый — нет, потому что слабое совпадение обещает эквивалентность, а не тождество.\n\nIf-None-Match у GET и HEAD — это случай чтения; If-Match и If-Unmodified-Since — случай записи. Клиент, прочитавший документ версии 7, может отправить If-Match с этим тегом вместе с обновлением; если документ уже версии 8, сервер обязан отклонить запись с 412 Precondition Failed. Такая проверка оптимистичной конкурентности — нативный для HTTP способ помешать двум клиентам затереть друг друга, и стоит она одного заголовка вместо блокировки.'
        ),
        bullets: [
          L('ETag with If-None-Match turns a full download into a cheap 304.', 'ETag вместе с If-None-Match превращает загрузку в дешёвый 304.'),
          L('A 304 carries no body, the client uses its stored copy.', '304 приходит без тела, клиент берёт сохранённую копию.'),
          L('A strong ETag means byte-identical, a weak one means semantically equal.', 'Сильный ETag — байт в байт, слабый — семантически равно.'),
          L('If-Match gives optimistic concurrency on updates.', 'If-Match даёт оптимистичную конкурентность при обновлении.'),
        ],
        code: `// first request
HTTP/1.1 200 OK
ETag: "v2-9f3a"
Cache-Control: max-age=0, must-revalidate

// second request
GET /articles/42 HTTP/1.1
If-None-Match: "v2-9f3a"

// response: nothing changed
HTTP/1.1 304 Not Modified
ETag: "v2-9f3a"`,
        takeaway: L(
          'A validator turns download it again into tell me if it changed, and that is the difference between a cache and a bandwidth bill.',
          'Валидатор превращает «скачай снова» в «скажи, изменилось ли», и это разница между кэшем и счётом за трафик.'
        ),
      },
      {
        id: 'http-ch3-s3',
        title: L('CDN, compression and connections', 'CDN, сжатие и соединения'),
        body: L(
          'A CDN is a network of edge servers that keeps copies of your content close to the user. It turns a 150 ms cross-continent round trip into a 10 ms local one, absorbs traffic spikes, and terminates TLS. The rule of thumb is to push everything cacheable to the edge: static assets with a content hash in the filename can be cached for a year and never need purging, because a new hash is a new URL.\n\nCompression is the cheapest bandwidth win available. Text formats such as HTML, CSS, JavaScript, JSON and SVG compress extremely well, often by 70 to 90 percent, while images do not. The Content-Encoding header with gzip, br for Brotli or zstd tells the client how the body was compressed, and the client decompresses transparently. Because compression only applies to what the client can handle, Accept-Encoding is mandatory in practice.\n\nConnection behaviour matters too. On HTTP/1.x the browser keeps about six sockets per origin and serialises requests on each of them, so a slow endpoint blocks the whole origin. On HTTP/2 many requests share one connection concurrently, removing that queueing. On HTTP/3 the transport is QUIC over UDP, so a lost packet affects one stream, not the whole connection. Practical tuning: explicit timeouts, reusing connections, and measuring the protocol your users get.',
          'CDN — это сеть краевых серверов, которые держат копии вашего контента ближе к пользователю. Он превращает кругосветный round trip на 150 мс в локальные 10 мс, поглощает всплески трафика и терминирует TLS, так что origin видит меньше рукопожатий. Правило большого пальца: всё кэшируемое нужно выносить на край. Статика с хешем содержимого в имени файла может храниться год и никогда не потребует сброса кэша, потому что новый хеш — это новый URL.\n\nСжатие — самая дешёвая победа по трафику. Текстовые форматы — HTML, CSS, JavaScript, JSON, SVG — сжимаются отлично, часто на 70–90 процентов, а картинки и уже сжатые данные не сжимаются. Заголовок Content-Encoding со значением gzip, br для Brotli или zstd говорит клиенту, чем сжато тело, и клиент распаковывает прозрачно. Поскольку сжатие применяется только к тому, что клиент умеет принимать, Accept-Encoding на практике обязателен: без него сервер отдаёт обычные байты, и экономия равна нулю.\n\nПоведение соединений тоже важно. В HTTP/1.x браузер держит около шести сокетов на origin и выполняет запросы в них последовательно, поэтому медленный эндпоинт блокирует весь origin. В HTTP/2 множество запросов делят одно соединение одновременно, и эта очередь исчезает. В HTTP/3 транспортом служит QUIC над UDP, потерянный пакет задевает один поток, а не соединение целиком. Практическая настройка: явные таймауты, переиспользование соединений и замер той версии протокола, которую действительно получают пользователи.'
        ),
        bullets: [
          L('A content hash in the filename makes an asset immutable and purge-free.', 'Хеш содержимого в имени файла делает ресурс неизменяемым и не требующим сброса кэша.'),
          L('gzip and br cut text payloads by 70 to 90 percent.', 'gzip и br сжимают текстовые тела на 70–90 процентов.'),
          L('HTTP/2 multiplexes, HTTP/3 removes head-of-line blocking entirely.', 'HTTP/2 мультиплексирует, HTTP/3 полностью снимает head-of-line blocking.'),
          L('Always measure the protocol version your users really get.', 'Всегда замеряйте версию протокола, которую получают реальные пользователи.'),
        ],
        code: `GET /assets/app.9f3a2c.js HTTP/2
Accept-Encoding: br, gzip

HTTP/2 200
content-encoding: br
cache-control: public, max-age=31536000, immutable`,
        takeaway: L(
          'Cache at the edge, compress the text and reuse connections: three lines that cover most of the performance budget.',
          'Кэш на краю, сжатие текста и переиспользование соединений — три строки закрывают большую часть бюджета производительности.'
        ),
      },
    ],
  },
  {
    id: 'http-ch4',
    title: L('API design in practice', 'Проектирование API на практике'),
    summary: L(
      'How to model resources and URLs, how to shape error bodies and version an API, and how rate limits, streaming and idempotency keys make the contract survivable.',
      'Как моделировать ресурсы и URL, как оформлять тела ошибок и версионировать API и как лимиты частоты, стриминг и ключи идемпотентности делают контракт живучим.'
    ),
    sections: [
      {
        id: 'http-ch4-s1',
        title: L('Modelling resources and URLs', 'Моделирование ресурсов и URL'),
        body: L(
          'An API is a contract between programs, so the contract should describe things rather than actions. The REST style models a system as resources identified by URIs: a collection at /orders, an item at /orders/42, a sub-collection at /orders/42/items. The method says what to do with the identified thing, since GET reads it, POST adds a member to the collection, PUT replaces the item, PATCH changes part of it and DELETE removes it.\n\nThe HTTP method carries semantics that clients, proxies and caches already understand. POST /orders creates a new member of the collection and answers 201 Created with a Location header. PUT /orders/42 replaces the whole item and should be idempotent. PATCH /orders/42 sends only the changed fields, or a patch document in one of the standard formats, JSON Patch from RFC 6902 or merge patch from RFC 7396. Mixing the styles, a POST that means update, breaks every generic client.\n\nNaming is where most APIs go wrong. Use plural nouns for collections and stable identifiers for items, keep the URL hierarchy shallow, and put filtering, sorting and pagination into the query string rather than the path. Changing the shape of a URL is a breaking change, so the shape is part of the public contract and should be designed once and kept for years.',
          'API — это контракт между программами, поэтому контракт должен описывать вещи, а не действия. REST-стиль моделирует систему как набор ресурсов, опознаваемых по URI: коллекция по адресу /orders, элемент по адресу /orders/42, подколлекция по адресу /orders/42/items. Метод говорит, что делать с опознанной сущностью: GET читает, POST добавляет элемент в коллекцию, PUT заменяет элемент, PATCH меняет его часть, DELETE удаляет. Глаголы в пути, вроде /createOrder, обычно означают, что модель построена вокруг RPC, а не вокруг ресурсов.\n\nМетод HTTP несёт семантику, которую клиенты, прокси и кэши уже понимают. POST /orders создаёт новый элемент коллекции и отвечает 201 Created с заголовком Location. PUT /orders/42 заменяет элемент целиком и должен быть идемпотентным. PATCH /orders/42 присылает только изменившиеся поля либо патч-документ в одном из стандартных форматов: JSON Patch из RFC 6902 или merge patch из RFC 7396. Смешение стилей, когда POST на самом деле означает обновление, ломает любой универсальный клиент и любой кэш в цепочке.\n\nИменование — место, где ошибаются чаще всего. Для коллекций используйте существительные во множественном числе, для элементов — устойчивые идентификаторы, иерархию URL держите неглубокой, а фильтрацию, сортировку и пагинацию выносите в query string. Изменение формы URL — ломающее изменение, поэтому форма является частью публичного контракта и должна быть продумана один раз и храниться годами.'
        ),
        bullets: [
          L('URLs name resources, the method says what to do with them.', 'URL называет ресурс, метод говорит, что с ним делать.'),
          L('POST to a collection creates, PUT to an item replaces it.', 'POST в коллекцию создаёт, PUT в элемент заменяет.'),
          L('Filtering, sorting and pagination belong in the query string.', 'Фильтрация, сортировка и пагинация живут в query string.'),
          L('The shape of a URL is a public contract and changing it breaks clients.', 'Форма URL — публичный контракт, и её изменение ломает клиентов.'),
        ],
        code: `GET    /api/orders?status=paid&sort=-createdAt&limit=20
GET    /api/orders/42
POST   /api/orders
PATCH  /api/orders/42
DELETE /api/orders/42`,
        takeaway: L(
          'Name resources in URLs and actions in methods, and generic clients plus every cache will work for you.',
          'Называйте ресурсы в URL, а действия — методами, и универсальные клиенты вместе с кэшами будут работать на вас.'
        ),
      },
      {
        id: 'http-ch4-s2',
        title: L('Errors, versioning and pagination', 'Ошибки, версионирование и пагинация'),
        body: L(
          'Error responses are part of the API and need a machine-readable shape. The status code gives the class and the body gives the detail. The modern standard is RFC 9457 Problem Details, a JSON object with type, a URI describing the problem kind, title, status, detail and extension members. Because type is a URI, a client can resolve documentation automatically, and extension members add a violations array for field errors.\n\nVersioning is a promise about which clients keep working. The path strategy, /v1/orders, is the most visible and easiest to deprecate, but it multiplies routes and pushes clients to stay on the old version. The header strategy, Accept: application/vnd.acme.v2+json, keeps one clean URL space but is invisible in logs. The query strategy, ?version=2, is easy to cache-bust but easy to forget. The deprecation plan matters more: announce it, measure who still calls the old version, and keep serving it.\n\nPagination exists because GET /orders returning ten thousand rows will eventually time out. Offset pagination is trivial, but unstable: if a row is inserted at the front, an item can appear twice or be skipped. Cursor pagination encodes the position of the last item in the sort order: stable under concurrent writes but opaque. Use offset pagination where page numbers are needed, and cursor pagination for feeds.',
          'Ответы с ошибками — часть API, а не afterthought, и им нужна машиночитаемая форма. Код статуса задаёт класс, тело даёт детали. Современный стандарт — RFC 9457 Problem Details: JSON-объект с полями type (URI, описывающий вид проблемы), title, status, detail и, по желанию, instance плюс расширения. Поскольку type — это URI, клиент может сам найти документацию по ошибке, а расширения позволяют добавить массив violations для ошибок полевой валидации.\n\nВерсионирование — обещание о том, какие клиенты продолжат работать. Доминируют три стратегии. Версия в пути, /v1/orders, самая заметная и самая удобная для устаревания, но она множит маршруты и подталкивает клиентов оставаться на старой версии. Версия в заголовке, Accept: application/vnd.acme.v2+json, держит чистое пространство URL, но не видна в логах. Версия в query, ?version=2, удобно сбрасывает кэш и так же легко забывается. План устаревания важнее механизма: объявите его, измерьте, кто ещё зовёт старую версию, и обслуживайте её, пока использование не упадёт.\n\nПагинация существует потому, что GET /orders, возвращающий десять тысяч строк, рано или поздно упрётся в таймаут. Offset-пагинация с limit и offset тривиальна, но нестабильна: если строка вставилась в начало, элемент может попасть в выдачу дважды или быть пропущен. Cursor-пагинация кодирует позицию последнего элемента в порядке сортировки, что устойчиво при параллельных записях, но непрозрачно. Берите offset-пагинацию для админских экранов, где нужны номера страниц, и cursor-пагинацию для лент и бесконечной прокрутки.'
        ),
        bullets: [
          L('RFC 9457 problem details give errors a stable machine-readable body.', 'RFC 9457 problem details дают ошибкам стабильное машиночитаемое тело.'),
          L('Path versioning is visible, header versioning is clean, query versioning is forgettable.', 'Версия в пути видна, в заголовке — чистая, в query — забывается.'),
          L('Offset pagination breaks under concurrent writes, cursor pagination does not.', 'Offset-пагинация ломается при параллельных записях, cursor-пагинация — нет.'),
          L('A deprecation needs a plan and usage metrics, not only a new version.', 'Устареванию нужен план и метрики использования, а не только новая версия.'),
        ],
        code: `HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json

{
  "type": "https://api.acme.dev/problems/validation-error",
  "title": "Validation failed",
  "status": 422,
  "detail": "The quantity must be positive.",
  "violations": [{ "field": "quantity", "message": "must be > 0" }]
}`,
        takeaway: L(
          'Decide the error body shape once and keep it stable, because clients depend on it more than on the codes.',
          'Решите форму тела ошибки один раз и держите её стабильной: клиенты зависят от неё больше, чем от кодов.'
        ),
      },
      {
        id: 'http-ch4-s3',
        title: L('Rate limits, streaming and idempotency keys', 'Лимиты частоты, стриминг и ключи идемпотентности'),
        body: L(
          'A public endpoint without limits is a denial-of-service tool. Rate limiting caps how many requests one client may send per window, and the response tells the client what to do next: 429 Too Many Requests with a Retry-After header in seconds is the standard answer, while RateLimit-Limit and RateLimit-Remaining make the budget visible. A service behind a CDN must count by API key, not by IP address.\n\nFor live data, two mechanisms replace polling. Server-Sent Events is one-directional: the server pushes text/event-stream messages over a plain HTTP response that stays open, and the browser reconnects on its own. WebSocket is bidirectional and starts with an HTTP upgrade: after a 101 Switching Protocols the connection becomes a full-duplex channel. Choose SSE for dashboards, notifications and progress, and WebSocket when the client must talk back on the same channel.\n\nFinally, non-idempotent operations need a way to survive a retry. The Idempotency-Key header carries a client-generated token, and the server stores the first response under that key and replays it for any later request with the same key. That turns a POST into something safe to retry after a timeout or a network switch, which is what mobile clients need. The rules: one key per logical operation, never per retry, and reject a reused key with a different body.',
          'Публичный эндпоинт без ограничений — это инструмент DoS с вашим именем на нём. Rate limiting ограничивает, сколько запросов один клиент может отправить за окно, а ответ говорит клиенту, что делать дальше. Стандартный ответ — 429 Too Many Requests с заголовком Retry-After в секундах, а RateLimit-Limit, RateLimit-Remaining и RateLimit-Reset делают бюджет видимым. Предел выбирают по самому слабому клиенту в цепочке, а сервис за CDN обязан считать по API-ключу, а не по IP-адресу.\n\nДля живых данных опрос заменяют два механизма. Server-Sent Events односторонний: сервер шлёт сообщения text/event-stream по обычному HTTP-ответу, который остаётся открытым, а браузер переподключается сам. Это тривиально реализуется поверх любого HTTP-стека и работает через обычные прокси. WebSocket двусторонний и начинается с апгрейда HTTP: после 101 Switching Protocols соединение становится полнодуплексным каналом, способным нести двоичные кадры. Берите SSE для дашбордов, уведомлений и прогресса, а WebSocket — когда клиент должен отвечать в том же канале.\n\nНаконец, неидемпотентным операциям нужен способ пережить повтор. Заголовок Idempotency-Key несёт сгенерированный клиентом уникальный токен, а сервер хранит первый ответ под этим ключом и воспроизводит его для любого последующего запроса с тем же ключом. Так POST превращается в то, что безопасно повторить после таймаута или смены сети. Правила: один ключ на логическую операцию и никогда на попытку, а повторно использованный ключ с другим телом отклоняется.'
        ),
        bullets: [
          L('429 with Retry-After tells the client exactly when to come back.', '429 вместе с Retry-After говорит клиенту, когда вернуться.'),
          L('SSE is one-directional over plain HTTP, WebSocket is bidirectional.', 'SSE — односторонний поток по обычному HTTP, WebSocket — двусторонний.'),
          L('An idempotency key makes a POST safe to retry.', 'Ключ идемпотентности делает POST безопасным для повтора.'),
          L('One key per logical operation, never one per attempt.', 'Один ключ на логическую операцию и никогда — на попытку.'),
        ],
        code: `// retryable payment request
POST /api/payments HTTP/1.1
Idempotency-Key: 9f3a2c-order-42
Content-Type: application/json

{"amount": 1200, "currency": "EUR"}`,
        takeaway: L(
          'Rate limit what you expose, stream what changes, and make every write retryable with a key.',
          'Ограничивайте частоту на публичном, стримьте то, что меняется, и делайте любую запись повторяемой с ключом.'
        ),
      },
    ],
  },
];
