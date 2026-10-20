import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh02: Chapter = {
  id: 'architecture-ch2',
  title: L('Clean architecture and ports and adapters', 'Чистая архитектура и порты с адаптерами'),
  summary: L(
    'How a domain core of entities and rules stays free of frameworks, why use cases form the application core, what a port and an adapter are, how dependency inversion changes a fetch call and a clock, what mapping between layers costs and when plain functions are the better answer.',
    'Как доменное ядро из сущностей и правил остаётся без фреймворков, почему сценарии использования образуют прикладное ядро, что такое порт и адаптер, как инверсия зависимостей меняет вызов fetch и часы, сколько стоит маппинг между слоями и когда простые функции — лучший ответ.'
  ),
  sections: [
    {
      id: 'architecture-ch2-s1',
      title: L('Entities and domain rules', 'Сущности и доменные правила'),
      body: L(
        'An entity is an object with identity. Two orders with identical fields are still two different orders, and the only thing that tells them apart is the identifier. A value object has no identity: two amounts of money with the same number of cents and the same currency are interchangeable, so they are compared by their values and treated as the same thing. Keeping the two apart removes a whole class of confusion about what equality means in a model.\n\nThe domain rule is the part that has to live with these objects. Not a validation performed on the outside, but an invariant the object itself enforces: an order in the shipped state cannot be cancelled, a discount cannot make a line negative, a customer without an email cannot be created. When the rule lives inside the entity, every path that touches the entity gets it, including the background job nobody remembered to update.\n\nThe domain core is written in the language of the business, not of the framework. That means no ORM decorators, no HTTP request objects, no serialisation annotations, and no framework that decides how the class is instantiated. The consequence is that the rules can be tested with plain assertions and no setup at all, which is what makes them cheap to keep honest.\n\nThe test for a good domain object is that it refuses to exist in an invalid state. If you can build an Order with a negative total and repair it later by calling a method, the rule is not in the entity. If the constructor refuses, the rule is in the entity. Throwing from a constructor is awkward in some languages, so in TypeScript the same effect is achieved with a static factory that validates and returns a valid instance, and the constructor stays private.',
        'Сущность — объект с идентичностью. Два заказа с одинаковыми полями всё равно два разных заказа, и отличает их только идентификатор. У объекта-значения идентичности нет: две суммы денег с одинаковым числом центов и одинаковой валютой взаимозаменяемы, поэтому их сравнивают по значениям и считают одним и тем же. Разделение этих двух понятий снимает целый класс путаницы в том, что значит равенство в модели.\n\nДоменное правило — это то, что должно жить рядом с этими объектами. Не проверка, которую делают снаружи, а инвариант, который сам объект соблюдает: заказ в статусе отгружен нельзя отменить, скидка не может сделать строку отрицательной, клиента без почты создать нельзя. Когда правило живёт внутри сущности, его получают все пути, которые касаются сущности, включая фоновую задачу, которую никто не помнил обновить.\n\nДоменное ядро пишется на языке бизнеса, а не фреймворка. Это значит: ни декораторов ORM, ни HTTP-объектов запроса, ни аннотаций сериализации и ни фреймворка, который решает, как создаётся класс. Следствие: правила проверяются обычными утверждениями вообще без подготовки окружения, и именно это делает их дешёвыми в плане поддержки.\n\nПроверка хорошего доменного объекта проста: он отказывается существовать в невалидном состоянии. Если можно создать Order с отрицательной суммой и починить её позже вызовом метода, правило не в сущности. Если создание отклоняется, правило в сущности. Бросать из конструктора в некоторых языках неудобно, поэтому в TypeScript тот же эффект даёт статическая фабрика, которая валидирует и возвращает валидный экземпляр, а конструктор остаётся приватным.'
      ),
      bullets: [
        L('An entity has identity, a value object has none.', 'У сущности есть идентичность, у объекта-значения её нет.'),
        L('A domain rule is an invariant the object refuses to break.', 'Доменное правило — инвариант, который объект не позволяет нарушить.'),
        L('The domain core is written in the language of the business.', 'Доменное ядро пишется на языке бизнеса.'),
        L('A valid domain object cannot be built in an invalid state.', 'Валидный доменный объект нельзя создать в невалидном состоянии.'),
        L('A static factory that validates beats a constructor that trusts.', 'Статическая фабрика с валидацией лучше конструктора, который доверяет.'),
      ],
      code: `// domain/money.ts - a value object: no identity, compared by value
export interface Money { readonly amount: number; readonly currency: string }

export function moneyEquals(a: Money, b: Money): boolean {
  return a.amount === b.amount && a.currency === b.currency;
}

// domain/order.ts - an entity: identity plus an invariant
export class Order {
  readonly id: string;
  readonly total: Money;
  private status: 'draft' | 'shipped';

  private constructor(id: string, total: Money) {
    this.id = id;
    this.total = total;
    this.status = 'draft';
  }

  static create(id: string, total: Money): Order {
    if (total.amount < 0) throw new Error('total cannot be negative');
    return new Order(id, total);
  }

  ship(): void {
    if (this.status === 'shipped') throw new Error('order is already shipped');
    this.status = 'shipped';
  }
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Anemic domain model', 'Анемичная доменная модель'),
          text: L(
            'An entity that only holds fields, with all the rules in a service next to it, is a data structure and not a model. The tell is a class with getters and setters and no behaviour that can reject anything. Move the rule inside the object and the service becomes an orchestrator again.',
            'Сущность, которая только хранит поля, а все правила лежат в сервисе рядом, — это структура данных, а не модель. Признак: класс с геттерами и сеттерами без поведения, способного что-то отвергнуть. Перенесите правило внутрь объекта — и сервис снова станет оркестратором.'
          ),
        },
      ],
      takeaway: L(
        'An object that cannot exist in an invalid state keeps its rule for every caller, including the ones nobody remembers.',
        'Объект, который не может существовать в невалидном состоянии, хранит правило для каждого вызывающего, включая тех, кого никто не помнит.'
      ),
      seeAlso: [
        L('Section 1-1: what a layer is', 'Секция 1-1: что такое слой'),
        L('Section 2-6: when clean architecture is overkill', 'Секция 2-6: когда чистая архитектура избыточна'),
        L('Chapter 4: monolith and modular monolith', 'Глава 4: монолит и модульный монолит'),
      ],
    },
    {
      id: 'architecture-ch2-s2',
      title: L('Use cases as the application core', 'Сценарии использования как ядро приложения'),
      body: L(
        'A use case is one business operation seen from the outside: place an order, cancel a subscription, issue a refund. It takes a command, coordinates the domain objects and the ports, and returns a result. It is called a use case because it describes what the actor wants to accomplish, not which screens exist or which tables the data lives in, and that framing is what makes it reusable.\n\nThe core has no framework in it. The use case does not extend a base class, does not receive a request object, does not know how to write a log line in the format the platform expects and does not open a database connection. It receives its collaborators as plain arguments or through a constructor, and it returns plain data. The framework lives in the adapter that calls it, which is what allows the same core to be driven by a test.\n\nA use case is also the transaction boundary. The sequence load, check, reserve, charge, publish happens inside one unit of work, so a failure in the middle rolls the whole operation back instead of leaving a reserved item without a charge. A controller that performs the same steps inline loses that property, because the transaction belongs to the call that the framework wraps.\n\nThe granularity matters more than the naming. One use case per business operation, not one per screen and not one per endpoint. A use case that needs twenty steps is usually two use cases. A use case that fits on one line of intent is usually a function, and nothing is lost by keeping it that way, because a class with one method and a constructor is a function with extra ceremony.',
        'Сценарий использования — одна бизнес-операция, увиденная снаружи: оформить заказ, отменить подписку, выставить счёт. Он принимает команду, координирует доменные объекты и порты и возвращает результат. Его называют сценарием использования, потому что он описывает, чего хочет добиться пользователь, а не какие есть экраны и в каких таблицах лежат данные, и именно такая формулировка делает его переиспользуемым.\n\nВ ядре нет фреймворка. Сценарий не наследует базовый класс, не получает объект запроса, не знает, как записать строку лога в формате, который ждёт платформа, и не открывает соединение с базой. Он получает своих соседей обычными аргументами или через конструктор и возвращает обычные данные. Фреймворк живёт в адаптере, который его вызывает, и именно поэтому тем же ядром можно управлять из теста.\n\nСценарий использования — это ещё и граница транзакции. Последовательность «загрузить, проверить, зарезервировать, списать, опубликовать» выполняется в одной единице работы, поэтому сбой в середине откатывает операцию целиком, а не оставляет зарезервированный товар без оплаты. Контроллер, выполняющий те же шаги вручную, теряет это свойство: транзакция принадлежит вызову, который оборачивает фреймворк.\n\nВажнее названия гранулярность. Один сценарий на бизнес-операцию, а не на экран и не на эндпоинт. Сценарий, которому нужны двадцать шагов, — это обычно два сценария. Сценарий, который укладывается в одну строку намерения, — это обычно функция, и ничего не теряется, если оставить его функцией: класс с одним методом и конструктором — это функция с лишним церемониями.'
      ),
      bullets: [
        L('A use case is one business operation, named after what the actor wants.', 'Сценарий — одна бизнес-операция, названная по цели пользователя.'),
        L('The core contains no framework: no base classes, no request objects.', 'В ядре нет фреймворка: ни базовых классов, ни объектов запроса.'),
        L('The use case is the transaction boundary of the operation.', 'Сценарий использования — это ещё и граница транзакции операции.'),
        L('One use case per business operation, not per screen and not per endpoint.', 'Один сценарий на бизнес-операцию, а не на экран и не на эндпоинт.'),
        L('A use case that fits in one line of intent is just a function.', 'Сценарий, укладывающийся в одну строку намерения, — это просто функция.'),
      ],
      code: `export interface Order { id: string; total: number }
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
export interface PaymentPort { charge(orderId: string, amount: number): Promise<boolean> }
export interface UnitOfWork { run<T>(work: () => Promise<T>): Promise<T> }

// application/place-order.ts - a use case with no framework inside
export async function placeOrder(
  command: { orderId: string },
  deps: { orders: OrderRepository; payments: PaymentPort; unitOfWork: UnitOfWork }
): Promise<void> {
  await deps.unitOfWork.run(async () => {
    const order = await deps.orders.findById(command.orderId);
    if (!order) throw new Error('order not found');
    const paid = await deps.payments.charge(order.id, order.total);
    if (!paid) throw new Error('payment declined');
    await deps.orders.save(order);
  });
}`,
      table: {
        caption: L('What a use case owns and what it does not', 'Что принадлежит сценарию, а что нет'),
        headers: [L('Concern', 'Забота'), L('In the use case', 'В сценарии'), L('Outside', 'Вне сценария')],
        rows: [
          [
            L('Reading and writing data', 'Чтение и запись данных'),
            L('through the ports', 'через порты'),
            L('SQL and HTTP clients', 'SQL и HTTP-клиенты'),
          ],
          [
            L('Business rules', 'Бизнес-правила'),
            L('delegated to the domain', 'делегируются домену'),
            L('never re-implemented', 'никогда не дублируются'),
          ],
          [
            L('The transaction', 'Транзакция'),
            L('the boundary of the unit of work', 'граница единицы работы'),
            L('commit and rollback', 'коммит и откат'),
          ],
          [
            L('Transport details', 'Детали транспорта'),
            L('nothing', 'ничего'),
            L('parsing and rendering', 'разбор и отрисовка'),
          ],
        ],
      },
      takeaway: L(
        'A use case is one business operation with no framework inside, and it is the transaction boundary of that operation.',
        'Сценарий — одна бизнес-операция без фреймворка внутри и одновременно граница транзакции этой операции.'
      ),
      seeAlso: [
        L('Section 1-4: presentation, application and data layers', 'Секция 1-4: слои представления, приложения и данных'),
        L('Section 2-3: ports and adapters', 'Секция 2-3: порты и адаптеры'),
      ],
    },
    {
      id: 'architecture-ch2-s3',
      title: L('Ports and adapters', 'Порты и адаптеры'),
      body: L(
        'A port is an interface the core declares for the outside world: this is how the core wants to read orders, charge a payment or publish an event. An adapter is the implementation of that interface, written by the outside: a Postgres repository, a Stripe client, an HTTP controller, a queue consumer. The core never learns the name of the adapter, and the adapter never gets to change the core.\n\nThe hexagonal picture comes from this: the hexagon is the core with one side per port, and each side has an adapter attached to it. The shape of the hexagon is irrelevant, which is why the name is usually dropped in favour of ports and adapters. What matters is the direction of the dependency. The core declares, the world implements, and the wiring happens once, in the composition root, where the concrete adapters are passed into the use cases.\n\nThe composition root is the one place that knows everything: it imports the concrete adapters, instantiates them and passes them into the use cases. Everything else receives its collaborators from the outside. That is what makes a test possible: the test builds the same graph with a fake adapter instead of the real one, and the code of the use case does not change at all.\n\nPorts are not automatically a good idea. Each port is a promise that the core will not need a different implementation soon, and each adapter is code that has to be written, wired and tested. A core with seven ports and one adapter each is a lot of ceremony for a system that has one database and one way to send email. The right number of ports is the number of places where you genuinely expect to substitute something.',
        'Порт — это интерфейс, который ядро объявляет для внешнего мира: так ядро хочет читать заказы, списывать деньги или публиковать события. Адаптер — реализация этого интерфейса, написанная снаружи: репозиторий на Postgres, клиент Stripe, HTTP-контроллер, потребитель очереди. Ядро никогда не узнаёт имя адаптера, а адаптер никогда не получает права менять ядро.\n\nГексагональная картина получается отсюда: шестиугольник — это ядро, у которого по одной стороне на каждый порт, и к каждой стороне присоединён адаптер. Форма шестиугольника несущественна, поэтому название обычно и оставляют в пользу «порты и адаптеры». Существенно направление зависимости. Ядро объявляет, мир реализует, а связывание происходит один раз — в точке композиции, где конкретные адаптеры передаются в сценарии.\n\nТочка композиции — единственное место, которое знает всё: она импортирует конкретные адаптеры, создаёт их и передаёт в сценарии. Всё остальное получает своих соседей снаружи. Именно поэтому возможен тест: он собирает тот же граф с фейковым адаптером вместо настоящего, а код сценария не меняется вообще.\n\nПорты не всегда полезны. Каждый порт — обещание, что ядру скоро не понадобится другая реализация, а каждый адаптер — код, который надо написать, связать и протестировать. Ядро с семью портами и одним адаптером на каждый — это много церемоний для системы, у которой одна база и один способ отправить письмо. Правильное число портов равно числу мест, где подмена действительно ожидается.'
      ),
      bullets: [
        L('A port is an interface the core declares, an adapter implements it.', 'Порт — интерфейс, который объявляет ядро, адаптер его реализует.'),
        L('The core never imports the adapter it depends on.', 'Ядро никогда не импортирует адаптер, от которого зависит.'),
        L('The composition root is the only place that knows the implementations.', 'Точка композиции — единственное место, знающее реализации.'),
        L('A test swaps the adapter and leaves the use case untouched.', 'Тест подменяет адаптер и не трогает код сценария.'),
        L('Every port is a promise of substitutability, so do not promise what you will not replace.', 'Каждый порт — обещание заменяемости, не обещайте то, что не замените.'),
      ],
      code: `// application/ports.ts - the core declares its ports
export interface Order { id: string; total: number }
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
export interface Clock { now(): Date }

// data/in-memory-orders.ts - an adapter implements a port
export class InMemoryOrders implements OrderRepository {
  private readonly rows = new Map<string, Order>();
  async findById(id: string): Promise<Order | null> {
    return this.rows.get(id) ?? null;
  }
  async save(order: Order): Promise<void> {
    this.rows.set(order.id, order);
  }
}

// app/composition-root.ts - the only place that knows the adapters
export function buildApp(orders: OrderRepository, clock: Clock) {
  return {
    async placeOrder(id: string): Promise<Order> {
      const order: Order = { id, total: 100 };
      await orders.save(order);
      return order;
    },
    startedAt: clock.now(),
  };
}`,      table: {
        caption: L('Ports and the adapters that implement them', 'Порты и реализующие их адаптеры'),
        headers: [L('Port', 'Порт'), L('Adapter in production', 'Адаптер в проде'), L('Adapter in a test', 'Адаптер в тесте')],
        rows: [
          [
            L('OrderRepository', 'OrderRepository'),
            L('PostgresOrderRepository', 'PostgresOrderRepository'),
            L('InMemoryOrders', 'InMemoryOrders'),
          ],
          [
            L('PaymentPort', 'PaymentPort'),
            L('StripePaymentAdapter', 'StripePaymentAdapter'),
            L('FakePaymentAdapter', 'FakePaymentAdapter'),
          ],
          [
            L('Clock', 'Clock'),
            L('SystemClock', 'SystemClock'),
            L('FixedClock', 'FixedClock'),
          ],
          [
            L('EventPublisher', 'EventPublisher'),
            L('KafkaPublisher', 'KafkaPublisher'),
            L('RecordingPublisher', 'RecordingPublisher'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A port that leaks the mechanism', 'Порт, который протекает механизмом'),
          text: L(
            'A port called SqlPort with a method query(sql: string) looks like inversion but is not: the core now speaks SQL and every adapter has to pretend to be a database. The test of a good port is whether a second implementation with nothing in common with the first one is possible.',
            'Порт с именем SqlPort и методом query(sql: string) выглядит как инверсия, но это не она: ядро заговорило на SQL, и каждый адаптер обязан притворяться базой данных. Проверка хорошего порта — можно ли написать вторую реализацию, не имеющую ничего общего с первой.'
          ),
        },
      ],
      takeaway: L(
        'The core declares the ports, the world implements them, and the composition root is the only file that knows both.',
        'Ядро объявляет порты, мир их реализует, и только точка композиции знает и то и другое.'
      ),
      seeAlso: [
        L('Section 2-4: dependency inversion in practice', 'Секция 2-4: инверсия зависимостей на практике'),
        L('Section 1-3: why dependencies point inward', 'Секция 1-3: почему зависимости смотрят внутрь'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
      ],
    },
    {
      id: 'architecture-ch2-s4',
      title: L('Dependency inversion in practice', 'Инверсия зависимостей на практике'),
      body: L(
        'Dependency inversion means that the high-level policy declares the low-level detail it needs and the detail arrives at run time. The classic example is the clock. A use case that needs the current time calls clock.now(), and the clock is an interface with two implementations: SystemClock for production and FixedClock for tests. The moment a test needs "now is 12:00" it can say so without touching the code under test.\n\nThe same inversion applies to the network. A use case that fetches a price from a partner service does not call fetch, it calls a PricesPort, and the adapter that implements it is the only place where fetch, the URL and the timeout live. The core then runs in a test with a stub that returns a fixed price, and the failure modes of the network, a timeout or a malformed answer, are handled in the adapter rather than in the rule.\n\nTwo things follow. First, the core has no await of an external system in the middle of a rule, so a rule that has to be atomic can run without leaving the transaction. Second, the substitution is total: the same core can be driven by a live adapter, by a recorded adapter that replays production traffic, or by a fake. That is what makes the seam worth building.\n\nThe trap is the port that leaks the mechanism. A port called SqlPort with a method query(sql: string) looks like inversion but is not: the core now speaks SQL and every adapter has to pretend to be a database. The test of a good port is whether you can write a second implementation that has nothing in common with the first one. If the only possible implementations are Postgres and MySQL, the port was never a port.',
        'Инверсия зависимостей означает, что высокоуровневая политика объявляет нужную ей низкоуровневую деталь, а деталь приходит во время выполнения. Классический пример — часы. Сценарий, которому нужно текущее время, вызывает clock.now(), а часы — это интерфейс с двумя реализациями: SystemClock для прода и FixedClock для тестов. Как только тесту нужно «сейчас 12:00», он говорит это, не трогая проверяемый код.\n\nТа же инверсия работает и для сети. Сценарий, который получает цену у партнёрского сервиса, не вызывает fetch, а вызывает PricesPort, а реализующий его адаптер — единственное место, где живут fetch, URL и таймаут. После этого ядро выполняется в тесте с заглушкой, возвращающей фиксированную цену, а отказы сети, таймаут или битый ответ, обрабатываются в адаптере, а не в правиле.\n\nОтсюда следуют два вывода. Первый: внутри правила нет await внешней системы, поэтому правило, которое должно быть атомарным, выполняется, не покидая транзакцию. Второй: подмена полная — тем же ядром можно управлять живым адаптером, записанным адаптером, который повторяет production-трафик, или фейком. Именно это делает шов стоящим того, чтобы его построить.\n\nЛовушка — порт, который протекает механизмом. Порт с именем SqlPort и методом query(sql: string) выглядит как инверсия, но это не она: ядро заговорило на SQL, и каждый адаптер обязан притворяться базой данных. Проверка хорошего порта — можно ли написать вторую реализацию, не имеющую ничего общего с первой. Если возможны только Postgres и MySQL, это был не порт вовсе.'
      ),
      bullets: [
        L('The policy declares the detail it needs, the detail is supplied from outside.', 'Политика объявляет нужную деталь, деталь приходит снаружи.'),
        L('A clock is the smallest useful port: SystemClock and FixedClock.', 'Часы — самый маленький полезный порт: SystemClock и FixedClock.'),
        L('The adapter is the only place where fetch, the URL and the timeout live.', 'Адаптер — единственное место, где живут fetch, URL и таймаут.'),
        L('Inversion makes the core testable without a network and without a real clock.', 'Инверсия делает ядро тестируемым без сети и без настоящих часов.'),
        L('If the only possible implementations are databases, the port leaks SQL.', 'Если возможны только базы данных, порт протекает SQL.'),
      ],
      code: `export interface Clock { now(): Date }
export interface PricesPort { priceOf(sku: string): Promise<number> }

// The adapter is the only place where fetch, the URL and the timeout live.
export class FetchPrices implements PricesPort {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async priceOf(sku: string): Promise<number> {
    const response = await fetch(this.baseUrl + '/prices/' + sku);
    if (!response.ok) throw new Error('price service failed');
    const body = (await response.json()) as { amount: number };
    return body.amount;
  }
}

export const systemClock: Clock = { now: () => new Date() };

// The test says what time it is instead of waiting for it.
export function fixedClock(iso: string): Clock {
  return { now: () => new Date(iso) };
}`,
      takeaway: L(
        'Invert the dependency for every effect the core needs: the clock, the network, the storage, and the test stops needing the real thing.',
        'Переворачивай зависимость для каждого эффекта, который нужен ядру: часы, сеть, хранилище — и тесту больше не нужен настоящий мир.'
      ),
      seeAlso: [
        L('Section 2-3: ports and adapters', 'Секция 2-3: порты и адаптеры'),
        L('Section 1-3: why dependencies point inward', 'Секция 1-3: почему зависимости смотрят внутрь'),
        L('Section 4-6: testing a distributed system', 'Секция 4-6: тестирование распределённой системы'),
      ],
    },
    {
      id: 'architecture-ch2-s5',
      title: L('Mapping between layers', 'Маппинг между слоями'),
      body: L(
        'Mapping is the price of keeping the layers apart. A database row, a domain entity and a JSON response are three different shapes of the same fact, and something has to convert between them. If the layers share one shape, the layers are not really separate: the moment the API needs a field the table does not have, or the table needs a column the API must not expose, the shared shape has to change.\n\nThere are three places to map. From the adapter to the domain, where a row becomes an entity and the nulls of the row become the absence of a value in the domain. From the domain to the DTO, where the entity becomes the public contract of the API. And occasionally from the domain to a read model, where the shape is chosen by the screen that will display it. Each mapping is a place where a mistake becomes a silent bug: a field forgotten in the DTO shows up as an undefined in the response.\n\nThe cost is real and it grows with the number of shapes. A project with three layers often has two mappers per entity, and a mapper is code with no logic to test, so it is exactly the code that rots. The mitigations are practical: keep the mappers next to the layer that owns them, write them as plain functions so they can be unit tested without a container, and generate them when the shapes are mechanical enough for a generator to handle.\n\nThere is a version of this that is not worth it. If the entity has three fields, the API returns the same three fields and the table has three columns with the same names, then three mappers are three places to make the same typo. In that case mapping everything is ceremony, and the honest thing is to have one shape and accept that the layers share it. Mapping earns its place when the shapes are shaped for different consumers.',
        'Маппинг — это цена за то, что слои остаются раздельными. Строка в базе, доменная сущность и JSON-ответ — три разные формы одного и того же факта, и что-то должно переводить одно в другое. Если слои делят одну форму, слои на самом деле не разделены: как только API понадобится поле, которого нет в таблице, или таблице понадобится колонка, которую API не должен показывать, общая форма придётся менять.\n\nМаппинг есть в трёх местах. Из адаптера в домен: строка становится сущностью, а null строки — отсутствием значения в домене. Из домена в DTO: сущность становится публичным контрактом API. И иногда из домена в модель чтения, где форму выбирает экран, который её покажет. Каждый маппинг — место, где ошибка становится тихим багом: забытое в DTO поле всплывает как undefined в ответе.\n\nЦена реальна и растёт вместе с числом форм. Проект с тремя слоями часто получает по два маппера на сущность, а маппер — это код без логики, который нечего тестировать, то есть ровно тот код, который гниёт. Средства защиты практические: держать мапперы рядом со слоем, который им владеет, писать их обычными функциями, чтобы тестировать юнитом без контейнера, и генерировать там, где формы достаточно механические для генератора.\n\nБывает так, что вся эта работа не стоит своих денег. Если у сущности три поля, API возвращает те же три поля, а в таблице три колонки с теми же именами, то три маппера — это три места сделать одну и ту же опечатку. В таком случае маппинг всего — церемония, и честнее иметь одну форму и признать, что слои её делят. Маппинг окупается, когда формы делаются под разных потребителей.'
      ),
      bullets: [
        L('A row, an entity and a response are three shapes of the same fact.', 'Строка, сущность и ответ — три формы одного факта.'),
        L('A shared shape means the layers are not really separate.', 'Общая форма означает, что слои на самом деле не разделены.'),
        L('Mapping is where a forgotten field becomes an undefined at run time.', 'Маппинг — место, где забытое поле превращается в undefined во время выполнения.'),
        L('Keep mappers next to the layer that owns them, as plain functions.', 'Держите мапперы рядом со слоем-владельцем и делайте их обычными функциями.'),
        L('Mapping earns its place only when the shapes serve different consumers.', 'Маппинг окупается, только когда формы делаются под разных потребителей.'),
      ],
      code: `// domain/order.ts
export class Order {
  readonly id: string;
  readonly totalCents: number;
  readonly paid: boolean;

  constructor(id: string, totalCents: number, paid: boolean) {
    this.id = id;
    this.totalCents = totalCents;
    this.paid = paid;
  }
}

// data/order-mapper.ts - a row becomes an entity
export interface OrderRow { id: string; total_cents: number; paid_at: string | null }

export function toEntity(row: OrderRow): Order {
  return new Order(row.id, row.total_cents, row.paid_at !== null);
}

// api/order-dto.ts - an entity becomes the public contract
export interface OrderDto { id: string; amountCents: number; state: 'unpaid' | 'paid' }

export function toDto(order: Order): OrderDto {
  return { id: order.id, amountCents: order.totalCents, state: order.paid ? 'paid' : 'unpaid' };
}`,
      table: {
        caption: L('The three mapping boundaries', 'Три границы маппинга'),
        headers: [L('Boundary', 'Граница'), L('What changes', 'Что меняется'), L('Where the mapper lives', 'Где живёт маппер')],
        rows: [
          [
            L('Adapter to domain', 'Адаптер в домен'),
            L('a row becomes an entity, nulls become absence', 'строка становится сущностью, null — отсутствием'),
            L('next to the adapter', 'рядом с адаптером'),
          ],
          [
            L('Domain to DTO', 'Домен в DTO'),
            L('the entity becomes the public contract', 'сущность становится публичным контрактом'),
            L('next to the use case or the API', 'рядом со сценарием или API'),
          ],
          [
            L('Domain to read model', 'Домен в модель чтения'),
            L('the shape is chosen by the screen', 'форму выбирает экран'),
            L('next to the read model', 'рядом с моделью чтения'),
          ],
        ],
      },
      takeaway: L(
        'Map between layers only where the shapes are shaped for different consumers, and keep the mappers as plain functions next to their owner.',
        'Маппи между слоями только там, где формы делаются под разных потребителей, и держи мапперы обычными функциями рядом с владельцем.'
      ),
      seeAlso: [
        L('Section 2-1: entities and domain rules', 'Секция 2-1: сущности и доменные правила'),
        L('Section 1-4: presentation, application and data layers', 'Секция 1-4: слои представления, приложения и данных'),
      ],
    },
    {
      id: 'architecture-ch2-s6',
      title: L('When clean architecture is overkill', 'Когда чистая архитектура избыточна'),
      body: L(
        'The clean architecture is a bet that the core will be reused, tested in isolation and long-lived. That bet pays off in a system with real domain rules, several ways to reach the core and a team large enough to need agreed boundaries. It loses when the domain is a thin read of a database, the only client is the HTTP API and there is one way to store the data.\n\nIn that situation the honest architecture is a folder with plain functions, one module per feature and a repository that returns the rows the screen needs. The rules, if there are any, live next to the function that uses them. The cost of this simplification is real: when a second entry point appears or the rules grow, the structure has to be refactored, and the refactoring is cheaper the earlier it is done.\n\nThe signs that the heavy version is not earning its keep are easy to read. Every use case has exactly one adapter. Every port has exactly one implementation and no test uses a second one. The mappers are pure copies of the entity. The domain folder holds a data class per table and a rule that never rejects anything. In that state the layers are ceremony, and ceremony is a maintenance cost that shows up in every review.\n\nThe middle ground is to start with the simple version and keep the one thing that is hard to add later: the boundary between the policy and the mechanism. Concretely, that means the rule lives in a plain function or a small object, the effect happens through one function you can pass, and the folder of the feature has its own tests. When the pressure to grow appears, the seam is already there and the port can be introduced without a rewrite.',
        'Чистая архитектура — это ставка на то, что ядро будут переиспользовать, тестировать в изоляции и держать долго. Ставка выигрывает в системе с настоящими доменными правилами, несколькими способами добраться до ядра и командой, достаточно большой, чтобы нужны были согласованные границы. Она проигрывает, когда домен — тонкая проекция базы, единственный клиент — HTTP API, а хранить данные можно одним способом.\n\nВ такой ситуации честная архитектура — это папка с обычными функциями, по модулю на фичу и репозиторий, возвращающий строки, нужные экрану. Правила, если они есть, живут рядом с функцией, которая их использует. Цена упрощения реальна: когда появится вторая точка входа или правила вырастут, структуру придётся переделывать, и чем раньше это сделано, тем дешевле.\n\nПризнаки того, что тяжёлая версия не окупается, читаются легко. У каждого сценария ровно один адаптер. У каждого порта ровно одна реализация, и ни один тест не использует вторую. Мапперы — чистые копии сущности. В папке домена лежит класс-данные на каждую таблицу и правило, которое никогда ничего не отвергает. В таком состоянии слои — церемония, а церемония — это стоимость сопровождения, которая всплывает в каждом ревью.\n\nСередина — начать с простой версии и сохранить то, что потом трудно добавить: границу между политикой и механизмом. Конкретно: правило живёт в обычной функции или маленьком объекте, эффект происходит через одну передаваемую функцию, а у папки фичи есть свои тесты. Когда давление роста появится, шов уже на месте, и порт вводится без переписывания.'
      ),
      bullets: [
        L('Clean architecture pays off with real rules, several entry points and a large team.', 'Чистая архитектура окупается с настоящими правилами, несколькими точками входа и большой командой.'),
        L('One adapter per port and copy-only mappers mean the layers are ceremony.', 'Один адаптер на порт и мапперы-копии означают, что слои — церемония.'),
        L('The simple version is right when the domain is a thin read of a database.', 'Простая версия права, когда домен — тонкая проекция базы.'),
        L('Keep the policy-mechanism boundary even when you skip the layers.', 'Сохрани границу политики и механизма, даже если откажешься от слоёв.'),
        L('Refactoring early is cheaper than refactoring after the second entry point.', 'Рефакторинг рано дешевле, чем рефакторинг после появления второй точки входа.'),
      ],
      code: `// A small feature with no layers at all.
export interface Product { id: string; priceCents: number; stock: number }

export async function reserve(
  product: Product,
  quantity: number,
  save: (product: Product) => Promise<void>
): Promise<Product> {
  if (quantity < 1) throw new Error('quantity must be positive');
  if (product.stock < quantity) throw new Error('not enough stock');
  const reserved = { ...product, stock: product.stock - quantity };
  await save(reserved);
  return reserved;
}

// The test passes its own save: no container, no mock library.
const saved: Product[] = [];
await reserve({ id: 'p1', priceCents: 100, stock: 2 }, 1, async (product) => {
  saved.push(product);
});`,
      table: {
        caption: L('Signs that the heavy version is not paying off', 'Признаки того, что тяжёлая версия не окупается'),
        headers: [L('Symptom', 'Симптом'), L('What it means', 'Что это значит'), L('The simpler answer', 'Простой ответ')],
        rows: [
          [
            L('One adapter for every port', 'Один адаптер на каждый порт'),
            L('the substitution never happens', 'подмена не случается'),
            L('pass the function as an argument', 'передать функцию аргументом'),
          ],
          [
            L('Mappers copy the fields one to one', 'Мапперы копируют поля один в один'),
            L('two shapes to keep in sync', 'две формы под синхронизацию'),
            L('one shape, accept the coupling', 'одна форма, принимаем связанность'),
          ],
          [
            L('No second entry point', 'Нет второй точки входа'),
            L('the core is not reused', 'ядро не переиспользуют'),
            L('let the HTTP layer call the function', 'пусть HTTP-слой вызывает функцию'),
          ],
          [
            L('The rules never reject anything', 'Правила никогда не отвергают'),
            L('the model earns nothing', 'модель ничего не даёт'),
            L('plain data plus plain functions', 'простые данные и простые функции'),
          ],
        ],
      },
      takeaway: L(
        'Keep the policy-mechanism boundary from day one, and add the layers only when a second implementation or a second entry point arrives.',
        'Сохрани границу политики и механизма с первого дня, а слои добавляй, когда появится вторая реализация или вторая точка входа.'
      ),
      seeAlso: [
        L('Section 2-1: entities and domain rules', 'Секция 2-1: сущности и доменные правила'),
        L('Section 3-5: shared code versus feature code', 'Секция 3-5: общий код против кода фичи'),
      ],
    },
  ],
};
