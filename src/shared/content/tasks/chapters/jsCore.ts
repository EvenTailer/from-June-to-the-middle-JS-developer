import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const jsCoreChapterTasks: PracticeTask[] = [
  {
    id: 'ch-js-core-ch1-1',
    moduleId: 'js-core',
    topic: 'types',
    chapterId: 'js-core-ch1',
    level: 'basic',
    title: L('Name the type of a value', 'Определить тип значения'),
    brief: L(
      'Implement describeValue(value): it must report "null" for null, "array" for arrays, "nan" for NaN, "negative-zero" for -0 and the plain typeof result for everything else. Show also for which pair of values the two equality operators agree.',
      'Реализуйте describeValue(value): функция должна возвращать "null" для null, "array" для массивов, "nan" для NaN, "negative-zero" для -0 и обычный результат typeof для всего остального. Покажите также, для какой пары значений совпадают оба оператора равенства.'
    ),
    hint: L(
      'typeof lies about null and arrays, so those cases are checked first. Number.isNaN and Object.is cover the two numeric edge cases.',
      'typeof врёт насчёт null и массивов, поэтому эти случаи проверяются первыми. Number.isNaN и Object.is закрывают два числовых края.'
    ),
    solution: `function describeValue(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return 'nan';
    if (Object.is(value, -0)) return 'negative-zero';
  }
  return typeof value;
}

console.log(describeValue(null));   // 'null'
console.log(describeValue([]));     // 'array'
console.log(describeValue(NaN));    // 'nan'
console.log(describeValue(-0));     // 'negative-zero'
console.log(describeValue('text')); // 'string'

// The two equality operators agree only on the same type
console.log('' == 0);    // true
console.log('' === 0);   // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(Object.is(0, -0));   // false`,
    explanation: L(
      'The function closes the holes of typeof, so a caller never has to special-case null or an array. The comparisons show that === treats 0 and -0 as the same value, while Object.is tells them apart and agrees with === on NaN.',
      'Функция закрывает дыры typeof, поэтому вызывающему не нужно отдельно обрабатывать null и массив. Сравнения показывают, что === считает 0 и -0 одним значением, а Object.is их различает и, в отличие от ===, считает NaN равным самому себе.'
    ),
  },
  {
    id: 'ch-js-core-ch2-1',
    moduleId: 'js-core',
    topic: 'types',
    chapterId: 'js-core-ch2',
    level: 'basic',
    title: L('Add two values without the plus trap', 'Сложить два значения без ловушки плюса'),
    brief: L(
      'Implement sum(a, b) so it adds two values that may arrive as strings, and describeUser(user), which returns a role label, survives a missing profile and keeps a real zero score. Use the operators that tell "missing" from "falsy" apart.',
      'Реализуйте sum(a, b), чтобы она складывала два значения, которые могут прийти строками, и describeUser(user), которая возвращает метку роли, не падает без профиля и сохраняет настоящий ноль в счёте. Используйте операторы, которые отличают «нет значения» от «ложного значения».'
    ),
    hint: L(
      'Convert both operands explicitly before adding. Use && to guard the profile access and ?? for the score, because || would replace a zero.',
      'Явно приведите оба операнда к числу перед сложением. Для доступа к профилю используйте &&, а для счёта ??, потому что || заменит и ноль.'
    ),
    solution: `function sum(a, b) {
  // Explicit conversion: the plus operator would concatenate strings
  return Number(a) + Number(b);
}

function describeUser(user) {
  if (!user) return 'no user';
  // && short-circuits, a missing profile never throws
  const name = user.profile && user.profile.name;
  // ?? keeps a real zero, || would replace it
  const score = user.score ?? 0;
  switch (user.role) {
    case 'admin':
      return 'admin ' + (name ?? 'anonymous') + ' (' + score + ')';
    default:
      return 'guest ' + (name ?? 'anonymous') + ' (' + score + ')';
  }
}

console.log(sum('5', 3));       // 8, not '53'
console.log(describeUser({ role: 'admin', score: 0 })); // 'admin anonymous (0)'
console.log(describeUser(null)); // 'no user'`,
    explanation: L(
      'The plus operator concatenates as soon as one operand is a string, so the conversion has to be explicit. Short-circuiting protects the profile access, and ?? keeps a zero score, which is exactly what || would have thrown away.',
      'Оператор плюс склеивает строки, как только один из операндов строка, поэтому приведение должно быть явным. Короткое замыкание защищает доступ к профилю, а ?? сохраняет нулевой счёт — именно то, что потерял бы ||.'
    ),
  },
  {
    id: 'ch-js-core-ch3-1',
    moduleId: 'js-core',
    topic: 'functions',
    chapterId: 'js-core-ch3',
    level: 'basic',
    title: L('Keep a counter private with block scope', 'Скрыть счётчик в блочной области видимости'),
    brief: L(
      'Implement createCounter(start) so the counter value cannot be read or written from outside, and show that a let binding stays inside its block while var leaks out to the function scope.',
      'Реализуйте createCounter(start) так, чтобы значение счётчика нельзя было прочитать или изменить снаружи, и покажите, что let остаётся внутри своего блока, а var выходит на уровень функции.'
    ),
    hint: L(
      'A function creates a scope, and let binds the counter inside it. Returning functions keeps that scope alive after the factory returns.',
      'Функция создаёт область видимости, а let связывает счётчик внутри неё. Возвращённые функции сохраняют эту область живой после выхода из фабрики.'
    ),
    solution: `function createCounter(start = 0) {
  // The binding lives in the closure and stays unreachable from outside
  let count = start;
  return {
    increment: () => ++count,
    get value() { return count; },
  };
}

const counter = createCounter(5);
counter.increment();
console.log(counter.value); // 6
console.log(counter.count); // undefined, the binding is not exposed

// var is function scoped, let is block scoped
if (true) {
  var leaked = 'function scope';
  let scoped = 'block scope';
}
console.log(leaked); // 'function scope'
try {
  console.log(scoped); // ReferenceError: the let binding did not escape
} catch (error) {
  console.log(error.name); // 'ReferenceError'
}`,
    explanation: L(
      'The counter lives in the closure of the factory, so the returned object exposes only the methods and nothing else can touch the variable. The block at the end shows the difference between the function scope of var and the block scope of let.',
      'Счётчик живёт в замыкании фабрики, поэтому возвращённый объект отдаёт только методы, а переменную никто не изменит извне. Блок в конце показывает разницу между областью функции у var и областью блока у let.'
    ),
  },
  {
    id: 'ch-js-core-ch4-1',
    moduleId: 'js-core',
    topic: 'functions',
    chapterId: 'js-core-ch4',
    level: 'intermediate',
    title: L('An account with a private balance', 'Счёт с приватным балансом'),
    brief: L(
      'Implement createAccount({ balance }) that returns an object with a deposit method and a balance getter. The deposit method must accept any number of amounts at once, must work without a receiver and must reject non-positive amounts.',
      'Реализуйте createAccount({ balance }), который возвращает объект с методом deposit и геттером balance. Метод deposit должен принимать сразу любое количество сумм, работать без контекста вызова и отклонять неположительные суммы.'
    ),
    hint: L(
      'Destructure the options with a default, keep the total in a let binding, and return an arrow function so this is never needed.',
      'Разберите опции деструктуризацией со значением по умолчанию, держите сумму в let и возвращайте стрелочную функцию, чтобы this не требовался.'
    ),
    solution: `function createAccount({ balance = 0 } = {}) {
  // The total stays in the closure, nothing outside can reach it
  let total = balance;

  // Rest arguments let the caller deposit several amounts at once
  function deposit(...amounts) {
    for (const amount of amounts) {
      if (amount <= 0) throw new RangeError('amount must be positive');
      total += amount;
    }
    return total;
  }

  return { deposit, get balance() { return total; } };
}

const account = createAccount({ balance: 100 });
const deposit = account.deposit; // no receiver needed
deposit(50, 25);
console.log(account.balance); // 175`,
    explanation: L(
      'The total stays in the closure, so the returned object is the only way to reach it. Rest arguments let the caller deposit several amounts at once, and the arrow function keeps the method usable after it is detached from its object.',
      'Сумма остаётся в замыкании, поэтому единственный способ до неё — возвращённый объект. Rest-аргументы позволяют положить несколько сумм за раз, а стрелочная функция оставляет метод рабочим и после отсоединения от объекта.'
    ),
  },
  {
    id: 'ch-js-core-ch5-1',
    moduleId: 'js-core',
    topic: 'objects',
    chapterId: 'js-core-ch5',
    level: 'intermediate',
    title: L('A validated property with a descriptor', 'Проверяемое свойство через дескриптор'),
    brief: L(
      'Create an object whose endpoint property is defined with Object.defineProperty: reading it returns the stored value, writing it validates the input and throws on a bad value. The property must be enumerable, and a lookup on a child object must find an inherited method.',
      'Создайте объект, у которого свойство endpoint определено через Object.defineProperty: чтение возвращает сохранённое значение, а запись проверяет ввод и бросает ошибку на плохом значении. Свойство должно быть перечисляемым, а поиск по дочернему объекту должен находить унаследованный метод.'
    ),
    hint: L(
      'A descriptor takes a getter and a setter. Object.create links the child to the prototype, and Object.hasOwn tells own and inherited properties apart.',
      'Дескриптор принимает геттер и сеттер. Object.create связывает потомка с прототипом, а Object.hasOwn отличает собственные свойства от унаследованных.'
    ),
    solution: `const settings = {};
let endpoint;

// A getter and a setter defined with a descriptor
Object.defineProperty(settings, 'endpoint', {
  get() { return endpoint; },
  set(value) {
    if (!value.startsWith('/')) throw new TypeError('endpoint must start with /');
    endpoint = value;
  },
  enumerable: true,
});

settings.endpoint = '/api/v1';
console.log(settings.endpoint);   // '/api/v1'
console.log(Object.keys(settings)); // ['endpoint']

// A lookup walks the prototype chain until it finds the property
const base = { greet() { return 'Hi ' + this.name; } };
const user = Object.create(base);
user.name = 'Ada';
console.log(user.greet());                   // 'Hi Ada'
console.log(Object.hasOwn(user, 'greet')); // false, the method is inherited`,
    explanation: L(
      'The descriptor keeps the validation next to the data, so every write goes through the same check. The second part shows that a lookup walks the prototype chain, while Object.hasOwn reports the method as inherited rather than own.',
      'Дескриптор держит проверку рядом с данными, поэтому любая запись проходит через одно и то же правило. Вторая часть показывает, что поиск идёт по цепочке прототипов, а Object.hasOwn сообщает, что метод унаследован, а не собственный.'
    ),
  },
  {
    id: 'ch-js-core-ch6-1',
    moduleId: 'js-core',
    topic: 'objects',
    chapterId: 'js-core-ch6',
    level: 'intermediate',
    title: L('A temperature class with a private field', 'Класс температуры с приватным полем'),
    brief: L(
      'Implement a Temperature class with a private Celsius field, a static factory that builds an instance from Fahrenheit, and a method that returns a frozen snapshot. The private value must stay invisible to JSON and to the outside code.',
      'Реализуйте класс Temperature с приватным полем в градусах Цельсия, статической фабрикой из градусов Фаренгейта и методом, который возвращает замороженный снимок. Приватное значение должно остаться невидимым для JSON и для внешнего кода.'
    ),
    hint: L(
      'A private field starts with a hash. Object.freeze makes the returned snapshot immutable, and a toJSON method controls what JSON.stringify sees.',
      'Приватное поле начинается с решётки. Object.freeze делает снимок неизменяемым, а метод toJSON управляет тем, что видит JSON.stringify.'
    ),
    solution: `class Temperature {
  // The private field is invisible to reflection and to JSON
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  static fromFahrenheit(fahrenheit) {
    return new Temperature((fahrenheit - 32) * (5 / 9));
  }

  get celsius() { return this.#celsius; }

  // A frozen snapshot: the value object cannot be changed afterwards
  toJSON() {
    return Object.freeze({ celsius: this.#celsius });
  }
}

const t = Temperature.fromFahrenheit(212);
console.log(t.celsius);                    // 100
console.log(t._celsius);                   // undefined
console.log(JSON.stringify(t));            // '{"celsius":100}'
console.log(Object.isFrozen(t.toJSON())); // true`,
    explanation: L(
      'The hash field cannot be read or written from outside the class, not even through reflection, so the internal state stays under control. The frozen snapshot gives the caller a value it cannot modify by accident.',
      'Поле с решёткой не читается и не пишется извне класса, даже через рефлексию, поэтому внутреннее состояние остаётся под контролем. Замороженный снимок даёт вызывающему значение, которое нельзя случайно изменить.'
    ),
  },
  {
    id: 'ch-js-core-ch7-1',
    moduleId: 'js-core',
    topic: 'arrays',
    chapterId: 'js-core-ch7',
    level: 'intermediate',
    title: L('Revenue per user without mutating the source', 'Выручка по пользователям без мутации источника'),
    brief: L(
      'Given a list of orders, compute the revenue per user and the ids of the expensive orders. The source array must stay exactly as it was, and the sorted result must go from the highest total to the lowest.',
      'Дан список заказов: посчитайте выручку по пользователям и id дорогих заказов. Исходный массив должен остаться точно таким же, а отсортированный результат должен идти от большей суммы к меньшей.'
    ),
    hint: L(
      'Reduce into an accumulator object for the totals, filter before mapping to get the ids, and spread the array before sort to keep the original untouched.',
      'Свёрните заказы в объект-аккумулятор для сумм, для id сначала отфильтруйте, а перед сортировкой разверните массив через spread, чтобы не тронуть оригинал.'
    ),
    solution: `const orders = [
  { id: 1, user: 'ada', total: 10 },
  { id: 2, user: 'bob', total: 20 },
  { id: 3, user: 'ada', total: 30 },
];

// Fold the orders into a map of revenue per user
const revenue = orders.reduce((acc, order) => {
  acc[order.user] = (acc[order.user] ?? 0) + order.total;
  return acc;
}, {});
console.log(revenue); // { ada: 40, bob: 20 }

// Sort a copy, the caller's array stays untouched
const byTotal = [...orders].sort((a, b) => b.total - a.total);
console.log(byTotal[0].id); // 3
console.log(orders[0].id);  // 1, the source is unchanged

// Keep only the expensive orders and collect their ids
const bigIds = orders.filter((o) => o.total >= 20).map((o) => o.id);
console.log(bigIds); // [2, 3]`,
    explanation: L(
      'The fold builds a new object instead of touching the orders, so nothing is mutated along the way. Sorting a copy is the rule that keeps the caller array intact, and filter plus map keeps the ids in the original order.',
      'Свёртка собирает новый объект вместо изменения заказов, поэтому по ходу ничего не мутируется. Сортировка копии — правило, которое оставляет массив вызывающего нетронутым, а filter вместе с map сохраняет порядок id.'
    ),
  },
  {
    id: 'ch-js-core-ch8-1',
    moduleId: 'js-core',
    topic: 'loops',
    chapterId: 'js-core-ch8',
    level: 'advanced',
    title: L('A lazy generator and a custom iterable', 'Ленивый генератор и свой итерируемый объект'),
    brief: L(
      'Implement a generator that splits a list into chunks and yields them one by one, and an object that can be consumed by for...of. The generator must not build anything until the consumer asks for the next value.',
      'Реализуйте генератор, который делит список на части и выдаёт их по одной, и объект, который можно обойти через for...of. Генератор не должен ничего вычислять, пока потребитель не попросит следующее значение.'
    ),
    hint: L(
      'A generator function uses yield inside a loop. An object becomes iterable by implementing a method that returns an iterator.',
      'Функция-генератор использует yield внутри цикла. Объект становится итерируемым, если реализовать метод, возвращающий итератор.'
    ),
    solution: `// A lazy generator: nothing runs until the consumer asks for a value
function* chunk(items, size) {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}

console.log([...chunk([1, 2, 3, 4, 5], 2)]); // [[1, 2], [3, 4], [5]]

// A custom iterable: the protocol is a method that returns an iterator
const range = {
  from: 1,
  to: 4,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i += 1) yield i;
  },
};

console.log([...range]);  // [1, 2, 3, 4]
for (const n of range) { // for...of uses the same protocol
  console.log(n);
}`,
    explanation: L(
      'The generator is lazy: the slice is computed only when the consumer pulls the next value, which keeps memory flat for long lists. The custom iterable follows the same protocol, so for...of and spread both work with it.',
      'Генератор ленивый: срез вычисляется только тогда, когда потребитель тянет следующее значение, поэтому память не растёт на длинных списках. Свой итерируемый объект работает по тому же протоколу, поэтому с ним дружат и for...of, и spread.'
    ),
  },
  {
    id: 'ch-js-core-ch9-1',
    moduleId: 'js-core',
    topic: 'strings',
    chapterId: 'js-core-ch9',
    level: 'advanced',
    title: L('Parse a log line with named groups', 'Разбор строки лога через именованные группы'),
    brief: L(
      'Write a parser that pulls the time, the level and the message out of a log line with a named-group regular expression, returns null when the line does not match, and extracts every tag from a text.',
      'Напишите разборщик, который достанет из строки лога время, уровень и сообщение регулярным выражением с именованными группами, вернёт null, если строка не подошла, и вытащит из текста все теги.'
    ),
    hint: L(
      'A named group appears in match.groups. A global regex walked with matchAll gives every match, and a replacement callback receives the captured groups.',
      'Именованная группа доступна в match.groups. Глобальный regex, обойденный через matchAll, даёт все совпадения, а функция-замена получает захваченные группы.'
    ),
    solution: `// A named group keeps the fields readable
const LINE = /^(?<time>\\d{2}:\\d{2})\\s+(?<level>INFO|WARN|ERROR)\\s+(?<message>.+)$/;

function parseLine(line) {
  const match = line.match(LINE);
  return match ? match.groups : null;
}

console.log(parseLine('10:20 INFO server started'));
// { time: '10:20', level: 'INFO', message: 'server started' }
console.log(parseLine('broken')); // null

// matchAll walks over every match of a global regex
const tags = [...'a #one b #two'.matchAll(/#(\\w+)/g)].map((m) => m[1]);
console.log(tags); // ['one', 'two']`,
    explanation: L(
      'Named groups keep the fields readable and survive a reordering of the pattern, and returning null for a non-matching line keeps the caller free of try and catch. matchAll walks over every match of a global regex without the lastIndex dance of exec.',
      'Именованные группы делают поля читаемыми и переживают перестановку в шаблоне, а null для несовпавшей строки избавляет вызывающего от try и catch. matchAll обходит все совпадения глобального regex без ручной работы с lastIndex.'
    ),
  },
  {
    id: 'ch-js-core-ch10-1',
    moduleId: 'js-core',
    topic: 'numbers',
    chapterId: 'js-core-ch10',
    level: 'advanced',
    title: L('Format money and add days in UTC', 'Формат денег и добавление дней в UTC'),
    brief: L(
      'Implement formatPrice(cents, locale, currency) that formats an integer amount of cents for the given locale, and addDays(isoDate, days) that adds calendar days without drifting across a daylight saving change.',
      'Реализуйте formatPrice(cents, locale, currency), который форматирует целое число центров под заданную локаль, и addDays(isoDate, days), который добавляет календарные дни без сдвига на переходе на летнее время.'
    ),
    hint: L(
      'Intl.NumberFormat takes the amount in the major unit, so divide the cents. Date arithmetic in UTC uses setUTCDate and toISOString.',
      'Intl.NumberFormat ждёт сумму в основных единицах, поэтому центры надо разделить. Арифметика дат в UTC использует setUTCDate и toISOString.'
    ),
    solution: `// Money as integer minor units, formatted for the user's locale
function formatPrice(cents, locale = 'en-US', currency = 'USD') {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  return formatter.format(cents / 100);
}

console.log(formatPrice(1999));               // '$19.99'
console.log(formatPrice(1999, 'de-DE', 'EUR')); // '19,99 €'

// Date arithmetic in UTC, a daylight saving change cannot move the day
function addDays(isoDate, days) {
  const date = new Date(isoDate + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

console.log(addDays('2024-03-09', 1)); // '2024-03-10'
console.log(addDays('2024-12-31', 1)); // '2025-01-01'`,
    explanation: L(
      'Keeping money in integer cents removes the float noise before the formatter ever sees it. Working in UTC means the day of the month is plain arithmetic and not a side effect of the local timezone.',
      'Деньги в целых центах убирают шум float до того, как их увидит форматтер. Работа в UTC превращает день месяца в простую арифметику, а не в побочный эффект местного часового пояса.'
    ),
  },
  {
    id: 'ch-js-core-ch11-1',
    moduleId: 'js-core',
    topic: 'async',
    chapterId: 'js-core-ch11',
    level: 'advanced',
    title: L('A timeout and a retry for a flaky call', 'Таймаут и повтор для ненадёжного вызова'),
    brief: L(
      'Implement withTimeout(promise, ms) that rejects with a clear error when the promise is too slow, and retry(fn, attempts) that repeats a failing call with a growing delay. The timeout must not leave a pending timer behind.',
      'Реализуйте withTimeout(promise, ms), который отклоняется с понятной ошибкой, если промис слишком долгий, и retry(fn, attempts), который повторяет упавший вызов с растущей задержкой. Таймаут не должен оставлять висящий таймер.'
    ),
    hint: L(
      'Race the promise against a rejecting timer and clear the timer in a finally block. The delay between attempts can double on every step.',
      'Устройте гонку промиса с отклоняющимся таймером и сбросьте таймер в блоке finally. Задержка между попытками может удваиваться на каждом шаге.'
    ),
    solution: `async function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Timeout after ' + ms + 'ms')), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer); // the timer must not keep the event loop alive
  }
}

async function retry(fn, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 100 * 2 ** i));
    }
  }
  throw lastError;
}

console.log(await withTimeout(Promise.resolve('fast'), 1000)); // 'fast'
console.log(await retry(async () => 'ok', 3));                // 'ok'`,
    explanation: L(
      'The finally block always clears the timer, so a fast promise does not keep the event loop alive. The retry loop keeps the last error and rethrows it after the final attempt, so the caller sees a real reason instead of a generic failure.',
      'Блок finally всегда сбрасывает таймер, поэтому быстрый промис не держит событийный цикл. Цикл повторов сохраняет последнюю ошибку и пробрасывает её после финальной попытки, так что вызывающий видит настоящую причину, а не общий сбой.'
    ),
  },
  {
    id: 'ch-js-core-ch12-1',
    moduleId: 'js-core',
    topic: 'errors',
    chapterId: 'js-core-ch12',
    level: 'advanced',
    title: L('A validation error with a cause', 'Ошибка валидации с причиной'),
    brief: L(
      'Implement a ValidationError class that extends Error, carries the list of invalid fields and keeps the original failure as its cause. Then implement parseUser, which throws that error instead of a bare Error when the payload is wrong.',
      'Реализуйте класс ValidationError, который расширяет Error, хранит список неверных полей и сохраняет исходную ошибку как причину. Затем реализуйте parseUser, который бросает именно эту ошибку, а не голый Error, когда данные неверны.'
    ),
    hint: L(
      'Pass { cause } to the Error constructor. A small assert helper keeps the checks in one place and throws a TypeError.',
      'Передайте { cause } в конструктор Error. Небольшой помощник assert соберёт проверки в одном месте и бросит TypeError.'
    ),
    solution: `class ValidationError extends Error {
  constructor(fields, cause) {
    // The cause keeps the original failure for the stack trace
    super('Validation failed', { cause });
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

function assert(condition, message) {
  if (!condition) throw new TypeError(message);
}

function parseUser(raw) {
  assert(typeof raw === 'object' && raw !== null, 'payload must be an object');
  const { id, name } = raw;
  const fields = [];
  if (typeof id !== 'number') fields.push('id');
  if (typeof name !== 'string' || !name) fields.push('name');
  if (fields.length) {
    // The cause points at the checks that failed
    throw new ValidationError(fields, new TypeError('invalid fields: ' + fields.join(', ')));
  }
  return { id, name };
}

console.log(parseUser({ id: 1, name: 'Ada' })); // { id: 1, name: 'Ada' }`,
    explanation: L(
      'The custom class keeps the machine-readable fields separate from the message, so a caller can react to the code instead of parsing the text. The cause preserves the original failure, which keeps the stack trace useful.',
      'Собственный класс отделяет машиночитаемые поля от сообщения, поэтому вызывающий может реагировать на код, а не разбирать текст. Причина сохраняет исходный сбой, и стектрейс остаётся полезным.'
    ),
  },
  {
    id: 'ch-js-core-ch13-1',
    moduleId: 'js-core',
    topic: 'algorithms',
    chapterId: 'js-core-ch13',
    level: 'advanced',
    title: L('Binary search and a memoized Fibonacci', 'Бинарный поиск и мемоизированный Фибоначчи'),
    brief: L(
      'Implement binarySearch(sorted, target) for a sorted array and a memoized fib(n) that computes the same values as the naive recursion but in linear time. Both must give the same result as the simple versions.',
      'Реализуйте binarySearch(sorted, target) для отсортированного массива и мемоизированный fib(n), который считает те же значения, что и наивная рекурсия, но за линейное время. Оба должны давать тот же результат, что и простые версии.'
    ),
    hint: L(
      'Halve the search range on every step. A Map that survives between the recursive calls stores every computed value.',
      'На каждом шаге сужайте диапазон поиска вдвое. Map, переживающий между рекурсивными вызовами, хранит все вычисленные значения.'
    ),
    solution: `// O(log n): halve the search space on every step
function binarySearch(sorted, target) {
  let low = 0;
  let high = sorted.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 7)); // 3
console.log(binarySearch([1, 3, 5], 4));       // -1

// O(n) with a cache instead of O(2^n) with plain recursion
function fib(n, cache = new Map([[0, 0], [1, 1]])) {
  if (cache.has(n)) return cache.get(n);
  const value = fib(n - 1, cache) + fib(n - 2, cache);
  cache.set(n, value);
  return value;
}

console.log(fib(50)); // 12586269025`,
    explanation: L(
      'Binary search drops half of the range on every step, so it needs O(log n) comparisons instead of O(n). The cache turns the exponential recursion into a linear one, because every value is computed exactly once.',
      'Бинарный поиск отбрасывает половину диапазона на каждом шаге, поэтому ему нужно O(log n) сравнений вместо O(n). Кеш превращает экспоненциальную рекурсию в линейную, потому что каждое значение считается ровно один раз.'
    ),
  },
  {
    id: 'ch-js-core-ch14-1',
    moduleId: 'js-core',
    topic: 'dom',
    chapterId: 'js-core-ch14',
    level: 'advanced',
    title: L('A delegated click handler and a form payload', 'Делегирование клика и payload формы'),
    brief: L(
      'Attach one click listener to a list container that reacts only to elements carrying a data-remove attribute, and make it removable through an AbortController. Then serialize a form with FormData into a plain object.',
      'Навесьте на контейнер списка один обработчик клика, который реагирует только на элементы с атрибутом data-remove, и сделайте его снимаемым через AbortController. Затем превратите форму через FormData в обычный объект.'
    ),
    hint: L(
      'event.target.closest finds the closest ancestor matching the selector. FormData.entries gives an iterator of name and value pairs.',
      'event.target.closest находит ближайшего предка по селектору. FormData.entries даёт итератор пар имя-значение.'
    ),
    solution: `// One listener on the container, not one listener per row
function onListClick(container, onRemove) {
  const controller = new AbortController();
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove]');
    if (!button) return; // not our business, let the event bubble
    event.preventDefault();
    onRemove(button.dataset.remove);
  }, { signal: controller.signal });
  return () => controller.abort();
}

const list = document.querySelector('#todos');
const stop = onListClick(list, (id) => console.log('remove', id));
stop(); // removes the listener

// A form becomes a plain object through FormData
const form = document.querySelector('#signup');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form).entries());
  console.log(payload);
});`,
    explanation: L(
      'One listener on the container survives every list update, and the AbortController removes it in a single call instead of tracking the handler. FormData reads the native form state, so the payload matches what the browser would submit.',
      'Один обработчик на контейнире переживает любые изменения списка, а AbortController снимает его одним вызовом вместо хранения ссылки на функцию. FormData читает нативное состояние формы, поэтому payload совпадает с тем, что отправил бы браузер.'
    ),
  },
];
