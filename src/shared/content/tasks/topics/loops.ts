import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const loopsTasks: PracticeTask[] = [
  {
    id: 'topic-loops-1',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'basic',
    title: L('FizzBuzz', 'ФизБазз'),
    brief: L(
      'Write a function fizzBuzz(n) that prints the numbers from 1 to n, one per line. If a number is divisible by 3 print "Fizz" instead, if it is divisible by 5 print "Buzz", and if it is divisible by both 3 and 5 print "FizzBuzz". Otherwise print the number itself. Example: fizzBuzz(5) prints 1, 2, Fizz, 4, Buzz.',
      'Напишите функцию fizzBuzz(n), которая выводит числа от 1 до n, по одному в строке. Если число делится на 3 — выводите "Fizz", если делится на 5 — "Buzz", а если делится и на 3, и на 5 — "FizzBuzz". Иначе выводите само число. Пример: fizzBuzz(5) выводит 1, 2, Fizz, 4, Buzz.'
    ),
    hint: L(
      'Test the "divisible by both" case first, otherwise multiples of 15 would only print "Fizz".',
      'Сначала проверяйте случай делимости на оба числа, иначе для кратных 15 выведется только "Fizz".'
    ),
    solution: `function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}

fizzBuzz(5);`,
    explanation: L(
      'The modulo operator (%) returns the remainder, so i % 3 === 0 means "i is divisible by 3". The order of the branches matters: the "both" case must be checked before the single cases, because the first matching branch wins and a multiple of 15 would otherwise stop at the "Fizz" branch. The for loop starts at 1 and the condition i <= n includes n itself.',
      'Оператор остатка (%) возвращает остаток от деления, поэтому i % 3 === 0 означает "i делится на 3". Порядок веток важен: случай "делится на оба" проверяется первым, так как выполняется первая подошедшая ветка, и кратное 15 остановилось бы на "Fizz". Цикл for начинается с 1, а условие i <= n включает само n.'
    ),
  },
  {
    id: 'topic-loops-2',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'basic',
    title: L('Sum of digits', 'Сумма цифр числа'),
    brief: L(
      'Write a function sumDigits(n) that returns the sum of the digits of a non-negative integer. Work with a while loop and do not use string conversion. Example: sumDigits(1234) returns 10, sumDigits(905) returns 14, sumDigits(0) returns 0.',
      'Напишите функцию sumDigits(n), которая возвращает сумму цифр неотрицательного целого числа. Используйте цикл while и не переводите число в строку. Пример: sumDigits(1234) возвращает 10, sumDigits(905) возвращает 14, sumDigits(0) возвращает 0.'
    ),
    hint: L(
      'The last digit is n % 10, and dropping it is Math.floor(n / 10).',
      'Последняя цифра — это n % 10, а убрать её можно через Math.floor(n / 10).'
    ),
    solution: `function sumDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}

console.log(sumDigits(1234)); // 10
console.log(sumDigits(905)); // 14
console.log(sumDigits(0)); // 0`,
    explanation: L(
      'n % 10 peels off the last digit, and Math.floor(n / 10) removes it, so each iteration processes exactly one digit. The accumulator starts at 0 and the loop stops as soon as n reaches 0, which also gives the correct answer of 0 for the input 0 without a special case.',
      'n % 10 отделяет последнюю цифру, а Math.floor(n / 10) убирает её, поэтому каждая итерация обрабатывает ровно одну цифру. Аккумулятор начинается с 0, а цикл заканчивается, как только n становится равным 0, поэтому вход 0 тоже обрабатывается без отдельной проверки.'
    ),
  },
  {
    id: 'topic-loops-3',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'basic',
    title: L('Triangular numbers', 'Треугольные числа'),
    brief: L(
      'Write a function isTriangular(n) that returns true if n is a triangular number, that is, a number of the form k * (k + 1) / 2 for some integer k >= 1, and false otherwise. Example: isTriangular(1) is true, isTriangular(6) is true, isTriangular(10) is true, isTriangular(8) is false, isTriangular(0) is false.',
      'Напишите функцию isTriangular(n), которая возвращает true, если n является треугольным числом, то есть числом вида k * (k + 1) / 2 для некоторого целого k >= 1, и false иначе. Пример: isTriangular(1) — true, isTriangular(6) — true, isTriangular(10) — true, isTriangular(8) — false, isTriangular(0) — false.'
    ),
    hint: L(
      'Build the sequence 1, 3, 6, 10, 15, ... by adding the next k, and stop as soon as the running sum reaches or passes n.',
      'Стройте последовательность 1, 3, 6, 10, 15, ... прибавляя следующее k, и останавливайтесь, как только накопленная сумма достигла n или превысила его.'
    ),
    solution: `function isTriangular(n) {
  if (n < 1) return false;

  let sum = 0;
  let k = 1;
  while (sum < n) {
    sum += k;
    k++;
  }
  return sum === n;
}

console.log(isTriangular(1)); // true
console.log(isTriangular(6)); // true
console.log(isTriangular(10)); // true
console.log(isTriangular(8)); // false
console.log(isTriangular(0)); // false`,
    explanation: L(
      'Triangular numbers are the partial sums 1, 1 + 2, 1 + 2 + 3, ... so the loop adds the next k to a running total. The loop runs while the total is still smaller than n, and it stops either exactly on n (true) or past it (false). Because the sequence is strictly increasing, once the total passes n there is no need to keep going.',
      'Треугольные числа — это частичные суммы 1, 1 + 2, 1 + 2 + 3, ..., поэтому цикл прибавляет следующее k к накопленной сумме. Пока сумма меньше n, цикл продолжается, а останавливается он либо ровно на n (true), либо уже за ним (false). Так как последовательность строго возрастает, после превышения n продолжать проверку не нужно.'
    ),
  },
  {
    id: 'topic-loops-4',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'intermediate',
    title: L('Multiplication table', 'Таблица умножения'),
    brief: L(
      'Write a function multiplicationTable(n) that returns the multiplication table for 1..n as a string. Rows are separated by a newline, values inside a row are separated by a single space, and no row has a trailing space. Example: multiplicationTable(3) returns "1 2 3\\n2 4 6\\n3 6 9".',
      'Напишите функцию multiplicationTable(n), которая возвращает таблицу умножения для чисел от 1 до n в виде строки. Строки разделены переводом строки, значения внутри строки — одним пробелом, и в конце строки нет лишнего пробела. Пример: multiplicationTable(3) возвращает "1 2 3\\n2 4 6\\n3 6 9".'
    ),
    hint: L(
      'Use two nested loops: the outer one picks the row, the inner one builds the values of that row, then join the row with " " and join all rows with "\\n".',
      'Используйте два вложенных цикла: внешний выбирает строку, внутренний собирает её значения, затем соедините строку через " ", а все строки — через "\\n".'
    ),
    solution: `function multiplicationTable(n) {
  const rows = [];

  for (let i = 1; i <= n; i++) {
    const row = [];
    for (let j = 1; j <= n; j++) {
      row.push(i * j);
    }
    rows.push(row.join(' '));
  }

  return rows.join('\\n');
}

console.log(multiplicationTable(3));`,
    explanation: L(
      'The outer loop produces the rows and the inner loop produces the cells of the current row. Joining the cells first and then joining the rows avoids the classic trailing-space problem, because join inserts the separator only between elements. The result is a single string, so it can be printed or stored directly.',
      'Внешний цикл создаёт строки, а вложенный — ячейки текущей строки. Сначала соединяем ячейки, потом строки — так не появляется лишний пробел в конце, потому что join вставляет разделитель только между элементами. Результат — одна строка, её можно вывести или сохранить.'
    ),
  },
  {
    id: 'topic-loops-5',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'intermediate',
    title: L('Is it a prime number?', 'Проверка на простое число'),
    brief: L(
      'Write a function isPrime(n) that returns true if n is a prime number (an integer greater than 1 that has exactly two divisors) and false otherwise. Do not test every number up to n — only divisors up to the square root. Example: isPrime(2) is true, isPrime(9) is false, isPrime(97) is true, isPrime(1) is false, isPrime(0) is false.',
      'Напишите функцию isPrime(n), которая возвращает true, если n — простое число (целое число больше 1, у которого ровно два делителя), и false иначе. Не перебирайте все числа до n — проверяйте делители только до квадратного корня. Пример: isPrime(2) — true, isPrime(9) — false, isPrime(97) — true, isPrime(1) — false, isPrime(0) — false.'
    ),
    hint: L(
      'If n has a divisor d, it also has n / d, so one of them is always at most the square root of n.',
      'Если у n есть делитель d, то есть и n / d, значит один из них всегда не больше квадратного корня n.'
    ),
    solution: `function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;

  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}

console.log(isPrime(2)); // true
console.log(isPrime(9)); // false
console.log(isPrime(97)); // true
console.log(isPrime(1)); // false`,
    explanation: L(
      'Divisors come in pairs: if d divides n, then n / d divides n too, so at least one member of every pair is not greater than the square root of n. That is why checking d * d <= n is enough. Even numbers are handled separately, and the remaining candidates are odd, so the loop can step by 2 and test only half of them.',
      'Делители образуют пары: если d делит n, то и n / d делит n, значит хотя бы один из пары не больше квадратного корня n. Поэтому достаточно проверять d * d <= n. Чётные числа разбираются отдельно, а остальные кандидаты нечётные, поэтому цикл шагает на 2 и проверяет только половину.'
    ),
  },
  {
    id: 'topic-loops-6',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'advanced',
    title: L('Count the divisors', 'Количество делителей числа'),
    brief: L(
      'Write a function countDivisors(n) that returns how many positive divisors n has. For n = 1 the answer is 1. Example: countDivisors(12) returns 6 (divisors 1, 2, 3, 4, 6, 12), countDivisors(13) returns 2, countDivisors(16) returns 5, countDivisors(1) returns 1. If n is not a positive integer, return 0.',
      'Напишите функцию countDivisors(n), которая возвращает количество положительных делителей числа n. Для n = 1 ответ равен 1. Пример: countDivisors(12) возвращает 6 (делители 1, 2, 3, 4, 6, 12), countDivisors(13) возвращает 2, countDivisors(16) возвращает 5, countDivisors(1) возвращает 1. Если n не является положительным целым числом, верните 0.'
    ),
    hint: L(
      'Count divisors in pairs (d and n / d). A perfect square has a single middle divisor, so add 1 instead of 2 for it.',
      'Считайте делители парами (d и n / d). У полного квадрата один центральный делитель, поэтому для него прибавляйте 1, а не 2.'
    ),
    solution: `function countDivisors(n) {
  if (!Number.isInteger(n) || n < 1) return 0;

  let count = 0;
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      count += d * d === n ? 1 : 2;
    }
  }
  return count;
}

console.log(countDivisors(12)); // 6
console.log(countDivisors(13)); // 2
console.log(countDivisors(16)); // 5
console.log(countDivisors(1)); // 1`,
    explanation: L(
      'Every divisor d below the square root is matched by n / d above it, so one loop iteration accounts for two divisors at once. The only exception is a perfect square, where d and n / d are the same number, and that is why the count is increased by 1 instead of 2. The result grows as the square root of n, which is much faster than scanning all numbers up to n.',
      'Каждому делителю d ниже квадратного корня соответствует делитель n / d выше него, поэтому одна итерация цикла учитывает сразу два делителя. Единственное исключение — полный квадрат, где d и n / d совпадают, поэтому к счётчику прибавляется 1, а не 2. Сложность растёт как корень из n, что намного быстрее перебора всех чисел до n.'
    ),
  },
  {
    id: 'topic-loops-7',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'advanced',
    title: L('Find duplicates without Set', 'Найти повторы без Set'),
    brief: L(
      'Write a function findDuplicates(list) that returns an array of the values that occur more than once, each value listed once, in the order of its first repetition. Do not use Set, Map, or Object.keys. Example: findDuplicates([1, 2, 3, 2, 4, 1, 5]) returns [2, 1], findDuplicates([1, 2, 3]) returns [], findDuplicates([]) returns [].',
      'Напишите функцию findDuplicates(list), которая возвращает массив значений, встречающихся больше одного раза, каждое значение — один раз, в порядке его первого повторения. Не используйте Set, Map или Object.keys. Пример: findDuplicates([1, 2, 3, 2, 4, 1, 5]) возвращает [2, 1], findDuplicates([1, 2, 3]) возвращает [], findDuplicates([]) возвращает [].'
    ),
    hint: L(
      'Keep two arrays: one with all values seen so far and one with the duplicates found. indexOf tells you whether a value is already there.',
      'Держите два массива: один со всеми встреченными значениями, второй — с найденными повторами. indexOf подскажет, есть ли значение в массиве.'
    ),
    solution: `function findDuplicates(list) {
  const seen = [];
  const duplicates = [];

  for (const value of list) {
    if (seen.indexOf(value) === -1) {
      seen.push(value);
    } else if (duplicates.indexOf(value) === -1) {
      duplicates.push(value);
    }
  }
  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1, 5])); // [2, 1]
console.log(findDuplicates([1, 2, 3])); // []`,
    explanation: L(
      'The seen array stores every value the first time it appears, so a value that is missing from it has never been met. When a value is found in seen but not yet in duplicates, it is a repeated value and is added to the result exactly once. The order of the result is therefore the order of the first repetition.',
      'Массив seen хранит каждое значение при первом появлении, значит отсутствующее в нём значение ещё не встречалось. Если значение найдено в seen, но ещё нет в duplicates — это повтор, и оно добавляется в результат ровно один раз. Поэтому порядок результата совпадает с порядком первых повторений.'
    ),
  },
  {
    id: 'topic-loops-8',
    moduleId: 'js-core',
    topic: 'loops',
    level: 'advanced',
    title: L('Number pyramid', 'Числовая пирамида'),
    brief: L(
      'Write a function numberPyramid(rows) that returns a number pyramid as a string. Row 1 contains one number, row 2 contains two, and so on; the numbers are consecutive starting from 1 and continue across rows. Rows are separated by a newline, numbers in a row are separated by a single space. Example: numberPyramid(3) returns "1\\n2 3\\n4 5 6", numberPyramid(1) returns "1".',
      'Напишите функцию numberPyramid(rows), которая возвращает числовую пирамиду в виде строки. В первой строке одно число, во второй — два и так далее; числа идут подряд, начиная с 1, и продолжаются через строки. Строки разделены переводом строки, числа внутри строки — одним пробелом. Пример: numberPyramid(3) возвращает "1\\n2 3\\n4 5 6", numberPyramid(1) возвращает "1".'
    ),
    hint: L(
      'Keep a counter next outside the loops and increase it after every value, so the numbering continues across rows.',
      'Держите счётчик рядом с циклами и увеличивайте его после каждого значения, чтобы нумерация продолжалась между строками.'
    ),
    solution: `function numberPyramid(rows) {
  const lines = [];
  let next = 1;

  for (let r = 1; r <= rows; r++) {
    const row = [];
    for (let c = 0; c < r; c++) {
      row.push(next);
      next++;
    }
    lines.push(row.join(' '));
  }
  return lines.join('\\n');
}

console.log(numberPyramid(3));
console.log(numberPyramid(1));`,
    explanation: L(
      'The outer loop counts the rows and the inner loop counts the cells of the current row, which is exactly r cells. The counter next lives outside both loops, so it keeps counting from where it stopped and the numbering flows continuously from one row to the next. Joining the cells and then the rows builds the final string without extra spaces.',
      'Внешний цикл считает строки, а вложенный — ячейки текущей строки, которых ровно r. Счётчик next объявлен перед обоими циклами, поэтому нумерация продолжается с места, где остановилась, и непрерывно переходит из строки в строку. Соединение ячеек, а затем строк, формирует итоговую строку без лишних пробелов.'
    ),
  },
];
