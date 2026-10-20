import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const architectureCh07: Chapter = {
  id: 'architecture-ch7',
  title: L('Architecture decisions and trade-offs', 'Архитектурные решения и компромиссы'),
  summary: L(
    'How to write an architecture decision record, how to judge the cost and the reversibility of a choice, how to express quality attributes as measurable scenarios, and how to review an architecture as the product and the team change.',
    'Как писать решение архитектуры, как оценивать цену и обратимость выбора, как формулировать атрибуты качества как измеримые сценарии и как пересматривать архитектуру по мере изменения продукта и команды.'
  ),
  sections: [
    {
      id: 'architecture-ch7-s1',
      title: L('ADRs and why they exist', 'ADR и зачем они нужны'),
      body: L(
        'An architecture decision record is a short document that captures a decision, the context that made it necessary, the alternatives that were considered and the consequences that were accepted. Its value is not the document itself but the memory: six months later nobody remembers why the payment integration was written in the boring way, and the first person who wonders usually changes it, usually badly.\n\nA record separates the decision from the implementation. The implementation lives in the diff and will change many times, while the decision captures the constraint that produced it, and that constraint is what has to be re-evaluated when the code is rewritten. Records outlive the code they explain, which is exactly why they are worth writing while the code is fresh and boring.\n\nRecords have a lifecycle: proposed, accepted, superseded, deprecated. A decision that is never revisited becomes folklore, and folklore is the most expensive kind of undocumented knowledge, because it cannot be questioned without offending somebody. Marking a record as superseded costs ten minutes and removes the guesswork for everyone who comes later.',
        'Решение архитектуры (ADR) — короткий документ, который фиксирует решение, контекст, который его потребовал, рассмотренные альтернативы и принятые последствия. Ценность не в документе, а в памяти: через полгода никто не помнит, почему интеграция с платежами написана таким скучным способом, и первый же засомневавшийся обычно меняет её, причём хуже.\n\nЗапись отделяет решение от реализации. Реализация живёт в диффе и будет меняться много раз, а решение хранит ограничение, которое её породило, и именно это ограничение придётся пересматривать, когда код переписывают. Записи переживают код, который они объясняют, и именно поэтому их стоит писать, пока код свежий и скучный.\n\nУ записей есть жизненный цикл: proposed, accepted, superseded, deprecated. Решение, к которому никогда не возвращаются, превращается в фольклор, а фольклор — самая дорогая форма недокументированного знания, потому что его нельзя поставить под сомнение, не обидев человека. Пометить запись как заменённую стоит десяти минут и снимает догадки со всех, кто придёт позже.'
      ),
      bullets: [
        L('A record captures the decision, the forces, the alternatives and the consequences.', 'Запись фиксирует решение, силы, альтернативы и последствия.'),
        L('The decision outlives the implementation that expressed it.', 'Решение переживает реализацию, которая его выразила.'),
        L('Status matters: proposed, accepted, superseded, deprecated.', 'Статус важен: proposed, accepted, superseded, deprecated.'),
        L('A superseded record stays in the repository, it is not deleted.', 'Заменённая запись остаётся в репозитории, её не удаляют.'),
        L('A record without alternatives is a note, not a decision.', 'Запись без альтернатив — это заметка, а не решение.'),
      ],
      code: `type AdrStatus = 'proposed' | 'accepted' | 'superseded' | 'deprecated';

type Adr = {
  number: number;
  title: string;
  status: AdrStatus;
  context: string;
  decision: string;
  alternatives: string[];
  consequences: string[];
  date: string;
};

const adr: Adr = {
  number: 7,
  title: 'Publish order events through a transactional outbox',
  status: 'accepted',
  context: 'The order and the event must both succeed or both fail.',
  decision: 'Write the event into an outbox table in the same transaction as the order.',
  alternatives: ['Dual write to the database and the broker'],
  consequences: ['At-least-once delivery', 'Consumers must be idempotent'],
  date: '2026-02-11',
};

console.log('ADR-' + adr.number + ': ' + adr.title + ' (' + adr.status + ')');`,
      table: {
        caption: L('The life of a decision record', 'Жизнь записи о решении'),
        headers: [L('Status', 'Статус'), L('Meaning', 'Значение'), L('Next step', 'Следующий шаг')],
        rows: [
          [
            L('proposed', 'proposed'),
            L('Written and open for discussion', 'Написано и вынесено на обсуждение'),
            L('Accept, rewrite or reject it', 'Принять, переписать или отклонить'),
          ],
          [
            L('accepted', 'accepted'),
            L('In force, the code follows it', 'Действует, код следует ему'),
            L('Implement and revisit when forces change', 'Реализовать и вернуться, когда силы изменятся'),
          ],
          [
            L('superseded', 'superseded'),
            L('Replaced by a newer record', 'Заменено более новой записью'),
            L('Link to the record that replaced it', 'Сослаться на заменившую запись'),
          ],
          [
            L('deprecated', 'deprecated'),
            L('No longer relevant at all', 'Больше не актуальна вовсе'),
            L('Keep it for the history', 'Оставить её для истории'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('One file, numbered, immutable', 'Один файл, с номером, без правок'),
          text: L(
            'Correcting a record in place destroys the history of the thinking. Add a new record that supersedes the old one, and let the pair tell the story of how the architecture got to its current shape.',
            'Правка записи на месте уничтожает историю размышления. Добавьте новую запись, заменяющую старую, и пусть эта пара расскажет, как архитектура пришла к нынешнему виду.'
          ),
        },
        {
          tone: 'note',
          title: L('The decision matters more than the implementation', 'Решение важнее реализации'),
          text: L(
            'The code will be rewritten by people who never met the author. The reason it was written that way is the part they cannot recover from the diff, and the part that saves them from repeating a mistake.',
            'Код перепишут люди, которые никогда не встречали автора. Причина, по которой он написан именно так, — часть, которую не восстановить из диффа, и часть, которая спасёт их от повторения старой ошибки.'
          ),
        },
      ],
      takeaway: L(
        'Write a numbered record for every decision that is expensive to reverse, and supersede records instead of editing them.',
        'Пишите пронумерованную запись на каждое решение, которое трудно обратить, и заменяйте записи, а не правьте их.'
      ),
      seeAlso: [
        L('Section 7-2: making and recording decisions', 'Секция 7-2: как принимать и фиксировать решения'),
        L('Chapter 4: service architecture', 'Глава 4: сервисная архитектура'),
      ],
    },
    {
      id: 'architecture-ch7-s2',
      title: L('Making and recording decisions', 'Как принимать и фиксировать решения'),
      body: L(
        'Not every choice deserves a record. The threshold is a decision that is expensive to reverse, that affects more than one team, or that a newcomer will question. Routine choices inside one module belong in the code and in the review comments, because a repository full of records about function names becomes noise that nobody reads and nobody maintains.\n\nA good record is written for the reader who arrives later. It states the forces that were in play, the option that was chosen and the options that were rejected, each with the reason it was rejected. The reason is the part that is lost first, because the rejected option usually looks attractive again as soon as the context changes, and without the reason somebody repeats the same discussion in six months.\n\nThe moment of the decision matters as much as its content. Write the record when the decision is taken, not after the implementation, because after the implementation the alternatives already look impossible and the record degenerates into a description of what was built. The record is written to be read in the future, and the future is closer than it seems.',
        'Не каждое решение заслуживает записи. Порог такой: решение трудно обратить, оно затрагивает больше одной команды или его поставит под сомнение новичок. Рутинные выборы внутри одного модуля живут в коде и в комментариях ревью, потому что репозиторий, полный записей о названиях функций, превращается в шум, который никто не читает и никто не поддерживает.\n\nХорошая запись написана для того, кто придёт позже. В ней названы силы, действовавшие в момент решения, выбранная опция и отклонённые опции, каждая с причиной отклонения. Причина теряется первой, потому что отклонённый вариант снова выглядит привлекательным, как только меняется контекст, и без причины через полгода кто-то повторит тот же разговор.\n\nМомент решения важен не меньше его содержания. Пишите запись тогда, когда решение принято, а не после реализации: после реализации альтернативы уже кажутся невозможными, и запись вырождается в описание сделанного. Запись пишут, чтобы её прочитали в будущем, а будущее ближе, чем кажется.'
      ),
      bullets: [
        L('Write a record only when the decision is expensive to reverse.', 'Пишите запись только тогда, когда решение трудно обратить.'),
        L('Record why a rejected option lost, not just that it lost.', 'Фиксируйте причину, по которой проиграла отклонённая опция, а не только сам факт.'),
        L('Write the record at the moment of the decision.', 'Пишите запись в момент принятия решения.'),
        L('The record names the forces, not only the outcome.', 'Запись называет силы, а не только исход.'),
        L('Keep one file per decision, numbered and immutable.', 'Храните по одному файлу на решение, с номером и без правок.'),
      ],
      code: `type Force = { pressure: string; importance: 'high' | 'medium' | 'low' };

type Option = { option: string; verdict: 'chosen' | 'rejected'; reason: string };

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
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The record written after the fact', 'Запись, написанная постфактум'),
          text: L(
            'A record written a month after the implementation contains only the decision and a list of options nobody considered. It documents the outcome and loses the reasoning, which is the only reason to keep the document at all.',
            'Запись, написанная через месяц после реализации, содержит только решение и список опций, которые никто не рассматривал. Она документирует исход и теряет рассуждение, а это единственная причина хранить документ вообще.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name the forces before the options', 'Сначала силы, потом опции'),
          text: L(
            'Writing the forces first prevents the discussion from being about the favourite option. Once the pressures are written down, it becomes visible that one of them was never addressed at all.',
            'Если сначала записать силы, обсуждение не сведётся к любимому варианту. Когда давления записаны, становится видно, что одно из них вообще никто не трогал.'
          ),
        },
      ],
      takeaway: L(
        'Record the forces and the rejected reasons at the moment of the decision, and keep the repository for decisions that matter.',
        'Фиксируйте силы и причины отклонения в момент принятия решения и храните в репозитории только те записи, которые действительно важны.'
      ),
      seeAlso: [
        L('Section 7-1: ADRs and why they exist', 'Секция 7-1: ADR и зачем они нужны'),
        L('Section 5-6: testing the architecture', 'Секция 5-6: тестирование архитектуры'),
        L('Section 7-3: cost of a decision and reversibility', 'Секция 7-3: цена решения и обратимость'),
      ],
    },
    {
      id: 'architecture-ch7-s3',
      title: L('Cost of a decision and reversibility', 'Цена решения и обратимость'),
      body: L(
        'The cost of a decision is not the time it takes to write the code, it is the price of changing your mind later. Some decisions are one-way doors: the data model, the language, the public API contract, the deployment model. Others are two-way doors, cheap to cross back and forth, where waiting for certainty costs more than being wrong.\n\nReversibility is a property of the choice and not of the team. A feature flag, an adapter behind an interface and a thin vertical slice all make an otherwise expensive decision cheap to undo, because the escape route is designed in before the cost is paid. The question to ask is not whether the decision is right, since nobody knows, but whether it can be taken back at a reasonable price.\n\nThe practical consequence is that reversible decisions should be made fast and irreversible ones slowly, and that the architecture should keep the expensive doors open for as long as possible. Where a one-way door cannot be avoided, spend the time to cross it consciously, record it, and plan the migration path that will be needed eventually.',
        'Цена решения — это не время на написание кода, а стоимость сменить мнение позже. Одни решения — односторонние двери: модель данных, язык, контракт публичного API, модель развёртывания. Другие — двусторонние, дешёвые в обе стороны, где ожидание уверенности обходится дороже, чем ошибка.\n\nОбратимость — свойство выбора, а не команды. Флаг функции, адаптер за интерфейсом и тонкий вертикальный срез делают дорогое решение дешёвым для отмены, потому что путь отхода спроектирован заранее, до того как выросла цена. Правильный вопрос не «правильное ли решение», ведь никто этого не знает, а «можно ли его взять назад за разумную цену».\n\nПрактическое следствие: обратимые решения принимают быстро, необратимые медленно, а архитектура должна держать дорогие двери открытыми как можно дольше. Там, где одностороннюю дверь не обойти, потратьте время на осознанный переход, запишите его и запланируйте путь миграции, который понадобится рано или поздно.'
      ),
      bullets: [
        L('The real cost of a decision is the price of changing your mind.', 'Настоящая цена решения — стоимость смены мнения.'),
        L('Data model, language and public contracts are one-way doors.', 'Модель данных, язык и публичные контракты — односторонние двери.'),
        L('A flag or an adapter turns a two-way door into a reversible choice.', 'Флаг или адаптер превращают двустороннюю дверь в обратимое решение.'),
        L('Make reversible decisions fast and irreversible ones slowly.', 'Обратимые решения принимайте быстро, необратимые — медленно.'),
        L('Plan the migration path when you cross a one-way door.', 'Планируйте путь миграции, проходя через одностороннюю дверь.'),
      ],
      code: `type Reversibility = 'one-way' | 'two-way';

type Choice = { area: string; reversibility: Reversibility; exitCostDays: number };

const choices: Choice[] = [
  { area: 'order schema in the database', reversibility: 'one-way', exitCostDays: 90 },
  { area: 'flag for the new checkout', reversibility: 'two-way', exitCostDays: 1 },
  { area: 'framework of the admin panel', reversibility: 'two-way', exitCostDays: 20 },
];

export function cheapestExit(options: Choice[]): Choice {
  return options.reduce((best, choice) => (choice.exitCostDays < best.exitCostDays ? choice : best));
}

export function oneWayDoors(options: Choice[]): Choice[] {
  return options.filter((choice) => choice.reversibility === 'one-way');
}`,
      table: {
        caption: L('One-way and two-way doors', 'Односторонние и двусторонние двери'),
        headers: [L('Decision', 'Решение'), L('Type', 'Тип'), L('Why', 'Почему')],
        rows: [
          [
            L('Order table schema', 'Схема таблицы заказов'),
            L('One-way', 'Односторонняя'),
            L('Existing rows and code depend on it', 'От неё зависят существующие строки и код'),
          ],
          [
            L('Public API contract', 'Контракт публичного API'),
            L('One-way', 'Односторонняя'),
            L('Consumers outside the team depend on it', 'От него зависят потребители вне команды'),
          ],
          [
            L('Choice of framework', 'Выбор фреймворка'),
            L('Two-way', 'Двусторонняя'),
            L('The code is behind an adapter', 'Код скрыт за адаптером'),
          ],
          [
            L('Feature behind a flag', 'Функция за флагом'),
            L('Two-way', 'Двусторонняя'),
            L('The switch turns it off in seconds', 'Переключатель выключает её за секунды'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The irreversible choice made in a hurry', 'Необратимый выбор, сделанный второпях'),
          text: L(
            'Choosing a data model in an afternoon because the deadline is today is the most expensive hour in the project. The code that depends on it will be rewritten many times, but the rows that were written under the old model will still be there in three years.',
            'Выбор модели данных за один день из-за дедлайна — самый дорогой час в проекте. Код поверх неё будут переписывать много раз, а строки, записанные по старой модели, останутся в базе через три года.'
          ),
        },
        {
          tone: 'tip',
          title: L('Buy reversibility before you need it', 'Покупайте обратимость заранее'),
          text: L(
            'The cheap moment to add the flag or the adapter is before the decision is made. Afterwards the same escape route costs a refactoring project, because the code has grown around the choice.',
            'Дешёвый момент добавить флаг или адаптер — до того как решение принято. После этого тот же путь отхода стоит отдельного проекта рефакторинга, потому что код вырос вокруг выбора.'
          ),
        },
      ],
      takeaway: L(
        'Classify a decision by the cost of undoing it, move fast through two-way doors and design the exit before you cross a one-way one.',
        'Классифицируйте решение по стоимости отмены: через двусторонние двери двигайтесь быстро, а выход из односторонней проектируйте до перехода.'
      ),
      seeAlso: [
        L('Section 5-1: configuration and feature flags', 'Секция 5-1: конфигурация и флаги функций'),
        L('Section 7-4: quality attributes and scenarios', 'Секция 7-4: атрибуты качества и сценарии'),
      ],
    },
    {
      id: 'architecture-ch7-s4',
      title: L('Quality attributes and scenarios', 'Атрибуты качества и сценарии'),
      body: L(
        'A quality attribute is not a goal but a measurable behaviour of the system under a condition. The concrete form is a quality attribute scenario: a source of stimulus, an environment, the artifact that reacts, the expected response and a measure that makes the response checkable. Without the measure it is a slogan, and slogans cannot be traded off against each other.\n\nThe measure turns a wish into a requirement. The system must be fast cannot be tested, while under a load of a thousand concurrent checkout requests, 95 percent of the checkouts complete in under 800 milliseconds can be turned into a load test and a panel on a dashboard. The same sentence also says what may be sacrificed, because a limit on the response time forces a decision about what the system refuses to do under load.\n\nScenarios also expose the trade-offs that adjectives hide. Every scenario is a claim about priority, and a set of scenarios that cannot all hold at once shows where the real trade-off lives. That is usually more useful than the adjective itself, because the team can argue about the concrete number and about the artifact that has to change.',
        'Атрибут качества — это не цель, а измеримое поведение системы при определённом условии. Конкретная форма называется сценарием качества: источник стимула, среда, артефакт, который реагирует, ожидаемая реакция и мера, делающая реакцию проверяемой. Без меры это лозунг, а лозунгами нельзя торговаться между собой.\n\nМера превращает пожелание в требование. «Система должна быть быстрой» не проверяется, а вот «под нагрузкой в тысячу одновременных оформлений заказа 95 процентов заказов завершаются меньше чем за 800 миллисекунд» превращается в нагрузочный тест и панель на дашборде. Та же фраза говорит, чем можно пожертвовать, потому что ограничение времени ответа заставляет решить, от чего система откажется под нагрузкой.\n\nСценарии вскрывают компромиссы, скрытые прилагательными. Каждый сценарий — утверждение о приоритете, а набор сценариев, который не может выполняться одновременно, показывает, где настоящий компромисс. Обычно это полезнее самого прилагательного, потому что команда спорит о конкретном числе и о том, какой артефакт должен измениться.'
      ),
      bullets: [
        L('A quality attribute is a behaviour under a condition, not a wish.', 'Атрибут качества — поведение при условии, а не пожелание.'),
        L('A scenario has a stimulus, an environment, an artifact, a response and a measure.', 'Сценарий состоит из стимула, среды, артефакта, реакции и меры.'),
        L('The measure is what makes a requirement testable.', 'Мера превращает требование в проверяемое.'),
        L('Two scenarios that conflict reveal a real priority.', 'Два конфликтующих сценария показывают настоящий приоритет.'),
        L('Write the scenarios before choosing the design.', 'Пишите сценарии до выбора решения.'),
      ],
      code: `type Scenario = {
  stimulus: string;
  environment: string;
  artifact: string;
  response: string;
  measure: { metric: string; target: number; unit: 'ms' | 'percent' | 'per second' };
};

const checkout: Scenario = {
  stimulus: 'a user submits the checkout form',
  environment: 'under normal load',
  artifact: 'the checkout service',
  response: 'completes the order and returns a confirmation',
  measure: { metric: 'p95 latency', target: 800, unit: 'ms' },
};

export function meetsTarget(actual: number, scenario: Scenario): boolean {
  return actual <= scenario.measure.target;
}`,
      table: {
        caption: L('Quality attributes written as scenarios', 'Атрибуты качества, записанные как сценарии'),
        headers: [L('Attribute', 'Атрибут'), L('Scenario', 'Сценарий'), L('Measure', 'Мера')],
        rows: [
          [
            L('Performance', 'Производительность'),
            L('A checkout request arrives under normal load', 'Запрос оформления при обычной нагрузке'),
            L('95 percent under 800 ms', '95 процентов быстрее 800 мс'),
          ],
          [
            L('Availability', 'Доступность'),
            L('A dependency stops answering', 'Зависимость перестаёт отвечать'),
            L('Requests fail fast under 1 percent', 'Менее 1 процента запросов падает быстро'),
          ],
          [
            L('Modifiability', 'Модифицируемость'),
            L('A new payment provider is added', 'Добавляется новый платёжный провайдер'),
            L('One adapter changes, no use case changes', 'Меняется один адаптер, сценарии не меняются'),
          ],
          [
            L('Security', 'Безопасность'),
            L('A caller sends a token that expired', 'Клиент присылает истёкший токен'),
            L('The request is rejected in under 100 ms', 'Запрос отклоняется быстрее 100 мс'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The adjective as a requirement', 'Прилагательное вместо требования'),
          text: L(
            'Scalable, fast and reliable cannot be tested and cannot fail, so they cannot be traded against each other either. A scenario with a number at the end is what turns a discussion into a decision.',
            'Масштабируемость, быстрота и надёжность нельзя проверить и нельзя нарушить, поэтому ими нельзя торговаться. Сценарий с числом в конце превращает обсуждение в решение.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name the artifact', 'Называйте артефакт'),
          text: L(
            'The artifact tells the team which part of the system has to change. Without it, a latency requirement produces a general promise to be fast, and everybody assumes somebody else will handle it.',
            'Артефакт говорит команде, какая часть системы должна измениться. Без него требование к задержке превращается в общее обещание быть быстрым, и каждый считает, что это сделает кто-то другой.'
          ),
        },
      ],
      takeaway: L(
        'Write every quality requirement as a scenario with a measure, and let conflicting scenarios tell you where the trade-off really is.',
        'Записывайте каждое требование к качеству как сценарий с мерой и позволяйте конфликтующим сценариям показать, где на самом деле компромисс.'
      ),
      seeAlso: [
        L('Section 5-5: caching layers', 'Секция 5-5: слои кэша'),
        L('Section 5-4: timeouts, retries and circuit breakers', 'Секция 5-4: таймауты, повторные попытки и предохранители'),
        L('Section 7-5: reviewing an architecture over time', 'Секция 7-5: пересмотр архитектуры со временем'),
      ],
    },
    {
      id: 'architecture-ch7-s5',
      title: L('Reviewing an architecture over time', 'Пересмотр архитектуры со временем'),
      body: L(
        'Architecture has a shelf life. The forces that justified the original structure, the size of the team, the traffic, the product itself, change within a year or two, and the structure that was right for the old forces becomes the obstacle in the new ones. Teams that ignore this keep defending a design that stopped paying for itself.\n\nThe review is not a redesign. It starts from the fitness functions, the measurable checks that encode the qualities the architecture was supposed to deliver, and asks which of them still hold: the response time, the number of deployments, the number of people who can change a module without coordination. A quality that no longer has a measurement cannot be reviewed, it can only be argued about.\n\nA review that ends in a rewrite is usually a sign that the team skipped the incremental path. Architecture evolves by replacing one module at a time, keeping the boundaries while changing the contents, and by adding the missing checks before the missing structure. A boundary that nothing enforces is a comment, and a comment does not survive a redesign.',
        'У архитектуры есть срок годности. Силы, которые оправдали исходную структуру, размер команды, трафик и сам продукт меняются за год-два, и структура, подходившая под старые силы, становится препятствием под новые. Команды, которые это игнорируют, продолжают защищать решение, которое уже перестало окупаться.\n\nПересмотр — это не редизайн. Он начинается с фитнес-функций, измеримых проверок, которые кодируют качества, ради которых архитектура строилась, и спрашивает, какие из них ещё выполняются: время ответа, число развёртываний, число людей, которые могут менять модуль без координации. Качество, у которого больше нет измерения, нельзя пересмотреть, о нём можно только спорить.\n\nПересмотр, заканчивающийся переписыванием, обычно означает, что команда пропустила пошаговый путь. Архитектура развивается заменой одного модуля за раз: границы сохраняются, содержимое меняется, а недостающие проверки добавляются раньше недостающей структуры. Граница, которую ничего не проверяет, — это комментарий, а комментарий не переживает редизайн.'
      ),
      bullets: [
        L('Architecture has a shelf life, review it against the forces of today.', 'У архитектуры есть срок годности, проверяйте её по сегодняшним силам.'),
        L('Start the review from the fitness functions, not from preferences.', 'Начинайте пересмотр с фитнес-функций, а не с предпочтений.'),
        L('A quality without a measurement cannot be reviewed.', 'Качество без измерения нельзя пересмотреть, о нём только спорят.'),
        L('Evolution replaces modules and keeps the boundaries.', 'Эволюция заменяет модули и сохраняет границы.'),
        L('Add the missing checks before the missing structure.', 'Сначала добавляйте недостающие проверки, потом недостающую структуру.'),
      ],
      code: `type Fitness = { name: string; target: number; actual: number; unit: string };

const fitness: Fitness[] = [
  { name: 'p95 checkout latency', target: 800, actual: 640, unit: 'ms' },
  { name: 'deployments per week', target: 5, actual: 2, unit: 'deploys' },
  { name: 'modules changed without coordination', target: 3, actual: 7, unit: 'modules' },
];

export function needsAttention(metrics: Fitness[]): Fitness[] {
  return metrics.filter((metric) => metric.actual < metric.target);
}`,
      callouts: [
        {
          tone: 'note',
          title: L('Review the qualities, not the diagram', 'Проверяйте качества, а не схему'),
          text: L(
            'A box and arrow diagram looks the same whether the system is fast or slow. The review starts from the numbers the qualities were supposed to produce and works backwards to the structure that produced them.',
            'Схема со стрелками выглядит одинаково, быстрая система или медленная. Пересмотр начинается с чисел, которые должны были дать качества, и идёт обратно к структуре, которая их дала.'
          ),
        },
        {
          tone: 'warning',
          title: L('Evolution is not a rewrite', 'Эволюция — это не переписывание'),
          text: L(
            'Replacing a module behind a stable interface keeps the rest of the system working. Replacing the whole system puts every team on hold and delivers the new structure only after the last module is ported.',
            'Замена модуля за устойчивым интерфейсом оставляет остальную систему работающей. Замена всей системы ставит все команды на паузу и отдаёт новую структуру только после переноса последнего модуля.'
          ),
        },
      ],
      takeaway: L(
        'Review the architecture against the measurable qualities it promised, and evolve it one module at a time behind stable boundaries.',
        'Проверяйте архитектуру по измеримым качествам, которые она обещала, и развивайте её по модулю за раз за устойчивыми границами.'
      ),
      seeAlso: [
        L('Section 5-6: testing the architecture', 'Секция 5-6: тестирование архитектуры'),
        L('Section 7-4: quality attributes and scenarios', 'Секция 7-4: атрибуты качества и сценарии'),
        L('Section 6-6: migrating a legacy frontend', 'Секция 6-6: миграция легаси-фронтенда'),
      ],
    },
  ],
};
