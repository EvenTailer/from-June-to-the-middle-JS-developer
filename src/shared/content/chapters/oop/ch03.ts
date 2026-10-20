import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh03: Chapter = {
  id: 'oop-ch3',
  title: L('Inheritance and polymorphism', 'Наследование и полиморфизм'),
  summary: L(
    'Why inheritance breaks, how polymorphism through interfaces works, and how composition and mixins give the same reuse without the coupling.',
    'Почему ломается наследование, как работает полиморфизм через интерфейсы и как композиция и смешивание дают то же переиспользование без связанности.'
  ),
  sections: [
    {
      id: 'oop-ch3-s1',
      title: L('Inheritance and the fragile base class', 'Наследование и уязвимый базовый класс'),
      body: L(
        'Inheritance couples a subclass to the implementation of its base, not only to its contract. The fragile base class problem appears when a change in the base breaks subclasses that were written against an implementation detail: a protected field, the order in which the constructor runs, the fact that a method calls another method and that method was overridden.\n\nThe typical accident looks like this. A base class calls validate() from save(), a subclass overrides validate() to add one extra rule, and now the base behaviour depends on a method the subclass owns. Rename the base method or change its contract and every subclass changes behaviour, often in a way nobody notices until production. The base has acquired a hidden, undocumented dependency on its subclasses.\n\nTypeScript makes this visible only partly. The protected modifier is erased at compile time and is a convention among colleagues, not a barrier: at run time the method is public and anybody can call it. An abstract method states the contract and nothing more, and a readonly field in a base class is only readonly for the code that respects the type.\n\nThe rule that keeps inheritance manageable: a subclass may rely only on what the base documents, and the base may only call the methods it declares as its own extension points. Everything else is a coupling that will cost you when the base evolves.',
        'Наследование связывает подкласс с реализацией базы, а не только с её контрактом. Проблема уязвимого базового класса возникает, когда изменение базы ломает наследников, написанных против детали реализации: protected-поле, порядок выполнения конструктора, факт, что метод вызывает другой метод, а тот переопределён.\n\nТипичная ошибка выглядит так. Базовый класс вызывает validate() из save(), наследник переопределяет validate(), добавляя одно правило, и теперь поведение базы зависит от метода, которым владеет наследник. Переименуйте метод в базе или поменяйте его контракт — и поведение изменится у всех наследников, часто так, что никто не заметит до продакшена. У базы появилась скрытая, недокументированная зависимость от наследников.\n\nTypeScript показывает это лишь частично. Модификатор protected стирается при компиляции и остаётся соглашением между коллегами, а не барьером: в рантайме метод публичный, и вызвать его может кто угодно. Абстрактный метод задаёт только контракт, и ничего больше; readonly-поле в базовом классе остаётся readonly лишь для кода, который соблюдает тип.\n\nПравило, которое удерживает наследование в узде: наследник может опираться только на то, что база документирует, а база может вызывать только те методы, которые сама объявила точками расширения. Всё остальное — связанность, которая обойдётся вам в счёт, когда база начнёт меняться.'
      ),
      bullets: [
        L('A subclass depends on the implementation of its base unless the base documents otherwise.', 'Наследник зависит от реализации базы, если база не документирует иначе.'),
        L('The fragile base class problem breaks subclasses when the base changes its internals.', 'Проблема уязвимого базового класса ломает наследников, когда база меняет internals.'),
        L('A base method that calls an overridable method creates a hidden dependency on subclasses.', 'Метод базы, вызывающий переопределяемый метод, создаёт скрытую зависимость от наследников.'),
        L('protected is erased at compile time and is a convention, not a barrier.', 'protected стирается при компиляции: это соглашение, а не барьер.'),
        L('A base class may only call the methods it declares as extension points.', 'Базовый класс может вызывать только те методы, которые сам объявил точками расширения.'),
      ],
      code: `interface Row {
  title: string;
}

class Report {
  format(row: Row): string {
    return \`\${this.prefix()}: \${row.title}\`; // depends on an overridable method
  }

  protected prefix(): string {
    return 'row';
  }
}

class LoudReport extends Report {
  protected override prefix(): string {
    return 'ROW';
  }
}

console.log(new LoudReport().format({ title: 'Q1' })); // 'ROW: Q1'`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The base that calls back into the subclass', 'База, которая вызывает подкласс'),
          text: L(
            'When a base method calls a method the subclass may override, the base contract silently includes the subclass behaviour. Renaming that method in the base is then a breaking change for every descendant, and the type checker will not say a word.',
            'Когда метод базы вызывает метод, который наследник может переопределить, контракт базы молча включает поведение наследника. Переименование такого метода в базе становится ломающим изменением для всех потомков, и проверка типов не скажет ни слова.'
          ),
        },
        {
          tone: 'warning',
          title: L('protected is erased at run time', 'protected стирается в рантайме'),
          text: L(
            'At run time a protected method is an ordinary public property. Anything that receives the object can call it, which is why a protected hook that assumes a valid state can be called from the outside with a broken one.',
            'В рантайме protected-метод — обычное публичное свойство. Всё, что получило объект, может его вызвать, поэтому защищённый хук, рассчитывающий на корректное состояние, может быть вызван снаружи с испорченным.'
          ),
        },
      ],
      takeaway: L(
        'A subclass may rely only on what the base documents, and a base may only call what it declares as extension points.',
        'Наследник может опираться только на документированное поведение базы, а база может вызывать только объявленные ею точки расширения.'
      ),
      seeAlso: [
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 3-3: template method and the protected hook', 'Секция 3-3: шаблонный метод и защищённый хук'),
        L('Section 4-3: Liskov substitution', 'Секция 4-3: принцип подстановки Лисков'),
      ],
    },
    {
      id: 'oop-ch3-s2',
      title: L('Polymorphism through interfaces', 'Полиморфизм через интерфейсы'),
      body: L(
        'Polymorphism means the call site depends on a contract and not on a concrete class. One function, one variable, many implementations, and the choice is made by the value at run time. In TypeScript this is structural typing: an interface describes a shape, and any class or object literal with that shape satisfies it without declaring that it does. The implements keyword documents the intention and is checked by the compiler, but it adds nothing at run time.\n\nThe practical consequence is that the type of the variable decides the flexibility. If a parameter is typed as a concrete class, the caller must construct that class and every test needs it. If it is typed as an interface, the caller passes anything that fits, including a small fake. This is the difference between code that is hard to test and code that is trivial to test, and the change is one word in the signature.\n\nWhere a fixed set of implementations is known, a union type is often better than a base class. A union of three variants with a discriminant property lets the compiler check that every case is handled, while a base class forces the three to share a hierarchy whether they want to or not. That is polymorphism without inheritance at all.\n\nThe trap is typing a variable with the concrete class when the code only needs the interface. It is a small mistake with a large cost: the dependency is now on the whole class, including the parts the caller never uses, and the interface that was supposed to protect the caller disappears.',
        'Полиморфизм означает, что место вызова зависит от контракта, а не от конкретного класса. Одна функция, одна переменная, много реализаций, а выбор делает значение во время выполнения. В TypeScript это структурная типизация: интерфейс описывает форму, и ему удовлетворяет любой класс или литерал объекта с такой формой, не объявляя этого. Ключевое слово implements документирует намерение и проверяется компилятором, но в рантайме не добавляет ничего.\n\nПрактическое следствие: гибкость определяется типом переменной. Если параметр типизирован конкретным классом, вызывающий обязан создать этот класс, и каждому тесту он нужен. Если параметр типизирован интерфейсом, вызывающий передаёт что угодно подходящее, включая маленький фейк. Это разница между кодом, который трудно тестировать, и кодом, который тривиально тестируется, и она укладывается в одно слово в сигнатуре.\n\nКогда набор реализаций известен заранее, объединение типов часто лучше базового класса. Объединение из трёх вариантов со свойством-дискриминантом позволяет компилятору проверить, что обработан каждый случай, тогда как базовый класс заставляет троих делить иерархию независимо от их желаний. Это полиморфизм вообще без наследования.\n\nЛовушка — типизировать переменную конкретным классом, когда коду нужен только интерфейс. Ошибка маленькая, а цена большая: зависимость теперь на весь класс, включая то, чем вызывающий никогда не пользуется, а интерфейс, который должен был защитить вызывающего, исчезает.'
      ),
      bullets: [
        L('Polymorphism means the call site depends on a contract, not on a concrete class.', 'Полиморфизм — это зависимость места вызова от контракта, а не от конкретного класса.'),
        L('TypeScript interfaces are structural, a matching shape satisfies them.', 'Интерфейсы в TypeScript структурные: им удовлетворяет любая совпадающая по форме реализация.'),
        L('implements is checked at compile time and adds no run time check.', 'implements проверяется на этапе компиляции и не добавляет проверок в рантайме.'),
        L('Type a parameter with the interface so a fake can replace the real class.', 'Типизируйте параметр интерфейсом, чтобы подменять реализацию фейком.'),
        L('A union of variants with a discriminant beats a base class for a fixed set.', 'Объединение вариантов с дискриминантом лучше базового класса для фиксированного набора.'),
      ],
      code: `interface Renderer {
  render(data: unknown): string;
}

class JsonRenderer implements Renderer {
  render(data: unknown): string {
    return JSON.stringify(data);
  }
}

class HtmlRenderer implements Renderer {
  render(data: unknown): string {
    return '<pre>' + JSON.stringify(data) + '</pre>';
  }
}

const renderers: Renderer[] = [new JsonRenderer(), new HtmlRenderer()];
for (const renderer of renderers) {
  console.log(renderer.render({ ok: true }));
}`,
      table: {
        caption: L('Concrete class or interface', 'Конкретный класс или интерфейс'),
        headers: [L('Aspect', 'Аспект'), L('Concrete class', 'Конкретный класс'), L('Interface', 'Интерфейс')],
        rows: [
          [L('What the caller must build', 'Что обязан построить вызывающий'), L('The exact class', 'Именно этот класс'), L('Anything with the right shape', 'Что угодно с нужной формой')],
          [L('Test doubles', 'Тестовые подмены'), L('Subclass or a mock library', 'Наследник или мок-библиотека'), L('A small object literal', 'Маленький литерал объекта')],
          [L('Coupling', 'Связанность'), L('To the whole class', 'Со всем классом'), L('To the contract only', 'Только с контрактом')],
          [L('When the set is fixed', 'Когда набор фиксирован'), L('A base class forces a hierarchy', 'Базовый класс навязывает иерархию'), L('A union type checks every case', 'Объединение проверяет каждый случай')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('implements is a promise, not a check', 'implements — обещание, а не проверка'),
          text: L(
            'Nothing verifies at run time that a class still satisfies the interface. If a method is renamed in the interface, the compiler reports it, but a consumer that received the object from an API or a plugin sees the failure in production.',
            'Ничто не проверяет во время выполнения, что класс всё ещё удовлетворяет интерфейсу. Если метод переименовать в интерфейсе, компилятор сообщит, но потребитель, получивший объект из API или плагина, увидит ошибку в проде.'
          ),
        },
        {
          tone: 'tip',
          title: L('Type the boundary, not the internals', 'Типизируйте границу, а не внутренности'),
          text: L(
            'Use the concrete type inside the class that owns it and the interface everywhere else. That keeps the flexibility where it pays and keeps the code honest where the details matter.',
            'Конкретный тип — внутри класса, который им владеет, а интерфейс — везде ещё. Так гибкость остаётся там, где она окупается, а код честен там, где важны детали.'
          ),
        },
      ],
      takeaway: L(
        'Depend on the interface at every boundary, and let the runtime value choose the implementation.',
        'Зависите от интерфейса на каждой границе, а реализацию пусть выбирает значение во время выполнения.'
      ),
      seeAlso: [
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 4-5: dependency inversion', 'Секция 4-5: инверсия зависимостей'),
        L('Chapter 3 (typescript): interfaces, type aliases and generics', 'Глава 3 (typescript): интерфейсы, type-алиасы и дженерики'),
      ],
    },
    {
      id: 'oop-ch3-s3',
      title: L('Template method and the protected hook', 'Шаблонный метод и защищённый хук'),
      body: L(
        'The template method is the classic shape of inheritance: the base class fixes the sequence of steps, and the subclass fills in the steps it cares about. The base exposes one protected hook per step, the subclass overrides the hook, and the run method in the base calls the hooks in order. The benefit is that the order is written once and cannot drift; the cost is that the control flow still lives in the hierarchy.\n\nIt works when the algorithm is fixed and only the details vary: a report that loads, transforms and renders, an import that reads, validates and stores. It breaks when the order itself varies, when a subclass needs to skip a step, or when the number of steps grows with every new requirement. Then the base class becomes a switch with hooks, and the subclass becomes a configuration file expressed as a class hierarchy.\n\nTwo rules keep the pattern healthy. A hook must be small and must not call other hooks, because the real order then hides in the subclass. And every hook is an extension point: adding one is a promise to keep it stable, so add hooks only for behaviour that really varies.\n\nIf the steps differ per case rather than per subclass, the honest version of the pattern is composition: a list of step objects, each with a run method, executed in order. The same skeleton, but the flow lives in the data and the tests can replace one step without touching the others.',
        'Шаблонный метод — классическая форма наследования: базовый класс фиксирует последовательность шагов, а наследник заполняет те шаги, которые его касаются. База предоставляет по одному защищённому хуку на шаг, наследник переопределяет хук, а метод run в базе вызывает хуки по порядку. Выгода в том, что порядок написан один раз и не может разъехаться; цена в том, что поток управления по-прежнему живёт в иерархии.\n\nПаттерн работает, когда алгоритм фиксирован, а меняются только детали: отчёт, который загружает, преобразует и рендерит, импорт, который читает, проверяет и сохраняет. Он ломается, когда меняется сам порядок, когда наследнику нужно пропустить шаг или когда число шагов растёт с каждым новым требованием. Тогда базовый класс превращается в switch с хуками, а наследник — в конфигурацию, выраженную иерархией классов.\n\nДва правила сохраняют паттерн в рабочем состоянии. Хук должен быть маленьким и не должен вызывать другие хуки, иначе реальный порядок прячется в наследнике. И каждый хук — точка расширения: его добавление является обещанием стабильности, поэтому добавляйте хуки только для по-настоящему меняющегося поведения.\n\nЕсли шаги отличаются от случая к случаю, а не от наследника к наследнику, честная версия паттерна — композиция: список объектов-шагов, у каждого свой метод run, выполняются по порядку. Тот же скелет, но поток живёт в данных, и тесты могут заменить один шаг, не трогая остальные.'
      ),
      bullets: [
        L('The template method fixes the sequence, the subclass only supplies the steps.', 'Шаблонный метод задаёт последовательность, а наследник только поставляет шаги.'),
        L('A hook that calls other hooks hides the real order of execution.', 'Хук, вызывающий другие хуки, прячет реальный порядок выполнения.'),
        L('Every hook is an extension point and therefore a promise.', 'Каждый хук — точка расширения, а значит обещание.'),
        L('The pattern suits a fixed algorithm with variable details.', 'Паттерн подходит для фиксированного алгоритма с меняющимися деталями.'),
        L('When the order varies per case, use a list of steps instead of a hierarchy.', 'Когда порядок зависит от случая, используйте список шагов вместо иерархии.'),
      ],
      code: `abstract class Job {
  run(): string {
    return \`[\${this.name()}] \${this.process()}\`;
  }

  protected abstract name(): string;
  protected abstract process(): string;
}

class ImportJob extends Job {
  protected name(): string {
    return 'import';
  }

  protected process(): string {
    return 'loaded 12 rows';
  }
}

console.log(new ImportJob().run()); // '[import] loaded 12 rows'`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The hook that grows hooks', 'Хук, который обрастает хуками'),
          text: L(
            'When a hook starts calling other hooks, the execution order is no longer readable in the base class. A subclass can then change the order without touching the base, which is exactly the fragile coupling the pattern was supposed to avoid.',
            'Когда хук начинает вызывать другие хуки, порядок выполнения перестаёт читаться в базовом классе. Наследник может изменить порядок, не трогая базу, — это ровно та хрупкая связанность, которую паттерн должен был убрать.'
          ),
        },
        {
          tone: 'note',
          title: L('Inheritance is still inheritance', 'Наследование всё ещё наследование'),
          text: L(
            'The template method is often introduced as the safe alternative to a switch, but it keeps the control flow in the hierarchy. If the steps are truly independent, a list of step objects is both shorter and easier to test.',
            'Шаблонный метод часто подают как безопасную альтернативу switch, но поток управления остаётся в иерархии. Если шаги действительно независимы, список объектов-шагов и короче, и легче тестируется.'
          ),
        },
      ],
      takeaway: L(
        'Use the template method when the sequence is fixed, and switch to a list of steps when the order varies.',
        'Используйте шаблонный метод, когда последовательность фиксирована, и переходите к списку шагов, когда порядок меняется.'
      ),
      seeAlso: [
        L('Section 3-1: inheritance and the fragile base class', 'Секция 3-1: наследование и уязвимый базовый класс'),
        L('Section 3-5: mixins and trait-like composition', 'Секция 3-5: смешивание и композиция в духе трейтов'),
        L('Section 4-2: open-closed', 'Секция 4-2: принцип открытости и закрытости'),
      ],
    },
    {
      id: 'oop-ch3-s4',
      title: L('Composition over inheritance', 'Композиция вместо наследования'),
      body: L(
        'Composition replaces the is-a relation with a has-a relation. The class holds a collaborator and delegates to it, so behaviour that used to require a subclass now requires an object you pass in. The difference shows up in the number of classes: inheritance multiplies classes when behaviours combine, composition multiplies objects. Two channels plus two notification policies is four subclasses under inheritance and two objects under composition.\n\nThe second benefit is that a composed collaborator can be replaced without touching the consumer. If the class depends on an interface, a test passes a recording fake instead of a real service, and the change from a database to an HTTP API does not ripple through the domain. Inheritance cannot offer that: a subclass inherits the whole implementation, including the parts it does not want.\n\nThe cost is real as well. Composition adds objects, adds delegation code and splits state that inheritance would have kept in one place. Two objects that must stay in sync need an explicit rule about who owns the change, and that rule has to be written down, which is exactly what a shared base class used to hide.\n\nThe heuristic: use inheritance when the subclass really is a special case of the base and only refines behaviour the base already defines. Use composition when the relationship is only that one object needs the other, or when the set of variations is likely to grow along two axes at once.',
        'Композиция заменяет отношение «является» отношением «содержит». Класс хранит коллаборатора и делегирует ему, поэтому поведение, которому раньше требовался наследник, теперь требует переданного объекта. Разница видна в количестве классов: наследование умножает классы, когда поведения комбинируются, композиция умножает объекты. Два канала и две политики уведомлений — это четыре наследника при наследовании и два объекта при композиции.\n\nВторая выгода: соединённого коллаборатора можно заменить, не трогая потребителя. Если класс зависит от интерфейса, тест передаёт записывающий фейк вместо настоящего сервиса, а переход с базы данных на HTTP API не расходится по домену. Наследование такого не даёт: наследник получает всю реализацию целиком, включая то, что ему не нужно.\n\nЦена тоже реальна. Композиция добавляет объекты, добавляет код делегирования и делит состояние, которое наследование держало в одном месте. Двум объектам, которые должны оставаться согласованными, нужно явное правило о том, кто владеет изменением, и это правило приходится записывать — ровно то, что раньше прятал общий базовый класс.\n\nЭвристика: наследование — когда наследник действительно частный случай базы и лишь уточняет уже определённое поведение. Композиция — когда связь состоит лишь в том, что одному объекту нужен другой, или когда набор вариаций, скорее всего, будет расти сразу по двум осям.'
      ),
      bullets: [
        L('Composition turns is-a into has-a and keeps the dependency in the constructor.', 'Композиция превращает «является» в «содержит» и держит зависимость в конструкторе.'),
        L('Inheritance multiplies classes when behaviours combine, composition multiplies objects.', 'Наследование умножает классы при комбинации поведений, композиция — объекты.'),
        L('A composed collaborator can be replaced by a fake without touching the consumer.', 'Соединённого коллаборатора можно заменить фейком, не трогая потребителя.'),
        L('Composition splits state, so the ownership rule must be written down.', 'Композиция делит состояние, поэтому правило владения нужно записать явно.'),
        L('Use inheritance for a genuine special case, composition for everything else.', 'Наследование — для настоящего частного случая, композиция — для остального.'),
      ],
      code: `interface Channel {
  send(to: string, message: string): void;
}

class EmailChannel implements Channel {
  send(to: string, message: string): void {
    console.log('email to ' + to + ': ' + message);
  }
}

class Notifier {
  readonly channel: Channel;
  constructor(channel: Channel) {
    this.channel = channel;
  }
  notify(to: string, message: string): void {
    this.channel.send(to, message);
  }
}

const notifier = new Notifier(new EmailChannel());
notifier.notify('ada@example.com', 'Report ready');`,
      table: {
        caption: L('Inheritance and composition side by side', 'Наследование и композиция рядом'),
        headers: [L('Aspect', 'Аспект'), L('Inheritance', 'Наследование'), L('Composition', 'Композиция')],
        rows: [
          [L('Relation', 'Отношение'), L('is-a, the subclass is a base', 'является, наследник это база'), L('has-a, it holds a collaborator', 'содержит, держит коллаборатора')],
          [L('Number of types for two axes', 'Число типов для двух осей'), L('Four subclasses', 'Четыре наследника'), L('Two objects', 'Два объекта')],
          [L('Replacing the behaviour', 'Замена поведения'), L('A new subclass, the old one stays', 'Новый объект, старый остаётся'), L('A new instance passed in', 'Новый переданный экземпляр')],
          [L('Shared state', 'Общее состояние'), L('Inherited and shared by default', 'Унаследовано и общее по умолчанию'), L('Must be coordinated explicitly', 'Нужно согласовывать явно')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Composition without a rule for shared state', 'Композиция без правила для общего состояния'),
          text: L(
            'Two composed objects that must stay in sync need an explicit owner of the change. A base class used to hide that rule inside a shared implementation; with composition the rule has to be written down, or the objects drift apart silently.',
            'Два соединённых объекта, которые должны оставаться согласованными, требуют явного владельца изменения. Базовый класс раньше прятал это правило внутри общей реализации; при композиции правило надо записать, иначе объекты тихо разойдутся.'
          ),
        },
        {
          tone: 'tip',
          title: L('Delegate, do not wrap blindly', 'Делегируйте, а не оборачивайте вслепую'),
          text: L(
            'A composed object earns its place when it adds a decision: choosing a channel, retrying, logging. If the wrapper only forwards the call, it is one more layer without a reason.',
            'Соединённый объект оправдан, когда добавляет решение: выбор канала, повторы, логирование. Если обёртка только пересылает вызов, это лишний слой без причины.'
          ),
        },
      ],
      takeaway: L(
        'Prefer composition when the relation is only that one object needs the other, and keep the ownership of shared state explicit.',
        'Предпочитайте композицию, когда связь лишь в том, что одному объекту нужен другой, и явно указывайте, кто владеет общим состоянием.'
      ),
      seeAlso: [
        L('Section 3-1: inheritance and the fragile base class', 'Секция 3-1: наследование и уязвимый базовый класс'),
        L('Section 3-5: mixins and trait-like composition', 'Секция 3-5: смешивание и композиция в духе трейтов'),
        L('Section 4-2: open-closed', 'Секция 4-2: принцип открытости и закрытости'),
      ],
    },
    {
      id: 'oop-ch3-s5',
      title: L('Mixins and trait-like composition', 'Смешивание и композиция в духе трейтов'),
      body: L(
        'A mixin is a function that takes a class and returns a class with more behaviour. It is the trait idea expressed in a language without traits: a small, orthogonal piece of behaviour that can be combined with any class and does not need a hierarchy of its own. In TypeScript the mixin has to name the base it extends, and the compiler keeps checking the calls against that base, so the added members appear in the resulting type.\n\nThe benefits are real: behaviour stays close to the data it needs, a class can carry several independent traits, and each trait can be tested on its own. The costs are quieter. Two mixins that define the same method collide, and the last one applied wins, silently. A mixin that depends on a method the target class may not have is a run time error instead of a compile time error.\n\nInstanceof gets confusing too. A class built from a base and two mixins is an instance of the base and of the mixin layers, but a class built from a different base with the same mixin is not an instance of the first mixin result, so cross-checking types with instanceof can surprise you. Check the shape instead.\n\nA mixin earns its place when the behaviour is genuinely optional and small: a timestamp, a serialisation helper, a logging wrapper. It is the wrong tool when the behaviour needs to change the shape of the class, because then the mixin is a base class in disguise and the hierarchy problems return together with the inheritance ones.',
        'Смешивание — это функция, которая берёт класс и возвращает класс с дополнительным поведением. Это идея трейта, выраженная в языке без трейтов: небольшое независимое поведение, которое можно сочетать с любым классом и которому не нужна своя иерархия. В TypeScript смешивание обязано называть базу, которую расширяет, и компилятор продолжает проверять вызовы по этой базе, поэтому добавленные члены видны в результате.\n\nВыгоды реальны: поведение остаётся рядом с данными, которые ему нужны, класс может нести несколько независимых черт, а каждую черту можно тестировать отдельно. Издержки тише. Два смешивания с одинаковым именем метода конфликтуют, и побеждает последнее применённое, молча. Смешивание, которому нужен метод, которого у целевого класса может не оказаться, падает во время выполнения вместо компиляции.\n\nInstanceof тоже путается. Класс, собранный из базы и двух смешиваний, является экземпляром базы и слоёв смешивания, но класс, собранный из другой базы с тем же смешиванием, не является экземпляром первого результата, поэтому проверка через instanceof может удивить. Проверяйте форму, а не происхождение.\n\nСмешивание оправдано, когда поведение действительно необязательное и небольшое: метка времени, помощник сериализации, обёртка логирования. Оно не подходит, когда поведение меняет форму класса: тогда смешивание — это базовый класс под другим именем, и проблемы иерархии возвращаются вместе с проблемами наследования.'
      ),
      bullets: [
        L('A mixin is a function that takes a class and returns a class with extra behaviour.', 'Смешивание — это функция, которая берёт класс и возвращает класс с дополнительным поведением.'),
        L('Name the base signature in the mixin, or the compiler loses the base members.', 'Называйте сигнатуру базы в смешивании, иначе компилятор теряет члены базового класса.'),
        L('Two mixins with the same method name collide and the last one wins.', 'Два смешивания с одинаковым именем метода конфликтуют, и побеждает последнее.'),
        L('A mixin that needs a method the target may not have fails at run time.', 'Смешивание, которому нужен метод, которого может не быть, падает во время выполнения.'),
        L('Mixins suit small optional behaviour, not behaviour that reshapes the class.', 'Смешивание подходит для небольшого необязательного поведения, а не для меняющего форму класса.'),
      ],
      code: `class Entity {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

// The mixin names the base it extends
function Timestamped(base: new (id: string) => Entity) {
  return class extends base {
    readonly createdAt = Date.now();

    stamp(): string {
      return new Date(this.createdAt).toISOString();
    }
  };
}

const TimedEntity = Timestamped(Entity);
const entity = new TimedEntity('e-1');
console.log(entity.id, entity.stamp());`,
      callouts: [
        {
          tone: 'warning',
          title: L('Name collisions are resolved silently', 'Конфликты имён решаются молча'),
          text: L(
            'When two mixins define the same method, the one applied last wins and no compiler error appears. Give every mixin method a distinct name, or keep mixins small enough that their surfaces never overlap.',
            'Когда два смешивания определяют метод с одинаковым именем, побеждает применённое последним, и компилятор не сообщает об ошибке. Давайте методам смешиваний разные имена или держите смешивания настолько маленькими, чтобы их поверхности не пересекались.'
          ),
        },
        {
          tone: 'note',
          title: L('Mixins are a TypeScript pattern', 'Смешивание — это паттерн TypeScript'),
          text: L(
            'There is no mixin keyword in the language: the pattern is a function plus a constructor type. TypeScript cannot infer the instance type of a generic constructor, so a mixin written against a generic base loses the base members in the type system. Fix the base signature or thread the instance type through explicitly.',
            'В языке нет ключевого слова mixin: паттерн — это функция плюс тип конструктора. TypeScript не умеет выводить тип экземпляра у обобщённого конструктора, поэтому смешивание, написанное против обобщённой базы, теряет члены базы в системе типов. Либо зафиксируйте сигнатуру базы, либо проведите тип экземпляра явно.'
          ),
        },
      ],
      takeaway: L(
        'Mixins are for small, optional, orthogonal behaviour, and their names must never collide.',
        'Смешивание — для небольшого, необязательного, независимого поведения, и имена в нём не должны совпадать.'
      ),
      seeAlso: [
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 2-5: when a class is the wrong tool', 'Секция 2-5: когда класс — не тот инструмент'),
        L('Chapter 3 (typescript): generics in interfaces and classes', 'Глава 3 (typescript): дженерики в интерфейсах и классах'),
      ],
    },
  ],
};
