import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const typescriptChapterTasks: PracticeTask[] = [
  {
    id: 'ch-ts-ch1-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch1',
    level: 'basic',
    title: L('Narrow unknown at the boundary', 'Сужение unknown на границе'),
    brief: L(
      'Write parseProfile, which takes an unknown payload and returns a Profile with a string id and a string name, and describe, which turns any unknown value into a readable string. The payload must be narrowed with typeof and in checks instead of a cast, and the code must compile under strict.',
      'Напишите parseProfile, который принимает значение типа unknown и возвращает Profile со строковыми id и name, и describe, который превращает любое значение типа unknown в читаемую строку. Данные нужно сузить проверками typeof и in, а не приведением типа, и код должен собираться в строгом режиме.'
    ),
    hint: L(
      'unknown accepts every value and cannot be used until it is narrowed: check typeof first, then check the property with the in operator. A function that always throws has the return type never.',
      'unknown принимает любое значение и становится пригодным только после сужения: сначала проверьте typeof, затем наличие свойства оператором in. Функция, которая всегда бросает исключение, имеет тип возврата never.'
    ),
    solution: `interface Profile { id: string; name: string; }

// External data arrives as unknown, so it is narrowed and never cast.
export function parseProfile(raw: unknown): Profile {
  if (typeof raw !== 'object' || raw === null) throw new Error('not an object');
  const id = 'id' in raw ? raw.id : undefined;
  const name = 'name' in raw ? raw.name : undefined;
  if (typeof id !== 'string') throw new Error('bad id');
  if (typeof name !== 'string') throw new Error('bad name');
  return { id, name };
}

// A branch that can never happen throws and has the type never.
export function describe(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toFixed(2);
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (value === null) return 'null';
  throw new Error('unsupported value');
}

console.log(parseProfile(JSON.parse('{"id":"u1","name":"Ada"}')));
console.log(describe(42));`,
    explanation: L(
      'The payload arrives from outside the program, so it is typed as unknown and narrowed step by step until the compiler knows the exact shape. A cast would only silence the compiler, while the checks in the body stay in the emitted JavaScript and protect the program at run time.',
      'Данные приходят извне программы, поэтому они типизированы как unknown и сужаются шаг за шагом, пока компилятор не узнает точную форму. Приведение типа лишь замолчало бы компилятор, а проверки в теле остаются в сгенерированном JavaScript и защищают программу во время выполнения.'
    ),
  },
  {
    id: 'ch-ts-ch2-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch2',
    level: 'basic',
    title: L('Exhaustive switch over a discriminated union', 'Исчерпывающий switch по дискриминированному объединению'),
    brief: L(
      'Model a payment as a discriminated union with the states pending, paid and failed, and write a describeOrder function that handles every state. Add a helper that assigns the leftover value to never, so that adding a fourth state turns the missing case into a compile error instead of a silent undefined.',
      'Опишите платёж как дискриминированное объединение со состояниями pending, paid и failed и напишите функцию describeOrder, которая обрабатывает каждое состояние. Добавьте хелпер, который присваивает оставшееся значение в never, чтобы четвёртое состояние превращало забытый случай в ошибку компиляции, а не в тихий undefined.'
    ),
    hint: L(
      'Give every member of the union a literal field kind, then switch on it: the comparison narrows the union to a single member. In the default branch assign the value to a parameter of type never.',
      'Дайте каждому участнику объединения литеральное поле kind и переключайтесь по нему: сравнение сужает объединение до одного участника. В ветке default присвойте значение параметру типа never.'
    ),
    solution: `type Payment =
  | { kind: 'pending'; orderId: string }
  | { kind: 'paid'; orderId: string; amount: number }
  | { kind: 'failed'; orderId: string; reason: string };

// never in the default branch turns a missing case into a compile error.
function assertNever(value: never): never {
  throw new Error('Unhandled payment state: ' + value);
}

// The discriminant narrows the union, so each case sees its own fields.
function describeOrder(payment: Payment): string {
  switch (payment.kind) {
    case 'pending': return payment.orderId + ' is waiting';
    case 'paid': return payment.orderId + ' paid ' + payment.amount;
    case 'failed': return payment.orderId + ' failed: ' + payment.reason;
    default: return assertNever(payment);
  }
}

console.log(describeOrder({ kind: 'paid', orderId: 'o-1', amount: 100 }));`,
    explanation: L(
      'The literal field kind is the discriminant: one comparison tells the compiler which member of the union is in hand, and every case reads only the fields that member declares. The assertNever helper proves the switch is complete, so a new state produces one compile error per incomplete switch instead of an undefined at run time.',
      'Литеральное поле kind — это дискриминант: одно сравнение сообщает компилятору, какой участник объединения перед ним, и каждый case читает только поля своего участника. Хелпер assertNever доказывает, что switch полон, поэтому новое состояние даёт по одной ошибке компиляции на каждый неполный switch, а не undefined в рантайме.'
    ),
  },
  {
    id: 'ch-ts-ch3-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch3',
    level: 'basic',
    title: L('A generic lookup with a constraint', 'Обобщённый поиск с ограничением'),
    brief: L(
      'Declare an Entity interface with a string id, write a generic findById that returns the matching item or undefined and accepts only items that have an id, and add a Record type with literal keys plus an index signature for a dynamic dictionary. The lookup must keep the concrete type of the array it was given.',
      'Опишите интерфейс Entity со строковым id, напишите обобщённый findById, который возвращает найденный элемент или undefined и принимает только элементы с id, и добавьте тип Record с литеральными ключами и индексную сигнатуру для динамического словаря. Поиск должен сохранять конкретный тип переданного массива.'
    ),
    hint: L(
      'Constrain the type parameter with extends Entity when the body needs the id member, and let inference pick the type argument at the call site. Record with literal keys keeps every key required, an index signature is for genuinely dynamic keys.',
      'Ограничьте параметр типа через extends Entity, когда телу нужен член id, и позвольте выводу подобрать аргумент типа в месте вызова. Record с литеральными ключами делает каждый ключ обязательным, а индексная сигнатура нужна для действительно динамических ключей.'
    ),
    solution: `interface Entity {
  id: string;
}

// A generic constraint lets the body use the members of T.
function findById<T extends Entity>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

// Record with literal keys keeps every key required.
type Levels = Record<'debug' | 'info', number>;

// An index signature is for genuinely dynamic keys.
type Scores = { [name: string]: number };

const levels: Levels = { debug: 1, info: 2 };
const scores: Scores = { alice: 10 };

const users: Entity[] = [{ id: 'u1' }, { id: 'u2' }];
console.log(findById(users, 'u2'), levels.debug, scores.alice);`,
    explanation: L(
      'The extends constraint tells the compiler that every item has an id, so the body of findById may compare it, while the return type keeps the concrete type T of the array that was passed in. Record and the index signature cover the two ends of the spectrum: fixed literal keys and completely dynamic ones.',
      'Ограничение extends сообщает компилятору, что у каждого элемента есть id, поэтому тело findById может его сравнивать, а тип возврата сохраняет конкретный тип T переданного массива. Record и индексная сигнатура покрывают два края спектра: фиксированные литеральные ключи и полностью динамические.'
    ),
  },
  {
    id: 'ch-ts-ch4-1',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    chapterId: 'ts-ch4',
    level: 'intermediate',
    title: L('Mapped types and key remapping', 'Отображаемые типы и ремаппинг ключей'),
    brief: L(
      'Write a get helper that reads a property of an object through a key restricted to keyof T, build a Getters type that turns every field of a User into a readonly function named getX, and derive a Public type that removes the id field. Every produced type must stay exact about the keys and the value types.',
      'Напишите хелпер get, который читает свойство объекта по ключу, ограниченному keyof T, соберите тип Getters, превращающий каждое поле User в функцию с именем getX, и выведите тип Public, убирающий поле id. Каждый полученный тип должен оставаться точным по ключам и по типам значений.'
    ),
    hint: L(
      'keyof describes the keys of a type and T[K] reads the value behind one of them. A mapped type is a loop over the keys, and the as clause renames or filters them.',
      'keyof описывает ключи типа, а T[K] читает значение за одним из них. Отображаемый тип — это цикл по ключам, а секция as переименовывает или отбирает их.'
    ),
    solution: `interface User {
  id: string;
  name: string;
}

// keyof describes the keys, T[K] reads the value behind one of them.
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

// Key remapping renames every key and turns it into a getter.
type Getters = {
  [K in keyof User as 'get' + Capitalize<K & string>]: () => User[K];
};

// Filtering with as removes the id field.
type Public = { [K in keyof User as Exclude<K, 'id'>]: User[K] };

const user: User = { id: 'u1', name: 'Ada' };
const getters: Getters = { getId: () => user.id, getName: () => user.name };
const visible: Public = { name: 'Ada' };
console.log(get(user, 'name'), getters.getName(), visible.name);`,
    explanation: L(
      'The mapped type iterates over the keys of User exactly like a for loop over keyof, and the as clause decides what each key is called and whether it survives. The result is a whole new type computed at compile time, and the helper stays exact because K extends keyof T ties the argument to the object.',
      'Отображаемый тип проходит по ключам User точно так же, как цикл for по keyof, а секция as решает, как называется каждый ключ и остаётся ли он. Результат — новый тип, вычисленный на этапе компиляции, а хелпер остаётся точным, потому что K extends keyof T связывает аргумент с объектом.'
    ),
  },
  {
    id: 'ch-ts-ch5-1',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    chapterId: 'ts-ch5',
    level: 'intermediate',
    title: L('Template literal types and infer', 'Шаблонные строковые типы и infer'),
    brief: L(
      'Type a small routing table with template literal types: build a Route type from a union of resource names and a suffix, and write an ItemId helper with infer that pulls the identifier out of a literal path. Add two conditional types, one that distributes over a union and one that checks the whole union at once.',
      'Опишите небольшую таблицу маршрутов шаблонными строковыми типами: соберите тип Route из объединения имён ресурсов и суффикса и напишите хелпер ItemId через infer, который извлекает идентификатор из литерального пути. Добавьте два условных типа: один распределяется по объединению, другой проверяет объединение целиком.'
    ),
    hint: L(
      'A template literal type is the cross product of a union with a literal suffix. infer captures the part of the pattern that matched. A naked type parameter distributes over a union, and wrapping it in a tuple stops the distribution.',
      'Шаблонный строковый тип — это декартово произведение объединения с литеральным суффиксом. infer захватывает часть шаблона, которая совпала. Голый параметр типа распределяется по объединению, а обёртка в кортеж останавливает распределение.'
    ),
    solution: `type Resource = 'orders' | 'users';

// A template literal type is the cross product of the union with the suffix.
type Route = \`\${Resource}-\${string}\`;

// infer captures the part of the pattern that matched.
type ItemId<Path extends string> = Path extends \`item-\${infer Id}\` ? Id : never;

// A naked type parameter distributes over a union.
type AllStrings<T> = T extends string ? true : false;

// Wrapping the parameter in a tuple stops the distribution.
type EveryString<T> = [T] extends [string] ? true : false;

const route: Route = 'orders-42';
const id: ItemId<'item-42'> = '42';
const mixed: AllStrings<string | number> = true;
const strict: EveryString<string | number> = false;

console.log(route, id, mixed, strict);`,
    explanation: L(
      'A template literal type keeps the structure of a string in the type system, so Route accepts every orders- prefix and rejects anything else before the code runs. The conditional types show the difference that matters in practice: a naked parameter distributes over a union, while the tuple form asks about the union as a whole.',
      'Шаблонный строковый тип сохраняет структуру строки в системе типов, поэтому Route принимает любой префикс orders- и отвергает всё остальное ещё до запуска кода. Условные типы показывают разницу, которая важна на практике: голый параметр распределяется по объединению, а форма с кортежем спрашивает об объединении целиком.'
    ),
  },
  {
    id: 'ch-ts-ch6-1',
    moduleId: 'typescript',
    topic: 'ts-advanced',
    chapterId: 'ts-ch6',
    level: 'intermediate',
    title: L('Branded identifiers and a checked boundary', 'Брендированные идентификаторы и проверяемая граница'),
    brief: L(
      'Give UserId and OrderId their own branded types so the compiler refuses to mix them, write the only function that is allowed to attach the brand, and type a table of API routes with satisfies so the literal types survive. The brand must be attached only after the value has been validated.',
      'Дайте UserId и OrderId их собственные брендированные типы, чтобы компилятор не позволял их смешивать, напишите единственную функцию, которой разрешено прикреплять бренд, и опишите таблицу API-маршрутов через satisfies, чтобы литеральные типы сохранились. Бренд должен прикрепляться только после проверки значения.'
    ),
    hint: L(
      'A brand is a unique symbol used as a key of an object type, and only the validating function may cast to it. satisfies checks a value against a type without widening the literal types it contains.',
      'Бренд — это уникальный символ, используемый как ключ объектного типа, и приводить к нему может только проверяющая функция. satisfies проверяет значение по типу, не расширяя литеральные типы внутри него.'
    ),
    solution: `declare const brand: unique symbol;

// Each meaning gets its own primitive type.
type UserId = string & { readonly [brand]: 'UserId' };
type OrderId = string & { readonly [brand]: 'OrderId' };

// Only the validating function may attach the brand.
function toUserId(value: string): UserId {
  if (value.length === 0) throw new Error('empty id');
  return value as UserId;
}

// The boundary receives unknown and narrows it without a cast.
function isUser(value: unknown): value is { id: string; name: string } {
  if (typeof value !== 'object' || value === null) return false;
  return 'id' in value && typeof value.id === 'string' &&
    'name' in value && typeof value.name === 'string';
}

// satisfies checks the value and keeps the literal types.
const routes = [{ path: '/orders', method: 'GET' }] satisfies { method: 'GET' | 'POST' }[];
console.log(toUserId('u1'), routes[0].method);`,
    explanation: L(
      'The brand adds a unique symbol to the string type, so UserId and OrderId stay incompatible even though both are strings at run time, and only the validating function can produce one. The boundary function returns a type predicate, which narrows the unknown payload without a single cast, and satisfies validates the route table while keeping the literal method names.',
      'Бренд добавляет к типу строки уникальный символ, поэтому UserId и OrderId остаются несовместимыми, хотя в рантайме это обычные строки, и создать такой тип может только проверяющая функция. Функция на границе возвращает предикат типа, который сужает unknown без единого приведения, а satisfies проверяет таблицу маршрутов, сохраняя литеральные имена методов.'
    ),
  },
  {
    id: 'ch-ts-ch7-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch7',
    level: 'intermediate',
    title: L('An abstract store with a concrete subclass', 'Абстрактное хранилище и конкретный подкласс'),
    brief: L(
      'Declare an abstract KeyValueStore with the read and write operations plus a shared readOrDefault helper, and implement it in a MemoryStore that keeps its data in a private readonly field. The base class must describe the contract and the subclass must not be able to break it.',
      'Опишите абстрактный KeyValueStore с операциями read и write и общим хелпером readOrDefault, а также реализуй его в MemoryStore, который хранит данные в приватном readonly-поле. Базовый класс должен описывать контракт, а подкласс не должен быть able его нарушить.'
    ),
    hint: L(
      'An abstract class shares the implementation between the subclasses and abstract methods describe what every subclass must provide. The private modifier is a compile time rule for other developers, a hash field is a real runtime boundary.',
      'Абстрактный класс делит реализацию между подклассами, а абстрактные методы описывают то, что обязан предоставить каждый подкласс. Модификатор private — это правило уровня компиляции для других разработчиков, а поле с решёткой — это настоящая граница в рантайме.'
    ),
    solution: `// An abstract class shares the implementation between the subclasses.
abstract class KeyValueStore {
  abstract read(key: string): string | undefined;
  abstract write(key: string, value: string): void;
  readOrDefault(key: string, fallback: string): string {
    return this.read(key) ?? fallback;
  }
}

class MemoryStore extends KeyValueStore {
  // private is a compile time rule, a hash field is a runtime boundary.
  private readonly data = new Map<string, string>();
  read(key: string): string | undefined {
    return this.data.get(key);
  }
  write(key: string, value: string): void {
    this.data.set(key, value);
  }
}
const store = new MemoryStore();
store.write('a', 'b');
console.log(store.readOrDefault('a', 'none'));`,
    explanation: L(
      'The abstract class owns the code that every implementation shares, and the abstract methods are the contract each subclass has to satisfy before it can be instantiated. The private readonly field keeps the storage inside the class, and the readonly modifier stops the collection from being replaced after construction.',
      'Абстрактный класс владеет кодом, который разделяют все реализации, а абстрактные методы задают контракт, который подкласс обязан выполнить, прежде чем его можно будет создать. Приватное readonly-поле держит хранилище внутри класса, а модификатор readonly запрещает заменить коллекцию после создания.'
    ),
  },
  {
    id: 'ch-ts-ch8-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch8',
    level: 'advanced',
    title: L('Split a feature into modules with a barrel', 'Разбиение фичи на модули с barrel-файлом'),
    brief: L(
      'Split a small feature into three modules: a types module, a service module and an index barrel that exposes the public API of the feature. Import the types with import type, re-export the type with export type, and declare the shape of a package that ships no types in a declaration file.',
      'Разбейте небольшую фичу на три модуля: модуль типов, модуль сервиса и index-файл, который открывает публичный API фичи. Импортируйте типы через import type, реэкспортируйте тип через export type и опишите форму пакета без типов в декларационном файле.'
    ),
    hint: L(
      'Mark type-only imports and exports explicitly, because verbatimModuleSyntax no longer lets the compiler erase them silently. An ambient declaration describes code you do not own and must match what it really exports.',
      'Помечайте импорты и реэкспорты только типов явно, потому что verbatimModuleSyntax больше не даёт компилятору стирать их молча. Окружающее объявление описывает код, который вам не принадлежит, и должно совпадать с тем, что он реально экспортирует.'
    ),
    solution: `// file: feature/types.ts
export interface User {
  id: string;
  name: string;
}

// file: feature/userService.ts
import type { User } from './types';
export const DEFAULT_USER: User = { id: 'anonymous', name: 'Guest' };
export function label(user: User): string {
  return user.name;
}

// file: feature/index.ts
export { label, DEFAULT_USER } from './userService';
export type { User } from './types';

// file: types/legacy-sdk.d.ts
declare module 'legacy-sdk' {
  export function send(payload: string): Promise<void>;
}

// The barrel is the public API of the feature and stays shallow.
import { label, DEFAULT_USER } from './feature';
console.log(label(DEFAULT_USER));`,
    explanation: L(
      'The types module owns the shape, the service module owns the behaviour, and the barrel is the only file the rest of the application is allowed to import from. A type-only import is erased at compile time, so it costs nothing at run time, while the ambient declaration gives the untyped package a checked boundary instead of an any.',
      'Модуль типов владеет формой, модуль сервиса — поведением, а barrel — единственный файл, из которого разрешено импортировать остальному приложению. Импорт только типов стирается при компиляции и ничего не стоит в рантайме, а окружающее объявление даёт не типизированному пакету проверяемую границу вместо any.'
    ),
  },
  {
    id: 'ch-ts-ch9-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch9',
    level: 'advanced',
    title: L('Turn on the strict family in tsconfig', 'Включаем семейство строгих флагов в tsconfig'),
    brief: L(
      'Write a tsconfig.json that turns on the strict family, adds noUncheckedIndexedAccess and exactOptionalPropertyTypes, and maps a path alias for the app folder. Then show what those two extra flags change: an index access becomes a value that may be missing, and an optional property becomes a key that must be absent.',
      'Напишите tsconfig.json, который включает семейство строгих флагов, добавляет noUncheckedIndexedAccess и exactOptionalPropertyTypes и задаёт псевдоним пути для папки приложения. Покажите, что меняют эти два флага: обращение по индексу становится значением, которого может не быть, а необязательное свойство — ключом, который должен отсутствовать.'
    ),
    hint: L(
      'Read tsconfig.json as the specification of the project: the files it includes, how strict the checker is, how an import is resolved and what the build emits. Path aliases live in compilerOptions.paths.',
      'Читайте tsconfig.json как спецификацию проекта: какие файлы он включает, насколько строг проверщик, как разрешается импорт и что выдаёт сборка. Псевдонимы путей живут в compilerOptions.paths.'
    ),
    solution: `// file: tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "paths": { "@app/*": ["src/app/*"] }
  },
  "include": ["src"]
}

// file: src/app/lookup.ts
const names: string[] = [];
// noUncheckedIndexedAccess: the element may be missing.
const first = names[0];

interface Options { label?: string; }
// exactOptionalPropertyTypes: the key must be absent, not undefined.
const empty: Options = {};
// const broken: Options = { label: undefined };   // ERROR under exactOptionalPropertyTypes
console.log(first, empty);`,
    explanation: L(
      'The strict family turns every implicit any into a build failure, so the cost is paid once at the start of the project and never again. The two extra flags are stricter still: noUncheckedIndexedAccess says that names[0] may be undefined, and exactOptionalPropertyTypes says that an optional key must be missing rather than present with the value undefined.',
      'Семейство строгих флагов превращает каждый неявный any в провал сборки, поэтому цена платится один раз в начале проекта и больше не возвращается. Два дополнительных флага строже: noUncheckedIndexedAccess говорит, что names[0] может быть undefined, а exactOptionalPropertyTypes — что необязательный ключ должен отсутствовать, а не присутствовать со значением undefined.'
    ),
  },
  {
    id: 'ch-ts-ch10-1',
    moduleId: 'typescript',
    topic: 'typescript',
    chapterId: 'ts-ch10',
    level: 'advanced',
    title: L('Type the props and the component state', 'Типизация пропсов и состояния компонента'),
    brief: L(
      'Describe the props of a card component with a readonly title, an optional count and children of the ReactNode type. Type a change handler with the event type of the input it serves, and model the state of a request as a discriminated union with idle, loading, success and error, handled by an exhaustive switch.',
      'Опишите пропсы карточки: readonly title, необязательный count и children типа ReactNode. Типизируйте обработчик изменения событием того поля ввода, которому он служит, и смоделируй состояние запроса как дискриминированное объединение с idle, loading, success и error, обработанное исчерпывающим switch.'
    ),
    hint: L(
      'Mark every prop the component only reads as readonly, and let ReactNode cover the children. The event type follows the element the handler serves, and the discriminant of the state union narrows it in every case of the switch.',
      'Помечайте readonly каждый проп, который компонент только читает, и поручайте children типу ReactNode. Тип события следует за элементом, которому служит обработчик, а дискриминант объединения состояния сужает его в каждом case.'
    ),
    solution: `import type { ChangeEvent, ReactNode } from 'react';

type CardProps = { readonly title: string; count?: number; children?: ReactNode };
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

// The event type follows the element the handler serves.
function onNameChange(event: ChangeEvent<HTMLInputElement>): void {
  console.log(event.target.value);
}

// The discriminant narrows the state, and every case is handled.
function render(state: RequestState): string {
  switch (state.status) {
    case 'idle': return 'Nothing loaded yet';
    case 'loading': return 'Loading';
    case 'success': return state.data.join(', ');
    case 'error': return state.message;
  }
}`,
    explanation: L(
      'The props type is the contract between the component and its caller, and readonly tells the compiler that the component does not replace the title it receives. The state is a union with a literal discriminant, so the switch knows which fields exist in each case and a new state would show up as a compile error.',
      'Тип пропсов — это контракт между компонентом и вызывающим кодом, а readonly сообщает компилятору, что компонент не заменяет полученный title. Состояние — это объединение с литеральным дискриминантом, поэтому switch знает, какие поля есть в каждом случае, а новое состояние обнаружилось бы как ошибка компиляции.'
    ),
  },
];
