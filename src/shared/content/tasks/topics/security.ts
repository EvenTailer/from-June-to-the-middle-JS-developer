import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const securityTasks: PracticeTask[] = [
  {
    id: 'topic-security-1',
    moduleId: 'http',
    topic: 'security',
    level: 'basic',
    title: L('Escape HTML to prevent XSS', 'Экранирование HTML против XSS'),
    brief: L(
      'Write a function escapeHtml(text) that returns the text with the five characters that are dangerous inside HTML replaced by entities: & becomes &amp;, < becomes &lt;, > becomes &gt;, the double quote becomes &quot;, and the apostrophe becomes &#39;. Replace the ampersand first, otherwise the ampersands that the other replacements introduce would be escaped a second time. The function takes a string and returns a new string, and it must not change any other character. Example: escapeHtml("<b>Hi & bye</b>") returns "&lt;b&gt;Hi &amp; bye&lt;/b&gt;", escapeHtml("O\'Neil") returns "O&#39;Neil", escapeHtml("plain text") returns "plain text".',
      'Напишите функцию escapeHtml(text), которая возвращает текст, в котором пять опасных внутри HTML символов заменены на сущности: & становится &amp;, < — на &lt;, > — на &gt;, двойная кавычка — на &quot;, апостроф — на &#39;. Заменяйте амперсанд первым, иначе амперсанды, которые вводят остальные замены, будут экранированы второй раз. Функция принимает строку и возвращает новую строку, не меняя остальные символы. Пример: escapeHtml("<b>Hi & bye</b>") возвращает "&lt;b&gt;Hi &amp; bye&lt;/b&gt;", escapeHtml("O\'Neil") возвращает "O&#39;Neil", escapeHtml("plain text") возвращает "plain text".'
    ),
    hint: L(
      'Use a single replace call with the pattern /[&<>"\']/g and a lookup table of entities, so every character is replaced in one pass.',
      'Используйте один вызов replace с шаблоном /[&<>"\']/g и таблицей сущностей, чтобы все символы заменились за один проход.'
    ),
    solution: `const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}

console.log(escapeHtml('<b>Hi & bye</b>')); // &lt;b&gt;Hi &amp; bye&lt;/b&gt;
console.log(escapeHtml("O'Neil")); // O&#39;Neil`,
    explanation: L(
      'Escaping is the single most effective defence against cross-site scripting: if the browser receives &lt; instead of <, the text can never be parsed as a tag. The regular expression matches every dangerous character in one pass, and the lookup table maps it to the entity. Because the whole string is scanned at once, the ampersand of an inserted entity is never seen by the replacement and cannot be escaped twice. The apostrophe is escaped as well, because it breaks out of single-quoted attribute values.',
      'Экранирование — самая действенная защита от межсайтового скриптинга: если браузер получает &lt; вместо <, текст физически не может быть разобран как тег. Регулярное выражение находит все опасные символы за один проход, а таблица сопоставляет их сущностям. Так как вся строка сканируется целиком, амперсанд вставленной сущности не попадает под замену и не экранируется второй раз. Апостроф тоже экранируется, ведь он вырывается из значения атрибута в одинарных кавычках.'
    ),
  },
  {
    id: 'topic-security-2',
    moduleId: 'http',
    topic: 'security',
    level: 'basic',
    title: L('Sanitize a URL to block javascript:', 'Санитизация URL против javascript:'),
    brief: L(
      'Write a function sanitizeUrl(url) that returns the URL only when it is safe to put into an href attribute, and null otherwise. The rules are: trim the input; remove every space and control character (codes 0 to 32) before checking the scheme, because "java\\nscript:" is executed by browsers just like "javascript:"; reject the schemes javascript:, vbscript: and data:; accept only absolute http and https URLs and relative paths that start with a single slash; reject protocol-relative URLs that start with two slashes. Example: sanitizeUrl("https://example.com/page") returns the same string, sanitizeUrl("/about") returns "/about", sanitizeUrl("javascript:alert(1)") returns null, sanitizeUrl("JavaScript:alert(1)") returns null, sanitizeUrl("java\\nscript:alert(1)") returns null, sanitizeUrl("//evil.com") returns null.',
      'Напишите функцию sanitizeUrl(url), которая возвращает URL, только если его безопасно подставлять в атрибут href, и null иначе. Правила: обрезать пробелы по краям; перед проверкой схемы удалить все пробелы и управляющие символы (коды от 0 до 32), потому что "java\\nscript:" выполняется браузером так же, как "javascript:"; отклонять схемы javascript:, vbscript: и data:; принимать только абсолютные http и https URL и относительные пути, начинающиеся с одной косой черты; отклонять протокол-относительные URL, начинающиеся с двух косых черт. Пример: sanitizeUrl("https://example.com/page") возвращает ту же строку, sanitizeUrl("/about") возвращает "/about", sanitizeUrl("javascript:alert(1)") возвращает null, sanitizeUrl("JavaScript:alert(1)") возвращает null, sanitizeUrl("java\\nscript:alert(1)") возвращает null, sanitizeUrl("//evil.com") возвращает null.'
    ),
    hint: L(
      'Normalize first: url.trim() and a replace of /[\\u0000-\\u0020]/g with an empty string. Then test the scheme case-insensitively and check the allowed prefixes with a regular expression.',
      'Сначала нормализуйте: url.trim() и replace регулярного выражения /[\\u0000-\\u0020]/g на пустую строку. Затем проверьте схему без учёта регистра и допустимые префиксы регулярным выражением.'
    ),
    solution: `const BLOCKED_SCHEMES = /^(javascript|vbscript|data):/i;
const ABSOLUTE_URL = /^https?:\\/\\//i;

function sanitizeUrl(url: string): string | null {
  const trimmed = url.trim();
  if (trimmed === '') {
    return null;
  }

  // Strip spaces and control characters: browsers ignore them inside the scheme.
  const normalized = trimmed.replace(/[\\u0000-\\u0020]/g, '');

  if (BLOCKED_SCHEMES.test(normalized)) {
    return null;
  }

  if (normalized.startsWith('//')) {
    return null;
  }

  if (ABSOLUTE_URL.test(normalized) || normalized.startsWith('/')) {
    return trimmed;
  }

  return null;
}

console.log(sanitizeUrl('https://example.com/page')); // https://example.com/page
console.log(sanitizeUrl('/about')); // /about
console.log(sanitizeUrl('javascript:alert(1)')); // null
console.log(sanitizeUrl('JavaScript:alert(1)')); // null
console.log(sanitizeUrl('java\\nscript:alert(1)')); // null
console.log(sanitizeUrl('//evil.com')); // null`,
    explanation: L(
      'A javascript: URL executes code in the page origin, so it is the classic payload of an XSS attack. The dangerous part is that browsers are lenient: they ignore spaces, tabs and newlines inside the scheme, so a naive check for the literal string "javascript:" is easy to bypass. Normalizing the input before the check closes that hole, and testing the scheme case-insensitively closes the "JavaScript:" variant. The protocol-relative form is rejected too, because //evil.com is a full URL to another host and would be used for an open redirect. The function returns the trimmed original URL, not the normalized one, so the value that goes into the page stays readable.',
      'URL со схемой javascript: выполняет код в источнике страницы, это классическая полезная нагрузка XSS-атаки. Опасность в том, что браузеры прощают лишние пробелы, табуляции и переводы строк внутри схемы, поэтому наивная проверка литерала "javascript:" легко обходится. Нормализация перед проверкой закрывает эту дыру, а проверка схемы без учёта регистра закрывает вариант "JavaScript:". Протокол-относительная форма тоже отклоняется, потому что //evil.com — это полный URL другого хоста, который использовали бы для открытого редиректа. Функция возвращает обрезанный исходный URL, а не нормализованный, чтобы в страницу попало читаемое значение.'
    ),
  },
  {
    id: 'topic-security-3',
    moduleId: 'http',
    topic: 'security',
    level: 'basic',
    title: L('Build a Set-Cookie string with safe flags', 'Сборка Set-Cookie с безопасными флагами'),
    brief: L(
      'Write a function serializeCookie(name, value, options) that returns a Set-Cookie header value. The name and the value are joined with "=", and the value is encoded with encodeURIComponent. The options object may contain maxAge (a number of seconds), path, domain, secure (boolean), httpOnly (boolean) and sameSite (the strings "Strict", "Lax" or "None"). The header must always contain Path (default "/"), HttpOnly (on unless the option is explicitly false), Secure (on unless the option is explicitly false) and SameSite (default "Lax"). Max-Age is added only when maxAge is a number, Domain only when domain is a non-empty string. The parts are joined with "; ". Example: serializeCookie("sid", "abc", { maxAge: 60 }) returns "sid=abc; Path=/; Max-Age=60; HttpOnly; Secure; SameSite=Lax", serializeCookie("theme", "dark", { httpOnly: false, secure: false, sameSite: "None" }) returns "theme=dark; Path=/; SameSite=None" without the HttpOnly and Secure parts.',
      'Напишите функцию serializeCookie(name, value, options), которая возвращает значение заголовка Set-Cookie. Имя и значение соединяются знаком "=", значение кодируется через encodeURIComponent. Объект options может содержать maxAge (число секунд), path, domain, secure (boolean), httpOnly (boolean) и sameSite (строки "Strict", "Lax" или "None"). Заголовок обязан содержать Path (по умолчанию "/"), HttpOnly (включён, если опция явно не false), Secure (включён, если опция явно не false) и SameSite (по умолчанию "Lax"). Max-Age добавляется только когда maxAge — число, Domain — только когда domain непустая строка. Части соединяются через "; ". Пример: serializeCookie("sid", "abc", { maxAge: 60 }) возвращает "sid=abc; Path=/; Max-Age=60; HttpOnly; Secure; SameSite=Lax", serializeCookie("theme", "dark", { httpOnly: false, secure: false, sameSite: "None" }) возвращает "theme=dark; Path=/; SameSite=None" без HttpOnly и Secure.'
    ),
    hint: L(
      'Push the parts into an array in a fixed order and join them with "; ". Treat the boolean flags as on by default, so only an explicit false turns them off.',
      'Кладите части в массив в фиксированном порядке и соединяйте через "; ". Считайте булевы флаги включёнными по умолчанию, выключает их только явный false.'
    ),
    solution: `interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const parts: string[] = [name + '=' + encodeURIComponent(value)];

  parts.push('Path=' + (options.path ?? '/'));

  if (typeof options.maxAge === 'number' && Number.isFinite(options.maxAge)) {
    parts.push('Max-Age=' + Math.floor(options.maxAge));
  }

  if (options.domain) {
    parts.push('Domain=' + options.domain);
  }

  if (options.httpOnly !== false) {
    parts.push('HttpOnly');
  }

  if (options.secure !== false) {
    parts.push('Secure');
  }

  parts.push('SameSite=' + (options.sameSite ?? 'Lax'));

  return parts.join('; ');
}

console.log(serializeCookie('sid', 'abc', { maxAge: 60 }));
// sid=abc; Path=/; Max-Age=60; HttpOnly; Secure; SameSite=Lax

console.log(serializeCookie('theme', 'dark', { httpOnly: false, secure: false, sameSite: 'None' }));
// theme=dark; Path=/; SameSite=None`,
    explanation: L(
      'The flags are what make a cookie safe, and the safe state has to be the default one. HttpOnly hides the cookie from document.cookie, so injected scripts cannot read the session id. Secure forbids sending the cookie over plain HTTP. SameSite stops the browser from attaching the cookie to cross-site requests, which is the base of CSRF protection. Because the options are optional, the checks use the pattern "not false" rather than "true", so an omitted flag stays on and only an explicit false removes it. The value is encoded because a raw value could contain a semicolon and inject an extra attribute.',
      'Флаги делают cookie безопасной, и безопасное состояние должно быть состоянием по умолчанию. HttpOnly прячет cookie от document.cookie, поэтому внедрённый скрипт не прочитает идентификатор сессии. Secure запрещает отправку cookie по обычному HTTP. SameSite не даёт браузеру прикреплять cookie к кросс-сайтовым запросам, что лежит в основе защиты от CSRF. Так как опции необязательны, проверки построены на "не false", а не на "true": пропущенный флаг остаётся включённым, и только явный false его убирает. Значение кодируется, потому что сырое значение может содержать точку с запятой и добавить лишний атрибут.'
    ),
  },
  {
    id: 'topic-security-4',
    moduleId: 'http',
    topic: 'security',
    level: 'intermediate',
    title: L('CSRF double-submit token check', 'Проверка CSRF-токена методом double submit'),
    brief: L(
      'Implement a double submit cookie CSRF check. Write a function isCsrfValid(cookieToken, headerToken) that returns true only when both tokens exist and are byte-for-byte equal, and false in every other case. Compare the tokens with crypto.timingSafeEqual so that the comparison time does not depend on how many characters match. timingSafeEqual requires two buffers of the same length, so if the lengths differ the function must return false without calling it. Example: isCsrfValid("abc123", "abc123") returns true, isCsrfValid("abc123", "abc124") returns false, isCsrfValid("abc", "abcd") returns false, isCsrfValid(undefined, "abc") returns false, isCsrfValid("abc", "") returns false.',
      'Реализуйте проверку CSRF по схеме double submit cookie. Напишите функцию isCsrfValid(cookieToken, headerToken), которая возвращает true, только когда оба токена существуют и побайтово равны, и false во всех остальных случаях. Сравнивайте токены через crypto.timingSafeEqual, чтобы время сравнения не зависело от количества совпавших символов. timingSafeEqual требует два буфера одинаковой длины, поэтому при разной длине функция должна вернуть false, не вызывая его. Пример: isCsrfValid("abc123", "abc123") возвращает true, isCsrfValid("abc123", "abc124") возвращает false, isCsrfValid("abc", "abcd") возвращает false, isCsrfValid(undefined, "abc") возвращает false, isCsrfValid("abc", "") возвращает false.'
    ),
    hint: L(
      'Convert both tokens to Buffers with Buffer.from(token, "utf8"), compare the lengths first, and only then call timingSafeEqual.',
      'Преобразуйте оба токена в Buffer через Buffer.from(token, "utf8"), сначала сравните длины и только потом вызывайте timingSafeEqual.'
    ),
    solution: `import { timingSafeEqual } from 'node:crypto';

function isCsrfValid(cookieToken: string | undefined, headerToken: string | undefined): boolean {
  if (!cookieToken || !headerToken) {
    return false;
  }

  const cookieBuffer = Buffer.from(cookieToken, 'utf8');
  const headerBuffer = Buffer.from(headerToken, 'utf8');

  if (cookieBuffer.length !== headerBuffer.length) {
    return false;
  }

  return timingSafeEqual(cookieBuffer, headerBuffer);
}

console.log(isCsrfValid('abc123', 'abc123')); // true
console.log(isCsrfValid('abc123', 'abc124')); // false
console.log(isCsrfValid('abc', 'abcd')); // false
console.log(isCsrfValid(undefined, 'abc')); // false`,
    explanation: L(
      'In the double submit pattern the server sends a random token in a cookie and the client sends the same token back in a header. A cross-site attacker can make the browser send the cookie but cannot read it to fill in the header, so the request is rejected. The comparison uses a constant-time function: a plain string comparison returns as soon as it finds a difference, and the time it takes leaks how many leading characters were correct, which lets an attacker guess the token byte by byte. timingSafeEqual always inspects every byte, so the duration no longer depends on the content. The length check is a hard requirement of the API, not an optimization: timingSafeEqual throws when the buffers have different sizes.',
      'В схеме double submit сервер отправляет случайный токен в cookie, а клиент возвращает тот же токен в заголовке. Атакующий с другого сайта может заставить браузер отправить cookie, но не может прочитать её, чтобы заполнить заголовок, поэтому запрос отклоняется. Сравнение выполняется функцией постоянного времени: обычное сравнение строк возвращается сразу при первом различии, и время работы выдаёт, сколько ведущих символов совпало, что позволяет подбирать токен побайтово. timingSafeEqual всегда проверяет все байты, поэтому длительность больше не зависит от содержимого. Проверка длин — жёсткое требование API, а не оптимизация: timingSafeEqual выбрасывает исключение, если размеры буферов различаются.'
    ),
  },
  {
    id: 'topic-security-5',
    moduleId: 'http',
    topic: 'security',
    level: 'intermediate',
    title: L('Compare a password hash in constant time', 'Сравнение хеша пароля за постоянное время'),
    brief: L(
      'Write a function verifyPassword(input, expectedHashHex) that returns true when the SHA-256 hash of the input, encoded as a lowercase hex string, equals expectedHashHex. Hash both sides before comparing: the digest of the input is always 32 bytes, and the expected hash is decoded from hex into 32 bytes as well. Use crypto.timingSafeEqual for the comparison and return false without calling it when the byte lengths differ. Example: verifyPassword("secret", createHash("sha256").update("secret").digest("hex")) returns true, verifyPassword("wrong", thatSameHash) returns false, verifyPassword("secret", "00") returns false.',
      'Напишите функцию verifyPassword(input, expectedHashHex), которая возвращает true, когда SHA-256 хеш входа в виде строки из шестнадцатеричных символов в нижнем регистре равен expectedHashHex. Хешируйте обе стороны перед сравнением: дайджест входа всегда равен 32 байтам, и ожидаемый хеш декодируется из hex в те же 32 байта. Для сравнения используйте crypto.timingSafeEqual, а при разной длине в байтах возвращайте false, не вызывая его. Пример: verifyPassword("secret", createHash("sha256").update("secret").digest("hex")) возвращает true, verifyPassword("wrong", thatSameHash) возвращает false, verifyPassword("secret", "00") возвращает false.'
    ),
    hint: L(
      'Hashing first equalises the lengths, so timingSafeEqual always receives two 32-byte buffers and the length leak disappears as well.',
      'Хеширование первым выравнивает длины, поэтому timingSafeEqual всегда получает два буфера по 32 байта, и утечка длины тоже исчезает.'
    ),
    solution: `import { createHash, timingSafeEqual } from 'node:crypto';

function verifyPassword(input: string, expectedHashHex: string): boolean {
  const digest = createHash('sha256').update(input, 'utf8').digest();
  const expected = Buffer.from(expectedHashHex, 'hex');

  if (expected.length !== digest.length) {
    return false;
  }

  return timingSafeEqual(digest, expected);
}

const hash = createHash('sha256').update('secret', 'utf8').digest('hex');

console.log(verifyPassword('secret', hash)); // true
console.log(verifyPassword('wrong', hash)); // false
console.log(verifyPassword('secret', '00')); // false`,
    explanation: L(
      'A password is never compared as plain text, it is compared as a hash. Hashing the input first has two benefits: the length of the stored value no longer depends on the length of the password, and the comparison always works with fixed 32-byte buffers, so timingSafeEqual never has to reject different lengths and the length of the password is not leaked. In a real application the hash would be produced with a slow password hashing function such as bcrypt, scrypt or argon2, because plain SHA-256 is fast and can be brute-forced; the constant-time comparison stays the same. A real application would also compare the hash of the stored value, and never the password itself.',
      'Пароль никогда не сравнивается как обычный текст — сравнивают хеш. Хеширование входа даёт два преимущества: длина сохранённого значения не зависит от длины пароля, и сравнение всегда идёт по фиксированным буферам в 32 байта, поэтому timingSafeEqual никогда не отклоняет разные длины и длина пароля не утекает. В настоящем приложении хеш создают медленной функцией для паролей — bcrypt, scrypt или argon2, потому что обычный SHA-256 быстрый и поддаётся перебору; сравнение за постоянное время остаётся тем же. Реальное приложение сравнивает хеш сохранённого значения, а не сам пароль.'
    ),
  },
  {
    id: 'topic-security-6',
    moduleId: 'http',
    topic: 'security',
    level: 'advanced',
    title: L('Load and validate secrets from the environment', 'Загрузка и проверка секретов из окружения'),
    brief: L(
      'Write a function loadSecrets(env) that reads the configuration from an environment object (the shape of process.env) and returns an object with DB_URL (string), JWT_SECRET (string) and SESSION_TTL (number). Throw an Error when a required variable is missing, empty or only whitespace, and list all missing names in the message separated by commas. SESSION_TTL is optional: when it is absent use 3600, and when it is present it must be a positive finite number, otherwise throw an Error. Example: loadSecrets({ DB_URL: "postgres://localhost/app", JWT_SECRET: "s3cret" }) returns { DB_URL: "postgres://localhost/app", JWT_SECRET: "s3cret", SESSION_TTL: 3600 }, loadSecrets({ DB_URL: "postgres://localhost/app" }) throws an Error mentioning JWT_SECRET, loadSecrets({ DB_URL: " ", JWT_SECRET: "s3cret" }) throws an Error, loadSecrets({ DB_URL: "db", JWT_SECRET: "s", SESSION_TTL: "abc" }) throws an Error.',
      'Напишите функцию loadSecrets(env), которая читает конфигурацию из объекта окружения (формы process.env) и возвращает объект с DB_URL (string), JWT_SECRET (string) и SESSION_TTL (number). Выбрасывайте Error, если обязательная переменная отсутствует, пуста или состоит только из пробелов, и перечисляйте все отсутствующие имена в сообщении через запятую. SESSION_TTL необязательна: если её нет, используется 3600, а если она есть, то должна быть положительным конечным числом, иначе выбрасывается Error. Пример: loadSecrets({ DB_URL: "postgres://localhost/app", JWT_SECRET: "s3cret" }) возвращает { DB_URL: "postgres://localhost/app", JWT_SECRET: "s3cret", SESSION_TTL: 3600 }, loadSecrets({ DB_URL: "postgres://localhost/app" }) выбрасывает Error с упоминанием JWT_SECRET, loadSecrets({ DB_URL: " ", JWT_SECRET: "s3cret" }) выбрасывает Error, loadSecrets({ DB_URL: "db", JWT_SECRET: "s", SESSION_TTL: "abc" }) выбрасывает Error.'
    ),
    hint: L(
      'Collect the missing names first and throw once with all of them, and use Number(value) plus Number.isFinite to check the numeric variable.',
      'Сначала соберите имена отсутствующих переменных и выбросьте одну ошибку со всеми ними, а для числа используйте Number(value) и Number.isFinite.'
    ),
    solution: `interface Secrets {
  DB_URL: string;
  JWT_SECRET: string;
  SESSION_TTL: number;
}

const REQUIRED_KEYS = ['DB_URL', 'JWT_SECRET'] as const;

function loadSecrets(env: Record<string, string | undefined>): Secrets {
  const missing = REQUIRED_KEYS.filter((key) => {
    const value = env[key];
    return value === undefined || value.trim() === '';
  });

  if (missing.length > 0) {
    throw new Error('Missing required environment variables: ' + missing.join(', '));
  }

  const rawTtl = env.SESSION_TTL;
  let ttl = 3600;

  if (rawTtl !== undefined && rawTtl.trim() !== '') {
    ttl = Number(rawTtl);
    if (!Number.isFinite(ttl) || ttl <= 0) {
      throw new Error('SESSION_TTL must be a positive number');
    }
  }

  return {
    DB_URL: env.DB_URL as string,
    JWT_SECRET: env.JWT_SECRET as string,
    SESSION_TTL: ttl,
  };
}

console.log(loadSecrets({ DB_URL: 'postgres://localhost/app', JWT_SECRET: 's3cret' }));
// { DB_URL: 'postgres://localhost/app', JWT_SECRET: 's3cret', SESSION_TTL: 3600 }`,
    explanation: L(
      'Secrets belong in environment variables, never in the source code and never in the repository, and the application must fail loudly when they are absent instead of starting with an empty password. Reporting every missing name at once saves a restart per mistake. The whitespace check matters because an unset variable in a shell script is often an empty string, and an empty secret is worse than a missing one, because the check for a missing value silently passes. SESSION_TTL is validated as a number because the environment only stores strings, and a wrong value such as "abc" would otherwise become NaN and silently break every session.',
      'Секреты должны жить в переменных окружения, а не в исходном коде и не в репозитории, и приложение должно громко падать при их отсутствии вместо запуска с пустым паролем. Сообщение сразу обо всех отсутствующих именах экономит перезапуск на каждую ошибку. Проверка на пробелы важна, потому что неустановленная переменная в shell-скрипте часто оказывается пустой строкой, а пустой секрет хуже отсутствующего: проверка на отсутствие молча проходит. SESSION_TTL проверяется как число, потому что окружение хранит только строки, и значение вроде "abc" иначе превратилось бы в NaN и тихо сломало бы все сессии.'
    ),
  },
  {
    id: 'topic-security-7',
    moduleId: 'http',
    topic: 'security',
    level: 'advanced',
    title: L('Rate limiter with a sliding window', 'Ограничитель частоты со скользящим окном'),
    brief: L(
      'Write a function createRateLimiter(options) that returns a function rateLimit(key) enforcing a sliding window limit. The options are windowMs (the length of the window in milliseconds), max (the number of allowed requests) and an optional now function that returns the current timestamp, which makes the limiter testable. The returned function takes a key such as a user id or an IP address and returns an object with allowed (boolean), remaining (the number of requests still available) and retryAfterSeconds (0 when the request is allowed). Timestamps that fall out of the window are dropped before counting, so a request is allowed again exactly windowMs after the first request of the current window. When a request is rejected, retryAfterSeconds is the number of whole seconds until the oldest request leaves the window, rounded up, and it is never less than 1. Example: with windowMs 60000 and max 3, the first three calls return { allowed: true, remaining: 2 }, { allowed: true, remaining: 1 } and { allowed: true, remaining: 0 }, the fourth returns { allowed: false, remaining: 0, retryAfterSeconds: 60 }, and after the window passes the calls are allowed again.',
      'Напишите функцию createRateLimiter(options), возвращающую функцию rateLimit(key), которая применяет ограничение по скользящему окну. Опции: windowMs (длина окна в миллисекундах), max (число разрешённых запросов) и необязательная функция now, возвращающая текущую метку времени, благодаря которой ограничитель можно тестировать. Возвращаемая функция принимает ключ — например, id пользователя или IP-адрес — и возвращает объект с allowed (boolean), remaining (число оставшихся запросов) и retryAfterSeconds (0, если запрос разрешён). Метки времени, выпавшие из окна, отбрасываются до подсчёта, поэтому запрос снова разрешается ровно через windowMs после первого запроса текущего окна. При отказе retryAfterSeconds равно целому числу секунд до выхода самой старой метки из окна, округлённому вверх, и оно не меньше 1. Пример: при windowMs 60000 и max 3 первые три вызова возвращают { allowed: true, remaining: 2 }, { allowed: true, remaining: 1 } и { allowed: true, remaining: 0 }, четвёртый — { allowed: false, remaining: 0, retryAfterSeconds: 60 }, а после истечения окна запросы снова разрешаются.'
    ),
    hint: L(
      'Store an array of timestamps per key. On every call filter out the timestamps older than now - windowMs, then compare the length of the remaining array with max.',
      'Храните массив меток времени для каждого ключа. При каждом вызове отбрасывайте метки старше now - windowMs, затем сравнивайте длину оставшегося массива с max.'
    ),
    solution: `interface RateLimitOptions {
  windowMs: number;
  max: number;
  now?: () => number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

function createRateLimiter(options: RateLimitOptions) {
  const hits = new Map<string, number[]>();
  const now = options.now ?? (() => Date.now());

  return function rateLimit(key: string): RateLimitResult {
    const timestamp = now();
    const windowStart = timestamp - options.windowMs;

    const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);

    if (recent.length >= options.max) {
      hits.set(key, recent);
      const oldest = recent[0];
      const waitMs = oldest + options.windowMs - timestamp;
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil(waitMs / 1000)),
      };
    }

    recent.push(timestamp);
    hits.set(key, recent);

    return {
      allowed: true,
      remaining: Math.max(0, options.max - recent.length),
      retryAfterSeconds: 0,
    };
  };
}

let clock = 0;
const limiter = createRateLimiter({ windowMs: 60_000, max: 3, now: () => clock });

console.log(limiter('user-1')); // { allowed: true, remaining: 2, retryAfterSeconds: 0 }
console.log(limiter('user-1')); // { allowed: true, remaining: 1, retryAfterSeconds: 0 }
console.log(limiter('user-1')); // { allowed: true, remaining: 0, retryAfterSeconds: 0 }
console.log(limiter('user-1')); // { allowed: false, remaining: 0, retryAfterSeconds: 60 }

clock += 60_001;
console.log(limiter('user-1')); // { allowed: true, remaining: 2, retryAfterSeconds: 0 }`,
    explanation: L(
      'A fixed window limiter has a classic flaw: a client can send max requests at the end of one window and max requests at the start of the next, doubling the real rate. The sliding window keeps the exact timestamps of the recent requests and counts only those that are still inside the window, so the limit holds for every moment, not only on average. Keeping the timestamps instead of a single counter also gives the exact time until the next slot frees up, which becomes the Retry-After header. The now function is injected instead of calling Date.now() directly, which makes the behaviour deterministic in tests. In a server with many users the map would grow, so old keys are removed when their last timestamp leaves the window.',
      'У ограничителя с фиксированным окном есть известный изъян: клиент может отправить max запросов в конце одного окна и max запросов в начале следующего, удвоив реальную частоту. Скользящее окно хранит точные метки времени недавних запросов и считает только те, что ещё внутри окна, поэтому лимит соблюдается в каждый момент, а не в среднем. Хранение меток вместо одного счётчика также даёт точное время освобождения слота, которое превращается в заголовок Retry-After. Функция now внедряется вместо прямого вызова Date.now(), что делает поведение детерминированным в тестах. На сервере с большим числом пользователей карта разрастается, поэтому старые ключи удаляются, когда их последняя метка выходит из окна.'
    ),
  },
  {
    id: 'topic-security-8',
    moduleId: 'http',
    topic: 'security',
    level: 'advanced',
    title: L('Validate an uploaded file', 'Проверка загруженного файла'),
    brief: L(
      'Write a function validateUpload(file) that checks an uploaded file and returns an object with ok (boolean) and, when ok is false, a reason string. The file is described by an object with filename, mimeType and size. The rules are: the size must be greater than zero and at most 5 MB (5 * 1024 * 1024 bytes); the mimeType must be one of "image/png", "image/jpeg" and "application/pdf"; the extension of the filename must be one of ".png", ".jpg", ".jpeg" and ".pdf", compared in lower case; the check of the extension and the check of the mime type must both pass. The first failing rule decides the reason, in this order: empty file, file too large, unsupported mime type, unsupported extension. Example: validateUpload({ filename: "photo.png", mimeType: "image/png", size: 1024 }) returns { ok: true }, validateUpload({ filename: "run.exe", mimeType: "application/x-msdownload", size: 10 }) returns { ok: false, reason: "Unsupported mime type" }, validateUpload({ filename: "script.php", mimeType: "image/png", size: 10 }) returns { ok: false, reason: "Unsupported extension" }, validateUpload({ filename: "empty.png", mimeType: "image/png", size: 0 }) returns { ok: false, reason: "File is empty" }.',
      'Напишите функцию validateUpload(file), которая проверяет загруженный файл и возвращает объект с ok (boolean) и, если ok равен false, строкой reason. Файл описывается объектом с filename, mimeType и size. Правила: размер должен быть больше нуля и не больше 5 МБ (5 * 1024 * 1024 байт); mimeType должен быть одним из "image/png", "image/jpeg" и "application/pdf"; расширение имени файла должно быть одним из ".png", ".jpg", ".jpeg" и ".pdf", сравнение — в нижнем регистре; проверка расширения и проверка mime type должны обе пройти. Первое нарушенное правило определяет reason, в таком порядке: пустой файл, файл слишком большой, неподдерживаемый mime type, неподдерживаемое расширение. Пример: validateUpload({ filename: "photo.png", mimeType: "image/png", size: 1024 }) возвращает { ok: true }, validateUpload({ filename: "run.exe", mimeType: "application/x-msdownload", size: 10 }) возвращает { ok: false, reason: "Unsupported mime type" }, validateUpload({ filename: "script.php", mimeType: "image/png", size: 10 }) возвращает { ok: false, reason: "Unsupported extension" }, validateUpload({ filename: "empty.png", mimeType: "image/png", size: 0 }) возвращает { ok: false, reason: "File is empty" }.'
    ),
    hint: L(
      'Use path.extname(filename).toLowerCase() for the extension, and remember that both the extension and the declared mime type have to be checked, because each of them can lie on its own.',
      'Используйте path.extname(filename).toLowerCase() для расширения и помните, что проверять нужно и расширение, и заявленный mime type, потому что каждое из них может лгать само по себе.'
    ),
    solution: `import { extname } from 'node:path';

interface UploadMeta {
  filename: string;
  mimeType: string;
  size: number;
}

type ValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'application/pdf']);
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.pdf']);

function validateUpload(file: UploadMeta): ValidationResult {
  if (file.size <= 0) {
    return { ok: false, reason: 'File is empty' };
  }

  if (file.size > MAX_SIZE) {
    return { ok: false, reason: 'File is too large' };
  }

  if (!ALLOWED_MIME_TYPES.has(file.mimeType)) {
    return { ok: false, reason: 'Unsupported mime type' };
  }

  const extension = extname(file.filename).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return { ok: false, reason: 'Unsupported extension' };
  }

  return { ok: true };
}

console.log(validateUpload({ filename: 'photo.png', mimeType: 'image/png', size: 1024 }));
// { ok: true }
console.log(validateUpload({ filename: 'run.exe', mimeType: 'application/x-msdownload', size: 10 }));
// { ok: false, reason: 'Unsupported mime type' }
console.log(validateUpload({ filename: 'script.php', mimeType: 'image/png', size: 10 }));
// { ok: false, reason: 'Unsupported extension' }`,
    explanation: L(
      'The mime type comes from the client, so it can be anything: filtering on it alone is not enough, and a file called invoice.php with the mime type image/png is the classic upload attack. Checking the extension closes that hole, and the strongest version also inspects the first bytes of the file to confirm the real format, which is why a production system stores uploads outside the web root and serves them with the Content-Disposition attachment header. The size limit protects the disk and the request handler from a denial of service. The order of the checks defines the reason that is returned, so the message tells the user what to fix.',
      'Mime type приходит от клиента, поэтому им может быть что угодно: фильтрации только по нему недостаточно, а файл invoice.php с mime type image/png — классическая атака через загрузку. Проверка расширения закрывает эту дыру, а самая надёжная версия дополнительно смотрит первые байты файла, чтобы подтвердить настоящий формат, поэтому в продакшене файлы хранят вне корня сайта и отдают с заголовком Content-Disposition attachment. Ограничение размера защищает диск и обработчик запроса от отказа в обслуживании. Порядок проверок определяет возвращаемую причину, поэтому сообщение подсказывает пользователю, что исправить.'
    ),
  },
];
