import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const errorsTasks: PracticeTask[] = [
  {
    id: 'topic-errors-1',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'basic',
    title: L('Build a custom error with a cause', 'Свой класс ошибки с причиной'),
    brief: L(
      'Write a class AppError extends Error with the constructor AppError(message, code, cause). Every instance has the name "AppError", the given message, the given code in the property code, and the given cause in the property cause. The cause property must be left out completely when no cause is passed, so that "cause" in error is false. The class must work with instanceof Error and with instanceof AppError. Example: new AppError("Not found", "E_NOT_FOUND", new Error("no row")) has the name "AppError", the message "Not found", the code "E_NOT_FOUND" and the cause with the message "no row".',
      'Напишите класс AppError extends Error с конструктором AppError(message, code, cause). У каждого экземпляра есть имя "AppError", переданное сообщение, переданный код в свойстве code и переданная причина в свойстве cause. Свойство cause должно полностью отсутствовать, когда причина не передана, чтобы "cause" in error было false. Класс должен работать с instanceof Error и с instanceof AppError. Пример: new AppError("Not found", "E_NOT_FOUND", new Error("no row")) имеет имя "AppError", сообщение "Not found", код "E_NOT_FOUND" и причину с сообщением "no row".'
    ),
    hint: L(
      'Call super(message, { cause }) so that the standard cause property is filled, and set this.name after the super call.',
      'Вызовите super(message, { cause }), чтобы стандартное свойство cause заполнилось, и присвойте this.name после вызова super.'
    ),
    solution: `class AppError extends Error {
  constructor(message, code, cause) {
    super(message, cause === undefined ? undefined : { cause });
    this.name = 'AppError';
    this.code = code;
  }
}

const notFound = new AppError('Not found', 'E_NOT_FOUND', new Error('no row'));

console.log(notFound instanceof AppError); // true
console.log(notFound instanceof Error); // true
console.log(notFound.name); // AppError
console.log(notFound.code); // E_NOT_FOUND
console.log(notFound.cause.message); // no row
console.log('cause' in new AppError('Plain', 'E_PLAIN')); // false`,
    explanation: L(
      'Extending Error is the only way to keep the stack trace, the message and the standard behaviour of a thrown value. The cause option of the Error constructor is the official place for the original error, so tools that read error.cause find it without any custom convention. The name is set by hand because the default name of a subclass is still "Error", and the code gives the callers a stable machine readable reason. The constructor checks for undefined, because passing { cause: undefined } would still create the property.',
      'Наследование от Error — единственный способ сохранить стектрейс, сообщение и стандартное поведение бросаемого значения. Опция cause в конструкторе Error — официальное место для исходной ошибки, поэтому инструменты, читающие error.cause, найдут её без собственных соглашений. Имя задаётся вручную, потому что имя подкласса по умолчанию остаётся "Error", а код даёт вызывающим машиночитаемую причину. Конструктор проверяет на undefined, потому что передача { cause: undefined } всё равно создала бы свойство.'
    ),
  },
  {
    id: 'topic-errors-2',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'basic',
    title: L('Parse JSON without throwing', 'Разобрать JSON без исключений'),
    brief: L(
      'Write a function safeParse(text, fallback = null) that never throws. It returns { ok: true, value } when the text is valid JSON and { ok: false, value: fallback, error } when it is not, where error is the original SyntaxError thrown by JSON.parse. The value is always present, so the caller can use result.value without checking the flag first. The function must not use any other way of parsing. Example: safeParse("{\\"a\\":1}") returns { ok: true, value: { a: 1 } }, safeParse("{oops}", []) returns { ok: false, value: [], error: SyntaxError } and safeParse("null") returns { ok: true, value: null }.',
      'Напишите функцию safeParse(text, fallback = null), которая никогда не бросает исключений. Она возвращает { ok: true, value }, когда текст — корректный JSON, и { ok: false, value: fallback, error }, когда это не так, где error — исходный SyntaxError из JSON.parse. Значение присутствует всегда, поэтому вызывающий может использовать result.value, не проверяя флаг. Других способов разбора использовать нельзя. Пример: safeParse("{\\"a\\":1}") возвращает { ok: true, value: { a: 1 } }, safeParse("{oops}", []) возвращает { ok: false, value: [], error: SyntaxError }, а safeParse("null") возвращает { ok: true, value: null }.'
    ),
    hint: L(
      'Wrap JSON.parse in a try and catch, and return the fallback together with the caught error in the catch branch.',
      'Оберните JSON.parse в try и catch и в ветке catch возвращайте fallback вместе с пойманной ошибкой.'
    ),
    solution: `function safeParse(text, fallback = null) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, value: fallback, error };
  }
}

console.log(safeParse('{"a":1}')); // { ok: true, value: { a: 1 } }
console.log(safeParse('{oops}', [])); // { ok: false, value: [], error: SyntaxError }
console.log(safeParse('null')); // { ok: true, value: null }`,
    explanation: L(
      'JSON.parse throws a SyntaxError for broken input, and a try and catch turns that into a value. The result object always carries a value, so the code that consumes it never has to deal with undefined from a failed parse. Keeping the original error is important, because its message says where the JSON is broken. The fallback is only a convenience for the common case, and the error is still returned so nothing is lost.',
      'JSON.parse бросает SyntaxError на битом вводе, а try и catch превращают это в значение. В объекте результата всегда есть value, поэтому код, который его читает, не сталкивается с undefined из-за неудачного разбора. Исходную ошибку важно сохранить, потому что её сообщение указывает, где именно JSON сломан. Fallback — это удобство для частого случая, но ошибка всё равно возвращается, поэтому ничего не теряется.'
    ),
  },
  {
    id: 'topic-errors-3',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'basic',
    title: L('Wrap a call in an error boundary', 'Обернуть вызов в границу ошибок'),
    brief: L(
      'Write a function runWithBoundary(fn, onError, fallbackValue) that calls fn and protects the caller from any error. If fn throws, onError receives the thrown error and the function returns fallbackValue. If fn returns a promise, the returned promise resolves with the value of fn, or, when that promise rejects, it resolves with fallbackValue and onError receives the rejection reason. A rejected promise must never escape the function. Example: runWithBoundary(() => { throw new Error("boom"); }, (error) => console.log(error.message), null) returns null and prints "boom".',
      'Напишите функцию runWithBoundary(fn, onError, fallbackValue), которая вызывает fn и защищает вызывающего от любой ошибки. Если fn бросает исключение, onError получает брошенную ошибку, а функция возвращает fallbackValue. Если fn возвращает промис, возвращённый промис разрешается со значением fn, а при отклонении разрешается значением fallbackValue, и onError получает причину отклонения. Отклонённый промис не должен выходить из функции. Пример: runWithBoundary(() => { throw new Error("boom"); }, (error) => console.log(error.message), null) возвращает null и печатает "boom".'
    ),
    hint: L(
      'Catch the synchronous throw first, then check whether the result is a thenable and attach a catch to it, where the handler returns the fallback.',
      'Сначала поймайте синхронный throw, затем проверьте, не является ли результат thenable, и повесьте на него catch, где обработчик возвращает fallback.'
    ),
    solution: `function runWithBoundary(fn, onError, fallbackValue = null) {
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      return result.catch((error) => {
        onError(error);
        return fallbackValue;
      });
    }
    return result;
  } catch (error) {
    onError(error);
    return fallbackValue;
  }
}

console.log(
  runWithBoundary(
    () => {
      throw new Error('boom');
    },
    (error) => console.log(error.message),
    null
  )
); // null, and "boom" was printed

runWithBoundary(
  async () => {
    throw new Error('async boom');
  },
  (error) => console.log(error.message),
  'fallback'
).then((value) => console.log(value)); // "async boom" and "fallback"`,
    explanation: L(
      'A boundary has to cover both worlds: the synchronous throw and the rejected promise. The try and catch handles the first case, and the check for a thenable handles the second one, because a rejected promise is not thrown, it is returned. The catch on the promise returns the fallback, so the promise resolves and the caller gets a normal value instead of an unhandled rejection. The error object is passed to onError unchanged, so the handler can log it or report it.',
      'Граница ошибок должна покрывать оба мира: синхронный throw и отклонённый промис. try и catch обрабатывают первый случай, а проверка на thenable — второй, потому что отклонённый промис не бросают, а возвращают. catch на промис возвращает fallback, поэтому промис разрешается и вызывающий получает обычное значение вместо необработанного отклонения. Объект ошибки передаётся в onError без изменений, поэтому обработчик может его залогировать или показать.'
    ),
  },
  {
    id: 'topic-errors-4',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'intermediate',
    title: L('Retry a call and fall back', 'Повторить вызов и вернуть запасное значение'),
    brief: L(
      'Write a function withFallback(fn, fallback, attempts = 3) that calls fn and, when it throws, tries again until the number of attempts is used up. The value of the first successful call is returned and no further call is made. When every attempt fails, the function returns fallback instead of throwing. The number of failed attempts must be reported, so the function returns { value, attempts, failed }. An attempts value below one is treated as one. Example: a function that fails twice and then succeeds returns { value: "ok", attempts: 3, failed: 2 }, and a function that always fails returns { value: "default", attempts: 3, failed: 3 }.',
      'Напишите функцию withFallback(fn, fallback, attempts = 3), которая вызывает fn и, если тот бросает исключение, пробует снова, пока не исчерпает число попыток. Значение первого успешного вызова возвращается, и следующих вызовов не будет. Когда все попытки провалились, функция возвращает fallback вместо исключения. Число неудачных попыток нужно сообщить, поэтому функция возвращает { value, attempts, failed }. Значение attempts меньше единицы считается равным единице. Пример: функция, которая два раза падает, а потом успевает, возвращает { value: "ok", attempts: 3, failed: 2 }, а функция, которая падает всегда, возвращает { value: "default", attempts: 3, failed: 3 }.'
    ),
    hint: L(
      'Use a loop over the attempts with a try and catch inside, remember the last error and count the failures, and return the fallback after the loop.',
      'Используйте цикл по попыткам с try и catch внутри, запомните последнюю ошибку и считайте неудачи, а после цикла верните fallback.'
    ),
    solution: `function withFallback(fn, fallback, attempts = 3) {
  const total = Math.max(1, Math.floor(attempts));
  let failed = 0;
  let lastError = null;

  for (let attempt = 1; attempt <= total; attempt += 1) {
    try {
      return { value: fn(attempt), attempts: attempt, failed };
    } catch (error) {
      failed += 1;
      lastError = error;
    }
  }

  return { value: fallback, attempts: total, failed, error: lastError };
}

let calls = 0;
function flaky() {
  calls += 1;
  if (calls < 3) throw new Error('not yet');
  return 'ok';
}

console.log(withFallback(flaky, 'default', 3)); // { value: 'ok', attempts: 3, failed: 2 }`,
    explanation: L(
      'The loop is the retry mechanism and the try block is the risky part. The counter of failed attempts is increased in the catch branch, so the report tells how unstable the call really was. The first success returns immediately, which means the extra attempts are never spent when there is no problem. The last error is attached to the fallback result, so nothing about the failure is lost even though the function itself does not throw.',
      'Цикл — это механизм повторов, а try — опасная часть внутри него. Счётчик неудачных попыток растёт в ветке catch, поэтому отчёт показывает, насколько нестабилен был вызов. Первый успех возвращается сразу, значит лишние попытки не тратятся, когда проблемы нет. Последняя ошибка прикрепляется к результату с fallback, поэтому ничто не теряется, хотя сама функция не бросает исключение.'
    ),
  },
  {
    id: 'topic-errors-5',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'intermediate',
    title: L('Collect several errors into one', 'Собрать несколько ошибок в одну'),
    brief: L(
      'Write a function runAll(tasks) that runs every task and collects the errors instead of stopping at the first one. It returns { ok: true, values } when no task throws, and { ok: false, errors } otherwise, where errors is an array of the thrown errors in the order of the tasks. Also write a function aggregateError(errors) that builds an Error with the name "AggregateError", the property errors with the original errors and the message "N errors: first message; second message", where the count is written in the singular for one error. Example: runAll([() => 1, () => { throw new Error("bad"); }]) returns { ok: false, errors: [Error("bad")] } and aggregateError([new Error("a"), new Error("b")]).message is "2 errors: a; b".',
      'Напишите функцию runAll(tasks), которая выполняет все задачи и собирает ошибки вместо остановки на первой. Она возвращает { ok: true, values }, когда ни одна задача не бросила исключение, и { ok: false, errors } иначе, где errors — массив брошенных ошибок в порядке задач. Также напишите функцию aggregateError(errors), которая строит Error с именем "AggregateError", свойством errors с исходными ошибками и сообщением "N errors: first message; second message", где число в единственном числе при одной ошибке. Пример: runAll([() => 1, () => { throw new Error("bad"); }]) возвращает { ok: false, errors: [Error("bad")] }, а aggregateError([new Error("a"), new Error("b")]).message равно "2 errors: a; b".'
    ),
    hint: L(
      'Run the tasks inside a try and catch one by one, push the values and the errors into two arrays, and build the message from the messages of the errors.',
      'Выполняйте задачи по одной внутри try и catch, складывайте значения и ошибки в два массива и стройте сообщение из сообщений ошибок.'
    ),
    solution: `function runAll(tasks) {
  const values = [];
  const errors = [];

  for (const task of tasks) {
    try {
      values.push(task());
    } catch (error) {
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, values };
}

function aggregateError(errors) {
  const list = Array.from(errors);
  const label = list.length === 1 ? '1 error' : list.length + ' errors';
  const messages = list.map((error) => (error instanceof Error ? error.message : String(error)));

  const aggregate = new Error(label + ': ' + messages.join('; '));
  aggregate.name = 'AggregateError';
  aggregate.errors = list;

  return aggregate;
}

const result = runAll([() => 1, () => { throw new Error('bad'); }]);
console.log(result.ok); // false
console.log(aggregateError(result.errors).message); // 1 error: bad`,
    explanation: L(
      'Stopping at the first error hides the rest of the problems, and a user who fixes one field then sees the next one is unhappy. Collecting the errors keeps every problem visible at once. The aggregate error keeps the original errors in the errors property, so a logger can walk the whole chain, while the message is a short summary for a human. The singular form for one error is a small detail, but it makes the message read like a sentence.',
      'Остановка на первой ошибке прячет остальные проблемы, и пользователю, который починит одно поле и увидит следующее, это не нравится. Сбор ошибок показывает все проблемы сразу. Агрегатная ошибка хранит исходные ошибки в свойстве errors, поэтому логгер может пройти по всей цепочке, а сообщение остаётся коротким резюме для человека. Единственное число при одной ошибке — мелочь, но сообщение читается как фраза.'
    ),
  },
  {
    id: 'topic-errors-6',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'advanced',
    title: L('Format an error for the log', 'Отформатировать ошибку для лога'),
    brief: L(
      'Write a function formatError(error) that turns any value into one string that is ready to be written to a log. For an Error it returns the first line "Name: message", then the frames of the stack, each on its own line and indented with two spaces, and then a line "Caused by: Name: message" for every error in the cause chain. The first line of the stack is dropped, because it repeats the name and the message. For a value that is not an Error it returns "Unknown error: " followed by String(value). Example: formatError(new TypeError("bad type")) starts with "TypeError: bad type" and a TypeError with a cause adds a line "Caused by: ReferenceError: inner".',
      'Напишите функцию formatError(error), которая превращает любое значение в одну строку, готовую для записи в лог. Для Error она возвращает первую строку "Name: message", затем кадры стектрейса, каждый на своей строке и с отступом в два пробела, а затем строку "Caused by: Name: message" для каждой ошибки в цепочке причин. Первая строка стектрейса отбрасывается, потому что она повторяет имя и сообщение. Для значения, которое не Error, она возвращает "Unknown error: " и далее String(value). Пример: formatError(new TypeError("bad type")) начинается с "TypeError: bad type", а TypeError с причиной добавляет строку "Caused by: ReferenceError: inner".'
    ),
    hint: L(
      'Split the stack on newlines, drop the first line, trim the rest and indent them, then walk the cause chain with a while loop.',
      'Разбейте стектрейс по переводу строки, отбросьте первую строку, обрежьте остальные и добавьте отступ, затем пройдите по цепочке причин циклом while.'
    ),
    solution: `function formatError(value) {
  if (!(value instanceof Error)) {
    return 'Unknown error: ' + String(value);
  }

  const lines = [value.name + ': ' + value.message];

  if (typeof value.stack === 'string') {
    const frames = value.stack.split('\\n').slice(1);
    for (const frame of frames) {
      const trimmed = frame.trim();
      if (trimmed !== '') {
        lines.push('  ' + trimmed);
      }
    }
  }

  let cause = value.cause;
  while (cause) {
    const described = cause instanceof Error ? cause.name + ': ' + cause.message : String(cause);
    lines.push('Caused by: ' + described);
    cause = cause instanceof Error ? cause.cause : undefined;
  }

  return lines.join('\\n');
}

const failure = new TypeError('bad type');
failure.cause = new ReferenceError('inner');

console.log(formatError(failure));
console.log(formatError('just a string'));`,
    explanation: L(
      'A log line has to survive being read by a human, so the name and the message come first and the stack follows. The first line of the stack is dropped because the standard format repeats the name and the message there, and keeping it would print them twice. The cause chain is walked with a loop, because the chain can be any length, and a cause that is not an Error is still shown, just without a name. The check for instanceof Error keeps the function safe for any value, including undefined.',
      'Строка лога должна читаться человеком, поэтому сначала идут имя и сообщение, а следом стектрейс. Первая строка стектрейса отбрасывается, потому что в стандартном формате там снова name и message, и они бы напечатались дважды. Цепочка причин обходится циклом, потому что её длина любая, а причина, которая не Error, всё равно показывается, просто без имени. Проверка instanceof Error делает функцию безопасной для любого значения, включая undefined.'
    ),
  },
  {
    id: 'topic-errors-7',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'advanced',
    title: L('Collect validation errors per field', 'Собрать ошибки валидации по полям'),
    brief: L(
      'Write a function createValidator() that returns an object with two methods. The method rule(field, message, predicate) adds a rule: the field is invalid when the predicate returns false for the value of that field. The method validate(values) runs every rule and returns { valid, errors }, where valid is true only when no rule failed, and errors maps a field name to the list of the messages of the failed rules in the order the rules were added. A field with no failed rule must not appear in errors at all, and the validation must not stop at the first failure. Example: a rule "Email is required" for the field "email" gives { valid: false, errors: { email: ["Email is required"] } } for the value "", and gives { valid: true, errors: {} } for the value "ada@example.com".',
      'Напишите функцию createValidator(), которая возвращает объект с двумя методами. Метод rule(field, message, predicate) добавляет правило: поле невалидно, когда предикат возвращает false для значения этого поля. Метод validate(values) выполняет все правила и возвращает { valid, errors }, где valid истинно только когда ни одно правило не провалилось, а errors сопоставляет имя поля списку сообщений проваленных правил в порядке добавления правил. Поле без проваленных правил вообще не должно появляться в errors, и проверка не должна останавливаться на первой неудаче. Пример: правило "Email is required" для поля "email" даёт { valid: false, errors: { email: ["Email is required"] } } для значения "" и { valid: true, errors: {} } для значения "ada@example.com".'
    ),
    hint: L(
      'Store the rules in an array, run all of them in validate, and group the failed messages by the field of the rule.',
      'Храните правила в массиве, выполняйте их все в validate и группируйте сообщения проваленных правил по полю правила.'
    ),
    solution: `function createValidator() {
  const rules = [];

  return {
    rule(field, message, predicate) {
      rules.push({ field, message, predicate });
    },
    validate(values) {
      const errors = {};
      let valid = true;

      for (const rule of rules) {
        const value = values[rule.field];
        let passed = false;
        try {
          passed = rule.predicate(value) === true;
        } catch {
          passed = false;
        }
        if (passed) continue;

        valid = false;
        if (!errors[rule.field]) {
          errors[rule.field] = [];
        }
        errors[rule.field].push(rule.message);
      }

      return { valid, errors };
    },
  };
}

const validator = createValidator();

validator.rule('email', 'Email is required', (value) => String(value ?? '').trim().length > 0);
validator.rule('email', 'Email must contain @', (value) => String(value ?? '').includes('@'));

console.log(validator.validate({ email: '' }));
// { valid: false, errors: { email: ['Email is required', 'Email must contain @'] } }

console.log(validator.validate({ email: 'ada@example.com' })); // { valid: true, errors: {} }`,
    explanation: L(
      'A list of rules is easier to extend than a chain of if statements, and every rule is independent, so one broken field never hides another. The messages are grouped by the field of the rule, and the array keeps the order in which the rules were added, which is the order the user expects to read. The predicate is called inside a try and catch, because a rule that throws is a rule that failed, and a broken rule must not crash the whole validation.',
      'Список правил легче расширять, чем цепочка if, и каждое правило независимо, поэтому одно сломанное поле не прячет другое. Сообщения группируются по полю правила, а массив сохраняет порядок добавления правил, то есть тот порядок, в котором пользователь ожидает их прочитать. Предикат вызывается внутри try и catch, потому что правило, которое бросило исключение, считается проваленным, и сломанное правило не должно рушить всю проверку.'
    ),
  },
  {
    id: 'topic-errors-8',
    moduleId: 'js-core',
    topic: 'errors',
    level: 'advanced',
    title: L('Narrow an unknown error', 'Сузить неизвестную ошибку'),
    brief: L(
      'Write a function describeError(value) that narrows an unknown value to a small object { kind, message }. The kind is "error" for an Error instance, "string" for a string, "object" for a plain object that has a message property of the type string, and "unknown" for everything else. The message is the message of the error, the string itself, the message property of the object and String(value) for the unknown case. Also write a function isNotFound(value) that returns true only when the value is an Error whose code is "E_NOT_FOUND" or whose message contains "not found" in any case, and false for every other value. Example: describeError(new Error("boom")) returns { kind: "error", message: "boom" }, describeError("boom") returns { kind: "string", message: "boom" } and describeError(42) returns { kind: "unknown", message: "42" }.',
      'Напишите функцию describeError(value), которая сужает неизвестное значение до маленького объекта { kind, message }. Вид kind равен "error" для экземпляра Error, "string" для строки, "object" для обычного объекта, у которого есть свойство message типа string, и "unknown" для всего остального. Сообщением будет message ошибки, сама строка, свойство message объекта и String(value) в случае unknown. Также напишите функцию isNotFound(value), которая возвращает true только когда значение — это Error с кодом "E_NOT_FOUND" или с сообщением, содержащим "not found" в любом регистре, и false для любого другого значения. Пример: describeError(new Error("boom")) возвращает { kind: "error", message: "boom" }, describeError("boom") возвращает { kind: "string", message: "boom" }, а describeError(42) возвращает { kind: "unknown", message: "42" }.'
    ),
    hint: L(
      'Check the types from the most specific to the most general, and remember that a plain object has to be checked with typeof value === "object" and value !== null.',
      'Проверяйте типы от самого конкретного к самому общему и помните, что обычный объект проверяется через typeof value === "object" и value !== null.'
    ),
    solution: `function describeError(value) {
  if (value instanceof Error) {
    return { kind: 'error', message: value.message };
  }

  if (typeof value === 'string') {
    return { kind: 'string', message: value };
  }

  if (typeof value === 'object' && value !== null && typeof value.message === 'string') {
    return { kind: 'object', message: value.message };
  }

  return { kind: 'unknown', message: String(value) };
}

function isNotFound(value) {
  if (!(value instanceof Error)) return false;
  if (value.code === 'E_NOT_FOUND') return true;
  return String(value.message).toLowerCase().includes('not found');
}

console.log(describeError(new Error('boom'))); // { kind: 'error', message: 'boom' }
console.log(describeError('boom')); // { kind: 'string', message: 'boom' }
console.log(describeError(42)); // { kind: 'unknown', message: '42' }
console.log(isNotFound(Object.assign(new Error('Not Found'), { code: 'E_NOT_FOUND' }))); // true`,
    explanation: L(
      'In JavaScript a caught value has the type unknown, and the only safe way to learn something about it is to check. The checks go from the most specific to the most general, so an Error never falls into the branch for a plain object. The null check is required, because typeof null is "object" and a null value has no message property. The string conversion in the last branch makes sure that the message is always a string, whatever the value was.',
      'В JavaScript пойманное значение имеет тип unknown, и единственный безопасный способ узнать о нём что-то — проверки. Проверки идут от самого конкретного к самому общему, поэтому Error никогда не попадёт в ветку для обычного объекта. Проверка на null обязательна, потому что typeof null равен "object" и у null нет свойства message. Приведение к строке в последней ветке гарантирует, что message всегда будет строкой, чем бы исходное значение ни было.'
    ),
  },
];
