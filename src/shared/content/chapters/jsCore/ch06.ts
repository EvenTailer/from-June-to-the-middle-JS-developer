import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh06: Chapter = {
  id: 'js-core-ch6',
  title: L('Classes, encapsulation and immutability', 'Классы, инкапсуляция и иммутабельность'),
  summary: L(
    'What the class keyword really creates, how private fields enforce encapsulation at the language level, how inheritance and composition compare, and how freezing plus value equality give you immutable state.',
    'Что на самом деле создаёт ключевое слово class, как приватные поля дают инкапсуляцию на уровне языка, чем наследование отличается от композиции и как заморозка вместе со сравнением по значению дают иммутабельное состояние.'
  ),
  sections: [
    {
      id: 'js-core-ch6-s1',
      title: L('Classes are syntax over prototypes', 'Классы — это синтаксис над прототипами'),
      body: L(
        'A class is a function with a prototype object attached. When you write class Point { ... } the engine creates a constructor function named Point, gives it a prototype property and links the two together. Instances made with new inherit from that prototype, which is the mechanism a constructor function has always used. Nothing underneath is new: class Point { } and function Point() {} build the same kind of object graph, and Object.getPrototypeOf(instance) === Point.prototype holds in both cases.\n\nThe body of a class is always strict mode, whether or not the file carries a "use strict" directive, and the strictness covers the whole body including every method. A class is also not hoisted in the usable sense: the name exists from the start of the scope but stays in the temporal dead zone until the declaration is evaluated, so touching the class earlier throws a ReferenceError. A function declaration behaves the opposite way, it is hoisted and callable immediately.\n\nCalling a class constructor without new is a TypeError, and the check happens before the constructor body runs. That removes the classic mistake of a constructor function being called as a plain function, which used to run happily in sloppy mode and quietly assigned properties to the global object. The other addition is the static block, a piece of code inside the class body that runs once when the class is defined, which gives you a place to initialise static state that depends on other static state.',
        'Класс — это функция, у которой есть объект-прототип. Когда вы пишете class Point { ... }, движок создаёт функцию-конструктор с именем Point, даёт ей свойство prototype и связывает их между собой. Экземпляры, созданные через new, наследуются от этого прототипа — тот же самый механизм, который всегда использовали функции-конструкторы. Под классами нет ничего нового: class Point { } и function Point() {} дают одинаковую структуру объектов, и в обоих случаях Object.getPrototypeOf(instance) === Point.prototype.\n\nТело класса всегда работает в строгом режиме, независимо от того, есть ли в файле директива "use strict", и строгость действует на всё тело, включая тела методов. Класс также не поднимается в привычном смысле: имя класса существует в области видимости с самого начала, но остаётся в временной мёртвой зоне, пока объявление не будет вычислено, поэтому обращение к классу раньше даёт ReferenceError. Объявление функции ведёт себя наоборот: оно поднимается и доступно сразу.\n\nВызов конструктора класса без new — это TypeError, и проверка происходит до того, как начнёт выполняться тело конструктора. Так исчезает классическая ошибка, когда функцию-конструктор вызывали как обычную функцию: в нестрогом режиме это работало и молча присваивало свойства глобальному объекту. Второе добавление — статический блок, кусок кода в теле класса, который выполняется один раз при определении класса и служит местом для инициализации статического состояния, зависящего от другого статического состояния.'
      ),
      bullets: [
        L('class Foo {} creates a constructor function plus a Foo.prototype object.', 'class Foo {} создаёт функцию-конструктор и объект Foo.prototype.'),
        L('Object.getPrototypeOf(new Foo()) === Foo.prototype.', 'Object.getPrototypeOf(new Foo()) === Foo.prototype.'),
        L('The class body is always strict mode, even without the directive.', 'Тело класса всегда в строгом режиме, даже без директивы.'),
        L('A class name stays in the temporal dead zone until its declaration is evaluated.', 'Имя класса остаётся в временной мёртвой зоне до вычисления объявления.'),
        L('Calling a class without new throws a TypeError before the body runs.', 'Вызов класса без new бросает TypeError до выполнения тела.'),
        L('A static block runs once, in order, when the class is defined.', 'Статический блок выполняется один раз, в порядке объявления, при определении класса.'),
      ],
      code: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const p = new Point(1, 2);
Object.getPrototypeOf(p) === Point.prototype; // true
Point.prototype.constructor === Point;         // true

try { Point(1, 2); } catch (e) { e.constructor.name; } // 'TypeError'

class Config {
  static registry = new Map();
  static {
    Config.registry.set('default', { retries: 3 });
  }
}
Config.registry.get('default'); // { retries: 3 }`,
      table: {
        caption: L('Class versus a constructor function', 'Класс против функции-конструктора'),
        headers: [L('Aspect', 'Аспект'), L('class', 'class'), L('function constructor', 'функция-конструктор')],
        rows: [
          [L('Called without new', 'Вызов без new'), L('TypeError', 'TypeError'), L('Works, returns undefined', 'Работает, возвращает undefined')],
          [L('Body mode', 'Режим тела'), L('Always strict', 'Всегда строгий'), L('Depends on the file', 'Зависит от файла')],
          [L('Hoisting', 'Поднятие'), L('Temporal dead zone', 'Временная мёртвая зона'), L('Fully hoisted', 'Полностью поднимается')],
          [L('Prototype', 'Прототип'), L('Created automatically', 'Создаётся автоматически'), L('Must be set by hand', 'Задаётся вручную')],
          [L('Method enumerability', 'Перечислимость методов'), L('Non-enumerable', 'Неперечислимы'), L('Enumerable by default', 'Перечислимы по умолчанию')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Classes are not hoisted', 'Классы не поднимаются'),
          text: L(
            'Putting a class declaration at the bottom of a file does not make it available at the top. The binding lives in the temporal dead zone, so the reference throws a ReferenceError before the class is defined. If you need the value earlier, move the declaration or export a factory function instead.',
            'Объявление класса в конце файла не делает его доступным в начале. Связка живёт во временной мёртвой зоне, поэтому обращение до определения класса бросает ReferenceError. Если значение нужно раньше, перенесите объявление или экспортируйте фабричную функцию.'
          ),
        },
        {
          tone: 'tip',
          title: L('Static blocks replace IIFEs', 'Статические блоки заменяют IIFE'),
          text: L(
            'The old pattern of assigning a static field from an immediately invoked function outside the class body works, but it runs after the class exists and cannot see private static members. A static block runs inside the class body, in declaration order, and can touch #private static fields.',
            'Старый приём с присваиванием статического поля из немедленно вызываемой функции вне тела класса работает, но выполняется после создания класса и не видит приватные статические поля. Статический блок выполняется внутри тела класса, в порядке объявления, и может обращаться к приватным статическим полям.'
          ),
        },
      ],
      takeaway: L(
        'A class is a constructor function with a prototype, it is always strict, it is never hoisted and it refuses to be called without new.',
        'Класс — это функция-конструктор с прототипом: он всегда в строгом режиме, никогда не поднимается и не вызывается без new.'
      ),
      seeAlso: [
        L('Chapter 5: objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
        L('Chapter 3: hoisting and the temporal dead zone', 'Глава 3: поднятие и временная мёртвая зона'),
        L('Section 6-2: where methods and static members live', 'Секция 6-2: где живут методы и статические члены'),
      ],
    },
    {
      id: 'js-core-ch6-s2',
      title: L('Methods, static members and the prototype property', 'Методы, статические члены и свойство prototype'),
      body: L(
        'Methods declared in a class body live on the class prototype, so every instance shares one function object. That matters for memory and for the chain: a thousand instances of a class with three methods hold one copy of each method, not three thousand. Inside a regular method this refers to the instance the method was called on, and it is resolved at call time, so detaching a method from its object changes what this is.\n\nStatic members belong to the constructor function rather than to instances. A static method is the right home for factory functions, counters and helpers that need no instance state, while a static field holds state shared by the whole class. Static blocks run in declaration order at class definition time, which makes them the place to initialise static fields that depend on other static fields.\n\nGetters and setters are written with the get and set keywords, and they live on the prototype as accessor descriptors, exactly like properties created with Object.defineProperty. The class syntax is a shorter way to write the same descriptor, and it makes the accessors non-enumerable by default. Assigning to a getter that has no setter throws a TypeError in strict mode, and since every class body is strict, that rule applies to every class you write.',
        'Методы, объявленные в теле класса, живут на прототипе класса, поэтому все экземпляры делят одну и ту же функцию. Это важно и для памяти, и для цепочки: тысяча экземпляров класса с тремя методами хранят по одной копии каждого метода, а не по три тысячи. Внутри обычного метода this указывает на тот экземпляр, у которого метод вызвали, и это определяется в момент вызова, поэтому отсоединение метода от объекта меняет смысл this.\n\nСтатические члены принадлежат самой функции-конструктору, а не экземплярам. Статический метод — правильное место для фабричных функций, счётчиков и помощников, которым не нужно состояние экземпляра, а статическое поле хранит состояние, общее для всего класса. Статические блоки выполняются в порядке объявления в момент определения класса, поэтому именно там инициализируют статические поля, зависящие друг от друга.\n\nГеттеры и сеттеры пишутся ключевыми словами get и set и живут на прототипе как дескрипторы доступа, ровно как свойства, созданные через Object.defineProperty. Синтаксис класса — короткая запись того же самого дескриптора, и по умолчанию он делает аксессоры неперечислимыми. Присваивание геттеру, у которого нет сеттера, бросает TypeError в строгом режиме, а поскольку любое тело класса строгое, это правило действует во всех классах.'
      ),
      bullets: [
        L('Class methods live on the prototype and are shared by all instances.', 'Методы класса живут на прототипе и общие для всех экземпляров.'),
        L('this inside a method is the receiver of the call, resolved at call time.', 'this внутри метода — получатель вызова, определяется в момент вызова.'),
        L('static methods and static fields belong to the constructor, not to instances.', 'Статические методы и поля принадлежат конструктору, а не экземплярам.'),
        L('A static block runs once, in order, when the class is defined.', 'Статический блок выполняется один раз, в порядке, при определении класса.'),
        L('get and set create accessor descriptors on the prototype.', 'get и set создают дескрипторы доступа на прототипе.'),
        L('Assigning to a getter without a setter throws a TypeError in strict mode.', 'Присваивание геттеру без сеттера бросает TypeError в строгом режиме.'),
      ],
      code: `class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  get celsius() { return this._celsius; }   // lives on the prototype
  set celsius(value) { this._celsius = value; }
  describe() { return \`\${this._celsius} C\`; }
}

const a = new Temperature(21);
const b = new Temperature(30);
a.describe === b.describe;                 // true - one shared function
Object.getOwnPropertyNames(Temperature.prototype); // ['constructor','celsius','describe']

class Counter {
  static instances = 0;
  constructor() { Counter.instances += 1; }
  static reset() { Counter.instances = 0; }
}
new Counter();
Counter.instances; // 1`,
      table: {
        caption: L('Where each kind of class member lives', 'Где живёт каждый вид члена класса'),
        headers: [L('Member', 'Член'), L('Lives on', 'Живёт на'), L('Shared', 'Общий')],
        rows: [
          [L('Method', 'Метод'), L('Class.prototype', 'Class.prototype'), L('yes, all instances', 'да, для всех экземпляров')],
          [L('Getter and setter', 'Геттер и сеттер'), L('Class.prototype, as a descriptor', 'Class.prototype, как дескриптор'), L('yes, all instances', 'да, для всех экземпляров')],
          [L('Instance field', 'Поле экземпляра'), L('The instance', 'На экземпляре'), L('no, one per instance', 'нет, по одному на экземпляр')],
          [L('Static method', 'Статический метод'), L('The constructor function', 'На функции-конструкторе'), L('one per class', 'один на класс')],
          [L('Static field', 'Статическое поле'), L('The constructor function', 'На функции-конструкторе'), L('one per class', 'один на класс')],
          [L('Private field', 'Приватное поле'), L('An internal slot of the instance', 'Внутренний слот экземпляра'), L('no, invisible', 'нет, невидимо')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A method is not a bound function', 'Метод не привязан заранее'),
          text: L(
            'Passing obj.describe as a callback loses the receiver, and this inside it becomes undefined. Bind it explicitly, or define the method as an arrow function class field, which captures this at construction time.',
            'Если передать obj.describe как колбэк, получатель теряется, и this внутри становится undefined. Привяжите явно или определите метод как стрелочное поле класса: оно захватывает this в момент создания объекта.'
          ),
        },
      ],
      takeaway: L(
        'Methods live on the prototype and share one function, static members live on the constructor, and get and set create accessor descriptors.',
        'Методы живут на прототипе и делят одну функцию, статические члены — на конструкторе, а get и set создают дескрипторы доступа.'
      ),
      seeAlso: [
        L('Chapter 5: descriptors, getters, setters and enumerability', 'Глава 5: дескрипторы, геттеры, сеттеры и перечислимость'),
        L('Chapter 4: functions, arguments, closures and how this is bound', 'Глава 4: функции, аргументы, замыкания и привязка this'),
        L('Section 6-3: private fields and real encapsulation', 'Секция 6-3: приватные поля и настоящая инкапсуляция'),
      ],
    },
    {
      id: 'js-core-ch6-s3',
      title: L('Private fields and real encapsulation', 'Приватные поля и настоящая инкапсуляция'),
      body: L(
        'A private field declared with a hash prefix is not a property at all. It lives in an internal slot of the object, the engine keeps a list of such slots for each class, and the name is checked at runtime against that list. Code outside the class body cannot read the field, cannot write it and cannot even spell it: writing acc.#balance outside the class is a syntax error caught before the program runs, not a runtime failure.\n\nPrivate methods and private static fields work the same way. A private static field keeps state that belongs to the class rather than to any instance, and no instance can reach it. The practical pattern is private state plus a public accessor: the class decides what can be read and how, and any change to the internal representation stays inside the class. That is real encapsulation, enforced by the language rather than by a naming convention.\n\nAn underscore prefix such as this._name is only a convention. The property is an ordinary one: it is enumerable, it shows up in Object.keys and in JSON.stringify, and anyone can write to it. Private fields also stay invisible to reflective operations, so JSON.stringify of an instance that holds only private state produces an empty object, and structuredClone copies the public properties but drops the private slots and the prototype. If the state has to survive serialisation, expose it through a getter.',
        'Приватное поле, объявленное с префиксом решётки, вообще не является свойством. Оно живёт во внутреннем слоте объекта, движок хранит список таких слотов для каждого класса, а имя проверяется во время выполнения по этому списку. Код вне тела класса не может прочитать поле, не может его записать и даже не может его произнести: обращение вида acc.#balance вне класса — синтаксическая ошибка, которую находят до запуска программы, а не сбой во время выполнения.\n\nПриватные методы и приватные статические поля работают так же. Приватное статическое поле хранит состояние, принадлежащее классу, а не экземпляру, и ни один экземпляр до него не дотянется. Рабочая схема — приватное состояние плюс публичный аксессор: класс сам решает, что можно читать и как, а любое изменение внутреннего представления остаётся внутри класса. Это настоящая инкапсуляция, обеспеченная языком, а не соглашением об именовании.\n\nПрефикс с подчёркиванием, как в this._name, — это только соглашение. Это обычное свойство: оно перечислимо, попадает в Object.keys и в JSON.stringify, и любой может в него записать. Приватные поля также невидимы для рефлексии, поэтому JSON.stringify экземпляра, у которого есть только приватное состояние, даёт пустой объект, а structuredClone копирует публичные свойства, но теряет приватные слоты и прототип класса. Если состояние должно пережить сериализацию, отдайте его через геттер.'
      ),
      bullets: [
        L('#name is an internal slot, not a property: Object.keys never sees it.', '#name — это внутренний слот, а не свойство: Object.keys его не видит.'),
        L('Touching a private field from outside the class is a syntax error.', 'Обращение к приватному полю вне класса — синтаксическая ошибка.'),
        L('Private methods use the same # syntax and cannot be called from outside.', 'Приватные методы используют тот же синтаксис # и недоступны снаружи.'),
        L('A static #field keeps class-wide state that no instance can reach.', 'Статическое #поле хранит состояние класса, недоступное экземплярам.'),
        L('A leading underscore is a convention only and stays fully public.', 'Подчёркивание в начале — только соглашение, поле остаётся публичным.'),
        L('JSON.stringify and structuredClone both ignore private fields.', 'JSON.stringify и structuredClone игнорируют приватные поля.'),
      ],
      code: `class Account {
  #balance = 0;

  constructor(initial) {
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount <= 0) throw new RangeError('amount must be positive');
    this.#balance += amount;
    return this.#balance;
  }

  get balance() { return this.#balance; }
}

const acc = new Account(100);
acc.deposit(50);
acc.balance;            // 150
acc._balance;           // undefined - an underscore is only a convention
JSON.stringify(acc);    // '{}' - private state is invisible to reflection
structuredClone(acc).balance; // undefined - the clone is a plain object, the slot is gone`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Private state disappears when you clone', 'Приватное состояние исчезает при клонировании'),
          text: L(
            'JSON.stringify on an instance with only private fields returns an empty object, and structuredClone produces an object whose private slots are uninitialised. If a class must survive serialisation, expose the state through getters and rebuild it in the constructor.',
            'JSON.stringify экземпляра, у которого есть только приватные поля, вернёт пустой объект, а structuredClone создаст объект с неинициализированными приватными слотами. Если класс должен переживать сериализацию, отдайте состояние через геттеры и восстановите его в конструкторе.'
          ),
        },
        {
          tone: 'tip',
          title: L('Enforce the convention', 'Проверяйте соглашение линтером'),
          text: L(
            'A linter rule that forbids public members with a leading underscore turns the convention into a check. Combined with real private fields for the sensitive parts, the codebase ends up with one honest mechanism instead of two half working ones.',
            'Правило линтера, запрещающее публичные члены с подчёркиванием, превращает соглашение в проверку. Вместе с настоящими приватными полями для чувствительных частей в кодовой базе остаётся один честный механизм вместо двух наполовину работающих.'
          ),
        },
      ],
      takeaway: L(
        'A hash prefix is enforced by the language, an underscore is only a convention, and private fields never reach JSON or structuredClone.',
        'Решётка гарантируется языком, подчёркивание — только соглашение, а приватные поля не попадают ни в JSON, ни в structuredClone.'
      ),
      seeAlso: [
        L('Chapter 5: objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
        L('Section 1-1: shallow copies and nested references', 'Секция 1-1: поверхностные копии и общие вложенные ссылки'),
        L('Section 6-5: freezing, immutability and value equality', 'Секция 6-5: заморозка, иммутабельность и сравнение по значению'),
      ],
    },
    {
      id: 'js-core-ch6-s4',
      title: L('extends, super and the class hierarchy', 'extends, super и иерархия классов'),
      body: L(
        'The extends keyword makes one class inherit from another, and it wires two links: the derived constructor gets the base constructor as its prototype, and Derived.prototype gets Base.prototype. The chain then works exactly like a hand written prototype chain, so a method the derived class does not define is looked up on the base prototype and called with the derived instance as this.\n\nsuper has two jobs. Inside a derived constructor it calls the base constructor, and it must run before the derived constructor touches this, because the base constructor is what creates the instance and what initialises the base fields. Calling super twice is a TypeError. Outside a constructor, super.method() calls the parent implementation of a method, which is how a derived class extends a parent method instead of replacing it outright.\n\nField initialisation follows the chain. When you write new Derived(), the base field initialisers run first, then the derived field initialisers run, and only after that does the derived constructor body continue. That order is why a derived field with the same name shadows the base field, and why reading this before super() throws a ReferenceError: there is no instance to point at yet.\n\nInheritance is not always the right tool. A derived class inherits everything, including behaviour it does not want and cannot remove, and a deep hierarchy turns a small change into a change across many classes. Composition, where a class holds another object and delegates to it, keeps the coupling local and is far easier to test. instanceof answers whether an object is somewhere in a prototype chain, so it returns false across realms and for objects that merely copy the same shape.',
        'Ключевое слово extends делает один класс наследником другого и связывает две ссылки: у производного конструктора базовый конструктор становится прототипом, а у Derived.prototype появляется Base.prototype. Дальше цепочка работает ровно как вручную выстроенная цепочка прототипов, поэтому метод, которого нет в производном классе, ищется на базовом прототипе и вызывается с производным экземпляром в качестве this.\n\nУ super две роли. Внутри производного конструктора он вызывает базовый конструктор, и это должно произойти до того, как производный конструктор обратится к this, потому что базовый конструктор и создаёт экземпляр, и инициализирует базовые поля. Два вызова super дают TypeError. Вне конструктора super.method() вызывает родительскую реализацию метода — так производный класс дополняет метод базового, а не заменяет его целиком.\n\nИнициализация полей следует по цепочке. Когда вы пишете new Derived(), сначала выполняются инициализаторы полей базового класса, затем инициализаторы полей производного, и только после этого продолжается тело производного конструктора. Отсюда правило, что поле производного класса с тем же именем перекрывает базовое, и правило, что обращение к this до super() бросает ReferenceError: экземпляра, на который можно было бы указать, ещё нет.\n\nНаследование — не всегда подходящий инструмент. Производный класс наследует всё, включая поведение, которое ему не нужно и которое нельзя убрать, а глубокая иерархия превращает маленькое изменение в изменение сразу по многим классам. Композиция, при которой класс хранит другой объект и делегирует ему, держит связанность локальной и гораздо проще тестируется. instanceof отвечает на вопрос, есть ли объект в цепочке прототипов, поэтому он возвращает false для объектов из другого realm и для объектов, просто скопировавших ту же форму.'
      ),
      bullets: [
        L('extends links both the constructor chain and the prototype chain.', 'extends связывает и цепочку конструкторов, и цепочку прототипов.'),
        L('super() must be called before this is touched in a derived constructor.', 'super() должен быть вызван до обращения к this в производном конструкторе.'),
        L('Base field initialisers run before the derived constructor body.', 'Инициализаторы полей базового класса выполняются до тела производного конструктора.'),
        L('super.method() calls the parent implementation of an overridden method.', 'super.method() вызывает родительскую реализацию перекрытого метода.'),
        L('A derived field with the same name shadows the base field.', 'Поле производного класса с тем же именем перекрывает базовое.'),
        L('instanceof follows the prototype chain and fails across realms.', 'instanceof идёт по цепочке прототипов и не работает между realm.'),
      ],
      code: `class Shape {
  constructor(name) { this.name = name; }
  area() { throw new Error('not implemented'); }
}

class Circle extends Shape {
  constructor(radius) {
    super('circle');                    // must run before this
    this.radius = radius;
  }
  area() { return Math.PI * this.radius ** 2; }
}

const c = new Circle(2);
c.area();                                // 12.566370614359172
c instanceof Shape;                      // true
Object.getPrototypeOf(Circle) === Shape; // true
class Base { tag = 'base'; }
class Derived extends Base {
  constructor() { super(); console.log(this.tag); } // 'base'
}
new Derived();`,
      table: {
        caption: L('Inheritance versus composition', 'Наследование против композиции'),
        headers: [L('Aspect', 'Аспект'), L('Inheritance', 'Наследование'), L('Composition', 'Композиция')],
        rows: [
          [L('Coupling', 'Связанность'), L('Tight, base changes reach every subclass', 'Тесная, правка базы задевает всех потомков'), L('Loose, the collaborator can change', 'Слабая, объект-компаньон может меняться')],
          [L('What is reused', 'Что переиспользуется'), L('Everything, including unwanted behaviour', 'Всё, включая нежелательное поведение'), L('Only the public API of the collaborator', 'Только публичный API компаньона')],
          [L('Flexibility', 'Гибкость'), L('Fixed when the class is defined', 'Фиксируется при определении класса'), L('The collaborator can be swapped at runtime', 'Компаньона можно заменить во время выполнения')],
          [L('Testing', 'Тестирование'), L('Needs the whole hierarchy', 'Нужна вся иерархия'), L('Easy, inject a fake collaborator', 'Просто, подставляется фальшивый компаньон')],
          [L('Fits', 'Подходит'), L('A genuine is-a relationship', 'Настоящее отношение «является»'), L('A has-a relationship', 'Отношение «содержит»')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('this before super()', 'this до super()'),
          text: L(
            'In a derived constructor the instance does not exist until super() runs. Touching this or a derived field before that call throws a ReferenceError, and the message is easy to misread as a missing import.',
            'В производном конструкторе экземпляр не существует до вызова super(). Обращение к this или к полю производного класса до этого вызова бросает ReferenceError, и его сообщение легко принять за отсутствующий импорт.'
          ),
        },
        {
          tone: 'tip',
          title: L('Delegate instead of extending', 'Делегируйте, а не наследуйте'),
          text: L(
            'When a base class has three responsibilities and a subclass needs one of them, hold the base object as a field and call it. The result is easier to read, easier to test and impossible to break by editing a distant ancestor.',
            'Когда у базового класса три обязанности, а потомку нужна только одна, храните базовый объект в поле и вызывайте его напрямую. Результат читается проще, тестируется проще и не ломается правкой далёкого предка.'
          ),
        },
      ],
      takeaway: L(
        'Call super first, remember that base fields initialise before the derived body, and reach for composition before you reach for extends.',
        'Сначала вызывайте super, помните, что базовые поля инициализируются раньше тела производного конструктора, и тянитесь к композиции раньше, чем к extends.'
      ),
      seeAlso: [
        L('Chapter 5: where property lookup actually happens', 'Глава 5: где на самом деле ищется свойство'),
        L('Chapter 4: functions, arguments and closures', 'Глава 4: функции, аргументы и замыкания'),
        L('Section 6-1: classes are syntax over prototypes', 'Секция 6-1: классы — это синтаксис над прототипами'),
      ],
    },
    {
      id: 'js-core-ch6-s5',
      title: L('Freezing, immutability and value equality', 'Заморозка, иммутабельность и сравнение по значению'),
      body: L(
        'Object.freeze makes an object immutable in the shallow sense: its own properties cannot be added, deleted or written afterwards. The freeze is irreversible, there is no Object.unfreeze, so a frozen object stays frozen for the rest of the program. Nested objects are not affected, because freeze only walks the own properties of the object it was given and it does not recurse.\n\nWhat happens on an attempted write depends on the mode. In strict mode, which covers every module and every class body, assigning to a frozen property throws a TypeError. In sloppy mode the assignment is silently ignored and the program carries on, which is why the same bug can pass locally and fail in production code that runs as a module. Object.seal sits in between: the set of properties is fixed, but the existing ones stay writable.\n\nImmutability is also a design principle, not only an API call. Redux reducers return a new state instead of mutating the old one, and React state updates rely on the same idea, because React compares the previous value with the next one to decide whether to re-render. A mutated object keeps its identity, the comparison sees no change, and the interface silently stops updating.\n\nEquality has the same two levels. Two objects with identical contents are still two different objects, so a === b is false unless they are the same reference, and the same holds for arrays. A structural comparison looks at the contents, but the obvious implementation, JSON.stringify(a) === JSON.stringify(b), is unreliable: it depends on key order, it drops undefined and functions, it turns a Date into a string and it cannot survive a cycle. When the comparison decides something, use a real deep equality function.',
        'Object.freeze делает объект неизменяемым в поверхностном смысле: его собственные свойства нельзя ни добавить, ни удалить, ни перезаписать. Заморозка необратима, Object.unfreeze не существует, поэтому замороженный объект остаётся замороженным до конца программы. Вложенные объекты при этом не затрагиваются, потому что freeze проходит только по собственным свойствам данного объекта и не рекурсирует.\n\nЧто происходит при попытке записи, зависит от режима. В строгом режиме, а он действует в каждом модуле и в каждом теле класса, присваивание замороженному свойству бросает TypeError. В нестрогом режиме присваивание молча игнорируется, и программа идёт дальше, поэтому один и тот же баг может не проявиться локально и выстрелить в проде, где код работает как модуль. Object.seal находится между этими режимами: набор свойств фиксируется, но сами свойства остаются записываемыми.\n\nИммутабельность — это ещё и принцип проектирования, а не только вызов API. Редьюсеры Redux возвращают новое состояние вместо мутации старого, и обновления состояния в React опираются на ту же идею, потому что React сравнивает предыдущее значение со следующим, чтобы решить, перерисовывать ли компонент. Мутированный объект сохраняет идентичность, сравнение не видит изменений, и интерфейс молча перестаёт обновляться.\n\nРавенство тоже живёт на двух уровнях. Два объекта с одинаковым содержимым остаются двумя разными объектами, поэтому a === b ложно, если это не одна и та же ссылка, и с массивами то же самое. Структурное сравнение смотрит на содержимое, но очевидная реализация JSON.stringify(a) === JSON.stringify(b) ненадёжна: она зависит от порядка ключей, выбрасывает undefined и функции, превращает Date в строку и не переживает цикл. Если от сравнения зависит логика программы, берите настоящую функцию глубокого равенства.'
      ),
      bullets: [
        L('Object.freeze is shallow: nested objects stay writable.', 'Object.freeze поверхностна: вложенные объекты остаются записываемыми.'),
        L('Freezing is irreversible, there is no Object.unfreeze.', 'Заморозка необратима, Object.unfreeze не существует.'),
        L('In strict mode writing to a frozen property throws a TypeError.', 'В строгом режиме запись в замороженное свойство бросает TypeError.'),
        L('Object.seal fixes the shape of an object but keeps the properties writable.', 'Object.seal фиксирует форму объекта, но оставляет свойства записываемыми.'),
        L('Two objects with equal contents are not === to each other.', 'Два объекта с равным содержимым не равны друг другу через ===.'),
        L('JSON.stringify is not a deep equality function.', 'JSON.stringify — это не функция глубокого равенства.'),
      ],
      code: `const settings = Object.freeze({ theme: 'dark', nested: { lang: 'en' } });

try { settings.theme = 'light'; } catch (e) { e.constructor.name; } // 'TypeError' in strict mode
settings.nested.lang = 'ru'; // allowed - freeze is shallow

const deepFreeze = (obj) => {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') deepFreeze(value);
  }
  return obj;
};
deepFreeze(settings);
try { settings.nested.lang = 'ru'; } catch (e) { e.constructor.name; } // 'TypeError' in strict mode

const a = { id: 1 };
const b = { id: 1 };
a === b;                                // false - different references
JSON.stringify(a) === JSON.stringify(b); // true, but fragile`,
      table: {
        caption: L('How each method restricts the object', 'Как каждый метод ограничивает объект'),
        headers: [L('Method', 'Метод'), L('Add properties', 'Добавить свойства'), L('Delete properties', 'Удалить свойства'), L('Write properties', 'Записать свойства')],
        rows: [
          [L('Object.preventExtensions', 'Object.preventExtensions'), L('no', 'нет'), L('yes', 'да'), L('yes', 'да')],
          [L('Object.seal', 'Object.seal'), L('no', 'нет'), L('no', 'нет'), L('yes', 'да')],
          [L('Object.freeze', 'Object.freeze'), L('no', 'нет'), L('no', 'нет'), L('no', 'нет')],
          [L('Plain object', 'Обычный объект'), L('yes', 'да'), L('yes', 'да'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Sloppy mode hides the bug', 'Нестрогий режим прячет баг'),
          text: L(
            'In sloppy mode a write to a frozen property is ignored without any error, so the code looks like it works. Modules and class bodies are always strict, so the same line throws there. Test the strict path, not the sloppy one.',
            'В нестрогом режиме запись в замороженное свойство игнорируется без всякой ошибки, и код выглядит рабочим. Модули и тела классов всегда строгие, поэтому та же строка там бросает исключение. Проверяйте строгий путь, а не нестрогий.'
          ),
        },
        {
          tone: 'tip',
          title: L('Immutability pays off in React', 'Иммутабельность окупается в React'),
          text: L(
            'React compares state by identity, so mutating an object in place tells the framework nothing changed and the component does not re-render. Returning a new object is not only a style rule, it is what makes the update visible.',
            'React сравнивает состояние по идентичности, поэтому мутация объекта на месте не сообщает фреймворку, что что-то изменилось, и компонент не перерисуется. Возврат нового объекта — не только стиль, это то, что делает обновление заметным.'
          ),
        },
      ],
      takeaway: L(
        'Freeze is shallow and irreversible, strict mode turns a failed write into a TypeError, and equality by value needs a real deep comparison.',
        'Заморозка поверхностна и необратима, строгий режим превращает неудачную запись в TypeError, а равенство по значению требует настоящего глубокого сравнения.'
      ),
      seeAlso: [
        L('Section 1-1: shallow copies and nested references', 'Секция 1-1: поверхностные копии и общие вложенные ссылки'),
        L('Chapter 5: descriptors and property attributes', 'Глава 5: дескрипторы и атрибуты свойств'),
        L('Section 6-3: private state and public accessors', 'Секция 6-3: приватное состояние и публичные аксессоры'),
      ],
    },
  ],
};
