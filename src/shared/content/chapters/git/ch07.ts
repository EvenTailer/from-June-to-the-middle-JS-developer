import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh07: Chapter = {
  id: 'git-ch7',
  title: L('Advanced git', 'Продвинутый Git'),
  summary: L(
    'How bisect finds a bad commit, what blame and notes can and cannot tell you, when cherry-pick is the right tool, how sparse checkout and partial clone tame a huge repository, how signing proves authorship, and where hooks end and continuous integration begins.',
    'Как bisect находит сломанный коммит, что blame и notes могут и чего не могут сказать, когда нужен cherry-pick, как sparse checkout и partial clone усмиряют огромный репозиторий, как подпись доказывает авторство и где заканчиваются хуки и начинается непрерывная интеграция.'
  ),
  sections: [
    {
      id: 'git-ch7-s1',
      title: L('Git bisect', 'Разрезание'),
      body: L(
        'Bisect finds the commit that introduced a bug by binary search over the history. You mark one commit as good and one as bad, and Git checks out the midpoint, asks you to test it, and narrows the range according to your answer. Each answer halves the number of candidates, so a thousand commits take about ten rounds instead of a thousand builds. The name comes from the old word for dividing something into two parts.\n\nThe state of the search lives in the repository, so an interrupted bisect can be resumed later. git bisect start enters the mode, git bisect bad <commit> and git bisect good <commit> mark the ends of the range, and the same two commands with no argument answer for the commit currently checked out. git bisect log prints every decision taken, which is the record of how the answer was reached, and git bisect reset puts you back on the branch you started from.\n\nThe part that makes bisect practical is automation. git bisect run <script> executes a command at every step and reads its exit code as the answer: zero means good, anything else means bad. That turns bisect from a manual ritual into one command that can run in continuous integration over the existing test suite, and it is the difference between a ten minute hunt and a ten second one.\n\nThe trap is the quality of the good commit. If the commit you marked as good already contains the bug, bisect converges on a wrong answer and reports it with total confidence, because a binary search is only as good as its endpoints. And the test script has to be deterministic: a flaky test makes the search random, and a test that fails for reasons unrelated to the bug sends it off course. Pick the boundaries carefully and use a test that fails for this bug and for nothing else.',
        'Разрезание (bisect) находит коммит, в котором появился баг, бинарным поиском по истории. Вы отмечаете один коммит как хороший, а другой как плохой, и Git проверяет середину, просит вас протестировать её и сужает диапазон в зависимости от ответа. Каждый ответ вдвое уменьшает число кандидатов, поэтому тысяча коммитов требует около десяти заходов вместо тысячи сборок. Название пришло от старого слова «делить надвое».\n\nСостояние поиска живёт в репозитории, поэтому прерванное разрезание можно продолжить позже. Команда git bisect start входит в режим, git bisect bad <коммит> и git bisect good <коммит> отмечают концы диапазона, а те же две команды без аргумента отвечают за текущий проверенный коммит. git bisect log печатает все принятые решения — это запись того, как получен ответ, — а git bisect reset возвращает вас на ветку, с которой вы начали.\n\nПрактичным разрезание делает автоматизация. Команда git bisect run <скрипт> выполняет указанную команду на каждом шаге и читает код возврата как ответ: ноль означает «хорошо», всё остальное — «плохо». Это превращает разрезание из ручного ритуала в одну команду, которую можно запустить в непрерывной интеграции поверх готового набора тестов, и это разница между десятью минутами поиска и десятью секундами.\n\nЛовушка — качество хорошего коммита. Если коммит, помеченный хорошим, уже содержит баг, разрезание сойдётся к неверному ответу и сообщит о нём с полной уверенностью, потому что бинарный поиск хорош ровно настолько, насколько хороши его концы. И тестовый скрипт обязан быть детерминированным: нестабильный тест делает поиск случайным, а тест, падающий по причинам, не связанным с багом, уводит его не туда. Границы выбирайте аккуратно и используйте тест, который падает только из-за этого бага.'
      ),
      bullets: [
        L('Bisect narrows the range by halving it, so it takes log2 of the commits.', 'Разрезание сужает диапазон вдвое, поэтому шагов столько, сколько логарифм по основанию 2 от числа коммитов.'),
        L('git bisect start, good, bad and reset drive the whole search.', 'git bisect start, good, bad и reset управляют всем поиском.'),
        L('git bisect run <script> uses the exit code of the script as the answer.', 'git bisect run <скрипт> берёт код возврата скрипта как ответ.'),
        L('The good commit must really be good, or the result is confidently wrong.', 'Хороший коммит должен быть действительно хорошим, иначе ответ будет уверенно неверным.'),
        L('A flaky test turns the search into a random walk.', 'Нестабильный тест превращает поиск в случайное блуждание.'),
      ],
      code: `# mark the range and start
git bisect start
git bisect bad HEAD
git bisect good v1.3.0

# test the checkout and answer
npm test
git bisect bad
git bisect good

# what happened
git bisect log

# automate it with a script
git bisect run npm test

# return to the original branch
git bisect reset`,
      table: {
        caption: L('The bisect vocabulary', 'Словарь разрезания'),
        headers: [L('Command', 'Команда'), L('What it does', 'Что делает')],
        rows: [
          [L('git bisect start', 'git bisect start'), L('Enters bisect mode and checks out the midpoint', 'Входит в режим разрезания и проверяет середину')],
          [L('git bisect good <commit>', 'git bisect good <коммит>'), L('Marks the commit as free of the bug', 'Отмечает коммит как свободный от бага')],
          [L('git bisect bad <commit>', 'git bisect bad <коммит>'), L('Marks the commit as containing the bug', 'Отмечает коммит как содержащий баг')],
          [L('git bisect run <script>', 'git bisect run <скрипт>'), L('Runs a script and uses its exit code as the answer', 'Запускает скрипт и берёт код возврата как ответ')],
          [L('git bisect reset', 'git bisect reset'), L('Leaves bisect mode and restores the original branch', 'Выходит из режима и возвращает исходную ветку')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The good commit that was not good', 'Хороший коммит, который был нехорошим'),
          text: L(
            'Bisect assumes that the bug appeared somewhere between good and bad. When the good commit already contains the defect, the search converges on a commit that looks like the answer and is not, and nobody notices because the report is confident.',
            'Разрезание предполагает, что баг появился где-то между хорошим и плохим. Если хороший коммит уже содержит дефект, поиск сойдётся к коммиту, который выглядит ответом, но им не является, и никто этого не заметит, потому что отчёт выглядит уверенным.'
          ),
        },
      ],
      takeaway: L(
        'Bisect is only as good as its endpoints: verify the good commit and automate the test with git bisect run.',
        'Разрезание хорошо ровно настолько, насколько хороши его концы: проверьте хороший коммит и автоматизируйте тест через git bisect run.'
      ),
      seeAlso: [
        L('Section 7-3: cherry-pick and revert', 'Секция 7-3: перенос изменений и откат'),
        L('Section 4-5: recovering lost commits', 'Секция 4-5: восстановление потерянных коммитов'),
      ],
    },
    {
      id: 'git-ch7-s2',
      title: L('Git notes and blame', 'Заметки и blame'),
      body: L(
        'git blame walks the history of a file and prints, for every line, the commit that last touched it. The output is a table of hashes, authors and dates, and it answers the question who wrote this line much faster than searching the log by hand. The command name comes from the older sense of the word: to assign the blame.\n\nThe output needs reading with care. The hash shown is the commit that last changed the line, not the commit that introduced the feature the line belongs to. A line that was reformatted by an editor or fixed by a lint rule gets the blame even though nobody wrote the meaning of it. git blame -w ignores whitespace-only changes, and -C follows lines that were moved or copied from another file, which is what you need when the code was reorganised rather than rewritten.\n\nBlame is a tool for asking questions, not for assigning guilt. The commit that last touched a line is often not the one that introduced the defect: the bug may have been created by a change three commits earlier that a later commit merely touched the neighbourhood of. When the answer matters, look at the parent commit as well, and read the whole commit rather than the single line.\n\nGit notes attach extra text to a commit without changing it. git notes add <commit> creates a note that lives in refs/notes/commits, and git log shows it next to the commit it belongs to. Notes are for the information that does not belong in the commit message: the link to the ticket, the reason the change was made, the review that approved it. Because notes are a reference like any other, they are pushed and fetched explicitly, and a colleague who does not fetch them simply does not see them.',
        'git blame проходит по истории файла и печатает для каждой строки коммит, который последний раз её трогал. Вывод — таблица хешей, авторов и дат, и он отвечает на вопрос, кто написал эту строку, намного быстрее, чем поиск по логу руками. Название команды взято из старого значения слова: возложить вину.\n\nВывод надо читать внимательно. Показанный хеш — это коммит, который последний раз изменил строку, а не коммит, введший функциональность, к которой строка относится. Строка, переформатированная редактором или поправленная линтером, получает blame, хотя никто не писал её смысл. Ключ git blame -w игнорирует изменения только в пробелах, а -C идёт за строками, перемещёнными или скопированными из другого файла — это нужно, когда код реорганизовали, а не переписали.\n\nBlame — инструмент для вопросов, а не для поиска виноватых. Коммит, последний раз тронувший строку, часто не тот, что внёс дефект: баг мог появиться тремя коммитами раньше, а поздний коммит лишь задел соседний код. Когда ответ важен, посмотрите и на родительский коммит, и прочитайте коммит целиком, а не одну строку.\n\nЗаметки Git прикрепляют дополнительный текст к коммиту, не меняя его. Команда git notes add <коммит> создаёт заметку, живущую в refs/notes/commits, и git log показывает её рядом с её коммитом. Заметки — для того, что не помещается в сообщение коммита: ссылки на задачу, причину изменения, ревью, которое его одобрило. Поскольку заметки, как и любые другие ссылки, нужно явно отправлять и забирать, коллега, который их не забрал, просто их не увидит.'
      ),
      bullets: [
        L('git blame shows the last commit that touched a line, not the one that introduced the feature.', 'git blame показывает последний коммит, тронувший строку, а не введший функциональность.'),
        L('-w ignores whitespace-only changes, -C follows moved or copied lines.', '-w игнорирует изменения пробелов, -C идёт за перемещёнными и скопированными строками.'),
        L('Blame finds the last change, not the cause, so read the parent commit too.', 'Blame находит последнее изменение, а не причину, поэтому читайте и родительский коммит.'),
        L('Git notes attach extra text to a commit without changing the commit.', 'Заметки Git прикрепляют текст к коммиту, не меняя сам коммит.'),
        L('Notes live in refs/notes/commits and travel only when you push them.', 'Заметки живут в refs/notes/commits и передаются, только если их отправить.'),
      ],
      code: `# who touched this line
git blame src/app.ts
git blame -w -C -L 40,60 src/app.ts

# the commit and its parent
git show abc1234
git show abc1234^

# attach a note to a commit
git notes add abc1234 -m "Ticket JIRA-1421, approved by the platform team"
git log --show-notes

# notes are a reference, they travel with the repository
git push origin refs/notes/commits
git fetch origin refs/notes/commits:refs/notes/commits`,
      table: {
        caption: L('Blame, notes and the commit message', 'Blame, заметки и сообщение коммита'),
        headers: [L('Tool', 'Инструмент'), L('Question it answers', 'На какой вопрос отвечает'), L('Where it lives', 'Где хранится')],
        rows: [
          [L('git blame', 'git blame'), L('Which commit last changed this line', 'Какой коммит последний раз менял эту строку'), L('The history of the file', 'История файла')],
          [L('git notes', 'git notes'), L('What context belongs to this commit', 'Какой контекст принадлежит этому коммиту'), L('refs/notes/commits', 'refs/notes/commits')],
          [L('Commit message', 'Сообщение коммита'), L('Why the change was made at the time', 'Зачем изменение было сделано в тот момент'), L('The commit object itself', 'В самом объекте коммита')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Blame points at the last touch, not the cause', 'Blame указывает на последнее касание, а не на причину'),
          text: L(
            'The commit shown by blame is the last one to touch the line, which is often a formatting fix or a rename. The defect may have arrived several commits earlier, and a conversation started with blame can send the wrong person to the wrong code.',
            'Коммит, показанный blame, — последний, кто тронул строку, а это часто форматирование или переименование. Дефект мог прийти несколькими коммитами раньше, и разговор, начатый с blame, отправляет не того человека не к тому коду.'
          ),
        },
      ],
      takeaway: L(
        'Read blame as a pointer to the last change, and use notes to record the context a commit message has no room for.',
        'Читайте blame как указатель на последнее изменение, а заметки используйте для контекста, которому в сообщении коммита нет места.'
      ),
      seeAlso: [
        L('Section 2-3: writing commit messages that explain why', 'Секция 2-3: сообщения коммитов, объясняющие зачем'),
        L('Section 7-5: signing commits and tags', 'Секция 7-5: подпись коммитов и тегов'),
      ],
    },
    {
      id: 'git-ch7-s3',
      title: L('Cherry-pick and revert', 'Перенос изменений и откат'),
      body: L(
        'git cherry-pick <commit> applies the change of one commit on top of the current branch and records it as a new commit. It is the tool for taking a fix from one branch into another without merging the whole branch. The commit is copied, not moved: the original stays where it was, and you now have the same change in two places in the history. A range works too, git cherry-pick a1b2c3d^..d4e5f6a, and it applies the commits in the order they were given.\n\nThat duplication is the cost, and it is why cherry-pick is used sparingly. When the same change exists in two branches, merging the branch is usually the better answer, because a merge records where the change came from and keeps the history honest. Cherry-pick is right when the branch is not ready to merge, when only one fix from it is needed, or when the change has to reach a release branch that will never receive the rest of the work.\n\ngit revert is the mirror image: it applies the inverse of a commit and creates a new commit. git revert <commit> undoes one commit, git revert <commit>^..<commit> undoes a range, and git revert --no-commit stages the inverse changes without committing them, which is what you want when the undo has to travel together with other changes in a single commit.\n\nBoth commands can stop on a conflict, and both can be taken back: git cherry-pick --abort and git revert --abort restore the state before the operation was started. The rule that keeps the history clean is short: revert what was published, cherry-pick only what must be copied. A branch that contains both usually ends up with the same change three times and nobody able to say which copy is the real one.',
        'git cherry-pick <коммит> применяет изменение одного коммита поверх текущей ветки и сохраняет его новым коммитом. Это инструмент для того, чтобы перенести фикс из одной ветки в другую, не сливая ветку целиком. Коммит копируется, а не переносится: оригинал остаётся на месте, и одно и то же изменение теперь есть в истории в двух местах. Работает и диапазон: git cherry-pick a1b2c3d^..d4e5f6a применяет коммиты в заданном порядке.\n\nЭто дублирование и есть цена, и именно поэтому перенос изменений применяют редко. Когда одно и то же изменение есть в двух ветках, обычно лучше слить ветку, потому что слияние записывает, откуда изменение пришло, и история остаётся честной. Перенос уместен, когда ветка ещё не готова к слиянию, когда нужен только один фикс из неё или когда изменение должно попасть в release-ветку, которая никогда не получит остальную работу.\n\ngit revert — зеркальное отражение: он применяет обратное действие к коммиту и создаёт новый коммит. Команда git revert <коммит> отменяет один коммит, git revert <коммит>^..<коммит> — диапазон, а git revert --no-commit индексирует обратные изменения без коммита — это нужно, когда отмена должна уехать вместе с другими изменениями одним коммитом.\n\nОбе команды могут остановиться на конфликте, и обе откатываются: git cherry-pick --abort и git revert --abort возвращают состояние до начала операции. Правило, которое держит историю чистой, короткое: откатывайте опубликованное, переносите только то, что обязано быть скопировано. Ветка, где есть и то и другое, обычно заканчивается тройным дублированием изменения, и никто не может сказать, какая копия настоящая.'
      ),
      bullets: [
        L('cherry-pick copies a change as a new commit and leaves the original in place.', 'cherry-pick копирует изменение новым коммитом и оставляет оригинал на месте.'),
        L('Prefer a merge when the whole branch is going to be integrated anyway.', 'Предпочитайте слияние, когда ветку всё равно будут интегрировать целиком.'),
        L('revert creates a new commit that undoes an old one.', 'revert создаёт новый коммит, отменяющий старый.'),
        L('--no-commit lets you stage the undo together with other changes.', '--no-commit позволяет проиндексировать отмену вместе с другими изменениями.'),
        L('Both commands can be aborted with --abort.', 'Обе команды откатываются через --abort.'),
      ],
      code: `# copy one fix to another branch
git switch release/1.3
git cherry-pick abc1234

# copy several commits, keeping their order
git cherry-pick a1b2c3d^..d4e5f6a

# undo a published commit
git revert abc1234
git revert --no-commit abc1234

# stop halfway
git cherry-pick --abort
git revert --abort`,
      table: {
        caption: L('Cherry-pick and revert side by side', 'Перенос изменений и откат рядом'),
        headers: [L('Aspect', 'Аспект'), L('cherry-pick', 'cherry-pick'), L('revert', 'revert')],
        rows: [
          [L('Effect', 'Действие'), L('Applies the change forward', 'Применяет изменение вперёд'), L('Applies the change backwards', 'Применяет изменение назад')],
          [L('Result', 'Результат'), L('A new commit with the same content', 'Новый коммит с тем же содержимым'), L('A new commit with the opposite content', 'Новый коммит с противоположным содержимым')],
          [L('Use for', 'Для чего'), L('Moving one fix to another branch', 'Перенос одного фикса в другую ветку'), L('Undoing something already published', 'Отмена уже опубликованного')],
          [L('History', 'История'), L('The change exists twice', 'Изменение существует в двух экземплярах'), L('The old commit stays visible', 'Старый коммит остаётся видимым')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The duplicated commit', 'Дублирующийся коммит'),
          text: L(
            'After a cherry-pick the same fix exists under two hashes, and a later revert of one copy leaves the other in place. When the branches are merged back together, the fix appears twice in the log and somebody will eventually revert it twice. Merge the branch when you can, and keep cherry-pick for the case where merging is genuinely impossible.',
            'После переноса изменений один и тот же фикс существует под двумя хешами, и последующий откат одной копии оставляет вторую на месте. Когда ветки сливают обратно, фикс появляется в логе дважды, и рано или поздно его откатят дважды. Сливайте ветку, когда это возможно, а перенос оставляйте для случаев, когда слияние действительно невозможно.'
          ),
        },
      ],
      takeaway: L(
        'Revert to undo what was published, cherry-pick to copy what must be moved, and never both on one branch.',
        'Откатывайте опубликованное, переносите только то, что обязано быть перемещено, и никогда не делайте и то и другое на одной ветке.'
      ),
      seeAlso: [
        L('Section 4-2: git restore and git revert', 'Секция 4-2: git restore и git revert'),
        L('Section 6-5: hotfixes on production', 'Секция 6-5: хотфиксы в продакшене'),
      ],
    },
    {
      id: 'git-ch7-s4',
      title: L('Sparse checkout and partial clone', 'Sparse checkout и частичное клонирование'),
      body: L(
        'Both commands exist for the same situation: a repository that is much larger than the part you need. A sparse checkout keeps the whole history but materialises only some of the directories in the working tree. git sparse-checkout set src/app packages/ui marks the directories you want, and everything else is emptied from disk while remaining fully present in the history.\n\nA partial clone does the opposite: it downloads the history but not the file contents. git clone --filter=blob:none fetches the commits and the trees and leaves the blobs behind, and Git downloads a missing blob the first time something needs it. The filter can be refined, and git fetch --filter=blob:limit=1m limits the fetch to blobs below a given size, which keeps the large binary assets out of the download without hiding the code.\n\nThe two are complementary rather than competing. Sparse checkout reduces what sits on your disk, partial clone reduces what travels over the network, and a monorepo where you work in one package usually wants both at the same time: a small checkout of one package and a clone that does not carry the whole asset history.\n\nThe catch is that the missing pieces cost something when they are needed. The first access to a blob that was not downloaded pauses for a network round trip in the middle of a Git command, so a build that touches the whole repository pays the full price anyway. A partial clone also needs the server to support the filter protocol: every major host does, and a mirror that does not simply ignores the filter and sends everything, which is a silent surprise rather than an error.',
        'Обе команды существуют ради одной ситуации: репозиторий заметно больше той части, с которой вы работаете. Sparse checkout сохраняет всю историю, но материализует в рабочем дереве только некоторые директории. Команда git sparse-checkout set src/app packages/ui отмечает нужные директории, и всё остальное опустошается на диске, оставаясь при этом полностью в истории.\n\nЧастичное клонирование делает обратное: скачивает историю, но не содержимое файлов. Команда git clone --filter=blob:none забирает коммиты и деревья, а блобы оставляет, и Git докачивает недостающий блоб при первом обращении к нему. Фильтр можно уточнить: git fetch --filter=blob:limit=1m ограничивает загрузку блобами меньше заданного размера, и так крупные бинарные ассеты не попадают в загрузку, не пряча код.\n\nЭти вещи дополняют друг друга, а не конкурируют. Sparse checkout уменьшает то, что лежит на диске, частичное клонирование уменьшает то, что идёт по сети, и монорепозиторию, где вы работаете в одном пакете, обычно нужно и то и другое сразу: маленький чекаут одного пакета и клон, который не тащит всю историю ассетов.\n\nНо есть цена: недостающие куски обходятся, когда они нужны. Первое обращение к нескачанному блобу останавливается на сетевом обмене прямо посреди git-команды, так что сборка, задевающая весь репозиторий, заплатит полную цену в любом случае. Частичному клонированию ещё нужен сервер с поддержкой протокола фильтров: все крупные хостинги её имеют, а зеркало без неё просто проигнорирует фильтр и пришлёт всё — тихая неожиданность вместо ошибки.'
      ),
      bullets: [
        L('Sparse checkout empties the directories you do not need, the history stays complete.', 'Sparse checkout опустошает ненужные директории, история остаётся полной.'),
        L('git sparse-checkout set <dirs> chooses the directories, git sparse-checkout list shows them.', 'git sparse-checkout set <директории> выбирает директории, git sparse-checkout list показывает их.'),
        L('A partial clone downloads the history and fetches file contents on demand.', 'Частичное клонирование качает историю, а содержимое файлов — по требованию.'),
        L('--filter=blob:none is the usual filter for a partial clone.', 'Обычный фильтр для частичного клонирования — --filter=blob:none.'),
        L('The first access to a missing blob pays for a network round trip.', 'Первое обращение к недостающему блобу стоит одного сетевого обмена.'),
      ],
      code: `# check out only the directories you work in
git sparse-checkout init --cone
git sparse-checkout set src/app packages/ui
git sparse-checkout list

# a partial clone: the history without the file contents
git clone --filter=blob:none --sparse git@github.com:team/monorepo.git

# limit the size of the blobs that are fetched
git fetch --filter=blob:limit=1m origin main

# check what is actually stored
git count-objects -vH`,
      table: {
        caption: L('Two different kinds of shrinking', 'Два разных вида уменьшения'),
        headers: [L('Aspect', 'Аспект'), L('Sparse checkout', 'Sparse checkout'), L('Partial clone', 'Partial clone')],
        rows: [
          [L('Reduces', 'Уменьшает'), L('What is on disk', 'То, что на диске'), L('What is downloaded', 'То, что скачано')],
          [L('Keeps', 'Сохраняет'), L('The complete history', 'Полную историю'), L('The complete history', 'Полную историю')],
          [L('Missing data', 'Недостающие данные'), L('Nothing, only the files are absent', 'Ничего, отсутствуют только файлы'), L('Blobs, fetched on demand', 'Блобы, забираются по требованию')],
          [L('Cost', 'Цена'), L('None', 'Нет'), L('A network round trip on first access', 'Сетевой обмен при первом обращении')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The repository is still whole', 'Репозиторий по-прежнему целый'),
          text: L(
            'Neither command changes what the repository contains: the commits, the trees and the branches are exactly the same. Sparse checkout only decides what appears in the working tree, and a partial clone only decides what arrives over the network first. A colleague with a full clone sees an identical history.',
            'Ни одна из команд не меняет содержимое репозитория: коммиты, деревья и ветки остаются теми же. Sparse checkout решает только, что окажется в рабочем дереве, а частичное клонирование — что придёт по сети первым. Коллега с полным клоном увидит ту же самую историю.'
          ),
        },
      ],
      takeaway: L(
        'Sparse checkout shrinks the working tree and partial clone shrinks the download: use both when one package out of a hundred is your job.',
        'Sparse checkout уменьшает рабочее дерево, частичное клонирование — загрузку: используйте оба, когда ваша работа — один пакет из сотни.'
      ),
      seeAlso: [
        L('Section 5-5: submodules and worktrees', 'Секция 5-5: подмодули и рабочие деревья'),
        L('Section 7-6: hooks, CI and monorepos', 'Секция 7-6: хуки, CI и монорепозитории'),
      ],
    },
    {
      id: 'git-ch7-s5',
      title: L('Signing commits and tags', 'Подпись коммитов и тегов'),
      body: L(
        'A signature answers two questions: that the object really comes from the holder of a private key, and that it has not changed since it was signed. Git supports two backends. GPG is configured with git config gpg.format openpgp and git config user.signingkey, and SSH keys with git config gpg.format ssh and git config user.signingkey pointing at the public key file. Both produce a signature that anyone can verify with the matching public key.\n\nSign the commits with git commit -S and the tags with git tag -s. To make it the default, set git config commit.gpgsign true, and there is a separate flag for tags. Verification is git verify-commit <hash> and git verify-tag <tag>, and git log --show-signature displays the result next to every commit. On a hosting platform the signature is also checked by the server, and a verified badge in the interface is the visible form of the same fact.\n\nThe value of all this is the trust chain. A signed commit proves the author controlled a private key and that the message and the tree have not been altered since. It does not prove the code is correct, and it does not prove the author wrote the code rather than running it, but it removes the possibility that somebody with write access to the repository forged a commit under another name.\n\nThe trap is a key that does not work everywhere. If the key needs a passphrase and the agent is not running, the commit fails or waits for a prompt that never appears in a script, and the usual workaround is to disable the signature for that one command, which quietly breaks the chain. The fix is to configure the agent properly, to keep a backup key published on a key server so that old commits stay verifiable, and to document the fingerprint in the repository so that colleagues know which key to trust.',
        'Подпись отвечает на два вопроса: что объект действительно исходит от владельца приватного ключа и что с момента подписи он не менялся. Git поддерживает два бэкенда. GPG настраивается через git config gpg.format openpgp и git config user.signingkey, а SSH-ключи — через git config gpg.format ssh и git config user.signingkey с путём к файлу публичного ключа. Оба варианта дают подпись, которую любой может проверить соответствующим публичным ключом.\n\nПодписывают коммиты через git commit -S, а теги через git tag -s. Чтобы сделать это умолчанием, ставят git config commit.gpgsign true, для тегов есть отдельный флаг. Проверка — это git verify-commit <хеш> и git verify-tag <тег>, а git log --show-signature показывает результат рядом с каждым коммитом. На хостинге подпись проверяет и сервер, а отметка о проверке в интерфейсе — это видимая форма того же факта.\n\nЦенность всего этого — цепочка доверия. Подписанный коммит доказывает, что автор владел приватным ключом и что сообщение и дерево не менялись с тех пор. Он не доказывает, что код корректен, и не доказывает, что автор написал код, а не выполнил его, но убирает возможность выдать поддельный коммит за чужой тому, у кого есть доступ на запись.\n\nЛовушка — ключ, который работает не везде. Если ключ требует пароль, а агент не запущен, коммит падает или ждёт подсказки, которой в скрипте не будет, и привычным выходом становится отключение подписи для этой одной команды, что тихо рвёт цепочку. Решение — правильно настроить агент, держать резервный ключ, опубликованный на сервере ключей, чтобы старые коммиты оставались проверяемыми, и указать его отпечаток в репозитории, чтобы коллеги знали, какому ключу доверять.'
      ),
      bullets: [
        L('Two backends: GPG with gpg.format openpgp and SSH keys with gpg.format ssh.', 'Два бэкенда: GPG через gpg.format openpgp и SSH-ключи через gpg.format ssh.'),
        L('git commit -S signs one commit, commit.gpgsign true signs all of them.', 'git commit -S подписывает один коммит, commit.gpgsign true — все.'),
        L('git verify-commit and git verify-tag check a signature.', 'git verify-commit и git verify-tag проверяют подпись.'),
        L('A signature proves the author and the integrity, not the correctness of the code.', 'Подпись доказывает автора и целостность, но не корректность кода.'),
        L('Keep the agent running and publish a backup key, or verification breaks.', 'Держите агент запущенным и опубликуйте резервный ключ, иначе проверка сломается.'),
      ],
      code: `# use an SSH key to sign
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# sign every commit from now on
git config --global commit.gpgsign true

# sign one commit and one tag
git commit -S -m "fix: reject a retry with the same idempotency key"
git tag -s v1.4.0 -m "Release 1.4.0"

# verify
git verify-commit HEAD
git verify-tag v1.4.0
git log --show-signature -1`,
      table: {
        caption: L('What a signature proves and what it does not', 'Что доказывает подпись и что нет'),
        headers: [L('Claim', 'Утверждение'), L('Proved by a signature', 'Доказывается подписью')],
        rows: [
          [L('The commit was made by the key holder', 'Коммит сделан владельцем ключа'), L('Yes, with the matching public key', 'Да, соответствующим публичным ключом')],
          [L('The content was not altered after signing', 'Содержимое не менялось после подписи'), L('Yes, the signature covers the tree and the message', 'Да, подпись покрывает дерево и сообщение')],
          [L('The code is correct', 'Код корректен'), L('No, that is what the review and the tests are for', 'Нет, для этого есть ревью и тесты')],
          [L('The author wrote the code by hand', 'Автор написал код вручную'), L('No, the signature only proves the key was used', 'Нет, подпись доказывает лишь использование ключа')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The signature that needed a passphrase', 'Подпись, которой понадобился пароль'),
          text: L(
            'In CI, in a container or over SSH without an agent, a passphrase-protected key turns every commit into a hang. The usual workaround, git commit --no-gpg-sign, works and quietly removes the guarantee for that commit. Configure the agent to unlock the key once per session instead.',
            'В CI, в контейнере или по SSH без агента ключ с паролем превращает каждый коммит в зависание. Привычный обход через git commit --no-gpg-sign работает и тихо убирает гарантию у этого коммита. Настройте агент так, чтобы он разблокировал ключ один раз за сессию.'
          ),
        },
      ],
      takeaway: L(
        'Sign the commits and the tags, keep the signing agent running, and publish a backup key so old commits stay verifiable.',
        'Подписывайте коммиты и теги, держите агент подписи запущенным и опубликуйте резервный ключ, чтобы старые коммиты оставались проверяемыми.'
      ),
      seeAlso: [
        L('Section 6-3: tags, annotated tags and semver', 'Секция 6-3: теги, аннотированные теги и семвер'),
        L('Section 2-4: amending and fixing the last commit', 'Секция 2-4: правка последнего коммита'),
      ],
    },
    {
      id: 'git-ch7-s6',
      title: L('Hooks, CI and monorepos', 'Хуки, CI и монорепозитории'),
      body: L(
        'The hooks of Git are local scripts that run at fixed points of its workflow. The ones that matter for quality are pre-commit, commit-msg, pre-push, post-merge, post-checkout and prepare-commit-msg. By default they live in .git/hooks, are not tracked and are not shared with anybody, and the modern way to share them is a versioned directory plus the core.hooksPath setting. A hook blocks its operation by exiting with a non-zero code, and Git reads that code.\n\nThe rule of thumb is that hooks are for fast local feedback and continuous integration is for the shared, expensive checks. A hook that runs the formatter and the linter over the staged files takes a second and stops an obviously broken commit from ever existing. The full test suite belongs in CI, where it runs against the pushed commit and the result is visible to the whole team instead of only to the author. The stages are not interchangeable, and neither of them replaces the other.\n\nThe workflow of a pull request then reads like this: the hooks ran locally before the push, CI runs the full pipeline on the pushed branch, and the merge is blocked until the pipeline is green. Each stage has a different audience and a different cost, which is exactly why the checks are split rather than duplicated.\n\nA monorepo adds one more question: what does CI run? Running everything for every change is slow and expensive, and the usual answer is to compute the affected packages from the changed files and to run only their checks, with a full run on the trunk and before a release. Git is well suited to this, because it can tell you exactly which paths changed between two commits: git diff --name-only origin/main...HEAD, and the first path segment is usually the package.\n\nThe division of labour that survives is this: hooks run the fast checks on the staged files, CI runs the slow checks on the changed packages, and the release pipeline runs everything on the trunk. Anything that fails in CI must be reproducible locally, otherwise the team learns to retry instead of to fix.',
        'Хуки Git — это локальные скрипты, которые выполняются в фиксированных точках его рабочего процесса. Для качества важны pre-commit, commit-msg, pre-push, post-merge, post-checkout и prepare-commit-msg. По умолчанию они лежат в .git/hooks, не отслеживаются и никому не раздаются, а современный способ раздать их — версионируемый каталог плюс настройка core.hooksPath. Хук блокирует операцию, возвращая ненулевой код, и Git этот код читает.\n\nПравило звучит так: хуки — для быстрой локальной обратной связи, а непрерывная интеграция — для общих и дорогих проверок. Хук, который гоняет форматтер и линтер по проиндексированным файлам, занимает секунду и не даёт явно сломанному коммиту вообще появиться. Полный набор тестов принадлежит CI, где он выполняется против отправленного коммита, а результат виден всей команде, а не только автору. Этапы не взаимозаменяемы, и ни один из них не заменяет другой.\n\nРабочий процесс pull request читается так: хуки отработали локально до отправки, CI прогнал полный конвейер на отправленной ветке, а слияние заблокировано до зелёного статуса. У каждого этапа своя аудитория и своя цена, и именно поэтому проверки делятся, а не дублируются.\n\nМонорепозиторий добавляет ещё один вопрос: что запускает CI? Запускать всё на каждое изменение медленно и дорого, и обычный ответ — вычислить затронутые пакеты по изменившимся файлам и прогнать только их проверки, а полный прогон делать на основной ветке и перед релизом. Git для этого подходит как нельзя лучше, потому что умеет сказать, какие именно пути изменились между двумя коммитами: git diff --name-only origin/main...HEAD, и первым сегментом пути обычно и будет пакет.\n\nРазделение труда, которое выживает: хуки гоняют быстрые проверки по проиндексированным файлам, CI — медленные по изменённым пакетам, а релизный конвейер — всё на основной ветке. Всё, что падает в CI, должно воспроизводиться локально, иначе команда научится перезапускать вместо того, чтобы чинить.'
      ),
      bullets: [
        L('Hooks are local and fast, continuous integration is shared and complete.', 'Хуки локальны и быстры, непрерывная интеграция общая и полная.'),
        L('core.hooksPath points Git at a versioned hooks directory.', 'core.hooksPath указывает Git на версионируемый каталог хуков.'),
        L('The pre-commit hook runs on the staged files only, so it stays fast.', 'Хук pre-commit работает только по проиндексированным файлам, поэтому остаётся быстрым.'),
        L('CI computes the affected packages from git diff --name-only between two commits.', 'CI вычисляет затронутые пакеты по git diff --name-only между двумя коммитами.'),
        L('A full run belongs on the trunk and before a release.', 'Полный прогон принадлежит основной ветке и моменту перед релизом.'),
      ],
      code: `# where the hooks live right now
git config core.hooksPath
ls .git/hooks

# a shared, versioned hook
cat .git/hooks/pre-commit
#!/bin/sh
npx lint-staged

# what changed, for the CI matrix
git diff --name-only origin/main...HEAD
git diff --name-only --diff-filter=d origin/main...HEAD | cut -d/ -f1 | sort -u

# the shared checks, on the server
npm run lint
npm run typecheck
npm test`,
      table: {
        caption: L('Where each check belongs', 'Где место каждой проверки'),
        headers: [L('Check', 'Проверка'), L('Where', 'Где'), L('Why', 'Почему')],
        rows: [
          [L('Formatting', 'Форматирование'), L('Pre-commit hook', 'Хук pre-commit'), L('Instant, touches only staged files', 'Мгновенно, трогает только проиндексированные файлы')],
          [L('Linting', 'Линтинг'), L('Pre-commit hook and CI', 'Хук pre-commit и CI'), L('Fast locally, authoritative on the server', 'Быстро локально, авторитетно на сервере')],
          [L('Type check', 'Проверка типов'), L('CI on the changed packages', 'CI на изменённых пакетах'), L('Too slow for every commit', 'Слишком медленно для каждого коммита')],
          [L('Unit tests', 'Юнит-тесты'), L('CI on the changed packages', 'CI на изменённых пакетах'), L('Runs where the result is visible to the team', 'Идут там, где результат виден команде')],
          [L('Full suite and e2e', 'Полный набор и e2e'), L('CI on the trunk, before a release', 'CI на основной ветке, перед релизом'), L('Expensive, and worth it only for the whole project', 'Дорого и оправдано только для всего проекта')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('The hook that stays fast gets used', 'Быстрый хук остаётся включённым'),
          text: L(
            'A hook that takes thirty seconds is a hook the team disables within a week, and a disabled hook is worse than no hook because it still looks like protection. Run the checks only against the staged files, keep the hook under a couple of seconds, and move everything slower into CI.',
            'Хук на тридцать секунд команда отключит за неделю, а отключённый хук хуже отсутствующего: он всё равно выглядит как защита. Гоняйте проверки только по проиндексированным файлам, держите хук в пределах пары секунд, а всё медленное перенесите в CI.'
          ),
        },
      ],
      takeaway: L(
        'Hooks run the fast checks on staged files, CI runs the slow checks on changed packages, and anything that fails in CI must fail locally too.',
        'Хуки гоняют быстрые проверки по проиндексированным файлам, CI — медленные по изменённым пакетам, и всё, что падает в CI, должно падать и локально.'
      ),
      seeAlso: [
        L('Section 2-5: pre-commit hooks and linting', 'Секция 2-5: хуки pre-commit и линтеры'),
        L('Section 7-4: sparse checkout and partial clone', 'Секция 7-4: sparse checkout и частичное клонирование'),
      ],
    },
  ],
};
