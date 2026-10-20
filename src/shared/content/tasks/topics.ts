import type { LocalizedText, PracticeTopicId } from '../../../entities/module/model/types';

export interface PracticeTopicMeta {
  id: PracticeTopicId;
  code: string;
  title: LocalizedText;
  description: LocalizedText;
}

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const practiceTopics: PracticeTopicMeta[] = [
  {
    id: 'markup',
    code: 'MKT',
    title: L('HTML and CSS', 'HTML и CSS'),
    description: L(
      'Semantics, accessibility, layout, responsive design and CSS architecture.',
      'Семантика, доступность, раскладка, адаптивность и архитектура CSS.'
    ),
  },
  {
    id: 'loops',
    code: 'LP',
    title: L('Loops and iteration', 'Циклы и итерации'),
    description: L(
      'for, while, nested loops, breaking patterns and iteration over collections.',
      'for, while, вложенные циклы, управление циклом и обход коллекций.'
    ),
  },
  {
    id: 'functions',
    code: 'FN',
    title: L('Functions and closures', 'Функции и замыкания'),
    description: L(
      'Arguments, recursion, closures, higher-order functions and pure functions.',
      'Аргументы, рекурсия, замыкания, функции высшего порядка и чистые функции.'
    ),
  },
  {
    id: 'arrays',
    code: 'ARR',
    title: L('Arrays and collections', 'Массивы и коллекции'),
    description: L(
      'map, filter, reduce, sorting, Set, Map and array edge cases.',
      'map, filter, reduce, сортировка, Set, Map и граничные случаи.'
    ),
  },
  {
    id: 'objects',
    code: 'OBJ',
    title: L('Objects and classes', 'Объекты и классы'),
    description: L(
      'Properties, prototypes, classes, immutability and copying objects.',
      'Свойства, прототипы, классы, иммутабельность и копирование объектов.'
    ),
  },
  {
    id: 'strings',
    code: 'STR',
    title: L('Strings and regex', 'Строки и регулярные выражения'),
    description: L(
      'Template strings, parsing, validation and regular expressions.',
      'Шаблонные строки, разбор, валидация и регулярные выражения.'
    ),
  },
  {
    id: 'numbers',
    code: 'NUM',
    title: L('Numbers, math and dates', 'Числа, математика и даты'),
    description: L(
      'Rounding, money, floating point, dates and formatting.',
      'Округление, деньги, вещественные числа, даты и форматирование.'
    ),
  },
  {
    id: 'types',
    code: 'TYP',
    title: L('Types and coercion', 'Типы и приведение'),
    description: L(
      'typeof, null vs undefined, truthy/falsy and type conversion rules.',
      'typeof, null против undefined, truthy/falsy и правила приведения типов.'
    ),
  },
  {
    id: 'async',
    code: 'ASY',
    title: L('Async and promises', 'Асинхронность и промисы'),
    description: L(
      'async/await, promise chains, parallel work, cancellation and timeouts.',
      'async/await, цепочки промисов, параллельные запросы, отмена и таймауты.'
    ),
  },
  {
    id: 'dom',
    code: 'DOM',
    title: L('DOM and events', 'DOM и события'),
    description: L(
      'Element lookup, event phases, delegation, forms and the browser APIs.',
      'Поиск элементов, фазы событий, делегирование, формы и API браузера.'
    ),
  },
  {
    id: 'errors',
    code: 'ERR',
    title: L('Errors and debugging', 'Ошибки и отладка'),
    description: L(
      'try/catch, custom errors, stack traces, logging and defensive coding.',
      'try/catch, кастомные ошибки, стектрейсы, логи и защитное программирование.'
    ),
  },
  {
    id: 'algorithms',
    code: 'ALG',
    title: L('Algorithms and data structures', 'Алгоритмы и структуры данных'),
    description: L(
      'Stacks, queues, hash maps, binary search, sorting and complexity.',
      'Стек, очередь, хеш-таблицы, бинарный поиск, сортировки и сложность.'
    ),
  },
  {
    id: 'git',
    code: 'GIT',
    title: L('Git and versioning', 'Git и версионирование'),
    description: L(
      'Branches, rebase, undo, tags, bisect and team workflows.',
      'Ветки, rebase, откат, теги, bisect и рабочие процессы в команде.'
    ),
  },
  {
    id: 'cli',
    code: 'CLI',
    title: L('Shell and automation', 'Shell и автоматизация'),
    description: L(
      'Search, pipes, permissions, archives, scripts and process control.',
      'Поиск, пайпы, права доступа, архивы, скрипты и управление процессами.'
    ),
  },
  {
    id: 'oop',
    code: 'OOP',
    title: L('OOP and patterns', 'ООП и паттерны'),
    description: L(
      'Encapsulation, SOLID, strategy, repository, decorator and composition.',
      'Инкапсуляция, SOLID, стратегия, репозиторий, декоратор и композиция.'
    ),
  },
  {
    id: 'http',
    code: 'HTTP',
    title: L('HTTP and REST', 'HTTP и REST'),
    description: L(
      'Methods, status codes, caching, CORS, WebSocket and API design.',
      'Методы, коды ответов, кэширование, CORS, WebSocket и проектирование API.'
    ),
  },
  {
    id: 'security',
    code: 'SEC',
    title: L('Web security', 'Безопасность'),
    description: L(
      'XSS, CSRF, tokens, cookies, secrets and safe input handling.',
      'XSS, CSRF, токены, cookies, секреты и безопасная работа с вводом.'
    ),
  },
  {
    id: 'typescript',
    code: 'TS',
    title: L('TypeScript types', 'Типы TypeScript'),
    description: L(
      'Interfaces, unions, function typing, narrowing and module boundaries.',
      'Интерфейсы, объединения, типизация функций, сужение и границы модулей.'
    ),
  },
  {
    id: 'ts-advanced',
    code: 'TS+',
    title: L('Advanced TypeScript', 'Продвинутый TypeScript'),
    description: L(
      'Generics, mapped and conditional types, guards, infer and branded types.',
      'Дженерики, mapped/conditional типы, guards, infer и брендированные типы.'
    ),
  },
  {
    id: 'react',
    code: 'RCT',
    title: L('React components and rendering', 'React: компоненты и рендер'),
    description: L(
      'JSX, props, keys, composition, context and error boundaries.',
      'JSX, пропсы, ключи, композиция, контекст и границы ошибок.'
    ),
  },
  {
    id: 'hooks',
    code: 'HK',
    title: L('React hooks and effects', 'React: хуки и эффекты'),
    description: L(
      'useState, useEffect, dependencies, cleanup, refs and custom hooks.',
      'useState, useEffect, зависимости, cleanup, refs и кастомные хуки.'
    ),
  },
  {
    id: 'forms',
    code: 'FRM',
    title: L('React forms', 'React: формы'),
    description: L(
      'Controlled fields, validation, useReducer and async submits.',
      'Контролируемые поля, валидация, useReducer и асинхронная отправка.'
    ),
  },
  {
    id: 'react-perf',
    code: 'PRF',
    title: L('React performance', 'React: производительность'),
    description: L(
      'memo, transitions, virtualization, code splitting and profiling.',
      'memo, переходы, виртуализация, разделение кода и профилирование.'
    ),
  },
  {
    id: 'redux',
    code: 'RTK',
    title: L('Redux Toolkit', 'Redux Toolkit'),
    description: L(
      'Slices, selectors, thunks, entity adapter and RTK Query caching.',
      'Слайсы, селекторы, thunk, entity adapter и кэш RTK Query.'
    ),
  },
  {
    id: 'router',
    code: 'RTR',
    title: L('Routing', 'Роутинг'),
    description: L(
      'Params, loaders, actions, guards, nested routes and scroll restoration.',
      'Параметры, loaders, actions, guards, вложенные маршруты и скролл.'
    ),
  },
  {
    id: 'next',
    code: 'NXT',
    title: L('Next.js', 'Next.js'),
    description: L(
      'Server components, caching, server actions, streaming and metadata.',
      'Серверные компоненты, кэш, server actions, стриминг и метаданные.'
    ),
  },
  {
    id: 'testing',
    code: 'TST',
    title: L('Testing', 'Тестирование'),
    description: L(
      'Unit tests, React Testing Library, mocks, TDD and useful coverage.',
      'Юнит-тесты, React Testing Library, моки, TDD и полезное покрытие.'
    ),
  },
  {
    id: 'tooling',
    code: 'TOL',
    title: L('Build and tooling', 'Сборка и туллинг'),
    description: L(
      'Modules, bundlers, linters, npm scripts, environment variables and CI.',
      'Модули, бандлеры, линтеры, npm-скрипты, переменные окружения и CI.'
    ),
  },
  {
    id: 'architecture',
    code: 'ARC',
    title: L('Application architecture', 'Архитектура приложений'),
    description: L(
      'Layers, module boundaries, ports and adapters, events, resilience and observability.',
      'Слои, границы модулей, порты и адаптеры, события, отказоустойчивость и наблюдаемость.'
    ),
  },
];
