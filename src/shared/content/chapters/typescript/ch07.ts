import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh07: Chapter = {
  id: 'ts-ch7',
  title: L('Classes, interfaces and modifiers', 'Классы, интерфейсы и модификаторы'),
  summary: L(
    'How a class type behaves at compile time, what parameter properties and readonly really change, how TypeScript private differs from a real ECMAScript private field, and what abstract classes, declaration merging and overloads buy you.',
    'Как класс ведёт себя на этапе компиляции, что на самом деле меняют параметры-поля и readonly, чем TypeScript private отличается от настоящего приватного поля ECMAScript и что дают абстрактные классы, слияние объявлений и перегрузки.'
  ),
  sections: [
    {
      id: 'ts-ch7-s1',
      title: L('Class members and structural compatibility', 'Члены класса и структурная совместимость'),
      body: L(
        'A class produces two things: a value with a constructor and static members, and a type that describes its instances. The instance type is structural like every other object type, so a class instance is assignable to any type that has the same members. That is why a function can accept an interface and receive a class instance, and why a class can be replaced by a plain object with the right shape.\n\nThe implements clause changes nothing at runtime. It is a compile-time promise that the instance side of the class has the members of the named interface, and the class has to declare those members itself. An interface cannot add behaviour, cannot hold state and cannot be used with new; it describes a shape, and implements is the compiler checking that a class matches one.\n\nStructural compatibility has one exception that matters: private and protected members. Two classes are compatible only when the private members come from the same declaration, which makes classes with private state behave nominally. A class with a private field is not assignable to an interface, and two classes that each carry their own private field are not assignable to each other, even when their public sides look identical.\n\nThis is why a public API written as an interface is easier to consume than a class type. An interface hides the implementation, so the consumer depends on a shape rather than on a class that may later gain a private member and break every consumer at once. When you want a class to stay interchangeable with anything of the same members, keep its members public and let the interface carry the contract.',
        'Класс порождает две вещи: значение с конструктором и статическими членами, и тип, описывающий его экземпляры. Тип экземпляра структурный, как любой другой тип объекта, поэтому экземпляр класса присваивается любому типу с теми же членами. Отсюда и возможность передать экземпляр класса в функцию, ждущую интерфейс, и возможность заменить класс обычным объектом нужной формы.\n\nКонструкция implements ничего не меняет во время выполнения. Это обещание на этапе компиляции: сторона экземпляра класса содержит члены названного интерфейса, и сами эти члены класс объявляет сам. Интерфейс не может добавить поведение, не может хранить состояние и не работает с new; он описывает форму, а implements — проверка компилятора на то, что класс ей соответствует.\n\nУ структурной совместимости есть одно исключение, которое важно: приватные и защищённые члены. Два класса совместимы, только если приватные члены пришли из одного объявления, и потому классы с приватным состоянием ведут себя номинально. Класс с приватным полем не присваивается интерфейсу, а два класса со своими собственными приватными полями не присваиваются друг другу, даже если их публичные стороны выглядят одинаково.\n\nИменно поэтому публичный API, написанный интерфейсом, потреблять проще, чем типом класса. Интерфейс скрывает реализацию, поэтому потребитель зависит от формы, а не от класса, который позже может получить приватный член и сломать всех потребителей разом. Если класс должен оставаться взаимозаменяемым с любой структурой того же вида, держите его члены публичными, а контракт поручите интерфейсу.'
      ),
      bullets: [
        L('A class produces a runtime value and a type describing its instances.', 'Класс порождает значение во время выполнения и тип, описывающий его экземпляры.'),
        L('Instance types are structural, so a plain object can stand in for a class.', 'Типы экземпляров структурные, поэтому вместо класса подойдёт обычный объект.'),
        L('implements is a compile-time check and adds nothing at runtime.', 'implements — это проверка на этапе компиляции, во время выполнения она ничего не добавляет.'),
        L('An interface cannot hold state or be used with new.', 'Интерфейс не может хранить состояние и не используется с new.'),
        L('Private members make two classes incompatible unless the members share a declaration.', 'Приватные члены делают классы несовместимыми, если члены не из одного объявления.'),
      ],
      code: `interface Report {
  toJSON(): string;
}

// implements checks the shape of the instance, not the class
class User implements Report {
  constructor(public readonly id: string) {}
  toJSON(): string {
    return JSON.stringify({ id: this.id });
  }
}

const ok: Report = new User('u1');
// A class with a private member keeps its own identity
class Secretive {
  private token = 'secret';
  toJSON(): string {
    return this.token;
  }
}

// new Secretive() cannot be assigned to Report: 'token' is private`,
      table: {
        caption: L('Interface or class type in a public signature', 'Интерфейс или тип класса в публичной сигнатуре'),
        headers: [L('Aspect', 'Аспект'), L('interface', 'интерфейс'), L('class type', 'тип класса')],
        rows: [
          [L('Runtime value', 'Значение во время выполнения'), L('none', 'нет'), L('a constructor exists', 'конструктор есть')],
          [L('State', 'Состояние'), L('not allowed', 'не допускается'), L('allowed', 'допускается')],
          [L('Private members', 'Приватные члены'), L('not allowed', 'не допускаются'), L('allowed and they break assignability', 'допускаются и ломают совместимость')],
          [L('The consumer depends on', 'Потребитель зависит от'), L('a shape', 'формы'), L('the whole instance type', 'всего типа экземпляра')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('implements is a check, extends is a relationship', 'implements — проверка, extends — отношение'),
          text: L(
            'A class that extends another one inherits its implementation, while a class that implements an interface only promises to match a shape. Use extends when the code is shared, and implements when only the contract matters.',
            'Класс, который расширяет другой, наследует его реализацию, а класс, который реализует интерфейс, лишь обещает соответствовать форме. Используйте extends, когда код общий, и implements, когда важен только контракт.'
          ),
        },
      ],
      takeaway: L(
        'Classes are structurally typed at the instance level, so describe public contracts with interfaces that a later private member cannot break.',
        'Классы структурно типизированы на уровне экземпляра, поэтому описывайте публичные контракты интерфейсами, которые поздний приватный член не сломает.'
      ),
      seeAlso: [
        L('Section 3-1: interfaces versus type aliases', 'Секция 3-1: интерфейсы против псевдонимов типов'),
        L('Section 7-3: private, protected and public', 'Секция 7-3: private, protected и public'),
        L('Chapter 3: interfaces, type aliases and generics', 'Глава 3: интерфейсы, псевдонимы типов и дженерики'),
      ],
    },
    {
      id: 'ts-ch7-s2',
      title: L('Parameter properties and readonly', 'Параметры-поля и readonly'),
      body: L(
        'A parameter property is a constructor parameter that declares a field as well. The modifier private, protected, public or readonly in front of the parameter tells the compiler to create the field and to assign the argument to it, and the emitted JavaScript contains a plain assignment you would otherwise have to write yourself. The syntax is TypeScript only and disappears completely at compile time.\n\nreadonly makes a promise the compiler keeps. A readonly field cannot be assigned after the constructor has run, and that is exactly the rule you want for identifiers, configuration and anything that must not change during the life of an object. The promise only covers direct assignment, though: a readonly field holding an array can still be mutated with push, and a readonly property can still point at a mutable object.\n\nThere is a second way to be readonly, and it is not the same thing. A readonly array parameter, written as readonly string[], accepts both a mutable array and a readonly one, and the function cannot mutate it. That is the safe way to write a function that only reads its input, because it does not force the caller to copy the array first.\n\nParameter properties have a practical drawback: they hide the field declaration from anyone reading the class body, and they are rejected when the compiler is asked to erase types only, as the type stripping mode of Node does. A rule that survives both is to declare the field explicitly and assign it in the constructor, which costs two extra lines and reads the same everywhere.',
        'Параметр-поле — это параметр конструктора, который заодно объявляет поле. Модификатор private, protected, public или readonly перед параметром говорит компилятору создать поле и присвоить ему аргумент, а в итоговом JavaScript оказывается обычное присваивание, которое иначе пришлось бы написать вручную. Синтаксис существует только в TypeScript и полностью исчезает при компиляции.\n\nreadonly даёт обещание, которое компилятор держит. Поле readonly нельзя переприсвоить после того, как отработал конструктор, и это ровно то правило, которое нужно идентификаторам, конфигурации и всему, что не должно меняться за время жизни объекта. Обещание касается только прямого присваивания: поле readonly с массивом всё ещё можно изменить через push, а readonly-свойство по-прежнему может указывать на изменяемый объект.\n\nЕсть и второй способ быть неизменяемым, и это не то же самое. Параметр в виде массива только для чтения, записанный как readonly string[], принимает и изменяемый массив, и неизменяемый, а сама функция не может его изменить. Это безопасный способ написать функцию, которая только читает входные данные, потому что она не заставляет вызывающего сначала копировать массив.\n\nУ параметров-полей есть практическое ограничение: они прячут объявление поля от того, кто читает тело класса, и их отклоняют, когда компилятору предписано только стирать типы, как это делает режим удаления типов в Node. Правило, выживающее в обоих случаях, — объявлять поле явно и присваивать его в конструкторе: это стоит двух лишних строк, зато читается одинаково везде.'
      ),
      bullets: [
        L('A parameter property declares the field and assigns the argument.', 'Параметр-поле объявляет поле и присваивает ему аргумент.'),
        L('Parameter properties are erased at compile time and cost nothing at runtime.', 'Параметры-поля стираются при компиляции и ничего не стоят во время выполнения.'),
        L('readonly forbids assignment after the constructor, not mutation inside it.', 'readonly запрещает присваивание после конструктора, а не мутацию внутри.'),
        L('A readonly array parameter accepts a mutable array and cannot change it.', 'Параметр-массив только для чтения принимает изменяемый массив и не может его изменить.'),
        L('Type stripping modes reject parameter properties.', 'Режимы удаления типов отклоняют параметры-поля.'),
      ],
      code: `class UserRepository {
  private readonly cache = new Map<string, string>();

  // Parameter properties declare the field and assign it
  constructor(
    private readonly apiUrl: string,
    public readonly timeoutMs: number,
  ) {}

  find(id: string): string | undefined {
    return this.cache.get(id) ?? this.apiUrl + '/' + id;
  }
}

// A readonly array parameter cannot be mutated by the function
function freezeNames(names: readonly string[]): readonly string[] {
  return names;
}

const repo = new UserRepository('https://api.test', 3000);
// repo.timeoutMs = 100; // Error: cannot assign to a readonly property`,
      table: {
        caption: L('Two different kinds of readonly', 'Два разных вида неизменяемости'),
        headers: [L('Form', 'Форма'), L('Prevents', 'Запрещает'), L('Does not prevent', 'Не запрещает')],
        rows: [
          [L('readonly x: T', 'readonly x: T'), L('assigning to x', 'присваивание x'), L('mutating the object T points to', 'мутацию объекта, на который указывает T')],
          [L('readonly T[]', 'readonly T[]'), L('adding or removing items', 'добавление и удаление элементов'), L('assigning the parameter', 'присваивание параметру')],
          [L('Readonly<T>', 'Readonly<T>'), L('assigning to properties', 'присваивание свойствам'), L('mutating nested objects', 'мутацию вложенных объектов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('readonly is shallow', 'readonly действует на один уровень'),
          text: L(
            'A readonly property that holds an array is still a handle to a mutable array. If the array itself must not change, type it as a readonly array too, otherwise the promise stops at the first level of nesting.',
            'readonly-свойство, внутри которого лежит массив, по-прежнему даёт доступ к изменяемому массиву. Если массив меняться не должен, типизируйте и его как массив только для чтения, иначе обещание заканчивается на первом уровне вложенности.'
          ),
        },
      ],
      takeaway: L(
        'Use readonly for fields the object must not replace, and readonly arrays for data the code must not mutate.',
        'Используйте readonly для полей, которые объект не должен подменять, а массивы только для чтения — для данных, которые код не должен изменять.'
      ),
      seeAlso: [
        L('Section 7-3: private, protected and public', 'Секция 7-3: private, protected и public'),
        L('Section 1-3: primitives, arrays, tuples and readonly', 'Секция 1-3: примитивы, массивы, кортежи и readonly'),
        L('Section 8-3: declaration files and ambient types', 'Секция 8-3: декларационные файлы и объявления окружения'),
      ],
    },
    {
      id: 'ts-ch7-s3',
      title: L('private, protected and public', 'private, protected и public'),
      body: L(
        'TypeScript access modifiers are compile-time only. A private member is checked by the compiler and then emitted as an ordinary property, so it is visible at runtime, it appears in console.log and it shows up in JSON.stringify. It is a promise to the other people reading the code, enforced by the tool, and it is not a security boundary.\n\nA hash prefixed field is a different mechanism entirely. The #token syntax is part of the language since ES2022, the engine enforces it, and the field is invisible from the outside: it cannot be read through a cast, it does not show up in console.log and it is not serialised. It has no type level counterpart, which is why the two mechanisms coexist.\n\nprotected sits between the two: subclasses may read and write the member and nobody else may. It is a compile-time rule as well, and its real value is in a class hierarchy where a base class has to hand some internal state to a derived class without making it public. A public getter is often the better tool, because it lets you control what the subclass sees.\n\nChoose the mechanism by what you are protecting. Use private when the point is to stop other developers from using a member by mistake, and use a hash field when the point is that the value must not be reachable from outside at all, for example a token that should not leak into logs. If a member is private but its value can be printed, it is not secret, only untidy.',
        'Модификаторы доступа в TypeScript действуют только на этапе компиляции. Приватный член проверяется компилятором, а потом выдаётся как обычное свойство, поэтому во время выполнения он виден, попадает в console.log и в JSON.stringify. Это обещание тем, кто читает код, и его держит инструмент, но это не граница безопасности.\n\nПоле с решёткой в начале — совершенно другой механизм. Синтаксис #token стал частью языка в ES2022, его обеспечивает движок, и снаружи поле невидимо: его нельзя прочитать приведением, оно не попадает в console.log и не сериализуется. У него нет соответствия на уровне типов, и поэтому два механизма существуют вместе.\n\nprotected находится между ними: подклассам читать и писать член можно, а больше никому. Это тоже правило времени компиляции, и его настоящая ценность проявляется в иерархии классов, где базовый класс должен передать наследнику часть внутреннего состояния, не делая его публичным. Часто лучше публичный геттер, потому что он позволяет контролировать, что именно видит наследник.\n\nВыбирайте механизм по тому, что именно вы защищаете. private подходит, когда задача — не дать другим разработчикам по ошибке воспользоваться членом, а поле с решёткой — когда значение вообще не должно быть достижимо снаружи, например токен, который не должен попасть в логи. Если член приватный, но его значение можно напечатать, оно не секретное, а просто неаккуратное.'
      ),
      bullets: [
        L('TypeScript private is enforced by the compiler and disappears into a normal property.', 'Приватность TypeScript держит компилятор, и в итоге это обычное свойство.'),
        L('A hash prefixed field is enforced by the engine at runtime.', 'Поле с решёткой в начале держит движок во время выполнения.'),
        L('A hash field is invisible to console.log and to JSON.stringify.', 'Поле с решёткой не видно в console.log и в JSON.stringify.'),
        L('protected lets subclasses read and write the member, and nobody else.', 'protected позволяет подклассам читать и писать член, и больше никому.'),
        L('private is a convention for developers, not secrecy against the runtime.', 'private — соглашение для разработчиков, а не секретность от среды выполнения.'),
      ],
      code: `class Counter {
  public count = 0; // public is the default
  protected step = 1; // subclasses may read it
  private secret = 'hidden'; // compile-time only
  #total = 0; // real runtime privacy

  bump(): void {
    this.count += this.step;
    this.#total += this.step;
  }

  get total(): number {
    return this.#total;
  }
}

const c = new Counter();
c.count = 5;
c.bump();
c.total; // 6
// c.secret = 'x'; // Error: private
console.log(c); // no #total in the output`,
      table: {
        caption: L('TypeScript private and ECMAScript private', 'Приватность TypeScript и приватность ECMAScript'),
        headers: [L('Aspect', 'Аспект'), L('private', 'private'), L('#field', '#field')],
        rows: [
          [L('Checked by', 'Кем проверяется'), L('the compiler', 'компилятором'), L('the engine at runtime', 'движком во время выполнения')],
          [L('Visible in console.log', 'Видно в console.log'), L('yes', 'да'), L('no', 'нет')],
          [L('Visible in JSON.stringify', 'Видно в JSON.stringify'), L('yes', 'да'), L('no', 'нет')],
          [L('Reachable with a cast', 'Доступно через приведение'), L('yes', 'да'), L('no', 'нет')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Private is not secrecy', 'Приватность — это не секретность'),
          text: L(
            'A TypeScript private field is emitted as a normal property, so anything that serialises the object can read it. Never use private to hide a credential, a token or a password from the runtime.',
            'Приватное поле TypeScript выдаётся как обычное свойство, поэтому его прочитает всё, что сериализует объект. Никогда не прячьте в private учётные данные, токен или пароль от среды выполнения.'
          ),
        },
      ],
      takeaway: L(
        'private is a convention for other developers and a hash field is a real boundary, so pick the one that matches what you protect.',
        'private — соглашение для других разработчиков, а поле с решёткой — настоящая граница, поэтому выбирайте по тому, что вы защищаете.'
      ),
      seeAlso: [
        L('Chapter 6: classes, encapsulation and immutability', 'Глава 6: классы, инкапсуляция и неизменяемость'),
        L('Section 7-1: class members and structural compatibility', 'Секция 7-1: члены класса и структурная совместимость'),
        L('Section 2-2: narrowing with typeof, in and instanceof', 'Секция 2-2: сужение через typeof, in и instanceof'),
      ],
    },
    {
      id: 'ts-ch7-s4',
      title: L('Abstract classes and implements', 'Абстрактные классы и implements'),
      body: L(
        'An abstract class is a class that cannot be instantiated and that may declare abstract members. An abstract method has no implementation in the base class, and every concrete subclass has to provide one. The compiler enforces that, so a subclass that forgets a method fails to compile instead of failing at runtime when the method is finally called.\n\nAn abstract class can hold what an interface cannot: state, private helpers, a constructor and full implementations. That is the difference that decides between an interface and an abstract class. If the subclasses share code, an abstract class gives you a place to put it; if they only share a shape, an interface says it in fewer characters and creates no inheritance chain.\n\nThe implements clause belongs to interfaces and does not change the runtime type of the class. A class that implements an interface still has exactly the members it declares, and nothing from the interface is added to it. Reach for implements when the relationship is about a contract, and for extends when the base class really provides an implementation.\n\nAbstract classes also give you a place for protected hooks, which is what makes the template method pattern type safe. A base class can define a final algorithm in terms of an abstract step, and each subclass implements the step. The alternative, an interface plus a function that takes that interface, has no way to stop a caller from skipping the algorithm, so the two designs protect different things.',
        'Абстрактный класс — это класс, который нельзя создать, и который может объявлять абстрактные члены. У абстрактного метода нет реализации в базовом классе, и каждый конкретный наследник обязан её предоставить. Это обеспечивает компилятор, поэтому наследник, забывший метод, не компилируется, а не падает во время выполнения, когда метод наконец вызовут.\n\nАбстрактный класс умеет то, чего не умеет интерфейс: состояние, приватные вспомогательные методы, конструктор и полноценные реализации. Именно это и решает выбор между интерфейсом и абстрактным классом. Если наследники делят код, абстрактный класс даёт место, куда его положить; если они делят только форму, интерфейс говорит об этом меньшим числом символов и не создаёт цепочки наследования.\n\nКонструкция implements принадлежит интерфейсам и не меняет тип класса во время выполнения. У класса, реализующего интерфейс, остаются ровно те члены, которые он объявил сам, и ничего из интерфейса в него не добавляется. Выбирайте implements, когда речь о контракте, и extends, когда базовый класс действительно даёт реализацию.\n\nАбстрактные классы дают ещё и место для защищённых перехватчиков, и в этом причина типобезопасности паттерна «шаблонный метод». Базовый класс может задать алгоритм целиком через абстрактный шаг, а каждый наследник реализует шаг. Альтернатива — интерфейс плюс функция, принимающая этот интерфейс, — не может запретить вызывающему пропустить алгоритм, поэтому две эти схемы защищают разное.'
      ),
      bullets: [
        L('An abstract class cannot be instantiated, only its concrete subclasses can.', 'Абстрактный класс нельзя создать, только его конкретных наследников.'),
        L('Every concrete subclass must implement the abstract members.', 'Каждый конкретный наследник обязан реализовать абстрактные члены.'),
        L('An abstract class may hold state and shared implementations.', 'Абстрактный класс может хранить состояние и общие реализации.'),
        L('implements checks a shape and adds nothing at runtime.', 'implements проверяет форму и ничего не добавляет во время выполнения.'),
        L('An abstract class gives subclasses a protected hook inside a final algorithm.', 'Абстрактный класс даёт наследникам защищённый перехватчик внутри final-алгоритма.'),
      ],
      code: `abstract class KeyValueStore {
  abstract read(key: string): string | undefined;
  abstract write(key: string, value: string): void;

  // Shared implementation for every subclass
  readOrDefault(key: string, fallback: string): string {
    return this.read(key) ?? fallback;
  }
}
class MemoryStore extends KeyValueStore {
  private readonly data = new Map<string, string>();
  read(key: string): string | undefined {
    return this.data.get(key);
  }
  write(key: string, value: string): void {
    this.data.set(key, value);
  }
}
const store = new MemoryStore();
store.write('a', 'b');
store.readOrDefault('a', 'none'); // 'b'`,
      table: {
        caption: L('Interface or abstract class', 'Интерфейс или абстрактный класс'),
        headers: [L('Aspect', 'Аспект'), L('interface', 'интерфейс'), L('abstract class', 'абстрактный класс')],
        rows: [
          [L('Implementation', 'Реализация'), L('none', 'нет'), L('yes, shared code', 'есть, общий код')],
          [L('State', 'Состояние'), L('not allowed', 'не допускается'), L('allowed', 'допускается')],
          [L('Instantiable', 'Создаётся ли'), L('no', 'нет'), L('no, only subclasses', 'нет, только наследники')],
          [L('Runtime cost', 'Цена во время выполнения'), L('none', 'нет'), L('a class exists at runtime', 'существует класс')],
          [L('Parents', 'Предки'), L('any number', 'сколько угодно'), L('one base class', 'один базовый класс')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('An abstract class needs no extra interface', 'Абстрактному классу не нужна лишняя сигнатура интерфейса'),
          text: L(
            'If an abstract class already states the contract through its abstract members, an extra interface that lists the same members creates a second place to update. Declare an interface only when something else should depend on the shape without depending on the class.',
            'Если абстрактный класс уже задаёт контракт своими абстрактными членами, лишний интерфейс с теми же членами создаёт второе место, которое придётся обновлять. Объявляйте интерфейс, только когда от формы должен зависеть кто-то ещё, не зависящий от класса.'
          ),
        },
      ],
      takeaway: L(
        'Use an abstract class when the subclasses share code, and an interface when only the shape is shared.',
        'Используйте абстрактный класс, когда наследники делят код, и интерфейс, когда делится только форма.'
      ),
      seeAlso: [
        L('Section 3-6: generics in interfaces and classes', 'Секция 3-6: дженерики в интерфейсах и классах'),
        L('Section 7-1: class members and structural compatibility', 'Секция 7-1: члены класса и структурная совместимость'),
        L('Chapter 3: inheritance and polymorphism', 'Глава 3: наследование и полиморфизм'),
      ],
    },
    {
      id: 'ts-ch7-s5',
      title: L('Declaration merging and overloads', 'Слияние объявлений и перегрузки'),
      body: L(
        'Two interfaces with the same name in the same scope merge into one interface with the union of their members, and a class can merge with an interface of the same name as well. Merging is how a library adds to the shape of a type it does not own, and it is the mechanism behind the global augmentation of built-in interfaces such as Window. Conflicting members in the same interface are an error, so merging adds members but never contradicts them.\n\nA function can also have several call signatures. Each overload declares a shape that callers may use, and a single implementation follows them. The compiler picks the first overload whose parameters match the call, in the order they are written, and the implementation signature itself is invisible to callers. That is why an overload set has to be ordered from the most specific to the most general.\n\nOverloads break in a predictable way. If no overload matches the arguments, the call fails even when the implementation would accept them, because the implementation signature is not part of the public contract. If two overloads differ only by a union parameter, the second one is never chosen, and if a generic overload is too permissive it swallows the specific ones. A single signature with a union parameter is often clearer than three overloads.\n\nThe practical rule is to use overloads when the return type depends on the input in a way a union cannot express, and to keep the number of overloads small. Every overload is another branch the reader has to understand, and the compiler error for a failed call lists all of them, which is exactly what you want while writing them and exactly what you do not want when reading a report at midnight.',
        'Два интерфейса с одинаковым именем в одной области сливаются в один интерфейс с объединёнными членами, и класс тоже может слиться с интерфейсом с тем же именем. Слияние — это способ, которым библиотека дополняет форму чужого типа, и на нём же построено глобальное расширение встроенных интерфейсов вроде Window. Конфликтующие члены в одном интерфейсе — ошибка, поэтому слияние добавляет члены, но никогда им не противоречит.\n\nУ функции может быть несколько сигнатур вызова. Каждая перегрузка объявляет форму, которой могут пользоваться вызывающие, а следом идёт единственная реализация. Компилятор выбирает первую перегрузку, параметры которой подходят под вызов, в том порядке, в каком они написаны, а сама сигнатура реализации вызывающим не видна. Поэтому набор перегрузок должен идти от самой специфичной к самой общей.\n\nПерегрузки ломаются предсказуемым образом. Если ни одна перегрузка не подходит под аргументы, вызов не проходит, даже когда реализация приняла бы их, потому что сигнатура реализации не входит в публичный контракт. Если две перегрузки отличаются только параметром-объединением, вторая никогда не выбирается, а слишком разрешающая дженерик-перегрузка поглощает специфичные. Одна сигнатура с объединением часто понятнее трёх перегрузок.\n\nПрактическое правило: используйте перегрузки, когда тип возврата зависит от входа так, что объединение это выразить не может, и держите их количество небольшим. Каждая перегрузка — ещё одна ветвь, которую читатель должен понять, а сообщение компилятора о неудачном вызове перечисляет их все, и это именно то, что нужно при написании и совсем не то, что нужно при чтении отчёта в полночь.'
      ),
      bullets: [
        L('Interfaces with the same name in the same scope merge their members.', 'Интерфейсы с одинаковым именем в одной области объединяют своих членов.'),
        L('A class and an interface of the same name merge as well.', 'Класс и интерфейс с одинаковым именем тоже объединяются.'),
        L('Conflicting members in a merged interface are a compile error.', 'Конфликтующие члены объединённого интерфейса — ошибка компиляции.'),
        L('The first matching overload wins, so the order of the list matters.', 'Побеждает первая подходящая перегрузка, поэтому порядок в списке важен.'),
        L('The implementation signature is not callable from outside.', 'Сигнатура реализации недоступна для вызова снаружи.'),
      ],
      code: `// Interfaces with the same name merge
interface User {
  id: string;
}
interface User {
  name: string;
}
const user: User = { id: '1', name: 'Ada' };

// Overloads describe several call shapes
function parse(value: string): string;
function parse(value: number): number;
function parse(value: string | number): string | number {
  return value;
}

const a = parse('1'); // string
const b = parse(1); // number`,
      table: {
        caption: L('Two ways to extend a type', 'Два способа расширить тип'),
        headers: [L('Aspect', 'Аспект'), L('Declaration merging', 'Слияние объявлений'), L('Overloads', 'Перегрузки')],
        rows: [
          [L('What is added', 'Что добавляется'), L('members of a type', 'члены типа'), L('call signatures of a function', 'сигнатуры вызова функции')],
          [L('Where the second declaration lives', 'Где живёт второе объявление'), L('same scope', 'та же область'), L('same file, before the implementation', 'тот же файл, перед реализацией')],
          [L('Typical use', 'Типичное применение'), L('augmenting a library type', 'расширение чужого типа'), L('several input shapes', 'несколько форм входа')],
          [L('Main risk', 'Главный риск'), L('conflicting members', 'конфликтующие члены'), L('an overload that is never reached', 'перегрузка, до которой не доходят')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Order decides which overload wins', 'Порядок решает, какая перегрузка победит'),
          text: L(
            'The compiler tries the overloads from top to bottom and takes the first match, so a catch-all signature placed above a specific one makes the specific one unreachable. Put the narrow signatures first and the general ones last.',
            'Компилятор перебирает перегрузки сверху вниз и берёт первую подходящую, поэтому общая сигнатура, поставленная выше частной, делает частую недостижимой. Ставьте узкие сигнатуры в начало, а общие — в конец.'
          ),
        },
      ],
      takeaway: L(
        'Order overloads from specific to general, and prefer one union signature when the difference is only in the parameter type.',
        'Располагайте перегрузки от частной к общей и предпочитайте одну сигнатуру с объединением, когда разница только в типе параметра.'
      ),
      seeAlso: [
        L('Section 3-1: interfaces versus type aliases', 'Секция 3-1: интерфейсы против псевдонимов типов'),
        L('Section 8-3: declaration files and ambient types', 'Секция 8-3: декларационные файлы и объявления окружения'),
        L('Section 2-3: control flow analysis and exhaustiveness', 'Секция 2-3: анализ потока управления и исчерпывающие проверки'),
      ],
    },
  ],
};
