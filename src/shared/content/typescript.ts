import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsModule: Module = {
  id: 'typescript',
  title: L('TypeScript', 'TypeScript'),
  description: L('Types, generics, inference, utility types, narrowing.', 'Типы, дженерики, вывод типов, утилитные типы, сужение.'),
  lessons: [
    { id: 'ts-001', title: L('Why TypeScript', 'Зачем TypeScript'), question: L('What is TypeScript and why use it?', 'Что такое TypeScript и зачем он?'), answer: L('TypeScript is JavaScript with static typing. It catches errors at compile time, improves IDE autocomplete and refactoring, documents code via types, and compiles to plain JavaScript. Types are erased at runtime.', 'TypeScript — JavaScript со статической типизацией. Ловит ошибки на этапе компиляции, улучшает автодополнение и рефакторинг в IDE, документирует код через типы и компилируется в обычный JavaScript. Типы стираются в рантайме.'), code: `let x: number = 42;\nx = "oops"; // Error: Type 'string' is not assignable to type 'number'` },
{ id: 'ts-002', title: L('Compiling TS to JS', 'Компиляция TS в JS'), question: L('How does TypeScript become runnable code?', 'Как TypeScript становится исполняемым кодом?'), answer: L('tsc or a fast transpiler (esbuild, swc, tsx) strips type annotations and emits JavaScript. Type checking is separate from emit; types never run.', 'tsc или быстрый транспилятор (esbuild, swc, tsx) удаляет аннотации типов и выдаёт JavaScript. Проверка типов отделена от emit; типы никогда не выполняются.'), code: `// TS\nfunction greet(name: string): string { return "Hi " + name; }\n// emitted JS\nfunction greet(name) { return "Hi " + name; }` },
{ id: 'ts-003', title: L('Type inference', 'Вывод типов'), question: L('Do you always need explicit types?', 'Всегда ли нужны явные типы?'), answer: L('No. TypeScript infers from initializers and usage. Annotate function parameters, public return types, and cases inference cannot resolve. Prefer inference for locals.', 'Нет. TypeScript выводит типы из инициализаторов и использования. Аннотируйте параметры функций, публичные возвращаемые типы и случаи, которые вывод не разрешает. Для локальных переменных предпочитайте вывод.'), code: `let count = 0;        // number\nconst name = "Ann";   // "Ann" (const literal)\nlet items = [1, 2, 3]; // number[]` },
{ id: 'ts-004', title: L('Primitives', 'Примитивы'), question: L('What primitive types exist?', 'Какие примитивные типы есть?'), answer: L('number, string, boolean, bigint, symbol, null, undefined, void, never, unknown, any. Literal types represent specific values; unique symbol creates nominally unique symbols.', 'number, string, boolean, bigint, symbol, null, undefined, void, never, unknown, any. Литеральные типы представляют конкретные значения; unique symbol создаёт номинально уникальные символы.'), code: `let n: number = 1;\nlet s: string = "a";\nlet b: boolean = true;\nlet big: bigint = 10n;\nlet sym: symbol = Symbol("id");` },
{ id: 'ts-005', title: L('Arrays', 'Массивы'), question: L('How to type arrays?', 'Как типизировать массивы?'), answer: L('Use T[] or Array<T>. Mixed arrays use (string | number)[]. readonly T[] / ReadonlyArray<T> forbids mutation. noUncheckedIndexedAccess adds undefined to element access.', 'Используйте T[] или Array<T>. Смешанные массивы — (string | number)[]. readonly T[] / ReadonlyArray<T> запрещает мутацию. noUncheckedIndexedAccess добавляет undefined при доступе к элементу.'), code: `const nums: number[] = [1, 2, 3];\nconst list: Array<string> = ["a", "b"];\nconst mixed: (string | number)[] = ["a", 1];\nconst ro: readonly number[] = [1, 2];` },
{ id: 'ts-006', title: L('Tuples', 'Кортежи'), question: L('What is a tuple?', 'Что такое кортеж?'), answer: L('A fixed-length array with known types per position. Supports optional and rest elements, labels, and readonly. Tuple length is a literal number, which enables tuple detection.', 'Массив фиксированной длины с известными типами по позициям. Поддерживает опциональные и rest-элементы, метки и readonly. Длина кортежа — литеральное число, что позволяет определять кортежи.'), code: `let point: [number, number] = [10, 20];\nlet rec: readonly [string, number] = ["age", 30];\nlet rest: [string, ...number[]] = ["a", 1, 2];\ntype Named = [name: string, age?: number];` },
{ id: 'ts-007', title: L('Objects', 'Объекты'), question: L('How to type an object shape?', 'Как типизировать форму объекта?'), answer: L('Use object type literals: { name: string; age?: number }. Optional props use ?, readonly prevents reassignment, and index signatures allow dynamic keys. All named props must fit an index signature.', 'Используйте литералы типов объектов: { name: string; age?: number }. Опциональные свойства — через ?, readonly запрещает переприсваивание, индексные сигнатуры позволяют динамические ключи. Все именованные свойства должны соответствовать индексной сигнатуре.'), code: `type User = {\n  name: string;\n  age?: number;\n  readonly id: string;\n  [key: string]: unknown;\n};` },
{ id: 'ts-008', title: L('Type aliases', 'Псевдонимы типов'), question: L('What is a type alias?', 'Что такое псевдоним типа?'), answer: L('type creates a named alias for any type: primitives, unions, tuples, functions, mapped/conditional types. It is erased at runtime and cannot be reopened or merged.', 'type создаёт именованный псевдоним для любого типа: примитивы, объединения, кортежи, функции, mapped/conditional типы. Стирается в рантайме и не может быть переоткрыт или слит.'), code: `type ID = string | number;\ntype Point = { x: number; y: number };\ntype Handler = (e: Event) => void;` },
{ id: 'ts-009', title: L('Interfaces', 'Интерфейсы'), question: L('What is an interface?', 'Что такое интерфейс?'), answer: L('interface describes an object shape and can be extended or merged (declaration merging). Prefer it for object shapes and class contracts; use type for unions and computed types.', 'interface описывает форму объекта и может расширяться или сливаться (declaration merging). Предпочитайте для форм объектов и контрактов классов; type — для объединений и вычисляемых типов.'), code: `interface User { name: string; }\ninterface User { age: number; } // merged\n// User now has name + age` },
{ id: 'ts-010', title: L('Type vs interface', 'Type vs interface'), question: L('When to use type vs interface?', 'Когда использовать type, а когда interface?'), answer: L('Use interface for extendable/mergeable object shapes (public APIs, class contracts). Use type for unions, tuples, mapped/conditional types, and primitives. Interfaces are slightly faster to check.', 'Используйте interface для расширяемых/сливаемых форм объектов (публичные API, контракты классов). type — для объединений, кортежей, mapped/conditional типов и примитивов. Интерфейсы немного быстрее проверяются.'), code: `interface A { x: number }\ntype B = A | null;\ntype C = { x: number } & { y: number };` },
{ id: 'ts-011', title: L('Union types', 'Объединения типов'), question: L('What is a union type?', 'Что такое тип-объединение?'), answer: L('A | B means a value is A or B. You must narrow before accessing members unique to one side. Discriminated unions make narrowing exhaustive and safe.', 'A | B означает, что значение — A или B. Нужно сужать перед доступом к членам, уникальным для одной стороны. Дискриминированные объединения делают сужение исчерпывающим и безопасным.'), code: `function format(id: string | number) {\n  return id.toString(); // safe: both have toString\n}\nfunction len(x: string | string[]) {\n  return Array.isArray(x) ? x.length : x.length;\n}` },
{ id: 'ts-012', title: L('Intersection types', 'Пересечения типов'), question: L('What is an intersection type?', 'Что такое тип-пересечение?'), answer: L('A & B means a value is both A and B simultaneously. Used to combine object shapes and brand types. Conflicting primitive properties collapse to never.', 'A & B означает, что значение одновременно A и B. Используется для объединения форм объектов и брендированных типов. Конфликтующие примитивные свойства сворачиваются в never.'), code: `type A = { a: string };\ntype B = { b: number };\ntype C = A & B;\nconst c: C = { a: "x", b: 1 };` },
{ id: 'ts-013', title: L('Literal types', 'Литеральные типы'), question: L('What are literal types?', 'Что такое литеральные типы?'), answer: L('Literal types are specific values: "hello", 42, true. const variables get literal types. Combine with unions for enum-like sets. as const narrows whole objects/arrays.', 'Литеральные типы — конкретные значения: "hello", 42, true. Переменные const получают литеральные типы. Комбинируйте с объединениями для enum-подобных наборов. as const сужает целые объекты/массивы.'), code: `const direction = "up"; // type "up"\ntype Dir = "up" | "down" | "left" | "right";\nfunction move(d: Dir) {}` },
{ id: 'ts-014', title: L('Type narrowing', 'Сужение типов'), question: L('What is type narrowing?', 'Что такое сужение типов?'), answer: L('Narrowing refines a broad type using checks. TypeScript tracks control flow and narrows automatically inside branches, including after early returns and truthiness checks.', 'Сужение уточняет широкий тип с помощью проверок. TypeScript отслеживает поток управления и сужает автоматически внутри веток, включая после ранних return и проверок на истинность.'), code: `function f(x: string | number | null) {\n  if (x === null) return;\n  if (typeof x === "string") return x.toUpperCase();\n  return x.toFixed(2);\n}` },
{ id: 'ts-015', title: L('typeof guard', 'typeof guard'), question: L('How does typeof narrow?', 'Как typeof сужает тип?'), answer: L('typeof x === "string" narrows to string. TS recognizes "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function". Note typeof null === "object".', 'typeof x === "string" сужает до string. TS распознаёт "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function". Учтите, что typeof null === "object".'), code: `function f(x: string | number | null) {\n  if (typeof x === "string") return x.length;\n  if (typeof x === "number") return x;\n  return 0;\n}` },
{ id: 'ts-016', title: L('instanceof guard', 'instanceof guard'), question: L('How does instanceof narrow?', 'Как instanceof сужает тип?'), answer: L('x instanceof Date narrows to Date and subclasses. Works on classes and constructor functions. Fails across realms (iframes); use brand checks for cross-realm safety.', 'x instanceof Date сужает до Date и подклассов. Работает с классами и функциями-конструкторами. Не работает между realms (iframe); используйте brand-проверки для безопасности.'), code: `function f(x: Date | string) {\n  if (x instanceof Date) return x.getFullYear();\n  return x.toUpperCase();\n}` },
{ id: 'ts-017', title: L('in operator guard', 'Оператор in'), question: L('How does the in operator narrow?', 'Как оператор in сужает тип?'), answer: L('"prop" in x narrows to types that have that property. Great for optional/discriminated members. Combine with property checks for safer narrowing.', '"prop" in x сужает до типов, имеющих это свойство. Отлично для опциональных/дискриминированных членов. Комбинируйте с проверками свойств для более безопасного сужения.'), code: `type A = { a: number };\ntype B = { b: string };\nfunction f(x: A | B) {\n  if ("a" in x) return x.a;\n  return x.b;\n}` },
{ id: 'ts-018', title: L('Type predicates', 'Предикаты типов'), question: L('What is a type predicate?', 'Что такое предикат типа?'), answer: L('A function returning x is T acts as a user-defined type guard. TS narrows x to T when it returns true. Useful for filtering arrays and validating unknown input.', 'Функция, возвращающая x is T, работает как пользовательский type guard. TS сужает x до T при true. Полезно для фильтрации массивов и валидации unknown-ввода.'), code: `function isString(x: unknown): x is string {\n  return typeof x === "string";\n}\nconst strs = ["a", null].filter(isString); // string[]` },
{ id: 'ts-019', title: L('asserts predicates', 'Предикаты asserts'), question: L('What does asserts x is T do?', 'Что делает asserts x is T?'), answer: L('An asserts predicate guarantees x is T, throwing otherwise. After the call, TS narrows x in the calling scope. Requires an explicit annotation on x.', 'Предикат asserts гарантирует, что x — T, иначе бросает. После вызова TS сужает x в области вызова. Требует явной аннотации у x.'), code: `function assertDefined<T>(x: T): asserts x is NonNullable<T> {\n  if (x === null || x === undefined) throw new Error("undefined");\n}` },
{ id: 'ts-020', title: L('Discriminated unions', 'Дискриминированные объединения'), question: L('What is a discriminated union?', 'Что такое дискриминированное объединение?'), answer: L('A union where every member shares a literal discriminant property (e.g., kind/type). TS narrows precisely on that property. The canonical pattern for modeling state machines.', 'Объединение, где каждый член имеет общее литеральное дискриминирующее свойство (например, kind/type). TS точно сужает по нему. Канонический паттерн для конечных автоматов.'), code: `type Shape =\n  | { kind: "circle"; r: number }\n  | { kind: "square"; s: number };\nfunction area(x: Shape) {\n  if (x.kind === "circle") return Math.PI * x.r ** 2;\n  return x.s ** 2;\n}` },
{ id: 'ts-021', title: L('Exhaustiveness checking', 'Проверка исчерпания'), question: L('How to ensure all union cases are handled?', 'Как гарантировать обработку всех случаев?'), answer: L('Add a default branch assigning to never: const _exhaustive: never = value. If a case is missing, TS errors. Prefer this over returning undefined silently.', 'Добавьте default-ветку с присваиванием never: const _exhaustive: never = value. Если случай пропущен, TS выдаст ошибку. Предпочитайте это молчаливому возврату undefined.'), code: `function f(s: Shape): number {\n  switch (s.kind) {\n    case "circle": return 1;\n    case "square": return 2;\n    default: {\n      const _e: never = s;\n      throw new Error();\n    }\n  }\n}` },
{ id: 'ts-022', title: L('never type', 'Тип never'), question: L('What is the never type?', 'Что такое тип never?'), answer: L('never represents values that never occur: throwing/looping functions and unreachable branches. It is assignable to every type. A type with no values (e.g., string & number) is never.', 'never представляет значения, которые никогда не встречаются: бросающие/зацикленные функции и недостижимые ветки. Присваивается любому типу. Тип без значений (например, string & number) — never.'), code: `function fail(msg: string): never {\n  throw new Error(msg);\n}\ntype Impossible = string & number; // never` },
{ id: 'ts-023', title: L('unknown vs any', 'unknown vs any'), question: L('Difference between unknown and any?', 'Разница между unknown и any?'), answer: L('unknown is the safe top type: you must narrow before use. any disables all checks and is assignable both ways. Prefer unknown for untrusted data.', 'unknown — безопасный верхний тип: нужно сужать перед использованием. any отключает все проверки и присваивается в обе стороны. Предпочитайте unknown для ненадёжных данных.'), code: `let a: any = 1; a.foo(); // no error\nlet u: unknown = 1; // u.foo(); // error\nif (typeof u === "number") u.toFixed();` },
{ id: 'ts-024', title: L('void type', 'Тип void'), question: L('What is void?', 'Что такое void?'), answer: L('void means a function returns nothing meaningful. Under strictNullChecks, void accepts only undefined. A callback typed () => void may ignore a returned value.', 'void означает, что функция ничего осмысленного не возвращает. При strictNullChecks void принимает только undefined. Колбэк типа () => void может игнорировать возвращаемое значение.'), code: `function log(msg: string): void {\n  console.log(msg);\n}\nconst cb: () => void = () => 42; // allowed` },
{ id: 'ts-025', title: L('null and undefined', 'null и undefined'), question: L('How do null and undefined behave?', 'Как ведут себя null и undefined?'), answer: L('Both are their own types. With strictNullChecks off they are assignable to everything; with it on, add them explicitly via unions like string | null. Optional params/props imply | undefined.', 'Оба — собственные типы. При выключенном strictNullChecks присваиваются всему; при включённом добавляйте явно через объединения вроде string | null. Опциональные параметры/свойства подразумевают | undefined.'), code: `let a: string = null; // error with strictNullChecks\nlet b: string | null = null; // ok\nlet c: string | undefined = undefined; // ok` },
{ id: 'ts-026', title: L('strict mode', 'strict mode'), question: L('What does strict: true enable?', 'Что включает strict: true?'), answer: L('It enables all strict checks: strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, alwaysStrict, useUnknownInCatchVariables, noImplicitThis.', 'Включает все строгие проверки: strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, alwaysStrict, useUnknownInCatchVariables, noImplicitThis.'), code: `{\n  "compilerOptions": { "strict": true }\n}` },
{ id: 'ts-027', title: L('strictNullChecks', 'strictNullChecks'), question: L('What does strictNullChecks do?', 'Что делает strictNullChecks?'), answer: L('It separates null and undefined from all other types, preventing null-reference runtime errors. Often the single most valuable strict flag.', 'Отделяет null и undefined от всех остальных типов, предотвращая ошибки обращения к null в рантайме. Часто самый ценный строгий флаг.'), code: `let el: HTMLElement | null = document.getElementById("x");\nif (el) el.textContent = "hi"; // narrowed` },
{ id: 'ts-028', title: L('strictFunctionTypes', 'strictFunctionTypes'), question: L('What does strictFunctionTypes check?', 'Что проверяет strictFunctionTypes?'), answer: L('It makes function parameter checks contravariant (strict) instead of bivariant, catching unsound argument assignments. Method syntax stays bivariant for compatibility.', 'Делает проверку параметров функций контравариантной (строгой) вместо бивариантной, ловя некорректные присваивания аргументов. Синтаксис методов остаётся бивариантным ради совместимости.'), code: `type Handler = (x: Animal) => void;\nconst dogHandler: Handler = (d: Dog) => {}; // error under strict` },
{ id: 'ts-029', title: L('strictBindCallApply', 'strictBindCallApply'), question: L('What does strictBindCallApply enforce?', 'Что обеспечивает strictBindCallApply?'), answer: L('It type-checks arguments of bind, call, and apply, catching wrong argument counts/types in those calls.', 'Проверяет типы аргументов у bind, call и apply, ловя неверное число/типы аргументов в этих вызовах.'), code: `function f(a: number, b: string) {}\nf.call(null, 1, 2); // error: b must be string` },
{ id: 'ts-030', title: L('strictPropertyInitialization', 'strictPropertyInitialization'), question: L('What does strictPropertyInitialization require?', 'Что требует strictPropertyInitialization?'), answer: L('Class properties must be initialized at declaration or in the constructor. Use definite assignment assertion ! when assignment happens elsewhere (e.g., in a method).', 'Свойства классов должны инициализироваться при объявлении или в конструкторе. Используйте утверждение определённого присваивания !, когда присваивание происходит в другом месте (например, в методе).'), code: `class C {\n  x: number = 0;\n  y: number; // error unless assigned in constructor\n  z!: string; // definite assignment assertion\n}` },
{ id: 'ts-031', title: L('noImplicitAny', 'noImplicitAny'), question: L('What does noImplicitAny prevent?', 'Что предотвращает noImplicitAny?'), answer: L('It errors on parameters/variables whose type is implicitly any. Forces explicit typing instead of silently allowing any.', 'Выдаёт ошибку для параметров/переменных с неявным any. Заставляет писать явные типы вместо молчаливого any.'), code: `function f(x) { // error: x implicitly has type any\n  return x;\n}` },
{ id: 'ts-032', title: L('noImplicitThis', 'noImplicitThis'), question: L('What does noImplicitThis do?', 'Что делает noImplicitThis?'), answer: L('It errors when this has an implicit any type. Ensure this is bound via arrow functions, bind, or an explicit this parameter.', 'Выдаёт ошибку, когда у this неявный тип any. Обеспечьте привязку this через стрелочные функции, bind или явный параметр this.'), code: `function f(this: Window) {\n  setTimeout(() => this.alert("hi"), 100);\n}` },
{ id: 'ts-033', title: L('useUnknownInCatchVariables', 'useUnknownInCatchVariables'), question: L('What does useUnknownInCatchVariables change?', 'Что меняет useUnknownInCatchVariables?'), answer: L('It types catch variables as unknown instead of any. You must narrow before use, which is safer and avoids accidental property access.', 'Типизирует переменные catch как unknown вместо any. Нужно сужать перед использованием — безопаснее и предотвращает случайный доступ к свойствам.'), code: `try { risky(); } catch (e) {\n  if (e instanceof Error) console.log(e.message);\n}` },
{ id: 'ts-034', title: L('noUncheckedIndexedAccess', 'noUncheckedIndexedAccess'), question: L('What does noUncheckedIndexedAccess do?', 'Что делает noUncheckedIndexedAccess?'), answer: L('It adds undefined to array and index-signature access types, exposing a common source of runtime crashes at compile time.', 'Добавляет undefined к типам доступа по индексу массива и индексной сигнатуры, выявляя распространённый источник рантайм-падений на этапе компиляции.'), code: `const arr = [1, 2, 3];\nconst x = arr[0]; // number | undefined` },
{ id: 'ts-035', title: L('exactOptionalPropertyTypes', 'exactOptionalPropertyTypes'), question: L('What does exactOptionalPropertyTypes enforce?', 'Что обеспечивает exactOptionalPropertyTypes?'), answer: L('It forbids assigning undefined to an optional property unless undefined is explicitly part of its type, distinguishing "missing" from "explicitly undefined".', 'Запрещает присваивать undefined опциональному свойству, если undefined не входит явно в его тип, различая "отсутствует" и "явно undefined".'), code: `type U = { name?: string };\nconst u: U = { name: undefined }; // error\n// fix: { name?: string | undefined }` },
{ id: 'ts-036', title: L('satisfies operator', 'Оператор satisfies'), question: L('What does satisfies do?', 'Что делает оператор satisfies?'), answer: L('It checks a value against a type without widening or changing the inferred type. Keeps literal inference while validating the shape (TS 4.9+).', 'Проверяет значение на соответствие типу без расширения или изменения выведенного типа. Сохраняет вывод литералов, валидируя форму (TS 4.9+).'), code: `const palette = {\n  red: "#f00",\n  green: [0, 255, 0],\n} satisfies Record<string, string | number[]>;\n// palette.red stays "#f00"` },
{ id: 'ts-037', title: L('as const', 'as const'), question: L('What does as const do?', 'Что делает as const?'), answer: L('It narrows everything and widens nothing: object/array become readonly with literal types. Ideal for config objects and discriminated unions.', 'Ничего не расширяет и всё сужает: объект/массив становятся readonly с литеральными типами. Идеально для объектов конфигурации и дискриминированных объединений.'), code: `const config = { env: "prod", retries: 3 } as const;\n// { readonly env: "prod"; readonly retries: 3 }` },
{ id: 'ts-038', title: L('readonly modifier', 'Модификатор readonly'), question: L('What does readonly do?', 'Что делает readonly?'), answer: L('It makes a property immutable at the type level; assignment outside the constructor errors. The underlying object can still be mutated via casts or nested references.', 'Делает свойство неизменяемым на уровне типов; присваивание вне конструктора — ошибка. Сам объект всё ещё может быть изменён через приведения или вложенные ссылки.'), code: `class C {\n  readonly id: string;\n  constructor(id: string) { this.id = id; }\n}\nnew C("a").id = "b"; // error` },
{ id: 'ts-039', title: L('Readonly arrays and tuples', 'Неизменяемые массивы и кортежи'), question: L('How to make arrays/tuples immutable?', 'Как сделать массивы/кортежи неизменяемыми?'), answer: L('Use readonly T[] or ReadonlyArray<T> for arrays and readonly [A, B] for tuples. They forbid push/pop/splice. For deep immutability, nest readonly at every level.', 'Используйте readonly T[] или ReadonlyArray<T> для массивов и readonly [A, B] для кортежей. Они запрещают push/pop/splice. Для глубокой неизменяемости вкладывайте readonly на каждый уровень.'), code: `const nums: readonly number[] = [1, 2];\nnums.push(3); // error\nlet t: readonly [string, number] = ["a", 1];` },
{ id: 'ts-040', title: L('Mapped types', 'Отображённые типы'), question: L('What is a mapped type?', 'Что такое отображённый тип?'), answer: L('A mapped type transforms keys of another type: { [K in T]: ... }. Modifiers readonly and ? can be added/removed via +/-. It is the foundation of many utility types.', 'Отображённый тип преобразует ключи другого типа: { [K in T]: ... }. Модификаторы readonly и ? можно добавлять/убирать через +/-. Основа многих утилитных типов.'), code: `type Readonly<T> = { readonly [K in keyof T]: T[K] };\ntype Optional<T> = { [K in keyof T]?: T[K] };\ntype Mutable<T> = { -readonly [K in keyof T]: T[K] };` },
{ id: 'ts-041', title: L('Conditional types', 'Условные типы'), question: L('What is a conditional type?', 'Что такое условный тип?'), answer: L('T extends U ? X : Y chooses X when T is assignable to U, else Y. Supports nesting and recursion. Enables powerful type-level logic and filtering.', 'T extends U ? X : Y выбирает X, если T присваивается U, иначе Y. Поддерживает вложенность и рекурсию. Даёт мощную логику и фильтрацию на уровне типов.'), code: `type IsString<T> = T extends string ? true : false;\ntype A = IsString<"x">; // true\ntype B = IsString<1>;   // false` },
{ id: 'ts-042', title: L('infer keyword', 'Ключевое слово infer'), question: L('What does infer do?', 'Что делает infer?'), answer: L('infer declares a type variable to capture part of a type inside a conditional. It lets you extract element, parameter, and return types.', 'infer объявляет переменную типа для захвата части типа внутри условного типа. Позволяет извлекать типы элементов, параметров и возврата.'), code: `type Elem<T> = T extends (infer E)[] ? E : never;\ntype N = Elem<number[]>; // number\ntype Ret<T> = T extends (...a: any[]) => infer R ? R : never;` },
{ id: 'ts-043', title: L('Template literal types', 'Шаблонные литеральные типы'), question: L('What are template literal types?', 'Что такое шаблонные литеральные типы?'), answer: L('They build string types from patterns like `hello ${string}`. Combine with unions and infer for type-safe string parsing and event maps.', 'Строят строковые типы по шаблонам вроде `hello ${string}`. Комбинируйте с объединениями и infer для типобезопасного парсинга строк и карт событий.'), code: `type Event = "click" | "focus";\ntype Handler = \`on\${Capitalize<Event>}\`;\n// "onClick" | "onFocus"` },
{ id: 'ts-044', title: L('keyof operator', 'Оператор keyof'), question: L('What does keyof produce?', 'Что производит keyof?'), answer: L('keyof T gives a union of all property keys of T. Combined with indexed access T[K] it enables generic property access and key constraints.', 'keyof T даёт объединение всех ключей свойств T. В комбинации с индексным доступом T[K] включает обобщённый доступ к свойствам и ограничения по ключам.'), code: `type User = { name: string; age: number };\ntype K = keyof User; // "name" | "age"\ntype V = User["name"]; // string` },
{ id: 'ts-045', title: L('Indexed access types', 'Индексные типы доступа'), question: L('What is an indexed access type?', 'Что такое индексный тип доступа?'), answer: L('T[K] reads the type of property K from T. K can be a union or a generic. Enables type-safe getters and deep property paths.', 'T[K] читает тип свойства K из T. K может быть объединением или дженериком. Даёт типобезопасные геттеры и глубокие пути свойств.'), code: `type User = { name: string; age: number };\ntype Name = User["name"]; // string\ntype Both = User["name" | "age"]; // string | number` },
{ id: 'ts-046', title: L('typeof in types', 'typeof в типах'), question: L('How to use typeof in type position?', 'Как использовать typeof в позиции типа?'), answer: L('typeof x in a type query gets the type of a value (variable, function). Useful to derive types from existing values without duplication.', 'typeof x в запросе типа получает тип значения (переменной, функции). Полезно для вывода типов из существующих значений без дублирования.'), code: `const config = { retries: 3, url: "x" };\ntype Config = typeof config; // { retries: number; url: string }` },
{ id: 'ts-047', title: L('Index signatures', 'Индексные сигнатуры'), question: L('What is an index signature?', 'Что такое индексная сигнатура?'), answer: L('[key: string]: T allows any string key with value type T. All named properties must be assignable to it. Use Record<K, T> for a cleaner alias.', '[key: string]: T разрешает любой строковый ключ со значением типа T. Все именованные свойства должны быть присваиваемы ему. Используйте Record<K, T> как более чистый псевдоним.'), code: `type Dict = { [key: string]: number };\nconst d: Dict = { a: 1, b: 2 };\nconst x: number = d["anything"];` },
{ id: 'ts-048', title: L('Generic functions', 'Обобщённые функции'), question: L('What is a generic function?', 'Что такое обобщённая функция?'), answer: L('A generic function has type parameters <T> inferred from arguments. It preserves type relationships across parameters and return values.', 'Обобщённая функция имеет параметры типа <T>, выводимые из аргументов. Сохраняет связи типов между параметрами и возвращаемым значением.'), code: `function identity<T>(x: T): T { return x; }\nconst n = identity(1); // number` },
{ id: 'ts-049', title: L('Generic classes and interfaces', 'Обобщённые классы и интерфейсы'), question: L('How do generic classes/interfaces work?', 'Как работают обобщённые классы/интерфейсы?'), answer: L('Classes and interfaces can take type parameters used by fields, methods, and constructors. Implementations can fix T or stay generic. Inference from constructor args is supported.', 'Классы и интерфейсы могут принимать параметры типа, используемые полями, методами и конструкторами. Реализации могут фиксировать T или оставаться обобщёнными. Поддерживается вывод из аргументов конструктора.'), code: `class Box<T> { constructor(public value: T) {} }\nconst b = new Box("hi"); // Box<string>\ninterface Response<T> { data: T; status: number; }` },
{ id: 'ts-050', title: L('Generic constraints', 'Ограничения дженериков'), question: L('What is a generic constraint?', 'Что такое ограничение дженерика?'), answer: L('extends limits a type parameter to a shape: <T extends { id: string }>. Constrained params can access those members. Use keyof to constrain to keys.', 'extends ограничивает параметр типа формой: <T extends { id: string }>. Ограниченные параметры могут обращаться к этим членам. Используйте keyof для ограничения ключами.'), code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}` },
{ id: 'ts-051', title: L('Default type parameters', 'Параметры типа по умолчанию'), question: L('What are default type parameters?', 'Что такое параметры типа по умолчанию?'), answer: L('<T = string> provides a fallback when inference yields nothing. Keeps call sites terse while allowing explicit overrides.', '<T = string> даёт запасной вариант, когда вывод ничего не даёт. Делает вызовы короче, позволяя явные переопределения.'), code: `function create<T = string>(x: T): T[] { return [x]; }\ncreate(1); // number[]\ncreate();  // string[]` },
{ id: 'ts-052', title: L('Partial and Required', 'Partial и Required'), question: L('What do Partial and Required do?', 'Что делают Partial и Required?'), answer: L('Partial<T> makes every property optional; Required<T> removes optionality from all. They are inverses and common in update/patch patterns.', 'Partial<T> делает каждое свойство опциональным; Required<T> убирает опциональность у всех. Они обратны и часты в паттернах обновления/патча.'), code: `type User = { name: string; age: number };\ntype Patch = Partial<User>;\ntype Full = Required<{ a?: string; b?: number }>;` },
{ id: 'ts-053', title: L('Readonly utility', 'Утилита Readonly'), question: L('What does Readonly<T> do?', 'Что делает Readonly<T>?'), answer: L('Readonly<T> adds readonly to all properties. It is shallow only — nested objects remain mutable. as const achieves deep literal immutability.', 'Readonly<T> добавляет readonly ко всем свойствам. Только поверхностно — вложенные объекты остаются мутабельными. as const даёт глубокую литеральную неизменяемость.'), code: `type U = { name: string; nested: { x: number } };\ntype R = Readonly<U>;` },
{ id: 'ts-054', title: L('Pick and Omit', 'Pick и Omit'), question: L('What do Pick and Omit do?', 'Что делают Pick и Omit?'), answer: L('Pick<T, K> selects a subset of keys; Omit<T, K> excludes keys. K must be keys of T. Prefer Omit when removing few keys.', 'Pick<T, K> выбирает подмножество ключей; Omit<T, K> исключает ключи. K должно быть ключами T. Предпочитайте Omit при удалении нескольких ключей.'), code: `type User = { name: string; age: number; email: string };\ntype NameAndAge = Pick<User, "name" | "age">;\ntype NoEmail = Omit<User, "email">;` },
{ id: 'ts-055', title: L('Exclude, Extract, NonNullable', 'Exclude, Extract, NonNullable'), question: L('What do Exclude, Extract, NonNullable do?', 'Что делают Exclude, Extract, NonNullable?'), answer: L('Exclude removes from a union types assignable to U; Extract keeps only those; NonNullable removes null and undefined. All operate on union members.', 'Exclude удаляет из объединения типы, присваиваемые U; Extract оставляет только их; NonNullable удаляет null и undefined. Все работают с членами объединений.'), code: `type T = "a" | "b" | "c";\ntype E = Exclude<T, "a">; // "b" | "c"\ntype X = Extract<T, "a" | "b">; // "a" | "b"\ntype N = NonNullable<string | null | undefined>; // string` },
{ id: 'ts-056', title: L('Parameters, ReturnType, InstanceType', 'Parameters, ReturnType, InstanceType'), question: L('What do Parameters, ReturnType, InstanceType extract?', 'Что извлекают Parameters, ReturnType, InstanceType?'), answer: L('Parameters<F> gives the tuple of parameter types; ReturnType<F> the return type; InstanceType<C> the instance type of a constructor. All take function/constructor types.', 'Parameters<F> даёт кортеж типов параметров; ReturnType<F> — тип возврата; InstanceType<C> — тип экземпляра конструктора. Все принимают типы функций/конструкторов.'), code: `type F = (a: number, b: string) => boolean;\ntype P = Parameters<F>; // [number, string]\ntype R = ReturnType<F>; // boolean\nclass C { x = 1; }\ntype I = InstanceType<typeof C>; // C` },
{ id: 'ts-057', title: L('Record and string utilities', 'Record и строковые утилиты'), question: L('What do Record and string utility types do?', 'Что делают Record и строковые утилитные типы?'), answer: L('Record<K, T> builds an object type with keys K and values T. Uppercase/Lowercase/Capitalize/Uncapitalize transform string literal types. Awaited unwraps promises.', 'Record<K, T> строит тип объекта с ключами K и значениями T. Uppercase/Lowercase/Capitalize/Uncapitalize преобразуют строковые литеральные типы. Awaited разворачивает промисы.'), code: `type Scores = Record<"a" | "b", number>;\ntype T = Uppercase<"abc">; // "ABC"\ntype R = Awaited<Promise<Promise<string>>>; // string` },
{ id: 'ts-058', title: L('Branded and opaque types', 'Брендированные и непрозрачные типы'), question: L('How to emulate nominal typing?', 'Как эмулировать номинальную типизацию?'), answer: L('Brand a base type with a unique phantom property to make structurally identical types incompatible. Useful for IDs and currency to prevent mix-ups.', 'Брендируйте базовый тип уникальным фантомным свойством, чтобы сделать структурно идентичные типы несовместимыми. Полезно для ID и валют, чтобы предотвратить путаницу.'), code: `type Brand<T, B> = T & { __brand: B };\ntype UserId = Brand<string, "UserId">;\ntype ProductId = Brand<string, "ProductId">;` },
{ id: 'ts-059', title: L('Type-level programming', 'Программирование на уровне типов'), question: L('What is type-level programming?', 'Что такое программирование на уровне типов?'), answer: L('Using generics, conditionals, infer, mapped and template literal types to compute types from other types. Powers type-safe APIs, parsers, and validators.', 'Использование дженериков, условных типов, infer, отображённых и шаблонных литеральных типов для вычисления типов из других типов. Даёт типобезопасные API, парсеры и валидаторы.'), code: `type Keys<T> = T extends Record<infer K, any> ? K : never;\ntype K = Keys<{ a: 1; b: 2 }>; // "a" | "b"` },
{ id: 'ts-060', title: L('Variance', 'Вариантность'), question: L('What is variance in TypeScript?', 'Что такое вариантность в TypeScript?'), answer: L('Variance describes how subtyping of complex types relates to components. TS uses structural subtyping; function params are bivariant by default and contravariant under strictFunctionTypes.', 'Вариантность описывает, как подтипирование сложных типов связано с компонентами. TS использует структурное подтипирование; параметры функций по умолчанию бивариантны и контравариантны при strictFunctionTypes.'), code: `type Fn = (x: Animal) => void;\n// (x: Dog) => void is NOT assignable under strictFunctionTypes` },
{ id: 'ts-061', title: L('Structural typing', 'Структурная типизация'), question: L('What is structural typing?', 'Что такое структурная типизация?'), answer: L('TS compares types by shape, not name. Two types are compatible if they have matching members. This enables duck typing but can allow accidental matches; use branding to avoid.', 'TS сравнивает типы по форме, а не по имени. Два типа совместимы, если имеют совпадающие члены. Это даёт утиную типизацию, но может допускать случайные совпадения; используйте брендирование для защиты.'), code: `type A = { x: number };\ntype B = { x: number };\nconst a: A = { x: 1 } as B; // ok` },
{ id: 'ts-062', title: L('Classes and access modifiers', 'Классы и модификаторы доступа'), question: L('What access modifiers exist for classes?', 'Какие модификаторы доступа есть у классов?'), answer: L('public (default, everywhere), private (only inside the class), protected (class + subclasses). TS private is compile-time only; runtime is unaffected. Use #private for true runtime privacy.', 'public (по умолчанию, везде), private (только внутри класса), protected (класс + подклассы). TS private — только на этапе компиляции; в рантайме не влияет. Для настоящей приватности используйте #private.'), code: `class C {\n  public a = 1;\n  private b = 2;\n  protected c = 3;\n}` },
{ id: 'ts-063', title: L('Abstract classes', 'Абстрактные классы'), question: L('What is an abstract class?', 'Что такое абстрактный класс?'), answer: L('An abstract class cannot be instantiated and may contain abstract members that subclasses must implement. It can still provide concrete members and shared logic.', 'Абстрактный класс нельзя инстанцировать, и он может содержать абстрактные члены, которые подклассы должны реализовать. Может содержать и конкретные члены с общей логикой.'), code: `abstract class Shape {\n  abstract area(): number;\n  describe() { return "area: " + this.area(); }\n}` },
{ id: 'ts-064', title: L('Static members and accessors', 'Статические члены и аксессоры'), question: L('What are static members and accessors?', 'Что такое статические члены и аксессоры?'), answer: L('static members belong to the class, not instances, and are accessed via ClassName.member. get/set define computed properties with optional different getter/setter types.', 'static-члены принадлежат классу, а не экземплярам, и доступны через ClassName.member. get/set определяют вычисляемые свойства с возможными разными типами геттера/сеттера.'), code: `class MathUtil {\n  static PI = 3.14;\n  static square(x: number) { return x * x; }\n}\nclass C {\n  private _n = 0;\n  get n(): number { return this._n; }\n  set n(v: number) { if (v >= 0) this._n = v; }\n}` },
{ id: 'ts-065', title: L('Function overloading', 'Перегрузка функций'), question: L('How does function overloading work?', 'Как работает перегрузка функций?'), answer: L('Declare multiple signatures, then one implementation. Only signatures are visible to callers; the implementation must be compatible with all overloads.', 'Объявите несколько сигнатур, затем одну реализацию. Вызывающим видны только сигнатуры; реализация должна быть совместима со всеми перегрузками.'), code: `function f(x: string): string;\nfunction f(x: number): number;\nfunction f(x: string | number) { return x; }` },
{ id: 'ts-066', title: L('Call and construct signatures', 'Call- и construct-сигнатуры'), question: L('What are call/construct signatures?', 'Что такое call/construct-сигнатуры?'), answer: L('A call signature makes a value callable; a construct signature makes it usable with new. They enable hybrid callable objects and typed factories.', 'Call-сигнатура делает значение вызываемым; construct-сигнатура — применяемым с new. Они дают гибридные вызываемые объекты и типизированные фабрики.'), code: `interface F { (x: number): string; description: string; }\ninterface Ctor { new (hour: number): { getTime(): number }; }` },
{ id: 'ts-067', title: L('Modules and type-only imports', 'Модули и импорты только типов'), question: L('What are import type and export type?', 'Что такое import type и export type?'), answer: L('They import/export types only and are guaranteed erased at runtime. Use them when only types are needed to avoid runtime imports and circular dependency issues.', 'Они импортируют/экспортируют только типы и гарантированно стираются в рантайме. Используйте, когда нужны лишь типы, чтобы избежать рантайм-импортов и циклических зависимостей.'), code: `import type { User } from "./types";\nexport type { User } from "./types";` },
{ id: 'ts-068', title: L('Module syntax strictness', 'Строгость синтаксиса модулей'), question: L('What do verbatimModuleSyntax and isolatedModules enforce?', 'Что обеспечивают verbatimModuleSyntax и isolatedModules?'), answer: L('verbatimModuleSyntax preserves import/export syntax and requires explicit type-only imports. isolatedModules ensures each file can be transpiled independently. Both are important for modern bundlers.', 'verbatimModuleSyntax сохраняет синтаксис import/export и требует явные импорты только типов. isolatedModules гарантирует независимую транспиляцию каждого файла. Оба важны для современных бандлеров.'), code: `import { type User, fetch } from "./api"; // User erased, fetch kept` },
{ id: 'ts-069', title: L('Declaration files and ambient types', 'Файлы деклараций и ambient-типы'), question: L('What are .d.ts and ambient declarations?', 'Что такое .d.ts и ambient-объявления?'), answer: L('A .d.ts file contains type declarations without implementation. Ambient declarations (declare) tell TS about runtime-existing values/modules without emitting code. Used to type JS libraries.', 'Файл .d.ts содержит объявления типов без реализации. Ambient-объявления (declare) сообщают TS о существующих в рантайме значениях/модулях без генерации кода. Используются для типизации JS-библиотек.'), code: `declare module "legacy-lib" {\n  export function run(): void;\n}` },
{ id: 'ts-070', title: L('Enums and decorators', 'Enum-ы и декораторы'), question: L('How do enums and decorators work in TS?', 'Как работают enum-ы и декораторы в TS?'), answer: L('String enums map names to strings; numeric enums auto-increment and allow reverse mapping; const enums are fully inlined. Decorators annotate/modify classes and members; legacy ones need experimentalDecorators, standard ones follow TC39.', 'Строковые enum-ы отображают имена в строки; числовые авто-инкрементируются и поддерживают обратный маппинг; const enum полностью встраивается. Декораторы аннотируют/изменяют классы и члены; устаревшие требуют experimentalDecorators, стандартные следуют TC39.'), code: `enum Direction { Up = "UP", Down = "DOWN" }\nconst enum E { A = 1, B = 2 }\nfunction log(target: any, key: string, d: PropertyDescriptor) {}` },
  ],
  quiz: [
    {
      id: 'ts-q01',
      question: L(
        'What does a function declared to return void tell the type checker?',
        'Что сообщает проверке типов функция, объявленная с возвратом void?'
      ),
      options: [
        L(
          'The function returns nothing meaningful, and any returned value is discarded by the caller',
          'Функция ничего осмысленного не возвращает, и любое возвращённое значение вызывающий отбрасывает'
        ),
        L(
          'The function always returns undefined and can never throw',
          'Функция всегда возвращает undefined и никогда не бросает исключений'
        ),
        L(
          'The function may return any value, and the caller decides the type',
          'Функция может вернуть любое значение, а тип определяет вызывающий'
        ),
        L(
          'The function returns a promise that resolves with nothing',
          'Функция возвращает промис, который разрешается в ничто'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'void means the returned value carries no information, so there is nothing useful to assign it to. A callback typed () => void may still return a value and that value is simply dropped, which is why a function returning a number can be passed where a () => void is expected.',
        'void означает, что возвращаемое значение ничего не несёт, поэтому его не к чему приписать. Колбэк типа () => void всё же может вернуть значение, и оно просто отбрасывается, поэтому функцию, возвращающую number, можно передать туда, где ожидается () => void.'
      ),
    },
    {
      id: 'ts-q02',
      question: L(
        'What are the inferred types of `let count = 0` and `const name = "Ann"`?',
        'Какие типы выводятся у `let count = 0` и `const name = "Ann"`?'
      ),
      options: [
        L('number and string', 'number и string'),
        L('number and the literal type "Ann"', 'number и литеральный тип "Ann"'),
        L('number and string, because const does not change inference', 'number и string, потому что const не меняет вывод типов'),
        L('any and string', 'any и string'),
      ],
      correctIndex: 1,
      explanation: L(
        'A let binding widens the literal to its base type, so count is number. A const binding keeps the literal type, so the type of name is exactly "Ann" and only that value is accepted. Neither needs an explicit annotation.',
        'Объявление через let расширяет литерал до базового типа, поэтому count имеет тип number. Объявление через const сохраняет литеральный тип, поэтому тип name — это ровно "Ann" и принимается только это значение. Явные аннотации не нужны ни там, ни там.'
      ),
    },
    {
      id: 'ts-q03',
      question: L(
        'Which of these is a reference type in TypeScript?',
        'Какой из этих типов является ссылочным в TypeScript?'
      ),
      options: [
        L('number', 'number'),
        L('boolean', 'boolean'),
        L('An object type such as { id: number }', 'Тип объекта вида { id: number }'),
        L('null', 'null'),
      ],
      correctIndex: 2,
      explanation: L(
        'Primitive types carry the value themselves, while an object type is a reference to an object, so two variables can point to the same object and a change of a property is visible through both. The fact that typeof null is "object" is a historical quirk of JavaScript and does not make null a reference type.',
        'Примитивные типы хранят значение сами по себе, а тип объекта — это ссылка на объект, поэтому две переменные могут указывать на один объект, и изменение свойства видно через обе. То, что typeof null равно "object", — историческая особенность JavaScript, а не признак того, что null ссылочный.'
      ),
    },
    {
      id: 'ts-q04',
      question: L(
        'What is the type of `const config = { retries: 3, url: "/api" }`?',
        'Какой тип у `const config = { retries: 3, url: "/api" }`?'
      ),
      options: [
        L('readonly { retries: 3; url: "/api" }', 'readonly { retries: 3; url: "/api" }'),
        L('{ retries: number; url: string }', '{ retries: number; url: string }'),
        L('Record<string, string | number>', 'Record<string, string | number>'),
        L(
          'The literal types are lost: { retries: number; url: string }',
          'Литеральные типы теряются: { retries: number; url: string }'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'const does not make the properties of an object literal narrow, only as const does. Without it the literal types widen, so config.retries has the type number and not the literal type 3, and the object stays mutable.',
        'const не делает свойства объектного литерала узкими, это делает только as const. Без него литеральные типы расширяются, поэтому у config.retries тип number, а не литеральный 3, и объект остаётся мутабельным.'
      ),
    },
    {
      id: 'ts-q05',
      question: L(
        'Why does `function f(x: string | number) { return x.toFixed(2); }` fail to compile?',
        'Почему `function f(x: string | number) { return x.toFixed(2); }` не компилируется?'
      ),
      options: [
        L('Because toFixed does not exist on any built-in type', 'Потому что toFixed не существует ни на одном встроенном типе'),
        L(
          'Because string and number cannot be combined in one parameter',
          'Потому что string и number нельзя объединить в одном параметре'
        ),
        L(
          'Because toFixed exists only on number, so the union has to be narrowed first',
          'Потому что toFixed есть только у number, и объединение сначала надо сузить'
        ),
        L('Because union types are only allowed for objects', 'Потому что объединения допустимы только для объектов'),
      ],
      correctIndex: 2,
      explanation: L(
        'Inside the body of the function x is still string | number, and the compiler cannot know which side it is on. A typeof check, an in check or a user defined type guard narrows the union, and only then is toFixed allowed.',
        'Внутри тела функции x всё ещё string | number, и компилятор не знает, на какой стороне он находится. Проверка typeof, проверка in или пользовательский type guard сужают объединение, и только после этого toFixed разрешён.'
      ),
    },
    {
      id: 'ts-q06',
      question: L(
        'What does `type C = A & B` mean when A is { a: string } and B is { b: number }?',
        'Что означает `type C = A & B`, если A — это { a: string }, а B — это { b: number }?'
      ),
      options: [
        L('A value of type C has the a property and the b property at the same time', 'Значение типа C имеет одновременно свойство a и свойство b'),
        L('A value of type C is either an A or a B', 'Значение типа C — это либо A, либо B'),
        L('A value of type C is an A if it has more properties and a B otherwise', 'Значение типа C — это A, если свойств больше, иначе B'),
        L('A and B are merged into a union at runtime', 'A и B объединяются в объединение во время выполнения'),
      ],
      correctIndex: 0,
      explanation: L(
        'The intersection is the set of values that satisfy both types at once, so the resulting shape carries every property of every member. Conflicting primitive properties collapse to never, and the operator itself disappears at runtime.',
        'Пересечение — это множество значений, которые удовлетворяют обоим типам сразу, поэтому итоговая форма содержит все свойства всех участников. Конфликтующие примитивные свойства сворачиваются в never, а сам оператор во время выполнения исчезает.'
      ),
    },
    {
      id: 'ts-q07',
      question: L(
        'Which statement about interface and type alias is correct?',
        'Какое утверждение об interface и type верно?'
      ),
      options: [
        L('A type alias can be reopened and merged, an interface cannot', 'Псевдоним type можно переоткрыть и слить, интерфейс нельзя'),
        L('An interface can be extended and merged, a type alias cannot', 'Интерфейс можно расширять и сливать, псевдоним type нельзя'),
        L('They are interchangeable in every case', 'Они взаимозаменяемы во всех случаях'),
        L('A type alias can describe primitives, an interface cannot', 'Псевдоним type может описывать примитивы, интерфейс не может'),
      ],
      correctIndex: 1,
      explanation: L(
        'An interface describes an object shape and supports extends and declaration merging, which is what makes it the better choice for public contracts and class implementations. A type alias describes anything at all, including unions and computed types, but it cannot be reopened or merged.',
        'Интерфейс описывает форму объекта и поддерживает extends и слияние деклараций, поэтому он лучше подходит для публичных контрактов и реализаций классов. Псевдоним type описывает что угодно, включая объединения и вычисляемые типы, но его нельзя переоткрыть или слить.'
      ),
    },
    {
      id: 'ts-q08',
      question: L(
        'For `type User = { name: string; age: number }`, what is `keyof User`?',
        'Для `type User = { name: string; age: number }` чему равно `keyof User`?'
      ),
      options: [
        L('string | number', 'string | number'),
        L('name | age', 'name | age'),
        L('string', 'string'),
        L('"name" | "age"', '"name" | "age"'),
      ],
      correctIndex: 3,
      explanation: L(
        'keyof produces a union of the property names of the type, and the names are string literals. Combined with the indexed access type User[K] it lets you write a generic function that reads a property of an object without losing the type of that property.',
        'keyof даёт объединение имён свойств типа, и имена эти — строковые литералы. Вместе с индексным доступом User[K] это позволяет написать обобщённую функцию, читающую свойство объекта, не теряя тип этого свойства.'
      ),
    },
    {
      id: 'ts-q09',
      question: L(
        'What is the difference between any and unknown?',
        'В чём разница между any и unknown?'
      ),
      options: [
        L('unknown allows any operation, while any has to be narrowed first', 'unknown разрешает любые операции, а any сначала надо сузить'),
        L('any switches type checking off, while unknown has to be narrowed before use', 'any отключает проверку типов, а unknown надо сузить перед использованием'),
        L('They are the same type with two different names', 'Это один и тот же тип под двумя именами'),
        L('unknown holds only objects, any holds only primitives', 'unknown хранит только объекты, any только примитивы'),
      ],
      correctIndex: 1,
      explanation: L(
        'any is assignable to everything and everything is assignable to any, so it switches off the checks. unknown is the top type: you can put any value into it, but you have to narrow it before you can read a property or call a method.',
        'any присваивается всему, и всё присваивается any, то есть проверки отключаются. unknown — верхний тип: в него можно положить любое значение, но перед чтением свойства или вызовом метода его надо сузить.'
      ),
    },
    {
      id: 'ts-q10',
      question: L(
        'What does `as const` do to an object literal?',
        'Что делает `as const` с объектным литералом?'
      ),
      options: [
        L('It makes the object immutable at runtime', 'Делает объект неизменяемым во время выполнения'),
        L('It checks the object against a type without changing the type', 'Проверяет объект по типу, не меняя сам тип'),
        L('It turns every property into a readonly property with a literal type', 'Делает каждое свойство readonly с литеральным типом'),
        L('It converts the object into an instance of a class', 'Преобразует объект в экземпляр класса'),
      ],
      correctIndex: 2,
      explanation: L(
        'as const narrows everything and widens nothing: the properties become readonly and their types stay literal, so the type of the object is { readonly env: "prod"; readonly retries: 3 }. It is the usual way to describe a configuration or a set of allowed values.',
        'as const сужает всё и ничего не расширяет: свойства становятся readonly, а их типы остаются литеральными, поэтому тип объекта получается { readonly env: "prod"; readonly retries: 3 }. Так обычно описывают конфигурацию или набор допустимых значений.'
      ),
    },
    {
      id: 'ts-q11',
      question: L(
        'How does satisfies differ from a plain type annotation?',
        'Чем satisfies отличается от обычной аннотации типа?'
      ),
      options: [
        L('satisfies validates the value but keeps the narrow inferred type, while an annotation widens it', 'satisfies проверяет значение, но сохраняет узкий выведенный тип, а аннотация его расширяет'),
        L('satisfies widens the type, while an annotation keeps it narrow', 'satisfies расширяет тип, а аннотация сохраняет узкий'),
        L('They behave identically in every case', 'Они ведут себя одинаково во всех случаях'),
        L('satisfies removes the readonly modifiers', 'satisfies убирает модификаторы readonly'),
      ],
      correctIndex: 0,
      explanation: L(
        'With satisfies the value is checked against the type and then keeps its own inferred type, so a literal 5173 stays the literal 5173 instead of becoming number. An annotation replaces the inferred type with the annotated one, so the literal information is lost.',
        'С satisfies значение проверяется по типу, а затем сохраняет собственный выведенный тип, поэтому литерал 5173 остаётся литералом 5173, а не превращается в number. Аннотация заменяет выведенный тип аннотированным, и литеральная информация теряется.'
      ),
    },
    {
      id: 'ts-q12',
      question: L(
        'With strictNullChecks enabled, what happens with `let s: string = null`?',
        'Что происходит при включённом strictNullChecks с `let s: string = null`?'
      ),
      options: [
        L('It compiles, because null is assignable to string', 'Компилируется, потому что null присваивается string'),
        L('It compiles, and the type of s becomes string | null', 'Компилируется, и тип s становится string | null'),
        L('It compiles only in files that opt into strict mode', 'Компилируется только в файлах со строгим режимом'),
        L('It fails to compile, because null is not assignable to string', 'Не компилируется, потому что null не присваивается string'),
      ],
      correctIndex: 3,
      explanation: L(
        'strictNullChecks separates null and undefined from every other type, so a value that can be null has to say so: string | null. It is usually the single most valuable strict flag, because it turns a whole class of runtime crashes into compile errors.',
        'strictNullChecks отделяет null и undefined от всех остальных типов, поэтому значение, которое может быть null, обязано это указать: string | null. Обычно это самый ценный строгий флаг: он превращает целый класс рантайм-падений в ошибки компиляции.'
      ),
    },
    {
      id: 'ts-q13',
      question: L(
        'What does the noImplicitAny compiler option do?',
        'Что делает параметр компилятора noImplicitAny?'
      ),
      options: [
        L('It forbids the any type anywhere in the project', 'Запрещает тип any во всём проекте'),
        L('It requires an explicit type on every variable', 'Требует явный тип у каждой переменной'),
        L('It reports parameters and variables whose type would silently be any', 'Сообщает о параметрах и переменных, чей тип молча стал бы any'),
        L('It makes any behave like unknown', 'Делает any похожим на unknown'),
      ],
      correctIndex: 2,
      explanation: L(
        'The option does not ban any on purpose, it only bans the implicit version of it. A parameter without a type annotation and without an inferable type becomes an error, so the developer has to say what the value really is.',
        'Опция не запрещает any осознанно, она запрещает только неявный any. Параметр без аннотации типа и без выводимого типа становится ошибкой, поэтому разработчик обязан сказать, чем значение является на самом деле.'
      ),
    },
    {
      id: 'ts-q14',
      question: L(
        'What happens when you call push on a value typed as `readonly number[]`?',
        'Что произойдёт, если вызвать push у значения типа `readonly number[]`?'
      ),
      options: [
        L('It compiles and the item is added', 'Компилируется, и элемент добавляется'),
        L('It is a compile error, because a readonly array forbids mutation', 'Это ошибка компиляции: readonly-массив запрещает мутацию'),
        L('It compiles, but the item is silently dropped', 'Компилируется, но элемент молча теряется'),
        L('It throws at runtime', 'Бросает исключение во время выполнения'),
      ],
      correctIndex: 1,
      explanation: L(
        'The readonly modifier removes the mutating methods from the type, so push, pop and splice do not exist on it. This is a compile time guarantee only: the array object itself is the same one at runtime, so the protection depends on nobody bypassing the type.',
        'Модификатор readonly убирает изменяющие методы из типа, поэтому push, pop и splice у него не существуют. Это гарантия только на этапе компиляции: во время выполнения это тот же самый объект массива, и защита держится лишь до тех пор, пока никто не обошёл тип.'
      ),
    },
    {
      id: 'ts-q15',
      question: L(
        'In `type User = { name: string; age?: number }`, what is the type of user.age?',
        'В `type User = { name: string; age?: number }` какой тип у user.age?'
      ),
      options: [
        L('number | undefined', 'number | undefined'),
        L('number', 'number'),
        L('number | null', 'number | null'),
        L('unknown', 'unknown'),
      ],
      correctIndex: 0,
      explanation: L(
        'A question mark makes the property optional and that means the property may be missing, so reading it gives number | undefined. With exactOptionalPropertyTypes enabled even an explicit undefined is rejected unless the type says so.',
        'Вопросительный знак делает свойство необязательным, а это значит, что его может не быть, поэтому чтение даёт number | undefined. При включённом exactOptionalPropertyTypes даже явный undefined отвергается, если тип этого не допускает.'
      ),
    },
    {
      id: 'ts-q16',
      question: L(
        'What does the type `[string, number]` describe?',
        'Что описывает тип `[string, number]`?'
      ),
      options: [
        L('An array with exactly two elements of type string', 'Массив ровно из двух элементов типа string'),
        L('An array that may contain any number of strings and numbers', 'Массив, который может содержать любое количество строк и чисел'),
        L('A pair of strings', 'Пара строк'),
        L('A fixed length pair where the first element is a string and the second is a number', 'Пара фиксированной длины, где первый элемент строка, а второй число'),
      ],
      correctIndex: 3,
      explanation: L(
        'A tuple is an array with a known length and a known type per position, so the length is a literal number and the compiler can tell the first element from the second. Tuples also support optional elements, rest elements and labels.',
        'Кортеж — это массив с известной длиной и известным типом на каждой позиции, поэтому длина является литеральным числом, и компилятор отличает первый элемент от второго. Кортежи поддерживают также необязательные элементы, rest-элементы и метки.'
      ),
    },
    {
      id: 'ts-q17',
      question: L(
        'How does TypeScript narrow a union of shapes that all have a literal kind property?',
        'Как TypeScript сужает объединение форм, у которых у всех есть литеральное свойство kind?'
      ),
      options: [
        L('It does not narrow them, a type assertion is required', 'Не сужает вовсе, нужен type assertion'),
        L('You have to check every property of every member separately', 'Приходится проверять каждое свойство каждого участника отдельно'),
        L('By comparing the kind property, the matching member is selected', 'Сравнением свойства kind выбирается подходящий участник'),
        L('By using instanceof on the value of kind', 'Через instanceof по значению kind'),
      ],
      correctIndex: 2,
      explanation: L(
        'The literal property is the discriminant, and comparing it with a literal narrows the union to that member exactly. This is the canonical way to model a state machine: adding a new member to the union immediately breaks every place that has to handle it.',
        'Литеральное свойство и есть дискриминант, и сравнение с литералом сужает объединение ровно до этого участника. Это канонический способ описать конечный автомат: добавление нового участника сразу ломает все места, которые обязаны его обработать.'
      ),
    },
    {
      id: 'ts-q18',
      question: L(
        'Why is a `const _exhaustive: never = value` line used in the default branch of a switch?',
        'Зачем в ветке default у switch стоит строка `const _exhaustive: never = value`?'
      ),
      options: [
        L('It converts the remaining value into any', 'Она превращает оставшееся значение в any'),
        L('If a new union member is added and not handled, the assignment stops type-checking', 'Если добавить новый член объединения и не обработать его, присваивание перестаёт проходить проверку типов'),
        L('It makes the switch return undefined instead of throwing', 'Она заставляет switch возвращать undefined вместо исключения'),
        L('It removes the need for the default branch', 'Она убирает необходимость ветки default'),
      ],
      correctIndex: 1,
      explanation: L(
        'After all the other cases have been handled, the value in the default branch has been narrowed to never, and never is not assignable from any real value. The moment a new variant of the union appears, this line stops compiling and points at the place that must be updated.',
        'После обработки всех остальных случаев значение в ветке default сужено до never, а never нельзя получить ни из какого настоящего значения. Как только в объединении появляется новый вариант, эта строка перестаёт компилироваться и указывает на место, которое надо обновить.'
      ),
    },
    {
      id: 'ts-q19',
      question: L(
        'What does a function declared as `function isString(x: unknown): x is string` give the caller?',
        'Что даёт вызывающему функция, объявленная как `function isString(x: unknown): x is string`?'
      ),
      options: [
        L('Narrowing of x to string after the call returns true', 'Сужение x до string после того, как вызов вернул true'),
        L('A runtime check that x is a string, with no effect on the type', 'Проверку во время выполнения, что x строка, без влияния на тип'),
        L('A compile error whenever x is not a string', 'Ошибку компиляции, когда x не строка'),
        L('An automatic conversion of x to a string', 'Автоматическое преобразование x в строку'),
      ],
      correctIndex: 0,
      explanation: L(
        'The predicate tells the compiler that a true return means x really is a string, so the value is narrowed in the calling scope. This is what makes a guard usable with filter, where the result becomes string[] instead of (string | null)[].',
        'Предикат говорит компилятору, что возврат true означает, что x действительно строка, поэтому значение сужается в области вызова. Именно это позволяет использовать guard с filter, где результатом будет string[], а не (string | null)[].'
      ),
    },
    {
      id: 'ts-q20',
      question: L(
        'What does a function declared as `function assertDefined(x: unknown): asserts x is Defined` do at the call site?',
        'Что делает в месте вызова функция, объявленная как `function assertDefined(x: unknown): asserts x is Defined`?'
      ),
      options: [
        L('It returns a boolean that the caller has to check', 'Возвращает boolean, который вызывающий обязан проверить'),
        L('It throws only for null and otherwise returns the value', 'Бросает только при null, иначе возвращает значение'),
        L('It converts the value into the asserted type', 'Преобразует значение в объявленный тип'),
        L('It narrows x in the calling scope, and it must throw when the assertion does not hold', 'Сужает x в области вызова и обязана бросить, если утверждение не выполнено'),
      ],
      correctIndex: 3,
      explanation: L(
        'An assertion function carries no boolean result: it either returns normally, and then x is narrowed in the calling scope, or it throws. Because the narrowing happens after the call, the variable has to be declared with an explicit type.',
        'Функция-утверждение не возвращает boolean: либо она выходит normally, и тогда x сужается в области вызова, либо бросает исключение. Так как сужение происходит после вызова, переменная должна быть объявлена с явным типом.'
      ),
    },
    {
      id: 'ts-q21',
      question: L(
        'How does the in operator narrow a union type?',
        'Как оператор in сужает тип-объединение?'
      ),
      options: [
        L('It narrows to the members that do not have the checked property', 'Он сужает до участников, у которых нет проверяемого свойства'),
        L('It narrows to the members that do have the checked property', 'Он сужает до участников, у которых есть проверяемое свойство'),
        L('It narrows only when the value is an object at runtime', 'Он сужает только тогда, когда значение во время выполнения является объектом'),
        L('It does not narrow anything', 'Он ничего не сужает'),
      ],
      correctIndex: 1,
      explanation: L(
        'The in operator asks whether the property exists, so the true branch keeps the members that declare it and the false branch keeps the ones that do not. It is the natural choice when the members differ by the presence of a property rather than by a literal value.',
        'Оператор in спрашивает, существует ли свойство, поэтому в ветке true остаются участники, которые его объявляют, а в ветке false — те, у которых его нет. Это естественный выбор, когда участники отличаются наличием свойства, а не литеральным значением.'
      ),
    },
    {
      id: 'ts-q22',
      question: L(
        'What does `value instanceof Date` narrow a union of Date and string to?',
        'Во что сужает `value instanceof Date` объединение Date и string?'
      ),
      options: [
        L('It does not narrow anything, because Date is a built-in type', 'Ни во что, потому что Date — встроенный тип'),
        L('It narrows to string', 'Сужает до string'),
        L('It narrows to Date and its subclasses in the true branch', 'Сужает до Date и его подклассов в ветке true'),
        L('It narrows the false branch to never', 'Сужает ветку false до never'),
      ],
      correctIndex: 2,
      explanation: L(
        'instanceof works on classes and constructor functions and keeps the subclasses as well, because an instance of a subclass is also an instance of the parent. It fails across realms, for example for a Date coming from an iframe, so a brand check is safer there.',
        'instanceof работает с классами и функциями-конструкторами и сохраняет подклассы, потому что экземпляр подкласса является экземпляром и родителя. Он не работает между realms, например с Date из iframe, поэтому там безопаснее проверка по бренду.'
      ),
    },
    {
      id: 'ts-q23',
      question: L(
        'What does `function identity<T>(value: T): T` give you compared with `function identity(value: any): any`?',
        'Что даёт `function identity<T>(value: T): T` по сравнению с `function identity(value: any): any`?'
      ),
      options: [
        L('It runs faster', 'Она работает быстрее'),
        L('It accepts more arguments', 'Она принимает больше аргументов'),
        L('It removes the need for annotations at the call site', 'Она убирает необходимость аннотаций в месте вызова'),
        L('The call site keeps the concrete type of the argument, so the result is not any', 'Место вызова сохраняет конкретный тип аргумента, поэтому результат не any'),
      ],
      correctIndex: 3,
      explanation: L(
        'The type parameter is inferred from the argument, so identity(1) returns number and identity("a") returns string, and the relationship between the parameter and the return type is preserved. With any that information is thrown away at the call site.',
        'Параметр типа выводится из аргумента, поэтому identity(1) возвращает number, а identity("a") — string, и связь между параметром и возвратом сохраняется. С any эта информация теряется в месте вызова.'
      ),
    },
    {
      id: 'ts-q24',
      question: L(
        'What does the constraint `K extends keyof T` in `function get<T, K extends keyof T>(obj: T, key: K): T[K]` guarantee?',
        'Что гарантирует ограничение `K extends keyof T` в `function get<T, K extends keyof T>(obj: T, key: K): T[K]`?'
      ),
      options: [
        L('The key argument must be one of the property names of T, and the return type follows that key', 'Аргумент key должен быть одним из имён свойств T, а тип возврата следует за этим ключом'),
        L('T must be an object type with a string index signature', 'T должен быть типом объекта со строковой индексной сигнатурой'),
        L('The key argument is optional', 'Аргумент key необязателен'),
        L('Only readonly properties are accepted', 'Принимаются только readonly-свойства'),
      ],
      correctIndex: 0,
      explanation: L(
        'The constraint ties the second parameter to the keys of the first, so a typo in the key is a compile error and the return type is the type of that exact property. Without it the function would have to accept a string and cast the access.',
        'Ограничение связывает второй параметр с ключами первого, поэтому опечатка в ключе — ошибка компиляции, а тип возврата равен типу именно этого свойства. Без него функции пришлось бы принимать string и приводить доступ.'
      ),
    },
    {
      id: 'ts-q25',
      question: L(
        'What does `<T = string>` in `function create<T = string>(value: T): T[]` do?',
        'Что делает `<T = string>` в `function create<T = string>(value: T): T[]`?'
      ),
      options: [
        L('It forbids the explicit type argument', 'Он запрещает явный аргумент типа'),
        L('It makes T always string', 'Он делает T всегда string'),
        L('It supplies string when inference finds nothing better, and the caller can still override it', 'Он подставляет string, когда выводу нечего предложить, а вызывающий всё ещё может переопределить'),
        L('It makes the parameter optional', 'Он делает параметр необязательным'),
      ],
      correctIndex: 2,
      explanation: L(
        'The default is only a fallback: create(1) still infers number[] from the argument, and create() with no argument at all returns string[]. An explicit type argument such as create<number>(1) always wins over the default.',
        'Значение по умолчанию — это лишь запасной вариант: create(1) всё равно выведет number[] из аргумента, а create() без аргументов вернёт string[]. Явный аргумент типа вроде create<number>(1) всегда побеждает значение по умолчанию.'
      ),
    },
    {
      id: 'ts-q26',
      question: L(
        'What is the type of `new Box("hi")` when Box is declared as `class Box<T> { constructor(public value: T) {} }`?',
        'Какой тип у `new Box("hi")`, если Box объявлен как `class Box<T> { constructor(public value: T) {} }`?'
      ),
      options: [
        L('Box<unknown>', 'Box<unknown>'),
        L('Box<string>', 'Box<string>'),
        L('Box<any>', 'Box<any>'),
        L('Box<object>', 'Box<object>'),
      ],
      correctIndex: 1,
      explanation: L(
        'The type parameter of a class is inferred from the constructor arguments, so a Box built from a string is a Box<string> and its value property is a string. A class can also be used with an explicit type argument, for example new Box<number>(1).',
        'Параметр типа класса выводится из аргументов конструктора, поэтому Box, собранный из строки, — это Box<string>, и его свойство value является строкой. Класс можно использовать и с явным аргументом типа, например new Box<number>(1).'
      ),
    },
    {
      id: 'ts-q27',
      question: L(
        'For `type User = { name: string; age: number }`, what is `User["name" | "age"]`?',
        'Для `type User = { name: string; age: number }` что равно `User["name" | "age"]`?'
      ),
      options: [
        L('string', 'string'),
        L('number', 'number'),
        L('User', 'User'),
        L('string | number', 'string | number'),
      ],
      correctIndex: 3,
      explanation: L(
        'An indexed access type with a union of keys gives the union of the matching property types. Inside a generic function the key can be a type parameter, and then T[K] follows whatever key is passed in.',
        'Индексный доступ с объединением ключей даёт объединение типов соответствующих свойств. Внутри обобщённой функции ключом может быть параметр типа, и тогда T[K] следует за переданным ключом.'
      ),
    },
    {
      id: 'ts-q28',
      question: L(
        'What does the type `{ [K in keyof T]: T[K] }` produce?',
        'Что производит тип `{ [K in keyof T]: T[K] }`?'
      ),
      options: [
        L('A new object type with the same keys and the same value types as T', 'Новый тип объекта с теми же ключами и теми же типами значений, что у T'),
        L('An array of the values of T', 'Массив значений T'),
        L('A union of the keys of T', 'Объединение ключей T'),
        L('A copy of T where every property becomes optional', 'Копию T, где каждое свойство стало необязательным'),
      ],
      correctIndex: 0,
      explanation: L(
        'A mapped type walks over the keys of T and rebuilds the object with them, optionally changing the value type or the modifiers. The two modifiers are the key to most utility types: adding ? makes properties optional and adding readonly freezes them.',
        'Отображаемый тип проходит по ключам T и заново собирает из них объект, при желании меняя тип значения или модификаторы. Именно эти модификаторы и лежат в основе большинства утилитных типов: добавление ? делает свойства необязательными, а readonly замораживает их.'
      ),
    },
    {
      id: 'ts-q29',
      question: L(
        'How do you remove the readonly modifier from every property of T in a mapped type?',
        'Как убрать модификатор readonly со всех свойств T в отображаемом типе?'
      ),
      options: [
        L('With `+readonly [K in keyof T]`', 'С помощью `+readonly [K in keyof T]`'),
        L('With `-readonly [K in keyof T]`', 'С помощью `-readonly [K in keyof T]`'),
        L('With `? [K in keyof T]`', 'С помощью `? [K in keyof T]`'),
        L('With `readonly? [K in keyof T]`', 'С помощью `readonly? [K in keyof T]`'),
      ],
      correctIndex: 1,
      explanation: L(
        'The minus sign removes a modifier and the plus sign adds it, so -readonly strips the readonly flag and -? removes the optional flag. The same mechanism gives Mutable<T> and Required<T> from Readonly<T> and Partial<T>.',
        'Минус убирает модификатор, а плюс добавляет, поэтому -readonly снимает флаг readonly, а -? — флаг необязательности. Тем же механизмом из Readonly<T> и Partial<T> получаются Mutable<T> и Required<T>.'
      ),
    },
    {
      id: 'ts-q30',
      question: L(
        'In `type IsString<T> = T extends string ? true : false`, when does the true branch apply?',
        'В `type IsString<T> = T extends string ? true : false` когда применяется ветка true?'
      ),
      options: [
        L('Only when T is exactly string', 'Только когда T — это в точности string'),
        L('When T is assignable to string', 'Когда T присваивается string'),
        L('When T is assignable to string, otherwise the false branch applies', 'Когда T присваивается string, иначе применяется ветка false'),
        L('Never, conditional types are not allowed in a type alias', 'Никогда, условные типы не разрешены в псевдониме типа'),
      ],
      correctIndex: 2,
      explanation: L(
        'The extends check is an assignability check, so a literal type such as "a" also takes the true branch. When T is a naked type parameter and a union, the conditional type distributes over the union, which is why IsString<string | number> becomes true | false.',
        'Проверка extends — это проверка присваиваемости, поэтому и литеральный тип вроде "a" тоже попадает в ветку true. Когда T — голый параметр типа и он является объединением, условный тип распределяется по объединению, поэтому IsString<string | number> превращается в true | false.'
      ),
    },
    {
      id: 'ts-q31',
      question: L(
        'What does infer do inside a conditional type?',
        'Что делает infer внутри условного типа?'
      ),
      options: [
        L('It declares a new type parameter on the function', 'Объявляет новый параметр типа у функции'),
        L('It declares a variable inside the true branch', 'Объявляет переменную внутри ветки true'),
        L('It checks that one type is assignable to another', 'Проверяет, что один тип присваивается другому'),
        L('It captures a part of the matched type into a new type variable', 'Захватывает часть совпавшего типа в новую переменную типа'),
      ],
      correctIndex: 3,
      explanation: L(
        'infer is what turns a conditional type into a parser: the pattern on the left of extends declares a placeholder, and the compiler binds it to whatever matched. That is how the element type of an array or the return type of a function can be extracted.',
        'Именно infer превращает условный тип в парсер: шаблон слева от extends объявляет placeholder, и компилятор связывает его с тем, что совпало. Так извлекаются тип элемента массива или тип возврата функции.'
      ),
    },
    {
      id: 'ts-q32',
      question: L(
        'What does `type Event = "click" | "focus"; type Handler = `on${Capitalize<Event>}` produce?',
        'Что производит `type Event = "click" | "focus"; type Handler = `on${Capitalize<Event>}`?'
      ),
      options: [
        L('"onClick" | "onFocus"', '"onClick" | "onFocus"'),
        L('string', 'string'),
        L('"onclick" | "onfocus"', '"onclick" | "onfocus"'),
        L('A pattern that is only checked at runtime', 'Шаблон, который проверяется только во время выполнения'),
      ],
      correctIndex: 0,
      explanation: L(
        'A template literal type distributes over the union and applies Capitalize to every member, so the result is the exact union of the two handler names. With infer in the pattern the same machinery can pull a segment out of a string, which is how typed routers describe their routes.',
        'Шаблонный литеральный тип распределяется по объединению и применяет Capitalize к каждому члену, поэтому результат — точное объединение из двух имён обработчиков. С infer в шаблоне та же техника умеет вытаскивать сегмент из строки, так устроены типизированные роутеры.'
      ),
    },
    {
      id: 'ts-q33',
      question: L(
        'What do Partial<T> and Required<T> do?',
        'Что делают Partial<T> и Required<T>?'
      ),
      options: [
        L('They make all properties readonly and optional respectively', 'Они делают все свойства readonly и необязательными соответственно'),
        L('They turn a type into an array and into a tuple', 'Они превращают тип в массив и в кортеж'),
        L('Partial makes every property optional, Required removes optionality', 'Partial делает каждое свойство необязательным, Required убирает необязательность'),
        L('They filter null and undefined out of the properties', 'Они отфильтровывают null и undefined из свойств'),
      ],
      correctIndex: 2,
      explanation: L(
        'Both are mapped types: Partial adds the ? modifier to every key and Required removes it. They are the usual pair for update patterns, where a patch carries only the fields that actually change and the full type is required everywhere else.',
        'Оба — отображаемые типы: Partial добавляет модификатор ? к каждому ключу, а Required убирает его. Это обычная пара для паттернов обновления, где патч несёт только изменяемые поля, а полный тип требуется везде, где нужны все поля.'
      ),
    },
    {
      id: 'ts-q34',
      question: L(
        'You need a type with only the id and the name of a larger User type. Which utility fits?',
        'Нужен тип только с id и name из более большого типа User. Какая утилита подходит?'
      ),
      options: [
        L('Omit<User, "id" | "name">', 'Omit<User, "id" | "name">'),
        L('Pick<User, "id" | "name">', 'Pick<User, "id" | "name">'),
        L('Partial<User>', 'Partial<User>'),
        L('Exclude<User, "id" | "name">', 'Exclude<User, "id" | "name">'),
      ],
      correctIndex: 1,
      explanation: L(
        'Pick keeps the listed keys and Omit removes them, and the second argument of both must be a union of real keys of T. Partial would make every property optional instead of choosing a subset, and Exclude works on unions, not on object types.',
        'Pick оставляет перечисленные ключи, а Omit их удаляет, и второй аргумент у обоих должен быть объединением настоящих ключей T. Partial сделал бы все свойства необязательными вместо выбора подмножества, а Exclude работает с объединениями, а не с типами объектов.'
      ),
    },
    {
      id: 'ts-q35',
      question: L(
        'What does `Exclude<"a" | "b" | "c", "a">` produce?',
        'Что производит `Exclude<"a" | "b" | "c", "a">`?'
      ),
      options: [
        L('"a" | "b" | "c"', '"a" | "b" | "c"'),
        L('"b" | "c" | "a"', '"b" | "c" | "a"'),
        L('never', 'never'),
        L('"b" | "c"', '"b" | "c"'),
      ],
      correctIndex: 3,
      explanation: L(
        'Exclude removes from the first union every member that is assignable to the second one, so the "a" disappears and the rest stays. Extract does the opposite and keeps only the assignable members, and NonNullable removes null and undefined.',
        'Exclude удаляет из первого объединения каждый член, присваиваемый второму, поэтому "a" исчезает, а остальные остаются. Extract делает обратное и оставляет только присваиваемые члены, а NonNullable убирает null и undefined.'
      ),
    },
    {
      id: 'ts-q36',
      question: L(
        'What does `Record<"a" | "b", number>` describe?',
        'Что описывает `Record<"a" | "b", number>`?'
      ),
      options: [
        L('An object with the keys "a" and "b" and numeric values', 'Объект с ключами "a" и "b" и числовыми значениями'),
        L('An array of numbers indexed by strings', 'Массив чисел, индексируемый строками'),
        L('A map from any string to a number', 'Отображение из любой строки в число'),
        L('A union of two numbers', 'Объединение двух чисел'),
      ],
      correctIndex: 0,
      explanation: L(
        'Record is a mapped type over the key type, so it produces exactly those keys with the given value type. It is the clean way to express a dictionary with a fixed set of keys, and it is what a mapped type such as { [K in K]: V } is usually written as.',
        'Record — это отображаемый тип по типу ключей, поэтому он даёт ровно эти ключи с указанным типом значений. Это чистый способ выразить словарь с фиксированным набором ключей, и обычно отображаемый тип { [K in K]: V } пишут именно так.'
      ),
    },
    {
      id: 'ts-q37',
      question: L(
        'What is wrong with `type Dict = { [key: string]: number; label: string }`?',
        'Что не так с `type Dict = { [key: string]: number; label: string }`?'
      ),
      options: [
        L('Nothing, the type is perfectly valid', 'Ничего, тип совершенно корректен'),
        L('The index signature has to be declared before the named properties', 'Индексная сигнатура должна объявляться до именованных свойств'),
        L('The property label has the type string, which is not assignable to the index signature type number', 'Свойство label имеет тип string, а он не присваивается типу индексной сигнатуры number'),
        L('Index signatures cannot be combined with named properties', 'Индексные сигнатуры нельзя сочетать с именованными свойствами'),
      ],
      correctIndex: 2,
      explanation: L(
        'Every named property of a type with an index signature has to be assignable to the type of the signature, because a lookup by any string key has to return the same kind of value. Fixing the signature to `{ [key: string]: string | number }` or widening the label to number solves it.',
        'Каждое именованное свойство типа с индексной сигнатурой должно быть присваиваемо типу сигнатуры, потому что обращение по любому строковому ключу обязано возвращать значение того же рода. Это чинится сигнатурой `{ [key: string]: string | number }` или расширением label до number.'
      ),
    },
    {
      id: 'ts-q38',
      question: L(
        'What is the type of `type Config = typeof config` when `const config = { retries: 3, url: "x" }`?',
        'Какой тип у `type Config = typeof config`, если `const config = { retries: 3, url: "x" }`?'
      ),
      options: [
        L('The literal type { retries: 3; url: "x" }', 'Литеральный тип { retries: 3; url: "x" }'),
        L('{ retries: number; url: string }', '{ retries: number; url: string }'),
        L('unknown', 'unknown'),
        L('any', 'any'),
      ],
      correctIndex: 1,
      explanation: L(
        'A type query takes the type of an existing value, so Config follows whatever the compiler inferred for the constant, which is the widened { retries: number; url: string }. Adding as const to the constant would make the query produce the literal type instead.',
        'Запрос типа берёт тип существующего значения, поэтому Config следует тому, что компилятор вывел для константы, то есть расширенному { retries: number; url: string }. Если бы к константе добавили as const, запрос дал бы литеральный тип.'
      ),
    },
    {
      id: 'ts-q39',
      question: L(
        'What does `ReturnType<typeof fetch>` give you?',
        'Что даёт `ReturnType<typeof fetch>`?'
      ),
      options: [
        L('The parameters of fetch as a tuple', 'Параметры fetch в виде кортежа'),
        L('The type of an instance of fetch', 'Тип экземпляра fetch'),
        L('The arguments that fetch accepts', 'Аргументы, которые fetch принимает'),
        L('The return type of the fetch function', 'Тип возврата функции fetch'),
      ],
      correctIndex: 3,
      explanation: L(
        'The three utilities read a function type from different angles: Parameters gives the tuple of the argument types, ReturnType gives the result type, and InstanceType gives the instance type of a constructor. All of them need a function or a constructor type, and typeof on a value is how that type is obtained.',
        'Три утилиты читают тип функции с разных сторон: Parameters даёт кортеж типов аргументов, ReturnType — тип результата, а InstanceType — тип экземпляра конструктора. Всем им нужен тип функции или конструктора, и его получают через typeof по значению.'
      ),
    },
    {
      id: 'ts-q40',
      question: L(
        'What does `Awaited<Promise<Promise<string>>>` resolve to?',
        'Во что разрешается `Awaited<Promise<Promise<string>>>`?'
      ),
      options: [
        L('string', 'string'),
        L('Promise<string>', 'Promise<string>'),
        L('Promise<Promise<string>>', 'Promise<Promise<string>>'),
        L('unknown', 'unknown'),
      ],
      correctIndex: 0,
      explanation: L(
        'Awaited unwraps a promise, and it unwraps recursively, so a promise of a promise of a string becomes a plain string. It also works with thenables, which is why it is used to describe the value an async function really produces.',
        'Awaited разворачивает промис и делает это рекурсивно, поэтому промис промиса со строкой становится обычной строкой. Он работает и с thenable-значениями, поэтому его используют, чтобы описать значение, которое действительно даёт async-функция.'
      ),
    },
    {
      id: 'ts-q41',
      question: L(
        'What does `Readonly<T>` protect against?',
        'От чего защищает `Readonly<T>`?'
      ),
      options: [
        L('It makes nested objects immutable as well', 'Он делает неизменяемыми и вложенные объекты'),
        L('It prevents the object from being passed to a function that mutates it', 'Он мешает передать объект функции, которая его мутирует'),
        L('It prevents reassigning top-level properties only, and nested objects stay mutable', 'Он запрещает переприсваивать только свойства верхнего уровня, а вложенные объекты остаются мутабельными'),
        L('It freezes the object at runtime', 'Он замораживает объект во время выполнения'),
      ],
      correctIndex: 2,
      explanation: L(
        'Readonly is a mapped type that adds the readonly modifier to the keys of T, and the modifier does not reach nested objects. A recursive type is needed for deep immutability, and as const is the way to get literal types and readonly at once.',
        'Readonly — это отображаемый тип, который добавляет модификатор readonly к ключам T, и модификатор не доходит до вложенных объектов. Для глубокой неизменяемости нужен рекурсивный тип, а as const даёт литеральные типы и readonly одновременно.'
      ),
    },
    {
      id: 'ts-q42',
      question: L(
        'With exactOptionalPropertyTypes enabled, what happens with `type U = { name?: string }; const u: U = { name: undefined };`?',
        'Что происходит при включённом exactOptionalPropertyTypes с `type U = { name?: string }; const u: U = { name: undefined };`?'
      ),
      options: [
        L('It compiles, because undefined is what a missing property means', 'Компилируется, потому что undefined и означает отсутствующее свойство'),
        L('It is an error, because undefined has to be part of the property type explicitly', 'Это ошибка: undefined должен быть явно частью типа свойства'),
        L('It compiles only in a project with strictNullChecks turned off', 'Компилируется только в проекте с выключенным strictNullChecks'),
        L('It turns the property into a required one', 'Он превращает свойство в обязательное'),
      ],
      correctIndex: 1,
      explanation: L(
        'The flag draws the line between a property that is missing and a property that is explicitly set to undefined, which are different situations for a consumer of the type. To allow it the type has to say so explicitly: { name?: string | undefined }.',
        'Флаг проводит границу между отсутствующим свойством и свойством, явно равным undefined, а для потребителя типа это разные ситуации. Чтобы разрешить это, тип должен сказать об этом прямо: { name?: string | undefined }.'
      ),
    },
    {
      id: 'ts-q43',
      question: L(
        'What does noUncheckedIndexedAccess change about `const first = items[0]` where items is an array of strings?',
        'Что меняет noUncheckedIndexedAccess в `const first = items[0]`, где items — массив строк?'
      ),
      options: [
        L('Nothing, the type of the element stays string', 'Ничего, тип элемента остаётся string'),
        L('The type becomes string | null', 'Тип становится string | null'),
        L('The access becomes a compile error', 'Доступ становится ошибкой компиляции'),
        L('The type becomes string | undefined', 'Тип становится string | undefined'),
      ],
      correctIndex: 3,
      explanation: L(
        'The flag says that an index access can be out of bounds, so the type of the element gains undefined. It exposes one of the most common runtime crashes in JavaScript, a read of an empty array, at the moment of compilation instead of in production.',
        'Флаг говорит, что доступ по индексу может выйти за границы, поэтому тип элемента получает undefined. Он выявляет одну из самых частых рантайм-падений в JavaScript — чтение из пустого массива — на этапе компиляции, а не в продакшене.'
      ),
    },
    {
      id: 'ts-q44',
      question: L(
        'What is the type of the variable in a catch block under useUnknownInCatchVariables?',
        'Какой тип у переменной в блоке catch при включённом useUnknownInCatchVariables?'
      ),
      options: [
        L('unknown, so it has to be narrowed before use', 'unknown, поэтому перед использованием его надо сузить'),
        L('any, so any property access compiles', 'any, поэтому обращение к любому свойству компилируется'),
        L('Error, because every thrown value is an Error', 'Error, потому что любое выброшенное значение — это Error'),
        L('never', 'never'),
      ],
      correctIndex: 0,
      explanation: L(
        'JavaScript allows throwing anything, so the honest type of a caught value is unknown and the developer has to decide what it is. An instanceof Error check is the usual way to narrow it before reading the message.',
        'JavaScript разрешает бросать что угодно, поэтому честный тип пойманного значения — unknown, и разработчик должен решить, что это. Проверка instanceof Error — обычный способ сузить его перед чтением message.'
      ),
    },
    {
      id: 'ts-q45',
      question: L(
        'Under strictFunctionTypes, is `(dog: Dog) => void` assignable to `(animal: Animal) => void`?',
        'При strictFunctionTypes присваивается ли `(dog: Dog) => void` типу `(animal: Animal) => void`?'
      ),
      options: [
        L('Yes, because Dog is a subtype of Animal', 'Да, потому что Dog — подтип Animal'),
        L('Yes, because function types are covariant by default', 'Да, потому что типы функций ковариантны по умолчанию'),
        L('No, because a function that only accepts a Dog cannot be used where one accepting any Animal is expected', 'Нет, потому что функция, принимающая только Dog, не подходит туда, где ожидается принимающая любого Animal'),
        L('It compiles only with a type assertion', 'Компилируется только с утверждением типа'),
      ],
      correctIndex: 2,
      explanation: L(
        'Parameters of a function are checked contravariantly under this flag, because the caller decides which animal is passed. The method syntax stays bivariant for compatibility with older code, so the same question about a method can answer differently.',
        'Параметры функции проверяются контравариантно при этом флаге, потому что вызывающий решает, какого животного передать. Синтаксис методов остаётся бивариантным ради совместимости со старым кодом, поэтому тот же вопрос о методе может дать другой ответ.'
      ),
    },
    {
      id: 'ts-q46',
      question: L(
        'Under strictPropertyInitialization, how do you declare a property that is assigned later, outside the constructor?',
        'При strictPropertyInitialization как объявить свойство, которое присваивается позже, вне конструктора?'
      ),
      options: [
        L('With an optional marker: `name?: string`', 'Знаком вопроса: `name?: string`'),
        L('With a definite assignment assertion: `name!: string`', 'Утверждением определённого присваивания: `name!: string`'),
        L('With the any type: `name: any`', 'Типом any: `name: any`'),
        L('It is not allowed at all', 'Это вообще не разрешено'),
      ],
      correctIndex: 1,
      explanation: L(
        'The exclamation mark promises the compiler that the property is assigned before it is read, typically by a framework that injects the value after construction. It removes the initialisation error, and it is a promise the developer has to keep.',
        'Восклицательный знак обещает компилятору, что свойство будет присвоено до первого чтения, обычно фреймворком, который подставляет значение после конструирования. Он убирает ошибку инициализации и это обещание, которое разработчик обязан сдержать.'
      ),
    },
    {
      id: 'ts-q47',
      question: L(
        'What does noImplicitThis report?',
        'Что сообщает noImplicitThis?'
      ),
      options: [
        L('Functions that use this inside a callback', 'Функции, использующие this внутри колбэка'),
        L('Classes that do not declare a constructor', 'Классы без объявленного конструктора'),
        L('Arrow functions declared inside methods', 'Стрелочные функции, объявленные внутри методов'),
        L('A this that would otherwise be typed as any, so it has to be bound or declared', 'this, который иначе имел бы тип any, поэтому его надо привязать или объявить'),
      ],
      correctIndex: 3,
      explanation: L(
        'The flag catches the places where this has no type, which happens when a function is detached from its object. An arrow function, a call to bind, or an explicit this parameter such as `function f(this: Window)` all fix it.',
        'Флаг ловит места, где у this нет типа, а это происходит, когда функция отрывается от своего объекта. Всё это чинит стрелочная функция, вызов bind или явный параметр this вроде `function f(this: Window)`.'
      ),
    },
    {
      id: 'ts-q48',
      question: L(
        'What does it mean that TypeScript uses structural typing?',
        'Что означает, что TypeScript использует структурную типизацию?'
      ),
      options: [
        L('Two types are compatible when their members match, regardless of the names of the types', 'Два типа совместимы, если совпадают их члены, независимо от имён типов'),
        L('A type is compatible only with a type of the same name and the same members', 'Тип совместим только с типом того же имени и с теми же членами'),
        L('A class instance is compatible only with instances of the same class', 'Экземпляр класса совместим только с экземплярами того же класса'),
        L('Types are checked only at runtime, by comparing the shapes of the values', 'Типы проверяются только во время выполнения, сравнением форм значений'),
      ],
      correctIndex: 0,
      explanation: L(
        'The compiler compares shapes, not names, so any object literal with the right properties satisfies the type. That is what enables duck typing, and it is also why branding exists: two shapes that are identical by accident are still allowed to mix.',
        'Компилятор сравнивает форму, а не имя, поэтому любой объектный литерал с нужными свойствами удовлетворяет типу. Это и даёт утиную типизацию, и это же причина существования брендинга: две случайно совпавшие формы всё равно разрешено смешивать.'
      ),
    },
    {
      id: 'ts-q49',
      question: L(
        'What problem do branded types solve?',
        'Какую проблему решают брендированные типы?'
      ),
      options: [
        L('They make a type faster to check', 'Они ускоряют проверку типа'),
        L('They make structurally identical types incompatible, so a UserId cannot be passed where an OrderId is expected', 'Они делают структурно одинаковые типы несовместимыми, поэтому UserId нельзя передать туда, где ждут OrderId'),
        L('They hide the properties of an object from the type checker', 'Они прячут свойства объекта от проверки типов'),
        L('They allow a plain number to be used without any cast', 'Они позволяют использовать обычное число без приведений'),
      ],
      correctIndex: 1,
      explanation: L(
        'A brand adds a phantom property with a unique symbol as the key, so two aliases of string stop being interchangeable while the runtime value stays a plain string. It is the standard way to keep a user id from being passed where an order id belongs.',
        'Бренд добачает фантомное свойство с ключом unique symbol, поэтому два псевдонима string перестают быть взаимозаменяемыми, а значение во время выполнения остаётся обычной строкой. Это стандартный способ не дать id пользователя попасть туда, где нужен id заказа.'
      ),
    },
    {
      id: 'ts-q50',
      question: L(
        'What is the difference between a TypeScript private member and an ECMAScript #private field?',
        'В чём разница между private в TypeScript и #private в ECMAScript?'
      ),
      options: [
        L('There is no difference, they mean the same thing', 'Разницы нет, это одно и то же'),
        L('The TypeScript private is enforced at runtime, the #private field is only checked by the compiler', 'private в TypeScript проверяется во время выполнения, а #private проверяет только компилятор'),
        L('The TypeScript private is compile-time only and stays a normal property at runtime, while #private is really private', 'private в TypeScript существует только на этапе компиляции и остаётся обычным свойством во время выполнения, а #private действительно приватный'),
        L('A #private field cannot be read in a subclass, a TypeScript private can', 'Поле #private нельзя прочитать в подклассе, а private в TypeScript можно'),
      ],
      correctIndex: 2,
      explanation: L(
        'The TypeScript modifier is erased when the code is compiled, so the property is still visible in the object at runtime and can be reached with a cast. The #private field is a real language feature: it is not accessible from outside the class at all.',
        'Модификатор TypeScript стирается при компиляции, поэтому свойство всё ещё видно в объекте во время выполнения и до него можно добраться приведением. Поле #private — настоящая возможность языка: снаружи класса оно недоступно вообще.'
      ),
    },
    {
      id: 'ts-q51',
      question: L(
        'What can you not do with an abstract class?',
        'Чего нельзя делать с абстрактным классом?'
      ),
      options: [
        L('Instantiate it directly with new', 'Инстанцировать его напрямую через new'),
        L('Declare abstract members inside it', 'Объявлять внутри него абстрактные члены'),
        L('Extend it and implement the abstract members', 'Расширять его и реализовывать абстрактные члены'),
        L('Provide concrete methods for the subclasses', 'Давать подклассам конкретные методы'),
      ],
      correctIndex: 0,
      explanation: L(
        'An abstract class exists to be extended, so new AbstractClass() is a compile error. It may still hold abstract members that every subclass has to implement, and concrete members that the subclasses inherit as they are.',
        'Абстрактный класс существует, чтобы его расширяли, поэтому new AbstractClass() — ошибка компиляции. Внутри у него могут быть абстрактные члены, которые обязан реализовать каждый подкласс, и конкретные члены, которые подклассы наследуют как есть.'
      ),
    },
    {
      id: 'ts-q52',
      question: L(
        'In a function overload set, which signature do the callers see?',
        'В наборе перегрузок функции какую сигнатуру видят вызывающие?'
      ),
      options: [
        L('The implementation signature, because it is the last one', 'Сигнатуру реализации, потому что она последняя'),
        L('All the signatures merged into one', 'Все сигнатуры, объединённые в одну'),
        L('Only the implementation signature, but with optional parameters', 'Только сигнатуру реализации, но с необязательными параметрами'),
        L('Only the overload signatures, while the implementation signature stays internal', 'Только сигнатуры перегрузок, а сигнатура реализации остаётся внутренней'),
      ],
      correctIndex: 3,
      explanation: L(
        'The overload signatures are the public API, and the implementation signature is only used inside the file. TypeScript picks the first overload whose parameters match the call, which is why the order of the overloads matters.',
        'Сигнатуры перегрузок — это публичный API, а сигнатура реализации используется только внутри файла. TypeScript выбирает первую перегрузку, параметры которой подходят вызову, поэтому порядок перегрузок важен.'
      ),
    },
    {
      id: 'ts-q53',
      question: L(
        'Why does `import type { User } from "./types"` exist?',
        'Зачем существует `import type { User } from "./types"`?'
      ),
      options: [
        L('To load the module at runtime, so the values are ready when the component renders', 'Чтобы загрузить модуль во время выполнения, чтобы значения были готовы при рендере'),
        L('To make the import work with older TypeScript versions', 'Чтобы импорт работал в старых версиях TypeScript'),
        L('To import the type only, so it is erased at runtime and no runtime dependency is created', 'Чтобы импортировать только тип: он стирается во время выполнения и рантайм-зависимость не создаётся'),
        L('To allow the module to be loaded with require instead of import', 'Чтобы модуль можно было загрузить через require, а не через import'),
      ],
      correctIndex: 2,
      explanation: L(
        'A type-only import is guaranteed to be removed from the emitted JavaScript, so the module is not pulled into the bundle and no circular dependency appears at runtime. The same rule applies to export type.',
        'Импорт только типа гарантированно удаляется из итогового JavaScript, поэтому модуль не попадает в бандл и не возникает циклической зависимости во время выполнения. То же правило касается export type.'
      ),
    },
    {
      id: 'ts-q54',
      question: L(
        'What does the verbatimModuleSyntax compiler option enforce?',
        'Что обеспечивает параметр компилятора verbatimModuleSyntax?'
      ),
      options: [
        L('That every module is compiled separately, without any project-wide information', 'Что каждый модуль компилируется отдельно, без общего контекста проекта'),
        L('That the import and export syntax is preserved as written, so type-only imports and exports have to be marked explicitly', 'Что синтаксис import и export сохраняется как написан, поэтому импорты и экспорты только типов надо помечать явно'),
        L('That type-only imports are forbidden', 'Что импорты только типов запрещены'),
        L('That the compiler emits the declarations of every module', 'Что компилятор генерирует декларации каждого модуля'),
      ],
      correctIndex: 1,
      explanation: L(
        'The option stops the compiler from guessing whether an import is a type or a value, so `import { User }` has to be written as `import { type User }` or `import type { User }`. It pairs with isolatedModules, which requires every file to be transpilable on its own.',
        'Опция запрещает компилятору угадывать, импорт это тип или значение, поэтому `import { User }` надо писать как `import { type User }` или `import type { User }`. Она работает в паре с isolatedModules, который требует, чтобы каждый файл транслипировался сам по себе.'
      ),
    },
    {
      id: 'ts-q55',
      question: L(
        'What is the purpose of a .d.ts file?',
        'Для чего нужны файлы .d.ts?'
      ),
      options: [
        L('They hold the compiled JavaScript of a module', 'В них хранится скомпилированный JavaScript модуля'),
        L('They configure the compiler options of a project', 'В них задаются параметры компилятора проекта'),
        L('They run the type checks at build time', 'В них выполняются проверки типов при сборке'),
        L('They declare types for code that has no TypeScript implementation, such as a plain JavaScript library', 'В них объявляются типы для кода без реализации на TypeScript, например для обычной JavaScript-библиотеки'),
      ],
      correctIndex: 3,
      explanation: L(
        'A declaration file contains only types, no implementation, and it is how an untyped JavaScript library gets types. Ambient declarations with declare describe values that exist at runtime without producing any code, and module augmentation extends a module that already has types.',
        'Файл деклараций содержит только типы, без реализации, и именно так обычная JavaScript-библиотека получает типы. Ambient-объявления через declare описывают значения, существующие во время выполнения, не порождая кода, а расширение модуля дополняет уже типизированный модуль.'
      ),
    },
  ],
};
