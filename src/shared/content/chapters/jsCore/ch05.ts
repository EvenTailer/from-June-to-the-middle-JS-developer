import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh05: Chapter = {
  id: 'js-core-ch5',
  title: L('Objects, descriptors and the prototype chain', 'Объекты, дескрипторы и цепочка прототипов'),
  summary: L(
    'How object properties really work: literal syntax and access, the four fields of a property descriptor, how a lookup walks the prototype chain, what Object.assign, freeze and seal actually guarantee, how symbols provide collision-free keys, and how the iterator protocol powers spread and for...of.',
    'Как на самом деле устроены свойства объектов: синтаксис литералов и доступ к свойствам, четыре поля дескриптора свойства, как поиск проходит по цепочке прототипов, что реально гарантируют Object.assign, freeze и seal, как символы дают ключи без коллизий и как протокол итератора питает spread и for...of.'
  ),
  sections: [
    {
      id: 'js-core-ch5-s1',
      title: L('Object literals and property access', 'Объектные литералы и доступ к свойствам'),
      body: L(
        'An object literal is the shortest way to create an object: a pair of braces holding key-value pairs. Keys are strings or Symbols, and a value can be anything, including functions. Literals are the preferred way to build a record, because they are written inline, they give the engine a stable shape to optimise, and they read like the data they describe.\n\nProperties are read with the dot operator when the key is a valid identifier and with square brackets otherwise. user.name and user["name"] are the same operation, but user["first-name"] and user[0] have no dot form at all. Square brackets also accept any expression, so user[key] reads a dynamic key, and computed keys in a literal use the same idea: { [role]: "admin" }.\n\nA method in a literal is a function value stored under a key. The shorthand greet() { return 1; } is exactly greet: function () { return 1; }, and the shorthand name is exactly name: name. The shorthand mostly saves characters. What matters more is that a method still receives this from its receiver, while an arrow function stored in the same object does not.\n\nThe delete operator removes an own property and returns a boolean. It does not touch inherited properties, and in strict mode it throws a TypeError when the property is non-configurable. It also behaves oddly on arrays: delete arr[0] leaves a hole instead of shortening the array, and delete arr.length is simply ignored. Assigning undefined does not remove anything, it only changes a value.',
        'Объектный литерал — самый короткий способ создать объект: пара фигурных скобок с парами ключ-значение. Ключи бывают строками или символами, а значением может быть что угодно, включая функции. Литералы — предпочтительный способ собрать запись, потому что они пишутся на месте, задают движку устойчивую форму для оптимизации и читаются как те данные, которые описывают.\n\nСвойства читаются точкой, когда ключ является корректным идентификатором, и квадратными скобками во всех остальных случаях. user.name и user["name"] — одна и та же операция, а вот у user["first-name"] и user[0] точечной формы нет вовсе. Квадратные скобки принимают и любое выражение, поэтому user[key] читает динамический ключ, а вычисляемые ключи в литерале используют ту же идею: { [role]: "admin" }.\n\nМетод в литерале — это функциональное значение, сохранённое под ключом. Сокращение greet() { return 1; } в точности равно greet: function () { return 1; }, а сокращение name в точности равно name: name. Сокращение в основном экономит символы. Важнее другое: метод всё ещё получает this от получателя, а стрелочная функция в том же объекте — нет.\n\nОператор delete удаля собственное свойство и возвращает логическое значение. Унаследованные свойства он не трогает, а в строгом режиме выбрасывает TypeError, если свойство не настраиваемое. С массивами он ведёт себя странно: delete arr[0] оставляет дыру вместо укорачивания массива, а delete arr.length просто игнорируется. Присваивание undefined ничего не удаляет, оно лишь меняет значение.'
      ),
      bullets: [
        L('An object literal creates an object with a fixed set of own properties.', 'Объектный литерал создаёт объект с фиксированным набором собственных свойств.'),
        L('Dot access needs a valid identifier key, bracket access takes any string or Symbol.', 'Точечный доступ требует корректный идентификатор, квадратные скобки принимают любую строку или символ.'),
        L('Computed keys use square brackets inside the literal: { [key]: value }.', 'Вычисляемые ключи записываются в квадратных скобках: { [key]: value }.'),
        L('A method shorthand is a function value and keeps the receiver as this.', 'Сокращение для метода — это функциональное значение, получателем остаётся объект.'),
        L('delete removes own keys, while assigning undefined only changes a value.', 'delete удаляет собственный ключ, а присваивание undefined лишь меняет значение.'),
      ],
      code: `const role = 'admin';
const user = {
  'first-name': 'Ada',
  name: 'Ada',
  greet() { return 'Hi ' + this.name; },
  [role]: true,
};
console.log(user.name);           // 'Ada'
console.log(user['first-name']);  // 'Ada'
console.log(user[role]);          // true
console.log(user.greet());        // 'Hi Ada'

const copy = { ...user };
delete copy.name;
console.log(copy.name);           // undefined
console.log('name' in copy);      // false

const arr = [1, 2, 3];
delete arr[0];
console.log(arr.length); // 3, a hole and not a shorter array`,
      table: {
        caption: L('Ways to reach a property', 'Способы добраться до свойства'),
        headers: [
          L('Access', 'Доступ'),
          L('Works when', 'Когда работает'),
          L('Result', 'Результат'),
        ],
        rows: [
          [L('obj.key', 'obj.key'), L('key is a valid identifier', 'ключ — корректный идентификатор'), L('the value', 'значение')],
          [L("obj['key']", "obj['key']"), L('key is any string or Symbol', 'ключ — любая строка или символ'), L('the value', 'значение')],
          [L('obj[key]', 'obj[key]'), L('key is a variable', 'ключ — переменная'), L('the value at that key', 'значение по этому ключу')],
          [L('obj?.[key]', 'obj?.[key]'), L('obj may be null or undefined', 'obj может быть null или undefined'), L('undefined instead of a throw', 'undefined вместо исключения')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('delete is not assignment', 'delete — это не присваивание'),
          text: L(
            'Writing obj.status = undefined keeps the key: it still shows up in Object.keys, still occupies a slot in a serialised record and still exists for code that tests with the in operator. Use delete obj.status to remove it, and remember that delete on an array index leaves a hole rather than shortening the array.',
            'Запись obj.status = undefined сохраняет ключ: он по-прежнему виден в Object.keys, по-прежнему занимает место в сериализованной записи и по-прежнему существует для кода, проверяющего оператором in. Удаляйте через delete obj.status и помните, что delete по индексу массива оставляет дыру, а не укорачивает массив.'
          ),
        },
        {
          tone: 'note',
          title: L('A method and an arrow stored side by side', 'Метод и стрелка рядом'),
          text: L(
            'In an object literal, greet() { ... } receives the object as this, while greet: () => { ... } receives the this of the scope where the literal was written. The two forms look similar and behave differently in every method.',
            'В объектном литерале greet() { ... } получает объект как this, а greet: () => { ... } получает this той области, где был записан литерал. Формы выглядят похоже, но ведут себя по-разному в каждом методе.'
          ),
        },
      ],
      takeaway: L(
        'Use bracket access for anything that is not a plain identifier, and remember that delete removes keys while assignment only changes values.',
        'Квадратные скобки нужны для всего, что не является простым идентификатором, и помните: delete удаляет ключи, а присваивание меняет только значение.'
      ),
      seeAlso: [
        L('Section 1-1: objects are references, not containers', 'Секция 1-1: объекты — это ссылки, а не контейнеры'),
        L('Section 5-3: the prototype chain and property lookup', 'Секция 5-3: цепочка прототипов и поиск свойства'),
        L('Chapter 6: class fields, methods and private state', 'Глава 6: поля класса, методы и приватное состояние'),
      ],
    },
    {
      id: 'js-core-ch5-s2',
      title: L('Property descriptors, accessors and enumerability', 'Дескрипторы свойств, аксессоры и перечисляемость'),
      body: L(
        'Every property in JavaScript is more than a value: it is a value plus a descriptor with four fields. writable says the value may be reassigned, enumerable says the key shows up in Object.keys and in for...in, configurable says the property may be redefined or deleted, and the fourth slot holds either the value itself or a pair of getter and setter functions. Object.defineProperty is the tool that writes a descriptor by hand.\n\nA descriptor is either a data descriptor, with value, writable, enumerable and configurable, or an accessor descriptor, with get, set, enumerable and configurable. Mixing value with get in the same descriptor throws a TypeError. Accessors are the interesting case: such a property has no stored value at all, every read runs the getter and every write runs the setter, and that is how a value computed on demand works.\n\nEnumeration has three different answers to the same question. Object.keys returns own enumerable string keys. for...in returns own and inherited enumerable keys, which is why it sees more than Object.keys on the very same object. Object.entries returns own enumerable keys together with their values as pairs. Symbol keys are excluded from all three unless you ask for them explicitly.\n\nconfigurable: false makes a property permanent. It cannot be deleted, its descriptor cannot be redefined, and in strict mode delete obj.prop throws a TypeError. writable: false is weaker: the value cannot be reassigned, but the property can still be deleted and it can still be changed through a setter, because a setter is a different mechanism. In strict mode an assignment to a non-writable property throws a TypeError instead of failing silently. Frozen objects are built from exactly these two flags.',
        'Каждое свойство в JavaScript — это больше, чем значение: это значение плюс дескриптор из четырёх полей. writable говорит, можно ли значение переприсвоить, enumerable — покажется ли ключ в Object.keys и в for...in, configurable — можно ли свойство переопределить или удалить, а четвёртое место хранит либо само значение, либо пару функций геттера и сеттера. Инструмент, который пишет дескриптор руками, — это Object.defineProperty.\n\nДескриптор бывает либо дескриптором данных, где есть value, writable, enumerable и configurable, либо дескриптором доступа, где есть get, set, enumerable и configurable. Смешивание value и get в одном дескрипторе выбрасывает TypeError. Интересен случай аксессоров: у такого свойства вообще нет хранимого значения, каждое чтение запускает геттер, каждая запись — сеттер, и именно так работает значение, вычисляемое по требованию.\n\nУ перечисления три разных ответа на один и тот же вопрос. Object.keys возвращает собственные перечисляемые строковые ключи. for...in возвращает собственные и унаследованные перечисляемые ключи, поэтому на одном и том же объекте видит больше, чем Object.keys. Object.entries возвращает собственные перечисляемые ключи вместе со значениями в виде пар. Символьные ключи исключены из всех троих, если не запросить их явно.\n\nconfigurable: false делает свойство вечным. Его нельзя удалить, его дескриптор нельзя переопределить, а в строгом режиме delete obj.prop выбрасывает TypeError. writable: false слабее: значение нельзя переприсвоить, но свойство по-прежнему можно удалить и изменить через сеттер, потому что сеттер — это другой механизм. В строгом режиме присваивание неизменяемому свойству выбрасывает TypeError, а не проходит молча. Замороженные объекты строятся ровно на этих двух флагах.'
      ),
      bullets: [
        L('Every property carries a descriptor: value, writable, enumerable and configurable.', 'У каждого свойства есть дескриптор: value, writable, enumerable и configurable.'),
        L('A descriptor is either data or accessor, and mixing value with get throws.', 'Дескриптор бывает данных или доступа, а смешивание value с get выбрасывает исключение.'),
        L('Object.keys and Object.entries see own enumerable string keys only.', 'Object.keys и Object.entries видят только собственные перечисляемые строковые ключи.'),
        L('for...in also walks the prototype chain and lists inherited enumerable keys.', 'for...in обходит ещё и цепочку прототипов и показывает унаследованные перечисляемые ключи.'),
        L('configurable: false blocks deletion and redefinition, writable: false blocks assignment only.', 'configurable: false запрещает удаление и переопределение, writable: false — только присваивание.'),
      ],
      code: `const config = {};
Object.defineProperty(config, 'endpoint', {
  value: '/api/v1', writable: false, enumerable: true, configurable: false,
});
console.log(config.endpoint);    // '/api/v1'
console.log(Object.keys(config)); // ['endpoint']

const user = {
  first: 'Ada',
  last: 'Lovelace',
  get full() { return this.first + ' ' + this.last; },
};
console.log(user.full);      // 'Ada Lovelace'
console.log(Object.entries(user)[2]); // ['full', 'Ada Lovelace']

const base = { inherited: true };
const obj = Object.create(base);
obj.own = 1;
console.log(Object.keys(obj));  // ['own']
for (const key in obj) console.log(key); // 'own', 'inherited'`,
      table: {
        caption: L('The fields of a property descriptor', 'Поля дескриптора свойства'),
        headers: [
          L('Field', 'Поле'),
          L('Applies to', 'Относится к'),
          L('What it controls', 'Что контролирует'),
        ],
        rows: [
          [L('value', 'value'), L('data property', 'свойству данных'), L('the stored value', 'хранимое значение')],
          [L('writable', 'writable'), L('data property', 'свойству данных'), L('whether the value can be reassigned', 'можно ли переприсвоить значение')],
          [L('get', 'get'), L('accessor property', 'свойству доступа'), L('the function run on every read', 'функция на каждое чтение')],
          [L('set', 'set'), L('accessor property', 'свойству доступа'), L('the function run on every write', 'функция на каждую запись')],
          [L('enumerable', 'enumerable'), L('every property', 'любому свойству'), L('whether the key is listed by Object.keys', 'показывает ли ключ Object.keys')],
          [L('configurable', 'configurable'), L('every property', 'любому свойству'), L('whether the property can be deleted or redefined', 'можно ли удалить или переопределить свойство')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A descriptor is one kind or the other', 'Дескриптор бывает только одного вида'),
          text: L(
            'Defining value together with get or set throws "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute". Pick one shape: a stored value with writable, or a pair of functions with get and set.',
            'Описание value вместе с get или set выбрасывает "Invalid property descriptor. Cannot both specify accessors and a value or writable attribute". Выберите одну форму: хранимое значение с writable либо пара функций с get и set.'
          ),
        },
        {
          tone: 'warning',
          title: L('Non-configurable is one-way', 'Non-configurable — это в одну сторону'),
          text: L(
            'You may set configurable from true to false, but never back, and a property with configurable: false can neither be deleted nor have its descriptor rewritten. The same one-way rule applies to writable: false on a data property. Guard against this before you freeze a shared object.',
            'Можно перевести configurable из true в false, но не обратно, а свойство с configurable: false нельзя ни удалить, ни переписать дескриптор. Такое же одностороннее правило действует для writable: false у свойства данных. Проверяйте это до того, как замораживаете общий объект.'
          ),
        },
      ],
      takeaway: L(
        'A property is a value plus a descriptor, and the descriptor decides whether the key can be listed, changed or deleted.',
        'Свойство — это значение плюс дескриптор, и дескриптор решает, можно ли ключ перечислить, изменить или удалить.'
      ),
      seeAlso: [
        L('Section 5-1: delete and its consequences', 'Секция 5-1: delete и его последствия'),
        L('Section 5-4: freeze, seal and immutable objects', 'Секция 5-4: freeze, seal и неизменяемые объекты'),
        L('Chapter 6: private fields and accessors in classes', 'Глава 6: приватные поля и аксессоры в классах'),
      ],
    },
    {
      id: 'js-core-ch5-s3',
      title: L('The prototype chain and property lookup', 'Цепочка прототипов и поиск свойства'),
      body: L(
        'Every object has an internal slot called [[Prototype]] that points to another object or to null. When you read a property the object does not own, the engine looks at its prototype, and if that prototype does not own it either, the engine looks at the prototype of the prototype, and so on until it reaches null and reports undefined. That walk is the prototype chain, and it is why a plain object still has toString and hasOwnProperty.\n\nObject.create(proto) builds an object with a chosen prototype and no own properties, which is the cleanest way to make an object with a specific parent. Object.getPrototypeOf(obj) reads the link and Object.setPrototypeOf(obj, proto) rewrites it. The legacy obj.__proto__ is an accessor that does the same thing and is discouraged in new code.\n\nThe distinction between own and inherited matters constantly. Object.hasOwn(obj, key) is the modern check and it works even on objects created with Object.create(null). The older form, Object.prototype.hasOwnProperty.call(obj, key), does the same job but reads better if you learned it before Object.hasOwn existed. A plain obj.hasOwnProperty(key) fails on a null-prototype object, because the method itself does not exist there.\n\nRewriting the prototype of an object that already exists is legal but expensive. The engine builds an internal shape for every object and uses it to make property access fast, and changing the prototype invalidates that shape, so the object stays slower for the rest of its life. It also changes the meaning of every lookup the object takes part in, including lookups that were already cached. Prefer creating the object with the right prototype in the first place.',
        'У каждого объекта есть внутренний слот [[Prototype]], который указывает на другой объект или на null. Когда вы читаете свойство, которого у объекта нет, движок смотрит на его прототип, и если прототип тоже не владеет этим свойством, движок смотрит на прототип прототипа, и так далее, пока не дойдёт до null и не вернёт undefined. Этот проход и есть цепочка прототипов, и именно поэтому у обычного объекта есть toString и hasOwnProperty.\n\nObject.create(proto) создаёт объект с выбранным прототипом и без собственных свойств — самый чистый способ получить объект с нужным родителем. Object.getPrototypeOf(obj) читает эту связь, а Object.setPrototypeOf(obj, proto) переписывает её. Устаревшее obj.__proto__ — аксессор, делающий то же самое, и в новом коде его не используют.\n\nРазличие между собственным и унаследованным свойством всплывает постоянно. Object.hasOwn(obj, key) — современная проверка, и она работает даже для объектов, созданных через Object.create(null). Более старый вариант Object.prototype.hasOwnProperty.call(obj, key) делает ту же работу, но читается привычнее, если вы учились до появления Object.hasOwn. Простой вызов obj.hasOwnProperty(key) падает на объекте с нулевым прототипом, потому что самого метода там нет.\n\nПереписывание прототипа у уже существующего объекта законно, но дорого. Движок строит для каждого объекта внутреннюю форму и использует её, чтобы доступ к свойствам был быстрым, и смена прототипа аннулирует эту форму, так что объект остаётся медленнее до конца своей жизни. Это также меняет смысл каждого поиска свойства, в котором объект участвует, включая уже закэшированные. Лучше создавать объект сразу с нужным прототипом.'
      ),
      bullets: [
        L('A property read walks the prototype chain until it finds an own property or reaches null.', 'Чтение свойства идёт по цепочке прототипов, пока не найдёт собственное свойство или не дойдёт до null.'),
        L('Object.create(proto) builds an object with a chosen prototype and no own properties.', 'Object.create(proto) создаёт объект с выбранным прототипом и без собственных свойств.'),
        L('Object.hasOwn(obj, key) is the modern own-property check.', 'Object.hasOwn(obj, key) — современная проверка собственного свойства.'),
        L('Object.prototype.hasOwnProperty.call(obj, key) works on any object, including null-prototype ones.', 'Object.prototype.hasOwnProperty.call(obj, key) работает на любом объекте, включая объекты с нулевым прототипом.'),
        L('Object.setPrototypeOf deoptimises the object and changes every lookup that uses it.', 'Object.setPrototypeOf ухудшает оптимизации объекта и меняет каждый поиск, который его затрагивает.'),
        L('Object.create(null) produces a dictionary with no methods at all.', 'Object.create(null) создаёт словарь вообще без методов.'),
      ],
      code: `const base = { greet() { return 'Hi ' + this.name; } };
const user = Object.create(base);
user.name = 'Ada';
console.log(user.greet());                   // 'Hi Ada'
console.log(Object.hasOwn(user, 'greet'));  // false, inherited
console.log(Object.hasOwn(user, 'name'));   // true, own
console.log(Object.getPrototypeOf(user) === base); // true

const dict = Object.create(null);
dict.count = 1;
console.log(dict.count);                    // 1
console.log(typeof dict.hasOwnProperty);    // 'undefined'
console.log(Object.hasOwn(dict, 'count')); // true

const target = { a: 1 };
Object.setPrototypeOf(target, { b: 2 });
console.log(target.b); // 2, found through the new prototype`,
      table: {
        caption: L('Own property checks compared', 'Сравнение проверок собственного свойства'),
        headers: [
          L('Check', 'Проверка'),
          L('Works on null-prototype objects', 'Работает на объектах с нулевым прототипом'),
          L('Reads the prototype chain', 'Читает цепочку прототипов'),
        ],
        rows: [
          [L('obj.hasOwnProperty(k)', 'obj.hasOwnProperty(k)'), L('no', 'нет'), L('no', 'нет')],
          [L('Object.prototype.hasOwnProperty.call(obj, k)', 'Object.prototype.hasOwnProperty.call(obj, k)'), L('yes', 'да'), L('no', 'нет')],
          [L('Object.hasOwn(obj, k)', 'Object.hasOwn(obj, k)'), L('yes', 'да'), L('no', 'нет')],
          [L("'k' in obj", "'k' in obj"), L('yes', 'да'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The in operator searches the chain', 'Оператор in ищет по всей цепочке'),
          text: L(
            '"toString" in {} is true even though no object owns that key in the literal sense, because the key is found on Object.prototype. When you mean "this object has its own key", use Object.hasOwn, otherwise every plain object appears to have a dozen methods.',
            '"toString" in {} истинно, хотя в буквальном смысле этот ключ объекту не принадлежит: он найден в Object.prototype. Когда имеется в виду «у этого объекта есть собственный ключ», берите Object.hasOwn, иначе у любого обычного объекта наберётся десяток фиктивных методов.'
          ),
        },
        {
          tone: 'warning',
          title: L('Do not change the prototype of a live object', 'Не меняйте прототип у живого объекта'),
          text: L(
            'Object.setPrototypeOf on an existing object invalidates the internal shape the engine built for it, so every later property access is slower, and any lookup that was already cached is invalidated too. Create the object with Object.create(proto) up front instead.',
            'Object.setPrototypeOf на существующем объекте аннулирует внутреннюю форму, которую построил движок, поэтому каждый последующий доступ к свойствам становится медленнее, и уже закэшированные поиски тоже сбрасываются. Создавайте объект сразу через Object.create(proto).'
          ),
        },
      ],
      takeaway: L(
        'Lookups walk the prototype chain, own-property checks must not, and the prototype of a live object should be fixed at creation.',
        'Поиск идёт по цепочке прототипов, проверки собственных свойств — нет, а прототип живого объекта задают при создании.'
      ),
      seeAlso: [
        L('Section 5-1: property access on objects', 'Секция 5-1: доступ к свойствам объекта'),
        L('Section 5-5: symbols as collision-free keys', 'Секция 5-5: символы как ключи без коллизий'),
        L('Chapter 6: class extends, super and the prototype chain', 'Глава 6: class extends, super и цепочка прототипов'),
      ],
    },
    {
      id: 'js-core-ch5-s4',
      title: L('Object statics: assign, entries, freeze and seal', 'Статические методы Object: assign, entries, freeze и seal'),
      body: L(
        'Object.assign(target, ...sources) copies own enumerable properties from every source into the target and returns the target. The copy is shallow: nested objects are shared, not cloned. The assignment goes through the normal set operation, so setters on the target run, and a getter on a source is invoked to produce the value that gets written.\n\nObject.keys, Object.values and Object.entries give three views of the own enumerable string keys of an object: names, values, and name-value pairs. Object.fromEntries goes the other way and turns an array of pairs back into an object. It is the exact inverse of Object.entries for plain data, which makes the two a natural pair for converting between a record map and a list of records.\n\nObject.freeze makes an object immutable: every own property becomes non-writable and non-configurable, and the object cannot gain new properties. The freeze is shallow, so nested objects stay mutable. It is also irreversible, there is no Object.unfreeze, so freezing an object that a library still needs to extend is a one-way door. Object.seal is the softer version: existing properties can still be written, but nothing can be added or removed.\n\nObject.isFrozen and Object.isSealed report the state back, and both are shallow checks. The practical rule is to freeze data you do not own and never intend to change, such as a configuration object or a constant table, and to leave application state alone. A frozen object is a promise to every reader that the shape will not shift underneath them.',
        'Object.assign(target, ...sources) копирует собственные перечисляемые свойства из каждого источника в target и возвращает target. Копирование поверхностное: вложенные объекты разделяются, а не клонируются. Присваивание идёт через обычную операцию set, поэтому сеттеры на target срабатывают, а геттер источника вызывается, чтобы получить значение для записи.\n\nObject.keys, Object.values и Object.entries дают три взгляда на собственные перечисляемые строковые ключи объекта: имена, значения и пары имя-значение. Object.fromEntries работает в обратную сторону и превращает массив пар обратно в объект. Для обычных данных это точная инверсия Object.entries, и поэтому эти два метода образуют естественную пару для перехода между словарём записей и списком записей.\n\nObject.freeze делает объект неизменяемым: каждое собственное свойство становится неизменяемым и ненастраиваемым, а объект не может получить новых свойств. Заморозка поверхностная, поэтому вложенные объекты остаются изменяемыми. Она также необратима: метода Object.unfreeze не существует, значит заморозить объект, который библиотека ещё собирается расширять, — это путь в одну сторону. Object.seal — мягкий вариант: существующие свойства по-прежнему можно писать, но ничего нельзя добавить или удалить.\n\nObject.isFrozen и Object.isSealed сообщают состояние обратно, и обе проверки поверхностные. Практическое правило: замораживайте данные, которыми не владеете и которые не собираетесь менять, например конфигурацию или таблицу констант, а состояние приложения не трогайте. Замороженный объект — это обещание каждому читателю, что форма под ним не сдвинется.'
      ),
      bullets: [
        L('Object.assign copies own enumerable properties and returns the target.', 'Object.assign копирует собственные перечисляемые свойства и возвращает target.'),
        L('Object.assign is shallow: nested objects stay shared with the source.', 'Object.assign поверхностный: вложенные объекты остаются общими с источником.'),
        L('Object.assign triggers setters on the target and getters on the sources.', 'Object.assign вызывает сеттеры на target и геттеры на источниках.'),
        L('Object.freeze is shallow and irreversible, Object.seal blocks adding and deleting but allows writing.', 'Object.freeze поверхностный и необратимый, Object.seal запрещает добавление и удаление, но разрешает запись.'),
        L('Object.fromEntries converts an array of pairs back into an object.', 'Object.fromEntries превращает массив пар обратно в объект.'),
      ],
      code: `const defaults = { theme: 'light', retries: 3 };
const saved = { theme: 'dark' };
const merged = Object.assign({ ...defaults }, saved);
console.log(merged); // { theme: 'dark', retries: 3 }

console.log(Object.keys(merged));    // ['theme', 'retries']
console.log(Object.values(merged));  // ['dark', 3]
console.log(Object.entries(merged)); // [['theme','dark'], ['retries',3]]
console.log(Object.fromEntries(Object.entries(merged))); // the same object back

const config = Object.freeze({ url: '/api' });
try {
  config.url = '/v2'; // throws in strict mode
} catch (error) {
  console.log(error.constructor.name); // TypeError
}
console.log(config.url);        // '/api'
console.log(Object.isFrozen(config)); // true`,
      table: {
        caption: L('What each static method guarantees', 'Что гарантирует каждый статический метод'),
        headers: [
          L('Method', 'Метод'),
          L('Depth', 'Глубина'),
          L('Reversible', 'Обратимо'),
        ],
        rows: [
          [L('Object.assign', 'Object.assign'), L('shallow', 'поверхностно'), L('not applicable', 'неприменимо')],
          [L('Object.freeze', 'Object.freeze'), L('shallow', 'поверхностно'), L('no', 'нет')],
          [L('Object.seal', 'Object.seal'), L('shallow', 'поверхностно'), L('no', 'нет')],
          [L('Object.fromEntries', 'Object.fromEntries'), L('shallow', 'поверхностно'), L('not applicable', 'неприменимо')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('assign does not clone nested objects', 'assign не клонирует вложенные объекты'),
          text: L(
            'The same shallow trap as the spread operator: after Object.assign the nested objects are the same references, so a later mutation of merged.settings.theme also changes defaults.settings.theme. Clone the nested parts yourself or use structuredClone when a deep copy is really needed.',
            'Та же поверхностная ловушка, что и у spread: после Object.assign вложенные объекты остаются теми же ссылками, поэтому последующая мутация merged.settings.theme меняет и defaults.settings.theme. Клонируйте вложенные части сами или используйте structuredClone, когда действительно нужна глубокая копия.'
          ),
        },
        {
          tone: 'warning',
          title: L('Freeze is a door that does not open again', 'Заморозка — дверь, которая не откроется снова'),
          text: L(
            'There is no unfreeze. A frozen object that a third-party library expects to extend will throw the moment the library writes to it, usually far from the call that froze it. Freeze only what you own end to end.',
            'Обратной заморозки не существует. Замороженный объект, который сторонняя библиотека собирается расширять, выбросит исключение в момент записи, обычно далеко от места заморозки. Замораживайте только то, чем полностью владеете.'
          ),
        },
      ],
      takeaway: L(
        'Object.assign and spread are shallow, freeze and seal are one-way, and fromEntries is the inverse of entries.',
        'Object.assign и spread поверхностны, freeze и seal необратимы, а fromEntries — это обратная операция к entries.'
      ),
      seeAlso: [
        L('Section 1-1: shallow copy against deep copy', 'Секция 1-1: поверхностная копия против глубокой'),
        L('Section 5-2: descriptors and enumerability', 'Секция 5-2: дескрипторы и перечисляемость'),
        L('Chapter 6: immutable state and freezing in practice', 'Глава 6: неизменяемое состояние и заморозка на практике'),
      ],
    },
    {
      id: 'js-core-ch5-s5',
      title: L('Symbols and well-known symbols', 'Символы и well-known символы'),
      body: L(
        'A Symbol is a primitive whose value is unique: every call to Symbol("id") returns a brand new key that no other code could have produced. Two symbols with the same description are still different values. That makes a symbol the right key for anything that belongs to one particular module and must not collide with a property name someone else might use, such as an identifier or a method on a shared object.\n\nThe global registry is the exception to uniqueness. Symbol.for("app.config") looks the key up in a registry shared by the whole realm and returns the same symbol every time, so two modules that agree on the string agree on the key. Symbol.keyFor(symbol) goes back from a symbol to its registry string and returns undefined for a symbol that was never registered.\n\nWell-known symbols are the symbols the language itself uses. Symbol.iterator marks an object as iterable, Symbol.toPrimitive controls how an object converts to a primitive, Symbol.toStringTag changes what String(obj) prints, and Symbol.hasInstance decides what x instanceof C means. They are ordinary properties, so an object opts in simply by defining them, and they never appear in Object.keys or in JSON.stringify.\n\nSymbol.toPrimitive receives a hint from the engine: "string" for string conversion, "number" for numeric conversion and "default" for everything else. Without a custom implementation the engine tries valueOf before toString for the default and number hints, and toString before valueOf for the string hint. A custom Symbol.toPrimitive receives the hint and decides on its own, which is how Date can be a number in arithmetic and a string in a template.',
        'Symbol — примитив, значение которого уникально: каждый вызов Symbol("id") возвращает совершенно новый ключ, который не мог получить никакой другой код. Два символа с одинаковым описанием всё равно разные значения. Поэтому символ — правильный ключ для всего, что принадлежит конкретному модулю и не должно пересекаться с именем свойства, которое может придумать кто-то другой: идентификатором или методом в общем объекте.\n\nГлобальный реестр — исключение из уникальности. Symbol.for("app.config") ищет ключ в реестре, общем для всего окружения, и возвращает один и тот же символ каждый раз, так что два модуля, договорившиеся о строке, договорились и о ключе. Symbol.keyFor(symbol) возвращает строку реестра по символу и выдаёт undefined для символа, который в реестр не заносили.\n\nWell-known символы — это символы, которыми пользуется сам язык. Symbol.iterator помечает объект как итерируемый, Symbol.toPrimitive управляет приведением объекта к примитиву, Symbol.toStringTag меняет то, что печатает String(obj), а Symbol.hasInstance определяет смысл выражения x instanceof C. Это обычные свойства, поэтому объект подключает их просто определением, и они никогда не появляются в Object.keys и в JSON.stringify.\n\nSymbol.toPrimitive получает от движка подсказку: "string" для приведения к строке, "number" для приведения к числу и "default" для всего остального. Без собственной реализации движок пробует valueOf раньше toString для подсказок default и number, и toString раньше valueOf для подсказки string. Своя реализация Symbol.toPrimitive получает подсказку и решает сама, и именно так Date умеет быть числом в арифметике и строкой в шаблонной строке.'
      ),
      bullets: [
        L('Every Symbol() call returns a unique key, even with the same description.', 'Каждый вызов Symbol() возвращает уникальный ключ, даже с одинаковым описанием.'),
        L('Symbol.for registers a key in a global registry and Symbol.keyFor reads it back.', 'Symbol.for заносит ключ в глобальный реестр, а Symbol.keyFor читает его обратно.'),
        L('Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag and Symbol.hasInstance are the well-known symbols.', 'Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag и Symbol.hasInstance — это well-known символы.'),
        L('Symbol keys are hidden from Object.keys, for...in and JSON.stringify.', 'Символьные ключи скрыты от Object.keys, for...in и JSON.stringify.'),
        L('Object.assign and spread copy own enumerable symbol keys even though Object.keys never lists them.', 'Object.assign и spread копируют собственные перечисляемые символьные ключи, хотя Object.keys их не показывает.'),
        L('Symbol.toPrimitive receives the hint "string", "number" or "default".', 'Symbol.toPrimitive получает подсказку "string", "number" или "default".'),
      ],
      code: `const id = Symbol('id');
const obj = { name: 'Ada', [id]: 42 };
console.log(obj[id]);                    // 42
console.log(Object.keys(obj));          // ['name']
console.log(JSON.stringify(obj));       // '{"name":"Ada"}'

const shared = Symbol.for('app.config');
console.log(Symbol.for('app.config') === shared); // true
console.log(Symbol.keyFor(shared));                // 'app.config'

// Default hint order: valueOf first, the string hint reverses it
const plain = {
  valueOf() { return 42; },
  toString() { return 'warm'; },
};
console.log(+plain);        // 42
console.log(String(plain)); // 'warm'
const hinted = {
  [Symbol.toPrimitive](hint) { return hint === 'number' ? 42 : 'warm'; },
};
console.log(+hinted);        // 42, number hint
console.log(String(hinted)); // 'warm', string hint`,
      table: {
        caption: L('Well-known symbols and what they control', 'Well-known символы и что они контролируют'),
        headers: [
          L('Symbol', 'Символ'),
          L('Purpose', 'Назначение'),
          L('Where it shows up', 'Где проявляется'),
        ],
        rows: [
          [L('Symbol.iterator', 'Symbol.iterator'), L('makes an object iterable', 'делает объект итерируемым'), L('for...of, spread, Array.from', 'for...of, spread, Array.from')],
          [L('Symbol.toPrimitive', 'Symbol.toPrimitive'), L('converts an object to a primitive', 'приводит объект к примитиву'), L('string, number and default conversions', 'приведения к строке, числу и по умолчанию')],
          [L('Symbol.toStringTag', 'Symbol.toStringTag'), L('changes the tag of an object', 'меняет тег объекта'), L('String(obj), Object.prototype.toString', 'String(obj), Object.prototype.toString')],
          [L('Symbol.hasInstance', 'Symbol.hasInstance'), L('defines the behaviour of instanceof', 'определяет поведение instanceof'), L('x instanceof C', 'x instanceof C')],
          [L('Symbol.species', 'Symbol.species'), L('chooses the constructor of derived objects', 'выбирает конструктор производных объектов'), L('Array, Map, Promise subclasses', 'подклассы Array, Map, Promise')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Symbols hide internal state', 'Символы прячут внутреннее состояние'),
          text: L(
            'A symbol key is invisible to Object.keys, to for...in and to JSON.stringify, so a library can hang its bookkeeping on an object without polluting the data the user sees. The key stays reachable for anyone who holds the symbol itself.',
            'Символьный ключ невиден для Object.keys, для for...in и для JSON.stringify, поэтому библиотека может повесить свои служебные данные на объект, не засоряя то, что видит пользователь. Ключ остаётся доступным всем, кто держит сам символ.'
          ),
        },
        {
          tone: 'note',
          title: L('Symbols are copied, just not listed', 'Символы копируются, просто не перечисляются'),
          text: L(
            'A common surprise: Object.keys hides symbol keys, but Object.assign and the spread operator copy them, because they copy every own enumerable property. Use Object.getOwnPropertySymbols to inspect them.',
            'Частое удивление: Object.keys прячет символьные ключи, но Object.assign и spread их копируют, потому что копируют все собственные перечисляемые свойства. Смотреть их можно через Object.getOwnPropertySymbols.'
          ),
        },
      ],
      takeaway: L(
        'Symbols give collision-free keys, well-known symbols are how the language plugs into your objects, and Symbol.toPrimitive receives a hint that decides the conversion order.',
        'Символы дают ключи без коллизий, well-known символы — это способ языка подключиться к вашим объектам, а Symbol.toPrimitive получает подсказку, которая определяет порядок приведения.'
      ),
      seeAlso: [
        L('Section 5-6: the iterator protocol', 'Секция 5-6: протокол итератора'),
        L('Chapter 8: generators and iterators', 'Глава 8: генераторы и итераторы'),
        L('Chapter 6: Symbol.toStringTag on class instances', 'Глава 6: Symbol.toStringTag на экземплярах классов'),
      ],
    },
    {
      id: 'js-core-ch5-s6',
      title: L('Iterables, the iterator protocol and spread', 'Итерируемые объекты, протокол итератора и spread'),
      body: L(
        'An iterable is an object that knows how to produce a sequence of values. The contract is a single well-known symbol: obj[Symbol.iterator]() must return an iterator, and an iterator is an object with a next method that returns { value, done }. The sequence ends when next reports done: true, and the value carried alongside it is the final value, not one more element.\n\nThe spread operator and for...of are defined entirely in terms of that protocol. for (const item of iterable) calls Symbol.iterator once and then calls next until it reports done. The spread operator does exactly the same and collects the values into an array. Neither of them knows anything about arrays: they work with a string, a Set, a Map, a generator, or any custom object that follows the protocol.\n\nObject spread is a different operation and deserves a separate name in your head. { ...obj } does not use the iterator protocol at all: it copies own enumerable properties, both string keys and symbol keys, and it ignores inherited ones and non-enumerable ones. That is why { ...obj } on an array produces { "0": "a", "1": "b" } rather than a new array, while [...arr] produces a new array.\n\nArray.from accepts anything iterable and returns a real array, and it takes an optional mapping function, so Array.from(set, (v) => v * 2) is a concise and readable replacement for a manual loop. Writing your own iterable is straightforward: return an object with a next method from Symbol.iterator, and the rest of the language treats it as a first-class sequence.',
        'Итерируемый объект — это объект, который умеет производить последовательность значений. Контракт состоит из одного well-known символа: obj[Symbol.iterator]() должен вернуть итератор, а итератор — это объект с методом next, возвращающим { value, done }. Последовательность заканчивается, когда next сообщает done: true, а значение рядом с done является последним значением, а не ещё одним элементом.\n\nОператор spread и цикл for...of полностью определены через этот протокол. Цикл for (const item of iterable) один раз вызывает Symbol.iterator, а затем вызывает next, пока тот не сообщит done. Оператор spread делает ровно то же самое и собирает значения в массив. Ни то, ни другое ничего не знает про массивы: они работают со строкой, с Set, с Map, с генератором и с любым своим объектом, следующим протоколу.\n\nSpread объекта — это другая операция, и ей стоит дать отдельное имя в голове. Запись { ...obj } протокол итератора вообще не использует: она копирует собственные перечисляемые свойства, и строковые ключи, и символьные, а унаследованные и неперечисляемые игнорирует. Именно поэтому { ...obj } на массиве даёт { "0": "a", "1": "b" }, а не новый массив, тогда как [...arr] даёт новый массив.\n\nArray.from принимает что угодно итерируемое и возвращает настоящий массив, а вторым аргументом принимает функцию преобразования, поэтому Array.from(set, (v) => v * 2) — короткая и читаемая замена ручному циклу. Написать свой итерируемый объект несложно: верните из Symbol.iterator объект с методом next, и весь остальной язык будет считать его полноценной последовательностью.'
      ),
      bullets: [
        L('An object is iterable when it has a Symbol.iterator method.', 'Объект итерируем, если у него есть метод Symbol.iterator.'),
        L('An iterator returns { value, done } from next().', 'Итератор возвращает из next() объект { value, done }.'),
        L('for...of and spread on an iterable use the iterator protocol.', 'for...of и spread по итерируемому объекту используют протокол итератора.'),
        L('Object spread copies own enumerable properties and does not use the protocol.', 'Spread объекта копирует собственные перечисляемые свойства и протокол не использует.'),
        L('Array.from(iterable, mapFn) converts any iterable into an array.', 'Array.from(iterable, mapFn) превращает любое итерируемое в массив.'),
      ],
      code: `const range = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const limit = this.to;
    return {
      next: () => current <= limit
        ? { value: current++, done: false }
        : { value: undefined, done: true },
    };
  },
};
console.log([...range]); // [1, 2, 3, 4]

const set = new Set([1, 2, 2]);
console.log([...set]);                  // [1, 2]
console.log(Array.from(set, (n) => n * 10)); // [10, 20]

console.log({ ...['hi'] }); // { '0': 'h', '1': 'i' }
console.log([...'hi']);      // ['h', 'i']`,
      table: {
        caption: L('Which operations use the iterator protocol', 'Какие операции используют протокол итератора'),
        headers: [
          L('Operation', 'Операция'),
          L('Uses the protocol', 'Использует протокол'),
          L('Result', 'Результат'),
        ],
        rows: [
          [L('for...of', 'for...of'), L('yes', 'да'), L('iterates over the values', 'перебирает значения')],
          [L('[...iterable]', '[...iterable]'), L('yes', 'да'), L('an array of the values', 'массив значений')],
          [L('Array.from(x)', 'Array.from(x)'), L('yes, when x is iterable', 'да, когда x итерируем'), L('an array of the values', 'массив значений')],
          [L('{ ...obj }', '{ ...obj }'), L('no', 'нет'), L('an object with the own enumerable properties copied', 'объект с копией собственных перечисляемых свойств')],
          [L('Object.keys(obj)', 'Object.keys(obj)'), L('no', 'нет'), L('an array of own enumerable string keys', 'массив собственных перечисляемых строковых ключей')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Object spread is not the iterable protocol', 'Spread объекта — это не протокол итератора'),
          text: L(
            'Spreading an array into an object literal gives an object with index keys, not an array: { ...["a"] } is { "0": "a" }. When you want a new array, write [...arr] or arr.slice().',
            'Раскладывание массива в объектный литерал даёт объект с ключами-индексами, а не массив: { ...["a"] } это { "0": "a" }. Нужен новый массив — пишите [...arr] или arr.slice().'
          ),
        },
        {
          tone: 'tip',
          title: L('A generator is an iterable built in', 'Генератор — это готовый итерируемый объект'),
          text: L(
            'A generator function produces an object that already has both halves of the contract: it returns itself from Symbol.iterator and it implements next. Writing one by hand, as above, is only necessary when you control the sequence yourself.',
            'Функция-генератор создаёт объект, у которого уже есть обе половины контракта: она возвращает саму себя из Symbol.iterator и реализует next. Писать это руками, как выше, нужно только тогда, когда последовательность контролируете вы.'
          ),
        },
      ],
      takeaway: L(
        'for...of and spread on an iterable follow the protocol, object spread copies properties, and Array.from converts any iterable into an array.',
        'for...of и spread по итерируемому объекту идут по протоколу, spread объекта копирует свойства, а Array.from превращает любое итерируемое в массив.'
      ),
      seeAlso: [
        L('Section 5-5: Symbol.iterator as a well-known symbol', 'Секция 5-5: Symbol.iterator как well-known символ'),
        L('Chapter 8: generators, iterators and for...of', 'Глава 8: генераторы, итераторы и for...of'),
        L('Section 7-1: array methods and iteration', 'Секция 7-1: методы массивов и итерация'),
      ],
    },
  ],
};
