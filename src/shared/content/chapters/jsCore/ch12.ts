import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh12: Chapter = {
  id: 'js-core-ch12',
  title: L('Errors, debugging and defensive coding', 'Ошибки, отладка и защитное программирование'),
  summary: L(
    'How JavaScript signals errors, how to throw, catch and rethrow them, how to build your own error classes with a preserved cause, and how to log and debug without losing the stack trace.',
    'Как JavaScript сообщает об ошибках, как их бросать, ловить и пробрасывать, как строить собственные классы ошибок с сохранённой причиной и как логировать и отлаживать, не теряя стектрейс.'
  ),
  sections: [
    {
      id: 'js-core-ch12-s1',
      title: L('The Error types and the stack trace', 'Типы ошибок и стектрейс'),
      body: L(
        'JavaScript ships a small hierarchy of built-in error constructors, and each one names a different kind of failure. Error is the base class that all the others extend. TypeError means a value had the wrong type, or an operation was attempted on something that cannot support it. RangeError means a number fell outside its allowed range. SyntaxError means the source could not be parsed at all.\n\nReferenceError points at a name that is not in scope, which happens either through a typo or when a binding is read before its declaration. EvalError belongs to eval: the specification still defines it for a script that eval cannot compile, although modern engines report a syntax error inside eval as a SyntaxError. URIError comes from the URI encoding functions when they meet a malformed percent sequence such as a lone percent sign.\n\nEvery error instance carries a name, a message and, in most environments, a stack. The stack is a string listing the frames, that is, the nested calls that led to the throw, with the most recent call first. The first line repeats the name and the message, and the lines after it carry file names and line positions. Error.captureStackTrace lets you hide the internal frames of a helper by marking a boundary function, and it exists in V8 and Node but not in Firefox or Safari.\n\nAn error is an ordinary object, so nothing stops you from passing it to another function, storing it in an array or serializing it. Serializing is where the damage happens: message and stack are own but non-enumerable properties, so JSON.stringify of an error produces an empty object and the frames are lost for good. A logging pipeline that ships errors as JSON therefore delivers the name and nothing else unless you copy the fields yourself.',
        'В JavaScript есть небольшая иерархия встроенных конструкторов ошибок, и каждый из них называет свой вид сбоя. Error — базовый класс, который расширяют все остальные. TypeError означает, что значение оказалось не того типа либо операция была применена к тому, что её не поддерживает. RangeError означает, что число вышло за допустимые границы. SyntaxError означает, что исходный код вообще не удалось разобрать.\n\nReferenceError указывает на имя, которого нет в области видимости: это бывает либо из-за опечатки, либо когда значение читается раньше своего объявления. EvalError принадлежит eval: спецификация по-прежнему определяет её для скрипта, который eval не может скомпилировать, хотя современные движки сообщают о синтаксической ошибке внутри eval как о SyntaxError. URIError приходит из функций кодирования URI, когда они встречают некорректную процентную последовательность вроде одинокого знака процента.\n\nКаждый экземпляр ошибки несёт имя, сообщение и, в большинстве окружений, стектрейс. Стек — это строка со списком кадров, то есть вложенных вызовов, которые привели к броску, причём последний вызов стоит первым. Первая строка повторяет имя и сообщение, а дальше идут имена файлов и позиции строк. Error.captureStackTrace позволяет скрыть внутренние кадры вспомогательной функции, объявив границу, и существует в V8 и Node, но не в Firefox и Safari.\n\nОшибка — обычный объект, поэтому её ничего не мешает передать в другую функцию, положить в массив или сериализовать. Вот тут и начинается ущерб: message и stack — собственные, но неперечислимые свойства, поэтому JSON.stringify ошибки даёт пустой объект, и кадры теряются навсегда. Значит, лог-пайплайн, который отправляет ошибки в JSON, привозит только имя, если поля не скопировать вручную.'
      ),
      bullets: [
        L('Error is the base class; TypeError, RangeError, SyntaxError, ReferenceError, EvalError and URIError extend it.', 'Error — базовый класс, его расширяют TypeError, RangeError, SyntaxError, ReferenceError, EvalError и URIError.'),
        L('error.name gives the category, error.message the reason, error.stack the frames.', 'error.name даёт категорию, error.message — причину, error.stack — кадры.'),
        L('A module with a syntax error never runs, so the error surfaces at load time and not inside a try block.', 'Модуль с синтаксической ошибкой вообще не выполняется, поэтому ошибка всплывает при загрузке, а не внутри try-блока.'),
        L('Error.captureStackTrace exists in V8 and Node, but not in Firefox or Safari.', 'Error.captureStackTrace есть в V8 и Node, но нет в Firefox и Safari.'),
        L('An object with name and message is not an Error, so instanceof returns false for it.', 'Объект с полями name и message не является ошибкой, и для него instanceof вернёт false.'),
      ],
      code: `const err = new TypeError('items is not iterable');

err.name;                 // 'TypeError'
err.message;              // 'items is not iterable'
err instanceof Error;     // true
err instanceof TypeError; // true

try {
  JSON.parse('{ bad }');
} catch (e) {
  e.name;                   // 'SyntaxError'
  e.stack.split('\\n').length; // how many frames the trace has
}

const fake = { name: 'Error', message: 'boom' };
fake instanceof Error;     // false - it is a plain object

JSON.stringify(err);       // '{}' - message and stack are not enumerable`,
      table: {
        caption: L('What each built-in error type says', 'Что сообщает каждый встроенный тип ошибки'),
        headers: [L('Type', 'Тип'), L('Meaning', 'Значение'), L('Typical trigger', 'Типичный повод')],
        rows: [
          [L('Error', 'Error'), L('Base class for all errors', 'Базовый класс всех ошибок'), L('Explicit throw', 'Явный throw')],
          [L('TypeError', 'TypeError'), L('Wrong type or unusable value', 'Неверный тип или непригодное значение'), L('Reading a property of undefined', 'Чтение свойства у undefined')],
          [L('RangeError', 'RangeError'), L('Number outside the allowed range', 'Число вне допустимого диапазона'), L('new Array(-1)', 'new Array(-1)')],
          [L('SyntaxError', 'SyntaxError'), L('Source could not be parsed', 'Исходный код не удалось разобрать'), L('JSON.parse("{")', 'JSON.parse("{")')],
          [L('ReferenceError', 'ReferenceError'), L('Name is not in scope', 'Имени нет в области видимости'), L('Typo or temporal dead zone', 'Опечатка или временная мёртвая зона')],
          [L('URIError', 'URIError'), L('Malformed percent-encoding', 'Некорректное процентное кодирование'), L('decodeURIComponent("%")', 'decodeURIComponent("%")')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Serializing an error destroys the stack', 'Сериализация ошибки уничтожает стектрейс'),
          text: L(
            'JSON.stringify(new Error("boom")) returns "{}", because message and stack are own but non-enumerable properties. If an error has to travel to a log server, send name, message and stack explicitly.',
            'JSON.stringify(new Error("boom")) возвращает "{}", потому что message и stack — собственные, но неперечислимые свойства. Если ошибка должна уехать в лог-сервер, отправляйте name, message и stack явно.'
          ),
        },
        {
          tone: 'note',
          title: L('A V8-only extension', 'Расширение только из V8'),
          text: L(
            'Error.captureStackTrace is not part of the standard. Guard the call with a feature check before you rely on it, otherwise the code works in Node and Chrome and breaks in Firefox and Safari.',
            'Error.captureStackTrace не входит в стандарт. Проверяйте наличие функции перед тем, как полагаться на неё, иначе код работает в Node и Chrome и ломается в Firefox и Safari.'
          ),
        },
      ],
      takeaway: L(
        'Read error.name for the category and error.message for the reason, and copy the stack by hand before you serialize an error.',
        'Читайте error.name как категорию, а error.message как причину, и копируйте стектрейс вручную перед сериализацией ошибки.'
      ),
      seeAlso: [
        L('Section 12-2: try, catch, finally and error propagation', 'Секция 12-2: try, catch, finally и распространение ошибок'),
        L('Chapter 11: promise rejections and unhandled errors', 'Глава 11: отклонённые промисы и необработанные ошибки'),
      ],
    },
    {
      id: 'js-core-ch12-s2',
      title: L('try, catch, finally and error propagation', 'try, catch, finally и распространение ошибок'),
      body: L(
        'The try block runs the code that may fail, the catch block receives the thrown value, and the finally block runs afterwards no matter what happened. The catch parameter receives whatever value was thrown, and it is not automatically an Error: throw 42 gives you the number 42 in the catch block. A try block catches only synchronous throws that happen inside it. A rejected promise created inside try is not caught by that catch, because the rejection arrives later, on a different turn of the event loop.\n\nThe finally block is where cleanup belongs: releasing a lock, closing a file, cancelling a subscription. It runs on the normal path, on the throw path and on the return path. That last case is the trap. A return inside finally overrides the result the function was about to produce, including a value that was already evaluated, and a throw inside finally replaces the original error entirely and hides the real cause.\n\nRethrowing is the normal way to let an error travel up the call stack: catch it, add context, then throw it again. But most try blocks do not need a catch at all. If the function cannot do anything useful with the error, the cleanest code has no try block and lets the error travel to the boundary of the application, where it is logged and turned into a response. A catch block that only logs and continues usually hides the failure instead of fixing it.\n\nWhen you do catch, filter by type instead of swallowing everything: catch (e) { if (e instanceof TypeError) { return fallback; } throw e; } keeps unexpected errors travelling. Nested try blocks are worth avoiding, because an inner catch shadows the outer error and it stops being clear which layer handled the failure. A named function boundary also gives the stack trace a readable label instead of an anonymous frame.',
        'Блок try выполняет код, который может упасть, блок catch получает брошенное значение, а блок finally выполняется потом в любом случае. Параметр catch получает именно то, что бросили, и это не обязательно Error: throw 42 даст в catch число 42. Блок try ловит только синхронные броски внутри себя. Отклонённый промис, созданный внутри try, этим catch не поймается, потому что отклонение приходит позже, на другом ходу цикла событий.\n\nБлок finally — место для уборки: освобождения блокировки, закрытия файла, отмены подписки. Он выполняется на обычном пути, на пути с броском и на пути с return. Последний случай и есть ловушка. Return внутри finally перезаписывает результат, который функция собиралась вернуть, в том числе уже вычисленное значение, а throw внутри finally полностью заменяет исходную ошибку и прячет настоящую причину.\n\nПробрасывание — обычный способ отправить ошибку вверх по стеку вызовов: поймать, добавить контекст и бросить снова. Но большинству try-блоков catch вообще не нужен. Если функция ничего полезного с ошибкой не сделает, самый чистый код вовсе без try позволяет ошибке дойти до границы приложения, где её логируют и превращают в ответ. Блок catch, который только логирует и продолжает, обычно прячет сбой, а не чинит его.\n\nКогда catch всё-таки нужен, фильтруйте по типу, а не глотайте всё подряд: catch (e) { if (e instanceof TypeError) { return fallback; } throw e; } оставляет неожиданные ошибки в движении. Вложенных try-блоков стоит избегать: внутренний catch заслоняет внешнюю ошибку, и становится непонятно, какой слой отработал. Именованная функция-граница заодно даёт стектрейсу читаемую метку вместо безымянного кадра.'
      ),
      bullets: [
        L('catch receives the thrown value, not necessarily an Error object.', 'catch получает брошенное значение, а не обязательно объект Error.'),
        L('A try block catches only synchronous throws; a promise rejection escapes it.', 'try ловит только синхронные броски, отклонение промиса проходит мимо него.'),
        L('finally runs on the normal path, on the throw path and on the return path.', 'finally выполняется на обычном пути, на пути с броском и на пути с return.'),
        L('A return inside finally replaces the value the function was about to return.', 'Return внутри finally заменяет значение, которое функция собиралась вернуть.'),
        L('A catch that only logs and continues hides the failure instead of handling it.', 'Catch, который только логирует и продолжает, прячет сбой вместо обработки.'),
      ],
      code: `function parsePort(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return null;
    }
    throw e; // unknown failures keep travelling
  } finally {
    console.log('parse finished');
  }
}

function broken() {
  try {
    return 'from try';
  } finally {
    return 'from finally'; // overrides the value above
  }
}`,
      table: {
        caption: L('What runs on each path', 'Что выполняется на каждом пути'),
        headers: [L('Path', 'Путь'), L('try', 'try'), L('catch', 'catch'), L('finally', 'finally'), L('Result', 'Результат')],
        rows: [
          [L('Normal completion', 'Обычное завершение'), L('yes', 'да'), L('no', 'нет'), L('yes', 'да'), L('value from try', 'значение из try')],
          [L('Throw inside try', 'Бросок внутри try'), L('yes', 'да'), L('yes', 'да'), L('yes', 'да'), L('value from catch or rethrow', 'значение из catch или проброс')],
          [L('return inside try', 'return внутри try'), L('yes', 'да'), L('no', 'нет'), L('yes', 'да'), L('the returned value', 'возвращённое значение')],
          [L('return inside finally', 'return внутри finally'), L('yes', 'да'), L('no', 'нет'), L('yes', 'да'), L('the value from finally', 'значение из finally')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Never return from finally', 'Никогда не делайте return из finally'),
          text: L(
            'A return or a throw inside finally silently discards the value the function was about to return and the error that was travelling. Use finally only for cleanup, and put the return where it belongs, before the finally block.',
            'Return или throw внутри finally молча выбрасывает и значение, которое функция собиралась вернуть, и ошибку, которая шла наружу. Используйте finally только для уборки, а return оставляйте там, где ему место, до блока finally.'
          ),
        },
        {
          tone: 'tip',
          title: L('No catch is often the right answer', 'Отсутствие catch — часто правильный ответ'),
          text: L(
            'If nothing useful can be done with the error, delete the try block. The error reaches the application boundary faster, the stack stays intact, and the code says exactly what it promises.',
            'Если с ошибкой ничего полезного сделать нельзя, удалите try-блок. Ошибка быстрее дойдёт до границы приложения, стектрейс останется целым, а код будет говорить ровно то, что обещает.'
          ),
        },
      ],
      takeaway: L(
        'Let errors travel to the application boundary and catch them only where you can actually recover.',
        'Позволяйте ошибкам доходить до границы приложения и ловите их только там, где действительно есть чем помочь.'
      ),
      seeAlso: [
        L('Section 12-3: custom error classes and error causes', 'Секция 12-3: собственные классы ошибок и причины ошибок'),
        L('Chapter 11: the event loop, promises and async/await', 'Глава 11: цикл событий, промисы и async/await'),
      ],
    },
    {
      id: 'js-core-ch12-s3',
      title: L('Custom error classes and error causes', 'Собственные классы ошибок и причины ошибок'),
      body: L(
        'A custom error class carries a category that the standard types cannot express. The recipe is short: extend Error, call super(message) so the message is set, and assign this.name explicitly, because the inherited name property still says "Error" otherwise. Adding fields such as a status code or a list of invalid field names turns an exception into a structured value that a handler can act on without parsing the message text.\n\nThe cause option on the Error constructor attaches the original error to the new one. new Error("Failed to load user", { cause: original }) puts the original into error.cause, and printing the error shows the cause and its own stack underneath, so the original failure stays visible in the log. Wrapping instead of dropping is what makes debugging possible: the outer error explains what the system was trying to do, the inner one explains why it actually failed.\n\nA typical application has a small ladder of error classes: a base AppError that carries a code, then ValidationError for bad input, NotFoundError for a missing resource and ConflictError for a state clash. Checking with instanceof works for your own classes as long as only one copy of the module is loaded, but it breaks across duplicated dependencies and across a serialization boundary. A stable string code such as "VALIDATION_ERROR" survives both of those, and is often the better contract.\n\nHandle errors at the boundary of the application: the request handler, the event listener, the top of a background job. Inside the code, throw errors that describe the domain. The boundary decides what an error becomes: an HTTP status, a log line, a retry. A boundary that enumerates every concrete error class couples the two together, so it is better to work with codes and with the base class.',
        'Собственный класс ошибки несёт категорию, которую стандартные типы выразить не могут. Рецепт короткий: расширьте Error, вызовите super(message), чтобы задать сообщение, и присвойте this.name явно, иначе унаследованное свойство name по-прежнему будет говорить "Error". Добавление полей вроде кода статуса или списка невалидных полей превращает исключение в структурированное значение, с которым обработчик может работать, не разбирая текст сообщения.\n\nОпция cause в конструкторе Error привязывает исходную ошибку к новой. new Error("Failed to load user", { cause: original }) кладёт оригинал в error.cause, а при выводе ошибки причина печатается вместе со своим стеком ниже, так что исходный сбой остаётся виден в логе. Оборачивание вместо отбрасывания — именно то, что делает отладку возможной: внешняя ошибка объясняет, что система пыталась сделать, внутренняя — почему это не вышло.\n\nУ типичного приложения есть небольшая лестница классов ошибок: базовый AppError с кодом, затем ValidationError для некорректного ввода, NotFoundError для отсутствующего ресурса и ConflictError для конфликта состояний. Проверка через instanceof работает для собственных классов, пока модуль загружен в единственной копии, но ломается на дублирующихся зависимостях и на границе сериализации. Устойчивый строковый код вроде "VALIDATION_ERROR" переживает и то, и другое, и часто является лучшим контрактом.\n\nОбрабатывайте ошибки на границе приложения: обработчике запроса, слушателе события, вершине фоновой задачи. Внутри кода бросайте ошибки, описывающие предметную область. Граница решает, во что превращается ошибка: HTTP-статус, строка лога, повторная попытка. Граница, перечисляющая все конкретные классы, связывает части проекта, поэтому ей лучше работать с кодами и с базовым классом.'
      ),
      bullets: [
        L('class MyError extends Error, then super(message), then set this.name.', 'class MyError extends Error, затем super(message), затем присвоить this.name.'),
        L('new Error(message, { cause: original }) keeps the original error reachable.', 'new Error(message, { cause: original }) сохраняет доступ к исходной ошибке.'),
        L('instanceof works for your own classes but breaks when the module is duplicated.', 'instanceof работает для собственных классов, но ломается при дублировании модуля.'),
        L('A string code such as "VALIDATION_ERROR" survives serialization and bundling.', 'Строковый код вроде "VALIDATION_ERROR" переживает сериализацию и сборку.'),
        L('Throw domain errors inside the code, translate them at the application boundary.', 'Бросайте доменные ошибки внутри кода и переводите их на границе приложения.'),
      ],
      code: `class AppError extends Error {
  constructor(message, code, cause) {
    super(message, { cause });
    this.name = 'AppError';
    this.code = code;
  }
}

class ValidationError extends AppError {
  constructor(fields, cause) {
    super('Validation failed', 'VALIDATION_ERROR', cause);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}
const cause = new TypeError('id must be a number');
const error = new ValidationError(['id'], cause);

error.name;             // 'ValidationError'
error.code;             // 'VALIDATION_ERROR'
error instanceof Error; // true
error.cause === cause;  // true`,
      table: {
        caption: L('A small ladder of application errors', 'Небольшая лестница ошибок приложения'),
        headers: [L('Class', 'Класс'), L('Code', 'Код'), L('Meaning', 'Значение'), L('Boundary reaction', 'Реакция границы')],
        rows: [
          [L('AppError', 'AppError'), L('APP_ERROR', 'APP_ERROR'), L('Base for all application errors', 'База всех ошибок приложения'), L('500, log and report', '500, лог и репорт')],
          [L('ValidationError', 'ValidationError'), L('VALIDATION_ERROR', 'VALIDATION_ERROR'), L('Input failed the rules', 'Ввод не прошёл проверки'), L('400 with the field list', '400 со списком полей')],
          [L('NotFoundError', 'NotFoundError'), L('NOT_FOUND', 'NOT_FOUND'), L('Resource does not exist', 'Ресурса не существует'), L('404', '404')],
          [L('ConflictError', 'ConflictError'), L('CONFLICT', 'CONFLICT'), L('State clash, retry is pointless', 'Конфликт состояний, повтор бессмыслен'), L('409', '409')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('super first, name second', 'Сначала super, потом name'),
          text: L(
            'In a derived constructor you cannot touch this before super(message) runs, and the inherited name property still reads "Error" until you assign it. Forget both steps and the log shows a useless "Error: Validation failed" with no category.',
            'В производном конструкторе нельзя обращаться к this до выполнения super(message), а унаследованное свойство name остаётся равным "Error", пока вы не присвоите его вручную. Забудете оба шага — и в логе будет бесполезное "Error: Validation failed" без категории.'
          ),
        },
        {
          tone: 'tip',
          title: L('Wrap, do not replace', 'Оборачивайте, а не заменяйте'),
          text: L(
            'Keep the original error as the cause and add context on top. A stack trace that ends at a network timeout tells you nothing about which user action caused it, while a chain of causes tells the whole story.',
            'Сохраняйте исходную ошибку как причину и добавляйте контекст сверху. Стек, который заканчивается сетевым таймаутом, ничего не говорит о действии пользователя, а цепочка причин рассказывает всю историю.'
          ),
        },
      ],
      takeaway: L(
        'Wrap errors with a cause, give every class a stable code, and translate them into responses at the application boundary.',
        'Оборачивайте ошибки с причиной, давайте каждому классу устойчивый код и превращайте их в ответы на границе приложения.'
      ),
      seeAlso: [
        L('Section 12-2: try, catch, finally and error propagation', 'Секция 12-2: try, catch, finally и распространение ошибок'),
        L('Chapter 6: classes, encapsulation and immutability', 'Глава 6: классы, инкапсуляция и иммутабельность'),
        L('Chapter 11: async errors and rejected promises', 'Глава 11: ошибки в async и отклонённые промисы'),
      ],
    },
    {
      id: 'js-core-ch12-s4',
      title: L('Common runtime errors and their causes', 'Частые ошибки во время выполнения и их причины'),
      body: L(
        'Most runtime errors have a handful of causes and a message you can recognise. "Cannot read properties of undefined (reading x)" means the code reached an undefined value and tried to read a property of it; the same message with null instead of undefined means the value was null. The repair is rarely a guard on the spot: it is to find the step that produced the empty value, usually a failed lookup that was assigned without a check.\n\n"x is not a function" means the identifier exists but is not callable. It happens after a typo in an import name, after a default import of a named export that does not exist, or when a method is called detached from its object and loses this. In the last case the fix is not a try block but bind or an arrow function, because the problem is the receiver, not the failure.\n\n"Maximum call stack size exceeded" is a RangeError and it means the recursion has no reachable base case, either because the base condition is never met or because the arguments are wrong. "Invalid array length" comes from new Array(-1) or from assigning a negative length. "Cannot assign to read only property" appears when a frozen object or a module namespace is modified.\n\n"x is not defined" is a ReferenceError with two usual causes: a typo, or a temporal dead zone access, that is, reading a let or const binding in the block before its declaration line. A JSON.stringify of an object with a cycle throws a TypeError about a circular structure, and the same call throws on a BigInt value, because JSON has no representation for it.',
        'У большинства ошибок во время выполнения немного причин и узнаваемое сообщение. "Cannot read properties of undefined (reading x)" означает, что код дошёл до значения undefined и попытался прочитать его свойство; то же сообщение с null вместо undefined говорит, что значение было null. Починка редко состоит в проверке на месте: нужно найти шаг, который породил пустое значение, — обычно это неудачный поиск, результат которого присвоили без проверки.\n\n"x is not a function" означает, что имя существует, но не вызывается. Так бывает при опечатке в имени импорта, при импорте по умолчанию несуществующего именованного экспорта и когда метод вызывают отдельно от объекта, теряя this. В последнем случае решение — не try-блок, а bind или стрелочная функция, потому что проблема в получателе, а не в самом сбое.\n\n"Maximum call stack size exceeded" — это RangeError, и означает она, что у рекурсии нет достижимого базового случая: либо условие выхода никогда не выполняется, либо передаются неверные аргументы. "Invalid array length" приходит из new Array(-1) или из присваивания отрицательной длины. "Cannot assign to read only property" появляется при изменении замороженного объекта или пространства имён модуля.\n\n"x is not defined" — это ReferenceError с двумя обычными причинами: опечатка либо обращение к let или const во временной мёртвой зоне, то есть чтение в блоке раньше строки объявления. JSON.stringify объекта с циклом выбрасывает TypeError про циклическую структуру, и тот же вызов падает на значении BigInt, потому что для него нет представления в JSON.'
      ),
      bullets: [
        L('Cannot read properties of undefined means an undefined value was dereferenced.', 'Cannot read properties of undefined означает, что разыменовали значение undefined.'),
        L('x is not a function means the name exists but is not callable, often a detached method.', 'x is not a function означает, что имя есть, но не вызывается — часто это отделённый метод.'),
        L('Maximum call stack size exceeded means the recursion has no reachable base case.', 'Maximum call stack size exceeded означает, что у рекурсии нет достижимого базового случая.'),
        L('ReferenceError: x is not defined covers both typos and temporal dead zone access.', 'ReferenceError: x is not defined бывает и от опечатки, и от обращения во временной мёртвой зоне.'),
        L('JSON.stringify throws a TypeError on circular structures and on BigInt values.', 'JSON.stringify выбрасывает TypeError на циклических структурах и на значениях BigInt.'),
      ],
      code: `// Each block below is an independent example.
const user = null;
user.name; // TypeError: Cannot read properties of null (reading 'name')

const handlers = {
  save() { return this.items.length; },
};
const detached = handlers.save;
detached(); // TypeError: Cannot read properties of undefined (reading 'items')

function recurse(n) {
  return recurse(n + 1); // RangeError: Maximum call stack size exceeded
}

const node = { id: 1 };
node.self = node;
JSON.stringify(node); // TypeError: circular structure

console.log(missing); // ReferenceError: missing is not defined`,
      table: {
        caption: L('From the message to the cause', 'От сообщения к причине'),
        headers: [L('Message', 'Сообщение'), L('Likely cause', 'Вероятная причина'), L('First thing to check', 'С чего начать')],
        rows: [
          [L('Cannot read properties of undefined', 'Cannot read properties of undefined'), L('A value was undefined', 'Значение оказалось undefined'), L('Which step produced it', 'Какой шаг его породил')],
          [L('x is not a function', 'x is not a function'), L('Detached method or a bad import', 'Отделённый метод или неверный импорт'), L('The import name and this', 'Имя импорта и this')],
          [L('Maximum call stack size exceeded', 'Maximum call stack size exceeded'), L('Recursion without a base case', 'Рекурсия без базового случая'), L('The base condition', 'Условие выхода')],
          [L('x is not defined', 'x is not defined'), L('A typo or the temporal dead zone', 'Опечатка или временная мёртвая зона'), L('Declaration order', 'Порядок объявлений')],
          [L('Converting circular structure to JSON', 'Converting circular structure to JSON'), L('A cycle in the object graph', 'Цикл в графе объектов'), L('The back reference', 'Обратная ссылка')],
          [L('Invalid array length', 'Invalid array length'), L('A negative length', 'Отрицательная длина'), L('The computed size', 'Вычисленный размер')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A missing guard is rarely the fix', 'Отсутствие проверки — редко решение'),
          text: L(
            'Adding if (user) right before the crash hides the symptom and leaves the empty value in the data flow. Trace backwards to the step that produced undefined and fix the lookup there.',
            'Проверка if (user) прямо перед падением прячет симптом и оставляет пустое значение в потоке данных. Проследите назад до шага, который породил undefined, и чините поиск там.'
          ),
        },
        {
          tone: 'warning',
          title: L('The temporal dead zone is not hoisting', 'Временная мёртвая зона — это не подъём'),
          text: L(
            'let and const bindings are hoisted but stay uninitialised until their declaration line, so reading them earlier throws a ReferenceError. var behaves differently and reads as undefined, which is why the two feel like different languages.',
            'Объявления let и const поднимаются, но остаются неинициализированными до своей строки, поэтому чтение раньше даёт ReferenceError. var ведёт себя иначе и читается как undefined, из-за чего два варианта ощущаются как разные языки.'
          ),
        },
      ],
      takeaway: L(
        'Read the error message as a diagnosis: it names the value that was wrong, so look for the step that produced it.',
        'Читайте сообщение об ошибке как диагноз: оно называет неверное значение, значит ищите шаг, который его породил.'
      ),
      seeAlso: [
        L('Section 12-1: the error types and the stack trace', 'Секция 12-1: типы ошибок и стектрейс'),
        L('Chapter 3: variables, scope and hoisting', 'Глава 3: переменные, область видимости и подъём'),
        L('Chapter 7: arrays and collection methods', 'Глава 7: массивы и методы коллекций'),
      ],
    },
    {
      id: 'js-core-ch12-s5',
      title: L('Logging, debugging and defensive coding', 'Логирование, отладка и защитное программирование'),
      body: L(
        'console.log writes to the standard output, console.error and console.warn go to the error stream, and console.info is a level alias that most browsers render exactly like log. The distinction matters in Node, where the two streams can be redirected separately, and in the browser devtools, where the console can be filtered by level. console.group and console.groupEnd indent a block, console.table prints an array of records as a table, and console.trace prints the current call stack as a log line.\n\nThe debugger is usually faster than adding logs. A breakpoint pauses the execution and shows the scope, and the call stack panel shows the chain of frames from the top down. A conditional breakpoint stops only for one specific value, which is how you catch a single bad item inside a loop. Source maps let the debugger and the stack trace show the original TypeScript or JSX source instead of the bundled output, so the frame points at code you actually wrote.\n\nDefensive programming means checking the inputs you do not control, at the boundary where they arrive, and trusting the internals afterwards. Data from a server, a query string, a localStorage entry or a user form is untrusted until it is validated. Validate once, convert the value into the shape your code expects, and then work with that shape; validating everywhere is noise, validating nowhere is a vulnerability.\n\nAn assertion function is a small helper that throws when a condition does not hold, and it documents an invariant that the type system cannot express. Total functions return a value for every input while partial ones can fail, and moving the failure to the edge with a result object makes every caller state its choice explicitly. Not every missing value deserves an exception: null and undefined are cheap, local and easy to test for, so keep them for expected states and reserve exceptions for the exceptional ones.',
        'console.log пишет в стандартный вывод, console.error и console.warn уходят в поток ошибок, а console.info — это псевдоним уровня, который браузеры рисуют так же, как log. Различие важно в Node, где потоки можно перенаправлять по отдельности, и в devtools браузера, где консоль фильтруется по уровню. console.group и console.groupEnd делают отступ для блока, console.table печатает массив записей таблицей, а console.trace выводит текущий стек вызовов строкой лога.\n\nОтладчик обычно быстрее, чем добавление логов. Точка останова приостанавливает выполнение и показывает область видимости, а панель стека вызовов показывает цепочку кадров сверху вниз. Условная точка останова срабатывает только для одного конкретного значения — так ловят единственный плохой элемент в цикле. Source maps позволяют отладчику и стектрейсу показывать исходный TypeScript или JSX вместо собранного бандла, и кадр указывает на код, который вы действительно написали.\n\nЗащитное программирование — это проверка входных данных, которыми вы не управляете, на границе, где они приходят, и доверие к внутренностям после этого. Данные с сервера, из query-строки, из localStorage или из пользовательской формы недоверенны, пока не проверены. Проверьте один раз, преобразуйте значение в нужную форму и работайте уже с ней; проверка везде — это шум, отсутствие проверок — дыра в безопасности.\n\nAssertion-функция — маленький помощник, который бросает исключение, когда условие не выполнено, и тем самым фиксирует инвариант, который система типов выразить не может. Тотальные функции возвращают значение для любого входа, а частичные могут упасть, и перенос отказа на край с объектом-результатом заставляет каждого вызывающего явно сказать, что он выбирает. Не каждому отсутствующему значению нужен исключительный случай: null и undefined дешёвые, локальные и легко проверяемые, поэтому оставьте их для ожидаемых состояний, а исключения оставьте для исключительных.'
      ),
      bullets: [
        L('console.error and console.warn go to a separate stream in Node.', 'console.error и console.warn уходят в отдельный поток в Node.'),
        L('console.group indents a block, console.table prints records, console.trace prints the stack.', 'console.group делает отступ, console.table печатает записи, console.trace печатает стек.'),
        L('A conditional breakpoint stops only for one specific value.', 'Условная точка останова срабатывает только для одного значения.'),
        L('Source maps make the debugger and the stack trace point at your original source.', 'Source maps заставляют отладчик и стектрейс указывать на исходный код.'),
        L('Validate untrusted input once at the boundary, then trust the result.', 'Проверяйте недоверенный ввод один раз на границе, потом доверяйте результату.'),
        L('Never log passwords, tokens, card numbers or personal data.', 'Никогда не логируйте пароли, токены, номера карт и персональные данные.'),
      ],
      code: `function assert(condition, message) {
  if (!condition) {
    throw new Error(\`Assertion failed: \${message}\`);
  }
}

function parseUser(raw) {
  assert(typeof raw === 'object' && raw !== null, 'payload must be an object');
  const { id, name } = raw;
  assert(typeof id === 'number', 'id must be a number');
  assert(typeof name === 'string' && name.length > 0, 'name must be a non-empty string');
  return { id, name };
}

console.group('parsed users');
console.table([parseUser({ id: 1, name: 'Ada' })]);
console.groupEnd();

console.trace('checkpoint reached');`,
      table: {
        caption: L('Choosing a console method', 'Выбор метода консоли'),
        headers: [L('Call', 'Вызов'), L('Stream in Node', 'Поток в Node'), L('Use it for', 'Для чего')],
        rows: [
          [L('console.log', 'console.log'), L('stdout', 'stdout'), L('Normal progress output', 'Обычный ход работы')],
          [L('console.info', 'console.info'), L('stdout', 'stdout'), L('Informational messages', 'Информационные сообщения')],
          [L('console.warn', 'console.warn'), L('stderr', 'stderr'), L('Recoverable oddities', 'Восстановимые странности')],
          [L('console.error', 'console.error'), L('stderr', 'stderr'), L('Failures that need attention', 'Сбои, требующие внимания')],
          [L('console.table', 'console.table'), L('stdout', 'stdout'), L('Arrays of records', 'Массивы записей')],
          [L('console.trace', 'console.trace'), L('stderr', 'stderr'), L('Where the code got to', 'До какого места дошёл код')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Logs are not a safe place for secrets', 'Логи — не безопасное место для секретов'),
          text: L(
            'A token printed to the console ends up in screenshots, in CI output and in a log aggregator that nobody reads the access rules of. Redact before you log, and never log a whole request body just to see what happened.',
            'Токен, напечатанный в консоль, окажется на скриншотах, в выводе CI и в агрегаторе логов, к которому никто не читал правила доступа. Редактируйте данные перед логированием и никогда не пишите целое тело запроса, чтобы просто посмотреть, что там было.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Logging inside a hot loop', 'Логирование в горячем цикле'),
          text: L(
            'A console.log per iteration can cost more than the work being measured, and the browser devtools slow the page down noticeably. Aggregate the values, log once after the loop, or sample every hundredth item.',
            'console.log на каждой итерации может стоить дороже самой работы, а devtools браузера заметно замедляют страницу. Соберите значения, залогируйте один раз после цикла или снимайте каждую сотую запись.'
          ),
        },
      ],
      takeaway: L(
        'Validate untrusted data once at the boundary, keep secrets out of the logs, and reach for the debugger before adding print statements.',
        'Проверяйте недоверенные данные один раз на границе, держите секреты подальше от логов и сначала беритесь к отладчику, а не к print-ам.'
      ),
      seeAlso: [
        L('Section 12-4: common runtime errors and their causes', 'Секция 12-4: частые ошибки во время выполнения и их причины'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
        L('Chapter 9: strings, regex and parsing', 'Глава 9: строки, регулярные выражения и разбор'),
      ],
    },
  ],
};
