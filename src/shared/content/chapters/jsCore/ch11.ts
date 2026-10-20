import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh11: Chapter = {
  id: 'js-core-ch11',
  title: L('The event loop, promises and async/await', 'Цикл событий, промисы и async/await'),
  summary: L(
    'How a single threaded runtime schedules work between tasks and microtasks, what a promise actually is, how errors travel through a chain, and how to run things in parallel, cancel them and handle timeouts without leaking.',
    'Как однопоточный рантайм планирует работу между задачами и микрозадачами, что такое промис на самом деле, как ошибки идут по цепочке, и как выполнять задачи параллельно, отменять их и обрабатывать таймауты без утечек.'
  ),
  sections: [
    {
      id: 'js-core-ch11-s1',
      title: L('The call stack, tasks and microtasks', 'Стек вызовов, задачи и микрозадачи'),
      body: L(
        'JavaScript runs your code on a single thread, and the call stack is the list of functions that are currently executing. Calling a function pushes a frame, returning from it pops the frame, and synchronous code runs until the stack is empty. Nothing else can run in between: not a timer, not a click handler, not an incoming network packet. The event loop exists to give that one thread somewhere to wait when there is nothing left to do on the stack.\n\nWaiting happens in two queues. The task queue, sometimes called the macrotask queue, holds callbacks from setTimeout, setInterval and DOM events. The microtask queue holds promise callbacks and queueMicrotask. The rule is short: run the current stack to the end, then drain the entire microtask queue, and only after that take the next task. That is why Promise.resolve().then() runs before a setTimeout(fn, 0) even when the timer was scheduled first.\n\nHeavy synchronous work therefore blocks everything. In the browser it blocks rendering and input handling, which is what the long task and INP metrics measure. In Node it blocks the event loop, so every pending I/O callback waits. The escape is to give the loop a turn: await new Promise(resolve => setTimeout(resolve, 0)) or queueMicrotask. Note that a microtask does not let the browser paint, because microtasks are drained before rendering, so use requestAnimationFrame for work that must happen before the next paint.',
        'JavaScript выполняет код в одном потоке, а стек вызовов — это список функций, которые исполняются прямо сейчас. Вызов функции кладёт в стек кадр, выход из неё снимает кадр, и синхронный код идёт, пока стек не опустеет. Больше в этот момент ничего не может выполняться: ни таймер, ни обработчик клика, ни пришедший по сети пакет. Цикл событий существует именно для того, чтобы дать единственному потоку место для ожидания, когда на стеке больше ничего нет.\n\nОжидание живёт в двух очередях. Очередь задач, её ещё называют очередью макрозадач, хранит колбэки setTimeout, setInterval и событий DOM. Очередь микрозадач хранит колбэки промисов и queueMicrotask. Правило короткое: выполнить текущий стек до конца, затем полностью опустошить очередь микрозадач и только после этого взять следующую задачу. Поэтому Promise.resolve().then() выполняется раньше setTimeout(fn, 0), даже если таймер был запланирован первым. Этот порядок одинаков в браузере и в Node.\n\nПоэтому тяжёлый синхронный код блокирует всё. В браузере он блокирует отрисовку и обработку ввода — именно это измеряют метрики long task и INP. В Node он блокирует цикл событий, так что все ожидающие колбэки ввода-вывода стоят в очереди. Способ вырваться — отдать управление циклу: await new Promise(resolve => setTimeout(resolve, 0)) или queueMicrotask. Учтите, что микрозадача не даёт браузеру отрисовать кадр, потому что микрозадачи опустошаются до отрисовки, поэтому для работы перед следующим кадром используйте requestAnimationFrame.'
      ),
      bullets: [
        L('Synchronous code runs to completion before anything else can start.', 'Синхронный код выполняется до конца, прежде чем начнётся что-либо ещё.'),
        L('Promise callbacks and queueMicrotask go to the microtask queue.', 'Колбэки промисов и queueMicrotask попадают в очередь микрозадач.'),
        L('setTimeout, setInterval and DOM events go to the task queue.', 'setTimeout, setInterval и события DOM попадают в очередь задач.'),
        L('The microtask queue is fully drained before the next task starts.', 'Очередь микрозадач опустошается полностью до старта следующей задачи.'),
        L('A microtask yields to the event loop but not to rendering.', 'Микрозадача отдаёт управление циклу событий, но не отрисовке.'),
        L('requestAnimationFrame callbacks run just before the next paint.', 'Колбэки requestAnimationFrame выполняются непосредственно перед отрисовкой.'),
      ],
      code: `console.log('1 sync');
setTimeout(() => console.log('5 timeout'), 0);
Promise.resolve().then(() => console.log('3 microtask'));
queueMicrotask(() => console.log('4 microtask'));
console.log('2 sync');

// Order: 1 sync, 2 sync, 3 microtask, 4 microtask, 5 timeout

// Yielding control back to the event loop
function yieldToEventLoop() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function work() {
  await yieldToEventLoop();  // timers, IO and rendering get a turn
  return 'done';
}

// requestAnimationFrame is a separate step of the frame, before the paint
requestAnimationFrame(() => console.log('before paint'));`,
      table: {
        caption: L('Where each callback waits', 'Где ждёт каждый колбэк'),
        headers: [L('Callback', 'Колбэк'), L('Queue', 'Очередь'), L('Runs', 'Выполняется')],
        rows: [
          [L('promise.then / catch', 'promise.then / catch'), L('microtask', 'микрозадача'), L('right after the current stack, before any task', 'сразу после текущего стека, до любой задачи')],
          [L('queueMicrotask', 'queueMicrotask'), L('microtask', 'микрозадача'), L('same slot as a promise callback', 'в том же слоте, что и колбэк промиса')],
          [L('setTimeout(fn, 0)', 'setTimeout(fn, 0)'), L('task', 'задача'), L('after the microtask queue is drained', 'после опустошения очереди микрозадач')],
          [L('DOM event handler', 'Обработчик события DOM'), L('task', 'задача'), L('after the microtask queue is drained', 'после опустошения очереди микрозадач')],
          [L('requestAnimationFrame', 'requestAnimationFrame'), L('frame step', 'шаг кадра'), L('just before the next paint', 'непосредственно перед отрисовкой')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Long tasks freeze the interface', 'Длинные задачи подмораживают интерфейс'),
          text: L(
            'A synchronous loop of a few hundred milliseconds blocks rendering and input handling, and the user sees a frozen page. The INP metric measures exactly this delay between an input and the visible reaction to it. Split the work into chunks and yield between them, or move it to a worker.',
            'Синхронный цикл на несколько сотен миллисекунд блокирует отрисовку и обработку ввода, и пользователь видит замерзающую страницу. Метрика INP измеряет именно эту задержку между нажатием и видимой реакцией. Разбейте работу на части и отдавайте управление между ними или вынесите её в воркер.'
          ),
        },
        {
          tone: 'tip',
          title: L('queueMicrotask does not let the browser paint', 'queueMicrotask не даёт браузеру отрисовать кадр'),
          text: L(
            'Microtasks are drained completely before the rendering step, so yielding with queueMicrotask frees the stack but not the frame. To let the browser paint, yield with setTimeout or schedule the work with requestAnimationFrame.',
            'Микрозадачи опустошаются полностью до шага отрисовки, поэтому отступление через queueMicrotask освобождает стек, но не кадр. Чтобы дать браузеру отрисовать, отдавайте управление через setTimeout или планируйте работу через requestAnimationFrame.'
          ),
        },
      ],
      takeaway: L(
        'Synchronous code runs to completion, then all microtasks drain, and only then does the next task start.',
        'Синхронный код выполняется до конца, затем опустошаются все микрозадачи, и только после этого стартует следующая задача.'
      ),
      seeAlso: [
        L('Section 11-2: promises, states and the executor', 'Секция 11-2: промисы, состояния и исполнитель'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch11-s2',
      title: L('Promises: states and the executor', 'Промисы: состояния и исполнитель'),
      body: L(
        'A promise is an object with three internal slots: a state, a value or a reason, and a list of handlers waiting for it. It is created with new Promise(executor), where the executor is a function that receives two callbacks, resolve and reject. The executor runs synchronously, in the same tick as the call to new Promise, which means a side effect placed inside it happens before any then handler could possibly run.\n\nThe state starts as pending and moves exactly once, to fulfilled or to rejected. That transition is irreversible: a settled promise never returns to pending, and its value never changes afterwards. resolve and reject may both be called, or either may be called many times, but only the first call has any effect. This is exactly what makes a promise safe to share: several consumers can attach handlers to the same promise without fighting over its outcome.\n\nthen, catch and finally each return a brand new promise, never the one they were called on. That is the source of the chaining behaviour, because the result of then is what the next link receives. A promise also accepts anything thenable, meaning any object with a then method, and assimilates it, so custom objects and real promises can be mixed freely. Promise.resolve(value) and Promise.reject(reason) are shortcuts for the already-settled cases.',
        'Промис — это объект с тремя внутренними слотами: состояние, значение или причина и список ожидающих обработчиков. Создаётся он через new Promise(executor), где исполнитель — функция, получающая два колбэка, resolve и reject. Исполнитель выполняется синхронно, в том же тике, что и вызов new Promise, поэтому побочный эффект внутри него происходит раньше, чем сможет выполниться любой обработчик then. Именно поэтому в исполнитель кладут только запуск работы, а не её ожидание.\n\nСостояние начинается как pending и меняется ровно один раз — на fulfilled или rejected. Этот переход необратим: разрешённый промис никогда не возвращается в pending, а его значение больше не меняется. resolve и reject могут быть вызваны оба, а любой из них — много раз, но эффект имеет только первый вызов. Именно поэтому промисом безопасно делиться: несколько потребителей могут подписаться на один и тот же промис, не споря о его исходе. Состояние нельзя сбросить, даже если результат не понравился.\n\nthen, catch и finally каждый возвращают совершенно новый промис, а не тот, на котором вызваны. Отсюда и поведение цепочек: результат then получает следующее звено. Промис принимает и любой thenable, то есть любой объект с методом then, и поглощает его, поэтому пользовательские объекты и настоящие промисы можно свободно смешивать. Promise.resolve(value) и Promise.reject(reason) — короткие записи для уже разрешённых случаев. Все обработчики одного промиса выполняются в порядке подписки.'
      ),
      bullets: [
        L('The executor runs synchronously, inside the new Promise call.', 'Исполнитель выполняется синхронно, внутри вызова new Promise.'),
        L('A promise is created in the pending state and settles exactly once.', 'Промис создаётся в состоянии pending и разрешается ровно один раз.'),
        L('The first resolve or reject wins, later calls are ignored.', 'Побеждает первый вызов resolve или reject, последующие игнорируются.'),
        L('A settled promise never returns to pending.', 'Разрешённый промис никогда не возвращается в pending.'),
        L('then, catch and finally always return a new promise.', 'then, catch и finally всегда возвращают новый промис.'),
        L('Promise.resolve assimilates any object with a then method.', 'Promise.resolve assimilates любой объект с методом then.'),
      ],
      code: `const promise = new Promise((resolve) => {
  // the executor runs synchronously, right here
  resolve(JSON.parse('{"id":7}'));
});
promise.then((data) => console.log(data.id)); // 7

let state = 'pending';
new Promise((resolve) => {
  state = 'settled';   // the executor has already run by this line
  resolve();
});
console.log(state);      // 'settled'

const settled = Promise.resolve(42);
settled.then((v) => console.log(v)); // 42, asynchronously

const first = new Promise((resolve) => {
  resolve('winner');
  resolve('ignored');  // only the first resolve counts
});
const thenable = { then(resolve) { resolve('assimilated'); } };
Promise.resolve(thenable).then((v) => console.log(v)); // 'assimilated'`,
      table: {
        caption: L('The three states of a promise', 'Три состояния промиса'),
        headers: [L('State', 'Состояние'), L('Holds', 'Хранит'), L('Handlers', 'Обработчики')],
        rows: [
          [L('pending', 'pending'), L('nothing yet', 'пока ничего'), L('queued until it settles', 'в очереди до разрешения')],
          [L('fulfilled', 'fulfilled'), L('the resolved value', 'значение, которым разрешили'), L('called with the value', 'вызываются со значением')],
          [L('rejected', 'rejected'), L('the rejection reason', 'причина отклонения'), L('skipped, error handlers run', 'пропускаются, работают обработчики ошибок')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Never make the executor async', 'Никогда не делайте исполнитель асинхронным'),
          text: L(
            'new Promise(async (resolve) => { ... }) runs the executor body asynchronously, so an error inside it rejects the promise returned by the async function, which nobody handles, and the outer promise stays pending forever. Keep the executor synchronous and move the async work into a then call.',
            'Конструкция new Promise(async (resolve) => { ... }) выполняет тело исполнителя асинхронно, поэтому ошибка внутри него отклонит промис, возвращённый асинхронной функцией, который никто не обрабатывает, а внешний промис навсегда останется pending. Держите исполнитель синхронным, а асинхронную работу перенесите в then.'
          ),
        },
        {
          tone: 'tip',
          title: L('Resolve with a promise to adopt it', 'Разрешайте промисом, чтобы принять его состояние'),
          text: L(
            'Calling resolve(otherPromise) does not resolve the outer promise with the promise object. The outer promise waits for the inner one and adopts its outcome, including a rejection. That is how you wrap an existing callback API without losing the error path.',
            'Вызов resolve(otherPromise) не разрешает внешний промис объектом промиса. Внешний промис ждёт внутренний и принимает его исход, включая отклонение. Именно так оборачивают существующий callback API, не теряя путь ошибок.'
          ),
        },
      ],
      takeaway: L(
        'A promise settles once and never changes, the executor runs synchronously, and only the first resolve or reject counts.',
        'Промис разрешается один раз и больше не меняется, исполнитель выполняется синхронно, и эффект имеет только первый вызов resolve или reject.'
      ),
      seeAlso: [
        L('Section 11-3: promise chaining and error propagation', 'Секция 11-3: цепочки промисов и распространение ошибок'),
        L('Section 11-1: tasks and microtasks', 'Секция 11-1: задачи и микрозадачи'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch11-s3',
      title: L('Promise chaining and error propagation', 'Цепочки промисов и распространение ошибок'),
      body: L(
        'Every then call produces a new promise that settles with whatever the callback produces. If the callback returns a value, the new promise is fulfilled with it; if the callback returns a promise, the new promise waits for that promise and adopts its outcome; if the callback throws, the new promise is rejected with the thrown error. A rejection therefore travels down the chain until somebody catches it, and it never passes silently through a link that has no error handler.\n\ncatch attaches an error handler to everything above it in the chain, and it can recover: returning a value from catch turns the chain back into a fulfilled one. finally is different, it runs whatever happens, but it neither catches a rejection nor converts it. A rejection passes through finally untouched, and the value of a fulfilled chain is not changed either, unless the finally callback itself returns something, which then replaces the result of the whole chain.\n\nThe whole chain is asynchronous even when the promise is already fulfilled. Calling then on a settled promise schedules the callback as a microtask, so the code after the call always runs first. A rejection that reaches the end of a chain without a handler becomes an unhandled rejection: browsers report it through the unhandledrejection event, and Node can terminate the process depending on how it is configured.',
        'Каждый вызов then создаёт новый промис, который разрешается тем, что произвёл колбэк. Если колбэк возвращает значение, новый промис выполняется с ним; если колбэк возвращает промис, новый промис ждёт его и принимает его исход; если колбэк бросает ошибку, новый промис отклоняется с ней. Поэтому отклонение идёт вниз по цепочке, пока его кто-нибудь не перехватит, и оно никогда не проходит молча через звено без обработчика ошибки. Именно поэтому цепочку можно читать как последовательность шагов, а не как вложенные колбэки.\n\ncatch подключает обработчик ошибки ко всему, что выше него в цепочке, и может восстановить работу: возврат значения из catch превращает цепочку обратно в выполненную. finally ведёт себя иначе, он выполняется при любом исходе, но ни не перехватывает отклонение, ни преобразует его. Отклонение проходит через finally нетронутым, и значение выполненной цепочки тоже не меняется, если только сам колбэк finally ничего не возвращает — а тогда он заменяет результат всей цепочки. Поэтому finally ставят в самый конец, где освобождают ресурсы.\n\nВся цепочка асинхронна, даже если промис уже выполнен. Вызов then у разрешённого промиса планирует колбэк как микрозадачу, поэтому код после вызова всегда выполняется первым. Отклонение, дошедшее до конца цепочки без обработчика, становится необработанным отклонением: браузер сообщает о нём через событие unhandledrejection, а Node в зависимости от настройки может завершить процесс. Проверить это можно одним обработчиком на уровне окна.'
      ),
      bullets: [
        L('A value returned from then becomes the result of the next promise.', 'Значение, возвращённое из then, становится результатом следующего промиса.'),
        L('A throw inside then rejects the promise that the link produced.', 'Бросок внутри then отклоняет промис, созданный этим звеном.'),
        L('catch handles every rejection above it and can recover the chain.', 'catch обрабатывает все отклонения выше себя и может восстановить цепочку.'),
        L('finally observes the outcome but neither catches nor converts it.', 'finally наблюдает исход, но ни не перехватывает, ни преобразует его.'),
        L('then on an already settled promise still runs in a microtask.', 'then у уже разрешённого промиса всё равно выполняется в микрозадаче.'),
        L('A rejection with no handler becomes an unhandled rejection.', 'Отклонение без обработчика становится необработанным отклонением.'),
      ],
      code: `function loadId() {
  return Promise.resolve(7);
}

loadId()
  .then((id) => id * 2)        // the value becomes the next promise result
  .then((doubled) => {
    throw new Error('boom');   // a throw rejects the next promise
  })
  .catch((error) => {
    console.log(error.message); // 'boom'
    return 'recovered';        // catch can recover the chain
  })
  .then((value) => console.log(value))  // 'recovered'
  .finally(() => console.log('always runs'));  // the value is unchanged

Promise.reject(new Error('x'))
  .finally(() => {})
  .catch((e) => console.log('still rejected', e.message));

Promise.resolve(1).then((v) => console.log(v)); // after the current stack`,
      table: {
        caption: L('What each link does with the outcome', 'Что каждое звено делает с исходом'),
        headers: [L('Link', 'Звено'), L('On success', 'При успехе'), L('On failure', 'При ошибке')],
        rows: [
          [L('then(fn)', 'then(fn)'), L('fulfils with the returned value', 'выполняется возвращённым значением'), L('rejects with the thrown error', 'отклоняется брошенной ошибкой')],
          [L('then(fn, onRejected)', 'then(fn, onRejected)'), L('fulfils with the returned value', 'выполняется возвращённым значением'), L('rejects with the returned value', 'отклоняется возвращённым значением')],
          [L('catch(fn)', 'catch(fn)'), L('skipped, the value passes through', 'пропускается, значение проходит дальше'), L('fulfils with the returned value', 'выполняется возвращённым значением')],
          [L('finally(fn)', 'finally(fn)'), L('runs, the value is unchanged', 'выполняется, значение не меняется'), L('runs, the rejection passes through', 'выполняется, отклонение проходит дальше')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('finally is not a catch', 'finally — это не catch'),
          text: L(
            'A finally callback that expects to handle errors will never see them: the rejection is delivered to the next catch, not to finally. If you need to inspect the error, use catch. If you need to run cleanup regardless of the outcome, finally is exactly right.',
            'Колбэк finally, который рассчитывает обработать ошибку, их никогда не увидит: отклонение доставляется следующему catch, а не finally. Если нужно посмотреть на ошибку, используйте catch. Если нужна уборка при любом исходе, finally подходит идеально.'
          ),
        },
        {
          tone: 'warning',
          title: L('Unhandled rejections are silent bugs', 'Необработанные отклонения — тихие баги'),
          text: L(
            'A rejected promise with no handler reports itself through the unhandledrejection event, and in Node the default behaviour is to crash the process. Make sure every chain ends with a catch, and add a global listener in the browser during development to see what actually leaks.',
            'Отклонённый промис без обработчика сообщает о себе через событие unhandledrejection, а в Node поведение по умолчанию — завершить процесс. Следите, чтобы каждая цепочка заканчивалась catch, и добавьте глобальный слушатель в браузере на этапе разработки, чтобы видеть, что именно утекает.'
          ),
        },
      ],
      takeaway: L(
        'Each then creates a new promise, errors travel down the chain to the nearest catch, and finally observes without changing anything.',
        'Каждый then создаёт новый промис, ошибки идут по цепочке к ближайшему catch, а finally наблюдает, ничего не меняя.'
      ),
      seeAlso: [
        L('Section 11-2: promises, states and the executor', 'Секция 11-2: промисы, состояния и исполнитель'),
        L('Section 11-4: async/await and the async function model', 'Секция 11-4: async/await и модель асинхронной функции'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch11-s4',
      title: L('async/await and the async function model', 'async/await и модель асинхронной функции'),
      body: L(
        'An async function always returns a promise, whatever it returns inside. A plain value fulfils that promise, a thrown error rejects it, and there is no way to return a raw value from an async function. await is the other half of the model: it waits for a value and resumes the function afterwards, but the resumption happens in a microtask, so the surrounding code keeps running in the meantime. The thread is never blocked by an await.\n\nBecause await suspends only that one function, an error from the awaited promise is thrown at the await expression and is caught by an ordinary try/catch around it. This is the main reason to prefer async/await over raw then calls: the control flow reads like synchronous code, the stack trace points at the line that actually failed, and there is no need to thread an error handler through every link of a long chain.\n\nTwo mistakes are easy to make. The first is awaiting inside a loop, which runs the iterations one after another and leaves the connection idle in between. The second is forgetting await on a promise that can reject, which leaves a floating promise and produces an unhandled rejection. Top-level await is allowed in ES modules but not in a classic script, so a target that only understands scripts cannot use it.',
        'Асинхронная функция всегда возвращает промис, что бы она ни возвращала внутри. Обычное значение выполняет этот промис, брошенная ошибка его отклоняет, а вернуть «сырое» значение из async-функции невозможно. Вторая половина модели — await: он ждёт значение и затем возобновляет функцию, но возобновление происходит в микрозадаче, поэтому окружающий код всё это время продолжает выполняться. Поток никогда не блокируется на await. Даже await внутри тяжёлого цикла не замораживает интерфейс, если цикл отдаёт управление.\n\nПоскольку await приостанавливает только эту одну функцию, ошибка из ожидаемого промиса бросается в выражении await и перехватывается обычным try/catch вокруг него. Это главная причина предпочитать async/await сырым вызовам then: поток управления читается как синхронный код, в стеке вызовов видно строку, на которой всё сломалось, и не нужно протягивать обработчик ошибки через каждое звено длинной цепочки. Вложенные try/catch при этом работают ровно так же, как в синхронном коде.\n\nДве ошибки встречаются особенно часто. Первая — await внутри цикла: итерации выполняются одна за другой, и соединение простаивает в промежутках. Вторая — забытый await на промисе, который может отклониться: остаётся «висящий» промис и возникает необработанное отклонение. Top-level await разрешён в ES-модулях, но не в обычном скрипте, поэтому цель, понимающая только скрипты, его не поддержит. А третья ошибка — забытый return перед промисом, который теряется вместе с результатом.'
      ),
      bullets: [
        L('An async function always returns a promise.', 'Асинхронная функция всегда возвращает промис.'),
        L('A throw inside an async function rejects the returned promise.', 'Бросок внутри async-функции отклоняет возвращённый промис.'),
        L('await pauses the function, not the thread.', 'await приостанавливает функцию, а не поток.'),
        L('The function resumes in a microtask after the awaited value settles.', 'Функция возобновляется в микрозадаче после разрешения ожидаемого значения.'),
        L('try/catch around an await catches a rejection like any exception.', 'try/catch вокруг await ловит отклонение как любое исключение.'),
        L('await in a loop is sequential, Promise.all is parallel.', 'await в цикле работает последовательно, Promise.all — параллельно.'),
      ],
      code: `async function getUser() {
  return { id: 1 };            // the promise fulfils with this object
}

async function failing() {
  throw new Error('nope');     // the promise rejects
}

async function load() {
  try {
    const user = await getUser();   // the function pauses here
    console.log(user.id);            // 1, one microtask later
    return user;
  } catch (error) {
    return null;                     // a rejection is caught like an exception
  }
}

getUser().then((u) => console.log(u.id)); // 1, asynchronously

// await in a loop is sequential, the requests do not overlap`,
      table: {
        caption: L('The three ways to wait', 'Три способа ждать'),
        headers: [L('Construct', 'Конструкция'), L('Produces', 'Даёт'), L('Error handling', 'Обработка ошибок')],
        rows: [
          [L('async function', 'async function'), L('a promise', 'промис'), L('try/catch inside the body', 'try/catch внутри тела')],
          [L('await value', 'await value'), L('the resolved value', 'разрешённое значение'), L('try/catch around the await', 'try/catch вокруг await')],
          [L('promise.then(fn)', 'promise.then(fn)'), L('a new promise', 'новый промис'), L('a catch further down the chain', 'catch дальше по цепочке')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('await in a loop is sequential', 'await в цикле — это последовательно'),
          text: L(
            'for (const url of urls) { const data = await fetch(url) } performs one request at a time, so ten URLs with a 200 ms latency take two seconds. Start every request first, collect the promises and await Promise.all, or use a pool when the server has a limit.',
            'Цикл for (const url of urls) { const data = await fetch(url) } выполняет запросы по одному, поэтому десять адресов с задержкой 200 мс займут две секунды. Сначала запустите все запросы, соберите промисы и дождитесь Promise.all, либо используйте пул, если у сервера есть лимит.'
          ),
        },
        {
          tone: 'tip',
          title: L('Forgetting await leaves a floating promise', 'Забытый await оставляет висящий промис'),
          text: L(
            'Calling an async function without awaiting it means its rejection has no handler and turns into an unhandled rejection, while the code continues as if nothing happened. Either await it, or return it so the caller owns the result.',
            'Вызов async-функции без await означает, что её отклонение не имеет обработчика и превращается в необработанное, пока код продолжается как ни в чём не бывало. Либо дождитесь её, либо верните её, чтобы результат принадлежал вызывающему коду.'
          ),
        },
      ],
      takeaway: L(
        'async/await is syntax over promises: an async function always returns a promise, and await pauses that function only, never the thread.',
        'async/await — это синтаксис поверх промисов: async-функция всегда возвращает промис, а await приостанавливает только её саму, никогда не поток.'
      ),
      seeAlso: [
        L('Section 11-5: parallelism with all, allSettled, any and race', 'Секция 11-5: параллелизм с all, allSettled, any и race'),
        L('Section 11-3: promise chaining and error propagation', 'Секция 11-3: цепочки промисов и распространение ошибок'),
        L('Section 11-6: cancellation, timeouts and AbortController', 'Секция 11-6: отмена, таймауты и AbortController'),
      ],
    },
    {
      id: 'js-core-ch11-s5',
      title: L('Parallelism: all, allSettled, any and race', 'Параллелизм: all, allSettled, any и race'),
      body: L(
        'Promise.all starts every input at once and fulfils with an array of the results in the order of the input, not in the order of completion. If one input rejects, the aggregate rejects immediately with that reason and the other results are lost, even though the other operations keep running and still consume resources. Promise.allSettled never rejects: it always fulfils with an array of objects that report either a status of fulfilled with a value or a status of rejected with a reason, so no information is lost.\n\nPromise.any is the mirror image of Promise.race. It fulfils with the first fulfilled result and ignores rejections entirely, and only if every input rejects does it reject with an AggregateError that carries all the reasons. That makes it the right tool for redundant sources: ask several mirrors for the same image and take the first that answers. Promise.race instead settles with whichever promise settles first, fulfilled or rejected, which is why it is the usual shape of a timeout.\n\nThe choice comes down to what a failure means. When every input must succeed, all is the honest tool. When partial failure is acceptable and the individual results still matter, allSettled gives the full picture without a single try/catch. When several sources are interchangeable, any picks the first success. And when the real problem is the wait itself, race compares the work against a timer, remembering that the loser is not cancelled.',
        'Promise.all запускает все входные промисы одновременно и выполняется массивом результатов в порядке входа, а не в порядке завершения. Если один вход отклоняется, агрегат сразу отклоняется с этой причиной, а остальные результаты теряются, хотя остальные операции продолжают выполняться и по-прежнему потребляют ресурсы. Promise.allSettled не отклоняется никогда: он всегда выполняется массивом объектов, где у каждого либо статус fulfilled со значением, либо статус rejected с причиной, так что ничего не теряется. Порядок входа, а не порядок ответа, — важная деталь: ответы могут приходить в любом порядке.\n\nPromise.any — зеркальное отражение Promise.race. Он выполняется первым успешным результатом и полностью игнорирует отклонения, и только если отклонились все входные, он отклоняется с AggregateError, несущим все причины. Это делает его верным инструментом для избыточных источников: спросите несколько зеркал об одном изображении и возьмите первое ответившее. Promise.race, наоборот, разрешается тем, кто разрешится первым, выполнением или отклонением, и поэтому он — обычная форма таймаута. Разница между any и race — одна строка кода, но меняет смысл всей конструкции.\n\nВыбор сводится к смыслу отказа. Когда все входные обязаны успешно завершиться, честный инструмент — all. Когда частичный отказ допустим и отдельные результаты важны, allSettled даёт полную картину без единого try/catch. Когда источники взаимозаменяемы, any берёт первый успех. А когда проблема в самом ожидании, race сравнивает работу с таймером, помня, что проигравший не отменяется. Ошибки, которые приходят в allSettled, разбирают по месту, а не одним общим catch.'
      ),
      bullets: [
        L('Promise.all fulfils with results in input order, not completion order.', 'Promise.all выполняется результатами в порядке входа, а не завершения.'),
        L('Promise.all rejects with the first reason and discards the other results.', 'Promise.all отклоняется с первой причиной и выбрасывает остальные результаты.'),
        L('Promise.allSettled always fulfils and reports a status per input.', 'Promise.allSettled всегда выполняется и сообщает статус по каждому входу.'),
        L('Promise.any fulfils with the first success and rejects with AggregateError if all fail.', 'Promise.any выполняется первым успехом и отклоняется с AggregateError, если упали все.'),
        L('Promise.race settles with whichever promise settles first, either way.', 'Promise.race разрешается тем, кто разрешится первым, в любом случае.'),
        L('A rejection in Promise.all does not cancel the other operations.', 'Отклонение в Promise.all не отменяет остальные операции.'),
      ],
      code: `const load = (id, delay) => new Promise((resolve) => {
  setTimeout(() => resolve(\`item \${id}\`), delay);
});

const results = await Promise.all([load(1, 50), load(2, 10)]);
// ['item 1', 'item 2'] - always in input order

const settled = await Promise.allSettled([load(1, 10), Promise.reject(new Error('x'))]);
// [{ status: 'fulfilled', value: 'item 1' },
//  { status: 'rejected', reason: Error('x') }]

const first = await Promise.any([Promise.reject(new Error('a')), load(3, 10)]);
// 'item 3' - a rejection does not win the race

try {
  await Promise.any([Promise.reject(new Error('a'))]);
} catch (error) {
  console.log(error.name); // 'AggregateError'
}`,
      table: {
        caption: L('Choosing the right combinator', 'Выбор правильного комбинатора'),
        headers: [L('Method', 'Метод'), L('On rejection', 'При отклонении'), L('Result', 'Результат'), L('Use when', 'Когда применять')],
        rows: [
          [L('Promise.all', 'Promise.all'), L('rejects with the first error', 'отклоняется с первой ошибкой'), L('array of values, input order', 'массив значений в порядке входа'), L('every input must succeed', 'все входы обязаны успешно завершиться')],
          [L('Promise.allSettled', 'Promise.allSettled'), L('never rejects', 'никогда не отклоняется'), L('array of statuses and values', 'массив статусов и значений'), L('partial failure is acceptable', 'частичный отказ допустим')],
          [L('Promise.any', 'Promise.any'), L('rejects with AggregateError if all fail', 'отклоняется с AggregateError, если упали все'), L('the first fulfilled value', 'первое успешное значение'), L('interchangeable sources or fallbacks', 'взаимозаменяемые источники или запасные варианты')],
          [L('Promise.race', 'Promise.race'), L('rejects if the first one fails', 'отклоняется, если первый упал'), L('the first settled value', 'первое разрешённое значение'), L('timeouts and cancellation', 'таймауты и отмена')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Promise.all does not cancel the losers', 'Promise.all не отменяет проигравших'),
          text: L(
            'The first rejection rejects the aggregate, but the remaining operations keep running and keep consuming bandwidth, CPU and server capacity. If the work matters and must stop, drive all the calls with one AbortController and abort it from a catch handler.',
            'Первое отклонение отклоняет агрегат, но остальные операции продолжают выполняться и потребляют канал, процессор и ресурсы сервера. Если работа важна и должна остановиться, ведите все вызовы через один AbortController и отменяйте его из обработчика catch.'
          ),
        },
        {
          tone: 'tip',
          title: L('allSettled for dashboards, any for fallbacks', 'allSettled для дашбордов, any для запасных вариантов'),
          text: L(
            'A settings screen that loads five independent sections should use allSettled, so one broken section does not blank the page. A widget that can read from a cache, a server or a stale copy should use any, because a failure in one source must not end the attempt.',
            'Экран настроек, который загружает пять независимых секций, должен использовать allSettled, чтобы одна сломанная секция не обнуляла страницу. Виджет, который умеет читать из кэша, с сервера или из устаревшей копии, должен использовать any, потому что отказ одного источника не должен заканчивать попытку.'
          ),
        },
      ],
      takeaway: L(
        'Pick all when everything must succeed, allSettled when partial failure is fine, any for interchangeable sources, and race only for timeouts.',
        'Выбирайте all, когда всё должно успешно завершиться, allSettled — когда частичный отказ допустим, any — для взаимозаменяемых источников, а race — только для таймаутов.'
      ),
      seeAlso: [
        L('Section 11-6: cancellation, timeouts and AbortController', 'Секция 11-6: отмена, таймауты и AbortController'),
        L('Section 11-4: async/await and the async function model', 'Секция 11-4: async/await и модель асинхронной функции'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
      ],
    },
    {
      id: 'js-core-ch11-s6',
      title: L('Cancellation, timeouts and AbortController', 'Отмена, таймауты и AbortController'),
      body: L(
        'Promises cannot be cancelled. A setTimeout callback cannot be taken back, and a request that is already on the wire cannot be abandoned through the promise API. Promise.race against a timer is the common workaround: the race rejects with a timeout error, but the original work keeps running and can still write to the DOM, fill a cache or hold a connection slot long after the caller gave up.\n\nAbortController is the standard answer. It produces a signal that you hand to fetch and to any other API that accepts one, and calling abort() makes the operation reject with an AbortError. AbortSignal.timeout(ms) builds a signal that aborts itself after the given delay, and AbortSignal.any([a, b]) combines several sources into one, so a request can be cancelled by a timeout and by a user action at the same time.\n\nCancellation is cooperative and one-sided. abort() tells the operation to stop waiting; it does not roll back anything that already happened, and the server may well have processed the request and charged the card. Long-running loops must check signal.aborted at safe points, and in React the cleanup function of the effect has to abort the request, otherwise a late response can update a component that is already unmounted.',
        'Промисы нельзя отменить. Колбэк setTimeout нельзя вернуть, а запрос, уже ушедший в сеть, нельзя бросить через API промисов. Promise.race с таймером — обычный обходной путь: гонка отклоняется с ошибкой таймаута, но исходная работа продолжается и всё ещё может писать в DOM, заполнять кэш или держать слот соединения спустя долгое время после того, как вызывающий отказался. Обещанная отмена и фактическая отмена — разные вещи, и путаница между ними стоит дорого.\n\nAbortController — стандартный ответ. Он создаёт сигнал, который передают fetch и любому другому API, принимающему сигнал, а вызов abort() заставляет операцию отклониться с AbortError. AbortSignal.timeout(ms) собирает сигнал, который отменяет сам себя через указанную задержку, а AbortSignal.any([a, b]) объединяет несколько источников в один, так что запрос можно отменить и по таймауту, и действием пользователя одновременно. Сигнал можно передать и вниз по цепочке функций, чтобы отмена дошла до всех уровней.\n\nОтмена кооперативна и односторонняя. abort() говорит операции перестать ждать; она ничего не откатывает из уже сделанного, и сервер вполне мог обработать запрос и списать деньги. Длинные циклы должны проверять signal.aborted в безопасных точках, а в React функция очистки эффекта обязана отменять запрос, иначе поздний ответ может обновить компонент, который уже размонтирован. Проверка aborted внутри цикла — единственный способ остановить работу, которая идёт в цикле.'
      ),
      bullets: [
        L('A promise cannot be cancelled, and setTimeout cannot be cleared from the promise API.', 'Промис нельзя отменить, а setTimeout нельзя сбросить через API промисов.'),
        L('Promise.race with a timer stops the waiting but not the work.', 'Promise.race с таймером останавливает ожидание, но не саму работу.'),
        L('AbortController.abort() makes the operation reject with an AbortError.', 'AbortController.abort() заставляет операцию отклониться с AbortError.'),
        L('AbortSignal.timeout(ms) creates a signal that aborts itself.', 'AbortSignal.timeout(ms) создаёт сигнал, который отменяет сам себя.'),
        L('AbortSignal.any([a, b]) merges several cancellation sources into one.', 'AbortSignal.any([a, b]) объединяет несколько источников отмены в один.'),
        L('Aborting does not undo work that already reached the server.', 'Отмена не откатывает работу, которая уже дошла до сервера.'),
      ],
      code: `const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/report', { signal: controller.signal });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('request cancelled');
  }
  throw error;
} finally {
  clearTimeout(timer);  // otherwise the timer keeps the event loop alive
}

const signal = AbortSignal.timeout(3000);
const data = await fetch('/api/slow', { signal }).then((r) => r.json());`,
      table: {
        caption: L('Ways to stop waiting', 'Способы перестать ждать'),
        headers: [L('Mechanism', 'Механизм'), L('Stops the work', 'Останавливает работу'), L('Stops the request', 'Прерывает запрос')],
        rows: [
          [L('Promise.race with a timeout', 'Promise.race с таймером'), L('no, only the waiting', 'нет, только ожидание'), L('no', 'нет')],
          [L('controller.abort()', 'controller.abort()'), L('yes, when the signal is honoured', 'да, если сигнал соблюдается'), L('yes, the connection is dropped', 'да, соединение разрывается')],
          [L('AbortSignal.timeout(ms)', 'AbortSignal.timeout(ms)'), L('yes, automatically after ms', 'да, автоматически через ms'), L('yes', 'да')],
          [L('clearTimeout(id)', 'clearTimeout(id)'), L('yes, the timer only', 'да, только таймер'), L('not applicable', 'не применимо')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Aborting does not undo the server side', 'Отмена не отменяет серверную часть'),
          text: L(
            'Abort stops the client from waiting; it does not recall the request. If the server already charged the card or sent the email, the damage is done and the user will never learn about it. Cancellation is a promise to stop listening, so it belongs next to the business logic that decides whether the operation was still wanted.',
            'Отмена прекращает ожидание на клиенте, но не отзывает запрос. Если сервер уже списал деньги или отправил письмо, ущерб уже нанесён, и пользователь об этом не узнает. Отмена — это обещание перестать слушать, поэтому её стоит ставить рядом с бизнес-логикой, решающей, нужна ли операция вообще.'
          ),
        },
        {
          tone: 'tip',
          title: L('Clean up in React effects', 'Уборка в эффектах React'),
          text: L(
            'Return a cleanup function from the effect that aborts the request, or check signal.aborted before every setState call. Without that guard a slow response can arrive after the component is gone and update state on an unmounted component, which is at best a warning and at worst a memory leak.',
            'Верните из эффекта функцию очистки, которая отменяет запрос, или проверяйте signal.aborted перед каждым вызовом setState. Без такой проверки медленный ответ может прийти после того, как компонент исчез, и обновить состояние размонтированного компонента, что как минимум даёт предупреждение, а как максимум — утечку памяти.'
          ),
        },
      ],
      takeaway: L(
        'Use AbortController for anything that can be cancelled, remember that abort does not undo server side work, and always clear the timeout.',
        'Используйте AbortController для всего, что можно отменить, помните, что отмена не откатывает серверную работу, и всегда сбрасывайте таймаут.'
      ),
      seeAlso: [
        L('Section 11-5: parallelism with all, allSettled, any and race', 'Секция 11-5: параллелизм с all, allSettled, any и race'),
        L('Section 11-4: async/await and the async function model', 'Секция 11-4: async/await и модель асинхронной функции'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
      ],
    },
  ],
};
