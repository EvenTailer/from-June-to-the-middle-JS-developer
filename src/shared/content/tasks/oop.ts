import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopTasks: PracticeTask[] = [
  {
    id: 'oop-task-4',
    topic: 'oop',
    level: 'basic',
    title: L('Split a fat interface', 'Разделить «толстый» интерфейс'),
    brief: L(
      'A single Device interface requires print, scan and fax, so a simple printer is forced to throw for two methods. Split it into small role interfaces and implement a printer and a multifunction device.',
      'Единый интерфейс Device требует print, scan и fax, поэтому простой принтер вынужден выбрасывать ошибки в двух методах. Разделите его на маленькие ролевые интерфейсы и реализуйте принтер и МФУ.'
    ),
    hint: L(
      'Create one interface per capability and let a class implement only the interfaces it actually supports.',
      'Создайте отдельный интерфейс на каждую возможность и позволяйте классу реализовывать только те интерфейсы, которые ему действительно нужны.'
    ),
    solution: `interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(): string;
}

interface Fax {
  fax(document: string): void;
}

class SimplePrinter implements Printer {
  print(document: string) {
    console.log('print', document);
  }
}

class MultiFunctionDevice implements Printer, Scanner, Fax {
  print(document: string) {
    console.log('print', document);
  }

  scan() {
    return 'scanned-page';
  }

  fax(document: string) {
    console.log('fax', document);
  }
}

function printAll(device: Printer, documents: string[]) {
  documents.forEach((document) => device.print(document));
}

printAll(new SimplePrinter(), ['invoice', 'report']);
printAll(new MultiFunctionDevice(), ['contract']);`,
    explanation: L(
      'Clients depend only on the methods they use. SimplePrinter no longer pretends to scan or fax, and a function that only prints accepts any object with print, including the multifunction device.',
      'Клиенты зависят только от используемых методов. SimplePrinter больше не притворяется, что умеет сканировать и отправлять факсы, а функция печати принимает любой объект с print, включая МФУ.'
    ),
  },
  {
    id: 'oop-task-5',
    topic: 'oop',
    level: 'basic',
    title: L('Choose shipping with a strategy', 'Выбрать доставку через стратегию'),
    brief: L(
      'Implement standard, express and pickup shipping as interchangeable strategies. A ShippingCalculator must accept a strategy, calculate a total and allow switching at runtime.',
      'Реализуйте стандартную, экспресс- и самовывозную доставку как взаимозаменяемые стратегии. ShippingCalculator должен принимать стратегию, считать итог и позволять менять её во время работы.'
    ),
    hint: L(
      'Define one interface with a cost(weightKg) method. Each shipping type implements it, and the calculator delegates to the current strategy.',
      'Опишите интерфейс с методом cost(weightKg). Каждый вид доставки реализует его, а калькулятор делегирует расчёт текущей стратегии.'
    ),
    solution: `interface ShippingStrategy {
  name: string;
  cost(weightKg: number): number;
}

class StandardShipping implements ShippingStrategy {
  name = 'standard';

  cost(weightKg: number) {
    return 3 + weightKg * 0.5;
  }
}

class ExpressShipping implements ShippingStrategy {
  name = 'express';

  cost(weightKg: number) {
    return 9 + weightKg * 1.2;
  }
}

class PickupShipping implements ShippingStrategy {
  name = 'pickup';

  cost() {
    return 0;
  }
}

class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  total(weightKg: number) {
    return Number(this.strategy.cost(weightKg).toFixed(2));
  }

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }
}

const calculator = new ShippingCalculator(new StandardShipping());
console.log(calculator.total(2));

calculator.setStrategy(new ExpressShipping());
console.log(calculator.total(2));`,
    explanation: L(
      'The calculator owns the algorithm flow, while each strategy owns the price formula. Adding a new carrier means adding one class, not editing a growing if/else chain.',
      'Калькулятор отвечает за ход расчёта, а каждая стратегия — за формулу цены. Новый перевозчик означает один новый класс, а не правку растущей цепочки if/else.'
    ),
  },
  {
    id: 'oop-task-6',
    topic: 'oop',
    level: 'basic',
    title: L('Build a typed event emitter', 'Создать типизированный эмиттер событий'),
    brief: L(
      'Implement an Emitter class with on, emit and an unsubscribe function. Multiple listeners must receive the same payload, and removing one listener must not affect the others.',
      'Реализуйте класс Emitter с on, emit и функцией отписки. Несколько слушателей должны получать одно и то же событие, а удаление одного не должно влиять на остальные.'
    ),
    hint: L(
      'Store listeners in a Set so duplicates are impossible. Return a closure from on that deletes the listener.',
      'Храните слушателей в Set, чтобы исключить дубли. Возвращайте из on замыкание, которое удаляет слушателя.'
    ),
    solution: `type Listener<T> = (payload: T) => void;

class Emitter<T> {
  private listeners = new Set<Listener<T>>();

  on(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(payload: T): void {
    this.listeners.forEach((listener) => listener(payload));
  }
}

const orderEvents = new Emitter<{ id: number }>();

const unsubscribe = orderEvents.on((order) => {
  console.log('email', order.id);
});

orderEvents.on((order) => {
  console.log('inventory', order.id);
});

orderEvents.emit({ id: 42 });
unsubscribe();
orderEvents.emit({ id: 43 });`,
    explanation: L(
      'The emitter knows nothing about email or inventory. New reactions are added by subscribing, and the returned function gives the subscriber control over its own lifetime.',
      'Эмиттер ничего не знает про email или склад. Новые реакции добавляются подпиской, а возвращённая функция даёт подписчику контроль над временем жизни.'
    ),
  },
  {
    id: 'oop-task-7',
    topic: 'oop',
    level: 'intermediate',
    title: L('Replace a class with a factory', 'Заменить класс фабрикой'),
    brief: L(
      'Create a logger factory that takes a prefix and returns an object with info and error methods. It must work without new, without this and without a subclass for every prefix.',
      'Создайте фабрику логгеров, которая принимает префикс и возвращает объект с методами info и error. Она должна работать без new, без this и без подкласса для каждого префикса.'
    ),
    hint: L(
      'Return an object literal from a function. A closure keeps the prefix private, so no fields or binding are required.',
      'Возвращайте литерал объекта из функции. Замыкание хранит префикс приватно, поэтому поля и привязка this не нужны.'
    ),
    solution: `interface Logger {
  info(message: string): void;
  error(message: string): void;
}

function createLogger(prefix: string): Logger {
  function write(level: string, message: string) {
    console.log('[' + level + '] ' + prefix + ': ' + message);
  }

  return {
    info: (message) => write('info', message),
    error: (message) => write('error', message),
  };
}

const apiLogger = createLogger('api');
const dbLogger = createLogger('db');

apiLogger.info('server started');
dbLogger.error('connection lost');

// No new, no this, no subclass per prefix.`,
    explanation: L(
      'A factory fits when there is no meaningful type hierarchy and no state to expose. The closure keeps prefix private, and the returned object satisfies the Logger contract, so it can be swapped or mocked easily.',
      'Фабрика подходит, когда нет содержательной иерархии типов и состояния, которое нужно наружу. Замыкание хранит префикс приватно, а возвращённый объект соответствует контракту Logger, поэтому его легко заменить или замокать.'
    ),
  },
  {
    id: 'oop-task-8',
    topic: 'oop',
    level: 'intermediate',
    title: L('Hide storage behind a repository', 'Скрыть хранилище за репозиторием'),
    brief: L(
      'Define a UserRepository interface with findById and save. Implement it in memory, then write a UserService that depends on the interface rather than on the storage.',
      'Опишите интерфейс UserRepository с findById и save. Реализуйте его в памяти, затем напишите UserService, который зависит от интерфейса, а не от хранилища.'
    ),
    hint: L(
      'Make repository methods async even for the in-memory version, so a real database can replace it without changing callers.',
      'Сделайте методы репозитория асинхронными даже для версии в памяти, чтобы настоящая база заменила её без изменения вызывающего кода.'
    ),
    solution: `interface User {
  id: string;
  email: string;
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async findById(id: string) {
    return this.users.get(id) ?? null;
  }

  async save(user: User) {
    this.users.set(user.id, user);
  }
}

class UserService {
  constructor(private readonly repository: UserRepository) {}

  async rename(id: string, email: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('User not found');
    await this.repository.save({ ...user, email });
  }
}

const service = new UserService(new InMemoryUserRepository());
await service.rename('u-1', 'new@example.com');`,
    explanation: L(
      'The service contains business rules and the repository contains persistence details. Tests can pass a fake repository, and production can pass a SQL implementation without touching UserService.',
      'Сервис содержит бизнес-правила, а репозиторий — детали хранения. Тесты могут передать фейковый репозиторий, а продакшен — SQL-реализацию без изменения UserService.'
    ),
  },
  {
    id: 'oop-task-9',
    topic: 'oop',
    level: 'intermediate',
    title: L('Refactor a class with too many reasons to change', 'Разделить класс с слишком многими причинами для изменений'),
    brief: L(
      'OrderManager validates orders, calculates totals, saves them and sends email. Split these responsibilities into focused collaborators and keep a thin PlaceOrder use case that coordinates them.',
      'OrderManager валидирует заказы, считает сумму, сохраняет их и отправляет письма. Разделите эти обязанности на узкие компоненты и оставьте тонкий сценарий PlaceOrder, который их координирует.'
    ),
    hint: L(
      'Extract a validator, a price calculator, a store interface and an email service. The use case should only call them in order.',
      'Выделите валидатор, калькулятор цены, интерфейс хранилища и сервис писем. Сценарий должен только вызывать их по порядку.'
    ),
    solution: `interface Order {
  id: string;
  email: string;
  items: { price: number; qty: number }[];
}

class OrderValidator {
  validate(order: Order) {
    if (order.items.length === 0) throw new Error('Order is empty');
  }
}

class PriceCalculator {
  total(order: Order) {
    return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}

interface OrderStore {
  save(order: Order, total: number): Promise<void>;
}

class EmailService {
  async sendReceipt(email: string, total: number) {
    console.log('receipt', email, total);
  }
}

class PlaceOrder {
  constructor(
    private validator: OrderValidator,
    private prices: PriceCalculator,
    private store: OrderStore,
    private email: EmailService
  ) {}

  async execute(order: Order) {
    this.validator.validate(order);
    const total = this.prices.total(order);
    await this.store.save(order, total);
    await this.email.sendReceipt(order.email, total);
    return total;
  }
}`,
    explanation: L(
      'Each class now has one reason to change: validation rules, pricing rules, storage or delivery. PlaceOrder only describes the sequence, so changing the email provider does not risk breaking the price calculation.',
      'У каждого класса теперь одна причина для изменения: правила валидации, цены, хранение или отправка. PlaceOrder описывает только последовательность, поэтому смена почтового провайдера не рискует сломать расчёт цены.'
    ),
  },
  {
    id: 'oop-task-10',
    topic: 'oop',
    level: 'intermediate',
    title: L('Model money as a value object', 'Смоделировать деньги как value object'),
    brief: L(
      'Create an immutable Money class that stores integer cents, supports add and subtract with a currency check, and formats the result. Adding 19.99 and 5.01 must produce exactly 25.00.',
      'Создайте неизменяемый класс Money, который хранит целые центы, поддерживает add и subtract с проверкой валюты и форматирует результат. Сложение 19.99 и 5.01 должно дать ровно 25.00.'
    ),
    hint: L(
      'Round to cents once in a static factory, freeze the instance, and return a new Money from every operation.',
      'Округлите до центов один раз в статической фабрике, заморозьте экземпляр и возвращайте новый Money из каждой операции.'
    ),
    solution: `class Money {
  readonly cents: number;
  readonly currency: string;

  private constructor(cents: number, currency: string) {
    if (!Number.isInteger(cents)) throw new Error('Cents must be an integer');
    this.cents = cents;
    this.currency = currency;
    Object.freeze(this);
  }

  static from(amount: number, currency: string) {
    return new Money(Math.round(amount * 100), currency);
  }

  add(other: Money) {
    this.assertSameCurrency(other);
    return new Money(this.cents + other.cents, this.currency);
  }

  subtract(other: Money) {
    this.assertSameCurrency(other);
    return new Money(this.cents - other.cents, this.currency);
  }

  format() {
    return (this.cents / 100).toFixed(2) + ' ' + this.currency;
  }

  private assertSameCurrency(other: Money) {
    if (other.currency !== this.currency) {
      throw new Error('Currency mismatch');
    }
  }
}

const price = Money.from(19.99, 'EUR');
const total = price.add(Money.from(5.01, 'EUR'));

console.log(total.format()); // 25.00 EUR`,
    explanation: L(
      'Floating point cannot represent 0.1 exactly, so arithmetic in cents avoids visible rounding drift. Freezing the object and returning new instances makes Money safe to share as a value.',
      'Числа с плавающей точкой не представляют 0.1 точно, поэтому арифметика в центах избегает заметного накопления ошибки. Заморозка объекта и возврат новых экземпляров делают Money безопасным для совместного использования как значения.'
    ),
  },
  {
    id: 'oop-task-11',
    topic: 'oop',
    level: 'advanced',
    title: L('Use a singleton config with caution', 'Использовать singleton-конфигурацию с оговоркой'),
    brief: L(
      'Implement a lazily created, frozen application config with a static get method. Then explain the main testing problem with singletons and how dependency injection solves it.',
      'Реализуйте лениво создаваемую замороженную конфигурацию приложения со статическим методом get. Затем объясните главную проблему singleton при тестировании и как её решает внедрение зависимостей.'
    ),
    hint: L(
      'Keep the constructor private and create the instance on first access. Freeze the values so no caller can mutate shared state.',
      'Сделайте конструктор приватным и создавайте экземпляр при первом обращении. Заморозьте значения, чтобы никто не мог изменить общее состояние.'
    ),
    solution: `interface AppConfig {
  apiUrl: string;
  timeoutMs: number;
}

class Config {
  private static instance: Config | null = null;
  readonly values: AppConfig;

  private constructor() {
    this.values = Object.freeze({
      apiUrl: process.env.API_URL ?? 'http://localhost:3000',
      timeoutMs: 5000,
    });
  }

  static get(): Config {
    Config.instance ??= new Config();
    return Config.instance;
  }
}

const config = Config.get();
console.log(config.values.apiUrl);`,
    explanation: L(
      'The singleton is convenient for read-only settings, but it hides a dependency inside every module and keeps state between tests. Prefer passing a config object into services; keep the singleton only at the composition root.',
      'Singleton удобен для настроек только для чтения, но прячет зависимость внутри каждого модуля и сохраняет состояние между тестами. Лучше передавать объект конфигурации в сервисы, а singleton использовать только в точке сборки приложения.'
    ),
  },
  {
    id: 'oop-task-12',
    topic: 'oop',
    level: 'advanced',
    title: L('Log method calls with a decorator', 'Логировать вызовы методов через декоратор'),
    brief: L(
      'Write a method decorator that logs the method name, arguments and return value without changing the method body. Apply it to PaymentService.charge.',
      'Напишите декоратор метода, который логирует имя метода, аргументы и результат, не меняя тело метода. Примените его к PaymentService.charge.'
    ),
    hint: L(
      'Wrap descriptor.value in a new function, call the original with apply, and return the descriptor. Type the decorator as MethodDecorator.',
      'Оберните descriptor.value новой функцией, вызовите оригинал через apply и верните descriptor. Типизируйте декоратор как MethodDecorator.'
    ),
    solution: `const Logged: MethodDecorator = (target, key, descriptor) => {
  const original = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]) {
    console.log('call', String(key), args);
    const result = original.apply(this, args);
    console.log('result', String(key), result);
    return result;
  };
};

class PaymentService {
  @Logged
  charge(amount: number) {
    return { ok: true, amount };
  }
}

new PaymentService().charge(100);`,
    explanation: L(
      'A decorator is a higher-order function applied once to the method descriptor. This example needs experimentalDecorators in tsconfig; standard decorators use a different signature. Wrapping also removes per-method logging duplication.',
      'Декоратор — это функция высшего порядка, применяемая один раз к дескриптору метода. Для этого примера нужен experimentalDecorators в tsconfig; стандартные декораторы используют другую сигнатуру. Обёртка также убирает дублирование логирования в каждом методе.'
    ),
  },
  {
    id: 'oop-task-13',
    topic: 'oop',
    level: 'advanced',
    title: L('Compose an order pipeline', 'Собрать конвейер обработки заказа'),
    brief: L(
      'Build validate, price and pay steps as small async functions. Compose them into one placeOrder function so each step can be tested and reordered independently.',
      'Сделайте шаги validate, price и pay небольшими асинхронными функциями. Соберите из них одну функцию placeOrder, чтобы каждый шаг можно было тестировать и переставлять независимо.'
    ),
    hint: L(
      'Give every step the same input and output type, then reduce an array of steps over a resolved promise.',
      'Дайте каждому шагу одинаковый тип входа и выхода, затем сверните массив шагов через reduce по уже разрешённому promise.'
    ),
    solution: `interface Order {
  id: string;
  items: { sku: string; qty: number; price: number }[];
  total: number;
  status: 'draft' | 'validated' | 'paid';
}

type Step = (order: Order) => Promise<Order>;

const validate: Step = async (order) => {
  if (order.items.length === 0) throw new Error('Empty order');
  return { ...order, status: 'validated' };
};

const price: Step = async (order) => ({
  ...order,
  total: order.items.reduce((sum, item) => sum + item.qty * item.price, 0),
});

const pay: Step = async (order) => {
  if (order.total <= 0) throw new Error('Nothing to pay');
  return { ...order, status: 'paid' };
};

function pipeline(...steps: Step[]): Step {
  return (order) =>
    steps.reduce(
      (promise, step) => promise.then(step),
      Promise.resolve(order)
    );
}

const placeOrder = pipeline(validate, price, pay);

const result = await placeOrder({
  id: 'o-1',
  items: [{ sku: 'keyboard', qty: 2, price: 50 }],
  total: 0,
  status: 'draft',
});

console.log(result.status, result.total);`,
    explanation: L(
      'Each step is a pure-ish function with one job, and the pipeline owns the order of execution. You can insert retry, logging or a discount step without editing the existing functions.',
      'Каждый шаг — почти чистая функция с одной задачей, а конвейер отвечает за порядок выполнения. Можно добавить retry, логирование или скидку, не редактируя существующие функции.'
    ),
  },
  {
    id: 'oop-task-14',
    topic: 'objects',
    level: 'advanced',
    title: L('Update nested state immutably', 'Обновить вложенное состояние иммутабельно'),
    brief: L(
      'Write updateQuantity(cart, id, qty) that changes one item quantity, removes the item when qty is zero or less, and never mutates the original cart.',
      'Напишите updateQuantity(cart, id, qty), который меняет количество одного товара, удаляет товар при qty <= 0 и никогда не мутирует исходную корзину.'
    ),
    hint: L(
      'Copy each level you change: the cart, the items array and only the affected item. Use filter for removal and map for updates.',
      'Копируйте каждый изменяемый уровень: корзину, массив items и только затронутый товар. Используйте filter для удаления и map для обновления.'
    ),
    solution: `interface CartItem {
  id: string;
  qty: number;
  price: number;
}

interface Cart {
  items: CartItem[];
  coupon?: string;
}

function updateQuantity(cart: Cart, id: string, qty: number): Cart {
  if (qty <= 0) {
    return {
      ...cart,
      items: cart.items.filter((item) => item.id !== id),
    };
  }

  return {
    ...cart,
    items: cart.items.map((item) =>
      item.id === id ? { ...item, qty } : item
    ),
  };
}

const cart: Cart = { items: [{ id: 'a', qty: 1, price: 10 }] };
const next = updateQuantity(cart, 'a', 3);

console.log(cart.items[0].qty); // 1
console.log(next.items[0].qty); // 3
console.log(cart === next); // false`,
    explanation: L(
      'Only the changed branch is copied; untouched items keep their identity, which keeps reference equality useful for memoization. Removing with filter also avoids splice side effects.',
      'Копируется только изменённая ветка; нетронутые товары сохраняют идентичность, поэтому сравнение по ссылке остаётся полезным для мемоизации. Удаление через filter также избегает побочных эффектов splice.'
    ),
  },
  {
    id: 'oop-task-15',
    topic: 'oop',
    level: 'advanced',
    title: L('Build a plugin registry', 'Создать реестр плагинов'),
    brief: L(
      'Implement a PluginRegistry that registers plugins by unique name, rejects duplicates, exposes lookup by name and sets up every plugin in registration order.',
      'Реализуйте PluginRegistry, который регистрирует плагины по уникальному имени, отклоняет дубли, позволяет искать по имени и запускает настройку всех плагинов в порядке регистрации.'
    ),
    hint: L(
      'A Map preserves insertion order. Make register throw on an existing name and return this for chaining.',
      'Map сохраняет порядок вставки. Пусть register выбрасывает ошибку при существующем имени и возвращает this для цепочки вызовов.'
    ),
    solution: `interface PluginContext {
  log(message: string): void;
}

interface Plugin {
  name: string;
  setup(context: PluginContext): void | Promise<void>;
}

class PluginRegistry {
  private plugins = new Map<string, Plugin>();

  register(plugin: Plugin): this {
    if (this.plugins.has(plugin.name)) {
      throw new Error('Plugin already registered: ' + plugin.name);
    }

    this.plugins.set(plugin.name, plugin);
    return this;
  }

  get(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  async setupAll(context: PluginContext): Promise<void> {
    for (const plugin of this.plugins.values()) {
      await plugin.setup(context);
    }
  }
}

const registry = new PluginRegistry();

registry
  .register({
    name: 'analytics',
    setup: (context) => context.log('analytics ready'),
  })
  .register({
    name: 'cache',
    setup: async (context) => context.log('cache ready'),
  });

await registry.setupAll({ log: console.log });`,
    explanation: L(
      'The registry depends on a small Plugin contract, not on concrete features, so new plugins are added without changing it. Sequential setup makes startup order explicit instead of relying on timing.',
      'Реестр зависит от маленького контракта Plugin, а не от конкретных возможностей, поэтому новые плагины добавляются без его изменения. Последовательная настройка делает порядок запуска явным, а не зависящим от таймингов.'
    ),
  },
];
