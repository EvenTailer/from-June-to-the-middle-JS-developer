import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh01: Chapter = {
  id: 'architecture-ch1',
  title: L('Layers and dependency direction', 'Слои и направление зависимостей'),
  summary: L(
    'What a layer really is, how a codebase is organised along two axes, why dependencies must point inward, what belongs in the presentation, application and data layers, and how a layer violation is recognised before it turns into a rewrite.',
    'Что такое слой на самом деле, как кодовая база организуется по двум осям, почему зависимости должны смотреть внутрь, что относится к слоям представления, приложения и данных и как распознать нарушение слоёв до того, как оно станет переписыванием.'
  ),
  sections: [
    {
      id: 'architecture-ch1-s1',
      title: L('What a layer is', 'Что такое слой'),
      body: L(
        'A layer is a ring of code that may depend only on the ring inside it and on nothing outside. The classic set of layers has a domain core, an application ring around it and two outer rings: presentation on one side and the data adapters on the other. The domain core holds entities, value objects, invariants and the business rules themselves. The application ring holds use cases and the ports they need. The presentation ring owns the transport: parsing a request, checking the shape of the input, rendering a response. The data ring owns the adapters that talk to databases, HTTP services, queues and clocks.\n\nThe domain core is the one layer that is allowed to depend on nothing but the language it is written in. When a business rule changes, the file that changes is in there. Everything around it exists to feed data in and to take results out, and none of it is allowed to leak back in. A domain object that knows the name of an ORM column is a domain object that has to be rewritten the next time the table changes, and it will be rewritten by whoever is closest to the deadline.\n\nThe relation between the rings is one-way: an outer ring may call an inner one, and an inner ring must not import an outer one. That includes the data ring. The application ring does not import the repository implementation; it declares the interface it needs, and the adapter implements it, so the source of the dependency is inverted. In the older three-tier shape the application layer called the data layer directly, and the data ring was the innermost one. That arrangement works, but it ties the business rules to the storage engine.\n\nA layer is only a name until something enforces it. A directory called /domain that freely imports the ORM is not a layer, it is a suggestion with a folder. Real enforcement comes from the import graph itself: a lint rule that forbids imports across a boundary, a dependency-cruiser configuration, an ESLint boundaries plugin, or a test that parses the imports and fails the build when the direction is wrong.',
        'Слой — это кольцо кода, которое может зависеть только от кольца внутри себя и больше ни от чего снаружи. Классический набор слоёв состоит из доменного ядра, прикладного кольца вокруг него и двух внешних колец: слоя представления с одной стороны и слоя данных с другой. Доменное ядро содержит сущности, объекты-значения, инварианты и сами доменные правила. Прикладное кольцо содержит сценарии использования и нужные им порты. Слой представления отвечает за транспорт: разбор запроса, проверку формы входных данных, формирование ответа. Слой данных отвечает за адаптеры, которые говорят с базами данных, HTTP-сервисами, очередями и часами.\n\nДоменное ядро — единственный слой, которому разрешено зависеть только от языка, на котором он написан. Когда меняется бизнес-правило, меняется файл внутри ядра. Всё вокруг существует, чтобы подать данные внутрь и забрать результат наружу, и ничто из этого не должно просачиваться обратно. Доменный объект, который знает имя колонки в ORM, — это доменный объект, который придётся переписывать при следующем изменении таблицы, и перепишет его тот, кто ближе к дедлайну.\n\nОтношение между кольцами одностороннее: внешнее кольцо может вызывать внутреннее, а внутреннее не должно импортировать внешнее. Это касается и слоя данных. Прикладное кольцо не импортирует реализацию репозитория: оно объявляет нужный интерфейс, а адаптер этот интерфейс реализует, и источник зависимости переворачивается. В прежней трёхслойной схеме прикладной слой вызывал слой данных напрямую, и слой данных был самым внутренним. Схема работает, но привязывает бизнес-правила к хранилищу.\n\nСлой — это просто имя, пока его никто не проверяет. Папка /domain, которая свободно импортирует ORM, — не слой, а пожелание с папкой. Настоящая проверка приходит из самого графа импортов: правило линтера, запрещающее импорты через границу, конфигурация dependency-cruiser, плагин boundaries для ESLint или тест, который разбирает импорты и валит сборку, когда направление неверное.'
      ),
      bullets: [
        L('A layer may depend on the ring inside it and on nothing outside.', 'Слой может зависеть только от кольца внутри себя и больше ни от чего.'),
        L('The domain core is the only layer that depends on nothing but the language.', 'Доменное ядро — единственный слой, зависящий только от самого языка.'),
        L('Presentation, application and data are the three technical rings.', 'Представление, приложение и данные — три технических кольца.'),
        L('The dependency direction is one-way: an outer ring calls an inner one.', 'Направление зависимостей одностороннее: внешнее кольцо вызывает внутреннее.'),
        L('A layer is a suggestion until a tool checks the import graph.', 'Слой остаётся пожеланием, пока граф импортов никто не проверяет.'),
      ],
      code: `// src/
//   domain/         // entities, value objects, domain rules
//     order.ts
//     money.ts
//   application/    // use cases and the ports they need
//     place-order.ts
//     ports.ts
//   presentation/   // http controllers, cli commands, ui
//     http/place-order-controller.ts
//   data/           // adapters: postgres, http clients, queues, clock
//     postgres-order-repository.ts`,
      table: {
        caption: L('The layers and what each one owns', 'Слои и то, что принадлежит каждому'),
        headers: [L('Layer', 'Слой'), L('Owns', 'Отвечает за'), L('May import', 'Может импортировать')],
        rows: [
          [
            L('Domain core', 'Доменное ядро'),
            L('entities, invariants, business rules', 'сущности, инварианты, доменные правила'),
            L('nothing but the language', 'ничего, кроме самого языка'),
          ],
          [
            L('Application', 'Прикладной слой'),
            L('use cases, ports, orchestration', 'сценарии использования, порты, оркестрация'),
            L('the domain core', 'доменное ядро'),
          ],
          [
            L('Presentation', 'Слой представления'),
            L('parsing the request, rendering the response', 'разбор запроса, формирование ответа'),
            L('the application layer', 'прикладной слой'),
          ],
          [
            L('Data', 'Слой данных'),
            L('repositories, clients, queues, clocks', 'репозитории, клиенты, очереди, часы'),
            L('the ports it implements', 'порты, которые реализует'),
          ],
        ],
      },
      takeaway: L(
        'A layer is a ring of code with one allowed dependency direction, and it exists only when a tool checks that direction.',
        'Слой — это кольцо кода с одним разрешённым направлением зависимостей, и он существует, только если это направление проверяет инструмент.'
      ),
      seeAlso: [
        L('Section 1-3: why dependencies point inward', 'Секция 1-3: почему зависимости смотрят внутрь'),
        L('Chapter 2: clean architecture and the ports that invert the dependency', 'Глава 2: чистая архитектура и порты, которые переворачивают зависимость'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
      ],
    },
    {
      id: 'architecture-ch1-s2',
      title: L('Two axes of organisation', 'Две оси организации'),
      body: L(
        'A codebase needs two axes at once, and choosing only one of them is a common early mistake. The technical axis answers the question of where the code lives according to its role: controllers, services, repositories, models, helpers. The business axis answers the question of which capability the code serves: checkout, billing, catalog, notifications. A layer is a slice along the first axis, a module is a slice along the second, and a working codebase keeps both.\n\nOrganising only by type gives a tidy top level of /controllers, /services and /models. Everything about one feature is scattered across three trees, so a single change touches a dozen files in unrelated folders, the reviewer has to hold the whole feature in memory, and a newcomer cannot find the code of a capability without a map. The cost of that tidiness shows up later as merge conflicts, slow onboarding and a codebase where nobody is sure which rule lives where.\n\nOrganising only by business has the opposite failure. The features are clean, but the shared technical infrastructure, the HTTP client, the logger and the date helpers, end up duplicated in every feature folder. Two features then grow two slightly different versions of the same utility, and the bug that gets fixed in one copy stays in the other. A folder called /shared that is really a dump for code nobody wanted to place is the usual symptom.\n\nThe workable answer is to organise by feature and to keep the layers inside each feature. The checkout folder holds its own UI, its own use cases, its own domain objects and its own adapters, while genuinely shared infrastructure lives outside the features. Inside a feature the layering rule still applies, so the dependency direction stays visible, but the unit you navigate by is the thing the business changes.',
        'Кодовой базе нужны две оси сразу, и выбор только одной из них — распространённая ранняя ошибка. Техническая ось отвечает на вопрос, где живёт код по своей роли: контроллеры, сервисы, репозитории, модели, хелперы. Бизнес-ось отвечает на вопрос, какой возможности служит код: checkout, billing, catalog, notifications. Слой — это срез по первой оси, модуль — срез по второй, и рабочая кодовая база держит обе.\n\nОрганизация только по типам даёт опрятный верхний уровень из /controllers, /services и /models. Всё, что касается одной фичи, размазано по трём деревьям, поэтому одно изменение трогает десяток файлов в несвязанных папках, ревьюеру приходится держать всю фичу в голове, а новичок не может найти код возможности без карты. Цена этой опрятности потом всплывает как конфликты при слиянии, медленный онбординг и кодовая база, в которой никто не уверен, где живёт правило.\n\nОрганизация только по бизнесу даёт противоположный провал. Фичи чистые, но общая техническая инфраструктура — HTTP-клиент, логгер и хелперы дат — дублируется в каждой папке фичи. Две фичи выращивают две слегка разные версии одного и того же хелпера, и баг, исправленный в одной копии, остаётся в другой. Обычный симптом этого — папка /shared, которая на деле является свалкой для кода, который никто не хотел никуда положить.\n\nРабочий ответ — организовывать по фичам и держать слои внутри каждой фичи. Папка checkout содержит свои UI, свои сценарии, свои доменные объекты и свои адаптеры, а по-настоящему общая инфраструктура живёт вне фич. Внутри фичи правило слоёв по-прежнему работает, поэтому направление зависимостей видно, но единица навигации — то, что меняет бизнес.'
      ),
      bullets: [
        L('The technical axis organises by role, the business axis by capability.', 'Техническая ось организует по роли, бизнес-ось — по возможности.'),
        L('Layers cut along the technical axis, modules along the business axis.', 'Слои режут код по технической оси, модули — по бизнес-оси.'),
        L('Folders by type scatter one feature across many directories.', 'Папки по типам размазывают одну фичу по многим папкам.'),
        L('Folders by business duplicate the shared infrastructure.', 'Папки по бизнесу дублируют общую инфраструктуру.'),
        L('Organise by feature and keep the layers inside the feature.', 'Организуй по фичам и держи слои внутри фичи.'),
      ],
      code: `// by type: one feature is scattered across three trees
// src/
//   controllers/  orderController.ts, invoiceController.ts
//   services/     orderService.ts, invoiceService.ts
//   models/       order.ts, invoice.ts

// by feature: everything that changes together stays together
// src/
//   features/
//     order/    ui/  use-cases/  domain/  data/
//     invoice/  ui/  use-cases/  domain/  data/
//   shared/     http/  logger/  money/`,
      table: {
        caption: L('The two axes of a codebase', 'Две оси кодовой базы'),
        headers: [L('Axis', 'Ось'), L('Question it answers', 'На что отвечает'), L('What it produces', 'Что даёт')],
        rows: [
          [
            L('Technical', 'Техническая'),
            L('Where does this code live by role?', 'Где живёт этот код по своей роли?'),
            L('layers: presentation, application, data', 'слои: представление, приложение, данные'),
          ],
          [
            L('Business', 'Бизнес'),
            L('Which capability does this code serve?', 'Какой возможности служит этот код?'),
            L('modules: checkout, billing, catalog', 'модули: checkout, billing, catalog'),
          ],
          [
            L('Both', 'Обе'),
            L('How are the layers arranged inside a feature?', 'Как расположены слои внутри фичи?'),
            L('feature folders with layers inside', 'папки фич со слоями внутри'),
          ],
        ],
      },
      takeaway: L(
        'Organise by feature and keep the layers inside it, and the two axes stop fighting each other.',
        'Организуй по фичам и держи слои внутри фичи — тогда две оси перестают мешать друг другу.'
      ),
      seeAlso: [
        L('Section 1-1: what a layer is', 'Секция 1-1: что такое слой'),
        L('Chapter 3: module boundaries and feature-based architecture', 'Глава 3: границы модулей и архитектура по фичам'),
      ],
    },
    {
      id: 'architecture-ch1-s3',
      title: L('Why dependencies point inward', 'Почему зависимости смотрят внутрь'),
      body: L(
        'The dependency rule is the most useful constraint in layered architecture: an outer layer may call the inner one, the inner one must not know about the outer. The reason is not aesthetic, it is about what you can change on your own. If the domain imports the ORM, replacing the ORM becomes a rewrite of the business rules. If the domain imports nothing external, the same code is reused from a REST API, a CLI command and a queue consumer without a single edit.\n\nThe rule also decides where a piece of logic belongs. A check that an order cannot be cancelled after it was shipped is a business rule, so it belongs to the domain, and every caller gets it for free. A check that the field orderId is present in the JSON body is a transport concern, so it belongs to the presentation layer, next to the code that parses the body. Mixing them produces the fat controller, where a rule is buried in a handler and protects only the callers that happen to pass through it.\n\nThe principle behind the rule is that policy must not depend on mechanism. The rule "an order cannot be shipped twice" is a policy; the SQL statement, the queue and the HTTP call are mechanisms. As long as the mechanism may reach the policy, the policy stays testable on its own and survives every replacement of the mechanism. Reverse the direction and the policy becomes a client of the mechanism, and every new transport has to re-implement it.\n\nThe rule is easy to state and easy to break by accident, because the language does not stop you. TypeScript will happily let a file in the domain import axios, and the compiler will not complain. That is why the rule has to be checked mechanically: a lint rule that forbids imports across a boundary, a dependency-cruiser configuration, an ESLint boundaries plugin, or a test that parses the import graph and fails the build.',
        'Правило зависимостей — самая полезная констрейнта слоистой архитектуры: внешний слой может вызывать внутренний, а внутренний не должен знать про внешний. Причина не в эстетике, а в независимости изменений. Если домен импортирует ORM, замена ORM превращается в переписывание бизнес-правил. Если домен не импортирует ничего внешнего, тот же код переиспользуется из REST API, CLI-команды и потребителя очереди без единой правки.\n\nПравило также решает, где живёт кусок логики. Проверка «заказ нельзя отменить после отгрузки» — доменное правило, значит, оно в домене, и все вызывающие получают его бесплатно. Проверка «в теле запроса есть поле orderId» — транспортная забота, значит, она в слое представления, рядом с кодом, который разбирает тело. Смешение даёт толстый контроллер, где правило спрятано в обработчике и защищает лишь тех, кто случайно проходит через него.\n\nПринцип, стоящий за правилом, такой: политика не должна зависеть от механизма. Правило «заказ нельзя отгрузить дважды» — это политика, а SQL-выражение, очередь и HTTP-вызов — это механизмы. Пока механизм может дотянуться до политики, политика остаётся тестируемой сама по себе и переживает любую замену механизма. Развернём направление — и политика становится клиентом механизма, и каждому новому транспорту придётся переписывать её заново.\n\nПравило легко сформулировать и легко нарушить по невнимательности: язык не запрещает. TypeScript спокойно разрешит файлу из домена импортировать axios, и компилятор не пожалуется. Поэтому правило проверяют механически: правилом линтера, запрещающим импорты через границу, конфигурацией dependency-cruiser, плагином boundaries для ESLint или тестом, который разбирает граф импортов и валит сборку.'
      ),
      bullets: [
        L('The rule exists so the core can change without rewriting the core.', 'Правило нужно, чтобы ядро менялось, не переписывая само себя.'),
        L('Policy must not depend on mechanism.', 'Политика не должна зависеть от механизма.'),
        L('A business rule in the domain protects every caller.', 'Доменное правило в домене защищает каждого вызывающего.'),
        L('Types do not enforce the rule, tooling does.', 'Типы правило не проверяют — это делает инструментарий.'),
        L('Enforcement in CI beats enforcement in a review checklist.', 'Проверка в CI надёжнее проверки в чек-листе ревью.'),
      ],
      code: `export interface Order { id: string; total: number }

// The core declares the port it needs, not the database it talks to.
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// The use case depends on the port only.
export async function placeOrder(id: string, orders: OrderRepository): Promise<void> {
  const order = await orders.findById(id);
  if (!order) throw new Error('order not found');
  await orders.save({ ...order, total: order.total + 100 });
}

// The adapter implements the port and knows about the storage.
export class InMemoryOrders implements OrderRepository {
  private readonly rows = new Map<string, Order>();
  async findById(id: string): Promise<Order | null> {
    return this.rows.get(id) ?? null;
  }
  async save(order: Order): Promise<void> {
    this.rows.set(order.id, order);
  }
}`,
      table: {
        caption: L('Where each kind of check belongs', 'Где живёт какая проверка'),
        headers: [L('Check', 'Проверка'), L('Kind', 'Вид'), L('Belongs to', 'Принадлежит')],
        rows: [
          [
            L('The order cannot be cancelled after shipping', 'Заказ нельзя отменить после отгрузки'),
            L('business rule', 'доменное правило'),
            L('the domain core', 'доменному ядру'),
          ],
          [
            L('The request body has an orderId field', 'В теле запроса есть поле orderId'),
            L('transport concern', 'транспортная забота'),
            L('the presentation layer', 'слою представления'),
          ],
          [
            L('The order total is below the discount limit', 'Сумма заказа ниже скидки'),
            L('business rule', 'доменное правило'),
            L('the domain core', 'доменному ядру'),
          ],
          [
            L('The content type of the request is JSON', 'Content type запроса — JSON'),
            L('transport concern', 'транспортная забота'),
            L('the presentation layer', 'слою представления'),
          ],
        ],
      },
      takeaway: L(
        'Point dependencies inward so that the business rules stay independent of the mechanism that runs them.',
        'Направляй зависимости внутрь, чтобы бизнес-правила оставались независимыми от механизма, который их выполняет.'
      ),
      seeAlso: [
        L('Section 2-4: dependency inversion in practice', 'Секция 2-4: инверсия зависимостей на практике'),
        L('Section 1-5: layer violations and how to spot them', 'Секция 1-5: нарушения слоёв и как их замечать'),
      ],
    },
    {
      id: 'architecture-ch1-s4',
      title: L('Presentation, application and data layers', 'Слои представления, приложения и данных'),
      body: L(
        'The presentation layer should be as thin as it can be without becoming meaningless. Its job is translation: read the request, check the shape of the input, call exactly one use case, map the result into the response format. Anything beyond translation is business logic that leaked into the transport, and it shows up as a rule that only exists for HTTP clients: a background job that writes the same order takes a different path and quietly skips it.\n\nThe application layer is where the use cases live. A use case takes a command, coordinates the domain objects and the ports, runs inside a unit of work and returns a result. It is the natural home for orchestration: load the order, check the stock, reserve it, charge the payment, publish the event. Note what is not on the list: no SQL, no HTTP client, no framework object. The use case talks to interfaces, and the implementations arrive from the outside.\n\nThe data layer deserves one warning. A repository that mirrors the table structure, with methods like findByStatusAndCreatedAtAfter, is a DAO with a new name: it leaks the storage model into the application layer and turns every schema change into a change of the domain vocabulary. A repository that speaks the domain, with findById, findByCustomer and save, keeps the schema an implementation detail of the adapter.\n\nThe trade-off is honest and worth stating. Rich domain queries need either a specification object or an explicit read model, and both cost extra work: more types, more mapping, a second way to ask the same question. Small systems should accept the simpler repository and watch for the moment the query count grows. The rule of thumb is that the repository may be as thin as the domain allows, and not thinner.',
        'Слой представления должен быть максимально тонким, но не бессмысленным. Его работа — перевод: прочитать запрос, проверить форму входных данных, вызвать ровно один сценарий, отобразить результат в формат ответа. Всё, что выходит за рамки перевода, — утечка бизнес-логики в транспорт, и она видна как правило, живущее только для HTTP-клиентов: фоновая задача, которая пишет тот же заказ, идёт другим путём и тихо его пропускает.\n\nПрикладной слой — место сценариев использования. Сценарий принимает команду, координирует доменные объекты и порты, выполняется в единице работы и возвращает результат. Это естественный дом для оркестрации: загрузить заказ, проверить остаток, зарезервировать, списать деньги, опубликовать событие. Обратите внимание, чего в списке нет: ни SQL, ни HTTP-клиента, ни объектов фреймворка. Сценарий работает с интерфейсами, а реализации приходят снаружи.\n\nСлой данных требует одного предупреждения. Репозиторий, повторяющий структуру таблицы, с методами вида findByStatusAndCreatedAtAfter, — это DAO под новым именем: он протаскивает модель хранения в прикладной слой и превращает каждое изменение схемы в изменение словаря домена. Репозиторий, который говорит на языке домена, с findById, findByCustomer и save, оставляет схему деталью реализации адаптера.\n\nКомпромисс честный, и его стоит назвать. Богатые доменные запросы требуют либо specification-объекта, либо отдельной модели чтения, и обе вещи стоят дополнительной работы: больше типов, больше маппинга, второй способ задать тот же вопрос. Небольшим системам стоит принять простой репозиторий и следить за моментом, когда запросов станет много. Правило звучит так: репозиторий может быть тонким настолько, насколько позволяет домен, но не тоньше.'
      ),
      bullets: [
        L('The controller translates, it does not decide.', 'Контроллер переводит, а не решает.'),
        L('A use case orchestrates the domain and the ports, and nothing else.', 'Сценарий координирует домен и порты, и больше ничего.'),
        L('A repository that mirrors a table is a DAO with a new name.', 'Репозиторий, повторяющий таблицу, — DAO под новым именем.'),
        L('The data layer owns the mechanism, the domain owns the rule.', 'Слой данных владеет механизмом, домен — правилом.'),
        L('A rich domain query needs a specification object or a read model.', 'Богатый доменный запрос требует specification-объекта или модели чтения.'),
      ],
      code: `export interface Order { id: string; total: number }
export interface OrderRepository { findById(id: string): Promise<Order | null>; save(order: Order): Promise<void> }
export interface EventPublisher { publish(event: { type: string; orderId: string }): Promise<void> }

// application: orchestration, no transport and no SQL
export async function placeOrder(
  id: string,
  orders: OrderRepository,
  events: EventPublisher
): Promise<void> {
  const order = await orders.findById(id);
  if (!order) throw new Error('order not found');
  await orders.save({ ...order, total: order.total + 100 });
  await events.publish({ type: 'OrderPlaced', orderId: id });
}

// presentation: translation only
export async function postOrder(
  body: unknown,
  deps: { orders: OrderRepository; events: EventPublisher }
): Promise<{ status: number; json: unknown }> {
  const { id } = body as { id: string };
  await placeOrder(id, deps.orders, deps.events);
  return { status: 201, json: { id } };
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The rule that only HTTP applies', 'Правило, которое работает только по HTTP'),
          text: L(
            'A discount rule written inside a controller is enforced for the HTTP clients only. The queue consumer and the CLI command reuse the domain, and they silently lose the rule. Move the rule into the domain object and every path gets it at once.',
            'Правило скидки, написанное внутри контроллера, работает только для HTTP-клиентов. Потребитель очереди и CLI-команда переиспользуют домен и молча теряют правило. Перенесите правило в доменный объект — и сразу получат его все пути.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the data layer replaceable', 'Держите слой данных заменяемым'),
          text: L(
            'If the adapter is the only place that knows about tables, columns and SQL, replacing the database is an adapter rewrite. If the SQL appears in the application layer, the same replacement becomes a rewrite of the business logic.',
            'Если про таблицы, колонки и SQL знает только адаптер, замена базы — это переписывание адаптера. Если SQL встречается в прикладном слое, та же замена становится переписыванием бизнес-логики.'
          ),
        },
      ],
      takeaway: L(
        'The controller translates, the use case orchestrates, the domain decides and the adapter persists.',
        'Контроллер переводит, сценарий координирует, домен решает, адаптер сохраняет.'
      ),
      seeAlso: [
        L('Section 2-2: use cases as the application core', 'Секция 2-2: сценарии использования как ядро приложения'),
        L('Section 2-5: mapping between layers', 'Секция 2-5: маппинг между слоями'),
      ],
    },
    {
      id: 'architecture-ch1-s5',
      title: L('Layer violations and how to spot them', 'Нарушения слоёв и как их замечать'),
      body: L(
        'A violation has a recognisable shape. The domain file imports the ORM or the HTTP framework. The use case builds a query string or calls fetch directly. The controller computes a discount. The repository returns a database row and the application layer then reads its fields. Each of these looks like a small convenience at the moment it is written, and each one moves a decision to a place where the domain cannot see it.\n\nThe second shape is quieter: a shared utility that imports from a feature. A helper in /shared that knows about the order model is not shared any more, it is a dependency that runs in both directions, and the next feature that needs it drags the first feature into the build. The third shape is the cycle: two modules import each other, sometimes through barrels, and the order in which the module bodies are evaluated decides which one sees a half-initialised export.\n\nNone of this breaks the compiler, so it accumulates quietly. The way to catch it is to look at the import graph rather than the files: which directories import which, whether the graph has a cycle, and whether a file outside a layer reaches inside it. A dependency-cruiser configuration, an ESLint boundaries plugin or a small script over the import statements answers those questions in CI, where a reviewer would answer them only by accident.\n\nWhen a violation is found, the repair is rarely the move of one file. Most of the time the rule has to be extracted into the domain, a port has to be declared for the mechanism, and the implementation has to be passed in from the composition root. That is why the direction of the dependencies is worth fixing early: the cost of moving a rule into the domain grows with the number of callers that already depend on where it used to live.',
        'Нарушение имеет узнаваемую форму. Доменный файл импортирует ORM или HTTP-фреймворк. Сценарий собирает строку запроса или вызывает fetch напрямую. Контроллер считает скидку. Репозиторий возвращает строку базы, а прикладной слой потом читает её поля. Каждое выглядит маленьким удобством в момент написания, и каждое уносит решение туда, где домен его не увидит.\n\nВторая форма тише: общий хелпер, импортирующий что-то из фичи. Хелпер в /shared, который знает про модель заказа, уже не общий, а зависимость, работающая в обе стороны, и следующая фича, которой он понадобится, притащит первую фичу в свою сборку. Третья форма — цикл: два модуля импортируют друг друга, иногда через баррели, и порядок вычисления тел модулей решает, кто увидит недозаполненный экспорт.\n\nНичто из этого не ломает компилятор, поэтому нарушения копятся тихо. Ловить их надо, глядя на граф импортов, а не на отдельные файлы: какие папки какие импортируют, есть ли в графе цикл и достигает ли файл извне слоя до внутреннего. Конфигурация dependency-cruiser, плагин boundaries для ESLint или небольшой скрипт по импортам отвечают на эти вопросы в CI, где ревьюер отвечал бы на них случайно.\n\nКогда нарушение найдено, починка редко сводится к переносу одного файла. Обычно правило приходится вытащить в домен, объявить порт для механизма и передать реализацию из точки композиции. Поэтому направление зависимостей стоит чинить рано: цена переноса правила в домен растёт вместе с числом вызывающих, которые уже зависят от его прежнего места.'
      ),
      bullets: [
        L('The domain importing the ORM is the violation you meet first.', 'Домен, импортирующий ORM, — первое нарушение, которое вы встретите.'),
        L('A use case that calls fetch has quietly become an adapter.', 'Сценарий, вызывающий fetch, тихо стал адаптером.'),
        L('A shared helper that knows a feature is not shared code.', 'Общий хелпер, знающий про фичу, — уже не общий код.'),
        L('Look at the import graph, not at the file that happens to be open.', 'Смотри на граф импортов, а не на файл, который случайно открыт.'),
        L('Moving a rule into the domain gets more expensive with every caller.', 'Перенос правила в домен дорожает с каждым новым вызывающим.'),
      ],
      code: `const LAYERS = ['domain', 'application', 'presentation', 'data'];

// Each layer may import only the layers listed here.
const ALLOWED: Record<string, string[]> = {
  domain: [],
  application: ['domain'],
  presentation: ['application', 'domain'],
  data: ['application', 'domain'],
};

function layerOf(path: string): string | null {
  return LAYERS.find((layer) => path.includes('/' + layer + '/')) ?? null;
}

// The import graph is the architecture, so check the graph.
export function findViolations(files: Record<string, string>): string[] {
  const violations: string[] = [];
  for (const [file, source] of Object.entries(files)) {
    const from = layerOf(file);
    if (!from) continue;
    for (const match of source.matchAll(/from\\s+'([^']+)'/g)) {
      const to = layerOf(match[1]);
      if (to && !ALLOWED[from].includes(to)) violations.push(file + ' -> ' + match[1]);
    }
  }
  return violations;
}`,
      table: {
        caption: L('Violation, symptom and repair', 'Нарушение, симптом и починка'),
        headers: [L('Violation', 'Нарушение'), L('Symptom', 'Симптом'), L('Repair', 'Починка')],
        rows: [
          [
            L('The domain imports the ORM', 'Домен импортирует ORM'),
            L('a schema change breaks the rules', 'изменение схемы ломает правила'),
            L('move the mapping into an adapter', 'перенести маппинг в адаптер'),
          ],
          [
            L('The use case calls fetch', 'Сценарий вызывает fetch'),
            L('the core needs a network to run', 'ядру нужен сеть для работы'),
            L('declare a port and pass the client in', 'объявить порт и передать клиента'),
          ],
          [
            L('The controller computes a discount', 'Контроллер считает скидку'),
            L('other entry points skip the rule', 'другие точки входа теряют правило'),
            L('move the rule into the domain', 'перенести правило в домен'),
          ],
          [
            L('Two features import each other', 'Две фичи импортируют друг друга'),
            L('the build order decides the result', 'порядок сборки решает результат'),
            L('break the cycle at the shared API', 'разорвать цикл через общий API'),
          ],
        ],
      },
      takeaway: L(
        'Architecture rules are checked on the import graph in CI, because no review reads every import.',
        'Архитектурные правила проверяются по графу импортов в CI, потому что ни одно ревью не читает все импорты.'
      ),
      seeAlso: [
        L('Section 1-3: why dependencies point inward', 'Секция 1-3: почему зависимости смотрят внутрь'),
        L('Section 3-4: cycles and enforced boundaries', 'Секция 3-4: циклы и контролируемые границы'),
        L('Chapter 5: testing the architecture with dependency rules', 'Глава 5: тестирование архитектуры правилами зависимостей'),
      ],
    },
  ],
};
