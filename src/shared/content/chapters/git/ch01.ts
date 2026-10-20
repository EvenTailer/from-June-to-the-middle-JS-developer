import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh01: Chapter = {
  id: 'git-ch1',
  title: L('The object model and the three trees', 'Модель объектов и три дерева'),
  summary: L(
    'How Git stores a project as a graph of hashed objects, what the index and the working tree really contain, and why the reflog turns almost every accident into a recoverable mistake.',
    'Как Git хранит проект как граф объектов с хешами, что на самом деле лежит в индексе и в рабочем дереве и почему reflog превращает почти каждую аварию в обратимую ошибку.'
  ),
  sections: [
    {
      id: 'git-ch1-s1',
      title: L('Blobs, trees and commits', 'Блобы, деревья и коммиты'),
      body: L(
        'Git stores a project as a graph of immutable objects, and there are only four kinds of them. A blob holds the raw bytes of a file, with no name and no permissions attached. A tree holds a sorted list of entries, each with a name, a mode and the hash of another object, so a tree is a directory listing pointing at subtrees and blobs. A commit names one tree, one or more parent commits, and carries the author, the committer and a message. A tag is the fourth kind: a named and possibly signed pointer to any of the others.\n\nBecause a commit stores a whole tree, the history is a sequence of complete snapshots rather than a list of patches. The difference between two commits is computed on demand, which is why Git can check out an old state without keeping every intermediate diff. The cost is repetition inside the trees, and Git pays for it by deduplication: a file with unchanged content has the same hash in every snapshot and is stored exactly once, no matter how many directories contain a copy of it.\n\nThe practical consequence is that a commit cannot be edited. Change a file and you get a new blob, a new tree and a new commit, while the old objects stay exactly where they were. This is why operations that appear to edit history, a rebase among them, actually create new objects and move pointers. To look inside, use git cat-file -p to print any object and git ls-tree to list the entries of a tree with their hashes.\n\nObjects live compressed under .git/objects as loose files, and a background process packs them into packfiles that read much faster. git count-objects -v reports how many loose objects and packfiles the repository holds. Nothing in this model depends on file names: renaming a file changes the tree but not the blob, so a pure rename appears in a diff as a deletion plus an addition of identical content.',
        'Git хранит проект как граф неизменяемых объектов, и видов их всего четыре. Blob хранит сырые байты файла — без имени и без прав доступа. Tree хранит отсортированный список записей, в каждой имя, режим и хеш другого объекта, то есть tree — это листинг директории, указывающий на поддеревья и blob. Commit называет одно дерево, одного или нескольких родителей и хранит автора, коммитера и сообщение. Tag — четвёртый вид: именованный и, возможно, подписанный указатель на любой из остальных.\n\nПоскольку коммит хранит целое дерево, история — это последовательность полных снимков, а не список патчей. Разница между двумя коммитами считается по требованию, и поэтому Git может переключиться на старое состояние, не храня каждую промежуточную разницу. Цена — повторы внутри деревьев, и Git платит за них дедупликацией: файл с неизменившимся содержимым имеет один и тот же хеш в каждом снимке и хранится ровно один раз, сколько бы копий ни лежало в разных директориях.\n\nПрактическое следствие: коммит нельзя отредактировать. Изменили файл — получили новый blob, новое дерево и новый коммит, а старые объекты остались ровно на своих местах. Именно поэтому операции, которые выглядят как правка истории (перебазирование среди них), на самом деле создают новые объекты и двигают указатели. Заглянуть внутрь можно командами git cat-file -p — напечатать любой объект — и git ls-tree — показать записи дерева вместе с хешами.\n\nОбъекты лежат сжатыми в .git/objects россыпью файлов, а фоновый процесс упаковывает их в packfile, который читается заметно быстрее. git count-objects -v показывает, сколько свободных объектов и сколько packfile в репозитории. Ничто в этой модели не зависит от имён файлов: переименование меняет дерево, но не blob, поэтому чистое переименование в diff выглядит как удаление плюс добавление идентичного содержимого.'
      ),
      bullets: [
        L('Four object types: blob, tree, commit and tag.', 'Четыре вида объектов: blob, tree, commit и tag.'),
        L('A blob stores bytes only; the file name lives in the tree.', 'Blob хранит только байты; имя файла живёт в дереве.'),
        L('A commit is a tree plus parents plus metadata, never a diff.', 'Коммит — это дерево, родители и метаданные, а не дифф.'),
        L('Identical content is stored once, whatever path it lives at.', 'Одинаковое содержимое хранится один раз независимо от пути.'),
        L('Objects are immutable, so commands create objects and move pointers.', 'Объекты неизменяемы, поэтому команды создают объекты и двигают указатели.'),
      ],
      code: `# print any object by its hash
git cat-file -p HEAD
git cat-file -t HEAD          # commit
git cat-file -t HEAD^{tree}   # tree

# list the entries of a tree with their hashes
git ls-tree HEAD

# hash a file without storing it
git hash-object README.md

# how the objects are stored on disk
git count-objects -v`,
      table: {
        caption: L('The four object types', 'Четыре вида объектов'),
        headers: [
          L('Type', 'Вид'),
          L('What it stores', 'Что хранит'),
          L('What it points at', 'На что указывает'),
        ],
        rows: [
          [L('blob', 'blob'), L('File bytes', 'Байты файла'), L('nothing', 'ни на что')],
          [L('tree', 'tree'), L('Names, modes, entries', 'Имена, режимы, записи'), L('trees and blobs', 'деревья и blob')],
          [L('commit', 'commit'), L('Author, committer, message', 'Автор, коммитер, сообщение'), L('one tree and its parents', 'одно дерево и родители')],
          [L('tag', 'tag'), L('Tagger, message, signature', 'Теггер, сообщение, подпись'), L('any other object', 'любой другой объект')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Commits are not diffs', 'Коммиты — не диффы'),
          text: L(
            'Because a commit stores a full snapshot, "the commit contains my change" means "the file in the tree of that commit differs from the tree of its parent". Tools that reconstruct a patch must compute the difference themselves, and a diff that looks empty against the wrong parent is a common source of confusion.',
            'Поскольку коммит хранит полный снимок, «коммит содержит моё изменение» означает «файл в дереве этого коммита отличается от дерева его родителя». Инструменты, которые восстанавливают патч, считают разницу сами, и пустой diff против неверного родителя — частая причина непонимания.'
          ),
        },
      ],
      takeaway: L(
        'Learn the four object types first: every later Git command is just a manipulation of hashes, trees and pointers.',
        'Сначала выучите четыре вида объектов: любая команда Git дальше — это работа с хешами, деревьями и указателями.'
      ),
      seeAlso: [
        L('Section 1-5: hashes, SHAs and content addressing', 'Секция 1-5: хеши, SHA и адресация по содержимому'),
        L('Chapter 2: staging and committing', 'Глава 2: индексация и коммиты'),
      ],
    },
    {
      id: 'git-ch1-s2',
      title: L('The three trees: working directory, index, HEAD', 'Три дерева: рабочая директория, индекс, HEAD'),
      body: L(
        'A change can live in three different places at the same time, and almost every confusing Git message comes from not knowing which place a command touches. The working directory is the files on disk that you edit. The index is a binary file, .git/index, that holds the exact content Git will write into the next commit. HEAD is a pointer to the commit the index was last compared against. git status shows the difference between all three at once.\n\nThe cycle is short. git add copies the current content of a file into the index, and git commit writes a tree from the index and points a new commit at it. The detail that matters is that the index stores whole file contents, not names and not patches. Edit a file after adding it and the index still holds the old version, so the file shows up twice in git status: once as a staged change relative to HEAD and once as an unstaged change relative to the index.\n\nOnly what sits in the index reaches a commit. A file you never added is invisible to it, and a file you deleted from disk but left in the index is committed as though it still existed. That asymmetry is the trap behind git add ., which stages everything it finds, including build output, dependency folders and credentials.\n\nThe same three places explain the rest of the vocabulary. git diff compares the working directory with the index, git diff --staged compares the index with HEAD, git restore puts a file back into one of the three states, and git stash saves the index and the working tree and then resets both. Knowing which state a command changes is worth more than memorising its flags.',
        'Изменение может одновременно находиться в трёх разных местах, и почти все непонятные сообщения Git связаны с тем, что неизвестно, какое именно место трогает команда. Рабочая директория — это файлы на диске, которые вы правите. Индекс — двоичный файл .git/index, в котором лежит ровно то содержимое, которое Git запишет в следующий коммит. HEAD — указатель на коммит, с которым последний раз сравнивался индекс. git status показывает разницу между всеми тремя сразу.\n\nЦикл короткий. git add копирует текущее содержимое файла в индекс, а git commit строит дерево из индекса и указывает на него новым коммитом. Важная деталь: индекс хранит целые содержимое файлов, а не имена и не патчи. Правка файла после добавления оставляет в индексе старую версию, и файл показывается в git status дважды: как staged-изменение относительно HEAD и как unstaged-изменение относительно индекса.\n\nВ коммит попадает только то, что лежит в индексе. Файл, который вы ни разу не добавили, для коммита не существует, а файл, удалённый с диска, но оставшийся в индексе, коммитится так, будто он на месте. Именно в этой асимметрии спрятана ловушка git add ., который индексирует всё подряд, включая сборочный вывод, папки зависимостей и учётные данные.\n\nТе же три места объясняют остальной словарь. git diff сравнивает рабочую директорию с индексом, git diff --staged — индекс с HEAD, git restore возвращает файл в одно из трёх состояний, а git stash сохраняет индекс и рабочую директорию и сбрасывает оба. Понимание того, какое состояние меняет команда, полезнее, чем запоминание её флагов.'
      ),
      bullets: [
        L('A commit is built from the index, never directly from the files on disk.', 'Коммит собирается из индекса, а не напрямую из файлов на диске.'),
        L('The index stores content, so editing a file after staging shows it twice.', 'Индекс хранит содержимое, поэтому правка после индексации видна дважды.'),
        L('git diff compares the working tree with the index.', 'git diff сравнивает рабочую директорию с индексом.'),
        L('git diff --staged compares the index with HEAD.', 'git diff --staged сравнивает индекс с HEAD.'),
        L('git add . stages everything, including what you never meant to ship.', 'git add . индексирует всё, включая то, что отправлять не собирались.'),
      ],
      code: `# stage one file instead of everything
git add src/app.ts
git status --short          # "M  src/app.ts"

# the two diffs, they answer different questions
git diff                    # working tree vs index
git diff --staged           # index vs HEAD

# the tree a commit would contain right now
git write-tree

# the commit the index is compared against
git rev-parse HEAD`,
      table: {
        caption: L('Where a change can sit', 'Где может лежать изменение'),
        headers: [
          L('Place', 'Место'),
          L('What it is', 'Что это'),
          L('What it holds', 'Что в нём лежит'),
        ],
        rows: [
          [L('Working directory', 'Рабочая директория'), L('Files on disk', 'Файлы на диске'), L('Your edits, not yet added', 'Ваши правки, пока не добавленные')],
          [L('Index (.git/index)', 'Индекс (.git/index)'), L('A binary snapshot', 'Двоичный снимок'), L('Exactly what the next commit records', 'Ровно то, что запишет следующий коммит')],
          [L('HEAD', 'HEAD'), L('A pointer to a commit', 'Указатель на коммит'), L('The last commit, the baseline', 'Последний коммит, точка отсчёта')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Staged is not the same as final', 'Staged — не значит финально'),
          text: L(
            'A file that is staged and then edited again is only half committed. The commit will carry the version you added, not the version on disk, and the working tree will look clean to a careless eye only if nobody reads git status. Review the staged diff before every commit.',
            'Файл, который проиндексировали и потом правили ещё раз, попадёт в коммит наполовину. В коммит уйдёт та версия, которую вы добавили, а не та, что лежит на диске, и рабочая директория будет выглядеть чистой только если не смотреть в git status. Проверяйте staged-дифф перед каждым коммитом.'
          ),
        },
      ],
      takeaway: L(
        'The index decides what a commit contains, so read git diff --staged before committing, not the files on disk.',
        'Индекс решает, что попадёт в коммит, поэтому смотрите git diff --staged, а не файлы на диске.'
      ),
      seeAlso: [
        L('Section 2-1: git add and partial staging', 'Секция 2-1: git add и частичная индексация'),
        L('Section 4-1: git reset and its three modes', 'Секция 4-1: git reset и его три режима'),
      ],
    },
    {
      id: 'git-ch1-s3',
      title: L('References, HEAD and the reflog', 'Ссылки, HEAD и reflog'),
      body: L(
        'A reference is a name that points at an object. Branches live under refs/heads, remote-tracking copies under refs/remotes and tags under refs/tags. Each one is a small file containing a hash, and because a branch is only a hash, moving it costs nothing: writing forty bytes replaces the entire pointer. That is why a repository can hold hundreds of branches and why creating one takes no measurable time.\n\nHEAD is special, because it is usually a symbolic reference: a file whose content is the path refs/heads/main. It points at a branch rather than at a commit, and that indirection is exactly what makes git commit move the current branch instead of leaving an orphan commit behind. git symbolic-ref HEAD prints the branch it points at. Checking out a raw commit hash replaces that symbolic link with a direct hash, and the repository enters the detached HEAD state, where new commits are reachable only through the reflog.\n\nThe reflog is the second half of the story. Every time HEAD or a branch moves, Git appends a line with the old hash, the new hash, who performed the move and when. The log lives in .git/logs, it is local and it is never pushed, which also makes it a private record of experiments that nobody else has to see. git reflog shows the history of HEAD, git reflog show main shows the history of a branch, and the notation HEAD@{1} means the position HEAD held one move ago.\n\nBecause the reflog stores the old hash, a move never destroys the commit that was there. That is the difference between a branch disappearing and a commit disappearing, and it is why detached HEAD is less dangerous than its reputation suggests. A few references exist for specific moments: ORIG_HEAD points at the commit HEAD held before the last reset or merge, MERGE_HEAD marks an unfinished merge and CHERRY_PICK_HEAD an unfinished cherry-pick.',
        'Ссылка — это имя, указывающее на объект. Ветки лежат в refs/heads, отслеживающие копии чужих веток — в refs/remotes, теги — в refs/tags. Каждая ссылка это маленький файл с хешем, а поскольку ветка — это всего лишь хеш, переставить её ничего не стоит: запись сорока байт полностью заменяет указатель. Поэтому репозиторий спокойно держит сотни веток, а создание ветки занимает ничтожное время.\n\nHEAD особенен: обычно это символическая ссылка, то есть файл, содержимое которого — путь refs/heads/main. Она указывает на ветку, а не на коммит, и именно эта косвенность заставляет git commit двигать текущую ветку, а не оставлять потерянный коммит. git symbolic-ref HEAD печатает ветку, на которую ссылается HEAD. Переключение на сырой хеш коммита заменяет эту символическую ссылку прямым хешем, и репозиторий переходит в состояние отделённого HEAD, где новые коммиты достижимы только через reflog.\n\nReflog — вторая половина этой истории. Каждый раз, когда двигается HEAD или ветка, Git дописывает строку со старым хешем, новым хешем, тем, кто это сделал, и временем. Журнал лежит в .git/logs, он локальный и никогда не отправляется, а значит служит ещё и личным журналом экспериментов, которые никто кроме вас не увидит. git reflog показывает историю HEAD, git reflog show main — историю ветки, а запись HEAD@{1} означает положение HEAD на один шаг назад.\n\nПоскольку reflog хранит старый хеш, перемещение никогда не уничтожает тот коммит, который там был. Это разница между «ветка исчезла» и «коммит исчез», и именно поэтому отделённый HEAD опаснее только по репутации. Есть и ссылки для особых моментов: ORIG_HEAD указывает на коммит, на который HEAD смотрел до последнего reset или merge, MERGE_HEAD отмечает незавершённое слияние, а CHERRY_PICK_HEAD — незавершённый cherry-pick.'
      ),
      bullets: [
        L('A branch is a file containing a hash, so moving it is instant.', 'Ветка — это файл с хешем, поэтому переставить её можно мгновенно.'),
        L('HEAD normally points at a branch, not at a commit.', 'HEAD обычно указывает на ветку, а не на коммит.'),
        L('The reflog records every move of HEAD and of every branch.', 'Reflog записывает каждое перемещение HEAD и каждой ветки.'),
        L('The reflog is local and never leaves your machine.', 'Reflog локальный и никогда не покидает вашу машину.'),
        L('ORIG_HEAD, MERGE_HEAD and CHERRY_PICK_HEAD explain an interrupted operation.', 'ORIG_HEAD, MERGE_HEAD и CHERRY_PICK_HEAD объясняют прерванную операцию.'),
      ],
      code: `# where does HEAD point
git symbolic-ref HEAD
git rev-parse --abbrev-ref HEAD

# the branches and what they point at
git branch -vv
git show-ref --heads

# the local history of HEAD
git reflog
git reflog show main

# the special references
git rev-parse ORIG_HEAD
cat .git/MERGE_HEAD`,
      table: {
        caption: L('References worth knowing', 'Ссылки, которые стоит знать'),
        headers: [
          L('Reference', 'Ссылка'),
          L('Points at', 'Указывает на'),
          L('Lifetime', 'Время жизни'),
        ],
        rows: [
          [L('refs/heads/main', 'refs/heads/main'), L('A commit', 'Коммит'), L('Until you delete the branch', 'Пока не удалите ветку')],
          [L('HEAD', 'HEAD'), L('A branch, or a commit when detached', 'Ветку, а при отделённом HEAD — коммит'), L('Moves with every commit', 'Двигается с каждым коммитом')],
          [L('refs/remotes/origin/main', 'refs/remotes/origin/main'), L('A commit known on the server', 'Коммит, известный серверу'), L('Refreshed by fetch', 'Обновляется при fetch')],
          [L('ORIG_HEAD', 'ORIG_HEAD'), L('The commit before the last reset or merge', 'Коммит до последнего reset или merge'), L('Overwritten by the next one', 'Перезаписывается следующим')],
          [L('Reflog entries', 'Записи reflog'), L('Every past position of a ref', 'Все прошлые положения ссылки'), L('Expires on a schedule', 'Истекают по расписанию')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Detached HEAD is survivable', 'Отделённый HEAD выживает'),
          text: L(
            'Commits made while HEAD is detached are not lost, they are simply unreachable from any branch. The reflog still holds them, and git branch rescue HEAD@{1} puts them back on a branch. Do it right away, and write the branch down.',
            'Коммиты, сделанные при отделённом HEAD, не теряются — они просто недостижимы ни из одной ветки. Reflog их хранит, а команда git branch rescue HEAD@{1} возвращает их на ветку. Сделайте это сразу и запишите имя ветки.'
          ),
        },
      ],
      takeaway: L(
        'A branch is a hash, HEAD points at a branch, and the reflog keeps every past position of both.',
        'Ветка — это хеш, HEAD указывает на ветку, а reflog хранит все прошлые положения и того и другого.'
      ),
      seeAlso: [
        L('Section 1-4: the commit graph and ancestry', 'Секция 1-4: граф коммитов и родство'),
        L('Section 4-4: the reflog as a safety net', 'Секция 4-4: reflog как страховочная сетка'),
      ],
    },
    {
      id: 'git-ch1-s4',
      title: L('The commit graph and ancestry', 'Граф коммитов и родство'),
      body: L(
        'Commits form a directed acyclic graph, not a list. Every commit points at its parents, and a commit with no parents is a root commit. From any commit you can walk backwards, and the set of commits reachable that way is its ancestry. Two branches that share history are not two histories but one history with two heads, and the point where they split is called the merge base.\n\nThe merge base is the best common ancestor of two commits, and it is what Git uses as the reference point of a three-way merge. git merge-base computes it, and git merge-base --is-ancestor answers the ancestry question directly through its exit code, which is exactly what a script needs. Because the graph is a DAG and not a tree, a merge commit has two parents and can be reached along several different paths.\n\nReading that graph is a skill of its own. git log --graph --oneline --all --decorate draws the shape, while --first-parent follows only the main line and hides the commits that arrived through merges. That second view is the one to use when you want to know what the trunk actually contains. git log --ancestry-path limits the output to the commits lying on the way between two points.\n\nThe graph also explains why merging twice differs from merging once. After a merge, the merge base of the two branches is the merge commit itself, so a second merge has nothing left to combine. The graph is also why rebasing a branch that was already merged changes things underneath the trunk: the trunk still points at the old merge commit while your branch now points at rewritten copies of the same changes, and the two no longer share an ancestor.',
        'Коммиты образуют направленный ациклический граф, а не список. Каждый коммит указывает на своих родителей, а коммит без родителей называется корневым. От любого коммита можно пройти назад, и множество достижимых так коммитов называется его родством. Две ветки с общей историей — это не две истории, а одна история с двумя головами, и точка, в которой они разошлись, называется базой слияния.\n\nБаза слияния — наилучший общий предок двух коммитов, и именно Git использует её как опору для трёхстороннего слияния. Базу вычисляет git merge-base, а вопрос о родстве напрямую, через код возврата, решает git merge-base --is-ancestor — ровно то, что нужно скрипту. Поскольку граф, а не дерево, у merge-коммита два родителя, и добраться до него можно несколькими путями.\n\nЧитать такой граф — отдельный навык. git log --graph --oneline --all --decorate рисует его форму, а --first-parent идёт только по основной линии и прячет коммиты, пришедшие через слияния. Второй вид нужен, когда вы хотите понять, что на самом деле содержит основная ветка. git log --ancestry-path ограничивает вывод коммитами, лежащими на пути между двумя точками.\n\nГраф объясняет и то, почему второе слияние отличается от первого. После слияния базой двух веток становится сам merge-коммит, поэтому повторному слиянию нечего объединять. Граф же объясняет, почему перебазирование уже слитой ветки меняет всё под основной веткой: основная ветка по-прежнему указывает на старый merge-коммит, а ваша ветка — на переписанные копии тех же изменений, и общего предка у них больше нет.'
      ),
      bullets: [
        L('Ancestry is reachability: a commit is an ancestor if you can walk to it.', 'Родство — это достижимость: коммит предок, если до него можно дойти.'),
        L('The merge base is the best common ancestor of two commits.', 'База слияния — наилучший общий предок двух коммитов.'),
        L('A merge commit has two parents, so the history is a DAG.', 'У merge-коммита два родителя, поэтому история — это DAG.'),
        L('git log --first-parent shows the trunk without the merged side branches.', 'git log --first-parent показывает основную линию без влитых веток.'),
        L('A second merge of the same branches usually has nothing to do.', 'Повторному слиянию тех же веток обычно делать нечего.'),
      ],
      code: `# draw the graph
git log --graph --oneline --all --decorate

# only the main line, without what came in through merges
git log --first-parent --oneline main

# where the two branches diverged
git merge-base main feature/login
git merge-base --is-ancestor main feature/login && echo "main is behind"

# what is on the way between two points
git log --ancestry-path main..feature/login
git log --merges --oneline --all`,
      table: {
        caption: L('Graph questions and the commands that answer them', 'Вопросы о графе и команды, которые на них отвечают'),
        headers: [
          L('Question', 'Вопрос'),
          L('Command', 'Команда'),
        ],
        rows: [
          [L('Where did these two branches split?', 'Где разошлись эти две ветки?'), L('git merge-base A B', 'git merge-base A B')],
          [L('Is A an ancestor of B?', 'Является ли A предком B?'), L('git merge-base --is-ancestor A B', 'git merge-base --is-ancestor A B')],
          [L('What does the trunk contain?', 'Что содержит основная ветка?'), L('git log --first-parent main', 'git log --first-parent main')],
          [L('Which commits arrived through a merge?', 'Какие коммиты пришли через слияние?'), L('git log --merges', 'git log --merges')],
          [L('How many commits am I missing?', 'Сколько коммитов мне не хватает?'), L('git rev-list --count main..feature', 'git rev-list --count main..feature')],
        ],
      },
      takeaway: L(
        'The history is a DAG, not a list: ancestry is reachability, and the merge base is the point where two histories diverged.',
        'История — это DAG, а не список: родство есть достижимость, а база слияния — точка, где две истории разошлись.'
      ),
      seeAlso: [
        L('Section 3-2: the merge base and the three-way merge', 'Секция 3-2: база слияния и трёхстороннее слияние'),
        L('Section 3-6: interactive rebase', 'Секция 3-6: интерактивное перебазирование'),
      ],
    },
    {
      id: 'git-ch1-s5',
      title: L('Hashes, SHAs and content addressing', 'Хеши, SHA и адресация по содержимому'),
      body: L(
        'The name of a Git object is a hash of its content, and this makes the whole system content-addressed. Write the same bytes and you get the same name, no matter when or where they were written. Change one byte and the name changes completely. Because the hash also covers the type and the length of the object, a blob can never be mistaken for a tree that happens to contain the same text.\n\nThe guarantee is content integrity, not security. Git recomputes hashes while reading objects and complains when they do not match, so a corrupted repository is detected instead of being silently served. The default algorithm is SHA-1, a 160-bit hash. Practical collisions for SHA-1 have existed since 2017, so SHA-256 is available as an option: git init --object-format=sha256 creates a repository whose hashes are 256 bits wide. It is not the default, and the two formats cannot be mixed inside one repository.\n\nA hash shows up in the output of almost every command, and reading one is a skill. A full SHA is forty characters, and the first seven are the usual abbreviation, which Git accepts anywhere a commit is expected. git rev-parse expands an abbreviation into the full hash, and git rev-parse --short produces the short form. Short hashes are fine in a commit message and dangerous in a script, because two different objects may share a prefix.\n\nSince names are derived from content, deduplication comes for free, and since they cover the whole object, the graph is tamper-evident. Two repositories with the same commits produce the same hashes for them, which is why a fork shares history with the original and why patches move between them without friction. The price is that changing anything changes every hash above it, and that is the technical reason a rebase rewrites hashes.',
        'Имя объекта Git — это хеш его содержимого, и на этом держится вся система адресации по содержимому. Записали одни и те же байты — получили одно и то же имя, независимо от времени и места записи. Изменили один байт — имя изменилось полностью. Поскольку хеш покрывает ещё и тип объекта с его длиной, blob никогда не будет принят за tree с тем же текстом.\n\nГарантия здесь — целостность содержимого, а не безопасность. Git пересчитывает хеши при чтении объектов и сообщает о несовпадении, поэтому повреждённый репозиторий обнаруживается, а не выдаётся молча. Алгоритм по умолчанию — SHA-1, 160-битный хеш. Практические коллизии SHA-1 существуют с 2017 года, поэтому доступен SHA-256: команда git init --object-format=sha256 создаёт репозиторий с 256-битными хешами. Это не значение по умолчанию, и смешивать два формата в одном репозитории нельзя.\n\nХеш встречается в выводе почти каждой команды, и умение его читать полезно. Полный SHA — это сорок символов, а первые семь считаются обычным сокращением, которое Git принимает в любом месте, где ждут коммит. git rev-parse разворачивает сокращение в полный хеш, а git rev-parse --short даёт короткую форму. Короткий хеш годится для сообщения коммита и опасен в скрипте, потому что два разных объекта могут делить один префикс.\n\nРаз имена выводятся из содержимого, дедупликация получается бесплатной, а раз они покрывают объект целиком, граф устойчив к подделке. Два репозитория с одинаковыми коммитами дают одинаковые хеши, и поэтому форк делит историю с оригиналом, а патчи переносятся между ними без возни. Цена в том, что любое изменение меняет все хеши над ним, — это и есть техническая причина, по которой перебазирование переписывает хеши.'
      ),
      bullets: [
        L('Object names are derived from content, so the same bytes give the same hash.', 'Имя объекта выводится из содержимого: одинаковые байты дают одинаковый хеш.'),
        L('The hash covers the object type and length as well as the bytes.', 'Хеш покрывает ещё и тип объекта с его длиной.'),
        L('SHA-1 is the default, SHA-256 is available for new repositories.', 'По умолчанию SHA-1, SHA-256 доступен для новых репозиториев.'),
        L('Short hashes are for humans, full hashes for scripts.', 'Короткие хеши — для людей, полные — для скриптов.'),
        L('Identical histories produce identical hashes in every clone.', 'Одинаковая история даёт одинаковые хеши в любом клоне.'),
      ],
      code: `# the full form and the short form
git rev-parse HEAD
git rev-parse --short HEAD

# what kind of object is this
git cat-file -t HEAD
git cat-file -t HEAD^{tree}

# hash a file, without storing it and with storing
git hash-object README.md
git hash-object -w README.md

# a repository with wider hashes
git init --object-format=sha256 new-repo`,
      table: {
        caption: L('What content addressing buys', 'Что даёт адресация по содержимому'),
        headers: [
          L('Property', 'Свойство'),
          L('What it means', 'Что это значит'),
        ],
        rows: [
          [L('Deterministic', 'Детерминированность'), L('The same content always yields the same hash', 'Одинаковое содержимое всегда даёт одинаковый хеш')],
          [L('Content addressed', 'Адресация по содержимому'), L('The name of an object is derived from its bytes', 'Имя объекта выводится из его байтов')],
          [L('Tamper evident', 'Устойчивость к подмене'), L('Changing a commit changes every hash above it', 'Изменение коммита меняет все хеши над ним')],
          [L('Deduplicated', 'Дедупликация'), L('Identical blobs are stored exactly once', 'Одинаковые blob хранятся ровно один раз')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('SHA-256 is available, not automatic', 'SHA-256 доступен, но не включён сам'),
          text: L(
            'A repository created with git init --object-format=sha256 stays on SHA-256 for its lifetime, and the format cannot be changed later. Choose it for a new long-lived project if your policy requires it; do not attempt to convert an existing repository in place.',
            'Репозиторий, созданный с git init --object-format=sha256, останется на SHA-256 навсегда, и сменить формат позже нельзя. Выбирайте его для нового долгоживущего проекта, если этого требует ваша политика, но не пытайтесь конвертировать существующий репозиторий на месте.'
          ),
        },
      ],
      takeaway: L(
        'A Git hash is a content address: identical content gives identical hashes, and any change above it changes every hash below.',
        'Хеш Git — это адрес содержимого: одинаковое содержимое даёт одинаковый хеш, а любое изменение меняет все хеши под ним.'
      ),
      seeAlso: [
        L('Section 1-1: blobs, trees and commits', 'Секция 1-1: блобы, деревья и коммиты'),
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
      ],
    },
  ],
};
