import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh02: Chapter = {
  id: 'js-core-ch2',
  title: L('Operators and control flow', 'Операторы и управление потоком'),
  summary: L(
    'How JavaScript operators convert their operands, what the plus sign really does, how short-circuit evaluation works, and how to branch with if, the conditional operator and switch.',
    'Как операторы JavaScript приводят своих операндов, что на самом деле делает плюс, как работает короткое замыкание и как ветвить код через if, тернарный оператор и switch.'
  ),
  sections: [
    {
      id: 'js-core-ch2-s1',
      title: L('Arithmetic operators and the plus trap', 'Арифметические операторы и ловушка плюса'),
      body: L(
        'Every arithmetic operator in JavaScript converts its operands to numbers first, and the binary plus is the only one that can also produce a string. Addition, subtraction, multiplication, division and remainder work on numbers only. The remainder operator % does not return a fraction: 7 % 3 is 1, and -7 % 3 is -1, because the sign of the result follows the dividend and not the divisor. Division always produces a floating point number, so 6 / 2 is 3 with no separate integer type.\n\nDividing by zero does not throw an error. 1 / 0 is Infinity, -1 / 0 is -Infinity and 0 / 0 is NaN, because the specification defines these as the result of the operation rather than as a failure. The remainder behaves the same way, so 5 % 0 is NaN. A NaN result spreads silently through the rest of the expression, and the only way to notice it is to test it with Number.isNaN, which means a numeric bug can hide inside a long computation for a very long time.\n\nThe reason 0.1 + 0.2 is not 0.3 is binary representation, not the plus operator. Both decimals are stored as binary approximations, and their sum lands on the nearest representable double, 0.30000000000000004. Comparing floats with === is therefore a category error, and the fix is a tolerance scaled to the size of the numbers rather than an exact comparison.\n\nThe plus operator has two jobs. With two numbers it adds, and with a string anywhere on the left it concatenates. That makes it the only arithmetic operator whose meaning depends on the types of its operands, and it is the reason "5" + 3 is "53" while "5" - 3 is 2. Parentheses fix both problems: they state the order of evaluation and they state the intent when the intent is a number and not a string.',
        'Любой арифметический оператор в JavaScript сначала приводит операнды к числам, и только бинарный плюс способен дополнительно дать строку. Сложение, вычитание, умножение, деление и остаток работают только с числами. Оператор остатка % не возвращает дробь: 7 % 3 равно 1, а -7 % 3 равно -1, потому что знак результата берётся от делимого, а не от делителя. Деление всегда даёт вещественное число, поэтому 6 / 2 равно 3, а отдельного целочисленного типа нет.\n\nДеление на ноль не выбрасывает ошибку. 1 / 0 равно Infinity, -1 / 0 равно -Infinity, а 0 / 0 равно NaN, потому что спецификация определяет эти значения как результат операции, а не как сбой. Остаток ведёт себя так же, поэтому 5 % 0 равно NaN. Результат NaN молча распространяется дальше по выражению, и единственный способ его заметить — проверить значение через Number.isNaN, а значит, числовой баг может прятаться внутри длинного вычисления очень долго.\n\nПричина того, что 0.1 + 0.2 не равно 0.3, — двоичное представление, а не сам оператор плюс. Обе десятичные дроби хранятся как двоичные приближения, и их сумма попадает на ближайшее представимое double, то есть на 0.30000000000000004. Поэтому сравнивать вещественные числа через === — ошибка категории, и правильное решение — допуск, рассчитанный от масштаба чисел, а не точное сравнение.\n\nУ оператора плюс две работы. С двумя числами он складывает, а при наличии строки слева — конкатенирует. Это делает его единственным арифметическим оператором, смысл которого зависит от типов операндов, и именно поэтому "5" + 3 даёт "53", а "5" - 3 даёт 2. Скобки решают обе задачи: они задают порядок вычисления и они же выражают намерение, когда намерение — получить число, а не строку.'
      ),
      bullets: [
        L('The operators + - * / % are arithmetic, and + alone can also concatenate.', 'Операторы + - * / % арифметические, и только + умеет ещё и конкатенировать.'),
        L('The remainder % keeps the sign of the dividend: -7 % 3 is -1.', 'Остаток % сохраняет знак делимого: -7 % 3 равно -1.'),
        L('1 / 0 is Infinity, 0 / 0 is NaN and 5 % 0 is NaN.', '1 / 0 равно Infinity, 0 / 0 равно NaN и 5 % 0 равно NaN.'),
        L('Division always produces a float, so 7 / 2 is 3.5.', 'Деление всегда даёт вещественное число, поэтому 7 / 2 равно 3.5.'),
        L('0.1 + 0.2 === 0.3 is false, so floats need a tolerance.', '0.1 + 0.2 === 0.3 ложно, поэтому вещественным числам нужен допуск.'),
        L('Parentheses both group the operations and state your intent.', 'Скобки одновременно группируют операции и выражают намерение.'),
      ],
      code: `const a = 7, b = 3;
a + b;        // 10
a - b;        // 4
a * b;        // 21
a / b;        // 2.3333333333333335
a % b;        // 1

(-7) % 3;     // -1 - the sign follows the dividend
7 % (-3);     // 1

1 / 0;        // Infinity
-1 / 0;       // -Infinity
0 / 0;        // NaN
5 % 0;        // NaN

0.1 + 0.2;    // 0.30000000000000004
Math.abs(0.1 + 0.2 - 0.3) < 1e-9; // true

'5' + 3;      // '53' - concatenation
'5' - 3;      // 2      - numeric coercion
Number('5') + 3; // 8  - explicit intent`,
      table: {
        caption: L('Arithmetic operators at a glance', 'Арифметические операторы кратко'),
        headers: [L('Operator', 'Оператор'), L('Meaning', 'Смысл'), L('Example', 'Пример'), L('Result', 'Результат')],
        rows: [
          [L('+', '+'), L('Addition', 'Сложение'), L('2 + 3', '2 + 3'), L('5', '5')],
          [L('-', '-'), L('Subtraction', 'Вычитание'), L('5 - 3', '5 - 3'), L('2', '2')],
          [L('*', '*'), L('Multiplication', 'Умножение'), L('2 * 3', '2 * 3'), L('6', '6')],
          [L('/', '/'), L('Division, always a float', 'Деление, всегда вещественное'), L('7 / 2', '7 / 2'), L('3.5', '3.5')],
          [L('%', '%'), L('Remainder, sign of the dividend', 'Остаток, знак делимого'), L('-7 % 3', '-7 % 3'), L('-1', '-1')],
          [L('+ with a string', '+ со строкой'), L('Concatenation', 'Конкатенация'), L("'5' + 3", "'5' + 3"), L("'53'", "'53'")],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The plus that changes meaning', 'Плюс, который меняет смысл'),
          text: L(
            'The string "5" plus the number 3 is the string "53", not the number 8. Subtraction never concatenates, so the same-looking code can produce two different types. Convert explicitly with Number(value) whenever a number is what you mean.',
            'Строка "5" плюс число 3 даёт строку "53", а не число 8. Вычитание никогда не конкатенирует, поэтому почти одинаковый код может дать два разных типа. Приводите явно через Number(value), когда имеется в виду именно число.'
          ),
        },
        {
          tone: 'warning',
          title: L('Infinity and NaN do not shout', 'Infinity и NaN не кричат'),
          text: L(
            'A division by zero produces a value instead of an error, so a broken calculation keeps running and hands a wrong number to the next layer. Guard the boundaries with Number.isFinite(result) and Number.isNaN(result).',
            'Деление на ноль даёт значение вместо ошибки, поэтому сломанный расчёт продолжает работать и передаёт неверное число дальше. Проверяйте границы через Number.isFinite(result) и Number.isNaN(result).'
          ),
        },
      ],
      takeaway: L(
        'Convert operands explicitly with Number(), never compare floats with ===, and remember that the plus sign concatenates as soon as a string is involved.',
        'Приводите операнды явно через Number(), не сравнивайте вещественные числа через === и помните, что плюс конкатенирует, как только в выражении появляется строка.'
      ),
      seeAlso: [
        L('Chapter 1: how values are coerced before an operator sees them', 'Глава 1: как значения приводятся к типам до того, как оператор их увидит'),
        L('Section 1-5: number precision, safe integers and money', 'Секция 1-5: точность чисел, безопасные целые и деньги'),
        L('Chapter 10: numbers, math, dates and Intl', 'Глава 10: числа, математика, даты и Intl'),
      ],
    },
    {
      id: 'js-core-ch2-s2',
      title: L('Increment, decrement and compound assignment', 'Инкремент, декремент и составное присваивание'),
      body: L(
        'The increment and decrement operators change a variable by one and return either the old or the new value depending on where they stand. In prefix form ++count, the change happens first and the expression produces the new value. In postfix form count++, the expression evaluates to the old value and the change happens afterwards. The difference is visible only when the value of the expression is used, because in both cases the variable itself ends up holding the incremented number.\n\nA compound assignment combines an operation and an assignment into one step. The form count += 2 is not a shorthand for count = count + 2 in the general case: it reads the current value, applies the operator and writes the result back, so an object property is read once and written once. With getters, setters or a Proxy, that difference is directly observable.\n\nThe unary plus is a conversion operator rather than arithmetic. Applying it converts its operand to a number using the same rules as Number(value), so +"42" is 42, +"" is 0 and +true is 1. The unary minus negates a number and converts as well, so -"42" is -42. Since the plus sign already carries two meanings, writing Number(value) is often clearer than the unary form.\n\nThe increment operators coerce their operand to a number before doing anything, so "41"++ produces the number 42 and "abc"++ produces NaN. The variable changes type in both cases, which means a counter that starts life as a string quietly becomes numeric after the first tick. The predictable rule is simple: use ++ and -- only on variables that already hold numbers, and prefer += 1 when the previous value is needed.',
        'Операторы инкремента и декремента меняют переменную на единицу и возвращают либо старое, либо новое значение — в зависимости от того, с какой стороны стоят. В префиксной форме ++count изменение происходит сначала, и выражение даёт новое значение. В постфиксной форме count++ выражение вычисляется в старое значение, а изменение происходит после. Разница видна только тогда, когда значение выражения используется, потому что в обоих случаях сама переменная в итоге содержит увеличенное число.\n\nСоставное присваивание объединяет операцию и присваивание в один шаг. Форма count += 2 — это не сокращение для count = count + 2 вообще: она читает текущее значение, применяет оператор и записывает результат обратно, поэтому свойство объекта читается один раз и записывается один раз. С геттерами, сеттерами или Proxy эта разница наблюдается напрямую.\n\nУнарный плюс — это оператор приведения, а не арифметика. Применённый к операнду, он превращает его в число по тем же правилам, что и Number(value), поэтому +"42" равно 42, +"" равно 0, а +true равно 1. Унарный минус меняет знак числа и тоже выполняет приведение, поэтому -"42" равно -42. Поскольку плюс уже несёт два смысла, запись Number(value) часто понятнее унарной формы.\n\nОператоры инкремента сначала приводят операнд к числу, поэтому "41"++ даёт число 42, а "abc"++ даёт NaN. Переменная меняет тип в обоих случаях, то есть счётчик, начавшийся со строки, после первого тика незаметно становится числовым. Предсказуемое правило простое: используйте ++ и -- только с переменными, которые уже хранят числа, а когда нужно старое значение, пишите += 1.'
      ),
      bullets: [
        L('Prefix ++ changes the value before the expression reads it, postfix reads it first.', 'Префиксный ++ меняет значение до того, как выражение его прочитает, постфиксный читает сначала.'),
        L('Both forms leave the variable incremented, only the expression result differs.', 'В обеих формах переменная увеличена, различается только результат выражения.'),
        L('count += 2 reads the current value once and writes it back once.', 'count += 2 один раз читает текущее значение и один раз записывает результат.'),
        L('+value converts to a number exactly like Number(value).', '+value приводит к числу точно так же, как Number(value).'),
        L('"41"++ yields the number 42 and "abc"++ yields NaN.', '"41"++ даёт число 42, а "abc"++ даёт NaN.'),
        L('Use += 1 when you need the previous value of the variable.', 'Пишите += 1, когда нужно предыдущее значение переменной.'),
      ],
      code: `let count = 1;
const before = count++;   // 1 - the old value
console.log(count);       // 2 - already incremented

let total = 1;
const after = ++total;    // 2 - the new value

let score = 10;
score += 5;   // 15
score -= 3;   // 12
score *= 2;   // 24
score /= 4;   // 6
score %= 4;   // 2

+'42';        // 42   - the same as Number('42')
+'';          // 0
+true;        // 1
-'42';        // -42

let digits = '41';
digits++;     // 42 - the variable now holds a number`,
      table: {
        caption: L('Prefix and postfix in one expression', 'Префикс и постфикс в одном выражении'),
        headers: [L('Code', 'Код'), L('Value of the expression', 'Значение выражения'), L('count afterwards', 'count после')],
        rows: [
          [L('let c = 1; c++', 'let c = 1; c++'), L('1', '1'), L('2', '2')],
          [L('let c = 1; ++c', 'let c = 1; ++c'), L('2', '2'), L('2', '2')],
          [L('let c = 1; const x = c++', 'let c = 1; const x = c++'), L('x is 1', 'x равно 1'), L('2', '2')],
          [L('let c = 1; const x = ++c', 'let c = 1; const x = ++c'), L('x is 2', 'x равно 2'), L('2', '2')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Increment inside a bigger expression', 'Инкремент внутри большого выражения'),
          text: L(
            'Prefix and postfix stop being cosmetic once the value is used. In a line such as list[i++] = list[i] the index is read before the increment happens, and the assignment lands in the wrong slot. When you need the previous value, take it into a named variable first.',
            'Префикс и постфикс перестают быть косметикой, как только значение используется. В строке вида list[i++] = list[i] индекс читается до инкремента, и присваивание попадает не в тот элемент. Когда нужно предыдущее значение, сначала заберите его в отдельную переменную.'
          ),
        },
        {
          tone: 'warning',
          title: L('Incrementing changes the type', 'Инкремент меняет тип'),
          text: L(
            'Because the operand is coerced to a number first, incrementing a string replaces it with a number. A counter that can ever receive a string silently loses its type, and the code that reads it later has to cope with two kinds of value.',
            'Поскольку операнд сначала приводится к числу, инкремент строки заменяет её числом. Счётчик, который хоть раз может получить строку, молча теряет тип, и читающий его код потом вынужден работать с двумя видами значений.'
          ),
        },
      ],
      takeaway: L(
        'Use ++ and -- only on numeric variables, and prefer += 1 whenever you need the previous value.',
        'Используйте ++ и -- только с числовыми переменными, а когда нужно предыдущее значение, пишите += 1.'
      ),
      seeAlso: [
        L('Section 2-1: how the plus sign doubles as concatenation', 'Секция 2-1: как плюс работает ещё и как конкатенация'),
        L('Section 1-3: the eight falsy values', 'Секция 1-3: восемь ложных значений'),
        L('Chapter 3: var, let and const, and the scope of a declaration', 'Глава 3: var, let и const, и область действия объявления'),
      ],
    },
    {
      id: 'js-core-ch2-s3',
      title: L('Logical operators and short-circuit evaluation', 'Логические операторы и короткое замыкание'),
      body: L(
        'The three logical operators work on truthiness but they do not return booleans. The && operator returns its left operand when that operand is falsy and its right operand otherwise. The || operator returns its left operand when it is truthy and its right operand otherwise. The ! operator is the exception: it returns a real boolean, the negation of the truthiness of its operand. Because the first two pass values through, count || "none" yields the string "none" when count is zero.\n\nShort-circuit evaluation is what makes these operators useful for more than merging values. In an && chain the right side is not evaluated at all when the left side is falsy, and in an || chain the right side is skipped when the left side is truthy. That is what lets a guard check one condition and evaluate the expensive or the dangerous part only afterwards: user && user.profile && renderProfile(user.profile) never touches profile when user is missing.\n\nThe precedence order is && before || before the conditional operator, with the assignment operators last. That means a && b || c is parsed as (a && b) || c, which is usually what the author meant, while a || b && c is parsed as a || (b && c), which often is not. Mixing the two without parentheses is the most common source of logic bugs in this area, because the code reads from left to right while the engine groups by precedence.\n\nThe same precedence is why the nullish coalescing operator cannot be mixed with || and && without parentheses: the language reports a SyntaxError instead of guessing. That restriction exists precisely because the relative precedence is undefined, so a mixed expression is always a loud error and never a subtle bug.',
        'Три логических оператора работают с истинностью, но не возвращают логические значения. Оператор && возвращает левый операнд, когда тот ложный, и правый во всех остальных случаях. Оператор || возвращает левый операнд, когда он истинный, и правый иначе. Оператор ! — исключение: он возвращает настоящий логический тип, то есть отрицание истинности своего операнда. Поскольку первые два пропускают значение насквозь, count || "none" даёт строку "none", когда count равен нулю.\n\nКороткое замыкание — это то, что делает эти операторы полезными не только для слияния значений. В цепочке с && правая часть вообще не вычисляется, когда левая ложна, а в цепочке с || правая часть пропускается, когда левая истинна. Именно поэтому проверка может сначала убедиться в одном условии, а дорогую или опасную часть вычислить только потом: user && user.profile && renderProfile(user.profile) не трогает profile, когда user отсутствует.\n\nПорядок приоритетов такой: сначала &&, потом ||, потом тернарный оператор, а операторы присваивания — в самом конце. Значит, a && b || c разбирается как (a && b) || c, и это обычно именно то, что хотел автор, а вот a || b && c разбирается как a || (b && c), и часто это не то. Смешивание двух операторов без скобок — самый частый источник логических багов в этой области, потому что код читается слева направо, а движок группирует по приоритету.\n\nПо той же причине оператор нулевого слияния нельзя смешивать с || и && без скобок: язык сообщает об ошибке SyntaxError вместо того, чтобы угадывать. Ограничение существует именно потому, что взаимный приоритет не определён, поэтому смешанное выражение всегда даёт громкую ошибку и никогда — тихий баг.'
      ),
      bullets: [
        L('&& and || return one of their operands, not a boolean.', '&& и || возвращают один из своих операндов, а не логическое значение.'),
        L('! always returns a real boolean.', '! всегда возвращает настоящий логический тип.'),
        L('The right side of && and || runs only when it is needed.', 'Правая часть && и || выполняется только тогда, когда это нужно.'),
        L('&& binds tighter than ||, so a && b || c means (a && b) || c.', '&& приоритетнее ||, поэтому a && b || c читается как (a && b) || c.'),
        L('Convert explicitly with Boolean(value) when you need a real boolean.', 'Приводите явно через Boolean(value), когда нужен настоящий логический тип.'),
      ],
      code: `const count = 0;
const label = count || 'none';   // 'none' - 0 is falsy
const total = count ?? 'none';   // 0     - ?? reacts only to null/undefined

const user = null;
user && user.profile;            // null - the right side never runs
user && user.profile.name;       // null, no TypeError

const config = { retries: 0 };
config.retries > 0 && console.log('retry'); // not printed
config.retries > 3 || console.log('alert'); // printed

!'';      // true
!0;       // true
!'text';  // false

const ready = true && 'yes';   // 'yes'
const flag = Boolean(count);   // false`,
      table: {
        caption: L('How the engine groups an expression', 'Как движок группирует выражение'),
        headers: [L('Operators', 'Операторы'), L('Example', 'Пример'), L('Grouping', 'Группировка')],
        rows: [
          [L('* / %', '* / %'), L('a + b * c', 'a + b * c'), L('a + (b * c)', 'a + (b * c)')],
          [L('+ -', '+ -'), L('a - b - c', 'a - b - c'), L('(a - b) - c', '(a - b) - c')],
          [L('=== !==', '=== !=='), L('a === b === c', 'a === b === c'), L('((a === b) === c)', '((a === b) === c)')],
          [L('&&', '&&'), L('a && b || c', 'a && b || c'), L('(a && b) || c', '(a && b) || c')],
          [L('||', '||'), L('a || b && c', 'a || b && c'), L('a || (b && c)', 'a || (b && c)')],
          [L('? :', '? :'), L('a ? b : c', 'a ? b : c'), L('the lowest of this group', 'самый низкий в этой группе')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A missing pair of parentheses', 'Потерянная пара скобок'),
          text: L(
            'The expression user && user.admin || isGuest groups as (user && user.admin) || isGuest, so a logged-in user without admin rights falls through to the guest branch. Whenever the two operators appear together, write the grouping out even if it looks obvious.',
            'Выражение user && user.admin || isGuest группируется как (user && user.admin) || isGuest, поэтому вошедший пользователь без прав администратора проваливается в гостевую ветку. Когда два оператора стоят рядом, выписывайте группировку явно, даже если она кажется очевидной.'
          ),
        },
        {
          tone: 'tip',
          title: L('Guards should read as guards', 'Проверки должны читаться как проверки'),
          text: L(
            'The pattern x && x.y is a guard: it returns the value when it is present and a falsy value when it is not. Use it inside an if or an assignment, and convert with Boolean() when the result is stored as a flag or sent over the network.',
            'Конструкция x && x.y — это проверка: она возвращает значение, когда оно есть, и ложное значение, когда его нет. Используйте её внутри if или при присваивании и приводите через Boolean(), когда результат сохраняют как флаг или отправляют по сети.'
          ),
        },
      ],
      takeaway: L(
        '&& and || return operands rather than booleans, and every mix of && with || needs explicit parentheses.',
        '&& и || возвращают операнды, а не логические значения, и любое смешивание && с || требует явных скобок.'
      ),
      seeAlso: [
        L('Section 2-4: ?? versus || on null and undefined', 'Секция 2-4: ?? против || на null и undefined'),
        L('Section 1-3: the eight falsy values', 'Секция 1-3: восемь ложных значений'),
        L('Chapter 4: closures, where a captured value becomes a guard', 'Глава 4: замыкания, где захваченное значение становится проверкой'),
      ],
    },
    {
      id: 'js-core-ch2-s4',
      title: L('Optional chaining and nullish coalescing', 'Опциональная цепочка и нулевое слияние'),
      body: L(
        'The optional chaining operator ?. reads a property, calls a function or reads an index without failing when the value on its left is null or undefined. The whole chain stops there and the expression evaluates to undefined. When the left side holds a number, a string or any other value that is neither null nor undefined, the chain behaves exactly like ordinary property access.\n\nOptional chaining is not a universal null check. It protects only the step it is attached to, so user?.profile.name throws when profile is undefined, because the second access has no ?. in front of it. To make a chain safe end to end, every step needs its own ?. — user?.profile?.name — or the parent object has to be checked before the chain starts.\n\nThe nullish coalescing operator ?? returns its right operand only when the left one is null or undefined. This is exactly where it differs from ||, which falls back for every falsy value including zero, an empty string and false. The value of ?? is that a legitimate zero survives: config.retries ?? 3 keeps a configured zero, while the same code with || would replace it with three.\n\nThe language forbids writing a || or a && next to a ?? without parentheses, and the parser reports a SyntaxError instead of guessing. The precedence between ?? and the other two operators is deliberately undefined, so a mixed expression is always an error rather than a subtle bug. The assignment form ??= writes to a variable only when it is null or undefined, which is the shortest way to fill in a default without overwriting an existing zero.',
        'Оператор опциональной цепочки ?. читает свойство, вызывает функцию или обращается к элементу индекса и при этом не падает, если значение слева равно null или undefined. Вся цепочка обрывается в этом месте, и выражение даёт undefined. Когда слева число, строка или любое другое значение, не равное null и undefined, цепочка ведёт себя как обычный доступ к свойству.\n\nОпциональная цепочка — это не универсальная проверка на null. Она защищает только тот шаг, к которому привязана, поэтому user?.profile.name выбросит ошибку, когда profile равен undefined: у второго обращения нет своего ?. впереди. Чтобы цепочка была безопасна целиком, знак нужен на каждом шаге — user?.profile?.name — либо родительский объект проверяют до начала цепочки.\n\nОператор нулевого слияния ?? возвращает правый операнд только тогда, когда левый равен null или undefined. Именно здесь он отличается от ||, который срабатывает на любом ложном значении, включая ноль, пустую строку и false. Ценность ?? в том, что законный ноль выживает: config.retries ?? 3 сохранит настроенный ноль, тогда как тот же код с || подставил бы тройку.\n\nЯзык запрещает писать || или && рядом с ?? без скобок, и парсер сообщает об ошибке SyntaxError вместо того, чтобы угадывать. Приоритет ?? относительно двух других операторов намеренно не определён, поэтому смешанное выражение всегда даёт ошибку, а не тихий баг. Форма присваивания ??= записывает в переменную только тогда, когда она равна null или undefined, и это самый короткий способ подставить значение по умолчанию, не затирая существующий ноль.'
      ),
      bullets: [
        L('?. stops the whole chain when the value on its left is null or undefined.', '?. обрывает всю цепочку, когда значение слева равно null или undefined.'),
        L('?. protects only its own step: user?.profile.name can still throw.', '?. защищает только свой шаг: user?.profile.name всё ещё может бросить ошибку.'),
        L('?? falls back only for null and undefined.', '?? срабатывает только на null и undefined.'),
        L('|| falls back for every falsy value, including 0, "" and false.', '|| срабатывает на любом ложном значении, включая 0, "" и false.'),
        L('Mixing ?? with || or && without parentheses is a SyntaxError.', 'Смешивание ?? с || или && без скобок — это SyntaxError.'),
        L('??= assigns only when the current value is null or undefined.', '??= присваивает, только когда текущее значение равно null или undefined.'),
      ],
      code: `const user = { profile: { name: 'Ada' } };

user?.profile.name;     // 'Ada'
user?.address?.city;    // undefined - the chain stops, no error
try {
  user.address.city;   // TypeError: Cannot read properties of undefined
} catch (error) {
  console.log(error.name);  // 'TypeError'
}

const config = { retries: 0, label: '' };
config.retries ?? 3;   // 0     - a real zero survives
config.retries || 3;   // 3     - a zero is falsy
config.label ?? 'none';// ''    - an empty string survives
config.label || 'none';// 'none'

let timeout;
timeout ??= 5000;       // 5000
console.log(timeout);   // 5000

const fn = null;
fn?.();                 // undefined - the call is skipped`,
      table: {
        caption: L('Fallback behaviour side by side', 'Поведение подстановки рядом'),
        headers: [L('Left value', 'Левое значение'), L('x ?? fallback', 'x ?? fallback'), L('x || fallback', 'x || fallback')],
        rows: [
          [L('0', '0'), L('0', '0'), L('fallback', 'fallback')],
          [L('""', '""'), L('""', '""'), L('fallback', 'fallback')],
          [L('false', 'false'), L('false', 'false'), L('fallback', 'fallback')],
          [L('null', 'null'), L('fallback', 'fallback'), L('fallback', 'fallback')],
          [L('undefined', 'undefined'), L('fallback', 'fallback'), L('fallback', 'fallback')],
          [L('NaN', 'NaN'), L('NaN', 'NaN'), L('fallback', 'fallback')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The chain that stops halfway', 'Цепочка, которая обрывается на полпути'),
          text: L(
            'user?.profile.name reads like a safe access, but it only guards user. When profile is undefined, the second access throws a TypeError that names the property, not the real problem. Add ?. to every step, or check the parent object once and then read the chain directly.',
            'user?.profile.name читается как безопасный доступ, но он защищает только user. Когда profile равен undefined, второе обращение выбросит TypeError, который назовёт свойство, а не настоящую причину. Ставьте ?. на каждом шаге или проверьте родительский объект один раз и читайте цепочку напрямую.'
          ),
        },
        {
          tone: 'tip',
          title: L('?? asks a different question than ||', '?? задаёт другой вопрос, чем ||'),
          text: L(
            '?? asks "is this missing?", || asks "is this usable?". Configuration values, counters and flags usually want ??, because zero and an empty string are legitimate there. A value with a meaningful false state should be tested explicitly instead of being defaulted.',
            '?? спрашивает «это отсутствует?», а || спрашивает «это пригодно?». Значения конфигурации, счётчики и флаги обычно требуют ??, потому что там ноль и пустая строка законны. Значение с осмысленным состоянием false нужно проверять явно, а не подменять значением по умолчанию.'
          ),
        },
      ],
      takeaway: L(
        'Put ?. on every step of a chain you cannot vouch for, and use ?? instead of || whenever zero or an empty string is a legitimate value.',
        'Ставьте ?. на каждом шаге цепочки, в которой не уверены, и используйте ?? вместо || там, где ноль или пустая строка — законное значение.'
      ),
      seeAlso: [
        L('Section 2-3: how && and || short-circuit', 'Секция 2-3: как замыкаются && и ||'),
        L('Section 1-4: null, undefined, NaN and -0', 'Секция 1-4: null, undefined, NaN и -0'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch2-s5',
      title: L('Branching: if, ternary and switch', 'Ветвление: if, тернарный оператор и switch'),
      body: L(
        'if and else pick a branch by truthiness, so any of the eight falsy values selects the else path. The condition does not have to be a boolean, but writing Boolean(value) documents the intent. A single statement after if without braces is legal, and it is one of the most reliable ways to produce a bug that appears only after someone reformats the file, so always use braces.\n\nThe conditional operator is an expression, so it produces a value. That is its whole advantage: const label = isAdmin ? "Admin" : "User" fits into a declaration, a return statement or an object literal, where an if statement would need a temporary variable. The price is nesting. Two or three conditional operators in one expression become unreadable, and the correct fix is an early return or a separate variable, not another pair of parentheses.\n\nThe switch compares the discriminant with every case using the strict equality operator, so a string case never matches a number and an object case matches only by identity. Every case that does not end with break or return falls through into the next one, which is occasionally useful and mostly a typo. Put default at the end, and treat an empty case body as a deliberate grouping of the cases above it.\n\nNested conditions usually mean a function is doing two jobs. The early return pattern removes the nesting instead of adding a level: check the invalid case, return, and let the rest of the function run at a single indentation level. Declare the values a branch produces with const, because a value assigned in only one branch and read afterwards is a let with a confusing lifetime.',
        'if и else выбирают ветку по истинности, поэтому любое из восьми ложных значений уводит выполнение в else. Условию необязательно быть логическим значением, но запись Boolean(value) делает намерение явным. Один оператор после if без фигурных скобок допустим, и это один из самых надёжных способов получить баг, который проявится только после того, как кто-то переформатирует файл, поэтому всегда ставьте скобки.\n\nТернарный оператор — это выражение, а значит, он даёт значение. В этом его главное преимущество: const label = isAdmin ? "Admin" : "User" помещается в объявление, в return или в литерал объекта, там, где if потребовал бы временной переменной. Цена — вложенность. Два или три тернарных оператора в одном выражении становятся нечитаемыми, и правильное решение — ранний возврат или отдельная переменная, а не ещё одна пара скобок.\n\nКонструкция switch сравнивает выражение с каждым case строгим оператором равенства, поэтому строковый case никогда не совпадёт с числом, а объектный совпадёт только по идентичности. Любой case, который не заканчивается break или return, проваливается в следующий, и это иногда полезно, но чаще — опечатка. Ставьте default в конец, а пустое тело case считайте намеренной группировкой случаев над ним.\n\nВложенные условия обычно означают, что функция занимается двумя делами сразу. Паттерн раннего возврата убирает вложенность, а не добавляет уровень: проверьте недопустимый случай, вернитесь и позвольте остальной части функции идти с одним уровнем отступа. Объявляйте значения, которые создаёт ветка, через const, потому что значение, присвоенное только в одной ветке и прочитанное после, — это let со сбитым временем жизни.'
      ),
      bullets: [
        L('if and else test truthiness, not equality.', 'if и else проверяют истинность, а не равенство.'),
        L('Always use braces, even around a single statement.', 'Всегда ставьте скобки, даже вокруг одного оператора.'),
        L('The conditional operator is an expression and produces a value.', 'Тернарный оператор — выражение и даёт значение.'),
        L('switch compares with ===, so the types must match exactly.', 'switch сравнивает через ===, поэтому типы должны совпадать точно.'),
        L('A case without break falls through into the next case.', 'Case без break проваливается в следующий case.'),
        L('Return early instead of nesting the happy path inside else.', 'Возвращайтесь рано вместо вложения основного пути в else.'),
      ],
      code: `const score = 72;
let grade;
if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else {
  grade = 'C';
}
const label = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';
switch (score) {
  case 100:
  case 99:
    console.log('perfect');
    break;
  default:
    console.log('good enough');
}
function load(item) {
  if (!item) return null;        // early return, no else
  return item.name;
}`,
      table: {
        caption: L('Choosing a branching form', 'Выбор формы ветвления'),
        headers: [L('Form', 'Форма'), L('Produces a value', 'Даёт значение'), L('Best for', 'Лучше всего для')],
        rows: [
          [L('if / else', 'if / else'), L('no', 'нет'), L('several branches, early returns', 'нескольких веток и ранних возвратов')],
          [L('conditional operator', 'тернарный оператор'), L('yes', 'да'), L('one of two values', 'выбора из двух значений')],
          [L('switch', 'switch'), L('no', 'нет'), L('one value matched against many constants', 'одного значения против многих констант')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Fallthrough in a switch', 'Проваливание в switch'),
          text: L(
            'A case that does not end with break or return continues into the next case. It is a feature when you deliberately group cases and a bug everywhere else. Many linters require a comment marking an intentional fallthrough, which is the cheapest way to make the intent reviewable.',
            'Case, который не заканчивается break или return, продолжает выполнение следующего case. Это возможность, когда случаи намеренно сгруппированы, и баг во всех остальных случаях. Во многих линтерах требуют комментарий о намеренном проваливании, и это самый дешёвый способ сделать намерение проверяемым на ревью.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the happy path flat', 'Держите основной путь плоским'),
          text: L(
            'A guard at the top of a function that returns keeps the main path flat and readable. Nesting the same path inside else blocks instead increases the indentation for every future change, and the reader has to hold the condition in their head to know when the code below runs.',
            'Проверка в начале функции с возвратом держит основной путь плоским и читаемым. Если вложить тот же путь в блоки else, отступы вырастут при каждом будущем изменении, а читателю придётся удерживать условие в голове, чтобы понять, когда выполнится код ниже.'
          ),
        },
      ],
      takeaway: L(
        'Use if for branching, the conditional operator only when you need a value, and prefer early returns over nested else blocks.',
        'Используйте if для ветвления, тернарный оператор — только когда нужно значение, и предпочитайте ранний возврат вложенным блокам else.'
      ),
      seeAlso: [
        L('Section 1-3: the eight falsy values that pick the else branch', 'Секция 1-3: восемь ложных значений, выбирающих ветку else'),
        L('Chapter 12: errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
        L('Chapter 8: loops, iterators and generators', 'Глава 8: циклы, итераторы и генераторы'),
      ],
    },
  ],
};
