import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh13: Chapter = {
  id: 'js-core-ch13',
  title: L('Algorithms and data structures', 'Алгоритмы и структуры данных'),
  summary: L(
    'How to estimate the cost of an algorithm and how to build the core data structures of JavaScript yourself: stacks, queues, hash maps, searching and sorting, recursion and memoization.',
    'Как оценивать стоимость алгоритма и как самостоятельно строить базовые структуры данных JavaScript: стек, очередь, хеш-таблицы, поиск и сортировку, рекурсию и мемоизацию.'
  ),
  sections: [
    {
      id: 'js-core-ch13-s1',
      title: L('Complexity and Big-O', 'Сложность и O-большая'),
      body: L(
        'Complexity measures how the cost of an algorithm grows with the size of the input, not how many milliseconds it takes on your laptop. Time complexity counts the elementary steps, memory complexity counts the extra space the algorithm allocates beyond the input. The notation is O, read as big O, and it hides the constants: an O(n) algorithm with a heavy constant can be slower than an O(n log n) algorithm for small n.\n\nThe ladder of classes you will actually meet is short. O(1) is a constant number of steps, such as reading a key from a hash map or taking the last element of an array. O(log n) is a halving search, so a binary search over a million elements takes about twenty steps. O(n) is a linear scan. O(n log n) is what a comparison sort costs. O(n^2) is quadratic, a double loop over every pair, and O(2^n) doubles the work at every level of the recursion.\n\nEvery algorithm has a best, an average and a worst case, and the worst case is the one that sets the guarantee. Sorting is the classic example: quicksort is O(n log n) on average but O(n^2) on already sorted input with a naive pivot. The hash table is the other: average O(1), worst O(n) when every key lands in the same bucket.\n\nAsymptotics describe the limit, not the real workload, so a narrow case can beat a better class. A quadratic scan over twenty items costs four hundred comparisons, while a sorting algorithm with overhead can lose on the same twenty items. The most valuable optimisation is not a clever algorithm but a lookup structure: a nested loop over pairs runs O(n^2), and if you keep a Set of the values already seen, the inner loop disappears and the total becomes O(n). Measure before you trade readability away.',
        'Сложность измеряет, как растёт стоимость алгоритма с размером входных данных, а не сколько миллисекунд это заняло на вашем ноутбуке. Временная сложность считает элементарные шаги, пространственная — дополнительную память сверх входных данных. Запись O читается как «О-большая» и прячет константы: алгоритм O(n) с тяжёлой константой может быть медленнее алгоритма O(n log n) на малом n.\n\nЛестница классов, с которой вы реально сталкиваетесь, короткая. O(1) — постоянное число шагов, например чтение ключа из хеш-таблицы или взятие последнего элемента массива. O(log n) — поиск делением пополам, поэтому бинарный поиск по миллиону элементов делает около двадцати шагов. O(n) — линейный проход. O(n log n) — цена сортировки сравнениями. O(n^2) — квадратичная сложность, двойной цикл по всем парам, а O(2^n) удваивает работу на каждом уровне рекурсии.\n\nУ каждого алгоритма есть лучший, средний и худший случаи, и именно худший задаёт гарантию. Сортировка — классический пример: быстрая сортировка в среднем O(n log n), но на уже отсортированных данных при наивном выборе опорного элемента она даёт O(n^2). Хеш-таблица — второй пример: в среднем O(1), в худшем O(n), когда все ключи попадают в одну корзину.\n\nАсимптотика описывает предел, а не реальную нагрузку, поэтому узкий случай может обойти класс лучше. Квадратичный перебор двадцати элементов стоит четыреста сравнений, а сортировка с накладными расходами на подготовку проиграет на тех же двадцати элементах. Самая ценная оптимизация — не хитрый алгоритм, а структура для поиска: вложенный цикл по парам работает за O(n^2), а если хранить Set уже просмотренных значений, внутренний цикл исчезает и итог становится O(n). Меняйте читаемость на скорость только после замеров.'
      ),
      bullets: [
        L('O(1) constant, O(log n) halving, O(n) linear, O(n log n) comparison sort, O(n^2) quadratic, O(2^n) exponential.', 'O(1) постоянная, O(log n) логарифм, O(n) линейная, O(n log n) сортировка, O(n^2) квадратичная, O(2^n) экспонента.'),
        L('Big O hides the constants, so on small input the order of two algorithms can invert.', 'Big O прячет константы, поэтому на малом входе порядок двух алгоритмов может поменяться.'),
        L('The worst case is the one that sets the guarantee you can promise.', 'Худший случай — тот, который задаёт гарантию, которую вы можете дать.'),
        L('Keeping a Set of seen values turns an O(n^2) pair search into O(n).', 'Set уже просмотренных значений превращает поиск пары из O(n^2) в O(n).'),
        L('Estimate your own code by counting the nesting of loops and the recursion branches.', 'Оценивайте свой код по вложенности циклов и ветвлениям рекурсии.'),
      ],
      code: `function findPairWithSum(numbers, target) {
  const seen = new Set();
  for (const value of numbers) {
    if (seen.has(target - value)) return true;
    seen.add(value);
  }
  return false;
}

// The same search without a Set is a double loop: O(n^2)
function findPairSlow(numbers, target) {
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = i + 1; j < numbers.length; j += 1) {
      if (numbers[i] + numbers[j] === target) return true;
    }
  }
  return false;
}`,
      table: {
        caption: L('The complexity ladder', 'Лестница сложности'),
        headers: [L('Complexity', 'Сложность'), L('Name', 'Название'), L('Example', 'Пример'), L('Steps for n = 1000', 'Шагов при n = 1000')],
        rows: [
          [L('O(1)', 'O(1)'), L('Constant', 'Постоянная'), L('Map.get, array last element', 'Map.get, последний элемент массива'), L('1', '1')],
          [L('O(log n)', 'O(log n)'), L('Logarithmic', 'Логарифмическая'), L('Binary search', 'Бинарный поиск'), L('about 10', 'около 10')],
          [L('O(n)', 'O(n)'), L('Linear', 'Линейная'), L('Array.find, forEach', 'Array.find, forEach'), L('1000', '1000')],
          [L('O(n log n)', 'O(n log n)'), L('Linearithmic', 'Линейно-логарифмическая'), L('Array.prototype.sort', 'Array.prototype.sort'), L('about 10000', 'около 10000')],
          [L('O(n^2)', 'O(n^2)'), L('Quadratic', 'Квадратичная'), L('Nested loops over pairs', 'Вложенные циклы по парам'), L('1000000', '1000000')],
          [L('O(2^n)', 'O(2^n)'), L('Exponential', 'Экспоненциальная'), L('Naive subset enumeration', 'Наивный перебор подмножеств'), L('far beyond reach', 'за пределами разумного')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Big O is not a benchmark', 'Big O — это не бенчмарк'),
          text: L(
            'The notation only ranks growth rates. Two algorithms of the same class can differ by a factor of ten in practice, and a slow linear scan can beat a fast sort on a thousand items. Measure the real workload before you rewrite anything.',
            'Запись только ранжирует темпы роста. Два алгоритма одного класса могут отличаться на практике в десять раз, а медленный линейный проход обгонит быструю сортировку на тысяче элементов. Замеряйте реальную нагрузку, прежде чем что-то переписывать.'
          ),
        },
        {
          tone: 'tip',
          title: L('A Set is the cheapest optimisation', 'Set — самая дешёвая оптимизация'),
          text: L(
            'Before you write a nested loop, ask which of the inner values you have already computed. Storing them in a Set or a Map usually removes one loop level and turns the complexity down by one whole class.',
            'Прежде чем писать вложенный цикл, спросите, какие из внутренних значений вы уже вычисляли. Хранение их в Set или Map обычно убирает один уровень цикла и опускает сложность на целый класс.'
          ),
        },
      ],
      takeaway: L(
        'Estimate complexity by counting nested loops, and remove the inner loop with a Set before you reach for anything clever.',
        'Оценивайте сложность по вложенным циклам и убивайте внутренний цикл через Set раньше, чем возьмётесь за что-то хитрое.'
      ),
      seeAlso: [
        L('Section 13-3: hash maps, Map and Set', 'Секция 13-3: хеш-таблицы, Map и Set'),
        L('Section 13-4: searching and sorting from scratch', 'Секция 13-4: поиск и сортировка с нуля'),
      ],
    },
    {
      id: 'js-core-ch13-s2',
      title: L('Stacks and queues', 'Стек и очередь'),
      body: L(
        'A stack is a last in, first out collection, and an array implements it in two lines: push adds to the end and pop removes from the end. A queue is first in, first out, so the element that arrived first has to leave first. With an array the naive implementation pushes to the end and shifts from the front, and shift is O(n) because every remaining element has to be moved one position to the left.\n\nThat cost is why a queue built on shift degrades quickly: enqueue stays O(1) but dequeue is O(n), so draining a queue of n items costs O(n^2). The classic fix keeps a head index and increments it instead of shifting, occasionally compacting the array. A linked list gives the real O(1) queue, because removing the head means changing one pointer, but it costs an object per element and loses random access.\n\nA ring buffer is a fixed-size circular array: the head and the tail move forward and wrap around to the beginning when they reach the end. It is the standard structure for a bounded queue, a log buffer or a network frame buffer, and it never allocates after construction, which is why it shows up in systems with real-time constraints.\n\nThe call stack of the JavaScript engine is a stack, and so is the chain of pending jobs in a promise pipeline. Expressions are parsed with a stack too: the classic bracket-matching algorithm pushes every opening bracket and pops it when the matching closing one arrives, and an empty stack at the end means the sequence was balanced. The same two operations drive depth-first search on a tree and breadth-first search on a graph, where the frontier is a queue rather than a stack.',
        'Стек — это структура «последним пришёл, первым ушёл», и массив реализует её в две строки: push добавляет в конец, pop удаляет с конца. Очередь — «первым пришёл, первым ушёл», поэтому элемент, попавший первым, должен выйти первым. С массивом наивная реализация делает push в конец и shift с начала, а shift работает за O(n), потому что каждый оставшийся элемент нужно сдвинуть на одну позицию влево.\n\nИменно поэтому очередь на shift деградирует быстро: enqueue остаётся O(1), но dequeue стоит O(n), и вычистка очереди из n элементов обходится в O(n^2). Классическое решение — хранить индекс начала и увеличивать его вместо сдвига, изредка сжимая массив. Связный список даёт настоящую очередь за O(1), потому что удаление головы меняет одну ссылку, но платит объектом на элемент и теряет случайный доступ.\n\nКольцевой буфер — это фиксированный циклический массив: голова и хвост идут вперёд и переходят на начало, когда достигают конца. Это стандартная структура для ограниченной очереди, буфера логов или буфера сетевых кадров, и она не выделяет память после создания, поэтому и встречается в системах с требованиями реального времени.\n\nСтек вызовов движка JavaScript — это стек, как и цепочка отложенных задач в конвейере промисов. Выражения тоже разбираются со стеком: классический алгоритм проверки скобок кладёт каждую открывающую скобку в стек и снимает при встрече парной закрывающей, и пустой стек в конце означает сбалансированную последовательность. Те же две операции дают обход дерева в глубину и обход графа в ширину, где фронт — это очередь, а не стек.'
      ),
      bullets: [
        L('A stack is LIFO: push and pop both work on the end of an array in O(1).', 'Стек — LIFO: push и pop работают с концом массива за O(1).'),
        L('shift on an array is O(n) because it moves every remaining element.', 'shift на массиве стоит O(n), потому что двигает все оставшиеся элементы.'),
        L('A head index or a linked list keeps dequeue at O(1).', 'Индекс начала или связный список удерживают dequeue на O(1).'),
        L('A ring buffer wraps around a fixed array and never allocates after creation.', 'Кольцевой буфер закольцовывается на фиксированном массиве и не выделяет память.'),
        L('Bracket matching and depth-first search use a stack, breadth-first search uses a queue.', 'Проверка скобок и обход в глубину используют стек, обход в ширину — очередь.'),
      ],
      code: `const stack = [];                 // LIFO
stack.push('a');
stack.pop();                      // 'b'

const items = [];                 // FIFO with a head index
let head = 0;
items.push('first');
items.push('second');
const first = items[head++];      // 'first'

const openers = '([{';            // bracket matching
const closers = { ')': '(', ']': '[', '}': '{' };
const brackets = [];
for (const ch of 'a(b)c') {
  if (openers.includes(ch)) brackets.push(ch);
  else if (ch in closers && brackets.pop() !== closers[ch]) throw new Error('unbalanced');
}`,
      table: {
        caption: L('Stack against queue', 'Стек против очереди'),
        headers: [L('Property', 'Свойство'), L('Stack (LIFO)', 'Стек (LIFO)'), L('Queue (FIFO)', 'Очередь (FIFO)')],
        rows: [
          [L('Order', 'Порядок'), L('Last in, first out', 'Последним пришёл, первым ушёл'), L('First in, first out', 'Первым пришёл, первым ушёл')],
          [L('Array implementation', 'Реализация на массиве'), L('push and pop on the end', 'push и pop на конце'), L('push plus a head index', 'push плюс индекс начала')],
          [L('Typical use', 'Типичное применение'), L('Undo stack, call stack, depth-first search', 'Стек отмены, стек вызовов, обход в глубину'), L('Job queue, breadth-first search', 'Очередь задач, обход в ширину')],
          [L('Main pitfall', 'Главная ловушка'), L('Grows without a bound', 'Растёт без ограничения'), L('shift is O(n) on an array', 'shift на массиве стоит O(n)')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('shift is a hidden quadratic', 'shift — это скрытая квадратика'),
          text: L(
            'A queue written as items.push(x) and items.shift() is O(n) per dequeue, so the whole loop becomes O(n^2) and the constant factor of the copy is brutal. Use a head index, or a ring buffer when the size is bounded.',
            'Очередь, написанная как items.push(x) и items.shift(), стоит O(n) на каждое извлечение, поэтому весь цикл становится O(n^2) плюс дорогое копирование. Используйте индекс начала или кольцевой буфер, если размер ограничен.'
          ),
        },
        {
          tone: 'note',
          title: L('The call stack is a real stack', 'Стек вызовов — это настоящий стек'),
          text: L(
            'Every nested call pushes a frame and every return pops one. That is why recursion costs stack memory and why an infinite recursion ends as a RangeError instead of hanging forever.',
            'Каждый вложенный вызов кладёт кадр, и каждый возврат снимает его. Поэтому рекурсия тратит память стека и почему бесконечная рекурсия заканчивается RangeError, а не зависает навсегда.'
          ),
        },
      ],
      takeaway: L(
        'Use push and pop for a stack, push plus a head index for a queue, and never call shift on a queue that matters.',
        'Для стека используйте push и pop, для очереди push плюс индекс начала и никогда не вызывайте shift в важной очереди.'
      ),
      seeAlso: [
        L('Section 13-5: recursion, memoization and common patterns', 'Секция 13-5: рекурсия, мемоизация и типовые приёмы'),
        L('Chapter 8: loops, iterators and generators', 'Глава 8: циклы, итераторы и генераторы'),
        L('Chapter 11: the event loop, promises and async/await', 'Глава 11: цикл событий, промисы и async/await'),
      ],
    },
    {
      id: 'js-core-ch13-s3',
      title: L('Hash maps: Map and Set', 'Хеш-таблицы: Map и Set'),
      body: L(
        'A hash table stores key-value pairs and computes a numeric position for each key with a hash function, so a lookup touches a few buckets instead of every entry. JavaScript gives you two implementations of that idea: plain objects, which use string and symbol keys, and the Map class, which accepts any value as a key and preserves insertion order.\n\nMap adds the operations you would otherwise write by hand: get, set, has, delete and clear, plus a size property. Keys are compared by identity for objects, so two structurally equal objects are two different keys. The same rule applies to Set, which stores unique values using SameValueZero, where NaN equals NaN and +0 equals -0, so both of them collapse into a single entry.\n\nObjects have two footguns that Map does not. The prototype chain means an object inherits properties such as toString and constructor, so "toString" in obj is true even when the object never had that key. Key order for an object is also surprising: integer-like keys come first in ascending numeric order, and the string keys follow in insertion order, while a Map always preserves pure insertion order.\n\nObject.fromEntries builds an object from pairs and Object.entries converts an object back into pairs, so a Map and an object convert into each other in one line. Choose a Map when the keys are not strings, when you add and delete a lot, when you need a stable iteration order, or when the keys come from user input and could collide with inherited names. Choose an object for plain records with string keys and for JSON, where a Map cannot be represented at all.',
        'Хеш-таблица хранит пары ключ-значение и вычисляет для каждого ключа числовую позицию хеш-функцией, поэтому поиск затрагивает несколько корзин, а не все записи. В JavaScript есть две реализации этой идеи: обычные объекты, где ключи — строки и символы, и класс Map, который принимает в качестве ключа любое значение и сохраняет порядок вставки.\n\nMap добавляет операции, которые иначе пришлось бы писать руками: get, set, has, delete и clear, плюс свойство size. Объекты сравниваются по идентичности, поэтому два структурно равных объекта — это два разных ключа. То же правило действует для Set, который хранит уникальные значения по SameValueZero, где NaN равен NaN, а +0 равен -0, так что оба значения схлопываются в одну запись.\n\nУ объектов есть две ловушки, которых нет у Map. Цепочка прототипов означает, что объект наследует свойства вроде toString и constructor, поэтому "toString" in obj истинно, даже если такого ключа у объекта никогда не было. Порядок ключей объекта тоже удивляет: целочисленные ключи идут первыми по возрастанию, строковые следом в порядке вставки, а Map всегда хранит чистый порядок вставки.\n\nObject.fromEntries строит объект из пар, а Object.entries превращает объект обратно в пары, так что Map и объект конвертируются друг в друга одной строкой. Выбирайте Map, когда ключи не строковые, когда вы много добавляете и удаляете, когда нужен стабильный порядок обхода или когда ключи приходят от пользователя и могут совпасть с унаследованными именами. Выбирайте объект для обычных записей со строковыми ключами и для JSON, где Map не представим вообще.'
      ),
      bullets: [
        L('Map accepts any key type, an object accepts only string and symbol keys.', 'Map принимает любой тип ключей, объект — только строки и символы.'),
        L('Map preserves insertion order for every kind of key.', 'Map сохраняет порядок вставки для любого типа ключей.'),
        L('Map.get returns undefined for a missing key, so use has when undefined is a valid value.', 'Map.get возвращает undefined для отсутствующего ключа, поэтому при значении undefined используйте has.'),
        L('Set stores unique values with SameValueZero, so NaN appears only once.', 'Set хранит уникальные значения по SameValueZero, поэтому NaN встречается один раз.'),
        L('Objects inherit properties, so use Object.hasOwn or a Map for untrusted keys.', 'Объекты наследуют свойства, поэтому для недоверенных ключей используйте Object.hasOwn или Map.'),
        L('Map operations are O(1) on average and O(n) in the worst case.', 'Операции Map стоят O(1) в среднем и O(n) в худшем случае.'),
      ],
      code: `const map = new Map();
map.set('a', 1).set('b', 2);
map.get('a');        // 1
map.has('missing');  // false
map.size;            // 2

const key = { id: 1 };
map.set(key, 'object key');
map.get({ id: 1 });  // undefined - a different key

const set = new Set([1, 2, 2, NaN, NaN]);
set.size;            // 3 - duplicates and NaN collapse

const obj = { a: 1 };
obj.toString;              // inherited from the prototype
Object.hasOwn(obj, 'toString'); // false

const pairs = new Map([['x', 1], ['y', 2]]);
Object.fromEntries(pairs); // { x: 1, y: 2 }`,
      table: {
        caption: L('Plain object against Map', 'Обычный объект против Map'),
        headers: [L('Aspect', 'Аспект'), L('Plain object', 'Обычный объект'), L('Map', 'Map')],
        rows: [
          [L('Key types', 'Типы ключей'), L('String and symbol', 'Строка и символ'), L('Any value', 'Любое значение')],
          [L('Iteration order', 'Порядок обхода'), L('Integer keys first, then strings', 'Сначала целочисленные, потом строки'), L('Insertion order', 'Порядок вставки')],
          [L('Inherited keys', 'Унаследованные ключи'), L('Yes, from the prototype', 'Да, от прототипа'), L('No', 'Нет')],
          [L('Size', 'Размер'), L('Object.keys(obj).length', 'Object.keys(obj).length'), L('map.size', 'map.size')],
          [L('Serialisation', 'Сериализация'), L('JSON.stringify works', 'JSON.stringify работает'), L('JSON.stringify gives {}', 'JSON.stringify даёт {}')],
          [L('Lookup cost', 'Стоимость поиска'), L('Average O(1)', 'В среднем O(1)'), L('Average O(1)', 'В среднем O(1)')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('get cannot see a stored undefined', 'get не отличит сохранённый undefined'),
          text: L(
            'map.get(missing) and map.get(keyWithUndefinedValue) both return undefined, so a truthiness check silently treats a real value as absent. Use map.has(key) when undefined is a legitimate value in your data.',
            'map.get(missing) и map.get(ключСUndefined) возвращают одно и то же undefined, поэтому проверка на истинность принимает реальное значение за отсутствующее. Используйте map.has(key), если undefined в ваших данных допустим.'
          ),
        },
        {
          tone: 'note',
          title: L('The engine hides the collisions', 'Движок прячет коллизии'),
          text: L(
            'Two different keys can hash to the same bucket, and the engine resolves it internally with a chain. That is why the average lookup is O(1) while the worst case is O(n): the bucket you hit happens to be crowded.',
            'Два разных ключа могут дать одинаковый хеш и попасть в одну корзину, а движок разруливает это внутри через цепочку. Именно поэтому средний поиск стоит O(1), а худший O(n): корзина, в которую вы попали, оказалась переполненной.'
          ),
        },
      ],
      takeaway: L(
        'Use a Map for non-string keys, untrusted keys and stable ordering, and check has when undefined can be a real value.',
        'Используйте Map для нестроковых ключей, недоверенных ключей и стабильного порядка, а при значении undefined проверяйте has.'
      ),
      seeAlso: [
        L('Chapter 5: objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
        L('Section 13-1: complexity and Big-O', 'Секция 13-1: сложность и O-большая'),
        L('Chapter 7: arrays and collection methods', 'Глава 7: массивы и методы коллекций'),
      ],
    },
    {
      id: 'js-core-ch13-s4',
      title: L('Searching and sorting from scratch', 'Поиск и сортировка с нуля'),
      body: L(
        'A linear search walks the array and compares each element with the target. It is O(n), it needs no preparation, and it is the right answer for a small array or an unsorted one. A binary search needs the array sorted, then compares the middle element with the target: if the middle is too small, the target can only be in the right half, and if it is too large, only in the left half. Every step halves the candidate range, so the search is O(log n).\n\nThe boundaries are where binary search goes wrong. With inclusive bounds, low starts at 0 and high at length minus 1, mid is low plus half the distance to high so it cannot overflow, and the loop ends when low passes high. An off-by-one in any of the three produces an infinite loop or a missed element. The same algorithm with the comparison changed gives a lower bound: the index of the first element that is not less than the target, which is how you find the insertion point without inserting anything.\n\nSorting is where the complexity numbers come from. Any comparison-based sort needs about n log n comparisons in the worst case, and Array.prototype.sort reaches that bound. Merge sort splits the array in half, sorts both halves and merges them in linear time, which makes it O(n log n) guaranteed and stable, but it needs O(n) extra space for the merge buffer. Quicksort picks a pivot, partitions the array and recurses on both parts: O(n log n) on average and in place, but O(n^2) on already sorted input with a naive pivot.\n\nStability means that equal elements keep their original relative order, and it matters whenever the sort key is not unique. Array.prototype.sort has been stable since ES2019, so you can sort by one key and then by another and the first ordering survives inside each group. Sorting objects is the same call with a comparator: items.sort((a, b) => a.age - b.age).',
        'Линейный поиск проходит по массиву и сравнивает каждый элемент с целью. Это O(n), подготовка не нужна, и для небольшого или неотсортированного массива это верный ответ. Бинарный поиск требует отсортированный массив и сравнивает середину с целью: если середина меньше, цель может быть только в правой половине, а если больше — только в левой. Каждый шаг вдвое сокращает диапазон кандидатов, поэтому поиск стоит O(log n).\n\nГраницы — вот где бинарный поиск ошибается. При включительных границах low начинается с 0, а high с длины минус один, mid равна low плюс половина расстояния до high, чтобы не было переполнения, а цикл заканчивается, когда low проходит high. Ошибка на единицу в любой из трёх величин даёт бесконечный цикл или пропущенный элемент. Тот же алгоритм с изменённым сравнением даёт lower bound: индекс первого элемента, который не меньше цели, и этим находят точку вставки без самой вставки.\n\nСортировка — источник классических оценок сложности. Любая сортировка сравнениями требует примерно n log n сравнений в худшем случае, и Array.prototype.sort достигает этой границы. Сортировка слиянием делит массив пополам, сортирует обе половины и сливает их за линейное время, что даёт гарантированные O(n log n) и стабильность, но требует O(n) дополнительной памяти на буфер слияния. Быстрая сортировка выбирает опорный элемент, делит массив и рекурсивно обрабатывает обе части: в среднем O(n log n) и на месте, но O(n^2) на уже отсортированных данных при наивном выборе опоры.\n\nСтабильность означает, что равные элементы сохраняют исходный относительный порядок, и это важно, когда ключ сортировки не уникален. Array.prototype.sort стабилен начиная с ES2019, поэтому можно отсортировать по одному ключу, потом по другому, и первая сортировка сохранится внутри каждой группы. Сортировка объектов — тот же вызов с компаратором: items.sort((a, b) => a.age - b.age).'
      ),
      bullets: [
        L('Linear search is O(n) and works on unsorted data.', 'Линейный поиск стоит O(n) и работает на неотсортированных данных.'),
        L('Binary search is O(log n) but requires a sorted array.', 'Бинарный поиск стоит O(log n), но требует отсортированный массив.'),
        L('A binary search on unsorted data returns wrong answers instead of failing loudly.', 'Бинарный поиск по неотсортированным данным вернёт неверный ответ, а не ошибку.'),
        L('Merge sort is O(n log n) guaranteed and stable, quicksort is O(n log n) on average.', 'Сортировка слиянием гарантированно O(n log n) и стабильна, быстрая — в среднем O(n log n).'),
        L('Array.prototype.sort has been stable since ES2019.', 'Array.prototype.sort стабилен начиная с ES2019.'),
      ],
      code: `function binarySearch(sorted, target) {
  let low = 0, high = sorted.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
binarySearch([1, 3, 5, 7, 9], 7); // 3

function lowerBound(sorted, target) {
  let low = 0, high = sorted.length;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (sorted[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}
lowerBound([1, 3, 3, 7], 3); // 1`,
      table: {
        caption: L('Searching and sorting algorithms', 'Алгоритмы поиска и сортировки'),
        headers: [L('Algorithm', 'Алгоритм'), L('Complexity', 'Сложность'), L('Needs sorted input?', 'Нужен отсортированный вход?'), L('Stable?', 'Стабильна?')],
        rows: [
          [L('Linear search', 'Линейный поиск'), L('O(n)', 'O(n)'), L('No', 'Нет'), L('Not applicable', 'Не применимо')],
          [L('Binary search', 'Бинарный поиск'), L('O(log n)', 'O(log n)'), L('Yes', 'Да'), L('Not applicable', 'Не применимо')],
          [L('Merge sort', 'Сортировка слиянием'), L('O(n log n)', 'O(n log n)'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('Quicksort', 'Быстрая сортировка'), L('O(n log n) average, O(n^2) worst', 'O(n log n) в среднем, O(n^2) в худшем'), L('No', 'Нет'), L('No', 'Нет')],
          [L('Array.prototype.sort', 'Array.prototype.sort'), L('O(n log n)', 'O(n log n)'), L('No', 'Нет'), L('Yes, since ES2019', 'Да, с ES2019')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Binary search on unsorted data fails silently', 'Бинарный поиск по неотсортированным данным падает молча'),
          text: L(
            'The algorithm never checks whether the input is sorted, so it does not throw. It just returns -1 for a value that is present, and the bug surfaces somewhere else entirely. Sort first, or use a linear search for small arrays.',
            'Алгоритм не проверяет, отсортирован ли вход, поэтому он не бросает исключение. Он просто возвращает -1 для присутствующего значения, и баг всплывает совсем в другом месте. Сначала отсортируйте или используйте линейный поиск для маленьких массивов.'
          ),
        },
        {
          tone: 'tip',
          title: L('lowerBound instead of hand-written insertion', 'lowerBound вместо ручной вставки'),
          text: L(
            'When you need to know where a value belongs, lowerBound gives you the insertion index in O(log n) and works for a value that is already present, which a naive "find the first greater element" loop gets wrong.',
            'Когда нужно узнать, где значение должно лежать, lowerBound даёт индекс вставки за O(log n) и работает и для уже присутствующего значения, на чём ошибается наивный цикл «найди первый больший элемент».'
          ),
        },
      ],
      takeaway: L(
        'Binary search requires a sorted array and exact boundaries, and use lowerBound when you need the insertion point.',
        'Бинарный поиск требует отсортированного массива и точных границ, а для точки вставки используйте lowerBound.'
      ),
      seeAlso: [
        L('Section 13-1: complexity and Big-O', 'Секция 13-1: сложность и O-большая'),
        L('Chapter 7: arrays and collection methods', 'Глава 7: массивы и методы коллекций'),
        L('Chapter 10: numbers, math, dates and Intl', 'Глава 10: числа, математика, даты и Intl'),
      ],
    },
    {
      id: 'js-core-ch13-s5',
      title: L('Recursion, memoization and common patterns', 'Рекурсия, мемоизация и типовые приёмы'),
      body: L(
        'A recursive function calls itself with a smaller version of the problem, and it always needs a base case that stops the recursion. Every call keeps its own copy of the arguments on the call stack, and when the stack grows past the engine limit you get a RangeError about the maximum call stack size. The practical limit is not a number worth memorising: it depends on the frame size, and it sits somewhere between a few thousand and a few tens of thousands of frames.\n\nRecursion fits naturally on trees. A depth-first traversal visits a node, then each child subtree, and the order in which you take the children decides whether the result is pre-order, in-order or post-order. The same shape works for flattening nested structures, for parsing and for the directory walking that a file watcher performs.\n\nMemoization stores the result of a pure function so that repeated calls with the same arguments return the cached value. The cache key has to be derived from the arguments, and the usual approach is a Map whose key is the arguments joined by a separator, with care taken that the separator cannot occur inside an argument. Memoization turns an exponential recursion into a polynomial one: the naive recursion for counting the ways to climb n stairs costs 2^n, while the memoised version costs n.\n\nDynamic programming is memoization with a deliberate order: the problem is split into overlapping subproblems, each solved once, and the results are combined from the bottom up. Coin change, the stairs problem and the longest common subsequence are standard examples. Backtracking is different: it explores a search space and prunes branches that cannot lead to a valid answer. Recursion is not always the right tool: when the recursive call is the last statement, it is a loop written the hard way, and rewriting it removes the stack frames and the overflow risk.',
        'Рекурсивная функция вызывает сама себя с меньшей версией задачи, и у неё всегда есть базовый случай, который останавливает рекурсию. Каждый вызов хранит собственную копию аргументов в стеке вызовов, и когда стек перерастает предел движка, вы получаете RangeError про максимальный размер стека. Практический предел — не то число, которое стоит запоминать: он зависит от размера кадра и находится где-то между несколькими тысячами и несколькими десятками тысяч кадров.\n\nРекурсия естественно ложится на деревья. Обход в глубину посещает узел, затем каждое поддерево, и порядок обхода детей определяет, будет результат предобходом, инобходом или постобходом. Та же форма подходит для выравнивания вложенных структур, для разбора и для обхода каталогов, который делает наблюдатель за файлами.\n\nМемоизация сохраняет результат чистой функции, чтобы повторные вызовы с теми же аргументами возвращали кэшированное значение. Ключ кэша нужно вывести из аргументов, и обычный подход — Map, у которого ключ получается склейкой аргументов разделителем, причём разделитель не должен встречаться внутри аргумента. Мемоизация превращает экспоненциальную рекурсию в полиномиальную: наивная рекурсия для подсчёта способов подняться по n ступенькам стоит 2^n, а мемоизированная стоит n.\n\nДинамическое программирование — это мемоизация с осознанным порядком: задача разбивается на пересекающиеся подзадачи, каждая решается один раз, а результаты собираются снизу вверх. Размен монет, задача о ступеньках и наибольшая общая подпоследовательность — стандартные примеры. Перебор с отсечением устроен иначе: он исследует пространство решений и отсекает ветви, которые не могут привести к верному ответу. Рекурсия — не всегда подходящий инструмент: когда рекурсивный вызов стоит последним оператором, это цикл, написанный трудным способом, и переписывание убирает кадры стека и риск переполнения.'
      ),
      bullets: [
        L('Every recursion needs a base case, otherwise the stack overflows with a RangeError.', 'У каждой рекурсии нужен базовый случай, иначе стек переполнится с RangeError.'),
        L('Each recursive call occupies one stack frame until it returns.', 'Каждый рекурсивный вызов занимает один кадр стека до своего возврата.'),
        L('Memoization needs a pure function and a reliable key derived from the arguments.', 'Мемоизация требует чистой функции и надёжного ключа, выведенного из аргументов.'),
        L('Memoizing the stairs recursion turns 2^n into n.', 'Мемоизация задачи о ступеньках превращает 2^n в n.'),
        L('A recursion whose only call is the last statement is a loop written the hard way.', 'Рекурсия, где единственный вызов стоит последним оператором, — это цикл, написанный трудным способом.'),
      ],
      code: `function climbStairs(n, cache = new Map()) {
  if (n <= 1) return 1;
  if (cache.has(n)) return cache.get(n);
  const ways = climbStairs(n - 1, cache) + climbStairs(n - 2, cache);
  cache.set(n, ways);
  return ways;
}

climbStairs(30); // 1346269

const tree = { value: 1, children: [{ value: 2, children: [] }] };
function flatten(node, out = []) {
  out.push(node.value);
  for (const child of node.children) flatten(child, out);
  return out;
}
flatten(tree); // [1, 2]`,
      table: {
        caption: L('Ways to solve an overlapping problem', 'Способы решить задачу с пересекающимися подзадачами'),
        headers: [L('Technique', 'Техника'), L('Idea', 'Идея'), L('Recurrence', 'Рекуррентность'), L('Cost', 'Стоимость')],
        rows: [
          [L('Naive recursion', 'Наивная рекурсия'), L('Call yourself', 'Вызвать себя'), L('T(n) = T(n-1) + T(n-2)', 'T(n) = T(n-1) + T(n-2)'), L('O(2^n)', 'O(2^n)')],
          [L('Memoization', 'Мемоизация'), L('Cache by argument', 'Кэш по аргументам'), L('Each subproblem once', 'Каждая подзадача один раз'), L('O(n)', 'O(n)')],
          [L('Bottom-up DP', 'Динамика снизу вверх'), L('Fill a table in order', 'Заполнять таблицу по порядку'), L('Same result, no stack', 'Тот же результат, без стека'), L('O(n) time, O(n) space', 'O(n) времени, O(n) памяти')],
          [L('Backtracking', 'Перебор с отсечением'), L('Explore and prune', 'Исследовать и отсекать'), L('Depends on the search space', 'Зависит от пространства поиска'), L('Exponential in the worst case', 'В худшем случае экспонента')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A joined-string cache key can collide', 'Склеенный строковый ключ может столкнуться'),
          text: L(
            'Joining arguments with a comma makes "a,b" and "ab" the same key, so the cache returns a wrong result. Use a Map keyed by a single value, nested Maps, or a separator that cannot appear in the input.',
            'Склейка аргументов через запятую делает "a,b" и "ab" одним и тем же ключом, и кэш вернёт неверный результат. Используйте Map с одним ключом, вложенные Map или разделитель, который не встречается во входных данных.'
          ),
        },
        {
          tone: 'tip',
          title: L('Rewrite single-call recursion as a loop', 'Перепишите рекурсию с одним вызовом в цикл'),
          text: L(
            'If the recursive call is the last statement and nothing happens after it, the call stack carries state that a plain loop variable can carry instead. The loop version cannot overflow and is usually shorter to read.',
            'Если рекурсивный вызов — последний оператор и после него ничего не происходит, стек вызовов несёт состояние, которое проще хранить в переменной цикла. Цикл не переполнится и обычно читается короче.'
          ),
        },
      ],
      takeaway: L(
        'Every recursion needs a base case, and a pure function with repeated subproblems should be memoized with a collision-free key.',
        'У каждой рекурсии нужен базовый случай, а чистую функцию с повторяющимися подзадачами стоит мемоизировать ключом без коллизий.'
      ),
      seeAlso: [
        L('Section 13-2: stacks and queues', 'Секция 13-2: стек и очередь'),
        L('Section 13-4: searching and sorting from scratch', 'Секция 13-4: поиск и сортировка с нуля'),
        L('Chapter 8: loops, iterators and generators', 'Глава 8: циклы, итераторы и генераторы'),
      ],
    },
  ],
};
