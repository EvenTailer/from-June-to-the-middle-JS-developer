import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh06: Chapter = {
  id: 'architecture-ch6',
  title: L('Frontend architecture in depth', 'Фронтенд-архитектура подробно'),
  summary: L(
    'Where state lives and who owns it, how server state differs from client state, what a component contract guarantees, how routing divides the application, what micro-frontends cost, and how to migrate a legacy frontend without stopping.',
    'Где живёт состояние и кто им владеет, чем серверное состояние отличается от клиентского, что гарантирует контракт компонента, как маршрутизация делит приложение, во что обходятся микрофронтенды и как мигрировать легаси-фронтенд без остановки.'
  ),
  sections: [
    {
      id: 'architecture-ch6-s1',
      title: L('State ownership and where state lives', 'Владение состоянием и где оно живёт'),
      body: L(
        'Every piece of state has exactly one owner, and the owner is the place that decides when the value changes. Anything that keeps a second copy of the same value is a projection that must be derived, because duplicated state eventually diverges and the code ends up with two sources of truth that answer the same question differently. The first question in any state discussion is not where to put the value, but who is allowed to change it.\n\nState can be classified by its lifetime and by who is allowed to write it: local UI state that lives in one component, session state that must survive a navigation, server state that the server owns and the client caches, and durable state that has to be persisted. Putting a value in the wrong category is the usual cause of a state bug, because a field that should have been derived from the URL starts to drift away from the URL.\n\nOwnership also decides where the value is stored. A value that only one route needs belongs to that route, a value shared by several routes belongs to the boundary they share, such as a layout, a store or the server, and a value that only the server can compute belongs in a request. Lifting state too far creates a global store that every screen re-renders for, while dropping it too low duplicates it across features.',
        'У каждого значения состояния ровно один владелец, и владелец это то место, где решается, когда значение меняется. Всё, что хранит вторую копию того же значения, — это проекция, которую нужно вычислять, потому что продублированное состояние рано или поздно разойдётся, и в коде появятся два источника истины с разными ответами на один вопрос. Первый вопрос в любом разговоре о состоянии звучит не «где его положить», а «кто имеет право его менять».\n\nСостояние можно классифицировать по времени жизни и по тому, кто вправе его писать: локальное состояние интерфейса внутри одного компонента, состояние сессии, переживающее навигацию, серверное состояние, которым владеет сервер, а клиент только кэширует, и долговременное состояние, которое нужно сохранять. Помещение значения в неверную категорию — обычная причина багов, потому что поле, которое следовало вывести из URL, начинает расходиться с URL.\n\nВладение определяет и место хранения. Значение, нужное только одному маршруту, принадлежит маршруту, значение, нужное нескольким, принадлежит их общей границе — layout, хранилищу или серверу, а значение, которое умеет вычислить только сервер, живёт в запросе. Подъём состояния слишком высоко создаёт глобальное хранилище, от которого перерисовывается всё, а слишком низко — дублирует его по фичам.'
      ),
      bullets: [
        L('One owner per state: the place that decides when the value changes.', 'У состояния один владелец: место, которое решает, когда значение меняется.'),
        L('Everything else is derived, never a second copy.', 'Всё остальное вычисляется, а не хранится второй копией.'),
        L('Classify state by lifetime: local, session, server, durable.', 'Классифицируйте состояние по времени жизни: локальное, сессионное, серверное, долговременное.'),
        L('State that belongs to the URL never lives inside a component.', 'Состояние, принадлежащее URL, не живёт внутри компонента.'),
        L('Lifting state too far creates a store that everything depends on.', 'Подъём состояния слишком высоко создаёт хранилище, от которого зависят все.'),
      ],
      code: `import { useState } from 'react';

type CartItem = { id: string; priceCents: number; quantity: number };

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  // total is derived, never stored: one owner, no second copy
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  const add = (item: CartItem) => setItems((current) => [...current, item]);
  return { items, total, add };
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The copy that became the source', 'Копия, которая стала источником'),
          text: L(
            'A value copied into a component state stops being a projection and starts being a second source of truth. The moment the server or the URL changes it, the copy is stale and the screen shows two different answers at the same time.',
            'Значение, скопированное в состояние компонента, перестаёт быть проекцией и становится вторым источником истины. Как только сервер или URL меняется, копия устаревает, и экран показывает два разных ответа одновременно.'
          ),
        },
        {
          tone: 'tip',
          title: L('Ask who may change it', 'Спросите, кто имеет право менять'),
          text: L(
            'When two parts of the interface both need to change a value, one of them owns it and the other asks. If both parts write to it, the value belongs somewhere neither of them controls, usually a store in the middle.',
            'Если две части интерфейса обе должны менять значение, одна им владеет, а вторая спрашивает. Если пишут обе, значение принадлежит чему-то третьему, что не контролирует ни одна из них, — обычно хранилищу посередине.'
          ),
        },
      ],
      takeaway: L(
        'Give every state exactly one owner, derive everything else, and put the value in the narrowest scope that owns it.',
        'Назначьте каждому состоянию ровно одного владельца, остальное вычисляйте, а значение держите в самой узкой области, которой оно принадлежит.'
      ),
      seeAlso: [
        L('Section 6-2: server state versus client state', 'Секция 6-2: серверное состояние против клиентского'),
        L('Section 3-5: shared code versus feature code', 'Секция 3-5: общий код против кода фичи'),
        L('Section 5-5: caching layers', 'Секция 5-5: слои кэша'),
      ],
    },
    {
      id: 'architecture-ch6-s2',
      title: L('Server state versus client state', 'Серверное состояние против клиентского'),
      body: L(
        'Server state is a cache of a remote truth, and client state is the truth itself. The difference matters because the two have different owners, different lifetimes and different invalidation rules: a client value is invalidated by an event inside the application, while a server value is invalidated by somebody else changing the data, and the client learns about it only when it asks again or when the server pushes a change.\n\nBecause server state is a cache, it needs the machinery of a cache: a key, a timestamp, a staleness window and a way to refetch. Dedicated query caches exist for exactly this, and using one is not a matter of taste. A hand written fetch inside an effect produces the double request that development mode shows on purpose and a flash of stale content in production.\n\nMutating server state has its own rules. An optimistic update writes the new value into the cache first and rolls it back when the request fails, which is safe only when the mutation is idempotent and the conflict resolution is defined. Without those rules, an optimistic update hides conflicts and turns a rare error into a silent data divergence that nobody notices until a report is wrong.',
        'Серверное состояние — это кэш удалённой истины, а клиентское состояние — сама истина. Разница важна, потому что у них разные владельцы, разное время жизни и разные правила инвалидации: клиентское значение сбрасывается событием внутри приложения, а серверное — тем, что кто-то другой изменил данные, и клиент узнаёт об этом только при следующем запросе или когда сервер присылает изменение.\n\nРаз серверное состояние это кэш, ему нужна механика кэша: ключ, метка времени, окно устаревания и способ перезапросить. Специализированные кэши запросов существуют ровно для этого, и их использование — не вопрос вкуса. Самописный fetch внутри эффекта даёт двойной запрос, который режим разработки показывает намеренно, и вспышку устаревших данных в проде.\n\nУ изменения серверного состояния свои правила. Оптимистичное обновление сначала пишет новое значение в кэш и откатывает его, если запрос не прошёл, и это безопасно только когда мутация идемпотентна, а правило разрешения конфликтов определено. Без этих правил оптимистичное обновление прячет конфликты и превращает редкую ошибку в тихое расхождение данных, которое замечают только по неверному отчёту.'
      ),
      bullets: [
        L('Server state is a cache of a remote truth, client state is the truth.', 'Серверное состояние — кэш удалённой истины, клиентское — сама истина.'),
        L('Server state needs a key, a timestamp and a staleness window.', 'Серверному состоянию нужны ключ, метка времени и окно устаревания.'),
        L('A fetch in an effect fires twice in development on purpose.', 'Загрузка внутри эффекта в разработке срабатывает дважды намеренно.'),
        L('Optimistic updates need an idempotent mutation and a rollback path.', 'Оптимистичные обновления требуют идемпотентной мутации и пути отката.'),
        L('Never hold a server value in a component without a cache behind it.', 'Не держите серверное значение в компоненте без кэша за ним.'),
      ],
      code: `import { useEffect, useState } from 'react';

type Entry = { data: unknown; updatedAt: number };

const cache = new Map<string, Entry>();

export function useServerQuery<T>(key: string, load: () => Promise<T>, staleMs = 30_000) {
  const [entry, setEntry] = useState<Entry | undefined>(cache.get(key));
  useEffect(() => {
    let active = true;
    void load().then((data) => {
      const next = { data, updatedAt: Date.now() };
      cache.set(key, next);
      if (active) setEntry(next);
    });
    return () => { active = false; };
  }, [key, load]);
  return { data: entry?.data as T | undefined, stale: !entry || Date.now() - entry.updatedAt > staleMs };
}`,
      table: {
        caption: L('Two kinds of state in a frontend', 'Два вида состояния во фронтенде'),
        headers: [L('Question', 'Вопрос'), L('Client state', 'Клиентское состояние'), L('Server state', 'Серверное состояние')],
        rows: [
          [
            L('Who owns it', 'Кто владеет'),
            L('The browser', 'Браузер'),
            L('The server, the client caches it', 'Сервер, клиент кэширует'),
          ],
          [
            L('How it changes', 'Как меняется'),
            L('An event in the app', 'Событие в приложении'),
            L('Somebody else changes the data', 'Кто-то другой меняет данные'),
          ],
          [
            L('When it is stale', 'Когда устаревает'),
            L('After the app logic changes it', 'После изменения логики приложения'),
            L('After the staleness window', 'После истечения окна устаревания'),
          ],
          [
            L('What invalidates it', 'Что сбрасывает'),
            L('The owner writes a new value', 'Владелец пишет новое значение'),
            L('A refetch or a push from the server', 'Перезапрос или пуш от сервера'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The double request is not a bug', 'Двойной запрос — не баг'),
          text: L(
            'Strict mode mounts effects twice in development to surface missing cleanup. If you suppress it with a ref flag, you hide a real leak between the first and the second mount. Fix the cleanup instead.',
            'Строгий режим монтирует эффекты дважды в разработке, чтобы показать пропущенную очистку. Если заглушить это флагом в ref, вы спрячете настоящую утечку между первым и вторым монтированием. Чините очистку.'
          ),
        },
        {
          tone: 'tip',
          title: L('Let the cache own the data', 'Пусть кэш владеет данными'),
          text: L(
            'When two screens need the same entity, the cache is the owner and the components read from it. Two components each fetching the same list produce two requests, two loading states and two chances to disagree.',
            'Когда двум экранам нужна одна сущность, владельцем становится кэш, а компоненты читают из него. Два компонента, каждый со своим запросом одного списка, дают два запроса, два состояния загрузки и два шанса разойтись.'
          ),
        },
      ],
      takeaway: L(
        'Treat server state as a cache with a key, a timestamp and a staleness window, and let the cache own the data that components read.',
        'Относитесь к серверному состоянию как к кэшу с ключом, меткой времени и окном устаревания и отдайте владение данными кэшу, из которого читают компоненты.'
      ),
      seeAlso: [
        L('Section 6-1: state ownership and where state lives', 'Секция 6-1: владение состоянием и где оно живёт'),
        L('Section 5-5: caching layers', 'Секция 5-5: слои кэша'),
        L('Section 5-3: transactions, outbox and idempotency', 'Секция 5-3: транзакции, outbox и идемпотентность'),
      ],
    },
    {
      id: 'architecture-ch6-s3',
      title: L('Design systems and component contracts', 'Дизайн-системы и контракты компонентов'),
      body: L(
        'A design system is a set of decisions about the interface, and the part that matters for architecture is the contract each component offers. A component with a well designed contract states what it is, what it accepts, what it guarantees and how a consumer is expected to compose it. When the contract is implicit, every consumer invents its own way of using the component, and the collection of components stops being a system.\n\nThe contract covers the props, the controlled and the uncontrolled behaviour, the accessibility guarantees and the slots where content can be injected. A controlled component takes a value and reports changes, an uncontrolled one keeps the value inside and is the right choice for a field that nobody else needs to read. A component that mixes both without saying so forces the consumer to guess.\n\nContracts are also how a design system survives organisational change. When a component is replaced, the contract decides how much of the application has to be rewritten, and a small and stable contract makes the replacement a local change. The visual language changes often, the contract should change rarely.',
        'Дизайн-система — это набор решений об интерфейсе, и для архитектуры важна та её часть, которая задаёт контракт компонента. Компонент с хорошо продуманным контрактом говорит, что он собой представляет, что принимает, что гарантирует и как потребитель должен его собирать. Когда контракт неявный, каждый потребитель изобретает свой способ использования, и набор компонентов перестаёт быть системой.\n\nКонтракт охватывает пропсы, управляемое и неуправляемое поведение, гарантии доступности и места, куда вставляется содержимое. Управляемый компонент принимает значение и сообщает об изменениях, неуправляемый хранит значение внутри и подходит полю, результат которого больше никто не читает. Компонент, который смешивает оба режима, не говоря об этом, заставляет потребителя гадать.\n\nКонтракты — это ещё и способ пережить организационные изменения. Когда компонент заменяют, контракт решает, сколько приложения придётся переписать, и небольшой устойчивый контракт делает замену локальным изменением. Визуальный язык меняется часто, контракт должен меняться редко.'
      ),
      bullets: [
        L('A component contract states the props, the guarantees and the way to compose.', 'Контракт компонента задаёт пропсы, гарантии и способ композиции.'),
        L('Controlled means the value lives outside, uncontrolled means it lives inside.', 'Controlled: значение живёт снаружи, uncontrolled: внутри компонента.'),
        L('Say which accessibility guarantees the component keeps.', 'Укажите, какие гарантии доступности компонент сохраняет.'),
        L('Prefer a few props with clear defaults over many optional props.', 'Предпочитайте немного пропсов с понятными значениями по умолчанию многим опциональным.'),
        L('A stable contract turns a component replacement into a local change.', 'Устойчивый контракт превращает замену компонента в локальное изменение.'),
      ],
      code: `type TabsProps = {
  value: string;
  onChange: (next: string) => void;
  items: ReadonlyArray<{ id: string; label: string; disabled?: boolean }>;
};

export function Tabs({ value, onChange, items }: TabsProps) {
  return (
    <div role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          type="button"
          aria-selected={item.id === value}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}`,
      table: {
        caption: L('What a component contract covers', 'Что охватывает контракт компонента'),
        headers: [L('Part', 'Часть'), L('Question it answers', 'Вопрос, на который отвечает'), L('Example', 'Пример')],
        rows: [
          [
            L('Props', 'Пропсы'),
            L('What can the consumer pass', 'Что потребитель может передать'),
            L('value, onChange, items', 'value, onChange, items'),
          ],
          [
            L('Ownership', 'Владение'),
            L('Who keeps the value', 'Кто хранит значение'),
            L('Controlled or uncontrolled', 'Управляемое или неуправляемое'),
          ],
          [
            L('Guarantees', 'Гарантии'),
            L('What the component promises', 'Что компонент обещает'),
            L('Keyboard support, focus order', 'Работа с клавиатурой, порядок фокуса'),
          ],
          [
            L('Slots', 'Места вставки'),
            L('Where custom content goes', 'Куда вставляется своё содержимое'),
            L('label, icon, footer', 'label, icon, footer'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The design system is a dependency', 'Дизайн-система — это зависимость'),
          text: L(
            'A design system that is copied from file to file is not a system, it is a set of forks. Publish it as a versioned package, consume it through the public API of the module, and let the version number tell you which screens were built against which contract.',
            'Дизайн-система, скопированная из файла в файл, — это не система, а набор форков. Публикуйте её как версионируемый пакет, подключайте через публичный API модуля, и номер версии скажет, какие экраны собраны под какой контракт.'
          ),
        },
        {
          tone: 'tip',
          title: L('Version the contract, not the pixels', 'Версионируйте контракт, а не пиксели'),
          text: L(
            'Consumers depend on behaviour and accessibility, not on colours. When the visual language changes, the contract stays and the migration is a CSS change. When the contract changes, every consumer has to be looked at.',
            'Потребители зависят от поведения и доступности, а не от цветов. Когда меняется визуальный язык, контракт остаётся, а миграция — это правка CSS. Меняется контракт — смотреть надо на каждого потребителя.'
          ),
        },
      ],
      takeaway: L(
        'Write the contract of a component down: props, ownership, guarantees and slots, and keep it stable while the pixels change.',
        'Фиксируйте контракт компонента: пропсы, владение, гарантии и места вставки, и держите его устойчивым, пока меняются краска и отступы.'
      ),
      seeAlso: [
        L('Section 6-4: routing as an application boundary', 'Секция 6-4: маршрутизация как граница приложения'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
        L('Section 6-6: migrating a legacy frontend', 'Секция 6-6: миграция легаси-фронтенда'),
      ],
    },
    {
      id: 'architecture-ch6-s4',
      title: L('Routing as an application boundary', 'Маршрутизация как граница приложения'),
      body: L(
        'A route is more than a URL that renders a component. It is a boundary: it owns a slice of the URL space, the data loading that the screen needs, the access rules for that slice and the team that changes it. Once a route owns its data loading and its own feature folder, a screen can be replaced without touching its neighbours, and the navigation table becomes the map of the application.\n\nRouting is also the natural place for code splitting, because the route is already the unit of navigation. A lazy import at the route boundary keeps the initial bundle small and makes the cost of a feature visible in the build output, where it can be tracked. Splitting inside a component, by contrast, produces chunks that nobody knows what belongs to and nobody dares to delete.\n\nThe boundary fails when the route layer becomes a place for business rules. Guards, loaders and layouts are infrastructure, and the moment they start deciding about prices or permissions, the logic sits in the least testable and least reusable place in the application. The rule is simple: a route decides what to show, a feature decides what it means.',
        'Маршрут — это не просто URL, который рендерит компонент. Это граница: он владеет частью пространства URL, загрузкой данных для экрана, правилами доступа для этого куска и командой, которая его меняет. Когда маршрут владеет своей загрузкой данных и своей папкой фичи, экран можно заменить, не трогая соседей, а таблица маршрутов превращается в карту приложения.\n\nМаршрутизация — ещё и естественное место для разделения бандла, потому что маршрут уже является единицей навигации. Ленивый импорт на границе маршрута удерживает стартовый бандл небольшим и делает стоимость фичи видимой в выводе сборки, где её можно отслеживать. Дробление внутри компонента, наоборот, даёт чанки, о которых никто не знает, что в них, и никто не решается их удалить.\n\nГраница ломается, когда слой маршрутов становится местом для бизнес-правил. Гарды, загрузчики и layout — это инфраструктура, и как только они начинают решать вопросы про цены или права, логика оказывается в наименее тестируемом и наименее переиспользуемом месте приложения. Правило простое: маршрут решает, что показать, фича решает, что это значит.'
      ),
      bullets: [
        L('A route owns a slice of the URL space and the data loading behind it.', 'Маршрут владеет частью пространства URL и загрузкой данных за ней.'),
        L('Split bundles at the route boundary, not inside components.', 'Дробите бандлы на границе маршрутов, а не внутри компонентов.'),
        L('Guards check access, features decide the rules.', 'Гарды проверяют доступ, фичи решают правила.'),
        L('The navigation table doubles as a map of the teams.', 'Таблица маршрутов работает и как карта команд.'),
        L('A route that loads data for another route hides the dependency.', 'Маршрут, грузящий данные для другого маршрута, прячет зависимость.'),
      ],
      code: `type RouteModule = {
  path: string;
  owner: string;
  load: () => Promise<unknown>;
};

// The bundler splits at the route boundary, so a feature is one chunk
function lazyRoute(path: string, owner: string): RouteModule {
  return { path, owner, load: () => import(path) };
}

export const routes: RouteModule[] = [
  lazyRoute('./features/orders/routes', 'team-orders'),
  lazyRoute('./features/billing/routes', 'team-billing'),
];

export function routesOwnedBy(owner: string): RouteModule[] {
  return routes.filter((route) => route.owner === owner);
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The route that became a controller', 'Маршрут, превратившийся в контроллер'),
          text: L(
            'When a loader grows business rules, it can no longer be reused from another entry point and it can only be tested with the whole route tree around it. The symptom is a rule that cannot be verified without starting the router.',
            'Когда в загрузчике растут бизнес-правила, его больше нельзя переиспользовать из другой точки входа и его нельзя проверить без окружающего дерева маршрутов. Симптом — правило, которое не проверяется без запуска роутера.'
          ),
        },
        {
          tone: 'tip',
          title: L('Let the route file list the owners', 'Пусть файл маршрутов перечисляет владельцев'),
          text: L(
            'Attaching an owner to every route turns the routing table into a map of responsibility. When a screen stops working, the map tells you who to ask and which teams are blocked by the same missing piece.',
            'Если у каждого маршрута есть владелец, таблица маршрутов становится картой ответственности. Когда экран ломается, карта говорит, к кому идти и какие команды блокирует одна и та же отсутствующая деталь.'
          ),
        },
      ],
      takeaway: L(
        'Let each route own its URL space, its data and its chunk, and keep business decisions out of the routing layer.',
        'Пусть каждый маршрут владеет своим пространством URL, своими данными и своим чанком, а бизнес-решения останутся вне слоя маршрутизации.'
      ),
      seeAlso: [
        L('Section 3-1: folders by feature', 'Секция 3-1: папки по фичам'),
        L('Section 6-3: design systems and component contracts', 'Секция 6-3: дизайн-системы и контракты компонентов'),
        L('Section 5-6: testing the architecture', 'Секция 5-6: тестирование архитектуры'),
      ],
    },
    {
      id: 'architecture-ch6-s5',
      title: L('Micro-frontends and their costs', 'Микрофронтенды и их цена'),
      body: L(
        'A micro-frontend splits a frontend into independently built and deployed pieces that the browser loads at runtime. The promise is organisational: each team owns a slice of the interface and releases it without waiting for the others. The price is that the whole now has to be assembled at runtime, and every joint in that assembly is a place where things can break.\n\nThe integration mode decides the cost. Iframe isolation is the safest and the clumsiest: separate CSS and JavaScript, no shared dependencies, and a communication channel that has to be designed. Module federation shares the runtime and the libraries, which keeps the bundle smaller but couples the pieces to the same dependency versions and to the same build.\n\nThe costs that are hardest to see are organisational. Duplicated dependencies inflate the bundle, a design system becomes a negotiation with several implementations, and testing a change means knowing which versions of which remote pieces are live. Micro-frontends do not remove the need for a coherent application, they move the coordination into a place where it is harder to see.',
        'Микрофронтенд делит фронтенд на части, которые собираются и выкатываются независимо, а браузер загружает их в рантайме. Обещание организационное: каждая команда владеет своим куском интерфейса и релизит его, не дожидаясь остальных. Цена в том, что целое теперь собирается в рантайме, и каждый шов этой сборки — место, где что-то может сломаться.\n\nСпособ интеграции определяет цену. Изоляция через iframe — самая безопасная и самая неуклюжая: отдельные CSS и JavaScript, никаких общих зависимостей и канал связи, который надо спроектировать. Module federation делит рантайм и библиотеки, что уменьшает бандл, но связывает части с одними и теми же версиями зависимостей и с одной сборкой.\n\nСамые незаметные расходы — организационные. Дублирование зависимостей раздувает бандл, дизайн-система превращается в переговоры с несколькими реализациями, а проверка изменения требует знать, какие версии каких удалённых частей сейчас живые. Микрофронтенды не отменяют потребность в целостном приложении, они переносят координацию туда, где её меньше видно.'
      ),
      bullets: [
        L('A micro-frontend moves coordination from the codebase into the runtime.', 'Микрофронтенд переносит координацию из кодовой базы в рантайм.'),
        L('Iframe isolation costs a communication channel and duplicated libraries.', 'Изоляция через iframe стоит канала связи и дублирования библиотек.'),
        L('Module federation shares libraries but couples their versions.', 'Module federation делит библиотеки, но связывает их версии.'),
        L('Every remote piece needs its own error boundary and a fallback.', 'У каждой удалённой части нужны свой error boundary и запасной вариант.'),
        L('A design system must be a versioned dependency, not a convention.', 'Дизайн-система должна быть версионируемой зависимостью, а не соглашением.'),
      ],
      code: `type Handshake = { name: string; apiVersion: string; wantsShared: string[] };

type Integration = { mode: 'embedded' | 'iframe'; reason: string };

const SUPPORTED_API = '2026-01';

export function negotiate(remote: Handshake): Integration {
  if (remote.apiVersion !== SUPPORTED_API) {
    return { mode: 'iframe', reason: 'api versions differ, isolate the piece' };
  }
  return { mode: 'embedded', reason: 'contracts match, share the runtime' };
}

export function sharedDependencies(remotes: Handshake[]): string[] {
  return [...new Set(remotes.flatMap((remote) => remote.wantsShared))];
}`,
      table: {
        caption: L('Integration modes and what they cost', 'Способы интеграции и их цена'),
        headers: [L('Mode', 'Способ'), L('Isolation', 'Изоляция'), L('Price', 'Цена')],
        rows: [
          [
            L('iframe', 'iframe'),
            L('Full, including the DOM', 'Полная, включая DOM'),
            L('Duplicated libraries, a message channel', 'Дублирование библиотек, канал сообщений'),
          ],
          [
            L('Module federation', 'Module federation'),
            L('None, one runtime', 'Нет, один рантайм'),
            L('Coupled versions, shared failures', 'Связанные версии, общие отказы'),
          ],
          [
            L('Build time composition', 'Сборка на этапе билда'),
            L('None, one bundle', 'Нет, один бандл'),
            L('Loses independent deployment', 'Теряется независимое развёртывание'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A remote piece is a remote dependency', 'Удалённая часть — это удалённая зависимость'),
          text: L(
            'A micro-frontend can be slow, broken or simply absent at runtime, and the shell has to survive all three. Without a timeout, an error boundary and a fallback, one bad remote piece takes the whole page down.',
            'Микрофронтенд в рантайме может быть медленным, сломанным или просто отсутствующим, и оболочка должна выживать во всех трёх случаях. Без таймаута, error boundary и запасного варианта одна плохая удалённая часть уронит всю страницу.'
          ),
        },
        {
          tone: 'note',
          title: L('Teams first, boundaries second', 'Сначала команды, потом границы'),
          text: L(
            'Splitting a frontend into pieces that one team still changes together adds runtime cost and buys nothing. The split pays off when the ownership of the code matches the ownership of the roadmap.',
            'Деление фронтенда на куски, которые одна команда всё равно меняет вместе, добавляет рантайм-затраты и ничего не даёт. Деление окупается, когда владение кодом совпадает с владением планом.'
          ),
        },
      ],
      takeaway: L(
        'Split the frontend only where the ownership of the code differs, and give every remote piece a timeout, a boundary and a fallback.',
        'Делите фронтенд только там, где владение кодом различается, и давайте каждой удалённой части таймаут, границу ошибок и запасной вариант.'
      ),
      seeAlso: [
        L('Chapter 4: service architecture', 'Глава 4: сервисная архитектура'),
        L('Section 6-4: routing as an application boundary', 'Секция 6-4: маршрутизация как граница приложения'),
        L('Section 6-6: migrating a legacy frontend', 'Секция 6-6: миграция легаси-фронтенда'),
      ],
    },
    {
      id: 'architecture-ch6-s6',
      title: L('Migrating a legacy frontend', 'Миграция легаси-фронтенда'),
      body: L(
        'A legacy frontend is usually migrated by replacement, and replacement fails because nothing can be demonstrated until the whole thing is done. The alternative is the strangler pattern: put the new application next to the old one and move one route at a time, so that every step is in production before the next one starts. The old code stays in place and slowly loses territory.\n\nThe hard part is choosing the seams. A seam is a place where the old and the new can coexist: a route, a widget inside a page, a shared data source. Good seams are narrow and stable, because a wide seam means the two applications have to agree on everything at once. Start with the seam that is easiest to isolate and hardest to break, not with the most valuable screen.\n\nMigration is a long project, and it fails when it is treated as a rewrite with a deadline. It succeeds when the old system keeps working, every migrated route sits behind a flag, and the measure of progress is the share of traffic served by the new code. When that share stops growing, the reason is a design problem, not a lack of effort.',
        'Легаси-фронтенд обычно мигрируют заменой, и замена проваливается, потому что показать результат нельзя, пока не готово всё. Альтернатива — паттерн strangler: новое приложение ставится рядом со старым, и маршруты переносятся по одному, так что каждый шаг выходит в прод до начала следующего. Старый код остаётся на месте и постепенно теряет территорию.\n\nТрудная часть — выбрать швы. Шов это место, где старое и новое могут сосуществовать: маршрут, виджет внутри страницы, общий источник данных. Хорошие швы узкие и устойчивые, потому что широкий шов заставляет два приложения договариваться обо всём сразу. Начинайте с самого изолируемого и самого хрупкого шва, а не с самого ценного экрана.\n\nМиграция — длинный проект, и она проваливается, когда её считают переписыванием с дедлайном. Она удаётся, когда старая система продолжает работать, каждый мигрированный маршрут живёт за флагом, а мерой прогресса служит доля трафика, обслуживаемая новым кодом. Когда эта доля перестаёт расти, причина в дизайне, а не в нехватке усилий.'
      ),
      bullets: [
        L('Migrate by replacing routes, not by rewriting the application.', 'Мигрируйте, заменяя маршруты, а не переписывая приложение целиком.'),
        L('Choose narrow seams where the old and the new can coexist.', 'Выбирайте узкие швы, где старое и новое могут сосуществовать.'),
        L('Every migrated route sits behind a flag with a rollback.', 'Каждый мигрированный маршрут живёт за флагом с возможностью отката.'),
        L('Progress is the share of traffic served by the new code.', 'Прогресс измеряется долей трафика, обслуживаемой новым кодом.'),
        L('Keep the old system working for the whole migration.', 'Старая система должна работать всё время миграции.'),
      ],
      code: `type Route = { path: string; owner: 'legacy' | 'new'; servedTo: number };

const routes: Route[] = [
  { path: '/catalog', owner: 'new', servedTo: 100 },
  { path: '/orders', owner: 'legacy', servedTo: 100 },
];

export function ownerOf(path: string): 'legacy' | 'new' {
  return routes.find((route) => route.path === path)?.owner ?? 'legacy';
}

export function trafficServedByNew(): number {
  const total = routes.reduce((sum, route) => sum + route.servedTo, 0);
  const migrated = routes
    .filter((route) => route.owner === 'new')
    .reduce((sum, route) => sum + route.servedTo, 0);
  return total === 0 ? 0 : Math.round((migrated / total) * 100);
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The big bang migration', 'Миграция «большой взрыв»'),
          text: L(
            'A migration that only shows a result at the end has no feedback loop: the risk is discovered in production, the deadline has already passed and the only way forward is to patch the new code under pressure.',
            'Миграция, которая показывает результат только в конце, не имеет петли обратной связи: риск обнаруживается в проде, дедлайн уже прошёл, и единственный путь — латать новый код под давлением.'
          ),
        },
        {
          tone: 'tip',
          title: L('Move the strangler, keep the trunk', 'Двигайте strangler, оставляйте ствол'),
          text: L(
            'Keep the old system in production and fully supported until the new one carries the traffic alone. The moment the old code becomes nobody\'s responsibility, the migration turns into a debugging marathon with two systems in production.',
            'Держите старую систему в проде и полностью поддерживаемой, пока новая не возьмёт трафик целиком. С того момента, как за старый код никто не отвечает, миграция превращается в марафон по отладке с двумя системами в проде.'
          ),
        },
      ],
      takeaway: L(
        'Migrate one narrow seam at a time, keep the old system alive behind a flag, and measure progress as the share of traffic on the new code.',
        'Мигрируйте по одному узкому шву за раз, держите старую систему живой за флагом и измеряйте прогресс как долю трафика на новом коде.'
      ),
      seeAlso: [
        L('Section 5-1: configuration and feature flags', 'Секция 5-1: конфигурация и флаги функций'),
        L('Section 6-1: state ownership and where state lives', 'Секция 6-1: владение состоянием и где оно живёт'),
        L('Section 7-3: cost of a decision and reversibility', 'Секция 7-3: цена решения и обратимость'),
      ],
    },
  ],
};
