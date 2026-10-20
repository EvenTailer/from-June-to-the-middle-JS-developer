import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpModule: Module = {
  id: 'http',
  title: L('HTTP & Networking', 'HTTP и сеть'),
  description: L('HTTP basics, codes, HTTPS, CORS, WebSocket, DNS, TCP/IP, proxies.', 'Основы HTTP, коды, HTTPS, CORS, WebSocket, DNS, TCP/IP, прокси.'),
  lessons: [
    { id: 'http-001', title: L('HTTP overview', 'Обзор HTTP'), question: L('What is HTTP?', 'Что такое HTTP?'), answer: L('Application-layer request/response protocol for transferring hypermedia. Stateless, text-based (HTTP/1.x), runs over TCP (or QUIC for HTTP/3).', 'Протокол прикладного уровня запрос/ответ для передачи гипермедиа. Без состояния, текстовый (HTTP/1.x), работает поверх TCP (или QUIC для HTTP/3).') },
    { id: 'http-002', title: L('Client-server model', 'Модель клиент-сервер'), question: L('How does HTTP client-server work?', 'Как работает модель клиент-сервер в HTTP?'), answer: L('Client opens connection, sends request, server processes and returns response with status, headers, body. Connection may be reused (keep-alive).', 'Клиент открывает соединение, отправляет запрос, сервер обрабатывает и возвращает ответ со статусом, заголовками, телом. Соединение может переиспользоваться (keep-alive).') },
    { id: 'http-003', title: L('Request structure', 'Структура запроса'), question: L('What are parts of an HTTP request?', 'Из каких частей состоит HTTP-запрос?'), answer: L('Request line (method, target, version), headers, blank line, optional body.', 'Строка запроса (метод, цель, версия), заголовки, пустая строка, необязательное тело.') },
    { id: 'http-004', title: L('Response structure', 'Структура ответа'), question: L('What are parts of an HTTP response?', 'Из каких частей состоит HTTP-ответ?'), answer: L('Status line (version, code, reason), headers, blank line, optional body.', 'Строка статуса (версия, код, причина), заголовки, пустая строка, необязательное тело.') },
    { id: 'http-005', title: L('HTTP versions', 'Версии HTTP'), question: L('Major HTTP versions?', 'Основные версии HTTP?'), answer: L('HTTP/0.9 (GET only), HTTP/1.0, HTTP/1.1 (keep-alive, chunked), HTTP/2 (binary, multiplex), HTTP/3 (QUIC/UDP).', 'HTTP/0.9 (только GET), HTTP/1.0, HTTP/1.1 (keep-alive, chunked), HTTP/2 (бинарный, мультиплекс), HTTP/3 (QUIC/UDP).') },
    { id: 'http-006', title: L('GET method', 'Метод GET'), question: L('What is GET?', 'Что такое GET?'), answer: L('Retrieve a resource. No body by spec. Safe and idempotent. Cacheable.', 'Получение ресурса. По спецификации без тела. Безопасный и идемпотентный. Кэшируемый.') },
    { id: 'http-007', title: L('POST method', 'Метод POST'), question: L('What is POST?', 'Что такое POST?'), answer: L('Submit data to create/process a resource. Not idempotent by default. Body contains payload.', 'Отправка данных для создания/обработки ресурса. По умолчанию не идемпотентный. Тело содержит полезную нагрузку.') },
    { id: 'http-008', title: L('PUT method', 'Метод PUT'), question: L('What is PUT?', 'Что такое PUT?'), answer: L('Replace resource at target URI with request body. Idempotent. Creates if absent (if allowed).', 'Заменяет ресурс по URI телом запроса. Идемпотентный. Создаёт при отсутствии (если разрешено).') },
    { id: 'http-009', title: L('PATCH method', 'Метод PATCH'), question: L('What is PATCH?', 'Что такое PATCH?'), answer: L('Apply partial modifications to a resource. Not necessarily idempotent. Body is patch document (JSON Patch, merge patch).', 'Применяет частичные изменения к ресурсу. Не обязательно идемпотентный. Тело — patch-документ (JSON Patch, merge patch).') },
    { id: 'http-010', title: L('DELETE method', 'Метод DELETE'), question: L('What is DELETE?', 'Что такое DELETE?'), answer: L('Remove resource. Idempotent. May return 204 No Content or 200 with body.', 'Удаляет ресурс. Идемпотентный. Может вернуть 204 No Content или 200 с телом.') },
    { id: 'http-011', title: L('HEAD method', 'Метод HEAD'), question: L('What is HEAD?', 'Что такое HEAD?'), answer: L('Like GET but returns only headers, no body. Used to check existence/metadata. Safe and idempotent.', 'Как GET, но возвращает только заголовки без тела. Используется для проверки существования/метаданных. Безопасный и идемпотентный.') },
    { id: 'http-012', title: L('OPTIONS method', 'Метод OPTIONS'), question: L('What is OPTIONS?', 'Что такое OPTIONS?'), answer: L('Describe communication options for target resource. Used for CORS preflight. Returns Allow header.', 'Описывает доступные опции для ресурса. Используется для CORS preflight. Возвращает заголовок Allow.') },
    { id: 'http-013', title: L('Idempotency', 'Идемпотентность'), question: L('What is idempotency in HTTP?', 'Что такое идемпотентность в HTTP?'), answer: L('Same request repeated yields same server state. GET, PUT, DELETE, HEAD, OPTIONS, TRACE are idempotent; POST/PATCH not guaranteed.', 'Повтор того же запроса даёт то же состояние сервера. GET, PUT, DELETE, HEAD, OPTIONS, TRACE идемпотентны; POST/PATCH не гарантированно.') },
    { id: 'http-014', title: L('Status code groups', 'Группы статус-кодов'), question: L('Status code classes?', 'Классы статус-кодов?'), answer: L('1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error.', '1xx информационные, 2xx успех, 3xx перенаправление, 4xx ошибка клиента, 5xx ошибка сервера.') },
    { id: 'http-015', title: L('2xx success', '2xx успех'), question: L('Common 2xx codes?', 'Частые коды 2xx?'), answer: L('200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content.', '200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content.') },
    { id: 'http-016', title: L('3xx redirects', '3xx перенаправления'), question: L('Common 3xx codes?', 'Частые коды 3xx?'), answer: L('301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified, 307 Temporary Redirect, 308 Permanent Redirect.', '301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified, 307 Temporary Redirect, 308 Permanent Redirect.') },
    { id: 'http-017', title: L('4xx client errors', '4xx ошибки клиента'), question: L('Common 4xx codes?', 'Частые коды 4xx?'), answer: L('400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 410 Gone, 422 Unprocessable Entity, 429 Too Many Requests.', '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 410 Gone, 422 Unprocessable Entity, 429 Too Many Requests.') },
    { id: 'http-018', title: L('5xx server errors', '5xx ошибки сервера'), question: L('Common 5xx codes?', 'Частые коды 5xx?'), answer: L('500 Internal Server Error, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.', '500 Internal Server Error, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.') },
    { id: 'http-019', title: L('304 Not Modified', '304 Not Modified'), question: L('What is 304?', 'Что такое 304?'), answer: L('Conditional request: resource unchanged, client uses cached copy. No body.', 'Условный запрос: ресурс не изменился, клиент использует кэш. Без тела.') },
    { id: 'http-020', title: L('Content-Type', 'Content-Type'), question: L('What is Content-Type?', 'Что такое Content-Type?'), answer: L('Media type of body: application/json, text/html, multipart/form-data, application/x-www-form-urlencoded.', 'Тип носителя тела: application/json, text/html, multipart/form-data, application/x-www-form-urlencoded.') },
    { id: 'http-021', title: L('Authorization', 'Authorization'), question: L('What is Authorization header?', 'Что такое заголовок Authorization?'), answer: L('Carries credentials: Basic, Bearer token, etc.', 'Передаёт учётные данные: Basic, Bearer token и т. д.') },
    { id: 'http-022', title: L('Cookie header', 'Заголовок Cookie'), question: L('How cookies sent?', 'Как отправляются cookies?'), answer: L('Browser sends Cookie header with name=value pairs. Server sets via Set-Cookie response header.', 'Браузер отправляет заголовок Cookie с парами name=value. Сервер задаёт через заголовок ответа Set-Cookie.') },
    { id: 'http-023', title: L('Cache-Control', 'Cache-Control'), question: L('What is Cache-Control?', 'Что такое Cache-Control?'), answer: L('Directives: max-age, no-cache, no-store, public, private, immutable, s-maxage, stale-while-revalidate.', 'Директивы: max-age, no-cache, no-store, public, private, immutable, s-maxage, stale-while-revalidate.') },
    { id: 'http-024', title: L('ETag', 'ETag'), question: L('What is ETag?', 'Что такое ETag?'), answer: L('Entity tag for conditional requests. Strong/weak. Client sends If-None-Match; server returns 304 if match.', 'Тег сущности для условных запросов. Сильный/слабый. Клиент отправляет If-None-Match; сервер возвращает 304 при совпадении.') },
    { id: 'http-025', title: L('Content-Length', 'Content-Length'), question: L('What is Content-Length?', 'Что такое Content-Length?'), answer: L('Size of body in bytes. Used to delimit message. Mutually exclusive with chunked transfer encoding.', 'Размер тела в байтах. Используется для определения границ сообщения. Взаимоисключается с chunked transfer encoding.') },
    { id: 'http-026', title: L('Connection keep-alive', 'Connection keep-alive'), question: L('What is keep-alive?', 'Что такое keep-alive?'), answer: L('Reuse TCP connection for multiple HTTP requests. Default in HTTP/1.1. Reduces latency.', 'Переиспользование TCP-соединения для нескольких HTTP-запросов. По умолчанию в HTTP/1.1. Снижает задержку.') },
    { id: 'http-027', title: L('CORS basics', 'Основы CORS'), question: L('What is CORS?', 'Что такое CORS?'), answer: L('Browser mechanism allowing cross-origin requests when server returns Access-Control-Allow-Origin. Enforced by browser, not server.', 'Механизм браузера, разрешающий кросс-доменные запросы при наличии Access-Control-Allow-Origin. Принудительно применяется браузером, не сервером.') },
    { id: 'http-028', title: L('Preflight', 'Preflight'), question: L('When is preflight sent?', 'Когда отправляется preflight?'), answer: L('For non-simple requests (custom headers, PUT/PATCH/DELETE, JSON content type). Browser sends OPTIONS first.', 'Для не-простых запросов (пользовательские заголовки, PUT/PATCH/DELETE, JSON content-type). Браузер сначала отправляет OPTIONS.') },
    { id: 'http-029', title: L('CORS headers', 'Заголовки CORS'), question: L('Key CORS headers?', 'Ключевые CORS-заголовки?'), answer: L('Access-Control-Allow-Origin, -Methods, -Headers, -Credentials, -Max-Age, -Expose-Headers.', 'Access-Control-Allow-Origin, -Methods, -Headers, -Credentials, -Max-Age, -Expose-Headers.') },
    { id: 'http-030', title: L('Credentials mode', 'Режим credentials'), question: L('CORS with credentials?', 'CORS с учётными данными?'), answer: L('Server must set Allow-Credentials: true and specific origin (not *). Client sets credentials: include.', 'Сервер должен установить Allow-Credentials: true и конкретный origin (не *). Клиент задаёт credentials: include.') },
    { id: 'http-031', title: L('HTTPS', 'HTTPS'), question: L('What is HTTPS?', 'Что такое HTTPS?'), answer: L('HTTP over TLS. Encrypts payload, authenticates server via certificate, ensures integrity.', 'HTTP поверх TLS. Шифрует полезную нагрузку, аутентифицирует сервер через сертификат, обеспечивает целостность.') },
    { id: 'http-032', title: L('TLS handshake', 'Рукопожатие TLS'), question: L('How TLS handshake works?', 'Как работает рукопожатие TLS?'), answer: L('Client/server agree protocol version, cipher suite, authenticate server certificate, derive session keys.', 'Клиент и сервер согласуют версию протокола, набор шифров, аутентифицируют сертификат сервера, выводят сеансовые ключи.') },
    { id: 'http-033', title: L('Certificates', 'Сертификаты'), question: L('What is X.509 certificate?', 'Что такое сертификат X.509?'), answer: L('Binds public key to identity, signed by CA. Chain of trust to root CA. Includes SAN, validity, key usage.', 'Связывает открытый ключ с идентичностью, подписан ЦС. Цепочка доверия до корневого ЦС. Включает SAN, срок действия, использование ключа.') },
    { id: 'http-034', title: L('HSTS', 'HSTS'), question: L('What is HSTS?', 'Что такое HSTS?'), answer: L('Strict-Transport-Security header forces HTTPS. includeSubDomains and preload. Prevents downgrade attacks.', 'Заголовок Strict-Transport-Security принуждает HTTPS. includeSubDomains и preload. Предотвращает атаки понижения.') },
    { id: 'http-035', title: L('Cookie attributes', 'Атрибуты cookie'), question: L('Key cookie attributes?', 'Ключевые атрибуты cookie?'), answer: L('Domain, Path, Expires/Max-Age, Secure, HttpOnly, SameSite.', 'Domain, Path, Expires/Max-Age, Secure, HttpOnly, SameSite.') },
    { id: 'http-036', title: L('SameSite', 'SameSite'), question: L('SameSite values?', 'Значения SameSite?'), answer: L('Strict: no cross-site. Lax: top-level navigations. None: all (requires Secure). Mitigates CSRF.', 'Strict: без кросс-сайта. Lax: только верхнеуровневые навигации. None: все (требует Secure). Снижает CSRF.') },
    { id: 'http-037', title: L('HttpOnly/Secure', 'HttpOnly/Secure'), question: L('HttpOnly and Secure?', 'HttpOnly и Secure?'), answer: L('HttpOnly blocks JS access (XSS mitigation). Secure sends cookie only over HTTPS.', 'HttpOnly запрещает доступ из JS (снижение XSS). Secure отправляет cookie только по HTTPS.') },
    { id: 'http-038', title: L('JWT', 'JWT'), question: L('What is JWT?', 'Что такое JWT?'), answer: L('JSON Web Token: header.payload.signature. Stateless claims. Verify signature. Avoid large payloads; short expiry + refresh.', 'JSON Web Token: header.payload.signature. Stateless-claims. Проверяйте подпись. Избегайте больших payload; короткий срок + refresh.') },
    { id: 'http-039', title: L('Session vs token', 'Сессия vs токен'), question: L('Session cookies vs tokens?', 'Сессионные cookies vs токены?'), answer: L('Session: server-side state, httpOnly cookie, easy revoke. Token: stateless, scalable, harder revoke, XSS if localStorage.', 'Сессия: состояние на сервере, httpOnly cookie, легко отозвать. Токен: stateless, масштабируемо, сложнее отозвать, XSS при localStorage.') },
    { id: 'http-040', title: L('OAuth2 basics', 'Основы OAuth2'), question: L('OAuth2 core concepts?', 'Ключевые концепции OAuth2?'), answer: L('Authorization code flow with PKCE for SPAs. Access + refresh tokens. Scopes, redirect URIs, client registration.', 'Authorization code flow с PKCE для SPA. Access + refresh tokens. Scopes, redirect URI, регистрация клиента.') },
    { id: 'http-041', title: L('HTTP caching fresh', 'Свежесть кэша'), question: L('Freshness lifetime?', 'Время свежести?'), answer: L('max-age defines how long response is fresh without revalidation. s-maxage for shared caches.', 'max-age задаёт, как долго ответ свежий без ревалидации. s-maxage для общих кэшей.') },
    { id: 'http-042', title: L('CDN', 'CDN'), question: L('What is CDN?', 'Что такое CDN?'), answer: L('Geographically distributed edge servers cache content closer to users, reducing latency and origin load.', 'Географически распределённые edge-серверы кэшируют контент ближе к пользователям, снижая задержку и нагрузку на origin.') },
    { id: 'http-043', title: L('no-store/no-cache', 'no-store/no-cache'), question: L('no-store vs no-cache?', 'no-store vs no-cache?'), answer: L('no-store: never store. no-cache: store but revalidate before use.', 'no-store: никогда не хранить. no-cache: хранить, но ревалидировать перед использованием.') },
    { id: 'http-044', title: L('HTTP/2 multiplexing', 'Мультиплексирование HTTP/2'), question: L('HTTP/2 multiplexing?', 'Мультиплексирование HTTP/2?'), answer: L('Multiple streams over single TCP connection, avoiding head-of-line blocking at HTTP level.', 'Несколько потоков по одному TCP-соединению, избегая head-of-line blocking на уровне HTTP.') },
    { id: 'http-045', title: L('HTTP/3 QUIC', 'HTTP/3 QUIC'), question: L('What is HTTP/3?', 'Что такое HTTP/3?'), answer: L('HTTP over QUIC (UDP). User-space congestion control, faster handshakes, no TCP head-of-line blocking.', 'HTTP поверх QUIC (UDP). Управление перегрузкой в user-space, быстрее рукопожатия, нет TCP head-of-line blocking.') },
    { id: 'http-046', title: L('REST resource', 'REST-ресурс'), question: L('REST resource concept?', 'Концепция REST-ресурса?'), answer: L('Everything is a resource identified by URI. Manipulate via representations (JSON) using standard methods.', 'Всё — ресурс, идентифицируемый URI. Манипуляция через представления (JSON) стандартными методами.') },
    { id: 'http-047', title: L('REST method mapping', 'Маппинг методов REST'), question: L('CRUD to HTTP methods?', 'CRUD к HTTP-методам?'), answer: L('Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.', 'Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.') },
    { id: 'http-048', title: L('WebSocket handshake', 'Рукопожатие WebSocket'), question: L('How WebSocket starts?', 'Как начинается WebSocket?'), answer: L('HTTP Upgrade request with Sec-WebSocket-Key; server responds 101 Switching Protocols; connection becomes WS.', 'HTTP Upgrade-запрос с Sec-WebSocket-Key; сервер отвечает 101 Switching Protocols; соединение становится WS.') },
    { id: 'http-049', title: L('SSE', 'SSE'), question: L('What is Server-Sent Events?', 'Что такое Server-Sent Events?'), answer: L('One-way server-to-client stream over HTTP with text/event-stream. Auto-reconnect, event IDs. Simpler than WS for push.', 'Односторонний поток сервер→клиент по HTTP с text/event-stream. Автопереподключение, ID событий. Проще WS для push.') },
    { id: 'http-050', title: L('DNS resolution', 'Разрешение DNS'), question: L('How DNS works?', 'Как работает DNS?'), answer: L('Hostname to IP via recursive resolver, root/TLD/authoritative servers. Cached by TTL.', 'Имя хоста в IP через рекурсивный резолвер, root/TLD/authoritative серверы. Кэшируется по TTL.') },
  ],
  quiz: [
    {
      id: 'http-q01',
      question: L('What kind of protocol is HTTP?', 'Что такое HTTP с точки зрения уровня?'),
      options: [
        L('A transport-layer protocol that replaces TCP', 'Транспортный протокол, заменяющий TCP'),
        L('An application-layer, stateless request/response protocol', 'Протокол прикладного уровня без состояния, модель запрос-ответ'),
        L('A binary protocol that always encrypts the payload', 'Бинарный протокол, всегда шифрующий полезную нагрузку'),
        L('A peer-to-peer protocol where clients query each other', 'Одноранговый протокол, где клиенты опрашивают друг друга'),
      ],
      correctIndex: 1,
      explanation: L(
        'HTTP is an application-layer protocol: the client sends a request and the server replies with a status, headers and an optional body. Each request is independent, so HTTP itself keeps no session state. The traps confuse it with TCP and QUIC (transport) or with TLS (encryption).',
        'HTTP — протокол прикладного уровня: клиент отправляет запрос, сервер отвечает статусом, заголовками и необязательным телом. Каждый запрос независим, состояние сессии HTTP сам не хранит. Ловушки — спутать HTTP с TCP и QUIC (транспорт) или с TLS (шифрование).'
      ),
    },
    {
      id: 'http-q02',
      question: L('How did HTTP/1.1 change connection handling compared to HTTP/1.0?', 'Как HTTP/1.1 изменил работу с соединениями по сравнению с HTTP/1.0?'),
      options: [
        L('Every response required a fresh TCP connection by default', 'По умолчанию каждый ответ требовал нового TCP-соединения'),
        L('The protocol switched from TCP to UDP for lower latency', 'Протокол перешёл с TCP на UDP ради меньшей задержки'),
        L('Persistent connections became the default, so one connection carries many requests', 'Постоянные соединения стали значением по умолчанию, одно соединение несёт много запросов'),
        L('Responses started to be compressed by the protocol itself', 'Ответы начали сжиматься самим протоколом'),
      ],
      correctIndex: 2,
      explanation: L(
        'In HTTP/1.1 persistent connections are the default, so one TCP connection carries many requests and each round trip saves a handshake. HTTP/1.0 closed the connection after every response. UDP belongs to HTTP/3, and compression is a separate content-encoding concern.',
        'В HTTP/1.1 постоянные соединения стали значением по умолчанию, поэтому по одному TCP-соединению идёт много запросов и не нужно новое рукопожатие каждый раз. HTTP/1.0 закрывал соединение после каждого ответа. UDP — это HTTP/3, а сжатие решается отдельным заголовком Content-Encoding.'
      ),
    },
    {
      id: 'http-q03',
      question: L('What is the main HTTP/2 improvement over HTTP/1.1 for parallel requests?', 'Главное преимущество HTTP/2 над HTTP/1.1 для параллельных запросов?'),
      options: [
        L('It removed the request/response model in favour of publish/subscribe', 'Отменил модель запрос-ответ в пользу publish/subscribe'),
        L('It added end-to-end encryption as a mandatory part of the protocol', 'Добавил сквозное шифрование как обязательную часть протокола'),
        L('It rewrote HTTP/1.1 sites automatically on upgrade', 'Автоматически переписывал сайты с HTTP/1.1 при обновлении'),
        L('It frames messages in binary and multiplexes many streams over one TCP connection', 'Фреймит сообщения в бинарном виде и мультиплексирует потоки по одному TCP-соединению'),
      ],
      correctIndex: 3,
      explanation: L(
        'HTTP/2 uses binary framing and multiplexes many independent streams over a single TCP connection, which removes head-of-line blocking at the HTTP level. TLS is still used, the model is still request/response, and version negotiation is handled by the server, not by rewriting sites.',
        'HTTP/2 использует бинарный фрейминг и мультиплексирует независимые потоки по одному TCP-соединению, убирая head-of-line blocking на уровне HTTP. TLS всё ещё используется, модель остаётся запрос-ответ, а смену версии решает сервер, а не переписывание сайтов.'
      ),
    },
    {
      id: 'http-q04',
      question: L('Which transport does HTTP/3 run on?', 'На каком транспорте работает HTTP/3?'),
      options: [
        L('QUIC over UDP', 'QUIC поверх UDP'),
        L('TCP with TLS 1.3', 'TCP с TLS 1.3'),
        L('SCTP over IP', 'SCTP поверх IP'),
        L('HTTP/2 framing carried over TLS', 'Фрейминг HTTP/2 поверх TLS'),
      ],
      correctIndex: 0,
      explanation: L(
        'HTTP/3 runs over QUIC, which is built on UDP and integrates encryption and congestion control into the transport. That removes TCP-level head-of-line blocking and speeds up the handshake. TCP-based HTTP/2 is still HTTP/2, not HTTP/3.',
        'HTTP/3 работает поверх QUIC, который построен на UDP и включает шифрование и управление перегрузкой в сам транспорт. Это убирает head-of-line blocking на уровне TCP и ускоряет рукопожатие. HTTP/2 поверх TCP — это всё ещё HTTP/2, а не HTTP/3.'
      ),
    },
    {
      id: 'http-q05',
      question: L('Which HTTP method is safe, idempotent and cacheable by definition?', 'Какой HTTP-метод по определению безопасен, идемпотентен и кэшируем?'),
      options: [
        L('POST', 'POST'),
        L('GET', 'GET'),
        L('PATCH', 'PATCH'),
        L('DELETE', 'DELETE'),
      ],
      correctIndex: 1,
      explanation: L(
        'GET only reads a resource: it is safe, it is idempotent and it is cacheable by default. POST, PATCH and DELETE either create or change state, and none of them is cacheable unless the server explicitly allows it.',
        'GET только читает ресурс: он безопасный, идемпотентный и по умолчанию кэшируемый. POST, PATCH и DELETE создают или меняют состояние и не кэшируются, если сервер явно не разрешил.'
      ),
    },
    {
      id: 'http-q06',
      question: L('Which statement about POST is correct?', 'Какое утверждение о POST верно?'),
      options: [
        L('It is idempotent, so retrying it never duplicates data', 'Он идемпотентен, поэтому повтор никогда не создаст дубликаты'),
        L('It must not contain a request body', 'Он не должен содержать тело запроса'),
        L('It creates or processes a resource and is not idempotent by default', 'Он создаёт или обрабатывает ресурс и по умолчанию не идемпотентен'),
        L('It is cacheable by default', 'Он кэшируется по умолчанию'),
      ],
      correctIndex: 2,
      explanation: L(
        'POST sends a payload to create or process something, so repeating it can produce a second resource. That is why clients need an idempotency key to retry safely. POST does carry a body, and it is not cacheable unless the response says so.',
        'POST отправляет полезную нагрузку, чтобы создать или обработать что-то, поэтому повтор может создать второй ресурс — отсюда нужна идемпотентная ключевая строка для безопасных повторов. Тело у POST есть, а кэшируется он только по явному указанию сервера.'
      ),
    },
    {
      id: 'http-q07',
      question: L('What does PUT do to the target resource?', 'Что делает PUT с целевым ресурсом?'),
      options: [
        L('It applies a partial patch to it', 'Применяет к нему частичный патч'),
        L('It fetches only the metadata of the resource', 'Запрашивает только метаданные ресурса'),
        L('It creates a nested collection inside the resource', 'Создаёт внутри ресурса вложенную коллекцию'),
        L('It replaces the whole representation stored at that URI', 'Заменяет всё представление, хранящееся по этому URI'),
      ],
      correctIndex: 3,
      explanation: L(
        'PUT replaces the representation stored at the URI with the body of the request, so sending the same PUT twice leaves the same state: it is idempotent. PATCH is the partial-update method, HEAD returns only headers, and collections get their own URIs.',
        'PUT заменяет представление, хранящееся по URI, телом запроса, поэтому два одинаковых PUT дают одно и то же состояние — метод идемпотентен. PATCH — это частичное обновление, HEAD возвращает только заголовки, а коллекциям выделяют собственные URI.'
      ),
    },
    {
      id: 'http-q08',
      question: L('Which statement about PATCH is true?', 'Какое утверждение о PATCH верно?'),
      options: [
        L('It is idempotent only if the server implements it that way', 'Он идемпотентен только если так реализует сервер'),
        L('It replaces the entire resource and always returns 204', 'Он заменяет весь ресурс и всегда возвращает 204'),
        L('It can only be used to read a resource', 'Его можно использовать только для чтения ресурса'),
        L('It is always idempotent', 'Он всегда идемпотентен'),
      ],
      correctIndex: 0,
      explanation: L(
        'PATCH applies a partial document, so repeating it may apply the same change twice, for example adding a list entry again. The specification lets a server declare a patch method idempotent, but by default it is not. PUT is the idempotent full-replacement method.',
        'PATCH применяет частичный документ, поэтому повтор может применить изменение дважды, например добавить элемент списка ещё раз. Спецификация позволяет серверу объявить PATCH идемпотентным, но по умолчанию он не такой. Идемпотентная полная замена — это PUT.'
      ),
    },
    {
      id: 'http-q09',
      question: L('Which response is a perfectly normal result of a successful DELETE?', 'Какой ответ — совершенно нормальный результат успешного DELETE?'),
      options: [
        L('409 Conflict', '409 Conflict'),
        L('204 No Content', '204 No Content'),
        L('304 Not Modified', '304 Not Modified'),
        L('412 Precondition Failed', '412 Precondition Failed'),
      ],
      correctIndex: 1,
      explanation: L(
        'DELETE removes the resource and often answers 204 No Content, or 200 with a body describing what happened. Repeating DELETE is idempotent because the resource stays deleted. The other codes signal a conflict, cache validation or a failed precondition, not a plain successful delete.',
        'DELETE удаляет ресурс и часто отвечает 204 No Content, либо 200 с телом, описывающим результат. Повтор DELETE идемпотентен: ресурс остаётся удалённым. Остальные коды говорят о конфликте, валидации кэша или не выполненном предусловии, а не об успешном удалении.'
      ),
    },
    {
      id: 'http-q10',
      question: L('How does a HEAD request differ from GET?', 'Чем HEAD отличается от GET?'),
      options: [
        L('It returns only the body and no headers', 'Возвращает только тело без заголовков'),
        L('It asks the server to delete the resource', 'Просит сервер удалить ресурс'),
        L('It returns the same headers as GET but no body', 'Возвращает те же заголовки, что и GET, но без тела'),
        L('It upgrades the connection to WebSocket', 'Переводит соединение в WebSocket'),
      ],
      correctIndex: 2,
      explanation: L(
        'HEAD is GET without the body: the server sends the status line and headers, including Content-Length, so a client can check existence and metadata cheaply. It never deletes anything, and the WebSocket upgrade is a separate mechanism with its own handshake.',
        'HEAD — это GET без тела: сервер отправляет строку статуса и заголовки, включая Content-Length, поэтому клиент дёшево проверяет существование и метаданные. Ничего он не удаляет, а апгрейд в WebSocket — отдельный механизм со своим рукопожатием.'
      ),
    },
    {
      id: 'http-q11',
      question: L('What is OPTIONS used for?', 'Для чего используется OPTIONS?'),
      options: [
        L('Overriding the Content-Type of a request body', 'Переопределения Content-Type тела запроса'),
        L('Opening a full-duplex WebSocket connection', 'Открытия полнодуплексного соединения WebSocket'),
        L('Forcing a resource to be revalidated', 'Принудительной ревалидации ресурса'),
        L('Asking the server which communication options the resource supports', 'Запроса серверу, какие варианты обмена поддерживает ресурс'),
      ],
      correctIndex: 3,
      explanation: L(
        'OPTIONS describes the communication options for a target resource and typically returns an Allow header listing the supported methods. The browser also sends OPTIONS as a CORS preflight, which is why it shows up so often in logs. The method is safe and idempotent.',
        'OPTIONS описывает варианты обмена для целевого ресурса и обычно возвращает заголовок Allow со списком поддерживаемых методов. Браузер тоже отправляет OPTIONS как CORS preflight, поэтому он так часто встречается в логах. Метод безопасный и идемпотентный.'
      ),
    },
    {
      id: 'http-q12',
      question: L('What does it mean for an HTTP method to be idempotent?', 'Что означает идемпотентность HTTP-метода?'),
      options: [
        L('Repeating the request leaves the server in the same state as sending it once', 'Повтор запроса оставляет сервер в том же состоянии, что и один запрос'),
        L('The method always returns the same status code', 'Метод всегда возвращает одинаковый статус-код'),
        L('The response body is byte-identical on every call', 'Тело ответа побайтово одинаково при каждом вызове'),
        L('The method can be executed concurrently without locks', 'Метод можно выполнять параллельно без блокировок'),
      ],
      correctIndex: 0,
      explanation: L(
        'Idempotency is about server state, not about the bytes you get back: sending the same request once or many times leaves the same result. Responses may still differ, for example in timestamps or generated links. Concurrency safety and byte-identical bodies are separate properties.',
        'Идемпотентность — это про состояние сервера, а не про байты ответа: один запрос или много одинаковых запросов дают один и тот же результат. Ответы при этом могут отличаться, например метками времени или сгенерированными ссылками. Потокобезопасность и идентичность байтов — отдельные свойства.'
      ),
    },
    {
      id: 'http-q13',
      question: L('A server accepted a job for background processing. Which status fits best?', 'Сервер принял задачу в фоновую обработку. Какой статус подходит лучше всего?'),
      options: [
        L('200 OK', '200 OK'),
        L('202 Accepted', '202 Accepted'),
        L('201 Created', '201 Created'),
        L('204 No Content', '204 No Content'),
      ],
      correctIndex: 1,
      explanation: L(
        '202 Accepted means the request was received and accepted for processing but is not finished. 201 Created means the resource already exists, and 204 means there is no body at all. For asynchronous jobs use 202 and expose a status URL where the client can poll for the result.',
        '202 Accepted означает, что запрос принят в обработку, но она ещё не завершена. 201 Created означает, что ресурс уже создан, а 204 — что тела нет вовсе. Для асинхронных задач используйте 202 и отдайте ссылку, по которой клиент может опрашивать результат.'
      ),
    },
    {
      id: 'http-q14',
      question: L('A resource permanently moved to a new URL. Which status code should the server return?', 'Ресурс навсегда переехал на новый URL. Какой статус должен вернуть сервер?'),
      options: [
        L('302 Found', '302 Found'),
        L('303 See Other', '303 See Other'),
        L('301 Moved Permanently', '301 Moved Permanently'),
        L('307 Temporary Redirect', '307 Temporary Redirect'),
      ],
      correctIndex: 2,
      explanation: L(
        '301 tells clients and browsers that the move is permanent, so they update their bookmarks and cached references. 302 is temporary, 303 explicitly redirects to another URI using GET, and 307 keeps the original method but is also temporary.',
        '301 сообщает клиентам и браузерам, что перенос постоянный, поэтому они обновляют закладки и ссылки в кэше. 302 — временный, 303 явно перенаправляет на другой URI методом GET, а 307 сохраняет исходный метод, но тоже временный.'
      ),
    },
    {
      id: 'http-q15',
      question: L('Which redirect codes preserve the original request method and body?', 'Какие коды редиректов сохраняют исходный метод и тело запроса?'),
      options: [
        L('301 and 302', '301 и 302'),
        L('302 and 303', '302 и 303'),
        L('304 and 305', '304 и 305'),
        L('307 and 308', '307 и 308'),
      ],
      correctIndex: 3,
      explanation: L(
        '307 and 308 are the method-preserving redirects: 307 is temporary and 308 is permanent. Historical clients turned 301 and 302 POSTs into GETs, which breaks APIs, while 303 always converts to GET. 304 is a cache answer, not a redirect.',
        '307 и 308 — это редиректы, сохраняющие метод: 307 временный, 308 постоянный. Исторически клиенты превращали POST в 301 и 302 в GET, что ломает API, а 303 всегда приводит к GET. 304 — ответ про кэш, а не редирект.'
      ),
    },
    {
      id: 'http-q16',
      question: L('The server answers 304 Not Modified to a conditional request. What happens next?', 'Сервер отвечает 304 Not Modified на условный запрос. Что происходит дальше?'),
      options: [
        L('The client uses its cached copy and the response carries no body', 'Клиент использует свой кэш, тела ответа нет'),
        L('The client downloads the full body again', 'Клиент снова загружает полное тело'),
        L('The client must delete the cached entry', 'Клиент обязан удалить запись из кэша'),
        L('The request is retried as a POST', 'Запрос повторяется как POST'),
      ],
      correctIndex: 0,
      explanation: L(
        '304 tells the client that its cached representation is still valid, so no body is transferred and the client reuses the cached copy. The response carries only metadata such as an updated ETag or Cache-Control. Nothing is deleted and nothing is re-sent.',
        '304 сообщает клиенту, что кэшированное представление всё ещё актуально, поэтому тело не передаётся и клиент использует кэш. В ответе только метаданные, например обновлённый ETag или Cache-Control. Ничего не удаляется и ничего не отправляется заново.'
      ),
    },
    {
      id: 'http-q17',
      question: L('A request from an authenticated user is rejected because the account lacks a role. Which status code fits?', 'Запрос от авторизованного пользователя отклонён из-за отсутствия роли. Какой статус подходит?'),
      options: [
        L('401 Unauthorized, because the token was missing', '401 Unauthorized, потому что токен отсутствовал'),
        L('403 Forbidden, because the credentials are valid but the role is missing', '403 Forbidden, потому что учётные данные верны, а роли нет'),
        L('404 Not Found, to hide that the resource exists', '404 Not Found, чтобы скрыть существование ресурса'),
        L('422 Unprocessable Content, because the payload was invalid', '422 Unprocessable Content, потому что полезная нагрузка невалидна'),
      ],
      correctIndex: 1,
      explanation: L(
        '403 means the server understood the credentials and still refuses the action. 401 means the credentials are missing or invalid and the client should authenticate, and it carries a WWW-Authenticate header. Some APIs deliberately return 404 for protected resources to avoid leaking their existence.',
        '403 означает, что сервер понял учётные данные и всё равно отказывает в действии. 401 означает, что учётных данных нет или они неверны, и клиенту нужно аутентифицироваться; в нём есть заголовок WWW-Authenticate. Некоторые API намеренно отдают 404 для закрытых ресурсов, чтобы не выдавать их существование.'
      ),
    },
    {
      id: 'http-q18',
      question: L('The JSON body is syntactically valid but fails a business rule. Which status code is the best fit?', 'Тело JSON синтаксически корректно, но нарушает бизнес-правило. Какой статус лучше всего?'),
      options: [
        L('400 Bad Request, because the body could not be parsed', '400 Bad Request, потому что тело не разобралось'),
        L('409 Conflict, because the current state conflicts', '409 Conflict, потому что текущее состояние конфликтует'),
        L('422 Unprocessable Content, because the syntax is valid but the content is not', '422 Unprocessable Content, потому что синтаксис корректен, а содержимое — нет'),
        L('500 Internal Server Error, because validation failed', '500 Internal Server Error, потому что валидация не прошла'),
      ],
      correctIndex: 2,
      explanation: L(
        '422 means the syntax of the payload is fine but its content cannot be processed, for example a failed validation rule. 400 covers malformed syntax, 409 describes a conflict with the current state of the resource, and 500 blames a server bug.',
        '422 означает, что синтаксис полезной нагрузки в порядке, но содержимое нельзя обработать, например не прошло валидацию. 400 — про кривой синтаксис, 409 — про конфликт с текущим состоянием ресурса, а 500 — про баг на сервере.'
      ),
    },
    {
      id: 'http-q19',
      question: L('A client exceeds the allowed request rate. Which status code and header should the server use?', 'Клиент превысил допустимый темп запросов. Какой статус и заголовок должен использовать сервер?'),
      options: [
        L('503 Service Unavailable with Retry-After', '503 Service Unavailable с Retry-After'),
        L('403 Forbidden with an X-RateLimit-Remaining header', '403 Forbidden с заголовком X-RateLimit-Remaining'),
        L('408 Request Timeout with Retry-After', '408 Request Timeout с Retry-After'),
        L('429 Too Many Requests with Retry-After', '429 Too Many Requests с Retry-After'),
      ],
      correctIndex: 3,
      explanation: L(
        '429 Too Many Requests is the dedicated rate-limit signal, and Retry-After tells the client when it may come back. 503 describes a temporary lack of capacity, 403 is about authorisation and 408 is about a client-side timeout, so none of them conveys throttling.',
        '429 Too Many Requests — специальный сигнал ограничения частоты, а Retry-After говорит клиенту, когда вернуться. 503 означает временную нехватку ресурсов, 403 — про права доступа, 408 — про клиентский таймаут, и ни один из них не говорит о троттлинге.'
      ),
    },
    {
      id: 'http-q20',
      question: L('A reverse proxy in front of the API receives an invalid response from the upstream server. Which status does the client see?', 'Обратный прокси перед API получил некорректный ответ от вышестоящего сервера. Какой статус увидит клиент?'),
      options: [
        L('502 Bad Gateway, because the proxy got an invalid response from the upstream', '502 Bad Gateway, потому что прокси получил некорректный ответ от вышестоящего сервера'),
        L('504 Gateway Timeout, because the upstream never answered in time', '504 Gateway Timeout, потому что вышестоящий сервер не ответил вовремя'),
        L('500 Internal Server Error, because the origin failed', '500 Internal Server Error, потому что отказал origin'),
        L('422 Unprocessable Content, because the payload was invalid', '422 Unprocessable Content, потому что полезная нагрузка невалидна'),
      ],
      correctIndex: 0,
      explanation: L(
        '502 means a gateway or proxy received an invalid response from an upstream server, while 504 means it never received an answer in time. 500 is the origin server failing on its own, and 422 is about the client payload.',
        '502 означает, что шлюз или прокси получил некорректный ответ от вышестоящего сервера, а 504 — что ответа вовсе не было в срок. 500 — отказ самого origin, а 422 — про полезную нагрузку клиента.'
      ),
    },
    {
      id: 'http-q21',
      question: L('A route exists but does not accept the HTTP method used. Which status code and header describe it?', 'Маршрут существует, но не принимает использованный HTTP-метод. Какой статус и заголовок это описывают?'),
      options: [
        L('404 Not Found with an X-Reason header', '404 Not Found с заголовком X-Reason'),
        L('405 Method Not Allowed with an Allow header', '405 Method Not Allowed с заголовком Allow'),
        L('501 Not Implemented with an Allow header', '501 Not Implemented с заголовком Allow'),
        L('400 Bad Request with an Allow header', '400 Bad Request с заголовком Allow'),
      ],
      correctIndex: 1,
      explanation: L(
        '405 tells the client that the resource exists but the method is not supported, and the Allow header lists the methods that are. 404 means there is no such resource, 501 means the server does not implement that method at all, and 400 is a generic malformed-request error.',
        '405 сообщает, что ресурс есть, но метод не поддерживается, а заголовок Allow перечисляет поддерживаемые методы. 404 означает, что такого ресурса нет, 501 — что сервер вообще не реализует этот метод, а 400 — общая ошибка некорректного запроса.'
      ),
    },
    {
      id: 'http-q22',
      question: L('What does the Accept request header declare?', 'Что объявляет заголовок Accept в запросе?'),
      options: [
        L('The media type of the request body', 'Тип носителя тела запроса'),
        L('The compression applied to the request body', 'Сжатие, применённое к телу запроса'),
        L('The response formats the client is willing to receive', 'Форматы ответа, которые клиент готов принять'),
        L('The character encoding of the response', 'Кодировку символов ответа'),
      ],
      correctIndex: 2,
      explanation: L(
        'Accept tells the server which representation formats the client can handle, such as application/json or text/html. The body format of the request is Content-Type, gzip is Content-Encoding, and the charset is a parameter of the media type itself.',
        'Accept сообщает серверу, какие форматы представления клиент способен обработать, например application/json или text/html. Формат тела запроса задаёт Content-Type, сжатие — Content-Encoding, а charset является параметром самого медиатипа.'
      ),
    },
    {
      id: 'http-q23',
      question: L('A browser sends a cross-origin POST with a JSON body. Which Content-Type forces a preflight?', 'Браузер отправляет кросс-доменный POST с JSON-телом. Какой Content-Type вызывает preflight?'),
      options: [
        L('application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'),
        L('multipart/form-data', 'multipart/form-data'),
        L('text/plain', 'text/plain'),
        L('application/json', 'application/json'),
      ],
      correctIndex: 3,
      explanation: L(
        'Only the three CORS-safelisted content types, namely application/x-www-form-urlencoded, multipart/form-data and text/plain, form simple requests. application/json is not on that list, so the browser first sends an OPTIONS preflight before the actual POST.',
        'Только три типа из списка CORS-safelisted — application/x-www-form-urlencoded, multipart/form-data и text/plain — образуют простые запросы. application/json в списке нет, поэтому браузер сначала отправляет OPTIONS preflight, а уже потом сам POST.'
      ),
    },
    {
      id: 'http-q24',
      question: L('Which Authorization header value correctly carries a JWT access token?', 'Какое значение заголовка Authorization правильно передаёт JWT-токен доступа?'),
      options: [
        L('Bearer eyJhbGciOiJIUzI1NiJ9', 'Bearer eyJhbGciOiJIUzI1NiJ9'),
        L('JWT eyJhbGciOiJIUzI1NiJ9', 'JWT eyJhbGciOiJIUzI1NiJ9'),
        L('Token eyJhbGciOiJIUzI1NiJ9', 'Token eyJhbGciOiJIUzI1NiJ9'),
        L('eyJhbGciOiJIUzI1NiJ9', 'eyJhbGciOiJIUzI1NiJ9'),
      ],
      correctIndex: 0,
      explanation: L(
        'The Authorization header uses a scheme keyword followed by the credentials: Bearer for tokens and Basic for base64 user and password. The scheme is case-insensitive per the RFC, but Bearer is the de facto convention. A bare token without a scheme is not valid.',
        'Заголовок Authorization использует слово-схему, после которого идут учётные данные: Bearer для токенов и Basic для base64 от логина и пароля. По RFC схема регистронезависима, но на практике используют Bearer. Голый токен без схемы невалиден.'
      ),
    },
    {
      id: 'http-q25',
      question: L('Which direction do the Set-Cookie and Cookie headers travel in?', 'В каком направлении передаются заголовки Set-Cookie и Cookie?'),
      options: [
        L('Both are sent by the client to the server', 'Оба отправляет клиент серверу'),
        L('Set-Cookie travels from server to client, Cookie travels back to the server', 'Set-Cookie идёт от сервера к клиенту, Cookie — обратно к серверу'),
        L('Both are sent by the server to the client', 'Оба отправляет сервер клиенту'),
        L('Set-Cookie travels from client to server, Cookie travels from server to client', 'Set-Cookie идёт от клиента к серверу, Cookie — от сервера к клиенту'),
      ],
      correctIndex: 1,
      explanation: L(
        'The server sets a cookie with Set-Cookie in the response, and the browser stores it and sends it back in the Cookie request header on matching requests. The two headers are opposite halves of one mechanism, and mixing them up is a classic source of broken session bugs.',
        'Сервер задаёт cookie через Set-Cookie в ответе, браузер сохраняет его и отправляет обратно в заголовке Cookie запроса для подходящих URL. Это две противоположные половины одного механизма, и их путаница — классическая причина сломанных сессий.'
      ),
    },
    {
      id: 'http-q26',
      question: L('How do the Cache-Control directives no-store and no-cache differ?', 'Чем отличаются директивы Cache-Control no-store и no-cache?'),
      options: [
        L('no-store allows storing the response, no-cache deletes the entry immediately', 'no-store разрешает хранить ответ, no-cache удаляет запись сразу'),
        L('They are identical and only affect private browser caches', 'Они идентичны и влияют только на личные кэши браузера'),
        L('no-store forbids storing the response, no-cache allows storing it but requires revalidation before use', 'no-store запрещает хранение, no-cache разрешает хранить, но требует ревалидации перед использованием'),
        L('no-store forces HTTPS, no-cache disables cookies', 'no-store включает HTTPS, no-cache отключает cookies'),
      ],
      correctIndex: 2,
      explanation: L(
        'no-store tells caches not to store the response at all, which is what sensitive data needs. no-cache permits storage but requires the cache to revalidate with the origin before serving the entry, so a stale copy is never used without asking the server first.',
        'no-store запрещает кэшам хранить ответ вообще — это то, что нужно для чувствительных данных. no-cache разрешает хранить, но требует ревалидации у origin перед выдачей, поэтому устаревшая копия не отдаётся без обращения к серверу.'
      ),
    },
    {
      id: 'http-q27',
      question: L('How do max-age and s-maxage differ in Cache-Control?', 'Чем отличаются max-age и s-maxage в Cache-Control?'),
      options: [
        L('max-age applies to shared caches, s-maxage applies to browsers', 'max-age действует на общие кэши, s-maxage — на браузеры'),
        L('They are aliases with identical behaviour', 'Это синонимы с одинаковым поведением'),
        L('max-age is measured in seconds, s-maxage in minutes', 'max-age измеряется в секундах, s-maxage — в минутах'),
        L('max-age applies to any cache, s-maxage overrides it for shared caches', 'max-age действует на любой кэш, s-maxage переопределяет его для общих кэшей'),
      ],
      correctIndex: 3,
      explanation: L(
        'max-age sets the freshness lifetime for any cache, including the browser, while s-maxage takes precedence for shared caches such as a CDN. Both are expressed in seconds. The distinction matters when a CDN serves stale content while the browser is still revalidating.',
        'max-age задаёт время свежести для любого кэша, включая браузерный, а s-maxage имеет приоритет для общих кэшей вроде CDN. Обе директивы измеряются в секундах. Разница важна, когда CDN отдаёт устаревшее содержимое, а браузер ещё ревалидирует.'
      ),
    },
    {
      id: 'http-q28',
      question: L('How does a client use an ETag to avoid downloading an unchanged resource?', 'Как клиент использует ETag, чтобы не загружать неизменившийся ресурс?'),
      options: [
        L('It sends If-None-Match with the stored ETag, and a match returns 304', 'Отправляет If-None-Match с сохранённым ETag, при совпадении приходит 304'),
        L('It sends If-Modified-Since with the ETag value', 'Отправляет If-Modified-Since со значением ETag'),
        L('It sends Range: bytes=0-0 to check that the resource still exists', 'Отправляет Range: bytes=0-0, чтобы проверить существование ресурса'),
        L('It compares the ETag with a locally computed content hash', 'Сравнивает ETag с локально посчитанным хешем содержимого'),
      ],
      correctIndex: 0,
      explanation: L(
        'The client stores the ETag and sends it back in If-None-Match; if the current tag matches, the server replies 304 Not Modified and skips the body. If-Modified-Since works with Last-Modified dates instead, and Range is used for partial content, not for validation.',
        'Клиент сохраняет ETag и отправляет его обратно в If-None-Match; если текущий тег совпал, сервер отвечает 304 Not Modified и не передаёт тело. If-Modified-Since работает с датой Last-Modified, а Range нужен для частичного содержимого, а не для валидации.'
      ),
    },
    {
      id: 'http-q29',
      question: L('What does the Vary response header tell caches?', 'Что сообщает кэшам заголовок ответа Vary?'),
      options: [
        L('Which response headers are safe to expose to browser scripts', 'Какие заголовки ответа безопасно открыть скриптам браузера'),
        L('Which request headers change the representation, so they belong in the cache key', 'Какие заголовки запроса меняют представление, поэтому входят в ключ кэша'),
        L('How long the response may be stored', 'Сколько можно хранить ответ'),
        L('Which HTTP versions the server supports', 'Какие версии HTTP поддерживает сервер'),
      ],
      correctIndex: 1,
      explanation: L(
        'Vary lists request headers that influence the response, such as Accept-Encoding or Accept-Language, so a shared cache stores a separate entry per combination. A missing or wrong Vary is the classic cause of a CDN serving the wrong variant to the wrong user.',
        'Vary перечисляет заголовки запроса, влияющие на ответ, например Accept-Encoding или Accept-Language, поэтому общий кэш хранит отдельную запись для каждой комбинации. Отсутствие или ошибка в Vary — классическая причина того, что CDN отдаёт не тот вариант.'
      ),
    },
    {
      id: 'http-q30',
      question: L('Which combination of headers is valid for one response?', 'Какая комбинация заголовков допустима для одного ответа?'),
      options: [
        L('Content-Length: 100 together with Transfer-Encoding: chunked', 'Content-Length: 100 вместе с Transfer-Encoding: chunked'),
        L('Either Content-Length or Transfer-Encoding: chunked, but never both', 'Либо Content-Length, либо Transfer-Encoding: chunked, но не оба'),
        L('Both Content-Length and Content-Encoding', 'Оба — Content-Length и Content-Encoding'),
        L('Neither Content-Length nor Transfer-Encoding', 'Ни Content-Length, ни Transfer-Encoding'),
      ],
      correctIndex: 1,
      explanation: L(
        'Content-Length and chunked transfer encoding are mutually exclusive ways of delimiting the body, so a message carries one or the other. Content-Encoding only describes compression and is unrelated, which is why it can appear together with Content-Length.',
        'Content-Length и chunked transfer encoding — взаимоисключающие способы обозначить границы тела, поэтому в сообщении присутствует только один из них. Content-Encoding описывает лишь сжатие и никак с этим не связан, поэтому он может идти вместе с Content-Length.'
      ),
    },
    {
      id: 'http-q31',
      question: L('Who enforces the CORS policy?', 'Кто обеспечивает соблюдение политики CORS?'),
      options: [
        L('The server, by rejecting requests from unknown origins', 'Сервер, отклоняя запросы от неизвестных источников'),
        L('The DNS resolver, using origin records', 'DNS-резолвер, используя записи происхождения'),
        L('The HTTP/2 connection layer', 'Слой соединения HTTP/2'),
        L('The browser, based on the Access-Control-* headers in the response', 'Браузер, на основе заголовков Access-Control-* в ответе'),
      ],
      correctIndex: 3,
      explanation: L(
        'CORS is a browser feature: the browser reads Access-Control-Allow-Origin and the related headers and blocks the response when the policy does not allow it. The server still has to send those headers, and non-browser clients such as curl or a mobile app ignore CORS completely.',
        'CORS — механизм браузера: браузер читает Access-Control-Allow-Origin и связанные заголовки и блокирует ответ, если политика его не разрешает. Сервер при этом обязан эти заголовки прислать, а небраузерные клиенты вроде curl или мобильного приложения CORS полностью игнорируют.'
      ),
    },
    {
      id: 'http-q32',
      question: L('Which request never triggers a CORS preflight?', 'Какой запрос никогда не вызывает CORS preflight?'),
      options: [
        L('A GET without any non-safelisted headers', 'GET без заголовков вне списка safelisted'),
        L('A GET with an X-Request-Id header', 'GET с заголовком X-Request-Id'),
        L('A PUT with an application/json body', 'PUT с телом application/json'),
        L('A DELETE without a custom body', 'DELETE без кастомного тела'),
      ],
      correctIndex: 0,
      explanation: L(
        'Only safelisted requests skip the preflight: GET, HEAD or POST with safelisted content types and no non-safelisted headers. A custom header such as X-Request-Id, a JSON content type and a non-simple method such as DELETE all force the browser to send OPTIONS first.',
        'Preflight не отправляют только safelisted-запросы: GET, HEAD или POST с safelisted-типами содержимого и без заголовков вне списка. Кастомный заголовок вроде X-Request-Id, JSON-тип содержимого и непростой метод вроде DELETE заставляют браузер сначала отправить OPTIONS.'
      ),
    },
    {
      id: 'http-q33',
      question: L('A cross-origin request must include cookies. Which server configuration is correct?', 'Кросс-доменный запрос должен включать cookies. Какая конфигурация сервера верна?'),
      options: [
        L('Access-Control-Allow-Origin: * together with Access-Control-Allow-Credentials: true', 'Access-Control-Allow-Origin: * вместе с Access-Control-Allow-Credentials: true'),
        L('Access-Control-Allow-Origin: https://app.example.com together with Access-Control-Allow-Credentials: true', 'Access-Control-Allow-Origin: https://app.example.com вместе с Access-Control-Allow-Credentials: true'),
        L('Access-Control-Allow-Origin: null together with Access-Control-Allow-Credentials: true', 'Access-Control-Allow-Origin: null вместе с Access-Control-Allow-Credentials: true'),
        L('Access-Control-Allow-Credentials: true without any Allow-Origin header', 'Access-Control-Allow-Credentials: true без заголовка Allow-Origin'),
      ],
      correctIndex: 1,
      explanation: L(
        'Credentialed requests require an explicit origin and never the wildcard, because a wildcard cannot be combined with credentials. The client must also set credentials: include on the fetch call, otherwise the cookies are not sent at all.',
        'Запросы с учётными данными требуют явный origin и никогда не используют звёздочку, потому что wildcard нельзя сочетать с credentials. Клиент также обязан указать credentials: include в вызове fetch, иначе cookies вообще не отправятся.'
      ),
    },
    {
      id: 'http-q34',
      question: L('The API returns the total count in a X-Total-Count header, but the browser script cannot read it. Why?', 'API возвращает общее количество в заголовке X-Total-Count, но скрипт браузера не может его прочитать. Почему?'),
      options: [
        L('The response must repeat the value in the body', 'Ответ должен повторить значение в теле'),
        L('The client must request it through the Accept header', 'Клиент должен запросить его заголовком Accept'),
        L('The response must list it in Access-Control-Expose-Headers', 'Ответ должен перечислить его в Access-Control-Expose-Headers'),
        L('Only CORS-safelisted headers can ever be read cross-origin', 'Кросс-доменно читать можно только safelisted-заголовки'),
      ],
      correctIndex: 2,
      explanation: L(
        'Only CORS-safelisted response headers, such as Cache-Control, Content-Type and Expires, are exposed to JavaScript by default. Custom headers like X-Total-Count need Access-Control-Expose-Headers, otherwise the browser hides them from the page script.',
        'По умолчанию скриптам доступны только CORS-safelisted-заголовки ответа, например Cache-Control, Content-Type и Expires. Кастомные заголовки вроде X-Total-Count нужно перечислить в Access-Control-Expose-Headers, иначе браузер скрывает их от страницы.'
      ),
    },
    {
      id: 'http-q35',
      question: L('What does HTTPS add on top of plain HTTP?', 'Что HTTPS добавляет к обычному HTTP?'),
      options: [
        L('Compression of the response body by default', 'Сжатие тела ответа по умолчанию'),
        L('A persistent connection that reduces latency', 'Постоянного соединения, снижающего задержку'),
        L('Support for parallel requests over one connection', 'Поддержки параллельных запросов по одному соединению'),
        L('Encryption, server authentication and integrity protection', 'Шифрования, аутентификации сервера и защиты целостности'),
      ],
      correctIndex: 3,
      explanation: L(
        'HTTPS is HTTP over TLS, which encrypts the payload, authenticates the server through its certificate and protects the integrity of the messages. Compression, keep-alive and multiplexing are transport-level features that plain HTTP has as well.',
        'HTTPS — это HTTP поверх TLS, который шифрует полезную нагрузку, аутентифицирует сервер по сертификату и защищает целостность сообщений. Сжатие, keep-alive и мультиплексирование — транспортные возможности, доступные и в обычном HTTP.'
      ),
    },
    {
      id: 'http-q36',
      question: L('What do the client and server agree on during the TLS handshake?', 'О чём договариваются клиент и сервер во время рукопожатия TLS?'),
      options: [
        L('The protocol version, the cipher suite, the server identity and the session keys', 'О версии протокола, наборе шифров, идентичности сервера и сеансовых ключах'),
        L('The HTTP methods that the server supports', 'О HTTP-методах, поддерживаемых сервером'),
        L('The list of objects cached in the browser', 'О списке объектов, закэшированных в браузере'),
        L('The DNS records of the origin server', 'О DNS-записях исходного сервера'),
      ],
      correctIndex: 0,
      explanation: L(
        'The handshake negotiates the TLS version and cipher suite, validates the server certificate chain against a trusted CA and derives the session keys for the encrypted channel. Supported HTTP methods come from an OPTIONS request and the cache belongs to the HTTP layer.',
        'Во время рукопожатия согласуются версия TLS и набор шифров, проверяется цепочка сертификатов сервера по доверенному ЦС и выводятся сеансовые ключи для зашифрованного канала. Список HTTP-методов приходит в ответе OPTIONS, а кэш — это уровень HTTP.'
      ),
    },
    {
      id: 'http-q37',
      question: L('What does an X.509 certificate bind together?', 'Что связывает между собой сертификат X.509?'),
      options: [
        L('A session cookie with a user account', 'Сессионную cookie с учётной записью пользователя'),
        L('A public key with an identity, signed by a certificate authority', 'Открытый ключ с идентичностью, подписанный центром сертификации'),
        L('An IP address with a domain name', 'IP-адрес с доменным именем'),
        L('A symmetric key with a client certificate', 'Симметричный ключ с клиентским сертификатом'),
      ],
      correctIndex: 1,
      explanation: L(
        'The certificate states that a public key belongs to a subject, the domain in the SAN, and is signed by an issuer CA, forming a chain of trust up to a root CA the device trusts. The client checks that chain, the validity dates and the key usage before trusting the key.',
        'Сертификат удостоверяет, что открытый ключ принадлежит субъекту — домену в SAN — и подписан центром сертификации, образуя цепочку доверия до корневого ЦС, которому доверяет устройство. Клиент проверяет цепочку, сроки действия и назначение ключа.'
      ),
    },
    {
      id: 'http-q38',
      question: L('What is the purpose of the Strict-Transport-Security header?', 'Для чего нужен заголовок Strict-Transport-Security?'),
      options: [
        L('It encrypts the request body with the server certificate', 'Шифрования тела запроса сертификатом сервера'),
        L('It marks the response as cacheable by shared caches', 'Пометки ответа как кэшируемого общими кэшами'),
        L('It pins the public key for the whole certificate chain', 'Закрепления открытого ключа для всей цепочки сертификатов'),
        L('It tells browsers to always use HTTPS for the host and blocks downgrades', 'Указания браузеру всегда использовать HTTPS для хоста и блокировки понижения'),
      ],
      correctIndex: 3,
      explanation: L(
        'HSTS makes the browser convert HTTP requests to HTTPS for the given host, optionally including subdomains, and refuse to fall back to plain HTTP, which closes SSL-stripping downgrade attacks. It only takes effect after a first successful HTTPS visit and does not encrypt the body itself.',
        'HSTS заставляет браузер переводить запросы на HTTPS для указанного хоста, опционально включая поддомены, и отказываться от возврата на обычный HTTP, что закрывает атаки понижения вроде SSL-stripping. Он действует только после первого успешного HTTPS-визита и сам тело не шифрует.'
      ),
    },
    {
      id: 'http-q39',
      question: L('Which cookie attribute prevents JavaScript from reading the cookie?', 'Какой атрибут cookie запрещает JavaScript читать значение cookie?'),
      options: [
        L('Secure', 'Secure'),
        L('SameSite=Lax', 'SameSite=Lax'),
        L('Domain', 'Domain'),
        L('HttpOnly', 'HttpOnly'),
      ],
      correctIndex: 3,
      explanation: L(
        'HttpOnly hides the cookie from document.cookie, so a successful XSS cannot steal the session value. Secure only restricts transmission to HTTPS, SameSite restricts cross-site sending and Domain scopes the cookie to a host tree.',
        'HttpOnly прячет cookie от document.cookie, поэтому даже удачный XSS не сможет украсть значение сессии. Secure ограничивает только передачу по HTTPS, SameSite — кросс-сайтовую отправку, а Domain задаёт область действия cookie по дереву хостов.'
      ),
    },
    {
      id: 'http-q40',
      question: L('Which SameSite value allows the cookie on top-level navigations but blocks it in cross-site subrequests?', 'Какое значение SameSite разрешает cookie при верхнеуровневой навигации, но блокирует в кросс-сайтовых подзапросах?'),
      options: [
        L('Lax', 'Lax'),
        L('Strict', 'Strict'),
        L('None', 'None'),
        L('Secure', 'Secure'),
      ],
      correctIndex: 0,
      explanation: L(
        'SameSite=Lax sends the cookie on top-level GET navigations, for example when a user clicks a link, but not on images, frames or fetch calls from another site. Strict blocks every cross-site send, and None allows everything but requires the Secure attribute.',
        'SameSite=Lax отправляет cookie при верхнеуровневой навигации GET, например когда пользователь кликает по ссылке, но не отправляет для картинок, фреймов и fetch с другого сайта. Strict блокирует любые кросс-сайтовые отправки, а None разрешает всё, но требует атрибут Secure.'
      ),
    },
    {
      id: 'http-q41',
      question: L('What does a JWT consist of and what is protected by the signature?', 'Из чего состоит JWT и что защищает подпись?'),
      options: [
        L('header.payload.signature, where the payload is encrypted', 'header.payload.signature, где payload зашифрован'),
        L('header.payload.signature, where the signature proves the payload was not changed', 'header.payload.signature, где подпись доказывает, что payload не изменён'),
        L('A single encrypted blob without separate parts', 'Единого зашифрованного блока без отдельных частей'),
        L('base64(header).base64(signature).base64(payload)', 'base64(header).base64(signature).base64(payload)'),
      ],
      correctIndex: 1,
      explanation: L(
        'A JWT is header.payload.signature. The payload is only base64url-encoded, so anyone can read it, and the signature over header and payload proves integrity and origin. To hide claims you need encryption such as JWE, and the payload part always comes second.',
        'JWT состоит из header.payload.signature. Payload только кодируется в base64url, поэтому его может прочитать кто угодно, а подпись над header и payload доказывает целостность и происхождение. Чтобы спрятать claims, нужна шифровка вроде JWE, а payload всегда идёт вторым.'
      ),
    },
    {
      id: 'http-q42',
      question: L('Which scheme makes it easiest to revoke access immediately?', 'Какая схема позволяет проще всего немедленно отозвать доступ?'),
      options: [
        L('Stateless JWT access tokens verified only by their signature', 'Stateless JWT access-токенов, проверяемых только по подписи'),
        L('Both schemes are equally easy to revoke', 'Обе схемы одинаково просто отозвать'),
        L('Server-side sessions identified by an httpOnly cookie', 'Серверных сессий, идентифицируемых httpOnly cookie'),
        L('Neither can be revoked before the token expires', 'Ни одну нельзя отозвать до истечения токена'),
      ],
      correctIndex: 2,
      explanation: L(
        'A server-side session can be deleted from the store in one operation, which logs the user out immediately. A stateless JWT is valid until it expires because the server keeps no state, so revocation needs a deny-list, which is exactly why short access-token lifetimes and refresh tokens exist.',
        'Серверную сессию можно удалить из хранилища одной операцией, и пользователь выходит сразу. Stateless JWT действует до истечения, потому что сервер не хранит состояние, поэтому для отзыва нужен чёрный список — именно поэтому и применяют короткоживущие access-токены с refresh.'
      ),
    },
    {
      id: 'http-q43',
      question: L('Which flow is recommended for a single-page application using OAuth 2.0?', 'Какой flow рекомендуется для single-page приложения с OAuth 2.0?'),
      options: [
        L('Resource owner password credentials', 'Resource owner password credentials'),
        L('Client credentials sent from the browser', 'Client credentials, отправляемые из браузера'),
        L('Implicit grant with the token in the URL fragment', 'Implicit grant с токеном во фрагменте URL'),
        L('Authorization code with PKCE', 'Authorization code с PKCE'),
      ],
      correctIndex: 3,
      explanation: L(
        'The authorization code flow with PKCE is the recommended pattern for SPAs: the browser never holds a long-lived secret and the code verifier proves the code was obtained by the client that redeems it. The implicit grant is deprecated because the token ends up in the URL, and the password grant stores user credentials.',
        'Для SPA рекомендуют authorization code flow с PKCE: в браузере нет долгоживущего секрета, а code verifier доказывает, что код получен тем же клиентом, который его обменивает. Implicit grant устарел, потому что токен попадает в URL, а password grant хранит пароль пользователя.'
      ),
    },
    {
      id: 'http-q44',
      question: L('Which URL best follows REST resource design?', 'Какой URL лучше соответствует дизайну REST-ресурсов?'),
      options: [
        L('/users?status=active', '/users?status=active'),
        L('/getUsers?status=active', '/getUsers?status=active'),
        L('/api/get_all_users.php', '/api/get_all_users.php'),
        L('/doAction?action=listUsers', '/doAction?action=listUsers'),
      ],
      correctIndex: 0,
      explanation: L(
        'REST models nouns as resources and lets HTTP methods express the action, so /users filtered by status is correct. Verb-based paths such as /getUsers or RPC-style endpoints hide the resource and break the uniform method semantics.',
        'REST моделирует сущности как ресурсы, а действие выражает HTTP-методом, поэтому /users с фильтром по status — правильный вариант. Пути с глаголами вроде /getUsers и RPC-подобные эндпоинты прячут ресурс и ломают единообразие методов.'
      ),
    },
    {
      id: 'http-q45',
      question: L('A dataset changes while a client pages through it with offset and limit. What is the risk?', 'Набор данных меняется, пока клиент листает его через offset и limit. В чём риск?'),
      options: [
        L('The server rejects offset and limit as mutually exclusive parameters', 'Сервер отклоняет offset и limit как взаимоисключающие параметры'),
        L('Rows can be skipped or duplicated because offsets shift when rows are inserted or deleted', 'Записи могут пропускаться или дублироваться, потому что смещения сдвигаются при вставке и удалении строк'),
        L('The client has to send them as headers instead of query parameters', 'Клиент обязан отправлять их как заголовки, а не как query-параметры'),
        L('Pagination is not allowed for GET requests', 'Пагинация не разрешена для запросов GET'),
      ],
      correctIndex: 1,
      explanation: L(
        'Offsets are positional, so inserting or deleting rows shifts everything and a paged client can see duplicates or miss rows entirely. Cursor pagination anchors on a stable key such as the last seen id, which keeps the sequence consistent while the data changes.',
        'Смещения позиционные, поэтому вставка или удаление строк сдвигает всё, и клиент может увидеть дубликаты или пропустить записи. Курсорная пагинация опирается на стабильный ключ вроде последнего увиденного id и сохраняет согласованность при изменении данных.'
      ),
    },
    {
      id: 'http-q46',
      question: L('Which response headers usually carry rate-limit information?', 'Какие заголовки ответа обычно несут информацию о лимитах?'),
      options: [
        L('Content-Length, Content-Type and Date', 'Content-Length, Content-Type и Date'),
        L('ETag, Last-Modified and Expires', 'ETag, Last-Modified и Expires'),
        L('X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset', 'X-RateLimit-Limit, X-RateLimit-Remaining и X-RateLimit-Reset'),
        L('Origin, Referer and User-Agent', 'Origin, Referer и User-Agent'),
      ],
      correctIndex: 2,
      explanation: L(
        'Rate-limit headers describe the quota: the limit itself, how much of it is left and when it resets. The other groups describe the payload, the caching metadata and the request context, and none of them says anything about throttling.',
        'Заголовки лимитов описывают квоту: сам лимит, сколько осталось и когда сброс. Остальные группы описывают полезную нагрузку, метаданные кэша и контекст запроса и ничего не говорят о троттлинге.'
      ),
    },
    {
      id: 'http-q47',
      question: L('How does a WebSocket connection start?', 'Как начинается соединение WebSocket?'),
      options: [
        L('With a POST to a /ws endpoint that returns a stream', 'С POST-запросом на /ws, возвращающим поток'),
        L('With an HTTP/2 push promise', 'С promise push в HTTP/2'),
        L('With a long-polling GET that is never closed', 'С long-polling GET, который никогда не закрывается'),
        L('With an HTTP GET carrying Upgrade: websocket and a Sec-WebSocket-Key header', 'С HTTP-запросом GET с Upgrade: websocket и заголовком Sec-WebSocket-Key'),
      ],
      correctIndex: 3,
      explanation: L(
        'The client opens with an HTTP upgrade request carrying Upgrade: websocket and Sec-WebSocket-Key, and the server confirms with 101 Switching Protocols, after which the same TCP connection carries WebSocket frames. Server-sent events and long polling are alternative push mechanisms without an upgrade.',
        'Клиент открывает соединение HTTP-запросом с Upgrade: websocket и Sec-WebSocket-Key, сервер подтверждает ответом 101 Switching Protocols, и по тому же TCP-соединению идут WebSocket-фреймы. Server-sent events и long polling — альтернативные способы push без апгрейда.'
      ),
    },
    {
      id: 'http-q48',
      question: L('A dashboard only needs one-way server-to-browser updates. Which transport is the simpler fit?', 'Дашборду нужны только односторонние обновления от сервера к браузеру. Какой транспорт подходит проще?'),
      options: [
        L('Server-Sent Events over plain HTTP', 'Server-Sent Events поверх обычного HTTP'),
        L('WebSocket with a bidirectional protocol', 'WebSocket с двусторонним протоколом'),
        L('HTTP/2 server push', 'HTTP/2 server push'),
        L('Long polling with multipart responses', 'Long polling с multipart-ответами'),
      ],
      correctIndex: 0,
      explanation: L(
        'SSE is a one-way text/event-stream over ordinary HTTP that reconnects automatically and supports event ids, so it needs no upgrade handshake and no extra server infrastructure. WebSocket is worth its complexity only when the client must also push messages upstream.',
        'SSE — это односторонний поток text/event-stream поверх обычного HTTP с автопереподключением и идентификаторами событий, поэтому не нужен ни апгрейд, ни отдельная инфраструктура. WebSocket оправдан только когда клиент тоже должен слать данные серверу.'
      ),
    },
    {
      id: 'http-q49',
      question: L('What should a consistent API error envelope look like?', 'Как должен выглядеть единообразный конверт ошибок API?'),
      options: [
        L('A plain text body with the status message', 'Текстовое тело с текстом статуса'),
        L('A stable JSON shape such as { error: { code, message, details } }', 'Стабильная JSON-структура вида { error: { code, message, details } }'),
        L('A different error shape for every status code', 'Разная структура ошибки для каждого статус-кода'),
        L('The HTTP status code only, with no body at all', 'Только HTTP-статус-код, без тела вовсе'),
      ],
      correctIndex: 1,
      explanation: L(
        'A single documented JSON envelope, for example { error: { code, message, details } }, lets clients handle failures in one place and carries a machine-readable code next to the human message. Ad hoc shapes per status code force every consumer to special-case each error.',
        'Единый задокументированный JSON-конверт вида { error: { code, message, details } } позволяет клиенту обрабатывать ошибки одним способом и содержит машиночитаемый код рядом с человеческим сообщением. Разные формы для каждого статуса заставляют каждого потребителя разбирать каждую ошибку отдельно.'
      ),
    },
    {
      id: 'http-q50',
      question: L('A client must retry failed API calls. Which strategy is correct?', 'Клиент должен повторять упавшие вызовы API. Какая стратегия верна?'),
      options: [
        L('Retry every failed response, including 400 and 422', 'Повторять любой неуспешный ответ, включая 400 и 422'),
        L('Retry immediately in a tight loop until the request succeeds', 'Повторять немедленно в плотном цикле до успеха'),
        L('Retry only idempotent requests, on network errors, 429 and 5xx, with backoff and jitter', 'Повторять только идемпотентные запросы, при сетевых ошибках, 429 и 5xx, с backoff и jitter'),
        L('Never retry, because a failed request always leaves the server in a broken state', 'Никогда не повторять, потому что неудачный запрос всегда оставляет сервер в сломанном состоянии'),
      ],
      correctIndex: 2,
      explanation: L(
        'Only idempotent requests can be replayed safely, and only network errors, 429 and 5xx are worth retrying; 4xx validation errors will fail again. Exponential backoff with jitter spreads the load and avoids a thundering herd, and Retry-After on 429 should be respected.',
        'Безопасно повторять можно только идемпотентные запросы, и повтора достойны сетевые ошибки, 429 и 5xx; ошибки валидации 4xx повторятся снова. Экспоненциальный backoff с jitter распределяет нагрузку и предотвращает herd-эффект, а Retry-After в ответе 429 нужно учитывать.'
      ),
    },
  ],
};
