import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh07: Chapter = {
  id: 'oop-ch7',
  title: L('Functional patterns', 'Функциональные паттерны'),
  summary: L(
    'Purity, composition, currying, partial application and the point-free style, plus the conventions that make immutability real in a language that has no immutable data structures.',
    'Чистые функции, композиция, каррирование, частичное применение и point-free стиль, а также соглашения, которые делают неизменяемость реальной в языке без неизменяемых структур данных.'
  ),
  sections: [
    {
      id: 'oop-ch7-s1',
      title: L('Pure functions and referential transparency', 'Чистые функции и прозрачность по подстановке'),
      body: L(
        'A pure function returns the same output for the same input and changes nothing outside itself: no writes to an outer variable, no network call, no clock read, no random number. That property is called referential transparency, and it means the call can be replaced by its value without changing the meaning of the program. Nothing in the code can observe the difference between computing a result and reading a constant that already holds it.\n\nPurity is a property of the dependencies, not of the syntax. A function that reads a module-level constant is still pure as long as that constant never changes, while a function that takes a clock as an argument is pure and one that calls Date.now() inside is not. The practical move is to push the impure parts to the edges: read the clock once at the entry point and pass the value down through the chain.\n\nPurity matters most in the places where the code is hardest to test: reducers, selectors, state transitions, pricing rules. A pure reducer can be replayed with a sequence of actions, which is exactly how a store with time travel works, and it can be tested with a plain assert instead of a mocked framework. Impure code in the middle of a pipeline forces the reader to guess what else the function touched, and that guess is the expensive part.',
        'Чистая функция возвращает один и тот же результат для одного и того же входа и не меняет ничего снаружи: не пишет во внешнюю переменную, не ходит в сеть, не читает часы, не берёт случайное число. Это свойство называется прозрачностью по подстановке, и оно означает, что вызов можно заменить его значением, не меняя смысл программы. Ничто в коде не заметит разницы между вычислением результата и чтением константы, в которой он уже лежит.\n\nЧистота — это свойство зависимостей, а не синтаксиса. Функция, читающая константу уровня модуля, остаётся чистой, пока эта константа не меняется, а функция, принимающая часы аргументом, чиста, в отличие от функции, вызывающей Date.now() внутри. Практический ход — отодвинуть нечистые части к границам: прочитать часы один раз на входе и передать значение дальше по цепочке.\n\nЧистота важнее всего там, где код труднее всего тестировать: редьюсеры, селекторы, переходы состояния, правила расчёта цены. Чистый редьюсер можно прогнать заново последовательностью действий — именно так работает хранилище с путешествием во времени, — и проверить обычным утверждением вместо моков. Нечистый код в середине конвейера заставляет читателя угадывать, что ещё функция задела, и вот эти догадки обходятся дороже всего.'
      ),
      bullets: [
        L('A pure function returns the same value for the same input and touches nothing outside.', 'Чистая функция возвращает одно и то же для одного и того же входа и не трогает ничего снаружи.'),
        L('Referential transparency means a call can be replaced by its result.', 'Прозрачность по подстановке означает, что вызов можно заменить его результатом.'),
        L('Inject the clock instead of reading it inside the function.', 'Передавайте часы внутрь, а не читайте их в функции.'),
        L('Purity is what makes caching, replaying and cheap unit tests possible.', 'Именно чистота делает возможными кэш, повтор и дешёвые юнит-тесты.'),
        L('A reducer or a selector that is impure is not a reducer or a selector.', 'Нечистый редьюсер или селектор — уже не редьюсер и не селектор.'),
      ],
      code: `function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / 86400000);
}

const sumLines = (lines: number[]): number =>
  lines.reduce((total, line) => total + line, 0);

const start = new Date('2026-01-01T00:00:00Z');
const end = new Date('2026-01-10T00:00:00Z');

daysBetween(start, end); // 9
daysBetween(start, end); // 9 - the same result every time
sumLines([100, 250]);    // 350`,
      table: {
        caption: L('Pure and impure side by side', 'Чистая и нечистая функция рядом'),
        headers: [L('Aspect', 'Аспект'), L('Pure', 'Чистая'), L('Impure', 'Нечистая')],
        rows: [
          [L('Same input', 'Одинаковый вход'), L('Same output', 'Одинаковый выход'), L('Depends on hidden state', 'Зависит от скрытого состояния')],
          [L('Side effects', 'Побочные эффекты'), L('None', 'Нет'), L('Write, log, request, read the clock', 'Запись, лог, запрос, чтение часов')],
          [L('Test', 'Тест'), L('One assert', 'Одно утверждение'), L('Mocks and cleanup', 'Моки и уборка')],
          [L('Replay', 'Повтор'), L('Possible', 'Возможен'), L('Impossible', 'Невозможен')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Inject the impurity', 'Внесите нечистоту через аргумент'),
          text: L(
            'When a function needs the current time, a random value or a network response, pass it in as an argument and keep the function itself pure. The impure call then lives in one obvious place at the edge of the application, and the rule below it can be tested without any setup.',
            'Если функции нужны текущее время, случайное значение или ответ сети, передайте их аргументом и оставьте саму функцию чистой. Нечистый вызов тогда живёт в одном очевидном месте на границе приложения, а правило под ним тестируется без всякой подготовки.'
          ),
        },
      ],
      takeaway: L(
        'Push the impure call to the edge of the program and pass its result inward as an argument.',
        'Отодвиньте нечистый вызов к границе программы и передавайте его результат внутрь аргументом.'
      ),
      seeAlso: [
        L('Section 7-5: immutable data structures in practice', 'Секция 7-5: неизменяемые структуры данных на практике'),
        L('Section 8-4: logging and observability in the domain layer', 'Секция 8-4: логирование и наблюдаемость в доменном слое'),
      ],
    },
    {
      id: 'oop-ch7-s2',
      title: L('Function composition and pipes', 'Композиция функций и конвейеры'),
      body: L(
        'Composition builds a new function out of existing ones: apply f, then g, then h. In code it takes one line, and the point is that every step is small, testable on its own and reusable somewhere else. The pipe is the readable version of the same idea, a function that takes a value and pushes it through a list of transformations in order.\n\nThe rule for a good composition is that each step takes one argument and returns one value, so the chain reads like a sentence. As soon as a step needs two inputs or returns a tuple, the chain stops being readable and the pipeline should end there, with explicit named variables for the intermediate results. Composition that hides the intermediate values is convenient until the first failure, and then it is a black box that tells you only that something in the chain went wrong.\n\nComposition also has to account for errors. When a step throws, the whole chain throws and the stack points at the failing step, which is fine for the exceptional case. If a step can fail in an expected way, the pipeline needs a way to carry that failure forward, and that changes the design of every function in the chain. Writing the same composition twice, once with exceptions and once with results, is how the two versions drift apart.',
        'Композиция собирает новую функцию из существующих: применить f, потом g, потом h. В коде это одна строка, и смысл в том, что каждый шаг небольшой, тестируется сам по себе и пригодится в другом месте. Конвейер — читаемая версия той же идеи: функция, которая берёт значение и прогоняет его через список преобразований по порядку.\n\nПравило хорошей композиции: каждый шаг принимает один аргумент и возвращает одно значение, и тогда цепочка читается как предложение. Как только шагу нужны два входа или он возвращает кортеж, цепочка перестаёт читаться, и конвейер на этом месте должен закончиться: дальше идут явные именованные переменные для промежуточных результатов. Композиция, скрывающая промежуточные значения, удобна до первого сбоя, а потом это чёрный ящик, который сообщает только, что в цепочке что-то сломалось.\n\nКомпозиция должна считаться и с ошибками. Когда шаг бросает исключение, вся цепочка бросает, и стек указывает на упавший шаг — для исключительного случая это нормально. Если же шаг может упасть ожидаемым образом, конвейеру нужен способ донести эту ошибку дальше, и это меняет устройство каждой функции в цепочке. Написать одну и ту же композицию дважды — один раз с исключениями, другой с результатами — значит запустить расхождение версий.'
      ),
      bullets: [
        L('compose(f, g) means apply f first and then g.', 'compose(f, g) означает «сначала f, потом g».'),
        L('Each step takes one argument and returns one value.', 'Каждый шаг принимает один аргумент и возвращает одно значение.'),
        L('Named intermediate variables beat a chain as soon as a step has a name.', 'Именованные промежуточные значения лучше цепочки, как только у шага есть имя.'),
        L('A step that can fail in an expected way changes the design of the pipeline.', 'Шаг, который может ожидаемо упасть, меняет устройство всего конвейера.'),
        L('Composition stays readable only while the steps are obvious.', 'Композиция читается, пока шаги очевидны.'),
      ],
      code: `function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (value: A) => C {
  return (value: A): C => g(f(value));
}

function pipe<A, B>(steps: Array<(value: A) => A>): (value: A) => A {
  return (value: A): A => steps.reduce((acc, step) => step(acc), value);
}

const trim = (text: string): string => text.trim();
const upper = (text: string): string => text.toUpperCase();

const slugify = compose(upper, trim);
slugify('  hello world  '); // 'HELLO WORLD'

pipe([trim, upper])('  hello  '); // 'HELLO'`,
      table: {
        caption: L('Composition and pipeline', 'Композиция и конвейер'),
        headers: [L('Aspect', 'Аспект'), L('compose', 'compose'), L('pipe', 'pipe')],
        rows: [
          [L('Shape', 'Форма'), L('Two functions', 'Две функции'), L('A list of functions', 'Список функций')],
          [L('Grows with', 'Растёт вместе с'), L('Arity', 'Числом аргументов'), L('Number of steps', 'Числом шагов')],
          [L('Reads as', 'Читается как'), L('f then g', 'f, затем g'), L('A pipeline of steps', 'Конвейер шагов')],
          [L('Best for', 'Лучше всего для'), L('Two stages', 'Двух этапов'), L('Many stages', 'Многих этапов')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The chain that hides the state', 'Цепочка, скрывающая состояние'),
          text: L(
            'Long chains of small functions are pleasant until the value travelling through them stops being obvious. When you cannot name the intermediate result, the chain is no longer documentation, and a defect in it can only be found by stepping through it in a debugger.',
            'Длинные цепочки маленьких функций приятны, пока значение, идущее по ним, остаётся очевидным. Когда промежуточный результат нельзя назвать, цепочка перестаёт быть документацией, а дефект в ней находится только пошаговым отладчиком.'
          ),
        },
      ],
      takeaway: L(
        'Compose functions that take one argument and return one value, and name the moment the value stops being obvious.',
        'Композируйте функции с одним аргументом и одним результатом и назовите момент, когда значение перестаёт быть очевидным.'
      ),
      seeAlso: [
        L('Section 7-3: currying and partial application', 'Секция 7-3: каррирование и частичное применение'),
        L('Section 5-1: strategy and factory', 'Секция 5-1: стратегия и фабрика'),
      ],
    },
    {
      id: 'oop-ch7-s3',
      title: L('Currying and partial application', 'Каррирование и частичное применение'),
      body: L(
        'Currying turns a function of several arguments into a chain of functions of one argument. Partial application fixes some of the arguments and returns a function that waits for the rest. The difference is that currying always produces a function of exactly one argument, while partial application may stop at any number, which makes currying a special case of the wider technique.\n\nThe value of either is not the trick itself but the shape of the API it produces. A curried function composes directly, because the data argument arrives last, so pipe(formatPrice, withTax) becomes possible. Partial application makes configuration natural: a function that takes its options first and the payload last returns a configured function, and that configuration is done once at the edge of the application and reused everywhere else.\n\nThe cost is readability for the people who do not read it daily, and the types get noisier. In TypeScript a curried signature needs overloads or carefully written generics to keep the inference precise, and an author who curries by hand often loses the inference the ordinary version had. The rule that keeps it honest is simple: curry when the pipeline is the point, and keep the ordinary signature otherwise.',
        'Каррирование превращает функцию с несколькими аргументами в цепочку функций от одного аргумента. Частичное применение фиксирует часть аргументов и возвращает функцию, ждущую остальные. Разница в том, что каррирование всегда даёт функцию ровно от одного аргумента, а частичное применение может остановиться на любом числе, поэтому каррирование — частный случай более широкого приёма.\n\nЦенность обоих приёмов не в самом трюке, а в форме API, которую они дают. Каррированная функция композируется напрямую, потому что аргумент с данными приходит последним, и pipe(formatPrice, withTax) становится возможен. Частичное применение делает естественной настройку: функция, которая сначала принимает опции, а потом полезную нагрузку, возвращает настроенную функцию, а настройка выполняется один раз на границе приложения и переиспользуется везде.\n\nЦена — читаемость для тех, кто читает такой код не каждый день, и более шумные типы. В TypeScript каррированной сигнатуре нужны перегрузки или аккуратно написанные дженерики, чтобы вывод остался точным, и автор, каррирующий руками, часто теряет тот вывод, который был у обычной версии. Правило, которое удерживает честность, простое: каррируйте, когда конвейер — главная цель, иначе оставляйте обычную сигнатуру.'
      ),
      bullets: [
        L('Currying produces functions of one argument, partial application stops where you want.', 'Каррирование даёт функции одного аргумента, частичное применение останавливается там, где нужно.'),
        L('A curried function composes directly, because the data argument comes last.', 'Каррированная функция композируется напрямую, потому что данные приходят последними.'),
        L('Partial application configures once at the edge and reuses the result.', 'Частичное применение настраивает один раз на границе и переиспользует результат.'),
        L('TypeScript needs overloads or careful generics to keep curried types precise.', 'TypeScript требует перегрузок или аккуратных дженериков, чтобы типы каррированных функций оставались точными.'),
        L('Keep the ordinary signature unless the pipeline is the point.', 'Оставьте обычную сигнатуру, если конвейер — не главная цель.'),
      ],
      code: `function curriedAdd(a: number): (b: number) => number {
  return (b: number): number => a + b;
}

function withTax(rate: number): (amount: number) => number {
  return (amount: number): number => amount * (1 + rate);
}

function withFee(fee: number, amount: number): number {
  return amount + fee;
}

const taxed = withTax(0.2);
taxed(100);        // 120
curriedAdd(2)(3);  // 5
withFee(5, 100);   // 105`,
      table: {
        caption: L('Currying against partial application', 'Каррирование против частичного применения'),
        headers: [L('Aspect', 'Аспект'), L('Currying', 'Каррирование'), L('Partial application', 'Частичное применение')],
        rows: [
          [L('Result', 'Результат'), L('A function of one argument', 'Функция от одного аргумента'), L('A function of the rest', 'Функция от остальных аргументов')],
          [L('Argument count', 'Число аргументов'), L('Always one', 'Всегда один'), L('Any number', 'Любое число')],
          [L('Composition', 'Композиция'), L('Direct', 'Прямая'), L('Possible', 'Возможна')],
          [L('Typical use', 'Типичное применение'), L('Building a pipeline', 'Сборка конвейера'), L('Configuring a client', 'Настройка клиента')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The argument order you have to remember', 'Порядок аргументов, который надо запоминать'),
          text: L(
            'Currying only helps when the argument order is consistent. If one function takes the data first and the next takes it last, the pipeline cannot be built and the reader has to check every signature. When the order varies, name the parameters and use an object instead.',
            'Каррирование помогает только при единообразном порядке аргументов. Если одна функция принимает данные первыми, а следующая последними, конвейер не собрать и читателю приходится проверять каждую сигнатуру. Когда порядок скачет, называйте параметры и передавайте объект.'
          ),
        },
      ],
      takeaway: L(
        'Curry when the pipeline is the point, put the data argument last, and keep the plain signature everywhere else.',
        'Каррируйте, когда конвейер — главная цель, ставьте данные последним аргументом, а в остальном оставляйте обычную сигнатуру.'
      ),
      seeAlso: [
        L('Section 7-2: function composition and pipes', 'Секция 7-2: композиция функций и конвейеры'),
        L('Section 7-4: point-free style and when it hurts', 'Секция 7-4: point-free стиль и когда он мешает'),
      ],
    },
    {
      id: 'oop-ch7-s4',
      title: L('Point-free style and when it hurts', 'Point-free стиль и когда он мешает'),
      body: L(
        'Point-free style means writing a function without naming its argument. The argument is still there, it is simply hidden inside the plumbing: instead of a predicate that takes a number, you build a composition of combinators that each take a function and return a function. The style has a real appeal, because it removes the noise of parameter names and forces the pipeline to be read as a whole rather than line by line.\n\nThe cost is that the reader loses the vocabulary. In a domain where the words order, customer and invoice carry meaning, an expression composed of six combinators is shorter and says less than a named function with a comment. Debugging suffers too, because the intermediate values have no names in the stack trace, and a broken expression gives no clue which stage produced the wrong value.\n\nThe practical rule is a division of labour. Use the point-free style for generic transformations whose stages are mechanical, such as filtering, mapping and combining predicates, and use named functions whenever the domain words carry the meaning. Most mature codebases end up mixed, with a point-free pipeline in the middle and a named business rule at every place where the vocabulary matters.',
        'Point-free стиль — это написание функции без имени аргумента. Аргумент никуда не делся, он просто спрятан в обвязке: вместо предиката, принимающего число, вы собираете композицию комбинаторов, каждый из которых принимает функцию и возвращает функцию. У стиля есть настоящее обаяние: он убирает шум имён параметров и заставляет читать конвейер целиком, а не построчно.\n\nПлата в том, что читатель теряет словарь. В домене, где слова заказ, клиент и счёт несут смысл, выражение из шести комбинаторов короче и говорит меньше, чем именованная функция с комментарием. Страдает и отладка: у промежуточных значений нет имён в стеке, и сломанное выражение не подсказывает, на каком этапе получилось неверное значение.\n\nПрактическое правило — это разделение труда. Point-free стиль используйте для общих преобразований, чьи этапы механические, например для фильтрации, отображения и объединения предикатов, а именованные функции — везде, где важны слова домена. Зрелые кодовые базы обычно смешивают стили: в середине point-free конвейер, а в каждом месте, где значит словарь, — именованное бизнес-правило.'
      ),
      bullets: [
        L('Point-free style removes the argument name, not the argument.', 'Point-free стиль убирает имя аргумента, а не сам аргумент.'),
        L('It reads well for mechanical transformations.', 'Он хорошо читается для механических преобразований.'),
        L('Domain words carry meaning, and hiding them costs comprehension.', 'Доменные слова несут смысл, и скрывать их — платить за понимание.'),
        L('Unnamed intermediate values make a failure hard to locate.', 'Безымянные промежуточные значения затрудняют поиск ошибки.'),
        L('Mixed style: a point-free pipeline with named domain functions.', 'Смешанный стиль: point-free конвейер и именованные доменные функции.'),
      ],
      code: `function not<T>(predicate: (x: T) => boolean): (x: T) => boolean {
  return (x: T): boolean => !predicate(x);
}

function both<A, B>(
  first: (a: A) => boolean,
  second: (b: B) => boolean
): (x: A & B) => boolean {
  return (x: A & B): boolean => first(x) && second(x);
}

const isPositive = (n: number): boolean => n > 0;
const isEven = (n: number): boolean => n % 2 === 0;

// Point-free: the stages read as a pipeline
const isValidScore = both(isEven, isPositive);

// Named: the business rule survives on its own
function isValidOrderScore(score: number): boolean {
  return isEven(score) && isPositive(score);
}`,
      table: {
        caption: L('Two ways to write the same rule', 'Два способа записать одно правило'),
        headers: [L('Aspect', 'Аспект'), L('Point-free', 'Point-free'), L('Named function', 'Именованная функция')],
        rows: [
          [L('Length', 'Длина'), L('Short', 'Короткая'), L('Longer', 'Длиннее')],
          [L('Vocabulary', 'Словарь'), L('Hidden', 'Скрыт'), L('Visible', 'Виден')],
          [L('Debugging', 'Отладка'), L('Opaque stack', 'Непрозрачный стек'), L('Named frames', 'Именованные фреймы')],
          [L('Best for', 'Лучше всего для'), L('Generic plumbing', 'Общих механизмов'), L('Business rules', 'Бизнес-правил')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The style is not the point', 'Стиль здесь не главное'),
          text: L(
            'Point-free code and named code can express exactly the same logic, and the compiler accepts both. Choose the one that tells a newcomer what the code means, and treat any other preference as a matter of taste rather than a rule to enforce in review.',
            'Point-free код и именованный код выражают ровно одну и ту же логику, и компилятор принимает оба. Выбирайте то, что объясняет смысл новичку, и относитесь к любому другому предпочтению как к вкусу, а не как к правилу для ревью.'
          ),
        },
      ],
      takeaway: L(
        'Hide the plumbing, never the domain vocabulary.',
        'Прячьте обвязку, но никогда — словарь домена.'
      ),
      seeAlso: [
        L('Section 7-2: function composition and pipes', 'Секция 7-2: композиция функций и конвейеры'),
        L('Section 6-5: anemic versus rich domain models', 'Секция 6-5: анемичные и богатые доменные модели'),
      ],
    },
    {
      id: 'oop-ch7-s5',
      title: L('Immutable data structures in practice', 'Неизменяемые структуры данных на практике'),
      body: L(
        'JavaScript has no persistent data structures, so immutability is a convention that the code keeps by discipline: never mutate what you received, build a new value instead. The primitives of the convention are Object.freeze, the spread instead of a mutation, and the rule that a function returns a new object rather than editing one in place. The readonly modifier in TypeScript helps at compile time, but a nested object can still be changed at runtime, which is why freezing at the boundary is worth the few lines it costs.\n\nThe cost of the convention is allocation and the temptation to cheat. Object.freeze is shallow, so a frozen object that holds an array still has a mutable array inside it, and code that assumes otherwise produces a bug that surfaces far away from the cause. The practical approach is to freeze where the data enters the application, at the API boundary or in the reducer, and to treat everything below that point as immutable by convention and by review.\n\nImmutability pays off wherever state is shared. With immutable state a memoised selector can compare references and know the answer did not change, a renderer can skip the update, and time travel in a store becomes free because the old states are still intact. The trap is half-immutability: an object that looks frozen but holds a mutable collection, which produces updates that never reach the subscribers you expected.',
        'В JavaScript нет персистентных структур данных, поэтому неизменяемость — это соглашение, которое код держит дисциплиной: никогда не мутируй полученное, а строй новое значение. Опорами соглашения служат Object.freeze, spread вместо мутации и правило, что функция возвращает новый объект, а не правит имеющийся. Модификатор readonly в TypeScript помогает на этапе компиляции, но вложенный объект всё ещё можно изменить во время выполнения, и поэтому заморозка на границе стоит тех строк, которые она требует.\n\nЦена соглашения — аллокации и соблазн сжульничать. Object.freeze работает поверхностно, поэтому у замороженного объекта с массивом внутри остаётся изменяемый массив, а код, который рассчитывает на обратное, даёт баг, который всплывает далеко от причины. Практический подход: замораживать там, где данные входят в приложение, на границе API или в редьюсере, а всё, что ниже, считать неизменяемым по соглашению и по ревью.\n\nНеизменяемость окупается везде, где состояние общее. При неизменяемом состоянии мемоизированный селектор может сравнить ссылки и понять, что ответ не изменился, рендерер может пропустить обновление, а путешествие во времени в хранилище становится бесплатным, потому что старые состояния целы. Ловушка — наполовину неизменяемость: объект выглядит замороженным, но внутри у него изменяемая коллекция, и обновления не доходят до тех подписчиков, которых вы ждёте.'
      ),
      bullets: [
        L('Immutability in JavaScript is a convention, not a language feature.', 'Неизменяемость в JavaScript — соглашение, а не возможность языка.'),
        L('Freeze at the boundary, where data enters the application.', 'Заморозка — на границе, там, где данные входят в приложение.'),
        L('Object.freeze is shallow, nested collections stay mutable.', 'Object.freeze работает поверхностно: вложенные коллекции остаются изменяемыми.'),
        L('Never mutate a parameter, return a new value instead.', 'Никогда не мутируйте параметр, возвращайте новое значение.'),
        L('Reference equality works only when state is replaced, never edited.', 'Сравнение ссылок работает только при замене состояния, а не при правке.'),
      ],
      code: `type State = {
  items: readonly string[];
  filter: string;
};

const initial: State = Object.freeze({
  items: Object.freeze(['a', 'b']),
  filter: '',
});

const withFilter = (state: State, filter: string): State => ({
  ...state,
  filter,
});

const next = withFilter(initial, 'a');
next === initial;      // false - a new object
next.items.length;    // 2 - the array is shared, not copied
initial.filter;       // '' - the original is untouched`,
      table: {
        caption: L('Mutation against an immutable update', 'Мутация против неизменяемого обновления'),
        headers: [L('Aspect', 'Аспект'), L('Mutation', 'Мутация'), L('Immutable update', 'Неизменяемое обновление')],
        rows: [
          [L('The original', 'Оригинал'), L('Changed in place', 'Меняется на месте'), L('Untouched', 'Не трогается')],
          [L('Reference equality', 'Сравнение ссылок'), L('Still equal, so nothing re-renders', 'Всё ещё равен, перерисовки нет'), L('Different, so subscribers wake up', 'Другой, подписчики просыпаются')],
          [L('Time travel', 'Путешествие во времени'), L('Impossible', 'Невозможно'), L('Free', 'Бесплатно')],
          [L('Cost', 'Цена'), L('Cheap', 'Дёшево'), L('One allocation per change', 'По одной аллокации на изменение')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The frozen object with a live array', 'Замороженный объект с живым массивом'),
          text: L(
            'Freezing the object but not the array inside it gives the illusion of immutability and none of the guarantee. The array can still be pushed to, the reference comparison in a memoised selector stays true, and the screen never updates. Freeze the nested collections too, or copy them.',
            'Заморозка объекта без вложенного массива даёт иллюзию неизменяемости и не даёт гарантии. В массив всё ещё можно добавить элемент, сравнение ссылок в мемоизированном селекторе остаётся истинным, и экран не обновится. Замораживайте вложенные коллекции тоже или копируйте их.'
          ),
        },
      ],
      takeaway: L(
        'Replace state instead of editing it, and freeze the nested collections at the boundary where data arrives.',
        'Заменяйте состояние вместо правки и замораживайте вложенные коллекции на границе, где данные приходят.'
      ),
      seeAlso: [
        L('Section 6-2: value objects', 'Секция 6-2: объекты-значения'),
        L('Section 7-1: pure functions and referential transparency', 'Секция 7-1: чистые функции и прозрачность по подстановке'),
      ],
    },
  ],
};
