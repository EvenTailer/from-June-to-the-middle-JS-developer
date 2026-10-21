import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const architectureChapterTasks: PracticeTask[] = [
  {
    id: 'ch-architecture-ch1-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch1',
    level: 'basic',
    title: L('A checker for the layer directions', 'Проверка направлений зависимостей между слоями'),
    brief: L(
      'Write a function that checks the import graph of a codebase against the layer rules: the domain imports nothing, the application imports the domain, and the presentation and the data layers import the application and the domain. The function must return the list of the forbidden imports.',
      'Напишите функцию, которая проверяет граф импортов кодовой базы по правилам слоёв: домен не импортирует ничего, приложение импортирует домен, а презентационный и слой данных импортируют приложение и домен. Функция должна возвращать список запрещённых импортов.'
    ),
    hint: L(
      'A layer can be found in the path of a file. The rules are a map from a layer to the layers it may import, and the check runs over the import statements of every file.',
      'Слой можно найти в пути файла. Правила — это отображение слоя в список слоёв, которые ему разрешено импортировать, а проверка идёт по импортам каждого файла.'
    ),
    solution: `const ALLOWED: Record<string, string[]> = {
  domain: [],
  application: ['domain'],
  presentation: ['application', 'domain'],
  data: ['application', 'domain'],
};
const layerOf = (path: string): string | null =>
  Object.keys(ALLOWED).find((layer) => path.includes('/' + layer + '/')) ?? null;
// The pattern catches "from 'x'", a double quoted import, "import 'x'" and "export ... from 'x'".
const IMPORT_RE = /\\b(?:from|import)\\s*['"]([^'"]+)['"]/g;
// The import graph is the architecture, so check the graph.
export function findViolations(files: Record<string, string>): string[] {
  const violations: string[] = [];
  for (const [file, source] of Object.entries(files)) {
    const from = layerOf(file);
    for (const match of source.matchAll(IMPORT_RE)) {
      const to = layerOf(match[1]);
      if (from && to && !ALLOWED[from].includes(to)) violations.push(file + ' -> ' + match[1]);
    }
  }
  return violations;
}`,
    explanation: L(
      'Architecture rules live in the import graph, not in a checklist, so a violation has to be found by a tool. The map of the allowed directions is the rule in the form of code, and the checker reports the edges that break it.',
      'Архитектурные правила живут в графе импортов, а не в чек-листе, поэтому нарушение должен находить инструмент. Карта разрешённых направлений — это правило в виде кода, а проверяющая функция сообщает о рёбрах, которые его ломают.'
    ),
  },
  {
    id: 'ch-architecture-ch2-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch2',
    level: 'basic',
    title: L('A port, an adapter and a use case', 'Порт, адаптер и сценарий использования'),
    brief: L(
      'Declare an OrderRepository port with findById and save, implement it with an in-memory adapter and write a placeOrder use case that depends on the port only. The use case must not know how the orders are stored.',
      'Объявите порт OrderRepository с findById и save, реализуйте его адаптером в памяти и напишите сценарий placeOrder, который зависит только от порта. Сценарий не должен знать, как хранятся заказы.'
    ),
    hint: L(
      'The core declares the interface, the adapter implements it and the use case receives the port as an argument. The composition root is the only place that knows both sides.',
      'Ядро объявляет интерфейс, адаптер его реализует, а сценарий получает порт аргументом. Единственное место, которое знает обе стороны, — точка сборки.'
    ),
    solution: `// application/ports.ts - the core declares the port it needs
export interface Order { id: string; total: number }
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
// data/in-memory-orders.ts - an adapter implements the port
export class InMemoryOrders implements OrderRepository {
  private readonly rows = new Map<string, Order>();
  async findById(id: string): Promise<Order | null> {
    return this.rows.get(id) ?? null;
  }
  async save(order: Order): Promise<void> {
    this.rows.set(order.id, order);
  }
}
// application/place-order.ts - the use case depends on the port only
export async function placeOrder(id: string, orders: OrderRepository): Promise<void> {
  const order = await orders.findById(id);
  if (!order) throw new Error('order not found');
  await orders.save({ ...order, total: order.total + 100 });
}`,
    explanation: L(
      'The dependency is inverted: the core names what it needs and the outside world supplies it. The use case can be tested with another adapter and without a change, which is what makes the extra interface worth it.',
      'Зависимость перевёрнута: ядро называет то, что ему нужно, а внешний мир это поставляет. Сценарий можно проверить с другим адаптером и без изменений — именно это оправдывает лишний интерфейс.'
    ),
  },
  {
    id: 'ch-architecture-ch3-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch3',
    level: 'basic',
    title: L('Finding cycles in the import graph', 'Поиск циклов в графе импортов'),
    brief: L(
      'Implement a function that takes a graph of modules and returns every cycle in it. The walk must keep the nodes of the current path, so a node that is already on the path closes a cycle.',
      'Реализуйте функцию, которая принимает граф модулей и возвращает все циклы в нём. Обход должен помнить узлы текущего пути, чтобы узел, который уже лежит на пути, закрывал цикл.'
    ),
    hint: L(
      'A depth-first search with a set of the nodes on the current path detects the cycles. When the set already contains the node, the slice of the path from that node is the cycle.',
      'Циклы находит обход в глубину с множеством узлов текущего пути. Если множество уже содержит узел, срез пути от этого узла и есть цикл.'
    ),
    solution: `// Build the import graph and report every cycle in it.
export function findCycles(graph: Record<string, string[]>): string[][] {
  const cycles: string[][] = [];
  const seen = new Set<string>();
  const path: string[] = [];
  const onPath = new Set<string>();

  function visit(node: string): void {
    if (onPath.has(node)) {
      // The same cycle arrives in different rotations, so it is normalised first.
      const cycle = path.slice(path.indexOf(node));
      const sorted = [...cycle].sort();
      const smallest = sorted[0];
      const start = smallest === undefined ? 0 : cycle.indexOf(smallest);
      const canonical = [...cycle.slice(start), ...cycle.slice(0, start)];
      const key = canonical.join('>');
      if (!seen.has(key)) {
        seen.add(key);
        cycles.push([...canonical, canonical[0]]);
      }
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
    explanation: L(
      'A cycle means that two modules can no longer be changed or tested one at a time. The algorithm reports the cycle as a list of nodes, so the pair that has to be broken is visible, and the normalisation makes sure that the same cycle in a different rotation is reported once.',
      'Цикл означает, что два модуля больше нельзя менять или тестировать по отдельности. Алгоритм возвращает цикл списком узлов, поэтому пара, которую надо разорвать, видна сразу, а нормализация гарантирует, что один и тот же цикл в другой ротации попадёт в отчёт только один раз.'
    ),
  },
  {
    id: 'ch-architecture-ch4-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch4',
    level: 'intermediate',
    title: L('When a capability deserves its own service', 'Когда способности нужна своя сервисная граница'),
    brief: L(
      'Implement the criteria for splitting a service: own rules, own load profile, own data and own team. A capability deserves an extraction when three of the four criteria are met. Add a map of the table owners and a function that answers whether a service may write a table.',
      'Реализуйте критерии разделения на сервисы: собственные правила, собственный профиль нагрузки, собственные данные и собственная команда. Способность заслуживает выделения, когда выполнены три критерия из четырёх. Добавьте карту владельцев таблиц и функцию, которая отвечает, может ли сервис писать в таблицу.'
    ),
    hint: L(
      'Count the criteria that are true and compare the count with the threshold. The owner map is a table name to service name record, and the check is a single comparison.',
      'Посчитайте критерии, которые истинны, и сравните число с порогом. Карта владельцев — запись из имени таблицы в имя сервиса, а проверка — одно сравнение.'
    ),
    solution: `type Capability = { name: string; ownRules: boolean; loadProfile: boolean; ownData: boolean; dedicatedTeam: boolean };
// The four criteria of the chapter, counted.
export function splitScore(capability: Capability): number {
  const reasons = [capability.ownRules, capability.loadProfile, capability.ownData, capability.dedicatedTeam];
  return reasons.filter(Boolean).length;
}
// Three of four is a real reason, two is a preference.
export function shouldExtract(capability: Capability): boolean {
  return splitScore(capability) >= 3;
}
// Only the owner of a table may write it.
const DATA_OWNERS: Record<string, string> = { 'catalog.products': 'catalog', 'orders.orders': 'orders' };
export function canWrite(service: string, table: string): boolean {
  return DATA_OWNERS[table] === service;
}`,
    explanation: L(
      'The four criteria are the reasons a split pays off, and the threshold keeps a preference from turning into a distributed monolith. Data ownership follows the same logic: one writer per table and every other reader goes through the api of the owner.',
      'Четыре критерия — это причины, по которым разделение окупается, а порог не даёт предпочтению превратиться в распределённый монолит. Владение данными следует той же логике: один писатель на таблицу, а остальные читают через api владельца.'
    ),
  },
  {
    id: 'ch-architecture-ch5-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch5',
    level: 'intermediate',
    title: L('Retries with backoff and a circuit breaker', 'Повторы с backoff и circuit breaker'),
    brief: L(
      'Write a helper that calls a remote function, retries it up to three times with an exponential backoff plus jitter and opens a circuit after five failures. While the circuit is open the helper must fail fast without calling the function.',
      'Напишите хелпер, который вызывает удалённую функцию, повторяет попытку до трёх раз с экспоненциальным backoff и джиттером и открывает цепь после пяти ошибок. Пока цепь открыта, хелпер должен быстро отказывать, не вызывая функцию.'
    ),
    hint: L(
      'A timeout gives every remote call a deadline, and the breaker keeps the state between the calls: the number of failures and the moment it was opened.',
      'Таймаут даёт каждому удалённому вызову дедлайн, а breaker хранит состояние между вызовами: число ошибок и момент открытия.'
    ),
    solution: `type Breaker = { failures: number; open: boolean; openedAt: number };
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Every remote call gets a deadline, the caller is not held forever.
function withTimeout<T>(task: Promise<T>, timeoutMs: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('timeout after ' + timeoutMs + 'ms')), timeoutMs);
  });
  return Promise.race([task, timeout]);
}

export async function call<T>(breaker: Breaker, fn: () => Promise<T>, timeoutMs = 2000, now = Date.now()): Promise<T> {
  if (breaker.open && now - breaker.openedAt < 30_000) throw new Error('circuit is open');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const value = await withTimeout(fn(), timeoutMs);
      breaker.failures = 0;
      breaker.open = false;
      return value;
    } catch (error) {
      breaker.failures += 1;
      if (breaker.failures >= 5) { breaker.open = true; breaker.openedAt = now; }
      if (attempt === 2) throw error;
      // exponential backoff plus jitter
      await sleep(50 * 2 ** attempt + Math.random() * 50);
    }
  }
  throw new Error('unreachable');
}`,
    explanation: L(
      'Every call without a deadline holds a worker until the platform kills it, and a retry without jitter makes the retries collide. The breaker stops the traffic to a dependency that keeps failing, so the failure does not cascade.',
      'Каждый вызов без дедлайна держит воркер, пока платформа его не убьёт, а повтор без джиттера заставляет повторы сталкиваться. Breaker останавливает трафик к зависимости, которая падает, чтобы сбой не распространялся.'
    ),
  },
  {
    id: 'ch-architecture-ch6-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch6',
    level: 'intermediate',
    title: L('Route modules as a boundary of the application', 'Модули маршрутов как граница приложения'),
    brief: L(
      'Declare a RouteModule port with the path, the owner and a load function, and implement it with an adapter that loads the chunk on demand. A remote route must have a deadline and a fallback, so a broken piece never takes the page down.',
      'Объявите порт RouteModule с путём, владельцем и функцией load и реализуйте его адаптером, который грузит чанк по требованию. У удалённого маршрута должны быть дедлайн и запасной вариант, чтобы сломанная часть не роняла страницу.'
    ),
    hint: L(
      'The shell owns the port and the adapters supply the chunks. A timeout race with a fallback keeps the shell alive when the remote piece is slow or absent.',
      'Оболочка владеет портом, а адаптеры поставляют чанки. Гонка с таймаутом и запасным вариантом оставляет оболочку живой, когда удалённая часть медленная или отсутствует.'
    ),
    solution: `// The shell declares the port every route module has to satisfy.
export interface RouteModule {
  path: string;
  owner: string;
  load: () => Promise<unknown>;
}
// A bundler can only resolve a static import, so the chunks are listed here.
const LOADERS: Record<string, () => Promise<unknown>> = {
  '/orders': () => import('./routes/orders'),
  '/reports': () => import('./routes/reports'),
};
// The adapter is the only place that knows how a route is fetched.
export function lazyRoute(path: string, owner: string): RouteModule {
  const load = LOADERS[path];
  if (!load) throw new Error('unknown route: ' + path);
  return { path, owner, load };
}
// A remote piece is a remote dependency: it needs a deadline and a fallback.
export async function loadRoute(route: RouteModule, timeoutMs = 3000): Promise<unknown> {
  const timeout = new Promise((resolve) => setTimeout(() => resolve({ error: 'timeout' }), timeoutMs));
  try {
    return await Promise.race([route.load(), timeout]);
  } catch (error) {
    return { error: 'the route could not be loaded' };
  }
}
export function routesOwnedBy(routes: RouteModule[], owner: string): RouteModule[] {
  return routes.filter((route) => route.owner === owner);
}`,
    explanation: L(
      'A route owns a slice of the url space and the chunk behind it, and the owner of every route is visible in the routing table. The static map of loaders is what a bundler can actually resolve, and the timeout with the fallback treat a remote piece as a remote dependency, which is what keeps the shell alive.',
      'Маршрут владеет куском пространства URL и чанком за ним, а владелец каждого маршрута виден в таблице маршрутов. Статическая карта загрузчиков — это то, что бандлер действительно может разрешить, а дедлайн с запасным вариантом относятся к удалённой части как к удалённой зависимости — именно это оставляет оболочку живой.'
    ),
  },
  {
    id: 'ch-architecture-ch7-1',
    moduleId: 'architecture',
    topic: 'architecture',
    chapterId: 'architecture-ch7',
    level: 'intermediate',
    title: L('Writing a decision record from its forces', 'Запись решения на основе его сил'),
    brief: L(
      'Write a function that renders a decision record from the forces, the options and the verdicts: the chosen option goes to the decision section and every rejected option goes to the rejected section with its reason. Add a helper that picks the one-way doors out of a list of choices.',
      'Напишите функцию, которая собирает запись решения из сил, вариантов и вердиктов: выбранный вариант попадает в раздел решения, а каждый отклонённый — в раздел отклонённых вместе с причиной. Добавьте хелпер, который выбирает односторонние двери из списка выборов.'
    ),
    hint: L(
      'The record has the title, the forces, the decision and the rejected options with their reasons. A choice is a one-way door when it cannot be undone at a reasonable price.',
      'Запись состоит из заголовка, сил, решения и отклонённых вариантов с причинами. Выбор — односторонняя дверь, когда его нельзя отменить за разумную цену.'
    ),
    solution: `type Force = { pressure: string; importance: 'high' | 'medium' | 'low' };
type Option = { option: string; verdict: 'chosen' | 'rejected'; reason: string };
type Choice = { choice: string; reversible: boolean; cost: string };
type DecisionDraft = { title: string; forces: Force[]; options: Option[] };

export function draftRecord(draft: DecisionDraft): string {
  const chosen = draft.options.find((option) => option.verdict === 'chosen');
  const rejected = draft.options.filter((option) => option.verdict === 'rejected');
  const lines: string[] = ['# ' + draft.title, '', '## Forces'];
  for (const force of draft.forces) lines.push('- ' + force.pressure + ' (' + force.importance + ')');
  lines.push('', '## Decision', chosen ? chosen.option : 'not decided yet');
  lines.push('', '## Rejected');
  for (const option of rejected) lines.push('- ' + option.option + ': ' + option.reason);
  return lines.join('\\n');
}

// A one-way door is a choice that cannot be undone at a reasonable price.
export function oneWayDoors(choices: Choice[]): Choice[] {
  return choices.filter((choice) => !choice.reversible);
}`,
    explanation: L(
      'The forces are written before the options, so the discussion is about the pressures and not about the favourite answer. The rejected reasons are the part that is lost first, and the one-way doors are the decisions that deserve the slow road.',
      'Силы записываются до вариантов, поэтому обсуждение идёт о давлениях, а не о любимом ответе. Причины отклонения теряются первыми, а односторонние двери — это решения, которым нужна медленная дорога.'
    ),
  },
];
