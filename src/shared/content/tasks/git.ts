import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitTasks: PracticeTask[] = [
  {
    id: 'git-task-4',
    topic: 'git',
    level: 'basic',
    title: L('Stash work and restore it later', 'Спрятать работу и вернуть её позже'),
    brief: L(
      'You are halfway through a checkout form when an urgent fix is needed on another branch. Save the worktree state, including untracked files, switch branches, then restore the work exactly as it was.',
      'Вы не закончили форму оформления заказа, а срочно нужен фикс в другой ветке. Сохраните состояние рабочей директории вместе с неотслеживаемыми файлами, переключите ветку, затем верните работу в исходном виде.'
    ),
    hint: L(
      'git stash push -u includes untracked files. git stash pop applies the entry and drops it from the list.',
      'git stash push -u включает неотслеживаемые файлы. git stash pop применяет запись и удаляет её из списка.'
    ),
    solution: `git stash push -u -m "wip: checkout validation"

git switch hotfix/cart-total
# make and commit the urgent fix

git switch feat/checkout
git stash list
git stash pop`,
    explanation: L(
      'Without -u, new files stay in the worktree and can collide with the branch switch. pop reapplies the changes and, if there are no conflicts, removes the stash. Use apply instead of pop to keep a backup entry until you are sure.',
      'Без -u новые файлы остаются в рабочей директории и могут помешать переключению ветки. pop применяет изменения и, если конфликтов нет, удаляет запись. Используйте apply вместо pop, чтобы сохранить резервную запись, пока не убедитесь в результате.'
    ),
  },
  {
    id: 'git-task-5',
    topic: 'git',
    level: 'basic',
    title: L('Resolve a merge conflict', 'Разрешить merge-конфликт'),
    brief: L(
      'Merging feat/cart-discount into main conflicts in src/cart.ts. Resolve the conflict, keep both the discount and the tax calculation, verify the result and finish the merge.',
      'При вливании feat/cart-discount в main возникает конфликт в src/cart.ts. Разрешите его, сохранив и скидку, и расчёт налога, проверьте результат и завершите merge.'
    ),
    hint: L(
      'Edit the file, remove the conflict markers, stage only the resolved file, then run git commit. Use git merge --abort to back out.',
      'Отредактируйте файл, удалите маркеры конфликта, добавьте в индекс только разрешённый файл и выполните git commit. Для отмены используйте git merge --abort.'
    ),
    solution: `git switch main
git pull --ff-only
git merge feat/cart-discount

# CONFLICT (content): Merge conflict in src/cart.ts
git status

# edit src/cart.ts and delete the markers:
# <<<<<<< HEAD
# =======
# >>>>>>> feat/cart-discount

# keep both changes, for example:
# const total = applyDiscount(subtotal) * (1 + taxRate);

git add src/cart.ts
git diff --staged
git commit
git push`,
    explanation: L(
      'A conflict is Git asking which version to keep. Stage only files you have actually fixed; any file left with markers will be committed as broken code. git diff --staged shows exactly what will enter the merge commit. If the resolution goes wrong, git merge --abort returns to the pre-merge state.',
      'Конфликт — это вопрос Git, какую версию оставить. Добавляйте в индекс только действительно исправленные файлы; файл с маркерами попадёт в коммит как сломанный код. git diff --staged показывает, что именно войдёт в merge-коммит. Если разрешение не удалось, git merge --abort вернёт состояние до merge.'
    ),
  },
  {
    id: 'git-task-6',
    topic: 'git',
    level: 'basic',
    title: L('Clean build artifacts safely', 'Безопасно удалить артефакты сборки'),
    brief: L(
      'The repository is full of generated folders. Preview what would be removed, delete untracked build output while keeping the local .env.local file, then remove ignored files only.',
      'Репозиторий заполнен сгенерированными папками. Посмотрите, что будет удалено, удалите неотслеживаемые артефакты сборки, сохранив локальный .env.local, затем удалите только игнорируемые файлы.'
    ),
    hint: L(
      'Always dry-run with -n. -e excludes a pattern, -d includes directories, and -X limits the run to ignored files.',
      'Всегда делайте пробный запуск с -n. -e исключает шаблон, -d включает каталоги, а -X ограничивает запуск игнорируемыми файлами.'
    ),
    solution: `git clean -nd
git clean -fd -e .env.local

git clean -ndX
git clean -fdX

git status`,
    explanation: L(
      'git clean -nd lists what would disappear without deleting anything. -fd removes untracked files and directories, while -e .env.local protects the secret. -X removes only ignored files, which is usually what build output is. Never run -fdx until you have read the -nd output: -x also deletes ignored local secrets and caches.',
      'git clean -nd показывает, что будет удалено, ничего не трогая. -fd удаляет неотслеживаемые файлы и каталоги, а -e .env.local защищает секрет. -X удаляет только игнорируемые файлы — обычно именно ими является вывод сборки. Не запускайте -fdx, пока не прочитали вывод -nd: -x удаляет и игнорируемые локальные секреты, и кеши.'
    ),
  },
  {
    id: 'git-task-7',
    topic: 'git',
    level: 'intermediate',
    title: L('Rebase a feature onto main', 'Перебазировать feature на main'),
    brief: L(
      'Your feature branch was created a week ago and main has moved on. Replay the feature commits on top of the latest origin/main, resolve any conflicts, and update the remote branch.',
      'Ваша feature-ветка создана неделю назад, а main ушёл вперёд. Переиграйте коммиты фичи поверх свежего origin/main, разрешите конфликты и обновите удалённую ветку.'
    ),
    hint: L(
      'Fetch first, rebase onto origin/main, then push with --force-with-lease because history changed.',
      'Сначала выполните fetch, затем rebase на origin/main и отправьте с --force-with-lease, потому что история изменилась.'
    ),
    solution: `git switch feat/search
git fetch origin
git log --oneline origin/main..HEAD

git rebase origin/main

# if a commit conflicts:
git status
# edit the files, then
git add src/search/SearchForm.tsx
git rebase --continue

git push --force-with-lease`,
    explanation: L(
      'Rebase replays each feature commit on top of origin/main, producing a linear history without a merge commit. Never rebase a branch other people are working on. --force-with-lease refuses to overwrite the remote if someone pushed after your last fetch, which makes it safer than --force.',
      'Rebase переигрывает каждый коммит фичи поверх origin/main, создавая линейную историю без merge-коммита. Никогда не перебазируйте ветку, над которой работают другие. --force-with-lease откажется перезаписывать удалённую ветку, если после вашего fetch туда уже что-то отправили, поэтому он безопаснее --force.'
    ),
  },
  {
    id: 'git-task-8',
    topic: 'git',
    level: 'intermediate',
    title: L('Squash a messy feature branch', 'Схлопнуть грязную feature-ветку'),
    brief: L(
      'A feature branch contains a commit, two typo fixes and a test commit. Combine them into one clean commit with a conventional message before merging.',
      'В feature-ветке есть коммит с фичей, два исправления опечаток и коммит с тестами. Объедините их в один аккуратный коммит с conventional-сообщением перед вливанием.'
    ),
    hint: L(
      'Interactive rebase from origin/main: keep the first commit as pick and mark the rest as squash or fixup.',
      'Интерактивный rebase от origin/main: оставьте первый коммит как pick, остальные пометьте squash или fixup.'
    ),
    solution: `git switch feat/signup
git log --oneline origin/main..HEAD

git rebase -i origin/main

# editor opens:
# pick   1a2b3c4 feat: add signup form
# squash 5d6e7f8 fix: typo in signup form
# squash 9a0b1c2 test: cover signup validation

# write the final message, for example:
# feat: add signup form with validation tests

git log --oneline -n 3
git push --force-with-lease`,
    explanation: L(
      'The rebase todo list is processed from top to bottom. pick keeps a commit, squash merges it into the previous one and asks for a combined message, fixup does the same without asking. Squashing before merge keeps main readable and makes a later revert remove the whole feature.',
      'Список задач rebase обрабатывается сверху вниз. pick оставляет коммит, squash вливает его в предыдущий и запрашивает общее сообщение, fixup делает то же без запроса. Схлопывание перед merge сохраняет main читаемым и позволяет позже откатить всю фичу одним revert.'
    ),
  },
  {
    id: 'git-task-9',
    topic: 'git',
    level: 'intermediate',
    title: L('Cherry-pick a hotfix to release', 'Перенести хотфикс в release через cherry-pick'),
    brief: L(
      'A session-expiry fix was committed on develop, but release/1.4 needs it now. Copy that single commit onto the release branch, resolve a conflict if one appears, and push the branch.',
      'Исправление истечения сессии закоммичено в develop, но release/1.4 нужно уже сейчас. Перенесите этот один коммит в release-ветку, разрешите конфликт при его появлении и отправьте ветку.'
    ),
    hint: L(
      'Find the SHA with git log, switch to release/1.4, then run git cherry-pick -x <sha>.',
      'Найдите SHA через git log, переключитесь на release/1.4 и выполните git cherry-pick -x <sha>.'
    ),
    solution: `git switch develop
git log --oneline -n 20

git switch release/1.4
git cherry-pick -x 4f2a9c1

# if the commit conflicts:
git status
# resolve the files
git add src/session.ts
git cherry-pick --continue

git push -u origin release/1.4`,
    explanation: L(
      'cherry-pick creates a new commit with the same change but a new hash, so Git still sees two different commits on the two branches. -x adds a line naming the original commit, which helps future archaeology. Cherry-pick merge commits only with -m and a parent number.',
      'cherry-pick создаёт новый коммит с тем же изменением, но новым хешем, поэтому для Git это два разных коммита в двух ветках. -x добавляет строку с исходным коммитом, что помогает будущему разбору истории. Cherry-pick merge-коммитов возможен только с -m и номером родителя.'
    ),
  },
  {
    id: 'git-task-10',
    topic: 'git',
    level: 'intermediate',
    title: L('Create and publish an annotated release tag', 'Создать и опубликовать аннотированный тег релиза'),
    brief: L(
      'Mark the current main as version 1.4.0 with an annotated tag containing a release message, verify the tag object, and push only that tag to origin.',
      'Помечьте текущий main версией 1.4.0 аннотированным тегом с сообщением о релизе, проверьте объект тега и отправьте на origin только этот тег.'
    ),
    hint: L(
      'git tag -a creates an annotated tag. Push it by name, not with --tags, unless every local tag should be published.',
      'git tag -a создаёт аннотированный тег. Отправляйте его по имени, а не через --tags, если публиковать нужно не все локальные теги.'
    ),
    solution: `git switch main
git pull --ff-only
git log --oneline -n 5

git tag -a v1.4.0 -m "Release 1.4.0: search and checkout fixes"
git show v1.4.0

git push origin v1.4.0`,
    explanation: L(
      'An annotated tag is a real Git object with a tagger, date and message; a lightweight tag is only a ref. Release tooling and git describe use the annotation. Pushing one tag by name avoids accidentally publishing experimental tags that exist only on your machine.',
      'Аннотированный тег — настоящий объект Git с автором, датой и сообщением; лёгкий тег — лишь ссылка. Инструменты релизов и git describe используют аннотацию. Отправка одного тега по имени не даёт случайно опубликовать экспериментальные теги, существующие только локально.'
    ),
  },
  {
    id: 'git-task-11',
    topic: 'git',
    level: 'advanced',
    title: L('Find a regression with git bisect', 'Найти регрессию через git bisect'),
    brief: L(
      'A test started failing somewhere between v1.2.0 and HEAD. Find the first bad commit automatically by running the test suite at each bisect step, then return the repository to its original state.',
      'Тест начал падать где-то между v1.2.0 и HEAD. Найдите первый плохой коммит автоматически, запуская тесты на каждом шаге bisect, затем верните репозиторий в исходное состояние.'
    ),
    hint: L(
      'git bisect run treats exit code 0 as good, 1 as bad and 125 as skip. Always finish with git bisect reset.',
      'git bisect run считает код выхода 0 хорошим, 1 плохим, а 125 — пропущенным. Всегда завершайте через git bisect reset.'
    ),
    solution: `git switch main
git bisect start HEAD v1.2.0

git bisect run npm test -- --runInBand

# output ends with:
# <sha> is the first bad commit

git bisect reset
git show HEAD`,
    explanation: L(
      'Bisect performs a binary search over the commit range, so 100 commits need about seven test runs. The run subcommand automates the good/bad answers. reset restores the branch and HEAD from before the bisect; skipping it leaves you on a detached bisect commit.',
      'Bisect выполняет бинарный поиск по диапазону коммитов, поэтому для 100 коммитов нужно около семи запусков. Подкоманда run автоматизирует ответы good/bad. reset возвращает ветку и HEAD к состоянию до bisect; без него вы останетесь на отдельном bisect-коммите.'
    ),
  },
  {
    id: 'git-task-12',
    topic: 'git',
    level: 'advanced',
    title: L('Recover a deleted branch with reflog', 'Восстановить удалённую ветку через reflog'),
    brief: L(
      'A branch with two unmerged commits was deleted by mistake. Find the lost commit through the reflog and recreate the branch at that point.',
      'Ветку с двумя невлитыми коммитами случайно удалили. Найдите потерянный коммит через reflog и воссоздайте ветку на этом месте.'
    ),
    hint: L(
      'git reflog records every HEAD movement. Use git switch -c <branch> <sha> or git branch <branch> <sha>.',
      'git reflog фиксирует каждое перемещение HEAD. Используйте git switch -c <branch> <sha> или git branch <branch> <sha>.'
    ),
    solution: `git reflog --date=iso

# example:
# 3f9c2a1 HEAD@{2}: checkout: moving from feat/import to main
# 8b1d7e0 HEAD@{3}: commit: test: cover CSV import

git switch -c feat/import 3f9c2a1
git log --oneline -n 3
git branch --contains 3f9c2a1`,
    explanation: L(
      'The reflog is a local log of where HEAD and branches pointed, including commits no longer reachable from any branch. It is not pushed and is eventually pruned by garbage collection, so recover quickly. If the entry is gone, git fsck --lost-found can sometimes find dangling commits.',
      'Reflog — локальный журнал перемещений HEAD и веток, включая коммиты, больше не достижимые ни из одной ветки. Он не отправляется на сервер и со временем очищается сборщиком мусора, поэтому восстанавливайте сразу. Если запись пропала, git fsck --lost-found иногда находит висячие коммиты.'
    ),
  },
  {
    id: 'git-task-13',
    topic: 'git',
    level: 'advanced',
    title: L('Split one commit into conventional commits', 'Разбить коммит на conventional-коммиты'),
    brief: L(
      'A single commit mixes a feature, a refactor and tests. Split it into three conventional commits so each one can be reviewed and reverted independently.',
      'Один коммит смешивает фичу, рефакторинг и тесты. Разбейте его на три conventional-коммита, чтобы каждый можно было отдельно проверить и откатить.'
    ),
    hint: L(
      'git reset --soft HEAD~1 keeps the changes staged. Unstage everything, then add files or hunks selectively with git add -p.',
      'git reset --soft HEAD~1 сохраняет изменения в индексе. Снимите всё с индекса, затем добавляйте файлы или куски через git add -p.'
    ),
    solution: `git reset --soft HEAD~1
git restore --staged .

git add src/search/SearchForm.tsx
git commit -m "feat(search): add debounced query input"

git add src/search/format.ts
git commit -m "refactor(search): extract query formatting"

git add src/search/SearchForm.test.tsx
git commit -m "test(search): cover debounced input"`,
    explanation: L(
      '--soft moves HEAD back without touching the worktree or index, so nothing is lost. Unstaging gives a clean slate to build commits deliberately. When one file contains several unrelated changes, git add -p stages individual hunks. Conventional prefixes such as feat, fix, refactor and test make history and changelogs predictable.',
      '--soft отодвигает HEAD, не трогая рабочую директорию и индекс, поэтому ничего не теряется. Снятие с индекса даёт чистый старт для осознанной сборки коммитов. Если один файл содержит несколько несвязанных изменений, git add -p добавляет отдельные куски. Префиксы feat, fix, refactor и test делают историю и changelog предсказуемыми.'
    ),
  },
  {
    id: 'git-task-14',
    topic: 'git',
    level: 'advanced',
    title: L('Revert a pushed commit, reset a local one', 'Откатить опубликованный коммит, сбросить локальный'),
    brief: L(
      'A bad commit is already on origin/main, and a separate bad commit exists only in your local unpushed branch. Undo each one without rewriting shared history.',
      'Плохой коммит уже находится в origin/main, а другой плохой коммит есть только в вашей локальной неотправленной ветке. Отмените каждый, не переписывая общую историю.'
    ),
    hint: L(
      'git revert creates a new commit that undoes a published one. git reset rewrites local history and must not be used on a shared branch.',
      'git revert создаёт новый коммит, отменяющий опубликованный. git reset переписывает локальную историю и не должен применяться к общей ветке.'
    ),
    solution: `# published: undo with a new commit
git switch main
git pull --ff-only
git revert --no-edit 8c1d4e2
git push

# local and never pushed: move the branch back
git switch feat/local
git reset --hard HEAD~1`,
    explanation: L(
      'Revert is safe for shared branches because it only adds a commit; everyone who already pulled keeps a consistent history. Reset moves the branch pointer, so a force-push would break other clones. Use --hard only when the discarded changes are truly unwanted; --soft or --mixed keep them.',
      'Revert безопасен для общих веток, потому что только добавляет коммит; у всех, кто уже сделал pull, история остаётся согласованной. Reset двигает указатель ветки, поэтому force-push сломает другие клоны. Используйте --hard, только если отбрасываемые изменения точно не нужны; --soft или --mixed их сохраняют.'
    ),
  },
  {
    id: 'git-task-15',
    topic: 'git',
    level: 'advanced',
    title: L('Review a pull request in a worktree', 'Проверить pull request в отдельном worktree'),
    brief: L(
      'Review and test a remote pull request branch without disturbing your current uncommitted work or switching branches. Create a separate worktree, run the tests, then remove it.',
      'Проверьте и протестируйте ветку удалённого pull request, не трогая текущую незакоммиченную работу и не переключая ветки. Создайте отдельный worktree, запустите тесты, затем удалите его.'
    ),
    hint: L(
      'git worktree add -b creates a new local branch in another directory. Use git worktree list to track it and git worktree remove to clean up.',
      'git worktree add -b создаёт новую локальную ветку в другом каталоге. Используйте git worktree list для учёта и git worktree remove для очистки.'
    ),
    solution: `git fetch origin
git worktree add -b review/upload-timeout ../review-upload origin/fix/upload-timeout

cd ../review-upload
npm ci
npm test

cd -
git worktree remove ../review-upload
git worktree list`,
    explanation: L(
      'A worktree is a second working directory that shares the same object database and refs, so no clone or re-download is needed. Each branch can be checked out in only one worktree. Your main directory keeps its uncommitted changes untouched. remove refuses a dirty worktree, which protects review notes from accidental deletion.',
      'Worktree — вторая рабочая директория, использующая ту же базу объектов и ссылки, поэтому клон и повторная загрузка не нужны. Каждая ветка может быть выгружена только в одном worktree. Основная директория сохраняет незакоммиченные изменения нетронутыми. remove отказывается удалять грязный worktree, защищая заметки ревью от случайной потери.'
    ),
  },
];
