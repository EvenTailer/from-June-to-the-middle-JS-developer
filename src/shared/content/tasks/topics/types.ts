import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const typesTasks: PracticeTask[] = [
  {
    id: 'topic-types-1',
    moduleId: 'js-core',
    topic: 'types',
    level: 'basic',
    title: L('Describe the type of a value', 'Определить тип значения'),
    brief: L(
      'Write a function describeType(value) that returns the name of the type of a value. The result is "null" for null, "undefined" for undefined, "array" for arrays, "object" for plain objects, and for everything else the result of typeof (so "number", "string", "boolean", "function", "symbol" or "bigint"). Remember that typeof null and typeof [] both return "object", so these two cases have to be checked first. Example: describeType(null) returns "null", describeType([]) returns "array", describeType({}) returns "object", describeType("hi") returns "string", describeType(42) returns "number".',
      'Напишите функцию describeType(value), которая возвращает название типа значения. Результат — "null" для null, "undefined" для undefined, "array" для массивов, "object" для обычных объектов, а для всего остального результат typeof (то есть "number", "string", "boolean", "function", "symbol" или "bigint"). Помните, что typeof null и typeof [] оба возвращают "object", поэтому эти два случая нужно проверить первыми. Пример: describeType(null) возвращает "null", describeType([]) возвращает "array", describeType({}) возвращает "object", describeType("hi") возвращает "string", describeType(42) возвращает "number".'
    ),
    hint: L(
      'Check null and undefined with a strict comparison, then use Array.isArray, and only then fall back to typeof.',
      'Проверьте null и undefined строгим сравнением, потом используйте Array.isArray и только в конце откатитесь на typeof.'
    ),
    solution: `function describeType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

console.log(describeType(null)); // null
console.log(describeType(undefined)); // undefined
console.log(describeType([])); // array
console.log(describeType({})); // object
console.log(describeType('hi')); // string
console.log(describeType(42)); // number
console.log(describeType(() => 1)); // function`,
    explanation: L(
      'typeof was designed before null existed, so typeof null returns "object" and typeof [] returns "object" as well. That is why the two special cases are checked before the fallback: a strict comparison with null and undefined separates them from every other value, and Array.isArray recognises an array no matter what its prototype is. Everything that reaches typeof is reported by the language itself, so the function never guesses.',
      'typeof появился раньше, чем значение null, поэтому typeof null возвращает "object", и typeof [] тоже возвращает "object". Именно поэтому два особых случая проверяются раньше основного варианта: строгое сравнение с null и undefined отделяет их от всех остальных значений, а Array.isArray распознаёт массив независимо от его прототипа. Всё, что дошло до typeof, описывается самим языком, поэтому функция ничего не угадывает.'
    ),
  },
  {
    id: 'topic-types-2',
    moduleId: 'js-core',
    topic: 'types',
    level: 'basic',
    title: L('Build the truthy table by hand', 'Собрать таблицу истинности вручную'),
    brief: L(
      'Write a function toBoolean(value) that returns true when the value is truthy in JavaScript and false when it is falsy, without using Boolean(), without the !! trick and without a ternary. The falsy values are exactly: false, 0, -0, 0n, "", null, undefined and NaN. Everything else is truthy, including [], {}, "0" and "false". Example: toBoolean(0) returns false, toBoolean("") returns false, toBoolean(NaN) returns false, toBoolean(null) returns false, toBoolean([]) returns true, toBoolean({}) returns true, toBoolean("0") returns true.',
      'Напишите функцию toBoolean(value), которая возвращает true для истинного значения в JavaScript и false для ложного, не используя Boolean(), без трюка !! и без тернарного оператора. Ложными являются ровно: false, 0, -0, 0n, "", null, undefined и NaN. Всё остальное истинно, включая [], {}, "0" и "false". Пример: toBoolean(0) возвращает false, toBoolean("") возвращает false, toBoolean(NaN) возвращает false, toBoolean(null) возвращает false, toBoolean([]) возвращает true, toBoolean({}) возвращает true, toBoolean("0") возвращает true.'
    ),
    hint: L(
      'Ask typeof first and handle every type separately: a boolean is its own answer, a number is falsy when it is zero or NaN, a string is falsy when it is empty.',
      'Сначала спросите typeof и разберите каждый тип отдельно: boolean отвечает сам за себя, число ложное, когда оно ноль или NaN, строка ложная, когда она пустая.'
    ),
    solution: `function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return !Number.isNaN(value) && value !== 0;
  if (typeof value === 'bigint') return value !== 0n;
  if (typeof value === 'string') return value.length > 0;
  return value !== null && value !== undefined;
}

console.log(toBoolean(0)); // false
console.log(toBoolean('')); // false
console.log(toBoolean(NaN)); // false
console.log(toBoolean(null)); // false
console.log(toBoolean([])); // true
console.log(toBoolean({})); // true
console.log(toBoolean('0')); // true`,
    explanation: L(
      'Every type needs its own rule, and that is exactly the point of the exercise. A boolean is already the answer, a number is falsy when it equals zero or is NaN, a bigint is falsy when it is zero and a string is falsy when it is empty. The last line covers null and undefined, the only two falsy values that are not primitives with their own typeof. Note that an empty array and an empty object are truthy, because they are objects, not empty strings or zero.',
      'У каждого типа своё правило — в этом и смысл упражнения. Boolean отвечает сам за себя, число ложное, когда равно нулю или NaN, bigint ложное, когда равен нулю, а строка ложная, когда пустая. Последняя строка покрывает null и undefined — единственные два ложных значения, у которых нет своего typeof. Обратите внимание: пустой массив и пустой объект истинны, потому что это объекты, а не пустые строки и не ноль.'
    ),
  },
  {
    id: 'topic-types-3',
    moduleId: 'js-core',
    topic: 'types',
    level: 'basic',
    title: L('Parse a number safely', 'Безопасно разобрать число'),
    brief: L(
      'Write a function toNumber(value, fallback = 0) that converts a value to a number and returns the fallback when the value cannot be represented as a finite number. The rules are: a finite number is returned as it is, a boolean becomes 1 or 0, null becomes 0, undefined becomes the fallback, an empty or blank string becomes the fallback, and a string with anything else that is not a number becomes the fallback as well. Infinity and NaN also produce the fallback. Example: toNumber("42") returns 42, toNumber(" 3.5 ") returns 3.5, toNumber("12px") returns 0, toNumber("abc", -1) returns -1, toNumber(null) returns 0, toNumber(undefined, 7) returns 7, toNumber(true) returns 1.',
      'Напишите функцию toNumber(value, fallback = 0), которая превращает значение в число и возвращает fallback, когда значение нельзя представить как конечное число. Правила: конечное число возвращается как есть, boolean превращается в 1 или 0, null превращается в 0, undefined превращается в fallback, пустая строка или строка из пробелов превращается в fallback, и любая другая строка, из которой не получается число, тоже превращается в fallback. Infinity и NaN также дают fallback. Пример: toNumber("42") возвращает 42, toNumber(" 3.5 ") возвращает 3.5, toNumber("12px") возвращает 0, toNumber("abc", -1) возвращает -1, toNumber(null) возвращает 0, toNumber(undefined, 7) возвращает 7, toNumber(true) возвращает 1.'
    ),
    hint: L(
      'Use typeof to branch, trim the string before converting it, and check the result with Number.isFinite instead of comparing with NaN.',
      'Используйте typeof для ветвления, обрежьте строку перед преобразованием и проверяйте результат через Number.isFinite, а не сравнением с NaN.'
    ),
    solution: `function toNumber(value, fallback = 0) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (value === null) {
    return 0;
  }
  if (value === undefined) {
    return fallback;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return fallback;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

console.log(toNumber('42')); // 42
console.log(toNumber(' 3.5 ')); // 3.5
console.log(toNumber('12px')); // 0
console.log(toNumber('abc', -1)); // -1
console.log(toNumber(null)); // 0
console.log(toNumber(undefined, 7)); // 7
console.log(toNumber(true)); // 1`,
    explanation: L(
      'Number() alone is not enough, because it happily turns "" into 0 and "12px" into NaN, and it throws away the reason of the failure. The function therefore branches on the type of the input and keeps the rule for every case explicit. Trimming the string first makes " 3.5 " work, and Number.isFinite rejects both NaN and Infinity in one check, so the fallback is used exactly when the value is not a usable number.',
      'Одного Number() мало: он спокойно превращает "" в 0, а "12px" в NaN, и заодно теряет причину неудачи. Поэтому функция разветвляется по типу входных данных и для каждого случая правило задано явно. Обрезка строки позволяет работать с " 3.5 ", а Number.isFinite одной проверкой отбрасывает и NaN, и Infinity, поэтому fallback используется ровно тогда, когда число непригодно.'
    ),
  },
  {
    id: 'topic-types-4',
    moduleId: 'js-core',
    topic: 'types',
    level: 'intermediate',
    title: L('Compare two JSON structures', 'Сравнить две JSON-структуры'),
    brief: L(
      'Write a function isSameJson(a, b) that compares two JSON compatible values. The order of the object keys does not matter, the order of the array items does, and a key whose value is undefined is treated as if the key was not there at all. Example: isSameJson({ b: 1, a: [1, { d: 4, c: 3 }] }, { a: [1, { c: 3, d: 4 }], b: 1 }) returns true, isSameJson([1, 2], [2, 1]) returns false, isSameJson({ a: 1 }, { a: 1, b: undefined }) returns true, isSameJson(1, "1") returns false.',
      'Напишите функцию isSameJson(a, b), которая сравнивает два совместимых с JSON значения. Порядок ключей объекта не важен, порядок элементов массива важен, а ключ со значением undefined считается отсутствующим. Пример: isSameJson({ b: 1, a: [1, { d: 4, c: 3 }] }, { a: [1, { c: 3, d: 4 }], b: 1 }) возвращает true, isSameJson([1, 2], [2, 1]) возвращает false, isSameJson({ a: 1 }, { a: 1, b: undefined }) возвращает true, isSameJson(1, "1") возвращает false.'
    ),
    hint: L(
      'First build a canonical copy of every value: arrays are rebuilt item by item, object keys are sorted, undefined values are skipped. Then compare the two canonical copies with JSON.stringify.',
      'Сначала соберите каноническую копию каждого значения: массивы пересобираются по элементам, ключи объектов сортируются, значения undefined пропускаются. Затем сравните две канонические копии через JSON.stringify.'
    ),
    solution: `function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value).sort()) {
      if (value[key] !== undefined) {
        result[key] = canonicalize(value[key]);
      }
    }
    return result;
  }

  return value;
}

function isSameJson(a, b) {
  return JSON.stringify(canonicalize(a)) === JSON.stringify(canonicalize(b));
}

console.log(isSameJson({ b: 1, a: [1, { d: 4, c: 3 }] }, { a: [1, { c: 3, d: 4 }], b: 1 })); // true
console.log(isSameJson([1, 2], [2, 1])); // false
console.log(isSameJson({ a: 1 }, { a: 1, b: undefined })); // true
console.log(isSameJson(1, '1')); // false`,
    explanation: L(
      'JSON.stringify is a fast and reliable way to compare two structures, but it depends on the order of the keys, and two objects with the same content can have the keys in a different order. The canonicalize function removes that difference: it rebuilds every object with sorted keys, drops the keys whose value is undefined and keeps the arrays in their original order. After that the two strings are equal exactly when the values are equal, and a number and a string stay different because JSON writes them differently.',
      'JSON.stringify — быстрый и надёжный способ сравнить две структуры, но он зависит от порядка ключей, а у двух объектов с одинаковым содержимым ключи могут идти в разном порядке. Функция canonicalize убирает это различие: она пересобирает каждый объект с отсортированными ключами, выбрасывает ключи со значением undefined и сохраняет порядок элементов массивов. После этого строки равны ровно тогда, когда равны значения, а число и строка остаются разными, потому что JSON пишет их по-разному.'
    ),
  },
  {
    id: 'topic-types-5',
    moduleId: 'js-core',
    topic: 'types',
    level: 'intermediate',
    title: L('Avoid the coercion traps', 'Не попасться на приведение типов'),
    brief: L(
      'The + operator turns numbers into strings when one side is a string, and comparisons convert strings to numbers. Write two functions that avoid both traps. addValues(a, b) always adds numerically: both sides are converted with Number() and the function returns null when one of them is not a finite number. compareNumbers(a, b) compares two values as numbers and returns 1, -1 or 0, and it returns null when one of them is not a finite number. Example: addValues("1", "2") returns 3, addValues(1, "2") returns 3, addValues("a", 2) returns null, compareNumbers("10", "9") returns 1, compareNumbers("10", "10") returns 0.',
      'Оператор + превращает числа в строки, если хотя бы одна сторона строка, а сравнения приводят строки к числам. Напишите две функции, которые обходят обе ловушки. addValues(a, b) всегда складывает числом: обе стороны преобразуются через Number(), а функция возвращает null, если хотя бы одна из них не является конечным числом. compareNumbers(a, b) сравнивает два значения как числа и возвращает 1, -1 или 0, а если одна из сторон не конечное число — тоже null. Пример: addValues("1", "2") возвращает 3, addValues(1, "2") возвращает 3, addValues("a", 2) возвращает null, compareNumbers("10", "9") возвращает 1, compareNumbers("10", "10") возвращает 0.'
    ),
    hint: L(
      'Convert both sides with Number() first, then check them with Number.isFinite before doing any arithmetic or comparison.',
      'Сначала преобразуйте обе стороны через Number(), а потом проверьте их через Number.isFinite до любой арифметики или сравнения.'
    ),
    solution: `function addValues(a, b) {
  const x = Number(a);
  const y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return x + y;
}

function compareNumbers(a, b) {
  const x = Number(a);
  const y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (x === y) return 0;
  return x > y ? 1 : -1;
}

console.log(addValues('1', '2')); // 3
console.log(addValues(1, '2')); // 3
console.log(addValues('a', 2)); // null
console.log(compareNumbers('10', '9')); // 1
console.log(compareNumbers('10', '10')); // 0`,
    explanation: L(
      'The trap in addValues is that "1" + "2" gives "12", because as soon as one operand is a string the + operator switches to concatenation. Converting both sides with Number() first turns the operation back into an addition. The same conversion fixes the comparison: the strings "10" and "9" compare as text, where "1" is smaller than "9", but as numbers 10 is larger than 9. The null result marks a value that could not be converted, so the caller can react instead of getting NaN.',
      'Ловушка в addValues в том, что "1" + "2" даёт "12": как только один операнд строка, оператор + переключается на конкатенацию. Преобразование обеих сторон через Number() возвращает операции смысл сложения. То же преобразование чинит сравнение: строки "10" и "9" сравниваются как текст, где "1" меньше "9", а как числа 10 больше 9. Результат null отмечает значение, которое не удалось преобразовать, чтобы вызывающий код мог отреагировать, а не получить NaN.'
    ),
  },
  {
    id: 'topic-types-6',
    moduleId: 'js-core',
    topic: 'types',
    level: 'advanced',
    title: L('Write type guards', 'Написать функции-проверки типов'),
    brief: L(
      'Write three type guard functions. isString(value) is true only for primitive strings, so a boxed new String("a") is false. isNumber(value) is true only for real numbers: not for numeric strings, not for NaN and not for Infinity. isPlainObject(value) is true only for plain objects, that is for objects created with {} or Object.create(null), but not for arrays, dates, class instances or null. Example: isString("a") returns true, isString(new String("a")) returns false, isNumber(5) returns true, isNumber("5") returns false, isNumber(NaN) returns false, isPlainObject({}) returns true, isPlainObject([]) returns false, isPlainObject(new Date()) returns false.',
      'Напишите три функции-проверки типов. isString(value) истинна только для примитивных строк, поэтому упакованный new String("a") даёт false. isNumber(value) истинна только для настоящих чисел: не для числовых строк, не для NaN и не для Infinity. isPlainObject(value) истинна только для обычных объектов, то есть созданных через {} или Object.create(null), но не для массивов, дат, экземпляров классов и null. Пример: isString("a") возвращает true, isString(new String("a")) возвращает false, isNumber(5) возвращает true, isNumber("5") возвращает false, isNumber(NaN) возвращает false, isPlainObject({}) возвращает true, isPlainObject([]) возвращает false, isPlainObject(new Date()) возвращает false.'
    ),
    hint: L(
      'For the plain object check compare the prototype of the value with Object.prototype, and allow a null prototype as well.',
      'Для проверки обычного объекта сравните прототип значения с Object.prototype и разрешите также null-прототип.'
    ),
    solution: `function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function isPlainObject(value) {
  if (typeof value !== 'object' || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

console.log(isString('a')); // true
console.log(isString(new String('a'))); // false
console.log(isNumber(5)); // true
console.log(isNumber('5')); // false
console.log(isNumber(NaN)); // false
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(new Date())); // false`,
    explanation: L(
      'typeof alone is not precise enough for the object check, because typeof returns "object" for arrays, dates and class instances too. The prototype tells them apart: a plain object inherits directly from Object.prototype, an object created with Object.create(null) has no prototype at all, while an array has Array.prototype and a class instance has its own class prototype. The number guard adds Number.isFinite, because typeof NaN and typeof Infinity are both "number".',
      'Одного typeof мало для проверки объекта, потому что typeof возвращает "object" и для массивов, и для дат, и для экземпляров классов. Прототип их различает: обычный объект наследует напрямую от Object.prototype, объект через Object.create(null) вообще не имеет прототипа, а у массива Array.prototype, у экземпляра класса — прототип самого класса. Проверка числа добавляет Number.isFinite, потому что typeof NaN и typeof Infinity — оба "number".'
    ),
  },
  {
    id: 'topic-types-7',
    moduleId: 'js-core',
    topic: 'types',
    level: 'advanced',
    title: L('Narrow an unknown value', 'Сузить неизвестное значение'),
    brief: L(
      'Write a function parseUser(value) that takes a value of an unknown type (in TypeScript it would be typed as unknown, so nothing about it can be trusted) and returns a user object with the fields id (a number), name (a non-empty string) and email (an optional string). Check every field before you use it, and throw an Error whose message starts with "Invalid user:" when the value does not match the shape. The email key must be absent when the input has no email. Example: parseUser({ id: 1, name: "Ann", email: "ann@example.com" }) returns { id: 1, name: "Ann", email: "ann@example.com" }, parseUser({ id: 2, name: "Bo" }) returns { id: 2, name: "Bo" }, parseUser({ id: "1", name: "Ann" }) throws an Error with a message starting with "Invalid user:", parseUser(null) throws the same error.',
      'Напишите функцию parseUser(value), которая принимает значение неизвестного типа (в TypeScript оно было бы типизировано как unknown, поэтому доверять ему нельзя) и возвращает объект пользователя с полями id (число), name (непустая строка) и email (необязательная строка). Проверяйте каждое поле перед использованием и бросайте Error, сообщение которого начинается с "Invalid user:", если значение не подходит по форме. Ключ email должен отсутствовать, если во входных данных его нет. Пример: parseUser({ id: 1, name: "Ann", email: "ann@example.com" }) возвращает { id: 1, name: "Ann", email: "ann@example.com" }, parseUser({ id: 2, name: "Bo" }) возвращает { id: 2, name: "Bo" }, parseUser({ id: "1", name: "Ann" }) бросает Error с сообщением, начинающимся с "Invalid user:", parseUser(null) бросает такую же ошибку.'
    ),
    hint: L(
      'Narrow step by step: first the value must be a non-array object, then check each field with typeof, and build the result yourself instead of returning the input.',
      'Сужайте по шагам: сначала значение должно быть объектом, не массивом, потом проверьте каждое поле через typeof, а результат соберите сами вместо возврата входных данных.'
    ),
    solution: `function parseUser(value) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Invalid user: expected an object');
  }

  const { id, name, email } = value;

  if (typeof id !== 'number' || !Number.isFinite(id)) {
    throw new Error('Invalid user: id must be a number');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid user: name must be a non-empty string');
  }
  if (email !== undefined && typeof email !== 'string') {
    throw new Error('Invalid user: email must be a string');
  }

  const user = { id, name };
  if (email !== undefined) {
    user.email = email;
  }
  return user;
}

console.log(parseUser({ id: 1, name: 'Ann', email: 'ann@example.com' }));
// { id: 1, name: 'Ann', email: 'ann@example.com' }
console.log(parseUser({ id: 2, name: 'Bo' })); // { id: 2, name: 'Bo' }

try {
  parseUser({ id: '1', name: 'Ann' });
} catch (error) {
  console.log(error.message); // Invalid user: id must be a number
}`,
    explanation: L(
      'Narrowing a value of an unknown type means proving one small fact at a time and stopping at the first failure. The first check proves that the value is an object and not an array, the next three prove the type of every field, and only then the function builds a new object with exactly the allowed fields. The result is not the input object, so extra properties of the input never leak into the result, and the email key is only added when the email was really there.',
      'Сузить значение неизвестного типа — значит доказывать по одному маленькому факту и останавливаться на первом несоответствии. Первая проверка доказывает, что значение — объект, а не массив, следующие три доказывают тип каждого поля, и только потом функция собирает новый объект ровно с разрешёнными полями. Результат — не входной объект, поэтому лишние свойства входа не просачиваются в результат, а ключ email добавляется только тогда, когда email действительно был.'
    ),
  },
  {
    id: 'topic-types-8',
    moduleId: 'js-core',
    topic: 'types',
    level: 'advanced',
    title: L('Handle a union of events', 'Обработать объединение событий'),
    brief: L(
      'Write a function describeEvent(event) that works with a union of three event shapes: { type: "user:created", payload: { id: number, name: string } }, { type: "user:deleted", payload: { id: number } } and { type: "system:ping" } with no payload at all. Switch on the type field, narrow the payload inside every branch and return a readable line: "created user 1 Ann", "deleted user 7" and "ping". Any other type returns "unknown event". Example: describeEvent({ type: "user:created", payload: { id: 1, name: "Ann" } }) returns "created user 1 Ann", describeEvent({ type: "user:deleted", payload: { id: 7 } }) returns "deleted user 7", describeEvent({ type: "system:ping" }) returns "ping", describeEvent({ type: "other" }) returns "unknown event".',
      'Напишите функцию describeEvent(event), которая работает с объединением из трёх форм событий: { type: "user:created", payload: { id: number, name: string } }, { type: "user:deleted", payload: { id: number } } и { type: "system:ping" } вообще без payload. Переключитесь по полю type, сузьте payload внутри каждой ветки и верните читаемую строку: "created user 1 Ann", "deleted user 7" и "ping". Любой другой тип возвращает "unknown event". Пример: describeEvent({ type: "user:created", payload: { id: 1, name: "Ann" } }) возвращает "created user 1 Ann", describeEvent({ type: "user:deleted", payload: { id: 7 } }) возвращает "deleted user 7", describeEvent({ type: "system:ping" }) возвращает "ping", describeEvent({ type: "other" }) возвращает "unknown event".'
    ),
    hint: L(
      'The type field is the discriminator of the union: inside a case branch the payload already has the shape of that case, and the branch without a payload must not read it.',
      'Поле type — это дискриминант объединения: внутри ветки case payload уже имеет форму этой ветки, а в ветке без payload его читать нельзя.'
    ),
    solution: `function describeEvent(event) {
  switch (event.type) {
    case 'user:created': {
      const { id, name } = event.payload;
      return \`created user \${id} \${name}\`;
    }
    case 'user:deleted': {
      const { id } = event.payload;
      return \`deleted user \${id}\`;
    }
    case 'system:ping':
      return 'ping';
    default:
      return 'unknown event';
  }
}

console.log(describeEvent({ type: 'user:created', payload: { id: 1, name: 'Ann' } }));
// created user 1 Ann
console.log(describeEvent({ type: 'user:deleted', payload: { id: 7 } })); // deleted user 7
console.log(describeEvent({ type: 'system:ping' })); // ping
console.log(describeEvent({ type: 'other' })); // unknown event`,
    explanation: L(
      'A union of object types is discriminated by one field, and here that field is type. A switch on it narrows the value in every branch, so the payload of the created event is known to have a name and the payload of the deleted event is known to have only an id, while the ping branch has no payload at all and never reads one. The default branch keeps the function safe for values that arrive from the outside and do not match the union.',
      'Объединение типов объектов различается по одному полю, и здесь это поле type. Переключение по нему сужает значение в каждой ветке: у payload события created известно, что есть name, у payload события deleted — только id, а у ветки ping payload нет вообще, и она его не читает. Ветка default держит функцию в безопасности для значений, пришедших снаружи и не совпадающих с объединением.'
    ),
  },
];
