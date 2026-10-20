import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh04: Chapter = {
  id: 'ts-ch4',
  title: L('keyof, mapped types and utility types', 'keyof, отображаемые типы и утилитные типы'),
  summary: L(
    'How the compiler computes new types from existing ones: keyof and indexed access, mapped types with their modifiers, key remapping, and the utility types that ship with the language.',
    'Как компилятор вычисляет новые типы по существующим: keyof и индексированный доступ, отображаемые типы с модификаторами, ремаппинг ключей и утилитные типы, которые поставляются вместе с языком.'
  ),
  sections: [
    {
      id: 'ts-ch4-s1',
      title: L('keyof and indexed access', 'keyof и индексированный доступ'),
      body: L(
        'Two operators turn a type into a description of itself. keyof T produces the union of the keys of T, so keyof User is "id" | "name". The indexed access T[K] produces the type of the property K, so User["id"] is string. Together they let a type ask about its own members, and that is the raw material of everything in this chapter.\n\nBoth work on unions, and both have a twist worth knowing. keyof of a union is the intersection of the keys, because a key is common to all members only when it exists in every one of them. keyof of an array is not just number: it includes every method of the array, so keyof string[] is a large union of numbers and method names.\n\nkeyof does not widen string into a pattern. keyof Record<string, number> is string, so a mapped type over such a key is a dictionary rather than an object with named properties. Mapped types walk a finite set of keys, which is why they cannot produce a type for every possible string key.\n\nThe practical use is a helper that reads one property of an object without knowing which one. A generic function with a parameter K extends keyof T accepts only real keys, and its return type T[K] says exactly what was read. The type of the value and the type of the key stay in agreement, and the call site gets the narrow type instead of a union of everything.',
        'Два оператора превращают тип в описание самого себя. keyof T даёт объединение ключей типа T, поэтому keyof User — это "id" | "name". Индексированный доступ T[K] даёт тип свойства K, поэтому User["id"] — это string. Вместе они позволяют типу спрашивать о собственных членах, и это сырьё для всего, о чём идёт речь в этой главе.\n\nОба работают и с объединениями, и у обоих есть особенность, которую стоит знать. keyof объединения — это пересечение ключей, потому что ключ общий для всех участников только тогда, когда есть у каждого из них. keyof массива — это не просто number: туда входят все методы массива, поэтому keyof string[] — большое объединение чисел и имён методов.\n\nkeyof не превращает string в шаблон. keyof Record<string, number> — это string, поэтому отображаемый тип по такому ключу даёт словарь, а не объект с именованными свойствами. Отображаемые типы обходят конечный набор ключей, и поэтому они не умеют строить тип для любого возможного строкового ключа.\n\nПрактическое применение — хелпер, читающий одно свойство объекта, не зная какого. Обобщённая функция с параметром K extends keyof T принимает только настоящие ключи, а тип возврата T[K] точно говорит, что прочитано. Тип значения и тип ключа остаются согласованы, и место вызова получает узкий тип, а не объединение всего подряд.'
      ),
      bullets: [
        L('keyof T is the union of the keys of T.', 'keyof T — объединение ключей типа T.'),
        L('T[K] is the type of the property K of T.', 'T[K] — тип свойства K типа T.'),
        L('keyof of a union is the intersection of the keys of its members.', 'keyof объединения — пересечение ключей его участников.'),
        L('keyof of an array includes the methods, not only number.', 'keyof массива включает и методы, а не только number.'),
        L('Extract picks the members of a union that satisfy a condition.', 'Extract выбирает участников объединения, удовлетворяющих условию.'),
      ],
      code: `interface User {
  id: string;
  name: string;
  age: number;
}

type UserKey = keyof User;         // 'id' | 'name' | 'age'
type UserValue = User[UserKey];    // string | number

const keys: UserKey[] = ['id', 'name'];
const values: UserValue[] = ['Ada', 36];

type IdKey = Extract<UserKey, 'id'>;   // 'id'
const idKey: IdKey = 'id';

function pick<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = { id: '1', name: 'Ada', age: 36 };
console.log(keys, values, idKey, pick(user, 'name'));`,
      table: {
        caption: L('The two operators at work', 'Два оператора в работе'),
        headers: [
          L('Expression', 'Выражение'),
          L('Result for User', 'Результат для User'),
          L('Note', 'Замечание'),
        ],
        rows: [
          [
            L('keyof User', 'keyof User'),
            L('"id" | "name" | "age"', '"id" | "name" | "age"'),
            L('the union of the keys', 'объединение ключей типа'),
          ],
          [
            L('User["id"]', 'User["id"]'),
            L('string', 'string'),
            L('the type of one property', 'тип одного свойства'),
          ],
          [
            L('User["id" | "name"]', 'User["id" | "name"]'),
            L('string', 'string'),
            L('the union of the selected types', 'объединение выбранных типов'),
          ],
          [
            L('keyof (A | B)', 'keyof (A | B)'),
            L('the keys common to both', 'общие для обоих ключи'),
            L('the intersection', 'пересечение'),
          ],
          [
            L('Extract<keyof User, "id">', 'Extract<keyof User, "id">'),
            L('"id"', '"id"'),
            L('the built-in filter', 'встроенный фильтр'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('keyof of an array is bigger than you expect', 'keyof массива больше, чем кажется'),
          text: L(
            'keyof string[] includes length, push, map and every other member of the array type. If you want the keys of the object you put in the array, describe the element type instead.',
            'keyof string[] включает length, push, map и все прочие члены типа массива. Если нужны ключи объекта, который кладут в массив, опишите тип элемента.'
          ),
        },
        {
          tone: 'tip',
          title: L('Combine keyof with indexed access', 'Соедините keyof с индексированным доступом'),
          text: L(
            'K extends keyof T plus T[K] is the pattern that keeps a key parameter and the value it returns in agreement. Write the pair once and reuse it for every helper of that shape.',
            'K extends keyof T вместе с T[K] — схема, которая держит параметр-ключ и возвращаемое значение в согласии. Напишите пару один раз и переиспользуйте её для каждого хелпера такой формы.'
          ),
        },
      ],
      takeaway: L(
        'keyof describes the keys of a type and T[K] reads a value out of it, and together they let a helper stay exact about both.',
        'keyof описывает ключи типа, а T[K] читает значение, и вместе они позволяют хелперу оставаться точным в обоих.'
      ),
      seeAlso: [
        L('Section 3-5: the constraint K extends keyof T', 'Секция 3-5: ограничение K extends keyof T'),
        L('Section 4-2: mapped types and their modifiers', 'Секция 4-2: отображаемые типы и их модификаторы'),
        L('Section 4-4: the built-in utility types', 'Секция 4-4: встроенные утилитные типы'),
      ],
    },
    {
      id: 'ts-ch4-s2',
      title: L('Mapped types and their modifiers', 'Отображаемые типы и их модификаторы'),
      body: L(
        'A mapped type walks over a union of keys and builds a new object type from what it finds. The syntax reads like a loop: { [K in keyof T]: ... } takes every key of T, binds it to K, and lets the value type use both K and T[K]. It is a type level function, with an input, a transformation and an output, and it is resolved at compile time.\n\nThe modifiers control two properties of the result. readonly and the question mark are copied from the source by default when the mapped type is homomorphic, and the plus and minus signs change them explicitly: +readonly adds immutability, -readonly removes it, +? makes the property optional, and -? makes it required. The signs matter whenever the source and the target disagree about the defaults.\n\nThe classic pair is Readonly<T> and Partial<T>, and both are a mapped type with one modifier. The difference between them and a hand-written version is only the modifier syntax, which is why it is worth learning the syntax instead of memorising the library: the same machinery gives you types the library does not ship.\n\nA mapped type is not restricted to objects. The keys can be any union, including a union of literal strings, and the value type can be anything, including a function. Mapping over a union of keys with a template literal or a conditional type produces a family of properties from a list, and that pattern is how event maps and getter maps are built.',
        'Отображаемый тип обходит объединение ключей и строит по нему новый объектный тип. Синтаксис читается как цикл: { [K in keyof T]: ... } берёт каждый ключ T, связывает его с K и позволяет типу значения использовать и K, и T[K]. Это функция на уровне типов: вход, преобразование и выход, и всё вычисляется на этапе компиляции.\n\nМодификаторы управляют двумя свойствами результата. readonly и знак вопроса копируются из источника по умолчанию, когда отображаемый тип гомоморфен, а знаки плюс и минус меняют их явно: +readonly добавляет неизменяемость, -readonly убирает её, +? делает свойство необязательным, -? — обязательным. Знаки важны там, где источник и цель расходятся во мнении о значениях по умолчанию.\n\nКлассическая пара — Readonly<T> и Partial<T>, и обе суть отображаемый тип с одним модификатором. Отличие от написанного рукой варианта только в синтаксисе модификатора, и именно поэтому стоит учить синтаксис, а не заучивать библиотеку: та же машинерия даёт типы, которых в библиотеке нет.\n\nОтображаемый тип не ограничен объектами. Ключами может быть любое объединение, включая объединение строковых литералов, а типом значения может быть что угодно, включая функцию. Отображение по объединению ключей с шаблонным литералом или условным типом даёт семейство свойств из списка, и именно так строятся карты событий и карты геттеров.'
      ),
      bullets: [
        L('A mapped type builds a new object type from the keys of another type.', 'Отображаемый тип строит новый объектный тип по ключам другого типа.'),
        L('+readonly and -readonly add and remove immutability.', '+readonly и -readonly добавляют и убирают неизменяемость.'),
        L('+? makes a property optional, -? makes it required.', '+? делает свойство необязательным, -? — обязательным.'),
        L('Partial<T> and Readonly<T> are mapped types with one modifier.', 'Partial<T> и Readonly<T> — отображаемые типы с одним модификатором.'),
        L('A mapped type can produce a function for every key, not only a value.', 'Отображаемый тип может дать функцию для каждого ключа, а не только значение.'),
      ],
      code: `interface User {
  id: string;
  name: string;
  age?: number;
}

type ReadonlyUser = { readonly [K in keyof User]: User[K] };
type OptionalUser = { [K in keyof User]?: User[K] };
type MutableUser = { -readonly [K in keyof User]: User[K] };
type CompleteUser = { -readonly [K in keyof User]-?: User[K] };

const frozen: ReadonlyUser = { id: '1', name: 'Ada' };
const draft: OptionalUser = {};
const loose: MutableUser = { id: '1', name: 'Ada' };
const full: CompleteUser = { id: '1', name: 'Ada', age: 36 };

console.log(frozen, draft, loose, full);`,
      table: {
        caption: L('The four modifiers', 'Четыре модификатора'),
        headers: [
          L('Modifier', 'Модификатор'),
          L('Effect', 'Действие'),
          L('Source', 'Источник'),
        ],
        rows: [
          [
            L('readonly', 'readonly'),
            L('keeps the source immutability', 'сохраняет неизменяемость источника'),
            L('the default in a homomorphic type', 'по умолчанию в гомоморфном типе'),
          ],
          [
            L('+readonly', '+readonly'),
            L('makes every property readonly', 'делает каждое свойство readonly'),
            L('always', 'всегда'),
          ],
          [
            L('-readonly', '-readonly'),
            L('makes every property writable', 'делает каждое свойство изменяемым'),
            L('always', 'всегда'),
          ],
          [
            L('+?', '+?'),
            L('makes every property optional', 'делает каждое свойство необязательным'),
            L('always', 'всегда'),
          ],
          [
            L('-?', '-?'),
            L('makes every property required', 'делает каждое свойство обязательным'),
            L('always', 'всегда'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Write your own when the library lacks one', 'Пишите свой, когда в библиотеке не хватает'),
          text: L(
            'A type like "every property of T except the ones in K, and all of them optional" is two modifiers away. The library ships the common combinations, not yours.',
            'Тип вида «все свойства T, кроме указанных в K, и все необязательные» — это два модификатора. Библиотека поставляет частые сочетания, а не ваше.'
          ),
        },
        {
          tone: 'note',
          title: L('The modifiers are compile time only', 'Модификаторы живут только на этапе компиляции'),
          text: L(
            'A readonly property in a mapped type is exactly as immutable as a readonly property in an interface: the compiler complains, the running program does not care.',
            'readonly-свойство в отображаемом типе ровно настолько же неизменяемо, как readonly-свойство в интерфейсе: компилятор возражает, а работающая программа не интересуется.'
          ),
        },
      ],
      takeaway: L(
        'A mapped type is a loop over keys, and the plus and minus modifiers decide what the result looks like.',
        'Отображаемый тип — это цикл по ключам, а знаки плюс и минус решают, что получится в результате.'
      ),
      seeAlso: [
        L('Section 4-1: keyof and indexed access', 'Секция 4-1: keyof и индексированный доступ'),
        L('Section 4-3: homomorphic mapped types and key remapping', 'Секция 4-3: гомоморфные отображаемые типы и ремаппинг ключей'),
        L('Section 4-4: Partial, Required and Pick', 'Секция 4-4: Partial, Required и Pick'),
      ],
    },
    {
      id: 'ts-ch4-s3',
      title: L('Homomorphic mapped types and key remapping', 'Гомоморфные отображаемые типы и ремаппинг ключей'),
      body: L(
        'A mapped type is called homomorphic when it is written over keyof T where T is a type parameter, and the interesting property is that it copies the modifiers of the source automatically. A property that was optional stays optional, and a property that was readonly stays readonly, without a single modifier written in the type.\n\nHomomorphism has a practical consequence beyond convenience: a mapped type over a union of object types distributes over it, so the result is a union of mapped types. That is why Partial applied to a union of shapes gives a union of partial shapes rather than a partial of the union, and why the modifiers survive in every member.\n\nKey remapping, written with as, changes the name of a property instead of only its type. The clause after as is a new key: it can be a template literal built from the old key, which is how a map of getter functions is written, or it can filter keys away by producing never for the ones you do not want.\n\nThe subtlety is that the as clause changes the shape of the type in a way that is easy to get wrong. A mapped type written as { [K in Exclude<keyof T, "id">]: T[K] } is not homomorphic any more, because the keys come from a computed union instead of keyof T, and it silently loses the optional markers of the source. Writing the same filter with as, { [K in keyof T as Exclude<K, "id">]: T[K] }, keeps them.',
        'Отображаемый тип называется гомоморфным, когда он записан по keyof T, где T — параметр типа, и интересное его свойство в том, что модификаторы источника копируются автоматически. Свойство, которое было необязательным, остаётся необязательным, а readonly — readonly, и в типе не написано ни одного модификатора.\n\nГомоморфность даёт практическое следствие помимо удобства: отображаемый тип по объединению объектных типов распределяется по нему, и результат оказывается объединением отображаемых типов. Поэтому Partial, применённый к объединению форм, даёт объединение частичных форм, а не частичное объединение, и модификаторы сохраняются в каждом участнике.\n\nРемаппинг ключей, записываемый через as, меняет имя свойства, а не только его тип. Клауза после as задаёт новый ключ: это может быть шаблонный литерал, собранный из старого ключа, — так пишут карту геттеров, — а может быть фильтр, который отбрасывает ненужные ключи, выдавая для них never.\n\nТонкость в том, что клауза as меняет форму типа так, что легко ошибиться. Отображаемый тип, записанный как { [K in Exclude<keyof T, "id">]: T[K] }, уже не гомоморфен, потому что ключи берутся из вычисленного объединения, а не из keyof T, и он молча теряет необязательность свойств источника. Тот же фильтр через as, { [K in keyof T as Exclude<K, "id">]: T[K] }, её сохраняет.'
      ),
      bullets: [
        L('A homomorphic mapped type copies readonly and optional modifiers.', 'Гомоморфный отображаемый тип копирует модификаторы readonly и опциональности.'),
        L('A homomorphic mapped type distributes over a union of object types.', 'Гомоморфный отображаемый тип распределяется по объединению объектных типов.'),
        L('The as clause renames a key, it does not change the value type.', 'Клауза as переименовывает ключ, не меняя тип значения.'),
        L('Mapping with as can build a getter for every key of a type.', 'Отображение с as может построить геттер для каждого ключа типа.'),
        L('Filtering keys in the constraint loses the modifiers; filter with as instead.', 'Фильтрация ключей в ограничении теряет модификаторы; фильтруйте через as.'),
      ],
      code: `interface User {
  id: string;
  name: string;
  age?: number;
  readonly createdAt: Date;
}

// A homomorphic mapped type keeps the modifiers of the source.
type Copy = { [K in keyof User]: User[K] };   // age stays optional, createdAt stays readonly
// Key remapping renames the key as well.
type Getters = { [K in keyof User as \`get\${Capitalize<K & string>}\`]: () => User[K] };

const copy: Copy = { id: '1', name: 'Ada', createdAt: new Date(0) };
const getters: Getters = {
  getId: () => copy.id, getName: () => copy.name,
  getAge: () => copy.age ?? 0, getCreatedAt: () => copy.createdAt,
};

// Filtering with as keeps the optional marker.
type Public = { [K in keyof User as Exclude<K, 'id'>]: User[K] };
const visible: Public = { name: 'Ada', createdAt: new Date(0) };
console.log(copy, getters, visible);`,
      table: {
        caption: L('Two ways to filter keys', 'Два способа отфильтровать ключи'),
        headers: [
          L('Form', 'Форма'),
          L('Homomorphic', 'Гомоморфный'),
          L('Optionality preserved', 'Необязательность сохранена'),
        ],
        rows: [
          [
            L('{ [K in keyof T]: T[K] }', '{ [K in keyof T]: T[K] }'),
            L('yes', 'да'),
            L('yes', 'да'),
          ],
          [
            L('{ [K in keyof T as Exclude<K, "id">]: T[K] }', '{ [K in keyof T as Exclude<K, "id">]: T[K] }'),
            L('yes', 'да'),
            L('yes', 'да'),
          ],
          [
            L('{ [K in Exclude<keyof T, "id">]: T[K] }', '{ [K in Exclude<keyof T, "id">]: T[K] }'),
            L('no', 'нет'),
            L('no', 'нет'),
          ],
          [
            L('a remapped key built from a template literal', 'переименованный ключ из шаблонного литерала'),
            L('yes', 'да'),
            L('yes', 'да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The filter that loses the question mark', 'Фильтр, теряющий знак вопроса'),
          text: L(
            'Filtering keys in the constraint drops the optional markers, and the difference only shows up when you assign a literal without the optional property. Filter with as instead and the shape stays faithful to the source.',
            'Фильтрация ключей в ограничении отбрасывает необязательность, и разница видна только при присваивании литерала без необязательного свойства. Фильтруйте через as, и форма останется верной источнику.'
          ),
        },
        {
          tone: 'tip',
          title: L('Getters from a type', 'Геттеры из типа'),
          text: L(
            'Remapping every key into a getX function turns a type into an API surface. It is a good way to build a read-only façade over a record without writing the functions by hand.',
            'Переименование каждого ключа в функцию getX превращает тип в поверхность API. Так строят фасад над данными только для чтения, не выписывая функции руками.'
          ),
        },
      ],
      takeaway: L(
        'Keep the mapped type homomorphic by writing over keyof T, and filter keys with as rather than with Exclude in the constraint.',
        'Сохраняйте гомоморфность, отображая по keyof T, и фильтруйте ключи через as, а не через Exclude в ограничении.'
      ),
      seeAlso: [
        L('Section 4-2: mapped types and their modifiers', 'Секция 4-2: отображаемые типы и их модификаторы'),
        L('Section 5-3: template literal types', 'Секция 5-3: шаблонные литеральные типы'),
        L('Section 4-4: Pick and Omit as filtered mapped types', 'Секция 4-4: Pick и Omit как отфильтрованные отображаемые типы'),
      ],
    },
    {
      id: 'ts-ch4-s4',
      title: L('Built-in utility types', 'Встроенные утилитные типы'),
      body: L(
        'The standard library ships with the utility types that every project ends up writing by hand. Partial<T> makes every property optional, Required<T> does the opposite, Readonly<T> makes every property immutable, and Pick<T, K> keeps only the listed keys. All four are one line of mapped type each, and knowing that is what tells you which one to reach for.\n\nOmit<T, K> removes the listed keys, and it is built from the others: it is Pick<T, Exclude<keyof T, K>], so the excluded keys are the ones of T that are not in K. Record<K, V> builds an object from a set of keys and a value type, and with a union of literal keys it produces required properties, while with the string key it produces a dictionary.\n\nThe filtering types work on unions rather than objects. Exclude<T, U> removes from T every member that is assignable to U, which is how you remove null or undefined from a type, and Extract<T, U> keeps exactly the members of T that are assignable to U, which is how you filter a union of string literals down to the ones you support.\n\nNonNullable<T> is the common special case: it removes null and undefined, and it is what a framework helper uses before it hands you a value it has already checked. Read the definitions once and the names stop being a list to memorise: they are all mapped types or filters over a union, and the behaviour follows from the definition rather than from the name.',
        'Стандартная библиотека поставляет те утилитные типы, которые в итоге пишут руками в каждом проекте. Partial<T> делает каждое свойство необязательным, Required<T> делает наоборот, Readonly<T> делает каждое свойство неизменяемым, а Pick<T, K> оставляет только перечисленные ключи. Все четыре — по одной строке отображаемого типа, и именно это знание подсказывает, какой взять.\n\nOmit<T, K> убирает перечисленные ключи, и он построен из остальных: это Pick<T, Exclude<keyof T, K>], то есть исключаются ключи T, которых нет в K. Record<K, V> строит объект из набора ключей и типа значения: с объединением литеральных ключей получаются обязательные свойства, а со строковым ключом — словарь.\n\nФильтрующие типы работают с объединениями, а не с объектами. Exclude<T, U> убирает из T каждого участника, присваиваемого U, — так из типа убирают null или undefined, — а Extract<T, U> оставляет ровно тех участников T, которые присваиваемы U, — так объединение строковых литералов фильтруют до поддерживаемых.\n\nNonNullable<T> — частный случай: он убирает null и undefined, и именно его использует хелпер фреймворка, прежде чем отдать вам значение, которое уже проверено. Прочитайте определения один раз, и имена перестанут быть списком для запоминания: это всё отображаемые типы или фильтры по объединению, и поведение следует из определения, а не из названия.'
      ),
      bullets: [
        L('Partial, Required and Readonly are mapped types with one modifier.', 'Partial, Required и Readonly — отображаемые типы с одним модификатором.'),
        L('Pick keeps the listed keys, Omit removes them.', 'Pick оставляет перечисленные ключи, Omit убирает их.'),
        L('Omit<T, K> is Pick<T, Exclude<keyof T, K>>.', 'Omit<T, K> — это Pick<T, Exclude<keyof T, K>>.'),
        L('Record with literal keys produces required properties.', 'Record с литеральными ключами даёт обязательные свойства.'),
        L('Exclude removes the members of a union, Extract keeps them.', 'Exclude убирает участников объединения, Extract оставляет их.'),
      ],
      code: `interface User {
  id: string;
  name: string;
  age?: number;
}

type Draft = Partial<User>;            // every property optional
type Complete = Required<User>;        // every property required
type Public = Pick<User, 'id' | 'name'>;
type Anonymous = Omit<User, 'id'>;     // Omit is Pick with Exclude
type Counts = Record<string, number>;
type NonEmpty = Exclude<User['age'], undefined>;   // number
type OnlyId = Extract<User['id'], string>;          // string

const draft: Draft = {};
const complete: Complete = { id: '1', name: 'Ada', age: 36 };
const publicView: Public = { id: '1', name: 'Ada' };
const anonymous: Anonymous = { name: 'Ada' };
const counts: Counts = { total: 3 };
const nonEmpty: NonEmpty = 42;
const onlyId: OnlyId = '1';
console.log(draft, complete, publicView, anonymous, counts, nonEmpty, onlyId);`,
      table: {
        caption: L('The utility types and what they do', 'Утилитные типы и что они делают'),
        headers: [
          L('Type', 'Тип'),
          L('Definition', 'Определение'),
          L('Result for User', 'Результат для User'),
        ],
        rows: [
          [
            L('Partial<T>', 'Partial<T>'),
            L('every property optional', 'каждое свойство необязательно'),
            L('any property may be missing', 'любое свойство может отсутствовать'),
          ],
          [
            L('Required<T>', 'Required<T>'),
            L('every property required', 'каждое свойство обязательно'),
            L('age becomes required', 'age становится обязательным'),
          ],
          [
            L('Pick<T, K>', 'Pick<T, K>'),
            L('keeps the keys of K', 'оставляет ключи K'),
            L('id and name only', 'только id и name'),
          ],
          [
            L('Omit<T, K>', 'Omit<T, K>'),
            L('removes the keys of K', 'убирает ключи K'),
            L('User without id', 'User без id'),
          ],
          [
            L('Record<string, T>', 'Record<string, T>'),
            L('any key, one value type', 'любой ключ, один тип значения'),
            L('a dictionary', 'словарь'),
          ],
          [
            L('Exclude<T, U>', 'Exclude<T, U>'),
            L('members of T not assignable to U', 'участники T, не присваиваемые U'),
            L('no null, no undefined', 'без null и undefined'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Read the definition once', 'Прочитайте определение один раз'),
          text: L(
            'Each utility type is a few characters of mapped type or a filter over a union. Knowing the definition tells you what happens to the modifiers and what happens to unions you did not think about.',
            'Каждый утилитный тип — это несколько символов отображаемого типа или фильтра по объединению. Знание определения говорит, что будет с модификаторами и с объединениями, о которых вы не подумали.'
          ),
        },
        {
          tone: 'note',
          title: L('Record is two types in one', 'Record — это два типа сразу'),
          text: L(
            'Record<string, T> is a dictionary with any key, while Record<"a" | "b", T> is an object with two required properties. The difference is only in the first argument.',
            'Record<string, T> — словарь с любым ключом, а Record<"a" | "b", T> — объект с двумя обязательными свойствами. Разница только в первом аргументе.'
          ),
        },
      ],
      takeaway: L(
        'Before writing a type helper by hand, check the library: the utility types are the mapped types you were about to write.',
        'Прежде чем писать свой хелпер типа, загляните в библиотеку: утилитные типы — это ровно те отображаемые типы, которые вы собирались написать.'
      ),
      seeAlso: [
        L('Section 4-2: mapped types and their modifiers', 'Секция 4-2: отображаемые типы и их модификаторы'),
        L('Section 4-5: ReturnType, Parameters and Awaited', 'Секция 4-5: ReturnType, Parameters и Awaited'),
        L('Section 3-3: index signatures and the Record type', 'Секция 3-3: индексные сигнатуры и тип Record'),
      ],
    },
    {
      id: 'ts-ch4-s5',
      title: L('ReturnType, Parameters and Awaited', 'ReturnType, Parameters и Awaited'),
      body: L(
        'Three utility types describe functions instead of objects. ReturnType<T> gives the return type of a function type, Parameters<T> gives the tuple of its parameter types, and Awaited<T> unwraps a promise type to the value it resolves to. All three are written with typeof in front of a function, because the input is a value rather than a type.\n\nReturnType is the one you meet first, usually through a helper that wraps a function and has to preserve its result. The trouble starts with functions that return a promise: ReturnType gives you Promise<string>, not string, and every consumer of the helper then has to deal with the promise. That is why the helper usually returns Awaited<ReturnType<F>> instead.\n\nParameters solves a different problem: forwarding arguments. A wrapper written as function wrapper(...args: Parameters<F>) keeps the argument list of the original in sync with the original, and the call passes them along with the same spread. When the original takes optional parameters, the tuple keeps them optional, so the wrapper cannot be called with the wrong count either.\n\nAwaited is a conditional type under the hood, and it unwraps recursively: a promise of a promise of a string becomes a string. It also accepts anything that looks like a thenable, which is what makes it correct for a library that returns a custom promise-like object. The pair Awaited<ReturnType<F>> is the standard way to name the real result of an asynchronous function.',
        'Три утилитных типа описывают функции, а не объекты. ReturnType<T> даёт тип возврата функции, Parameters<T> — кортеж типов её параметров, а Awaited<T> разворачивает тип промиса до значения, которое он разрешает. Все три пишутся с typeof перед функцией, потому что на вход идёт значение, а не тип.\n\nReturnType — тот, с которого начинают, обычно через хелпер, оборачивающий функцию и обязанный сохранить её результат. Проблемы начинаются с функций, возвращающих промис: ReturnType даёт Promise<string>, а не string, и каждому потребителю хелпера приходится иметь дело с промисом. Поэтому хелпер обычно возвращает Awaited<ReturnType<F>>.\n\nParameters решает другую задачу: передачу аргументов дальше. Обёртка, записанная как function wrapper(...args: Parameters<F>), остаётся в согласии с списком аргументов оригинала, а вызов передаёт их тем же spread. Когда оригинал принимает необязательные параметры, кортеж сохраняет их необязательность, так что обёртку нельзя вызвать с неверным числом аргументов.\n\nAwaited внутри — условный тип, и он разворачивает рекурсивно: промис промиса строки становится строкой. Он также принимает всё, что ведёт себя как thenable, и это делает его корректным для библиотеки, возвращающей собственный объект в духе промиса. Пара Awaited<ReturnType<F>> — стандартный способ назвать настоящий результат асинхронной функции.'
      ),
      bullets: [
        L('ReturnType<T> gives the return type of a function type.', 'ReturnType<T> даёт тип возврата функции.'),
        L('Parameters<T> gives a tuple of the parameter types.', 'Parameters<T> даёт кортеж типов параметров.'),
        L('typeof in type position takes the type of a function value.', 'typeof в позиции типа берёт тип значения-функции.'),
        L('Awaited unwraps a promise recursively, including thenables.', 'Awaited разворачивает промис рекурсивно, включая thenable-объекты.'),
        L('Awaited<ReturnType<F>> names the real result of an async function.', 'Awaited<ReturnType<F>> называет настоящий результат асинхронной функции.'),
      ],
      code: `function parse(input: string): number {
  return Number(input);
}

type ParseResult = ReturnType<typeof parse>;      // number
type ParseArgs = Parameters<typeof parse>;        // [string]

function callParse(...args: ParseArgs): ParseResult {
  return parse(...args);
}

async function load(): Promise<string> {
  return 'data';
}

type Loaded = Awaited<ReturnType<typeof load>>;   // string

const loaded: Loaded = 'data';

console.log(callParse('42'), loaded);`,
      table: {
        caption: L('Function types in one column', 'Типы функций в одной колонке'),
        headers: [
          L('Utility type', 'Утилитный тип'),
          L('Gives', 'Даёт'),
          L('For parse(a: string): number', 'Для parse(a: string): number'),
        ],
        rows: [
          [
            L('ReturnType<typeof parse>', 'ReturnType<typeof parse>'),
            L('the return type', 'тип возврата'),
            L('number', 'number'),
          ],
          [
            L('Parameters<typeof parse>', 'Parameters<typeof parse>'),
            L('the parameter tuple', 'кортеж параметров'),
            L('[string]', '[string]'),
          ],
          [
            L('ConstructorParameters<typeof parse>', 'ConstructorParameters<typeof parse>'),
            L('the constructor arguments', 'аргументы конструктора'),
            L('for a class', 'для класса'),
          ],
          [
            L('InstanceType<typeof parse>', 'InstanceType<typeof parse>'),
            L('the instance type', 'тип экземпляра'),
            L('for a class', 'для класса'),
          ],
          [
            L('Awaited<ReturnType<typeof load>>', 'Awaited<ReturnType<typeof load>>'),
            L('the resolved value', 'разрешённое значение'),
            L('string, the promise unwrapped', 'string, промис развёрнут'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('ReturnType of an async function', 'ReturnType асинхронной функции'),
          text: L(
            'ReturnType<typeof asyncFn> gives the promise type, not the value. Wrap it in Awaited when the helper you write returns the resolved value, and callers stop unwrapping promises twice.',
            'ReturnType<typeof asyncFn> даёт тип промиса, а не значение. Оберните его в Awaited, когда пишете хелпер, возвращающий разрешённое значение, и вызывающим не придётся разворачивать промисы дважды.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep a wrapper in sync', 'Держите обёртку в согласии с оригиналом'),
          text: L(
            'Parameters<F> means the wrapper breaks when the original signature changes, and the compiler says so. A hand-written argument list drifts the first time someone adds a parameter.',
            'Parameters<F> означает, что обёртка сломается при изменении сигнатуры оригинала, и компилятор об этом сообщит. Выписанный рукой список аргументов расходится с оригиналом при первом же добавлении параметра.'
          ),
        },
      ],
      takeaway: L(
        'Name the result of a function with Awaited<ReturnType<F>>, and forward its arguments with Parameters<F>.',
        'Называйте результат функции через Awaited<ReturnType<F>>, а передавайте её аргументы через Parameters<F>.'
      ),
      seeAlso: [
        L('Section 5-2: infer and the patterns it enables', 'Секция 5-2: infer и схемы, которые он открывает'),
        L('Section 4-4: the built-in utility types', 'Секция 4-4: встроенные утилитные типы'),
        L('Section 10-5: typing untyped dependencies', 'Секция 10-5: типизация нетипизированных зависимостей'),
      ],
    },
  ],
};
