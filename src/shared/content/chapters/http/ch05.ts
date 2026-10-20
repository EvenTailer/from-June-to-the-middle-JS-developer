import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpCh05: Chapter = {
  id: 'http-ch5',
  title: L('Identity and authentication', 'Личность и аутентификация'),
  summary: L(
    'How cookies are scoped and secured, when a session beats a token and when it does not, what a JWT actually proves, how OAuth 2 and OpenID Connect fit together, and how CSRF and XSS shape the whole design.',
    'Как задаются область и защита cookie, когда сессия лучше токена и когда наоборот, что на самом деле доказывает JWT, как устроены OAuth 2 и OpenID Connect и как CSRF и XSS определяют весь дизайн.'
  ),
  sections: [
    {
      id: 'http-ch5-s1',
      title: L('Cookies: attributes and scope', 'Cookie: атрибуты и область действия'),
      body: L(
        'A cookie is a small name-value pair that the browser stores per site and sends automatically with matching requests. The server creates it with Set-Cookie, and from that moment the browser decides when to attach it, following the rules in the attributes. That is the whole difference from a token: the cookie travels whether the application asked for it or not.\n\nThe scope is set by two attributes. Domain says which hosts may receive the cookie, and the rule is that it may include the exact host and its subdomains, but never a parent domain of the host that set it: a cookie set by app.example.com can travel to api.example.com, while a cookie set by example.com cannot travel to app.example.com unless it was created with Domain=example.com. Path narrows it further, and two cookies with the same name but different paths are two different cookies.\n\nLifetime comes from Expires and Max-Age, and the difference matters. Max-Age is a number of seconds and wins when both are present; Expires is an absolute date. A cookie with neither is a session cookie: the browser keeps it in memory, forgets it when the window closes and never writes it to disk. A persistent cookie survives a browser restart, which is convenient and which also means it sits on disk where any local malware can read it.\n\nThree security attributes refine all of this. Secure allows the cookie only over HTTPS. HttpOnly hides it from JavaScript, which removes the easiest way for an injected script to steal it. SameSite decides whether the browser attaches the cookie to cross-site requests: Lax allows it on top-level navigations, Strict never, and None requires Secure and exists for the rare case where a third-party context genuinely needs the cookie.',
        'Cookie — небольшая пара ключ-значение, которую браузер хранит для сайта и отправляет автоматически с подходящими запросами. Сервер создаёт её через Set-Cookie, и дальше решает браузер, когда её присоединить, по правилам из атрибутов. В этом и вся разница с токеном: cookie едет независимо от того, просил ли об этом приложение.\n\nОбласть задают два атрибута. Domain говорит, какие хосты могут получить cookie, и правило такое: можно указать сам хост и его поддомены, но нельзя родительский домен относительно установившего хоста: cookie, созданная на app.example.com, уедет на api.example.com, а созданная на example.com на app.example.com не уедет, если её не создавали с Domain=example.com. Path сужает область ещё сильнее, и две cookie с одинаковым именем, но разными path — это две разные cookie.\n\nВремя жизни задают Expires и Max-Age, и разница между ними важна. Max-Age — это число секунд и побеждает, если заданы оба; Expires — абсолютная дата. Cookie без обоих атрибутов — сессионная: браузер держит её в памяти, забывает при закрытии окна и никогда не пишет на диск. Постоянная cookie переживает перезапуск браузера, что удобно и одновременно означает, что она лежит на диске, где её прочитает любой локальный зловред.\n\nТри атрибута безопасности уточняют всё это. Secure разрешает cookie только по HTTPS. HttpOnly прячет её от JavaScript, и это убирает самый простой способ украсть её инъецированным скриптом. SameSite решает, присоединит ли браузер cookie к кросс-сайтовым запросам: Lax разрешает при переходах верхнего уровня, Strict запрещает всегда, а None требует Secure и существует для редкого случая, когда стороннему контексту cookie действительно нужна.'
      ),
      bullets: [
        L('A cookie is stored per site and sent automatically, a token is sent on purpose.', 'Cookie хранится для сайта и отправляется автоматически, токен отправляют намеренно.'),
        L('Domain may cover the setting host and its subdomains, never a parent domain.', 'Domain может охватывать установивший хост и его поддомены, но не родительский домен.'),
        L('A cookie without Max-Age or Expires lives only as long as the browser session.', 'Cookie без Max-Age и Expires живёт только в рамках сессии браузера.'),
        L('Secure restricts it to HTTPS, HttpOnly hides it from scripts.', 'Secure ограничивает HTTPS, HttpOnly прячет от скриптов.'),
        L('SameSite Lax, Strict and None decide what cross-site requests carry the cookie.', 'SameSite Lax, Strict и None решают, какие кросс-сайтовые запросы несут cookie.'),
      ],
      code: `Set-Cookie: sid=8f14e45fceea167a; Domain=app.example.com; Path=/; Max-Age=3600; Secure; HttpOnly; SameSite=Lax
Set-Cookie: theme=dark; Path=/; SameSite=Lax

// the browser sends the matching cookies automatically
const response = await fetch('/api/orders', { credentials: 'same-origin' });

// a script cannot read an HttpOnly cookie
document.cookie; // 'theme=dark' - the session cookie is not here

// the server reads them back from the Cookie header
// Cookie: sid=8f14e45fceea167a; theme=dark`,
      table: {
        caption: L('The attributes that shape a cookie', 'Атрибуты, которые формируют cookie'),
        headers: [L('Attribute', 'Атрибут'), L('Effect', 'Эффект'), L('Default', 'По умолчанию')],
        rows: [
          [L('Domain', 'Domain'), L('Which hosts receive it', 'Какие хосты её получат'), L('The setting host only', 'Только установивший хост')],
          [L('Path', 'Path'), L('Which URL paths receive it', 'Какие пути её получат'), L('The path of the setting URL', 'Путь создавшего URL')],
          [L('Max-Age, Expires', 'Max-Age, Expires'), L('How long it lives', 'Сколько живёт'), L('A session cookie', 'Сессионная cookie')],
          [L('Secure', 'Secure'), L('HTTPS only', 'Только HTTPS'), L('Allowed over HTTP', 'Разрешена по HTTP')],
          [L('HttpOnly', 'HttpOnly'), L('Hidden from scripts', 'Скрыта от скриптов'), L('Visible to scripts', 'Видна скриптам')],
          [L('SameSite', 'SameSite'), L('Cross-site behaviour', 'Поведение на других сайтах'), L('Lax in modern browsers', 'Lax в современных браузерах')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not set cookies on a parent domain', 'Не ставьте cookie на родительском домене'),
          text: L(
            'A cookie set on example.com with Domain=example.com is sent to every subdomain, including a forgotten staging host. Narrow the domain to the host that needs it, and prefer the host-only form by omitting Domain entirely.',
            'Cookie, поставленная на example.com с Domain=example.com, уезжает на любой поддомен, включая забытый staging-хост. Сужайте домен до нужного хоста и по возможности оставляйте host-only форму, просто не указывая Domain.'
          ),
        },
      ],
      takeaway: L(
        'Give every cookie the narrowest scope that works: host, path, lifetime, Secure, HttpOnly and SameSite.',
        'Задавайте cookie с самым узким возможным объёмом: хост, путь, время жизни, Secure, HttpOnly и SameSite.'
      ),
      seeAlso: [
        L('Section 5-2: sessions versus tokens', 'Секция 5-2: сессии против токенов'),
        L('Section 5-5: CSRF and XSS in the auth context', 'Секция 5-5: CSRF и XSS в контексте аутентификации'),
      ],
    },
    {
      id: 'http-ch5-s2',
      title: L('Sessions versus tokens', 'Сессии против токенов'),
      body: L(
        'Both approaches answer the same question, who is calling, and they store the answer in different places. A server-side session keeps the state on the server: the cookie holds only an opaque identifier, and the server looks it up in a store to find the user and the permissions. A self-contained token carries the claims inside it, signed so that the server can verify them without a lookup.\n\nThe difference shows up in the failure modes. A session cookie can be revoked instantly: delete the row and the next request is anonymous. A signed token cannot be revoked without a denylist, which turns into the same lookup the session had, and until the token expires the bearer keeps working. Sessions therefore have an expiry the server controls, while a token has an expiry the issuer wrote into it and cannot shorten afterwards.\n\nTokens have the opposite advantage. Validating a signed token is a local cryptographic operation, so the API scales horizontally without a shared session store, and a mobile or single-page client can keep the token in memory and send it explicitly. The price is the client-side storage decision: memory is safest and is lost on a refresh, localStorage survives but is readable by any script on the page, and a cookie is convenient and automatically exposed to CSRF.\n\nA production system often uses both. A short-lived access token in memory covers the API calls, and a refresh token in an HttpOnly cookie with a narrow path covers the renewal, so the long-lived credential never touches JavaScript. The refresh endpoint then becomes the most valuable target on the server, and it deserves the care of a login form: rate limiting, rotation on every use and detection of a reused token.',
        'Оба подхода отвечают на один вопрос — кто обращается, — и хранят ответ по-разному. Серверная сессия держит состояние на сервере: в cookie лежит только непрозрачный идентификатор, а сервер ищет по нему пользователя и его права. Самодостаточный токен несёт утверждения внутри себя, подписанные так, что сервер проверяет их без обращения к хранилищу.\n\nРазница проявляется в сценариях отказа. Сессионную cookie можно отозвать мгновенно: удалили запись, и следующий запрос анонимный. Подписанный токен нельзя отозвать без списка отозванных, а это та же самая выборка, от которой ушла сессия, и до истечения токена его владелец продолжает работать. Значит, у сессии срок жизни контролирует сервер, а у токена срок записан издателем и сократить его позже нельзя.\n\nУ токенов другое преимущество. Проверка подписанного токена — локальная криптографическая операция, поэтому API масштабируется горизонтально без общего хранилища сессий, а мобильный или одностраничный клиент может держать токен в памяти и отправлять его явно. Цена — решение о хранении на клиенте: память безопаснее всего и теряется при перезагрузке, localStorage переживает её, но читается любым скриптом страницы, а cookie удобна и автоматически открыта для CSRF.\n\nВ продакшене часто используют оба. Короткоживущий access-токен в памяти покрывает вызовы API, а refresh-токен в HttpOnly-cookie с узким path покрывает продление, так что долгоживущие учётные данные никогда не попадают в JavaScript. Тогда эндпоинт обновления становится самой ценной целью на сервере, и ему нужна та же аккуратность, что форме входа: ограничение частоты, ротация при каждом использовании и обнаружение повторного применения токена.'
      ),
      bullets: [
        L('A session stores the state on the server, a token carries the claims with it.', 'Сессия хранит состояние на сервере, токен несёт утверждения с собой.'),
        L('A session is revoked by deleting it, a token only by a denylist or by expiry.', 'Сессию отзывают удалением, токен — списком отозванных или истечением.'),
        L('Token validation is local, so the API scales without a shared store.', 'Проверка токена локальна, поэтому API масштабируется без общего хранилища.'),
        L('Memory is the safest place for an access token and it is lost on a refresh.', 'Память — безопаснейшее место для access-токена, но она теряется при перезагрузке.'),
        L('A refresh token in an HttpOnly cookie keeps the long-lived credential away from scripts.', 'Refresh-токен в HttpOnly-cookie держит долгоживущие учётные данные вдали от скриптов.'),
      ],
      code: `// a session: the cookie holds an opaque id, the server holds the state
const me = await fetch('/api/me', { credentials: 'same-origin' }).then((r) => r.json());
console.log(me.id); // looked up in the session store

// a token: the claims travel with every request
const response = await fetch('/api/orders', {
  headers: { Authorization: 'Bearer ' + accessToken },
});

// a refresh: rotate the token, and remember the old one to detect replay
const refreshed = await fetch('/api/refresh', {
  method: 'POST',
  credentials: 'include', // the refresh token is an HttpOnly cookie
});`,
      table: {
        caption: L('Two ways to remember who is calling', 'Два способа помнить, кто обращается'),
        headers: [L('Aspect', 'Аспект'), L('Server-side session', 'Серверная сессия'), L('Self-contained token', 'Самодостаточный токен')],
        rows: [
          [L('Where the state lives', 'Где живёт состояние'), L('Server store', 'Хранилище на сервере'), L('Inside the token', 'Внутри токена')],
          [L('Revocation', 'Отзыв'), L('Immediate', 'Мгновенный'), L('Denylist or expiry', 'Список отозванных или срок')],
          [L('Scaling', 'Масштабирование'), L('Needs a shared store', 'Нужно общее хранилище'), L('Local validation', 'Локальная проверка')],
          [L('Storage on the client', 'Хранение на клиенте'), L('A cookie', 'Cookie'), L('Memory or storage', 'Память или хранилище')],
          [L('CSRF exposure', 'Подверженность CSRF'), L('Yes, the cookie rides along', 'Да, cookie едет вместе'), L('No, if sent explicitly', 'Нет, если отправляется явно')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A token in localStorage is one XSS away from being stolen', 'Токен в localStorage крадётся одним XSS'),
          text: L(
            'Any script that runs on the page can read localStorage, so an injected snippet can exfiltrate a long-lived token. Keeping the access token in memory and the refresh token in an HttpOnly cookie limits the damage to the lifetime of one page view.',
            'Любой скрипт, выполняющийся на странице, читает localStorage, поэтому внедрённый фрагмент выносит долгоживущий токен. Хранение access-токена в памяти, а refresh-токена в HttpOnly-cookie ограничивает ущерб временем жизни одной страницы.'
          ),
        },
      ],
      takeaway: L(
        'Choose where the state lives before you choose the token format, and treat the refresh endpoint as the crown jewel.',
        'Сначала решите, где живёт состояние, и только потом формат токена, а эндпоинт обновления считайте самым ценным.'
      ),
      seeAlso: [
        L('Section 5-3: JWT and what it does not solve', 'Секция 5-3: JWT и чего он не решает'),
        L('Section 5-5: CSRF and XSS in the auth context', 'Секция 5-5: CSRF и XSS в контексте аутентификации'),
      ],
    },
    {
      id: 'http-ch5-s3',
      title: L('JWT and what it does not solve', 'JWT и чего он не решает'),
      body: L(
        'A JWT is three base64url parts separated by dots: a header with the algorithm, a payload with the claims and a signature. The server decodes the payload without a key, verifies the signature with the key and then trusts the claims. The format is not encrypted, so anybody can read the contents of a token they intercept; the signature only proves that the server issued the token and that nobody modified it on the way.\n\nWhat a JWT proves is narrow and worth stating precisely: this token was issued by a holder of the key, for the audience named in aud, at the time recorded in iat, and it has not expired. What it does not prove is that the user is still active, that the token has not been revoked, that the session it replaced is dead, and that the account still has the rights it had when the token was minted. A stateless token cannot answer those questions without extra state.\n\nSize is a practical limit. A JWT with a dozen claims is often several hundred bytes, and it travels in the Authorization header of every single request, because unlike a cookie it is not sent automatically and must be added by the client. A long list of roles and permissions inside the token inflates every request and every log line, and a token that grows over time is a token nobody can debug.\n\nThe mistakes are standard, so they are worth listing. Accepting the algorithm named in the header lets an attacker sign the token with a symmetric algorithm using the public key as the secret, so the server must pin the expected algorithm. Skipping the audience check accepts a token minted for another service. And reading roles out of an unverified token is the classic way to an authorisation bypass.',
        'JWT — это три части в base64url, разделённые точками: заголовок с алгоритмом, полезная нагрузка с утверждениями и подпись. Сервер декодирует полезную нагрузку без ключа, проверяет подпись ключом и только потом доверяет утверждениям. Формат не зашифрован, поэтому любой может прочитать содержимое перехваченного токена; подпись доказывает лишь, что токен выпустил сервер и что по дороге его не изменили.\n\nЧто именно доказывает JWT, стоит сформулировать точно: этот токен выпущен держателем ключа, для аудитории, указанной в aud, в момент, записанный в iat, и срок его действия не истёк. Чего он не доказывает: что пользователь всё ещё активен, что токен не отозван, что заменённая им сессия мертва, и что у учётной записи остались те права, что были при выпуске. Токен без состояния не может ответить на эти вопросы без дополнительного хранилища.\n\nРазмер — практическое ограничение. JWT с десятком утверждений часто занимает несколько сотен байт и едет в заголовке Authorization каждого запроса, потому что, в отличие от cookie, не отправляется сам и его обязан добавить клиент. Длинный список ролей и прав внутри токена раздувает каждый запрос и каждую строку лога, а токен, который со временем растёт, — это токен, который никто не сможет отладить.\n\nОшибки здесь типовые, поэтому их стоит перечислить. Принятие алгоритма из заголовка позволяет атакующему подписать токен симметричным алгоритмом, взяв публичный ключ как секрет, поэтому сервер обязан зафиксировать ожидаемый алгоритм. Пропуск проверки аудитории принимает токен, выпущенный для другого сервиса. А чтение ролей из непроверенного токена — классический путь к обходу авторизации.'
      ),
      bullets: [
        L('A JWT is base64url, not encryption, so anybody can read the payload.', 'JWT — это base64url, а не шифрование, полезную нагрузку читает кто угодно.'),
        L('The signature proves who signed it, when and for which audience.', 'Подпись доказывает, кто подписал, когда и для какой аудитории.'),
        L('It does not prove that the user is still active or that the token is not revoked.', 'Он не доказывает, что пользователь активен и что токен не отозван.'),
        L('Pin the expected algorithm and verify the audience before trusting the claims.', 'Зафиксируйте алгоритм и проверяйте аудиторию, прежде чем доверять утверждениям.'),
        L('Every claim rides in every request, so keep the payload small.', 'Каждое утверждение едет в каждом запросе, поэтому держите нагрузку компактной.'),
      ],
      code: `import { createVerify } from 'node:crypto';

const [headerPart, payloadPart, signaturePart] = token.split('.');
const header = JSON.parse(Buffer.from(headerPart, 'base64url').toString());
const claims = JSON.parse(Buffer.from(payloadPart, 'base64url').toString());

// pin the algorithm: never trust the header
if (header.alg !== 'RS256') throw new Error('unexpected algorithm');

const valid = createVerify('RSA-SHA256')
  .update(headerPart + '.' + payloadPart)
  .verify(publicKey, Buffer.from(signaturePart, 'base64url'));

if (!valid) throw new Error('bad signature');
if (claims.aud !== 'https://api.example.com') throw new Error('wrong audience');
if (claims.exp * 1000 < Date.now()) throw new Error('expired');`,
      table: {
        caption: L('What a JWT can and cannot answer', 'Что JWT может и чего не может'),
        headers: [L('Question', 'Вопрос'), L('Can a JWT answer it', 'Может ли JWT ответить')],
        rows: [
          [L('Who signed this', 'Кто подписал'), L('Yes, with the right key', 'Да, нужным ключом')],
          [L('For which service', 'Для какого сервиса'), L('Yes, check aud', 'Да, проверьте aud')],
          [L('Has it expired', 'Истёк ли срок'), L('Yes, check exp', 'Да, проверьте exp')],
          [L('Is the user still active', 'Активен ли пользователь'), L('No', 'Нет')],
          [L('Has it been revoked', 'Отозван ли он'), L('No', 'Нет')],
          [L('What the user may do', 'Что пользователю можно'), L('Only from verified claims', 'Только из проверенных утверждений')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The algorithm comes from the attacker', 'Алгоритм приходит от атакующего'),
          text: L(
            'The header of a JWT is not trusted input: it says how the token was signed. If the server picks the algorithm from the header, an attacker can set alg to HS256 and sign with the public key as the HMAC secret. The server must decide the algorithm itself.',
            'Заголовок JWT — не доверенный ввод: он говорит, чем подписан токен. Если сервер берёт алгоритм из заголовка, атакующий ставит alg: HS256 и подписывает публичным ключом как секретом HMAC. Алгоритм должен решать сервер.'
          ),
        },
      ],
      takeaway: L(
        'Verify the signature, the audience and the expiry, and never let the token choose the algorithm.',
        'Проверяйте подпись, аудиторию и срок, и никогда не позволяйте токену выбирать алгоритм.'
      ),
      seeAlso: [
        L('Section 5-2: sessions versus tokens', 'Секция 5-2: сессии против токенов'),
        L('Chapter 6: security on the wire', 'Глава 6: безопасность на проводе'),
      ],
    },
    {
      id: 'http-ch5-s4',
      title: L('OAuth 2 and OpenID Connect', 'OAuth 2 и OpenID Connect'),
      body: L(
        'OAuth 2 is an authorisation framework, not an authentication protocol, and the distinction causes most of the confusion in the field. It lets a user grant a third-party application limited access to their resources without handing over the password. There are four roles: the resource owner, the client, the authorisation server that issues the tokens and the resource server that holds the API.\n\nThe flow applications use is the authorisation code flow with PKCE. The browser is sent to the authorisation server with the client identifier, the requested scopes and a code challenge derived from a random verifier. The user approves, the server redirects back with a short-lived code, and the client exchanges the code together with the verifier for a token. Because the verifier never travels, an intercepted code cannot be exchanged, and the authorisation request itself cannot be replayed either.\n\nOpenID Connect adds an identity layer on top of OAuth 2. The client asks for the openid scope and receives an ID token alongside the access token: a signed set of claims describing the user, including a stable subject identifier, the issuer and the audience. The ID token tells the client who signed in, and it is not an access token and must never be sent to the API.\n\nScopes describe what the token is allowed to do, and they are the contract the user sees on the consent screen. A scope like read:orders is easy to explain and easy to limit, while a token that means all_access is neither. Refresh tokens extend the session without the user present, and they are the credential that deserves rotation, revocation and the tightest storage.',
        'OAuth 2 — это фреймворк авторизации, а не протокол аутентификации, и именно это различие порождает большинство путаницы. Он позволяет пользователю выдать стороннему приложению ограниченный доступ к своим ресурсам, не отдавая пароль. Ролей четыре: владелец ресурса, клиент, сервер авторизации, выпускающий токены, и сервер ресурсов, где живёт API.\n\nПоток, который используют приложения, — authorization code flow с PKCE. Браузер уходит на сервер авторизации с идентификатором клиента, запрошенными scope и code challenge, выведенным из случайного верификатора. Пользователь подтверждает, сервер возвращает по редиректу короткоживущий код, а клиент меняет код вместе с верификатором на токен. Поскольку верификатор не покидает клиент, перехваченный код обменять нельзя, и сам запрос авторизации не переиграть.\n\nOpenID Connect добавляет поверх OAuth 2 слой идентичности. Клиент запрашивает scope openid и вместе с access-токеном получает ID token: подписанный набор утверждений о пользователе, включающий устойчивый идентификатор субъекта, издателя и аудиторию. ID token говорит клиенту, кто вошёл, и он не является access-токеном, его нельзя отправлять в API.\n\nScope описывают, что токену разрешено, и именно они являются контрактом, который пользователь видит на экране согласия. Scope вида read:orders легко объяснить и легко ограничить, а токен со значением all_access — нет. Refresh-токены продлевают сессию без пользователя, и именно их стоит ротировать, отзывать и хранить бережнее всего.'
      ),
      bullets: [
        L('OAuth 2 is authorisation, not authentication.', 'OAuth 2 — это авторизация, а не аутентификация.'),
        L('The roles are the resource owner, the client, the authorisation server and the resource server.', 'Роли: владелец ресурса, клиент, сервер авторизации и сервер ресурсов.'),
        L('The authorisation code flow with PKCE is the one to use for applications.', 'Для приложений используйте authorization code flow с PKCE.'),
        L('The code verifier never travels, so an intercepted code is useless.', 'Верификатор кода не покидает клиент, поэтому перехваченный код бесполезен.'),
        L('OpenID Connect adds the ID token, which proves the login, not the access.', 'OpenID Connect добавляет ID token, доказывающий вход, а не доступ.'),
      ],
      code: `# step 1: the browser is sent to the authorisation server
GET /authorize
  ?response_type=code
  &client_id=app-42
  &redirect_uri=https://app.example.com/callback
  &scope=openid+profile+orders.read
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256
  &state=7f3a2b

# step 2: the client exchanges the code for tokens
POST /token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
&redirect_uri=https://app.example.com/callback`,
      table: {
        caption: L('The three tokens of OAuth 2 and OpenID Connect', 'Три токена OAuth 2 и OpenID Connect'),
        headers: [L('Token', 'Токен'), L('Audience', 'Аудитория'), L('Contains', 'Содержит'), L('Used for', 'Используется для')],
        rows: [
          [L('Access token', 'Access token'), L('The resource server', 'Сервер ресурсов'), L('Scopes and permissions', 'Scope и права'), L('Calling the API', 'Вызовов API')],
          [L('ID token', 'ID token'), L('The client', 'Клиент'), L('Identity claims', 'Утверждения о личности'), L('Knowing who signed in', 'Понимания, кто вошёл')],
          [L('Refresh token', 'Refresh token'), L('The authorisation server', 'Сервер авторизации'), L('A grant reference', 'Ссылка на разрешение'), L('Getting new access tokens', 'Получения новых access-токенов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The implicit flow is dead', 'Implicit flow мёртв'),
          text: L(
            'The old implicit flow put the access token into the URL fragment, which leaks through the history, the referrer and the logs of every proxy in between. It was removed from the OAuth 2.1 draft and from every current recommendation. Use the authorisation code flow with PKCE.',
            'Старый implicit flow клал access-токен во фрагмент URL, который утекает через историю, referrer и логи каждого промежуточного прокси. Его убрали из черновика OAuth 2.1 и из всех актуальных рекомендаций. Используйте authorization code flow с PKCE.'
          ),
        },
      ],
      takeaway: L(
        'Use the authorisation code flow with PKCE, and keep the ID token away from the API.',
        'Используйте authorization code flow с PKCE и не отправляйте ID token в API.'
      ),
      seeAlso: [
        L('Section 5-3: JWT and what it does not solve', 'Секция 5-3: JWT и чего он не решает'),
        L('Section 2-5: CORS and the preflight request', 'Секция 2-5: CORS и preflight-запрос'),
      ],
    },
    {
      id: 'http-ch5-s5',
      title: L('CSRF and XSS in the auth context', 'CSRF и XSS в контексте аутентификации'),
      body: L(
        'Cross-site request forgery is an attack on the ambient authority of a cookie. A page on another origin can make the browser send a request to your API, the cookie rides along because the browser attaches it automatically, and the server sees an authenticated request it cannot distinguish from a deliberate one. The attacker never reads the answer, they only need the side effect.\n\nThe defences are layered. SameSite=Lax on the session cookie removes the credential from cross-site POSTs, a synchroniser token in a form field or a custom header proves the request came from a page that was able to read the token, and checking the Origin or Referer header rejects requests from unexpected origins. The synchroniser token is the strongest of the three, because it cannot be guessed and cannot be produced from another origin.\n\nCross-site scripting is a different threat with the same target: the credential. A script that runs on your page executes with the privileges of the user, so it can read anything the page can read, call the API with the session cookie attached and exfiltrate the result. HttpOnly does not save you here, because the script does not need to read the cookie, it only needs to make requests. What saves you is not letting the script run at all, which is what a Content Security Policy and correct output encoding are for.\n\nThe two attacks interact. A cookie session with no CSRF protection is vulnerable to forgery, while a token in localStorage is immune to CSRF but one injection away from being stolen. The conclusion is that the defence depends on where the credential lives: a cookie needs SameSite plus a token, a token in memory needs a strict CSP and no injected script. Either way, the same request must not be acceptable without proof that it came from your own application.',
        'Cross-site request forgery — атака на «окружающую» авторизацию cookie. Страница на другом origin может заставить браузер отправить запрос в ваш API, cookie уедет вместе с ним, потому что браузер присоединяет её автоматически, и сервер увидит аутентифицированный запрос, который не отличить от намеренного. Злоумышленник никогда не читает ответ, ему нужен только побочный эффект.\n\nЗащита выстроена слоями. SameSite=Lax на сессионной cookie убирает учётные данные с кросс-сайтовых POST, synchroniser token в поле формы или в своём заголовке доказывает, что запрос пришёл со страницы, способной прочитать этот токен, а проверка Origin или Referer отклоняет запросы с неожиданного origin. Самый сильный из трёх — synchroniser token: его нельзя угадать и нельзя получить с другого origin.\n\nCross-site scripting — другая угроза с той же целью: украсть учётные данные. Скрипт, выполняющийся на вашей странице, работает с правами пользователя, поэтому читает всё, что читает страница, вызывает API с присоединённой сессионной cookie и выносит результат. HttpOnly здесь не помогает: скрипту не нужно читать cookie, ему достаточно делать запросы. Помогает одно — не дать скрипту выполниться, а для этого нужны Content Security Policy и корректное кодирование вывода.\n\nДве атаки взаимодействуют. Сессия на cookie без защиты от CSRF уязвима к подделке, а токен в localStorage к CSRF неуязвим, но стоит одного внедрения до кражи. Вывод: защита зависит от того, где живут учётные данные. Cookie нуждаются в SameSite плюс токене, токен в памяти — в строгом CSP и в отсутствии внедрённого скрипта. И в любом случае запрос не должен приниматься без доказательства, что он пришёл из вашего приложения.'
      ),
      bullets: [
        L('CSRF abuses the cookie that the browser sends by itself.', 'CSRF злоупотребляет cookie, которую браузер отправляет сам.'),
        L('SameSite=Lax removes the credential from cross-site POSTs.', 'SameSite=Lax убирает учётные данные с кросс-сайтовых POST.'),
        L('A synchroniser token proves the request came from your own page.', 'Synchroniser token доказывает, что запрос пришёл с вашей страницы.'),
        L('XSS can use a session cookie without ever reading it.', 'XSS может использовать сессионную cookie, ни разу её не прочитав.'),
        L('HttpOnly protects the cookie from theft, not from misuse.', 'HttpOnly защищает cookie от кражи, а не от злоупотребления.'),
      ],
      code: `// the server sets a session cookie that resists CSRF
res.setHeader(
  'Set-Cookie',
  'sid=8f14e45f; Path=/; HttpOnly; Secure; SameSite=Lax'
);

// and expects a token that a cross-origin page cannot produce
app.post('/api/transfer', requireCsrfToken, (req, res) => {
  res.json({ ok: true });
});

// the client sends the token in a header, which forces a preflight
await fetch('/api/transfer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
  body: JSON.stringify({ amount: 100 }),
});`,
      table: {
        caption: L('Attacks on the credential and their defences', 'Атаки на учётные данные и защита от них'),
        headers: [L('Attack', 'Атака'), L('Needs', 'Нужно для успеха'), L('Main defence', 'Основная защита')],
        rows: [
          [L('CSRF', 'CSRF'), L('An ambient cookie', 'Cookie, приходящая сама'), L('SameSite plus a synchroniser token', 'SameSite плюс synchroniser token')],
          [L('Token theft', 'Кража токена'), L('Script execution on the page', 'Выполнение скрипта на странице'), L('Keep tokens in memory, strict CSP', 'Память для токенов, строгий CSP')],
          [L('Replay', 'Повтор'), L('A captured credential', 'Перехваченные учётные данные'), L('Short expiry, rotation, audience checks', 'Короткий срок, ротация, проверка аудитории')],
          [L('Session fixation', 'Фиксация сессии'), L('A known session id', 'Известный идентификатор сессии'), L('Regenerate the id after login', 'Смена идентификатора после входа')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('HttpOnly is not an XSS defence', 'HttpOnly — не защита от XSS'),
          text: L(
            'HttpOnly stops a script from reading the cookie value. It does not stop the script from making an authenticated request on the page, which is exactly what an attack needs. The real defence against XSS is preventing the script from running: a strict CSP and correct output encoding.',
            'HttpOnly мешает скрипту прочитать значение cookie, но не мешает ему выполнить аутентифицированный запрос со страницы, а это атаке и нужно. Настоящая защита от XSS — не дать скрипту запуститься: строгий CSP и корректное кодирование вывода.'
          ),
        },
      ],
      takeaway: L(
        'Cookies need SameSite and a CSRF token, tokens need memory storage and a strict CSP.',
        'Cookie нуждаются в SameSite и CSRF-токене, токены — в хранении в памяти и строгом CSP.'
      ),
      seeAlso: [
        L('Section 5-1: cookie attributes and scope', 'Секция 5-1: атрибуты cookie и область действия'),
        L('Chapter 6: security on the wire', 'Глава 6: безопасность на проводе'),
      ],
    },
  ],
};
