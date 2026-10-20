import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const asyncTasks: PracticeTask[] = [
  {
    id: 'topic-async-1',
    moduleId: 'js-core',
    topic: 'async',
    level: 'basic',
    title: L('Build a promise chain', 'Собрать цепочку промисов'),
    brief: L(
      'Write a function chain() that returns a promise resolving to the array ["a", "b", "c"]. Build it with a chain of .then() calls: the first promise resolves with ["a"], every next .then() receives the array from the previous step and appends one more letter to it. Example: chain().then((letters) => console.log(letters)) logs [ "a", "b", "c" ].',
      'Напишите функцию chain(), которая возвращает промис, разрешающийся массивом ["a", "b", "c"]. Соберите её цепочкой вызовов .then(): первый промис разрешается с ["a"], каждый следующий .then() получает массив с предыдущего шага и добавляет к нему ещё одну букву. Пример: chain().then((letters) => console.log(letters)) печатает [ "a", "b", "c" ].'
    ),
    hint: L(
      'Start from Promise.resolve(["a"]) and add three .then() calls, each one returning a new array with one more letter.',
      'Начните с Promise.resolve(["a"]) и добавьте три вызова .then(), каждый возвращает новый массив с одной буквой больше.'
    ),
    solution: `function chain() {
  return Promise.resolve(['a'])
    .then((letters) => letters.concat('b'))
    .then((letters) => letters.concat('c'));
}

chain().then((letters) => {
  console.log(letters); // [ 'a', 'b', 'c' ]
});`,
    explanation: L(
      'Every then() receives the value the previous step resolved with, so the data travels down the chain without any shared variable. concat() creates a new array instead of changing the old one, which keeps the steps independent of each other. The whole chain is a single expression, and the value of the last then() is the value of the promise that chain() returns.',
      'Каждый then() получает значение, с которым разрешился предыдущий шаг, поэтому данные идут по цепочке без общих переменных. concat() создаёт новый массив, а не меняет старый, и шаги не зависят друг от друга. Вся цепочка — одно выражение, а значение последнего then() и есть значение промиса, который возвращает chain().'
    ),
  },
  {
    id: 'topic-async-2',
    moduleId: 'js-core',
    topic: 'async',
    level: 'basic',
    title: L('Sequential versus parallel work', 'Последовательно или параллельно'),
    brief: L(
      'Use a helper delay(value, ms) that resolves with the value after ms milliseconds. Write two functions. runSequential() awaits three delays of 100 ms one after another, so it takes about 300 ms. runParallel() starts three delays of 100 ms at the same time and awaits them together with Promise.all, so it takes about 100 ms. Each function returns the elapsed time in milliseconds measured with Date.now(). Example: runParallel() returns about 100 and runSequential() returns about 300.',
      'Используйте помощник delay(value, ms), который разрешается со значением через ms миллисекунд. Напишите две функции. runSequential() ждёт три задержки по 100 ms одну за другой, поэтому занимает около 300 ms. runParallel() запускает три задержки по 100 ms одновременно и ждёт их вместе через Promise.all, поэтому занимает около 100 ms. Каждая функция возвращает затраченное время в миллисекундах, измеренное через Date.now(). Пример: runParallel() возвращает около 100, а runSequential() около 300.'
    ),
    hint: L(
      'Await puts the next line on hold until the promise settles, while Promise.all starts everything at once and waits for all of them.',
      'Await откладывает следующую строку до разрешения промиса, а Promise.all запускает всё сразу и ждёт всех сразу.'
    ),
    solution: `function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function runSequential() {
  const started = Date.now();
  await delay('a', 100);
  await delay('b', 100);
  await delay('c', 100);
  return Date.now() - started;
}

async function runParallel() {
  const started = Date.now();
  await Promise.all([delay('a', 100), delay('b', 100), delay('c', 100)]);
  return Date.now() - started;
}

(async () => {
  console.log(await runSequential()); // about 300
  console.log(await runParallel()); // about 100
})();`,
    explanation: L(
      'The three delays in runSequential never overlap: each await blocks the function until the previous promise settles, so the total time is the sum of the delays. In runParallel all three promises are created before the await, so their timers are started together and the total time is the longest delay. This is the main reason to reach for Promise.all: the work is the same, but the waiting is not.',
      'Три задержки в runSequential никогда не пересекаются: каждый await держит функцию, пока не разрешится предыдущий промис, поэтому общее время равно сумме задержек. В runParallel все три промиса создаются до await, их таймеры стартуют вместе, и общее время равно самой длинной задержке. Это главная причина использовать Promise.all: работа та же, а ожидание другое.'
    ),
  },
  {
    id: 'topic-async-3',
    moduleId: 'js-core',
    topic: 'async',
    level: 'basic',
    title: L('Propagate and catch errors', 'Пробросить и поймать ошибку'),
    brief: L(
      'Write a function step(value) that returns a promise resolving with the value, except for the value "bad", when it rejects with the Error "Step failed". Then write a function run(value) that chains three steps, each one appending "!" to the string, and catches the error at the end and returns its message, so a rejection never escapes the function. Example: run("ok") returns "ok!!!", run("bad") returns "Step failed".',
      'Напишите функцию step(value), которая возвращает промис, разрешающийся со значением, кроме значения "bad" — для него промис отклоняется с Error "Step failed". Затем напишите функцию run(value), которая выстраивает цепочку из трёх шагов, каждый добавляет к строке "!", а в конце ловит ошибку и возвращает её сообщение, так что отклонение никогда не выходит наружу. Пример: run("ok") возвращает "ok!!!", run("bad") возвращает "Step failed".'
    ),
    hint: L(
      'A rejection skips all the remaining then() calls and goes straight to the catch, so put the catch at the end of the chain.',
      'Отклонение пропускает все оставшиеся вызовы then() и сразу уходит в catch, поэтому catch ставится в конец цепочки.'
    ),
    solution: `function step(value) {
  return value === 'bad'
    ? Promise.reject(new Error('Step failed'))
    : Promise.resolve(value);
}

function run(value) {
  return step(value)
    .then((result) => step(result + '!'))
    .then((result) => step(result + '!'))
    .then((result) => step(result + '!'))
    .catch((error) => error.message);
}

run('ok').then((result) => console.log(result)); // ok!!!
run('bad').then((result) => console.log(result)); // Step failed`,
    explanation: L(
      'A rejected promise does not travel to the next then(), it jumps over all of them and lands in the first catch. That is why run("bad") never reaches the steps that would add the exclamation marks, while run("ok") walks through all three of them. Because the catch is a part of the chain, the function always resolves with a string, and the caller never has to deal with a rejected promise.',
      'Отклонённый промис не уходит в следующий then(), он перепрыгивает все их и попадает в первый catch. Поэтому run("bad") не доходит до шагов, которые добавили бы восклицательные знаки, а run("ok") проходит все три. Так как catch является частью цепочки, функция всегда разрешается строкой, и вызывающему код никогда не приходится иметь дело с отклонённым промисом.'
    ),
  },
  {
    id: 'topic-async-4',
    moduleId: 'js-core',
    topic: 'async',
    level: 'intermediate',
    title: L('Add a timeout with Promise.race', 'Добавить таймаут через Promise.race'),
    brief: L(
      'Write a function withTimeout(promise, ms) that returns the promise when it settles in time, and rejects with the Error "Timeout" when the time runs out first. The original promise keeps running in the background, the race only decides which result wins. Example: withTimeout(delay("ok", 50), 200) resolves with "ok", withTimeout(delay("slow", 500), 100) rejects with an Error whose message is "Timeout".',
      'Напишите функцию withTimeout(promise, ms), которая возвращает промис, если он успевает разрешиться, и отклоняется с Error "Timeout", если время вышло раньше. Исходный промис при этом продолжает работать в фоне, а гонка только решает, чей результат победит. Пример: withTimeout(delay("ok", 50), 200) разрешается со значением "ok", withTimeout(delay("slow", 500), 100) отклоняется с Error, сообщение которого — "Timeout".'
    ),
    hint: L(
      'Create a second promise that rejects after ms milliseconds and pass both promises to Promise.race, which settles with the first one.',
      'Создайте второй промис, который отклоняется через ms миллисекунд, и передайте оба промиса в Promise.race — он завершится с первым из них.'
    ),
    solution: `function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });

  return Promise.race([promise, timeout]);
}

withTimeout(delay('ok', 50), 200).then((value) => {
  console.log(value); // ok
});

withTimeout(delay('slow', 500), 100).catch((error) => {
  console.log(error.message); // Timeout
});`,
    explanation: L(
      'Promise.race settles with the first of its promises that settles, no matter whether it resolves or rejects. The timeout promise is created with an executor whose resolve function is never used, because its only job is to reject later. The original promise is not cancelled: the timer inside it keeps running, but its result is already ignored, because the race has a winner.',
      'Promise.race завершается с первым из своих промисов, который завершился, независимо от того, разрешился он или отклонился. Промис-таймаут создаётся с исполнителем, у которого функция resolve не используется: его единственная задача — отклониться позже. Исходный промис при этом не отменяется: таймер внутри него продолжает крутиться, но его результат уже никому не нужен, потому что победитель гонки уже определён.'
    ),
  },
  {
    id: 'topic-async-5',
    moduleId: 'js-core',
    topic: 'async',
    level: 'intermediate',
    title: L('Run a queue one by one', 'Выполнить очередь по очереди'),
    brief: L(
      'Write a function runInOrder(tasks) where tasks is an array of functions that return promises. The function must run the tasks one after another, never two at the same time, and return an array of the resolved values in the order of the tasks, even when a later task finishes faster. Example: runInOrder([() => delay("a", 30), () => delay("b", 10)]) resolves with [ "a", "b" ], because the second task only starts after the first one is done.',
      'Напишите функцию runInOrder(tasks), где tasks — массив функций, возвращающих промисы. Функция должна выполнять задачи по одной, никогда не две одновременно, и возвращать массив разрешённых значений в порядке задач, даже если более поздняя задача завершится быстрее. Пример: runInOrder([() => delay("a", 30), () => delay("b", 10)]) разрешается с [ "a", "b" ], потому что вторая задача начинается только после первой.'
    ),
    hint: L(
      'Use a for...of loop with await inside: the loop body waits for every task, so the next one starts only when the previous promise has settled.',
      'Используйте цикл for...of с await внутри: тело цикла ждёт каждую задачу, поэтому следующая начинается только после того, как предыдущий промис разрешится.'
    ),
    solution: `function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function runInOrder(tasks) {
  const results = [];

  for (const task of tasks) {
    results.push(await task());
  }

  return results;
}

runInOrder([() => delay('a', 30), () => delay('b', 10)]).then((results) => {
  console.log(results); // [ 'a', 'b' ]
});`,
    explanation: L(
      'The for...of loop is the sequential version of Promise.all: the await inside the body suspends the function until the task is finished, so the next iteration starts afterwards. The results are pushed in the loop order, not in the finishing order, which is why the slow first task still ends up first in the array. Nothing runs at the same time, so a task that is not safe to run in parallel is safe here.',
      'Цикл for...of — это последовательная версия Promise.all: await внутри тела приостанавливает функцию до конца задачи, поэтому следующая итерация начинается позже. Результаты добавляются в порядке цикла, а не в порядке завершения, поэтому медленная первая задача всё равно оказывается первой в массиве. Ничего не выполняется одновременно, поэтому задача, которой нельзя работать параллельно, здесь в безопасности.'
    ),
  },
  {
    id: 'topic-async-6',
    moduleId: 'js-core',
    topic: 'async',
    level: 'advanced',
    title: L('Batch with a concurrency limit', 'Пакетная обработка с лимитом параллелизма'),
    brief: L(
      'Write a function runWithLimit(tasks, limit) that runs the tasks with at most limit of them running at the same time, and returns an array of the results in the order of the tasks. When limit is smaller than one, treat it as one. Example: runWithLimit([() => delay("a", 30), () => delay("b", 10), () => delay("c", 20)], 2) resolves with [ "a", "b", "c" ] and never has more than two tasks running at the same time.',
      'Напишите функцию runWithLimit(tasks, limit), которая выполняет задачи так, что одновременно работает не больше limit из них, и возвращает массив результатов в порядке задач. Если limit меньше единицы, считайте его равным единице. Пример: runWithLimit([() => delay("a", 30), () => delay("b", 10), () => delay("c", 20)], 2) разрешается с [ "a", "b", "c" ], и одновременно никогда не работает больше двух задач.'
    ),
    hint: L(
      'Start a fixed number of workers, each one taking the next free task from a shared counter and awaiting it. The result array is written by index, so the order does not depend on the finishing order.',
      'Запустите фиксированное число воркеров, каждый берёт следующую свободную задачу из общего счётчика и ждёт её. Массив результатов пишется по индексу, поэтому порядок не зависит от порядка завершения.'
    ),
    solution: `function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function runWithLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const index = next;
      next += 1;
      results[index] = await tasks[index]();
    }
  }

  const size = Math.max(1, Math.min(limit, tasks.length));
  const workers = [];
  for (let i = 0; i < size; i += 1) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}

runWithLimit([() => delay('a', 30), () => delay('b', 10), () => delay('c', 20)], 2).then((results) => {
  console.log(results); // [ 'a', 'b', 'c' ]
});`,
    explanation: L(
      'The number of workers is the limit, and every worker keeps taking tasks until there are none left, so the pool never grows but never idles either. The counter is read and incremented before the await, so two workers can never pick the same task. The results are stored by index instead of being pushed, therefore a task that finishes first does not jump to the front of the array.',
      'Число воркеров — это и есть лимит, и каждый воркер берёт задачи, пока они не кончатся, поэтому пул не растёт, но и не простаивает. Счётчик читается и увеличивается до await, так что два воркера никогда не возьмут одну и ту же задачу. Результаты пишутся по индексу, а не добавляются в конец, поэтому задача, которая завершилась первой, не оказывается в начале массива.'
    ),
  },
  {
    id: 'topic-async-7',
    moduleId: 'js-core',
    topic: 'async',
    level: 'advanced',
    title: L('Retry with a backoff', 'Повтор с задержкой'),
    brief: L(
      'Write a function withRetry(task, attempts, delayMs) that calls the task and, when it rejects, waits delayMs milliseconds and tries again, up to attempts times in total. The waiting time doubles after every failed attempt. When all the attempts are used up, the function must reject with the last error. The task receives the number of the current attempt as its argument. Example: a task that fails twice and then succeeds resolves with its value, a task that always fails rejects with the message of the last error.',
      'Напишите функцию withRetry(task, attempts, delayMs), которая вызывает задачу и, если тот отклоняется, ждёт delayMs миллисекунд и пробует снова, всего не больше attempts раз. Время ожидания удваивается после каждой неудачной попытки. Когда попытки закончились, функция должна отклониться с последней ошибкой. Задача получает номер текущей попытки своим аргументом. Пример: задача, которая два раза падает, а потом успевает, разрешается со своим значением, а задача, которая падает всегда, отклоняется с сообщением последней ошибки.'
    ),
    hint: L(
      'Use a loop over the attempts, try and catch around the await, and multiply the waiting time by two after every failure. Rethrow the last error when the loop ends.',
      'Используйте цикл по попыткам, try и catch вокруг await и умножайте время ожидания на два после каждой неудачи. Выбросьте последнюю ошибку, когда цикл закончится.'
    ),
    solution: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(task, attempts, delayMs) {
  if (attempts < 1) {
    throw new Error('No attempts left');
  }

  let lastError;
  let waitTime = delayMs;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task(attempt);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      await wait(waitTime);
      waitTime *= 2;
    }
  }

  throw lastError;
}

let calls = 0;
async function flaky() {
  calls += 1;
  if (calls < 3) throw new Error('failed');
  return 'ok';
}

withRetry(flaky, 5, 10).then((value) => {
  console.log(value, calls); // ok 3
});

withRetry(async () => {
  throw new Error('always down');
}, 2, 10).catch((error) => {
  console.log(error.message); // always down
});`,
    explanation: L(
      'The loop is the retry mechanism: every iteration is one attempt, and the try block holds the call that can fail. When the call rejects the error is remembered and the function waits, and the wait time is doubled so that a service that is down is not hammered with requests. The last attempt does not wait, it breaks out of the loop and rethrows the stored error, so the caller sees the real reason of the failure.',
      'Цикл и есть механизм повторов: каждая итерация — одна попытка, а внутри try лежит вызов, который может упасть. Когда вызов отклоняется, ошибка запоминается, функция ждёт, и время ожидания удваивается, чтобы упавший сервис не засыпали запросами. Последняя попытка не ждёт, а выходит из цикла и выбрасывает сохранённую ошибку, поэтому вызывающий код видит настоящую причину сбоя.'
    ),
  },
  {
    id: 'topic-async-8',
    moduleId: 'js-core',
    topic: 'async',
    level: 'advanced',
    title: L('Predict the event loop order', 'Предсказать порядок событийного цикла'),
    brief: L(
      'Write a script that logs the order in which the tasks run. Put the labels into an array and print them in one line at the end. Schedule four things: a synchronous log, a setTimeout with a delay of 0, a callback from Promise.resolve().then(), and a second setTimeout with a delay of 0. Example: the order is sync, promise, timeout 1, timeout 2, because the microtask queue is drained before the timers of the next tick.',
      'Напишите скрипт, который печатает порядок выполнения задач. Складывайте подписи в массив и в конце печатайте их одной строкой. Запланируйте четыре вещи: синхронный лог, setTimeout с задержкой 0, колбэк из Promise.resolve().then() и второй setTimeout с задержкой 0. Пример: порядок будет sync, promise, timeout 1, timeout 2, потому что очередь микрозадач опустошается до таймеров следующего тика.'
    ),
    hint: L(
      'Synchronous code runs first, then the microtask queue is drained completely, and only after that the timers of the next tick run in the order they were registered.',
      'Сначала выполняется синхронный код, затем полностью опустошается очередь микрозадач, и только после этого таймеры следующего тика идут в порядке регистрации.'
    ),
    solution: `const order = [];

order.push('sync');

setTimeout(() => {
  order.push('timeout 1');
}, 0);

Promise.resolve().then(() => {
  order.push('promise');
});

setTimeout(() => {
  order.push('timeout 2');
}, 0);

setTimeout(() => {
  console.log(order.join(' -> ')); // sync -> promise -> timeout 1 -> timeout 2
}, 10);`,
    explanation: L(
      'The synchronous part of the script runs to the end before anything else happens, so "sync" is the first label. The callback of Promise.resolve().then() is a microtask, and microtasks are drained completely right after the current script finishes, so "promise" comes before any timer. The two timers wait for the next tick of the event loop and run in the order they were registered, which gives "timeout 1" and then "timeout 2". The last timer with a delay of 10 prints the result after everything else has been added.',
      'Синхронная часть скрипта выполняется до конца раньше всего остального, поэтому первой идёт подпись "sync". Колбэк из Promise.resolve().then() — это микрозадача, а микрозадачи полностью опустошаются сразу после текущего скрипта, поэтому "promise" идёт раньше любого таймера. Два таймера ждут следующего тика событийного цикла и выполняются в порядке регистрации, отсюда "timeout 1", а затем "timeout 2". Последний таймер с задержкой 10 печатает результат после того, как всё остальное добавлено.'
    ),
  },
];
