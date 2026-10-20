import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreChapters: Chapter[] = [
  {
    id: 'js-core-ch1',
    title: L('Types, values and coercion', 'Типы, значения и приведение типов'),
    summary: L(
      'How values differ from references, why equality needs two operators, which values are falsy, and what null, undefined, NaN and floating point precision mean in practice.',
      'Чем значения отличаются от ссылок, зачем операторам равенства два, какие значения ложные и что на практике значат null, undefined, NaN и точность вещественных чисел.'
    ),
    sections: [
      {
        id: 'js-core-ch1-s1',
        title: L('Primitives and references', 'Примитивы и ссылки'),
        body: L(
          'JavaScript has seven primitive types, undefined, null, boolean, number, bigint, string and symbol, and everything else is an object. Primitives are immutable values: the number 42 is not a box you can reach into. Objects, in contrast, are references to a mutable structure, so const user = { name: Ada } binds a constant to a reference that cannot be repointed, while user.name = Grace mutates the object behind it.\n\nThe typeof operator reports the kind of a value but has one historical hole: typeof null returns object. The original implementation used a low-level type tag with no tag of its own for null, and fixing it would have broken existing code, so it stayed. typeof of a function also returns function, even though functions are objects: they are callable objects, and typeof checks that case first.\n\nBecause values are copied by assignment, two variables can point at the same object and a mutation through one is visible through the other. A shallow copy such as { ...original } creates a new top-level object but shares nested objects, so copy.address.city = Rome still changes the original. That is the most common source of the bug where nobody changed anything, and it is exactly why structuredClone exists.',
          'В JavaScript есть семь примитивных типов: undefined, null, boolean, number, bigint, string и symbol, а всё остальное — объекты. Примитивы — неизменяемые значения: число 42 не является коробкой, в которую можно залезть. Объекты, наоборот, это ссылки на изменяемую структуру, поэтому const user = { name: Ada } связывает константу со ссылкой, которую нельзя перенаправить, а user.name = Grace меняет объект за ней.\n\nОператор typeof сообщает вид значения, но в нём есть одна историческая дыра: typeof null возвращает object. Первоначальная реализация использовала низкоуровневый тег типа, у которого не было собственного тега для null, а исправление сломало бы существующий код, поэтому дефект остался. typeof функции тоже возвращает function, хотя функции — объекты: они вызываемые объекты, и typeof проверяет этот случай первым.\n\nПоскольку значения копируются присваиванием, две переменные могут указывать на один объект, и изменение через одну видна через другую. Поверхностная копия вида { ...original } создаёт новый объект верхнего уровня, но вложенные объекты остаются общими, поэтому copy.address.city = Rome меняет и оригинал. Это самый частый источник бага «я ничего не менял», и именно ради такого случая существует structuredClone.'
        ),
        bullets: [
          L('Primitives are immutable values, objects are mutable references.', 'Примитивы — неизменяемые значения, объекты — изменяемые ссылки.'),
          L('typeof null is object, a historical bug kept for compatibility.', 'typeof null возвращает object: историческая ошибка, сохранённая ради совместимости.'),
          L('Assignment copies the reference, not the object.', 'Присваивание копирует ссылку, а не объект.'),
          L('A shallow spread shares nested objects with the original.', 'Поверхностный spread делит вложенные объекты с оригиналом.'),
        ],
        code: `const original = { name: 'Ada', address: { city: 'London' } };
const shallow = { ...original };

shallow.address.city = 'Rome';
console.log(original.address.city); // 'Rome' - the nested object is shared

const deep = structuredClone(original);
deep.address.city = 'Paris';
console.log(original.address.city); // 'Rome' - now it is independent`,
        takeaway: L(
          'Objects are references, and a spread copies the top level only.',
          'Объекты — это ссылки, а spread копирует только верхний уровень.'
        ),
      },
      {
        id: 'js-core-ch1-s2',
        title: L('Equality, coercion and truthiness', 'Сравнение, приведение типов и истинность'),
        body: L(
          'JavaScript has two equality operators, and the difference between them is a type conversion rule. The strict operator === compares type and value: two values are equal only when they have the same type and the same contents. The loose operator == coerces both operands to a common type first, then compares. That table is the classic trap: null == undefined is true, null == 0 is false, the empty string == 0 is true, and an empty array == an empty string is true.\n\nThe strict operator is the only one worth writing by default: the loose rules change the meaning of a comparison when a type slips in from the outside. An identifier that arrives as the string 42 passes == and fails ===, and the bug surfaces far away from its cause. When you really want a conversion, call it explicitly with Number(x), String(x) or Boolean(x).\n\nTruthiness follows the same conversion rules in a different place. Eight values are falsy: false, 0, -0, 0n, the empty string, null, undefined and NaN. Everything else is truthy, including the strings 0 and false, an empty array and an empty object. Objects are always truthy, which surprises people coming from languages where an empty collection is falsy. This is why if (items.length) and if (items) are not interchangeable.',
          'В JavaScript два оператора равенства, и разница между ними — правило приведения типов. Строгий оператор === сравнивает и тип, и значение: два значения равны, только если у них одинаковый тип и одинаковое содержимое. Нестрогий оператор == сначала приводит операнды к общему типу, а потом сравнивает. Эта таблица и есть классическая ловушка: null == undefined истинно, null == 0 ложно, пустая строка == 0 истинно, а пустой массив == пустая строка тоже истинно.\n\nСтрогий оператор — единственный, который стоит писать по умолчанию: нестрогие правила меняют смысл сравнения, когда тип приходит извне. Идентификатор, пришедший строкой 42, проходит == и не проходит ===, а баг всплывает далеко от своей причины. Когда преобразование действительно нужно, вызывайте его явно через Number(x), String(x) или Boolean(x), чтобы намерение было видно.\n\nИстинность следует тем же правилам приведения в другом месте. Ложных значений ровно восемь: false, 0, -0, 0n, пустая строка, null, undefined и NaN. Всё остальное истинно, включая строки 0 и false, пустой массив и пустой объект. Объекты всегда истинны, и это удивляет пришедших из языков, где пустая коллекция ложна. Именно поэтому if (items.length) и if (items) не взаимозаменяемы.'
        ),
        bullets: [
          L('=== compares type and value, == converts first.', '=== сравнивает тип и значение, == сначала приводит тип.'),
          L('null == undefined is true, but null === undefined is false.', 'null == undefined истинно, но null === undefined ложно.'),
          L('Falsy values: false, 0, -0, 0n, the empty string, null, undefined, NaN.', 'Ложные значения: false, 0, -0, 0n, пустая строка, null, undefined, NaN.'),
          L('An empty array and an empty object are truthy.', 'Пустой массив и пустой объект — истинные.'),
        ],
        code: `'' == 0;              // true
'' === 0;             // false
[] == false;          // true
[] == '';             // true
null == undefined;    // true
null === undefined;   // false

const items = [];
if (items) { /* runs: an empty array is truthy */ }
if (items.length) { /* does not run */ }`,
        takeaway: L(
          'Always compare with === and convert types explicitly when you mean to.',
          'Всегда сравнивайте через ===, а приведение типов делайте явно.'
        ),
      },
      {
        id: 'js-core-ch1-s3',
        title: L('null, undefined, NaN and precision', 'null, undefined, NaN и точность чисел'),
        body: L(
          'undefined means a value was not provided: an unassigned let, a missing argument, a missing property or an explicit void 0. null means the value is deliberately empty, because the developer says on purpose that there is nothing here. The distinction is a convention rather than a rule: typeof null is object, and only undefined is undefined by type while null is falsy by value. Most style guides pick one sentinel and forbid the other.\n\nNaN is the result of an invalid numeric operation, and it has one surprising property: it is not equal to itself. The reliable test is Number.isNaN(x) or Object.is(x, NaN). The global isNaN coerces its argument first, so isNaN(hello) and isNaN(undefined) are true, which usually says nothing about the value you meant to check.\n\nNumbers are IEEE 754 doubles: 64 bits, 53 of them for the integer part. Integers are exact only up to Number.MAX_SAFE_INTEGER, which is 2 to the power of 53 minus 1, and beyond that consecutive integers become indistinguishable. Decimals are binary approximations, so 0.1 + 0.2 is 0.30000000000000004. Store money as integer minor units or use BigInt, and compare floats with a tolerance based on the scale rather than with ===.',
          'undefined означает, что значение не было передано: необъявленное let, отсутствующий аргумент, отсутствующее свойство или явный void 0. null означает, что значение намеренно пустое: разработчик осознанно говорит, что здесь ничего нет. Различие — соглашение, а не правило языка: typeof null даёт object, и только undefined «не определён» по типу, тогда как null ложен по значению. Большинство стайл-гайдов выбирают один маркер и запрещают другой.\n\nNaN — результат некорректной арифметической операции, и у него есть одно удивительное свойство: он не равен самому себе. Надёжная проверка — Number.isNaN(x) или Object.is(x, NaN). Глобальный isNaN сначала приводит аргумент, поэтому isNaN(hello) и isNaN(undefined) истинны, и это обычно ничего не говорит о значении, которое вы хотели проверить.\n\nЧисла — это 64-битные double по IEEE 754, из которых 53 доступны целой части. Поэтому целые числа точны лишь до Number.MAX_SAFE_INTEGER, то есть до 2 в степени 53 минус один, а дальше соседние целые становятся неразличимыми. Десятичные дроби — двоичные приближения, поэтому 0.1 + 0.2 равно 0.30000000000000004. Деньги храните в целых минорных единицах или используйте BigInt, а вещественные числа сравнивайте с допуском по масштабу, а не через ===.'
        ),
        bullets: [
          L('undefined means absent, null means deliberately empty.', 'undefined — отсутствует, null — намеренно пусто.'),
          L('NaN is not equal to itself, so use Number.isNaN.', 'NaN не равен самому себе, поэтому используйте Number.isNaN.'),
          L('isNaN coerces its argument, Number.isNaN does not.', 'isNaN приводит аргумент, Number.isNaN — нет.'),
          L('Safe integers end at 2^53 - 1, and money belongs in minor units.', 'Безопасные целые кончаются на 2^53 − 1, а деньги живут в минорных единицах.'),
        ],
        code: `0.1 + 0.2 === 0.3;                   // false
Math.abs(0.1 + 0.2 - 0.3) < 1e-9;    // true

Number.MAX_SAFE_INTEGER;             // 9007199254740991
9007199254740993;                    // 9007199254740992 - precision lost

Number.isNaN(Number('abc'));         // true
isNaN('abc');                        // true, but it coerced the argument first`,
        takeaway: L(
          'Pick one sentinel for empty values, test NaN without coercion and never do money arithmetic in floats.',
          'Выберите один маркер пустого значения, проверяйте NaN без приведения и не считайте деньги в вещественных числах.'
        ),
      },
    ],
  },
  {
    id: 'js-core-ch2',
    title: L('Variables, scope and functions', 'Переменные, область видимости и функции'),
    summary: L(
      'How var, let and const differ in scope and lifetime, how parameters and rest arguments work, and how closures, this and arrow functions decide who a function belongs to.',
      'Чем var, let и const отличаются по области видимости и времени жизни, как работают параметры и rest-аргументы и как замыкания, this и стрелочные функции определяют принадлежность функции.'
    ),
    sections: [
      {
        id: 'js-core-ch2-s1',
        title: L('var, let, const and scope', 'var, let, const и область видимости'),
        body: L(
          'Three keywords declare bindings, and they differ in when the binding exists and whether it can be reassigned. var is function-scoped: a var declared inside a loop is visible after the loop, and redeclaring it is allowed. let and const are block-scoped: they exist only inside the braces that contain them, and declaring the same name twice in one block is a syntax error. const additionally forbids reassigning the binding, though the object behind it stays mutable.\n\nHoisting is what makes the difference visible. Every var declaration is processed at the start of its enclosing function, so the variable exists but holds undefined, and using it early does not throw, it silently yields undefined. let and const are hoisted too, but into a temporal dead zone: the binding exists, yet any access before the declaration throws a ReferenceError. The binding is dead until the declaration is evaluated.\n\nThe practical rule is to use const by default, let only when a binding has to be reassigned, and never var. const turns a silent mutation into a loud error at the point of the mistake, and block scoping keeps loop variables from leaking out. One caveat: const describes the binding, not the value, so config.retries = 5 on a const object is legal, and freezing is a separate, explicit act.',
          'Три ключевых слова объявляют связи, и отличаются они тем, когда связь существует и можно ли её переприсвоить. var живёт в области функции: переменная, объявленная внутри цикла, видна и после него, а повторное объявление разрешено. let и const живут в области блока: они существуют только внутри фигурных скобок, и повторное объявление того же имени в одном блоке — синтаксическая ошибка. const вдобавок запрещает переприсваивание связи, хотя объект за ней менять можно.\n\nРазницу видно благодаря поднятию. Каждое объявление var обрабатывается в начале объемлющей функции, поэтому переменная существует, но хранит undefined, и обращение к ней заранее не бросает исключение, а молча даёт undefined. let и const тоже поднимаются, но во временную мёртвую зону: связь существует, однако обращение к ней до объявления бросает ReferenceError. Связь мертва, пока не вычислено объявление.\n\nПрактическое правило: const по умолчанию, let только там, где связь правда нужно переприсваивать, и никогда var. const превращает тихую мутацию в громкую ошибку в точке ошибки, а блочная область не даёт переменным цикла утекать наружу. Одна оговорка: const описывает связь, а не значение, поэтому config.retries = 5 у const-объекта совершенно законен, а заморозка — отдельное явное действие.'
        ),
        bullets: [
          L('var is function-scoped, let and const are block-scoped.', 'var живёт в области функции, let и const — в области блока.'),
          L('var is hoisted and holds undefined, let and const sit in the temporal dead zone.', 'var поднимается и хранит undefined, let и const попадают во временную мёртвую зону.'),
          L('const freezes the binding, not the object it points to.', 'const фиксирует связь, а не объект, на который она указывает.'),
          L('Default to const and use let only where reassignment is needed.', 'По умолчанию const, а let только там, где нужно переприсваивание.'),
        ],
        code: `console.log(a); // undefined - var is hoisted
var a = 1;

console.log(b); // ReferenceError - b is in the temporal dead zone
let b = 1;

for (var i = 0; i < 3; i++) {}
console.log(i); // 3 - the loop variable leaked out

const config = { retries: 3 };
config.retries = 5; // legal: the object itself is mutable`,
        takeaway: L(
          'const by default, let when reassigning, never var, and remember that const locks the binding rather than the value.',
          'const по умолчанию, let при переприсваивании, var — никогда, и помните: const фиксирует связь, а не значение.'
        ),
      },
      {
        id: 'js-core-ch2-s2',
        title: L('Parameters, arguments and rest', 'Параметры, arguments и rest'),
        body: L(
          'JavaScript functions accept a variable number of arguments in a surprising way: any parameter you do not supply arrives as undefined, and the extra ones are collected into the array-like arguments object. arguments is not an array. It has no array methods, it is not iterable, and in strict mode, which includes every module and class, it does not track the parameter list. It survives mostly in legacy code that forwards unknown arguments.\n\nThe modern replacement is the rest parameter, which collects the remaining arguments into a real array: function sum(...values). Rest must be the last parameter and there can be only one per signature. Its companion is the spread operator in a call, which unpacks an array into individual arguments: sum(...values). Together they give clean variadic functions and let a function forward an unknown argument list without touching arguments at all.\n\nParameters have a lifetime of their own. A default value is evaluated at call time rather than at definition time, so a function defaulting to the current time gives every call a fresh value, and because defaults are evaluated left to right, a later one may reference an earlier parameter. Destructuring in the parameter list gives named parameters with no positional coupling and a clear error when the argument is missing.',
          'Функции JavaScript принимают произвольное число аргументов слегка неожиданным способом: любой параметр, который не передали, приходит как undefined, а лишние собираются в похожий на массив объект arguments. arguments не массив. У него нет методов массива, он не итерируется, а в строгом режиме, то есть в каждом модуле и классе, он не отслеживает список параметров. Он остался в основном в старом коде, который пробрасывает неизвестные аргументы.\n\nСовременная замена — rest-параметр, который собирает оставшиеся аргументы в настоящий массив: function sum(...values). Rest обязан быть последним параметром, и он может быть только один в сигнатуре. Его пара — spread в вызове, который распаковывает массив в отдельные аргументы: sum(...values). Вместе они дают чистые вариативные функции и позволяют пробросить неизвестный список аргументов, не касаясь arguments.\n\nУ параметров своя жизнь. Значение по умолчанию вычисляется в момент вызова, а не объявления, поэтому функция со значением по умолчанию «текущее время» даёт каждому вызову свежий результат, а поскольку значения вычисляются слева направо, более позднее может ссылаться на более раннее. Деструктуризация в списке параметров даёт именованные параметры без привязки к позиции и внятную ошибку, если аргумент не передан.'
        ),
        bullets: [
          L('arguments is array-like, but it is not an array.', 'arguments похож на массив, но массивом не является.'),
          L('Rest collects the tail into a real array, spread unpacks it into arguments.', 'Rest собирает хвост в настоящий массив, spread распаковывает его в аргументы.'),
          L('Default values are evaluated on every call, not once at definition.', 'Значения по умолчанию вычисляются при каждом вызове, а не один раз при объявлении.'),
          L('Destructuring in the signature decouples parameters from position.', 'Деструктуризация в сигнатуре отвязывает параметры от позиции.'),
        ],
        code: `function sum(...values) {
  return values.reduce((total, value) => total + value, 0);
}

sum(1, 2, 3);       // 6
sum(...[1, 2, 3]);  // 6 - spread unpacks the array

function connect({ host, port = 5432, ssl = false } = {}) {
  return { host, port, ssl };
}

connect({ host: 'db.local' }); // { host: 'db.local', port: 5432, ssl: false }`,
        takeaway: L(
          'Use rest and spread for variadic code and destructured parameters for named options.',
          'Используйте rest и spread для произвольного числа аргументов, а деструктуризацию — для именованных опций.'
        ),
      },
      {
        id: 'js-core-ch2-s3',
        title: L('Closures, this and arrow functions', 'Замыкания, this и стрелочные функции'),
        body: L(
          'A closure is a function that keeps a reference to the variables of the scope in which it was created. It is the mechanism behind callbacks, counters, event handlers and most of the functional style in JavaScript. Every call of the enclosing function creates a fresh scope, so every closure keeps its own copy of the variables, which is why a factory that returns a counter produces independent counters.\n\nthis is the second half of the story, and in ordinary functions it is not lexical: it is determined by how the function is called. In a method call, obj.method(), this is the object. In a plain call it is undefined in strict mode and the global object otherwise. Arrow functions have no this of their own: they inherit it from the enclosing scope at definition time, and cannot be used as methods or constructors.\n\nThe practical consequence is that arrow functions are perfect for callbacks and wrong for object methods. A regular function used as a callback loses the receiver and sees undefined, while the arrow version captures the surrounding this. But an object method written as an arrow has no surrounding this to capture and will not work at all. When you need a dynamic this, use a regular function and call it as a method.',
          'Замыкание — это функция, которая сохраняет ссылку на переменные той области, в которой была создана. Именно на этом держатся колбэки, счётчики, обработчики событий и большая часть функционального стиля в JavaScript. Каждый вызов объемлющей функции создаёт новую область, поэтому каждое замыкание хранит свою копию переменных, и потому фабрика, возвращающая счётчик, выдаёт независимые счётчики.\n\nthis — вторая половина истории, и у обычных функций он не лексический: он определяется тем, как функцию вызвали. При вызове метода obj.method() this — это объект. При обычном вызове в строгом режиме это undefined, а в нестрогом — глобальный объект. У стрелочных функций своего this нет: они наследуют его от внешней области в момент определения, поэтому их нельзя использовать как методы или конструкторы.\n\nПрактическое следствие: стрелочные функции идеальны для колбэков и негодны как методы объектов. Обычная функция в роли колбэка теряет получателя и видит undefined, а стрелочная захватывает this из внешней области. Но метод объекта, написанный стрелкой, вообще не имеет внешнего this и работать не будет. Когда нужен динамический this, берите обычную функцию и вызывайте её как метод либо связывайте через fn.bind(obj).'
        ),
        bullets: [
          L('A closure captures the scope where it was created, not where it is called.', 'Замыкание захватывает область создания, а не область вызова.'),
          L('Arrow functions have no own this and cannot be methods or constructors.', 'У стрелочных функций нет своего this, их нельзя использовать как методы или конструкторы.'),
          L('In a method call this is the object before the dot.', 'При вызове метода this — объект перед точкой.'),
          L('bind fixes this permanently, call and apply fix it for one call.', 'bind фиксирует this навсегда, call и apply — на один вызов.'),
        ],
        code: `function makeCounter() {
  let count = 0;
  return () => ++count;   // every call gets its own scope
}

const a = makeCounter();
const b = makeCounter();
a(); a(); // 2
b();      // 1 - the counters are independent

const user = {
  name: 'Ada',
  greet() { return 'Hi, ' + this.name; },  // a regular function: dynamic this
};
const greet = user.greet;
greet.call(user); // 'Hi, Ada' - call restores the receiver`,
        takeaway: L(
          'Arrows capture this and regular functions resolve it at call time, so choose per call site.',
          'Стрелки захватывают this, а обычные функции определяют его в момент вызова — выбирайте по месту вызова.'
        ),
      },
    ],
  },
  {
    id: 'js-core-ch3',
    title: L('Objects, arrays and strings', 'Объекты, массивы и строки'),
    summary: L(
      'What a property descriptor actually contains, how spread, destructuring and immutability interact, and where the array methods, string methods and regular expressions surprise people.',
      'Что на самом деле содержит дескриптор свойства, как взаимодействуют spread, деструктуризация и иммутабельность и в чём методы массивов, строк и регулярные выражения преподносят сюрпризы.'
    ),
    sections: [
      {
        id: 'js-core-ch3-s1',
        title: L('Property descriptors and accessors', 'Дескрипторы свойств и акцессоры'),
        body: L(
          'A property on an object is not a plain value, it is a record. Each property holds a value, a set of flags such as writable, enumerable and configurable, and optionally a getter and a setter instead of a plain value. You can read them with Object.getOwnPropertyDescriptor and write them with Object.defineProperty. The shorthand syntax usually creates a writable, enumerable, configurable data property, but the descriptor API does more.\n\nA getter runs when the property is read and a setter runs when it is written, and the property then holds no value of its own. This lets you expose a computed value, validate on assignment, or keep a legacy field in sync. The classic mistake is a getter that builds a fresh object on every access: user.tags would then be a different array each time, breaking identity checks. Compute once and cache, or return a stable object.\n\nObject.freeze makes an object immutable: its own properties become non-writable and non-configurable, and any attempt to change them fails silently in sloppy mode and throws in strict mode, which includes every module. freeze is shallow, so nested objects stay mutable, while Object.seal prevents adding and removing properties but keeps the existing ones writable. structuredClone produces a genuinely independent copy, but it drops functions and turns class instances into plain objects.',
          'Свойство объекта — не простое значение, а запись. Каждое свойство хранит значение, набор флагов вроде writable, enumerable и configurable и, опционально, геттер и сеттер вместо самого значения. Прочитать их можно через Object.getOwnPropertyDescriptor, записать — через Object.defineProperty. Сокращённая запись обычно создаёт записываемое, перечислимое и настраиваемое свойство данных, но API дескрипторов умеет то, чего сокращённая запись не умеет.\n\nГеттер выполняется при чтении свойства, сеттер — при записи, и само значение тогда не хранится. Это позволяет выставить вычисляемое значение, проверять присваивание или держать устаревшее поле в синхронизации с новым. Классическая ошибка — геттер, который каждый раз создаёт новый объект: user.tags тогда окажется разным массивом при каждом обращении, и ломаются проверки идентичности. Вычисляйте один раз и кэшируйте либо возвращайте стабильный объект.\n\nObject.freeze делает объект неизменяемым: его собственные свойства становятся незаписываемыми и ненастраиваемыми, и любая попытка их изменить молча провалится в нестрогом режиме и бросит исключение в строгом, а строгим является каждый модуль. freeze неглубок, поэтому вложенные объекты остаются изменяемыми, а Object.seal запрещает добавлять и удалять свойства, не мешая менять существующие. structuredClone даёт независимую копию, но теряет функции и превращает экземпляры классов в обычные объекты.'
        ),
        bullets: [
          L('A property is a value plus flags: writable, enumerable, configurable.', 'Свойство — это значение и флаги: writable, enumerable, configurable.'),
          L('Getters and setters replace a stored value with behaviour.', 'Геттеры и сеттеры заменяют хранимое значение поведением.'),
          L('freeze is shallow, and it fails silently outside strict mode.', 'freeze неглубокий и вне строгого режима проваливается молча.'),
          L('structuredClone copies data but drops functions and prototypes.', 'structuredClone копирует данные, но теряет функции и прототипы.'),
        ],
        code: `const user = { first: 'Ada', last: 'Lovelace' };

Object.defineProperty(user, 'fullName', {
  get() { return this.first + ' ' + this.last; },
  enumerable: true,
  configurable: true,
});

console.log(user.fullName); // 'Ada Lovelace'

const frozen = Object.freeze({ count: 1 });
frozen.count = 2; // throws in strict mode`,
        takeaway: L(
          'Object properties carry flags and behaviour, so reach for defineProperty when the shorthand is not enough.',
          'Свойства объекта несут флаги и поведение, поэтому беритесь за defineProperty, когда сокращённой записи мало.'
        ),
      },
      {
        id: 'js-core-ch3-s2',
        title: L('Spread, destructuring and immutability', 'Spread, деструктуризация и иммутабельность'),
        body: L(
          'The spread operator copies enumerable own properties into a new object, and destructuring takes values out of an object or an array. Both arrived in ES2015 and both are shallow. The expression { ...user } creates a new object, but every nested object is still shared with the original. Reading const { address: { city } } = user pulls the value out, while const { address } = user binds the nested object itself.\n\nDestructuring works with defaults, renaming and rest: const { id = 0, title: heading = Untitled, ...rest } = article gives a default and a new name. In a function signature, function f({ a, b } = {}) gives a clear TypeError when the argument is missing. The catch is that destructuring null or undefined throws, since you cannot destructure a missing value, only a missing property.\n\nImmutability is a discipline, not a keyword. The pattern is to never mutate the original, build a new value and replace the reference. Building a new object and a filtered array instead of mutating them in place makes every change visible at the call site and makes reference equality a reliable test for whether anything changed. What breaks the pattern are mutating array methods such as push, splice, sort and reverse, plus delete and direct assignment.',
          'Spread копирует перечислимые собственные свойства в новый объект, а деструктуризация вынимает значения из объекта или массива в отдельные связи. Обе возможности появились в ES2015, и обе неглубоки. Выражение { ...user } создаёт новый объект, но любой вложенный объект остаётся общим с оригиналом. Запись const { address: { city } } = user извлекает значение, тогда как const { address } = user связывает сам вложенный объект, и его мутация по-прежнему меняет исходный.\n\nДеструктуризация умеет значения по умолчанию, переименование и rest: const { id = 0, title: heading = Untitled, ...rest } = article даёт значение по умолчанию, новое имя и мешок с оставшимися полями. В сигнатуре функции function f({ a, b } = {}) даёт понятный TypeError, если аргумент не передан, вместо обращения к undefined-свойству намного позже. Оговорка: деструктуризация null или undefined бросает исключение, потому что разобрать можно отсутствующее свойство, но не отсутствующее значение.\n\nИммутабельность — это дисциплина, а не ключевое слово. Правило: не мутировать оригинал, а построить новое значение и заменить ссылку. Запись { ...state, count: state.count + 1 } и вызов state.items.filter(...) вместо push делают каждое изменение видимым в месте вызова и превращают сравнение ссылок в надёжную проверку того, изменилось ли что-нибудь. Нарушают правило мутирующие методы массивов — push, pop, splice, sort, reverse, fill — а также delete и прямое присваивание в объектах.'
        ),
        bullets: [
          L('Spread and destructuring are shallow, nested objects stay shared.', 'Spread и деструктуризация неглубокие, вложенные объекты остаются общими.'),
          L('Destructuring null throws, while a missing property simply gives undefined.', 'Деструктуризация null бросает исключение, а отсутствующее свойство даёт undefined.'),
          L('Immutability means building a new value and replacing the reference.', 'Иммутабельность означает построить новое значение и заменить ссылку.'),
          L('push, splice, sort and reverse mutate the array they are called on.', 'push, splice, sort и reverse мутируют массив, на котором вызваны.'),
        ],
        code: `const state = { count: 1, tags: ['a'], user: { id: 7 } };

const next = { ...state, count: state.count + 1 };
console.log(state.count); // 1 - the original is untouched

const { user: { id }, ...withoutUser } = state;
console.log(id);           // 7
console.log(withoutUser);  // { count: 1, tags: ['a'] }

const sorted = state.tags.slice().sort(); // slice first, because sort mutates`,
        takeaway: L(
          'Replace references instead of contents, and remember that shallow copies share what they contain.',
          'Заменяйте ссылки, а не содержимое, и помните: поверхностные копии делят внутренности.'
        ),
      },
      {
        id: 'js-core-ch3-s3',
        title: L('Array and string methods, regex', 'Методы массивов и строк, регулярные выражения'),
        body: L(
          'Arrays are ordered collections with a numeric index and a length that maintains itself. The read-only methods map, filter, slice, find, some, every, reduce and flatMap return new arrays, while push, pop, splice, sort, reverse and fill mutate in place and return the same array. That inconsistency is the classic bug: calling sort on a prop mutates the original, so data.sort(...) is a mutation wearing a disguise.\n\nComparison pitfalls come from the same story. The comparator passed to sort must return a number: a comparison that returns a boolean, or subtracting values that are not numbers, produces NaN and an unsorted array with no error. splice removes elements and returns the removed ones, while slice returns a copy, and the names sound alike but behave differently. filter and forEach also skip holes in sparse arrays, so the result can be shorter than the input.\n\nStrings are immutable sequences of UTF-16 code units, and every string method returns a new string. slice cuts by index, split and join convert between strings and arrays. Regular expressions add pattern matching, with flags g for global, i for case-insensitive, u for full Unicode and s for dot-all. A global regex keeps a lastIndex between calls, so reusing one gives surprising results, and a failed match returns null, not an empty string.',
          'Массивы — упорядоченные коллекции с числовым индексом и длиной, которая поддерживается сама. Методы чтения map, filter, slice, find, some, every, reduce и flatMap возвращают новые массивы, а push, pop, splice, sort, reverse и fill мутируют на месте и отдают тот же массив. В этой несогласованности и кроется классический баг: вызов sort на поле мутирует оригинал, поэтому data.sort(...) — это мутация под маской.\n\nЛовушки сравнения вырастают из той же истории. Компаратор, который передаётся в sort, обязан возвращать число: если вернуть булево значение или вычесть не-числа, получится NaN и неотсортированный массив без всякой ошибки. splice удаляет элементы и возвращает удалённые, а slice возвращает копию, и похожие названия скрывают разное поведение. filter и forEach пропускают дырки в разреженных массивах, поэтому результат может оказаться короче исходного.\n\nСтроки — неизменяемые последовательности 16-битных кодовых единиц UTF-16, и каждый строковый метод возвращает новую строку. slice режет по индексам, split и join переводят между строками и массивами. Регулярные выражения добавляют сопоставление по шаблону, а флаги g, i, u и s задают глобальный поиск, независимость от регистра, полный Unicode и точечный режим. Глобальная регулярка хранит lastIndex между вызовами, поэтому её переиспользование даёт неожиданные результаты, а несовпавший шаблон возвращает null, а не пустую строку.'
        ),
        bullets: [
          L('map, filter and slice return new arrays, push, splice and sort mutate.', 'map, filter и slice возвращают новые массивы, push, splice и sort мутируют.'),
          L('A sort comparator must return a number, not a boolean.', 'Компаратор sort должен возвращать число, а не булево значение.'),
          L('String methods never mutate, they always return a new string.', 'Строковые методы ничего не мутируют и всегда возвращают новую строку.'),
          L('A global regex keeps its lastIndex between calls.', 'Глобальная регулярка сохраняет lastIndex между вызовами.'),
        ],
        code: `const values = [3, 1, 10];
values.sort((a, b) => a - b);            // mutates values
const copy = [...values].sort((a, b) => a - b); // safe copy

const text = 'order 42';
text.match(/order (?<id>\\d+)/).groups.id; // '42'

const re = /\\d+/g;
re.test('a1'); re.test('a2'); // true, false - lastIndex moved on`,
        takeaway: L(
          'Know which array and string methods mutate, and treat the mutating ones as the exception.',
          'Помните, какие методы массивов и строк мутируют, и считайте исключением именно их.'
        ),
      },
    ],
  },
  {
    id: 'js-core-ch4',
    title: L('Async and the event loop', 'Асинхронность и цикл событий'),
    summary: L(
      'How promises settle and combine, what actually orders the microtask and macrotask queues, and how to handle errors, cancel work and keep concurrency under control.',
      'Как промисы фиксируются и комбинируются, что на самом деле задаёт порядок микро- и макроочередей и как обрабатывать ошибки, отменять работу и держать конкурентность под контролем.'
    ),
    sections: [
      {
        id: 'js-core-ch4-s1',
        title: L('Promises and their states', 'Промисы и их состояния'),
        body: L(
          'A promise is an object standing in for a value that is not available yet. It is in one of three states, pending, fulfilled or rejected, and the state moves forward only once. Handlers are attached with then(onFulfilled, onRejected), and the promise that then returns settles with their result, which makes chains possible. A promise is settled the moment it is created, so a late subscriber still receives the value.\n\nThe combinators cover the common shapes of waiting on several operations. Promise.all resolves when every promise fulfils and rejects at the first rejection, so it fits when you need all the results and any failure is fatal. Promise.allSettled waits for every promise and reports each outcome, which is what batch jobs and cleanup code need. Promise.race resolves with the first settlement, and Promise.any resolves with the first fulfilment and only rejects when all of them fail.\n\nTwo traps catch newcomers. A rejected promise with no handler produces an unhandled rejection warning and, depending on the runtime, can terminate the process, so always attach a handler or await it. And a promise does not stop the function that created it: without await, the code after the call runs before the result arrives, which is the classic missing-await bug that swallows errors.',
          'Промис — это объект, стоящий на месте значения, которого пока нет. Он бывает в одном из трёх состояний: pending, fulfilled или rejected, и состояние меняется только вперёд и только один раз. Обработчики вешают через then(onFulfilled, onRejected), а возвращённый then промис фиксируется по результату обработчика, и именно это делает возможными цепочки. Промис фиксируется в момент создания, поэтому даже поздний подписчик получит значение.\n\nКомбинаторы покрывают типичные сценарии ожидания нескольких операций. Promise.all разрешается, когда разрешились все промисы, и отклоняется при первом отказе — он подходит, когда нужны все результаты и любой сбой фатален. Promise.allSettled дожидается всех и сообщает по каждому исход, что нужно пакетным задачам и коду уборки. Promise.race разрешается по первому завершению, а Promise.any — по первому успешному и отклоняется, только когда неудались все.\n\nДве ловушки ловят новичков. Отклонённый промис без обработчика даёт предупреждение о необработанном отказе и, в зависимости от среды выполнения, может завершить процесс, поэтому всегда вешайте обработчик или делайте await. И промис не останавливает функцию, которая его создала: без await код после вызова выполняется раньше, чем придёт результат, — это классический баг с забытым await, который проглатывает ошибки.'
        ),
        bullets: [
          L('A promise settles once and never changes its state afterwards.', 'Промис фиксируется один раз и больше не меняет состояние.'),
          L('all fails fast, allSettled waits for everyone.', 'all падает при первой ошибке, allSettled ждёт всех.'),
          L('race takes the first settlement, any takes the first success.', 'race берёт первое завершение, any — первую удачу.'),
          L('Unhandled rejections can terminate the process.', 'Необработанные отказы могут завершить процесс.'),
        ],
        code: `const results = await Promise.allSettled([
  fetch('/a').then((response) => response.json()),
  fetch('/b').then((response) => response.json()),
]);

const ok = results
  .filter((result) => result.status === 'fulfilled')
  .map((result) => result.value);`,
        takeaway: L(
          'Choose the combinator by what you need: all results, every outcome, first to finish or first success.',
          'Выбирайте комбинатор по задаче: все результаты, все исходы, первое завершение или первая удача.'
        ),
      },
      {
        id: 'js-core-ch4-s2',
        title: L('async/await and the event loop', 'async/await и цикл событий'),
        body: L(
          'async turns a function into one that always returns a promise, and await suspends that function until the awaited promise settles, without blocking the thread. The rest of the function continues in a microtask once the value arrives, so the code after an await runs later. Inside try/catch a rejected await throws like an ordinary exception, which is why async functions replaced manual then chains in almost every case.\n\nThe event loop has two queues that decide what runs when. The microtask queue holds promise reactions and everything scheduled with queueMicrotask, and it is drained completely after the current task and before anything else. The macrotask queue holds timers, I/O callbacks and events, and only one macrotask runs per turn. The rule that explains most ordering surprises is short: after a timer callback finishes, the entire microtask queue is drained before the next timer.\n\nA setTimeout with a delay of zero is therefore not immediate, it is a macrotask that runs after the current stack unwinds and after every pending microtask. Promise.resolve().then(...) runs before it. Code inside a microtask that schedules another microtask keeps the queue non-empty and starves timers entirely, an infinite microtask loop that freezes the page. Yielding to the event loop means awaiting a resolved promise, not sleeping.',
          'async превращает функцию в такую, что всегда возвращает промис, а await приостанавливает её до фиксации ожидаемого промиса, не блокируя поток. Остаток функции продолжается в микротаске, когда значение придёт, поэтому код после await выполняется позже. Внутри try/catch отклонённый await бросается как обычное исключение — именно поэтому async-функции почти везде вытеснили ручные цепочки then.\n\nУ цикла событий две очереди, и они решают, что и когда выполнится. Микроочередь хранит реакции промисов и всё, что запланировано через queueMicrotask, и вычерпывается полностью после текущей задачи и до всего остального. Макроочередь хранит таймеры, колбэки ввода-вывода и события, и за один turn выполняется только одна макротаска. Правило, объясняющее большинство сюрпризов порядка, короткое: после того как колбэк таймера отработал, вся микроочередь вычерпывается до следующего таймера.\n\nЗначит setTimeout с задержкой ноль — это не «сразу», а макротаска, которая выполнится после того, как текущий стек развернётся, и после всех ожидающих микротасок. Promise.resolve().then(...) выполнится раньше неё. Код внутри микротаски, который планирует ещё одну микротаску, держит очередь непустой и полностью голодает таймеры — это бесконечный цикл микротасок, вешающий страницу. Уступить циклу событий — значит дождаться разрешённого промиса, а не поспать.'
        ),
        bullets: [
          L('await suspends the function, not the thread.', 'await приостанавливает функцию, а не поток.'),
          L('Microtasks drain fully before the next macrotask runs.', 'Микротаски вычерпываются полностью до следующей макротаски.'),
          L('setTimeout with a zero delay still runs after every pending microtask.', 'setTimeout с нулевой задержкой всё равно выполняется после всех микротасок.'),
          L('An endless microtask loop freezes the page.', 'Бесконечный цикл микротасок вешает страницу.'),
        ],
        code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// the order is always: 1, 4, 3, 2`,
        takeaway: L(
          'Microtasks before macrotasks, always, and that single rule explains most event loop puzzles.',
          'Сначала микротаски, потом макротаски — всегда, и именно это правило объясняет почти все задачки о цикле событий.'
        ),
      },
      {
        id: 'js-core-ch4-s3',
        title: L('Errors, cancellation and concurrency', 'Ошибки, отмена и конкурентность'),
        body: L(
          'Errors in async code come in three shapes: a synchronous throw inside an async function, which becomes a rejection, a rejected promise you awaited, which becomes a throw at the await, and a failure that never reaches you at all. try/catch/finally around the await covers the first two. An unhandled rejection is reported through the unhandledrejection event and can end the process, so a global handler is a safety net rather than a strategy.\n\nCancellation is the missing piece of most fetch code. AbortController gives you a signal you can pass to fetch, and calling abort rejects the pending request with an AbortError. The same signal can be shared across several operations, so one timeout cancels all of them. Always distinguish an abort from a real failure: catching every error and returning a fallback turns a cancelled request into an empty result with no explanation.\n\nStructured concurrency means the lifetime of a task is bounded by the scope that started it, so when that scope ends everything inside it is cancelled. Promise.all is a poor fit, because one rejection leaves the other promises running. A small helper that races each task against an abort signal gives all-settled semantics with cancellation: the group finishes when every task finishes, and a failure cancels the rest.',
          'Ошибки в асинхронном коде бывают трёх видов: синхронный throw внутри async-функции, который становится отказом, отклонённый промис, который вы дождались, превращающийся в throw на await, и сбой, который не доходит до вас вовсе. try/catch/finally вокруг await покрывает первые два. Необработанный отказ среда сообщает через событие unhandledrejection и может завершить процесс, поэтому глобальный обработчик — это страховка, а не стратегия.\n\nОтмена — та часть, которой обычно не хватает в коде на fetch. AbortController даёт сигнал, который можно передать в fetch, а вызов abort отклоняет висящий запрос с ошибкой AbortError. Тот же сигнал можно разделить между несколькими операциями, и тогда один таймаут отменит их все. Всегда отличайте отмену от настоящего сбоя: перехватывая любую ошибку и возвращая запасной результат, вы тихо превращаете отменённый запрос в пустой.\n\nСтруктурированная конкурентность означает, что время жизни задачи ограничено областью, которая её запустила: когда область заканчивается, всё внутри неё отменяется. Promise.all для этого плохо подходит, потому что один отказ оставляет остальные промисы работать. Небольшой помощник, который ставит каждую задачу в гонку с сигналом отмены, даёт семантику allSettled вместе с отменой: группа заканчивается, когда закончены все задачи, а сбой отменяет остальные.'
        ),
        bullets: [
          L('try/catch around await catches both rejections and synchronous throws.', 'try/catch вокруг await ловит и отказы, и синхронные исключения.'),
          L('unhandledrejection is a safety net, not error handling.', 'unhandledrejection — страховка, а не обработка ошибок.'),
          L('AbortController cancels requests and one signal can cover many of them.', 'AbortController отменяет запросы, и один сигнал может покрыть их все.'),
          L('Promise.all leaves the sibling promises running after one rejection.', 'Promise.all оставляет остальные промисы работать после отказа.'),
        ],
        code: `const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 3000);

try {
  const response = await fetch('/api/report', { signal: controller.signal });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return await response.json();
} catch (error) {
  if (error.name === 'AbortError') return null; // cancelled on purpose
  throw error;
} finally {
  clearTimeout(timer);
}`,
        takeaway: L(
          'Bound every async task with cancellation and a scope, so nothing keeps running after the work that needed it is gone.',
          'Ограничивайте каждую асинхронную задачу отменой и областью, чтобы ничто не работало после того, что её вызвало, пропало.'
        ),
      },
    ],
  },
];
