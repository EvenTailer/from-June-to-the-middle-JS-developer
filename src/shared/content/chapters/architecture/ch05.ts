import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh05: Chapter = {
  id: 'architecture-ch5',
  title: L('Cross-cutting concerns', 'Сквозные аспекты'),
  summary: L(
    'How configuration, feature flags, errors, logging, observability, transactions, the outbox pattern, idempotency, timeouts, retries, circuit breakers and caching are implemented once and reused everywhere, and how the architecture itself is put under test.',
    'Как конфигурация, флаги функций, ошибки, логирование, наблюдаемость, транзакции, паттерн outbox, идемпотентность, таймауты, повторные попытки, предохранители и кэширование реализуются один раз и переиспользуются повсюду, и как тестируется сама архитектура.'
  ),
  sections: [
    {
      id: 'architecture-ch5-s1',
      title: L('Configuration and feature flags', 'Конфигурация и флаги функций'),
      body: L(
        'Configuration is the part of the system that changes without a code change, so it has to be validated once, at startup, instead of at every use. Reading process.env deep inside a business function spreads the assumption that a variable exists across the whole codebase, and a missing key turns into a runtime error at the moment of the call, far away from the process that started with the wrong environment.\n\nA feature flag separates deployment from release. The code ships first and stays dark until the flag is enabled, which turns a risky change into a configuration change that can be undone in seconds without a rollback. Flags come in three kinds: release flags that gate unfinished work, operational switches such as a kill switch for an expensive integration, and experiments that expose a new behaviour to a slice of the users.\n\nThe price of flags is debt. Every flag is a branch that stays in the code long after the experiment is over, and a flag without an owner and an expiry date becomes permanent. A codebase that accumulates flags ends up with a matrix of configurations that nobody has ever tested, and the behaviour of a production incident can no longer be reproduced from the source code alone.',
        'Конфигурация — это часть системы, которая меняется без изменения кода, поэтому её проверяют один раз, на старте, а не при каждом использовании. Чтение process.env в глубине бизнес-функции рассеивает предположение о существовании переменной по всему коду, и отсутствующий ключ превращается в рантайм-ошибку в момент вызова, далеко от процесса, который стартовал с неверным окружением.\n\nФлаг функции отделяет развёртывание от релиза. Код сначала выкатывается и остаётся выключенным, пока флаг не включат, и это превращает рискованное изменение в изменение конфигурации, которое откатывается за секунды без отката версии. Флаги бывают трёх видов: флаги релиза, которые открывают готовую функцию, операционные переключатели вроде аварийного выключателя дорогой интеграции, и эксперименты, которые показывают новое поведение части пользователей.\n\nЦена флагов — это долг. Каждый флаг это ветка, которая остаётся в коде задолго после конца эксперимента, а флаг без владельца и без срока жизни становится постоянным. Кодовая база, накопившая флаги, превращается в матрицу комбинаций, которую никто никогда не проверял, и поведение продакшн-инцидента больше невозможно воспроизвести из исходного кода.'
      ),
      bullets: [
        L('Validate the whole configuration at startup and refuse to boot when a value is missing or malformed.', 'Проверяйте всю конфигурацию на старте и не поднимайтесь, если значение отсутствует или неверно.'),
        L('A flag separates deployment from release, so a risky feature can be switched off without a rollback.', 'Флаг отделяет развёртывание от релиза, поэтому рискованную функцию можно выключить без отката версии.'),
        L('Give every flag an owner and an expiry date, or it becomes permanent.', 'У каждого флага должны быть владелец и срок жизни, иначе он станет постоянным.'),
        L('Read configuration once at the boundary and pass typed values inward.', 'Читайте конфигурацию один раз на границе и передавайте внутрь типизированные значения.'),
        L('Keep a kill switch for the integrations that cost money when they misbehave.', 'Держите аварийный выключатель для интеграций, которые дорого обходятся при сбоях.'),
      ],
      code: `type Flags = { newCheckout: boolean; killSearch: boolean };

type Config = { databaseUrl: string; timeoutMs: number; flags: Flags };

function readConfig(env: Record<string, string | undefined>): Config {
  const databaseUrl = env.DATABASE_URL;
  const timeoutMs = Number(env.TIMEOUT_MS ?? '3000');
  if (!databaseUrl) throw new Error('DATABASE_URL is required');
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new Error('TIMEOUT_MS must be positive');
  return {
    databaseUrl,
    timeoutMs,
    flags: { newCheckout: env.FLAG_NEW_CHECKOUT === 'on', killSearch: env.FLAG_KILL_SEARCH === 'on' },
  };
}

const config = readConfig(process.env as Record<string, string | undefined>);

export function isEnabled(flag: keyof Flags): boolean {
  return config.flags[flag];
}`,
      table: {
        caption: L('The three kinds of flag', 'Три вида флагов'),
        headers: [L('Kind', 'Вид'), L('Purpose', 'Назначение'), L('Lifetime', 'Срок жизни')],
        rows: [
          [
            L('Release flag', 'Флаг релиза'),
            L('Gates a finished feature behind a switch', 'Открывает готовую функцию за переключателем'),
            L('Removed after the release', 'Убирается после релиза'),
          ],
          [
            L('Operational switch', 'Операционный переключатель'),
            L('Stops an expensive or broken integration', 'Останавливает дорогую или сломанную интеграцию'),
            L('Kept for the lifetime of the service', 'Живёт всё время работы сервиса'),
          ],
          [
            L('Experiment flag', 'Экспериментальный флаг'),
            L('Exposes a variant to part of the audience', 'Показывает вариант части аудитории'),
            L('Expires with the experiment', 'Истекает вместе с экспериментом'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A flag without an owner', 'Флаг без владельца'),
          text: L(
            'A flag that nobody removes is a permanent branch. When an incident happens, nobody can tell which combinations were live, and the bug can no longer be reproduced from the source code.',
            'Флаг, который никто не убирает, — вечная ветка. Когда случается инцидент, никто не может сказать, какие комбинации были включены, и баг больше не воспроизводится из исходного кода.'
          ),
        },
        {
          tone: 'tip',
          title: L('Fail at boot, not at request time', 'Падайте на старте, а не во время запроса'),
          text: L(
            'Validating configuration in one place at startup turns a missing variable into a deployment error, where it is cheap to fix, instead of a runtime error in one unlucky request path.',
            'Проверка конфигурации в одном месте на старте превращает отсутствующую переменную в ошибку развёртывания, где это дёшево исправить, а не в рантайм-ошибку в одном неудачном пути запроса.'
          ),
        },
      ],
      takeaway: L(
        'Validate configuration once at startup, and give every feature flag an owner and an expiry date.',
        'Проверяйте конфигурацию один раз на старте и указывайте для каждого флага функций владельца и срок жизни.'
      ),
      seeAlso: [
        L('Section 1-3: why dependencies point inward', 'Секция 1-3: почему зависимости смотрят внутрь'),
        L('Section 3-2: the public API of a module', 'Секция 3-2: публичный API модуля'),
        L('Section 5-6: testing the architecture', 'Секция 5-6: тестирование архитектуры'),
      ],
    },
    {
      id: 'architecture-ch5-s2',
      title: L('Errors, logging and observability', 'Ошибки, логирование и наблюдаемость'),
      body: L(
        'Cross-cutting error handling needs a taxonomy, because the three kinds of failure demand different reactions. A domain error is expected, carries a stable code and has to be translated into a response. A programming error is a bug and should crash loudly in development. An infrastructure error is usually transient and deserves a retry, but only when the operation is safe to repeat.\n\nA log line is an event, not a paragraph. A structured record with a level, a message and a set of typed fields can be filtered and aggregated by machines, while a formatted sentence can only be read by a human. The field that makes logs joinable is the correlation id: it ties a log line to the trace span and to the request that produced it, so the story of one slow request can be reconstructed.\n\nObservability is the ability to ask questions about a running system from its external output. Logs tell you that something happened, metrics tell you how often and how long, and traces tell you where the time went. Each answers a different question, and a system with logs alone forces you to grep through text while the incident is already happening.',
        'Сквозная обработка ошибок требует таксономии, потому что три вида отказов требуют разной реакции. Доменная ошибка ожидаема, несёт стабильный код и должна быть переведена в ответ. Программная ошибка — это баг, и в разработке она должна падать громко. Инфраструктурная ошибка обычно временная, и её стоит повторить, но только если операцию безопасно повторять.\n\nСтрока лога — это событие, а не абзац. Структурированная запись с уровнем, сообщением и набором типизированных полей машина умеет фильтровать и агрегировать, тогда как отформатированное предложение читается только человеком. Поле, которое делает логи связываемыми, — correlation id: он привязывает строку лога к спану трейса и к запросу, который её породил, и тогда историю одного медленного запроса можно собрать.\n\nНаблюдаемость — это способность задавать вопросы работающей системе по её внешнему выводу. Логи говорят, что что-то произошло, метрики — как часто и как долго, трейсы — куда ушло время. Каждый отвечает на свой вопрос, а система только с логами заставляет грепать по тексту, когда инцидент уже идёт.'
      ),
      bullets: [
        L('Split errors into domain, programming and infrastructure, because the reaction differs.', 'Делите ошибки на доменные, программные и инфраструктурные: реакция на них разная.'),
        L('Log structured records with typed fields, not formatted sentences.', 'Логируйте структурированные записи с типизированными полями, а не отформатированные предложения.'),
        L('Carry a correlation id through every call and every log line.', 'Протаскивайте correlation id через каждый вызов и каждую строку лога.'),
        L('Keep metric labels low-cardinality: a user id is not a label.', 'Держите метки метрик с низкой кардинальностью: user id не является меткой.'),
        L('Traces answer where the time went, metrics answer how often, logs answer what happened.', 'Трейсы отвечают, куда ушло время, метрики — как часто, логи — что произошло.'),
      ],
      code: `class DomainError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'DomainError';
  }
}

type LogFields = Record<string, string | number | boolean>;
let correlationId = 'boot';

function log(level: 'info' | 'warn' | 'error', message: string, fields: LogFields = {}): void {
  console.log(JSON.stringify({ time: new Date().toISOString(), level, message, correlationId, ...fields }));
}

try {
  throw new DomainError('payment.timeout', 'the gateway did not answer');
} catch (error) {
  const failure = error as DomainError;
  log('warn', 'upstream call failed', { code: failure.code, reason: failure.message });
}`,
      table: {
        caption: L('What each signal answers', 'На что отвечает каждый сигнал'),
        headers: [L('Signal', 'Сигнал'), L('Question', 'Вопрос'), L('Cost', 'Цена')],
        rows: [
          [
            L('Log line', 'Строка лога'),
            L('What happened to this request', 'Что произошло с этим запросом'),
            L('Cheap to write, expensive to search', 'Дёшево писать, дорого искать'),
          ],
          [
            L('Metric', 'Метрика'),
            L('How often and how long', 'Как часто и как долго'),
            L('Cheap to query, loses the detail', 'Дёшево запрашивать, теряет детали'),
          ],
          [
            L('Trace span', 'Спан трейса'),
            L('Where the time was spent', 'Где ушло время'),
            L('Costly to collect, needs sampling', 'Дорого собирать, нужна выборка'),
          ],
          [
            L('Health check', 'Проверка здоровья'),
            L('Is the service alive right now', 'Жив ли сервис прямо сейчас'),
            L('Only says alive or dead', 'Говорит только жив или мёртв'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The catch-all catch', 'Ловить всё подряд'),
          text: L(
            'Catching every error and returning a generic message hides real defects, because the stack trace never reaches anyone. Catch the errors you can handle, translate the ones the caller must see, and let the rest fail loudly.',
            'Ловить все ошибки и отдавать общий ответ скрывает настоящие дефекты: стек-трейс не доходит ни до кого. Ловите ошибки, с которыми умеете работать, переводите те, что должен увидеть вызывающий, а остальное пусть падает громко.'
          ),
        },
        {
          tone: 'warning',
          title: L('Logs are not a query language', 'Логи — не язык запросов'),
          text: L(
            'Grepping free text during an incident is slow. Emit fields that a query tool can filter, and keep their cardinality bounded, otherwise the index itself becomes the outage.',
            'Греп по свободному тексту во время инцидента медленный. Пишите поля, по которым может фильтровать инструмент запросов, и держите их кардинальность ограниченной, иначе сам индекс станет причиной аварии.'
          ),
        },
      ],
      takeaway: L(
        'Classify every error, log structured records with a correlation id, and treat logs, metrics and traces as three different tools.',
        'Классифицируйте каждую ошибку, логируйте структурированные записи с correlation id и относитесь к логам, метрикам и трейсам как к трём разным инструментам.'
      ),
      seeAlso: [
        L('Section 5-4: timeouts, retries and circuit breakers', 'Секция 5-4: таймауты, повторные попытки и предохранители'),
        L('Section 5-6: testing the architecture', 'Секция 5-6: тестирование архитектуры'),
      ],
    },
    {
      id: 'architecture-ch5-s3',
      title: L('Transactions, outbox and idempotency', 'Транзакции, outbox и идемпотентность'),
      body: L(
        'A database transaction gives you atomicity inside one storage engine, and that is exactly where the guarantee ends. The moment a second system is involved, you have two writes and no shared transaction: the order row can be committed while the event is never published, or the event reaches the broker while the order is rolled back. The window between the two operations is small and the loss inside it is permanent.\n\nThe transactional outbox removes the second write from the critical path. The business row and an outbox row are inserted in one transaction, so they succeed or fail together. A separate publisher then reads the outbox and sends the events to the broker, marking them as published. The delivery guarantee becomes at least once, which moves the burden of correctness to the consumer.\n\nIdempotency is the ability to repeat an operation without changing the outcome, and it is what makes at-least-once delivery safe. The common mechanism is an idempotency key supplied by the caller and stored together with the result of the first processing, so a repeated key returns the stored result instead of doing the work twice. Without it, a retried request becomes a second charge.',
        'Транзакция базы данных даёт атомарность внутри одного хранилища, и на этом гарантия заканчивается. Как только появляется вторая система, у вас две записи и нет общей транзакции: строка заказа может зафиксироваться, а событие так и не уйти, или событие дойдёт до брокера, а заказ откатится. Окно между двумя операциями невелико, а потеря внутри него безвозвратна.\n\nТранзакционный outbox убирает вторую запись с критического пути. Бизнес-строка и строка outbox вставляются в одной транзакции, поэтому либо обе удаются, либо обе нет. Отдельный издатель читает outbox, отправляет события в брокер и помечает их опубликованными. Гарантия доставки становится «хотя бы один раз», и ответственность за корректность переходит к потребителю.\n\nИдемпотентность — это способность повторить операцию без изменения результата, и именно она делает доставку «хотя бы один раз» безопасной. Обычный механизм: ключ идемпотентности от вызывающей стороны, который хранится вместе с результатом первой обработки, поэтому повторный ключ возвращает сохранённый результат вместо повторной работы. Без этого повторённый запрос становится вторым списанием.'
      ),
      bullets: [
        L('Two writes in two systems have no shared transaction, so one of them can be lost.', 'Две записи в двух системах не имеют общей транзакции, поэтому одна из них может потеряться.'),
        L('The outbox row is written in the same transaction as the business row.', 'Строка outbox пишется в той же транзакции, что и бизнес-строка.'),
        L('Outbox delivery is at least once, so the consumer must be idempotent.', 'Доставка outbox — как минимум один раз, поэтому потребитель обязан быть идемпотентным.'),
        L('An idempotency key is stored together with the result of the first processing.', 'Ключ идемпотентности хранится вместе с результатом первой обработки.'),
        L('Deduplication by event id is cheaper than deduplication by business key.', 'Дедупликация по id события дешевле, чем по бизнес-ключу.'),
      ],
      code: `type Order = { id: string; totalCents: number };
type OrderEvent = { id: string; type: 'order.placed'; payload: Order };

interface Outbox {
  append(event: OrderEvent): void;      // written in the same transaction as the order
  readUnpublished(): OrderEvent[];
  markPublished(id: string): void;
}

function publishPending(outbox: Outbox, broker: { send(event: OrderEvent): void }): void {
  for (const event of outbox.readUnpublished()) {
    broker.send(event);                 // delivery is at least once
    outbox.markPublished(event.id);
  }
}

function consumeOrderPlaced(seen: { has(id: string): boolean; add(id: string): void }, event: OrderEvent): void {
  if (seen.has(event.id)) return;        // duplicate delivery, skip the work
  // apply the order and record the event id in one transaction
  seen.add(event.id);
}`,
      table: {
        caption: L('Three ways to deliver an event', 'Три способа доставить событие'),
        headers: [L('Approach', 'Подход'), L('Atomicity', 'Атомарность'), L('Price', 'Цена')],
        rows: [
          [
            L('Dual write', 'Двойная запись'),
            L('None across two systems', 'Нет между двумя системами'),
            L('Cheap, loses events', 'Дёшево, теряются события'),
          ],
          [
            L('Transactional outbox', 'Транзакционный outbox'),
            L('One transaction for row and event', 'Одна транзакция на строку и событие'),
            L('A publisher and idempotent consumers', 'Нужен издатель и идемпотентные потребители'),
          ],
          [
            L('Change data capture', 'Захват изменений данных'),
            L('Guaranteed by the database log', 'Гарантируется журналом базы'),
            L('Infrastructure to operate', 'Инфраструктура под поддержку'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Marking published too early', 'Помечать опубликованным слишком рано'),
          text: L(
            'If the publisher marks the row as published before the broker acknowledges it, a crash in between loses the event forever. Mark it after the acknowledgement, and accept that the same event may be sent twice.',
            'Если издатель помечает строку опубликованной до подтверждения брокера, падение между этими шагами теряет событие навсегда. Помечайте после подтверждения и примите, что одно событие может уйти дважды.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the idempotency record with the effect', 'Храните запись об идемпотентности рядом с эффектом'),
          text: L(
            'The deduplication record and the business change belong in one transaction. If the effect is committed and the marker is not, the retry repeats the effect, which is exactly the failure you were trying to remove.',
            'Запись о дедупликации и бизнес-изменение должны быть в одной транзакции. Если эффект зафиксирован, а метка нет, повтор выполнит эффект ещё раз — ровно та ошибка, которую вы хотели убрать.'
          ),
        },
      ],
      takeaway: L(
        'Write the event in the same transaction as the state change, and make every consumer idempotent by key.',
        'Пишите событие в той же транзакции, что и изменение состояния, и делайте каждого потребителя идемпотентным по ключу.'
      ),
      seeAlso: [
        L('Chapter 4: service architecture', 'Глава 4: сервисная архитектура'),
        L('Section 5-4: timeouts, retries and circuit breakers', 'Секция 5-4: таймауты, повторные попытки и предохранители'),
        L('Section 2-4: dependency inversion in practice', 'Секция 2-4: инверсия зависимостей на практике'),
      ],
    },
    {
      id: 'architecture-ch5-s4',
      title: L('Timeouts, retries and circuit breakers', 'Таймауты, повторные попытки и предохранители'),
      body: L(
        'Every remote call needs a deadline. Without one, a hung connection keeps a worker busy until the platform kills it, and the capacity of the service is spent on requests that will never finish. The deadline has to travel with the request, because a service that calls three dependencies in sequence must split its own budget instead of granting each of them the full timeout.\n\nRetries multiply load exactly when the system can least afford it. A retry without backoff turns a slow dependency into an outage, so delays grow exponentially, include jitter so that clients do not wake up together, and are bounded by a retry budget that caps the share of requests allowed to be retried. Only operations that are safe to repeat deserve a retry at all.\n\nA circuit breaker stops sending requests to a dependency that is already failing. It counts failures in a sliding window, opens after a threshold and fails fast while open, and then lets a single probe through in the half-open state to find out whether the dependency recovered. The breaker is a local decision, so every instance makes it independently.',
        'Каждому удалённому вызову нужен дедлайн. Без него зависшее соединение держит воркер занятым, пока платформа его не убьёт, и мощность сервиса уходит на запросы, которые никогда не завершатся. Дедлайн должен передаваться вместе с запросом, потому что сервис, вызывающий три зависимости подряд, обязан разделить свой бюджет, а не выдать каждой из них полный таймаут.\n\nПовторные попытки умножают нагрузку ровно тогда, когда система меньше всего может её выдержать. Повтор без отката превращает медленную зависимость в аварию, поэтому пауза растёт экспоненциально, включает джиттер, чтобы клиенты не просыпались одновременно, и ограничивается бюджетом повторов, который задаёт долю запросов, которым разрешено повторяться. Повтор заслуживают только операции, безопасные для повторения.\n\nПредохранитель прекращает отправлять запросы зависимости, которая уже падает. Он считает ошибки в скользящем окне, открывается после порога и быстро отказывает, пока открыт, а затем в полуоткрытом состоянии пропускает одну пробу, чтобы выяснить, восстановилась ли зависимость. Решение локальное, поэтому каждый экземпляр принимает его сам.'
      ),
      bullets: [
        L('A call without a deadline consumes a worker until the platform kills it.', 'Вызов без дедлайна занимает воркер, пока платформа его не убьёт.'),
        L('The deadline must travel downstream, otherwise the budget multiplies.', 'Дедлайн должен передаваться дальше, иначе бюджет размножается.'),
        L('Backoff must be exponential and jittered, not a fixed delay.', 'Откат должен быть экспоненциальным и с джиттером, а не фиксированной паузой.'),
        L('A retry budget caps the share of requests that may be retried.', 'Бюджет повторов ограничивает долю запросов, которым можно повторять попытку.'),
        L('The breaker fails fast when open and probes once when half-open.', 'Предохранитель быстро отказывает в открытом состоянии и делает одну пробу в полуоткрытом.'),
      ],
      code: `type Breaker = { failures: number; open: boolean; openedAt: number };

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

async function call<T>(breaker: Breaker, fn: () => Promise<T>, now = Date.now()): Promise<T> {
  if (breaker.open && now - breaker.openedAt < 30_000) throw new Error('circuit is open');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const value = await fn();
      breaker.failures = 0;
      breaker.open = false;
      return value;
    } catch (error) {
      breaker.failures += 1;
      if (breaker.failures >= 5) { breaker.open = true; breaker.openedAt = now; }
      if (attempt === 2) throw error;
      await sleep(50 * 2 ** attempt + Math.random() * 50); // exponential backoff plus jitter
    }
  }
  throw new Error('unreachable');
}`,
      table: {
        caption: L('Three guards for a failing dependency', 'Три защиты от отказа зависимости'),
        headers: [L('Guard', 'Защита'), L('Reacts to', 'Реагирует на'), L('Without it', 'Без неё')],
        rows: [
          [
            L('Timeout', 'Таймаут'),
            L('A call that never returns', 'Вызов, который не возвращается'),
            L('Workers are held forever', 'Воркеры заняты навсегда'),
          ],
          [
            L('Retry with backoff', 'Повтор с откатом'),
            L('A transient failure', 'Временный сбой'),
            L('A blip becomes an outage', 'Всплеск сбоя превращается в аварию'),
          ],
          [
            L('Circuit breaker', 'Предохранитель'),
            L('A dependency that keeps failing', 'Зависимость, которая падает постоянно'),
            L('Failures cascade', 'Сбои распространяются'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Retrying a non-idempotent operation', 'Повтор неидемпотентной операции'),
          text: L(
            'A retry of a request that charges a card twice is a data incident, not a technical detail. Before adding a retry, check that the operation is safe to repeat, and give it an idempotency key if it is not.',
            'Повтор запроса, который дважды списывает карту, — это инцидент с данными, а не техническая деталь. Прежде чем добавлять повтор, убедитесь, что операцию безопасно повторять, а если нет — дайте ей ключ идемпотентности.'
          ),
        },
        {
          tone: 'tip',
          title: L('One deadline, shared by everyone', 'Один дедлайн на всех'),
          text: L(
            'Pass the remaining time downstream instead of a fresh timeout. When each service restarts the clock, a chain of three calls can wait three times longer than the user is willing to wait.',
            'Передавайте дальше оставшееся время, а не новый таймаут. Если каждый сервис перезапускает часы, цепочка из трёх вызовов ждёт в три раза дольше, чем готов ждать пользователь.'
          ),
        },
      ],
      takeaway: L(
        'Give every remote call a deadline that travels downstream, retry only safe operations with jittered backoff, and let a breaker stop the traffic to a dead dependency.',
        'Давайте каждому удалённому вызову дедлайн, который передаётся дальше, повторяйте только безопасные операции с откатом и джиттером, а предохранителю — останавливать трафик к мёртвой зависимости.'
      ),
      seeAlso: [
        L('Section 5-2: errors, logging and observability', 'Секция 5-2: ошибки, логирование и наблюдаемость'),
        L('Section 5-5: caching layers', 'Секция 5-5: слои кэша'),
        L('Chapter 4: service architecture', 'Глава 4: сервисная архитектура'),
      ],
    },
    {
      id: 'architecture-ch5-s5',
      title: L('Caching layers', 'Слои кэша'),
      body: L(
        'A cache is a copy of data that you agree to serve while it is stale. The cache-aside pattern keeps the cache out of the write path: the read tries the cache first, on a miss goes to the source of truth and fills the cache, and the write goes to the source of truth and then invalidates or updates the entry. The cache never becomes the place where the truth lives.\n\nThe hard part is invalidation. A time to live bounds staleness but does not remove it, and an explicit invalidation on every write is expensive and easy to forget when a second service writes the same table. A usable entry therefore carries both a lifetime and a version, and the version is what detects that the copy no longer matches the source.\n\nCaching also changes the failure modes. A hot key expires and a thousand requests miss at the same moment, so the miss path needs a guard, either a lock or a request coalescing, and the cache must never be the only copy of data that cannot be rebuilt from somewhere else.',
        'Кэш — это копия данных, которую вы согласны отдавать устаревшей. Паттерн cache-aside держит кэш вне пути записи: чтение сначала пробует кэш, при промахе идёт в источник истины и заполняет кэш, а запись идёт в источник истины и затем инвалидирует или обновляет запись. Кэш никогда не становится местом, где живёт истина.\n\nСамая трудная часть — инвалидация. Время жизни ограничивает устаревание, но не устраняет его, а явная инвалидация при каждой записи дорога и легко забывается, когда ту же таблицу пишет второй сервис. Поэтому рабочая запись кэша несёт и срок жизни, и версию, и именно версия позволяет обнаружить, что копия разошлась с источником.\n\nКэширование меняет и режимы отказов. Популярный ключ истекает, и тысяча запросов промахивается одновременно, поэтому путь промаха нуждается в защите: блокировке или слиянии одинаковых запросов. И кэш никогда не должен быть единственной копией данных, которые нельзя восстановить откуда-то ещё.'
      ),
      bullets: [
        L('The cache is a copy, never the source of truth.', 'Кэш — это копия, а не источник истины.'),
        L('Cache-aside keeps the cache out of the write path.', 'Cache-aside держит кэш вне пути записи.'),
        L('A time to live bounds staleness, a version detects it.', 'Время жизни ограничивает устаревание, версия его обнаруживает.'),
        L('Coalesce concurrent misses or a hot key stampedes.', 'Сливайте одинаковые промахи, иначе популярный ключ создаёт лавину запросов.'),
        L('Never cache data that cannot be rebuilt.', 'Не кэшируйте данные, которые нельзя восстановить.'),
      ],
      code: `type Entry<T> = { value: T; expiresAt: number };

const entries = new Map<string, Entry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

async function readThrough<T>(key: string, load: () => Promise<T>, now = Date.now()): Promise<T> {
  const hit = entries.get(key);
  if (hit && hit.expiresAt > now) return hit.value as T;
  const pending = inFlight.get(key);
  if (pending) return pending as Promise<T>;          // one request per key
  const request = load().then((value) => {
    entries.set(key, { value, expiresAt: now + 60_000 });
    inFlight.delete(key);
    return value;
  });
  inFlight.set(key, request);
  return request;
}

function invalidate(key: string): void {
  entries.delete(key);
}`,
      table: {
        caption: L('Where the cache sits', 'Где стоит кэш'),
        headers: [L('Layer', 'Слой'), L('Stores', 'Хранит'), L('Invalidated by', 'Сбрасывается')],
        rows: [
          [
            L('Browser cache', 'Кэш браузера'),
            L('Static assets and API responses', 'Статика и ответы API'),
            L('Cache headers and the user', 'Заголовки кэша и пользователь'),
          ],
          [
            L('Shared cache', 'Общий кэш'),
            L('Public responses at the edge', 'Публичные ответы на edge'),
            L('A purge request', 'Запрос на сброс'),
          ],
          [
            L('Application cache', 'Кэш приложения'),
            L('Expensive queries and remote calls', 'Дорогие запросы и удалённые вызовы'),
            L('Application code on write', 'Код приложения при записи'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The stampede', 'Лавина промахов'),
          text: L(
            'When a popular key expires, every request misses at once and the source of truth collapses under the load it was never sized for. Coalesce the misses behind one in-flight request, or serve the stale entry while a single refresh runs in the background.',
            'Когда популярный ключ истекает, все запросы промахиваются разом, и источник истины падает под нагрузкой, на которую его никогда не рассчитывали. Сливайте промахи за одним запросом в полёте или отдавайте устаревшую запись, пока один запрос обновляет её в фоне.'
          ),
        },
        {
          tone: 'warning',
          title: L('Cache keys carry the whole query', 'Ключ кэша несёт весь запрос'),
          text: L(
            'A key that omits one filter serves the wrong result to every user who shares the missing filter. Build the key from every input that changes the output, and never put a user id in a shared cache without scoping the entry to that user.',
            'Ключ, в котором пропущен один фильтр, отдаёт неверный результат всем, кто делит этот фильтр. Собирайте ключ из всех входов, меняющих результат, и никогда не кладите user id в общий кэш, не ограничив запись этим пользователем.'
          ),
        },
      ],
      takeaway: L(
        'A cache entry needs a lifetime, a version and a coalesced miss path, and the truth stays outside the cache.',
        'Записи кэша нужны срок жизни, версия и защита промаха, а истина остаётся за пределами кэша.'
      ),
      seeAlso: [
        L('Section 5-4: timeouts, retries and circuit breakers', 'Секция 5-4: таймауты, повторные попытки и предохранители'),
        L('Section 6-2: server state versus client state', 'Секция 6-2: серверное состояние против клиентского'),
      ],
    },
    {
      id: 'architecture-ch5-s6',
      title: L('Testing the architecture', 'Тестирование архитектуры'),
      body: L(
        'Architecture is code, so its rules can be checked like code. A dependency test walks the import graph of a module and asserts that a feature never imports another feature directly, that the data layer never imports the presentation layer, and that nothing outside a module reaches into its internals. The check reads files and imports, so it catches the violation that a reviewer misses.\n\nThese checks are fitness functions. They run in the same pipeline as the unit tests and fail the build when the architecture drifts, which turns a rule from a sentence in a wiki into a fact enforced on every commit. The rules worth enforcing are the few that would hurt the most when broken, not every direction that looks tidy on paper.\n\nThe tests that matter most sit at the boundaries: a contract test between a client and a provider, a test that the domain layer does not depend on the framework, and a test that the public API of a module exposes exactly what it promises and nothing more. Every layer rule has a matching test that would fail loudly if someone reached around it.',
        'Архитектура — это код, поэтому её правила можно проверять как код. Тест зависимостей обходит граф импортов модуля и утверждает, что одна фича никогда не импортирует другую напрямую, что слой данных не импортирует слой представления и что никто вне модуля не залезает в его внутренности. Проверка читает файлы и импорты, поэтому ловит нарушение, которое пропустил ревьюер.\n\nТакие проверки — это фитнес-функции. Они выполняются в том же конвейере, что и модульные тесты, и ломают сборку, когда архитектура отклоняется, и тем самым превращают правило из фразы в вики в факт, который проверяется на каждом коммите. Стоит закреплять только те немногие правила, которые дорого обойдутся при нарушении, а не каждое направление, которое аккуратно выглядит на бумаге.\n\nСамыми важными оказываются тесты на границах: контрактный тест между клиентом и провайдером, тест, что доменный слой не зависит от фреймворка, и тест, что публичный API модуля отдаёт ровно обещанное и ничего лишнего. У каждого правила слоёв есть парный тест, который громко упал бы, если кто-то обошёл границу.'
      ),
      bullets: [
        L('Dependency rules are tests, not wiki sentences.', 'Правила зависимостей — это тесты, а не фразы в вики.'),
        L('Enforce the few rules whose violation would hurt most.', 'Enforce только те правила, нарушение которых дороже всего.'),
        L('A boundary nobody checks is a comment.', 'Граница, которую никто не проверяет, — это комментарий.'),
        L('Contract tests belong to the boundary, not to one side of it.', 'Контрактные тесты принадлежат границе, а не одной из сторон.'),
        L('The fitness function must be measurable.', 'Фитнес-функция должна быть измеримой.'),
      ],
      code: `type Edge = { from: string; to: string };

const rules: Array<{ pattern: string; forbidden: string }> = [
  { pattern: 'features/', forbidden: 'features/billing' },
  { pattern: 'data/', forbidden: 'presentation/' },
];

function findViolations(edges: Edge[]): string[] {
  return edges
    .filter((edge) => rules.some((rule) => edge.from.startsWith(rule.pattern) && edge.to.includes(rule.forbidden)))
    .map((edge) => edge.from + ' imports ' + edge.to);
}

const edges: Edge[] = [
  { from: 'features/orders/api', to: 'features/billing/client' },
  { from: 'data/orders', to: 'presentation/orders' },
  { from: 'features/orders/ui', to: 'features/orders/model' },
];

console.log(findViolations(edges)); // two violations`,
      callouts: [
        {
          tone: 'tip',
          title: L('Keep the rule list short', 'Держите список правил коротким'),
          text: L(
            'A list of forty import rules gets ignored after the third false positive. Five rules that never fire are worth more, because a developer believes them.',
            'Список из сорока правил импортов перестают читать после третьего ложного срабатывания. Пять правил, которые не срабатывают впустую, ценят больше: разработчики им верят.'
          ),
        },
        {
          tone: 'note',
          title: L('The test is a fitness function', 'Тест — это фитнес-функция'),
          text: L(
            'Ask of every architecture rule the same question: what measurable property of the running system does it guarantee? A rule with no measurable property is a preference, and preferences belong in review comments.',
            'Задайте каждому правилу архитектуры один вопрос: какое измеримое свойство работающей системы оно гарантирует? Правило без измеримого свойства — это предпочтение, а предпочтения живут в комментариях ревью.'
          ),
        },
      ],
      takeaway: L(
        'Turn every architecture rule you actually care about into a test that fails the build, and keep the list short enough to be believed.',
        'Превратите каждое правило архитектуры, которое вам действительно важно, в тест, ломающий сборку, и держите список достаточно коротким, чтобы в него верили.'
      ),
      seeAlso: [
        L('Section 3-4: cycles and enforced boundaries', 'Секция 3-4: циклические зависимости и контроль границ'),
        L('Section 5-3: transactions, outbox and idempotency', 'Секция 5-3: транзакции, outbox и идемпотентность'),
        L('Section 7-5: reviewing an architecture over time', 'Секция 7-5: пересмотр архитектуры со временем'),
      ],
    },
  ],
};
