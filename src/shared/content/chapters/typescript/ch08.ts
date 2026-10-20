import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh08: Chapter = {
  id: 'ts-ch8',
  title: L('Modules, imports and project structure', 'Модули, импорты и структура проекта'),
  summary: L(
    'How the compiler finds the file behind an import specifier, why Node needs explicit extensions, what type-only imports and verbatimModuleSyntax enforce, how declaration files describe code you do not own, and what a barrel costs you.',
    'Как компилятор находит файл по спецификатору импорта, почему Node требует явных расширений, что проверяют импорты только типов и verbatimModuleSyntax, как декларационные файлы описывают чужой код и во что обходится barrel-файл.'
  ),
  sections: [
    {
      id: 'ts-ch8-s1',
      title: L('ES modules and module resolution', 'ES-модули и разрешение модулей'),
      body: L(
        'Two compiler options decide how imports behave, and they are easy to confuse. The module option controls the format of the emitted JavaScript: esnext keeps the import and export syntax, commonjs compiles it into require and exports. The moduleResolution option controls how the compiler finds the file behind an import specifier, and it is the option that decides whether a relative import needs a file extension.\n\nThe bundler mode was written for tools such as Vite and webpack: it allows extensionless relative imports and resolves package entry points the way a bundler does. The node16 and nodenext modes follow the rules of Node itself, and the Node ESM loader requires the full file name, including the extension, in every relative import. The legacy node mode follows the older CommonJS algorithm and matters only for projects that still run on it.\n\nThe reason Node requires the extension is that the specification says so. ESM has no algorithm for guessing a file name, so a specifier like ./models resolves to nothing and the runtime is not allowed to search for candidates. Bundlers do implement that search on the developer behalf, which is why the same source can work in one setup and fail in another.\n\nThe safe rule is to write imports the way Node expects them: the relative path with the extension, and the .js suffix even when the source file is a TypeScript file, because that is what the emitted JavaScript will import. Projects that bundle can relax this, but a project that also runs on Node should not depend on the relaxation.',
        'Поведение импортов задают два параметра компилятора, и их легко перепутать. Параметр module определяет формат итогового JavaScript: esnext сохраняет синтаксис import и export, commonjs превращает его в require и exports. Параметр moduleResolution определяет, как компилятор находит файл по спецификатору импорта, и именно он решает, нужен ли относительному импорту расширение файла.\n\nРежим bundler писался для инструментов вроде Vite и webpack: он разрешает относительные импорты без расширения и ищет точки входа пакетов так, как это делает бандлер. Режимы node16 и nodenext следуют правилам Node, а загрузчик ESM в Node требует полного имени файла вместе с расширением в каждом относительном импорте. Устаревший режим node повторяет старый алгоритм CommonJS и важен только для проектов, которые всё ещё на нём работают.\n\nNode требует расширения потому, что это предписывает спецификация. В ESM нет алгоритма угадывания имени файла, поэтому спецификатор вида ./models не разрешается ни во что, и среда выполнения не имеет права искать кандидатов. Бандлеры такой поиск выполняют за разработчика, и именно поэтому один и тот же исходник работает в одной конфигурации и падает в другой.\n\nБезопасное правило: пишите импорты так, как ждёт Node, — относительный путь с расширением, причём суффикс .js даже когда исходный файл написан на TypeScript, потому что именно это будет импортировать итоговый JavaScript. Проекты со сборкой могут это ослабить, но проект, который ещё и работает на Node, не должен на ослабление полагаться.'
      ),
      bullets: [
        L('module chooses the output format, moduleResolution chooses the lookup algorithm.', 'module выбирает формат вывода, moduleResolution — алгоритм поиска файла.'),
        L('Bundler resolution allows relative imports without an extension.', 'Режим bundler разрешает относительные импорты без расширения.'),
        L('Node16 and nodenext follow the Node ESM rules and require the extension.', 'node16 и nodenext следуют правилам ESM в Node и требуют расширение.'),
        L('The Node ESM loader has no algorithm for guessing a file name.', 'Загрузчик ESM в Node не умеет угадывать имя файла.'),
        L('Write .js in relative imports when the code must also run on Node.', 'Пишите .js в относительных импортах, если код должен работать и на Node.'),
      ],
      code: `// file: models.ts
export interface User {
  id: string;
}

// file: app.ts
// Bundler resolution allows the extensionless form
import { type User } from './models';

// Under Node ESM the same import is written as './models.js'
export function render(user: User): string {
  return user.id;
}`,
      table: {
        caption: L('What each resolution mode allows', 'Что допускает каждый режим разрешения'),
        headers: [L('Mode', 'Режим'), L('Extensionless relative import', 'Относительный импорт без расширения'), L('Follows', 'Следует')],
        rows: [
          [L('bundler', 'bundler'), L('yes', 'да'), L('bundler behaviour', 'поведению бандлера')],
          [L('node16 and nodenext', 'node16 и nodenext'), L('no', 'нет'), L('the Node ESM rules', 'правилам ESM в Node')],
          [L('node', 'node'), L('yes', 'да'), L('the legacy CommonJS algorithm', 'старому алгоритму CommonJS')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The editor and the build must agree', 'Редактор и сборка должны решать одинаково'),
          text: L(
            'Changing the output format and changing the lookup algorithm are different operations, and some combinations imply one another. A project whose editor resolves one set of files while the build resolves another produces errors that only appear in continuous integration.',
            'Смена формата вывода и смена алгоритма поиска — разные операции, и некоторые комбинации подразумевают друг друга. Проект, у которого редактор разрешает один набор файлов, а сборка другой, даёт ошибки, которые видны только в непрерывной интеграции.'
          ),
        },
      ],
      takeaway: L(
        'Write relative imports with the .js extension and keep module and moduleResolution consistent, so the editor and the build resolve the same files.',
        'Пишите относительные импорты с расширением .js и держите module и moduleResolution согласованными, чтобы редактор и сборка разрешали одни и те же файлы.'
      ),
      seeAlso: [
        L('Chapter 9: tsconfig and strictness', 'Глава 9: tsconfig и строгость'),
        L('Section 8-2: type-only imports and verbatimModuleSyntax', 'Секция 8-2: импорты только типов и verbatimModuleSyntax'),
        L('Section 9-4: path aliases and project references', 'Секция 9-4: псевдонимы путей и ссылки на проекты'),
      ],
    },
    {
      id: 'ts-ch8-s2',
      title: L('Type-only imports and verbatimModuleSyntax', 'Импорты только типов и verbatimModuleSyntax'),
      body: L(
        'An import that is used only as a type has no runtime counterpart, so the compiler is free to delete it. That freedom is a problem when a tool has to know which imports are real, and it becomes a bug when the deletion changes what the program does: a module that exists for its side effects, or an import that keeps a value alive. The isolatedModules flag exists to catch the second case, and verbatimModuleSyntax takes the guessing away.\n\nWith verbatimModuleSyntax enabled, the compiler preserves every import exactly as written and refuses to delete it. An import that is used only in type position then has to say so, with import type { User } from "./models" or with the inline form import { type User, DEFAULT_USER } from "./models". Importing a type without the marker is an error, and that is the point: the error appears at the import, not where the missing value is finally noticed.\n\nThe same rule applies to exports. Re-exporting a type with export { User } from "./models" is an error under verbatimModuleSyntax, and the correct form is export type { User } from "./models". This matters for barrels, because a barrel that re-exports types as values pulls them into the runtime graph of every consumer.\n\nThe practical effect is that the compiler stops guessing. Files that are transpiled one by one, such as with esbuild or the type stripping mode of Node, no longer depend on the compiler being able to tell a type from a value across file boundaries. The cost is one extra word in the import statement, and the benefit is that what you read is what runs.',
        'У импорта, который используется только как тип, нет пары во время выполнения, поэтому компилятор вправе его удалить. Эта свобода становится проблемой, когда инструменту нужно знать, какие импорты настоящие, и превращается в баг, когда удаление меняет поведение программы: модуль, существующий ради побочных эффектов, или импорт, удерживающий значение живым. Флаг isolatedModules ловит второй случай, а verbatimModuleSyntax забирает у компилятора право угадывать.\n\nС включённым verbatimModuleSyntax компилятор сохраняет каждый импорт ровно в том виде, в каком он написан, и отказывается его удалять. Импорт, который используется только в позиции типа, обязан сказать об этом сам — либо через import type { User } from "./models", либо через встроенную форму import { type User, DEFAULT_USER } from "./models". Импорт типа без такой пометки становится ошибкой, и в этом весь смысл: ошибка указывает на импорт, а не на то место, где отсутствующее значение наконец заметили.\n\nТо же правило касается экспортов. Реэкспорт типа через export { User } from "./models" при включённом verbatimModuleSyntax — ошибка, а правильная форма — export type { User } from "./models". Для barrel-файлов это важно: barrel, реэкспортирующий типы как значения, втягивает их в граф выполнения каждого потребителя.\n\nПрактический эффект в том, что компилятор перестаёт угадывать. Файлы, которые транслируются по одному, как при работе с esbuild или в режиме удаления типов Node, больше не зависят от способности компилятора отличать тип от значения через границы файлов. Цена — одно лишнее слово в инструкции импорта, а выгода в том, что написанное и выполняемое совпадает.'
      ),
      bullets: [
        L('An import used only as a type may be erased by the compiler.', 'Импорт, используемый только как тип, компилятор может стереть.'),
        L('verbatimModuleSyntax preserves imports exactly as they are written.', 'verbatimModuleSyntax сохраняет импорты ровно в том виде, в каком они написаны.'),
        L('A type-only import must be marked with import type or an inline type modifier.', 'Импорт только типов нужно пометить через import type или встроенный модификатор.'),
        L('Re-exporting a type requires export type under the same flag.', 'Реэкспорт типа требует export type при том же флаге.'),
        L('The error appears at the import instead of at the place where the value was missing.', 'Ошибка указывает на импорт, а не на место, где не хватало значения.'),
      ],
      code: `// file: models.ts
export interface User {
  id: string;
}
export const DEFAULT_USER: User = { id: 'anonymous' };

// file: app.ts
// A type only import is erased at compile time
import type { User } from './models';

// The inline marker keeps a type and a value in one import
import { type User as AppUser, DEFAULT_USER } from './models';

export function label(user: AppUser): string {
  return user.id;
}`,
      table: {
        caption: L('Import forms under verbatimModuleSyntax', 'Формы импортов при включённом verbatimModuleSyntax'),
        headers: [L('Form', 'Форма'), L('Kept in the emitted code', 'Что остаётся в итоговом коде'), L('Usable as a type', 'Годится как тип')],
        rows: [
          [L("import { User } from './models'", "import { User } from './models'"), L('the whole statement', 'вся инструкция'), L('yes, but the compiler complains when only types are used', 'да, но компилятор ругается, если тип используется один')],
          [L("import type { User } from './models'", "import type { User } from './models'"), L('nothing', 'ничего'), L('yes', 'да')],
          [L("import { type User, value } from './models'", "import { type User, value } from './models'"), L('only the value part', 'только часть со значениями'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Types are not values at runtime', 'Типы не существуют во время выполнения'),
          text: L(
            'An import of an interface is removed from the JavaScript today, because the compiler knows it is a type. Under verbatimModuleSyntax that knowledge is gone, so the import has to state what it is, and a forgotten marker becomes a build error instead of a silent difference between the editor and the bundle.',
            'Импорт интерфейса сегодня исчезает из JavaScript, потому что компилятор знает, что это тип. При включённом verbatimModuleSyntax этого знания нет, поэтому импорт обязан указать, чем он является, и забытая пометка становится ошибкой сборки вместо тихого расхождения между редактором и бандлом.'
          ),
        },
      ],
      takeaway: L(
        'Mark type-only imports and exports explicitly, because verbatimModuleSyntax stops the compiler from erasing them behind your back.',
        'Помечайте импорты и экспорты только типов явно, потому что verbatimModuleSyntax запрещает компилятору стирать их за вашей спиной.'
      ),
      seeAlso: [
        L('Section 8-1: ES modules and module resolution', 'Секция 8-1: ES-модули и разрешение модулей'),
        L('Section 8-4: barrels and their cost', 'Секция 8-4: barrel-файлы и их цена'),
        L('Chapter 9: tsconfig and strictness', 'Глава 9: tsconfig и строгость'),
      ],
    },
    {
      id: 'ts-ch8-s3',
      title: L('Declaration files and ambient types', 'Декларационные файлы и объявления окружения'),
      body: L(
        'A declaration file describes a shape without describing an implementation. The extension .d.ts marks it as ambient: every declaration inside it is a promise about code that exists somewhere else, either JavaScript that was never typed or a package with no types at all. Nothing is emitted for a declaration file, and the compiler reads it only to check the code that uses it.\n\nInside a declaration file, declare module "legacy-sdk" introduces an ambient module: a module the compiler has never seen on disk but will accept when it is imported by name. This is how you describe a global library loaded by a script tag, a CommonJS package with an unusual entry point or a module that exists only in the browser at runtime. declare global does the same for the global scope, and it is only allowed inside a module.\n\nMost of the time the declaration file already exists. The DefinitelyTyped project publishes @types packages that ship exactly these declarations for thousands of libraries, and the compiler picks them up automatically from node_modules. Adding a dependency on @types/lodash is how a JavaScript library gets a type without touching its own source.\n\nYou need a declaration file of your own when the published types are wrong, when they are missing for a small internal module, or when you want to type a global that your own code sets up. Keep it minimal and honest: declare only what you actually use, and never declare a module whose real types you could simply install, because a hand-written declaration will drift away from the code it claims to describe.',
        'Декларационный файл описывает форму, не описывая реализацию. Расширение .d.ts помечает его как объявление окружения: каждое объявление внутри — обещание о коде, который существует где-то ещё, будь то нетипизированный JavaScript или пакет без типов. Для декларационного файла ничего не выдаётся, а компилятор читает его, только чтобы проверить использующий код.\n\nВнутри декларационного файла declare module "legacy-sdk" вводит объявление окружения для модуля: модуля, которого компилятор никогда не видел на диске, но который он примет при импорте по имени. Так описывают глобальную библиотеку, подключённую тегом script, пакет CommonJS с необычной точкой входа или модуль, существующий только в браузере во время выполнения. declare global делает то же для глобальной области, и ему разрешено только внутри модуля.\n\nЧаще всего декларационный файл уже существует. Проект DefinitelyTyped публикует пакеты @types с такими же объявлениями для тысяч библиотек, и компилятор подхватывает их автоматически из node_modules. Зависимость от @types/lodash — это и есть способ дать тип JavaScript-библиотеке, не трогая её исходники.\n\nСобственный декларационный файл нужен, когда опубликованные типы ошибочны, когда их нет для небольшого внутреннего модуля или когда нужно типизировать глобальное значение, которое устанавливает ваш собственный код. Держите его минимальным и честным: объявляйте только то, что действительно используете, и никогда не объявляйте модуль, настоящие типы которого можно просто установить, потому что написанный вручную файл разъедется с кодом, который он описывает.'
      ),
      bullets: [
        L('A .d.ts file describes shapes and emits nothing.', 'Файл .d.ts описывает формы и ничего не выдаёт.'),
        L('declare module names a module that has no types on disk.', 'declare module называет модуль, у которого нет типов на диске.'),
        L('declare global is only allowed inside a module.', 'declare global разрешён только внутри модуля.'),
        L('@types packages supply declarations for untyped libraries.', 'Пакеты @types дают объявления для библиотек без типов.'),
        L('A hand written declaration drifts away from the code it describes.', 'Написанный вручную файл объявлений разъезжается с описываемым кодом.'),
      ],
      code: `// file: legacy-sdk.d.ts
// An ambient module for a library that ships no types
declare module 'legacy-sdk' {
  export function send(payload: string): Promise<void>;
  export const VERSION: string;
}

// file: globals.d.ts
export {};

// Augmenting the global scope from inside a module
declare global {
  interface Window {
    __APP_VERSION__: string;
  }
}`,
      table: {
        caption: L('What each declaration describes', 'Что описывает каждое объявление'),
        headers: [L('Form', 'Форма'), L('Describes', 'Описывает'), L('Needs a module file', 'Нужен файл-модуль')],
        rows: [
          [L("declare module 'x'", "declare module 'x'"), L('a module without types on disk', 'модуль без типов на диске'), L('no', 'нет')],
          [L('declare global', 'declare global'), L('the global scope', 'глобальную область'), L('yes', 'да')],
          [L('declare const x: T', 'declare const x: T'), L('a value that exists at runtime', 'значение, существующее во время выполнения'), L('no', 'нет')],
          [L('export declare function f(): T', 'export declare function f(): T'), L('the shape of an exported function', 'форму экспортируемой функции'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('declare does not create anything', 'declare ничего не создаёт'),
          text: L(
            'Every declaration in a declaration file is a promise. If the value does not exist at runtime, the program compiles and then fails when the value is used, so an ambient declaration for a global has to match what the script really puts on the window.',
            'Каждое объявление в декларационном файле — обещание. Если значения нет во время выполнения, программа компилируется и падает при обращении к значению, поэтому объявление окружения для глобальной переменной должно совпадать с тем, что скрипт действительно кладёт в окно.'
          ),
        },
      ],
      takeaway: L(
        'Use an ambient declaration only for code you cannot change, and describe exactly what that code really exports.',
        'Используйте объявление окружения только для кода, который вы не можете изменить, и описывайте ровно то, что этот код действительно экспортирует.'
      ),
      seeAlso: [
        L('Section 8-4: barrels and their cost', 'Секция 8-4: barrel-файлы и их цена'),
        L('Section 10-5: typing untyped dependencies', 'Секция 10-5: типизация зависимостей без типов'),
        L('Chapter 9: tsconfig and strictness', 'Глава 9: tsconfig и строгость'),
      ],
    },
    {
      id: 'ts-ch8-s4',
      title: L('Barrels and their cost', 'Barrel-файлы и их цена'),
      body: L(
        'A barrel is a module whose only job is to re-export other modules. An index.ts that pulls in user.ts, order.ts and payment.ts and re-exports them gives the rest of the codebase one place to import from, and it makes the public surface of a feature obvious: everything that is not re-exported stays private to the folder.\n\nThe cost shows up in the import graph. A barrel makes every module depend on the barrel, and the barrel depends on all of them, so a change anywhere in the folder invalidates the barrel and everything that imports it. In a large project this is the difference between a rebuild that takes seconds and one that takes minutes, and it is why a barrel in a hot path is a frequent cause of slow incremental builds.\n\nThe other cost is circular imports. If a module imports from the barrel and the barrel re-exports that module, the two depend on each other, and depending on which values are read while the modules evaluate, one of them can observe an uninitialised value. The cycle is easy to create by accident, because the barrel looks like a neutral place to import from, and it is hard to see because the cycle spans several files.\n\nTree shaking is the third argument, and the honest version of it is this: a barrel does not automatically break tree shaking, because bundlers can analyse a re-export chain, but it does give the bundler more work and more ways to fail, especially when a re-exported module has side effects or when the package ends up going through a CommonJS interop path. Importing from the source file directly keeps the graph minimal and the behaviour predictable.',
        'Barrel — это модуль, единственная работа которого — переэкспортировать другие модули. Файл index.ts, который подтягивает user.ts, order.ts и payment.ts и экспортирует их заново, даёт всему остальному коду одно место для импорта и делает публичную поверхность функции очевидной: всё, что не переэкспортировано, остаётся приватным внутри папки.\n\nЦена видна в графе импортов. Barrel заставляет каждый модуль зависеть от barrel, а barrel зависит от всех них, поэтому изменение в любом месте папки инвалидирует и barrel, и всё, что его импортирует. В большом проекте это разница между пересборкой за секунды и за минуты, и поэтому barrel на горячем пути — частая причина медленных инкрементальных сборок.\n\nВторая цена — циклические импорты. Если модуль импортирует из barrel, а barrel переэкспортирует этот модуль, они зависят друг от друга, и в зависимости от того, какие значения читаются во время вычисления модулей, один из них может увидеть неинициализированное значение. Цикл легко создать по неосторожности, потому что barrel выглядит нейтральным местом для импорта, и трудно заметить, потому что он тянется через несколько файлов.\n\nТретий аргумент — удаление неиспользуемого кода, и честная его версия звучит так: barrel сам по себе не ломает эту оптимизацию, потому что бандлер умеет анализировать цепочки переэкспорта, но он даёт бандлеру больше работы и больше поводов ошибиться, особенно когда у переэкспортируемого модуля есть побочные эффекты или пакет проходит через мост CommonJS. Импорт напрямую из исходного файла сохраняет граф минимальным, а поведение предсказуемым.'
      ),
      bullets: [
        L('A barrel is a deliberate public API for a folder.', 'Barrel — это осознанный публичный API папки.'),
        L('Everything that is not re-exported stays private to the folder.', 'Всё, что не переэкспортировано, остаётся приватным внутри папки.'),
        L('A change anywhere in the folder invalidates the barrel and its consumers.', 'Изменение в любом месте папки инвалидирует barrel и его потребителей.'),
        L('A module that imports the barrel it is exported by creates a cycle.', 'Модуль, импортирующий barrel, который его экспортирует, создаёт цикл.'),
        L('A barrel does not automatically break tree shaking but it adds work.', 'Barrel сам по себе не ломает удаление неиспользуемого кода, но добавляет работы.'),
      ],
      code: `// file: userService.ts
import { orderService } from './index';

// A property read at module scope would observe an uninitialised value
export const userService = { name: 'user', getOrder: () => orderService.name };

// file: orderService.ts
import { userService } from './index';

export const orderService = { name: 'order', getUser: () => userService.name };

// file: index.ts
export { userService } from './userService';
export { orderService } from './orderService';`,
      table: {
        caption: L('What the import style changes', 'Что меняет стиль импорта'),
        headers: [L('Aspect', 'Аспект'), L('Through the barrel', 'Через barrel'), L('From the source file', 'Из исходного файла')],
        rows: [
          [L('Public surface', 'Публичная поверхность'), L('explicit, one place', 'явная, в одном месте'), L('per file', 'в каждом файле')],
          [L('Cycle risk', 'Риск цикла'), L('real and spread over files', 'реальный и растянут на файлы'), L('local and visible', 'локальный и заметный')],
          [L('Rebuild scope', 'Область пересборки'), L('the whole folder', 'вся папка'), L('one file', 'один файл')],
          [L('Bundle analysis', 'Анализ бандлом'), L('the bundler follows the chain', 'бандлер идёт по цепочке'), L('a direct reference', 'прямая ссылка')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The cycle that nobody sees', 'Цикл, которого никто не видит'),
          text: L(
            'A barrel is imported by the very modules it re-exports, so a folder can contain a cycle that no single file reveals. Look at the imports of the barrel itself: if a re-exported module imports the barrel back, the cycle is there.',
            'Barrel импортируется теми же модулями, которые он переэкспортирует, поэтому папка может содержать цикл, невидимый ни в одном отдельном файле. Посмотрите на импорты самого barrel: если переэкспортируемый модуль импортирует barrel в ответ, цикл есть.'
          ),
        },
      ],
      takeaway: L(
        'Use a barrel as a deliberate public API of a feature, and keep the re-exports shallow enough that the cycles stay visible.',
        'Используйте barrel как осознанный публичный API функции и держите переэкспорты достаточно поверхностными, чтобы циклы оставались заметными.'
      ),
      seeAlso: [
        L('Section 8-2: type-only imports and verbatimModuleSyntax', 'Секция 8-2: импорты только типов и verbatimModuleSyntax'),
        L('Chapter 3: module boundaries and feature-based architecture', 'Глава 3: границы модулей и архитектура по функциям'),
        L('Section 9-5: build modes and incremental compilation', 'Секция 9-5: режимы сборки и инкрементальная компиляция'),
      ],
    },
  ],
};
