import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopChapters: Chapter[] = [
  {
    id: 'oop-ch1',
    title: L('The object model in JavaScript', 'Объектная модель в JavaScript'),
    summary: L(
      'How property lookup, prototypes and classes actually work under the hood, and how JavaScript enforces privacy.',
      'Как на самом деле работают поиск свойств, прототипы и классы и как JavaScript обеспечивает приватность.'
    ),
    sections: [
      {
        id: 'oop-ch1-s1',
        title: L('Objects, properties and the prototype chain', 'Объекты, свойства и цепочка прототипов'),
        body: L(
          'In JavaScript an object is a bag of key-value pairs plus a hidden link to another object, its prototype. Property lookup walks that link until it finds the key or reaches `null`, and the first match wins. That is the whole inheritance mechanism: `[[Prototype]]` is a pointer and not a copy, so a change made to the prototype is visible through every object that points to it.\n\n`Object.create(proto)` builds an object with a chosen prototype, and `Object.getPrototypeOf(obj)` reads the link. The legacy `__proto__` accessor does the same but is slower and is discouraged. `obj.hasOwnProperty(\'x\')` tells you whether the property belongs to the object itself, while the `in` operator also counts inherited properties. The difference matters when you copy data: `{...obj}` copies own enumerable properties only, so a class instance spreads into a plain object without its behaviour.\n\nProperties are more than values. `Object.getOwnPropertyDescriptor` reveals whether a field is writable, enumerable and configurable, and `Object.defineProperty` can make a field read-only or hide it from enumeration. `Object.freeze` makes an object immutable at runtime. Objects also inherit from `Object.prototype`, which is why `toString` and `hasOwnProperty` work on everything, and why overriding `toString` is a legitimate way to control how an object is printed.',
          'В JavaScript объект — это набор пар «ключ-значение» плюс скрытая ссылка на другой объект, его прототип. Поиск свойства идёт по этой ссылке, пока не найдёт ключ или не дойдёт до `null`, и побеждает первое совпадение. Это и есть весь механизм наследования: `[[Prototype]]` — указатель, а не копия, поэтому изменение прототипа видно через каждый объект, который на него ссылается.\n\n`Object.create(proto)` создаёт объект с выбранным прототипом, а `Object.getPrototypeOf(obj)` читает ссылку. Устаревший аксессор `__proto__` делает то же самое, но медленнее, и его не советуют. `obj.hasOwnProperty(\'x\')` отвечает, принадлежит ли свойство самому объекту, а оператор `in` учитывает и унаследованные. Разница важна при копировании данных: `{...obj}` копирует только собственные перечислимые свойства, поэтому экземпляр класса распадается на обычный объект без поведения.\n\nСвойства — это больше, чем значения. `Object.getOwnPropertyDescriptor` показывает, записываемо ли поле, перечислимо и настраиваемо, а `Object.defineProperty` может сделать поле доступным только для чтения или скрыть его от перечисления. `Object.freeze` делает объект неизменяемым во время выполнения. Объекты наследуются и от `Object.prototype`, поэтому у всего работают `toString` и `hasOwnProperty` — и потому переопределение `toString` законный способ управлять выводом объекта.'
        ),
        bullets: [
          L('`[[Prototype]]` is a pointer, so prototype changes are seen through every child.', '`[[Prototype]]` — указатель, поэтому изменения прототипа видны через всех потомков.'),
          L('`hasOwnProperty` against `in`: own properties only against inherited too.', '`hasOwnProperty` против `in`: только свои свойства против унаследованных тоже.'),
          L('`{...obj}` copies own enumerable properties and drops the behaviour.', '`{...obj}` копирует свои перечислимые свойства и теряет поведение.'),
          L('`Object.freeze` makes an object immutable at runtime.', '`Object.freeze` делает объект неизменяемым во время выполнения.'),
        ],
        code: `const proto = { greet() { return 'hi'; } };
const child = Object.create(proto);
child.greet();                          // 'hi', found through the prototype
Object.getPrototypeOf(child) === proto; // true
child.hasOwnProperty('greet');          // false
'in' in child;                          // true
const { ...plain } = child;             // own properties only`,
        takeaway: L(
          'Property lookup follows the prototype chain, so own and inherited are different things.',
          'Поиск свойства идёт по цепочке прототипов, поэтому свои и унаследованные — разные вещи.'
        ),
      },
      {
        id: 'oop-ch1-s2',
        title: L('Classes are syntax over prototypes', 'Классы — это синтаксис над прототипами'),
        body: L(
          'A `class` declaration does not create a new object model: it is syntax over the same prototype mechanism, with strict mode and a few conveniences. The methods live on the prototype and are shared by all instances, while the fields declared in the class body are created per instance in the constructor. Two instances therefore hold different state but share behaviour, and the class itself is just a function with a prototype object attached.\n\n`extends` makes the prototype chain explicit: `class Dog extends Animal` sets the prototype of `Dog.prototype` to `Animal.prototype`. The `super` keyword calls the parent constructor or method, and in a derived constructor it has to be called before `this` is touched, otherwise JavaScript throws a ReferenceError, because the object of the subclass does not exist until the base constructor has run.\n\nStatic members belong to the class rather than to the instances: `static create()` is the natural home for a factory, and a `static` block can compute a field once when the class is defined. Private methods with `#` work like private fields and are the right place for helpers that must not become part of the public API. Class fields are installed before the constructor body runs, which is why a subclass field initializer can overwrite a value that the base constructor set.',
          'Объявление `class` не создаёт новую объектную модель: это синтаксис над тем же прототипным механизмом со строгим режимом и несколькими удобствами. Методы живут на прототипе и общие для всех экземпляров, а поля, объявленные в теле класса, создаются для каждого экземпляра в конструкторе. Два экземпляра хранят разное состояние, но делят поведение, а сам класс — это функция с привязанным прототипом.\n\n`extends` делает цепочку прототипов явной: `class Dog extends Animal` устанавливает прототип `Dog.prototype` равным `Animal.prototype`. Ключевое слово `super` вызывает родительский конструктор или метод, а в конструкторе наследника его нужно вызвать до обращения к `this`, иначе JavaScript бросит ReferenceError: объект подкласса не существует, пока не отработал базовый конструктор.\n\nСтатические члены принадлежат классу, а не экземплярам: `static create()` — естественное место для фабрики, а статический блок позволяет вычислить поле один раз при определении класса. Приватные методы с `#` работают как приватные поля и подходят для помощников, которые не должны попасть в публичный API. Поля класса создаются до выполнения тела конструктора, поэтому инициализатор поля подкласса может перезаписать значение, заданное базовым конструктором.'
        ),
        bullets: [
          L('Methods live on the prototype, fields are created per instance.', 'Методы живут на прототипе, поля создаются для каждого экземпляра.'),
          L('`super()` must run before `this` is used in a derived constructor.', 'В конструкторе наследника `super()` должен выполниться до обращения к `this`.'),
          L('`static` members live on the class, a `static` block runs at definition time.', 'Статические члены живут на классе, статический блок выполняется при определении.'),
          L('`#` marks private methods as well as private fields.', '`#` помечает приватными и методы, и поля.'),
        ],
        code: `class Animal {
  #born = Date.now();
  static create(name) { return new this(name); }
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
}
class Dog extends Animal {
  constructor(name) { super(name); }
  speak() { return super.speak() + ' (woof)'; }
}
const d = Dog.create('Rex');`,
        takeaway: L(
          'Classes are syntax: the prototype chain still does all the work.',
          'Классы — это синтаксис: всю работу по-прежнему делает цепочка прототипов.'
        ),
      },
      {
        id: 'oop-ch1-s3',
        title: L('Encapsulation in practice: private fields, getters and closures', 'Инкапсуляция на практике: приватные поля, геттеры и замыкания'),
        body: L(
          'The `private` keyword of TypeScript is a compile-time rule: the property is still an ordinary property that any JavaScript can read from the console. The `#` prefix creates a real private field, enforced by the engine, and touching it from outside throws a TypeError. The difference decides whether your invariant survives contact with code you did not write, so the rule of thumb is simple: use `#` for everything that must not change from the outside.\n\nA getter and a setter let you keep a field private while exposing a controlled view. A getter without a setter gives a read-only property: the value can be inspected anywhere, but changed only through a method of the class that validates it. A setter that normalises the input, `set name(value) { this.#name = value.trim(); }`, keeps one rule in one place.\n\nThere is a third option that fits JavaScript better than classes do: the closure. A factory function can keep a variable in a scope that no caller can reach at all, and expose only the functions that need it. This is the classic way to create truly private state, and it also explains why `Object.freeze` and `readonly` in TypeScript remain conventions when the value is an object: freezing stops the property from being replaced, but a nested object is still mutable.',
          'Ключевое слово `private` в TypeScript — это правило этапа компиляции: свойство остаётся обычным, и любой JavaScript прочитает его из консоли. Префикс `#` создаёт настоящее приватное поле, которое обеспечивает сам движок, и обращение к нему снаружи приводит к TypeError. Разница решает, выживет ли ваш инвариант при встрече с чужим кодом, поэтому правило простое: `#` для всего, что не должно меняться снаружи.\n\nГеттер и сеттер позволяют оставить поле приватным, но открыть контролируемый вид. Геттер без сеттера даёт свойство только для чтения: значение видно откуда угодно, а изменить его можно лишь методом класса, который его проверит. Сеттер, нормализующий вход, `set name(value) { this.#name = value.trim(); }`, держит правило в одном месте.\n\nЕсть третий вариант, который подходит JavaScript лучше классов: замыкание. Фабричная функция может держать переменную в области видимости, куда не дотянуться ни один вызывающий, и отдать наружу только нужные функции. Это классический способ получить по-настоящему приватное состояние, и он же объясняет, почему `Object.freeze` и `readonly` в TypeScript остаются соглашениями, когда значение — объект: заморозка мешает заменить свойство, но вложенный объект всё ещё изменяем.'
        ),
        bullets: [
          L('`private` is compile-time only, `#` is enforced by the engine.', '`private` действует только на этапе компиляции, `#` обеспечивает движок.'),
          L('A getter without a setter exposes a read-only view of the state.', 'Геттер без сеттера даёт представление состояния только для чтения.'),
          L('A factory function with a closure hides the state completely.', 'Фабричная функция с замыканием прячет состояние полностью.'),
          L('`Object.freeze` is shallow, nested objects stay mutable.', '`Object.freeze` работает поверхностно: вложенные объекты остаются изменяемыми.'),
        ],
        code: `class Account {
  #balance = 0;
  get balance() { return this.#balance; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError('amount must be positive');
    this.#balance += amount;
    return this;
  }
}
const makeCounter = () => {
  let count = 0;
  return { inc: () => ++count, get: () => count };
};`,
        takeaway: L(
          'Use `#` or a closure for real privacy, `private` only comforts the compiler.',
          'Для настоящей приватности — `#` или замыкание, `private` утешает только компилятор.'
        ),
      },
    ],
  },
  {
    id: 'oop-ch2',
    title: L('Encapsulation, inheritance, polymorphism and SOLID', 'Инкапсуляция, наследование, полиморфизм и SOLID'),
    summary: L(
      'The principles of object-oriented design and how each SOLID rule shows up in real TypeScript code.',
      'Принципы объектно-ориентированного проектирования и как каждое правило SOLID выглядит в реальном TypeScript-коде.'
    ),
    sections: [
      {
        id: 'oop-ch2-s1',
        title: L('Encapsulation: where the rules live', 'Инкапсуляция: где живут правила'),
        body: L(
          'Encapsulation is not about hiding fields, it is about deciding where a rule is enforced. A rule that lives inside the class holds for every caller, present and future; a rule duplicated in three callers holds until the fourth one forgets it. This is the strongest practical argument for objects: they turn a convention into a guarantee.\n\nThe technique is to keep the state private and to mutate it only through methods that check the preconditions. A method that validates its input and returns `this` allows chaining, and a method that rejects an invalid state with an exception makes the failure loud instead of leaving a broken object behind. The constructor deserves the same attention: validating there means an invalid instance never comes into existence.\n\nThe cost is visible: an object with fifty accessors and no logic is a data holder with ceremony around it. The line to hold is between a field that is merely data and a field whose value carries a rule. `email` is data. `balance` is data with a rule, because it may not go below zero, and that rule belongs to the class that owns the number.',
          'Инкапсуляция — не про сокрытие полей, а про решение, где enforced правило. Правило внутри класса действует для всех вызывающих, настоящих и будущих; правило, продублированное в трёх вызывающих, действует до тех пор, пока четвёртый его забудет. Это самый сильный практический аргумент в пользу объектов: они превращают соглашение в гарантию.\n\nПриём простой: состояние приватное, а меняют его только методы, проверяющие предусловия. Метод, который валидирует вход и возвращает `this`, позволяет выстраивать цепочки, а метод, отвергающий недопустимое состояние исключением, делает отказ громким, а не оставляет после себя сломанный объект. Конструктор заслуживает того же внимания: проверка там означает, что недопустимый экземпляр не появится вовсе.\n\nЦена заметна: объект с пятьюдесятью аксессорами и без логики — это контейнер данных с церемонией вокруг. Границу стоит держать между полем, которое просто данные, и полем, значение которого несёт правило. `email` — данные. `balance` — данные с правилом: оно не может уйти в минус, и это правило принадлежит классу, который владеет числом.'
        ),
        bullets: [
          L('A rule inside a class holds for every caller, a rule in a caller does not.', 'Правило внутри класса действует для всех вызывающих, правило у вызывающего — нет.'),
          L('Validate in the constructor so an invalid instance cannot exist.', 'Проверяйте в конструкторе, чтобы недопустимый экземпляр не существовал.'),
          L('Returning `this` from a mutating method enables chaining.', 'Возврат `this` из изменяющего метода позволяет выстраивать цепочки.'),
          L('Not every field needs a rule, and ceremony without logic is a cost.', 'Не каждому полю нужна проверка, а церемония без логики — это расходы.'),
        ],
        code: `class BankAccount {
  #balance = 0;
  constructor(owner: string, openingBalance = 0) {
    if (openingBalance < 0) throw new RangeError('opening balance');
    this.owner = owner;
    this.#balance = openingBalance;
  }
  withdraw(amount: number) {
    if (amount > this.#balance) throw new Error('insufficient funds');
    this.#balance -= amount;
    return this;
  }
}`,
        takeaway: L(
          'Move the rule into the class that owns the data and every caller inherits the guarantee.',
          'Перенесите правило в класс, который владеет данными, и гарантию унаследуют все вызывающие.'
        ),
      },
      {
        id: 'oop-ch2-s2',
        title: L('Inheritance and polymorphism', 'Наследование и полиморфизм'),
        body: L(
          'Inheritance expresses an is-a relation: a Dog is an Animal. The relation is useful, but it is the most expensive kind of coupling in the language, because the subclass is tied to the parent implementation and every change to the parent has to be checked against every child. A hierarchy three levels deep already forces you to read the whole tree to understand one class.\n\nPolymorphism is the cheaper tool. When a function receives an interface and calls a method, it does not know which implementation it got, so a new one can be added without touching the caller. This is the open/closed principle in practice: the code is closed for modification and open for extension. The price is a deliberately designed abstraction: an interface with one method is often better than a class hierarchy with ten.\n\nThe classic violation of substitutability is a square that extends a rectangle and changes the meaning of a setter: a caller that sets the width and then reads the height no longer gets what it expects. Avoid such surprises by keeping hierarchies shallow, by preferring composition when the relation is really has-a, and by checking that every subclass works wherever the parent works. `instanceof` is a weak test with several realms or duplicated packages, so a discriminant property is safer.',
          'Наследование выражает отношение is-a: собака — это животное. Отношение полезно, но это самая дорогая связность в языке: подкласс привязан к реализации родителя, и каждое будущее изменение родителя приходится сверять со всеми детьми. Иерархия глубиной в три уровня уже заставляет прочитать всё дерево, чтобы понять один класс.\n\nПолиморфизм — инструмент дешевле. Когда функция получает интерфейс и вызывает метод, она не знает, какая реализация ей досталась, поэтому новая реализация добавляется без правки вызывающего. Это принцип открыт/закрыт на практике: код закрыт для изменения и открыт для расширения. Цена — абстракцию нужно проектировать осознанно, и интерфейс с одним методом часто лучше иерархии классов из десяти.\n\nКлассическое нарушение подставимости — квадрат, который наследует прямоугольник и меняет смысл сеттера: вызывающий, задавший ширину и прочитавший высоту, больше не получает ожидаемого. Избежать таких сюрпризов помогают неглубокие иерархии, композиция там, где отношение на самом деле has-a, и проверка, что любой подкласс годится на месте родителя. `instanceof` — слабый признак при нескольких realm-ах или дублирующихся пакетах, поэтому надёжнее проверять тип по дискриминантному свойству.'
        ),
        bullets: [
          L('Inheritance is is-a and the most expensive coupling in the language.', 'Наследование — это is-a и самая дорогая связность в языке.'),
          L('Polymorphism lets a new implementation arrive without touching the caller.', 'Полиморфизм позволяет добавить реализацию, не трогая вызывающего.'),
          L('A subclass must be usable wherever the parent is usable.', 'Подкласс должен быть пригоден везде, где пригоден родитель.'),
          L('Deep hierarchies force you to read the whole tree to understand one class.', 'Глубокие иерархии заставляют читать всё дерево ради одного класса.'),
        ],
        code: `interface Shape { area(): number; describe(): string; }
abstract class ShapeBase implements Shape {
  describe() { return \`area \${this.area().toFixed(2)}\`; }
  abstract area(): number;
}
class Circle extends ShapeBase {
  constructor(private r: number) { super(); }
  area() { return Math.PI * this.r ** 2; }
}`,
        takeaway: L(
          'Prefer polymorphism over inheritance and reach for `extends` only for a genuine is-a.',
          'Предпочитайте полиморфизм наследованию и берите `extends` только для настоящего is-a.'
        ),
      },
      {
        id: 'oop-ch2-s3',
        title: L('Abstraction and SOLID in practice', 'Абстракция и SOLID на практике'),
        body: L(
          'Abstraction is the discipline of naming the important thing and hiding the rest. A repository interface says find and save, not SQL; a clock says now, not Date.now. The smaller and more honest the contract, the more freely the implementation can change. When an abstraction leaks, you see it in the imports of a module: it knows about the database, and now it is hard to test.\n\nSOLID is five reminders of that discipline. Single responsibility: a module changes for one reason. Open/closed: extend with new code instead of editing old code. Liskov: a subclass may be used wherever the parent is used. Interface segregation: keep the interfaces small, so the client depends only on what it calls. Dependency inversion: depend on abstractions that you declare yourself, and let the wiring happen at the edge.\n\nSOLID is a set of heuristics and not a law for every case. A one-screen prototype does not need a repository per table, and splitting every class into a strategy, a factory and a decorator can bury a simple feature under five files. The practical test is the cost of a change: if adding a new payment method touches seven files, the abstraction sits in the wrong place.',
          'Абстракция — это дисциплина называть важное и прятать остальное. Интерфейс репозитория говорит «найти и сохранить», а не про SQL; часы говорят «сейчас», а не Date.now. Чем меньше и честнее контракт, тем свободнее меняется реализация. Об утечке абстракции говорит список импортов модуля: он знает про базу — и теперь его трудно тестировать.\n\nSOLID — пять напоминаний этой дисциплины. Единственная ответственность: модуль меняется по одной причине. Открыт/закрыт: расширяйте новым кодом, а не правкой старого. Лисков: подкласс должен работать везде, где работает родитель. Разделение интерфейсов: интерфейсы держим маленькими, чтобы клиент зависел только от используемого. Инверсия зависимостей: зависьте от объявленных вами абстракций, а связывание оставляйте на границе.\n\nSOLID — набор эвристик, а не закон на все случаи. Прототипу на один экран не нужен репозиторий на каждую таблицу, а разбивка каждого класса на стратегию, фабрику и декоратор способна спрятать простую фичу за пятью файлами. Практическая проверка — цена изменения: если добавление нового способа оплаты трогает семь файлов, абстракция стоит не там.'
        ),
        bullets: [
          L('An abstraction is a contract plus the freedom to change the implementation.', 'Абстракция — это контракт плюс свобода менять реализацию.'),
          L('Segregate the interfaces so the client depends only on what it uses.', 'Делите интерфейсы, чтобы клиент зависел только от используемого.'),
          L('SOLID is a heuristic and not a law to apply to every class.', 'SOLID — эвристика, а не закон для каждого класса.'),
          L('A leaky abstraction shows up in the imports of the module.', 'Текучая абстракция видна по импортам модуля.'),
        ],
        code: `interface PaymentGateway {
  charge(amount: Money): Promise<Receipt>;
}
interface Clock { now(): Date; }

class PlaceOrder {
  constructor(
    private readonly orders: OrderRepository,
    private readonly payments: PaymentGateway,
    private readonly clock: Clock,
  ) {}
  async execute(cmd: PlaceOrderCommand): Promise<OrderId> {
    const order = Order.create(cmd.items, this.clock.now());
    await this.payments.charge(order.total());
    await this.orders.save(order);
    return order.id;
  }
}`,
        takeaway: L(
          'Judge an abstraction by the cost of the next change and not by the diagram.',
          'Оценивайте абстракцию по цене следующего изменения, а не по диаграмме.'
        ),
      },
    ],
  },
  {
    id: 'oop-ch3',
    title: L('Design patterns in TypeScript', 'Паттерны проектирования в TypeScript'),
    summary: L(
      'The patterns that pay off in real codebases: strategy, factory, observer, repository, decorator, value object and adapter.',
      'Паттерны, которые окупаются в реальных кодовых базах: стратегия, фабрика, наблюдатель, репозиторий, декоратор, объект-значение и адаптер.'
    ),
    sections: [
      {
        id: 'oop-ch3-s1',
        title: L('Strategy and factory', 'Стратегия и фабрика'),
        body: L(
          'The strategy pattern replaces a branching algorithm with an interchangeable object. Instead of a function that checks the type of a discount and picks a branch, you have a set of discount classes behind one interface, and the client is given the right one. The branch disappears, the test for each case becomes trivial, and adding a new discount means adding one file.\n\nIn JavaScript the strategy is often just a function, because the language has first-class functions. The interface becomes a type alias for a function signature, and the caller receives the function to use. That is the same pattern with less ceremony, and it is worth choosing it unless the strategy needs state or several methods.\n\nA factory hides the construction details behind one name, so the client never assembles a graph of objects itself. There are two flavours worth knowing: a factory function that returns an object literal, and a static method that hides the concrete class and lets the subclass decide. The second form, a factory method, keeps the choice of the implementation inside the class that owns the decision.',
          'Паттерн «стратегия» заменяет ветвящийся алгоритм взаимозаменяемым объектом. Вместо функции, которая проверяет тип скидки и выбирает ветку, есть набор классов скидок за одним интерфейсом, а клиенту передают нужный. Ветка исчезает, тест каждого случая становится тривиальным, а новая скидка — это один новый файл.\n\nВ JavaScript стратегия часто просто функция, потому что язык умеет передавать функции как значения. Интерфейс превращается в тип-алиас сигнатуры функции, а клиент получает функцию для использования. Тот же паттерн с меньшей церемонией, и его стоит выбирать, если стратегии не нужны состояние или несколько методов.\n\nФабрика прячет детали создания за одним именем, и клиент никогда не собирает граф объектов сам. Есть два полезных вида: фабричная функция, возвращающая объектный литерал, и статический метод, скрывающий конкретный класс и дающий подклассу решить. Второй вид — фабричный метод — оставляет выбор реализации внутри класса, которому это решение принадлежит.'
        ),
        bullets: [
          L('Strategy replaces a branch with a swappable implementation.', 'Стратегия заменяет ветвление сменной реализацией.'),
          L('In TypeScript a strategy is often just a function type.', 'В TypeScript стратегия часто просто тип функции.'),
          L('A factory hides the construction details behind one name.', 'Фабрика прячет детали создания за одним именем.'),
          L('A factory method lets the subclass choose the concrete class.', 'Фабричный метод даёт подклассу выбрать конкретный класс.'),
        ],
        code: `type Discount = (total: Money) => Money;

const noDiscount: Discount = (total) => total;
const tenPercent: Discount = (total) => total.multiply(0.9);

class Cart {
  constructor(private discount: Discount = noDiscount) {}
  total() { return this.discount(this.subtotal()); }
  withDiscount(d: Discount) { return new Cart(d); }
}

class OrderFactory {
  static fromDraft(draft: Draft): Order { return Order.create(draft); }
}`,
        takeaway: L(
          'Turn a branch into an object and the code stops growing in the wrong direction.',
          'Превратите ветвление в объект, и код перестанет расти в не ту сторону.'
        ),
      },
      {
        id: 'oop-ch3-s2',
        title: L('Observer and repository', 'Наблюдатель и репозиторий'),
        body: L(
          'The observer pattern defines a one-to-many dependency where the subject notifies its subscribers when something happens. The subject knows only that a list of callbacks exists, so subscribers can be added and removed at runtime, and the code that reacts to the event does not have to be imported by the subject. In JavaScript the pattern is built into the language: `EventTarget`, `addEventListener` and `Promise` are all observers.\n\nThe danger of a loose event bus is that the flow of the program becomes invisible: you publish an event and three modules react, and none of them is mentioned in the call stack. A disciplined implementation keeps the payload of the event small and typed, publishes events only for facts that already happened, and keeps the number of subscribers visible in one place.\n\nThe repository pattern is an abstraction over a collection of aggregates. The client asks for an order by id and gets an order, without knowing whether it came from Postgres, from a REST API or from memory. The important detail is that the repository speaks in domain terms: `findOverdue`, not `selectWhereStatus`. A repository that leaks its query language has moved the complexity into the caller instead of removing it.',
          'Паттерн «наблюдатель» задаёт зависимость один-ко-многим, где субъект уведомляет подписчиков о происшедшем. Субъект знает только, что есть список функций, поэтому подписчиков можно добавлять и убирать во время выполнения, а код, реагирующий на событие, не обязан импортироваться субъектом. В JavaScript паттерн встроен в язык: `EventTarget`, `addEventListener` и `Promise` — всё это наблюдатели.\n\nОпасность свободной шины событий в том, что поток программы становится невидимым: вы публикуете событие, на него реагируют три модуля, и ни один из них не упоминается в стеке вызовов. Дисциплинированная реализация держит полезную нагрузку события небольшой и типизированной, публикует только факты, которые уже случились, и оставляет число подписчиков видимым в одном месте.\n\nПаттерн «репозиторий» — абстракция над коллекцией агрегатов. Клиент просит заказ по идентификатору и получает заказ, не зная, тот пришёл из Postgres, из REST API или из памяти. Важная деталь: репозиторий говорит на языке домена — `findOverdue`, а не `selectWhereStatus`. Репозиторий, который протекает языком запросов, переносит сложность к вызывающему, а не убирает её.'
        ),
        bullets: [
          L('The subject knows only about a list of callbacks.', 'Субъект знает только о списке функций.'),
          L('Publish facts that already happened and not commands to perform.', 'Публикуйте факты, которые уже произошли, а не команды к выполнению.'),
          L('A repository speaks in domain terms and not in query terms.', 'Репозиторий говорит на языке домена, а не языка запросов.'),
          L('`EventTarget` and `Promise` are the observer pattern built into the platform.', '`EventTarget` и `Promise` — встроенный в платформу паттерн наблюдателя.'),
        ],
        code: `type OrderEvent = { type: 'order.placed'; orderId: string };

class EventBus {
  #handlers = new Map<string, Set<(payload: any) => void>>();
  on(type: string, handler: (payload: any) => void): () => void {
    const set = this.#handlers.get(type) ?? new Set();
    set.add(handler);
    this.#handlers.set(type, set);
    return () => set.delete(handler);
  }
  emit(event: OrderEvent) {
    this.#handlers.get(event.type)?.forEach((h) => h(event));
  }
}`,
        takeaway: L(
          'Events remove the import dependency and hide the control flow from you.',
          'События убирают зависимость от импортов и прячут поток управления.'
        ),
      },
      {
        id: 'oop-ch3-s3',
        title: L('Decorator, value object and adapter', 'Декоратор, объект-значение и адаптер'),
        body: L(
          'The decorator pattern wraps an object to add behaviour while keeping its interface. A logging repository takes a repository and returns a repository, and the caller cannot tell the difference. The pattern composes: caching outside logging outside the real repository, each layer doing one thing. It is the object-oriented way to add cross-cutting concerns without touching the class that owns the data.\n\nThe value object is the opposite direction: an immutable object with no identity of its own, compared by its values. `Money(100, \'RUB\')` equals another `Money(100, \'RUB\')`, and a value object can never be mutated into something invalid, because there is no setter. You cannot compare a plain object with `===` and get the right answer, so the equality has to be implemented explicitly, and a value object forces you to implement it.\n\nThe adapter converts one interface into another that the client expects. It is the standard way to put a third-party SDK behind your own domain interface, so the SDK can be replaced or upgraded without touching the domain. The price of an adapter is one more translation layer, and it pays off exactly when the vocabulary of the two sides differs.',
          'Паттерн «декоратор» оборачивает объект, добавляя поведение и сохраняя его интерфейс. Логирующий репозиторий принимает репозиторий и возвращает репозиторий, и вызывающий не видит разницы. Паттерн композиционен: кэш снаружи, логирование внутри, настоящий репозиторий в самом низу, и каждый слой делает ровно одно дело. Это объектно-ориентированный способ добавить сквозные заботы, не трогая класс, который владеет данными.\n\nОбъект-значение — движение в другую сторону: неизменяемый объект без собственной идентичности, сравниваемый по значениям. `Money(100, \'RUB\')` равен другому `Money(100, \'RUB\')`, а объект-значение нельзя изменить в недопустимое состояние, потому что сеттера нет. Обычные объекты не сравнить через `===` и получить верный ответ, поэтому равенство приходится реализовывать явно — и объект-значение заставляет это сделать.\n\nАдаптер преобразует один интерфейс в тот, который ждёт клиент. Это стандартный способ спрятать сторонний SDK за собственным доменным интерфейсом, чтобы библиотеку можно было заменить или обновить, не трогая домен. Цена адаптера — ещё один слой перевода, и он окупается ровно тогда, когда словарь двух сторон различается.'
        ),
        bullets: [
          L('A decorator returns the same interface with extra behaviour.', 'Декоратор возвращает тот же интерфейс с дополнительным поведением.'),
          L('Decorators compose: caching outside logging outside the real thing.', 'Декораторы композиционны: кэш снаружи, логирование внутри, реализация внизу.'),
          L('A value object has no identity and compares by its values.', 'У объекта-значения нет идентичности, он сравнивается по значениям.'),
          L('An adapter is the boundary where a foreign vocabulary is translated.', 'Адаптер — граница, на которой переводится чужой словарь.'),
        ],
        code: `class Money {
  constructor(readonly amount: number, readonly currency: string) {}
  equals(other: Money) {
    return this.amount === other.amount && this.currency === other.currency;
  }
  plus(other: Money) {
    if (this.currency !== other.currency) throw new Error('currency mismatch');
    return new Money(this.amount + other.amount, this.currency);
  }
}

class LoggingRepo implements UserRepository {
  constructor(private inner: UserRepository) {}
  async findById(id: string) {
    console.log('findById', id);
    return this.inner.findById(id);
  }
}`,
        takeaway: L(
          'Decorators add behaviour, value objects protect validity, adapters protect the domain.',
          'Декораторы добавляют поведение, объекты-значения защищают валидность, адаптеры — домен.'
        ),
      },
    ],
  },
  {
    id: 'oop-ch4',
    title: L('Composition, immutability and domain building blocks', 'Композиция, неизменяемость и строительные блоки домена'),
    summary: L(
      'Why composition beats deep inheritance, how immutable state makes code easier to reason about, and how entities, aggregates and domain events look in TypeScript.',
      'Почему композиция лучше глубокого наследования, как неизменяемое состояние упрощает рассуждение о коде и как выглядят в TypeScript сущности, агрегаты и доменные события.'
    ),
    sections: [
      {
        id: 'oop-ch4-s1',
        title: L('Composition over inheritance', 'Композиция вместо наследования'),
        body: L(
          'Composition builds a class from the objects it collaborates with, and inheritance builds it from a parent class. The second is fixed when the classes are written, the first is decided when the objects are created. That difference is what makes composition the better default: a cart can be given a different discount strategy at runtime, and the class hierarchy stays one level deep.\n\nThe practical form of composition is dependency injection: the collaborators arrive through the constructor. The class then depends on an interface and not on a concrete type, which is what allows a fake in the test and a real implementation in production. The same object can then be reused in a different composition, which is exactly what a DI container or a plain factory function does.\n\nInheritance is not forbidden, it is just reserved. Use it when the child really is a kind of the parent and you want to override its behaviour; use composition when the relation is has-a, when the parts change independently, or when you want several of them at once. A class with five collaborators composed at runtime is far easier to change than a class with five levels of ancestors.',
          'Композиция собирает класс из объектов, с которыми он сотрудничает, а наследование — из родительского класса. Второе фиксируется в момент написания классов, первое решается в момент создания объектов. Именно в этом разница, и именно поэтому композиция — лучший вариант по умолчанию: корзине можно выдать другую стратегию скидки во время выполнения, а иерархия остаётся в один уровень.\n\nПрактическая форма композиции — внедрение зависимостей: партнёры приходят через конструктор. Класс зависит от интерфейса, а не от конкретного типа, и именно это позволяет подставить фейк в тест и настоящую реализацию в production. Тот же объект потом собирается в другую композицию — ровно это и делает DI-контейнер или обычная фабричная функция.\n\nНаследование не запрещено, просто его оставляют для случаев, где оно уместно. Берите его, когда потомок действительно является разновидностью родителя и вы хотите переопределить поведение; берите композицию, когда отношение has-a, когда части меняются независимо или когда их нужно несколько сразу. Класс с пятью партнёрами, собранными во время выполнения, менять куда проще, чем класс с пятью уровнями предков.'
        ),
        bullets: [
          L('Composition is decided at construction time, inheritance at class-writing time.', 'Композиция решается при создании, наследование — при написании классов.'),
          L('Injecting collaborators through the constructor is composition in practice.', 'Внедрение партнёров через конструктор — это композиция на практике.'),
          L('Use `extends` for a real is-a relation and in order to override behaviour.', 'Берите `extends` для настоящего is-a и чтобы переопределить поведение.'),
          L('Several collaborators at once is normal for composition and awkward for inheritance.', 'Несколько партнёров сразу — норма для композиции и неудобство для наследования.'),
        ],
        code: `interface PricingStrategy { price(items: Line[]): Money; }

class Cart {
  constructor(private readonly pricing: PricingStrategy) {}
  total() { return this.pricing.price(this.lines); }
}

const cart = new Cart(new RegularPricing());
const vipCart = new Cart(new VipPricing()); // swapped at runtime`,
        takeaway: L(
          'Reach for composition by default and keep inheritance for genuine is-a relations.',
          'По умолчанию берите композицию, а наследование оставьте для настоящих is-a.'
        ),
      },
      {
        id: 'oop-ch4-s2',
        title: L('Immutability', 'Неизменяемость'),
        body: L(
          'Immutability means that a value is never changed after it is created; to get a different value you create another one. The benefit is not theoretical: an object that never changes can be shared freely, so a React component can compare references with `===` and skip a re-render, and a cache can keep it without copying. In a concurrent runtime, immutable data also removes the bugs where one task mutates state another task is reading.\n\nIn TypeScript `readonly` marks a property as non-assignable and `Object.freeze` makes an object immutable at runtime, but both are shallow. The real work lies in the discipline: copy before you change. `const next = { ...state, count: state.count + 1 }` instead of `state.count += 1`, and `Object.freeze` on the nested objects as well. The price is an allocation on every change, which matters in hot loops and not at all in business logic.\n\nNot everything should be immutable. A large buffer, a cache index or a builder object that accumulates parts is better kept mutable, because copying it would be wasteful and unclear. The rule of thumb is to make the shared state immutable and the local working state mutable: a reducer that returns a new state is fine, and a builder that appends to an array it owns is fine too.',
          'Неизменяемость означает, что значение не меняется после создания: чтобы получить другое, создают новое. Выгода не теоретическая: неизменяемый объект свободно разделяется, поэтому React-компонент может сравнивать ссылки через `===` и не перерисовываться, а кэш — хранить его без копирования. В конкурентной среде неизменяемые данные заодно убирают целый класс ошибок, где одна задача меняет состояние, которое читает другая.\n\nВ TypeScript `readonly` помечает свойство как неприсваиваемое, а `Object.freeze` делает объект неизменяемым во время выполнения, но обе вещи работают поверхностно. Настоящая работа — в дисциплине: копируй перед изменением. `const next = { ...state, count: state.count + 1 }` вместо `state.count += 1`, и `Object.freeze` на вложенных объектах тоже. Цена — аллокация на каждое изменение, что важно в горячих циклах и совершенно не важно в бизнес-логике.\n\nНе всё должно быть неизменяемым. Большой буфер, индекс кэша или объект-строитель, который накапливает части, лучше оставить изменяемым: копировать его было бы расточительно и путающе. Правило звучит так: разделяемое состояние делайте неизменяемым, а локальное рабочее — изменяемым: редьюсер, возвращающий новое состояние, нормален, и нормален строитель, дописывающий в собственный массив.'
        ),
        bullets: [
          L('Immutable data can be shared by reference and compared with `===`.', 'Неизменяемые данные можно разделять по ссылке и сравнивать через `===`.'),
          L('`readonly` and `Object.freeze` are both shallow.', '`readonly` и `Object.freeze` работают поверхностно.'),
          L('Copy before you change: `{ ...state, field: value }`.', 'Копируй перед изменением: `{ ...state, field: value }`.'),
          L('Keep local working state mutable and copy only what you share.', 'Локальное рабочее состояние оставляйте изменяемым, копируйте только разделяемое.'),
        ],
        code: `type State = { items: readonly Item[]; total: number };

const initial: State = { items: [], total: 0 };

const next: State = {
  items: [...initial.items, newItem],
  total: initial.total + newItem.price,
};
Object.freeze(next.items);`,
        takeaway: L(
          'Immutable shared state removes reference bugs and mutable local state keeps the code fast.',
          'Неизменяемое разделяемое состояние убирает баги со ссылками, а изменяемое локальное — бережёт скорость.'
        ),
      },
      {
        id: 'oop-ch4-s3',
        title: L('Domain building blocks: entity, aggregate, event, context', 'Строительные блоки домена: сущность, агрегат, событие, контекст'),
        body: L(
          'An entity is an object with an identity that survives the change of its attributes: two customers with the same name are still two different customers and are compared by id. A value object has no identity and is compared by its values, so it can be copied freely and used as a dictionary key. Deciding which kind you hold tells you whether equality is a fact about the object or about its content.\n\nAn aggregate is a group of objects that must change together, and its root is the only member the outside world may reference. The root loads and saves the whole group, and it holds the invariants: an order cannot go below zero and cannot contain a line without a price. The root is also the transaction boundary, which keeps a use case from quietly writing half of an order.\n\nA domain event records a fact that already happened, named in the language of the business: OrderPlaced, PaymentCaptured. Publishing an event lets other parts react without the domain knowing about them, and it makes the history of the system readable. A bounded context is the boundary where a word has exactly one meaning: the customer in billing and the customer in support are different models, and an anti-corruption layer translates between the external vocabulary and yours.',
          'Сущность — объект с идентичностью, которая переживает изменение атрибутов: два клиента с одинаковым именем всё равно разные клиенты, и сравниваются по id. У объекта-значения идентичности нет, он сравнивается по значениям, поэтому его можно свободно копировать и использовать как ключ словаря. То, какой вид объекта вы держите, говорит вам, равенство — это факт об объекте или о его содержимом.\n\nАгрегат — группа объектов, которые должны меняться вместе, а корень агрегата — единственный, к которому обращаются снаружи. Корень грузит и сохраняет всю группу и хранит инварианты: заказ не может уйти в минус и не может содержать позицию без цены. Корень же задаёт границу транзакции, и благодаря этому сценарий не может тихо записать половину заказа.\n\nДоменное событие фиксирует факт, который уже произошёл, и названо языком бизнеса: OrderPlaced, PaymentCaptured. Публикация события позволяет другим частям системы реагировать, не зная о них, и делает историю системы читаемой. Ограниченный контекст — граница, внутри которой слово имеет ровно один смысл: клиент в биллинге и клиент в поддержке — разные модели, а антикоррупционный слой переводит между внешним словарём и вашим.'
        ),
        bullets: [
          L('An entity is compared by identity, a value object by content.', 'Сущность сравнивается по идентичности, объект-значение — по содержимому.'),
          L('Only the aggregate root is visible to the outside world.', 'Наружу виден только корень агрегата.'),
          L('The aggregate root holds the invariants and the transaction boundary.', 'Корень агрегата хранит инварианты и границу транзакции.'),
          L('In a bounded context a word has exactly one meaning.', 'В ограниченном контексте слово имеет ровно один смысл.'),
        ],
        code: `class Money {
  constructor(readonly amount: number, readonly currency: string) {}
  equals(other: Money) {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

class Order {
  #lines: Line[] = [];
  constructor(readonly id: OrderId, readonly customerId: CustomerId) {}
  addLine(line: Line) {
    if (line.price.amount <= 0) throw new Error('price must be positive');
    this.#lines.push(line);
  }
  get total() {
    return this.#lines.reduce((sum, l) => sum.plus(l.price), new Money(0, 'RUB'));
  }
}`,
        takeaway: L(
          'Choose entity or value object by whether identity or content defines the equality.',
          'Выбирайте сущность или объект-значение по тому, что определяет равенство: идентичность или содержимое.'
        ),
      },
    ],
  },
];
