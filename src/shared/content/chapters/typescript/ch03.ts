import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh03: Chapter = {
  id: 'ts-ch3',
  title: L('Interfaces, type aliases and generics', 'Интерфейсы, алиасы типов и дженерики'),
  summary: L(
    'When to declare a shape with an interface and when with a type alias, how optional properties and index signatures behave, and how generics keep a relation between the input and the output.',
    'Когда объявлять форму интерфейсом, а когда алиасом типа, как ведут себя необязательные свойства и индексные сигнатуры и как дженерики сохраняют связь между входом и выходом.'
  ),
  sections: [
    {
      id: 'ts-ch3-s1',
      title: L('Interfaces versus type aliases', 'Интерфейсы против алиасов типов'),
      body: L(
        'Both declare the shape of an object, and both are checked the same way: structurally, by comparing the members rather than the name. The difference is not about what they describe but about what you can do with them afterwards. An interface can be extended with extends, can be implemented by a class, and can be merged with another declaration of the same name. A type alias can do none of those three things.\n\nDeclaration merging is the feature that still justifies interfaces in a codebase that has moved to type aliases everywhere else. Two declarations of interface User in different files are combined into one type with the members of both. It is how a library adds a method to a type it does not own, and how a project keeps the members of one entity in separate files without repeating the header.\n\nType aliases cover everything an interface cannot: a union, an intersection, a tuple, a mapped type, a conditional type, or even a primitive with a friendly name. An interface cannot be a union at all, so any type that needs a pipe has to be an alias. The rule of thumb is simple: use an interface for an object shape that may be extended, implemented or merged, and an alias for everything else.\n\nThere is one more difference that is easy to miss. The implements clause accepts both an interface and a type alias of an object type, but the error messages it produces are worse for an alias, and an alias cannot be used to extend a class that may gain members later. Neither difference matters for application code, and both matter in a published library.',
        'Оба объявляют форму объекта, и проверяются одинаково: структурно, сравнением членов, а не имён. Разница не в том, что они описывают, а в том, что с ними можно делать дальше. Интерфейс можно расширить через extends, реализовать классом и слить с другим объявлением того же имени. Алиас типа не умеет ни одного из трёх.\n\nДекларационное слияние — та возможность, которая до сих пор оправдывает интерфейсы в кодовой базе, где везде перешли на алиасы. Два объявления interface User в разных файлах объединяются в один тип с членами обоих. Так библиотека добавляет метод к типу, который ей не принадлежит, и так проект держит члены одной сущности в отдельных файлах, не повторяя заголовок.\n\nАлиасы покрывают всё, чего интерфейс не может: объединение, пересечение, кортеж, отображаемый тип, условный тип и даже примитив с понятным именем. Интерфейс не может быть объединением вовсе, поэтому любому типу с вертикальной чертой нужен алиас. Правило проще некуда: интерфейс — для объектной формы, которую могут расширить, реализовать или слить, алиас — для всего остального.\n\nЕсть ещё одна разница, которую легко пропустить. Клауза implements принимает и интерфейс, и алиас объектного типа, но сообщения об ошибках у алиаса хуже, а расширить через алиасом класс, который позже может получить новые члены, нельзя. Для кода приложения это неважно, а для опубликованной библиотеки — важно.'
      ),
      bullets: [
        L('Interfaces extend, implement and merge; type aliases do none of the three.', 'Интерфейсы расширяются, реализуются и сливаются; алиасы — нет.'),
        L('Type aliases can be unions, intersections, tuples and computed types.', 'Алиасы типов могут быть объединениями, пересечениями, кортежами и вычисляемыми типами.'),
        L('Declaration merging combines two interfaces with the same name.', 'Декларационное слияние объединяет два интерфейса с одинаковым именем.'),
        L('An interface cannot be a union, so unions always need an alias.', 'Интерфейс не может быть объединением, поэтому объединения — всегда алиасы.'),
        L('implements accepts both, but an interface produces better errors.', 'implements принимает оба варианта, но интерфейс даёт лучшие сообщения об ошибках.'),
      ],
      code: `interface User {
  id: string;
  name: string;
}

// Declaration merging adds the members of both declarations.
interface User {
  lastLogin?: Date;
}

const user: User = { id: '1', name: 'Ada' };
console.log(user.name, user.lastLogin);

// A type alias can express what an interface cannot: a union.
type Result = { ok: true; value: string } | { ok: false; error: string };

function render(result: Result): string {
  return result.ok ? result.value : result.error;
}

console.log(render({ ok: true, value: 'done' }));`,
      table: {
        caption: L('Interface or alias', 'Интерфейс или алиас'),
        headers: [
          L('Feature', 'Возможность'),
          L('interface', 'interface'),
          L('type alias', 'type alias'),
        ],
        rows: [
          [
            L('An object shape', 'Объектная форма'),
            L('yes', 'да'),
            L('yes', 'да'),
          ],
          [
            L('A union, intersection or tuple', 'Объединение, пересечение или кортеж'),
            L('no', 'нет'),
            L('yes', 'да'),
          ],
          [
            L('extends another type', 'extends другого типа'),
            L('yes', 'да'),
            L('no', 'нет'),
          ],
          [
            L('implements in a class', 'implements в классе'),
            L('yes', 'да'),
            L('yes', 'да'),
          ],
          [
            L('Declaration merging', 'Декларационное слияние'),
            L('yes', 'да'),
            L('no', 'нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Interface for the public surface', 'Интерфейс для публичной поверхности'),
          text: L(
            'Types that other packages import are the ones most likely to be extended later. An interface leaves room for that, and a merged declaration can add a member without touching the original file.',
            'Типы, которые импортируют другие пакеты, — те самые, которые позже вероятнее всего расширят. Интерфейс оставляет для этого место, а слитое объявление добавит член, не трогая исходный файл.'
          ),
        },
        {
          tone: 'note',
          title: L('Both are structural', 'Обе формы структурные'),
          text: L(
            'Neither form creates a nominal identity. A type alias describing the same members as an interface is interchangeable with it, and neither one is assignable to the other by name.',
            'Ни одна из форм не создаёт номинальную идентичность. Алиас с теми же членами, что у интерфейса, взаимозаменяем с ним, и ни один не присваивается другому по имени.'
          ),
        },
      ],
      takeaway: L(
        'Interface for shapes you will extend, implement or merge; type alias for unions, intersections and computed types.',
        'Интерфейс — для форм, которые расширяют, реализуют или сливают; алиас — для объединений, пересечений и вычисляемых типов.'
      ),
      seeAlso: [
        L('Section 3-6: generics in interfaces and classes', 'Секция 3-6: дженерики в интерфейсах и классах'),
        L('Section 7-5: declaration merging and overloads', 'Секция 7-5: декларационное слияние и перегрузки'),
        L('Section 4-3: homomorphic mapped types and key remapping', 'Секция 4-3: гомоморфные отображаемые типы и ремаппинг ключей'),
      ],
    },
    {
      id: 'ts-ch3-s2',
      title: L('Optional properties and exactOptionalPropertyTypes', 'Необязательные свойства и exactOptionalPropertyTypes'),
      body: L(
        'A question mark after a property name makes it optional, and that single character changes two things at once. The property may be missing from the object entirely, and reading it gives a type that includes undefined, so the compiler forces you to check before you use it. An optional property is the honest description of a value that may or may not be there.\n\nBy default, optional and undefined are not distinguished. A property declared as retries?: number can be absent, and it can also be present with the value undefined, because both readings are compatible with the type. That is convenient and it is also lossy: after reading the property you cannot tell whether the caller omitted it or explicitly set it to undefined, and those two cases often mean different things in the code that follows.\n\nThe compiler option exactOptionalPropertyTypes removes the convenience and keeps the distinction. With it enabled, retries?: number means the property may be absent, but if it is present it must be a number, and assigning undefined to it is an error. To allow an explicit undefined, the type has to say so: retries?: number | undefined.\n\nThis flag matters most in the code that updates an object. When a partial update is written as a merged copy, an absent property and a property set to undefined behave differently: the first keeps the old value, the second overwrites it with undefined. Turning the flag on turns that difference into a compile error instead of a field that mysteriously becomes empty in the database.',
        'Знак вопроса после имени свойства делает его необязательным, и этот единственный символ меняет сразу две вещи. Свойства может не быть в объекте вообще, а при чтении вы получаете тип, в котором есть undefined, поэтому компилятор заставляет проверить значение перед использованием. Необязательное свойство — честное описание значения, которое может быть, а может и не быть.\n\nПо умолчанию необязательное и undefined не различаются. Свойство, объявленное как retries?: number, может отсутствовать, а может присутствовать со значением undefined, потому что оба прочтения совместимы с типом. Это удобно и при этом lossy: прочитав свойство, вы не можете понять, пропустил его вызывающий или явно записал undefined, а эти два случая часто означают разное в коде дальше.\n\nОпция компилятора exactOptionalPropertyTypes убирает удобство и сохраняет различие. С ней retries?: number означает, что свойства может не быть, но если оно есть, это обязательно число, а присваивание undefined — ошибка. Чтобы явный undefined был разрешён, тип должен сказать об этом сам: retries?: number | undefined.\n\nЭтот флаг важнее всего в коде, который обновляет объект. Когда частичное обновление записывается слиянием копий, отсутствующее свойство и свойство, записанное как undefined, ведут себя по-разному: первое сохраняет старое значение, второе затирает его на undefined. С флагом эта разница становится ошибкой компиляции, а не полем, которое таински пустеет в базе.'
      ),
      bullets: [
        L('A question mark makes a property optional and adds undefined to what you read.', 'Знак вопроса делает свойство необязательным и добавляет undefined к результату чтения.'),
        L('Without the flag, an optional property may also be explicitly undefined.', 'Без флага необязательное свойство может быть и явно undefined.'),
        L('exactOptionalPropertyTypes forbids assigning undefined to an optional property.', 'exactOptionalPropertyTypes запрещает присваивать undefined необязательному свойству.'),
        L('Write prop?: T | undefined when an explicit undefined is allowed.', 'Пишите prop?: T | undefined, когда явный undefined допустим.'),
        L('The flag turns a silent overwrite into a compile error.', 'Флаг превращает молчаливую перезапись в ошибку компиляции.'),
      ],
      code: `interface Options {
  retries?: number;             // the property may be missing
  timeout: number | undefined;  // required, but it may be undefined
}

const a: Options = { timeout: 1000 };
const b: Options = { retries: 3, timeout: 1000 };

// With exactOptionalPropertyTypes this line is an error:
// const c: Options = { retries: undefined, timeout: 1000 };

function delay(options: Options): number {
  const retries = options.retries ?? 0;   // reading an optional property
  return retries + (options.timeout ?? 0);
}

console.log(a, b, delay(b));`,
      table: {
        caption: L('Three ways to say "maybe"', 'Три способа сказать «может быть»'),
        headers: [
          L('Declaration', 'Объявление'),
          L('May be missing', 'Может отсутствовать'),
          L('May be undefined', 'Может быть undefined'),
        ],
        rows: [
          [
            L('retries: number', 'retries: number'),
            L('no', 'нет'),
            L('no', 'нет'),
          ],
          [
            L('retries?: number', 'retries?: number'),
            L('yes', 'да'),
            L('yes, without the flag', 'да, без флага'),
          ],
          [
            L('retries?: number | undefined', 'retries?: number | undefined'),
            L('yes', 'да'),
            L('yes, with or without the flag', 'да, с флагом и без'),
          ],
          [
            L('retries: number | undefined', 'retries: number | undefined'),
            L('no', 'нет'),
            L('yes', 'да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The flag changes existing code', 'Флаг меняет существующий код'),
          text: L(
            'Turning exactOptionalPropertyTypes on is not a free switch: every place that assigns undefined to an optional property becomes an error. Enable it on a branch, fix the reported spots, and merge it as a separate change.',
            'Включение exactOptionalPropertyTypes не бесплатный переключатель: каждое место, где необязательному свойству присваивают undefined, станет ошибкой. Включите его в ветке, исправьте отмеченные места и внесите отдельным изменением.'
          ),
        },
        {
          tone: 'tip',
          title: L('It pays off in update paths', 'Он окупается на путях обновления'),
          text: L(
            'The difference between a missing key and an explicit undefined is invisible in the type system by default and visible in the data. The flag is what makes the compiler see it too.',
            'Разница между отсутствующим ключом и явным undefined по умолчанию невидима для системы типов и очень видна в данных. Флаг делает её видимой и для компилятора.'
          ),
        },
      ],
      takeaway: L(
        'Decide deliberately whether absent and undefined mean the same thing, and write the type that says so.',
        'Решите осознанно, значит ли отсутствие то же самое, что undefined, и запишите тип, который это выражает.'
      ),
      seeAlso: [
        L('Section 9-3: noUncheckedIndexedAccess and exactOptionalPropertyTypes', 'Секция 9-3: noUncheckedIndexedAccess и exactOptionalPropertyTypes'),
        L('Section 3-3: index signatures and excess property checks', 'Секция 3-3: индексные сигнатуры и проверка лишних свойств'),
        L('Section 4-4: Partial, Required and Pick', 'Секция 4-4: Partial, Required и Pick'),
      ],
    },
    {
      id: 'ts-ch3-s3',
      title: L('Index signatures and excess property checks', 'Индексные сигнатуры и проверка лишних свойств'),
      body: L(
        'An index signature describes an object whose keys are not known in advance: [key: string]: number says that every string key holds a number. It is the honest way to type a dictionary, a set of feature flags or a bag of settings, and it is far safer than any because the value type is still checked on every read.\n\nThe cost of an index signature is that the named properties have to fit it. In an interface with both name: string and [key: string]: number, the compiler rejects the declaration, because string is not assignable to number. The rule applies to the declared members, so an index signature of unknown accepts everything, while a stricter one forces the named members to match.\n\nIndex signatures also disable the excess property check, and that is the second cost. The check is what rejects a fresh object literal with a property the target type does not declare, catching a misspelled key before it reaches production. A type with an index signature has nothing to compare the literal against, so the literal passes and the typo becomes a value of unknown.\n\nThe Record utility type is the modern spelling of the same idea, and it behaves differently in one important respect. Record<string, number> accepts any string key, while Record<"a" | "b", number> produces two required properties with those exact names. The first is a dictionary, the second is an object with a fixed shape written compactly.',
        'Индексная сигнатура описывает объект, ключи которого заранее неизвестны: [key: string]: number говорит, что по любому строковому ключу лежит число. Это честный способ типизировать словарь, набор флагов или мешок с настройками, и он намного безопаснее any, потому что тип значения проверяется при каждом чтении.\n\nЦена индексной сигнатуры в том, что именованные свойства должны ей соответствовать. В интерфейсе с name: string и [key: string]: number компилятор отвергает объявление, потому что string не присваивается number. Правило касается объявленных членов, поэтому сигнатура со значением unknown принимает всё, а более строгая заставляет именованные члены ей соответствовать.\n\nИндексная сигнатура заодно отключает проверку лишних свойств, и это вторая цена. Именно эта проверка отвергает свежий литерал объекта со свойством, которого нет в целевом типе, и ловит опечатку в ключе до продакшена. У типа с индексной сигнатурой нет с чем сравнивать литерал, поэтому литерал проходит, а опечатка превращается в значение типа unknown.\n\nУтилитный тип Record — современная запись той же идеи, и в одном существенном отношении ведёт себя иначе. Record<string, number> принимает любой строковый ключ, а Record<"a" | "b", number> даёт два обязательных свойства с такими именами. Первое — словарь, второе — объект с фиксированной формой, записанный компактно.'
      ),
      bullets: [
        L('An index signature types an object with keys the code does not know.', 'Индексная сигнатура описывает объект с неизвестными заранее ключами.'),
        L('Every named property must be assignable to the index signature value type.', 'Каждое именованное свойство должно быть присваиваемо типу значения сигнатуры.'),
        L('An index signature turns off the excess property check for that type.', 'Индексная сигнатура отключает проверку лишних свойств для этого типа.'),
        L('Record<string, T> is a dictionary, Record<K, T> with literal keys is a fixed shape.', 'Record<string, T> — словарь, а Record<K, T> с литеральными ключами — фиксированная форма.'),
        L('unknown is the safe value type for an index signature.', 'unknown — безопасный тип значения для индексной сигнатуры.'),
      ],
      code: `interface Scores {
  [name: string]: number;
}

const scores: Scores = { alice: 10, bob: 20 };
console.log(scores.alice, scores['nobody']);

// A named property must fit the index signature.
interface Config { [key: string]: unknown; name: string; }

const config: Config = { name: 'app', retries: 3 };
console.log(config.name, config.retries);

// The excess property check fires on a fresh literal only.
const fresh: { id: string } = { id: '1' };
// const wrong: { id: string } = { id: '1', extra: true };   // error
console.log(fresh.id);

// Record with literal keys produces required properties.
type Levels = Record<'debug' | 'info', number>;
const levels: Levels = { debug: 1, info: 2 };
console.log(levels.debug);`,
      table: {
        caption: L('Where the excess property check applies', 'Где действует проверка лишних свойств'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Checked?', 'Проверяется?'),
          L('Reason', 'Причина'),
        ],
        rows: [
          [
            L('a fresh object literal', 'свежий литерал объекта'),
            L('yes', 'да'),
            L('the literal is compared with the target type', 'литерал сравнивается с целевым типом'),
          ],
          [
            L('a variable built earlier', 'переменная, собранная раньше'),
            L('no', 'нет'),
            L('the check only applies to literals', 'проверка касается только литералов'),
          ],
          [
            L('a type with an index signature', 'тип с индексной сигнатурой'),
            L('no', 'нет'),
            L('there is nothing to compare the literal with', 'не с чем сравнивать литерал'),
          ],
          [
            L('a value returned from a function', 'значение, возвращённое функцией'),
            L('no', 'нет'),
            L('the check applies to literals only', 'проверка касается только литералов'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The typo that becomes unknown', 'Опечатка, ставшая unknown'),
          text: L(
            'With an index signature, a misspelled key is accepted and read back as unknown instead of failing at compile time. If the bag of values is small, declare the keys explicitly instead.',
            'С индексной сигнатурой опечатка в ключе принимается и читается как unknown вместо ошибки компиляции. Если набор значений небольшой, объявите ключи явно.'
          ),
        },
        {
          tone: 'note',
          title: L('The named members must fit', 'Именованные члены должны подходить'),
          text: L(
            'A declaration like interface Bad { name: string; [key: string]: number } is rejected outright. Use an index signature of unknown when the named members have different types.',
            'Объявление вида interface Bad { name: string; [key: string]: number } отвергается целиком. Берите сигнатуру со значением unknown, когда именованные члены разных типов.'
          ),
        },
      ],
      takeaway: L(
        'Reach for an index signature only for genuinely dynamic keys, and remember that it removes the excess property check.',
        'Берите индексную сигнатуру только для действительно динамических ключей и помните, что она отключает проверку лишних свойств.'
      ),
      seeAlso: [
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения типов и дискриминируемые свойства'),
        L('Section 4-4: the Record utility type', 'Секция 4-4: утилитный тип Record'),
        L('Section 3-2: optional properties and undefined', 'Секция 3-2: необязательные свойства и undefined'),
      ],
    },
    {
      id: 'ts-ch3-s4',
      title: L('Generic functions and inference', 'Обобщённые функции и вывод типов'),
      body: L(
        'A generic parameter is a placeholder for a type that the caller chooses. The point is not to avoid writing a type, but to keep the relation between the input and the output: a function that takes an array of T and returns its first element gives back the element type, not the array type and not any. That relation is what makes the helper safe to use with any type.\n\nThe compiler infers the type arguments from the call site, so most calls need none at all. first([1, 2, 3]) infers a number array, first(["a"]) infers a string array, and the result changes with the argument. Inference works from the arguments, from the context of the assignment, and from the expected return type, which is why the same function can behave differently in two places.\n\nWhen inference cannot decide, it falls back to the constraint or to unknown, and the result is often too wide. An empty array has no element type to infer, so the element type becomes never. A value of type any poisons the inference and gives back any. A parameter that appears only in the return type cannot be inferred from the call at all. In those places, name the type argument explicitly.\n\nThe design question is where to put the type parameter. A parameter that appears in the input is easy to infer, and one that appears only in the output has to be written down. When a generic appears in three or four places, the function usually wants a shape constraint instead of a free type parameter, and a constraint written as an interface reads better than a pile of type arguments.',
        'Параметр типа — это место для конкретного типа, который выбирает вызывающий. Дело не в том, чтобы не писать тип, а в том, чтобы сохранить связь между входом и выходом: функция, принимающая массив T и возвращающая первый элемент, отдаёт тип элемента, а не тип массива и не any. Именно эта связь делает хелпер безопасным для любого типа.\n\nКомпилятор выводит параметры типа из места вызова, поэтому большинству вызовов они не нужны вовсе. first([1, 2, 3]) выводит массив чисел, first(["a"]) — массив строк, и результат меняется вместе с аргументом. Вывод работает от аргументов, от контекста присваивания и от ожидаемого типа возврата, поэтому одна и та же функция может вести себя по-разному в двух местах.\n\nКогда вывод не может решить, он откатывается к ограничению или к unknown, и результат часто оказывается слишком широким. У пустого массива нет типа элемента, который можно вывести, поэтому элемент становится never. Значение типа any отравляет вывод и возвращает any. Параметр, встречающийся только в типе возврата, из вызова не выводится вообще. В таких местах называйте параметр типа явно.\n\nВопрос проектирования в том, куда поставить параметр типа. Тот, что встречается во входе, выводится легко, а тот, что есть только в выходе, приходится писать руками. Когда дженерик встречается в трёх-четырёх местах, функции обычно нужна не свободная переменная типа, а ограничение формы, и ограничение, записанное интерфейсом, читается лучше, чем россыпь параметров типа.'
      ),
      bullets: [
        L('A generic keeps the relation between the argument type and the result type.', 'Дженерик сохраняет связь между типом аргумента и типом результата.'),
        L('Type arguments are inferred from the arguments and from the context.', 'Параметры типа выводятся из аргументов и из контекста.'),
        L('An empty array infers never, so name the type argument explicitly.', 'Пустой массив даёт never, поэтому параметр типа нужно указать явно.'),
        L('A parameter used only in the return type is not inferred from the call.', 'Параметр, встречающийся только в типе возврата, из вызова не выводится.'),
        L('A constraint with a named interface beats a list of type arguments.', 'Ограничение с именованным интерфейсом лучше россыпи параметров типа.'),
      ],
      code: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]);        // number | undefined
const s = first(['a']);            // string | undefined
const forced = first<string>([]);  // explicit, because [] infers never

console.log(n, s, forced);

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const mixed = pair(1, 'x');        // [number, string]
console.log(mixed);`,
      table: {
        caption: L('What the compiler infers', 'Что выводит компилятор'),
        headers: [
          L('Call', 'Вызов'),
          L('Inferred type argument', 'Выведенный параметр типа'),
          L('Note', 'Замечание'),
        ],
        rows: [
          [
            L('first([1, 2])', 'first([1, 2])'),
            L('number', 'number'),
            L('from the element type', 'из типа элемента'),
          ],
          [
            L('first([])', 'first([])'),
            L('never', 'never'),
            L('nothing to infer from', 'выводить нечего'),
          ],
          [
            L("first(['a'])", "first(['a'])"),
            L('string', 'string'),
            L('from the element type', 'из типа элемента'),
          ],
          [
            L('first<string>([])', 'first<string>([])'),
            L('string', 'string'),
            L('named explicitly', 'назван явно'),
          ],
          [
            L('first(value)', 'first(value)'),
            L('unknown', 'unknown'),
            L('the fallback when there is no constraint', 'запасной вариант без ограничения'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('any poisons the inference', 'any отравляет вывод'),
          text: L(
            'One any in the argument makes the whole call produce any, and the relation you wanted to preserve is gone. Type the boundary as unknown and narrow it, so the generic sees a real type.',
            'Одно any в аргументе делает весь вызов any, и связь, которую вы хотели сохранить, пропадает. Типизируйте границу как unknown и сужайте, чтобы дженерик видел настоящий тип.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name it when the call site is silent', 'Назовите, когда место вызова молчит'),
          text: L(
            'Empty arrays, values of type any and parameters that appear only in the result cannot be inferred. One explicit type argument at the call site removes the guesswork.',
            'Пустые массивы, значения типа any и параметры, которые есть только в результате, выводу не поддаются. Одно явное указание параметра типа в месте вызова снимает догадки.'
          ),
        },
      ],
      takeaway: L(
        'Let inference pick the type argument and write it by hand only when the call site cannot say it.',
        'Пусть вывод выберет параметр типа, а указывайте его руками только там, где место вызова не может его подсказать.'
      ),
      seeAlso: [
        L('Section 3-5: constraints and default type arguments', 'Секция 3-5: ограничения и значения типа по умолчанию'),
        L('Section 4-1: keyof and indexed access', 'Секция 4-1: keyof и индексированный доступ'),
        L('Section 1-2: annotations, inference and contextual typing', 'Секция 1-2: аннотации, вывод и контекстная типизация'),
      ],
    },
    {
      id: 'ts-ch3-s5',
      title: L('Generic constraints and defaults', 'Ограничения и значения типа по умолчанию'),
      body: L(
        'A constraint is written with extends and answers the question the type parameter alone cannot: what must the type have? A parameter constrained with T extends { id: string } may read item.id inside the body, because the compiler knows that every possible T has that member. Without the constraint the same access is an error, since a bare T has no members at all.\n\nThe most useful constraint in practice is K extends keyof T, which ties a key parameter to the object it belongs to. The function then accepts only keys that really exist, and the return type T[K] is precisely the type of the property that was read. The alternative, a plain string key, gives you a lookup that may return undefined at run time and a type that has to pretend it will not.\n\nA default type parameter gives the parameter a fallback when inference has nothing to work with. interface Box<T = string> means that a Box without an argument is a box of strings, and Box<number> still works when you want numbers. Defaults keep the common case short while leaving the uncommon case open.\n\nConstraints and defaults solve different problems and are used together. A constrained parameter with a default, T extends Entity = Entity, gives a helper that is generic when it needs to be and concrete when it does not. The order matters: parameters with defaults come last, because a required parameter after an optional one cannot be filled in by inference.',
        'Ограничение записывается через extends и отвечает на вопрос, на который параметр типа сам по себе ответить не может: что обязано быть у типа? Параметр с ограничением T extends { id: string } позволяет читать item.id внутри тела, потому что компилятор знает: у любого допустимого T есть этот член. Без ограничения тот же доступ — ошибка, потому что у голого T нет никаких членов.\n\nСамое полезное ограничение на практике — K extends keyof T, связывающее параметр-ключ с объектом, которому он принадлежит. Функция принимает только ключи, которые действительно есть, а тип возврата T[K] точно совпадает с типом прочитанного свойства. Альтернатива, обычный строковый ключ, даёт обращение, которое в рантайме может не найтись, и тип, который вынужден делать вид, что этого не случится.\n\nЗначение типа по умолчанию даёт параметру запасной вариант, когда выводить нечего. interface Box<T = string> означает, что Box без аргумента — это коробка со строками, а Box<number> работает, когда нужны числа. Значения по умолчанию сокращают обычный случай и оставляют редкий открытым.\n\nОграничения и значения по умолчанию решают разные задачи и используются вместе. Ограниченный параметр со значением по умолчанию, T extends Entity = Entity, даёт хелпер, который обобщён, когда это нужно, и конкретен, когда не нужно. Порядок важен: параметры со значениями по умолчанию идут последними, потому что обязательный параметр после необязательного нельзя заполнить выводом.'
      ),
      bullets: [
        L('extends states what every possible type argument must have.', 'extends задаёт, что должно быть у любого допустимого параметра типа.'),
        L('A constraint lets the body read the members of the type parameter.', 'Ограничение позволяет телу читать члены параметра типа.'),
        L('K extends keyof T accepts only keys that exist on T.', 'K extends keyof T принимает только ключи, которые есть у T.'),
        L('A default type parameter is used when inference has nothing to infer from.', 'Значение по умолчанию используется, когда выводить нечего.'),
        L('Parameters with defaults must come after the required ones.', 'Параметры со значениями по умолчанию идут после обязательных.'),
      ],
      code: `interface Entity {
  id: string;
  name: string;
}

function findById<T extends Entity>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

interface Box<T = string> {
  value: T;
}

const users: Entity[] = [{ id: '1', name: 'Ada' }];
console.log(findById(users, '1'), pluck(users, 'name'));

const box: Box = { value: 'text' };
console.log(box.value);`,
      table: {
        caption: L('Ways to constrain a type parameter', 'Способы ограничить параметр типа'),
        headers: [
          L('Constraint', 'Ограничение'),
          L('Allows', 'Разрешает'),
          L('Example', 'Пример'),
        ],
        rows: [
          [
            L('T extends string', 'T extends string'),
            L('any string', 'любую строку'),
            L('a name parameter', 'параметр с именем'),
          ],
          [
            L('T extends { id: string }', 'T extends { id: string }'),
            L('anything with an id', 'что угодно с id'),
            L('findById', 'findById'),
          ],
          [
            L('K extends keyof T', 'K extends keyof T'),
            L('only the keys that exist', 'только существующие ключи'),
            L('pluck', 'pluck'),
          ],
          [
            L('T extends keyof any', 'T extends keyof any'),
            L('string, number or symbol', 'string, number или symbol'),
            L('a loose key', 'свободный ключ'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The order of the parameters', 'Порядок параметров типа'),
          text: L(
            'A required type parameter after one with a default cannot be filled in, because the compiler has nothing to infer the missing one from. Required parameters come first, always.',
            'Обязательный параметр типа после параметра со значением по умолчанию заполнить нельзя: компилятору нечего выводить. Обязательные параметры идут первыми, всегда.'
          ),
        },
        {
          tone: 'tip',
          title: L('keyof turns a string into a safe key', 'keyof превращает строку в безопасный ключ'),
          text: L(
            'With K extends keyof T the compiler rejects a key that does not exist on the object, and the return type stays exact. A plain string parameter gives up both guarantees.',
            'С K extends keyof T компилятор отвергает ключ, которого нет у объекта, и тип возврата остаётся точным. Обычный строковый параметр теряет обе гарантии.'
          ),
        },
      ],
      takeaway: L(
        'Constrain a type parameter with extends when the body needs its members, and give it a default when the common case has one obvious type.',
        'Ограничивайте параметр типа через extends, когда телу нужны его члены, и задавайте значение по умолчанию, когда у обычного случая есть очевидный тип.'
      ),
      seeAlso: [
        L('Section 3-4: generic functions and inference', 'Секция 3-4: обобщённые функции и вывод типов'),
        L('Section 4-1: keyof and indexed access', 'Секция 4-1: keyof и индексированный доступ'),
        L('Section 3-6: generics in interfaces and classes', 'Секция 3-6: дженерики в интерфейсах и классах'),
      ],
    },
    {
      id: 'ts-ch3-s6',
      title: L('Generics in interfaces and classes', 'Дженерики в интерфейсах и классах'),
      body: L(
        'A generic interface describes a shape that works with any payload. Page<T> with items: T[] and total: number is the standard response envelope, and ApiResponse<T> with data and error is the standard result type. The type parameter appears in the members, so the consumer gets the payload type at the use site instead of a promise of data somewhere else.\n\nA generic class works the same way and adds one more thing: the constructor. A Store<T> class can be created as new Store<string>(), and the compiler checks every add and every read against that choice. When the class is used without a type argument, inference from the constructor arguments fills it in, exactly as it does for a function.\n\nA method can be generic inside a class that is not. A class with a fixed type parameter can still have a method whose own type parameter is inferred from its arguments, and the two levels stay independent. That is the pattern for a container whose identity is fixed, like a repository of users, offering a generic method that transforms the item it holds.\n\nThe practical advice is to keep the type parameter close to where it is used and to name it after the role, not after the letter. T in a long signature says nothing; Payload, Item, Response or Key say what the type is. A class that needs four type parameters usually wants an interface or a mapped type instead, and a name that starts with T is a sign to look for a better shape.',
        'Дженерик-интерфейс описывает форму, работающую с любой полезной нагрузкой. Page<T> с items: T[] и total: number — стандартная обёртка ответа, а ApiResponse<T> с data и error — стандартный тип результата. Параметр типа появляется в членах, поэтому потребитель получает тип полезной нагрузки в месте использования, а не обещание данных где-то ещё.\n\nДженерик-класс устроен так же и добавляет ещё кое-что: конструктор. Класс Store<T> создаётся как new Store<string>(), и компилятор проверяет по этому выбору каждый add и каждое чтение. Когда класс используют без параметра типа, его выводит из аргументов конструктора — ровно как для функции.\n\nМетод может быть дженериком внутри класса, который дженериком не является. У класса с фиксированным параметром типа может быть метод со своим параметром типа, выводимым из аргументов, и два уровня остаются независимыми. Это схема для контейнера с фиксированной идентичностью, скажем репозитория пользователей, который предлагает обобщённый метод, преобразующий хранимый элемент.\n\nПрактический совет: держите параметр типа рядом с тем местом, где он используется, и называйте его по роли, а не по букве. T в длинной сигнатуре ничего не говорит; Payload, Item, Response или Key говорят, что это за тип. Классу, которому нужны четыре параметра типа, обычно нужна интерфейсная форма или отображаемый тип, а имя, начинающееся с T, — повод поискать форму получше.'
      ),
      bullets: [
        L('A generic interface describes a shape that works with any payload type.', 'Дженерик-интерфейс описывает форму, работающую с любым типом полезной нагрузки.'),
        L('A generic class fixes the type for every member, including the constructor.', 'Дженерик-класс фиксирует тип для всех членов, включая конструктор.'),
        L('new Store<string>() names the type argument at the use site.', 'new Store<string>() явно называет параметр типа в месте использования.'),
        L('A generic method inside a non-generic class infers its own type argument.', 'Дженерик-метод в не-дженерик классе сам выводит свой параметр типа.'),
        L('Name type parameters after their role, not after a letter.', 'Называйте параметры типа по роли, а не по букве.'),
      ],
      code: `interface Page<T> {
  items: T[];
  total: number;
}

class Store<T> {
  private readonly items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }
  get all(): T[] {
    return [...this.items];
  }
}

const store = new Store<string>();
store.add('first');
console.log(store.all);

const page: Page<string> = { items: ['a'], total: 1 };
console.log(page);`,
      table: {
        caption: L('Where a type parameter can live', 'Где может жить параметр типа'),
        headers: [
          L('Place', 'Место'),
          L('Written as', 'Записывается как'),
          L('Inferred from', 'Выводится из'),
        ],
        rows: [
          [
            L('a function', 'функция'),
            L('function f<T>(x: T)', 'function f<T>(x: T)'),
            L('the arguments', 'аргументов'),
          ],
          [
            L('an interface', 'интерфейс'),
            L('interface Page<T>', 'interface Page<T>'),
            L('the use site', 'места использования'),
          ],
          [
            L('a class', 'класс'),
            L('class Store<T>', 'class Store<T>'),
            L('the constructor arguments', 'аргументов конструктора'),
          ],
          [
            L('a method', 'метод'),
            L('method f<T>(x: T)', 'method f<T>(x: T)'),
            L('the method arguments', 'аргументов метода'),
          ],
          [
            L('a type alias', 'алиас типа'),
            L('type Box<T>', 'type Box<T>'),
            L('the use site', 'места использования'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Let the constructor infer', 'Пусть выводит конструктор'),
          text: L(
            'A class whose type argument can be read from its constructor arguments does not need it written at every call. Name it only when the class is used without arguments.',
            'Класс, чей параметр типа выводится из аргументов конструктора, не требует его писать в каждом месте. Называйте его только тогда, когда класс используют без аргументов.'
          ),
        },
        {
          tone: 'note',
          title: L('Two levels of generic', 'Два уровня обобщения'),
          text: L(
            'A generic class can hold a generic method, and the two type parameters are independent. Use the class parameter for what the class stores and the method parameter for what the method transforms.',
            'Дженерик-класс может содержать дженерик-метод, и два параметра типа независимы. Параметр класса — для того, что класс хранит, параметр метода — для того, что метод преобразует.'
          ),
        },
      ],
      takeaway: L(
        'Put the type parameter where the payload is used, and name it after the role it plays.',
        'Помещайте параметр типа туда, где используется полезная нагрузка, и называйте его по роли.'
      ),
      seeAlso: [
        L('Section 3-1: interfaces versus type aliases', 'Секция 3-1: интерфейсы против алиасов типов'),
        L('Section 3-5: constraints and default type arguments', 'Секция 3-5: ограничения и значения типа по умолчанию'),
        L('Section 7-1: class members and structural compatibility', 'Секция 7-1: члены класса и структурная совместимость'),
      ],
    },
  ],
};
