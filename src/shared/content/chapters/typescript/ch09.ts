import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh09: Chapter = {
  id: 'ts-ch9',
  title: L('tsconfig and strictness', 'tsconfig и строгий режим'),
  summary: L(
    'How a tsconfig.json describes a TypeScript project: which files belong to it, how strict the checker is, how an import is resolved, and how the build stays fast as the codebase grows.',
    'Как tsconfig.json описывает проект на TypeScript: какие файлы в него входят, насколько строг компилятор, как разрешается импорт и как сборка остаётся быстрой по мере роста кодовой базы.'
  ),
  sections: [
    {
      id: 'ts-ch9-s1',
      title: L('Compiler options and how to read them', 'Параметры компилятора и как их читать'),
      body: L(
        'A tsconfig.json is the contract between a project and the compiler: it names the files that belong to the project, the language level the output targets, and the rules the checker applies. The compiler refuses to work on files that no configuration covers, which is why an editor, a CI job and a colleague machine can report three different errors for the same line. One configuration file committed to the repository is what makes all three agree.\n\nThe extends key makes a configuration composable. A base file holds the options shared by every package, and each child file names that base and overrides only what differs. Relative paths inside a configuration are resolved against the file they came from, so an inherited include or outDir keeps pointing at the base directory and not at the child. The common layout is one base configuration plus a small one per package.\n\nThe keys files and include decide what the compiler looks at. files is an explicit list, and a missing entry in it is an error. include takes glob patterns and, when files is absent, defaults to every file under the directory of the configuration; exclude removes files from that set, with node_modules and the output directory excluded by default. Exclusion applies to the root file set only: a file reached through an import is still compiled and still checked.\n\nThe key composite marks a project as a building block that other projects may depend on. It requires the full file list to be known in advance, forces declaration output, and turns the project into a unit the build system can order and cache. Read a configuration as documentation and every option answers a question the code cannot answer for itself: which files are mine, how strict is the checker, where does the output go, and what does an import mean.',
        'Файл tsconfig.json — это контракт между проектом и компилятором: он перечисляет файлы, входящие в проект, задаёт уровень языка для вывода и правила проверки. Компилятор отказывается работать с файлами, не покрытыми ни одной конфигурацией, и именно поэтому редактор, задача в CI и машина коллеги могут показывать три разных сообщения об ошибке на одной строке. Один файл конфигурации, закоммиченный в репозиторий, и делает так, что все три сходятся.\n\nКлюч extends делает конфигурацию собираемой из частей. Базовый файл хранит параметры, общие для всех пакетов, а каждый дочерний называет этот базовый и переопределяет только отличия. Относительные пути внутри конфигурации разрешаются относительно файла, в котором они записаны, поэтому унаследованные include или outDir по-прежнему указывают на базовый каталог, а не на дочерний. Обычная раскладка — один базовый файл и небольшой свой у каждого пакета.\n\nКлючи files и include определяют, что именно смотрит компилятор. files — это явный список, и отсутствующая запись в нём считается ошибкой. include принимает шаблоны и, если files не задан, по умолчанию охватывает все файлы в каталоге конфигурации; exclude убирает файлы из этого набора, а node_modules и каталог вывода исключаются по умолчанию. Исключение действует только на корневой набор файлов: файл, попавший в проект через импорт, всё равно компилируется и всё равно проверяется.\n\nКлюч composite помечает проект как блок, на который могут ссылаться другие проекты. Он требует, чтобы полный список файлов был известен заранее, включает генерацию деклараций и превращает проект в единицу, которую система сборки умеет упорядочивать и кэшировать. Читайте конфигурацию как документацию — и каждый параметр отвечает на вопрос, на который код ответить не может: какие файлы мои, насколько строг компилятор, куда складывается вывод и что означает импорт.'
      ),
      bullets: [
        L('tsconfig.json is JSON with comments and the whole toolchain reads the same file.', 'tsconfig.json — это JSON с комментариями, и весь инструментарий читает один и тот же файл.'),
        L('extends inherits options, and relative paths inside the base stay relative to the base.', 'extends наследует параметры, а относительные пути внутри базового файла остаются относительно него.'),
        L('files lists files explicitly and fails on a missing entry, include takes glob patterns.', 'files перечисляет файлы явно и падает на отсутствующей записи, include принимает шаблоны.'),
        L('exclude filters the root file set only, an imported file is still checked.', 'exclude фильтрует только корневой набор файлов, импортированный файл всё равно проверяется.'),
        L('composite makes a project referenceable and forces declaration output.', 'composite делает проект ссылочным и включает генерацию деклараций.'),
      ],
      code: `{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    // relative paths are resolved against this file, not against the base one
    "composite": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts"],
  "references": [{ "path": "../shared" }]
}`,
      table: {
        caption: L('What each group of options answers', 'На что отвечает каждая группа параметров'),
        headers: [
          L('Question', 'Вопрос'),
          L('Options', 'Параметры'),
          L('Effect', 'Действие'),
        ],
        rows: [
          [
            L('Which files belong to the project?', 'Какие файлы входят в проект?'),
            L('files, include, exclude', 'files, include, exclude'),
            L('Sets the root file set of the project', 'Задаёт корневой набор файлов проекта'),
          ],
          [
            L('How strict is the checker?', 'Насколько строг компилятор?'),
            L('strict and its family', 'strict и его семейство'),
            L('Turns on the checks that reject unsafe assumptions', 'Включает проверки, отвергающие небезопасные допущения'),
          ],
          [
            L('Where does the output go?', 'Куда складывается вывод?'),
            L('outDir, rootDir, declaration', 'outDir, rootDir, declaration'),
            L('Places the emitted JavaScript and type declarations', 'Определяет место для собранного JavaScript и деклараций'),
          ],
          [
            L('What does an import mean?', 'Что означает импорт?'),
            L('module, moduleResolution', 'module, moduleResolution'),
            L('Picks the algorithm that maps a specifier to a file', 'Выбирает алгоритм сопоставления спецификатора с файлом'),
          ],
          [
            L('Can another project depend on this one?', 'Может ли другой проект зависеть от этого?'),
            L('composite, references', 'composite, references'),
            L('Makes the project a unit the build can order and cache', 'Делает проект единицей, которую сборка умеет упорядочивать и кэшировать'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('One configuration per project', 'Одна конфигурация на проект'),
          text: L(
            'A package that ships its own tsconfig.json can be compiled and checked on its own, which is what a monorepo needs. The root configuration then only lists references, and every package inherits the shared options from the base file.',
            'Пакет со своим tsconfig.json можно собрать и проверить отдельно — именно это и нужно монорепозиторию. Корневая конфигурация тогда только перечисляет ссылки, а каждый пакет наследует общие параметры из базового файла.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Inherited paths keep pointing at the base', 'Унаследованные пути смотрят на базу'),
          text: L(
            'A relative outDir or include inside the file named by extends is resolved against that file, not against the package that inherits it. The result is output that lands in an unexpected directory, or a build that includes nothing at all.',
            'Относительный outDir или include из файла, названного в extends, разрешается относительно этого файла, а не относительно пакета, который его наследует. В итоге вывод оказывается в неожиданном каталоге или сборка не включает вообще ничего.'
          ),
        },
      ],
      takeaway: L(
        'Read tsconfig.json as the specification of the project: its files, its strictness, its imports and its output.',
        'Читайте tsconfig.json как спецификацию проекта: его файлы, строгость, импорты и вывод.'
      ),
      seeAlso: [
        L('Chapter 8: modules, imports and project structure', 'Глава 8: модули, импорты и структура проекта'),
        L('Section 9-2: the strict family and what each flag buys', 'Секция 9-2: семейство строгих флагов и что даёт каждый'),
        L('Section 9-5: build modes and incremental compilation', 'Секция 9-5: режимы сборки и инкрементальная компиляция'),
      ],
    },
    {
      id: 'ts-ch9-s2',
      title: L('The strict family', 'Семейство строгих флагов'),
      body: L(
        'The option strict is a shortcut for a family of checks that ask the same question in different places: where might this value be wrong? Turning it on for a codebase written without it produces a long list of errors, and the list is the point. Every entry in it names a place where the code assumes something the compiler cannot prove, usually that a value exists, that a parameter has a type, or that a property was assigned.\n\nThe members of the family fall into three groups. The first covers missing information and missing values. noImplicitAny refuses a parameter or a variable that has no type and no inferable initialiser, so an untyped callback parameter must be declared. strictNullChecks makes null and undefined part of every type, so a value that may be missing has to be checked before it is used. useUnknownInCatchVariables types the caught value as unknown instead of any, which forces the same narrowing at the edge of the program.\n\nThe second group is about functions and classes. strictFunctionTypes checks parameters contravariantly, so a handler that wants a narrower parameter type is rejected where it used to be accepted. strictBindCallApply type-checks bind, call and apply against the function they are applied to. strictPropertyInitialization rejects a class field that is not definitely assigned in the constructor, which is what catches the half-built object that reaches a method call.\n\nThe last group covers the emitted code and the meaning of this: alwaysStrict makes the output run in strict mode, noImplicitThis rejects an untyped this, and strictBuiltinIteratorReturn checks the built-in iterator helpers for a consistent return type. Strictness is not a switch between good and bad code but a budget. The cost is paid once, when the flag is turned on, and after that the compiler keeps paying it for you: the check that a value is present is made once, in the type, instead of at every call site.',
        'Параметр strict — это сокращение для семейства проверок, которые задают один и тот же вопрос в разных местах: где это значение может оказаться неправильным? Включение флага для кодовой базы, написанной без него, даёт длинный список ошибок, и в этом весь смысл. Каждая запись в списке указывает на место, где код предполагает то, что компилятор доказать не может: что значение существует, что у параметра есть тип или что свойству было что-то присвоено.\n\nЧлены семейства делятся на три группы. Первая отвечает за недостающую информацию и недостающие значения. noImplicitAny отвергает параметр или переменную без типа и без выводимого инициализатора, поэтому неаннотированный параметр колбэка приходится объявлять. strictNullChecks делает null и undefined частью каждого типа, поэтому значение, которого может не быть, нужно проверить перед использованием. useUnknownInCatchVariables типизирует перехваченное значение как unknown, а не any, и тем самым требует того же сужения на границе программы.\n\nВторая группа касается функций и классов. strictFunctionTypes проверяет параметры contravariantно, поэтому обработчик, которому нужен более узкий тип параметра, отвергается там, где раньше принимался. strictBindCallApply проверяет bind, call и apply по типу функции, к которой их применяют. strictPropertyInitialization отвергает поле класса, которому в конструкторе не назначили значение наверняка, — именно это ловит недостроенный объект, дошедший до вызова метода.\n\nПоследняя группа отвечает за итоговый код и за смысл this: alwaysStrict заставляет вывод выполняться в строгом режиме, noImplicitThis отвергает нетипизированный this, а strictBuiltinIteratorReturn проверяет встроенные помощники итераторов на согласованный тип возврата. Строгость — это не переключатель между хорошим и плохим кодом, а бюджет. Цена платится один раз, при включении флага, а дальше компилятор платит её за вас: проверка того, что значение есть, делается один раз, в типе, а не в каждом месте вызова.'
      ),
      bullets: [
        L('strict turns on noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, useUnknownInCatchVariables, alwaysStrict and noImplicitThis.', 'strict включает noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, useUnknownInCatchVariables, alwaysStrict и noImplicitThis.'),
        L('strictNullChecks is the expensive flag: null and undefined enter every type.', 'strictNullChecks — самый дорогой флаг: null и undefined входят в каждый тип.'),
        L('strictFunctionTypes rejects a callback that demands a narrower parameter type.', 'strictFunctionTypes отвергает колбэк, требующий более узкого типа параметра.'),
        L('strictPropertyInitialization catches a class field that was never assigned.', 'strictPropertyInitialization ловит поле класса, которому так и не назначили значение.'),
        L('useUnknownInCatchVariables makes the caught value unknown, so it must be narrowed.', 'useUnknownInCatchVariables делает перехваченное значение unknown, и его нужно сузить.'),
        L('The price of strict is paid once, when the flag is turned on.', 'Цена строгого режима платится один раз — при включении флага.'),
      ],
      code: `interface User { id: string; name: string; }

const users: User[] = [{ id: '1', name: 'Ada' }];

function findUser(id: string): User | null {
  return users.find((user) => user.id === id) ?? null;
}

function greet(user: User | null): string {
  if (user === null) {
    return 'guest';        // strictNullChecks forces the check
  }
  return user.name;        // narrowed to User here
}

try {
  greet(null);
} catch (error) {
  // useUnknownInCatchVariables: error is unknown, not any
  console.log(error instanceof Error ? error.message : String(error));
}`,
      table: {
        caption: L('What each strict flag forbids', 'Что запрещает каждый строгий флаг'),
        headers: [
          L('Flag', 'Флаг'),
          L('It rejects', 'Отвергает'),
          L('It catches', 'Ловит'),
        ],
        rows: [
          [
            L('noImplicitAny', 'noImplicitAny'),
            L('A parameter or variable with no inferable type', 'Параметр или переменную без выводимого типа'),
            L('A callback parameter silently typed as any', 'Параметр колбэка, молча ставший any'),
          ],
          [
            L('strictNullChecks', 'strictNullChecks'),
            L('Using a value that may be null or undefined', 'Использование значения, которое может быть null или undefined'),
            L('Reading a property of a missing value', 'Чтение свойства отсутствующего значения'),
          ],
          [
            L('strictFunctionTypes', 'strictFunctionTypes'),
            L('A callback whose parameter type is narrower', 'Колбэк, у которого тип параметра уже'),
            L('A handler that would receive the wrong shape', 'Обработчик, которому достанется не та форма данных'),
          ],
          [
            L('strictPropertyInitialization', 'strictPropertyInitialization'),
            L('A class field not assigned in the constructor', 'Поле класса, не присвоенное в конструкторе'),
            L('A half-built object used after construction', 'Недостроенный объект, использованный после создания'),
          ],
          [
            L('useUnknownInCatchVariables', 'useUnknownInCatchVariables'),
            L('Using the caught value without narrowing', 'Использование перехваченного значения без сужения'),
            L('A property read on an unknown error', 'Чтение свойства у неизвестной ошибки'),
          ],
          [
            L('alwaysStrict', 'alwaysStrict'),
            L('Output that would run outside strict mode', 'Вывод, который выполнялся бы вне строгого режима'),
            L('Silent failures of assignment to a frozen object', 'Молчаливые сбои присваивания в замороженный объект'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A non-null assertion is not a fix', 'Ненулевое утверждение — не решение'),
          text: L(
            'The exclamation mark removes the check on one value and on everything computed from it, and the crash it prevented now happens in the browser. When a value really can be missing, model that in the type and handle the missing case; the assertion only hides it from the compiler, not from the runtime.',
            'Восклицательный знак снимает проверку с одного значения и со всего, что из него вычислено, а падение, которого он предотвращал, теперь случается в браузере. Если значения действительно может не быть, отразите это в типе и обработайте случай отсутствия: утверждение прячет его только от компилятора, но не от рантайма.'
          ),
        },
        {
          tone: 'tip',
          title: L('Adopt strict package by package', 'Включайте strict по пакетам'),
          text: L(
            'Turning the flag on for a whole legacy codebase at once produces a diff nobody can review. Enable it in one package, fix the errors there without any and without non-null assertions, and repeat. Every package then becomes a place where the strictness question is already settled.',
            'Включение флага сразу на всей старой кодовой базе даёт diff, который никто не разберёт. Включите его в одном пакете, исправьте ошибки там без any и без ненулевых утверждений и повторите. Каждый пакет после этого становится местом, где вопрос о строгости уже решён.'
          ),
        },
      ],
      takeaway: L(
        'Turn strict on, pay the cost once, and never silence its errors with any or a non-null assertion.',
        'Включите strict, заплатите за это один раз и не заглушайте его ошибки через any или ненулевое утверждение.'
      ),
      seeAlso: [
        L('Section 9-3: noUncheckedIndexedAccess and exactOptionalPropertyTypes', 'Секция 9-3: noUncheckedIndexedAccess и exactOptionalPropertyTypes'),
        L('Section 2-3: control flow analysis and exhaustiveness', 'Секция 2-3: анализ потока управления и проверка полноты'),
        L('Chapter 1: what TypeScript adds and what it erases', 'Глава 1: что TypeScript добавляет и что стирает'),
      ],
    },
    {
      id: 'ts-ch9-s3',
      title: L('noUncheckedIndexedAccess and exactOptionalPropertyTypes', 'noUncheckedIndexedAccess и exactOptionalPropertyTypes'),
      body: L(
        'Two flags that are not part of strict, because they change the meaning of types you already wrote instead of adding a new check. noUncheckedIndexedAccess says that reading a key which may not exist produces a value that may be undefined. In JavaScript, arr[0] on an empty array is undefined and record[key] for a missing key is undefined, and the flag makes the type say the same thing as the runtime does.\n\nThe flag does not touch tuples, because a tuple carries its length in the type: tuple[0] of a [string, number] is a string whether the flag is on or off. It applies to arrays, to index signatures and to Record types. The cost is a check at every read of an index; the benefit is that the empty case stops being a runtime surprise and becomes visible at the place where it happens.\n\nexactOptionalPropertyTypes draws a line between a property that is absent and a property whose value is undefined. Without the flag, an optional property label?: string means label: string | undefined, and writing { label: undefined } is accepted. With the flag it means the key may be missing, and writing { label: undefined } is an error unless the type says label?: string | undefined explicitly. The difference matters wherever the presence of a key is observed, not only its value.\n\nBoth flags are fixed in the same way: describe the difference in the type. For an index read, check the value before using it or route it through a helper that returns a defined value or throws. For an optional property, either declare that undefined is a meaningful value, or build the object so the key is absent. A type that says a value may be missing is not an obstacle to writing correct code; it is the part of the code that says where the missing case is handled.',
        'Два флага, не входящих в strict, потому что они меняют смысл уже написанных типов, а не добавляют новую проверку. noUncheckedIndexedAccess говорит, что чтение ключа, которого может не быть, даёт значение, которого может не быть. В JavaScript arr[0] у пустого массива это undefined, а record[key] для отсутствующего ключа тоже undefined, и флаг заставляет тип говорить то же самое, что говорит рантайм.\n\nФлаг не трогает кортежи, потому что кортеж несёт свою длину в типе: tuple[0] у [string, number] это строка независимо от флага. Он действует на массивы, на сигнатуры индекса и на типы Record. Цена — проверка при каждом чтении по индексу; выгода — пустой случай перестаёт быть сюрпризом рантайма и становится видимым там, где происходит.\n\nexactOptionalPropertyTypes проводит границу между отсутствующим свойством и свойством со значением undefined. Без флага необязательное свойство label?: string означает label: string | undefined, и запись { label: undefined } принимается. С флагом оно означает, что ключ может отсутствовать, и запись { label: undefined } становится ошибкой, если тип явно не говорит label?: string | undefined. Разница важна везде, где наблюдается само наличие ключа, а не только его значение.\n\nОба флага чинятся одинаково: опишите разницу в типе. Для чтения по индексу проверьте значение перед использованием или пропустите его через помощник, который возвращает определённое значение либо бросает исключение. Для необязательного свойства либо объявите, что undefined — осмысленное значение, либо собирайте объект так, чтобы ключ отсутствовал. Тип, который говорит, что значения может не быть, — это не препятствие для правильного кода; это часть кода, которая говорит, где обрабатывается случай отсутствия.'
      ),
      bullets: [
        L('noUncheckedIndexedAccess adds undefined to array and dictionary reads.', 'noUncheckedIndexedAccess добавляет undefined к чтению из массива и словаря.'),
        L('Tuple indices stay typed because the length is part of the type.', 'Индексы кортежей остаются типизированными, потому что длина входит в тип.'),
        L('exactOptionalPropertyTypes separates a missing key from an undefined value.', 'exactOptionalPropertyTypes отделяет отсутствующий ключ от значения undefined.'),
        L('Without the flag an optional property accepts an explicit undefined.', 'Без флага необязательное свойство принимает явный undefined.'),
        L('Neither flag is included in strict.', 'Ни один из этих флагов не входит в strict.'),
      ],
      code: `const names: string[] = [];
const first = names[0];            // string | undefined with noUncheckedIndexedAccess

const counts: Record<string, number> = {};
const total = counts['items'];     // number | undefined

interface Options {
  label?: string;
}

const empty: Options = {};                      // the key is absent
const broken: Options = { label: undefined };   // ERROR: exactOptionalPropertyTypes
const fine: Options = { label: 'Save' };        // still fine`,
      table: {
        caption: L('The same expressions with and without the flags', 'Те же выражения с флагами и без них'),
        headers: [
          L('Expression', 'Выражение'),
          L('Default', 'По умолчанию'),
          L('With the flag', 'С флагом'),
        ],
        rows: [
          [
            L('names[0] where names is string[]', 'names[0], где names это string[]'),
            L('string', 'string'),
            L('string | undefined', 'string | undefined'),
          ],
          [
            L('counts["items"] where counts is Record<string, number>', 'counts["items"], где counts это Record<string, number>'),
            L('number', 'number'),
            L('number | undefined', 'number | undefined'),
          ],
          [
            L('tuple[0] where tuple is [string, number]', 'tuple[0], где tuple это [string, number]'),
            L('string', 'string'),
            L('string, unchanged', 'string, без изменений'),
          ],
          [
            L('{ label: undefined } for { label?: string }', '{ label: undefined } для { label?: string }'),
            L('accepted', 'допустимо'),
            L('error TS2375', 'ошибка TS2375'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Absent is not the same as undefined', 'Отсутствие — это не undefined'),
          text: L(
            'Assigning undefined explicitly leaves the key in the object, and spreading the object forwards that key to whatever receives it. Code that asks whether the property is in the object sees it, and code that counts the keys counts it. Delete the key instead, or build the object conditionally.',
            'Явное присваивание undefined оставляет ключ в объекте, и разворачивание объекта передаёт этот ключ дальше. Код, спрашивающий, есть ли свойство в объекте, увидит его, и код, считающий ключи, посчитает его. Удаляйте ключ или собирайте объект условием.'
          ),
        },
        {
          tone: 'tip',
          title: L('Turn them on one package at a time', 'Включайте их по одному пакету'),
          text: L(
            'Both flags produce a burst of errors on old code, most of them on a single line per file. Enable the flag for one package, fix the reads that can actually be empty, and let the compiler keep the rest honest from then on.',
            'Оба флага вызывают волну ошибок на старом коде, чаще всего по одной строке в файле. Включите флаг для одного пакета, исправьте чтения, которые действительно могут быть пустыми, и дальше пусть компилятор следит за остальным.'
          ),
        },
      ],
      takeaway: L(
        'Read an index access as a value that may be missing and an optional property as a key that may be absent.',
        'Читайте обращение по индексу как значение, которого может не быть, а необязательное свойство — как ключ, который может отсутствовать.'
      ),
      seeAlso: [
        L('Section 3-2: optional properties and exactOptionalPropertyTypes', 'Секция 3-2: необязательные свойства и exactOptionalPropertyTypes'),
        L('Section 9-2: the strict family', 'Секция 9-2: семейство строгих флагов'),
        L('Section 6-2: parsing at the boundary', 'Секция 6-2: разбор данных на границе'),
      ],
    },
    {
      id: 'ts-ch9-s4',
      title: L('Path aliases and project references', 'Указатели пути и ссылки на проект'),
      body: L(
        'A path alias maps a bare specifier to a directory: importing api from @app/api points at src/app/api without a chain of ../../../ that relative paths force. The mapping lives in compilerOptions.paths as a list of patterns and their targets, and the entries are resolved relative to the configuration file that declares them. The alias is a compiler-level instruction only, which is why an editor that resolves it happily can sit next to a build that fails on the same import.\n\nThe option moduleResolution decides how a specifier becomes a file. Node16 and NodeNext follow the rules of the runtime you deploy to and want explicit extensions in relative imports. Bundler allows the extensionless relative imports that Vite and webpack use. Classic is the old algorithm and has no place in a new project. An alias is resolved before the node_modules lookup, so it works with any of these modes as long as the target file exists.\n\nThe option baseUrl used to be the anchor for every non-relative import, and it changed the meaning of all of them at once: a bare specifier that matched no alias was looked up inside that directory. TypeScript 6 reports the option as deprecated and refuses to build until it is removed or explicitly accepted, and nothing is lost by removing it, because paths works on its own and is resolved relative to the configuration file. Keep the alias patterns in one place and give the bundler the same mapping.\n\nProject references go one level higher. Instead of aliasing a path, a project declares that it depends on another project, and the build system compiles them in the right order. The referenced project must set composite, must not disable emit, and produces the declaration files that the consumer type-checks against. The consumer never reads the sources of the dependency, so the package boundary becomes a real boundary: a file that is not exported from the referenced project cannot be imported, no matter how the paths are written.',
        'Указатель пути сопоставляет безотносительный спецификатор с каталогом: импорт api из @app/api указывает на src/app/api без цепочки ../../../, которую вынуждают относительные пути. Отображение живёт в compilerOptions.paths как список шаблонов и их целей, а записи разрешаются относительно файла конфигурации, где они объявлены. Указатель — это инструкция только для компилятора, и поэтому редактор, который разрешает её без проблем, может соседствовать со сборкой, падающей на том же импорте.\n\nПараметр moduleResolution решает, как спецификатор превращается в файл. Node16 и NodeNext следуют правилам рантайма, в который вы деплоите, и хотят явные расширения в относительных импортах. Bundler допускает относительные импорты без расширений, как их делают Vite и webpack. Classic — это старый алгоритм, и в новом проекте ему не место. Указатель разрешается до обращения к node_modules, поэтому он работает при любом из этих режимов, пока целевой файл существует.\n\nПараметр baseUrl раньше служил якорем для каждого безотносительного импорта и менял смысл их всех разом: спецификатор, не совпавший ни с одним указателем, искался внутри этого каталога. TypeScript 6 объявляет параметр устаревшим и отказывается собирать проект, пока он не удалён или явно не принят, а терять тут нечего: paths работает и сам по себе, разрешаясь относительно файла конфигурации. Держите шаблоны указателей в одном месте и дайте сборщику то же отображение.\n\nСсылки на проект поднимаются на уровень выше. Вместо указания пути проект объявляет, что зависит от другого проекта, а система сборки компилирует их в правильном порядке. У ссылочного проекта должен быть включён composite, он не может отключать вывод и он порождает файлы деклараций, по которым проверяется потребитель. Потребитель никогда не читает исходники зависимости, поэтому граница пакета становится настоящей границей: файл, который не экспортирован из ссылочного проекта, импортировать нельзя, как бы ни были написаны пути.'
      ),
      bullets: [
        L('paths maps a bare specifier to files and is resolved relative to the declaring config.', 'paths сопоставляет безотносительный спецификатор с файлами и разрешается относительно конфигурации, где он объявлен.'),
        L('The bundler does not read tsconfig paths, it needs the same mapping separately.', 'Сборщик не читает paths из tsconfig, ему нужно то же отображение отдельно.'),
        L('baseUrl is deprecated in TypeScript 6 and changes the meaning of every bare import.', 'baseUrl объявлен устаревшим в TypeScript 6 и меняет смысл каждого безотносительного импорта.'),
        L('moduleResolution picks the algorithm: Node16, NodeNext, Bundler or Classic.', 'moduleResolution выбирает алгоритм: Node16, NodeNext, Bundler или Classic.'),
        L('A referenced project needs composite and must not disable emit.', 'У ссылочного проекта должен быть composite, и он не может отключать вывод.'),
        L('The consumer is checked against the emitted declarations of the dependency.', 'Потребитель проверяется по декларациям, которые сгенерировал зависимый проект.'),
      ],
      code: `{
  "compilerOptions": {
    // the bundler and the runtime need the same alias configured separately
    "moduleResolution": "bundler",
    "paths": {
      "@app/*": ["src/app/*"],
      "@shared/*": ["../shared/src/*"]
    }
  },
  "include": ["src"],
  // the referenced project must set composite and must emit declarations
  "references": [{ "path": "../shared" }]
}`,
      table: {
        caption: L('Resolution modes and when to use them', 'Режимы разрешения и когда какой нужен'),
        headers: [
          L('Mode', 'Режим'),
          L('How it resolves', 'Как разрешает'),
          L('Use it when', 'Когда нужен'),
        ],
        rows: [
          [
            L('Node16', 'Node16'),
            L('Node rules, explicit extensions in relative imports', 'Правила Node, явные расширения в относительных импортах'),
            L('The code runs on Node with ES modules', 'Код выполняется на Node с ES-модулями'),
          ],
          [
            L('NodeNext', 'NodeNext'),
            L('Node rules of the current release', 'Правила Node текущего релиза'),
            L('The package must work on any Node version', 'Пакет должен работать на любой версии Node'),
          ],
          [
            L('Bundler', 'Bundler'),
            L('Extensionless relative imports, bundler style', 'Относительные импорты без расширений, как у сборщиков'),
            L('Vite, webpack or another bundler runs the code', 'Код собирает Vite, webpack или другой сборщик'),
          ],
          [
            L('Classic', 'Classic'),
            L('The legacy node_modules walk', 'Старый обход node_modules'),
            L('Nothing new, it exists for old setups', 'Для новых проектов не нужен'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The editor resolves, the bundler does not', 'Редактор разрешает, сборщик — нет'),
          text: L(
            'Vite does not read the paths of tsconfig by default, so an alias can work in the editor and fail in the dev server. Either configure the alias in the bundler or add the plugin that copies the mapping from tsconfig, and check that the test runner and the storybook use the same one.',
            'Vite по умолчанию не читает paths из tsconfig, поэтому указатель пути может работать в редакторе и падать в dev-сервере. Либо опишите указатель в сборщике, либо подключите плагин, который берёт отображение из tsconfig, и проверьте, что тестовый раннер и storybook используют то же самое.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A dependency must be built before it is consumed', 'Зависимость нужно собрать до использования'),
          text: L(
            'A project that references another one type-checks against the emitted declarations, not against the sources. If the dependency was not built, the compiler reports that the output file has not been built from the source file. The build mode of tsc builds the graph in order and removes the problem.',
            'Проект, ссылающийся на другой, проверяется по сгенерированным декларациям, а не по исходникам. Если зависимость не собрана, компилятор сообщает, что выходной файл не был собран из исходного. Режим сборки tsc обходит граф по порядку и снимает проблему.'
          ),
        },
      ],
      takeaway: L(
        'Keep aliases in paths, give the bundler the same mapping and let references define the real package boundaries.',
        'Держите указатели пути в paths, продублируйте отображение в сборщике, а границы пакетов задавайте ссылками на проект.'
      ),
      seeAlso: [
        L('Section 8-1: ES modules and module resolution', 'Секция 8-1: ES-модули и разрешение модулей'),
        L('Section 9-5: build modes and incremental compilation', 'Секция 9-5: режимы сборки и инкрементальная компиляция'),
        L('Chapter 8: modules, imports and project structure', 'Глава 8: модули, импорты и структура проекта'),
      ],
    },
    {
      id: 'ts-ch9-s5',
      title: L('Build modes and incremental compilation', 'Режимы сборки и инкрементальная компиляция'),
      body: L(
        'The compiler has two modes. tsc with a project flag compiles that one project and stops. tsc -b runs in build mode: it walks the graph of referenced projects, builds them in dependency order, and skips the ones whose outputs are already up to date. Build mode is the mode that understands project references, and it is the mode a monorepo needs.\n\nIncremental compilation is what makes build mode cheap. With incremental or composite enabled, the compiler writes a build info file that records the compiler version, the file list and the state it has seen. On the next run it re-checks only what changed and reuses the previous output for everything else. The cache is invalidated when the compiler version changes, when the options change or when an input changes, so a stale cache costs time but never correctness.\n\nThe options declaration and declarationMap decide what the build publishes. declaration emits the .d.ts files that a library ships and that a consuming project reads under project references. declarationMap adds a mapping from the declaration back to the original source, so a consumer can jump to the implementation. Both need somewhere to write, which is why a referenced project cannot disable emit: the compiler rejects that with an error saying a referenced project may not disable emit.\n\nIn continuous integration, run tsc -b rather than a separate tsc -p per package. Build mode orders the projects, reuses the cache when the CI cache restores the build info files, and stops at the first broken project with a clear reference to it. For the local loop, tsc -b --watch rebuilds the affected projects as files change. The editor needs no build at all: the language service type-checks continuously and shows the same errors the build would.',
        'У компилятора два режима. tsc с флагом проекта компилирует этот один проект и останавливается. tsc -b работает в режиме сборки: обходит граф ссылочных проектов, строит их в порядке зависимостей и пропускает те, у которых вывод уже актуален. Режим сборки понимает ссылки на проекты, и именно он нужен монорепозиторию.\n\nИнкрементальная компиляция делает режим сборки дешёвым. При включённых incremental или composite компилятор записывает файл состояния, где хранит версию компилятора, список файлов и то, что он уже видел. При следующем запуске он перепроверяет только изменившееся и переиспользует прежний вывод для всего остального. Кэш сбрасывается, когда меняется версия компилятора, меняются параметры или меняется входной файл, поэтому устаревший кэш стоит времени, но не правильности.\n\nПараметры declaration и declarationMap решают, что публикует сборка. declaration генерирует файлы .d.ts, которые библиотека отдаёт наружу и которые читает потребитель при ссылках на проект. declarationMap добавляет отображение от декларации обратно к исходному коду, так что потребитель может перейти к реализации. Обоим нужно место для записи, и поэтому ссылочный проект не может отключать вывод: компилятор отвергает это ошибкой о том, что ссылочный проект не может отключать вывод.\n\nВ непрерывной интеграции запускайте tsc -b, а не отдельный tsc -p на каждый пакет. Режим сборки упорядочивает проекты, переиспользует кэш, когда CI восстанавливает файлы состояния, и останавливается на первом сломанном проекте с понятной ссылкой на него. Для локального цикла tsc -b --watch пересобирает затронутые проекты по мере изменения файлов. Редактору сборка вообще не нужна: языковая служба проверяет типы непрерывно и показывает те же ошибки, что показала бы сборка.'
      ),
      bullets: [
        L('tsc -p compiles one project, tsc -b walks the reference graph in dependency order.', 'tsc -p компилирует один проект, tsc -b обходит граф ссылок в порядке зависимостей.'),
        L('incremental and composite write a build info file with the state of the last run.', 'incremental и composite записывают файл состояния последней сборки.'),
        L('The cache is invalidated by a compiler upgrade, changed options or changed inputs.', 'Кэш сбрасывается при смене версии компилятора, изменении параметров или входных файлов.'),
        L('declaration emits the type declarations, declarationMap points back at the sources.', 'declaration генерирует декларации типов, declarationMap связывает их с исходниками.'),
        L('A referenced project must not disable emit.', 'Ссылочный проект не может отключать вывод.'),
        L('CI should run tsc -b, and tsc -b --watch covers the local loop.', 'В CI стоит запускать tsc -b, а tsc -b --watch покрывает локальную разработку.'),
      ],
      code: `{
  "compilerOptions": {
    // composite implies declaration output and incremental compilation
    "composite": true,
    "declarationMap": true,
    "outDir": "dist",
    // the build cache lives next to the outputs
    "tsBuildInfoFile": "dist/tsconfig.tsbuildinfo"
  },
  "include": ["src"]
}`,
      table: {
        caption: L('Build commands and what each one is for', 'Команды сборки и для чего каждая нужна'),
        headers: [
          L('Command', 'Команда'),
          L('What it does', 'Что делает'),
          L('Use it for', 'Для чего'),
        ],
        rows: [
          [
            L('tsc -p tsconfig.json', 'tsc -p tsconfig.json'),
            L('Compiles one project and ignores the reference graph', 'Компилирует один проект и игнорирует граф ссылок'),
            L('A single package', 'Один отдельный пакет'),
          ],
          [
            L('tsc -b', 'tsc -b'),
            L('Builds referenced projects in order, skipping up-to-date ones', 'Собирает ссылочные проекты по порядку, пропуская готовые'),
            L('CI and monorepos', 'CI и монорепозиторий'),
          ],
          [
            L('tsc -b --watch', 'tsc -b --watch'),
            L('Rebuilds the affected projects when a file changes', 'Пересобирает затронутые проекты при изменении файла'),
            L('Local development', 'Локальная разработка'),
          ],
          [
            L('tsc --noEmit', 'tsc --noEmit'),
            L('Type checks and writes nothing', 'Проверяет типы и ничего не записывает'),
            L('A quick check', 'Быстрая проверка'),
          ],
          [
            L('tsc -b --clean', 'tsc -b --clean'),
            L('Deletes the outputs and the build info files', 'Удаляет вывод и файлы состояния сборки'),
            L('Recovering from a broken cache', 'Восстановление после сломанного кэша'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not build the consumer by hand', 'Не собирайте потребителя вручную'),
          text: L(
            'Running tsc -p on the consuming project before the dependency was built fails with an error about an output file that has not been built from the source file. Build the graph with tsc -b, or build the referenced projects first, and the error disappears.',
            'Запуск tsc -p на проекте-потребителе до сборки зависимости падает с ошибкой про выходной файл, который не был собран из исходного. Собирайте граф через tsc -b или сначала соберите ссылочные проекты — и ошибка исчезнет.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the build info files in CI', 'Храните файлы состояния в CI'),
          text: L(
            'A CI job that restores the build info files between runs does only the work that changed. A job that starts from a clean checkout rebuilds every project, and on a large monorepo that difference is the difference between a minute and ten.',
            'Задача CI, которая восстанавливает файлы состояния между запусками, делает только изменившуюся работу. Задача с чистой копией репозитория пересобирает все проекты, и на большом монорепозитории это разница между минутой и десятью минутами.'
          ),
        },
      ],
      takeaway: L(
        'Run tsc -b in CI and keep the build info files, so both the build order and the cache are correct.',
        'Запускайте tsc -b в CI и сохраняйте файлы состояния сборки — так и порядок сборки, и кэш будут правильными.'
      ),
      seeAlso: [
        L('Section 9-4: path aliases and project references', 'Секция 9-4: указатели пути и ссылки на проект'),
        L('Section 8-3: declaration files and ambient types', 'Секция 8-3: файлы деклараций и внешние типы'),
        L('Chapter 8: modules, imports and project structure', 'Глава 8: модули, импорты и структура проекта'),
      ],
    },
  ],
};
