import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const httpTasks: PracticeTask[] = [
  {
    id: 'topic-http-1',
    moduleId: 'http',
    topic: 'http',
    level: 'basic',
    title: L('An HTTP client with a timeout', 'HTTP-клиент с таймаутом'),
    brief: L(
      'Write the function getJson(url, options) that requests a URL and parses the answer as JSON. The request must never hang: give it a timeout of 3000 ms by default, overridable with options.timeout, and build the signal with AbortSignal.timeout. When the request times out, throw an Error with the text "Request timed out after 3000 ms: <url>", and when the server answers with a status outside the 2xx range, throw an Error with the text "HTTP 404 Not Found: <url>". The status text must be taken from the response, not written by hand. Finish the file with a small mock server on the node module http and three calls: a successful one, a slow one that must time out, and a missing one that must give the error with the status 404.',
      'Напишите функцию getJson(url, options), которая делает запрос по URL и разбирает ответ как JSON. Запрос не должен висеть: задайте таймаут 3000 мс по умолчанию, его можно переопределить через options.timeout, и соберите сигнал через AbortSignal.timeout. При таймауте бросайте Error с текстом "Request timed out after 3000 ms: <url>", а при ответе сервера со статусом вне диапазона 2xx — Error с текстом "HTTP 404 Not Found: <url>". Текст статуса должен браться из ответа, а не писаться руками. Завершите файл небольшим мок-сервером на модуле http из node и тремя вызовами: успешным, медленным, который обязан упасть по таймауту, и отсутствующим, который обязан дать ошибку со статусом 404.'
    ),
    hint: L(
      'AbortSignal.timeout returns a signal that aborts itself, and the rejection of fetch is a DOMException whose name is TimeoutError. The response object already carries statusText, and the path of the request must be compared with new URL(req.url, base).pathname, because the query string is a part of it.',
      'AbortSignal.timeout возвращает сигнал, который сам прерывается, а отказ fetch — это DOMException с именем TimeoutError. У объекта ответа уже есть statusText, а путь запроса надо сравнивать через new URL(req.url, base).pathname, потому что строка запроса входит в него.'
    ),
    solution: `import { createServer } from 'node:http';

const DEFAULT_TIMEOUT = 3000;

async function getJson(url, options = {}) {
  const timeout = options.timeout ?? DEFAULT_TIMEOUT;
  const signal = AbortSignal.timeout(timeout);

  let response;

  try {
    response = await fetch(url, { ...options, signal });
  } catch (error) {
    if (error.name === 'TimeoutError') {
      throw new Error('Request timed out after ' + timeout + ' ms: ' + url);
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ' ' + response.statusText + ': ' + url);
  }

  return response.json();
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');

  if (pathname === '/slow') {
    setTimeout(() => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    }, 1000);
    return;
  }

  if (pathname === '/api/items') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ items: [{ id: 1 }] }));
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: { code: 'not_found' } }));
});

await new Promise((resolve) => server.listen(0, resolve));

try {
  const { port } = server.address();
  const base = 'http://127.0.0.1:' + port;

  console.log(await getJson(base + '/api/items'));

  try {
    await getJson(base + '/slow', { timeout: 200 });
  } catch (error) {
    console.log(error.message);
  }

  try {
    await getJson(base + '/api/missing');
  } catch (error) {
    console.log(error.message);
  }
} finally {
  server.close();
}`,
    explanation: L(
      'AbortSignal.timeout builds a signal that fires itself after the given number of milliseconds, so the request is cancelled instead of hanging forever, and the socket is released. The important detail is that the timeout is not the same as a slow answer: the signal aborts the request, fetch rejects, and the rejection is a DOMException with the name TimeoutError, which is how the code tells a timeout apart from a network error. The spread of options into the fetch call keeps the other options, and the signal is written after the spread, so the caller cannot accidentally replace the timeout with a broken signal. The status check uses response.ok, which is true exactly for the 2xx statuses, and the message is built from the status and the statusText of the response so that the error tells the truth about what the server answered. The mock server compares the pathname, not the whole url, because the query string is a part of the request target.',
      'AbortSignal.timeout собирает сигнал, который срабатывает через указанное число миллисекунд, поэтому запрос отменяется, а не висит вечно, и сокет освобождается. Важная деталь: таймаут это не то же самое, что медленный ответ, сигнал прерывает запрос, fetch отклоняется, и отказом является DOMException с именем TimeoutError, и по нему код отличает таймаут от сетевой ошибки. Раскрытие options в вызов fetch сохраняет остальные опции, а signal записан после раскрытия, так что вызывающий код не сможет случайно подменить таймаут сломанным сигналом. Проверка статуса опирается на response.ok, который истинен ровно для статусов 2xx, а сообщение собирается из статуса и statusText ответа, чтобы в ошибке была правда о том, что ответил сервер. Мок-сервер сравнивает pathname, а не весь url, потому что строка запроса входит в цель запроса.'
    ),
  },
  {
    id: 'topic-http-2',
    moduleId: 'http',
    topic: 'http',
    level: 'basic',
    title: L('Retry with an exponential backoff', 'Повторы с экспоненциальной задержкой'),
    brief: L(
      'Write the function fetchWithRetry(url, options) that repeats a failed request. It must make at most retries + 1 attempts, where retries is 3 by default and can be overridden with options.retries. Only two kinds of failure are worth repeating: a network error and a response with the status 429 or a status from 500 to 599; a 404 must be returned to the caller right away. Between the attempts wait baseDelay * 2 ** attempt milliseconds, where baseDelay is 100 by default, so the pauses are 100, 200 and 400 ms. When every attempt has failed, throw the last error. Finish the file with a mock server that answers with the status 500 twice and with the status 200 on the third request, and print the number of the requests the server has seen.',
      'Напишите функцию fetchWithRetry(url, options), которая повторяет неудавшийся запрос. Она должна сделать не больше retries + 1 попыток, где retries по умолчанию 3 и переопределяется через options.retries. Повторять стоит только два вида сбоев: сетевую ошибку и ответ со статусом 429 или со статусом от 500 до 599; 404 должен сразу уйти вызывающему коду. Между попытками жмите baseDelay * 2 ** attempt миллисекунд, где baseDelay по умолчанию 100, то есть паузы 100, 200 и 400 мс. Когда все попытки исчерпаны, бросьте последнюю ошибку. Завершите файл мок-сервером, который дважды отвечает статусом 500, а на третий запрос статусом 200, и напечатайте число запросов, которое видел сервер.'
    ),
    hint: L(
      'The delay grows with the number of the attempt, so the server has more time to recover, and the number of the attempt is the index of the loop. Throw a status error yourself, so the same catch block can handle both kinds of failure.',
      'Задержка растёт с номером попытки, чтобы у сервера было больше времени на восстановление, а номер попытки — это индекс цикла. Ошибку статуса бросайте сами, тогда один и тот же catch обработает оба вида сбоев.'
    ),
    solution: `import { createServer } from 'node:http';

async function fetchWithRetry(url, options = {}) {
  const retries = options.retries ?? 3;
  const baseDelay = options.baseDelay ?? 100;

  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429 || response.status >= 500) {
        throw new Error('Retryable status ' + response.status);
      }

      return response;
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      const delay = baseDelay * 2 ** attempt;
      console.log('attempt ' + (attempt + 1) + ' failed, retrying in ' + delay + ' ms');
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

let requests = 0;

const server = createServer((req, res) => {
  requests += 1;

  if (requests < 3) {
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'internal_error' } }));
    return;
  }

  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: true }));
});

await new Promise((resolve) => server.listen(0, resolve));

try {
  const { port } = server.address();
  const response = await fetchWithRetry('http://127.0.0.1:' + port + '/api/items', { baseDelay: 10 });

  console.log('status', response.status);
  console.log('requests seen by the server', requests);
} finally {
  server.close();
}`,
    explanation: L(
      'The loop runs one attempt more than the number of retries, because three retries mean four tries in total, and the guard attempt === retries breaks out of the loop on the last allowed attempt so that the code does not wait once more for nothing. The delay is baseDelay * 2 ** attempt, so the pauses grow 100, 200 and 400 milliseconds: a server that is overloaded gets more time as the number of attempts grows, and the clients do not all come back at the same second. The status check is what makes the retry safe: only 429 and the 5xx statuses are temporary, and a 404 is thrown back to the caller immediately, because repeating it would only waste time. The thrown error inside the try block is caught by the same catch as a network error, so one code path handles both.',
      'Цикл выполняет на одну попытку больше, чем число повторов, потому что три повтора это четыре попытки, и проверка attempt === retries выходит из цикла на последней разрешённой попытке, чтобы не ждать впустую ещё раз. Задержка равна baseDelay * 2 ** attempt, поэтому паузы растут 100, 200 и 400 миллисекунд: перегруженному серверу нужно всё больше времени, и клиенты не возвращаются одновременно на второй секунде. Проверка статуса делает повтор безопасным: только 429 и статусы 5xx временные, а 404 сразу уходит вызывающему коду, потому что повторять его только потеря времени. Ошибка, брошенная внутри try, ловится тем же catch, что и сетевая, так что один путь кода обрабатывает оба случая.'
    ),
  },
  {
    id: 'topic-http-3',
    moduleId: 'http',
    topic: 'http',
    level: 'basic',
    title: L('Map a status code to a decision', 'Преобразовать код статуса в решение'),
    brief: L(
      'Write the function describeStatus(status) that turns a status code into a decision object. The object must contain: the status itself, the boolean ok, which is true for the 2xx statuses, the category, which is info for 1xx, success for 2xx, redirect for 3xx, client_error for 4xx and server_error for 5xx, the booleans clientError for 4xx and serverError for 5xx, and the boolean retryable, which is true for 408, 429 and every 5xx status. An unknown code, for example 0 or 700, must get the category unknown and must not throw.',
      'Напишите функцию describeStatus(status), которая превращает код статуса в объект решения. Объект должен содержать: сам статус, булево ok, истину для статусов 2xx, категорию category: info для 1xx, success для 2xx, redirect для 3xx, client_error для 4xx и server_error для 5xx, булевы clientError для 4xx и serverError для 5xx, и булево retryable, истинное для 408, 429 и любого 5xx. Неизвестный код, например 0 или 700, должен получить категорию unknown и не должен бросать исключение.'
    ),
    hint: L(
      'The first digit of the status is the category, so Math.floor(status / 100) gives the number of the category, and the first digit of that number gives the category itself.',
      'Первая цифра статуса — это категория, поэтому Math.floor(status / 100) даёт номер категории, а первая цифра этого числа — саму категорию.'
    ),
    solution: `const CATEGORIES = {
  1: 'info',
  2: 'success',
  3: 'redirect',
  4: 'client_error',
  5: 'server_error',
};

function describeStatus(status) {
  const family = Math.floor(status / 100);
  const category = CATEGORIES[family] ?? 'unknown';

  return {
    status,
    ok: family === 2,
    category,
    clientError: family === 4,
    serverError: family === 5,
    retryable: status === 408 || status === 429 || family === 5,
  };
}

console.log(describeStatus(200));
console.log(describeStatus(404));
console.log(describeStatus(503));
console.log(describeStatus(429));
console.log(describeStatus(700));`,
    explanation: L(
      'The first digit of a status code is its family, and the family decides almost everything: 2xx is a success, 4xx means the client has to change something, 5xx means the server failed. Working with the family instead of with a list of individual codes keeps the function short and impossible to forget an entry. The category comes from a map, and the nullish coalescing operator turns an unknown family into the string unknown, so a nonsense status never throws in the middle of an error handler, which is the worst place for an exception. The retryable flag combines the two special codes that are temporary despite being 4xx, 408 Request Timeout and 429 Too Many Requests, with the whole 5xx family, because a server that failed once usually fails again right away and is worth a second try later.',
      'Первая цифра кода статуса — это его семейство, и семейство решает почти всё: 2xx это успех, 4xx значит, что должен изменить клиент, 5xx значит, что сервер не справился. Работа с семейством вместо списка отдельных кодов делает функцию короткой и почти невозможно испортить забытым случаем. Категория берётся из карты, а оператор ?? превращает неизвестное семейство в строку unknown, поэтому бессмысленный статус никогда не бросит исключение посреди обработчика ошибок, что худшее место для исключения. Флаг retryable объединяет два особых кода, которые временные, хотя и 4xx, это 408 Request Timeout и 429 Too Many Requests, со всем семейством 5xx, потому что сервер, упавший один раз, обычно падает и сразу после этого и стоит повторить позже.'
    ),
  },
  {
    id: 'topic-http-4',
    moduleId: 'http',
    topic: 'http',
    level: 'intermediate',
    title: L('Walk through the pages with a cursor', 'Пройти по страницам с курсором'),
    brief: L(
      'The list endpoint answers with the shape { items: [...], nextCursor: "..." } and nextCursor is null on the last page. Write the function fetchAllPages(url, options) that collects the items of all the pages into one array. Every request must carry the page size in the query parameter limit and the cursor in the query parameter cursor, but the cursor must be omitted on the first request. The loop stops when nextCursor is null, an empty string is also treated as the end, and a response with a status outside the 2xx range must throw an Error with the text "HTTP 500: <url>". The function must return the collected items in the order of the pages. Finish the file with a mock server that answers with two pages: the first with the cursor "c1" and the second with the cursor null.',
      'Эндпоинт списка отвечает формой { items: [...], nextCursor: "..." }, а nextCursor равен null на последней странице. Напишите функцию fetchAllPages(url, options), которая собирает элементы всех страниц в один массив. Каждый запрос должен передавать размер страницы в параметре limit и курсор в параметре cursor, но курсор не передаётся в первом запросе. Цикл останавливается, когда nextCursor равен null, пустая строка тоже считается концом, а ответ со статусом вне 2xx должен бросать Error с текстом "HTTP 500: <url>". Функция должна вернуть собранные элементы в порядке страниц. Завершите файл мок-сервером, который отвечает двумя страницами: первая с курсором "c1", вторая с курсором null.'
    ),
    hint: L(
      'Build the URL with the object of URLSearchParams, add the cursor only when it is not empty, and use a do while loop so that the first page is always requested.',
      'Соберите URL через объект URLSearchParams, добавляйте курсор только когда он не пустой, и используйте цикл do while, чтобы первая страница запрашивалась всегда.'
    ),
    solution: `import { createServer } from 'node:http';

async function fetchAllPages(url, options = {}) {
  const limit = options.limit ?? 50;
  const signal = options.signal;

  const items = [];
  let cursor = null;

  do {
    const target = new URL(url);
    target.searchParams.set('limit', String(limit));

    if (cursor) {
      target.searchParams.set('cursor', cursor);
    }

    const response = await fetch(target, { signal });

    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + target.toString());
    }

    const page = await response.json();
    items.push(...page.items);
    cursor = page.nextCursor ?? null;
  } while (cursor);

  return items;
}

const server = createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost');

  if (pathname !== '/api/items') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'not_found' } }));
    return;
  }

  const cursor = searchParams.get('cursor');

  if (cursor === null) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ items: [{ id: 1 }, { id: 2 }], nextCursor: 'c1' }));
    return;
  }

  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ items: [{ id: 3 }], nextCursor: null }));
});

await new Promise((resolve) => server.listen(0, resolve));

try {
  const { port } = server.address();
  const items = await fetchAllPages('http://127.0.0.1:' + port + '/api/items', { limit: 2 });

  console.log(items);
} finally {
  server.close();
}`,
    explanation: L(
      'The URL object with searchParams is the safe way to build a query string: the values are escaped for you, so a cursor that contains an ampersand or a space cannot break the request. The cursor is added only when it is truthy, so the first request stays clean, and the do while loop guarantees that the first page is always fetched even when the loop condition is checked after the body. The termination check uses the value of the cursor directly, and the nullish coalescing operator turns a missing nextCursor into null, while an empty string is falsy and ends the loop as well. The items are pushed with the spread operator, which keeps the order of the pages, and the result is one flat array instead of an array of pages.',
      'Объект URL с searchParams — безопасный способ собрать строку запроса: значения экранируются сами, поэтому курсор, в котором есть амперсанд или пробел, не сломает запрос. Курсор добавляется только когда он истинен, поэтому первый запрос остаётся чистым, а цикл do while гарантирует, что первая страница запрашивается всегда, даже когда условие цикла проверяется после тела. Проверка окончания смотрит на значение курсора напрямую, а оператор ?? превращает отсутствующий nextCursor в null, при этом пустая строка ложна и тоже заканчивает цикл. Элементы добавляются оператором расширения, который сохраняет порядок страниц, и в результате получается один плоский массив, а не массив страниц.'
    ),
  },
  {
    id: 'topic-http-5',
    moduleId: 'http',
    topic: 'http',
    level: 'intermediate',
    title: L('Read the cache headers of a response', 'Прочитать заголовки кэша ответа'),
    brief: L(
      'Write three functions for the cache headers. The function parseCacheControl(value) must split the header into the directives and return an object: a directive without a value such as no-store becomes true, a directive with a value such as max-age=60 becomes the number 60, and an empty or missing header returns an empty object. The function cacheLifetime(headers, options) must return the lifetime in seconds: the s-maxage value when the option shared is true and the header has it, otherwise the max-age value, and 0 when there is no value or when no-store is present. The function isFresh(headers, options) must return true only when the lifetime is positive and the entry is not yet expired, taking the Age header and the Date header into account.',
      'Напишите три функции для заголовков кэша. Функция parseCacheControl(value) должна разбить заголовок на директивы и вернуть объект: директива без значения вроде no-store становится true, директива со значением вроде max-age=60 становится числом 60, а пустой или отсутствующий заголовок даёт пустой объект. Функция cacheLifetime(headers, options) должна вернуть время жизни в секундах: значение s-maxage, когда опция shared равна true и такой заголовок есть, иначе значение max-age, и 0, когда значения нет или присутствует no-store. Функция isFresh(headers, options) должна возвращать true только когда время жизни положительное и запись ещё не истекла, учитывая заголовки Age и Date.'
    ),
    hint: L(
      'Split the header by the comma, then every part by the equals sign. The Age header says how many seconds the entry has already been stored, and the Date header says when it was stored, so the moment of the expiry is date + lifetime.',
      'Разбейте заголовок по запятой, а каждую часть — по знаку равенства. Заголовок Age говорит, сколько секунд запись уже лежит, а Date — когда её положили, значит момент истечения это date плюс время жизни.'
    ),
    solution: `function parseCacheControl(value) {
  const directives = {};

  if (!value) {
    return directives;
  }

  for (const part of value.split(',')) {
    const [rawKey, rawValue] = part.split('=');
    const key = rawKey.trim().toLowerCase();

    if (!key) {
      continue;
    }

    if (rawValue === undefined) {
      directives[key] = true;
      continue;
    }

    const cleaned = rawValue.trim().replace(/^"|"$/g, '');
    const asNumber = Number(cleaned);
    directives[key] = cleaned !== '' && Number.isFinite(asNumber) ? asNumber : cleaned;
  }

  return directives;
}

function cacheLifetime(headers, options = {}) {
  const directives = parseCacheControl(headers.get('cache-control'));

  if (directives['no-store'] === true) {
    return 0;
  }

  const key = options.shared === true && 's-maxage' in directives ? 's-maxage' : 'max-age';
  const value = directives[key];

  return typeof value === 'number' ? value : 0;
}

function isFresh(headers, options = {}) {
  const lifetime = cacheLifetime(headers, options);

  if (lifetime <= 0) {
    return false;
  }

  const age = Number(headers.get('age') ?? 0);
  const dateHeader = headers.get('date');
  const storedAt = dateHeader ? Date.parse(dateHeader) : Date.now();
  const expiresAt = storedAt + lifetime * 1000;
  const now = options.now ?? Date.now();

  return now - age * 1000 < expiresAt;
}

const headers = new Headers({
  'cache-control': 'public, max-age=60, s-maxage=300',
  date: new Date().toUTCString(),
});

console.log(parseCacheControl('public, max-age=60, no-store'));
console.log(cacheLifetime(headers));
console.log(cacheLifetime(headers, { shared: true }));
console.log(isFresh(headers));`,
    explanation: L(
      'The Cache-Control header is a list of directives separated by commas, and every directive is either a flag or a key with a value, so the parser splits twice: first by the comma, then by the equals sign. A directive without a value becomes the boolean true, and a numeric value is converted to a number, so the rest of the code can compare it with a number instead of parsing a string again. The lifetime of an entry is not always max-age: a shared cache such as a CDN is allowed to keep the answer longer, and that longer time is s-maxage, so the shared option decides which directive wins. Freshness needs the age of the entry as well: the Age header says how long it has already been stored, and the Date header says when it was stored, so the entry expires at date plus the lifetime, and the age is subtracted from the current time.',
      'Заголовок Cache-Control это список директив через запятую, и каждая директива — либо флаг, либо ключ со значением, поэтому парсер делит дважды: сначала по запятой, потом по знаку равенства. Директива без значения становится логическим true, а числовое значение приводится к числу, чтобы дальше его можно было сравнивать с числом, а не разбирать строку заново. Время жизни записи это не всегда max-age: общий кэш вроде CDN может хранить ответ дольше, и это большее время и есть s-maxage, поэтому опция shared решает, какая директива победит. Для свежести нужен ещё и возраст записи: заголовок Age говорит, сколько она уже лежит, а Date — когда её положили, значит запись истекает в дату плюс время жизни, а возраст вычитается из текущего времени.'
    ),
  },
  {
    id: 'topic-http-6',
    moduleId: 'http',
    topic: 'http',
    level: 'advanced',
    title: L('Build one format for every error', 'Собрать единый формат для всех ошибок'),
    brief: L(
      'The API must always answer with the same body when something goes wrong. Write the class ApiError extends Error with the constructor options status, code, message, details and requestId, where status is 500 by default, code is internal_error, message is Unexpected error, details is null and requestId is null. The class must expose status and code as public properties, details and requestId through getters, and the method toJSON that returns the object { error: { code, message, details, requestId } }. Then write the function toErrorResponse(error, requestId) that returns the pair { status, body }: for an ApiError it uses its own status and body, and for any other error it returns the status 500 and a body with the code internal_error, the message Unexpected error, the details null and the given requestId, so that the internals of the server never leak to the client.',
      'API должен всегда отвечать одним и тем же телом, когда что-то идёт не так. Напишите класс ApiError extends Error с опциями конструктора status, code, message, details и requestId, где status по умолчанию 500, code — internal_error, message — Unexpected error, details — null и requestId — null. Класс должен отдавать status и code как публичные свойства, details и requestId через геттеры, и метод toJSON, который возвращает объект { error: { code, message, details, requestId } }. Затем напишите функцию toErrorResponse(error, requestId), которая возвращает пару { status, body }: для ApiError берёт его status и его тело, а для любой другой ошибки возвращает status 500 и тело с кодом internal_error, сообщением Unexpected error, details null и переданным requestId, чтобы внутренности сервера не утекали к клиенту.'
    ),
    hint: L(
      'A fixed envelope makes the client code simple: it always reads body.error.code. The generic branch must not mention the original error, otherwise the stack trace of the server leaks into the answer.',
      'Фиксированная обёртка упрощает код клиента: он всегда читает body.error.code. В общей ветке нельзя упоминать исходную ошибку, иначе стектрейс сервера утечёт в ответ.'
    ),
    solution: `class ApiError extends Error {
  #details;
  #requestId;

  constructor(options = {}) {
    super(options.message ?? 'Unexpected error');
    this.name = 'ApiError';
    this.status = options.status ?? 500;
    this.code = options.code ?? 'internal_error';
    this.#details = options.details ?? null;
    this.#requestId = options.requestId ?? null;
  }

  get details() {
    return this.#details;
  }

  get requestId() {
    return this.#requestId;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
        requestId: this.requestId,
      },
    };
  }
}

function toErrorResponse(error, requestId = null) {
  if (error instanceof ApiError) {
    return { status: error.status, body: error.toJSON() };
  }

  return {
    status: 500,
    body: {
      error: {
        code: 'internal_error',
        message: 'Unexpected error',
        details: null,
        requestId,
      },
    },
  };
}

const notFound = new ApiError({ status: 404, code: 'not_found', message: 'Item not found' });
console.log(toErrorResponse(notFound, 'req-1'));
console.log(toErrorResponse(new Error('secret internal detail'), 'req-2'));`,
    explanation: L(
      'One envelope for every error is what makes a client simple: the client always reads body.error.code, no matter what went wrong, and the code can be shown to a person while the details stay in the logs. The class stores the payload in private fields and exposes them through getters, so the object cannot be changed after it is thrown, and toJSON builds the body in one place, so the format cannot drift between the different places that create errors. The generic branch of toErrorResponse deliberately says nothing about the original error: a stack trace or a message with a connection string would tell an attacker a lot, and the request id is enough to find the real error in the logs of the server.',
      'Единая обёртка для всех ошибок делает клиент простым: клиент всегда читает body.error.code, что бы ни случилось, и код можно показать человеку, а подробности остаются в логах. Класс хранит полезную нагрузку в приватных полях и отдаёт их через геттеры, поэтому объект нельзя изменить после броска, а toJSON собирает тело в одном месте, и формат не может разъехаться между разными местами, где создаются ошибки. Общая ветка toErrorResponse нарочно ничего не говорит про исходную ошибку: стектрейс или сообщение с строкой подключения рассказал бы атакующему много лишнего, а идентификатора запроса достаточно, чтобы найти настоящую ошибку в логах сервера.'
    ),
  },
  {
    id: 'topic-http-7',
    moduleId: 'http',
    topic: 'http',
    level: 'advanced',
    title: L('A client that combines a timeout and an external abort', 'Клиент, объединяющий таймаут и внешнюю отмену'),
    brief: L(
      'Write the factory createClient(options) that returns a request function. The options are baseUrl, which is prepended to every path, and timeout, which is 5000 ms by default. The request function takes the path and the options method, body, headers and signal. The timeout signal comes from AbortSignal.timeout, the signal of the caller is optional, and both must be combined into one signal with AbortSignal.any, so that the request stops both when the time is up and when the caller aborts. A body must be sent as JSON with the header content-type application/json, and a body that is already a string must be sent as it is. The returned value is the parsed JSON of the answer, and a response with a status outside the 2xx range must throw an ApiError with the status and the code from the body of the answer. Finish the file with a mock server and three calls: a GET, a POST with a JSON body, and a call that is aborted by the caller through a controller.',
      'Напишите фабрику createClient(options), которая возвращает функцию запроса. Опции — это baseUrl, который приклеивается к каждому пути, и timeout, 5000 мс по умолчанию. Функция запроса принимает путь и опции method, body, headers и signal. Сигнал таймаута берётся из AbortSignal.timeout, сигнал вызывающего кода необязателен, и оба надо объединить в один сигнал через AbortSignal.any, чтобы запрос останавливался и по времени, и по отмене вызывающего. Тело надо отправлять как JSON с заголовком content-type application/json, а тело, которое уже строка, отправлять как есть. Возвращается разобранный JSON ответа, а ответ со статусом вне 2xx должен бросать ApiError со статусом и кодом из тела ответа. Завершите файл мок-сервером и тремя вызовами: GET, POST с JSON-телом и вызов, который отменяет вызывающий через контроллер.'
    ),
    hint: L(
      'AbortSignal.any takes an array of signals and gives a signal that fires as soon as any of them fires. Build the headers with a new Headers object, so the defaults and the custom ones are merged instead of overwritten.',
      'AbortSignal.any принимает массив сигналов и даёт сигнал, который срабатывает, как только сработает любой из них. Собирайте заголовки через new Headers, чтобы значения по умолчанию и пользовательские объединились, а не перезаписали друг друга.'
    ),
    solution: `import { createServer } from 'node:http';

class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

function createClient(options = {}) {
  const baseUrl = options.baseUrl ?? '';
  const timeout = options.timeout ?? 5000;

  return async function request(path, requestOptions = {}) {
    const { method = 'GET', body, headers = {}, signal } = requestOptions;

    const timeoutSignal = AbortSignal.timeout(timeout);
    const combined = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

    const requestHeaders = new Headers(headers);
    let payload;

    if (body !== undefined) {
      if (typeof body === 'string') {
        payload = body;
      } else {
        payload = JSON.stringify(body);
        if (!requestHeaders.has('content-type')) {
          requestHeaders.set('content-type', 'application/json');
        }
      }
    }

    const response = await fetch(baseUrl + path, {
      method,
      headers: requestHeaders,
      body: payload,
      signal: combined,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const code = data && data.error ? data.error.code : 'http_error';
      const message = data && data.error ? data.error.message : response.statusText;
      throw new ApiError(response.status, code, message);
    }

    return data;
  };
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');

  if (pathname === '/api/items' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ items: [{ id: 1 }] }));
    return;
  }

  if (pathname === '/api/items' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ created: JSON.parse(body) }));
    });
    return;
  }

  if (pathname === '/api/slow') {
    setTimeout(() => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    }, 1000);
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: { code: 'not_found', message: 'Not found' } }));
});

await new Promise((resolve) => server.listen(0, resolve));

try {
  const { port } = server.address();
  const client = createClient({ baseUrl: 'http://127.0.0.1:' + port + '/api', timeout: 2000 });

  console.log(await client('/items'));
  console.log(await client('/items', { method: 'POST', body: { name: 'Ann' } }));

  const controller = new AbortController();
  const pending = client('/slow', { signal: controller.signal });
  controller.abort();

  try {
    await pending;
  } catch (error) {
    console.log(error.name);
  }
} finally {
  server.close();
}`,
    explanation: L(
      'AbortSignal.any is the key detail: it takes several signals and produces one signal that fires as soon as any of them fires, so the timeout and the cancellation of the caller become a single value that is passed to fetch. Without it you would have to write a controller and clean it up by hand, and a forgotten cleanup is a leak. The headers are built with a new Headers object, so the defaults and the custom headers are merged, and the content type is only set when the body is really JSON, because a string body may already be a prepared form or a raw payload. The answer is read as text first and only then parsed, so an empty body does not break the parsing, and the error branch reuses the code and the message of the error envelope of the server.',
      'Ключевая деталь — AbortSignal.any: он принимает несколько сигналов и выдаёт один, который срабатывает, как только сработает любой из них, поэтому таймаут и отмена вызывающего кода становятся одним значением, которое передаётся в fetch. Без него пришлось бы писать контроллер вручную и не забыть его убрать, а забытая уборка это утечка. Заголовки собираются через new Headers, поэтому значения по умолчанию и пользовательские объединяются, а content type ставится только когда тело действительно JSON, потому что строковое тело может быть уже готовой формой или сырой полезной нагрузкой. Ответ читается сначала как текст и только потом разбирается, так что пустое тело не ломает разбор, а ветка ошибки переиспользует код и сообщение из обёртки ошибок сервера.'
    ),
  },
  {
    id: 'topic-http-8',
    moduleId: 'http',
    topic: 'http',
    level: 'advanced',
    title: L('A contract test against a mock server', 'Контрактный тест на мок-сервере'),
    brief: L(
      'Write a contract test with the node module http. Start a server on a random port with createServer and listen on the port 0, and read the real port from server.address(). The server must answer the request GET /api/items with the status 200, the header content-type application/json and the body { items: [{ id: 1 }], nextCursor: null }, and the request GET /api/missing with the status 404 and the body { error: { code: "not_found" } }. The path must be compared with new URL(req.url, base).pathname, because the query string is a part of the request target. The test must use the fetchAllPages function from the pagination task to check that the items arrive, and it must check that a 404 produces an Error whose text contains the status 404. Finish with server.close() in a finally block, so that the test does not hang the process.',
      'Напишите контрактный тест на модуле node http. Поднимите сервер на случайном порту через createServer и listen на порту 0, а настоящий порт возьмите из server.address(). Сервер должен отвечать на запрос GET /api/items статусом 200, заголовком content-type application/json и телом { items: [{ id: 1 }], nextCursor: null }, а на запрос GET /api/missing статусом 404 и телом { error: { code: "not_found" } }. Путь надо сравнивать через new URL(req.url, base).pathname, потому что строка запроса входит в цель запроса. Тест должен использовать функцию fetchAllPages из задачи про пагинацию, чтобы проверить, что элементы пришли, и должен проверить, что 404 даёт Error, в тексте которого есть 404. Завершите через server.close() в блоке finally, чтобы тест не держал процесс.'
    ),
    hint: L(
      'listen on the port 0 lets the operating system pick a free port, and the callback of listen receives the server, so the port is known only after the promise is resolved. The finally block must close the server even when an assertion fails.',
      'Прослушивание на порту 0 позволяет операционной системе выбрать свободный порт, а в колбэк listen приходит сервер, поэтому порт известен только после разрешения промиса. Блок finally обязан закрыть сервер, даже если проверка упала.'
    ),
    solution: `import { createServer } from 'node:http';
import assert from 'node:assert/strict';

async function fetchAllPages(url, options = {}) {
  const limit = options.limit ?? 50;
  const items = [];
  let cursor = null;

  do {
    const target = new URL(url);
    target.searchParams.set('limit', String(limit));

    if (cursor) {
      target.searchParams.set('cursor', cursor);
    }

    const response = await fetch(target, { signal: options.signal });

    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + target.toString());
    }

    const page = await response.json();
    items.push(...page.items);
    cursor = page.nextCursor ?? null;
  } while (cursor);

  return items;
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');

  if (pathname === '/api/items') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ items: [{ id: 1 }], nextCursor: null }));
    return;
  }

  if (pathname === '/api/missing') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'not_found' } }));
    return;
  }

  res.writeHead(500, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: { code: 'internal_error' } }));
});

await new Promise((resolve) => server.listen(0, resolve));

try {
  const { port } = server.address();
  const base = 'http://127.0.0.1:' + port;

  const items = await fetchAllPages(base + '/api/items');
  assert.deepEqual(items, [{ id: 1 }]);

  await assert.rejects(
    () => fetchAllPages(base + '/api/missing'),
    (error) => error.message.includes('404')
  );

  console.log('contract test passed');
} finally {
  server.close();
}`,
    explanation: L(
      'A contract test pins the shape of the answer, not the implementation, so it stays green when the internals change and turns red exactly when the promise of the API is broken. The port 0 is the important trick: the operating system picks a free port, so the test never collides with a real service and can run many times in parallel. The real port is only known after the promise of listen is resolved, and reading it from server.address() is the only way to get it. The assertions use the strict version of assert, so deepEqual compares the structure and not the identity, and assert.rejects with a check function verifies that the error is exactly the one the contract promises, including the status in the text. The finally block closes the server even when an assertion fails, and without it the node process would never exit.',
      'Контрактный тест фиксирует форму ответа, а не реализацию, поэтому остаётся зелёным, когда внутренности меняются, и краснеет ровно тогда, когда обещание API нарушено. Порт 0 — важный трюк: операционная система выбирает свободный порт, поэтому тест не конфликтует с настоящим сервисом и может выполняться много раз параллельно. Настоящий порт известен только после разрешения промиса listen, и взять его можно только из server.address(). Проверки используют строгую версию assert, поэтому deepEqual сравнивает структуру, а не идентичность, а assert.rejects с проверочной функцией убеждается, что ошибка именно та, которую обещает контракт, включая статус в тексте. Блок finally закрывает сервер даже тогда, когда проверка упала, а без него процесс node никогда не завершился бы.'
    ),
  },
];
