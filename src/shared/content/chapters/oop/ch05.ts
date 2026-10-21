import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh05: Chapter = {
  id: 'oop-ch5',
  title: L('Design patterns', 'Паттерны проектирования'),
  summary: L(
    'Strategy, factory, observer, repository, unit of work, decorator, adapter, facade and command, plus the decision rule that separates a pattern that pays off from one that is only ceremony.',
    'Стратегия, фабрика, наблюдатель, репозиторий, единица работы, декоратор, адаптер, фасад и команда — и правило решения, которое отличает паттерн, окупающийся, от чистой церемонии.'
  ),
  sections: [
    {
      id: 'oop-ch5-s1',
      title: L('Strategy and factory', 'Стратегия и фабрика'),
      body: L(
        'A pattern is a name for a solution that keeps recurring, and its real value is the shared vocabulary rather than the diagram. A pattern earns its place when the problem is structural: the code must swap an algorithm at runtime, hide how an object graph is built, or notify an unknown number of listeners. A pattern that only renames three lines is a layer of indirection with an extra import, and it makes the code harder to read than the branch it replaced.\n\nStrategy replaces a branch with an interchangeable implementation. The client holds a reference to an abstraction and calls it without knowing which concrete version it received. In TypeScript the abstraction is usually a function type, so a strategy often needs no class at all; it becomes a class only when it carries state or exposes several methods. The signal to extract a strategy is growth: every new discount type adds another branch to the same function, and that function starts to decide business policy by accident.\n\nA factory answers a different question. It does not decide which algorithm to use, it decides how the object is built: which class, which constructor arguments, in which order. Two forms matter. A plain factory function returns a ready value and hides the graph behind one name. A factory method on a class lets the subclass choose the concrete type, so the decision stays inside the class that owns it instead of leaking into every caller.',
        'Паттерн — это имя для решения, которое повторяется, и реальная его ценность в общем словаре, а не в схеме. Паттерн оправдан, когда задача структурная: код должен подменять алгоритм во время выполнения, прятать сборку графа объектов или оповещать неизвестное число слушателей. Паттерн, который лишь переименовывает три строки, — это слой косвенности с лишним импортом, и читать такой код сложнее, чем ветку, которую он заменил.\n\nСтратегия заменяет ветвление взаимозаменяемой реализацией. Клиент держит ссылку на абстракцию и вызывает её, не зная, какая конкретная версия ему досталась. В TypeScript абстракция обычно сводится к типу функции, и тогда стратегии класс вообще не нужен; класс появляется, только когда стратегии нужно состояние или несколько методов. Сигналом к выделению стратегии служит рост: каждый новый тип скидки добавляет ещё одну ветку в ту же функцию, и функция начинает по случайности решать бизнес-политику.\n\nФабрика отвечает на другой вопрос. Она не выбирает алгоритм, она решает, как объект создаётся: какой класс, какие аргументы конструктора, в каком порядке. Полезны две формы. Обычная фабричная функция возвращает готовое значение и прячет граф за одним именем. Фабричный метод класса позволяет подклассу выбрать конкретный тип, и решение остаётся внутри класса-владельца, а не расползается по всем вызывающим.'
      ),
      bullets: [
        L('Strategy replaces a growing branch with one contract and many implementations.', 'Стратегия заменяет растущее ветвление одним контрактом и многими реализациями.'),
        L('A strategy in TypeScript is a function type until it needs state.', 'Стратегия в TypeScript — это тип функции, пока ей не понадобится состояние.'),
        L('A factory hides construction, not the choice of the algorithm.', 'Фабрика прячет создание, а не выбор алгоритма.'),
        L('A factory method keeps the choice of the concrete class inside its owner.', 'Фабричный метод оставляет выбор конкретного класса внутри его владельца.'),
        L('Extract a strategy when every new case would add another branch.', 'Выносите стратегию, когда каждый новый случай добавляет ещё одну ветку.'),
      ],
      code: `type Discount = (total: number) => number;

const noDiscount: Discount = (total) => total;
const tenPercent: Discount = (total) => total * 0.9;

class Cart {
  #discount: Discount;

  constructor(discount: Discount = noDiscount) {
    this.#discount = discount;
  }

  total(subtotal: number): number {
    return this.#discount(subtotal);
  }
  withDiscount(discount: Discount): Cart {
    return new Cart(discount);
  }
}

const cart = new Cart(tenPercent);
cart.total(1000); // 900`,
      table: {
        caption: L('Strategy as a function type or as a class', 'Стратегия как тип функции или как класс'),
        headers: [L('Aspect', 'Аспект'), L('Function type', 'Тип функции'), L('Class implementation', 'Класс-реализация')],
        rows: [
          [L('Needs state', 'Нужно состояние'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('Several methods', 'Несколько методов'), L('One signature', 'Одна сигнатура'), L('A contract you can extend', 'Контракт, который расширяют')],
          [L('Test double', 'Тестовая подмена'), L('A plain function', 'Простая функция'), L('An object literal', 'Объектный литерал')],
          [L('Cost', 'Цена'), L('A few lines', 'Несколько строк'), L('A file and a class', 'Файл и класс')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The strategy that did not remove the branch', 'Стратегия, которая не убрала ветку'),
          text: L(
            'Extracting a strategy moves the switch to the composition root, it does not delete it. If the choice of the strategy still sits in the middle of the business logic, the code has the original problem plus one more file. Wire the strategy where the application is composed and keep the business rules free of choices.',
            'Выделение стратегии переносит переключатель в точку сборки, но не удаляет его. Если выбор стратегии остаётся в середине бизнес-логики, у кода та же проблема плюс ещё один файл. Подключайте стратегию там, где собирается приложение, и держите бизнес-правила свободными от выборов.'
          ),
        },
        {
          tone: 'tip',
          title: L('Two branches are not a strategy', 'Две ветки — это не стратегия'),
          text: L(
            'A strategy pays off when the set of cases grows over time. With two cases that never change, an if statement is shorter, easier to read and cheaper to maintain than an interface, two implementations and a wiring point.',
            'Стратегия окупается, когда множество случаев растёт со временем. Пока случаев два и они не меняются, обычный if короче, понятнее и дешевле в сопровождении, чем интерфейс, две реализации и точка сборки.'
          ),
        },
      ],
      takeaway: L(
        'Extract a strategy when the cases multiply and a factory when the construction is what you want to hide.',
        'Выносите стратегию, когда случаи множатся, и фабрику — когда прятать нужно создание.'
      ),
      seeAlso: [
        L('Chapter 4: SOLID in practice', 'Глава 4: SOLID на практике'),
        L('Section 5-6: which patterns survive in modern frontend code', 'Секция 5-6: какие паттерны выживают в современном фронтенде'),
        L('Section 7-2: function composition and pipes', 'Секция 7-2: композиция функций и конвейеры'),
      ],
    },
    {
      id: 'oop-ch5-s2',
      title: L('Observer and subscriber', 'Наблюдатель и подписчик'),
      body: L(
        'The observer defines a one-to-many dependency: the subject keeps a list of subscribers and tells them when something happens, and the code that reacts never appears among the imports of the subject. JavaScript already ships the pattern. EventTarget, addEventListener, Promise and the emitter API of Node are all observers, so reaching for the pattern is usually a matter of naming what you were already doing.\n\nThe pattern earns its name when the same fact must reach several independent consumers and none of them belongs to the call chain: analytics, cache invalidation, a counter, a UI update. It fails when subscribers must run in a fixed order, when one subscriber needs the result of another, or when a failing subscriber has to stop the rest. Those cases are not subscriptions, they are calls, and they should be written as calls so that the order is visible in the source.\n\nThe discipline that keeps an event bus usable is payload design. Publish facts that already happened, keep the payload small, type it, and let subscribers fetch whatever else they need. A command such as "send the invoice" published as an event turns the bus into an invisible call graph, while a fact such as "order placed" keeps the flow readable and makes the order of the handlers irrelevant.',
        'Наблюдатель задаёт зависимость один-ко-многим: субъект хранит список подписчиков и сообщает им о происшедшем, а код, который реагирует, не появляется среди импортов субъекта. В JavaScript этот паттерн уже встроен в платформу. EventTarget, addEventListener, Promise и эмиттер Node — всё это наблюдатели, поэтому обращение к паттерну обычно означает лишь то, что вы даёте имя тому, что уже делали.\n\nПаттерн заслуживает имени, когда один и тот же факт должен узнать несколько независимых потребителей, и ни один из них не входит в цепочку вызовов: аналитика, сброс кэша, счётчик, обновление интерфейса. Он не работает, когда подписчики должны выполняться в строгом порядке, когда одному нужен результат другого или когда падение подписчика обязано остановить остальных. Это не подписки, а вызовы, и их следует писать вызовами, чтобы порядок был виден в коде.\n\nДисциплина, которая держит шину событий пригодной к использованию, — это проектирование полезной нагрузки. Публикуйте факты, которые уже произошли, держите нагрузку небольшой, типизированной и позволяйте подписчикам запросить всё остальное, что им нужно. Команда вроде «отправить счёт», опубликованная как событие, превращает шину в невидимый граф вызовов, тогда как факт вроде «заказ оформлен» сохраняет поток читаемым и делает порядок обработчиков неважным.'
      ),
      bullets: [
        L('The subject knows only that a list of callbacks exists.', 'Субъект знает только, что существует список функций.'),
        L('Events are facts in the past tense, not commands to execute.', 'События — это факты в прошедшем времени, а не команды к выполнению.'),
        L('A subscriber that needs the previous result is a call, not a subscription.', 'Подписчик, которому нужен результат предыдущего, — это вызов, а не подписка.'),
        L('Unsubscribe on teardown, or the list leaks and handlers fire twice.', 'Отписывайтесь при размонтировании, иначе список течёт, а обработчики срабатывают дважды.'),
        L('EventTarget and Promise already implement the pattern in the platform.', 'EventTarget и Promise уже реализуют паттерн в самой платформе.'),
      ],
      code: `type OrderPlaced = { type: 'order.placed'; orderId: string };

class EventBus {
  #handlers = new Map<string, Set<(payload: OrderPlaced) => void>>();

  on(type: string, handler: (payload: OrderPlaced) => void): () => void {
    const set = this.#handlers.get(type) ?? new Set();
    set.add(handler);
    this.#handlers.set(type, set);
    return () => { set.delete(handler); };
  }

  emit(event: OrderPlaced): void {
    this.#handlers.get(event.type)?.forEach((handler) => handler(event));
  }
}

const bus = new EventBus();
const off = bus.on('order.placed', (e) => console.log('invoice', e.orderId));
bus.emit({ type: 'order.placed', orderId: 'o-1' });
off();`,
      table: {
        caption: L('Observer or direct call', 'Наблюдатель или прямой вызов'),
        headers: [L('Question', 'Вопрос'), L('Observer', 'Наблюдатель'), L('Direct call', 'Прямой вызов')],
        rows: [
          [L('How many consumers', 'Сколько потребителей'), L('Unknown at compile time', 'Неизвестно на этапе компиляции'), L('Known and fixed', 'Известно и фиксировано')],
          [L('Ordering', 'Порядок'), L('Does not matter', 'Не важен'), L('Deterministic', 'Однозначный')],
          [L('Failure of one handler', 'Ошибка одного обработчика'), L('Isolated', 'Изолирована'), L('Visible to the caller', 'Видна вызывающему')],
          [L('Traceability', 'Прослеживаемость'), L('The call stack hides it', 'Стек вызовов её скрывает'), L('Visible in the stack', 'Видна в стеке')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The bus that hides your control flow', 'Шина, скрывающая управление'),
          text: L(
            'Publishing commands as events makes the program flow invisible: you publish "send invoice" and three modules react, and none of them appears in the call stack of the publisher. Reserve events for facts and keep commands as direct calls.',
            'Публикация команд в виде событий делает поток программы невидимым: вы публикуете «отправить счёт», на него реагируют три модуля, и ни один не появляется в стеке вызовов публикатора. Оставляйте события для фактов, а команды вызывайте напрямую.'
          ),
        },
      ],
      takeaway: L(
        'Use the observer for facts that several independent parts react to, and call directly when the order or the result matters.',
        'Используйте наблюдателя для фактов, на которые реагируют несколько независимых частей, и вызывайте напрямую, когда важен порядок или результат.'
      ),
      seeAlso: [
        L('Section 6-3: domain events as the domain version of the observer', 'Секция 6-3: доменные события как доменная версия наблюдателя'),
        L('Section 8-2: error boundaries and recovery', 'Секция 8-2: границы ошибок и восстановление'),
      ],
    },
    {
      id: 'oop-ch5-s3',
      title: L('Repository and unit of work', 'Репозиторий и единица работы'),
      body: L(
        'A repository is the boundary between the domain and the storage. The domain asks for an order by id and receives an order, without knowing whether it came from Postgres, from an HTTP API or from an in-memory map. The important detail is the vocabulary: a repository speaks in domain terms such as findOverdue, save and removeById, and never in query terms such as selectWhereStatus. A repository that leaks its query language has not removed complexity, it has moved it into the caller.\n\nThe unit of work is the transaction boundary around the repository. It records what changed during a use case and writes it once, so several changes become one atomic operation and one round trip. In a browser the same idea appears as a cache: a batch of mutations is applied to the local state and committed only when the request succeeds, so a failed request leaves the screen in the state it had before.\n\nBoth patterns exist to make persistence a detail, and the test that shows the abstraction is real is simple: write the use case against an in-memory implementation and the test runs without a database. The test that shows the abstraction is fake is just as simple: the test file imports a query builder, a connection string or an ORM model. That is a persistence leak, and no amount of naming will hide it.',
        'Репозиторий — это граница между доменом и хранилищем. Домен просит заказ по идентификатору и получает заказ, не зная, тот пришёл из Postgres, из REST API или из карты в памяти. Важная деталь — словарь: репозиторий говорит на языке домена, такими словами, как findOverdue, save и removeById, и никогда на языке запросов вроде selectWhereStatus. Репозиторий, который протекает языком запросов, не убрал сложность, а перенёс её к вызывающему.\n\nЕдиница работы — это граница транзакции вокруг репозитория. Она запоминает, что изменилось за время сценария, и записывает это один раз, так что несколько изменений становятся одной атомарной операцией и одним обменом с сервером. В браузере та же идея выглядит как кэш: пакет изменений применяется к локальному состоянию и фиксируется только после успешного ответа сервера, поэтому неудачный запрос оставляет экран в том состоянии, в каком он был.\n\nОба паттерна существуют, чтобы сделать хранение деталью, и проверка того, что абстракция настоящая, проста: напишите сценарий против реализации в памяти, и тест пройдёт без базы данных. Проверка фальшивой абстракции не сложнее: файл теста импортирует конструктор запросов, строку подключения или модель ORM. Это утечка хранилища, и никакие переименования её не спрячут.'
      ),
      bullets: [
        L('The repository speaks the domain language, not the query language.', 'Репозиторий говорит на языке домена, а не на языке запросов.'),
        L('A unit of work groups writes into one transaction and one round trip.', 'Единица работы собирает записи в одну транзакцию и один обмен с сервером.'),
        L('In the browser the unit of work is usually a cache with a commit step.', 'В браузере единица работы обычно это кэш с шагом фиксации.'),
        L('A repository that leaks its storage API moved the complexity, it did not remove it.', 'Репозиторий, который протекает API хранилища, перенёс сложность, а не убрал её.'),
        L('The proof is an in-memory implementation, with no database in the test.', 'Доказательство — реализация в памяти, без базы данных в тесте.'),
      ],
      code: `interface Order { id: string; status: 'draft' | 'placed' }
interface OrderRepository { save(order: Order): Promise<void> }

class UnitOfWork {
  #pending = new Map<string, Order>();
  #repo: OrderRepository;

  constructor(repo: OrderRepository) {
    this.#repo = repo;
  }

  track(order: Order): void {
    this.#pending.set(order.id, order);
  }

  async commit(): Promise<void> {
    for (const order of this.#pending.values()) await this.#repo.save(order);
    this.#pending.clear();
  }
}`,
      table: {
        caption: L('Two ways to hide persistence', 'Два способа спрятать хранение'),
        headers: [L('Aspect', 'Аспект'), L('Repository', 'Репозиторий'), L('Unit of work', 'Единица работы')],
        rows: [
          [L('Hides', 'Прячет'), L('Where the data lives', 'Где живут данные'), L('When the data is written', 'Когда данные записываются')],
          [L('Unit of work', 'Единица работы'), L('One collection', 'Одна коллекция'), L('A group of changes', 'Группа изменений')],
          [L('Failure', 'Ошибка'), L('Thrown by the call', 'Бросается вызовом'), L('Nothing is written', 'Ничего не записывается')],
          [L('Browser equivalent', 'Аналог в браузере'), L('A query hook', 'Хук запроса'), L('An optimistic cache', 'Оптимистичный кэш')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A repository is not a generic data layer', 'Репозиторий — не универсальный слой данных'),
          text: L(
            'A repository for one aggregate is a boundary. A generic repository with a type parameter over any entity becomes a thin wrapper around a query builder, and the type system then permits saving an Order through a UserRepository. Narrow the contract to the aggregate it actually owns.',
            'Репозиторий одного агрегата — это граница. Универсальный репозиторий с типом-параметром для любой сущности превращается в обёртку над конструктором запросов, и тогда типы разрешают сохранить Order через UserRepository. Сужайте контракт до агрегата, которым он реально владеет.'
          ),
        },
      ],
      takeaway: L(
        'Keep storage behind a repository that speaks domain words, and buffer writes in a unit of work so a failure writes nothing.',
        'Держите хранилище за репозиторием, который говорит словами домена, и буферизуйте записи в единице работы, чтобы при ошибке не записалось ничего.'
      ),
      seeAlso: [
        L('Section 6-4: application context and use cases', 'Секция 6-4: контекст приложения и сценарии использования'),
        L('Chapter 8: failure handling in object-oriented code', 'Глава 8: обработка отказов в объектно-ориентированном коде'),
      ],
    },
    {
      id: 'oop-ch5-s4',
      title: L('Decorator, adapter and facade', 'Декоратор, адаптер и фасад'),
      body: L(
        'These three patterns look alike because all of them put something in front of something else, but they answer different questions. A decorator answers "what extra behaviour should this object have while keeping its interface?" A caching repository, a logger, a retry wrapper: each takes an object with the same interface and returns an object with the same interface, and the layers compose. An adapter answers "how do I translate a foreign interface into mine?"\n\nThe decorator is the most useful of the three because it lets you add a cross-cutting concern without touching the class that owns the data. A decorator is transparent: the caller cannot tell a decorated object from the original, and the decorator may not change the contract, only add behaviour around it. That last line separates a decorator from a wrapper that quietly narrows or widens the interface, because such a wrapper is an adapter in disguise and must be named as one.\n\nAn adapter is a translation layer, and it pays off exactly when the vocabularies of the two sides differ: a REST SDK that returns snake_case while the domain speaks camelCase, a third-party date library against the platform Date. A facade is not a translation at all. It keeps one interface but presents it in a simpler shape, hiding the order of the steps and the intermediate results. Both add a layer, and the test of whether that layer earns its place is whether the caller got simpler.',
        'Эти три паттерна похожи, потому что все они ставят что-то перед чем-то-то, но отвечают они на разные вопросы. Декоратор отвечает: «какое дополнительное поведение должен получить объект, сохранив свой интерфейс?». Кэширующий репозиторий, логгер, обёртка с повторами: каждый принимает объект с одним интерфейсом и возвращает объект с тем же интерфейсом, и слои композиционны. Адаптер отвечает на другой вопрос: «как перевести чужой интерфейс в мой?»\n\nДекоратор полезнее остальных, потому что позволяет добавить сквозную заботу, не трогая класс, который владеет данными. Декоратор прозрачен: вызывающий не отличит декорированный объект от исходного, и декоратор не имеет права менять контракт, он может только добавлять поведение вокруг него. Именно эта граница отделяет декоратор от обёртки, которая тихо сужает или расширяет интерфейс: такая обёртка — адаптер под другим именем, и её надо так и называть.\n\nАдаптер — это слой перевода, и он окупается ровно тогда, когда словари двух сторон различаются: REST SDK, возвращающий snake_case, против домена на camelCase, сторонняя библиотека дат против платформенного Date. Фасад переводом не занимается. Он сохраняет один интерфейс, но подаёт его в более простом виде, пряча порядок шагов и промежуточные результаты. Оба добавляют слой, и проверка, оправдан ли слой, проста: стало ли у вызывающего проще.'
      ),
      bullets: [
        L('A decorator keeps the interface and adds behaviour around it.', 'Декоратор сохраняет интерфейс и добавляет поведение вокруг него.'),
        L('An adapter translates between two vocabularies and lives at the boundary.', 'Адаптер переводит между двумя словарями и живёт на границе.'),
        L('A facade presents a simple entry point over a complicated subsystem.', 'Фасад даёт простой вход в сложную подсистему.'),
        L('Decorator layers compose: cache outside logger outside the real repository.', 'Слои декораторов композиционны: кэш снаружи, логирование внутри, реализация внизу.'),
        L('Every extra layer must remove complexity from the caller or it is only indirection.', 'Каждый лишний слой должен убрать сложность у вызывающего, иначе это только косвенность.'),
      ],
      code: `interface User {
  id: string;
  name: string;
}
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

// Decorator: the same interface plus one extra behaviour
class CachingRepo implements UserRepository {
  #inner: UserRepository;
  #cache = new Map<string, User>();
  constructor(inner: UserRepository) { this.#inner = inner; }

  async findById(id: string): Promise<User | null> {
    const cached = this.#cache.get(id);
    if (cached) return cached;
    const user = await this.#inner.findById(id);
    if (user) this.#cache.set(id, user);
    return user;
  }
}`,
      table: {
        caption: L('Three wrappers, three questions', 'Три обёртки, три вопроса'),
        headers: [L('Pattern', 'Паттерн'), L('Question', 'Вопрос'), L('Contract', 'Контракт')],
        rows: [
          [L('Decorator', 'Декоратор'), L('What extra behaviour?', 'Какое доп. поведение?'), L('Unchanged', 'Не меняется')],
          [L('Adapter', 'Адаптер'), L('How do I translate it?', 'Как его перевести?'), L('Translated', 'Переводится')],
          [L('Facade', 'Фасад'), L('What is the simple way in?', 'Как войти просто?'), L('Simplified', 'Упрощается')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The decorator that changed the contract', 'Декоратор, изменивший контракт'),
          text: L(
            'If your decorator adds a method, hides a method or narrows what the caller may do, the caller must know which layer it holds, and the pattern has turned into an adapter with a misleading name. A decorator that changes the interface must be renamed, and the interface split in two.',
            'Если декоратор добавляет метод, прячет метод или сужает то, что разрешено вызывающему, вызывающий обязан знать, какой слой у него в руках, и паттерн превратился в адаптер с вводящим в заблуждение именем. Декоратор, меняющий интерфейс, переименовывают, а интерфейс делят надвое.'
          ),
        },
      ],
      takeaway: L(
        'A decorator adds behaviour and keeps the contract, an adapter translates the contract, a facade simplifies the way in.',
        'Декоратор добавляет поведение и сохраняет контракт, адаптер переводит контракт, фасад упрощает вход.'
      ),
      seeAlso: [
        L('Section 6-2: value objects as an alternative to wrappers', 'Секция 6-2: объекты-значения как альтернатива обёрткам'),
        L('Section 1-3: encapsulation and private fields', 'Секция 1-3: инкапсуляция и приватные поля'),
      ],
    },
    {
      id: 'oop-ch5-s5',
      title: L('Command and state', 'Команда и состояние'),
      body: L(
        'A command turns an intent into a value. Instead of calling order.cancel(reason, actor, timestamp) you build a CancelOrder that carries those fields and hand it to a handler. The gain is not ceremony for its own sake: the command becomes something you can log, queue, retry, serialise and test as data, and its validity can be checked before anything happens. In a frontend the same shape appears as an action in a store, on a backend as a message in a queue.\n\nThe state pattern applies when an object changes behaviour depending on its state, so that the transitions live inside the object instead of in a switch somewhere else. A document that is draft, in review or published does something different in each state: a draft can be edited, a review can be approved, a published document can be archived. Encoding the state as a flag plus a switch outside the class scatters the rules across the code base, and giving each state its own object keeps them together and makes an illegal combination hard to write down.\n\nBoth patterns pay off when the number of states or commands grows, and they turn into noise when there are two of them. The smell to watch for is a command class that only carries three fields to the same method that already accepted them, and a state pattern whose states share no behaviour at all. In both cases the code moved without removing a single decision, and the next reader has to hunt through more files for the same rule.',
        'Команда превращает намерение в значение. Вместо вызова order.cancel(reason, actor, timestamp) вы создаёте CancelOrder, который несёт эти поля, и отдаёте его обработчику. Выгода здесь не в церемонии ради церемонии: команда становится тем, что можно залогировать, поставить в очередь, повторить, сериализовать и протестировать как данные, а её допустимость проверяется до того, как что-то произойдёт. Во фронтенде та же форма появляется как экшен в хранилище, на бэкенде — как сообщение в очереди.\n\nПаттерн состояния применим, когда объект меняет поведение в зависимости от состояния, так что переходы живут внутри объекта, а не в каком-то switch снаружи. Документ, который бывает черновиком, на проверке и опубликованным, в каждом состоянии делает разное: черновик можно править, проверку можно согласовать, опубликованный документ можно снять с публикации. Кодирование состояния флагом плюс switch вне класса разбрасывает правила по кодовой базе, а выделение каждому состоянию своего объекта держит их рядом и делает недопустимую комбинацию трудно записать.\n\nОба паттерна окупаются, когда число состояний или команд растёт, и превращаются в шум, когда их всего два. Запах, за которым стоит следить: класс команды, который тащит три поля в тот же метод, что и раньше принимал эти поля, и паттерн состояния, состояния которого не имеют общего поведения. В обоих случаях код переехал, не убрав ни одного решения, и следующему читателю придётся искать то же правило по большему числу файлов.'
      ),
      bullets: [
        L('A command is a value that carries an intent, not a call with many parameters.', 'Команда — это значение с намерением, а не вызов с кучей параметров.'),
        L('A command can be logged, queued, retried and tested as data.', 'Команду можно залогировать, поставить в очередь, повторить и протестировать как данные.'),
        L('The state pattern keeps the transitions inside the object that owns the state.', 'Паттерн состояния держит переходы внутри объекта, который владеет состоянием.'),
        L('A flag plus a switch outside the class scatters the rules across the code base.', 'Флаг плюс switch снаружи класса разбрасывает правила по кодовой базе.'),
        L('Both patterns pay off when the cases multiply and cost when there are two.', 'Оба паттерна окупаются, когда случаев много, и мешают, когда их два.'),
      ],
      code: `type Status = 'draft' | 'placed' | 'cancelled';

type OrderCommand =
  | { kind: 'place'; total: number }
  | { kind: 'cancel'; reason: string };

const transitions: Record<Status, Status[]> = {
  draft: ['placed'],
  placed: ['cancelled'],
  cancelled: [],
};

function apply(command: OrderCommand, current: Status): Status {
  const next: Status = command.kind === 'place' ? 'placed' : 'cancelled';
  if (!transitions[current].includes(next)) {
    throw new Error('cannot move from ' + current + ' to ' + next);
  }
  return next;
}

apply({ kind: 'cancel', reason: 'fraud' }, 'placed'); // 'cancelled'`,
      table: {
        caption: L('What the two patterns replace', 'Что заменяют эти два паттерна'),
        headers: [L('Aspect', 'Аспект'), L('Command', 'Команда'), L('State', 'Состояние')],
        rows: [
          [L('Replaces', 'Заменяет'), L('A call with many parameters', 'Вызов с кучей параметров'), L('A switch on a flag', 'Switch по флагу')],
          [L('Represents', 'Представляет'), L('One intent', 'Одно намерение'), L('One phase of the lifecycle', 'Одну фазу жизненного цикла')],
          [L('Grows with', 'Растёт вместе с'), L('The number of actions', 'Числом действий'), L('The number of phases', 'Числом фаз')],
          [L('Testable as', 'Тестируется как'), L('A value', 'Значение'), L('A transition table', 'Таблица переходов')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('A discriminated union is often enough', 'Дискриминируемое объединение часто достаточно'),
          text: L(
            'TypeScript can express a small command set as a discriminated union of object literals, with no classes at all. Reach for the full command pattern when the command must cross a process boundary, be stored, or be dispatched by name.',
            'TypeScript умеет выразить небольшой набор команд как дискриминируемое объединение объектных литералов, вообще без классов. Переходите к полному паттерну команды, когда команда должна пересечь границу процесса, сохраниться или отправляться по имени.'
          ),
        },
      ],
      takeaway: L(
        'Make a command a value and a state a table, and only then decide whether those need classes of their own.',
        'Сделайте команду значением, а состояние таблицей, и только потом решайте, нужны ли им собственные классы.'
      ),
      seeAlso: [
        L('Section 6-1: entities, aggregates and invariants', 'Секция 6-1: сущности, агрегаты и инварианты'),
        L('Chapter 7: functional patterns', 'Глава 7: функциональные паттерны'),
      ],
    },
    {
      id: 'oop-ch5-s6',
      title: L('Which patterns survive in modern frontend code', 'Какие паттерны выживают в современном фронтенде'),
      body: L(
        'Some patterns describe the shape of the data, and those survive everything. Strategy, adapter, value object and decorator describe what a thing is, and they read naturally in a React codebase: a formatter chosen per locale, an adapter over a third-party SDK, an immutable Money value passed between components. Other patterns describe the wiring of objects, and those mostly die in a component tree, because React already provides the wiring through props, context, custom hooks and the store.\n\nA useful test is to ask what the pattern would replace in a React application. The observer becomes a subscription in a store or useSyncExternalStore. The repository becomes a query hook over the network layer. The command becomes an action or a thunk. The unit of work becomes an optimistic update with a rollback. In every case the framework already provides the structure, and the value of the pattern left is the name it gives to a decision everybody already makes.\n\nThe cargo cult version of a pattern is a class hierarchy built for a problem the language already solved: an event emitter around a single callback, a factory that calls new with one argument, a strategy for two branches. The cost of that code is not the number of lines, it is the number of places a newcomer must look to find out what happens when a button is clicked. Keep a pattern where it names a real decision, and drop it where it only adds a layer.',
        'Часть паттернов описывает форму данных, и такие выживают всегда. Стратегия, адаптер, объект-значение и декоратор описывают, что такое объект, и естественно читаются в коде на React: форматтер, выбираемый по локали, адаптер над сторонним SDK, неизменяемое значение Money, передаваемое между компонентами. Другие паттерны описывают связывание объектов, и в дереве компонентов они в основном умирают, потому что React это связывание уже предоставляет: через props, контекст, собственные хуки и хранилище.\n\nПолезная проверка — спросить, что паттерн заменил бы в приложении на React. Наблюдатель превращается в подписку в хранилище или в useSyncExternalStore. Репозиторий — в хук запроса над сетевым слоем. Команда — в экшен или thunk. Единица работы — в оптимистичное обновление с откатом. В каждом случае структуру уже дал фреймворк, и остаётся только имя, которое паттерн даёт решению, которое и так принимает каждый.\n\nКультовая версия паттерна — это иерархия классов, построенная для задачи, которую язык уже решил: эмиттер событий вокруг одного обратного вызова, фабрика, вызывающая new с одним аргументом, стратегия для двух веток. Цена такого кода не в числе строк, а в числе мест, где новичок обязан найти, что происходит при нажатии кнопки. Оставляйте паттерн там, где он называет настоящее решение, и избавляйтесь от него там, где он только добавляет слой.'
      ),
      bullets: [
        L('Patterns that describe data survive, patterns that describe wiring often do not.', 'Паттерны, описывающие данные, выживают, а описывающие связывание — обычно нет.'),
        L('React, the store and hooks already provide the composition root.', 'React, хранилище и хуки уже дают точку сборки.'),
        L('Naming the concept is often the whole value a pattern still brings.', 'Назвать понятие — часто это и есть весь остаток ценности паттерна.'),
        L('Two branches do not need a strategy, one subscriber does not need a bus.', 'Две ветки не требуют стратегии, один подписчик — шины.'),
        L('A pattern that adds a layer without removing a decision is pure cost.', 'Паттерн, добавляющий слой без снятия решения, — чистый расход.'),
      ],
      code: `// Strategy survives as a function type
type Formatter = (amount: number) => string;

const formatters: Record<'us' | 'ru', Formatter> = {
  us: (amount) => '$' + amount.toFixed(2),
  ru: (amount) => amount.toFixed(2) + ' RUB',
};

const render = (locale: 'us' | 'ru', amount: number): string =>
  formatters[locale](amount);

// Observer survives as a subscription with an explicit unsubscribe
const listeners = new Set<(message: string) => void>();

const subscribe = (listener: (message: string) => void): (() => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

const off = subscribe((message) => console.log('render', message));
off();
render('ru', 1999); // '1999.00 RUB'`,
      table: {
        caption: L('The pattern and its modern counterpart', 'Паттерн и его современный аналог'),
        headers: [L('Pattern', 'Паттерн'), L('In a frontend today', 'Во фронтенде сегодня'), L('Verdict', 'Вердикт')],
        rows: [
          [L('Strategy', 'Стратегия'), L('A function or a typed parameter', 'Функция или типизированный параметр'), L('Keep', 'Оставить')],
          [L('Observer', 'Наблюдатель'), L('Store subscription, useSyncExternalStore', 'Подписка в хранилище'), L('Keep the name', 'Оставить имя')],
          [L('Repository', 'Репозиторий'), L('A query hook over the API client', 'Хук запроса поверх API-клиента'), L('Keep the boundary', 'Оставить границу')],
          [L('Command', 'Команда'), L('An action or a thunk', 'Экшен или thunk'), L('Keep the data, drop the class', 'Оставить данные, убрать класс')],
          [L('Unit of work', 'Единица работы'), L('An optimistic update with a rollback', 'Оптимистичное обновление с откатом'), L('Keep the idea', 'Оставить идею')],
          [L('Facade', 'Фасад'), L('A feature module with a public API', 'Фича-модуль с публичным API'), L('Keep the idea', 'Оставить идею')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The hierarchy for a solved problem', 'Иерархия для решённой задачи'),
          text: L(
            'Building a base class, a factory and a strategy to deliver a static list of options is the most common form of pattern cargo cult in frontend code. The abstraction cost is paid by every reader, while the flexibility is never used. Write the three lines first and extract the pattern when the third variation arrives.',
            'Иерархия базового класса, фабрика и стратегия ради выдачи статичного списка вариантов — самая частая форма культового использования паттернов во фронтенде. Цену абстракции платит каждый читатель, а гибкость не используется никогда. Сначала напишите три строки и выделяйте паттерн, когда придёт третий вариант.'
          ),
        },
      ],
      takeaway: L(
        'Keep a pattern when it names a decision you actually make, and drop it when the framework already makes it for you.',
        'Оставляйте паттерн, когда он называет решение, которое вы действительно принимаете, и избавляйтесь от него там, где решение уже принято за вас фреймворком.'
      ),
      seeAlso: [
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 7-2: function composition and pipes', 'Секция 7-2: композиция функций и конвейеры'),
      ],
    },
  ],
};
