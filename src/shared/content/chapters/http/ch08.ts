import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh08: Chapter = {
  id: 'http-ch8',
  title: L('API design', 'Проектирование API'),
  summary: L(
    'How to shape request and response envelopes, which field conventions survive a version bump, how to report errors in a machine-readable way, how filters and search stay safe, and how long-running work is handed back to the client.',
    'Как оформить конверты запроса и ответа, какие соглашения по полям переживают смену версии, как сообщать об ошибках машиночитаемым образом, чем безопасны фильтры и поиск и как отдать клиенту долгую работу.'
  ),
  sections: [
    {
      id: 'http-ch8-s1',
      title: L('Request and response shapes', 'Форма запросов и ответов'),
      body: L(
        'An API is a contract between two programs that never meet, so the shape of every message has to be discoverable from the message itself. The most common arrangement is an envelope: a data field that carries the payload and a meta field that carries information about the transfer itself. The benefit is that a failure can have the same shape as a success, so the client writes one parsing path instead of two.\n\nThe envelope is not free. Every response grows by a few bytes, every client needs a second place to look for the identifier and the timestamp, and a team that puts business data into meta ends up with two structures to validate and two places to forget. The rule that keeps it sane: data holds the resource, meta holds only what describes the transfer. If a field describes the order, it belongs in data even when only the error path uses it.\n\nPagination, filtering and sorting need a predictable home as well, because the client has to build the link to the next page. The usual arrangement is a links object with self, next and prev, plus a meta object that carries a total count when the count is cheap to compute and a cursor when it is not. Reporting both a count and a cursor for the same collection confuses clients, so pick one per endpoint and document it.\n\nWhichever envelope you choose, it has to stay stable. Changing the shape of a response breaks every client that parses it, and the change is invisible in the diff of a single endpoint. Version the envelope the same way you version any other contract, and never rename a field to make it prettier.',
        'API — это контракт между двумя программами, которые никогда не встретятся, поэтому форма каждого сообщения должна читаться из самого сообщения. Самая распространённая схема — конверт: поле data с полезной нагрузкой и поле meta со сведениями о самом обмене. Выгода в том, что ошибка может иметь ту же форму, что и успех, и клиенту достаточно одного пути разбора вместо двух.\n\nКонверт не бесплатен. Каждый ответ тяжелее на несколько байт, каждому клиенту нужно второе место, где искать идентификатор и время, а команда, которая запихнёт бизнес-данные в meta, получает две структуры для проверки и два места, где что-то забудут. Правило, которое держит конверт в узде: data хранит ресурс, meta хранит только то, что описывает обмен. Поле, описывающее заказ, относится к data, даже если его использует только ветка ошибки.\n\nУ постраничной навигации, фильтрации и сортировки тоже должно быть предсказуемое место, потому что клиенту нужно построить ссылку на следующую страницу. Обычная схема — объект links с полями self, next и prev плюс объект meta, где лежит общее количество, если его посчитать дёшево, и курсор, если недёшево. Одновременно сообщать и количество, и курсор для одной коллекции сбивает клиентов, поэтому на эндпоинт выбирают что-то одно и описывают это в документации.\n\nКакой бы конверт вы ни выбрали, он должен оставаться стабильным. Изменение формы ответа ломает каждого клиента, который его разбирает, и это изменение не видно в диффе одного эндпоинта. Версионируйте конверт так же, как любой другой контракт, и никогда не переименовывайте поле, потому что новое имя красивее.'
      ),
      bullets: [
        L('One envelope for success and failure keeps a single client parsing path.', 'Единый конверт для успеха и ошибки оставляет клиенту один путь разбора.'),
        L('data holds the resource, meta holds only the transfer.', 'data хранит ресурс, meta — только сведения об обмене.'),
        L('Business fields never move into meta to save a schema.', 'Бизнес-поля не переезжают в meta ради экономии схемы.'),
        L('Pagination links live in a predictable place in the response.', 'Ссылки постраничной навигации живут в предсказуемом месте ответа.'),
        L('Changing the envelope shape breaks every parser, so version it.', 'Изменение формы конверта ломает всех разборщиков, поэтому версионируйте его.'),
      ],
      code: `// Request envelope: the payload stays one field, the rest is transport
const request = {
  data: { sku: 'A-1', quantity: 2 },
  meta: { requestId: 'req_7f2c', idempotencyKey: 'idem_91ab' },
};

// Response envelope: one shape for every answer, success or failure
const response = {
  data: { id: 'ord_1042', status: 'created' },
  meta: { requestId: 'req_7f2c', timestamp: '2024-05-01T10:00:00Z' },
  links: { self: '/api/orders/ord_1042' },
};

console.log(JSON.stringify(response, null, 2));`,
      callouts: [
        {
          tone: 'note',
          title: L('JSON drops undefined fields', 'JSON выбрасывает поля со значением undefined'),
          text: L(
            'A field set to undefined disappears from the serialised body, which is exactly what you want for a partial update. A field set to null survives, which is how the client says explicitly empty.',
            'Поле со значением undefined исчезает из сериализованного тела, и это ровно то, что нужно для частичного обновления. Поле со значением null сохраняется — так клиент говорит «явно пусто».'
          ),
        },
      ],
      takeaway: L(
        'Keep one envelope for every response, put the resource in data and the transfer details in meta.',
        'Держите один конверт для всех ответов, кладите ресурс в data, а сведения об обмене — в meta.'
      ),
      seeAlso: [
        L('Section 8-3: error formats and the problem details shape', 'Секция 8-3: форматы ошибок и форма problem details'),
        L('Section 7-4: pagination and where the next-page link belongs', 'Секция 7-4: постраничная навигация и место ссылки на следующую страницу'),
        L('Section 7-1: resources, URIs and methods', 'Секция 7-1: ресурсы, URI и методы'),
      ],
    },
    {
      id: 'http-ch8-s2',
      title: L('Naming and field conventions', 'Именование и соглашения по полям'),
      body: L(
        'Field names are the part of an API that clients hard-code into their own code, which makes them the most expensive thing to change. camelCase for JSON is the convention almost every client library assumes, and snake_case in a JSON body means every consumer needs a converter. Pick one and hold it across every resource, because inconsistency is worse than either choice.\n\nDates and times need both a format and a timezone. ISO 8601 in UTC with a trailing Z is the variant that sorts lexicographically and parses without ambiguity. A bare calendar date without a time is a different type from a timestamp, and a local time without an offset is a bug waiting for a server in another region.\n\nMoney is never a float. The safe representation is an integer amount in the smallest unit together with an ISO 4217 currency code, so 1999 with EUR is unambiguous and cannot lose a cent to rounding on the way. Enums should be lowercase, closed and documented, because they end up in switch statements on the client side, where a renamed value is a broken build far away.\n\nNull needs a policy of its own, because it can mean three different things: the field is absent, the field is present and null, or the field is present with a default. One convention applied everywhere solves it: null means explicitly empty, and a missing field means the client did not supply it. That distinction is exactly what lets a PATCH mean a partial update instead of a full replacement.',
        'Имена полей — та часть API, которую клиенты жёстко прописывают в своём коде, а значит, и самая дорогая часть для изменений. camelCase в JSON — соглашение, которое предполагает почти каждая клиентская библиотека, и snake_case в JSON-теле означает, что каждому потребителю нужен конвертер. Выберите одно и держитесь его во всех ресурсах: несогласованность хуже любого из двух вариантов.\n\nДатам и времени нужны и формат, и часовой пояс. ISO 8601 в UTC с завершающим Z — тот вариант, который сортируется лексикографически и разбирается без двусмысленности. Календарная дата без времени — это другой тип, чем метка времени, а местное время без смещения — баг, ждущий сервер в другом регионе.\n\nДеньги никогда не бывают вещественным числом. Безопасное представление — целая сумма в наименьшей единице плюс код валюты по ISO 4217, так что 1999 с EUR однозначны и не теряют копейку на округлении по дороге. Перечисления должны быть в нижнем регистре, закрытыми и описанными, потому что они попадают в switch на стороне клиента, где переименованное значение ломает сборку далеко от места правки.\n\nУ null нужна собственная политика, потому что он может означать сразу три разные вещи: поля нет, поле есть и равно null, поле есть со значением по умолчанию. Одно соглашение, применённое везде, снимает вопрос: null значит «явно пусто», а отсутствующее поле — «клиент не передал значение». Именно это различие превращает PATCH в частичное обновление, а не в полную замену.'
      ),
      bullets: [
        L('camelCase in JSON bodies, the same in every resource.', 'camelCase в JSON-телах, одинаково во всех ресурсах.'),
        L('Timestamps in ISO 8601 UTC with the Z suffix.', 'Метки времени в ISO 8601 UTC с суффиксом Z.'),
        L('Money as an integer amount plus an ISO 4217 currency code.', 'Деньги как целая сумма плюс код валюты по ISO 4217.'),
        L('Enums lowercase, closed and listed in the documentation.', 'Перечисления в нижнем регистре, закрытые и описанные в документации.'),
        L('null means explicitly empty, a missing field means not supplied.', 'null значит «явно пусто», отсутствующее поле — «не передано».'),
      ],
      code: `// Timestamps are ISO 8601 in UTC, always with the offset
const createdAt = '2024-05-01T10:00:00Z';

// Money is an integer amount plus a currency code, never a float
const total = { amount: 1999, currency: 'EUR' };

// Enums are lowercase, closed and documented
const status = 'awaiting_payment'; // awaiting_payment | created | paid | cancelled | shipped

// Absent means absent, null means explicitly empty
const patch = { cancelledAt: null, trackingNumber: undefined };

// Field names stay camelCase everywhere
const order = { id: 'ord_1042', createdAt, total, status };`,
      table: {
        caption: L('Field conventions that keep clients working', 'Соглашения по полям, которые держат клиентов работоспособными'),
        headers: [L('Concept', 'Сущность'), L('Avoid', 'Избегать'), L('Use', 'Использовать')],
        rows: [
          [
            L('Timestamp', 'Метка времени'),
            L('2024-05-01 10:00', '2024-05-01 10:00'),
            L('2024-05-01T10:00:00Z', '2024-05-01T10:00:00Z'),
          ],
          [
            L('Money', 'Деньги'),
            L('19.99', '19.99'),
            L('{ "amount": 1999, "currency": "EUR" }', '{ "amount": 1999, "currency": "EUR" }'),
          ],
          [
            L('Boolean', 'Логическое значение'),
            L('"true"', '"true"'),
            L('true', 'true'),
          ],
          [
            L('Empty value', 'Пустое значение'),
            L('"" or undefined', '"" или undefined'),
            L('null', 'null'),
          ],
          [
            L('Enum member', 'Член перечисления'),
            L('"AwaitingPayment"', '"AwaitingPayment"'),
            L('"awaiting_payment"', '"awaiting_payment"'),
          ],
        ],
      },
      takeaway: L(
        'Fix the format of every field type once and never let a client depend on anything else.',
        'Зафиксируйте формат каждого типа поля один раз и не позволяйте клиенту зависеть ни от чего другого.'
      ),
      seeAlso: [
        L('Section 8-1: request and response envelopes', 'Секция 8-1: конверты запроса и ответа'),
        L('Section 7-3: versioning strategies and their trade-offs', 'Секция 7-3: стратегии версионирования и их компромиссы'),
        L('Section 7-1: resources, URIs and methods', 'Секция 7-1: ресурсы, URI и методы'),
      ],
    },
    {
      id: 'http-ch8-s3',
      title: L('Error formats', 'Формат ошибки'),
      body: L(
        'An error response has two jobs: tell the machine what went wrong and tell the human why. The machine part has to be a stable code rather than prose, because prose gets reworded every quarter and clients end up branching on English sentences. The human part can change freely, and the two must not be mixed into one string, because then every reword becomes a breaking change.\n\nThe shape that has become the default is problem details, standardised in RFC 9457. It carries a type URI identifying the category of the problem, a title, the status code, a detail written for humans, an instance pointing at the request, and room for extension fields. The type URI is the part that matters, because it is the stable contract; the title and the detail exist for display and may be reworded freely.\n\nValidation errors need more than the standard shape, because the client has to know which fields to highlight. Add an errors array with the field path, the offending value and a code, and keep the codes machine-readable: required, too_long, not_a_number. The status for a well-formed request that fails validation is 422, and the same envelope is reused for 409 and 404 with a different type URI.\n\nEvery error response should carry the request identifier, so a support ticket is matched to a log line with a single search. And the error body must never leak internals: stack traces, SQL fragments, file paths and hostnames help an attacker and almost never help the user. Keep them in the server log, where the identifier can find them.',
        'У ответа с ошибкой две задачи: сказать машине, что именно сломалось, и сказать человеку, почему. Машинная часть обязана быть устойчивым кодом, а не прозой, потому что прозу переписывают каждый квартал и клиенты в итоге ветвятся по английским предложениям. Человеческая часть меняется свободно, и смешивать их в одну строку нельзя, иначе каждая правка текста становится ломающим изменением.\n\nФормой, которая стала стандартом де-факто, стала problem details из RFC 9457. В ней есть URI типа, который определяет категорию проблемы, заголовок, код статуса, подробность для человека, instance, указывающий на запрос, и место для расширений. Важен именно URI типа: это устойчивый контракт, а заголовок и подробность существуют для показа и переписываются свободно.\n\nОшибкам проверки нужно больше, чем даёт стандартная форма, потому что клиенту надо знать, какие поля подсветить. Добавьте массив errors с путём поля, неверным значением и кодом, и держите коды машиночитаемыми: required, too_long, not_a_number. Статус для правильно сформированного запроса, не прошедшего проверку, — 422, и тот же конверт переиспользуется для 409 и 404 с другим URI типа.\n\nКаждый ответ с ошибкой должен нести идентификатор запроса, чтобы тикет в поддержку находился в логах одним поиском. И тело ошибки не должно утекать внутренности: трассировки стека, фрагменты SQL, пути к файлам и имена хостов помогают атакующему и почти никогда не помогают пользователю. Оставьте их в серверном логе, где их найдёт идентификатор.'
      ),
      bullets: [
        L('A stable machine code plus a changeable human message.', 'Устойчивый машинный код плюс меняемое человеческое сообщение.'),
        L('Problem details carry type, title, status, detail and instance.', 'Problem details содержат type, title, status, detail и instance.'),
        L('The type URI is the contract, the title and detail are for display.', 'URI типа — это контракт, заголовок и подробность — для показа.'),
        L('Validation errors need the field path and a per-field code.', 'Ошибкам проверки нужен путь поля и код на каждое поле.'),
        L('Never ship stack traces or SQL fragments to the client.', 'Никогда не отправляйте клиенту трассировки стека и фрагменты SQL.'),
      ],
      code: `// RFC 9457 problem details
const problem = {
  type: 'https://api.example.com/problems/validation-error',
  title: 'Request validation failed',
  status: 422,
  detail: 'quantity must be a positive integer',
  instance: '/api/orders',
  errors: [{ field: 'quantity', code: 'not_positive' }],
  traceId: 'req_7f2c',
};

res.writeHead(422, { 'Content-Type': 'application/problem+json' });
res.end(JSON.stringify(problem));`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not branch on the message text', 'Не ветвитесь по тексту сообщения'),
          text: L(
            'Clients that match on "Order not found" break the day someone rewords the sentence. Match on the type URI or on a dedicated code field, and treat the human message as decoration.',
            'Клиенты, которые ищут «Order not found», ломаются в день, когда фразу переформулируют. Сопоставляйте по URI типа или по отдельному полю с кодом, а человеческий текст считайте украшением.'
          ),
        },
      ],
      takeaway: L(
        'Give every failure a stable machine-readable code, a human message and the request identifier, and leak nothing else.',
        'Давайте каждой ошибке устойчивый машиночитаемый код, человеческое сообщение и идентификатор запроса, и не утекайте больше ничего.'
      ),
      seeAlso: [
        L('Section 7-2: status codes in practice', 'Секция 7-2: коды статуса на практике'),
        L('Section 9-5: request ids and structured logs', 'Секция 9-5: идентификаторы запросов и структурированные логи'),
        L('Section 8-2: naming and field conventions', 'Секция 8-2: именование и соглашения по полям'),
      ],
    },
    {
      id: 'http-ch8-s4',
      title: L('Filtering, sorting and search', 'Фильтрация, сортировка и поиск'),
      body: L(
        'A read endpoint that can only return everything is an endpoint nobody uses, so filters, sorting and search have to live somewhere in the request. The query string is the place, because it is visible, bookmarkable, cacheable, and needs no body on a GET. The rules are simple: every parameter has a documented name, every value is validated against an allowlist, and every unknown parameter is either rejected on purpose or ignored on purpose.\n\nSorting is where validation matters most, because the sort field usually ends up in an ORDER BY clause. Accept only the columns from a fixed list, never the raw parameter value. The same applies to the direction, which has to be one of two known values, and to the limit, which needs a maximum and a check for a positive integer: an unbounded limit is a denial of service with a nice URL, and a value that is not a number at all has to fall back to the default instead of reaching the query.\n\nSearch is the expensive one. A naive substring match over a large table cannot use an index and holds locks for as long as it runs. Full-text search belongs in the search engine of the database or in a separate index, the query language of that engine is not the query language of the API, and the response should say how the results were produced so the client can label them as approximate.\n\nFilter combinations multiply quickly. A general filter syntax with nested conditions is convenient to expose and easy to turn into a query the database cannot plan. The pragmatic rule is a small fixed set of filters that compose with AND, pagination on top of them, and a log of the filter combinations that turn out to be expensive, so the next one can be optimised instead of guessed at.',
        'Эндпоинт чтения, умеющий только вернуть всё, никто не использует, поэтому фильтры, сортировка и поиск должны где-то жить в запросе. Место для них — query-строка, потому что она видна, попадает в закладки, кэшируется и не требует тела у GET. Правила простые: у каждого параметра есть задокументированное имя, каждое значение проверяется по белому списку, а каждый неизвестный параметр либо отклоняется намеренно, либо игнорируется намеренно.\n\nСортировка — место, где проверка важнее всего, потому что поле сортировки обычно попадает в ORDER BY. Принимайте только колонки из фиксированного списка и никогда сырое значение параметра. То же касается направления: оно должно быть одним из двух известных значений, и предела: у limit есть максимум и проверка на положительное целое число, потому что без максимума это отказ в обслуживании с красивым URL, а значение, которое вообще не число, должно заменяться значением по умолчанию, а не доходить до запроса.\n\nПоиск — самая дорогая часть. Наивный поиск подстроки по большой таблице не пользуется индексом и держит блокировки всё время выполнения. Полнотекстовый поиск живёт в поисковом движке базы или в отдельном индексе, язык запросов этого движка не равен языку запросов API, а ответ должен сообщать, как получен результат, чтобы клиент мог пометить его как приблизительный.\n\nКомбинации фильтров растут быстро. Общий синтаксис фильтров с вложенными условиями удобно отдавать и очень легко превратить в запрос, который база не может спланировать. Практичное правило: небольшой фиксированный набор фильтров, которые комбинируются через AND, поверх них постраничная навигация и лог дорогих комбинаций, чтобы следующий случай оптимизировали, а не угадывали.'
      ),
      bullets: [
        L('Filters, sorting and search live in the query string.', 'Фильтры, сортировка и поиск живут в query-строке.'),
        L('Sort fields and status values come from an allowlist, never from the raw parameter.', 'Поля сортировки и значения статуса берутся из белого списка, а не из сырого параметра.'),
        L('Limit always has a maximum, otherwise a URL is a denial of service.', 'У limit всегда есть максимум, иначе URL становится отказом в обслуживании.'),
        L('Search belongs in a full-text index, not in a scan over the table.', 'Поиск живёт в полнотекстовом индексе, а не в просмотре таблицы.'),
        L('A small set of composable filters beats a general query language.', 'Небольшой набор composable-фильтров лучше общего языка запросов.'),
      ],
      code: `const ALLOWED_SORTS = new Set(['created_at', 'total', 'status']);
const ALLOWED_STATUSES = new Set(['created', 'awaiting_payment', 'paid', 'cancelled']);

const query = new URLSearchParams(location.search);
const requestedStatus = query.get('status') ?? 'created';
const status = ALLOWED_STATUSES.has(requestedStatus) ? requestedStatus : 'created';
const requestedSort = query.get('sort');
const sort = ALLOWED_SORTS.has(requestedSort) ? requestedSort : 'created_at';

// a limit that is not a positive integer never reaches the query
const requestedLimit = Number(query.get('limit') ?? 20);
const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
  ? Math.min(requestedLimit, 100)
  : 20;
const q = query.get('q')?.trim() ?? '';

// The sort field comes from the allowlist and is never interpolated raw
const filters = { status, sort, limit, q };`,
      callouts: [
        {
          tone: 'warning',
          title: L('Validate the limit before the query', 'Проверяйте limit до запроса'),
          text: L(
            'A limit of 100000 turns a cheap endpoint into a slow one and holds the database while it streams the rows. Clamp the number on the server, every time, and never trust the value the client sent.',
            'limit в 100000 превращает дешёвый эндпоинт в медленный и держит базу, пока строки отдаются. Ограничивайте число на сервере всегда и никогда не доверяйте присланному значению.'
          ),
        },
      ],
      takeaway: L(
        'Put filters in the query string, validate every value against an allowlist and clamp the limit.',
        'Кладите фильтры в query-строку, проверяйте каждое значение по белому списку и ограничивайте limit.'
      ),
      seeAlso: [
        L('Section 7-4: pagination with offset, cursor and keyset', 'Секция 7-4: постраничная навигация: offset, курсор и keyset'),
        L('Section 6-6: injection as the family of unvalidated input bugs', 'Секция 6-6: инъекция как семейство багов непроверенного ввода'),
        L('Section 3-6: cache invalidation strategies', 'Секция 3-6: стратегии инвалидации кэша'),
      ],
    },
    {
      id: 'http-ch8-s5',
      title: L('Long-running operations and webhooks', 'Долгие операции и вебхуки'),
      body: L(
        'Some work does not fit inside a request: importing a million rows, rendering a report, sending a million messages. If the endpoint waits for it, the client waits too, and every proxy in between eventually times the request out. The protocol answer is to accept the job, return a resource that describes it, and let the client come back later for the result.\n\nThe response is 202 Accepted with a Location header pointing at the job resource and a body that carries the job state. The client polls that URL and the resource moves through queued, running, succeeded and failed. Polling is simple but wasteful with thousands of jobs, and every poll is a request the server has to answer even when nothing has changed.\n\nThe other option is a webhook: the server calls a URL the client registered and the client does not have to ask at all. The callback carries the job identifier, the event type and the result, and it is signed so the receiver can verify that the call really came from the provider. The receiver has to answer quickly, because the sender retries on a non-2xx answer, and every retry needs the same deduplication that a client-side idempotency key provides.\n\nEither way the job resource stays the source of truth and the callback is only a notification. A client that lost a webhook can always ask for the job state, and a client that received one can always confirm it before acting. That difference is what separates a notification from a source of truth.',
        'Некоторая работа не помещается в один запрос: импорт миллиона строк, генерация отчёта, отправка миллиона писем. Если эндпоинт ждёт её, клиент ждёт тоже, и любой промежуточный прокси рано или поздно отвалит запрос по таймауту. Ответ протокола — принять задачу, вернуть ресурс, который её описывает, и дать клиенту прийти позже за результатом.\n\nОтвет — 202 Accepted с заголовком Location, указывающим на ресурс задачи, и телом, где лежит состояние. Клиент опрашивает этот URL, а ресурс переходит из состояния queued в running, потом в succeeded или failed. Опрос прост, но расточителен при тысячах задач, и каждый опрос — запрос, на который сервер обязан ответить, даже если ничего не изменилось.\n\nДругой вариант — вебхук: сервер вызывает зарегистрированный клиентом URL, и клиенту вообще не нужно спрашивать. Обратный вызов несёт идентификатор задачи, тип события и результат, и он подписан, поэтому получатель может проверить, что вызов действительно пришёл от провайдера. Получатель обязан отвечать быстро, потому что отправитель повторяет вызов на ответ не 2xx, и каждому повтору нужна та же дедупликация, которую даёт ключ идемпотентности на стороне клиента.\n\nВ любом случае источником истины остаётся ресурс задачи, а обратный вызов — только уведомление. Клиент, потерявший вебхук, всегда может спросить состояние задачи, а получивший — всегда может подтвердить его перед действием. Именно это отличает уведомление от источника истины.'
      ),
      bullets: [
        L('202 Accepted plus a Location header pointing at the job resource.', '202 Accepted плюс заголовок Location, указывающий на ресурс задачи.'),
        L('The job resource moves through queued, running, succeeded and failed.', 'Ресурс задачи переходит из queued в running, потом в succeeded или failed.'),
        L('Webhooks are signed so the receiver can verify the sender.', 'Вебхуки подписаны, чтобы получатель мог проверить отправителя.'),
        L('A delivery that gets a non-2xx answer is retried and must be deduplicated.', 'Доставка с ответом не 2xx повторяется и должна дедуплицироваться.'),
        L('The job resource stays the source of truth, the callback is only a hint.', 'Ресурс задачи остаётся источником истины, обратный вызов — только намёк.'),
      ],
      code: `// The server accepts the job and says where to watch it
res.writeHead(202, {
  Location: '/api/jobs/job_7f2c',
  'Content-Type': 'application/json',
});
res.end(JSON.stringify({ id: 'job_7f2c', status: 'queued' }));

// The client polls the job resource until it settles
const job = await (await fetch('/api/jobs/job_7f2c')).json();
if (job.status === 'succeeded') console.log(job.result);

// The server signs the callback so the receiver can verify it
const signature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

// The receiver recomputes the HMAC once and compares in constant time
const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
const given = Buffer.from(signatureHeader ?? '', 'utf8');
const check = Buffer.from(expected, 'utf8');
const valid = given.length === check.length && crypto.timingSafeEqual(given, check);`,
      callouts: [
        {
          tone: 'note',
          title: L('The callback is a hint, the resource is the truth', 'Обратный вызов — намёк, ресурс — истина'),
          text: L(
            'Every webhook system eventually delivers a callback twice or not at all. Write the handler so that acting twice is harmless, and always allow the client to ask for the state directly.',
            'Любая система с вебхуками рано или поздно доставит обратный вызов дважды или ни разу. Пишите обработчик так, чтобы повторное действие было безвредным, и всегда оставляйте клиенту возможность спросить состояние напрямую.'
          ),
        },
      ],
      takeaway: L(
        'Accept long work with 202 and a job resource, and treat the webhook as a notification the client verifies against that resource.',
        'Принимайте долгую работу через 202 и ресурс задачи, а вебхук считайте уведомлением, которое клиент сверяет с этим ресурсом.'
      ),
      seeAlso: [
        L('Section 7-5: idempotency keys and safe retries', 'Секция 7-5: ключи идемпотентности и безопасные повторы'),
        L('Section 6-1: TLS and certificates, for the callback endpoint', 'Секция 6-1: TLS и сертификаты, для эндпоинта обратного вызова'),
        L('Section 9-4: health checks and readiness probes', 'Секция 9-4: проверки здоровья и готовности'),
      ],
    },
  ],
};
