import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh02: Chapter = {
  id: 'oop-ch2',
  title: L('Encapsulation and abstraction', 'Инкапсуляция и абстракция'),
  summary: L(
    'Where the rules of a domain should live, why module boundaries are the cheapest form of encapsulation, and how to keep the public surface small enough to still change your mind.',
    'Где должны жить правила предметной области, почему границы модулей — самая дешёвая форма инкапсуляции и как удержать публичную поверхность достаточно маленькой, чтобы менять решения.'
  ),
  sections: [
    {
      id: 'oop-ch2-s1',
      title: L('Where the rules live', 'Где живут правила'),
      body: L(
        'A rule can live in three places, and each one fails differently. Inside the class, the rule travels with the data it protects, but the class slowly becomes the place where everything lands. In the module, the rule is a plain function next to the data it works on, it is easy to test and it disappears from the bundle when unused, but it is not attached to any value. In the type system, the rule becomes a constraint the compiler checks, and it cannot express anything about the outside world.\n\nThe type system is the strongest of the three for what it can express. A branded type stops a raw string from being passed where an email is expected, and a discriminated union makes the impossible states unrepresentable. What it cannot do is check facts about the world: that the row still exists, that the account has funds, that the response has the shape you expected. Those checks have to run at run time.\n\nThe common mistake is to put the same rule in three places: a validator in the form, a check in the API layer and a rule in the model. Two of them will drift, and the drift is invisible until a user hits it. Put the rule where the data is owned, keep the UI validation as a convenience for the user, and treat the server as the authority.\n\nA useful test: if you delete the user interface, does the rule still hold? If the answer is no, the rule lives in the interface and the domain has no rules at all. If the answer is yes, you have found where the domain actually starts.',
        'Правило может жить в трёх местах, и каждое ломается по-своему. Внутри класса правило ходит вместе с данными, которые защищает, но класс постепенно превращается в место, куда складывается всё. В модуле правило — обычная функция рядом с данными, её легко тестировать, она исчезает из бандла, когда не используется, но она не привязана ни к какому значению. В системе типов правило становится ограничением, которое проверяет компилятор, и выразить в ней можно не всё.\n\nСистема типов сильнее остальных в том, что она вообще может выразить. Брендированный тип не даст передать сырую строку туда, где ожидается email, а дискриминируемое объединение делает невозможные состояния непредставимыми. Чего она не может — проверить факты о внешнем мире: что строка всё ещё существует, что на счёте есть деньги, что ответ сервера имеет ожидаемую форму. Такие проверки обязаны выполняться во время выполнения.\n\nЧастая ошибка — продублировать одно правило в трёх местах: валидатор в форме, проверка в слое API и правило в модели. Два из них разойдутся, и расхождение заметят только пользователи. Держите правило там, где владеют данными, оставьте проверку в интерфейсе как удобство для пользователя, а сервер считайте источником истины.\n\nПолезная проверка: если удалить пользовательский интерфейс, правило всё ещё выполняется? Если нет, правило живёт в интерфейсе, и правил у домена пока нет вообще. Если да, вы нашли, где домен начинается.'
      ),
      bullets: [
        L('Rules live in the class, in the module or in the type system, and each place fails differently.', 'Правила живут в классе, в модуле или в системе типов, и каждое место ломается по-своему.'),
        L('A branded type or a discriminated union stops invalid states at compile time.', 'Брендированный тип или дискриминируемое объединение останавливают недопустимые состояния на этапе компиляции.'),
        L('Runtime facts, such as a missing row or an empty balance, cannot be typed.', 'Фактам во время выполнения, например отсутствующей строке или нулевому балансу, типы помочь не могут.'),
        L('The same rule in the UI, the API and the model guarantees drift.', 'Одно и то же правило в интерфейсе, в API и в модели гарантирует расхождение.'),
        L('If deleting the UI removes the rule, the domain has no rules yet.', 'Если удаление интерфейса убирает правило, то правил у домена пока нет.'),
      ],
      code: `type Email = string & { readonly __brand: 'Email' };

function parseEmail(raw: string): Email {
  if (!raw.includes('@') || raw.startsWith('@')) {
    throw new Error('invalid email');
  }
  return raw as Email;
}

function notify(address: Email, message: string): void {
  console.log('sending ' + message + ' to ' + address);
}

notify(parseEmail('ada@example.com'), 'Report ready');`,
      table: {
        caption: L('Three places for a rule', 'Три места для правила'),
        headers: [L('Place', 'Место'), L('Strength', 'Сила'), L('Weakness', 'Слабость')],
        rows: [
          [L('Inside the class', 'Внутри класса'), L('The rule travels with the data', 'Правило ходит вместе с данными'), L('The class collects every responsibility', 'Класс собирает все ответственности')],
          [L('In the module', 'В модуле'), L('Easy to test, tree shakeable', 'Легко тестировать, выносится из бандла'), L('Not attached to any value', 'Не привязано ни к какому значению')],
          [L('In the type system', 'В системе типов'), L('Checked before the code runs', 'Проверяется до запуска кода'), L('Cannot express facts about the world', 'Не выражает факты о внешнем мире')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The rule that lives in three places', 'Правило, которое живёт в трёх местах'),
          text: L(
            'A validation in the form, a check in the client and a rule in the model are three implementations of one idea. Two of them will diverge, and only one of them is covered by the domain tests.',
            'Проверка в форме, проверка в клиенте и правило в модели — это три реализации одной идеи. Две из них разойдутся, и только одна из них покрыта доменными тестами.'
          ),
        },
        {
          tone: 'tip',
          title: L('Delete the interface and look again', 'Удалите интерфейс и посмотрите снова'),
          text: L(
            'If the rules disappear together with the interface, they were never domain rules. That test costs a minute and immediately shows where the domain logic leaked into the presentation layer.',
            'Если правила исчезают вместе с интерфейсом, они никогда не были доменными правилами. Эта проверка занимает минуту и сразу показывает, куда просочилась доменная логика в слой представления.'
          ),
        },
      ],
      takeaway: L(
        'Put a rule where the data is owned, and let the type system carry the part it can carry.',
        'Ставьте правило туда, где владеют данными, а системе типов отдайте ту часть, которую она вообще может выразить.'
      ),
      seeAlso: [
        L('Section 2-5: when a class is the wrong tool', 'Секция 2-5: когда класс — не тот инструмент'),
        L('Section 4-5: dependency inversion', 'Секция 4-5: инверсия зависимостей'),
        L('Chapter 6 (typescript): branded types and safe APIs', 'Глава 6 (typescript): брендированные типы и безопасные API'),
      ],
    },
    {
      id: 'oop-ch2-s2',
      title: L('Modules as encapsulation', 'Модули как инкапсуляция'),
      body: L(
        'An ES module is already an encapsulation boundary. Everything a module does not export is unreachable from the outside, with no run time cost and no ceremony. That makes the module the cheapest place to hide an implementation: an internal helper, a constant, a private function. A private class field is a stronger mechanism, but it costs a class, an instance and a name for the state.\n\nThe public surface of a module is the list of its exports, and that list is a promise. Every exported symbol can be imported by anyone, so a helper that leaks into the public API by accident becomes something you have to keep working. An index file that re-exports everything with export * turns the whole folder into one surface. A deliberate index that exports two names is a contract; the star export is an accident.\n\nTwo more traps come with modules. Deep imports, when a consumer reaches into another feature internals, couple the two modules so that a refactor in one breaks the other. Circular imports make the evaluation order observable, and an imported binding can be undefined at module evaluation time even though the type checker says nothing about it.\n\nThe practical rule: one public entry point per module, everything else an implementation detail. A consumer that imports from the entry point can be refactored freely, because it depends on the contract. A consumer that reaches inside depends on the implementation, and every change to it becomes a negotiation.',
        'ES-модуль — это уже граница инкапсуляции. Всё, что модуль не экспортирует, недостижимо снаружи, без затрат во время выполнения и без церемоний. Поэтому модуль — самое дешёвое место, где можно спрятать реализацию: внутреннего помощника, константу, приватную функцию. Приватное поле класса — механизм посильнее, но он стоит класса, экземпляра и имени для состояния.\n\nПубличная поверхность модуля — это список его экспортов, и этот список является обещанием. Любой экспортированный символ может импортировать кто угодно, поэтому помощник, случайно попавший в публичный API, становится тем, о чём придётся заботиться дальше. index-файл, который переэкспортирует всё через export *, превращает всю папку в одну поверхность. Осознанный index с двумя именами — это контракт; звезда — это случайность.\n\nЕщё две ловушки идут в комплекте с модулями. Глубокие импорты, когда потребитель залезает во внутренности чужой фичи, связывают модули так, что рефакторинг одного ломает другой. Циклические импорты делают заметным порядок вычисления модулей, и импортированная связка может быть undefined в момент вычисления модуля, хотя проверка типов не скажет ни слова.\n\nПрактическое правило: одна публичная точка входа на модуль, всё остальное — детали реализации. Потребитель, который импортирует из точки входа, рефакторится свободно, потому что зависит от контракта. Потребитель, который лезет внутрь, зависит от реализации, и каждое изменение в ней превращается в переговоры.'
      ),
      bullets: [
        L('A module hides everything it does not export, for free.', 'Модуль прячет всё, что не экспортирует, бесплатно.'),
        L('Every export is a promise, and an accidental export is a promise you did not intend.', 'Каждый экспорт — обещание, а случайный экспорт это обещание, которое не собирались давать.'),
        L('An index file with export star turns the folder into one large public surface.', 'index-файл с export * превращает папку в одну большую публичную поверхность.'),
        L('Deep imports couple consumers to the implementation of another module.', 'Глубокие импорты связывают потребителя с реализацией чужого модуля.'),
        L('Circular imports make the evaluation order observable at run time.', 'Циклические импорты делают порядок вычисления модулей заметным во время выполнения.'),
      ],
      code: `// pricing.ts - the module boundary
const DEFAULT_CURRENCY = 'EUR';

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function parsePrice(raw: string): number {
  return toCents(Number(raw.replace(',', '.')));
}

export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(2) + ' ' + DEFAULT_CURRENCY;
}

// Only these two names are part of the contract
console.log(formatPrice(parsePrice('19,99'))); // '19.99 EUR'`,
      callouts: [
        {
          tone: 'warning',
          title: L('export star is a public promise', 'export * — это публичное обещание'),
          text: L(
            'A barrel that re-exports everything turns every internal helper into API. When you later need to rename that helper, you have to search the whole repository instead of one module.',
            'Barrel, который переэкспортирует всё, превращает любой внутренний помощник в API. Когда позже понадобится переименовать помощника, придётся искать по всему репозиторию, а не в одном модуле.'
          ),
        },
        {
          tone: 'note',
          title: L('Cycles fail late, not early', 'Циклы падают поздно, а не рано'),
          text: L(
            'The type checker accepts a circular import, and the bundler accepts it too. The failure appears when one module reads a binding from the other during evaluation, and it looks like an unrelated undefined value.',
            'Проверка типов принимает циклический импорт, и бандлер тоже. Ошибка возникает, когда один модуль читает связку из другого в момент вычисления, и выглядит как посторонний undefined.'
          ),
        },
      ],
      takeaway: L(
        'One public entry point per module, and every export is a promise you intend to keep.',
        'Одна публичная точка входа на модуль, и каждый экспорт — обещание, которое вы собираетесь сдержать.'
      ),
      seeAlso: [
        L('Section 2-3: information hiding and the public surface', 'Секция 2-3: сокрытие информации и публичная поверхность'),
        L('Section 3-4: composition over inheritance', 'Секция 3-4: композиция вместо наследования'),
        L('Section 3-4 (js-core): the global object and module scope', 'Секция 3-4 (js-core): глобальный объект и область видимости модуля'),
      ],
    },
    {
      id: 'oop-ch2-s3',
      title: L('Information hiding and the public surface', 'Сокрытие информации и публичная поверхность'),
      body: L(
        'Information hiding is not the same as encapsulation. Encapsulation says the data belongs to the object; information hiding says the design decision belongs behind the interface. The classic example is the choice of data structure: an array behind a method that returns a sorted copy hides the fact that the storage is an array at all, so the array can become a tree without touching a single caller.\n\nThe rule of thumb is simple: hide the decisions most likely to change, not the decisions that are inconvenient today. The most likely changes are the storage format, the algorithm, the external protocol and the shape of a payload. The public surface should therefore be small: a constructor and a few operations that express the intent, never the internals.\n\nEvery public member is a promise, and promises are expensive. A public field is a permanent part of the contract, because changing its type or its meaning breaks every consumer. A getter that returns the internal array leaks the storage format and turns a refactoring into a coordinated release. A method named after the intent, such as addLine, survives changes of the internal representation.\n\nSmall surfaces also make testing cheaper: a consumer depends on a contract, so a fake only has to implement the contract. And they keep the door open for the change you cannot predict yet, which is the only reason to build abstractions at all.',
        'Сокрытие информации — это не то же самое, что инкапсуляция. Инкапсуляция говорит, что данные принадлежат объекту; сокрытие информации говорит, что проектное решение спрятано за интерфейсом. Классический пример — выбор структуры данных: массив за методом, возвращающим отсортированную копию, прячет сам факт, что хранилище — массив, и тогда массив можно заменить на дерево, не тронув ни одного вызывающего.\n\nПравило простое: прячьте решения, которые вероятнее всего изменятся, а не те, которые сегодня неудобны. Чаще всего меняются формат хранения, алгоритм, внешний протокол и форма передаваемых данных. Поэтому публичная поверхность должна быть маленькой: конструктор и несколько операций, выражающих намерение, но никогда — внутренности.\n\nКаждый публичный член — обещание, а обещания стоят дорого. Публичное поле навсегда остаётся частью контракта: смена его типа или смысла ломает всех потребителей. Геттер, отдающий внутренний массив, выдаёт формат хранения и превращает рефакторинг в согласованный релиз. Метод, названный по намерению, вроде addLine, переживает смену внутреннего представления.\n\nМаленькая поверхность ещё и удешевляет тестирование: потребитель зависит от контракта, поэтому фейк реализует только контракт. И она оставляет дверь открытой для того изменения, которое вы не можете предсказать, — единственная настоящая причина строить абстракции.'
      ),
      bullets: [
        L('Encapsulation owns the data, information hiding owns the decision.', 'Инкапсуляция владеет данными, сокрытие информации — решением.'),
        L('Hide the decisions that are likely to change: storage, algorithm, protocol, payload.', 'Прячьте решения, которые вероятно изменятся: хранилище, алгоритм, протокол, формат данных.'),
        L('Every public member is a promise you have to keep.', 'Каждый публичный член — обещание, которое придётся сдержать.'),
        L('A getter that returns the internal collection leaks the storage format.', 'Геттер, отдающий внутреннюю коллекцию, выдаёт формат хранения.'),
        L('Name operations after the intent so the representation can change later.', 'Называйте операции по намерению, чтобы формат представления можно было менять.'),
      ],
      code: `type Row = { id: string; total: number };

class Ledger {
  #rows: Row[];

  constructor(rows: Row[]) {
    this.#rows = [...rows]; // the caller cannot mutate our copy
  }

  add(row: Row): void {
    this.#rows.push(row);
  }

  totalsAbove(limit: number): readonly Row[] {
    return this.#rows.filter((row) => row.total > limit);
  }
}

const ledger = new Ledger([{ id: 'r1', total: 10 }]);
ledger.add({ id: 'r2', total: 30 });
console.log(ledger.totalsAbove(20).length); // 1`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The public field that never changes', 'Публичное поле, которое не меняется'),
          text: L(
            'A public property looks harmless until someone assigns to it. After that the class can no longer guarantee anything about its own state, and the only way to fix it is a breaking change for every consumer.',
            'Публичное свойство выглядит безобидно, пока кто-нибудь в него не запишет. После этого класс больше не может гарантировать ничего о своём состоянии, а исправить это можно только breaking change для всех потребителей.'
          ),
        },
        {
          tone: 'tip',
          title: L('Ask what breaks on a format change', 'Спросите, что сломается при смене формата'),
          text: L(
            'Imagine the storage changes from an array to a tree tomorrow. If only one file has to change, the information is hidden well. If five files have to change, the format leaked into the public surface.',
            'Представьте, что завтра хранилище меняется с массива на дерево. Если меняется один файл, информация спрятана хорошо. Если пять файлов — формат просочился в публичную поверхность.'
          ),
        },
      ],
      takeaway: L(
        'Hide the decisions that are likely to change, and keep every public member small and named after the intent.',
        'Прячьте решения, которые вероятно изменятся, и держите публичные члены мелкими и названными по намерению.'
      ),
      seeAlso: [
        L('Section 1-3: private fields, getters and closures', 'Секция 1-3: приватные поля, геттеры и замыкания'),
        L('Section 4-4: interface segregation', 'Секция 4-4: разделение интерфейсов'),
        L('Chapter 2 (architecture): clean architecture and ports and adapters', 'Глава 2 (architecture): чистая архитектура и порты с адаптерами'),
      ],
    },
    {
      id: 'oop-ch2-s4',
      title: L('Data clumps and value objects', 'Кластеры данных и объекты-значения'),
      body: L(
        'A data clump is a group of parameters that keeps appearing together. A function called with a customerId, an invoiceId and an amount, and then another function called with the same three, is telling you that those three are one thing. The clump is usually a missing concept: an invoice reference, a money amount, a customer. Naming it removes the repetition, gives it validation and lets it be compared by value.\n\nThe value object that replaces the clump is immutable, validates in its constructor and compares by value. Because it is immutable it can be shared, cached and used as part of another value without defensive copying. Its methods return new instances, so the code reads as a sequence of transformations rather than as a sequence of mutations.\n\nThe trap is drawing the boundary in the wrong place. A value object that needs an identifier has become an entity, and an entity that only holds data with no behaviour is an anemic model. Another trap is a constructor that accepts a bag of optional fields, because every field becomes nullable somewhere downstream and the compiler stops helping.\n\nThe tell that a clump is still a clump: the same three or four names keep appearing in signatures and in type definitions. When you see the pattern, extract the concept and watch the signatures shrink. Nothing else in the code has to change, which is exactly why the refactoring is safe.',
        'Кластер данных — это группа параметров, которая постоянно появляется вместе. Функция, вызванная с customerId, invoiceId и amount, а затем другая функция с теми же тремя, говорит вам, что эти три — одна вещь. Обычно в кластере спрятана недостающая концепция: ссылка на счёт, сумма денег, клиент. Если дать ей имя, уйдёт повторение, появится проверка и сравнение по значению.\n\nОбъект-значение, который заменяет кластер, неизменяем, проверяется в конструкторе и сравнивается по значению. Благодаря неизменяемости его можно разделять, кешировать и использовать как часть другого значения без защитного копирования. Его методы возвращают новые экземпляры, поэтому код читается как последовательность преобразований, а не как последовательность мутаций.\n\nЛовушка — провести границу не там. Объект-значение, которому нужен идентификатор, превратился в сущность, а сущность, которая только хранит данные без поведения, — это анемичная модель. Другая ловушка — конструктор с мешком необязательных полей: каждое поле становится nullable где-то дальше, и компилятор перестаёт помогать.\n\nПризнак того, что кластер ещё не выделен: одни и те же три-четыре имени постоянно встречаются в сигнатурах и в определениях типов. Увидев такой паттерн, выделите концепцию и посмотрите, как сократились сигнатуры. Больше ничего в коде менять не придётся, и именно поэтому такое преобразование безопасно.'
      ),
      bullets: [
        L('A data clump is a set of parameters that keep travelling together through signatures.', 'Кластер данных — это набор параметров, который постоянно повторяется в сигнатурах.'),
        L('The clump usually hides a missing named concept.', 'Кластер обычно прячет неназванную концепцию.'),
        L('A value object is immutable, validates once and compares by value.', 'Объект-значение неизменяем, проверяется один раз и сравнивается по значению.'),
        L('A value object that needs an id has become an entity.', 'Объект-значение, которому нужен id, превратился в сущность.'),
        L('Extracting a clump shortens the signatures without changing the logic.', 'Выделение кластера сокращает сигнатуры, не меняя логику.'),
      ],
      code: `class Address {
  readonly street: string;
  readonly city: string;
  readonly postalCode: string;

  constructor(street: string, city: string, postalCode: string) {
    if (!postalCode) throw new Error('postal code is required');
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
  }

  get formatted(): string {
    return \`\${this.street}, \${this.city} \${this.postalCode}\`;
  }
}

const address = new Address('Main 1', 'Rome', '00100');
console.log(address.formatted); // 'Main 1, Rome 00100'`,
      table: {
        caption: L('Value object or entity', 'Объект-значение или сущность'),
        headers: [L('Question', 'Вопрос'), L('Value object', 'Объект-значение'), L('Entity', 'Сущность')],
        rows: [
          [L('Does it have an identity?', 'Есть ли у него идентичность?'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('How is it compared?', 'Как сравнивается?'), L('By its fields', 'По своим полям'), L('By identity or id', 'По идентичности или id')],
          [L('Can it change?', 'Может ли он меняться?'), L('No, it is replaced', 'Нет, его заменяют'), L('Yes, in place', 'Да, на месте')],
          [L('Example', 'Пример'), L('Money, Address, DateRange', 'Money, Address, DateRange'), L('User, Order, Invoice', 'User, Order, Invoice')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The value object that grew an id', 'Объект-значение, у которого появился id'),
          text: L(
            'As soon as a value object needs an identifier to be found again, it is an entity. Trying to keep both roles in one type gives you a type whose equality rules depend on where it came from.',
            'Как только объекту-значению нужен идентификатор, чтобы его снова найти, это сущность. Попытка совместить обе роли в одном типе даёт тип, правила равенства которого зависят от происхождения.'
          ),
        },
        {
          tone: 'tip',
          title: L('Watch the constructor grow', 'Следите за конструктором'),
          text: L(
            'When a constructor passes four or five related parameters, that is a data clump asking for a name. Extracting it is usually a ten-line change and removes the repetition from every call site.',
            'Когда конструктор принимает четыре-пять связанных параметров, это кластер данных, который просит имени. Выделить его обычно десять строк кода и убирает повторение из каждого места вызова.'
          ),
        },
      ],
      takeaway: L(
        'When the same parameters keep travelling together, name the concept and make it a value object.',
        'Когда одни и те же параметры постоянно ходят вместе, дайте концепции имя и сделайте её объектом-значением.'
      ),
      seeAlso: [
        L('Section 1-4: identity, equality and value objects', 'Секция 1-4: идентичность, равенство и объекты-значения'),
        L('Section 2-1: where the rules live', 'Секция 2-1: где живут правила'),
        L('Chapter 6 (oop): domain building blocks', 'Глава 6 (oop): строительные блоки домена'),
      ],
    },
    {
      id: 'oop-ch2-s5',
      title: L('When a class is the wrong tool', 'Когда класс — не тот инструмент'),
      body: L(
        'A class earns its place when it owns state and the invariant that state must satisfy, plus a lifecycle that decides when the state changes. Strip those away and a class is a namespace with extra ceremony: a constructor that only stores collaborators, methods that never use this, and a name that pretends to be a thing. Such a class is harder to read than the functions it wraps and harder to delete.\n\nPlain data with functions is the better tool in that case. The data is serialisable, comparable, easy to construct in a test and easy to pass through a React state update without any identity questions. The functions are pure, so they can be tested one by one, and they can be moved between modules without dragging a class hierarchy along.\n\nThe traps on the other side are real too. A bag of functions that secretly relies on module level state is worse than a class, because the dependency is invisible. A service class whose constructor takes five collaborators and does nothing but forward calls is a namespace that pretends to be injectable. And a class per screen, each with one method, produces a hierarchy that nobody can navigate.\n\nThe decision rule: if the thing has no state, no invariant and no lifecycle, write functions. If it has state and rules that must always hold, write a class and make the rules private. When in doubt, start with plain data and promote it to a class the moment you need an invariant you can enforce.',
        'Класс оправдан, когда он владеет состоянием и инвариантом, который это состояние должно удовлетворять, а ещё жизненным циклом, который определяет, когда состояние меняется. Уберите это — и класс превращается в namespace с лишней церемонией: конструктор, который только хранит коллабораторов, методы, которым не нужен this, и имя, притворяющееся, что здесь что-то есть. Такой класс читается хуже, чем обёрнутые им функции, и удаляется хуже.\n\nПростые данные с функциями в этом случае лучший инструмент. Данные сериализуемы, сравнимы, легко создаются в тесте и легко проходят через обновление состояния в React без вопросов об идентичности. Функции чистые, поэтому тестируются по одной, и их можно переносить между модулями, не таща за собой иерархию классов.\n\nЛовушки есть и по другую сторону. Набор функций, который незаметно опирается на состояние уровня модуля, хуже класса, потому что зависимость невидима. Сервисный класс, чей конструктор принимает пять коллабораторов и только пересылает вызовы, — это namespace, притворяющийся внедряемым. А класс на каждый экран, у каждого по одному методу, порождает иерархию, в которой никто не разберётся.\n\nПравило решения: если у сущности нет состояния, инварианта и жизненного цикла — пишите функции. Если есть состояние и правила, которые должны выполняться всегда, — пишите класс и прячьте правила внутрь. Если сомневаетесь, начните с простых данных и превратите их в класс в тот момент, когда понадобится инвариант, который можно обеспечить.'
      ),
      bullets: [
        L('A class is worth it when it owns state, an invariant and a lifecycle.', 'Класс оправдан, когда он владеет состоянием, инвариантом и жизненным циклом.'),
        L('A class whose constructor only stores collaborators is a namespace with extra steps.', 'Класс, чей конструктор только хранит зависимости, — это namespace с лишними шагами.'),
        L('Plain data with pure functions is serialisable, testable and easy to move.', 'Простые данные и чистые функции сериализуемы, тестируемы и легко переносятся.'),
        L('Module level state hidden behind functions is worse than a class.', 'Скрытое состояние уровня модуля за функциями хуже класса.'),
        L('Promote plain data to a class the moment you need an enforceable invariant.', 'Превращайте данные в класс, когда появляется инвариант, который надо обеспечить.'),
      ],
      code: `interface User {
  firstName: string;
  lastName: string;
}

const fullName = (user: User): string =>
  \`\${user.firstName} \${user.lastName}\`;

const greet = (user: User): string =>
  \`Hello, \${fullName(user)}!\`;

const byLastName = (users: User[]): User[] =>
  [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));

console.log(greet({ firstName: 'Ada', lastName: 'Lovelace' }));
console.log(byLastName([{ firstName: 'Ada', lastName: 'Lovelace' }]).length);`,
      table: {
        caption: L('Class or plain data', 'Класс или простые данные'),
        headers: [L('Situation', 'Ситуация'), L('Use', 'Инструмент'), L('Reason', 'Причина')],
        rows: [
          [L('State plus an invariant', 'Состояние и инвариант'), L('Class with private fields', 'Класс с приватными полями'), L('The class can enforce the rule', 'Класс может обеспечить правило')],
          [L('A record with no rules', 'Запись без правил'), L('Plain object and functions', 'Простой объект и функции'), L('There is nothing to encapsulate', 'Инкапсулировать нечего')],
          [L('A set of related functions', 'Набор связанных функций'), L('Module with exports', 'Модуль с экспортами'), L('The module is the boundary', 'Границей служит модуль')],
          [L('A lifecycle of resources', 'Жизненный цикл ресурсов'), L('Class with an explicit close', 'Класс с явным освобождением'), L('The order of cleanup matters', 'Порядок освобождения важен')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Start with data, promote on demand', 'Начните с данных и повышайте по требованию'),
          text: L(
            'Plain data with functions is easy to convert into a class later, because the class can be introduced around the existing functions. The reverse, unwinding a class full of accidental responsibilities, is expensive.',
            'Простые данные с функциями легко превратить в класс позже: класс появляется вокруг существующих функций. Обратное — распутывание класса с накопившимися случайными ответственностями — стоит дорого.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The service class that forwards everything', 'Сервисный класс, который всё пересылает'),
          text: L(
            'A class whose methods only pass arguments to injected collaborators adds a layer and a name, but no behaviour. It looks injectable while hiding the fact that there is nothing to inject.',
            'Класс, чьи методы только передают аргументы внедрённым коллабораторам, добавляет слой и имя, но не поведение. Он выглядит внедряемым, скрывая, что внедрять нечего.'
          ),
        },
      ],
      takeaway: L(
        'Use a class when it owns state, an invariant and a lifecycle; otherwise use plain data and functions.',
        'Класс нужен, когда он владеет состоянием, инвариантом и жизненным циклом; иначе — простые данные и функции.'
      ),
      seeAlso: [
        L('Section 2-1: where the rules live', 'Секция 2-1: где живут правила'),
        L('Section 1-3: private fields, getters and closures', 'Секция 1-3: приватные поля, геттеры и замыкания'),
        L('Section 4-6 (oop): SOLID in a React codebase', 'Секция 4-6 (oop): SOLID в кодовой базе на React'),
      ],
    },
  ],
};
