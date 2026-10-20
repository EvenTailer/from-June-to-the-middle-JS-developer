import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh06: Chapter = {
  id: 'oop-ch6',
  title: L('Domain building blocks', 'Строительные блоки домена'),
  summary: L(
    'Entities, aggregates, value objects, domain events, use cases and the application context: the pieces that turn a pile of functions into a model that protects its own rules.',
    'Сущности, агрегаты, объекты-значения, доменные события, сценарии использования и контекст приложения: детали, которые превращают набор функций в модель, оберегающую собственные правила.'
  ),
  sections: [
    {
      id: 'oop-ch6-s1',
      title: L('Entities, aggregates and invariants', 'Сущности, агрегаты и инварианты'),
      body: L(
        'An entity has an identity that survives every change: the same customer before and after a rename is the same customer, because the id is the same. Two entities with identical field values are still two different entities, so equality is by id and never by fields. A value object is the mirror image of that: it has no identity of its own, compares by its values and is immutable.\n\nAn aggregate is a cluster of objects treated as one unit of consistency, with exactly one aggregate root as the entry point. The rule that keeps the cluster coherent is that outside code may only load a root, call its methods and save it; it must never reach inside and assign to a part. The root is where the invariants live, because the root is the only object that sees the whole of the aggregate and can therefore judge whether a change is legal.\n\nAn invariant is a rule that must hold for every valid instance. The classic test is simple: if an invalid state can be constructed, the rule is not enforced. Validating in the constructor and in every method that changes state turns the rule from a comment into a guarantee, and it lets the rest of the code assume the rule holds instead of re-checking it in ten different places.',
        'Сущность имеет идентичность, которая переживает любые изменения: тот же клиент до и после переименования остаётся тем же клиентом, потому что идентификатор прежний. Две сущности с одинаковыми значениями полей всё равно остаются двумя разными сущностями, поэтому равенство проверяется по идентификатору, а не по полям. Объект-значение — зеркальное отражение: у него нет собственной идентичности, он сравнивается по значениям и неизменяем.\n\nАгрегат — это группа объектов, которую считают единицей согласованности, и у агрегата ровно один корень, служащий точкой входа. Правило, которое держит группу связной, звучит так: внешний код может только загрузить корень, вызвать его методы и сохранить его; заглядывать внутрь и присваивать значения его частям нельзя. В корне живут инварианты, потому что корень — единственный объект, который видит агрегат целиком и потому способен решить, допустимо ли изменение.\n\nИнвариант — это правило, которое должно выполняться для каждого корректного экземпляра. Классическая проверка проста: если недопустимое состояние можно построить, значит правило не соблюдается. Проверка в конструкторе и в каждом методе, меняющем состояние, превращает правило из комментария в гарантию и позволяет остальному коду считать, что правило выполняется, вместо того чтобы перепроверять его в десяти разных местах.'
      ),
      bullets: [
        L('An entity is identified by its id and compared by it, not by its fields.', 'Сущность опознаётся по идентификатору и сравнивается по нему, а не по полям.'),
        L('A value object has no identity and is compared by its values.', 'У объекта-значения нет идентичности, он сравнивается по значениям.'),
        L('An aggregate is a consistency boundary with exactly one root as the entry point.', 'Агрегат — это граница согласованности с единственным корнем как точкой входа.'),
        L('Outside code calls methods on the root and never assigns to its parts.', 'Внешний код вызывает методы корня и никогда не присваивает его частям.'),
        L('An invariant is enforced, not documented: an invalid instance must not be constructible.', 'Инвариант соблюдается, а не документируется: недопустимый экземпляр не должен создаваться.'),
      ],
      code: `interface OrderLine { sku: string; price: number; qty: number }

class Order {
  readonly id: string;
  #lines: OrderLine[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addLine(line: OrderLine): void {
    this.#lines.push(line);
  }

  get total(): number {
    return this.#lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  }
}

const order = new Order('o-1');
order.addLine({ sku: 'sku-1', price: 250, qty: 2 });
order.total; // 500`,
      table: {
        caption: L('Entity against value object', 'Сущность против объекта-значения'),
        headers: [L('Aspect', 'Аспект'), L('Entity', 'Сущность'), L('Value object', 'Объект-значение')],
        rows: [
          [L('Identity', 'Идентичность'), L('Has one, survives changes', 'Есть, переживает изменения'), L('Has none', 'Нет')],
          [L('Equality', 'Равенство'), L('By id', 'По идентификатору'), L('By values', 'По значениям')],
          [L('Mutability', 'Изменяемость'), L('Changes, keeps its id', 'Меняется, сохраняя идентификатор'), L('Never changes', 'Не меняется')],
          [L('Typical example', 'Типичный пример'), L('Order, Customer, Account', 'Заказ, клиент, счёт'), L('Money, Email, DateRange', 'Money, Email, диапазон дат')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The aggregate is not a bag of objects', 'Агрегат — не мешок объектов'),
          text: L(
            'Two orders that belong to the same customer are not one aggregate just because they share an id. An aggregate is defined by the invariants it protects, and if you cannot name an invariant that spans both objects, they are two aggregates and each keeps its own root.',
            'Два заказа одного клиента не становятся одним агрегатом из-за общего идентификатора. Агрегат определяется инвариантами, которые он защищает, и если вы не можете назвать инвариант, охватывающий оба объекта, это два агрегата, и у каждого свой корень.'
          ),
        },
      ],
      takeaway: L(
        'Give every entity an id, make every value object immutable, and let only the aggregate root decide whether a change is legal.',
        'Дайте каждой сущности идентификатор, сделайте каждый объект-значение неизменяемым и позвольте решать легальность изменения только корню агрегата.'
      ),
      seeAlso: [
        L('Section 6-2: value objects in detail', 'Секция 6-2: объекты-значения подробно'),
        L('Section 5-3: repository and unit of work', 'Секция 5-3: репозиторий и единица работы'),
        L('Chapter 3: composition over inheritance', 'Глава 3: композиция вместо наследования'),
      ],
    },
    {
      id: 'oop-ch6-s2',
      title: L('Value objects', 'Объекты-значения'),
      body: L(
        'A value object is defined by its attributes rather than by an identity: two Money instances with the same amount and currency are interchangeable, and swapping one for the other changes nothing. That property is what makes them safe to share, and it forces immutability, because an object that compares by value cannot be changed under the caller without invalidating comparisons that were true a moment ago.\n\nThe payoff is that the type system starts carrying the rules. A function that accepts a Money cannot receive a plain number, so a bug where cents are added to euros becomes a compile error instead of a wrong total that reaches production. Money, Email, DateRange and OrderId are the usual candidates: small, comparable, and carrying a rule that the plain primitive does not express.\n\nValue objects also dissolve the data clump. When three functions take the same three primitives in the same order, that group belongs in a type, and the type makes the mistake of swapping two arguments impossible. The mistake to avoid is a value object with a mutable field: once a Money can be changed after creation, the equality contract breaks, because two objects that were equal can silently become different with no visible reason.',
        'Объект-значение определён своими атрибутами, а не идентичностью: два экземпляра Money с одинаковой суммой и валютой взаимозаменяемы, и замена одного другим ничего не меняет. Именно это свойство делает их безопасными для разделения, и оно же требует неизменяемости: объект, который сравнивается по значениям, нельзя изменить под ногами у вызывающего, иначе сравнения, бывшие истинными минуту назад, перестанут быть истинными.\n\nВыгода в том, что правила начинает нести система типов. Функция, принимающая Money, не примет обычное число, поэтому ошибка, где к центам прибавляют рубли, превращается в ошибку компиляции, а не в неверную сумму, дошедшую до продакшена. Обычные кандидаты — Money, Email, DateRange и OrderId: маленькие, сравнимые и несущие правило, которого не выражает простой примитив.\n\nОбъекты-значения заодно растворяют кластер данных. Когда три функции принимают три одинаковых примитива в одинаковом порядке, эта группа заслуживает собственный тип, и тип делает ошибку с переставленными аргументами невозможной. Ошибка, которой надо избегать, — изменяемое поле у объекта-значения: как только Money можно изменить после создания, контракт равенства ломается, потому что два равных объекта молча становятся разными без видимой причины.'
      ),
      bullets: [
        L('A value object compares by value and carries no identity of its own.', 'Объект-значение сравнивается по значениям и не несёт собственной идентичности.'),
        L('Value objects are immutable, otherwise equality becomes unreliable.', 'Объекты-значения неизменяемы, иначе равенство становится ненадёжным.'),
        L('Wrapping a primitive in a type moves the rule into the compiler.', 'Обёртка примитива в тип переносит правило в компилятор.'),
        L('A group of parameters that always travel together is a data clump.', 'Группа параметров, которые всегда ходят вместе, — это кластер данных.'),
        L('Never give a value object a mutable field or an id.', 'Никогда не давайте объекту-значению изменяемое поле или идентификатор.'),
      ],
      code: `class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    if (!Number.isInteger(amount)) throw new Error('amount must be an integer');
    this.amount = amount;
    this.currency = currency;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  plus(other: Money): Money {
    if (other.currency !== this.currency) throw new Error('currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
}

new Money(1999, 'EUR').plus(new Money(1, 'EUR')).amount; // 2000`,
      table: {
        caption: L('Candidates for a value object', 'Кандидаты на объект-значение'),
        headers: [L('Candidate', 'Кандидат'), L('Rule it carries', 'Правило, которое несёт'), L('Compared by', 'Сравнивается по')],
        rows: [
          [L('Money', 'Money'), L('Integer minor units, one currency', 'Целые минорные единицы, одна валюта'), L('Amount and currency', 'Сумме и валюте')],
          [L('Email', 'Email'), L('A valid address shape', 'Правильная форма адреса'), L('The address', 'Адресу')],
          [L('DateRange', 'Диапазон дат'), L('The start is not after the end', 'Начало не позже конца'), L('Both bounds', 'Обеим границам')],
          [L('OrderId', 'Идентификатор заказа'), L('Not empty', 'Непустой'), L('The identifier', 'Идентификатору')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Freeze shallow and the rule leaks', 'Неглубокая заморозка и протекающее правило'),
          text: L(
            'Object.freeze stops the property from being replaced but does nothing to the array or the object nested inside it. A frozen Money holding a mutable list can still be changed from the outside, and the equality you relied on quietly stops holding.',
            'Object.freeze запрещает замену свойства, но ничего не делает с массивом или объектом внутри. У замороженного Money с изменяемым списком содержимое всё ещё можно поменять снаружи, и равенство, на которое вы опирались, тихо перестаёт работать.'
          ),
        },
      ],
      takeaway: L(
        'Wrap a primitive in a value object as soon as it carries a rule, and keep every field of that object immutable.',
        'Оборачивайте примитив в объект-значение, как только он несёт правило, и держите все поля этого объекта неизменяемыми.'
      ),
      seeAlso: [
        L('Section 6-1: entities, aggregates and invariants', 'Секция 6-1: сущности, агрегаты и инварианты'),
        L('Section 7-5: immutable data structures in practice', 'Секция 7-5: неизменяемые структуры данных на практике'),
      ],
    },
    {
      id: 'oop-ch6-s3',
      title: L('Domain events', 'Доменные события'),
      body: L(
        'A domain event records a fact that has already happened in the business, and it is named in the past tense: OrderPlaced, PaymentCaptured, CustomerArchived. The tense matters, because an event is not a request to perform something but a statement that something is done. Publishing it after the state change rather than before keeps the event truthful even when a listener fails halfway through.\n\nEvents are the natural output of an aggregate: the aggregate changes itself and then reports what happened, so the caller does not have to compare the old state with the new one to find out what to do next. That report is what keeps the rules in one place, while the reactions, such as sending an email, updating a projection or invalidating a cache, live outside the domain and can change without touching it.\n\nThe discipline is narrow payloads and visible subscribers. An event that carries a whole object graph hands its subscribers a mutable model they can corrupt, while an event that carries an id forces the subscriber to load what it needs and keeps the domain in control of how the data is read. Events are also a contract with the future: renaming one breaks every subscriber, so the name deserves the same care as a public method.',
        'Доменное событие фиксирует факт, который уже произошёл в бизнесе, и называется в прошедшем времени: OrderPlaced, PaymentCaptured, CustomerArchived. Время важно, потому что событие — это не просьба что-то сделать, а утверждение, что кое-что уже сделано. Публикация после изменения состояния, а не до, сохраняет событие правдивым, даже если слушатель упадёт на середине.\n\nСобытия — естественный результат работы агрегата: агрегат меняет себя, а затем сообщает, что произошло, и вызывающему не нужно сравнивать старое состояние с новым, чтобы понять, что делать дальше. Именно этот отчёт держит правила в одном месте, а реакции — отправить письмо, обновить проекцию, сбросить кэш — живут вне домена и меняются, не трогая его.\n\nДисциплина — узкая полезная нагрузка и видимые подписчики. Событие, несущее целый граф объектов, отдаёт подписчикам изменяемую модель, которую они могут испортить, а событие с идентификатором заставляет подписчика загрузить нужное и оставляет домену контроль над чтением данных. Событие — это ещё и контракт с будущим: переименование ломает всех подписчиков, поэтому имя требует того же внимания, что и публичный метод.'
      ),
      bullets: [
        L('A domain event names a fact in the past tense, never a command.', 'Доменное событие называет факт в прошедшем времени и никогда — команду.'),
        L('Publish after the state change so the event stays true.', 'Публикуйте после изменения состояния, чтобы событие оставалось правдой.'),
        L('An aggregate reports what happened, the subscribers decide what to do.', 'Агрегат сообщает, что произошло, а подписчики решают, что делать.'),
        L('Keep the payload small: an id and a few scalars.', 'Держите полезную нагрузку небольшой: идентификатор и несколько скаляров.'),
        L('An event name is a public contract, renaming it breaks every subscriber.', 'Имя события — публичный контракт, переименование ломает всех подписчиков.'),
      ],
      code: `type DomainEvent =
  | { type: 'OrderPlaced'; orderId: string; total: number }
  | { type: 'PaymentCaptured'; paymentId: string };

class Order {
  readonly id: string;
  #status: 'draft' | 'placed' = 'draft';
  #events: DomainEvent[] = [];

  constructor(id: string) { this.id = id; }
  place(total: number): void {
    if (this.#status !== 'draft') throw new Error('order is not a draft');
    this.#status = 'placed';
    this.#events.push({ type: 'OrderPlaced', orderId: this.id, total });
  }

  pullEvents(): DomainEvent[] {
    const events = this.#events;
    this.#events = [];
    return events;
  }
}`,
      table: {
        caption: L('Event or command', 'Событие или команда'),
        headers: [L('Aspect', 'Аспект'), L('Domain event', 'Доменное событие'), L('Command', 'Команда')],
        rows: [
          [L('Tense', 'Время'), L('Past', 'Прошедшее'), L('Imperative', 'Повелительное')],
          [L('Meaning', 'Смысл'), L('This has happened', 'Это уже произошло'), L('Please do this', 'Сделайте это')],
          [L('Payload', 'Полезная нагрузка'), L('Facts about the change', 'Факты об изменении'), L('Instructions and arguments', 'Инструкции и аргументы')],
          [L('Who reacts', 'Кто реагирует'), L('Any subscriber', 'Любой подписчик'), L('Exactly one handler', 'Ровно один обработчик')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Events are not the audit log', 'События — не журнал аудита'),
          text: L(
            'A domain event describes one fact that the domain cares about. It is not a place to dump a full entity, not a substitute for an audit trail and not a message bus with the domain vocabulary attached. If nothing reacts to it, the event is dead weight.',
            'Доменное событие описывает один факт, важный домену. Это не место для дампа целой сущности, не замена журналу аудита и не шина сообщений с доменным словарём. Если на событие никто не реагирует, оно — лишний груз.'
          ),
        },
      ],
      takeaway: L(
        'Name the event in the past tense, publish it after the change, and carry the smallest payload that still answers the question.',
        'Называйте событие в прошедшем времени, публикуйте после изменения и несите минимальную полезную нагрузку, отвечающую на вопрос.'
      ),
      seeAlso: [
        L('Section 5-2: observer and subscriber', 'Секция 5-2: наблюдатель и подписчик'),
        L('Section 6-4: application context and use cases', 'Секция 6-4: контекст приложения и сценарии использования'),
      ],
    },
    {
      id: 'oop-ch6-s4',
      title: L('Application context and use cases', 'Контекст приложения и сценарии использования'),
      body: L(
        'A use case is one business action seen from the outside: place an order, cancel a subscription, export a report. It is a single public method that orchestrates the domain objects and the ports they need, and it owns the transaction, the authorisation check and the order of the steps. Its name is the verb of the business, not of the technology, so that the code reads like the process the business described.\n\nThe application context is the place where the collaborators are wired: repositories, gateways, clocks, id generators, the event publisher. It exists so that the use cases never reach for globals and never import a concrete implementation by accident. A context is usually a small factory function or a plain object with a run method, and it is the one place that knows both the abstraction and the implementation that satisfies it.\n\nThe rule that keeps the layering honest is simple: the domain does not know the application, and the application knows the domain. A use case may call aggregate methods and repository methods, and never the other way round. When a domain object starts importing a repository or a gateway, the dependency arrow has turned around, and from that moment the domain can only be tested with the whole outside world attached.',
        'Сценарий использования — это одно бизнес-действие снаружи: оформить заказ, отменить подписку, выгрузить отчёт. Это единственный публичный метод, который связывает доменные объекты и нужные им порты, и он владеет транзакцией, проверкой прав и порядком шагов. Его имя — глагол бизнеса, а не технологии, чтобы код читался как процесс, описанный бизнесом.\n\nКонтекст приложения — место, где связываются зависимости: репозитории, шлюзы, часы, генераторы идентификаторов, издатель событий. Он существует, чтобы сценарии не лезли в глобальное состояние и не импортировали конкретную реалицию по случайности. Контекст обычно это небольшая фабричная функция или обычный объект с методом run, и это единственное место, которое знает и абстракцию, и её реализацию.\n\nПравило, которое сохраняет честность слоёв, простое: домен ничего не знает о прикладном слое, а прикладной слой знает о домене. Сценарий может вызывать методы агрегата и репозитория, но не наоборот. Когда доменный объект начинает импортировать репозиторий или шлюз, стрелка зависимости переворачивается, и с этого момента домен тестируется только вместе со всем внешним миром.'
      ),
      bullets: [
        L('A use case is one business action with a single public method.', 'Сценарий использования — одно бизнес-действие с единственным публичным методом.'),
        L('The use case owns the order of steps, the transaction and the authorisation check.', 'Сценарий владеет порядком шагов, транзакцией и проверкой прав.'),
        L('The application context is the only place that knows the concrete implementations.', 'Контекст приложения — единственное место, знающее конкретные реализации.'),
        L('The domain must not import the application layer or any infrastructure.', 'Домен не должен импортировать прикладной слой или инфраструктуру.'),
        L('Name the use case after a verb of the business, not after a table or a screen.', 'Называйте сценарий глаголом бизнеса, а не именем таблицы или экрана.'),
      ],
      code: `type Order = { id: string; place(): void };

interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

class PlaceOrder {
  #orders: OrderRepository;
  #clock: { now(): Date };

  constructor(orders: OrderRepository, clock: { now(): Date }) {
    this.#orders = orders;
    this.#clock = clock;
  }

  async execute(order: Order): Promise<void> {
    order.place();
    await this.#orders.save(order);
    console.log('placed at', this.#clock.now().toISOString());
  }
}`,
      table: {
        caption: L('Who may depend on whom', 'Кто на кого зависит'),
        headers: [L('Layer', 'Слой'), L('May depend on', 'Может зависеть от'), L('Must not know about', 'Не должен знать о')],
        rows: [
          [L('Domain', 'Домен'), L('Itself', 'Самом себе'), L('Application, infrastructure', 'Прикладном слое, инфраструктуре')],
          [L('Application', 'Прикладной'), L('Domain, ports', 'Домене, портах'), L('Concrete implementations', 'Конкретных реализациях')],
          [L('Context', 'Контекст'), L('Everything', 'Всём'), L('Business rules', 'Бизнес-правилах')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The use case that became a god object', 'Сценарий, превратившийся в бога'),
          text: L(
            'When one use case starts validating, pricing, sending mail, writing to two repositories and rendering a message, it has become the place where every future change lands. Split it by business action and let each new action get its own use case, even when two of them share a helper.',
            'Когда один сценарий начинает валидировать, считать цену, отправлять почту, писать в два репозитория и формировать сообщение, он становится местом, куда падает каждое будущее изменение. Делите его по бизнес-действиям: пусть каждое новое действие получает свой сценарий, даже если два из них делят помощника.'
          ),
        },
      ],
      takeaway: L(
        'Put the business verb in the use case, the wiring in the context, and keep the domain free of both.',
        'Бизнес-глагол — в сценарий, связывание — в контекст, а домен оставьте свободным от обоих.'
      ),
      seeAlso: [
        L('Section 5-3: repository and unit of work', 'Секция 5-3: репозиторий и единица работы'),
        L('Section 6-5: anemic versus rich domain models', 'Секция 6-5: анемичные и богатые доменные модели'),
        L('Chapter 4: dependency inversion at the API boundary', 'Глава 4: инверсия зависимостей на границе API'),
      ],
    },
    {
      id: 'oop-ch6-s5',
      title: L('Anemic versus rich domain models', 'Анемичные и богатые доменные модели'),
      body: L(
        'The anemic model is a set of data classes plus service functions that manipulate them. The rich model puts the behaviour next to the data: the object that holds the total knows how to compute it and refuses to be inconsistent. Both styles work, and the choice is not moral, it is about where the rules live and how much of the code has to know about them.\n\nThe tell for an anemic model is a service that takes an object and returns a modified copy, while the object itself holds nothing but fields. The tell for a rich model is that you cannot construct an invalid instance and that a rule appears in exactly one place. An anemic model with rich validation at the boundaries is perfectly fine; an anemic model whose rules are scattered across service functions is not, because two services will eventually disagree about the same rule.\n\nA pragmatic middle ground works well in a frontend. Keep the state in a store as plain data, and put the rules in pure functions that take the state and return the next state. That is a rich model in the functional sense, because the rules live in the domain layer rather than in a component. The warning sign is a component that computes a total inline, because that is the moment the rule stopped being reusable and started being copied.',
        'Анемичная модель — это набор классов данных плюс сервисные функции, которые ими манипулируют. Богатая модель держит поведение рядом с данными: объект, в котором лежит сумма, умеет её вычислять и отказывается быть несогласованным. Оба стиля работают, и выбор — не про мораль, а про то, где живут правила и сколько кода о них знает.\n\nПризнак анемичной модели — сервис, который принимает объект и возвращает изменённую копию, тогда как сам объект не содержит ничего, кроме полей. Признак богатой модели — что недопустимый экземпляр построить нельзя и что правило встречается ровно в одном месте. Анемичная модель с богатой проверкой на границах вполне допустима; анемичная модель, правила которой разбросаны по сервисным функциям, — нет, потому что рано или поздно два сервиса решат одно и то же правило по-разному.\n\nРазумный компромисс хорошо работает во фронтенде. Держите состояние в хранилище как простые данные, а правила оформите чистыми функциями, которые принимают состояние и возвращают следующее. Это богатая модель в функциональном смысле, потому что правила живут в доменном слое, а не в компоненте. Тревожный признак — компонент, который считает итог прямо в разметке: в этот момент правило перестало быть переиспользуемым и начало дублироваться.'
      ),
      bullets: [
        L('Anemic means data classes plus services that manipulate them.', 'Анемичная модель — это классы данных плюс сервисы, которые ими манипулируют.'),
        L('Rich means behaviour and invariants live next to the data.', 'Богатая модель — это поведение и инварианты рядом с данными.'),
        L('The tell for an anemic model is a service returning a modified copy.', 'Признак анемичной модели — сервис, возвращающий изменённую копию.'),
        L('The tell for a rich model is that an invalid instance cannot be built.', 'Признак богатой модели — недопустимый экземпляр построить нельзя.'),
        L('A store of plain data plus pure rule functions is a valid middle ground.', 'Хранилище простых данных плюс чистые функции с правилами — законный компромисс.'),
      ],
      code: `// Anemic: the rule lives in a service, the order holds only fields
function applyDiscount(order: { total: number }, percent: number) {
  return { ...order, total: order.total * (1 - percent / 100) };
}

// Rich: the rule lives with the data and the invalid state cannot be built
class Cart {
  #total: number;

  constructor(total: number) {
    this.#total = total;
  }

  withDiscount(percent: number): Cart {
    if (percent < 0 || percent > 100) throw new Error('percent out of range');
    return new Cart(this.#total * (1 - percent / 100));
  }

  get total(): number {
    return this.#total;
  }
}`,
      table: {
        caption: L('Anemic against rich', 'Анемичная против богатой'),
        headers: [L('Aspect', 'Аспект'), L('Anemic', 'Анемичная'), L('Rich', 'Богатая')],
        rows: [
          [L('Where rules live', 'Где правила'), L('In services', 'В сервисах'), L('In the object', 'В объекте')],
          [L('Invalid state', 'Недопустимое состояние'), L('Possible unless checked', 'Возможно без проверки'), L('Not constructible', 'Невозможно')],
          [L('Testability', 'Тестируемость'), L('Fine, rules are pure functions', 'Хорошо, правила — чистые функции'), L('Fine, rules are methods', 'Хорошо, правила — методы')],
          [L('Best fit', 'Где уместна'), L('Thin CRUD, DTOs, transport layers', 'Тонкий CRUD, DTO, транспортные слои'), L('Business rules that change often', 'Бизнес-правила, которые меняют часто')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Move the rule, do not add a layer', 'Перенесите правило, а не добавьте слой'),
          text: L(
            'When a rule shows up in two places, do not introduce a shared helper class first. Move the rule into the object that owns the data and delete one of the copies. A helper that both callers still remember to call has not fixed anything.',
            'Когда правило встречается в двух местах, не заводите сначала общий класс-помощник. Перенесите правило в объект, который владеет данными, и удалите одну из копий. Помощник, который оба вызывающих всё ещё помнят вызвать, ничего не починил.'
          ),
        },
      ],
      takeaway: L(
        'A rule belongs with the data it constrains, and an invalid instance must not be constructible.',
        'Правило принадлежит данным, которые оно ограничивает, а недопустимый экземпляр строить нельзя.'
      ),
      seeAlso: [
        L('Section 7-1: pure functions and referential transparency', 'Секция 7-1: чистые функции и прозрачность по подстановке'),
        L('Chapter 2: when a class is the wrong tool', 'Глава 2: когда класс — не тот инструмент'),
      ],
    },
  ],
};
