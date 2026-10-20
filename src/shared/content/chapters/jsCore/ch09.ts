import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh09: Chapter = {
  id: 'js-core-ch9',
  title: L('Strings, regex and parsing', 'Строки, регулярные выражения и разбор'),
  summary: L(
    'How strings really work under the hood, what the template literal syntax adds, which string methods are worth remembering, how to read and write regular expressions, and how to parse real data without losing your sanity.',
    'Как на самом деле устроены строки, что добавляет синтаксис шаблонных литералов, какие строковые методы стоит запомнить, как читать и писать регулярные выражения и как разбирать реальные данные без потери рассудка.'
  ),
  sections: [
    {
      id: 'js-core-ch9-s1',
      title: L('String primitives, UTF-16 and length', 'Строки-примитивы, UTF-16 и length'),
      body: L(
        'Strings in JavaScript are primitives, and they are immutable. Every method that looks like it changes a string actually returns a new one, and the original stays exactly as it was. The internal representation is a sequence of UTF-16 code units, and that single fact explains most of the surprising behaviour people meet with emoji and with characters from other scripts.\n\nlength counts code units, not characters. An emoji such as U+1F600 needs two UTF-16 code units, so its length is 2, and the same is true for many CJK characters outside the basic multilingual plane. To work with whole characters you need code points: str.codePointAt(0) returns the numeric code point, and spreading the string into an array gives one entry per code point. Spreading is why [...str].length and str.length disagree.\n\nIndexing follows the same rule. str[0] returns a single code unit, which for a surrogate pair is half of a character, while String.prototype.at accepts negative indexes and gives the last code unit with str.at(-1). The modern way to read the last character is str.at(-1), because str[str.length - 1] repeats the length arithmetic and breaks the moment the string is empty.\n\nStrings compare by code unit, so === is a code unit comparison and nothing more: it knows nothing about accents, case or locale rules. For user-facing sorting and comparison use localeCompare, which consults the collation rules of the locale. To convert any value to a string use String(value): it handles null and undefined without throwing, and a template literal does the same thing implicitly.',
        'Строки в JavaScript — примитивы, и они неизменяемы. Любой метод, который выглядит как изменение строки, на самом деле возвращает новую, а исходная остаётся ровно такой же. Внутри строка хранится как последовательность кодовых единиц UTF-16, и этот единственный факт объясняет почти всё странное поведение, с которым сталкиваются при работе с эмодзи и символами других письменностей.\n\nlength считает кодовые единицы, а не символы. Эмодзи вроде U+1F600 занимает две кодовые единицы UTF-16, поэтому его длина равна 2, и то же верно для многиех иероглифов за пределами базовой многоязычной плоскости. Чтобы работать с целыми символами, нужны кодовые точки: str.codePointAt(0) возвращает числовой код, а разворачивание строки в массив даёт по одному элементу на кодовую точку. Именно поэтому [...str].length и str.length расходятся.\n\nИндексация подчиняется тому же правилу. str[0] возвращает одну кодовую единицу, а для суррогатной пары это половина символа, тогда как String.prototype.at принимает отрицательные индексы и отдаёт последнюю кодовую единицу через str.at(-1). Современный способ взять последний символ — это str.at(-1), потому что str[str.length - 1] повторяет арифметику длины и ломается на пустой строке.\n\nСтроки сравниваются по кодовым единицам, поэтому === — это сравнение кодовых единиц и ничего больше: оно не знает ни об акцентах, ни о регистре, ни о правилах локали. Для пользовательской сортировки и сравнения используйте localeCompare, который обращается к правилам сортировки локали. Для приведения любого значения к строке есть String(value): он не бросает исключение на null и undefined, а шаблонный литерал делает то же самое неявно.'
      ),
      bullets: [
        L('Strings are immutable primitives, every method returns a new string.', 'Строки — неизменяемые примитивы, каждый метод возвращает новую строку.'),
        L('length counts UTF-16 code units, so a surrogate pair counts as 2.', 'length считает кодовые единицы UTF-16, поэтому суррогатная пара даёт 2.'),
        L('[...str].length counts code points, str.codePointAt(0) returns one.', '[...str].length считает кодовые точки, str.codePointAt(0) возвращает одну.'),
        L('str.at(-1) returns the last code unit and accepts negative indexes.', 'str.at(-1) возвращает последнюю кодовую единицу и принимает отрицательные индексы.'),
        L('=== compares code units, localeCompare applies the locale rules.', '=== сравнивает кодовые единицы, localeCompare применяет правила локали.'),
        L('String(value) converts null and undefined without throwing.', 'String(value) приводит null и undefined без исключения.'),
      ],
      code: `const s = 'hello';
s[0];                 // 'h'
s.length;             // 5 - UTF-16 code units
s.toUpperCase();      // 'HELLO' - a new string
s === 'hello';        // true

const emoji = '\\u{1F600}';   // one code point, two code units
emoji.length;                // 2
[...emoji].length;           // 1
emoji.codePointAt(0);        // 128512

s.at(-1);             // 'o' - negative indexes are allowed
s.at(s.length - 1);   // 'o' - the old way

String(42);           // '42'
String(null);         // 'null'
'42' === 42;          // false - no coercion`,
      table: {
        caption: L('Measuring a string', 'Измерение строки'),
        headers: [
          L('Expression', 'Выражение'),
          L('Counts', 'Считает'),
          L('Result for a surrogate pair', 'Результат для суррогатной пары'),
        ],
        rows: [
          [L('str.length', 'str.length'), L('UTF-16 code units', 'кодовые единицы UTF-16'), L('2', '2')],
          [L('[...str].length', '[...str].length'), L('code points', 'кодовые точки'), L('1', '1')],
          [L('str.codePointAt(0)', 'str.codePointAt(0)'), L('the numeric code point', 'числовой код символа'), L('128512', '128512')],
          [L('str.at(-1)', 'str.at(-1)'), L('code units', 'кодовые единицы'), L('the low surrogate', 'нижняя суррогатная единица')],
          [L('str.normalize("NFC")', 'str.normalize("NFC")'), L('canonical form', 'каноническая форма'), L('one composed char', 'один составной символ')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Slicing cuts characters in half', 'Срез разрезает символ пополам'),
          text: L(
            'Since length counts code units, str.slice(0, 1) on a string that starts with an emoji returns half of that emoji, a lone surrogate. Spread the string first, or work with code points, when the text can contain characters outside the basic multilingual plane.',
            'Поскольку length считает кодовые единицы, str.slice(0, 1) для строки, начинающейся с эмодзи, вернёт половину эмодзи — одинокую суррогатную единицу. Если в тексте могут быть символы за пределами базовой плоскости, сначала разверните строку в массив или работайте с кодовыми точками.'
          ),
        },
        {
          tone: 'note',
          title: L('Why strings cannot be changed', 'Почему строки нельзя изменить'),
          text: L(
            'Strings are values, so every operation copies. That is why a huge string built in a loop with += is a real performance trap in some engines, and why the common pattern of building text in an array and calling join at the end exists at all.',
            'Строки — это значения, поэтому каждая операция копирует. Именно поэтому огромная строка, собираемая в цикле через +=, в некоторых движках становится настоящей ловушкой производительности — и именно поэтому текст собирают в массив, а в конце вызывают join.'
          ),
        },
      ],
      takeaway: L(
        'length counts UTF-16 code units, so use code points and spread syntax whenever the text can contain characters outside the basic plane.',
        'length считает кодовые единицы UTF-16, поэтому используйте кодовые точки и spread всякий раз, когда в тексте могут быть символы за пределами базовой плоскости.'
      ),
      seeAlso: [
        L('Chapter 1: primitives, values and immutability', 'Глава 1: примитивы, значения и неизменяемость'),
        L('Section 9-3: the string methods that matter', 'Секция 9-3: строковые методы, которые действительно нужны'),
        L('Chapter 10: numbers, formatting and Intl', 'Глава 10: числа, форматирование и Intl'),
      ],
    },
    {
      id: 'js-core-ch9-s2',
      title: L('Template literals and tagged templates', 'Шаблонные строки и тегированные шаблоны'),
      body: L(
        'Template literals are delimited by backticks and add three things to the language: interpolation of any expression inside ${ }, literal line breaks without escaping, and the ability to embed a string without worrying about quotes. Interpolation is not limited to variables, any expression is allowed, and the result is converted to a string exactly the way String() would do it.\n\nEscaping inside a template literal follows the usual rules plus one extra case. A backtick has to be written as \\` and a dollar sign as \\${ when it should stay literal. That second case matters in code generators and template engines, where a template that itself contains ${...} has to survive a round trip unchanged.\n\nA tagged template is a function called with the template. The tag receives the literal string parts as the first argument and the interpolated values as the rest, which means it can inspect the source and transform it. The special property strings.raw returns those parts exactly as they were written in the source, before any escape processing, which is what you want when building queries, paths or regular expressions from user input.\n\nThat is also how you make interpolation safe. A tag that escapes every interpolated value before pasting it into the output turns a template into a safe HTML builder or a parameterised SQL statement, because a value can never be read as code. Compared with plain concatenation, template literals win on readability and lose nothing on performance in modern engines, which compile the concatenation into the same thing behind the scenes.',
        'Шаблонные литералы выделяются обратными кавычками и добавляют к языку три вещи: интерполяцию любого выражения внутри ${ }, настоящие переводы строк без экранирования и возможность встроить строку, не думая о кавычках. Интерполяция не ограничивается переменными — разрешено любое выражение, а результат приводится к строке ровно так же, как это делал бы String().\n\nЭкранирование внутри шаблонного литерала подчиняется обычным правилам плюс одному особому случаю. Обратную кавычку приходится писать как \\`, а знак доллара — как \\${, если он должен остаться литералом. Второй случай важен в кодогенераторах и шаблонных движках, где шаблон, внутри которого самому есть ${...}, должен пережить round trip без изменений.\n\nТегированный шаблон — это функция, вызванная с шаблоном. Тег получает литеральные части строки первым аргументом, а подставленные значения — остальными, то есть он может изучить исходник и преобразовать его. Особое свойство strings.raw возвращает эти части ровно такими, какими они были написаны в исходнике, до обработки экранирования, — именно это и нужно при сборке запросов, путей и регулярных выражений из пользовательского ввода.\n\nТак же делают интерполяцию безопасной. Тег, который экранирует каждое подставленное значение перед вставкой в результат, превращает шаблон в безопасный HTML-конструктор или параметризованный SQL-запрос, потому что значение уже нельзя прочитать как код. По сравнению с обычной конкатенацией шаблонные литералы выигрывают в читаемости и ничего не теряют в производительности: современные движки компилируют конкатенацию в то же самое.'
      ),
      bullets: [
        L('Backticks allow interpolation, multiline text and unescaped quotes.', 'Обратные кавычки дают интерполяцию, многострочный текст и кавычки без экранирования.'),
        L('Any expression can be interpolated, not only variables.', 'Интерполировать можно любое выражение, а не только переменные.'),
        L('A literal dollar sign followed by a brace must be escaped.', 'Буквальный знак доллара с фигурной скобкой нужно экранировать.'),
        L('A tag receives the string parts first, then the interpolated values.', 'Тег получает первым части строки, затем подставленные значения.'),
        L('strings.raw returns the source text before escape processing.', 'strings.raw возвращает исходный текст до обработки экранирования.'),
        L('Modern engines compile concatenation and templates to the same code.', 'Современные движки компилируют конкатенацию и шаблоны в одинаковый код.'),
      ],
      code: `const name = 'Ada';
const age = 36;

// interpolation and multiline text
const greeting = \`Hello, \${name}, you are \${age} years old\`;
console.log(greeting);

const multi = \`Line one
Line two\`;

// a tag receives the literal parts and the interpolated values
function highlight(strings, ...values) {
  return strings.reduce(
    (acc, part, i) => acc + part + '<b>' + (values[i] ?? '') + '</b>',
    ''
  );
}
const html = highlight\`Hi \${name}\`;

// raw keeps the backslashes exactly as written
String.raw\`C:\\new\\table\`;`,
      table: {
        caption: L('Template literal versus concatenation', 'Шаблонный литерал против конкатенации'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Template literal', 'Шаблонный литерал'),
          L('Concatenation with +', 'Конкатенация через +'),
        ],
        rows: [
          [L('Readability', 'Читаемость'), L('values stay in place', 'значения остаются на месте'), L('quotes and pluses everywhere', 'кавычки и плюсы повсюду')],
          [L('Expressions', 'Выражения'), L('any expression', 'любое выражение'), L('everything becomes a string', 'всё становится строкой')],
          [L('Several values', 'Несколько значений'), L('one hole per value', 'одна дырка на значение'), L('one plus per value', 'один плюс на значение')],
          [L('Escaping', 'Экранирование'), L('the delimiter needs escaping', 'нужно экранировать разделитель'), L('no delimiter to escape', 'нечего экранировать')],
          [L('Performance', 'Производительность'), L('equal in modern engines', 'равно в современных движках'), L('equal in modern engines', 'равно в современных движках')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A tag is not a safe filter by itself', 'Тег сам по себе не фильтр безопасности'),
          text: L(
            'A tag that pastes the interpolated values straight into the output is exactly as unsafe as concatenation. The tag has to escape every value itself, or the template stays a source of injection bugs.',
            'Тег, который вставляет подставленные значения в результат как есть, ровно настолько же небезопасен, как конкатенация. Тег обязан сам экранировать каждое значение, иначе шаблон остаётся источником инъекций.'
          ),
        },
        {
          tone: 'tip',
          title: L('Build a domain specific tag', 'Сделайте тег под свою задачу'),
          text: L(
            'A tag named html or sql that escapes or parameterises its values makes the safe way the shortest way. Call sites stay readable, and the rule is enforced in one function instead of being repeated in every template.',
            'Тег с именем html или sql, который экранирует или параметризует значения, делает безопасный способ самым коротким. Места вызова остаются читаемыми, а правило проверяется в одной функции, а не повторяется в каждом шаблоне.'
          ),
        },
      ],
      takeaway: L(
        'Use template literals for text with values, and tag them when the output has to be escaped or parameterised.',
        'Используйте шаблонные литералы для текста со значениями и тегируйте их, когда результат должен быть экранирован или параметризован.'
      ),
      seeAlso: [
        L('Section 9-3: the string methods that matter', 'Секция 9-3: строковые методы, которые действительно нужны'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch9-s3',
      title: L('The string methods that matter', 'Строковые методы, которые действительно нужны'),
      body: L(
        'Strings are values, so the useful methods are the ones that answer a question about the content or build a new string from it. The split family answers where the boundaries are: split(separator) cuts a string into an array, join(glue) does the opposite, and the optional limit argument caps the number of parts. trim removes whitespace from both ends, includes, startsWith and endsWith answer presence questions without throwing on a missing value, and indexOf and lastIndexOf return a position or minus one.\n\nslice and substring both cut a string, but they disagree about the edges. slice accepts negative indexes, where -1 means the last character, and it never reorders its arguments. substring treats a negative start as zero and swaps the two arguments when the start comes after the end, so substring(11, 7) and substring(7, 11) return the same thing, while slice returns an empty string in that case. The practical advice is to use slice and treat substring as a legacy spelling.\n\nreplace and replaceAll are the substitution pair. replace with a string argument replaces only the first occurrence, which surprises everyone who expects the behaviour of replaceAll, while passing a regular expression with the g flag replaces every occurrence. The replacement can be a function, and the function receives the matched text, each captured group, the offset and the whole original string, which is how a number or a date gets reformatted without manual string surgery.\n\nThe formatting helpers fill in the rest: padStart and padEnd align text to a fixed width, repeat duplicates a string, and at reads a character by index and accepts negative indexes. Together these cover most string manipulation in application code, and the rest is usually better handled by a regular expression or by a dedicated parser.',
        'Строки — это значения, поэтому полезны те методы, которые отвечают на вопрос о содержимом или строят из строки новую. Семейство split отвечает на вопрос про границы: split(separator) режет строку на массив, join(glue) делает обратное, а необязательный аргумент-лимит ограничивает число частей. trim убирает пробельные символы с обоих концов, includes, startsWith и endsWith отвечают на вопрос о наличии, не бросая исключения на отсутствующем значении, а indexOf и lastIndexOf возвращают позицию или минус один.\n\nslice и substring оба режут строку, но по-разному относятся к границам. slice принимает отрицательные индексы, где -1 означает последний символ, и никогда не меняет порядок аргументов. substring считает отрицательное начало нулём и меняет аргументы местами, если начало больше конца, поэтому substring(11, 7) и substring(7, 11) дают одно и то же, а slice в этом случае вернёт пустую строку. Практический совет: используйте slice, а substring считайте устаревшим написанием.\n\nreplace и replaceAll — пара для подстановки. replace со строковым аргументом заменяет только первое вхождение, что удивляет всех, кто ждёт поведения replaceAll, а вот регулярное выражение с флагом g заменяет все вхождения. Замена может быть функцией, и она получает найденный текст, каждую группу захвата, смещение и исходную строку целиком — именно так переформатируют число или дату, не ковыряясь в строке руками.\n\nОстальное закрывают вспомогательные методы: padStart и padEnd выравнивают текст по фиксированной ширине, repeat дублирует строку, а at читает символ по индексу и принимает отрицательные индексы. Вместе они покрывают большую часть работы со строками в прикладном коде, а остальное обычно лучше решается регулярным выражением или специализированным парсером.'
      ),
      bullets: [
        L('split(separator, limit) caps the number of parts, join(glue) builds it back.', 'split(separator, limit) ограничивает число частей, join(glue) собирает обратно.'),
        L('slice accepts negative indexes and keeps the argument order.', 'slice принимает отрицательные индексы и сохраняет порядок аргументов.'),
        L('substring swaps its arguments and treats a negative start as zero.', 'substring меняет аргументы местами, а отрицательное начало считает нулём.'),
        L('replace with a string replaces only the first occurrence.', 'replace со строкой заменяет только первое вхождение.'),
        L('replaceAll, or a regex with the g flag, replaces every occurrence.', 'replaceAll или регулярное выражение с флагом g заменяет все вхождения.'),
        L('A function replacer receives the match, the groups and the offset.', 'Функция-заменитель получает совпадение, группы и смещение.'),
      ],
      code: `const file = 'report-2024.pdf';

file.slice(-4);                 // '.pdf'
file.slice(7, 11);              // '2024'
file.substring(11, 7);          // '2024' - the arguments are swapped
file.slice(11, 7);              // '' - slice keeps the given order

'  padded  '.trim();            // 'padded'
'a,b,c'.split(',');             // ['a', 'b', 'c']
['a', 'b'].join('-');           // 'a-b'
'a,b,c'.split(',', 2);          // ['a', 'b'] - the limit keeps two parts

'2024-01-31'.includes('-');       // true
'2024-01-31'.startsWith('2024');  // true
'2024-01-31'.indexOf('-');        // 4

'2024-01-31'.replace('-', '/');      // '2024/01-31'
'2024-01-31'.replaceAll('-', '/');  // '2024/01/31'
'a-b-c'.replace(/-/g, '+');         // 'a+b+c'

// a function replacer receives the match and the groups
'2024-01-31'.replace(/(\\d+)-(\\d+)-(\\d+)/, (m, y, mo, d) => d + '/' + mo + '/' + y);`,
      table: {
        caption: L('slice versus substring', 'slice против substring'),
        headers: [
          L('Aspect', 'Аспект'),
          L('slice', 'slice'),
          L('substring', 'substring'),
        ],
        rows: [
          [L('Negative start', 'Отрицательное начало'), L('counts from the end', 'считает с конца'), L('treated as zero', 'считается нулём')],
          [L('Swapped arguments', 'Аргументы наоборот'), L('no swap, empty string', 'не меняет, пустая строка'), L('swaps them', 'меняет местами')],
          [L('End argument', 'Конечный аргумент'), L('exclusive', 'не включается'), L('exclusive', 'не включается')],
          [L('Negative end', 'Отрицательный конец'), L('counts from the end', 'считает с конца'), L('treated as zero', 'считается нулём')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('replace is not replaceAll', 'replace — это не replaceAll'),
          text: L(
            'A string replacement touches only the first match, so "a-b-c".replace("-", "+") gives "a+b-c" and looks like a bug in the code that follows. Use replaceAll for a plain string or a global regular expression when every occurrence has to go.',
            'Строковая замена затрагивает только первое совпадение, поэтому "a-b-c".replace("-", "+") даёт "a+b-c" и выглядит как баг в коде, который идёт дальше. Для обычной строки берите replaceAll, а для всех вхождений — глобальное регулярное выражение.'
          ),
        },
        {
          tone: 'tip',
          title: L('Prefer slice and at', 'Предпочитайте slice и at'),
          text: L(
            'slice and at behave predictably with negative indexes and never reorder their arguments, which removes both classic string bugs. Keep substring only when you are porting old code.',
            'slice и at предсказуемо работают с отрицательными индексами и никогда не меняют порядок аргументов, что снимает сразу две классические строковые ошибки. Оставляйте substring только при переносе старого кода.'
          ),
        },
      ],
      takeaway: L(
        'Prefer slice over substring, and remember that replace touches only the first match unless you pass a global regular expression.',
        'Предпочитайте slice вместо substring и помните, что replace затрагивает только первое совпадение, если не передать глобальное регулярное выражение.'
      ),
      seeAlso: [
        L('Section 9-4: regular expression syntax and flags', 'Секция 9-4: синтаксис регулярных выражений и флаги'),
        L('Section 9-6: parsing with split, match and replace', 'Секция 9-6: разбор через split, match и replace'),
        L('Chapter 7: arrays and the join side of the story', 'Глава 7: массивы и обратная сторона join'),
      ],
    },
    {
      id: 'js-core-ch9-s4',
      title: L('Regular expression syntax and flags', 'Синтаксис регулярных выражений и флаги'),
      body: L(
        'A regular expression is an object, and it is created either by a literal such as /\\d+/g or by the constructor new RegExp(pattern, flags). The literal form is compiled when the source is parsed, which makes it faster and easier to read, but the pattern has to be written without string escaping. The constructor takes strings, so every backslash has to be doubled, and that is where most escaping bugs are born.\n\nThe syntax has three layers. Character classes describe one character: [a-z] is a range, [^a-z] is everything except the range, and the shorthands \\d, \\w and \\s cover digits, word characters and whitespace, with \\D, \\W and \\S as their negations. Quantifiers say how many times: * means zero or more, + one or more, ? zero or one, and {n,m} an explicit range. By default a quantifier is greedy, and a trailing ? makes it lazy.\n\nAnchors describe a position: ^ matches the start of the input, $ the end. Without the m flag they refer to the whole string, and the m flag turns them into line anchors. The dot matches any character except line terminators, and the s flag changes that. The pipe introduces alternatives, parentheses group them, and the non-capturing group (?:...) groups without capturing.\n\nThe flags change how the engine reads the pattern: g for every match, i to ignore case, m for multiline anchors, s for dotAll, u for full Unicode handling and y for sticky matching that only looks at lastIndex. A global regular expression keeps a lastIndex between calls, so the same object can give a different answer on the second call. That statefulness is why many libraries clone the pattern or reset lastIndex before every use.',
        'Регулярное выражение — это объект, и создаётся он либо литералом вида /\\d+/g, либо конструктором new RegExp(pattern, flags). Литеральная форма компилируется ещё при разборе исходника, поэтому она быстрее и читается лучше, но паттерн в ней пишется без экранирования строки. Конструктор принимает строки, поэтому каждый обратный слэш приходится удваивать — здесь рождается большинство ошибок с экранированием.\n\nСинтаксис состоит из трёх слоёв. Классы символов описывают один символ: [a-z] — диапазон, [^a-z] — всё, кроме диапазона, а сокращения \\d, \\w и \\s покрывают цифры, символы слова и пробельные символы, причём \\D, \\W и \\S — их отрицания. Кванторы говорят, сколько раз: * — ноль или больше, + — один или больше, ? — ноль или один, а {n,m} — явный диапазон. По умолчанию квантор жадный, а хвостовой ? делает его ленивым.\n\nЯкоря описывают позицию: ^ соответствует началу ввода, $ — концу. Без флага m они относятся ко всей строке, а флаг m превращает их в якоря строк. Точка соответствует любому символу, кроме конца строки, и флаг s это меняет. Вертикальная черта вводит альтернативы, скобки группируют их, а группа без захвата (?:...) группирует, ничего не запоминая.\n\nФлаги меняют то, как движок читает паттерн: g — все совпадения, i — игнорировать регистр, m — многострочные якоря, s — dotAll, u — полная работа с Unicode, y — липкое совпадение только по lastIndex. Глобальное регулярное выражение хранит lastIndex между вызовами, поэтому один и тот же объект во второй раз может дать другой ответ. Именно из-за этого библиотеки клонируют паттерн или сбрасывают lastIndex перед каждым использованием.'
      ),
      bullets: [
        L('A literal is compiled at parse time, new RegExp takes strings.', 'Литерал компилируется при разборе, new RegExp принимает строки.'),
        L('[a-z] is a range, [^a-z] is its negation.', '[a-z] — диапазон, [^a-z] — его отрицание.'),
        L('\\d, \\w and \\s cover digits, word characters and whitespace.', '\\d, \\w и \\s покрывают цифры, символы слова и пробельные символы.'),
        L('Quantifiers are greedy unless a trailing ? makes them lazy.', 'Кванторы жадные, пока хвостовой ? не сделает их ленивыми.'),
        L('^ and $ anchor the whole input unless the m flag is set.', '^ и $ якорят весь ввод, если не задан флаг m.'),
        L('A global pattern keeps lastIndex between calls.', 'Глобальный паттерн хранит lastIndex между вызовами.'),
      ],
      code: `const digits = /\\d+/g;
digits.test('abc 123');     // true - and lastIndex moves
digits.test('abc 123');     // false - starts from lastIndex
digits.lastIndex = 0;       // reset it

const word = /\\w+/;          // letters, digits, underscore
const space = /\\s+/;         // any whitespace
const upper = /[A-Z]/;       // one uppercase letter
const notUpper = /[^A-Z]/;   // any character except A-Z

/^ab+c$/.test('abbbc');          // true
/^ab+c?$/.test('abc');           // true - ? means zero or one
/^\\d{3}-\\d{2}$/.test('123-45'); // true

const pattern = new RegExp('\\\\d+', 'g');  // a string pattern needs escaping`,
      table: {
        caption: L('Regular expression flags', 'Флаги регулярных выражений'),
        headers: [
          L('Flag', 'Флаг'),
          L('Name', 'Имя'),
          L('Effect', 'Действие'),
        ],
        rows: [
          [L('g', 'g'), L('global', 'global'), L('finds every match, not just the first', 'ищет все совпадения, а не только первое')],
          [L('i', 'i'), L('ignoreCase', 'ignoreCase'), L('case-insensitive matching', 'сопоставление без учёта регистра')],
          [L('m', 'm'), L('multiline', 'multiline'), L('^ and $ match at line boundaries', '^ и $ срабатывают на границах строк')],
          [L('s', 's'), L('dotAll', 'dotAll'), L('the dot matches line terminators too', 'точка соответствует и концу строки')],
          [L('u', 'u'), L('unicode', 'unicode'), L('full code point handling', 'полная работа с кодовыми точками')],
          [L('y', 'y'), L('sticky', 'sticky'), L('matches only at lastIndex', 'совпадает только по lastIndex')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A global pattern is stateful', 'Глобальный паттерн хранит состояние'),
          text: L(
            'The same object with the g flag gives different answers on consecutive calls, because lastIndex moved after the first match. A shared regex constant used by two functions can therefore skip a match or match twice. Reset lastIndex or create the pattern inside the function.',
            'Один и тот же объект с флагом g даёт разные ответы на последовательных вызовах, потому что после первого совпадения сдвинулся lastIndex. Общая константа с регулярным выражением, используемая двумя функциями, может то пропустить совпадение, то сработать дважды. Сбрасывайте lastIndex или создавайте паттерн внутри функции.'
          ),
        },
        {
          tone: 'tip',
          title: L('Add the u flag for user text', 'Добавляйте флаг u для пользовательского текста'),
          text: L(
            'Without the u flag a pattern sees code units, so a single emoji is two separate characters for the engine. With it, the pattern works on code points and escapes are stricter, which turns a silent mismatch into a clear error.',
            'Без флага u паттерн видит кодовые единицы, и один эмодзи для движка — это два отдельных символа. С флагом паттерн работает с кодовыми точками, а экранирование становится строже, и тихое несовпадение превращается в явную ошибку.'
          ),
        },
      ],
      takeaway: L(
        'Prefer the literal form with the u flag, and never reuse a global regular expression without resetting lastIndex.',
        'Предпочитайте литеральную форму с флагом u и никогда не переиспользуйте глобальное регулярное выражение, не сбросив lastIndex.'
      ),
      seeAlso: [
        L('Section 9-5: groups, lookaround and named groups', 'Секция 9-5: группы, обзор и именованные группы'),
        L('Section 9-6: parsing in practice', 'Секция 9-6: разбор на практике'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch9-s5',
      title: L('Groups, lookaround and named groups', 'Группы, обзор и именованные группы'),
      body: L(
        'Parentheses capture. The text matched by the first group is available as group 1 in a match result and as $1 in a replacement, the second group as group 2 and $2, and so on. A group that did not take part in the match is undefined rather than an empty string, so a check has to be written with a guard instead of a truthiness test on the captured text.\n\nNamed groups give the same captures a readable name: (?<year>\\d{4}) stores its text in match.groups.year and can be reused in a replacement as $<year>. Inside the pattern a named group is referenced by a backreference \\k<year>. Named groups keep a long pattern comprehensible, and they are the reason to prefer them over numbered groups in anything that somebody else will maintain.\n\nLookaround asserts without consuming the text. The lookahead (?=...) requires what follows, the negative lookahead (?!...) forbids it, the lookbehind (?<=...) inspects what precedes and (?<!...) forbids that. Because the characters are only inspected and not consumed, a lookbehind lets you match a price without the currency symbol, and a lookahead lets you check what comes next without swallowing it. All four are supported in every current engine.\n\nQuantifiers decide how much a pattern takes. A greedy quantifier grabs as much as it can and gives back what it must, while a lazy one stops at the first position that works. For the text <b>bold</b> the pattern <.+> takes the whole line and the pattern <.+?> takes only the first tag. A pattern that has outgrown a single readable line is usually better split into two named groups or replaced by a small parser, because a regular expression is code nobody can step through with a debugger.',
        'Скобки захватывают. Текст, совпавший с первой группой, доступен как группа 1 в результате матча и как $1 в замене, вторая группа — как группа 2 и $2, и так далее. Группа, которая не участвовала в совпадении, равна undefined, а не пустой строке, поэтому проверку приходится писать с защитой, а не через проверку истинности захваченного текста.\n\nИменованные группы дают тем же захватам читаемое имя: (?<year>\\d{4}) сохраняет свой текст в match.groups.year и может быть использована в замене как $<year>. Внутри паттерна именованная группа ссылается обратной ссылкой \\k<year>. Именованные группы делают длинный паттерн понятным и служат причиной предпочесть их нумерованным группам во всём, что потом будет поддерживать кто-то другой.\n\nОбзор проверяет, ничего не потребляя. Опережающий обзор (?=...) требует того, что идёт дальше, неопережающий (?!...) это запрещает, ретроспективный (?<=...) смотрит на то, что предшествует, а (?<!...) это запрещает. Поскольку символы только проверяются и не поглощаются, ретроспективный обзор позволяет найти цену без знака валюты, а опережающий — проверить, что идёт дальше, не съедая это. Все четыре поддерживаются во всех современных движках.\n\nКванторы решают, сколько паттерн забирает. Жадный квантор хватает как можно больше и потом отдаёт лишнее, а ленивый останавливается на первой подходящей позиции. Для текста <b>bold</b> паттерн <.+> заберёт всю строку, а паттерн <.+?> — только первый тег. Паттерн, который перерос одну читаемую строку, обычно лучше разбить на две именованные группы или заменить небольшим парсером, потому что регулярное выражение — это код, по которому невозможно пройти отладчиком.'
      ),
      bullets: [
        L('Capturing groups are numbered from 1 and become $1 in a replacement.', 'Группы захвата нумеруются с единицы и становятся $1 в замене.'),
        L('A group that did not match is undefined, not an empty string.', 'Группа, не участвовавшая в совпадении, равна undefined, а не пустой строке.'),
        L('A named group (?<name>...) is read through match.groups.name.', 'Именованная группа (?<name>...) читается через match.groups.name.'),
        L('A backreference to a named group is written \\k<name>.', 'Обратная ссылка на именованную группу записывается \\k<name>.'),
        L('Lookaround asserts without consuming the matched text.', 'Обзор проверяет условие, не поглотая совпавший текст.'),
        L('A greedy quantifier takes as much as it can, a lazy one as little.', 'Жадный квантор берёт максимум, ленивый — минимум.'),
      ],
      code: `const date = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = '2024-01-31'.match(date);
console.log(match[1], match[2], match[3]);   // 2024 01 31
const named = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const m = '2024-01-31'.match(named);
console.log(m.groups.year);        // '2024'
// optional groups are undefined when they do not match
const opt = /(\\w+)(?:\\s(\\w+))?/.exec('hello');
console.log(opt[2]);                // undefined
// lookaround asserts without consuming the text
'Total: $42 USD'.match(/\\$\\d+(?= USD)/)[0];   // '$42'
'no digits here'.match(/\\d+(?!x)/);          // null
/(?<=\\$)\\d+/.exec('$42')[0];       // '42' - lookbehind
// greedy takes as much as possible, lazy as little as possible
'<a><b>'.match(/<.+>/)[0];        // '<a><b>'
'<a><b>'.match(/<.+?>/)[0];       // '<a>'
// a backreference repeats the captured text
/(\\w)\\1/.test('aa');               // true`,
      table: {
        caption: L('Group syntax', 'Синтаксис групп'),
        headers: [
          L('Syntax', 'Синтаксис'),
          L('Name', 'Название'),
          L('Captures', 'Захватывает'),
          L('Used for', 'Для чего'),
        ],
        rows: [
          [L('(...)', '(...)'), L('capturing group', 'группа захвата'), L('yes', 'да'), L('extracting parts of a match', 'извлечение частей совпадения')],
          [L('(?:...)', '(?:...)'), L('non-capturing group', 'группа без захвата'), L('no', 'нет'), L('grouping alternatives only', 'только группировка альтернатив')],
          [L('(?<name>...)', '(?<name>...)'), L('named group', 'именованная группа'), L('yes', 'да'), L('readable access through groups', 'читаемый доступ через groups')],
          [L('(?=...)', '(?=...)'), L('lookahead', 'опережающий обзор'), L('no', 'нет'), L('assert what follows', 'проверить, что идёт дальше')],
          [L('(?!...)', '(?!...)'), L('negative lookahead', 'неопережающий обзор'), L('no', 'нет'), L('assert what does not follow', 'проверить, что не идёт дальше')],
          [L('(?<=...)', '(?<=...)'), L('lookbehind', 'ретроспективный обзор'), L('no', 'нет'), L('assert what precedes', 'проверить, что предшествует')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Greedy quantifiers eat too much', 'Жадные кванторы съедают лишнее'),
          text: L(
            'A greedy .+ runs to the end of the line and then gives back only what the rest of the pattern forces it to. When the pattern should stop at the first delimiter, write the lazy form .+? or make the delimiter part of the pattern, which is faster and clearer than a lazy quantifier.',
            'Жадный .+ бежит до конца строки и потом отдаёт только то, что заставит его вернуть остаток паттерна. Если паттерн должен останавливаться на первом разделителе, напишите ленивую форму .+? или включите разделитель в сам паттерн — это и быстрее, и понятнее ленивого квантора.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name your groups', 'Называйте группы'),
          text: L(
            'Named groups turn match[2] into match.groups.year, which survives editing the pattern far better than a number does. They also make a replacement readable, because $<year> says what it is without a lookup table.',
            'Именованные группы превращают match[2] в match.groups.year, и это переживает правку паттерна гораздо лучше, чем номер. Замена тоже становится читаемой: $<year> сразу говорит, что это, без таблицы соответствий.'
          ),
        },
      ],
      takeaway: L(
        'Prefer named groups and lookaround over nested captures, and switch to a lazy quantifier when a greedy one eats the whole line.',
        'Предпочитайте именованные группы и обзор вложенным захватам и переходите на ленивый квантор, когда жадный съедает всю строку.'
      ),
      seeAlso: [
        L('Section 9-4: regular expression syntax and flags', 'Секция 9-4: синтаксис регулярных выражений и флаги'),
        L('Section 9-6: parsing in practice', 'Секция 9-6: разбор на практике'),
        L('Chapter 12: when a regular expression is the wrong tool', 'Глава 12: когда регулярное выражение — не тот инструмент'),
      ],
    },
    {
      id: 'js-core-ch9-s6',
      title: L('Parsing in practice: split, match and replace', 'Разбор на практике: split, match и replace'),
      body: L(
        'split is the simplest tool and the most abused. With a string separator it returns the parts without the separator, and the optional limit keeps the remainder of the string in the last element, which is exactly what you want for a first line only or a host and path split. With a regular expression it splits on a pattern, and a capturing group in the pattern stays in the result, so "a=b" split on /(\\w)=/ gives ["a", "=", "b"].\n\nmatch and matchAll answer the opposite question. match returns the first match with its groups, or an array of all matches when the pattern has the g flag, but then the groups are lost. matchAll returns an iterator over every match with the groups intact, and it refuses to work without the g flag. exec gives one match at a time and moves lastIndex on a global pattern, which is why the classic loop looks the way it does.\n\nreplace is the rewriting tool, and it takes either a replacement string or a function. The function form receives the match, the groups, the offset and the original string, so a date can be rearranged and a number can be formatted without manual string surgery. For a record format such as a log line or a CSV row a regular expression with named groups is often enough, but a real CSV parser is required as soon as quoted fields contain separators.\n\nValidation is where regular expressions are abused the most. A pattern that checks an email is either too strict, rejecting valid addresses, or too loose, accepting values that are not addresses at all; the correct check is a message plus a confirmation email. And JSON must never be parsed with a regular expression: use JSON.parse inside a try and catch, because it throws on malformed input and returns a plain object on success.',
        'split — самый простой инструмент и самый злоупотребляемый. Со строковым разделителем он возвращает части без самого разделителя, а необязательный лимит оставляет остаток строки в последнем элементе — именно это и нужно для «только первая строка» или для разделения на хост и путь. С регулярным выражением он режет по паттерну, и группа захвата в паттерне остаётся в результате, поэтому "a=b" split по /(\\w)=/ даёт ["a", "=", "b"].\n\nmatch и matchAll отвечают на противоположный вопрос. match возвращает первое совпадение с группами или массив всех совпадений, если у паттерна есть флаг g, но тогда группы теряются. matchAll возвращает итератор по всем совпадениям с нетронутыми группами и отказывается работать без флага g. exec даёт по одному совпадению за раз и двигает lastIndex у глобального паттерна — поэтому классический цикл выглядит именно так.\n\nreplace — инструмент переписывания, и он принимает либо строку-замену, либо функцию. Функциональная форма получает совпадение, группы, смещение и исходную строку, поэтому дату можно переставить, а число — отформатировать без ручной работы со строкой. Для формата записи вроде строки лога или строки CSV регулярного выражения с именованными группами часто хватает, но настоящий CSV-парсер нужен, как только в кавычках появляются разделители.\n\nВалидация — место, где регулярные выражения злоупотребляются сильнее всего. Паттерн проверки email либо слишком строг и отвергает корректные адреса, либо слишком мягок и пропускает значения, которые адресами не являются; правильная проверка — это сообщение плюс подтверждение на почту. И JSON в разборе регулярным выражением недопустим: используйте JSON.parse внутри try и catch, потому что он бросает исключение на некорректном вводе и возвращает обычный объект при успехе.'
      ),
      bullets: [
        L('split keeps the remainder in the last part when a limit is given.', 'split с лимитом оставляет остаток в последней части.'),
        L('A capturing group in the separator stays in the split result.', 'Группа захвата в разделителе остаётся в результате split.'),
        L('matchAll returns an iterator and requires the g flag.', 'matchAll возвращает итератор и требует флаг g.'),
        L('exec advances lastIndex on a global pattern.', 'exec двигает lastIndex у глобального паттерна.'),
        L('A function replacer gets the match, the groups and the offset.', 'Функция-заменитель получает совпадение, группы и смещение.'),
        L('JSON.parse throws on malformed input and needs try and catch.', 'JSON.parse бросает исключение на некорректном вводе и требует try и catch.'),
      ],
      code: `const csv = 'id,name\\n1,Ada';
console.log(csv.split('\\n')[0].split(','));   // ['id', 'name']
// split accepts a regular expression as the separator
'2024-01-31 12:00'.split(/[-T: ]/);         // ['2024','01','31','12','00']
// matchAll walks over every match and keeps the groups
const email = /(\\w+)@(\\w+)/g;
console.log([...'a@b c@d'.matchAll(email)].map((m) => m[1]));   // ['a','c']
// exec drives a global regex through the text
const digits = /\\d+/g;
let m;
while ((m = digits.exec('a1 b22')) !== null) {
  console.log(m[0]);                          // 1, 22
}
// replace with a function replacer
'2024-01-31'.replace(/(\\d+)-(\\d+)-(\\d+)/, (s, y, mo, d) => d + '/' + mo + '/' + y);
// JSON.parse throws on malformed input
try {
  console.log(JSON.parse('{"ok": true}').ok);  // true
} catch (error) {
  console.log('invalid JSON');
}`,
      table: {
        caption: L('match, matchAll, exec and replace', 'match, matchAll, exec и replace'),
        headers: [
          L('Method', 'Метод'),
          L('Returns', 'Возвращает'),
          L('Groups kept', 'Группы сохранены'),
          L('Needs the g flag', 'Нужен флаг g'),
        ],
        rows: [
          [L('match(re)', 'match(re)'), L('the first match, or all matches', 'первое совпадение или все'), L('yes for the first match', 'да для первого совпадения'), L('only to get a plain list', 'только ради простого списка')],
          [L('matchAll(re)', 'matchAll(re)'), L('an iterator of matches', 'итератор по совпадениям'), L('yes', 'да'), L('yes, it throws without it', 'да, без него бросает')],
          [L('exec(re)', 'exec(re)'), L('one match object', 'один объект совпадения'), L('yes', 'да'), L('no, but lastIndex moves', 'нет, но lastIndex двигается')],
          [L('replace(re, fn)', 'replace(re, fn)'), L('a new string', 'новая строка'), L('passed to the function', 'передаются в функцию'), L('no', 'нет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('matchAll needs the g flag', 'matchAll требует флаг g'),
          text: L(
            'matchAll throws a TypeError when the pattern has no g flag, because there is no well-defined list of matches to walk. Add the flag instead of working around the error.',
            'matchAll бросает TypeError, если у паттерна нет флага g: нет однозначного списка совпадений, по которому можно идти. Добавьте флаг, а не обходите ошибку.'
          ),
        },
        {
          tone: 'warning',
          title: L('A regex is a poor email validator', 'Регулярное выражение — плохой валидатор email'),
          text: L(
            'The address formats accepted by mail servers are so varied that no reasonable pattern catches all of them, and most patterns that try also accept strings that are not addresses. Send a confirmation email and treat the pattern as a hint for the input, not as a gate.',
            'Форматы адресов, которые принимают почтовые серверы, настолько разнообразны, что никакое разумное выражение их не покроет, а большинство попыток ещё и пропускают то, что адресами не является. Отправляйте письмо с подтверждением и относитесь к паттерну как к подсказке для ввода, а не как к фильтру.'
          ),
        },
      ],
      takeaway: L(
        'Use split for plain separators, matchAll for every match with its groups, and always wrap JSON.parse in try and catch.',
        'Используйте split для простых разделителей, matchAll — для всех совпадений с группами, а JSON.parse всегда оборачивайте в try и catch.'
      ),
      seeAlso: [
        L('Section 9-5: groups, lookaround and named groups', 'Секция 9-5: группы, обзор и именованные группы'),
        L('Section 9-4: flags and the lastIndex state', 'Секция 9-4: флаги и состояние lastIndex'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
  ],
};
