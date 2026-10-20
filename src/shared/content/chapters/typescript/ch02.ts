import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh02: Chapter = {
  id: 'ts-ch2',
  title: L('Unions, intersections and narrowing', 'Объединения, пересечения и сужение'),
  summary: L(
    'How a value can be one of several shapes, how the compiler narrows a broad type down to the one in hand, how intersections combine shapes, and how to write guards of your own.',
    'Как значение может быть одной из нескольких форм, как компилятор сужает широкий тип до нужного, как пересечения объединяют формы и как написать собственные проверки.'
  ),
  sections: [
    {
      id: 'ts-ch2-s1',
      title: L('Union types and discriminant properties', 'Объединения типов и дискриминируемые свойства'),
      body: L(
        'A union type describes a value that may be one of several types: string | number, or a set of object shapes. The rule that matters is assignability, and a value fits a union when it fits at least one member. Everything the union cannot guarantee is therefore unavailable. A property that exists on only one member cannot be read until the compiler has proved which member is in hand, and that proof is called narrowing.\n\nThe cleanest union is the discriminated one, where every member carries a literal field with a different value. That field is the discriminant, and a comparison against it tells the compiler exactly which member it is holding. This is the backbone of state machines, of API results that are either a value or an error, and of React component states.\n\nA discriminated union also turns an incomplete switch into a compile error. When every member has a case and the switch returns in each of them, the compiler knows the function cannot fall through, so the default branch that assigns the value to never becomes the place where a missing case is reported instead of a silent undefined at run time.\n\nWithout a discriminant the union still works, but the narrowing has to be done by hand, property by property. A check for the presence of a property, an instanceof test or a typeof test each narrow one member. The discriminated form is worth the extra field because it turns a run time question into a single comparison that the compiler can follow through the whole function.',
        'Объединение типов описывает значение, которое может быть одним из нескольких типов: string | number или набор объектных форм. Важное правило — присваиваемость: значение подходит объединению, если оно подходит хотя бы одному участнику. Всё, чего объединение гарантировать не может, недоступно. Свойство, которое есть только у одного участника, нельзя прочитать, пока компилятор не докажет, какой участник перед ним; это доказательство и называется сужением.\n\nЧистейшее объединение — дискриминированное, где у каждого участника есть литеральное поле с разным значением. Это поле и есть дискриминант, а сравнение с ним говорит компилятору, какой именно участник он держит. На этом стоят конечные автоматы, результаты API, которые бывают либо значением, либо ошибкой, и состояния React-компонентов.\n\nДискриминированное объединение превращает неполный switch в ошибку компиляции. Когда у каждого участника есть case, а switch возвращает в каждом из них, компилятор знает, что функция не провалится дальше, и ветка default, присваивающая значение в never, становится местом, где сообщается о забытом случае, вместо тихого undefined в рантайме.\n\nБез дискриминанта объединение тоже работает, но сужать приходится вручную, свойство за свойством. Проверка наличия свойства, instanceof или typeof сужают по одному участнику. Дискриминированная форма стоит одного лишнего поля, потому что превращает рантайм-вопрос в одно сравнение, за которым компилятор следит на протяжении всей функции.'
      ),
      bullets: [
        L('A union accepts a value that fits at least one of its members.', 'Объединение принимает значение, подходящее хотя бы одному из участников.'),
        L('A property that only one member has cannot be read before narrowing.', 'Свойство, есть лишь у одного участника, нельзя прочитать до сужения.'),
        L('A literal discriminant field identifies the member with one comparison.', 'Литеральное дискриминирующее поле определяет участника одним сравнением.'),
        L('An exhaustive switch over a union needs no default branch to type check.', 'Исчерпывающий switch по объединению не требует ветки default, чтобы пройти проверку типов.'),
        L('A discriminated union models a state machine, not just a bag of fields.', 'Дискриминированное объединение моделирует конечный автомат, а не просто набор полей.'),
      ],
      code: `type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
  }
}

const shape: Shape = { kind: 'circle', radius: 2 };
console.log(area(shape));`,
      table: {
        caption: L('Reading a member of a union', 'Чтение участника объединения'),
        headers: [
          L('Expression', 'Выражение'),
          L('Works?', 'Работает?'),
          L('Reason', 'Причина'),
        ],
        rows: [
          [
            L('shape.radius', 'shape.radius'),
            L('no', 'нет'),
            L('radius exists on one member only', 'radius есть только у одного участника'),
          ],
          [
            L('shape.kind', 'shape.kind'),
            L('yes', 'да'),
            L('the discriminant exists on every member', 'дискриминант есть у всех участников'),
          ],
          [
            L('shape.radius after shape.kind === "circle"', 'shape.radius после shape.kind === "circle"'),
            L('yes', 'да'),
            L('narrowed to the circle member', 'сужено до участника circle'),
          ],
          [
            L('shape.area()', 'shape.area()'),
            L('no', 'нет'),
            L('a method missing on some members is unavailable', 'метод, которого нет у части участников, недоступен'),
          ],
          [
            L('shape.side', 'shape.side'),
            L('no', 'нет'),
            L('the same problem with another member', 'та же проблема с другим участником'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Add the discriminant field', 'Добавьте дискриминирующее поле'),
          text: L(
            'One extra literal field turns a union from a list of possibilities into a shape the compiler can narrow. If the members look alike at run time, the field is the only way to tell them apart.',
            'Одно лишнее литеральное поле превращает объединение из списка возможностей в форму, которую компилятор умеет сужать. Если участники похожи в рантайме, поле — единственный способ их различить.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Literals are checked too', 'Литералы тоже проверяются'),
          text: L(
            'A fresh object literal assigned to a union is checked for the properties of the union, so an unknown field is an error. A variable built earlier and passed in skips that check, and the same shape behaves differently in the two places.',
            'Свежий литерал объекта, присвоенный объединению, проверяется по свойствам объединения, поэтому неизвестное поле — ошибка. Переменная, собранная раньше, эту проверку проходит, и одна и та же форма ведёт себя в двух местах по-разному.'
          ),
        },
      ],
      takeaway: L(
        'Give every member of a union a literal discriminant and the compiler narrows it for you.',
        'Дайте каждому участнику объединения литеральный дискриминант, и компилятор сузит тип сам.'
      ),
      seeAlso: [
        L('Section 2-2: narrowing with typeof, in and instanceof', 'Секция 2-2: сужение через typeof, in и instanceof'),
        L('Section 2-3: control flow analysis and exhaustiveness', 'Секция 2-3: анализ потока управления и проверка полноты'),
        L('Section 3-3: excess property checks on object literals', 'Секция 3-3: проверка лишних свойств на литералах объектов'),
      ],
    },
    {
      id: 'ts-ch2-s2',
      title: L('Narrowing with typeof, in and instanceof', 'Сужение через typeof, in и instanceof'),
      body: L(
        'Narrowing is the mechanism, and the checks below are the tools. A typeof test separates the primitive members of a union, because the compiler knows that a string is a string and a number is a number. It works on values, not on types, and it cannot tell two object shapes apart, because every object reports the same typeof "object".\n\nThe in operator narrows by the presence of a property, and it is the natural tool for unions whose members have different fields. The instanceof test narrows a union of class instances and follows the prototype chain, so a subclass matches its base class. Array.isArray narrows an array against everything else, though it is worth remembering that it answers true for any array, whatever the element type.\n\nEach check has a blind spot, and mixing them is the reliable answer. A value from outside is unknown, and unknown needs a typeof check first; a union of two objects needs the in operator or a discriminant; a union of class instances needs instanceof. When two checks apply to the same value, the compiler narrows to what survives both, which is exactly the behaviour you want.\n\nOne trap deserves naming: typeof does not narrow an interface or a type alias to one member of a union, because those names are erased. Two interfaces describing different entities have the same run time shape as far as typeof is concerned. When the members of a union look alike at run time, the discrimination has to come from a field, not from the type.',
        'Сужение — это механизм, а перечисленные ниже проверки — его инструменты. Проверка typeof разделяет примитивных участников объединения, потому что компилятор знает: строка есть строка, а число есть число. Она работает со значениями, а не с типами, и не может отличить две объектные формы, потому что любой объект сообщает один и тот же typeof "object".\n\nОператор in сужает по наличию свойства, и это естественный инструмент для объединений, у которых участники имеют разные поля. Проверка instanceof сужает объединение экземпляров классов и учитывает цепочку прототипов, так что подкласс подходит своему базовому классу. Array.isArray сужает массив против всего остального, но стоит помнить, что она отвечает true для любого массива, какого бы ни был тип элементов.\n\nУ каждой проверки есть слепое место, и надёжный ответ — комбинировать их. Значение извне имеет тип unknown, и unknown сначала требует проверки typeof; объединение из двух объектов требует оператора in или дискриминанта; объединение экземпляров классов требует instanceof. Когда к одному значению применимы две проверки, компилятор сужает до того, что пережило обе, и это ровно то поведение, которое нужно.\n\nОдна ловушка заслуживает отдельного имени: typeof не сужает интерфейс или алиас типа до одного участника объединения, потому что эти имена стираются. Два интерфейса, описывающие разные сущности, имеют одинаковую форму в рантайме с точки зрения typeof. Когда участники объединения похожи в рантайме, различать их приходится полем, а не типом.'
      ),
      bullets: [
        L('typeof narrows primitives, never two object shapes.', 'typeof сужает примитивы и никогда — две объектные формы.'),
        L('The in operator narrows a union by the presence of a property.', 'Оператор in сужает объединение по наличию свойства.'),
        L('instanceof narrows class instances and follows the prototype chain.', 'instanceof сужает экземпляры классов и учитывает цепочку прототипов.'),
        L('Array.isArray narrows against any array, whatever the element type.', 'Array.isArray сужает против любого массива, какого бы ни был тип элементов.'),
        L('Two checks on the same value narrow to whatever survives both.', 'Две проверки одного значения сужают до того, что пережило обе.'),
      ],
      code: `function format(value: string | number | boolean): string {
  if (typeof value === 'string') return value.toUpperCase();
  if (typeof value === 'number') return value.toFixed(2);
  return value ? 'yes' : 'no';
}

function speak(pet: { meow(): void } | { bark(): void }): string {
  if ('meow' in pet) {
    pet.meow();
    return 'meow';
  }
  pet.bark();
  return 'bark';
}

class NotFound extends Error {}

function describe(error: Error): string {
  return error instanceof NotFound ? 'not found' : 'other error';
}

console.log(format('text'), speak({ bark() {} }), describe(new NotFound('x')));`,
      table: {
        caption: L('Which check to reach for', 'Какую проверку выбрать'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Check', 'Проверка'),
          L('Narrows to', 'Сужает до'),
        ],
        rows: [
          [
            L('a string or a number', 'строка или число'),
            L('typeof x === "string"', 'typeof x === "string"'),
            L('string', 'string'),
          ],
          [
            L('two object shapes', 'две объектные формы'),
            L('"id" in x', '"id" in x'),
            L('the member that has id', 'участника, у которого есть id'),
          ],
          [
            L('class instances', 'экземпляры классов'),
            L('x instanceof Error', 'x instanceof Error'),
            L('Error and its subclasses', 'Error и его подклассы'),
          ],
          [
            L('an array or not', 'массив или нет'),
            L('Array.isArray(x)', 'Array.isArray(x)'),
            L('the array member', 'участника с массивом'),
          ],
          [
            L('unknown input', 'вход типа unknown'),
            L('typeof x === "object"', 'typeof x === "object"'),
            L('object, still not a specific shape', 'object, но всё ещё не конкретная форма'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('typeof cannot separate interfaces', 'typeof не различает интерфейсы'),
          text: L(
            'Two interfaces have the same typeof at run time, so a typeof branch never picks one of them. Give the members a literal field and narrow on that field instead.',
            'У двух интерфейсов одинаковый typeof в рантайме, поэтому ветка typeof не выберет ни один из них. Дайте участникам литеральное поле и сужайте по нему.'
          ),
        },
        {
          tone: 'tip',
          title: L('Narrow unknown in two steps', 'Сужайте unknown в два шага'),
          text: L(
            'First check that the value is an object, then check that the property is there. Two cheap steps replace one cast, and the value stays typed afterwards.',
            'Сначала проверьте, что значение это объект, потом — что свойство на месте. Два дешёвых шага заменяют одно приведение, и значение остаётся типизированным дальше.'
          ),
        },
      ],
      takeaway: L(
        'Pick the check that matches the run time difference between the members: typeof for primitives, in for fields, instanceof for classes.',
        'Выбирайте проверку по тому, чем участники отличаются в рантайме: typeof для примитивов, in для полей, instanceof для классов.'
      ),
      seeAlso: [
        L('Section 1-5: unknown as the type of external data', 'Секция 1-5: unknown как тип внешних данных'),
        L('Section 2-5: type predicates and assertion functions', 'Секция 2-5: предикаты типа и утверждающие функции'),
        L('Section 3-3: index signatures and unknown values', 'Секция 3-3: индексные сигнатуры и значения типа unknown'),
      ],
    },
    {
      id: 'ts-ch2-s3',
      title: L('Control flow analysis and exhaustiveness', 'Анализ потока управления и проверка полноты'),
      body: L(
        'TypeScript does not only narrow inside a single check. It follows the flow of the program: an assignment narrows the variable to the type of the assigned value, an early return removes the rest of the function from consideration, and a throw ends the path as surely as a return does. This is control flow analysis, and it is why a value can be treated as defined after a guard even far away from the guard.\n\nThe most useful form of it is the exhaustiveness check. Take a union, switch over it with a case for every member, and in the default branch assign the value to a variable of type never. While the switch covers every member, that assignment is legal. Add a new member to the union and the assignment stops compiling, because the default branch now receives a value that is not never.\n\nThe helper that performs the assignment is usually a single function, and it is worth writing once and reusing. The compiler tracks the type of the argument as it narrows down through the switch, so by the time the default branch is reached, the value has the type never. The function throws, so it also tells the compiler that the branch is not reachable afterwards.\n\nThe value of this pattern grows with the size of the union. Without it, a new status silently produces undefined at run time in every switch that forgot it. With it, the same new status produces one compile error per incomplete switch, which is a list of exactly the places that need to change.',
        'TypeScript сужает не только внутри одной проверки. Он следует за потоком программы: присваивание сужает переменную до типа присвоенного значения, ранний return убирает остаток функции из рассмотрения, а throw завершает путь так же надёжно, как return. Это анализ потока управления, и благодаря ему значение считается определённым после проверки даже далеко от самой проверки.\n\nСамая полезная форма этого — проверка полноты. Возьмите объединение, опишите switch с case для каждого участника и в ветке default присвойте значение переменной типа never. Пока switch покрывает всех участников, присваивание законно. Добавьте нового участника в объединение, и присваивание перестанет компилироваться, потому что в ветку default попадёт значение, которое не never.\n\nХелпер, который выполняет это присваивание, обычно один на проект, и его стоит написать один раз и переиспользовать. Компилятор отслеживает тип аргумента, сужая его по ходу switch, и к моменту ветки default значение имеет тип never. Функция бросает исключение, поэтому она же сообщает компилятору, что дальше эта ветка недостижима.\n\nЦенность этого приёма растёт вместе с размером объединения. Без него новый статус молча даёт undefined в рантайме в каждом switch, который о нём забыл. С ним тот же новый статус даёт по одной ошибке компиляции на каждый неполный switch, и этот список — ровно те места, которые нужно поправить.'
      ),
      bullets: [
        L('An assignment narrows the variable to the type of the assigned value.', 'Присваивание сужает переменную до типа присвоенного значения.'),
        L('An early return or throw removes the rest of the function from the analysis.', 'Ранний return или throw убирает остаток функции из анализа.'),
        L('Assigning the value to never in the default branch proves the switch is complete.', 'Присваивание значения в never в ветке default доказывает полноту switch.'),
        L('The assertNever helper turns a missing case into a compile error.', 'Хелпер assertNever превращает забытый случай в ошибку компиляции.'),
        L('Without the check, a new union member becomes undefined at run time.', 'Без проверки новый участник объединения даёт undefined в рантайме.'),
      ],
      code: `type Status = 'idle' | 'running' | 'done';

function assertNever(value: never): never {
  throw new Error('Unexpected status: ' + value);
}

function next(status: Status): Status {
  switch (status) {
    case 'idle': return 'running';
    case 'running': return 'done';
    case 'done': return 'idle';
    default: return assertNever(status);
  }
}

function parse(input: string | number): number {
  let result: number;
  if (typeof input === 'number') result = input;
  else result = Number(input);
  return result;
}
console.log(next('idle'), parse('42'));`,
      table: {
        caption: L('What the compiler tracks', 'Что отслеживает компилятор'),
        headers: [
          L('Construct', 'Конструкция'),
          L('Effect on the type', 'Действие на тип'),
        ],
        rows: [
          [
            L('x = value', 'x = value'),
            L('narrows x to the type of value', 'сужает x до типа value'),
          ],
          [
            L('if (typeof x === "string")', 'if (typeof x === "string")'),
            L('narrows x inside the branch', 'сужает x внутри ветки'),
          ],
          [
            L('return', 'return'),
            L('ends the path, the rest is unreachable', 'завершает путь, остальное недостижимо'),
          ],
          [
            L('throw', 'throw'),
            L('ends the path exactly like return', 'завершает путь точно как return'),
          ],
          [
            L('const y = x', 'const y = x'),
            L('narrows y to the narrowed type of x', 'сужает y до суженного типа x'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('One assertNever helper', 'Один хелпер assertNever'),
          text: L(
            'Write it once, in a shared file, and import it wherever a union is switched over. A helper that throws also tells the compiler that the branch below it is unreachable.',
            'Напишите его один раз в общем файле и подключайте везде, где переключаетесь по объединению. Хелпер, который бросает исключение, заодно сообщает компилятору, что ветка ниже недостижима.'
          ),
        },
        {
          tone: 'warning',
          title: L('A default that swallows the case', 'default, который съедает случай'),
          text: L(
            'A default branch that returns undefined hides exactly the bug the exhaustiveness check is designed to catch. Keep the default branch for the impossible case and let the compiler police it.',
            'Ветка default, возвращающая undefined, скрывает ровно тот баг, ради которого и нужна проверка полноты. Оставьте default для невозможного случая и позвольте компилятору следить за ним.'
          ),
        },
      ],
      takeaway: L(
        'End every switch over a union with an assertNever branch, so a new member is a compile error instead of a run time undefined.',
        'Завершайте каждый switch по объединению веткой assertNever, чтобы новый участник был ошибкой компиляции, а не undefined в рантайме.'
      ),
      seeAlso: [
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения типов и дискриминируемые свойства'),
        L('Section 1-5: never and functions that always throw', 'Секция 1-5: never и функции, которые всегда бросают'),
        L('Section 2-4: intersections and conflicting members', 'Секция 2-4: пересечения и конфликтующие члены'),
      ],
    },
    {
      id: 'ts-ch2-s4',
      title: L('Intersections and conflicting members', 'Пересечения и конфликтующие члены'),
      body: L(
        'An intersection type describes a value that satisfies two types at once. The type { id: string } & { createdAt: Date } has both fields, and a value assigned to it must provide both. This is the natural way to add a capability to an existing shape, to describe an entity that is two things at once, and to attach metadata to a third-party type without rewriting it.\n\nAn intersection also works on unions. A & (B | C) distributes into (A & B) | (A & C), so intersecting a union with a common shape produces a union of the combined shapes. This is how a base payload with a discriminant is added to every member of a result type, and the narrowing that follows works member by member.\n\nWhen the members disagree, the intersection collapses. A property typed string in one member and number in the other becomes string & number, which is never: no value can be both. The whole intersection becomes unusable and the compiler reports the conflict at the point of assignment. This is a feature, because it points at a real modelling mistake rather than at a type puzzle.\n\nIntersections are cheap to write and easy to overuse, so keep them for genuine composition. A type that is a single object with six properties does not need to be an intersection of six single-property types: the result is the same shape with a worse error message and a longer type to read. Reach for an intersection when two independent sources of members genuinely meet.',
        'Пересечение типов описывает значение, которое удовлетворяет двум типам сразу. Тип { id: string } & { createdAt: Date } содержит оба поля, и значение, присвоенное ему, должно предоставить оба. Это естественный способ добавить возможность к существующей форме, описать сущность, которая одновременно две вещи, и присоединить метаданные к чужому типу, не переписывая его.\n\nПересечение работает и с объединениями. A & (B | C) распределяется в (A & B) | (A & C), то есть пересечение объединения с общей формой даёт объединение составленных форм. Именно так к каждому участнику типа результата добавляют общую полезную нагрузку с дискриминантом, и сужение после этого работает по участникам.\n\nКогда члены противоречат друг другу, пересечение схлопывается. Свойство, описанное как string в одном участнике и number в другом, становится string & number, то есть never: ни одно значение не может быть обоими. Всё пересечение становится непригодным, и компилятор сообщает о конфликте в точке присваивания. Это достоинство, потому что оно указывает на настоящую ошибку моделирования, а не на загадку с типами.\n\nПересечения легко пишутся и легко становятся избыточными, поэтому держите их для настоящей композиции. Типу с одним объектом из шести свойств не нужен пересечение из шести односвойственных типов: результат та же форма с худшим сообщением об ошибке и более длинным типом. Берите пересечение там, где действительно встречаются два независимых источника членов.'
      ),
      bullets: [
        L('An intersection requires the value to satisfy every member.', 'Пересечение требует, чтобы значение удовлетворяло каждому участнику.'),
        L('Intersecting a union with a shape distributes over the union.', 'Пересечение объединения с формой распределяется по участникам объединения.'),
        L('A property typed two different ways becomes never.', 'Свойство, описанное двумя разными типами, становится never.'),
        L('A conflicting intersection cannot be inhabited by any value.', 'Конфликтующее пересечение не населено ни одним значением.'),
        L('Intersections of single-property types add noise without adding safety.', 'Пересечения односвойственных типов добавляют шум, но не безопасность.'),
      ],
      code: `type Named = { name: string };

// A value of an intersection must satisfy both shapes at once.
type Person = Named & { age: number };

const ada: Person = { name: 'Ada', age: 36 };
console.log(ada.name, ada.age);

// Intersections also combine a base shape with a capability.
type Entity = Named & { id: string };

const row: Entity = { name: 'Ada', id: 'a1' };
console.log(row.id);

// Two members that disagree make the shared property impossible to inhabit.
type Conflict = { value: string } & { value: number };
// The property type collapses to never, so no object satisfies the type.
// const bad: Conflict = { value: 'text' };   // error: string is not assignable to never

// The only way to build such a value is a cast.
const forced = { value: 'text' } as unknown as Conflict;
console.log(forced.value);`,
      table: {
        caption: L('Two shapes combined', 'Две формы вместе'),
        headers: [
          L('Type', 'Тип'),
          L('Members', 'Члены'),
          L('Conflict', 'Конфликт'),
        ],
        rows: [
          [
            L('{ id: string } & { name: string }', '{ id: string } & { name: string }'),
            L('id, name', 'id, name'),
            L('none', 'нет'),
          ],
          [
            L('{ id: string } & { id: number }', '{ id: string } & { id: number }'),
            L('id', 'id'),
            L('id becomes never', 'id становится never'),
          ],
          [
            L('{ a: 1 } & { b: 2 }', '{ a: 1 } & { b: 2 }'),
            L('a, b', 'a, b'),
            L('none', 'нет'),
          ],
          [
            L('A & (B | C)', 'A & (B | C)'),
            L('distributed over the union', 'распределяется по объединению'),
            L('depends on the members', 'зависит от участников'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A conflict is a modelling bug', 'Конфликт — это ошибка модели'),
          text: L(
            'When two members describe the same property with different types, the intersection collapses to never and no value can inhabit it. Do not work around it with a cast; decide which description is the correct one.',
            'Когда два участника описывают одно свойство разными типами, пересечение схлопывается в never, и ни одно значение его не заселит. Не обходите это приведением: решите, какое описание верное.'
          ),
        },
        {
          tone: 'tip',
          title: L('Add capabilities, do not fragment', 'Добавляйте возможности, а не дробите'),
          text: L(
            'An intersection is a good way to say this object also has that capability. It is a poor way to split one object into six single-purpose types that always travel together.',
            'Пересечение — хороший способ сказать: у этого объекта есть ещё и эта возможность. Плохой способ разбить один объект на шесть однозначных типов, которые всегда ходят вместе.'
          ),
        },
      ],
      takeaway: L(
        'Use an intersection to combine two independent shapes, and expect never when they contradict each other.',
        'Используйте пересечение, чтобы объединить две независимые формы, и ждите never, когда они противоречат друг другу.'
      ),
      seeAlso: [
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения типов и дискриминируемые свойства'),
        L('Section 1-5: never as the type of impossible values', 'Секция 1-5: never как тип невозможных значений'),
        L('Section 6-1: nominal typing with brands', 'Секция 6-1: номинальная типизация через бренды'),
      ],
    },
    {
      id: 'ts-ch2-s5',
      title: L('Type predicates and assertion functions', 'Предикаты типа и утверждающие функции'),
      body: L(
        'The compiler narrows on the checks it knows: typeof, in, instanceof, a comparison with a literal, a truthiness test. It cannot know your rules. A function that checks whether a value is a valid user cannot be understood by the compiler, so you tell it: the return type value is string says that when the function returns true, the argument really is a string, and the compiler narrows accordingly at the call site.\n\nThe rule is that the narrowed type must be assignable to the parameter type, and the function must return a boolean. The compiler cannot verify the body of the predicate, so it checks the relation between the types instead and trusts the function to be honest. A predicate that returns true for something that is not a string produces a wrong type at the call site, with no error anywhere.\n\nAn assertion function goes further. The return type asserts value is string means that when the function returns, the value is definitely a string, and if it is not, the function itself has already failed, usually by throwing. After the call the value is narrowed in the calling scope, without any if. The cost is that the assertion is a statement about the caller, so the variable being asserted needs an explicit type annotation.\n\nBoth forms are worth writing once and reusing. A predicate fits a filter, where the condition selects the members that survive: values.filter(isString) produces a string array, not an array of unknown. An assertion fits a boundary function that either returns a usable value or throws. Between them they cover most of what a validation layer needs.',
        'Компилятор сужает по проверкам, которые знает: typeof, in, instanceof, сравнение с литералом, проверку на истинность. Ваших правил он не знает. Функцию, которая проверяет, является ли значение пользователем, компилятор понять не может, поэтому вы говорите ему сами: тип возврата value is string означает, что когда функция вернула true, аргумент действительно строка, и компилятор сужает соответственно в месте вызова.\n\nПравило состоит в том, что суженный тип должен быть присваиваем типу параметра, а функция должна возвращать boolean. Тело предиката компилятор проверить не может, поэтому он проверяет отношение типов и доверяет функции. Предикат, возвращающий true для не-строки, приводит к неверному типу в месте вызова, и ошибки нет нигде.\n\nУтверждающая функция идёт дальше. Тип возврата asserts value is string означает, что после возврата функции значение точно строка, а если нет, функция уже провалилась, обычно выбросив исключение. После вызова значение сужено в вызывающей области, без всякого if. Цена в том, что утверждение — это заявление о вызывающем, поэтому переменная, которую утверждают, должна иметь явную аннотацию типа.\n\nОбе формы стоит написать один раз и переиспользовать. Предикат подходит фильтру, где условие отбирает выжившие значения: values.filter(isString) даёт массив строк, а не массив unknown. Утверждение подходит функции на границе, которая либо возвращает пригодное значение, либо бросает. Вместе они закрывают почти всё, что нужно слою валидации.'
      ),
      bullets: [
        L('A type predicate narrows the argument when it returns true.', 'Предикат типа сужает аргумент, когда возвращает true.'),
        L('The compiler checks the types of a predicate, not the logic of its body.', 'Компилятор проверяет типы предиката, а не логику его тела.'),
        L('The narrowed type must be assignable to the parameter type.', 'Суженный тип должен быть присваиваем типу параметра.'),
        L('An assertion function narrows without an if and usually throws otherwise.', 'Утверждающая функция сужает без if и обычно бросает исключение иначе.'),
        L('Asserting a value requires an explicit type annotation on that value.', 'Для утверждения значения нужна явная аннотация типа на самом значении.'),
      ],
      code: `function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new Error('value is required');
  }
}

const payload: unknown = JSON.parse('{"id":1}');
if (isError(payload)) {
  console.log(payload.message);
}

let userId: string | undefined = 'a1';
assertDefined(userId);
console.log(userId.toUpperCase());`,
      table: {
        caption: L('Predicate or assertion', 'Предикат или утверждение'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Type predicate', 'Предикат типа'),
          L('Assertion function', 'Утверждающая функция'),
        ],
        rows: [
          [
            L('Return type', 'Тип возврата'),
            L('value is T', 'value is T'),
            L('asserts value is T', 'asserts value is T'),
          ],
          [
            L('Effect', 'Действие'),
            L('narrows inside the if branch', 'сужает внутри ветки if'),
            L('narrows after the call', 'сужает после вызова'),
          ],
          [
            L('On failure', 'При неудаче'),
            L('returns false', 'возвращает false'),
            L('throws an error', 'бросает исключение'),
          ],
          [
            L('Explicit annotation needed', 'Нужна явная аннотация'),
            L('no', 'нет'),
            L('yes, on the asserted variable', 'да, на самой переменной'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A predicate that lies', 'Предикат, который врёт'),
          text: L(
            'The compiler trusts the predicate and checks only that the types line up. If the function returns true for a value that is not of the narrowed type, every call site believes the value is safe, and the bug surfaces far away.',
            'Компилятор доверяет предикату и проверяет только согласованность типов. Если функция возвращает true для значения не того типа, все места вызова считают значение безопасным, и баг всплывает далеко.'
          ),
        },
        {
          tone: 'warning',
          title: L('Assertions need an annotation', 'Утверждения требуют аннотации'),
          text: L(
            'An assertion function only narrows a variable that has an explicit type annotation, so let id = value will not work while let id: string | undefined = value will. The annotation is what gives the compiler something to narrow.',
            'Утверждающая функция сужает только переменную с явной аннотацией типа, поэтому let id = value не сработает, а let id: string | undefined = value сработает. Аннотация и есть то, что компилятор сужает.'
          ),
        },
      ],
      takeaway: L(
        'Write a predicate for a question and an assertion for a guarantee, and always annotate the variable an assertion touches.',
        'Предикат — это вопрос, утверждение — это гарантия; всегда аннотируйте переменную, которую трогает утверждение.'
      ),
      seeAlso: [
        L('Section 2-2: the built-in checks that narrow', 'Секция 2-2: встроенные проверки, которые сужают'),
        L('Section 1-5: unknown as the type of external data', 'Секция 1-5: unknown как тип внешних данных'),
        L('Section 6-2: parsing at the boundary', 'Секция 6-2: разбор данных на границе'),
      ],
    },
  ],
};
