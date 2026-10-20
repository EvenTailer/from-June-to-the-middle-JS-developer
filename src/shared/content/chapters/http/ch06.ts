import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh06: Chapter = {
  id: 'http-ch6',
  title: L('Security on the wire', 'Безопасность на проводе'),
  summary: L(
    'How TLS, HSTS, Content Security Policy, CSRF tokens and framing policy protect a connection, and why validating every input is the last and most important line of defence.',
    'Как TLS, HSTS, Content Security Policy, CSRF-токены и политика фрейминга защищают соединение и почему проверка каждого входного значения остаётся последним и самым важным рубежом обороны.'
  ),
  sections: [
    {
      id: 'http-ch6-s1',
      title: L('TLS and certificates', 'TLS и сертификаты'),
      body: L(
        'TLS turns a byte stream into an encrypted and authenticated channel, and its guarantees are narrow enough to state precisely. Traffic between the two endpoints is unreadable to anyone on the path, and the client can verify that the server really is the host it asked for. What TLS does not do is protect you from the server itself: if the endpoint is compromised, the certificate chain still validates perfectly, and a valid certificate says nothing about whether the application on the other side is safe.\n\nThe trust decision rests on a chain. The server presents its own certificate, the leaf. That certificate is signed by an intermediate, the intermediate is signed by a root, and the root is the anchor the client already trusts because it ships in the operating system or the browser. The client walks the chain upwards, verifies every signature with the public key of the issuer, checks that the leaf matches the requested hostname, that the current date falls inside its validity window, and that the key usages permit the role. A broken link anywhere in that path makes the handshake fail.\n\nThe hostname check is the part developers most often try to skip in development. A certificate issued for api.example.com does not become valid for localhost, and turning verification off with rejectUnauthorized: false removes the only check that separates the real server from a machine in the middle. During development use a locally trusted certificate or a tunnel that terminates TLS properly, and keep the verification enabled everywhere else. Certificate pinning goes one step further by removing the dependence on the system trust store, at the cost of a rotation procedure that can take a site down when it goes wrong.',
        'TLS превращает поток байтов в зашифрованный и аутентифицированный канал, и его гарантии достаточно узкие, чтобы их можно было сформулировать точно. Данные между двумя концами не читает никто на пути, а клиент может убедиться, что сервер действительно тот хост, к которому он обратился. Но TLS не защищает вас от самого сервера: если конечная точка скомпрометирована, цепочка сертификатов по-прежнему валидна, а валидный сертификат ничего не говорит о безопасности приложения на другой стороне.\n\nРешение о доверии опирается на цепочку доверия. Сервер предъявляет собственный сертификат — конечный. Его подписал промежуточный, промежуточного — корневой, а корневой является якорем, который клиент уже доверяет, потому что он поставляется вместе с операционной системой или браузером. Клиент поднимается по цепочке, проверяет каждую подпись открытым ключом издателя, сверяет, что конечный сертификат соответствует запрошенному имени хоста, что текущая дата попадает в срок действия и что назначение ключа допускает эту роль. Оборванное звено в любом месте этой цепочки обрывает рукопожатие.\n\nПроверка имени хоста — та часть, которую разработчики чаще всего пытаются пропустить на локальной машине. Сертификат, выпущенный для api.example.com, не становится валидным для localhost, а отключение проверки через rejectUnauthorized: false убирает единственную проверку, которая отличает настоящий сервер от машины посередине. В разработке используйте локально доверенный сертификат или туннель, который корректно терминирует TLS, а во всех остальных местах оставляйте проверку включённой. Закрепление сертификата (pinning) идёт дальше, убирая зависимость от системного хранилища доверенных сертификатов, но требует процедуры ротации, которая при ошибке способна уронить сайт.'
      ),
      bullets: [
        L('TLS gives encryption and server authentication, not protection from a compromised server.', 'TLS даёт шифрование и аутентификацию сервера, но не защиту от скомпрометированного сервера.'),
        L('The client verifies the leaf, the chain to a trusted root, the hostname and the validity window.', 'Клиент проверяет конечный сертификат, цепочку до доверенного корня, имя хоста и срок действия.'),
        L('A certificate issued for api.example.com is not valid for localhost.', 'Сертификат, выпущенный для api.example.com, не подходит для localhost.'),
        L('rejectUnauthorized: false removes the only check that matters in production.', 'rejectUnauthorized: false убирает единственную проверку, которая важна в проде.'),
        L('Pinning removes the system trust store but demands a rotation plan.', 'Pinning убирает системное хранилище доверенных сертификатов, но требует плана ротации.'),
      ],
      code: `import tls from 'node:tls';

const socket = tls.connect({
  host: 'example.com',
  port: 443,
  servername: 'example.com',
});

socket.once('secureConnect', () => {
  const leaf = socket.getPeerCertificate();
  console.log('subject:', leaf.subject.CN);
  console.log('issuer:', leaf.issuer.CN);
  console.log('expires:', leaf.valid_to);
  console.log('protocol:', socket.getProtocol());
  console.log('verified:', socket.authorized);
  socket.end();
});

socket.on('error', (err) => console.error('handshake failed', err.code));`,
      table: {
        caption: L('What the client checks while validating a certificate', 'Что проверяет клиент при проверке сертификата'),
        headers: [L('Check', 'Проверка'), L('Failure means', 'Что означает отказ')],
        rows: [
          [
            L('Hostname matches the certificate', 'Имя хоста совпадает с сертификатом'),
            L('Wrong host, possible interception', 'Чужой хост, возможен перехват'),
          ],
          [
            L('Signature chain up to a trusted root', 'Подпись по цепочке до доверенного корня'),
            L('Untrusted or forged issuer', 'Недоверенный или поддельный издатель'),
          ],
          [
            L('Current date inside the validity window', 'Текущая дата внутри срока действия'),
            L('Expired or not yet valid', 'Истёк или ещё не вступил в силу'),
          ],
          [
            L('Key usage permits the TLS role', 'Назначение ключа допускает роль TLS'),
            L('Certificate issued for another purpose', 'Сертификат выпущен для другой цели'),
          ],
          [
            L('Revocation status via OCSP or CRL', 'Статус отзыва через OCSP или CRL'),
            L('Issuer withdrew the certificate', 'Издатель отозвал сертификат'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Verification off in production', 'Проверка отключена в проде'),
          text: L(
            'A request that skips verification still looks like a successful HTTPS call, so nothing fails and nobody notices. Keep rejectUnauthorized at its default value and use a locally trusted certificate for development instead.',
            'Запрос с отключённой проверкой по-прежнему выглядит как успешный HTTPS-вызов, поэтому ничего не падает и никто не замечает. Оставьте rejectUnauthorized на значении по умолчанию, а для разработки возьмите локально доверенный сертификат.'
          ),
        },
      ],
      takeaway: L(
        'Verify the chain, the hostname and the expiry on every connection, and never switch verification off outside development.',
        'Проверяйте цепочку, имя хоста и срок действия в каждом соединении и никогда не отключайте проверку вне разработки.'
      ),
      seeAlso: [
        L('Chapter 5: identity and authentication', 'Глава 5: личность и аутентификация'),
        L('Section 9-5: request ids and structured logs for tracing', 'Секция 9-5: идентификаторы запросов и структурированные логи для трассировки'),
        L('Section 2-5: the CORS preflight and simple requests', 'Секция 2-5: CORS preflight и простые запросы'),
      ],
    },
    {
      id: 'http-ch6-s2',
      title: L('HSTS and secure cookie flags', 'HSTS и защитные флаги cookie'),
      body: L(
        'HSTS is a response header that tells a browser to talk to your host only over HTTPS, for a stated number of seconds. Strict-Transport-Security: max-age=31536000 is the shortest useful form; includeSubDomains extends the promise to every subdomain, and the preload token asks the browser vendors to ship your domain in the list of hosts that are forced to HTTPS before any request happens. The header only matters after the first successful HTTPS response, because a browser learns the rule from the header rather than from the scheme of the URL.\n\nThat leaves one window open. A user who types your domain for the very first time can be answered by an attacker on a hostile network with a redirect to plain HTTP, and the redirect target can then read everything the page sends. The preload list closes that window, because the browser refuses plain HTTP to the host before it ever contacts it. Preloading is a one-way door for the whole domain: once the domain is preloaded, browsers stop serving it over plain HTTP even during maintenance, so plan the certificate renewal against that constraint.\n\nThe cookie flags cover the other half. Secure forbids sending the cookie over plain HTTP, HttpOnly hides it from document.cookie and therefore from any injected script, and SameSite decides whether the browser attaches the cookie to a cross-site request. Set all three on every session cookie, and give cookies that should not outlive the session an explicit Max-Age of zero or omit Expires entirely. A cookie without a lifetime lives as long as the browser session, which is usually what you want and is worth stating out loud.',
        'HSTS — это заголовок ответа, который говорит браузеру общаться с вашим хостом только по HTTPS, в течение указанного числа секунд. Strict-Transport-Security: max-age=31536000 — самая короткая полезная форма; includeSubDomains расширяет обещание на все поддомены, а токен preload просит производителей браузеров включить ваш домен в список хостов, принудительно работающих по HTTPS ещё до первого запроса. Заголовок имеет силу только после первого успешного HTTPS-ответа, потому что браузер узнаёт правило из заголовка, а не из схемы адреса.\n\nОстаётся одно открытое окно. Пользователь, который впервые набирает ваш домен, может получить от злоумышленника в враждебной сети ответ с редиректом на обычный HTTP, и цель редиректа прочитает всё, что страница отправит. Список preload закрывает это окно: браузер отказывает в обычном HTTP к хосту ещё до обращения к нему. Preload — это односторонние двери для всего домена: попав в список, домен перестаёт открываться по обычному HTTP даже во время обслуживания, поэтому планируйте продление сертификата с учётом этого ограничения.\n\nФлаги cookie закрывают вторую половину. Secure запрещает отправлять cookie по обычному HTTP, HttpOnly прячет значение от document.cookie, а значит и от любого внедрённого скрипта, и SameSite решает, прикрепит ли браузер cookie к кросс-сайтовому запросу. Ставьте все три флага на каждую сессионную cookie, а у cookie, которые не должны жить дольше сессии, либо задайте Max-Age: 0, либо не указывайте Expires вовсе. Cookie без срока жизни живёт столько, сколько живёт сессия браузера, — обычно это именно то, что нужно, но стоит проговорить это вслух.'
      ),
      bullets: [
        L('HSTS takes effect only after a successful HTTPS response.', 'HSTS начинает действовать только после первого успешного HTTPS-ответа.'),
        L('includeSubDomains covers the whole domain, preload removes the first-request window.', 'includeSubDomains покрывает весь домен, preload убирает окно первого запроса.'),
        L('Secure forbids plain HTTP, HttpOnly hides the value from scripts.', 'Secure запрещает обычный HTTP, HttpOnly прячет значение от скриптов.'),
        L('SameSite decides whether a cross-site request carries the cookie.', 'SameSite решает, полетит ли cookie с кросс-сайтовым запросом.'),
        L('A cookie without Max-Age or Expires dies with the browser session.', 'Cookie без Max-Age или Expires умирает вместе с сессией браузера.'),
      ],
      code: `import https from 'node:https';

const server = https.createServer({ key: PRIVATE_KEY, cert: CERT }, (req, res) => {
  // HSTS is remembered by the browser, not by the connection
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  res.setHeader('Set-Cookie', [
    'sid=abc123; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600',
  ]);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(443);`,
      callouts: [
        {
          tone: 'warning',
          title: L('Enable HSTS only when HTTPS really works', 'Включайте HSTS только когда HTTPS действительно работает'),
          text: L(
            'Once the browser has cached the policy it will refuse plain HTTP for the whole max-age, and a broken certificate or a mixed-content page will look like a total outage. Test the full chain first, then raise max-age gradually.',
            'Как только браузер запомнит политику, он перестанет принимать обычный HTTP на всё время max-age, и сломанный сертификат или смешанное содержимое будут выглядеть как полный отказ сервиса. Сначала проверьте всю цепочку, затем постепенно увеличивайте max-age.'
          ),
        },
      ],
      takeaway: L(
        'Send HSTS from the first HTTPS response and set Secure, HttpOnly and SameSite on every cookie you set.',
        'Отправляйте HSTS уже в первом HTTPS-ответе и ставьте Secure, HttpOnly и SameSite на каждую выставляемую cookie.'
      ),
      seeAlso: [
        L('Section 5-1: cookie attributes and their scope', 'Секция 5-1: атрибуты cookie и их область действия'),
        L('Section 6-4: CSRF tokens and the SameSite values', 'Секция 6-4: CSRF-токены и значения SameSite'),
        L('Section 2-3: content types and negotiation', 'Секция 2-3: типы содержимого и согласование'),
      ],
    },
    {
      id: 'http-ch6-s3',
      title: L('CSP, XSS and output encoding', 'CSP, XSS и экранирование вывода'),
      body: L(
        'XSS is the injection of attacker-controlled markup or script into a page the user trusts, and it executes with the privileges of that user. The injected code can read the DOM, call the API on behalf of the session, and exfiltrate whatever the page can reach. The primary defence is output encoding: every dynamic value that lands in HTML must be encoded so that the browser reads it as text rather than as markup. The second line of defence is a Content Security Policy, which restricts what a page may load and execute even when an injection slips through.\n\nA CSP works by naming the sources a resource type may come from. script-src self forbids inline scripts and scripts from other origins, object-src none removes a whole family of plugin-based bypasses, base-uri none stops an attacker from rewriting relative URLs, and frame-ancestors none prevents the page from being framed. The goal is a policy without unsafe-inline and without unsafe-eval, and nonces or hashes are how you allow exactly the one inline script you genuinely need.\n\nThe two defences cover different failures, which is why one never replaces the other. A complete policy is a migration: every inline script has to move to a file or receive a nonce, and each step needs a deployment. Output encoding works today, at the exact place where the value is inserted, and protects the sinks nobody remembered to enumerate. The failure mode of encoding is a forgotten sink, and the failure mode of a policy is shipping unsafe-inline because the migration felt too expensive.',
        'XSS — это внедрение атакующего разметки или скрипта в страницу, которой пользователь доверяет, и выполняется оно с правами этого пользователя. Внедрённый код читает DOM, вызывает API от имени сессии и уводит всё, до чего страница может дотянуться. Главная защита — экранирование вывода: каждое динамическое значение, попадающее в HTML, должно быть экранировано так, чтобы браузер читал его как текст, а не как разметку. Вторая линия обороны — Content Security Policy, которая ограничивает, что страница может загружать и выполнять, даже если инъекция всё же прошла.\n\nCSP работает через перечисление источников, из которых разрешено получать ресурсы определённого типа. script-src self запрещает встроенные скрипты и скрипты с других источников, object-src none убирает целое семейство обходов через плагины, base-uri none мешает атакующему переписать относительные адреса, а frame-ancestors none запрещает встраивание страницы в фрейм. Цель — политика без unsafe-inline и без unsafe-eval, а nonce или хеши позволяют разрешить ровно тот один встроенный скрипт, который действительно нужен.\n\nЭти две защиты закрывают разные сбои, поэтому одна никогда не заменяет другую. Полная политика — это миграция: каждый встроенный скрипт нужно вынести в файл или снабдить nonce, и каждый шаг требует выкатки. Экранирование вывода работает уже сегодня, ровно в том месте, где значение вставляется, и защищает те места, про которые никто не вспомнил. Сбой экранирования — забытое место вставки, сбой политики — unsafe-inline в продакшене, потому что миграция показалась слишком дорогой.'
      ),
      bullets: [
        L('Output encoding turns a value into text so the browser cannot parse it as markup.', 'Экранирование вывода превращает значение в текст, который браузер не разберёт как разметку.'),
        L('A CSP limits what executes after an injection, it does not prevent the injection.', 'CSP ограничивает, что выполнится после инъекции, но саму инъекцию не предотвращает.'),
        L('A strict policy has no unsafe-inline and no unsafe-eval.', 'Строгая политика не содержит ни unsafe-inline, ни unsafe-eval.'),
        L('base-uri and frame-ancestors close two escape routes that script-src leaves open.', 'base-uri и frame-ancestors закрывают два обхода, которые оставляет script-src.'),
        L('textContent is safe, innerHTML is not, and the difference is one character.', 'textContent безопасен, innerHTML нет, и разница в одном символе.'),
      ],
      code: `// Dangerous: the value is parsed as markup
element.innerHTML = '<p>' + comment + '</p>';

// Safe: the value is inserted as text and never parsed as HTML
element.textContent = comment;

// Safe on the server: encode the characters that start a tag
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[ch]);

// A strict policy: no inline script, no plugins, no framing
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
].join('; ');`,
      table: {
        caption: L('Two defences against XSS and what each one misses', 'Две защиты от XSS и что каждая из них пропускает'),
        headers: [L('Defence', 'Защита'), L('Blocks', 'Что блокирует'), L('Misses', 'Что пропускает')],
        rows: [
          [
            L('Output encoding at every sink', 'Экранирование вывода в каждом месте вставки'),
            L('Markup injection in HTML and attributes', 'Инъекцию разметки в HTML и в атрибуты'),
            L('A sink that was forgotten', 'Забытое место вставки'),
          ],
          [
            L("CSP with script-src 'self'", "CSP со script-src 'self'"),
            L('Scripts from other origins', 'Скрипты с других источников'),
            L('Inline scripts when unsafe-inline is present', 'Встроенные скрипты при наличии unsafe-inline'),
          ],
          [
            L('Nonce or hash per inline script', 'Nonce или хеш для каждого встроенного скрипта'),
            L('Injected inline script', 'Внедрённый встроенный скрипт'),
            L('Script run through a DOM sink such as innerHTML', 'Скрипт, попавший через DOM, например innerHTML'),
          ],
          [
            L('Sanitiser for rich HTML', 'Санитайзер для богатого HTML'),
            L('Dangerous tags and attributes in user HTML', 'Опасные теги и атрибуты в пользовательском HTML'),
            L('Anything the allowlist forgets', 'Всё, что не попало в белый список'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Roll the policy out in report-only mode', 'Вводите политику в режиме report-only'),
          text: L(
            'Content-Security-Policy-Report-Only does not block anything, it only reports violations. Ship it first, read the reports for a week, then switch the same policy to enforcing mode.',
            'Заголовок Content-Security-Policy-Report-Only ничего не блокирует, а только сообщает о нарушениях. Сначала выкатите его, соберите отчёты за неделю, а потом включите ту же политику в принудительном режиме.'
          ),
        },
      ],
      takeaway: L(
        'Encode every value where it is inserted and add a strict CSP on top, because the two fail in different ways.',
        'Экранируйте каждое значение там, где оно вставляется, и поверх этого добавьте строгую CSP, потому что эти две защиты падают по-разному.'
      ),
      seeAlso: [
        L('Section 5-5: how CSRF and XSS interact with the auth mechanism', 'Секция 5-5: как CSRF и XSS взаимодействуют с механизмом аутентификации'),
        L('Section 6-6: injection, SSRF and path traversal as one family', 'Секция 6-6: инъекция, SSRF и обход пути как одно семейство'),
        L('Chapter 8: API design, envelopes and error formats', 'Глава 8: проектирование API, конверты и форматы ошибок'),
      ],
    },
    {
      id: 'http-ch6-s4',
      title: L('CSRF tokens and SameSite', 'CSRF-токены и SameSite'),
      body: L(
        'CSRF exploits the fact that a browser attaches cookies to requests the user never chose to make. A form on another site can post to your endpoint, the session cookie rides along, and the server sees a perfectly authenticated request that the user never initiated. The defence that does not depend on browser behaviour is a token: the server puts an unpredictable value into the page, the client sends it back in a header or a hidden field, and the server rejects the request when the value does not match the one stored in the session.\n\nSameSite attacks the same problem from the browser side. SameSite=Strict sends the cookie only on same-site requests, SameSite=Lax sends it on top-level navigations with a safe method, and SameSite=None sends it everywhere and therefore requires Secure. Lax covers the classic attack, because the dangerous request is a cross-site POST, which is not a top-level navigation and gets no cookie. Lax still lets a GET carry the cookie, which is exactly why a state-changing GET is a bug in its own right.\n\nThe two are used together. SameSite removes most cross-site traffic before it starts, the token stops whatever survives it, and a check of the Origin or Referer header is a cheap third layer that rejects any origin outside the list. Tokens must be unpredictable, compared in constant time, and bound to the session: a token that is the same for every user can be read by one attacker and replayed against another.',
        'CSRF эксплуатирует то, что браузер прикрепляет cookie к запросам, которые пользователь никогда не выбирал. Форма на чужом сайте может отправить POST на ваш эндпоинт, сессионная cookie уедет вместе с ней, и сервер увидит полностью аутентифицированный запрос, который пользователь не начинал. Защита, не зависящая от поведения браузера, — это токен: сервер кладёт в страницу непредсказуемое значение, клиент возвращает его в заголовке или скрытом поле, а сервер отклоняет запрос, если значение не совпало с сохранённым в сессии.\n\nSameSite решает ту же задачу со стороны браузера. SameSite=Strict отправляет cookie только на запросы своего сайта, SameSite=Lax — на переходы верхнего уровня безопасным методом, а SameSite=None — вообще везде, и потому требует Secure. Lax закрывает классическую атаку, потому что опасный запрос — это кросс-сайтовый POST, а он не является переходом верхнего уровня и cookie не получает. Но Lax всё же пропускает cookie с GET, и именно поэтому меняющий состояние GET — сам по себе баг.\n\nИх применяют вместе. SameSite убирает большую часть кросс-сайтового трафика до его начала, токен останавливает то, что уцелело, а проверка заголовка Origin или Referer — дешёвый третий слой, отклоняющий любой источник вне списка. Токены должны быть непредсказуемыми, сравниваться за постоянное время и быть привязаны к сессии: токен, одинаковый для всех пользователей, может быть прочитан одним атакующим и переигран против другого.'
      ),
      bullets: [
        L('A CSRF token must be unpredictable, session-bound and compared in constant time.', 'CSRF-токен должен быть непредсказуемым, привязанным к сессии и сравниваться за постоянное время.'),
        L('SameSite=Lax blocks the cookie on a cross-site POST but not on a cross-site GET.', 'SameSite=Lax блокирует cookie на кросс-сайтовом POST, но не на кросс-сайтовом GET.'),
        L('SameSite=None sends the cookie everywhere and forces Secure.', 'SameSite=None отправляет cookie везде и требует Secure.'),
        L('A token in a second cookie does not help, the attacker page can read it too.', 'Токен во второй cookie не помогает: страница атакующего тоже может его прочитать.'),
        L('Origin and Referer are cheap layers on top of the token.', 'Origin и Referer — дешёвые слои поверх токена.'),
      ],
      code: `import { randomUUID, timingSafeEqual } from 'node:crypto';

// Server: issue a token and remember it in the session
const token = randomUUID();
res.setHeader('Set-Cookie', 'csrf=' + token + '; Path=/; Secure; SameSite=Strict');
sessions.set(sessionId, { csrfToken: token });

// Client: send the token in a header, never as a second cookie
await fetch('/api/orders', {
  method: 'POST',
  headers: { 'X-CSRF-Token': readCookie('csrf'), 'Content-Type': 'application/json' },
  body: JSON.stringify({ sku: 'A-1', quantity: 2 }),
});

// Server: compare in constant time and reject a mismatch
const given = Buffer.from(req.headers['x-csrf-token'] ?? '');
const expected = Buffer.from(session.csrfToken);
if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
  res.writeHead(403).end();
}`,
      table: {
        caption: L('What each SameSite value allows', 'Что разрешает каждое значение SameSite'),
        headers: [L('Value', 'Значение'), L('Cookie is sent on', 'Cookie отправляется'), L('Needs Secure', 'Нужен Secure')],
        rows: [
          [
            L('Strict', 'Strict'),
            L('Same-site requests only', 'Только запросы своего сайта'),
            L('No', 'Нет'),
          ],
          [
            L('Lax', 'Lax'),
            L('Same-site requests and top-level GET navigation', 'Запросы своего сайта и переходы GET верхнего уровня'),
            L('No', 'Нет'),
          ],
          [
            L('None', 'None'),
            L('Every request, including cross-site', 'Любой запрос, включая кросс-сайтовый'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The double-submit cookie trap', 'Ловушка cookie с двумя подписями'),
          text: L(
            'A CSRF token stored in a cookie that the page also reads is only safe when the value is signed by the server. An unsigned cookie can be overwritten by the attacker page through a subdomain, which turns the defence off.',
            'CSRF-токен в cookie, которую страница ещё и читает, безопасен только если значение подписано сервером. Неподписанную cookie страница атакующего может перезаписать через поддомен, и защита выключается.'
          ),
        },
      ],
      takeaway: L(
        'Keep SameSite=Lax or Strict as the default and treat the CSRF token as the layer that actually decides.',
        'Держите SameSite=Lax или Strict как значение по умолчанию, а CSRF-токен считайте тем слоем, который действительно решает.'
      ),
      seeAlso: [
        L('Section 5-1: cookie attributes and their scope', 'Секция 5-1: атрибуты cookie и их область действия'),
        L('Section 6-2: HSTS and the secure cookie flags', 'Секция 6-2: HSTS и защитные флаги cookie'),
        L('Section 8-3: error formats and the problem details shape', 'Секция 8-3: форматы ошибок и форма problem details'),
      ],
    },
    {
      id: 'http-ch6-s5',
      title: L('Clickjacking and framing policy', 'Кликджекинг и политика фрейминга'),
      body: L(
        'Clickjacking does not steal data, it borrows the user attention. The attacker loads your page in an invisible frame on top of their own page, the user clicks what they believe is their own button, and the click lands on your button instead. The victim is authenticated, the request that follows is legitimate, and nothing in the API call looks wrong. The fix is to declare who may frame your page, in a header the browser enforces before it renders anything.\n\nTwo headers express that policy. X-Frame-Options: DENY forbids framing entirely, SAMEORIGIN allows only your own pages, and ALLOW-FROM was removed from the standards because no browser implemented it consistently. The modern replacement is the frame-ancestors directive of Content Security Policy, which takes an allowlist of origins and works per page, so a public landing page can be framed by a partner while an administrative page cannot be framed at all.\n\nBoth headers are still worth sending, because old browsers ignore CSP frame-ancestors while X-Frame-Options is implemented everywhere. Testing is cheap: return the header from a test endpoint, load the page in an iframe from another origin, and confirm the frame is refused. Frame-busting scripts inside the page are not a substitute, because they run after the frame is already visible and are trivial to bypass.',
        'Кликджекинг не крадёт данные, он заимствует внимание пользователя. Атакующий загружает вашу страницу в невидимом фрейме поверх собственной, пользователь кликает то, что считает своей кнопкой, а клик приходится на вашу. Жертва аутентифицирована, запрос выглядит легитимным, и в самом вызове API ничего подозрительного нет. Лечится это объявлением того, кому разрешено встраивать вашу страницу, — в заголовке, который браузер применяет до отрисовки.\n\nПолитику выражают два заголовка. X-Frame-Options: DENY запрещает встраивание полностью, SAMEORIGIN разрешает только ваши собственные страницы, а ALLOW-FROM убрали из стандартов, потому что ни один браузер не реализовал его одинаково. Современная замена — директива frame-ancestors в Content Security Policy: она принимает белый список источников и работает постранично, поэтому публичный лендинг может встраивать партнёр, а административная страница не встраивается вообще.\n\nОба заголовка всё ещё стоит отправлять: старые браузеры игнорируют CSP frame-ancestors, а X-Frame-Options реализован везде. Проверка дешёвая: верните заголовок с тестового эндпоинта, загрузите страницу в iframe с другого источника и убедитесь, что фрейм отклонён. Скрипты, «ломающие» фрейм внутри страницы, заменой не являются: они выполняются уже после того, как фрейм показан, и обходятся тривиально.'
      ),
      bullets: [
        L('Framing policy is a response header, not a script in the page.', 'Политика фрейминга — это заголовок ответа, а не скрипт внутри страницы.'),
        L('X-Frame-Options allows DENY and SAMEORIGIN, ALLOW-FROM was removed.', 'X-Frame-Options допускает DENY и SAMEORIGIN, ALLOW-FROM убран.'),
        L('CSP frame-ancestors takes an allowlist and works per page.', 'CSP frame-ancestors принимает белый список и работает постранично.'),
        L('frame-ancestors also protects against a page being used as a gadget.', 'frame-ancestors защищает и от использования страницы как гаджета.'),
        L('Sending both headers covers old browsers and new ones.', 'Отправка обоих заголовков покрывает и старые, и новые браузеры.'),
      ],
      code: `// Legacy header: DENY, SAMEORIGIN, or ALLOW-FROM (long removed)
res.setHeader('X-Frame-Options', 'DENY');

// Modern header: an allowlist of ancestors
res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");

// Allow trusted partners to embed, nobody else
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'self' https://partner.example.com",
);

// A page can also refuse to be framed from its own script
if (window.top !== window.self) {
  window.top.location = window.self.location;
}`,
      table: {
        caption: L('Ways to forbid framing', 'Способы запретить встраивание'),
        headers: [L('Mechanism', 'Механизм'), L('Effect', 'Эффект'), L('Status', 'Статус')],
        rows: [
          [
            L("X-Frame-Options: DENY", 'X-Frame-Options: DENY'),
            L('No framing at all', 'Встраивание запрещено полностью'),
            L('Supported everywhere', 'Поддерживается везде'),
          ],
          [
            L('X-Frame-Options: SAMEORIGIN', 'X-Frame-Options: SAMEORIGIN'),
            L('Only your own pages may frame it', 'Встраивать могут только ваши страницы'),
            L('Supported everywhere', 'Поддерживается везде'),
          ],
          [
            L("CSP frame-ancestors 'none'", "CSP frame-ancestors 'none'"),
            L('No framing, expressed per page', 'Встраивание запрещено, правило на страницу'),
            L('Modern browsers', 'Современные браузеры'),
          ],
          [
            L('CSP frame-ancestors with a list', 'CSP frame-ancestors со списком'),
            L('Named origins may frame it', 'Встраивать могут перечисленные источники'),
            L('Modern browsers', 'Современные браузеры'),
          ],
          [
            L('X-Frame-Options: ALLOW-FROM', 'X-Frame-Options: ALLOW-FROM'),
            L('Was meant to name one origin', 'Должен был называть один источник'),
            L('Removed from the standard', 'Убран из стандарта'),
          ],
        ],
      },
      takeaway: L(
        'Send X-Frame-Options and CSP frame-ancestors together, and decide the allowlist per page.',
        'Отправляйте X-Frame-Options и CSP frame-ancestors вместе и задавайте белый список отдельно для каждой страницы.'
      ),
      seeAlso: [
        L('Section 6-3: CSP as an XSS mitigation', 'Секция 6-3: CSP как средство защиты от XSS'),
        L('Section 8-5: long-running operations and webhook callbacks', 'Секция 8-5: долгие операции и обратные вызовы вебхуков'),
        L('Section 1-5: the origin and the request pipeline', 'Секция 1-5: origin и конвейер запроса'),
      ],
    },
    {
      id: 'http-ch6-s6',
      title: L('Injection, SSRF and path traversal', 'Инъекция, SSRF и обход пути'),
      body: L(
        'Injection is the family of bugs where data that should stay a value is parsed as code. In SQL injection the value is glued into the query text, so a quote closes the string and the rest becomes a statement. In command injection the value reaches a shell, where a semicolon starts a second command. In path traversal the value is a file name that climbs out of the directory with ../ segments. In SSRF the value is a URL and the server, not the browser, makes the request, which puts internal services inside the reach of the attacker.\n\nThe defences look different but are the same idea: keep the data out of the parser. Parameterised queries send the value and the statement separately, so the database cannot confuse them. Passing an argument array instead of building a shell string keeps the shell out of the loop. Resolving the path against a fixed base and checking that the result is still inside that base stops the traversal. For SSRF the fix is an allowlist of hosts plus a ban on following redirects to a host outside it.\n\nAll of them share one precondition: the value has to be validated before it reaches the dangerous call. Validation is easier when it happens once, at the boundary, against a schema that describes type, length and format, so the deeper layers can trust the shape of what they receive. The second half of the discipline is not to build the dangerous call at all: a shell string is a bug waiting for the first forgotten escape, and an allowlist is always shorter than the list of things you must remember to block.',
        'Инъекция — это семейство багов, где данные, которые должны остаться значением, разбираются как код. При SQL-инъекции значение склеивается с текстом запроса, поэтому кавычка закрывает строку, а остаток становится отдельным оператором. При инъекции команды значение попадает в оболочку, где точка с запятой начинает вторую команду. При обходе пути значением оказывается имя файла, который выбирается из каталога сегментами ../. При SSRF значением оказывается URL, и запрос делает сервер, а не браузер, из-за чего внутренние сервисы оказываются в досягаемости атакующего.\n\nЗащиты выглядят по-разному, но идея у них одна: не пускать данные в парсер. Параметризованные запросы отправляют значение и выражение отдельно, поэтому база не может их перепутать. Передача массивом аргументов вместо сборки строки для оболочки убирает оболочку из процесса. Разрешение пути относительно фиксированной базы с проверкой, что результат остался внутри неё, останавливает обход пути. Для SSRF решение — белый список хостов плюс запрет следовать редиректам на хост вне списка.\n\nУ всех них одно общее условие: значение должно быть проверено до того, как попадёт в опасный вызов. Проверять проще, если делать это один раз, на границе, по схеме, которая описывает тип, длину и формат, тогда как глубокие слои могут доверять форме полученного. Вторая половина дисциплины — вообще не строить опасный вызов: строка для оболочки это баг, ждущий первого забытого экранирования, а белый список всегда короче списка того, что нужно не забыть заблокировать.'
      ),
      bullets: [
        L('Parameterised queries keep the value out of the SQL grammar.', 'Параметризованные запросы не пускают значение в грамматику SQL.'),
        L('Pass an argument array, never a shell string.', 'Передавайте массив аргументов, а не строку для оболочки.'),
        L('Resolve the path and verify it stayed inside the base directory.', 'Разрешите путь и проверьте, что он остался внутри базового каталога.'),
        L('For SSRF, allowlist the hosts and refuse redirects that leave the list.', 'Для SSRF используйте белый список хостов и запрещайте редиректы за его пределы.'),
        L('Validate once at the boundary against a schema, not in every handler.', 'Проверяйте один раз на границе по схеме, а не в каждом обработчике.'),
      ],
      code: `// SQL injection: the value is glued into the query text
const rows = await db.query("SELECT * FROM users WHERE email = '" + email + "'");

// Safe: the value travels as data and the driver quotes it
const rows2 = await db.query('SELECT * FROM users WHERE email = ?', [email]);

// Command injection: shell metacharacters survive the interpolation
exec('convert ' + fileName + ' out.png');   // dangerous
execFile('convert', [fileName, 'out.png']); // safe, no shell involved

// Path traversal: the name climbs out of the upload directory
const full = path.join(UPLOAD_DIR, path.basename(fileName));

// SSRF: the server fetches a host the attacker chose
const target = new URL(userUrl);
if (!ALLOWED_HOSTS.has(target.hostname)) throw new Error('blocked');`,
      table: {
        caption: L('The injection family and the defence for each case', 'Семейство инъекций и защита для каждого случая'),
        headers: [L('Class', 'Класс'), L('Typical input', 'Типичный ввод'), L('Defence', 'Защита')],
        rows: [
          [
            L('SQL injection', 'SQL-инъекция'),
            L("' OR '1'='1", "' OR '1'='1"),
            L('Parameterised query', 'Параметризованный запрос'),
          ],
          [
            L('Command injection', 'Инъекция команды'),
            L('report.pdf; rm -rf /', 'report.pdf; rm -rf /'),
            L('Argument array, no shell', 'Массив аргументов, без оболочки'),
          ],
          [
            L('Path traversal', 'Обход пути'),
            L('../../etc/passwd', '../../etc/passwd'),
            L('Resolve and check the base', 'Разрешить путь и проверить базу'),
          ],
          [
            L('SSRF', 'SSRF'),
            L('http://169.254.169.254/', 'http://169.254.169.254/'),
            L('Host allowlist', 'Белый список хостов'),
          ],
          [
            L('Log injection', 'Инъекция в лог'),
            L('a\\nERROR fake line', 'a\\nERROR fake line'),
            L('Strip control characters', 'Убирать управляющие символы'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Block the cloud metadata address explicitly', 'Явно блокируйте адрес метаданных облака'),
          text: L(
            'SSRF against a link-local metadata address is the most common way a server ends up handing out cloud credentials. Block private and link-local ranges at the network level as well as in the application, because the application allowlist will eventually miss a case.',
            'SSRF по адресу метаданных в локальной сети — самый частой способ, которым сервер отдаёт облачные учётные данные. Блокируйте приватные и link-local диапазоны и на уровне сети, и в приложении: белый список в приложении рано или поздно пропустит случай.'
          ),
        },
      ],
      takeaway: L(
        'Keep data out of parsers: bind parameters, pass argument arrays, resolve paths against a fixed base and allowlist outbound hosts.',
        'Не пускайте данные в парсеры: связывайте параметры, передавайте массивы аргументов, разрешайте пути относительно фиксированной базы и используйте белый список исходящих хостов.'
      ),
      seeAlso: [
        L('Section 6-3: output encoding as the first defence against XSS', 'Секция 6-3: экранирование вывода как первая защита от XSS'),
        L('Section 8-2: field conventions for identifiers and money', 'Секция 8-2: соглашения по полям для идентификаторов и денег'),
        L('Section 8-4: filtering, sorting and search parameters', 'Секция 8-4: параметры фильтрации, сортировки и поиска'),
      ],
    },
  ],
};
