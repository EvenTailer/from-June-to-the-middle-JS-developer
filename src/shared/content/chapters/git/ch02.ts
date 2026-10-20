import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh02: Chapter = {
  id: 'git-ch2',
  title: L('Staging and committing', 'Индексация и коммиты'),
  summary: L(
    'How git add fills the index, what a commit actually records, why a good commit message explains the reason, and how pre-commit hooks keep broken code out of the history.',
    'Как git add наполняет индекс, что коммит записывает на самом деле, почему хорошее сообщение коммита объясняет причину и как pre-commit хуки не дают сломанному коду попасть в историю.'
  ),
  sections: [
    {
      id: 'git-ch2-s1',
      title: L('git add, the index and partial staging', 'git add, индекс и частичная индексация'),
      body: L(
        'git add does not mean "commit this file". It means "copy the current content of this file into the index", and the index is the list of content that the next commit will record. Because the index holds content rather than names, adding a file twice with different edits does not accumulate anything: the second add replaces the first, and only the newest version is staged.\n\nThe habit that follows from this is to add files by path. git add src/app.ts stages one file, git add src stages everything under that directory, and git add . stages everything below the current directory, including the artefacts a build produced and the .env file you never meant to publish. A .gitignore helps, but only for paths that are already ignored: a file added before the ignore rule was written stays in the index forever.\n\nNot every change wants to be committed in one piece. git add -p walks through the diff hunk by hunk and asks whether each hunk goes into the index; s splits a hunk, e edits it by hand in your editor and q quits. git add -e opens the whole diff in the editor, where you delete the lines you do not want. Both commands let you stage one logical change out of a file that contains three.\n\nA related trap is the untracked file. A file that Git has never seen does not appear in git diff at all, because there is nothing to compare it with, and it is easy to commit everything around it and forget the new file itself. git status lists untracked files separately, and git add -N records an intent to add so that the file appears in diffs.',
        'git add не означает «закоммитить этот файл». Это означает «скопировать текущее содержимое файла в индекс», а индекс — это список содержимого, которое запишет следующий коммит. Поскольку индекс хранит содержимое, а не имена, повторное добавление файла с другими правками ничего не накапливает: второе добавление заменяет первое, и в индекс попадает только самая свежая версия.\n\nИз этого следует привычка добавлять файлы по пути. git add src/app.ts индексирует один файл, git add src — всё внутри этой директории, а git add . — всё ниже текущей директории, включая артефакты сборки и файл .env, который вы публиковать не собирались. .gitignore помогает, но только для путей, которые уже попали под игнор: файл, добавленный до того, как правило появилось, навсегда остаётся в индексе.\n\nНе каждое изменение должно попадать в коммит одним куском. git add -p идёт по диффу хунк за хунком и спрашивает, класть ли этот хунк в индекс; s делит хунк, e правит его вручную в редакторе, q выходит. git add -e открывает весь дифф в редакторе, где вы удаляете ненужные строки. Обе команды позволяют выделить одно логическое изменение из файла, в котором их три.\n\nОтдельная ловушка — неотслеживаемый файл. Файл, которого Git никогда не видел, вообще не появляется в git diff, потому что сравнивать не с чем, и легко закоммитить всё вокруг, забыв сам новый файл. git status показывает неотслеживаемые файлы отдельным списком, а git add -N записывает намерение добавить, чтобы файл появился в диффах.'
      ),
      bullets: [
        L('git add copies content into the index, it does not commit anything.', 'git add копирует содержимое в индекс, а не коммитит.'),
        L('Adding the same file twice keeps only the newest version.', 'Повторное добавление файла оставляет только самую свежую версию.'),
        L('git add . stages build output and secrets along with the code.', 'git add . индексирует вместе с кодом сборочный вывод и секреты.'),
        L('git add -p stages one hunk at a time, s splits and e edits.', 'git add -p индексирует по хункам, s делит, e правит.'),
        L('An ignored path stays in the index if it was added before the rule.', 'Путь под игнором останется в индексе, если был добавлен до правила.'),
      ],
      code: `# stage by path, never everything
git add src/app.ts
git add src/

# stage one hunk out of a file with three changes
git add -p src/app.ts
# s split hunk, e edit hunk, q quit

# stage nothing and look at what is untracked
git status --short
git add -N src/new-file.ts

# what is in the index right now
git diff --staged --stat`,
      table: {
        caption: L('Staging commands and what each one touches', 'Команды индексации и то, что каждая трогает'),
        headers: [
          L('Command', 'Команда'),
          L('Effect', 'Действие'),
        ],
        rows: [
          [L('git add file', 'git add file'), L('Copy the file content into the index', 'Скопировать содержимое файла в индекс')],
          [L('git add -p', 'git add -p'), L('Walk the hunks and pick them one by one', 'Разобрать хунки и выбрать по одному')],
          [L('git add -e', 'git add -e'), L('Edit the diff by hand in an editor', 'Править дифф вручную в редакторе')],
          [L('git add -N', 'git add -N'), L('Record the intent to add, so it shows in diffs', 'Записать намерение добавить, чтобы файл попал в диффы')],
          [L('git restore --staged file', 'git restore --staged file'), L('Take the file out of the index, keep it on disk', 'Убрать файл из индекса, оставив на диске')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The file that never appears in the diff', 'Файл, которого нет в диффе'),
          text: L(
            'A newly created file is invisible to git diff until it is added, so a commit built from a diff review can silently omit the new module. Check git status before every commit and treat untracked files as part of the change.',
            'Новый файл невидим для git diff, пока его не добавили, поэтому коммит, собранный по просмотру диффа, может молча потерять новый модуль. Проверяйте git status перед каждым коммитом и считайте неотслеживаемые файлы частью изменения.'
          ),
        },
      ],
      takeaway: L(
        'Stage by path, review what is staged, and remember that the index stores content rather than names.',
        'Индексируйте по пути, проверяйте проиндексированное и помните: индекс хранит содержимое, а не имена.'
      ),
      seeAlso: [
        L('Section 1-2: the three trees', 'Секция 1-2: три дерева'),
        L('Section 2-2: what a commit records', 'Секция 2-2: что записывает коммит'),
      ],
    },
    {
      id: 'git-ch2-s2',
      title: L('git commit and what it records', 'git commit и что он записывает'),
      body: L(
        'A commit object contains five things: a pointer to the tree of the whole project, a pointer to each parent commit, the name and address of the author, the name and address of the committer, and the message. Nothing else. It does not record which files changed, it does not record the branch it was made on, and it does not record the previous state of a file: it records the state of every file after the change.\n\nThe author is who wrote the change, and the committer is who created the commit object. They are the same person in ninety-nine percent of commits, and they differ when someone rebases or cherry-picks your work: the author stays you, the committer becomes the person who ran the command. That distinction is why git log --pretty=fuller prints two names and two dates, and it is what makes rebases auditable.\n\nThe commit message is the only free-form part, and Git does not interpret it. It can be a single line or a structured document; the convention that matters is that the first line is a summary of about fifty characters, followed by a blank line and then the body, wrapped at seventy-two columns. Git stores the message verbatim, including the comments that an editor adds when it saves a template.\n\nThe result of a commit is a new object and a moved pointer: the branch that HEAD points at now points at the new commit, and the index becomes the baseline for the next diff. This is why committing is cheap and why nothing in the commit records the fact that a file was once untracked, staged or edited three times.',
        'Объект коммита содержит пять вещей: указатель на дерево всего проекта, указатель на каждого родителя, имя и адрес автора, имя и адрес коммитера и сообщение. Больше ничего. Он не записывает, какие файлы изменились, не записывает ветку, на которой сделан, и не хранит прежнее состояние файла: он хранит состояние всех файлов после изменения.\n\nАвтор — тот, кто написал изменение, а коммитер — тот, кто создал объект коммита. В девяноста девяти процентах случаев это один и тот же человек, и расходятся они, когда кто-то перебазирует или переносит вашу работу через cherry-pick: автор остаётся вами, а коммитером становится тот, кто выполнил команду. Именно поэтому git log --pretty=fuller печатает два имени и две даты, и это делает перебазирование проверяемым.\n\nСообщение коммита — единственная свободная часть, и Git ничего в нём не интерпретирует. Это может быть одна строка или структурированный документ; важна конвенция: первая строка — краткое резюме примерно на пятьдесят символов, затем пустая строка и тело, перевёрнутое на семьдесят два столбца. Git сохраняет сообщение дословно, включая комментарии, которые редактор добавляет при сохранении шаблона.\n\nРезультат коммита — новый объект и сдвинутый указатель: ветка, на которую смотрит HEAD, теперь указывает на новый коммит, а индекс становится базой для следующего диффа. Поэтому коммитить дёшево и потому ничто в коммите не хранит факт, что файл когда-то был неотслеживаемым, индексированным или правился три раза.'
      ),
      bullets: [
        L('A commit stores a tree, parents, author, committer and a message.', 'Коммит хранит дерево, родителей, автора, коммитера и сообщение.'),
        L('It stores the state of every file, never a list of changes.', 'Он хранит состояние всех файлов, а не список изменений.'),
        L('Author and committer differ when someone rebases or cherry-picks.', 'Автор и коммитер расходятся, когда кто-то перебазирует или переносит через cherry-pick.'),
        L('The message is stored verbatim, editor comments included.', 'Сообщение хранится дословно, вместе с комментариями редактора.'),
        L('A commit moves the current branch and nothing else.', 'Коммит двигает текущую ветку и больше ничего.'),
      ],
      code: `# what the last commit actually contains
git cat-file -p HEAD

# the tree it points at
git rev-parse HEAD^{tree}

# author, committer and dates
git log -1 --pretty=fuller

# commit with a message from a file
git commit -F .git/COMMIT_EDITMSG

# commit and watch the hash appear
git commit -m "Add the parser and its tests"
git log --oneline -1`,
      table: {
        caption: L('What a commit records', 'Что записывает коммит'),
        headers: [
          L('Field', 'Поле'),
          L('Value', 'Значение'),
        ],
        rows: [
          [L('tree', 'tree'), L('The complete state of the project after the change', 'Полное состояние проекта после изменения')],
          [L('parent', 'parent'), L('The commit this one follows, one or two of them', 'Коммит, который этот продолжает, один или два')],
          [L('author', 'author'), L('Who wrote the change, with a timestamp', 'Кто написал изменение, со временем')],
          [L('committer', 'committer'), L('Who created the commit object, with a timestamp', 'Кто создал объект коммита, со временем')],
          [L('message', 'message'), L('Free-form text, stored verbatim', 'Произвольный текст, сохраняется дословно')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Why rebases change the committer', 'Почему перебазирование меняет коммитера'),
          text: L(
            'A cherry-pick or a rebase creates a brand new commit object, so the committer date and the committer identity are the ones of whoever ran the command. The original author and author date are copied over, which is how a patch keeps its attribution while the history shows who applied it.',
            'Cherry-pick и перебазирование создают совершенно новый объект коммита, поэтому коммитер и его дата — те, у кого выполнялась команда. Автор и дата автора копируются, и благодаря этому патч сохраняет авторство, а история показывает, кто его применил.'
          ),
        },
      ],
      takeaway: L(
        'A commit is a snapshot with a parent pointer and a message, so review the message and the author, not just the diff.',
        'Коммит — это снимок с указателем на родителя и сообщением, поэтому смотрите на сообщение и автора, а не только на дифф.'
      ),
      seeAlso: [
        L('Section 2-3: commit messages that explain why', 'Секция 2-3: сообщения коммитов, объясняющие зачем'),
        L('Section 1-1: blobs, trees and commits', 'Секция 1-1: блобы, деревья и коммиты'),
      ],
    },
    {
      id: 'git-ch2-s3',
      title: L('Writing commit messages that explain why', 'Сообщения коммитов, объясняющие зачем'),
      body: L(
        'The diff already records what changed, and the machine can read it. The message is the part only a human can write, and it exists to answer the question the diff cannot: why was this change made, and what does it mean for the code around it. A message that restates the diff wastes the one place in the repository where a decision can be explained.\n\nA workable shape has three parts. The first line is a short summary in the imperative mood, because it describes what the commit does and will be read as the first line of a log: "Reject expired sessions", not "Rejected" or "Rejects". The second part is a paragraph describing the problem, especially the part of it that is invisible in the diff, such as a race condition or a constraint from an external system. The third part lists anything a reviewer must know: a benchmark number, a migration step, a linked ticket.\n\nLength is a matter of proportion. The summary should fit in about fifty characters so it stays readable in a one-line log, and the body can be wrapped at seventy-two columns. A commit that needs two pages usually needs to be two commits, and a commit that needs no message at all usually needed no commit: the fix belongs in the branch as a single step of a larger change.\n\nConventions like Conventional Commits add a machine-readable prefix, a type such as feat or fix, and an optional scope, so that release notes can be generated and a version bump can be automatic. The prefix helps the tooling; the body still has to explain the reason. A good test is whether the message would still make sense to somebody reading the history in a year without opening the diff.',
        'Дифф уже фиксирует, что изменилось, и машина его прочитает. Сообщение — это часть, которую может написать только человек, и существует оно ради вопроса, на который дифф не отвечает: зачем это изменение сделано и что оно значит для кода вокруг. Сообщение, пересказывающее дифф, тратит единственное место в репозитории, где можно объяснить решение.\n\nРабочая форма состоит из трёх частей. Первая строка — короткое резюме в императивном наклонении, потому что оно описывает, что коммит делает, и будет прочитано первой строкой лога: «Отклонять истёкшие сессии», а не «Отклонено» или «Отклоняет». Вторая часть — абзац о проблеме, особенно о её невидимой в диффе части: о гонке, об ограничении внешней системы. Третья — список того, что обязан знать ревьюер: цифра бенчмарка, шаг миграции, ссылка на задачу.\n\nДлина — вопрос пропорции. Резюме должно уместиться примерно в пятьдесят символов, чтобы оставаться читаемым в однострочном логе, а тело переворачивают на семьдесят два столбца. Коммит, которому нужны две страницы, обычно должен стать двумя коммитами, а коммит, которому не нужно сообщение вообще, обычно не нужен и сам: правка должна остаться в ветке отдельным шагом более крупного изменения.\n\nСоглашения вроде Conventional Commits добавляют машиночитаемый префикс, тип вроде feat или fix и необязательную область, чтобы релизные заметки генерировались автоматически, а версия поднималась сама. Префикс помогает инструментам, но объяснять причину всё равно приходится текстом. Хорошая проверка: останется ли сообщение понятным тому, кто через год откроет историю, не заглядывая в дифф.'
      ),
      bullets: [
        L('The diff says what changed, the message says why.', 'Дифф говорит, что изменилось, сообщение — зачем.'),
        L('The first line is an imperative summary of about fifty characters.', 'Первая строка — императивное резюме примерно на пятьдесят символов.'),
        L('Leave a blank line between the summary and the body.', 'Между резюме и телом оставьте пустую строку.'),
        L('Wrap the body at seventy-two columns.', 'Тело переворачивайте на семьдесят два столбца.'),
        L('A commit that needs two pages should usually be two commits.', 'Коммит, которому нужны две страницы, обычно должен стать двумя.'),
      ],
      code: `# a one-line commit
git commit -m "Reject expired sessions"

# a full message with a body
git commit -F- <<'EOF'
Reject expired sessions

The token check compared expiry with < instead of <=, so tokens
were refused one second before they expired.

Fixes #142
EOF

# read the result back
git log -1 --pretty=full
git log --oneline -5`,
      table: {
        caption: L('Anatomy of a commit message', 'Анатомия сообщения коммита'),
        headers: [
          L('Part', 'Часть'),
          L('Length', 'Длина'),
          L('Purpose', 'Назначение'),
        ],
        rows: [
          [L('Summary line', 'Строка резюме'), L('About 50 characters', 'Около 50 символов'), L('Readable in a one-line log', 'Читается в однострочном логе')],
          [L('Blank line', 'Пустая строка'), L('One line', 'Одна строка'), L('Separates summary from body', 'Отделяет резюме от тела')],
          [L('Body', 'Тело'), L('Wrapped at 72 columns', 'Перевёрнуто на 72 столбца'), L('The reason and the context', 'Причина и контекст')],
          [L('Footer', 'Подвал'), L('Free form', 'Произвольно'), L('Ticket, breaking change, author', 'Задача, ломающее изменение, автор')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Write the message before the code', 'Пишите сообщение до кода'),
          text: L(
            'If you cannot explain the change in a sentence, you may not understand it yet. Drafting the summary first turns the message into a design check: a change that needs a paragraph of caveats is usually a change that needs splitting.',
            'Если изменение нельзя объяснить одним предложением, возможно, вы ещё не понимаете его. Черновик резюме превращает сообщение в проверку решения: изменение, требующее абзаца оговорок, обычно требует разделения.'
          ),
        },
      ],
      takeaway: L(
        'Write the summary for someone reading the log in a year: what the change does, and why it exists.',
        'Пишите резюме для того, кто прочитает лог через год: что изменение делает и зачем оно нужно.'
      ),
      seeAlso: [
        L('Section 2-2: what a commit records', 'Секция 2-2: что записывает коммит'),
        L('Section 4-2: git restore and git revert', 'Секция 4-2: git restore и git revert'),
      ],
    },
    {
      id: 'git-ch2-s4',
      title: L('Amending and fixing the last commit', 'Правка последнего коммита'),
      body: L(
        'git commit --amend does not edit a commit. It creates a new commit from the current index, with the same parent, and moves the branch to it. The old commit stays in the object database until the garbage collector removes it, but it is no longer part of the branch, and the hash changes. This is why an amend is safe before the commit is shared and destructive after.\n\nThere are three common repairs. To fix the message only, run git commit --amend --no-edit to accept the existing text or git commit --amend to open the editor. To add a file that was forgotten, stage it and amend without changing the message. To change the content itself, stage the corrected version and amend: the new tree replaces the old one in a brand new commit.\n\nThe rule that keeps teams out of trouble is simple: never amend a commit that someone else has already pulled. Amending rewrites history, and the rewritten version has a different hash, so a colleague who already fetched the original will see the two as unrelated commits, and the next push will be rejected until somebody force-pushes. To undo a published commit, use git revert, which adds a new commit and leaves the old one alone.\n\nThe same reasoning applies to git commit --fixup, which prepares a commit for later squashing with autosquash, and to the interactive rebase that performs the fixup for you. Those tools are meant for history that is still private. The moment a commit is on a shared branch, the correct move is always to add a new commit on top, never to rewrite what is underneath.',
        'git commit --amend не правит коммит. Он создаёт новый коммит из текущего индекса, с тем же родителем, и двигает ветку на него. Старый коммит остаётся в базе объектов до того, как её очистит сборщик мусора, но в ветку он больше не входит, а хеш меняется. Поэтому amend безопасен до того, как коммит ушёл к другим, и разрушителен после.\n\nОбычных правок три. Исправить только сообщение: git commit --amend --no-edit оставит прежний текст, а git commit --amend откроет редактор. Добавить забытый файл: проиндексируйте его и сделайте amend, не трогая сообщение. Изменить само содержимое: проиндексируйте исправленную версию и сделайте amend — новое дерево заменит старое в совершенно новом коммите.\n\nПравило, которое держит команды в порядке, простое: никогда не amend-ите коммит, который кто-то уже забрал. Amend переписывает историю, а переписанная версия получает другой хеш, поэтому коллега, уже забравший оригинал, увидит два несвязанных коммита, а следующий push будет отклонён, пока кто-нибудь не сделает force-push. Для отмены опубликованного коммита есть git revert: он добавляет новый коммит и оставляет старый на месте.\n\nТа же логика касается git commit --fixup, который готовит коммит к последующему сквошу через autosquash, и интерактивного перебазирования, которое выполняет этот сквош за вас. Эти инструменты предназначены для ещё приватной истории. Как только коммит оказался на общей ветке, правильный ход — всегда добавить новый коммит сверху, а не переписывать то, что под ним.'
      ),
      bullets: [
        L('Amend creates a new commit, it never edits the old one.', 'Amend создаёт новый коммит, а не правит старый.'),
        L('The amended commit gets a new hash even if the content is identical.', 'Изменённый коммит получает новый хеш, даже если содержимое то же.'),
        L('git commit --amend --no-edit keeps the existing message.', 'git commit --amend --no-edit сохраняет прежнее сообщение.'),
        L('Never amend a commit that somebody else has already fetched.', 'Никогда не amend-ите коммит, который кто-то уже забрал.'),
        L('Use revert, not amend, to undo something already published.', 'Для отмены опубликованного используйте revert, а не amend.'),
      ],
      code: `# fix the message of the last commit
git commit --amend
git commit --amend --no-edit

# add a file that was forgotten
git add src/parser.ts
git commit --amend --no-edit

# check what you are about to rewrite
git log --oneline -3
git diff HEAD~1 --stat

# prepare a commit for squashing later
git commit --fixup <commit-hash>
git rebase -i --autosquash HEAD~5`,
      table: {
        caption: L('Which tool undoes what', 'Каким инструментом что отменяется'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Tool', 'Инструмент'),
          L('History', 'История'),
        ],
        rows: [
          [L('Wrong message, commit not pushed', 'Неверное сообщение, коммит не отправлен'), L('git commit --amend', 'git commit --amend'), L('Rewritten', 'Переписывается')],
          [L('Wrong content, commit not pushed', 'Неверное содержимое, коммит не отправлен'), L('git commit --amend', 'git commit --amend'), L('Rewritten', 'Переписывается')],
          [L('Published commit must be undone', 'Опубликованный коммит нужно отменить'), L('git revert', 'git revert'), L('Extended', 'Дополняется')],
          [L('Wrong file changes, nothing committed', 'Неверные правки файла, ничего не закоммичено'), L('git restore', 'git restore'), L('Untouched', 'Не трогается')],
          [L('Committing the wrong thing entirely', 'Закоммичено совсем не то'), L('git reset --soft HEAD~1', 'git reset --soft HEAD~1'), L('Rewritten', 'Переписывается')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Amend after push needs a force push', 'Amend после push требует force push'),
          text: L(
            'If you amend a commit that is already on the remote, the next push is rejected as non-fast-forward. Pushing with --force overwrites whatever the remote has meanwhile, so use --force-with-lease, and better still, do not rewrite published history at all.',
            'Если вы сделали amend коммита, который уже на сервере, следующий push будет отклонён как не fast-forward. Push с --force перезапишет всё, что появилось на сервере за это время, поэтому используйте --force-with-lease, а ещё лучше — не переписывайте опубликованную историю вовсе.'
          ),
        },
      ],
      takeaway: L(
        'Amend freely while the commit is private, and revert instead as soon as somebody else has it.',
        'Пока коммит приватный — правьте через amend, как только его получил кто-то ещё — отменяйте через revert.'
      ),
      seeAlso: [
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
        L('Section 4-2: git restore and git revert', 'Секция 4-2: git restore и git revert'),
      ],
    },
    {
      id: 'git-ch2-s5',
      title: L('Pre-commit hooks and linting', 'Pre-commit хуки и линтеры'),
      body: L(
        'A hook is a script Git runs at a fixed point in its own workflow. The pre-commit hook runs after you invoke git commit and before the commit object is created, which makes it the last cheap moment to stop a broken change. The pre-commit hook file lives in .git/hooks, is not tracked by Git and is not shared with anybody, which is why teams that rely on it end up with different rules on different machines.\n\nThe modern way to share hooks is a versioned directory plus one line of configuration. Tools such as Husky and lint-staged install a hooks directory into the repository and set core.hooksPath to it, so every clone runs the same checks. The typical pipeline runs the formatter, then the linter, then the type checker, and aborts the commit on the first failure with a non-zero exit code. Git reads that exit code, so the commit simply does not happen.\n\nThe stage is what makes these hooks fast. lint-staged takes the list of files that are about to be committed and runs the checks only against those files, so committing one file in a large project does not run the whole test suite. A hook that runs everything on every commit is a hook the team will disable within a week, and a disabled hook is worse than no hook because it looks like protection.\n\nThere is a second family of hooks around the other operations: commit-msg validates the message, pre-push runs before sending commits to the remote, and post-merge runs after a merge. They are all local by default, and the ones that enforce policy across a team are better placed in continuous integration, where the result is visible to everybody rather than only to the author.',
        'Хук — это скрипт, который Git запускает в фиксированной точке своего рабочего процесса. Хук pre-commit выполняется после вызова git commit и до создания объекта коммита, то есть это последний дешёвый момент, чтобы остановить сломанное изменение. Сам файл хука лежит в .git/hooks, не отслеживается Git и не раздаётся никому, поэтому команды, полагающиеся только на него, получают разные правила на разных машинах.\n\nСовременный способ раздать хуки — это версионируемая директория плюс одна строка конфигурации. Инструменты вроде Husky и lint-staged устанавливают каталог хуков в репозиторий и прописывают core.hooksPath, поэтому каждый клон выполняет одни и те же проверки. Типовой конвейер запускает форматтер, потом линтер, потом проверку типов и прерывает коммит на первой ошибке ненулевым кодом возврата. Git читает этот код, и коммит просто не происходит.\n\nСкорость даёт работа по индексированным файлам. lint-staged берёт список файлов, вот-вот попадающих в коммит, и запускает проверки только по ним, поэтому коммит одного файла в большом проекте не гоняет весь набор тестов. Хук, который каждый раз делает всё, команда отключит за неделю, а отключённый хук хуже отсутствующего, потому что он выглядит как защита.\n\nЕсть и вторая семья хуков вокруг остальных операций: commit-msg проверяет сообщение, pre-push выполняется перед отправкой коммитов на сервер, а post-merge — после слияния. По умолчанию все они локальные, и те, что должны задавать политику для всей команды, лучше держать в непрерывной интеграции, где результат виден всем, а не только автору.'
      ),
      bullets: [
        L('The pre-commit hook runs before the commit object exists.', 'Хук pre-commit выполняется до создания объекта коммита.'),
        L('A hook aborts the commit by exiting with a non-zero code.', 'Хук прерывает коммит ненулевым кодом возврата.'),
        L('Hooks in .git/hooks are local and are not shared by Git.', 'Хуки в .git/hooks локальны и Git их не раздаёт.'),
        L('core.hooksPath points Git at a shared, versioned hooks directory.', 'core.hooksPath указывает Git на общий версионируемый каталог хуков.'),
        L('Run the checks only on the staged files, or the team will disable them.', 'Проверяйте только проиндексированные файлы, иначе команду отключит хуки.'),
      ],
      code: `# where Git looks for hooks right now
git config core.hooksPath
ls .git/hooks

# a hook is a script that exits non-zero to block the commit
cat .git/hooks/pre-commit
#!/bin/sh
npm run lint && npm run typecheck

# the same checks in continuous integration
npm run lint
npm run typecheck`,
      table: {
        caption: L('Hook points and what each one guards', 'Точки хуков и что каждая охраняет'),
        headers: [
          L('Hook', 'Хук'),
          L('Runs', 'Когда выполняется'),
          L('Typical job', 'Обычная задача'),
        ],
        rows: [
          [L('pre-commit', 'pre-commit'), L('Before the commit is created', 'До создания коммита'), L('Format, lint, typecheck', 'Формат, линт, типы')],
          [L('commit-msg', 'commit-msg'), L('After the message, before the commit', 'После сообщения, до коммита'), L('Check the message format', 'Проверить формат сообщения')],
          [L('pre-push', 'pre-push'), L('Before sending commits to the remote', 'Перед отправкой на сервер'), L('Run the tests', 'Прогнать тесты')],
          [L('post-merge', 'post-merge'), L('After a merge completed', 'После завершённого слияния'), L('Rebuild generated files', 'Пересобрать сгенерированные файлы')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Hooks are local, CI is shared', 'Хуки локальны, CI общий'),
          text: L(
            'A hook only protects the machine it runs on, and --no-verify skips it without asking. Policy that must hold for everybody belongs in continuous integration, where the check runs on the server against the pushed commit and the result is attached to the change.',
            'Хук защищает только ту машину, на которой он выполняется, а --no-verify пропускает его без вопросов. Правила, обязательные для всех, должны жить в непрерывной интеграции: там проверка идёт на сервере по отправленному коммиту, а её результат привязан к изменению.'
          ),
        },
      ],
      takeaway: L(
        'Keep hooks fast and shared: version the hooks directory, run the checks only on staged files, and enforce the rest in CI.',
        'Хуки должны быть быстрыми и общими: версионируйте каталог хуков, проверяйте только проиндексированные файлы, а остальное проверяйте в CI.'
      ),
      seeAlso: [
        L('Section 2-1: git add and partial staging', 'Секция 2-1: git add и частичная индексация'),
        L('Chapter 5: remotes and collaboration', 'Глава 5: удалённые репозитории и совместная работа'),
      ],
    },
  ],
};
