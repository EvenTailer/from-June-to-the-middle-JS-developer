import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreTasks: PracticeTask[] = [
  {
    id: 'js-task-4',
    topic: 'functions',
    level: 'basic',
    title: L('Implement throttle', 'Реализовать throttle'),
    brief: L(
      'Write throttle(fn, wait) that runs fn at most once per wait interval, fires immediately on the leading edge and still delivers the last call on the trailing edge.',
      'Напишите throttle(fn, wait), который вызывает fn не чаще раза за интервал wait, срабатывает сразу на ведущем крае и всё равно доставляет последний вызов на замыкающем.'
    ),
    hint: L(
      'Store the last run time, the pending timer and the latest arguments. A call inside the window schedules one trailing run.',
      'Храните время последнего запуска, активный таймер и последние аргументы. Вызов внутри окна планирует один запуск в конце.'
    ),
    solution: `function throttle(fn, wait = 200) {
  let last = 0;
  let timer;
  let lastArgs;
  let lastThis;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      clearTimeout(timer);
      timer = undefined;
      last = now;
      fn.apply(lastThis, lastArgs);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = undefined;
        fn.apply(lastThis, lastArgs);
      }, remaining);
    }
  };
}

const onScroll = throttle(() => {
  console.log(window.scrollY);
}, 100);

window.addEventListener('scroll', onScroll);`,
    explanation: L(
      'The leading call runs at once, and every call inside the window only replaces the pending arguments. That guarantees at most one run per interval while the final position is still rendered. Throttle is right for scroll and resize; debounce is right when only the settled value matters.',
      'Ведущий вызов выполняется сразу, а вызовы внутри окна только заменяют отложенные аргументы. Это гарантирует не более одного запуска за интервал, но финальная позиция всё равно отрисовывается. Throttle подходит для scroll и resize; debounce — когда важно только итоговое значение.'
    ),
  },
  {
    id: 'js-task-5',
    topic: 'objects',
    level: 'basic',
    title: L('Deep clone with structuredClone', 'Глубокое клонирование через structuredClone'),
    brief: L(
      'Clone a nested state object that contains a Date and a Map. Prove the copy is independent, then list what structuredClone cannot copy and how class instances behave.',
      'Склонируйте вложенный объект состояния с Date и Map. Докажите независимость копии, затем перечислите, что structuredClone не умеет копировать и как ведут себя экземпляры классов.'
    ),
    hint: L(
      'structuredClone handles cycles, Date, Map, Set and typed arrays, but not functions or DOM nodes. It does not restore prototypes.',
      'structuredClone поддерживает циклы, Date, Map, Set и типизированные массивы, но не функции и DOM-узлы. Он не восстанавливает прототипы.'
    ),
    solution: `const state = {
  user: { name: 'Ann' },
  tags: ['admin', 'editor'],
  createdAt: new Date('2026-10-19T10:00:00Z'),
  prefs: new Map([['theme', 'dark']]),
};

const copy = structuredClone(state);
copy.user.name = 'Bob';
copy.prefs.set('theme', 'light');

console.log(state.user.name);        // 'Ann'
console.log(state.prefs.get('theme')); // 'dark'

// Not cloneable: functions, DOM nodes, WeakMap, symbols as values
const withMethod = { save: () => {} };
structuredClone(withMethod); // DataCloneError

// Class instances lose their prototype
class User {
  constructor(name) { this.name = name; }
  greet() { return 'Hi ' + this.name; }
}

const user = structuredClone(new User('Ann'));
typeof user.greet; // 'undefined'`,
    explanation: L(
      'structuredClone copies the graph, so nested objects no longer share references and cycles are preserved. Unlike JSON round-tripping it keeps Date, Map and Set, but it still cannot copy executable code. For class instances, copy the data and construct a new instance explicitly.',
      'structuredClone копирует граф целиком, поэтому вложенные объекты больше не делят ссылки, а циклы сохраняются. В отличие от JSON-сериализации он сохраняет Date, Map и Set, но по-прежнему не копирует исполняемый код. Для экземпляров классов скопируйте данные и создайте новый экземпляр явно.'
    ),
  },
  {
    id: 'js-task-6',
    topic: 'async',
    level: 'basic',
    title: L('Partial success with Promise.allSettled', 'Частичный успех через Promise.allSettled'),
    brief: L(
      'Load several users in parallel and return both the loaded users and the ids that failed. One broken request must not discard the other results.',
      'Загрузите нескольких пользователей параллельно и верните как загруженных пользователей, так и id с ошибками. Один сломанный запрос не должен отбрасывать остальные результаты.'
    ),
    hint: L(
      'allSettled always resolves with status fulfilled or rejected. Map the index back to the original id.',
      'allSettled всегда завершается успешно со статусом fulfilled или rejected. Сопоставьте индекс с исходным id.'
    ),
    solution: `async function loadUsers(ids) {
  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const response = await fetch('/api/users/' + id);
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
  );

  const users = [];
  const failed = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      users.push(result.value);
    } else {
      failed.push({ id: ids[index], reason: result.reason.message });
    }
  });

  return { users, failed };
}

const { users, failed } = await loadUsers(['u1', 'u2', 'u3']);`,
    explanation: L(
      'Promise.all rejects on the first failure and hides the successful values. allSettled waits for every promise and reports each outcome, which suits dashboards and bulk imports. Use Promise.any when the first success is enough.',
      'Promise.all отклоняется при первой ошибке и скрывает успешные значения. allSettled ждёт все промисы и сообщает результат каждого, что подходит для дашбордов и массового импорта. Promise.any нужен, когда достаточно первого успеха.'
    ),
  },
  {
    id: 'js-task-7',
    topic: 'dom',
    level: 'intermediate',
    title: L('Delete rows with event delegation', 'Удалять строки через делегирование событий'),
    brief: L(
      'A todo list is re-rendered with new items. Attach one click listener to the list that deletes the row whose delete button was clicked, including buttons inside nested elements.',
      'Список задач перерисовывается с новыми элементами. Добавьте один обработчик click на список, который удаляет строку по нажатой кнопке удаления, включая кнопки внутри вложенных элементов.'
    ),
    hint: L(
      'Read event.target, walk up with closest to the button, then to the list item. Ignore clicks outside a delete button.',
      'Прочитайте event.target, поднимитесь через closest до кнопки, затем до элемента списка. Игнорируйте клики вне кнопки удаления.'
    ),
    solution: `const list = document.querySelector('#todo-list');

list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button || !list.contains(button)) return;

  const item = button.closest('li[data-id]');
  if (!item) return;

  item.remove();
  console.log('deleted', item.dataset.id);
});

// Markup
// <ul id="todo-list">
//   <li data-id="t1">
//     <span>Buy milk</span>
//     <button data-action="delete"><svg>...</svg></button>
//   </li>
// </ul>`,
    explanation: L(
      'One listener on the container handles current and future rows, so re-rendering does not require rebinding. closest also matches clicks on the icon inside the button. Checking list.contains keeps the handler from reacting to detached or outside nodes.',
      'Один обработчик на контейнере обслуживает текущие и будущие строки, поэтому при перерисовке не нужно перепривязывать события. closest также ловит клики по иконке внутри кнопки. Проверка list.contains не даёт обработчику реагировать на отсоединённые или внешние узлы.'
    ),
  },
  {
    id: 'js-task-8',
    topic: 'functions',
    level: 'intermediate',
    title: L('Run a function only once', 'Выполнить функцию только один раз'),
    brief: L(
      'Write once(fn) using a closure. The first call runs fn with the original arguments and this, later calls return the cached result. Then explain what happens if fn throws.',
      'Напишите once(fn) на замыкании. Первый вызов выполняет fn с исходными аргументами и this, последующие возвращают сохранённый результат. Затем объясните, что произойдёт, если fn выбросит исключение.'
    ),
    hint: L(
      'Keep a called flag and a result variable in the closure. Mark the call before invoking fn if a failure must not be retried.',
      'Храните флаг called и переменную result в замыкании. Отмечайте вызов до запуска fn, если после ошибки повтор не нужен.'
    ),
    solution: `function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const track = once((event) => {
  console.log('sent', event);
  return true;
});

track('view');
track('click'); // does not call fn again, returns true

// If fn throws, called is already true:
// the error propagates and later calls return undefined.`,
    explanation: L(
      'The closure keeps state private, so no global flag is needed and each once wrapper has its own guard. This is useful for analytics, payment submission and one-time initialization. If you need a retry after a failure, set called only after fn returns successfully.',
      'Замыкание хранит состояние приватно, поэтому глобальный флаг не нужен и у каждой обёртки once свой guard. Это полезно для аналитики, отправки платежа и однократной инициализации. Если нужен повтор после ошибки, устанавливайте called только после успешного возврата fn.'
    ),
  },
  {
    id: 'js-task-9',
    topic: 'arrays',
    level: 'intermediate',
    title: L('Revenue by SKU with flatMap and reduce', 'Выручка по SKU через flatMap и reduce'),
    brief: L(
      'Given orders with nested items, compute total revenue per SKU in one pipeline using flatMap and reduce. Do not mutate the source arrays.',
      'Дан массив заказов с вложенными позициями. Вычислите суммарную выручку по каждому SKU одним конвейером через flatMap и reduce. Не мутируйте исходные массивы.'
    ),
    hint: L(
      'flatMap first turns orders into a flat list of items. reduce then accumulates price times quantity into an object.',
      'Сначала flatMap превращает заказы в плоский список позиций. Затем reduce накапливает price умножить на quantity в объект.'
    ),
    solution: `const orders = [
  {
    id: 'o1',
    items: [
      { sku: 'a', price: 990, qty: 2 },
      { sku: 'b', price: 1500, qty: 1 },
    ],
  },
  {
    id: 'o2',
    items: [{ sku: 'a', price: 990, qty: 1 }],
  },
];

const revenueBySku = orders
  .flatMap((order) => order.items)
  .reduce((totals, item) => {
    totals[item.sku] = (totals[item.sku] ?? 0) + item.price * item.qty;
    return totals;
  }, {});

console.log(revenueBySku);
// { a: 2970, b: 1500 }`,
    explanation: L(
      'flatMap combines map and one-level flatten, which removes the nested loop. reduce folds the flat list into a single accumulator. The ?? 0 plus the returned accumulator keep the code free of mutation outside the local totals object.',
      'flatMap объединяет map и выравнивание на один уровень, что убирает вложенный цикл. reduce сводит плоский список в один аккумулятор. ?? 0 вместе с возвратом аккумулятора избавляют от мутации вне локального объекта totals.'
    ),
  },
  {
    id: 'js-task-10',
    topic: 'functions',
    level: 'intermediate',
    title: L('Memoize an expensive function', 'Мемоизировать дорогую функцию'),
    brief: L(
      'Write memoize(fn, keyFn) that caches results in a Map. Show it working for a slow calculation and name three cases where memoization is wrong or leaks memory.',
      'Напишите memoize(fn, keyFn), который кеширует результаты в Map. Покажите работу на медленном вычислении и назовите три случая, когда мемоизация неверна или приводит к утечке памяти.'
    ),
    hint: L(
      'Use Map.has to distinguish a cached undefined from a miss. Let keyFn decide how arguments become a key.',
      'Используйте Map.has, чтобы отличить закешированный undefined от промаха. Пусть keyFn решает, как аргументы превращаются в ключ.'
    ),
    solution: `function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);

    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}

const slowFib = memoize((n) => {
  if (n < 2) return n;
  return slowFib(n - 1) + slowFib(n - 2);
});

console.log(slowFib(35));

// Object arguments: identity is lost by JSON.stringify
const getUser = memoize(
  (user) => fetch('/api/users/' + user.id),
  (user) => 'user:' + user.id
);

// Wrong for impure functions, time-dependent results,
// and unbounded keys such as search queries or user ids.`,
    explanation: L(
      'The cache is closed over, so each memoized function owns its own Map. JSON.stringify is a convenient default key but loses object identity and is order-sensitive. Cap the cache or use a WeakMap keyed by objects when the input set is unbounded.',
      'Кеш замкнут внутри, поэтому у каждой мемоизированной функции своя Map. JSON.stringify — удобный ключ по умолчанию, но теряет идентичность объектов и зависит от порядка ключей. Ограничивайте размер кеша или используйте WeakMap с объектными ключами, если множество входов не ограничено.'
    ),
  },
  {
    id: 'js-task-11',
    topic: 'async',
    level: 'advanced',
    title: L('Predict event loop output', 'Предсказать порядок вывода event loop'),
    brief: L(
      'Write the exact console output order for synchronous logs, a zero-delay timeout, a two-step promise chain, queueMicrotask and an async function with await. Explain when the timer runs.',
      'Напишите точный порядок вывода для синхронных логов, таймаута с нулевой задержкой, цепочки из двух промисов, queueMicrotask и асинхронной функции с await. Объясните, когда запускается таймер.'
    ),
    hint: L(
      'Run all synchronous code first. Then drain the microtask queue completely, including microtasks added by microtasks. Timers are macrotasks.',
      'Сначала выполняется весь синхронный код. Затем очередь микрозадач опустошается полностью, включая микрозадачи, добавленные микрозадачами. Таймеры — макрозадачи.'
    ),
    solution: `console.log('1 sync');

setTimeout(() => console.log('2 timeout'), 0);

Promise.resolve()
  .then(() => console.log('3 microtask'))
  .then(() => console.log('4 microtask'));

queueMicrotask(() => console.log('5 microtask'));

(async () => {
  console.log('6 async start');
  await null;
  console.log('7 after await');
})();

console.log('8 sync end');

// Output:
// 1 sync
// 6 async start
// 8 sync end
// 3 microtask
// 5 microtask
// 7 after await
// 4 microtask
// 2 timeout`,
    explanation: L(
      'The async function body runs synchronously until await, so 6 and 8 are part of the first pass. await null queues 7 behind 3 and 5. The second then of the chain is queued only after 3 finishes, so 4 lands after 7. The timer callback is a macrotask and runs after the microtask queue is empty.',
      'Тело асинхронной функции выполняется синхронно до await, поэтому 6 и 8 входят в первый проход. await null ставит 7 в очередь после 3 и 5. Второй then цепочки попадает в очередь только после завершения 3, поэтому 4 оказывается после 7. Колбэк таймера — макрозадача и выполняется после опустошения очереди микрозадач.'
    ),
  },
  {
    id: 'js-task-12',
    topic: 'async',
    level: 'advanced',
    title: L('Cancel stale searches with AbortController', 'Отменять устаревшие поиски через AbortController'),
    brief: L(
      'Build a search helper that cancels the previous request when a new query arrives, ignores AbortError and still propagates real failures.',
      'Сделайте помощник поиска, который отменяет предыдущий запрос при новом запросе, игнорирует AbortError и всё равно пробрасывает настоящие ошибки.'
    ),
    hint: L(
      'Keep the current controller in a closure. Call abort before creating the next one, and pass signal to fetch.',
      'Храните текущий controller в замыкании. Вызывайте abort перед созданием следующего и передавайте signal в fetch.'
    ),
    solution: `function createSearch() {
  let controller;

  return async function search(query) {
    controller?.abort();
    controller = new AbortController();

    try {
      const response = await fetch(
        '/api/search?q=' + encodeURIComponent(query),
        { signal: controller.signal }
      );

      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') return null;
      throw error;
    }
  };
}

const search = createSearch();

const first = search('re');
const second = search('react'); // aborts the first request
const results = await second;`,
    explanation: L(
      'abort rejects the pending fetch with an AbortError, so the stale response never reaches the UI. The fresh controller replaces the old one, which also prevents aborting the request you just started. Call abort in a cleanup function on unmount so no request outlives the component.',
      'abort отклоняет ожидающий fetch с AbortError, поэтому устаревший ответ не доходит до UI. Новый controller заменяет старый, что также не даёт отменить только что запущенный запрос. Вызывайте abort в функции очистки при размонтировании, чтобы запрос не пережил компонент.'
    ),
  },
  {
    id: 'js-task-13',
    topic: 'functions',
    level: 'advanced',
    title: L('Write a curry helper', 'Написать помощник curry'),
    brief: L(
      'Implement curry(fn) that collects arguments until fn.length is reached and then invokes fn. Support add(1)(2)(3), add(1, 2)(3) and add(1)(2, 3), and note the limitation with rest parameters.',
      'Реализуйте curry(fn), который накапливает аргументы до fn.length, а затем вызывает fn. Поддержите add(1)(2)(3), add(1, 2)(3) и add(1)(2, 3), отметьте ограничение с rest-параметрами.'
    ),
    hint: L(
      'Compare the collected argument count with fn.length. Return a new function that concatenates the next batch.',
      'Сравнивайте число собранных аргументов с fn.length. Возвращайте новую функцию, которая добавляет следующую порцию.'
    ),
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}

const add = curry((a, b, c) => a + b + c);

add(1)(2)(3);  // 6
add(1, 2)(3);  // 6
add(1)(2, 3);  // 6
add(1, 2, 3);  // 6

// fn.length ignores default and rest parameters:
const sum = curry((...nums) => nums.reduce((a, b) => a + b, 0));
sum(1); // returns a function, because fn.length is 0`,
    explanation: L(
      'Currying turns one multi-argument function into a chain of single-argument calls, which makes partial application easy. The helper checks accumulated arity against fn.length, so it works only for functions with declared parameters. Extra arguments are passed through untouched.',
      'Каррирование превращает функцию с несколькими аргументами в цепочку вызовов по одному аргументу, что упрощает частичное применение. Помощник сравнивает накопленную арность с fn.length, поэтому работает только для функций с объявленными параметрами. Лишние аргументы передаются без изменений.'
    ),
  },
  {
    id: 'js-task-14',
    topic: 'algorithms',
    level: 'advanced',
    title: L('Build an LRU cache', 'Реализовать LRU-кеш'),
    brief: L(
      'Implement an LRU cache with get and set in O(1) using Map insertion order. When the limit is exceeded, evict the least recently used entry.',
      'Реализуйте LRU-кеш с get и set за O(1), используя порядок вставки Map. При превышении лимита вытесняйте давно не использованную запись.'
    ),
    hint: L(
      'Map keeps insertion order. On every hit, delete and re-set the key so it becomes the newest. The first key is the oldest.',
      'Map сохраняет порядок вставки. При каждом попадании удаляйте и заново добавляйте ключ, чтобы он стал самым новым. Первый ключ — самый старый.'
    ),
    solution: `class LRUCache {
  constructor(limit = 100) {
    this.limit = limit;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return undefined;

    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);

    if (this.map.size > this.limit) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest);
    }
  }
}

const cache = new LRUCache(2);
cache.set('a', 1);
cache.set('b', 2);
cache.get('a');    // 1, now 'b' is the oldest
cache.set('c', 3); // evicts 'b'
cache.get('b');    // undefined`,
    explanation: L(
      'A Map already stores entries in insertion order, so re-inserting a key on access makes the ordering encode recency. The first key from keys() is the least recently used, and delete plus set are both O(1). This is the same policy used by HTTP caches and query caches.',
      'Map хранит записи в порядке вставки, поэтому повторная вставка ключа при доступе кодирует свежесть в порядке. Первый ключ из keys() — самый давний по использованию, а delete и set работают за O(1). Это та же политика, что применяют HTTP-кеши и кеши запросов.'
    ),
  },
  {
    id: 'js-task-15',
    topic: 'async',
    level: 'advanced',
    title: L('Limit async concurrency with a pool', 'Ограничить параллельность асинхронного пула'),
    brief: L(
      'Write mapLimit(items, limit, worker) that processes items with at most limit concurrent workers, preserves result order and rejects if any worker fails. Then explain how to collect partial results instead.',
      'Напишите mapLimit(items, limit, worker), который обрабатывает элементы не более чем limit параллельными воркерами, сохраняет порядок результатов и отклоняется при ошибке любого воркера. Затем объясните, как собрать частичные результаты.'
    ),
    hint: L(
      'Start limit runners that share a nextIndex counter. Each runner pulls work until the list is empty.',
      'Запустите limit воркеров с общим счётчиком nextIndex. Каждый воркер берёт работу, пока список не опустеет.'
    ),
    solution: `async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }

  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    run
  );

  await Promise.all(runners);
  return results;
}

const urls = ['/api/a', '/api/b', '/api/c', '/api/d'];

const bodies = await mapLimit(urls, 2, async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
});

// Partial results: replace Promise.all with Promise.allSettled(runners)
// and store { status, value } per index instead of the bare value.`,
    explanation: L(
      'Each runner is an async loop, so a slot is reused as soon as its request finishes instead of waiting for the whole batch. nextIndex is read and incremented synchronously before the first await, so no two runners take the same item. Assigning by index preserves input order in the output.',
      'Каждый воркер — асинхронный цикл, поэтому слот переиспользуется сразу после завершения запроса, а не ждёт всю пачку. nextIndex читается и увеличивается синхронно до первого await, поэтому два воркера не возьмут один элемент. Присваивание по индексу сохраняет порядок входа в результате.'
    ),
  },
];
