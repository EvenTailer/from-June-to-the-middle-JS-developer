import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const typescriptTasks: PracticeTask[] = [
  {
    id: 'topic-typescript-1',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'basic',
    title: L('Type a reducer and its actions', 'Типизация редьюсера и его действий'),
    brief: L(
      'Write the types and the reducer for a counter. Define a type CounterAction that is a union of three variants: { type: "increment"; amount: number }, { type: "decrement"; amount: number } and { type: "reset" }. Define an interface CounterState with count (number) and lastAction (the string union "increment" | "decrement" | "reset"). The function reducer(state, action) returns a new state: increment adds amount to count, decrement subtracts it, and reset returns the initial state with count 0. The type of every action is stored in lastAction. Example: reducer({ count: 2, lastAction: "reset" }, { type: "increment", amount: 3 }) returns { count: 5, lastAction: "increment" }, reducer({ count: 2, lastAction: "reset" }, { type: "reset" }) returns { count: 0, lastAction: "reset" }.',
      'Напишите типы и редьюсер для счётчика. Определите тип CounterAction как объединение из трёх вариантов: { type: "increment"; amount: number }, { type: "decrement"; amount: number } и { type: "reset" }. Определите интерфейс CounterState с полями count (number) и lastAction (строковое объединение "increment" | "decrement" | "reset"). Функция reducer(state, action) возвращает новое состояние: increment прибавляет amount к count, decrement вычитает его, а reset возвращает начальное состояние с count 0. Тип каждого действия сохраняется в lastAction. Пример: reducer({ count: 2, lastAction: "reset" }, { type: "increment", amount: 3 }) возвращает { count: 5, lastAction: "increment" }, reducer({ count: 2, lastAction: "reset" }, { type: "reset" }) возвращает { count: 0, lastAction: "reset" }.'
    ),
    hint: L(
      'A discriminated union narrows itself: inside a switch case, TypeScript knows exactly which fields the action has, so amount is only available in the increment and decrement branches.',
      'Дискриминируемое объединение сужается само: внутри case в switch TypeScript точно знает, какие поля есть у действия, поэтому amount доступен только в ветках increment и decrement.'
    ),
    solution: `type CounterAction =
  | { type: 'increment'; amount: number }
  | { type: 'decrement'; amount: number }
  | { type: 'reset' };

interface CounterState {
  count: number;
  lastAction: 'increment' | 'decrement' | 'reset';
}

const initialState: CounterState = { count: 0, lastAction: 'reset' };

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.amount, lastAction: action.type };
    case 'decrement':
      return { count: state.count - action.amount, lastAction: action.type };
    case 'reset':
      return { ...initialState };
  }
}

console.log(reducer({ count: 2, lastAction: 'reset' }, { type: 'increment', amount: 3 }));
// { count: 5, lastAction: 'increment' }`,
    explanation: L(
      'The union of object types is the standard way to describe a set of possible actions, and the string field type acts as the discriminant that lets TypeScript narrow the union inside a switch. Because every branch returns, the function has no fallback branch and cannot return undefined. A union of literals for lastAction is checked at compile time, so a typo in the string is a compile error instead of a runtime surprise. The reducer is a pure function: it never mutates the state, it always returns a new object, which is what makes it safe to log, compare and time-travel in the developer tools.',
      'Объединение типов объектов — стандартный способ описать набор возможных действий, а строковое поле выступает дискриминантом, который позволяет TypeScript сузить объединение внутри switch. Так как каждая ветка возвращает значение, у функции нет запасной ветки и она не может вернуть undefined. Объединение литералов для lastAction проверяется на этапе компиляции, поэтому опечатка в строке становится ошибкой компиляции, а не сюрпризом во время выполнения. Редьюсер — чистая функция: он не мутирует состояние, а всегда возвращает новый объект, что делает его безопасным для логирования, сравнения и перемотки состояния в инструментах разработчика.'
    ),
  },
  {
    id: 'topic-typescript-2',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'basic',
    title: L('Type an API client', 'Типизация API-клиента'),
    brief: L(
      'Write a typed API client. Define an interface ApiClient with two generic methods: get<T>(path) that returns a Promise<T> and post<T>(path, body) that returns a Promise<T> as well. Implement createApiClient(baseUrl, fetchImpl), where fetchImpl is a function of the type of the global fetch and defaults to fetch. The client must add the content-type header "application/json" to every request, must throw an Error with the message "Request failed: <status> <statusText>" when the response is not ok, and must return the parsed JSON body cast to T. Example: const api = createApiClient("https://api.example.com"); await api.get<User>("/users/1") returns the parsed body.',
      'Напишите типизированный API-клиент. Определите интерфейс ApiClient с двумя generic-методами: get<T>(path), возвращающий Promise<T>, и post<T>(path, body), тоже возвращающий Promise<T>. Реализуйте createApiClient(baseUrl, fetchImpl), где fetchImpl — функция того же типа, что и глобальный fetch, и по умолчанию используется fetch. Клиент обязан добавлять заголовок content-type "application/json" к каждому запросу, выбрасывать Error с сообщением "Request failed: <status> <statusText>", когда ответ не ok, и возвращать разобранное тело JSON, приведённое к T. Пример: const api = createApiClient("https://api.example.com"); await api.get<User>("/users/1") возвращает разобранное тело.'
    ),
    hint: L(
      'Keep the request logic in one inner function that takes a RequestInit, and let get and post call it with different initial values.',
      'Держите логику запроса во внутренней функции, принимающей RequestInit, а get и post вызывают её с разными начальными значениями.'
    ),
    solution: `interface User {
  id: number;
  name: string;
  email?: string;
}

interface ApiClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
}

function createApiClient(baseUrl: string, fetchImpl: typeof fetch = fetch): ApiClient {
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set('content-type', 'application/json');

    const response = await fetchImpl(baseUrl + path, { ...init, headers });

    if (!response.ok) {
      throw new Error('Request failed: ' + response.status + ' ' + response.statusText);
    }

    return (await response.json()) as T;
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  };
}

async function main() {
  const fakeFetch: typeof fetch = async () =>
    new Response(JSON.stringify({ id: 1, name: 'Ann' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

  const api = createApiClient('https://api.example.com', fakeFetch);
  const user = await api.get<User>('/users/1');
  console.log(user.id, user.name);
}

main().catch((error: unknown) => {
  console.error(error);
});`,
    explanation: L(
      'The type parameter lives on the method, not on the client, because each request has its own response type. The caller writes api.get<User>("/users/1") and gets a User instead of any, so the compiler checks the usage of the response at the call site. The cast to T is the one place where trust is taken: the server sends JSON, and TypeScript cannot check the runtime shape, so the boundary should validate the body with a schema or a type guard when the data comes from outside. The fetch implementation is injected as a parameter, which makes the client testable with a fake function and keeps the module free of a hard dependency on the global.',
      'Параметр типа живёт на методе, а не на клиенте, потому что у каждого запроса свой тип ответа. Вызывающий пишет api.get<User>("/users/1") и получает User вместо any, поэтому компилятор проверяет использование ответа прямо на месте вызова. Приведение к T — единственное место, где даётся доверие: сервер присылает JSON, а TypeScript не может проверить его форму во время выполнения, поэтому на границе тело стоит проверять схемой или функцией-guard, когда данные приходят извне. Реализация fetch внедряется параметром, благодаря чему клиент тестируется с поддельной функцией и модуль не зависит жёстко от глобального объекта.'
    ),
  },
  {
    id: 'topic-typescript-3',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'basic',
    title: L('Discriminated union for an async status', 'Дискриминируемое объединение для статуса запроса'),
    brief: L(
      'Describe the state of an async request with a discriminated union. Define a type AsyncState<T> that has four variants: { status: "idle" }, { status: "loading" }, { status: "success"; data: T } and { status: "error"; error: string }. Then write three type guard functions: isIdle(state), isSuccess(state) and isError(state), each returning true only for its own variant. The guards must be usable as narrowing functions, so the parameter of a guard has the union type and the return type is true only for the matching variant. Example: isSuccess({ status: "success", data: 1 }) returns true, isSuccess({ status: "loading" }) returns false, isError({ status: "error", error: "boom" }) returns true.',
      'Опишите состояние асинхронного запроса дискриминируемым объединением. Определите тип AsyncState<T> с четырьмя вариантами: { status: "idle" }, { status: "loading" }, { status: "success"; data: T } и { status: "error"; error: string }. Затем напишите три функции-guard: isIdle(state), isSuccess(state) и isError(state), каждая возвращает true только для своего варианта. Guard-ы должны сужать тип, поэтому параметр имеет тип объединения, а тип возврата — true только для подходящего варианта. Пример: isSuccess({ status: "success", data: 1 }) возвращает true, isSuccess({ status: "loading" }) возвращает false, isError({ status: "error", error: "boom" }) возвращает true.'
    ),
    hint: L(
      'A type guard is a function whose return type is "value is SomeType". Write it as isSuccess(state: AsyncState<T>): state is { status: "success"; data: T }.',
      'Функция-guard возвращает тип "value is SomeType". Запишите её как isSuccess(state: AsyncState<T>): state is { status: "success"; data: T }.'
    ),
    solution: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function isIdle<T>(state: AsyncState<T>): state is { status: 'idle' } {
  return state.status === 'idle';
}

function isSuccess<T>(state: AsyncState<T>): state is { status: 'success'; data: T } {
  return state.status === 'success';
}

function isError<T>(state: AsyncState<T>): state is { status: 'error'; error: string } {
  return state.status === 'error';
}

const state: AsyncState<number> = { status: 'success', data: 1 };

function render(state: AsyncState<number>): string {
  if (isSuccess(state)) {
    return 'value: ' + String(state.data);
  }

  if (isError(state)) {
    return 'error: ' + state.error;
  }

  return 'loading';
}

console.log(render(state)); // value: 1
console.log(render({ status: 'error', error: 'boom' })); // error: boom
console.log(render({ status: 'loading' })); // loading`,
    explanation: L(
      'Modelling the four states as one union is safer than four separate variables such as isLoading and data, because the type system makes the impossible combinations unrepresentable: there is no success state without data and no error state without a message. The discriminant status lets TypeScript narrow the union with a plain comparison, and a type guard packages that comparison into a reusable function whose return type is "state is ...". After the guard returns true, the compiler knows the exact variant, so state.data is available without a cast. The generic parameter keeps the data type of the caller instead of falling back to unknown.',
      'Описание четырёх состояний одним объединением безопаснее, чем четыре отдельные переменные вида isLoading и data, потому что система типов делает невозможные сочетания невыразимыми: нет состояния success без data и нет состояния error без сообщения. Дискриминант status позволяет TypeScript сузить объединение обычным сравнением, а функция-guard упаковывает это сравнение в переиспользуемую функцию с типом возврата "state is ...". После того как guard вернул true, компилятор знает точный вариант, поэтому state.data доступен без приведения. Параметр типа сохраняет тип данных вызывающего кода, а не откатывается к unknown.'
    ),
  },
  {
    id: 'topic-typescript-4',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'intermediate',
    title: L('Typed event map with a generic emitter', 'Типизированная карта событий с generic-излучателем'),
    brief: L(
      'Build a small typed event emitter. Define a type AppEvents with three entries: "user:created" with the payload { id: number; name: string }, "user:deleted" with the payload { id: number } and "cart:cleared" with the payload { at: number }. Then write a class EventBus with a method on(event, listener) that registers a listener and returns a function that removes it again, and a method emit(event, payload) that calls every listener of that event. Both methods must be generic over the key of AppEvents, so a listener of "user:created" only ever receives { id: number; name: string }. Example: bus.on("user:deleted", (payload) => console.log(payload.id)); bus.emit("user:deleted", { id: 7 }) prints 7, and bus.emit("user:deleted", { id: 7, name: "Ann" }) must be a compile error.',
      'Собери небольшой типизированный излучатель событий. Определи тип AppEvents с тремя записями: "user:created" с полезной нагрузкой { id: number; name: string }, "user:deleted" с полезной нагрузкой { id: number } и "cart:cleared" с полезной нагрузкой { at: number }. Затем напиши класс EventBus с методом on(event, listener), который регистрирует слушателя и возвращает функцию для его удаления, и методом emit(event, payload), который вызывает всех слушателей этого события. Оба метода должны быть generic по ключу AppEvents, чтобы слушатель "user:created" получал только { id: number; name: string }. Пример: bus.on("user:deleted", (payload) => console.log(payload.id)); bus.emit("user:deleted", { id: 7 }) печатает 7, а bus.emit("user:deleted", { id: 7, name: "Ann" }) должно быть ошибкой компиляции.'
    ),
    hint: L(
      'Store the listeners in a mapped type: { [K in keyof AppEvents]?: Set<Listener<any>> }, and keep the payload type in the public methods with a generic key K.',
      'Храни слушателей в отображаемом типе: { [K in keyof AppEvents]?: Set<Listener<any>> }, а тип полезной нагрузки оставь в публичных методах через generic-ключ K.'
    ),
    solution: `type AppEvents = {
  'user:created': { id: number; name: string };
  'user:deleted': { id: number };
  'cart:cleared': { at: number };
};

type Listener<T> = (payload: T) => void;

class EventBus {
  // The storage is loose, the public API stays strict.
  private listeners: { [K in keyof AppEvents]?: Set<Listener<any>> } = {};

  on<K extends keyof AppEvents>(event: K, listener: Listener<AppEvents[K]>): () => void {
    const bucket = this.listeners[event] ?? new Set<Listener<any>>();
    this.listeners[event] = bucket;
    bucket.add(listener);

    return () => {
      bucket.delete(listener);
    };
  }

  emit<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void {
    const bucket = this.listeners[event];
    if (!bucket) {
      return;
    }
    for (const listener of bucket) {
      listener(payload);
    }
  }
}

const bus = new EventBus();

const off = bus.on('user:deleted', (payload) => {
  console.log(payload.id);
});

bus.emit('user:deleted', { id: 7 }); // 7
off();
bus.emit('user:deleted', { id: 8 }); // nothing, the listener was removed`,
    explanation: L(
      'The generic key K extends keyof AppEvents ties three things together at once: the name of the event, the type of the payload and the type of the listener. When the emitter is called with "user:deleted", the payload parameter becomes { id: number }, so a wrong payload is a compile error, and the listener parameter is inferred from the payload type instead of being written by hand. The storage is a mapped type over the keys of AppEvents, so every event has its own bucket, and the optional key means an event without listeners costs nothing. The buckets keep a loose payload type, because one Set has to hold listeners of different events, while the public methods keep the strict types. The unsubscribe function returned by on closes over the bucket and the listener, which is the standard way to avoid a memory leak in a component that unmounts.',
      'Generic-ключ K extends keyof AppEvents связывает сразу три вещи: имя события, тип полезной нагрузки и тип слушателя. Когда излучатель вызывают с "user:deleted", параметр payload становится { id: number }, поэтому неверная нагрузка — ошибка компиляции, а тип слушателя выводится из типа нагрузки, и его не нужно писать вручную. Хранилище — отображаемый тип по ключам AppEvents, поэтому у каждого события своя корзина, а необязательный ключ означает, что событие без слушателей ничего не стоит. Корзины хранят свободный тип полезной нагрузки, потому что в одном Set лежат слушатели разных событий, а публичные методы сохраняют строгие типы. Функция отписки, которую возвращает on, замыкается на корзине и слушателе — это стандартный способ избежать утечки памяти в компоненте, который размонтируется.'
    ),
  },
  {
    id: 'topic-typescript-5',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'intermediate',
    title: L('Overloads for a format function', 'Перегрузки для функции форматирования'),
    brief: L(
      'Write a function format with two overloads. The first overload takes a number and an optional options object with a currency field and returns a formatted number string: with a currency it uses the style "currency" and the given currency code, without it the style is "decimal", and in both cases there are at most two fraction digits. The second overload takes a string and an optional options object with the field uppercase (a boolean), and returns the trimmed string, upper-cased when the flag is set. The implementation signature accepts a number or a string and the union of the options, and it must not be part of the public API. Example: format(1234.5) returns "1,234.5", format(1234.5, { currency: "USD" }) returns "$1,234.50", format("  hello  ") returns "hello", format("  hello  ", { uppercase: true }) returns "HELLO".',
      'Напишите функцию format с двумя перегрузками. Первая перегрузка принимает число и необязательный объект опций с полем currency и возвращает отформатированную числовую строку: с валютой используется стиль "currency" и код валюты, без неё стиль "decimal", и в обоих случаях не больше двух дробных знаков. Вторая перегрузка принимает строку и необязательный объект опций с полем uppercase (boolean) и возвращает обрезанную строку, переведённую в верхний регистр, если флаг установлен. Сигнатура реализации принимает число или строку и объединение опций, и она не должна быть частью публичного API. Пример: format(1234.5) возвращает "1,234.5", format(1234.5, { currency: "USD" }) возвращает "$1,234.50", format("  hello  ") возвращает "hello", format("  hello  ", { uppercase: true }) возвращает "HELLO".'
    ),
    hint: L(
      'Write the overload signatures first, without a body, then the implementation signature with a union of the parameter types. Callers only see the overloads.',
      'Сначала напишите сигнатуры перегрузок без тела, затем сигнатуру реализации с объединением типов параметров. Вызывающий видит только перегрузки.'
    ),
    solution: `interface NumberFormatOptions {
  currency?: string;
  uppercase?: boolean;
}

interface StringFormatOptions {
  uppercase: boolean;
}

function format(value: number, options?: NumberFormatOptions): string;
function format(value: string, options?: StringFormatOptions): string;
function format(value: number | string, options: NumberFormatOptions & Partial<StringFormatOptions> = {}): string {
  if (typeof value === 'number') {
    const formatted = new Intl.NumberFormat('en-US', {
      style: options.currency ? 'currency' : 'decimal',
      currency: options.currency,
      maximumFractionDigits: 2,
    }).format(value);

    return options.uppercase ? formatted.toUpperCase() : formatted;
  }

  const trimmed = value.trim();
  return options.uppercase ? trimmed.toUpperCase() : trimmed;
}

console.log(format(1234.5)); // 1,234.5
console.log(format(1234.5, { currency: 'USD' })); // $1,234.50
console.log(format('  hello  ')); // hello
console.log(format('  hello  ', { uppercase: true })); // HELLO`,
    explanation: L(
      'Overloads describe several public shapes of one function while the implementation stays flexible. TypeScript picks the first overload whose parameters match the call, so format(1234.5) selects the number signature and format("  hello  ", { uppercase: true }) selects the string signature, and the object argument is checked against the options of that signature only. The implementation signature is not visible to callers, which is why the options of the two branches are combined there. This is a good fit when the return type depends on the input type, a case where a single signature with a union would force the caller to cast the result back.',
      'Перегрузки описывают несколько публичных форм одной функции, оставаясь гибкой внутри. TypeScript выбирает первую перегрузку, параметры которой подходят вызову, поэтому format(1234.5) берёт числовую сигнатуру, а format("  hello  ", { uppercase: true }) — строковую, и объект-опции проверяется только по опциям этой сигнатуры. Сигнатура реализации вызывающему не видна, поэтому внутри опции двух веток объединены. Это удобно, когда тип результата зависит от типа входа: одна сигнатура с объединением заставила бы вызывающего приводить результат обратно.'
    ),
  },
  {
    id: 'topic-typescript-6',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'advanced',
    title: L('Generic repository with a constraint', 'Generic-репозиторий с ограничением'),
    brief: L(
      'Write a generic in-memory repository. Define an interface Entity with the field id (number) and an interface Repository<T extends Entity> with four methods: getById(id) that returns a Promise of T or null, findAll() that returns a Promise of an array of T, save(entity) that returns a Promise of T and stores it under its id, and remove(id) that returns a Promise of boolean and reports whether something was deleted. Then implement the class InMemoryRepository<T extends Entity>, whose constructor takes an optional array of seed entities. Example: const repo = new InMemoryRepository([{ id: 1, name: "Ann" }]); await repo.getById(1) returns { id: 1, name: "Ann" }, await repo.getById(2) returns null, await repo.remove(2) returns false.',
      'Напишите generic-репозиторий в памяти. Определите интерфейс Entity с полем id (number) и интерфейс Repository<T extends Entity> с четырьмя методами: getById(id), возвращающий Promise с T или null, findAll(), возвращающий Promise с массивом T, save(entity), возвращающий Promise с T и сохраняющий сущность по её id, и remove(id), возвращающий Promise с boolean и сообщающий, было ли что-то удалено. Затем реализуй класс InMemoryRepository<T extends Entity>, конструктор которого принимает необязательный массив начальных сущностей. Пример: const repo = new InMemoryRepository([{ id: 1, name: "Ann" }]); await repo.getById(1) возвращает { id: 1, name: "Ann" }, await repo.getById(2) возвращает null, await repo.remove(2) возвращает false.'
    ),
    hint: L(
      'The constraint T extends Entity is what lets the implementation use entity.id. A Map<number, T> keyed by the id gives constant time lookups.',
      'Ограничение T extends Entity позволяет реализации использовать entity.id. Map<number, T> с ключом по id даёт поиск за постоянное время.'
    ),
    solution: `interface Entity {
  id: number;
}

interface Repository<T extends Entity> {
  getById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  remove(id: number): Promise<boolean>;
}

class InMemoryRepository<T extends Entity> implements Repository<T> {
  private readonly items = new Map<number, T>();

  constructor(seed: T[] = []) {
    for (const item of seed) {
      this.items.set(item.id, item);
    }
  }

  async getById(id: number): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return [...this.items.values()];
  }

  async save(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    return this.items.delete(id);
  }
}

async function main() {
  const repo = new InMemoryRepository([{ id: 1, name: 'Ann' }]);

  console.log(await repo.getById(1)); // { id: 1, name: 'Ann' }
  console.log(await repo.getById(2)); // null
  console.log(await repo.remove(2)); // false
}

main();`,
    explanation: L(
      'The generic parameter carries the concrete entity type through every method, so the caller gets User[] back from findAll instead of Entity[], and no cast is needed. The constraint T extends Entity is what makes the implementation legal: without it the compiler would not know that entity.id exists, and the Map key type could not be derived. The interface Repository describes the contract, so the same code works with a real database implementation later, and the class declares that it implements it, which makes the compiler check that no method was forgotten. The methods are async even though the storage is synchronous, because the interface is what callers see, and swapping in an HTTP backend must not change the call sites.',
      'Generic-параметр проносит конкретный тип сущности через все методы, поэтому вызывающий получает от findAll User[], а не Entity[], и приведения не нужны. Ограничение T extends Entity делает реализацию законной: без него компилятор не знал бы, что у entity есть id, и тип ключа Map нельзя было бы вывести. Интерфейс Repository описывает контракт, поэтому тот же код позже заработает с реальной реализацией через базу данных, а класс объявляет implements, и компилятор проверяет, что ни один метод не забыт. Методы асинхронные, хотя хранилище синхронное, потому что наружу смотрит именно интерфейс, и замена хранилища на HTTP-бэкенд не должна менять места вызова.'
    ),
  },
  {
    id: 'topic-typescript-7',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'advanced',
    title: L('Readonly configuration with satisfies', 'Readonly-конфигурация через satisfies'),
    brief: L(
      'Define a typed, immutable configuration. Create an interface AppConfig with the readonly fields appName (string), port (number) and features (an object with the readonly fields beta (boolean) and maxUploadMb (number)). Then create the constant defaultConfig with the values "Tutorial", 5173, and the features { beta: false, maxUploadMb: 10 }. The constant must be checked against AppConfig and keep its narrow literal types, so defaultConfig.port has the type 5173 and defaultConfig.features.beta has the type false. Finally write the function getPort(config) that returns config.port and uses defaultConfig when no argument is given. Example: getPort() returns 5173, getPort({ appName: "Other", port: 3000, features: { beta: true, maxUploadMb: 5 } }) returns 3000.',
      'Опиши типизированную неизменяемую конфигурацию. Создай интерфейс AppConfig с readonly-полями appName (string), port (number) и features (объект с readonly-полями beta (boolean) и maxUploadMb (number)). Затем создай константу defaultConfig со значениями "Tutorial", 5173 и features { beta: false, maxUploadMb: 10 }. Константа должна проверяться по AppConfig и сохранять узкие литеральные типы, поэтому у defaultConfig.port тип 5173, а у defaultConfig.features.beta тип false. Наконец напиши функцию getPort(config), которая возвращает config.port и использует defaultConfig, если аргумент не передан. Пример: getPort() возвращает 5173, getPort({ appName: "Other", port: 3000, features: { beta: true, maxUploadMb: 5 } }) возвращает 3000.'
    ),
    hint: L(
      'Write the value with the as const assertion and add satisfies AppConfig after it: const defaultConfig = { ... } as const satisfies AppConfig.',
      'Запишите значение с утверждением as const и добавьте после него satisfies AppConfig: const defaultConfig = { ... } as const satisfies AppConfig.'
    ),
    solution: `interface AppConfig {
  readonly appName: string;
  readonly port: number;
  readonly features: {
    readonly beta: boolean;
    readonly maxUploadMb: number;
  };
}

const defaultConfig = {
  appName: 'Tutorial',
  port: 5173,
  features: {
    beta: false,
    maxUploadMb: 10,
  },
} as const satisfies AppConfig;

function getPort(config: AppConfig = defaultConfig): number {
  return config.port;
}

console.log(defaultConfig.port); // 5173
console.log(getPort()); // 5173
console.log(getPort({ appName: 'Other', port: 3000, features: { beta: true, maxUploadMb: 5 } })); // 3000`,
    explanation: L(
      'as const makes every literal in the object a narrow literal type, so the compiler knows that port is exactly 5173 and beta is exactly false, which is useful for feature flags. satisfies checks the value against the type without widening it, so the object keeps its literal types and still cannot contain a field the interface does not describe. The plain annotation const x: AppConfig would widen port to number and would also hide the mismatch between the value and the interface until the assignment. The readonly modifiers on the interface make every property unassignable, and nested objects are covered too, which protects the configuration from accidental mutation at runtime.',
      'as const делает каждый литерал в объекте узким литеральным типом, поэтому компилятор знает, что port — это ровно 5173, а beta — ровно false, что удобно для флагов функций. satisfies проверяет значение по типу, не расширяя его, поэтому объект сохраняет литеральные типы и всё равно не может содержать поля, которых нет в интерфейсе. Обычная аннотация const x: AppConfig расширила бы port до number и спрятала бы несовпадение значения и интерфейса до момента присваивания. Модификаторы readonly в интерфейсе запрещают присваивание в любое свойство, включая вложенные объекты, что защищает конфигурацию от случайной мутации во время выполнения.'
    ),
  },
  {
    id: 'topic-typescript-8',
    moduleId: 'typescript',
    topic: 'typescript',
    level: 'advanced',
    title: L('Exhaustive switch with never', 'Исчерпывающий switch с never'),
    brief: L(
      'Write a function move(direction) that returns the string "y-1" for the direction "up", "y+1" for "down", "x-1" for "left" and "x+1" for "right", where the direction is one of those four strings. Add a helper assertNever(value) that throws an Error with the message "Unexpected value: " followed by the value and never returns normally. The default branch of the switch must call assertNever(direction), so that adding a new direction to the type later produces a compile error in that branch. Example: move("up") returns "y-1", move("right") returns "x+1", and assertNever("boom") throws an Error with the message "Unexpected value: boom".',
      'Напишите функцию move(direction), которая возвращает строку "y-1" для направления "up", "y+1" для "down", "x-1" для "left" и "x+1" для "right", где направление — одна из этих четырёх строк. Добавьте вспомогательную функцию assertNever(value), которая выбрасывает Error с сообщением "Unexpected value: " и значением, и никогда не возвращает управление нормально. Ветка default в switch должна вызывать assertNever(direction), чтобы при добавлении нового направления в тип позже в этой ветке появлялась ошибка компиляции. Пример: move("up") возвращает "y-1", move("right") возвращает "x+1", а assertNever("boom") выбрасывает Error с сообщением "Unexpected value: boom".'
    ),
    hint: L(
      'Give assertNever the parameter type never and the return type never. After all the real cases are handled, the type of direction is narrowed to never, so the call type-checks.',
      'Дайте assertNever тип параметра never и тип возврата never. После обработки всех настоящих случаев тип direction сужается до never, и вызов проходит проверку типов.'
    ),
    solution: `type Direction = 'up' | 'down' | 'left' | 'right';

function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(message + ': ' + String(value));
}

function move(direction: Direction): string {
  switch (direction) {
    case 'up':
      return 'y-1';
    case 'down':
      return 'y+1';
    case 'left':
      return 'x-1';
    case 'right':
      return 'x+1';
    default:
      return assertNever(direction);
  }
}

console.log(move('up')); // y-1
console.log(move('right')); // x+1`,
    explanation: L(
      'The exhaustiveness check is a compile-time guarantee that every variant of a union is handled. Inside the default branch the type of direction has been narrowed by all the previous cases, so it is never, and never is not assignable from any real value, so passing direction there is allowed. The moment a fifth direction is added to the union, the default branch stops type-checking, and the compiler points at the exact place that must be updated. The helper is typed as returning never, so the switch is understood as exhaustive and the function is not forced to have a fallback return value, which removes the possibility of silently returning undefined.',
      'Проверка на исчерпывающий разбор — это гарантия на этапе компиляции, что обработан каждый вариант объединения. В ветке default тип direction сужен предыдущими case до never, а never нельзя присвоить ни из какого настоящего значения, поэтому передать direction туда можно. Как только в объединение добавляют пятое направление, ветка default перестаёт проходить проверку типов, и компилятор указывает точное место, которое нужно обновить. Помощник объявлен с типом возврата never, поэтому switch считается исчерпывающим и функции не нужен запасной возврат, что убирает возможность молча вернуть undefined.'
    ),
  },
];
