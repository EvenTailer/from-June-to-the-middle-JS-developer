import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh05: Chapter = {
  id: 'ts-ch5',
  title: L('Conditional types, infer and template literal types', 'Условные типы, infer и шаблонные строковые типы'),
  summary: L(
    'How a conditional type picks a branch at compile time, why it distributes over a union, what infer can extract from another type, and how template literal types turn a string pattern into a type.',
    'Как условный тип выбирает ветку во время компиляции, почему он распределяется по объединению, что умеет извлекать infer из другого типа и как шаблонный строковый тип превращает шаблон строки в тип.'
  ),
  sections: [
    {
      id: 'ts-ch5-s1',
      title: L('Conditional types and distributivity', 'Условные типы и распределение по объединению'),
      body: L(
        'A conditional type has the shape T extends U ? X : Y. The compiler checks whether T is assignable to U and picks the branch, and the result is a type rather than a value, so the decision is made during compilation and leaves nothing behind in the emitted JavaScript. Because the check is an assignability check and not an equality test, it understands the whole type lattice: a union passes only when every one of its members passes.\n\nThe branch is chosen over a naked type parameter, and that detail changes the meaning of the whole type. When the checked type is a bare T and T happens to be a union, the conditional type distributes over that union: the branch is evaluated separately for every member and the results are unioned back together. This is why ToArray<string | number> is string[] | number[] instead of (string | number)[], and why a type that transforms union members behaves the way people expect without any extra ceremony.\n\nDistribution is also why never behaves the way it does. A conditional type over never distributes over an empty union and produces never, and that is exactly the mechanism behind Exclude and Extract, which filter union members by evaluating one member at a time. Distribution is not always what you want, and the way to switch it off is to wrap the checked type in a tuple: [T] extends [U] ? X : Y no longer distributes, because the checked type is a tuple and not a naked parameter.\n\nDistribution is convenient and it is also the reason conditional types get expensive. Every member of a union is evaluated on its own, and the compiler caches the result per instantiation, so applying a conditional type to a large union multiplies the work. A conditional type can also reject code far away from the definition that caused the rejection, because the check happens where the type is used.',
        'Условный тип имеет вид T extends U ? X : Y. Компилятор проверяет, можно ли присвоить T к U, и выбирает ветку. Результат — тип, а не значение, поэтому решение принимается во время компиляции и не оставляет следов в итоговом JavaScript. Проверка эта проверка присваиваемости, а не сравнение на равенство, и она понимает всю решётку типов: объединение проходит, только если проходит каждый его член.\n\nВетка выбирается по голому параметру типа, и именно эта деталь меняет смысл типа в целом. Когда проверяемый тип — это необёрнутый T, а T оказывается объединением, условный тип распределяется по нему: ветка вычисляется отдельно для каждого члена, а результаты снова объединяются в объединение. Поэтому ToArray<string | number> — это string[] | number[], а не (string | number)[], и поэтому тип, преобразующий членов объединения, ведёт себя ожидаемо без дополнительных церемоний.\n\nРаспределение объясняет и поведение never. Условный тип над never распределяется по пустому объединению и даёт never — именно так работают Exclude и Extract, фильтрующие членов объединения по одному. Распределение не всегда нужно, и отключается оно обёрткой проверяемого типа в кортеж: [T] extends [U] ? X : Y больше не распределяется, потому что проверяется кортеж, а не голый параметр.\n\nРаспределение удобно, и именно оно делает условные типы дорогими. Каждый член объединения вычисляется отдельно, а компилятор кэширует результат по инстанциации, поэтому применение условного типа к большому объединению умножает объём работы. Условный тип способен отклонить код вдалеке от определения, которое вызвало отказ, ведь проверка происходит там, где тип используется.'
      ),
      bullets: [
        L('T extends U ? X : Y is resolved at compile time and erased from the output.', 'T extends U ? X : Y вычисляется во время компиляции и стирается из результата.'),
        L('The check is assignability, so a union passes only if every member passes.', 'Проверка — это проверка присваиваемости: объединение проходит, только если проходит каждый член.'),
        L('A naked type parameter makes the conditional type distribute over the union.', 'Голый параметр типа заставляет условный тип распределяться по объединению.'),
        L('Wrapping the checked type in a tuple, [T] extends [U], stops distribution.', 'Обёртка проверяемого типа в кортеж, [T] extends [U], отключает распределение.'),
        L('Distributing over never yields never, and that is what powers Extract.', 'Распределение по never даёт never, и на этом держится Extract.'),
      ],
      code: `// Distributes over every member of the union
type ToArray<T> = T extends unknown ? T[] : never;
type A = ToArray<string | number>; // string[] | number[]

// Distribution over never produces never
type B = ToArray<never>; // never

// The check is a type level test
type IsString<T> = T extends string ? true : false;
type C = IsString<string | number>; // true | false

// Wrapping the parameter in a tuple stops distribution
type AllStrings<T> = [T] extends [string] ? true : false;
type D = AllStrings<string | number>; // false`,
      table: {
        caption: L('Three ways to check a type parameter', 'Три способа проверить параметр типа'),
        headers: [L('Form', 'Форма'), L('Distributes?', 'Распределяется?'), L('Result for string | number', 'Результат для string | number')],
        rows: [
          [L('T extends string ? 1 : 0', 'T extends string ? 1 : 0'), L('yes', 'да'), L('1 | 0', '1 | 0')],
          [L('[T] extends [string] ? 1 : 0', '[T] extends [string] ? 1 : 0'), L('no', 'нет'), L('0', '0')],
          [L('T extends unknown ? T[] : never', 'T extends unknown ? T[] : never'), L('yes', 'да'), L('string[] | number[]', 'string[] | number[]')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Distributivity is invisible', 'Распределение не видно в синтаксисе'),
          text: L(
            'Nothing in the syntax tells you that a conditional type distributes. When a union suddenly produces one union of results instead of a result per member, look for a naked type parameter in the checked position and wrap it in a tuple when you want the union checked as a whole.',
            'Ничего в синтаксисе не сообщает, что условный тип распределяется. Если объединение вдруг даёт один объединённый результат вместо результата на каждый член, ищите голый параметр типа в проверяемой позиции и оборачивайте его в кортеж, когда хотите проверить объединение целиком.'
          ),
        },
      ],
      takeaway: L(
        'A conditional type distributes when it checks a naked type parameter, so wrap the parameter in a tuple to test the union as a whole.',
        'Условный тип распределяется, если проверяет голый параметр типа, поэтому оберните параметр в кортеж, чтобы проверить объединение целиком.'
      ),
      seeAlso: [
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения и дискриминантные свойства'),
        L('Section 4-5: ReturnType, Parameters and Awaited', 'Секция 4-5: ReturnType, Parameters и Awaited'),
        L('Section 5-2: infer and the patterns it enables', 'Секция 5-2: infer и паттерны, которые он открывает'),
      ],
    },
    {
      id: 'ts-ch5-s2',
      title: L('infer and the patterns it enables', 'infer и паттерны, которые он открывает'),
      body: L(
        'infer is the only way to pull a type out of another type. It appears in the extends clause of a conditional type and binds a type variable to whatever part of the checked type matched the pattern. The pattern is written like a function type, so a return type is nothing more than a conditional type that matches any function and keeps what the function returns. The ReturnType that ships with the standard library does exactly that.\n\nThe same mechanism extracts element types from arrays, key types from objects and payload types from a discriminated union. When a conditional type has several branches, every branch may introduce its own infer, and a type variable created by infer exists only inside that branch, which is why the result is normally returned from the true branch explicitly.\n\nExtract and Exclude are conditional types in disguise, and reading them that way removes most of the mystery. Extract keeps the members of the first union that are assignable to the second, Exclude drops them. Because the checked type is a naked parameter, both of them distribute, and that is what makes them filters over the members of a union rather than a single yes or no answer.\n\ninfer also has a cost, and the cost shows up as slow editor feedback long before it shows up as a slow build. Every candidate type is matched against the pattern, and a pattern with several infer positions multiplies the number of matches. One infer over a function type is cheap and readable; a type that tries to unpack an entire API surface at the type level becomes a compiler bottleneck.',
        'infer — единственный способ извлечь тип из другого типа. Он появляется в extends-части условного типа и связывает переменную типа с той частью проверяемого типа, которая совпала с шаблоном. Шаблон записывается как тип функции, поэтому тип возвращаемого значения — это просто условный тип, который совпадает с любой функцией и сохраняет её результат. Именно так работает ReturnType из стандартной библиотеки.\n\nТот же механизм извлекает тип элемента из массива, тип ключа из объекта и тип полезной нагрузки из дискриминированного объединения. Если у условного типа несколько ветвей, каждая ветвь может ввести свой infer, и переменная типа, созданная infer, существует только внутри этой ветви — поэтому результат обычно возвращают из истинной ветви явно.\n\nExtract и Exclude — это условные типы под другим именем, и такое чтение снимает почти всю загадочность. Extract оставляет членов первого объединения, присваиваемых второму, Exclude выбрасывает их. Поскольку проверяемый тип — голый параметр, оба распределяются, и именно это превращает их в фильтры по членам объединения, а не в один ответ «да» или «нет».\n\nУ infer тоже есть цена, и она проявляется как медленный отклик редактора задолго до того, как сборка станет медленной. Каждый кандидат сопоставляется с шаблоном, а шаблон с несколькими позициями infer умножает число сопоставлений. Один infer над типом функции дёшев и читаем; тип, который пытается распаковать целый API на уровне типов, превращается в узкое место компилятора.'
      ),
      bullets: [
        L('infer binds a type variable to the part of the type that matched.', 'infer связывает переменную типа с той частью типа, которая совпала с шаблоном.'),
        L('infer is only allowed in the extends clause of a conditional type.', 'infer разрешён только в extends-части условного типа.'),
        L('A variable introduced by infer is scoped to its own branch.', 'Переменная, введённая infer, ограничена своей ветвью.'),
        L('Extract and Exclude are conditional types over a naked parameter.', 'Extract и Exclude — это условные типы над голым параметром.'),
        L('Each infer position multiplies the work the compiler does.', 'Каждая позиция infer умножает объём работы компилятора.'),
      ],
      code: `// infer captures the part of the type that matched
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

function load(id: string): { id: string; ok: true } {
  return { id, ok: true };
}

type Loaded = MyReturnType<typeof load>; // { id: string; ok: true }

// Extract and Exclude ship with the standard library and are conditional types
// type Extract<T, U> = T extends U ? T : never
// type Exclude<T, U> = T extends U ? never : T
type E = Extract<'a' | 'b' | 'c', 'a' | 'c'>; // 'a' | 'c'
type X = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'`,
      table: {
        caption: L('Utility types written as conditional types', 'Служебные типы в виде условных типов'),
        headers: [L('Type', 'Тип'), L('How it works', 'Как работает')],
        rows: [
          [L('Extract<T, U>', 'Extract<T, U>'), L('T extends U ? T : never — keeps the members assignable to U', 'T extends U ? T : never — оставляет членов, присваиваемых U')],
          [L('Exclude<T, U>', 'Exclude<T, U>'), L('T extends U ? never : T — drops the members assignable to U', 'T extends U ? never : T — выбрасывает членов, присваиваемых U')],
          [L('NonNullable<T>', 'NonNullable<T>'), L('T extends null | undefined ? never : T', 'T extends null | undefined ? never : T')],
          [L('ReturnType<T>', 'ReturnType<T>'), L('T extends (...args: never[]) => infer R ? R : never', 'T extends (...args: never[]) => infer R ? R : never')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('infer belongs to the extends clause', 'infer живёт в extends-части'),
          text: L(
            'Putting infer in the true branch of a conditional type is a compile error, and the compiler says so clearly. The pattern goes into the extends clause, and the branch only receives the bound variable.',
            'Размещение infer в истинной ветви условного типа — ошибка компиляции, и компилятор сообщает об этом прямо. Шаблон пишется в extends-части, а ветвь лишь получает связанную переменную.'
          ),
        },
      ],
      takeaway: L(
        'infer extracts a type from a pattern, and the utility types you use every day are conditional types written once and shipped.',
        'infer извлекает тип из шаблона, а служебные типы, которыми вы пользуетесь каждый день, — это условные типы, написанные один раз и уже включённые в библиотеку.'
      ),
      seeAlso: [
        L('Section 4-4: built-in utility types', 'Секция 4-4: встроенные служебные типы'),
        L('Section 5-1: conditional types and distributivity', 'Секция 5-1: условные типы и распределение по объединению'),
        L('Chapter 2: unions, intersections and narrowing', 'Глава 2: объединения, пересечения и сужение типов'),
      ],
    },
    {
      id: 'ts-ch5-s3',
      title: L('Template literal types', 'Шаблонные строковые типы'),
      body: L(
        'A template literal type describes the shape of a string. The syntax is the same as a template literal in JavaScript, but the result is a type: a template of the form prefix and string describes every string that starts with one of the prefixes and continues after a dash. When the prefix is a union of string literals, the result is the union of all combinations, so one template produces a whole family of types.\n\nThe pattern is the point. A template that joins a string and a number with a dash matches a string built from two parts, and the compiler checks the argument against it wherever the type is used. That gives you a way to express shapes a plain string cannot: a route prefix, an identifier with a known prefix, a CSS custom property name, or an event name derived from a list of event kinds.\n\nThe standard library ships four transformations over string literal types: Uppercase, Lowercase, Capitalize and Uncapitalize. They work on literal types only and not on the general string type, so Uppercase of string is string while Uppercase of the literal draft is the literal DRAFT. That restriction keeps them cheap and predictable, and it is the reason a component API often derives its event prop names from a union of event kinds.\n\nTemplate literal types are also the bridge to typed routing and to typed DOM events. When a router exposes a union of paths, a matcher written as a template literal type can narrow a string to a path and keep the result linked to that union, so a typo in a route name is a compile error instead of a blank screen in production.',
        'Шаблонный строковый тип описывает форму строки. Синтаксис тот же, что у шаблонной строки в JavaScript, но результат — тип: шаблон вида префикс и string описывает все строки, которые начинаются с одного из префиксов и продолжаются после дефиса. Когда префикс — объединение строковых литералов, результатом становится объединение всех комбинаций, то есть один шаблон даёт целое семейство типов.\n\nСмысл именно в шаблоне. Шаблон, соединяющий строку и число дефисом, описывает строку из двух частей, и компилятор проверяет по нему аргумент везде, где тип используется. Так можно выразить формы, которые обычная строка выразить не в состоянии: префикс маршрута, идентификатор с известным префиксом, имя CSS-переменной или имя события, полученное из списка видов событий.\n\nВ стандартной библиотеке есть четыре преобразования над строковыми литеральными типами: Uppercase, Lowercase, Capitalize и Uncapitalize. Они работают только с литеральными типами, а не с общим типом string, поэтому Uppercase от string остаётся string, а Uppercase от литерала draft даёт литерал DRAFT. Ограничение держит их дешёвыми и предсказуемыми, и именно поэтому API компонента часто выводит имена пропсов событий из объединения видов событий.\n\nШаблонные строковые типы — ещё и мост к типизированной маршрутизации и типизированным событиям DOM. Когда роутер отдаёт объединение путей, сопоставитель, записанный шаблонным строковым типом, сужает строку до пути и оставляет результат связанным с этим объединением, и опечатка в имени маршрута становится ошибкой компиляции, а не пустым экраном в проде.'
      ),
      bullets: [
        L('A template literal type is a type, not a value, and it is erased at compile time.', 'Шаблонный строковый тип — это тип, а не значение, и он стирается при компиляции.'),
        L('A union in the template expands into the union of all combinations.', 'Объединение внутри шаблона разворачивается в объединение всех комбинаций.'),
        L('Uppercase, Lowercase, Capitalize and Uncapitalize work on literal types only.', 'Uppercase, Lowercase, Capitalize и Uncapitalize работают только с литеральными типами.'),
        L('A template literal type matches only strings that follow the pattern.', 'Шаблонный строковый тип подходит только строкам, следующим шаблону.'),
        L('Typing route paths and event names is where they pay off most.', 'Типизация путей маршрутов и имён событий — область, где они окупаются сильнее всего.'),
      ],
      code: `type Prefix = 'user' | 'order';

// The result is the cross product of the union with the suffix
type Route = \`\${Prefix}-\${string}\`; // 'user-...' | 'order-...'

// The suffix can be a literal too
type Status = 'draft' | 'published';
type Path = \`/posts/\${Status}\`; // '/posts/draft' | '/posts/published'

// Built-in helpers transform string literal types
type Click = Capitalize<'click'>; // 'Click'
type Upper = Uppercase<'draft'>; // 'DRAFT'

// Event names derived from a list of event kinds
type FieldEvent = \`on\${Capitalize<'focus' | 'blur'>}\`; // 'onFocus' | 'onBlur'`,
      table: {
        caption: L('What a template literal type matches', 'Что подходит шаблонному строковому типу'),
        headers: [L('Type', 'Тип'), L('Matches', 'Подходит')],
        rows: [
          [L('`${string}`', '`${string}`'), L('any string', 'любая строка')],
          [L('`user-${string}`', '`user-${string}`'), L('strings that start with user-', 'строки, начинающиеся с user-')],
          [L('`${number}`', '`${number}`'), L('the decimal form of a number', 'десятичная запись числа')],
          [L('`/posts/${Status}`', '`/posts/${Status}`'), L("'/posts/draft' or '/posts/published'", "'/posts/draft' или '/posts/published'")],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A plain string does not fit the pattern', 'Обычная строка не подходит под шаблон'),
          text: L(
            'A value of type string is not assignable to a template that requires a prefix, because the compiler cannot know that the string happens to start with it. Narrow the value or parse it before you give it to a function that expects the narrow type.',
            'Значение типа string не присваивается шаблону, требующему префикс, потому что компилятор не знает, что строка случайно начинается с него. Сузьте значение или разберите его, прежде чем передавать функции, ждущей узкий тип.'
          ),
        },
      ],
      takeaway: L(
        'A template literal type is a pattern for strings, so write it wherever a plain string would lose the structure.',
        'Шаблонный строковый тип — это шаблон для строк, поэтому пишите его там, где обычная строка потеряла бы структуру.'
      ),
      seeAlso: [
        L('Section 1-4: literal types and widening', 'Секция 1-4: литеральные типы и расширение типов'),
        L('Section 5-2: infer and the patterns it enables', 'Секция 5-2: infer и паттерны, которые он открывает'),
        L('Chapter 10: typing React, DOM and third-party code', 'Глава 10: типизация React, DOM и стороннего кода'),
      ],
    },
    {
      id: 'ts-ch5-s4',
      title: L('Recursive conditional types', 'Рекурсивные условные типы'),
      body: L(
        'A conditional type can refer to itself, which lets it walk into the structure of a type. DeepReadonly is the canonical example: the type maps over the keys of T and applies itself to the type of every property, so the recursion goes as deep as the data goes. The recursion terminates because the type shrinks at every step, and the compiler checks that a concrete type does not expand forever.\n\nTypeScript 4.1 made recursive conditional types possible, and later releases added tail call elimination for them so deep structures do not exhaust the instantiation depth. Even so, every level of the recursion is a separate instantiation the compiler has to check, and the cost is paid again at every use site. A recursive type over a structure that is never recursive in your data is pure waste.\n\nThe same machinery types a JSON value. A JSON payload is a string, a number, a boolean, null, an array of JSON values or an object of JSON values, which is a union that refers to itself twice. Writing that type is easy; the harder part is the parser that produces it, because the compiler will not verify the runtime shape for you.\n\nRecursion is also where type-level programming starts to look like a second language. A parser, a type-safe builder or a router matcher written this way is impressive and nearly impossible to review. The rule of thumb is that a recursive type earns its place when the shape it describes is genuinely recursive and you want the compiler to enforce it everywhere; otherwise a flat interface plus a runtime check is clearer and cheaper.',
        'Условный тип может ссылаться на себя, и это позволяет ему заходить внутрь структуры типа. Канонический пример — DeepReadonly: тип отображается по ключам T и применяет себя к типу каждого свойства, поэтому рекурсия уходит ровно на ту глубину, на которую уходят данные. Рекурсия заканчивается, потому что на каждом шаге тип уменьшается, а компилятор проверяет, что конкретный тип не развернётся бесконечно.\n\nВ TypeScript 4.1 рекурсивные условные типы стали возможны, а позже к ним добавили устранение хвостовых вызовов, чтобы глубокие структуры не исчерпывали предел инстанциаций. Тем не менее каждый уровень рекурсии — отдельная инстанциация, которую компилятор должен проверить, и платится эта цена снова на каждом месте использования. Рекурсивный тип над структурой, которая в ваших данных никогда не бывает рекурсивной, — чистая трата.\n\nТа же машинария типизирует значение JSON. JSON-полезная нагрузка — это строка, число, булево значение, null, массив JSON-значений или объект из JSON-значений, то есть объединение, которое дважды ссылается на себя. Написать такой тип просто, а вот парсер, который его производит, — уже сложнее, потому что компилятор не проверит для вас форму значения во время выполнения.\n\nРекурсия — это ещё и место, где программирование на уровне типов начинает выглядеть как второй язык. Парсер, типобезопасный билдер или сопоставитель маршрутов, написанные так, впечатляют и почти не поддаются ревью. Правило звучит так: рекурсивный тип оправдан, когда описываемая форма действительно рекурсивна и вы хотите, чтобы компилятор следил за ней везде; иначе плоский интерфейс плюс проверка во время выполнения понятнее и дешевле.'
      ),
      bullets: [
        L('A conditional type may reference itself to walk into a structure.', 'Условный тип может ссылаться на себя, чтобы заходить внутрь структуры.'),
        L('The recursion terminates because the type shrinks at every step.', 'Рекурсия заканчивается, потому что на каждом шаге тип уменьшается.'),
        L('Recursive conditional types landed in TypeScript 4.1.', 'Рекурсивные условные типы появились в TypeScript 4.1.'),
        L('Every level of recursion is checked again at every use site.', 'Каждый уровень рекурсии проверяется заново на каждом месте использования.'),
        L('A recursive type over non-recursive data is wasted compiler time.', 'Рекурсивный тип над нерекурсивными данными — потраченное время компилятора.'),
      ],
      code: `type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : { readonly [K in keyof T]: DeepReadonly<T[K]> };

type Config = {
  server: { port: number; tags: string[] };
};

// Frozen['server'] is { readonly port: number; readonly tags: readonly string[] }
type Frozen = DeepReadonly<Config>;`,
      table: {
        caption: L('What a recursive type costs', 'Во что обходится рекурсивный тип'),
        headers: [L('Concern', 'Что важно'), L('Flat type', 'Плоский тип'), L('Recursive type', 'Рекурсивный тип')],
        rows: [
          [L('Compiler work', 'Работа компилятора'), L('checked once', 'проверяется один раз'), L('checked at every nesting level', 'проверяется на каждом уровне вложенности')],
          [L('Readability', 'Читаемость'), L('readable on one screen', 'читается на одном экране'), L('needs a diagram', 'нужна схема')],
          [L('Where an error appears', 'Где появляется ошибка'), L('at the definition', 'у определения'), L('at the use site, far away', 'на месте использования, далеко от определения')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The instantiation limit', 'Предел числа инстанциаций'),
          text: L(
            'A recursive type applied to a self-referential structure can exceed the depth the compiler allows, and the error points at the type rather than at the data that triggered it. Keep the recursion tied to the shapes your data really has.',
            'Рекурсивный тип, применённый к самоссылающейся структуре, может превысить допустимую глубину, и ошибка укажет на тип, а не на данные, которые её вызвали. Держите рекурсию привязанной к тем формам, которые реально есть в ваших данных.'
          ),
        },
      ],
      takeaway: L(
        'Write a recursive type only when the data is genuinely recursive, otherwise a flat type plus a runtime check is cheaper and clearer.',
        'Пишите рекурсивный тип, только когда данные действительно рекурсивны, иначе плоский тип плюс проверка во время выполнения дешевле и понятнее.'
      ),
      seeAlso: [
        L('Section 4-2: mapped types and their modifiers', 'Секция 4-2: отображаемые типы и их модификаторы'),
        L('Section 5-5: where type-level programming stops paying off', 'Секция 5-5: где программирование на уровне типов перестаёт окупаться'),
        L('Chapter 6: branded types and safe APIs', 'Глава 6: брендированные типы и безопасные API'),
      ],
    },
    {
      id: 'ts-ch5-s5',
      title: L('Where type-level programming stops paying off', 'Где программирование на уровне типов перестаёт окупаться'),
      body: L(
        'Type-level programming has a real cost, and the cost is not visible in the code you write. Every conditional type, every mapped type and every generic instantiation is work the compiler does on every save, on every build and in every editor session. The work grows with the size of the union being mapped and with the depth of the recursion, so the same type that is instant on a toy example can be slow on a real domain model.\n\nReadability is the second cost. A type that needs a paragraph of explanation to understand is a type that every future reader has to re-derive, and it will be simplified away by someone under deadline. The types that hold a codebase together are the ones a reviewer can read at a glance: a union of variants with a discriminant, an interface with a handful of fields, a generic function with a clear constraint.\n\nBefore you reach for a recursive conditional type, check whether a plain union or an interface with a discriminator does the same job. Modelling a request as a union of concrete variants gives you exhaustive checking, error messages that name the variant and no compiler cost at all. The type-level version usually adds flexibility nobody asked for and a maintenance burden everybody inherits.\n\nThe rule is simple: do not build a domain specific language inside the type system. Reserve conditional types for the cases where the type itself must be computed, such as extracting a return type from a function signature or deriving a name from a literal, and let the runtime handle the rest. A type that describes the shapes your program accepts is useful; a type that simulates the program is a second implementation you have to keep correct.',
        'Программирование на уровне типов имеет настоящую цену, и эта цена не видна в написанном коде. Каждый условный тип, каждый отображаемый тип и каждая инстанциация дженерика — это работа, которую компилятор делает при каждом сохранении, при каждой сборке и в каждой сессии редактора. Объём растёт вместе с размером отображаемого объединения и с глубиной рекурсии, поэтому один и тот же тип на учебном примере мгновенный, а на реальной доменной модели — медленный.\n\nВторой ценой является читаемость. Тип, для понимания которого нужен абзац объяснения, — это тип, который каждому будущему читателю приходится выводить заново, и рано или поздно его упростят под дедлайном. Кодовую базу держат те типы, которые ревьюер читает с одного взгляда: объединение вариантов с дискриминантом, интерфейс с несколькими полями, дженерик-функция с ясным ограничением.\n\nПрежде чем браться за рекурсивный условный тип, проверьте, не справится ли обычное объединение или интерфейс с дискриминантом. Модель запроса как объединение конкретных вариантов даёт исчерпывающую проверку, сообщения об ошибках, которые называют вариант, и вообще не стоит ничего на этапе компиляции. Версия на уровне типов обычно добавляет гибкость, которой никто не просил, и груз сопровождения, который достаётся всем.\n\nПравило простое: не стройте предметный язык внутри системы типов. Оставляйте условные типы для случаев, когда тип действительно нужно вычислить, например чтобы извлечь тип возвращаемого значения из сигнатуры функции или получить имя из литерала, а остальное отдайте среде выполнения. Тип, описывающий формы, которые принимает программа, полезен; тип, имитирующий саму программу, — это вторая реализация, которую нужно поддерживать корректной.'
      ),
      bullets: [
        L('Every type level computation is repeated on every save and every build.', 'Каждое вычисление на уровне типов повторяется при каждом сохранении и каждой сборке.'),
        L('Cost grows with the size of the union and the depth of the recursion.', 'Цена растёт с размером объединения и глубиной рекурсии.'),
        L('A union with a discriminant gives exhaustive checks with no compiler cost.', 'Объединение с дискриминантом даёт исчерпывающие проверки без цены на этапе компиляции.'),
        L('A type that needs a paragraph of explanation will be simplified away.', 'Тип, требующий абзаца объяснения, рано или поздно упростят.'),
        L('Use type level computation only when the type itself must be computed.', 'Используйте вычисления на уровне типов только тогда, когда тип действительно нужно вычислить.'),
      ],
      code: `// The typed version costs the compiler more on every use
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// The plain version answers the same question for the app that exists
interface Draft {
  title?: string;
  tags?: string[];
}

// If the shape is known, write the shape
function publish(draft: Draft): { ok: boolean } {
  return { ok: Boolean(draft.title) };
}`,
      table: {
        caption: L('Reach for a type level solution only when', 'Когда стоит переходить к решению на уровне типов'),
        headers: [L('Situation', 'Ситуация'), L('Prefer', 'Выбирайте')],
        rows: [
          [L('The type must be computed from another type', 'Тип нужно вычислить из другого типа'), L('conditional types and infer', 'условные типы и infer')],
          [L('The variants are known and closed', 'Варианты известны и закрыты'), L('a union with a discriminant', 'объединение с дискриминантом')],
          [L('The shape is known but large', 'Форма известна, но сложна'), L('an interface plus a runtime check', 'интерфейс и проверка во время выполнения')],
          [L('The value comes from outside', 'Значение приходит извне'), L('unknown plus a parser', 'unknown и парсер')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Measure the cost, do not guess it', 'Цену измеряют, а не угадывают'),
          text: L(
            'The compiler reports the work it did with the diagnostics flag, and the editor shows the check time in its status bar when it climbs. If a type pushes the check time up, the fix is almost always a smaller type rather than a cleverer one.',
            'Компилятор рассказывает об объёме работы через флаг диагностики, а редактор показывает время проверки в строке состояния, когда оно растёт. Если тип поднимает время проверки, исправление почти всегда — меньший тип, а не более хитрый.'
          ),
        },
      ],
      takeaway: L(
        'If a union or an interface can express the model, use it, because type level cleverness shows up in build times and review time.',
        'Если модель выражается объединением или интерфейсом, используйте их: хитрость на уровне типов оплачивается временем сборки и временем ревью.'
      ),
      seeAlso: [
        L('Section 5-4: recursive conditional types', 'Секция 5-4: рекурсивные условные типы'),
        L('Chapter 9: tsconfig and strictness', 'Глава 9: tsconfig и строгость'),
        L('Section 3-4: generic functions and inference', 'Секция 3-4: дженерик-функции и вывод типов'),
      ],
    },
  ],
};
