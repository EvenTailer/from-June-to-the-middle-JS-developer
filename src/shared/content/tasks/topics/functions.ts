import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const functionsTasks: PracticeTask[] = [
  {
    id: 'topic-functions-1',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'basic',
    title: L('Pure function: cart total', 'Чистая функция: итог корзины'),
    brief: L(
      'Write a pure function cartTotal(items) where every item is an object { name, price, qty }. It must return the sum of price * qty over all items, must not modify the input array or its objects, must not print anything and must not use outer variables. Example: cartTotal([{ name: "pen", price: 10, qty: 2 }, { name: "book", price: 3, qty: 3 }]) returns 29, cartTotal([]) returns 0.',
      'Напишите чистую функцию cartTotal(items), где каждый элемент — объект { name, price, qty }. Она должна возвращать сумму price * qty по всем элементам, не должна изменять входной массив и его объекты, ничего не печатать и не использовать внешние переменные. Пример: cartTotal([{ name: "pen", price: 10, qty: 2 }, { name: "book", price: 3, qty: 3 }]) возвращает 29, cartTotal([]) возвращает 0.'
    ),
    hint: L(
      'Read the values, accumulate the result in a local variable, and return it. Do not write to item.price or item.qty.',
      'Читайте значения, копите результат в локальную переменную и возвращайте её. Не записывайте в item.price или item.qty.'
    ),
    solution: `function cartTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total;
}

const items = [
  { name: 'pen', price: 10, qty: 2 },
  { name: 'book', price: 3, qty: 3 },
];

console.log(cartTotal(items)); // 29
console.log(items[0].qty); // 2 — unchanged`,
    explanation: L(
      'A pure function depends only on its arguments and always returns the same result for the same input. Here the only state is the local variable total, and the input objects are only read, never written to. That is why calling cartTotal(items) twice gives 29 both times and the array stays exactly as it was.',
      'Чистая функция зависит только от своих аргументов и всегда возвращает один и тот же результат для одинакового входа. Здесь единственное состояние — локальная переменная total, а входные объекты только читаются, в них ничего не записывается. Поэтому два вызова cartTotal(items) дают 29, и массив остаётся неизменным.'
    ),
  },
  {
    id: 'topic-functions-2',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'basic',
    title: L('Default and rest parameters', 'Параметры по умолчанию и rest-параметры'),
    brief: L(
      'Write a function joinParts(prefix = "list", ...parts) that joins all parts with " - " and puts the prefix in front followed by ": ". If there are no parts, return just the prefix without a colon. Example: joinParts("fruits", "apple", "pear") returns "fruits: apple - pear", joinParts("numbers") returns "numbers", joinParts(undefined, "x") returns "list: x".',
      'Напишите функцию joinParts(prefix = "list", ...parts), которая соединяет все части через " - " и ставит перед ними prefix с двоеточием и пробелом. Если частей нет, верните только prefix, без двоеточия. Пример: joinParts("fruits", "apple", "pear") возвращает "fruits: apple - pear", joinParts("numbers") возвращает "numbers", joinParts(undefined, "x") возвращает "list: x".'
    ),
    hint: L(
      'A default parameter kicks in when the argument is undefined. The rest parameter always collects an array, even when it is empty.',
      'Параметр по умолчанию срабатывает, когда аргумент равен undefined. Rest-параметр всегда собирает массив, даже если он пустой.'
    ),
    solution: `function joinParts(prefix = 'list', ...parts) {
  if (parts.length === 0) return prefix;
  return prefix + ': ' + parts.join(' - ');
}

console.log(joinParts('fruits', 'apple', 'pear')); // fruits: apple - pear
console.log(joinParts('numbers')); // numbers
console.log(joinParts(undefined, 'x')); // list: x`,
    explanation: L(
      'The default value of prefix is used only when the argument is undefined, so joinParts("numbers") really does use the string "numbers" while joinParts(undefined, "x") falls back to "list". The rest parameter collects all remaining arguments into a real array, which is why parts.length can be checked and parts.join works.',
      'Значение по умолчанию для prefix используется, только если аргумент равен undefined, поэтому joinParts("numbers") действительно берёт строку "numbers", а joinParts(undefined, "x") откатывается к "list". Rest-параметр собирает все оставшиеся аргументы в настоящий массив, поэтому доступны parts.length и parts.join.'
    ),
  },
  {
    id: 'topic-functions-3',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'basic',
    title: L('IIFE', 'IIFE — немедленно вызываемая функция'),
    brief: L(
      'Write an immediately invoked function expression (IIFE) without the function keyword: use an arrow function in parentheses, call it right away with the number 5 and log the result. Example: the call (n => n * n)(5) logs 25. Then write a second IIFE that uses the module pattern: it returns an object with an increment() method and a value property, and the counter must be private inside the IIFE. Example: counter.increment() returns 1, counter.value returns 1.',
      'Напишите немедленно вызываемое выражение функции (IIFE) без ключевого слова function: используйте стрелочную функцию в скобках, сразу вызовите её с числом 5 и выведите результат. Пример: вызов (n => n * n)(5) выводит 25. Затем напишите второй IIFE с паттерном модуля: он возвращает объект с методом increment() и свойством value, а счётчик остаётся скрытым внутри IIFE. Пример: counter.increment() возвращает 1, counter.value возвращает 1.'
    ),
    hint: L(
      'The parentheses around the function expression are what make JavaScript treat it as a value, so it can be called directly.',
      'Скобки вокруг выражения функции заставляют JavaScript считать его значением, поэтому его можно вызвать напрямую.'
    ),
    solution: `// 1. Simple IIFE
const square = ((n) => n * n)(5);
console.log(square); // 25

// 2. IIFE with the module pattern
const counter = (() => {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    get value() {
      return count;
    },
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.value); // 2`,
    explanation: L(
      'An IIFE is a function expression that is executed at the moment it is created. The wrapping parentheses are required: without them JavaScript would read the function as a declaration and the trailing call would be a syntax error. The second IIFE closes over the count variable, so it stays private and the object only exposes the public methods.',
      'IIFE — это выражение функции, которое выполняется сразу при создании. Скобки вокруг него обязательны: без них JavaScript примет код за объявление функции и вызов в конце станет синтаксической ошибкой. Второй IIFE замыкает переменную count, поэтому она остаётся скрытой, а наружу выходят только публичные методы.'
    ),
  },
  {
    id: 'topic-functions-4',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'intermediate',
    title: L('once', 'Функция, которая выполняется один раз'),
    brief: L(
      'Write a function once(fn) that returns a new function which calls fn only on its very first call. On every later call the returned function returns the result of that first call and fn is not called again. The arguments of the first call are passed to fn. Example: with once(() => 42), calling the returned function twice returns 42 both times and the original function runs exactly once.',
      'Напишите функцию once(fn), которая возвращает новую функцию, вызывающую fn только при самом первом вызове. При всех последующих вызовах возвращённая функция отдаёт результат первого вызова, а fn больше не вызывается. Аргументы первого вызова передаются в fn. Пример: для once(() => 42) два вызова возвращённой функции дают 42, а исходная функция выполняется ровно один раз.'
    ),
    hint: L(
      'Keep a flag and a cached result in the closure of the returned function, and use fn.apply(this, args) to pass the arguments through.',
      'Держите флаг и кешированный результат в замыкании возвращённой функции и передавайте аргументы через fn.apply(this, args).'
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

let calls = 0;
const init = once(() => {
  calls += 1;
  return calls;
});

console.log(init()); // 1
console.log(init()); // 1
console.log(calls); // 1`,
    explanation: L(
      'The flag and the cached result live in the closure created by once, so they are shared by every call of the returned function but invisible from the outside. The flag guarantees that the body of fn runs only on the first call, and the cached result makes every later call return the very same value without recomputing anything.',
      'Флаг и кешированный результат живут в замыкании, которое создаёт once, поэтому они общие для всех вызовов возвращённой функции, но снаружи не видны. Флаг гарантирует, что тело fn выполнится только при первом вызове, а кешированный результат заставляет все последующие вызовы возвращать то же самое значение без пересчёта.'
    ),
  },
  {
    id: 'topic-functions-5',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'intermediate',
    title: L('Curry a function', 'Каррирование функции'),
    brief: L(
      'Write a function curry(fn) that turns a function of several arguments into a chain of one-argument functions. The chain may be called in any grouping: curry((a, b, c) => a + b + c)(1)(2)(3) returns 6 and curry((a, b, c) => a + b + c)(1, 2)(3) also returns 6. The result must be computed as soon as enough arguments are collected, and fn must be called exactly once.',
      'Напишите функцию curry(fn), которая превращает функцию с несколькими аргументами в цепочку функций с одним аргументом. Цепочку можно вызывать любыми группами: curry((a, b, c) => a + b + c)(1)(2)(3) возвращает 6, и curry((a, b, c) => a + b + c)(1, 2)(3) тоже возвращает 6. Результат должен вычисляться, как только собрано достаточно аргументов, а fn вызывается ровно один раз.'
    ),
    hint: L(
      'fn.length tells you how many arguments fn expects. Collect arguments until the count reaches fn.length, then apply them.',
      'Свойство fn.length показывает, сколько аргументов ждёт fn. Копите аргументы, пока их не станет fn.length, и только потом применяйте.'
    ),
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    const self = this;
    return function (...next) {
      return curried.apply(self, args.concat(next));
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6`,
    explanation: L(
      'Every call returns a new function that remembers the arguments collected so far. When the number of collected arguments reaches fn.length, the original function is applied and its result is returned; otherwise the chain continues. Because the arguments are merged with concat, the caller is free to pass them one by one or in groups.',
      'Каждый вызов возвращает новую функцию, которая помнит уже собранные аргументы. Как только число собранных аргументов достигает fn.length, исходная функция применяется и возвращается её результат, иначе цепочка продолжается. Так как аргументы объединяются через concat, вызывающий может передавать их по одному или группами.'
    ),
  },
  {
    id: 'topic-functions-6',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'advanced',
    title: L('Memoize a function', 'Мемоизация функции'),
    brief: L(
      'Write a function memoize(fn) that returns a function caching every result of fn by its arguments. Calling the returned function again with the same arguments must return the cached result and must not call fn again. The cache must be shared by all calls of the returned function, and arguments must work for primitive values. Example: memoize((a, b) => a + b)(2, 3) returns 5, and the second call with (2, 3) returns 5 without running the original function a second time.',
      'Напишите функцию memoize(fn), которая возвращает функцию, кеширующую каждый результат fn по его аргументам. Повторный вызов возвращённой функции с теми же аргументами должен отдавать кешированный результат и не вызывать fn снова. Кеш общий для всех вызовов возвращённой функции, аргументы должны работать с примитивными значениями. Пример: memoize((a, b) => a + b)(2, 3) возвращает 5, и второй вызов с (2, 3) тоже возвращает 5, не выполняя исходную функцию повторно.'
    ),
    hint: L(
      'Use a Map as the cache inside the closure and build a string key from the arguments, for example with JSON.stringify(args).',
      'Используйте Map как кеш внутри замыкания и стройте строковый ключ из аргументов, например через JSON.stringify(args).'
    ),
    solution: `function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

let runs = 0;
const slow = memoize((a, b) => {
  runs += 1;
  return a + b;
});

console.log(slow(2, 3)); // 5
console.log(slow(2, 3)); // 5
console.log(slow(4, 5)); // 9
console.log(runs); // 2`,
    explanation: L(
      'The Map lives in the closure of memoize, so all calls of the returned function share the same cache. The key is built from the argument list, so different arguments map to different entries. A cache hit returns the stored value without touching fn, and a miss computes the value and stores it for the next time. The trade-off is memory: the cache is never cleaned automatically.',
      'Map живёт в замыкании memoize, поэтому все вызовы возвращённой функции используют один и тот же кеш. Ключ строится из списка аргументов, поэтому разные аргументы попадают в разные записи. При попадании в кеш возвращается сохранённое значение и fn не вызывается, при промахе значение вычисляется и записывается на будущее. Плата — память: кеш сам не очищается.'
    ),
  },
  {
    id: 'topic-functions-7',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'advanced',
    title: L('compose and pipe', 'compose и pipe'),
    brief: L(
      'Write two functions. compose(...fns) applies the functions from right to left, so compose(f, g)(x) is f(g(x)). pipe(...fns) applies them from left to right, so pipe(f, g)(x) is g(f(x)). Both must return a function that takes the initial value. Example: compose(x => x + 1, x => x * 2)(5) returns 11, pipe(x => x + 1, x => x * 2)(5) returns 12.',
      'Напишите две функции. compose(...fns) применяет функции справа налево, то есть compose(f, g)(x) — это f(g(x)). pipe(...fns) применяет их слева направо, то есть pipe(f, g)(x) — это g(f(x)). Обе должны возвращать функцию, принимающую начальное значение. Пример: compose(x => x + 1, x => x * 2)(5) возвращает 11, pipe(x => x + 1, x => x * 2)(5) возвращает 12.'
    ),
    hint: L(
      'reduceRight folds the functions from the end of the array, reduce folds them from the start. Both need an initial value.',
      'reduceRight сворачивает функции с конца массива, reduce — с начала. Обоим нужен начальный аккумулятор.'
    ),
    solution: `function compose(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const inc = (x) => x + 1;
const double = (x) => x * 2;

console.log(compose(inc, double)(5)); // 11
console.log(pipe(inc, double)(5)); // 12`,
    explanation: L(
      'Both helpers are built on Array.reduce: the only difference is the direction of the fold. reduceRight starts with the last function and moves left, which gives the right-to-left behaviour of compose, while reduce starts with the first function and moves right, which gives pipe. The accumulator starts as the incoming value, so the first function applied receives it directly.',
      'Обе помощники построены на Array.reduce и отличаются только направлением свёртки. reduceRight начинает с последней функции и идёт влево — это поведение compose справа налево, а reduce начинает с первой функции и идёт вправо — это pipe. Аккумулятор стартует с входящего значения, поэтому первая применённая функция получает его напрямую.'
    ),
  },
  {
    id: 'topic-functions-8',
    moduleId: 'js-core',
    topic: 'functions',
    level: 'advanced',
    title: L('Recursion: factorial and fibonacci', 'Рекурсия: факториал и Фибоначчи'),
    brief: L(
      'Write two recursive functions. factorial(n) returns 1 * 2 * ... * n and must use recursion with a base case for n <= 1. fib(n) returns the n-th Fibonacci number where fib(0) = 0 and fib(1) = 1, and must also use recursion, but it must remember already computed values so that fib(30) finishes instantly. Example: factorial(5) returns 120, factorial(0) returns 1, fib(10) returns 55, fib(30) returns 832040.',
      'Напишите две рекурсивные функции. factorial(n) возвращает 1 * 2 * ... * n и должна использовать рекурсию с базовым случаем для n <= 1. fib(n) возвращает n-е число Фибоначчи, где fib(0) = 0 и fib(1) = 1, тоже через рекурсию, но она должна запоминать уже вычисленные значения, чтобы fib(30) выполнялся мгновенно. Пример: factorial(5) возвращает 120, factorial(0) возвращает 1, fib(10) возвращает 55, fib(30) возвращает 832040.'
    ),
    hint: L(
      'Every recursive function needs a base case that stops the calls. For fib, store results in a Map or an object and read from it before calculating again.',
      'Каждой рекурсивной функции нужен базовый случай, который останавливает вызовы. Для fib храните результаты в Map или объекте и читайте их до повторного вычисления.'
    ),
    solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const fibCache = new Map();

function fib(n) {
  if (n <= 1) return n;
  if (fibCache.has(n)) return fibCache.get(n);

  const result = fib(n - 1) + fib(n - 2);
  fibCache.set(n, result);
  return result;
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
console.log(fib(10)); // 55
console.log(fib(30)); // 832040`,
    explanation: L(
      'Recursion means a function calls itself with a smaller problem until a base case can be answered directly. In factorial the base case is n <= 1 and the result is multiplied on the way back up the call stack. Plain fibonacci recursion repeats the same work many times, so the cache stores every computed value and turns the exponential number of calls into a linear one.',
      'Рекурсия — это вызов функции самой себя с меньшей задачей, пока не сработает базовый случай. В factorial базовый случай это n <= 1, а результат перемножается при возврате по стеку вызовов. Обычная рекурсия для Фибоначчи многократно повторяет одну и ту же работу, поэтому кеш сохраняет каждое вычисленное значение и превращает экспоненциальное число вызовов в линейное.'
    ),
  },
];
