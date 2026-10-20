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
  chapters: [
    {
      id: 'architecture-ch1',
      title: L('Layers and dependency direction', 'Слои и направление зависимостей'),
      summary: L(
        'How to split a codebase into layers, what the dependency rule means in practice, and why the order of the layers matters.',
        'Как разбить кодовую базу на слои, что означает правило зависимостей на практике и почему порядок слоёв важен.'
      ),
      sections: [
        {
          id: 'architecture-ch1-s1',
          title: L('What a layer is', 'Что такое слой'),
          body: L(
            'A layer is a horizontal band of code, grouped by technical responsibility rather than by business meaning. The classic set has four parts. The presentation layer handles transport: parsing a request, checking the shape of the input, rendering a response. The application layer holds use cases, each of them one business operation that orchestrates the domain and the outside world. The domain layer contains entities, value objects, invariants and business rules. The infrastructure layer contains the concrete adapters: database repositories, HTTP clients, queue producers, mailers, clocks.\n\nLayers are useful because they make the technical dependencies visible. When the domain lives in its own directory and the rule says it may not import from the others, an accidental dependency on the ORM shows up during review or in a lint rule, instead of surfacing six months later on the day somebody tries to replace the ORM.\n\nA layer is only a name unless something enforces it. A directory called /domain that freely imports the ORM is not a layer, it is a suggestion. Real enforcement comes from module boundaries checked in CI, from the dependency rule written into the review checklist, and from the fact that the domain code is written so that the outer layers depend on it and not the other way around.',
            'Слой — это горизонтальная полоса кода, сгруппированная по технической ответственности, а не по бизнес-смыслу. Классический набор состоит из четырёх частей. Слой представления отвечает за транспорт: разбор запроса, проверку формы входных данных, формирование ответа. Слой приложения содержит сценарии использования — по одному на бизнес-операцию, координирующую домен и внешний мир. Доменный слой содержит сущности, объекты-значения, инварианты и бизнес-правила. Инфраструктурный слой содержит конкретные адаптеры: репозитории, HTTP-клиенты, продюсеры очередей, почту, часы.\n\nСлои полезны тем, что делают технические зависимости видимыми. Когда домен живёт в отдельной папке и правило запрещает ему импортировать остальные, случайная зависимость от ORM видна на ревью или в правиле линтера, а не всплывает через полгода в день, когда кто-то захочет заменить ORM.\n\nСлой — это имя, пока его никто не проверяет. Папка /domain, которая свободно импортирует ORM, — не слой, а пожелание. Настоящая проверка приходит из границ модулей, которые прогоняются в CI, из правила зависимостей в чек-листе ревью и из самого кода, написанного так, что внешние слои зависят от внутренних, а не наоборот.'
          ),
          bullets: [
            L('A layer groups code by technical role, a module groups code by business meaning.', 'Слой группирует код по технической роли, модуль — по бизнес-смыслу.'),
            L('The classic layers are presentation, application, domain and infrastructure.', 'Классические слои: presentation, application, domain, infrastructure.'),
            L('A layer that is only a directory name enforces nothing.', 'Слой, который существует только как имя папки, ничего по-настоящему не ограничивает.'),
            L('The domain is the layer that changes when the business changes.', 'Домен — это слой, которое меняется, когда меняется бизнес.'),
          ],
          code: `src/
  domain/         // entities, value objects, rules
  application/    // use cases, ports
  infrastructure/ // postgres, http, kafka
  presentation/   // http controllers, cli, ui`,
          takeaway: L(
            'A layer is a technical band of the code, and it only means something if the direction of its dependencies is enforced.',
            'Слой — это техническая полоса кода, и смысл он несёт только тогда, когда направление зависимостей реально контролируется.'
          ),
        },
        {
          id: 'architecture-ch1-s2',
          title: L('Two axes of organisation', 'Две оси организации'),
          body: L(
            'A real codebase needs two axes at once. The technical axis answers the question "where does this code live according to its role": controllers, services, repositories, models. The business axis answers "which capability does this code serve": checkout, billing, catalog, notifications. Choosing one axis is a common early mistake, because it always starts to feel tidy and then becomes expensive.\n\nA repository organised purely by type has /controllers, /services and /models at the top level. Everything about one feature is spread across three trees, so a single change touches a dozen files in unrelated folders, the reviewer has to hold the whole feature in their head, and a newcomer cannot find the code of a capability without a map. A repository organised purely by business means features are scattered horizontally, and the shared technical infrastructure, the HTTP client and the logger, ends up duplicated in every feature.\n\nThe pragmatic answer is to organise by feature and keep the layers inside each feature. The checkout folder contains its own UI, its own use cases, its own domain objects and its own adapters, and shared infrastructure lives in one place outside the features. Inside the feature the layering rules still apply, so the dependency direction stays visible, but now the unit you navigate by is the thing the business changes.',
            'Реальной кодовой базе нужны две оси сразу. Техническая отвечает на вопрос «где живёт этот код по своей роли»: контроллеры, сервисы, репозитории, модели. Бизнес-ось отвечает на вопрос «какой возможности служит этот код»: checkout, billing, catalog, notifications. Выбрать только одну ось — распространённая ранняя ошибка: сначала всё выглядит опрятно, а потом дорого обходится.\n\nРепозиторий, организованный только по типам, имеет наверху /controllers, /services и /models. Всё про одну фичу размазано по трём деревьям, поэтому одно изменение трогает десяток файлов в несвязанных папках, ревьюеру приходится держать в голове всю фичу, а новичок не может найти код возможности без карты. Репозиторий, организованный только по бизнесу, размазывает фичи по горизонтали, а общая техническая инфраструктура — HTTP-клиент и логгер — продублируется в каждой фиче.\n\nПрактичный ответ: организовывать по фичам, а слои держать внутри фичи. Папка checkout содержит свои UI, свои сценарии, свои доменные объекты и свои адаптеры, а общая инфраструктура лежит в одном месте вне фич. Внутри фичи правила слоёв по-прежнему работают, поэтому направление зависимостей видно, но теперь единица навигации — то, что меняет бизнес.'
          ),
          bullets: [
            L('Organising only by type scatters a feature across many folders.', 'Организация только по типам размазывает фичу по множеству папок.'),
            L('Organising only by business duplicates the shared infrastructure.', 'Организация только по бизнесу дублирует общую инфраструктуру.'),
            L('Feature folders keep the technical layers as a second axis inside.', 'Папки фич сохраняют технические слои как вторую ось внутри.'),
            L('A good test: delete the feature and see how much unrelated code breaks.', 'Хороший тест: удалите фичу и посмотрите, сколько постороннего кода сломается.'),
          ],
          code: `src/
  features/
    checkout/     // ui, use-cases, domain, infrastructure
    billing/      // ui, use-cases, domain, infrastructure
  shared/         // http client, logger, money helpers
  app/            // composition root, routing`,
          takeaway: L(
            'Organise by feature and keep the layers inside the feature, then the two axes stop fighting each other.',
            'Организуй по фичам и держи слои внутри фичи — тогда две оси перестают мешать друг другу.'
          ),
        },
        {
          id: 'architecture-ch1-s3',
          title: L('Why dependencies point inward', 'Почему зависимости смотрят внутрь'),
          body: L(
            'The dependency rule is the single most useful constraint in layered architecture: an outer layer may call the inner one, the inner one must not know about the outer. The domain does not import the HTTP framework, the ORM or the UI. The reason is not aesthetic, it is about what you can change independently. If the domain depends on the ORM, replacing the ORM becomes a rewrite of the business rules; if the domain depends on nothing external, it can be reused from a REST API, a CLI command and a queue consumer without a single change.\n\nThe rule also decides where a piece of logic belongs. A check that "an order cannot be cancelled after it was shipped" is a business rule, so it belongs in the domain, and every caller gets it for free. A check that the field orderId is present in the JSON body is a transport concern, so it belongs in the presentation layer, next to the code that parses the body. Mixing them produces the fat controller, where a rule is buried in a handler and is only enforced for the callers that happen to go through that handler.\n\nThe rule is easy to state and easy to violate by accident, because the language does not stop you. TypeScript will happily let a domain file import axios, and the compiler will not complain. That is why the rule has to be checked mechanically: a lint rule that forbids imports from the infrastructure directory, a dependency-cruiser configuration, an ESLint boundaries plugin, or a test that parses the import graph and fails the build.',
            'Правило зависимостей — самая полезная констрейнта в слоистой архитектуре: внешний слой может вызывать внутренний, а внутренний не должен знать о внешнем. Домен не импортирует HTTP-фреймворк, ORM или UI. Причина не в эстетике, а в независимости изменений. Если домен зависит от ORM, замена ORM превращается в переписывание бизнес-правил; если домен ни от чего внешнего не зависит, он переиспользуется из REST API, CLI-команды и потребителя очереди без единой правки.\n\nПравило также решает, где живёт кусок логики. Проверка «заказ нельзя отменить после отгрузки» — бизнес-правило, значит, она в домене, и все вызывающие получают её бесплатно. Проверка «в теле запроса есть поле orderId» — транспортная забота, значит, она в слое представления, рядом с кодом, который разбирает тело. Смешение даёт толстый контроллер, где правило спрятано в обработчике и работает только для тех, кто случайно проходит через этот обработчик.\n\nПравило легко сформулировать и легко нарушить по невнимательности: язык не запрещает. TypeScript спокойно разрешит доменному файлу импортировать axios, и компилятор не пожалуется. Поэтому правило проверяют механически: правилом линтера, запрещающим импорты из infrastructure, конфигурацией dependency-cruiser, ESLint-плагином boundaries или тестом, который разбирает граф импортов и валит сборку.'
          ),
          bullets: [
            L('The rule exists so the core can change without touching the core.', 'Правило нужно, чтобы ядро менялось, не задевая само себя.'),
            L('A rule in the wrong layer only protects the callers that happen to use it.', 'Правило не в том слое защищает лишь тех, кто случайно через него проходит.'),
            L('Types do not enforce the rule, tooling does.', 'Типы правило не проверяют — это делает инструментарий.'),
            L('Enforcement in CI beats enforcement in a review checklist.', 'Проверка в CI надёжнее проверки в чек-листе ревью.'),
          ],
          code: `// domain/order.ts must stay free of infrastructure imports
import { OrderRepository } from '../application/ports';
// import { db } from '../infrastructure/postgres'; // forbidden`,
          takeaway: L(
            'Dependencies point inward so that the business rules can be changed without rewriting them, and the rule has to be checked by a tool.',
            'Зависимости смотрят внутрь, чтобы бизнес-правила менялись без переписывания, и правило обязано проверяться инструментом.'
          ),
        },
        {
          id: 'architecture-ch1-s4',
          title: L('Presentation, application and data layers', 'Слои представления, приложения и данных'),
          body: L(
            'The presentation layer should be as thin as it can be without becoming meaningless. Its job is to translate: read the request, check the shape of the input, call exactly one use case, map the result into the response format. Anything beyond that translation is business logic that has leaked into the transport, and it shows up as a rule that only exists for HTTP clients.\n\nThe application layer is where the use cases live. A use case takes a command, coordinates the domain objects and the ports, runs inside a unit of work and returns a result. It is the natural home for orchestration: load the order, check the stock, reserve it, charge the payment, publish the event. Note what is not in the list — no SQL, no HTTP client, no framework object. The use case talks to interfaces, and the implementations are supplied from the outside.\n\nThe data layer deserves one warning. A repository that mirrors the table structure, with methods like findByStatusAndCreatedAtAfter, is a DAO with a new name, and it leaks the storage model into the application layer. A repository that speaks the domain, with findById, findByCustomer and save, keeps the schema an implementation detail. The trade-off is that rich domain queries need either a specification object or an explicit read model, and that extra work is exactly the price of keeping the domain independent.',
            'Слой представления должен быть максимально тонким, но не бессмысленным. Его работа — перевод: прочитать запрос, проверить форму входных данных, вызвать ровно один сценарий, отобразить результат в формат ответа. Всё, что выходит за рамки перевода, — это бизнес-логика, утечка в транспорт, и она видна как правило, живущее только для HTTP-клиентов.\n\nСлой приложения — место сценариев использования. Сценарий принимает команду, координирует доменные объекты и порты, выполняется в единице работы и возвращает результат. Это естественный дом для оркестрации: загрузить заказ, проверить остаток, зарезервировать, списать деньги, опубликовать событие. Обратите внимание, чего в списке нет: ни SQL, ни HTTP-клиента, ни объектов фреймворка. Сценарий работает с интерфейсами, а реализации приходят снаружи.\n\nСлой данных требует одного предупреждения. Репозиторий, повторяющий структуру таблицы, с методами вида findByStatusAndCreatedAtAfter, — это DAO под новым именем, и он протаскивает модель хранения в слой приложения. Репозиторий, который говорит на языке домена, с findById, findByCustomer и save, оставляет схему деталью реализации. Цена в том, что богатые доменные запросы требуют либо specification-объекта, либо отдельной модели чтения, и эта лишняя работа — ровно плата за независимость домена.'
          ),
          bullets: [
            L('A controller translates; it does not decide.', 'Контроллер переводит, а не решает.'),
            L('A use case orchestrates the domain and the ports, and nothing else.', 'Сценарий координирует домен и порты, и больше ничего.'),
            L('A repository that mirrors a table is a DAO in disguise.', 'Репозиторий, повторяющий таблицу, — это DAO под другой маской.'),
            L('Orchestration belongs in the application layer, decisions in the domain.', 'Оркестрация живёт в слое приложения, решения — в домене.'),
          ],
          code: `// presentation
export async function postOrder(req, res) {
  const cmd = parseOrderRequest(req.body);
  const orderId = await placeOrder.execute(cmd);
  res.status(201).json({ id: orderId });
}

// application
class PlaceOrder {
  async execute(cmd) {
    const order = Order.create(cmd.lines);
    await this.orders.save(order);
    await this.events.publish(new OrderPlaced(order.id));
    return order.id;
  }
}`,
          takeaway: L(
            'The controller translates, the use case orchestrates, the domain decides, and the adapter persists.',
            'Контроллер переводит, сценарий координирует, домен решает, адаптер сохраняет.'
          ),
        },
      ],
    },
    {
      id: 'architecture-ch2',
      title: L('Clean architecture and hexagonal ports and adapters', 'Чистая архитектура и гексагональные порты и адаптеры'),
      summary: L(
        'The building blocks of clean architecture, how ports and adapters replace framework dependencies with interfaces, and when the whole apparatus is more than you need.',
        'Составные части чистой архитектуры, как порты и адаптеры заменяют зависимости от фреймворков интерфейсами и когда вся эта конструкция избыточна.'
      ),
      sections: [
        {
          id: 'architecture-ch2-s1',
          title: L('Entities and domain rules', 'Сущности и правила домена'),
          body: L(
            'Clean architecture describes the system as concentric circles: entities at the centre, use cases around them, adapters at the edge. The innermost circle holds the entities and the rules that belong to the business itself. An entity here is not a database row with getters and setters, it is an object with behaviour: an order that can be cancelled only while it is in a certain state, a subscription that can be extended only by a whole month, a price that adds nothing but rounds to the currency rule.\n\nThe practical test for a good entity is that it protects its own invariants. If the state of an order can be corrupted by a method that forgets to check the status, the invariant is not really protected. The classic implementation is to make invalid transitions impossible rather than to validate them afterwards: a private state field, a factory method that creates a valid object, and methods that either keep the state valid or throw.\n\nValue objects make the same idea work for the data that has no identity. A Money value of 100 rubles is completely interchangeable with another Money value of 100 rubles, so it can be immutable and compared by value. Modelling it as a value object removes a whole class of bugs, because there is no way to accidentally set the amount without the currency: the constructor takes both, and the currency can never drift from the amount.',
            'Чистая архитектура описывает систему как концентрические круги: в центре сущности, вокруг них сценарии, на краю адаптеры. Самый внутренний круг содержит сущности и правила, которые принадлежат самому бизнесу. Сущность здесь — не строка базы данных с геттерами и сеттерами, а объект с поведением: заказ, который можно отменить только в определённом статусе, подписка, которую можно продлить только целым месяцем, цена, которая складывается по правилам валюты.\n\nПрактический признак хорошей сущности — она защищает свои инварианты. Если состояние заказа можно испортить методом, который забыл проверить статус, инвариант защищён лишь номинально. Классическая реализация — сделать недопустимые переходы невозможными, а не проверять их постфактум: приватное поле состояния, фабричный метод, создающий валидный объект, и методы, которые либо сохраняют валидность, либо бросают исключение.\n\nОбъекты-значения дают ту же идею для данных без идентичности. Значение Money на 100 рублей полностью взаимозаменяемо с другим Money на 100 рублей, поэтому оно может быть неизменяемым и сравниваться по значению. Моделирование так убирает целый класс ошибок: нельзя случайно задать сумму без валюты, конструктор принимает оба значения, и валюта не может разойтись с суммой.'
          ),
          bullets: [
            L('An entity has identity and behaviour, and it guards its own invariants.', 'У сущности есть идентичность и поведение, и она сама хранит свои инварианты.'),
            L('Make invalid transitions impossible instead of validating them later.', 'Делай недопустимые переходы невозможными, а не проверяй их потом.'),
            L('A value object has no identity, is immutable and compares by value.', 'У объекта-значения нет идентичности, он неизменяем и сравнивается по значению.'),
            L('The domain is written in the language of the business, not of the framework.', 'Домен написан на языке бизнеса, а не фреймворка.'),
          ],
          code: `class Order {
  #status = 'new';
  #lines = [];

  static create(lines) {
    const order = new Order();
    order.#lines = lines;
    return order;
  }

  cancel(reason) {
    if (this.#status === 'shipped') {
      throw new OrderCannotBeCancelled(this.id);
    }
    this.#status = 'cancelled';
  }
}`,
          takeaway: L(
            'The centre of the architecture is behaviour and rules, not data containers.',
            'Центр архитектуры — это поведение и правила, а не контейнеры данных.'
          ),
        },
        {
          id: 'architecture-ch2-s2',
          title: L('Use cases as the application core', 'Сценарии как ядро приложения'),
          body: L(
            'A use case is one business operation expressed as an object with a single execute method. It receives a command, coordinates the domain and the ports, and returns a result. Compared with a service function, the object form buys you two things: the dependencies are listed in the constructor and are therefore visible, and the operation can be substituted in a test without touching the code that calls it.\n\nThe interesting part is the boundary of a use case. A use case should be a complete business transaction from the point of view of the user: place an order, cancel a subscription, issue a refund. It should not be a technical step like "save to the table" or "call the API". If a use case becomes too small, the orchestration spreads across the callers and you end up with a distributed business process that nobody can see; if it becomes too big, it turns into a fat service that contains the rules as well.\n\nUse cases are also where the transaction boundary usually sits. The unit of work opens, the use case loads and saves aggregates, and the unit of work commits at the end. Anything that must not be in the same transaction, such as calling a third-party payment API, has to be handled explicitly: either it happens outside the transaction, or its result is written as an intent and completed by a handler, which is the outbox pattern discussed later.',
            'Сценарий использования — это одна бизнес-операция, оформленная как объект с единственным методом execute. Он принимает команду, координирует домен и порты и возвращает результат. По сравнению с функцией-сервисом объектная форма даёт два преимущества: зависимости перечислены в конструкторе и потому видны, а операцию можно подменить в тесте, не трогая вызывающий код.\n\nСамое интересное — граница сценария. Сценарий должен быть полной бизнес-транзакцией с точки зрения пользователя: оформить заказ, отменить подписку, оформить возврат. Это не должен быть технический шаг вроде «сохранить в таблицу» или «вызвать API». Если сценарий становится слишком мелким, оркестрация расползается по вызывающим, и получается распределённый бизнес-процесс, которого никто не видит; если слишком крупным — он превращается в толстый сервис вместе с правилами.\n\nСценарии — это ещё и место, где обычно проходит граница транзакции. Unit of work открывается, сценарий грузит и сохраняет агрегаты, unit of work коммитится в конце. Всё, что не должно быть в той же транзакции — например, вызов стороннего платёжного API, — обрабатывается явно: либо происходит вне транзакции, либо его результат записывается как намерение и завершается обработчиком, и это как раз паттерн outbox, о котором пойдёт речь дальше.'
          ),
          bullets: [
            L('A use case is one business operation with a single entry point.', 'Сценарий — это одна бизнес-операция с единственной точкой входа.'),
            L('A use case is a business transaction, not a technical step.', 'Сценарий — это бизнес-транзакция, а не технический шаг.'),
            L('Dependencies in the constructor make the coupling visible.', 'Зависимости в конструкторе делают связанность видимой.'),
            L('The unit of work usually spans exactly one use case.', 'Unit of work обычно покрывает ровно один сценарий.'),
          ],
          code: `export class PlaceOrder {
  constructor(private orders, private payments, private events, private unitOfWork) {}

  async execute(cmd) {
    const order = Order.create(cmd.lines);
    await this.orders.save(order);
    await this.events.publish(new OrderPlaced(order.id, order.total));
    await this.unitOfWork.commit();
    return order.id;
  }
}`,
          takeaway: L(
            'A use case is a complete business operation with a visible list of dependencies and its own transaction.',
            'Сценарий — это завершённая бизнес-операция с видимым списком зависимостей и собственной транзакцией.'
          ),
        },
        {
          id: 'architecture-ch2-s3',
          title: L('Ports and adapters', 'Порты и адаптеры'),
          body: L(
            'Hexagonal architecture is a concrete way to implement the dependency rule. The application sits in the middle and declares what it needs from the outside world: those declarations are the ports, and they are usually TypeScript interfaces that live with the use cases. The outside implementations are the adapters: a Postgres repository, an Express controller, a Kafka producer, an S3 storage. The name comes from the picture of a hexagon with the application at the centre and the adapters attached to each side, and the message of the picture is that the shape of the hexagon is irrelevant, only the separation matters.\n\nThe rule for where a port is declared is simple: inside, by the code that needs it. The use case that needs to save an order declares an OrderRepository; the code that implements it lives in the infrastructure folder and is wired at the composition root. Because the port is declared by the consumer, the dependency arrow points inward, and swapping Postgres for something else touches one adapter and one line of wiring.\n\nPorts do not have to be one per class. A coarse port that groups several related capabilities behind one interface is often better than a dozen tiny ones, because a tiny interface per method produces a lot of ceremony and mocks that are harder to write than the code they replace. A useful check is that a good port is something you can implement with a fake in a few lines, and something that only makes sense for one specific outside system.',
            'Гексагональная архитектура — это конкретный способ реализовать правило зависимостей. Приложение находится в центре и объявляет, что ему нужно от внешнего мира: эти объявления и есть порты, обычно это интерфейсы TypeScript, живущие рядом со сценариями. Реализации снаружи — это адаптеры: репозиторий на Postgres, контроллер на Express, продюсер в Kafka, хранилище S3. Название пришло из картинки шестиугольника, в центре которого приложение, а по сторонам — адаптеры, и смысл картинки в том, что форма шестиугольника не важна, важно только разделение.\n\nПравило, где объявляется порт, простое: внутри, тем кодом, которому он нужен. Сценарий, который сохраняет заказ, объявляет OrderRepository; реализация лежит в папке infrastructure и связывается в точке композиции. Поскольку порт объявляет потребитель, стрелка зависимости смотрит внутрь, и замена Postgres на что-то другое затрагивает один адаптер и одну строку связывания.\n\nПорты не обязаны быть по одному на класс. Грубый порт, объединяющий несколько связанных возможностей за одним интерфейсом, часто лучше десятка мелких: интерфейс на каждый метод превращается в церемонию, и моки становятся сложнее заменяемого кода. Полезная проверка: хороший порт — тот, который можно реализовать фейком в несколько строк и который осмыслен только для одной конкретной внешней системы.'
          ),
          bullets: [
            L('A port is an interface owned by the code that needs it.', 'Порт — это интерфейс, принадлежащий коду, которому он нужен.'),
            L('An adapter implements a port and lives on the outside.', 'Адаптер реализует порт и живёт снаружи.'),
            L('Wiring happens in one composition root, not in the use cases.', 'Связывание происходит в одной точке композиции, а не в сценариях.'),
            L('A port should be fakeable in a few lines and specific to one system.', 'Порт должен подменяться фейком в несколько строк и быть специфичным для одной системы.'),
          ],
          code: `// port, declared by the use case
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// adapter, implemented on the outside
export class PostgresOrderRepository implements OrderRepository {
  constructor(private pool: Pool) {}
  async save(order: Order) {
    await this.pool.query('INSERT INTO orders (id, total) VALUES ($1, $2)', [
      order.id,
      order.total.value(),
    ]);
  }
}`,
          takeaway: L(
            'The port belongs to the consumer, the adapter to the vendor, and the wiring to a single place.',
            'Порт принадлежит потребителю, адаптер — поставщику, связывание — одному месту.'
          ),
        },
        {
          id: 'architecture-ch2-s4',
          title: L('Dependency inversion in practice', 'Инверсия зависимостей на практике'),
          body: L(
            'Dependency inversion in practice is three small decisions. First, define the interface in the file that uses it, not next to the implementation, so the dependency arrow points from the caller to the abstraction. Second, inject the implementation through the constructor, so nothing reaches out for a global. Third, assemble the object graph in exactly one place, the composition root, where the concrete adapters are named.\n\nThe payoff shows up in tests. A use case test constructs the use case with in-memory or fake adapters and asserts on behaviour: given an order that was already shipped, cancelling it must fail. There is no database, no HTTP server and no mocking framework, because the ports are the seam. The adapter tests then run against real infrastructure in containers, and the contract between the two is checked once, in a test that uses the real adapter against a real dependency.\n\nWhat inversion does not buy you is the freedom to swap any implementation at runtime. You still cannot change the database without a deploy, and an interface is not free: every port has to be maintained, and a too fine-grained port produces a mock that is more work than the code. The value is narrower and more solid: the core is testable without the outside world, and the outside world can be replaced without touching the core.',
            'Инверсия зависимостей на практике — это три небольших решения. Первое: интерфейс определяется в файле, который его использует, а не рядом с реализацией, чтобы стрелка зависимости смотрела от вызывающего к абстракции. Второе: реализация внедряется через конструктор, и ничто не лезет за глобальным объектом. Третье: граф объектов собирается ровно в одном месте, в точке композиции, где называются конкретные адаптеры.\n\nПольза проявляется в тестах. Тест сценария собирает сценарий с адаптерами в памяти или фейками и проверяет поведение: если заказ уже отгружен, отмена должна провалиться. Ни базы, ни HTTP-сервера, ни mocking-фреймворка, потому что порты и есть шов. Тесты адаптеров идут против настоящей инфраструктуры в контейнерах, а контракт между ними проверяется один раз, тестом с настоящим адаптером и настоящей зависимостью.\n\nЧего инверсия не даёт, — это свободы менять любую реализацию на лету. Базу всё равно приходится менять вместе с деплоем, а интерфейс не бесплатен: каждый порт нужно поддерживать, и слишком мелкий порт порождает мок, который дороже самой реализации. Ценность уже и прочнее: ядро тестируется без внешнего мира, а внешний мир меняется, не трогая ядра.'
          ),
          bullets: [
            L('Declare the interface in the consuming file, not next to the implementation.', 'Объявляй интерфейс в файле потребителя, а не рядом с реализацией.'),
            L('Inject through the constructor and assemble the graph in one place.', 'Внедряй через конструктор и собирай граф в одном месте.'),
            L('Tests of the core need no infrastructure at all.', 'Тесты ядра не нуждаются в инфраструктуре вовсе.'),
            L('An interface is a cost too: keep ports coarse enough to be useful.', 'Интерфейс — тоже расход: держите порты достаточно крупными, чтобы они были полезны.'),
          ],
          code: `// test: no database, no framework
const orders = new InMemoryOrderRepository();
const placeOrder = new PlaceOrder(orders, fakePayments, fakeEvents, new FakeUnitOfWork());

it('rejects cancelling a shipped order', async () => {
  const order = Order.create([line]).ship();
  orders.save(order);
  await expect(cancelOrder.execute({ orderId: order.id })).rejects.toThrow();
});`,
          takeaway: L(
            'Inversion is what makes the core testable without the outside world, not what makes the outside world optional.',
            'Инверсия делает ядро тестируемым без внешнего мира, а не делает внешний мир ненужным.'
          ),
        },
        {
          id: 'architecture-ch2-s5',
          title: L('When clean architecture is overkill', 'Когда чистая архитектура избыточна'),
          body: L(
            'Clean architecture costs. Every port is an interface to maintain, every adapter is a class to write, every use case is a class with a single method, and every layer boundary is a place where a new developer has to be told where the code belongs. On a small project with one team and a short life, that cost is not repaid, and a three-layer structure with plain functions is enough.\n\nThe signals that the extra structure is worth paying for are specific. The domain is genuinely complex and has rules that several entry points need. The team is larger than one or two people and needs the code to be self-explanatory. The product must support several clients with different shapes, for example a web app, a mobile app and a partner API. The infrastructure is likely to change, for example a move from one cloud provider to another or a replacement of a payment vendor. And the correctness of the rules matters more than the speed of delivery, for example in billing, insurance or medical software.\n\nA middle path is common and works well: keep a single domain folder with the rules, one application folder with the use cases, and adapters at the edges, but do not build the port interfaces for everything. Introduce a port only where you actually need to substitute the implementation in a test, and only where more than one implementation is plausible. The mistake to avoid is the opposite one: a codebase with no boundaries at all, where the rules are spread across controllers and services, which is far more expensive to repair later than an over-structured version of the same code.',
            'Чистая архитектура стоит денег. Каждый порт — это интерфейс в поддержке, каждый адаптер — класс, каждый сценарий — класс с одним методом, каждая граница слоёв — место, где новому разработчику надо объяснить, где лежит код. На маленьком проекте с одной командой и коротким сроком жизни эта цена не окупается, и трёхслойной структуры на обычных функциях достаточно.\n\nСигналы, что дополнительная структура окупается, конкретны. Домен действительно сложен, и правила нужны нескольким точкам входа. Команда больше одного-двух человек и код должен быть понятен без устных объяснений. Продукт обслуживает несколько клиентов с разной формой данных: веб, мобилка, партнёрский API. Инфраструктура может измениться, например переезд к другому облаку или смена платёжного провайдера. И корректность правил важнее скорости выпуска — в биллинге, страховании или медицинском софте.\n\nРаспространён и работает средний путь: одна папка домена с правилами, одна папка приложения со сценариями, адаптеры по краям, но без портов на всё подряд. Вводите порт только там, где реализацию реально нужно подменять в тесте и где возможна не одна реализация. Ошибка, которую стоит избегать, — обратная: код без границ вовсе, где правила размазаны по контроллерам и сервисам, — такой код чинить потом дороже, чем избыточно структурированную версию того же самого.'
          ),
          bullets: [
            L('Ports, adapters and a class per use case all carry a maintenance cost.', 'Порты, адаптеры и класс на каждый сценарий — всё это стоит поддержки.'),
            L('Complex rules, several clients and a changing infrastructure pay it back.', 'Сложные правила, несколько клиентов и меняющаяся инфраструктура её окупают.'),
            L('Introduce a port only where substitution is actually needed.', 'Вводите порт только там, где подмена действительно нужна.'),
            L('No boundaries at all is more expensive to repair than too many.', 'Отсутствие границ чинить дороже, чем их избыток.'),
          ],
          code: `// enough for a small service
src/
  domain/rules.ts     // pure functions and entities
  services/           // use cases
  routes/             // adapters
  db/                 // adapters`,
          takeaway: L(
            'Add layers where the complexity lives; a simple codebase with clean rules beats a complicated one with pure interfaces.',
            'Добавляй слои там, где сложность, и простой код с чистыми правилами лучше сложного кода с красивыми интерфейсами.'
          ),
        },
      ],
    },
    {
      id: 'architecture-ch3',
      title: L('Module boundaries and feature-based architecture', 'Границы модулей и архитектура по фичам'),
      summary: L(
        'How to organise the repository by feature, what a module public API is, why barrels can hurt, and how to keep the boundaries from rotting.',
        'Как организовать репозиторий по фичам, что такое публичный API модуля, чем вредны barrel-файлы и как не дать границам размыться.'
      ),
      sections: [
        {
          id: 'architecture-ch3-s1',
          title: L('Folders by feature', 'Папки по фичам'),
          body: L(
            'Organising by feature means the primary directory level mirrors the capabilities of the product rather than the technical roles. A checkout feature owns its page components, its form validation, its use cases, its domain objects and its HTTP calls to the payments API. A catalog feature owns its search, its filters and its product model. Shared things, such as the HTTP client, the logger or a money formatter, live outside the features.\n\nThe reason to do this is change cohesion. Most pull requests touch one capability, and with a feature-based layout the whole change lives in one folder, so the reviewer sees a self-contained diff and the new colleague finds everything about checkout in one place. With a type-based layout the same pull request touches controllers, services, models and tests of several folders, and no single directory tells the story.\n\nA feature folder is not just a folder, it is a boundary with an API. Inside it there may be ten files and a dozen internal helpers, but only a few of them are meant to be used from outside. The rest are implementation details that are free to change. Declaring that boundary explicitly is what turns a directory into a module, and it is what allows the folder to be extracted into a package or a service later without touching its consumers.',
            'Организация по фичам означает, что первый уровень каталогов повторяет возможности продукта, а не технические роли. Фича checkout владеет своими компонентами страницы, валидацией формы, сценариями, доменными объектами и HTTP-вызовами к платёжному API. Фича catalog владеет поиском, фильтрами и моделью товара. Общие вещи — HTTP-клиент, логгер, форматтер денег — живут вне фич.\n\nПричина в связности изменений. Большинство пул-реквестов затрагивают одну возможность, и при раскладке по фичам всё изменение лежит в одной папке: ревьюер видит самодостаточный диф, а новичок находит всё про checkout в одном месте. При раскладке по типах тот же пул-реквест трогает контроллеры, сервисы, модели и тесты нескольких папок, и ни один каталог не рассказывает историю целиком.\n\nПапка фичи — это не просто папка, это граница с API. Внутри могут быть десять файлов и десяток внутренних помощников, но наружу предназначены лишь несколько. Остальное — детали реализации, которые можно менять. Явное объявление этой границы превращает каталог в модуль и позволяет позже вынести папку в пакет или сервис, не трогая потребителей.'
          ),
          bullets: [
            L('The top level of the tree lists business capabilities.', 'Верхний уровень дерева перечисляет бизнес-возможности.'),
            L('A feature folder keeps everything one pull request touches together.', 'Папка фичи держит рядом всё, что затрагивает один пул-реквест.'),
            L('A folder becomes a module only when its boundary is declared.', 'Папка становится модулем, только когда граница объявлена.'),
            L('Shared code lives outside the features.', 'Общий код живёт вне фич.'),
          ],
          code: `src/
  features/
    checkout/
      ui/            // CheckoutPage, PaymentForm
      use-cases/     // placeOrder, cancelOrder
      domain/        // Order, Money
      infrastructure/ // checkoutApi.ts
      index.ts       // public API
    catalog/
      ui/ domain/ infrastructure/ index.ts
  shared/
    http/ logger/ format/`,
          takeaway: L(
            'Organise the tree by capability so that one change stays in one place.',
            'Организуй дерево по возможностям, чтобы одно изменение оставалось в одном месте.'
          ),
        },
        {
          id: 'architecture-ch3-s2',
          title: L('The public API of a module', 'Публичный API модуля'),
          body: L(
            'Every module needs one obvious way to be used from outside, and that is the public API. In a TypeScript project it is usually a single index.ts that re-exports exactly what consumers are allowed to touch. Everything else inside the module is private by convention, and the convention is enforced by the fact that other modules import from the index, not from the internals.\n\nThe API should be small and stable. Small because every exported symbol is a promise to the consumers, and renaming one becomes a breaking change for a file that never mentioned it. Stable because the whole point of the module is that the internals can be refactored without a ripple. If consumers routinely reach into the internals, the module has no real boundary, and the refactoring that the boundary was supposed to enable turns into a project-wide change.\n\nA useful discipline is to check the public API before every release of a module: is there an export nobody uses, and can it be deleted? Unused exports are not free, they are additional contract that nobody asked for, and they make it harder to change the implementation later.',
            'У каждого модуля должен быть один очевидный способ использования снаружи — это и есть публичный API. В TypeScript-проекте это обычно единственный index.ts, который переэкспортирует ровно то, что потребителям разрешено трогать. Всё остальное внутри модуля приватно по соглашению, и соглашение работает потому, что другие модули импортируют из индекса, а не из внутренних файлов.\n\nAPI должен быть маленьким и стабильным. Маленьким, потому что каждый экспортируемый символ — обещание потребителям, и переименование становится ломающим изменением для файла, который про него и не знал. Стабильным, потому что весь смысл модуля в том, что внутренности можно переделывать без волны. Если потребители регулярно лезут внутрь, у модуля нет настоящей границы, и рефакторинг, который граница должна была разрешить, превращается в изменение всего проекта.\n\nПолезная дисциплина — пересматривать публичный API перед каждым релизом модуля: есть экспорт, который никто не использует, и его можно удалить? Неиспользуемые экспорты не бесплатны, это лишний контракт, который никто не просил, и они мешают менять реализацию позже.'
          ),
          bullets: [
            L('One index file is the public API of a module.', 'Один index-файл — это публичный API модуля.'),
            L('Every export is a promise to the consumers.', 'Каждый экспорт — обещание потребителям.'),
            L('Reaching into internals means there is no real boundary.', 'Обращения во внутренности означают, что настоящей границы нет.'),
            L('Delete unused exports: they are contract nobody asked for.', 'Удаляйте неиспользуемые экспорты: это контракт, который никто не просил.'),
          ],
          code: `// features/checkout/index.ts
export { CheckoutPage } from './ui/CheckoutPage';
export { placeOrder } from './use-cases/placeOrder';
export type { CheckoutState } from './domain/types';

// consumers
import { CheckoutPage, placeOrder } from '@/features/checkout';
// not allowed
import { parsePrice } from '@/features/checkout/domain/parsePrice';`,
          takeaway: L(
            'A module is a promise: this is the API, everything else may change.',
            'Модуль — это обещание: вот API, всё остальное может меняться.'
          ),
        },
        {
          id: 'architecture-ch3-s3',
          title: L('Barrels and their downsides', 'Barrel-файлы и их минусы'),
          body: L(
            'A barrel is an index file that re-exports the contents of a folder. It is convenient: one import path for the whole feature, one place to look at the public API, and shorter imports in the consumer. This is why barrels are everywhere in TypeScript projects and why it is worth knowing their cost.\n\nThe cost is that a barrel turns a tree of modules into a single node in the dependency graph. If the barrel re-exports everything, including a file that imports the consumer, you get a cycle that no single file reveals, and the bundler or the test runner starts to complain about it. A barrel also hides the real origin of a symbol: when a function appears in a stack trace, the frame points to the index, and the search for the actual implementation takes an extra step. In large barrels, module initialisation order can change, and side effects in an imported module now run even when the consumer only wanted one function from a different file.\n\nA middle position works well in practice: keep the barrel small, export only the public API, and let the deep internals be imported directly inside the module. If a cycle appears, delete the barrel or split it in two, because a cycle between two files that are in the same module is usually a sign that the responsibility is in the wrong place.',
            'Barrel — это index-файл, переэкспортирующий содержимое папки. Он удобен: один путь импорта на всю фичу, одно место, где виден публичный API, короткие импорты у потребителей. Именно поэтому barrel-файлы повсеместны в TypeScript-проектах и стоит знать их цену.\n\nЦена в том, что barrel превращает дерево модулей в один узел графа зависимостей. Если barrel переэкспортирует всё, включая файл, который импортирует потребителя, возникает цикл, которого не видно ни в одном отдельном файле, и на него начинают жаловаться бандлер или тест-раннер. Barrel ещё и скрывает настоящее происхождение символа: в стектрейсе кадр указывает на index, и поиск реальной реализации требует лишнего шага. В больших barrel-файлах меняется порядок инициализации модулей, и побочные эффекты импортированного файла выполняются, даже если потребителю нужен был один символ из другого файла.\n\nНа практике хорошо работает срединный вариант: держать barrel маленьким, экспортировать только публичный API, а глубокие внутренности импортировать напрямую внутри модуля. Если появился цикл, barrel удаляют или делят надвое, потому что цикл между двумя файлами одного модуля — обычно признак того, что ответственность лежит не там.'
          ),
          bullets: [
            L('A barrel collapses a folder into one node of the dependency graph.', 'Barrel схлопывает папку в один узел графа зависимостей.'),
            L('Cycles between two files of a module are hidden by a wide barrel.', 'Циклы между двумя файлами модуля прячутся за широким barrel-файлом.'),
            L('A barrel hides where a symbol really comes from.', 'Barrel скрывает, откуда на самом деле пришёл символ.'),
            L('Export only the public API and import internals directly.', 'Экспортируй только публичный API, а внутренности импортируй напрямую.'),
          ],
          code: `// too wide: pulls the whole feature into every consumer
export * from './ui';
export * from './domain';
export * from './infrastructure';

// narrow: only the contract
export { CheckoutPage } from './ui/CheckoutPage';
export { placeOrder } from './use-cases/placeOrder';`,
          takeaway: L(
            'Barrels are for the public API only; the wider the barrel, the harder the cycles are to see.',
            'Barrel-файлы — только для публичного API, и чем barrel шире, тем сложнее заметить циклы.'
          ),
        },
        {
          id: 'architecture-ch3-s4',
          title: L('Cycles and enforced boundaries', 'Циклы и границы, которые не размываются'),
          body: L(
            'A dependency cycle is more than an inconvenience: it means two pieces of code need each other, and neither can be understood, tested or extracted on its own. In a monolith the cycle usually shows up as a circular import error or as a value that is undefined at the moment it is used. In a distributed system the same shape becomes two services calling each other, which is worse, because there is no stack trace that points at the cycle.\n\nPreventing cycles needs two things. The first is design: a dependency rule that says which direction is allowed, and a decision to fix the violation by moving the shared piece down rather than by importing it in both directions. The second is tooling, because no team is careful enough to notice a cycle by eye in a large diff. Lint rules such as import/no-cycle catch direct cycles, and plugins such as eslint-plugin-boundaries describe the architecture in the configuration: which directories exist, which ones may import which, and what a module is allowed to depend on.\n\nThe same approach works for the rules that a lint rule cannot express. A dependency test can parse the import graph and assert that the catalog feature does not import the internals of the checkout feature, or that the domain folder does not import anything from infrastructure. Such a test is cheap, runs on every pull request, and turns a rule that exists only in the head of a senior developer into a rule that the build enforces.',
            'Цикл зависимостей — не просто неудобство: он означает, что двум кускам кода нужны друг друга и ни один из них нельзя ни понять, ни протестировать, ни выделить отдельно. В монолите цикл обычно проявляется ошибкой циклического импорта или тем, что значение в момент использования оказывается undefined. В распределённой системе та же форма превращается в два сервиса, вызывающих друг друга, и это хуже, потому что стектрейс на цикл не указывает.\n\nПредотвращение циклов требует двух вещей. Первое — проектное решение: правило зависимостей, которое задаёт разрешённое направление, и решение исправлять нарушение переносом общего куска вниз, а не импортом в обе стороны. Второе — инструментарий, потому что ни одна команда не достаточно внимательна, чтобы заметить цикл глазами в большом диффе. Правила линтера вроде import/no-cycle ловят прямые циклы, а плагины вроде eslint-plugin-boundaries описывают архитектуру в конфигурации: какие каталоги есть, кому кому можно импортировать и что модулю разрешено зависеть от.\n\nТот же подход работает и для правил, которые линтер не выразит. Тест зависимостей может разобрать граф импортов и проверить, что фича catalog не импортирует внутренности фичи checkout, а папка domain ничего не берёт из infrastructure. Такой тест стоит копейки, гоняется на каждом пул-реквесте и превращает правило, живущее только в голове senior-разработчика, в правило, которое проверяет сборка.'
          ),
          bullets: [
            L('A cycle means two pieces of code cannot be understood or tested alone.', 'Цикл означает, что два куска кода нельзя понять и протестировать по отдельности.'),
            L('Design the direction first, then let the tooling catch the violations.', 'Сначала спроектируйте направление, потом поручите инструменту ловить нарушения.'),
            L('Boundaries plugins describe the architecture in the lint config.', 'Плагины boundaries описывают архитектуру прямо в конфигурации линтера.'),
            L('A dependency test turns a team convention into a build rule.', 'Тест зависимостей превращает соглашение команды в правило сборки.'),
          ],
          code: `// eslint.config.js
{
  rules: {
    'import/no-cycle': 'error',
    'boundaries/element-types': ['error', {
      boundaries: ['module', 'feature', 'shared'],
    }],
  },
}`,
          takeaway: L(
            'Boundaries that are only written down erode; the ones that fail the build survive.',
            'Границы, записанные только на бумаге, размываются, а те, что ломают сборку, выживают.'
          ),
        },
        {
          id: 'architecture-ch3-s5',
          title: L('Shared code versus feature code', 'Общий код против кода фичи'),
          body: L(
            'A shared folder is the place for code that has no business meaning of its own: a money formatter, a date helper, an HTTP client wrapper, a logger, a generic validation function. The test is whether you can describe the piece in one sentence without naming a feature. If the description has to mention billing or checkout, the code belongs to that feature.\n\nThe failure mode is the shared module that slowly grows a second domain. Someone needs a discount calculation for a campaign, finds the shared pricing helpers, and adds a parameter for the campaign. Then another campaign needs another parameter, and a year later the shared module is a second copy of the pricing domain that nobody owns, changes when either team needs it, and breaks both. The rule that prevents this is simple to state and hard to enforce: shared code may not import from features, and features may not add feature-specific logic to shared code.\n\nThe other failure mode is over-sharing. A helper duplicated three times in three features is usually better than a shared helper used by three features that have to agree on its behaviour forever, because duplication is cheap to change and shared code is expensive to change. The rule of three is a reasonable heuristic: the first copy goes in the feature, the second is a hint, and the third is the moment to extract it into shared, with a test that pins the behaviour both copies agreed on.',
            'Общая папка — место для кода, у которого нет собственного бизнес-смысла: форматтер денег, помощник по датам, обёртка HTTP-клиента, логгер, универсальная валидация. Проверка простая: можно ли описать кусок одним предложением, не называя фичу? Если в описании приходится упоминать биллинг или checkout, код принадлежит этой фиче.\n\nОбратная сторона — общий модуль, который постепенно становится вторым доменом. Кому-то нужна формула скидки для кампании, он находит общие помощники ценообразования и добавляет параметр кампании. Потом нужна ещё одна кампания, ещё один параметр, и через год общий модуль — вторая копия домена цен, которой никто не владеет, которая меняется, когда нужно кому-то из двух команд, и ломает обоих. Правило, которое это предотвращает, легко сформулировать и трудно проверить: общий код не импортирует фичи, а фичи не добавляют в общий код логику своих фич.\n\nВторая ошибка — избыточный шаринг. Помощник, продублированный в трёх фичах, обычно лучше общего помощника, используемого тремя фичами, которым вечно придётся согласовывать поведение, потому что дубликат менять дёшево, а общий код дорого. Правило трёх — разумная эвристика: первая копия живёт в фиче, вторая — намёк, а третья — момент вынести в общее, с тестом, фиксирующим поведение, на котором сошлись обе копии.'
          ),
          bullets: [
            L('Shared code must be describable without naming a feature.', 'Общий код должен описываться без упоминания фичи.'),
            L('Shared code may never import from features.', 'Общий код не должен импортировать фичи.'),
            L('A shared module with feature-specific parameters becomes a second domain.', 'Общий модуль с фичевыми параметрами становится вторым доменом.'),
            L('Duplication is cheap to change, shared code is expensive to change.', 'Дубликат менять дёшево, общий код — дорого.'),
          ],
          code: `// good: shared and business-free
export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(amount);
}

// bad: a feature-specific parameter appeared in shared code
export function formatPrice(amount: number, campaignId?: string): string {`,
          takeaway: L(
            'Move code into shared only when it has no business meaning and at least two real consumers.',
            'Переноси код в общее только тогда, когда в нём нет бизнес-смысла и есть минимум два настоящих потребителя.'
          ),
        },
      ],
    },
    {
      id: 'architecture-ch4',
      title: L('Service architecture', 'Сервисная архитектура'),
      summary: L(
        'When to stay a monolith, when to become a modular monolith, what it takes to split services properly and what distribution costs you in the end.',
        'Когда остаться монолитом, когда стать модульным монолитом, что нужно для правильного выделения сервисов и во сколько обходится распределение.'
      ),
      sections: [
        {
          id: 'architecture-ch4-s1',
          title: L('Monolith and modular monolith', 'Монолит и модульный монолит'),
          body: L(
            'A monolith is a single deployable artifact. It is not a dirty word: one process, one database transaction across the whole request, no network in the middle, a debugger that works. Its problems are organisational, not technical: as the codebase and the team grow, unrelated features change the same files, every release carries the whole system, and the blast radius of a mistake is the whole product.\n\nThe modular monolith is the standard answer to those problems. The system stays one deployable unit, but the code is split into modules with enforced boundaries and one-way dependencies, and each module owns its data and talks to other modules through interfaces rather than through their tables. You keep in-process calls and simple operations, and you gain a codebase where a change to billing cannot accidentally break the catalog.\n\nThe migration path is gradual and is usually the right one. Start with the boundaries in the code: a module folder, a rule that it owns its tables, a lint rule that forbids cross-module imports of internals. When the boundaries are real and tested, the system is already a modular monolith, and extracting a module into a service later becomes a mechanical change rather than an archaeological dig. Teams that jump straight to microservices usually end up with a distributed monolith: all the network calls of a distributed system and none of the independence.',
            'Монолит — это один артефакт развёртывания. Это не ругательство: один процесс, одна транзакция на весь запрос, никакой сети внутри, работающий отладчик. Его проблемы организационные, а не технические: по мере роста кодовой базы и команды несвязанные фичи меняют одни и те же файлы, каждый релиз несёт всю систему, а цена ошибки равна цене всего продукта.\n\nМодульный монолит — стандартный ответ на эти проблемы. Система остаётся одной единицей развёртывания, но код делится на модули с явными границами и однонаправленными зависимостями, каждый модуль владеет своими данными и обращается к другим модулям через интерфейсы, а не через их таблицы. Вызовы внутри процесса и простая эксплуатация остаются, а кодовая база становится такой, что изменение биллинга не может случайно сломать каталог.\n\nПуть миграции постепенный и обычно правильный. Начните с границ в коде: папка модуля, правило, что он владеет своими таблицами, правило линтера, запрещающее межмодульные импорты внутренностей. Когда границы настоящие и покрыты тестами, система уже модульный монолит, а выделение модуля в сервис позже становится механической работой, а не раскопками. Команды, которые сразу прыгают в микросервисы, обычно получают распределённый монолит: все сетевые вызовы распределённой системы и ни одного достоинства независимости.'
          ),
          bullets: [
            L('The problems of a monolith are organisational, not technical.', 'Проблемы монолита организационные, а не технические.'),
            L('A modular monolith adds boundaries without adding a network.', 'Модульный монолит добавляет границы, не добавляя сеть.'),
            L('Each module owns its data and talks through interfaces.', 'Каждый модуль владеет своими данными и общается через интерфейсы.'),
            L('A distributed monolith has all the calls and none of the independence.', 'У распределённого монолита есть все вызовы и нет ни одного достоинства независимости.'),
          ],
          code: `src/modules/
  catalog/    // owns catalog tables
  orders/     // owns orders tables
  billing/    // owns invoices tables

// billing calls orders through the module interface
import { OrderReader } from '../orders/public-api';`,
          takeaway: L(
            'A modular monolith gives you the boundaries first, and the services become an option rather than a commitment.',
            'Модульный монолит сначала даёт границы, а сервисы становятся возможностью, а не обязательством.'
          ),
        },
        {
          id: 'architecture-ch4-s2',
          title: L('Microservices and splitting criteria', 'Микросервисы и критерии выделения'),
          body: L(
            'A service is a business capability with its own data, its own deployment and its own team. The criteria for extracting one are therefore mostly about ownership and change. The capability has rules that nobody else needs, it changes on a different rhythm, it has a different load profile, it has data that must be isolated for legal or technical reasons, and a team is able to own it end to end, including being on call for it.\n\nThe bad reasons are common. The module is long, so it becomes a service. The team likes microservices. The technology is newer. None of these survive the first incident, because none of them produce a boundary that makes sense to the business, and the result is a set of services that have to be changed together anyway, but now over the network.\n\nThe technical cost of the split is concrete. A call that took a microsecond inside the process now takes milliseconds and can fail in several new ways: timeout, partial write, duplicate delivery, version mismatch. The transaction that covered three steps now covers one, and consistency has to be rebuilt on top of events. And the deployment story becomes a distributed system problem: a schema change in one service has to be compatible with the previous version of every consumer, which is why expand-and-contract migrations exist.',
            'Сервис — это бизнес-возможность со своими данными, своим развёртыванием и своей командой. Поэтому критерии выделения в основном про владение и изменения. У возможности есть правила, которые больше никому не нужны, она меняется в своём темпе, у неё другой профиль нагрузки, её данные надо изолировать по юридическим или техническим причинам, и есть команда, готовая отвечать за неё целиком, включая дежурства.\n\nПлохие причины встречаются часто. Модуль длинный — значит, выделим сервис. Команде нравятся микросервисы. Технология новее. Ни одна из них не переживёт первого инцидента, потому что ни одна не создаёт границу, имеющую смысл для бизнеса, и на выходе получается набор сервисов, которые всё равно приходится менять вместе, но теперь поверх сети.\n\nТехническая цена выделения конкретна. Вызов, который внутри процесса занимал микросекунду, теперь занимает миллисекунды и может упасть несколькими новыми способами: таймаут, частичная запись, повторная доставка, несовпадение версий. Транзакция, покрывавшая три шага, теперь покрывает один, и согласованность приходится строить заново поверх событий. И история развёртывания превращается в задачу распределённой системы: изменение схемы в одном сервисе должно быть совместимо с предыдущей версией каждого потребителя, и ради этого существуют миграции expand-and-contract.'
          ),
          bullets: [
            L('A service boundary follows a business capability, not the size of a file.', 'Граница сервиса следует за бизнес-возможностью, а не за размером файла.'),
            L('A team that owns the service end to end is part of the criteria.', 'Команда, отвечающая за сервис целиком, — часть критериев.'),
            L('The call becomes a network call that can fail in new ways.', 'Вызов превращается в сетевой, и он может упасть по-новому.'),
            L('Schema changes need to be compatible with the previous version of consumers.', 'Изменения схемы должны быть совместимы с предыдущей версией потребителей.'),
          ],
          code: `// a service contract
export interface PricingService {
  getQuote(cart: Cart): Promise<Quote>;
}

// versioning: consumers must survive a v2 rollout
GET /v1/quotes
GET /v2/quotes`,
          takeaway: L(
            'Extract a service for ownership and change, never for size, taste or novelty.',
            'Выделяй сервис ради владения и изменений, а не ради размера, вкуса или новизны.'
          ),
        },
        {
          id: 'architecture-ch4-s3',
          title: L('Communication and the API gateway', 'Коммуникация и API-шлюз'),
          body: L(
            'Communication between services has two shapes, and choosing between them is mostly about whether the caller needs the answer to continue. Synchronous calls, over HTTP or gRPC, are right when the caller must have the result right now: the total of a cart, the availability of an item, the access decision. Asynchronous messages are right when the work can happen later, when several consumers need the same fact, or when the producer must not be affected by the consumer being down.\n\nThe rule of thumb is that a request path should not stretch across many synchronous hops. Each hop adds latency, and each hop multiplies the probability of failure: five services in a chain means five chances to time out, and the total budget has to fit in the slowest of them. A common and effective pattern is that the request path stays short and reads from a locally maintained view, while the heavy lifting happens asynchronously through events.\n\nAn API gateway is the public entry point in front of the services. It terminates TLS, authenticates the caller, applies rate limits, routes the request and often aggregates several service calls into one response. What it must not be is a place for business rules: rules in the gateway are invisible to the teams that own the domains, they are duplicated in every consumer, and they never end up in the domain layer where the tests live.',
            'У communication между сервисами есть две формы, и выбор между ними — в основном про то, нужен ли вызывающему ответ прямо сейчас. Синхронные вызовы, по HTTP или gRPC, уместны, когда результат нужен немедленно: сумма корзины, наличие товара, решение о доступе. Асинхронные сообщения — когда работа может подождать, когда одному факту нужно несколько потребителей или когда производитель не должен зависеть от доступности потребителя.\n\nПравило большого пальца: путь запроса не должен проходить через много синхронных хопов. Каждый хоп добавляет задержку и умножает вероятность отказа: пять сервисов в цепочке — это пять шансов на таймаут, а общий бюджет должен уместиться в самый медленный из них. Распространённый и эффективный приём: путь запроса остаётся коротким и читает из локально поддерживаемого представления, а тяжёлая работа идёт асинхронно через события.\n\nAPI-шлюз — публичная точка входа перед сервисами. Он терминирует TLS, аутентифицирует вызывающего, применяет лимиты, маршрутизирует запрос и часто агрегирует несколько сервисных вызовов в один ответ. Но он не должен быть местом бизнес-правил: правила в шлюзе не видны командам, которые владеют доменами, дублируются у каждого потребителя и никогда не попадают в доменный слой, где живут тесты.'
          ),
          bullets: [
            L('Synchronous when the caller needs the answer now, asynchronous when it can wait.', 'Синхронно, когда ответ нужен сейчас, асинхронно, когда можно подождать.'),
            L('Every hop in a request chain multiplies the chance of failure.', 'Каждый хоп в цепочке запроса умножает вероятность отказа.'),
            L('Keep the request path short and move heavy work to events.', 'Держите путь запроса коротким, а тяжёлую работу переносите в события.'),
            L('A gateway is for cross-cutting transport concerns, never for business rules.', 'Шлюз — для транспортных забот, но никогда для бизнес-правил.'),
          ],
          code: `// synchronous: the caller needs the value now
const quote = await pricingClient.getQuote(cart, { timeout: 300 });

// asynchronous: the fact matters to several consumers
await bus.publish('OrderPaid', { orderId, amount });`,
          takeaway: L(
            'Use synchronous calls for answers you need now and events for facts that can travel on their own.',
            'Синхронный вызов — для нужного сейчас ответа, события — для фактов, которые могут идти своим ходом.'
          ),
        },
        {
          id: 'architecture-ch4-s4',
          title: L('Data ownership', 'Владение данными'),
          body: L(
            'Each service owns its data: the schema, the migrations, the meaning of the fields and the lifecycle. Other services do not read those tables directly, they ask through an API or receive the facts they need as events. This rule is the one that makes services independent, and it is also the one that is broken first, because a direct read of another service table is one line and looks harmless.\n\nThe moment two services read the same tables, the schema stops being an implementation detail of the owner and becomes a contract without a contract, and a migration in one service can break the other in production. The symptom is a slow drift: a column is added "for now", a join is introduced for a report, and a year later the two tables can only be changed together. The cure is boring and effective: the tables live in a separate schema or database, access is only through the owning service, and the rule is enforced by permissions and by a dependency test, not by a convention.\n\nThe consequences are worth understanding before you commit. Cross-service questions, such as "how much did this customer spend last year", can no longer be one SQL join; they become an API call, a denormalised read model, or an analytics pipeline. That is a real cost in latency and in development, and it is exactly why many systems keep reporting and analytics on a separate store built from events, so that the operational databases can stay small and clean.',
            'Каждый сервис владеет своими данными: схемой, миграциями, смыслом полей и жизненным циклом. Другие сервисы не читают эти таблицы напрямую, а спрашивают через API или получают нужные факты событиями. Это правило делает сервисы независимыми, и именно оно ломается первым, потому что прямой чужой SELECT — это одна строка и выглядит безобидно.\n\nКак только два сервиса читают одни таблицы, схема перестаёт быть деталью реализации владельца и становится контрактом без контракта, и миграция в одном сервисе может сломать другой в production. Симптом — медленный дрейф: колонка добавляется «временно», для отчёта появляется join, и через год две таблицы можно менять только вместе. Лечение скучное и надёжное: таблицы живут в отдельной схеме или базе, доступ только через владельца, а правило проверяют права доступа и тест зависимостей, а не соглашением.\n\nПоследствия стоит понять до того, как вы на это подпишетесь. Вопросы, пересекающие сервисы, вроде «сколько этот клиент потратил за год», больше не решаются одним JOIN-ом: это становится вызовом API, денормализованной моделью чтения или аналитическим пайплайном. Это реальная цена в задержке и в разработке, и именно поэтому многие системы держат отчётность и аналитику в отдельном хранилище, собранном из событий, чтобы операционные базы оставались маленькими и чистыми.'
          ),
          bullets: [
            L('The owner defines the schema, the migrations and the meaning of the fields.', 'Владелец определяет схему, миграции и смысл полей.'),
            L('Other services go through an API or events, never straight to the tables.', 'Другие сервисы идут через API или события, но не к таблицам.'),
            L('A shared read of someone else table is the first step to a distributed monolith.', 'Чтение чужой таблицы — первый шаг к распределённому монолиту.'),
            L('Cross-service reporting needs read models or an analytics store.', 'Отчётность по нескольким сервисам требует моделей чтения или аналитического хранилища.'),
          ],
          code: `// forbidden: a direct read of another service table
const rows = await ordersDb.query('SELECT * FROM orders WHERE customer_id = $1');

// allowed: through the owner
const orders = await ordersClient.listByCustomer(customerId);`,
          takeaway: L(
            'Owning the data is what makes a service independent; sharing tables quietly removes that independence.',
            'Владение данными делает сервис независимым, а общие таблицы тихо эту независимость отнимают.'
          ),
        },
        {
          id: 'architecture-ch4-s5',
          title: L('What distribution costs you', 'Во сколько обходится распределение'),
          body: L(
            'Every call that crosses a process boundary can fail in ways an in-process call cannot. It can time out after the work was already done, so the caller does not know whether to retry. It can succeed on the server and fail on the network, so the message is delivered twice. It can be delivered to a consumer that is an older version and does not understand the new field. Each of these is not a bug in the code but a property of the network, and the design has to account for them explicitly.\n\nThe second cost is the loss of the transaction. A single database transaction across several steps is gone, and consistency has to be rebuilt from primitives: idempotent consumers, deduplication keys, the transactional outbox, sagas that compensate a completed step with an undo step, and read models that are eventually consistent. This is not free: it is a good part of the work of a project that has been moved to a distributed architecture, and it is invisible in the diagrams.\n\nThe third cost is operational. Every service needs a deployment pipeline, monitoring, alerts, a runbook and a rotation, and on-call for a service that is down at night is a very different thing from on-call for a monolith where one deploy fixes most issues. Before splitting, count the services you can afford to operate: a team that can run three services well usually produces a better product than the same team running twelve badly.',
            'Каждый вызов, пересекающий границу процесса, может упасть так, как внутрипроцессный не упадёт. Он может истекти по таймауту уже после того, как работа сделана, и вызывающий не знает, повторять ли. Он может выполниться на сервере и потеряться в сети, и сообщение будет доставлено дважды. Он может попасть к потребителю старой версии, который не понимает новое поле. Всё это не баги в коде, а свойства сети, и архитектура обязана учитывать их явно.\n\nВторая цена — потеря транзакции. Единой транзакции базы данных на несколько шагов больше нет, и согласованность строят заново из примитивов: идемпотентные потребители, ключи дедупликации, транзакционный outbox, саги, которые компенсируют завершённый шаг отменяющим, и модели чтения с итоговой согласованностью. Это не бесплатно: это добрая часть работы проекта, который перевели в распределённую архитектуру, и на диаграммах её не видно.\n\nТретья цена — эксплуатационная. Каждому сервису нужны пайплайн, мониторинг, алерты, runbook и дежурство, а ночное дежурство при упавшем сервисе — совсем не то же, что дежурство у монолита, где один деплой чинит большинство проблем. Перед выделением посчитайте сервисы, которые вы потянете: команда, способная качественно вести три сервиса, обычно делает продукт лучше, чем та же команда, ведущая двенадцать плохо.'
          ),
          bullets: [
            L('A network call can succeed on the server and fail on the way back.', 'Сетевой вызов может выполниться на сервере и пропасть на обратном пути.'),
            L('Without a transaction, consistency is rebuilt from primitives.', 'Без транзакции согласованность строят заново из примитивов.'),
            L('Every service carries an operational cost, not only a code cost.', 'Каждый сервис несёт эксплуатационную цену, а не только кодовую.'),
            L('Count the services you can operate before splitting.', 'Посчитайте сервисы, которые вы потянете, до того как делить.'),
          ],
          code: `// the price of a boundary: handle the uncertain outcome
try {
  await payments.charge(amount, { idempotencyKey: orderId });
} catch (e) {
  if (e.code === 'TIMEOUT') {
    await payments.checkStatus(orderId); // the charge may have gone through
  } else {
    throw e;
  }
}`,
          takeaway: L(
            'Distribution replaces a function call with a possibility, and the design has to be built for that possibility.',
            'Распределение заменяет вызов функции возможностью, и архитектура должна быть построена под эту возможность.'
          ),
        },
      ],
    },
    {
      id: 'architecture-ch5',
      title: L('Cross-cutting concerns', 'Сквозные аспекты'),
      summary: L(
        'Configuration, errors, logging, transactions, idempotency, resilience, observability, flags and testing: the concerns that cut across every module.',
        'Конфигурация, ошибки, логирование, транзакции, идемпотентность, отказоустойчивость, наблюдаемость, флаги и тестирование: аспекты, проходящие через все модули.'
      ),
      sections: [
        {
          id: 'architecture-ch5-s1',
          title: L('Configuration and feature flags', 'Конфигурация и feature-флаги'),
          body: L(
            'Configuration is the set of values that differ between environments: connection strings, feature switches, limits, endpoints. It should be read in one place, validated once at startup, and exposed to the code as a typed object. Reading process.env directly in twenty modules produces two problems: typos become runtime failures in one code path only, and the list of what can be configured is invisible, so nobody knows what can be tuned in production. Validating at startup with a schema library turns all of that into a fast, loud failure before the first request is served.\n\nFeature flags deserve separate treatment because they are configuration with a lifecycle. A flag lets you ship a change disabled and enable it gradually, which decouples deployment from release and is the standard way to reduce the blast radius of a risky change. But every flag is a branch in the code, and the number of possible combinations of flags grows faster than the number of flags, so the test matrix explodes. The discipline that keeps this manageable: every flag has an owner, a reason, a creation date and an expiry date, and the branch is removed when the flag is removed. A flag without an expiry date is a permanent branch, and permanent branches are how a simple feature becomes an unreadable maze of conditionals.\n\nFlags also interact with testing and observability. A flag that is on for one percent of the users is a code path that most of your tests never exercise, so the risky paths need their own tests with the flag forced on. And every log line and metric should carry the flag values that shaped it, otherwise you will be staring at an anomaly wondering which variant produced it.',
            'Конфигурация — это набор значений, различающихся между окружениями: строки подключения, переключатели функций, лимиты, адреса сервисов. Её нужно читать в одном месте, валидировать один раз на старте и отдавать коду как типизированный объект. Чтение process.env напрямую в двадцати модулях даёт две проблемы: опечатка превращается в рантайм-сбой только на одном пути, а список того, что вообще можно настроить, становится невидимым, и никто не знает, что можно крутить в production. Валидация по схеме на старте превращает всё это в быструю и громкую ошибку до первого запроса.\n\nFeature-флаги заслуживают отдельного разговора, потому что это конфигурация с жизненным циклом. Флаг позволяет задеплоить изменение выключенным и включать его постепенно, разводя деплой и релиз, и это стандартный способ уменьшить последствия рискованного изменения. Но каждый флаг — это ветвление в коде, а число комбинаций флагов растёт быстрее числа самих флагов, так что матрица тестов взрывается. Дисциплина, которая это удерживает: у каждого флага есть владелец, причина, дата создания и дата удаления, а ветка исчезает вместе с флагом. Флаг без даты удаления — это вечное ветвление, и именно из вечных веток простая функция превращается в нечитаемый лабиринт условий.\n\nФлаги ещё и взаимодействуют с тестами и наблюдаемостью. Флаг, включённый для одного процента пользователей, — это путь в коде, который почти не задевают ваши тесты, значит, опасные ветки нужно тестировать отдельно с принудительно включённым флагом. И каждая строка лога и каждая метрика должны нести значения флагов, которые на неё повлияли, иначе вы будете смотреть на аномалию и гадать, какой вариант её породил.'
          ),
          bullets: [
            L('Read the configuration once, validate it at startup, expose it as a typed object.', 'Читайте конфигурацию один раз, валидируйте на старте и отдавайте типизированным объектом.'),
            L('A missing variable must stop the process, not one request.', 'Отсутствующая переменная должна останавливать процесс, а не один запрос.'),
            L('Every flag needs an owner and an expiry date.', 'У каждого флага должны быть владелец и дата удаления.'),
            L('Log the flag values together with the event they shaped.', 'Логируйте значения флагов вместе с событием, которое они изменили.'),
          ],
          code: `const Config = z.object({
  DATABASE_URL: z.string().url(),
  PAYMENT_TIMEOUT_MS: z.coerce.number().int().positive().default(2000),
  FEATURE_NEW_CHECKOUT: z.coerce.boolean().default(false),
});

export const config = Config.parse(process.env); // fails fast on boot`,
          takeaway: L(
            'Configuration is validated once at startup, and a flag without an expiry date is a permanent branch.',
            'Конфигурация валидируется один раз на старте, а флаг без даты удаления — это вечное ветвление.'
          ),
        },
        {
          id: 'architecture-ch5-s2',
          title: L('Errors, logging and observability', 'Ошибки, логи и наблюдаемость'),
          body: L(
            'Errors are part of the architecture, not an afterthought. The useful distinction is between expected and unexpected failures. An expected failure is a business situation that the user can act on: the card was declined, the seat is taken, the promo code expired. It is a result, not a crash, and it is usually modelled as a value in the domain, for example a Result or a discriminated union, so the type system forces every caller to handle it. An unexpected failure is a bug or an outage, and it propagates up to the boundary, where the framework turns it into a 500 with a correlation id.\n\nLogging is the raw material of observability, and the format matters more than the library. A log line should answer who, what, when and where in a single line, with the identifiers you will actually search by: the request id, the user id, the order id, the service name. String concatenation loses the fields and makes the log impossible to filter; structured logging keeps them as fields, so the log platform can group and count them. And the rule about what not to log is simple and absolute: no passwords, no tokens, no card numbers, and personal data only when there is a reason to have it.\n\nThe three pillars of observability complement each other. Metrics tell you that something is wrong and roughly how bad it is: request rate, error rate, latency percentiles, queue depth, saturation. Logs tell you what happened in that particular request. Traces tell you where the time went when the request crossed several services. Dashboards and alerts are built on metrics, because they have to work without a human reading them, and the investigation afterwards uses logs and traces. The correlation id that the request receives at the edge is what ties the three together.',
            'Ошибки — часть архитектуры, а не что-то второстепенное. Полезно различать ожидаемые и неожиданные сбои. Ожидаемый сбой — это бизнес-ситуация, на которую пользователь может отреагировать: карту отклонили, место занято, промокод истёк. Это результат, а не авария, и обычно он моделируется как значение в домене, например Result или размеченное объединение, чтобы система типов заставляла каждого вызывающего его обработать. Неожиданный сбой — это баг или авария, и он поднимается до границы, где фреймворк превращает его в 500 с correlation id.\n\nЛогирование — сырьё наблюдаемости, и формат здесь важнее библиотеки. Строка лога должна отвечать на вопросы кто, что, когда и где в одной строке, с идентификаторами, по которым реально ищут: request id, user id, order id, имя сервиса. Склейка строк теряет поля и делает лог нефильтруемым, а структурное логирование сохраняет их полями, и платформа может их группировать и считать. И правило о том, что не логировать, простое и абсолютное: никаких паролей, токенов, номеров карт, а персональные данные — только когда есть причина их иметь.\n\nТри столпа наблюдаемости дополняют друг друга. Метрики говорят, что что-то сломалось и насколько: частота запросов, доля ошибок, перцентили задержки, глубина очереди, насыщенность. Логи говорят, что именно произошло в этом конкретном запросе. Трейсы показывают, куда ушло время, когда запрос прошёл через несколько сервисов. Дашборды и алерты строятся на метриках, потому что они должны работать без человека, а расследование потом идёт по логам и трейсам. Связывает всё correlation id, который запрос получает на периметре.'
          ),
          bullets: [
            L('Expected failures are values, not exceptions.', 'Ожидаемые сбои — это значения, а не исключения.'),
            L('Use structured logging with the ids you will search by.', 'Используйте структурные логи с идентификаторами, по которым будете искать.'),
            L('Never log secrets, tokens or card numbers.', 'Никогда не логируйте секреты, токены и номера карт.'),
            L('Metrics alert, logs and traces explain.', 'Метрики поднимают алерт, логи и трейсы объясняют причину.'),
          ],
          code: `logger.error('payment.failed', {
  requestId,
  orderId,
  provider: 'stripe',
  reason: 'card_declined',
  // no card number, no token, ever
});`,
          takeaway: L(
            'An error is either a business result you must handle or a bug you must see; the logging format decides which you get.',
            'Ошибка — это либо бизнес-результат, который надо обработать, либо баг, который надо увидеть, и формат логов решает, что вы получите.'
          ),
        },
        {
          id: 'architecture-ch5-s3',
          title: L('Transactions, outbox and idempotency', 'Транзакции, outbox и идемпотентность'),
          body: L(
            'A transaction is the simplest consistency tool you have, and it is worth using it for everything that happens in one database. The moment a business operation has to change state in two different systems, the transaction is no longer available, and the design has to say what should happen when the second step fails. The usual answer is the saga: each step has a compensating action, and a failure in one step triggers the undo of the completed ones. Sagas work, but they need explicit compensation logic, they leave the data in an intermediate state for a while, and they are much harder to reason about than a transaction.\n\nThe transactional outbox removes the hardest part of the saga: the message publication. Instead of writing the state and then publishing an event, you write both in the same database transaction, one to the business tables and one to an outbox table. A separate process reads the outbox and publishes the events, deleting the rows as it goes. Now the state and the event cannot diverge: either both are committed or neither is. The remaining problem is that the publisher can crash after sending and before deleting, which means the event can be published twice. That is not a bug, it is the reason every consumer of an event has to be idempotent.\n\nIdempotency is therefore a property you design in, not a property you hope for. A consumer that applies the same event twice must produce the same result as applying it once. The usual technique is a deduplication key: the event carries a unique identifier, the consumer stores the identifiers it has already processed, and a repeated event is recognised and skipped. On the HTTP side the same idea appears as the Idempotency-Key header, where the server stores the result of the first request and replays it for any repeat. The rule is: any operation that can be retried must be safe to retry.',
            'Транзакция — самый простой инструмент согласованности, и ею стоит покрывать всё, что происходит в одной базе. Как только бизнес-операция должна изменить состояние в двух системах, транзакция недоступна, и архитектура обязана ответить, что будет, если второй шаг не удался. Обычный ответ — сага: у каждого шага есть компенсирующее действие, и сбой одного шага запускает отмену выполненных. Саги работают, но требуют явной логики компенсации, оставляют данные в промежуточном состоянии и куда сложнее для рассуждения, чем транзакция.\n\nТранзакционный outbox убирает самую трудную часть саги: публикацию сообщения. Вместо того чтобы писать состояние и затем публиковать событие, пишут оба в одной транзакции — в бизнес-таблицы и в таблицу outbox. Отдельный процесс читает outbox, публикует события и удаляет строки. Теперь состояние и событие не могут разойтись: либо закоммичены оба, либо ни одно. Оставшаяся проблема — издатель может упасть после отправки и до удаления, и тогда событие уйдёт дважды. Это не баг, а причина, по которой любой потребитель события обязан быть идемпотентным.\n\nИдемпотентность, следовательно, не свойство, на которое надеются, а свойство, которое проектируют. Потребитель, применивший одно и то же событие дважды, должен получить тот же результат, что и при однократном применении. Обычный приём — ключ дедупликации: событие несёт уникальный идентификатор, потребитель хранит уже обработанные идентификаторы, а повтор распознаётся и пропускается. На стороне HTTP то же самое выглядит как заголовок Idempotency-Key, где сервер хранит результат первого запроса и отдаёт его на повтор. Правило: любая операция, которую можно повторить, должна быть безопасна при повторе.'
          ),
          bullets: [
            L('Use a transaction for everything inside one database.', 'Используйте транзакцию для всего, что внутри одной базы.'),
            L('The outbox writes the state and the event in one transaction.', 'Outbox пишет состояние и событие в одной транзакции.'),
            L('Publishing twice is normal, so consumers must be idempotent.', 'Публикация дважды — норма, поэтому потребители должны быть идемпотентными.'),
            L('Deduplicate by a unique event identifier, not by payload comparison.', 'Дедуплицируйте по уникальному идентификатору события, а не по сравнению payload.'),
          ],
          code: `// write the state and the event together
await db.transaction(async (t) => {
  await t.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);
  await t.query('INSERT INTO outbox (id, type, payload) VALUES ($1, $2, $3)', [
    eventId, 'OrderPaid', JSON.stringify({ orderId, amount }),
  ]);
});

// consume: skip what was already processed
if (await seen.has(eventId)) return;
await handle(event);
await seen.add(eventId);`,
          takeaway: L(
            'Write the state and the event in one transaction, then make every consumer safe to repeat.',
            'Пишите состояние и событие в одной транзакции и делайте каждого потребителя безопасным при повторе.'
          ),
        },
        {
          id: 'architecture-ch5-s4',
          title: L('Timeouts, retries and circuit breakers', 'Таймауты, повторы и предохранители'),
          body: L(
            'Any call that crosses a process boundary must have a timeout, and the timeout must be shorter than the budget of the caller. A TCP connection can stay open for minutes while the peer is stuck, and a request without a timeout holds the resources of the caller — a thread, a connection from the pool, a slot in the concurrency limit — until the operating system gives up. In a busy system a single slow dependency exhausts the pool and the whole service stops serving, even though only one downstream call is broken.\n\nRetries are the natural response to a transient failure, but a naive retry is harmful. Retrying immediately turns a partial outage into a full one, because every client hammers the dependency exactly when it is struggling to recover. The standard recipe is exponential backoff with jitter: wait longer after each attempt, add randomness so that clients do not retry in lockstep, and cap the number of attempts. And the most important rule is that you may only retry an operation that is safe to repeat, which is exactly what the idempotency key from the previous section is for. Retrying a non-idempotent charge without a key means charging the customer twice.\n\nA circuit breaker is the third tool and it works at a different level. It watches the failures of a dependency and, after a threshold, opens: calls fail immediately instead of waiting for a timeout, which protects both the caller and the dependency. After a cool-down it lets a few probe requests through, and if they succeed it closes again. The companion pattern is the bulkhead, which gives each dependency its own pool of threads or connections, so that a slow dependency cannot exhaust the resources of the whole service.',
            'Любой вызов, пересекающий границу процесса, обязан иметь таймаут, и таймаут должен быть короче бюджета вызывающего. TCP-соединение может висеть минутами, пока собеседник завис, а запрос без таймаута держит ресурсы вызывающего — поток, соединение из пула, слот в лимите параллелизма — до тех пор, пока операционная система не сдаст. В загруженной системе одна медленная зависимость исчерпывает пул, и сервис перестаёт обслуживать, хотя сломан только один внешний вызов.\n\nПовторы — естественный ответ на временный сбой, но наивный повтор вреден. Мгновенный повтор превращает частичную аварию в полную, потому что все клиенты бьют по зависимости ровно тогда, когда ей тяжело. Стандартный рецепт — экспоненциальная задержка с джиттером: ждать дольше после каждой попытки, добавлять случайность, чтобы клиенты не повторяли синхронно, и ограничивать число попыток. И главнейшее правило: повторять можно только операцию, безопасную при повторе, и это ровно тот случай, для которого нужен ключ идемпотентности. Повтор списания без ключа означает двойное списание.\n\nПредохранитель (circuit breaker) — третий инструмент, и работает он на другом уровне. Он следит за сбоями зависимости и после порога размыкается: вызовы падают сразу, не дожидаясь таймаута, что защищает и вызывающего, и саму зависимость. После паузы он пропускает несколько пробных запросов и, если они успешны, замыкается. Парный паттерн — bulkhead, который выделяет каждой зависимости собственный пул потоков или соединений, чтобы медленная зависимость не исчерпала ресурсы всего сервиса.'
          ),
          bullets: [
            L('A timeout must be shorter than the budget of the caller.', 'Таймаут должен быть короче бюджета вызывающего.'),
            L('A timeoutless call holds caller resources until the OS gives up.', 'Вызов без таймаута держит ресурсы вызывающего до отказа операционной системы.'),
            L('Retry only idempotent operations, with backoff and jitter.', 'Повторяйте только идемпотентные операции, с задержкой и джиттером.'),
            L('A circuit breaker fails fast; a bulkhead isolates the resources.', 'Предохранитель отвечает быстрым отказом, bulkhead изолирует ресурсы.'),
          ],
          code: `// resilient call
await httpClient.get(url, {
  timeout: 2000,          // shorter than our own budget
  retries: 3,
  backoff: 'exponential',
  jitter: true,
  idempotencyKey: orderId, // makes the retry safe
});`,
          takeaway: L(
            'Timeout, then a safe retry with backoff, then a breaker: three layers that stop one slow dependency from taking the service down.',
            'Таймаут, безопасный повтор с задержкой, затем предохранитель: три слоя, которые не дают одной медленной зависимости положить сервис.'
          ),
        },
        {
          id: 'architecture-ch5-s5',
          title: L('Testing the architecture', 'Тестирование архитектуры'),
          body: L(
            'The test strategy follows the architecture. The domain is tested with plain unit tests: no mocks, no setup, just objects and rules, and these are the tests that run fastest and describe the business most clearly. The use cases are tested with fakes for the ports, which is where the ports pay off: an in-memory repository and a fake payment gateway, so the scenario is verified without a database. The adapters are tested with integration tests against the real infrastructure in containers, because the interesting bugs there are mismatches between the code and the actual system, and a mock would hide exactly those. A handful of end-to-end tests cover the contracts that matter most across the whole system.\n\nThe architecture itself is tested separately, and this is the part teams forget. The rules that were written down — no imports from infrastructure into the domain, no feature importing another feature internals, no module reaching into the shared layer the wrong way — are checked mechanically, by a lint rule, a dependency test that parses the import graph, or a contract test between two modules that verifies the shape of what one publishes for the other. These tests are cheap, they run on every pull request, and they are the only thing that stops the structure from eroding while the team is busy shipping.\n\nThe sequence also matters. When you adopt a new layer or a new module, write the boundary test first, even before the first feature lands in it. It is a statement of intent that costs ten lines, and it makes the first violation fail the build instead of becoming the new normal. The same goes for the composition root: a test that the application can be built with all fakes is a smoke test for the wiring, which is the part of the architecture that is usually only exercised in production.',
            'Стратегия тестирования следует за архитектурой. Домен тестируется обычными юнит-тестами: без моков и без подготовки, только объекты и правила, и эти тесты выполняются быстрее всего и яснее всего описывают бизнес. Сценарии тестируются фейками портов, и вот тут порты окупаются: репозиторий в памяти и фейк платёжного шлюза, так что сценарий проверяется без базы. Адаптеры тестируются интеграционными тестами против настоящей инфраструктуры в контейнерах, потому что интересные баги там — это расхождения между кодом и реальной системой, и мок скрыл бы именно их. Несколько end-to-end тестов закрывают контракты, важные для всей системы.\n\nСаму архитектуру тестируют отдельно, и это то, что команды забывают. Правила, записанные в документе — никаких импортов из infrastructure в домен, никаких импортов внутренностей другой фичи, никаких обращений к общему слою не с той стороны — проверяются механически: правилом линтера, тестом зависимостей, разбирающим граф импортов, или контрактным тестом между двумя модулями, проверяющим форму того, что один публикует для другого. Эти тесты дешёвые, гоняются на каждом пул-реквесте и это единственное, что останавливает структуру от размытия, пока команда занята выпуском.\n\nПорядок тоже важен. Когда вы вводите новый слой или новый модуль, сначала напишите тест на границу, ещё до первого фичи внутри. Это заявление о намерении в десять строк, и благодаря ему первое же нарушение уронит сборку, а не станет новой нормой. То же и с точкой композиции: тест, что приложение собирается со всеми фейками, — это дымовой тест связывания, той части архитектуры, которая обычно проверяется только в production.'
          ),
          bullets: [
            L('Domain: unit tests. Use cases: fakes for the ports. Adapters: integration tests.', 'Домен — юнит-тесты, сценарии — фейки портов, адаптеры — интеграционные тесты.'),
            L('End-to-end tests cover only the contracts that matter most.', 'End-to-end тесты покрывают только самые важные контракты.'),
            L('Architecture rules are checked by lint and dependency tests.', 'Архитектурные правила проверяются линтером и тестами зависимостей.'),
            L('Write the boundary test before the first feature lands in the module.', 'Напишите тест границы до того, как в модуль попадёт первая фича.'),
          ],
          code: `// an architecture test: a rule that holds for the whole codebase
it('the domain must not import infrastructure', async () => {
  const violations = await findImports('src/domain', (from, to) =>
    to.startsWith('src/infrastructure'));
  expect(violations).toEqual([]);
});`,
          takeaway: L(
            'The architecture is tested like the code: unit tests for the rules, fakes for the ports, integration tests for the adapters, and a mechanical check for the boundaries.',
            'Архитектура тестируется как код: юнит-тесты правил, фейки портов, интеграционные тесты адаптеров и механическая проверка границ.'
          ),
        },
      ],
    },
  ],
};
