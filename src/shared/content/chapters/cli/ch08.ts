import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh08: Chapter = {
  id: 'cli-ch8',
  title: L('Build and automation tooling', 'Сборка и инструменты автоматизации'),
  summary: L(
    'The tooling around a JavaScript project: Node and npm with a committed lockfile, package managers and workspaces for a monorepo, scripts that work the same everywhere, the difference between a bundler, a transpiler and a type checker, linters with pre-commit hooks, and a CI pipeline that runs the same commands you run locally.',
    'Инструменты вокруг JavaScript-проекта: Node и npm с закоммиченным lock-файлом, менеджеры пакетов и воркспейсы для монорепозитория, скрипты, работающие одинаково везде, разница между сборщиком, транспайлером и проверкой типов, линтеры с pre-commit хуками и CI-пайплайн, выполняющий те же команды, что и локально.'
  ),
  sections: [
    {
      id: 'cli-ch8-s1',
      title: L('Node, npm and the lockfile', 'Node, npm и lock-файл'),
      body: L(
        'Node is the runtime that executes your JavaScript outside the browser, and npm is the package manager that ships with it. A project describes itself in package.json, which lists the dependencies, the scripts and the version of the runtime it expects. npm reads that file, downloads what is missing and records the exact result of that download in package-lock.json, a file whose whole purpose is to make the next installation identical to this one.\n\nThat file is committed. It is the difference between a build that is reproducible and a build that merely worked on the machine where it was created. The command npm install resolves the ranges and may update the lockfile, while npm ci installs exactly what the lockfile says, refuses to change it and fails when the lockfile and the manifest disagree. In continuous integration the second command is the correct one, because it never rewrites the truth.\n\nThe version of the runtime belongs to the repository too. The field engines declares what the project needs, the file .nvmrc names one version for the version manager, and the file .tool-versions does the same for several tools at once. A project that pins its runtime and its lockfile gives the same behaviour to the developer, to the CI job and to the production image.',
        'Node — это среда выполнения, которая запускает ваш JavaScript вне браузера, а npm — менеджер пакетов, идущий с ней в комплекте. Проект описывает себя в package.json, где перечислены зависимости, скрипты и ожидаемая версия среды выполнения. npm читает этот файл, скачивает недостающее и записывает точный результат загрузки в package-lock.json, файл, чьё единственное назначение — сделать следующую установку идентичной текущей.\n\nЭтот файл коммитится. Именно он отличает воспроизводимую сборку от сборки, которая просто получилась на машине, где её создавали. Команда npm install разрешает диапазоны и может обновить lock-файл, а npm ci устанавливает ровно то, что записано в lock-файле, не меняет его и падает, когда lock-файл и манифест расходятся. В непрерывной интеграции правильна вторая команда, потому что она никогда не переписывает правду.\n\nВерсия среды выполнения тоже принадлежит репозиторию. Поле engines объявляет, что нужно проекту, файл .nvmrc называет одну версию для менеджера версий, а файл .tool-versions делает то же для нескольких инструментов сразу. Проект, зафиксировавший среду и lock-файл, ведёт себя одинаково у разработчика, в задаче CI и в production-образе.'
      ),
      bullets: [
        L('package.json declares the dependencies, the scripts and the expected runtime.', 'package.json объявляет зависимости, скрипты и ожидаемую среду выполнения.'),
        L('package-lock.json records the exact resolved tree and is committed.', 'package-lock.json фиксирует точное дерево зависимостей и коммитится.'),
        L('npm install may update the lockfile, npm ci never does.', 'npm install может обновить lock-файл, npm ci никогда.'),
        L('npm ci fails when the lockfile and the manifest disagree.', 'npm ci падает, когда lock-файл и манифест расходятся.'),
        L('The engine version is pinned in engines, .nvmrc or .tool-versions.', 'Версия среды закрепляется в engines, .nvmrc или .tool-versions.'),
      ],
      code: `# Install exactly what the lockfile says, never touching it
npm ci

# Add a runtime dependency and record the result
npm install --save axios
npm install --save-dev vitest

# Run a binary from the project without installing it globally
npx --yes vitest --run

# Check what a package actually requires
npm ls --depth=0
npm outdated`,
      table: {
        caption: L('npm ci against npm install', 'npm ci против npm install'),
        headers: [L('Property', 'Свойство'), L('npm ci', 'npm ci'), L('npm install', 'npm install')],
        rows: [
          [L('Reads the lockfile', 'Читает lock-файл'), L('yes, and obeys it', 'да, и следует ему'), L('resolves the ranges', 'разрешает диапазоны')],
          [L('Rewrites the lockfile', 'Переписывает lock-файл'), L('never', 'никогда'), L('when something changed', 'когда что-то изменилось')],
          [L('Fails on a mismatch', 'Падает при расхождении'), L('yes', 'да'), L('no', 'нет')],
          [L('Removes the old tree', 'Удаляет старое дерево'), L('yes', 'да'), L('no', 'нет')],
          [L('Where to use it', 'Где применять'), L('CI and reproducible installs', 'CI и воспроизводимые установки'), L('when you add or update a package', 'когда добавляете или обновляете пакет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The lockfile that was never committed', 'lock-файл, который не закоммитили'),
          text: L(
            'Without the lockfile every installation resolves the ranges again, so a patch release published on a Tuesday changes the code of a project that was last built in March. The commit that fixes this is small and should be part of the rule that says a dependency change always comes with its lockfile.',
            'Без lock-файла каждая установка заново разрешает диапазоны, и патч, опубликованный во вторник, меняет код проекта, который последний раз собирали в марте. Исправляющий коммит маленький и должен быть частью правила: изменение зависимости всегда приходит вместе с lock-файлом.'
          ),
        },
        {
          tone: 'tip',
          title: L('Pin the runtime in one place', 'Закрепите среду в одном месте'),
          text: L(
            'The engines field documents the requirement, but it does not enforce it. The version manager does enforce it, so a .nvmrc file plus a version check in the install script turns a warning into a build that fails early and clearly.',
            'Поле engines документирует требование, но не проверяет его. Менеджер версий проверяет, поэтому файл .nvmrc вместе с проверкой версии в скрипте установки превращает предупреждение в понятную раннюю ошибку сборки.'
          ),
        },
      ],
      takeaway: L(
        'Commit the lockfile, install with npm ci in automation, and pin the runtime version in the repository.',
        'Коммитьте lock-файл, ставьте зависимости через npm ci в автоматизации и закрепляйте версию среды выполнения в репозитории.'
      ),
      seeAlso: [
        L('Section 8-2: package managers and workspaces', 'Секция 8-2: менеджеры пакетов и воркспейсы'),
        L('Section 8-3: task runners and npm scripts', 'Секция 8-3: раннеры задач и npm-скрипты'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
      ],
    },
    {
      id: 'cli-ch8-s2',
      title: L('Package managers and workspaces', 'Менеджеры пакетов и воркспейсы'),
      body: L(
        'npm is one of several package managers, and they differ in how they lay out the installed tree. npm and yarn hoist dependencies to the root of node_modules, which makes the directory small and makes it possible to use a package you never declared. pnpm keeps every package in a single store and links the projects to it, so a dependency is visible in a project only when the manifest says so. bun installs fast and ships its own runtime.\n\nThat difference decides what breaks. A hoisted layout lets an undeclared import work on your laptop because some other package pulled it in, and the same code fails in production, where the tree is installed from the lockfile of a clean checkout. A strict layout fails immediately at install time instead, which is a failure you can read.\n\nA workspace is a monorepo arrangement where one root manifest lists several packages and npm links them to each other. Each package keeps its own package.json and its own dependencies, and a command run with the flag --workspace runs in one of them. The result is that a change in a shared library is visible to the packages that depend on it without publishing anything, and the cost is that the root manifest and the versions have to be kept consistent.',
        'npm — один из нескольких менеджеров пакетов, и различаются они тем, как устраивают установленное дерево. npm и yarn поднимают зависимости в корень node_modules, отчего каталог невелик и позволяет использовать пакет, который никто не объявлял. pnpm держит все пакеты в одном хранилище и связывает с ними проекты, так что зависимость видна в проекте только тогда, когда она есть в манифесте. bun ставит быстро и несёт собственную среду выполнения.\n\nИменно это различие решает, что ломается. Приподнятой раскладке необъявленный импорт работает на вашем ноутбуке, потому что его притянул какой-то другой пакет, и тот же код падает в production, где дерево ставится из lock-файла чистого checkout. Строгая раскладка падает сразу при установке, и такую ошибку можно прочитать.\n\nВоркспейс — это устройство монорепозитория, где корневой манифест перечисляет несколько пакетов, а npm связывает их между собой. У каждого пакета свой package.json и свои зависимости, а команда с флагом --workspace выполняется в одном из них. В итоге изменение общей библиотеки видно пакетам, которые от неё зависят, без публикации чего бы то ни было, а плата — согласованность корневого манифеста и версий.'
      ),
      bullets: [
        L('npm and yarn hoist to the root, pnpm links from a single store.', 'npm и yarn поднимают в корень, pnpm связывает из одного хранилища.'),
        L('A hoisted layout hides an undeclared dependency until production.', 'Приподнятая раскладка прячет необъявленную зависимость до production.'),
        L('A strict layout fails at install time, which is readable.', 'Строгая раскладка падает при установке, и это читаемо.'),
        L('A workspace links the packages of a monorepo to each other.', 'Воркспейс связывает пакеты монорепозитория между собой.'),
        L('npm run <script> --workspace <name> runs a script in one package of the workspace.', 'npm run <script> --workspace <name> выполняет скрипт в одном пакете воркспейса.'),
        L('Every package keeps its own manifest and its own dependencies.', 'У каждого пакета свой манифест и свои зависимости.'),
      ],
      code: `# A monorepo root
{
  "name": "platform",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}

# Run a script in one package
npm run build --workspace @platform/api
npm run build --workspaces --if-present

# Add a dependency to a single package
npm install --workspace @platform/api zod`,
      table: {
        caption: L('How the managers differ', 'Чем менеджеры отличаются'),
        headers: [L('Manager', 'Менеджер'), L('Layout', 'Раскладка'), L('Strictness', 'Строгость'), L('Note', 'Замечание')],
        rows: [
          [L('npm', 'npm'), L('hoisted to the root', 'приподнятая в корень'), L('permissive', 'мягкая'), L('ships with Node', 'идёт в составе Node')],
          [L('yarn', 'yarn'), L('hoisted to the root', 'приподнятая в корень'), L('permissive', 'мягкая'), L('the classic choice for a while', 'классический выбор на время')],
          [L('pnpm', 'pnpm'), L('linked from a store', 'связанная из хранилища'), L('strict', 'строгая'), L('the smallest disk footprint', 'меньше всего места на диске')],
          [L('bun', 'bun'), L('linked from a store', 'связанная из хранилища'), L('strict', 'строгая'), L('its own runtime', 'со своей средой выполнения')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The import that only works on your machine', 'Импорт, который работает только у вас'),
          text: L(
            'With a hoisted layout the import resolves because another package brought the dependency in. On a clean install of the published package it does not, and the failure appears in production as a module that cannot be found. Declare every dependency in the package that imports it, whatever the manager does with the tree.',
            'При приподнятой раскладке импорт разрешается, потому что зависимость притянул другой пакет. На чистой установке опубликованного пакета он не разрешается, и сбой всплывает в production как ненайденный модуль. Объявляйте каждую зависимость в том пакете, который её импортирует, что бы менеджер ни делал с деревом.'
          ),
        },
        {
          tone: 'note',
          title: L('A workspace is not a monorepo by itself', 'Воркспейс сам по себе не монорепозиторий'),
          text: L(
            'The workspaces field is only the linking mechanism. The decisions that make a monorepo workable live elsewhere: one version of the toolchain, a shared configuration, a rule about which package may depend on which, and a build order that follows those dependencies.',
            'Поле workspaces — это только механизм связывания. Решения, которые делают монорепозиторий рабочим, живут в другом месте: одна версия инструментов, общая конфигурация, правило о том, какой пакет на какой может зависеть, и порядок сборки, следующий этим зависимостям.'
          ),
        },
      ],
      takeaway: L(
        'Declare every dependency where it is imported, keep one toolchain version for the whole workspace, and let the manager fail early.',
        'Объявляйте каждую зависимость там, где её импортируют, держите одну версию инструментов на весь воркспейс и позволяйте менеджеру падать рано.'
      ),
      seeAlso: [
        L('Section 8-1: node, npm and the lockfile', 'Секция 8-1: Node, npm и lock-файл'),
        L('Section 8-3: task runners and npm scripts', 'Секция 8-3: раннеры задач и npm-скрипты'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
      ],
    },
    {
      id: 'cli-ch8-s3',
      title: L('Task runners and npm scripts', 'Раннеры задач и npm-скрипты'),
      body: L(
        'The scripts section of package.json is the task runner of every JavaScript project. Each entry has a name and a command, npm run build starts the one called build, and the environment of the run contains every binary from node_modules, so the local eslint and the local tsc are found without a path and without a global install. The commands run through a shell, which is what makes the chaining operators work.\n\nAround the main script there are lifecycle hooks: a script called prebuild runs before build and a script called postbuild runs after it, and the same pattern works for install and for test. The hooks are a trap for scripts that must not run in every context, because a postinstall that touches the network makes an offline installation fail.\n\nThe shell behind the scripts is the one the operating system provides, and that is where cross-platform problems come from. A script that uses the bash syntax [[ ]] or the rm command works on Linux and breaks on Windows, where the same script is handed to a different shell. The portable form is plain commands, the portable way to chain two of them is the && operator, which every shell understands, and the portable answer to a missing binary is a small JavaScript script in the repository rather than a system tool.',
        'Секция scripts в package.json — это раннер задач каждого JavaScript-проекта. У каждой записи есть имя и команда, npm run build запускает запись с именем build, а в окружении запуска есть любой бинарник из node_modules, поэтому локальный eslint и локальный tsc находятся без пути и без глобальной установки. Команды выполняются через оболочку, и именно поэтому работают операторы цепочки.\n\nВокруг главного скрипта есть lifecycle-хуки: скрипт с именем prebuild выполняется до build, а postbuild — после него, и та же схема работает для install и для test. Хуки — ловушка для скриптов, которые не должны выполняться в любом контексте, потому что postinstall, ходящий в сеть, ломает установку без сети.\n\nЗа скриптами стоит та оболочка, которую даёт операционная система, и отсюда растут проблемы между платформами. Скрипт с синтаксисом bash вроде [[ ]] или с командой rm работает на Linux и ломается на Windows, где тот же скрипт получает другая оболочка. Переносимая форма — простые команды, переносимый способ соединить две из них — оператор &&, который понимает любая оболочка, а переносимый ответ на отсутствующий бинарник — небольшой JavaScript-скрипт в репозитории, а не системный инструмент.'
      ),
      bullets: [
        L('npm run starts a script from the scripts section of package.json.', 'npm run запускает скрипт из секции scripts в package.json.'),
        L('node_modules/.bin is on the path, so local binaries need no prefix.', 'node_modules/.bin в пути, поэтому локальные бинарники не требуют префикса.'),
        L('pre and post hooks run around the script of the same name.', 'Хуки pre и post выполняются вокруг скрипта с тем же именем.'),
        L('Scripts run through the system shell, which differs between platforms.', 'Скрипты выполняются системной оболочкой, а она различается на платформах.'),
        L('Bash syntax in a script breaks on a machine without bash.', 'Синтаксис bash в скрипте ломается на машине без bash.'),
        L('A small JavaScript script is the portable answer to a missing tool.', 'Небольшой JavaScript-скрипт — переносимый ответ на отсутствие инструмента.')],
      code: `{
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "prebuild": "rimraf dist",
    "test": "vitest --run",
    "lint": "eslint .",
    "format": "prettier --write .",
    "check": "npm run lint && npm run test"
  }
}

# Run one script, pass arguments after the separator
npm run test -- --reporter=verbose

# Run several in sequence
npm run lint && npm run test

# The portable way to delete a directory
node -e "require('fs').rmSync('dist', { recursive: true, force: true })"`,
      table: {
        caption: L('The lifecycle hooks', 'Lifecycle-хуки'),
        headers: [L('Hook', 'Хук'), L('Runs', 'Выполняется'), L('Careful because', 'Осторожно, потому что')],
        rows: [
          [L('prebuild', 'prebuild'), L('before build', 'до build'), L('it runs on every build', 'он выполняется на каждой сборке')],
          [L('postbuild', 'postbuild'), L('after build', 'после build'), L('a failing hook fails the build', 'упавший хук роняет сборку')],
          [L('preinstall', 'preinstall'), L('before install', 'до install'), L('it runs during a fresh install', 'он выполняется при чистой установке')],
          [L('postinstall', 'postinstall'), L('after install', 'после install'), L('network access breaks offline installs', 'доступ в сеть ломает установку без сети')],
          [L('pretest', 'pretest'), L('before test', 'до test'), L('it runs on every test run', 'он выполняется при каждом прогоне')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The script that only runs on Linux', 'Скрипт, который работает только на Linux'),
          text: L(
            'A script with the rm command, with [[ ]] or with a bash array fails on Windows, where npm hands the script to a different shell, and the error mentions a syntax problem rather than a platform problem. Keep the scripts portable and put the complicated parts in Node scripts.',
            'Скрипт с командой rm, с [[ ]] или с bash-массивом падает на Windows, где npm отдаёт скрипт другой оболочке, и ошибка говорит о синтаксисе, а не о платформе. Держите скрипты переносимыми, а сложные части выносите в Node-скрипты.'
          ),
        },
        {
          tone: 'tip',
          title: L('One entry point per task', 'Одна точка входа на задачу'),
          text: L(
            'When the continuous integration job calls npm run check and the developer calls npm run check, the two paths cannot drift. The script is the contract, and every extra way of running the same thing is one more place where the behaviour can differ.',
            'Когда задача CI вызывает npm run check и разработчик вызывает npm run check, эти пути не могут разойтись. Скрипт и есть контракт, а каждый лишний способ сделать то же самое — ещё одно место, где поведение может отличаться.'
          ),
        },
      ],
      takeaway: L(
        'Give every task one npm script, keep the commands portable, and let the continuous integration job call the same script you call.',
        'Заведите по одному npm-скрипту на каждую задачу, держите команды переносимыми и пусть задача CI вызывает тот же скрипт, что и вы.'
      ),
      seeAlso: [
        L('Section 8-1: node, npm and the lockfile', 'Секция 8-1: Node, npm и lock-файл'),
        L('Section 8-5: linters, formatters and pre-commit', 'Секция 8-5: линтеры, форматтеры и pre-commit'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
      ],
    },
    {
      id: 'cli-ch8-s4',
      title: L('Bundlers, transpilers and what each one does', 'Сборщики, транспайлеры и что каждый делает'),
      body: L(
        'Three tools are often confused. A type checker reads the types and reports the mistakes inside them without producing any code. A transpiler rewrites the source into something the target runtime understands, and it removes the type annotations while it does so. A bundler takes many modules and produces one artefact, resolving the imports along the way and often minifying the result.\n\nThe order matters more than the choice. The types are checked first, because a type error means the program is wrong and no amount of rewriting fixes that. Then the syntax is rewritten for the target. Then the modules are bundled into a file the browser can load. The TypeScript compiler can do the first two steps and refuses the third: it emits one file per module and leaves the import statements alone, so a bundler is still needed for a browser build.\n\nModern tools blur the line. esbuild transpiles and bundles in one pass and is written in Go, which is why it is fast. Vite uses esbuild to prepare dependencies during development and Rollup to build for production. Babel remains the reference for transpiling modern syntax down to older targets, and the swc compiler does the same job in Rust. The rule to remember is what each step consumes and what it produces, not the name of the tool.',
        'Три инструмента часто путают. Проверка типов читает типы и находит ошибки внутри них, не производя никакого кода. Транспайлер переписывает исходники в то, что понимает целевая среда выполнения, и заодно убирает аннотации типов. Сборщик берёт много модулей и делает один артефакт, разрешая импорты по ходу и часто минифицируя результат.\n\nПорядок важнее выбора. Типы проверяют первыми, потому что ошибка типа означает, что программа неправильна, и никакое переписывание это не исправит. Затем синтаксис переписывается под цель. Затем модули собираются в файл, который может загрузить браузер. Компилятор TypeScript умеет первые два шага и отказывается от третьего: он выдаёт по файлу на модуль и оставляет операторы импорта как есть, поэтому для сборки в браузер сборщик всё равно нужен.\n\nСовременные инструменты размывают границу. esbuild транспайлит и собирает за один проход и написан на Go, поэтому он быстр. Vite использует esbuild для подготовки зависимостей в разработке и Rollup для сборки в production. Babel остаётся эталоном для перевода современного синтаксиса в старые цели, а компилятор swc делает ту же работу на Rust. Помнить надо то, что каждый шаг потребляет и что он производит, а не название инструмента.'
      ),
      bullets: [
        L('A type checker reports mistakes and produces no code.', 'Проверка типов находит ошибки и не производит кода.'),
        L('A transpiler rewrites the syntax and strips the types.', 'Транспайлер переписывает синтаксис и убирает типы.'),
        L('A bundler resolves the imports into one artefact.', 'Сборщик разрешает импорты в один артефакт.'),
        L('The order is type check, then transpile, then bundle.', 'Порядок: проверка типов, потом транспайлинг, потом сборка.'),
        L('tsc emits one file per module and does not bundle.', 'tsc выдаёт по файлу на модуль и не собирает.'),
        L('esbuild does both steps at once and is written in Go.', 'esbench делает оба шага за раз и написан на Go.'),
      ],
      code: `# 1. Check the types, produce nothing
npx tsc --noEmit -p tsconfig.app.json

# 2. Rewrite the syntax into JavaScript
npx tsc -p tsconfig.build.json          # emits one file per module

# 3. Bundle the modules into one file
npx esbuild src/main.ts --bundle --minify --outfile=dist/app.js

# The whole chain, in the order it has to happen
npm run typecheck && npm run build && npm run bundle

# One tool that does the last two steps
npx vite build`,
      table: {
        caption: L('What each tool actually does', 'Что на самом деле делает каждый инструмент'),
        headers: [L('Tool', 'Инструмент'), L('Reads', 'Читает'), L('Produces', 'Производит'), L('Use it for', 'Для чего')],
        rows: [
          [L('tsc --noEmit', 'tsc --noEmit'), L('TypeScript sources', 'исходники TypeScript'), L('a report', 'отчёт'), L('checking types', 'проверки типов')],
          [L('tsc', 'tsc'), L('TypeScript sources', 'исходники TypeScript'), L('JavaScript per module', 'JavaScript по модулям'), L('a library build', 'сборки библиотеки')],
          [L('babel', 'babel'), L('modern syntax', 'современный синтаксис'), L('JavaScript for old targets', 'JavaScript под старые цели'), L('legacy support', 'поддержки старых браузеров')],
          [L('esbuild', 'esbuild'), L('modules and sources', 'модули и исходники'), L('one bundled file', 'один собранный файл'), L('a fast application build', 'быстрой сборки приложения')],
          [L('vite', 'vite'), L('sources and dependencies', 'исходники и зависимости'), L('an optimised bundle', 'оптимизированный бандл'), L('development and production', 'разработки и production')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('tsc is not a bundler', 'tsc — не сборщик'),
          text: L(
            'The TypeScript compiler emits one file per module and keeps the import statements, so the browser receives a folder of modules with bare import paths it cannot resolve. For a browser build, either point the module setting at a bundler format or run a bundler after the compiler.',
            'Компилятор TypeScript выдаёт по файлу на модуль и сохраняет операторы импорта, поэтому браузер получает папку модулей с путями импорта, которые он не может разрешить. Для сборки в браузер либо укажите в настройках модулей формат сборщика, либо запустите сборщик после компилятора.'
          ),
        },
        {
          tone: 'tip',
          title: L('Check the types once, in the pipeline', 'Проверяйте типы один раз, в конвейере'),
          text: L(
            'The type check belongs in the build script, not in a separate manual step nobody remembers. When the check is part of npm run build, it runs in the pipeline and on every machine, and the type errors never reach a branch.',
            'Проверка типов принадлежит скрипту сборки, а не отдельному ручному шагу, который никто не помнит. Когда проверка входит в npm run build, она выполняется в конвейере и на каждой машине, и ошибки типов не доходят до ветки.'
          ),
        },
      ],
      takeaway: L(
        'Check the types, then transpile, then bundle, and never let the TypeScript compiler pretend to be a bundler.',
        'Проверяйте типы, потом транспайлите, потом собирайте, и никогда не позволяйте компилятору TypeScript притворяться сборщиком.'
      ),
      seeAlso: [
        L('Section 8-1: node, npm and the lockfile', 'Секция 8-1: Node, npm и lock-файл'),
        L('Section 8-3: task runners and npm scripts', 'Секция 8-3: раннеры задач и npm-скрипты'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
      ],
    },
    {
      id: 'cli-ch8-s5',
      title: L('Linters, formatters and pre-commit', 'Линтеры, форматтеры и pre-commit'),
      body: L(
        'A linter reads the code and reports the patterns that are almost always mistakes: an unused variable, a promise that is never awaited, a comparison that is always true. A formatter has no opinions about correctness and rewrites the file in one canonical shape, so that two people do not argue about spaces. The two tools answer different questions, and the clean setup uses one of each.\n\nThey can still fight, because many lint rules existed only to enforce a formatting choice. The rule about quotes or about the trailing comma is a formatting rule, and a linter that checks it will undo whatever the formatter just wrote. The configuration eslint-config-prettier turns those rules off, and the modern alternative is a tool such as Biome or oxlint that does both jobs in one binary with one configuration file.\n\nThe pre-commit hook is a script that git runs before it accepts a commit. Its purpose is speed: the checks that take a second should run on every commit, while the checks that take a minute belong to the pipeline. The popular setup uses husky to install the hooks and lint-staged to run the checks only on the files in the commit, and the whole thing is optional, because a hook that blocks a commit annoys people who then disable it with the option --no-verify.',
        'Линтер читает код и находит образцы, которые почти всегда ошибочны: неиспользуемая переменная, промис, который никогда не ждут, сравнение, которое всегда истинно. Форматтер не имеет мнений о корректности и переписывает файл в одну каноническую форму, чтобы двое не спорили о пробелах. Инструменты отвечают на разные вопросы, и правильная схема — по одному инструменту каждого вида.\n\nОни всё же могут конфликтовать, потому что многие правила линтера появились только ради требования к форматированию. Правило о кавычках или о завершающей запятой — это правило форматирования, и линтер, который его проверяет, отменит всё, что только что записал форматтер. Конфигурация eslint-config-prettier выключает такие правила, а современная альтернатива — инструмент вроде Biome или oxlint, который делает обе работы одним бинарником с одним файлом конфигурации.\n\nХук pre-commit — это скрипт, который git запускает перед принятием коммита. Его смысл в скорости: проверки, которые занимают секунду, должны выполняться на каждом коммите, а проверки, которые занимают минуту, принадлежат конвейеру. Популярная схема использует husky для установки хуков и lint-staged, чтобы проверки шли только по файлам коммита, и всё это необязательно, потому что хук, мешающий коммиту, раздражает, и люди отключают его опцией --no-verify.'
      ),
      bullets: [
        L('A linter reports suspicious patterns, a formatter rewrites the layout.', 'Линтер находит подозрительные образцы, форматтер переписывает оформление.'),
        L('Formatting rules inside a linter undo the work of the formatter.', 'Правила форматирования внутри линтера отменяют работу форматтера.'),
        L('eslint-config-prettier switches the conflicting rules off.', 'eslint-config-prettier выключает конфликтующие правила.'),
        L('Biome and oxlint cover both jobs with one configuration.', 'Biome и oxlint закрывают обе задачи одной конфигурацией.'),
        L('A pre-commit hook runs the fast checks on every commit.', 'Хук pre-commit запускает быстрые проверки на каждом коммите.'),
        L('lint-staged limits the checks to the files in the commit.', 'lint-staged ограничивает проверки файлами коммита.'),
      ],
      code: `# Lint and format the whole project
npx eslint .
npx prettier --check .
npx prettier --write .

# Install the git hooks and run the checks on staged files
npx husky init
npx lint-staged

# The same checks on the files of a commit
npx eslint --fix $(git diff --cached --name-only | grep '\\.ts$')

# The fast checks belong to the commit, the slow ones to the pipeline
npm run lint && npm run typecheck`,
      table: {
        caption: L('Linter against formatter', 'Линтер против форматтера'),
        headers: [L('Property', 'Свойство'), L('Linter', 'Линтер'), L('Formatter', 'Форматтер')],
        rows: [
          [L('Reports mistakes', 'Находит ошибки'), L('yes', 'да'), L('no', 'нет')],
          [L('Rewrites the file', 'Переписывает файл'), L('only with --fix', 'только с --fix'), L('yes, always', 'да, всегда')],
          [L('Has opinions about style', 'Имеет мнение о стиле'), L('only about the rules you keep', 'только о правилах, которые вы оставили'), L('yes, one shape', 'да, одна форма')],
          [L('Fails the build', 'Роняет сборку'), L('yes, on a reported problem', 'да, при найденной проблеме'), L('yes, on a changed file', 'да, при изменённом файле')],
          [L('Typical tools', 'Типичные инструменты'), L('eslint, oxlint, Biome', 'eslint, oxlint, Biome'), L('Prettier, Biome, dprint', 'Prettier, Biome, dprint')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two tools rewriting the same file', 'Два инструмента пишут в один файл'),
          text: L(
            'When the linter enforces a formatting rule, the two tools overwrite each other: the formatter writes one style, the linter demands another, and the file changes back and forth on every save. Either disable the formatting rules in the linter or let one tool do both jobs.',
            'Когда линтер требует правило форматирования, инструменты переписывают друг друга: форматтер пишет один стиль, линтер требует другой, и файл меняется туда-обратно при каждом сохранении. Либо выключите правила форматирования у линтера, либо поручите обе работы одному инструменту.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the hook fast or nobody keeps it', 'Держите хук быстрым, иначе его отключат'),
          text: L(
            'A hook that takes thirty seconds is a hook that gets bypassed, and a bypassed hook protects nothing. Run the linter on the staged files only, leave the type check and the tests to the pipeline, and make the hook fail loudly so that it is not ignored silently.',
            'Хук на тридцать секунд — это хук, который обходят, а обойдённый хук не защищает ничего. Запускайте линтер только по индексированным файлам, проверку типов и тесты оставьте конвейеру, а падение хука сделайте заметным, чтобы его не игнорировали молча.'
          ),
        },
      ],
      takeaway: L(
        'Use one linter and one formatter with one configuration, keep the pre-commit hook under a few seconds, and leave the slow checks to the pipeline.',
        'Используйте один линтер и один форматтер с одной конфигурацией, держите хук pre-commit в пределах нескольких секунд, а медленные проверки оставьте конвейеру.'
      ),
      seeAlso: [
        L('Section 8-3: task runners and npm scripts', 'Секция 8-3: раннеры задач и npm-скрипты'),
        L('Section 8-4: bundlers, transpilers and what each one does', 'Секция 8-4: сборщики, транспайлеры и что каждый делает'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
      ],
    },
    {
      id: 'cli-ch8-s6',
      title: L('CI pipelines from the command line', 'CI-пайплайны как команды'),
      body: L(
        'A continuous integration pipeline is a list of shell commands that run on a machine you did not choose. The commands install the dependencies, run the checks and produce the artefact, and the result of each step is a status the pipeline moves on from or stops at. Writing them as ordinary commands keeps the pipeline honest: the same line that runs on the server can be typed on a laptop.\n\nThe rule that saves the most time is that the pipeline calls the scripts of package.json and never the tools directly. The job runs npm ci, then npm run lint, then npm run typecheck, then npm run test, and every one of those names is a script a developer can run. When the pipeline grows a step that exists nowhere else, the first bug report will be that nobody can reproduce the failure locally.\n\nTwo more details decide whether the pipeline is trustworthy. The environment is reproduced from scratch on every run, so the cache of the dependencies is keyed by the lockfile, and the artefact that gets deployed is the same artefact the pipeline tested. A pipeline that rebuilds a different version on the way to production has broken the link between the test and the release, and no amount of green ticks fixes that.',
        'CI-пайплайн — это список shell-команд, которые выполняются на машине, которую вы не выбирали. Команды ставят зависимости, выполняют проверки и производят артефакт, а результат каждого шага это статус, по которому конвейер идёт дальше или останавливается. Написание их обычными командами делает конвейер честным: та же строка, что работает на сервере, набирается на ноутбуке.\n\nПравило, которое экономит больше всего времени, звучит так: конвейер вызывает скрипты из package.json и никогда не обращается к инструментам напрямую. Задача выполняет npm ci, затем npm run lint, затем npm run typecheck, затем npm run test, и каждое из этих имён — скрипт, который может запустить разработчик. Когда в конвейере появляется шаг, которого нет больше нигде, первым багом будет то, что сбой нельзя воспроизвести локально.\n\nЕщё две детали решают, можно ли доверять конвейеру. Окружение воспроизводится с нуля на каждом прогоне, поэтому кэш зависимостей привязан к lock-файлу, а артефакт, который уходит в production, тот же самый, который тестировал конвейер. Конвейер, который по дороге в production пересобирает другую версию, разорвал связь между тестом и релизом, и никакие зелёные отметки это не исправят.'
      ),
      bullets: [
        L('A pipeline is a list of shell commands and the exit code decides the step.', 'Конвейер — это список shell-команд, а исход каждого шага решает его судьбу.'),
        L('The job calls the npm scripts, never the tools directly.', 'Задача вызывает npm-скрипты, а не инструменты напрямую.'),
        L('Every step must be runnable on a laptop.', 'Каждый шаг должен запускаться на ноутбуке.'),
        L('The dependency cache is keyed by the lockfile.', 'Кэш зависимостей привязан к lock-файлу.'),
        L('The deployed artefact is the one the pipeline tested.', 'В production уходит тот артефакт, который протестировал конвейер.'),
        L('A failing step stops the pipeline before the next one.', 'Упавший шаг останавливает конвейер до следующего.'),
      ],
      code: `# The pipeline calls the scripts, the scripts call the tools
npm ci
npm run lint
npm run typecheck
npm run test
npm run build

# The same commands, one after another, on a laptop
npm ci && npm run check && npm run build

# A script that CI can call and a developer can trust
{
  "scripts": {
    "check": "npm run lint && npm run typecheck && npm run test",
    "build": "vite build"
  }
}

# Exit codes are the contract with the pipeline
grep -q "error" app.log && exit 1 || echo "clean"`,
      table: {
        caption: L('What the pipeline does and where it runs it', 'Что делает конвейер и где он это делает'),
        headers: [L('Step', 'Шаг'), L('Command', 'Команда'), L('Fails the build when', 'Роняет сборку, когда')],
        rows: [
          [L('install', 'установка'), L('npm ci', 'npm ci'), L('the lockfile and the manifest disagree', 'lock-файл и манифест расходятся')],
          [L('lint', 'линт'), L('npm run lint', 'npm run lint'), L('a rule is broken', 'нарушено правило')],
          [L('types', 'типы'), L('npm run typecheck', 'npm run typecheck'), L('a type error is found', 'найдена ошибка типа')],
          [L('test', 'тесты'), L('npm run test', 'npm run test'), L('a test fails', 'падает тест')],
          [L('build', 'сборка'), L('npm run build', 'npm run build'), L('the build exits with an error', 'сборка завершается с ошибкой')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The step that exists only in the pipeline', 'Шаг, который есть только в конвейере'),
          text: L(
            'A pipeline that runs a command nobody can run locally is a pipeline that produces failures nobody can reproduce. Put the command into a script, call the script from the pipeline, and run the script by hand before you push.',
            'Конвейер, выполняющий команду, которую никто не может запустить локально, порождает сбои, которые невозможно воспроизвести. Перенесите команду в скрипт, вызывайте скрипт из конвейера и запускайте скрипт руками перед push.'
          ),
        },
        {
          tone: 'tip',
          title: L('Fail fast, in the cheapest place', 'Падайте рано, в самом дешёвом месте'),
          text: L(
            'Order the steps by how fast they fail: the lint runs in seconds, the type check in a minute, the tests in several. A developer who broke a rule finds it in ten seconds instead of waiting for the slowest step of the pipeline to report it.',
            'Упорядочьте шаги по скорости падения: линт работает за секунды, проверка типов за минуту, тесты за несколько минут. Разработчик, нарушивший правило, узнаёт об этом за десять секунд, а не после самого медленного шага конвейера.'
          ),
        },
      ],
      takeaway: L(
        'Make every pipeline step an npm script you can run locally, and deploy the exact artefact the pipeline tested.',
        'Сделайте каждый шаг конвейера npm-скриптом, который можно запустить локально, и разворачивайте ровно тот артефакт, который протестировал конвейер.'
      ),
      seeAlso: [
        L('Section 8-1: node, npm and the lockfile', 'Секция 8-1: Node, npm и lock-файл'),
        L('Section 8-3: task runners and npm scripts', 'Секция 8-3: раннеры задач и npm-скрипты'),
        L('Section 8-5: linters, formatters and pre-commit', 'Секция 8-5: линтеры, форматтеры и pre-commit'),
      ],
    },
  ],
};
