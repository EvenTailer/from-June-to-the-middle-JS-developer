import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopModule: Module = {
  id: 'oop',
  title: L('OOP & SOLID', 'ООП и SOLID'),
  description: L('OOP principles, patterns, and SOLID in depth.', 'Принципы ООП, паттерны и SOLID подробно.'),
  lessons: [
    { id: 'oop-001', title: L('Encapsulation', 'Инкапсуляция'), question: L('What is encapsulation?', 'Что такое инкапсуляция?'), answer: L('Hide internal state and expose a controlled public API. Reduces coupling and protects invariants.', 'Скрытие внутреннего состояния и предоставление контролируемого публичного API. Снижает связанность и защищает инварианты.'), code: 'class User {\n  #password: string;\n  constructor(pw: string) { this.#password = pw; }\n  check(pw: string) { return this.#password === pw; }\n}' },
    { id: 'oop-002', title: L('Inheritance', 'Наследование'), question: L('What is inheritance?', 'Что такое наследование?'), answer: L('A subclass reuses and extends base class behavior via extends. Prefer shallow hierarchies.', 'Подкласс переиспользует и расширяет поведение базового класса через extends. Предпочитайте неглубокие иерархии.'), code: 'class Animal { move() {} }\nclass Dog extends Animal { bark() {} }' },
    { id: 'oop-003', title: L('Polymorphism', 'Полиморфизм'), question: L('What is polymorphism?', 'Что такое полиморфизм?'), answer: L('Same interface, different implementations. Callers depend on abstraction, not concrete type.', 'Один интерфейс, разные реализации. Вызывающий код зависит от абстракции, а не от конкретного типа.'), code: 'interface Shape { area(): number; }\nclass Circle implements Shape { area() { return Math.PI * this.r * this.r; } }' },
    { id: 'oop-004', title: L('Abstraction', 'Абстракция'), question: L('What is abstraction?', 'Что такое абстракция?'), answer: L('Hide complexity behind a simple contract. Abstract classes/interfaces define what, not how.', 'Скрытие сложности за простым контрактом. Абстрактные классы/интерфейсы определяют что, а не как.'), code: 'abstract class Repository { abstract find(id: string): Promise<Entity>; }' },
    { id: 'oop-005', title: L('Composition', 'Композиция'), question: L('What is composition?', 'Что такое композиция?'), answer: L('Build behavior by combining smaller objects. More flexible than inheritance; enables runtime wiring.', 'Построение поведения из небольших объектов. Гибче наследования; позволяет связывать во время выполнения.'), code: 'class Engine {}\nclass Car { constructor(private engine: Engine) {} }' },
    { id: 'oop-006', title: L('Static members', 'Статические члены'), question: L('What are static members?', 'Что такое статические члены?'), answer: L('Belong to class, not instance. Use for factories, constants, utilities.', 'Принадлежат классу, а не экземпляру. Используются для фабрик, констант, утилит.'), code: 'class MathUtil { static PI = 3.14; static double(x:number){return x*2;} }' },
    { id: 'oop-007', title: L('Access modifiers', 'Модификаторы доступа'), question: L('Public vs private vs protected?', 'Public vs private vs protected?'), answer: L('Public: anyone. Private: class only. Protected: class and subclasses.', 'Public: всем. Private: только классу. Protected: классу и подклассам.'), code: 'class A { public a=1; private b=2; protected c=3; }' },
    { id: 'oop-008', title: L('Private fields #', 'Приватные поля #'), question: L('How do JS private fields work?', 'Как работают приватные поля JS?'), answer: L('Prefix with #. Truly private at runtime; not accessible outside class.', 'Префикс #. По-настоящему приватные во время выполнения; недоступны вне класса.'), code: 'class A { #x = 0; get x() { return this.#x; } }' },
    { id: 'oop-009', title: L('Abstract class', 'Абстрактный класс'), question: L('What is an abstract class?', 'Что такое абстрактный класс?'), answer: L('Cannot be instantiated; may contain abstract methods subclasses must implement.', 'Нельзя инстанцировать; может содержать абстрактные методы, которые подклассы обязаны реализовать.'), code: 'abstract class Shape { abstract area(): number; describe(){return this.area();} }' },
    { id: 'oop-010', title: L('Interface', 'Интерфейс'), question: L('What is an interface?', 'Что такое интерфейс?'), answer: L('A pure contract of members with no implementation. Enables loose coupling and testing.', 'Чистый контракт членов без реализации. Обеспечивает слабую связанность и тестируемость.'), code: 'interface Repo { find(id:string): Promise<User>; }' },
    { id: 'oop-011', title: L('Prototype', 'Прототип'), question: L('How does prototype-based inheritance work?', 'Как работает прототипное наследование?'), answer: L('Objects delegate to prototype objects. Classes are syntactic sugar over prototypes.', 'Объекты делегируют прототипным объектам. Классы — синтаксический сахар над прототипами.'), code: 'const proto = { greet(){return "hi";} };\nconst o = Object.create(proto);' },
    { id: 'oop-012', title: L('Method override', 'Переопределение метода'), question: L('What is method overriding?', 'Что такое переопределение метода?'), answer: L('Subclass redefines inherited method with same signature. Use super to call base.', 'Подкласс переопределяет наследуемый метод с той же сигнатурой. Используйте super для вызова базового.'), code: 'class A { greet(){return "a";} }\nclass B extends A { greet(){return super.greet()+" b";} }' },
    { id: 'oop-013', title: L('Overloading', 'Перегрузка'), question: L('Does JS support method overloading?', 'Поддерживает ли JS перегрузку методов?'), answer: L('No native overloading; simulate with optional params or type guards. TS has overload signatures.', 'Нативной перегрузки нет; имитируйте необязательными параметрами или type guards. TS поддерживает сигнатуры перегрузки.'), code: 'function add(a:number,b?:number){ return a+(b??0); }' },
    { id: 'oop-014', title: L('Duck typing', 'Утиная типизация'), question: L('What is duck typing?', 'Что такое утиная типизация?'), answer: L('If it walks like a duck and quacks like a duck, it is a duck. Behavior-based compatibility.', 'Если ходит как утка и крякает как утка — утка. Совместимость по поведению.') },
    { id: 'oop-015', title: L('Dependency injection', 'Внедрение зависимостей'), question: L('What is dependency injection?', 'Что такое внедрение зависимостей?'), answer: L('Dependencies passed in rather than created internally. Improves testability and decoupling.', 'Зависимости передаются извне, а не создаются внутри. Улучшает тестируемость и развязку.'), code: 'class Service { constructor(private repo: Repo) {} }' },
    { id: 'oop-016', title: L('Factory function', 'Функция-фабрика'), question: L('What is a factory function?', 'Что такое функция-фабрика?'), answer: L('Function returning an object, hiding construction details.', 'Функция, возвращающая объект и скрывающая детали создания.'), code: 'const createUser = (name:string) => ({ name, greet(){return name;} });' },
    { id: 'oop-017', title: L('Abstract Factory', 'Абстрактная фабрика'), question: L('What is Abstract Factory?', 'Что такое Абстрактная фабрика?'), answer: L('Family of related objects created without specifying concrete classes.', 'Семейство связанных объектов создаётся без указания конкретных классов.'), code: 'interface UIFactory { createButton(): Button; createInput(): Input; }' },
    { id: 'oop-018', title: L('Singleton', 'Одиночка'), question: L('What is Singleton?', 'Что такое Одиночка?'), answer: L('Ensure one instance and global access. Use sparingly; complicates testing.', 'Гарантирует один экземпляр и глобальный доступ. Используйте умеренно; усложняет тестирование.'), code: 'class S { static instance:S; static get(){return this.instance??=new S();} }' },
    { id: 'oop-019', title: L('Observer', 'Наблюдатель'), question: L('What is Observer pattern?', 'Что такое паттерн Наблюдатель?'), answer: L('Subject notifies subscribers on state changes. Basis of event systems.', 'Субъект уведомляет подписчиков об изменениях состояния. Основа событийных систем.'), code: 'class Emitter { private ls=new Set<Function>(); on(f:Function){this.ls.add(f);} emit(x:any){this.ls.forEach(f=>f(x));} }' },
    { id: 'oop-020', title: L('Strategy', 'Стратегия'), question: L('What is Strategy pattern?', 'Что такое паттерн Стратегия?'), answer: L('Encapsulate interchangeable algorithms behind common interface.', 'Инкапсуляция взаимозаменяемых алгоритмов за общим интерфейсом.'), code: 'interface Sort { sort(a:number[]):number[]; }\nclass Quick implements Sort { sort(a){return a;} }' },
    { id: 'oop-021', title: L('Decorator pattern', 'Паттерн Декоратор'), question: L('What is Decorator pattern?', 'Что такое паттерн Декоратор?'), answer: L('Wrap object to add behavior without changing its interface.', 'Обёртка объекта для добавления поведения без изменения интерфейса.'), code: 'class LoggedRepo implements Repo { constructor(private inner:Repo){} find(id:string){ console.log(id); return this.inner.find(id);} }' },
    { id: 'oop-022', title: L('Adapter', 'Адаптер'), question: L('What is Adapter pattern?', 'Что такое паттерн Адаптер?'), answer: L('Convert one interface to another expected by client.', 'Преобразование одного интерфейса в другой, ожидаемый клиентом.'), code: 'class Adapter implements Target { constructor(private adaptee:Adaptee){} request(){return this.adaptee.specific();} }' },
    { id: 'oop-023', title: L('Facade', 'Фасад'), question: L('What is Facade pattern?', 'Что такое паттерн Фасад?'), answer: L('Simplified high-level interface over complex subsystem.', 'Упрощённый высокоуровневый интерфейс над сложной подсистемой.'), code: 'class Facade { do(){ a(); b(); c(); } }' },
    { id: 'oop-024', title: L('Proxy', 'Заместитель'), question: L('What is Proxy pattern?', 'Что такое паттерн Заместитель?'), answer: L('Surrogate controlling access to another object (lazy, cache, protection).', 'Суррогат, контролирующий доступ к другому объекту (ленивый, кэш, защита).'), code: 'const p = new Proxy(target, { get(t,k){ return t[k]; } });' },
    { id: 'oop-025', title: L('Bridge', 'Мост'), question: L('What is Bridge pattern?', 'Что такое паттерн Мост?'), answer: L('Separate abstraction from implementation so both can vary independently.', 'Разделение абстракции и реализации, чтобы обе могли меняться независимо.'), code: 'abstract class Shape { constructor(protected renderer:Renderer){} }' },
    { id: 'oop-026', title: L('Composite', 'Компоновщик'), question: L('What is Composite pattern?', 'Что такое паттерн Компоновщик?'), answer: L('Treat individual objects and compositions uniformly via tree structure.', 'Единообразная работа с отдельными объектами и композициями через дерево.'), code: 'interface Node { render():string; }' },
    { id: 'oop-027', title: L('Command', 'Команда'), question: L('What is Command pattern?', 'Что такое паттерн Команда?'), answer: L('Encapsulate request as object, enabling undo/queue/logging.', 'Инкапсуляция запроса как объекта, позволяющая отмену/очередь/логирование.'), code: 'class Cmd { execute(){} undo(){} }' },
    { id: 'oop-028', title: L('Chain of Responsibility', 'Цепочка обязанностей'), question: L('What is Chain of Responsibility?', 'Что такое Цепочка обязанностей?'), answer: L('Pass request along chain of handlers until one handles it.', 'Передача запроса по цепочке обработчиков, пока один не обработает.'), code: 'abstract class Handler { setNext(h:Handler){this.next=h;return h;} }' },
    { id: 'oop-029', title: L('State pattern', 'Паттерн Состояние'), question: L('What is State pattern?', 'Что такое паттерн Состояние?'), answer: L('Behavior changes based on internal state via state objects.', 'Поведение меняется в зависимости от внутреннего состояния через объекты состояния.'), code: 'interface State { handle(ctx:Context):void; }' },
    { id: 'oop-030', title: L('Template Method', 'Шаблонный метод'), question: L('What is Template Method?', 'Что такое Шаблонный метод?'), answer: L('Base class defines algorithm skeleton; subclasses override steps.', 'Базовый класс определяет скелет алгоритма; подклассы переопределяют шаги.'), code: 'abstract class Report { run(){this.header();this.body();this.footer();} abstract body():void; }' },
    { id: 'oop-031', title: L('Iterator', 'Итератор'), question: L('What is Iterator pattern?', 'Что такое паттерн Итератор?'), answer: L('Sequential access to collection elements without exposing internals.', 'Последовательный доступ к элементам коллекции без раскрытия внутренностей.'), code: 'class Range implements Iterable<number> { *[Symbol.iterator](){ for(let i=0;i<this.n;i++) yield i; } }' },
    { id: 'oop-032', title: L('Mediator', 'Посредник'), question: L('What is Mediator pattern?', 'Что такое паттерн Посредник?'), answer: L('Central object coordinates communication between components, reducing coupling.', 'Центральный объект координирует взаимодействие компонентов, снижая связанность.'), code: 'class Mediator { notify(sender:any,event:string){} }' },
    { id: 'oop-033', title: L('Memento', 'Снимок'), question: L('What is Memento pattern?', 'Что такое паттерн Снимок?'), answer: L('Capture and restore object state without exposing internals.', 'Сохранение и восстановление состояния объекта без раскрытия внутренностей.'), code: 'class Memento { constructor(private s:string){} get(){return this.s;} }' },
    { id: 'oop-034', title: L('Flyweight', 'Приспособленец'), question: L('What is Flyweight pattern?', 'Что такое паттерн Приспособленец?'), answer: L('Share immutable intrinsic state to reduce memory for many similar objects.', 'Разделение неизменяемого внутреннего состояния для экономии памяти при множестве похожих объектов.'), code: 'const cache = new Map();' },
    { id: 'oop-035', title: L('Visitor', 'Посетитель'), question: L('What is Visitor pattern?', 'Что такое паттерн Посетитель?'), answer: L('Add operations to object structure without modifying classes.', 'Добавление операций к структуре объектов без изменения классов.'), code: 'interface Visitor { visitA(a:A):void; }' },
    { id: 'oop-036', title: L('Null Object', 'Null Object'), question: L('What is Null Object pattern?', 'Что такое паттерн Null Object?'), answer: L('Provide do-nothing implementation instead of null to avoid null checks.', 'Предоставление ничего не делающей реализации вместо null, чтобы избежать проверок на null.'), code: 'class NullLogger { log(){} }' },
    { id: 'oop-037', title: L('SOLID S', 'SOLID S'), question: L('Single Responsibility Principle?', 'Принцип единственной ответственности?'), answer: L('One reason to change per module. Split by responsibility.', 'Одна причина изменения на модуль. Разделяйте по ответственности.'), code: 'class UserService { create(){} }\nclass EmailService { send(){} }' },
    { id: 'oop-038', title: L('SOLID O', 'SOLID O'), question: L('Open/Closed Principle?', 'Принцип открыт/закрыт?'), answer: L('Open for extension, closed for modification. Use polymorphism instead of edits.', 'Открыт для расширения, закрыт для изменения. Используйте полиморфизм вместо правок.'), code: 'interface Discount { apply(p:number):number; }' },
    { id: 'oop-039', title: L('SOLID L', 'SOLID L'), question: L('Liskov Substitution Principle?', 'Принцип подстановки Лисков?'), answer: L('Subtypes substitutable for base without altering correctness.', 'Подтипы заменяемы базовыми без нарушения корректности.'), code: 'class Rectangle { setW(w:number){this.w=w;} }\n// Square overriding breaks LSP' },
    { id: 'oop-040', title: L('SOLID I', 'SOLID I'), question: L('Interface Segregation Principle?', 'Принцип разделения интерфейсов?'), answer: L('Clients depend only on methods they use. Split fat interfaces.', 'Клиенты зависят только от используемых методов. Разделяйте толстые интерфейсы.'), code: 'interface Readable { read():string; }\ninterface Writable { write(s:string):void; }' },
    { id: 'oop-041', title: L('SOLID D', 'SOLID D'), question: L('Dependency Inversion Principle?', 'Принцип инверсии зависимостей?'), answer: L('Depend on abstractions, not concretions. Inject dependencies.', 'Зависьте от абстракций, а не от конкретики. Внедряйте зависимости.'), code: 'class OrderService { constructor(private repo:OrderRepo){} }' },
    { id: 'oop-042', title: L('DRY', 'DRY'), question: L('What is DRY?', 'Что такое DRY?'), answer: L('Don\'t Repeat Yourself. Extract common knowledge to single source of truth.', 'Не повторяйся. Выносите общее знание в единый источник истины.'), code: 'function price(qty:number, unit:number){ return qty*unit; }' },
    { id: 'oop-043', title: L('Cohesion', 'Связность'), question: L('What is cohesion?', 'Что такое связность?'), answer: L('Degree to which elements of a module belong together. Higher is better.', 'Степень, в которой элементы модуля принадлежат вместе. Чем выше, тем лучше.') },
    { id: 'oop-044', title: L('Instability', 'Нестабильность'), question: L('How compute instability I?', 'Как вычислить нестабильность I?'), answer: L('I = Ce / (Ca + Ce). 0 = stable, 1 = unstable.', 'I = Ce / (Ca + Ce). 0 = стабильный, 1 = нестабильный.'), code: 'I = Ce / (Ca + Ce)' },
    { id: 'oop-045', title: L('Information hiding', 'Сокрытие информации'), question: L('What is information hiding?', 'Что такое сокрытие информации?'), answer: L('Conceal design decisions likely to change behind stable interfaces.', 'Скрытие решений, склонных к изменениям, за стабильными интерфейсами.'), code: 'interface Storage { get(k:string):string|null; set(k:string,v:string):void; }' },

  ],
  quiz: [
    {
      id: 'oop-q01',
      question: L('What is special about a field declared as `#balance` inside a class?', 'Что особенного у поля, объявленного как `#balance` внутри класса?'),
      options: [
        L('It is a static field shared by all the instances of the class', 'Это статическое поле, общее для всех экземпляров класса'),
        L('It is a normal public field that TypeScript only hides from the type checker', 'Это обычное публичное поле, которое TypeScript просто прячет от проверки типов'),
        L('It is a getter that recomputes the value on every access', 'Это геттер, который пересчитывает значение при каждом обращении'),
        L('It is really private: it cannot be read or written from outside the class body, not even through a same named property', 'Оно по-настоящему приватное: его нельзя прочитать или записать снаружи тела класса, даже через одноимённое свойство')
      ],
      correctIndex: 3,
      explanation: L(
        'The hash prefix creates a genuine private field: the runtime throws if somebody tries to touch it from outside, so the class keeps full control over its own state. The TypeScript private keyword is only a compile time rule, and a property with the same name still exists as an ordinary property.',
        'Префикс с решёткой создаёт настоящее приватное поле: во время выполнения попытка обратиться к нему снаружи приводит к ошибке, поэтому класс полностью контролирует своё состояние. Ключевое слово private в TypeScript действует только на этапе компиляции, а одноимённое свойство всё равно остаётся обычным свойством.'
      ),
    },
    {
      id: 'oop-q02',
      question: L('How is the TypeScript `private` modifier different from the `#` private field?', 'Чем модификатор `private` в TypeScript отличается от приватного поля `#`?'),
      options: [
        L('They are exactly the same, TypeScript just rewrites the code for you', 'Они полностью одинаковы, TypeScript просто переписывает код за вас'),
        L('The TypeScript private is only checked at compile time and the value stays reachable at runtime, while `#` is enforced by the language itself', 'private в TypeScript проверяется только на этапе компиляции, и значение остаётся доступным во время выполнения, а `#` обеспечивает сам язык'),
        L('The TypeScript private is stricter, because the compiler also rewrites the field', 'private в TypeScript строже, потому что компилятор ещё и переписывает поле'),
        L('The `#` syntax is only a naming convention and has no effect on the access', 'Синтаксис `#` — просто соглашение об именах и никак не влияет на доступ')
      ],
      correctIndex: 1,
      explanation: L(
        'TypeScript protects you with an error in the editor and in the compiler, but the property is still a normal property that you can reach from the console or from any JavaScript. The hash prefix is a part of the language, so the access is impossible no matter what code you write.',
        'TypeScript защищает вас ошибкой в редакторе и в компиляторе, но свойство остаётся обычным, и до него можно добраться из консоли или из любого JavaScript. Префикс с решёткой — часть языка, поэтому обратиться к полю невозможно, что бы вы ни написали.'
      ),
    },
    {
      id: 'oop-q03',
      question: L('In TypeScript, who may touch a `protected` member of a class?', 'В TypeScript кто может обращаться к защищённому члену класса?'),
      options: [
        L('The class itself and the classes that extend it', 'Сам класс и классы, которые его наследуют'),
        L('Only the instances of the same class', 'Только экземпляры того же класса'),
        L('Everybody, because the modifier is only a hint', 'Все, потому что модификатор — лишь подсказка'),
        L('Only the code in the same file', 'Только код в том же файле')
      ],
      correctIndex: 0,
      explanation: L(
        'A protected member is visible inside the class and inside the subclasses, which is exactly what you need for a helper that a subclass calls. A private member belongs to the class alone, and a public one is available to everyone.',
        'Защищённый член виден внутри класса и внутри подклассов — именно то, что нужно вспомогательному методу, который вызывает подкласс. Приватный член принадлежит только самому классу, а публичный доступен всем.'
      ),
    },
    {
      id: 'oop-q04',
      question: L('What does it mean that a class exposes a getter for a field but no setter for it?', 'Что означает, что класс открывает геттер поля, но не открывает сеттер?'),
      options: [
        L('The field can be read from outside but not written to', 'Поле можно прочитать снаружи, но нельзя записать'),
        L('The field is computed on every read from the other fields', 'Поле вычисляется при каждом чтении из остальных полей'),
        L('The field is private and can only be changed inside the class', 'Поле приватно и может меняться только внутри класса'),
        L('The getter and the setter are generated automatically', 'Геттер и сеттер генерируются автоматически')
      ],
      correctIndex: 0,
      explanation: L(
        'A getter without a matching setter gives a read only view of the state: the value can be inspected from anywhere, but the only way to change it is a method of the class that keeps the invariants. That is the simplest form of encapsulation.',
        'Геттер без парного сеттера даёт представление только для чтения: значение видно откуда угодно, но изменить его можно только методом класса, который следит за инвариантами. Это простейшая форма инкапсуляции.'
      ),
    },
    {
      id: 'oop-q05',
      question: L(
        'Why should a BankAccount class validate the amount inside deposit() and withdraw() instead of trusting the caller?',
        'Почему класс BankAccount должен проверять сумму внутри deposit() и withdraw(), а не доверять вызывающему коду?'
      ),
      options: [
        L('Because the validation makes the methods run faster', 'Потому что проверка ускоряет работу методов'),
        L('Because the balance is a private field, so only the class can enforce the rule that it never goes negative', 'Потому что баланс — приватное поле, и только класс может обеспечить правило, что он никогда не уходит в минус'),
        L('Because the caller may be a different part of the system that knows nothing about the rules of the account', 'Потому что вызывающим может быть другая часть системы, которая ничего не знает о правилах счёта'),
        L('Because TypeScript cannot check the numbers at runtime', 'Потому что TypeScript не может проверить числа во время выполнения')
      ],
      correctIndex: 1,
      explanation: L(
        'The whole point of encapsulation is that the class guarantees its own invariants: the balance is never negative, no matter who calls the method. If the check lives in the caller, every future caller has to repeat it, and the first one that forgets breaks the rule.',
        'Весь смысл инкапсуляции в том, что класс гарантирует свои инварианты: баланс никогда не уходит в минус, кто бы ни вызвал метод. Если проверка живёт у вызывающего, каждый будущий вызывающий обязан её повторить, а первый, кто забудет, нарушит правило.'
      ),
    },
    {
      id: 'oop-q06',
      question: L('What does `class Dog extends Animal` give you?', 'Что даёт `class Dog extends Animal`?'),
      options: [
        L('A subclass that reuses and extends the behaviour of the base class and can call it with super', 'Подкласс, который переиспользует и расширяет поведение базового класса и может вызвать его через super'),
        L('A copy of the members of Animal, so the two classes evolve independently', 'Копию членов Animal, поэтому классы развиваются независимо'),
        L('A wrapper that turns the methods of Animal into static methods', 'Обёртку, которая превращает методы Animal в статические'),
        L('An interface implementation that the compiler checks for you', 'Реализацию интерфейса, которую проверит компилятор')
      ],
      correctIndex: 0,
      explanation: L(
        'extends makes Dog a subclass of Animal: the instances of Dog have the methods and the fields of Animal, and Dog may add its own or override the inherited ones. The prototype chain of the instance goes through Animal, so the reuse happens at runtime and not by copying the code.',
        'extends делает Dog подклассом Animal: у экземпляров Dog есть методы и поля Animal, а Dog может добавить свои или переопределить унаследованные. Цепочка прототипов экземпляра проходит через Animal, то есть повторное использование происходит во время выполнения, а не копированием кода.'
      ),
    },
    {
      id: 'oop-q07',
      question: L('What happens if the constructor of a subclass uses `this` before it calls `super()`?', 'Что произойдёт, если конструктор подкласса использует `this` до вызова `super()`?'),
      options: [
        L('Nothing special, the order of the statements does not matter', 'Ничего особенного, порядок операторов не важен'),
        L('JavaScript throws a ReferenceError, because the object of the subclass does not exist until the base constructor has run', 'JavaScript бросит ReferenceError, потому что объект подкласса не существует, пока не отработал конструктор базового класса'),
        L('The field of the subclass is created, but the fields of the base class are not', 'Поле подкласса создаётся, а поля базового класса — нет'),
        L('The base constructor is called automatically at the end of the subclass constructor', 'Конструктор базового класса вызывается автоматически в конце конструктора подкласса')
      ],
      correctIndex: 1,
      explanation: L(
        'In a derived class you have to call super() before you touch this, because the object of the subclass is not created until the base constructor has run. JavaScript enforces this with a ReferenceError, and the same rule applies to the fields of the subclass with their initializers.',
        'В производном классе нужно вызвать super() до обращения к this, потому что объект подкласса не создан, пока не отработал конструктор базового класса. JavaScript следит за этим через ReferenceError, и то же правило касается полей подкласса с их инициализаторами.'
      ),
    },
    {
      id: 'oop-q08',
      question: L('What is a method override in JavaScript?', 'Что такое переопределение метода в JavaScript?'),
      options: [
        L('A method of the subclass with the same name that replaces the inherited one, and super calls the base version', 'Метод подкласса с тем же именем, который заменяет унаследованный, а super вызывает базовую версию'),
        L('A method of the subclass that is called before the constructor of the base class', 'Метод подкласса, который вызывается до конструктора базового класса'),
        L('A method that is defined twice in the same class and the second one wins', 'Метод, определённый дважды в одном классе, причём побеждает второй'),
        L('A static method that hides the instance method of the base class', 'Статический метод, скрывающий метод экземпляра базового класса')
      ],
      correctIndex: 0,
      explanation: L(
        'When the subclass defines a method with the same name, the inherited version is replaced, and super.method() gives access to the base implementation, which is how you extend the behaviour instead of copying it. The signature has to stay compatible, otherwise the subclass breaks the contract of the base class.',
        'Когда подкласс определяет метод с тем же именем, унаследованная версия заменяется, а super.method() даёт доступ к базовой реализации — так поведение расширяют, а не копируют. Сигнатура должна оставаться совместимой, иначе подкласс ломает контракт базового класса.'
      ),
    },
    {
      id: 'oop-q09',
      question: L('What is polymorphism in the sense of this module?', 'Что такое полиморфизм в смысле этого модуля?'),
      options: [
        L('The ability of a class to change its own behaviour at runtime by rewriting its methods', 'Способность класса менять своё поведение во время выполнения, переписывая свои методы'),
        L('The duplication of the same code in several classes to keep them independent', 'Дублирование одного и того же кода в нескольких классах, чтобы они оставались независимыми'),
        L('One interface and many implementations, so the caller depends on the abstraction and not on the concrete class', 'Один интерфейс и много реализаций, поэтому вызывающий зависит от абстракции, а не от конкретного класса'),
        L('The automatic conversion of one type into another, like a number into a string', 'Автоматическое преобразование одного типа в другой, например числа в строку')
      ],
      correctIndex: 2,
      explanation: L(
        'A loop over an array of shapes can call area() on every element, and each element runs its own implementation, because the call is dispatched on the runtime type. The client code is written once and never mentions the concrete classes, which is what keeps the change small.',
        'Цикл по массиву фигур может вызвать area() у каждого элемента, и каждый элемент выполнит свою реализацию, потому что вызов разбирается по типу во время выполнения. Код клиента пишется один раз и не упоминает конкретные классы — это и держит изменение небольшим.'
      ),
    },
    {
      id: 'oop-q10',
      question: L('Why would a subclass call `super.greet()` inside its own greet()?', 'Зачем подкласс вызывает `super.greet()` внутри своего greet()?'),
      options: [
        L('To call the version of the base class and extend its result instead of copying the code', 'Чтобы вызвать версию базового класса и дополнить её результат, а не копировать код'),
        L('To call the constructor of the base class a second time', 'Чтобы второй раз вызвать конструктор базового класса'),
        L('To make the method of the base class private', 'Чтобы сделать метод базового класса приватным'),
        L('To skip the constructor of the base class', 'Чтобы пропустить конструктор базового класса')
      ],
      correctIndex: 0,
      explanation: L(
        'super.greet() reaches the implementation of the base class, so the subclass can add to it, for example return super.greet() + " and woof", without repeating the logic. The call of super() in the constructor is a different thing: that one initialises the base class.',
        'super.greet() достаёт реализацию базового класса, поэтому подкласс может дописать к ней, например вернуть super.greet() + " and woof", не повторяя логику. Вызов super() в конструкторе — это другое: он инициализирует базовый класс.'
      ),
    },
    {
      id: 'oop-q11',
      question: L('What is an interface in TypeScript?', 'Что такое интерфейс в TypeScript?'),
      options: [
        L('A class with the methods implemented as empty stubs', 'Класс, у которого методы реализованы как пустые заглушки'),
        L('A runtime object that is created when you instantiate the class', 'Объект во время выполнения, который создаётся при инстанцировании класса'),
        L('A pure contract of the members with no implementation at all, which the compiler checks for you', 'Чистый контракт членов вообще без реализации, который проверяет компилятор'),
        L('A decorator that adds the methods to any class', 'Декоратор, который добавляет методы к любому классу')
      ],
      correctIndex: 2,
      explanation: L(
        'An interface only describes the shape: the names of the members and their types. The compiler checks that the classes satisfy it, and it disappears completely at runtime, because there is nothing to instantiate.',
        'Интерфейс описывает только форму: имена членов и их типы. Компилятор проверяет, что классы ему соответствуют, и на этапе выполнения он полностью исчезает, потому что инстанцировать нечего.'
      ),
    },
    {
      id: 'oop-q12',
      question: L('What is the difference between an abstract class and a normal class?', 'Чем абстрактный класс отличается от обычного?'),
      options: [
        L('An abstract class cannot be instantiated and may declare abstract methods that the subclasses must implement', 'Абстрактный класс нельзя инстанцировать, и в нём могут быть абстрактные методы, которые подклассы обязаны реализовать'),
        L('An abstract class cannot have any fields, only the methods', 'Абстрактный класс не может иметь полей, только методы'),
        L('An abstract class is the same as an interface, but written as a class', 'Абстрактный класс — это то же самое, что интерфейс, только написанный как класс'),
        L('An abstract class is compiled into an interface at runtime', 'Абстрактный класс превращается в интерфейс во время выполнения')
      ],
      correctIndex: 0,
      explanation: L(
        'An abstract class is a class you cannot instantiate directly, and its abstract methods are a promise: every subclass has to implement them or the compiler refuses the code. It can still carry the shared implementation and the fields, which an interface cannot.',
        'Абстрактный класс — это класс, который нельзя инстанцировать напрямую, а его абстрактные методы — это обещание: каждый подкласс обязан их реализовать, иначе компилятор не пропустит код. При этом в нём могут быть общая реализация и поля, чего не может быть в интерфейсе.'
      ),
    },
    {
      id: 'oop-q13',
      question: L('What does abstraction mean in the design of a class?', 'Что означает абстракция в проектировании класса?'),
      options: [
        L('It hides the complexity behind a simple contract that describes what the object does and not how it does it', 'Она прячет сложность за простым контрактом, который описывает что объект делает, а не как'),
        L('It means the class has no private fields', 'Она означает, что у класса нет приватных полей'),
        L('It means the class is an abstract class with abstract methods', 'Она означает, что класс абстрактный и содержит абстрактные методы'),
        L('It means the class cannot be instantiated', 'Она означает, что класс нельзя инстанцировать')
      ],
      correctIndex: 0,
      explanation: L(
        'Abstraction is the contract and not the machinery: the caller of a Repository needs to know that find returns a promise of a user, and nothing about the SQL behind it. The class can change its internals without breaking anybody, as long as the contract stays the same.',
        'Абстракция — это контракт, а не механизм: вызывающему репозиторий достаточно знать, что find вернёт промис с пользователем, и ничего про SQL под ним. Класс может менять internals и никому не сломать, пока контракт остаётся прежним.'
      ),
    },
    {
      id: 'oop-q14',
      question: L('Why is composition usually preferred over inheritance in JavaScript?', 'Почему композицию обычно предпочитают наследованию в JavaScript?'),
      options: [
        L('Composition is faster, because the prototype chain is not used at all', 'Композиция быстрее, потому что цепочка прототипов вообще не используется'),
        L('Inheritance is not supported in JavaScript, only composition is', 'В JavaScript нет наследования, есть только композиция'),
        L('Composition is more flexible: the collaborators are wired at runtime and can be replaced, and the hierarchy stays shallow', 'Композиция гибче: партнёры связываются во время выполнения и их можно заменить, а иерархия остаётся неглубокой'),
        L('Composition lets you share the code between the classes the same way inheritance does', 'Композиция позволяет делить код между классами так же, как наследование')
      ],
      correctIndex: 2,
      explanation: L(
        'With composition a class holds the objects it needs and can swap them at runtime, for example setStrategy on a cart, while inheritance fixes the relations at the moment the classes are written. Composition also keeps the hierarchy shallow, and a deep hierarchy of base classes is the classic source of surprises.',
        'При композиции класс хранит нужные ему объекты и может менять их во время выполнения, например setStrategy у корзины, а наследование фиксирует отношения в момент написания классов. Композиция ещё и держит иерархию неглубокой, а глубокая иерархия базовых классов — классический источник сюрпризов.'
      ),
    },
    {
      id: 'oop-q15',
      question: L('A Car class receives an Engine through its constructor. Which relation is that?', 'Класс Car получает Engine через конструктор. Это какое отношение?'),
      options: [
        L('A has-a relation, because the car is built from an engine', 'Отношение has-a, потому что машина собрана из двигателя'),
        L('An is-a relation, because the car is a kind of engine', 'Отношение is-a, потому что машина — это разновидность двигателя'),
        L('A depends-on relation, which is the same as an is-a relation', 'Отношение depends-on, которое то же самое, что is-a'),
        L('No relation at all, because the engine is only a parameter', 'Никакого отношения, потому что двигатель — просто параметр')
      ],
      correctIndex: 0,
      explanation: L(
        'A car has an engine, it is not a kind of engine, so the relation is has-a and the engine is passed in from the outside. That is composition, and it is also dependency injection: the caller decides which engine the car gets, which is what makes the class testable.',
        'У машины есть двигатель, машина не является разновидностью двигателя, поэтому отношение has-a, а двигатель передаётся снаружи. Это композиция и одновременно внедрение зависимостей: вызывающий решает, какой двигатель получит машина, и именно поэтому класс тестируется.'
      ),
    },
    {
      id: 'oop-q16',
      question: L('What can composition do at runtime that inheritance cannot?', 'Что композиция может делать во время выполнения, а наследование нет?'),
      options: [
        L('It can create a class at runtime, while the classes have to be written in advance', 'Она может создать класс во время выполнения, тогда как классы пишутся заранее'),
        L('It can change the behaviour of a class without touching the class itself, for example by swapping the collaborator that holds the algorithm', 'Она может менять поведение класса, не трогая сам класс, например подменяя партнёра, который держит алгоритм'),
        L('It can add a method to an existing class after the class has been created', 'Она может добавить метод в уже созданный класс'),
        L('It can call a method of the base class from the subclass', 'Она может вызвать метод базового класса из подкласса')
      ],
      correctIndex: 1,
      explanation: L(
        'A cart that holds a pricing strategy can switch from a percent discount to a buy two get one rule with one call, and no line of the cart changes. With inheritance the pricing rules would be separate subclasses, and the type of the object would be decided when you built it.',
        'Корзина, у которой есть стратегия расчёта, переключается со скидки в процентах на правило «третий товар бесплатно» одним вызовом, и ни одна строка корзины не меняется. При наследовании правила расчёта стали бы подклассами, а тип объекта определялся бы в момент его создания.'
      ),
    },
    {
      id: 'oop-q17',
      question: L('What does the Single Responsibility Principle state?', 'Что утверждает принцип единственной ответственности?'),
      options: [
        L('A class should have exactly one method', 'У класса должен быть ровно один метод'),
        L('A module should be as small as possible', 'Модуль должен быть как можно меньше'),
        L('A class should have only one public method', 'У класса должен быть только один публичный метод'),
        L('A module should have one reason to change', 'У модуля должна быть одна причина для изменения')
      ],
      correctIndex: 3,
      explanation: L(
        'One reason to change means one group of stakeholders and one kind of requirement. A class that validates, calculates the price, saves the order and sends the email has four reasons to change, and every one of them drags the others into the review.',
        'Одна причина для изменения — это одна группа заинтересованных и один вид требований. У класса, который валидирует, считает цену, сохраняет заказ и отправляет письмо, четыре причины для изменения, и каждая из них тянет остальные в ревью.'
      ),
    },
    {
      id: 'oop-q18',
      question: L(
        'An OrderManager validates the order, computes the total, saves it and sends the receipt. How do you apply the Single Responsibility Principle?',
        'OrderManager валидирует заказ, считает итог, сохраняет его и отправляет письмо. Как применить принцип единственной ответственности?'
      ),
      options: [
        L('Move the four steps into four private methods of the same class', 'Перенести четыре шага в четыре приватных метода того же класса'),
        L('Split it into a validator, a price calculator, a store and an email service, and keep a thin use case that calls them in order', 'Разделить его на валидатор, калькулятор цены, хранилище и почтовый сервис и оставить тонкий сценарий, вызывающий их по порядку'),
        L('Make all the methods static, so the class holds no state', 'Сделать все методы статическими, чтобы класс не хранил состояние'),
        L('Rename the class to OrderService and add a comment about the responsibility', 'Переименовать класс в OrderService и добавить комментарий про ответственность')
      ],
      correctIndex: 1,
      explanation: L(
        'The point of the principle is the separation and not the renaming: extracting the four responsibilities into focused collaborators means a change in the email provider cannot break the price calculation. A thin use case that only calls the steps in order is left to describe the flow.',
        'Смысл принципа в разделении, а не в переименовании: выделение четырёх обязанностей в узких компонентов означает, что смена почтового провайдера не сломает расчёт цены. Тонкий сценарий, который только вызывает шаги по порядку, остаётся описанием потока.'
      ),
    },
    {
      id: 'oop-q19',
      question: L('What does the Open/Closed Principle state?', 'Что утверждает принцип открыт/закрыт?'),
      options: [
        L('The methods of a class should be closed for extension and open for modification', 'Методы класса должны быть закрыты для расширения и открыты для изменения'),
        L('The classes of a module should be open for extension and closed for modification', 'Классы модуля должны быть открыты для расширения и закрыты для изменения'),
        L('A module should stay open until the day it is released', 'Модуль должен оставаться открытым до дня релиза'),
        L('Only the classes that are not used anywhere else may be modified', 'Изменять можно только те классы, которые больше нигде не используются')
      ],
      correctIndex: 1,
      explanation: L(
        'A module should accept new behaviour through extension, without touching the code that already works. If every new discount type means a new if inside the cart, the module is closed for extension and has to be modified every time.',
        'Модуль должен принимать новое поведение через расширение, не трогая код, который уже работает. Если каждый новый вид скидки — это новый if внутри корзины, модуль закрыт для расширения и его приходится менять каждый раз.'
      ),
    },
    {
      id: 'oop-q20',
      question: L('A cart applies the discounts with a long chain of if statements. How do you make it open for extension?', 'Корзина применяет скидки длинной цепочкой if. Как сделать её открытой для расширения?'),
      options: [
        L('Move the chain into a separate file, so the cart class stays short', 'Перенести цепочку в отдельный файл, чтобы класс корзины остался коротким'),
        L('Add a comment above the chain that lists the available discounts', 'Добавить над цепочкой комментарий со списком доступных скидок'),
        L('Turn every condition into a separate method of the cart', 'Превратить каждое условие в отдельный метод корзины'),
        L('Replace the chain with a strategy object that implements one method, so a new discount is a new class and the cart does not change', 'Заменить цепочку объектом-стратегией с одним методом, тогда новая скидка — это новый класс, а корзина не меняется')
      ],
      correctIndex: 3,
      explanation: L(
        'The cart asks an object with a single method to compute the price and never checks what kind of object it is. A new discount therefore becomes a new class, the cart is not modified, and the old discounts keep working exactly as before.',
        'Корзина спрашивает объект с единственным методом об итоговой цене и никогда не проверяет, что это за объект. Новая скидка становится новым классом, корзина не меняется, а старые скидки продолжают работать как прежде.'
      ),
    },
    {
      id: 'oop-q21',
      question: L('What does the Liskov Substitution Principle require?', 'Что требует принцип подстановки Лисков?'),
      options: [
        L('The subclasses must have the same number of methods as the base class', 'Подклассы должны иметь столько же методов, сколько базовый класс'),
        L('The subclasses must be created before the base class', 'Подклассы должны создаваться раньше базового класса'),
        L('Every subclass must be usable wherever the base class is expected, without breaking the correctness of the program', 'Каждый подкласс должен быть применим везде, где ожидается базовый класс, не нарушая корректность программы'),
        L('The base class must be marked as abstract', 'Базовый класс должен быть помечен как абстрактный')
      ],
      correctIndex: 2,
      explanation: L(
        'If a function accepts a Shape and works correctly with it, it has to work correctly with a Circle and with a Square as well. A subclass that changes the meaning of an inherited method, or throws where the base promises to work, breaks the contract of the base type.',
        'Если функция принимает Shape и работает с ним правильно, она обязана правильно работать и с Circle, и с Square. Подкласс, который меняет смысл унаследованного метода или бросает исключение там, где базовый класс обещал работать, нарушает контракт базового типа.'
      ),
    },
    {
      id: 'oop-q22',
      question: L(
        'Why is a Square that extends a Rectangle with a settable width a classic Liskov violation?',
        'Почему Square, наследующий Rectangle с изменяемой шириной, — классическое нарушение Лисков?'
      ),
      options: [
        L('Because a square cannot be a rectangle at all', 'Потому что квадрат вообще не может быть прямоугольником'),
        L('Because the square needs a constructor of its own', 'Потому что квадрату нужен собственный конструктор'),
        L('Because the base type promises that the width and the height can be set independently, while the square has to keep them equal, so the inherited behaviour no longer works', 'Потому что базовый тип обещает, что ширину и высоту можно задавать независимо, а квадрат обязан держать их равными, и унаследованное поведение перестаёт работать'),
        L('Because the two classes have a different number of the methods', 'Потому что у двух классов разное количество методов')
      ],
      correctIndex: 2,
      explanation: L(
        'The base type says that setting the width changes only the width. In the square that would break the shape, so the subclass has to throw or silently ignore the call, and a caller that works with a Rectangle breaks when it gets a Square. The classic solution is not to inherit at all, but to compose the square out of a side.',
        'Базовый тип обещает, что установка ширины меняет только ширину. В квадрате это сломало бы фигуру, поэтому подкласс обязан бросить исключение или молча проигнорировать вызов, и код, работающий с Rectangle, сломается, получив Square. Классическое решение — не наследовать, а собрать квадрат из стороны.'
      ),
    },
    {
      id: 'oop-q23',
      question: L('What does the Interface Segregation Principle state?', 'Что утверждает принцип разделения интерфейсов?'),
      options: [
        L('A client should depend only on the methods it actually uses, so the fat interfaces have to be split', 'Клиент должен зависеть только от используемых методов, поэтому толстые интерфейсы надо разделять'),
        L('A class should implement as many interfaces as possible', 'Класс должен реализовывать как можно больше интерфейсов'),
        L('Every interface must have exactly three methods', 'В каждом интерфейсе должно быть ровно три метода'),
        L('The interfaces of a module must be declared in one file', 'Интерфейсы модуля должны быть объявлены в одном файле')
      ],
      correctIndex: 0,
      explanation: L(
        'A printer that has to implement print, scan and fax because it lives behind one fat interface is forced to throw for the two methods it does not support. Splitting the interface into Printer, Scanner and Fax lets every client depend only on what it needs.',
        'Принтер, который обязан реализовать print, scan и fax из-за одного толстого интерфейса, вынужден бросать исключение в двух методах, которых он не умеет. Разделение интерфейса на Printer, Scanner и Fax позволяет каждому клиенту зависеть только от нужного.'
      ),
    },
    {
      id: 'oop-q24',
      question: L(
        'A Device interface demands print, scan and fax, so a simple printer throws in two methods. What is the ISP friendly fix?',
        'Интерфейс Device требует print, scan и fax, поэтому простой принтер бросает исключение в двух методах. Какое решение по ISP?'
      ),
      options: [
        L('Make the unused methods return null instead of throwing', 'Сделать так, чтобы неиспользуемые методы возвращали null, а не бросали исключение'),
        L('Mark the methods of the interface as optional', 'Пометить методы интерфейса как необязательные'),
        L('Add a flag to the printer that tells it which methods are disabled', 'Добавить в принтер флаг, который сообщает, какие методы отключены'),
        L('Split it into a Printer, a Scanner and a Fax interface and let the class implement only what it supports', 'Разделить его на Printer, Scanner и Fax и позволить классу реализовать только то, что он умеет')
      ],
      correctIndex: 3,
      explanation: L(
        'One interface per capability is the usual answer: the printer implements Printer, the multifunction device implements all three, and a function that only prints accepts both. The client depends on the small contract it really needs, and nothing has to throw.',
        'Обычный ответ — по одному интерфейсу на возможность: принтер реализует Printer, МФУ реализует все три, а функция печати принимает оба. Клиент зависит от маленького контракта, который ему действительно нужен, и ничего бросать не приходится.'
      ),
    },
    {
      id: 'oop-q25',
      question: L('What does the Dependency Inversion Principle state?', 'Что утверждает принцип инверсии зависимостей?'),
      options: [
        L('The dependencies have to be created inside the class that uses them', 'Зависимости должны создаваться внутри класса, который их использует'),
        L('The abstractions have to depend on the concrete implementations', 'Абстракции должны зависеть от конкретных реализаций'),
        L('The high level modules must not depend on the low level modules, both of them have to depend on the abstractions', 'Модули высокого уровня не должны зависеть от модулей низкого уровня: оба зависят от абстракций'),
        L('The concrete classes have to be final and cannot be extended', 'Конкретные классы должны быть финальными и не наследоваться')
      ],
      correctIndex: 2,
      explanation: L(
        'A service should depend on an interface of the repository and not on the concrete SQL implementation, and the implementation has to be handed in from the outside. The high level business rules then stay independent of the low level storage details.',
        'Сервис должен зависеть от интерфейса репозитория, а не от конкретной SQL-реализации, и реализацию нужно передавать снаружи. Тогда правила бизнеса высокого уровня не зависят от деталей хранения низкого уровня.'
      ),
    },
    {
      id: 'oop-q26',
      question: L('How do you apply the Dependency Inversion Principle to a service that saves users?', 'Как применить принцип инверсии зависимостей к сервису, который сохраняет пользователей?'),
      options: [
        L('Type the constructor parameter as the repository interface and let the caller pass the implementation, so a fake can be used in the tests', 'Типизировать параметр конструктора интерфейсом репозитория и позволить вызывающему передать реализацию, чтобы в тестах можно было подставить фейк'),
        L('Let the service create an InMemoryUserRepository in its constructor, so the caller does not have to know about it', 'Пусть сервис сам создаёт InMemoryUserRepository в конструкторе, чтобы вызывающий ничего не знал о нём'),
        L('Import the repository directly in the service and call it as a static method', 'Импортировать репозиторий прямо в сервис и вызывать его как статический метод'),
        L('Put the repository into a global variable that the service reads', 'Положить репозиторий в глобальную переменную, которую сервис читает')
      ],
      correctIndex: 0,
      explanation: L(
        'When the constructor takes the interface, the caller chooses the implementation, the test passes a fake, and the production code passes the SQL one. The service keeps the business rules and knows nothing about the storage, and the moment the storage changes only the composition root is touched.',
        'Когда конструктор принимает интерфейс, реализацию выбирает вызывающий, тест подставляет фейк, а продакшн-код — SQL-реализацию. Сервис хранит бизнес-правила и ничего не знает о хранилище, и при смене хранилища меняется только точка сборки.'
      ),
    },
    {
      id: 'oop-q27',
      question: L('What does the Strategy pattern encapsulate?', 'Что инкапсулирует паттерн Стратегия?'),
      options: [
        L('The data storage of the object, so it can be changed at runtime', 'Хранилище данных объекта, чтобы его можно было менять во время выполнения'),
        L('A family of related objects that are created without naming the concrete classes', 'Семейство связанных объектов, создаваемых без указания конкретных классов'),
        L('The way the object is created, so the client does not see the constructor', 'Способ создания объекта, чтобы клиент не видел конструктор'),
        L('A set of interchangeable algorithms behind one common interface', 'Набор взаимозаменяемых алгоритмов за одним общим интерфейсом')
      ],
      correctIndex: 3,
      explanation: L(
        'Every algorithm is a separate object with the same method, and the client keeps a reference to one of them and can replace it at any moment. The client code never branches on the type of the algorithm, so adding a new one touches nothing else.',
        'Каждый алгоритм — отдельный объект с одним и тем же методом, а клиент хранит ссылку на один из них и может заменить её в любой момент. Код клиента никогда не ветвится по типу алгоритма, поэтому добавление нового ничего не затрагивает.'
      ),
    },
    {
      id: 'oop-q28',
      question: L('A cart holds a pricing strategy and exposes setStrategy(). What does that give you?', 'Корзина хранит стратегию расчёта и предоставляет setStrategy(). Что это даёт?'),
      options: [
        L('The cart can be serialised into JSON without losing the strategy', 'Корзину можно сериализовать в JSON, не потеряв стратегию'),
        L('The cart can change the pricing rule at runtime without a single change in the cart code', 'Корзина может менять правило расчёта во время выполнения, не меняя ни строки в коде корзины'),
        L('The cart does not need any import of the strategy types', 'Корзине не нужен никакой импорт типов стратегии'),
        L('The strategy can be used without being instantiated', 'Стратегию можно использовать, не инстанцируя её')
      ],
      correctIndex: 1,
      explanation: L(
        'The cart asks the strategy for the price and never checks what it is, so switching the rule is one call at runtime. That is the open closed principle in practice: a new pricing rule is a new class, and the cart is not modified.',
        'Корзина спрашивает у стратегии цену и не проверяет, что это за стратегия, поэтому смена правила — это один вызов во время выполнения. Это и есть принцип открытости на практике: новое правило расчёта — новый класс, а корзина не меняется.'
      ),
    },
    {
      id: 'oop-q29',
      question: L('What is a factory function in JavaScript?', 'Что такое функция-фабрика в JavaScript?'),
      options: [
        L('A function that creates the instances with the new keyword behind the scenes', 'Функция, которая создаёт экземпляры через new под капотом'),
        L('A special constructor that may only be called once', 'Особый конструктор, который можно вызвать только один раз'),
        L('A function that copies the properties of one object into another', 'Функция, которая копирует свойства одного объекта в другой'),
        L('A function that returns an object and hides the details of the construction', 'Функция, которая возвращает объект и прячет детали создания')
      ],
      correctIndex: 3,
      explanation: L(
        'A factory function returns a plain object with the methods you want, and the closure keeps the private data out of reach. It needs no new and no this, and it is the right choice when there is no meaningful type hierarchy.',
        'Функция-фабрика возвращает обычный объект с нужными методами, а замыкание прячет приватные данные. Она не требует ни new, ни this, и это правильный выбор, когда нет содержательной иерархии типов.'
      ),
    },
    {
      id: 'oop-q30',
      question: L('What does the Abstract Factory pattern give you?', 'Что даёт паттерн Абстрактная фабрика?'),
      options: [
        L('A single object that is guaranteed to exist only once', 'Единственный объект, который гарантированно существует в одном экземпляре'),
        L('A clone of an existing object with the same state', 'Клон существующего объекта с тем же состоянием'),
        L('A family of related objects that are created without naming the concrete classes', 'Семейство связанных объектов, создаваемых без указания конкретных классов'),
        L('A simplified interface over a complex subsystem', 'Упрощённый интерфейс над сложной подсистемой')
      ],
      correctIndex: 2,
      explanation: L(
        'The factory creates a whole family of objects that belong together, for example a button and an input of the same visual style, and the client only knows the abstract types. That keeps the products of one family consistent with each other.',
        'Фабрика создаёт целое семейство объектов, например кнопку и поле ввода одного визуального стиля, а клиент знает только абстрактные типы. Так изделия одного семейства остаются согласованными между собой.'
      ),
    },
    {
      id: 'oop-q31',
      question: L('What does the Observer pattern describe?', 'Что описывает паттерн Наблюдатель?'),
      options: [
        L('A class that watches another class and copies its fields', 'Класс, который наблюдает за другим классом и копирует его поля'),
        L('A pattern that gives one object a second interface to look at the data from the side', 'Паттерн, который даёт одному объекту второй интерфейс, чтобы смотреть на данные сбоку'),
        L('A subject that notifies its subscribers when its state changes, which is the basis of every event system', 'Субъект, который уведомляет подписчиков об изменении состояния, — основа любой событийной системы'),
        L('A pattern that replaces a complex subsystem with one simple interface', 'Паттерн, который заменяет сложную подсистему одним простым интерфейсом')
      ],
      correctIndex: 2,
      explanation: L(
        'The subject keeps a list of subscribers and calls them when something happens, so the sender does not know who listens and the listener does not poll. It is the model behind EventEmitter, the DOM events and every pub sub library.',
        'Субъект хранит список подписчиков и вызывает их, когда что-то происходит, поэтому отправитель не знает, кто слушает, а слушатель не опрашивает. Это модель, лежащая в основе EventEmitter, событий DOM и любой библиотеки pub sub.'
      ),
    },
    {
      id: 'oop-q32',
      question: L('Why does an emitter copy the list of handlers before it calls them?', 'Почему эмиттер копирует список обработчиков перед вызовом?'),
      options: [
        L('Because a handler may subscribe or unsubscribe during the call, and that must not change the list that is being walked', 'Потому что обработчик может подписаться или отписаться во время вызова, и это не должно менять список, по которому идёт обход'),
        L('To sort the handlers by the priority', 'Чтобы отсортировать обработчики по приоритету'),
        L('To make sure the list is not empty before the first call', 'Чтобы убедиться, что список не пуст перед первым вызовом'),
        L('To be able to run the handlers in parallel', 'Чтобы иметь возможность выполнять обработчики параллельно')
      ],
      correctIndex: 0,
      explanation: L(
        'A listener that registers itself or removes another one while the emission is running would otherwise mutate the collection that is being iterated, and some of the handlers would be skipped or called twice. A copy of the list makes the emission predictable.',
        'Слушатель, который регистрирует себя или снимает другого во время рассылки, иначе изменил бы коллекцию, по которой идёт обход, и часть обработчиков пропустилась бы или вызвалась дважды. Копия списка делает рассылку предсказуемой.'
      ),
    },
    {
      id: 'oop-q33',
      question: L('What is the role of a repository?', 'Какова роль репозитория?'),
      options: [
        L('It is a cache that keeps the most recently used records in memory', 'Это кэш, который держит в памяти недавно использованные записи'),
        L('It validates the business rules of the domain', 'Он проверяет бизнес-правила предметной области'),
        L('It is a base class that the entity classes extend', 'Это базовый класс, который наследуют классы сущностей'),
        L('It is the only place that knows how the data is stored, and it hands out the data through a stable interface', 'Это единственное место, которое знает, как хранятся данные, и выдаёт их через стабильный интерфейс')
      ],
      correctIndex: 3,
      explanation: L(
        'The service asks the repository for a user and the repository decides whether the answer comes from an array, a SQL database or an HTTP API. The shape of the storage can change then, and the service does not notice.',
        'Сервис просит у репозитория пользователя, а репозиторий решает, придёт ответ из массива, из SQL-базы или по HTTP API. Форма хранилища может измениться, а сервис этого даже не заметит.'
      ),
    },
    {
      id: 'oop-q34',
      question: L(
        'Why should an in-memory repository expose the same asynchronous methods as a database one?',
        'Почему репозиторий в памяти должен предоставлять те же асинхронные методы, что и репозиторий базы данных?'
      ),
      options: [
        L('Because the callers of the repository must not have to be changed when the storage is replaced', 'Потому что вызывающим репозиторий не приходится меняться, когда хранилище заменяют'),
        L('Because the async keyword makes the code shorter', 'Потому что ключевое слово async делает код короче'),
        L('Because the async version runs faster on a big data set', 'Потому что асинхронная версия быстрее на больших наборах данных'),
        L('Because TypeScript cannot type a synchronous method that returns a value', 'Потому что TypeScript не умеет типизировать синхронный метод, возвращающий значение')
      ],
      correctIndex: 0,
      explanation: L(
        'The contract of the service is a promise, and that contract does not change when the storage behind it changes. If the in-memory version were synchronous, every caller would need a rewrite the day the real database arrives.',
        'Контракт сервиса — это промис, и он не меняется, когда меняется хранилище за ним. Если бы версия в памяти была синхронной, каждому вызывающему пришлось бы переписывать код в день, когда появится настоящая база.'
      ),
    },
    {
      id: 'oop-q35',
      question: L('What does the Decorator pattern do?', 'Что делает паттерн Декоратор?'),
      options: [
        L('It replaces the object with a completely new implementation of the same interface', 'Он заменяет объект полностью новой реализацией того же интерфейса'),
        L('It wraps an object and adds behaviour to it without changing its interface', 'Он оборачивает объект и добавляет к нему поведение, не меняя его интерфейс'),
        L('It converts the interface of one object into the interface another client expects', 'Он преобразует интерфейс одного объекта в интерфейс, который ожидает другой клиент'),
        L('It gives the class a second interface to look at the object from the side', 'Он даёт классу второй интерфейс, чтобы смотреть на объект сбоку')
      ],
      correctIndex: 1,
      explanation: L(
        'The decorator holds the original object and forwards the calls to it, adding a log line, a cache or a retry on the way. The client still sees the same interface, so the decorated object can be passed anywhere the original one was expected.',
        'Декоратор держит исходный объект и проксирует ему вызовы, добавляя по дороге логирование, кэш или повтор попытки. Клиент видит тот же интерфейс, поэтому декорированный объект можно передать туда же, куда шёл исходный.'
      ),
    },
    {
      id: 'oop-q36',
      question: L('What is the advantage of a decorator over a subclass that adds the same behaviour?', 'В чём преимущество декоратора перед подклассом, который добавляет то же поведение?'),
      options: [
        L('The decorator is faster, because it does not touch the prototype chain', 'Декоратор быстрее, потому что не трогает цепочку прототипов'),
        L('The decorator hides the type of the object, so the client cannot depend on it', 'Декоратор скрывает тип объекта, поэтому клиент не может на него положиться'),
        L('The decorator can change the interface of the object, which a subclass cannot', 'Декоратор может изменить интерфейс объекта, что подклассу недоступно'),
        L('The decorator lets you combine several behaviours at runtime, and the order of the wrappers is visible in the code', 'Декоратор позволяет комбинировать несколько поведений во время выполнения, и порядок обёрток виден в коде')
      ],
      correctIndex: 3,
      explanation: L(
        'You can wrap a repository in a logging decorator and then in a caching one, and take both off again, all at runtime. A hierarchy of subclasses would force you to write a class for every combination, and the combinations explode quickly.',
        'Репозиторий можно обернуть в декоратор логирования, а затем в декоратор кэширования, и снять оба в любой момент, всё во время выполнения. Иерархия подклассов заставила бы писать класс под каждую комбинацию, а комбинаций быстро становится много.'
      ),
    },
    {
      id: 'oop-q37',
      question: L('What does the Singleton pattern guarantee, and what is its main cost?', 'Что гарантирует паттерн Одиночка и в чём его главная цена?'),
      options: [
        L('It guarantees that the object is immutable, so it is safe to share', 'Он гарантирует, что объект неизменяем, поэтому его безопасно разделять'),
        L('It guarantees that only one thread can use the object at a time', 'Он гарантирует, что только один поток может работать с объектом'),
        L('It guarantees one instance with a global access point, but it hides the dependency and keeps the state between the tests', 'Он гарантирует один экземпляр с глобальной точкой доступа, но прячет зависимость и сохраняет состояние между тестами'),
        L('It guarantees that the object is garbage collected as soon as it is not used', 'Он гарантирует, что объект будет собран сборщиком мусора, как только он не нужен')
      ],
      correctIndex: 2,
      explanation: L(
        'The static getter returns the same instance every time, which is convenient for a read only configuration. The price is that the dependency is invisible, the state leaks from one test into the next, and the test needs a special way to reset it.',
        'Статический геттер каждый раз возвращает один и тот же экземпляр, что удобно для конфигурации только для чтения. Цена в том, что зависимость становится невидимой, состояние перетекает из одного теста в другой, а тесту нужен особый способ сбросить его.'
      ),
    },
    {
      id: 'oop-q38',
      question: L('What makes a class a value object?', 'Что делает класс объектом-значением?'),
      options: [
        L('It is a class with exactly one public field', 'Это класс ровно с одним публичным полем'),
        L('It is a class that inherits from a base value class', 'Это класс, наследующий базовый класс значения'),
        L('It is compared by its value and not by its identity, and it is usually immutable', 'Его сравнивают по значению, а не по идентичности, и он обычно неизменяем'),
        L('It is a class that lives in a global registry, so only one instance exists', 'Это класс, живущий в глобальном реестре, поэтому существует в одном экземпляре')
      ],
      correctIndex: 2,
      explanation: L(
        'Two Money objects with the same amount and the same currency are equal, even though they are two different objects. The value object is immutable and every operation returns a new instance, so it can be shared and compared without surprises.',
        'Два объекта Money с одинаковой суммой и одинаковой валютой равны, хотя это два разных объекта. Объект-значение неизменяем, и каждая операция возвращает новый экземпляр, поэтому его можно свободно разделять и сравнивать.'
      ),
    },
    {
      id: 'oop-q39',
      question: L(
        'Why does a Money class store the amount as an integer number of minor units, like 1250 for 12.50?',
        'Почему класс Money хранит сумму целым числом минорных единиц, например 1250 вместо 12.50?'
      ),
      options: [
        L('Because the integers take less memory than the floats', 'Потому что целые числа занимают меньше памяти, чем float'),
        L('Because the currency code cannot be converted into a number', 'Потому что код валюты нельзя преобразовать в число'),
        L('Because the JavaScript numbers are limited to the integer range', 'Потому что числа в JavaScript ограничены целочисленным диапазоном'),
        L('Because the floating point numbers cannot represent 0.1 exactly, and the arithmetic in the integers never drifts', 'Потому что числа с плавающей точкой не представляют 0.1 точно, а арифметика в целых не накапливает ошибку')
      ],
      correctIndex: 3,
      explanation: L(
        'Adding 19.99 and 5.01 in the floating point gives a value that is not exactly 25.00, and the error accumulates with every operation. The integer cents make the arithmetic exact, and the conversion to the decimal form happens only when the value is formatted.',
        'Сложение 19.99 и 5.01 во float даёт не совсем 25.00, и ошибка накапливается с каждой операцией. Целые минорные единицы делают арифметику точной, а перевод в десятичный вид происходит только при форматировании.'
      ),
    },
    {
      id: 'oop-q40',
      question: L('What does it mean that a class is immutable?', 'Что означает, что класс неизменяем?'),
      options: [
        L('Its fields are private, but the methods can still change them', 'Его поля приватны, но методы всё равно могут их менять'),
        L('The object is frozen, so it can be used as a key of a Map', 'Объект заморожен, поэтому его можно использовать как ключ в Map'),
        L('The class has no setters, so the fields are always undefined', 'У класса нет сеттеров, поэтому поля всегда undefined'),
        L('Its fields cannot be changed after the construction, so every operation returns a new object', 'Его поля нельзя изменить после создания, поэтому каждая операция возвращает новый объект')
      ],
      correctIndex: 3,
      explanation: L(
        'The state of an immutable object never changes after it is created, so the operations cannot surprise anybody who holds a reference to it. That is why an immutable value can be shared between threads, cached, or used as a key of a Map.',
        'Состояние неизменяемого объекта не меняется после создания, поэтому операции не могут удивить того, кто держит ссылку. Именно поэтому неизменяемое значение можно разделять, кэшировать или использовать как ключ в Map.'
      ),
    },
    {
      id: 'oop-q41',
      question: L('What does `Object.freeze(instance)` do, and what does it not do?', 'Что делает `Object.freeze(instance)` и чего он не делает?'),
      options: [
        L('It makes the object immutable, and it also prevents the prototype from being changed', 'Он делает объект неизменяемым и запрещает менять прототип'),
        L('It makes the properties of the object read only, but it is shallow: the nested objects can still be changed', 'Он делает свойства объекта доступными только для чтения, но действует неглубоко: вложенные объекты всё ещё можно менять'),
        L('It deletes all the methods of the object and leaves only the fields', 'Он удаляет все методы объекта и оставляет только поля'),
        L('It copies the object, so the original stays writable', 'Он копирует объект, поэтому оригинал остаётся доступным для записи')
      ],
      correctIndex: 1,
      explanation: L(
        'Freezing makes the own properties of the object read only and blocks the changes of the object itself, but the values of the properties are only frozen one level deep. A nested array still has to be frozen on its own, otherwise it stays mutable.',
        'Freezing делает собственные свойства объекта доступными только для чтения и запрещает менять сам объект, но значения свойств замораживаются лишь на один уровень вглубь. Вложенный массив надо замораживать отдельно, иначе он останется изменяемым.'
      ),
    },
    {
      id: 'oop-q42',
      question: L('How do you change one item of a nested state without mutating the original?', 'Как изменить один элемент вложенного состояния, не мутируя исходное?'),
      options: [
        L('Copy every level you change: the cart, the items array and only the affected item, with the spread operator', 'Скопировать каждый изменяемый уровень: корзину, массив items и только затронутый элемент, через оператор расширения'),
        L('cart.items[0].qty = 3, and then you hope that nobody kept a reference to the old cart', 'cart.items[0].qty = 3, и дальше вы надеетесь, что никто не сохранил ссылку на старую корзину'),
        L('Use splice on the items array and change the item in place', 'Вызвать splice на массиве items и изменить элемент на месте'),
        L('Convert the state to JSON, change it and parse it back', 'Преобразовать состояние в JSON, изменить его и распарсить обратно')
      ],
      correctIndex: 0,
      explanation: L(
        'The spread operator builds a new array and a new object, and the untouched items keep their identity, which keeps the reference comparison useful for the memoization. The original cart is still there, unchanged, so the previous state can be compared with the new one.',
        'Оператор расширения создаёт новый массив и новый объект, а нетронутые элементы сохраняют идентичность, поэтому сравнение по ссылке остаётся полезным для мемоизации. Исходная корзина остаётся на месте и не меняется, значит старое состояние можно сравнить с новым.'
      ),
    },
    {
      id: 'oop-q43',
      question: L('How do the JavaScript classes relate to the prototypes?', 'Как классы в JavaScript соотносятся с прототипами?'),
      options: [
        L('They are a completely different mechanism, the prototypes are only used by the old code', 'Это совершенно другой механизм, прототипы использует только старый код'),
        L('They create a copy of every method for every instance', 'Они создают копию каждого метода для каждого экземпляра'),
        L('They are syntactic sugar over the prototype mechanism, and the class syntax is translated into it', 'Они — синтаксический сахар над механизмом прототипов, и синтаксис классов переводится в него'),
        L('They are compiled into the functions with the new keyword behind the scenes', 'Они компилируются в функции с new под капотом')
      ],
      correctIndex: 2,
      explanation: L(
        'A class is a nicer way to write the constructor and the prototype, the runtime still works with the prototype chain. The methods live on the prototype and are shared by all the instances, which is why the class methods are not enumerable in the for-in loop.',
        'Класс — это удобная запись конструктора и прототипа, во время выполнения всё равно работает цепочка прототипов. Методы живут на прототипе и общие для всех экземпляров, поэтому методы класса не перечисляются в цикле for-in.'
      ),
    },
    {
      id: 'oop-q44',
      question: L('What does `Object.create(proto)` do?', 'Что делает `Object.create(proto)`?'),
      options: [
        L('It creates a copy of the object proto, so the two do not share anything afterwards', 'Он создаёт копию объекта proto, и после этого они ничего не разделяют'),
        L('It creates a new object whose prototype is proto, so the missing properties are found through the chain', 'Он создаёт новый объект, прототипом которого является proto, так что недостающие свойства находятся по цепочке'),
        L('It creates an empty object with a completely empty prototype', 'Он создаёт пустой объект с совершенно пустым прототипом'),
        L('It makes the object proto a constructor of the new object', 'Он делает объект proto конструктором нового объекта')
      ],
      correctIndex: 1,
      explanation: L(
        'The new object has no own properties, and everything it does not have is looked up in proto and then in the prototype of proto. That is the delegation model: the object does not own the behaviour, it borrows it through the chain.',
        'У нового объекта нет собственных свойств, и всё, чего у него нет, ищется в proto, а затем в прототипе proto. Это модель делегирования: объект не владеет поведением, он берёт его по цепочке.'
      ),
    },
    {
      id: 'oop-q45',
      question: L('What does `class B extends A` set up, and what does `b instanceof A` check?', 'Что устанавливает `class B extends A` и что проверяет `b instanceof A`?'),
      options: [
        L('It copies the methods of A into B, and the instanceof check compares the names of the constructors', 'Она копирует методы A в B, а instanceof сравнивает имена конструкторов'),
        L('It sets up the prototype chain, so the instances of B inherit from A, and the instanceof check looks at that chain', 'Она устанавливает цепочку прототипов, так что экземпляры B наследуют от A, и проверка instanceof смотрит на эту цепочку'),
        L('It creates a copy of A with a new name, and the instanceof check compares the field values', 'Она создаёт копию A с новым именем, а instanceof сравнивает значения полей'),
        L('It links the two classes only for the type checker, which disappears at runtime', 'Она связывает классы только для проверки типов, которая исчезает во время выполнения')
      ],
      correctIndex: 1,
      explanation: L(
        'The prototype of B is A.prototype, so an instance of B finds the methods of A through the chain, and the instanceof operator walks the same chain to decide whether the object is an instance of A. That is why it also works with the classes that come from another realm or from another copy of a library.',
        'Прототипом B становится A.prototype, поэтому экземпляр B находит методы A по цепочке, и оператор instanceof проходит по той же цепочке, решая, является ли объект экземпляром A. Поэтому он работает и с классами из другого контекста или из другой копии библиотеки.'
      ),
    },
    {
      id: 'oop-q46',
      question: L('What does duck typing mean in practice?', 'Что означает утиная типизация на практике?'),
      options: [
        L('The type of an object is checked by the name of its class at runtime', 'Тип объекта проверяется по имени его класса во время выполнения'),
        L('The compatibility is decided by the behaviour: if the object has the methods you call, it fits', 'Совместимость определяется поведением: если у объекта есть те методы, которые вы вызываете, он подходит'),
        L('The object must inherit from a specific base class to be accepted', 'Объект обязан наследоваться от конкретного базового класса, чтобы быть принятым'),
        L('Every object of the same class must have the same shape', 'Все объекты одного класса должны иметь одинаковую форму')
      ],
      correctIndex: 1,
      explanation: L(
        'A function that calls save and find works with any object that has those methods, whatever its class is called. It is the reason the interfaces in TypeScript disappear at runtime and the reason a plain object is often a perfectly good collaborator.',
        'Функция, которая вызывает save и find, работает с любым объектом, у которого есть эти методы, как бы он ни назывался. Поэтому интерфейсы в TypeScript исчезают во время выполнения и обычный объект часто оказывается отличным партнёром.'
      ),
    },
    {
      id: 'oop-q47',
      question: L('Where do the static members of a class live and when do you use them?', 'Где живут статические члены класса и когда их используют?'),
      options: [
        L('On the prototype, so every instance shares one copy', 'На прототипе, поэтому у всех экземпляров одна общая копия'),
        L('On the class itself, and they are used for the factories, the constants and the stateless helpers', 'На самом классе, а используют их для фабрик, констант и вспомогательных функций без состояния'),
        L('Inside every instance, so each object has its own copy', 'Внутри каждого экземпляра, поэтому у каждого объекта своя копия'),
        L('In a global variable that the class reads at the first call', 'В глобальной переменной, которую класс читает при первом вызове')
      ],
      correctIndex: 1,
      explanation: L(
        'A static member belongs to the constructor function and not to the instances, so Math.max or a static factory helper cost nothing per object. The same name in the instances would be a different property on every object.',
        'Статический член принадлежит функции-конструктору, а не экземплярам, поэтому Math.max или статический фабричный помощник не стоят ничего в каждом объекте. Одноимённое свойство в экземплярах было бы отдельным полем у каждого объекта.'
      ),
    },
    {
      id: 'oop-q48',
      question: L('Does JavaScript support method overloading the way Java does?', 'Поддерживает ли JavaScript перегрузку методов, как Java?'),
      options: [
        L('Yes, you can declare the same method several times with different parameters', 'Да, можно объявить один и тот же метод несколько раз с разными параметрами'),
        L('Yes, but only in TypeScript, and only through the interface', 'Да, но только в TypeScript и только через интерфейс'),
        L('No, there is no native overloading: you use optional parameters, type guards, or the overload signatures of TypeScript', 'Нет, нативной перегрузки нет: используют необязательные параметры, проверки типа или сигнатуры перегрузки в TypeScript'),
        L('No, but you can achieve it with a getter and a setter of the same name', 'Нет, но её можно получить геттером и сеттером с одинаковым именем')
      ],
      correctIndex: 2,
      explanation: L(
        'The second definition of a method simply replaces the first one, so there is no native overloading. The usual solutions are optional parameters with a default, a type guard inside the body, or the overload signatures of TypeScript, which are only a typing trick and vanish at runtime.',
        'Второе определение метода просто заменяет первое, поэтому нативной перегрузки нет. Обычные решения — необязательные параметры со значением по умолчанию, проверка типа внутри тела или сигнатуры перегрузки в TypeScript, которые существуют только для типов и исчезают во время выполнения.'
      ),
    },
    {
      id: 'oop-q49',
      question: L('What does the Adapter pattern do?', 'Что делает паттерн Адаптер?'),
      options: [
        L('It adds a new behaviour to an object without changing its interface', 'Он добавляет новое поведение к объекту, не меняя его интерфейс'),
        L('It gives a simplified interface over a complex subsystem', 'Он даёт упрощённый интерфейс над сложной подсистемой'),
        L('It creates a family of related objects without naming the concrete classes', 'Он создаёт семейство связанных объектов без указания конкретных классов'),
        L('It converts the interface of an existing object into the interface another client expects', 'Он преобразует интерфейс существующего объекта в интерфейс, который ожидает другой клиент')
      ],
      correctIndex: 3,
      explanation: L(
        'The adapter holds the object with the old interface and exposes the new one, translating the calls on the way. It is the classic way to plug a third party library into your own code without letting its shape leak into the domain.',
        'Адаптер держит объект со старым интерфейсом и предоставляет новый, переводя вызовы по дороге. Это классический способ подключить стороннюю библиотеку к своему коду, не давая её форме протекать в доменную часть.'
      ),
    },
    {
      id: 'oop-q50',
      question: L('What does the Facade pattern give the client?', 'Что даёт клиенту паттерн Фасад?'),
      options: [
        L('The internals of the subsystem, so it can reach every part of it directly', 'Внутренности подсистемы, чтобы можно было добраться до каждой её части напрямую'),
        L('A second interface to look at the subsystem from the side', 'Второй интерфейс, чтобы смотреть на подсистему сбоку'),
        L('A copy of the subsystem, so the original stays untouched', 'Копию подсистемы, чтобы оригинал остался нетронутым'),
        L('A single simple high level interface over a complex subsystem', 'Единый простой интерфейс высокого уровня над сложной подсистемой')
      ],
      correctIndex: 3,
      explanation: L(
        'The facade hides the ordering, the wiring and the error handling of several collaborating classes behind one call, so the client does not have to know that three services are involved. The subsystem stays completely usable on its own.',
        'Фасад прячет за одним вызовом порядок, связывание и обработку ошибок нескольких сотрудничающих классов, поэтому клиенту не нужно знать, что задействованы три сервиса. Подсистема при этом остаётся полностью работоспособной сама по себе.'
      ),
    },
  ],
};