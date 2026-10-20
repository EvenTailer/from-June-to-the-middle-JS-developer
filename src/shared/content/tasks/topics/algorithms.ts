import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const algorithmsTasks: PracticeTask[] = [
  {
    id: 'topic-algorithms-1',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'basic',
    title: L('Match brackets with a stack', 'Проверить скобки стеком'),
    brief: L(
      'Write a function isBalanced(text) that returns true when every bracket of the text is closed in the right order, and a function findMismatch(text) that returns the index of the first closing bracket that does not match the last opened bracket, or -1 when there is no such bracket. The brackets are the round, the square and the curly ones, and every other character is ignored. A closing bracket that has no open bracket is a mismatch as well, and text with brackets that stay open is not balanced but has no mismatching closing bracket. Example: isBalanced("(a + b) [c]") returns true, isBalanced("([)]") returns false, findMismatch("([)]") returns 2 and isBalanced("(a") returns false.',
      'Напишите функцию isBalanced(text), которая возвращает true, когда каждая скобка текста закрыта в правильном порядке, и функцию findMismatch(text), которая возвращает индекс первой закрывающей скобки, не совпадающей с последней открытой, или -1, если такой скобки нет. Скобки круглые, квадратные и фигурные, а все остальные символы игнорируются. Закрывающая скобка без открытой тоже считается несовпадением, а текст с незакрытыми скобками не сбалансирован, но несовпадающей закрывающей скобки в нём нет. Пример: isBalanced("(a + b) [c]") возвращает true, isBalanced("([)]") возвращает false, findMismatch("([)]") возвращает 2, а isBalanced("(a") возвращает false.'
    ),
    hint: L(
      'Push the opening brackets onto a stack, and on every closing bracket compare it with the top of the stack: it has to be the matching pair.',
      'Кладите открывающие скобки в стек и при каждой закрывающей сравнивайте её с вершиной стека: должна быть соответствующая пара.'
    ),
    solution: `const PAIRS = {
  ')': '(',
  ']': '[',
  '}': '{',
};

const OPENING = new Set(['(', '[', '{']);

function findMismatch(text) {
  const stack = [];

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (OPENING.has(char)) {
      stack.push(char);
      continue;
    }

    if (!(char in PAIRS)) continue;

    if (stack.pop() !== PAIRS[char]) {
      return index;
    }
  }

  return -1;
}

function isBalanced(text) {
  if (findMismatch(text) !== -1) return false;
  const stack = [];
  for (const char of text) {
    if (OPENING.has(char)) stack.push(char);
    else if (char in PAIRS) stack.pop();
  }
  return stack.length === 0;
}

console.log(isBalanced('(a + b) [c]')); // true
console.log(isBalanced('([)]')); // false
console.log(findMismatch('([)]')); // 2
console.log(isBalanced('(a')); // false`,
    explanation: L(
      'The stack is the natural structure here, because the bracket that must be closed next is always the one that was opened last. On every closing bracket the top of the stack is compared with the expected opening bracket, and a difference means the order is broken. The pop returns the removed bracket, so the check is a single comparison. The final check of the stack length catches the brackets that were never closed, which is why "(a" is not balanced even though no closing bracket was wrong.',
      'Стек здесь естественен, потому что закрыть следующей нужно всегда ту скобку, которая открылась последней. При каждой закрывающей вершина стека сравнивается с ожидаемой открывающей, и разница означает, что порядок нарушен. pop возвращает снятую скобку, поэтому проверка укладывается в одно сравнение. Итоговая проверка длины стека ловит незакрытые скобки, поэтому "(a" не сбалансировано, хотя ни одна закрывающая не была неверной.'
    ),
  },
  {
    id: 'topic-algorithms-2',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'basic',
    title: L('Build a queue on an array', 'Сделать очередь на массиве'),
    brief: L(
      'Write a function createQueue() that returns a queue built on an array. The queue has enqueue(item), dequeue(), peek(), size() and isEmpty(). The first item that was enqueued is the first one that is dequeued, so the queue is first in first out. dequeue on an empty queue returns undefined, peek returns the first item without removing it and returns undefined on an empty queue, size returns the number of waiting items and isEmpty returns true when there is nothing to take. Example: after enqueue(1) and enqueue(2) the dequeue returns 1, peek returns 2, size returns 1 and isEmpty returns false.',
      'Напишите функцию createQueue(), которая возвращает очередь, построенную на массиве. У очереди есть enqueue(item), dequeue(), peek(), size() и isEmpty(). Первый добавленный элемент первым и забирается, то есть очередь работает по принципу первым пришёл — первым ушёл. dequeue пустой очереди возвращает undefined, peek возвращает первый элемент, не забирая его, и undefined для пустой очереди, size возвращает число ожидающих элементов, а isEmpty возвращает true, когда брать нечего. Пример: после enqueue(1) и enqueue(2) dequeue возвращает 1, peek возвращает 2, size возвращает 1, а isEmpty возвращает false.'
    ),
    hint: L(
      'Keep the items in an array, push at the end for enqueue, and shift from the front for dequeue. Track the size with a counter so that the queue does not scan the array.',
      'Храните элементы в массиве, добавляйте push в конец для enqueue и забирайте shift с начала для dequeue. Считайте размер счётчиком, чтобы очередь не просматривала массив.'
    ),
    solution: `function createQueue() {
  const items = [];
  let head = 0;

  return {
    enqueue(item) {
      items.push(item);
      return items.length - head;
    },
    dequeue() {
      if (head >= items.length) return undefined;
      const item = items[head];
      items[head] = undefined;
      head += 1;
      return item;
    },
    peek() {
      if (head >= items.length) return undefined;
      return items[head];
    },
    size() {
      return items.length - head;
    },
    isEmpty() {
      return head >= items.length;
    },
  };
}

const queue = createQueue();
queue.enqueue(1);
queue.enqueue(2);

console.log(queue.dequeue()); // 1
console.log(queue.peek()); // 2
console.log(queue.size()); // 1
console.log(queue.isEmpty()); // false`,
    explanation: L(
      'An array is a stack for free, but a queue needs both ends. The head index moves forward instead of removing the first element with shift, so the cost of a dequeue stays constant and the already taken slots are simply marked as free. The size is the length of the array minus the head, which is the number of items that are really waiting. The consumed slots are never cleaned up, so a long living queue that grows and shrinks a lot would need a compaction step from time to time.',
      'Массив бесплатно даёт стек, но для очереди нужны оба конца. Индекс head двигается вперёд вместо удаления первого элемента через shift, поэтому стоимость dequeue остаётся постоянной, а занятые слоты просто помечаются как свободные. Размер — это длина массива минус head, то есть число действительно ожидающих элементов. Израсходованные слоты не убираются, поэтому у долгоживущей очереди с большими колебаниями размера нужна периодическая уборка.'
    ),
  },
  {
    id: 'topic-algorithms-3',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'basic',
    title: L('Find a value with binary search', 'Найти значение бинарным поиском'),
    brief: L(
      'Write a function binarySearch(sorted, target) that looks for a target in an array of numbers sorted in ascending order and returns its index, or -1 when the target is not in the array. The function must halve the range on every step, so it may compare the target with at most ceil(log2(n + 1)) elements, and it must not use indexOf or includes. Example: binarySearch([1, 3, 5, 7, 9], 5) returns 2, binarySearch([1, 3, 5], 4) returns -1, binarySearch([], 1) returns -1 and binarySearch([1, 1, 1], 1) returns the index of the first such element, which is 0.',
      'Напишите функцию binarySearch(sorted, target), которая ищет значение в массиве чисел, отсортированном по возрастанию, и возвращает его индекс, или -1, если значения в массиве нет. Функция должна делить диапазон пополам на каждом шаге, поэтому она сравнивает цель не более чем с ceil(log2(n + 1)) элементами, и не должна использовать indexOf или includes. Пример: binarySearch([1, 3, 5, 7, 9], 5) возвращает 2, binarySearch([1, 3, 5], 4) возвращает -1, binarySearch([], 1) возвращает -1, а binarySearch([1, 1, 1], 1) возвращает индекс первого такого элемента, то есть 0.'
    ),
    hint: L(
      'Keep the left and right borders, look at the middle element and throw away the half that cannot contain the target.',
      'Держите левую и правую границы, смотрите на средний элемент и отбрасывайте половину, в которой цели точно нет.'
    ),
    solution: `function binarySearch(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;
  let found = -1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    const value = sorted[middle];

    if (value === target) {
      found = middle;
      right = middle - 1;
    } else if (value < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return found;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearch([1, 3, 5], 4)); // -1
console.log(binarySearch([], 1)); // -1
console.log(binarySearch([1, 1, 1], 1)); // 0`,
    explanation: L(
      'The sorted order is the whole trick: after one comparison half of the remaining elements is known to be useless, so it is dropped. That turns the number of steps into a logarithm of the length, and for a million elements it is about twenty comparisons instead of a million. The middle index is computed with left plus half of the distance, which keeps it an integer and works for any range. When the target is found the search continues to the left, so the function returns the first of the equal elements and not an arbitrary one.',
      'Вся магия в отсортированности: после одного сравнения половина оставшихся элементов заведомо лишняя, и её отбрасывают. Поэтому число шагов становится логарифмом длины, и для миллиона элементов это около двадцати сравнений вместо миллиона. Индекс середины считается как left плюс половина расстояния, поэтому он всегда целый и работает для любого диапазона. Когда цель найдена, поиск продолжается влево, поэтому функция возвращает первый из равных элементов, а не произвольный.'
    ),
  },
  {
    id: 'topic-algorithms-4',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'intermediate',
    title: L('Sort numbers with two algorithms', 'Отсортировать числа двумя алгоритмами'),
    brief: L(
      'Write a function bubbleSort(values) and a function quickSort(values) that sort an array of numbers in ascending order and return a new array, leaving the original array untouched. Both functions must handle duplicates and negative numbers, and both must return an empty array for an empty input. Quick sort must pick a pivot, put the smaller numbers on the left and the bigger numbers on the right. Example: bubbleSort([3, -1, 3, 2]) returns [-1, 2, 3, 3] and quickSort([5, 2, 9, 1]) returns [1, 2, 5, 9], and the array that was passed in is still [5, 2, 9, 1] after the call.',
      'Напишите функцию bubbleSort(values) и функцию quickSort(values), которые сортируют массив чисел по возрастанию и возвращают новый массив, не меняя исходный. Обе функции должны работать с повторами и отрицательными числами и возвращать пустой массив для пустого ввода. Быстрая сортировка должна выбирать опорный элемент, оставлять меньшие числа слева, а большие справа. Пример: bubbleSort([3, -1, 3, 2]) возвращает [-1, 2, 3, 3], а quickSort([5, 2, 9, 1]) возвращает [1, 2, 5, 9], причём переданный массив после вызова всё ещё [5, 2, 9, 1].'
    ),
    hint: L(
      'Bubble sort compares the neighbours and swaps them while they are out of order. Quick sort partitions the array around a pivot and sorts the two parts recursively.',
      'Пузырьковая сортировка сравнивает соседей и меняет их местами, пока они не в порядке. Быстрая сортировка делит массив вокруг опорного элемента и сортирует части рекурсивно.'
    ),
    solution: `function bubbleSort(values) {
  const result = Array.from(values);

  for (let pass = 0; pass < result.length - 1; pass += 1) {
    let swapped = false;
    for (let index = 0; index < result.length - 1 - pass; index += 1) {
      if (result[index] > result[index + 1]) {
        const temp = result[index];
        result[index] = result[index + 1];
        result[index + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }

  return result;
}

function quickSort(values) {
  if (values.length <= 1) return Array.from(values);

  const pivot = values[0];
  const left = [];
  const right = [];

  for (let index = 1; index < values.length; index += 1) {
    if (values[index] < pivot) left.push(values[index]);
    else right.push(values[index]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const source = [5, 2, 9, 1];
console.log(bubbleSort([3, -1, 3, 2])); // [ -1, 2, 3, 3 ]
console.log(quickSort(source)); // [ 1, 2, 5, 9 ]
console.log(source); // [ 5, 2, 9, 1 ]`,
    explanation: L(
      'Bubble sort is the simple one: after every pass the largest remaining value has moved to the end, and the flag tells the algorithm to stop early when a pass changed nothing. It needs the square of n comparisons, which is fine for a few elements and too slow for a large array. Quick sort takes a pivot, splits the rest into the smaller and the bigger values and sorts both parts, so it needs about n times log n operations on average. Both functions copy the input first, so the caller keeps the original array.',
      'Пузырьковая сортировка — простая: после каждого прохода наибольшее оставшееся значение оказывается в конце, а флаг сообщает алгоритму остановиться раньше, если проход ничего не изменил. Ей нужно квадрат n сравнений, и для нескольких элементов это нормально, а для большого массива медленно. Быстрая сортировка берёт опорный элемент, делит остальные на меньшие и большие и сортирует обе части, поэтому в среднем ей нужно примерно n умножить на log n операций. Обе функции сначала копируют вход, поэтому у вызывающего остаётся исходный массив.'
    ),
  },
  {
    id: 'topic-algorithms-5',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'intermediate',
    title: L('Search a binary search tree', 'Найти значение в бинарном дереве'),
    brief: L(
      'Write a function searchBST(root, target) that looks for a value in a binary search tree and returns the node with that value, or null when there is no such node. A node is an object { value, left, right } and the children are null when they are missing. The function must not walk the whole tree: at every step it continues only into the left subtree when the target is smaller and only into the right subtree when the target is bigger. Also write a function inorder(root) that returns the values of the tree in the ascending order. Example: the tree { value: 8, left: { value: 3, left: null, right: null }, right: { value: 10, left: null, right: null } } gives the node with the value 8 for the target 8, null for the target 7 and inorder returns [3, 8, 10].',
      'Напишите функцию searchBST(root, target), которая ищет значение в бинарном дереве поиска и возвращает узел с этим значением, или null, если такого узла нет. Узел — это объект { value, left, right }, а дети равны null, когда их нет. Функция не должна обходить всё дерево: на каждом шаге она продолжает только в левое поддерево, когда цель меньше, и только в правое, когда цель больше. Также напишите функцию inorder(root), которая возвращает значения дерева по возрастанию. Пример: дерево { value: 8, left: { value: 3, left: null, right: null }, right: { value: 10, left: null, right: null } } даёт узел со значением 8 для цели 8, null для цели 7, а inorder возвращает [3, 8, 10].'
    ),
    hint: L(
      'Compare the value of the node with the target and descend into one branch only. The inorder walk is the same descent, but it collects the left subtree, the node and the right subtree.',
      'Сравните значение узла с целью и спускайтесь только по одной ветви. Обход inorder — такой же спуск, но он собирает левое поддерево, узел и правое поддерево.'
    ),
    solution: `function searchBST(root, target) {
  let node = root;

  while (node !== null && node !== undefined) {
    if (node.value === target) return node;
    node = target < node.value ? node.left : node.right;
  }

  return null;
}

function inorder(root) {
  if (root === null || root === undefined) return [];

  return [
    ...inorder(root.left),
    root.value,
    ...inorder(root.right),
  ];
}

const tree = {
  value: 8,
  left: { value: 3, left: null, right: null },
  right: { value: 10, left: null, right: null },
};

console.log(searchBST(tree, 8).value); // 8
console.log(searchBST(tree, 7)); // null
console.log(inorder(tree)); // [ 3, 8, 10 ]`,
    explanation: L(
      'The search is a loop instead of a recursion, so a deep tree cannot blow the call stack. The ordering rule of the tree is what makes the search fast: one comparison tells which half can be thrown away, so the number of visited nodes is the height of the tree and not its size. The inorder walk visits the left subtree, the node and the right subtree, and because of the ordering rule the result is always sorted, which makes it a handy way to check the tree.',
      'Поиск сделан циклом, а не рекурсией, поэтому глубокое дерево не переполнит стек вызовов. Правило упорядоченности дерева и делает поиск быстрым: одно сравнение говорит, какую половину можно выбросить, поэтому посещённых узлов столько, сколько высота дерева, а не его размер. Обход inorder посещает левое поддерево, узел и правое поддерево, и благодаря правилу упорядоченности результат всегда отсортирован, что удобно для проверки дерева.'
    ),
  },
  {
    id: 'topic-algorithms-6',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'advanced',
    title: L('Rotate a matrix by 90 degrees', 'Повернуть матрицу на 90 градусов'),
    brief: L(
      'Write a function rotate90(matrix) that returns a new matrix rotated by 90 degrees clockwise. The input is an array of arrays where every row has the same length, and the result must have the same shape as the input. The original matrix must not be changed, and the function must not use the transpose and the reverse of the rows as separate steps. Example: rotate90([[1, 2], [3, 4]]) returns [[3, 1], [4, 2]], rotate90([[1, 2, 3], [4, 5, 6]]) returns [[4, 1], [5, 2], [6, 3]] and rotate90([[1]]) returns [[1]].',
      'Напишите функцию rotate90(matrix), которая возвращает новую матрицу, повёрнутую на 90 градусов по часовой стрелке. Вход — массив массивов, где во всех строках одинаковая длина, и результат должен иметь ту же форму, что и вход. Исходная матрица меняться не должна, а функция не должна использовать транспонирование и разворот строк как отдельные шаги. Пример: rotate90([[1, 2], [3, 4]]) возвращает [[3, 1], [4, 2]], rotate90([[1, 2, 3], [4, 5, 6]]) возвращает [[4, 1], [5, 2], [6, 3]], а rotate90([[1]]) возвращает [[1]].'
    ),
    hint: L(
      'The element at the column index in the result is the element at the mirrored row index in the source. Build the result row by row and read the source column by column.',
      'Элемент с индексом колонки в результате — это элемент с зеркальным индексом строки в исходной матрице. Собирайте результат по строкам и читайте исходник по колонкам.'
    ),
    solution: `function rotate90(matrix) {
  const rows = matrix.length;
  const columns = rows === 0 ? 0 : matrix[0].length;
  const result = [];

  for (let row = 0; row < columns; row += 1) {
    const newRow = [];
    for (let sourceRow = rows - 1; sourceRow >= 0; sourceRow -= 1) {
      newRow.push(matrix[sourceRow][row]);
    }
    result.push(newRow);
  }

  return result;
}

const source = [[1, 2], [3, 4]];
console.log(rotate90(source)); // [ [ 3, 1 ], [ 4, 2 ] ]
console.log(source); // [ [ 1, 2 ], [ 3, 4 ] ]`,
    explanation: L(
      'After a clockwise turn the first row of the result is the first column of the source read from the bottom up. The outer loop walks over the columns of the source and therefore builds the rows of the result, and the inner loop walks over the rows of the source from the last one to the first one. A new array is created for every row, so the input matrix stays untouched and the result has exactly the same shape.',
      'После поворота по часовой стрелке первая строка результата — это первый столбец исходника, прочитанный снизу вверх. Внешний цикл идёт по столбцам исходника и поэтому строит строки результата, а внутренний цикл идёт по строкам исходника с последней к первой. Для каждой строки создаётся новый массив, поэтому входная матрица не меняется и результат имеет ровно ту же форму.'
    ),
  },
  {
    id: 'topic-algorithms-7',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'advanced',
    title: L('Search a substring with a prefix table', 'Найти подстроку через префикс-таблицу'),
    brief: L(
      'Write a function indexOfSubstring(haystack, needle) that returns the index of the first occurrence of needle in haystack, or -1 when there is no occurrence. The function must not use indexOf, includes, lastIndexOf or a regular expression, it has to build its own comparison table so that the characters of a repeated pattern are not compared again from the start. An empty needle returns 0, and a needle longer than the haystack returns -1. Example: indexOfSubstring("hello world", "world") returns 6, indexOfSubstring("aaaaa", "aaa") returns 0, indexOfSubstring("abc", "d") returns -1, indexOfSubstring("mississippi", "issip") returns 4 and indexOfSubstring("abc", "") returns 0.',
      'Напишите функцию indexOfSubstring(haystack, needle), которая возвращает индекс первого вхождения needle в haystack, или -1, если вхождения нет. Функция не должна использовать indexOf, includes, lastIndexOf или регулярное выражение, она обязана строить собственную таблицу сравнений, чтобы символы повторяющегося шаблона не сравнивались заново с начала. Пустая искомая строка даёт 0, а искомая строка длиннее haystack даёт -1. Пример: indexOfSubstring("hello world", "world") возвращает 6, indexOfSubstring("aaaaa", "aaa") возвращает 0, indexOfSubstring("abc", "d") возвращает -1, indexOfSubstring("mississippi", "issip") возвращает 4, а indexOfSubstring("abc", "") возвращает 0.'
    ),
    hint: L(
      'Build the prefix function of the needle: for every prefix, store the length of the longest proper prefix that is also a suffix. When a character does not match, jump back by that length instead of by one.',
      'Постройте префикс-функцию искомой строки: для каждого префикса сохраните длину самого длинного собственного префикса, который одновременно является суффиксом. При несовпадении символа отступайте на эту длину, а не на один.'
    ),
    solution: `function buildPrefixTable(needle) {
  const table = new Array(needle.length).fill(0);

  for (let index = 1; index < needle.length; index += 1) {
    let length = table[index - 1];
    while (length > 0 && needle[index] !== needle[length]) {
      length = table[length - 1];
    }
    if (needle[index] === needle[length]) {
      length += 1;
    }
    table[index] = length;
  }

  return table;
}

function indexOfSubstring(haystack, needle) {
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;

  const table = buildPrefixTable(needle);
  let matched = 0;

  for (let index = 0; index < haystack.length; index += 1) {
    while (matched > 0 && haystack[index] !== needle[matched]) {
      matched = table[matched - 1];
    }
    if (haystack[index] === needle[matched]) {
      matched += 1;
    }
    if (matched === needle.length) {
      return index - needle.length + 1;
    }
  }

  return -1;
}

console.log(indexOfSubstring('hello world', 'world')); // 6
console.log(indexOfSubstring('aaaaa', 'aaa')); // 0
console.log(indexOfSubstring('abc', 'd')); // -1
console.log(indexOfSubstring('mississippi', 'issip')); // 4
console.log(indexOfSubstring('abc', '')); // 0`,
    explanation: L(
      'A naive search restarts the comparison from the first character of the needle after every mismatch, and on a text like "aaaaaaa" that makes the search quadratic. The prefix table stores, for every prefix of the needle, how many characters at its end match the beginning of the needle, so a mismatch only costs a jump back instead of a restart. The inner while loop walks the table down, which is what keeps the total number of comparisons linear in the length of the text.',
      'Наивный поиск после каждого несовпадения начинает сравнение заново с первого символа искомой строки, и на тексте вида "aaaaaaa" это делает поиск квадратичным. Префикс-таблица хранит для каждого префикса искомой строки, сколько символов в его конце совпадает с началом искомой строки, поэтому при несовпадении нужен только откат, а не перезапуск. Внутренний цикл while спускается по таблице, и именно это удерживает общее число сравнений линейным по длине текста.'
    ),
  },
  {
    id: 'topic-algorithms-8',
    moduleId: 'js-core',
    topic: 'algorithms',
    level: 'advanced',
    title: L('Compare the cost of two implementations', 'Сравнить стоимость двух реализаций'),
    brief: L(
      'Write a function withCallCount(fn) that returns a wrapped function that behaves exactly like fn but counts the calls, and the number of calls is available in the property calls of the wrapper. Then write a function hasDuplicatesQuadratic(values, isEqual) that compares every pair of values with the comparison function isEqual, which defaults to a strict equality, and returns true when two of them are equal. Also write a function hasDuplicates(values) that does the same with a Set in a single pass. Finally write a function countPairs(n) that returns the number of comparisons the quadratic version needs, n * (n - 1) / 2. Example: the calls property of withCallCount((a, b) => a === b) is 0 before the first call and 1 after it, passing that counted comparison to hasDuplicatesQuadratic([1, 2, 3, 4], compare) makes the calls property equal 6, hasDuplicates([1, 2, 1]) returns true and countPairs(4) returns 6.',
      'Напишите функцию withCallCount(fn), которая возвращает обёртку, работающую ровно как fn, но считающую вызовы, и число вызовов доступно в свойстве calls обёртки. Затем напишите функцию hasDuplicatesQuadratic(values, isEqual), которая сравнивает каждую пару значений функцией сравнения isEqual, а по умолчанию строгим равенством, и возвращает true, когда два из них равны. Также напишите функцию hasDuplicates(values), которая делает то же самое через Set за один проход. Наконец напишите функцию countPairs(n), которая возвращает число сравнений, нужных квадратичной версии, n * (n - 1) / 2. Пример: свойство calls у withCallCount((a, b) => a === b) равно 0 до первого вызова и 1 после него, а если передать это посчитанное сравнение в hasDuplicatesQuadratic([1, 2, 3, 4], compare), то свойство calls станет равно 6, hasDuplicates([1, 2, 1]) возвращает true, а countPairs(4) возвращает 6.'
    ),
    hint: L(
      'The wrapper is a function that increments its own counter and then calls the original function. Wrap a comparison function to measure how many comparisons an implementation really performs.',
      'Обёртка — это функция, которая увеличивает свой счётчик, а затем вызывает исходную функцию. Оберните функцию сравнения, чтобы измерить, сколько сравнений на самом деле делает реализация.'
    ),
    solution: `function withCallCount(fn) {
  const wrapper = (...args) => {
    wrapper.calls += 1;
    return fn(...args);
  };

  wrapper.calls = 0;

  return wrapper;
}

function hasDuplicatesQuadratic(values, isEqual = (a, b) => a === b) {
  for (let first = 0; first < values.length; first += 1) {
    for (let second = first + 1; second < values.length; second += 1) {
      if (isEqual(values[first], values[second])) return true;
    }
  }
  return false;
}

function hasDuplicates(values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) return true;
    seen.add(value);
  }
  return false;
}

function countPairs(n) {
  return (n * (n - 1)) / 2;
}

const compare = withCallCount((a, b) => a === b);

console.log(hasDuplicatesQuadratic([1, 2, 3, 4], compare)); // false
console.log(compare.calls); // 6
console.log(countPairs(4)); // 6
console.log(hasDuplicates([1, 2, 1])); // true
console.log(hasDuplicates([1, 2, 3])); // false`,
    explanation: L(
      'The wrapper is a tiny piece of instrumentation: it counts the calls and then delegates to the original function, so the measured code is unchanged. The quadratic version needs a comparison for every pair, and countPairs gives that number as a formula, which is what makes the difference visible. The linear version keeps a Set of the values it has already seen, so every element is compared once against the set and the whole check is one pass. For a thousand elements the quadratic version does almost half a million comparisons, the linear one about a thousand.',
      'Обёртка — это маленький прибор для измерений: она считает вызовы и передаёт их исходной функции, так что измеряемый код не меняется. Квадратичной версии нужно сравнение для каждой пары, а countPairs даёт это число формулой, и именно так разница становится заметной. Линейная версия держит Set уже встреченных значений, поэтому каждый элемент сравнивается с множеством один раз и вся проверка — это один проход. Для тысячи элементов квадратичная версия делает почти полмиллиона сравнений, а линейная — около тысячи.'
    ),
  },
];
