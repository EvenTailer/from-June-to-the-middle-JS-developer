import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh03: Chapter = {
  id: 'http-ch3',
  title: L('Caching', 'Кэширование'),
  summary: L(
    'How Cache-Control directives decide what may be stored and for how long, how validators turn a full download into a 304, how a CDN edge caches and keys its entries, and how invalidation is handled without a purge storm.',
    'Как директивы Cache-Control решают, что можно хранить и как долго, как валидаторы превращают полную загрузку в 304, как край CDN кэширует и ключует записи и как обходиться без шторма инвалидаций.'
  ),
  sections: [
    {
      id: 'http-ch3-s1',
      title: L('Cache-Control and freshness', 'Cache-Control и свежесть'),
      body: L(
        'Caching is the cheapest performance lever in HTTP, because a cached response costs the network nothing. The Cache-Control header on the response is the control surface, and each directive answers two questions: may this be stored, and for how long may it be reused without asking. A response with no caching directives at all may still be cached heuristically, which is why an API that means to be fresh has to say so explicitly.\n\nThe directives fall into three families. no-store forbids writing the response anywhere, no-cache allows storage but demands revalidation before every reuse, and private forbids shared caches while letting the browser keep a copy. max-age sets a lifetime, s-maxage sets a lifetime for shared caches only, and public explicitly permits shared storage. Reading a directive the way its name suggests is exactly how no-cache gets mistaken for do-not-cache.\n\nFreshness is the core concept: a fresh response needs no round trip at all, and a stale one must be validated. max-age=600 makes the response fresh for ten minutes, after which it becomes stale and a conditional request is needed. A response with no explicit lifetime can still be cached heuristically using Last-Modified, which is why an endpoint that returns a timestamp changes behaviour over time without a single change in the code.',
        'Кэширование — самый дешёвый рычаг производительности в HTTP, потому что кэшированный ответ не стоит сети ничего. Заголовок Cache-Control в ответе — это поверхность управления, и каждая директива отвечает на два вопроса: можно ли это хранить и как долго можно переиспользовать без проверки. Ответ вовсе без кэширующих директив всё равно может быть закэширован эвристически, поэтому API, который намерен быть свежим, обязан сказать это явно.\n\nДирективы делятся на три семейства. no-store запрещает записывать ответ куда-либо, no-cache разрешает хранить, но требует перепроверки перед каждым использованием, а private запрещает общие кэши, оставляя копию в браузере. max-age задаёт срок жизни, s-maxage — срок жизни только для общих кэшей, а public явно разрешает общее хранилище. Чтение директивы так, как подсказывает её имя, и есть причина того, что no-cache путают с «не кэшировать вовсе».\n\nСвежесть — центральное понятие: свежий ответ не требует ни одного круга, а устаревший нужно проверить. max-age=600 делает ответ свежим на десять минут, после чего он устаревает и нужен условный запрос. Ответ без явного срока жизни всё равно может кэшироваться эвристически по Last-Modified, и поэтому эндпоинт, возвращающий метку времени, меняет поведение со временем без единой правки в коде.'
      ),
      bullets: [
        L('no-store forbids writing the response anywhere.', 'no-store запрещает записывать ответ куда-либо.'),
        L('no-cache allows storage but requires revalidation before reuse.', 'no-cache разрешает хранить, но требует перепроверки перед использованием.'),
        L('private forbids shared caches, public explicitly permits them.', 'private запрещает общие кэши, public явно их разрешает.'),
        L('max-age sets freshness, s-maxage overrides it for shared caches.', 'max-age задаёт свежесть, s-maxage перекрывает её для общих кэшей.'),
        L('A response without caching directives can still be cached heuristically.', 'Ответ без кэширующих директив всё равно может кэшироваться эвристически.'),
      ],
      code: `// public: shared caches may store it
// max-age=60: fresh for a minute in every cache
// s-maxage=600: fresh for ten minutes in shared caches only
// stale-while-revalidate=30: serve stale while refreshing in the background
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: public, max-age=60, s-maxage=600, stale-while-revalidate=30
ETag: "orders-v3"

// a response with personal data: never written to any cache
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: no-store`,
      table: {
        caption: L('What each directive permits', 'Что разрешает каждая директива'),
        headers: [L('Directive', 'Директива'), L('Storage', 'Хранение'), L('Reuse without asking', 'Использование без проверки'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('no-store', 'no-store'), L('Forbidden', 'Запрещено'), L('Never', 'Никогда'), L('Personal data', 'Персональные данные')],
          [L('no-cache', 'no-cache'), L('Allowed', 'Разрешено'), L('Never', 'Никогда'), L('Dynamic content', 'Динамический контент')],
          [L('private', 'private'), L('Browser only', 'Только браузер'), L('Until max-age', 'До истечения max-age'), L('Personalised responses', 'Персонализированные ответы')],
          [L('public', 'public'), L('Allowed everywhere', 'Разрешено везде'), L('Until max-age', 'До истечения max-age'), L('Static assets', 'Статика')],
          [L('max-age=600', 'max-age=600'), L('Allowed', 'Разрешено'), L('For 600 seconds', '600 секунд'), L('Any cacheable response', 'Любой кэшируемый ответ')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('no-cache is not do-not-cache', 'no-cache — это не «не кэшировать»'),
          text: L(
            'no-cache lets the cache store the response and forces a revalidation request before each reuse. Only no-store forbids writing it down at all. Confusing the two produces either a privacy leak or a network bill nobody expected.',
            'no-cache разрешает кэшу хранить ответ и заставляет сделать запрос на перепроверку перед каждым использованием. Только no-store запрещает записывать его вообще. Путаница между ними даёт либо утечку данных, либо счёт за трафик, которого никто не ждал.'
          ),
        },
      ],
      takeaway: L(
        'Pick the directive from the sensitivity of the data and how stale it may be, not from habit.',
        'Выбирайте директиву по чувствительности данных и допустимой устареванию, а не по привычке.'
      ),
      seeAlso: [
        L('Section 3-2: max-age, s-maxage and stale-while-revalidate', 'Секция 3-2: max-age, s-maxage и stale-while-revalidate'),
        L('Section 2-2: response headers that matter', 'Секция 2-2: заголовки ответа, которые важны'),
      ],
    },
    {
      id: 'http-ch3-s2',
      title: L('max-age, s-maxage and stale-while-revalidate', 'max-age, s-maxage и stale-while-revalidate'),
      body: L(
        'The lifetime directives solve three different problems, and mixing them up is the usual reason a page is served from a stale edge for an hour. max-age applies to every cache, including the browser. s-maxage applies to shared caches only and overrides max-age there, which is how a page can be revalidated on every browser load while the CDN serves the same file for an hour.\n\nstale-while-revalidate trades freshness for latency. The cache is allowed to serve an expired response while it refreshes it in the background, so the user waits for nothing and the next visitor gets the new version. The window is the price: during it the content is stale, and a directive of stale-while-revalidate=30 means stale for at most thirty seconds. must-revalidate forbids exactly this behaviour, so the two directives contradict each other and only one of them can be in force.\n\nStatic assets deserve a different policy. A file whose name contains a content hash never changes, so it can be served with max-age=31536000 and immutable, and no cache will ever need to purge it, because a new build produces a new URL. The danger is the opposite case: a long max-age on a URL whose content does change, where the only way to update it is to purge every edge by hand.',
        'Директивы срока жизни решают три разные задачи, и путаница между ними — обычная причина того, что страница раздаётся с края устаревшей целый час. max-age действует во всех кэшах, включая браузер. s-maxage действует только в общих кэшах и там перекрывает max-age, и так страница может перепроверяться при каждой загрузке в браузере, пока CDN отдаёт тот же файл час.\n\nstale-while-revalidate меняет свежесть на задержку. Кэш вправе отдать просроченный ответ, обновляя его в фоне, так что пользователь ничем не ждёт, а следующий посетитель получает новую версию. Окно — это цена: внутри него контент устарел, и директива stale-while-revalidate=30 означает устаревание максимум на тридцать секунд. must-revalidate запрещает ровно такое поведение, поэтому две директивы противоречат друг другу и действовать может только одна.\n\nСтатике нужна другая политика. Файл, в имени которого есть хеш содержимого, никогда не меняется, поэтому его можно отдавать с max-age=31536000 и immutable, и ни одному кэшу не понадобится сброс, потому что новая сборка даёт новый URL. Опасность в обратном случае: длинный max-age на URL, содержимое которого меняется, и единственный способ обновить его — вручную сбросить каждый край.'
      ),
      bullets: [
        L('max-age applies to every cache, s-maxage only to shared ones.', 'max-age действует во всех кэшах, s-maxage — только в общих.'),
        L('s-maxage overrides max-age inside shared caches.', 's-maxage перекрывает max-age в общих кэшах.'),
        L('stale-while-revalidate serves stale content while refreshing in the background.', 'stale-while-revalidate отдаёт устаревшее содержимое и обновляет его в фоне.'),
        L('immutable plus a long max-age is right for content-hashed assets.', 'immutable вместе с длинным max-age — правильный выбор для ресурсов с хешем.'),
        L('A long max-age on mutable content turns every update into a purge job.', 'Длинный max-age на меняющемся контенте превращает каждое обновление в ручной сброс.'),
      ],
      code: `// the browser revalidates, the CDN serves it for ten minutes
Cache-Control: public, max-age=0, s-maxage=600, stale-while-revalidate=60

// a content-hashed asset: cache it for a year, never purge it
Cache-Control: public, max-age=31536000, immutable

const response = await fetch('/api/orders');

// Age is how long the response has been sitting in a shared cache
console.log(response.headers.get('age')); // seconds
console.log(response.headers.get('x-cache')); // 'HIT' or 'MISS' on most CDNs`,
      table: {
        caption: L('The lifetime directives side by side', 'Директивы срока жизни рядом'),
        headers: [L('Directive', 'Директива'), L('Scope', 'Охват'), L('Overrides', 'Что перекрывает'), L('Question it answers', 'На какой вопрос отвечает')],
        rows: [
          [L('max-age', 'max-age'), L('Every cache', 'Все кэши'), L('Nothing', 'Ничего'), L('How long is it fresh', 'Сколько свежее')],
          [L('s-maxage', 's-maxage'), L('Shared caches', 'Общие кэши'), L('max-age', 'max-age'), L('How long is the edge copy fresh', 'Сколько свежа копия на краю')],
          [L('stale-while-revalidate', 'stale-while-revalidate'), L('Every cache', 'Все кэши'), L('Nothing', 'Ничего'), L('How long may stale content be served', 'Сколько можно отдавать устаревшее')],
          [L('immutable', 'immutable'), L('Every cache', 'Все кэши'), L('Nothing', 'Ничего'), L('The content will never change', 'Содержимое не изменится')],
          [L('must-revalidate', 'must-revalidate'), L('Every cache', 'Все кэши'), L('stale-while-revalidate', 'stale-while-revalidate'), L('Stale content must be validated', 'Устаревшее надо проверить')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('One URL, one version', 'Один URL — одна версия'),
          text: L(
            'If a resource changes, give it a new address. Versioned paths, a version query parameter or a content hash turn cache invalidation from a coordination problem into a non-event, because nobody has to be told to forget anything.',
            'Если ресурс меняется, дайте ему новый адрес. Версионированные пути, параметр версии или хеш превращают инвалидацию кэша из задачи координации в нечто не требующее действий: никому не нужно сообщать, чтобы что-то забыли.'
          ),
        },
      ],
      takeaway: L(
        'Separate the browser lifetime from the shared cache lifetime with max-age and s-maxage.',
        'Разделяйте срок жизни в браузере и в общем кэше через max-age и s-maxage.'
      ),
      seeAlso: [
        L('Section 3-6: cache invalidation strategies', 'Секция 3-6: стратегии инвалидации кэша'),
        L('Section 3-1: Cache-Control and freshness', 'Секция 3-1: Cache-Control и свежесть'),
      ],
    },
    {
      id: 'http-ch3-s3',
      title: L('Validators: ETag and Last-Modified', 'Валидаторы: ETag и Last-Modified'),
      body: L(
        'A cache that expires every entry downloads everything again. Validators turn that into a cheap question: has this changed? The server attaches an ETag, an opaque string that changes whenever the representation changes, and the client stores it next to the cached body. On the next request the client sends If-None-Match with that value, and the server can answer with a status line and no body at all.\n\nThere are two flavours of ETag. A strong validator promises that the bytes are identical, a weak one only that the representations are semantically equivalent: two JSON documents with the same members in a different order are semantically the same but not byte-identical. Only a strong validator may be used for range requests, where the client asks for bytes 100 to 200 of a file it already knows.\n\nThe older validator is Last-Modified, paired with If-Modified-Since. It is cheaper to compute, because a timestamp is usually at hand, but it has one-second granularity, so a resource modified twice within the same second can produce a stale hit. A strong ETag has no such limit. When both arrive, the server should prefer If-None-Match, because the client that sent it made an explicit choice.',
        'Кэш, у которого истекают все записи, заново скачивает всё. Валидаторы превращают это в дешёвый вопрос: изменилось ли? Сервер вешает ETag — непрозрачную строку, меняющуюся вместе с представлением, — а клиент хранит её рядом с кэшированным телом. При следующем запросе клиент шлёт If-None-Match с этим значением, и сервер может ответить одной строкой состояния вовсе без тела.\n\nУ ETag есть два вида. Сильный валидатор обещает, что байты совпадают, слабый — только что представления семантически равны: два JSON-документа с одинаковыми полями в разном порядке семантически равны, но не байт в байт. Только сильный валидатор годится для range-запросов, где клиент просит байты с 100 по 200 файла, который ему уже известен.\n\nБолее старый валидатор — Last-Modified в паре с If-Modified-Since. Он дешевле в вычислении, потому что метка времени обычно под рукой, но имеет гранулярность в одну секунду, поэтому ресурс, изменённый дважды за секунду, способен дать устаревший попадание. У сильного ETag такого ограничения нет. Когда приходят оба заголовка, сервер должен предпочесть If-None-Match, потому что клиент, который его прислал, сделал явный выбор.'
      ),
      bullets: [
        L('An ETag is an opaque validator that changes when the representation changes.', 'ETag — непрозрачный валидатор, меняющийся вместе с представлением.'),
        L('Strong means byte-identical, weak means semantically equal.', 'Сильный — байт в байт, слабый — семантически равно.'),
        L('Only a strong ETag may be used for range requests.', 'Только сильный ETag годится для range-запросов.'),
        L('Last-Modified has one-second granularity and can miss a change.', 'У Last-Modified гранулярность в секунду, изменение он может пропустить.'),
        L('If-None-Match takes priority over If-Modified-Since when both arrive.', 'Если пришли оба, приоритет у If-None-Match.'),
      ],
      code: `// the first response carries a validator
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
ETag: "orders-v3-9f3a"
Last-Modified: Tue, 14 Oct 2025 09:12:00 GMT
Cache-Control: max-age=0, must-revalidate

// later the client asks whether its copy is still current
GET /api/orders HTTP/1.1
If-None-Match: "orders-v3-9f3a"

HTTP/1.1 304 Not Modified
ETag: "orders-v3-9f3a"`,
      table: {
        caption: L('The two validators', 'Два валидатора'),
        headers: [L('Validator', 'Валидатор'), L('Paired request header', 'Парный заголовок запроса'), L('Precision', 'Точность'), L('Cost', 'Цена')],
        rows: [
          [L('Strong ETag', 'Сильный ETag'), L('If-None-Match, If-Match', 'If-None-Match, If-Match'), L('Byte exact', 'Байт в байт'), L('Needs a version or a hash', 'Нужна версия или хеш')],
          [L('Weak ETag', 'Слабый ETag'), L('If-None-Match', 'If-None-Match'), L('Semantic equality', 'Семантическое равенство'), L('Needs a version or a hash', 'Нужна версия или хеш')],
          [L('Last-Modified', 'Last-Modified'), L('If-Modified-Since', 'If-Modified-Since'), L('One second', 'Одна секунда'), L('Cheap', 'Дёшево')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A changing ETag defeats caching', 'Меняющийся ETag убивает кэширование'),
          text: L(
            'If the ETag is regenerated on every request, for example from the current timestamp or from the response length, every client request becomes a full revalidation and the cache saves nothing. Derive it from the content version instead.',
            'Если ETag пересоздаётся на каждый запрос, например из текущей метки времени или длины ответа, каждый запрос клиента превращается в полную перепроверку, и кэш не экономит ничего. Строьте его из версии содержимого.'
          ),
        },
      ],
      takeaway: L(
        'A validator is only useful if it changes when the content changes and never otherwise.',
        'Валидатор полезен только тогда, когда меняется вместе с содержимым и никогда иначе.'
      ),
      seeAlso: [
        L('Section 3-4: conditional requests and the 304', 'Секция 3-4: условные запросы и 304'),
        L('Section 7-5: idempotency keys and safe retries', 'Секция 7-5: ключи идемпотентности и безопасные повторы'),
      ],
    },
    {
      id: 'http-ch3-s4',
      title: L('Conditional requests and the 304', 'Условные запросы и 304'),
      body: L(
        'A conditional request carries the validator of the copy the client already has and asks the server to do the cheapest possible thing. If-None-Match on a GET is the read case: if the tag still matches, the server answers 304 Not Modified with no body, and the client keeps using its stored copy. The transfer is a handful of headers instead of the whole payload, and the server does no work to produce the body.\n\nThe write case uses If-Match and If-Unmodified-Since. A client that read a document at version 7 can send If-Match with that ETag along with the update. If the document is now at version 8, the server must reject the write with 412 Precondition Failed, because the update was based on an outdated read. This is optimistic concurrency control expressed in one header, and it is what stops the second of two editors from silently overwriting the first.\n\nA 304 is a full response in every respect except the body: it carries the same headers it would have carried with the 200, including ETag, Cache-Control and Expires, because the client needs them to refresh its stored entry. A server that answers 304 with a different ETag than the request carried has built an infinite revalidation loop, where the client asks again on every request and the cache never settles.',
        'Условный запрос несёт валидатор копии, которая у клиента уже есть, и просит сервер сделать самое дешёвое возможное. If-None-Match у GET — это случай чтения: если тег совпадает, сервер отвечает 304 Not Modified без тела, и клиент продолжает использовать сохранённую копию. По сети идут несколько заголовков вместо всего тела, и сервер вообще не тратит работу на его формирование.\n\nСлучай записи использует If-Match и If-Unmodified-Since. Клиент, прочитавший документ версии 7, может отправить If-Match с этим ETag вместе с обновлением. Если документ уже версии 8, сервер обязан отклонить запись с 412 Precondition Failed, потому что обновление опиралось на устаревшее чтение. Это оптимистичная конкурентность, выраженная одним заголовком, и именно она не даёт второму из двух редакторов молча затереть первого.\n\n304 — полноценный ответ во всём, кроме тела: он несёт те же заголовки, что понёс бы 200, включая ETag, Cache-Control и Expires, потому что клиенту они нужны, чтобы освежить свою запись. Сервер, отвечающий 304 с другим ETag, чем был в запросе, построил бесконечный цикл перепроверки, где клиент спрашивает снова каждый раз, и кэш никогда не успокаивается.'
      ),
      bullets: [
        L('If-None-Match with GET asks whether the stored copy is still current.', 'If-None-Match у GET спрашивает, актуальна ли сохранённая копия.'),
        L('A 304 carries headers but no body.', '304 несёт заголовки, но не тело.'),
        L('If-Match turns a write into an optimistic concurrency check.', 'If-Match превращает запись в оптимистичную проверку конкурентности.'),
        L('A failed precondition is answered with 412.', 'Нарушенное предусловие отвечают кодом 412.'),
        L('The 304 must repeat the same ETag and Cache-Control as the 200 would have.', '304 должен повторять те же ETag и Cache-Control, что были бы у 200.'),
      ],
      code: `# the client has version 7 and wants to write
PUT /api/orders/42 HTTP/1.1
If-Match: "orders-42-v7"
Content-Type: application/json

{"status":"paid"}

# the document is still at version 7: the write goes through
HTTP/1.1 200 OK
ETag: "orders-42-v8"

# somebody else already wrote version 8
HTTP/1.1 412 Precondition Failed
Content-Type: application/problem+json

{"title":"Precondition Failed","status":412}`,
      table: {
        caption: L('Conditional request headers', 'Заголовки условных запросов'),
        headers: [L('Header', 'Заголовок'), L('Used with', 'Используется с'), L('Answer when it fails', 'Ответ при несовпадении')],
        rows: [
          [L('If-None-Match', 'If-None-Match'), L('GET, HEAD', 'GET, HEAD'), L('304 Not Modified', '304 Not Modified')],
          [L('If-Modified-Since', 'If-Modified-Since'), L('GET, HEAD', 'GET, HEAD'), L('304 Not Modified', '304 Not Modified')],
          [L('If-Match', 'If-Match'), L('PUT, POST, DELETE', 'PUT, POST, DELETE'), L('412 Precondition Failed', '412 Precondition Failed')],
          [L('If-Unmodified-Since', 'If-Unmodified-Since'), L('PUT, POST, DELETE', 'PUT, POST, DELETE'), L('412 Precondition Failed', '412 Precondition Failed')],
          [L('If-Range', 'If-Range'), L('GET with a Range', 'GET с Range'), L('200 with the full body', '200 с полным телом')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A 304 without the headers is a bug', '304 без заголовков — это баг'),
          text: L(
            'If the 304 omits ETag and Cache-Control, the client cannot refresh its stored copy correctly and may keep an entry it can no longer validate. Answer with the same header set the 200 would have carried.',
            'Если 304 не несёт ETag и Cache-Control, клиент не может корректно освежить сохранённую копию и может держать запись, которую уже нечем проверить. Отвечайте тем же набором заголовков, что был бы у 200.'
          ),
        },
      ],
      takeaway: L(
        'Send the validator you already have and let the server answer with the smallest possible response.',
        'Отправляйте валидатор, который у вас уже есть, и позвольте серверу ответить минимально возможным ответом.'
      ),
      seeAlso: [
        L('Section 3-3: validators, ETag and Last-Modified', 'Секция 3-3: валидаторы, ETag и Last-Modified'),
        L('Section 7-2: status codes in practice', 'Секция 7-2: коды состояния на практике'),
      ],
    },
    {
      id: 'http-ch3-s5',
      title: L('CDNs and edge caching', 'CDN и кэширование на краю'),
      body: L(
        'A CDN is a network of edge servers that keeps copies of your content close to the user. It turns a 150 ms cross-continent round trip into a 10 ms local one, absorbs traffic spikes, absorbs the cost of TLS termination and lets a single origin serve a global audience. The request still reaches the origin when the edge has nothing cached, and it does not reach it at all when the edge does.\n\nThe cache key is the part that decides what the edge stores. By default it is the URL, and the edge varies the entry by the headers listed in the Vary response header. A response with Vary: Accept-Encoding is stored twice, once compressed and once not, while a response with Vary: Cookie is stored per session, which can multiply the storage cost and shrink the hit rate to nothing. Most CDNs offer a way to ignore specific headers in the key for exactly this reason.\n\nServing static assets from the edge is the easy case. Serving HTML from the edge requires care, because the same URL returns different bodies for different users. The standard tools are a short TTL, keying on the user identifier or on a cookie value, and splitting the cacheable part of the page from the personalised part. An edge that caches a personalised page for everyone is a data leak, not a performance trick.',
        'CDN — это сеть краевых серверов, которые держат копии вашего содержимого ближе к пользователю. Он превращает кругосветный круг в 150 мс в локальные 10 мс, поглощает всплески трафика, поглощает стоимость терминации TLS и позволяет одному origin обслуживать аудиторию по всему миру. Запрос доходит до origin, когда краю нечего отдать, и не доходит совсем, когда есть что.\n\nКлюч кэша — вот та часть, которая решает, что именно хранит край. По умолчанию это URL, а запись различается по заголовкам, перечисленным в Vary ответа. Ответ с Vary: Accept-Encoding хранится дважды, сжатый и несжатый, а ответ с Vary: Cookie хранится на каждую сессию, что умножает расходы на хранение и обнуляет долю попаданий. Большинство CDN дают возможность игнорировать отдельные заголовки в ключе именно поэтому.\n\nОтдавать статику с края — простой случай. Отдавать HTML с края нужно осторожно, потому что один и тот же URL возвращает разные тела разным пользователям. Стандартные инструменты: короткий TTL, ключ по идентификатору пользователя или по значению cookie и разделение кэшируемой части страницы от персонализированной. Край, который кэширует персонализированную страницу для всех, — это утечка данных, а не трюк производительности.'
      ),
      bullets: [
        L('An edge server serves cached copies close to the user and terminates TLS.', 'Краевой сервер отдаёт копии рядом с пользователем и терминирует TLS.'),
        L('The cache key is the URL plus the headers named in Vary.', 'Ключ кэша — это URL плюс заголовки, названные в Vary.'),
        L('Vary: Cookie multiplies entries and usually destroys the hit rate.', 'Vary: Cookie множит записи и обычно обнуляет долю попаданий.'),
        L('Caching personalised HTML by default leaks data between users.', 'Кэширование персонализированного HTML по умолчанию утекает данные между пользователями.'),
        L('A short TTL with a stale window is the safe default for HTML.', 'Короткий TTL со stale-окном — безопасный выбор по умолчанию для HTML.'),
      ],
      code: `# a static asset: cached at the edge for a year, immutable
GET /assets/app.9f3a2c.js HTTP/2
Host: app.example.com

HTTP/2 200
cache-control: public, max-age=31536000, immutable
x-cache: HIT
age: 4021

# a personalised page: short TTL, keyed by the user
GET /account HTTP/2
Host: app.example.com
Cookie: sid=8f14e45fceea167a

HTTP/2 200
cache-control: private, max-age=0
x-cache: MISS`,
      table: {
        caption: L('What to cache at the edge', 'Что кэшировать на краю'),
        headers: [L('Content', 'Содержимое'), L('Edge caching', 'Кэш на краю'), L('Cache key', 'Ключ кэша')],
        rows: [
          [L('Static assets with a hash', 'Статика с хешем'), L('Yes, for a year', 'Да, на год'), L('URL', 'URL')],
          [L('HTML with a personal part', 'HTML с персональной частью'), L('Only with a short TTL', 'Только с коротким TTL'), L('URL plus the user id', 'URL плюс id пользователя')],
          [L('API responses', 'Ответы API'), L('Rarely', 'Редко'), L('URL plus the auth context', 'URL плюс контекст доступа')],
          [L('Files uploaded by users', 'Загруженные пользователями файлы'), L('Yes, with a short TTL', 'Да, с коротким TTL'), L('URL', 'URL')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The edge caches what you allow', 'Край кэширует то, что вы разрешили'),
          text: L(
            'A response without Cache-Control may be cached heuristically by one CDN and not by another, so behaviour differs between environments. Set an explicit policy on every response you care about and read the age header to learn what the user actually received.',
            'Ответ без Cache-Control одни CDN кэшируют эвристически, а другие нет, и поведение отличается от окружения к окружению. Задавайте явную политику на каждом важном ответе и смотрите заголовок age, чтобы понять, что получил пользователь.'
          ),
        },
      ],
      takeaway: L(
        'Decide explicitly what the edge may store and how the cache key is built.',
        'Явно решите, что край может хранить и как строится ключ кэша.'
      ),
      seeAlso: [
        L('Section 3-6: cache invalidation strategies', 'Секция 3-6: стратегии инвалидации кэша'),
        L('Section 3-1: Cache-Control and freshness', 'Секция 3-1: Cache-Control и свежесть'),
      ],
    },
    {
      id: 'http-ch3-s6',
      title: L('Cache invalidation strategies', 'Стратегии инвалидации кэша'),
      body: L(
        'Invalidation is the hard half of caching. The cache key tells you where an entry lives, but nothing tells the edge that the entry is stale; you have to say so. Three strategies cover most systems: purging through the CDN API, versioning the URL and accepting a short lifetime. Each one trades a different kind of work: an operation on the infrastructure, a change in the application or a delay in freshness.\n\nPurging is the direct route. You ask the CDN to drop a URL, a prefix or everything, and it does so within seconds. It is the only option when the URL has to stay stable, and it is also the option that scales badly: purging a popular prefix on every content update turns into a thundering herd against the origin. Many CDNs therefore offer a soft purge that marks entries stale and a hard purge that removes them outright.\n\nVersioning the URL removes the need to purge anything. A new version of the asset lives at a new address, the old one stays cached until it expires, and the edge never has to be told. This is why content hashes belong in file names and why a query parameter such as ?v=42 works just as well. The rule is one to one: never reuse a URL for different content, or some cache somewhere will keep serving the old body.',
        'Инвалидация — трудная половина кэширования. Ключ кэша говорит, где лежит запись, но ничего не говорит краю, что запись устарела: об этом нужно сообщить. Три стратегии покрывают большинство систем: сброс через API CDN, версионирование URL и принятие короткого срока жизни. Каждая меняет работу другого рода: операцию на инфраструктуре, правку в приложении или задержку в свежести.\n\nСброс — прямой путь. Вы просите CDN выбросить URL, префикс или всё, и он делает это за секунды. Это единственный вариант, когда URL обязан остаться стабильным, и одновременно вариант, который плохо масштабируется: сброс популярного префикса при каждом обновлении контента превращается в стадо запросов к origin. Поэтому многие CDN предлагают мягкий сброс, который помечает записи устаревшими, и жёсткий, который удаляет их насовсем.\n\nВерсионирование URL снимает необходимость сбрасывать что-либо. Новая версия ресурса живёт по новому адресу, старая остаётся в кэше до истечения, и краю не нужно ничего сообщать. Именно поэтому хеш содержимого живёт в именах файлов и почему параметр ?v=42 работает не хуже. Правило одно к одному: никогда не переиспользуйте URL для разного содержимого, иначе какой-нибудь кэш продолжит отдавать старое тело.'
      ),
      bullets: [
        L('Purging is explicit and immediate but expensive at scale.', 'Сброс явный и мгновенный, но при масштабе дорог.'),
        L('A soft purge marks entries stale, a hard purge removes them.', 'Мягкий сброс помечает записи устаревшими, жёсткий удаляет их.'),
        L('Versioned URLs remove the need to purge at all.', 'Версионированные URL снимают необходимость сбрасывать вообще.'),
        L('Never reuse a URL for different content.', 'Никогда не переиспользуйте URL для разного содержимого.'),
        L('A short TTL is the fallback when nothing else is possible.', 'Короткий TTL — запасной вариант, когда ничего лучше нет.'),
      ],
      code: `# purge one URL at the edge
curl -X PURGE https://api.cdn.example.com/purge \\
  -H 'Authorization: Bearer cdn-token' \\
  -d '{"paths":["/index.html"]}'

# purge everything under a prefix
curl -X PURGE https://api.cdn.example.com/purge \\
  -H 'Authorization: Bearer cdn-token' \\
  -d '{"paths":["/assets/*"]}'

# a versioned URL needs no purge at all
GET /assets/app.9f3a2c.js HTTP/2
cache-control: public, max-age=31536000, immutable`,
      table: {
        caption: L('Three ways to invalidate', 'Три способа инвалидировать'),
        headers: [L('Strategy', 'Стратегия'), L('Freshness', 'Свежесть'), L('Cost', 'Цена'), L('Use when', 'Когда применять')],
        rows: [
          [L('Purge', 'Сброс'), L('Seconds', 'Секунды'), L('Calls to the CDN', 'Обращения к CDN'), L('The URL must stay stable', 'URL обязан остаться стабильным')],
          [L('Versioned URL', 'Версионированный URL'), L('Immediate for new URLs', 'Сразу для новых URL'), L('Nothing', 'Ничего'), L('Static assets', 'Статика')],
          [L('Short TTL', 'Короткий TTL'), L('Up to the TTL', 'До истечения TTL'), L('Nothing', 'Ничего'), L('Dynamic or personal content', 'Динамическое или персональное содержимое')],
          [L('Stale-while-revalidate', 'stale-while-revalidate'), L('Up to the window', 'До конца окна'), L('Background load', 'Фоновая нагрузка'), L('Tolerable staleness', 'Допустимая устарелость')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Design for immutable URLs', 'Проектируйте под неизменяемые URL'),
          text: L(
            'When you design the URL scheme of a new API or a static site, decide up front which resources are immutable and give them hash-like identifiers. Invalidation becomes a solved problem for those resources, and only the genuinely mutable ones need a TTL and a purge plan.',
            'Проектируя схему URL нового API или статического сайта, заранее решите, какие ресурсы неизменяемы, и дайте им идентификаторы вроде хеша. Для этих ресурсов инвалидация решена, а план по TTL и сбросу нужен только по-настоящему изменяемым.'
          ),
        },
      ],
      takeaway: L(
        'Prefer versioned URLs over purges, and never reuse a URL for different content.',
        'Предпочитайте версионированные URL сбросу кэша и никогда не переиспользуйте URL для разного содержимого.'
      ),
      seeAlso: [
        L('Section 3-5: CDNs and edge caching', 'Секция 3-5: CDN и кэширование на краю'),
        L('Section 2-1: request headers that matter', 'Секция 2-1: заголовки запроса, которые важны'),
      ],
    },
  ],
};
