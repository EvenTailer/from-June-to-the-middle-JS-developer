import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh04: Chapter = {
  id: 'http-ch4',
  title: L('Connections, compression and transfer', 'Соединения, сжатие и передача'),
  summary: L(
    'Why a reused connection is cheaper than a new one, what HTTP/2 multiplexing and HPACK changed, how QUIC reshapes the transport in HTTP/3, and which content is worth compressing.',
    'Почему переиспользованное соединение дешевле нового, что изменили мультиплексирование и HPACK в HTTP/2, как QUIC перестроила транспорт в HTTP/3 и какое содержимое вообще стоит сжимать.'
  ),
  sections: [
    {
      id: 'http-ch4-s1',
      title: L('Keep-alive and connection pools', 'Постоянные соединения и пулы соединений'),
      body: L(
        'Opening a connection is not free. A TCP connection needs a handshake of one round trip, and a TLS connection needs at least one more, plus the certificate chain and the key exchange. Add the slow start of TCP, where the first packets travel with a small congestion window, and a fresh connection is measurably slower than a warm one for exactly the same request.\n\nKeep-alive exists to amortise that cost. The connection stays open after the response, the next request to the same origin reuses it, and the handshake happens once per idle period rather than once per request. In HTTP/1.1 it is the default, so a client that closes the connection after every response pays a tax on every call, and a server that answers Connection: close forces that tax on every client.\n\nConnections are a limited resource and both ends keep a pool. A browser opens roughly six sockets per origin and queues the requests beyond that, so a slow endpoint does not only delay itself, it delays everything queued behind it in the same origin. On the server side the pool must be sized for the concurrency the application can actually serve: a pool larger than the worker capacity only moves the queue inside the process.\n\nTimeouts belong to this layer rather than to the handler. A connection that never answers must be closed, otherwise the pool leaks one slot per stuck request and the service degrades into a slow crawl instead of a clean failure. Read timeouts, write timeouts and an overall deadline are what turn a hung network into a 504 rather than an outage.',
        'Открытие соединения не бесплатно. TCP-соединению нужен рукопожатие в один круг, TLS-соединению — как минимум ещё один, плюс цепочка сертификатов и обмен ключами. Добавьте медленный старт TCP, где первые пакеты идут с маленьким окном перегрузки, и свежее соединение окажется измеримо медленнее тёплого для буквально того же запроса.\n\nПостоянное соединение существует ради амортизации этой цены. Соединение остаётся открытым после ответа, следующий запрос к тому же origin его переиспользует, и рукопожатие случается раз за период простоя, а не на каждый запрос. В HTTP/1.1 это поведение по умолчанию, поэтому клиент, закрывающий соединение после каждого ответа, платит налог на каждый вызов, а сервер, отвечающий Connection: close, навязывает этот налог каждому клиенту.\n\nСоединения — ограниченный ресурс, и пул держит каждая сторона. Браузер открывает примерно шесть сокетов на origin и ставит в очередь всё, что не поместилось, поэтому медленный эндпоинт задерживает не только себя, но и всё, что стоит за ним в том же origin. На сервере пул должен соответствовать конкурентности, которую приложение реально обслуживает: пул больше, чем пропускная способность воркеров, лишь переносит очередь внутрь процесса.\n\nТаймауты принадлежат этому слою, а не обработчику. Соединение, которое не отвечает, нужно закрывать, иначе пул теряет по одному слоту на каждый зависший запрос и сервис деградирует в медленное ползание вместо чистого отказа. Таймауты чтения, таймауты записи и общий дедлайн превращают зависшую сеть в 504, а не в аварию.'
      ),
      bullets: [
        L('A fresh connection pays a TCP handshake, a TLS handshake and the slow start.', 'Свежее соединение платит за рукопожатие TCP, рукопожатие TLS и медленный старт.'),
        L('Keep-alive amortises that cost over many requests.', 'Постоянное соединение амортизирует эту цену по многим запросам.'),
        L('A browser keeps about six sockets per origin and queues the rest.', 'Браузер держит около шести сокетов на origin, остальное ставит в очередь.'),
        L('A server pool larger than its worker capacity only moves the queue.', 'Пул больше пропускной способности воркеров лишь переносит очередь.'),
        L('Timeouts belong to the connection layer, not only to the handler.', 'Таймауты принадлежат слою соединений, а не только обработчику.'),
      ],
      code: `import http from 'node:http';

const agent = new http.Agent({
  keepAlive: true,     // reuse sockets between requests
  maxSockets: 64,      // cap on concurrent sockets
  maxFreeSockets: 16,  // sockets kept open for reuse
  timeout: 5000,       // destroy sockets that stayed idle for 5s
});

const body = await new Promise((resolve, reject) => {
  const req = http.request('http://api.example.com/orders/42', { agent }, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => resolve(data));
  });
  req.on('error', reject);
  req.end();
});

console.log(body);`,
      table: {
        caption: L('The options of a Node HTTP agent', 'Опции агента HTTP в Node'),
        headers: [L('Option', 'Опция'), L('Default', 'По умолчанию'), L('Effect', 'Эффект')],
        rows: [
          [L('keepAlive', 'keepAlive'), L('false', 'false'), L('Reuse sockets between requests', 'Переиспользовать сокеты между запросами')],
          [L('maxSockets', 'maxSockets'), L('Infinity', 'Infinity'), L('Cap on concurrent sockets', 'Предел одновременных сокетов')],
          [L('maxFreeSockets', 'maxFreeSockets'), L('256', '256'), L('Sockets kept warm for reuse', 'Сокеты, оставленные тёплыми')],
          [L('timeout', 'timeout'), L('No timeout', 'Без таймаута'), L('Destroy idle sockets', 'Уничтожать простаивающие сокеты')],
          [L('agent: false', 'agent: false'), L('Pooling on', 'Пул включён'), L('Disable pooling entirely', 'Отключить пул совсем')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Connection: close defeats keep-alive', 'Connection: close отменяет постоянное соединение'),
          text: L(
            'A server or a proxy that answers with Connection: close forces every client to open a new connection for the next request. Behind a load balancer this is a common and invisible setting, and it shows up as a slow API with a completely normal server CPU.',
            'Сервер или прокси, отвечающий Connection: close, заставляет каждого клиента открывать новое соединение для следующего запроса. За балансировщиком это распространённая и незаметная настройка, и она выглядит как медленный API при совершенно нормальной загрузке сервера.'
          ),
        },
      ],
      takeaway: L(
        'Reuse connections and set timeouts, because an idle socket is cheaper than a new handshake.',
        'Переиспользуйте соединения и задавайте таймауты: простаивающий сокет дешевле нового рукопожатия.'
      ),
      seeAlso: [
        L('Section 1-4: HTTP versions and keep-alive', 'Секция 1-4: версии HTTP и постоянные соединения'),
        L('Section 4-3: HTTP/3 and QUIC', 'Секция 4-3: HTTP/3 и QUIC'),
      ],
    },
    {
      id: 'http-ch4-s2',
      title: L('HTTP/2 multiplexing and HPACK', 'Мультиплексирование HTTP/2 и HPACK'),
      body: L(
        'HTTP/2 replaced the text framing of HTTP/1.1 with binary frames and turned one connection into a transport for many independent streams. Each request becomes a stream with its own identifier, frames of different streams are interleaved on the wire and reassembled by the receiver. The application still sees a request and a response, but the constraint that one connection carries one request at a time is gone.\n\nThat removes head-of-line blocking at the protocol level: a stream waiting for a slow origin no longer stops the others from progressing. It also removes the need for the browser to open six connections per origin, because dozens of requests now share a single socket. The remaining bottleneck is the origin itself and the flow control window, not the request queue.\n\nHPACK is the header compression of HTTP/2. It replaces repeated header names with an index into a table, keeps a table of recently seen values and encodes the rest with Huffman coding and small integer codes. A request with twenty identical headers shrinks dramatically, and the table state belongs to the connection, which is why HPACK needs care on a connection that carries traffic from different users.\n\nHTTP/2 also added server push, priority signalling and better flow control. Server push was removed from most implementations after years of little use and some real performance problems, so nothing should depend on it. The parts that stayed are the ones that come for free: concurrency, header compression and one connection per origin.',
        'HTTP/2 заменил текстовое обрамление HTTP/1.1 двоичными фреймами и превратил одно соединение в транспорт для множества независимых потоков. Каждый запрос становится потоком со своим идентификатором, фреймы разных потоков перемежаются на проводе и собираются заново получателем. Приложение по-прежнему видит запрос и ответ, но ограничение «одно соединение — один запрос за раз» исчезло.\n\nЭто снимает head-of-line blocking на уровне протокола: поток, ожидающий медленный origin, больше не останавливает остальные. Это же убирает необходимость браузеру открывать шесть соединений на origin, потому что десятки запросов теперь делят один сокет. Оставшееся узкое место — сам origin и окно управления потоком, а не очередь запросов.\n\nHPACK — это сжатие заголовков в HTTP/2. Он заменяет повторяющиеся имена заголовков индексом в таблице, держит таблицу недавно встреченных значений и кодирует остальное кодом Хоффмана и маленькими целыми. Запрос с двадцатью одинаковыми заголовками сжимается радикально, а состояние таблицы принадлежит соединению, поэтому HPACK требует осторожности на соединении, по которому идут запросы разных пользователей.\n\nHTTP/2 также добавил server push, сигнализацию приоритетов и улучшенное управление потоком. Server push убрали из большинства реализаций после лет малого использования и нескольких реальных проблем с производительностью, поэтому полагаться на него не стоит. Осталось то, что достаётся бесплатно: конкурентность, сжатие заголовков и одно соединение на origin.'
      ),
      bullets: [
        L('HTTP/2 multiplexes many streams over one connection.', 'HTTP/2 мультиплексирует множество потоков в одном соединении.'),
        L('Binary framing replaces the text format of HTTP/1.1.', 'Двоичные фреймы заменяют текстовый формат HTTP/1.1.'),
        L('Head-of-line blocking at the connection level disappears.', 'Head-of-line blocking на уровне соединения исчезает.'),
        L('HPACK compresses headers with a per-connection table and Huffman coding.', 'HPACK жмёт заголовки таблицей соединения и кодом Хоффмана.'),
        L('Server push was dropped by browsers, so do not design around it.', 'Браузеры выбросили server push, так что не стройте на нём решение.'),
      ],
      code: `$ curl -s --http2 -o /dev/null -w '%{http_version} %{time_total}\\n' \\
    https://api.example.com/orders/42
2 0.031

// six requests that used to need six connections
const started = performance.now();

const responses = await Promise.all(
  Array.from({ length: 6 }, (_, i) => fetch('/api/orders/' + (i + 1)))
);

console.log('version:', responses[0].httpVersion); // '2'
console.log('elapsed:', Math.round(performance.now() - started), 'ms');`,
      table: {
        caption: L('HTTP/1.1 against HTTP/2', 'HTTP/1.1 против HTTP/2'),
        headers: [L('Feature', 'Свойство'), L('HTTP/1.1', 'HTTP/1.1'), L('HTTP/2', 'HTTP/2')],
        rows: [
          [L('Framing', 'Обрамление'), L('Text', 'Текстовое'), L('Binary frames', 'Двоичные фреймы')],
          [L('Requests per connection', 'Запросов на соединение'), L('One at a time', 'По одному за раз'), L('Many streams', 'Много потоков')],
          [L('Header encoding', 'Кодирование заголовков'), L('Plain text', 'Открытым текстом'), L('HPACK', 'HPACK')],
          [L('Head-of-line blocking', 'Head-of-line blocking'), L('Yes', 'Есть'), L('No', 'Нет')],
          [L('Connections per origin in a browser', 'Соединений на origin в браузере'), L('About six', 'Около шести'), L('One', 'Одно')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('HPACK state belongs to the connection', 'Состояние HPACK принадлежит соединению'),
          text: L(
            'The header compression table lives in one connection and holds values seen in earlier requests on it. Terminating TLS at a load balancer that then pools connections can mix the state of different users. If you ever see strange header corruption, this is where to look.',
            'Таблица сжатия заголовков живёт в одном соединении и хранит значения, встреченные в предыдущих запросах на нём. Терминация TLS на балансировщике, который потом пулит соединения, способна смешать состояние разных пользователей. Если встретится странная порча заголовков, ищите здесь.'
          ),
        },
      ],
      takeaway: L(
        'HTTP/2 removes the queue in front of your origin, not the work inside it.',
        'HTTP/2 убирает очередь перед вашим origin, а не нагрузку внутри него.'
      ),
      seeAlso: [
        L('Section 4-3: HTTP/3 and QUIC', 'Секция 4-3: HTTP/3 и QUIC'),
        L('Section 1-4: HTTP versions and keep-alive', 'Секция 1-4: версии HTTP и постоянные соединения'),
      ],
    },
    {
      id: 'http-ch4-s3',
      title: L('HTTP/3 and QUIC', 'HTTP/3 и QUIC'),
      body: L(
        'HTTP/3 runs over QUIC, a transport protocol built on UDP, and the move is not only about the version number. QUIC integrates the TLS 1.3 handshake into the transport, so one round trip establishes a secure connection and the certificate chain is validated the way it always was. Because UDP carries no connection state, there is no TCP handshake to wait for and no congestion window to climb from scratch.\n\nThe main gain is loss isolation. In TCP a lost packet stalls every stream on the connection until it is retransmitted, and that is the head-of-line blocking HTTP/2 could not remove. In QUIC each stream is independent, so a lost packet delays one request while the others continue. On lossy mobile networks, where a large share of the traffic comes from, this is the difference between a stalled page and a usable one.\n\nEarly data, usually called 0-RTT, lets the client send application data in the first flight of the handshake. It removes a round trip for the first request and it comes with a replay risk: the data may be delivered more than once. That is why early data is only safe for idempotent requests, and why it is used for resumable downloads and static content rather than for a payment.\n\nQUIC also supports connection migration: a client that changes networks keeps the same logical connection and only its identifier changes. That matters on phones moving between Wi-Fi and cellular. The practical advice is unchanged: you do not choose the version, the client and the server negotiate it, and what remains worth tuning are timeouts, concurrency and payload size.',
        'HTTP/3 работает поверх QUIC — транспортного протокола, построенного на UDP, и переход этот не только про номер версии. QUIC встраивает рукопожатие TLS 1.3 в транспорт, поэтому один круг устанавливает защищённое соединение, а цепочка сертификатов проверяется как обычно. Поскольку UDP не несёт состояния соединения, не нужно ждать рукопожатия TCP и не нужно поднимать окно перегрузки с нуля.\n\nГлавный выигрыш — изоляция потерь. В TCP потерянный пакет останавливает все потоки соединения до повторной передачи, и это тот самый head-of-line blocking, который HTTP/2 убрать не смог. В QUIC потоки независимы, поэтому потерянный пакет задерживает один запрос, а остальные идут дальше. На сетях с потерями, а оттуда приходит заметная доля трафика, это разница между зависшей страницей и рабочей.\n\nРанние данные, обычно их называют 0-RTT, позволяют клиенту отправить данные приложения уже в первом полёте рукопожатия. Это убирает круг для первого запроса и несёт риск повтора: данные могут быть доставлены дважды. Поэтому ранние данные безопасны только для идемпотентных запросов, и потому применяются для возобновляемых загрузок и статики, а не для платежа.\n\nQUIC поддерживает и миграцию соединения: клиент, сменивший сеть, сохраняет то же логическое соединение, меняется только его идентификатор. Это важно для телефонов, переходящих между Wi-Fi и мобильной сетью. Практический совет прежний: версию вы не выбираете, её согласуют клиент и сервер, а настраивать стоит таймауты, конкурентность и размер ответа.'
      ),
      bullets: [
        L('QUIC runs over UDP and integrates the TLS 1.3 handshake into the transport.', 'QUIC работает поверх UDP и встраивает рукопожатие TLS 1.3 в транспорт.'),
        L('Loss is isolated per stream, which is what TCP could not do.', 'Потери изолированы по потокам, чего TCP не умел.'),
        L('0-RTT removes a round trip but allows replay, so it needs idempotent requests.', '0-RTT убирает круг, но допускает повтор, поэтому нужны идемпотентные запросы.'),
        L('Connection migration lets a client change networks without dropping the connection.', 'Миграция соединения позволяет клиенту сменить сеть, не рввая соединение.'),
        L('The negotiated version is out of your hands, the timeouts are not.', 'Согласованная версия не в ваших руках, таймауты — в ваших.'),
      ],
      code: `$ curl -s --http3 -o /dev/null \\
    -w '%{http_version} %{time_connect} %{time_starttransfer}\\n' \\
    https://api.example.com/orders/42
3 0.018 0.041

// the client negotiates the version, the code does not choose it
const response = await fetch('https://api.example.com/orders/42');
console.log(response.httpVersion); // '2', '3' or '1.1' depending on the path

// 0-RTT is only safe for idempotent requests
await fetch('https://api.example.com/assets/app.9f3a.js', {
  method: 'GET', // replaying this is harmless
});`,
      table: {
        caption: L('HTTP/2 over TCP against HTTP/3 over QUIC', 'HTTP/2 поверх TCP против HTTP/3 поверх QUIC'),
        headers: [L('Feature', 'Свойство'), L('HTTP/2 over TCP', 'HTTP/2 поверх TCP'), L('HTTP/3 over QUIC', 'HTTP/3 поверх QUIC')],
        rows: [
          [L('Transport', 'Транспорт'), L('TCP', 'TCP'), L('UDP', 'UDP')],
          [L('Effect of a lost packet', 'Последствия потери пакета'), L('The whole connection stalls', 'Всё соединение встаёт'), L('One stream stalls', 'Встаёт один поток')],
          [L('Handshake', 'Рукопожатие'), L('TCP, then TLS', 'TCP, затем TLS'), L('TLS 1.3 inside the transport', 'TLS 1.3 внутри транспорта')],
          [L('Early data', 'Ранние данные'), L('Not available', 'Недоступно'), L('0-RTT with a replay risk', '0-RTT с риском повтора')],
          [L('Connection migration', 'Миграция соединения'), L('A new connection', 'Новое соединение'), L('The same connection, new id', 'То же соединение, новый id')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Do not rely on 0-RTT for writes', 'Не полагайтесь на 0-RTT для записи'),
          text: L(
            'A 0-RTT request can be replayed by an attacker who captured the flight. Servers that enable early data must reject or deduplicate non-idempotent requests, and the safe default is to accept early data only for safe methods.',
            'Запрос в 0-RTT может быть повторён тем, кто перехватил полёт. Серверы, включающие ранние данные, обязаны отклонять или дедуплицировать неидемпотентные запросы, и безопасный выбор по умолчанию — принимать ранние данные только для безопасных методов.'
          ),
        },
      ],
      takeaway: L(
        'Treat 0-RTT as a cache warm-up, not as a shortcut for writes.',
        'Считайте 0-RTT прогревом кэша, а не сокращением пути для записи.'
      ),
      seeAlso: [
        L('Section 4-2: HTTP/2 multiplexing and HPACK', 'Секция 4-2: мультиплексирование HTTP/2 и HPACK'),
        L('Section 9-2: payload size and compression', 'Секция 9-2: размер ответа и сжатие'),
      ],
    },
    {
      id: 'http-ch4-s4',
      title: L('Compression: gzip and brotli', 'Сжатие: gzip и brotli'),
      body: L(
        'Compression is the cheapest bandwidth win available and the easiest thing to get wrong. The server compresses the body, declares the algorithm in Content-Encoding, and the client decompresses before reading it. A text response often shrinks by 70 to 90 percent, which on a slow mobile link is the difference between a page that appears and a page that spins.\n\nNot everything should be compressed. Images in JPEG or PNG, video, archives and fonts are already compressed, so a second pass costs CPU and gains almost nothing. Text formats compress extremely well because they repeat words, markup and whitespace. The rule is simple: compress what is text, skip what is already compressed and measure the ratio instead of assuming it.\n\ngzip is the safe default, because every client has supported it for two decades. Brotli, published by Google and standardised as RFC 7932, achieves a better ratio at the cost of more CPU, and it offers a compression level that can be tuned per response: a static asset can be compressed hard once and served forever, while a dynamic response should be compressed cheaply. Servers often use gzip for dynamic responses and brotli for pre-compressed static files.\n\nCompression is negotiated, so it happens only if the client asks for it. The client sends Accept-Encoding: br, gzip, the server picks one and answers with the matching Content-Encoding, and the response must include Vary: Accept-Encoding so that a shared cache stores the compressed and the uncompressed variant separately. Compressing without the header produces a body the client cannot read, and forgetting Vary produces a cache that serves gzip to a client that never asked for it.',
        'Сжатие — самая дешёвая победа по трафику и одновременно самое простое место для ошибки. Сервер сжимает тело, объявляет алгоритм в Content-Encoding, а клиент распаковывает перед чтением. Текстовый ответ часто теряет от 70 до 90 процентов, и на медленной мобильной сети это разница между появившейся страницей и крутящимся спиннером.\n\nСжимать нужно не всё. Картинки в JPEG или PNG, видео, архивы и шрифты уже сжаты, поэтому второй проход стоит процессорного времени и почти ничего не даёт. Текстовые форматы сжимаются отлично, потому что повторяют слова, разметку и пробелы. Правило простое: сжимайте текст, пропускайте уже сжатое и измеряйте коэффициент, а не выдумывайте его.\n\ngzip — безопасный выбор по умолчанию, потому что его поддерживает любой клиент вот уже два десятилетия. Brotli, опубликованный Google и стандартизованный как RFC 7932, даёт лучший коэффициент ценой большего расхода CPU и позволяет настраивать уровень сжатия под ответ: статику можно сжать сильно один раз и отдавать вечно, а динамический ответ лучше сжимать дёшево. Серверы часто используют gzip для динамики и brotli для заранее сжатых статических файлов.\n\nСжатие согласовано, поэтому происходит только если клиент его запросил. Клиент шлёт Accept-Encoding: br, gzip, сервер выбирает один и отвечает соответствующим Content-Encoding, а ответ обязан содержать Vary: Accept-Encoding, чтобы общий кэш хранил сжатый и несжатый варианты отдельно. Сжатие без заголовка даёт тело, которое клиент не прочитает, а забытый Vary даёт кэш, который отдаёт gzip тому, кто его не просил.'
      ),
      bullets: [
        L('Text shrinks by 70 to 90 percent, images and video by almost nothing.', 'Текст сжимается на 70–90 процентов, картинки и видео — почти никак.'),
        L('gzip is universally supported, brotli compresses better and costs more CPU.', 'gzip поддержан всеми, brotli жмёт лучше и стоит больше CPU.'),
        L('Compression happens only when the client sends Accept-Encoding.', 'Сжатие происходит только когда клиент прислал Accept-Encoding.'),
        L('Content-Encoding must name the algorithm, and Vary must name the request header.', 'Content-Encoding называет алгоритм, а Vary — заголовок запроса.'),
        L('Compress once, because a proxy that compresses again breaks the body.', 'Сжимайте один раз: прокси, сжавший повторно, ломает тело.'),
      ],
      code: `import { brotliCompressSync, gzipSync } from 'node:zlib';

const body = JSON.stringify({
  orders: Array.from({ length: 100 }, (_, i) => ({ id: i, status: 'paid' })),
});

const gzipped = gzipSync(body);
const brotlied = brotliCompressSync(body);

console.log('raw    ', body.length);
console.log('gzip   ', gzipped.length);
console.log('brotli ', brotlied.length);
console.log('ratio  ', Math.round((1 - brotlied.length / body.length) * 100) + '%');

// the server must answer with the matching Content-Encoding
// and send Vary: Accept-Encoding`,
      table: {
        caption: L('Choosing a compression algorithm', 'Выбор алгоритма сжатия'),
        headers: [L('Algorithm', 'Алгоритм'), L('Ratio', 'Коэффициент'), L('CPU cost', 'Расход CPU'), L('Support', 'Поддержка')],
        rows: [
          [L('gzip', 'gzip'), L('Good', 'Хороший'), L('Low', 'Низкий'), L('Universal', 'Повсеместная')],
          [L('brotli', 'brotli'), L('Better', 'Лучше'), L('Higher', 'Выше'), L('All modern browsers', 'Все современные браузеры')],
          [L('zstd', 'zstd'), L('Good', 'Хороший'), L('Low', 'Низкий'), L('Growing, mostly at CDNs', 'Растёт, в основном на CDN')],
          [L('None', 'Без сжатия'), L('No gain', 'Без выигрыша'), L('None', 'Нет'), L('Always available', 'Всегда доступно')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Compressed twice is corrupt', 'Двойное сжатие ломает тело'),
          text: L(
            'If a proxy compresses a body that already carries Content-Encoding: gzip, the client decompresses only once and the payload stays garbled. Compress at exactly one layer and let the others pass the header through unchanged.',
            'Если прокси сожмёт тело, уже несущее Content-Encoding: gzip, клиент распакует его только один раз и получит мусор. Сжимайте ровно на одном слое, а остальные пропускайте вместе с заголовком без изменений.'
          ),
        },
      ],
      takeaway: L(
        'Compress text once, name the algorithm in Content-Encoding and vary on Accept-Encoding.',
        'Сжимайте текст один раз, называйте алгоритм в Content-Encoding и указывайте Accept-Encoding в Vary.'
      ),
      seeAlso: [
        L('Section 2-4: content encoding versus content type', 'Секция 2-4: кодирование содержимого против типа содержимого'),
        L('Section 9-2: payload size and compression', 'Секция 9-2: размер ответа и сжатие'),
      ],
    },
  ],
};
