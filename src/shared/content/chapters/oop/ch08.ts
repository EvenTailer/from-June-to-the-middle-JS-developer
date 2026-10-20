import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopCh08: Chapter = {
  id: 'oop-ch8',
  title: L('Failure handling in object-oriented code', 'Обработка отказов в объектно-ориентированном коде'),
  summary: L(
    'Exceptions against result types, the places where a failure is caught on purpose, the conditions under which a retry is safe, and what a domain layer should and should not write to a log.',
    'Исключения против типов результата, места, где отказ перехватывают осознанно, условия безопасности повторных попыток и то, что доменный слой должен и не должен писать в журнал.'
  ),
  sections: [
    {
      id: 'oop-ch8-s1',
      title: L('Exceptions versus result types', 'Исключения против типов результата'),
      body: L(
        'There are two ways to report a failure: throw an exception, or return a value that describes the outcome. Exceptions suit the exceptional and the deep, because they unwind the stack without forcing every caller to write a branch. Result types suit the expected, because the caller has to handle the case and the compiler enforces it. The choice is not stylistic, it is about who is supposed to know about the failure.\n\nThe trap of the exception is that it is invisible in the signature. A function that throws keeps its type, so the caller receives no reminder that the happy path can end, and a forgotten try block turns a recoverable error into a crash far away from the cause. The trap of the result type is that it pollutes every signature and every intermediate step, and a chain of transformations has to unwrap each result before it can use the value.\n\nA workable rule is to use results at the boundary where a failure is a normal business outcome, such as a validation error, an insufficient balance or a missing record, and to use exceptions for the abnormal, where continuing makes no sense, such as a programming error or an unreachable branch. Mixing the two without a rule is what produces a codebase where half the errors are caught and rethrown and the other half are swallowed.',
        'Отказ можно сообщить двумя способами: бросить исключение или вернуть значение, описывающее исход. Исключения подходят исключительному и глубокому, потому что раскручивают стек, не заставляя каждого вызывающего писать ветку. Типы результата подходят ожидаемому, потому что вызывающий обязан обработать случай, и компилятор это требует. Выбор не стилистический, а про то, кому положено знать об отказе.\n\nЛовушка исключения в том, что оно невидимо в сигнатуре. Функция, которая бросает, сохраняет свой тип, поэтому вызывающий не получает напоминания, что счастливый путь может закончиться, а забытый try превращает восстановимую ошибку в падение далеко от причины. Ловушка типа результата в том, что он засоряет каждую сигнатуру и каждый промежуточный шаг, и цепочке преобразований приходится разворачивать каждый результат, прежде чем использовать значение.\n\nРабочее правило: используйте результаты там, где отказ — обычный бизнес-исход, например при ошибке валидации, нехватке средств или отсутствии записи, а исключения — для аномального, где продолжать бессмысленно, например для ошибки в программе или недостижимой ветки. Смешивание без правила порождает кодовую базу, в которой половина ошибок перехватывается и перебрасывается, а половина проглатывается.'
      ),
      bullets: [
        L('Exceptions unwind the stack, result types force the caller to handle the case.', 'Исключения раскручивают стек, типы результата заставляют вызывающего обработать случай.'),
        L('An exception is invisible in the type, so the caller gets no reminder.', 'Исключение не видно в типе, и вызывающий не получает напоминания.'),
        L('A result type pollutes every signature in the chain.', 'Тип результата засоряет каждую сигнатуру в цепочке.'),
        L('Use results for expected business outcomes and exceptions for abnormal states.', 'Результаты — для ожидаемых бизнес-исходов, исключения — для аномальных состояний.'),
        L('Pick one convention per layer and never mix them silently.', 'Выберите одно соглашение на слой и не смешивайте их молча.'),
      ],
      code: `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function withdraw(balance: number, amount: number): Result<number, string> {
  if (amount > balance) return { ok: false, error: 'insufficient funds' };
  return { ok: true, value: balance - amount };
}

const outcome = withdraw(100, 30);

if (outcome.ok) {
  console.log('left', outcome.value);
} else {
  console.error(outcome.error);
}`,
      table: {
        caption: L('Two ways to report a failure', 'Два способа сообщить об отказе'),
        headers: [L('Aspect', 'Аспект'), L('Exception', 'Исключение'), L('Result type', 'Тип результата')],
        rows: [
          [L('Visibility', 'Видимость'), L('Hidden in the signature', 'Скрыто в сигнатуре'), L('Visible in the type', 'Видно в типе')],
          [L('Handling', 'Обработка'), L('Optional, often forgotten', 'Необязательна, часто забывают'), L('Mandatory, enforced by the compiler', 'Обязательна, проверяется компилятором')],
          [L('Composition', 'Композиция'), L('Easy to chain', 'Легко выстраивать'), L('Every step unwraps', 'Каждый шаг разворачивает')],
          [L('Best fit', 'Лучше всего для'), L('Abnormal, deep failures', 'Аномальных и глубоких отказов'), L('Expected, shallow failures', 'Ожидаемых и поверхностных отказов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The catch that swallows the reason', 'Catch, который съедает причину'),
          text: L(
            'A catch block that logs a generic message and returns a default value turns a specific defect into a silent wrong answer. If you catch, either restore the original error as the cause of a new one, or return a result that carries the reason to the caller.',
            'Блок catch, который пишет общее сообщение в журнал и возвращает значение по умолчанию, превращает конкретный дефект в тихий неверный ответ. Если перехватываете, либо сохраняйте исходную ошибку как причину новой, либо возвращайте результат, несущий причину вызывающему.'
          ),
        },
      ],
      takeaway: L(
        'Return a result when the failure is a normal business outcome and throw when continuing would be meaningless.',
        'Возвращайте результат, когда отказ — обычный бизнес-исход, и бросайте исключение, когда продолжать бессмысленно.'
      ),
      seeAlso: [
        L('Section 8-2: error boundaries and recovery', 'Секция 8-2: границы ошибок и восстановление'),
        L('Section 6-1: entities, aggregates and invariants', 'Секция 6-1: сущности, агрегаты и инварианты'),
      ],
    },
    {
      id: 'oop-ch8-s2',
      title: L('Error boundaries and recovery', 'Границы ошибок и восстановление'),
      body: L(
        'An error boundary is a place where a failure is caught on purpose, translated into something the caller can act on, and then either recovered from or converted into a different kind of failure. The point is to catch at a level that knows what to do: the layer that can retry, that can show a message, or that can fall back to a default value. Catching lower than that produces a handler that can only log, which is exactly the handler that should not exist.\n\nThe distinction to keep is between the failures a boundary knows how to handle and everything else. A catch-all that logs and continues hides defects, and a catch-all that rethrows as a generic Error destroys the information the original error carried. Recovery is a decision rather than a reflex: fall back to a default, retry the operation, ask the user, or stop and report. Each of those is a different product decision.\n\nRecovery also needs a place to put the state. When a multi-step operation fails halfway, the operation must either be atomic or have a way to roll back what it already did. That is exactly what the unit of work provides, because the writes are buffered and applied once, so a failure leaves nothing behind. Without that mechanism, a partial failure leaves the system in a state nobody designed, which is the worst kind of state to debug.',
        'Граница ошибок — это место, где отказ перехватывают осознанно, переводят в нечто, на что вызывающий может отреагировать, и затем либо восстанавливаются, либо превращают отказ в отказ другого рода. Смысл в том, чтобы перехватывать на уровне, который знает, что делать: на слое, который умеет повторить, показать сообщение или подставить значение по умолчанию. Перехват ниже даёт обработчик, который умеет только записать в журнал, а такой обработчик как раз и не нужен.\n\nВажно удерживать различие между отказами, с которыми граница умеет работать, и всем остальным. Catch-all, который пишет в журнал и продолжает, прячет дефекты, а catch-all, который перебрасывает всё как общий Error, уничтожает сведения, несённые исходной ошибкой. Восстановление — это решение, а не рефлекс: подставить значение по умолчанию, повторить операцию, спросить пользователя или остановиться и сообщить. Каждый вариант — отдельное продуктовое решение.\n\nВосстановлению нужно ещё место, куда деть состояние. Когда многошаговая операция падает на середине, она должна быть либо атомарной, либо уметь откатить сделанное. Именно это даёт единица работы: записи буферизуются и применяются разом, поэтому при отказе не остаётся ничего. Без такого механизма частичный отказ оставляет систему в состоянии, которое никто не проектировал, а это худшее из состояний для отладки.'
      ),
      bullets: [
        L('Catch at the layer that knows what to do about the failure.', 'Перехватывайте на слое, который знает, что с отказом делать.'),
        L('Let unknown failures through instead of logging and continuing.', 'Неизвестные отказы пропускайте дальше, а не логируйте и не продолжайте.'),
        L('Preserve the original error as the cause when you translate it.', 'Переводя ошибку, сохраняйте исходную как причину.'),
        L('Recovery needs atomicity, so buffer the writes and apply them once.', 'Восстановлению нужна атомарность: буферизуйте записи и применяйте их разом.'),
        L('A catch-all that swallows the error converts a defect into silence.', 'Catch-all, который глотает ошибку, превращает дефект в тишину.'),
      ],
      code: `class DomainError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}

async function loadProfile(id: string): Promise<string> {
  try {
    const response = await fetch('/api/users/' + id);
    if (!response.ok) throw new DomainError('NOT_FOUND', 'no user ' + id);
    return await response.text();
  } catch (error) {
    if (error instanceof DomainError) throw error;
    throw new DomainError('NETWORK', 'profile request failed');
  }
}`,
      table: {
        caption: L('What to do with a caught failure', 'Что делать с перехваченным отказом'),
        headers: [L('Situation', 'Ситуация'), L('Right move', 'Правильное действие'), L('Wrong move', 'Неправильное действие')],
        rows: [
          [L('Known, recoverable', 'Известный, восстановимый'), L('Retry or fall back', 'Повторить или подставить значение'), L('Propagate it', 'Пробросить дальше')],
          [L('Known, business rule', 'Известный, бизнес-правило'), L('Return a result', 'Вернуть результат'), L('Throw', 'Бросить исключение')],
          [L('Unknown', 'Неизвестный'), L('Log with context and rethrow', 'Записать с контекстом и пробросить'), L('Log and continue', 'Записать и продолжить')],
          [L('Partial write', 'Частичная запись'), L('Roll back the unit of work', 'Откатить единицу работы'), L('Leave the half state', 'Оставить полузаписанное состояние')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('A boundary is a design decision', 'Граница — это проектное решение'),
          text: L(
            'Choosing where a failure is caught is not a technical detail but a decision about the product: does the user see a message, does the request retry itself, or does the whole operation stop? Write that decision down in the code by naming the boundary, and by making the fallback visible in the signature.',
            'Выбор места перехвата — не техническая деталь, а решение о продукте: пользователь увидит сообщение, запрос повторит себя или вся операция остановится? Запишите это решение в коде именем границы и тем, что запасной вариант виден в сигнатуре.'
          ),
        },
      ],
      takeaway: L(
        'Catch only what you can handle, translate it without losing the cause, and make the writes atomic.',
        'Перехватывайте только то, с чем можете справиться, переводите без потери причины и делайте записи атомарными.'
      ),
      seeAlso: [
        L('Section 8-3: retries, idempotency and failure modes', 'Секция 8-3: повторные попытки, идемпотентность и виды отказов'),
        L('Section 5-3: repository and unit of work', 'Секция 5-3: репозиторий и единица работы'),
      ],
    },
    {
      id: 'oop-ch8-s3',
      title: L('Retries, idempotency and failure modes', 'Повторные попытки, идемпотентность и виды отказов'),
      body: L(
        'A retry is safe only when repeating the operation cannot produce a different second effect. That property is idempotency: setting a status to paid twice is the same as setting it once, while adding ten units twice is not. Before adding a retry loop, decide what happens when the request actually succeeded but the response was lost, because that is exactly the case the loop will hit, and the answer decides whether a retry is safe at all.\n\nRetries need backoff and a limit. Immediate retries hit a service that is already struggling, so wait longer each time, add jitter so that many clients do not come back in one synchronised wave, and stop after a few attempts. A retry without a limit converts a slow failure into a slow hang, and the user waits while the client politely asks again and again for a service that will never answer.\n\nFailure modes are worth naming, because each one asks for a different reaction. A fault is a problem the process cannot fix, an error is a bad input or a bad state that the caller can correct, and a failure is the loss of a resource the service depends on. The circuit breaker exists for the third kind: after enough consecutive failures it stops sending requests and returns the cached failure, which gives the dependency time to recover and keeps the failure from spreading through your own service.',
        'Повтор безопасен, только если повтор операции не даёт другого второго эффекта. Это свойство называется идемпотентностью: дважды поставить статус «оплачено» — то же самое, что один раз, а вот прибавить десять единиц дважды — уже нет. Прежде чем добавлять цикл повторов, решите, что будет, если запрос на самом деле прошёл, а ответ потерялся: цикл нацелится именно на этот случай, и от ответа зависит, безопасен ли повтор вообще.\n\nПовторам нужен откат и предел. Немедленные повторы бьют по сервису, которому и так тяжело, поэтому ждите каждый раз чуть дольше, добавляйте джиттер, чтобы клиенты не возвращались одной синхронной волной, и останавливайтесь после нескольких попыток. Повтор без предела превращает медленный отказ в медленное зависание: пользователь ждёт, пока клиент вежливо спрашивает сервис, который так и не ответит.\n\nВиды отказов стоит различать, потому что каждый требует своей реакции. Неисправность — проблема, которую процесс не может починить, ошибка — плохие входные данные или состояние, которое вызывающий может исправить, а отказ — потеря ресурса, от которого зависит сервис. Предохранитель существует ради третьего вида: после нескольких отказов подряд он перестаёт отправлять запросы и возвращает закешированную ошибку, что даёт зависимости время восстановиться и не даёт отказу распространиться по вашему сервису.'
      ),
      bullets: [
        L('A retry is safe only when the operation is idempotent.', 'Повтор безопасен, только когда операция идемпотентна.'),
        L('Idempotency is about the second effect, not about the first result.', 'Идемпотентность — про второй эффект, а не про первый результат.'),
        L('Back off exponentially, add jitter and cap the number of attempts.', 'Отступайте экспоненциально, добавляйте джиттер и ограничивайте число попыток.'),
        L('A retry without a limit turns a failure into a hang.', 'Повтор без ограничения превращает отказ в зависание.'),
        L('The circuit breaker stops calling a dependency that keeps failing.', 'Предохранитель перестаёт вызывать зависимость, которая падает.'),
      ],
      code: `async function withRetry<T>(task: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown = new Error('no attempts left');

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const delay = Math.pow(2, attempt) * 100;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}`,
      table: {
        caption: L('Three kinds of failure', 'Три вида отказов'),
        headers: [L('Kind', 'Вид'), L('Example', 'Пример'), L('Reaction', 'Реакция')],
        rows: [
          [L('Fault', 'Неисправность'), L('A bug, a null dereference', 'Баг, разыменование null'), L('Fix the code, do not retry', 'Чинить код, а не повторять')],
          [L('Error', 'Ошибка'), L('An invalid email, a bad id', 'Некорректный email, плохой id'), L('Report it to the caller', 'Сообщить вызывающему')],
          [L('Failure', 'Отказ'), L('The database is down', 'База данных недоступна'), L('Retry, then trip the breaker', 'Повторить, затем сработает предохранитель')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The retried payment', 'Повторённая оплата'),
          text: L(
            'Retrying a payment request without an idempotency key can charge the customer twice, and the second charge is the one that reaches the statement while the first one is lost in a timeout. Send an idempotency key with the request and let the server recognise the repeat.',
            'Повтор запроса на оплату без ключа идемпотентности может списать деньги дважды, причём до выписки дойдёт второй, а первый потеряется в таймауте. Отправляйте вместе с запросом ключ идемпотентности и позвольте серверу распознать повтор.'
          ),
        },
      ],
      takeaway: L(
        'Retry only idempotent operations, back off with jitter, and stop after a few attempts.',
        'Повторяйте только идемпотентные операции, отступайте с джиттером и останавливайтесь после нескольких попыток.'
      ),
      seeAlso: [
        L('Section 8-1: exceptions versus result types', 'Секция 8-1: исключения против типов результата'),
        L('Section 5-3: repository and unit of work', 'Секция 5-3: репозиторий и единица работы'),
      ],
    },
    {
      id: 'oop-ch8-s4',
      title: L('Logging and observability in the domain layer', 'Логирование и наблюдаемость в доменном слое'),
      body: L(
        'The domain layer should not log. It should fail with a meaningful error, and the layer that knows the request context decides how to record it. Logging inside the domain couples business code to an output format, floods the console with information nobody asked for, and produces entries that lack the request id, the user id and the trace context that the outer layer already has.\n\nWhat never belongs in a log is anything that identifies a person or grants access: passwords, tokens, session ids, card numbers, the whole body of an authorisation request. Secrets end up in logs because logging them was the easiest way to debug something once, and then the log file becomes a place where secrets live. Where you must record something sensitive, record a hash or a masked form, and put the masking into the logger instead of repeating the decision at every call site.\n\nObservability in the domain means the errors carry enough structure to be counted and grouped: a stable error code, the identifier of the entity, and the operation that failed. Those three answer most questions without reading logs line by line, and they let a dashboard count failures per operation. A domain error with a code is also easier to handle, because the code is what the boundary matches on when it decides whether to retry.',
        'Доменный слой не должен логировать. Он должен падать с осмысленной ошибкой, а как её записывать, решает слой, который знает контекст запроса. Логирование внутри домена связывает бизнес-код с форматом вывода, засоряет консоль информацией, которой никто не просил, и создаёт записи без идентификатора запроса, идентификатора пользователя и контекста трассировки, которые есть у внешнего слоя.\n\nВ журнал никогда не попадает то, что опознаёт человека или даёт доступ: пароли, токены, идентификаторы сессий, номера карт, целиком тело запроса авторизации. Секреты оказываются в журналах потому, что однажды так было проще всего отладить, и после этого файл журнала становится местом, где живут секреты. Если что-то чувствительное записать всё же нужно, записывайте хеш или замаскированное значение, а маскирование вынесите в логгер, а не повторяйте решение в каждом месте вызова.\n\nНаблюдаемость в домене означает, что ошибки несут достаточно структуры, чтобы их можно было считать и группировать: стабильный код ошибки, идентификатор сущности и операция, которая не удалась. Этих трёх вещей хватает, чтобы отвечать на большинство вопросов, не читая журнал построчно, и чтобы панель считала отказы по операциям. Доменной ошибке с кодом ещё и легче обрабатывать, потому что именно по коду граница решает, стоит ли повторять.'
      ),
      bullets: [
        L('The domain fails with a meaningful error, the outer layer decides how to record it.', 'Домен падает с осмысленной ошибкой, а как её записывать решает внешний слой.'),
        L('Never log passwords, tokens, session ids or card numbers.', 'Никогда не логируйте пароли, токены, идентификаторы сессий и номера карт.'),
        L('Mask sensitive values inside the logger, not at each call site.', 'Маскируйте чувствительные значения в логгере, а не в каждом месте вызова.'),
        L('A stable error code lets you count and group failures.', 'Стабильный код ошибки позволяет считать и группировать отказы.'),
        L('The entity id and the failing operation answer most questions.', 'Идентификатор сущности и упавшая операция отвечают на большинство вопросов.'),
      ],
      code: `class DomainError extends Error {
  readonly code: string;
  readonly entityId: string;

  constructor(code: string, entityId: string, message: string) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.entityId = entityId;
  }
}

function maskCard(value: string): string {
  return '*'.repeat(Math.max(0, value.length - 4)) + value.slice(-4);
}

maskCard('4242424242424242'); // '************4242'`,
      table: {
        caption: L('Where a log line may come from', 'Откуда может прийти строка журнала'),
        headers: [L('Layer', 'Слой'), L('What it adds', 'Что добавляет'), L('What it must not log', 'Что нельзя логировать')],
        rows: [
          [L('Domain', 'Домен'), L('The error code and the entity id', 'Код ошибки и идентификатор сущности'), L('The stack trace of an unexpected crash', 'Стек неожиданного падения')],
          [L('Application', 'Прикладной'), L('The use case name and the request id', 'Имя сценария и идентификатор запроса'), L('Business payloads in full', 'Бизнес-данные целиком')],
          [L('Infrastructure', 'Инфраструктура'), L('The endpoint, the status, the duration', 'Эндпоинт, статус, длительность'), L('Authorization headers and bodies', 'Заголовки авторизации и тела запросов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The log with the token in it', 'Журнал с токеном внутри'),
          text: L(
            'Logging a request object "for debugging" often prints the authorization header or the password field along with the useful part. When that line reaches a third-party log service, the secret is stored outside your control. Build the log record from an explicit list of fields instead of dumping the object.',
            'Логирование объекта запроса «для отладки» часто печатает вместе с полезным заголовок авторизации или пароль. Когда такая строка уходит в сторонний сервис журналов, секрет оказывается вне вашего контроля. Собирайте запись журнала из явного списка полей, а не дампом объекта.'
          ),
        },
        {
          tone: 'tip',
          title: L('Count errors, do not read them', 'Считайте ошибки, а не читайте их'),
          text: L(
            'A stable code on every domain error turns a pile of text lines into a metric. You can then alert on the rate of one code, find the affected records by entity id, and skip the log entirely during the incident.',
            'Стабильный код на каждой доменной ошибке превращает гору текстовых строк в метрику. Дальше можно поднять тревогу по частоте одного кода, найти затронутые записи по идентификатору сущности и во время инцидента не открывать журнал вовсе.'
          ),
        },
      ],
      takeaway: L(
        'Keep the domain free of logging, mask secrets in the logger, and give every error a code you can count.',
        'Держите домен свободным от логирования, маскируйте секреты в логгере и давайте каждой ошибке код, который можно посчитать.'
      ),
      seeAlso: [
        L('Section 8-1: exceptions versus result types', 'Секция 8-1: исключения против типов результата'),
        L('Section 7-1: pure functions and referential transparency', 'Секция 7-1: чистые функции и прозрачность по подстановке'),
      ],
    },
  ],
};
