import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh08: Chapter = {
  id: 'js-core-ch8',
  title: L('Loops, iterators and generators', 'Циклы, итераторы и генераторы'),
  summary: L(
    'How the three loop forms differ, what break and continue really change, how the iterable protocol and for...of work, why for...in misbehaves, and how generators turn a function into a lazy, pausable stream of values.',
    'Чем различаются три вида циклов, что на самом деле меняют break и continue, как устроен протокол итерируемости и for...of, почему for...in ведёт себя капризно и как генераторы превращают функцию в ленивый, приостанавливаемый поток значений.'
  ),
  sections: [
    {
      id: 'js-core-ch8-s1',
      title: L('for, while and do...while', 'for, while и do...while'),
      body: L(
        'Every loop in JavaScript comes in one of three shapes, and the difference is where the bookkeeping lives. The for loop takes an initialiser, a condition and an update expression, so the whole life of the counter is visible on one line: for (let i = 0; i < items.length; i++). The while loop takes only a condition, so the counter lives outside and is advanced inside the body. The do...while loop checks after the body, so the body always executes at least once.\n\nThat guarantee is the reason do...while still exists. Ask a user for a value, validate it and repeat until the answer is acceptable: the question has to be asked before it can be judged, so the first attempt is not optional. The same shape works for reading records until the end of a stream and for retrying a request a few times.\n\nIn a while loop the increment is an ordinary statement in the body, and that is where the classic infinite loop comes from. continue inside a while loop jumps to the condition check and skips the rest of the body, so the counter never advances and the loop never ends. In a for loop the update expression still runs after a continue, which makes the two forms behave differently. Keep the increment as the last statement of the body and make sure no path can jump over it.\n\nUse a loop instead of an array method when you need to stop early, when you need the index, or when the iteration itself is asynchronous. forEach cannot be broken out of: a return inside it leaves only the callback. map and filter build new arrays even when you wanted to stop at the first hit. Nested loops multiply as well: a double loop over n items is O(n squared), so the shape of the loop is often the performance decision.',
        'В JavaScript есть три вида циклов, и разница между ними в том, где живёт служебная часть. Цикл for состоит из инициализатора, условия и шага обновления, поэтому вся жизнь счётчика видна в одной строке: for (let i = 0; i < items.length; i++). Цикл while содержит только условие, значит счётчик живёт снаружи и увеличивается внутри тела. Цикл do...while тоже проверяет условие, но выполняет тело до проверки, поэтому тело всегда отрабатывает хотя бы один раз.\n\nИменно эта гарантия и держит do...while на плаву. Спросите у пользователя значение, проверьте его и повторяйте, пока ответ не станет приемлемым: вопрос нужно задать до того, как его можно оценить, поэтому первая попытка не опциональна. Та же форма подходит для чтения записей до конца потока и для повторных попыток запроса.\n\nВ цикле while инкремент — обычное выражение в теле, и именно отсюда берётся классический бесконечный цикл. continue внутри цикла while перескакивает сразу к проверке условия и пропускает остаток тела, поэтому счётчик не растёт и цикл не заканчивается. В цикле for шаг обновления выполняется и после continue, из-за чего поведение двух форм различается. Держите инкремент последним выражением тела и следите, чтобы ни один путь его не перепрыгивал.\n\nВыбирайте цикл вместо метода массива, когда нужно прерваться раньше, когда нужен индекс или когда сама итерация асинхронна. Из forEach нельзя выйти: return внутри него покидает только колбэк. map и filter строят новые массивы, даже если вам нужно было остановиться на первом совпадении. Вложенные циклы перемножаются: двойной цикл по n элементам это O(n²), поэтому форма цикла часто и есть решение по производительности.'
      ),
      bullets: [
        L('A for loop keeps the initialiser, condition and update on one line.', 'Цикл for держит инициализатор, условие и обновление в одной строке.'),
        L('do...while runs its body at least once, while may run zero times.', 'do...while выполняет тело хотя бы один раз, while может ни разу.'),
        L('continue in a while loop skips the increment and can loop forever.', 'continue в цикле while пропускает инкремент и даёт бесконечный цикл.'),
        L('forEach cannot be exited with break, only with return.', 'Из forEach нельзя выйти через break, только через return.'),
        L('Two nested loops over n items cost O(n squared).', 'Два вложенных цикла по n элементам стоят O(n²).'),
      ],
      code: `// for: initialiser, condition, update
for (let i = 0; i < 3; i++) {
  console.log(i);            // 0, 1, 2
}
// while: the counter lives outside the loop
let n = 0;
while (n < 3) {
  n++;                      // the increment lives in the body
}
// do...while: the body always runs at least once
let attempt = 0;
do {
  attempt++;
} while (attempt < 3);
console.log(attempt);        // 3
// for(;;) needs an explicit break to stop
let guard = 0;
for (;;) {
  if (++guard > 2) break;
}
console.log(guard);          // 3`,
      table: {
        caption: L('Choosing a loop header', 'Выбор заголовка цикла'),
        headers: [
          L('Loop', 'Цикл'),
          L('Condition', 'Условие'),
          L('Body runs', 'Тело выполняется'),
          L('Counter lives', 'Счётчик живёт'),
        ],
        rows: [
          [L('for', 'for'), L('in the header', 'в заголовке'), L('zero or more times', 'ноль или больше раз'), L('in the update expression', 'в шаге обновления')],
          [L('while', 'while'), L('in the header', 'в заголовке'), L('zero or more times', 'ноль или больше раз'), L('in the body', 'в теле')],
          [L('do...while', 'do...while'), L('in the footer', 'в подвале'), L('at least once', 'хотя бы один раз'), L('in the body', 'в теле')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('continue kills a while loop', 'continue убивает цикл while'),
          text: L(
            'continue in a while loop jumps to the condition check and skips the rest of the body. If the increment sits after the continue, the counter never changes and the loop spins forever. Keep the increment first in the body, or use a for loop where the update expression is guaranteed to run.',
            'continue в цикле while перескакивает к проверке условия и пропускает остаток тела. Если инкремент стоит после continue, счётчик не меняется и цикл крутится вечно. Держите инкремент в начале тела или используйте цикл for, где шаг обновления выполняется гарантированно.'
          ),
        },
        {
          tone: 'warning',
          title: L('Nested loops are quadratic', 'Вложенные циклы дают квадрат'),
          text: L(
            'A loop inside a loop runs the inner body n times for every item of the outer loop, so two loops over n items cost O(n squared) and three cost O(n cubed). Before writing a nested loop over large collections, check whether a Map lookup or a precomputed index can answer the same question.',
            'Цикл в цикле выполняет внутреннее тело n раз для каждого элемента внешнего цикла, поэтому два цикла по n элементам стоят O(n²), а три — O(n³). Прежде чем писать вложенный цикл по большим коллекциям, проверьте, не ответит ли на тот же вопрос поиск в Map или заранее построенный индекс.'
          ),
        },
      ],
      takeaway: L(
        'Use for when the counter belongs in the header, do...while when the body must run once, and never let a continue skip a while increment.',
        'Берите for, когда счётчик живёт в заголовке, do...while — когда тело обязано выполниться один раз, и никогда не допускайте, чтобы continue пропустил инкремент в while.'
      ),
      seeAlso: [
        L('Section 8-2: break, continue and labels', 'Секция 8-2: break, continue и метки'),
        L('Chapter 7: array methods that replace half of these loops', 'Глава 7: методы массивов, заменяющие половину этих циклов'),
        L('Chapter 13: complexity analysis of nested loops', 'Глава 13: анализ сложности вложенных циклов'),
      ],
    },
    {
      id: 'js-core-ch8-s2',
      title: L('break, continue and labels', 'break, continue и метки'),
      body: L(
        'break leaves the current loop entirely, continue starts the next iteration of it. Both work in for, while, do...while, for...of and for...in, and both work in a switch statement, where break is what prevents the fallthrough from the last case. The difference is scope: break skips the rest of the loop body, continue skips the rest of the current iteration and jumps to the update step or the condition check.\n\nBecause continue jumps to the condition in a while loop, it can skip the increment and produce an infinite loop. This is the single most common way a while loop hangs in production. The same statement inside a switch does something different again: it continues the loop that encloses the switch, not the switch itself, and the switch falls through to the remaining cases. A missing break in a switch and a continue in the middle of a case are two different bugs that look similar in the source.\n\nA label is an identifier attached to a statement, written as label: statement. break label exits the labelled statement, and continue label restarts the loop that carries the label. The classic use is a two-dimensional search: without labels the inner break would only leave the inner loop, so the outer loop would keep scanning rows that cannot contain the match. Labels are also the cleanest way to skip the rest of an outer loop while continuing the inner one.\n\nUse labels rarely. A labelled break is often a sign that the function wants to return a value instead, and a function with an early return is easier to read and to test than a flag variable plus a labelled break. In strict mode, and in every ES module, the reserved words such as let, static and yield cannot be used as label names, so the parser rejects them before a single line runs.',
        'break полностью покидает текущий цикл, continue переходит к следующей итерации. Оба работают в for, while, do...while, for...of и for...in, а также внутри switch, где именно break не дает упасть из последнего case в следующий. Разница в охвате: break пропускает остаток тела цикла, continue пропускает остаток текущей итерации и переходит к шагу обновления или к проверке условия.\n\nПоскольку continue перескакивает к условию в цикле while, он может пропустить инкремент и получить бесконечный цикл. Это самая частая причина зависания цикла while в проде. То же выражение внутри switch ведёт себя иначе: оно продолжает цикл, в который switch вложен, а не сам switch, и выполнение проваливается в оставшиеся case. Пропущенный break в switch и continue в середине case — два разных бага, которые в исходнике выглядят похоже.\n\nМетка — это идентификатор, прикреплённый к оператору, записывается как label: statement. break label выходит из помеченного оператора, а continue label перезапускает цикл с этой меткой. Классическое применение — двумерный поиск: без меток внутренний break покинул бы только внутренний цикл, и внешний продолжал бы просматривать строки, где совпадения быть не может. Метки же — самый чистый способ пропустить остаток внешнего цикла, продолжив внутренний.\n\nМетками пользуются редко. Помеченный break часто означает, что функции лучше вернуть значение, а функция с ранним return читается и тестируется проще, чем флаг-переменная в паре с меткой. В строгом режиме, а также в любом ES-модуле, зарезервированные слова вроде let, static и yield нельзя использовать как имена меток, поэтому парсер отвергает их ещё до выполнения первой строки.'
      ),
      bullets: [
        L('break leaves the loop, continue skips the rest of the iteration.', 'break покидает цикл, continue пропускает остаток итерации.'),
        L('continue in a while loop jumps over the increment.', 'continue в цикле while перескакивает через инкремент.'),
        L('continue inside a switch continues the enclosing loop.', 'continue внутри switch продолжает внешний цикл.'),
        L('A label is written label: statement and is used as break label.', 'Метка записывается как label: statement и используется в break label.'),
        L('In strict mode let, static and yield are rejected as label names.', 'В строгом режиме let, static и yield отвергаются как имена меток.'),
      ],
      code: `// break leaves the loop, continue starts the next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;   // skips 2
  if (i === 4) break;      // leaves the loop
  console.log(i);          // 0, 1, 3
}
// a label lets break exit a nested loop
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i * j > 1) break outer;
  }
}
// continue with a label jumps back to that loop's condition
let k = 0;
outer2: while (k < 3) {
  k++;
  if (k === 2) continue outer2;
}
console.log(k);             // 3`,
      table: {
        caption: L('Where control goes', 'Куда уходит управление'),
        headers: [
          L('Statement', 'Оператор'),
          L('Jumps to', 'Переход'),
          L('Affects', 'Действует на'),
          L('Typical use', 'Типичное применение'),
        ],
        rows: [
          [L('break', 'break'), L('after the loop', 'после цикла'), L('the innermost loop', 'внутренний цикл'), L('leave early', 'выйти заранее')],
          [L('continue', 'continue'), L('the next iteration', 'следующая итерация'), L('the innermost loop', 'внутренний цикл'), L('skip one item', 'пропустить один элемент')],
          [L('break label', 'break label'), L('after the labelled statement', 'после помеченного оператора'), L('the labelled loop', 'помеченный цикл'), L('exit nested loops', 'выйти из вложенных циклов')],
          [L('continue label', 'continue label'), L('the update of the labelled loop', 'шаг помеченного цикла'), L('the labelled loop', 'помеченный цикл'), L('skip an outer pass', 'пропустить внешний проход')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('continue inside a switch', 'continue внутри switch'),
          text: L(
            'A continue in a switch case continues the loop around the switch and lets the remaining cases fall through. If you meant to stop the case, use break; if you meant to leave the switch only, move the continue out of the case.',
            'continue в case конструкции switch продолжает цикл вокруг switch, и оставшиеся case проваливаются дальше. Если хотели закончить case — используйте break; если хотели выйти только из switch — вынесите continue из case.'
          ),
        },
        {
          tone: 'tip',
          title: L('Prefer a return over a labelled break', 'Лучше return, чем помеченный break'),
          text: L(
            'A labelled break usually means the function wants to produce a value and stop. Rewriting the search as a function with an early return removes the label, the flag variable and the extra exit paths.',
            'Помеченный break обычно означает, что функция хочет вернуть значение и остановиться. Если переписать поиск как функцию с ранним return, исчезают и метка, и флаг-переменная, и лишние точки выхода.'
          ),
        },
      ],
      takeaway: L(
        'Use break to leave and continue to skip, and reach for a label only when a nested loop must be exited from the inside.',
        'Используйте break, чтобы выйти, и continue, чтобы пропустить, а к меткам обращайтесь только тогда, когда из вложенного цикла нужно выйти изнутри.'
      ),
      seeAlso: [
        L('Section 8-3: for...of with break and continue', 'Секция 8-3: for...of с break и continue'),
        L('Chapter 2: switch and the fallthrough trap', 'Глава 2: switch и ловушка проваливания'),
        L('Section 8-1: the safe increment in a while loop', 'Секция 8-1: безопасный инкремент в цикле while'),
      ],
    },
    {
      id: 'js-core-ch8-s3',
      title: L('for...of and the iterable protocol', 'for...of и протокол итерируемости'),
      body: L(
        'for...of iterates over the values of an iterable, not over indexes. It works with arrays, strings, Set, Map, NodeList, typed arrays and generators, and it accepts break and continue like any other loop. For a Map it yields pairs, so destructuring the entry as [key, value] is the normal way to read it. Over a string it walks the code points, so an emoji outside the basic plane arrives as one value instead of two broken halves.\n\nUnder the hood the loop uses a protocol with two halves. An object is iterable when it has a method under the well-known symbol Symbol.iterator, and that method returns an iterator. An iterator is an object with a next method that returns an object of the shape { value, done }. The loop asks for the iterator, calls next repeatedly and stops when done becomes true. A plain object has no Symbol.iterator method, so for...of over it throws a TypeError.\n\nAdding that method is all it takes to make your own structures work with the whole language: destructuring, spread, Promise.all and Array.from all speak the same protocol. A generator method written as *[Symbol.iterator]() in an object literal is the shortest way to expose the values of a custom container, and it keeps the iteration logic in one place instead of spreading it across a class.\n\nChoose for...of over forEach whenever you need to break out of the iteration, need the index, or the iteration is asynchronous. forEach ignores a returned promise, so asynchronous work started inside it runs unsupervised and the loop finishes before the work does. for...of over an async iterable, written as for await...of, awaits each value in turn and is the correct shape for streams, paginated APIs and polling.',
        'for...of перебирает значения итерируемого объекта, а не индексы. Он работает с массивами, строками, Set, Map, NodeList, типизированными массивами и генераторами и, как любой цикл, понимает break и continue. Для Map он отдаёт пары, поэтому чтение записи через деструктуризацию [key, value] — обычный способ. По строке цикл идёт по кодовым точкам, поэтому эмодзи вне базовой плоскости приходит одним значением, а не двумя половинами.\n\nПод капотом работает протокол из двух половин. Объект итерируем, если у него есть метод под общеизвестным символом Symbol.iterator, и этот метод возвращает итератор. Итератор — объект с методом next, возвращающим объект вида { value, done }. Цикл получает итератор, вызывает next по кругу и останавливается, когда done становится истинным. У обычного объекта метода Symbol.iterator нет, поэтому for...of над ним бросает TypeError.\n\nЧтобы ваши структуры работали со всем языком, достаточно добавить этот метод: деструктуризация, spread, Promise.all и Array.from говорят на том же протоколе. Генераторный метод *[Symbol.iterator]() в литерале объекта — самый короткий способ открыть значения собственного контейнера, и он держит логику обхода в одном месте, а не разбрасывает её по классу.\n\nВыбирайте for...of вместо forEach, когда нужно прервать обход, нужен индекс или итерация асинхронна. forEach игнорирует возвращённый промис, поэтому асинхронная работа внутри него остаётся без контроля, а цикл заканчивается раньше неё. Обход асинхронного итерируемого объекта, записанный как for await...of, последовательно ожидает каждое значение и является правильной формой для потоков, пагинированных API и опроса сервера.'
      ),
      bullets: [
        L('for...of yields values, not indexes.', 'for...of отдаёт значения, а не индексы.'),
        L('A plain object is not iterable and throws a TypeError.', 'Обычный объект не итерируем и бросает TypeError.'),
        L('An object becomes iterable by adding a method under Symbol.iterator.', 'Объект становится итерируемым, если добавить метод под Symbol.iterator.'),
        L('Map yields [key, value] pairs that destructuring unpacks.', 'Map отдаёт пары [key, value], которые распаковывает деструктуризация.'),
        L('forEach ignores a returned promise, for await...of awaits each value.', 'forEach игнорирует возвращённый промис, for await...of ожидает каждое значение.'),
      ],
      code: `// for...of yields values, not indexes
for (const value of [10, 20, 30]) {
  console.log(value);          // 10, 20, 30
}
// strings, Sets and Maps are iterable
for (const ch of 'hey') console.log(ch);        // h, e, y
for (const [key, value] of new Map([['a', 1]])) console.log(key, value);
// a plain object is NOT iterable
// for (const item of { a: 1 }) {}   // TypeError: not iterable
// make it iterable with a generator method
const bag = {
  *[Symbol.iterator]() {
    yield 'x';
    yield 'y';
  },
};
for (const item of bag) console.log(item);      // x, y`,
      table: {
        caption: L('What works with for...of', 'Что работает с for...of'),
        headers: [
          L('Value', 'Значение'),
          L('for...of', 'for...of'),
          L('Notes', 'Заметки'),
        ],
        rows: [
          [L('Array', 'Массив'), L('yes', 'да'), L('yields the elements', 'отдаёт элементы')],
          [L('String', 'Строка'), L('yes', 'да'), L('yields code points', 'отдаёт кодовые точки')],
          [L('Set and Map', 'Set и Map'), L('yes', 'да'), L('Map yields [key, value]', 'Map отдаёт [key, value]')],
          [L('NodeList', 'NodeList'), L('yes', 'да'), L('works on collections from the DOM', 'работает по DOM-коллекциям')],
          [L('Plain object', 'Обычный объект'), L('no', 'нет'), L('needs a Symbol.iterator method', 'нужен метод Symbol.iterator')],
          [L('Async iterable', 'Асинхронный итерируемый'), L('only with for await...of', 'только с for await...of'), L('each value is a promise', 'каждое значение — промис')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('for...of over a plain object throws', 'for...of над обычным объектом бросает исключение'),
          text: L(
            'Objects are not iterable by default, so for (const x of { a: 1 }) throws "is not iterable". If you meant to walk the values of an object, use Object.values(obj) or Object.entries(obj), and add a Symbol.iterator method only when the object should behave like a collection.',
            'Объекты по умолчанию не итерируемы, поэтому for (const x of { a: 1 }) бросает «is not iterable». Если хотели пройтись по значениям объекта, используйте Object.values(obj) или Object.entries(obj), а метод Symbol.iterator добавляйте только тогда, когда объект должен вести себя как коллекция.'
          ),
        },
        {
          tone: 'tip',
          title: L('One generator method, many consumers', 'Один генераторный метод — много потребителей'),
          text: L(
            'A single *[Symbol.iterator]() method makes your object work with for...of, spread, destructuring, Promise.all and Array.from at the same time, and it keeps the traversal logic in one place instead of duplicating it for every consumer.',
            'Один метод *[Symbol.iterator]() делает объект пригодным сразу для for...of, spread, деструктуризации, Promise.all и Array.from и держит логику обхода в одном месте вместо дублирования под каждого потребителя.'
          ),
        },
      ],
      takeaway: L(
        'Prefer for...of whenever you need values, and make an object iterable by giving it a Symbol.iterator method.',
        'Предпочитайте for...of, когда нужны значения, а объект делайте итерируемым, добавив ему метод Symbol.iterator.'
      ),
      seeAlso: [
        L('Section 8-5: generators under the hood', 'Секция 8-5: генераторы под капотом'),
        L('Chapter 7: array methods and the iterable protocol', 'Глава 7: методы массивов и протокол итерируемости'),
        L('Section 8-4: for...in and its traps', 'Секция 8-4: for...in и его ловушки'),
      ],
    },
    {
      id: 'js-core-ch8-s4',
      title: L('for...in and its traps', 'for...in и его ловушки'),
      body: L(
        'for...in walks the enumerable string keys of an object, not the values. The keys always come back as strings, so even a numeric key arrives as "42" and needs a conversion before it can be used as an index. Unlike Object.keys, for...in also visits the inherited enumerable properties, which means a prototype method added by a library shows up in the loop.\n\nThe order is defined but not intuitive. Keys that look like array indices are visited first, in ascending numeric order, and the remaining string keys follow in insertion order. Properties added during the loop may or may not be visited, and a property deleted during the loop will not be visited. Relying on the order for anything beyond "give me the keys" is a bug waiting to happen.\n\nfor...in over an array is the classic trap. It returns string indexes, it skips the holes of a sparse array, and it also walks any extra enumerable property someone attached to the array. For an array you almost always want for...of over the values, or Object.entries to get both key and value.\n\nObject.keys, Object.values and Object.entries return own enumerable properties only, which is what people usually mean, so prefer them. When you must keep a for...in, guard it with Object.hasOwn(obj, key) or the older Object.prototype.hasOwnProperty.call(obj, key). The remaining legitimate uses are narrow: enumerating the keys of an object whose shape you do not control, often while building a lookup map or filtering by prefix.',
        'for...in перебирает перечислимые строковые ключи объекта, а не значения. Ключи всегда возвращаются строками, поэтому даже числовой ключ приходит как "42" и требует приведения, прежде чем его можно использовать как индекс. В отличие от Object.keys, for...in заходит и в унаследованные перечислимые свойства, а значит метод прототипа, добавленный библиотекой, тоже попадёт в цикл.\n\nПорядок определён, но выглядит непривычно. Ключи, похожие на индексы массива, обходятся первыми, по возрастанию числа, а остальные строковые ключи идут следом в порядке вставки. Свойство, добавленное во время цикла, может попасть в обход, а может и нет; удалённое во время цикла не попадёт. Опираться на порядок вообще ни к чему, кроме «дайте мне ключи», — это заготовка бага.\n\nКлассическая ловушка — for...in по массиву. Он возвращает строковые индексы, пропускает дыры разреженного массива и вдобавок обходит все лишние перечислимые свойства, которые кто-то повесил на массив. Для массива почти всегда нужен for...of по значениям или Object.entries, чтобы получить и ключ, и значение.\n\nObject.keys, Object.values и Object.entries возвращают только собственные перечислимые свойства — обычно именно это и имеется в виду, поэтому предпочитайте их. Если цикл for...in всё же нужен, прикрывайте его проверкой Object.hasOwn(obj, key) или старым Object.prototype.hasOwnProperty.call(obj, key). Оставшиеся законные применения узкие: перебор ключей объекта, чью форму вы не контролируете, часто при построении таблицы соответствий или фильтрации по префиксу.'
      ),
      bullets: [
        L('for...in yields string keys, never the values.', 'for...in отдаёт строковые ключи, а не значения.'),
        L('Inherited enumerable properties are visited as well.', 'Унаследованные перечислимые свойства тоже обходятся.'),
        L('Integer-like keys come first, in ascending order.', 'Ключи-числа обходятся первыми, по возрастанию.'),
        L('Holes of a sparse array are skipped.', 'Дыры разреженного массива пропускаются.'),
        L('Object.keys returns own enumerable keys only.', 'Object.keys возвращает только собственные перечислимые ключи.'),
        L('Object.hasOwn filters inherited keys out of a loop.', 'Object.hasOwn отсеивает унаследованные ключи в цикле.'),
      ],
      code: `const parent = { inherited: true };
const child = Object.create(parent);
child.own = 1;

for (const key in child) {
  console.log(key);              // 'own', then 'inherited'
}

// inherited keys are included, so filter them out
for (const key in child) {
  if (!Object.hasOwn(child, key)) continue;
  console.log(key);              // 'own'
}

// Object.keys returns own enumerable keys only
console.log(Object.keys(child)); // ['own']

// sparse arrays: the holes are skipped
const sparse = [1, , 3];
for (const index in sparse) console.log(index);   // 0, 2
sparse.forEach((v) => console.log(v));            // 1, 3 - forEach skips holes too`,
      table: {
        caption: L('Four ways to walk an object', 'Четыре способа обойти объект'),
        headers: [
          L('Form', 'Форма'),
          L('Own keys', 'Свои ключи'),
          L('Inherited keys', 'Унаследованные'),
          L('Best for', 'Лучше всего для'),
        ],
        rows: [
          [L('for...in', 'for...in'), L('yes', 'да'), L('yes', 'да'), L('legacy enumeration, filtered', 'старый перебор с фильтрацией')],
          [L('Object.keys', 'Object.keys'), L('yes', 'да'), L('no', 'нет'), L('a list of keys', 'список ключей')],
          [L('Object.entries', 'Object.entries'), L('yes', 'да'), L('no', 'нет'), L('keys and values together', 'ключи и значения вместе')],
          [L('for...of', 'for...of'), L('n/a', 'неприменимо'), L('n/a', 'неприменимо'), L('values of an iterable', 'значения итерируемого')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('for...in over an array', 'for...in по массиву'),
          text: L(
            'It gives string indexes, it skips holes in sparse arrays, and it walks extra properties attached to the array. Use for...of for the values, or Object.entries when you need the index as well.',
            'Он даёт строковые индексы, пропускает дыры разреженного массива и обходит лишние свойства, повешенные на массив. Для значений нужен for...of, а если нужен ещё и индекс — Object.entries.'
          ),
        },
        {
          tone: 'tip',
          title: L('Guard every for...in', 'Прикрывайте каждый for...in'),
          text: L(
            'Object.hasOwn(obj, key) is the short modern form and needs no extra borrowing from the prototype. The classic Object.prototype.hasOwnProperty.call(obj, key) still works everywhere, including on objects created with Object.create(null), which have no prototype at all.',
            'Object.hasOwn(obj, key) — короткая современная форма, не требующая ничего брать у прототипа. Классический Object.prototype.hasOwnProperty.call(obj, key) работает везде, в том числе на объектах, созданных через Object.create(null), у которых прототипа нет вообще.'
          ),
        },
      ],
      takeaway: L(
        'Use for...in only for legacy key enumeration and always guard it with Object.hasOwn.',
        'Используйте for...in только для старого перебора ключей и всегда прикрывайте его проверкой Object.hasOwn.'
      ),
      seeAlso: [
        L('Chapter 5: the prototype chain and inherited properties', 'Глава 5: цепочка прототипов и унаследованные свойства'),
        L('Section 8-3: for...of and the iterable protocol', 'Секция 8-3: for...of и протокол итерируемости'),
        L('Chapter 7: Object.keys, Object.entries and Object.values', 'Глава 7: Object.keys, Object.entries и Object.values'),
      ],
    },
    {
      id: 'js-core-ch8-s5',
      title: L('Generators and async generators', 'Генераторы и асинхронные генераторы'),
      body: L(
        'A generator function is declared with a star between the keyword and the name: function* counter(limit). Calling it does not run the body. It returns a generator object, and the body starts only when somebody asks for the first value. Every yield suspends the function at that line and hands a value to the caller; when the caller asks for the next value, the function resumes right after the yield with the state it had when it paused.\n\nThe result of asking is an object with two fields: value holds what was produced and done says whether the generator is finished. A return statement inside a generator does not throw or exit the function; it sets the final value, which the consumer receives together with done set to true. The generator object is itself iterable, so for...of, spread and Array.from consume it without any extra work.\n\nBecause a generator produces values on demand, it can be infinite. A generator of natural numbers never ends, yet it costs nothing to hold, and the consumer decides when to stop by breaking out of the loop. That laziness is the whole point: an infinite sequence is only a problem if you try to store it in an array.\n\nAn async generator, written async function*, is the asynchronous version: it yields promises and is consumed with for await...of, which awaits each value in turn. This is the shape that fits paginated APIs, log tailing, streams and any queue where the next chunk arrives later. Generators are worth reaching for when work is lazy, when the sequence is endless, when a tree is walked in order, or when a state machine is easier to read as a sequence of suspended steps than as a set of flags.',
        'Функция-генератор объявляется звездочкой между ключевым словом и именем: function* counter(limit). Вызов не выполняет тело. Он возвращает объект-генератор, а тело начинается, только когда кто-то попросит первое значение. Каждый yield приостанавливает функцию на этой строке и отдаёт значение вызывающему; когда вызывающий просит следующее значение, функция продолжается сразу после yield, сохранив то состояние, в котором она остановилась.\n\nРезультат запроса — объект с двумя полями: value хранит произведённое значение, а done сообщает, завершён ли генератор. Оператор return внутри генератора не бросает исключение и не выходит из функции, а задаёт итоговое значение, которое потребитель получает вместе с done, равным true. Сам объект-генератор итерируем, поэтому for...of, spread и Array.from потребляют его без дополнительных усилий.\n\nПоскольку генератор производит значения по требованию, он может быть бесконечным. Генератор натуральных чисел не заканчивается, но стоит ноль, а потребитель сам решает, когда остановиться, выйдя из цикла. Именно эта ленивость и есть суть: бесконечная последовательность становится проблемой только тогда, когда её пытаются положить в массив.\n\nАсинхронный генератор, записываемый async function*, — асинхронная версия: он отдаёт промисы и потребляется через for await...of, который последовательно ожидает каждое значение. Эта форма подходит пагинированным API, чтению логов в хвост, потокам и любым очередям, где следующий кусок приходит позже. К генераторам стоит обращаться, когда работа ленивая, когда последовательность бесконечна, когда дерево обходится по порядку или когда конечный автомат читается понятнее как последовательность приостановленных шагов, чем как набор флагов.'
      ),
      bullets: [
        L('function* returns an iterator, and the body runs only on the first next().', 'function* возвращает итератор, а тело выполняется только на первом next().'),
        L('yield pauses the function and sends a value to the consumer.', 'yield приостанавливает функцию и отправляет значение потребителю.'),
        L('next() returns { value, done }, and done turns true at the end.', 'next() возвращает { value, done }, и в конце done становится true.'),
        L('return inside a generator sets the final value of the sequence.', 'return внутри генератора задаёт итоговое значение последовательности.'),
        L('A generator object is iterable, so for...of consumes it directly.', 'Объект-генератор итерируем, поэтому его напрямую потребляет for...of.'),
        L('async function* yields promises and is consumed with for await...of.', 'async function* отдаёт промисы и потребляется через for await...of.'),
      ],
      code: `function* counter(limit) {
  for (let i = 1; i <= limit; i++) yield i;
  return 'done';              // final value, arrives with done: true
}
const gen = counter(2);
gen.next();                   // { value: 1, done: false }
gen.next();                   // { value: 2, done: false }
gen.next();                   // { value: 'done', done: true }
function* naturals() {
  let n = 0;
  while (true) yield ++n;     // infinite and lazy
}
for (const n of naturals()) {
  if (n > 3) break;           // the consumer decides when to stop
}
async function* pages() {
  yield { page: 1 };          // async generators feed for await...of
}
async function main() {
  for await (const p of pages()) console.log(p);
}
main();`,
      table: {
        caption: L('Iteration styles compared', 'Сравнение способов обхода'),
        headers: [
          L('Form', 'Форма'),
          L('Produces', 'Даёт'),
          L('Can break', 'Можно прервать'),
          L('Notes', 'Заметки'),
        ],
        rows: [
          [L('forEach', 'forEach'), L('nothing', 'ничего'), L('no', 'нет'), L('callback only, no return value', 'только колбэк, без результата')],
          [L('for...of', 'for...of'), L('values', 'значения'), L('yes', 'да'), L('needs an iterable, not lazy', 'нужен итерируемый объект, не ленивый')],
          [L('generator', 'генератор'), L('one value at a time', 'по одному значению'), L('yes', 'да'), L('lazy, may be infinite', 'ленивый, может быть бесконечным')],
          [L('async generator', 'асинхронный генератор'), L('promises', 'промисы'), L('yes', 'да'), L('lazy, read with for await...of', 'ленивый, читается через for await...of')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Nothing happens until you pull', 'Пока не потянули — ничего не происходит'),
          text: L(
            'A generator that is created but never iterated never runs a single line of its body. If you expected side effects, call next() explicitly or convert it with Array.from(gen) to materialise the values.',
            'Генератор, который создали, но ни разу не обошли, не выполнит ни одной строки тела. Если жёте побочных эффектов, вызовите next() явно или превратите его в массив через Array.from(gen).'
          ),
        },
        {
          tone: 'tip',
          title: L('Delegate with yield*', 'Делегируйте через yield*'),
          text: L(
            'yield* hands another iterable to the consumer without copying it, so a generator can flatten a list of lists or expose several sources as one sequence.',
            'yield* передаёт потребителю другой итерируемый объект без копирования, поэтому генератор может развернуть список списков или выдать несколько источников как одну последовательность.'
          ),
        },
      ],
      takeaway: L(
        'A generator is a lazy, pausable function: it runs only while values are pulled from it, so it can be infinite and cheap.',
        'Генератор — это ленивая, приостанавливаемая функция: она работает только пока из неё тянут значения, поэтому может быть бесконечной и бесплатной.'
      ),
      seeAlso: [
        L('Section 8-3: the iterable protocol behind for...of', 'Секция 8-3: протокол итерируемости за for...of'),
        L('Chapter 11: async iteration and the event loop', 'Глава 11: асинхронный обход и цикл событий'),
        L('Chapter 13: generators for lazy structures and tree traversal', 'Глава 13: генераторы для ленивых структур и обхода дерева'),
      ],
    },
  ],
};
