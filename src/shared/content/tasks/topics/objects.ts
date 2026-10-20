import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const objectsTasks: PracticeTask[] = [
  {
    id: 'topic-objects-1',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'basic',
    title: L('Deep clone', 'Глубокое клонирование'),
    brief: L(
      'Write a function deepClone(value) that returns a full copy of a value including nested objects and arrays. Changing any part of the copy must not change the original, and the copy must not share any nested object with the original. Plain objects and arrays are enough, functions may be copied by reference. Example: deepClone({ a: 1, b: { c: [1, 2] } }) returns an equal object, and after copy.b.c.push(3) the original still has b.c of length 2.',
      'Напишите функцию deepClone(value), которая возвращает полную копию значения, включая вложенные объекты и массивы. Изменение любой части копии не должно менять оригинал, и копия не должна делить с оригиналом ни одного вложенного объекта. Достаточно обычных объектов и массивов, функции можно копировать по ссылке. Пример: deepClone({ a: 1, b: { c: [1, 2] } }) возвращает равный объект, и после copy.b.c.push(3) в оригинале b.c по-прежнему имеет длину 2.'
    ),
    hint: L(
      'Use recursion: clone arrays with map, and for objects create a new object and clone every value. Primitives are returned as is.',
      'Используйте рекурсию: массивы клонируйте через map, а для объектов создавайте новый объект и клонируйте каждое значение. Примитивы возвращайте как есть.'
    ),
    solution: `function deepClone(value) {
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  if (value !== null && typeof value === 'object') {
    const copy = {};
    for (const key of Object.keys(value)) {
      copy[key] = deepClone(value[key]);
    }
    return copy;
  }

  return value;
}

const original = { a: 1, b: { c: [1, 2] } };
const copy = deepClone(original);

copy.b.c.push(3);
console.log(original.b.c); // [1, 2]
console.log(copy.b.c); // [1, 2, 3]`,
    explanation: L(
      'The shallow copy that spread or Object.assign give you would still share the nested objects, so the clone has to be built recursively. Every nested array becomes a new array and every nested object becomes a new object, which is why the two structures no longer have anything in common. Primitives have no inner structure, so they are returned unchanged.',
      'Неглубокая копия, которую дают spread или Object.assign, всё равно делит вложенные объекты, поэтому клонировать приходится рекурсивно. Каждый вложенный массив становится новым массивом, а каждый вложенный объект — новым объектом, и потому у структур больше нет ничего общего. У примитивов нет внутреннего строения, поэтому они возвращаются без изменений.'
    ),
  },
  {
    id: 'topic-objects-2',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'basic',
    title: L('Merge objects', 'Слияние объектов'),
    brief: L(
      'Write a function merge(...objects) that returns a new object built from all given objects. A property that appears in several objects takes the value of the last one that defines it. The merge is one level deep: nested objects are copied by reference, and none of the input objects may be modified. Example: merge({ a: 1, b: 2 }, { b: 3, c: 4 }) returns { a: 1, b: 3, c: 4 }.',
      'Напишите функцию merge(...objects), которая возвращает новый объект, собранный из всех переданных объектов. Свойство, встречающееся в нескольких объектах, получает значение из последнего объекта, который его определяет. Слияние поверхностное: вложенные объекты копируются по ссылке, и ни один из входных объектов не должен изменяться. Пример: merge({ a: 1, b: 2 }, { b: 3, c: 4 }) возвращает { a: 1, b: 3, c: 4 }.'
    ),
    hint: L(
      'Object.assign with a fresh {} as the first argument copies the own enumerable properties without touching the sources.',
      'Object.assign с новым {} в качестве первого аргумента копирует собственные перечислимые свойства, не изменяя источники.'
    ),
    solution: `function merge(...objects) {
  return Object.assign({}, ...objects);
}

const a = { x: 1, nested: { deep: true } };
const b = { y: 2, x: 3 };

console.log(merge(a, b)); // { x: 3, nested: { deep: true }, y: 2 }
console.log(a); // { x: 1, nested: { deep: true } } — unchanged`,
    explanation: L(
      'Object.assign copies the own enumerable properties of every source into the target, and later sources overwrite earlier ones, which is exactly the "last one wins" rule. The target is a brand new empty object, so the inputs are only read and never changed. Note that the merge is shallow: the nested object is still the same reference in the result.',
      'Object.assign копирует собственные перечислимые свойства всех источников в цель, а последующие источники перезаписывают предыдущие — это и есть правило "последний побеждает". Цель — совершенно новый пустой объект, поэтому источники только читаются и не меняются. Обратите внимание: слияние поверхностное, вложенный объект остаётся той же ссылкой в результате.'
    ),
  },
  {
    id: 'topic-objects-3',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'basic',
    title: L('Pick and omit keys', 'Выбор и исключение ключей'),
    brief: L(
      'Write two functions. pick(obj, keys) returns a new object that contains only the listed keys that really exist in obj, and omit(obj, keys) returns a new object with the listed keys removed. The original object must not be modified. Example: pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) returns { a: 1, c: 3 }, pick({ a: 1 }, ["z"]) returns {}, omit({ a: 1, b: 2, c: 3 }, ["b"]) returns { a: 1, c: 3 }.',
      'Напишите две функции. pick(obj, keys) возвращает новый объект, содержащий только перечисленные ключи, которые действительно есть в obj, а omit(obj, keys) возвращает новый объект без перечисленных ключей. Исходный объект не должен изменяться. Пример: pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) возвращает { a: 1, c: 3 }, pick({ a: 1 }, ["z"]) возвращает {}, omit({ a: 1, b: 2, c: 3 }, ["b"]) возвращает { a: 1, c: 3 }.'
    ),
    hint: L(
      'For pick iterate over the requested keys and copy the ones that exist, for omit iterate over the object keys and copy the ones that are not listed.',
      'Для pick переберите запрошенные ключи и скопируйте существующие, для omit переберите ключи объекта и скопируйте те, которых нет в списке.'
    ),
    solution: `function pick(obj, keys) {
  const result = {};

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

function omit(obj, keys) {
  const result = {};

  for (const key of Object.keys(obj)) {
    if (keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result;
}

const source = { a: 1, b: 2, c: 3 };
console.log(pick(source, ['a', 'c'])); // { a: 1, c: 3 }
console.log(omit(source, ['b'])); // { a: 1, c: 3 }
console.log(source); // { a: 1, b: 2, c: 3 } — unchanged`,
    explanation: L(
      'The two functions are mirror images of each other. pick walks the list of requested keys and copies the ones that the object actually has, which is why asking for a missing key simply adds nothing. omit walks the keys of the object and copies everything that was not forbidden. Both build a new object, so the source is never touched.',
      'Эти две функции — зеркальные отражения друг друга. pick обходит запрошенные ключи и копирует те, что действительно есть в объекте, поэтому запрос несуществующего ключа просто ничего не добавляет. omit обходит ключи объекта и копирует всё, что не запрещено. Обе строят новый объект, поэтому источник не страдает.'
    ),
  },
  {
    id: 'topic-objects-4',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'intermediate',
    title: L('Deep freeze', 'Глубокая заморозка'),
    brief: L(
      'Write a function deepFreeze(value) that freezes a value together with every nested object and array, and returns the frozen value. In strict mode any attempt to change a frozen property must throw a TypeError, and the nested objects must be frozen as well. Example: after deepFreeze({ a: { b: 1 } }), the assignment obj.a.b = 2 throws a TypeError.',
      'Напишите функцию deepFreeze(value), которая замораживает значение вместе со всеми вложенными объектами и массивами, и возвращает замороженное значение. В строгом режиме любая попытка изменить замороженное свойство должна выбрасывать TypeError, и вложенные объекты тоже должны быть заморожены. Пример: после deepFreeze({ a: { b: 1 } }) присваивание obj.a.b = 2 выбрасывает TypeError.'
    ),
    hint: L(
      'Object.freeze is shallow, so freeze the value and then recurse into every own enumerable property.',
      'Object.freeze работает только на один уровень, поэтому заморозьте значение и затем рекурсивно пройдите по всем его собственным перечислимым свойствам.'
    ),
    solution: `'use strict';

function deepFreeze(value) {
  if (value === null || typeof value !== 'object') return value;

  Object.freeze(value);

  for (const key of Object.keys(value)) {
    deepFreeze(value[key]);
  }
  return value;
}

const config = deepFreeze({ a: { b: 1 }, list: [1, 2] });

console.log(Object.isFrozen(config)); // true
console.log(Object.isFrozen(config.a)); // true
console.log(Object.isFrozen(config.list)); // true

try {
  config.a.b = 2;
} catch (error) {
  console.log(error instanceof TypeError); // true
}`,
    explanation: L(
      'Object.freeze only seals the object it is called on: nested objects stay writable, so a one-level freeze is not enough. The recursion solves this by freezing every value reachable through the own enumerable keys. Primitives and null have nothing to freeze, so they are returned unchanged.',
      'Object.freeze запечатывает только тот объект, которому вызван: вложенные объекты остаются изменяемыми, поэтому заморозки одного уровня мало. Рекурсия решает задачу, замораживая каждое значение, доступное через собственные перечислимые ключи. У примитивов и null замораживать нечего, поэтому они возвращаются без изменений.'
    ),
  },
  {
    id: 'topic-objects-5',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'intermediate',
    title: L('Deep equality', 'Глубокое сравнение'),
    brief: L(
      'Write a function deepEqual(a, b) that returns true when two values are deeply equal. Two arrays are equal when they have the same length and equal elements in the same order, two objects are equal when they have the same keys and deeply equal values, and the order of the keys must not matter. An array is never equal to an object. NaN must be equal to NaN. Example: deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }) is true, deepEqual([1, 2], [1, 2, 3]) is false, deepEqual(NaN, NaN) is true.',
      'Напишите функцию deepEqual(a, b), которая возвращает true, когда два значения глубоко равны. Два массива равны, если у них одинаковая длина и равные элементы на одинаковых местах, два объекта равны, если у них одинаковые ключи и глубоко равные значения, причём порядок ключей не важен. Массив никогда не равен объекту. NaN должно быть равно NaN. Пример: deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }) — true, deepEqual([1, 2], [1, 2, 3]) — false, deepEqual(NaN, NaN) — true.'
    ),
    hint: L(
      'First compare the primitives, then check that both values are objects, then compare their key sets and compare every value recursively.',
      'Сначала сравните примитивы, затем проверьте, что оба значения — объекты, потом сравните наборы ключей и рекурсивно сравните каждое значение.'
    ),
    solution: `function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) return true;

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })); // true
console.log(deepEqual([1, 2], [1, 2, 3])); // false
console.log(deepEqual(NaN, NaN)); // true`,
    explanation: L(
      'The checks run from the cheapest to the most expensive. Primitives are compared with ===, and NaN gets a special case because NaN === NaN is false. If both values are objects, the algorithm compares the key sets, then recurses into the values, so any difference in a nested structure is caught. The Array.isArray check makes sure an array never matches a plain object.',
      'Проверки идут от дешёвых к дорогим. Примитивы сравниваются через ===, а для NaN есть отдельный случай, потому что NaN === NaN ложно. Если оба значения — объекты, алгоритм сравнивает наборы ключей, а затем рекурсивно сравнивает значения, поэтому любое расхождение во вложенной структуре будет найдено. Проверка Array.isArray не даёт массиву совпасть с обычным объектом.'
    ),
  },
  {
    id: 'topic-objects-6',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'advanced',
    title: L('Group objects by a property', 'Группировка объектов по свойству'),
    brief: L(
      'Write a function groupByProperty(items, property) that returns an object where each value of the given property maps to an array of all items with that value. Items without the property must go into the group named "unknown". The order of the items inside a group must be the order of the source array, and the input array must not be modified. Example: groupByProperty([{ team: "a" }, { team: "b" }, { team: "a" }], "team") returns { a: [{ team: "a" }, { team: "a" }], b: [{ team: "b" }] }.',
      'Напишите функцию groupByProperty(items, property), которая возвращает объект, где каждое значение указанного свойства отображается в массив всех элементов с этим значением. Элементы без этого свойства попадают в группу "unknown". Порядок элементов внутри группы должен совпадать с порядком исходного массива, а входной массив не должен изменяться. Пример: groupByProperty([{ team: "a" }, { team: "b" }, { team: "a" }], "team") возвращает { a: [{ team: "a" }, { team: "a" }], b: [{ team: "b" }] }.'
    ),
    hint: L(
      'Read item[property] and use the value as the group name, falling back to "unknown" when the property is undefined.',
      'Читайте item[property] и используйте значение как имя группы, подставляя "unknown", если свойства нет.'
    ),
    solution: `function groupByProperty(items, property) {
  const groups = {};

  for (const item of items) {
    const name = item[property] === undefined ? 'unknown' : String(item[property]);

    if (!Object.prototype.hasOwnProperty.call(groups, name)) {
      groups[name] = [];
    }
    groups[name].push(item);
  }
  return groups;
}

const members = [{ team: 'a' }, { team: 'b' }, { team: 'a' }];
console.log(groupByProperty(members, 'team'));
console.log(groupByProperty([{ name: 'x' }], 'team')); // { unknown: [{ name: 'x' }] }`,
    explanation: L(
      'The property name is a variable here, so the value is read with the bracket notation item[property] rather than with a dot. The key of the group is that value turned into a string, because object keys are always strings. Items that do not carry the property get the fallback group, and the group is created on first use.',
      'Имя свойства здесь — переменная, поэтому значение читается через квадратные скобки item[property], а не через точку. Именем группы служит это значение, приведённое к строке, ведь ключи объекта всегда строки. Элементы без такого свойства попадают в запасную группу, а сама группа создаётся при первом обращении.'
    ),
  },
  {
    id: 'topic-objects-7',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'advanced',
    title: L('Getters and setters', 'Геттеры и сеттеры'),
    brief: L(
      'Create an object user with the properties firstName and lastName, and add a computed property fullName defined with Object.defineProperty. Reading user.fullName must return the first and the last name joined by a space, and writing user.fullName = "Bob Ray Smith" must set firstName to "Bob" and lastName to "Ray Smith". Example: a user with firstName "Ann" and lastName "Lee" has fullName "Ann Lee".',
      'Создайте объект user со свойствами firstName и lastName и добавьте вычисляемое свойство fullName через Object.defineProperty. Чтение user.fullName должно возвращать имя и фамилию, соединённые пробелом, а запись user.fullName = "Bob Ray Smith" должна установить firstName в "Bob", а lastName — в "Ray Smith". Пример: у пользователя с firstName "Ann" и lastName "Lee" свойство fullName равно "Ann Lee".'
    ),
    hint: L(
      'Object.defineProperty takes a descriptor object with get and set functions. Inside them this points to the object itself.',
      'Object.defineProperty принимает дескриптор с функциями get и set. Внутри них this указывает на сам объект.'
    ),
    solution: `const user = {
  firstName: 'Ann',
  lastName: 'Lee',
};

Object.defineProperty(user, 'fullName', {
  get() {
    return this.firstName + ' ' + this.lastName;
  },
  set(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(' ');
  },
  enumerable: true,
  configurable: true,
});

console.log(user.fullName); // Ann Lee
user.fullName = 'Bob Ray Smith';
console.log(user.firstName); // Bob
console.log(user.lastName); // Ray Smith`,
    explanation: L(
      'A property with a getter and a setter is a computed property: the stored value does not exist, and every read and every write goes through the two functions. Inside them this refers to the object, so the setter can split the incoming string and write the parts into firstName and lastName. slice(1) is used instead of parts[1] so that a name with more than two words keeps all the rest.',
      'Свойство с геттером и сеттером — вычисляемое: хранимого значения нет, и каждое чтение и каждая запись проходят через эти две функции. Внутри них this ссылается на объект, поэтому сеттер может разделить строку и записать части в firstName и lastName. Используется slice(1), а не parts[1], чтобы имя из трёх и более слов сохранило остаток целиком.'
    ),
  },
  {
    id: 'topic-objects-8',
    moduleId: 'js-core',
    topic: 'objects',
    level: 'advanced',
    title: L('Prototype chain', 'Цепочка прототипов'),
    brief: L(
      'Build a prototype hierarchy with constructor functions. Shape must have a method describe() returning "Shape with area " + this.area(). Rectangle must inherit from Shape, must call Shape with itself, and must define its own area() returning width * height. Example: new Rectangle(3, 4).describe() returns "Shape with area 12", a rectangle must also pass "rect instanceof Shape" and "rect instanceof Rectangle".',
      'Постройте иерархию прототипов с помощью конструкторов. У Shape должен быть метод describe(), возвращающий "Shape with area " + this.area(). Rectangle должен наследоваться от Shape, должен вызвать Shape с самим собой и определить собственный area(), возвращающий width * height. Пример: new Rectangle(3, 4).describe() возвращает "Shape with area 12", прямоугольник должен также проходить проверки "rect instanceof Shape" и "rect instanceof Rectangle".'
    ),
    hint: L(
      'Set Rectangle.prototype = Object.create(Shape.prototype) and put the own methods on Rectangle.prototype. The instanceof operator walks the prototype chain.',
      'Задайте Rectangle.prototype = Object.create(Shape.prototype), а собственные методы разместите на Rectangle.prototype. Оператор instanceof проходит по цепочке прототипов.'
    ),
    solution: `function Shape() {}

Shape.prototype.describe = function () {
  return 'Shape with area ' + this.area();
};

function Rectangle(width, height) {
  Shape.call(this);
  this.width = width;
  this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect = new Rectangle(3, 4);

console.log(rect.describe()); // Shape with area 12
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true`,
    explanation: L(
      'Object.create(Shape.prototype) makes the prototype of Rectangle be Shape.prototype, and that is the whole inheritance mechanism: the chain is shape, then rectangle, then object. describe() is not defined on Rectangle, so the lookup walks up the chain and finds it on Shape, where this points to the rectangle instance. instanceof checks exactly that chain, which is why a rectangle is both a Rectangle and a Shape.',
      'Object.create(Shape.prototype) делает прототипом Rectangle объект Shape.prototype — это и есть весь механизм наследования: цепочка Shape, затем Rectangle, затем Object. Метода describe() у Rectangle нет, поэтому поиск идёт вверх по цепочке и находит его в Shape, где this указывает на экземпляр прямоугольника. Оператор instanceof проверяет ровно эту цепочку, поэтому прямоугольник одновременно Rectangle и Shape.'
    ),
  },
];
