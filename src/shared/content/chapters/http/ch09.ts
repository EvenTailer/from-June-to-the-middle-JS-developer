import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh09: Chapter = {
  id: 'http-ch9',
  title: L('Performance and observability', 'Производительность и наблюдаемость'),
  summary: L(
    'Where the time in a request actually goes, why payload size is the cheapest lever, how rate limits and backpressure protect capacity, how health checks differ from readiness probes, and how metrics, logs and traces fit together.',
    'Куда на самом деле уходит время запроса, почему размер ответа — самый дешёвый рычаг, как лимиты частоты и обратное давление защищают ёмкость, чем проверка готовности отличается от проверки здоровья и как соотносятся метрики, логи и трассировки.'
  ),
  sections: [
    {
      id: 'http-ch9-s1',
      title: L('Measuring latency and TTFB', 'Измерение задержки и TTFB'),
      body: L(
        'A latency number is a sum of several different waits, and the sum tells you almost nothing until it is split. TTFB is the time from the moment the client starts the request until the first byte of the response arrives. It covers name resolution, the TCP handshake, the TLS handshake, the trip to the server, the time the server spent thinking, and the trip of the first byte back. Only the last two are application work.\n\nThe server side of that budget usually holds the surprise. A request that spends 400 ms in a database query looks like a slow endpoint, while the same query with an index finishes in 2 ms. A server that opens a fresh connection for every call pays the handshake again and again. A cold container that has to boot, load a framework and warm a cache before it can answer turns the first request into an outlier that an average hides completely.\n\nMeasuring TTFB needs a client-side timer, and the browser already provides one. The navigation entry of the Performance API reports responseStart, the moment the first byte of the response header arrived, and the resource timing entries report the same for every fetch and image. Server-side timing needs its own timer around the handler and a way to pass the value out, so that the two halves can be compared instead of guessed at.\n\nAverages hide the failures that matter. Report the median for the typical request and the 95th or 99th percentile for the tail, because a user does not experience the average of a thousand requests, they experience the worst of the ten they made. Keep the breakdown per phase, because the phase that grew is the phase you have to fix.',
        'Число задержки — это сумма нескольких разных ожиданий, и сама по себе сумма не говорит почти ничего, пока её не разделить. TTFB — время от момента, когда клиент начал запрос, до прихода первого байта ответа. В него входят разрешение имени, рукопожатие TCP, рукопожатие TLS, дорога до сервера, время, которое сервер думал, и дорога первого байта обратно. Прикладной работой являются только последние два.\n\nСерверная часть этого бюджета обычно и хранит сюрприз. Запрос, который проводит 400 мс в запросе к базе, выглядит как медленный эндпоинт, тогда как тот же запрос с индексом отрабатывает за 2 мс. Сервер, открывающий новое соединение на каждый вызов, платит за рукопожатие снова и снова. Холодный контейнер, который должен подняться, загрузить фреймворк и прогреть кэш прежде, чем ответить, превращает первый запрос в выброс, который полностью прячется за средним.\n\nЧтобы измерить TTFB, нужен таймер на стороне клиента, и браузер его уже предоставляет. Запись navigation в Performance API сообщает responseStart — момент прихода первого байта заголовков ответа, — а записи resource timing дают то же самое для каждого fetch и каждой картинки. Серверному замеру нужен собственный таймер вокруг обработчика и способ вынести значение наружу, чтобы две половины сравнивались, а не угадывались.\n\nСредние значения прячут самые важные сбои. Для типичного запроса показывайте медиану, а для хвоста — 95-й или 99-й перцентиль, потому что пользователь переживает не среднее по тысяче запросов, а худший из десяти, которые он сделал. Сохраняйте разбивку по фазам: фаза, которая выросла, и есть та, которую надо чинить.'
      ),
      bullets: [
        L('TTFB is the time to the first byte, not the time to the whole body.', 'TTFB — время до первого байта, а не до конца тела.'),
        L('DNS, TCP, TLS, the network and the server all sit inside it.', 'DNS, TCP, TLS, сеть и сервер — всё это внутри него.'),
        L('The browser exposes responseStart through the Performance API.', 'Браузер отдаёт responseStart через Performance API.'),
        L('The median describes the typical request, the 99th percentile describes the pain.', 'Медиана описывает типичный запрос, 99-й перцентиль — боль.'),
        L('Keep the timing split per phase, the phase that grew is the one to fix.', 'Храните разбивку по фазам: чинить нужно ту фазу, которая выросла.'),
      ],
      code: `import { performance } from 'node:perf_hooks';

const startedAt = performance.now();
const res = await fetch('https://api.example.com/orders');
const headersAt = performance.now();
const text = await res.text();
const bodyAt = performance.now();

console.log('TTFB (ms):', Math.round(headersAt - startedAt));
console.log('download (ms):', Math.round(bodyAt - headersAt));
console.log('bytes:', Buffer.byteLength(text));`,
      table: {
        caption: L('Where the time of one request goes', 'Куда уходит время одного запроса'),
        headers: [L('Phase', 'Фаза'), L('Typical cause of a slow phase', 'Типичная причина медленной фазы')],
        rows: [
          [
            L('Name resolution', 'Разрешение имени'),
            L('A slow resolver or a stale cache', 'Медленный резолвер или устаревший кэш'),
          ],
          [
            L('Connection setup', 'Установка соединения'),
            L('A new connection per call, no pooling', 'Новое соединение на каждый вызов, без пула'),
          ],
          [
            L('TLS handshake', 'Рукопожатие TLS'),
            L('No session resumption, expensive ciphers', 'Нет возобновления сессии, дорогие шифры'),
          ],
          [
            L('Waiting for the server', 'Ожидание сервера'),
            L('A missing index or a lock', 'Отсутствующий индекс или блокировка'),
          ],
          [
            L('Sending the body', 'Отправка тела'),
            L('An oversized payload, no compression', 'Раздутое тело, без сжатия'),
          ],
        ],
      },
      takeaway: L(
        'Split the latency into phases, track the median and the 99th percentile, and fix the phase that grew.',
        'Разделите задержку на фазы, следите за медианой и 99-м перцентилем и чините ту фазу, которая выросла.'
      ),
      seeAlso: [
        L('Section 9-2: payload size and compression', 'Секция 9-2: размер ответа и сжатие'),
        L('Section 4-1: keep-alive and connection pools', 'Секция 4-1: keep-alive и пулы соединений'),
        L('Section 9-5: tracing, logs and metrics', 'Секция 9-5: трассировка, логи и метрики'),
      ],
    },
    {
      id: 'http-ch9-s2',
      title: L('Payload size and compression', 'Размер ответа и сжатие'),
      body: L(
        'Payload size is the cheapest performance lever there is, because a smaller body means less time on the wire, less time to serialise, less time to parse and less memory on both ends. The number that surprises people is how much of a JSON response is whitespace and repeated field names. A JSON array of objects repeats the same keys on every element, and those keys often cost more bytes than the values they describe.\n\nCompression attacks that directly. Text formats compress extremely well: JSON, HTML, CSS, JavaScript and SVG usually shrink by 70 to 90 percent because the content is repetitive. The client advertises what it understands in Accept-Encoding, the server compresses and says so in Content-Encoding, and the client decompresses transparently. Compressing at the CDN rather than in the application saves CPU on the origin, and origin CPU is usually the scarce resource.\n\nCompression has costs and exclusions. Compressing an already compressed body wastes CPU and usually grows it, so images, video and archives are excluded by content type. Compression adds latency for very small bodies because the compressor has to warm up, and a 200-byte JSON response often comes out larger. Compression also removes the ability to read the body as it arrives, so a streaming endpoint consumed incrementally should not be compressed at all.\n\nBefore optimising the protocol, shrink the data. Fewer fields, no pretty printing in production, no duplicated objects that could be referenced instead, no whole collections where one item is needed. A response that halves in size usually beats every transport-level optimisation you could add later.',
        'Размер ответа — самый дешёвый рычаг производительности, потому что меньшее тело означает меньше времени в сети, меньше времени на сериализацию, меньше времени на разбор и меньше памяти с обеих сторон. Число, которое удивляет, — какая доля JSON-ответа приходится на пробелы и повторяющиеся имена полей. JSON-массив объектов повторяет одни и те же ключи в каждом элементе, и эти ключи часто стоят больше байт, чем описываемые ими значения.\n\nСжатие бьёт прямо в эту цель. Текстовые форматы сжимаются отлично: JSON, HTML, CSS, JavaScript и SVG обычно уменьшаются на 70–90 процентов, потому что содержимое повторяется. Клиент сообщает в Accept-Encoding, что понимает, сервер сжимает и указывает это в Content-Encoding, а клиент распаковывает прозрачно. Сжатие на CDN, а не в приложении, экономит процессорное время на origin, а оно обычно и есть дефицитный ресурс.\n\nУ сжатия есть цена и исключения. Сжатие уже сжатого тела тратит процессор и обычно увеличивает его, поэтому картинки, видео и архивы исключают по типу содержимого. Сжатие добавляет задержку для очень маленьких тел, потому что компрессору нужно прогреться, и 200-байтный JSON на выходе часто получается больше. Сжатие вдобавок лишает возможности читать тело по мере поступления, поэтому эндпоинт, который потребляется потоково, сжимать не надо.\n\nПрежде чем оптимизировать протокол, уменьшите данные. Меньше полей, никакого форматирования в проде, никаких дублирующихся объектов, которые можно было бы сослаться, никаких целых коллекций там, где нужен один элемент. Ответ, уменьшившийся вдвое, обычно побеждает любую последующую оптимизацию уровня транспорта.'
      ),
      bullets: [
        L('A smaller payload helps the network, the CPU and the parser at once.', 'Меньшее тело помогает сети, процессору и разбору одновременно.'),
        L('JSON repeats the same keys on every element of an array.', 'JSON повторяет одинаковые ключи в каждом элементе массива.'),
        L('gzip and brotli usually shrink text by 70 to 90 percent.', 'gzip и brotli обычно уменьшают текст на 70–90 процентов.'),
        L('Never compress images, video or already compressed archives.', 'Никогда не сжимайте картинки, видео и уже сжатые архивы.'),
        L('Compress at the edge, the origin CPU is the scarce resource.', 'Сжимайте на краю: процессор origin — дефицитный ресурс.'),
      ],
      code: `import { gzip, brotliCompress } from 'node:zlib';
import { promisify } from 'node:util';

const gz = promisify(gzip);
const br = promisify(brotliCompress);

const payload = Buffer.from(JSON.stringify(largeResponse));
const gzipped = await gz(payload);
const brotli = await br(payload);

console.log('raw:', payload.length, 'bytes');
console.log('gzip:', gzipped.length, 'bytes');
console.log('br:', brotli.length, 'bytes');

res.writeHead(200, {
  'Content-Type': 'application/json',
  'Content-Encoding': 'gzip',
  'Content-Length': gzipped.length,
});
res.end(gzipped);`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Compressed bodies are not inspectable on the fly', 'Сжатое тело не читается на лету'),
          text: L(
            'A proxy, a debugger or a log collector that expects to read the body as text sees binary garbage once Content-Encoding is set. Anything that inspects payloads has to know about the encoding or decompress before it looks.',
            'Прокси, отладчик или сборщик логов, ожидающий прочитать тело как текст, увидит двоичный мусор, как только выставлен Content-Encoding. Всё, что смотрит в тело, должно знать про кодировку или распаковать его заранее.'
          ),
        },
      ],
      takeaway: L(
        'Shrink the payload first, then compress it at the edge and leave images and video alone.',
        'Сначала уменьшите тело, потом сожмите его на краю, а картинки и видео не трогайте.'
      ),
      seeAlso: [
        L('Section 4-4: compression with gzip and brotli', 'Секция 4-4: сжатие с помощью gzip и brotli'),
        L('Section 2-4: content encoding versus content type', 'Секция 2-4: кодирование содержимого против типа содержимого'),
        L('Section 3-6: cache invalidation for large assets', 'Секция 3-6: сброс кэша для больших ресурсов'),
      ],
    },
    {
      id: 'http-ch9-s3',
      title: L('Rate limiting and backpressure', 'Ограничение частоты запросов и обратное давление'),
      body: L(
        'A rate limit is not a punishment, it is a promise about capacity. The server declares how much work it can serve per unit of time and refuses the excess instead of queueing it until every user is slow. The refusal has to be informative: the status is 429 and the Retry-After header says when to come back, because a client that receives an empty 429 with no guidance either retries immediately and makes the overload worse, or gives up on a request that would have succeeded.\n\nThe usual algorithm is the token bucket. Tokens accumulate at a fixed rate up to a capacity that represents the largest burst allowed, and each request takes one token. A request that finds no token is rejected. The bucket allows bursts while capping the long-run rate, which a fixed window counter cannot do: a counter that resets every minute lets a client spend the whole allowance in the last second of the window and the whole allowance again in the first second of the next.\n\nBackpressure is the same idea applied to a stream or a queue rather than to requests. When the consumer is slower than the producer, the producer has to be slowed down instead of buffering without limit. The Node stream API does this for you: when write returns false the buffer is full, and the correct reaction is to pause the readable side and resume it when drain fires. Ignoring that signal is how a service runs out of memory instead of degrading gracefully.\n\nBoth mechanisms protect the same resource, the capacity of the service, and they belong together. The limit stops new work from arriving, and the backpressure stops the work already in flight from piling up. A service with a rate limit but no timeouts and no backpressure does not fail gracefully, it fails slowly.',
        'Ограничение частоты запросов — не наказание, а обещание про ёмкость. Сервер объявляет, сколько работы он способен обслужить в единицу времени, и отказывает в избытке, а не ставит его в очередь, пока все пользователи не станут медленными. Отказ должен быть информативным: статус 429 и заголовок Retry-After говорят, когда вернуться, потому что клиент, получивший пустой 429 без указаний, либо повторит немедленно и усилит перегрузку, либо откажется от запроса, который вполне прошёл бы.\n\nОбычный алгоритм — корзина токенов. Токены накапливаются с постоянной скоростью до ёмкости, которая означает максимально допустимый всплеск, и каждый запрос забирает один токен. Запрос, не нашедший токена, отклоняется. Корзина разрешает всплески, ограничивая долгосрочную скорость, чего не может счётчик с фиксированным окном: счётчик, обнуляющийся каждую минуту, позволяет клиенту потратить весь лимит в последнюю секунду окна и весь лимит снова — в первую секунду следующего.\n\nОбратное давление — та же идея, применённая к потоку или очереди, а не к запросам. Когда потребитель медленнее производителя, производителя нужно замедлить, а не копить данные без ограничения. API потоков Node делает это сам: когда write возвращает false, буфер полон, и правильная реакция — поставить читающую сторону на паузу и возобновить её, когда сработает drain. Игнорирование этого сигнала приводит к тому, что сервис съедает память вместо того, чтобы деградировать плавно.\n\nОба механизма защищают один и тот же ресурс — ёмкость сервиса, — и работают вместе. Лимит останавливает приход новой работы, а обратное давление не даёт уже начатой работе накапливаться. Сервис с лимитом частоты, но без таймаутов и без обратного давления не деградирует плавно, он деградирует медленно.'
      ),
      bullets: [
        L('429 plus Retry-After tells the client when to come back.', '429 вместе с Retry-After говорит клиенту, когда вернуться.'),
        L('The token bucket allows bursts while capping the long-run rate.', 'Корзина токенов разрешает всплески, ограничивая долгосрочную скорость.'),
        L('A fixed window counter lets a client spend two allowances in two seconds.', 'Счётчик с фиксированным окном позволяет потратить два лимита за две секунды.'),
        L('Backpressure slows the producer when the consumer cannot keep up.', 'Обратное давление замедляет производителя, когда потребитель не успевает.'),
        L('When write returns false, pause the readable and resume it on drain.', 'Когда write возвращает false, ставьте читающую сторону на паузу и возобновляйте по drain.'),
      ],
      code: `// Token bucket: tokens refill at a constant rate, capped at the burst size
function createBucket(capacity, refillPerSecond) {
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
const take = createBucket(100, 10);
if (!take()) {
  res.writeHead(429, { 'Retry-After': '10', 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'rate_limited' }));
}
// Backpressure: pause reading until the slow consumer catches up
readable.on('data', (chunk) => {
  if (!writable.write(chunk)) readable.pause();
});
writable.on('drain', () => readable.resume());`,
      callouts: [
        {
          tone: 'warning',
          title: L('Rate limit per identity, not per address', 'Ограничивайте по личности, а не по адресу'),
          text: L(
            'Many clients share one address through a proxy, and one attacker can hold many addresses. Limit by the authenticated identity when there is one, and fall back to the address only for anonymous traffic.',
            'Многие клиенты делят один адрес через прокси, а один атакующий может держать много адресов. Ограничивайте по аутентифицированной личности, когда она есть, и используйте адрес только для анонимного трафика.'
          ),
        },
      ],
      takeaway: L(
        'Refuse excess work with 429 and Retry-After, and slow the producer instead of buffering without limit.',
        'Отказывайте в избыточной работе через 429 и Retry-After и замедляйте производителя вместо бесконечной буферизации.'
      ),
      seeAlso: [
        L('Section 7-2: the 429 contract with the client', 'Секция 7-2: контракт 429 с клиентом'),
        L('Section 7-5: idempotency keys and safe retries', 'Секция 7-5: ключи идемпотентности и безопасные повторы'),
        L('Section 9-4: health checks and readiness under load', 'Секция 9-4: проверки здоровья и готовности под нагрузкой'),
      ],
    },
    {
      id: 'http-ch9-s4',
      title: L('Health checks and readiness', 'Проверки здоровья и готовности'),
      body: L(
        'Health endpoints answer questions an orchestrator asks, and the questions are not the same. Liveness asks whether the process is alive and should be restarted when the answer is no. Readiness asks whether this instance can serve traffic right now and should be taken out of the load balancer when it cannot. Mixing them up causes outages: a liveness probe that checks the database will restart every instance during a database incident and turn a degraded service into a dead one.\n\nThe liveness probe has to be cheap and has to avoid dependencies. It usually answers with a constant, because its only job is to detect a deadlocked or wedged process. The readiness probe is where dependencies belong: it checks the database pool, the cache and anything else the instance cannot work without, and it needs a short timeout, because a probe that hangs is worse than a probe that fails.\n\nThere is a third kind, the startup probe, which gives a slow instance time to boot without the liveness probe killing it during the first seconds. When it exists, the liveness probe does not start until the startup probe has succeeded. Without it, a slow start looks like a dead process and the orchestrator begins a restart loop that never reaches a working state.\n\nThe answers must be honest and cheap. A readiness check that runs a heavy query on every poll becomes a load generator of its own, and a check that never fails is decoration. The response should name the dependency that failed, so the orchestrator log explains the eviction without a human guess.',
        'Эндпоинты здоровья отвечают на вопросы оркестратора, и вопросы эти разные. Liveness спрашивает, жив ли процесс, и его нужно перезапустить, если ответ отрицательный. Readiness спрашивает, может ли этот экземпляр обслуживать трафик прямо сейчас, и его нужно убрать из балансировщика, если не может. Их смешение приводит к авариям: проба liveness, которая проверяет базу, перезапустит каждый экземпляр во время инцидента с базой и превратит деградировавший сервис в мёртвый.\n\nПроба liveness должна быть дешёвой и не должна зависеть от внешних систем. Обычно она отвечает константой, потому что её единственная задача — заметить зависший или заблокированный процесс. Проба readiness — вот где место зависимостям: она проверяет пул соединений с базой, кэш и всё, без чего экземпляр не работает, и обязана иметь короткий таймаут, потому что зависшая проба хуже упавшей.\n\nЕсть ещё третий вид, проба запуска, которая даёт медленному экземпляру время подняться, не давая пробе liveness убить его в первые секунды. Когда она есть, проба liveness не запускается, пока проба запуска не отработает успешно. Без неё медленный старт выглядит как мёртвый процесс, и оркестратор начинает цикл перезапусков, который так и не доходит до рабочего состояния.\n\nОтветы должны быть честными и дешёвыми. Проверка готовности, выполняющая тяжёлый запрос при каждом опросе, сама становится генератором нагрузки, а проверка, которая никогда не падает, — просто украшением. В ответе нужно назвать зависимость, которая не в порядке, чтобы лог оркестратора объяснял выведение из ротации без догадок.'
      ),
      bullets: [
        L('Liveness means restart me, readiness means take me out of rotation.', 'Liveness значит «перезапусти меня», readiness — «убери меня из ротации».'),
        L('A liveness probe that checks dependencies restarts everything during an outage.', 'Проба liveness с проверкой зависимостей перезапустит всё во время аварии.'),
        L('The readiness probe checks the dependencies and needs a short timeout.', 'Проба readiness проверяет зависимости и требует короткого таймаута.'),
        L('A startup probe protects a slow boot from the restart loop.', 'Проба запуска защищает медленный старт от цикла перезапусков.'),
        L('A check that never fails is decoration, not a health check.', 'Проверка, которая никогда не падает, — украшение, а не проверка здоровья.'),
      ],
      code: `import { createServer } from 'node:http';

const server = createServer(async (req, res) => {
  if (req.url === '/health/live') {
    // Liveness: the process is alive, no dependency is touched
    res.writeHead(200).end('ok');
    return;
  }
  if (req.url === '/health/ready') {
    // Readiness: every dependency the service needs has to answer
    const [dbOk, cacheOk] = await Promise.all([db.ping(), cache.ping()]);
    const ready = dbOk && cacheOk;
    res.writeHead(ready ? 200 : 503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ready, dependencies: { db: dbOk, cache: cacheOk } }));
    return;
  }
  res.writeHead(404).end();
});

server.listen(3000);`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not make liveness depend on the database', 'Не делайте liveness зависимым от базы'),
          text: L(
            'When the database has a bad minute, every instance fails the liveness probe at once and the orchestrator restarts them all. The service comes back with empty caches and cold connections, which turns a short incident into a long one.',
            'Когда у базы случается плохая минута, все экземпляры разом проваливают пробу liveness, и оркестратор перезапускает их все. Сервис возвращается с пустыми кэшами и холодными соединениями, и короткий инцидент превращается в длинный.'
          ),
        },
      ],
      takeaway: L(
        'Keep liveness free of dependencies, put the dependency checks in readiness, and give both a short timeout.',
        'Держите liveness без зависимостей, вынесите проверки зависимостей в readiness и задайте обеим короткий таймаут.'
      ),
      seeAlso: [
        L('Section 9-3: rate limiting and backpressure under load', 'Секция 9-3: ограничение частоты запросов и обратное давление под нагрузкой'),
        L('Section 9-5: tracing, logs and metrics', 'Секция 9-5: трассировка, логи и метрики'),
        L('Section 8-5: long-running operations and job resources', 'Секция 8-5: долгие операции и ресурсы задач'),
      ],
    },
    {
      id: 'http-ch9-s5',
      title: L('Tracing, logs and metrics', 'Трассировка, логи и метрики'),
      body: L(
        'Observability has three pillars and each one answers a different question. Metrics tell you that something is wrong: counters, gauges and histograms aggregated over time, cheap to store and good at spotting a trend. Logs tell you what happened in one request: they carry the detail, but they are expensive to keep and awkward to aggregate. Traces tell you how a request travelled: the spans of one request across services, with the timing of every hop.\n\nThe connective tissue is the request identifier. The client or the edge generates it, every service copies it into its log lines and passes it downstream in a header, and the answer carries it back. With that one string a support ticket, a log line, a metric label and a trace turn into a single story. The identifier has to be generated at the edge, because by the time the request reaches the first service it has already passed through something you do not control.\n\nLogs have to be structured. A line of JSON with stable keys is parseable, filterable and aggregatable, while a sentence that starts with the same words is only readable by a human at three in the morning. Stable keys, a level, the request identifier, the route template and the duration are the minimum; the request body and the credentials of the user never belong in a log.\n\nCardinality is the trap. A label with a unique value in it, a user id, an order id, a raw path with the identifier inside, creates a new time series per value and destroys the metrics system. Metrics carry low-cardinality dimensions such as method, route template and status, while the identifiers belong in logs and traces. The path in a metric label has to be the template, not the concrete URL, or every order creates its own series.',
        'У наблюдаемости три опоры, и каждая отвечает на свой вопрос. Метрики говорят, что что-то сломалось: счётчики, шкалы и гистограммы, собранные по времени, дёшевы в хранении и хороши для отслеживания тренда. Логи говорят, что произошло в одном запросе: в них детали, но хранить их дорого и агрегировать неудобно. Трассировки говорят, как путешествовал запрос: спаны одного запроса по сервисам с таймингом каждого перехода.\n\nСвязующей тканью служит идентификатор запроса. Его генерирует клиент или край, каждый сервис копирует его в свои строки логов и передаёт дальше в заголовке, а ответ возвращает его назад. С этой одной строкой тикет в поддержку, строка лога, метка метрики и трассировка складываются в одну историю. Идентификатор обязательно генерируется на краю, потому что к моменту, когда запрос дойдёт до первого сервиса, он уже прошёл через то, чем вы не управляете.\n\nЛоги обязаны быть структурированными. Строка JSON с устойчивыми ключами разбирается, фильтруется и агрегируется, а предложение, начинающееся с одинаковых слов, читается только человеком в три часа ночи. Устойчивые ключи, уровень, идентификатор запроса, шаблон маршрута и длительность — это минимум; тело запроса и учётные данные пользователя в лог не попадают никогда.\n\nКардинальность — главная ловушка. Метка с уникальным значением внутри, идентификатор пользователя, идентификатор заказа, сырой путь с идентификатором внутри создаёт новый временной ряд на каждое значение и разрушает систему метрик. Метрики несут измерения с низкой кардинальностью — метод, шаблон маршрута, статус, — а идентификаторы остаются в логах и трассировках. В метке путь должен быть шаблоном, а не конкретным URL, иначе каждый заказ создаёт собственный ряд.'
      ),
      bullets: [
        L('Metrics say that something is wrong, logs say what happened, traces say how it travelled.', 'Метрики говорят, что сломалось, логи — что произошло, трассировки — как это прошло.'),
        L('The request identifier ties a ticket, a log line and a trace together.', 'Идентификатор запроса связывает тикет, строку лога и трассировку.'),
        L('Generate the identifier at the edge and pass it in a header.', 'Генерируйте идентификатор на краю и передавайте его в заголовке.'),
        L('Structured logs with stable keys are parseable, sentences are not.', 'Структурированные логи с устойчивыми ключами разбираются, предложения — нет.'),
        L('Metric labels stay low cardinality, identifiers belong in logs and traces.', 'Метки метрик остаются с низкой кардинальностью, идентификаторы живут в логах и трассировках.'),
      ],
      code: `import { randomUUID } from 'node:crypto';

const requestId = req.headers['x-request-id'] ?? randomUUID();
res.setHeader('X-Request-Id', requestId);

console.log(JSON.stringify({
  level: 'info',
  message: 'order created',
  requestId,
  traceId: req.headers['traceparent']?.split('-')[1] ?? null,
  method: req.method,
  route: '/orders/:orderId',
  status: 201,
  durationMs: Date.now() - startedAt,
}));

// Metrics are counters, gauges and histograms, not log lines
metrics.increment('http_requests_total', { method: 'POST', status: '201' });
metrics.histogram('http_request_duration_ms', durationMs);`,
      table: {
        caption: L('Which pillar answers which question', 'Какая опора отвечает на какой вопрос'),
        headers: [L('Pillar', 'Опора'), L('Question', 'Вопрос'), L('Cost', 'Цена')],
        rows: [
          [
            L('Metrics', 'Метрики'),
            L('Is the service getting worse?', 'Сервис становится хуже?'),
            L('Cheap to store, no detail', 'Дёшево хранить, без деталей'),
          ],
          [
            L('Logs', 'Логи'),
            L('What happened in this request?', 'Что произошло в этом запросе?'),
            L('Expensive to keep, hard to aggregate', 'Дорого хранить, трудно агрегировать'),
          ],
          [
            L('Traces', 'Трассировки'),
            L('Where did the time go across services?', 'Куда ушло время между сервисами?'),
            L('Sampling needed at high volume', 'Нужна выборка при большом объёме'),
          ],
          [
            L('Request id', 'Идентификатор запроса'),
            L('Which lines belong to this one call?', 'Какие строки относятся к этому вызову?'),
            L('Almost nothing', 'Практически ничего'),
          ],
        ],
      },
      takeaway: L(
        'Generate the request id at the edge, log structured lines with it, and keep metric labels low cardinality.',
        'Генерируйте идентификатор запроса на краю, пишите структурированные логи с ним и держите кардинальность меток низкой.'
      ),
      seeAlso: [
        L('Section 9-1: measuring latency and TTFB', 'Секция 9-1: измерение задержки и TTFB'),
        L('Section 8-3: error formats and the request identifier', 'Секция 8-3: форматы ошибок и идентификатор запроса'),
        L('Section 1-5: the origin and the request pipeline', 'Секция 1-5: origin и конвейер запроса'),
      ],
    },
  ],
};
