import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh01: Chapter = {
  id: 'ts-ch1',
  title: L('What TypeScript adds and what it erases', 'Что TypeScript добавляет и что стирает'),
  summary: L(
    'How the type layer works at compile time, when to annotate and when to let inference decide, how arrays and tuples differ, why literal types widen, and how any, unknown, never and void divide the space of values.',
    'Как работает слой типов на этапе компиляции, когда аннотировать, а когда довериться выводу, чем массивы отличаются от кортежей, почему расширяются литеральные типы и как any, unknown, never и void делят пространство значений.'
  ),
  sections: [
    {
      id: 'ts-ch1-s1',
      title: L('Compile time versus run time', 'Время компиляции и время выполнения'),
      body: L(
        'TypeScript is a separate language that compiles into JavaScript, and the compiler does two jobs: it checks the types and it emits plain JavaScript. The second job is a text transformation, and it removes every annotation, every interface, every generic parameter and every type-only import. What reaches the browser carries no type information at all, so a type costs nothing at run time and cannot protect you there either.\n\nThis is why a type error is a build failure and not a run time behaviour. If a function promises a number and returns a string, the program never starts; there is no branch in the emitted code that checks the promise. The flip side matters just as much: type annotations do not validate data that arrives from the outside. JSON.parse returns any, a query parameter is a string, and a cast only tells the compiler to stop complaining.\n\nBecause the checks live in the compiler, they apply to the code you write, not to the code you run. A value that entered the system from a network request, from local storage or from a third-party package has never been checked by TypeScript. The honest model is that the type system describes the shape the program believes it has, and the boundary where outside data enters is exactly where that belief has to be verified by hand.\n\nInterfaces and type aliases are the clearest illustration. Both exist only in the type world: an interface User produces no runtime object, no constructor and no check. The emitted JavaScript for a function that takes a User is identical to the emitted JavaScript for a function that takes no argument at all. Erasure is not an optimisation, it is the defining property of the language.',
        'TypeScript — отдельный язык, который компилируется в JavaScript, и у компилятора две работы: проверить типы и сгенерировать обычный JavaScript. Вторая работа — это преобразование текста, и оно удаляет каждую аннотацию, каждый интерфейс, каждый параметр типа и каждый импорт только для типов. В браузер попадает код вообще без информации о типах, поэтому тип ничего не стоит в рантайме и защитить вас там тоже не может.\n\nИменно поэтому ошибка типа — это провал сборки, а не поведение во время выполнения. Если функция обещает число, а возвращает строку, программа просто не запустится: в сгенерированном коде нет ни одной ветки, которая проверяла бы обещание. Обратная сторона не менее важна: аннотации не проверяют данные, пришедшие извне. JSON.parse возвращает any, параметр запроса — строка, а приведение типа лишь просит компилятор замолчать.\n\nПоскольку проверки живут в компиляторе, они относятся к коду, который вы пишете, а не к коду, который выполняется. Значение, попавшее в систему из сетевого запроса, из local storage или из стороннего пакета, TypeScript никогда не проверял. Честная модель такова: система типов описывает форму, в которую программа верит, и граница, где входят внешние данные, — это ровно то место, где веру приходится проверять руками.\n\nИнтерфейсы и алиасы типов — самый наглядный пример. Оба существуют только на уровне типов: interface User не создаёт ни рантайм-объекта, ни конструктора, ни проверки. Сгенерированный JavaScript для функции, принимающей User, неотличим от кода функции, не принимающей аргументов вовсе. Стирание — это не оптимизация, а определяющее свойство языка.'
      ),
      bullets: [
        L('TypeScript compiles to JavaScript, and every type is erased during the emit.', 'TypeScript компилируется в JavaScript, и все типы стираются при генерации кода.'),
        L('A type error stops the build, it never changes run time behaviour.', 'Ошибка типа останавливает сборку и никогда не меняет поведение в рантайме.'),
        L('Interfaces, type aliases and generics produce no runtime code at all.', 'Интерфейсы, алиасы типов и дженерики не дают никакого рантайм-кода.'),
        L('JSON.parse returns any, so external data is never checked by TypeScript.', 'JSON.parse возвращает any, поэтому внешние данные TypeScript не проверяет.'),
        L('A cast silences the compiler, it never verifies the value.', 'Приведение типа успокаивает компилятор, но не проверяет значение.'),
      ],
      code: `interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Ada' };

// The annotation and the interface disappear from the emitted code.
function greet(u: User): string {
  return 'Hello, ' + u.name;
}

console.log(greet(user));   // 'Hello, Ada'
console.log(typeof user);   // 'object' - only the runtime value survives

// A cast promises a shape, it never checks it.
const raw = JSON.parse('{"id":7,"name":"Grace"}') as User;
console.log(raw.name);     // 'Grace'`,
      table: {
        caption: L('What survives the compilation', 'Что остаётся после компиляции'),
        headers: [
          L('Source', 'Исходник'),
          L('After compilation', 'После компиляции'),
          L('Checked at run time', 'Проверяется в рантайме'),
        ],
        rows: [
          [
            L('const x: number = 1', 'const x: number = 1'),
            L('const x = 1', 'const x = 1'),
            L('no', 'нет'),
          ],
          [
            L('interface User { id: string }', 'interface User { id: string }'),
            L('nothing at all', 'ничего вообще'),
            L('no', 'нет'),
          ],
          [
            L('function f(a: string): number', 'function f(a: string): number'),
            L('function f(a) { }', 'function f(a) { }'),
            L('no', 'нет'),
          ],
          [
            L('if (typeof x === "string")', 'if (typeof x === "string")'),
            L('the same check', 'та же проверка'),
            L('yes', 'да'),
          ],
          [
            L('value as const', 'value as const'),
            L('the same object literal', 'тот же литерал объекта'),
            L('no', 'нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Types do not validate data', 'Типы не проверяют данные'),
          text: L(
            'A type error means the build stops, not that the running program is safe. Values that arrive from a request, a file or a package were never checked, so the annotation on them is a claim rather than a guarantee. Narrow unknown at the boundary.',
            'Ошибка типа означает, что сборка остановилась, а не то, что программа в рантайме безопасна. Значения, пришедшие из запроса, из файла или из пакета, никто не проверял, поэтому аннотация на них — это утверждение, а не гарантия. Сужайте unknown на границе.'
          ),
        },
      ],
      takeaway: L(
        'Types live in the compiler only: they gate the build and never run.',
        'Типы живут только в компиляторе: они останавливают сборку и никогда не выполняются.'
      ),
      seeAlso: [
        L('Section 1-2: when to annotate and when to let inference decide', 'Секция 1-2: когда аннотировать, а когда довериться выводу'),
        L('Section 2-5: type predicates and assertion functions', 'Секция 2-5: предикаты типа и утверждающие функции'),
        L('Chapter 3: interfaces, type aliases and generics', 'Глава 3: интерфейсы, алиасы типов и дженерики'),
      ],
    },
    {
      id: 'ts-ch1-s2',
      title: L('Annotations, inference and contextual typing', 'Аннотации, вывод типов и контекстная типизация'),
      body: L(
        'Inference reads the code and derives the type from it. A literal produces a primitive type, an array literal produces an array type, and a function literal produces a signature. Inference is the better default because it cannot drift away from the value: change the initialiser and the type changes with it, so the annotation never turns into a lie.\n\nAnnotation is for the information a value cannot carry. An empty array has no element type to infer: a const binding gives it never[], a let binding gives it an array type that widens with the first value assigned to it, and neither of them can be used as a string[] without an annotation. A variable that starts as null and later holds a request needs the same annotation. A function parameter is the third case, because its type is chosen by the caller and not by the body.\n\nContextual typing is the third tool. When a function is written where a specific type is expected, the parameters are typed from that context instead of from the body. The callback of map receives a string when the array holds strings, with not a single annotation written. Contextual typing is what makes it safe to hand an inline arrow function to an API that knows nothing about what you are about to return.\n\nThe practical rule is simple. Let inference handle the local variables, annotate the boundary of every public function, and add an annotation wherever the inferred type is wider than the truth. An annotation that contradicts the value is a compile error rather than a silent conversion, which is exactly what you want: the compiler is telling you that the code and the comment disagree.',
        'Вывод типов читает код и определяет тип по нему. Литерал даёт примитивный тип, литерал массива — тип массива, литерал функции — сигнатуру. Выводу стоит доверять по умолчанию, потому что он не может разойтись со значением: изменился инициализатор — изменился и тип, и аннотация никогда не превратится в ложь.\n\nАннотация нужна там, где тип несёт информацию, которой нет в самом значении. У пустого массива нет типа элемента, который можно вывести: привязка const даёт ему never[], привязка let — тип массива, расширяющийся с первым присвоенным значением, и ни один из них нельзя использовать как string[] без аннотации. То же самое с переменной, которая начинается с null, а позже хранит ответ запроса. Третий случай — параметр функции: его тип выбирает вызывающий, а не тело функции.\n\nТретий инструмент — контекстная типизация. Когда функция пишется там, где ожидается конкретный тип, параметры типизируются из этого контекста, а не из тела. Колбэк map получает строку, если массив хранит строки, и ни одной аннотации писать не пришлось. Именно контекстная типизация делает безопасной передачу стрелочной функции в API, который ничего не знает о том, что вы вернёте.\n\nПрактическое правило простое. Выводу поручите локальные переменные, аннотируйте границу каждой публичной функции и добавляйте аннотацию там, где выведенный тип шире правды. Аннотация, противоречащая значению, — это ошибка компиляции, а не тихое приведение, и это как раз то, что нужно: компилятор говорит, что код и комментарий расходятся.'
      ),
      bullets: [
        L('Inference derives the type from the initialiser, so it never goes stale.', 'Вывод берёт тип из инициализатора, поэтому он не устаревает.'),
        L('Annotate where the value carries no type: empty arrays, null starts, parameters.', 'Аннотируйте там, где тип несут не значение: пустые массивы, null в начале, параметры.'),
        L('Contextual typing types a callback from the function it is passed to.', 'Контекстная типизация задаёт тип колбэка по функции, в которую он передан.'),
        L('An annotation that contradicts the value is a compile error, not a conversion.', 'Аннотация, противоречащая значению, — ошибка компиляции, а не приведение.'),
        L('Annotate the public API even when the body could be inferred.', 'Аннотируйте публичный API, даже если тело позволяет вывести тип.'),
      ],
      code: `// Inference reads the initialiser.
const count = 42;              // number
const label = 'active';        // string

// An empty array has no element type to infer.
const tags: string[] = [];     // string[]

// Contextual typing: the parameter type comes from the signature.
function handle(value: string | number): void {
  console.log(typeof value);
}
handle('text');

// The callback parameter is typed by the function it is passed to.
const lengths = ['one', 'two'].map((word) => word.length);

console.log(count, label, tags.length, lengths);`,
      table: {
        caption: L('Where the type comes from', 'Откуда берётся тип'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Type comes from', 'Источник типа'),
          L('Example', 'Пример'),
        ],
        rows: [
          [
            L('Local variable', 'Локальная переменная'),
            L('The initialiser', 'Инициализатор'),
            L('const total = 42', 'const total = 42'),
          ],
          [
            L('Empty array', 'Пустой массив'),
            L('Nothing, so annotate', 'Ниоткуда, значит аннотация'),
            L('const items: string[] = []', 'const items: string[] = []'),
          ],
          [
            L('Function parameter', 'Параметр функции'),
            L('The annotation', 'Аннотация'),
            L('function log(msg: string)', 'function log(msg: string)'),
          ],
          [
            L('Callback argument', 'Аргумент-колбэк'),
            L('The enclosing call', 'Окружающий вызов'),
            L('items.map((item) => item.id)', 'items.map((item) => item.id)'),
          ],
          [
            L('Return value', 'Возвращаемое значение'),
            L('The body, or the annotation', 'Тело или аннотация'),
            L('function id(): string', 'function id(): string'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Annotate the public surface', 'Аннотируйте публичную поверхность'),
          text: L(
            'An exported function whose parameters are inferred gives the caller no contract to break. The annotation is the part of the signature that other people read.',
            'У экспортируемой функции с выведенными параметрами вызывающий не получает контракта, который можно нарушить. Аннотация — это часть сигнатуры, которую читают другие люди.'
          ),
        },
        {
          tone: 'note',
          title: L('The empty array hole', 'Дыра с пустым массивом'),
          text: L(
            'An empty array literal carries no element type, so the compiler has to invent one. Write the element type next to it and the hole disappears.',
            'Литерал пустого массива не несёт типа элемента, и компилятору приходится его выдумывать. Напишите тип элемента рядом — и дыра исчезнет.'
          ),
        },
      ],
      takeaway: L(
        'Annotate where inference cannot express the intent, and let it do the rest.',
        'Аннотируйте там, где вывод не передаёт замысел, а остальное доверите выводу.'
      ),
      seeAlso: [
        L('Section 1-4: literal types and the rules of widening', 'Секция 1-4: литеральные типы и правила расширения типа'),
        L('Section 3-4: generic functions and inference', 'Секция 3-4: обобщённые функции и вывод типов'),
        L('Chapter 4: keyof, mapped types and utility types', 'Глава 4: keyof, отображаемые типы и утилитные типы'),
      ],
    },
    {
      id: 'ts-ch1-s3',
      title: L('Primitives, arrays, tuples and readonly', 'Примитивы, массивы, кортежи и readonly'),
      body: L(
        'The primitive types are string, number, boolean, bigint, symbol, null and undefined, and they behave exactly like the JavaScript values they describe. Everything else is built from them: an array is a collection of one type, an object is a named set of values, and a tuple is an array whose length and positions are known in advance.\n\nArray<T> and T[] mean the same thing, and both describe a list where every element has the same type. A tuple, written [string, number], describes a list of a fixed length where each position carries its own type. A tuple is the right shape for a pair that always travels together, such as a key and a value returned by Map.entries, and the wrong shape for a collection that grows.\n\nReadonly is a separate axis. A readonly array or a readonly tuple forbids every mutation through that type: no push, no splice, no assignment to an index. The rule exists at the type level only, so a value that arrived from a network request is still mutable in the running program. Treat readonly as a promise you make to the readers of the code, and keep it wherever a value is shared.\n\nChoosing between an array and a tuple is a decision about how much the compiler should know. An array says there are zero or more items of one type, and it protects every element. A tuple says exactly two items of two types, and it protects the positions as well. Both protect the elements; only the tuple protects the count and the order.',
        'Примитивные типы — это string, number, boolean, bigint, symbol, null и undefined, и они ведут себя ровно так же, как описываемые ими значения JavaScript. Всё остальное строится из них: массив — это коллекция одного типа, объект — именованный набор значений, а кортеж — массив, у которого заранее известны длина и позиции.\n\nArray<T> и T[] означают одно и то же, и оба описывают список, где у каждого элемента один и тот же тип. Кортеж, записанный как [string, number], описывает список фиксированной длины, где у каждой позиции свой тип. Кортеж — правильная форма для пары, которая всегда ходит вместе, скажем для ключа и значения из Map.entries, и неправильная для коллекции, которая растёт.\n\nReadonly — отдельная ось. У readonly-массива или readonly-кортежа запрещена любая мутация через этот тип: ни push, ни splice, ни присваивания по индексу. Правило существует только на уровне типов, поэтому значение, пришедшее из сетевого запроса, в работающей программе всё ещё можно изменить. Относитесь к readonly как к обещанию, которое вы даёте читателям кода, и держите его везде, где значение разделяют.\n\nВыбор между массивом и кортежем — это решение о том, сколько компилятор должен знать. Массив говорит: элементов ноль или больше, и у всех один тип; он защищает каждый элемент. Кортеж говорит: элементов ровно два, и у каждого свой тип; он защищает ещё и позиции. Оба защищают элементы, но только кортеж защищает количество и порядок.'
      ),
      bullets: [
        L('Seven primitives: string, number, boolean, bigint, symbol, null, undefined.', 'Семь примитивов: string, number, boolean, bigint, symbol, null, undefined.'),
        L('T[] and Array<T> are the same type written differently.', 'T[] и Array<T> — один и тот же тип, записанный по-разному.'),
        L('A tuple fixes the length and gives every position its own type.', 'Кортеж фиксирует длину и задаёт каждой позиции свой тип.'),
        L('readonly forbids mutation through the type, not in the running program.', 'readonly запрещает мутацию через тип, а не в работающей программе.'),
        L('ReadonlyArray<T> is the generic spelling of readonly T[].', 'ReadonlyArray<T> — родовая запись readonly T[].'),
      ],
      code: `const pair: [string, number] = ['id', 7];
pair[0] = 'key';        // allowed, the tuple knows the type per position
// pair[2] = 'x';      // error: the tuple has no index 2

const fixed: readonly [string, number] = ['id', 7];
// fixed[0] = 'key';   // error: the tuple is readonly

const names: readonly string[] = ['a', 'b'];
// names.push('c');    // error: a readonly array has no push

// readonly is a type level rule, the value is still mutable.
const mutable = names as string[];
mutable.push('c');

console.log(pair, fixed, mutable);`,
      table: {
        caption: L('Array, tuple or readonly', 'Массив, кортеж или readonly'),
        headers: [
          L('Type', 'Тип'),
          L('Length', 'Длина'),
          L('Element types', 'Типы элементов'),
          L('Mutable', 'Изменяем'),
        ],
        rows: [
          [
            L('string[]', 'string[]'),
            L('any', 'любая'),
            L('all string', 'все string'),
            L('yes', 'да'),
          ],
          [
            L('[string, number]', '[string, number]'),
            L('exactly 2', 'ровно 2'),
            L('one per position', 'по одному на позицию'),
            L('yes', 'да'),
          ],
          [
            L('readonly string[]', 'readonly string[]'),
            L('any', 'любая'),
            L('all string', 'все string'),
            L('no', 'нет'),
          ],
          [
            L('readonly [string, number]', 'readonly [string, number]'),
            L('exactly 2', 'ровно 2'),
            L('one per position', 'по одному на позицию'),
            L('no', 'нет'),
          ],
          [
            L('string | number[]', 'string | number[]'),
            L('depends on the member', 'зависит от варианта'),
            L('a string, or an array of numbers', 'строка или массив чисел'),
            L('the array member only', 'только у варианта-массива'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('readonly is erased too', 'readonly тоже стирается'),
          text: L(
            'A readonly array stops the compiler, not the program. A cast back to a mutable array restores push, and the value that came from a request was never readonly in the first place. Keep the value itself immutable, do not only mark it.',
            'readonly-массив останавливает компилятор, а не программу. Приведение обратно к изменяемому массиву возвращает push, а значение, пришедшее из запроса, вообще никогда не было readonly. Держите неизменяемым само значение, а не только пометку.'
          ),
        },
        {
          tone: 'note',
          title: L('Optional and rest elements', 'Необязательные и rest-элементы'),
          text: L(
            'A tuple may end with an optional element, written [string, number?], or with a rest element, written [string, ...number[]]. The first means one or two items, the second means one or more.',
            'Кортеж может заканчиваться необязательным элементом, записанным как [string, number?], или rest-элементом, записанным как [string, ...number[]]. Первый означает один или два элемента, второй — один или больше.'
          ),
        },
      ],
      takeaway: L(
        'Pick the type that tells the truth about the length: an array for many, a tuple for exactly that many, readonly when the value is shared.',
        'Выбирайте тип, который правдив о длине: массив для многих, кортеж для ровно стольких, readonly — когда значение разделяют.'
      ),
      seeAlso: [
        L('Section 1-4: literal types and widening', 'Секция 1-4: литеральные типы и расширение типа'),
        L('Section 3-3: index signatures and excess property checks', 'Секция 3-3: индексные сигнатуры и проверка лишних свойств'),
        L('Section 4-2: mapped types and their modifiers', 'Секция 4-2: отображаемые типы и их модификаторы'),
      ],
    },
    {
      id: 'ts-ch1-s4',
      title: L('Literal types and widening', 'Литеральные типы и расширение типа'),
      body: L(
        'A literal type is the type of one exact value: "admin", 42, true. A union of literal types describes a closed set, and that is usually the right model for a status, a role or a mode. The compiler then rejects every value outside the set, and a switch over such a union can be checked for completeness.\n\nWidening is what happens to a literal when it is stored somewhere it could change. A let binding may be reassigned, so let status = "active" is typed string: the compiler remembers the value but drops the restriction. A const binding cannot be reassigned, so const mode = "strict" keeps the literal type. The same rule applies to object properties, which widen to their base type unless the object is frozen.\n\nThe const assertion, written as const, applies the same reasoning to a whole object or array. Every property becomes readonly at the type level, every number keeps its literal value, and every nested object gets the same treatment. It is the fastest way to describe a configuration object or a set of constants exactly as they were written.\n\nA union of string literals and an enumeration solve the same problem, and the differences are worth knowing. A literal union is a pure type: it disappears completely, it accepts a plain string in a switch case, and it is checked at compile time only. An enumeration exists at run time as an object, it is a real value that can be imported and compared, and it adds code to the bundle.',
        'Литеральный тип — это тип одного точного значения: "admin", 42, true. Объединение литеральных типов описывает закрытый набор, и это обычно правильная модель для статуса, роли или режима. Компилятор отвергает любое значение вне набора, а switch по такому объединению можно проверить на полноту.\n\nРасширение типа — это то, что происходит с литералом, когда его кладут туда, где он может измениться. Привязку let можно переприсвоить, поэтому let status = "active" имеет тип string: компилятор помнит значение, но теряет ограничение. Привязку const переприсвоить нельзя, поэтому const mode = "strict" сохраняет литеральный тип. То же правило касается свойств объектов: они расширяются до базового типа, если объект не заморожен.\n\nУтверждение const, записываемое как const, применяет ту же логику ко всему объекту или массиву. Каждое свойство становится readonly на уровне типа, каждое число сохраняет литеральное значение, и каждый вложенный объект получает то же самое. Это самый быстрый способ описать объект конфигурации или набор констант в точности так, как они написаны.\n\nОбъединение строковых литералов и перечисление решают одну и ту же задачу, и различия между ними стоит знать. Объединение литералов — чистый тип: оно полностью исчезает, принимает обычную строку в case и проверяется только на этапе компиляции. Перечисление существует в рантайме как объект, это реальное значение, которое можно импортировать и сравнивать, и оно добавляет код в бандл.'
      ),
      bullets: [
        L('A literal type is the type of one exact value, and a union of them is a closed set.', 'Литеральный тип — это тип одного точного значения, а объединение таких типов задаёт закрытый набор.'),
        L('let widens a literal to its base type, const keeps the literal.', 'let расширяет литерал до базового типа, const сохраняет литерал.'),
        L('Object properties widen too, unless the object is declared with as const.', 'Свойства объектов тоже расширяются, если объект не объявлен через as const.'),
        L('as const makes an object or an array readonly at the type level and keeps literal types.', 'as const делает объект или массив readonly на уровне типа и сохраняет литеральные типы.'),
        L('A literal union is erased, an enumeration is a runtime value.', 'Объединение литералов стирается, а перечисление — это рантайм-значение.'),
      ],
      code: `let status = 'active';     // string - the literal widened
const mode = 'strict';     // 'strict' - const keeps the literal

const config = { kind: 'circle', size: 10 } as const;
// config.kind is 'circle', config.size is 10

type Status = 'idle' | 'running' | 'done';

function label(s: Status): string {
  return s;
}
// label('paused');       // error: 'paused' is not in the union

function setMode(m: 'light' | 'dark'): void {
  console.log(m);
}
setMode('light');

console.log(status, mode, config.kind, label('idle'));`,
      table: {
        caption: L('What the declaration gives you', 'Что даёт объявление'),
        headers: [
          L('Declaration', 'Объявление'),
          L('Inferred type', 'Выведенный тип'),
          L('Can change later', 'Можно изменить'),
        ],
        rows: [
          [
            L("let status = 'active'", "let status = 'active'"),
            L('string', 'string'),
            L('yes', 'да'),
          ],
          [
            L("const mode = 'strict'", "const mode = 'strict'"),
            L("'strict'", "'strict'"),
            L('no', 'нет'),
          ],
          [
            L("const o = { kind: 'circle' }", "const o = { kind: 'circle' }"),
            L('{ kind: string }', '{ kind: string }'),
            L('yes', 'да'),
          ],
          [
            L("const o = { kind: 'circle' } as const", "const o = { kind: 'circle' } as const"),
            L("{ readonly kind: 'circle' }", "{ readonly kind: 'circle' }"),
            L('no', 'нет'),
          ],
          [
            L('let n = 8080', 'let n = 8080'),
            L('number', 'number'),
            L('yes', 'да'),
          ],
          [
            L('const n = 8080', 'const n = 8080'),
            L('8080', '8080'),
            L('no', 'нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The property that widened', 'Свойство, которое расширилось'),
          text: L(
            'A literal inside an object literal widens like any other value, so the kind property of a plain object is a string and accepts anything. Declare the union on the property or freeze the object.',
            'Литерал внутри литерала объекта расширяется, как и любое другое значение, поэтому свойство kind у обычного объекта имеет тип string и принимает что угодно. Опишите на свойстве объединение или заморозьте объект.'
          ),
        },
        {
          tone: 'tip',
          title: L('as const is cheap', 'as const стоит почти ничего'),
          text: L(
            'The assertion is erased like every other type, so it costs nothing at run time and it keeps the narrowest possible type for the value. Use it on configuration objects and on sets of constants.',
            'Утверждение стирается, как и любой другой тип, поэтому оно ничего не стоит в рантайме и сохраняет самый узкий тип значения. Применяйте его к объектам конфигурации и к наборам констант.'
          ),
        },
      ],
      takeaway: L(
        'A literal type survives only where the value cannot change; as const is how you keep it everywhere.',
        'Литеральный тип сохраняется только там, где значение не меняется; as const сохраняет его везде.'
      ),
      seeAlso: [
        L('Section 1-3: arrays, tuples and readonly', 'Секция 1-3: массивы, кортежи и readonly'),
        L('Section 2-3: control flow analysis and exhaustiveness', 'Секция 2-3: анализ потока управления и проверка полноты'),
        L('Section 6-4: const assertions and as const', 'Секция 6-4: утверждения const и as const'),
      ],
    },
    {
      id: 'ts-ch1-s5',
      title: L('any, unknown, never and void', 'any, unknown, never и void'),
      body: L(
        'any is the escape hatch. A value of type any is assignable to every other type and every other type is assignable to it, so the checker stops looking at that value and at everything it flows into. It is the fastest way to silence a compiler and the slowest way to lose control of a codebase, because the damage spreads along the data flow.\n\nunknown is the opposite. Any value can be assigned to unknown, but nothing can be used as unknown except after the compiler has proved what it is. That proof is narrowing, and it costs a few lines at the boundary where the data arrives. The result is that a wrong shape in external data is reported at the boundary instead of two hundred lines later in the business logic.\n\nnever is the type of the impossible. A function that always throws has the return type never, and so does a branch that can never be reached, or an intersection whose members contradict each other. never is assignable to every type, which is what makes it useful as the last case of an exhaustive switch: when a new member is added to the union, that line stops compiling.\n\nvoid is what a function returns when the result carries no information. A void function may return nothing at all, and a callback typed () => void is allowed to return a value that the caller ignores. undefined is assignable to void, but a void value is not assignable back to undefined, so the two are not interchangeable: void promises that you should not use the result.',
        'any — это аварийный выход. Значение типа any присваивается любому другому типу, и любой другой тип присваивается ему, поэтому проверщик перестаёт смотреть и на это значение, и на всё, что через него проходит. Это самый быстрый способ успокоить компилятор и самый медленный способ потерять контроль над кодовой базой, потому что вред распространяется по потоку данных.\n\nunknown устроен наоборот. Любое значение присваивается unknown, но использовать unknown как что-либо можно только после того, как компилятор доказал, что это такое. Доказательство — это сужение, и оно стоит нескольких строк на границе, где данные приходят. Результат: неверная форма внешних данных сообщается на границе, а не через двести строк бизнес-логики.\n\nnever — тип невозможного. У функции, которая всегда бросает исключение, тип возврата never; он же у недостижимой ветки и у пересечения, члены которого противоречат друг другу. never присваивается любому типу, и именно поэтому он полезен как последний случай исчерпывающего switch: когда в объединение добавляют нового участника, эта строка перестаёт компилироваться.\n\nvoid — то, что возвращает функция, когда результат не несёт информации. Функция типа void может не возвращать ничего вовсе, а колбэк типа () => void вправе вернуть значение, которое вызывающий проигнорирует. undefined присваивается void, но значение типа void не присваивается обратно undefined, поэтому это не взаимозаменяемые вещи: void обещает, что результат использовать не нужно.'
      ),
      bullets: [
        L('any disables checking in both directions and spreads to everything it touches.', 'any отключает проверки в обе стороны и распространяется на всё, чего касается.'),
        L('unknown accepts every value and must be narrowed before any use.', 'unknown принимает любое значение, и его нужно сузить перед использованием.'),
        L('never is the type of impossible values and is assignable to every type.', 'never — тип невозможных значений, и он присваивается любому типу.'),
        L('void says the result is not worth using, not that it is undefined.', 'void означает, что результат не нужен, а не что он равен undefined.'),
        L('A never-returning function ends the control flow analysis for the compiler.', 'Функция, возвращающая never, завершает анализ потока управления для компилятора.'),
      ],
      code: `function parse(raw: string): unknown {
  return JSON.parse(raw);
}

const value = parse('{"id":1}');
if (typeof value === 'object' && value !== null && 'id' in value) {
  console.log(value.id);   // unknown, but the property exists
}

function fail(message: string): never {
  throw new Error(message);
}

function unwrap<T>(value: T | undefined): T {
  if (value === undefined) {
    fail('value is required');
  }
  return value;
}
const loose: any = 'text';
const run: () => void = () => console.log('done');
console.log(loose.toUpperCase(), unwrap(1), run());`,
      table: {
        caption: L('The four special types', 'Четыре особых типа'),
        headers: [
          L('Type', 'Тип'),
          L('Accepts', 'Принимает'),
          L('Usable as', 'Можно использовать как'),
          L('Typical role', 'Типичная роль'),
        ],
        rows: [
          [
            L('any', 'any'),
            L('any value', 'любое значение'),
            L('any value', 'любое значение'),
            L('the escape hatch', 'аварийный выход'),
          ],
          [
            L('unknown', 'unknown'),
            L('any value', 'любое значение'),
            L('nothing, until narrowed', 'ничего, пока не сужено'),
            L('input from outside', 'вход извне'),
          ],
          [
            L('never', 'never'),
            L('nothing', 'ничего'),
            L('every type', 'любой тип'),
            L('impossible branch', 'невозможная ветка'),
          ],
          [
            L('void', 'void'),
            L('an ignored result', 'игнорируемый результат'),
            L('nothing useful', 'ничего полезного'),
            L('a function without a result', 'функция без результата'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('any is contagious', 'any заразен'),
          text: L(
            'One any in a signature infects every value that passes through it, and the error surfaces far from the cause. Type the boundary as unknown and narrow it once, and the damage stops there.',
            'Одно any в сигнатуре заражает все значения, проходящие через неё, а ошибка всплывает далеко от причины. Типизируйте границу как unknown и сузьте один раз — вред остановится там.'
          ),
        },
      ],
      takeaway: L(
        'Prefer unknown over any, use never to prove exhaustiveness, and read void as a promise that the result will not be used.',
        'Предпочитайте unknown вместо any, используйте never для доказательства полноты, а void читайте как обещание, что результат не понадобится.'
      ),
      seeAlso: [
        L('Section 2-2: narrowing unknown with typeof and in', 'Секция 2-2: сужение unknown через typeof и in'),
        L('Section 2-3: exhaustiveness with assertNever', 'Секция 2-3: полнота через assertNever'),
        L('Section 2-5: type predicates and assertion functions', 'Секция 2-5: предикаты типа и утверждающие функции'),
      ],
    },
  ],
};
