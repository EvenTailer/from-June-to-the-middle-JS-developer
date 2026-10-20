import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureModule: Module = {
  id: 'architecture',
  title: L('Architecture', 'Архитектура'),
  description: L('Layers, module boundaries, clean architecture, API design, scaling and system design.', 'Слои, границы модулей, чистая архитектура, проектирование API, масштабирование и системный дизайн.'),
  lessons: [
    { id: 'arch-001', title: L('Layers vs modules', 'Слои и модули'), question: L('What is a layer, and how is it different from a module?', 'Что такое слой и чем он отличается от модуля?'), answer: L('A layer is a horizontal band of the system that groups code by technical role: presentation, application, domain, infrastructure. A module is a unit with a business meaning and its own public API; modules are usually vertical slices that cut across all layers.', 'Слой — горизонтальная полоса системы, группирующая код по технической роли: presentation, application, domain, infrastructure. Модуль — единица с бизнес-смыслом и собственным публичным API; обычно модули вертикальные и проходят сквозь все слои.'), code: `src/\n  domain/        // entities, rules\n  application/   // use cases\n  infrastructure/ // db, http, queues` },
    { id: 'arch-002', title: L('Dependency direction', 'Направление зависимостей'), question: L('Which way should dependencies point between layers?', 'В какую сторону должны идти зависимости между слоями?'), answer: L('Inward. An outer layer may call the inner one, the inner one must not import the outer. The domain knows nothing about HTTP, SQL or React, so it is tested in isolation and reused from any entry point.', 'Внутрь. Внешний слой может вызывать внутренний, а внутренний не должен импортировать внешний. Домен ничего не знает про HTTP, SQL и React, поэтому тестируется изолированно и переиспользуется из любой точки входа.'), code: `// Bad: domain imports infrastructure\nimport { db } from './infrastructure/db';\n\n// Good: domain declares what it needs\nimport { UserRepository } from './domain/ports';` },
    { id: 'arch-003', title: L('Presentation layer', 'Слой представления'), question: L('What belongs to the presentation layer?', 'Что относится к слою представления?'), answer: L('Only transport concerns: parse the request, validate the shape of the input, call one use case, map the result to a response. Business decisions belong to the domain, input and output belong to the adapters.', 'Только транспортные заботы: разобрать запрос, проверить форму входных данных, вызвать один сценарий, отобразить результат в ответ. Бизнес-решения живут в домене, ввод-вывод — в адаптерах.'), code: `async function createUser(req, res) {\n  const input = parseBody(req);\n  const user = await createUserUseCase.execute(input);\n  res.status(201).json(toDto(user));\n}` },
    { id: 'arch-004', title: L('Domain layer', 'Доменный слой'), question: L('What is the domain layer and what belongs in it?', 'Что такое доменный слой и что в нём находится?'), answer: L('Entities, value objects, domain services, invariants and business rules expressed in the language of the business. It imports no frameworks, no HTTP, no database, and it is the part that changes when the business changes.', 'Сущности, объекты-значения, доменные сервисы, инварианты и бизнес-правила на языке предметной области. Без фреймворков, HTTP и базы данных — это та часть, которая меняется, когда меняется бизнес.'), code: `class Order {\n  addItem(item: Item) {\n    if (item.isDiscounted() && this.total.value() < item.price().value()) {\n      throw new Error('Total cannot be lower than the discounted item');\n    }\n    this.total = this.total.plus(item.price());\n  }\n}` },
    { id: 'arch-005', title: L('Application layer', 'Слой приложения'), question: L('What is a use case and why does it deserve its own layer?', 'Что такое сценарий использования и зачем ему отдельный слой?'), answer: L('A use case is one business operation: it orchestrates domain objects and ports, opens a unit of work and returns a result. It is the seam between the domain and everything else, and it is what an application test drives.', 'Сценарий использования — одна бизнес-операция: координирует доменные объекты и порты, открывает единицу работы и возвращает результат. Это шов между доменом и всем остальным, и именно он проверяется тестом.'), code: `export class PlaceOrder {\n  constructor(private orders: OrderRepository, private clock: Clock) {}\n  execute(cmd: PlaceOrderCommand): OrderId {\n    const order = Order.create(cmd.items, this.clock.now());\n    this.orders.save(order);\n    return order.id;\n  }\n}` },
    { id: 'arch-006', title: L('Infrastructure layer', 'Инфраструктурный слой'), question: L('What is the infrastructure layer?', 'Что такое инфраструктурный слой?'), answer: L('Concrete implementations of the ports: database repositories, HTTP clients, queue producers, mailers, clocks and random generators. It is the only layer that knows specific technologies, and usually the easiest one to replace.', 'Конкретные реализации портов: репозитории, HTTP-клиенты, продюсеры очередей, отправка почты, часы и генераторы случайных чисел. Единственный слой, который знает про конкретные технологии, и самый простой для замены.'), code: `export class PostgresOrderRepository implements OrderRepository {\n  constructor(private db: Pool) {}\n  async save(order: Order) {\n    await this.db.query('INSERT INTO orders ...', [order.id]);\n  }\n}` },
    { id: 'arch-007', title: L('Ports and adapters', 'Порты и адаптеры'), question: L('What does hexagonal (ports and adapters) architecture propose?', 'Что предлагает гексагональная архитектура (порты и адаптеры)?'), answer: L('Put the application in the centre and declare the ports it needs; implement them with adapters such as a REST controller, a database repository or a queue consumer. The shape of the hexagon is irrelevant: the point is a core surrounded by swappable adapters.', 'Положить приложение в центр и объявить нужные ему порты; реализовать их адаптерами: REST-контроллер, репозиторий, потребитель очереди. Форма шестиугольника не важна: суть в ядре, окружённом сменяемыми адаптерами.'), code: `// port, declared inside\nexport interface PaymentPort {\n  charge(amount: Money): Promise<Receipt>;\n}\n\n// adapter, implemented outside\nexport class StripeAdapter implements PaymentPort {` },
    { id: 'arch-008', title: L('Dependency inversion in practice', 'Инверсия зависимостей на практике'), question: L('How does dependency inversion look in TypeScript code?', 'Как выглядит инверсия зависимостей в TypeScript-коде?'), answer: L('The use case depends on an interface it declares itself, the adapter implements that interface, and the wiring happens in one composition root. Tests pass a fake, production passes the real implementation, and the use case never changes.', 'Сценарий зависит от интерфейса, который объявляет сам, адаптер этот интерфейс реализует, а связывание происходит в одной точке композиции. Тесты передают фейк, production — настоящую реализацию, сам сценарий не меняется.'), code: `const placeOrder = new PlaceOrder(new InMemoryOrderRepository(), systemClock);` },
    { id: 'arch-009', title: L('Feature-based structure', 'Структура по фичам'), question: L('How do you organize a codebase by feature?', 'Как организовать кодовую базу по фичам?'), answer: L('Group by business capability instead of by technical type: each feature folder holds its UI, use cases, domain objects and adapters. Everything that changes together stays in one place and the module boundary becomes visible in the tree.', 'Группируй по бизнес-возможности, а не по техническому типу: в папке фичи лежат её UI, сценарии, доменные объекты и адаптеры. Всё, что меняется вместе, остаётся рядом, и граница модуля видна прямо в дереве файлов.'), code: `src/features/\n  checkout/\n    ui/ use-cases/ domain/ infrastructure/ index.ts\n  catalog/\n    ui/ use-cases/ domain/ infrastructure/ index.ts` },
    { id: 'arch-010', title: L('Public API of a module', 'Публичный API модуля'), question: L('What is the public API of a module and why use barrels?', 'Что такое публичный API модуля и зачем нужны barrel-файлы?'), answer: L('A barrel (index.ts) re-exports the public surface of a module so consumers import from one place. The downside: a barrel that re-exports everything makes cycles and accidental dependencies easy and hides where a symbol really comes from.', 'Barrel (index.ts) переэкспортирует публичную поверхность модуля, чтобы потребители импортировали из одной точки. Минус: barrel, переэкспортирующий всё, упрощает циклы и случайные зависимости и скрывает, откуда на самом деле пришёл символ.'), code: `// features/checkout/index.ts\nexport { CheckoutPage } from './ui/CheckoutPage';\nexport { placeOrder } from './use-cases/placeOrder';\n// internal files are not exported` },
    { id: 'arch-011', title: L('Cycles and lint rules', 'Циклы и правила линтера'), question: L('How do you prevent import cycles between modules?', 'Как предотвратить циклы импортов между модулями?'), answer: L('Keep the public API narrow, keep the dependency graph acyclic and enforce both in CI. ESLint plugins such as import/no-cycle and eslint-plugin-boundaries check the rules automatically instead of relying on code review.', 'Держи публичный API узким, зависимости — ациклическими, а правило закрепи в CI. ESLint-плагины вроде import/no-cycle и eslint-plugin-boundaries проверяют это автоматически, а не на ревью.'), code: `// .eslintrc\n"import/no-cycle": "error",\n"boundaries/element-types": ["error", { "boundaries": ["module", "feature", "shared"] }]` },
    { id: 'arch-012', title: L('Shared vs feature code', 'Общий код против кода фичи'), question: L('When does code belong in a shared folder?', 'Когда код должен лежать в общей папке?'), answer: L('Only when it is used by two or more features and carries no business meaning of its own. The moment a shared helper learns about a specific feature, it belongs inside that feature.', 'Только когда он используется двумя и более фичами и не несёт собственного бизнес-смысла. Как только общий хелпер начинает знать про конкретную фичу, он переезжает внутрь неё.'), code: `src/shared/        // formatMoney, httpClient\nsrc/features/billing/ // everything that knows about invoices` },
    { id: 'arch-013', title: L('Monorepo vs polyrepo', 'Монорепозиторий против полирепозитория'), question: L('Monorepo or polyrepo: what are the trade-offs?', 'Монорепозиторий или полирепозиторий: в чём компромисс?'), answer: L('A monorepo makes cross-module changes and CI caching easy but needs careful tooling and ownership rules. A polyrepo gives strong team autonomy and independent releases but makes cross-repository changes and dependency versions harder.', 'Монорепозиторий упрощает кросс-модульные изменения и кэш CI, но требует аккуратных инструментов и правил владения. Полирепозиторий даёт автономию команд и независимые релизы, но усложняет кросс-репозиторные изменения и версии зависимостей.'), code: `// monorepo\npackages/\n  app/\n  feature-checkout/\n  feature-billing/\n  shared/` },
    { id: 'arch-014', title: L('Entity vs value object', 'Сущность против объекта-значения'), question: L('What is the difference between an entity and a value object?', 'Чем сущность отличается от объекта-значения?'), answer: L('An entity has identity: two orders with identical fields are still different orders and are compared by id. A value object has no identity and is compared by its values, so two Money(100, RUB) instances are equal.', 'У сущности есть идентичность: два заказа с одинаковыми полями — всё равно разные заказы, сравниваются по id. У объекта-значения идентичности нет, он сравнивается по значениям, поэтому два Money(100, RUB) равны.'), code: `const a = new Money(100, 'RUB');\nconst b = new Money(100, 'RUB');\na.equals(b);   // true - value object\norder1.equals(order2); // false - different identities` },
    { id: 'arch-015', title: L('Aggregates and invariants', 'Агрегаты и инварианты'), question: L('What is an aggregate root and why does it matter?', 'Что такое корень агрегата и зачем он нужен?'), answer: L('An aggregate is a set of objects that must change together; the aggregate root is the only member the outside world may reference and the only one that loads and saves the group. It keeps invariants in one place and defines the transaction boundary.', 'Агрегат — набор объектов, которые должны меняться вместе; корень агрегата — единственный, к которому обращаются снаружи, и он же грузит и сохраняет группу целиком. Он держит инварианты в одном месте и задаёт границу транзакции.'), code: `order.addLine(line);         // ok\norder.addLine(badLine);      // throws, the invariant is broken inside the aggregate` },
    { id: 'arch-016', title: L('Repository pattern', 'Паттерн репозиторий'), question: L('What is the repository pattern and what is it not?', 'Что такое паттерн репозиторий и чем он не является?'), answer: L('A repository is a collection-like abstraction over a store of aggregates: save, find, remove and domain-level queries. It is not a generic DAO that leaks SQL, and it does not manage transactions: the unit of work does that.', 'Репозиторий — абстракция уровня коллекции над хранилищем агрегатов: save, find, remove и запросы на языке домена. Это не generic DAO, протаскивающий SQL, и он не управляет транзакциями: этим занимается unit of work.'), code: `interface OrderRepository {\n  findById(id: OrderId): Promise<Order | null>;\n  save(order: Order): Promise<void>;\n}` },
    { id: 'arch-017', title: L('DTO vs domain model', 'DTO против доменной модели'), question: L('Why return a DTO from the API instead of the domain entity?', 'Почему из API возвращают DTO, а не доменную сущность?'), answer: L('A DTO decouples the public contract from the internal model: renaming a field in the domain does not break clients, and the response can be shaped for the consumer. The price is mapping code and the risk of the two shapes drifting apart.', 'DTO отвязывает публичный контракт от внутренней модели: переименование поля в домене не ломает клиентов, а ответ можно пристроить под потребителя. Цена — код маппинга и риск, что две формы разойдутся.'), code: `// domain\nclass Order { id: string; total: number; status: OrderStatus; }\n\n// api\ntype OrderDto = { id: string; amount: number; state: string };` },
    { id: 'arch-018', title: L('Domain events', 'Доменные события'), question: L('What is a domain event, and what is event storming?', 'Что такое доменное событие и что такое event storming?'), answer: L('A domain event records a fact that already happened in the domain and is named in the business language. Event storming is a collaborative workshop that maps the domain by walking through events, commands and rules on a board.', 'Доменное событие фиксирует факт, уже совершившийся в предметной области, и названо на языке бизнеса. Event storming — совместный воркшоп, который моделирует область через события, команды и правила на доске.'), code: `class OrderPlaced {\n  constructor(readonly orderId: string, readonly total: Money) {}\n}` },
    { id: 'arch-019', title: L('Bounded context', 'Ограниченный контекст'), question: L('What is a bounded context and what is an anti-corruption layer?', 'Что такое ограниченный контекст и что такое антикоррупционный слой?'), answer: L('A bounded context is an explicit boundary where a word has exactly one meaning, so Customer in billing and Customer in support are different models. An anti-corruption layer translates between an external model and yours so a legacy or third-party vocabulary does not leak inside.', 'Ограниченный контекст — явная граница, внутри которой слово имеет ровно один смысл, поэтому Customer в биллинге и Customer в поддержке — разные модели. Антикоррупционный слой переводит между внешней моделью и вашей, чтобы чужой словарь не протёк внутрь.'), code: `// anti-corruption layer: legacy partner API mapped to our domain\nfunction toOrder(remote: LegacyOrder): Order {\n  return Order.create(remote.lines.map(toLine), remote.createdAt);\n}` },
    { id: 'arch-020', title: L('CQRS', 'CQRS'), question: L('What is CQRS and when is it worth it?', 'Что такое CQRS и когда оно оправдано?'), answer: L('Command Query Responsibility Segregation splits the write model from the read model: commands change state and enforce invariants, queries return data shaped for the screen. It pays off when reads and writes differ a lot in shape or load, and it costs extra storage, synchronisation and two models to maintain.', 'CQRS разделяет модель записи и модель чтения: команды меняют состояние и следят за инвариантами, запросы возвращают данные под экран. Оправдано, когда чтение и запись сильно различаются по форме или нагрузке; цена — дополнительное хранилище, синхронизация и две модели в поддержке.'), code: `// command side\nawait handler.execute(command);\n// query side\nconst view = await readModel.getById(id);` },
    { id: 'arch-021', title: L('Event-driven architecture', 'Событийная архитектура'), question: L('What is event-driven architecture?', 'Что такое событийная архитектура?'), answer: L('Components communicate by publishing facts that others subscribe to, so the producer does not know its consumers. It decouples teams and absorbs traffic peaks, but it makes the flow of the system harder to follow and moves complexity into ordering, retries and consistency.', 'Компоненты общаются, публикуя факты, на которые подписываются другие, поэтому производитель не знает про потребителей. Это развязывает команды и сглаживает пики, но усложняет понимание потока и переносит сложность в порядок доставки, повторы и согласованность.'), code: `await publisher.publish(new OrderPlaced(orderId, total));` },
    { id: 'arch-022', title: L('CAP theorem', 'Теорема CAP'), question: L('What does the CAP theorem say in practice?', 'Что говорит теорема CAP на практике?'), answer: L('When the network partitions, a system must give up either strong consistency or availability. In practice you stay available and accept eventual consistency, because refusing requests during a partition loses money; the real work is making that trade-off explicit.', 'Когда сеть разделяется, системе приходится отказаться либо от строгой согласованности, либо от доступности. На практике выбирают доступность и принимают итоговую согласованность, потому что отказ обслуживать запросы во время разрыва стоит денег; настоящая работа — сделать этот компромисс явным.'), code: `// during a partition the orders service still accepts writes,\n// and the catalogue catches up later from the event log` },
    { id: 'arch-023', title: L('Transactional outbox', 'Транзакционный outbox'), question: L('How does the transactional outbox work?', 'Как работает транзакционный outbox?'), answer: L('The state change and the event are written in one database transaction, so they cannot diverge. A separate process reads the outbox table and publishes to the broker; duplicates are possible, so consumers must be idempotent.', 'Изменение состояния и событие пишутся одной транзакцией, поэтому разойтись они не могут. Отдельный процесс читает таблицу outbox и публикует в брокер; дубликаты возможны, поэтому потребители должны быть идемпотентными.'), code: `await db.transaction(async (t) => {\n  await t.query('INSERT INTO orders ...');\n  await t.query('INSERT INTO outbox ...');\n});` },
    { id: 'arch-024', title: L('Idempotency', 'Идемпотентность'), question: L('What does it mean for an operation to be idempotent?', 'Что значит, что операция идемпотентна?'), answer: L('Repeating it with the same input produces the same effect as running it once: no duplicate order, no double charge. In an HTTP API it is usually implemented with an Idempotency-Key header and a stored result of the first request.', 'Повтор с тем же входом даёт тот же эффект, что и один запуск: ни двойного заказа, ни двойного списания. В HTTP API это обычно реализуют заголовком Idempotency-Key и сохранением результата первого запроса.'), code: `const existing = await store.get(key);\nif (existing) return existing.response;` },
    { id: 'arch-025', title: L('Monolith vs microservices', 'Монолит против микросервисов'), question: L('What is the real difference between a monolith and microservices?', 'В чём настоящая разница между монолитом и микросервисами?'), answer: L('Not the size of the code but the process: in a monolith one team deploys one artifact and calls happen in-process; in microservices teams own services deployed independently, and every call is a network call that can fail, so operational and failure-handling costs move into the design.', 'Дело не в размере кода, а в процессе: в монолите одна команда деплоит один артефакт, а вызовы идут внутри процесса; в микросервисах команды владеют сервисами, которые деплоятся независимо, и каждый вызов — сетевой и может упасть, поэтому стоимость эксплуатации и обработки отказов переносится в архитектуру.'), code: `// monolith: a function call inside one transaction\n// microservices: an HTTP call, a separate transaction, a possible timeout` },
    { id: 'arch-026', title: L('Modular monolith', 'Модульный монолит'), question: L('What is a modular monolith?', 'Что такое модульный монолит?'), answer: L('One deployable unit whose internals are split into modules with enforced boundaries and one-way dependencies, each module owning its data. It keeps in-process calls and simple deployment while making a later extraction into a service possible.', 'Единица развёртывания, внутри которой код разделён на модули с явными границами и однонаправленными зависимостями, у каждого модуля свои данные. Сохраняются вызовы внутри процесса и простое развёртывание, но появляется возможность выделить модуль в сервис позже.'), code: `src/modules/{catalog,orders,billing}\n// billing calls orders through an interface, never through its tables` },
    { id: 'arch-027', title: L('Splitting a service', 'Когда выделять сервис'), question: L('What are the criteria for extracting a service?', 'По каким критериям выделяют сервис?'), answer: L('A business capability with its own rules and change rhythm, independent scaling, separate data ownership, and a team that can own it end to end. Line count, technology choice and personal preferences are not reasons.', 'Бизнес-возможность со своими правилами и темпом изменений, независимое масштабирование, собственное владение данными и команда, способная отвечать за сервис целиком. Количество строк, выбор технологии и личные предпочтения причинами не являются.'), code: `// a good reason\n"search has a different load profile and its own indexing pipeline"` },
    { id: 'arch-028', title: L('Communication and gateway', 'Коммуникация и шлюз'), question: L('Sync or async between services, and where does an API gateway fit?', 'Синхронно или асинхронно между сервисами и где место API-шлюза?'), answer: L('Use synchronous calls when the caller needs the answer to continue, and messages when the work can happen later or several consumers need the same fact. The gateway is the single public entry point for auth, routing, rate limits and aggregation, not a place for business rules.', 'Синхронный вызов — когда ответ нужен немедленно, сообщения — когда работа может подождать или один факт нужен нескольким потребителям. Шлюз — единая публичная точка входа для аутентификации, маршрутизации, лимитов и агрегации, но не для бизнес-правил.'), code: `// sync\nconst quote = await pricing.getQuote(cart);\n// async\nawait bus.publish('CartSubmitted', cartId);` },
    { id: 'arch-029', title: L('Database per service', 'База данных на сервис'), question: L('Why should each service own its data?', 'Почему каждый сервис должен владеть своими данными?'), answer: L('It makes the service autonomous: no other team can change its schema, and a change cannot break a consumer that reads the tables directly. The price is that cross-service questions need an API or events, and joins across services are gone.', 'Это делает сервис автономным: другая команда не может изменить его схему, и изменение не сломает потребителя, который читает таблицы напрямую. Цена — вопросы, пересекающие сервисы, решаются через API или события, а JOIN-ы между сервисами исчезают.'), code: `// forbidden\nSELECT * FROM orders JOIN inventory.items ...\n// allowed: an API or an event that carries the needed data` },
    { id: 'arch-030', title: L('Caching layers', 'Слои кэширования'), question: L('Where can you cache and what is the main risk?', 'Где можно кэшировать и в чём главный риск?'), answer: L('Cache in front of what it protects: a CDN in front of static files, Redis in front of the database, an in-process cache in front of a remote call. The risk is stale data and invalidation, especially when several writers change the same entry.', 'Кэшируют перед тем, что защищают: CDN перед статикой, Redis перед базой, процессный кэш перед удалённым вызовом. Риск — устаревшие данные и инвалидация, особенно когда запись меняют несколько писателей.'), code: `const cached = await redis.get(key);\nif (cached) return cached;\nconst fresh = await repo.load(id);\nawait redis.set(key, fresh, { EX: 60 });` },
    { id: 'arch-031', title: L('Queues and backpressure', 'Очереди и обратное давление'), question: L('What problem do queues solve and what is backpressure?', 'Какую проблему решают очереди и что такое обратное давление?'), answer: L('A queue decouples the producer from the consumer: bursts are absorbed and a slow consumer does not fail a fast one. Backpressure limits how much work is accepted when consumers cannot keep up, so the queue does not grow without bound.', 'Очередь отвязывает производителя от потребителя: всплески сглаживаются, и медленный потребитель не роняет быстрого. Обратное давление ограничивает принимаемый объём, когда потребители не справляются, чтобы очередь не росла без предела.'), code: `// producer\nawait queue.send('email', message, { maxAttempts: 5 });\n// consumer\nawait queue.consume('email', handle);` },
    { id: 'arch-032', title: L('Timeouts and retries', 'Таймауты и повторы'), question: L('How should timeouts and retries be set?', 'Как правильно настраивать таймауты и повторы?'), answer: L('Every call needs a timeout shorter than the budget of the caller, and retries need exponential backoff with jitter plus a cap on the number of attempts. Retrying a non-idempotent operation without a key duplicates the effect.', 'У каждого вызова должен быть таймаут короче собственного бюджета вызывающего, а повторы — экспоненциальная задержка с джиттером и ограничением числа попыток. Повтор неидемпотентной операции без ключа дублирует эффект.'), code: `await call(url, { timeout: 2000, retries: 3, backoff: 'exponential' });` },
    { id: 'arch-033', title: L('Circuit breaker', 'Предохранитель'), question: L('What does a circuit breaker do?', 'Что делает автоматический выключатель (circuit breaker)?'), answer: L('After repeated failures it opens and fails fast instead of waiting for a timeout on every request, then lets a few probe requests through to see whether the dependency recovered. A bulkhead does the same for resources: every dependency gets its own pool of threads or connections.', 'После серии отказов он размыкается и отвечает быстрым отказом, не тратя время на таймаут каждого запроса, затем пропускает несколько проб, чтобы проверить восстановление. Bulkhead делает то же для ресурсов: у каждой зависимости свой пул потоков или соединений.'), code: `if (breaker.isOpen()) throw new ServiceUnavailable();\ntry {\n  return await call();\n} catch (e) {\n  breaker.recordFailure();\n  throw e;\n}` },
    { id: 'arch-034', title: L('Observability', 'Наблюдаемость'), question: L('What are the three pillars of observability and what is each for?', 'Каковы три столпа наблюдаемости и для чего каждый нужен?'), answer: L('Logs explain a single event with context, metrics show trends and alert on thresholds, traces follow one request across services. You need all three: a metric tells you that something is broken, a log tells you what happened, a trace tells you where.', 'Логи объясняют отдельное событие с контекстом, метрики показывают тренды и срабатывают по порогам, трейсы ведут один запрос сквозь сервисы. Нужны все три: метрика скажет, что сломалось, лог — что именно, трейс — где именно.'), code: `logger.info('order.placed', { orderId, total, userId });\nmetrics.histogram('http.request.duration', ms);` },
    { id: 'arch-035', title: L('Configuration and flags', 'Конфигурация и флаги'), question: L('How should configuration and feature flags be handled?', 'Как обращаться с конфигурацией и feature-флагами?'), answer: L('Configuration comes from the environment, is validated at startup and read through one typed object instead of scattered process.env calls. A feature flag needs an owner, an expiry date and a cleanup plan, otherwise branching grows faster than the product.', 'Конфигурация приходит из окружения, валидируется на старте и читается через один типизированный объект, а не через россыпь process.env. У feature-флага должны быть владелец, срок жизни и план удаления, иначе ветвление растёт быстрее продукта.'), code: `const config = loadConfig(process.env); // fails fast on a missing variable` },
    { id: 'arch-036', title: L('Dependency injection', 'Внедрение зависимостей'), question: L('Do you need a DI container?', 'Нужен ли контейнер внедрения зависимостей?'), answer: L('Usually not. Plain constructor injection plus a composition root is enough and easier to read; a container pays off when there are many implementations, scopes or generated wiring. What matters is that dependencies are declared, not how the object is built.', 'Обычно нет. Обычная инъекция через конструктор плюс точка композиции достаточны и читаются лучше; контейнер окупается, когда реализаций много, нужны области видимости или автогенерация связей. Важно, что зависимости объявлены, а не как собран объект.'), code: `const app = new App({\n  placeOrder: new PlaceOrder(postgresOrders, systemClock),\n});` },
    { id: 'arch-037', title: L('Security boundaries', 'Границы безопасности'), question: L('Where do security checks belong?', 'Где должны находиться проверки безопасности?'), answer: L('Authentication at the edge, authorization in the application layer on every use case, and validation at the boundary. Trusting only the UI or only the gateway is a classic mistake: the gateway can be bypassed by an internal caller and the UI can be scripted.', 'Аутентификация — на периметре, авторизация — в слое приложения на каждом сценарии, валидация — на границе. Доверять только UI или только шлюзу — классическая ошибка: шлюз можно обойти внутренним вызовом, а UI легко заскриптовать.'), code: `// every use case checks the actor\nif (!actor.can('orders.cancel')) {\n  throw new Forbidden();\n}` },
    { id: 'arch-038', title: L('Latency budgets', 'Бюджеты задержки'), question: L('What is a latency budget?', 'Что такое бюджет задержки?'), answer: L('An agreed limit for each step of a request path. If the page must load in 300 ms and the API takes 150, the database gets 50 and the rest is slack. It turns performance from an endless debate into a number every change is checked against.', 'Согласованный лимит на каждый шаг пути запроса. Если страница должна грузиться за 300 мс, а API занимает 150, то на базу остаётся 50, а остальное — запас. Так производительность перестаёт быть бесконечным спором и становится числом, с которым сверяют каждое изменение.'), code: `const budget = { total: 300, api: 150, db: 50, client: 100 };` },
    { id: 'arch-039', title: L('Testing architecture', 'Тестирование архитектуры'), question: L('How do you test architecture?', 'Как тестировать архитектуру?'), answer: L('Test the domain with plain unit tests, the use cases with fakes for the ports, the adapters with integration tests against real infrastructure in containers, and the whole contract with a few end-to-end tests. Architecture rules are enforced by lint and dependency checks, not by unit tests.', 'Домен проверяют обычными юнит-тестами, сценарии — фейками портов, адаптеры — интеграционными тестами на реальной инфраструктуре в контейнерах, а контракт — несколькими e2e-тестами. Архитектурные правила проверяются линтером и тестами зависимостей, а не юнит-тестами.'), code: `it('a feature must not import another feature internals', () => {\n  expect(analyze(imports)).toEqual([]);\n});` },
    { id: 'arch-040', title: L('ADRs and technical debt', 'ADR и технический долг'), question: L('What is an ADR and how do you work with technical debt?', 'Что такое ADR и как работать с техническим долгом?'), answer: L('An ADR is a short document with the decision, its context and its consequences, kept next to the code. Debt is not whatever annoys you: it is a deliberate postponement with a known cost, so you track it and pay it back in small steps behind tests.', 'ADR — короткий документ с решением, его контекстом и последствиями, который живёт рядом с кодом. Долг — не то, что раздражает, а осознанно отложенная работа с известной ценой: её учитывают и погашают небольшими шагами за тестами.'), code: `// ADR 0007: publish domain events through the outbox\n// Status: accepted` },
  ],
  quiz: [
    {
      id: 'arch-q01',
      question: L(
        'Which dependency is allowed in a classic layered architecture?',
        'Какая зависимость допустима в классической слоистой архитектуре?'
      ),
      options: [
        L(
          'presentation calls application, application calls domain, and the domain depends on nothing external',
          'presentation вызывает application, application вызывает domain, а domain ни от чего внешнего не зависит'
        ),
        L('domain calls infrastructure, so entities can reuse ORM helpers', 'domain вызывает infrastructure, чтобы сущности переиспользовали помощники ORM'),
        L('infrastructure calls presentation, so controllers can call repositories directly', 'infrastructure вызывает presentation, чтобы контроллеры могли напрямую вызывать репозитории'),
        L('domain calls the UI layer, so entities can render themselves', 'domain вызывает слой UI, чтобы сущности умели рисовать себя'),
      ],
      correctIndex: 0,
      explanation: L(
        'Layers form a one-way street: an outer layer may call the inner one, the inner one must not know about the outer. Letting the domain import the ORM or the UI ties business rules to a framework and to a transport, so they can no longer be tested or reused on their own.',
        'Слои — это односторонняя улица: внешний слой может вызывать внутренний, а внутренний не должен знать про внешний. Если домен импортирует ORM или UI, бизнес-правила привязываются к фреймворку и транспорту, и их больше нельзя ни протестировать, ни переиспользовать отдельно.'
      ),
    },
    {
      id: 'arch-q02',
      question: L(
        'Where should a business rule that must behave the same in the web API and in a background job live?',
        'Где должно жить бизнес-правило, которое должно одинаково работать в веб-API и в фоновой задаче?'
      ),
      options: [
        L('In the HTTP controller, because it is the main entry point', 'В HTTP-контроллере, потому что это главная точка входа'),
        L('In the domain layer, because it does not depend on the transport', 'В доменном слое, потому что он не зависит от транспорта'),
        L('Only in the database, as a CHECK constraint', 'Только в базе данных, как ограничение CHECK'),
        L('In the client, to save a round trip', 'На клиенте, чтобы сэкономить один запрос'),
      ],
      correctIndex: 1,
      explanation: L(
        'The point of the domain layer is exactly this: one rule, one place, used by every entry point. A rule duplicated in a controller and in a worker will drift apart, and the only copy that survives is the one written where the business is.',
        'Именно ради этого и нужен доменный слой: одно правило в одном месте, используемое любой точкой входа. Правило, продублированное в контроллере и в воркере, разъедется, и выживет та копия, которая написана рядом с бизнесом.'
      ),
    },
    {
      id: 'arch-q03',
      question: L(
        'A controller validates the input, writes to the database and formats the JSON response. What is the problem?',
        'Контроллер проверяет входные данные, пишет в базу и формирует JSON-ответ. В чём проблема?'
      ),
      options: [
        L('Nothing, small controllers are good', 'Ничего, небольшие контроллеры — это хорошо'),
        L('The controller has to be a class, not a function', 'Контроллер должен быть классом, а не функцией'),
        L(
          'It is a fat controller: business logic and input-output are mixed, so the rule cannot be reused or tested without a database',
          'Это толстый контроллер: бизнес-логика и ввод-вывод смешаны, поэтому правило нельзя переиспользовать и протестировать без базы данных'
        ),
        L('The response should be built with a template engine', 'Ответ нужно собирать шаблонизатором'),
      ],
      correctIndex: 2,
      explanation: L(
        'A controller that talks to the database directly cannot be tested without that database, and its rules cannot be reused by a queue consumer or a CLI command. Moving the rule into a use case and the SQL into a repository adapter makes both parts cheap to test. The other options describe style preferences that do not affect the design.',
        'Контроллер, который ходит в базу напрямую, нельзя протестировать без этой базы, а его правила нельзя переиспользовать в потребителе очереди или в CLI-команде. Перенос правила в сценарий, а SQL — в адаптер репозитория делает обе части дешёвыми для тестов. Остальные варианты — вкусовщины, которые на архитектуру не влияют.'
      ),
    },
    {
      id: 'arch-q04',
      question: L(
        'Which rule of Clean Architecture is correct?',
        'Какое правило Clean Architecture сформулировано верно?'
      ),
      options: [
        L('The domain layer may import a framework as long as it does not call it directly', 'Доменный слой может импортировать фреймворк, если не вызывает его напрямую'),
        L('Every layer has to be a separate npm package', 'Каждый слой обязан быть отдельным npm-пакетом'),
        L('Use cases have to call the database through ORM model classes', 'Сценарии обязаны обращаться к базе через классы моделей ORM'),
        L(
          'Entities and use cases must not depend on frameworks, databases or UI, while the adapters depend on them',
          'Сущности и сценарии не должны зависеть от фреймворков, баз данных и UI, а адаптеры зависят от них'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The dependency rule of Clean Architecture says that the inner circle knows nothing about the outer circle; only the outer may depend on the inner. Importing a framework is already a dependency, even if the call is hidden, and a separate package per layer is a packaging decision, not the rule itself.',
        'Правило зависимостей Clean Architecture говорит: внутренний круг ничего не знает о внешнем, зависимость допустима только наружу. Импорт фреймворка — уже зависимость, даже если вызов спрятан, а отдельный пакет на слой — это решение по упаковке, а не само правило.'
      ),
    },
    {
      id: 'arch-q05',
      question: L(
        'What is a port in hexagonal architecture?',
        'Что такое порт в гексагональной архитектуре?'
      ),
      options: [
        L(
          'An interface defined by the inside of the application that describes what it needs from the outside',
          'Интерфейс, который объявляет внутренняя часть приложения и описывает, что ей нужно от внешнего мира'
        ),
        L('A TCP port number the service listens on', 'Номер TCP-порта, который слушает сервис'),
        L('A database table where events are stored', 'Таблица в базе данных, где хранятся события'),
        L('A screen the user navigates to', 'Экран, на который переходит пользователь'),
      ],
      correctIndex: 0,
      explanation: L(
        'A port is a contract owned by the application core: the repository interface or the payment interface that the core declares for itself. The adapter on the outside implements it. The word comes from the hexagonal picture, where the hexagon is the core and the sides are the ports. The other options are unrelated meanings of the same word.',
        'Порт — это контракт, принадлежащий ядру приложения: интерфейс репозитория или платёжного провайдера, который ядро объявляет само. Снаружи его реализует адаптер. Слово пришло из картинки шестиугольника, где шестиугольник — это ядро, а его стороны — порты. Остальные варианты — другие значения того же слова.'
      ),
    },
    {
      id: 'arch-q06',
      question: L(
        'Which pair is an example of adapters?',
        'Какая пара является примером адаптеров?'
      ),
      options: [
        L('A use case and an entity', 'Сценарий использования и сущность'),
        L('A value object and a domain event', 'Объект-значение и доменное событие'),
        L(
          'A Postgres repository and an Express controller that implement the ports of the application',
          'Репозиторий на Postgres и контроллер на Express, реализующие порты приложения'
        ),
        L('A monorepo workspace and a CI pipeline', 'Воркспейс монорепозитория и CI-пайплайн'),
      ],
      correctIndex: 2,
      explanation: L(
        'Adapters are the replaceable outside pieces that implement the ports declared inside: a SQL repository, a REST controller, a Kafka producer. The first two options are pure core concepts, and the last one is build infrastructure that has nothing to do with the runtime shape of the application.',
        'Адаптеры — это внешние сменяемые детали, реализующие объявленные внутри порты: репозиторий на SQL, REST-контроллер, продюсер в Kafka. Первые два варианта — понятия ядра, а последнее — инфраструктура сборки, которая никак не влияет на устройство приложения во время выполнения.'
      ),
    },
    {
      id: 'arch-q07',
      question: L(
        'What does the repository pattern give you?',
        'Что даёт паттерн репозиторий?'
      ),
      options: [
        L('A faster query plan for the database', 'Более быстрый план запросов в базе данных'),
        L(
          'A collection-like abstraction over persistence, so use cases do not know about SQL or the ORM',
          'Абстракцию уровня коллекции над хранилищем, чтобы сценарии не знали про SQL и ORM'
        ),
        L('Automatic transactions across several tables', 'Автоматические транзакции по нескольким таблицам'),
        L('A cache in front of the database', 'Кэш перед базой данных'),
      ],
      correctIndex: 1,
      explanation: L(
        'A repository turns a store of aggregates into a collection you can find, save and remove from, expressed in domain terms. It does not make queries faster, and transactions are the job of the unit of work. The trap is the "generic DAO" version, where the interface mirrors the table structure and leaks SQL through the abstraction.',
        'Репозиторий превращает хранилище агрегатов в коллекцию, из которой можно найти, сохранить и удалить, причём на языке домена. Он не ускоряет запросы, а транзакциями занимается unit of work. Ловушка — «generic DAO», где интерфейс повторяет структуру таблиц и протаскивает SQL через абстракцию.'
      ),
    },
    {
      id: 'arch-q08',
      question: L(
        'When is it right to return a DTO instead of the domain model from the API?',
        'Когда правильно возвращать из API DTO, а не доменную модель?'
      ),
      options: [
        L('Never, a DTO only adds boilerplate', 'Никогда, DTO — это только лишний код'),
        L('Only inside the data access layer', 'Только внутри слоя доступа к данным'),
        L('When the domain model is small and never changes', 'Когда доменная модель маленькая и никогда не меняется'),
        L(
          'When the public contract must differ from the domain model, or the model is shared with another context',
          'Когда публичный контракт должен отличаться от доменной модели или модель разделяется с другим контекстом'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'A DTO protects the contract from internal refactoring and lets the response be shaped for one consumer. The cost is explicit mapping code and the risk that the DTO and the model drift apart, which is why a small stable model can reasonably be returned directly. The first option is a common but lazy rule: DTOs are not boilerplate when the contract really differs.',
        'DTO защищает контракт от внутреннего рефакторинга и позволяет пристроить ответ под конкретного потребителя. Цена — явный код маппинга и риск расхождения DTO с моделью, поэтому маленькую стабильную модель вполне можно отдавать напрямую. Первый вариант — распространённое, но ленивое правило: DTO — не лишний код, когда контракт действительно отличается.'
      ),
    },
    {
      id: 'arch-q09',
      question: L(
        'What distinguishes a value object from an entity?',
        'Чем объект-значение отличается от сущности?'
      ),
      options: [
        L(
          'A value object has no identity and is compared by its values, an entity has identity and is compared by it',
          'У объекта-значения нет идентичности и он сравнивается по значениям, у сущности идентичность есть и сравнение идёт по ней'
        ),
        L('A value object is always immutable, an entity is always mutable', 'Объект-значение всегда неизменяем, а сущность всегда изменяема'),
        L('A value object may only contain primitive fields', 'Объект-значение может содержать только примитивные поля'),
        L('An entity cannot be stored in a database', 'Сущность нельзя сохранить в базе данных'),
      ],
      correctIndex: 0,
      explanation: L(
        'Identity is the whole difference. Two Money(100, RUB) values are interchangeable, so they are equal and interchangeable; two orders with the same fields are two different orders, so they are compared by id. Immutability is a common choice for value objects but not their definition, and both kinds are stored in databases all the time.',
        'Идентичность — это и есть вся разница. Два значения Money(100, RUB) взаимозаменяемы, значит, равны; два заказа с одинаковыми полями — это два разных заказа, значит, сравниваются по id. Неизменяемость — частый выбор для объектов-значений, но не их определение, и оба вида прекрасно хранятся в базах.'
      ),
    },
    {
      id: 'arch-q10',
      question: L(
        'What is an aggregate?',
        'Что такое агрегат?'
      ),
      options: [
        L('A table together with the index that speeds it up', 'Таблица вместе с индексом, который её ускоряет'),
        L(
          'A cluster of domain objects with a single entry point, the aggregate root, that enforces the invariants',
          'Группа доменных объектов с единственной точкой входа — корнем агрегата, который хранит инварианты'
        ),
        L('A set of microservices that are deployed together', 'Набор микросервисов, которые разворачиваются вместе'),
        L('A DTO that aggregates several API responses', 'DTO, который собирает несколько ответов API'),
      ],
      correctIndex: 1,
      explanation: L(
        'An aggregate is the consistency boundary of the domain: objects that must be valid together, reachable only through the root. Loading and saving the group, and the transaction that covers it, happen at the root, so the invariants cannot be broken by updating a child directly.',
        'Агрегат — это граница согласованности в домене: объекты, которые должны быть валидны вместе и доступны только через корень. Загрузка и сохранение группы, а также покрывающая их транзакция происходят в корне, поэтому инвариант нельзя сломать, изменив потомка напрямую.'
      ),
    },
    {
      id: 'arch-q11',
      question: L(
        'What is a domain event?',
        'Что такое доменное событие?'
      ),
      options: [
        L('A DOM event fired in the browser', 'Событие DOM, которое срабатывает в браузере'),
        L('A message that a queue delivers to another service', 'Сообщение, которое очередь доставляет другому сервису'),
        L(
          'A record of a fact that already happened in the domain, expressed in the language of the business',
          'Запись факта, уже совершившегося в предметной области, выраженная на языке бизнеса'
        ),
        L('An entry in the application log', 'Запись в логе приложения'),
      ],
      correctIndex: 2,
      explanation: L(
        'A domain event is written in past tense and in the business vocabulary: OrderPlaced, PaymentCaptured. It may be published to a broker or handled in-process, that is a separate concern. The trap is treating it as a generic message: an event named OrderUpdated carries no business meaning, and the listener cannot know what to do with it.',
        'Доменное событие пишется в прошедшем времени и на языке бизнеса: OrderPlaced, PaymentCaptured. Оно может уйти в брокер или обработаться внутри процесса — это отдельный вопрос. Ловушка — считать его просто сообщением: событие вида OrderUpdated не несёт бизнес-смысла, и подписчик не поймёт, что с ним делать.'
      ),
    },
    {
      id: 'arch-q12',
      question: L(
        'What is a bounded context?',
        'Что такое ограниченный контекст?'
      ),
      options: [
        L('A try/catch block that limits where an error can be thrown', 'Блок try/catch, ограничивающий, где может быть выброшена ошибка'),
        L('A database transaction that stays open for a fixed time', 'Транзакция базы данных, которая остаётся открытой фиксированное время'),
        L('The maximum number of services that may call each other', 'Максимальное число сервисов, которые могут вызывать друг друга'),
        L(
          'An explicit boundary inside which a model and its vocabulary have exactly one meaning',
          'Явная граница, внутри которой модель и её словарь имеют ровно один смысл'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'A bounded context is a semantic boundary: inside it, a word means one thing, and the model is consistent. The same word may mean something else in another context, and that is not a conflict but a modelling decision. The first option describes error handling, the second a transaction, and the third an arbitrary limit.',
        'Ограниченный контекст — это семантическая граница: внутри неё слово значит одно, и модель согласована. То же слово в другом контексте может значить другое, и это не конфликт, а решение моделирования. Первый вариант — про обработку ошибок, второй — про транзакцию, третий — про произвольный лимит.'
      ),
    },
    {
      id: 'arch-q13',
      question: L(
        'What does CQRS actually change in the system?',
        'Что CQRS меняет в системе на самом деле?'
      ),
      options: [
        L('It duplicates the domain model into two databases', 'Он дублирует доменную модель в две базы данных'),
        L(
          'It separates the write model, which enforces rules, from the read model, shaped for the screen',
          'Он разделяет модель записи, которая следит за правилами, и модель чтения, пристроенную под экран'
        ),
        L('It removes the need for transactions', 'Он убирает необходимость транзакций'),
        L('It replaces the database with an append-only event log', 'Он заменяет базу данных журналом только для добавления'),
      ],
      correctIndex: 1,
      explanation: L(
        'CQRS says that the model used to change state and the model used to read data may be different. That pays off when reads and writes differ in shape or load, and it costs synchronisation between the two models. It does not remove transactions, and an event-sourced log is a different, much heavier pattern.',
        'CQRS говорит, что модель для изменения состояния и модель для чтения могут быть разными. Это окупается, когда чтение и запись различаются по форме или нагрузке, и стоит синхронизации между моделями. Транзакции он не отменяет, а журнал только для добавления — это другая, намного более тяжёлая схема.'
      ),
    },
    {
      id: 'arch-q14',
      question: L(
        'What problem does CQRS solve best?',
        'Какую задачу CQRS решает лучше всего?'
      ),
      options: [
        L(
          'Reads and writes with very different shapes and load, where each side should scale independently',
          'Чтение и запись с очень разной формой и нагрузкой, где каждая сторона должна масштабироваться отдельно'
        ),
        L('The need to guarantee strong consistency across the system', 'Потребность в строгой согласованности по всей системе'),
        L('The need to remove the database entirely', 'Потребность вообще убрать базу данных'),
        L('The need to write less code than a plain layered design', 'Потребность написать меньше кода, чем в обычной слоистой архитектуре'),
      ],
      correctIndex: 0,
      explanation: L(
        'The classic CQRS case is a complex write model and a flat read model, for example an order with many rules and a denormalised order list on the home screen. Each side then scales and evolves on its own. CQRS makes consistency harder, not easier, and it adds code rather than removing it.',
        'Классический случай CQRS — сложная модель записи и плоская модель чтения: например, заказ с кучей правил и денормализованный список заказов на главном экране. Каждая сторона потом масштабируется и меняется отдельно. Согласованность CQRS не упрощает, а наоборот, и кода он добавляет, а не убирает.'
      ),
    },
    {
      id: 'arch-q15',
      question: L(
        'Which statement about the CAP theorem is correct?',
        'Какое утверждение о теореме CAP верно?'
      ),
      options: [
        L('You can have consistency, availability and partition tolerance at the same time', 'Согласованность, доступность и устойчивость к разрывам доступны одновременно'),
        L('You must choose between consistency and availability', 'Нужно выбрать между согласованностью и доступностью'),
        L('Partition tolerance can be switched off in the configuration', 'Устойчивость к разрывам можно отключить в конфигурации'),
        L(
          'When the network partitions a system gives up either consistency or availability, and in practice you keep availability and accept eventual consistency',
          'При разрыве сети система отказывается либо от согласованности, либо от доступности, и на практике выбирают доступность, принимая итоговую согласованность'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'CAP applies only while the network is partitioned: you cannot serve every request and keep every node consistent at the same time. Real systems are always partition tolerant, so the choice is between consistency and availability, and the common one is availability plus eventual consistency. The second option states the theorem but omits the condition under which it applies.',
        'CAP действует только пока сеть разделена: нельзя обслужить все запросы и одновременно держать все узлы согласованными. Реальные системы всегда устойчивы к разрывам, поэтому выбирают между согласованностью и доступностью, и обычно берут доступность с итоговой согласованностью. Второй вариант верно пересказывает теорему, но упускает условие, при котором она действует.'
      ),
    },
    {
      id: 'arch-q16',
      question: L(
        'How does the transactional outbox pattern work?',
        'Как работает паттерн транзакционный outbox?'
      ),
      options: [
        L('It stores events in a table and lets a poller publish them later', 'Он хранит события в таблице, а публикатор разбирает её позже'),
        L('It sends HTTP requests in parallel and joins the results', 'Он отправляет HTTP-запросы параллельно и объединяет результаты'),
        L(
          'It writes the state change and the event in one database transaction and publishes the event afterwards',
          'Он пишет изменение состояния и событие в одной транзакции, а событие публикует позже'
        ),
        L('It keeps failed messages in a dead-letter queue', 'Он держит неуспешные сообщения в очереди недоставленных'),
      ],
      correctIndex: 2,
      explanation: L(
        'Writing the state and the event in one transaction removes the classic dual-write problem: the order exists and the event exists, or neither. A separate process publishes the event, which means the event can be delivered twice, so consumers must be idempotent. The first option is close, but without the shared transaction the two writes can still diverge.',
        'Запись состояния и события в одной транзакции снимает классическую проблему двойной записи: заказ есть и событие есть, либо нет ни того, ни другого. Отдельный процесс публикует событие, поэтому доставка возможна дважды и потребители должны быть идемпотентными. Первый вариант близок, но без общей транзакции две записи всё равно могут разойтись.'
      ),
    },
    {
      id: 'arch-q17',
      question: L(
        'Why must a consumer of a message queue be idempotent?',
        'Почему потребитель очереди сообщений должен быть идемпотентным?'
      ),
      options: [
        L(
          'Because the same message can be delivered more than once and the effect must not be applied twice',
          'Потому что одно сообщение может быть доставлено несколько раз и эффект не должен применяться дважды'
        ),
        L('Because the queue deletes messages after the first read', 'Потому что очередь удаляет сообщения после первого чтения'),
        L('Because idempotency keys are forbidden in queues', 'Потому что ключи идемпотентности запрещены в очередях'),
        L('Because every retry duplicates the message', 'Потому что каждый повтор дублирует сообщение'),
      ],
      correctIndex: 0,
      explanation: L(
        'At-least-once delivery is the normal guarantee of most brokers: the message can arrive again after a consumer crash before the acknowledgement. Idempotency is what turns that into an effectively-once effect. The other options describe a queue that behaves nothing like the real ones.',
        'Доставка «хотя бы один раз» — обычная гарантия большинства брокеров: сообщение может прийти снова, если потребитель упал до подтверждения. Идемпотентность превращает это в эффект «ровно один раз». Остальные варианты описывают очередь, которая ведёт себя совсем не как настоящая.'
      ),
    },
    {
      id: 'arch-q18',
      question: L(
        'Which HTTP header is commonly used to make a request idempotent?',
        'Какой HTTP-заголовок обычно используют для идемпотентности запроса?'
      ),
      options: [
        L('Authorization', 'Authorization'),
        L('Idempotency-Key', 'Idempotency-Key'),
        L('X-Request-Cost', 'X-Request-Cost'),
        L('ETag', 'ETag'),
      ],
      correctIndex: 1,
      explanation: L(
        'The client generates a key, sends it with the request, and the server stores the key together with the response. A repeat of the same key returns the stored result instead of performing the operation again. ETag is about caching and Authorization is about identity, so both are traps here.',
        'Клиент генерирует ключ, отправляет его с запросом, а сервер сохраняет ключ вместе с ответом. Повтор с тем же ключом возвращает сохранённый результат вместо повторной операции. ETag — про кэширование, Authorization — про идентификацию, поэтому оба варианта здесь ловушки.'
      ),
    },
    {
      id: 'arch-q19',
      question: L(
        'When is a modular monolith a better choice than microservices?',
        'Когда модульный монолит лучше микросервисов?'
      ),
      options: [
        L('Never, microservices are the modern default', 'Никогда, микросервисы — это современный стандарт'),
        L('When the team has more than fifty developers', 'Когда в команде больше пятидесяти разработчиков'),
        L(
          'When the domain boundaries are clear but the team is small and the operational cost of distribution is not justified yet',
          'Когда границы домена понятны, но команда небольшая и операционная цена распределения пока не оправдана'
        ),
        L('When the product needs sub-second latency worldwide', 'Когда продукту нужна субсекундная задержка по всему миру'),
      ],
      correctIndex: 2,
      explanation: L(
        'A modular monolith gives you the boundaries and the testability without paying for network calls, distributed transactions and per-service operations. It is the usual first step, and services can be extracted later from a real seam. More developers is an argument for better modularity, not automatically for distribution.',
        'Модульный монолит даёт границы и тестируемость, не платя за сетевые вызовы, распределённые транзакции и эксплуатацию каждого сервиса отдельно. Обычно это первый шаг, а сервисы потом выделяются по настоящему шву. Больше разработчиков — аргумент за лучшую модульность, а не автоматически за распределение.'
      ),
    },
    {
      id: 'arch-q20',
      question: L(
        'What do you really lose when you split a monolith into microservices?',
        'Что вы реально теряете, разбивая монолит на микросервисы?'
      ),
      options: [
        L('Code duplication', 'Дублирование кода'),
        L('Type safety', 'Типобезопасность'),
        L('The size of the codebase', 'Размер кодовой базы'),
        L(
          'In-process calls and shared transactions: every boundary becomes a network call that can fail',
          'Вызовы внутри процесса и общие транзакции: каждая граница становится сетевым вызовом, который может упасть'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'That is the honest trade: in a monolith a function call either happens or throws inside the same transaction, in a distributed system the call can time out after the work was already done. Everything else on the list is usually easier in a monolith, but the real cost is operational and failure related.',
        'Вот честный размен: в монолите вызов функции либо случился, либо бросил исключение в той же транзакции; в распределённой системе вызов может истекти по таймауту уже после того, как работа сделана. Всё остальное из списка в монолите обычно проще, но настоящая цена — эксплуатационная и связанная с отказами.'
      ),
    },
    {
      id: 'arch-q21',
      question: L(
        'Which is a valid reason to extract a service?',
        'Какая причина является достаточным основанием для выделения сервиса?'
      ),
      options: [
        L(
          'The capability has its own rules and change rhythm, its own data, and must scale or deploy independently',
          'Возможность имеет свои правила и темп изменений, свои данные и должна масштабироваться или разворачиваться независимо'
        ),
        L('The module is longer than a thousand lines', 'Модуль длиннее тысячи строк'),
        L('A folder contains more than twenty files', 'В папке больше двадцати файлов'),
        L('The team wants to try a different framework', 'Команда хочет попробовать другой фреймворк'),
      ],
      correctIndex: 0,
      explanation: L(
        'A service boundary that follows the business is stable and pays for itself in independence: different rules, different data, different scaling, different release rhythm. Size is a symptom, not a reason, and technology preferences usually do not survive the first operational incident.',
        'Граница сервиса, которая следует за бизнесом, устойчива и окупается независимостью: свои правила, свои данные, своё масштабирование, свой темп релизов. Размер — это симптом, а не причина, а технологические предпочтения обычно не переживают первый же операционный инцидент.'
      ),
    },
    {
      id: 'arch-q22',
      question: L(
        'How should data be owned in a microservices architecture?',
        'Как распределено владение данными в микросервисной архитектуре?'
      ),
      options: [
        L('Every service reads and writes every table', 'Каждый сервис читает и пишет во все таблицы'),
        L('The service that writes the most owns the schema', 'Схемой владеет тот сервис, который пишет больше всех'),
        L(
          'Each service owns its data and others access it through an API or events, never directly',
          'Каждый сервис владеет своими данными, а другие обращаются к ним через API или события, но не напрямую'
        ),
        L('A shared schema in a separate database that everyone writes to', 'Общая схема в отдельной базе, в которую пишут все'),
      ],
      correctIndex: 2,
      explanation: L(
        'Owning the data means owning the schema, the migrations and the meaning of the fields. It is what makes a service independently deployable and stops one team from breaking another. The shared-schema option is a distributed monolith: everybody depends on everybody, but now over the network.',
        'Владение данными означает владение схемой, миграциями и смыслом полей. Именно это делает сервис независимо разворачиваемым и не даёт одной команде сломать другую. Вариант с общей схемой — это распределённый монолит: все зависят от всех, но уже поверх сети.'
      ),
    },
    {
      id: 'arch-q23',
      question: L(
        'What is the job of an API gateway?',
        'Какова роль API-шлюза?'
      ),
      options: [
        L('It stores session data for the services', 'Он хранит данные сессий для сервисов'),
        L(
          'It is the single public entry point that applies authentication, routing, rate limits and aggregation',
          'Он единая публичная точка входа, где применяются аутентификация, маршрутизация, лимиты и агрегация'
        ),
        L('It replaces the domain layer', 'Он заменяет доменный слой'),
        L('It guarantees transactional consistency', 'Он гарантирует транзакционную согласованность'),
      ],
      correctIndex: 1,
      explanation: L(
        'A gateway concentrates the concerns that are identical for every service: TLS termination, authentication, routing, rate limiting, request aggregation. It must stay thin: business rules that live in the gateway are duplicated logic that no team owns.',
        'Шлюз собирает то, что одинаково для всех сервисов: терминация TLS, аутентификация, маршрутизация, ограничение частоты, агрегация запросов. Он должен оставаться тонким: бизнес-правила в шлюзе — это продублированная логика, которой не владеет ни одна команда.'
      ),
    },
    {
      id: 'arch-q24',
      question: L(
        'A user registration triggers a welcome email that the user does not wait for. How should it be sent?',
        'Регистрация пользователя вызывает приветственное письмо, которого пользователь не ждёт. Как его отправлять?'
      ),
      options: [
        L('A synchronous HTTP call inside the registration request', 'Синхронным HTTP-вызовом внутри запроса регистрации'),
        L('A gRPC call inside the database transaction', 'gRPC-вызовом внутри транзакции базы данных'),
        L('A direct database write from the notification service', 'Прямой записью в базу из сервиса уведомлений'),
        L(
          'As a message through a queue, so the registration does not depend on the notification service',
          'Сообщением через очередь, чтобы регистрация не зависела от сервиса уведомлений'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The user does not need the answer, so the work can happen later and elsewhere. A queue absorbs the delay, isolates a failing mail provider from registration and lets the notification service scale on its own. A synchronous call inside the request couples the latency and the availability of two systems for no benefit.',
        'Ответ пользователю не нужен, значит, работа может выполниться позже и в другом месте. Очередь поглощает задержку, изолирует падение почтового провайдера от регистрации и позволяет масштабировать сервис уведомлений отдельно. Синхронный вызов внутри запроса связывает задержку и доступность двух систем без выгоды.'
      ),
    },
    {
      id: 'arch-q25',
      question: L(
        'Where does a cache belong in a typical request path?',
        'Где в типичном пути запроса должен находиться кэш?'
      ),
      options: [
        L(
          'In front of what it protects: a CDN in front of static files, Redis in front of the database',
          'Перед тем, что он защищает: CDN перед статикой, Redis перед базой данных'
        ),
        L('Only in the browser', 'Только в браузере'),
        L('Inside the domain layer, next to the entities', 'В доменном слое, рядом с сущностями'),
        L('In place of the database', 'Вместо базы данных'),
      ],
      correctIndex: 0,
      explanation: L(
        'A cache is a copy in front of a slower or more expensive system, so it belongs exactly where it saves the most: static files behind a CDN, hot rows behind Redis, a slow remote call behind an in-process cache. Putting it in the domain layer is the interesting mistake: the domain then has to know about invalidation and staleness.',
        'Кэш — это копия перед более медленной или дорогой системой, поэтому он стоит там, где экономит больше всего: статика за CDN, горячие строки за Redis, медленный удалённый вызов за процессным кэшем. Кэш в доменном слое — характерная ошибка: домену приходится знать про инвалидацию и устаревание.'
      ),
    },
    {
      id: 'arch-q26',
      question: L(
        'What is the main risk of caching?',
        'В чём главный риск кэширования?'
      ),
      options: [
        L('The data is always stale', 'Данные всегда устаревшие'),
        L(
          'Stale data and invalidation complexity, especially when several writers change the same entry',
          'Устаревшие данные и сложность инвалидации, особенно когда запись меняют несколько писателей'
        ),
        L('The database becomes slower', 'База данных становится медленнее'),
        L('It costs too much memory', 'Это слишком дорого по памяти'),
      ],
      correctIndex: 1,
      explanation: L(
        'A cache is a copy, so it can be out of date, and someone must decide when to update or drop it. The hard case is multiple writers: the writer that changes the data may not even know a cache exists. The first option is too absolute: with a short TTL and a controlled invalidation the data is fresh most of the time.',
        'Кэш — это копия, поэтому он может устареть, и кто-то должен решить, когда его обновить или сбросить. Сложный случай — несколько писателей: изменивший данные может даже не знать, что кэш существует. Первый вариант слишком категоричен: с коротким TTL и контролируемой инвалидацией данные свежи почти всегда.'
      ),
    },
    {
      id: 'arch-q27',
      question: L(
        'What is backpressure?',
        'Что такое обратное давление?'
      ),
      options: [
        L('The CPU load produced by a queue', 'Нагрузка на CPU, создаваемая очередью'),
        L('The pressure a queue puts on the database', 'Давление, которое очередь оказывает на базу данных'),
        L(
          'A mechanism that slows producers down when consumers cannot keep up, so queues do not grow without bound',
          'Механизм, замедляющий производителей, когда потребители не справляются, чтобы очередь не росла без предела'
        ),
        L('The number of retries before a message is dropped', 'Число повторов до отбрасывания сообщения'),
      ],
      correctIndex: 2,
      explanation: L(
        'Without backpressure a fast producer fills the queue until memory runs out or the latency becomes useless, and the work is lost anyway. Blocking the producer, limiting the queue depth or rejecting new work pushes the limit back to the caller, where it can be handled. The other options describe metrics, not a mechanism.',
        'Без обратного давления быстрый производитель забьёт очередь до нехватки памяти или бессмысленной задержки, и работа всё равно пропадёт. Блокировка производителя, ограничение глубины очереди или отказ новой работы возвращают предел вызывающему, где с ним можно разобраться. Остальные варианты — метрики, а не механизм.'
      ),
    },
    {
      id: 'arch-q28',
      question: L(
        'What is a dead-letter queue for?',
        'Для чего нужна очередь недоставленных сообщений (DLQ)?'
      ),
      options: [
        L('Storing messages that must be delivered exactly once', 'Хранения сообщений, которые должны быть доставлены ровно один раз'),
        L('Prioritising urgent messages', 'Приоритизации срочных сообщений'),
        L('Encrypting message payloads', 'Шифрования полезной нагрузки сообщений'),
        L('Storing messages that could not be processed, so they can be inspected and replayed', 'Хранения сообщений, которые не удалось обработать, чтобы их можно было изучить и повторить'),
      ],
      correctIndex: 3,
      explanation: L(
        'A dead-letter queue keeps the messages that exhausted their retries, so they are not lost silently and a human or a tool can look at them, fix the cause and replay. Without it, failures disappear together with the queue, and the data is lost.',
        'Dead-letter очередь хранит сообщения, которые исчерпали попытки, чтобы они не исчезали молча и человек или инструмент мог их изучить, устранить причину и переотправить. Без неё сбои пропадают вместе с очередью, а вместе с ними и данные.'
      ),
    },
    {
      id: 'arch-q29',
      question: L(
        'Why must every network call have a timeout?',
        'Почему у каждого сетевого вызова должен быть таймаут?'
      ),
      options: [
        L(
          'Without one a slow dependency blocks the caller until the connection breaks, and the failure spreads',
          'Без него медленная зависимость блокирует вызывающего до обрыва соединения, и сбой распространяется'
        ),
        L('Because HTTP has no default timeout', 'Потому что у HTTP нет таймаута по умолчанию'),
        L('To make the request faster', 'Чтобы запрос выполнялся быстрее'),
        L('Because servers reject requests without a timeout header', 'Потому что серверы отклоняют запросы без заголовка таймаута'),
      ],
      correctIndex: 0,
      explanation: L(
        'A TCP connection can stay open for minutes while the peer is stuck. Without a timeout the caller holds its own resources, including threads or connections, and one slow dependency can exhaust the whole pool and take the service down. The other options are wrong: HTTP has no default timeout, and a timeout header is not a standard requirement.',
        'TCP-соединение может висеть минутами, пока собеседник завис. Без таймаута вызывающий держит свои ресурсы, включая потоки и соединения, и одна медленная зависимость исчерпывает пул и роняет сервис. Остальные варианты неверны: у HTTP нет таймаута по умолчанию, и заголовок таймаута не является стандартным требованием.'
      ),
    },
    {
      id: 'arch-q30',
      question: L(
        'What does exponential backoff with jitter achieve?',
        'Что даёт экспоненциальная задержка с джиттером?'
      ),
      options: [
        L('It reduces the number of retries to one', 'Она сокращает число повторов до одного'),
        L('It retries immediately at full speed', 'Она повторяет сразу и на полной скорости'),
        L(
          'It waits longer between retries and randomises the wait, so clients do not hammer a recovering dependency in sync',
          'Она ждёт дольше между повторами и рандомизирует паузу, чтобы клиенты не били по восстанавливающейся зависимости синхронно'
        ),
        L('It moves failed requests to another region', 'Она переносит неуспешные запросы в другой регион'),
      ],
      correctIndex: 2,
      explanation: L(
        'When a dependency is down, every client retries at the same moment and hammers it exactly when it is trying to recover. Growing the delay lets it breathe, and the random component breaks the synchronisation between clients. Retrying immediately at full speed is the opposite of what a recovering service needs.',
        'Когда зависимость лежит, все клиенты повторяют одновременно и бьют по ней ровно тогда, когда она пытается восстановиться. Растущая пауза даёт ей передохнуть, а случайная составляющая разбивает синхронность клиентов. Мгновенный повтор на полной скорости — противоположность того, что нужно восстанавливающемуся сервису.'
      ),
    },
    {
      id: 'arch-q31',
      question: L(
        'What does a circuit breaker do?',
        'Что делает circuit breaker?'
      ),
      options: [
        L('It blocks requests that are too large', 'Он блокирует слишком большие запросы'),
        L(
          'After repeated failures it stops sending requests and fails fast, then lets a few probe requests through to check recovery',
          'После серии отказов он перестаёт отправлять запросы и отвечает быстрым отказом, затем пропускает несколько проб для проверки восстановления'
        ),
        L('It duplicates the request to a second server', 'Он дублирует запрос на второй сервер'),
        L('It caches the successful response', 'Он кэширует успешный ответ'),
      ],
      correctIndex: 1,
      explanation: L(
        'A circuit breaker saves the caller time and the failing dependency load: while it is open, calls fail immediately instead of waiting for a timeout. In the half-open state a few requests are let through, and if they succeed the breaker closes again. The other options describe different tools with different purposes.',
        'Предохранитель экономит время вызывающего и снимает нагрузку с падающей зависимости: пока он разомкнут, вызовы падают сразу, а не ждут таймаута. В полуразомкнутом состоянии пропускается несколько запросов, и если они успешны, цепь замыкается. Остальные варианты — другие инструменты с другими задачами.'
      ),
    },
    {
      id: 'arch-q32',
      question: L(
        'What is the difference between a metric and a log?',
        'Чем метрика отличается от лога?'
      ),
      options: [
        L(
          'A metric is a numeric aggregate over time, a log is a discrete event with context',
          'Метрика — числовая агрегация во времени, лог — отдельное событие с контекстом'
        ),
        L('A metric is text, a log is a number', 'Метрика — это текст, лог — это число'),
        L('They are the same thing in different formats', 'Это одно и то же в разных форматах'),
        L('Metrics are for infrastructure, logs are for the application', 'Метрики — для инфраструктуры, логи — для приложения'),
      ],
      correctIndex: 0,
      explanation: L(
        'Metrics answer "how often and how bad": request rate, error rate, latency histogram, queue depth. Logs answer "what exactly happened to this one request". The third option is tempting, but a metric loses all individual context, which is why a dashboard alone can never explain a specific failure.',
        'Метрики отвечают на вопрос «как часто и насколько плохо»: частота запросов, доля ошибок, гистограмма задержек, глубина очереди. Логи отвечают на вопрос «что именно произошло с этим конкретным запросом». Третий вариант соблазнителен, но метрика теряет индивидуальный контекст, поэтому дашборд сам по себе не объяснит конкретный сбой.'
      ),
    },
    {
      id: 'arch-q33',
      question: L(
        'Why do you need distributed traces?',
        'Зачем нужны распределённые трассировки?'
      ),
      options: [
        L('They replace logs', 'Они заменяют логи'),
        L('They make the code faster', 'Они делают код быстрее'),
        L('They are required by the framework', 'Их требует фреймворк'),
        L(
          'They join the work of several services into one timeline, which is the only way to see where a slow request spent its time',
          'Они собирают работу нескольких сервисов в одну временную линию — единственный способ увидеть, где медленный запрос потратил время'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'When a request crosses five services, the per-service logs give five separate stories and no order. A trace carries one identifier through the whole path and shows the total time and the time of each span, which is exactly what you need to find the slow part. Traces do not replace logs, and they certainly do not make code faster.',
        'Когда запрос проходит через пять сервисов, логи дают пять отдельных историй без общего порядка. Трейс несёт один идентификатор через весь путь и показывает общее время и время каждого спана — ровно то, что нужно, чтобы найти медленное место. Трейсы не заменяют логи и уж точно не ускоряют код.'
      ),
    },
    {
      id: 'arch-q34',
      question: L(
        'Which value must never be baked into the build?',
        'Какое значение нельзя зашивать в сборку?'
      ),
      options: [
        L('The port the application listens on', 'Порт, который слушает приложение'),
        L(
          'Secrets such as database passwords and API keys, which belong in environment variables or a secret manager',
          'Секреты вроде паролей базы данных и API-ключей, которым место в переменных окружения или в менеджере секретов'
        ),
        L('The name of a feature flag', 'Имя feature-флага'),
        L('The default page size', 'Размер страницы по умолчанию'),
      ],
      correctIndex: 1,
      explanation: L(
        'Anything secret in the artifact leaks to everyone who can read the image, the repository or the CI cache, and rotating it means rebuilding everything. Non-secret values may be baked in, but even those are usually better taken from the environment so the same artifact runs in every environment.',
        'Любой секрет в артефакте попадает ко всем, кто может прочитать образ, репозиторий или кэш CI, а его ротация означает пересборку всего. Несекретные значения зашивать можно, но даже их обычно берут из окружения, чтобы один и тот же артефакт работал во всех окружениях.'
      ),
    },
    {
      id: 'arch-q35',
      question: L(
        'What is the danger of a feature flag without an expiry date?',
        'В чём опасность feature-флага без срока жизни?'
      ),
      options: [
        L('Flags slow the code down', 'Флаги замедляют код'),
        L('Flags break the type checker', 'Флаги ломают проверку типов'),
        L(
          'Old flags accumulate, the code becomes a maze of branches and nobody dares to remove them',
          'Старые флаги накапливаются, код превращается в лабиринт ветвлений, и никто не решается их удалять'
        ),
        L('Flags cannot be tested', 'Флаги нельзя протестировать'),
      ],
      correctIndex: 2,
      explanation: L(
        'A flag is a temporary mechanism, and without an owner and a date the temporary branch lives forever: every combination of flags has to be tested, and nobody can remove one because they do not know who relies on it. The classic rule is a date in the flag name or a ticket that removes it.',
        'Флаг — это временный механизм, и без владельца и даты временное ветвление живёт вечно: каждую комбинацию флагов надо тестировать, и никто не может удалить флаг, потому что не знает, кто на него рассчитывает. Классическое правило — дата в имени флага или тикет на его удаление.'
      ),
    },
    {
      id: 'arch-q36',
      question: L(
        'What is the real point of dependency injection?',
        'В чём настоящий смысл внедрения зависимостей?'
      ),
      options: [
        L(
          'The consumer declares what it needs and the composition root supplies the implementation, so the core can be tested without real infrastructure',
          'Потребитель объявляет, что ему нужно, а точка композиции поставляет реализацию, и ядро можно тестировать без реальной инфраструктуры'
        ),
        L('It removes the need for interfaces', 'Оно убирает необходимость в интерфейсах'),
        L('It makes the code run faster', 'Оно заставляет код работать быстрее'),
        L('It hides which dependencies exist', 'Оно скрывает, какие зависимости есть'),
      ],
      correctIndex: 0,
      explanation: L(
        'The value is substitutability: in a test you pass a fake repository, in production the SQL one, and the use case never changes. A container is only a way of building that graph, and many teams are better off with plain constructor injection and one composition root.',
        'Ценность — в подменяемости: в тесте передаётся фейк репозитория, в production — SQL-реализация, а сценарий не меняется. Контейнер — лишь способ собрать этот граф, и многим командам достаточно обычной инъекции через конструктор и одной точки композиции.'
      ),
    },
    {
      id: 'arch-q37',
      question: L(
        'Where should authorization checks live?',
        'Где должны находиться проверки авторизации?'
      ),
      options: [
        L('Only in the UI, so the interface hides what the user cannot do', 'Только в UI, чтобы интерфейс скрывал недоступное пользователю'),
        L(
          'In the application layer, on every use case; the check in the UI is only usability',
          'В слое приложения, на каждом сценарии; проверка в UI — это только удобство'
        ),
        L('Only in the database, as row-level security', 'Только в базе данных, как row-level security'),
        L('Only in the API gateway, once for the whole service', 'Только в API-шлюзе, один раз на весь сервис'),
      ],
      correctIndex: 1,
      explanation: L(
        'The UI can be scripted and the gateway can be bypassed by an internal caller, so the check that protects data has to sit in the use case, next to the operation it guards. The gateway and the UI checks are still useful, but they are layers of convenience on top of the real check.',
        'UI можно заскриптовать, а шлюз можно обойти внутренним вызовом, поэтому проверка, защищающая данные, должна жить в сценарии, рядом с операцией, которую она охраняет. Проверки в шлюзе и в UI полезны, но это удобство поверх настоящей проверки.'
      ),
    },
    {
      id: 'arch-q38',
      question: L(
        'What is a latency budget?',
        'Что такое бюджет задержки?'
      ),
      options: [
        L('A list of SLA penalties', 'Список штрафов по SLA'),
        L('The maximum size of a log line', 'Максимальный размер строки лога'),
        L('The time the CDN needs to serve a file', 'Время, за которое CDN отдаёт файл'),
        L(
          'An agreed limit for each step of a request path, so no single part can consume the whole allowance',
          'Согласованный лимит на каждый шаг пути запроса, чтобы одна часть не съела весь лимит'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'A budget splits the user-visible time between the steps: network, API, database, rendering. When the API takes 150 ms of a 300 ms budget, the database has 50 ms and the rest is slack, and any change is reviewed against those numbers instead of "it feels slow". The other options are unrelated meanings.',
        'Бюджет делит видимое пользователю время между шагами: сеть, API, база, отрисовка. Если API занимает 150 мс из бюджета в 300 мс, то на базу остаётся 50 мс, а остальное — запас, и любое изменение сверяется с этими числами, а не с ощущением «медленно». Остальные варианты — посторонние значения.'
      ),
    },
    {
      id: 'arch-q39',
      question: L(
        'What is an architecture test?',
        'Что такое архитектурный тест?'
      ),
      options: [
        L('A test that measures how fast the code runs', 'Тест, который измеряет, насколько быстро работает код'),
        L('A test of the deployment pipeline', 'Тест деплой-пайплайна'),
        L(
          'An automated check of a structural rule, for example that a feature module does not import another feature internals',
          'Автоматическая проверка структурного правила, например что модуль фичи не импортирует внутренности другой фичи'
        ),
        L('A load test run against production', 'Нагрузочный тест, запущенный против production'),
      ],
      correctIndex: 2,
      explanation: L(
        'Architecture rules are constraints on the shape of the code, and they are checked by tooling: a dependency test, a lint rule, a module boundary test in CI. That way a boundary cannot rot silently while the team is busy, and the rule is documented by the test that enforces it.',
        'Архитектурные правила — это ограничения на форму кода, и их проверяют инструменты: тест зависимостей, правило линтера, проверка границ модулей в CI. Тогда граница не может тихо размыться, пока команда занята, а правило документируется тестом, который это правило проверяет.'
      ),
    },
    {
      id: 'arch-q40',
      question: L(
        'What is an ADR?',
        'Что такое ADR?'
      ),
      options: [
        L(
          'A short document that records a decision, its context and its consequences, so the reason survives the people who made it',
          'Короткий документ, фиксирующий решение, его контекст и последствия, чтобы причина пережила авторов'
        ),
        L('A performance report', 'Отчёт о производительности'),
        L('A test plan', 'План тестирования'),
        L('A deployment checklist', 'Чек-лист для развёртывания'),
      ],
      correctIndex: 0,
      explanation: L(
        'An architecture decision record captures the options, the choice and the consequences at a point in time. Its value is historical: six months later somebody asks why the queue is there, and the ADR answers instead of the team guessing. A single page per decision is enough.',
        'ADR фиксирует варианты, выбор и последствия на момент принятия решения. Его ценность историческая: через полгода кто-то спрашивает, зачем здесь очередь, и ADR отвечает, а команда не гадает. Достаточно одной страницы на решение.'
      ),
    },
  ],
};
