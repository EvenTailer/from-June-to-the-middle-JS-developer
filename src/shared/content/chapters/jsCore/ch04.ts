import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh04: Chapter = {
  id: 'js-core-ch4',
  title: L('Functions, arguments and closures', 'Функции, аргументы и замыкания'),
  summary: L(
    'How a function is created changes what this, arguments and hoisting mean inside it, how parameters and defaults are evaluated at call time, how closures keep state alive, and why higher-order pure functions form the backbone of modern JavaScript.',
    'От способа создания функции зависят смысл this, arguments и поднятия, порядок вычисления параметров и значений по умолчанию, то, как замыкания сохраняют состояние, и почему чистые функции высшего порядка лежат в основе современного JavaScript.'
  ),
  sections: [
    {
      id: 'js-core-ch4-s1',
      title: L('Function declarations, expressions and arrows', 'Объявления функций, функциональные выражения и стрелочные функции'),
      body: L(
        'JavaScript offers three ways to produce a function object, and the differences between them are not cosmetic. A function declaration is a statement: function add(a, b) { return a + b; }. A function expression is an expression that evaluates to a function value, and it may be anonymous or named. An arrow function is a shorter syntax with different semantics, not merely fewer characters. The first two are ordinary functions: they create their own this and their own arguments, and they carry a prototype property.\n\nFunction declarations are hoisted: the whole function, body included, is created when the surrounding scope is entered, so you can call it above the line that defines it. Function expressions are not hoisted as values; a const or let binding that holds one sits in the temporal dead zone until the assignment runs, and calling it earlier throws a ReferenceError. Arrow functions behave the same way here, and they have no prototype property either, which is why new on them fails.\n\nAn arrow function has no own this at all. When it needs this, it reads it from the enclosing scope, exactly like an ordinary variable, and that binding is captured when the arrow is created rather than when it is called. The same holds for arguments and for super. The practical effect is that arrows are immune to the loss of context described later in this chapter, while ordinary functions are entirely at the mercy of whoever calls them.\n\nBecause an arrow has no this of its own, it cannot act as a constructor: new (() => {}) throws a TypeError. It cannot be called with new, it has no prototype property, and it owns no arguments binding, so the word arguments inside an arrow refers to the arguments of the nearest enclosing ordinary function.',
        'В JavaScript есть три способа получить функциональный объект, и различия между ними далеко не косметические. Объявление функции это оператор: function add(a, b) { return a + b; }. Функциональное выражение это выражение, которое вычисляется в функцию, анонимную или именованную. Стрелочная функция — это более короткая запись с другой семантикой, а не просто меньше символов. Первые две формы — обычные функции: у них есть собственный this, собственный arguments и свойство prototype.\n\nОбъявления функций поднимаются: вся функция вместе с телом создаётся при входе в окружающую область, поэтому вызвать её можно раньше строки, в которой она определена. Функциональные выражения не поднимаются как значения: константа, в которой они лежат, находится во временной мёртвой зоне до момента присваивания, и обращение к ней раньше выбросит ReferenceError. Со стрелочными функциями то же самое, и у них ещё нет свойства prototype, поэтому new на них не работает.\n\nУ стрелочной функции вообще нет собственного this. Когда ей нужен this, она берёт его из внешней области, ровно как обычную переменную, и эта привязка захватывается в момент создания стрелки, а не в момент вызова. То же касается arguments и super. Практический эффект: стрелки неуязвимы к потере контекста, о которой пойдёт речь позже, а обычные функции целиком зависят от того, кто их вызывает.\n\nПоскольку у стрелки нет своего this, её нельзя использовать как конструктор: new (() => {}) выбросит TypeError. Её нельзя вызвать через new, у неё нет свойства prototype и нет собственного arguments, поэтому слово arguments внутри стрелки указывает на arguments ближайшей внешней обычной функции.'
      ),
      bullets: [
        L('A function declaration is hoisted and fully initialised before the scope runs.', 'Объявление функции поднимается и полностью инициализируется до выполнения кода области.'),
        L('Function expressions and arrows are values, so a const binding for them stays in the temporal dead zone until the assignment.', 'Функциональные выражения и стрелки — значения, поэтому const с ними находится во временной мёртвой зоне до присваивания.'),
        L('An arrow has no own this: it reads this from the enclosing scope, captured at creation time.', 'У стрелки нет своего this: она берёт его из внешней области, привязка захватывается при создании.'),
        L('An arrow has no prototype property and throws a TypeError when used with new.', 'У стрелки нет prototype, а new на ней выбрасывает TypeError.'),
        L('An arrow owns no arguments binding; the name resolves to the nearest enclosing ordinary function.', 'У стрелки нет собственного arguments: имя указывает на ближайшую внешнюю обычную функцию.'),
      ],
      code: `// Declaration: hoisted, callable above the line that defines it
console.log(add(2, 3)); // 5
function add(a, b) { return a + b; }

// Expression: a plain value, not hoisted
const double = function (n) { return n * 2; };

// Arrow: shorter syntax, different semantics
const triple = (n) => n * 3;

console.log(double.prototype !== undefined); // true
console.log(triple.prototype);                // undefined

const obj = {
  value: 10,
  read() { return this.value; },      // method: this is the receiver
  readArrow: () => obj.value,          // arrow: this is lexical
};
console.log(obj.read()); // 10`,
      table: {
        caption: L('The three ways to create a function', 'Три способа создать функцию'),
        headers: [
          L('Form', 'Форма'),
          L('Hoisted', 'Поднимается'),
          L('Own this', 'Свой this'),
          L('Usable with new', 'Работает с new'),
        ],
        rows: [
          [L('Function declaration', 'Объявление функции'), L('Yes, fully', 'Да, полностью'), L('Yes', 'Есть'), L('Yes', 'Да')],
          [L('Function expression', 'Функциональное выражение'), L('No', 'Нет'), L('Yes', 'Есть'), L('Yes', 'Да')],
          [L('Arrow function', 'Стрелочная функция'), L('No', 'Нет'), L('No, lexical', 'Нет, лексический'), L('No', 'Нет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('An arrow is not a shorter function', 'Стрелка — это не просто короткая функция'),
          text: L(
            'Replacing an ordinary function with an arrow can silently change what this is. Inside an arrow this comes from the outer scope, so a method written as an arrow property loses the receiver and reads undefined in strict mode. Keep ordinary functions for methods, constructors and callbacks that need an explicit receiver.',
            'Замена обычной функции на стрелку может незаметно изменить смысл this. Внутри стрелки this берётся из внешней области, поэтому метод, записанный как стрелочное свойство, теряет получателя и читает undefined в строгом режиме. Обычные функции оставляйте для методов, конструкторов и колбэков, которым нужен явный получатель.'
          ),
        },
        {
          tone: 'tip',
          title: L('Pick the form by role', 'Выбирайте форму по роли'),
          text: L(
            'Declaration for named top-level functions, expression when the function is a value passed around, arrow for short inline callbacks and for any place where this must come from the enclosing scope.',
            'Объявление для именованных функций верхнего уровня, выражение когда функция выступает значением и передаётся дальше, стрелка для коротких встроенных колбэков и везде, где this должен прийти из внешней области.'
          ),
        },
      ],
      takeaway: L(
        'A function declaration is hoisted, an arrow has no own this and cannot be used as a constructor.',
        'Объявление функции поднимается, у стрелки нет своего this, и как конструктор она не используется.'
      ),
      seeAlso: [
        L('Chapter 3: hoisting and the temporal dead zone', 'Глава 3: поднятие и временная мёртвая зона'),
        L('Section 4-4: this binding, call, apply and bind', 'Секция 4-4: this, call, apply и bind'),
        L('Chapter 6: classes, constructors and inheritance', 'Глава 6: классы, конструкторы и наследование'),
      ],
    },
    {
      id: 'js-core-ch4-s2',
      title: L('Parameters, defaults and destructuring', 'Параметры, значения по умолчанию и деструктуризация'),
      body: L(
        'A parameter without a value receives undefined, but the language lets you write the fallback right in the parameter list. function greet(name = "world") substitutes the default only when the argument is exactly undefined. The expression is evaluated at call time, not when the function is defined, so a default may read mutable state or the current date, and every call evaluates it again. Parameters are evaluated left to right, which means a later default can refer to an earlier parameter.\n\nDestructuring in the parameter list turns an object argument into named bindings without any indexing. function draw({ x, y, size = 10 }) reads three properties from the first argument. The pattern is applied to the argument at call time and it fails loudly: if the argument is undefined or null, the destructuring itself throws a TypeError, because there is nothing to read the properties from.\n\nInside the pattern you can rename and you can supply defaults. function draw({ x: left = 0, y: top = 0 }) binds left to the property x. A default inside the pattern fires for undefined properties, and a renamed binding with a default fires when the source property is missing or undefined. That is the difference between a default parameter and a default inside a destructuring pattern: the first looks at the argument, the second looks at each property separately.\n\nNull is protected by none of this. Passing null into a destructured parameter throws "Cannot destructure property ... of null", and reading a property of null throws the same way anywhere else. Default values cover undefined only, so if you need to tolerate null you have to handle it explicitly, either with a nullish check on the argument or by validating inside the function.',
        'Параметр без значения получает undefined, но язык позволяет записать запасной вариант прямо в списке параметров. function greet(name = "world") подставляет значение по умолчанию, только если аргумент — строго undefined. Выражение вычисляется в момент вызова, а не при определении функции, поэтому значение по умолчанию может читать изменяемое состояние или текущее время, и каждый вызов вычисляет его заново. Параметры вычисляются слева направо, поэтому более позднее значение по умолчанию может ссылаться на более ранний параметр.\n\nДеструктуризация в списке параметров превращает объект-аргумент в именованные привязки без всякой индексации. function draw({ x, y, size = 10 }) читает три свойства из первого аргумента. Паттерн применяется к аргументу в момент вызова, и при неудаче он падает громко: если аргумент равен undefined или null, сама деструктуризация выбросит TypeError, потому что свойства читать не у чего.\n\nВнутри паттерна можно переименовать свойство и задать значение по умолчанию. function draw({ x: left = 0, y: top = 0 }) привязывает left к свойству x. Значение по умолчанию внутри паттерна срабатывает для свойств, равных undefined, а переименованная привязка со значением по умолчанию — когда исходное свойство отсутствует или равно undefined. В этом и разница между значением по умолчанию у параметра и значением по умолчанию внутри паттерна: первое смотрит на аргумент, второе — на каждое свойство по отдельности.\n\nNull не защищён ничем из этого. Передача null в деструктурируемый параметр выбрасывает "Cannot destructure property ... of null", и чтение свойства null ведёт себя так же в любом другом месте. Значения по умолчанию покрывают только undefined, поэтому если нужно терпеть null, обрабатывайте его явно: либо проверкой на null или undefined в аргументе, либо валидацией внутри функции.'
      ),
      bullets: [
        L('Default parameter values are evaluated on every call, in parameter order.', 'Значения по умолчанию вычисляются при каждом вызове, в порядке параметров.'),
        L('A default fires for undefined and never for null.', 'Значение по умолчанию срабатывает на undefined и никогда на null.'),
        L('Destructuring an undefined or null argument throws a TypeError.', 'Деструктуризация undefined или null выбрасывает TypeError.'),
        L('A default inside a pattern is evaluated per property, not per argument.', 'Значение по умолчанию внутри паттерна считается для каждого свойства, а не для аргумента.'),
        L('Renaming in a pattern uses the key: bindingName form.', 'Переименование в паттерне записывается как key: bindingName.'),
      ],
      code: `function greet(name = 'world', greeting = \`Hello \${name}\`) {
  return \`\${greeting}, \${name}!\`;
}
console.log(greet('Ada')); // 'Hello Ada, Ada!'
console.log(greet());      // 'Hello world, world!'

function draw({ x, y, size = 10, x: left = 0 }) {
  return { x, y, size, left };
}
console.log(draw({ x: 5, y: 7 }));
// { x: 5, y: 7, size: 10, left: 5 }

function pick(options) {
  const { mode = 'fast' } = options ?? {};
  return mode;
}
console.log(pick(null)); // 'fast'`,
      table: {
        caption: L('Where a fallback comes from', 'Откуда берётся запасное значение'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Trigger', 'Условие'),
          L('Result', 'Результат'),
        ],
        rows: [
          [L('Default parameter', 'Значение по умолчанию у параметра'), L('argument is undefined', 'аргумент равен undefined'), L('default value is used', 'подставляется значение по умолчанию')],
          [L('Default parameter', 'Значение по умолчанию у параметра'), L('argument is null', 'аргумент равен null'), L('null is kept', 'null остаётся')],
          [L('Default inside a pattern', 'Значение по умолчанию в паттерне'), L('property is undefined', 'свойство равно undefined'), L('default value is used', 'подставляется значение по умолчанию')],
          [L('Default inside a pattern', 'Значение по умолчанию в паттерне'), L('property is null', 'свойство равно null'), L('null is kept', 'null остаётся')],
          [L('Destructured parameter', 'Деструктурируемый параметр'), L('argument is undefined or null', 'аргумент равен undefined или null'), L('TypeError is thrown', 'выбрасывается TypeError')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A default does not protect against null', 'Значение по умолчанию не спасает от null'),
          text: L(
            'The common trick function f({ a } = {}) protects against a missing argument, but not against an explicit f(null). The default only fires for undefined. If null is a legitimate input, check it yourself with f(config ?? {}).',
            'Приём function f({ a } = {}) защищает от отсутствующего аргумента, но не от явного f(null). Значение по умолчанию срабатывает только на undefined. Если null — допустимый вход, проверяйте его сами через f(config ?? {}).'
          ),
        },
        {
          tone: 'tip',
          title: L('Destructure in the parameter list', 'Деструктуризуйте в списке параметров'),
          text: L(
            'A destructured parameter documents the expected shape of the argument and gives you a default per property. The caller passes a plain object and never learns the internal variable names.',
            'Деструктурируемый параметр документирует ожидаемую форму аргумента и даёт значение по умолчанию для каждого свойства. Вызывающий код передаёт обычный объект и ничего не знает про внутренние имена переменных.'
          ),
        },
      ],
      takeaway: L(
        'Defaults fire only for undefined, they are evaluated at call time, and destructuring a null or undefined argument throws.',
        'Значения по умолчанию срабатывают только на undefined, вычисляются в момент вызова, а деструктуризация null или undefined выбрасывает исключение.'
      ),
      seeAlso: [
        L('Section 1-4: null, undefined and the difference between them', 'Секция 1-4: null, undefined и разница между ними'),
        L('Section 4-3: rest parameters and the arguments object', 'Секция 4-3: rest-параметры и объект arguments'),
        L('Chapter 7: destructuring arrays and objects in practice', 'Глава 7: деструктуризация массивов и объектов на практике'),
      ],
    },
    {
      id: 'js-core-ch4-s3',
      title: L('Rest arguments and the arguments object', 'Rest-аргументы и объект arguments'),
      body: L(
        'The rest parameter collects every argument that was not matched by a named parameter into a real array. It has to be the last parameter, because it swallows everything that follows, and its syntax is three dots in front of the name: function sum(first, ...rest). The array is built fresh on every call, so mutating it affects nothing outside the function.\n\nBefore rest parameters existed, the arguments object did the same job, and it is still there in every non-arrow function. It is array-like: it has a length, indexed elements and it is iterable, but it is not an Array. It has no map, no filter and no includes, Array.isArray(arguments) is false, and its prototype is Object.prototype. Converting it costs one call: Array.from(arguments), or the older [].slice.call(arguments).\n\nAn arrow function has no arguments of its own, so the name inside an arrow refers to the arguments of the nearest enclosing ordinary function. At the top level of an ES module there is no such function, and the identifier is simply not defined, which throws a ReferenceError. A CommonJS file is wrapped in a function, so arguments exists there and holds the module wrapper arguments.\n\nThe arguments object is linked to the parameters in sloppy mode: writing arguments[0] = 5 changes the first parameter. In strict mode the two are unlinked, so assigning to arguments[0] no longer touches the parameter, and arguments.callee throws a TypeError because it exposes the calling function. Modern code should prefer rest parameters, which read better and behave identically in both modes.',
        'Rest-параметр собирает все аргументы, не попавшие в именованные параметры, в настоящий массив. Он обязан быть последним в списке, потому что забирает всё, что идёт после него, и записывается через три точки перед именем: function sum(first, ...rest). Массив создаётся заново при каждом вызове, поэтому его мутация не затрагивает ничего снаружи.\n\nДо появления rest-параметров ту же работу делал объект arguments, и он до сих пор есть в каждой нестрелочной функции. Он похож на массив: у него есть длина, индексируемые элементы и он итерируем, но массивом он не является. У него нет map, filter и includes, Array.isArray(arguments) возвращает false, а прототип у него — Object.prototype. Преобразование стоит одного вызова: Array.from(arguments) или более старый [].slice.call(arguments).\n\nУ стрелочной функции нет собственного arguments, поэтому имя внутри стрелки указывает на arguments ближайшей внешней обычной функции. На верхнем уровне ES-модуля такой функции нет, идентификатор просто не определён, и обращение к нему выбрасывает ReferenceError. Файл CommonJS оборачивается в функцию, поэтому arguments там существует и содержит аргументы обёртки модуля.\n\nВ нестрогом режиме объект arguments связан с параметрами: запись arguments[0] = 5 меняет первый параметр. В строгом режиме связь разрывается, присваивание в arguments[0] больше не трогает параметр, а arguments.callee выбрасывает TypeError, потому что раскрывает вызывающую функцию. В современном коде стоит предпочитать rest-параметры: они читаются лучше и ведут себя одинаково в обоих режимах.'
      ),
      bullets: [
        L('A rest parameter must be the last parameter in the list.', 'Rest-параметр обязан быть последним в списке параметров.'),
        L('A rest parameter produces a real Array, the arguments object is only array-like.', 'Rest-параметр создаёт настоящий Array, а arguments — лишь объект, похожий на массив.'),
        L('Array.isArray(arguments) is false, use Array.from to convert it.', 'Array.isArray(arguments) ложно, для преобразования нужен Array.from.'),
        L('Inside an arrow, arguments belongs to the nearest enclosing ordinary function.', 'Внутри стрелки arguments принадлежит ближайшей внешней обычной функции.'),
        L('In strict mode arguments and parameters are unlinked and arguments.callee throws.', 'В строгом режиме arguments и параметры не связаны, а arguments.callee выбрасывает исключение.'),
      ],
      code: `function sum(first, ...rest) {
  return first + rest.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1));       // 1

function legacy() {
  console.log(Array.isArray(arguments)); // false
  console.log(arguments.length);         // 2
  console.log([...arguments]);            // [ 'a', 'b' ]
  console.log(Array.from(arguments));     // [ 'a', 'b' ]
}
legacy('a', 'b');

// ES modules are always strict, so arguments is unlinked there
function strictMode(a) {
  arguments[0] = 99;
  return a; // 1, the parameter is untouched
}
console.log(strictMode(1)); // 1`,
      table: {
        caption: L('Rest parameter against the arguments object', 'Rest-параметр против объекта arguments'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Rest parameter', 'Rest-параметр'),
          L('arguments', 'arguments'),
        ],
        rows: [
          [L('Value type', 'Тип значения'), L('real Array', 'настоящий Array'), L('array-like object', 'объект, похожий на массив')],
          [L('Own methods', 'Собственные методы'), L('map, filter, spread', 'map, filter, spread'), L('none', 'нет')],
          [L('Link to parameters', 'Связь с параметрами'), L('none', 'нет'), L('linked in sloppy mode', 'связан в нестрогом режиме')],
          [L('Inside an arrow', 'Внутри стрелки'), L('own binding', 'собственная привязка'), L('taken from the outer function', 'берётся из внешней функции')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Rest must be last', 'Rest обязан быть последним'),
          text: L(
            'Writing function f(...rest, last) is a SyntaxError, not a runtime error, so it never reaches production unnoticed. The parser rejects it because a rest parameter would have to swallow the arguments that follow it.',
            'Запись function f(...rest, last) — это SyntaxError, а не ошибка времени выполнения, поэтому она не доедет до продакшена незамеченной. Парсер отвергает её, потому что rest-параметру пришлось бы забрать аргументы, идущие после него.'
          ),
        },
        {
          tone: 'note',
          title: L('Do not reach for arguments.callee', 'Не используйте arguments.callee'),
          text: L(
            'arguments.callee gives you the calling function, and in strict mode it throws a TypeError. Code that needs it is almost always code that should have been a named function expression.',
            'arguments.callee даёт вызывающую функцию, а в строгом режиме выбрасывает TypeError. Код, которому он нужен, почти всегда должен был быть именованным функциональным выражением.'
          ),
        },
      ],
      takeaway: L(
        'Use a rest parameter for a real array and treat the arguments object as a legacy array-like you must convert.',
        'Берите rest-параметр, когда нужен настоящий массив, а arguments считайте устаревшим объектом, который надо преобразовывать.'
      ),
      seeAlso: [
        L('Section 4-2: defaults and destructuring in the parameter list', 'Секция 4-2: значения по умолчанию и деструктуризация в списке параметров'),
        L('Chapter 8: iterators, generators and for...of', 'Глава 8: итераторы, генераторы и for...of'),
      ],
    },
    {
      id: 'js-core-ch4-s4',
      title: L('this binding, call, apply and bind', 'this, call, apply и bind'),
      body: L(
        'this is neither a property of a function nor an argument to it. It is decided by the call site: the way the function is invoked determines what this refers to. A plain call fn() in strict mode gives this === undefined. A method call obj.method() gives this === obj. A constructor call new Fn() gives this to the fresh object the constructor created. The body of the function never learns which of these happened.\n\nThe most common breakage happens when a method is detached from its object. const { method } = obj; method() loses the receiver, and in strict mode this is undefined, so the method throws the moment it touches a property. Passing a method as a callback does exactly the same: arr.forEach(obj.method) calls it with no receiver at all. This is not a quirk of the language, it is the rule of the language.\n\nThree built-ins adjust the receiver explicitly. fn.call(thisArg, ...args) calls the function immediately with a given this. fn.apply(thisArg, argsArray) does the same with the arguments collected in an array. fn.bind(thisArg, ...presetArgs) returns a new function whose this is fixed, and it can pre-fill arguments, which is what you want for addEventListener and setTimeout.\n\nArrows solve the same problem from the other side: they have no receiver at all and read this from the enclosing scope. An arrow written inside a method therefore sees the method this, which is why arrows are the safe choice for callbacks, event handlers and anything else the host code will invoke with a receiver of its own choosing.',
        'this — это не свойство функции и не аргумент для неё. Его определяет место вызова: то, как функцию вызвали, решает, на что указывает this. Обычный вызов fn() в строгом режиме даёт this === undefined. Вызов метода obj.method() даёт this === obj. Вызов конструктора new Fn() отдаёт this свежесозданному объекту. Тело функции никогда не узнаёт, какой из этих случаев имел место.\n\nСамое частое полом происходит, когда метод отрывают от объекта. Запись const { method } = obj; method() теряет получателя, и в строгом режиме this равен undefined, поэтому метод падает, как только обращается к свойству. Передача метода в колбэк делает то же самое: arr.forEach(obj.method) вызывает его вообще без получателя. Это не особенность языка, это правило языка.\n\nТри встроенных метода правят получателя явно. fn.call(thisArg, ...args) вызывает функцию сразу с заданным this. fn.apply(thisArg, argsArray) делает то же, но аргументы берёт из массива. fn.bind(thisArg, ...presetArgs) возвращает новую функцию с зафиксированным this и позволяет заранее подставить аргументы — именно это нужно для addEventListener и setTimeout.\n\nСтрелки решают ту же задачу с другой стороны: получателя у них нет вовсе, this они читают из внешней области. Поэтому стрелка, написанная внутри метода, видит this этого метода, и потому стрелки — безопасный выбор для колбэков, обработчиков событий и всего, что хостовый код вызывает с получателем на свой выбор.'
      ),
      bullets: [
        L('this is determined by the call site, not by where the function was defined.', 'this определяется местом вызова, а не тем, где функция объявлена.'),
        L('A plain call in strict mode gives this === undefined.', 'Обычный вызов в строгом режиме даёт this === undefined.'),
        L('obj.method() gives this === obj, and detaching the method loses the receiver.', 'obj.method() даёт this === obj, а отрыв метода теряет получателя.'),
        L('call invokes immediately with a this, apply does the same with an argument array.', 'call вызывает сразу с заданным this, apply делает то же с массивом аргументов.'),
        L('bind returns a new function with a fixed this and can pre-fill arguments.', 'bind возвращает новую функцию с зафиксированным this и может подставить аргументы.'),
        L('An arrow has no receiver and reads this from the enclosing scope.', 'У стрелки нет получателя, this она читает из внешней области.'),
      ],
      code: `const user = {
  name: 'Ada',
  greet() { return 'Hi ' + this.name; },
};
console.log(user.greet());                  // 'Hi Ada'

const detached = user.greet;
detached();                                // TypeError: this is undefined

console.log(user.greet.call({ name: 'Grace' }));  // 'Hi Grace'
console.log(user.greet.apply({ name: 'Grace' })); // 'Hi Grace'

const bound = user.greet.bind({ name: 'Alan' });
console.log(bound()); // 'Hi Alan'

// An arrow captures this from the enclosing scope
const counter = {
  count: 0,
  tick() { const step = () => { this.count += 1; }; step(); return this.count; },
};
console.log(counter.tick()); // 1`,
      table: {
        caption: L('What this refers to for each call form', 'На что указывает this при разных формах вызова'),
        headers: [L('Call', 'Вызов'), L('this is', 'this — это')],
        rows: [
          [L('fn()', 'fn()'), L('undefined in strict mode', 'undefined в строгом режиме')],
          [L('obj.fn()', 'obj.fn()'), L('obj', 'obj')],
          [L('fn.call(x)', 'fn.call(x)'), L('x', 'x')],
          [L('fn.apply(x)', 'fn.apply(x)'), L('x', 'x')],
          [L('fn.bind(x)()', 'fn.bind(x)()'), L('x', 'x')],
          [L('new Fn()', 'new Fn()'), L('the newly created object', 'новый созданный объект')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A method passed as a callback loses its receiver', 'Метод, переданный в колбэк, теряет получателя'),
          text: L(
            'items.map(item.total) calls the method without the item as its receiver, so this is undefined and the call throws. Write items.map((item) => item.total()) or items.map(item.total.bind(item)).',
            'items.map(item.total) вызывает метод без получателя, поэтому this равен undefined и вызов падает. Пишите items.map((item) => item.total()) или items.map(item.total.bind(item)).'
          ),
        },
        {
          tone: 'tip',
          title: L('Arrows are the default for callbacks', 'Стрелки — выбор по умолчанию для колбэков'),
          text: L(
            'Event handlers, timers and promise callbacks are all invoked with a receiver the host chooses, often the DOM node or the timer. An arrow ignores that receiver and keeps the this of the surrounding scope, which is almost always what you meant.',
            'Обработчики событий, таймеры и колбэки промисов вызываются с получателем, который выбирает хост, часто это DOM-узел или таймер. Стрелка игнорирует получателя и сохраняет this окружающей области, а это почти всегда то, что имелось в виду.'
          ),
        },
      ],
      takeaway: L(
        'this comes from the call site, so bind it explicitly or use an arrow when the receiver must not depend on the caller.',
        'this приходит из места вызова, поэтому либо привязывайте его явно, либо используйте стрелку, когда получатель не должен зависеть от вызывающего кода.'
      ),
      seeAlso: [
        L('Section 4-1: why arrows have no this of their own', 'Секция 4-1: почему у стрелок нет своего this'),
        L('Section 4-5: closures keep the enclosing scope alive', 'Секция 4-5: замыкания сохраняют внешнюю область живой'),
        L('Chapter 6: class methods and the receiver problem', 'Глава 6: методы классов и проблема получателя'),
      ],
    },
    {
      id: 'js-core-ch4-s5',
      title: L('Closures and the classic loop bug', 'Замыкания и классический баг с циклом'),
      body: L(
        'A closure is a function together with the environment it was created in. When a function is defined, it captures the variables of the scope around it and keeps that scope alive for as long as the function itself is reachable. The captured variables are not copies: reading a captured variable always sees its current value, which is why a closure can maintain state that no outside code can reach.\n\nThe classic example is a counter. A factory function creates a local variable and returns accessors for it. Each call produces an independent counter, and nothing outside the factory can reach the variable, because it is not a property of any object. This is the cheapest form of private state in the language, and it needs no class, no symbol and no naming convention.\n\nClosures also explain the classic loop bug. With var, a loop variable is a single binding shared by every iteration, so all the callbacks created inside the loop see the same final value. With let, each iteration gets its own binding, so every closure captures the value that was current when it was created. The fix is a one-word change, and it is the reason let exists for loops in the first place.\n\nClosures keep memory alive as well. A handler registered on a long-lived element and never removed keeps its captured scope reachable, so the whole captured object graph stays in memory. Removing the listener, or holding state in a WeakMap keyed by a DOM node, breaks the chain. Memory leaks in front-end code are almost always a closure that outlives its owner.',
        'Замыкание — это функция вместе со средой, в которой она была создана. Когда функцию определяют, она захватывает переменные окружающей области и удерживает эту область живой до тех пор, пока сама функция остаётся достижимой. Захваченные переменные не копируются: чтение захваченной переменной всегда видит её текущее значение, и именно поэтому замыкание умеет хранить состояние, недоступное внешнему коду.\n\nКлассический пример — счётчик. Фабричная функция создаёт локальную переменную и возвращает способы её читать и менять. Каждый вызов даёт независимый счётчик, и снаружи до переменной не добраться, потому что она не является свойством ни одного объекта. Это самая дешёвая форма приватного состояния в языке, и ей не нужны ни класс, ни символ, ни соглашение об именах.\n\nЗамыкания объясняют и классический баг с циклом. С var переменная цикла — это одна привязка, общая для всех итераций, поэтому все колбэки, созданные внутри цикла, видят одно и то же конечное значение. С let каждая итерация получает свою привязку, и каждое замыкание захватывает то значение, которое было актуальным в момент его создания. Исправление — замена одного слова, и именно ради этого let и существует в циклах.\n\nЗамыкания удерживают и память. Обработчик, зарегистрированный на долгоживущем элементе и никогда не снятый, сохраняет захваченную область достижимой, поэтому весь захваченный граф объектов остаётся в памяти. Снятие обработчика или хранение состояния в WeakMap, ключом которого служит DOM-узел, разрывают цепочку. Утечки памяти во фронтенде почти всегда означают замыкание, пережившее своего владельца.'
      ),
      bullets: [
        L('A closure is a function plus the lexical environment it was created in.', 'Замыкание — это функция вместе с лексическим окружением, в котором она создана.'),
        L('Captured variables are read live, not copied at creation time.', 'Захваченные переменные читаются вживую, а не копируются при создании.'),
        L('Each call of a factory function produces an independent private state.', 'Каждый вызов фабричной функции даёт независимое приватное состояние.'),
        L('With var every closure in a loop shares one binding, let creates one binding per iteration.', 'С var все замыкания в цикле делят одну привязку, с let у каждой итерации своя.'),
        L('A listener that is never removed keeps its captured scope in memory.', 'Обработчик, который не сняли, удерживает захваченную область в памяти.'),
      ],
      code: `function createCounter() {
  let count = 0;                    // private, unreachable from outside
  return {
    increment: () => ++count,
    get value() { return count; },
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.value); // 2
console.log(counter.count); // undefined, the variable is not exposed

// The classic loop bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var', i)); // 3 3 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let', j)); // 0 1 2
}`,
      table: {
        caption: L('Loop variable declarations compared', 'Сравнение объявлений переменной цикла'),
        headers: [
          L('Declaration', 'Объявление'),
          L('Bindings', 'Привязки'),
          L('Closures see', 'Замыкания видят'),
        ],
        rows: [
          [L('var', 'var'), L('one for the whole loop', 'одна на весь цикл'), L('the final value', 'итоговое значение')],
          [L('let', 'let'), L('one per iteration', 'одна на итерацию'), L('the value of that iteration', 'значение своей итерации')],
          [L('const', 'const'), L('one per iteration, not reassignable', 'одна на итерацию, без переприсваивания'), L('the value of that iteration', 'значение своей итерации')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A closure that never lets go', 'Замыкание, которое не отпускает'),
          text: L(
            'addEventListener keeps a reference to the handler, and the handler keeps a reference to its scope. Register a listener on a long-lived node and never remove it and the captured data stays alive for the whole life of the page. Return a cleanup function and call it when the component unmounts.',
            'addEventListener удерживает ссылку на обработчик, а обработчик удерживает ссылку на свою область. Зарегистрируйте слушатель на долгоживущем узле и не снимите его — захваченные данные останутся живыми на всё время жизни страницы. Возвращайте функцию очистки и вызывайте её при размонтировании компонента.'
          ),
        },
        {
          tone: 'tip',
          title: L('Closures are private state for free', 'Замыкания дают приватное состояние бесплатно'),
          text: L(
            'When a piece of state must not be touched from outside, put it in a factory function and return only the operations that are allowed. No class, no underscore convention, no accidental export.',
            'Если состояние не должно изменяться снаружи, положите его в фабричную функцию и верните только разрешённые операции. Ни класса, ни соглашения с подчёркиванием, ни случайного экспорта.'
          ),
        },
      ],
      takeaway: L(
        'A closure keeps the variables of the scope it was born in, which is both how you get private state and how loops and listeners leak.',
        'Замыкание сохраняет переменные области, в которой родилось, и это одновременно источник приватного состояния и причина утечек в циклах и обработчиках.'
      ),
      seeAlso: [
        L('Section 3-2: lexical scope and shadowing', 'Секция 3-2: лексическая область и затенение'),
        L('Section 4-4: this and the receiver', 'Секция 4-4: this и получатель'),
        L('Chapter 12: debugging memory leaks and reading a heap snapshot', 'Глава 12: отладка утечек памяти и чтение снимка кучи'),
      ],
    },
    {
      id: 'js-core-ch4-s6',
      title: L('Higher-order functions and pure functions', 'Функции высшего порядка и чистые функции'),
      body: L(
        'A higher-order function is a function that takes a function as an argument, or returns one, or both. Array.prototype.map, filter and reduce are higher-order functions: they receive a callback and apply it to the elements. Composition helpers such as pipe are higher-order too, and so is any factory that hands back a configured function. Working with higher-order functions is what turns arrays and strings into a functional core of the language.\n\nA pure function depends only on its arguments and returns the same result for the same input, with no side effects. It does not write to outer variables, does not mutate its arguments, does not touch the network or the DOM and does not read the clock. Pure functions are trivially testable: you call them, compare the result with an expected value, and there is nothing to set up and nothing to clean up.\n\nPurity is what makes memoization safe. If a function is pure, you can cache its result per input and get the same value back every time, and the cache can never go stale. A function with side effects cannot be cached, because the second call may legitimately produce a different result. The same property is what lets a framework skip re-rendering a component whose props did not change.\n\nPurity includes the arguments. Mutating a parameter inside a function changes the data of the caller, because objects are passed by reference. function sortNames(list) { list.sort(); } changes the array the caller owns, and the same function is now different depending on the order the calls arrive in. Return a new value instead: return [...list].sort().',
        'Функция высшего порядка — это функция, которая принимает функцию аргументом, возвращает её или делает и то и другое. Array.prototype.map, filter и reduce — функции высшего порядка: они получают колбэк и применяют его к элементам. Функции композиции вроде pipe тоже относятся к ним, как и любая фабрика, возвращающая настроенную функцию. Именно работа с функциями высшего порядка превращает массивы и строки в функциональное ядро языка.\n\nЧистая функция зависит только от своих аргументов и возвращает один и тот же результат для одного и того же входа, не имея побочных эффектов. Она не пишет во внешние переменные, не мутирует свои аргументы, не ходит в сеть и не трогает DOM, не читает часы. Чистые функции тривиально тестируются: вы вызываете функцию, сравниваете результат с ожидаемым, и не надо ни готовить окружение, ни убирать за собой.\n\nЧистота — это то, что делает безопасной мемоизацию. Если функция чистая, её результат можно кэшировать по входным данным и получать то же самое каждый раз, и кэш никогда не устареет. Функцию с побочными эффектами кэшировать нельзя, потому что второй вызов вправе дать другой результат. Именно это же свойство позволяет фреймворку не перерисовывать компонент, чьи пропсы не изменились.\n\nЧистота включает и аргументы. Мутация параметра внутри функции меняет данные вызывающего кода, потому что объекты передаются по ссылке. function sortNames(list) { list.sort(); } меняет массив, которым владеет вызывающий, и одна и та же функция становится разной в зависимости от порядка вызовов. Возвращайте новое значение: return [...list].sort().'
      ),
      bullets: [
        L('A higher-order function takes a function, returns one, or both.', 'Функция высшего порядка принимает функцию, возвращает её или делает и то и другое.'),
        L('map, filter and reduce are higher-order functions over arrays.', 'map, filter и reduce — функции высшего порядка над массивами.'),
        L('A pure function returns the same result for the same arguments and has no side effects.', 'Чистая функция возвращает один и тот же результат для одних и тех же аргументов и не имеет побочных эффектов.'),
        L('Purity makes a function safe to memoize and safe to cache by input.', 'Чистота делает функцию безопасной для мемоизации и кэширования по входу.'),
        L('Mutating a parameter changes the object of the caller, so return a new value instead.', 'Мутация параметра меняет объект вызывающего, поэтому возвращайте новое значение.'),
      ],
      code: `const double = (n) => n * 2;
const isEven = (n) => n % 2 === 0;

const numbers = [1, 2, 3, 4];
console.log(numbers.map(double));               // [2, 4, 6, 8]
console.log(numbers.filter(isEven));            // [2, 4]
console.log(numbers.reduce((sum, n) => sum + n, 0)); // 10

// Pure: same input, same output, nothing touched
const sum = (list) => list.reduce((acc, n) => acc + n, 0);
console.log(sum(numbers)); // 10

// Impure: mutates the array the caller owns
function sortInPlace(list) { list.sort(); }
const names = ['Bob', 'Ada'];
sortInPlace(names);
console.log(names); // [ 'Ada', 'Bob' ], the caller's array changed`,
      table: {
        caption: L('Pure and impure functions side by side', 'Чистые и нечистые функции рядом'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Pure', 'Чистая'),
          L('Impure', 'Нечистая'),
        ],
        rows: [
          [L('Same input', 'Одинаковый вход'), L('same output', 'одинаковый выход'), L('may differ', 'может отличаться')],
          [L('Arguments', 'Аргументы'), L('not mutated', 'не мутируются'), L('may be mutated', 'могут мутироваться')],
          [L('Outer state', 'Внешнее состояние'), L('not touched', 'не затрагивается'), L('read or written', 'читается или пишется')],
          [L('Testing', 'Тестирование'), L('trivial', 'тривиальное'), L('needs setup and cleanup', 'требует подготовки и очистки')],
          [L('Caching', 'Кэширование'), L('safe', 'безопасно'), L('not allowed', 'запрещено')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Separate the pure core from the impure shell', 'Отделяйте чистое ядро от нечистой обёртки'),
          text: L(
            'A whole file does not have to be pure. Keep the computation in a pure function and let a thin outer layer do the reading, the fetching and the writing. The pure part is then trivially testable and reusable in the browser, on the server and in a worker.',
            'Целому файлу не обязано быть чистым. Держите вычисление в чистой функции, а тонкой внешней обёртке оставьте чтение, загрузку и запись. Чистая часть тестируется тривиально и переиспользуется в браузере, на сервере и в воркере.'
          ),
        },
        {
          tone: 'warning',
          title: L('Mutating an argument is the most common impurity', 'Мутация аргумента — самая частая нечистота'),
          text: L(
            'Because objects arrive by reference, sorting or pushing inside a function changes the data of the caller without any visible assignment. If the function must not touch the input, copy it first with the spread operator or with slice.',
            'Поскольку объекты приходят по ссылке, сортировка или push внутри функции меняют данные вызывающего без единого видимого присваивания. Если функция не должна трогать вход, сначала скопируйте его через spread или slice.'
          ),
        },
      ],
      takeaway: L(
        'Keep the core pure, pass functions instead of values, and return new data instead of mutating arguments.',
        'Держите ядро чистым, передавайте функции вместо значений и возвращайте новые данные вместо мутации аргументов.'
      ),
      seeAlso: [
        L('Section 7-2: map, filter and reduce in depth', 'Секция 7-2: map, filter и reduce подробно'),
        L('Section 4-5: closures as private state', 'Секция 4-5: замыкания как приватное состояние'),
        L('Chapter 13: algorithms built from higher-order functions', 'Глава 13: алгоритмы, собранные из функций высшего порядка'),
      ],
    },
  ],
};
