import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh03: Chapter = {
  id: 'js-core-ch3',
  title: L('Variables, scope and hoisting', 'Переменные, область видимости и поднятие'),
  summary: L(
    'How var, let and const differ in scope and assignability, why hoisting produces undefined and ReferenceError, how the scope chain resolves names, and how to name things so the next reader is not confused.',
    'Чем var, let и const отличаются по области видимости и по возможности переприсваивания, почему поднятие даёт undefined и ReferenceError, как цепочка областей разрешает имена и как называть переменные так, чтобы следующий читатель не запутался.'
  ),
  sections: [
    {
      id: 'js-core-ch3-s1',
      title: L('var, let and const', 'var, let и const'),
      body: L(
        'Three keywords declare a binding: var, let and const. They differ in two dimensions, the region of code where the name is visible and whether the binding can be pointed at a different value later. A var declaration is scoped to the nearest enclosing function, while let and const are scoped to the nearest enclosing block, which is any pair of braces. That difference is why let replaced var: a var declared inside an if block leaks out of it and lives until the end of the function.\n\nvar can be redeclared and reassigned freely, so the value it holds depends on the order in which the code runs. A const binding cannot be reassigned, and an attempt to do so throws a TypeError. A let binding cannot be redeclared in the same scope, but it can be reassigned as many times as needed. Use const by default and switch to let only when a value genuinely has to change.\n\nconst freezes the binding and not the value behind it. The binding settings cannot be replaced with another object, but settings.theme = "light" works, because the object itself is mutable. This distinction is what makes a const object safe to pass around: the reference stays stable, and only code that owns the object can change its contents.\n\nThe choice interacts with hoisting as well. A var binding exists from the top of its function, so using it earlier yields undefined. A let or const binding exists too, but until the declaration statement runs it sits in the temporal dead zone, and touching it throws a ReferenceError instead of quietly producing undefined.',
        'Объявление в языке делают три ключевых слова: var, let и const. Они различаются в двух измерениях: в области кода, где имя видно, и в том, можно ли перенаправить привязку на другое значение. Объявление var ограничено ближайшей объемлющей функцией, а let и const — ближайшим объемлющим блоком, то есть любой парой фигурных скобок. Именно поэтому let вытеснил var: var, объявленный внутри блока if, вытекает наружу и живёт до конца функции.\n\nvar можно свободно переобъявлять и переприсваивать, поэтому его значение зависит от порядка выполнения кода. Привязку const переприсваить нельзя, попытка выбросит TypeError. Привязку let нельзя переобъявить в той же области, но её можно переприсваивать сколько угодно раз. По умолчанию используйте const и переходите на let только там, где значение действительно должно меняться.\n\nconst фиксирует привязку, а не значение за ней. Привязку settings нельзя заменить другим объектом, но settings.theme = "light" работает, потому что сам объект изменяем. Именно это различие делает const-объект безопасным для передачи: ссылка остаётся стабильной, а менять содержимое может только код, который владеет объектом.\n\nВыбор ключевого слова связан и с поднятием. Привязка var существует с начала функции, поэтому обращение к ней раньше даёт undefined. Привязка let или const тоже существует, но до момента выполнения объявления находится во временной мёртвой зоне, и обращение к ней выбросит ReferenceError вместо тихого undefined.'
      ),
      bullets: [
        L('var is function scoped, let and const are block scoped.', 'var ограничен функцией, let и const — блоком.'),
        L('const bindings cannot be reassigned, but the value behind them can change.', 'Привязку const нельзя переприсваивать, но значение за ней менять можно.'),
        L('let bindings can be reassigned but not redeclared in the same scope.', 'Привязку let можно переприсваивать, но нельзя переобъявлять в той же области.'),
        L('Redeclaring var in the same scope is legal, redeclaring let is a SyntaxError.', 'Переобъявление var в той же области допустимо, переобъявление let — SyntaxError.'),
        L('const does not make the object it points to immutable.', 'const не делает непригодным для изменений объект, на который указывает.'),
        L('Default to const and use let only for values that really change.', 'По умолчанию используйте const, а let — только для действительно меняющихся значений.'),
      ],
      code: `function example() {
  if (true) {
    var leaked = 'function scope';
    let scoped = 'block scope';
  }
  console.log(leaked);  // 'function scope' - var escaped the block
  console.log(scoped);  // ReferenceError - let did not
}

const settings = { theme: 'dark' };
try {
  settings = { theme: 'light' }; // TypeError: Assignment to constant variable
} catch (error) {
  console.log(error.name);        // 'TypeError'
}
settings.theme = 'light';         // allowed, the object is mutable

let counter = 0;
counter += 1;   // 1
const MAX = 10;
// MAX = 20;    // TypeError`,
      table: {
        caption: L('The three declaration keywords', 'Три ключевых слова объявления'),
        headers: [L('Property', 'Свойство'), L('var', 'var'), L('let', 'let'), L('const', 'const')],
        rows: [
          [L('Scope', 'Область видимости'), L('function', 'функция'), L('block', 'блок'), L('block', 'блок')],
          [L('Redeclaration', 'Переобъявление'), L('allowed', 'разрешено'), L('SyntaxError', 'SyntaxError'), L('SyntaxError', 'SyntaxError')],
          [L('Reassignment', 'Переприсваивание'), L('allowed', 'разрешено'), L('allowed', 'разрешено'), L('TypeError', 'TypeError')],
          [L('Before the declaration', 'До объявления'), L('undefined', 'undefined'), L('ReferenceError (dead zone)', 'ReferenceError (мёртвая зона)'), L('ReferenceError (dead zone)', 'ReferenceError (мёртвая зона)')],
          [L('Use it for', 'Применять для'), L('legacy code', 'старого кода'), L('values that change', 'меняющихся значений'), L('everything else', 'всего остального')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('const by default, let when the linter complains', 'const по умолчанию, let — когда придрался линтер'),
          text: L(
            'Declare everything with const and let the linter point out the few places where a reassignment is really needed. The prefer-const rule does exactly that, and it also catches the classic bug of a variable that was never meant to change in the first place.',
            'Объявляйте всё через const и позвольте линтеру показать те редкие места, где переприсваивание действительно нужно. Правило prefer-const делает ровно это, а заодно ловит классический баг с переменной, которая вообще не должна была меняться.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('const does not mean immutable', 'const не значит неизменяемый'),
          text: L(
            'A const array can still be pushed into, and a const object can still be mutated. If you need a genuinely frozen value, use Object.freeze, and remember that the freeze is shallow: nested objects stay mutable.',
            'В const-массив всё ещё можно добавить элемент, а const-объект всё ещё можно изменить. Если нужно действительно замороженное значение, используйте Object.freeze и помните, что заморозка неглубокая: вложенные объекты остаются изменяемыми.'
          ),
        },
      ],
      takeaway: L(
        'Use const by default and let only for values that really change, and remember that const protects the binding rather than the object behind it.',
        'По умолчанию используйте const, а let — только для действительно меняющихся значений, и помните, что const защищает привязку, а не объект за ней.'
      ),
      seeAlso: [
        L('Chapter 1: objects are references, which is why a const object still mutates', 'Глава 1: объекты — это ссылки, поэтому const-объект всё равно меняется'),
        L('Section 3-2: hoisting and the temporal dead zone', 'Секция 3-2: поднятие и временная мёртвая зона'),
        L('Section 1-1: primitives, references and the typeof hole', 'Секция 1-1: примитивы, ссылки и дыра в typeof'),
      ],
    },
    {
      id: 'js-core-ch3-s2',
      title: L('Hoisting and the temporal dead zone', 'Поднятие и временная мёртвая зона'),
      body: L(
        'Before the code runs, the engine walks the body of a function and registers every declaration it finds. Function declarations are registered completely: the name exists and the function is fully callable from the first line of the enclosing scope. var declarations are registered too, but only as names holding undefined, because the assignment happens later, in the order the statements execute.\n\nlet and const are registered as well, and they stay in the temporal dead zone until the declaration statement executes. The dead zone is not a special error type but a state: the binding exists, it cannot be read, and reading it throws a ReferenceError. The surprising part is that typeof does not help either, because typeof on a name that was never declared returns a string, while typeof on a name in the dead zone throws.\n\nThat difference is the source of a family of bugs. A guard written as if (typeof config === "undefined") is safe for a name that was never declared, and it crashes for a let config declared later in the same scope. The rules are simple: declare before use, read configuration after the declarations, and treat a ReferenceError as a bug to fix rather than a condition to catch.\n\nHoisting also explains why function expressions behave differently from function declarations. A const fn = () => {} is a binding like any other and lives in the dead zone before its line, while a function fn() {} is fully available from the top of the scope. Mixing the two styles in one file means the same helper can be called at the top of the file and not at the bottom, depending only on how it was written.',
        'Прежде чем код начнёт выполняться, движок обходит тело функции и регистрирует каждое найденное объявление. Объявления функций регистрируются целиком: имя существует, и функция полностью доступна с первой строки объемлющей области. Объявления var тоже регистрируются, но лишь как имена со значением undefined, потому что присваивание происходит позже, в порядке выполнения операторов.\n\nlet и const регистрируются так же, но остаются во временной мёртвой зоне до тех пор, пока не выполнится оператор объявления. Мёртвая зона — это не отдельный тип ошибки, а состояние: привязка существует, её нельзя прочитать, и чтение выбрасывает ReferenceError. Самое неожиданное здесь — что typeof не помогает: typeof для необъявленного имени возвращает строку, а typeof для имени в мёртвой зоне выбрасывает ошибку.\n\nИменно это различие порождает целое семейство багов. Проверка вида if (typeof config === "undefined") безопасна для имени, которое никогда не объявляли, и падает для let config, объявленного позже в той же области. Правила простые: объявляйте перед использованием, читайте конфигурацию после объявлений и относитесь к ReferenceError как к багу, который надо исправить, а не как к условию, которое надо перехватить.\n\nПоднятие объясняет и разницу в поведении функциональных выражений и объявлений функций. Привязка const fn = () => {} — обычная привязка, и до своей строки она живёт в мёртвой зоне, тогда как function fn() {} доступна полностью с начала области. Смешивание двух стилей в одном файле означает, что один и тот же помощник можно вызвать в начале файла и нельзя в конце — в зависимости только от того, как он написан.'
      ),
      bullets: [
        L('Function declarations are hoisted whole and callable from the first line.', 'Объявления функций поднимаются целиком и доступны с первой строки.'),
        L('var names are hoisted as undefined.', 'Имена var поднимаются со значением undefined.'),
        L('let and const stay in the temporal dead zone until their declaration runs.', 'let и const остаются во временной мёртвой зоне до выполнения объявления.'),
        L('Reading a binding in the dead zone throws a ReferenceError.', 'Чтение привязки в мёртвой зоне выбрасывает ReferenceError.'),
        L('typeof on a dead zone name throws, even though typeof on an undeclared name does not.', 'typeof для имени в мёртвой зоне выбрасывает ошибку, хотя для необъявленного имени — нет.'),
        L('Declare before use, and treat a ReferenceError as a bug rather than a condition.', 'Объявляйте перед использованием и относитесь к ReferenceError как к багу, а не как к условию.'),
      ],
      code: `sayHi();               // works - the function declaration is hoisted
function sayHi() {
  console.log('hi');
}

console.log(later);         // undefined - var is hoisted with no value
var later = 1;

try {
  console.log(early);       // ReferenceError - the binding is in the dead zone
} catch (error) {
  console.log(error.name);  // 'ReferenceError'
}

try {
  console.log(typeof early); // also throws - typeof is not a safe probe
} catch (error) {
  console.log(error.name);  // 'ReferenceError'
}
let early = 3;
const arrow = () => 'value';
console.log(arrow());       // 'value' - called after the declaration`,
      table: {
        caption: L('What exists before the declaration runs', 'Что существует до выполнения объявления'),
        headers: [L('Declaration', 'Объявление'), L('Before the declaration', 'До объявления'), L('After it', 'После объявления')],
        rows: [
          [L('function f() {}', 'function f() {}'), L('fully callable', 'полностью вызываема'), L('callable', 'вызываема')],
          [L('var x = 1', 'var x = 1'), L('undefined', 'undefined'), L('1', '1')],
          [L('let x = 1', 'let x = 1'), L('ReferenceError (dead zone)', 'ReferenceError (мёртвая зона)'), L('1', '1')],
          [L('const x = 1', 'const x = 1'), L('ReferenceError (dead zone)', 'ReferenceError (мёртвая зона)'), L('1', '1')],
          [L('class X {}', 'class X {}'), L('ReferenceError (dead zone)', 'ReferenceError (мёртвая зона)'), L('defined', 'объявлен')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('typeof does not protect you in the dead zone', 'typeof не спасает в мёртвой зоне'),
          text: L(
            'typeof on a name that was never declared returns "undefined", so the classic guard if (typeof x === "undefined") looks perfectly safe. But if x is a let or const declared later in the same scope, typeof x throws a ReferenceError instead. Declare before use and the question never comes up.',
            'typeof для имени, которое никогда не объявляли, возвращает "undefined", поэтому классическая проверка if (typeof x === "undefined") кажется вполне безопасной. Но если x — это let или const, объявленный позже в той же области, typeof x выбросит ReferenceError. Объявляйте перед использованием — и вопрос не возникнет.'
          ),
        },
        {
          tone: 'tip',
          title: L('A ReferenceError is a bug, not a condition', 'ReferenceError — это баг, а не условие'),
          text: L(
            'Catching a ReferenceError to keep the program running hides a broken program and makes the real fix harder to find. If you genuinely need to test for an optional global, probe a name you know is not declared, or look the value up on globalThis explicitly.',
            'Перехват ReferenceError ради продолжения работы прячет сломанную программу и делает правильное исправление труднее найти. Если действительно нужно проверить опциональный глобал, обращайтесь к имени, которое точно не объявлено, или ищите значение явно в globalThis.'
          ),
        },
      ],
      takeaway: L(
        'Declare before use: a function declaration is hoisted whole, a var is hoisted as undefined, and let or const throw a ReferenceError until their own line runs.',
        'Объявляйте перед использованием: объявление функции поднимается целиком, var поднимается со значением undefined, а let и const выбрасывают ReferenceError до выполнения своей строки.'
      ),
      seeAlso: [
        L('Section 3-1: var, let and const', 'Секция 3-1: var, let и const'),
        L('Section 3-5: shadowing and the dead zone', 'Секция 3-5: затенение и временная мёртвая зона'),
        L('Chapter 4: function declarations and hoisting inside closures', 'Глава 4: объявления функций и поднятие внутри замыканий'),
      ],
    },
    {
      id: 'js-core-ch3-s3',
      title: L('Lexical scope and the scope chain', 'Лексическая область видимости и цепочка областей'),
      body: L(
        'JavaScript uses lexical scope: where a name is visible is decided by where the code is written and not by who calls the function. A function declared inside another function can see the variables of the outer function, and that outer environment is captured by reference and kept alive as long as the inner function exists. This is the mechanism behind every closure in the language.\n\nWhen the engine resolves a name, it walks the scope chain outwards from the innermost scope to the outermost one and stops at the first scope that has a binding with that name. The chain is built when the code is created, not when it runs, so a variable declared later in an outer scope is still visible to an inner function, subject to the temporal dead zone.\n\nOne important consequence is that this does not extend to this. The value of this is decided by how the function is called and not by where it was defined, and the scope chain plays no part in it. A method extracted from an object and called standalone loses its receiver, and no amount of nesting will restore it. Arrow functions behave differently: they have no this of their own and inherit it from the enclosing scope.\n\nBlocks create scopes as well. A let declared inside a block is visible only inside it, which makes a block a natural place to keep temporary variables. An IIFE, the classic pattern of a function expression invoked immediately, wraps a piece of code in its own scope and keeps its internals out of the surrounding namespace. Modules replace that pattern with an explicit file scope and strict mode.',
        'В JavaScript используется лексическая область видимости: где имя видно, решает написанный код, а не вызывающая сторона. Функция, объявленная внутри другой функции, видит переменные внешней, и эта внешняя среда захватывается по ссылке и живёт, пока существует внутренняя функция. Именно на этом механизме держатся все замыкания языка.\n\nКогда движок разрешает имя, он проходит цепочку областей от самой внутренней к самой внешней и останавливается на первой области, где есть привязка с таким именем. Цепочка строится в момент создания кода, а не в момент его выполнения, поэтому переменная, объявленная позже во внешней области, всё равно видна внутренней функции — с оговоркой на временную мёртвую зону.\n\nОдно важное следствие: это правило не распространяется на this. Значение this определяется тем, как функцию вызвали, а не тем, где её объявили, и цепочка областей в нём не участвует. Метод, извлечённый из объекта и вызванный отдельно, теряет получателя, и никакая вложенность это не вернёт. Стрелочные функции ведут себя иначе: у них нет собственного this, они наследуют его от объемлющей области.\n\nБлоки тоже создают области. let, объявленный внутри блока, виден только внутри него, и потому блок — естественное место для временных переменных. IIFE, классический приём с немедленно вызываемым функциональным выражением, оборачивает кусок кода в свою область и не выпускает внутренности в окружающее пространство имён. Модули заменяют этот приём явной файловой областью и строгим режимом.'
      ),
      bullets: [
        L('Scope is decided by where the code is written, not by how it is called.', 'Область видимости определяется тем, где написан код, а не тем, как он вызван.'),
        L('Name resolution walks the scope chain outwards and the first match wins.', 'Разрешение имени идёт по цепочке наружу, и побеждает первое совпадение.'),
        L('The scope chain is built when the code is created, not when it runs.', 'Цепочка областей строится при создании кода, а не при его выполнении.'),
        L('this is not part of the scope chain, it comes from the call site.', 'this не входит в цепочку областей, он приходит из места вызова.'),
        L('Arrow functions have no own this and inherit it from the enclosing scope.', 'У стрелочных функций нет собственного this, они наследуют его от объемлющей области.'),
        L('Blocks, IIFEs and modules each create their own scope.', 'Блоки, IIFE и модули каждый создают свою область видимости.'),
      ],
      code: `function outer() {
  const secret = 'hidden';
  function inner() {
    console.log(secret);   // found in the outer scope
  }
  inner();
}
outer();

function makeCounter() {
  let count = 0;
  return () => ++count;    // the closure keeps count alive
}
const counter = makeCounter();
counter();  // 1
counter();  // 2

const user = { name: 'Ada', greet() { return this.name; } };
const greet = user.greet;
greet();   // undefined in strict mode - this comes from the call site`,
      table: {
        caption: L('Where a name is looked up', 'Где ищется имя'),
        headers: [L('Scope', 'Область'), L('Holds', 'Содержит'), L('Example', 'Пример')],
        rows: [
          [L('Global scope', 'Глобальная область'), L('top level declarations', 'объявления верхнего уровня'), L('globalThis', 'globalThis')],
          [L('Module scope', 'Область модуля'), L('top level of an ES module', 'верхний уровень ES-модуля'), L('imported and local bindings', 'импортированные и локальные привязки')],
          [L('Function scope', 'Область функции'), L('var, function declarations, parameters', 'var, объявления функций, параметры'), L('function f() { var x = 1 }', 'function f() { var x = 1 }')],
          [L('Block scope', 'Область блока'), L('let, const, class, function declarations', 'let, const, class, объявления функций'), L('{ let y = 2 }', '{ let y = 2 }')],
          [L('Closure scope', 'Область замыкания'), L('variables captured by an inner function', 'переменные, захваченные внутренней функцией'), L('a returned arrow function', 'возвращённая стрелочная функция')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('this is not part of the scope chain', 'this не входит в цепочку областей'),
          text: L(
            'An inner function does not inherit the this of the function it is defined in. If you need the outer this, capture it explicitly with const self = this, or use an arrow function, whose this comes from the enclosing scope. Nesting deeper does not help.',
            'Внутренняя функция не наследует this функции, в которой определена. Если нужен внешний this, захватите его явно через const self = this или используйте стрелочную функцию, у которой this берётся из объемлющей области. Более глубокая вложенность не помогает.'
          ),
        },
        {
          tone: 'tip',
          title: L('Blocks are free scopes', 'Блоки — это бесплатная область видимости'),
          text: L(
            'When a helper variable is needed for one branch only, declare it with const inside a block instead of adding a function scoped name. The variable then cannot leak into the rest of the function, and a reader can see its lifetime at a glance.',
            'Когда вспомогательная переменная нужна только одной ветке, объявите её через const внутри блока, вместо того чтобы добавлять имя в область функции. Переменная тогда не может утечь в остальную часть функции, а её время жизни видно сразу.'
          ),
        },
      ],
      takeaway: L(
        'Scope is lexical: names resolve through the chain of enclosing scopes, while this is decided by the call site rather than by that chain.',
        'Область видимости лексическая: имена разрешаются по цепочке объемлющих областей, а this определяется местом вызова, а не цепочкой.'
      ),
      seeAlso: [
        L('Chapter 4: functions, arguments and closures', 'Глава 4: функции, аргументы и замыкания'),
        L('Section 3-4: the global object and module scope', 'Секция 3-4: глобальный объект и область модуля'),
        L('Chapter 6: classes, encapsulation and immutability', 'Глава 6: классы, инкапсуляция и иммутабельность'),
      ],
    },
    {
      id: 'js-core-ch3-s4',
      title: L('The global object and module scope', 'Глобальный объект и область модуля'),
      body: L(
        'The global object is the environment that exists before any code runs. In a browser it is window, in Node.js it is global, and globalThis points to the right one in every environment. Everything declared at the top level of a classic script with var becomes a property of that object, which means window.count and count are the same binding, and a stray assignment without a declaration creates a global by accident.\n\nlet and const at the top level of a script do not become properties of the global object. They live in a separate declarative environment that sits in front of it, so the names are visible to the script but absent from the global object. The distinction matters when code checks for the presence of a global by inspecting globalThis, and it matters for telling a global that exists apart from one that was merely created by a typo.\n\nAn ES module has its own scope. Top level declarations in a module never touch the global object, and the module body runs in strict mode. The module scope also means a file can have a local variable named export without breaking anything. A classic script has no such isolation, which is the main reason modules replaced scripts in modern codebases.\n\nStrict mode is the default in modules and in class bodies. It changes several things at once: an assignment to an undeclared variable throws a ReferenceError instead of creating a global, this inside a plain function call is undefined instead of the global object, and duplicate parameters and octal literals are rejected. Many of the sloppy behaviours people remember from old code are exactly the ones strict mode removes.',
        'Глобальный объект — это среда, которая существует до запуска любого кода. В браузере это window, в Node.js — global, а globalThis указывает на нужный объект в любой среде. Всё, что объявлено на верхнем уровне классического скрипта через var, становится свойством этого объекта, а значит window.count и count — одна и та же привязка, и случайное присваивание без объявления создаёт глобальную перемену.\n\nlet и const на верхнем уровне скрипта свойствами глобального объекта не становятся. Они живут в отдельном декларативном окружении, стоящем перед ним, поэтому имена видны скрипту, но отсутствуют в глобальном объекте. Это различие важно, когда код проверяет наличие глобальной переменной через globalThis, и оно помогает отличить глобальную переменную, которая существует, от той, что появилась из-за опечатки.\n\nУ ES-модуля своя область видимость. Объявления верхнего уровня в модуле никогда не затрагивают глобальный объект, а тело модуля выполняется в строгом режиме. Область модуля также означает, что в файле может быть локальная переменная с именем export и ничего не сломается. У классического скрипта такой изоляции нет, и это главная причина, по которой модули вытеснили скрипты в современном коде.\n\nСтрогий режим включён по умолчанию в модулях и в телах классов. Он меняет сразу несколько вещей: присваивание необъявленной переменной выбрасывает ReferenceError вместо создания глобальной, this внутри обычного вызова функции равен undefined вместо глобального объекта, а дублирующиеся параметры и восьмеричные литералы отвергаются. Многие небрежные особенности, которые помнят по старому коду, — это ровно то, что строгий режим убирает.'
      ),
      bullets: [
        L('globalThis is the portable name: window in browsers, global in Node.', 'globalThis — переносимое имя: window в браузере, global в Node.'),
        L('A top level var in a script becomes a property of the global object.', 'var на верхнем уровне скрипта становится свойством глобального объекта.'),
        L('A top level let or const does not become a property of the global object.', 'let или const на верхнем уровне не становятся свойством глобального объекта.'),
        L('Modules have their own scope and never touch the global object.', 'У модулей своя область, они никогда не трогают глобальный объект.'),
        L('Modules and class bodies run in strict mode by default.', 'Модули и тела классов по умолчанию работают в строгом режиме.'),
        L('In strict mode an assignment to an undeclared name throws a ReferenceError.', 'В строгом режиме присваивание необъявленному имени выбрасывает ReferenceError.'),
      ],
      code: `// In a browser script
var legacy = 1;
let modern = 2;
const fixed = 3;

globalThis.legacy;   // 1 - var became a property
globalThis.modern;   // undefined - let did not
legacy === globalThis.legacy; // true

function sloppy() {
  return this;   // globalThis in sloppy mode
}
function strict() {
  'use strict';
  return this;   // undefined
}

const hidden = (() => {
  const privateValue = 'secret';
  return privateValue;
})();
hidden;  // 'secret' - the IIFE scope is gone`,
      table: {
        caption: L('Classic script versus ES module', 'Классический скрипт против ES-модуля'),
        headers: [L('Property', 'Свойство'), L('Classic script', 'Классический скрипт'), L('ES module', 'ES-модуль')],
        rows: [
          [L('Top level var', 'var верхнего уровня'), L('becomes a global property', 'становится глобальным свойством'), L('module scoped', 'в области модуля')],
          [L('Top level let / const', 'let / const верхнего уровня'), L('global binding, not a property', 'глобальная привязка, не свойство'), L('module scoped', 'в области модуля')],
          [L('Strict mode', 'Строгий режим'), L('optional', 'необязателен'), L('always on', 'всегда включён')],
          [L('Imports and exports', 'Импорты и экспорты'), L('not available', 'недоступны'), L('available', 'доступны')],
          [L('this at the top level', 'this на верхнем уровне'), L('the global object', 'глобальный объект'), L('undefined', 'undefined')],
          [L('Execution order', 'Порядок выполнения'), L('runs immediately', 'выполняется сразу'), L('runs after parsing, dependencies first', 'выполняется после разбора, сначала зависимости')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The accidental global', 'Случайная глобальная переменная'),
          text: L(
            'In sloppy mode, writing x = 5 without a declaration creates a property on the global object, and the mistake stays invisible until two scripts fight over the same name. Declare every variable. Modules and class bodies turn the mistake into a loud error instead of hiding it.',
            'В нестрогом режиме запись x = 5 без объявления создаёт свойство глобального объекта, и ошибка остаётся незаметной, пока два скрипта не начнут драться за одно имя. Объявляйте каждую переменную. Модули и тела классов превращают ошибку в громкий сбой, а не прячут её.'
          ),
        },
        {
          tone: 'tip',
          title: L('Use globalThis, not window', 'Используйте globalThis, а не window'),
          text: L(
            'Use globalThis whenever you need to reach the global object from code that might run in a browser, in Node or in a worker. window is browser only, and touching it in Node throws a ReferenceError.',
            'Используйте globalThis, когда нужно обратиться к глобальному объекту из кода, который может выполняться в браузере, в Node или в воркере. window существует только в браузере, и обращение к нему в Node выбросит ReferenceError.'
          ),
        },
      ],
      takeaway: L(
        'Reach the global object through globalThis, remember that a top level var becomes a property while let and const do not, and prefer modules, which keep everything private and strict.',
        'Обращайтесь к глобальному объекту через globalThis, помните, что var на верхнем уровне становится свойством, а let и const — нет, и отдавайте предпочтение модулям: они всё держат приватным и строгим.'
      ),
      seeAlso: [
        L('Section 3-3: the scope chain and module boundaries', 'Секция 3-3: цепочка областей и границы модулей'),
        L('Chapter 5: objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
      ],
    },
    {
      id: 'js-core-ch3-s5',
      title: L('Shadowing and naming things well', 'Затенение и правила именования'),
      body: L(
        'Shadowing happens when a name declared in an inner scope is the same as a name in an outer scope. The inner declaration wins inside its scope and the outer one is invisible there, but the outer variable keeps its value and stays usable outside. In a long function this is easy to miss: a parameter named user and a block level const user refer to two different objects, and the code reads as if it referred to one.\n\nShadowing a let or const from an outer scope is not an error in itself, but it is a warning sign, and it turns into a real error in one specific case. If the outer name is declared later in the same scope, an inner reference hits the temporal dead zone and throws a ReferenceError. The shadowing declaration is fine; the use of the shadowed name before its own declaration is not.\n\nCommon conventions keep code readable across a team. camelCase for variables and functions, PascalCase for classes and constructors, UPPER_SNAKE_CASE for module level constants that are treated as fixed configuration, and a short prefix such as $ or _ for a value that comes from the outside world and should not be touched. The prefixes are conventions and not language features: nothing stops you from writing $data, but everyone will read it as external data.\n\nShadowing is not always wrong. A short callback parameter that shadows an outer name is harmless when the outer name is not used nearby, and a deliberate rebinding of the same concept in a nested scope can clarify a function. The rule of thumb is that shadowing should be obvious on sight: if a reader has to check which variable a name refers to, rename one of them.',
        'Затенение возникает, когда имя, объявленное во внутренней области, совпадает с именем во внешней. Внутри своей области выигрывает внутреннее объявление, и внешнее имя там не видно, но сама внешняя переменная сохраняет значение и остаётся доступной снаружи. В длинной функции это легко пропустить: параметр user и блочная const user ссылаются на два разных объекта, а код читается так, будто речь об одном.\n\nСамо по себе затенение let или const из внешней области ошибкой не является, но служит предупреждающим знаком и превращается в настоящую ошибку в одном конкретном случае. Если внешнее имя объявлено позже в той же области, обращение к нему изнутри попадает во временную мёртвую зону и выбрасывает ReferenceError. Объявление, затеняющее имя, здесь ни при чём: виновато обращение к затенённому имени до его собственного объявления.\n\nОбщие соглашения помогают читать код всей команде. camelCase для переменных и функций, PascalCase для классов и конструкторов, UPPER_SNAKE_CASE для констант уровня модуля, которые считаются фиксированной конфигурацией, и короткий префикс вроде $ или _ для значения, пришедшего извне и не предназначенного для изменения. Префиксы — это соглашение, а не возможности языка: ничто не мешает написать $data, но все прочитают это как внешние данные.\n\nЗатенение не всегда ошибка. Короткий параметр колбэка, затеняющий внешнее имя, безобиден, когда внешнее имя рядом не используется, а намеренное пересвязывание того же понятия во вложенной области способно прояснить функцию. Правило большого пальца: затенение должно быть очевидно с первого взгляда, и если читателю приходится проверять, к какой переменной относится имя, переименуйте одну из них.'
      ),
      bullets: [
        L('An inner declaration of the same name hides the outer binding inside its scope.', 'Внутреннее объявление с тем же именем скрывает внешнюю привязку внутри своей области.'),
        L('The outer variable keeps its value and stays usable outside the inner scope.', 'Внешняя переменная сохраняет значение и остаётся доступной за пределами внутренней области.'),
        L('Shadowing a later let or const throws a ReferenceError from the dead zone.', 'Затенение позже объявленного let или const выбрасывает ReferenceError из мёртвой зоны.'),
        L('camelCase for variables, PascalCase for classes, UPPER_SNAKE_CASE for constants.', 'camelCase для переменных, PascalCase для классов, UPPER_SNAKE_CASE для констант.'),
        L('Prefixes like $ or _ mark values that come from outside.', 'Префиксы вроде $ или _ помечают значения, пришедшие извне.'),
        L('Rename instead of shadowing whenever a reader would have to check.', 'Переименовывайте вместо затенения, когда читателю пришлось бы проверять, к чему относится имя.'),
      ],
      code: `const user = 'outer';

function shadow() {
  const user = 'inner';
  console.log(user);   // 'inner'
}
shadow();
console.log(user);     // 'outer'

function deadZone() {
  console.log(user);  // ReferenceError - user is in the dead zone here
  const user = 'local';
}

const MAX_RETRIES = 3;             // a module level constant
const $config = JSON.parse('{"retries":3}'); // $ marks a raw outside value

function createUser(name) {
  const profile = { name };        // no shadowing of an outer name
  return profile;
}`,
      table: {
        caption: L('Naming conventions that scale to a team', 'Соглашения об именах, которые работают в команде'),
        headers: [L('Kind', 'Вид'), L('Convention', 'Соглашение'), L('Example', 'Пример')],
        rows: [
          [L('Variables, functions', 'Переменные, функции'), L('camelCase', 'camelCase'), L('const totalPrice = 0', 'const totalPrice = 0')],
          [L('Classes, constructors', 'Классы, конструкторы'), L('PascalCase', 'PascalCase'), L('class OrderService {}', 'class OrderService {}')],
          [L('Module level constants', 'Константы уровня модуля'), L('UPPER_SNAKE_CASE', 'UPPER_SNAKE_CASE'), L('const MAX_RETRIES = 3', 'const MAX_RETRIES = 3')],
          [L('External or raw values', 'Внешние или сырые значения'), L('$ or _ prefix', 'префикс $ или _'), L('const $root = ...', 'const $root = ...')],
          [L('Private fields', 'Приватные поля'), L('# prefix', 'префикс #'), L('class A { #id = 1 }', 'class A { #id = 1 }')],
          [L('Booleans', 'Логические значения'), L('is, has, can prefix', 'префикс is, has, can'), L('const isReady = true', 'const isReady = true')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The parameter that hides the field', 'Параметр, скрывающий поле'),
          text: L(
            'A function parameter named the same as a property of the object it works on reads as if it were the same thing. In a class method, name the parameter differently from the field, for example options, config or value, or destructure it, so a reader can tell the two apart.',
            'Параметр функции с тем же именем, что и свойство объекта, над которым она работает, читается как будто это одно и то же. В методе класса назовите параметр иначе, чем поле, например options, config или value, либо деструктурируйте аргумент, чтобы читатель различал их.'
          ),
        },
        {
          tone: 'tip',
          title: L('Rename before you add a comment', 'Переименуйте раньше, чем напишете комментарий'),
          text: L(
            'When a name is ambiguous, renaming it is faster than writing a comment that explains it. If the name cannot change because it comes from an API or from a colleague, make its origin obvious with a prefix such as rawUser, apiResponse or serverConfig.',
            'Когда имя неоднозначно, переименовать его быстрее, чем писать комментарий с объяснением. Если имя менять нельзя, потому что оно пришло из API или от коллеги, сделайте его происхождение очевидным через префикс вроде rawUser, apiResponse или serverConfig.'
          ),
        },
      ],
      takeaway: L(
        'Rename instead of shadowing whenever a reader would have to check which variable a name refers to, and follow one naming convention across the codebase.',
        'Переименовывайте вместо затенения, когда читателю пришлось бы проверять, к какой переменной относится имя, и придерживайтесь одного соглашения об именах во всей кодовой базе.'
      ),
      seeAlso: [
        L('Section 3-2: the temporal dead zone in the shadowing case', 'Секция 3-2: временная мёртвая зона в случае затенения'),
        L('Section 1-1: primitives, references and the typeof hole', 'Секция 1-1: примитивы, ссылки и дыра в typeof'),
        L('Chapter 6: classes, encapsulation and immutability', 'Глава 6: классы, инкапсуляция и иммутабельность'),
      ],
    },
  ],
};
