import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh06: Chapter = {
  id: 'ts-ch6',
  title: L('Branded types and safe APIs', 'Брендированные типы и безопасные API'),
  summary: L(
    'How to make the compiler tell two values apart when they share a primitive type, how to validate data that arrives from outside the program, and how satisfies and as const keep the literal information that annotations and casts throw away.',
    'Как заставить компилятор различать значения с одинаковым примитивным типом, как проверять данные, приходящие извне программы, и как satisfies и as const сохраняют литеральную информацию, которую теряют аннотации и приведения типов.'
  ),
  sections: [
    {
      id: 'ts-ch6-s1',
      title: L('Nominal typing with brands', 'Номинальная типизация с помощью брендов'),
      body: L(
        'TypeScript is structural: two types are compatible when they have the same members, no matter what those members mean. A UserId and an OrderId are both strings, so a function that expects a UserId happily accepts an OrderId, and the mistake surfaces only when the database returns the wrong row. The long-standing answer is a class with a private field, which is heavier than a value ever needs to be.\n\nA brand adds a hidden tag to a primitive without changing anything at runtime. The type UserId = string and a marker of UserId is still a string for every operation that matters, but the compiler now refuses to mix it with OrderId, because the tags differ. The marker is a property that only that type has, and it is what makes the two types incompatible.\n\nThe tag has to be something a plain object cannot have by accident. A string key such as __brand can be written by any object literal that happens to contain it, so two different brands can collide and lose their meaning. A unique symbol used as the key cannot be produced outside the module that declares it, so the brand cannot be forged and the set of branded types stays closed.\n\nBranding is a compile-time tool and nothing else. The value that crosses the boundary is still the same string, and no runtime check happens anywhere. All the work sits in one function that takes the raw value, validates it and returns the branded type, and every other function in the program can then trust the type instead of repeating the check.',
        'TypeScript структурный: два типа совместимы, если у них одинаковые члены, независимо от смысла этих членов. UserId и OrderId — оба строки, поэтому функция, ждущая UserId, спокойно принимает OrderId, и ошибка обнаруживается только тогда, когда база возвращает не ту строку. Долгое время ответом был класс с приватным полем, но для значения это слишком тяжёлый инструмент.\n\nБренд добавляет к примитиву скрытую метку, не меняя ничего во время выполнения. Тип UserId, то есть string с меткой UserId, остаётся строкой для всех важных операций, но компилятор больше не даёт смешивать его с OrderId, потому что метки разные. Метка — это свойство, которое есть только у этого типа, и именно она делает два типа несовместимыми.\n\nМетка должна быть тем, что обычный объект не может получить случайно. Строковый ключ вроде __brand может появиться в любом литерале объекта, который его содержит, и тогда два разных бренда столкнутся и потеряют смысл. Уникальный символ, использованный как ключ, нельзя создать за пределами модуля, который его объявил, поэтому бренд нельзя подделать, а множество брендированных типов остаётся закрытым.\n\nБрендирование — это инструмент времени компиляции и только. Значение, пересекающее границу, остаётся той же строкой, и никакой проверки во время выполнения не происходит. Вся работа сосредоточена в одной функции, которая принимает сырое значение, проверяет его и возвращает брендированный тип, и тогда все остальные функции программы доверяют типу, а не повторяют проверку.'
      ),
      bullets: [
        L('A brand is an intersection of a primitive with a unique tagged type.', 'Бренд — это пересечение примитива с уникальным типом с меткой.'),
        L('The runtime value is unchanged, only the compile-time meaning differs.', 'Значение во время выполнения не меняется, различается только смысл на этапе компиляции.'),
        L('A unique symbol key cannot be forged from outside the declaring module.', 'Ключ на уникальном символе нельзя подделать за пределами модуля.'),
        L('Branded types are compatible with their base primitive but not with each other.', 'Брендированные типы совместимы со своим примитивом, но не друг с другом.'),
        L('Only the validating function should create branded values.', 'Создавать брендированные значения должна только функция проверки.'),
      ],
      code: `declare const brand: unique symbol;

// Each meaning gets its own type
type UserId = string & { readonly [brand]: 'UserId' };
type OrderId = string & { readonly [brand]: 'OrderId' };

// The brand is attached by the function that checks the value
function toUserId(value: string): UserId {
  if (value.length === 0) throw new Error('empty id');
  return value as UserId;
}

const uid = toUserId('u-1');

// const oid: OrderId = uid; // Error: UserId is not assignable to OrderId`,
      table: {
        caption: L('What a brand changes', 'Что меняет бренд'),
        headers: [L('Aspect', 'Аспект'), L('plain string', 'обычная строка'), L('branded string', 'брендированная строка')],
        rows: [
          [L('Runtime value', 'Значение во время выполнения'), L('a string', 'строка'), L('a string', 'строка')],
          [L('Assignable to string', 'Присваивается строке'), L('yes', 'да'), L('yes', 'да')],
          [L('Assignable to OrderId', 'Присваивается OrderId'), L('yes', 'да'), L('no', 'нет')],
          [L('How to create it', 'Как создать'), L('a string literal', 'строковый литерал'), L('a validating function', 'функция с проверкой')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The brand is not a runtime check', 'Бренд не заменяет проверку во время выполнения'),
          text: L(
            'A branded value carries no marker at runtime. A string that came out of JSON.parse is still a string, so the branded type has to be produced by code that actually inspected the value, otherwise the brand is a promise nobody keeps.',
            'Брендированное значение не несёт никакой метки во время выполнения. Строка из JSON.parse остаётся строкой, поэтому брендированный тип должен производить код, который действительно проверил значение, иначе бренд — обещание, которое никто не держит.'
          ),
        },
      ],
      takeaway: L(
        'Give each meaning its own primitive type with a unique symbol brand, and produce branded values only in the function that validates them.',
        'Дайте каждому смыслу свой тип примитива с уникальным символом в качестве бренда и создавайте брендированные значения только в функции, которая проверяет их.'
      ),
      seeAlso: [
        L('Section 1-5: any, unknown, never and void', 'Секция 1-5: any, unknown, never и void'),
        L('Section 6-2: parsing at the boundary', 'Секция 6-2: разбор на границе'),
        L('Section 3-4: generic functions and inference', 'Секция 3-4: дженерик-функции и вывод типов'),
      ],
    },
    {
      id: 'ts-ch6-s2',
      title: L('Parsing at the boundary', 'Разбор на границе'),
      body: L(
        'Data that crosses a boundary is not typed by your code. A response body, a query parameter or a message from a queue all arrive as values the compiler has never seen, and the only honest type for them is unknown. The trap is the opposite habit: casting the value to the shape you expect turns a runtime uncertainty into a compile-time lie that fails the first time the server sends something new.\n\nThe fix is to parse at the boundary and trust the types inside. A parse function takes unknown, checks the value against the shape you expect, and returns either the typed value or a typed error. After that point the rest of the program works with real types, and the only piece of code that has to know the outside world is unreliable is the parser itself.\n\nThere are two common shapes for the result. The throwing version throws a typed error and keeps the return type clean, which reads well but forces every caller into a try block. The result version returns a union of success and failure, which makes the failure visible in the signature and lets the caller decide. For code that runs on every keystroke or every response, the result version usually wins.\n\nA type predicate turns a plain boolean check into a promise the compiler believes. When the check is written as value is UserDto, the compiler narrows unknown to UserDto after the call, so no cast is needed and the parsed value flows into the rest of the function as a real type. The predicate is only as good as the check behind it, so the check has to be written completely.',
        'Данные, пересекающие границу, не типизированы вашим кодом. Тело ответа, параметр запроса или сообщение из очереди приходят значениями, которых компилятор никогда не видел, и единственный честный тип для них — unknown. Ловушка в обратной привычке: приведение значения к ожидаемой форме превращает неопределённость во время выполнения в ложь на этапе компиляции, которая всплывает, как только сервер пришлёт что-то новое.\n\nРешение — разбирать данные на границе и доверять типам внутри. Функция разбора принимает unknown, проверяет значение по ожидаемой форме и возвращает либо типизированное значение, либо типизированную ошибку. После этого остальная программа работает с настоящими типами, и единственный фрагмент кода, который обязан знать, что внешний мир ненадёжен, — сам парсер.\n\nУ результата есть две распространённые формы. Вариант с исключением бросает типизированную ошибку и оставляет тип возврата чистым — это читается хорошо, но заставляет каждого вызывающего оборачивать вызов в try. Вариант с результатом возвращает объединение успеха и ошибки, благодаря чему отказ виден в сигнатуре и решение остаётся за вызывающим. Для кода, который выполняется на каждый ввод или каждый ответ, чаще выигрывает вариант с результатом.\n\nПредикат типа превращает обычную булеву проверку в обещание, которому компилятор верит. Когда проверка записана как value is UserDto, после вызова компилятор сужает unknown до UserDto, поэтому приведение не нужно, а разобранное значение дальше по функции течёт как настоящий тип. Предикат надёжен ровно настолько, насколько надёжна проверка за ним, а значит, проверка должна быть полной.'
      ),
      bullets: [
        L('Unknown is the only honest type for data from outside the program.', 'Unknown — единственный честный тип для данных извне программы.'),
        L('A cast at the boundary removes the check instead of performing it.', 'Приведение на границе убирает проверку вместо того, чтобы её выполнить.'),
        L('A parse function returns a typed value or a typed error.', 'Функция разбора возвращает типизированное значение или типизированную ошибку.'),
        L('A type predicate narrows unknown without a cast.', 'Предикат типа сужает unknown без приведения.'),
        L('Only the parser needs to know that the outside world is unreliable.', 'О том, что внешний мир ненадёжен, должен знать только парсер.'),
      ],
      code: `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

interface UserDto {
  id: string;
  name: string;
  age: number;
}

function isUserDto(value: unknown): value is UserDto {
  if (typeof value !== 'object' || value === null) return false;
  if (!('id' in value) || !('name' in value) || !('age' in value)) return false;
  return typeof value.id === 'string' && typeof value.name === 'string' && typeof value.age === 'number';
}

function parseUser(raw: unknown): Result<UserDto, string> {
  return isUserDto(raw) ? { ok: true, value: raw } : { ok: false, error: 'invalid user payload' };
}`,
      table: {
        caption: L('Two ways to accept unknown data', 'Два способа принять неизвестные данные'),
        headers: [L('Approach', 'Подход'), L('The compiler learns', 'Что узнаёт компилятор'), L('Failure mode', 'Как проявится отказ')],
        rows: [
          [L('value as UserDto', 'value as UserDto'), L('nothing', 'ничего'), L('a crash inside the app', 'падение внутри приложения')],
          [L('value is UserDto', 'value is UserDto'), L('the narrowed type', 'суженный тип'), L('a rejected payload', 'отклонённая полезная нагрузка')],
          [L('parseUser(value)', 'parseUser(value)'), L('the result union', 'объединение результата'), L('a typed error value', 'типизированное значение ошибки')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('unknown, not any', 'unknown, а не any'),
          text: L(
            'any switches off the checking that the rest of the type system relies on, and a value typed as any spreads through every function it touches. Keep unknown at the boundary and let the parser narrow it, so a forgotten check becomes a compile error instead of a runtime surprise.',
            'any отключает проверки, на которых держится вся остальная система типов, и значение типа any проникает в каждую функцию, которую затрагивает. Держите unknown на границе и сужайте его в парсере, чтобы забытая проверка стала ошибкой компиляции, а не сюрпризом во время выполнения.'
          ),
        },
      ],
      takeaway: L(
        'Accept unknown at every boundary, parse it once into a real type, and let the rest of the program trust the parser.',
        'Принимайте unknown на каждой границе, разбирайте его один раз в настоящий тип и доверяйте парсеру в остальной программе.'
      ),
      seeAlso: [
        L('Section 2-5: type predicates and assertion functions', 'Секция 2-5: предикаты типов и функции-утверждения'),
        L('Section 1-5: any, unknown, never and void', 'Секция 1-5: any, unknown, never и void'),
        L('Section 6-1: nominal typing with brands', 'Секция 6-1: номинальная типизация с помощью брендов'),
      ],
    },
    {
      id: 'ts-ch6-s3',
      title: L('satisfies and literal validation', 'satisfies и проверка литералов'),
      body: L(
        'There are three ways to attach a type to an expression and they are not interchangeable. An annotation checks the value and then replaces its type with the annotation. A cast checks nothing at all and replaces the type with whatever you wrote. The satisfies operator checks the value and keeps the type the compiler inferred, so the expression stays exactly as narrow as it was.\n\nThe difference shows up with literals. An annotated literal widens to the annotated type, so the specific value is gone from the type system. A literal checked with satisfies keeps its literal type, because the check happened in place and the annotation never widened anything. The same applies to arrays and objects: satisfies verifies a shape without turning the value into that shape.\n\nsatisfies also keeps excess property checks, which a cast does not. An object literal with a property the target type does not declare is an error under satisfies and under an annotation, and is accepted silently under as. That difference matters when a configuration object or a list of routes is validated against a declared shape.\n\nThe trade-off is that satisfies does not make anything readonly. A mutable object literal checked with satisfies still has mutable properties, and its literal types widen to their base types. When you want the narrow types and the immutability together, as const is the companion operator, and combining the two gives a checked, deeply readonly value.',
        'Есть три способа привязать тип к выражению, и они не взаимозаменяемы. Аннотация проверяет значение, а потом заменяет его тип аннотацией. Приведение не проверяет ничего и заменяет тип написанным вами. Оператор satisfies проверяет значение и сохраняет тип, выведенный компилятором, поэтому выражение остаётся ровно настолько узким, насколько было изначально.\n\nРазница видна на литералах. Литерал с аннотацией расширяется до типа аннотации, и конкретное значение исчезает из системы типов. Литерал, проверенный через satisfies, сохраняет литеральный тип, потому что проверка произошла на месте и аннотация ничего не расширяла. То же самое с массивами и объектами: satisfies проверяет форму, не превращая значение в эту форму.\n\nsatisfies сохраняет и проверку лишних свойств, которой нет у приведения. Объектный литерал со свойством, не объявленным в целевом типе, — ошибка и при satisfies, и при аннотации, а при as принимается молча. Разница важна, когда конфигурация или список маршрутов проверяется по объявленной форме.\n\nПлата за satisfies в том, что он не делает ничего readonly. Изменяемый объектный литерал, проверенный через satisfies, по-прежнему имеет изменяемые свойства, а его литеральные типы расширяются до базовых. Когда нужны и узкие типы, и неизменяемость, дополнением служит as const, и вместе они дают проверенное, глубоко неизменяемое значение.'
      ),
      bullets: [
        L('An annotation validates and then widens to the annotated type.', 'Аннотация проверяет, а затем расширяет до типа аннотации.'),
        L('A cast validates nothing and asserts whatever you wrote.', 'Приведение не проверяет ничего и утверждает написанное вами.'),
        L('satisfies validates and keeps the inferred type of the expression.', 'satisfies проверяет и сохраняет выведенный тип выражения.'),
        L('Excess property checks still fire under satisfies.', 'Проверка лишних свойств продолжает работать и при satisfies.'),
        L('satisfies does not make properties readonly, as const does.', 'satisfies не делает свойства readonly, это делает as const.'),
      ],
      code: `type Color = 'red' | 'green' | 'blue';

// Annotation: the value is checked, the literal widens to the union
const a: Color = 'red'; // a: Color

// satisfies: the value is checked, the literal type is kept
const b = 'red' satisfies Color; // b: 'red'

// as: nothing is checked, the result is the asserted type
const c = 'red' as Color; // c: Color

// A table of routes keeps its exact shape
const routes = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
] satisfies { path: string; title: string }[];`,
      table: {
        caption: L('What each operator does to the type of the expression', 'Что каждый оператор делает с типом выражения'),
        headers: [L('Form', 'Форма'), L('Checks the value', 'Проверяет значение'), L('Type of the expression', 'Тип выражения')],
        rows: [
          [L('const x: T = value', 'const x: T = value'), L('yes', 'да'), L('T', 'T')],
          [L('const x = value as T', 'const x = value as T'), L('no', 'нет'), L('T', 'T')],
          [L('const x = value satisfies T', 'const x = value satisfies T'), L('yes', 'да'), L('the inferred type', 'выведенный тип')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('as silences the compiler', 'as заглушает компилятор'),
          text: L(
            'An assertion is a promise you make to the compiler and nothing checks it. Use as only where the compiler cannot see the reason, such as a value that was just validated by hand, and prefer satisfies everywhere else.',
            'Утверждение — это обещание, которое вы даёте компилятору, и никто его не проверяет. Используйте as только там, где компилятор не может увидеть причину, например для значения, проверенного вручную, а во всех остальных местах выбирайте satisfies.'
          ),
        },
      ],
      takeaway: L(
        'Use satisfies to check a value without widening it, and reserve as for the rare case where the compiler cannot see the truth.',
        'Используйте satisfies, чтобы проверить значение, не расширяя его, и оставляйте as для редкого случая, когда компилятор не может увидеть правду.'
      ),
      seeAlso: [
        L('Section 1-4: literal types and widening', 'Секция 1-4: литеральные типы и расширение типов'),
        L('Section 6-4: const assertions and as const', 'Секция 6-4: const-утверждения и as const'),
        L('Section 3-3: index signatures and excess property checks', 'Секция 3-3: индексные сигнатуры и проверка лишних свойств'),
      ],
    },
    {
      id: 'ts-ch6-s4',
      title: L('Const assertions and as const', 'Const-утверждения и as const'),
      body: L(
        'A const assertion asks the compiler for the narrowest possible type of an expression. The as const suffix turns a literal into a literal type, an array into a readonly tuple and an object into a deeply readonly object with literal property types. Nothing changes at runtime: the value is the same array and the same object, only the type gets more precise.\n\nThe pattern for reading a union out of an array is to declare the array with as const and index its type. The result is a union of the literal types of the elements, and that is how a list of allowed values becomes a type the rest of the program can use. Without the assertion the array widens to string[] and the union is lost.\n\nThe cost of the assertion is immutability, and it is not free. A readonly array cannot be passed to a function that expects a mutable array, and a deeply readonly object cannot be assigned to a type with mutable fields. That is usually the right outcome, but it means as const and satisfies solve different halves of the same problem and are often combined.\n\nThe rule for when to reach for it is narrow. Use as const when the exact set of values matters, such as a list of routes, a configuration table or a set of allowed literals. Do not use it to freeze large data structures at runtime; Object.freeze and readonly types are different tools, and only the type carries a guarantee about the compiler, not about the runtime.',
        'Const-утверждение просит у компилятора самый узкий возможный тип выражения. Суффикс as const превращает литерал в литеральный тип, массив — в кортеж только для чтения, а объект — в глубоко неизменяемый объект с литеральными типами свойств. Во время выполнения ничего не меняется: значение остаётся тем же массивом и тем же объектом, уточняется только тип.\n\nПриём чтения объединения из массива состоит в том, чтобы объявить массив с as const и взять тип по индексу. Результат — объединение литеральных типов элементов, и именно так список разрешённых значений превращается в тип, пригодный для остальной программы. Без утверждения массив расширяется до string[], и объединение теряется.\n\nПлата за утверждение — неизменяемость, и она не бесплатна. Массив только для чтения нельзя передать функции, ждущей изменяемый массив, а глубоко неизменяемый объект нельзя присвоить типу с изменяемыми полями. Обычно это правильный исход, но из-за него as const и satisfies решают разные половины одной задачи и часто применяются вместе.\n\nПравило, когда стоит браться за const-утверждение, узкое. Используйте as const, когда важна точная совокупность значений: список маршрутов, таблица конфигурации или набор разрешённых литералов. Не используйте его, чтобы заморозить большие структуры во время выполнения: Object.freeze и типы readonly — разные инструменты, и гарантию компилятору даёт только тип, а не среда выполнения.'
      ),
      bullets: [
        L('as const makes literal types, readonly arrays and readonly properties.', 'as const даёт литеральные типы, массивы только для чтения и неизменяемые свойства.'),
        L('It changes the type only, the runtime value stays the same.', 'Меняется только тип, значение во время выполнения остаётся прежним.'),
        L('Reading a union out of an array needs the assertion.', 'Чтобы прочитать объединение из массива, нужно утверждение.'),
        L('A readonly array is not assignable to a mutable array parameter.', 'Массив только для чтения не присваивается параметру изменяемого массива.'),
        L('as const does not freeze anything at runtime.', 'as const ничего не замораживает во время выполнения.'),
      ],
      code: `// as const freezes the literal types
const roles = ['admin', 'editor'] as const;
type Role = (typeof roles)[number]; // 'admin' | 'editor'

// Without the assertion the array widens to string[]
const loose = ['admin', 'editor'];
type LooseRole = (typeof loose)[number]; // string

// Objects become deeply readonly
const config = { retries: 3, tags: ['a'] } as const;
// config.retries is 3, config.tags is readonly ['a']

// A tuple keeps its positions
const pair = ['a', 1] as const; // readonly ['a', 1]`,
      table: {
        caption: L('What as const changes', 'Что меняет as const'),
        headers: [L('Expression', 'Выражение'), L('Without as const', 'Без as const'), L('With as const', 'С as const')],
        rows: [
          [L("'red'", "'red'"), L('string', 'string'), L("'red'", "'red'")],
          [L("['a', 'b']", "['a', 'b']"), L('string[]', 'string[]'), L("readonly ['a', 'b']", "readonly ['a', 'b']")],
          [L('{ n: 1 }', '{ n: 1 }'), L('{ n: number }', '{ n: number }'), L('{ readonly n: 1 }', '{ readonly n: 1 }')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Freeze for the runtime, as const for the compiler', 'Заморозка для среды выполнения, as const для компилятора'),
          text: L(
            'as const does not prevent a mutation at runtime, it only stops the compiler from allowing one. When you need the runtime guarantee, use Object.freeze, and remember that a frozen object is still mutable in TypeScript unless the type says otherwise.',
            'as const не запрещает мутацию во время выполнения, он лишь запрещает её компилятору. Когда нужна гарантия среды выполнения, используйте Object.freeze, и помните, что замороженный объект остаётся изменяемым в TypeScript, пока тип не говорит обратного.'
          ),
        },
      ],
      takeaway: L(
        'as const buys literal types and readonly at compile time, so use it for the set of allowed values rather than as a runtime freeze.',
        'as const покупает литеральные типы и неизменяемость на этапе компиляции, поэтому используйте его для набора разрешённых значений, а не как заморозку во время выполнения.'
      ),
      seeAlso: [
        L('Section 6-3: satisfies and literal validation', 'Секция 6-3: satisfies и проверка литералов'),
        L('Section 1-3: primitives, arrays, tuples and readonly', 'Секция 1-3: примитивы, массивы, кортежи и readonly'),
        L('Chapter 10: typing React, DOM and third-party code', 'Глава 10: типизация React, DOM и стороннего кода'),
      ],
    },
  ],
};
