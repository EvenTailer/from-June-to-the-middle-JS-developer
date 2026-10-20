import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitModule: Module = {
  id: 'git',
  title: L('Git', 'Git'),
  description: L('Version control essentials.', 'Основы системы контроля версий.'),
  lessons: [
    { id: 'git-001', title: L('Repository init', 'Инициализация репозитория'), question: L('How to create a new Git repository?', 'Как создать новый Git-репозиторий?'), answer: L('Run git init in the project directory. It creates .git metadata and starts tracking.', 'Выполните git init в каталоге проекта. Команда создаёт метаданные .git и начинает отслеживание.'), code: 'git init' },
    { id: 'git-002', title: L('Clone repository', 'Клонирование репозитория'), question: L('How to copy a remote repository locally?', 'Как скопировать удалённый репозиторий локально?'), answer: L('Use git clone <url>. It downloads history, branches, and sets origin.', 'Используйте git clone <url>. Команда скачивает историю, ветки и настраивает origin.'), code: 'git clone https://example.com/repo.git' },
    { id: 'git-003', title: L('Repository status', 'Статус репозитория'), question: L('How to inspect working tree state?', 'Как проверить состояние рабочего дерева?'), answer: L('git status shows staged, unstaged, and untracked changes.', 'git status показывает подготовленные, неподготовленные и неотслеживаемые изменения.'), code: 'git status' },
    { id: 'git-004', title: L('Stage changes', 'Подготовка изменений'), question: L('How to stage files for commit?', 'Как подготовить файлы к коммиту?'), answer: L('Use git add <file> or git add . to stage selected or all changes.', 'Используйте git add <file> или git add . для подготовки выбранных или всех изменений.'), code: 'git add src/app.ts\ngit add .' },
    { id: 'git-005', title: L('Commit snapshot', 'Коммит снимка'), question: L('How to save a staged snapshot?', 'Как сохранить подготовленный снимок?'), answer: L('Run git commit -m "message". Each commit stores a full project snapshot.', 'Выполните git commit -m "message". Каждый коммит хранит полный снимок проекта.'), code: 'git commit -m "feat: add login form"' },
    { id: 'git-006', title: L('Amend commit', 'Исправление коммита'), question: L('How to modify the last commit?', 'Как изменить последний коммит?'), answer: L('Use git commit --amend. It rewrites the last commit; avoid on pushed shared history.', 'Используйте git commit --amend. Команда переписывает последний коммит; избегайте на опубликованной общей истории.'), code: 'git commit --amend --no-edit' },
    { id: 'git-007', title: L('Commit history', 'История коммитов'), question: L('How to view commit history?', 'Как просмотреть историю коммитов?'), answer: L('git log shows commits. Use --oneline --graph --decorate for compact graph.', 'git log показывает коммиты. Используйте --oneline --graph --decorate для компактного графа.'), code: 'git log --oneline --graph --decorate --all' },
    { id: 'git-008', title: L('Working diff', 'Diff рабочего дерева'), question: L('How to see unstaged changes?', 'Как увидеть неподготовленные изменения?'), answer: L('git diff compares working tree to index.', 'git diff сравнивает рабочее дерево с индексом.'), code: 'git diff' },
    { id: 'git-009', title: L('List branches', 'Список веток'), question: L('How to list branches?', 'Как вывести список веток?'), answer: L('git branch lists local branches; -a includes remotes.', 'git branch выводит локальные ветки; -a включает удалённые.'), code: 'git branch -a' },
    { id: 'git-010', title: L('Create branch', 'Создание ветки'), question: L('How to create a branch?', 'Как создать ветку?'), answer: L('Use git branch <name> or git switch -c <name>.', 'Используйте git branch <name> или git switch -c <name>.'), code: 'git switch -c feature/login' },
    { id: 'git-011', title: L('Switch branch', 'Переключение ветки'), question: L('How to switch branches safely?', 'Как безопасно переключать ветки?'), answer: L('Use git switch <branch>. It is clearer than checkout for branch switching.', 'Используйте git switch <branch>. Команда понятнее checkout для переключения веток.'), code: 'git switch main' },
    { id: 'git-012', title: L('Checkout legacy', 'Устаревший checkout'), question: L('What does git checkout do?', 'Что делает git checkout?'), answer: L('It can switch branches or restore files. Prefer switch and restore in modern Git.', 'Команда может переключать ветки или восстанавливать файлы. В современном Git предпочтительны switch и restore.'), code: 'git checkout main' },
    { id: 'git-013', title: L('Delete branch', 'Удаление ветки'), question: L('How to delete a branch?', 'Как удалить ветку?'), answer: L('Use git branch -d <name> for merged branches; -D forces deletion.', 'Используйте git branch -d <name> для слитых веток; -D принудительно удаляет.'), code: 'git branch -d feature/login\ngit branch -D old-experiment' },
    { id: 'git-014', title: L('Merge branch', 'Слияние веток'), question: L('How to merge a branch into current branch?', 'Как влить ветку в текущую?'), answer: L('Run git merge <branch>. Git creates merge commit unless fast-forward is possible.', 'Выполните git merge <branch>. Git создаёт merge-коммит, если не возможен fast-forward.'), code: 'git merge feature/login' },
    { id: 'git-015', title: L('Fast-forward merge', 'Fast-forward слияние'), question: L('What is a fast-forward merge?', 'Что такое fast-forward слияние?'), answer: L('Branch pointer moves forward without a merge commit when history is linear.', 'Указатель ветки сдвигается вперёд без merge-коммита, когда история линейна.'), code: 'git merge --ff-only feature/login' },
    { id: 'git-016', title: L('No-ff merge', 'Слияние без fast-forward'), question: L('Why use --no-ff?', 'Зачем использовать --no-ff?'), answer: L('It always creates a merge commit, preserving branch topology.', 'Команда всегда создаёт merge-коммит, сохраняя топологию ветки.'), code: 'git merge --no-ff feature/login' },
    { id: 'git-017', title: L('Squash merge', 'Squash-слияние'), question: L('What is squash merge?', 'Что такое squash-слияние?'), answer: L('It combines branch changes into one commit on target branch.', 'Команда объединяет изменения ветки в один коммит в целевой ветке.'), code: 'git merge --squash feature/login' },
    { id: 'git-018', title: L('Merge conflict markers', 'Маркеры конфликта'), question: L('What do conflict markers look like?', 'Как выглядят маркеры конфликта?'), answer: L('Files contain <<<<<<<, =======, and >>>>>>> sections requiring manual resolution.', 'Файлы содержат секции <<<<<<<, ======= и >>>>>>>, требующие ручного разрешения.'), code: '<<<<<<< HEAD\nours\n=======\ntheirs\n>>>>>>> feature' },
    { id: 'git-019', title: L('Rebase basics', 'Основы rebase'), question: L('What does git rebase do?', 'Что делает git rebase?'), answer: L('It replays commits onto another base, creating linear history.', 'Команда переносит коммиты на другую базу, создавая линейную историю.'), code: 'git rebase main' },
    { id: 'git-020', title: L('Interactive rebase', 'Интерактивный rebase'), question: L('How to clean history interactively?', 'Как интерактивно очистить историю?'), answer: L('Run git rebase -i HEAD~n. You can squash, reword, edit, drop, or reorder commits.', 'Выполните git rebase -i HEAD~n. Можно объединять, переименовывать, редактировать, удалять и менять порядок коммитов.'), code: 'git rebase -i HEAD~5' },
    { id: 'git-021', title: L('Reset soft', 'Мягкий reset'), question: L('What does git reset --soft do?', 'Что делает git reset --soft?'), answer: L('Moves HEAD but keeps index and working tree; changes remain staged.', 'Сдвигает HEAD, но сохраняет индекс и рабочее дерево; изменения остаются подготовленными.'), code: 'git reset --soft HEAD~1' },
    { id: 'git-022', title: L('Reset mixed', 'Смешанный reset'), question: L('What does git reset --mixed do?', 'Что делает git reset --mixed?'), answer: L('Default reset: moves HEAD and resets index, keeps working tree changes unstaged.', 'Reset по умолчанию: сдвигает HEAD и сбрасывает индекс, сохраняя изменения рабочего дерева неподготовленными.'), code: 'git reset HEAD~1' },
    { id: 'git-023', title: L('Reset hard', 'Жёсткий reset'), question: L('What does git reset --hard do?', 'Что делает git reset --hard?'), answer: L('Moves HEAD, resets index and working tree. Discards uncommitted changes.', 'Сдвигает HEAD, сбрасывает индекс и рабочее дерево. Удаляет незакоммиченные изменения.'), code: 'git reset --hard HEAD~1' },
    { id: 'git-024', title: L('Reset path', 'Reset по пути'), question: L('How to unstage a file?', 'Как убрать файл из индекса?'), answer: L('Use git reset <path> or git restore --staged <path>.', 'Используйте git reset <path> или git restore --staged <path>.'), code: 'git restore --staged src/app.ts' },
    { id: 'git-025', title: L('Revert commit', 'Откат коммита'), question: L('How to safely undo a published commit?', 'Как безопасно отменить опубликованный коммит?'), answer: L('Use git revert <commit>. It creates a new commit that undoes changes.', 'Используйте git revert <commit>. Команда создаёт новый коммит, отменяющий изменения.'), code: 'git revert abc1234' },
    { id: 'git-026', title: L('Cherry-pick', 'Cherry-pick'), question: L('How to apply one commit to current branch?', 'Как применить один коммит к текущей ветке?'), answer: L('Run git cherry-pick <commit>. It recreates the commit on current branch.', 'Выполните git cherry-pick <commit>. Команда воссоздаёт коммит в текущей ветке.'), code: 'git cherry-pick abc1234' },
    { id: 'git-027', title: L('Stash changes', 'Сохранение изменений в stash'), question: L('How to temporarily store uncommitted changes?', 'Как временно сохранить незакоммиченные изменения?'), answer: L('Run git stash. It saves tracked modifications and cleans working tree.', 'Выполните git stash. Команда сохраняет изменения отслеживаемых файлов и очищает рабочее дерево.'), code: 'git stash' },
    { id: 'git-028', title: L('List stash', 'Список stash'), question: L('How to list stashes?', 'Как вывести список stash?'), answer: L('Run git stash list.', 'Выполните git stash list.'), code: 'git stash list' },
    { id: 'git-029', title: L('Pop stash', 'Извлечение stash'), question: L('How to apply and remove stash?', 'Как применить и удалить stash?'), answer: L('Use git stash pop.', 'Используйте git stash pop.'), code: 'git stash pop' },
    { id: 'git-030', title: L('Remote list', 'Список remote'), question: L('How to view remotes?', 'Как просмотреть remote?'), answer: L('Run git remote -v.', 'Выполните git remote -v.'), code: 'git remote -v' },
    { id: 'git-031', title: L('Fetch', 'Fetch'), question: L('What does git fetch do?', 'Что делает git fetch?'), answer: L('Downloads objects and refs from remote without merging.', 'Скачивает объекты и ссылки с remote без слияния.'), code: 'git fetch origin' },
    { id: 'git-032', title: L('Pull', 'Pull'), question: L('What does git pull do?', 'Что делает git pull?'), answer: L('Runs fetch then merge (or rebase with --rebase) into current branch.', 'Выполняет fetch, затем merge (или rebase с --rebase) в текущую ветку.'), code: 'git pull origin main' },
    { id: 'git-033', title: L('Push', 'Push'), question: L('How to upload commits to remote?', 'Как отправить коммиты на remote?'), answer: L('Run git push <remote> <branch>.', 'Выполните git push <remote> <branch>.'), code: 'git push origin main' },
    { id: 'git-034', title: L('Force push safe', 'Безопасный force push'), question: L('How to force push safely?', 'Как безопасно выполнить force push?'), answer: L('Use git push --force-with-lease to avoid overwriting others work.', 'Используйте git push --force-with-lease, чтобы не перезаписать чужую работу.'), code: 'git push --force-with-lease origin feature/login' },
    { id: 'git-035', title: L('Tags', 'Теги'), question: L('How to create a lightweight tag?', 'Как создать лёгкий тег?'), answer: L('Run git tag <name>.', 'Выполните git tag <name>.'), code: 'git tag v1.0.0' },
    { id: 'git-036', title: L('Annotated tag', 'Аннотированный тег'), question: L('How to create annotated tag?', 'Как создать аннотированный тег?'), answer: L('Use git tag -a <name> -m "message". Annotated tags store metadata.', 'Используйте git tag -a <name> -m "message". Аннотированные теги хранят метаданные.'), code: 'git tag -a v1.0.0 -m "release 1.0.0"' },
    { id: 'git-037', title: L('Bisect', 'Bisect'), question: L('How to find commit that introduced a bug?', 'Как найти коммит, внесший баг?'), answer: L('Use git bisect start, mark bad/good commits, and test revisions.', 'Используйте git bisect start, отметьте плохие/хорошие коммиты и тестируйте ревизии.'), code: 'git bisect start\ngit bisect bad\ngit bisect good v1.0.0' },
    { id: 'git-038', title: L('Reflog', 'Reflog'), question: L('What is reflog?', 'Что такое reflog?'), answer: L('Reflog records local HEAD movements and can recover lost commits.', 'Reflog записывает локальные перемещения HEAD и помогает восстановить потерянные коммиты.'), code: 'git reflog' },
    { id: 'git-039', title: L('Git hooks', 'Git hooks'), question: L('What are Git hooks?', 'Что такое Git hooks?'), answer: L('Scripts in .git/hooks triggered by Git events.', 'Скрипты в .git/hooks, запускаемые событиями Git.'), code: 'ls .git/hooks' },
    { id: 'git-040', title: L('Commit-msg hook', 'Commit-msg hook'), question: L('What can commit-msg hook do?', 'Что может делать commit-msg hook?'), answer: L('Validate commit message format.', 'Проверяет формат сообщения коммита.'), code: 'cat .git/hooks/commit-msg' },
    { id: 'git-041', title: L('Git LFS track', 'Git LFS track'), question: L('How to track large files with LFS?', 'Как отслеживать большие файлы через LFS?'), answer: L('Use git lfs track "*.psd" and commit .gitattributes.', 'Используйте git lfs track "*.psd" и закоммитьте .gitattributes.'), code: 'git lfs track "*.psd"' },
    { id: 'git-042', title: L('Git ignore', 'Git ignore'), question: L('How to ignore files?', 'Как игнорировать файлы?'), answer: L('Add patterns to .gitignore.', 'Добавьте шаблоны в .gitignore.'), code: 'echo node_modules/ >> .gitignore' },
    { id: 'git-043', title: L('Clean', 'Clean'), question: L('How to remove untracked files?', 'Как удалить неотслеживаемые файлы?'), answer: L('Use git clean -fd. Add -n first for dry run.', 'Используйте git clean -fd. Сначала добавьте -n для пробного запуска.'), code: 'git clean -nfd\ngit clean -fd' },
    { id: 'git-044', title: L('Restore file', 'Восстановление файла'), question: L('How to discard changes in one file?', 'Как отменить изменения в одном файле?'), answer: L('Use git restore <file> or git checkout -- <file>.', 'Используйте git restore <file> или git checkout -- <file>.'), code: 'git restore src/app.ts' },
    { id: 'git-045', title: L('Config user', 'Настройка пользователя'), question: L('How to set commit author identity?', 'Как настроить идентичность автора коммита?'), answer: L('Set user.name and user.email globally or per repository.', 'Установите user.name и user.email глобально или для репозитория.'), code: 'git config user.name "Your Name"\ngit config user.email "you@example.com"' },

  ],
  quiz: [
    {
      id: 'git-q01',
      question: L('What does git init create inside an existing project folder?', 'Что создаёт git init в существующей папке проекта?'),
      options: [
        L('A first commit with every file in the folder', 'Первый коммит со всеми файлами из папки'),
        L('A remote repository on the hosting service', 'Удалённый репозиторий на хостинге'),
        L('A .git directory that holds the history, objects and configuration', 'Каталог .git, где хранятся история, объекты и конфигурация'),
        L('A branch called main with a tracking entry for origin', 'Ветку main с отслеживающей записью для origin'),
      ],
      correctIndex: 2,
      explanation: L(
        'git init only creates the .git metadata directory and points HEAD at a branch that does not exist yet; nothing is committed and no remote appears on its own. The first commit happens when you run git commit, and a remote is configured with git remote add.',
        'git init создаёт только каталог метаданных .git и указывает HEAD на ещё не родившуюся ветку; ничего не коммитится, а remote сам по себе не появляется. Первый коммит сделает git commit, а remote настраивается через git remote add.'
      ),
    },
    {
      id: 'git-q02',
      question: L('After git clone https://example.com/repo.git, what is set up automatically?', 'После git clone https://example.com/repo.git что настраивается автоматически?'),
      options: [
        L('The origin remote pointing at that URL, with the history and the default branch checked out', 'Remote origin с этим URL, вся история и ветка по умолчанию, выставленная в рабочем дереве'),
        L('A local branch for every branch of the remote repository', 'Локальная ветка для каждой ветки удалённого репозитория'),
        L('A remote-tracking branch for each tag of the remote', 'Отслеживающая ветка для каждого тега на remote'),
        L('The credentials for your hosting account in the local config', 'Учётные данные вашего аккаунта в локальной конфигурации'),
      ],
      correctIndex: 0,
      explanation: L(
        'A clone copies the objects, creates the remote named origin with that URL and checks out the default branch together with its remote-tracking counterpart. It does not create local branches for every remote branch, tags are copied but do not become branches, and credentials are handled by the credential helper.',
        'Клонирование копирует объекты, создаёт remote с именем origin и этим URL и выставляет ветку по умолчанию вместе с её отслеживающей копией. Локальные ветки для всех веток remote не создаются, теги копируются, но ветками не становятся, а учётные данные берёт credential helper.'
      ),
    },
    {
      id: 'git-q03',
      question: L('Which three states does git status distinguish in the working tree?', 'Какие три состояния различает git status в рабочем дереве?'),
      options: [
        L('Clean, modified and staged', 'Чистое, изменённое и подготовленное'),
        L('Staged, unstaged and untracked', 'Подготовленное, неподготовленное и неотслеживаемое'),
        L('Committed, pushed and merged', 'Закоммиченное, отправленное и слитое'),
        L('Tracked, ignored and untracked', 'Отслеживаемое, игнорируемое и неотслеживаемое'),
      ],
      correctIndex: 1,
      explanation: L(
        'git status separates changes that are staged in the index, changes in the working tree that are not staged yet, and files Git does not track at all. The first option mixes a repository state with the two change states, and ignored files are deliberately hidden from the output.',
        'git status различает изменения, помещённые в индекс, изменения в рабочем дереве, ещё не подготовленные, и файлы, которые Git вообще не отслеживает. Первый вариант смешивает состояние репозитория с двумя состояниями изменений, а игнорируемые файлы намеренно скрыты из вывода.'
      ),
    },
    {
      id: 'git-q04',
      question: L('What does git add <file> actually do?', 'Что на самом деле делает git add <file>?'),
      options: [
        L('It commits the file with a message taken from the file name', 'Коммитит файл с сообщением, взятым из имени файла'),
        L('It uploads the file to the remote repository', 'Отправляет файл в удалённый репозиторий'),
        L('It marks the file as ignored for future commits', 'Помечает файл как игнорируемый для будущих коммитов'),
        L('It copies the current content of the file into the index, staging that version for the next commit', 'Копирует текущее содержимое файла в индекс, готовя именно эту версию к следующему коммиту'),
      ],
      correctIndex: 3,
      explanation: L(
        'git add snapshots the current content of a file into the index, and the next commit records that snapshot. It does not commit or push anything, and ignoring files is done through .gitignore, not through git add.',
        'git add кладёт текущее содержимое файла в индекс, и следующий коммит фиксирует именно этот снимок. Ничего он не коммитит и не отправляет, а игнорирование задаётся через .gitignore, а не через git add.'
      ),
    },
    {
      id: 'git-q05',
      question: L('What does a commit actually store?', 'Что на самом деле хранит коммит?'),
      options: [
        L('A compressed diff against the previous commit', 'Сжатый дифф относительно предыдущего коммита'),
        L('A list of the files that changed, without their content', 'Список изменившихся файлов без их содержимого'),
        L('A full snapshot of the project, with a pointer to the parent commit and metadata', 'Полный снимок проекта, указатель на родительский коммит и метаданные'),
        L('Only the staged files, leaving the rest of the tree untouched', 'Только подготовленные файлы, а остальное дерево не трогается'),
      ],
      correctIndex: 2,
      explanation: L(
        'A commit points to a tree object that records the complete state of the project, plus a parent pointer, an author and a message. Git stores this efficiently by reusing unchanged blobs, so the model is snapshots, not diffs. A commit is not limited to the staged files: it captures the whole tree.',
        'Коммит указывает на tree-объект с полным состоянием проекта, а также на родителя, автора и сообщение. Git хранит это экономно, переиспользуя неизменённые блобы, то есть модель — снимки, а не диффы. И коммит не ограничен подготовленными файлами: он фиксирует всё дерево.'
      ),
    },
    {
      id: 'git-q06',
      question: L('What does git commit -a stage, and what does it ignore?', 'Что подготавливает git commit -a и что игнорирует?'),
      options: [
        L('It stages modifications and deletions of tracked files, but leaves untracked files alone', 'Подготавливает изменения и удаления отслеживаемых файлов, но не трогает неотслеживаемые'),
        L('It stages every file in the working tree, including untracked ones', 'Подготавливает все файлы рабочего дерева, включая неотслеживаемые'),
        L('It stages nothing unless you pass explicit file paths', 'Не подготавливает ничего, если не указать явные пути'),
        L('It stages only the files listed in .gitignore', 'Подготавливает только файлы, перечисленные в .gitignore'),
      ],
      correctIndex: 0,
      explanation: L(
        'The -a flag is shorthand for staging changes to files Git already tracks, including their deletions. It does not add new untracked files, so a newly created module still needs an explicit git add, and ignored files are never staged by it.',
        'Флаг -a — это короткая запись для подготовки изменений в уже отслеживаемых файлах, включая их удаление. Новые неотслеживаемые файлы он не добавляет, поэтому новый модуль всё равно нужно добавить явно, а игнорируемые файлы он не подготавливает никогда.'
      ),
    },
    {
      id: 'git-q07',
      question: L('When is git commit --amend a safe operation?', 'Когда git commit --amend безопасна?'),
      options: [
        L('Any time, because it only changes the message and never the content', 'Всегда, ведь она меняет только сообщение и никогда не содержимое'),
        L('Before the commit has been pushed to a shared branch, when you can rewrite it freely', 'До того как коммит отправлен в общую ветку, пока его можно свободно переписать'),
        L('Only on the main branch, where the history is short', 'Только на ветке main, где история короткая'),
        L('After pushing, when you need to fix a typo in the published history', 'После отправки, когда нужно исправить опечатку в опубликованной истории'),
      ],
      correctIndex: 1,
      explanation: L(
        'amend replaces the tip commit with a new one built from the current index, so the hash changes. That is fine locally, but once the commit is pushed, rewriting it forces everyone else to reconcile the old and the new history, so the safe window is before the push.',
        'amend заменяет последний коммит новым, собранным из текущего индекса, поэтому хеш меняется. Локально это нормально, но после отправки переписывание заставляет всех разбираться со старой и новой историей, поэтому безопасное окно — до push.'
      ),
    },
    {
      id: 'git-q08',
      question: L('What does the --decorate option add to git log?', 'Что добавляет опция --decorate к выводу git log?'),
      options: [
        L('The commit message of each commit', 'Сообщение каждого коммита'),
        L('The files that changed in each commit', 'Файлы, изменившиеся в каждом коммите'),
        L('The name of the branch you are currently on', 'Имя ветки, на которой вы находитесь'),
        L('Refs such as branch names and tags pointing at each commit', 'Ссылки вроде имён веток и тегов, указывающие на каждый коммит'),
      ],
      correctIndex: 3,
      explanation: L(
        '--decorate adds the refs that point at each commit, so at a glance you see which commits are the tip of a branch and which carry a tag. It does not show messages, changed files or a special marker for the current branch, which is what the asterisk in git branch is for.',
        '--decorate добавляет ссылки, указывающие на каждый коммит, поэтому сразу видно, где кончилась ветка и где стоит тег. Сообщения, изменённые файлы и отдельную отметку текущей ветки он не показывает — для последнего есть звёздочка в выводе git branch.'
      ),
    },
    {
      id: 'git-q09',
      question: L('What does git diff --staged show?', 'Что показывает git diff --staged?'),
      options: [
        L('The difference between the index and HEAD, that is, exactly what the next commit would contain', 'Разницу между индексом и HEAD — ровно то, что попадёт в следующий коммит'),
        L('The difference between the working tree and the index', 'Разницу между рабочим деревом и индексом'),
        L('The difference between two commits given by their hashes', 'Разницу между двумя коммитами, указанными их хешами'),
        L('The difference between the working tree and the last commit', 'Разницу между рабочим деревом и последним коммитом'),
      ],
      correctIndex: 0,
      explanation: L(
        'git diff compares the working tree with the index, git diff --staged compares the index with HEAD, and git diff HEAD compares the working tree with the last commit. Only the staged version answers the question what the next commit will contain.',
        'git diff сравнивает рабочее дерево с индексом, git diff --staged — индекс с HEAD, а git diff HEAD — рабочее дерево с последним коммитом. Только вариант со staged отвечает на вопрос, что попадёт в следующий коммит.'
      ),
    },
    {
      id: 'git-q10',
      question: L('What does git branch -a show compared to plain git branch?', 'Что показывает git branch -a по сравнению с обычным git branch?'),
      options: [
        L('Only the branches that have been merged into the current one', 'Только ветки, слитые в текущую'),
        L('The branches sorted by their last commit date', 'Ветки, отсортированные по дате последнего коммита'),
        L('Both local branches and remote-tracking branches', 'И локальные ветки, и отслеживающие ветки remote'),
        L('Only the remote-tracking branches', 'Только отслеживающие ветки remote'),
      ],
      correctIndex: 2,
      explanation: L(
        'Plain git branch lists local branches, and the -a flag adds the remote-tracking branches such as origin/main. It does not filter by merge status, does not sort by date and does not show only remote branches.',
        'Обычный git branch показывает локальные ветки, а флаг -a добавляет отслеживающие ветки remote вроде origin/main. Он не фильтрует по состоянию слияния, не сортирует по дате и не показывает только удалённые ветки.'
      ),
    },
    {
      id: 'git-q11',
      question: L('What does git switch -c feature/login do?', 'Что делает git switch -c feature/login?'),
      options: [
        L('It switches to an existing branch named feature/login', 'Переключается на уже существующую ветку feature/login'),
        L('It creates a new branch at the current commit and moves HEAD to it', 'Создаёт новую ветку на текущем коммите и переводит HEAD на неё'),
        L('It creates a branch on the remote and tracks it locally', 'Создаёт ветку на remote и отслеживает её локально'),
        L('It renames the current branch to feature/login', 'Переименовывает текущую ветку в feature/login'),
      ],
      correctIndex: 1,
      explanation: L(
        'The -c flag means create: git switch -c makes a new branch pointing at the current commit and checks it out in one step, so no extra switch is needed. Without -c the command only switches, and it never creates remote branches or renames anything.',
        'Флаг -c означает create: git switch -c создаёт новую ветку на текущем коммите и сразу переключается на неё, поэтому отдельный switch не нужен. Без -c команда только переключается и никогда не создаёт ветки на remote и не переименовывает.'
      ),
    },
    {
      id: 'git-q12',
      question: L('Why did Git introduce git switch and git restore alongside git checkout?', 'Зачем Git добавил git switch и git restore рядом с git checkout?'),
      options: [
        L('Because checkout overloaded one command for branch switching and file restoration, and the new pair makes each intent explicit', 'Потому что checkout совмещал переключение веток и восстановление файлов, а новая пара делает каждое намерение явным'),
        L('Because checkout was removed from Git and no longer works', 'Потому что checkout убрали из Git и он больше не работает'),
        L('Because switch and restore support rebasing, which checkout cannot do', 'Потому что switch и restore умеют rebase, а checkout нет'),
        L('Because checkout works only on Windows and the new commands are cross-platform', 'Потому что checkout работает только в Windows, а новые команды кроссплатформенные'),
      ],
      correctIndex: 0,
      explanation: L(
        'git checkout could both move HEAD to another branch and restore files from the index, which confused people and produced accidents such as losing work. git switch is only about branches and git restore only about files, so the intent is obvious from the command name.',
        'git checkout умел и переключать ветку, и восстанавливать файлы из индекса — из-за этого в нём путались и теряли работу. Теперь git switch отвечает только за ветки, а git restore только за файлы, и намерение видно уже по названию команды.'
      ),
    },
    {
      id: 'git-q13',
      question: L('What is the difference between git branch -d and git branch -D?', 'Чем отличаются git branch -d и git branch -D?'),
      options: [
        L('-d deletes the branch on the remote, -D deletes it locally', '-d удаляет ветку на remote, а -D локально'),
        L('-D deletes the branch and its commits from every clone, -d only detaches HEAD', '-D удаляет ветку и её коммиты во всех клонах, а -d только отцепляет HEAD'),
        L('They are identical, and the capital letter is only a style choice', 'Они одинаковы, а заглавная буква — просто стиль'),
        L('-d refuses to delete an unmerged branch, -D deletes it even with unmerged commits', '-d отказывается удалять неслитую ветку, а -D удаляет даже вместе с неслитыми коммитами'),
      ],
      correctIndex: 3,
      explanation: L(
        'The lowercase -d is the safe form: it refuses to remove a branch whose commits are not merged anywhere. The capital -D forces the deletion and the unmerged commits become unreachable, though the reflog usually still allows recovering them for a while.',
        'Строчная -d — безопасная форма: она откажется удалять ветку, коммиты которой нигде не слиты. Заглавная -D удаляет принудительно, и неслитые коммиты становятся недостижимыми, хотя reflog обычно позволяет их восстановить какое-то время.'
      ),
    },
    {
      id: 'git-q14',
      question: L('You run git merge feature/login while on main. What does Git do?', 'Вы выполняете git merge feature/login, находясь на main. Что делает Git?'),
      options: [
        L('It moves main to the tip of feature/login without creating any commit', 'Переставляет main на кончик feature/login, не создавая коммита'),
        L('It brings the commits of feature/login into main, creating a merge commit when a fast-forward is not possible', 'Вносит коммиты feature/login в main, создавая merge-коммит, если fast-forward невозможен'),
        L('It copies the files of feature/login over main and stages them', 'Копирует файлы feature/login поверх main и подготавливает их'),
        L('It rewrites the commits of feature/login on top of main', 'Переписывает коммиты feature/login поверх main'),
      ],
      correctIndex: 1,
      explanation: L(
        'merge integrates the other branch into the current one: if the current branch has no new commits, Git can fast-forward the pointer, otherwise it creates a merge commit with two parents. It does not copy files manually and it does not rewrite the commits of the merged branch, that is what rebase does.',
        'merge вливает другую ветку в текущую: если в текущей ветке нет новых коммитов, Git может переставить указатель (fast-forward), иначе создаётся merge-коммит с двумя родителями. Файлы вручную он не копирует и коммиты сливаемой ветки не переписывает — это делает rebase.'
      ),
    },
    {
      id: 'git-q15',
      question: L('When can Git perform a fast-forward merge?', 'Когда Git может выполнить fast-forward слияние?'),
      options: [
        L('Whenever the branches have different names', 'Когда у веток разные имена'),
        L('Whenever the branch being merged has at least one commit', 'Когда у сливаемой ветки есть хотя бы один коммит'),
        L('When the current branch has no commits of its own since the branches diverged', 'Когда в текущей ветке нет своих коммитов с момента расхождения веток'),
        L('Only when the branches are on different remotes', 'Только когда ветки находятся на разных remote'),
      ],
      correctIndex: 2,
      explanation: L(
        'A fast-forward is possible when the current branch is an ancestor of the branch being merged, so Git simply moves the pointer and no merge commit is needed. Any commit added to the current branch after the divergence blocks it, and branch names or remotes have no influence.',
        'Fast-forward возможен, когда текущая ветка — предок сливаемой: Git просто переставляет указатель, merge-коммит не нужен. Любой коммит, добавленный в текущую ветку после расхождения, это блокирует, а имена веток и remote ни на что не влияют.'
      ),
    },
    {
      id: 'git-q16',
      question: L('Why would you merge with --no-ff?', 'Зачем сливать с опцией --no-ff?'),
      options: [
        L('To always create a merge commit and keep the branch visible in the history graph', 'Чтобы всегда создавать merge-коммит и сохранять ветку видимой в графе истории'),
        L('To merge without creating any commit at all', 'Чтобы слить вообще без создания коммита'),
        L('To discard the commits of the merged branch', 'Чтобы выбросить коммиты сливаемой ветки'),
        L('To merge the branch into its own base, so a conflict is impossible', 'Чтобы слить ветку с самой собой, чтобы конфликт был невозможен'),
      ],
      correctIndex: 0,
      explanation: L(
        '--no-ff forces a merge commit even when a fast-forward would be possible, which keeps the feature branch visible in the history and makes it easy to revert as a unit. It does not skip the commit, does not drop commits and does not prevent conflicts.',
        '--no-ff всегда создаёт merge-коммит, даже когда fast-forward возможен, благодаря чему feature-ветка остаётся видна в графе истории и её легко откатить целиком. Коммит он не отменяет, коммиты не выбрасывает и конфликты не предотвращает.'
      ),
    },
    {
      id: 'git-q17',
      question: L('What happens after git merge --squash feature/login?', 'Что происходит после git merge --squash feature/login?'),
      options: [
        L('A single commit is created automatically on the current branch', 'На текущей ветке автоматически создаётся один коммит'),
        L('The branch is deleted and its commits are lost', 'Ветка удаляется, а её коммиты теряются'),
        L('The changes are discarded and the working tree is cleaned', 'Изменения отбрасываются, а рабочее дерево чистится'),
        L('The changes are combined into the index as if staged, and you commit them yourself', 'Изменения сводятся в индекс как подготовленные, а коммит вы делаете сами'),
      ],
      correctIndex: 3,
      explanation: L(
        'Squash merge combines all the changes of the branch and leaves them staged in the working tree, but it creates no commit: you write the message and commit by hand, which gives you one clean commit instead of many small ones.',
        'Squash-слияние сводит все изменения ветки и оставляет их подготовленными в рабочем дереве, но коммит не создаёт — вы пишете сообщение и коммитите сами. В итоге получается один чистый коммит вместо множества мелких.'
      ),
    },
    {
      id: 'git-q18',
      question: L('What do the markers <<<<<<< HEAD, ======= and >>>>>>> mean in a conflicted file?', 'Что означают маркеры <<<<<<< HEAD, ======= и >>>>>>> в файле с конфликтом?'),
      options: [
        L('They separate the committed version from the working tree version', 'Они отделяют закоммиченную версию от версии рабочего дерева'),
        L('They separate our version (HEAD) from their version (the branch being merged)', 'Они отделяют нашу версию (HEAD) от их версии (сливаемой ветки)'),
        L('They mark the regions of the file that failed to pass the linter', 'Они отмечают участки файла, не прошедшие линтер'),
        L('They mark the commits that were dropped during a rebase', 'Они отмечают коммиты, выброшенные во время rebase'),
      ],
      correctIndex: 1,
      explanation: L(
        'The three markers frame the two conflicting sides: the part above ======= is the version from HEAD, the part below is the incoming version from the other branch. You resolve it by editing the file, removing the markers and staging the result with git add.',
        'Три маркера обрамляют две конфликтующие стороны: выше ======= — версия из HEAD, ниже — версия из сливаемой ветки. Конфликт решают, отредактировав файл, убрав маркеры и подготовив результат через git add.'
      ),
    },
    {
      id: 'git-q19',
      question: L('What does git rebase main do when you are on feature/login?', 'Что делает git rebase main, когда вы на ветке feature/login?'),
      options: [
        L('It merges feature/login into main and moves you back to feature/login', 'Он сливает feature/login в main и возвращает вас на feature/login'),
        L('It creates a merge commit that combines main and feature/login', 'Он создаёт merge-коммит, объединяющий main и feature/login'),
        L('It replays the commits of feature/login on top of main, producing a new linear history', 'Он переносит коммиты feature/login поверх main, получая новую линейную историю'),
        L('It copies main into a new branch called feature/login', 'Он копирует main в новую ветку feature/login'),
      ],
      correctIndex: 2,
      explanation: L(
        'Rebase takes the commits of the current branch that are not on the target branch and replays them on top of it, so the history becomes a straight line and the commit hashes change. It does not merge anything and it does not copy files.',
        'Rebase берёт коммиты текущей ветки, которых нет в целевой, и переносит их поверх неё: история становится прямой, а хеши коммитов меняются. Это не слияние и не копирование файлов.'
      ),
    },
    {
      id: 'git-q20',
      question: L('You run git rebase -i HEAD~5. What can you do in the opened list?', 'Вы выполнили git rebase -i HEAD~5. Что можно делать в открывшемся списке?'),
      options: [
        L('Squash, reword, edit, drop and reorder the last five commits', 'Объединять, переименовывать, править, удалять и переставлять последние пять коммитов'),
        L('Choose the branch you want to rebase onto', 'Выбрать ветку, на которую нужно перебазироваться'),
        L('Mark which commits are good and which are bad', 'Отметить, какие коммиты хорошие, а какие плохие'),
        L('Resolve merge conflicts by picking one side of each conflict', 'Разрешить конфликты, выбрав одну сторону в каждом конфликте'),
      ],
      correctIndex: 0,
      explanation: L(
        'Interactive rebase rewrites the listed commits: squash merges them into the previous one, reword changes the message, edit lets you stop and amend, drop removes a commit and the list can be reordered. Marking good and bad commits is git bisect, and picking conflict sides is the normal conflict resolution.',
        'Интерактивный rebase переписывает перечисленные коммиты: squash сливает с предыдущим, reword меняет сообщение, edit позволяет остановиться и поправить, drop удаляет, порядок можно менять. Отметка good и bad — это git bisect, а выбор стороны в конфликте — обычное разрешение конфликта.'
      ),
    },
    {
      id: 'git-q21',
      question: L('What does git reset --soft HEAD~1 do?', 'Что делает git reset --soft HEAD~1?'),
      options: [
        L('It deletes the last commit and all the changes it contained', 'Удаляет последний коммит и все его изменения'),
        L('It deletes the last commit but keeps the changes unstaged in the working tree', 'Удаляет последний коммит, но оставляет изменения неподготовленными в рабочем дереве'),
        L('It keeps the last commit and discards everything after it', 'Сохраняет последний коммит и выбрасывает всё после него'),
        L('It moves HEAD one commit back and keeps the index and the working tree unchanged', 'Откатывает HEAD на коммит назад и оставляет индекс и рабочее дерево без изменений'),
      ],
      correctIndex: 3,
      explanation: L(
        'The soft reset only moves the branch pointer: the changes of the removed commit stay in the index, ready to be committed again. The mixed reset (the default) also resets the index, and the hard reset additionally throws away the working tree changes.',
        'Мягкий reset двигает только указатель ветки: изменения удалённого коммита остаются в индексе, готовые к новому коммиту. Смешанный reset (по умолчанию) сбрасывает ещё и индекс, а жёсткий выбрасывает ещё и изменения рабочего дерева.'
      ),
    },
    {
      id: 'git-q22',
      question: L('You ran git reset HEAD~1 by mistake and want the changes back in the index as they were. Which mode does that?', 'Вы по ошибке выполнили git reset HEAD~1 и хотите вернуть изменения в индекс как было. Какой режим подходит?'),
      options: [
        L('git reset --hard HEAD~1', 'git reset --hard HEAD~1'),
        L('git reset --soft HEAD~1', 'git reset --soft HEAD~1'),
        L('git restore --staged HEAD~1', 'git restore --staged HEAD~1'),
        L('git reset --mixed HEAD~1', 'git reset --mixed HEAD~1'),
      ],
      correctIndex: 1,
      explanation: L(
        'The soft reset undoes the commit but leaves the index exactly as it was, so the changes are still staged. The default mixed reset would leave the changes unstaged, the hard reset would destroy them, and git restore --staged does not move HEAD at all.',
        'Мягкий reset отменяет коммит, но оставляет индекс как был, так что изменения остаются подготовленными. Смешанный reset (по умолчанию) оставил бы их неподготовленными, жёсткий уничтожил бы, а git restore --staged вообще не двигает HEAD.'
      ),
    },
    {
      id: 'git-q23',
      question: L('What is the risk of git reset --hard?', 'В чём опасность git reset --hard?'),
      options: [
        L('It can only be undone by cloning again, because the objects are deleted', 'Его можно отменить только повторным клонированием, потому что объекты удаляются'),
        L('It rewrites the commits of the current branch, so the remote must be updated', 'Он переписывает коммиты текущей ветки, поэтому remote нужно обновлять'),
        L('It throws away uncommitted changes in the working tree and the staged changes', 'Он выбрасывает незакоммиченные изменения рабочего дерева и подготовленные изменения'),
        L('It changes the remote tracking configuration of the branch', 'Он меняет настройку отслеживания remote для ветки'),
      ],
      correctIndex: 2,
      explanation: L(
        'A hard reset moves HEAD, resets the index and overwrites the working tree with the state of the target commit, so any uncommitted work is gone. The objects usually stay in the object database for a while and can be recovered through the reflog, but the changes are lost from the working tree.',
        'Жёсткий reset двигает HEAD, сбрасывает индекс и перезаписывает рабочее дерево состоянием целевого коммита, поэтому незакоммиченная работа пропадает. Объекты обычно какое-то время остаются в базе и восстанавливаются через reflog, но из рабочего дерева изменения исчезают.'
      ),
    },
    {
      id: 'git-q24',
      question: L('You want to unstage a file but keep its changes in the working tree. What do you run?', 'Как убрать файл из индекса, но оставить изменения в рабочем дереве?'),
      options: [
        L('git restore --staged <file>', 'git restore --staged <file>'),
        L('git restore <file>', 'git restore <file>'),
        L('git reset --hard <file>', 'git reset --hard <file>'),
        L('git checkout -- <file>', 'git checkout -- <file>'),
      ],
      correctIndex: 0,
      explanation: L(
        'git restore --staged moves the file back to the state of HEAD in the index only, so the edits stay on disk and simply stop being staged. Plain git restore and git checkout -- <file> discard the working tree changes as well, and a hard reset does not work on a single file path.',
        'git restore --staged меняет в индексе только состояние файла на HEAD, правки остаются на диске и просто перестают быть подготовленными. Обычный git restore и git checkout -- <file> заодно выбрасывают изменения рабочего дерева, а жёсткий reset вообще не работает с отдельным путём.'
      ),
    },
    {
      id: 'git-q25',
      question: L('You already pushed a bad commit to a shared branch. What is the safe way to undo it?', 'Вы уже отправили плохой коммит в общую ветку. Как безопасно его отменить?'),
      options: [
        L('git reset --hard HEAD~1 and git push --force', 'git reset --hard HEAD~1 и git push --force'),
        L('git commit --amend and git push --force-with-lease', 'git commit --amend и git push --force-with-lease'),
        L('git rebase -i HEAD~1 on the shared branch', 'git rebase -i HEAD~1 на общей ветке'),
        L('git revert <commit>, which creates a new commit that undoes the change', 'git revert <commit>, который создаёт новый коммит, отменяющий изменение'),
      ],
      correctIndex: 3,
      explanation: L(
        'Revert adds a new commit with the inverse change, so the published history stays intact and nobody has to rebase. Reset, amend and rebase rewrite history, which is why they are dangerous on a branch that other people have already pulled.',
        'Revert добавляет новый коммит с обратным изменением: опубликованная история остаётся целой, и никому не нужно перебазироваться. Reset, amend и rebase переписывают историю, поэтому на ветке, которую кто-то уже забрал, они опасны.'
      ),
    },
    {
      id: 'git-q26',
      question: L('What does git cherry-pick <commit> do?', 'Что делает git cherry-pick <commit>?'),
      options: [
        L('It copies the whole branch including its history onto the current branch', 'Копирует всю ветку вместе с историей на текущую ветку'),
        L('It applies the changes of that single commit on top of the current branch, creating a new commit', 'Применяет изменения одного коммита поверх текущей ветки, создавая новый коммит'),
        L('It removes the commit from the branch where it was created', 'Удаляет коммит из ветки, где он был создан'),
        L('It merges the commit without creating a new commit on the current branch', 'Сливает коммит, не создавая нового коммита в текущей ветке'),
      ],
      correctIndex: 1,
      explanation: L(
        'Cherry-pick takes the diff of one commit and applies it to the current branch, producing a new commit with a new hash. It does not copy a branch, does not delete anything from the original branch, and it is not a merge.',
        'Cherry-pick берёт изменения одного коммита и применяет их к текущей ветке, создавая новый коммит с новым хешем. Ветку он не копирует, в исходной ветке ничего не удаляет и слиянием не является.'
      ),
    },
    {
      id: 'git-q27',
      question: L('What does git stash do by default?', 'Что делает git stash по умолчанию?'),
      options: [
        L('It creates a branch for your uncommitted work and switches to it', 'Создаёт ветку с незакоммиченной работой и переключается на неё'),
        L('It commits your changes on the current branch and then resets the branch', 'Коммитит изменения в текущей ветке и затем сбрасывает её'),
        L('It saves the changes of tracked files and restores the working tree to HEAD', 'Сохраняет изменения отслеживаемых файлов и возвращает рабочее дерево к HEAD'),
        L('It uploads the changes to the remote as a hidden branch', 'Отправляет изменения на remote как скрытую ветку'),
      ],
      correctIndex: 2,
      explanation: L(
        'A plain git stash stores the current modifications of tracked files in the stash and cleans the working tree, so you can switch branches with a clean tree. It does not create a branch and does not commit anything on the current branch.',
        'Обычный git stash сохраняет текущие изменения отслеживаемых файлов в stash и чистит рабочее дерево, чтобы можно было спокойно переключить ветку. Ветку он не создаёт и в текущей ветке ничего не коммитит.'
      ),
    },
    {
      id: 'git-q28',
      question: L('What is the difference between git stash pop and git stash apply?', 'Чем отличаются git stash pop и git stash apply?'),
      options: [
        L('pop applies the stash and drops it from the stash list, apply keeps it in the list', 'pop применяет stash и убирает его из списка, а apply оставляет в списке'),
        L('pop keeps the stash and apply deletes it', 'pop сохраняет stash, а apply удаляет его'),
        L('pop works only with untracked files, apply only with tracked ones', 'pop работает только с неотслеживаемыми файлами, apply только с отслеживаемыми'),
        L('They are two names for the same command', 'Это два названия одной и той же команды'),
      ],
      correctIndex: 0,
      explanation: L(
        'Both commands apply the stashed changes to the working tree, but pop removes that entry from the stash list while apply leaves it there. Keeping the entry is useful when the same changes have to be applied in more than one place, and the list is shown by git stash list.',
        'Обе команды применяют сохранённые изменения в рабочее дерево, но pop убирает запись из списка stash, а apply оставляет. Сохранённая запись удобна, если одни и те же изменения нужно применить в нескольких местах, а список показывает git stash list.'
      ),
    },
    {
      id: 'git-q29',
      question: L('A new untracked file is not saved by git stash. How do you include it?', 'Новый неотслеживаемый файл не сохраняется через git stash. Как его включить?'),
      options: [
        L('git stash --all', 'git stash --all'),
        L('There is no such option, untracked files cannot be stashed', 'Такой опции нет, неотслеживаемые файлы нельзя сохранить в stash'),
        L('git add the file before stashing and git reset it afterwards', 'Сначала git add файла, потом stash и сброс через git reset'),
        L('git stash -u, also spelled git stash --include-untracked', 'git stash -u, также пишется git stash --include-untracked'),
      ],
      correctIndex: 3,
      explanation: L(
        'The -u option makes stash also save untracked files, while -a additionally includes ignored ones. Without it, the default stash only records changes to files Git already tracks, so a new file stays in the working directory.',
        'Опция -u заставляет stash сохранять и неотслеживаемые файлы, а -a добавляет ещё и игнорируемые. Без неё обычный stash записывает только изменения отслеживаемых файлов, и новый файл остаётся в рабочем каталоге.'
      ),
    },
    {
      id: 'git-q30',
      question: L('What does git remote -v show?', 'Что показывает git remote -v?'),
      options: [
        L('The URL and the last commit of the remote repository', 'URL и последний коммит удалённого репозитория'),
        L('The configured remotes with their fetch and push URLs', 'Настроенные remote с URL для получения и отправки данных'),
        L('The list of branches that exist only on the remote', 'Список веток, которые есть только на remote'),
        L('The differences between the local and the remote version of the current branch', 'Различия между локальной и удалённой версиями текущей ветки'),
      ],
      correctIndex: 1,
      explanation: L(
        'git remote -v lists the names of the remotes with the URLs Git uses for fetching and pushing, and -v makes the output verbose. It does not show the remote branches, the commit history or the difference with the remote version of the branch.',
        'git remote -v показывает имена настроенных remote с URL, по которым Git забирает и отправляет данные, а -v делает вывод подробным. Ветки remote, историю и разницу с удалённой версией ветки он не показывает.'
      ),
    },
    {
      id: 'git-q31',
      question: L('What does git fetch origin do to your current branch?', 'Что делает git fetch origin с вашей текущей веткой?'),
      options: [
        L('It merges the fetched commits into the current branch', 'Он сливает забранные коммиты в текущую ветку'),
        L('It rewrites the current branch on top of the fetched one', 'Он переписывает текущую ветку поверх забранной'),
        L('It only downloads objects and updates the remote-tracking refs, leaving your branch untouched', 'Он только скачивает объекты и обновляет отслеживающие ссылки remote, не трогая вашу ветку'),
        L('It downloads the files and overwrites the ones in your working tree', 'Он скачивает файлы и перезаписывает файлы в вашем рабочем дереве'),
      ],
      correctIndex: 2,
      explanation: L(
        'fetch updates origin/... so you can inspect what is new, and it never touches your local branch or your working tree. The merge happens only when you run git pull, or you can merge or rebase the fetched commits yourself.',
        'fetch обновляет origin/..., чтобы можно было посмотреть, что нового, и никогда не трогает ни вашу ветку, ни рабочее дерево. Слияние происходит только при git pull, либо вы сами сливаете или перебазируете забранные коммиты.'
      ),
    },
    {
      id: 'git-q32',
      question: L('What does git pull do by default?', 'Что делает git pull по умолчанию?'),
      options: [
        L('It runs a fetch and then a merge of the fetched branch into the current branch', 'Он выполняет fetch, а затем merge забранной ветки в текущую'),
        L('It runs a fetch and then a rebase of the current branch onto the fetched one', 'Он выполняет fetch, а затем rebase текущей ветки поверх забранной'),
        L('It only fetches, and the merge happens separately', 'Он только забирает изменения, а слияние выполняется отдельно'),
        L('It uploads the local commits to the remote', 'Он отправляет локальные коммиты на remote'),
      ],
      correctIndex: 0,
      explanation: L(
        'pull is fetch plus merge by default; with --rebase it fetches and rebases instead, which keeps the history linear. It does not push anything, and a pull that hits conflicting commits leaves the conflict markers in the files for you to resolve.',
        'По умолчанию pull — это fetch плюс merge, а с --rebase он забирает и перебазирует, сохраняя историю прямой. Ничего он не отправляет, а при конфликте оставляет маркеры в файлах для ручного разрешения.'
      ),
    },
    {
      id: 'git-q33',
      question: L('You run git push origin feature/login for the first time. What does Git ask about and what does it set?', 'Вы впервые выполняете git push origin feature/login. О чём спрашивает Git и что он настраивает?'),
      options: [
        L('It asks for the commit message and creates the commit', 'Он спрашивает сообщение коммита и создаёт коммит'),
        L('It asks which branch to merge and rebases it', 'Он спрашивает, какую ветку слить, и перебазирует её'),
        L('It asks for the remote password and stores it in the repository config', 'Он спрашивает пароль remote и сохраняет его в конфигурации репозитория'),
        L('It asks whether to set upstream tracking and, if confirmed, records origin/feature/login for the branch', 'Он спрашивает, настроить ли отслеживание, и при согласии записывает origin/feature/login для ветки'),
      ],
      correctIndex: 3,
      explanation: L(
        'The first push of a branch usually asks whether to set it up to track the remote branch, and the -u flag answers that in advance. That makes plain git push and git pull work on this branch without naming the remote and the branch every time.',
        'При первом push ветки Git обычно спрашивает, не настроить ли отслеживание удалённой ветки, а флаг -u отвечает на это заранее. После этого обычные git push и git pull работают с этой веткой без указания remote и имени ветки каждый раз.'
      ),
    },
    {
      id: 'git-q34',
      question: L('Why is git push --force-with-lease safer than git push --force?', 'Почему git push --force-with-lease безопаснее, чем git push --force?'),
      options: [
        L('It refuses to push any commit that has already been pushed before', 'Он отказывается отправлять коммиты, которые уже отправлялись раньше'),
        L('It only pushes if the remote branch still points where you last saw it, so it will not overwrite work pushed by others', 'Он отправляет только если ветка remote всё ещё там, где вы её видели, и потому не затрёт чужую отправленную работу'),
        L('It creates a backup branch on the remote before overwriting it', 'Он создаёт резервную ветку на remote перед перезаписью'),
        L('It runs a merge on the remote before the push, so no history is lost', 'Он выполняет слияние на remote перед отправкой, чтобы история не терялась'),
      ],
      correctIndex: 1,
      explanation: L(
        'The lease records the position you last fetched and the push is rejected if the remote moved since then. Plain --force overwrites the remote branch unconditionally, which is how people lose the commits of a colleague; --force-with-lease does not create backups and does not merge on the remote.',
        'Аренда запоминает позицию, на которой вы в последний раз забирали изменения, и push отклоняется, если remote с тех пор сдвинулся. Обычный --force перезаписывает ветку безусловно — так теряются коммиты коллеги. --force-with-lease не делает бэкапов и не сливает на стороне remote.'
      ),
    },
    {
      id: 'git-q35',
      question: L('What is the difference between a lightweight tag and an annotated tag?', 'Чем лёгкий тег отличается от аннотированного?'),
      options: [
        L('A lightweight tag is pushed automatically, an annotated tag stays local', 'Лёгкий тег отправляется автоматически, а аннотированный остаётся локальным'),
        L('A lightweight tag can have a message, an annotated tag cannot', 'Лёгкий тег может иметь сообщение, а аннотированный нет'),
        L('A lightweight tag is just a pointer to a commit, an annotated tag is an object with a tagger, a date and a message', 'Лёгкий тег — просто указатель на коммит, а аннотированный — объект с автором, датой и сообщением'),
        L('They are the same thing with different syntax', 'Это одно и то же, просто с разным синтаксисом'),
      ],
      correctIndex: 2,
      explanation: L(
        'A lightweight tag is only a reference to a commit, while an annotated tag is a separate object with its own tagger, date and message, which is why it can be signed and is what release tooling expects. Only annotated tags carry a message and can carry a signature.',
        'Лёгкий тег — это просто ссылка на коммит, а аннотированный — отдельный объект со своим автором, датой и сообщением, поэтому его можно подписать и именно его ждёт релизный инструментарий. Сообщение и подпись есть только у аннотированного.'
      ),
    },
    {
      id: 'git-q36',
      question: L('You created the tag v1.0.0 locally. Why does it not appear on the remote after git push?', 'Вы создали локально тег v1.0.0. Почему после git push он не появился на remote?'),
      options: [
        L('Tags are not pushed by a plain git push, you have to push the tag explicitly', 'Обычный git push теги не отправляет, тег нужно отправить явно'),
        L('Tags are pushed only together with a merge commit', 'Теги отправляются только вместе с merge-коммитом'),
        L('Only annotated tags can be pushed, and lightweight ones are always local', 'Отправлять можно только аннотированные теги, а лёгкие всегда остаются локальными'),
        L('The tag must be fetched first before it can be pushed', 'Тег нужно сначала забрать, и только потом можно отправить'),
      ],
      correctIndex: 0,
      explanation: L(
        'A plain git push sends the branches it knows about, but tags have to be named explicitly, for example git push origin v1.0.0, or pushed all at once with --follow-tags or --tags. Lightweight tags can be pushed exactly like annotated ones.',
        'Обычный git push отправляет ветки, а теги нужно указать явно — например git push origin v1.0.0 — либо отправить все разом через --follow-tags или --tags. Лёгкие теги отправляются так же, как аннотированные.'
      ),
    },
    {
      id: 'git-q37',
      question: L('How does git bisect help you find a bug?', 'Как git bisect помогает найти баг?'),
      options: [
        L('It searches the commit messages for the one that mentions the bug', 'Он ищет в сообщениях коммитов тот, где упоминается баг'),
        L('You mark a known bad and a known good commit and it checks out intermediate commits for you to test', 'Вы отмечаете заведомо плохой и заведомо хороший коммиты, а он выставляет промежуточные для проверки'),
        L('It compares your branch with the remote to find the first conflicting commit', 'Он сравнивает вашу ветку с remote и находит первый конфликтующий коммит'),
        L('It replays your changes on top of every branch to find the failing one', 'Он переигрывает ваши изменения поверх каждой ветки и находит падающую'),
      ],
      correctIndex: 1,
      explanation: L(
        'bisect does a binary search over the history: you mark a bad commit and a good one, and Git checks out the middle of the range, narrowing it down until you find the first bad commit. It does not search messages, does not compare with the remote and does not replay your changes.',
        'bisect делает бинарный поиск по истории: вы отмечаете плохой и хороший коммиты, а Git выставляет середину диапазона, сужая поиск до первого плохого коммита. По сообщениям он не ищет, с remote не сравнивает и изменения не переигрывает.'
      ),
    },
    {
      id: 'git-q38',
      question: L('What does git bisect run script.sh add to the workflow?', 'Что добавляет git bisect run script.sh в процесс?'),
      options: [
        L('It commits the script so the history stays clean', 'Он коммитит скрипт, чтобы история оставалась чистой'),
        L('It marks the current commit as good automatically', 'Он сам отмечает текущий коммит как хороший'),
        L('It reverts the changes of the bad commit', 'Он откатывает изменения плохого коммита'),
        L('It runs the script on every checked-out revision and marks good or bad automatically from the exit code', 'Он запускает скрипт на каждой выставленной ревизии и по коду выхода сам ставит good или bad'),
      ],
      correctIndex: 3,
      explanation: L(
        'git bisect run executes your command on each revision that bisect checks out and uses the exit status: 0 means good, 1 to 127 means bad. This turns a manual bisect into an automated one for a test suite or a reproduction script. It does not create commits and does not decide the verdict by itself.',
        'git bisect run выполняет вашу команду на каждой выставленной ревизии и опирается на код выхода: 0 — хорошо, от 1 до 127 — плохо. Так ручной bisect превращается в автоматический для тест-сьюта или скрипта воспроизведения. Коммитов он не создаёт и вердикт сам не выносит.'
      ),
    },
    {
      id: 'git-q39',
      question: L('What is the reflog for?', 'Для чего нужен reflog?'),
      options: [
        L('It lists every commit that was ever created in the repository', 'Он перечисляет все коммиты, когда-либо созданные в репозитории'),
        L('It records which files changed in each commit', 'Он записывает, какие файлы изменились в каждом коммите'),
        L('It records the local movements of HEAD and refs, so you can recover commits that seem lost', 'Он записывает локальные перемещения HEAD и ссылок, чтобы можно было вернуть потерянные коммиты'),
        L('It shows which branches were merged in the current release', 'Он показывает, какие ветки сливались в текущем релизе'),
      ],
      correctIndex: 2,
      explanation: L(
        'The reflog is a local log of where HEAD and the branch pointers have been, so after a bad reset or a rebase you can find the previous tip and reset back to it. It is local only, it is never pushed, and it records pointer movements rather than file changes.',
        'Reflog — это локальный журнал перемещений HEAD и указателей веток, поэтому после неудачного reset или rebase можно найти прежнюю вершину и вернуться на неё. Он только локальный, никуда не отправляется и фиксирует перемещения указателей, а не изменения файлов.'
      ),
    },
    {
      id: 'git-q40',
      question: L('Which statement about Git hooks is correct?', 'Какое утверждение о Git hooks верно?'),
      options: [
        L('They are scripts in .git/hooks that run on Git events such as commit and push, and they are not shared through the repository', 'Это скрипты в .git/hooks, которые запускаются на события Git вроде commit и push, и они не распространяются через репозиторий'),
        L('They are configured in .gitconfig and run on the remote server after every push', 'Они настраиваются в .gitconfig и выполняются на сервере после каждого push'),
        L('They are part of the commit history and are pushed like any other file', 'Они входят в историю коммитов и отправляются как обычный файл'),
        L('They are enabled by default and always run before a commit', 'Они включены по умолчанию и всегда выполняются перед коммитом'),
      ],
      correctIndex: 0,
      explanation: L(
        'Hooks live in .git/hooks and fire on events like pre-commit, commit-msg or pre-push. The sample files that ship with Git are inactive by default, and hooks are not versioned, so a team has to distribute them separately, often with a tool that installs them from the repository.',
        'Хуки лежат в .git/hooks и срабатывают на события pre-commit, commit-msg, pre-push. Примеры, которые поставляются с Git, по умолчанию неактивны, и сами хуки не версионируются, поэтому команда распространяет их отдельно, часто инструментом, ставящим их из репозитория.'
      ),
    },
    {
      id: 'git-q41',
      question: L('What does a commit-msg hook typically do?', 'Что обычно делает хук commit-msg?'),
      options: [
        L('It aborts the commit if the working tree is dirty', 'Он прерывает коммит, если рабочее дерево содержит незакоммиченные изменения'),
        L('It validates the commit message format, for example a required prefix or a maximum line length', 'Он проверяет формат сообщения коммита, например требуемый префикс или максимальную длину строки'),
        L('It runs the test suite before the commit is created', 'Он запускает тест-сьют до создания коммита'),
        L('It compresses the repository objects after every commit', 'Он сжимает объекты репозитория после каждого коммита'),
      ],
      correctIndex: 1,
      explanation: L(
        'The commit-msg hook receives the path to the message file and can reject the commit if the message does not follow the rules. Running the tests before committing is the job of a pre-commit hook, and the check for a dirty working tree belongs to pre-commit as well.',
        'Хук commit-msg получает путь к файлу сообщения и может отклонить коммит, если сообщение не соответствует правилам. Запуск тестов до коммита — работа хука pre-commit, как и проверка на незакоммиченные изменения.'
      ),
    },
    {
      id: 'git-q42',
      question: L('How do you track large binary files with Git LFS?', 'Как отслеживать большие бинарные файлы через Git LFS?'),
      options: [
        L('git add --large-files, which stores the content in a separate Git repository', 'git add --large-files, которая хранит содержимое в отдельном Git-репозитории'),
        L('git lfs add "*.psd", which commits the binaries directly to the Git history', 'git lfs add "*.psd", которая коммитит бинарники прямо в историю Git'),
        L('Compress them with zip before committing, so Git stores smaller objects', 'Сжать их через zip перед коммитом, чтобы Git хранил меньшие объекты'),
        L('git lfs track "*.psd", which writes the pattern into .gitattributes, and that file must be committed', 'git lfs track "*.psd", которая записывает шаблон в .gitattributes, и этот файл нужно закоммитить'),
      ],
      correctIndex: 3,
      explanation: L(
        'git lfs track writes the pattern into .gitattributes, and that file has to be committed so every clone uses the same rule; the large files themselves live in the LFS storage and Git only keeps a pointer in the commit. Compression does not replace LFS, and the binaries must not be committed as normal Git objects.',
        'git lfs track записывает шаблон в .gitattributes, и этот файл нужно закоммитить, чтобы правило было у всех в клонах; сами большие файлы лежат в хранилище LFS, а в коммите остаётся лишь указатель. Сжатие не заменяет LFS, а бинарники нельзя коммитить как обычные объекты Git.'
      ),
    },
    {
      id: 'git-q43',
      question: L('Where do the ignore rules live, and what does a pattern like node_modules/ mean?', 'Где живут правила игнора и что означает шаблон node_modules/?'),
      options: [
        L('In the .gitignore file at the repository root, and it matches any directory with that name at any depth', 'В файле .gitignore в корне репозитория, и он совпадает с любым каталогом такого имени на любой глубине'),
        L('In .git/config, and it excludes the directory from every repository on the machine', 'В .git/config, и он исключает каталог из каждого репозитория на машине'),
        L('In the .gitignore file, and it matches only the directory at the exact path you typed', 'В файле .gitignore, и он совпадает только с каталогом по точному указанному пути'),
        L('In .gitattributes, and it tells Git to compress those files', 'В .gitattributes, и он говорит Git сжимать эти файлы'),
      ],
      correctIndex: 0,
      explanation: L(
        '.gitignore lives in the repository and its patterns are read from the directory of the file downwards, so node_modules/ matches that directory at any level, and a trailing slash marks directories. Rules do not live in .git/config, and .gitattributes is about attributes such as diff and merge drivers.',
        '.gitignore живёт в репозитории, его шаблоны читаются от каталога файла вниз, поэтому node_modules/ совпадает с каталогом такого имени на любом уровне, а слэш в конце означает каталог. Правила не лежат в .git/config, а .gitattributes — про атрибуты вроде diff и merge-драйверов.'
      ),
    },
    {
      id: 'git-q44',
      question: L('A file was already tracked, you added it to .gitignore, and git status still shows it as modified. Why?', 'Файл уже отслеживался, вы добавили его в .gitignore, но git status всё равно показывает его как изменённый. Почему?'),
      options: [
        L('Because .gitignore is only read once, when the repository was created', 'Потому что .gitignore читается только один раз, при создании репозитория'),
        L('Because the file has to be committed before the ignore rules take effect', 'Потому что файл нужно закоммитить, прежде чем правила игнора заработают'),
        L('Because .gitignore does not apply to files that are already tracked; you need git rm --cached', 'Потому что .gitignore не действует на уже отслеживаемые файлы, нужен git rm --cached'),
        L('Because the ignore rules must be placed before the first line of the file', 'Потому что правила игнора должны стоять до первой строки файла'),
      ],
      correctIndex: 2,
      explanation: L(
        'Ignore rules only affect untracked files: a file that Git already tracks stays tracked until you remove it from the index with git rm --cached <file>, and that removal is then committed. The rules are read on every git status run, so a stale cache is not the explanation.',
        'Правила игнора действуют только на неотслеживаемые файлы: уже отслеживаемый файл останется отслеживаемым, пока его не уберут из индекса командой git rm --cached <file>, и это удаление потом коммитят. Правила перечитываются при каждом запуске git status, так что дело не в кэше.'
      ),
    },
    {
      id: 'git-q45',
      question: L('How do you safely delete untracked files and directories from the working tree?', 'Как безопасно удалить неотслеживаемые файлы и каталоги из рабочего дерева?'),
      options: [
        L('git clean -fd, which deletes them immediately', 'git clean -fd, который удаляет их сразу'),
        L('git clean -nfd first to preview, then git clean -fd to actually delete', 'git clean -nfd для предварительного просмотра, а затем git clean -fd для удаления'),
        L('git clean -df --force, which is the same as the first option', 'git clean -df --force, что то же самое, что первый вариант'),
        L('git rm -rf on the untracked directories', 'git rm -rf по неотслеживаемым каталогам'),
      ],
      correctIndex: 1,
      explanation: L(
        'The -n flag makes git clean a dry run: it prints what would be removed without touching anything, which is the sane way to use a recursive delete. Without -n the deletion happens immediately, and git rm works on tracked files, not on untracked ones.',
        'Флаг -n превращает git clean в пробный прогон: он показывает, что было бы удалено, ничего не трогая — так и стоит запускать рекурсивное удаление. Без -n удаление происходит сразу, а git rm работает с отслеживаемыми файлами, а не с неотслеживаемыми.'
      ),
    },
    {
      id: 'git-q46',
      question: L('You have edited src/app.ts and want to throw the changes away and get the committed version back. What do you run?', 'Вы изменили src/app.ts и хотите выбросить правки и вернуть закоммиченную версию. Что выполнить?'),
      options: [
        L('git checkout --staged src/app.ts', 'git checkout --staged src/app.ts'),
        L('git restore --staged src/app.ts', 'git restore --staged src/app.ts'),
        L('git reset --hard src/app.ts', 'git reset --hard src/app.ts'),
        L('git restore src/app.ts', 'git restore src/app.ts'),
      ],
      correctIndex: 3,
      explanation: L(
        'git restore <file> overwrites the working tree copy with the version from the index, discarding your edits. The --staged variants only change the index and leave the file on disk as it is, and git reset --hard does not accept a single path.',
        'git restore <file> перезаписывает файл в рабочем дереве версией из индекса и выбрасывает правки. Варианты с --staged меняют только индекс, оставляя файл на диске, а git reset --hard вообще не принимает отдельный путь.'
      ),
    },
    {
      id: 'git-q47',
      question: L('How do you set the author identity used for commits?', 'Как задать идентичность автора, которая используется в коммитах?'),
      options: [
        L('git config user.name and git config user.email, either globally with --global or for one repository', 'git config user.name и git config user.email, глобально через --global или для одного репозитория'),
        L('git commit --author "Name <email>", which stores the identity permanently', 'git commit --author "Name <email>", которая сохраняет идентичность навсегда'),
        L('Editing .git/config manually, since the identity is not stored there', 'Правкой .git/config вручную, так как идентичность там не хранится'),
        L('git config --global author.name and author.email', 'git config --global author.name и author.email'),
      ],
      correctIndex: 0,
      explanation: L(
        'The identity lives in the configuration: git config --global user.name and git config user.email set it for every repository, while the same commands without --global set it for the current one. The --author flag only overrides the author of a single commit and stores nothing.',
        'Идентичность лежит в конфигурации: git config --global user.name и git config user.email задают её для всех репозиториев, а те же команды без --global — только для текущего. Флаг --author переопределяет автора у одного коммита и ничего не сохраняет.'
      ),
    },
    {
      id: 'git-q48',
      question: L('What does git blame tell you?', 'Что сообщает git blame?'),
      options: [
        L('Which commit introduced the current branch', 'Какой коммит ввёл текущую ветку'),
        L('Which files have uncommitted changes', 'В каких файлах есть незакоммиченные изменения'),
        L('Which commit last changed each line of a file', 'Какой коммит последним менял каждую строку файла'),
        L('Who is the author of the whole repository', 'Кто является автором всего репозитория'),
      ],
      correctIndex: 2,
      explanation: L(
        'git blame walks the history of a file and points at the commit that last touched each line, which is the fastest way to find out why a line looks the way it does. It is not about branches or uncommitted changes, and it does not attribute the repository as a whole.',
        'git blame проходит по истории файла и указывает коммит, который последним менял каждую строку — самый быстрый способ понять, откуда взялась та или иная строка. Это не про ветки и не про незакоммиченные изменения и не про авторство репозитория в целом.'
      ),
    },
    {
      id: 'git-q49',
      question: L('What problem does git worktree solve?', 'Какую проблему решает git worktree?'),
      options: [
        L('It creates a second clone of the repository on disk', 'Он создаёт второй клон репозитория на диске'),
        L('It lets you check out another branch in a second directory while keeping the current one untouched', 'Он позволяет выставить другую ветку во втором каталоге, не трогая текущий'),
        L('It compresses the repository objects to save disk space', 'Он сжимает объекты репозитория, чтобы сэкономить место'),
        L('It lets you push the same commit to several remotes at once', 'Он позволяет отправить один и тот же коммит сразу в несколько remote'),
      ],
      correctIndex: 1,
      explanation: L(
        'A worktree is a second working directory attached to the same repository, so you can check out a review branch and run the tests without touching the working tree of your feature branch. It is not a clone: the objects and the history are shared, and it has nothing to do with compression or pushing.',
        'Worktree — это второй рабочий каталог, подключённый к тому же репозиторию: можно выставить ревью-ветку и прогнать тесты, не трогая рабочее дерево своей feature-ветки. Это не клон: объекты и история общие, и к сжатию или push он отношения не имеет.'
      ),
    },
    {
      id: 'git-q50',
      question: L('You cloned a large repository only to look at one file. How do you get a smaller copy?', 'Вы клонировали большой репозиторий, чтобы посмотреть один файл. Как получить меньшую копию?'),
      options: [
        L('git clone --single-branch, which downloads only the objects of the current branch', 'git clone --single-branch, которая скачивает только объекты текущей ветки'),
        L('git fetch --depth 1 origin, which converts an existing clone into a shallow one', 'git fetch --depth 1 origin, превращающая существующий клон в поверхностный'),
        L('git clone --filter blob:none, which removes the history from the clone', 'git clone --filter blob:none, удаляющая историю из клона'),
        L('git clone --depth 1 <url>, which fetches only the latest commit and creates a shallow repository', 'git clone --depth 1 <url>, которая забирает только последний коммит и создаёт поверхностный репозиторий'),
      ],
      correctIndex: 3,
      explanation: L(
        'The --depth 1 option creates a shallow clone: it fetches just the tip commit, so it is much faster and smaller, at the cost of not having the history locally. --single-branch limits the branches, not the history, and a shallow clone is created at clone time rather than converted afterwards.',
        'Опция --depth 1 создаёт поверхностный клон: забирается только кончиковый коммит, так что копия быстрее и меньше, но локальной истории нет. --single-branch ограничивает ветки, а не историю, и поверхностный клон создаётся именно при клонировании, а не преобразуется потом.'
      ),
    },
  ],
};
