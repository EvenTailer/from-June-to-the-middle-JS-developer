import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh04: Chapter = {
  id: 'oop-ch4',
  title: L('SOLID in practice', 'SOLID на практике'),
  summary: L(
    'The five SOLID principles as they apply to TypeScript and React code: one reason to change, extend without touching, substitutable subclasses, narrow interfaces and dependencies that point inwards.',
    'Пять принципов SOLID применительно к TypeScript и React: одна причина для изменения, расширение без правок, подставляемость наследников, узкие интерфейсы и зависимости, направленные внутрь.'
  ),
  sections: [
    {
      id: 'oop-ch4-s1',
      title: L('Single responsibility', 'Принцип единой ответственности'),
      body: L(
        'Single responsibility is not one class per concept. It is one reason to change. The reason is an actor in the domain, such as the payment provider that changed its API or the designer who changed the layout, and every class should have at most one of them. A class that formats an order and stores it has two reasons, and it will change twice as often, twice as riskily and in two places at once.\n\nThe symptom is a file that half the codebase imports. When the order formatting changes, the persistence test breaks, the API test breaks and the UI test breaks, and nobody can explain why because those tests are not about formatting. Splitting by responsibility fixes the blast radius, and it also gives every piece a name that can be searched.\n\nThe trap is splitting by noun. A User class, an Order class and a Payment class still contain the same mixed responsibilities, only now they are spread over three files with shared helpers. The real question is which actor causes the change, and the split should follow that answer.\n\nIn a codebase with tests, the practical measure is simple: when one feature changes, how many unrelated test files fail? A high number means the responsibilities are mixed, whatever the folders look like.',
        'Принцип единой ответственности — это не один класс на концепцию. Это одна причина для изменения. Причина — действующее лицо предметной области: например, платёжный провайдер, изменивший свой API, или дизайнер, поменявший вёрстку, — и у каждого класса такая причина должна быть максимум одна. Класс, который форматирует заказ и хранит его, имеет две причины, и будет меняться вдвое чаще, вдвое рискованнее и сразу в двух местах.\n\nСимптом — файл, который импортирует половина кодовой базы. Когда меняется форматирование заказа, падают тест хранилища, тест API и тест интерфейса, и никто не может объяснить почему: эти тесты вообще не про форматирование. Разделение по ответственности чинит радиус поражения и заодно даёт каждой части имя, по которому можно искать.\n\nЛовушка — делить по существительным. Классы User, Order и Payment всё равно содержат те же смешанные ответственности, просто теперь они размазаны по трём файлам с общими помощниками. Настоящий вопрос в том, какое действующее лицо вызывает изменение, и делить нужно по нему.\n\nВ кодовой базе с тестами практическая мера проста: когда меняется одна фича, сколько падает несвязанных тестовых файлов? Много — значит ответственности смешаны, как бы ни выглядели папки.'
      ),
      bullets: [
        L('SRP means one reason to change, not one class per concept.', 'SRP означает одну причину для изменения, а не один класс на концепцию.'),
        L('The reason is an actor in the domain, not a technical layer.', 'Причина — действующее лицо предметной области, а не технический слой.'),
        L('A file imported by half the codebase usually mixes responsibilities.', 'Файл, который импортирует половина кодовой базы, обычно смешивает ответственности.'),
        L('Splitting by noun keeps the same mixed responsibilities in more files.', 'Деление по существительным сохраняет те же смешанные ответственности в большем числе файлов.'),
        L('Unrelated failing tests after one change are the measure of a responsibility leak.', 'Падающие несвязанные тесты после одного изменения — мера протечки ответственности.'),
      ],
      code: `type Order = { id: string; total: number };

// One reason to change: how an order is presented
class OrderPresenter {
  format(order: Order): string {
    return \`\${order.id}: \${order.total.toFixed(2)}\`;
  }
}

// Another reason: how an order is stored
class OrderStore {
  readonly saved: Order[] = [];

  save(order: Order): void {
    this.saved.push(order);
  }
}

const order: Order = { id: 'o-1', total: 12.5 };
console.log(new OrderPresenter().format(order)); // 'o-1: 12.50'
new OrderStore().save(order);`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The split that changes nothing', 'Разбиение, которое ничего не меняет'),
          text: L(
            'Moving half of a class into a new file does not reduce the number of reasons to change if the two halves still change together. Measure the blast radius after the split, not the number of files.',
            'Перенос половины класса в новый файл не уменьшает число причин для изменения, если обе половины меняются вместе. После разбиения измеряйте радиус поражения, а не число файлов.'
          ),
        },
        {
          tone: 'tip',
          title: L('Ask who asks for the change', 'Спросите, кто просит об изменении'),
          text: L(
            'A product manager, a payment provider, a designer and a database administrator are different actors. A class that serves two of them will serve them badly, because each actor pushes it in a different direction.',
            'Продакт-менеджер, платёжный провайдер, дизайнер и администратор базы — разные действующие лица. Класс, который обслуживает двоих, обслуживает их плохо: каждый тянет его в свою сторону.'
          ),
        },
      ],
      takeaway: L(
        'Split by the actor that causes the change, and check the blast radius afterwards.',
        'Делите по действующему лицу, которое вызывает изменение, и после деления проверяйте радиус поражения.'
      ),
      seeAlso: [
        L('Section 2-1: where the rules live', 'Секция 2-1: где живут правила'),
        L('Section 2-5: when a class is the wrong tool', 'Секция 2-5: когда класс — не тот инструмент'),
        L('Section 4-6: SOLID in a React codebase', 'Секция 4-6: SOLID в кодовой базе на React'),
      ],
    },
    {
      id: 'oop-ch4-s2',
      title: L('Open-closed', 'Принцип открытости и закрытости'),
      body: L(
        'Open-closed means new behaviour arrives as new code instead of as an edit to the code that dispatches it. The classic violation is a switch that grows a branch for every new provider, every new currency or every new notification channel. The code was closed for modification the moment the second case appeared, because every new case means an edit to a function that the other cases also depend on.\n\nThe repair is to replace the condition with a table of implementations. A record of strategies, or a registry that plugins add to at start-up, keeps the dispatching code untouched when a strategy is added. The behaviour is now open for extension and closed for modification, which is the whole principle in one sentence.\n\nThe trap is applying the principle everywhere. An extension point is a cost: you must design the interface before you know all the cases, you must keep it stable, and the indirection makes the simple path slower to read. Registering a strategy for a value that has three fixed variants is over-engineering.\n\nThe practical question is not whether the code can be extended but whether the set of variations is open. If new formats, providers or rules arrive monthly, the dispatch belongs behind an interface. If the list has been stable for years, a switch inside one function is simpler and honest.',
        'Принцип открытости и закрытости означает, что новое поведение приходит новым кодом, а не правкой кода, который его распределяет. Классическое нарушение — switch, у которого растёт ветка на каждого нового провайдера, на каждую новую валюту и на каждый новый канал уведомлений. Код стал закрытым на модификацию сразу после появления второго случая, потому что каждый новый случай означает правку функции, от которой зависят и остальные.\n\nПочинка — заменить условие таблицей реализаций. Словарь стратегий или реестр, в который плагины добавляют себя на старте, оставляют код распределения нетронутым при добавлении стратегии. Поведение теперь открыто для расширения и закрыто для модификации — весь принцип в одном предложении.\n\nЛовушка — применять принцип везде. Точка расширения стоит денег: интерфейс надо спроектировать до того, как известны все случаи, его надо удерживать стабильным, а косвенность делает простой путь медленнее для чтения. Заводить стратегию для значения с тремя фиксированными вариантами — это переусложнение.\n\nПрактический вопрос не в том, можно ли расширить код, а в том, открыт ли набор вариаций. Если новые форматы, провайдеры или правила приходят каждый месяц, распределение должно жить за интерфейсом. Если список не менялся годами, switch внутри одной функции проще и честнее.'
      ),
      bullets: [
        L('OCP means new behaviour comes as new code, not as an edit to the dispatch.', 'OCP означает, что новое поведение приходит новым кодом, а не правкой диспетчера.'),
        L('A switch that grows a branch per case is the classic violation.', 'Классическое нарушение — switch, у которого растёт ветка на каждый случай.'),
        L('Replace the condition with a table of strategies or a registry.', 'Замените условие таблицей стратегий или реестром.'),
        L('Every extension point costs design effort and must be kept stable.', 'Каждая точка расширения стоит проектирования и должна оставаться стабильной.'),
        L('Apply the principle to the axes of change that really vary.', 'Применяйте принцип к тем осям изменения, которые действительно меняются.'),
      ],
      code: `interface Formatter {
  format(value: number): string;
}

const formatters: Record<string, Formatter> = {
  plain: { format: (value) => String(value) },
  money: { format: (value) => \`\$\${value.toFixed(2)}\` },
  percent: { format: (value) => \`\${Math.round(value * 100)}%\` },
};

function formatWith(name: string, value: number): string {
  const formatter = formatters[name];
  if (!formatter) throw new Error(\`unknown formatter: \${name}\`);
  return formatter.format(value);
}

console.log(formatWith('money', 12.5)); // '$12.50'`,
      table: {
        caption: L('Dispatching to a behaviour', 'Распределение поведения'),
        headers: [L('Approach', 'Подход'), L('Adding a case', 'Добавление случая'), L('Best when', 'Лучше всего когда')],
        rows: [
          [L('A switch on a type', 'switch по типу'), L('Edit the switch, edit the function', 'Правим switch, правим функцию'), L('The list of cases is closed', 'Список случаев закрыт')],
          [L('A record of strategies', 'Словарь стратегий'), L('Add one entry, touch nothing else', 'Добавляем одну запись, больше ничего'), L('Cases arrive over time', 'Случаи появляются со временем')],
          [L('A registry filled at start-up', 'Реестр, наполняемый на старте'), L('Register the plugin, no core change', 'Регистрируем плагин, ядро не трогаем'), L('Extensions ship separately', 'Расширения приходят отдельно')],
          [L('A polymorphic call', 'Полиморфный вызов'), L('Add a class, the caller stays', 'Добавляем класс, вызывающий не меняется'), L('The behaviour is a first-class value', 'Поведение — полноценная ценность')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Extension points are not free', 'Точки расширения не бесплатны'),
          text: L(
            'Every registry entry is a promise that the interface will stay usable. Before you add one, check that the set of variations really grows; a registry with three permanent entries is an abstraction with overhead and no benefit.',
            'Каждая запись в реестре — обещание, что интерфейс останется пригодным. Прежде чем добавить её, убедитесь, что набор вариаций действительно растёт: реестр с тремя постоянными записями — это абстракция с накладными расходами без пользы.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the dispatch in one place', 'Держите распределение в одном месте'),
          text: L(
            'The value of the pattern is not the map itself but the fact that the map is the only place that knows the variants. A second switch elsewhere reintroduces the coupling you just removed.',
            'Ценность паттерна не в самом словаре, а в том, что только он знает о вариантах. Второй switch в другом месте вернёт ту связанность, которую вы только что убрали.'
          ),
        },
      ],
      takeaway: L(
        'Put the variants behind one table or registry, and never edit the code that dispatches to it.',
        'Спрячьте варианты за одним словарём или реестром и никогда не правьте код, который по нему распределяет.'
      ),
      seeAlso: [
        L('Section 3-3: template method and the protected hook', 'Секция 3-3: шаблонный метод и защищённый хук'),
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Chapter 5 (oop): design patterns', 'Глава 5 (oop): паттерны проектирования'),
      ],
    },
    {
      id: 'oop-ch4-s3',
      title: L('Liskov substitution', 'Принцип подстановки Лисков'),
      body: L(
        'Liskov substitution asks a simple question: can a subclass be used everywhere its base is used, without the caller noticing anything? If a client receives a base and receives a subclass, the client must be able to do exactly the same things and expect the same guarantees. The test is not the type, it is the behaviour: a subtype that breaks a promise of the base is not a subtype in the meaningful sense, even when the compiler accepts it.\n\nThe usual violations are behavioural. A subclass that throws where the base returns a value. A subclass that accepts an input the base rejects. A subclass that weakens a postcondition, such as an equality method that reports two equal values as different. A subclass that changes the meaning of an inherited mutable field, so that a base method now operates on data the subclass wrote differently.\n\nTypeScript cannot catch any of this, because it checks shapes and not semantics. Two classes with identical members can still have completely different contracts. The only defence is a test that runs the same suite against the base and against every subclass, which is also why a base class with mutable state is dangerous: that state is shared between the contract and the implementation.\n\nThe rule that keeps you safe: a subclass may add behaviour and may narrow what it accepts, but it must not change what the base promised. If a subclass needs different behaviour, it is not a subclass, and composition will be shorter to write and easier to test.',
        'Принцип подстановки Лисков задаёт простой вопрос: можно ли использовать наследника везде, где используется база, так, чтобы вызывающий ничего не заметил? Если клиент получает базу и получает наследника, он должен уметь делать ровно то же самое и ждать тех же гарантий. Проверка не в типе, а в поведении: подтип, нарушающий обещание базы, не подтип в содержательном смысле, даже если компилятор его принимает.\n\nОбычные нарушения поведенческие. Наследник бросает исключение там, где база возвращает значение. Наследник принимает вход, который база отвергает. Наследник ослабляет постусловие, например равенство, которое отвечает, что два равных значения различны. Наследник меняет смысл унаследованного изменяемого поля, и метод базы теперь работает с данными, которые записал наследник по-другому.\n\nTypeScript не ловит ничто из этого, потому что проверяет форму, а не смысл. Два класса с одинаковыми членами могут иметь совершенно разные контракты. Единственная защита — тест, который прогоняет один и тот же набор проверок по базе и по каждому наследнику. Именно поэтому базовый класс с изменяемым состоянием опасен: это состояние общее у контракта и у реализации.\n\nПравило безопасности: наследник может добавлять поведение и может сужать принимаемое, но он не должен менять то, что обещала база. Если наследнику нужно другое поведение, он не наследник, и композиция получится короче и легче для тестирования.'
      ),
      bullets: [
        L('LSP asks whether a subclass can replace the base without the caller noticing.', 'LSP спрашивает, можно ли подставить наследника вместо базы незаметно для вызывающего.'),
        L('A subtype that throws where the base returns breaks the contract.', 'Подтип, который бросает исключение там, где база возвращает значение, нарушает контракт.'),
        L('TypeScript checks shapes, not semantics, so it cannot detect a violation.', 'TypeScript проверяет форму, а не смысл, поэтому нарушение он не обнаружит.'),
        L('A mutable field in the base is the usual root cause of a violation.', 'Изменяемое поле в базе — обычная причина нарушения.'),
        L('A subclass that needs different behaviour wants composition, not inheritance.', 'Наследнику, которому нужно другое поведение, нужна композиция, а не наследование.'),
      ],
      code: `class Account {
  balance = 100;
  charge(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }
}

class OverdraftAccount extends Account {
  override charge(amount: number): boolean {
    this.balance -= amount; // accepts what the base rejects
    return true;
  }
}

function settle(account: Account, amount: number): void {
  if (!account.charge(amount)) throw new Error('charge rejected');
}

settle(new Account(), 200); // throws, exactly as the contract promises
settle(new OverdraftAccount(), 200); // succeeds - the caller can tell, and that is the violation`,
      table: {
        caption: L('Valid substitution and violations', 'Допустимая подстановка и нарушения'),
        headers: [L('Contract', 'Контракт'), L('Valid subclass', 'Допустимый наследник'), L('Violation', 'Нарушение')],
        rows: [
          [L('Returns a value', 'Возвращает значение'), L('Returns a value too', 'Тоже возвращает значение'), L('Throws instead', 'Бросает исключение')],
          [L('Accepts a range', 'Принимает диапазон'), L('Accepts a narrower range', 'Принимает более узкий диапазон'), L('Accepts a wider range', 'Принимает более широкий диапазон')],
          [L('Compares by value', 'Сравнивается по значению'), L('Compares by the same fields', 'Сравнивается по тем же полям'), L('Compares by a subset', 'Сравнивается по подмножеству')],
          [L('Mutates its own state', 'Меняет своё состояние'), L('Mutates only its own state', 'Меняет только своё состояние'), L('Mutates shared base state', 'Меняет общее состояние базы')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The shape matches, the contract does not', 'Форма совпадает, контракт нет'),
          text: L(
            'TypeScript accepts a subclass that behaves differently as long as the members line up. The compiler cannot know that charge was supposed to reject an overdraft, so the violation surfaces in production as a business bug.',
            'TypeScript примет наследника с другим поведением, если совпадают члены. Компилятор не может знать, что charge обязано было отвергать овердрафт, и нарушение всплывает в проде как бизнес-баг.'
          ),
        },
        {
          tone: 'tip',
          title: L('Run one suite against base and subclasses', 'Гоняйте один набор проверок по базе и наследникам'),
          text: L(
            'A contract test that runs against the base and every subclass turns substitutability into something you can verify. If a subclass fails the suite, the subclass is wrong, not the test.',
            'Контрактный тест, который прогоняется по базе и по каждому наследнику, превращает подставляемость в проверяемую величину. Если наследник падает, виноват наследник, а не тест.'
          ),
        },
      ],
      takeaway: L(
        'A subclass may add behaviour, but it must never change what the base promised.',
        'Наследник может добавлять поведение, но не должен менять то, что обещала база.'
      ),
      seeAlso: [
        L('Section 3-1: inheritance and the fragile base class', 'Секция 3-1: наследование и уязвимый базовый класс'),
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 2-1: where the rules live', 'Секция 2-1: где живут правила'),
      ],
    },
    {
      id: 'oop-ch4-s4',
      title: L('Interface segregation', 'Принцип разделения интерфейсов'),
      body: L(
        'Interface segregation says no client should be forced to depend on methods it never calls. A single interface with twenty members is twenty obligations for every implementer, and most of them will be stubs that throw not implemented, because the implementer only needed two of them. The cost is not the stubs, it is that a new method on the interface breaks every implementer, even the ones that did not need it.\n\nIn TypeScript the problem is more concrete than in Java, because a class can satisfy an interface structurally without declaring it. When the interface is fat, every fake in every test grows the same stubs, and the test that only needs findById still has to implement delete, update and exportAll. Narrow interfaces remove that noise.\n\nThe split is easy: define one interface per client, named after what the client does, not after the data. A reader interface with findById, a writer interface with save and delete, a service interface that uses both. Any class that can satisfy the reader satisfies the reader, and the fat interface disappears without any change to the implementation.\n\nDo not split too early. An interface per method produces a dozen names for one concept and a reader who has to know which one to use. Wait for the second client with different needs, then split, because splitting an interface is cheap while merging them back is not.',
        'Принцип разделения интерфейсов говорит, что ни один клиент не должен быть обязан зависеть от методов, которые он никогда не вызывает. Один интерфейс с двадцатью членами — это двадцать обязательств для каждой реализации, и большинство из них будут заглушками, бросающими «не реализовано», потому что реализации нужны два. Цена не в заглушках, а в том, что новый метод в интерфейсе ломает все реализации, даже те, которым он не нужен.\n\nВ TypeScript проблема острее, чем в Java, потому что класс может удовлетворять интерфейсу структурно, не объявляя этого. Когда интерфейс жирный, каждый фейк в каждом тесте обрастает теми же заглушками, и тест, которому нужен только findById, всё равно обязан реализовать delete, update и exportAll. Узкие интерфейсы убирают этот шум.\n\nРазбить просто: определите по интерфейсу на клиента, названный по тому, что клиент делает, а не по данным, которыми он владеет. Интерфейс читателя с findById, интерфейс писателя с save и delete, сервисный интерфейс, использующий оба. Любой класс, удовлетворяющий читателю, удовлетворяет читателю, а жирный интерфейс исчезает без единого изменения в реализации.\n\nНе делите слишком рано. Интерфейс на метод даёт десяток имён одной концепции и читателю, который должен знать, какой использовать. Дождитесь второго клиента с другими потребностями и тогда делите: разделить интерфейс дёшево, а собрать обратно — нет.'
      ),
      bullets: [
        L('ISP asks whether a client depends on members it never calls.', 'ISP спрашивает, зависит ли клиент от членов, которые он никогда не вызывает.'),
        L('A fat interface makes every implementer and every fake grow stubs.', 'Жирный интерфейс заставляет каждую реализацию и каждый фейк обрастать заглушками.'),
        L('Adding a method to a fat interface breaks every implementer.', 'Добавление метода в жирный интерфейс ломает все реализации.'),
        L('Split by what the client does, not by the data it holds.', 'Делите по тому, что делает клиент, а не по данным, которыми он владеет.'),
        L('Split when the second client appears, not before.', 'Делите интерфейс, когда появился второй клиент, а не раньше.'),
      ],
      code: `type User = { id: string; name: string };
// The reader needs one method, so it gets one interface
interface UserReader {
  findById(id: string): User | undefined;
}
interface UserWriter {
  save(user: User): void;
}

class MemoryUsers implements UserReader, UserWriter {
  private readonly users = new Map<string, User>();
  findById(id: string): User | undefined {
    return this.users.get(id);
  }
  save(user: User): void {
    this.users.set(user.id, user);
  }
}

const users = new MemoryUsers();
users.save({ id: 'u-1', name: 'Ada' });
console.log(users.findById('u-1')?.name); // 'Ada'`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The fat interface in every fake', 'Жирный интерфейс в каждом фейке'),
          text: L(
            'When a test needs one method from a twenty-member interface, the fake grows nineteen stubs that throw. The throwing stubs hide in the test file until somebody calls one by accident, and then the failure points at the wrong line.',
            'Когда тесту нужен один метод из интерфейса с двадцатью членами, фейк обрастает девятнадцатью заглушками, которые бросают исключение. Заглушки прячутся в тесте, пока кто-нибудь случайно не вызовет одну, и тогда ошибка указывает не на ту строку.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name interfaces after roles', 'Называйте интерфейсы по ролям'),
          text: L(
            'UserReader says what the consumer can do; UserRepository says what it is. The first grows with the needs of the code that uses it, the second grows with the data and drags every implementer along.',
            'UserReader говорит, что может потребитель; UserRepository — что это такое. Первый растёт вместе с потребностями потребителя, второй растёт вместе с данными и тянет за собой все реализации.'
          ),
        },
      ],
      takeaway: L(
        'Give every client an interface that contains only what it uses, and split when the second client appears.',
        'Давайте каждому клиенту интерфейс только с тем, что он использует, и делите, когда появился второй клиент.'
      ),
      seeAlso: [
        L('Section 4-5: dependency inversion', 'Секция 4-5: инверсия зависимостей'),
        L('Section 3-2: polymorphism through interfaces', 'Секция 3-2: полиморфизм через интерфейсы'),
        L('Section 2-3: information hiding and the public surface', 'Секция 2-3: сокрытие информации и публичная поверхность'),
      ],
    },
    {
      id: 'oop-ch4-s5',
      title: L('Dependency inversion', 'Принцип инверсии зависимостей'),
      body: L(
        'Dependency inversion has two halves that beginners usually collapse into one. The high-level policy should not depend on the low-level details; both should depend on an abstraction that the high-level side owns. The second half is the one people miss: the interface belongs to the consumer, not to the producer, because the consumer is the side that defines what it needs.\n\nIn TypeScript the abstraction is an ordinary interface, and structural typing means the producer does not even have to know about it. A domain service declares the gateway it needs, the HTTP implementation satisfies it by accident, and a test supplies a fake. Nothing has to import a framework to be replaceable.\n\nThe trap is a domain service that imports fetch. Now the business rule knows about URLs, headers, timeouts and retries, and testing it requires a network or a global mock. The dependency points the wrong way: the policy depends on the mechanism, and the mechanism changes far more often than the policy.\n\nThe composition root is where the inversion completes: one place where the concrete implementations are chosen and wired together. Everything else receives its collaborators through the constructor, so the choice of implementation is a deployment decision rather than a design decision buried in the code.',
        'У принципа инверсии зависимостей две половины, которые новички обычно сворачивают в одну. Высокоуровневая политика не должна зависеть от низкоуровневых деталей; обе должны зависеть от абстракции, которой владеет высокоуровневая сторона. Вторую половину обычно упускают: интерфейс принадлежит потребителю, а не производителю, потому что потребность определяет именно потребитель.\n\nВ TypeScript абстракция — обычный интерфейс, и благодаря структурной типизации производителю вообще не обязательно знать о нём. Доменный сервис объявляет нужный ему шлюз, HTTP-реализация удовлетворяет ему попутно, а тест подставляет фейк. Ничто не обязано импортировать фреймворк, чтобы быть заменяемым.\n\nЛовушка — доменный сервис, который импортирует fetch. Теперь бизнес-правило знает про URL, заголовки, таймауты и повторы, и его тестирование требует сети или глобальной моки. Зависимость направлена не туда: политика зависит от механизма, а механизм меняется гораздо чаще политики.\n\nИнверсия завершается в корне композиции: в одном месте выбираются и связываются конкретные реализации. Всё остальное получает коллабораторов через конструктор, поэтому выбор реализации становится решением о развёртывании, а не зашитым в код проектным решением.'
      ),
      bullets: [
        L('Both the policy and the mechanism should depend on an abstraction, not on each other.', 'И политика, и механизм должны зависеть от абстракции, а не друг от друга.'),
        L('The interface belongs to the consumer, because the consumer defines the need.', 'Интерфейс принадлежит потребителю, потому что потребность определяет он.'),
        L('Structural typing lets an implementation satisfy the interface without importing it.', 'Структурная типизация позволяет реализации удовлетворить интерфейс без его импорта.'),
        L('A domain service that imports fetch couples business rules to the network.', 'Доменный сервис, импортирующий fetch, связывает правила с сетью.'),
        L('The composition root is the single place where concrete implementations are chosen.', 'Корень композиции — единственное место, где выбираются конкретные реализации.'),
      ],
      code: `interface OrderGateway {
  load(id: string): Promise<{ id: string; paid: boolean }>;
  save(order: { id: string; paid: boolean }): Promise<void>;
}

export class PlaceOrder {
  readonly gateway: OrderGateway;

  constructor(gateway: OrderGateway) {
    this.gateway = gateway;
  }

  async execute(id: string): Promise<void> {
    const order = await this.gateway.load(id);
    order.paid = true;
    await this.gateway.save(order);
  }
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The domain that imports fetch', 'Домен, который импортирует fetch'),
          text: L(
            'A business rule that calls fetch directly cannot be tested without a network or a global mock, and every change in the HTTP layer reaches into the domain. Declare the gateway in the domain and let the application layer provide the implementation.',
            'Бизнес-правило, вызывающее fetch напрямую, нельзя протестировать без сети или глобальной моки, и любая правка HTTP-слоя дотягивается до домена. Объявите шлюз в домене, а реализацию дайте прикладному слою.'
          ),
        },
        {
          tone: 'note',
          title: L('Inversion is about direction, not about classes', 'Инверсия — про направление, а не про классы'),
          text: L(
            'You do not need an interface for every collaborator. You need one where the dependency would otherwise point at something volatile: a network, a database, a clock, a file system.',
            'Интерфейс нужен не каждому коллаборатору. Он нужен там, где зависимость иначе указывала бы на что-то нестабильное: сеть, базу данных, часы, файловую систему.'
          ),
        },
      ],
      takeaway: L(
        'Declare the abstraction where the need is, and wire the concrete implementations in one composition root.',
        'Объявляйте абстракцию там, где возникает потребность, а конкретные реализации связывайте в одном корне композиции.'
      ),
      seeAlso: [
        L('Section 4-4: interface segregation', 'Секция 4-4: разделение интерфейсов'),
        L('Section 2-2: modules as encapsulation', 'Секция 2-2: модули как инкапсуляция'),
        L('Chapter 2 (architecture): clean architecture and ports and adapters', 'Глава 2 (architecture): чистая архитектура и порты с адаптерами'),
      ],
    },
    {
      id: 'oop-ch4-s6',
      title: L('SOLID in a React codebase', 'SOLID в кодовой базе на React'),
      body: L(
        'React removes the language of inheritance, so the five principles show up in a different vocabulary. There are no subclasses, so template methods become hooks that call other hooks, interfaces become prop types, and the package boundary becomes the feature folder. The principles still apply, because the question behind them is unchanged: how many unrelated things have to change together when one thing changes?\n\nSingle responsibility in React means the data fetching, the formatting and the navigation live in different units. A component that fetches the orders, formats them and pushes the user to a detail page has three reasons to change, and a test of the formatting drags in a fetch mock. Splitting into a hook that loads the data, a presentational component and a route wrapper fixes that.\n\nLiskov substitution in React is about prop shapes. A component that requires a prop the base never had, or that throws when the prop is missing, breaks every caller that used the base. The fix is the discriminated union: a status prop of kind loading, error or ready, so the compiler forces every branch to handle every case, and a caller cannot pass a half-valid combination.\n\nDependency inversion means a component does not import the API client but takes one from a hook or a context. Interface segregation is narrow props, one component one purpose. Open-closed is a registry of renderers keyed by kind instead of a switch inside a component. The trap is turning SOLID into folder gymnastics: splitting a component into five files because a principle said so spreads the invariants across files with no owner.',
        'React убирает язык наследования, поэтому пять принципов проявляются в другом словаре. Наследников нет, значит шаблонный метод становится хуком, вызывающим другие хуки, интерфейс — типом пропсов, а граница пакета — папкой фичи. Принципы при этом никуда не делись, потому что вопрос за ними прежний: сколько несвязанных вещей должно меняться вместе, когда меняется одна?\n\nЕдиная ответственность в React означает, что загрузка данных, форматирование и навигация живут в разных единицах. Компонент, который грузит заказы, форматирует их и уводит пользователя на страницу деталей, имеет три причины для изменения, и тест форматирования тащит за собой мок загрузки. Разделение на хук с загрузкой, презентационный компонент и обёртку маршрута это чинит.\n\nПодстановка Лисков в React — это про формы пропсов. Компонент, который требует пропса, которого у базового никогда не было, или бросает исключение, когда пропса нет, ломает каждого вызывающего, который использовал базовый. Лечится это дискриминируемым объединением: пропс статуса вида loading, error или ready, так что компилятор заставляет обработать каждую ветку, а вызывающий не может передать наполовину валидную комбинацию.\n\nИнверсия зависимостей означает, что компонент не импортирует API-клиент, а получает его из хука или контекста. Разделение интерфейсов — узкие пропсы, одна цель на компонент. Открытость и закрытость — реестр рендереров по виду карточки вместо switch внутри компонента. Ловушка — превратить SOLID в файловую гимнастику: разбить компонент на пять файлов потому, что так велит принцип, значит размазать инварианты по файлам без владельца.'
      ),
      bullets: [
        L('React has no inheritance, so the principles become hooks, props and feature folders.', 'В React нет наследования, поэтому принципы превращаются в хуки, пропсы и папки фич.'),
        L('SRP: fetching, formatting and navigation belong to different units.', 'SRP: загрузка, форматирование и навигация живут в разных единицах.'),
        L('LSP: model states as a discriminated union so every branch is handled.', 'LSP: моделируйте состояния дискриминируемым объединением, чтобы обрабатывались все ветки.'),
        L('ISP: narrow props per component instead of one wide interface.', 'ISP: узкие пропсы на компонент вместо одного широкого интерфейса.'),
        L('DIP: obtain the API client from a hook or context, not from a direct import.', 'DIP: получайте API-клиент из хука или контекста, а не прямым импортом.'),
      ],
      code: `import { useEffect, useState } from 'react';

type OrdersState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; orders: string[] };

export function useOrders(client: { listOrders(): Promise<string[]> }): OrdersState {
  const [state, setState] = useState<OrdersState>({ kind: 'loading' });

  useEffect(() => {
    client
      .listOrders()
      .then((orders) => setState({ kind: 'ready', orders }))
      .catch((error: unknown) => setState({ kind: 'error', message: String(error) }));
  }, [client]);

  return state;
}`,
      table: {
        caption: L('The five principles in React terms', 'Пять принципов на языке React'),
        headers: [L('Principle', 'Принцип'), L('Classic form', 'Классическая форма'), L('React form', 'Форма в React')],
        rows: [
          [L('SRP', 'SRP'), L('One class per responsibility', 'Один класс на ответственность'), L('A hook, a component and a route wrapper', 'Хук, компонент и обёртка маршрута')],
          [L('OCP', 'OCP'), L('Strategy and subclass extension', 'Стратегия и наследование'), L('A registry keyed by kind', 'Реестр по виду сущности')],
          [L('LSP', 'LSP'), L('Subclasses with the same contract', 'Наследники с одинаковым контрактом'), L('A discriminated union of props', 'Дискриминируемое объединение пропсов')],
          [L('ISP', 'ISP'), L('Narrow interfaces per client', 'Узкие интерфейсы на клиента'), L('Narrow props per component', 'Узкие пропсы на компонент')],
          [L('DIP', 'DIP'), L('Interfaces owned by the consumer', 'Интерфейсы принадлежат потребителю'), L('A client from context or a hook', 'Клиент из контекста или хука')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('SOLID is not a folder layout', 'SOLID — это не раскладка папок'),
          text: L(
            'Splitting a component into five files because a principle said so produces a codebase nobody can navigate and moves the invariants away from the code that enforces them. Apply the principles to the axes on which the code really changes.',
            'Разбить компонент на пять файлов потому, что так велит принцип, значит получить кодовую базу, в которой никто не разберётся, и отнести инварианты от кода, который их обеспечивает. Применяйте принципы к тем осям, по которым код действительно меняется.'
          ),
        },
        {
          tone: 'tip',
          title: L('Measure the blast radius', 'Измеряйте радиус поражения'),
          text: L(
            'The practical test for all five principles is the same: when one feature changes, how many unrelated files and tests move? A high number points at the responsibility that was never separated.',
            'Практическая проверка для всех пяти принципов одна: когда меняется одна фича, сколько двигается несвязанных файлов и тестов? Много — значит есть ответственность, которую так и не выделили.'
          ),
        },
      ],
      takeaway: L(
        'In React the principles become hooks, props and folders, and the measure is still the blast radius of a change.',
        'В React принципы превращаются в хуки, пропсы и папки, а мера остаётся прежней — радиус поражения при изменении.'
      ),
      seeAlso: [
        L('Section 4-1: single responsibility', 'Секция 4-1: принцип единой ответственности'),
        L('Section 2-5: when a class is the wrong tool', 'Секция 2-5: когда класс — не тот инструмент'),
        L('Chapter 6 (architecture): frontend architecture in depth', 'Глава 6 (architecture): фронтенд-архитектура подробно'),
      ],
    },
  ],
};
