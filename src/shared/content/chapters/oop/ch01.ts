import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh01: Chapter = {
  id: 'oop-ch1',
  title: L('The object model in JavaScript', 'Объектная модель в JavaScript'),
  summary: L(
    'How JavaScript stores objects, what the prototype chain really does, why a class is only syntax over it, and how to get real encapsulation, value equality and immutability.',
    'Как JavaScript хранит объекты, что на самом деле делает цепочка прототипов, почему класс — это лишь синтаксис над ней и как получить настоящую инкапсуляцию, равенство по значению и неизменяемость.'
  ),
  sections: [
    {
      id: 'oop-ch1-s1',
      title: L('Objects, properties and the prototype chain', 'Объекты, свойства и цепочка прототипов'),
      body: L(
        'An object in JavaScript is a map from property keys to values plus one hidden link to another object, its prototype. The link is a pointer, not a copy, so a property added to the prototype is immediately visible through every object that points at it. Lookup walks the chain: own properties first, then the prototype, then the prototype of the prototype, until a match is found or the chain reaches null. The first match wins, so an own property hides an inherited one with the same name.\n\nEngines optimise that walk with hidden classes, the internal shape of an object. Every object built by the same literal or the same constructor starts with the same shape, so the engine can skip dictionary lookups and cache property access sites. Adding properties in a consistent order keeps the shape stable; adding them in different orders produces different shapes, and a function that receives both becomes polymorphic and slower. The shape is invisible in the source code, but it is the reason object literals are fast and large heterogeneous objects are not.\n\nTwo questions about a property are different questions. Does the object have it at all? The in operator answers yes for inherited properties too, while Object.hasOwn answers only for the object own properties. The difference decides what a spread copies: { ...obj } takes own enumerable properties only, so a class instance becomes a plain data object and loses its behaviour. The other question is where the property lives, and the answer is the chain.\n\nAn object created with Object.create(null) has no prototype at all, which makes it a clean dictionary for keys that might collide with Object.prototype members such as toString. It also loses every built-in helper, so most code wants the ordinary object. Nothing about the chain is mysterious: it is one link per object, and every lookup is a walk over those links.',
        'Объект в JavaScript — это отображение из ключей свойств в значения плюс одна скрытая ссылка на другой объект, его прототип. Ссылка — это указатель, а не копия, поэтому свойство, добавленное в прототип, сразу видно через каждый объект, который на него ссылается. Поиск идёт по цепочке: сначала свои свойства, потом прототип, потом прототип прототипа, пока не найдётся совпадение или цепочка не упрётся в null. Побеждает первое совпадение, поэтому собственное свойство прячет унаследованное с тем же именем.\n\nДвижки оптимизируют этот обход с помощью скрытых классов — внутренней формы объекта. Все объекты, созданные одним литералом или одним конструктором, получают одинаковую форму, поэтому движок может не заглядывать в словарь и кешировать места доступа к свойствам. Если свойства добавляются в одном и том же порядке, форма остаётся стабильной; если в разном — формы расходятся, и функция, получающая оба варианта, становится полиморфной и медленнее. Форму не видно в исходном коде, но именно она объясняет, почему литералы быстрые, а большие разнородные объекты — нет.\n\nДва вопроса о свойстве — это два разных вопроса. Есть ли оно у объекта вообще? Оператор in отвечает «да» и для унаследованных свойств, а Object.hasOwn — только для собственных. Именно эта разница решает, что копирует spread: { ...obj } берёт только свои перечислимые свойства, поэтому экземпляр класса превращается в обычные данные и теряет поведение. Второй вопрос — где свойство живёт, и ответ на него даёт цепочка.\n\nОбъект, созданный через Object.create(null), вообще не имеет прототипа, и это делает его чистым словарём для ключей, которые могут столкнуться с членами Object.prototype вроде toString. Заодно он теряет все встроенные помощники, поэтому большинству кода нужен обычный объект. Никакой магии в цепочке нет: это одна ссылка у объекта, а каждый поиск — обход этих ссылок.'
      ),
      bullets: [
        L('Every object is a property map plus a link to a prototype, or to null.', 'Каждый объект — это карта свойств плюс ссылка на прототип или на null.'),
        L('Property lookup stops at the first match while walking the chain upwards.', 'Поиск свойства останавливается на первом совпадении, поднимаясь по цепочке.'),
        L('Engines keep a hidden class per object shape, and a consistent property order keeps it stable.', 'Движок хранит скрытый класс для каждой формы объекта, а постоянный порядок свойств сохраняет её.'),
        L('The in operator sees inherited properties, Object.hasOwn sees only own ones.', 'Оператор in учитывает унаследованные свойства, Object.hasOwn — только собственные.'),
        L('A spread copies own enumerable properties, so instances lose their behaviour.', 'Spread копирует свои перечислимые свойства, поэтому экземпляры теряют поведение.'),
      ],
      code: `interface Shape {
  area(): number;
}

const proto = {
  area(this: { size: number }): number {
    return this.size * this.size;
  },
};

const square = Object.create(proto) as { size: number } & Shape;
square.size = 4;
square.area();                   // 16 - the method lives on the prototype
Object.hasOwn(square, 'area');  // false
'size' in square;                // true`,
      table: {
        caption: L('Three questions about a property', 'Три вопроса о свойстве'),
        headers: [L('Question', 'Вопрос'), L('Answer', 'Ответ'), L('Tool', 'Инструмент')],
        rows: [
          [
            L('Does the object have the property at all?', 'Есть ли у объекта это свойство вообще?'),
            L('Yes, own and inherited', 'Да, и своё, и унаследованное'),
            L('the in operator', 'оператор in'),
          ],
          [
            L('Is the property the object own?', 'Это свойство принадлежит самому объекту?'),
            L('Only own properties', 'Только собственные свойства'),
            L('Object.hasOwn', 'Object.hasOwn'),
          ],
          [
            L('Where does the property live?', 'Где живёт свойство?'),
            L('On the object or on a prototype', 'На объекте или на прототипе'),
            L('Object.getOwnPropertyDescriptor', 'Object.getOwnPropertyDescriptor'),
          ],
          [
            L('What does a spread copy?', 'Что копирует spread?'),
            L('Own enumerable properties only', 'Только свои перечислимые свойства'),
            L('{ ...obj }', '{ ...obj }'),
          ],
          [
            L('Can it be a plain dictionary?', 'Может ли он быть обычным словарём?'),
            L('No prototype chain at all', 'Совсем без цепочки прототипов'),
            L('Object.create(null)', 'Object.create(null)'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Spreading an instance drops its behaviour', 'Spread экземпляра теряет поведение'),
          text: L(
            'A spread copies own enumerable properties, so spreading a class instance produces a plain object with the data and none of the methods. The result still looks like the original in a console log and fails the moment a method is called.',
            'Spread копирует только свои перечислимые свойства, поэтому spreading экземпляра класса даёт обычный объект с данными и без методов. В консоли результат выглядит как оригинал и ломается в момент первого вызова метода.'
          ),
        },
        {
          tone: 'note',
          title: L('Hidden classes are a performance detail', 'Скрытые классы — это про производительность'),
          text: L(
            'The engine keeps the same shape for objects built the same way, which is why adding properties in a fixed order is faster than adding them conditionally. It never changes semantics, so it is a reason to keep constructors simple, not a rule to design around.',
            'Движок держит одинаковую форму для объектов, созданных одинаковым способом, поэтому добавление свойств в фиксированном порядке быстрее, чем добавление по условию. На семантику это не влияет, то есть это повод держать конструкторы простыми, а не повод проектировать под них.'
          ),
        },
      ],
      takeaway: L(
        'The prototype is a link, not a copy: lookup walks the chain and stops at the first match.',
        'Прототип — это ссылка, а не копия: поиск идёт по цепочке и останавливается на первом совпадении.'
      ),
      seeAlso: [
        L('Section 1-2: classes are syntax over prototypes', 'Секция 1-2: классы — это синтаксис над прототипами'),
        L('Chapter 5 (js-core): objects, descriptors and the prototype chain', 'Глава 5 (js-core): объекты, дескрипторы и цепочка прототипов'),
        L('Section 5-3 (js-core): the prototype chain and property lookup', 'Секция 5-3 (js-core): цепочка прототипов и поиск свойства'),
      ],
    },
    {
      id: 'oop-ch1-s2',
      title: L('Classes are syntax over prototypes', 'Классы — это синтаксис над прототипами'),
      body: L(
        'A class declaration is sugar over the same machinery. Under the hood it creates a constructor function, puts the methods on its prototype object and installs the declared fields on every instance at construction time. Methods are therefore shared by all instances, fields are not, and the class itself is a function with a prototype attached. Nothing in the class syntax changes the lookup rules described above.\n\nextends links the prototype of the subclass to the prototype of the superclass, so an instance of the subclass sees the base methods after its own. super calls the parent implementation, and inside a derived constructor it must run before this is touched, otherwise the object does not exist yet and the runtime throws a ReferenceError. Class declarations are not hoisted like functions either: the binding lives in the temporal dead zone until the declaration is evaluated, and earlier code sees a ReferenceError.\n\nStatic members belong to the class rather than to the instances, and a static block runs once when the class is defined. That is the natural home for a factory and for a cache that must be shared. Private fields marked with # are installed per instance and are enforced by the engine: they are invisible to Object.keys, to a spread and to JSON.stringify. The TypeScript private modifier, by contrast, is erased at compile time and protects nothing at run time.\n\nClass fields are initialised before the constructor body runs, which means a field initialiser in a subclass can overwrite a value the base constructor already set. That surprise comes from the order of operations, not from inheritance as such, and it disappears as soon as the base class takes constructor parameters instead of relying on field defaults.',
        'Объявление class — это синтаксический сахар над тем же механизмом. Под капотом создаётся функция-конструктор, методы попадают на её объект-прототип, а объявленные поля устанавливаются в каждом экземпляре в момент создания. Методы поэтому общие у всех экземпляров, а поля — нет, и сам класс остаётся функцией с привязанным прототипом. Ничто в синтаксисе class не меняет правила поиска, описанные выше.\n\nextends связывает прототип подкласса с прототипом базового класса, поэтому экземпляр подкласса после своих методов видит и методы базы. super вызывает родительскую реализацию, и в конструкторе наследника он должен выполниться до обращения к this, иначе объекта ещё не существует и рантайм бросит ReferenceError. Объявления классов, в отличие от функций, не поднимаются: связка живёт во временной мёртвой зоне до вычисления объявления, и более ранний код получит ReferenceError.\n\nСтатические члены принадлежат классу, а не экземплярам, а статический блок выполняется один раз при определении класса. Это естественное место для фабрики и для общего кеша. Приватные поля с # устанавливаются в каждом экземпляре и проверяются движком: их не видно ни в Object.keys, ни в spread, ни в JSON.stringify. А вот модификатор private в TypeScript стирается при компиляции и в рантайме не защищает ничего.\n\nПоля класса инициализируются до выполнения тела конструктора, поэтому инициализатор поля в подклассе может перезаписать значение, заданное конструктором базы. Этот сюрприз связан с порядком выполнения, а не с наследованием как таковым, и исчезает, как только базовый класс принимает параметры конструктора вместо значений по умолчанию в полях.'
      ),
      bullets: [
        L('A class is a constructor function plus a prototype object: methods are shared, fields are per instance.', 'Класс — это функция-конструктор плюс объект-прототип: методы общие, поля у каждого экземпляра свои.'),
        L('super() must run before this is touched in a derived constructor.', 'В конструкторе наследника super() должен выполниться до обращения к this.'),
        L('Static members live on the class, and a static block runs once at definition time.', 'Статические члены живут на классе, а статический блок выполняется один раз при определении.'),
        L('TypeScript private is erased at compile time, the # field survives to the run time.', 'private в TypeScript стирается при компиляции, а поле # остаётся в рантайме.'),
        L('Class fields are installed before the constructor body runs.', 'Поля класса создаются до выполнения тела конструктора.'),
      ],
      code: `class Money {
  #cents: number;

  constructor(cents: number) {
    this.#cents = cents;
  }

  add(other: Money): Money {
    return new Money(this.#cents + other.#cents);
  }

  toString(): string {
    return (this.#cents / 100).toFixed(2);
  }

  static from(amount: number): Money {
    return new Money(Math.round(amount * 100));
  }
}

const total = Money.from(19.99).add(Money.from(0.01));
console.log(total.toString()); // '20.00'`,
      callouts: [
        {
          tone: 'warning',
          title: L('private is not #', 'private — это не то же самое, что #'),
          text: L(
            'TypeScript private is a compile-time convention. The property still exists on the object at run time, is visible in the console and can be written by any JavaScript caller. Use # when the privacy has to survive compilation.',
            'private в TypeScript — это соглашение на этапе компиляции. Свойство всё равно существует у объекта в рантайме, видно в консоли и доступно любому JavaScript-коду. Используйте #, когда приватность должна пережить компиляцию.'
          ),
        },
        {
          tone: 'tip',
          title: L('A static factory beats a public constructor', 'Статическая фабрика лучше публичного конструктора'),
          text: L(
            'A static method can validate, normalise and return a subclass, while a public constructor cannot. When the constructor is private and the factory is public, the class controls every instance that exists.',
            'Статический метод может проверить, нормализовать и вернуть подкласс, а публичный конструктор — нет. Когда конструктор приватный, а фабрика публичная, класс контролирует каждый созданный экземпляр.'
          ),
        },
      ],
      takeaway: L(
        'A class is a constructor plus a prototype: know which parts are shared and which belong to one instance.',
        'Класс — это конструктор плюс прототип: знайте, что общего у экземпляров, а что остаётся у одного.'
      ),
      seeAlso: [
        L('Section 1-1: objects, properties and the prototype chain', 'Секция 1-1: объекты, свойства и цепочка прототипов'),
        L('Section 1-3: private fields, getters and closures', 'Секция 1-3: приватные поля, геттеры и замыкания'),
        L('Chapter 6 (js-core): classes, encapsulation and immutability', 'Глава 6 (js-core): классы, инкапсуляция и неизменяемость'),
      ],
    },
    {
      id: 'oop-ch1-s3',
      title: L('Encapsulation in practice: private fields, getters and closures', 'Инкапсуляция на практике: приватные поля, геттеры и замыкания'),
      body: L(
        'Encapsulation in JavaScript comes in four flavours, and they protect different things. The # field is real privacy enforced by the engine: nothing outside the class body can read or write it, not even a subclass. The TypeScript private and protected modifiers are erased at compile time, so they document an intention and stop mistakes inside the codebase, but any JavaScript caller can still reach the property. A getter and a setter form a public surface with validation around a private field. A closure hides state in a local variable with no property at all.\n\nThe trap with getters is returning the internal collection. A getter that returns this.#lines hands out the array itself, and the caller can push into it, bypassing every rule the class meant to enforce. Returning a copy, a frozen array or a readonly view keeps the invariant inside the class. The same trap appears with a public field: once the array is a public property, every consumer is a co-owner of the state.\n\nClosures are the cheapest encapsulation there is. A factory function can keep a counter in a local variable and expose only the operations that change it, and nothing outside can reach the variable at all. That pattern is what a class is a convenience wrapper around, and it is still the right choice when the state is tiny, the object has no lifecycle and the methods never need this.\n\nWhichever mechanism you pick, the test is the same: can an outsider break an invariant of this object? If a caller can set a negative quantity, empty a basket or change a computed total, the encapsulation is decorative. Write that test first and the choice of mechanism follows from it.',
        'Инкапсуляция в JavaScript бывает четырёх видов, и защищают они разное. Поле # — это настоящая приватность, которую проверяет движок: за пределами тела класса к нему не обратиться, даже из подкласса. Модификаторы private и protected в TypeScript стираются при компиляции, поэтому они фиксируют намерение и ловят ошибки внутри кодовой базы, но любой JavaScript-код всё равно дотянется до свойства. Геттер и сеттер образуют публичную поверхность с проверками вокруг приватного поля. Замыкание прячет состояние в локальной переменной вообще без свойства.\n\nЛовушка геттеров — вернуть внутреннюю коллекцию. Геттер, который отдаёт this.#lines, выдаёт сам массив, и вызывающий может дописать в него в обход всех правил, которые класс собирался обеспечить. Возврат копии, замороженного массива или readonly-представления оставляет инвариант внутри класса. Та же ловушка есть и у публичного поля: как только массив стал публичным свойством, каждый потребитель становится совладельцем состояния.\n\nЗамыкание — самая дешёвая инкапсуляция из возможных. Фабрика может держать счётчик в локальной переменной и отдавать только операции, которые его меняют, а снаружи до переменной не дотянуться. По сути, класс — это удобная обёртка над таким паттерном, и он остаётся правильным выбором, когда состояние крошечное, у объекта нет жизненного цикла и методам не нужен this.\n\nКакой бы механизм вы ни выбрали, проверка одна и та же: может ли посторонний нарушить инвариант этого объекта? Если вызывающий способен задать отрицательное количество, опустошить корзину или подменить итоговую сумму, инкапсуляция декоративна. Напишите эту проверку первой, и выбор механизма получится сам.'
      ),
      bullets: [
        L('The # field is enforced by the engine, TypeScript private is erased and protects nothing at run time.', 'Поле # проверяется движком, а private в TypeScript стирается и в рантайме не защищает ничего.'),
        L('A getter that returns the internal array hands out the state.', 'Геттер, возвращающий внутренний массив, отдаёт состояние наружу.'),
        L('Return a copy, a frozen array or a readonly view from an accessor.', 'Отдавайте из аксессора копию, замороженный массив или readonly-представление.'),
        L('A closure over a local variable is the cheapest real encapsulation.', 'Замыкание над локальной переменной — самая дешёвая настоящая инкапсуляция.'),
        L('The test is whether an outsider can break an invariant of the object.', 'Проверка простая: может ли посторонний нарушить инвариант объекта.'),
      ],
      code: `class Cart {
  #lines = new Map<string, number>();

  add(sku: string, qty: number): void {
    this.#lines.set(sku, (this.#lines.get(sku) ?? 0) + qty);
  }

  get lines(): readonly { sku: string; qty: number }[] {
    return [...this.#lines].map(([sku, qty]) => ({ sku, qty }));
  }
}

const cart = new Cart();
cart.add('book', 2);
cart.lines[0].qty = 99; // mutates the copy, not the internal line
console.log(cart.lines[0].qty); // 2`,
      table: {
        caption: L('Four ways to hide state', 'Четыре способа спрятать состояние'),
        headers: [L('Mechanism', 'Механизм'), L('Real privacy at run time', 'Настоящая приватность в рантайме'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('The # field', 'Поле #'), L('Yes, enforced by the engine', 'Да, проверяет движок'), L('State that belongs to the class', 'Состояние, принадлежащее классу')],
          [L('TypeScript private', 'private в TypeScript'), L('No, erased at compile time', 'Нет, стирается при компиляции'), L('Marking intent inside the codebase', 'Фиксация намерения внутри кодовой базы')],
          [L('Getter and setter', 'Геттер и сеттер'), L('Only if the getter returns a copy', 'Только если геттер возвращает копию'), L('A validated public surface', 'Проверяемая публичная поверхность')],
          [L('Closure over a local', 'Замыкание над локальной переменной'), L('Yes, the variable is unreachable', 'Да, переменная недостижима'), L('Small state without a lifecycle', 'Малое состояние без жизненного цикла')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The getter that leaks the array', 'Геттер, который выпускает массив'),
          text: L(
            'Returning the internal array from a getter turns every consumer into a writer. The class can no longer guarantee anything about its own state, and the bug appears far from the accessor that caused it.',
            'Возврат внутреннего массива из геттера превращает каждого потребителя в писателя. Класс больше не может гарантировать ничего о своём состоянии, а баг всплывает далеко от аксессора, который его вызвал.'
          ),
        },
        {
          tone: 'tip',
          title: L('Write the invariant test first', 'Сначала напишите тест на инвариант'),
          text: L(
            'Before choosing between a private field, a getter and a closure, write the test that tries to break the object from the outside. The mechanism that passes it is the right one, and the test stays as documentation.',
            'Прежде чем выбирать между приватным полем, геттером и замыканием, напишите тест, который попытается сломать объект снаружи. Механизм, который его проходит, и есть правильный, а тест остаётся как документация.'
          ),
        },
      ],
      takeaway: L(
        'Hide state with a mechanism that survives compilation, and never hand out the internal collection.',
        'Прячьте состояние механизмом, который переживает компиляцию, и никогда не отдавайте внутреннюю коллекцию.'
      ),
      seeAlso: [
        L('Section 1-2: classes are syntax over prototypes', 'Секция 1-2: классы — это синтаксис над прототипами'),
        L('Section 2-3: information hiding and the public surface', 'Секция 2-3: сокрытие информации и публичная поверхность'),
        L('Section 6-3 (js-core): private fields and real encapsulation', 'Секция 6-3 (js-core): приватные поля и настоящая инкапсуляция'),
      ],
    },
    {
      id: 'oop-ch1-s4',
      title: L('Identity, equality and value objects', 'Идентичность, равенство и объекты-значения'),
      body: L(
        'The strict equality operator compares references for objects. Two objects with identical fields are not equal, because === asks whether both sides point at the same memory. That is the correct behaviour for entities: two rows loaded from the database are different rows even if every column matches, and a cache keyed by identity must not confuse them. It is the wrong behaviour for values: two coordinates or two money amounts with the same content should be interchangeable.\n\nA value object is a small immutable object without an identity of its own: it is defined by its fields, so two instances with equal fields are equal. In TypeScript the equality method is the contract, not an afterthought. A value object used as a Map key is keyed by identity, so the key has to be a primitive or a string you build yourself.\n\nComparing by JSON.stringify looks like a shortcut and is not one. The result depends on the order of the keys, it throws on circular structures, it silently drops undefined and functions, and it is far slower than a field-by-field comparison. Write equals explicitly, and use it at the boundary where objects arrive from the network and have to be deduplicated.\n\nThe trap is mixing the two kinds of object in one collection. An array of entities that is compared by reference forces every caller to know the identity rules, while an array of value objects compared by reference makes equality checks fail silently. Decide per type which contract it has, and write it into the type: entities carry an id, value objects carry an equals method.',
        'Строгий оператор равенства для объектов сравнивает ссылки. Два объекта с одинаковыми полями не равны, потому что === спрашивает, указывают ли обе стороны на одну и ту же память. Для сущностей это правильное поведение: две строки, загруженные из базы, — это разные строки, даже если совпадают все колонки, и кеш по идентичности не должен их путать. Для значений это неверное поведение: два набора координат или две суммы с одинаковым содержимым должны быть взаимозаменяемы.\n\nОбъект-значение — это маленький неизменяемый объект без собственной идентичности: он определяется своими полями, поэтому два экземпляра с равными полями равны. В TypeScript метод равенства — это контракт, а не формальность. Объект-значение в роли ключа Map сравнивается по идентичности, поэтому ключом должен быть примитив или строка, которую вы собрали сами.\n\nСравнение через JSON.stringify кажется сокращением, но это не сокращение. Результат зависит от порядка ключей, на циклических структурах он бросает исключение, молча теряет undefined и функции, и он заметно медленнее сравнения по полям. Пишите equals явно и применяйте его на границе, где объекты приходят из сети и их нужно дедуплицировать.\n\nЛовушка — смешать в одной коллекции оба вида объектов. Массив сущностей, сравниваемых по ссылке, заставляет каждого вызывающего знать правила идентичности, а массив объектов-значений, сравниваемых по ссылке, заставляет проверки равенства молча проваливаться. Решите для каждого типа, какой у него контракт, и запишите это в тип: сущность несёт id, объект-значение — метод equals.'
      ),
      bullets: [
        L('=== on objects compares references, not contents.', '=== для объектов сравнивает ссылки, а не содержимое.'),
        L('Entities are identified by identity, value objects by their fields.', 'Сущности определяются идентичностью, объекты-значения — своими полями.'),
        L('A value object is immutable and carries an explicit equality method.', 'Объект-значение неизменяем и несёт явный метод равенства.'),
        L('Map keys are compared by identity, so a value object cannot key a Map.', 'Ключи Map сравниваются по идентичности, поэтому объект-значение не может быть ключом Map.'),
        L('JSON.stringify comparison depends on key order and is not equality.', 'Сравнение через JSON.stringify зависит от порядка ключей и равенством не является.'),
      ],
      code: `class Money {
  readonly cents: number;

  private constructor(cents: number) {
    this.cents = cents;
  }

  static of(cents: number): Money {
    return new Money(cents);
  }

  equals(other: Money): boolean {
    return this.cents === other.cents;
  }
}

const wallet = Money.of(500);
const price = Money.of(500);
console.log(wallet === price);      // false - different objects
console.log(wallet.equals(price)); // true  - same value`,
      table: {
        caption: L('Identity or value', 'Идентичность или значение'),
        headers: [L('Kind', 'Вид'), L('Compared by', 'Сравнивается по'), L('Example', 'Пример')],
        rows: [
          [L('Entity', 'Сущность'), L('Identity, or the id it carries', 'Идентичности, либо своему id'), L('User, Order, Invoice', 'User, Order, Invoice')],
          [L('Value object', 'Объект-значение'), L('The values of its fields', 'Значениям своих полей'), L('Money, Address, DateRange', 'Money, Address, DateRange')],
          [L('Plain data', 'Простые данные'), L('Reference', 'Ссылке'), L('A DTO straight from the API', 'DTO прямо из API')],
          [L('Domain event', 'Событие домена'), L('Identity plus the payload', 'Идентичности и payload'), L('OrderPaid', 'OrderPaid')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('JSON.stringify is not equality', 'JSON.stringify — это не равенство'),
          text: L(
            'Two objects with the same data can serialise differently because of key order, and the comparison throws on cycles. Use an explicit equals method, and write it next to the type that promises it.',
            'Два объекта с одинаковыми данными могут сериализоваться по-разному из-за порядка ключей, а на циклах сравнение бросает исключение. Пишите явный метод equals и держите его рядом с типом, который его обещает.'
          ),
        },
        {
          tone: 'note',
          title: L('Identity keys in a Map', 'Идентичность в ключах Map'),
          text: L(
            'Map and Set compare keys by identity, so two equal money amounts are two different keys. Store the primitive form of the value as the key whenever you need lookup by value.',
            'Map и Set сравнивают ключи по идентичности, поэтому две равные суммы — это два разных ключа. Кладите примитивную форму значения в ключ, когда нужен поиск по значению.'
          ),
        },
      ],
      takeaway: L(
        'Decide per type whether it has an identity, and write the equality rule into the type instead of the call site.',
        'Решите для каждого типа, есть ли у него идентичность, и запишите правило равенства в тип, а не в место вызова.'
      ),
      seeAlso: [
        L('Section 2-4: data clumps and value objects', 'Секция 2-4: кластеры данных и объекты-значения'),
        L('Section 1-5: copying, mutation and immutability', 'Секция 1-5: копирование, мутация и неизменяемость'),
        L('Section 6-5 (js-core): freezing, immutability and value equality', 'Секция 6-5 (js-core): заморозка, неизменяемость и равенство по значению'),
      ],
    },
    {
      id: 'oop-ch1-s5',
      title: L('Copying, mutation and immutability', 'Копирование, мутация и неизменяемость'),
      body: L(
        'Copying is where JavaScript surprises people most. The spread operator copies one level: the new object has its own properties, but every nested object and array is still shared with the original. Mutating the nested array changes both copies, and the bug is usually reported far away from the line that caused it. A deep copy needs structuredClone, which handles cycles and typed arrays but drops class prototypes and cannot clone functions, symbols or DOM nodes.\n\nObject.freeze looks like the opposite of copying and has a similar surprise: it is shallow. The top level of the frozen object cannot change, but a nested object can, so the frozen wrapper gives a false sense of safety. readonly in TypeScript is the compile-time version of the same idea and it disappears at run time, which is fine as long as nobody assumes the object is safe to hand to code you do not control.\n\nImmutability is the systematic answer: treat objects as values, replace them instead of editing them, and let the reference change be the signal that something happened. In React, in Redux and in any cache that compares by reference, that convention is what makes an update visible. The cost is copying, so it pays off for state that is shared or observed, and it is overkill for a temporary object inside one function.\n\nA practical rule: freeze what crosses a boundary and copy what crosses a function. Data that arrives from the network, from localStorage or from a third-party library is untrusted until it is validated and frozen. Data you created inside a function and hand to a collaborator that will not keep it can stay mutable.',
        'Копирование — место, где JavaScript чаще всего удивляет. Оператор spread копирует один уровень: у нового объекта свои свойства, но каждый вложенный объект и массив остаётся общим с оригиналом. Изменение вложенного массива меняет обе копии, и баг обычно обнаруживают далеко от строки, которая его вызвала. Глубокая копия требует structuredClone: он работает с циклами и типизированными массивами, но теряет прототипы классов и не умеет копировать функции, символы и DOM-узлы.\n\nObject.freeze выглядит противоположностью копирования, но у него похожий сюрприз: заморозка поверхностная. Верхний уровень замороженного объекта изменить нельзя, а вложенный объект — можно, поэтому замороженная обёртка создаёт ложное чувство безопасности. readonly в TypeScript — это версия той же идеи на этапе компиляции, и в рантайме она исчезает, что нормально, пока никто не считает такой объект безопасным для передачи коду, которому он не доверяет.\n\nНеизменяемость — это системный ответ: относитесь к объектам как к значениям, заменяйте их вместо редактирования и позволяйте смене ссылки быть сигналом, что что-то произошло. В React, в Redux и в любом кеше, сравнивающем по ссылке, именно эта договорённость делает обновление заметным. Плата — копирование, поэтому оно окупается для разделяемого или отслеживаемого состояния и избыточно для временного объекта внутри одной функции.\n\nПрактическое правило: замораживайте то, что пересекает границу, и копируйте то, что пересекает функцию. Данные из сети, из localStorage или из сторонней библиотеки недоверенны, пока их не проверили и не заморозили. Данные, созданные внутри функции и переданные коллаборатору, который их не сохраняет, могут остаться изменяемыми.'
      ),
      bullets: [
        L('A spread copies one level, nested objects and arrays stay shared.', 'Spread копирует один уровень, вложенные объекты и массивы остаются общими.'),
        L('structuredClone deep copies plain data but loses class prototypes.', 'structuredClone глубоко копирует простые данные, но теряет прототипы классов.'),
        L('Object.freeze is shallow, nested objects stay mutable.', 'Object.freeze поверхностен, вложенные объекты остаются изменяемыми.'),
        L('readonly in TypeScript protects the compiler, not the run time.', 'readonly в TypeScript защищает компилятор, а не рантайм.'),
        L('Replace objects instead of mutating them when the state is shared or observed.', 'Заменяйте объекты, а не мутируйте их, когда состояние разделяется или отслеживается.'),
      ],
      code: `const original = { title: 'Book', tags: ['new'] };

const shallow = { ...original };
shallow.tags.push('sale');
console.log(original.tags); // ['new', 'sale'] - the array is shared

const deep = structuredClone(original);
deep.tags.push('sale');
console.log(original.tags); // ['new']

const frozen = Object.freeze({ title: 'Book', meta: { id: 1 } });
frozen.meta.id = 2;          // allowed: the freeze is shallow
console.log(frozen.meta.id); // 2`,
      table: {
        caption: L('Copy strategies', 'Стратегии копирования'),
        headers: [L('Strategy', 'Стратегия'), L('Depth', 'Глубина'), L('Keeps the prototype', 'Сохраняет прототип'), L('Note', 'Замечание')],
        rows: [
          [L('Spread { ...obj }', 'Spread { ...obj }'), L('One level', 'Один уровень'), L('No', 'Нет'), L('The usual choice for immutable updates', 'Обычный выбор для неизменяемых обновлений')],
          [L('structuredClone', 'structuredClone'), L('Deep', 'Глубокая'), L('No', 'Нет'), L('Plain data only, methods are dropped', 'Только простые данные, методы теряются')],
          [L('Object.freeze', 'Object.freeze'), L('None, it blocks writes', 'Никакая, он блокирует запись'), L('Yes', 'Да'), L('Shallow, only the top level', 'Поверхностно, только верхний уровень')],
          [L('Manual rebuild', 'Ручная пересборка'), L('What you rebuild', 'То, что вы пересобираете'), L('Yes', 'Да'), L('Explicit and fully under control', 'Явно и полностью под контролем')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A frozen object with a mutable inside', 'Замороженный объект с изменяемым внутри'),
          text: L(
            'Freezing only protects the top level. A frozen configuration with a nested array can still be edited through that array, and the configuration looks immutable in every review.',
            'Заморозка защищает только верхний уровень. У замороженной конфигурации с вложенным массивом этим массивом всё ещё можно редактировать, а конфигурация во время ревью выглядит неизменяемой.'
          ),
        },
        {
          tone: 'tip',
          title: L('Freeze at the boundary, not everywhere', 'Замораживайте на границе, а не везде'),
          text: L(
            'Frozen objects cost allocation and lose the freedom to mutate. Freeze the data that crosses into your system, and keep plain mutable objects for the short life inside a function.',
            'Замороженные объекты стоят аллокаций и лишают свободы мутировать. Замораживайте данные, которые входят в вашу систему, а внутри функции оставляйте обычные изменяемые объекты.'
          ),
        },
      ],
      takeaway: L(
        'Copy before you share, freeze at the boundary, and replace instead of mutating when the state is observed.',
        'Копируйте перед передачей, замораживайте на границе и заменяйте вместо мутации, когда состояние отслеживается.'
      ),
      seeAlso: [
        L('Section 1-4: identity, equality and value objects', 'Секция 1-4: идентичность, равенство и объекты-значения'),
        L('Section 6-5 (js-core): freezing, immutability and value equality', 'Секция 6-5 (js-core): заморозка, неизменяемость и равенство по значению'),
        L('Chapter 7 (oop): functional patterns', 'Глава 7 (oop): функциональные паттерны'),
      ],
    },
  ],
};
