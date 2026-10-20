import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const arraysTasks: PracticeTask[] = [
  {
    id: 'topic-arrays-1',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'basic',
    title: L('Flatten a nested array', 'Разворачивание вложенного массива'),
    brief: L(
      'Write a function flatten(list) that turns a nested array into a flat one, no matter how deep the nesting is. The order of the elements must be preserved and the input array must not be modified. Example: flatten([1, [2, [3, [4]]]]) returns [1, 2, 3, 4], flatten([1, [2, 3], 4]) returns [1, 2, 3, 4], flatten([]) returns [].',
      'Напишите функцию flatten(list), которая превращает вложенный массив в плоский, сколько бы уровней вложенности ни было. Порядок элементов должен сохраняться, а входной массив не должен изменяться. Пример: flatten([1, [2, [3, [4]]]]) возвращает [1, 2, 3, 4], flatten([1, [2, 3], 4]) возвращает [1, 2, 3, 4], flatten([]) возвращает [].'
    ),
    hint: L(
      'Use recursion: if the current element is an array, flatten it and add the pieces, otherwise add the element itself.',
      'Используйте рекурсию: если текущий элемент — массив, разверните его и добавьте куски, иначе добавьте сам элемент.'
    ),
    solution: `function flatten(list) {
  const result = [];

  for (const item of list) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
console.log(flatten([1, [2, 3], 4])); // [1, 2, 3, 4]
console.log(flatten([])); // []`,
    explanation: L(
      'The function looks at every element and asks one question: is it an array? If yes, the same function is called on it and its pieces are added to the result, if no, the element itself is added. The recursion naturally handles any depth, and because a new result array is created on every call, the input is never touched.',
      'Функция смотрит на каждый элемент и задаёт один вопрос: это массив? Если да, та же функция вызывается на нём и его куски добавляются к результату, если нет — добавляется сам элемент. Рекурсия сама обрабатывает любую глубину, а так как на каждом вызове создаётся новый массив результата, входные данные не меняются.'
    ),
  },
  {
    id: 'topic-arrays-2',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'basic',
    title: L('Split into chunks', 'Разбиение на части'),
    brief: L(
      'Write a function chunk(list, size) that splits a list into sub-arrays of length size. The last chunk may be shorter than size, and if size is 0 or negative the function must return an empty array. Example: chunk([1, 2, 3, 4, 5], 2) returns [[1, 2], [3, 4], [5]], chunk([1, 2, 3], 5) returns [[1, 2, 3]], chunk([], 2) returns [], chunk([1, 2], 0) returns [].',
      'Напишите функцию chunk(list, size), которая разбивает список на подмассивы длины size. Последняя часть может быть короче size, а если size равен 0 или отрицателен, функция должна вернуть пустой массив. Пример: chunk([1, 2, 3, 4, 5], 2) возвращает [[1, 2], [3, 4], [5]], chunk([1, 2, 3], 5) возвращает [[1, 2, 3]], chunk([], 2) возвращает [], chunk([1, 2], 0) возвращает [].'
    ),
    hint: L(
      'Move the start index by size on every step and use slice(start, start + size).',
      'Сдвигайте начальный индекс на size на каждом шаге и используйте slice(start, start + size).'
    ),
    solution: `function chunk(list, size) {
  if (size <= 0) return [];

  const result = [];
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size));
  }
  return result;
}

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(chunk([1, 2, 3], 5)); // [[1, 2, 3]]
console.log(chunk([1, 2], 0)); // []`,
    explanation: L(
      'The loop index is the start of the current chunk and it grows by size each time, so the chunks never overlap and no element is skipped. slice stops at the end of the array on its own, which is exactly what makes the last chunk shorter when the length is not a multiple of size. The guard for size <= 0 prevents an infinite loop.',
      'Индекс цикла — это начало текущей части, и он увеличивается на size, поэтому части не пересекаются и ни один элемент не пропускается. slice сам останавливается на конце массива — именно поэтому последняя часть оказывается короче, если длина не кратна size. Проверка size <= 0 защищает от бесконечного цикла.'
    ),
  },
  {
    id: 'topic-arrays-3',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'basic',
    title: L('Remove duplicates', 'Удаление повторов'),
    brief: L(
      'Write a function unique(list) that returns a new array without duplicates, keeping only the first occurrence of every value and preserving the original order. Numbers and strings are enough. Do not use Set. Example: unique([1, 2, 2, 3, 1]) returns [1, 2, 3], unique(["b", "a", "b"]) returns ["b", "a"], unique([]) returns [].',
      'Напишите функцию unique(list), которая возвращает новый массив без повторов, оставляя только первое вхождение каждого значения и сохраняя исходный порядок. Достаточно чисел и строк. Не используйте Set. Пример: unique([1, 2, 2, 3, 1]) возвращает [1, 2, 3], unique(["b", "a", "b"]) возвращает ["b", "a"], unique([]) возвращает [].'
    ),
    hint: L(
      'Build the result array and check each incoming value with indexOf before pushing it.',
      'Собирайте массив результата и проверяйте каждое значение через indexOf, прежде чем добавлять его.'
    ),
    solution: `function unique(list) {
  const result = [];

  for (const item of list) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return result;
}

console.log(unique([1, 2, 2, 3, 1])); // [1, 2, 3]
console.log(unique(['b', 'a', 'b'])); // ['b', 'a']
console.log(unique([])); // []`,
    explanation: L(
      'The result array doubles as the storage of already seen values: if indexOf returns -1 the value is new and gets pushed, otherwise it is skipped. Since values are only appended, the first occurrence keeps its place and the order of the original array is preserved. The original array is never modified, because everything is read, not written.',
      'Массив результата одновременно служит хранилищем уже встреченных значений: если indexOf возвращает -1, значение новое и добавляется, иначе оно пропускается. Так как значения только дописываются в конец, первое вхождение сохраняет своё место, а порядок исходного массива не меняется. Исходный массив не изменяется: всё только читается.'
    ),
  },
  {
    id: 'topic-arrays-4',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'intermediate',
    title: L('Group by a key function', 'Группировка по функции-ключу'),
    brief: L(
      'Write a function groupBy(list, key) that returns an object where every key produced by key(item) maps to an array of all items with that key. The order of the items inside a group must be the order of the source array, and a group must exist even if it is empty. Example: groupBy([{ g: "x" }, { g: "y" }, { g: "x" }], item => item.g) returns { x: [{ g: "x" }, { g: "x" }], y: [{ g: "y" }] }.',
      'Напишите функцию groupBy(list, key), которая возвращает объект, где каждый ключ, полученный через key(item), отображается в массив всех элементов с этим ключом. Порядок элементов внутри группы должен совпадать с порядком исходного массива, группа должна создаваться, даже если она пустая. Пример: groupBy([{ g: "x" }, { g: "y" }, { g: "x" }], item => item.g) возвращает { x: [{ g: "x" }, { g: "x" }], y: [{ g: "y" }] }.'
    ),
    hint: L(
      'For each item compute the key, then create the group if it does not exist yet and push the item into it.',
      'Для каждого элемента вычислите ключ, затем создайте группу, если её ещё нет, и добавьте элемент в неё.'
    ),
    solution: `function groupBy(list, key) {
  const groups = {};

  for (const item of list) {
    const name = key(item);

    if (!Object.prototype.hasOwnProperty.call(groups, name)) {
      groups[name] = [];
    }
    groups[name].push(item);
  }
  return groups;
}

const people = [{ g: 'x' }, { g: 'y' }, { g: 'x' }];
console.log(groupBy(people, (item) => item.g));`,
    explanation: L(
      'The function asks the key function for the group name of every item and then stores the item in that group, creating the group on the first encounter. Items are pushed in the order they arrive, so each group keeps the source order. Checking the property with hasOwnProperty avoids false hits on inherited names such as constructor.',
      'Функция спрашивает у функции-ключа имя группы для каждого элемента и затем кладёт элемент в эту группу, создавая группу при первом появлении. Элементы добавляются в порядке поступления, поэтому внутри каждой группы сохраняется порядок исходного массива. Проверка через hasOwnProperty исключает ложные срабатывания на унаследованных именах вроде constructor.'
    ),
  },
  {
    id: 'topic-arrays-5',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'intermediate',
    title: L('Rotate an array', 'Циклический сдвиг массива'),
    brief: L(
      'Write a function rotate(list, k) that rotates the list to the right by k positions, so the last elements move to the front. k may be larger than the length of the list, and a negative k rotates to the left. The original array must not be modified. Example: rotate([1, 2, 3, 4, 5], 2) returns [4, 5, 1, 2, 3], rotate([1, 2, 3], -1) returns [2, 3, 1], rotate([1, 2, 3], 0) returns [1, 2, 3], rotate([], 3) returns [].',
      'Напишите функцию rotate(list, k), которая циклически сдвигает список вправо на k позиций, так что последние элементы переходят в начало. k может быть больше длины списка, а отрицательное k сдвигает влево. Исходный массив не должен изменяться. Пример: rotate([1, 2, 3, 4, 5], 2) возвращает [4, 5, 1, 2, 3], rotate([1, 2, 3], -1) возвращает [2, 3, 1], rotate([1, 2, 3], 0) возвращает [1, 2, 3], rotate([], 3) возвращает [].'
    ),
    hint: L(
      'Reduce k to a shift between 0 and list.length - 1 with the formula ((k % len) + len) % len, then cut the array in two and swap the pieces.',
      'Сведите k к сдвигу от 0 до list.length - 1 по формуле ((k % len) + len) % len, затем разрежьте массив на две части и поменяйте их местами.'
    ),
    solution: `function rotate(list, k) {
  if (list.length === 0) return [];

  const shift = ((k % list.length) + list.length) % list.length;
  const cut = list.length - shift;

  return list.slice(cut).concat(list.slice(0, cut));
}

console.log(rotate([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(rotate([1, 2, 3], -1)); // [2, 3, 1]
console.log(rotate([1, 2, 3], 0)); // [1, 2, 3]`,
    explanation: L(
      'A rotation by k is the same as a rotation by k modulo the length, and the double modulo handles negative k as well. After the shift is normalised, the array is cut into two pieces at position length - shift, and those pieces are swapped. slice and concat build a new array, so the source stays untouched.',
      'Сдвиг на k равносилен сдвигу на k по модулю длины, а двойной остаток корректно обрабатывает и отрицательное k. После нормализации сдвига массив разрезается на две части в позиции length - shift, и части меняются местами. slice и concat строят новый массив, поэтому исходный не меняется.'
    ),
  },
  {
    id: 'topic-arrays-6',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'advanced',
    title: L('Top N numbers', 'N наибольших чисел'),
    brief: L(
      'Write a function topN(list, n) that returns the n largest numbers of the list in descending order. If n is larger than the list, return all numbers sorted; if n is 0 or negative, return an empty array. The input array must not be modified. Example: topN([3, 1, 5, 2, 4], 3) returns [5, 4, 3], topN([3, 1, 2], 5) returns [3, 2, 1], topN([3, 1, 2], 0) returns [].',
      'Напишите функцию topN(list, n), которая возвращает n наибольших чисел списка в порядке убывания. Если n больше длины списка, верните все числа, отсортированные по убыванию; если n равен 0 или отрицателен — пустой массив. Входной массив не должен изменяться. Пример: topN([3, 1, 5, 2, 4], 3) возвращает [5, 4, 3], topN([3, 1, 2], 5) возвращает [3, 2, 1], topN([3, 1, 2], 0) возвращает [].'
    ),
    hint: L(
      'Copy the array first, sort the copy in descending order with a comparator, and then cut off the first n elements.',
      'Сначала скопируйте массив, отсортируйте копию по убыванию через функцию сравнения, затем возьмите первые n элементов.'
    ),
    solution: `function topN(list, n) {
  if (n <= 0) return [];

  const copy = list.slice();
  copy.sort((a, b) => b - a);

  return copy.slice(0, n);
}

console.log(topN([3, 1, 5, 2, 4], 3)); // [5, 4, 3]
console.log(topN([3, 1, 2], 5)); // [3, 2, 1]
console.log(topN([3, 1, 2], 0)); // []`,
    explanation: L(
      'The comparator (a, b) => b - a tells sort to order numbers in descending order, because it must return a negative number when a should come first. The sort runs on a copy created with slice, so the array the caller passed stays in its original order. slice(0, n) then simply trims the result, and it handles n larger than the length without any extra check.',
      'Функция сравнения (a, b) => b - a велит sort расположить числа по убыванию: она должна вернуть отрицательное число, когда a должно идти раньше. Сортировка выполняется на копии, созданной через slice, поэтому массив вызывающего остаётся в исходном порядке. Затем slice(0, n) обрезает результат и сама корректно обрабатывает n больше длины.'
    ),
  },
  {
    id: 'topic-arrays-7',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'advanced',
    title: L('Transpose a matrix', 'Транспонирование матрицы'),
    brief: L(
      'Write a function transpose(matrix) that swaps rows and columns of a rectangular matrix, so the result has as many rows as the original matrix has columns. All rows of the input must have the same length. The input must not be modified. Example: transpose([[1, 2, 3], [4, 5, 6]]) returns [[1, 4], [2, 5], [3, 6]], transpose([[1]]) returns [[1]], transpose([]) returns [].',
      'Напишите функцию transpose(matrix), которая меняет местами строки и столбцы прямоугольной матрицы, так что в результате строк столько же, сколько столбцов в исходной матрице. Все строки входной матрицы должны быть одинаковой длины. Входные данные не должны изменяться. Пример: transpose([[1, 2, 3], [4, 5, 6]]) возвращает [[1, 4], [2, 5], [3, 6]], transpose([[1]]) возвращает [[1]], transpose([]) возвращает [].'
    ),
    hint: L(
      'The outer loop runs over the columns of the original matrix, the inner loop collects one cell of that column from every row.',
      'Внешний цикл идёт по столбцам исходной матрицы, внутренний собирает по одной ячейке этого столбца из каждой строки.'
    ),
    solution: `function transpose(matrix) {
  if (matrix.length === 0) return [];

  const columns = matrix[0].length;
  const result = [];

  for (let c = 0; c < columns; c++) {
    const row = [];
    for (let r = 0; r < matrix.length; r++) {
      row.push(matrix[r][c]);
    }
    result.push(row);
  }
  return result;
}

console.log(transpose([[1, 2, 3], [4, 5, 6]])); // [[1, 4], [2, 5], [3, 6]]
console.log(transpose([[1]])); // [[1]]
console.log(transpose([])); // []`,
    explanation: L(
      'The result matrix has one row per column of the source, so the outer loop iterates over the column indexes and the inner loop walks down the rows picking matrix[r][c]. Reading the cells in this order gives exactly the transposed matrix, and because a brand new array is created for every column, the source matrix is never modified.',
      'В результирующей матрице на каждую строку исходной приходится столбец, поэтому внешний цикл идёт по индексам столбцов, а внутренний спускается по строкам и забирает matrix[r][c]. Чтение ячеек в таком порядке и даёт транспонированную матрицу, а так как для каждого столбца создаётся новый массив, исходная матрица не изменяется.'
    ),
  },
  {
    id: 'topic-arrays-8',
    moduleId: 'js-core',
    topic: 'arrays',
    level: 'advanced',
    title: L('Dedupe by a key', 'Удаление повторов по ключу'),
    brief: L(
      'Write a function dedupeBy(list, key) that keeps only the first item of every key value and drops the later ones. The key function returns the value to compare by, and the order of the kept items must be the order of the source array. Example: dedupeBy([{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }], item => item.id) returns [{ id: 1, n: "a" }, { id: 2, n: "b" }], dedupeBy([], item => item.id) returns [].',
      'Напишите функцию dedupeBy(list, key), которая оставляет только первый элемент для каждого значения ключа, а последующие отбрасывает. Функция-ключ возвращает значение для сравнения, а порядок оставленных элементов должен совпадать с порядком исходного массива. Пример: dedupeBy([{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }], item => item.id) возвращает [{ id: 1, n: "a" }, { id: 2, n: "b" }], dedupeBy([], item => item.id) возвращает [].'
    ),
    hint: L(
      'Keep a Map of the key values you have already taken and push the item only on the first encounter of its key.',
      'Храните Map уже взятых значений ключа и добавляйте элемент только при первом появлении его ключа.'
    ),
    solution: `function dedupeBy(list, key) {
  const taken = new Map();
  const result = [];

  for (const item of list) {
    const value = key(item);

    if (!taken.has(value)) {
      taken.set(value, item);
      result.push(item);
    }
  }
  return result;
}

const rows = [
  { id: 1, n: 'a' },
  { id: 2, n: 'b' },
  { id: 1, n: 'c' },
];
console.log(dedupeBy(rows, (item) => item.id));`,
    explanation: L(
      'For every item the key function produces a value, and the Map remembers which values have already been taken. The first item with a given value is pushed into the result and recorded, every later item with the same value is skipped. Because items are processed in source order and only ever appended, the result keeps the original order.',
      'Для каждого элемента функция-ключ выдаёт значение, а Map запоминает, какие значения уже были взяты. Первый элемент с таким значением попадает в результат и записывается в Map, все последующие с тем же значением пропускаются. Так как элементы обрабатываются в исходном порядке и только добавляются в конец, результат сохраняет порядок источника.'
    ),
  },
];
