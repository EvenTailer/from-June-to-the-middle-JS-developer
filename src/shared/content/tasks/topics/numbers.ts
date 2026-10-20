import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const numbersTasks: PracticeTask[] = [
  {
    id: 'topic-numbers-1',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'basic',
    title: L('Clamp a value to a range', 'Ограничить значение диапазоном'),
    brief: L(
      'Write a function clamp(value, min, max) that keeps the value inside the range [min, max]: a value below min becomes min and a value above max becomes max. If min is greater than max, the two bounds are swapped first. Example: clamp(5, 0, 10) returns 5, clamp(-3, 0, 10) returns 0, clamp(42, 0, 10) returns 10, clamp(5, 10, 0) returns 5.',
      'Напишите функцию clamp(value, min, max), которая удерживает значение в диапазоне [min, max]: значение меньше min становится min, а значение больше max становится max. Если min больше max, границы сначала меняются местами. Пример: clamp(5, 0, 10) возвращает 5, clamp(-3, 0, 10) возвращает 0, clamp(42, 0, 10) возвращает 10, clamp(5, 10, 0) возвращает 5.'
    ),
    hint: L(
      'Find the smaller and the bigger of the two bounds, then push the value up to the low bound and down to the high bound.',
      'Найдите меньшую и большую из двух границ, затем поднимите значение к нижней границе и опустите к верхней.'
    ),
    solution: `function clamp(value, min, max) {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
}

console.log(clamp(5, 0, 10)); // 5
console.log(clamp(-3, 0, 10)); // 0
console.log(clamp(42, 0, 10)); // 10
console.log(clamp(5, 10, 0)); // 5`,
    explanation: L(
      'The bounds are normalized first, so the function works even when they come in the wrong order. Math.max pushes a too small value up to the low bound, and Math.min pushes a too large value down to the high bound. A value already inside the range passes through both calls unchanged.',
      'Сначала границы приводятся к правильному порядку, поэтому функция работает даже если они переданы наоборот. Math.max поднимает слишком маленькое значение к нижней границе, а Math.min опускает слишком большое к верхней. Значение внутри диапазона проходит через обе операции без изменений.'
    ),
  },
  {
    id: 'topic-numbers-2',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'basic',
    title: L('Round money without float noise', 'Округлить деньги без артефактов float'),
    brief: L(
      'Write a function roundMoney(amount) that rounds a positive amount to two decimal places and returns a number, without the floating point noise that plain arithmetic produces. Halves round up, so 2.5 stays 2.5 and 2.675 becomes 2.68. Example: roundMoney(0.1 + 0.2) returns 0.3, roundMoney(19.999) returns 20, roundMoney(1.005) returns 1.01, roundMoney(2.5) returns 2.5.',
      'Напишите функцию roundMoney(amount), которая округляет положительную сумму до двух знаков после запятой и возвращает число — без плавающих артефактов, которые даёт обычная арифметика. Половинки округляются вверх, поэтому 2.5 остаётся 2.5, а 2.675 становится 2.68. Пример: roundMoney(0.1 + 0.2) возвращает 0.3, roundMoney(19.999) возвращает 20, roundMoney(1.005) возвращает 1.01, roundMoney(2.5) возвращает 2.5.'
    ),
    hint: L(
      'Multiply by 100, round, then divide by 100. Add Number.EPSILON to the scaled value so that a number stored slightly below its decimal value still rounds up.',
      'Умножьте на 100, округлите, затем разделите на 100. Прибавьте Number.EPSILON к масштабированному значению, чтобы число, хранящееся чуть ниже своей десятичной записи, всё равно округлялось вверх.'
    ),
    solution: `function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

console.log(roundMoney(0.1 + 0.2)); // 0.3
console.log(roundMoney(19.999)); // 20
console.log(roundMoney(1.005)); // 1.01
console.log(roundMoney(2.5)); // 2.5`,
    explanation: L(
      'Binary floating point cannot store 0.1 exactly, so 0.1 + 0.2 really is 0.30000000000000004. Scaling by 100 turns the rounding into an integer operation, and Number.EPSILON nudges the value that sits a hair below its decimal value (1.005 is stored as 1.00499999999999989) so that Math.round sees 100.50000000000001 and rounds it up to 101. Dividing by 100 gives back 1.01 without any trailing noise.',
      'Двоичная плавающая точка не может хранить 0.1 точно, поэтому 0.1 + 0.2 на самом деле 0.30000000000000004. Умножение на 100 превращает округление в целочисленную операцию, а Number.EPSILON сдвигает значение, лежащее чуть ниже своей десятичной записи (1.005 хранится как 1.00499999999999989), и Math.round видит 100.50000000000001 и округляет вверх до 101. Деление на 100 возвращает 1.01 без лишнего шума.'
    ),
  },
  {
    id: 'topic-numbers-3',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'basic',
    title: L('Random integer in a range', 'Случайное целое в диапазоне'),
    brief: L(
      'Write a function randomInt(min, max) that returns a random integer between min and max, both ends included. Fractional bounds are rounded inwards (the lower bound up, the upper bound down) and if min is greater than max the bounds are swapped. Example: randomInt(1, 6) returns a number from 1 to 6, randomInt(5, 5) always returns 5, randomInt(3.2, 6.8) returns an integer from 4 to 6.',
      'Напишите функцию randomInt(min, max), которая возвращает случайное целое число от min до max, включая обе границы. Дробные границы округляются внутрь (нижняя вверх, верхняя вниз), а если min больше max, границы меняются местами. Пример: randomInt(1, 6) возвращает число от 1 до 6, randomInt(5, 5) всегда возвращает 5, randomInt(3.2, 6.8) возвращает целое от 4 до 6.'
    ),
    hint: L(
      'Math.random() gives a number from 0 (included) to 1 (excluded). Multiply it by the number of possible values, round it down and add the lower bound.',
      'Math.random() даёт число от 0 (включительно) до 1 (не включительно). Умножьте его на количество возможных значений, округлите вниз и прибавьте нижнюю границу.'
    ),
    solution: `function randomInt(min, max) {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  if (high < low) return low;
  return low + Math.floor(Math.random() * (high - low + 1));
}

console.log(randomInt(1, 6)); // a number from 1 to 6
console.log(randomInt(5, 5)); // 5
console.log(randomInt(3.2, 6.8)); // 4, 5 or 6`,
    explanation: L(
      'Math.random() never reaches 1, so multiplying it by the size of the range gives a number from 0 up to (but not including) the count of possible values. Math.floor turns that into an index, and adding the lower bound shifts it into the requested range. The + 1 is what makes the upper bound reachable, so both ends of the range can come out.',
      'Math.random() никогда не достигает 1, поэтому умножение на размер диапазона даёт число от 0 до количества возможных значений, но без верхней границы. Math.floor превращает его в индекс, а прибавление нижней границы сдвигает в нужный диапазон. Именно + 1 делает верхнюю границу достижимой, так что выпадать могут оба конца.'
    ),
  },
  {
    id: 'topic-numbers-4',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'intermediate',
    title: L('Percent and percent change', 'Процент и изменение в процентах'),
    brief: L(
      'Write two functions. percent(part, whole) returns how many percent part is of whole, rounded to two decimals, and returns 0 when whole is 0. percentChange(from, to) returns the relative change in percent, also rounded to two decimals: a positive number means growth, a negative number means a drop, and it returns 0 when from is 0. Example: percent(25, 200) returns 12.5, percent(1, 3) returns 33.33, percent(0, 10) returns 0, percentChange(100, 150) returns 50, percentChange(150, 100) returns -33.33.',
      'Напишите две функции. percent(part, whole) возвращает, сколько процентов составляет part от whole, с округлением до двух знаков, и возвращает 0, когда whole равен 0. percentChange(from, to) возвращает относительное изменение в процентах, тоже с округлением до двух знаков: положительное число означает рост, отрицательное — падение, а при from, равном 0, функция возвращает 0. Пример: percent(25, 200) возвращает 12.5, percent(1, 3) возвращает 33.33, percent(0, 10) возвращает 0, percentChange(100, 150) возвращает 50, percentChange(150, 100) возвращает -33.33.'
    ),
    hint: L(
      'Multiply the ratio by 10000 instead of 100, round, and divide by 100: that keeps two decimal places in the result.',
      'Умножайте отношение на 10000, а не на 100, округляйте и делите на 100: так в результате сохраняются два знака после запятой.'
    ),
    solution: `function percent(part, whole) {
  if (whole === 0) return 0;
  return Math.round((part / whole) * 10000) / 100;
}

function percentChange(from, to) {
  if (from === 0) return 0;
  return Math.round(((to - from) / from) * 10000) / 100;
}

console.log(percent(25, 200)); // 12.5
console.log(percent(1, 3)); // 33.33
console.log(percent(0, 10)); // 0
console.log(percentChange(100, 150)); // 50
console.log(percentChange(150, 100)); // -33.33`,
    explanation: L(
      'The ratio is multiplied by 10000 instead of 100 so that the two decimal places survive the rounding, and the final division by 100 brings the scale back. The guards protect the division by zero, because a percentage of nothing has no meaning. In percentChange the sign comes from the subtraction, so a drop is negative without any extra code.',
      'Отношение умножается на 10000, а не на 100, чтобы два знака после запятой пережили округление, а финальное деление на 100 возвращает нужный масштаб. Проверки защищают деление на ноль, потому что процент от нуля не имеет смысла. В percentChange знак берётся из вычитания, поэтому падение получается отрицательным без дополнительного кода.'
    ),
  },
  {
    id: 'topic-numbers-5',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'intermediate',
    title: L('Greatest common divisor', 'Наибольший общий делитель'),
    brief: L(
      'Write a function gcd(a, b) that returns the greatest common divisor of two integers. The result is never negative, fractional arguments are truncated and gcd(0, n) equals n. Example: gcd(48, 18) returns 6, gcd(7, 13) returns 1, gcd(0, 5) returns 5, gcd(-12, 8) returns 4.',
      'Напишите функцию gcd(a, b), которая возвращает наибольший общий делитель двух целых чисел. Результат не бывает отрицательным, дробные аргументы отбрасываются, а gcd(0, n) равно n. Пример: gcd(48, 18) возвращает 6, gcd(7, 13) возвращает 1, gcd(0, 5) возвращает 5, gcd(-12, 8) возвращает 4.'
    ),
    hint: L(
      'Use the Euclidean algorithm: replace the pair (a, b) with (b, a % b) until b becomes zero. The remaining a is the answer.',
      'Используйте алгоритм Евклида: заменяйте пару (a, b) на (b, a % b), пока b не станет нулём. Оставшееся a и есть ответ.'
    ),
    solution: `function gcd(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));

  while (y !== 0) {
    const next = y;
    y = x % y;
    x = next;
  }

  return x;
}

console.log(gcd(48, 18)); // 6
console.log(gcd(7, 13)); // 1
console.log(gcd(0, 5)); // 5
console.log(gcd(-12, 8)); // 4`,
    explanation: L(
      'The Euclidean algorithm replaces the pair with the pair of the second number and the remainder of the division, and each round makes the numbers smaller, so the loop always ends. When the second number becomes zero the first one is the greatest common divisor. The loop is written with a temporary variable because % must see the old values, and Math.abs plus Math.trunc make the result positive and integral.',
      'Алгоритм Евклида заменяет пару на пару из второго числа и остатка от деления, и с каждым шагом числа уменьшаются, поэтому цикл всегда заканчивается. Когда второе число становится нулём, первое и есть наибольший общий делитель. Цикл написан с временной переменной, потому что % должен увидеть старые значения, а Math.abs и Math.trunc делают результат положительным и целым.'
    ),
  },
  {
    id: 'topic-numbers-6',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'advanced',
    title: L('Least common multiple', 'Наименьшее общее кратное'),
    brief: L(
      'Write a function lcm(a, b) that returns the least common multiple of two non-negative integers. When one of the numbers is 0 the result is 0, and the arguments are truncated to integers first. Example: lcm(4, 6) returns 12, lcm(3, 5) returns 15, lcm(21, 6) returns 42, lcm(0, 5) returns 0.',
      'Напишите функцию lcm(a, b), которая возвращает наименьшее общее кратное двух неотрицательных целых чисел. Если одно из чисел равно 0, результат равен 0, а аргументы сначала округляются до целых. Пример: lcm(4, 6) возвращает 12, lcm(3, 5) возвращает 15, lcm(21, 6) возвращает 42, lcm(0, 5) возвращает 0.'
    ),
    hint: L(
      'The least common multiple is the product of the numbers divided by their greatest common divisor. Divide before multiplying to keep the result exact.',
      'Наименьшее общее кратное — это произведение чисел, делённое на их наибольший общий делитель. Делите до умножения, чтобы результат остался точным.'
    ),
    solution: `function gcd(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));

  while (y !== 0) {
    const next = y;
    y = x % y;
    x = next;
  }

  return x;
}

function lcm(a, b) {
  const x = Math.abs(Math.trunc(a));
  const y = Math.abs(Math.trunc(b));
  if (x === 0 || y === 0) return 0;
  return (x / gcd(x, y)) * y;
}

console.log(lcm(4, 6)); // 12
console.log(lcm(3, 5)); // 15
console.log(lcm(21, 6)); // 42
console.log(lcm(0, 5)); // 0`,
    explanation: L(
      'The formula lcm(a, b) = a * b / gcd(a, b) works because the common divisors are already counted twice in the product, and dividing by the greatest one removes the extra copy. Dividing before multiplying keeps the intermediate value small and the result exact. The zero check is a separate case, since every number is a multiple of zero but the common multiple of zero and something else is defined as zero here.',
      'Формула lcm(a, b) = a * b / gcd(a, b) работает, потому что общие делители в произведении посчитаны дважды, и деление на наибольший из них убирает лишнюю копию. Деление до умножения оставляет промежуточное значение небольшим, а результат точным. Ноль проверяется отдельно: любое число кратно нулю, но общее кратное нуля и другого числа здесь определено как ноль.'
    ),
  },
  {
    id: 'topic-numbers-7',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'advanced',
    title: L('Precise rounding and exact money sum', 'Точное округление и точная сумма денег'),
    brief: L(
      'Write two functions. roundTo(value, digits) rounds a number to the given number of decimal places, using the decimal value of the number instead of its binary approximation. sumMoney(values) adds a list of amounts by converting every amount to whole cents first, so the result never contains floating point noise, and it returns 0 for an empty list. Example: roundTo(1.005, 2) returns 1.01, roundTo(2.675, 2) returns 2.68, roundTo(1.23456, 3) returns 1.235, sumMoney([0.1, 0.2]) returns 0.3, sumMoney([19.99, 0.01]) returns 20, sumMoney([]) returns 0.',
      'Напишите две функции. roundTo(value, digits) округляет число до заданного количества знаков после запятой, используя десятичное значение числа, а не его двоичное приближение. sumMoney(values) складывает список сумм, сначала переводя каждую сумму в целые центы, поэтому в результате никогда не бывает плавающего шума, а для пустого списка функция возвращает 0. Пример: roundTo(1.005, 2) возвращает 1.01, roundTo(2.675, 2) возвращает 2.68, roundTo(1.23456, 3) возвращает 1.235, sumMoney([0.1, 0.2]) возвращает 0.3, sumMoney([19.99, 0.01]) возвращает 20, sumMoney([]) возвращает 0.'
    ),
    hint: L(
      'For roundTo scale the value by a power of ten, add a tiny correction in the direction of the sign, round and scale back. For sumMoney work in integer cents and divide by 100 at the very end.',
      'Для roundTo умножьте значение на степень десяти, прибавьте крошечную поправку в сторону знака, округлите и верните масштаб. Для sumMoney считайте в целых центах и разделите на 100 только в самом конце.'
    ),
    solution: `function roundTo(value, digits) {
  const factor = 10 ** digits;
  const scaled = value * factor;
  const direction = scaled >= 0 ? 1 : -1;
  const corrected = scaled + direction * Number.EPSILON * Math.abs(scaled);
  return Math.round(corrected) / factor;
}

function sumMoney(values) {
  const cents = values.reduce((total, value) => total + Math.round(value * 100), 0);
  return cents === 0 ? 0 : cents / 100;
}

console.log(roundTo(1.005, 2)); // 1.01
console.log(roundTo(2.675, 2)); // 2.68
console.log(roundTo(1.23456, 3)); // 1.235
console.log(sumMoney([0.1, 0.2])); // 0.3
console.log(sumMoney([19.99, 0.01])); // 20
console.log(sumMoney([])); // 0`,
    explanation: L(
      'The classic problem is that 1.005 is stored as 1.00499999999999989, so scaling it gives 100.49999999999999 and Math.round would send it down to 100. The correction term adds the smallest representable step in the direction of the sign, which lifts the value just over the half point, and the rounding then behaves the way the decimal notation suggests. In sumMoney every amount becomes whole cents before anything is added, so the additions are exact integer additions and the noise never appears.',
      'Классическая проблема в том, что 1.005 хранится как 1.00499999999999989, поэтому после масштабирования получается 100.49999999999999, и Math.round отправил бы его вниз, к 100. Поправка прибавляет наименьший представимый шаг в сторону знака, чуть поднимая значение над серединой, и округление начинает вести себя так, как подсказывает десятичная запись. В sumMoney каждая сумма становится целыми центами до сложения, поэтому сложения целочисленные и шум не появляется.'
    ),
  },
  {
    id: 'topic-numbers-8',
    moduleId: 'js-core',
    topic: 'numbers',
    level: 'advanced',
    title: L('Format bytes and durations', 'Форматировать байты и длительность'),
    brief: L(
      'Write two functions. formatBytes(bytes) turns a byte count into a readable string with the units B, KB, MB, GB (base 1024): plain bytes are printed without decimals, larger units with one decimal, and zero or a negative value gives "0 B". formatDuration(ms) turns a millisecond count into a string: below one second it prints "500ms", below one minute "2s", below one hour "1m 5s", and from one hour up "1h 1m 1s" where the minutes and the seconds are always shown. Example: formatBytes(0) returns "0 B", formatBytes(1536) returns "1.5 KB", formatBytes(1048576) returns "1.0 MB", formatDuration(500) returns "500ms", formatDuration(65000) returns "1m 5s", formatDuration(3661000) returns "1h 1m 1s".',
      'Напишите две функции. formatBytes(bytes) превращает количество байтов в читаемую строку с единицами B, KB, MB, GB (основание 1024): обычные байты печатаются без дробной части, большие единицы — с одним знаком после запятой, а ноль или отрицательное значение даёт "0 B". formatDuration(ms) превращает количество миллисекунд в строку: меньше секунды — "500ms", меньше минуты — "2s", меньше часа — "1m 5s", а от часа и дальше — "1h 1m 1s", где минуты и секунды показываются всегда. Пример: formatBytes(0) возвращает "0 B", formatBytes(1536) возвращает "1.5 KB", formatBytes(1048576) возвращает "1.0 MB", formatDuration(500) возвращает "500ms", formatDuration(65000) возвращает "1m 5s", formatDuration(3661000) возвращает "1h 1m 1s".'
    ),
    hint: L(
      'For the bytes divide by 1024 until the value drops below 1024 and count how many times you divided. For the duration split the total seconds into hours, minutes and seconds.',
      'Для байтов делите на 1024, пока значение не станет меньше 1024, и считайте, сколько раз поделили. Для длительности разделите общее число секунд на часы, минуты и секунды.'
    ),
    solution: `const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

function formatBytes(bytes) {
  if (bytes <= 0) return '0 B';

  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < BYTE_UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }

  if (unit === 0) return \`\${Math.round(value)} B\`;
  return \`\${value.toFixed(1)} \${BYTE_UNITS[unit]}\`;
}

function formatDuration(ms) {
  if (ms < 1000) return \`\${ms}ms\`;

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return \`\${hours}h \${minutes}m \${seconds}s\`;
  if (minutes > 0) return \`\${minutes}m \${seconds}s\`;
  return \`\${seconds}s\`;
}

console.log(formatBytes(0)); // 0 B
console.log(formatBytes(1536)); // 1.5 KB
console.log(formatBytes(1048576)); // 1.0 MB
console.log(formatDuration(500)); // 500ms
console.log(formatDuration(65000)); // 1m 5s
console.log(formatDuration(3661000)); // 1h 1m 1s`,
    explanation: L(
      'Each division by 1024 moves the value one unit up the scale, and the loop counter is the index in the unit table, so the number and the unit always stay in sync. Plain bytes are rounded to an integer because nobody needs "512.0 B", while the larger units keep one decimal with toFixed. The duration is split from the total number of seconds, and the branches guarantee that the seconds are printed even when the hours are present.',
      'Каждое деление на 1024 поднимает значение на одну единицу по шкале, а счётчик цикла — это индекс в таблице единиц, поэтому число и единица всегда согласованы. Обычные байты округляются до целого, потому что "512.0 B" никому не нужно, а большие единицы оставляют один знак после запятой через toFixed. Длительность разбирается из общего числа секунд, а ветки гарантируют, что секунды печатаются всегда, даже когда есть часы.'
    ),
  },
];
