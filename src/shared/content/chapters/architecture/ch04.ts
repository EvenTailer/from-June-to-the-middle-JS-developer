import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh04: Chapter = {
  id: 'architecture-ch4',
  title: L('Service architecture', 'Сервисная архитектура'),
  summary: L(
    'The difference between a monolith and a modular monolith, the criteria that justify splitting a service, how services talk to each other and what the API gateway is for, why data ownership matters, what distribution costs in operations and latency, and how a distributed system is tested.',
    'Чем монолит отличается от модульного монолита, по каким критериям выделяют сервис, как сервисы общаются друг с другом и зачем нужен шлюз API, почему важно владение данными, сколько стоит распределение в эксплуатации и в задержке и как тестируют распределённую систему.'
  ),
  sections: [
    {
      id: 'architecture-ch4-s1',
      title: L('Monolith and modular monolith', 'Монолит и модульный монолит'),
      body: L(
        'A monolith is one deployable unit that contains everything: the UI, the business logic and the data access. The word sounds like an insult, but the properties that matter are about deployment and about the dependencies inside the code. One artifact is deployed, one process serves the traffic, one database holds the data, and a call between two parts of the system is a function call that cannot fail because of a network.\n\nA modular monolith is the same deployment unit with an internal structure: the code is split into modules with explicit boundaries, one-way dependencies and their own data, and a module talks to another through an interface rather than through its tables. Nothing about the deployment changes, and that is the point: the boundaries are established while the calls are still free, so the code is ready for extraction when that becomes necessary.\n\nThe difference that matters is the deployment unit, not the size of the code and not the number of layers. Many teams argue about microservices while running a monolith with no module boundaries at all, which means they have neither the simplicity of the monolith nor the autonomy of the services. The first question is always the same: how many artifacts does the team deploy, how often, and who owns each of them.\n\nThe cost of a monolith is that everything changes together. A release that touches three modules waits for the slowest test suite, a bug in one module takes the whole system down, and the database becomes the meeting point where every module writes, so the schema becomes the place where the coupling hides. The cost of a modular monolith is more discipline: the boundaries have to be enforced, because nothing forces them.',
        'Монолит — это одна единица развёртывания, в которой лежит всё: UI, бизнес-логика и работа с данными. Слово звучит как приговор, но важны здесь свойства развёртывания и зависимостей внутри кода. Разворачивается один артефакт, трафик обслуживает один процесс, данные лежат в одной базе, а вызов между двумя частями системы — это вызов функции, который не может упасть из-за сети.\n\nМодульный монолит — та же единица развёртывания с внутренней структурой: код разделён на модули с явными границами, однонаправленными зависимостями и своими данными, а модуль говорит с другим через интерфейс, а не через его таблицы. Про развёртывание ничего не меняется, и в этом весь смысл: границы устанавливаются, пока вызовы ещё бесплатны, так что код готов к выделению в сервис, когда это понадобится.\n\nРазница, которая важна, — это единица развёртывания, а не размер кода и не количество слоёв. Многие команды спорят о микросервисах, работая с монолитом вообще без границ модулей, то есть не имеют ни простоты монолита, ни автономии сервисов. Первый вопрос всегда один: сколько артефактов команда разворачивает, как часто и кто владеет каждым.\n\nЦена монолита в том, что всё меняется вместе. Релиз, задевающий три модуля, ждёт самый медленный набор тестов, баг в одном модуле роняет всю систему, а база данных становится местом встречи, где пишут все модули, и связность прячется в схеме. Цена модульного монолита — дисциплина: границы приходится контролировать, потому что их никто не навязывает.'
      ),
      bullets: [
        L('A monolith is one deployable unit, a modular monolith is the same unit with enforced internal boundaries.', 'Монолит — одна единица развёртывания, модульный монолит — та же единица с контролируемыми внутренними границами.'),
        L('The difference that matters is the deployment unit, not the size of the code.', 'Важна единица развёртывания, а не размер кода.'),
        L('A modular monolith keeps the calls free while making a later extraction possible.', 'Модульный монолит сохраняет бесплатные вызовы и оставляет возможность выделения в сервис.'),
        L('A monolith without module boundaries is neither simple nor autonomous.', 'Монолит без границ модулей не является ни простым, ни автономным.'),
        L('The shared database is where the coupling of a monolith hides.', 'Общая база данных — место, где прячется связанность монолита.'),
      ],
      code: `// src/
//   modules/
//     catalog/
//       domain/      product.ts
//       application/ find-product.ts
//       data/        postgres-catalog.ts
//       index.ts     // the public API of the module
//     orders/
//       domain/      order.ts
//       application/ place-order.ts
//       data/        postgres-orders.ts
//       index.ts
//   shared/
//   app/
//     composition-root.ts`,
      table: {
        caption: L('Three shapes of a deployable system', 'Три формы системы развёртывания'),
        headers: [L('Property', 'Свойство'), L('Monolith', 'Монолит'), L('Modular monolith', 'Модульный монолит')],
        rows: [
          [
            L('Deployable artifacts', 'Артефактов развёртывания'),
            L('one', 'один'),
            L('one', 'один'),
          ],
          [
            L('Calls inside the system', 'Внутренние вызовы'),
            L('function calls, in process', 'вызовы функций, в процессе'),
            L('function calls, in process', 'вызовы функций, в процессе'),
          ],
          [
            L('Internal structure', 'Внутренняя структура'),
            L('often none', 'часто никакой'),
            L('modules with enforced boundaries', 'модули с контролируемыми границами'),
          ],
          [
            L('Data', 'Данные'),
            L('one shared database', 'одна общая база'),
            L('each module owns its tables', 'у каждого модуля свои таблицы'),
          ],
        ],
      },
      takeaway: L(
        'Decide by deployment unit: one artifact with enforced module boundaries first, a separate service only when the criteria in the next section are met.',
        'Решай по единице развёртывания: сначала один артефакт с контролируемыми границами модулей, а отдельный сервис — только когда выполнены критерии из следующей секции.'
      ),
      seeAlso: [
        L('Section 4-2: microservices and splitting criteria', 'Секция 4-2: микросервисы и критерии разделения'),
        L('Section 3-1: folders by feature', 'Секция 3-1: папки по фичам'),
      ],
    },
    {
      id: 'architecture-ch4-s2',
      title: L('Microservices and splitting criteria', 'Микросервисы и критерии разделения'),
      body: L(
        'A microservice is a business capability with its own rules, its own data, its own deployment and its own team. The definition that matters is the last one: a team that can change a service and release it without coordinating with anybody else. If releasing the service needs a joint deployment plan, it is not a service, it is a module with extra network calls.\n\nThe criteria that justify a split are four. The capability has rules of its own that change at their own rhythm. It has a different load profile, so it needs to scale separately. It owns data that no other service may write. And a team can own it end to end, including the on-call rotation. Lines of code, the choice of technology and the preference of an architect are not criteria.\n\nThe order matters. A split is expensive to undo, so the criteria should be strong before the split is made, not after the first incident. When a team splits because the codebase feels big, the result is usually a distributed monolith: several services, one shared database, synchronous calls in a chain, and a release that needs all of them deployed together.\n\nThere is a cheaper first step that is usually skipped: make the module boundary real inside the monolith. Enforce one-way dependencies, give the module its own tables, keep the interface small and put the calls behind it. When the criteria for a service finally arrive, the module is already separated, the calls are already behind an interface, and the extraction becomes a deployment change rather than a rewrite.',
        'Микросервис — это бизнес-возможность со своими правилами, своими данными, своим развёртыванием и своей командой. Значимо последнее: команда, которая может изменить сервис и выпустить его, не договариваясь ни с кем. Если для релиза сервиса нужен совместный план развёртывания, это не сервис, а модуль с лишними сетевыми вызовами.\n\nКритерии, оправдывающие разделение, четыре. У возможности есть свои правила, меняющиеся в своём ритме. У неё другой профиль нагрузки, и её надо масштабировать отдельно. Она владеет данными, которые никто другой не пишет. И есть команда, способная владеть ею целиком, вместе с дежурствами. Количество строк, выбор технологии и предпочтение архитектора критериями не являются.\n\nПорядок важен. Разделение трудно отменить, поэтому критерии должны быть сильными до разделения, а не после первого инцидента. Когда команду делят потому, что кодовая база кажется большой, обычно получается распределённый монолит: несколько сервисов, одна общая база, синхронные вызовы в цепочке и релиз, требующий совместного развёртывания всех.\n\nЕсть более дешёвый первый шаг, который обычно пропускают: сделать границу модуля настоящей внутри монолита. Закрепить однонаправленные зависимости, дать модулю свои таблицы, оставить интерфейс маленьким и спрятать за ним вызовы. Когда критерии сервиса наконец появятся, модуль уже отделён, вызовы уже за интерфейсом, и выделение становится изменением развёртывания, а не переписыванием.'
      ),
      bullets: [
        L('A service is defined by a team that can release it without coordinating.', 'Сервис определяется командой, которая может релизить его без согласований.'),
        L('Four criteria justify a split: own rules, own load, own data, own team.', 'Четыре критерия оправдывают разделение: свои правила, нагрузка, данные, команда.'),
        L('Lines of code and technology preference are not criteria.', 'Количество строк и выбор технологии критериями не являются.'),
        L('A premature split usually produces a distributed monolith.', 'Преждевременное разделение обычно даёт распределённый монолит.'),
        L('Make the module boundary real first, then the extraction is a deployment change.', 'Сначала сделай границу модуля настоящей — и выделение станет изменением развёртывания.'),
      ],
      code: `interface Capability {
  name: string;
  ownRules: boolean;
  differentLoadProfile: boolean;
  ownData: boolean;
  dedicatedTeam: boolean;
}

// The four criteria of the section, counted.
export function splitScore(capability: Capability): number {
  const reasons = [
    capability.ownRules,
    capability.differentLoadProfile,
    capability.ownData,
    capability.dedicatedTeam,
  ];
  return reasons.filter(Boolean).length;
}

// Three of four is a real reason; two is a preference.
export function shouldExtract(capability: Capability): boolean {
  return splitScore(capability) >= 3;
}`,
      table: {
        caption: L('The splitting criteria and what each one buys', 'Критерии разделения и что каждый даёт'),
        headers: [L('Criterion', 'Критерий'), L('What it buys', 'Что даёт'), L('Symptom when it is missing', 'Симптом отсутствия')],
        rows: [
          [
            L('Own rules', 'Свои правила'),
            L('independent changes', 'независимые изменения'),
            L('one release touches everything', 'один релиз трогает всё'),
          ],
          [
            L('Different load profile', 'Другой профиль нагрузки'),
            L('separate scaling', 'отдельное масштабирование'),
            L('one hot path drags the rest down', 'одна горячая часть тянет остальных вниз'),
          ],
          [
            L('Own data', 'Свои данные'),
            L('autonomous schema changes', 'автономные изменения схемы'),
            L('a shared database and joint releases', 'общая база и совместные релизы'),
          ],
          [
            L('Dedicated team', 'Своя команда'),
            L('ownership without coordination', 'владение без согласований'),
            L('every release needs a meeting', 'каждый релиз требует встречи'),
          ],
        ],
      },
      takeaway: L(
        'Split a service only for own rules, own load, own data and own team, and make the module boundary real before you do.',
        'Выделяй сервис только ради своих правил, нагрузки, данных и команды, а до этого сделай границу модуля настоящей.'
      ),
      seeAlso: [
        L('Section 4-1: monolith and modular monolith', 'Секция 4-1: монолит и модульный монолит'),
        L('Section 4-4: data ownership', 'Секция 4-4: владение данными'),
      ],
    },
    {
      id: 'architecture-ch4-s3',
      title: L('Communication and the API gateway', 'Коммуникация и шлюз API'),
      body: L(
        'Between two services there are two shapes of communication. A synchronous call is a request and a response: the caller waits, the call has a timeout, and a failure is a failure of the caller request. A message is a fact published to a broker: the producer does not wait, and the consumers read it when they can. The choice follows from one question: does the caller need the answer to continue, or can the work happen later?\n\nThe API gateway is the single public entry point of a system of services. It authenticates the caller, terminates TLS, applies rate limits, routes the request to the service that owns the resource and sometimes aggregates several calls into one response. What the gateway must not do is hold business rules: a rule in the gateway has no owner, is duplicated in every service that bypasses it, and cannot be tested together with the data it protects.\n\nThe path of a request through the gateway is short but not free. Every hop adds latency, a place where the request can be dropped, and a component that can be the bottleneck. A gateway that aggregates five services makes five downstream calls and owns the slowest of them, so the budget of the whole page is the sum of the budgets minus the parallelism. A gateway that sits on the critical path of every request is also a single point of failure, and it needs a fallback that is not "wait and hope".\n\nTimeouts and retries belong here too, because a network call without a timeout is a call that can wait forever. Every call needs a deadline shorter than the budget of its caller, and a retry needs a limit on the number of attempts. A retry of a non-idempotent operation without a key duplicates the effect, which is why the retry policy and the idempotency policy are really one decision.',
        'Между двумя сервисами есть две формы общения. Синхронный вызов — это запрос и ответ: вызывающий ждёт, у вызова есть таймаут, а отказ превращается в отказ запроса вызывающего. Сообщение — это факт, опубликованный в брокер: производитель не ждёт, а потребители читают, когда смогут. Выбор следует из одного вопроса: нужен ли вызывающему ответ, чтобы продолжить, или работа может подождать?\n\nШлюз API — единая публичная точка входа системы сервисов. Он аутентифицирует вызывающего, терминирует TLS, применяет лимиты, маршрутизирует запрос сервису, который владеет ресурсом, и иногда собирает несколько вызовов в один ответ. Чего шлюз не должен делать — так это хранить бизнес-правила: правило в шлюзе никому не принадлежит, дублируется в каждом сервисе, который шлюз обходит, и не проверяется вместе с данными, которые защищает.\n\nПуть запроса через шлюз короткий, но не бесплатный. Каждый переход добавляет задержку, место, где запрос может пропасть, и компонент, который может стать узким местом. Шлюз, собирающий пять сервисов, делает пять нисходящих вызовов и отвечает за самый медленный, так что бюджет всей страницы равен сумме бюджетов за вычетом параллельности. Шлюз на критическом пути каждого запроса — ещё и единая точка отказа, и ему нужен отказоустойчивый план, а не «подождём и надеемся».\n\nТаймауты и повторы тоже относятся к этому, потому что сетевой вызов без таймаута — это вызов, который может ждать вечно. У каждого вызова нужен дедлайн короче бюджета вызывающего, а у повтора — ограничение на число попыток. Повтор неидемпотентной операции без ключа дублирует эффект, поэтому политика повторов и политика идемпотентности — это на самом деле одно решение.'
      ),
      bullets: [
        L('Synchronous when the caller needs the answer, asynchronous when the work can wait.', 'Синхронно, когда ответ нужен сразу, асинхронно, когда работа может подождать.'),
        L('The gateway owns the entry point: auth, TLS, rate limits, routing.', 'Шлюз владеет точкой входа: аутентификация, TLS, лимиты, маршрутизация.'),
        L('The gateway must not hold business rules.', 'Шлюз не должен хранить бизнес-правила.'),
        L('Every hop adds latency and a place where the request can be lost.', 'Каждый переход добавляет задержку и место, где запрос может пропасть.'),
        L('A call without a timeout is a call that can wait forever.', 'Вызов без таймаута — это вызов, который может ждать вечно.'),
      ],
      code: `// gateway/routes.ts - routing and limits, no business rules
export interface ServiceTarget { host: string; pathPrefix: string }

export const ROUTES: Record<string, ServiceTarget> = {
  '/catalog': { host: 'http://catalog:8080', pathPrefix: '/catalog' },
  '/orders': { host: 'http://orders:8080', pathPrefix: '/orders' },
};

export function resolve(pathname: string): ServiceTarget | null {
  const prefix = Object.keys(ROUTES).sort((a, b) => b.length - a.length).find((key) => pathname.startsWith(key));
  return prefix ? ROUTES[prefix] : null;
}

// The client that calls a service always has a deadline.
export async function callService(
  target: ServiceTarget,
  path: string,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(target.host + target.pathPrefix + path, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}`,
      table: {
        caption: L('Synchronous call or message', 'Синхронный вызов или сообщение'),
        headers: [L('Aspect', 'Аспект'), L('Synchronous call', 'Синхронный вызов'), L('Message', 'Сообщение')],
        rows: [
          [
            L('The caller waits', 'Вызывающий ждёт'),
            L('yes', 'да'),
            L('no', 'нет'),
          ],
          [
            L('Failure mode', 'Режим отказа'),
            L('the caller request fails', 'падает запрос вызывающего'),
            L('the message is retried later', 'сообщение повторяют позже'),
          ],
          [
            L('Several consumers', 'Несколько потребителей'),
            L('each one calls separately', 'каждый зовёт отдельно'),
            L('each one subscribes', 'каждый подписывается'),
          ],
          [
            L('Good for', 'Хорошо для'),
            L('the answer is needed now', 'ответ нужен сейчас'),
            L('the work may happen later', 'работа может подождать'),
          ],
        ],
      },
      takeaway: L(
        'Choose the communication shape from the question the caller has to answer, and give every call a deadline shorter than the budget of its caller.',
        'Выбирай форму общения по вопросу, на который нужен ответ вызывающего, и давай каждому вызову дедлайн короче бюджета вызывающего.'
      ),
      seeAlso: [
        L('Section 4-5: what distribution costs you', 'Секция 4-5: сколько стоит распределение'),
        L('Chapter 5: timeouts, retries and circuit breakers', 'Глава 5: таймауты, повторы и предохранители'),
      ],
    },
    {
      id: 'architecture-ch4-s4',
      title: L('Data ownership', 'Владение данными'),
      body: L(
        'Data ownership is the rule that says which service may write which data. A service owns its tables the way a team owns a codebase: nobody else writes them, nobody else changes the schema, and other services read the data only through the API or through the events the owner publishes. The rule is what makes a service autonomous, and autonomy is the reason to split in the first place.\n\nA shared database breaks it silently. Two services read the same tables, both assume they understand the schema, and the coupling is invisible in the code because the dependency sits in SQL rather than in an import. Then one team adds a column, the other team query breaks, and the fix needs a coordinated release. This is the most common way a set of services turns into a distributed monolith with extra network calls.\n\nThe consequence is that questions spanning services need another answer. A join across two services is impossible, so the data either is duplicated, with one service owning the copy, or it is queried through an API that answers the question, or it is derived from events and stored in a read model that belongs to whoever needs it. Each of these has a price: duplication and its consistency problem, an extra network call and its latency, or eventual consistency and its delay.\n\nOwnership also has a positive side that is easy to miss. When only one service writes the data, the schema can be designed for that service, the indexes can be built for its queries, and the migration can be deployed when it is safe, because no other consumer is reading the table directly. The cost of autonomy is paid in joins and consistency, and it is worth paying only when the split was justified in the first place.',
        'Владение данными — это правило, которое говорит, какой сервис и какие данные может писать. Сервис владеет своими таблицами так же, как команда владеет кодовой базой: никто другой их не пишет, никто другой не меняет схему, а остальные читают данные только через API или через события, которые публикует владелец. Это правило делает сервис автономным, а автономность и была причиной разделения.\n\nОбщая база данных ломает правило тихо. Два сервиса читают одни и те же таблицы, оба считают, что понимают схему, и связанность не видна в коде, потому что зависимость находится в SQL, а не в импорте. Потом одна команда добавляет колонку, запрос другой команды ломается, и починка требует совместного релиза. Это самый частый способ превратить набор сервисов в распределённый монолит с лишними сетевыми вызовами.\n\nСледствие: вопросам, пересекающим сервисы, нужен другой ответ. JOIN через два сервиса невозможен, поэтому данные либо дублируются, и владеет копией один сервис, либо запрашиваются через API, который отвечает на вопрос, либо выводятся из событий и хранятся в модели чтения, принадлежащей тому, кому она нужна. У каждого варианта своя цена: дублирование и проблема согласованности, лишний сетевой вызов и его задержка, либо итоговая согласованность и её задержка.\n\nУ владения есть и положительная сторона, которую легко не заметить. Когда данные пишет только один сервис, схему можно проектировать под него, индексы — под его запросы, а миграцию можно выкатывать, когда это безопасно, потому что никто больше не читает таблицу напрямую. Цена автономности платится JOIN-ами и согласованностью, и платить её стоит, только если разделение было обосновано изначально.'
      ),
      bullets: [
        L('Only the owner of the data writes it and changes the schema.', 'Только владелец данных пишет их и меняет схему.'),
        L('A shared database couples services without any import to show it.', 'Общая база связывает сервисы, и в коде этого не видно.'),
        L('A join across services is impossible: duplicate, query or derive.', 'JOIN через сервисы невозможен: дублируй, запрашивай или выводи.'),
        L('Ownership lets the schema and the indexes be designed for one consumer.', 'Владение позволяет проектировать схему и индексы под одного потребителя.'),
        L('Autonomy costs joins and consistency, and is only worth paying after a justified split.', 'Автономность стоит JOIN-ов и согласованности, и платить стоит только за обоснованное разделение.'),
      ],
      code: `// The only way another service may read the data.
export interface CatalogApi { findProduct(id: string): Promise<Product | null> }
export interface Product { id: string; priceCents: number }

// Who may write which table.
export const DATA_OWNERS: Record<string, string> = {
  'catalog.products': 'catalog',
  'catalog.categories': 'catalog',
  'orders.orders': 'orders',
};

export function canWrite(service: string, table: string): boolean {
  return DATA_OWNERS[table] === service;
}

export class CatalogClient implements CatalogApi {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async findProduct(id: string): Promise<Product | null> {
    const response = await fetch(this.baseUrl + '/products/' + id);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('catalog service failed');
    return (await response.json()) as Product;
  }
}`,
      table: {
        caption: L('Shared database versus owned data', 'Общая база против собственных данных'),
        headers: [L('Aspect', 'Аспект'), L('Shared database', 'Общая база'), L('Owned data', 'Свои данные')],
        rows: [
          [
            L('Who writes the table', 'Кто пишет таблицу'),
            L('several services', 'несколько сервисов'),
            L('one owner', 'один владелец'),
          ],
          [
            L('Schema changes', 'Изменения схемы'),
            L('need a joint release', 'требуют совместного релиза'),
            L('the owner deploys them', 'владелец выкатывает сам'),
          ],
          [
            L('Cross-service question', 'Вопрос через сервисы'),
            L('a join', 'JOIN'),
            L('an API, an event or a read model', 'API, событие или модель чтения'),
          ],
          [
            L('Coupling', 'Связанность'),
            L('hidden in SQL', 'спрятана в SQL'),
            L('visible in the contracts', 'видна в контрактах'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The table that everyone reads', 'Таблица, которую читают все'),
          text: L(
            'Reading another service tables without asking the owner is the quiet way to become coupled. It works until the first schema change, and then it breaks with a stack trace that points nowhere near the cause.',
            'Чтение таблиц чужого сервиса без спроса его владельца — тихий способ стать связанным. Всё работает до первого изменения схемы, а потом ломается со стектрейсом, указывающим не туда.'
          ),
        },
      ],
      takeaway: L(
        'One writer per table and every other reader goes through the API, and the service stays independently deployable.',
        'Один писатель на таблицу, а все остальные читатели идут через API — и сервис остаётся независимо разворачиваемым.'
      ),
      seeAlso: [
        L('Section 4-2: microservices and splitting criteria', 'Секция 4-2: микросервисы и критерии разделения'),
        L('Section 4-6: testing a distributed system', 'Секция 4-6: тестирование распределённой системы'),
        L('Chapter 5: transactions, outbox and idempotency', 'Глава 5: транзакции, outbox и идемпотентность'),
      ],
    },
    {
      id: 'architecture-ch4-s5',
      title: L('What distribution costs you', 'Сколько стоит распределение'),
      body: L(
        'Distribution is not free, and the bill arrives in three places. Latency: every call between services is a network round trip, and a request that touches five services serially pays five round trips. Operations: a version of the system that is one process becomes twenty processes that must be monitored, deployed and restarted independently. Debugging: a stack trace that stops at a network boundary tells you where the request went, not where the decision was made.\n\nLatency is the part the user sees and the part that is easiest to get wrong. A synchronous call chain turns a local operation into a distributed transaction, and the slowest link sets the budget for the whole request. The usual answer is not more hardware but fewer hops: a cache in front of the slow dependency, a read model that answers the question locally, and asynchronous work moved out of the request path.\n\nThe operational cost is the one that decides whether a team can survive the split. A monolith with one database has one backup, one restore and one thing to look at when the traffic drops. Twenty services have twenty deployments, twenty sets of logs that have to be correlated, and a failure that is often a version skew: one service deployed, another not, and the contract between them no longer holds.\n\nThere is a debugging cost that is easy to underestimate. In one process the stack trace is the map. Across services you need a correlation id that travels with the request, structured logs that carry it, and traces that show where the time went. Without that, a distributed system produces symptoms without causes, and every incident turns into a manual search through logs that were never designed to be searched together.',
        'Распределение не бесплатно, и счёт приходит в трёх местах. Задержка: каждый вызов между сервисами — это сетевой круг, и запрос, проходящий через пять сервисов последовательно, платит пять кругов. Эксплуатация: система из одного процесса становится двадцатью процессами, которые надо мониторить, разворачивать и перезапускать по отдельности. Отладка: стектрейс, обрывающийся на сетевой границе, говорит, куда запрос ушёл, а не где было принято решение.\n\nЗадержка — часть, которую видит пользователь и которую легко испортить. Синхронная цепочка вызовов превращает локальную операцию в распределённую транзакцию, и самое медленное звено задаёт бюджет всего запроса. Обычный ответ — не больше железа, а меньше переходов: кэш перед медленной зависимостью, модель чтения, отвечающая на вопрос локально, и асинхронная работа, вынесенная из пути запроса.\n\nЭксплуатационная цена решает, выживет ли команда после разделения. У монолита с одной базой один бэкап, одно восстановление и одно место, куда смотрят, когда падает трафик. У двадцати сервисов двадцать развёртываний, двадцать наборов логов, которые надо сопоставлять, и типичный отказ — расхождение версий: один сервис выкатили, другой нет, и контракт между ними больше не выполняется.\n\nЕсть отладочная цена, которую легко недооценить. В одном процессе стектрейс и есть карта. Между сервисами нужен идентификатор корреляции, который идёт вместе с запросом, структурированные логи, которые его несут, и трейсы, показывающие, куда ушло время. Без этого распределённая система выдаёт симптомы без причин, и каждый инцидент превращается в ручной поиск по логам, которые никогда не проектировались под совместный поиск.'
      ),
      bullets: [
        L('Every cross-service call adds a network round trip to the request path.', 'Каждый вызов между сервисами добавляет сетевой круг к пути запроса.'),
        L('A synchronous chain of five services sets the budget of the whole request.', 'Синхронная цепочка из пяти сервисов задаёт бюджет всего запроса.'),
        L('A version skew between two services breaks the contract between them.', 'Расхождение версий двух сервисов ломает контракт между ними.'),
        L('Without a correlation id, a distributed system produces symptoms without causes.', 'Без идентификатора корреляции распределённая система даёт симптомы без причин.'),
        L('The bill arrives in latency, operations and debugging.', 'Счёт приходит в задержке, эксплуатации и отладке.'),
      ],
      code: `// Every call carries a deadline, shorter than the budget of its caller.
export async function withDeadline<T>(
  ms: number,
  work: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await work(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

// The latency budget of one request path, in milliseconds.
export const BUDGET = {
  total: 300,
  gateway: 20,
  catalog: 60,
  orders: 120,
  client: 100,
};

export function remaining(spent: Record<string, number>): number {
  const used = Object.values(spent).reduce((sum, value) => sum + value, 0);
  return BUDGET.total - used;
}`,
      table: {
        caption: L('What one process costs against twenty', 'Что стоит один процесс против двадцати'),
        headers: [L('Aspect', 'Аспект'), L('Monolith', 'Монолит'), L('Twenty services', 'Двадцать сервисов')],
        rows: [
          [
            L('Deployments', 'Развёртываний'),
            L('one', 'одно'),
            L('twenty, independently', 'двадцать, независимо'),
          ],
          [
            L('Backup and restore', 'Бэкап и восстановление'),
            L('one', 'один'),
            L('twenty', 'двадцать'),
          ],
          [
            L('Trace of a request', 'Трейс запроса'),
            L('the stack trace', 'стектрейс'),
            L('a correlation id and a trace', 'идентификатор корреляции и трейс'),
          ],
          [
            L('Typical failure', 'Типичный отказ'),
            L('a bug in the process', 'баг в процессе'),
            L('a version skew between services', 'расхождение версий сервисов'),
          ],
        ],
      },
      takeaway: L(
        'Distribution buys independent deployment and charges for it in latency, operations and debugging, so the split has to be worth those three prices.',
        'Распределение покупает независимое развёртывание и платит за него задержкой, эксплуатацией и отладкой — значит, разделение должно окупать все три цены.'
      ),
      seeAlso: [
        L('Section 4-3: communication and the API gateway', 'Секция 4-3: коммуникация и шлюз API'),
        L('Chapter 5: errors, logging and observability', 'Глава 5: ошибки, логирование и наблюдаемость'),
      ],
    },
    {
      id: 'architecture-ch4-s6',
      title: L('Testing a distributed system', 'Тестирование распределённой системы'),
      body: L(
        'Testing a distributed system is harder than testing the same code in one process, and the reason is that the boundaries worth testing are exactly the ones that fail. A unit test still covers the rules, and a test with a fake port still covers the use case. What is left is the contract between the services, and that contract is precisely what the unit tests cannot see, because a fake always answers the way the test expects.\n\nThe classic answer is the pyramid of the distributed system: many unit tests, fewer integration tests against real infrastructure in containers, and a handful of end-to-end tests that exercise the whole path. Each level is slower and more brittle than the one below it, so the number of tests at the top has to stay small enough to run on every change.\n\nThe middle level is where most of the value is. A provider test runs the real service against a test double of everything it depends on, and a consumer test runs the real consumer against a double of the provider. The pair is the contract test: the consumer declares what it needs, and the provider test fails when the provider stops delivering it. These tests run without deploying anything, which is what makes them usable in every pull request.\n\nWhat the tests cannot cover is the network itself: a partition, a slow answer, a duplicated message. Those failures are not bugs in the code but properties of the environment, so they are tested by injecting them: a proxy that delays the answer, a broker that delivers the message twice, a dependency that answers with an error. A system whose timeouts, retries and idempotency are written down as tests behaves very differently from one where they are hopes.',
        'Тестировать распределённую систему труднее, чем тот же код в одном процессе, и причина в том, что проверять там стоит именно те границы, которые ломаются. Юнит-тест по-прежнему покрывает правила, а тест с фейковым портом — сценарий. Остаётся контракт между сервисами, и именно его юнит-тесты не видят, потому что фейк всегда отвечает так, как ожидает тест.\n\nКлассический ответ — пирамида распределённой системы: много юнит-тестов, меньше интеграционных против настоящей инфраструктуры в контейнерах и горстка end-to-end тестов на весь путь. Каждый уровень медленнее и хрупче предыдущего, поэтому тестов наверху должно быть столько, чтобы их гоняли на каждом изменении.\n\nСамая ценная часть — средний уровень. Тест провайдера запускает настоящий сервис против тестовых двойников всех его зависимостей, а тест потребителя — настоящего потребителя против двойника провайдера. Вместе это контрактный тест: потребитель объявляет, что ему нужно, а тест провайдера падает, когда провайдер перестаёт это давать. Такие тесты идут без развёртываний, и именно поэтому их можно гонять на каждом pull request.\n\nЧего тесты не покрывают, так это сама сеть: разрыв, медленный ответ, повторно доставленное сообщение. Это не баги в коде, а свойства окружения, поэтому их проверяют инъекцией: прокси, который задерживает ответ, брокер, который доставляет сообщение дважды, зависимость, отвечающая ошибкой. Система, у которой таймауты, повторы и идемпотентность записаны тестами, ведёт себя совсем иначе, чем система, где они — надежда.'
      ),
      bullets: [
        L('Unit tests cover the rules, contract tests cover the boundary the fakes hide.', 'Юнит-тесты покрывают правила, контрактные тесты — границу, которую скрывают фейки.'),
        L('The pyramid holds in a distributed system: many fast tests, few end-to-end ones.', 'Пирамида работает и в распределённой системе: много быстрых тестов, мало end-to-end.'),
        L('A contract test pairs the consumer expectations with the provider behaviour.', 'Контрактный тест связывает ожидания потребителя с поведением провайдера.'),
        L('Contract tests run without a deployment, so they belong in every pull request.', 'Контрактные тесты идут без развёртывания, поэтому им место в каждом pull request.'),
        L('Network failures are injected on purpose: delay, duplication, error.', 'Сетевые отказы внедряют намеренно: задержка, дублирование, ошибка.'),
      ],
      code: `// The consumer declares what it needs from the provider.
export interface CatalogContract {
  getProduct(id: string): Promise<{ id: string; priceCents: number } | null>;
}

// A fake that satisfies the contract, used by the consumer test.
export class FakeCatalog implements CatalogContract {
  private readonly rows = new Map<string, { id: string; priceCents: number }>();
  async getProduct(id: string): Promise<{ id: string; priceCents: number } | null> {
    return this.rows.get(id) ?? null;
  }
  seed(id: string, priceCents: number): void {
    this.rows.set(id, { id, priceCents });
  }
}

// The provider test: the same expectations, run against the real provider.
export async function providerSatisfies(contract: CatalogContract): Promise<void> {
  const product = await contract.getProduct('p1');
  if (product === null) throw new Error('contract broken: p1 must exist');
  if (typeof product.priceCents !== 'number') {
    throw new Error('contract broken: priceCents must be a number');
  }
}`,
      table: {
        caption: L('The test levels of a distributed system', 'Уровни тестов распределённой системы'),
        headers: [L('Level', 'Уровень'), L('What it covers', 'Что покрывает'), L('Speed', 'Скорость')],
        rows: [
          [
            L('Unit test', 'Юнит-тест'),
            L('the rules of one module', 'правила одного модуля'),
            L('milliseconds', 'миллисекунды'),
          ],
          [
            L('Use case test with fakes', 'Тест сценария с фейками'),
            L('the orchestration', 'оркестрацию'),
            L('milliseconds', 'миллисекунды'),
          ],
          [
            L('Contract test', 'Контрактный тест'),
            L('the agreement between two services', 'договорённость двух сервисов'),
            L('seconds, no deployment', 'секунды, без развёртывания'),
          ],
          [
            L('End-to-end test', 'End-to-end тест'),
            L('the whole path', 'весь путь'),
            L('minutes', 'минуты'),
          ],
        ],
      },
      takeaway: L(
        'Test the contract between the services explicitly, and inject the network failures that no unit test will ever reproduce.',
        'Проверяй контракт между сервисами явно и внедряй сетевые отказы, которые ни один юнит-тест не воспроизведёт.'
      ),
      seeAlso: [
        L('Section 2-4: dependency inversion in practice', 'Секция 2-4: инверсия зависимостей на практике'),
        L('Section 4-4: data ownership', 'Секция 4-4: владение данными'),
        L('Chapter 5: testing the architecture', 'Глава 5: тестирование архитектуры'),
      ],
    },
  ],
};
