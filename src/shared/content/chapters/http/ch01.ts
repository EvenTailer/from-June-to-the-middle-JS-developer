import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh01: Chapter = {
  id: 'http-ch1',
  title: L('The HTTP protocol', 'Протокол HTTP'),
  summary: L(
    'How a request and a response are built, what the methods promise about safety and idempotency, how status codes classify an outcome, what changed between protocol versions, and what actually happens between a click and a response.',
    'Как устроены запрос и ответ, что обещают методы про безопасность и идемпотентность, как коды состояния классифицируют исход, что менялось между версиями протокола и что происходит между кликом и ответом.'
  ),
  sections: [
    {
      id: 'http-ch1-s1',
      title: L('Anatomy of a request and a response', 'Анатомия запроса и ответа'),
      body: L(
        'Every HTTP exchange is a text message travelling in one of two directions. A request opens with a request line — method, target, protocol version — followed by headers, a mandatory blank line and an optional body. A response opens with a status line — version, three-digit code, reason phrase — and continues with the same shape: headers, a blank line and a body that may be empty. The blank line is the only separator between the head and the body, and it is required even when the body is zero bytes long.\n\nThe target of a request is usually written in origin form, a path plus an optional query string, such as /orders/42?include=items. The body is opaque bytes: the protocol does not care whether they carry JSON, an HTML page or a binary blob, which is exactly why Content-Type exists. What the body means is decided by the application, and whether a body is allowed at all is decided by the method.\n\nThe body must be framed, and HTTP offers two ways to do it. Content-Length states the exact number of bytes, while Transfer-Encoding: chunked streams size-prefixed pieces so the sender does not need to know the total in advance. A server must never send both, and the disagreement between two hops about the framing is the ground where request smuggling lives. Modern APIs mostly use Content-Length, or the framing that HTTP/2 and HTTP/3 provide on their own.\n\nIn a browser, fetch and XMLHttpRequest assemble that raw text for you, while the Network panel shows it exactly as it went over the wire. The practical consequence is that everything a server reacts to — the verb, the path, the query, the headers, the body — is explicit and inspectable, and that HTTP itself keeps no session state. Anything that looks like state is a convention layered on top of the protocol.',
        'Каждый обмен по HTTP — это текстовое сообщение, идущее в одном из двух направлений. Запрос открывается строкой запроса — метод, цель, версия протокола, — затем идут заголовки, обязательная пустая строка и необязательное тело. Ответ открывается строкой состояния — версия, трёхзначный код, текст причины, — и продолжается той же формой: заголовки, пустая строка и тело, которое может быть пустым. Пустая строка — единственный разделитель между заголовками и телом, и она обязательна даже тогда, когда тело состоит из нуля байт.\n\nЦель запроса обычно записывается в origin form: путь и, возможно, строка запроса, например /orders/42?include=items. Тело — непрозрачные байты: протоколу всё равно, это JSON, HTML-страница или двоичный блоб, и именно поэтому существует Content-Type. Что означает тело, решает приложение, а можно ли его вообще передавать — метод.\n\nТело нужно обрамить, и HTTP предлагает два способа. Content-Length задаёт точное число байт, а Transfer-Encoding: chunked передаёт фрагменты с префиксом размера, так что отправителю не нужно знать итог заранее. Сервер не должен слать оба заголовка сразу, и расхождение между двумя хопами в понимании обрамления и есть та почва, где живёт request smuggling. Современные API в основном используют Content-Length либо обрамление, которое HTTP/2 и HTTP/3 обеспечивают сами.\n\nВ браузере за вас сырой текст пишут fetch и XMLHttpRequest, а вкладка Network показывает его в точности так, как он ушёл на провод. Практическое следствие: всё, на что сервер реагирует — глагол, путь, query, заголовки, тело, — выражено явно и доступно для инспекции, и сам HTTP не хранит состояние сессии. Всё, что выглядит как состояние, является соглашением поверх протокола.'
      ),
      bullets: [
        L('A request is a request line, headers, a blank line and an optional body.', 'Запрос — это строка запроса, заголовки, пустая строка и необязательное тело.'),
        L('The blank line is mandatory and is the only delimiter between headers and body.', 'Пустая строка обязательна и остаётся единственным разделителем между заголовками и телом.'),
        L('Content-Length and Transfer-Encoding: chunked frame the body and must not be combined.', 'Content-Length и Transfer-Encoding: chunked обрамляют тело и не должны сочетаться.'),
        L('The body is opaque bytes, the protocol never interprets its content.', 'Тело — непрозрачные байты, протокол не интерпретирует его содержимое.'),
        L('HTTP is stateless, so every session is a convention built on top of it.', 'HTTP не хранит состояние, поэтому любая сессия — это соглашение поверх него.'),
      ],
      code: `$ curl -i https://api.example.com/orders/42
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 27
Cache-Control: max-age=60

{"id":42,"status":"paid"}

$ curl -i -X POST https://api.example.com/orders \\
    -H 'Content-Type: application/json' \\
    -d '{"sku":"A-1","qty":2}'
HTTP/1.1 201 Created
Location: /orders/1042
Content-Type: application/json; charset=utf-8

{"id":1042,"status":"created"}`,
      table: {
        caption: L('The parts of a message', 'Части сообщения'),
        headers: [L('Part', 'Часть'), L('In a request', 'В запросе'), L('In a response', 'В ответе')],
        rows: [
          [L('Start line', 'Стартовая строка'), L('Method, target, version', 'Метод, цель, версия'), L('Version, code, reason', 'Версия, код, причина')],
          [L('Headers', 'Заголовки'), L('Metadata of the call', 'Метаинформация вызова'), L('Metadata of the result', 'Метаинформация результата')],
          [L('Blank line', 'Пустая строка'), L('Ends the head', 'Заканчивает заголовки'), L('Ends the head', 'Заканчивает заголовки')],
          [L('Body', 'Тело'), L('Optional, depends on the method', 'Необязательно, зависит от метода'), L('Optional, may be empty', 'Необязательно, может быть пустым')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two framing headers at once', 'Два заголовка обрамления сразу'),
          text: L(
            'A server that trusts Content-Length while a proxy trusts Transfer-Encoding lets an attacker smuggle a second request inside the first. Reject requests that carry both framing headers instead of guessing which one wins.',
            'Сервер, который доверяет Content-Length, пока прокси доверяет Transfer-Encoding, позволяет злоумышленнику протащить второй запрос внутрь первого. Отклоняйте запросы, где присутствуют оба заголовка обрамления, вместо того чтобы гадать, какой из них победит.'
          ),
        },
      ],
      takeaway: L(
        'The blank line divides the head from the body, and exactly one framing header may describe the body.',
        'Пустая строка делит заголовки и тело, а описывать тело должен ровно один заголовок обрамления.'
      ),
      seeAlso: [
        L('Section 1-2: methods, idempotency and safety', 'Секция 1-2: методы, идемпотентность и безопасность'),
        L('Chapter 2: the headers that change behaviour', 'Глава 2: заголовки, которые меняют поведение'),
      ],
    },
    {
      id: 'http-ch1-s2',
      title: L('Methods, idempotency and safety', 'Методы, идемпотентность и безопасность'),
      body: L(
        'The method tells the server what to do with the identified resource, and the specification attaches two guarantees to it. A method is safe when it only reads and never changes server state: GET, HEAD, OPTIONS and TRACE qualify. A method is idempotent when repeating it leaves the same state as performing it once: GET, HEAD, PUT, DELETE, OPTIONS and TRACE qualify, while POST and PATCH carry no such promise.\n\nThese two words decide whether a request may be replayed. A proxy that times out on a GET may retry it without asking, and a client may repeat a DELETE after a network error, because deleting an already deleted resource is still the desired end state. A POST that creates a payment cannot be retried on hope: the first attempt may well have reached the server and charged the card before the connection died.\n\nIdempotency is a promise about semantics, not about the absence of side effects. PUT /orders/42 with the same body twice leaves the order in the same state, even though both calls wrote to the database. PATCH is not idempotent by specification: a relative patch such as {"balance": {"$increment": 10}} applied twice gives a different result, while an absolute one like {"balance": 100} gives the same result every time.\n\nTwo methods stay outside daily use. TRACE echoes the request back and exists to diagnose proxies, which is why most servers disable it. CONNECT turns a connection into a tunnel, which is how HTTPS proxies work. Both are in the specification and both are best left alone in application code.',
        'Метод говорит серверу, что делать с указанным ресурсом, и спецификация привязывает к нему две гарантии. Метод безопасен, если он только читает и не меняет состояние сервера: это GET, HEAD, OPTIONS и TRACE. Метод идемпотентен, если повторение оставляет то же состояние, что и однократное выполнение: это GET, HEAD, PUT, DELETE, OPTIONS и TRACE, а для POST и PATCH такой гарантии нет.\n\nИменно эти два слова решают, можно ли запрос переиграть. Прокси, у которого истёк таймаут на GET, вправе повторить его не спрашивая, и клиент вправе повторить DELETE после сетевой ошибки, потому что удаление уже удалённого ресурса даёт тот же желаемый результат. POST, создающий платёж, повторять наугад нельзя: первая попытка вполне могла дойти до сервера и списать карту за секунду до того, как соединение оборвалось.\n\nИдемпотентность — это обещание о семантике, а не об отсутствии побочных эффектов. PUT /orders/42 с одинаковым телом дважды оставит заказ в том же состоянии, хотя обе записи дошли до базы. PATCH по спецификации не идемпотентен: относительный патч вида {"balance": {"$increment": 10}}, применённый дважды, даст разный результат, а абсолютный вроде {"balance": 100} — тот же результат каждый раз.\n\nДва метода остаются за пределами повседневной работы. TRACE возвращает эхо запроса и существует для диагностики прокси, поэтому его отключают на большинстве серверов. CONNECT превращает соединение в туннель, и на этом построены HTTPS-прокси. Оба есть в спецификации, и в прикладном коде оба лучше не трогать.'
      ),
      bullets: [
        L('Safe means read-only, idempotent means a repeat has the same effect.', 'Безопасный значит только чтение, идемпотентный — что повтор даёт тот же эффект.'),
        L('GET, HEAD, PUT and DELETE are idempotent, POST and PATCH are not guaranteed to be.', 'GET, HEAD, PUT и DELETE идемпотентны, для POST и PATCH гарантий нет.'),
        L('Idempotency is the precondition for an automatic retry after a timeout.', 'Идемпотентность — необходимое условие автоматического повтора после таймаута.'),
        L('A relative PATCH is not idempotent, an absolute one can be.', 'Относительный PATCH не идемпотентен, абсолютный может быть.'),
        L('HEAD runs exactly like GET but returns the headers only.', 'HEAD выполняется как GET, но возвращает только заголовки.'),
      ],
      code: `// idempotent: safe to replay after a timeout
await fetch('/api/orders/42', { method: 'DELETE' });

// not idempotent: a blind retry can create two orders
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sku: 'A-1', qty: 2 }),
});

// the safe way to retry a POST: let the server deduplicate
await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': crypto.randomUUID(),
  },
  body: JSON.stringify({ sku: 'A-1', qty: 2 }),
});`,
      table: {
        caption: L('Safety and idempotency of the common methods', 'Безопасность и идемпотентность основных методов'),
        headers: [L('Method', 'Метод'), L('Safe', 'Безопасный'), L('Idempotent', 'Идемпотентный'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('GET', 'GET'), L('yes', 'да'), L('yes', 'да'), L('Read a resource', 'Прочитать ресурс')],
          [L('HEAD', 'HEAD'), L('yes', 'да'), L('yes', 'да'), L('Read metadata only', 'Прочитать только метаданные')],
          [L('POST', 'POST'), L('no', 'нет'), L('no', 'нет'), L('Create or trigger work', 'Создать или запустить обработку')],
          [L('PUT', 'PUT'), L('no', 'нет'), L('yes', 'да'), L('Replace the whole resource', 'Полностью заменить ресурс')],
          [L('PATCH', 'PATCH'), L('no', 'нет'), L('not guaranteed', 'не гарантирован'), L('Partial update', 'Частичное изменение')],
          [L('DELETE', 'DELETE'), L('no', 'нет'), L('yes', 'да'), L('Remove the resource', 'Удалить ресурс')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A timeout is not a failure', 'Таймаут — это не отказ'),
          text: L(
            'A timeout tells you that the client gave up, not that the server did nothing. Before a client retries a non-idempotent request, send an idempotency key, or read the state of the resource the first call was supposed to create.',
            'Таймаут сообщает, что клиент сдался, а не что сервер ничего не сделал. Прежде чем повторять неидемпотентный запрос, отправьте ключ идемпотентности или прочитайте состояние ресурса, который должен был создать первый вызов.'
          ),
        },
      ],
      takeaway: L(
        'Retry only what is idempotent, and give everything else an idempotency key.',
        'Повторяйте только идемпотентное, а остальному давайте ключ идемпотентности.'
      ),
      seeAlso: [
        L('Section 1-3: status codes and what they mean', 'Секция 1-3: коды состояния и что они значат'),
        L('Chapter 7: idempotency keys and safe retries', 'Глава 7: ключи идемпотентности и безопасные повторы'),
      ],
    },
    {
      id: 'http-ch1-s3',
      title: L('Status codes and what they mean', 'Коды состояния и что они значат'),
      body: L(
        'The status code classifies the outcome, and its first digit carries most of the meaning: 1xx is informational, 2xx success, 3xx a redirection, 4xx the client got something wrong, 5xx the server failed. Inside a class the exact number matters far more than the reason phrase, because machines read the number and humans read the phrase. 200 for a successful read, 201 with a Location header for a created resource, 204 for an action with no result to return.\n\nThe split between 4xx and 5xx is a contract with the caller. A 4xx says the request will not succeed as written: 400 for a malformed body, 401 for missing or invalid credentials, 403 for a valid identity without rights, 404 for a missing resource, 409 for a conflicting state, 422 for a well-formed but semantically invalid request, 429 for a rate limit. Repeating the same 4xx request produces the same 4xx.\n\nA 5xx says the server failed to handle a request it should have handled: 500 for an unhandled exception, 502 for a broken upstream, 503 for overload or maintenance, 504 for an upstream timeout. Here a retry can help, because the fault is often temporary. That asymmetry is the contract: 4xx means fix your request, 5xx means try again later.\n\nTwo codes are worth remembering because they are easy to get wrong. A 204 means success with no body at all, and any body sent with it is a protocol error; a 304 is the answer to a conditional request and also carries no body, because the client is expected to reuse the copy it already has. Answering 200 with an empty body when the client expects JSON is a common cause of a parse error that looks like a server bug.',
        'Код состояния классифицирует исход, и большую часть смысла несёт его первая цифра: 1xx — информационный, 2xx — успех, 3xx — перенаправление, 4xx — ошибка на стороне клиента, 5xx — на стороне сервера. Внутри класса точный код значит куда больше текста причины: машины читают код, люди читают текст. Так 200 означает успешное чтение, 201 с заголовком Location — созданный ресурс, 204 — успешное действие без результата.\n\nРазделение между 4xx и 5xx — это контракт с вызывающим. 4xx говорит, что запрос в таком виде не сработает: 400 для некорректного тела, 401 для отсутствующих или неверных учётных данных, 403 для верной личности без прав, 404 для отсутствующего ресурса, 409 для конфликта состояния, 422 для корректно оформленного, но смыслово неверного запроса, 429 для превышения лимита. Повтор того же запроса с тем же 4xx даст тот же 4xx.\n\n5xx говорит, что сервер не смог обработать запрос, который обязан был обработать: 500 для необработанного исключения, 502 для сломанного апстрима, 503 для перегрузки или обслуживания, 504 для таймаута апстрима. Здесь повтор может помочь, потому что сбой часто временный. Эта асимметрия и есть контракт: 4xx значит исправьте запрос, 5xx значит попробуйте позже.\n\nДва кода стоит запомнить, потому что их легко перепутать. 204 означает успех вообще без тела, и любое тело вместе с ним является нарушением протокола; 304 — ответ на условный запрос, и он тоже идёт без тела, потому что клиент должен взять уже сохранённую копию. Ответ 200 с пустым телом там, где клиент ждёт JSON, — обычная причина ошибки разбора, которая выглядит как баг сервера.'
      ),
      bullets: [
        L('The first digit tells the client whether to fix the request, wait, or give up.', 'Первая цифра говорит клиенту: исправлять запрос, подождать или сдаться.'),
        L('A 4xx will not succeed on retry, a 5xx sometimes will.', '4xx не пройдёт при повторе, 5xx — иногда пройдёт.'),
        L('201 Created should carry a Location header with the new address.', '201 Created должен содержать Location с адресом нового ресурса.'),
        L('204 and 304 carry no body, and any body is a protocol error.', '204 и 304 идут без тела, и любое тело — нарушение протокола.'),
        L('The reason phrase is for humans, the number is for machines.', 'Текст причины для людей, число — для машин.'),
      ],
      code: `const response = await fetch('/api/orders/42');

if (response.status === 404) {
  return null; // the resource is gone, not an error to retry
}

if (!response.ok) {
  // fetch rejects only on network failures, never on a 4xx or a 5xx
  const problem = await response.json().catch(() => ({}));
  throw new Error('HTTP ' + response.status + ': ' + (problem.title ?? 'unknown'));
}

if (response.status === 204) {
  return undefined; // no content, do not try to parse a body
}

return response.json();`,
      table: {
        caption: L('The five classes of status codes', 'Пять классов кодов состояния'),
        headers: [L('Class', 'Класс'), L('Meaning', 'Значение'), L('Who can fix it', 'Кто может исправить'), L('Typical codes', 'Типичные коды')],
        rows: [
          [L('1xx', '1xx'), L('Intermediate response', 'Промежуточный ответ'), L('Nobody', 'Никто'), L('100 Continue', '100 Continue')],
          [L('2xx', '2xx'), L('The request succeeded', 'Запрос выполнен успешно'), L('Nobody', 'Никто'), L('200, 201, 204', '200, 201, 204')],
          [L('3xx', '3xx'), L('Look somewhere else', 'Ищите дальше'), L('The client follows', 'Клиент переходит'), L('301, 302, 304', '301, 302, 304')],
          [L('4xx', '4xx'), L('The client got it wrong', 'Ошибка на стороне клиента'), L('The client', 'Клиент'), L('400, 401, 403, 404, 409, 422, 429', '400, 401, 403, 404, 409, 422, 429')],
          [L('5xx', '5xx'), L('The server failed', 'Ошибка на стороне сервера'), L('The server', 'Сервер'), L('500, 502, 503, 504', '500, 502, 503, 504')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('fetch does not throw on a 404', 'fetch не бросает исключение на 404'),
          text: L(
            'fetch resolves for any HTTP status and rejects only when the network failed or the request was aborted. Code that checks the resolved value alone will treat an error page as a successful download. Always branch on response.ok before reading the body.',
            'fetch разрешается при любом коде состояния и отклоняется только при сетевом сбое или отмене запроса. Код, который проверяет только сам факт разрешения, примет страницу с ошибкой за успешную загрузку. Всегда ветвитесь по response.ok, прежде чем читать тело.'
          ),
        },
      ],
      takeaway: L(
        'The first digit tells the client whether to fix the request, wait, or give up.',
        'Первая цифра говорит клиенту: исправлять запрос, подождать или сдаться.'
      ),
      seeAlso: [
        L('Section 1-1: the parts of a message', 'Секция 1-1: части сообщения'),
        L('Section 7-2: status codes in practice', 'Секция 7-2: коды состояния на практике'),
      ],
    },
    {
      id: 'http-ch1-s4',
      title: L('HTTP versions and keep-alive', 'Версии HTTP и постоянные соединения'),
      body: L(
        'The protocol version decides how the bytes are framed and how many requests may share a connection. HTTP/1.0 opened a new TCP connection for every request by default. HTTP/1.1 flipped that: keep-alive became the default behaviour, Host became mandatory so that one address could serve many names, and chunked transfer encoding arrived so a server could stream a body of unknown length.\n\nKeep-alive in HTTP/1.1 means the connection stays open after the response, so the next request to the same origin can reuse it. Reusing a connection removes the handshake and the slow start of TCP, which is why the second request to a server is often far faster than the first. The header itself is hop-by-hop, and a proxy that terminates the connection normally strips it from the message.\n\nHTTP/1.1 still runs one request at a time per connection, so a slow response blocks everything queued behind it. This is head-of-line blocking, and browsers work around it by opening about six connections per origin. HTTP/2 answers with a binary framing layer, a stream multiplexer and HPACK header compression: many streams share one connection, the slow one no longer holds up the others, and repeated header names cost almost nothing.\n\nHTTP/3 moves the transport to QUIC over UDP, where the protocol version is negotiated during the handshake rather than in a header. The practical consequence for application code is small: you rarely choose the version, clients and servers negotiate it, and the things you control are timeouts, connection reuse and how many parallel requests you open.',
        'Версия протокола определяет, как обрамляются байты и сколько запросов может делить одно соединение. HTTP/1.0 по умолчанию открывал новое TCP-соединение на каждый запрос. HTTP/1.1 поменял это: постоянное соединение стало поведением по умолчанию, Host стал обязательным, чтобы один адрес обслуживал много имён, и появилась chunked-передача, позволяющая серверу отдавать тело неизвестной длины.\n\nПостоянное соединение в HTTP/1.1 означает, что соединение остаётся открытым после ответа, и следующий запрос к тому же origin может его переиспользовать. Переиспользование убирает рукопожатие и медленный старт TCP, поэтому второй запрос к серверу часто заметно быстрее первого. Сам заголовок работает на уровне одного перехода, и прокси, который разрывает соединение, обычно вырезает его из сообщения.\n\nHTTP/1.1 всё ещё выполняет один запрос за раз на соединение, поэтому медленный ответ блокирует всё, что стоит за ним в очереди. Это head-of-line blocking, и браузеры обходят его, открывая около шести соединений на origin. HTTP/2 отвечает двоичным обрамлением, мультиплексированием потоков и сжатием заголовков HPACK: множество потоков делят одно соединение, медленный поток больше не держит остальные, а повторяющиеся имена заголовков почти ничего не стоят.\n\nHTTP/3 переносит транспорт на QUIC над UDP, где версия протокола согласуется во время рукопожатия, а не в заголовке. Практическое следствие для прикладного кода невелико: версию вы редко выбираете, её согласуют клиент и сервер, а под вашим контролем остаются таймауты, переиспользование соединений и число параллельных запросов.'
      ),
      bullets: [
        L('HTTP/1.1 made keep-alive the default and Host mandatory.', 'HTTP/1.1 сделал постоянное соединение поведением по умолчанию, а Host — обязательным.'),
        L('A reused connection skips the TCP and TLS handshakes.', 'Переиспользованное соединение избавляет от рукопожатий TCP и TLS.'),
        L('HTTP/1.1 serialises requests per connection, which is head-of-line blocking.', 'HTTP/1.1 выполняет запросы по одному на соединение, это и есть head-of-line blocking.'),
        L('HTTP/2 multiplexes streams over one connection and compresses headers with HPACK.', 'HTTP/2 мультиплексирует потоки в одном соединении и жмёт заголовки через HPACK.'),
        L('HTTP/3 runs QUIC over UDP, so a lost packet hits one stream, not the connection.', 'HTTP/3 работает поверх QUIC над UDP, потерянный пакет задевает один поток, а не соединение.'),
      ],
      code: `$ curl -v --http1.1 https://api.example.com/orders/42
* Connected to api.example.com (93.184.216.34) port 443
* TLS handshake completed, cipher TLS_AES_256_GCM_SHA384
> GET /orders/42 HTTP/1.1
> Host: api.example.com
> Accept: application/json
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 27
<
{"id":42,"status":"paid"}
* Connection #0 to host api.example.com left intact
$ curl -v --http2 https://api.example.com/orders/43
* Connected to api.example.com (93.184.216.34) port 443
* ALPN: server accepted h2
> GET /orders/43 HTTP/2
> host: api.example.com
< HTTP/2 200
< content-type: application/json
<
{"id":43,"status":"paid"}`,
      table: {
        caption: L('What changed between the versions', 'Что менялось между версиями'),
        headers: [L('Version', 'Версия'), L('Transport', 'Транспорт'), L('Requests per connection', 'Запросов на соединение'), L('Framing', 'Обрамление')],
        rows: [
          [L('HTTP/1.0', 'HTTP/1.0'), L('TCP', 'TCP'), L('One', 'Один'), L('Text', 'Текстовое')],
          [L('HTTP/1.1', 'HTTP/1.1'), L('TCP', 'TCP'), L('One at a time', 'По одному за раз'), L('Text', 'Текстовое')],
          [L('HTTP/2', 'HTTP/2'), L('TCP', 'TCP'), L('Many streams', 'Много потоков'), L('Binary frames', 'Двоичные фреймы')],
          [L('HTTP/3', 'HTTP/3'), L('QUIC over UDP', 'QUIC над UDP'), L('Many streams', 'Много потоков'), L('Binary frames', 'Двоичные фреймы')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The client picks the protocol', 'Версию выбирает клиент'),
          text: L(
            'A fetch call has no version parameter. The client offers a list through ALPN, the server picks one, and the choice depends on the network path in between. Measure what your users actually get instead of assuming it.',
            'У вызова fetch нет параметра версии. Клиент предлагает список через ALPN, сервер выбирает, и выбор зависит от пути по сети. Замеряйте, что получают реальные пользователи, вместо того чтобы предполагать.'
          ),
        },
      ],
      takeaway: L(
        'You do not choose the HTTP version, but you do choose timeouts, reuse and parallelism.',
        'Версию протокола вы не выбираете, а вот таймауты, переиспользование и параллельность — да.'
      ),
      seeAlso: [
        L('Chapter 4: connections, compression and transfer', 'Глава 4: соединения, сжатие и передача'),
        L('Section 1-5: what happens between a click and a response', 'Секция 1-5: что происходит между кликом и ответом'),
      ],
    },
    {
      id: 'http-ch1-s5',
      title: L('The origin and the request pipeline', 'Origin и конвейер запроса'),
      body: L(
        'Between a click and a response the browser performs a chain of steps that is invisible in application code but dominates the perceived latency. The name is resolved through DNS, a TCP connection is established, TLS negotiates keys and certificates, the request is written, the server answers, and the browser parses the response. Each step has a cost, and each one can be the slowest part of a page.\n\nDNS resolution is the first and often the most forgotten step. The browser cache, the operating system resolver cache and the DNS resolver answer at different levels, so a cold lookup can cost tens of milliseconds while a warm one is free. Connection setup follows, and the TLS handshake adds a round trip on top of it, or two when a certificate has to be validated again. A cold visit pays all of this, a warm one pays almost nothing.\n\nThe origin server is only the last hop. In production the request usually travels through a CDN edge, a load balancer and perhaps a service mesh before it reaches the application, and it travels back the same way. Every hop adds a small delay and a place where a header can be rewritten or a connection dropped. Measuring where the time goes means measuring the path, not just the handler.\n\nThe practical consequence for a backend developer is that handler time is only one term of the budget. A 20 ms handler behind a 120 ms TLS handshake and a 30 ms DNS lookup gives a 170 ms response, and optimising the handler to 10 ms changes almost nothing. Profile the whole chain, and remember that the numbers on a terminal next to the server are not the numbers your users get.',
        'Между кликом и ответом браузер проходит цепочку шагов, невидимых в прикладном коде, но именно они определяют ощущаемую задержку. Имя разрешается через DNS, устанавливается TCP-соединение, TLS согласует ключи и сертификаты, запрос уходит, сервер отвечает, браузер разбирает ответ. У каждого шага есть цена, и любой из них может оказаться самым медленным звеном страницы.\n\nРазрешение DNS — первый шаг и самый забываемый. Кэш браузера, кэш резолвера операционной системы и сам DNS отвечают на разных уровнях, поэтому холодный поиск стоит десятки миллисекунд, а тёплый ничего не стоит. Дальше идёт установление соединения, а рукопожатие TLS добавляет ещё один круг, и два, если сертификат приходится проверять заново. Холодный визит платит за всё это, тёплый — почти за ничего.\n\nOrigin-сервер — это последний хоп. В продакшене запрос обычно идёт через край CDN, балансировщик и, возможно, service mesh, и обратно тем же путём. Каждый хоп добавляет небольшую задержку и ещё одно место, где можно переписать заголовок или оборвать соединение. Измерить, где теряется время, значит измерить весь путь, а не только обработчик.\n\nПрактическое следствие для бэкенд-разработчика: время обработчика — лишь одно слагаемое бюджета. Обработчик на 20 мс за TLS-рукопожатием в 120 мс и DNS-lookup в 30 мс дают ответ 170 мс, и оптимизация обработчика до 10 мс не меняет почти ничего. Профилируйте всю цепочку и помните, что числа в терминале рядом с сервером — это не те числа, что видит пользователь.'
      ),
      bullets: [
        L('The order is DNS, TCP, TLS, request, response.', 'Порядок такой: DNS, TCP, TLS, запрос, ответ.'),
        L('DNS and the TLS handshake usually dominate a cold request.', 'DNS и рукопожатие TLS обычно доминируют в холодном запросе.'),
        L('A warm connection removes the handshake and the slow start.', 'Тёплое соединение убирает рукопожатие и медленный старт.'),
        L('The origin is the last hop: CDN, load balancer and mesh come before it.', 'Origin — последний хоп: перед ним край CDN, балансировщик и mesh.'),
        L('Handler time is one term of the budget, not the budget itself.', 'Время обработчика — одно слагаемое бюджета, а не сам бюджет.'),
      ],
      code: `const started = performance.now();

const response = await fetch('/api/orders/42', {
  headers: { Accept: 'application/json' },
  signal: AbortSignal.timeout(5000),
});

const headersReceived = performance.now();
const orders = await response.json();
const finished = performance.now();

console.log('time to headers:', Math.round(headersReceived - started), 'ms');
console.log('body download:', Math.round(finished - headersReceived), 'ms');
console.log('total:', Math.round(finished - started), 'ms');
console.log('cache hit:', response.headers.get('x-cache') ?? 'unknown');`,
      table: {
        caption: L('The cost of each step of the pipeline', 'Цена каждого шага конвейера'),
        headers: [L('Stage', 'Этап'), L('What happens', 'Что происходит'), L('Typical cost', 'Типичная цена'), L('Lever', 'Что крутить')],
        rows: [
          [L('DNS', 'DNS'), L('Name to address', 'Имя в адрес'), L('0 to 100 ms', '0–100 мс'), L('Cache the name', 'Кэшировать имя')],
          [L('TCP', 'TCP'), L('Three way handshake', 'Трёхстороннее рукопожатие'), L('One round trip', 'Один круг'), L('Keep the connection', 'Держать соединение')],
          [L('TLS', 'TLS'), L('Keys and certificate', 'Ключи и сертификат'), L('One to two round trips', 'Один-два круга'), L('Resume sessions', 'Возобновлять сессии')],
          [L('Handler', 'Обработчик'), L('Routing and business logic', 'Маршрутизация и логика'), L('1 to 500 ms', '1–500 мс'), L('Cache and index', 'Кэш и индексы')],
          [L('Transfer', 'Передача'), L('The body travels', 'Идёт тело'), L('Size dependent', 'Зависит от размера'), L('Compress and cache', 'Сжимать и кэшировать')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Local numbers lie', 'Локальные цифры лгут'),
          text: L(
            'A request from your own machine skips the real DNS, the real handshake and the real path, so a 12 ms curl result may be a 180 ms result for a user. Measure from the edge or from real users in the field.',
            'Запрос с вашей машины пропускает настоящий DNS, настоящее рукопожатие и настоящий путь, поэтому результат curl в 12 мс у пользователя может оказаться 180 мс. Измеряйте с края сети или по данным реальных пользователей.'
          ),
        },
      ],
      takeaway: L(
        'Profile the whole chain, because the handler is rarely the slowest part.',
        'Профилируйте всю цепочку: обработчик редко бывает самым медленным звеном.'
      ),
      seeAlso: [
        L('Section 9-1: measuring latency and TTFB', 'Секция 9-1: как измерять задержку и TTFB'),
        L('Chapter 4: keep-alive and connection pools', 'Глава 4: постоянные соединения и пулы соединений'),
      ],
    },
  ],
};
