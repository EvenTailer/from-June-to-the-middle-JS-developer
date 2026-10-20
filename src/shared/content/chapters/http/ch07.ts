import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh07: Chapter = {
  id: 'http-ch7',
  title: L('REST resource modelling', 'Модель ресурсов REST'),
  summary: L(
    'How to model a system as resources, which status code each outcome deserves, how to version an API without breaking clients, and how pagination and idempotency keys make retries safe.',
    'Как смоделировать систему как набор ресурсов, какой код статуса заслуживает каждый исход, как версионировать API без поломки клиентов и как постраничная навигация и ключи идемпотентности делают повторы безопасными.'
  ),
  sections: [
    {
      id: 'http-ch7-s1',
      title: L('Resources, URIs and methods', 'Ресурсы, URI и методы'),
      body: L(
        'A REST interface describes the state of a system as a set of resources, and every resource has an identifier that is a URL. The method on that URL is the only verb, and the body carries the state. The model feels restrictive, and that is the point: it pays off because a client that understands one URL can usually guess the others, and because the server can answer GET without thinking about side effects, which makes caching, prefetching and retries safe by default.\n\nThe most common modelling mistake is embedding actions in the path. The URL /orders/42/cancel describes a procedure rather than a resource and forces a new URL for every new operation. The resource-style equivalent is to change the state of the resource: PATCH /orders/42 with a status of cancelled. The verb moves into the method, the noun stays in the path, and the URL keeps meaning the same thing when the workflow changes.\n\nDeep hierarchies cost more than they look. The path /customers/12/orders/1042/items/7 encodes three relationships that a client can only reach by walking the whole chain, so every level becomes another place where authorisation has to be checked and another name that a rename breaks. Flat resources with explicit links work better: /order-items/7 carries a customerId and an orderId, and the relationships live in the payload, where they are fetched when they are actually needed.\n\nIdentifiers work best when they are opaque. A UUID in the path tells the client nothing about the object, and that is exactly what you want: the moment an id encodes a type, a region and a creation time, clients start parsing it and depend on a format you can never change. The URL is a name for the resource, not a database key with a public contract attached to it.',
        'REST-интерфейс описывает состояние системы как набор ресурсов, и у каждого ресурса есть идентификатор — URL. Метод по этому URL остаётся единственным глаголом, а состояние несёт тело. Модель кажется ограничительной, и в этом её смысл: она окупается тем, что клиент, разобравшийся с одним URL, обычно догадывается о других, и тем, что сервер отвечает на GET, не думая о побочных эффектах, а значит кэширование, предзагрузка и повторы по умолчанию безопасны.\n\nСамая частая ошибка моделирования — вшивать действия в путь. URL /orders/42/cancel описывает процедуру, а не ресурс, и требует нового URL для каждой новой операции. Эквивалент в ресурсной модели — изменить состояние ресурса: PATCH /orders/42 со статусом cancelled. Глагол переезжает в метод, существительное остаётся в пути, и URL сохраняет смысл, когда меняется сценарий.\n\nГлубокая иерархия обходится дороже, чем кажется. Путь /customers/12/orders/1042/items/7 кодирует три связи, до которых клиент дотягивается только пройдя всю цепочку, поэтому каждый уровень становится ещё одним местом, где нужна проверка прав, и ещё одним именем, которое ломается при переименовании. Плоские ресурсы с явными ссылками работают лучше: /order-items/7 несёт customerId и orderId, а связи живут в теле ответа, откуда их забирают, когда они действительно понадобились.\n\nИдентификаторы лучше всего работают непрозрачными. UUID в пути не говорит клиенту ничего об объекте, и это как раз то, что нужно: как только id начинает кодировать тип, регион и время создания, клиенты начинают его разбирать и зависеть от формата, который нельзя изменить. URL — это имя ресурса, а не ключ базы с публичным контрактом.'
      ),
      bullets: [
        L('Resources are nouns, the method is the only verb.', 'Ресурсы — существительные, глаголом остаётся только метод.'),
        L('Actions belong in the body, not in the path.', 'Действия живут в теле, а не в пути.'),
        L('Deep hierarchies multiply authorisation checks and renames.', 'Глубокая иерархия умножает проверки прав и переименования.'),
        L('Flat resources with links in the payload age better.', 'Плоские ресурсы со ссылками в теле живут дольше.'),
        L('Opaque ids keep the internal format out of the client contract.', 'Непрозрачные идентификаторы убирают внутренний формат из контракта с клиентом.'),
      ],
      code: `const routes = [
  { method: 'GET', path: '/orders', handler: 'listOrders' },
  { method: 'GET', path: '/orders/:orderId', handler: 'getOrder' },
  { method: 'POST', path: '/orders', handler: 'createOrder' },
  { method: 'PATCH', path: '/orders/:orderId', handler: 'updateOrder' },
  { method: 'DELETE', path: '/orders/:orderId', handler: 'cancelOrder' },
];

// Deep hierarchies cost a name to keep in sync at every hop
const deep = '/customers/:customerId/orders/:orderId/items/:itemId';

// Flat resources and explicit links scale better
const flat = '/order-items/:itemId';`,
      table: {
        caption: L('The same operation expressed two ways', 'Одна и та же операция в двух видах'),
        headers: [L('Procedure style', 'Процедурный вид'), L('Resource style', 'Ресурсный вид')],
        rows: [
          [
            L('POST /orders/42/cancel', 'POST /orders/42/cancel'),
            L('PATCH /orders/42 {"status":"cancelled"}', 'PATCH /orders/42 {"status":"cancelled"}'),
          ],
          [
            L('GET /customers/12/orders', 'GET /customers/12/orders'),
            L('GET /orders?customerId=12', 'GET /orders?customerId=12'),
          ],
          [
            L('POST /orders/42/items/7/refund', 'POST /orders/42/items/7/refund'),
            L('PATCH /order-items/7 {"refunded":true}', 'PATCH /order-items/7 {"refunded":true}'),
          ],
          [
            L('GET /reports/daily.csv', 'GET /reports/daily.csv'),
            L('GET /reports/daily?format=csv', 'GET /reports/daily?format=csv'),
          ],
        ],
      },
      takeaway: L(
        'Model nouns, keep the verb in the method and prefer flat resources with links over deep hierarchies.',
        'Моделируйте существительные, держите глагол в методе и выбирайте плоские ресурсы со ссылками вместо глубокой иерархии.'
      ),
      seeAlso: [
        L('Section 7-2: status codes in practice', 'Секция 7-2: коды статуса на практике'),
        L('Section 8-1: request and response envelopes', 'Секция 8-1: конверты запроса и ответа'),
        L('Section 1-2: methods, idempotency and safety', 'Секция 1-2: методы, идемпотентность и безопасность'),
      ],
    },
    {
      id: 'http-ch7-s2',
      title: L('Status codes in practice', 'Коды статуса на практике'),
      body: L(
        'The status code is the first thing a machine reads in the response, and choosing it well removes a whole class of client bugs. 200 means the read succeeded, 201 means a new resource now exists and its location is in the Location header, and 204 means the operation succeeded and there is nothing to send back. A response with 200 and an empty body is a lie: the client has to guess whether it received a result or a failure.\n\nThe classes carry the contract with the caller. A 4xx says the request will not succeed as written: 400 for a malformed body, 401 for missing or invalid credentials, 403 for a valid identity without the required rights, 404 for a resource that does not exist, 409 for a conflict with the current state, 422 for a well-formed body that fails validation, and 429 for a rate limit. A 5xx says the server failed to handle a request it should have handled: 500 for an unhandled error, 502 for a broken upstream, 503 for overload, 504 for a timeout.\n\nTwo choices are worth arguing about. 404 versus 403 leaks information, because answering 403 for a resource that does not exist tells the caller that it does exist; some APIs answer 404 for both and keep the real reason in the logs. 409 versus 422 separates causes: 409 means the request collides with the current state and the client should read that state again, while 422 means the request is wrong on its own and will be wrong again no matter how often it is retried.\n\nWhatever the code, the body has to say what happened. A stable machine-readable error code, a human-readable message and the request identifier turn a failed call into something a client can branch on and support can trace back to a single log line.',
        'Код статуса — первое, что машина читает в ответе, и правильный выбор убирает целый класс багов на клиенте. 200 означает, что чтение удалось, 201 — что ресурс создан и его адрес лежит в заголовке Location, а 204 — что операция прошла успешно и возвращать нечего. Ответ с кодом 200 и пустым телом это ложь: клиенту приходится угадывать, получил он результат или ошибку.\n\nКлассы несут контракт с вызывающим. 4xx говорит, что запрос в таком виде не пройдёт: 400 для некорректного тела, 401 для отсутствующих или неверных учётных данных, 403 для верной личности без нужных прав, 404 для несуществующего ресурса, 409 для конфликта с текущим состоянием, 422 для правильно сформированного тела, не проходящего проверку, и 429 для превышения лимита. 5xx говорит, что сервер не справился с запросом, который обязан был обработать: 500 для необработанной ошибки, 502 для сломанного апстрима, 503 для перегрузки, 504 для таймаута.\n\nДва выбора стоит обсудить. 404 против 403 выдаёт информацию: ответ 403 на несуществующий ресурс сообщает вызывающему, что ресурс существует; часть API отвечает 404 в обоих случаях, а настоящую причину оставляет в логах. 409 против 422 разделяет причины: 409 означает, что запрос сталкивается с текущим состоянием и клиенту стоит перечитать это состояние, а 422 — что запрос неверен сам по себе и будет неверен при любом повторе.\n\nКаким бы ни был код, тело обязано объяснять, что произошло. Устойчивый машинно-читаемый код ошибки, человекочитаемое сообщение и идентификатор запроса превращают неудачный вызов в то, на что клиент может среагировать, а поддержка — в одну строку лога, к которой можно перейти.'
      ),
      bullets: [
        L('201 Created points at the new resource with a Location header.', '201 Created указывает на новый ресурс заголовком Location.'),
        L('204 No Content means success, no body and no Content-Type.', '204 No Content означает успех, отсутствие тела и отсутствие Content-Type.'),
        L('A 4xx means the request must change, a 5xx means the server failed.', '4xx означает, что запрос надо менять, 5xx — что сервер не справился.'),
        L('409 is a conflict with the current state, 422 is a body that will never validate.', '409 — конфликт с текущим состоянием, 422 — тело, которое не пройдёт проверку никогда.'),
        L('429 with Retry-After tells the client when to come back.', '429 с Retry-After говорит клиенту, когда вернуться.'),
      ],
      code: `import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/orders') {
    const id = 'ord_1042';
    res.writeHead(201, { Location: '/orders/' + id, 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ id, status: 'created' }));
  }
  if (req.method === 'DELETE' && req.url.startsWith('/orders/')) {
    res.writeHead(204); // success, no body, no Content-Type
    return res.end();
  }
  if (req.method === 'PATCH' && req.url === '/orders/1042') {
    res.writeHead(409, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'order_already_paid' }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
});

server.listen(3000);`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not return 200 with an error body', 'Не отдавайте 200 с телом ошибки'),
          text: L(
            'A client that branches on the status code will treat an error wrapped in a 200 as a success and carry the broken state forward. Encode the outcome in the status line, and keep the body for the details.',
            'Клиент, который ветвится по коду статуса, посчитает ошибку внутри 200 успехом и понесёт дальше сломанное состояние. Кодируйте исход в строке статуса, а тело оставьте для подробностей.'
          ),
        },
      ],
      takeaway: L(
        'Let the status line carry the outcome of the request, and let the body carry only the details.',
        'Пусть строка статуса несёт исход запроса, а тело — только подробности.'
      ),
      seeAlso: [
        L('Section 8-3: error formats and the problem details shape', 'Секция 8-3: форматы ошибок и форма problem details'),
        L('Section 7-3: versioning strategies and their trade-offs', 'Секция 7-3: стратегии версионирования и их компромиссы'),
        L('Section 9-3: rate limiting and the 429 contract', 'Секция 9-3: ограничение частоты запросов и контракт 429'),
      ],
    },
    {
      id: 'http-ch7-s3',
      title: L('Versioning strategies', 'Стратегии версионирования'),
      body: L(
        'An API version answers a question clients always ask: which shape does this endpoint expect, and what happens when you change it? Three strategies are common: the version in the path, the version in a header, and the version as a date. None of them is free, and each one pays for itself in a different place.\n\nThe path version, /v2/orders, is the most visible and the most operationally annoying. The client sees the version in the address, every log and proxy shows which version a request used, and routing stays trivial. The cost is that every client has to change to reach the new version, the old URLs stay alive for years, and the number slowly becomes a lie about how many incompatible changes actually happened.\n\nThe header version keeps one clean URL per resource and lets the server negotiate, usually through the Accept header. The cost is that the version becomes invisible: a developer pasting a curl command does not know which version they are calling, and any cache that ignores the Accept header can serve the wrong representation. The date version is the most honest of the three, because the contract really does change on a published day, but it only works when the schedule is real.\n\nThe practical advice is to version at the boundary where clients live, to freeze the previous version into read-only for a defined period, and to avoid breaking changes inside a version at all. A version number is a promise about compatibility, and a promise that has to be broken twice a year is not a promise.',
        'Версия API отвечает на вопрос, который клиенты задают всегда: какую форму ожидает этот эндпоинт и что будет, если вы её измените? Распространены три стратегии: версия в пути, версия в заголовке и версия в виде даты. Ни одна не бесплатна, и каждая окупается в своём месте.\n\nВерсия в пути, /v2/orders, самая заметная и самая раздражающая в эксплуатации. Клиент видит версию в адресе, каждый лог и каждый прокси показывают, какой версией пользовался запрос, а маршрутизация остаётся тривиальной. Цена в том, что каждому клиенту приходится меняться, чтобы достучаться до новой версии, старые URL живут годами, а сам номер постепенно становится ложью о том, сколько на самом деле было несовместимых изменений.\n\nВерсия в заголовке оставляет один чистый URL на ресурс и позволяет серверу договариваться, обычно через заголовок Accept. Цена в том, что версия становится невидимой: разработчик, копирующий команду curl, не знает, какую версию вызывает, а любой кэш, игнорирующий Accept, может отдать не то представление. Версия-дата честнее всех: контракт действительно меняется в опубликованный день, но работает это только при настоящем графике.\n\nПрактический совет: версионировать на той границе, где живут клиенты, замораживать предыдущую версию в режиме «только чтение» на оговорённый срок и вообще не вносить несовместимых изменений внутри версии. Номер версии — обещание совместимости, а обещание, которое приходится нарушать дважды в год, обещанием не является.'
      ),
      bullets: [
        L('A version in the path is visible but leaves every old URL alive forever.', 'Версия в пути заметна, но навсегда оставляет живые старые URL.'),
        L('A version in a header keeps the URL clean and hides the version from logs.', 'Версия в заголовке сохраняет чистый URL и прячет версию от логов.'),
        L('A date version is honest only when the release schedule is real.', 'Версия-дата честна только при настоящем графике релизов.'),
        L('Freezing the old version read-only buys a migration window.', 'Заморозка старой версии в режиме «только чтение» даёт окно на миграцию.'),
        L('A version number is a promise about compatibility, not a counter of releases.', 'Номер версии — обещание совместимости, а не счётчик релизов.'),
      ],
      code: `// Version in the URI: explicit, visible in logs, easy to route
const uriVersioned = '/v2/orders';

// Version in a header: one URL per resource, negotiation at the edge
const acceptHeader = 'application/vnd.example.orders+json; version=2';

// Version by date: the contract changes on a published schedule
const dateVersion = '2024-05-01';

function resolveVersion(accept = '') {
  const match = /version=([^;]+)/.exec(accept);
  return match ? match[1].trim() : dateVersion;
}`,
      table: {
        caption: L('Where the version lives', 'Где живёт номер версии'),
        headers: [L('Strategy', 'Стратегия'), L('Visible in the URL', 'Видна в URL'), L('Main cost', 'Главная цена')],
        rows: [
          [
            L('Path, /v2/orders', 'Путь, /v2/orders'),
            L('Yes', 'Да'),
            L('Old URLs live forever', 'Старые URL живут вечно'),
          ],
          [
            L('Header, Accept: ...; version=2', 'Заголовок, Accept: ...; version=2'),
            L('No', 'Нет'),
            L('Invisible in logs and caches', 'Невидима в логах и кэшах'),
          ],
          [
            L('Date, version=2024-05-01', 'Дата, version=2024-05-01'),
            L('Only in the header', 'Только в заголовке'),
            L('Needs a real release calendar', 'Нужен настоящий календарь релизов'),
          ],
        ],
      },
      takeaway: L(
        'Choose where the version lives once, freeze the old version read-only, and never break a contract inside a version.',
        'Один раз решите, где живёт версия, заморозьте старую в режиме «только чтение» и никогда не ломайте контракт внутри версии.'
      ),
      seeAlso: [
        L('Section 2-3: content negotiation through Accept and Content-Type', 'Секция 2-3: согласование контента через Accept и Content-Type'),
        L('Section 7-5: idempotency keys and safe retries', 'Секция 7-5: ключи идемпотентности и безопасные повторы'),
        L('Section 8-2: field conventions that survive a version bump', 'Секция 8-2: соглашения по полям, переживающие смену версии'),
      ],
    },
    {
      id: 'http-ch7-s4',
      title: L('Pagination: offset, cursor and keyset', 'Постраничная навигация: offset, курсор и keyset'),
      body: L(
        'Pagination exists because a collection is usually larger than one response may carry, and because loading everything at once makes the first byte arrive late. The mechanism has two halves: the client asks for a slice, and the server answers with the slice plus whatever the client needs to ask for the next one. Both halves matter, because a response with the data but no way to continue forces the client to guess.\n\nOffset pagination numbers pages from the start: LIMIT 20 OFFSET 40. It is the easiest to implement and the easiest to get wrong, because the database still has to produce and throw away the forty skipped rows, and that cost grows with the offset. Worse, the result set shifts while the client is paging: a row inserted before the current position moves everything by one, so an item is shown twice or not at all. Offset pagination is only reliable over a collection that does not change.\n\nCursor pagination encodes the position of the last seen item instead of counting skipped rows. The client receives an opaque token carrying the sort key of that item and sends it back to continue. The database seeks straight to the position with an index, so the cost of a page does not grow with depth, and rows inserted earlier cannot shift the window. The price is that a cursor has a meaning the client must not interpret, and that jumping to an arbitrary page is no longer possible.\n\nKeyset pagination is cursor pagination where the position is the sort key itself: WHERE created_at < :last_created_at ORDER BY created_at DESC LIMIT 20. The sort key has to be unique or paired with a tiebreaker, otherwise rows with equal timestamps get skipped or repeated. Keyset works best for infinite feeds, where pages are consumed once and never revisited.',
        'Постраничная навигация существует потому, что коллекция обычно больше, чем можно унести в одном ответе, и потому, что загрузка всего сразу задерживает первый байт. Механизм состоит из двух половин: клиент просит срез, а сервер отвечает срезом и всем, что нужно клиенту, чтобы запросить следующий. Обе половины важны: ответ с данными, но без возможности продолжить, заставляет клиента угадывать.\n\nOffset-навигация нумерует страницы от начала: LIMIT 20 OFFSET 40. Её проще всего реализовать и проще всего сделать неправильно, потому что база всё равно должна создать и выбросить сорок пропущенных строк, и эта цена растёт с ростом смещения. Хуже того, набор данных сдвигается, пока клиент листает: вставленная раньше позиции строка сдвигает всё на одну, и элемент показывается дважды или не показывается вовсе. Offset-навигация надёжна только по неизменяемой коллекции.\n\nКурсорная навигация кодирует позицию последнего увиденного элемента вместо подсчёта пропущенных строк. Клиент получает непрозрачный токен с ключом сортировки этого элемента и отправляет его обратно, чтобы продолжить. База сразу прыгает на нужную позицию по индексу, поэтому цена страницы не растёт с глубиной, а вставленные раньше строки не сдвигают окно. Цена — у токена есть смысл, который клиенту не следует интерпретировать, и прыгнуть на произвольную страницу больше нельзя.\n\nKeyset-навигация — это курсорная навигация, где позицией является сам ключ сортировки: WHERE created_at < :last_created_at ORDER BY created_at DESC LIMIT 20. Ключ сортировки должен быть уникальным либо дополнен разделителем, иначе строки с одинаковой меткой времени будут пропущены или повторены. Keyset лучше всего работает для бесконечных лент, где страницы потребляются один раз и не пересматриваются.'
      ),
      bullets: [
        L('A response without a way to ask for the next page is half an answer.', 'Ответ без возможности запросить следующую страницу — это наполовину ответ.'),
        L('Offset makes the database produce and discard the skipped rows.', 'Offset заставляет базу создавать и отбрасывать пропущенные строки.'),
        L('Rows inserted during offset paging duplicate or hide items.', 'Вставленные строки при offset-навигации дублируют или прячут элементы.'),
        L('Cursor and keyset seek by index, so the cost of a page stays constant.', 'Курсор и keyset ищут по индексу, поэтому цена страницы постоянна.'),
        L('A non-unique sort key needs a tiebreaker or rows get lost.', 'Неуникальному ключу сортировки нужен разделитель, иначе строки теряются.'),
      ],
      code: `// Offset: simple, but the database still walks and discards the skipped rows
const page1 = await db.query(
  'SELECT id, title FROM articles ORDER BY id LIMIT 20 OFFSET 40'
);

// Cursor: the last seen key is part of the request
const page2 = await db.query(
  'SELECT id, title FROM articles WHERE id > ? ORDER BY id LIMIT 20',
  [lastSeenId],
);

// Keyset: the same idea with a composite sort key
const page3 = await db.query(
  'SELECT id, title FROM articles WHERE (created_at, id) < (?, ?) ' +
    'ORDER BY created_at DESC, id DESC LIMIT 20',
  [lastCreatedAt, lastId],
);`,
      table: {
        caption: L('Offset against cursor and keyset', 'Offset против курсора и keyset'),
        headers: [L('Aspect', 'Аспект'), L('Offset', 'Offset'), L('Cursor or keyset', 'Курсор или keyset')],
        rows: [
          [
            L('Cost of page number N', 'Цена страницы номер N'),
            L('Grows with N', 'Растёт с ростом N'),
            L('Constant', 'Постоянна'),
          ],
          [
            L('Rows inserted while paging', 'Вставленные строки во время листания'),
            L('Can duplicate or hide items', 'Могут дублировать или прятать элементы'),
            L('Cannot shift the window', 'Не сдвигают окно'),
          ],
          [
            L('Jump to an arbitrary page', 'Переход на произвольную страницу'),
            L('Possible', 'Возможен'),
            L('Not possible', 'Невозможен'),
          ],
          [
            L('Cacheable URL', 'Кэшируемый URL'),
            L('Yes, the offset is in the URL', 'Да, смещение в URL'),
            L('No, the cursor changes every page', 'Нет, курсор меняется на каждой странице'),
          ],
        ],
      },
      takeaway: L(
        'Use offset only over stable collections, and prefer keyset or cursor pagination for anything that changes while it is being read.',
        'Используйте offset только по неизменяемым коллекциям, а для изменяющихся данных выбирайте keyset или курсорную навигацию.'
      ),
      seeAlso: [
        L('Section 7-1: resources, URIs and methods', 'Секция 7-1: ресурсы, URI и методы'),
        L('Section 8-4: filtering, sorting and search parameters', 'Секция 8-4: параметры фильтрации, сортировки и поиска'),
        L('Section 3-5: cache invalidation strategies', 'Секция 3-5: стратегии сброса кэша'),
      ],
    },
    {
      id: 'http-ch7-s5',
      title: L('Idempotency keys and safe retries', 'Ключи идемпотентности и безопасные повторы'),
      body: L(
        'Idempotency is a promise about semantics; an idempotency key is the mechanism that keeps that promise across a network which may lose a response. The client generates a key for one logical operation, sends it with the request, and reuses exactly the same key when it retries. The server stores the outcome of the first request under that key and replays it for every repeat, so the client ends up with one order and one answer, however many times the packet was actually sent.\n\nThe key has to be claimed before the side effect, not recorded after it. If the server processes the request, times out before it can answer, and only then writes the key down, a retry that arrives inside that window creates a second order. The usual order is: claim the key atomically, do the work, store the response, and if the key is already claimed return the stored answer. A repeated key with a different body is a client bug and deserves a 409.\n\nScope and lifetime are the two decisions. A key belongs to one client and one endpoint, so two clients never collide, and the store is usually a table with a unique index and a time to live at least as long as the longest retry window, often twenty-four hours. The key is also the natural place to hang a request identifier, and the response should echo it back so the client can match a retry to its original.',
        'Идемпотентность — обещание о семантике, а ключ идемпотентности — механизм, который держит это обещание в сети, где ответ может потеряться. Клиент генерирует ключ для одной логической операции, отправляет его с запросом и использует ровно тот же ключ при повторе. Сервер сохраняет исход первого запроса под этим ключом и воспроизводит его для каждого повтора, поэтому у клиента остаётся один заказ и один ответ, сколько бы раз пакет ни ушёл.\n\nКлюч нужно занять до побочного эффекта, а не записать после него. Если сервер обработал запрос, не успел ответить и только потом записал ключ, повтор, пришедший в это окно, создаст второй заказ. Обычный порядок такой: атомарно занять ключ, выполнить работу, сохранить ответ, а если ключ уже занят — вернуть сохранённый. Повтор с тем же ключом, но другим телом, — это баг клиента, и на него отвечают 409.\n\nОбласть действия и время жизни — два решения, которые нужно принять. Ключ принадлежит одному клиенту и одному эндпоинту, поэтому два клиента никогда не сталкиваются, а хранилище обычно представляет собой таблицу с уникальным индексом и временем жизни не меньше самого длинного окна повторов, часто сутки. Ключ — ещё и естественное место для идентификатора запроса, а ответ должен возвращать его, чтобы клиент мог связать повтор с исходным запросом.'
      ),
      bullets: [
        L('The key identifies one logical operation, not one HTTP request.', 'Ключ идентифицирует одну логическую операцию, а не один HTTP-запрос.'),
        L('Claim the key before the side effect, otherwise a retry duplicates it.', 'Ключ занимается до побочного эффекта, иначе повтор его продублирует.'),
        L('Store the response, not only the fact, so the retry gets the same answer.', 'Сохраняйте ответ, а не сам факт, чтобы повтор получил тот же результат.'),
        L('A repeated key with a different body is a client bug and deserves a 409.', 'Повтор ключа с другим телом — баг клиента, и на него отвечают 409.'),
        L('Give keys a TTL longer than the retry window, often twenty-four hours.', 'Давайте ключам время жизни больше окна повторов, обычно сутки.'),
      ],
      code: `// Client: generate the key once and reuse it across every retry
const key = randomUUID();

async function createOrder(payload) {
  return fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify(payload),
  });
}

// Server: claim the key before the side effect, then store the answer
async function handleCreateOrder(req, res) {
  const claimed = await idempotency.claim(req.headers['idempotency-key'], req.body);
  if (!claimed) return respond(409, { error: 'key_reused_with_different_body' });

  const order = await orders.create(req.body);
  const body = { id: order.id, status: order.status };
  await idempotency.save(req.headers['idempotency-key'], { status: 201, body });
  return respond(201, body);
}`,
      callouts: [
        {
          tone: 'tip',
          title: L('Put the key in the header, not in the body', 'Ключ отправляйте в заголовке, а не в теле'),
          text: L(
            'A header keeps the request body identical across retries, which lets the server compare a hash of the body and detect a key reused with different content. A key inside the body would change that body.',
            'Заголовок сохраняет тело запроса неизменным между повторами, и сервер может сравнить хеш тела и заметить ключ, использованный с другим содержимым. Ключ внутри тела менял бы это само тело.'
          ),
        },
      ],
      takeaway: L(
        'Make every retried write safe with a key the client owns, and claim that key before the side effect happens.',
        'Сделайте каждый повторяемый запрос безопасным с помощью ключа, который принадлежит клиенту, и занимайте этот ключ до того, как произойдёт побочный эффект.'
      ),
      seeAlso: [
        L('Section 1-2: methods, idempotency and safety', 'Секция 1-2: методы, идемпотентность и безопасность'),
        L('Section 9-3: retries, rate limits and Retry-After', 'Секция 9-3: повторы, лимиты частоты и Retry-After'),
        L('Section 8-1: request and response envelopes', 'Секция 8-1: конверты запроса и ответа'),
      ],
    },
  ],
};
