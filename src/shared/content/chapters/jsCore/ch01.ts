import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh01: Chapter = {
  id: 'js-core-ch1',
  title: L('Values, types and coercion', 'Значения, типы и приведение'),
  summary: L(
    'How JavaScript stores values, why there are two equality operators, which values are falsy, what null, undefined, NaN and -0 actually mean, and where floating point precision starts to bite.',
    'Как JavaScript хранит значения, зачем в языке два оператора равенства, какие значения ложные, что на самом деле значат null, undefined, NaN и -0 и где начинается потеря точности вещественных чисел.'
  ),
  sections: [
    {
      id: 'js-core-ch1-s1',
      title: L('Primitives, references and the typeof hole', 'Примитивы, ссылки и дыра в typeof'),
      body: L(
        'JavaScript has seven primitive types: undefined, null, boolean, number, bigint, string and symbol. Everything else is an object. A primitive is a value, not a container: the number 42 is not a box you can reach inside, it is 42 itself. Objects are references to mutable structures, so const user = { name: "Ada" } binds a constant to a reference that cannot be repointed, while user.name = "Grace" mutates the object behind it.\n\nThe typeof operator reports the kind of a value, but it carries one historical hole: typeof null returns "object". The original engine used a low-level type tag with no tag of its own for null, and the value happened to share the object tag. Fixing it would have broken code written against the broken behaviour, so the defect stayed. typeof of a function returns "function" even though functions are objects, because the check for a callable object comes first, and typeof of an array returns "object" because arrays really are objects.\n\nValues are copied on assignment, so two variables can point at the same object and a mutation through one is visible through the other. A shallow copy such as { ...original } creates a new top level but shares the nested objects, which is exactly why copy.address.city = "Rome" still changes the original. That is the single most common source of the bug where nobody changed anything.',
        'В JavaScript семь примитивных типов: undefined, null, boolean, number, bigint, string и symbol. Всё остальное — объекты. Примитив это значение, а не контейнер: число 42 не является коробкой, в которую можно залезть, это просто 42. Объекты же — ссылки на изменяемые структуры, поэтому const user = { name: "Ada" } связывает константу со ссылкой, которую нельзя перенаправить, а user.name = "Grace" меняет объект за ней.\n\nОператор typeof сообщает вид значения, но в нём есть историческая дыра: typeof null возвращает "object". Изначально движок использовал низкоуровневый тег типа, у которого не было собственного тега для null, и значение поделило тег с объектами. Исправление сломало бы код, написанный под старое поведение, поэтому дефект остался. typeof функции возвращает "function", хотя функции — объекты, потому что проверка вызываемого объекта идёт первой, а typeof массива возвращает "object", потому что массивы действительно объекты.\n\nЗначения копируются при присваивании, поэтому две переменные могут указывать на один объект, и изменение через одну видна через другую. Поверхностная копия вида { ...original } создаёт новый верхний уровень, но вложенные объекты остаются общими — именно поэтому copy.address.city = "Rome" меняет и оригинал. Это самый частый источник бага «я ничего не менял».'
      ),
      bullets: [
        L('Seven primitives: undefined, null, boolean, number, bigint, string, symbol.', 'Семь примитивов: undefined, null, boolean, number, bigint, string, symbol.'),
        L('Primitives are values, objects are references to mutable structures.', 'Примитивы — значения, объекты — ссылки на изменяемые структуры.'),
        L('typeof null is "object" and typeof [] is "object".', 'typeof null — "object", typeof [] — тоже "object".'),
        L('Assignment copies the reference, not the object.', 'Присваивание копирует ссылку, а не сам объект.'),
        L('A shallow spread shares nested objects with the original.', 'Поверхностный spread делит вложенные объекты с оригиналом.'),
      ],
      code: `const original = { name: 'Ada', address: { city: 'London' } };
const shallow = { ...original };

shallow.address.city = 'Rome';
console.log(original.address.city); // 'Rome' - the nested object is shared

const deep = structuredClone(original);
deep.address.city = 'Paris';
console.log(original.address.city); // 'Rome' - now it is independent

typeof null;   // 'object'  <- historical bug
typeof [];     // 'object'
Array.isArray([]); // true`,
      table: {
        caption: L('How to ask about a value', 'Как спрашивать о значении'),
        headers: [
          L('Check', 'Проверка'),
          L('Primitives', 'Примитивы'),
          L('Objects', 'Объекты'),
        ],
        rows: [
          [
            L('typeof x', 'typeof x'),
            L('"number", "string", "boolean", "undefined", "symbol", "bigint"', '"number", "string", "boolean", "undefined", "symbol", "bigint"'),
            L('"object" or "function"', '"object" или "function"'),
          ],
          [
            L('x === null', 'x === null'),
            L('false', 'false'),
            L('false', 'false'),
          ],
          [
            L('x === undefined', 'x === undefined'),
            L('true only for undefined', 'true только для undefined'),
            L('false', 'false'),
          ],
          [
            L('Array.isArray(x)', 'Array.isArray(x)'),
            L('false', 'false'),
            L('true for arrays', 'true для массивов'),
          ],
          [
            L('typeof x === "function"', 'typeof x === "function"'),
            L('false', 'false'),
            L('true for callables', 'true для вызываемых'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The classic copy bug', 'Классический баг с копированием'),
          text: L(
            'Spreading an object copies the top level only. Any nested object or array is still shared, so a mutation deep inside the copy leaks into the original. Use structuredClone for deep copies, or rebuild the nested parts explicitly.',
            'Spread копирует только верхний уровень. Любой вложенный объект или массив остаётся общим, поэтому мутация в глубине копии протекает в оригинал. Для глубокого копирования используйте structuredClone или пересобирайте вложенные части явно.'
          ),
        },
      ],
      takeaway: L(
        'Objects are references, a spread copies the top level only, and typeof null is a bug you must remember.',
        'Объекты — это ссылки, spread копирует только верхний уровень, а typeof null — баг, который надо помнить.'
      ),
      seeAlso: [
        L('Chapter 5: where property lookup actually happens', 'Глава 5: где на самом деле ищется свойство'),
        L('Section 5-4: deep copy versus JSON round trip', 'Секция 5-4: глубокая копия против обхода через JSON'),
      ],
    },
    {
      id: 'js-core-ch1-s2',
      title: L('Strict and loose equality', 'Строгое и нестрогое равенство'),
      body: L(
        'JavaScript has two equality operators and the difference between them is a type conversion rule. The strict operator === compares type and value: two values are equal only when they have the same type and the same contents. The loose operator == coerces both operands to a common type first and only then compares. That is where the famous table comes from: null == undefined is true, null == 0 is false, the empty string == 0 is true, and an empty array == an empty string is true.\n\nThe loose rules change the meaning of a comparison the moment a type slips in from the outside. An identifier that arrives as the string "42" passes == and fails ===, and the bug surfaces far away from its cause. NaN is not equal to itself under either operator, and +0 == -0 is true under both, so the language needs Object.is to distinguish them.\n\nThe strict operator is the only one worth writing by default. When a conversion is genuinely intended, perform it explicitly with Number(x), String(x) or Boolean(x), so the intent is visible at the call site instead of being implied by an operator.',
        'В JavaScript два оператора равенства, и разница между ними — это правило приведения типов. Строгий оператор === сравнивает и тип, и значение: два значения равны, только если у них одинаковый тип и одинаковое содержимое. Нестрогий оператор == сначала приводит операнды к общему типу и только потом сравнивает. Отсюда знаменитая таблица: null == undefined истинно, null == 0 ложно, пустая строка == 0 истинно, а пустой массив == пустая строка тоже истинно.\n\nНестрогие правила меняют смысл сравнения в тот момент, когда тип приходит извне. Идентификатор, пришедший строкой "42", проходит == и не проходит ===, а баг всплывает далеко от своей причины. NaN не равен самому себе ни при одном операторе, а +0 == -0 истинно у обоих, поэтому языку нужен Object.is, чтобы их различить.\n\nСтрогий оператор — единственный, который стоит писать по умолчанию. Когда преобразование действительно задумано, выполняйте его явно через Number(x), String(x) или Boolean(x), чтобы намерение было видно на месте вызова, а не подразумевалось оператором.'
      ),
      bullets: [
        L('=== compares type and value, == converts first.', '=== сравнивает тип и значение, == сначала приводит тип.'),
        L('null == undefined is true, but null === undefined is false.', 'null == undefined истинно, но null === undefined ложно.'),
        L('NaN === NaN is false, so NaN never equals anything.', 'NaN === NaN ложно, то есть NaN не равен ничему.'),
        L('Object.is separates +0 from -0 and treats NaN as equal to itself.', 'Object.is различает +0 и -0 и считает NaN равным самому себе.'),
      ],
      code: `'' == 0;              // true
'' === 0;             // false
[] == false;          // true
[] == '';             // true
null == undefined;    // true
null === undefined;   // false

0 === -0;             // true
Object.is(0, -0);     // false
Object.is(NaN, NaN);  // true

const total = '42';
if (total == 42) { }        // works by accident
if (total === 42) { }       // fails on purpose
if (Number(total) === 42) { } // explicit intent`,
      table: {
        caption: L('What the loose operator does to each pair', 'Что нестрогий оператор делает с каждой парой'),
        headers: [L('Expression', 'Выражение'), L('==', '=='), L('===', '===')],
        rows: [
          [L('null == undefined', 'null == undefined'), L('true', 'true'), L('false', 'false')],
          [L('null == 0', 'null == 0'), L('false', 'false'), L('false', 'false')],
          [L("'' == 0", "'' == 0"), L('true', 'true'), L('false', 'false')],
          [L("'0' == false", "'0' == false"), L('true', 'true'), L('false', 'false')],
          [L('[] == false', '[] == false'), L('true', 'true'), L('false', 'false')],
          [L('NaN == NaN', 'NaN == NaN'), L('false', 'false'), L('false', 'false')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Lint it away', 'Линтер это поймает'),
          text: L(
            'Most projects enable the eqeqeq rule, which turns the loose operator into a build error. Treat that rule as a design decision, not noise: it removes an entire class of coercion bugs.',
            'В большинстве проектов включается правило eqeqeq, которое превращает нестрогий оператор в ошибку сборки. Относитесь к этому правилу как к проектному решению, а не как к шуму: оно убирает целый класс багов с приведением типов.'
          ),
        },
      ],
      takeaway: L(
        'Always compare with === and convert types explicitly when you mean to.',
        'Всегда сравнивайте через ===, а приведение типов делайте явно, когда оно нужно.'
      ),
      seeAlso: [
        L('Section 1-3: the eight falsy values', 'Секция 1-3: восемь ложных значений'),
        L('Chapter 2: the operator that changes everything, the plus sign', 'Глава 2: оператор, который меняет всё, плюс'),
      ],
    },
    {
      id: 'js-core-ch1-s3',
      title: L('Truthiness and the eight falsy values', 'Истинность и восемь ложных значений'),
      body: L(
        'Truthiness follows the same conversion rules in a different place. Exactly eight values are falsy: false, 0, -0, 0n, the empty string, null, undefined and NaN. Everything else is truthy, including the strings "0" and "false", an empty array and an empty object. Objects are always truthy, which surprises people coming from languages where an empty collection is falsy.\n\nThat is why if (items.length) and if (items) are not interchangeable. The first asks about the number of elements and the second only asks whether the value is missing. A common bug is checking a fetched list with if (data), which is true even when the server returned an empty array, so the empty state never renders.\n\nThe conversion itself is explicit through Boolean(x). The rules apply in conditions, in the logical operators, in the double bang idiom !!value, and wherever a value is coerced to a boolean by the language.',
        'Истинность следует тем же правилам приведения, но в другом месте. Ложных значений ровно восемь: false, 0, -0, 0n, пустая строка, null, undefined и NaN. Всё остальное истинно, включая строки "0" и "false", пустой массив и пустой объект. Объекты всегда истинны, и это удивляет пришедших из языков, где пустая коллекция ложна.\n\nИменно поэтому if (items.length) и if (items) не взаимозаменяемы. Первый спрашивает про количество элементов, второй — только про отсутствие значения. Типичный баг — проверить загруженный список через if (data): это истинно даже когда сервер вернул пустой массив, поэтому пустое состояние так и не отрисуется.\n\nСамо преобразование доступно явно через Boolean(x). Эти правила действуют в условиях, в логических операторах, в приёме двойного восклицания !!value и везде, где язык приводит значение к логическому типу.'
      ),
      bullets: [
        L('Falsy: false, 0, -0, 0n, "", null, undefined, NaN.', 'Ложные: false, 0, -0, 0n, "", null, undefined, NaN.'),
        L('Everything else is truthy, including [], {} and "0".', 'Всё остальное истинно, включая [], {} и "0".'),
        L('Objects are always truthy, even empty ones.', 'Объекты всегда истинны, даже пустые.'),
        L('if (items) and if (items.length) answer different questions.', 'if (items) и if (items.length) отвечают на разные вопросы.'),
      ],
      code: `Boolean(0);        // false
Boolean('0');      // true
Boolean([]);       // true
Boolean({});       // true
Boolean(document.all); // false - the one falsy object in the spec

const items = [];
if (items) { console.log('runs'); }        // runs
if (items.length) { console.log('runs'); } // does not run

const count = 0;
const label = count || 'none';  // 'none' - 0 is falsy
const total = count ?? 'none';  // 0     - ?? only reacts to null and undefined`,
      table: {
        caption: L('Falsy and truthy values', 'Ложные и истинные значения'),
        headers: [L('Value', 'Значение'), L('Falsy?', 'Ложное?'), L('Why', 'Почему')],
        rows: [
          [L('false', 'false'), L('yes', 'да'), L('the boolean false', 'логическое false')],
          [L('0, -0, 0n', '0, -0, 0n'), L('yes', 'да'), L('numeric zero', 'числовой ноль')],
          [L('""', '""'), L('yes', 'да'), L('empty string', 'пустая строка')],
          [L('null', 'null'), L('yes', 'да'), L('deliberately empty', 'намеренно пусто')],
          [L('undefined', 'undefined'), L('yes', 'да'), L('not provided', 'значение не передано')],
          [L('NaN', 'NaN'), L('yes', 'да'), L('invalid numeric result', 'некорректный числовой результат')],
          [L('"0", "false"', '"0", "false"'), L('no', 'нет'), L('non-empty strings are truthy', 'непустые строки истинны')],
          [L('[], {}', '[], {}'), L('no', 'нет'), L('objects are always truthy', 'объекты всегда истинны')],
        ],
      },
      takeaway: L(
        'Only eight values are falsy, and objects are never among them. Check the collection, not the reference.',
        'Ложных значений ровно восемь, и объектов среди них нет. Проверяйте коллекцию, а не ссылку.'
      ),
      seeAlso: [
        L('Section 2-2: logical operators return values, not booleans', 'Секция 2-2: логические операторы возвращают значения, а не логические типы'),
        L('Section 1-4: null, undefined, NaN and -0 in detail', 'Секция 1-4: null, undefined, NaN и -0 подробно'),
      ],
    },
    {
      id: 'js-core-ch1-s4',
      title: L('null, undefined, NaN and -0', 'null, undefined, NaN и -0'),
      body: L(
        'undefined means a value was not provided: an unassigned let, a missing argument, a missing property or an explicit void 0. null means the value is deliberately empty, because the developer says on purpose that there is nothing here. The distinction is a convention rather than a rule of the language: typeof null is "object", and only undefined is "undefined" by type while null is falsy by value. Most style guides pick one sentinel and forbid the other.\n\nNaN is the result of an invalid numeric operation and it has one surprising property: it is not equal to itself. The reliable test is Number.isNaN(x), which does not coerce. The global isNaN coerces its argument first, so isNaN("hello") and isNaN(undefined) are both true, which usually says nothing about the value you meant to check.\n\nNegative zero is a real value that most languages do not have. Under === it equals positive zero, and Object.is is the only way to tell them apart. It shows up from expressions such as -0 * Infinity and from rounding, and it breaks code that divides by a value and checks the sign.',
        'undefined означает, что значение не было передано: необъявленное let, отсутствующий аргумент, отсутствующее свойство или явный void 0. null означает, что значение намеренно пустое: разработчик осознанно говорит, что здесь ничего нет. Различие — это соглашение, а не правило языка: typeof null даёт "object", и только undefined «не определён» по типу, тогда как null ложен по значению. Большинство стайл-гайдов выбирают один маркер и запрещают второй.\n\nNaN — результат некорректной арифметической операции, и у него есть одно удивительное свойство: он не равен самому себе. Надёжная проверка — Number.isNaN(x), она не приводит аргумент. Глобальный isNaN сначала приводит аргумент, поэтому isNaN("hello") и isNaN(undefined) истинны, и это обычно ничего не говорит о значении, которое вы хотели проверить.\n\nОтрицательный ноль — реальное значение, которого нет в большинстве языков. При === он равен положительному нулю, и только Object.is позволяет их различить. Он появляется из выражений вида -0 * Infinity и из округления и ломает код, который делит на значение и проверяет знак.'
      ),
      bullets: [
        L('undefined means absent, null means deliberately empty.', 'undefined — отсутствует, null — намеренно пусто.'),
        L('Number.isNaN does not coerce, the global isNaN does.', 'Number.isNaN не приводит аргумент, глобальный isNaN приводит.'),
        L('Object.is(0, -0) is false, 0 === -0 is true.', 'Object.is(0, -0) ложно, 0 === -0 истинно.'),
        L('void 0 is the only portable way to write undefined.', 'void 0 — единственный переносимый способ записать undefined.'),
      ],
      code: `let a;
a;                 // undefined
void 0;            // undefined, the portable spelling

Number.isNaN(Number('abc')); // true
isNaN('abc');                  // true, but it coerced the argument first

0 === -0;           // true
Object.is(0, -0);   // false
1 / -0;             // -Infinity

const maybe = null;
maybe ?? 'fallback'; // 'fallback'
const zero = 0;
zero ?? 'fallback';  // 0`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not test NaN with ===', 'Не проверяйте NaN через ==='),
          text: L(
            'NaN === NaN is always false, so a guard written as if (result !== result) works but reads as a typo to everyone who sees it. Use Number.isNaN(result), or Object.is(result, NaN) when you also need to distinguish -0.',
            'NaN === NaN всегда ложно, поэтому проверка вида if (result !== result) работает, но читается как опечатка. Используйте Number.isNaN(result) или Object.is(result, NaN), если нужно ещё отличать -0.'
          ),
        },
        {
          tone: 'tip',
          title: L('One sentinel per codebase', 'Один маркер на кодовую базу'),
          text: L(
            'Pick either null or undefined for "no value" and forbid the other in review. Mixing them means every consumer has to check both, which is where the double null check appears.',
            'Выберите null или undefined для «нет значения» и запрещайте другое на ревью. Смешивание заставляет каждого потребителя проверять оба, и именно отсюда появляется двойная проверка на null.'
          ),
        },
      ],
      takeaway: L(
        'Pick one sentinel for empty values, test NaN with Number.isNaN and use Object.is when the sign of zero matters.',
        'Выберите один маркер пустого значения, проверяйте NaN через Number.isNaN и используйте Object.is, когда важна значность нуля.'
      ),
      seeAlso: [
        L('Section 1-5: precision, safe integers and money', 'Секция 1-5: точность, безопасные целые и деньги'),
        L('Chapter 11: where errors come from and how to catch them', 'Глава 11: откуда приходят ошибки и как их ловить'),
      ],
    },
    {
      id: 'js-core-ch1-s5',
      title: L('Number precision, safe integers and money', 'Точность чисел, безопасные целые и деньги'),
      body: L(
        'Numbers are IEEE 754 doubles: 64 bits in total, 53 of them available for the integer part. Integers are therefore exact only up to Number.MAX_SAFE_INTEGER, which is 2 to the power of 53 minus 1. Beyond that, consecutive integers become indistinguishable, and 9007199254740993 evaluates to 9007199254740992. Decimals are binary approximations, so 0.1 + 0.2 is 0.30000000000000004, not 0.3.\n\nComparing floats with === is therefore wrong in a way that is hard to see in a test and easy to hit in production. The usual repair is a tolerance based on the scale of the values, and the reason to base it on the scale is that an absolute epsilon makes no sense when the magnitudes differ by orders of magnitude.\n\nMoney must never be stored in a float. Store it in integer minor units, such as cents, and format it only at the presentation layer, or use BigInt when the amounts exceed the safe integer range. BigInt supports arbitrary precision integers and cannot be mixed with Number in arithmetic, which is a feature: the mix is a bug you want to hear about.',
        'Числа — это 64-битные double по IEEE 754, из которых 53 доступны целой части. Поэтому целые числа точны лишь до Number.MAX_SAFE_INTEGER, то есть до 2 в степени 53 минус один. Дальше соседние целые становятся неразличимы, и 9007199254740993 вычисляется как 9007199254740992. Десятичные дроби — двоичные приближения, поэтому 0.1 + 0.2 равно 0.30000000000000004, а не 0.3.\n\nСравнивать вещественные числа через === поэтому неверно так, что это незаметно в тесте и легко всплывает в проде. Обычное решение — допуск, рассчитанный от масштаба значений, и именно масштаб важен, потому что абсолютный epsilon бессмыслен, когда величины отличаются на порядки.\n\nДеньги никогда нельзя хранить в вещественном числе. Храните их в целых минорных единицах, например в центах, и форматируйте только на уровне представления, либо используйте BigInt, когда суммы выходят за пределы безопасного целого. BigInt поддерживает целые произвольной точности и не смешивается с Number в арифметике — это преимущество: такое смешение это баг, о котором лучше узнать сразу.'
      ),
      bullets: [
        L('53 bits of integer precision, safe up to 2^53 - 1.', '53 бита под целую часть, точность до 2^53 − 1.'),
        L('0.1 + 0.2 is 0.30000000000000004.', '0.1 + 0.2 равно 0.30000000000000004.'),
        L('Compare floats with a tolerance derived from the scale.', 'Сравнивайте вещественные числа с допуском от масштаба.'),
        L('Store money in integer minor units, never in a float.', 'Храните деньги в целых минорных единицах, а не в вещественном числе.'),
        L('BigInt cannot be mixed with Number in arithmetic.', 'BigInt нельзя смешивать с Number в арифметике.'),
      ],
      code: `0.1 + 0.2 === 0.3;                // false
Math.abs(0.1 + 0.2 - 0.3) < 1e-9;     // true

Number.MAX_SAFE_INTEGER;            // 9007199254740991
9007199254740993;                   // 9007199254740992 - precision lost

const cents = 1999;                 // money as integer minor units
const price = (cents / 100).toFixed(2); // '19.99' only at the edge

const huge = 9007199254740993n;     // BigInt keeps the exact value
typeof huge;                        // 'bigint'`,
      table: {
        caption: L('Choosing a number type', 'Выбор числового типа'),
        headers: [L('Need', 'Задача'), L('Type', 'Тип'), L('Note', 'Замечание')],
        rows: [
          [L('Counting items, ids up to 2^53', 'Подсчёт элементов, id до 2^53'), L('number', 'number'), L('Safe integers only', 'Только безопасные целые')],
          [L('Fractions, measurements', 'Дробные значения, измерения'), L('number', 'number'), L('Compare with tolerance', 'Сравнивать с допуском')],
          [L('Money', 'Деньги'), L('number in minor units', 'number в минорных единицах'), L('Never a float', 'Никогда вещественное')],
          [L('Integers above 2^53', 'Целые больше 2^53'), L('bigint', 'bigint'), L('Cannot mix with number', 'Нельзя смешивать с number')],
          [L('Identifiers from the database', 'Идентификаторы из базы'), L('string', 'string'), L('Avoid precision loss entirely', 'Полностью исключает потерю точности')],
        ],
      },
      takeaway: L(
        'Never do money arithmetic in floats, never compare floats with ===, and keep database identifiers as strings.',
        'Никогда не считайте деньги в вещественных числах, не сравнивайте их через === и храните идентификаторы из базы строками.'
      ),
      seeAlso: [
        L('Chapter 9: rounding, formatting and internationalization', 'Глава 9: округление, форматирование и интернационализация'),
        L('Chapter 12: algorithms that depend on numeric limits', 'Глава 12: алгоритмы, зависящие от числовых пределов'),
      ],
    },
  ],
};
