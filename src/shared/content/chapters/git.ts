import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitChapters: Chapter[] = [
  {
    id: 'git-ch1',
    title: L('The object model and the three trees', 'Модель объектов и три дерева'),
    summary: L(
      'How Git stores content as a graph of hashed objects, what the index and the working tree actually hold, and why the reflog makes almost every accident recoverable.',
      'Как Git хранит содержимое как граф объектов с хешами, что на самом деле лежит в индексе и рабочей директории и почему reflog делает почти каждую аварию обратимой.'
    ),
    sections: [
      {
        id: 'git-ch1-s1',
        title: L('Objects: blobs, trees and commits', 'Объекты: blob, tree и commit'),
        body: L(
          'Git stores the project as a graph of objects, and every object is identified by the hash of its content. There are four kinds. A blob holds the bytes of a file. A tree holds names, modes and references to other trees and blobs: it is a directory listing. A commit points at one tree, at one or more parent commits, and carries the author, committer and message.\n\nBecause the name of an object is the hash of its content, the same bytes always produce the same hash, and any change to a file changes the hash of its blob, then of the trees above it, then of the commit. Nothing is stored twice: identical files in different directories share one blob. That is why Git is fast: checking out a large repository writes pointers rather than data.\n\nThe hashes are SHA-1 by default, with SHA-256 support for new repositories. Git stores objects compressed with zlib as loose files under .git/objects, and later packs them into a packfile. The history is a set of full snapshots, not a list of diffs, and differences are computed on demand.\n\nThe commands worth memorising are git cat-file -p, which prints any object, git ls-tree, which lists a tree, and git log --raw --pretty=fuller, which shows which paths really changed between commits.',
          'Git хранит проект как граф объектов, и каждый объект опознаётся по хешу своего содержимого. Видов четыре. Blob хранит байты файла. Tree хранит имена, режимы и ссылки на другие tree и blob: это листинг директории. Commit указывает на одно дерево, на одного или нескольких родителей и хранит автора, коммитера и сообщение. Tag указывает на commit и несёт собственное сообщение.\n\nПоскольку имя объекта — это хеш его содержимого, одни и те же байты всегда дают один и тот же хеш, а любое изменение файла меняет хеш его blob, потом хеш всех деревьев над ним, потом хеш коммита. Ничего не хранится дважды: одинаковые файлы в разных директориях делят один blob. Именно поэтому Git быстр: чекаут большого репозитория в основном пишет указатели, а не данные.\n\nПо умолчанию хеши — SHA-1, поддержка SHA-256 есть для новых репозиториев. Объекты Git хранит сжатыми через zlib россыпью файлов в .git/objects, а затем упаковывает в packfile со сжатием дельт. История — не список диффов: это набор полных снимков, а разница вычисляется по требованию.\n\nКоманды для инспекции стоит запомнить: git cat-file -p печатает содержимое любого объекта, git ls-tree показывает записи дерева, а git log --raw --pretty=fuller показывает, какие пути действительно менялись между коммитами, и это часто не то, что показывает diffstat.'
        ),
        bullets: [
          L('The name of an object is the hash of its content.', 'Имя объекта — это хеш его содержимого.'),
          L('A commit points at a tree, and a tree points at blobs and other trees.', 'Commit указывает на tree, а tree — на blob и другие tree.'),
          L('Identical files share one blob, nothing is duplicated.', 'Одинаковые файлы делят один blob, дублирования нет.'),
          L('The history is a set of snapshots, diffs are computed on demand.', 'История — набор снимков, диффы считаются по требованию.'),
        ],
        code: `# what is inside a commit
git cat-file -p HEAD

# the entries of a tree
git ls-tree HEAD

# which paths really changed
git log --raw --pretty=fuller -2

# the hash of a blob and of a tree
git hash-object README.md
git rev-parse HEAD^{tree}`,
        takeaway: L(
          'Git stores snapshots of hashed objects, so every change creates new content and the history can never be silently rewritten.',
          'Git хранит снимки из хешированных объектов, поэтому любое изменение создаёт новое содержимое, а историю нельзя переписать молча.'
        ),
      },
      {
        id: 'git-ch1-s2',
        title: L('The three trees', 'Три дерева'),
        body: L(
          'A commit is taken from a staging area, not from the files on disk. That staging area is the index, and knowing the three trees explains most surprising Git behaviour. The working tree is what you see and edit, the index is a snapshot of what the next commit will contain, and HEAD is a pointer to the commit the index was compared against.\n\nThe cycle is this: you edit files, git add copies their current content into the index, and git commit writes a tree from the index and points a new commit at it. The subtlety: the index stores content, not file names. If you edit a file after adding it, the index still holds the old content, and git status shows the file twice: staged changes relative to HEAD and unstaged changes relative to the index.\n\nA commit writes only what is in the index. Files never added are invisible to it, and a file deleted from the working tree but still in the index is committed as existing. The opposite mistake is commoner: git add . stages everything, including build output and secrets. The three trees are also the mechanism behind stash, checkout and reset: stash saves and resets both, checkout swaps both to match the target commit, and reset moves HEAD with them.',
          'Коммит берётся не из файлов на диске, а из промежуточной области — индекса, и понимание трёх деревьев объясняет почти всё неожиданное в Git. Рабочая директория — то, что вы видите и правите. Индекс — снимок того, что попадёт в следующий коммит. HEAD — указатель на коммит, с которым сравнивался индекс.\n\nЦикл выглядит так: вы правите файлы, git add копирует их содержимое в индекс, а git commit строит дерево из индекса и указывает на него новый коммит. Тонкость: индекс хранит содержимое, а не имена файлов. Если вы правите файл после добавления, в индексе осталась старая версия, и git status показывает файл дважды: staged-изменения относительно HEAD и unstaged-изменения относительно индекса. Поэтому файл остаётся видимым в git diff после git add: diff сравнивает рабочую директорию с индексом.\n\nКоммит записывает только то, что лежит в индексе. Файлы, которые не добавили, для него не существуют, а файл, удалённый из рабочей директории, но оставшийся в индексе, коммитится как существующий. Чаще встречается обратная ошибка: git add . добавляет всё, включая сборочный вывод и секреты.\n\nТри дерева — это и есть механизм, на котором построены stash, checkout и reset. Stash сохраняет рабочую директорию и индекс и сбрасывает их. Checkout ветки подменяет оба состоянием целевого коммита и отказывается затирать незакоммиченные изменения без указания. Reset двигает HEAD и, в зависимости от режима, индекс с рабочей директорией.'
        ),
        bullets: [
          L('A commit is built from the index, never directly from the files on disk.', 'Коммит собирается из индекса и никогда напрямую из файлов на диске.'),
          L('The index stores content, so a file edited after staging shows up twice.', 'Индекс хранит содержимое, поэтому файл, правленый после добавления, виден дважды.'),
          L('git diff compares the working tree with the index.', 'git diff сравнивает рабочую директорию с индексом.'),
          L('Only what is staged gets committed, so git add . is a real risk.', 'Коммитится только то, что добавлено, поэтому git add . — реальный риск.'),
        ],
        code: `# stage one file, then look at both views
git add src/app.ts
git status
git diff          # working tree vs index
git diff --staged  # index vs HEAD

# write a tree and a commit by hand
git write-tree
git commit-tree <tree> -p HEAD -m "message"
git update-ref refs/heads/manual <commit>`,
        takeaway: L(
          'The index decides what a commit contains, so check the staged diff before you commit, not the working tree.',
          'Индекс решает, что попадёт в коммит, поэтому смотрите staged-дифф, а не рабочую директорию.'
        ),
      },
      {
        id: 'git-ch1-s3',
        title: L('References, HEAD and the reflog', 'Ссылки, HEAD и reflog'),
        body: L(
          'Branches and tags are small files containing the hash of an object, stored under .git/refs. refs/heads holds the branches, refs/remotes the remote-tracking copies of other repositories, and refs/tags the tags. HEAD is a symbolic reference to a branch, usually refs/heads/main, and that is what makes git commit advance the current branch.\n\nBecause a branch is only a hash, moving it is instant and costs nothing. Checking out a commit directly detaches HEAD, and commits made in that state are reachable only through the reflog, which is a convenient way to lose work.\n\nThe reflog is an append-only log of every position of HEAD and of every branch that was moved. It is local, never pushed, and the reason that almost every Git accident is recoverable. git reflog shows the list, git reflog show main does the same for a branch, and a hash from a past entry becomes a branch again with git branch rescue <hash>.\n\nA few other references exist for specific purposes. ORIG_HEAD points at the commit HEAD pointed to before the last reset or merge, MERGE_HEAD marks an unfinished merge, and CHERRY_PICK_HEAD an unfinished cherry-pick. They are not backups, but they explain the state of a repository that stopped mid-operation, and git status will tell you what happened.',
          'Ветки и теги — небольшие файлы с хешем объекта, лежащие в .git/refs. В refs/heads хранятся ветки, в refs/remotes — отслеживающие копии чужих веток, в refs/tags — теги. HEAD — символическая ссылка на ветку, обычно refs/heads/main, и именно она заставляет git commit двигать текущую ветку, а не создавать потерянную историю.\n\nПоскольку ветка — это просто хеш, переставить её можно мгновенно и бесплатно. Переключившись напрямую на коммит, вы отделяете HEAD, и коммиты, сделанные в таком состоянии, достижимы только через reflog — удобный способ потерять работу.\n\nReflog — это append-only журнал всех положений HEAD и всех перемещений веток. Он локальный, никогда не отправляется на сервер, и именно поэтому почти каждая авария в Git обратима. git reflog показывает список, git reflog show main — то же для ветки, а хеш из прошлой записи снова превращается в ветку командой git branch rescue <hash>.\n\nЕсть и другие ссылки для особых случаев: ORIG_HEAD указывает на коммит, на который HEAD смотрел до последнего reset или merge, MERGE_HEAD отмечает незавершённый merge, а CHERRY_PICK_HEAD — незавершённый cherry-pick. Это не бэкапы в общем смысле, но они объясняют состояние репозитория, остановившегося посреди операции, и git status скажет, что произошло.'
        ),
        bullets: [
          L('A branch is a file with a hash, so moving it is instant.', 'Ветка — это файл с хешем, поэтому переставить её можно мгновенно.'),
          L('HEAD is a symbolic reference, usually to the current branch.', 'HEAD — символическая ссылка, обычно на текущую ветку.'),
          L('The reflog is local, is never pushed and survives every reset.', 'Reflog локальный, не отправляется и переживает любой reset.'),
          L('Detached HEAD is safe only while the reflog remembers it.', 'Отделённый HEAD в безопасности, пока его помнит reflog.'),
        ],
        code: `# where is HEAD pointing
git symbolic-ref HEAD
git branch -vv

# the safety net
git reflog
git reflog show main

# bring a lost commit back
git branch rescue HEAD@{1}
git reset --hard HEAD@{1}

# what was left unfinished
cat .git/MERGE_HEAD
cat .git/ORIG_HEAD`,
        takeaway: L(
          'HEAD points at a branch, branches are just hashes, and the reflog is the net that catches nearly every mistake.',
          'HEAD указывает на ветку, ветки — просто хеши, а reflog — это сетка, которая ловит почти каждую ошибку.'
        ),
      },
    ],
  },
  {
    id: 'git-ch2',
    title: L('Branches, merges, rebases and conflicts', 'Ветки, слияния, переносы и конфликты'),
    summary: L(
      'What a branch really is, how a three-way merge decides what to keep, and how rebasing rewrites history without hiding the cost of rewriting.',
      'Что такое ветка на самом деле, как трёхстороннее слияние решает, что оставить, и как перенос коммитов переписывает историю, не скрывая цену переписывания.'
    ),
    sections: [
      {
        id: 'git-ch2-s1',
        title: L('Branches are pointers', 'Ветки — это указатели'),
        body: L(
          'A branch is a movable pointer to a commit. Creating one writes a file, and switching to it updates HEAD and rewrites the working tree to match. That is the entire mechanism, and it explains why branching is cheap and why a repository holds hundreds of branches.\n\nThe modern commands are git switch and git switch -c, which replaced git checkout for branch work. git switch refuses to switch when the working tree has conflicting changes, which protects you from losing work, while git switch -f overwrites them, and that flag belongs only where the loss is intended. Branches are renamed with git branch -m, moved with git branch -f and deleted with git branch -d; -d refuses to delete an unmerged branch, and -D deletes it anyway.\n\nA branch name is a label that outlives the code it points to, so choose one that describes the work rather than the author. A name like feature/checkout-validation will help a reviewer six months later, while a name made of a ticket number alone forces everyone to open the tracker.\n\nOne important detail: a branch does not exist on the remote until it is pushed. Until then it lives only in the local repository, and a colleague cannot see it, no matter how many people work on the project.',
          'Ветка — это подвижный указатель на коммит. Создание пишет файл, переключение обновляет HEAD и переписывает рабочую директорию под целевой коммит. Это весь механизм, и этим объясняется, почему ветвление дёшево и почему репозиторий спокойно держит сотни веток.\n\nСовременные команды — git switch и git switch -c, пришедшие на смену git checkout в работе с ветками. git switch отказывается переключаться, если в рабочей директории есть конфликтующие изменения, и это защищает от потери работы, тогда как git switch -f перезаписывает их, и этот флаг уместен только там, где потеря задумана. Ветку переименовывают через git branch -m, переставляют через git branch -f и удаляют через git branch -d; форма -d отказывается удалять не слитую ветку, а -D удалит в любом случае.\n\nИмя ветки — это метка, которая переживёт свой код, поэтому стоит выбирать имя, описывающее работу, а не автора. feature/checkout-validation или fix/duplicate-invoice поможет ревьюеру через полгода, тогда как имя из одного номера тикета заставит всех открывать трекер, чтобы понять, что произошло.\n\nВажная деталь: ветки нет на сервере, пока её не отправили. До этого она живёт только в локальном репозитории, и коллега её не увидит, сколько бы людей ни работало над одним проектом.'
        ),
        bullets: [
          L('A branch is a file containing a hash, not a copy of the code.', 'Ветка — это файл с хешем, а не копия кода.'),
          L('git switch refuses to lose uncommitted changes.', 'git switch отказывается терять незакоммиченные изменения.'),
          L('-d refuses to delete an unmerged branch, -D does not care.', '-d отказывается удалять не слитую ветку, -D удаляет без вопросов.'),
          L('A branch exists on the remote only after a push.', 'Ветка появляется на сервере только после push.'),
        ],
        code: `# create and switch
git switch -c feature/checkout-validation
git switch main

# rename, move, delete
git branch -m feature/validation
git branch -f feature/validation main
git branch -d feature/validation
git branch -D feature/old-experiment

# see what tracks what
git branch -vv`,
        takeaway: L(
          'Branching is cheap because a branch is only a hash, and the only branch that matters for others is the one that was pushed.',
          'Ветвление дёшево, потому что ветка — это просто хеш, и важна для других только та ветка, которую отправили.'
        ),
      },
      {
        id: 'git-ch2-s2',
        title: L('Merge', 'Слияние'),
        body: L(
          'A merge takes two commits with a common ancestor and produces a commit that combines them. Git finds the best common ancestor by itself, and that ancestor matters: it is the point where the histories diverged, and the base of a three-way merge.\n\nIf the current branch is an ancestor of the branch being merged, Git creates no commit at all: it moves the branch pointer to the other commit, which is called a fast-forward. It keeps the history linear, but the merge is recorded nowhere. git merge --no-ff forces a merge commit even where a fast-forward is possible, and for a shared trunk that is the better default.\n\nA merge commit has two parents, so git log --graph draws it as a junction and git log --merges finds them specifically. Conflicts appear when both sides changed the same region in ways Git cannot combine automatically; Git writes conflict markers into the files, and the merge stays unfinished until they are resolved and committed.\n\nTo understand a conflict, look at the three versions of the file: the base, ours and theirs, available as git show :1:file, git show :2:file and git show :3:file. The resolved version goes into the working tree, git add marks it resolved, and git commit finishes the merge.',
          'Merge берёт два коммита с общим предком и создаёт коммит, объединяющий их. Лучшего общего предка Git находит сам, и этот предок важен: это точка расхождения двух историй и база трёхстороннего слияния. Каждая сторона описывает свои изменения относительно этой базы, и Git сохраняет изменение с одной стороны, если другая сторона те же строки не трогала.\n\nЕсли текущая ветка — предок сливаемой, коммит не создаётся вовсе: указатель ветки просто перемещается на чужой коммит. Это называется fast-forward. Он дёшев и оставляет историю линейной, но вместе с тем нигде не записывает сам факт слияния. git merge --no-ff создаёт merge-коммит даже там, где возможен fast-forward, и для общей основной ветки это обычно лучший вариант по умолчанию: так видно, что две линии работы сошлись.\n\nУ merge-коммита два родителя, поэтому git log --graph --oneline --all рисует его развилкой, а git log --merges находит именно merge-коммиты. Конфликт возникает, когда обе стороны меняли один и тот же участок так, что Git не смог их объединить автоматически; Git записывает маркеры конфликта в файлы, и слияние остаётся незавершённым, пока файлы не разрешены и не закоммичены.\n\nЧтобы понять конфликт, посмотрите на три версии файла: базу, нашу и их — они доступны как git show :1:file, git show :2:file и git show :3:file. Разрешённая версия попадает в рабочую директорию, git add помечает конфликт решённым, а git commit завершает слияние.'
        ),
        bullets: [
          L('The merge base is the point where the two histories diverged.', 'База слияния — это точка расхождения двух историй.'),
          L('A fast-forward moves the pointer and records no merge.', 'Fast-forward двигает указатель и не фиксирует сам факт слияния.'),
          L('A merge commit has two parents, which is what makes it a junction.', 'У merge-коммита два родителя — именно это делает его развилкой.'),
          L('A conflict leaves the merge unfinished until it is resolved and committed.', 'Конфликт оставляет слияние незавершённым, пока его не разрешат и не закоммитят.'),
        ],
        code: `# integrate another branch
git switch main
git merge feature/checkout-validation
git merge --no-ff feature/long-lived

# what the history looks like
git log --graph --oneline --all
git log --merges --oneline

# inside a conflict
git show :1:src/app.ts   # base
git show :2:src/app.ts   # ours
git show :3:src/app.ts   # theirs
git add src/app.ts
git commit`,
        takeaway: L(
          'Merging combines two histories without rewriting them, and a conflict is resolved by choosing between three versions of the file.',
          'Слияние объединяет две истории без переписывания, а конфликт решается выбором между тремя версиями файла.'
        ),
      },
      {
        id: 'git-ch2-s3',
        title: L('Rebase and conflicts', 'Перенос коммитов и конфликты'),
        body: L(
          'A rebase replays your commits on top of another branch: it takes each commit, computes its diff against its parent, and applies that diff to the new base. The commits receive new hashes, because their parents changed, but content and messages stay the same.\n\nThat linearity is the reason to rebase, and it also changes who owns the commits. A rebased commit is a new commit, so if the original was published, that history still exists on the remote, and the copy you pushed is a duplicate that conflicts with the rewritten one. The rule is simple: rebase commits that exist only on your machine, and merge commits that others already have.\n\ngit rebase -i origin/main opens the list of commits to replay, where they can be reordered, squashed or dropped. squash combines the messages and stops the editor, while fixup keeps only the first message. The same editor is where a commit is marked as reword, edit or squash, the same commands as git commit --amend, with the same rule: never reword a published commit.\n\nWhen a rebase hits a conflict, it stops in the middle of the replay. You resolve the file, run git add and then git rebase --continue; git rebase --skip drops the commit being applied, and git rebase --abort returns to the start.',
          'Rebase переносит ваши коммиты поверх другой ветки. Он берёт каждый коммит текущей ветки, вычисляет его разницу с родителем и применяет эту разницу к новой базе. Хеши коммитов меняются, потому что изменились родители, но содержимое и сообщения остаются прежними. Получается линейная история, будто работа сразу писалась поверх целевой ветки.\n\nИменно линейность — причина для rebase, и она же меняет владельца коммитов. Перебазированный коммит — новый коммит, поэтому если оригинал уже опубликован, опубликованная история никуда не денется, а отправленная копия станет дубликатом и будет конфликтовать с переписанной. Правило простое: rebase для коммитов, которые есть только на вашей машине, merge для тех, что уже есть у других.\n\ngit rebase -i origin/main открывает список переносимых коммитов, где их можно переставлять, объединять и выбрасывать. squash объединяет сообщения и останавливает редактор, а fixup оставляет только первое сообщение. В этом же редакторе коммит помечается как reword, edit или squash, и это те же команды, что у git commit --amend, с тем же правилом: не переписывать опубликованный коммит.\n\nКогда rebase натыкается на конфликт, процесс останавливается посреди переноса. Вы разрешаете файл, делаете git add и запускаете git rebase --continue; git rebase --skip пропускает переносимый коммит, а git rebase --abort возвращает к началу. Конфликты при rebase читаются тяжелее, потому что разница применяется к контексту, который уже сдвинулся.'
        ),
        bullets: [
          L('Rebase creates new commits with new hashes for the same changes.', 'Rebase создаёт новые коммиты с новыми хешами для тех же изменений.'),
          L('Rebase only what is local, merge what is already published.', 'Rebase для локального, merge для уже опубликованного.'),
          L('squash combines messages, fixup keeps the first one.', 'squash объединяет сообщения, fixup оставляет первое.'),
          L('A long chain of rebase conflicts means switching to merge.', 'Длинная череда конфликтов при rebase означает, что пора перейти на merge.'),
        ],
        code: `# replay local commits on top of the trunk
git fetch origin
git rebase origin/main

# interactive: reorder, squash, drop
git rebase -i origin/main

# inside a conflict during the replay
git status
git add src/app.ts
git rebase --continue
git rebase --skip
git rebase --abort

# the commits that were moved
git log --oneline origin/main..HEAD`,
        takeaway: L(
          'Rebase gives a clean linear history at the price of new hashes, so it belongs on unpublished commits only.',
          'Rebase даёт чистую линейную историю ценой новых хешей, поэтому применять его стоит только к неопубликованным коммитам.'
        ),
      },
    ],
  },
  {
    id: 'git-ch3',
    title: L('Undoing changes safely', 'Безопасная отмена изменений'),
    summary: L(
      'What each reset mode does, when to reach for revert, restore, stash and amend instead, and how the reflog brings back a commit that was already destroyed.',
      'Что делает каждый режим reset, когда вместо него нужны revert, restore, stash и amend, и как reflog возвращает уже уничтоженный коммит.'
    ),
    sections: [
      {
        id: 'git-ch3-s1',
        title: L('Reset and its three modes', 'Reset и его три режима'),
        body: L(
          'git reset moves HEAD. What happens to the index and working tree depends on the mode, and the three modes form a ladder from gentle to destructive. --soft moves only HEAD, so the changes stay staged, as you want after a wrong commit message. --mixed, the default, moves HEAD and resets the index to match it, leaving changes unstaged. --hard moves HEAD, resets the index and overwrites the working tree, discarding uncommitted changes.\n\nMost of the time you need no reset. git restore is the tool for undoing file changes, and it separates what reset conflates. git restore file discards the working tree changes and restores the file from the index, while git restore --staged file takes it out of the index and keeps its content.\n\nThe rule is to pick the tool by intent. To undo the last commit but keep the changes: git reset --soft HEAD~1, or git reset HEAD~1 to unstage them. To undo a pushed commit, use git revert, not reset. To undo file changes, use git restore. And git commit --amend replaces the last commit with a new one containing the current index: the way to fix a message or add a forgotten file, and dangerous for the same reason a rebase is, because the old commit disappears.',
          'git reset двигает HEAD. Что происходит с индексом и рабочей директорией, зависит от режима, и три режима стоит запомнить как лестницу от мягкого к разрушительному. --soft двигает только HEAD, и изменения остаются staged, — это нужно после коммита с неверным сообщением. --mixed, режим по умолчанию, двигает HEAD и сбрасывает индекс под него, так что изменения остаются в рабочей директории, но становятся unstaged. --hard двигает HEAD, сбрасывает индекс и перезаписывает рабочую директорию, уничтожая незакоммиченные изменения.\n\nЧаще всего reset не нужен. git restore — инструмент для отмены изменений в файлах, и он разделяет две вещи, которые reset смешивает. git restore file выбрасывает изменения рабочей директории и восстанавливает файл из индекса. git restore --staged file убирает файл из индекса, сохраняя содержимое в рабочей директории. С флагом --source файл восстанавливается из любого коммита.\n\nПравило — выбирать инструмент по намерению. Отменить последний коммит, сохранив изменения: git reset --soft HEAD~1, или git reset HEAD~1, если изменения нужны unstaged. Отменить отправленный коммит: reset делать нельзя, это перепишет опубликованную историю, используйте git revert. Отменить изменения в файле: git restore.\n\nСюда же относится git commit --amend: он заменяет последний коммит новым, содержащим текущий индекс. Это правильный способ исправить сообщение или добавить забытый файл, и он опасен по той же причине, что и rebase: старый коммит исчезает из ветки, а если он отправлен, следующий push потребует force.'
        ),
        bullets: [
          L('--soft keeps the changes staged, --mixed unstages them, --hard discards them.', '--soft оставляет изменения staged, --mixed снимает их с индекса, --hard выбрасывает.'),
          L('git restore moves files, git reset moves HEAD.', 'git restore двигает файлы, git reset двигает HEAD.'),
          L('Never reset a commit that was already pushed.', 'Никогда не делайте reset для уже отправленного коммита.'),
          L('amend is the right tool for a wrong message or a forgotten file.', 'amend — правильный инструмент для неверного сообщения или забытого файла.'),
        ],
        code: `# undo the last commit, keep the changes staged
git reset --soft HEAD~1

# undo the last commit, keep the changes in the working tree
git reset HEAD~1

# undo changes to one file
git restore src/app.ts
git restore --staged src/app.ts
git restore --source HEAD~1 src/app.ts

# fix the last commit
git add forgotten-file.ts
git commit --amend --no-edit`,
        takeaway: L(
          'Choose reset, restore or revert by intent: moving HEAD, moving files, or undoing something already published.',
          'Выбирайте reset, restore или revert по намерению: двигать HEAD, двигать файлы или отменять уже опубликованное.'
        ),
      },
      {
        id: 'git-ch3-s2',
        title: L('Revert, restore and stash', 'Revert, restore и stash'),
        body: L(
          'git revert creates a new commit that undoes the changes of an earlier commit. It is the safe way to undo something that already exists on the remote, because it adds history instead of rewriting it: nobody has to update their branch, and the record shows the change was backed out. git revert HEAD undoes the last commit, git revert a1b2c3d a specific one, and git revert a1b2c3d..HEAD a whole range.\n\ngit stash saves the working tree and the index and resets both, so you can switch branches with dirty files. git stash push -m wip names the entry, git stash list shows the stack, git stash pop applies the top entry and drops it, and git stash apply keeps it. A stash is a commit, so it survives a checkout and shows up in git log --all --reflog. It does not save untracked files unless the -u flag is added, and that omission is the classic reason people lose new files.\n\nRestore and stash are easy to confuse. Restore moves a file back to a known state: the index, HEAD or another commit. Stash moves the working state aside and brings it back later. If only one file changed, restore is enough; if the branch must change with uncommitted work in several files, stash is the tool.',
          'git revert создаёт новый коммит, отменяющий изменения более раннего коммита. Это безопасный способ отменить то, что уже есть на сервере, потому что он добавляет историю, а не переписывает её: никому не нужно обновлять ветку, и в записи видно, что изменение намеренно отозвали. git revert HEAD отменяет последний коммит, git revert a1b2c3d — конкретный, а git revert a1b2c3d..HEAD отменяет целый диапазон. Если отменяемые строки с тех пор изменились, Git не сможет применить отмену автоматически и попросит разрешить конфликт вручную.\n\ngit stash сохраняет текущее состояние рабочей директории и индекса и сбрасывает их, чтобы можно было переключить ветку с грязными файлами. git stash push -m wip подписывает запись, git stash list показывает стек, git stash pop применяет верхнюю запись и удаляет её, git stash apply применяет и оставляет, а git stash drop удаляет. Stash — это коммит, поэтому он переживает checkout и виден в git log --all --reflog. При этом untracked-файлы он не сохраняет без флага -u, и в этом классическая причина потери новых файлов.\n\nRestore и stash легко спутать. Restore возвращает файл в известное состояние — из индекса, из HEAD или из другого коммита. Stash убирает всё рабочее состояние в сторону и приносит его позже. Если изменён один файл, хватит restore; если ветку надо сменить с незакоммиченной работой в нескольких файлах, нужен stash.'
        ),
        bullets: [
          L('revert adds a commit, it does not rewrite the past.', 'revert добавляет коммит, а не переписывает прошлое.'),
          L('stash is safe for tracked files and silently skips untracked ones.', 'stash безопасен для отслеживаемых файлов и молча пропускает неотслеживаемые.'),
          L('pop applies and drops, apply applies and keeps.', 'pop применяет и удаляет, apply применяет и оставляет.'),
          L('For a single file, restore is enough and simpler than a stash.', 'Для одного файла restore проще и достаточен, stash не нужен.'),
        ],
        code: `# undo a published change
git revert a1b2c3d
git revert a1b2c3d..HEAD

# park the work in progress
git stash push -m wip
git stash push -u -m wip-with-untracked
git stash list
git stash show -p stash@{0}
git stash pop
git stash drop stash@{1}`,
        takeaway: L(
          'Use revert for anything already published, stash to park work in progress, and remember that stash ignores untracked files by default.',
          'Используйте revert для уже опубликованного, stash — чтобы припарковать текущую работу, и помните, что stash по умолчанию игнорирует новые файлы.'
        ),
      },
      {
        id: 'git-ch3-s3',
        title: L('The reflog as a safety net', 'Reflog как страховочная сетка'),
        body: L(
          'The reflog is the reason a Git accident is usually recoverable. Every time HEAD or a branch moves, Git appends a line with the old and the new hash. The log is local, survives rebase and reset, and is never pushed. git reflog shows the history of HEAD, and git reflog show feature the same for a branch.\n\nA typical recovery: you run git reset --hard, the branch points somewhere else, and the commit you wanted is gone from the branch but still in the object database. git reflog shows a line such as HEAD@{1}: moving to abc1234 before reset, and you bring it back with git reset --hard HEAD@{1} or, more safely, git branch rescue HEAD@{1}, which creates a branch there.\n\nA hard reset does not delete the objects immediately: it makes them unreachable, and Git keeps them for roughly two weeks before the garbage collector removes them. git fsck --lost-found finds dangling commits, and git fsck --no-reflogs --unreachable shows what nothing points at. The window is generous but not infinite: recover while you still remember.\n\nTwo habits reduce the need for this. Commit small and often, so a lost commit costs an hour, not a day. And write the branch name down before an experiment, because a named branch is as easy to recover as a hash.',
          'Reflog — причина, по которой аварию в Git обычно можно откатить. Каждый раз, когда двигается HEAD или ветка, Git дописывает строку со старым и новым хешем и тем, кто это сделал. Журнал локальный, он переживает rebase и reset и никогда не отправляется на сервер. git reflog показывает историю HEAD, а git reflog show feature — историю ветки.\n\nТипичное восстановление выглядит так. Вы выполнили git reset --hard, ветка теперь указывает в другое место, и нужный коммит пропал из ветки, но остался в базе объектов. git reflog показывает строку вида HEAD@{1}: moving to abc1234 before reset, и вы возвращаете коммит через git reset --hard HEAD@{1} или, безопаснее, через git branch rescue HEAD@{1}, которая создаёт новую ветку на этом коммите и не трогает текущую.\n\nreset --hard не удаляет объекты сразу: он делает их недостижимыми, а Git держит недостижимые объекты примерно две недели до того, как сборщик мусора их удалит. git fsck --lost-found находит висящие коммиты, а git fsck --no-reflogs --unreachable показывает то, на что вообще никто не ссылается. Окно щедрое, но не бесконечное, поэтому восстанавливайтесь, пока помните.\n\nДве привычки уменьшают потребность во всём этом. Коммитьте часто и мелко, чтобы потерянный коммит стоил потерянного часа, а не дня. И записывайте имя ветки перед экспериментом: именованная ветка восстанавливается так же легко, как хеш, а запомнить её намного проще.'
        ),
        bullets: [
          L('The reflog records every move of HEAD and of every branch.', 'Reflog записывает каждое перемещение HEAD и каждой ветки.'),
          L('A hard reset makes commits unreachable, not deleted.', 'Hard reset делает коммиты недостижимыми, а не удаляет их.'),
          L('git branch rescue creates a branch at a lost commit.', 'git branch rescue создаёт ветку на потерянном коммите.'),
          L('Small frequent commits shrink the cost of every accident.', 'Частые мелкие коммиты уменьшают цену каждой аварии.'),
        ],
        code: `# where did my branch go
git reflog
git reflog show main

# bring the commit back
git branch rescue HEAD@{2}
git reset --hard HEAD@{2}

# find what nothing points at
git fsck --lost-found
git fsck --no-reflogs --unreachable`,
        takeaway: L(
          'A hard reset destroys a branch pointer, not the commit, and the reflog holds the pointer for about two more weeks.',
          'Hard reset уничтожает указатель ветки, а не коммит, и reflog держит этот указатель ещё около двух недель.'
        ),
      },
    ],
  },
  {
    id: 'git-ch4',
    title: L('Collaboration and releases', 'Совместная работа и релизы'),
    summary: L(
      'How remotes, fetch and pull strategies fit together, how a pull request and a merge policy produce a readable history, and how hooks, worktrees and CI close the loop.',
      'Как устроены remote, fetch и стратегии pull, как pull request и политика слияния дают читаемую историю и как хуки, worktree и CI замыкают круг.'
    ),
    sections: [
      {
        id: 'git-ch4-s1',
        title: L('Remotes and pull strategies', 'Remote и стратегии pull'),
        body: L(
          'A remote is a named URL stored in .git/config. git remote -v shows them, git remote add origin URL adds one, and git branch -vv shows which upstream each branch tracks. The two commands to remember are fetch, which downloads objects and updates the remote-tracking branches without touching your files, and push, which sends local commits to a remote branch.\n\nPull is fetch plus an integration step, and that step is where opinions live. git pull --rebase takes your local commits and replays them on top of what was fetched, keeping the history linear. git pull --merge creates a merge commit when both sides moved. git pull --ff-only refuses to integrate unless a fast-forward is possible, turning a divergence into a clear error rather than a surprise merge commit.\n\nA push fails when the remote has commits you do not have. That rejection is a feature, and the right reaction is to fetch and integrate, not to force. If something already pushed must be rewritten, use git push --force-with-lease instead of --force: the lease checks that the remote is still where you expect it, so it refuses to overwrite work that arrived meanwhile.\n\nCredentials come from a credential helper, an SSH key or a token, and belong in the helper or the environment, never in the repository.',
          'Remote — именованный URL, хранящийся в .git/config. git remote -v показывает их, git remote add origin URL добавляет, а git branch -vv показывает, какой upstream отслеживает каждая ветка. Две команды, которые стоит запомнить, — fetch, загружающая объекты и обновляющая отслеживающие ветки без трогания рабочей директории, и push, отправляющая локальные коммиты на сервер.\n\nPull — это fetch плюс шаг интеграции, и именно на нём расходятся мнения. git pull --rebase берёт ваши локальные коммиты и переносит их поверх полученного, сохраняя историю линейной. git pull --merge создаёт merge-коммит, если сдвинулись обе стороны. git pull --ff-only отказывается интегрировать вовсе, если fast-forward невозможен, и превращает расхождение в понятную ошибку вместо неожиданного merge-коммита. Значение по умолчанию задаётся через git config --global pull.rebase true, а указать выбор прямо в команде лучше.\n\nPush отклоняется, если на сервере есть коммиты, которых нет у вас. Это отклонение — полезная защита, и правильная реакция — fetch и интеграция, а вовсе не force. Если переписать уже отправленное всё же нужно, используйте git push --force-with-lease вместо --force: lease проверяет, что сервер там, где вы ожидали, и не даст затереть чужую работу, пришедшую за это время. Обычный --force способен её уничтожить молча.\n\nУчётные данные берёт credential helper, SSH-ключ или токен, и им место в helper-е или в окружении, но не в репозитории. HTTPS с токеном проще настроить, SSH — проще использовать, когда ключ есть.'
        ),
        bullets: [
          L('fetch updates remote-tracking branches and never touches your files.', 'fetch обновляет отслеживающие ветки и никогда не трогает ваши файлы.'),
          L('Pull is fetch plus an integration step, and the integration step is a choice.', 'Pull — это fetch плюс шаг интеграции, а шаг интеграции — это выбор.'),
          L('A rejected push is a safety net, not an obstacle.', 'Отклонённый push — это страховка, а не препятствие.'),
          L('force-with-lease refuses to overwrite work that arrived meanwhile.', 'force-with-lease не даёт затереть чужую работу, пришедшую за это время.'),
        ],
        code: `# configure and inspect
git remote add origin git@github.com:team/app.git
git remote -v
git branch -vv

# integrate
git fetch origin
git pull --ff-only
git pull --rebase
git merge origin/main

# publish
git push -u origin feature/checkout-validation
git push --force-with-lease origin feature/checkout-validation`,
        takeaway: L(
          'Fetch first, choose the integration explicitly, and never force-push over work that somebody else pushed meanwhile.',
          'Сначала fetch, явно выбирайте способ интеграции и никогда не форсите поверх чужой работы.'
        ),
      },
      {
        id: 'git-ch4-s2',
        title: L('Pull requests and releases', 'Pull request и релизы'),
        body: L(
          'A pull request is a server-side object that asks for one branch to be merged into another, with a description, reviewers and a set of checks. The flow that works is simple: branch from the trunk, make the change in a few commits that each do one thing, push the branch, open the pull request, respond to the review, and merge when the checks pass.\n\nHow the branch lands matters more than it seems. A merge commit keeps every commit and shows the branch as a unit, a squash merge folds it into one commit and loses the individual steps, and a rebase merge replays the commits and loses the original hashes. Pick one policy for the whole repository, write it down and enforce it in the merge button, because a mixed history is harder to read than either extreme.\n\nReleases are marked with tags. An annotated tag carries an author, a date and a message, and it records why the version exists, while a lightweight tag is only a pointer. git tag -a v1.4.0 -m release creates it, git push origin --tags sends it, and git describe --tags finds the nearest tag from any commit. Version numbers follow semantic versioning, and the tag must agree with the version in package.json.',
          'Pull request — объект на стороне сервера, который просит влить одну ветку в другую, вместе с описанием, ревьюерами и проверками. Рабочая схема проста: ветка от основной линии, изменение в нескольких коммитах, каждый из которых делает одну вещь, push ветки, открытие pull request, работа с замечаниями и merge после зелёных проверок.\n\nКак ветка попадает в основную линию, важнее, чем кажется. Merge-коммит сохраняет все коммиты и показывает ветку как единое целое. Squash-merge сворачивает ветку в один коммит, история получается чистой и линейной, но отдельные шаги теряются. Rebase-merge переносит коммиты и теряет исходные хеши. Выберите одну политику для репозитория, запишите её и включите в кнопке merge: смешанная история читается хуже любого из вариантов.\n\nРелизы отмечают тегами. Лёгкий тег — просто указатель, аннотированный — объект с автором, датой и сообщением, и именно аннотированный нужен для релиза, потому что он фиксирует, зачем версия существует. git tag -a v1.4.0 -m release создаёт тег, git push origin --tags отправляет его, а git describe --tags находит ближайший тег. Если помечен неверный коммит, удалите тег и помечайте заново: историю это не изменит, а тег — вполне.\n\nНомера версий следуют семантической версионизации: мажорная меняется при несовместимых изменениях, минорная — при добавлении функциональности, патч — при исправлении бага. Тег и версия в package.json должны совпадать, а скрипт релиза, который это проверяет, защищает от ошибки деплоя, когда тег и артефакт расходятся.'
        ),
        bullets: [
          L('One commit, one purpose, and a description that explains the why.', 'Один коммит — одна цель, и описание, объясняющее зачем.'),
          L('Choose one merge policy for the whole repository and write it down.', 'Выберите одну политику слияния для всего репозитория и запишите её.'),
          L('Annotated tags carry the reason for a release, lightweight tags do not.', 'Аннотированные теги хранят причину релиза, лёгкие — нет.'),
          L('The tag and the version in package.json must agree.', 'Тег и версия в package.json должны совпадать.'),
        ],
        code: `# tag a release
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin --tags
git describe --tags --always

# fix a wrong tag
git tag -d v1.4.0
git push origin --delete v1.4.0
git tag -a v1.4.0 -m "Release 1.4.0" HEAD~1
git push origin --tags

# the merge policy for the whole repository
git config --global merge.ff false`,
        takeaway: L(
          'A readable history comes from one merge policy and one tag per release, and both have to be enforced, not agreed.',
          'Читаемая история получается из одной политики слияния и одного тега на релиз, и то и другое надо закреплять, а не договариваться.'
        ),
      },
      {
        id: 'git-ch4-s3',
        title: L('Hooks, worktrees and CI', 'Хуки, worktree и CI'),
        body: L(
          'A hook is a script Git runs at a defined point: pre-commit before a commit, commit-msg to validate the message, pre-push before pushing, post-merge after a merge. Hooks live in .git/hooks and are not tracked by Git, so teams keep them in a shared place and install them from there. Husky does this for Node projects.\n\nA pre-commit hook that runs the formatter and the linter turns a five-minute CI failure into a two-second local one. The trade-off is speed: a hook slower than a second or two feels like a punishment, and developers look for ways around it with --no-verify. Keep the hooks fast and leave the slow checks to CI.\n\ngit worktree lets you check out several branches at once, each in its own directory, over one shared object database. It replaces the stash-and-switch dance when you must run the old version against a bug report while fixing it, and lets a long-running dev server keep running in one directory while you switch branches in another.\n\nContinuous integration runs the build and the tests for every push on a clean machine, so the answer to whether it still works is the same for everyone. A good pipeline is fast, fails on real problems rather than on flaky tests, and gates the merge: no green checks, no merge.',
          'Хук — скрипт, который Git запускает в определённый момент: pre-commit перед созданием коммита, commit-msg для проверки сообщения, pre-push перед отправкой, post-merge после слияния. Хуки лежат в .git/hooks и не отслеживаются Git, поэтому команды хранят их в общем месте и ставят оттуда. Husky делает это для Node-проектов: скрипт prepare указывает на общую директорию хуков, и после npm install они уже включены.\n\nХуки — самое дешёвое место, чтобы заставить правило, которое иначе поймали бы позже. pre-commit-хук с форматтером и линтером превращает пятиминутный сбой CI в двухсекундный локальный. Плата — скорость: хук дольше секунды-двух ощущается как наказание, и разработчики ищут обход через --no-verify. Держите хуки быстрыми, а медленные проверки оставьте CI.\n\ngit worktree позволяет держать несколько веток одновременно, каждую в своей директории, поверх одного общего хранилища объектов. Это заменяет танец со stash и переключением, когда нужно запустить старую версию против бага, работая над фиксом, и позволяет dev-серверу работать в одной директории, пока вы переключаете ветки в другой. git worktree add ../hotfix hotfix/urgent создаёт рабочее дерево.\n\nНепрерывная интеграция запускает сборку и тесты при каждом push на чистой машине, так что ответ на вопрос «работает ли ещё» у всех одинаковый. Хороший конвейер быстрый, падает по настоящим проблемам, а не по нестабильным тестам, и блокирует merge: нет зелёных проверок — нет слияния.'
        ),
        bullets: [
          L('Hooks are local and untracked, so they must be installed from a shared source.', 'Хуки локальны и не отслеживаются, поэтому их ставят из общего источника.'),
          L('A hook slower than a couple of seconds gets bypassed with --no-verify.', 'Хук дольше пары секунд обходят через --no-verify.'),
          L('Worktrees give several branches at once over one object database.', 'Worktree дают несколько веток сразу поверх одного хранилища объектов.'),
          L('CI is the gate: the merge waits for green checks.', 'CI — это шлюз: слияние ждёт зелёных проверок.'),
        ],
        code: `# a local hook that catches problems early
cat .git/hooks/pre-commit
#!/bin/sh
npm run lint && npm run format:check

# shared hooks, installed on clone
# package.json
"prepare": "husky install"

# several branches at once
git worktree add ../hotfix hotfix/urgent
git worktree list
git worktree remove ../hotfix

# the pipeline gates the merge
# .github/workflows/ci.yml
# on: pull_request
# jobs: lint, test, build`,
        takeaway: L(
          'Fast hooks for local feedback, worktrees for parallel work, and CI as the only gate that everybody trusts.',
          'Быстрые хуки для локальной обратной связи, worktree для параллельной работы и CI как единственный шлюз, которому все доверяют.'
        ),
      },
    ],
  },
];
