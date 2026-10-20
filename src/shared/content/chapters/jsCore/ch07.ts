import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh07: Chapter = {
  id: 'js-core-ch7',
  title: L('Arrays and collection methods', 'Массивы и методы коллекций'),
  summary: L(
    'How arrays really store their elements, what each iteration method returns, how to search and fold a collection, which methods mutate the array in place, and how to flatten and group nested data.',
    'Как массивы на самом деле хранят элементы, что возвращает каждый метод итерации, как искать и сворачивать коллекцию, какие методы мутируют массив на месте и как выравнивать и группировать вложенные данные.'
  ),
  sections: [
    {
      id: 'js-core-ch7-s1',
      title: L('Creating arrays, length and holes', 'Создание массивов, length и дыры'),
      body: L(
        'An array is an object with integer-like keys, a length property and a full set of methods on Array.prototype. The literal [1, 2, 3] is the form to use almost always. The constructor call new Array(n) does something else entirely: it creates an array whose length is n and whose elements do not exist yet. People expect new Array(3) to produce three undefined values, and they get a sparse array with three holes instead.\n\nArray.from turns anything iterable or array-like into a real array. Array.from({ length: 3 }, (_, i) => i) gives [0, 1, 2] because the second argument is a mapper function, and Array.from("abc") splits a string into characters. Array.of always builds an array from its arguments, so Array.of(3) gives [3] where new Array(3) gives an array of length 3.\n\nThe length property is writable, and it is not a read-only field like a frozen property. Assigning arr.length = 1 truncates the array, and assigning a larger number extends it with holes at the end. Reading length is how the engine knows where the array stops, which is why appending is cheap, while deleting the last element with delete arr[arr.length - 1] leaves a hole and does not change the length.\n\nA hole is a missing element, and the difference between a hole and an explicit undefined shows up in the iteration methods. Every one of them skips holes: forEach, map and filter never visit them, while a plain index based for loop does visit them and reads undefined. That mismatch is the classic source of code that behaves differently in two places that look identical.',
        'Массив — это объект с целочисленными ключами, свойством length и полным набором методов на Array.prototype. Литерал [1, 2, 3] — форма, которую стоит использовать почти всегда. Вызов конструктора new Array(n) делает совершенно другое: создаёт массив, у которого length равен n, а сами элементы ещё не существуют. Люди ожидают, что new Array(3) даст три значения undefined, а получают разреженный массив с тремя дырами.\n\nArray.from превращает в настоящий массив любой итерируемый или похожий на массив объект. Array.from({ length: 3 }, (_, i) => i) даёт [0, 1, 2], потому что второй аргумент — функция-маппер, а Array.from("abc") разбивает строку на символы. Array.of всегда собирает массив из своих аргументов, поэтому Array.of(3) даёт [3] там, где new Array(3) даёт массив длины 3.\n\nСвойство length записываемо, и это не такое неизменяемое поле, как у замороженного объекта. Присваивание arr.length = 1 обрезает массив, а присваивание большего числа дополняет его дырами в конце. Чтение length — это способ движка узнать, где массив заканчивается, поэтому добавление в конец дёшево, а удаление последнего элемента через delete arr[arr.length - 1] оставляет дыру и не меняет длину.\n\nДыра — это отсутствующий элемент, и разница между дырой и явным undefined проявляется в методах итерации. Все их обходят дыры: forEach, map и filter их не посещают, а обычный цикл по индексу посещает и читает undefined. Именно это расхождение — классический источник кода, который ведёт себя по-разному в двух местах, выглядящих одинаково.'
      ),
      bullets: [
        L('new Array(3) creates an array of length 3 with no elements, not three undefined values.', 'new Array(3) создаёт массив длины 3 без элементов, а не три значения undefined.'),
        L('Array.from(iterable) and Array.of(...) never confuse a length with a value.', 'Array.from(iterable) и Array.of(...) никогда не путают длину со значением.'),
        L('length is writable: assigning to it truncates the array or extends it with holes.', 'length записываем: присваивание обрезает массив или дополняет его дырами.'),
        L('delete arr[arr.length - 1] leaves a hole and keeps the length.', 'delete arr[arr.length - 1] оставляет дыру и сохраняет длину.'),
        L('forEach, map and filter skip holes, a plain index loop does not.', 'forEach, map и filter обходят дыры, обычный цикл по индексу — нет.'),
        L('Array.isArray is the only reliable array check, and [] is truthy.', 'Array.isArray — единственная надёжная проверка массива, а [] истинно.'),
      ],
      code: `const empty = [];
const literal = [1, 2, 3];

const sparse = new Array(3);
sparse.length; // 3
sparse[0];     // undefined - the slot does not exist

const filled = new Array(3).fill(0);            // [0, 0, 0]
const from = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
const of = Array.of(3);                         // [3]

literal.length = 1; // truncates the array to [1]
delete literal[0];  // leaves a hole, length stays 1

[1, , 3].forEach((v) => console.log(v)); // logs 1 and 3, the hole is skipped
Array.isArray([]);            // true
Array.isArray({ length: 0 }); // false`,
      table: {
        caption: L('Ways to create an array', 'Способы создать массив'),
        headers: [L('Expression', 'Выражение'), L('Result', 'Результат')],
        rows: [
          [L('[]', '[]'), L('empty array, length 0', 'пустой массив, length 0')],
          [L('[1, 2, 3]', '[1, 2, 3]'), L('three elements', 'три элемента')],
          [L('new Array(3)', 'new Array(3)'), L('length 3 and three holes', 'length 3 и три дыры')],
          [L('new Array(3).fill(0)', 'new Array(3).fill(0)'), L('[0, 0, 0]', '[0, 0, 0]')],
          [L('Array.from({ length: 3 }, (_, i) => i)', 'Array.from({ length: 3 }, (_, i) => i)'), L('[0, 1, 2]', '[0, 1, 2]')],
          [L('Array.of(3)', 'Array.of(3)'), L('[3]', '[3]')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('new Array(3) is not [0, 0, 0]', 'new Array(3) — это не [0, 0, 0]'),
          text: L(
            'The single argument of the Array constructor is a length, so new Array(3) produces an empty array with three holes. The same call with two arguments builds elements instead, which is why new Array(3, 4) is [3, 4] and surprises everyone. Use Array.of or fill.',
            'Единственный аргумент конструктора Array — это длина, поэтому new Array(3) даёт пустой массив с тремя дырами. Тот же вызов с двумя аргументами строит элементы, поэтому new Array(3, 4) равно [3, 4] и удивляет всех. Используйте Array.of или fill.'
          ),
        },
        {
          tone: 'tip',
          title: L('Array.isArray works across realms', 'Array.isArray работает между realm'),
          text: L(
            'instanceof Array fails for an array created in another window or worker, because the prototype differs. Array.isArray compares the internal slot, so it returns true for every real array no matter where it was created.',
            'instanceof Array не сработает для массива из другого окна или воркера, потому что прототип другой. Array.isArray проверяет внутренний слот, поэтому возвращает true для любого настоящего массива, где бы он ни был создан.'
          ),
        },
      ],
      takeaway: L(
        'Use array literals, never new Array(n) with one argument, and remember that a hole is not the same as undefined.',
        'Используйте литералы массивов, никогда new Array(n) с одним аргументом и помните, что дыра — это не то же самое, что undefined.'
      ),
      seeAlso: [
        L('Chapter 5: objects, arrays and array-like lengths', 'Глава 5: объекты, массивы и объекты с числовой длиной'),
        L('Section 7-5: copying arrays without mutating them', 'Секция 7-5: копирование массивов без мутации'),
        L('Chapter 8: iterators and generators', 'Глава 8: итераторы и генераторы'),
      ],
    },
    {
      id: 'js-core-ch7-s2',
      title: L('Iterating: forEach, map and filter', 'Итерации: forEach, map и filter'),
      body: L(
        'forEach, map and filter all take a callback and differ only in what they return. forEach returns undefined and exists purely for its side effects. map returns a new array of the same length, where each element is the result of the callback. filter returns a new array containing only the elements for which the callback returned a truthy value.\n\nThe callback receives three arguments: the element, its index and the whole array. The index argument is what lets you skip holes by hand, and it is also a trap when you expect a plain value: items.forEach((item) => item.id) returns undefined, not an array of ids, because forEach ignores whatever the callback returns.\n\nNone of the three methods mutates the array they walk, but your callback can. Changing the array inside forEach shifts the elements under the cursor and makes the iteration skip some of them or visit them twice, which is why filtering in place is a classic bug. To remove items, either collect the survivors with filter and replace the array, or iterate over a copy.\n\nReach for forEach only when you truly need a side effect, such as pushing into another array or firing an event. In every other case map or filter expresses the intent better, and chaining them reads as a pipeline: the data goes in, gets transformed, gets narrowed, and each stage produces a new array that the next stage can consume.',
        'forEach, map и filter принимают колбэк и различаются только тем, что возвращают. forEach возвращает undefined и существует ради побочных эффектов. map возвращает новый массив той же длины, где каждый элемент — результат колбэка. filter возвращает новый массив только с теми элементами, для которых колбэк вернул истинное значение.\n\nКолбэк получает три аргумента: элемент, его индекс и весь массив. Индекс как раз позволяет вручную пропускать дыры, и одновременно он ловушка, когда ждут обычное значение: items.forEach((item) => item.id) возвращает undefined, а не массив идентификаторов, потому что forEach игнорирует результат колбэка.\n\nНи один из трёх методов не мутирует массив, по которому идёт, но ваш колбэк может. Изменение массива внутри forEach сдвигает элементы под курсором, и итерация начинает пропускать часть элементов или посещать их дважды — поэтому фильтрация на месте это классический баг. Чтобы удалить элементы, либо соберите оставшиеся через filter и подставьте новый массив, либо итерируйте по копии.\n\nОбращайтесь к forEach только тогда, когда вам действительно нужен побочный эффект, например запись в другой массив или вызов события. Во всех остальных случаях map или filter выражают намерение лучше, а их цепочка читается как конвейер: данные входят, преобразуются, сужаются, и каждая стадия производит новый массив для следующей.'
      ),
      bullets: [
        L('forEach returns undefined, map returns a new array of the same length.', 'forEach возвращает undefined, map — новый массив той же длины.'),
        L('filter keeps the elements for which the callback returned a truthy value.', 'filter оставляет элементы, для которых колбэк вернул истинное значение.'),
        L('The callback receives (element, index, array).', 'Колбэк получает (элемент, индекс, массив).'),
        L('forEach, map and filter never mutate the array themselves.', 'forEach, map и filter сами никогда не мутируют массив.'),
        L('Mutating the array inside forEach makes the iteration skip elements.', 'Мутация массива внутри forEach заставляет итерацию пропускать элементы.'),
        L('Use filter plus a new array instead of splicing while iterating.', 'Используйте filter и новый массив вместо splice во время итерации.'),
      ],
      code: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Bob', age: 17 },
  { name: 'Cyd', age: 24 },
];

const names = users.map((user) => user.name);
names; // ['Ada', 'Bob', 'Cyd']

const adults = users.filter((user) => user.age >= 18);
adults.length; // 2

const result = users.forEach((user) => console.log(user.name));
result; // undefined - forEach returns nothing

users.map((user, index) => \`\${index}: \${user.name}\`);

const queue = [1, 2, 3];
queue.forEach((n) => { if (n === 2) queue.splice(0, 1); });
// visits 1 and 2 - the element 3 is skipped`,
      table: {
        caption: L('The three iteration methods', 'Три метода итерации'),
        headers: [L('Method', 'Метод'), L('Returns', 'Возвращает'), L('Use it for', 'Для чего')],
        rows: [
          [L('forEach', 'forEach'), L('undefined', 'undefined'), L('Side effects only', 'Только побочные эффекты')],
          [L('map', 'map'), L('a new array of the same length', 'новый массив той же длины'), L('Transforming every element', 'Преобразование каждого элемента')],
          [L('filter', 'filter'), L('a new array, shorter', 'новый массив, короче'), L('Keeping the elements that pass a test', 'Элементы, прошедшие проверку')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not change the array while walking it', 'Не меняйте массив во время обхода'),
          text: L(
            'forEach reads the length and the elements as it goes, so removing an item shifts everything left and the element after the removed one is never visited. Filter first, then replace the array, and the problem disappears.',
            'forEach по ходу читает длину и элементы, поэтому удаление элемента сдвигает всё влево, и следующий за удалённым элемент так и не будет посещён. Сначала отфильтруйте, потом подставьте новый массив, и проблема исчезает.'
          ),
        },
        {
          tone: 'tip',
          title: L('forEach is rarely what you want', 'forEach нужен редко'),
          text: L(
            'Whenever the callback returns something meaningful, map says that explicitly and gives you a value you can keep. forEach returning undefined is not a detail, it is the hint that you wanted a different method.',
            'Всякий раз, когда колбэк возвращает что-то осмысленное, map говорит об этом прямо и даёт значение, которое можно сохранить. Возврат undefined у forEach — не деталь, а подсказка, что вам нужен был другой метод.'
          ),
        },
      ],
      takeaway: L(
        'map transforms, filter selects, forEach only produces side effects, and none of them may change the array they walk.',
        'map преобразует, filter отбирает, forEach даёт только побочные эффекты, и ни один из них не должен менять обходимый массив.'
      ),
      seeAlso: [
        L('Chapter 8: iterators, generators and the for...of loop', 'Глава 8: итераторы, генераторы и цикл for...of'),
        L('Section 7-4: reduce as a fold', 'Секция 7-4: reduce как свёртка'),
        L('Section 7-6: flattening nested structures', 'Секция 7-6: выравнивание вложенных структур'),
      ],
    },
    {
      id: 'js-core-ch7-s3',
      title: L('Searching: find, includes, some and every', 'Поиск: find, includes, some и every'),
      body: L(
        'find returns the first element for which the callback returns a truthy value, and findIndex returns its index. Both stop at the first match, so they cost one pass over the array and never scan the rest. findLast and findLastIndex do the same from the other end, which is what you want when the array is ordered by time and the newest matching record is the one you need.\n\nincludes answers whether a value is present, using the SameValueZero comparison, and that is the one case where it beats indexOf: includes finds NaN, while indexOf uses strict equality and returns -1 for NaN even when NaN is right there in the array. When you only need to know whether the value exists, includes reads better than a comparison against the index.\n\nsome and every return booleans. some returns true as soon as one element satisfies the predicate, every returns false as soon as one element fails it, and both stop right there instead of scanning the remainder. On an empty array some returns false and every returns true, which is the mathematically correct answer but surprises people who read every as at least one.\n\nFor objects, find is usually better than a manual loop with indexOf, because the predicate can test several fields at once and you get the object itself back instead of an index you then have to look up. Keep the predicate a genuine test: returning the element itself is a common mistake, because a falsy element such as 0 or an empty string fails the test even when it is present.',
        'find возвращает первый элемент, для которого колбэк вернул истинное значение, а findIndex — его индекс. Оба останавливаются на первом совпадении, поэтому делают один проход по массиву и не сканируют остаток. findLast и findLastIndex делают то же самое с другого конца, и это то, что нужно, когда массив упорядочен по времени и вам нужна самая свежая подходящая запись.\n\nincludes отвечает, есть ли значение в массиве, и использует сравнение SameValueZero. Именно в этом он лучше indexOf: includes находит NaN, а indexOf использует строгое равенство и возвращает -1 для NaN, даже если NaN лежит в массиве. Когда нужно знать только факт наличия, includes читается понятнее, чем сравнение с индексом.\n\nsome и every возвращают логические значения. some возвращает true, как только один элемент удовлетворяет предикату, every возвращает false, как только один элемент ему не соответствует, и оба останавливаются на этом месте, не сканируя остаток. На пустом массиве some возвращает false, а every — true, что математически верно, но удивляет тех, кто читает every как «хотя бы один».\n\nДля объектов find обычно удобнее ручного цикла с indexOf: предикат может проверять сразу несколько полей, а вы получаете сам объект, а не индекс, который потом надо искать. Но предикат должен быть настоящей проверкой: возврат самого элемента — частая ошибка, потому что ложный элемент вроде 0 или пустой строки не проходит тест, даже когда он есть.'
      ),
      bullets: [
        L('find and findIndex stop at the first match.', 'find и findIndex останавливаются на первом совпадении.'),
        L('findLast and findLastIndex scan from the end of the array.', 'findLast и findLastIndex сканируют массив с конца.'),
        L('includes finds NaN, indexOf does not.', 'includes находит NaN, indexOf — нет.'),
        L('some and every return booleans and short-circuit.', 'some и every возвращают логические значения и замыкаются досрочно.'),
        L('On an empty array some is false and every is true.', 'На пустом массиве some даёт false, а every — true.'),
        L('Use find for objects instead of indexOf plus a lookup.', 'Для объектов используйте find вместо indexOf и последующего поиска.'),
      ],
      code: `const posts = [
  { id: 1, draft: true }, { id: 2, draft: false }, { id: 3, draft: false },
];

posts.find((p) => !p.draft).id;     // 2
posts.findIndex((p) => !p.draft);   // 1
posts.findLast((p) => !p.draft).id; // 3

[1, 2, NaN].includes(NaN); // true
[1, 2, NaN].indexOf(NaN); // -1

[1, 2, 3].some((n) => n > 2);   // true
[1, 2, 3].every((n) => n > 0);   // true
[].some(() => true);   // false
[].every(() => false); // true

[0, 1].find((n) => n); // undefined - 0 is falsy`,
      table: {
        caption: L('Four ways to look for something', 'Четыре способа что-то найти'),
        headers: [L('Method', 'Метод'), L('Comparison', 'Сравнение'), L('Finds NaN', 'Находит NaN'), L('Returns', 'Возвращает')],
        rows: [
          [L('indexOf(x)', 'indexOf(x)'), L('strict equality', 'строгое равенство'), L('no', 'нет'), L('the index or -1', 'индекс или -1')],
          [L('includes(x)', 'includes(x)'), L('SameValueZero', 'SameValueZero'), L('yes', 'да'), L('a boolean', 'логическое значение')],
          [L('find(predicate)', 'find(predicate)'), L('your callback', 'ваш колбэк'), L('depends on the test', 'зависит от проверки'), L('the element or undefined', 'элемент или undefined')],
          [L('findIndex(predicate)', 'findIndex(predicate)'), L('your callback', 'ваш колбэк'), L('depends on the test', 'зависит от проверки'), L('the index or -1', 'индекс или -1')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A returned element is not a truthy test', 'Возвращённый элемент — не истинностная проверка'),
          text: L(
            'find((x) => x) fails for 0, false and the empty string, because the predicate returns the element itself and those values are falsy. Write find((x) => x !== undefined) or use includes when you only need the presence of a value.',
            'find((x) => x) не сработает для 0, false и пустой строки, потому что предикат возвращает сам элемент, а эти значения ложны. Пишите find((x) => x !== undefined) или используйте includes, если нужно только наличие значения.'
          ),
        },
      ],
      takeaway: L(
        'find for objects and predicates, includes for presence, and remember that every on an empty array is true.',
        'find — для объектов и предикатов, includes — для проверки наличия, и помните, что every на пустом массиве истинно.'
      ),
      seeAlso: [
        L('Section 7-4: reduce and fold patterns', 'Секция 7-4: reduce и паттерны свёртки'),
        L('Section 1-2: strict and loose equality', 'Секция 1-2: строгое и нестрогое равенство'),
        L('Chapter 13: searching algorithms and their complexity', 'Глава 13: алгоритмы поиска и их сложность'),
      ],
    },
    {
      id: 'js-core-ch7-s4',
      title: L('reduce and fold patterns', 'reduce и свёртка'),
      body: L(
        'reduce walks the array and carries an accumulator through it. It takes a callback and an optional initial value: the callback receives the accumulator, the current element, the index and the array, and must return the next accumulator. Without an initial value the first element becomes the accumulator, which is why reduce on an empty array throws a TypeError: there is no first element to start from.\n\nAlways pass the initial value. It makes the accumulator type explicit, it makes the empty case return something sensible instead of throwing, and it removes the trap where a string element is used as the accumulator and the second call receives a string where you expected your object. The classic symptom is a TypeError that mentions reduce of empty array with no initial value.\n\nreduce is a general fold, and that is both its strength and its weakness. Grouping records into an object, counting occurrences, summing a field and building an index all read nicely as folds. But a fold that transforms every element and returns a new array is usually just a map, and a fold that keeps a subset is a filter. Use the specific method when it exists, so the code states what it does instead of hiding it inside a callback.\n\nreduceRight folds from the end, which matters when the accumulator depends on the order, for example when you build a string by prepending. Grouping through a fold also needs a deliberate shape: a plain object coerces its keys to strings, so a numeric id turns into a string key, while a Map keeps the key type and needs a get call to read the value back.',
        'reduce обходит массив и проносит через него аккумулятор. Он принимает колбэк и необязательное начальное значение: колбэк получает аккумулятор, текущий элемент, индекс и массив, а обязан вернуть следующий аккумулятор. Без начального значения аккумулятором становится первый элемент, и именно поэтому reduce на пустом массиве бросает TypeError: первого элемента, с которого начать, просто нет.\n\nНачальное значение всегда передавайте. Оно делает тип аккумулятора явным, превращает пустой случай в осмысленный результат вместо исключения и убирает ловушку, где аккумулятором становится строковый элемент, и на втором вызове вы получаете строку вместо своего объекта. Классический симптом — TypeError с текстом reduce of empty array with no initial value.\n\nreduce — это общая свёртка, и в этом одновременно её сила и слабость. Группировка записей в объект, подсчёт повторений, сумма по полю и построение индекса читаются как свёртки прекрасно. Но свёртка, которая преобразует каждый элемент и возвращает новый массив, обычно является map, а свёртка, которая оставляет подмножество, — это filter. Используйте конкретный метод, когда он существует, чтобы код говорил, что именно он делает, а не прятал это внутри колбэка.\n\nreduceRight сворачивает с конца, и это важно, когда аккумулятор зависит от порядка, например при сборке строки приписыванием в начало. Группировка через свёртку тоже требует осознанной формы: у обычного объекта ключи приводятся к строкам, поэтому числовой id превращается в строковый ключ, а Map сохраняет тип ключа и требует вызова get, чтобы прочитать значение обратно.'
      ),
      bullets: [
        L('reduce throws a TypeError on an empty array without an initial value.', 'reduce бросает TypeError на пустом массиве без начального значения.'),
        L('Always pass the initial value: it fixes the type and the empty case.', 'Всегда передавайте начальное значение: оно задаёт тип и случай пустого массива.'),
        L('The callback receives (accumulator, element, index, array).', 'Колбэк получает (аккумулятор, элемент, индекс, массив).'),
        L('reduceRight folds from the last element to the first.', 'reduceRight сворачивает с последнего элемента к первому.'),
        L('Object keys in a fold are coerced to strings, Map keys keep their type.', 'Ключи объекта в свёртке приводятся к строкам, ключи Map сохраняют тип.'),
        L('Use map or filter instead of a fold that only transforms or selects.', 'Используйте map или filter вместо свёртки, которая только преобразует или отбирает.'),
      ],
      code: `const cart = [
  { name: 'keyboard', price: 80, qty: 2 },
  { name: 'mouse', price: 25, qty: 4 },
];

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
total; // 260

const counts = cart.reduce((acc, item) => {
  acc[item.name] = (acc[item.name] ?? 0) + item.qty;
  return acc;
}, {});
counts.mouse; // 4

const byName = cart.reduce((acc, item) => acc.set(item.name, item), new Map());
byName.get('mouse').price; // 25

try { [].reduce((a, b) => a + b); } catch (e) { e.constructor.name; } // 'TypeError'`,
      table: {
        caption: L('Choosing between the fold and the specific method', 'Выбор между свёрткой и конкретным методом'),
        headers: [L('Goal', 'Цель'), L('Fold shape', 'Форма свёртки'), L('Better method', 'Лучший метод')],
        rows: [
          [L('Transform every element', 'Преобразовать каждый элемент'), L('acc.map((x) => f(x))', 'acc.map((x) => f(x))'), L('map', 'map')],
          [L('Keep matching elements', 'Оставить подходящие элементы'), L('acc.filter((x) => p(x))', 'acc.filter((x) => p(x))'), L('filter', 'filter')],
          [L('Sum a field', 'Посчитать сумму поля'), L('acc + x.amount', 'acc + x.amount'), L('reduce', 'reduce')],
          [L('Count by key', 'Посчитать по ключу'), L('acc[k] = (acc[k] ?? 0) + 1', 'acc[k] = (acc[k] ?? 0) + 1'), L('reduce or Object.groupBy', 'reduce или Object.groupBy')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The missing initial value', 'Забытое начальное значение'),
          text: L(
            'Leave the initial value out and reduce uses the first element as the accumulator, which changes the type of every later call and crashes on an empty array. When the first element happens to be a string, the error message mentions a string method and sends you looking in the wrong place.',
            'Без начального значения reduce берёт первый элемент как аккумулятор, что меняет тип всех последующих вызовов и роняет программу на пустом массиве. Если первый элемент окажется строкой, сообщение об ошибке упомянет строковый метод и уведёт не туда.'
          ),
        },
        {
          tone: 'tip',
          title: L('A fold needs a shape', 'Свёртке нужна форма'),
          text: L(
            'Decide whether the accumulator is an object, a Map or a number before you write the callback, and name it accordingly. A reducer that builds an object and a reducer that builds a Map look almost identical and behave completely differently on the second pass.',
            'Решите заранее, аккумулятор это объект, Map или число, и назовите его соответственно. Редьюсер, собирающий объект, и редьюсер, собирающий Map, выглядят почти одинаково, но ведут себя совершенно по-разному со второго прохода.'
          ),
        },
      ],
      takeaway: L(
        'Always pass the initial value to reduce, and use map or filter instead of a fold that only transforms or selects.',
        'Всегда передавайте reduce начальное значение и используйте map или filter вместо свёртки, которая только преобразует или отбирает.'
      ),
      seeAlso: [
        L('Section 7-2: iterating with forEach, map and filter', 'Секция 7-2: итерации с forEach, map и filter'),
        L('Section 7-6: grouping with Object.groupBy and Map.groupBy', 'Секция 7-6: группировка через Object.groupBy и Map.groupBy'),
        L('Chapter 13: algorithms and data structures', 'Глава 13: алгоритмы и структуры данных'),
      ],
    },
    {
      id: 'js-core-ch7-s5',
      title: L('Sorting, copying and mutating methods', 'Сортировка, копирование и мутирующие методы'),
      body: L(
        'The default sort is a string sort, not a numeric one. It converts every element to a string and compares them character by character, so [10, 9, 1].sort() gives [1, 10, 9], because "10" starts with "1" and therefore sorts before "9". The fix is a comparator: numbers compare with a - b, strings compare with localeCompare, and a mixed array needs an explicit decision about where the other types go.\n\nsort mutates the array in place and returns it. To keep the original, copy it first with [...arr] or arr.slice() and sort the copy. There is no sort that returns a new array, and assuming there is one is a very common source of a mysterious reordering somewhere else in the program.\n\nThe mutating methods are push, pop, shift, unshift, splice, reverse and sort. push and pop work at the end and are cheap, shift and unshift work at the front and move every element, so they cost O(n). splice is the general one: it removes and inserts at the same time, and its second argument is the number of items to remove, not the index of where to insert.\n\nslice and splice are easily confused. slice(start, end) returns a copy of a range and never touches the original, while splice(start, deleteCount, ...items) changes the array and returns the removed elements. Both take an index and a count, which is why the names are worth learning carefully. For copying use slice, the spread syntax or structuredClone, and only structuredClone handles nested structures. Changing an array while forEach walks it shifts the elements and makes the loop skip some of them, so removing during an iteration needs a copy.',
        'Сортировка по умолчанию — это строковая сортировка, а не числовая. Она превращает каждый элемент в строку и сравнивает их посимвольно, поэтому [10, 9, 1].sort() даёт [1, 10, 9], ведь "10" начинается с "1" и потому встаёт раньше "9". Решение — компаратор: числа сравнивают через a - b, строки через localeCompare, а для смешанного массива нужно явно решить, куда девать остальные типы.\n\nsort мутирует массив на месте и возвращает его же. Чтобы сохранить оригинал, сначала сделайте копию через [...arr] или arr.slice() и отсортируйте копию. Сортировки, возвращающей новый массив, не существует, и уверенность в обратном — очень частая причина необъяснимой перестановки в другом месте программы.\n\nМутирующие методы — это push, pop, shift, unshift, splice, reverse и sort. push и pop работают с концом и дешёвые, а shift и unshift работают с началом и сдвигают все элементы, поэтому стоят O(n). splice — самый общий из них: он одновременно удаляет и вставляет, причём его второй аргумент — количество удаляемых элементов, а не индекс для вставки.\n\nslice и splice путают постоянно. slice(start, end) возвращает копию диапазона и никогда не трогает оригинал, а splice(start, deleteCount, ...items) меняет массив и возвращает удалённые элементы. Оба принимают индекс и количество, и поэтому эти названия стоит выучить внимательно. Для копирования используйте slice, spread или structuredClone, и только structuredClone справляется с вложенными структурами. Изменение массива во время обхода forEach сдвигает элементы и заставляет цикл пропускать часть из них, поэтому удаление во время итерации требует копии.'
      ),
      bullets: [
        L('The default sort compares strings, so [10, 9, 1].sort() gives [1, 10, 9].', 'Сортировка по умолчанию сравнивает строки, поэтому [10, 9, 1].sort() даёт [1, 10, 9].'),
        L('sort mutates the array, so sort a copy: [...arr].sort(cmp).', 'sort мутирует массив, поэтому сортируйте копию: [...arr].sort(cmp).'),
        L('push and pop are cheap, shift and unshift move every element.', 'push и pop дешёвые, shift и unshift сдвигают все элементы.'),
        L('splice removes and inserts, slice copies a range and never mutates.', 'splice удаляет и вставляет, slice копирует диапазон и не мутирует.'),
        L('For a deep copy of nested data use structuredClone, not spread.', 'Для глубокой копии вложенных данных используйте structuredClone, а не spread.'),
        L('Changing the array inside forEach makes the iteration skip elements.', 'Изменение массива внутри forEach заставляет итерацию пропускать элементы.'),
      ],
      code: `const numbers = [10, 9, 1];
numbers.sort();                     // [1, 10, 9] - string comparison
[...numbers].sort((a, b) => a - b); // [1, 9, 10]

const names = ['Ямал', 'Азов', 'ёж'];
[...names].sort((a, b) => a.localeCompare(b)); // locale aware

const list = [1, 2, 3, 4, 5];
const removed = list.splice(1, 2);  // removes 2 and 3
list;    // [1, 4, 5]
removed; // [2, 3]

const copy = list.slice();         // a shallow copy
const deep = structuredClone(list);

const items = [1, 2, 3, 4];
items.forEach((n) => { if (n === 2) items.splice(0, 1); });
// visits 1, 2 and 4 - the element 3 is skipped`,
      table: {
        caption: L('Which methods mutate the array', 'Какие методы мутируют массив'),
        headers: [L('Method', 'Метод'), L('Mutates', 'Мутирует'), L('Returns', 'Возвращает')],
        rows: [
          [L('push, pop', 'push, pop'), L('yes', 'да'), L('the new length or the removed element', 'новую длину или удалённый элемент')],
          [L('shift, unshift', 'shift, unshift'), L('yes', 'да'), L('the removed element or the new length', 'удалённый элемент или новую длину')],
          [L('splice', 'splice'), L('yes', 'да'), L('an array of the removed elements', 'массив удалённых элементов')],
          [L('reverse, sort', 'reverse, sort'), L('yes', 'да'), L('the same array', 'тот же массив')],
          [L('slice, concat', 'slice, concat'), L('no', 'нет'), L('a new array', 'новый массив')],
          [L('map, filter, flat', 'map, filter, flat'), L('no', 'нет'), L('a new array', 'новый массив')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The default sort is a string sort', 'Сортировка по умолчанию — строковая'),
          text: L(
            'Without a comparator, sort converts elements to strings, so 10 lands before 9. Any numeric sort needs an explicit a - b comparator, and a sort of mixed types needs a rule for the values that are not of the main type.',
            'Без компаратора sort превращает элементы в строки, поэтому 10 встаёт раньше 9. Любая числовая сортировка требует явного компаратора a - b, а сортировка смешанных типов — правила для значений неосновного типа.'
          ),
        },
        {
          tone: 'warning',
          title: L('sort mutates in place', 'sort мутирует на месте'),
          text: L(
            'The array you passed comes back changed, and it is the same array, not a copy. In a reducer or a state update this quietly rewrites data that other parts of the program still hold a reference to. Sort a copy instead.',
            'Переданный массив возвращается изменённым, причём это тот же самый массив, а не копия. В редьюсере или обновлении состояния это тихо переписывает данные, на которые у другой части программы осталась ссылка. Сортируйте копию.'
          ),
        },
      ],
      takeaway: L(
        'Always pass a comparator to sort, sort a copy when the original must survive, and use slice for copying and splice for editing.',
        'Всегда передавайте компаратор в sort, сортируйте копию, если оригинал должен уцелеть, и используйте slice для копирования, а splice для изменения.'
      ),
      seeAlso: [
        L('Chapter 13: sorting algorithms and their complexity', 'Глава 13: алгоритмы сортировки и их сложность'),
        L('Section 7-1: creating arrays, length and holes', 'Секция 7-1: создание массивов, length и дыры'),
        L('Section 1-1: shallow copies and nested references', 'Секция 1-1: поверхностные копии и общие вложенные ссылки'),
      ],
    },
    {
      id: 'js-core-ch7-s6',
      title: L('Flattening, grouping and nested data', 'Выравнивание, группировка и вложенные данные'),
      body: L(
        'flat flattens nested arrays into one level by default, and it takes a depth argument: [1, [2, [3, [4]]]].flat(Infinity) produces [1, 2, 3, 4]. The default depth of one means that [1, [2, [3]]].flat() gives [1, 2, [3]], which surprises people who expected everything to be flattened in one go.\n\nflatMap combines a mapping step with a flattening step: it maps every element to a value or to an array and flattens the result one level. It is not the same as map followed by flat, because flatMap flattens only the arrays produced by the callback, while map().flat() flattens every array that was already inside the input. The difference shows up as soon as the source data contains arrays of its own.\n\nObject.groupBy and Map.groupBy group the elements of an array by a key computed from each element. Object.groupBy returns a plain object whose keys are strings, so a numeric id becomes a string key, while Map.groupBy returns a Map that keeps the key type. Both preserve the original order of the elements inside each group, and both arrived in the language relatively recently, so check the runtime before you depend on them.\n\nNested structures are usually normalised before they reach the state layer. The server sends a tree, the client flattens it into a list where every node carries its parent id, the list goes into the store, and the selectors rebuild the tree when the view needs one. That direction, from nested to flat, is usually the right one, because a flat list is trivial to filter, to sort, to paginate and to compare, while a tree forces every one of those operations to walk the whole structure.',
        'flat выравнивает вложенные массивы в один уровень по умолчанию и принимает глубину: [1, [2, [3, [4]]]].flat(Infinity) даёт [1, 2, 3, 4]. Глубина по умолчанию равна единице, поэтому [1, [2, [3]]].flat() даёт [1, 2, [3]], что удивляет тех, кто ожидал полного выравнивания за один вызов.\n\nflatMap объединяет отображение и выравнивание: он отображает каждый элемент в значение или массив и выравнивает результат на один уровень. Это не то же самое, что map и следом flat, потому что flatMap выравнивает только те массивы, которые породил колбэк, а map().flat() выравнивает все массивы, уже находившиеся во входных данных. Разница проявляется, как только в исходных данных есть собственные массивы.\n\nObject.groupBy и Map.groupBy группируют элементы массива по ключу, вычисленному из каждого элемента. Object.groupBy возвращает обычный объект, у которого ключи — строки, поэтому числовой id становится строковым ключом, а Map.groupBy возвращает Map, сохраняющий тип ключа. Оба сохраняют исходный порядок элементов внутри каждой группы, и оба появились в языке сравнительно недавно, поэтому проверяйте рантайм, прежде чем на них опираться.\n\nВложенные структуры обычно нормализуют до того, как они попадут в слой состояния. Сервер присылает дерево, клиент выравнивает его в список, где у каждого узла есть id родителя, список ложится в стор, а селекторы пересобирают дерево, когда оно нужно представлению. Это направление, от вложенного к плоскому, обычно и есть правильное, потому что с плоским списком тривиально фильтровать, сортировать, разбивать на страницы и сравнивать, а дерево заставляет каждую из этих операций обходить всю структуру.'
      ),
      bullets: [
        L('flat() flattens one level, flat(Infinity) flattens everything.', 'flat() выравнивает один уровень, flat(Infinity) — все уровни.'),
        L('flatMap maps and flattens only the arrays the callback returns.', 'flatMap отображает и выравнивает только массивы, возвращённые колбэком.'),
        L('map().flat() flattens the arrays that were already in the input.', 'map().flat() выравнивает массивы, которые уже были во входных данных.'),
        L('Object.groupBy returns an object whose keys are strings.', 'Object.groupBy возвращает объект, у которого ключи — строки.'),
        L('Map.groupBy returns a Map and keeps the type of the key.', 'Map.groupBy возвращает Map и сохраняет тип ключа.'),
        L('A flat list with parent ids makes filtering, sorting and paging cheap.', 'Плоский список с id родителей делает фильтрацию, сортировку и пагинацию дешёвыми.'),
      ],
      code: `const orders = [
  { id: 1, user: 'ada', total: 10 },
  { id: 2, user: 'bob', total: 20 },
  { id: 3, user: 'ada', total: 30 },
];

const byUser = Object.groupBy(orders, (o) => o.user);
byUser.ada.length; // 2 - keys are strings

const bySize = Map.groupBy(orders, (o) => (o.total > 15 ? 'big' : 'small'));
bySize.get('big').length; // 2 - the key keeps its type

const nested = [[1, 2], [3, [4, 5]]];
nested.flat();         // [1, 2, 3, [4, 5]]
nested.flat(Infinity); // [1, 2, 3, 4, 5]

const tagged = orders.flatMap((o) => [o.id, o.user]);
tagged.length; // 6 - each order produced two values`,
      table: {
        caption: L('Three ways to build a flat array', 'Три способа получить плоский массив'),
        headers: [L('Method', 'Метод'), L('Returns', 'Возвращает'), L('Flattens', 'Выравнивает')],
        rows: [
          [L('map(fn)', 'map(fn)'), L('an array of the same length', 'массив той же длины'), L('no', 'нет')],
          [L('flat(depth)', 'flat(depth)'), L('an array flattened to the given depth', 'массив, выровненный до заданной глубины'), L('yes, depth 1 by default', 'да, по умолчанию глубина 1')],
          [L('flatMap(fn)', 'flatMap(fn)'), L('an array of mapped values, flattened one level', 'массив отображённых значений, выровненный на один уровень'), L('yes, the results only', 'да, только результаты')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('map().flat() is not flatMap', 'map().flat() — это не flatMap'),
          text: L(
            'map().flat() flattens the arrays that were already in the source, so a source of [[1], 2] becomes [1, 2]. flatMap flattens only what the callback returns, so the same source becomes [1, 2] as well but a source of [1, 2] becomes [1, 2] too. The difference appears whenever the callback returns a plain value next to an array.',
            'map().flat() выравнивает массивы, которые уже были в исходных данных, поэтому источник [[1], 2] станет [1, 2]. flatMap выравнивает только то, что вернул колбэк, поэтому тот же источник тоже станет [1, 2], а источник [1, 2] станет [1, 2]. Разница видна, когда колбэк возвращает обычное значение рядом с массивом.'
          ),
        },
        {
          tone: 'tip',
          title: L('Normalise at the boundary', 'Нормализуйте на границе'),
          text: L(
            'Flatten the tree once, right where the data enters the application, and keep the flat list in the store. Rebuild the tree in the selector that renders it, so the shape of the UI never leaks into the state layer.',
            'Выравнивайте дерево один раз, ровно там, где данные попадают в приложение, и храните плоский список в сторе. Дерево восстанавливайте в селекторе, который его рисует, чтобы форма интерфейса не протекала в слой состояния.'
          ),
        },
      ],
      takeaway: L(
        'Use flatMap to map and flatten in one pass, Object.groupBy for string keys, Map.groupBy for typed keys, and keep the state layer flat.',
        'Используйте flatMap, чтобы отобразить и выровнить за один проход, Object.groupBy для строковых ключей, Map.groupBy для типизированных, и держите слой состояния плоским.'
      ),
      seeAlso: [
        L('Section 7-4: grouping through a fold', 'Секция 7-4: группировка через свёртку'),
        L('Chapter 13: data structures for nested collections', 'Глава 13: структуры данных для вложенных коллекций'),
        L('Chapter 14: rendering nested data in the DOM', 'Глава 14: рендеринг вложенных данных в DOM'),
      ],
    },
  ],
};
