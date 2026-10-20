import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const stringsTasks: PracticeTask[] = [
  {
    id: 'topic-strings-1',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'basic',
    title: L('Reverse the word order', 'Развернуть порядок слов'),
    brief: L(
      'Write a function reverseWords(sentence) that returns the sentence with its words in reverse order. Words are separated by any number of spaces, and the result never has a leading or a trailing space. Example: reverseWords("hello world") returns "world hello", reverseWords("  the quick brown fox  ") returns "fox brown quick the", reverseWords("single") returns "single", reverseWords("   ") returns "".',
      'Напишите функцию reverseWords(sentence), которая возвращает предложение со словами в обратном порядке. Слова разделены любым количеством пробелов, а в результате нет пробелов в начале и в конце. Пример: reverseWords("hello world") возвращает "world hello", reverseWords("  the quick brown fox  ") возвращает "fox brown quick the", reverseWords("single") возвращает "single", reverseWords("   ") возвращает "".'
    ),
    hint: L(
      'Trim the string, split it on whitespace, reverse the parts and join them with a single space.',
      'Обрежьте строку, разбейте её по пробельным символам, разверните части и соедините одним пробелом.'
    ),
    solution: `function reverseWords(sentence) {
  const words = sentence.trim().split(/\\s+/).filter((word) => word.length > 0);
  return words.reverse().join(' ');
}

console.log(reverseWords('hello world')); // world hello
console.log(reverseWords('  the quick brown fox  ')); // fox brown quick the
console.log(reverseWords('single')); // single
console.log(reverseWords('   ')); // (empty string)`,
    explanation: L(
      'trim() removes the spaces at both ends, split(/\\s+/) cuts the sentence into words no matter how many spaces separate them, and filter drops the empty piece that an all-space string produces. reverse() flips the array in place, so join(" ") prints the words back to front with exactly one space between them.',
      'trim() убирает пробелы по краям, split(/\\s+/) режет предложение на слова независимо от количества пробелов между ними, а filter убирает пустой кусок, который остаётся у строки только из пробелов. reverse() разворачивает массив на месте, поэтому join(" ") печатает слова задом наперёд ровно с одним пробелом между ними.'
    ),
  },
  {
    id: 'topic-strings-2',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'basic',
    title: L('Capitalize every word', 'Заглавная буква в каждом слове'),
    brief: L(
      'Write a function titleCase(text) that uppercases the first letter of every word and lowercases the rest of the letters of that word. Words are separated by spaces, the result has single spaces between the words and no leading or trailing space, and any punctuation inside a word stays where it is. Example: titleCase("hello WORLD") returns "Hello World", titleCase("the quick brown fox") returns "The Quick Brown Fox", titleCase("hello, world!") returns "Hello, World!", titleCase("") returns "".',
      'Напишите функцию titleCase(text), которая делает первую букву каждого слова заглавной, а остальные буквы этого слова — строчными. Слова разделены пробелами, в результате между словами ровно один пробел и нет пробелов по краям, а знаки препинания внутри слова остаются на своих местах. Пример: titleCase("hello WORLD") возвращает "Hello World", titleCase("the quick brown fox") возвращает "The Quick Brown Fox", titleCase("hello, world!") возвращает "Hello, World!", titleCase("") возвращает "".'
    ),
    hint: L(
      'Split the text into words, then for every word take the first character with toUpperCase() and the rest with toLowerCase().',
      'Разбейте текст на слова, а в каждом слове возьмите первый символ через toUpperCase(), а остальные — через toLowerCase().'
    ),
    solution: `function titleCase(text) {
  return text
    .trim()
    .split(/\\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

console.log(titleCase('hello WORLD')); // Hello World
console.log(titleCase('the quick brown fox')); // The Quick Brown Fox
console.log(titleCase('hello, world!')); // Hello, World!
console.log(titleCase('')); // (empty string)`,
    explanation: L(
      'The text is first normalized into a list of clean words, so extra spaces never reach the result. For every word the first character is taken with toUpperCase() and joined with the rest of the word lowered by toLowerCase(). Because the first character is kept as it is, a word like "hello," becomes "Hello," and the punctuation survives.',
      'Сначала текст превращается в список чистых слов, поэтому лишние пробелы не попадают в результат. У каждого слова первый символ берётся через toUpperCase() и соединяется с остатком слова, приведённым к нижнему регистру через toLowerCase(). Так как первый символ сохраняется как есть, слово "hello," превращается в "Hello," — знак препинания остаётся.'
    ),
  },
  {
    id: 'topic-strings-3',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'basic',
    title: L('Build a URL slug', 'Собрать URL-слаг'),
    brief: L(
      'Write a function slugify(title) that turns a title into a URL slug. The result is lowercase, every run of characters that are not a Latin letter or a digit becomes a single hyphen, and the hyphens at the start and at the end are removed. Example: slugify("Hello, World!") returns "hello-world", slugify("  React 18 in 2024  ") returns "react-18-in-2024", slugify("C++ & Rust") returns "c-rust", slugify("---") returns "".',
      'Напишите функцию slugify(title), которая превращает заголовок в URL-слаг. Результат в нижнем регистре, каждая последовательность символов, кроме латинских букв и цифр, превращается в один дефис, а дефисы в начале и в конце удаляются. Пример: slugify("Hello, World!") возвращает "hello-world", slugify("  React 18 in 2024  ") возвращает "react-18-in-2024", slugify("C++ & Rust") возвращает "c-rust", slugify("---") возвращает "".'
    ),
    hint: L(
      'Use a global replace with the pattern /[^a-z0-9]+/g and then cut the hyphens off the ends with a second replace.',
      'Используйте глобальную замену по шаблону /[^a-z0-9]+/g, а затем уберите дефисы по краям второй заменой.'
    ),
    solution: `function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

console.log(slugify('Hello, World!')); // hello-world
console.log(slugify('  React 18 in 2024  ')); // react-18-in-2024
console.log(slugify('C++ & Rust')); // c-rust
console.log(slugify('---')); // (empty string)`,
    explanation: L(
      'toLowerCase() first makes sure that uppercase letters become part of the allowed set. The replace with the + quantifier collapses a whole run of unwanted characters into one hyphen, so "C++ & " turns into a single "-" instead of three. The last replace removes the hyphen at the start and the hyphen at the end, and a title made of symbols only ends up as an empty string.',
      'Сначала toLowerCase() делает так, что заглавные буквы тоже попадают в разрешённый набор. Замена с квантификатором + схлопывает целую серию нежелательных символов в один дефис, поэтому "C++ & " превращается в один "-", а не в три. Последняя замена убирает дефис в начале и дефис в конце, и заголовок из одних символов в итоге даёт пустую строку.'
    ),
  },
  {
    id: 'topic-strings-4',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'intermediate',
    title: L('Truncate with an ellipsis', 'Обрезать текст с многоточием'),
    brief: L(
      'Write a function truncate(text, maxLength) that shortens a text so that the result is at most maxLength characters long, and the three dots of the ellipsis are counted in that limit. A text that already fits is returned unchanged, a text that does not fit is cut and "..." is added at the end, a limit of 3 or less (but more than zero) gives only dots, and a limit of zero or less gives an empty string. Example: truncate("Hello world", 8) returns "Hello...", truncate("Hello", 5) returns "Hello", truncate("Hello world", 5) returns "He...", truncate("Hi", 0) returns "".',
      'Напишите функцию truncate(text, maxLength), которая укорачивает текст так, чтобы результат был не длиннее maxLength символов, причём три точки многоточия тоже считаются в этот лимит. Текст, который уже помещается, возвращается без изменений, не помещающийся обрезается, а в конец добавляется "...", лимит 3 или меньше (но больше нуля) даёт только точки, а лимит ноль или меньше — пустую строку. Пример: truncate("Hello world", 8) возвращает "Hello...", truncate("Hello", 5) возвращает "Hello", truncate("Hello world", 5) возвращает "He...", truncate("Hi", 0) возвращает "".'
    ),
    hint: L(
      'Check the easy cases first: a non-positive limit gives an empty string and a text that fits is returned as it is. Otherwise cut maxLength - 3 characters and add the dots.',
      'Сначала проверьте простые случаи: неположительный лимит даёт пустую строку, а текст, который помещается, возвращается как есть. Иначе отрежьте maxLength - 3 символа и добавьте точки.'
    ),
    solution: `function truncate(text, maxLength) {
  if (maxLength <= 0) return '';
  if (text.length <= maxLength) return text;
  if (maxLength <= 3) return '.'.repeat(maxLength);
  return text.slice(0, maxLength - 3) + '...';
}

console.log(truncate('Hello world', 8)); // Hello...
console.log(truncate('Hello', 5)); // Hello
console.log(truncate('Hello world', 5)); // He...
console.log(truncate('Hi', 0)); // (empty string)`,
    explanation: L(
      'The guards run before any cutting happens, so a text that is already short enough is never modified and a limit of zero or less gives an empty string. The + and - 3 in the last line is the whole trick: the ellipsis takes three characters of the budget, so only maxLength - 3 characters of the text survive. A limit of three or less cannot hold any text at all, so only the dots are returned.',
      'Все проверки выполняются до обрезки, поэтому текст, который уже достаточно короткий, не меняется, а лимит ноль или меньше даёт пустую строку. Самое главное — это + и - 3 в последней строке: многоточие занимает три символа бюджета, поэтому от текста остаётся только maxLength - 3 символа. Лимит три или меньше вообще не вмещает текст, поэтому возвращаются только точки.'
    ),
  },
  {
    id: 'topic-strings-5',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'intermediate',
    title: L('Count the vowels', 'Посчитать гласные'),
    brief: L(
      'Write a function countVowels(text) that returns how many vowel letters the text contains. The vowels are a, e, i, o and u in either case, and every other character (spaces, digits, punctuation) is ignored. Example: countVowels("Hello World") returns 3, countVowels("AEIOU") returns 5, countVowels("xyz") returns 0, countVowels("") returns 0.',
      'Напишите функцию countVowels(text), которая возвращает, сколько гласных букв содержится в тексте. Гласные — это a, e, i, o, u в любом регистре, а все остальные символы (пробелы, цифры, знаки препинания) игнорируются. Пример: countVowels("Hello World") возвращает 3, countVowels("AEIOU") возвращает 5, countVowels("xyz") возвращает 0, countVowels("") возвращает 0.'
    ),
    hint: L(
      'Lowercase the text once, then walk over it character by character and check whether the character is inside the string "aeiou".',
      'Один раз приведите текст к нижнему регистру, затем пройдитесь по нему посимвольно и проверяйте, входит ли символ в строку "aeiou".'
    ),
    solution: `function countVowels(text) {
  const vowels = 'aeiou';
  let count = 0;

  for (const char of text.toLowerCase()) {
    if (vowels.includes(char)) count += 1;
  }

  return count;
}

console.log(countVowels('Hello World')); // 3
console.log(countVowels('AEIOU')); // 5
console.log(countVowels('xyz')); // 0
console.log(countVowels('')); // 0`,
    explanation: L(
      'Lowercasing once at the start means the check inside the loop stays simple: there is no need to test both cases. The for...of loop walks the string character by character, and includes() asks whether the character is one of the five vowels. Everything else, including digits and spaces, is simply not counted and the counter starts at zero, so an empty text gives zero.',
      'Приведение к нижнему регистру один раз в начале позволяет упростить проверку внутри цикла: не нужно тестировать оба регистра. Цикл for...of проходит строку посимвольно, а includes() спрашивает, входит ли символ в пятёрку гласных. Всё остальное — цифры, пробелы — просто не считается, а счётчик начинается с нуля, поэтому пустой текст даёт ноль.'
    ),
  },
  {
    id: 'topic-strings-6',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'advanced',
    title: L('Check a palindrome', 'Проверить палиндром'),
    brief: L(
      'Write a function isPalindrome(text) that returns true when the text reads the same in both directions. The check ignores the letter case and every character that is not a Latin letter or a digit, so spaces and punctuation do not matter. Example: isPalindrome("A man, a plan, a canal: Panama") returns true, isPalindrome("No \'x\' in Nixon") returns true, isPalindrome("hello") returns false, isPalindrome("") returns true.',
      'Напишите функцию isPalindrome(text), которая возвращает true, если текст читается одинаково в обе стороны. Проверка игнорирует регистр букв и каждый символ, кроме латинских букв и цифр, поэтому пробелы и знаки препинания не важны. Пример: isPalindrome("A man, a plan, a canal: Panama") возвращает true, isPalindrome("No \'x\' in Nixon") возвращает true, isPalindrome("hello") возвращает false, isPalindrome("") возвращает true.'
    ),
    hint: L(
      'Build a cleaned version of the string first: lowercase it and drop everything that is not a letter or a digit. Then compare the cleaned string with its reverse.',
      'Сначала соберите очищенную версию строки: приведите её к нижнему регистру и уберите всё, что не буква и не цифра. Затем сравните очищенную строку с её разворотом.'
    ),
    solution: `function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome("No 'x' in Nixon")); // true
console.log(isPalindrome('hello')); // false
console.log(isPalindrome('')); // true`,
    explanation: L(
      'The comparison only makes sense on normalized data, so the string is lowercased and stripped of everything but letters and digits first. After that the task is pure string work: split into characters, reverse, join back and compare with the original cleaned text. An empty string is equal to its own reverse, so it counts as a palindrome.',
      'Сравнивать имеет смысл только нормализованные данные, поэтому строка сначала приводится к нижнему регистру и очищается от всего, кроме букв и цифр. Дальше остаётся чистая работа со строкой: разбить на символы, развернуть, склеить обратно и сравнить с исходной очищенной строкой. Пустая строка равна своему развороту, поэтому считается палиндромом.'
    ),
  },
  {
    id: 'topic-strings-7',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'advanced',
    title: L('Parse a query string', 'Разобрать строку запроса'),
    brief: L(
      'Write a function parseQuery(query) that turns a URL query string into an object. Pairs are separated by "&" and the key is separated from the value by "=". A pair without "=" means an empty value, an empty value is allowed, and when the same key appears twice the last value wins. Percent escapes are decoded and "+" becomes a space. Example: parseQuery("a=1&b=2") returns { a: "1", b: "2" }, parseQuery("q=hello+world&lang=ru") returns { q: "hello world", lang: "ru" }, parseQuery("a=1&a=2") returns { a: "2" }, parseQuery("flag") returns { flag: "" }, parseQuery("") returns {}.',
      'Напишите функцию parseQuery(query), которая превращает строку запроса URL в объект. Пары разделены "&", а ключ отделён от значения знаком "=". Пара без "=" означает пустое значение, пустое значение допустимо, а если один и тот же ключ встретился дважды, побеждает последнее значение. Процентные escapes декодируются, а "+" превращается в пробел. Пример: parseQuery("a=1&b=2") возвращает { a: "1", b: "2" }, parseQuery("q=hello+world&lang=ru") возвращает { q: "hello world", lang: "ru" }, parseQuery("a=1&a=2") возвращает { a: "2" }, parseQuery("flag") возвращает { flag: "" }, parseQuery("") возвращает {}.'
    ),
    hint: L(
      'Split the query on "&", find the first "=" in every pair with indexOf, and decode the key and the value separately.',
      'Разбейте запрос по "&", найдите в каждой паре первое "=" через indexOf и декодируйте ключ и значение отдельно.'
    ),
    solution: `function decode(value) {
  try {
    return decodeURIComponent(value.replace(/\\+/g, ' '));
  } catch {
    return value;
  }
}

function parseQuery(query) {
  const result = {};
  if (!query) return result;

  for (const pair of query.split('&')) {
    if (!pair) continue;

    const separator = pair.indexOf('=');
    const key = separator === -1 ? pair : pair.slice(0, separator);
    const value = separator === -1 ? '' : pair.slice(separator + 1);

    result[decode(key)] = decode(value);
  }

  return result;
}

console.log(parseQuery('a=1&b=2')); // { a: '1', b: '2' }
console.log(parseQuery('q=hello+world&lang=ru')); // { q: 'hello world', lang: 'ru' }
console.log(parseQuery('a=1&a=2')); // { a: '2' }
console.log(parseQuery('flag')); // { flag: '' }
console.log(parseQuery('')); // {}`,
    explanation: L(
      'Splitting on "&" gives the pairs, and indexOf("=") finds the boundary inside a pair. When there is no "=" the whole pair is the key and the value is an empty string. The decode helper first turns "+" into a space and then decodes percent escapes, and the try/catch keeps a broken escape like "%zz" from crashing the whole parse. Because the result object is filled in a loop, a repeated key is simply overwritten, so the last value wins.',
      'Разбиение по "&" даёт пары, а indexOf("=") находит границу внутри пары. Если "=" нет, вся пара — это ключ, а значение пустая строка. Вспомогательная функция decode сначала превращает "+" в пробел, а потом декодирует процентные escapes, и try/catch не даёт сломанному escape вроде "%zz" сломать весь разбор. Так как результат заполняется в цикле, повторяющийся ключ просто перезаписывается — побеждает последнее значение.'
    ),
  },
  {
    id: 'topic-strings-8',
    moduleId: 'js-core',
    topic: 'strings',
    level: 'advanced',
    title: L('Mask an email and a phone', 'Замаскировать email и телефон'),
    brief: L(
      'Write two functions. maskEmail(email) keeps the first character of the part before the "@" and the first character of the domain name, replaces every other character of those two parts with "*" and leaves the rest of the domain (the dot and the top level domain) as it is; a string without "@" is returned unchanged. maskPhone(phone) removes every character that is not a digit, keeps the last four digits and replaces every digit before them with "*"; a number of four digits or fewer is returned unchanged. Example: maskEmail("john.doe@example.com") returns "j*******@e******.com", maskEmail("bad") returns "bad", maskPhone("+7 (999) 123-45-67") returns "*******4567", maskPhone("1234") returns "1234".',
      'Напишите две функции. maskEmail(email) сохраняет первый символ части до "@" и первый символ имени домена, каждый другой символ этих двух частей заменяет на "*", а остаток домена (точка и домен верхнего уровня) оставляет как есть; строка без "@" возвращается без изменений. maskPhone(phone) удаляет все символы, кроме цифр, оставляет последние четыре цифры, а каждую цифру перед ними заменяет на "*"; число из четырёх цифр или меньше возвращается без изменений. Пример: maskEmail("john.doe@example.com") возвращает "j*******@e******.com", maskEmail("bad") возвращает "bad", maskPhone("+7 (999) 123-45-67") возвращает "*******4567", maskPhone("1234") возвращает "1234".'
    ),
    hint: L(
      'Find the "@" with lastIndexOf, cut the local part and the domain apart, and build the mask with "*".repeat(n) where n is the number of hidden characters.',
      'Найдите "@" через lastIndexOf, отделите локальную часть от домена и соберите маску через "*".repeat(n), где n — количество скрытых символов.'
    ),
    solution: `function maskEmail(email) {
  const at = email.lastIndexOf('@');
  if (at <= 0) return email;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const dot = domain.indexOf('.');
  const name = dot === -1 ? domain : domain.slice(0, dot);
  const rest = dot === -1 ? '' : domain.slice(dot);

  return (
    local[0] +
    '*'.repeat(local.length - 1) +
    '@' +
    name[0] +
    '*'.repeat(name.length - 1) +
    rest
  );
}

function maskPhone(phone) {
  const digits = phone.replace(/\\D/g, '');
  if (digits.length <= 4) return digits;
  return '*'.repeat(digits.length - 4) + digits.slice(-4);
}

console.log(maskEmail('john.doe@example.com')); // j*******@e******.com
console.log(maskEmail('bad')); // bad
console.log(maskPhone('+7 (999) 123-45-67')); // *******4567
console.log(maskPhone('1234')); // 1234`,
    explanation: L(
      'The mask keeps the length of the original value, so the shape of the email or the phone stays readable while the content is hidden. lastIndexOf("@") splits the local part from the domain, and a second split on the first dot separates the domain name from the top level domain, which stays visible. For the phone the non-digits are dropped with a regular expression first, and only the digits are counted, so formatting characters never affect the number of stars.',
      'Маска сохраняет длину исходного значения, поэтому вид email или телефона остаётся читаемым, а содержимое скрыто. lastIndexOf("@") отделяет локальную часть от домена, а второе деление по первой точке отделяет имя домена от домена верхнего уровня, который остаётся видимым. Для телефона сначала регулярным выражением убираются все не-цифры, и считаются только цифры, поэтому знаки форматирования не влияют на количество звёздочек.'
    ),
  },
];
