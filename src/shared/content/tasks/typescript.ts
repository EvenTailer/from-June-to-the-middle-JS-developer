import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const typescriptTasks: PracticeTask[] = [
  {
    id: 'ts-task-4',
    topic: 'typescript',
    level: 'basic',
    title: L('Generic API response type', 'Обобщённый тип ответа API'),
    brief: L(
      'Create an ApiResponse<T> type with data, status and requestId fields. Write unwrap that returns data while keeping the caller type.',
      'Создайте тип ApiResponse<T> с полями data, status и requestId. Напишите unwrap, который возвращает data, сохраняя тип у вызывающего кода.'
    ),
    hint: L(
      'The generic parameter belongs to the type, and unwrap receives ApiResponse<T>.',
      'Generic-параметр принадлежит типу, а unwrap принимает ApiResponse<T>.'
    ),
    solution: `interface ApiResponse<T> {
  data: T;
  status: number;
  requestId: string;
}

function unwrap<T>(response: ApiResponse<T>): T {
  return response.data;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: 'Ann' },
  status: 200,
  requestId: 'req_42',
};

const user = unwrap(response);
// user is typed as User, so user.name is a string`,
    explanation: L(
      'ApiResponse<T> describes the envelope once, and T fills in the payload. unwrap returns T instead of unknown, so callers keep full type information.',
      'ApiResponse<T> один раз описывает обёртку, а T задаёт полезную нагрузку. unwrap возвращает T, а не unknown, поэтому вызывающий код сохраняет полную информацию о типе.'
    ),
  },
  {
    id: 'ts-task-5',
    topic: 'ts-advanced',
    level: 'basic',
    title: L('Make selected keys optional', 'Сделать выбранные ключи необязательными'),
    brief: L(
      'Create PartialBy<T, K> that makes only the selected keys optional while every other key stays required.',
      'Создайте PartialBy<T, K>, который делает необязательными только выбранные ключи, а все остальные оставляет обязательными.'
    ),
    hint: L(
      'Combine Omit<T, K> with Partial<Pick<T, K>>.',
      'Объедините Omit<T, K> и Partial<Pick<T, K>>.'
    ),
    solution: `interface User {
  id: string;
  name: string;
  email: string;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type DraftUser = PartialBy<User, 'id'>;

const draft: DraftUser = {
  name: 'Ann',
  email: 'ann@example.com',
};

// const invalid: DraftUser = { name: 'Ann' };
// Error: email is still required`,
    explanation: L(
      'Omit removes the selected keys and Partial adds them back as optional. The intersection keeps the remaining fields required and fully typed.',
      'Omit удаляет выбранные ключи, а Partial возвращает их как необязательные. Пересечение сохраняет остальные поля обязательными и полностью типизированными.'
    ),
  },
  {
    id: 'ts-task-6',
    topic: 'ts-advanced',
    level: 'basic',
    title: L('Detect arrays at the type level', 'Определить массив на уровне типов'),
    brief: L(
      'Create a conditional type IsArray<T> that resolves to true for arrays and false for everything else.',
      'Создайте условный тип IsArray<T>, который даёт true для массивов и false для всего остального.'
    ),
    hint: L(
      'Check T extends readonly unknown[]. Wrap both sides in tuples to stop distribution over unions.',
      'Проверьте T extends readonly unknown[]. Оберните обе стороны в кортежи, чтобы отключить распределение по union.'
    ),
    solution: `type IsArray<T> = T extends readonly unknown[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<{ length: number }>; // false
type C = IsArray<readonly number[]>; // true

const check: IsArray<number[]> = true;

// For unions, prevent distributive behaviour:
type IsArrayStrict<T> = [T] extends [readonly unknown[]] ? true : false;
type D = IsArrayStrict<string[] | number>; // false`,
    explanation: L(
      'A conditional type distributes over naked union members. Tuple wrapping treats the union as one type, which is usually what a type guard helper needs.',
      'Условный тип распределяется по членам union. Обёртка в кортеж рассматривает union как один тип — обычно именно это нужно вспомогательному типу-проверке.'
    ),
  },
  {
    id: 'ts-task-7',
    topic: 'ts-advanced',
    level: 'intermediate',
    title: L('Typed routes with template literals', 'Типизированные маршруты через template literal'),
    brief: L(
      'Describe user and comment routes with template literal types and write a navigate function that only accepts matching paths.',
      'Опишите маршруты пользователя и комментариев через template literal types и напишите функцию navigate, которая принимает только подходящие пути.'
    ),
    hint: L(
      'A template literal type uses backticks, and ${number} inserts a numeric segment.',
      'Template literal type использует обратные кавычки, а ${number} вставляет числовой сегмент.'
    ),
    solution: `type UserRoute = \`/users/\${number}\`;
type CommentRoute = \`/posts/\${string}/comments/\${number}\`;
type ApiRoute = UserRoute | CommentRoute;

function navigate(path: ApiRoute): void {
  console.log('Navigating to ' + path);
}

navigate('/users/42');
navigate('/posts/hello/comments/7');

// navigate('/users/abc');
// Error: string does not match the route pattern`,
    explanation: L(
      'Template literal types validate the shape of a string at compile time. They are erased at runtime, so the server still needs its own validation.',
      'Template literal types проверяют форму строки на этапе компиляции. Во время выполнения они стираются, поэтому серверу всё равно нужна собственная проверка.'
    ),
  },
  {
    id: 'ts-task-8',
    topic: 'typescript',
    level: 'intermediate',
    title: L('Type guard for unknown data', 'Type guard для unknown-данных'),
    brief: L(
      'Write isUser(value: unknown): value is User that checks the runtime shape of parsed JSON before the value is used.',
      'Напишите isUser(value: unknown): value is User, который проверяет форму разобранного JSON до использования значения.'
    ),
    hint: L(
      'Check typeof, null, then read fields through Record<string, unknown>.',
      'Проверьте typeof и null, затем читайте поля через Record<string, unknown>.'
    ),
    solution: `interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string'
  );
}

const payload: unknown = JSON.parse('{"id":1,"name":"Ann"}');

if (isUser(payload)) {
  console.log(payload.name.toUpperCase());
} else {
  console.log('Invalid payload');
}`,
    explanation: L(
      'A type predicate narrows unknown inside the if block. The checks are real runtime checks, so broken API data cannot reach typed code.',
      'Предикат типа сужает unknown внутри блока if. Проверки выполняются реально, поэтому повреждённые данные API не попадут в типизированный код.'
    ),
  },
  {
    id: 'ts-task-9',
    topic: 'typescript',
    level: 'intermediate',
    title: L('Assertion function validator', 'Функция-утверждение для валидации'),
    brief: L(
      'Turn the user check into assertUser(value: unknown): asserts value is User that throws on invalid input and narrows afterwards.',
      'Превратите проверку пользователя в assertUser(value: unknown): asserts value is User, который выбрасывает ошибку при неверных данных и сужает тип дальше.'
    ),
    hint: L(
      'An assertion signature uses asserts value is T. Call it on a variable with an explicit type annotation.',
      'Сигнатура утверждения использует asserts value is T. Вызывайте её для переменной с явной аннотацией типа.'
    ),
    solution: `interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string'
  );
}

function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Expected a user object');
  }
}

function printName(value: unknown): void {
  assertUser(value);
  // value is User after this line
  console.log(value.name);
}

printName({ id: 1, name: 'Ann' });`,
    explanation: L(
      'Unlike a guard, an assertion function narrows the rest of the current scope and does not need an if. It must throw when the condition fails.',
      'В отличие от type guard, функция-утверждение сужает тип до конца текущей области и не требует if. Она обязана выбрасывать ошибку при неудачной проверке.'
    ),
  },
  {
    id: 'ts-task-10',
    topic: 'ts-advanced',
    level: 'intermediate',
    title: L('Form reducer with a discriminated union', 'Редьюсер формы на discriminated union'),
    brief: L(
      'Model form actions as a discriminated union and write a reducer that handles change, submit, success and failure.',
      'Опишите действия формы как discriminated union и напишите редьюсер, который обрабатывает change, submit, success и failure.'
    ),
    hint: L(
      'Use the type field as the discriminant and a never check in the default branch.',
      'Используйте поле type как дискриминант и проверку never в ветке default.'
    ),
    solution: `interface FormState {
  name: string;
  email: string;
  submitting: boolean;
}

type FormAction =
  | { type: 'change'; field: 'name' | 'email'; value: string }
  | { type: 'submit' }
  | { type: 'success' }
  | { type: 'failure' };

const initialState: FormState = {
  name: '',
  email: '',
  submitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'change':
      return action.field === 'name'
        ? { ...state, name: action.value }
        : { ...state, email: action.value };
    case 'submit':
      return { ...state, submitting: true };
    case 'success':
      return { ...initialState };
    case 'failure':
      return { ...state, submitting: false };
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}`,
    explanation: L(
      'Each action carries only the fields it needs. The never assignment makes a new action variant fail compilation until it gets a case.',
      'Каждое действие несёт только нужные ему поля. Присваивание в never ломает компиляцию при добавлении варианта без обработки.'
    ),
  },
  {
    id: 'ts-task-11',
    topic: 'typescript',
    level: 'advanced',
    title: L('Validate config with satisfies', 'Проверить конфигурацию через satisfies'),
    brief: L(
      'Write a routes config that is checked against a shape but keeps literal route names for keyof.',
      'Напишите конфигурацию маршрутов, которая проверяется по форме, но сохраняет литеральные имена для keyof.'
    ),
    hint: L(
      'satisfies validates an expression without widening the inferred literal types.',
      'satisfies проверяет выражение, не расширяя выведенные литеральные типы.'
    ),
    solution: `const routes = {
  home: { title: 'Home', requiresAuth: false },
  dashboard: { title: 'Dashboard', requiresAuth: true },
} satisfies Record<string, { title: string; requiresAuth: boolean }>;

type RouteName = keyof typeof routes; // 'home' | 'dashboard'

function open(name: RouteName): void {
  console.log(routes[name].title);
}

open('dashboard');

// open('settings');
// Error: not a known route
// routes.dashboard.requiresAuth = 'yes';
// Error: string is not assignable to boolean`,
    explanation: L(
      'A type annotation would widen the keys to string. satisfies checks every property and still infers the exact literal keys and value types.',
      'Аннотация типа расширила бы ключи до string. satisfies проверяет каждое свойство и при этом выводит точные литеральные ключи и типы значений.'
    ),
  },
  {
    id: 'ts-task-12',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Recursive DeepPartial type', 'Рекурсивный тип DeepPartial'),
    brief: L(
      'Create DeepPartial<T> that makes nested object fields optional, keeps arrays as arrays and leaves functions untouched.',
      'Создайте DeepPartial<T>, который делает вложенные поля объектов необязательными, сохраняет массивы массивами и не трогает функции.'
    ),
    hint: L(
      'Recurse with mapped types and handle functions and arrays before the object branch.',
      'Рекурсируйте через mapped types и обрабатывайте функции и массивы до ветки object.'
    ),
    solution: `interface User {
  id: number;
  name: string;
  address: { city: string; zip: string };
  roles: string[];
  notify: (message: string) => void;
}

type DeepPartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

const patch: DeepPartial<User> = {
  name: 'Ann',
  address: { city: 'Berlin' },
  roles: ['admin'],
};

// patch.notify is still (message: string) => void`,
    explanation: L(
      'The function branch stops recursion before object mapping. Without it, a function would be turned into an object with optional keys.',
      'Ветка функции останавливает рекурсию до отображения объекта. Без неё функция превратилась бы в объект с необязательными ключами.'
    ),
  },
  {
    id: 'ts-task-13',
    topic: 'typescript',
    level: 'advanced',
    title: L('Typed get by keyof', 'Типизированный get через keyof'),
    brief: L(
      'Implement get<T, K extends keyof T>(object, key) that returns the exact property type instead of a union of all values.',
      'Реализуйте get<T, K extends keyof T>(object, key), который возвращает точный тип свойства, а не union всех значений.'
    ),
    hint: L(
      'The return type is T[K], an indexed access type.',
      'Возвращаемый тип — T[K], тип доступа по индексу.'
    ),
    solution: `function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = { id: 1, name: 'Ann', active: true };

const name = get(user, 'name'); // string
const active = get(user, 'active'); // boolean
const id = get(user, 'id'); // number

// get(user, 'age');
// Error: 'age' is not a key of user

console.log(name.toUpperCase(), active, id + 1);`,
    explanation: L(
      'T[K] is linked to the concrete key argument. Passing a key that does not exist fails, and the result does not need a cast or a runtime check.',
      'T[K] связан с конкретным аргументом ключа. Несуществующий ключ не пройдёт проверку, а результат не требует приведения типа или проверки во время выполнения.'
    ),
  },
  {
    id: 'ts-task-14',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Branded ids', 'Брендированные идентификаторы'),
    brief: L(
      'Create a Brand helper and separate UserId and OrderId types so a plain string cannot be passed where an id is expected.',
      'Создайте помощник Brand и раздельные типы UserId и OrderId, чтобы обычную строку нельзя было передать вместо идентификатора.'
    ),
    hint: L(
      'Intersect the base type with a readonly marker property and cast only inside a factory.',
      'Пересеките базовый тип с readonly свойством-маркером и приводите тип только внутри фабрики.'
    ),
    solution: `type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function toUserId(value: string): UserId {
  return value as UserId;
}

function getUser(id: UserId): string {
  return 'user:' + id;
}

const id = toUserId('user_42');
getUser(id);

// getUser('user_42');
// Error: string is not assignable to UserId

// const orderId: OrderId = id;
// Error: the brands do not match`,
    explanation: L(
      'Structural typing would accept any string as an id. The brand adds a nominal marker, and the single cast inside the factory keeps the rest of the code safe.',
      'Структурная типизация приняла бы любую строку как идентификатор. Бренд добавляет номинальный маркер, а единственное приведение внутри фабрики делает остальной код безопасным.'
    ),
  },
  {
    id: 'ts-task-15',
    topic: 'ts-advanced',
    level: 'advanced',
    title: L('Extract async return type with infer', 'Извлечь тип результата async-функции через infer'),
    brief: L(
      'Implement MyReturnType<T> with infer, then build AsyncValue<T> that unwraps the resolved value of an async function.',
      'Реализуйте MyReturnType<T> через infer, затем постройте AsyncValue<T>, который извлекает разрешённое значение async-функции.'
    ),
    hint: L(
      'Place infer R in the return position of a function type, then match Promise<infer R>.',
      'Поместите infer R в позицию возвращаемого типа функции, затем сопоставьте Promise<infer R>.'
    ),
    solution: `type MyReturnType<T> =
  T extends (...args: never[]) => infer R ? R : never;

type AsyncValue<T> =
  T extends (...args: never[]) => Promise<infer R> ? R : never;

async function loadUser() {
  return { id: 1, name: 'Ann' };
}

type User = AsyncValue<typeof loadUser>;
// { id: number; name: string }

const user: User = { id: 1, name: 'Ann' };

console.log(user.name);`,
    explanation: L(
      'infer declares a type variable inside a conditional type and lets TypeScript fill it from the matched signature. The async wrapper removes one Promise layer.',
      'infer объявляет типовую переменную внутри условного типа и позволяет TypeScript заполнить её из сопоставленной сигнатуры. Асинхронная обёртка убирает один слой Promise.'
    ),
  },
];
