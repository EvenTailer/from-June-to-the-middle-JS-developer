import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const typescriptChapters: Chapter[] = [
  {
    id: 'ts-ch1',
    title: L('The Type System: Foundations', 'Система типов: основы'),
    summary: L(
      'How TypeScript types the runtime, why inference is usually better than annotation, and how narrowing turns a broad type into a precise one.',
      'Как TypeScript типизирует рантайм, почему вывод типов обычно лучше аннотации и как сужение превращает широкий тип в точный.'
    ),
    sections: [
      {
        id: 'ts-ch1-s1',
        title: L('Primitives, inference and annotations', 'Примитивы, вывод типов и аннотации'),
        body: L(
          'TypeScript adds a static type layer on top of JavaScript. The runtime stays plain JavaScript: types are erased during compilation, so a type error stops the program from being built rather than making it misbehave in production. The primitives are the ones you already know: string, number, boolean, bigint, symbol, plus the two special ones, undefined and null. Everything else, arrays, objects, functions and tuples, is built from those pieces.\n\nAn annotation states the type you expect; inference derives it from the value. Prefer inference wherever it is precise enough, because it keeps the code short and never drifts out of sync with the initialiser. Annotate when the annotation carries information the value cannot: an empty array, a value that starts as null but will later hold an object, or a function parameter, whose type is decided by the caller.\n\nThe exception is the public API. An exported function with untyped parameters infers them from the body, which usually widens them to something too permissive, and the caller gets no error when the contract is broken. When an annotation contradicts the value, TypeScript reports both and refuses to compile: an annotation is not a cast, and it is not a promise the compiler keeps on your behalf.',
          'TypeScript добавляет к JavaScript статический слой типов. Во время выполнения это по-прежнему обычный JavaScript: типы стираются при компиляции, поэтому ошибка типа мешает собрать программу, а не заставляет её вести себя неправильно в проде. Примитивы — те же, что и в JavaScript: string, number, boolean, bigint, symbol, плюс два особых, undefined и null. Всё остальное — массивы, объекты, функции, кортежи — строится из них.\n\nАннотация называет ожидаемый тип, вывод определяет его по значению. Выводу стоит доверять там, где он достаточно точен: код остаётся коротким, а тип не может разойтись с инициализатором. Аннотируйте там, где тип несёт информацию, которой нет в самом значении: пустой массив, значение, начинающееся с null и позже содержащее объект, либо параметр функции, тип которого определяет вызывающий.\n\nИсключение — публичный API. Экспортированная функция с неаннотированными параметрами выводит их из тела, и обычно тип расширяется до чего-то слишком свободного, а вызывающий не получает ошибки, когда контракт нарушен. Если аннотация противоречит значению, TypeScript сообщает об обеих проблемах и отказывается компилировать: аннотация — не приведение типа и не обещание, которое компилятор будет выполнять за вас.'
        ),
        bullets: [
          L('Types are erased at compile time; the browser still runs plain JavaScript.', 'Типы стираются на этапе компиляции; в браузере выполняется обычный JavaScript.'),
          L('Let inference do the work, but annotate the parameters of exported functions.', 'Доверяй выводу типов, но аннотируй параметры экспортируемых функций.'),
          L('An annotation that contradicts the value is a compile error, not a cast.', 'Аннотация, противоречащая значению, — это ошибка компиляции, а не приведение типа.'),
          L('never and unknown describe the two edges of the type system.', 'never и unknown описывают два края системы типов.'),
        ],
        code: `const username = 'ada';                 // string
const age = 36;                         // number
const active = true;                    // boolean

function greet(name: string, times = 1): string {
  return name.repeat(times);
}

// the annotation adds information the value cannot carry
let cache: Map<string, User> | null = null;`,
        takeaway: L(
          'Types are a compile-time contract, so annotate exactly where inference cannot express the intent.',
          'Типы — это контракт на этапе компиляции, поэтому аннотируй ровно там, где вывод не передаёт замысел.'
        ),
      },
      {
        id: 'ts-ch1-s2',
        title: L('Widening, literal types and unions', 'Расширение типов, литералы и объединения'),
        body: L(
          'A literal type describes one exact value: the type of "admin" is "admin", not string. When you declare a variable with let, the compiler remembers the literal but widens it to the base type, because the variable may later hold anything of that type. A const variable keeps the literal, because its binding cannot be reassigned. Properties widen too, unless the object is frozen with as const.\n\nWidening exists for a reason: it models the fact that a mutable variable really can change. The classic failure mode is a status field typed as plain string: every value is accepted and no switch is checked. Declare the field as a union of string literals and the compiler verifies every assignment and switch. A switch over a union without a default is checked for exhaustiveness, so a new status turns every incomplete switch into a compile error, not a runtime surprise.\n\nA union describes a value that may be one of several types. Reading a property that exists on only one member of the union is an error until the compiler proves which member is in hand, and that proof is narrowing. Unions also model absence: string | null and string | undefined say a value may not be there, and an optional property adds undefined to its type.',
          'Литеральный тип описывает одно конкретное значение: тип "admin" — это "admin", а не string. Когда переменная объявлена через let, компилятор помнит литерал, но расширяет его до базового типа: переменная впоследствии может содержать что угодно этого типа. Переменная через const сохраняет литерал, потому что её привязку нельзя переприсвоить. То же правило касается свойств — они тоже расширяются, если объект не заморожен через as const.\n\nРасширение типов существует не само по себе: оно отражает реальность, что изменяемая переменная действительно может измениться. Классическая беда — поле статуса, описанное обычным string: подходит любое значение, и ни один switch не проверяется. Объяви поле как объединение строковых литералов, и компилятор проверит и каждое присваивание, и каждый switch. Switch по объединению без default проверяется на полноту, поэтому добавление нового статуса превращает каждый неполный switch в ошибку компиляции, а не в сюрприз во время выполнения.\n\nОбъединение описывает значение, которое может быть одним из нескольких типов. Обращение к свойству, которое есть только у одного участника объединения, — ошибка, пока компилятор не докажет, какой участник перед ним; это доказательство и называется сужением. Объединения описывают и отсутствие значения: string | null и string | undefined говорят, что значения может не быть, а необязательное свойство само добавляет undefined к своему типу.'
        ),
        bullets: [
          L('let widens a literal to its base type, const keeps it.', 'let расширяет литерал до базового типа, const сохраняет.'),
          L('as const makes an object deeply readonly with literal types.', 'as const делает объект глубоко неизменяемым, с литеральными типами.'),
          L('A union of string literals models a closed set of states.', 'Объединение строковых литералов моделирует закрытый набор состояний.'),
          L('An optional property adds undefined to its type on its own.', 'Необязательное свойство само добавляет undefined к своему типу.'),
        ],
        code: `type Status = 'idle' | 'loading' | 'done';

const role = 'admin';              // 'admin' — const keeps the literal
let currentRole = 'admin';         // string — let widens it

const config = { retries: 3, tag: 'x' } as const;
// { readonly retries: 3; readonly tag: 'x' }

function render(status: Status) {
  switch (status) {
    case 'idle': return 'Waiting';
    case 'loading': return 'Loading';
    case 'done': return 'Finished';
  }
}`,
        takeaway: L(
          'Constrain a variable to a union of literals whenever the value belongs to a known, closed set of states.',
          'Ограничивай переменную объединением литералов, когда значение принадлежит известному закрытому набору состояний.'
        ),
      },
      {
        id: 'ts-ch1-s3',
        title: L('Narrowing, unknown and any', 'Сужение, unknown и any'),
        body: L(
          'Narrowing is how the compiler reduces a broad type to a more specific one using the shape of the code. A type guard in an if statement narrows a union inside the branch, and the else branch narrows the remainder. typeof checks, instanceof checks, the in operator and truthiness tests all narrow. A return type that is a type predicate promises the narrowed type inside the branch.\n\nany turns the checker off for that value: everything is assignable to it and it is assignable to everything. It is the escape hatch you reach for in a hurry, and it spreads quietly, because one any in a signature infects every value that flows through it. unknown is the opposite: everything is assignable to unknown, but nothing is assignable from unknown except unknown itself.\n\nnever appears where no value can exist: a function that always throws has the return type never, and an exhaustive switch ends with a branch assigning the parameter to never, which proves every case is covered. The price of unknown is a few lines of narrowing at the edges; mistakes stop at the edge instead of travelling through the whole application.',
          'Сужение — это процесс, при котором компилятор сужает широкий тип до более конкретного, опираясь на форму кода. Проверка типа в if сужает объединение внутри ветки, а ветка else сужает остаток. Сужают проверки typeof, instanceof, оператор in, проверки на истинность и равенство литералу. Сужать умеют и ваши собственные функции: если тип возвращаемого значения — предикат типа, функция обещает, что внутри ветки if значение имеет более узкий тип.\n\nany выключает проверку для этого значения: в него можно положить что угодно, и его самого можно положить куда угодно. Это аварийный выход, за который хватаются в спешке, и он тихо расползается: одно any в сигнатуре заражает все значения, проходящие через неё. unknown устроен наоборот: это верхний тип, в него можно положить что угодно, но из него нельзя положить ничего, кроме самого unknown. Прежде чем его использовать, нужно сузить — ровно та проверка, которую вы пропускали с any.\n\nnever появляется там, где значения не существует. У функции, которая всегда бросает исключение, тип возврата never, а исчерпывающий switch заканчивается веткой, присваивающей параметру never, — это доказывает компилятору, что покрыты все случаи. Разница между any и unknown — это разница между кодовой базой, которая проверяет свои границы, и той, что надеется на хорошие данные. Цена unknown — несколько лишних строк сужения на границах; выгода — ошибка останавливается на границе, а не разносится по всему приложению.'
        ),
        bullets: [
          L('any disables checking, unknown demands narrowing before use.', 'any отключает проверку, unknown требует сужения перед использованием.'),
          L('A type predicate tells the compiler about a rule it cannot infer.', 'Предикат типа сообщает компилятору правило, которое тот вывести не может.'),
          L('never in an exhaustive switch proves that every case is covered.', 'never в исчерпывающем switch доказывает, что покрыты все случаи.'),
          L('Treat everything that comes from outside the program as unknown.', 'Считай всё, что приходит извне программы, значением типа unknown.'),
        ],
        code: `function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}

function handle(payload: unknown) {
  if (!isUser(payload)) {
    throw new Error('bad payload');
  }
  // payload is narrowed to User here
}`,
        takeaway: L(
          'Treat every value from the outside world as unknown and narrow it once, at the boundary.',
          'Считай любое внешнее значение значением типа unknown и сужай его один раз — на границе.'
        ),
      },
    ],
  },
  {
    id: 'ts-ch2',
    title: L('Structural Typing', 'Структурная типизация'),
    summary: L(
      'Why compatibility in TypeScript is decided by shape, when to use an interface and when a type alias, and how generics keep the relation between input and output.',
      'Почему совместимость в TypeScript решается формой, когда брать интерфейс, а когда алиас типа, и как generics сохраняют связь между входом и выходом.'
    ),
    sections: [
      {
        id: 'ts-ch2-s1',
        title: L('Object types, interfaces and type aliases', 'Объектные типы, интерфейсы и алиасы типов'),
        body: L(
          'TypeScript checks the structure of a value, not its name. Two object types are compatible when one has all the properties of the other with compatible types, and extra properties are allowed. A function that takes { x: number } accepts an object with x, y and z: the extra fields change nothing. This is structural typing, the opposite of nominal typing, where a type carries an identity and a class instance is not interchangeable with a plain object.\n\nAn interface declares an object type, can be extended with extends and merged with other declarations of the same name. A type alias declares any type, including a union, a tuple or a mapped type, and cannot be extended or merged. The difference is narrow but real: interfaces suit shapes that will be extended or implemented, type aliases suit everything else, unions and intersections. Declaration merging is where interfaces still earn their keep.\n\nOptional properties and index signatures describe flexibility. A question mark makes a property optional and adds undefined to its type, so the compiler forces you to check before reading. An index signature, [key: string]: unknown, allows any extra keys with a declared value type, and types a dictionary without falling back to any. Such a type loses the excess property check, a trade to make deliberately.',
          'TypeScript проверяет форму значения, а не его имя. Два объектных типа совместимы, если у одного есть все свойства другого с совместимыми типами, а лишние свойства разрешены. Функция, принимающая { x: number }, примет объект с x, y и z, потому что лишние поля ничего не меняют. Это и называется структурной типизацией — противоположностью номинальной, где у типа есть идентичность и экземпляр класса никогда не взаимозаменяем с обычным объектом с теми же полями.\n\nИнтерфейс объявляет объектный тип, его можно расширять через extends и сливать с другими объявлениями с тем же именем. Алиас типа объявляет любой тип вообще: объединение, кортеж, mapped-тип, — но его нельзя расширить или слить. Практическая разница невелика, но реальна: интерфейсы лучше для объектных форм, которые будут расширять или реализовывать, а алиасы — для всего остального, в первую очередь для объединений и пересечений. Слияние объявлений — единственная причина, по которой интерфейсы до сих пор незаменимы.\n\nНеобязательные свойства и сигнатуры индекса описывают гибкость. Знак вопроса делает свойство необязательным и добавляет undefined к его типу, так что компилятор заставит проверить наличие перед чтением. Сигнатура индекса, записанная как [key: string]: unknown, разрешает любые дополнительные ключи с объявленным типом значения, и это правильный способ типизировать словарь без отката к any. Тип с сигнатурой индекса теряет проверку лишних свойств, и этот размен стоит делать осознанно и понемногу.'
        ),
        bullets: [
          L('Compatibility is structural: the shape decides, the name does not.', 'Совместимость структурная: решает форма, а не имя.'),
          L('Interfaces extend and merge; type aliases describe unions and intersections.', 'Интерфейсы расширяются и сливаются; алиасы описывают объединения и пересечения.'),
          L('An index signature needs a value type, and unknown is the safe default.', 'Сигнатуре индекса нужен тип значения, и unknown — безопасный выбор по умолчанию.'),
          L('Optional properties make the compiler ask whether the value is there.', 'Необязательные свойства заставляют компилятор спрашивать, есть ли значение.'),
        ],
        code: `interface Point { x: number; y: number }
interface Point3D extends Point { z: number }

type Id = string | number;

const shape: { x: number } = { x: 1, y: 2 };  // extra fields are fine

interface Config {
  [key: string]: unknown;
  name: string;
}`,
        takeaway: L(
          'Prefer interfaces for extendable object shapes and type aliases for unions, intersections and everything else.',
          'Бери интерфейсы для расширяемых форм объектов, а алиасы — для объединений, пересечений и всего остального.'
        ),
      },
      {
        id: 'ts-ch2-s2',
        title: L('Excess property checks and index signatures', 'Проверка лишних свойств и сигнатуры индекса'),
        body: L(
          'Structural typing has one deliberate exception: the excess property check. When you write an object literal directly where a typed value is expected, TypeScript rejects the properties the target type does not declare. Object literals are the most common source of typos, and a misspelled name would otherwise be silently ignored. The check applies only to fresh object literals, so a variable built earlier and passed in escapes it: the same shape can be accepted in one place and rejected in another.\n\nAn index signature relaxes this: a type with [key: string]: unknown accepts any key, so the excess property check has nothing to compare against and the literal passes. This is convenient for dictionary-like data such as feature flags, and dangerous for the same reason: a misspelled property becomes a value of type unknown instead of an error.\n\nTwo ways keep safety and flexibility. The first is to declare the extra properties explicitly, even as optional ones, so the shape is checked. The second is a generic with a constraint, so the compiler infers the exact shape of the object the caller passed and keeps it. That second version is the tool for a helper that takes an object and returns an object of the same shape: it preserves what the caller provided instead of widening it away.',
          'У структурной типизации есть одно намеренное исключение — проверка лишних свойств. Когда литерал объекта пишется прямо там, где ожидается типизированное значение, TypeScript отвергает свойства, которых нет в целевом типе. Проверка нужна потому, что литералы объектов — главный источник опечаток, а опечатка в имени свойства иначе молча игнорировалась бы. Проверка действует только на свежие литералы: переменная, собранная раньше и переданная позже, её избегает, поэтому одна и та же форма может быть принята в одном месте и отвергнута в другом.\n\nСигнатура индекса это послабление. Тип с [key: string]: unknown принимает любой ключ, сравнивать больше нечего, и литерал проходит. Это удобно для данных, похожих на словарь, скажем для набора флагов или таблицы переводов, и опасно по той же причине: опечатка в имени свойства превращается в значение типа unknown вместо ошибки.\n\nСохранить и безопасность, и гибкость можно двумя способами. Первый — объявить лишние свойства явно, даже как необязательные, чтобы форма была задокументирована и проверялась. Второй — использовать generic с ограничением и mapped-тип, чтобы компилятор вывел точную форму переданного объекта и сохранил её. Второй путь и есть инструмент для хелперов, которые принимают объект и возвращают объект той же формы: он сохраняет информацию вызывающего, а не расширяет её в generic.',
        ),
        bullets: [
          L('The excess property check applies to fresh object literals only.', 'Проверка лишних свойств действует только на свежие литералы объектов.'),
          L('An index signature removes the excess property check for that type.', 'Сигнатура индекса отключает проверку лишних свойств для этого типа.'),
          L('unknown as the index value type keeps the data usable but untyped.', 'unknown как тип значения индекса оставляет данные пригодными, но не типизированными.'),
          L('A generic parameter preserves the exact shape of the object passed in.', 'Generic-параметр сохраняет точную форму переданного объекта.'),
        ],
        code: `interface Options { retries: number; timeout?: number }

const bad: Options = { retries: 3, retries2: 5 };  // error: excess property

const dict: Record<string, unknown> = { anything: 1 };

function pick<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
        takeaway: L(
          'Object literals get an extra safety check, but a bag of dynamic keys needs an explicit index signature.',
          'Литералы объектов получают дополнительную проверку, но для набора динамических ключей нужна явная сигнатура индекса.'
        ),
      },
      {
        id: 'ts-ch2-s3',
        title: L('Generic functions', 'Generic-функции'),
        body: L(
          'A generic is a type parameter standing for a type chosen by the caller. Instead of a function that returns an any array or takes an unknown parameter, you write one that keeps the relation between input and output. The relation is the point: returning T[] for a T argument loses nothing, and returning the first element has the type T | undefined, because an empty array is possible.\n\nType parameters are inferred from the arguments, so most call sites need no explicit argument. When inference fails or comes out too wide, name the type argument, or use a constraint to require a shape: T extends { id: string } means the type must have an id. Constraints work in the return type too, which is how a function promises to give back the same type it received.\n\nGeneric functions are how you write code that stays useful as the application grows. A mapper that returns the same type as its input, a fetcher that returns the exact payload type, a reducer that keeps the discriminated union of the state: all of them work without a cast, and all give the caller a compile error the moment the contract drifts. The cost is a learning curve: deeply nested generics become harder to read than the any they replaced.',
          'Generic — это параметр типа на месте конкретного, выбираемого вызывающим. Вместо функции, возвращающей массив any или принимающей параметр unknown, вы пишете одну функцию, которая сохраняет связь между входом и выходом. Именно связь и есть главное: результат T[] для аргумента типа T не теряет ничего, а первый элемент массива имеет тип T | undefined, потому что пустой массив возможен.\n\nПараметры типа выводятся из аргументов, поэтому в большинстве мест вызова указывать их явно не нужно. Если вывод не срабатывает или получается слишком широким, тип можно назвать явно, а можно задать ограничение по форме: T extends { id: string } означает, что у типа обязательно есть id. Ограничения используются и в типе возврата — так функция обещает вернуть тот же тип, который получила.\n\nGeneric-функции — это способ писать код, который остаётся полезным по мере роста приложения. Маппер, возвращающий тип своего аргумента, загрузчик, отдающий точный тип полезной нагрузки, reducer, хранящий различающееся объединение состояния, — все они работают без единого приведения типа и дают вызывающему ошибку компиляции, как только контракт разъезжается. Цена — порог входа, а при слишком глубокой вложенности generic-типов код становится читаемее, чем заменённый ими any.'
        ),
        bullets: [
          L('A generic preserves the relation between the input and the output types.', 'Generic сохраняет связь между типами входа и выхода.'),
          L('Type arguments are inferred from the call site.', 'Параметры типа выводятся из места вызова.'),
          L('A constraint states the minimum shape a type must have.', 'Ограничение задаёт минимальную форму типа.'),
          L('Deeply nested generics cost more in readability than they save.', 'Слишком вложенные generic-типы дороже по читаемости, чем экономят.'),
        ],
        code: `function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const names = pluck(users, 'name');   // string[]`,
        takeaway: L(
          'When a helper has to work with many types but keep their relation, write a generic instead of reaching for any.',
          'Если хелпер должен работать со многими типами, сохраняя их связь, напиши generic вместо any.'
        ),
      },
    ],
  },
  {
    id: 'ts-ch3',
    title: L('Type-Level Programming', 'Программирование на уровне типов'),
    summary: L(
      'How the compiler computes types: mapped types, conditional types, infer, template literal types, and the branded types that make impossible states unrepresentable.',
      'Как компилятор вычисляет типы: mapped-типы, условные типы, infer, template literal-типы и брендированные типы, делающие невозможные состояния непредставимыми.'
    ),
    sections: [
      {
        id: 'ts-ch3-s1',
        title: L('keyof, mapped types and utility types', 'keyof, mapped-типы и utility-типы'),
        body: L(
          'TypeScript can compute types from other types. The operator keyof takes an object type and produces the union of its keys, typeof takes a value and produces its type, and indexed access T[K] takes the type of a property. A mapped type walks over a union of keys and produces a new object type, transforming every property on the way. This is the machinery behind the utility types of the standard library.\n\nThe common pattern is a mapped type over keyof T with a modifier. Adding readonly to every property of T gives Readonly<T>, adding a question mark gives Partial<T>, and combining them gives a type where every property is optional and immutable. The standard library already ships these, and you should reach for them before writing your own. What they share is the idea of a type-level function: an input, a transformation and an output, all evaluated at compile time.\n\nMapped types also let you rewrite names. The key remapping clause, supported since TypeScript 4.1, changes the key as well as the value, which is how you build a getter and setter pair for every field. The limitation is that a mapped type computes over a finite set of keys, so it does not work with infinite key spaces such as string.',
          'TypeScript умеет вычислять типы по другим типам. Оператор keyof берёт объектный тип и даёт объединение его ключей, typeof берёт значение и даёт его тип, а индексированный доступ T[K] — тип свойства. Над всем этим построен mapped-тип: он проходит по объединению ключей и строит новый объектный тип, преобразуя каждое свойство по дороге. Это и есть механизм, на котором построены utility-типы стандартной библиотеки, и именно так библиотека меняет форму целого семейства объектов одной строкой.\n\nТипичный приём — mapped-тип по keyof T с модификатором. Добавление readonly к каждому свойству T даёт Readonly<T>, добавление знака вопроса даёт Partial<T>, а вместе они дают тип, где каждое свойство необязательное и неизменяемое. В стандартной библиотеке всё это уже есть: Partial, Required, Readonly, Pick, Omit, Record и ReturnType, — и брать их нужно раньше, чем писать свои. Общее у них одно: идея функции на уровне типов, где есть вход, преобразование и выход, и всё вычисляется на этапе компиляции.\n\nMapped-типы умеют и переименовывать. Ремаппинг ключей, поддерживаемый с TypeScript 4.1, меняет ключ вместе со значением — так строят пары геттеров и сеттеров для каждого поля. Ограничение, о котором стоит помнить: mapped-тип вычисляется по конечному набору ключей, поэтому не работает с бесконечными пространствами ключей вроде string, а большой объект, замороженный через as const, даёт настолько тяжёлый тип, что компилятор замедляется.'
        ),
        bullets: [
          L('keyof produces a union of keys, typeof produces the type of a value.', 'keyof даёт объединение ключей, typeof — тип значения.'),
          L('A mapped type computes a new object type from the keys of another.', 'Mapped-тип вычисляет новый объектный тип по ключам другого.'),
          L('Reach for the built-in utility types before writing your own.', 'Бери встроенные utility-типы раньше, чем пишешь свои.'),
          L('Key remapping renames as well as transforms the value.', 'Ремаппинг ключей переименовывает, а не только преобразует значение.'),
        ],
        code: `type User = { id: string; name: string; email: string };

type UserPatch = Partial<Omit<User, 'id'>>;
type Names = Record<keyof User, string>;

// remap the keys
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
        takeaway: L(
          'Mapped types are type-level functions: input, transformation and output, all resolved at compile time.',
          'Mapped-типы — это функции на уровне типов: вход, преобразование и выход, всё вычисляется на этапе компиляции.'
        ),
      },
      {
        id: 'ts-ch3-s2',
        title: L('Conditional types, infer and template literal types', 'Условные типы, infer и template literal-типы'),
        body: L(
          'A conditional type chooses between two types based on a condition the compiler evaluates. The syntax reads like a ternary: T extends U ? X : Y. Because the condition is a relation between types and not a value, it is resolved when the compiler instantiates the type, and for a generic parameter the result stays unresolved until the type meets a concrete one. This is what makes ReturnType, Parameters and Awaited possible.\n\nThe keyword infer extracts a type from a structure the compiler cannot name directly. Inside the true branch, infer pulls a part out of the checked type, and it can capture several parts at once. Awaited is built exactly this way: it checks whether the type is a promise, infers the value the promise resolves to, and unwraps it, repeating until the type is no longer a promise.\n\nTemplate literal types build strings out of types. Combining a template with a union of literals distributes the union over the template, so a handler name built from Capitalize<Event> produces onClick and onChange for the events click and change. The cost is that these types are computed by the compiler and can become expensive: nested conditionals with infer over large unions slow the type checker, and error messages grow long and hard to read.',
          'Условный тип выбирает между двумя типами по условию, которое вычисляет компилятор. Синтаксис читается как тернарный оператор: T extends U ? X : Y. Поскольку условие — это отношение между типами, а не значение, оно разрешается в момент конкретизации типа, и для обобщённого параметра типа результат остаётся неразрешённым, пока тип не встретит конкретный. Именно так в стандартной библиотеке появляются ReturnType, Parameters и Awaited.\n\nКлючевое слово infer извлекает тип из структуры, которую компилятор не может назвать напрямую. В истинной ветви условного типа infer вытаскивает часть проверяемого типа, причём сразу нескольких частей. Awaited построен ровно так: он проверяет, является ли тип промисом, выводит значение, которое промис разрешает, и разворачивает его, повторяя, пока тип не перестанет быть промисом.\n\nTemplate literal-типы собирают строки из типов. Шаблон в сочетании с объединением литералов распределяет объединение по шаблону, так что имя обработчика, построенное через Capitalize<Event>, даёт onClick и onChange для событий click и change. Это даёт строго типизированные имена обработчиков и типизированные селекторы. Цена в том, что такие типы вычисляет компилятор, и они умеют дорожать: глубоко вложенные условные типы с infer над большими объединениями заметно замедляют проверку типов, а сообщения об ошибках становятся длинными и нечитаемыми. Применяйте их там, где они дают настоящую безопасность, и держите эту машинерию ближе к границам кодовой базы.'
        ),
        bullets: [
          L('A conditional type resolves against a relation between types, not a value.', 'Условный тип вычисляется по отношению типов, а не по значению.'),
          L('infer captures a part of a type inside the true branch.', 'infer захватывает часть типа внутри истинной ветви.'),
          L('Template literal types distribute a union across the template.', 'Template literal-типы распределяют объединение по шаблону.'),
          L('Type-level recursion is powerful but slows the checker and the error messages.', 'Рекурсия на уровне типов мощна, но замедляет проверку и раздувает сообщения об ошибках.'),
        ],
        code: `type Unwrap<T> = T extends Promise<infer U> ? Unwrap<U> : T;
type Result = Unwrap<Promise<string>>;   // string

type Event = 'click' | 'change';
type HandlerName = \`on\${Capitalize<Event>}\`;   // 'onClick' | 'onChange'

type PayloadOf<T> = T extends { payload: infer P } ? P : never;`,
        takeaway: L(
          'Conditional types, infer and template literals are the three tools that let a type describe structure instead of only naming it.',
          'Условные типы, infer и template literal-типы — три инструмента, позволяющих типу описывать структуру, а не только называть её.'
        ),
      },
      {
        id: 'ts-ch3-s3',
        title: L('Branded types and safe APIs', 'Брендированные типы и безопасные API'),
        body: L(
          'The type system can prevent mistakes that plain strings and numbers invite. Two identifiers that are both strings are interchangeable in TypeScript, and a function expecting a user id accepts a post id. A branded type adds a hidden, unique property to a base type, so the two stop being assignable to each other while staying plain strings at runtime. The brand exists only in the type system: it costs nothing and disappears when the value is serialised.\n\nCreating a brand needs a unique symbol, because the property must be impossible to produce by accident. Declaring a const with type unique symbol and intersecting it with the base type gives a type no object literal can satisfy. The usual pattern is a factory function that validates the input and returns the branded type, so the brand can only be obtained through the check.\n\nBranded types shine where the runtime does not protect you: identifiers, units, currency amounts, validated strings. The pattern generalises to a parse function that returns a discriminated result instead of throwing, so the caller must handle the failure branch, and to a validator that narrows unknown input at the boundary. The cost is friction: dozens of brands make a codebase hard to read. A handful of them, on the boundaries that matter, pays for itself.',
          'Система типов умеет предотвращать ошибки, которые провоцируют обычные строки и числа. Два идентификатора, оказавшиеся строками, в TypeScript взаимозаменяемы, и функция, ждущая идентификатор пользователя, спокойно примет идентификатор записи. Брендированный тип добавляет к базовому типу скрытое уникальное свойство, после чего два типа больше не назначаются друг другу, хотя на уровне выполнения остаются обычными строками. Бренд существует только в системе типов: во время выполнения он ничего не стоит и исчезает при сериализации.\n\nСоздание бренда требует unique symbol, потому что свойство должно быть невозможно получить случайно. Объявление const с типом unique symbol и пересечение с базовым типом дают тип, которому не удовлетворяет ни один обычный литерал объекта. Обычная схема — одна фабричная функция, которая выполняет проверку и возвращает брендированный тип, так что бренд можно получить только через неё.\n\nБрендированные типы особенно полезны там, где рантайм не защищает: идентификаторы, единицы измерения, денежные суммы, проверенные строки. Схема обобщается на parse-функцию, которая возвращает различающийся результат вместо исключения, так что вызывающий обязан обработать ветку с ошибкой, и на валидатор, который сужает неизвестный вход в доменный тип на границе системы. Цена — трение: каждая функция, пересекающая границу, должна знать про бренд, а кодовая база с десятками брендов читается плохо. Несколько брендов на тех границах, где это действительно важно, окупают себя.'
        ),
        bullets: [
          L('A brand adds a property that plain values cannot have.', 'Бренд добавляет свойство, которого не может быть у обычных значений.'),
          L('The brand costs nothing at runtime and vanishes on serialisation.', 'Бренд ничего не стоит во время выполнения и исчезает при сериализации.'),
          L('Only the factory function should be able to produce the branded type.', 'Создавать брендированный тип должна только фабричная функция.'),
          L('Use parse functions that return a result object instead of throwing.', 'Используй parse-функции, возвращающие объект результата, а не бросающие исключения.'),
        ],
        code: `declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function toUserId(value: string): UserId {
  if (!value.startsWith('u_')) throw new Error('bad id');
  return value as UserId;
}

function load(id: UserId) { /* only a user id can get here */ }`,
        takeaway: L(
          'A branded type turns a convention into a compile error, and it is worth it for the few values your API must not confuse.',
          'Брендированный тип превращает соглашение в ошибку компиляции — и это окупается для тех немногих значений, которые API не должен путать.'
        ),
      },
    ],
  },
  {
    id: 'ts-ch4',
    title: L('Classes, Modules and Strictness', 'Классы, модули и строгость'),
    summary: L(
      'Class modifiers and declaration merging, how the compiler resolves modules and imports, and the configuration flags that decide how strict the project is.',
      'Модификаторы классов и слияние объявлений, как компилятор разрешает модули и импорты, и флаги конфигурации, задающие строгость проекта.'
    ),
    sections: [
      {
        id: 'ts-ch4-s1',
        title: L('Class modifiers and declaration merging', 'Модификаторы классов и слияние объявлений'),
        body: L(
          'TypeScript classes extend JavaScript classes with a type layer: typed members, visibility modifiers, parameter properties, readonly, abstract and implements. The visibility modifiers are compile-time only: public, protected and private do not change the emitted JavaScript, but they change who may use the class. Private members also become part of the structural type, so a class with one is not compatible with a lookalike.\n\nThe constructor shorthand, called a parameter property, declares and assigns a field in one line: constructor(private readonly repo: Repository) creates the field, marks it private and readonly, and assigns the argument. Abstract classes describe a base class whose details subclasses fill in, and implements checks that a class satisfies an interface without adding to the runtime. A class can implement many interfaces but extend only one, which is why interfaces hold contracts and classes hold implementations.\n\nDeclaration merging is how TypeScript describes a type that grows in pieces: two interface declarations with the same name are merged, a namespace merges with a class of the same name, and a class merges with an interface of the same name, which is how you add types to a class. It is a powerful tool for augmenting library types, and also a way to hide a global side effect, so it belongs in declaration files.',
          'Классы TypeScript расширяют классы JavaScript слоем типов: типизированные члены, модификаторы видимости, parameter properties, readonly, abstract и implements. Модификаторы видимости действуют только на этапе компиляции: public, protected и private не меняют итоговый JavaScript, но меняют круг допустимых пользователей класса. Защищённые и приватные члены дополнительно входят в структурный тип класса, поэтому класс с приватным членом несовместим с объектом, который лишь выглядит так же. Именно это делает private настоящей границей инкапсуляции на уровне типов.\n\nСокращение в конструкторе, называемое parameter property, объявляет и присваивает поле в одной строке: constructor(private readonly repo: Repository) создаёт поле, объявляет его приватным и неизменяемым и присваивает аргумент. Абстрактные методы и абстрактные классы описывают базовый класс, детали которого дополняют наследники, а implements проверяет, что класс удовлетворяет интерфейсу, ничего не добавляя в рантайм. Класс может реализовать много интерфейсов, но наследовать только один класс — обычно именно поэтому контракты держат в интерфейсах, а реализации в классах.\n\nСлияние объявлений — способ описать тип, который растёт по частям: два объявления интерфейса с одинаковым именем сливаются, пространство имён сливается с классом или функцией того же имени, а объявление класса сливается с интерфейсом того же имени — так к классу добавляют типы, не трогая реализацию. Инструмент мощный: он расширяет типы библиотек и разбивает большой тип по файлам, но он же умеет прятать глобальный побочный эффект, поэтому место ему в файлах деклараций, а не в коде приложения.'
        ),
        bullets: [
          L('Visibility modifiers are compile-time only, but they change the type of the class.', 'Модификаторы видимости действуют только на этапе компиляции, но меняют тип класса.'),
          L('A private member makes the class nominally incompatible with a lookalike.', 'Приватный член делает класс номинально несовместимым с похожим объектом.'),
          L('Parameter properties declare, initialise and assign in one line.', 'Parameter properties объявляют, инициализируют и присваивают в одной строке.'),
          L('Declaration merging belongs in declaration files, not in application code.', 'Слияние объявлений уместно в файлах деклараций, а не в коде приложения.'),
        ],
        code: `interface Repository<T> {
  find(id: string): Promise<T | null>;
}

class MemoryRepo<T> implements Repository<T> {
  constructor(private readonly items: Map<string, T>) {}

  async find(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }
}`,
        takeaway: L(
          'Modifiers in TypeScript are promises to other developers, and the compiler enforces them only where the type system can see the boundary.',
          'Модификаторы в TypeScript — это обещания другим разработчикам, и компилятор следит за ними только там, где граница видна в типах.'
        ),
      },
      {
        id: 'ts-ch4-s2',
        title: L('Module resolution and type-only imports', 'Разрешение модулей и импорты только для типов'),
        body: L(
          'A module in TypeScript is a file with imports or exports; everything else is a global script. The compiler finds the file behind a specifier using the moduleResolution setting, and that choice has real consequences for how imports are written. Node resolution looks into node_modules and requires explicit extensions in relative paths, bundler resolution allows extensionless relative imports the way Vite and webpack do, and nodenext follows the rules of the runtime you deploy to.\n\nThe type-only import, written as import type, says that the symbol is needed for typing only and disappears from the emitted JavaScript. It is the correct way to import a type when the import would otherwise create a runtime dependency, for example on a type from a module that pulls in heavy code. With verbatimModuleSyntax enabled this stops being a style choice and becomes a requirement: the compiler refuses an import used only as a type unless it is marked.\n\nThere is also the export type form, which re-exports a type without adding a runtime binding. The practical advice is simple: mark type-only imports explicitly, keep the barrel file of a package free of runtime side effects, and remember that a type import does not create a circular dependency at runtime, which is often why a cycle of type-only imports is harmless.',
          'Модуль в TypeScript — это файл с импортами или экспортами; всё остальное — глобальный скрипт. Компилятор находит файл по спецификатору согласно настройке moduleResolution, и выбор здесь имеет реальные последствия для записи импортов. Node-разрешение смотрит в node_modules и требует явных расширений у относительных путей, разрешение в режиме bundler допускает относительные импорты без расширения, как это делают Vite и webpack, а nodenext следует правилам рантайма, в который вы деплоите.\n\nИмпорт только для типов, записываемый как import type, говорит, что символ нужен исключительно для типизации и исчезает из итогового JavaScript. Это правильный способ импортировать тип, когда иначе возникла бы рантайм-зависимость, например на тип из модуля, который заодно тянет тяжёлый код. С включённым verbatimModuleSyntax это перестаёт быть стилем и становится требованием: компилятор отвергает импорт, использованный только как тип, если тот не помечен.\n\nЕсть ещё форма export type, которая переэкспортирует тип, не добавляя рантайм-связывания, и способ держать типы вне публичной поверхности пакета, используя их внутри. Практический совет прост: помечайте импорты только типов, следите, чтобы barrel-файл пакета не тянул побочные эффекты, и помните, что импорт типа не создаёт циклической зависимости во время выполнения — именно поэтому цикл из импортов только типов обычно безопасен.'
        ),
        bullets: [
          L('A file with imports or exports is a module; everything else is a script.', 'Файл с импортами или экспортами — модуль; всё остальное — скрипт.'),
          L('moduleResolution decides how a specifier maps to a file.', 'moduleResolution определяет, как спецификатор превращается в файл.'),
          L('import type removes the import from the emitted JavaScript.', 'import type убирает импорт из итогового JavaScript.'),
          L('With verbatimModuleSyntax, type-only imports must be marked explicitly.', 'С verbatimModuleSyntax импорты только типов нужно помечать явно.'),
        ],
        code: `import type { ReactNode } from 'react';
import { useMemo } from 'react';

export type { User } from './user';
export { userStore } from './store';

// the emitted JS keeps only the value imports`,
        takeaway: L(
          'Saying that an import is type-only is how you keep the type layer from dragging runtime dependencies into the bundle.',
          'Пометка «импорт только для типов» не даёт слою типов тащить рантайм-зависимости в бандл.'
        ),
      },
      {
        id: 'ts-ch4-s3',
        title: L('tsconfig, strictness and project references', 'tsconfig, строгость и project references'),
        body: L(
          'The compiler is configured through tsconfig.json, and the flag that matters most is strict. It turns on a family of checks at once: noImplicitAny, strictNullChecks, strictFunctionTypes, strictPropertyInitialization, noImplicitThis and alwaysStrict. Enabling strict in a project written without it produces a long list of errors, but each points at a real hole: a value that might be null, a callback parameter whose type was guessed, a property that is never initialised.\n\nThe other useful flags are more specific. noUncheckedIndexedAccess makes reading an array element or a dictionary entry return T | undefined, which removes a whole class of runtime crashes. exactOptionalPropertyTypes stops a property typed T | undefined from being assigned undefined. noImplicitOverride demands the override keyword, and skipLibCheck skips the declaration files in node_modules, which is almost always what you want.\n\nA large codebase is best split into several projects that reference each other, the mechanism called project references. Each package gets its own tsconfig with composite enabled and its own declaration output, and the references array names the projects it depends on. The compiler builds them in order, uses the referenced declarations for checking, and never lets one project reach into the source files of another. Declaration files, the .d.ts extension, are the contract of a library: they say what the package exports without revealing the implementation.',
          'Компилятор настраивается через tsconfig.json, и важнее всего здесь флаг strict. Он включает сразу целое семейство проверок: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis и alwaysStrict. Включение strict в проекте, написанном без него даёт длинный список ошибок, но каждая указывает на настоящую дыру: значение, которое может оказаться null, параметр колбэка с угаданным типом, свойство, которое никогда не инициализируется.\n\nОстальные полезные флаги точечные. noUncheckedIndexedAccess заставляет чтение элемента массива или записи словаря возвращать T | undefined, что убирает целый класс падений во время выполнения. exactOptionalPropertyTypes запрещает присваивать undefined свойству типа T | undefined явно. noImplicitOverride требует ключевое слово override. verbatimModuleSyntax следит за честностью import type. А skipLibCheck пропускает проверку деклараций в node_modules, и это почти всегда то, что нужно: чужие типы редко бывают безупречными.\n\nБольшую кодовую базу лучше разбить на несколько проектов, ссылающихся друг на друга, — механизм project references. Каждый пакет получает свой tsconfig с включённым composite и свой вывод деклараций, а массив references называет проекты, от которых он зависит. Компилятор тогда собирает их по порядку, использует декларации связанных проектов для проверки и не даёт одному проекту залезать в исходники другого. Файлы деклараций с расширением .d.ts — это контракт библиотеки: они говорят, что пакет экспортирует, не раскрывая реализацию, а с включёнными declaration и declarationMap потребитель может перейти от типа к исходному коду.'
        ),
        bullets: [
          L('strict turns on a family of checks that each point at a real hole.', 'strict включает семейство проверок, каждая из которых указывает на реальную дыру.'),
          L('noUncheckedIndexedAccess removes a whole class of runtime crashes.', 'noUncheckedIndexedAccess убирает целый класс падений во время выполнения.'),
          L('Project references let the compiler build and check packages in order.', 'Project references позволяют компилятору собирать и проверять пакеты по порядку.'),
          L('Declaration files describe the public contract without exposing the implementation.', 'Файлы деклараций описывают публичный контракт, не раскрывая реализацию.'),
        ],
        code: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "declaration": true,
    "composite": true,
    "skipLibCheck": true
  },
  "references": [{ "path": "../core" }]
}`,
        takeaway: L(
          'The strictness flags are a specification of what your code promises; enable them early and fix the errors they point at.',
          'Флаги строгости — это спецификация обещаний вашего кода; включите их рано и почините ошибки, на которые они указывают.'
        ),
      },
    ],
  },
];
