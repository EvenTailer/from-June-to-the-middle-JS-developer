import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitTasks: PracticeTask[] = [
  {
    id: 'topic-git-1',
    moduleId: 'git',
    topic: 'git',
    level: 'basic',
    title: L('Cut branches with a naming convention', 'Создавать ветки по соглашению имён'),
    brief: L(
      'You are on the main branch with a clean working tree. Create three new branches that all start from the current commit: feature/checkout-redirect for new work, bugfix/cart-total for a fix, and hotfix/login-500 for a critical production fix that must be based on the tip of main. Use git switch -c for the first two branches and git switch -c hotfix/login-500 main for the third one. Finish on the feature/checkout-redirect branch and print the local branches with git branch --list.',
      'Вы находитесь на ветке main с чистым рабочим деревом. Создайте три новые ветки, все они начинаются с текущего коммита: feature/checkout-redirect для новой работы, bugfix/cart-total для исправления и hotfix/login-500 для срочного исправления в продакшене, которое должно быть основано на кончике main. Для первых двух используйте git switch -c, для третьей — git switch -c hotfix/login-500 main. В конце останьтесь на ветке feature/checkout-redirect и выведите локальные ветки через git branch --list.'
    ),
    hint: L(
      'git switch -c creates the branch and checks it out in one step, so the working tree is not copied anywhere. A hotfix must be cut from main, not from the feature branch, otherwise the unfinished feature would travel to production.',
      'git switch -c создаёт ветку и сразу переключается на неё, поэтому рабочее дерево никуда не копируется. Хотфикс нужно резать от main, а не от feature-ветки, иначе незаконченная фича уедет в продакшен.'
    ),
    solution: `git switch -c feature/checkout-redirect
git switch -c bugfix/cart-total
git switch main
git switch -c hotfix/login-500 main
git switch feature/checkout-redirect
git branch --list`,
    explanation: L(
      'git switch -c <name> creates a branch that points at the current commit and moves HEAD to it, so the files on disk stay exactly where they were and nothing is copied. Because every new branch starts from the same commit, the three branches are equal until you commit on them. The hotfix is created from main explicitly, so it contains only the released code and not the work of the feature branch. In the output of git branch --list the current branch is marked with an asterisk.',
      'git switch -c <имя> создаёт ветку, указывающую на текущий коммит, и переводит HEAD на неё, поэтому файлы на диске остаются на месте и ничего не копируется. Все три новые ветки начинаются с одного и того же коммита и разойдутся только после ваших коммитов. Хотфикс создаётся от main явно, поэтому в нём только выпущенный код, а не работа из feature-ветки. В выводе git branch --list текущая ветка помечена звёздочкой.'
    ),
  },
  {
    id: 'topic-git-2',
    moduleId: 'git',
    topic: 'git',
    level: 'basic',
    title: L('Fix the message of the last commit', 'Исправить сообщение последнего коммита'),
    brief: L(
      'You have just committed with a useless message: git commit -m "fix". The content of the commit is correct, only the message is wrong, and the commit has not been pushed yet. Rewrite the message to "fix: validate cart total before checkout" without changing a single line of the code that was committed. Then print the subject line of the new commit with git log -1 --pretty=%s and check that the file list of the commit did not change.',
      'Вы только что сделали коммит с бесполезным сообщением: git commit -m "fix". Содержимое коммита правильное, неверно только сообщение, и коммит ещё не отправлен в remote. Перепишите сообщение на "fix: validate cart total before checkout", не изменив ни одной строки закоммиченного кода. Затем выведите тему нового коммита командой git log -1 --pretty=%s и убедитесь, что список файлов коммита не изменился.'
    ),
    hint: L(
      'The command git commit --amend replaces the tip commit with a new one built from the current index. The tree and the diff stay the same, only the message and the hash change.',
      'Команда git commit --amend заменяет последний коммит новым, собранным из текущего индекса. Дерево и дифф остаются прежними, меняются только сообщение и хеш.'
    ),
    solution: `git commit --amend -m "fix: validate cart total before checkout"
git log -1 --pretty=%s
git show --stat --oneline HEAD`,
    explanation: L(
      'git commit --amend does not touch the working tree: it builds a brand new commit from whatever is currently staged and makes it the tip of the branch. The files, the diff and the author stay the same, so the amend changes the message and nothing else, except for the hash, because the hash covers the message too. That is why amending is safe before the push and dangerous after it: a pushed commit that is rewritten forces everybody to rebase, and the old hash is still in the remote history.',
      'git commit --amend не трогает рабочее дерево: он собирает полностью новый коммит из того, что сейчас в индексе, и делает его вершиной ветки. Файлы, дифф и автор остаются прежними, поэтому amend меняет только сообщение — и хеш тоже, потому что хеш покрывает и сообщение. Поэтому amend безопасен до push и опасен после: переписанный отправленный коммит заставляет всех перебазироваться, а старый хеш всё ещё остаётся в истории remote.'
    ),
  },
  {
    id: 'topic-git-3',
    moduleId: 'git',
    topic: 'git',
    level: 'basic',
    title: L('Undo staged changes in two steps', 'Отменить проиндексированные изменения в два шага'),
    brief: L(
      'The file src/app.ts was edited and staged with git add src/app.ts, but the change is wrong and has to be thrown away completely. First unstage the file so that it is shown as an unstaged modification again, then restore its content from the last commit so that the working tree is clean. Finish with git status --short: the output must be empty. Use git restore --staged for the first step and git restore for the second one.',
      'Файл src/app.ts был изменён и проиндексирован командой git add src/app.ts, но изменение неверное и его нужно полностью выбросить. Сначала отмените индексацию, чтобы файл снова показывался как непроиндексированное изменение, затем восстановите его содержимое из последнего коммита, чтобы рабочее дерево стало чистым. Завершите командой git status --short: вывод должен быть пустым. Для первого шага используйте git restore --staged, для второго — git restore.'
    ),
    hint: L(
      'git restore --staged only touches the index, git restore touches the working tree. The same split works for a single file and for the whole tree with a dot.',
      'git restore --staged трогает только индекс, git restore — рабочее дерево. Такое же деление работает и для одного файла, и для всего дерева точкой.'
    ),
    solution: `git restore --staged src/app.ts
git restore src/app.ts
git status --short`,
    explanation: L(
      'There are two different places where a change can live: the working tree, which is what you edit, and the index, which is what the next commit will contain. git restore --staged copies the version of src/app.ts from HEAD into the index, so the file is no longer staged but the edit is still on disk. git restore then copies the same version into the working tree as well, and the edit is gone. git status --short prints one line per changed file, so an empty output means the tree is clean.',
      'Изменение может лежать в двух разных местах: в рабочем дереве, которое вы правите, и в индексе, который попадёт в следующий коммит. git restore --staged копирует версию src/app.ts из HEAD в индекс, и файл больше не проиндексирован, но правка осталась на диске. Затем git restore копирует ту же версию в рабочее дерево, и правка исчезает. git status --short печатает по строке на каждый изменённый файл, поэтому пустой вывод означает чистое дерево.'
    ),
  },
  {
    id: 'topic-git-4',
    moduleId: 'git',
    topic: 'git',
    level: 'intermediate',
    title: L('Review the branch before pushing it', 'Проверить ветку перед отправкой'),
    brief: L(
      'The branch feature/pricing contains three commits that are not on main yet. Build a review report with three commands. First the list of the commits that main does not have: git log --oneline main..HEAD. Then the summary of the changed files with the number of inserted and deleted lines: git diff --stat main...HEAD. Then the full diff of the branch against main: git diff main...HEAD. The diff commands must use three dots, because the comparison has to start from the merge base of the branch and main, otherwise the report would also contain the commits of main itself.',
      'Ветка feature/pricing содержит три коммита, которых ещё нет в main. Соберите отчёт для ревью тремя командами. Сначала список коммитов, которых нет в main: git log --oneline main..HEAD. Затем сводку изменённых файлов с числом добавленных и удалённых строк: git diff --stat main...HEAD. Затем полный дифф ветки относительно main: git diff main...HEAD. В командах diff должно быть три точки, потому что сравнение должно идти от точки слияния ветки и main, иначе в отчёт попадут ещё и коммиты самого main.'
    ),
    hint: L(
      'Two dots in git log mean "commits reachable from one side only", three dots in git diff mean "compare with the merge base". The merge base is where the branch was forked from main.',
      'Две точки в git log означают "коммиты, достижимые только с одной стороны", три точки в git diff — "сравнить с точкой слияния". Точка слияния — это место, где ветка отделилась от main.'
    ),
    solution: `git log --oneline main..HEAD
git diff --stat main...HEAD
git diff main...HEAD`,
    explanation: L(
      'The two dots in main..HEAD select the commits that exist only in HEAD, which is exactly the list of what the push will add. The three dots in main...HEAD change the meaning of the diff: instead of comparing the tips of the two branches, git finds the merge base, the commit where the branch forked from main, and compares the branch with it. That gives the changes of the branch alone and keeps the commits of main out of the report. Using two dots in a diff would show the main commits as deletions, which is misleading in a review.',
      'Две точки в main..HEAD выбирают коммиты, которые есть только в HEAD, — это ровно список того, что добавит push. Три точки в main...HEAD меняют смысл диффа: вместо сравнения вершин веток git находит точку слияния, то есть коммит, от которого ветка отделилась от main, и сравнивает ветку с ним. Так в отчёт попадают только изменения ветки, а коммиты main остаются за кадром. Две точки в диффе показали бы коммиты main как удалённые, что в ревью сбивает с толку.'
    ),
  },
  {
    id: 'topic-git-5',
    moduleId: 'git',
    topic: 'git',
    level: 'intermediate',
    title: L('Cherry-pick a hotfix commit', 'Перенести hotfix-коммит через cherry-pick'),
    brief: L(
      'A colleague fixed the production crash in the commit 9f3c1a2 on the branch hotfix/login-500. You are on feature/pricing and you need exactly that one commit in your branch. Apply it with git cherry-pick 9f3c1a2. If the cherry-pick stops because of a conflict, resolve the file, stage it with git add and finish with git cherry-pick --continue; if you change your mind, git cherry-pick --abort returns the repository to the state before the attempt. Also write the variant that applies the changes without creating a commit, so that you can commit them yourself with your own message.',
      'Коллега починил падение в продакшене коммитом 9f3c1a2 в ветке hotfix/login-500. Вы на ветке feature/pricing, и вам нужен ровно этот один коммит. Примените его командой git cherry-pick 9f3c1a2. Если cherry-pick остановится из-за конфликта, разрулите файл, проиндексируйте его через git add и завершите через git cherry-pick --continue; если передумаете, git cherry-pick --abort вернёт репозиторий в состояние до попытки. Напишите также вариант, который применяет изменения без создания коммита, чтобы вы потом закоммитили их своим сообщением.'
    ),
    hint: L(
      'cherry-pick copies a single commit: it applies the diff of that commit on top of your current HEAD and creates a new commit with the original author. The option --no-commit applies the changes and stops.',
      'cherry-pick копирует один коммит: применяет его дифф поверх текущего HEAD и создаёт новый коммит с автором оригинала. Опция --no-commit применяет изменения и останавливается.'
    ),
    solution: `git cherry-pick 9f3c1a2

# when the cherry-pick stopped with a conflict, resolve the file, stage it and continue:
# git add src/auth/session.ts
# git cherry-pick --continue
# to cancel the whole attempt instead:
# git cherry-pick --abort

# the same changes without a commit of their own, run on a clean tree:
# git cherry-pick --no-commit 9f3c1a2
# git commit -m "fix: cherry-pick the login hotfix"`,
    explanation: L(
      'cherry-pick takes the diff of one commit and replays it on top of your current HEAD, so a single fix can travel between branches without merging the whole branch. The new commit keeps the original author but gets a new hash, because its parent is different. A conflict is not a crash: git stops, leaves the conflicted files in the working tree, and waits. After you resolve and stage the files, --continue creates the commit, and --abort rolls the whole operation back. The --no-commit variant is the safe one when you want to fold the fix into your own commit or to inspect the result first.',
      'cherry-pick берёт дифф одного коммита и переигрывает его поверх текущего HEAD, поэтому отдельный фикс можно перенести между ветками без слияния всей ветки. Новый коммит сохраняет автора оригинала, но получает новый хеш, потому что его родитель другой. Конфликт — не авария: git останавливается, оставляет конфликтные файлы в рабочем дереве и ждёт. После разруливания и индексации файлов --continue создаёт коммит, а --abort откатывает всю операцию. Вариант --no-commit безопасен, когда вы хотите влить фикс в свой коммит или сначала посмотреть на результат.'
    ),
  },
  {
    id: 'topic-git-6',
    moduleId: 'git',
    topic: 'git',
    level: 'advanced',
    title: L('Write a release checklist script', 'Написать скрипт чек-листа релиза'),
    brief: L(
      'Write a bash script release.sh that checks the release preconditions and then releases. The script must: stop with an error when the working tree is dirty, which is checked with git diff --quiet and git diff --cached --quiet; stop with an error when the current branch is not main, which is read with git rev-parse --abbrev-ref HEAD; print the version taken from the version field of package.json with node -p; create an annotated tag v<version> on the current commit with git tag -a; push the branch and the tag to origin. The script must start with set -euo pipefail so that it stops at the first failed command, and it must end with a non zero exit code when a check fails.',
      'Напишите bash-скрипт release.sh, который проверяет предпосылки релиза и затем выпускает. Скрипт должен: останавливаться с ошибкой, если рабочее дерево грязное — это проверяется через git diff --quiet и git diff --cached --quiet; останавливаться с ошибкой, если текущая ветка не main — её читает git rev-parse --abbrev-ref HEAD; печатать версию из поля version файла package.json через node -p; создавать аннотированный тег v<version> на текущем коммите через git tag -a; отправлять ветку и тег в origin. Скрипт должен начинаться с set -euo pipefail, чтобы останавливаться на первой неудачной команде, и завершаться ненулевым кодом, если проверка не прошла.'
    ),
    hint: L(
      'git diff --quiet exits with 0 when there is no difference and with 1 when there is one, so it is meant to be used in a condition and not to print anything. node -p prints the value of a JavaScript expression.',
      'git diff --quiet завершается с кодом 0, когда разницы нет, и с кодом 1, когда она есть, поэтому его используют в условии, а не для вывода. node -p печатает значение JavaScript-выражения.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "release aborted: the working tree is not clean" >&2
  exit 1
fi

branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" != "main" ]; then
  echo "release aborted: current branch is $branch, expected main" >&2
  exit 1
fi

version="$(node -p "require('./package.json').version")"
echo "releasing v$version"

git tag -a "v$version" -m "Release v$version"
git push origin main
git push origin "v$version"

echo "released v$version"`,
    explanation: L(
      'set -euo pipefail turns the script into a checklist that cannot slip through: -e stops at the first command that fails, -u treats an unset variable as an error instead of an empty string, and pipefail makes a pipeline fail when any of its parts fails, not only the last one. git diff --quiet and git diff --cached --quiet cover the two places a change can hide, the working tree and the index, and their exit codes are inverted compared with what you expect: 0 means "no differences", so the negation in the condition is what detects a dirty tree. git rev-parse --abbrev-ref HEAD prints the short name of the current branch, and node -p reads the version without needing another tool. The tag is created annotated, with -a and a message, so it carries the author and the date and can be pushed like a branch.',
      'set -euo pipefail превращает скрипт в чек-лист, который не может проскочить: -e останавливает на первой неудачной команде, -u считает неустановленную переменную ошибкой вместо пустой строки, а pipefail заставляет конвейер падать при ошибке в любой его части, а не только в последней. git diff --quiet и git diff --cached --quiet закрывают два места, где может прятаться изменение, рабочее дерево и индекс, и их коды выхода обратны ожидаемому: 0 означает "разницы нет", поэтому именно отрицание в условии ловит грязное дерево. git rev-parse --abbrev-ref HEAD печатает короткое имя текущей ветки, а node -p читает версию без лишних инструментов. Тег создаётся аннотированным, с -a и сообщением, поэтому в нём есть автор и дата и его можно отправить как ветку.'
    ),
  },
  {
    id: 'topic-git-7',
    moduleId: 'git',
    topic: 'git',
    level: 'advanced',
    title: L('Find the first bad commit with bisect', 'Найти первый плохой коммит через bisect'),
    brief: L(
      'A regression appeared somewhere in the last ten commits, and you know that HEAD~10 is still good. Find the first bad commit automatically. Start the bisect with git bisect start, mark the current commit as bad with git bisect bad and the known good commit with git bisect good HEAD~10. Then let git drive the test itself: the script ./test.sh must exit with 0 when the build is healthy and with a non zero code when the bug is present, and it is launched with git bisect run ./test.sh. When the search is over, leave the repository with git bisect reset, which returns you to the branch you started from.',
      'Регрессия появилась где-то в последних десяти коммитах, и вы знаете, что HEAD~10 ещё хороший. Найдите первый плохой коммит автоматически. Запустите bisect командой git bisect start, отметьте текущий коммит как плохой через git bisect bad, а известный хороший — через git bisect good HEAD~10. Затем позвольте git самому гонять тест: скрипт ./test.sh должен завершаться с кодом 0, когда сборка здорова, и с ненулевым кодом, когда баг присутствует, запускается он через git bisect run ./test.sh. Когда поиск закончится, приведите репозиторий в порядок командой git bisect reset, которая вернёт вас на исходную ветку.'
    ),
    hint: L(
      'Bisect works with a binary search: it checks out the middle commit of the range and asks you to judge it. The run mode answers that question for you by running a script, so the script must return 0 for good and 125 to skip the commit.',
      'Bisect работает как бинарный поиск: он выставляет средний коммит диапазона и просит оценить его. Режим run отвечает за вас, запуская скрипт, поэтому скрипт должен возвращать 0 для хорошего коммита и 125, чтобы пропустить коммит.'
    ),
    solution: `git bisect start
git bisect bad
git bisect good HEAD~10
git bisect run ./test.sh
git bisect reset`,
    explanation: L(
      'bisect turns "which commit broke it" into a binary search over the range between the known good and the known bad commit. The commands start, bad and good build that range, and then git checks out the middle commit and waits for a verdict. The run mode replaces your verdict with the exit code of a script, which is what makes the search fully automatic: 0 means good, 1 to 124 means bad, and the special code 125 means the commit cannot be tested and must be skipped. With ten commits the search needs about four steps. git bisect reset is mandatory at the end, because the bisect state keeps a detached HEAD and a file in .git that would confuse every later command.',
      'bisect превращает вопрос "какой коммит всё сломал" в бинарный поиск по диапазону между известным хорошим и известным плохим коммитом. Команды start, bad и good строят этот диапазон, после чего git выставляет средний коммит и ждёт вердикта. Режим run заменяет ваш вердикт кодом выхода скрипта, и именно это делает поиск полностью автоматическим: 0 значит хорошо, от 1 до 124 — плохо, а специальный код 125 означает, что коммит проверить нельзя и его надо пропустить. Для десяти коммитов поиск занимает около четырёх шагов. git bisect reset обязателен в конце, потому что состояние bisect держит отсоединённый HEAD и файл в .git, который запутает любую следующую команду.'
    ),
  },
  {
    id: 'topic-git-8',
    moduleId: 'git',
    topic: 'git',
    level: 'advanced',
    title: L('Review a branch in a separate worktree', 'Проверить ветку в отдельном worktree'),
    brief: L(
      'You are on main and you must review the branch feature/pricing without disturbing the working tree you are sitting in. Create a linked worktree in the folder ../review-pricing that checks out the branch feature/pricing, list all the worktrees with git worktree list, create a throwaway branch review/tmp inside the worktree and commit a file REVIEW.md there. Then remove the worktree with git worktree remove --force ../review-pricing and clean the leftover metadata with git worktree prune. The main working tree must keep its own branch and its own files.',
      'Вы на ветке main и должны проверить ветку feature/pricing, не трогая рабочее дерево, в котором находитесь. Создайте связанный worktree в папке ../review-pricing, который выставляет ветку feature/pricing, выведите список всех worktree через git worktree list, создайте внутри worktree одноразовую ветку review/tmp и закоммитьте туда файл REVIEW.md. Затем удалите worktree командой git worktree remove --force ../review-pricing и уберите оставшиеся метаданные через git worktree prune. Основное рабочее дерево должно сохранить свою ветку и свои файлы.'
    ),
    hint: L(
      'A worktree is a second checkout of the same repository: it has its own HEAD, its own index and its own files, but it shares the object database and the refs with the main checkout.',
      'Worktree — это вторая выгрузка того же репозитория: у неё свой HEAD, свой индекс и свои файлы, но она разделяет базу объектов и ссылки с основной выгрузкой.'
    ),
    solution: `git worktree add ../review-pricing feature/pricing
git worktree list

cd ../review-pricing
git switch -c review/tmp
echo "review notes" > REVIEW.md
git add REVIEW.md
git commit -m "chore: add review notes"
cd -

git worktree remove --force ../review-pricing
git worktree prune
git worktree list`,
    explanation: L(
      'git worktree add checks out a second copy of the repository in another folder, so you can build, test or review another branch while your current branch keeps its files and its index. The worktrees share the object database and the refs, so a commit made in one of them is immediately visible in the other, and there is no need to stash or to switch branches. git worktree list shows every worktree with its path, its branch and its HEAD. The --force option of remove is needed when the worktree still contains uncommitted files, and git worktree prune removes the administrative records of the worktrees whose folders were deleted by hand.',
      'git worktree add выставляет вторую копию репозитория в другой папке, поэтому вы можете собирать, тестировать или ревьюить другую ветку, пока ваша текущая ветка сохраняет свои файлы и свой индекс. Worktree разделяют базу объектов и ссылки, поэтому коммит, сделанный в одном из них, сразу виден в другом, и ни stash, ни переключение веток не нужны. git worktree list показывает все worktree с путём, веткой и HEAD. Опция --force у remove нужна, когда в worktree остались незакоммиченные файлы, а git worktree prune удаляет служебные записи worktree, чьи папки удалили руками.'
    ),
  },
];
