import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh02: Chapter = {
  id: 'http-ch2',
  title: L('Headers and content negotiation', 'Заголовки и согласование контента'),
  summary: L(
    'Which request and response headers change server behaviour, how Accept and Content-Type negotiate a representation, why content encoding is a different header, and how CORS decides whether a page may read the answer.',
    'Какие заголовки запроса и ответа меняют поведение сервера, как Accept и Content-Type согласуют представление, почему кодирование содержимого — это другой заголовок и как CORS решает, может ли страница прочитать ответ.'
  ),
  sections: [
    {
      id: 'http-ch2-s1',
      title: L('Request headers that matter', 'Заголовки запроса, которые важны'),
      body: L(
        'A request header is metadata about the call rather than about the resource: who is calling, from where, what they can accept, who they claim to be. Most of them are optional, and the ones that change server behaviour deserve to be read one by one instead of skimmed. Host names the host the client wants, and in HTTP/1.1 it is mandatory, because one address can serve many names.\n\nOrigin names the scheme, host and port the request was issued from, and it is set by the browser and cannot be forged by page script. Referer is the address of the page that triggered the request, and it is a hint rather than a control: policies may trim it and it is simply absent for direct navigation. User-Agent identifies the client software and is used for parsing quirks, statistics and sometimes for serving a downgraded response, which makes it untrusted input.\n\nCookie carries the credentials the browser decided to attach, and the server never asked for them. Authorization carries credentials the client decided to send, with a scheme prefix, and the standard today is Bearer. Accept describes which representations the client can process, and it is the client half of content negotiation. Together these headers decide most of what a server can safely do with a request.',
        'Заголовок запроса — это метаинформация о вызове, а не о ресурсе: кто обращается, откуда, что способен принять, кем себя выдаёт. Большинство из них необязательны, а те, что меняют поведение сервера, стоит читать по одному, а не просматривать бегло. Host называет хост, который нужен клиенту, и в HTTP/1.1 он обязателен, потому что один адрес может обслуживать много имён.\n\nOrigin называет схему, хост и порт, из которых запрос был отправлен; его ставит браузер, и скрипт страницы его не подделает. Referer — адрес страницы, породившей запрос, и это подсказка, а не механизм управления: политики могут его урезать, а при прямом переходе его просто нет. User-Agent опознаёт программное обеспечение клиента и нужен для особенностей разбора, статистики, а иногда чтобы отдать упрощённую версию, что делает его недоверенным вводом.\n\nCookie переносит учётные данные, которые браузер решил приложить, хотя сервер об этом не просил. Authorization переносит учётные данные, которые клиент решил отправить, с префиксом схемы, и сегодняшний стандарт — Bearer. Accept описывает, какие представления клиент способен обработать, и это клиентская половина согласования контента. Вместе эти заголовки решают почти всё, что сервер может безопасно сделать с запросом.'
      ),
      bullets: [
        L('Host is mandatory in HTTP/1.1 and names the virtual host.', 'Host обязателен в HTTP/1.1 и называет виртуальный хост.'),
        L('Origin is set by the browser and cannot be forged by page script.', 'Origin ставит браузер, скрипт страницы его не подделает.'),
        L('Referer is a hint that may be trimmed or missing entirely.', 'Referer — подсказка, которую могут урезать или убрать совсем.'),
        L('Authorization carries explicit credentials, Cookie carries ambient ones.', 'Authorization переносит явные учётные данные, Cookie — приходящие по умолчанию.'),
        L('Accept states what the client can process, not what it wants.', 'Accept говорит, что клиент способен обработать, а не чего он хочет.'),
      ],
      code: `POST /api/orders HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Referer: https://app.example.com/orders/new
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0
Cookie: sid=8f14e45fceea167a

{"sku":"A-1","qty":2}`,
      table: {
        caption: L('The request headers a backend actually reads', 'Заголовки запроса, которые читает бэкенд'),
        headers: [L('Header', 'Заголовок'), L('Tells you', 'Говорит вам'), L('Trust it?', 'Доверять?')],
        rows: [
          [L('Host', 'Host'), L('Which virtual host is wanted', 'Какой виртуальный хост запрошен'), L('Yes', 'Да')],
          [L('Origin', 'Origin'), L('Which origin issued the call', 'Из какого origin сделан вызов'), L('Yes, in browsers', 'Да, в браузере')],
          [L('Referer', 'Referer'), L('The referring page', 'Откуда пришли'), L('Weakly', 'Слабо')],
          [L('User-Agent', 'User-Agent'), L('The client software', 'Программа клиента'), L('Never', 'Никогда')],
          [L('Accept', 'Accept'), L('Acceptable representations', 'Приемлемые представления'), L('Yes', 'Да')],
          [L('Authorization', 'Authorization'), L('Explicit credentials', 'Явные учётные данные'), L('Yes, verify it', 'Да, проверяйте')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Never decide security from User-Agent', 'Никогда не принимайте решение по User-Agent'),
          text: L(
            'Both User-Agent and Referer are trivially spoofed by any non-browser client, and both depend on browser policy. Use them for logging and analytics, and make authorisation decisions on the verified token or session instead.',
            'И User-Agent, и Referer элементарно подделываются любым клиентом, кроме браузера, и оба зависят от политики браузера. Используйте их для логов и аналитики, а решения о доступе принимайте по проверенному токену или сессии.'
          ),
        },
      ],
      takeaway: L(
        'Trust Origin and Authorization, treat User-Agent and Referer as hints.',
        'Доверяйте Origin и Authorization, а User-Agent и Referer считайте подсказками.'
      ),
      seeAlso: [
        L('Section 2-5: CORS and the preflight request', 'Секция 2-5: CORS и preflight-запрос'),
        L('Chapter 5: cookies, sessions and tokens', 'Глава 5: cookie, сессии и токены'),
      ],
    },
    {
      id: 'http-ch2-s2',
      title: L('Response headers that matter', 'Заголовки ответа, которые важны'),
      body: L(
        'A response header tells the client what it just received and what it may do with it. Six of them cover most cases: Content-Type says what the body is, Content-Length says how many bytes it is, Cache-Control says how long it may be reused, ETag is the validator for a later conditional request, Location names the new or canonical address, and Set-Cookie installs state in the browser.\n\nContent-Length is the number of bytes in the body, and a mismatch breaks the connection: the client waits for bytes that never come, or stops reading early and treats the rest of the response as the next one. When the length is not known in advance the server either uses chunked framing or closes the connection at the end, and the client has to know which. HTTP/2 and HTTP/3 carry the length in the frame headers, which removes the ambiguity.\n\nLocation turns a 201 into a resource the client can address and a 3xx into a redirect target, which is what makes 201 Created useful. Set-Cookie is the only way a server hands state to a browser, and everything about it — scope, lifetime, whether script can read it, whether it crosses sites — is decided by attributes in that one header. Cache-Control and ETag get a chapter of their own, so here it is enough to say that they describe reuse rather than storage: a 200 with no caching headers is stored by nobody and fetched again every time.',
        'Заголовок ответа сообщает клиенту, что он получил и что ему с этим можно делать. Шести заголовков хватает почти для всех случаев: Content-Type говорит, что это за тело, Content-Length — сколько в нём байт, Cache-Control — как долго его можно переиспользовать, ETag — валидатор для будущего условного запроса, Location называет новый или канонический адрес, а Set-Cookie устанавливает состояние в браузере.\n\nContent-Length — это число байт в теле, и несовпадение ломает соединение: клиент ждёт байты, которых не будет, либо прекращает чтение раньше и принимает остаток ответа за следующий ответ. Когда длина неизвестна заранее, сервер либо использует chunked-обрамление, либо закрывает соединение в конце, и клиент должен знать, что именно произойдёт. HTTP/2 и HTTP/3 несут длину в заголовках фреймов, и эта неоднозначность исчезает.\n\nLocation превращает 201 в ресурс, к которому клиент может обратиться, а 3xx — в цель перенаправления, и именно поэтому 201 Created полезен. Set-Cookie — единственный способ передать состояние браузеру, и всё про него — область, время жизни, читает ли его скрипт, пересекает ли он сайты — решается атрибутами в этом одном заголовке. Cache-Control и ETag получают отдельную главу, поэтому здесь достаточно сказать, что они описывают повторное использование, а не хранение: 200 без кэширующих заголовков не хранит никого и скачивается заново каждый раз.'
      ),
      bullets: [
        L('Content-Type names the representation, Content-Length its size in bytes.', 'Content-Type называет представление, Content-Length — размер в байтах.'),
        L('Content-Length must match the body exactly or the connection breaks.', 'Content-Length должен точно совпадать с телом, иначе соединение ломается.'),
        L('Location turns 201 into an addressable resource and 3xx into a redirect.', 'Location превращает 201 в адресуемый ресурс, а 3xx — в перенаправление.'),
        L('Set-Cookie is the only way a server installs state in the browser.', 'Set-Cookie — единственный способ передать состояние в браузер.'),
        L('Cache-Control and ETag describe reuse, and caches read them, not code.', 'Cache-Control и ETag описывают повторное использование, и читают их кэши, а не код.'),
      ],
      code: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 50
Location: /api/orders/1042
Cache-Control: private, max-age=0, must-revalidate
ETag: "order-1042-v1"
Set-Cookie: sid=8f14e45fceea167a; Path=/; HttpOnly; Secure; SameSite=Lax
Vary: Accept-Encoding

{"id":1042,"sku":"A-1","qty":2,"status":"created"}`,
      table: {
        caption: L('Response headers and the mistakes behind them', 'Заголовки ответа и типичные ошибки'),
        headers: [L('Header', 'Заголовок'), L('What it tells the client', 'Что он говорит клиенту'), L('Common mistake', 'Типичная ошибка')],
        rows: [
          [L('Content-Type', 'Content-Type'), L('What the body is', 'Что за тело'), L('JSON without the header', 'JSON без заголовка')],
          [L('Content-Length', 'Content-Length'), L('The exact body size', 'Точный размер тела'), L('A count that does not match', 'Несовпадение счётчика')],
          [L('Cache-Control', 'Cache-Control'), L('How long it may be reused', 'Как долго можно переиспользовать'), L('no-store on everything', 'no-store на всём подряд')],
          [L('ETag', 'ETag'), L('The validator for revalidation', 'Валидатор для проверки'), L('A new value on every response', 'Новое значение на каждый ответ')],
          [L('Location', 'Location'), L('The address of the resource', 'Адрес ресурса'), L('201 without Location', '201 без Location')],
          [L('Set-Cookie', 'Set-Cookie'), L('The state for the browser', 'Состояние для браузера'), L('No SameSite attribute', 'Без атрибута SameSite')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Length in bytes, not in characters', 'Длина в байтах, а не в символах'),
          text: L(
            'A UTF-8 string with non-ASCII characters takes more bytes than it has characters, so a length computed from the string length is wrong. Count the encoded bytes, or let the framework set the header for you.',
            'Строка в UTF-8 с не-ASCII-символами занимает больше байт, чем символов, поэтому длина, посчитанная по длине строки, неверна. Считайте байты в кодировке или поручите фреймворку выставить заголовок.'
          ),
        },
      ],
      takeaway: L(
        'Every response should state its type, its size and its reuse policy explicitly.',
        'Каждый ответ должен явно называть свой тип, размер и политику повторного использования.'
      ),
      seeAlso: [
        L('Chapter 3: caching, validators and the 304', 'Глава 3: кэширование, валидаторы и 304'),
        L('Section 5-1: cookie attributes and scope', 'Секция 5-1: атрибуты cookie и область действия'),
      ],
    },
    {
      id: 'http-ch2-s3',
      title: L('Content types and negotiation', 'Типы контента и согласование'),
      body: L(
        'Content negotiation is a conversation in which the client states what it can accept and the server chooses what to send. The request header Accept carries a list of media types, each with an optional quality value: Accept: application/json;q=0.9, text/html;q=0.8. Quality runs from 0 to 1, a value of 1 means most preferred, and a value of 0 forbids that type entirely.\n\nThe server answers with a Content-Type naming what it actually sent, and it may ignore the preferences when it has to. If nothing in the Accept list is acceptable, the honest answer is 406 Not Acceptable rather than a surprise. In practice most APIs have one representation and treat Accept as decoration, while a public site serving HTML and JSON from the same URL has to honour it or the browser gets the wrong thing.\n\nThe same mechanism works on other dimensions: Accept-Language selects a locale and Accept-Encoding a compression algorithm. Accept-Charset once selected a character set, but RFC 9110 deprecated it and no browser sends it, so a server must treat it as absent and answer in UTF-8. Whenever the response depends on one of these request headers, the server must name it in Vary, because caches key their entries by URL plus the Vary set. Forget Vary and a shared cache serves a German page to an English user, or a gzip body to a client that cannot read it.',
        'Согласование контента — это разговор, в котором клиент сообщает, что он способен принять, а сервер выбирает, что отправить. Заголовок запроса Accept несёт список типов содержимого, у каждого может быть значение качества: Accept: application/json;q=0.9, text/html;q=0.8. Качество лежит в диапазоне от 0 до 1, единица означает наивысший приоритет, а нуль полностью запрещает этот тип.\n\nСервер отвечает заголовком Content-Type, называющим то, что он действительно отправил, и вправе проигнорировать предпочтения, когда обязан. Если ни один тип из Accept неприемлем, честный ответ — 406 Not Acceptable, а не сюрприз. На практике у большинства API одно представление, и Accept там украшение, а вот сайт, отдающий по одному URL и HTML, и JSON, обязан учитывать заголовок, иначе браузер получит не то.\n\nТот же механизм работает по другим осям: Accept-Language выбирает локаль, а Accept-Encoding — алгоритм сжатия. Accept-Charset когда-то выбирал набор символов, но RFC 9110 его отменил и браузеры его не шлют, поэтому сервер обязан считать его отсутствующим и отвечать в UTF-8. Всякий раз, когда ответ зависит от одного из этих заголовков запроса, сервер обязан назвать его в Vary, потому что кэши ключуют записи по URL плюс набор из Vary. Забудете Vary — и общий кэш отдаст немецкую страницу англоязычному пользователю или gzip-тело клиенту, который его не читает.'
      ),
      bullets: [
        L('Accept lists what the client can process, with q values from 0 to 1.', 'Accept перечисляет, что клиент способен обработать, качество задаётся от 0 до 1.'),
        L('A quality of 0 forbids a type, a quality of 1 marks the most preferred.', 'Качество 0 запрещает тип, качество 1 отмечает самый предпочтительный.'),
        L('The response Content-Type says what was actually sent.', 'Content-Type в ответе говорит, что было отправлено на самом деле.'),
        L('406 is the honest answer when nothing in Accept is acceptable.', '406 — честный ответ, когда в Accept нет приемлемого типа.'),
        L('Vary must list every request header that changed the response.', 'Vary должен перечислять все заголовки запроса, из-за которых ответ изменился.'),
      ],
      code: `GET /articles/42 HTTP/1.1
Accept: application/json;q=0.9, text/html;q=0.8
Accept-Language: ru-RU, en;q=0.8

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Language: ru-RU
Vary: Accept, Accept-Language

{"id":42,"title":"HTTP","lang":"ru"}

GET /articles/42 HTTP/1.1
Accept: application/xml

HTTP/1.1 406 Not Acceptable
Content-Type: application/problem+json

{"type":"about:blank","title":"Not Acceptable","status":406}`,
      table: {
        caption: L('The negotiation headers', 'Заголовки согласования'),
        headers: [L('Header', 'Заголовок'), L('Negotiates', 'Что согласует'), L('Example', 'Пример')],
        rows: [
          [L('Accept', 'Accept'), L('The media type', 'Тип содержимого'), L('application/json;q=0.9', 'application/json;q=0.9')],
          [L('Accept-Language', 'Accept-Language'), L('The locale', 'Локаль'), L('ru-RU, en;q=0.8', 'ru-RU, en;q=0.8')],
          [L('Accept-Encoding', 'Accept-Encoding'), L('The compression', 'Сжатие'), L('br, gzip', 'br, gzip')],
          [L('Accept-Charset', 'Accept-Charset'), L('The character set, deprecated in RFC 9110', 'Набор символов, отменён в RFC 9110'), L('utf-8', 'utf-8')],
          [L('Content-Type', 'Content-Type'), L('What was sent', 'Что отправлено'), L('application/json; charset=utf-8', 'application/json; charset=utf-8')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('One endpoint, many representations', 'Один эндпоинт, много представлений'),
          text: L(
            'If the same URL really serves several formats, use content negotiation and keep the URL stable. If the formats have different shapes and different fields, they are different resources and deserve different URLs.',
            'Если один URL действительно отдаёт несколько форматов, согласуйте их и оставьте URL стабильным. Если у форматов разная структура и разные поля, это разные ресурсы, и им нужны разные URL.'
          ),
        },
      ],
      takeaway: L(
        'Negotiate with Accept, answer with Content-Type and record the dependency in Vary.',
        'Согласуйте через Accept, ответьте Content-Type и зафиксируйте зависимость в Vary.'
      ),
      seeAlso: [
        L('Section 2-4: content encoding versus content type', 'Секция 2-4: кодирование содержимого против типа содержимого'),
        L('Section 3-5: CDNs and edge caching', 'Секция 3-5: CDN и кэширование на краю'),
      ],
    },
    {
      id: 'http-ch2-s4',
      title: L('Content encoding versus content type', 'Кодирование содержимого против типа содержимого'),
      body: L(
        'Two headers describe the body and they answer different questions. Content-Type answers what the content is: application/json, text/html, image/png. Content-Encoding answers how the bytes were transformed on the way: gzip, br, zstd. A response can carry both, and a client handles them in a fixed order: it decodes the encoding first and only then interprets the type.\n\nThe negotiation for compression happens in Accept-Encoding, where the client lists the algorithms it supports, usually br, gzip. The server picks one, compresses the body and adds Content-Encoding: br. A missing Accept-Encoding is not a prohibition: the header states a preference, and RFC 9110 treats any content coding as acceptable when the client says nothing, so the server may still compress the body. The rule of thumb is that a server may compress without being asked, but then it must be able to say so in a header, otherwise the client receives bytes it cannot read.\n\nCompression pays off on text and fails on anything already compressed. JSON, HTML, CSS and JavaScript usually shrink by 70 to 90 percent, while JPEG, PNG, MP4 and archives shrink by almost nothing and still cost CPU. Compressing an image is pure loss. That is why the server negotiates by the type of content and why a CDN normally compresses only the text responses on its way out.',
        'Два заголовка описывают тело, и отвечают они на разные вопросы. Content-Type отвечает, что это за содержимое: application/json, text/html, image/png. Content-Encoding отвечает, чем байты были преобразованы по дороге: gzip, br, zstd. Ответ может нести оба заголовка, и клиент обрабатывает их в фиксированном порядке: сначала распаковывает, и только потом трактует тип.\n\nСогласование сжатия происходит в Accept-Encoding, где клиент перечисляет поддерживаемые алгоритмы, обычно br, gzip. Сервер выбирает один, сжимает тело и добавляет Content-Encoding: br. Отсутствие Accept-Encoding — не запрет: заголовок выражает предпочтение, и по RFC 9110 любая кодировка содержимого считается приемлемой, когда клиент не сказал ничего, поэтому сервер всё равно вправе сжать тело. Правило большого пальца: сервер может сжать и без просьбы, но тогда он обязан сказать об этом заголовком, иначе клиент получит байты, которые не прочитает.\n\nСжатие окупается на тексте и проваливается на всём, что уже сжато. JSON, HTML, CSS и JavaScript обычно теряют от 70 до 90 процентов, а JPEG, PNG, MP4 и архивы почти не теряют и при этом стоят процессорного времени. Сжимать картинку — чистый убыток. Именно поэтому сервер согласует по типу содержимого, и поэтому CDN обычно сжимает только текстовые ответы на выходе.'
      ),
      bullets: [
        L('Content-Type says what it is, Content-Encoding says how the bytes were transformed.', 'Content-Type говорит, что это, Content-Encoding — чем преобразованы байты.'),
        L('The client decodes the encoding first and only then reads the type.', 'Клиент сначала распаковывает и только потом читает тип.'),
        L('Accept-Encoding lists the compression algorithms the client supports.', 'Accept-Encoding перечисляет алгоритмы сжатия, поддерживаемые клиентом.'),
        L('Without Content-Encoding the compressed body is unreadable.', 'Без Content-Encoding сжатое тело прочитать нельзя.'),
        L('Text compresses by 70 to 90 percent, images and video by almost nothing.', 'Текст сжимается на 70–90 процентов, картинки и видео — почти никак.'),
      ],
      code: `GET /api/orders HTTP/1.1
Accept-Encoding: br, gzip

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: br
Vary: Accept-Encoding
Content-Length: 418

... the compressed payload in binary form ...`,
      table: {
        caption: L('Which header answers which question', 'Какой заголовок отвечает на какой вопрос'),
        headers: [L('Question', 'Вопрос'), L('Header', 'Заголовок'), L('Example', 'Пример')],
        rows: [
          [L('What is it', 'Что это'), L('Content-Type', 'Content-Type'), L('application/json', 'application/json')],
          [L('How was it encoded', 'Чем закодировано'), L('Content-Encoding', 'Content-Encoding'), L('br', 'br')],
          [L('What can you take', 'Что вы примете'), L('Accept-Encoding', 'Accept-Encoding'), L('br, gzip', 'br, gzip')],
          [L('How long may it be reused', 'Как долго можно переиспользовать'), L('Cache-Control', 'Cache-Control'), L('public, max-age=60', 'public, max-age=60')],
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
        'Compress once, label it with Content-Encoding and vary on Accept-Encoding.',
        'Сжимайте один раз, помечайте это Content-Encoding и указывайте Accept-Encoding в Vary.'
      ),
      seeAlso: [
        L('Section 4-4: compression, gzip and brotli', 'Секция 4-4: сжатие, gzip и brotli'),
        L('Section 3-5: CDNs and edge caching', 'Секция 3-5: CDN и кэширование на краю'),
      ],
    },
    {
      id: 'http-ch2-s5',
      title: L('CORS and the preflight request', 'CORS и preflight-запрос'),
      body: L(
        'CORS is the rule the browser applies when a page on one origin calls another. The server declares which origins may read the response in Access-Control-Allow-Origin, and the browser enforces that declaration. The server does not block the request, the browser hides the answer from the page. That is why a curl command succeeds where the browser reports a CORS error, and why CORS never protects an API from a non-browser client.\n\nSimple requests are sent directly: GET or POST with a limited set of headers and no preflight. Anything else, a custom header such as Authorization, a method like PUT, PATCH or DELETE, or a JSON content type, triggers a preflight. The browser first sends an OPTIONS request naming the origin, the intended method and the intended headers, and the server answers with the methods, headers and origins it permits. Only after a successful preflight does the real request go out.\n\nCredentials change the rules. With cookies or an Authorization header, Access-Control-Allow-Origin must name one exact origin and never the wildcard, Access-Control-Allow-Credentials must be true, and the client must ask for the credentials with credentials: include. The CORS-safelisted response headers — Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified and Pragma — are readable by a script in every case, and Access-Control-Expose-Headers is what makes any other response header readable. The preflight answer can be cached for Access-Control-Max-Age seconds to save a round trip.',
        'CORS — это правило, которое браузер применяет, когда страница с одного origin обращается к другому. Сервер объявляет, каким origin разрешено читать ответ, через Access-Control-Allow-Origin, а обеспечивает это объявление браузер. Сервер запрос не блокирует, браузер просто прячет ответ от страницы. Именно поэтому curl проходит там, где браузер пишет про ошибку CORS, и потому CORS никогда не защищает API от клиента, который не браузер.\n\nПростые запросы уходят сразу: GET или POST с ограниченным набором заголовков и без preflight. Всё остальное — свой заголовок вроде Authorization, метод вроде PUT, PATCH или DELETE, тип содержимого application/json — вызывает preflight. Браузер сначала шлёт OPTIONS, называя origin, желаемый метод и желаемые заголовки, а сервер отвечает, какие методы, заголовки и origin разрешены. Только после успешного preflight уходит настоящий запрос.\n\nУчётные данные меняют правила. С cookie или заголовком Authorization в Access-Control-Allow-Origin должен называться ровно один конкретный origin и никогда не подстановочный знак, Access-Control-Allow-Credentials должен быть true, а клиент обязан запросить учётные данные через credentials: include. Заголовки ответа, разрешённые правилами CORS — Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified и Pragma, — скрипту доступны в любом случае, а Access-Control-Expose-Headers делает читаемым любой другой заголовок ответа. Ответ на preflight можно кэшировать на Access-Control-Max-Age секунд, сэкономив круг.'
      ),
      bullets: [
        L('The browser enforces CORS, the server only declares the policy.', 'CORS обеспечивает браузер, сервер лишь объявляет политику.'),
        L('A simple request goes out directly, anything else triggers an OPTIONS preflight.', 'Простой запрос уходит сразу, всё остальное вызывает preflight через OPTIONS.'),
        L('A JSON content type makes a POST non-simple.', 'Тип содержимого application/json делает POST непростым.'),
        L('With credentials the wildcard origin is forbidden.', 'С учётными данными подстановочный знак в origin запрещён.'),
        L('CORS is not authorization, a permitted origin may still lack the rights.', 'CORS — не авторизация: разрешённый origin может не иметь прав.'),
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
      table: {
        caption: L('Which requests trigger a preflight', 'Какие запросы вызывают preflight'),
        headers: [L('Request kind', 'Вид запроса'), L('Example', 'Пример'), L('Preflight', 'Preflight')],
        rows: [
          [L('Simple GET', 'Простой GET'), L('GET with an Accept header', 'GET с заголовком Accept'), L('No', 'Нет')],
          [L('Simple POST', 'Простой POST'), L('POST with form-encoded data', 'POST с form-данными'), L('No', 'Нет')],
          [L('JSON POST', 'POST с JSON'), L('POST with application/json', 'POST с application/json'), L('Yes', 'Да')],
          [L('Preflighted write', 'Запись с preflight'), L('PUT, PATCH or DELETE', 'PUT, PATCH или DELETE'), L('Yes', 'Да')],
          [L('Preflighted read', 'Чтение с preflight'), L('GET with an Authorization header', 'GET с заголовком Authorization'), L('Yes', 'Да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A CORS error often hides a real error', 'Ошибка CORS часто прячет настоящую ошибку'),
          text: L(
            'A browser reports a CORS failure for a response that never arrived, for a missing Access-Control-Allow-Origin and for a blocked mixed-content request. The console message is often the first symptom of a 500. Read the network tab, not only the console.',
            'Браузер сообщает об ошибке CORS и когда ответ не дошёл, и когда нет Access-Control-Allow-Origin, и когда запрос заблокирован как смешанное содержимое. Сообщение в консоли часто оказывается первым симптомом 500. Смотрите вкладку Network, а не только консоль.'
          ),
        },
      ],
      takeaway: L(
        'CORS decides whether the page may read the response, never whether the caller may have the data.',
        'CORS решает, может ли страница прочитать ответ, и никогда — может ли вызывающий получить данные.'
      ),
      seeAlso: [
        L('Section 2-1: request headers that matter', 'Секция 2-1: заголовки запроса, которые важны'),
        L('Chapter 6: security on the wire', 'Глава 6: безопасность на проводе'),
      ],
    },
  ],
};
