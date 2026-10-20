import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const toolingTasks: PracticeTask[] = [
  {
    id: 'topic-tooling-1',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'basic',
    title: L('Describe the npm scripts', 'Описать npm-скрипты'),
    brief: L(
      'Write the "scripts" block of the package.json of a small web project. The project has a dev server, a production build that also type checks the sources, a preview of the built files, a test runner, a linter and a combined command that runs the linter, the tests and the build one after another and stops at the first failure. The scripts must be named "dev", "build", "preview", "test", "lint" and "check", the build must run the type checker before the bundler, and "check" must call the three other npm scripts with "npm run". Example: "check" has the value "npm run lint && npm run test && npm run build".',
      'Напишите блок "scripts" в package.json небольшого веб-проекта. В проекте есть сервер разработки, продакшен-сборка, которая ещё и проверяет типы, предпросмотр собранных файлов, раннер тестов, линтер и объединённая команда, которая по очереди запускает линтер, тесты и сборку и останавливается на первой ошибке. Скрипты должны называться "dev", "build", "preview", "test", "lint" и "check", сборка должна запускать проверку типов перед сборщиком, а "check" должен вызывать три других npm-скрипта через "npm run". Пример: у "check" значение "npm run lint && npm run test && npm run build".'
    ),
    hint: L(
      'The scripts block is a plain object of strings. Join the commands with && so that the shell stops at the first failure.',
      'Блок scripts — это обычный объект со строками. Соединяйте команды через &&, чтобы оболочка останавливалась на первой ошибке.'
    ),
    solution: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint .",
    "check": "npm run lint && npm run test && npm run build"
  }
}`,
    explanation: L(
      'A script is just a named command, and npm run puts the folder with node_modules at the front of the path, so the local vite, tsc and vitest are used instead of anything global. The build script checks the types first, because a broken type must stop the pipeline before the bundler wastes time. The && operator is the important part of the check script: the shell runs the commands from left to right and stops at the first non zero exit code, so a failing test never hides behind a successful build.',
      'Скрипт — это просто именованная команда, а npm run ставит папку с node_modules в начало пути, поэтому используются локальные vite, tsc и vitest, а не глобальные. Скрипт сборки сначала проверяет типы, потому что сломанный тип должен остановить конвейер до того, как сборщик потратит время. Оператор && — самая важная часть скрипта check: оболочка выполняет команды слева направо и останавливается на первом ненулевом коде выхода, поэтому упавший тест не спрячется за успешной сборкой.'
    ),
  },
  {
    id: 'topic-tooling-2',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'basic',
    title: L('Limit the public API with the exports field', 'Ограничить публичный API полем exports'),
    brief: L(
      'Write the package.json of a library that is published under the scope @acme. The package has a main entry, a subpath for the button component and access to its own package.json. Every entry of the exports map must list the types first, then the ESM entry for "import" and the CommonJS entry for "require", and every path must point into the dist folder. The subpath "./button" must not have a "require" entry, because the button is published as ESM only, and "./package.json" must be exported as a plain string. Example: the exports map has the keys ".", "./button" and "./package.json".',
      'Напишите package.json библиотеки, публикуемой под областью @acme. У пакета есть главная точка входа, подпуть для компонента button и доступ к собственному package.json. Каждая запись карты exports должна сначала перечислять типы, затем ESM-запись для "import" и CommonJS-запись для "require", и все пути должны вести в папку dist. Подпуть "./button" не должен иметь записи "require", потому что button публикуется только как ESM, а "./package.json" должен экспортироваться обычной строкой. Пример: у карты exports есть ключи ".", "./button" и "./package.json".'
    ),
    hint: L(
      'The exports map replaces the old main field for modern tools. The order of the conditions inside one entry matters, because the first match wins.',
      'Карта exports заменяет старое поле main для современных инструментов. Порядок условий внутри одной записи важен, потому что побеждает первое совпадение.'
    ),
    solution: `{
  "name": "@acme/ui-kit",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./button": {
      "types": "./dist/button.d.ts",
      "import": "./dist/button.js"
    },
    "./package.json": "./package.json"
  }
}`,
    explanation: L(
      'The exports field is a whitelist: when it is present, only the paths written in it can be imported from the package, so a deep import into the source folder is impossible. Each entry is a set of conditions, and Node and the bundlers take the first one that matches the environment, which is why types goes first and import comes before require. The type module field marks the package as ESM, the main and module fields are kept for the old tools, and exporting the own package.json is a common courtesy because many tools read it.',
      'Поле exports — это белый список: когда оно есть, из пакета импортируются только пути, перечисленные в нём, поэтому глубокий импорт в исходники невозможен. Каждая запись — набор условий, а Node и сборщики берут первое подходящее окружение, поэтому types идёт первым, а import раньше require. Поле type module помечает пакет как ESM, поля main и module остаются для старых инструментов, а экспорт собственного package.json — вежливость, потому что многие инструменты его читают.'
    ),
  },
  {
    id: 'topic-tooling-3',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'basic',
    title: L('Set up path aliases in tsconfig', 'Настроить алиасы путей в tsconfig'),
    brief: L(
      'Write the compilerOptions block of a tsconfig.json for a project with React. The aliases "@app/*" for "src/app/*" and "@shared/*" for "src/shared/*" must work, which requires a baseUrl. The module resolution must be "bundler", the target must be "ES2023", the DOM library must be included, and the whole strict family of checks must be switched on together with noUnusedLocals and noUnusedParameters. The file must also set "jsx" to "react-jsx" and "verbatimModuleSyntax" to true, it must not emit anything, and it must skip the type checking of the libraries. Example: the paths object contains the keys "@app/*" and "@shared/*".',
      'Напишите блок compilerOptions в tsconfig.json для проекта с React. Алиасы "@app/*" на "src/app/*" и "@shared/*" на "src/shared/*" должны работать, для чего нужен baseUrl. Разрешение модулей должно быть "bundler", цель — "ES2023", библиотека DOM должна быть подключена, а всё семейство строгих проверок должно быть включено вместе с noUnusedLocals и noUnusedParameters. Файл также должен задавать "jsx" в "react-jsx" и "verbatimModuleSyntax" в true, не должен ничего выдавать и должен пропускать проверку типов библиотек. Пример: в объекте paths есть ключи "@app/*" и "@shared/*".'
    ),
    hint: L(
      'The aliases live in compilerOptions.paths and need compilerOptions.baseUrl. The strict flag switches on the whole family of checks at once.',
      'Алиасы живут в compilerOptions.paths и требуют compilerOptions.baseUrl. Флаг strict включает всё семейство строгих проверок сразу.'
    ),
    solution: `{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@shared/*": ["src/shared/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}`,
    explanation: L(
      'The paths option tells the compiler how to read an import, and the bundler needs the same mapping, so the alias has to be configured in both places or the build breaks. The strict flag switches on the whole family of checks at once, and the two noUnused flags find the dead code that survives the refactoring. The noEmit option is required for a project that is bundled by Vite, because the bundler does the work and the compiler only checks. The skipLibCheck option keeps the checking fast, since the types of the libraries rarely change.',
      'Опция paths говорит компилятору, как читать импорт, и сборщику нужно такое же отображение, поэтому алиас настраивают в двух местах, иначе сборка ломается. Флаг strict включает всё семейство строгих проверок сразу, а два флага noUnused находят мёртвый код, переживший рефакторинг. Опция noEmit обязательна для проекта, который собирает Vite, потому что работу делает сборщик, а компилятор только проверяет. Опция skipLibCheck ускоряет проверку, ведь типы библиотек меняются редко.'
    ),
  },
  {
    id: 'topic-tooling-4',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'intermediate',
    title: L('Split the bundle into chunks', 'Разделить бандл на чанки'),
    brief: L(
      'Write a Vite configuration that splits the code of the project into chunks. The React libraries must end up in their own chunk, every other dependency must end up in a shared vendor chunk, and the application code must stay in the entry chunk. The configuration must enable the React plugin and set the build options with the rollup output configuration, and the manual chunks function must decide by the path of the module, so a file from node_modules is a dependency and everything else is the application. Example: the id of a module that contains node_modules/react-dom returns the chunk name "react".',
      'Напишите конфигурацию Vite, которая делит код проекта на чанки. Библиотеки React должны попасть в свой чанк, все остальные зависимости — в общий чанк vendor, а код приложения должен остаться в чанке точки входа. Конфигурация должна включать плагин React и задавать параметры сборки через конфигурацию вывода rollup, а функция manual chunks должна решать по пути модуля: файл из node_modules — это зависимость, а всё остальное — приложение. Пример: id модуля, в пути которого есть node_modules/react-dom, возвращает имя чанка "react".'
    ),
    hint: L(
      'The manualChunks function receives the path of every module, so check it for node_modules and then check the path once more for the React libraries.',
      'Функция manualChunks получает путь каждого модуля, поэтому проверьте его на node_modules, а потом проверьте путь ещё раз на библиотеки React.'
    ),
    solution: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }
          if (id.includes('react-dom') || id.includes('/react/')) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});`,
    explanation: L(
      'Rollup asks the manualChunks function about every module it sees, and the answer is the name of the chunk the module belongs to. The first check keeps the application code in the entry chunk, because the code of the project must be downloaded together with the page. The React libraries go into their own chunk, so a change in an unrelated dependency does not invalidate them in the browser cache, and the rest of the dependencies share the vendor chunk. The dynamic import of a heavy module is what makes the bundler create a separate file for it at all.',
      'Rollup спрашивает функцию manualChunks про каждый модуль, который видит, и ответом является имя чанка, в который попадёт модуль. Первая проверка оставляет код приложения в чанке точки входа, потому что код проекта должен качаться вместе со страницей. Библиотеки React уходят в свой чанк, чтобы изменение посторонней зависимости не сбрасывало их в кеше браузера, а остальные зависимости делят чанк vendor. Именно динамический импорт тяжёлого модуля заставляет сборщик создавать для него отдельный файл.'
    ),
  },
  {
    id: 'topic-tooling-5',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'intermediate',
    title: L('Configure the linter rules', 'Настроить правила линтера'),
    brief: L(
      'Write a flat ESLint configuration file "eslint.config.js" for a project with modern JavaScript and TypeScript. It must use the built-in "js" recommended preset and the recommended preset of typescript-eslint, it must ignore the dist and the coverage folders, and it must set the rules "eqeqeq", "no-var" and "prefer-const" to "error" and "no-console" to "warn". The language options must use the latest ECMAScript version, the source type "module" and the globals of the browser and of Node. Example: the rules object contains the keys "eqeqeq", "no-var", "prefer-const" and "no-console".',
      'Напишите плоский файл конфигурации ESLint "eslint.config.js" для проекта с современным JavaScript и TypeScript. Он должен использовать встроенный пресет "js" и рекомендуемый пресет typescript-eslint, должен игнорировать папки dist и coverage и должен задавать правила "eqeqeq", "no-var" и "prefer-const" со значением "error", а "no-console" со значением "warn". Параметры языка должны использовать последнюю версию ECMAScript, тип исходников "module" и глобальные переменные браузера и Node. Пример: в объекте rules есть ключи "eqeqeq", "no-var", "prefer-const" и "no-console".'
    ),
    hint: L(
      'A flat config is an array of configuration objects. The ignore rules go into their own object with only the ignores key.',
      'Плоская конфигурация — это массив объектов конфигурации. Правила игнорирования живут в отдельном объекте только с ключом ignores.'
    ),
    solution: `import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
];`,
    explanation: L(
      'The flat config is a list of objects that are merged from top to bottom, and the later objects win. The ignore object comes first, so the generated folders are skipped before any rule looks at them. The recommended presets bring the sensible defaults, and the last object only changes what the project wants to be stricter about. The globals are declared instead of the no-undef rule being disabled, so a typo in a variable name is still reported.',
      'Плоская конфигурация — это список объектов, которые сливаются сверху вниз, и последние побеждают. Объект с игнорированием идёт первым, чтобы сгенерированные папки пропускались до того, как правила посмотрят на них. Рекомендуемые пресеты приносят разумные значения по умолчанию, а последний объект меняет только то, что в проекте должно быть строже. Глобальные переменные объявляются, а не отключают правило no-undef, поэтому опечатка в имени переменной всё равно будет найдена.'
    ),
  },
  {
    id: 'topic-tooling-6',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'advanced',
    title: L('Read the configuration from the environment', 'Прочитать конфигурацию из окружения'),
    brief: L(
      'Write a function loadConfig(env) that reads the configuration of a Node.js process from an environment object like process.env and returns an object { port, host, debug, apiKey }. The port comes from PORT and defaults to 3000, and it must be an integer, otherwise the function throws an Error with the message "PORT must be an integer". The host comes from HOST and defaults to "localhost". The debug flag comes from DEBUG: "true" or "1" means true, "false" or "0" means false, a missing value means false, and any other value throws an Error with the message "DEBUG must be true or false". The apiKey comes from API_KEY and is required, so a missing value throws an Error with the message "Missing required environment variable: API_KEY". The function must never write the key to the log. Example: loadConfig({ PORT: "8080", API_KEY: "secret" }) returns { port: 8080, host: "localhost", debug: false, apiKey: "secret" }.',
      'Напишите функцию loadConfig(env), которая читает конфигурацию процесса Node.js из объекта окружения вроде process.env и возвращает объект { port, host, debug, apiKey }. Порт берётся из PORT и по умолчанию равен 3000, при этом он должен быть целым числом, иначе функция бросает Error с сообщением "PORT must be an integer". Хост берётся из HOST и по умолчанию равен "localhost". Флаг debug берётся из DEBUG: "true" или "1" означает true, "false" или "0" означает false, отсутствие значения означает false, а любое другое значение бросает Error с сообщением "DEBUG must be true or false". Ключ apiKey берётся из API_KEY и обязателен, поэтому отсутствие значения бросает Error с сообщением "Missing required environment variable: API_KEY". Функция никогда не должна писать ключ в лог. Пример: loadConfig({ PORT: "8080", API_KEY: "secret" }) возвращает { port: 8080, host: "localhost", debug: false, apiKey: "secret" }.'
    ),
    hint: L(
      'Read every variable through a helper that treats an empty string as missing, and validate the values one by one before returning the object.',
      'Читайте каждую переменную через вспомогательную функцию, которая считает пустую строку отсутствующим значением, и проверяйте значения по одному перед возвратом объекта.'
    ),
    solution: `function readVar(env, name) {
  const value = env[name];
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  return String(value);
}

function loadConfig(env = {}) {
  const rawPort = readVar(env, 'PORT');
  let port = 3000;
  if (rawPort !== undefined) {
    port = Number(rawPort);
    if (!Number.isInteger(port)) {
      throw new Error('PORT must be an integer');
    }
  }

  const host = readVar(env, 'HOST') ?? 'localhost';

  const rawDebug = readVar(env, 'DEBUG');
  let debug = false;
  if (rawDebug !== undefined) {
    if (rawDebug === 'true' || rawDebug === '1') {
      debug = true;
    } else if (rawDebug === 'false' || rawDebug === '0') {
      debug = false;
    } else {
      throw new Error('DEBUG must be true or false');
    }
  }

  const apiKey = readVar(env, 'API_KEY');
  if (apiKey === undefined) {
    throw new Error('Missing required environment variable: API_KEY');
  }

  return { port, host, debug, apiKey };
}

console.log(loadConfig({ PORT: '8080', API_KEY: 'secret' }));
// { port: 8080, host: 'localhost', debug: false, apiKey: 'secret' }`,
    explanation: L(
      'The environment is nothing but a bag of strings, so every value has to be parsed and every missing value has to have a decision. The helper treats an empty string as missing, because a variable that is set but empty usually means the same thing as a variable that is not set at all. The checks throw with a precise message, and the error names the variable, so the problem is obvious in the logs. The key is only read and never printed, because a log line with a secret outlives the machine that wrote it.',
      'Окружение — это просто набор строк, поэтому каждое значение нужно разобрать, а для каждого отсутствующего значения нужно принять решение. Вспомогательная функция считает пустую строку отсутствующим значением, потому что заданная, но пустая переменная обычно означает то же самое, что незаданная. Проверки бросают ошибку с точным сообщением, и в тексте ошибки названа переменная, поэтому проблема сразу видна в логах. Ключ только читается и никогда не печатается, потому что строка лога с секретом живёт дольше машины, которая её написала.'
    ),
  },
  {
    id: 'topic-tooling-7',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'advanced',
    title: L('Write the continuous integration script', 'Написать скрипт непрерывной интеграции'),
    brief: L(
      'Write a bash script "scripts/ci.sh" that runs the pipeline of a project. The script must stop at the first failing command, it must print the name of every step, it must install the dependencies with "npm ci", run the linter, run the tests, build the project and finally print a success line. The script must work when it is called from any folder, so it changes to the root of the repository before it starts, and the shebang must ask for bash. Example: the script starts with "#!/usr/bin/env bash" and the line "set -euo pipefail".',
      'Напишите bash-скрипт "scripts/ci.sh", который запускает конвейер проекта. Скрипт должен останавливаться на первой упавшей команде, должен печатать название каждого шага, должен ставить зависимости через "npm ci", запускать линтер, запускать тесты, собирать проект и в конце печатать строку об успехе. Скрипт должен работать при вызове из любой папки, поэтому перед началом он переходит в корень репозитория, а шебанг должен просить bash. Пример: скрипт начинается с "#!/usr/bin/env bash" и строки "set -euo pipefail".'
    ),
    hint: L(
      'The strict mode set -euo pipefail stops the script on the first error and on an unset variable. A small function can print the name of a step.',
      'Строгий режим set -euo pipefail останавливает скрипт на первой ошибке и на незаданной переменной. Небольшая функция может печатать название шага.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

step() {
  printf '\\n==> %s\\n' "$1"
}

step 'Install dependencies'
npm ci

step 'Lint'
npm run lint

step 'Test'
npm run test

step 'Build'
npm run build

printf '\\nCI passed\\n'`,
    explanation: L(
      'The strict mode is the important part of the script. The -e flag stops the script when a command fails, so a failing test never lets the build run and hide the problem, and the -u flag catches a typo in the name of a variable. The pipefail option extends the same idea to pipes, where the exit code of the last command is not enough. Changing to the folder of the repository makes the script independent of the folder it was called from, and printing the name of every step tells the reader in the log where the pipeline stopped.',
      'Строгий режим — самая важная часть скрипта. Флаг -e останавливает скрипт, когда команда падает, поэтому упавший тест не даст сборке пройти и спрятать проблему, а флаг -u ловит опечатку в имени переменной. Опция pipefail расширяет ту же идею на пайпы, где кода возврата последней команды недостаточно. Переход в папку репозитория делает скрипт независимым от того, откуда его вызвали, а печать названия каждого шага подсказывает читателю лога, где остановился конвейер.'
    ),
  },
  {
    id: 'topic-tooling-8',
    moduleId: 'js-core',
    topic: 'tooling',
    level: 'advanced',
    title: L('Check the version ranges of the dependencies', 'Проверить диапазоны версий зависимостей'),
    brief: L(
      'Write a function checkDependencies(pkg) that takes the parsed package.json of a project and returns an array of strings with one message per problem. A version of a dependency or of a dev dependency must start with "^" or with "~" or be an exact version like 1.2.3, and a range such as "latest", "*", ">=1.0.0" or "file:../local" is a problem reported as "name: unsupported version range \\"range\\"". A runtime dependency must use a caret range, so an exact version or a tilde is a problem reported as "name: runtime dependency must use a caret range". A dev dependency must use a caret or a tilde range, so an exact version is a problem reported as "name: dev dependency must use a caret or a tilde range". A package that is listed in both dependencies and devDependencies is a problem reported as "name: listed in both dependencies and devDependencies". The function returns an empty array when the package is fine. Example: checkDependencies({ dependencies: { react: "^19.0.0" }, devDependencies: { vite: "^8.0.0" } }) returns an empty array.',
      'Напишите функцию checkDependencies(pkg), которая берёт разобранный package.json проекта и возвращает массив строк, по одной на каждую проблему. Версия зависимости или dev-зависимости должна начинаться с "^" или с "~" или быть точной версией вроде 1.2.3, а диапазон вроде "latest", "*", ">=1.0.0" или "file:../local" — это проблема с сообщением "name: unsupported version range \\"range\\"". Рантайм-зависимость должна использовать диапазон с кареткой, поэтому точная версия или тильда — проблема с сообщением "name: runtime dependency must use a caret range". Dev-зависимость должна использовать каретку или тильду, поэтому точная версия — проблема с сообщением "name: dev dependency must use a caret or a tilde range". Пакет, указанный одновременно в dependencies и devDependencies, — проблема с сообщением "name: listed in both dependencies and devDependencies". Функция возвращает пустой массив, если с пакетом всё в порядке. Пример: checkDependencies({ dependencies: { react: "^19.0.0" }, devDependencies: { vite: "^8.0.0" } }) возвращает пустой массив.'
    ),
    hint: L(
      'One helper that checks a single name and range keeps the rules in one place, and the list of the names of the dependencies is enough to detect a package that is in both lists.',
      'Одна вспомогательная функция для проверки имени и диапазона держит все правила в одном месте, а список имён зависимостей достаточен, чтобы найти пакет, указанный в обоих списках.'
    ),
    solution: `const EXACT_VERSION = /^\\d+\\.\\d+\\.\\d+([-+][\\w.]+)?$/;

function checkDependencies(pkg = {}) {
  const problems = [];
  const dependencies = pkg.dependencies || {};
  const devDependencies = pkg.devDependencies || {};

  const check = (name, range, isDev) => {
    if (typeof range !== 'string' || range.trim() === '') {
      problems.push(name + ': unsupported version range "' + String(range) + '"');
      return;
    }

    if (range.startsWith('^')) return;

    if (isDev) {
      if (range.startsWith('~')) return;
      if (EXACT_VERSION.test(range)) {
        problems.push(name + ': dev dependency must use a caret or a tilde range');
        return;
      }
    } else {
      if (EXACT_VERSION.test(range)) {
        problems.push(name + ': runtime dependency must use a caret range');
        return;
      }
    }

    problems.push(name + ': unsupported version range "' + range + '"');
  };

  for (const name of Object.keys(dependencies)) {
    check(name, dependencies[name], false);
  }

  for (const name of Object.keys(devDependencies)) {
    check(name, devDependencies[name], true);
  }

  for (const name of Object.keys(dependencies)) {
    if (Object.prototype.hasOwnProperty.call(devDependencies, name)) {
      problems.push(name + ': listed in both dependencies and devDependencies');
    }
  }

  return problems;
}

console.log(checkDependencies({ dependencies: { react: '^19.0.0' }, devDependencies: { vite: '^8.0.0' } })); // []`,
    explanation: L(
      'The function is a small policy checker that runs before the release, and it works on the parsed package.json, so it does not care how the file was read. The caret is accepted everywhere, because it allows the bug fixes and the minor updates but not the breaking changes, and the tilde is only allowed for the dev dependencies, where a stuck version is harmless. The exact version is recognised by the regular expression, and a range that is not a version at all falls through to the last message, so a file path or a git url can never sneak into the list.',
      'Функция — это небольшая проверка политики, которая запускается перед релизом, и работает она с разобранным package.json, поэтому ей всё равно, как файл прочитали. Каретка принимается везде, потому что разрешает исправления и минорные обновления, но не ломающие изменения, а тильда разрешена только для dev-зависимостей, где застрявшая версия не страшна. Точная версия распознаётся регулярным выражением, а диапазон, который вообще не версия, проваливается в последнее сообщение, поэтому путь к файлу или ссылка на git не смогут проскочить в список.'
    ),
  },
];
