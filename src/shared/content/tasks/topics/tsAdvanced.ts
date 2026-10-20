import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsAdvancedTasks: PracticeTask[] = [
  {
    id: 'topic-ts-advanced-1',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'basic',
    title: L('A generic ApiResult type', 'Generic-тип ApiResult'),
    brief: L(
      'Write a generic result type for API calls. Define ApiResult<T> as a union of two variants: { ok: true; value: T } and { ok: false; error: string }. Then write a function unwrap(result) that returns result.value when the result is successful and throws an Error with the message of the error otherwise. The result of unwrap must have the type T, so the caller never has to check ok by hand. Example: unwrap({ ok: true, value: 42 }) returns 42, unwrap({ ok: false, error: "network down" }) throws an Error with the message "network down".',
      'Напишите generic-тип результата для вызовов API. Определите ApiResult<T> как объединение двух вариантов: { ok: true; value: T } и { ok: false; error: string }. Затем напишите функцию unwrap(result), которая возвращает result.value при успешном результате и выбрасывает Error с текстом ошибки иначе. Результат unwrap должен иметь тип T, чтобы вызывающему не приходилось вручную проверять ok. Пример: unwrap({ ok: true, value: 42 }) возвращает 42, unwrap({ ok: false, error: "network down" }) выбрасывает Error с сообщением "network down".'
    ),
    hint: L(
      'Narrow the union with if (!result.ok) and then result.value is available with the type T inside the other branch.',
      'Сузьте объединение через if (!result.ok), и тогда в другой ветке result.value доступен с типом T.'
    ),
    solution: `type ApiResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function unwrap<T>(result: ApiResult<T>): T {
  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.value;
}

console.log(unwrap<number>({ ok: true, value: 42 })); // 42
console.log(unwrap<number>({ ok: false, error: 'network down' })); // Error: network down`,
    explanation: L(
      'The result type carries the payload type as a parameter, so one definition covers every endpoint: ApiResult<User> and ApiResult<Order[]> are different types but share the same shape. The boolean field ok is the discriminant, and the check on it narrows the union so that the value branch knows the payload has type T and the error branch knows the message exists. Because unwrap takes the union and returns T, the error handling is written once and the happy path stays free of checks. A real application would add the status code to the error variant so the caller can react to a 404 differently from a 500.',
      'Тип результата принимает тип полезной нагрузки параметром, поэтому одно определение покрывает все эндпоинты: ApiResult<User> и ApiResult<Order[]> — разные типы с одинаковой формой. Поле ok выступает дискриминантом, и проверка по нему сужает объединение так, что в ветке значения полезная нагрузка имеет тип T, а в ветке ошибки известно, что сообщение существует. Поскольку unwrap принимает объединение и возвращает T, обработка ошибок пишется один раз, а успешный путь остаётся без проверок. В настоящем приложении в вариант ошибки стоит добавить код статуса, чтобы вызывающий мог отличить 404 от 500.'
    ),
  },
  {
    id: 'topic-ts-advanced-2',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'basic',
    title: L('Mapped type that makes keys optional', 'Отображаемый тип, делающий ключи необязательными'),
    brief: L(
      'Write a mapped type PartialBy<T, K> that makes the keys of K optional in T and keeps all the other keys required. The second parameter must be constrained to the keys of T, so that only real keys can be chosen. Use it with an interface User { id: number; name: string; email: string } to create the type UserDraft, where id and name are still required and email is optional. Example: a value of type UserDraft can be { id: 1, name: "Ann" } or { id: 1, name: "Ann", email: "ann@example.com" }, but the value { id: 1 } is not allowed.',
      'Напишите отображаемый тип PartialBy<T, K>, который делает ключи K необязательными в T, а все остальные ключи оставляет обязательными. Второй параметр должен быть ограничен ключами T, чтобы выбрать можно было только настоящие ключи. Примените его к интерфейсу User { id: number; name: string; email: string }, получив тип UserDraft, где id и name по-прежнему обязательны, а email необязателен. Пример: значение типа UserDraft может быть { id: 1, name: "Ann" } или { id: 1, name: "Ann", email: "ann@example.com" }, но значение { id: 1 } недопустимо.'
    ),
    hint: L(
      'Combine two mapped types: { [P in K]?: T[P] } makes the chosen keys optional, and Omit<T, K> removes them from the rest of the object.',
      'Объедините два отображаемых типа: { [P in K]?: T[P] } делает выбранные ключи необязательными, а Omit<T, K> убирает их из остальной части объекта.'
    ),
    solution: `type PartialBy<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

interface User {
  id: number;
  name: string;
  email: string;
}

type UserDraft = PartialBy<User, 'email'>;

const draft: UserDraft = { id: 1, name: 'Ann' };
const withEmail: UserDraft = { id: 1, name: 'Ann', email: 'ann@example.com' };

console.log(draft, withEmail);`,
    explanation: L(
      'The mapped type { [P in K]?: T[P] } iterates over the chosen keys and copies their value types from T, and the question mark makes each of them optional. The rest of the object comes from Omit<T, K>, which removes the modified keys and leaves everything else exactly as it was. The constraint K extends keyof T is what makes the type safe: it is impossible to make a key optional that does not exist, and a typo such as "emial" is a compile error. A mapped type also keeps working when the interface changes, because it is defined in terms of the keys rather than a hand-written list of fields.',
      'Отображаемый тип { [P in K]?: T[P] } перебирает выбранные ключи и копирует их типы значений из T, а вопросительный знак делает каждый из них необязательным. Остальная часть объекта берётся из Omit<T, K>, который убирает изменённые ключи и оставляет всё прочее как было. Ограничение K extends keyof T делает тип безопасным: невозможно сделать необязательным несуществующий ключ, а опечатка вроде "emial" — ошибка компиляции. Отображаемый тип продолжает работать и после изменения интерфейса, потому что он определён через ключи, а не через написанный руками список полей.'
    ),
  },
  {
    id: 'topic-ts-advanced-3',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'basic',
    title: L('Conditional type that detects arrays', 'Условный тип, определяющий массивы'),
    brief: L(
      'Write a conditional type IsArray<T> that resolves to the literal type true when T is an array type and to the literal type false otherwise. It must work for mutable arrays such as string[], for readonly arrays such as readonly number[], and it must return false for strings, tuples written as a plain object type and for any. Example: IsArray<string[]> is true, IsArray<readonly number[]> is true, IsArray<string> is false, IsArray<{ length: number }> is false.',
      'Напишите условный тип IsArray<T>, который разрешается в литеральный тип true, когда T — тип массива, и в литеральный тип false иначе. Он должен работать и для изменяемых массивов вроде string[], и для readonly-массивов вроде readonly number[], и возвращать false для строк, кортежей, записанных обычным типом объекта, и для any. Пример: IsArray<string[]> — true, IsArray<readonly number[]> — true, IsArray<string> — false, IsArray<{ length: number }> — false.'
    ),
    hint: L(
      'Test T against a readonly array of unknown: T extends readonly unknown[] ? true : false. The readonly element is what makes readonly arrays match too.',
      'Проверьте T на readonly-массив из unknown: T extends readonly unknown[] ? true : false. Именно readonly позволяет совпасть и readonly-массивам.'
    ),
    solution: `type IsArray<T> = T extends readonly unknown[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<readonly number[]>; // true
type C = IsArray<string>; // false
type D = IsArray<{ length: number }>; // false

const a: A = true;
const b: B = true;
const c: C = false;
const d: D = false;

console.log(a, b, c, d);`,
    explanation: L(
      'A conditional type is a type-level if: the part before the question mark is the condition, and the two branches are the results. The check against readonly unknown[] covers both mutable and readonly arrays, because a mutable array is assignable to a readonly one, and it also accepts tuples. The parameter is naked, so T is distributed over a union: IsArray<string[] | number> becomes true | false instead of a single boolean, which is usually what you want. Testing against unknown[] instead would reject readonly arrays, and testing against any[] would make the check always succeed because any matches everything.',
      'Условный тип — это if на уровне типов: часть до вопросительного знака есть условие, а две ветки — результаты. Проверка на readonly unknown[] покрывает и изменяемые, и readonly-массивы, потому что изменяемый массив присваивается readonly-типу, и подходит также для кортежей. Параметр «голый», поэтому T распределяется по объединению: IsArray<string[] | number> превращается в true | false, а не в один boolean, и обычно это именно то, что нужно. Проверка на unknown[] отклонила бы readonly-массивы, а проверка на any[] всегда срабатывала бы, потому что any совпадает со всем.'
    ),
  },
  {
    id: 'topic-ts-advanced-4',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'intermediate',
    title: L('Template literal types for routes', 'Шаблонные типы для маршрутов'),
    brief: L(
      'Use a template literal type to describe routes and to extract a segment from them. Define the type Route as the template literal type with the pattern /users/ followed by any string, then /posts/ followed by any string. Define ExtractUserId<S> so that for a concrete route string it returns the user id segment as a string literal type, and for a string that does not match the pattern it returns never. Then write the function getUserId(route) that returns the id segment of a route or null when the route does not match. Example: the type ExtractUserId of the route with the id 42 and the post 7 is the literal type "42", and getUserId("/users/42/posts/7") returns "42" while getUserId("/users/42") returns null.',
      'Используйте шаблонный тип для описания маршрутов и извлечения сегмента из них. Определите тип Route как шаблонный тип с шаблоном /users/, затем любая строка, затем /posts/, затем любая строка. Определите ExtractUserId<S> так, чтобы для конкретной строки маршрута он возвращал сегмент с id пользователя как строковый литеральный тип, а для строки, не совпадающей с шаблоном, — never. Затем напишите функцию getUserId(route), которая возвращает сегмент с id из маршрута или null, если маршрут не совпал. Пример: тип ExtractUserId для маршрута с id 42 и постом 7 равен литеральному типу "42", а getUserId("/users/42/posts/7") возвращает "42", тогда как getUserId("/users/42") возвращает null.'
    ),
    hint: L(
      'The pattern of the type is a template literal with string placeholders, and the extraction uses infer inside a conditional type: S extends `/users/${infer Id}/posts/${string}` ? Id : never.',
      'Шаблон типа — шаблонная строка с подстановками, а извлечение делается через infer внутри условного типа: S extends `/users/${infer Id}/posts/${string}` ? Id : never.'
    ),
    solution: `type Route = \`/users/\${string}/posts/\${string}\`;

type ExtractUserId<S extends string> = S extends \`/users/\${infer Id}/posts/\${string}\` ? Id : never;

type UserId = ExtractUserId<'/users/42/posts/7'>; // "42"
type NoMatch = ExtractUserId<'/users/42'>; // never

function getUserId(route: string): string | null {
  const match = /^\\/users\\/([^/]+)\\/posts\\/[^/]+$/.exec(route);
  return match ? match[1] : null;
}

console.log(getUserId('/users/42/posts/7')); // 42
console.log(getUserId('/users/42')); // null`,
    explanation: L(
      'A template literal type describes a family of strings, so a route parameter stops being an untyped part of a string and becomes a placeholder that the type system knows about. The infer keyword inside a conditional type pulls the matched part out into a new type variable, and because the literal text is fixed, the compiler can extract the segment as a literal type instead of a plain string. The same pattern is used by router libraries to build the parameters of a route from its path. The runtime function still needs a regular expression, because the types disappear when the code is compiled, and the regex mirrors the pattern of the type so both stay in sync.',
      'Шаблонный тип описывает семейство строк, поэтому параметр маршрута перестаёт быть неотличимой частью строки и становится подстановкой, известной системе типов. Ключевое слово infer внутри условного типа извлекает совпавшую часть в новую переменную типа, а так как текст фиксирован, компилятор извлекает сегмент как литеральный тип, а не просто строку. Тот же приём используют библиотеки роутинга, чтобы строить параметры маршрута по его пути. Функция во время выполнения всё равно нуждается в регулярном выражении, потому что типы исчезают при компиляции, и regex повторяет шаблон типа, чтобы обе части не расходились.'
    ),
  },
  {
    id: 'topic-ts-advanced-5',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'intermediate',
    title: L('Extract types with infer', 'Извлечение типов через infer'),
    brief: L(
      'Write two helper types that use infer. ReturnOf<T> must resolve to the return type of a function type and to never for anything that is not a function. Unwrap<T> must resolve to the type inside a promise and keep the type unchanged when it is not a promise. Use them together with typeof on a function loadUsers that returns a Promise of an array of strings: the type of the loaded data must be string[] and not Promise<string[]>. Example: the type Unwrap of the ReturnOf of the type of loadUsers is string[], and the ReturnOf of the type of a function returning number is number.',
      'Напишите два вспомогательных типа, использующих infer. ReturnOf<T> должен разрешаться в тип возврата функции и в never для всего, что не является функцией. Unwrap<T> должен разрешаться в тип внутри промиса и оставлять тип без изменений, если промисом не является. Используйте их вместе с typeof для функции loadUsers, которая возвращает промис массива строк: тип загруженных данных должен быть string[], а не Promise<string[]>. Пример: тип Unwrap от ReturnOf от типа loadUsers равен string[], а ReturnOf от типа функции, возвращающей number, равен number.'
    ),
    hint: L(
      'A function type is written as (...args: never[]) => infer R, and a promise is Promise<infer U>. Both are matched with extends inside a conditional type.',
      'Тип функции записывается как (...args: never[]) => infer R, а промис — как Promise<infer U>. Оба проверяются через extends внутри условного типа.'
    ),
    solution: `type ReturnOf<T> = T extends (...args: never[]) => infer R ? R : never;

type Unwrap<T> = T extends Promise<infer U> ? U : T;

function loadUsers(): Promise<string[]> {
  return Promise.resolve(['ann', 'bo']);
}

type LoadedUsers = Unwrap<ReturnOf<typeof loadUsers>>; // string[]
type NumberResult = ReturnOf<() => number>; // number

const loaded: LoadedUsers = ['ann', 'bo'];
const total: NumberResult = 42;

console.log(loaded, total);`,
    explanation: L(
      'infer creates a type variable inside a conditional type and binds it to whatever matched the pattern, which is how the compiler can pull a type out of another type. The never[] in the argument list makes the pattern match any function, no matter how many parameters it has and what their types are, and the infer R captures only the return type. Unwrap is the same idea one level deeper: it removes the Promise wrapper and leaves the payload type. Combining them with typeof on a function is the common way to talk about the data behind an async function without repeating its signature, and it breaks automatically when the signature changes.',
      'infer создаёт переменную типа внутри условного типа и связывает её с тем, что совпало с шаблоном, — так компилятор умеет вытаскивать тип из другого типа. never[] в списке аргументов позволяет шаблону совпасть с любой функцией, сколько бы параметров у неё ни было и какие бы они ни были, а infer R захватывает только тип возврата. Unwrap — та же идея на уровень глубже: он снимает обёртку Promise и оставляет тип полезной нагрузки. Их комбинация с typeof для функции — обычный способ говорить о данных за асинхронной функцией, не повторяя её сигнатуру, и связь рвётся автоматически, когда сигнатура меняется.'
    ),
  },
  {
    id: 'topic-ts-advanced-6',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Branded identifier types', 'Брендированные типы идентификаторов'),
    brief: L(
      'Make a plain number impossible to use where a user id is expected. Declare a unique symbol named brand and write the type Brand<T, B extends string> that adds a readonly property of that symbol type to T, so that the brand is part of the type but not of the value. Define UserId as Brand<number, "UserId"> and OrderId as Brand<number, "OrderId">. Then write the function userId(value) that validates the number (it must be an integer greater than zero, otherwise an Error is thrown) and returns it as UserId, and the function findUser(id: UserId) that returns the string "user-" followed by the id. Example: userId(42) returns a UserId, and passing the plain number 42 to findUser must be a compile error, while passing userId(42) is fine.',
      'Сделайте так, чтобы обычное число нельзя было использовать там, где ожидается id пользователя. Объявите unique symbol с именем brand и напишите тип Brand<T, B extends string>, который добавляет к T readonly-свойство с этим символьным типом, чтобы бренд был частью типа, но не частью значения. Определите UserId как Brand<number, "UserId"> и OrderId как Brand<number, "OrderId">. Затем напишите функцию userId(value), которая проверяет число (оно должно быть целым больше нуля, иначе выбрасывается Error) и возвращает его как UserId, и функцию findUser(id: UserId), которая возвращает строку "user-" вместе с id. Пример: userId(42) возвращает UserId, а передать обычное число 42 в findUser — ошибка компиляции, тогда как userId(42) подходит.'
    ),
    hint: L(
      'The brand property is what makes the types incompatible. A unique symbol used as a property key cannot be created outside the module, so the only way to get a UserId is through the userId function.',
      'Свойство-бренд и делает типы несовместимыми. Unique symbol в роли ключа свойства нельзя создать вне модуля, поэтому единственный способ получить UserId — вызвать функцию userId.'
    ),
    solution: `declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<number, 'UserId'>;
type OrderId = Brand<number, 'OrderId'>;

function userId(value: number): UserId {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('UserId must be a positive integer');
  }

  return value as UserId;
}

function findUser(id: UserId): string {
  return \`user-\${id}\`;
}

console.log(findUser(userId(42))); // user-42`,
    explanation: L(
      'Two aliases of number are still the same type, so a UserId and an OrderId could be mixed up without any error. The brand adds a property whose key is a unique symbol, and that symbol cannot be produced by any other code, so the two branded types are no longer assignable to each other. The property exists only in the type, not in the value, so nothing is added to the number at runtime and the cost is zero. The factory function is the only way to create a branded value, and it is the right place for the validation, so an invalid id can never enter the system. The same pattern is used for currency amounts and for opaque ids from an API.',
      'Два псевдонима number — всё ещё один тип, поэтому UserId и OrderId можно было бы перепутать без всякой ошибки. Бренд добавляет свойство, ключом которого служит unique symbol, а такой символ не может создать никакой другой код, поэтому два брендированных типа больше не присваиваются друг другу. Свойство существует только в типе, а не в значении, поэтому число во время выполнения не меняется и цена нулевая. Фабрика — единственный способ создать брендированное значение, и именно там правильно описать проверку, чтобы невалидный id не мог попасть в систему. Тот же приём применяют для денежных сумм и для непрозрачных id из API.'
    ),
  },
  {
    id: 'topic-ts-advanced-7',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Deep readonly on the type level', 'Deep readonly на уровне типов'),
    brief: L(
      'Write a type DeepReadonly<T> that makes a type readonly at every level, including the nested objects and the arrays, but leaves functions and the primitive types alone. It must work for an object with a nested object and an array of objects, and it must not try to map over the properties of a function. Example: for the type Config with the fields server (an object with port and host) and tags (an array of strings), the type DeepReadonly of Config makes server.port readonly, makes the array readonly, and keeps the type of the tags as readonly string[].',
      'Напишите тип DeepReadonly<T>, который делает тип readonly на каждом уровне, включая вложенные объекты и массивы объектов, но не трогает функции и примитивные типы. Он должен работать для объекта с вложенным объектом и массивом объектов и не должен пытаться отображать свойства функции. Пример: для типа Config с полями server (объект с port и host) и tags (массив строк) тип DeepReadonly от Config делает server.port readonly, делает массив readonly и оставляет тип tags как readonly string[].'
    ),
    hint: L(
      'Check the cases in order: a function stays as it is, an array becomes a readonly array of the mapped elements, an object becomes a mapped object with readonly keys, and everything else stays unchanged.',
      'Проверяйте случаи по порядку: функция остаётся как есть, массив становится readonly-массивом отображённых элементов, объект — отображаемым объектом с readonly-ключами, а всё остальное не меняется.'
    ),
    solution: `type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

interface Config {
  server: { port: number; host: string };
  tags: string[];
}

type Frozen = DeepReadonly<Config>;

const config: Frozen = {
  server: { port: 8080, host: 'localhost' },
  tags: ['a', 'b'],
};

// config.server.port = 1; // Error: cannot assign to a readonly property`,
    explanation: L(
      'The type is a recursive conditional: every property is passed through the same transformation, so the readonly marker reaches the nested objects and the elements of the arrays. The order of the checks matters. A function is returned unchanged, because mapping over the properties of a function would replace it with an object that no longer has a call signature, and the parameters of a function are often not even part of its type. The array branch uses infer to get the element type and rebuilds the array as readonly, which makes push and sort unavailable. The last branch keeps the primitive types as they are, since they are not objects and have no properties to protect.',
      'Тип рекурсивный условный: каждое свойство проходит через то же преобразование, поэтому метка readonly доходит до вложенных объектов и до элементов массивов. Порядок проверок важен. Функция возвращается без изменений, потому что отображение по свойствам функции превратило бы её в объект без сигнатуры вызова, а параметры функции часто вообще не входят в её тип. Ветка массива через infer получает тип элемента и пересобирает массив как readonly, из-за чего push и sort становятся недоступны. Последняя ветка оставляет примитивные типы как есть: это не объекты, и защищать у них нечего.'
    ),
  },
  {
    id: 'topic-ts-advanced-8',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Variadic tuple types for head and tail', 'Вариативные кортежные типы для head и tail'),
    brief: L(
      'Write two functions that work with the shape of a tuple. The type Head<T> must resolve to the type of the first element of a tuple and to never for an empty tuple. The type Tail<T> must resolve to the type of the tuple without its first element and to an empty tuple for a single-element tuple. Then write head(tuple) that returns the first element and throws an Error with the message "head: the tuple is empty" for an empty tuple, and tail(tuple) that returns the rest of the tuple and throws an Error with the message "tail: the tuple is empty" for an empty tuple. Example: head([1, "a"] as const) returns 1 with the literal type 1, and tail([1, "a", true] as const) returns ["a", true] with the type ["a", true].',
      'Напишите две функции, работающие с формой кортежа. Тип Head<T> должен разрешаться в тип первого элемента кортежа и в never для пустого кортежа. Тип Tail<T> должен разрешаться в тип кортежа без первого элемента и в пустой кортеж для кортежа из одного элемента. Затем напишите head(tuple), возвращающую первый элемент и выбрасывающую Error с сообщением "head: the tuple is empty" для пустого кортежа, и tail(tuple), возвращающую остаток кортежа и выбрасывающую Error с сообщением "tail: the tuple is empty" для пустого кортежа. Пример: head([1, "a"] as const) возвращает 1 с литеральным типом 1, а tail([1, "a", true] as const) возвращает ["a", true] с типом ["a", true].'
    ),
    hint: L(
      'Match the tuple with a variadic pattern: T extends readonly [infer H, ...unknown[]] gives the first element, and T extends readonly [unknown, ...infer R] gives the rest.',
      'Сопоставьте кортеж с вариативным шаблоном: T extends readonly [infer H, ...unknown[]] даёт первый элемент, а T extends readonly [unknown, ...infer R] — остаток.'
    ),
    solution: `type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;

type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : [];

function head<T extends readonly unknown[]>(tuple: T): Head<T> {
  if (tuple.length === 0) {
    throw new Error('head: the tuple is empty');
  }

  return tuple[0] as unknown as Head<T>;
}

function tail<T extends readonly unknown[]>(tuple: T): Tail<T> {
  if (tuple.length === 0) {
    throw new Error('tail: the tuple is empty');
  }

  return tuple.slice(1) as unknown as Tail<T>;
}

const pair = [1, 'a'] as const;
console.log(head(pair)); // 1
console.log(tail([1, 'a', true])); // [ 'a', true ]`,
    explanation: L(
      'A variadic tuple pattern describes a tuple of any length that starts with something, and infer binds the pieces to new type variables. In Head the pattern is [infer H, ...unknown[]], so the first element gets its own type and the rest of the tuple is swallowed by the rest element, which matches any number of items. In Tail the pattern is [unknown, ...infer R], so the first position is thrown away and everything after it is collected into R. Because the patterns are checked in order, a tuple of one element produces an empty tuple for Tail and the empty tuple produces never for Head. The functions keep the tuple type instead of widening it to an array, so the length of the result is known at compile time.',
      'Вариативный кортежный шаблон описывает кортеж любой длины, который начинается с чего-то, а infer связывает части с новыми переменными типа. В Head шаблон равен [infer H, ...unknown[]], поэтому первый элемент получает свой тип, а остальной кортеж поглощается rest-элементом, совпадающим с любым числом элементов. В Tail шаблон равен [unknown, ...infer R], поэтому первая позиция отбрасывается, а всё после неё собирается в R. Поскольку шаблоны проверяются по порядку, кортеж из одного элемента даёт пустой кортеж для Tail, а пустой кортеж — never для Head. Функции сохраняют тип кортежа, не расширяя его до массива, поэтому длина результата известна на этапе компиляции.'
    ),
  },
];
