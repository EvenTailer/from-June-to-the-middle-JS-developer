import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreModule: Module = {
  id: 'js-core',
  title: L('JavaScript Core', 'Основы JavaScript'),
  description: L(
    'Fundamentals: types, variables, operators, functions, objects, async, DOM, and tricky interview questions.',
    'Основы: типы, переменные, операторы, функции, объекты, асинхронность, DOM и каверзные вопросы собеседований.'
  ),
  lessons: [
    { id: 'js-001', title: L('Primitive types', 'Примитивные типы'), question: L('What are the primitive data types in JavaScript?', 'Какие примитивные типы данных в JavaScript?'), answer: L('Primitives: number, string, boolean, null, undefined, symbol, bigint. They are immutable and compared by value. Everything else is an object.', 'Примитивы: number, string, boolean, null, undefined, symbol, bigint. Они неизменяемы и сравниваются по значению. Всё остальное — объекты.'), code: `typeof 42; // "number"\ntypeof 'x'; // "string"\ntypeof true; // "boolean"\ntypeof undefined; // "undefined"\ntypeof Symbol(); // "symbol"\ntypeof 1n; // "bigint"` },
    { id: 'js-002', title: L('typeof quirks', 'Особенности typeof'), question: L('What are the typeof quirks?', 'Какие особенности typeof?'), answer: L('typeof null is "object" (historical bug). typeof function is "function". typeof array is "object". Use Array.isArray for arrays.', 'typeof null возвращает "object" (историческая ошибка). typeof function возвращает "function". typeof array возвращает "object". Для массивов используйте Array.isArray.'), code: `typeof null; // "object"\ntypeof []; // "object"\nArray.isArray([]); // true` },
    { id: 'js-003', title: L('null vs undefined', 'null vs undefined'), question: L('Difference between null and undefined?', 'Разница между null и undefined?'), answer: L('undefined means variable declared but not assigned or missing property. null is intentional absence of value. typeof undefined is "undefined", typeof null is "object".', 'undefined означает переменная объявлена, но не присвоена, или свойство отсутствует. null — намеренное отсутствие значения. typeof undefined — "undefined", typeof null — "object".') },
    { id: 'js-004', title: L('NaN', 'NaN'), question: L('What is NaN and how to check it?', 'Что такое NaN и как проверить?'), answer: L('NaN is Not-a-Number result of invalid numeric operations. It is the only value not equal to itself. Use Number.isNaN, not global isNaN (which coerces).', 'NaN — результат некорректных числовых операций. Единственное значение, не равное самому себе. Используйте Number.isNaN, а не глобальный isNaN (он приводит типы).'), code: `NaN === NaN; // false\nNumber.isNaN(NaN); // true\nNumber.isNaN('abc'); // false` },
    { id: 'js-005', title: L('Infinity and -0', 'Infinity и -0'), question: L('What are Infinity and -0?', 'Что такое Infinity и -0?'), answer: L('Infinity/-Infinity result from division by zero or overflow. -0 exists; 0 === -0 is true, but Object.is(0, -0) is false. 1/-0 is -Infinity.', 'Infinity/-Infinity возникают при делении на ноль или переполнении. -0 существует; 0 === -0 — true, но Object.is(0, -0) — false. 1/-0 равно -Infinity.'), code: `1 / 0; // Infinity\n1 / -0; // -Infinity\nObject.is(0, -0); // false` },
    { id: 'js-006', title: L('Safe integers and BigInt', 'Безопасные целые и BigInt'), question: L('What are safe integer limits and BigInt?', 'Каковы безопасные пределы целых и что такое BigInt?'), answer: L('Safe integers are within Number.MAX_SAFE_INTEGER (2^53-1). Beyond that precision is lost. BigInt supports arbitrary precision integers; cannot mix with Number in arithmetic.', 'Безопасные целые — в пределах Number.MAX_SAFE_INTEGER (2^53-1). За пределами теряется точность. BigInt поддерживает произвольную точность; нельзя смешивать с Number в арифметике.'), code: `Number.MAX_SAFE_INTEGER;\n9007199254740992 + 1 === 9007199254740992; // true\n10n + 1n; // 11n` },
    { id: 'js-007', title: L('String basics', 'Основы строк'), question: L('String properties and common methods?', 'Свойства строк и частые методы?'), answer: L('Strings are immutable primitives. length counts UTF-16 code units. Methods: slice, substring, substr(deprecated), indexOf, includes, startsWith, endsWith, replace/replaceAll, split, trim, padStart/End, repeat, charAt, at (supports negatives).', 'Строки — неизменяемые примитивы. length считает UTF-16 код-юниты. Методы: slice, substring, substr(устарел), indexOf, includes, startsWith, endsWith, replace/replaceAll, split, trim, padStart/End, repeat, charAt, at (поддерживает отрицательные).'), code: `'abc'.at(-1); // "c"\n'a-b'.replaceAll('-', '_');` },
    { id: 'js-008', title: L('Template literals', 'Шаблонные строки'), question: L('Template literals features?', 'Возможности шаблонных строк?'), answer: L('Backticks allow multi-line strings and ${} interpolation. Tagged templates pass parts to a function for custom processing (styled-components, sql).', 'Обратные кавычки позволяют многострочные строки и интерполяцию ${}. Тегированные шаблоны передают части в функцию для кастомной обработки (styled-components, sql).'), code: "const name = 'Ada';\n`Hello, ${name}!`;\nfunction tag(strings, ...vals) { return strings.join(''); }\ntag`hi ${1}`;" },
    { id: 'js-009', title: L('Truthy and falsy', 'Истинность и ложность'), question: L('Which values are falsy?', 'Какие значения ложны?'), answer: L('Falsy: false, 0, -0, 0n, "", null, undefined, NaN. All others truthy, including [], {}, "0", "false", new Date().', 'Ложные: false, 0, -0, 0n, "", null, undefined, NaN. Все остальные истинны, включая [], {}, "0", "false", new Date().'), code: `Boolean([]); // true\nBoolean('0'); // true` },
    { id: 'js-010', title: L('Variables: var/let/const', 'Переменные: var/let/const'), question: L('Differences between var, let and const?', 'Разница между var, let и const?'), answer: L('var is function-scoped, hoisted with undefined, redeclarable. let/const are block-scoped, TDZ, cannot redeclare in same scope. const binding cannot be reassigned but object contents can mutate.', 'var — функциональная область, всплывает со значением undefined, можно переобъявлять. let/const — блочная область, TDZ, нельзя переобъявлять в той же области. Привязку const нельзя переприсвоить, но содержимое объекта можно менять.'), code: `var x = 1;\nlet y = 2;\nconst z = { a: 1 };\nz.a = 2;` },
    { id: 'js-011', title: L('Scope', 'Область видимости'), question: L('Lexical scope and scope chain?', 'Лексическая область и цепочка областей?'), answer: L('JavaScript uses lexical (static) scoping. Inner functions can access outer variables. Scope chain resolves identifiers from inner to outer. Block scope with let/const/{}; function scope with var.', 'JavaScript использует лексическую (статическую) область видимости. Внутренние функции имеют доступ к внешним переменным. Цепочка областей разрешает идентификаторы от внутренней к внешней. Блочная область с let/const/{}; функциональная с var.') },
    { id: 'js-012', title: L('Hoisting', 'Всплытие'), question: L('What hoists and how?', 'Что всплывает и как?'), answer: L('Function declarations hoist fully (callable before definition). var hoists declaration initialized to undefined. let/const/class hoist declaration but remain TDZ. Arrow/function expressions follow variable rules.', 'Function Declaration всплывает полностью (можно вызвать до объявления). var всплывает с undefined. let/const/class всплывают как объявление, но остаются в TDZ. Стрелочные/функциональные выражения следуют правилам переменных.'), code: `console.log(a); // undefined\nvar a = 5;\nfoo(); // works\nfunction foo() {}` },
    { id: 'js-013', title: L('TDZ', 'TDZ'), question: L('What is Temporal Dead Zone?', 'Что такое Temporal Dead Zone?'), answer: L('TDZ is the period between entering scope and variable initialization where accessing let/const/class throws ReferenceError. Even typeof throws in TDZ.', 'TDZ — период от входа в область до инициализации переменной, когда обращение к let/const/class бросает ReferenceError. Даже typeof бросает в TDZ.'), code: `// console.log(x); // ReferenceError\nlet x = 1;` },
    { id: 'js-014', title: L('Global object', 'Глобальный объект'), question: L('Global object and globalThis?', 'Глобальный объект и globalThis?'), answer: L('In browsers global object is window; in Node global. globalThis provides universal reference. var at top level creates global property; let/const do not. Modules have their own scope.', 'В браузерах глобальный объект — window; в Node — global. globalThis даёт универсальную ссылку. var на верхнем уровне создаёт свойство глобального объекта; let/const — нет. Модули имеют собственную область.'), code: `globalThis.setTimeout === window.setTimeout;` },
    { id: 'js-015', title: L('Type coercion overview', 'Обзор приведения типов'), question: L('How does type coercion work?', 'Как работает приведение типов?'), answer: L('Implicit conversion occurs in operators and comparisons. Abstract operations: ToPrimitive, ToNumber, ToString, ToBoolean. + with string concatenates; arithmetic coerces to number. Objects convert via valueOf/toString.', 'Неявное преобразование происходит в операторах и сравнениях. Абстрактные операции: ToPrimitive, ToNumber, ToString, ToBoolean. + со строкой конкатенирует; арифметика приводит к числу. Объекты преобразуются через valueOf/toString.') },
    { id: 'js-016', title: L('Loose equality ==', 'Нестрогое равенство =='), question: L('How does == coerce?', 'Как == приводит типы?'), answer: L('== performs type coercion following Abstract Equality Comparison. null == undefined is true. 0 == false, "" == false, [] == false. NaN == anything is false. Avoid in most code.', '== выполняет приведение по Abstract Equality Comparison. null == undefined — true. 0 == false, "" == false, [] == false. NaN == что-либо — false. Избегайте в большинстве кода.'), code: `0 == false; // true\n[] == false; // true\nnull == undefined; // true` },
    { id: 'js-017', title: L('Strict equality ===', 'Строгое равенство ==='), question: L('How does === work?', 'Как работает ===?'), answer: L('=== returns false if types differ. No coercion. NaN === NaN is false; +0 === -0 is true. Preferred for predictable comparisons.', '=== возвращает false, если типы различаются. Без приведения. NaN === NaN — false; +0 === -0 — true. Предпочтителен для предсказуемых сравнений.') },
    { id: 'js-018', title: L('Logical operators', 'Логические операторы'), question: L('How do &&, ||, ?? return values?', 'Как &&, ||, ?? возвращают значения?'), answer: L('&& returns first falsy or last value. || returns first truthy or last. ?? returns right only when left is null/undefined, not other falsy. Short-circuit evaluation.', '&& возвращает первое ложное или последнее значение. || возвращает первое истинное или последнее. ?? возвращает правый только если левый null/undefined, не другие ложные. Короткое замыкание.'), code: `0 || 5; // 5\n0 ?? 5; // 0\nnull ?? 5; // 5\nfalse && x; // false` },
    { id: 'js-019', title: L('Optional chaining', 'Опциональная цепочка'), question: L('What is optional chaining ?. ?', 'Что такое опциональная цепочка ?. ?'), answer: L('?. short-circuits to undefined if left is null/undefined. Works for properties, calls, and bracket access. Does not prevent errors on non-nullish invalid access.', '?. возвращает undefined, если левая часть null/undefined. Работает для свойств, вызовов и доступа через скобки. Не предотвращает ошибки при невалидном доступе к не-nullish значениям.'), code: `const u = null;\nu?.name; // undefined\nu?.fn?.(); // undefined` },
    { id: 'js-020', title: L('Nullish coalescing', 'Nullish coalescing'), question: L('Difference between ?? and ||?', 'Разница между ?? и ||?'), answer: L('|| falls back on any falsy value. ?? falls back only on null/undefined. Use ?? for default values when 0, false, "" are valid.', '|| подставляет при любом ложном значении. ?? подставляет только при null/undefined. Используйте ?? для значений по умолчанию, когда 0, false, "" валидны.'), code: `0 || 10; // 10\n0 ?? 10; // 0` },
    { id: 'js-021', title: L('Conditional branching', 'Условное ветвление'), question: L('if/else vs ternary vs switch?', 'if/else vs тернарный vs switch?'), answer: L('if/else for complex conditions. Ternary for simple value selection. switch uses strict equality (===) and falls through without break. Group cases by omitting break.', 'if/else для сложных условий. Тернарный для простого выбора значения. switch использует строгое равенство (===) и проваливается без break. Группируйте case, опуская break.'), code: `switch (x) {\n  case 1:\n  case 2: a(); break;\n  default: b();\n}` },
    { id: 'js-022', title: L('switch fallthrough', 'Провал в switch'), question: L('How to use fallthrough intentionally?', 'Как использовать провал намеренно?'), answer: L('Omit break to execute multiple cases. Useful for grouping. Always comment intentional fallthrough. Default can be anywhere but usually last.', 'Опустите break, чтобы выполнялись несколько case. Полезно для группировки. Комментируйте намеренный провал. default может быть где угодно, обычно в конце.'), code: `switch (grade) {\n  case 'A':\n  case 'B': pass(); break;\n}` },
    { id: 'js-023', title: L('for loop', 'Цикл for'), question: L('for loop forms and pitfalls?', 'Формы цикла for и подводные камни?'), answer: L('for (init; condition; update). Variables declared with let are per-iteration binding. Avoid mutating array while iterating. Use for...of for values.', 'for (init; condition; update). Переменные, объявленные через let, имеют привязку на итерацию. Избегайте мутации массива при итерации. Используйте for...of для значений.'), code: `for (let i = 0; i < arr.length; i++) console.log(arr[i]);` },
    { id: 'js-024', title: L('while and do...while', 'while и do...while'), question: L('while vs do...while?', 'while vs do...while?'), answer: L('while checks condition before body. do...while runs body at least once then checks. In while with continue, increment before continue to avoid infinite loop.', 'while проверяет условие до тела. do...while выполняет тело минимум раз, затем проверяет. В while с continue увеличивайте счётчик до continue, чтобы избежать бесконечного цикла.'), code: `let i = 0;\nwhile (i < 3) { console.log(i); i++; }` },
    { id: 'js-025', title: L('for...in', 'for...in'), question: L('When to use for...in?', 'Когда использовать for...in?'), answer: L('for...in iterates enumerable string keys including inherited. Avoid for arrays (order not guaranteed for indices as strings, includes prototype props). Use for objects with hasOwnProperty check.', 'for...in перебирает перечислимые строковые ключи, включая унаследованные. Избегайте для массивов (порядок не гарантирован, ключи строки, включает свойства прототипа). Используйте для объектов с проверкой hasOwnProperty.'), code: `for (const key in obj) {\n  if (Object.prototype.hasOwnProperty.call(obj, key)) console.log(key);\n}` },
    { id: 'js-026', title: L('for...of', 'for...of'), question: L('When to use for...of?', 'Когда использовать for...of?'), answer: L('for...of iterates iterable values (Array, String, Map, Set, NodeList, generators). Supports break/continue. Use for values, not keys. Object is not iterable by default.', 'for...of перебирает значения итерируемых (Array, String, Map, Set, NodeList, генераторы). Поддерживает break/continue. Используйте для значений, не ключей. Object по умолчанию не итерируем.'), code: `for (const v of [1,2,3]) console.log(v);` },
    { id: 'js-027', title: L('break/continue and labels', 'break/continue и метки'), question: L('Labels with break/continue?', 'Метки с break/continue?'), answer: L('Labels allow breaking out of nested loops. break label exits labeled statement; continue label skips to next iteration of labeled loop. Rare but useful for nested search.', 'Метки позволяют выходить из вложенных циклов. break label выходит из помеченного оператора; continue label переходит к следующей итерации помеченного цикла. Редко, но полезно для вложенного поиска.'), code: `outer: for (let i=0;i<3;i++) {\n  for (let j=0;j<3;j++) {\n    if (i===j) break outer;\n  }\n}` },
    { id: 'js-028', title: L('Function declarations', 'Function Declaration'), question: L('Function declaration features?', 'Особенности Function Declaration?'), answer: L('Named function hoisted fully; can be called before definition. Has own this, arguments, prototype. Can be used as constructor. Name is required.', 'Именованная функция всплывает полностью; можно вызвать до объявления. Имеет свой this, arguments, prototype. Можно использовать как конструктор. Имя обязательно.'), code: `function add(a, b) { return a + b; }` },
    { id: 'js-029', title: L('Function expressions', 'Function Expression'), question: L('Function expression vs declaration?', 'Function Expression vs Declaration?'), answer: L('Expression is not hoisted (follows variable). Can be anonymous or named. Named expression name is local to function (useful for recursion).', 'Выражение не всплывает (следует правилам переменной). Может быть анонимным или именованным. Имя именованного выражения локально для функции (полезно для рекурсии).'), code: `const f = function named() { return named; };` },
    { id: 'js-030', title: L('Arrow functions', 'Стрелочные функции'), question: L('Arrow function characteristics?', 'Характеристики стрелочных функций?'), answer: L('Arrow functions have no own this, arguments, super, or new.target; they capture outer this. Cannot be used as constructor; no prototype. Implicit return for single expression. Great for callbacks.', 'Стрелочные функции не имеют своего this, arguments, super, new.target; берут внешний this. Нельзя использовать как конструктор; нет prototype. Неявный return для одного выражения. Отлично для коллбэков.'), code: `const add = (a, b) => a + b;\nconst obj = { x: 1, get: () => this.x }; // this not obj` },
    { id: 'js-031', title: L('Default parameters', 'Параметры по умолчанию'), question: L('Default parameters behavior?', 'Поведение параметров по умолчанию?'), answer: L('Defaults are evaluated at call time, can reference earlier params. undefined triggers default, not null. TDZ applies: later param cannot reference param in TDZ.', 'Значения по умолчанию вычисляются во время вызова, могут ссылаться на предыдущие параметры. undefined вызывает подстановку, null — нет. Действует TDZ: поздний параметр не может ссылаться на параметр в TDZ.'), code: `function f(a = 1, b = a + 1) { return b; }\nf(); // 2` },
    { id: 'js-032', title: L('Rest parameters', 'Rest-параметры'), question: L('Rest parameters vs arguments?', 'Rest-параметры vs arguments?'), answer: L('Rest collects trailing args into a real Array. Must be last param. arguments is array-like (no array methods) in regular functions; absent in arrows. Prefer rest for clarity.', 'Rest собирает хвостовые аргументы в настоящий массив. Должен быть последним параметром. arguments — массивоподобный (без методов массива) в обычных функциях; отсутствует в стрелочных. Предпочитайте rest для ясности.'), code: `function sum(...nums) { return nums.reduce((a,b)=>a+b,0); }` },
    { id: 'js-033', title: L('Return values', 'Возвращаемые значения'), question: L('What does a function return by default?', 'Что возвращает функция по умолчанию?'), answer: L('Functions without explicit return return undefined. Constructors return this unless returning an object. Arrow with braces needs explicit return; without braces implicit return.', 'Функции без явного return возвращают undefined. Конструкторы возвращают this, если не возвращают объект. Стрелочные с фигурными скобками требуют явного return; без скобок — неявный return.'), code: `const f = x => x * 2; // implicit\nconst g = x => { return x * 2; };` },
    { id: 'js-034', title: L('Closures', 'Замыкания'), question: L('What is a closure?', 'Что такое замыкание?'), answer: L('A closure is a function that remembers variables from its lexical scope even after outer function returns. Enables data privacy, factories, partial application, memoization.', 'Замыкание — функция, запоминающая переменные из лексической области даже после возврата внешней функции. Позволяет инкапсуляцию, фабрики, частичное применение, мемоизацию.'), code: `function counter() {\n  let n = 0;\n  return () => ++n;\n}` },
    { id: 'js-035', title: L('Closure loop bug', 'Баг замыкания в цикле'), question: L('Classic loop closure bug?', 'Классический баг замыкания в цикле?'), answer: L('Using var in for loop shares one binding; all callbacks see final value. Fix with let (per-iteration binding) or IIFE capturing current value.', 'Использование var в цикле for разделяет одну привязку; все коллбэки видят финальное значение. Исправьте через let (привязка на итерацию) или IIFE, захватывающую текущее значение.'), code: `for (var i=0;i<3;i++) setTimeout(()=>console.log(i),0); // 3 3 3\nfor (let i=0;i<3;i++) setTimeout(()=>console.log(i),0); // 0 1 2` },
    { id: 'js-036', title: L('this binding', 'Привязка this'), question: L('How is this determined?', 'Как определяется this?'), answer: L('Method call: object before dot. Regular function: global in non-strict, undefined in strict. Arrow: outer lexical this. Constructor with new: new instance. call/apply/bind set explicitly. Event handler: element.', 'Вызов метода: объект перед точкой. Обычная функция: глобальный в non-strict, undefined в strict. Стрелочная: внешний лексический this. Конструктор с new: новый экземпляр. call/apply/bind задают явно. Обработчик события: элемент.'), code: `const obj = { a: 1, get() { return this.a; } };\nobj.get(); // 1` },
    { id: 'js-037', title: L('call/apply/bind', 'call/apply/bind'), question: L('Differences between call, apply, bind?', 'Разница между call, apply, bind?'), answer: L('call invokes with this and argument list. apply invokes with this and arguments array. bind returns new function with bound this and optional leading args. Use for borrowing methods.', 'call вызывает с this и списком аргументов. apply вызывает с this и массивом аргументов. bind возвращает новую функцию с привязанным this и опциональными начальными аргументами. Используйте для заимствования методов.'), code: `fn.call(ctx, 1, 2);\nfn.apply(ctx, [1, 2]);\nconst bound = fn.bind(ctx);` },
    { id: 'js-038', title: L('Losing this', 'Потеря this'), question: L('Common this loss scenarios?', 'Типичные сценарии потери this?'), answer: L('Extracting method loses this: const fn = obj.method; fn() has wrong this. setTimeout(obj.method, 0) loses this. Fix with bind, arrow wrapper, or class field arrow.', 'Извлечение метода теряет this: const fn = obj.method; fn() имеет неверный this. setTimeout(obj.method, 0) теряет this. Исправьте через bind, стрелочную обёртку или стрелочное поле класса.'), code: `setTimeout(obj.method.bind(obj), 0);` },
    { id: 'js-039', title: L('new operator', 'Оператор new'), question: L('What does new do?', 'Что делает new?'), answer: L('new creates empty object with prototype set to constructor.prototype, binds this to it, executes constructor, returns this (or returned object if constructor returns object).', 'new создаёт пустой объект с prototype, равным constructor.prototype, привязывает this к нему, выполняет конструктор, возвращает this (или возвращённый объект, если конструктор возвращает объект).'), code: `function User(name) { this.name = name; }\nconst u = new User('Ada');` },
    { id: 'js-040', title: L('Prototype chain', 'Цепочка прототипов'), question: L('How does prototype chain work?', 'Как работает цепочка прототипов?'), answer: L('Objects have internal [[Prototype]] (access via Object.getPrototypeOf/__proto__). Property lookup traverses chain. Object.create(proto) sets prototype. hasOwnProperty checks own property.', 'Объекты имеют внутренний [[Prototype]] (доступ через Object.getPrototypeOf/__proto__). Поиск свойства идёт по цепочке. Object.create(proto) задаёт прототип. hasOwnProperty проверяет собственное свойство.'), code: `const o = Object.create({ x: 1 });\no.x; // 1\no.hasOwnProperty('x'); // false` },
    { id: 'js-041', title: L('__proto__ vs prototype', '__proto__ vs prototype'), question: L('Difference between __proto__ and prototype?', 'Разница между __proto__ и prototype?'), answer: L('__proto__ is accessor on instances pointing to constructor.prototype. prototype is property on constructor functions used to build instance prototype. Prefer Object.getPrototypeOf/setPrototypeOf.', '__proto__ — аксессор экземпляров, указывающий на constructor.prototype. prototype — свойство функций-конструкторов, используемое для построения прототипа экземпляра. Предпочитайте Object.getPrototypeOf/setPrototypeOf.'), code: `Array.prototype === [].__proto__; // true` },
    { id: 'js-042', title: L('Getters and setters', 'Геттеры и сеттеры'), question: L('Accessor properties?', 'Свойства-аксессоры?'), answer: L('get/set define computed properties. They appear as data properties when accessed. Useful for validation, computed values, reactivity. Defined via literal or defineProperty.', 'get/set определяют вычисляемые свойства. При обращении выглядят как свойства данных. Полезны для валидации, вычисляемых значений, реактивности. Определяются через литерал или defineProperty.'), code: `const o = { get x() { return this._x; }, set x(v) { this._x = v; } };` },
    { id: 'js-043', title: L('Object.assign/freeze/seal', 'Object.assign/freeze/seal'), question: L('Object.assign, freeze, seal?', 'Object.assign, freeze, seal?'), answer: L('Object.assign copies enumerable own props (shallow). freeze makes object immutable (shallow). seal prevents add/remove but allows modify existing. All shallow.', 'Object.assign копирует перечислимые собственные свойства (поверхностно). freeze делает объект неизменяемым (поверхностно). seal запрещает добавление/удаление, но позволяет изменять существующие. Все поверхностные.'), code: `const a = Object.freeze({ nested: { x: 1 } });\na.nested.x = 2; // allowed` },
    { id: 'js-044', title: L('Shallow vs deep clone', 'Поверхностное vs глубокое копирование'), question: L('How to clone objects?', 'Как клонировать объекты?'), answer: L('Shallow clone: spread, Object.assign, slice for arrays. Deep clone: structuredClone (modern), JSON.parse(JSON.stringify) (loses functions/dates/undefined), or libraries. Beware circular refs.', 'Поверхностное: spread, Object.assign, slice для массивов. Глубокое: structuredClone (современный), JSON.parse(JSON.stringify) (теряет функции/даты/undefined) или библиотеки. Остерегайтесь циклических ссылок.'), code: `const copy = structuredClone(original);` },
    { id: 'js-045', title: L('Classes', 'Классы'), question: L('Class syntax basics?', 'Основы синтаксиса классов?'), answer: L('class with constructor method. Methods are on prototype. Classes are not hoisted (TDZ) and run in strict mode. Syntactic sugar over prototypes with stricter semantics.', 'class с методом constructor. Методы на прототипе. Классы не всплывают (TDZ) и выполняются в strict mode. Синтаксический сахар над прототипами со строгой семантикой.'), code: `class User { constructor(name){ this.name=name; } greet(){ return this.name; } }` },
    { id: 'js-046', title: L('Inheritance', 'Наследование'), question: L('extends and super?', 'extends и super?'), answer: L('extends sets prototype chain. In derived constructor, call super() before using this. super.method() calls parent method. Can extend built-ins.', 'extends задаёт цепочку прототипов. В конструкторе наследника вызовите super() до использования this. super.method() вызывает метод родителя. Можно наследовать встроенные.'), code: `class Admin extends User { constructor(name){ super(name); } }` },
    { id: 'js-047', title: L('Static members', 'Статические члены'), question: L('Static methods/properties?', 'Статические методы/свойства?'), answer: L('static members belong to class, not instance. Used for factories, utilities, constants. Static blocks (static {}) run once for class initialization. Inheritance of statics works.', 'Статические члены принадлежат классу, а не экземпляру. Используются для фабрик, утилит, констант. Статические блоки (static {}) выполняются один раз для инициализации класса. Наследование статики работает.'), code: `class A { static x = 1; static create(){ return new A(); } }` },
    { id: 'js-048', title: L('Private fields', 'Приватные поля'), question: L('Private fields with #?', 'Приватные поля через #?'), answer: L('Fields prefixed with # are truly private (hard privacy) and accessible only within class. Private methods too. Cannot be accessed or checked from outside except via in operator inside class.', 'Поля с префиксом # по-настоящему приватны (жёсткая приватность) и доступны только внутри класса. Приватные методы тоже. Нельзя получить доступ или проверить снаружи, кроме оператора in внутри класса.'), code: `class A { #x = 1; getX(){ return this.#x; } }` },
    { id: 'js-049', title: L('instanceof', 'instanceof'), question: L('How does instanceof work?', 'Как работает instanceof?'), answer: L('instanceof checks if constructor.prototype is in object prototype chain. Can be customized via Symbol.hasInstance. Fails across realms (iframes). Use Array.isArray etc. for built-ins.', 'instanceof проверяет, находится ли constructor.prototype в цепочке прототипов объекта. Можно кастомизировать через Symbol.hasInstance. Не работает между realms (iframe). Для встроенных используйте Array.isArray и т.д.'), code: `[] instanceof Array; // true` },
    { id: 'js-050', title: L('Error types', 'Типы ошибок'), question: L('Built-in Error types?', 'Встроенные типы ошибок?'), answer: L('Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError, EvalError, AggregateError. Each has name and message. Throw Error instances for stack traces.', 'Error, TypeError, ReferenceError, SyntaxError, RangeError, URIError, EvalError, AggregateError. У каждого name и message. Бросайте экземпляры Error для стек-трейсов.'), code: `throw new TypeError('bad type');` },
    { id: 'js-051', title: L('try/catch/finally', 'try/catch/finally'), question: L('Error handling structure?', 'Структура обработки ошибок?'), answer: L('try wraps risky code. catch receives error. finally always runs (cleanup). return in finally overrides. Async errors require try/catch around await or .catch.', 'try оборачивает рискованный код. catch получает ошибку. finally выполняется всегда (очистка). return в finally переопределяет. Асинхронные ошибки требуют try/catch вокруг await или .catch.'), code: `try { risky(); } catch (e) { console.error(e); } finally { cleanup(); }` },
    { id: 'js-052', title: L('throw', 'throw'), question: L('throw rules?', 'Правила throw?'), answer: L('throw can throw any value, but prefer Error instances for stack traces. throw without value is syntax error. In async functions, throw becomes rejected promise.', 'throw может бросать любое значение, но предпочтительнее экземпляры Error для стек-трейсов. throw без значения — синтаксическая ошибка. В async-функциях throw становится отклонённым промисом.'), code: `throw new Error('boom');` },
    { id: 'js-053', title: L('Custom errors', 'Пользовательские ошибки'), question: L('Creating custom error classes?', 'Создание пользовательских классов ошибок?'), answer: L('Extend Error, set name, call super(message). Preserve stack. Use instanceof checks. Can add custom fields (code, statusCode).', 'Расширьте Error, задайте name, вызовите super(message). Сохраните стек. Используйте проверки instanceof. Можно добавлять поля (code, statusCode).'), code: `class HttpError extends Error { constructor(msg, status){ super(msg); this.name='HttpError'; this.status=status; } }` },
    { id: 'js-054', title: L('Strict mode', 'Strict mode'), question: L('What does "use strict" change?', 'Что меняет "use strict"?'), answer: L('Disallows undeclared variables, duplicate params, with, octal literals. this in regular functions is undefined (not global). Prevents accidental globals. Modules/classes are strict by default.', 'Запрещает необъявленные переменные, дубликаты параметров, with, восьмеричные литералы. this в обычных функциях undefined (не глобальный). Предотвращает случайные глобальные. Модули/классы strict по умолчанию.'), code: `"use strict";\nx = 1; // ReferenceError` },
    { id: 'js-055', title: L('Arrays creation', 'Создание массивов'), question: L('Array creation methods?', 'Способы создания массивов?'), answer: L('Array literals, new Array(n) (sparse), Array.of(...), Array.from(iterable/arrayLike, mapFn). Prefer literals. Array.from converts array-like and can map.', 'Литералы массивов, new Array(n) (разреженный), Array.of(...), Array.from(iterable/arrayLike, mapFn). Предпочитайте литералы. Array.from конвертирует массивоподобное и может отображать.'), code: `Array.from({ length: 3 }, (_, i) => i); // [0,1,2]` },
    { id: 'js-056', title: L('Mutating array methods', 'Мутирующие методы массивов'), question: L('Mutating array methods?', 'Мутирующие методы массивов?'), answer: L('push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin. They modify original array and often return length or array. Be careful with sort (mutates).', 'push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin. Они изменяют исходный массив и часто возвращают длину или массив. Осторожно с sort (мутирует).'), code: `const a = [3,1,2];\na.sort(); // [1,2,3] (mutated)` },
    { id: 'js-057', title: L('Non-mutating array methods', 'Не мутирующие методы массивов'), question: L('Non-mutating array methods?', 'Не мутирующие методы массивов?'), answer: L('map, filter, reduce, slice, concat, flat, flatMap, find, findIndex, some, every, includes, indexOf, at, toSorted, toReversed, toSpliced, with. Return new arrays/values. Prefer for immutability.', 'map, filter, reduce, slice, concat, flat, flatMap, find, findIndex, some, every, includes, indexOf, at, toSorted, toReversed, toSpliced, with. Возвращают новые массивы/значения. Предпочитайте для иммутабельности.'), code: `const sorted = arr.toSorted((a,b)=>a-b);` },
    { id: 'js-058', title: L('reduce', 'reduce'), question: L('reduce patterns?', 'Паттерны reduce?'), answer: L('reduce aggregates array to single value. Provide initial value to handle empty arrays. Can build objects/arrays. Avoid overuse for readability; sometimes map/filter clearer.', 'reduce агрегирует массив в одно значение. Указывайте начальное значение для обработки пустых массивов. Может строить объекты/массивы. Избегайте чрезмерного использования ради читаемости; иногда map/filter понятнее.'), code: `arr.reduce((acc, x) => acc + x, 0);` },
    { id: 'js-059', title: L('sort comparator', 'Компаратор sort'), question: L('Array sort pitfalls?', 'Подводные камни сортировки массивов?'), answer: L('Default sort converts to strings and sorts UTF-16. Provide comparator (a,b) => a-b for numbers. Comparator must return consistent negative/zero/positive. Sort is stable in modern engines.', 'По умолчанию sort преобразует в строки и сортирует по UTF-16. Предоставьте компаратор (a,b) => a-b для чисел. Компаратор должен возвращать согласованное отрицательное/ноль/положительное. Сортировка стабильна в современных движках.'), code: `[10,2,1].sort((a,b)=>a-b); // [1,2,10]` },
    { id: 'js-060', title: L('find/some/every', 'find/some/every'), question: L('find vs some vs every?', 'find vs some vs every?'), answer: L('find returns first matching element (or undefined). some returns true if any matches. every returns true if all match. All short-circuit. Use includes for primitive membership.', 'find возвращает первый подходящий элемент (или undefined). some возвращает true, если есть совпадение. every возвращает true, если все совпадают. Все с коротким замыканием. Используйте includes для примитивов.'), code: `arr.find(x => x.id === 2);` },
    { id: 'js-061', title: L('Objects basics', 'Основы объектов'), question: L('Object creation and property access?', 'Создание объектов и доступ к свойствам?'), answer: L('Object literals. Dot notation for valid identifiers; bracket for dynamic/computed keys. Property shorthand, method shorthand, computed property names. Spread for shallow copy/merge.', 'Объектные литералы. Точечная нотация для валидных идентификаторов; скобочная для динамических/вычисляемых ключей. Сокращённые свойства, методы, вычисляемые имена. Spread для поверхностного копирования/слияния.'), code: `const key = 'x';\nconst o = { [key]: 1, y() { return this.x; } };` },
    { id: 'js-062', title: L('Destructuring arrays', 'Деструктуризация массивов'), question: L('Array destructuring patterns?', 'Паттерны деструктуризации массивов?'), answer: L('Destructure by position. Skip with commas. Defaults for undefined. Rest collects rest. Swap variables: [a,b]=[b,a]. Nested arrays supported.', 'Деструктуризация по позиции. Пропуск через запятые. Значения по умолчанию для undefined. Rest собирает остаток. Обмен переменных: [a,b]=[b,a]. Поддержка вложенных массивов.'), code: `const [first, , third = 0, ...rest] = arr;\n[a, b] = [b, a];` },
    { id: 'js-063', title: L('Destructuring objects', 'Деструктуризация объектов'), question: L('Object destructuring patterns?', 'Паттерны деструктуризации объектов?'), answer: L('Destructure by property name. Rename with colon. Defaults. Nested. Rest collects remaining props. Useful in function params.', 'Деструктуризация по имени свойства. Переименование через двоеточие. Значения по умолчанию. Вложенность. Rest собирает оставшиеся свойства. Полезно в параметрах функций.'), code: `const { a, b: renamed, c = 0, ...rest } = obj;` },
    { id: 'js-064', title: L('Spread and rest', 'Spread и rest'), question: L('Spread vs rest syntax?', 'Синтаксис spread vs rest?'), answer: L('Same ... syntax. Spread expands iterable/object into elements/properties. Rest collects into array/object. Spread is for construction; rest for collection.', 'Одинаковый синтаксис .... Spread раскрывает итерируемое/объект в элементы/свойства. Rest собирает в массив/объект. Spread для конструирования; rest для сбора.'), code: `const merged = { ...a, ...b };\nconst [first, ...rest] = arr;` },
    { id: 'js-065', title: L('Garbage collection', 'Сборка мусора'), question: L('How does garbage collection work?', 'Как работает сборка мусора?'), answer: L('Automatic memory management. Unreachable objects (no path from roots like global, stack) are collected. Mark-and-sweep. Avoid leaks: clear timers/listeners, null references, use WeakMap/WeakSet for caches.', 'Автоматическое управление памятью. Недостижимые объекты (нет пути от корней: global, стек) собираются. Mark-and-sweep. Избегайте утечек: очищайте таймеры/слушатели, обнуляйте ссылки, используйте WeakMap/WeakSet для кэшей.'), code: `let obj = { big: new Array(1e6) };\nobj = null; // eligible for GC` },
    { id: 'js-066', title: L('WeakMap and WeakSet', 'WeakMap и WeakSet'), question: L('WeakMap/WeakSet behavior?', 'Поведение WeakMap/WeakSet?'), answer: L('Hold keys weakly; entries disappear when key is GCed. Keys must be objects. Not iterable, no size. Use for metadata/caches tied to object lifetime, avoiding leaks.', 'Хранят ключи слабо; записи исчезают при сборке ключа. Ключи должны быть объектами. Не итерируемые, нет size. Используйте для метаданных/кэшей, привязанных к времени жизни объекта, избегая утечек.'), code: `const wm = new WeakMap();\nwm.set(obj, 'meta');` },
    { id: 'js-067', title: L('Promises basics', 'Основы промисов'), question: L('Promise states and creation?', 'Состояния и создание промисов?'), answer: L('Promise has states: pending, fulfilled, rejected. Created with new Promise((resolve, reject) => {}). resolve/reject settle once. .then/.catch/.finally chain.', 'Промис имеет состояния: pending, fulfilled, rejected. Создаётся через new Promise((resolve, reject) => {}). resolve/reject фиксируют один раз. .then/.catch/.finally образуют цепочку.'), code: `const p = new Promise((res, rej) => res(1));` },
    { id: 'js-068', title: L('Promise chaining', 'Цепочка промисов'), question: L('Promise chaining and return values?', 'Цепочка промисов и возвращаемые значения?'), answer: L('then callback return value becomes next promise resolution. Returning promise flattens. Throwing rejects. Enables sequential async without nesting.', 'Возвращаемое значение then становится разрешением следующего промиса. Возврат промиса сплющивается. Throw отклоняет. Позволяет последовательную асинхронность без вложенности.'), code: `fetch('/a').then(r=>r.json()).then(data=>console.log(data));` },
    { id: 'js-069', title: L('Promise combinators', 'Комбинаторы промисов'), question: L('Promise.all/allSettled/race/any?', 'Promise.all/allSettled/race/any?'), answer: L('all: waits all, rejects on first rejection. allSettled: waits all, returns statuses. race: first settled (resolve/reject). any: first fulfilled, rejects only if all reject (AggregateError).', 'all: ждёт все, отклоняется при первой ошибке. allSettled: ждёт все, возвращает статусы. race: первый завершившийся (resolve/reject). any: первый успешный, отклоняется только если все отклонились (AggregateError).'), code: `Promise.all([p1, p2]);` },
    { id: 'js-070', title: L('async/await', 'async/await'), question: L('async/await semantics?', 'Семантика async/await?'), answer: L('async function always returns promise. await pauses until promise settles; throws on rejection. Syntactic sugar over promises. Enables readable sequential async. Top-level await in modules.', 'async-функция всегда возвращает промис. await приостанавливает до разрешения промиса; бросает при отклонении. Синтаксический сахар над промисами. Делает последовательную асинхронность читаемой. Top-level await в модулях.'), code: `async function load() {\n  const res = await fetch('/api');\n  return res.json();\n}` },
    { id: 'js-071', title: L('Async error handling', 'Обработка ошибок в async'), question: L('Handling errors with async/await?', 'Обработка ошибок с async/await?'), answer: L('Wrap await in try/catch. Or use .catch on returned promise. Unhandled rejections can crash Node; browser fires unhandledrejection. Always handle.', 'Оборачивайте await в try/catch. Или используйте .catch у возвращаемого промиса. Необработанные отклонения могут уронить Node; в браузере событие unhandledrejection. Всегда обрабатывайте.'), code: `try { await risky(); } catch (e) { console.error(e); }` },
    { id: 'js-072', title: L('Event loop', 'Event Loop'), question: L('Event loop order?', 'Порядок Event Loop?'), answer: L('Synchronous code runs first. Then microtask queue (promises, queueMicrotask, MutationObserver). Then macrotask queue (setTimeout, setInterval, I/O, events). Each macrotask followed by all microtasks.', 'Сначала синхронный код. Затем очередь микрозадач (промисы, queueMicrotask, MutationObserver). Затем очередь макрозадач (setTimeout, setInterval, I/O, события). После каждой макрозадачи выполняются все микрозадачи.'), code: `console.log('sync');\nsetTimeout(()=>console.log('macro'),0);\nPromise.resolve().then(()=>console.log('micro'));` },
    { id: 'js-073', title: L('Microtasks vs macrotasks', 'Микрозадачи vs макрозадачи'), question: L('Microtask vs macrotask examples?', 'Примеры микрозадач и макрозадач?'), answer: L('Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, setImmediate (Node), I/O, UI events. Microtasks have higher priority and drain fully before next macrotask.', 'Микрозадачи: Promise.then/catch/finally, queueMicrotask, MutationObserver. Макрозадачи: setTimeout, setInterval, setImmediate (Node), I/O, UI-события. Микрозадачи имеют более высокий приоритет и полностью очищаются перед следующей макрозадачей.'), code: `queueMicrotask(() => console.log('micro'));` },
    { id: 'js-074', title: L('Generators', 'Генераторы'), question: L('Generators: function*, yield, next()?', 'Генераторы: function*, yield, next()?'), answer: L('Generators are pausable functions. yield pauses and returns value; next() resumes with optional value. Can be infinite. Used for lazy sequences, async flows, custom iterables.', 'Генераторы — приостанавливаемые функции. yield приостанавливает и возвращает значение; next() возобновляет с опциональным значением. Могут быть бесконечными. Используются для ленивых последовательностей, асинхронных потоков, кастомных итерируемых.'), code: `function* gen() { yield 1; yield 2; }\nconst it = gen();\nit.next(); // {value:1,done:false}` },
    { id: 'js-075', title: L('Iterators and iterables', 'Итераторы и итерируемые'), question: L('What makes an object iterable?', 'Что делает объект итерируемым?'), answer: L('Object implements Symbol.iterator returning iterator object with next() returning {value, done}. Built-ins: Array, String, Map, Set, TypedArray, arguments, NodeList. Spread and for...of use iteration.', 'Объект реализует Symbol.iterator, возвращающий объект-итератор с next(), возвращающим {value, done}. Встроенные: Array, String, Map, Set, TypedArray, arguments, NodeList. Spread и for...of используют итерацию.'), code: `const iterable = { [Symbol.iterator]: function* () { yield 1; } };` },
    { id: 'js-076', title: L('ES modules', 'ES-модули'), question: L('ES module export/import?', 'Экспорт/импорт ES-модулей?'), answer: L('Named: export { x }; export const x. Default: export default. Import: import { x } from, import x from, import * as ns. Modules are strict, singleton, top-level await allowed.', 'Именованные: export { x }; export const x. Default: export default. Импорт: import { x } from, import x from, import * as ns. Модули строгие, синглтоны, top-level await разрешён.'), code: `import { foo } from './mod.js';` },
    { id: 'js-077', title: L('Dynamic import', 'Динамический import'), question: L('Dynamic import()?', 'Динамический import()?'), answer: L('import() returns promise resolving to module namespace. Enables code splitting, lazy loading, conditional imports. Works in CommonJS? In browser/ESM yes.', 'import() возвращает промис, резолвящийся в пространство имён модуля. Позволяет разделение кода, ленивую загрузку, условные импорты. Работает в ESM/браузере.'), code: `const mod = await import('./heavy.js');` },
    { id: 'js-078', title: L('Circular dependencies', 'Циклические зависимости'), question: L('Circular dependencies in ESM?', 'Циклические зависимости в ESM?'), answer: L('ESM uses live bindings; circular imports can yield undefined if accessed before initialization. Avoid cycles or restructure. CommonJS returns partial exports (cached).', 'ESM использует живые привязки; циклические импорты могут давать undefined при обращении до инициализации. Избегайте циклов или рефакторьте. CommonJS возвращает частичные экспорты (кэшированные).') },
    { id: 'js-079', title: L('AbortController', 'AbortController'), question: L('Cancelling fetch?', 'Отмена fetch?'), answer: L('Use AbortController; pass signal to fetch. AbortController.abort() rejects fetch with AbortError. Useful for cleanup on unmount/race conditions.', 'Используйте AbortController; передайте signal в fetch. AbortController.abort() отклоняет fetch с AbortError. Полезно для очистки при размонтировании/гонках.'), code: `const c = new AbortController();\nfetch('/api', { signal: c.signal });\nc.abort();` },
    { id: 'js-080', title: L('Recursion', 'Рекурсия'), question: L('Recursion and stack overflow?', 'Рекурсия и переполнение стека?'), answer: L('Function calls itself; must have base case. Deep recursion can overflow call stack. Tail call optimization not widely supported. Convert to iteration or use trampolining.', 'Функция вызывает себя; должно быть базовое условие. Глубокая рекурсия может переполнить стек вызовов. Оптимизация хвостовых вызовов не поддерживается широко. Преобразуйте в итерацию или используйте трамполин.'), code: `function fact(n){ return n<=1?1:n*fact(n-1); }` },
    { id: 'js-081', title: L('Regular expressions', 'Регулярные выражения'), question: L('RegExp basics and flags?', 'Основы RegExp и флаги?'), answer: L('Literal /pattern/flags or new RegExp. Flags: g global, i case-insensitive, m multiline, s dotAll, u unicode, y sticky, d indices. Methods: test, exec, match, matchAll, replace, replaceAll, split.', 'Литерал /pattern/flags или new RegExp. Флаги: g глобальный, i без учёта регистра, m многострочный, s dotAll, u юникод, y sticky, d индексы. Методы: test, exec, match, matchAll, replace, replaceAll, split.'), code: `/\\d+/g.test('abc123'); // true` },
    { id: 'js-082', title: L('Regex groups', 'Группы в regex'), question: L('Capturing and named groups?', 'Захватывающие и именованные группы?'), answer: L('Parentheses capture groups. Named groups (?<name>...). Non-capturing (?:...). Backreferences \\1 or \\k<name>. matchAll returns all matches with groups.', 'Круглые скобки захватывают группы. Именованные группы (?<name>...). Не захватывающие (?:...). Обратные ссылки \\1 или \\k<name>. matchAll возвращает все совпадения с группами.'), code: `const m = '2026-10-19'.match(/(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})/);` },
    { id: 'js-083', title: L('Regex replace callback', 'replace с коллбэком'), question: L('replace with function?', 'replace с функцией?'), answer: L('replace/replaceAll accept callback receiving match and groups; return replacement string. Enables dynamic transformations and case changes.', 'replace/replaceAll принимают коллбэк, получающий совпадение и группы; возвращает строку замены. Позволяет динамические преобразования и смену регистра.'), code: `'a1b2'.replace(/\\d/g, m => Number(m)+1);` },
    { id: 'js-084', title: L('Date methods', 'Методы Date'), question: L('Date getters/setters and UTC?', 'Геттеры/сеттеры Date и UTC?'), answer: L('get/set methods: getFullYear, getMonth, getDate, getDay, getHours... UTC variants with UTC suffix. toISOString gives UTC ISO. getTime returns timestamp. Avoid mutation; clone via new Date(date).', 'Методы get/set: getFullYear, getMonth, getDate, getDay, getHours... Варианты UTC с суффиксом UTC. toISOString даёт UTC ISO. getTime возвращает timestamp. Избегайте мутации; клонируйте через new Date(date).'), code: `date.toISOString();` },
    { id: 'js-085', title: L('Proxy basics', 'Основы Proxy'), question: L('What is Proxy used for?', 'Для чего используется Proxy?'), answer: L('Proxy wraps target and intercepts operations (get, set, has, deleteProperty, apply, construct, ownKeys, getPrototypeOf). Uses: validation, logging, reactive systems (Vue 3), access control.', 'Proxy оборачивает цель и перехватывает операции (get, set, has, deleteProperty, apply, construct, ownKeys, getPrototypeOf). Применение: валидация, логирование, реактивные системы (Vue 3), контроль доступа.'), code: `const p = new Proxy(target, { get(t, prop) { return t[prop]; } });` },
    { id: 'js-086', title: L('Symbol', 'Symbol'), question: L('Symbol use cases?', 'Применение Symbol?'), answer: L('Unique primitive for property keys (avoid collisions). Well-known symbols (Symbol.iterator, Symbol.hasInstance, Symbol.toPrimitive, Symbol.toStringTag) customize language behavior. Not enumerable in for...in; not coerced to string in concatenation without .toString.', 'Уникальный примитив для ключей свойств (избегает коллизий). Хорошо известные символы (Symbol.iterator, Symbol.hasInstance, Symbol.toPrimitive, Symbol.toStringTag) кастомизируют поведение языка. Не перечисляются в for...in; не приводятся к строке при конкатенации без .toString.'), code: `const s = Symbol('id');\nobj[s] = 1;` },
    { id: 'js-087', title: L('Map', 'Map'), question: L('Map vs Object?', 'Map vs Object?'), answer: L('Map supports any keys (including objects), preserves insertion order, has size, has/get/set/delete/clear. Iterates [key,value]. Better for frequent add/remove and non-string keys. Not JSON-serializable directly.', 'Map поддерживает любые ключи (включая объекты), сохраняет порядок вставки, имеет size, has/get/set/delete/clear. Итерируется [key,value]. Лучше для частых добавлений/удалений и нестроковых ключей. Не сериализуется в JSON напрямую.'), code: `const m = new Map();\nm.set(obj, 'value');\nm.get(obj);` },
    { id: 'js-088', title: L('Set', 'Set'), question: L('Set uses?', 'Применение Set?'), answer: L('Set stores unique values (SameValueZero equality). Methods: add, has, delete, clear, size. Iterates values. Useful for deduplication, membership checks. Convert with Array.from or spread.', 'Set хранит уникальные значения (равенство SameValueZero). Методы: add, has, delete, clear, size. Итерируется по значениям. Полезен для дедупликации, проверки принадлежности. Конвертируйте через Array.from или spread.'), code: `const unique = [...new Set(arr)];` },
    { id: 'js-089', title: L('JSON', 'JSON'), question: L('JSON parse/stringify pitfalls?', 'Подводные камни JSON parse/stringify?'), answer: L('stringify skips functions, undefined, symbols; converts Date to string; fails on circular refs and BigInt. parse reviver can transform. Use for storage/transport; not for deep clone of complex objects.', 'stringify пропускает функции, undefined, символы; конвертирует Date в строку; падает на циклических ссылках и BigInt. parse с reviver может преобразовывать. Используйте для хранения/передачи; не для глубокого клона сложных объектов.'), code: `JSON.parse(JSON.stringify(obj));` },
    { id: 'js-090', title: L('structuredClone', 'structuredClone'), question: L('structuredClone capabilities?', 'Возможности structuredClone?'), answer: L('structuredClone deep clones most values including Date, Map, Set, ArrayBuffer, but not functions, DOM nodes, or prototypes. Handles circular references. Preferred over JSON clone.', 'structuredClone глубоко клонирует большинство значений, включая Date, Map, Set, ArrayBuffer, но не функции, DOM-узлы или прототипы. Обрабатывает циклические ссылки. Предпочтительнее JSON-клонирования.'), code: `const copy = structuredClone(original);` },
  ],
  quiz: [
    {
      id: 'js-q01',
      question: L('What does typeof null return?', 'Что возвращает typeof null?'),
      options: [
        L('It returns "undefined"', 'Возвращает "undefined"'),
        L('It returns "object"', 'Возвращает "object"'),
        L('It returns "null"', 'Возвращает "null"'),
        L('It throws a TypeError', 'Бросает TypeError'),
      ],
      correctIndex: 1,
      explanation: L(
        'typeof null returns "object" because of a bug in the very first version of JavaScript that was never fixed for backward compatibility. To detect null you must compare the value directly, since there is no typeof result that means null.',
        'typeof null возвращает "object" из-за бага в самой первой версии JavaScript, который не исправлен ради обратной совместимости. Чтобы отличить null, нужно сравнивать значение напрямую: результата typeof, означающего null, не существует.'
      ),
    },
    {
      id: 'js-q02',
      question: L('How can you reliably check whether a value is an array?', 'Как надёжно проверить, что значение является массивом?'),
      options: [
        L('typeof value === "array"', 'typeof value === "array"'),
        L('value instanceof Array is the only safe check', 'value instanceof Array — единственная безопасная проверка'),
        L('Array.isArray(value)', 'Array.isArray(value)'),
        L('value.constructor === Array', 'value.constructor === Array'),
      ],
      correctIndex: 2,
      explanation: L(
        'typeof never returns "array" because arrays are objects, so Array.isArray is the correct check. The instanceof form breaks across realms such as iframes, and reading constructor can be shadowed or fail on objects created with Object.create(null).',
        'typeof никогда не возвращает "array", потому что массивы — это объекты, поэтому правильная проверка — Array.isArray. Проверка через instanceof ломается между realm, такими как iframe, а обращение к constructor можно перекрыть или потерять на объектах, созданных через Object.create(null).'
      ),
    },
    {
      id: 'js-q03',
      question: L('Which of these is not one of the primitive types in JavaScript?', 'Какой из этих не является примитивным типом в JavaScript?'),
      options: [
        L('symbol', 'symbol'),
        L('bigint', 'bigint'),
        L('null', 'null'),
        L('function', 'function'),
      ],
      correctIndex: 3,
      explanation: L(
        'The primitives are number, string, boolean, null, undefined, symbol and bigint, and they are immutable and compared by value. A function is an object, even though typeof reports it separately as "function" for historical reasons.',
        'Примитивы — это number, string, boolean, null, undefined, symbol и bigint; они неизменяемы и сравниваются по значению. Функция — объект, даже хотя typeof исторически отдаёт для неё отдельный результат "function".'
      ),
    },
    {
      id: 'js-q04',
      question: L('What is the difference between null and undefined?', 'Чем отличаются null и undefined?'),
      options: [
        L('undefined means a declared but unassigned value, null means an intentional absence', 'undefined означает объявленное, но не присвоенное значение, null — намеренное отсутствие'),
        L('null means a declared but unassigned value, undefined means an intentional absence', 'null означает объявленное, но не присвоенное значение, undefined — намеренное отсутствие'),
        L('They are the same value under two names', 'Это одно и то же значение под двумя именами'),
        L('null is used only for arrays, undefined only for functions', 'null используется только для массивов, undefined — только для функций'),
      ],
      correctIndex: 0,
      explanation: L(
        'undefined means the variable exists but has no value yet, or the property is absent, and it is what a missing argument or a missing property gives you. null is a deliberate "no value here" that a developer assigns. They are loosely equal but not strictly equal.',
        'undefined означает, что переменная есть, но значения у неё нет, либо свойства не существует — именно его даёт отсутствующий аргумент или свойство. null — это осознанное «значения тут нет», которое выставляет разработчик. Они нестрого равны, но не строго.'
      ),
    },
    {
      id: 'js-q05',
      question: L('Which check correctly detects a NaN value?', 'Какая проверка корректно обнаруживает значение NaN?'),
      options: [
        L('isNaN(value), because it coerces the argument first', 'isNaN(value), потому что он сначала приводит аргумент'),
        L('Number.isNaN(value), because it does not coerce', 'Number.isNaN(value), потому что он не приводит тип'),
        L('value === NaN, because NaN equals itself', 'value === NaN, потому что NaN равен самому себе'),
        L('Object.is(value, NaN), because NaN is the only value equal to itself', 'Object.is(value, NaN), потому что NaN — единственное значение, равное самому себе'),
      ],
      correctIndex: 1,
      explanation: L(
        'Number.isNaN tests strictly for the NaN value without coercion. The global isNaN coerces first, so isNaN("abc") is true, while value === NaN is always false because NaN is not equal to itself.',
        'Number.isNaN строго проверяет именно значение NaN, без приведения типов. Глобальный isNaN сначала приводит аргумент, поэтому isNaN("abc") даёт true, а value === NaN всегда false, потому что NaN не равен самому себе.'
      ),
    },
    {
      id: 'js-q06',
      question: L('What is the result of 0 === -0 and Object.is(0, -0)?', 'Что дают 0 === -0 и Object.is(0, -0)?'),
      options: [
        L('Both are true', 'Оба дают true'),
        L('Both are false', 'Оба дают false'),
        L('0 === -0 is true, but Object.is(0, -0) is false', '0 === -0 даёт true, но Object.is(0, -0) даёт false'),
        L('0 === -0 is false, but Object.is(0, -0) is true', '0 === -0 даёт false, но Object.is(0, -0) даёт true'),
      ],
      correctIndex: 2,
      explanation: L(
        'The strict equality operator treats 0 and -0 as the same number, so 0 === -0 is true. Object.is follows SameValue semantics and distinguishes the two, which is why it is the tool for checking a negative zero, for example in direction calculations.',
        'Строгое равенство считает 0 и -0 одним и тем же числом, поэтому 0 === -0 даёт true. Object.is работает по правилам SameValue и различает их, поэтому именно он нужен для проверки отрицательного нуля, например в расчётах направления.'
      ),
    },
    {
      id: 'js-q07',
      question: L('What does 0.1 + 0.2 evaluate to in JavaScript?', 'Чему равно 0.1 + 0.2 в JavaScript?'),
      options: [
        L('Exactly 0.3', 'Ровно 0.3'),
        L('0.30000000000000004, and the only fix is to parse both operands as integers', '0.30000000000000004, и единственное решение — разобрать операнды как целые'),
        L('It throws a TypeError', 'Бросает TypeError'),
        L('0.30000000000000004, because binary floating point cannot represent 0.1 exactly', '0.30000000000000004, потому что двоичная плавающая точка не может точно представить 0.1'),
      ],
      correctIndex: 3,
      explanation: L(
        'Numbers are IEEE 754 doubles, so decimal fractions such as 0.1 are stored as repeating binary approximations and the addition exposes the difference. The usual fixes are rounding to a sensible number of decimals or comparing with a small tolerance instead of with strict equality.',
        'Числа — это 64-битные IEEE 754, поэтому десятичные дроби вроде 0.1 хранятся как приближения с бесконечной двоичной дробью, и сложение обнаруживает разницу. Обычные решения — округление до разумного числа знаков или сравнение с небольшим допуском вместо строгого равенства.'
      ),
    },
    {
      id: 'js-q08',
      question: L('How does JavaScript handle integers beyond Number.MAX_SAFE_INTEGER?', 'Как JavaScript работает с целыми числами за пределами Number.MAX_SAFE_INTEGER?'),
      options: [
        L('Integers are exact up to 2^53 - 1, and BigInt is needed beyond that', 'Целые числа точны до 2^53 - 1, а дальше нужен BigInt'),
        L('Every integer is exact in JavaScript numbers', 'Все целые числа в числах JavaScript точны'),
        L('BigInt values can be mixed freely with Number in arithmetic', 'Значения BigInt можно свободно смешивать с Number в арифметике'),
        L('Number.MAX_SAFE_INTEGER equals 2^31 - 1', 'Number.MAX_SAFE_INTEGER равен 2^31 - 1'),
      ],
      correctIndex: 0,
      explanation: L(
        'Above 2^53 - 1 the double format can no longer represent every consecutive integer, so the value silently loses precision. BigInt stores arbitrary precision integers, but it cannot be mixed with Number in arithmetic, so an explicit conversion is required.',
        'Выше 2^53 - 1 формат double больше не может представить все последовательные целые, и точность теряется молча. BigInt хранит целые с произвольной точностью, но его нельзя смешивать с Number в арифметике — нужен явный перевод.'
      ),
    },
    {
      id: 'js-q09',
      question: L('How does the length property of a string count characters?', 'Как свойство length строки считает символы?'),
      options: [
        L('It counts grapheme clusters, so one emoji counts as 1', 'Считает кластеры графем, поэтому один эмодзи — это 1'),
        L('It counts UTF-16 code units, so one emoji counts as 2', 'Считает кодовые юниты UTF-16, поэтому один эмодзи — это 2'),
        L('It counts bytes in UTF-8', 'Считает байты в UTF-8'),
        L('It counts code points, so one emoji counts as 1', 'Считает кодовые точки, поэтому один эмодзи — это 1'),
      ],
      correctIndex: 1,
      explanation: L(
        'String length counts UTF-16 code units, so an emoji that lives outside the basic multilingual plane takes two units and counts as 2. Grapheme-aware counting needs Intl.Segmenter, and code point counting needs the spread of the string instead of length.',
        'length строки считает кодовые юниты UTF-16, поэтому эмодзи вне базовой многоязычной плоскости занимает два юнита и даёт 2. Подсчёт по графемам требует Intl.Segmenter, а по кодовым точкам — раскрытия строки вместо обращения к length.'
      ),
    },
    {
      id: 'js-q10',
      question: L('What are the important features of template literals?', 'Какие важные возможности есть у шаблонных строк?'),
      options: [
        L('A template literal cannot span several lines', 'Шаблонная строка не может содержать несколько строк'),
        L('A template literal only works with primitive values', 'Шаблонная строка работает только с примитивами'),
        L('Backticks allow interpolation and multi-line strings, and a tag function can process the parts', 'Обратные кавычки дают интерполяцию и многострочность, а тег-функция может обработать части'),
        L('Backticks disable the escaping of special characters', 'Обратные кавычки отключают экранирование спецсимволов'),
      ],
      correctIndex: 2,
      explanation: L(
        'Backticks give you ${} interpolation and multi-line strings, and a tagged template passes the literal parts and the interpolated values to a function, which is how libraries build safe SQL or styled components. Escaping rules inside backticks are the same as in quotes.',
        'Обратные кавычки дают интерполяцию ${} и многострочные строки, а тегированный шаблон передаёт части и подставленные значения в функцию — так работают безопасные SQL-библиотеки и styled-components. Правила экранирования внутри кавычек такие же, как в обычных строках.'
      ),
    },
    {
      id: 'js-q11',
      question: L('Which regular expression flags are valid?', 'Какие флаги регулярных выражений существуют?'),
      options: [
        L('g makes the pattern case-insensitive', 'g делает шаблон нечувствительным к регистру'),
        L('i makes the pattern match every line of the input', 'i заставляет шаблон совпадать с каждой строкой ввода'),
        L('g matches all occurrences, i ignores case and u enables Unicode mode', 'g ищет все совпадения, i игнорирует регистр, u включает режим Unicode'),
        L('s makes the dot match newlines and m makes the pattern global', 's заставляет точку совпадать с переводами строк, а m делает шаблон глобальным'),
      ],
      correctIndex: 2,
      explanation: L(
        'The common flags are g for global matching, i for case-insensitive matching, m for multiline anchors, s for dotAll, u for Unicode mode, y for sticky matching and d for match indices. The trap swaps i with m and confuses s with the global flag.',
        'Основные флаги: g для глобального поиска, i для нечувствительного к регистру, m для многострочных якорей, s для dotAll, u для режима Unicode, y для sticky и d для индексов совпадений. Ловушка путает i с m и s с глобальным флагом.'
      ),
    },
    {
      id: 'js-q12',
      question: L('How does String.prototype.replace work with a function as the second argument?', 'Как работает String.prototype.replace, если вторым аргументом передана функция?'),
      options: [
        L('replace only works with a literal replacement string', 'replace работает только с литеральной строкой замены'),
        L('The callback receives only the matched substring', 'Коллбэк получает только найденную подстроку'),
        L('replace cannot be used to change the case of the result', 'replace нельзя использовать для смены регистра результата'),
        L('The callback receives the match and the capture groups and returns the replacement', 'Коллбэк получает совпадение и группы захвата и возвращает строку замены'),
      ],
      correctIndex: 3,
      explanation: L(
        'When the replacement is a function, it is called for every match with the matched text, the capture groups and the offset, and its return value becomes the replacement. That is how you transform content, for example upper-casing a matched part or reformatting a date.',
        'Если замена — функция, она вызывается для каждого совпадения с найденным текстом, группами захвата и смещением, а её возвращаемое значение становится заменой. Так можно преобразовывать содержимое, например поднимать регистр части совпадения или переформатировать дату.'
      ),
    },
    {
      id: 'js-q13',
      question: L('How do the nullish coalescing operator and the logical OR differ?', 'Чем отличается оператор ?? от логического ИЛИ?'),
      options: [
        L('?? falls back only on null and undefined, while || falls back on any falsy value', '?? подставляет только при null и undefined, а || при любом ложном значении'),
        L('|| falls back only on null and undefined, while ?? falls back on any falsy value', '|| подставляет только при null и undefined, а ?? при любом ложном значении'),
        L('They behave identically', 'Ведут себя одинаково'),
        L('?? cannot be combined with || in one expression', '?? нельзя использовать вместе с || в одном выражении'),
      ],
      correctIndex: 0,
      explanation: L(
        'The logical OR treats every falsy value as a reason to fall back, so 0 || 10 gives 10 and an empty string is replaced too. The nullish coalescing operator only falls back for null and undefined, which is what you want when 0, false or an empty string are meaningful values.',
        'Логическое ИЛИ считает причиной подстановки любое ложное значение, поэтому 0 || 10 даёт 10, а пустая строка тоже заменяется. Оператор ?? подставляет только при null и undefined — это то, что нужно, когда 0, false или пустая строка значимы.'
      ),
    },
    {
      id: 'js-q14',
      question: L('What does the plus operator do when one operand is a string?', 'Что делает оператор плюс, если один из операндов — строка?'),
      options: [
        L('It always converts both operands to numbers', 'Всегда приводит оба операнда к числам'),
        L('It concatenates when either operand is a string, otherwise it adds numerically', 'Конкатенирует, если хотя бы один операнд — строка, иначе складывает как числа'),
        L('It always converts both operands to strings', 'Всегда приводит оба операнда к строкам'),
        L('It throws a TypeError for mixed types', 'Бросает TypeError для смешанных типов'),
      ],
      correctIndex: 1,
      explanation: L(
        'The plus operator is overloaded: with a string operand it performs string concatenation, and otherwise it converts both operands to numbers and adds. This is why 1 + 2 gives 3 while 1 + "2" gives the string "12", and it is the classic source of id-like bugs.',
        'Оператор плюс перегружен: при строковом операнде он склеивает строки, иначе приводит оба операнда к числам и складывает. Поэтому 1 + 2 даёт 3, а 1 + "2" даёт строку "12" — классический источник багов при склейке идентификаторов.'
      ),
    },
    {
      id: 'js-q15',
      question: L('How do var, let and const differ in scope?', 'Чем отличаются var, let и const по области видимости?'),
      options: [
        L('All three are function-scoped', 'Все три имеют функциональную область видимости'),
        L('let and const are function-scoped, var is block-scoped', 'let и const имеют функциональную область, var — блочную'),
        L('var is function-scoped, while let and const are block-scoped', 'var имеет функциональную область, а let и const — блочную'),
        L('All three are global-scoped', 'Все три имеют глобальную область видимости'),
      ],
      correctIndex: 2,
      explanation: L(
        'var is function-scoped, so a var declared in an if block or a for loop leaks out of it and can be redeclared. let and const are block-scoped, which keeps loop variables per iteration and prevents accidental redeclaration in the same scope.',
        'var имеет функциональную область, поэтому переменная, объявленная в блоке if или в цикле for, из него выходит и может быть переобъявлена. let и const имеют блочную область: переменные цикла не сливаются и случайное переобъявление запрещено.'
      ),
    },
    {
      id: 'js-q16',
      question: L('What does const actually prevent?', 'Что именно запрещает const?'),
      options: [
        L('It makes the object immutable', 'Делает объект неизменяемым'),
        L('It freezes the object automatically', 'Автоматически замораживает объект'),
        L('It can only hold primitive values', 'Может хранить только примитивы'),
        L('It prevents reassigning the binding, but the contents of the object can still change', 'Запрещает переприсвоение привязки, но содержимое объекта менять можно'),
      ],
      correctIndex: 3,
      explanation: L(
        'const freezes the binding, not the value: the variable cannot be pointed at another object, but the properties of that object stay writable. Use Object.freeze when you also need the contents to be immutable, and note that freezing is shallow.',
        'const замораживает привязку, а не значение: переменную нельзя направить на другой объект, но свойства объекта остаются изменяемыми. Чтобы заморозить и содержимое, нужен Object.freeze, причём он работает поверхностно.'
      ),
    },
    {
      id: 'js-q17',
      question: L('What happens when you read a let variable before its declaration in the same scope?', 'Что произойдёт, если прочитать переменную let до её объявления в той же области?'),
      options: [
        L('It throws a ReferenceError', 'Бросает ReferenceError'),
        L('It returns undefined', 'Возвращает undefined'),
        L('It returns null', 'Возвращает null'),
        L('It is a syntax error detected at parse time', 'Это синтаксическая ошибка, найденная на этапе разбора'),
      ],
      correctIndex: 0,
      explanation: L(
        'The variable is hoisted but stays in the temporal dead zone until the declaration is evaluated, and touching it in that window throws a ReferenceError. The error happens at runtime, not at parse time, so the script still parses and only the offending access fails.',
        'Переменная всплывает, но до выполнения объявления остаётся во временной мёртвой зоне, и обращение к ней в этом окне бросает ReferenceError. Ошибка возникает во время выполнения, а не при разборе, поэтому скрипт разбирается и падает только конкретное обращение.'
      ),
    },
    {
      id: 'js-q18',
      question: L('Which of these hoisting rules is correct?', 'Какое правило всплытия верно?'),
      options: [
        L('Only var is hoisted', 'Всплывает только var'),
        L('A function declaration is callable before its definition, a function expression is not, and var is hoisted as undefined', 'Function Declaration можно вызвать до определения, Function Expression — нет, а var всплывает как undefined'),
        L('Everything is hoisted fully and can be used anywhere in the file', 'Всё всплывает полностью и доступно в любом месте файла'),
        L('Nothing is hoisted in modern JavaScript', 'В современном JavaScript ничего не всплывает'),
      ],
      correctIndex: 2,
      explanation: L(
        'A function declaration is hoisted with its body, so it can be called before the line where it is written. A function expression is an assignment and follows the rules of its variable, so it is undefined until the assignment runs. var is hoisted as undefined, and let and const stay in the temporal dead zone.',
        'Function Declaration всплывает вместе с телом, поэтому её можно вызвать раньше строки объявления. Function Expression — это присваивание и живёт по правилам своей переменной, то есть до присваивания равна undefined. var всплывает как undefined, а let и const остаются в мёртвой зоне.'
      ),
    },
    {
      id: 'js-q19',
      question: L('How do == and === differ?', 'Чем отличаются == и ===?'),
      options: [
        L('== always converts both operands to numbers before comparing', '== всегда приводит оба операнда к числам перед сравнением'),
        L('=== performs a type conversion when the types differ', '=== выполняет приведение типов, когда типы различаются'),
        L('null == undefined is false and 0 == false is false', 'null == undefined равно false, и 0 == false равно false'),
        L('=== compares without conversion, while == coerces, so null == undefined is true', '=== сравнивает без приведения, а == приводит типы, поэтому null == undefined равно true'),
      ],
      correctIndex: 3,
      explanation: L(
        'The strict equality operator returns false when the types differ, while the loose one coerces first, which is why null == undefined and 0 == false are both true. Loose equality has many corner cases such as [] == false, so prefer === and compare null and undefined explicitly.',
        'Строгое равенство возвращает false при разных типах, а нестрогое сначала приводит типы, поэтому null == undefined и 0 == false истинны. У нестрогого равенства много угловых случаев вроде [] == false, поэтому лучше использовать ===, а null и undefined проверять явно.'
      ),
    },
    {
      id: 'js-q20',
      question: L('How is this bound inside an arrow function?', 'Как определяется this внутри стрелочной функции?'),
      options: [
        L('It has its own this, bound to the object before the dot', 'У неё есть свой this, привязанный к объекту перед точкой'),
        L('Its this is always the global object', 'Её this — всегда глобальный объект'),
        L('Its this is always undefined', 'Её this — всегда undefined'),
        L('It has no own this and uses the this of the enclosing scope', 'У неё нет своего this, используется this внешней области'),
      ],
      correctIndex: 3,
      explanation: L(
        'Arrow functions have no own this, arguments, super or new.target, so they capture the this of the enclosing scope. That makes them ideal for callbacks and a common cause of bugs when a method is defined as an arrow field and should instead see the instance.',
        'У стрелочных функций нет собственных this, arguments, super и new.target, поэтому они берут this внешней области. Это удобно для коллбэков и одновременно частая причина багов, когда метод задан стрелочным полем, а должен видеть экземпляр.'
      ),
    },
    {
      id: 'js-q21',
      question: L('Which of these values is falsy?', 'Какое из этих значений ложно?'),
      options: [
        L('NaN', 'NaN'),
        L('[]', '[]'),
        L('"0"', '"0"'),
        L('{}', '{}'),
      ],
      correctIndex: 0,
      explanation: L(
        'The falsy values are false, 0, -0, 0n, an empty string, null, undefined and NaN. Empty arrays, empty objects and the string "0" are truthy, because only the value itself matters, not whether it is empty or what it looks like.',
        'Ложными являются false, 0, -0, 0n, пустая строка, null, undefined и NaN. Пустые массивы, пустые объекты и строка "0" — истинные, потому что важно само значение, а не то, пустое оно или как выглядит.'
      ),
    },
    {
      id: 'js-q22',
      question: L('How do default parameter values behave?', 'Как ведут себя значения параметров по умолчанию?'),
      options: [
        L('null also triggers the default value', 'null тоже вызывает значение по умолчанию'),
        L('Only undefined triggers the default, and a default can reference earlier parameters', 'Значение по умолчанию срабатывает только при undefined, и оно может ссылаться на предыдущие параметры'),
        L('Defaults are evaluated once when the function is defined', 'Значения по умолчанию вычисляются один раз при определении функции'),
        L('A passed value never overrides the default', 'Переданное значение никогда не перекрывает значение по умолчанию'),
      ],
      correctIndex: 1,
      explanation: L(
        'Only undefined activates a default, while null is a legitimate value that is used as is. Defaults are evaluated at call time and can refer to earlier parameters, so function f(a = 1, b = a + 1) returns 2 when called without arguments.',
        'Значение по умолчанию срабатывает только при undefined, а null — это полноценное значение, которое используется как есть. Значения вычисляются в момент вызова и могут ссылаться на предыдущие параметры, поэтому f(a = 1, b = a + 1) вернёт 2 при вызове без аргументов.'
      ),
    },
    {
      id: 'js-q23',
      question: L('What is a closure?', 'Что такое замыкание?'),
      options: [
        L('A function that copies the values it uses at creation time', 'Функция, копирующая используемые значения в момент создания'),
        L('A function created only inside a loop', 'Функция, созданная только внутри цикла'),
        L('A function that runs immediately when it is defined', 'Функция, выполняющаяся немедленно при определении'),
        L('A function that keeps access to variables of its lexical scope after the outer function returned', 'Функция, сохраняющая доступ к переменным своей лексической области после возврата внешней функции'),
      ],
      correctIndex: 3,
      explanation: L(
        'A closure is a function together with the variables it captured from its lexical scope, and it keeps that access even after the outer function has returned. That is what powers counters, factories, partial application and memoization, and it is also why closures can keep memory alive.',
        'Замыкание — это функция вместе с переменными, которые она захватила из своей лексической области, и доступ к ним сохраняется даже после возврата внешней функции. На этом держатся счётчики, фабрики, частичное применение и мемоизация, и именно поэтому замыкания могут удерживать память.'
      ),
    },
    {
      id: 'js-q24',
      question: L('Why do several callbacks in a for loop sometimes all print the same final number?', 'Почему несколько коллбэков в цикле for иногда печатают одно и то же финальное число?'),
      options: [
        L('Using let in the loop header makes every callback see the final value', 'let в заголовке цикла заставляет все коллбэки видеть финальное значение'),
        L('The bug appears only with setInterval', 'Баг проявляется только с setInterval'),
        L('Using var in the loop header creates a separate binding per iteration', 'var в заголовке цикла создаёт отдельную привязку на итерацию'),
        L('Using var in the loop header makes every callback see the final value, while let creates a binding per iteration', 'var в заголовке цикла заставляет все коллбэки видеть финальное значение, а let создаёт привязку на итерацию'),
      ],
      correctIndex: 3,
      explanation: L(
        'A var declared in a for header is a single function-scoped binding shared by every iteration, so the callbacks all read the value it has at the end. let in the header creates a fresh binding per iteration, so each closure captures its own value and the output is 0, 1, 2.',
        'var в заголовке for — это одна функциональная привязка, общая для всех итераций, поэтому коллбэки читают её итоговое значение. let в заголовке создаёт новую привязку на каждой итерации, и каждое замыкание захватывает своё значение, а вывод будет 0, 1, 2.'
      ),
    },
    {
      id: 'js-q25',
      question: L('What is this inside a method called as obj.method()?', 'Что такое this в методе, вызванном как obj.method()?'),
      options: [
        L('this is the object the method was called on', 'this — объект, у которого вызван метод'),
        L('this is always the global object', 'this — всегда глобальный объект'),
        L('this is always undefined', 'this — всегда undefined'),
        L('this is the object where the method was defined', 'this — объект, в котором метод определён'),
      ],
      correctIndex: 0,
      explanation: L(
        'In a method call the receiver, the object before the dot, becomes this. That is why obj.get() sees obj while a detached copy of the same function sees something else. The receiver of a call determines this, not the place where the function was written.',
        'При вызове метода this становится получатель — объект перед точкой. Поэтому obj.get() видит obj, а отсоединённая копия той же функции видит уже другое. this определяет получатель вызова, а не место написания функции.'
      ),
    },
    {
      id: 'js-q26',
      question: L('What is the difference between call, apply and bind?', 'Чем отличаются call, apply и bind?'),
      options: [
        L('bind invokes the function immediately with the given this', 'bind немедленно вызывает функцию с заданным this'),
        L('bind returns a new function with this bound, while call and apply invoke the function right away', 'bind возвращает новую функцию с привязанным this, а call и apply сразу вызывают функцию'),
        L('apply takes arguments as a list, call takes an array', 'apply принимает аргументы списком, а call — массивом'),
        L('call returns a new bound function', 'call возвращает новую привязанную функцию'),
      ],
      correctIndex: 1,
      explanation: L(
        'call invokes the function with a given this and a list of arguments, apply does the same but takes the arguments as an array, and bind returns a new function with this (and optionally some leading arguments) already bound. bind is the one that produces a new function.',
        'call вызывает функцию с заданным this и списком аргументов, apply — то же, но аргументы принимает массивом, а bind возвращает новую функцию с уже привязанными this и, по желанию, первыми аргументами. Новую функцию создаёт именно bind.'
      ),
    },
    {
      id: 'js-q27',
      question: L('Why does passing a method directly to setTimeout break this?', 'Почему передача метода напрямую в setTimeout ломает this?'),
      options: [
        L('this is always restored by the event loop', 'this всегда восстанавливается событийным циклом'),
        L('Only strict mode loses this', 'Только strict mode теряет this'),
        L('Passing a method as a callback, for example to setTimeout, loses the this binding', 'Передача метода как коллбэка, например в setTimeout, теряет привязку this'),
        L('this is always bound to the element that fired the event', 'this всегда привязан к элементу, который вызвал событие'),
      ],
      correctIndex: 2,
      explanation: L(
        'setTimeout calls the function later with no receiver, so this has no object to point at and falls back to undefined in strict mode. Fix it with bind, an arrow wrapper or an arrow class field, and the same trap applies to addEventListener and array callbacks.',
        'setTimeout вызывает функцию позже без получателя, поэтому this не указывает ни на объект и в strict mode равен undefined. Лечится через bind, стрелочную обёртку или стрелочное поле класса; та же ловушка есть в addEventListener и в коллбэках массивов.'
      ),
    },
    {
      id: 'js-q28',
      question: L('How does property lookup work with prototypes?', 'Как работает поиск свойств с учётом прототипов?'),
      options: [
        L('Property lookup stops at the first own property', 'Поиск свойства останавливается на первом собственном свойстве'),
        L('hasOwnProperty returns true for inherited properties', 'hasOwnProperty возвращает true и для унаследованных свойств'),
        L('Objects have no prototype chain in strict mode', 'В strict mode у объектов нет цепочки прототипов'),
        L('Lookup walks the prototype chain, and hasOwnProperty only reports own properties', 'Поиск идёт по цепочке прототипов, а hasOwnProperty сообщает только о собственных свойствах'),
      ],
      correctIndex: 3,
      explanation: L(
        'Reading a property walks the prototype chain until it finds a match, which is why every object can use toString. hasOwnProperty answers a different question: whether the property sits directly on the object, which is what you need when copying objects or looping over keys.',
        'Чтение свойства идёт по цепочке прототипов до первого совпадения, поэтому у любого объекта есть toString. hasOwnProperty отвечает на другой вопрос: лежит ли свойство непосредственно на объекте — именно это важно при копировании объектов и обходе ключей.'
      ),
    },
    {
      id: 'js-q29',
      question: L('How deep is Object.freeze?', 'Насколько глубоко работает Object.freeze?'),
      options: [
        L('freeze is shallow, so properties of nested objects can still be changed', 'freeze работает поверхностно, поэтому свойства вложенных объектов менять можно'),
        L('freeze is deep and prevents every change', 'freeze работает глубоко и запрещает любые изменения'),
        L('freeze prevents reading the properties', 'freeze запрещает чтение свойств'),
        L('seal also makes existing properties read-only', 'seal также делает существующие свойства доступными только для чтения'),
      ],
      correctIndex: 0,
      explanation: L(
        'Object.freeze makes the object own properties non-writable and non-configurable, but it does not touch the objects those properties point to. A nested object stays mutable, and Object.seal behaves differently: it blocks adding and deleting properties but still allows changing the existing ones.',
        'Object.freeze делает собственные свойства объекта не записываемыми и не настраиваемыми, но не трогает объекты, на которые они ссылаются. Вложенный объект остаётся изменяемым. Object.seal работает иначе: запрещает добавление и удаление, но изменение существующих разрешает.'
      ),
    },
    {
      id: 'js-q30',
      question: L('What is the best way to deep clone an object in modern browsers and Node?', 'Как лучше всего глубоко клонировать объект в современных браузерах и Node?'),
      options: [
        L('JSON.parse(JSON.stringify(obj)) clones everything perfectly', 'JSON.parse(JSON.stringify(obj)) клонирует всё идеально'),
        L('structuredClone copies Dates, Maps and Sets, but not functions or DOM nodes', 'structuredClone копирует Date, Map и Set, но не функции и DOM-узлы'),
        L('The spread syntax clones nested objects as well', 'Spread-синтаксис клонирует и вложенные объекты'),
        L('Object.assign performs a deep clone', 'Object.assign делает глубокое клонирование'),
      ],
      correctIndex: 1,
      explanation: L(
        'structuredClone handles Dates, Maps, Sets, typed arrays and circular references, which the JSON trick cannot. It still refuses functions and DOM nodes. The JSON approach loses Dates, drops undefined and functions and throws on circular structures, while spread and Object.assign are shallow.',
        'structuredClone справляется с Date, Map, Set, типизированными массивами и циклическими ссылками, что не умеет JSON-способ. При этом он не копирует функции и DOM-узлы. JSON-подход теряет даты, выбрасывает undefined и функции и падает на циклических структурах, а spread и Object.assign работают поверхностно.'
      ),
    },
    {
      id: 'js-q31',
      question: L('Where do methods declared inside a class live?', 'Где живут методы, объявленные внутри класса?'),
      options: [
        L('Class methods are copied into every instance', 'Методы класса копируются в каждый экземпляр'),
        L('Classes are hoisted like function declarations', 'Классы всплывают, как Function Declaration'),
        L('Class methods live on the prototype and the class body runs in strict mode', 'Методы класса живут на прототипе, а тело класса выполняется в strict mode'),
        L('A class cannot be extended by another class', 'Класс нельзя расширить другим классом'),
      ],
      correctIndex: 2,
      explanation: L(
        'Class methods are defined on the prototype and shared by all instances, so instances stay small. The class body always runs in strict mode and the class itself is not hoisted: touching it before the declaration throws a ReferenceError.',
        'Методы класса определяются на прототипе и разделяются всеми экземплярами, поэтому экземпляры остаются лёгкими. Тело класса всегда выполняется в strict mode, а сам класс не всплывает: обращение к нему до объявления бросает ReferenceError.'
      ),
    },
    {
      id: 'js-q32',
      question: L('What must a derived class constructor do before using this?', 'Что должен сделать конструктор наследника перед использованием this?'),
      options: [
        L('super can be called after this has been used', 'super можно вызвать после использования this'),
        L('super is optional in a derived constructor', 'super необязателен в конструкторе наследника'),
        L('super sets the prototype of the new instance', 'super задаёт прототип нового экземпляра'),
        L('Call super() first, because this is not initialised until the parent constructor ran', 'Сначала вызвать super(), потому что this не инициализирован до выполнения конструктора родителя'),
      ],
      correctIndex: 3,
      explanation: L(
        'In a derived constructor this is created only after the parent constructor runs, so touching this before super() throws a ReferenceError. super also copies the parent own properties and lets you call parent methods through super.method().',
        'В конструкторе наследника this появляется только после выполнения конструктора родителя, поэтому обращение к this до super() бросает ReferenceError. Кроме того, super копирует собственные свойства родителя и позволяет вызывать его методы через super.method().'
      ),
    },
    {
      id: 'js-q33',
      question: L('How do for...in and for...of differ?', 'Чем отличаются for...in и for...of?'),
      options: [
        L('for...of iterates the values of an iterable, while for...in iterates enumerable string keys including inherited ones', 'for...of перебирает значения итерируемого, а for...in — перечислимые строковые ключи, включая унаследованные'),
        L('for...in iterates the values of an iterable', 'for...in перебирает значения итерируемого'),
        L('for...of iterates enumerable string keys including inherited ones', 'for...of перебирает перечислимые строковые ключи, включая унаследованные'),
        L('Both loops iterate the same way and can be used interchangeably', 'Оба цикла работают одинаково и взаимозаменяемы'),
      ],
      correctIndex: 0,
      explanation: L(
        'for...of uses the iteration protocol and yields values, so it works with arrays, strings, Maps, Sets and generators. for...in walks enumerable string keys, including inherited ones, so on an array it yields index strings and on an object it can pick up prototype properties. Guard for...in with Object.prototype.hasOwnProperty.call.',
        'for...of использует протокол итерации и отдаёт значения, поэтому работает с массивами, строками, Map, Set и генераторами. for...in обходит перечислимые строковые ключи, включая унаследованные, поэтому на массиве даёт индексы-строки, а на объекте может подхватить свойства прототипа. for...in стоит защищать проверкой Object.prototype.hasOwnProperty.call.'
      ),
    },
    {
      id: 'js-q34',
      question: L('How private are class fields declared with a hash prefix?', 'Насколько приватны поля класса, объявленные с префиксом-хеш?'),
      options: [
        L('A private field is only a naming convention and can be read from outside', 'Приватное поле — просто соглашение об именовании, его можно читать снаружи'),
        L('The engine enforces it, so the field cannot be accessed from outside the class', 'Движок это обеспечивает, поле недоступно вне класса'),
        L('Private fields can only be static', 'Приватные поля могут быть только статическими'),
        L('Private fields are copied into the prototype', 'Приватные поля копируются в прототип'),
      ],
      correctIndex: 1,
      explanation: L(
        'A # field is enforced by the engine, not by convention: it is not readable, writable or even detectable from outside the class, and it is not copied into the prototype. Underlining a name is only a naming convention and gives no real protection.',
        'Поле с # обеспечивается движком, а не соглашением: снаружи класса его нельзя прочитать, изменить и даже обнаружить, и оно не копируется в прототип. Подчёркивание в имени — это лишь соглашение и никакой реальной защиты не даёт.'
      ),
    },
    {
      id: 'js-q35',
      question: L('How does the instanceof operator work?', 'Как работает оператор instanceof?'),
      options: [
        L('instanceof compares primitive values', 'instanceof сравнивает примитивные значения'),
        L('instanceof works across realms such as iframes without issues', 'instanceof работает между realm вроде iframe без проблем'),
        L('instanceof checks whether the constructor prototype appears in the prototype chain of the object', 'instanceof проверяет, есть ли prototype конструктора в цепочке прототипов объекта'),
        L('instanceof is the recommended way to detect arrays', 'instanceof — рекомендуемый способ определить массив'),
      ],
      correctIndex: 3,
      explanation: L(
        'instanceof walks the prototype chain of the value and checks whether the prototype of the given constructor appears in it. Because each realm has its own prototypes, an array created inside an iframe is not an instance of the outer Array, so use Array.isArray for built-ins.',
        'instanceof идёт по цепочке прототипов значения и проверяет, есть ли в ней prototype указанного конструктора. Поскольку у каждой realm свои прототипы, массив из iframe не является экземпляром внешнего Array, поэтому для встроенных типов используйте Array.isArray.'
      ),
    },
    {
      id: 'js-q36',
      question: L('What does new Array(3) create?', 'Что создаёт new Array(3)?'),
      options: [
        L('It creates a sparse array of length 3 with no elements assigned', 'Создаёт разреженный массив длины 3 без заданных элементов'),
        L('It creates an array with three elements: 1, 2 and 3', 'Создаёт массив из трёх элементов: 1, 2 и 3'),
        L('It creates an empty array of length 0', 'Создаёт пустой массив длины 0'),
        L('It throws a TypeError', 'Бросает TypeError'),
      ],
      correctIndex: 0,
      explanation: L(
        'With a single numeric argument the constructor sets the length instead of filling the array, so the result is a sparse array with three holes. To build real elements use Array(3).fill(0) or Array.from({ length: 3 }, (_, i) => i).',
        'С единственным числовым аргументом конструктор задаёт длину, а не наполняет массив, поэтому получается разреженный массив с тремя дырками. Чтобы получить настоящие элементы, используйте Array(3).fill(0) или Array.from({ length: 3 }, (_, i) => i).'
      ),
    },
    {
      id: 'js-q37',
      question: L('How does Array.prototype.sort order numbers without a comparator?', 'Как Array.prototype.sort сортирует числа без компаратора?'),
      options: [
        L('The default sort is numeric, so [10, 2, 1] becomes [1, 2, 10]', 'По умолчанию сортировка числовая, поэтому [10, 2, 1] станет [1, 2, 10]'),
        L('The default sort converts elements to strings, so [10, 2, 1] becomes [1, 10, 2]', 'По умолчанию sort приводит элементы к строкам, поэтому [10, 2, 1] станет [1, 10, 2]'),
        L('The default sort always throws without a comparator', 'Без компаратора sort всегда бросает исключение'),
        L('The default sort removes duplicate values', 'По умолчанию sort удаляет дубликаты'),
      ],
      correctIndex: 1,
      explanation: L(
        'Without a comparator the elements are converted to strings and compared as UTF-16, so 10 comes before 2 because the string "10" sorts before "2". For numbers pass a numeric comparator such as (a, b) => a - b, and remember that sort mutates the array in place.',
        'Без компаратора элементы приводятся к строкам и сравниваются как UTF-16, поэтому 10 оказывается раньше 2: строка "10" сортируется раньше "2". Для чисел нужен числовой компаратор вида (a, b) => a - b, и помните, что sort мутирует массив на месте.'
      ),
    },
    {
      id: 'js-q38',
      question: L('Which array methods mutate the original array?', 'Какие методы массива мутируют исходный массив?'),
      options: [
        L('map, filter and slice mutate the original array', 'map, filter и slice мутируют исходный массив'),
        L('Every array method mutates the original array', 'Любой метод массива мутирует исходный массив'),
        L('sort, reverse, splice, push and pop mutate the original array, while map, filter, slice and flatMap return new arrays', 'sort, reverse, splice, push и pop мутируют исходный массив, а map, filter, slice и flatMap возвращают новые'),
        L('push and pop return new arrays', 'push и pop возвращают новые массивы'),
      ],
      correctIndex: 2,
      explanation: L(
        'Mutating methods include push, pop, shift, unshift, splice, sort, reverse, fill and copyWithin. Non-mutating methods such as map, filter, slice, concat, flat and flatMap return new arrays, and the newer toSorted, toReversed and toSpliced give an immutable alternative to the mutating ones.',
        'Мутирующие методы: push, pop, shift, unshift, splice, sort, reverse, fill и copyWithin. Не мутирующие — map, filter, slice, concat, flat и flatMap — возвращают новые массивы, а новые toSorted, toReversed и toSpliced дают иммутабельную альтернативу мутирующим.'
      ),
    },
    {
      id: 'js-q39',
      question: L('What happens when reduce is called on an empty array without an initial value?', 'Что произойдёт, если вызвать reduce на пустом массиве без начального значения?'),
      options: [
        L('It returns 0', 'Возвращает 0'),
        L('It returns undefined', 'Возвращает undefined'),
        L('It returns the first element', 'Возвращает первый элемент'),
        L('It throws a TypeError because there is no accumulator to start from', 'Бросает TypeError, потому что не с чего начать накопление'),
      ],
      correctIndex: 3,
      explanation: L(
        'Without an initial value reduce takes the first element as the accumulator, and an empty array leaves it with nothing to work with, so it throws. Passing an initial value such as 0 makes the call safe for empty arrays and states the intended result type.',
        'Без начального значения reduce берёт первый элемент как накопитель, и на пустом массиве ему не с чего начать, поэтому бросается исключение. Начальное значение вроде 0 делает вызов безопасным для пустых массивов и задаёт тип результата.'
      ),
    },
    {
      id: 'js-q40',
      question: L('How do find, some and every differ?', 'Чем отличаются find, some и every?'),
      options: [
        L('find returns the first matching element, some returns true if any element matches, every returns true if all elements match', 'find возвращает первый подходящий элемент, some — true, если есть совпадение, every — true, если совпали все'),
        L('every returns the first matching element', 'every возвращает первый подходящий элемент'),
        L('some returns the first matching element', 'some возвращает первый подходящий элемент'),
        L('find returns a boolean, while some and every return elements', 'find возвращает boolean, а some и every — элементы'),
      ],
      correctIndex: 0,
      explanation: L(
        'find gives the element itself or undefined, some gives a boolean that turns true as soon as one element matches, and every gives a boolean that stays true only if all of them match. All three short-circuit, so they stop at the first decisive element.',
        'find отдаёт сам элемент или undefined, some — boolean, который становится true при первом же совпадении, а every — boolean, остающийся true, только если совпали все. Все три коротко замыкаются и останавливаются на первом решающем элементе.'
      ),
    },
    {
      id: 'js-q41',
      question: L('When is Map a better choice than a plain object?', 'Когда Map лучше обычного объекта?'),
      options: [
        L('Object accepts any key type, while Map only accepts strings', 'Object принимает любые ключи, а Map только строки'),
        L('Map accepts any key type, keeps insertion order and exposes size, so it suits object keys and frequent add and remove operations', 'Map принимает любые ключи, хранит порядок вставки и имеет size, поэтому подходит для объектных ключей и частых добавлений и удалений'),
        L('Map is always faster for string keys', 'Map всегда быстрее для строковых ключей'),
        L('Map is JSON-serializable as is', 'Map сериализуется в JSON как есть'),
      ],
      correctIndex: 1,
      explanation: L(
        'Map accepts objects and functions as keys, preserves insertion order and exposes a size property, and it is efficient when entries are added and removed often. A plain object coerces keys to strings, so the key "1" and the number 1 collide. Map is not JSON-serializable directly.',
        'Map принимает объекты и функции в качестве ключей, сохраняет порядок вставки и имеет свойство size, а ещё эффективен при частых добавлениях и удалениях. Обычный объект приводит ключи к строкам, поэтому ключ "1" и число 1 совпадают. В JSON Map напрямую не сериализуется.'
      ),
    },
    {
      id: 'js-q42',
      question: L('Does fetch reject when the server answers with 404?', 'Отклоняется ли fetch, когда сервер отвечает 404?'),
      options: [
        L('fetch rejects the promise on any status code from 400 to 599', 'fetch отклоняет промис на любом статусе от 400 до 599'),
        L('fetch rejects only on network failures and 5xx statuses', 'fetch отклоняет только при сетевых сбоях и статусах 5xx'),
        L('fetch resolves with the response, and res.ok is false for 4xx and 5xx', 'fetch разрешается с ответом, а res.ok равен false для 4xx и 5xx'),
        L('fetch retries the request automatically until it gets a 2xx', 'fetch автоматически повторяет запрос, пока не получит 2xx'),
      ],
      correctIndex: 2,
      explanation: L(
        'fetch rejects only on network level failures, so a 404 or a 500 is a perfectly normal resolved response. You have to check res.ok or res.status yourself before reading the body, otherwise parsing an error page as JSON throws a confusing SyntaxError.',
        'fetch отклоняется только при сетевых сбоях, поэтому 404 или 500 — это обычный разрешённый ответ. Нужно самому проверить res.ok или res.status перед чтением тела, иначе попытка распарсить страницу ошибки как JSON даст запутанный SyntaxError.'
      ),
    },
    {
      id: 'js-q43',
      question: L('What are the rules for WeakMap keys?', 'Какие правила действуют для ключей WeakMap?'),
      options: [
        L('WeakMap keys can be any primitive, and entries never expire', 'Ключи WeakMap могут быть любыми примитивами, записи не исчезают'),
        L('WeakMap is iterable and exposes size like Map', 'WeakMap итерируем и имеет size, как Map'),
        L('WeakMap keeps its entries until clear is called', 'WeakMap хранит записи, пока не вызвать clear'),
        L('WeakMap keys must be objects, and an entry disappears when the key is garbage collected', 'Ключи WeakMap должны быть объектами, а запись исчезает, когда ключ собирается сборщиком мусора'),
      ],
      correctIndex: 3,
      explanation: L(
        'WeakMap holds its keys weakly, so an entry is removed once nothing else references the key and the garbage collector runs. That makes it the right place for metadata attached to an object without keeping that object alive, and it is why WeakMap is not iterable and has no size.',
        'WeakMap держит ключи слабо, поэтому запись удаляется, как только на ключ больше никто не ссылается и отработает сборщик мусора. Поэтому WeakMap подходит для метаданных, привязанных к объекту, не удерживая его, и именно поэтому он не итерируем и не имеет size.'
      ),
    },
    {
      id: 'js-q44',
      question: L('What does the destructuring pattern const { a: renamed, ...rest } = obj do?', 'Что делает паттерн деструктуризации const { a: renamed, ...rest } = obj?'),
      options: [
        L('It renames a to renamed and collects every other property into rest', 'Переименовывает a в renamed и собирает все остальные свойства в rest'),
        L('It creates a property called renamed inside obj', 'Создаёт свойство renamed внутри obj'),
        L('The rest element collects only the explicitly named properties', 'Rest собирает только явно названные свойства'),
        L('Destructuring with a rest element always throws', 'Деструктуризация с rest всегда бросает исключение'),
      ],
      correctIndex: 0,
      explanation: L(
        'The colon renames the property a into the local variable renamed, and the rest element collects all the properties that were not named into a fresh object. The same rest idea works for arrays, where it collects the remaining elements.',
        'Двоеточие переименовывает свойство a в локальную переменную renamed, а rest собирает все неназванные свойства в новый объект. Та же идея с rest работает и для массивов, где он забирает оставшиеся элементы.'
      ),
    },
    {
      id: 'js-q45',
      question: L('How should a custom error class be written?', 'Как правильно написать собственный класс ошибки?'),
      options: [
        L('Errors can only be created by the built-in constructors', 'Ошибки можно создавать только встроенными конструкторами'),
        L('Extend Error, call super with the message and set the name, which keeps the stack trace and allows instanceof checks', 'Наследовать Error, вызвать super с сообщением и задать name — так сохраняется стек-трейс и работают проверки instanceof'),
        L('Extending Error removes the stack trace', 'Наследование от Error убирает стек-трейс'),
        L('Custom errors cannot carry extra fields such as statusCode', 'Пользовательские ошибки не могут нести дополнительные поля вроде statusCode'),
      ],
      correctIndex: 1,
      explanation: L(
        'A custom error extends Error, passes the message to super and sets its own name, so the stack trace is preserved and instanceof identifies the specific type. Extra fields such as statusCode or code are then just normal own properties on the instance.',
        'Своя ошибка наследует Error, передаёт сообщение в super и задаёт своё имя — стек-трейс сохраняется, а instanceof распознаёт конкретный тип. Дополнительные поля вроде statusCode или code становятся обычными собственными свойствами экземпляра.'
      ),
    },
    {
      id: 'js-q46',
      question: L('How do try, catch and finally interact?', 'Как взаимодействуют try, catch и finally?'),
      options: [
        L('finally runs only when an error was thrown', 'finally выполняется только при ошибке'),
        L('A return inside finally is ignored', 'return внутри finally игнорируется'),
        L('finally always runs, and a return inside it overrides the result of the try block', 'finally выполняется всегда, а return внутри него перекрывает результат блока try'),
        L('catch must be the last block of the statement', 'catch должен быть последним блоком конструкции'),
      ],
      correctIndex: 2,
      explanation: L(
        'finally is meant for cleanup and runs whether or not an error was thrown. A return inside finally silently discards the value from the try block, which is a classic source of confusing bugs, so prefer throwing from finally or restructuring the code.',
        'finally предназначен для очистки и выполняется независимо от того, была ли ошибка. return внутри finally молча выбрасывает значение из блока try — это классический источник запутанных багов, поэтому лучше бросать из finally или переписать код.'
      ),
    },
    {
      id: 'js-q47',
      question: L('What happens when an async function throws an exception?', 'Что происходит, когда async-функция бросает исключение?'),
      options: [
        L('The exception is swallowed by the promise machinery', 'Исключение поглощается механизмом промисов'),
        L('The exception propagates to the caller synchronously', 'Исключение синхронно пробрасывается вызывающему коду'),
        L('The exception stops the event loop', 'Исключение останавливает событийный цикл'),
        L('The async function returns a rejected promise', 'async-функция возвращает отклонённый промис'),
      ],
      correctIndex: 3,
      explanation: L(
        'An async function always returns a promise, so a throw inside it is converted into a rejected promise rather than a synchronous exception. Handle it with try and catch around the await, or with catch on the returned promise, otherwise it becomes an unhandled rejection.',
        'async-функция всегда возвращает промис, поэтому throw внутри неё превращается в отклонённый промис, а не в синхронное исключение. Обрабатывайте его через try и catch вокруг await либо через catch у возвращённого промиса, иначе получите необработанное отклонение.'
      ),
    },
    {
      id: 'js-q48',
      question: L('What does an async function return?', 'Что возвращает async-функция?'),
      options: [
        L('It always returns a promise, even for a plain return value', 'Всегда возвращает промис, даже для обычного return'),
        L('It returns the value directly when it is not a promise', 'Возвращает значение напрямую, если это не промис'),
        L('It returns undefined until the promise settles', 'Возвращает undefined, пока промис не завершится'),
        L('It returns a thenable only if the body throws', 'Возвращает thenable, только если тело бросает ошибку'),
      ],
      correctIndex: 0,
      explanation: L(
        'An async function always wraps its result in a promise, so a plain return value arrives as a resolved promise. That is what makes await inside it possible and why mixing await with plain functions breaks.',
        'async-функция всегда оборачивает результат в промис, поэтому обычный return приходит как разрешённый промис. Именно это делает возможным await внутри неё и объясняет, почему смешивание await с обычными функциями ломается.'
      ),
    },
    {
      id: 'js-q49',
      question: L('How do the promise combinators differ?', 'Чем отличаются комбинаторы промисов?'),
      options: [
        L('Promise.all waits for all promises and returns the status of each one', 'Promise.all ждёт все промисы и возвращает статус каждого'),
        L('Promise.all rejects as soon as one promise rejects, while allSettled waits for all and reports the status of each', 'Promise.all отклоняется, как только один промис отклоняется, а allSettled ждёт все и возвращает статус каждого'),
        L('Promise.all resolves with the first promise that settles', 'Promise.all разрешается первым завершившимся промисом'),
        L('Promise.all rejects only if every promise rejects', 'Promise.all отклоняется, только если отклонились все промисы'),
      ],
      correctIndex: 1,
      explanation: L(
        'Promise.all rejects on the first rejection, which makes it unsuitable when you want every result regardless of failures. Promise.allSettled waits for everything and returns a status per promise, Promise.race settles with the first result, and Promise.any resolves with the first fulfilled promise.',
        'Promise.all отклоняется при первом отклонении, поэтому он не подходит, когда нужны все результаты независимо от ошибок. Promise.allSettled ждёт всё и возвращает статус каждого промиса, Promise.race завершается первым результатом, а Promise.any разрешается первым успешным промисом.'
      ),
    },
    {
      id: 'js-q50',
      question: L('In what order does the event loop run this code: console.log(1); setTimeout(fn, 0); Promise.resolve().then(fn)?', 'В каком порядке событийный цикл выполнит этот код: console.log(1); setTimeout(fn, 0); Promise.resolve().then(fn)?'),
      options: [
        L('The setTimeout callback, then the promise callback, then the synchronous code', 'Коллбэк setTimeout, затем коллбэк промиса, затем синхронный код'),
        L('The promise callback, then the setTimeout callback, then the synchronous code', 'Коллбэк промиса, затем коллбэк setTimeout, затем синхронный код'),
        L('The synchronous code, then the promise callback, then the setTimeout callback', 'Синхронный код, затем коллбэк промиса, затем коллбэк setTimeout'),
        L('The order depends on how long the timer is', 'Порядок зависит от длительности таймера'),
      ],
      correctIndex: 2,
      explanation: L(
        'Synchronous code runs first, then the microtask queue is drained completely, and only after that does the next macrotask such as a timer callback run. Promise callbacks are microtasks and setTimeout callbacks are macrotasks, so the order is 1, then the promise callback, then the timer callback.',
        'Сначала выполняется синхронный код, затем полностью опустошается очередь микрозадач, и только после этого запускается следующая макрозадача, например коллбэк таймера. Коллбэки промисов — микрозадачи, а setTimeout — макрозадачи, поэтому порядок такой: 1, потом коллбэк промиса, потом коллбэк таймера.'
      ),
    },
  ],
};
