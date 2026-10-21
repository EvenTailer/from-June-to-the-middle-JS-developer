import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh03: Chapter = {
  id: 'architecture-ch3',
  title: L('Module boundaries and feature-based architecture', 'Границы модулей и архитектура по фичам'),
  summary: L(
    'How to organise a codebase by feature, what the public API of a module is and why an explicit index enforces it, what barrels break, how import cycles are found and boundaries are enforced in CI, and what deserves to be shared.',
    'Как организовать кодовую базу по фичам, что такое публичный API модуля и почему его делает явный index-файл, что ломают баррели, как находят циклы импортов и контролируют границы в CI и что должно быть общим кодом.'
  ),
  sections: [
    {
      id: 'architecture-ch3-s1',
      title: L('Folders by feature', 'Папки по фичам'),
      body: L(
        'A feature folder holds everything one capability needs: its UI, its use cases, its domain objects and its adapters. The alternative, a tree of /components, /hooks, /services and /utils, spreads the same capability across the whole repository, so one change touches many folders and the reviewer has to reconstruct the feature from pieces. The feature folder turns a capability into a directory that can be opened, read and deleted.\n\nInside the feature the layers still apply. The checkout folder has its own ui, use-cases, domain and data subfolders, and the dependency direction between them is exactly the same as in the rest of the codebase. This is the point of organising by feature and by layer at the same time: the two axes are orthogonal, and the feature is the vertical slice that cuts through all of them.\n\nThe rule that keeps the slices clean is that a feature never imports the internals of another feature. If checkout needs something from billing, it imports the public API of billing, the small set of symbols that folder exports on purpose. This is the rule that makes the boundaries real rather than decorative, and it is the one rule a tool can check.\n\nThe shared folder sits outside all features and holds what has no business meaning: the HTTP client, the logger, the money formatting, the date helpers. Anything that mentions a specific business concept belongs to the concept of that feature, even if a second feature also needs it. Duplicating ten lines is cheaper than a shared helper that quietly couples two features that were supposed to stay independent.',
        'Папка фичи содержит всё, что нужно одной возможности: её UI, её сценарии, её доменные объекты и её адаптеры. Альтернатива, дерево из /components, /hooks, /services и /utils, размазывает ту же возможность по всему репозиторию, поэтому одно изменение трогает много папок, а ревьюеру приходится собирать фичу по кускам. Папка фичи превращает возможность в каталог, который можно открыть, прочитать и удалить.\n\nВнутри фичи правила слоёв по-прежнему работают. Папка checkout имеет свои ui, use-cases, domain и data, и направление зависимостей между ними такое же, как во всей остальной кодовой базе. В этом и состоит смысл одновременной организации по фичам и по слоям: оси ортогональны, а фича — это вертикальный срез, проходящий через все слои.\n\nПравило, которое держит срезы чистыми: фича никогда не импортирует внутренности другой фичи. Если checkout чего-то хочет от billing, он импортирует публичный API billing — тот небольшой набор символов, который папка экспортирует намеренно. Именно это правило делает границы настоящими, а не декоративными, и именно его умеет проверять инструмент.\n\nПапка shared лежит вне всех фич и содержит то, у чего нет бизнес-смысла: HTTP-клиент, логгер, форматирование денег, хелперы дат. Всё, что упоминает конкретную бизнес-концепцию, принадлежит фиче этой концепции, даже если вторая фича тоже это нужно. Дублировать десять строк дешевле, чем завести общий хелпер, который незаметно связывает две фичи, которыми предполагалось независимо.'
      ),
      bullets: [
        L('A feature folder holds the whole vertical slice of one capability.', 'Папка фичи содержит весь вертикальный срез одной возможности.'),
        L('The layers live inside the feature, the dependency direction is unchanged.', 'Слои живут внутри фичи, направление зависимостей не меняется.'),
        L('A feature imports another feature public API, never its internals.', 'Фича импортирует публичный API другой фичи и никогда — её внутренности.'),
        L('Shared code carries no business meaning of its own.', 'Общий код не несёт собственного бизнес-смысла.'),
        L('Duplicating a small helper is cheaper than coupling two features.', 'Дублирование маленького хелпера дешевле, чем связывание двух фич.'),
      ],
      code: `// src/
//   features/
//     checkout/
//       ui/            CheckoutPage.tsx, CartSummary.tsx
//       use-cases/     placeOrder.ts, addLine.ts
//       domain/        order.ts, money.ts
//       data/          checkoutRepository.ts
//       index.ts       // the public API of the feature
//     billing/
//       ui/
//       use-cases/
//       domain/
//       data/
//       index.ts
//   shared/
//     http/            httpClient.ts
//     logger/          logger.ts
//   app/
//     composition-root.ts
//     routes.tsx`,
      table: {
        caption: L('Two ways to organise the same code', 'Два способа организовать один и тот же код'),
        headers: [L('Criterion', 'Критерий'), L('Folders by type', 'Папки по типам'), L('Folders by feature', 'Папки по фичам')],
        rows: [
          [
            L('Unit of navigation', 'Единица навигации'),
            L('a technical role', 'техническая роль'),
            L('a business capability', 'бизнес-возможность'),
          ],
          [
            L('Files touched by one change', 'Файлы одного изменения'),
            L('many folders', 'много папок'),
            L('one folder', 'одна папка'),
          ],
          [
            L('Shared code', 'Общий код'),
            L('mixed with the feature code', 'смешан с кодом фич'),
            L('one place outside the features', 'одно место вне фич'),
          ],
          [
            L('Boundary that can be enforced', 'Граница, которую можно проверить'),
            L('the layer', 'слой'),
            L('the public API of a feature', 'публичный API фичи'),
          ],
        ],
      },
      takeaway: L(
        'A feature folder holds the whole slice of one capability, and it imports other features only through their public API.',
        'Папка фичи держит весь срез одной возможности и импортирует другие фичи только через их публичный API.'
      ),
      seeAlso: [
        L('Section 1-2: two axes of organisation', 'Секция 1-2: две оси организации'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
        L('Section 3-5: shared code versus feature code', 'Секция 3-5: общий код против кода фичи'),
      ],
    },
    {
      id: 'architecture-ch3-s2',
      title: L('The public API of a module', 'Публичный API модуля'),
      body: L(
        'The public API of a module is the set of symbols other parts of the system are allowed to use. It is not the set of files that exist. A module with twelve files and three exported symbols has a small API, and that is the goal: every exported symbol is a promise that the rest of the system may rely on, and a promise that costs something to break.\n\nAn explicit index file is what makes the API explicit. The index of the billing module re-exports the two functions and the three types that other modules may use, and nothing else. Everything else stays private to the module and can be refactored freely, because no other module can reach it. Without that file any file can be imported directly, and the API becomes whatever the import graph happens to expose.\n\nThe index also decides the direction of the dependency. A consumer writes an import from the module folder, not from a file inside it. If the internals are reachable, the consumer will reach them, because reaching one level deeper is one keystroke away and saves a line in the export list. The public API is only a boundary if the internals are genuinely unreachable.\n\nA good public API is small, stable and expressed in the vocabulary of the consumer. Billing exports issueInvoice and InvoiceStatus, not a database row type and a SQL fragment. When the exported type carries the shape of the storage, the storage has entered the contract, and every schema change becomes a breaking change for every consumer.',
        'Публичный API модуля — это набор символов, которые остальной системе разрешено использовать. Это не набор существующих файлов. Модуль из двенадцати файлов с тремя экспортируемыми символами имеет маленький API, и это цель: каждый экспортируемый символ — обещание, на которое остальная система может рассчитывать, и обещание, за нарушение которого потом платят.\n\nЯвный index-файл и делает API явным. Index модуля billing реэкспортирует две функции и три типа, которые другим модулям использовать можно, и больше ничего. Всё остальное остаётся приватным внутри модуля и переделывается свободно, потому что до него никто другой дотянуться не может. Без такого файла импортировать можно любой файл напрямую, и API становится тем, что случайно открыл граф импортов.\n\nIndex также задаёт направление зависимости. Потребитель пишет импорт из папки модуля, а не из файла внутри неё. Если внутренности достижимы, потребитель до них дотянется: заглянуть на уровень глубже — один шаг, а в списке экспортов придётся сэкономить строчку. Публичный API — это граница только тогда, когда во внутренности действительно нельзя попасть.\n\nХороший публичный API маленький, стабильный и выражен в словаре потребителя. Billing экспортирует issueInvoice и InvoiceStatus, а не тип строки базы и не фрагмент SQL. Когда экспортируемый тип несёт форму хранилища, хранилище попадает в контракт, и каждое изменение схемы становится ломающим изменением для каждого потребителя.'
      ),
      bullets: [
        L('The public API is the set of symbols other modules may use.', 'Публичный API — это набор символов, доступных другим модулям.'),
        L('An explicit index file is what makes the API enforceable.', 'Явный index-файл и делает API контролируемым.'),
        L('Reachable internals make the boundary decorative.', 'Достижимые внутренности делают границу декоративной.'),
        L('Every exported symbol is a promise to the rest of the system.', 'Каждый экспортируемый символ — обещание всей системе.'),
        L('Export domain vocabulary, not the shape of the storage.', 'Экспортируй словарь домена, а не форму хранилища.'),
      ],
      code: `// features/billing/domain/invoice.ts
export interface Invoice { id: string; status: 'issued' | 'paid' }

// features/billing/use-cases/issue-invoice.ts
export async function issueInvoice(id: string): Promise<Invoice> {
  return { id, status: 'issued' };
}

// features/billing/index.ts - the public API of the module
// export { issueInvoice } from './use-cases/issue-invoice';
// export type { Invoice } from './domain/invoice';

// A consumer imports the public API, never the internals:
// import { issueInvoice } from '../billing';`,
      callouts: [
        {
          tone: 'warning',
          title: L('The barrel that exports everything', 'Баррель, экспортирующий всё'),
          text: L(
            'A file that starts with export * from every folder in the module makes the whole module public and hides where a symbol really comes from. Name the exports instead: the list then doubles as the documentation of the module.',
            'Файл, начинающийся с export * from для каждой папки модуля, делает публичным весь модуль и прячет, откуда на самом деле пришёл символ. Перечисляйте экспорты по именам: список тогда же работает и документацией модуля.'
          ),
        },
      ],
      takeaway: L(
        'The public API is what the module promises, and an explicit index file is the only thing that keeps the promise honest.',
        'Публичный API — это обещание модуля, и только явный index-файл делает обещание честным.'
      ),
      seeAlso: [
        L('Section 3-3: barrels and their downsides', 'Секция 3-3: баррели и их подвох'),
        L('Section 3-5: shared code versus feature code', 'Секция 3-5: общий код против кода фичи'),
        L('Section 2-3: ports and adapters', 'Секция 2-3: порты и адаптеры'),
      ],
    },
    {
      id: 'architecture-ch3-s3',
      title: L('Barrels and their downsides', 'Баррели и их подвох'),
      body: L(
        'A barrel is an index file that re-exports the contents of a folder. It gives the module one entry point, and that is genuinely useful: the consumer imports from one place and the internals can be rearranged behind it. The problem starts when the barrel re-exports everything, because the module then advertises every internal symbol as public.\n\nThe first problem is cycles. A barrel that re-exports from both directions makes an import cycle possible, and a cycle between two modules means the order in which the module bodies are evaluated decides which one sees a partially initialised export. In JavaScript this shows up as an undefined value that used to be defined, and the bug appears only after a refactor moved a line.\n\nThe second problem is tree shaking. A barrel pulls every re-exported module into the graph of whoever imports it, because the bundler has to know the full export list before it can drop the unused ones. In development with a barrel of two hundred modules the rebuild is slower, and the browser devtools show a graph with far more edges than the application actually needs.\n\nBoth problems have the same cure: an explicit barrel that exports only what is public. If the file lists its exports by name, the module keeps a small API, the bundler can drop the rest and a cycle needs an explicit re-export to appear. The cost is that the index file has to be maintained, and that is the point: the moment somebody adds a line to it, they have made a decision about what the module promises to the rest of the system.',
        'Баррель — это index-файл, который реэкспортирует содержимое папки. Он даёт модулю одну точку входа, и это действительно полезно: потребитель импортирует из одного места, а внутренности за баррелем можно переставлять. Проблема начинается, когда баррель реэкспортирует всё: тогда модуль объявляет публичными все внутренние символы.\n\nПервая проблема — циклы. Баррель, реэкспортирующий в обе стороны, делает циклическую зависимость возможной, а цикл между двумя модулями означает, что порядок вычисления тел модулей решает, кто увидит частично заполненный экспорт. В JavaScript это проявляется как undefined вместо значения, которое раньше было, и баг всплывает только после того, как рефакторинг сдвинул строку.\n\nВторая проблема — tree shaking. Баррель втягивает каждый реэкспортируемый модуль в граф того, кто его импортирует, потому что сборщику нужно знать полный список экспортов, прежде чем выбросить неиспользуемые. При барреле на двести модулей в разработке пересборка медленнее, а в devtools браузера виден граф с кучей рёбер, которых приложению не нужно.\n\nОбе проблемы лечатся одинаково: явный баррель, экспортирующий только публичное. Если файл перечисляет экспорты по именам, модуль сохраняет маленький API, сборщик может выбросить остальное, а для появления цикла нужна явная реэкспортная строка. Цена — index-файл приходится поддерживать, и в этом весь смысл: кто добавил в него строку, тот принял решение о том, что модуль обещает системе.'
      ),
      bullets: [
        L('A barrel gives a module one entry point, a wide barrel gives it a huge API.', 'Баррель даёт модулю одну точку входа, широкий баррель — огромный API.'),
        L('Re-exporting everything makes import cycles possible.', 'Реэкспорт всего делает возможными циклы импортов.'),
        L('A cycle between modules turns into an undefined value at run time.', 'Цикл между модулями превращается в undefined во время выполнения.'),
        L('A barrel of everything hurts tree shaking and slows the build.', 'Баррель всего мешает tree shaking и замедляет сборку.'),
        L('An explicit barrel is maintained on purpose, and that is the point.', 'Явный баррель поддерживается намеренно, и в этом его смысл.'),
      ],
      code: `// features/billing/index.ts - explicit, the module promises exactly this
// export { issueInvoice } from './use-cases/issue-invoice';
// export { previewInvoice } from './use-cases/preview-invoice';
// export type { Invoice, InvoiceStatus } from './domain/invoice';

// features/billing/index.ts - wide, every internal symbol becomes public
// export * from './use-cases/issue-invoice';
// export * from './use-cases/preview-invoice';
// export * from './domain/invoice';
// export * from './data/billing-repository';

// Read the barrel to learn what the module actually exposes.
export function publicApi(barrelSource: string): string[] {
  const names = [...barrelSource.matchAll(/export\\s+(?:type\\s+)?\\{([^}]+)\\}/g)]
    .flatMap((match) => match[1].split(','))
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  return names;
}`,
      table: {
        caption: L('Explicit barrel versus wide barrel', 'Явный баррель против широкого'),
        headers: [L('Property', 'Свойство'), L('Explicit barrel', 'Явный баррель'), L('Wide barrel', 'Широкий баррель')],
        rows: [
          [
            L('Size of the public API', 'Размер публичного API'),
            L('what is listed', 'что перечислено'),
            L('every internal symbol', 'все внутренние символы'),
          ],
          [
            L('Chance of a cycle', 'Шанс цикла'),
            L('needs an explicit re-export', 'нужен явный реэкспорт'),
            L('easy to create', 'создаётся легко'),
          ],
          [
            L('Tree shaking', 'Tree shaking'),
            L('unused modules are dropped', 'неиспользуемое отбрасывается'),
            L('the whole folder is pulled in', 'вся папка попадает в граф'),
          ],
          [
            L('Cost of maintenance', 'Цена поддержки'),
            L('the export list is reviewed', 'список экспортов ревьюится'),
            L('none, until it breaks', 'нет, пока не сломается'),
          ],
        ],
      },
      takeaway: L(
        'Keep the barrel explicit: name the exports, and the module stays small, cycle-free and tree-shakeable.',
        'Держи баррель явным: перечисляй экспорты по именам — и модуль остаётся маленьким, без циклов и с работающим tree shaking.'
      ),
      seeAlso: [
        L('Section 3-4: cycles and enforced boundaries', 'Секция 3-4: циклы и контролируемые границы'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
      ],
    },
    {
      id: 'architecture-ch3-s4',
      title: L('Cycles and enforced boundaries', 'Циклические зависимости и контроль границ'),
      body: L(
        'A cycle is a set of modules that import each other, directly or through barrels. It is the defect that layering exists to prevent, because it means two modules can no longer be understood, changed or tested one at a time. The rule is simple to state: the import graph must stay a directed acyclic graph, and every edge must go from a module to a module it is allowed to depend on.\n\nDetecting a cycle is a graph problem, and it is small enough to write yourself. Collect the imports of every file, build the graph, and run a depth-first search with a set of the nodes on the current path; when the search reaches a node that is already on the path, a cycle has been found. The same is available off the shelf: madge for Node projects, dependency-cruiser for policies, and ESLint plugins for the no-cycle rule.\n\nDetecting cycles is not the same as enforcing boundaries. The cycle rule answers one question: is the graph acyclic? The boundary rule answers a different one: is this file allowed to import that other file? ESLint plugins such as boundaries and import/no-restricted-paths express the second question directly, and a dependency-cruiser configuration can express both the allowed direction and the forbidden pairs.\n\nWhatever tool you choose, the rule has to run in CI. A boundary that is checked only in review is checked by whoever happens to remember, and the violations accumulate in the files nobody looks at. A build that fails on a new import from one feature into the internals of another is the cheapest possible enforcement, and it turns the boundary into a fact rather than a convention.',
        'Цикл — это набор модулей, которые импортируют друг друга, напрямую или через баррели. Это дефект, ради которого существуют слои, потому что из-за него два модуля больше нельзя понять, изменить или протестировать по отдельности. Правило звучит просто: граф импортов должен оставаться ациклическим, и каждое ребро должно вести от модуля к модулю, от которого ему зависеть разрешено.\n\nПоиск цикла — это задача на графах, и её достаточно мало, чтобы написать самому. Соберите импорты всех файлов, постройте граф и выполните обход в глубину с множеством вершин текущего пути: если обход пришёл в вершину, которая уже на пути, цикл найден. То же есть и готовым: madge для Node-проектов, dependency-cruiser для политик, плагины ESLint для правила no-cycle.\n\nПоиск циклов и контроль границ — не одно и то же. Правило циклов отвечает на один вопрос: ацикличен ли граф? Правило границ отвечает на другой: разрешено ли этому файлу импортировать тот? Плагины ESLint вида boundaries и import/no-restricted-paths формулируют второй вопрос напрямую, а конфигурация dependency-cruiser умеет выразить и разрешённое направление, и запрещённые пары.\n\nКакой бы инструмент вы ни выбрали, правило должно работать в CI. Граница, которую проверяют только на ревью, проверяется тем, кто вспомнил, а нарушения копятся в файлах, куда никто не заглядывает. Сборка, которая падает на новом импорте из одной фичи во внутренности другой, — самая дешёвая проверка, и она превращает границу из соглашения в факт.'
      ),
      bullets: [
        L('A cycle means two modules cannot be changed or tested one at a time.', 'Цикл означает, что два модуля нельзя менять или тестировать по одному.'),
        L('The import graph must stay a directed acyclic graph.', 'Граф импортов должен оставаться ациклическим.'),
        L('Cycle detection is a depth-first search with a set of nodes on the path.', 'Поиск цикла — это обход в глубину с множеством вершин на пути.'),
        L('Detecting cycles and enforcing boundaries are two different questions.', 'Поиск циклов и контроль границ — это два разных вопроса.'),
        L('The rule has to run in CI, otherwise it is only a convention.', 'Правило должно работать в CI, иначе это просто соглашение.'),
      ],
      code: `// Build the import graph and report every cycle in it.
export function findCycles(graph: Record<string, string[]>): string[][] {
  const cycles: string[][] = [];
  const path: string[] = [];
  const onPath = new Set<string>();

  function visit(node: string): void {
    if (onPath.has(node)) {
      cycles.push([...path.slice(path.indexOf(node)), node]);
      return;
    }
    onPath.add(node);
    path.push(node);
    for (const next of graph[node] ?? []) visit(next);
    path.pop();
    onPath.delete(node);
  }

  for (const node of Object.keys(graph)) visit(node);
  return cycles;
}`,
      table: {
        caption: L('What each tool answers', 'На что отвечает каждый инструмент'),
        headers: [L('Tool', 'Инструмент'), L('Question', 'Вопрос'), L('Runs where', 'Где работает')],
        rows: [
          [
            L('madge', 'madge'),
            L('is the import graph acyclic', 'ацикличен ли граф импортов'),
            L('in CI', 'в CI'),
          ],
          [
            L('dependency-cruiser', 'dependency-cruiser'),
            L('which edges are allowed', 'какие рёбра разрешены'),
            L('in CI and in the editor', 'в CI и в редакторе'),
          ],
          [
            L('eslint boundaries', 'eslint boundaries'),
            L('may this file import that one', 'может ли этот файл импортировать тот'),
            L('in the editor and in CI', 'в редакторе и в CI'),
          ],
          [
            L('A test over the import graph', 'Тест по графу импортов'),
            L('did a rule break', 'нарушено ли правило'),
            L('as a normal test', 'как обычный тест'),
          ],
        ],
      },
      takeaway: L(
        'Detect cycles and enforce boundaries in CI, because a boundary that only review checks is a convention that decays.',
        'Лови циклы и контролируй границы в CI: граница, которую проверяет только ревью, — это соглашение, которое размывается.'
      ),
      seeAlso: [
        L('Section 3-3: barrels and their downsides', 'Секция 3-3: баррели и их подвох'),
        L('Section 1-5: layer violations and how to spot them', 'Секция 1-5: нарушения слоёв и как их замечать'),
        L('Section 5-6: testing the architecture with dependency rules', 'Секция 5-6: тестирование архитектуры правилами зависимостей'),
      ],
    },
    {
      id: 'architecture-ch3-s5',
      title: L('Shared code versus feature code', 'Общий код против кода фичи'),
      body: L(
        'Shared code is code that two or more features use and that carries no business meaning of its own: a date formatter, an HTTP client, a logger, a money type. Feature code knows about a capability: an order, an invoice, a subscription. The mistake is moving business code into shared because it is used by two features. The moment a helper in /shared imports the order model, it stops being shared and becomes a dependency that runs in both directions.\n\nThe test for the shared folder is the delete test. Delete the feature and see what breaks. If something outside the feature depended on it, the boundary was already broken. The second test is the vocabulary test: if a shared symbol has a business word in its name, it belongs to a feature. A shared module called InvoiceTotals is not shared, it is billing with a confusing address.\n\nWhen two features genuinely need the same rule, the honest options are to move the rule into the domain that owns it, to make the rule a service both of them call, or to accept the duplication until it becomes a rule of its own. Duplication is not a sin here: two copies that live in their own feature can change independently, and the copy that turns out to be wrong gets fixed in one place. A shared helper that both depend on has to be changed twice anyway, only in one place.\n\nA shared folder also grows into a dumping ground quickly, so it needs the same rules as a module: a public API, a review of every new symbol, and a refusal to accept a dependency on a feature. A shared folder with two hundred files and no clear owner is where the architecture quietly dies, because every change is allowed to land there and nobody feels responsible for it.',
        'Общий код — это код, которым пользуются две или больше фич и который не несёт собственного бизнес-смысла: форматирование дат, HTTP-клиент, логгер, тип денег. Код фичи знает про возможность: заказ, счёт, подписка. Ошибка — перенести бизнес-код в shared потому, что он используется двумя фичами. Как только хелпер в /shared импортирует модель заказа, он перестаёт быть общим и становится зависимостью, работающей в обе стороны.\n\nПроверка для папки shared — тест на удаление. Удалите фичу и посмотрите, что сломается. Если вне фичи что-то от неё зависело, граница уже была нарушена. Вторая проверка — тест словаря: если в имени общего символа есть бизнес-слово, он принадлежит фиче. Общий модуль с именем InvoiceTotals не общий, это billing со сбитым адресом.\n\nКогда двум фичам действительно нужно одно и то же правило, честных вариантов три: перенести правило в домен, который им владеет, сделать правило сервисом, который зовут обе, или принять дублирование, пока оно не станет правилом само по себе. Дублирование здесь не грех: две копии внутри своих фич меняются независимо, и та копия, что окажется неверной, чинится в одном месте. Общий хелпер, на который зависят обе, всё равно придётся менять в двух местах.\n\nПапка shared быстро превращается в свалку, поэтому ей нужны те же правила, что и модулю: публичный API, ревью каждого нового символа и отказ принимать зависимость от фичи. Папка shared на двести файлов без ясного владельца — это место, где архитектура тихо умирает, потому что туда допускается любое изменение и никто за него не отвечает.'
      ),
      bullets: [
        L('Shared code is used by two or more features and has no business meaning.', 'Общий код используют две или больше фич, и бизнес-смысла у него нет.'),
        L('Business code in shared creates a dependency that runs in both directions.', 'Бизнес-код в shared создаёт зависимость, работающую в обе стороны.'),
        L('The delete test: remove the feature and see what else breaks.', 'Тест на удаление: уберите фичу и посмотрите, что ещё сломается.'),
        L('A business word in a shared symbol name means it belongs to a feature.', 'Бизнес-слово в имени общего символа означает, что он принадлежит фиче.'),
        L('Duplication inside features is cheaper than a shared helper that couples them.', 'Дублирование внутри фич дешевле общего хелпера, который их связывает.'),
      ],
      code: `// shared/money.ts - shared, because it has no business meaning
export function formatMoney(cents: number, currency: string): string {
  return (cents / 100).toFixed(2) + ' ' + currency;
}

// shared/order-total.ts - wrong: it names a feature concept
// import { Order } from '../features/checkout/domain/order';
// export function orderTotal(order: Order): number { ... }

// features/checkout/domain/order.ts - the rule lives with the feature
export interface Order { id: string; totalCents: number }

export function orderTotal(order: Order): number {
  return order.totalCents;
}`,
      callouts: [
        {
          tone: 'note',
          title: L('Two features, one word', 'Две фичи, одно слово'),
          text: L(
            'If two features need the same concept, they do not necessarily need the same model. The same word may mean different things in different capabilities, and a shared type would force one meaning on both. Duplicate the type and let each feature keep its own vocabulary.',
            'Если двум фичам нужно одно и то же понятие, им не обязательно нужна одна и та же модель. Одно слово может значить разное в разных возможностях, а общий тип навязал бы обоим одно значение. Продублируйте тип и дайте каждой фиче свой словарь.'
          ),
        },
      ],
      takeaway: L(
        'Code belongs in shared only while it has no business meaning of its own, and the delete test is the fastest way to check.',
        'Код живёт в shared, только пока не несёт собственного бизнес-смысла, и самый быстрый способ это проверить — тест на удаление.'
      ),
      seeAlso: [
        L('Section 3-1: folders by feature', 'Секция 3-1: папки по фичам'),
        L('Section 1-2: two axes of organisation', 'Секция 1-2: две оси организации'),
        L('Section 2-6: when clean architecture is overkill', 'Секция 2-6: когда чистая архитектура избыточна'),
      ],
    },
  ],
};
