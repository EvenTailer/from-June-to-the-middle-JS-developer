import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const oopChapterTasks: PracticeTask[] = [
  {
    id: 'ch-oop-ch1-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch1',
    level: 'basic',
    title: L('Build a Money value object', 'Собрать объект-значение Money'),
    brief: L(
      'Represent an amount of money as a class whose state cannot be reached from outside and whose instances compare by value rather than by reference. Two objects built from the same amount of cents must be equal, and adding two amounts must return a new object instead of changing the first one.',
      'Представьте сумму денег классом, состояние которого недоступно извне, а экземпляры сравниваются по значению, а не по ссылке. Два объекта из одинакового числа центов должны быть равны, а сложение должно возвращать новый объект, не меняя первый.'
    ),
    hint: L(
      'A # field is enforced by the engine at run time, a private constructor plus a static factory controls how an instance is built, and an explicit equals method defines value equality for the type.',
      'Поле # проверяется движком во время выполнения, приватный конструктор вместе со статической фабрикой контролирует создание экземпляра, а явный метод equals задаёт равенство по значению для типа.'
    ),
    solution: `class Money {
  #cents: number;

  // A private constructor and a static factory control how an instance is built
  private constructor(cents: number) {
    if (!Number.isInteger(cents)) throw new Error('cents must be an integer');
    this.#cents = cents;
  }

  static of(cents: number): Money {
    return new Money(cents);
  }

  plus(other: Money): Money {
    return Money.of(this.#cents + other.#cents);
  }

  equals(other: Money): boolean {
    return this.#cents === other.#cents;
  }
}

const wallet = Money.of(500);
const price = Money.of(500);
console.log(wallet === price);       // false - different objects
console.log(wallet.equals(price));  // true  - same value`,
    explanation: L(
      'The private field keeps the cents out of reach, so nothing outside the class can break the rule that the amount is an integer. Equality is written into the type instead of the call site, which is what makes a Money safe to compare anywhere.',
      'Приватное поле прячет центы, и ничто снаружи класса не может нарушить правило целого числа. Равенство записано в тип, а не в место вызова, и благодаря этому Money можно безопасно сравнивать где угодно.'
    ),
  },
  {
    id: 'ch-oop-ch2-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch2',
    level: 'basic',
    title: L('Hide a price behind a module boundary', 'Спрятать цену за границей модуля'),
    brief: L(
      'A pricing module currently exports its helper functions and its internal constant to everybody. Make the module expose exactly two names: one that parses a price written with a comma and one that formats an amount. The rounding rule must live inside the module and no caller may reach the internal representation.',
      'Модуль ценообразования сейчас экспортирует свои вспомогательные функции и внутреннюю константу всем подряд. Сделайте так, чтобы модуль открывал ровно два имени: одно разбирает цену, записанную с запятой, другое форматирует сумму. Правило округления должно жить внутри модуля, и ни один вызывающий код не должен доставать до внутреннего представления.'
    ),
    hint: L(
      'A module hides everything it does not export for free, so keep the constant and the conversion private and export only the two functions. A private constructor plus a static factory keeps the representation out of the callers.',
      'Модуль бесплатно прячет всё, что не экспортирует, поэтому оставьте константу и преобразование внутри и экспортируйте только две функции. Приватный конструктор со статической фабрикой не выпускает представление к вызывающим кодам.'
    ),
    solution: `const DEFAULT_CURRENCY = 'EUR';

class Money {
  // The representation is private, no caller can reach the cents
  #cents: number;

  private constructor(cents: number) {
    this.#cents = cents;
  }

  static of(amount: number): Money {
    return new Money(Math.round(amount * 100));
  }

  format(): string {
    return (this.#cents / 100).toFixed(2) + ' ' + DEFAULT_CURRENCY;
  }
}

// only these two names are part of the contract
export const parsePrice = (raw: string): Money =>
  Money.of(Number(raw.replace(',', '.')));
export const formatPrice = (price: Money): string => price.format();`,
    explanation: L(
      'Every export is a promise, and the two functions are the smallest surface that still serves the caller. The rounding rule and the currency live inside the module, so changing them later cannot break a single call site.',
      'Каждый экспорт — это обещание, а две функции образуют минимальную поверхность, которая ещё работает для вызывающего кода. Правило округления и валюта живут внутри модуля, поэтому их изменение не сломает ни одного места вызова.'
    ),
  },
  {
    id: 'ch-oop-ch3-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch3',
    level: 'basic',
    title: L('Send a message through interchangeable channels', 'Отправить сообщение через сменные каналы'),
    brief: L(
      'Build a notifier that can send through email and through SMS. The notifier must depend on an interface, not on a base class, so that a new channel is added by writing a new implementation instead of editing the notifier.',
      'Соберите уведомитель, который умеет отправлять по почте и по SMS. Уведомитель должен зависеть от интерфейса, а не от базового класса, чтобы новый канал добавлялся новой реализацией, а не правкой уведомителя.'
    ),
    hint: L(
      'TypeScript interfaces are structural, so a matching shape satisfies them without importing anything. Composition turns is-a into has-a: pass the channel into the constructor instead of inheriting from it.',
      'Интерфейсы TypeScript структурные, поэтому подходящая по форме структура удовлетворяет им без импорта. Композиция превращает is-a в has-a: передайте канал в конструктор, а не наследуйтесь от него.'
    ),
    solution: `interface Channel { send(to: string, message: string): void }

class EmailChannel implements Channel {
  send(to: string, message: string): void {
    console.log('email to ' + to + ': ' + message);
  }
}

const sms: Channel = { send: (to, msg) => console.log('sms to ' + to + ': ' + msg) };

class Notifier {
  readonly channel: Channel;
  constructor(channel: Channel) {
    this.channel = channel;
  }
  notify(to: string, message: string): void {
    this.channel.send(to, message);
  }
}

new Notifier(new EmailChannel()).notify('ada@example.com', 'Report ready');
new Notifier(sms).notify('+79991234567', 'Report ready');`,
    explanation: L(
      'The call site depends on the contract, so the runtime value decides which implementation runs. A base class would have forced the notifier to know about every channel, and composition keeps that decision in one place: the constructor.',
      'Место вызова зависит от контракта, поэтому конкретную реализацию выбирает значение во время выполнения. Базовый класс заставил бы уведомитель знать обо всех каналах, а композиция оставляет это решение в одном месте: в конструкторе.'
    ),
  },
  {
    id: 'ch-oop-ch4-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch4',
    level: 'intermediate',
    title: L('Close the formatter switch for good', 'Закрыть переключатель форматтеров навсегда'),
    brief: L(
      'A formatting function grows a branch for every new format and a report writer depends on the whole storage interface. Replace the branches with a registry of strategies, give the writer only the method it calls, and let the concrete implementation be chosen in one place.',
      'Функция форматирования обрастает веткой на каждый новый формат, а писатель отчёта зависит от всего интерфейса хранилища. Замените ветки реестром стратегий, дайте писателю только тот метод, который он вызывает, и выбирайте конкретную реализацию в одном месте.'
    ),
    hint: L(
      'A table of strategies replaces the dispatch and the code that chooses between them never changes again. Declare the narrow interface where the need is, and let the composition root be the single place where the concrete class is named.',
      'Таблица стратегий заменяет диспетчеризацию, и код выбора больше никогда не меняется. Опишите узкий интерфейс там, где возникла потребность, и оставьте композиционный корень единственным местом, где называется конкретный класс.'
    ),
    solution: `interface Formatter {
  format(value: number): string;
}

const formatters: Record<string, Formatter> = {
  plain: { format: (value) => String(value) },
  money: { format: (value) => '$' + value.toFixed(2) },
  percent: { format: (value) => Math.round(value * 100) + '%' },
};

function formatWith(name: string, value: number): string {
  const formatter = formatters[name];
  if (!formatter) throw new Error('unknown formatter: ' + name);
  return formatter.format(value);
}

interface ReportWriter {
  write(line: string): void;
}
function render(writer: ReportWriter, name: string, value: number): void {
  writer.write(formatWith(name, value));
}`,
    explanation: L(
      'The open-closed principle turns every new format into a new entry in the table, so the function that chooses the format is never edited. Interface segregation keeps the writer narrow, and dependency inversion means the caller receives the implementation instead of importing it.',
      'Принцип открытости и закрытости превращает каждый новый формат в новую запись в таблице, и функция выбора формата больше не правится. Принцип разделения интерфейсов оставляет писателя узким, а инверсия зависимостей передаёт реализацию вызывающему коду, а не импортирует её.'
    ),
  },
  {
    id: 'ch-oop-ch5-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch5',
    level: 'intermediate',
    title: L('Buffer the writes in a unit of work', 'Буферизовать записи в единице работы'),
    brief: L(
      'The application writes to storage through a repository, and a failure halfway through leaves half of the records stored. Introduce a unit of work that collects the changes and writes them in one commit, and prove it with an in-memory repository that needs no database.',
      'Приложение пишет в хранилище через репозиторий, и сбой на середине оставляет половину записей сохранёнными. Добавьте единицу работы, которая собирает изменения и записывает их одним коммитом, и докажите это репозиторием в памяти, которому не нужна база данных.'
    ),
    hint: L(
      'The repository speaks the domain language, and the unit of work groups the writes into one transaction. The proof that the pattern works is an in-memory implementation, where the test needs no database at all.',
      'Репозиторий говорит на языке предметной области, а единица работы группирует записи в одну транзакцию. Доказательство, что паттерн работает, — реализация в памяти, для которой тесту вообще не нужна база данных.'
    ),
    solution: `interface Order { id: string; status: 'draft' | 'placed' }

// The repository writes the whole batch in one call, so it owns the transaction
interface OrderRepository { saveAll(orders: Order[]): void }

class InMemoryOrders implements OrderRepository {
  #rows = new Map<string, Order>();

  get size(): number { return this.#rows.size; }

  // The batch is staged first and swapped in afterwards, so a failure in the
  // middle leaves the stored rows untouched.
  saveAll(orders: Order[]): void {
    const next = new Map(this.#rows);
    for (const order of orders) {
      if (!order.id) throw new Error('an order needs an id');
      next.set(order.id, order);
    }
    this.#rows = next;
  }
}

class UnitOfWork {
  #pending = new Map<string, Order>();
  #repo: OrderRepository;
  constructor(repo: OrderRepository) { this.#repo = repo; }
  track(order: Order): void {
    this.#pending.set(order.id, order);
  }
  // One call, one transaction: either every record is stored or none of them.
  commit(): void {
    this.#repo.saveAll([...this.#pending.values()]);
    this.#pending.clear();
  }
}

const repo = new InMemoryOrders();
const uow = new UnitOfWork(repo);
uow.track({ id: 'o1', status: 'placed' });
uow.track({ id: 'o2', status: 'placed' });
uow.commit();
console.log(repo.size); // 2

// The proof: a rejected record leaves the stored rows exactly as they were
const broken = new InMemoryOrders();
const brokenUow = new UnitOfWork(broken);
brokenUow.track({ id: 'o1', status: 'placed' });
brokenUow.track({ id: '', status: 'placed' });
try {
  brokenUow.commit();
} catch (error) {
  console.log('nothing was stored:', broken.size === 0);
}`,
    explanation: L(
      'The unit of work owns the pending changes, so nothing reaches storage before the commit. The repository keeps its own vocabulary and the in-memory implementation shows that the pattern does not need a database to be tested.',
      'Единица работы владеет отложенными изменениями, поэтому до коммита в хранилище не попадает ничего. Репозиторий сохраняет собственный язык, а реализация в памяти показывает, что для тестирования паттерна база данных не нужна.'
    ),
  },
  {
    id: 'ch-oop-ch6-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch6',
    level: 'intermediate',
    title: L('Protect the order with an invariant and an event', 'Защитить заказ инвариантом и доменным событием'),
    brief: L(
      'Turn an order into an aggregate root that refuses to exist in an invalid state, and let it report what happened. An order that is placed for a total of zero must not be constructible, and after placing the order the aggregate must publish a domain event named in the past tense.',
      'Превратите заказ в корень агрегата, который не может существовать в невалидном состоянии, и позвольте ему сообщать о происходящем. Заказ, размещённый на нулевую сумму, не должен быть создаваем, а после размещения агрегат должен опубликовать доменное событие, названное в прошедшем времени.'
    ),
    hint: L(
      'An invariant is enforced, not documented, so the constructor and the method that breaks it must throw. A domain event names a fact in the past tense and is published after the change, and the aggregate hands the events out as a copy so a caller can read them once.',
      'Инвариант соблюдается, а не документируется, поэтому конструктор и метод, который его нарушает, должны бросать исключение. Доменное событие называет факт в прошедшем времени и публикуется после изменения, а агрегат отдаёт события копией, чтобы вызывающий код прочитал их один раз и не смог изменить буфер.'
    ),
    solution: `type Line = { price: number; qty: number };
type OrderPlaced = { type: 'OrderPlaced'; orderId: string; total: number };

class Order {
  readonly id: string;
  #total: number;
  #events: OrderPlaced[] = [];

  // The invariant is enforced here, an order with a zero total is never created
  constructor(id: string, lines: Line[] = []) {
    const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    if (total <= 0) throw new Error('an order must have a positive total');
    this.id = id;
    this.#total = total;
  }

  addLine(price: number, qty: number): void {
    if (price <= 0 || qty <= 0) throw new Error('invalid line');
    this.#total += price * qty;
  }

  // The event is published after the change
  place(): void {
    this.#events.push({ type: 'OrderPlaced', orderId: this.id, total: this.#total });
  }

  pullEvents(): OrderPlaced[] {
    // The caller gets a copy, the buffer stays under the control of the aggregate
    const events = this.#events.slice();
    this.#events.length = 0;
    return events;
  }
}`,
    explanation: L(
      'Only the aggregate root decides whether a change is legal, so an order with a zero total is never created at all. The event is published after the change and carries the smallest payload that answers the question, and pulling the events empties the buffer while the caller only gets a copy.',
      'Только корень агрегата решает, законно ли изменение, поэтому заказ с нулевой суммой вообще не создаётся. Событие публикуется после изменения и несёт минимальную полезную нагрузку, а извлечение событий опустошает буфер, при этом вызывающий получает только копию.'
    ),
  },
  {
    id: 'ch-oop-ch7-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch7',
    level: 'intermediate',
    title: L('Compose pure steps and keep the state frozen', 'Собрать чистые шаги и заморозить состояние'),
    brief: L(
      'Build a pipeline of small pure functions that turns a raw title into a slug, and keep the filter state immutable: updating the filter must return a new state object and leave the original untouched.',
      'Соберите конвейер небольших чистых функций, который превращает сырое название в слаг, и сделайте состояние фильтра неизменяемым: обновление фильтра должно возвращать новый объект состояния и не трогать исходный.'
    ),
    hint: L(
      'Compose functions that take one argument and return one value, and put the data argument last so the steps chain. Freeze at the boundary where the data enters, and replace the state instead of editing it.',
      'Композируйте функции, которые принимают один аргумент и возвращают одно значение, и ставьте аргумент с данными последним, чтобы шаги сцеплялись. Замораживайте на границе, где данные входят, и заменяйте состояние вместо его правки.'
    ),
    solution: `type State = { items: readonly string[]; filter: string };

const trim = (text: string): string => text.trim();
const lower = (text: string): string => text.toLowerCase();
const slugify = (text: string): string => text.replace(/\\s+/g, '-');

function compose(...steps: Array<(value: string) => string>): (value: string) => string {
  return (value: string): string => steps.reduce((acc, step) => step(acc), value);
}

const toSlug = compose(trim, lower, slugify);

const initial: State = Object.freeze({
  items: Object.freeze(['book', 'pen']),
  filter: '',
});

const withFilter = (state: State, filter: string): State => ({
  ...state,
  filter,
});`,
    explanation: L(
      'Every step returns the same value for the same input and touches nothing outside, so the whole chain can be tested without a fixture. Replacing the state instead of editing it keeps the reference comparison meaningful, and the frozen nested array stops an accidental push.',
      'Каждый шаг возвращает одно и то же значение для одного и того же входа и ничего не меняет снаружи, поэтому всю цепочку можно тестировать без фикстуры. Замена состояния вместо его правки сохраняет осмысленность сравнения по ссылке, а замороженный вложенный массив мешает случайному push.'
    ),
  },
  {
    id: 'ch-oop-ch8-1',
    moduleId: 'oop',
    topic: 'oop',
    chapterId: 'oop-ch8',
    level: 'advanced',
    title: L('Report failures with codes and retry safely', 'Сообщать об отказах кодами и повторять безопасно'),
    brief: L(
      'Model a withdrawal that can fail as a normal business outcome, keep the failure in the type so the caller cannot ignore it, and give every failure a stable code. Then retry an idempotent operation a limited number of times with an exponential backoff.',
      'Смоделируйте снятие денег, которое может не пройти как обычный бизнес-результат, оставьте отказ в типе, чтобы вызывающий код не мог его проигнорировать, и дайте каждому отказу стабильный код. Затем повторите идемпотентную операцию ограниченное число раз с экспоненциальной задержкой.'
    ),
    hint: L(
      'A result type forces the caller to handle the case, while an exception is invisible in the type. Retry only idempotent operations, back off exponentially, and stop after a few attempts instead of hanging.',
      'Тип результата заставляет вызывающий код обработать случай, а исключение невидимо в типе. Повторяйте только идемпотентные операции, отступайте экспоненциально и останавливайтесь после нескольких попыток вместо зависания.'
    ),
    solution: `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
type Failure = { code: string; message: string };

function withdraw(balance: number, amount: number): Result<number, Failure> {
  if (amount <= 0) return { ok: false, error: { code: 'INVALID_AMOUNT', message: 'amount must be positive' } };
  if (amount > balance) return { ok: false, error: { code: 'INSUFFICIENT_FUNDS', message: 'not enough money' } };
  return { ok: true, value: balance - amount };
}

async function withRetry<T>(task: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown = new Error('no attempts left');
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100));
    }
  }
  throw lastError;
}`,
    explanation: L(
      'The result type puts the failure in the signature, so the caller has to decide what to do with it, and the code makes the failures countable. The retry helper caps the attempts and grows the delay between them, because a retry without a limit turns a failure into a hang.',
      'Тип результата ставит отказ в сигнатуру, поэтому вызывающий код обязан решить, что с ним делать, а код делает отказы подсчитываемыми. Помощник повтора ограничивает попытки и увеличивает задержку между ними, потому что повтор без предела превращает отказ в зависание.'
    ),
  },
];
