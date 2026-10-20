import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh10: Chapter = {
  id: 'js-core-ch10',
  title: L('Numbers, math, dates and Intl', 'Числа, математика, даты и Intl'),
  summary: L(
    'How to turn text into numbers without losing the edge cases, how rounding and fixed precision actually work, what Math can and cannot do, why Date is harder than it looks, and how Intl formats numbers and dates for real users.',
    'Как превращать текст в числа, не теряя крайние случаи, как на самом деле работают округление и фиксированная точность, что умеет и чего не умеет Math, почему Date сложнее, чем кажется, и как Intl форматирует числа и даты для настоящих пользователей.'
  ),
  sections: [
    {
      id: 'js-core-ch10-s1',
      title: L('Number parsing and conversion', 'Разбор и преобразование чисел'),
      body: L(
        'Number(), parseInt() and parseFloat() all convert, but they convert in different ways. Number() applies the full string-to-number conversion and requires the whole string to be a valid numeric literal, so Number("42") is 42 while Number("42px") is NaN. parseInt() reads only the leading run of digits and stops at the first character it cannot use, which is why parseInt("42px") is 42. parseFloat() does the same but accepts a decimal part, so parseFloat("3.14abc") is 3.14.\n\nThe edge cases of Number() are where the surprises live. Number("") is 0 because an empty string converts to zero, Number(null) is 0, Number(undefined) is NaN, Number([]) is 0 because the empty array stringifies to "", and Number([1]) is 1 because [1] stringifies to "1". Anything else non-numeric, such as Number([1, 2]), gives NaN. A guard written as if (Number(value)) therefore treats an empty field and a null field as zero rather than as missing input.\n\nThe other family of converters coerces first. The global isFinite("42") is true because it converts its argument, while Number.isFinite("42") is false because it does not; the same split applies to isInteger and isNaN. Number.isSafeInteger additionally rejects everything beyond 2^53 - 1, where consecutive integers stop being distinguishable. For the reverse direction String(42) gives "42" and (255).toString(16) gives "ff", so a number can be written in any base from 2 to 36.',
        'Number(), parseInt() и parseFloat() преобразуют, но по-разному. Number() выполняет полное строковое преобразование в число и требует, чтобы вся строка была корректным числовым литералом, поэтому Number("42") равно 42, а Number("42px") — NaN. parseInt() читает только начальную последовательность цифр и останавливается на первом непригодном символе, поэтому parseInt("42px") равно 42. parseFloat() делает то же, но принимает дробную часть, поэтому parseFloat("3.14abc") равно 3.14.\n\nКрайние случаи Number() и есть место, где живут сюрпризы. Number("") равно 0, потому что пустая строка преобразуется в ноль, Number(null) равно 0, Number(undefined) — NaN, Number([]) равно 0, потому что пустой массив превращается в "", а Number([1]) равно 1, потому что [1] превращается в "1". Всё остальное нечисловое, например Number([1, 2]), даёт NaN. Поэтому проверка вида if (Number(value)) считает пустое поле и null нулём, а не отсутствующим вводом.\n\nДругое семейство преобразователей сначала приводит аргумент. Глобальный isFinite("42") истинно, потому что он приводит аргумент, а Number.isFinite("42") ложно, потому что не приводит; то же разделение касается isInteger и isNaN. Number.isSafeInteger дополнительно отбрасывает всё за пределами 2^53 − 1, где соседние целые перестают быть различимыми. В обратную сторону String(42) даёт "42", а (255).toString(16) даёт "ff", то есть число можно записать в любой системе счисления от 2 до 36.'
      ),
      bullets: [
        L('Number() requires the whole string to be numeric, parseInt() accepts a numeric prefix.', 'Number() требует, чтобы вся строка была числовой, parseInt() принимает числовой префикс.'),
        L('Number(""), Number(null) and Number([]) are all 0.', 'Number(""), Number(null) и Number([]) — все равны 0.'),
        L('Number(undefined) is NaN, and so is Number([1, 2]).', 'Number(undefined) — NaN, и Number([1, 2]) тоже NaN.'),
        L('Number.isFinite does not coerce, the global isFinite does.', 'Number.isFinite не приводит аргумент, глобальный isFinite приводит.'),
        L('parseInt("0x1F") is 31 without a radix and 0 with radix 10.', 'parseInt("0x1F") равно 31 без основания и 0 с основанием 10.'),
        L('(255).toString(16) writes the number in base 16.', '(255).toString(16) записывает число в системе счисления 16.'),
      ],
      code: `Number('42');        // 42
Number('42px');      // NaN - the whole string must be numeric
parseInt('42px');    // 42 - reads the leading digits
parseFloat('3.14abc'); // 3.14
Number('');          // 0
Number(null);        // 0
Number(undefined);   // NaN
Number([]);          // 0
Number([1]);         // 1
Number([1, 2]);      // NaN
parseInt('08');      // 8 today, 0 (octal) in engines before ES5
parseInt('0x1F');    // 31
parseInt('0x1F', 10);// 0 - the radix decides
parseInt('3.7');     // 3 - integers only
parseFloat('0x1F');  // 0 - always decimal

Number.isInteger(4.0);    // true
Number.isSafeInteger(2 ** 53); // false
Number.isFinite('42');    // false, no coercion
isFinite('42');           // true, the global coerces first
(255).toString(16);  // 'ff'
(255).toString(2);   // '11111111'`,
      table: {
        caption: L('Turning text into a number', 'Превращение текста в число'),
        headers: [L('Call', 'Вызов'), L('Result', 'Результат'), L('Behaviour', 'Поведение')],
        rows: [
          [L('Number("42")', 'Number("42")'), L('42', '42'), L('the whole string must be numeric', 'вся строка должна быть числовой')],
          [L('Number("42px")', 'Number("42px")'), L('NaN', 'NaN'), L('no prefix parsing', 'префикс не разбирается')],
          [L('parseInt("42px")', 'parseInt("42px")'), L('42', '42'), L('leading integer prefix', 'начальный целый префикс')],
          [L('parseFloat("3.14abc")', 'parseFloat("3.14abc")'), L('3.14', '3.14'), L('leading decimal prefix, always base 10', 'начальный десятичный префикс, всегда система 10')],
          [L('Number("")', 'Number("")'), L('0', '0'), L('an empty string converts to zero', 'пустая строка преобразуется в ноль')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The || fallback destroys zero', 'Оператор || убивает ноль'),
          text: L(
            'A very common line is const n = Number(input) || defaultValue. It silently replaces a legitimate 0 with the fallback, because 0 is falsy. Convert first and test explicitly: const n = Number(input); if (Number.isNaN(n)) use defaultValue.',
            'Очень частая строка const n = Number(input) || defaultValue молча заменяет законный ноль на значение по умолчанию, потому что 0 ложно. Преобразуйте сначала и проверяйте явно: const n = Number(input); if (Number.isNaN(n)) use defaultValue.'
          ),
        },
        {
          tone: 'tip',
          title: L('Always pass a radix', 'Всегда передавайте основание'),
          text: L(
            'parseInt(value, 10) states the intent and removes the old octal trap: before ES5 a leading zero meant base 8, so parseInt("08") evaluated to 0 in old browsers. A leading "0x" is still treated as hexadecimal when no radix is given.',
            'parseInt(value, 10) явно выражает намерение и снимает старую ловушку с восьмеричной системой: до ES5 ведущий ноль означал основание 8, поэтому parseInt("08") в старых браузерах давал 0. При отсутствии основания ведущий "0x" по-прежнему трактуется как шестнадцатеричная запись.'
          ),
        },
      ],
      takeaway: L(
        'Use Number() when the whole string must be numeric, check the result with Number.isNaN, and never let a fallback swallow a real zero.',
        'Используйте Number(), когда вся строка должна быть числовой, проверяйте результат через Number.isNaN и никогда не отдавайте значение по умолчанию вместо настоящего нуля.'
      ),
      seeAlso: [
        L('Section 1-2: strict versus loose equality', 'Секция 1-2: строгое против нестрогого равенства'),
        L('Section 1-5: precision, safe integers and money', 'Секция 1-5: точность, безопасные целые и деньги'),
        L('Chapter 9: strings, regex and parsing', 'Глава 9: строки, регулярные выражения и разбор'),
      ],
    },
    {
      id: 'js-core-ch10-s2',
      title: L('Rounding and fixed precision', 'Округление и фиксированная точность'),
      body: L(
        'The four rounding primitives differ only in the direction they pick. Math.round(x) returns the nearest integer and sends an exact half upward, so Math.round(2.5) is 3 while Math.round(-2.5) is -2. Math.round(-0.5) is a special case: the result is negative zero, which is not the same value as 0 under Object.is and will print as "-0". Math.floor(x) moves toward negative infinity, Math.ceil(x) toward positive infinity, and Math.trunc(x) toward zero, so for -1.9 the three give -2, -1 and -1 respectively.\n\ntoFixed(digits) is a different kind of function. It returns a string, not a number, and it rounds the exact binary value of the double, not the decimal number the author had in mind. That is why (1.005).toFixed(2) is "1.00": the stored double is really 1.00499999999999989. toPrecision() keeps a fixed number of significant digits and toExponential() switches to scientific notation, both also returning strings.\n\nRounding twice is a common source of wrong totals: a value already rounded to two digits and then formatted again can land on the wrong side of the boundary. The same applies to arithmetic such as 19.99 * 3, which is 59.97000000000001 in binary. toFixed hides that particular noise, but it does not repair the underlying value, so money belongs in integer minor units and floats should be compared with a tolerance rather than with ===.',
        'Четыре примитива округления отличаются только тем, в какую сторону они выбирают. Math.round(x) возвращает ближайшее целое и отправляет ровную половину вверх, поэтому Math.round(2.5) равно 3, а Math.round(-2.5) равно -2. Случай Math.round(-0.5) особый: результат — отрицательный ноль, который при Object.is не равен нулю и печатается как "-0". Math.floor(x) идёт к минус бесконечности, Math.ceil(x) — к плюс бесконечности, а Math.trunc(x) — к нулю, поэтому для -1.9 они дают -2, -1 и -1 соответственно.\n\ntoFixed(digits) — функция другого рода. Она возвращает строку, а не число, и округляет точное двоичное значение double, а не десятичное число, которое имел в виду автор. Результат округляется по правилам ближайшего числа, а не по правилам той десятичной записи, которую видел автор. Поэтому (1.005).toFixed(2) равно "1.00": сохранённый double на самом деле 1.00499999999999989. toPrecision() сохраняет заданное число значащих цифр, а toExponential() переключает на экспоненциальную запись; обе тоже возвращают строки.\n\nДвойное округление — частый источник неверных итогов: значение, уже округлённое до двух знаков и отформатированное ещё раз, может оказаться по другую сторону границы. То же касается арифметики вроде 19.99 * 3, которая в двоичном виде равна 59.97000000000001. toFixed скрывает именно этот шум, но не чинит само значение, поэтому деньги хранят в целых минорных единицах, а вещественные числа сравнивают с допуском, а не через ===.'
      ),
      bullets: [
        L('Math.round sends an exact half toward positive infinity, so Math.round(-0.5) is -0.', 'Math.round отправляет ровную половину к плюс бесконечности, поэтому Math.round(-0.5) — это -0.'),
        L('Math.floor moves toward -Infinity, Math.ceil toward +Infinity, Math.trunc toward zero.', 'Math.floor идёт к минус бесконечности, Math.ceil — к плюс бесконечности, Math.trunc — к нулю.'),
        L('toFixed returns a string and rounds the exact binary value of the double.', 'toFixed возвращает строку и округляет точное двоичное значение double.'),
        L('(1.005).toFixed(2) is "1.00" because the double is really 1.00499999999999989.', '(1.005).toFixed(2) равно "1.00", потому что double на самом деле 1.00499999999999989.'),
        L('toPrecision and toExponential also return strings.', 'toPrecision и toExponential тоже возвращают строки.'),
        L('Compare floats with a tolerance of about 1e-9 instead of with ===.', 'Сравнивайте вещественные числа с допуском порядка 1e-9, а не через ===.'),
      ],
      code: `Math.round(2.5);      // 3 - an exact half rounds up
Math.round(-2.5);     // -2
Math.round(-0.5);     // -0  <- negative zero
Math.floor(-1.9);     // -2 - toward -Infinity
Math.ceil(-1.9);      // -1 - toward +Infinity
Math.trunc(-1.9);     // -1 - toward zero

(1234.5678).toFixed(2);  // '1234.57' - a string, not a number
(1.005).toFixed(2);      // '1.00' - the double is 1.00499999999999989
(0.1 + 0.2).toFixed(2); // '0.30' - toFixed hides the binary noise
(123.456).toPrecision(4);   // '123.5'
(0.00042).toExponential(2); // '4.20e-4'
parseFloat('12.5%');        // 12.5 - the percent sign is dropped

const tax = 19.99 * 3;   // 59.97000000000001
tax.toFixed(2);           // '59.97'
const a = 0.1 + 0.2, b = 0.3;
Math.abs(a - b) < 1e-9;   // true - compare with a tolerance`,
      table: {
        caption: L('Choosing a rounding operation', 'Выбор операции округления'),
        headers: [L('Call', 'Вызов'), L('Direction', 'Направление'), L('Returns', 'Возвращает'), L('Example', 'Пример')],
        rows: [
          [L('Math.round(x)', 'Math.round(x)'), L('nearest, a half toward +Infinity', 'ближайшее, половина к +∞'), L('number', 'number'), L('Math.round(-0.5) is -0', 'Math.round(-0.5) — это -0')],
          [L('Math.floor(x)', 'Math.floor(x)'), L('toward -Infinity', 'к -∞'), L('number', 'number'), L('Math.floor(-1.9) is -2', 'Math.floor(-1.9) — это -2')],
          [L('Math.ceil(x)', 'Math.ceil(x)'), L('toward +Infinity', 'к +∞'), L('number', 'number'), L('Math.ceil(-1.9) is -1', 'Math.ceil(-1.9) — это -1')],
          [L('Math.trunc(x)', 'Math.trunc(x)'), L('toward zero', 'к нулю'), L('number', 'number'), L('Math.trunc(-1.9) is -1', 'Math.trunc(-1.9) — это -1')],
          [L('x.toFixed(n)', 'x.toFixed(n)'), L('nearest, n decimals', 'ближайшее, n знаков'), L('string', 'string'), L('(1.005).toFixed(2) is "1.00"', '(1.005).toFixed(2) — это "1.00"')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('toFixed returns a string', 'toFixed возвращает строку'),
          text: L(
            'Because toFixed produces a string, (19.99 * 3).toFixed(2) + 1 concatenates instead of adding, and the value silently stops being a number. Convert back with Number() only when you need arithmetic again, and remember that the round trip goes through the decimal text, not through the exact double.',
            'Поскольку toFixed даёт строку, выражение (19.99 * 3).toFixed(2) + 1 склеивается вместо сложения, и значение незаметно перестаёт быть числом. Обратное преобразование через Number() нужно только там, где снова нужна арифметика, и помните, что такой круг проходит через десятичный текст, а не через точный double.'
          ),
        },
        {
          tone: 'warning',
          title: L('Money never lives in a float', 'Деньги никогда не живут в вещественном числе'),
          text: L(
            'toFixed is a display helper, not a rounding mode for accounting. Store money as integer minor units such as cents, round the integer yourself, and format it only at the presentation layer.',
            'toFixed — это помощник отображения, а не режим округления для бухгалтерии. Храните деньги в целых минорных единицах, например в центах, округляйте целое сами и форматируйте только на уровне представления.'
          ),
        },
      ],
      takeaway: L(
        'Pick the rounding direction on purpose with floor, ceil, trunc or round, and remember that toFixed builds a string from the exact binary value.',
        'Выбирайте направление округления осознанно: floor, ceil, trunc или round, и помните, что toFixed собирает строку из точного двоичного значения.'
      ),
      seeAlso: [
        L('Section 1-5: storing money in integer minor units', 'Секция 1-5: хранение денег в целых минорных единицах'),
        L('Section 10-3: the Math object and randomness', 'Секция 10-3: объект Math и случайность'),
        L('Chapter 13: algorithms and data structures', 'Глава 13: алгоритмы и структуры данных'),
      ],
    },
    {
      id: 'js-core-ch10-s3',
      title: L('The Math object and randomness', 'Объект Math и случайность'),
      body: L(
        'Math is a namespace object with static functions, not a class you instantiate. Math.abs gives the distance from zero, Math.min and Math.max pick the extremes, and Math.max() with no arguments is -Infinity while Math.min() is Infinity. NaN poisons both: Math.min(1, NaN) is NaN, because a comparison with NaN is always false. For a variable number of values, spread the array: Math.max(...scores).\n\nMath.pow(x, y) and x ** y produce the same number, but the operator cannot be detached from its operands and it follows different conversion rules for BigInt: 2n ** 3n is 8n while Math.pow(2n, 3n) throws a TypeError. Math.sqrt and Math.cbrt give the square and the cube root, and Math.sign returns -1, 0 or 1.\n\nMath.hypot(a, b) returns the length of a vector and is numerically stable: it avoids the intermediate overflow and underflow that Math.sqrt(a * a + b * b) suffers with extreme values. Math.clz32(x) counts the leading zeros of a 32 bit word, which is useful when you pack flags into an integer. Math.random() returns a double in the half-open range [0, 1) with about 52 bits of entropy.\n\nIt is not cryptographically secure, and an attacker can recover the internal state from a handful of outputs, so session tokens, password reset links and API keys must come from crypto.getRandomValues or crypto.randomUUID(). A uniform integer in a range is Math.floor(Math.random() * (max - min + 1)) + min, which is slightly biased unless the range divides the random space exactly, so a careful implementation rejects and retries the biased tail.',
        'Math — это объект-пространство имён со статическими функциями, а не класс, который нужно создавать. Math.abs даёт расстояние от нуля, Math.min и Math.max выбирают крайние значения, причём Math.max() без аргументов — это -Infinity, а Math.min() — Infinity. NaN отравляет оба: Math.min(1, NaN) равно NaN, потому что сравнение с NaN всегда ложно. Для произвольного числа значений разворачивайте массив: Math.max(...scores).\n\nMath.pow(x, y) и x ** y дают одно и то же число, но оператор нельзя оторвать от операндов, и для BigInt действуют другие правила преобразования: 2n ** 3n равно 8n, тогда как Math.pow(2n, 3n) бросает TypeError. Math.sqrt и Math.cbrt дают квадратный и кубический корень, а Math.sign возвращает -1, 0 или 1.\n\nMath.hypot(a, b) возвращает длину вектора и численно устойчив: он избавляет от промежуточного переполнения и потери точности, от которых страдает Math.sqrt(a * a + b * b) на экстремальных значениях. Math.clz32(x) считает ведущие нули в 32-битном слове, что удобно, когда флаги упакованы в целое число. Math.random() возвращает double в полуоткрытом диапазоне [0, 1) примерно с 52 битами энтропии.\n\nОн не является криптографически стойким: по нескольким значениям подряд противник способен восстановить внутреннее состояние, поэтому токены сессий, ссылки для сброса пароля и ключи API должны приходить из crypto.getRandomValues или crypto.randomUUID(). Равномерное целое в диапазоне получается как Math.floor(Math.random() * (max - min + 1)) + min, но оно немного смещено, если диапазон не делит пространство случайных чисел нацело, поэтому аккуратная реализация отбрасывает смещённый хвост и повторяет попытку.'
      ),
      bullets: [
        L('Math.max() is -Infinity and Math.min() is Infinity.', 'Math.max() — это -Infinity, а Math.min() — Infinity.'),
        L('NaN poisons min and max: Math.min(1, NaN) is NaN.', 'NaN отравляет min и max: Math.min(1, NaN) равно NaN.'),
        L('Math.hypot is numerically stable for long or extreme vectors.', 'Math.hypot численно устойчив для длинных и экстремальных векторов.'),
        L('Math.random() is not cryptographically secure.', 'Math.random() не является криптографически стойким.'),
        L('crypto.getRandomValues and crypto.randomUUID are the sources for tokens and ids.', 'crypto.getRandomValues и crypto.randomUUID — источники токенов и идентификаторов.'),
        L('Math.floor(Math.random() * n) is biased for a range that does not divide evenly.', 'Math.floor(Math.random() * n) смещён, если диапазон делится не нацело.'),
      ],
      code: `Math.max(1, 5, 3);          // 5
Math.max(...[4, 9, 2]);     // 9 - spread for a variable length list
Math.min(1, NaN);           // NaN - NaN poisons the comparison
Math.max();                 // -Infinity

Math.pow(2, 10);            // 1024
2 ** 10;                    // 1024 - the operator, not a function call
2n ** 3n;                   // 8n
Math.sqrt(16);              // 4
Math.cbrt(27);              // 3
Math.hypot(3, 4);           // 5 - stable for long vectors
Math.sign(-7);              // -1
Math.clz32(1);              // 31 - leading zeros in a 32 bit word

const min = 10, max = 20;
const die = () => min + Math.floor(Math.random() * (max - min + 1));

const bytes = new Uint32Array(4);
crypto.getRandomValues(bytes);   // cryptographically strong bytes
const id = crypto.randomUUID();  // a random id, not Math.random`,
      table: {
        caption: L('Picking a source of randomness', 'Выбор источника случайности'),
        headers: [L('Need', 'Задача'), L('API', 'API'), L('Guarantee', 'Гарантия')],
        rows: [
          [L('A random number in [0, 1)', 'Случайное число в [0, 1)'), L('Math.random()', 'Math.random()'), L('fast, not cryptographically secure', 'быстро, но не криптографически стойко')],
          [L('Shuffling and sampling', 'Перемешивание и выборка'), L('Math.random()', 'Math.random()'), L('good enough for games and UI', 'достаточно для игр и интерфейса')],
          [L('Random bytes', 'Случайные байты'), L('crypto.getRandomValues(array)', 'crypto.getRandomValues(array)'), L('cryptographically strong', 'криптографически стойко')],
          [L('A random identifier', 'Случайный идентификатор'), L('crypto.randomUUID()', 'crypto.randomUUID()'), L('strong, version 4', 'стойкий, версия 4')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Math.random is not for secrets', 'Math.random не для секретов'),
          text: L(
            'Session ids, password reset tokens, CSRF tokens and API keys must never come from Math.random. The generator is predictable: a handful of consecutive outputs is enough to recover the internal state and predict every later value. Use crypto.getRandomValues or crypto.randomUUID.',
            'Идентификаторы сессий, токены сброса пароля, CSRF-токены и ключи API никогда не должны приходить из Math.random. Генератор предсказуем: нескольких последовательных значений хватает, чтобы восстановить внутреннее состояние и предсказать все следующие. Используйте crypto.getRandomValues или crypto.randomUUID.'
          ),
        },
        {
          tone: 'tip',
          title: L('Rejection sampling for unbiased integers', 'Отбор отклонением для равномерных целых'),
          text: L(
            'When the range does not divide the random space exactly, some outcomes are more likely than others. Draw a candidate, and if it falls into the biased tail, draw again. The same trick is needed when you use crypto.getRandomValues with a modulo.',
            'Если диапазон не делит пространство случайных чисел нацело, одни исходы встречаются чаще других. Нужно взять кандидата и, если он попал в смещённый хвост, взять ещё раз. Тот же приём нужен, когда crypto.getRandomValues используют с остатком от деления.'
          ),
        },
      ],
      takeaway: L(
        'Use Math.random for sampling and shuffling, and crypto.getRandomValues for anything that must be unguessable.',
        'Используйте Math.random для выборки и перемешивания, а crypto.getRandomValues — для всего, что не должно быть угадано.'
      ),
      seeAlso: [
        L('Section 10-2: rounding and fixed precision', 'Секция 10-2: округление и фиксированная точность'),
        L('Chapter 13: algorithms and data structures', 'Глава 13: алгоритмы и структуры данных'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch10-s4',
      title: L('Dates, timezones and the Date pitfalls', 'Даты, часовые пояса и подводные камни Date'),
      body: L(
        'A Date is one number: milliseconds since the Unix epoch, 1970-01-01T00:00:00Z. Every calendar method is a projection of that number into some calendar, and every timezone question is really a question about the machine the code runs on, not about the data itself. The same instant therefore has as many calendar readings as there are timezones.\n\nThe constructors cover four different cases: new Date() is the current moment, new Date(timestamp) is a moment given in milliseconds, new Date("2024-01-01") parses an ISO string, and new Date(2024, 0, 15) builds a local date from year, zero-based month and day. The last one is the trap for beginners, because new Date(2024) means a timestamp of 2024 milliseconds, not the year 2024.\n\nThe accessors come in two families. getDate() returns the day of the month while getDay() returns the day of the week with Sunday as 0, and getMonth() is zero-based in every locale. The UTC variants, getUTCFullYear(), getUTCMonth(), getUTCDate() and getUTCDay(), read the same instant without applying the local offset. toISOString() always produces a UTC string ending in Z, while toString() produces a local, human-readable format that is not ISO and must never be parsed back.\n\nString parsing is the least portable part of the API. The specification only guarantees the ISO 8601 format, so "2024-01-01" is UTC midnight while "2024/01/01" is local midnight in V8 and "01-01-2024" means whatever the engine decides. Nothing else is portable across engines. There is no built-in date arithmetic either: adding 24 hours of milliseconds gives the same clock time but not always the same calendar day, because a daylight saving transition changes the length of a day. Libraries and the Temporal API solve that problem.',
        'Date — это одно число: миллисекунды с эпохи Unix, 1970-01-01T00:00:00Z. Каждый календарный метод — это проекция этого числа в некоторый календарь, а каждый вопрос про часовой пояс на самом деле вопрос про машину, на которой выполняется код, а не про сами данные. Поэтому один и тот же момент имеет столько календарных прочтений, сколько существует часовых поясов.\n\nКонструкторы покрывают четыре случая: new Date() — текущий момент, new Date(timestamp) — момент в миллисекундах, new Date("2024-01-01") — разбор ISO-строки, а new Date(2024, 0, 15) — локальная дата из года, месяца с нуля и дня. Последний вариант — ловушка для новичков, потому что new Date(2024) означает отметку времени 2024 миллисекунды, а не год 2024.\n\nМетоды доступа делятся на два семейства. getDate() возвращает день месяца, а getDay() — день недели, где воскресенье равно 0, и getMonth() нумеруется с нуля в любой локали. Варианты в UTC — getUTCFullYear(), getUTCMonth(), getUTCDate() и getUTCDay() — читают тот же момент без применения локального смещения. toISOString() всегда выдаёт строку в UTC с буквой Z на конце, а toString() — локальный, человекочитаемый формат, который не является ISO и который нельзя разбирать обратно.\n\nРазбор строк — наименее переносимая часть API. Спецификация гарантирует только формат ISO 8601, поэтому "2024-01-01" — это полночь по UTC, "2024/01/01" в V8 — полночь по локальному времени, а "01-01-2024" означает то, что решит движок. Больше ничего не переносится между движками. Встроенной арифметики дат тоже нет: добавление 24 часов в миллисекундах даёт то же время на часах, но не всегда ту же календарную дату, потому что переход на летнее время меняет длину суток. Эту задачу решают библиотеки и API Temporal.'
      ),
      bullets: [
        L('A Date stores milliseconds since 1970-01-01T00:00:00Z and nothing else.', 'Date хранит только миллисекунды с 1970-01-01T00:00:00Z.'),
        L('new Date(2024, 0, 15) is local time with a zero-based month.', 'new Date(2024, 0, 15) — локальное время, месяц нумеруется с нуля.'),
        L('new Date(2024) is a timestamp of 2024 milliseconds, not the year 2024.', 'new Date(2024) — это отметка времени 2024 миллисекунды, а не год 2024.'),
        L('getDate is the day of the month, getDay is the day of the week.', 'getDate — день месяца, getDay — день недели.'),
        L('toISOString always returns UTC with a Z suffix.', 'toISOString всегда возвращает UTC с суффиксом Z.'),
        L('Only ISO 8601 strings are guaranteed to parse identically in every engine.', 'Только строки ISO 8601 гарантированно разбираются одинаково во всех движках.'),
      ],
      code: `const now = new Date();
now.getTime();            // milliseconds since the epoch
new Date(1700000000000);  // from a timestamp
new Date('2024-01-01');   // parsed as UTC, per the ISO format
new Date(2024, 0, 15);   // local time, month 0 is January
new Date(2024);          // !! a timestamp of 2024 ms, not the year 2024

const d = new Date('2024-01-15T12:00:00Z');
d.getUTCDate();          // 15 - day of the month
d.getUTCDay();           // 1 - day of the week, Sunday is 0
d.getUTCMonth();         // 0 - months are zero based
d.getUTCFullYear();      // 2024
d.toISOString();         // '2024-01-15T12:00:00.000Z'

Date.now();              // wall clock, milliseconds
performance.now();       // monotonic, sub-millisecond precision

const tomorrow = new Date(d);
tomorrow.setDate(tomorrow.getDate() + 1); // manual arithmetic`,
      table: {
        caption: L('Reading the same instant two ways', 'Чтение одного момента двумя способами'),
        headers: [L('UTC method', 'Метод UTC'), L('Local method', 'Локальный метод'), L('Reads', 'Читает')],
        rows: [
          [L('getUTCFullYear()', 'getUTCFullYear()'), L('getFullYear()', 'getFullYear()'), L('the year in the host timezone', 'год в часовом поясе хоста')],
          [L('getUTCMonth()', 'getUTCMonth()'), L('getMonth()', 'getMonth()'), L('the month, zero based in both', 'месяц, в обоих с нуля')],
          [L('getUTCDate()', 'getUTCDate()'), L('getDate()', 'getDate()'), L('the day of the month', 'день месяца')],
          [L('getUTCDay()', 'getUTCDay()'), L('getDay()', 'getDay()'), L('the day of the week, Sunday is 0', 'день недели, воскресенье — 0')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Date parsing is implementation defined', 'Разбор дат зависит от реализации'),
          text: L(
            'Only the ISO 8601 format is guaranteed. "2024-01-01" is UTC midnight, "2024/01/01" is local midnight in V8, and "01-01-2024" is left to the engine. A form where the user picks a date and the value shifts by a few hours is almost always this, so always send an ISO string to the server and parse only ISO strings.',
            'Гарантирован только формат ISO 8601. "2024-01-01" — полночь по UTC, "2024/01/01" в V8 — полночь по локальному времени, а "01-01-2024" остаётся на усмотрение движка. Форма, где пользователь выбирает дату и значение уезжает на несколько часов, почти всегда связана именно с этим, поэтому на сервер отправляйте ISO-строку и разбирайте только ISO.'
          ),
        },
        {
          tone: 'warning',
          title: L('Daylight saving breaks naive arithmetic', 'Летнее время ломает наивную арифметику'),
          text: L(
            'Adding 24 * 60 * 60 * 1000 keeps the clock time but can change the calendar date, because a transition day is 23 or 25 hours long. Use a date library, or the Temporal API, for anything that must land on a specific calendar day.',
            'Прибавление 24 * 60 * 60 * 1000 сохраняет время на часах, но может изменить календарную дату, потому что в день перехода сутки длятся 23 или 25 часов. Для всего, что должно попасть на конкретный календарный день, используйте библиотеку дат или API Temporal.'
          ),
        },
      ],
      takeaway: L(
        'Store and parse ISO 8601 only, read UTC accessors for anything shared, and do calendar arithmetic with a library or Temporal instead of adding milliseconds.',
        'Храните и разбирайте только ISO 8601, для общих данных читайте методы UTC, а календарную арифметику делайте библиотекой или Temporal, а не прибавлением миллисекунд.'
      ),
      seeAlso: [
        L('Section 10-5: Intl formatting of dates', 'Секция 10-5: форматирование дат через Intl'),
        L('Chapter 9: strings, regex and parsing', 'Глава 9: строки, регулярные выражения и разбор'),
        L('Chapter 14: the DOM and browser APIs', 'Глава 14: DOM и браузерные API'),
      ],
    },
    {
      id: 'js-core-ch10-s5',
      title: L('Intl: formatting numbers, dates and relative time', 'Intl: форматирование чисел, дат и относительного времени'),
      body: L(
        'The Intl namespace turns locale rules into objects you can reuse. Intl.NumberFormat takes a locale and options: style can be decimal, percent, currency or unit, and the currency and unit options say which one. The same formatter handles grouping, a minimum number of fraction digits, and the compact notation that turns 12345 into "12K". Intl.DateTimeFormat does the same for dates, either through dateStyle and timeStyle or through year, month, day and hour options, plus a timeZone option so the output does not depend on the machine that renders it.\n\nIntl.RelativeTimeFormat produces phrases such as "3 days ago" or "in 2 hours". Creating a formatter is expensive, because the engine loads and prepares the locale data, while calling format on an existing formatter is cheap. That is why (1234.5).toLocaleString() in a loop is a performance bug: it constructs a fresh formatter for every single value. Build the formatter once, usually at module level, and keep the reference.\n\nSorting needs its own tool. Array.prototype.sort compares UTF-16 code units by default, so uppercase letters come before lowercase ones and accented letters land after "z". Intl.Collator fixes that with locale-aware rules: in German "ä" sorts next to "a", and collator.compare gives the same answer as String.prototype.localeCompare, the method to use for a one-off comparison.\n\nUnicode adds another layer, because "é" can be one code point or the letter "e" plus a combining accent, and two strings that look identical are not equal. Normalizing to NFC before storing or comparing removes that class of bug at the source, where it is cheapest.',
        'Пространство имён Intl превращает правила локали в переиспользуемые объекты. Intl.NumberFormat принимает локаль и опции: style может быть decimal, percent, currency или unit, а опции currency и unit указывают, какая именно. Тот же форматтер отвечает за группировку разрядов, минимальное число дробных знаков и компактную запись, превращающую 12345 в "12K". Intl.DateTimeFormat делает то же самое для дат — либо через dateStyle и timeStyle, либо через опции year, month, day и hour, плюс опция timeZone, чтобы вывод не зависел от машины, на которой его отрисовывают.\n\nIntl.RelativeTimeFormat выдаёт фразы вида "3 days ago" или "in 2 hours". Создание форматтера дорогое, потому что движок загружает и подготавливает данные локали, а вызов format у уже готового форматтера дешёвый. Именно поэтому (1234.5).toLocaleString() в цикле — это баг производительности: он создаёт новый форматтер для каждого значения. Соберите форматтер один раз, обычно на уровне модуля, и сохраните ссылку.\n\nДля сортировки нужен собственный инструмент. По умолчанию Array.prototype.sort сравнивает кодовые единицы UTF-16, поэтому заглавные буквы идут перед строчными, а буквы с диакритикой оказываются после "z". Intl.Collator это исправляет по правилам локали: в немецком "ä" стоит рядом с "a", а collator.compare даёт тот же ответ, что и String.prototype.localeCompare — метод для разовой сравнительной проверки.\n\nUnicode добавляет ещё слой, потому что "é" может быть одним кодовым символом, а может быть буквой "e" плюс комбинирующий диакритический знак, и две одинаково выглядящие строки не равны. Нормализация в NFC перед сохранением или сравнением убирает этот класс багов в самом начале, где это дешевле всего.'
      ),
      bullets: [
        L('Intl.NumberFormat supports decimal, percent, currency and unit styles.', 'Intl.NumberFormat поддерживает стили decimal, percent, currency и unit.'),
        L('Constructing a formatter loads locale data, calling format on it is cheap.', 'Создание форматтера грузит данные локали, а вызов format на нём дёшев.'),
        L('toLocaleString builds a new formatter on every call.', 'toLocaleString создаёт новый форматтер при каждом вызове.'),
        L('Intl.RelativeTimeFormat produces phrases like "3 days ago".', 'Intl.RelativeTimeFormat выдаёт фразы вида "3 days ago".'),
        L('Intl.Collator sorts by locale rules, not by UTF-16 code units.', 'Intl.Collator сортирует по правилам локали, а не по кодовым единицам UTF-16.'),
        L('Two visually identical strings can differ until both are normalized to NFC.', 'Две одинаково выглядящие строки могут различаться, пока обе не нормализованы в NFC.'),
      ],
      code: `const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
money.format(1234.5);        // '$1,234.50'

new Intl.NumberFormat('de-DE').format(1234.5);      // '1.234,5'
new Intl.NumberFormat('en', { style: 'percent' }).format(0.25); // '25%'
new Intl.NumberFormat('en', { notation: 'compact' }).format(12345); // '12K'

const dateFmt = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'long',
  timeZone: 'Europe/Moscow',
});
dateFmt.format(new Date());   // '15 января 2024 г.'

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
rtf.format(-3, 'day');       // '3 days ago'

const collator = new Intl.Collator('de');
['ä', 'z', 'a'].sort(collator.compare); // ['a', 'ä', 'z']
'e\\u0301'.normalize('NFC') === 'é';     // true`,
      table: {
        caption: L('The Intl formatters', 'Форматтеры Intl'),
        headers: [L('Formatter', 'Форматтер'), L('Formats', 'Форматирует'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('Intl.NumberFormat', 'Intl.NumberFormat'), L('numbers, currency, percent, units', 'числа, валюты, проценты, единицы'), L('prices and quantities', 'цены и количества')],
          [L('Intl.DateTimeFormat', 'Intl.DateTimeFormat'), L('dates and times', 'даты и время'), L('displaying timestamps', 'показ отметок времени')],
          [L('Intl.RelativeTimeFormat', 'Intl.RelativeTimeFormat'), L('relative time', 'относительное время'), L('"3 days ago"', '"3 days ago"')],
          [L('Intl.Collator', 'Intl.Collator'), L('sorting and comparison', 'сортировка и сравнение'), L('locale aware ordering', 'порядок по правилам локали')],
          [L('Intl.ListFormat', 'Intl.ListFormat'), L('lists', 'списки'), L('"a, b and c"', '"a, b and c"')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Never call toLocaleString in a loop', 'Не вызывайте toLocaleString в цикле'),
          text: L(
            'Each call to (value).toLocaleString() or toLocaleDateString() builds a new formatter and reloads the locale data. Rendering a list of ten thousand rows this way costs ten thousand constructions. Create one formatter outside the render path and call format on it.',
            'Каждый вызов (value).toLocaleString() или toLocaleDateString() создаёт новый форматтер и заново загружает данные локали. Отрисовка списка из десяти тысяч строк таким способом стоит десяти тысяч созданий форматтера. Создайте один форматтер вне пути отрисовки и вызывайте у него format.'
          ),
        },
        {
          tone: 'tip',
          title: L('Normalize before comparing', 'Нормализуйте перед сравнением'),
          text: L(
            'A user who types "é" with a dead key produces a decomposed string that does not equal the composed one from your database. Normalize with value.normalize("NFC") before you store it, compare it or use it as an object key.',
            'Пользователь, введший "é" через мёртвую клавишу, получает разложенную строку, которая не равна составной строке из вашей базы. Нормализуйте через value.normalize("NFC") перед сохранением, сравнением или использованием в качестве ключа объекта.'
          ),
        },
      ],
      takeaway: L(
        'Build every Intl formatter once and reuse it, and normalize strings to NFC before comparing them.',
        'Создавайте каждый форматтер Intl один раз и переиспользуйте его, а строки нормализуйте в NFC перед сравнением.'
      ),
      seeAlso: [
        L('Section 10-4: dates, timezones and the Date pitfalls', 'Секция 10-4: даты, часовые пояса и подводные камни Date'),
        L('Chapter 7: arrays and collection methods', 'Глава 7: массивы и методы коллекций'),
        L('Chapter 9: strings, regex and parsing', 'Глава 9: строки, регулярные выражения и разбор'),
      ],
    },
  ],
};
