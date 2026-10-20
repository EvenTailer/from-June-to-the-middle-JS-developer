import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureTasks: PracticeTask[] = [
  {
    id: 'topic-architecture-1',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'basic',
    title: L('Split a fat controller into layers', 'Разделить толстый контроллер на слои'),
    brief: L(
      'The route handler "POST /orders" does everything at once: it validates the body, checks the stock, computes the total, writes to the database and formats the HTTP response. Split it into three modules: "orders.route.ts" (HTTP only: read the body, call the use case, map the result to a status code), "place-order.usecase.ts" (the business rules: the stock check and the total) and "order.repository.ts" (the only module that touches the database). The dependency direction must be one way: the route imports the use case, the use case imports the repository, and the repository imports neither of them. The use case receives the repository through its constructor and must not import "db" directly. The handler must answer 201 with the body { id, totalCents } for a successful order and 409 with the body { error: "OUT_OF_STOCK" } when the requested quantity exceeds the stock. Example: the body { "sku": "A-1", "qty": 2, "priceCents": 1000 } with a stock of 5 gives 201 and { "id": "ord_1", "totalCents": 2000 }, and the same body with a stock of 1 gives 409 and { "error": "OUT_OF_STOCK" }.',
      'Обработчик маршрута "POST /orders" делает всё сразу: проверяет тело, смотрит остаток на складе, считает сумму, пишет в базу и формирует HTTP-ответ. Разделите его на три модуля: "orders.route.ts" (только HTTP: прочитать тело, вызвать use case, превратить результат в код ответа), "place-order.usecase.ts" (бизнес-правила: проверка остатка и сумма) и "order.repository.ts" (единственный модуль, который ходит в базу). Направление зависимостей должно быть односторонним: маршрут импортирует use case, use case импортирует репозиторий, а репозиторий не импортирует ни того, ни другого. Use case получает репозиторий через конструктор и не должен импортировать "db" напрямую. Обработчик должен отвечать 201 с телом { id, totalCents } при успешном заказе и 409 с телом { error: "OUT_OF_STOCK" }, когда запрошенное количество больше остатка. Пример: тело { "sku": "A-1", "qty": 2, "priceCents": 1000 } при остатке 5 даёт 201 и { "id": "ord_1", "totalCents": 2000 }, а то же тело при остатке 1 даёт 409 и { "error": "OUT_OF_STOCK" }.'
    ),
    hint: L(
      'Give the use case a constructor that takes the repository, and let the route create the use case with the concrete implementation. The route owns the status code, because HTTP is not a business concept, and the use case owns the business error.',
      'Дайте use case конструктор, который принимает репозиторий, а маршрут пусть создаёт use case с конкретной реализацией. Код ответа выбирает маршрут, потому что HTTP не является бизнес-понятием, а бизнес-ошибкой владеет use case.'
    ),
    solution: `// order.repository.ts
export interface OrderRepository {
  getStock(sku: string): Promise<number>;
  save(order: { id: string; sku: string; qty: number; totalCents: number }): Promise<void>;
}

export class PostgresOrderRepository implements OrderRepository {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getStock(sku: string): Promise<number> {
    const { rows } = await this.db.query('SELECT stock FROM stock WHERE sku = $1', [sku]);
    return rows[0]?.stock ?? 0;
  }

  async save(order: { id: string; sku: string; qty: number; totalCents: number }): Promise<void> {
    await this.db.query('INSERT INTO orders (id, sku, qty, total_cents) VALUES ($1, $2, $3, $4)', [
      order.id,
      order.sku,
      order.qty,
      order.totalCents,
    ]);
  }
}

// place-order.usecase.ts
import type { OrderRepository } from './order.repository';

export class OutOfStockError extends Error {
  readonly sku: string;

  constructor(sku: string) {
    super(\`Out of stock: \${sku}\`);
    this.name = 'OutOfStockError';
    this.sku = sku;
  }
}

export class PlaceOrder {
  private readonly orders: OrderRepository;

  constructor(orders: OrderRepository) {
    this.orders = orders;
  }

  async execute(input: { id: string; sku: string; qty: number; priceCents: number }) {
    const stock = await this.orders.getStock(input.sku);
    if (stock < input.qty) {
      throw new OutOfStockError(input.sku);
    }

    const order = { ...input, totalCents: input.priceCents * input.qty };
    await this.orders.save(order);
    return order;
  }
}

// orders.route.ts
import { PlaceOrder, OutOfStockError } from './place-order.usecase';
import { PostgresOrderRepository } from './order.repository';

const placeOrder = new PlaceOrder(new PostgresOrderRepository());

export async function postOrders(req: Request, res: Response): Promise<void> {
  const { sku, qty, priceCents } = req.body;

  try {
    const order = await placeOrder.execute({ id: \`ord_\${Date.now()}\`, sku, qty, priceCents });
    res.status(201).json({ id: order.id, totalCents: order.totalCents });
  } catch (error) {
    if (error instanceof OutOfStockError) {
      res.status(409).json({ error: 'OUT_OF_STOCK' });
      return;
    }
    throw error;
  }
}

// dependency direction, one way only
//
// orders.route.ts  ->  place-order.usecase.ts  ->  order.repository.ts
//    HTTP only            business rules              data access only`,
    explanation: L(
      'The value of the split is not the number of files but the direction of the imports: the arrow only points down, so the business rules cannot reach the HTTP layer and the SQL cannot reach the business rules. Because the use case receives the repository through the constructor, a test can pass a fake implementation and run without a database. The route owns the status code, because the HTTP vocabulary is not a business fact, and the use case owns the error, because a missing product is a business fact. A common mistake is to wrap the whole use case in one try and catch and to answer 500 for every failure, which hides the 409 from the client.',
      'Ценность разделения не в количестве файлов, а в направлении импортов: стрелка указывает только вниз, поэтому бизнес-правила не могут дотянуться до HTTP-слоя, а SQL не может дотянуться до бизнес-правил. Так как use case получает репозиторий через конструктор, в тест можно передать фальшивую реализацию и обойтись без базы. Код ответа принадлежит маршруту, потому что словарь HTTP не является бизнес-фактом, а ошибкой владеет use case, потому что отсутствующий товар — это бизнес-факт. Частая ошибка — обернуть весь use case в один try и catch и отвечать 500 на любую ошибку, из-за чего клиент никогда не увидит 409.'
    ),
  },
  {
    id: 'topic-architecture-2',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'basic',
    title: L('Design a feature based structure with a public API', 'Спроектировать структуру по фичам с публичным API'),
    brief: L(
      'Design the folder structure of a frontend application that groups the code by feature and not by kind. The application has the features "orders", "checkout" and "users", and the shared code "api" (the http client), "ui" (buttons and inputs) and "lib" (helpers for dates and money). Every feature folder contains the subfolders "api" (requests to the server), "model" (types, state, domain rules), "ui" (components) and an "index.ts", which is the only public entry point of the feature. The file "src/features/orders/ui/OrderRow.tsx" must not be importable from another feature: the only allowed form is "import { OrderList } from \'@/features/orders\'". Write the tree of the folders, the contents of "src/features/orders/index.ts" and the ESLint rule that forbids the deep imports. Example: the rule uses "no-restricted-imports" with the pattern "*/features/*/*/*" and the message "Import from the feature entry point".',
      'Спроектируйте структуру папок фронтенд-приложения, которое группирует код по фичам, а не по видам. В приложении есть фичи "orders", "checkout" и "users", а общий код — "api" (http-клиент), "ui" (кнопки и поля ввода) и "lib" (помощники для дат и денег). В каждой папке фичи есть подпапки "api" (запросы к серверу), "model" (типы, состояние, доменные правила), "ui" (компоненты) и "index.ts", который является единственной публичной точкой входа фичи. Файл "src/features/orders/ui/OrderRow.tsx" не должен импортироваться из другой фичи: единственная допустимая форма — "import { OrderList } from \'@/features/orders\'". Напишите дерево папок, содержимое "src/features/orders/index.ts" и правило ESLint, которое запрещает глубокие импорты. Пример: правило использует "no-restricted-imports" с паттерном "*/features/*/*/*" и сообщением "Import from the feature entry point".'
    ),
    hint: L(
      'The index.ts of a feature re-exports only what the rest of the application is allowed to use, and the ESLint pattern with three levels after "features" catches any deep import.',
      'Файл index.ts фичи реэкспортирует только то, чему разрешено пользоваться остальному приложению, а паттерн ESLint с тремя уровнями после "features" ловит любой глубокий импорт.'
    ),
    solution: `src/
  app/
    App.tsx
    routes.tsx
  features/
    orders/
      api/
        ordersApi.ts
      model/
        order.ts
        orderStore.ts
      ui/
        OrderList.tsx
        OrderRow.tsx
      index.ts
    checkout/
      api/
      model/
      ui/
      index.ts
    users/
      api/
      model/
      ui/
      index.ts
  shared/
    api/
      httpClient.ts
    ui/
      Button.tsx
      Input.tsx
    lib/
      money.ts
      date.ts
  main.tsx

// src/features/orders/index.ts
export { OrderList } from './ui/OrderList';
export { orderApi } from './api/ordersApi';
export type { Order, OrderStatus } from './model/order';

// eslint.config.js
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*/features/*/*/*'],
              message: 'Import from the feature entry point: import { ... } from "@/features/<name>".',
            },
          ],
        },
      ],
    },
  },
];`,
    explanation: L(
      'Grouping by feature means that a feature can be deleted together with one folder delete, and that the name of the folder tells where a piece of code belongs. The index.ts is the public API of the feature: it is the contract that tells the rest of the application what the feature offers, and it lets the internal structure change without touching the consumers. The ESLint rule is what makes the rule real, because without it any developer can still reach into the ui folder and the boundary slowly disappears. A shared folder is not a dumping ground: it holds only the code without domain meaning, while a business rule used by two features often deserves its own place in the domain layer.',
      'Группировка по фичам означает, что фичу можно удалить вместе с одной папкой, а имя папки подсказывает, где лежит кусок кода. Файл index.ts — это публичный API фичи: контракт, который говорит остальному приложению, что фича предлагает, и позволяет менять внутреннее устройство, не трогая потребителей. Правило ESLint превращает договорённость в реальность, потому что без него любой разработчик всё равно может залезть внутрь ui, и граница постепенно растворяется. Папка shared не является свалкой: в ней только код без доменного смысла, а бизнес-правило, которое используют две фичи, часто заслуживает своего места в доменном слое.'
    ),
  },
  {
    id: 'topic-architecture-3',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'basic',
    title: L('Write a port and two adapters for a payment gateway', 'Написать порт и два адаптера для платёжного шлюза'),
    brief: L(
      'Define the port "PaymentGateway" with one method "charge(input: { orderId: string; amountCents: number; cardToken: string })" that resolves to either { status: "paid", receiptId: string } or { status: "declined", reason: string }. Write two adapters that implement it: "InMemoryPaymentGateway", which always returns the paid result and builds the receipt id as "rcpt_" plus the order id, and "HttpPaymentGateway", which sends a POST request to the path "/payments" with the JSON body { amountCents, cardToken, orderId } and maps the response { "receiptId": "..." } to the paid result and the response { "declined": true, "reason": "..." } to the declined result. Then write the use case "checkout(order, gateway)", which depends only on the port: it must not import either adapter, must not call "fetch" and must return { ok: false, reason } when the gateway declines. Example: with the in-memory adapter "checkout({ id: "ord_1", amountCents: 1000 }, gateway)" returns { ok: true, receiptId: "rcpt_ord_1" }, and with a declining gateway it returns { ok: false, reason: "insufficient funds" }.',
      'Определите порт "PaymentGateway" с одним методом "charge(input: { orderId: string; amountCents: number; cardToken: string })", который возвращает либо { status: "paid", receiptId: string }, либо { status: "declined", reason: string }. Напишите два адаптера, реализующих порт: "InMemoryPaymentGateway", который всегда возвращает успешный результат и строит идентификатор чека как "rcpt_" плюс идентификатор заказа, и "HttpPaymentGateway", который отправляет POST-запрос на путь "/payments" с JSON-телом { amountCents, cardToken, orderId } и превращает ответ { "receiptId": "..." } в успешный результат, а ответ { "declined": true, "reason": "..." } — в отказ. Затем напишите use case "checkout(order, gateway)", который зависит только от порта: он не должен импортировать ни один адаптер, не должен вызывать "fetch" и должен возвращать { ok: false, reason }, когда шлюз отклоняет платёж. Пример: с адаптером в памяти "checkout({ id: "ord_1", amountCents: 1000 }, gateway)" возвращает { ok: true, receiptId: "rcpt_ord_1" }, а с отклоняющим шлюзом — { ok: false, reason: "insufficient funds" }.'
    ),
    hint: L(
      'The port declares only what the business needs, so the HTTP status codes, the headers and the names of the JSON fields stay inside the HTTP adapter. The place where an adapter is chosen is the composition root, not the use case.',
      'Порт описывает только то, что нужно бизнесу, поэтому HTTP-коды, заголовки и имена JSON-полей остаются внутри HTTP-адаптера. Место, где выбирается адаптер, — это точка сборки, а не use case.'
    ),
    solution: `// payment-gateway.port.ts
export type ChargeInput = { orderId: string; amountCents: number; cardToken: string };

export type ChargeResult =
  | { status: 'paid'; receiptId: string }
  | { status: 'declined'; reason: string };

export interface PaymentGateway {
  charge(input: ChargeInput): Promise<ChargeResult>;
}

// adapters/in-memory-payment-gateway.ts
import type { ChargeInput, ChargeResult, PaymentGateway } from '../payment-gateway.port';

export class InMemoryPaymentGateway implements PaymentGateway {
  async charge(input: ChargeInput): Promise<ChargeResult> {
    return { status: 'paid', receiptId: \`rcpt_\${input.orderId}\` };
  }
}

// adapters/http-payment-gateway.ts
import type { ChargeInput, ChargeResult, PaymentGateway } from '../payment-gateway.port';

export class HttpPaymentGateway implements PaymentGateway {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(baseUrl: string, fetchImpl: typeof fetch = fetch) {
    this.baseUrl = baseUrl;
    this.fetchImpl = fetchImpl;
  }

  async charge(input: ChargeInput): Promise<ChargeResult> {
    const response = await this.fetchImpl(\`\${this.baseUrl}/payments\`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        amountCents: input.amountCents,
        cardToken: input.cardToken,
        orderId: input.orderId,
      }),
    });

    const data = await response.json();
    if (data.declined) {
      return { status: 'declined', reason: data.reason };
    }
    return { status: 'paid', receiptId: data.receiptId };
  }
}

// usecases/checkout.ts
import type { PaymentGateway } from '../payment-gateway.port';

export async function checkout(
  order: { id: string; amountCents: number; cardToken: string },
  gateway: PaymentGateway
): Promise<{ ok: true; receiptId: string } | { ok: false; reason: string }> {
  const result = await gateway.charge({
    orderId: order.id,
    amountCents: order.amountCents,
    cardToken: order.cardToken,
  });

  if (result.status === 'declined') {
    return { ok: false, reason: result.reason };
  }
  return { ok: true, receiptId: result.receiptId };
}

// composition-root.ts
const gateway = process.env.NODE_ENV === 'test'
  ? new InMemoryPaymentGateway()
  : new HttpPaymentGateway('https://payments.example.com');

const result = await checkout({ id: 'ord_1', amountCents: 1000, cardToken: 'tok_1' }, gateway);`,
    explanation: L(
      'The port belongs to the business side: it is written in the words of the domain (charge, receipt) and knows nothing about HTTP. The two adapters are interchangeable, so the same use case runs against the fake gateway in the tests and against the real service in production, and the tests need no network. The composition root is the only place where an adapter is chosen, and that is where lives a dependency injection container or a simple constructor call. A common mistake is to put the fetch call inside the use case, which makes the use case impossible to test and forces every new payment provider into a growing if statement.',
      'Порт принадлежит бизнес-стороне: он написан словами домена (charge, receipt) и ничего не знает про HTTP. Два адаптера взаимозаменяемы, поэтому один и тот же use case работает и с фальшивым шлюзом в тестах, и с настоящим сервисом в продакшене, и тестам не нужна сеть. Точка сборки — единственное место, где выбирается адаптер, и там же живёт контейнер внедрения зависимостей или простой вызов конструктора. Частая ошибка — спрятать вызов fetch внутри use case, после чего use case невозможно протестировать, а каждая новая платёжная система добавляется в растущий if.'
    ),
  },
  {
    id: 'topic-architecture-4',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'intermediate',
    title: L('Extract a UserRepository from code that queries the database', 'Вынести UserRepository из кода, который ходит в базу'),
    brief: L(
      'The file "src/services/userService.ts" talks to the database directly: it imports "db" from "../db" and runs "db.query(\'SELECT * FROM users WHERE id = $1\', [id])" and "db.query(\'INSERT INTO users (email, name) VALUES ($1, $2)\', [email, name])". Extract a "UserRepository" interface with the methods "findById(id)", "findByEmail(email)" and "create({ email, name })", all asynchronous and all returning a "User" object { id, email, name }. Move the SQL into a "PostgresUserRepository" class that implements the interface, and make the service depend on the interface through its constructor. Write the module layout before and after the refactoring and the import graph of both states. After the refactoring the service must not import "db" and must not contain the word "SELECT". Example: before, the service has the line "import { db } from \'../db\';" and the call "await db.query(\'SELECT * FROM users WHERE id = $1\', [id])"; after, the constructor of the service takes a "UserRepository" and the SQL lives only in "src/repositories/postgresUserRepository.ts".',
      'Файл "src/services/userService.ts" ходит в базу напрямую: он импортирует "db" из "../db" и выполняет "db.query(\'SELECT * FROM users WHERE id = $1\', [id])" и "db.query(\'INSERT INTO users (email, name) VALUES ($1, $2)\', [email, name])". Выделите интерфейс "UserRepository" с методами "findById(id)", "findByEmail(email)" и "create({ email, name })", все асинхронные и все возвращающие объект "User" { id, email, name }. Перенесите SQL в класс "PostgresUserRepository", реализующий интерфейс, и сделайте так, чтобы сервис зависел от интерфейса через конструктор. Напишите структуру модулей до и после рефакторинга и граф импортов для обоих состояний. После рефакторинга сервис не должен импортировать "db" и не должен содержать слово "SELECT". Пример: до рефакторинга в сервисе есть строка "import { db } from \'../db\';" и вызов "await db.query(\'SELECT * FROM users WHERE id = $1\', [id])"; после рефакторинга конструктор сервиса принимает "UserRepository", а SQL живёт только в "src/repositories/postgresUserRepository.ts".'
    ),
    hint: L(
      'The interface describes the domain and not the table: the method names are findById and create, and the mapping from the snake_case columns to a camelCase object happens inside the implementation.',
      'Интерфейс описывает домен, а не таблицу: имена методов — findById и create, а превращение колонок snake_case в объект в camelCase происходит внутри реализации.'
    ),
    solution: `// before
src/
  db/
    index.ts            // exports the db pool
  services/
    userService.ts      // imports db and runs the SQL by itself

import graph: userService.ts -> db/index.ts

// after
src/
  db/
    index.ts
  repositories/
    userRepository.ts           // the port: interface UserRepository
    postgresUserRepository.ts   // the only file with SQL
  services/
    userService.ts              // depends on the interface only

import graph: userService.ts -> userRepository.ts
             postgresUserRepository.ts -> userRepository.ts
             composition-root.ts -> postgresUserRepository.ts
             composition-root.ts -> userService.ts

// src/repositories/userRepository.ts
export type User = { id: string; email: string; name: string };

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: { email: string; name: string }): Promise<User>;
}

// src/repositories/postgresUserRepository.ts
import type { User, UserRepository } from './userRepository';

type Db = {
  query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>;
};

export class PostgresUserRepository implements UserRepository {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await this.db.query('SELECT id, email, name FROM users WHERE id = $1', [id]);
    return rows[0] ? toUser(rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await this.db.query('SELECT id, email, name FROM users WHERE email = $1', [email]);
    return rows[0] ? toUser(rows[0]) : null;
  }

  async create(input: { email: string; name: string }): Promise<User> {
    const { rows } = await this.db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
      [input.email, input.name]
    );
    return toUser(rows[0]);
  }
}

function toUser(row: Record<string, unknown>): User {
  return { id: String(row.id), email: String(row.email), name: String(row.name) };
}

// src/services/userService.ts
import type { User, UserRepository } from '../repositories/userRepository';

export class UserService {
  private readonly users: UserRepository;

  constructor(users: UserRepository) {
    this.users = users;
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.findById(id);
  }

  async register(email: string, name: string): Promise<User> {
    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new Error('EMAIL_TAKEN');
    }
    return this.users.create({ email, name });
  }
}`,
    explanation: L(
      'The interface is written in the language of the domain, so the service asks for a user by id and does not know that the storage is Postgres. The SQL and the snake_case mapping move behind the interface, which means a change of the table or a switch to another storage touches only the implementation. The service keeps its own business rule (the email must be free), and that rule is now testable with a fake repository in a couple of lines, with no database in the test. The classic mistake is to copy the table shape into the interface: a repository that returns the raw rows leaks the storage into the business layer, and the refactoring has not bought anything.',
      'Интерфейс написан языком домена, поэтому сервис просит пользователя по id и не знает, что хранилище — это Postgres. SQL и преобразование snake_case уезжают за интерфейс, а значит изменение таблицы или переход на другое хранилище трогают только реализацию. Сервис сохраняет своё бизнес-правило (email должен быть свободен), и теперь это правило проверяется фальшивым репозиторием в пару строк, без базы в тестах. Классическая ошибка — скопировать форму таблицы в интерфейс: репозиторий, возвращающий сырые строки, протекает хранилищем в бизнес-слой, и рефакторинг ничего не покупает.'
    ),
  },
  {
    id: 'topic-architecture-5',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'intermediate',
    title: L('Make the order processing idempotent with an outbox', 'Сделать обработку заказа идемпотентной через outbox'),
    brief: L(
      'An order must be created exactly once even if the request is delivered twice, and the event "OrderCreated" must reach the other services without being lost when the database and the broker are two different systems. Write the SQL for the two tables: "orders" with the primary key "id", the column "idempotency_key text NOT NULL UNIQUE" and "total_cents integer NOT NULL", and "outbox" with "id bigserial PRIMARY KEY", "aggregate_id", "event_type", "payload jsonb", "attempts integer NOT NULL DEFAULT 0", "created_at" and "published_at timestamptz", which stays NULL until the event is published. Then write the retry logic of the publisher: it selects the rows with "published_at IS NULL" ordered by id, publishes them to the broker and marks them with the current time, and it retries a failed publish with an exponential backoff of 1, 2, 4 seconds, giving up after 5 attempts and moving the payload to a dead letter table. The order and its outbox row must be written in one transaction, otherwise the event can be lost. Example: two calls with the idempotency key "key-42" insert exactly one row into "orders" and one row into "outbox"; after a successful publish the outbox row has a non NULL "published_at" and is not selected again.',
      'Заказ должен создаваться ровно один раз, даже если запрос доставлен дважды, а событие "OrderCreated" должно доходить до остальных сервисов, не теряясь, когда база и брокер — две разные системы. Напишите SQL для двух таблиц: "orders" с первичным ключом "id", колонками "idempotency_key text NOT NULL UNIQUE" и "total_cents integer NOT NULL", и "outbox" с "id bigserial PRIMARY KEY", "aggregate_id", "event_type", "payload jsonb", "attempts integer NOT NULL DEFAULT 0", "created_at" и "published_at timestamptz", который остаётся NULL до публикации события. Затем напишите логику повторов издателя: он выбирает строки с "published_at IS NULL" по возрастанию id, публикует их в брокер и помечает текущим временем, а при сбое публикации повторяет с экспоненциальной задержкой 1, 2, 4 секунды, сдаётся после 5 попыток и переносит payload в таблицу мёртвых писем. Заказ и его строка outbox должны писаться в одной транзакции, иначе событие может потеряться. Пример: два вызова с idempotency key "key-42" вставляют ровно одну строку в "orders" и одну в "outbox"; после успешной публикации у строки outbox заполнено "published_at" и она больше не выбирается.'
    ),
    hint: L(
      'The unique constraint on the idempotency key is the real protection: the second insert fails with a conflict, and the code catches that error and returns the order that already exists. The outbox row is written in the same transaction as the order, and the publisher marks the row only after the broker confirmed the publish.',
      'Уникальное ограничение на idempotency key — настоящая защита: второй insert падает с конфликтом, и код ловит эту ошибку и возвращает уже существующий заказ. Строка outbox пишется в той же транзакции, что и заказ, а издатель помечает строку только после подтверждения брокера.'
    ),
    solution: `-- schema
CREATE TABLE orders (
  id uuid PRIMARY KEY,
  idempotency_key text NOT NULL UNIQUE,
  total_cents integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  aggregate_id uuid NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

CREATE INDEX outbox_unpublished_idx ON outbox (id) WHERE published_at IS NULL;

CREATE TABLE outbox_dead_letter (
  id bigserial PRIMARY KEY,
  outbox_id bigint NOT NULL,
  payload jsonb NOT NULL,
  error text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

// use case: one transaction, two rows
export async function placeOrder(
  db: Db,
  input: { id: string; idempotencyKey: string; totalCents: number }
): Promise<{ id: string; created: boolean }> {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      'INSERT INTO orders (id, idempotency_key, total_cents) VALUES ($1, $2, $3) ON CONFLICT (idempotency_key) DO NOTHING RETURNING id',
      [input.id, input.idempotencyKey, input.totalCents]
    );

    if (inserted.rowCount === 0) {
      await client.query('ROLLBACK');
      const existing = await db.query('SELECT id FROM orders WHERE idempotency_key = $1', [
        input.idempotencyKey,
      ]);
      return { id: existing.rows[0].id, created: false };
    }

    await client.query(
      'INSERT INTO outbox (aggregate_id, event_type, payload) VALUES ($1, $2, $3)',
      [input.id, 'OrderCreated', JSON.stringify({ orderId: input.id, totalCents: input.totalCents })]
    );

    await client.query('COMMIT');
    return { id: input.id, created: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// publisher with a bounded retry
const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 1000;

export async function publishOutbox(db: Db, broker: Broker): Promise<void> {
  const { rows } = await db.query(
    'SELECT id, event_type, payload, attempts FROM outbox WHERE published_at IS NULL AND attempts < $1 ORDER BY id LIMIT 50',
    [MAX_ATTEMPTS]
  );

  for (const row of rows) {
    try {
      await broker.publish(row.event_type, row.payload);
      await db.query('UPDATE outbox SET published_at = now() WHERE id = $1', [row.id]);
    } catch (error) {
      const attempts = row.attempts + 1;
      await db.query('UPDATE outbox SET attempts = $1 WHERE id = $2', [attempts, row.id]);

      if (attempts >= MAX_ATTEMPTS) {
        await db.query(
          'INSERT INTO outbox_dead_letter (outbox_id, payload, error) VALUES ($1, $2, $3)',
          [row.id, row.payload, String(error)]
        );
      } else {
        await sleep(BASE_DELAY_MS * 2 ** (attempts - 1));
      }
    }
  }
}`,
    explanation: L(
      'Writing the order and the event in one transaction is what removes the gap between the two systems: either both rows exist or neither does. The unique constraint on the idempotency key is what makes a repeated request harmless, and the ON CONFLICT DO NOTHING plus the lookup of the existing row returns the same answer as the first call. The publisher is a separate process that can be restarted at any moment, because a message that is published but not marked is published twice, and the consumers have to be idempotent anyway. The backoff of 1, 2, 4 seconds protects a broker that is down, and the dead letter table keeps the payload for a human instead of losing it in a log.',
      'Запись заказа и события в одной транзакции убирает зазор между двумя системами: либо есть обе строки, либо нет ни одной. Уникальное ограничение на idempotency key делает повторный запрос безобидным, а ON CONFLICT DO NOTHING вместе с поиском существующей строки возвращает тот же ответ, что и первый вызов. Издатель — отдельный процесс, который можно перезапустить в любой момент, потому что опубликованное, но не помеченное сообщение будет опубликовано повторно, а потребители всё равно должны быть идемпотентными. Задержка 1, 2, 4 секунды бережёт брокер, который лежит, а таблица мёртвых писем сохраняет payload для человека, вместо того чтобы потерять его в логе.'
    ),
  },
  {
    id: 'topic-architecture-6',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'advanced',
    title: L('Add a timeout, a retry with backoff and a circuit breaker', 'Добавить таймаут, повтор с backoff и circuit breaker'),
    brief: L(
      'Write a function "request(url, options)" that survives a flaky service. It applies a timeout of 2000 ms to every attempt with an AbortController, retries only the failures that can succeed on a repeat (a network error, a 503 or a 429 response) and never the failures that cannot (a 400 or a 404 response), makes at most 3 attempts, and waits between the attempts with an exponential backoff: the delay before attempt N is a random number between 0 and min(2000, 100 * 2^(N-1)) milliseconds, which is the full jitter that spreads the retries of many clients. On top of that add a circuit breaker with three states: it starts closed, opens after 5 consecutive failures, stays open for 30 seconds, then lets exactly one probe request through in the half open state, and closes again if that probe succeeds. While the circuit is open the function must fail fast with the error "CircuitOpenError" without touching the network. Example: with a base delay of 100 ms the wait before the second attempt is a random number from 0 to 100 ms, and before the third attempt a random number from 0 to 200 ms.',
      'Напишите функцию "request(url, options)", которая переживает нестабильный сервис. Она применяет таймаут 2000 мс к каждой попытке через AbortController, повторяет только те сбои, которые могут пройти при повторе (сетевая ошибка, ответ 503 или 429) и никогда не повторяет те, которые не пройдут (ответы 400 или 404), делает не больше 3 попыток и ждёт между попытками по экспоненциальному backoff: задержка перед попыткой N — случайное число от 0 до min(2000, 100 * 2^(N-1)) миллисекунд, это full jitter, который разбрасывает повторы многих клиентов. Поверх этого добавьте circuit breaker с тремя состояниями: он стартует закрытым, открывается после 5 ошибок подряд, остаётся открытым 30 секунд, затем в состоянии half open пропускает ровно один пробный запрос и снова закрывается, если проба успешна. Пока цепь открыта, функция должна быстро отказать с ошибкой "CircuitOpenError", не обращаясь к сети. Пример: при базовой задержке 100 мс ожидание перед второй попыткой — случайное число от 0 до 100 мс, а перед третьей — случайное число от 0 до 200 мс.'
    ),
    hint: L(
      'The timeout and the retry need two different AbortControllers: one for the timeout of a single attempt and one for the cancellation of the whole call. The jitter comes from Math.random, and the breaker is a small state machine with the states closed, open and half-open.',
      'Таймауту и повтору нужны два разных AbortController: один на таймаут одной попытки и второй на отмену всего вызова. Джиттер берётся из Math.random, а breaker — это маленькая машина состояний closed, open и half-open.'
    ),
    solution: `export class CircuitOpenError extends Error {
  constructor() {
    super('Circuit is open');
    this.name = 'CircuitOpenError';
  }
}

export class TimeoutError extends Error {
  readonly ms: number;

  constructor(ms: number) {
    super(\`Request timed out after \${ms} ms\`);
    this.name = 'TimeoutError';
    this.ms = ms;
  }
}

class RetryableError extends Error {}

type BreakerState = 'closed' | 'open' | 'half-open';

export class CircuitBreaker {
  private state: BreakerState = 'closed';
  private failures = 0;
  private openedAt = 0;
  private readonly failureThreshold: number;
  private readonly resetTimeoutMs: number;

  constructor(failureThreshold = 5, resetTimeoutMs = 30_000) {
    this.failureThreshold = failureThreshold;
    this.resetTimeoutMs = resetTimeoutMs;
  }

  get currentState(): BreakerState {
    return this.state;
  }

  canRequest(): boolean {
    if (this.state === 'closed') return true;

    if (this.state === 'open') {
      if (Date.now() - this.openedAt >= this.resetTimeoutMs) {
        this.state = 'half-open';
        return true;
      }
      return false;
    }

    return true;
  }

  onSuccess(): void {
    this.state = 'closed';
    this.failures = 0;
  }

  onFailure(): void {
    this.failures += 1;
    if (this.state === 'half-open' || this.failures >= this.failureThreshold) {
      this.state = 'open';
      this.openedAt = Date.now();
    }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function request(
  url: string,
  options: RequestInit = {},
  config: {
    timeoutMs?: number;
    maxAttempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    breaker?: CircuitBreaker;
  } = {}
): Promise<Response> {
  const timeoutMs = config.timeoutMs ?? 2000;
  const maxAttempts = config.maxAttempts ?? 3;
  const baseDelayMs = config.baseDelayMs ?? 100;
  const maxDelayMs = config.maxDelayMs ?? 2000;
  const breaker = config.breaker ?? new CircuitBreaker();

  let lastError: unknown = new Error('no attempt was made');

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (!breaker.canRequest()) {
      throw new CircuitOpenError();
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);

      if (response.status >= 500 || response.status === 429) {
        throw new RetryableError(\`HTTP \${response.status}\`);
      }

      breaker.onSuccess();
      return response;
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      breaker.onFailure();

      const isTimeout = error instanceof Error && error.name === 'AbortError';
      const retryable =
        error instanceof RetryableError || error instanceof TypeError || isTimeout;

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      const ceiling = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      await sleep(Math.random() * ceiling);
    }
  }

  throw lastError;
}`,
    explanation: L(
      'The three mechanisms protect against three different failures: the timeout stops a request that hangs forever, the retry handles a service that is briefly unavailable, and the breaker stops the flood of requests to a service that is down for good. The jitter is not decoration: without it every client that failed at the same moment retries at the same moment, and the recovering service is knocked down again by a thundering herd. Only the errors that can succeed on a repeat are retried, because a 404 will be a 404 on the third attempt as well and the retry only wastes the time of the client. The breaker needs a half open state, otherwise the service never gets the chance to prove that it recovered. One detail that is easy to miss: the timer must be cleared in both the success and the failure branch, otherwise the process stays alive and the timeout fires into nothing.',
      'Три механизма защищают от трёх разных сбоев: таймаут останавливает запрос, который висит вечно, повтор справляется с сервисом, который ненадолго недоступен, а breaker пресекает поток запросов к сервису, который лежит уже наверняка. Джиттер не украшение: без него все клиенты, упавшие в один момент, повторят в один момент, и восстанавливающийся сервис снова собьёт волна одновременных запросов. Повторяются только те ошибки, которые могут пройти при повторе, потому что 404 останется 404 и на третьей попытке, а повтор только тратит время клиента. Breakerу нужно состояние half open, иначе сервис никогда не сможет доказать, что восстановился. Одна деталь, которую легко пропустить: таймер надо очищать и в ветке успеха, и в ветке ошибки, иначе процесс не завершится, а таймаут сработает в пустоту.'
    ),
  },
  {
    id: 'topic-architecture-7',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'advanced',
    title: L('Design an event driven notification service', 'Спроектировать событийный сервис уведомлений'),
    brief: L(
      'The shop publishes the event "OrderPaid" with the body { eventId, orderId, email, amountCents } to a message broker, and the notification service subscribes to it and sends an email. Write the four parts of the flow: the publisher that puts the event on the queue, the consumer that reads the queue and calls the notification channel, the retry of a failed delivery with a dead letter queue after 3 attempts, and the idempotency of the consumer, which must not send the same email twice when the same event is delivered again. The idempotency is the table "processed_messages (event_id text PRIMARY KEY, processed_at timestamptz NOT NULL DEFAULT now())", and the insert of the event id happens before the send, so a repeated delivery finds the row and skips the send. The channel is the port "NotificationChannel" with the method "send(message: { to: string; subject: string; body: string })", and the concrete "SmtpNotificationChannel" implements it. Example: the event { eventId: "evt_1", orderId: "ord_1", email: "a@b.c", amountCents: 1000 } delivered twice sends one email and leaves one row in "processed_messages".',
      'Магазин публикует событие "OrderPaid" с телом { eventId, orderId, email, amountCents } в брокер сообщений, а сервис уведомлений подписывается на него и отправляет письмо. Напишите четыре части потока: издателя, который кладёт событие в очередь, потребителя, который читает очередь и вызывает канал уведомлений, повтор при сбое доставки с очередью мёртвых писем после 3 попыток, и идемпотентность потребителя, который не должен отправлять одно и то же письмо дважды при повторной доставке того же события. Идемпотентность обеспечивается таблицей "processed_messages (event_id text PRIMARY KEY, processed_at timestamptz NOT NULL DEFAULT now())", причём insert идентификатора события происходит до отправки, поэтому повторная доставка находит строку и пропускает отправку. Канал — это порт "NotificationChannel" с методом "send(message: { to: string; subject: string; body: string })", а конкретный "SmtpNotificationChannel" его реализует. Пример: событие { eventId: "evt_1", orderId: "ord_1", email: "a@b.c", amountCents: 1000 }, доставленное дважды, отправляет одно письмо и оставляет одну строку в "processed_messages".'
    ),
    hint: L(
      'The consumer acknowledges the message only after a successful send, so a crash before the acknowledgement means the broker delivers the message again, and the processed_messages table turns that repeat into a no-op.',
      'Потребитель подтверждает сообщение только после успешной отправки, поэтому падение до подтверждения означает повторную доставку, а таблица processed_messages превращает этот повтор в no-op.'
    ),
    solution: `-- idempotency of the consumer
CREATE TABLE processed_messages (
  event_id text PRIMARY KEY,
  processed_at timestamptz NOT NULL DEFAULT now()
);

// publisher
export interface EventBus {
  publish(topic: string, event: unknown): Promise<void>;
}

export type OrderPaidEvent = {
  eventId: string;
  orderId: string;
  email: string;
  amountCents: number;
};

export class OrderPaidPublisher {
  private readonly bus: EventBus;

  constructor(bus: EventBus) {
    this.bus = bus;
  }

  async publish(event: OrderPaidEvent): Promise<void> {
    await this.bus.publish('OrderPaid', event);
  }
}

// port and adapter
export interface NotificationChannel {
  send(message: { to: string; subject: string; body: string }): Promise<void>;
}

export class SmtpNotificationChannel implements NotificationChannel {
  private readonly transport: (message: { to: string; subject: string; body: string }) => Promise<void>;

  constructor(transport: (message: { to: string; subject: string; body: string }) => Promise<void>) {
    this.transport = transport;
  }

  async send(message: { to: string; subject: string; body: string }): Promise<void> {
    await this.transport(message);
  }
}

// consumer
export class NotificationConsumer {
  private readonly db: Db;
  private readonly channel: NotificationChannel;

  constructor(db: Db, channel: NotificationChannel) {
    this.db = db;
    this.channel = channel;
  }

  async handle(event: OrderPaidEvent): Promise<'sent' | 'skipped'> {
    const { rows } = await this.db.query(
      'INSERT INTO processed_messages (event_id) VALUES ($1) ON CONFLICT (event_id) DO NOTHING RETURNING event_id',
      [event.eventId]
    );

    if (rows.length === 0) {
      return 'skipped';
    }

    try {
      await this.channel.send({
        to: event.email,
        subject: \`Order \${event.orderId} paid\`,
        body: \`We received \${event.amountCents} cents for order \${event.orderId}.\`,
      });
    } catch (error) {
      // the event was not delivered, so it must be deliverable again
      await this.db.query('DELETE FROM processed_messages WHERE event_id = $1', [event.eventId]);
      throw error;
    }

    return 'sent';
  }
}

// retry with a dead letter queue
const MAX_ATTEMPTS = 3;

export async function consumeOrderPaid(
  bus: EventBus,
  handler: (event: OrderPaidEvent) => Promise<void>
): Promise<void> {
  const message = await bus.consume('OrderPaid');
  if (!message) return;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      await handler(message.body);
      await bus.ack(message);
      return;
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) {
        await bus.publish('OrderPaid.dead-letter', { body: message.body, error: String(error) });
        await bus.ack(message);
        return;
      }
      await sleep(1000 * 2 ** (attempt - 1));
    }
  }
}`,
    explanation: L(
      'The publisher does not know who will read the event, and the consumer does not know who produced it, so the two can change independently. The acknowledgement comes after the send, which means a crash in the middle produces a repeated delivery, not a lost email. That is why the consumer has to be idempotent, and the processed_messages table turns a repeat into a no-op. The delete of the row before the retry is what makes a failed delivery recoverable: without it the event would be marked as processed although the email was never sent. The dead letter queue keeps the events that failed three times, so they can be inspected and replayed by hand instead of disappearing in a log.',
      'Издатель не знает, кто прочитает событие, а потребитель не знает, кто его произвёл, поэтому обе части меняются независимо. Подтверждение приходит после отправки, а значит падение в середине даёт повторную доставку, а не потерянное письмо. Именно поэтому потребитель обязан быть идемпотентным, и таблица processed_messages превращает повтор в no-op. Удаление строки перед повтором — то, что делает сбойную доставку восстановимой: без неё событие было бы помечено обработанным, хотя письмо так и не ушло. Очередь мёртвых писем хранит события, упавшие три раза, чтобы их можно было посмотреть и переиграть руками, вместо того чтобы они исчезли в логе.'
    ),
  },
  {
    id: 'topic-architecture-8',
    moduleId: 'architecture',
    topic: 'architecture',
    level: 'advanced',
    title: L('Write an ADR for the monolith or microservices decision', 'Написать ADR о выборе между монолитом и микросервисами'),
    brief: L(
      'Write an architecture decision record for the decision "monolith or microservices" of a shop with 6 developers, one product, 30 requests per second and a database that fits on one machine. The record must have the sections Status, Context, Options Considered, Decision, Consequences and Revisit Triggers, in this order. Three options must be considered: a modular monolith, microservices and serverless functions. The decision is the modular monolith with the modules separated by the domain, and microservices become an option only for a module that needs its own scaling or its own release. The consequences must mention at least two positive and at least two negative consequences, and the revisit triggers must name a measurable condition, for example more than 100 requests per second in one module or a team that cannot release without coordinating with the others. The title of the record must be "ADR-001: Monolith or microservices" and the status line must be "Status: Accepted". Example: the decision section starts with the line "Decision: We use a modular monolith." and the options section lists the three options with one paragraph each.',
      'Напишите запись архитектурного решения (ADR) по решению "монолит или микросервисы" для магазина с 6 разработчиками, одним продуктом, 30 запросами в секунду и базой, которая помещается на одной машине. Запись должна содержать разделы Status, Context, Options Considered, Decision, Consequences и Revisit Triggers именно в таком порядке. Рассмотреть нужно три варианта: модульный монолит, микросервисы и serverless-функции. Решение — модульный монолит с модулями, разделёнными по домену, а микросервисы становятся вариантом только для модуля, которому нужен собственный масштаб или собственный релиз. В последствиях должно быть не меньше двух плюсов и не меньше двух минусов, а условия пересмотра должны называть измеримое условие, например больше 100 запросов в секунду в одном модуле или команду, которая не может релизиться без согласования с остальными. Заголовок записи должен быть "ADR-001: Monolith or microservices", а строка статуса — "Status: Accepted". Пример: раздел с решением начинается со строки "Decision: We use a modular monolith.", а в разделе с вариантами перечислены три варианта с одним абзацем на каждый.'
    ),
    hint: L(
      'An ADR records one decision and its reasons, so that in a year somebody can understand why the system looks like this without asking anyone. The options section must contain the option that was not chosen, otherwise the reader cannot judge the trade-off.',
      'ADR фиксирует одно решение и его причины, чтобы через год кто-то понял, почему система выглядит так, не спрашивая никого. В секции с вариантами должен быть и отвергнутый вариант, иначе читатель не сможет оценить компромисс.'
    ),
    solution: `# ADR-001: Monolith or microservices

Status: Accepted
Date: 2026-10-20
Deciders: backend team

## Context
The shop sells goods through one web application and one admin panel. The team is 6 developers, 1 product owner and 1 designer. The load is 30 requests per second with peaks of 120 during the sales. The whole data fits in one Postgres instance, and the money goes into marketing rather than into the infrastructure.

The question appeared now because the current codebase is one module that grew for two years: the checkout logic, the catalog and the admin import share the same folder and the same deploy. The fear is that a change in one part of the system breaks another part.

## Options Considered
1. **Modular monolith** — one deployable application, the code split into modules by domain, the modules talk through explicit interfaces.
2. **Microservices** — every domain becomes a separate service with its own database and its own deploy, the services talk over the network.
3. **Serverless functions** — the business logic becomes functions triggered by events, the infrastructure is managed by the platform.

## Decision
We use a modular monolith.

The code is split into modules by domain: catalog, checkout, orders, notifications, admin. A module exposes a public API, the modules never reach into the internals of each other, and the interfaces between the modules are covered by contract tests.

A module becomes a separate service only when one of the measurable triggers is reached: the module needs more than 100 requests per second and has to be scaled apart from the rest, or the module must be released independently every week, or the team grows past 10 developers and the shared deploy becomes a bottleneck.

## Consequences
### Positive
- One deploy and one database mean that a change touching the catalog and the checkout is a normal transaction and a normal pull request, without sagas and distributed transactions.
- A call between the modules is a function call, so the latency and the failure modes of the network do not multiply.
- A team of 6 developers can hold the whole system in the head, and a new developer reads one repository instead of five.

### Negative
- The modules share one process, so a memory leak or a CPU heavy job in one module slows down the others; the heavy jobs have to be moved to a worker.
- A bad release in one module affects the whole application, so the monitoring, the feature flags and the rollback have to be mature.
- The clean borders between the modules erode over time without the architecture tests that check the imports.

## Revisit Triggers
- One module needs more than 100 requests per second and the scaling of the whole application becomes too expensive.
- The team grows past 10 developers and the coordination of the shared deploy costs more than a day per week.
- One module needs its own database because of the requirements to data residency or to the isolation of the load.
- The deploy of one module blocks the releases of the others more than three times in a quarter.

The decision is reviewed when the first trigger is reached, and not before.`,
    explanation: L(
      'An ADR is written to be read in a year by somebody who was not in the room, so it records the context and the rejected options, not only the final choice. The reason to write the negative consequences is that they are the real contract: they tell the team what the price of the decision was, and they become the checklist for the next review. The measurable triggers in the last section turn "we will reconsider later" into a rule, and a rule with numbers can be checked by anyone, while an opinion starts a new discussion every quarter. The status field is what keeps the document alive: when the circumstances change, the record is superseded by a new ADR, and the old one stays in the history instead of being quietly edited. A common mistake is to write the ADR as a design document with diagrams, which makes it long and hard to compare with the next record.',
      'ADR пишут так, чтобы его прочитал через год человек, которого не было на встрече, поэтому в нём фиксируют контекст и отвергнутые варианты, а не только итоговый выбор. Причина писать минусы в том, что именно они и есть настоящий контракт: они говорят команде, какой была цена решения, и превращаются в чек-лист для следующего пересмотра. Измеримые условия в последнем разделе превращают «мы вернёмся к этому позже» в правило, а правило с числами может проверить кто угодно, тогда как мнение порождает новый спор каждый квартал. Поле статуса поддерживает документ живым: когда обстоятельства меняются, запись заменяется новым ADR, а старая остаётся в истории, а не правится молча. Частая ошибка — написать ADR как проектный документ с диаграммами, отчего он становится длинным и его невозможно сравнить со следующей записью.'
    ),
  },
];
