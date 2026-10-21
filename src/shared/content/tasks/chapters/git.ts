import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const gitChapterTasks: PracticeTask[] = [
  {
    id: 'ch-git-ch1-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch1',
    level: 'basic',
    title: L('Read the object model without touching the files', 'Прочитать объектную модель, не трогая файлы'),
    brief: L(
      'Inspect the repository without changing a single file: print the type of HEAD, list the entries of its tree, hash the README without storing it, show the tree the index would commit right now and print the two diffs that separate the working directory, the index and HEAD.',
      'Изучите репозиторий, ничего не меняя: выведите тип HEAD, перечислите записи его дерева, посчитайте хеш README без сохранения, покажите дерево, которое сейчас закоммитит индекс, и напечатайте оба диффа между рабочей директорией, индексом и HEAD.'
    ),
    hint: L(
      'cat-file reads objects, ls-tree lists a tree, hash-object computes a hash without storing it, and write-tree prints the tree that the index describes right now.',
      'cat-file читает объекты, ls-tree перечисляет дерево, hash-object считает хеш, ничего не сохраняя, а write-tree печатает дерево, которое сейчас описывает индекс.'
    ),
    solution: `# what kind of object is HEAD
git cat-file -t HEAD
# -> commit

# the entries of its tree
git ls-tree HEAD
# -> 100644 blob a1b2c3d4    README.md

# hash a file without storing it
git hash-object README.md
# -> 8f1e2d3c4b5a6978

# the tree the index would commit right now
git write-tree
# -> the tree object of the staged state

# the two diffs, they answer different questions
git diff            # working directory vs index
git diff --staged   # index vs HEAD`,
    explanation: L(
      'Git stores snapshots of content, so the objects can be read without checking anything out. The index is a third tree in the middle, and the two diffs are what tell the working directory, the index and HEAD apart from each other. Compare what will really enter the commit.',
      'Git хранит снимки содержимого, поэтому объекты читаются без checkout. Индекс — третье дерево посередине, и именно два диффа отличают рабочую директорию, индекс и HEAD друг от друга. Сравнивать надо то, что реально попадёт в коммит.'
    ),
  },
  {
    id: 'ch-git-ch2-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch2',
    level: 'basic',
    title: L('Stage one hunk and explain why', 'Индексировать хунк и объяснить зачем'),
    brief: L(
      'One file holds three changes and only the bug fix may go into the commit. Stage that hunk alone, review what the index holds, commit with a summary and a body that says why the change exists, then fix the summary with amend while the commit is still private.',
      'В одном файле три изменения, но в коммит может попасть только исправление бага. Проиндексируйте только этот хунк, проверьте содержимое индекса, закоммитьте с резюме и телом, объясняющим, зачем нужна правка, и поправьте резюме через amend, пока коммит ещё не опубликован.'
    ),
    hint: L(
      'git add -p stages hunk by hunk, git diff --staged shows what the index holds, and a message can be piped in with -F-. Amend replaces the commit with a new one.',
      'git add -p индексирует по хункам, git diff --staged показывает содержимое индекса, а сообщение можно передать через -F-. Amend заменяет коммит новым.'
    ),
    solution: `# stage only the hunk with the fix
git add -p src/app.ts
# s splits a hunk, e edits it, q quits

# review the index before committing
git diff --staged --stat

# commit with a summary and a body that explains why
git commit -F- <<'EOF'
Reject expired sessions

The token check compared expiry with < instead of <=, so tokens
were refused one second before they expired.

Fixes #142
EOF

# the summary is wrong, fix it while the commit is still private
git commit --amend`,
    explanation: L(
      'The index stores content, so a partial stage is a deliberate choice about what the commit will contain. The diff of the index is the last review before the snapshot is taken, and amend is safe exactly as long as nobody else has fetched the commit.',
      'Индекс хранит содержимое, поэтому частичная индексация — это осознанный выбор того, что попадёт в коммит. Дифф индекса — последняя проверка перед снимком, и amend безопасен ровно до тех пор, пока коммит никто не забрал.'
    ),
  },
  {
    id: 'ch-git-ch3-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch3',
    level: 'basic',
    title: L('Merge a feature branch and resolve the conflict', 'Слить feature-ветку и разрешить конфликт'),
    brief: L(
      'Create a feature branch from main, merge it back with the merge commit kept visible, and resolve a conflict in src/app.ts by comparing the base, ours and theirs versions. Stage the resolved file, finish the merge and read the graph to prove the merge commit exists.',
      'Создайте feature-ветку от main, влейте её обратно так, чтобы merge-коммит остался виден, и разрешите конфликт в src/app.ts, сравнив версии base, ours и theirs. Проиндексируйте разрешённый файл, завершите слияние и прочитайте граф, чтобы убедиться, что merge-коммит есть.'
    ),
    hint: L(
      'git merge --no-ff always records the meeting point. During a conflict the three versions live in the index as stages one, two and three and can be printed with git show.',
      'git merge --no-ff всегда записывает точку встречи. Во время конфликта три версии живут в индексе как стадии один, два и три, и их можно показать через git show.'
    ),
    solution: `git switch main
git switch -c feature/login
# edit src/app.ts and commit
git add src/app.ts
git commit -m "feat: add the login form"

git switch main
git merge --no-ff feature/login
# CONFLICT (content): Merge conflict in src/app.ts

# the three versions of the file
git show :1:src/app.ts   # base
git show :2:src/app.ts   # ours
git show :3:src/app.ts   # theirs

# edit the file, then stage it and finish
git add src/app.ts
git commit

# the merge commit is in the graph
git log --graph --oneline --all --decorate`,
    explanation: L(
      'A merge compares three versions of a file, and a conflict appears only when both sides changed the same lines. Staging the resolved file replaces the three stages with stage zero, and the merge commit with two parents is what the graph shows at the end.',
      'Слияние сравнивает три версии файла, и конфликт возникает только когда обе стороны меняли одни и те же строки. Индексация разрешённого файла заменяет три стадии стадией ноль, а merge-коммит с двумя родителями и есть то, что показывает граф в конце.'
    ),
  },
  {
    id: 'ch-git-ch4-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch4',
    level: 'intermediate',
    title: L('Uncommit, unstage, restore and revert', 'Отменить коммит, снять индекс, revert'),
    brief: L(
      'The last commit must be undone but its changes must stay in the working tree, one file must be unstaged without losing the edit, another file must come back from an earlier commit, and a commit that is already published must be undone without rewriting history.',
      'Последний коммит нужно отменить, но его изменения должны остаться в рабочей директории, один файл нужно снять с индекса, не теряя правку, другой файл нужно вернуть из более раннего коммита, а уже опубликованный коммит отменить без переписывания истории.'
    ),
    hint: L(
      'A mixed reset moves HEAD and clears the index, restore moves files between the three trees, and revert adds a new commit that undoes an old one.',
      'Смешанный reset двигает HEAD и очищает индекс, restore двигает файлы между тремя деревьями, а revert добавляет новый коммит, отменяющий старый.'
    ),
    solution: `# undo the last commit, keep the changes in the working tree
git reset HEAD~1
# -> Unstaged changes after reset:

# unstage one file, keep the edit on disk
git restore --staged src/app.ts

# take a file back from an earlier commit
git restore --source HEAD~2 src/legacy.ts

# a published commit is undone with a new commit
git log --oneline -3
git revert --no-edit 8c1d4e2`,
    explanation: L(
      'The reset mode follows the intent: a mixed reset keeps the work while releasing the commit, and restore moves a single file without touching history. Revert is the only safe undo for a commit that others already have, because it adds history instead of rewriting it.',
      'Режим reset выбирается по намерению: смешанный reset оставляет работу, но освобождает коммит, а restore двигает один файл, не трогая историю. Revert — единственная безопасная отмена для чужого коммита, потому что он добавляет историю, а не переписывает её.'
    ),
  },
  {
    id: 'ch-git-ch5-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch5',
    level: 'intermediate',
    title: L('Update a branch from the remote and publish it safely', 'Обновить ветку с сервера и опубликовать безопасно'),
    brief: L(
      'Your feature branch is behind origin/main and its history was rewritten locally. Fetch the remote state, integrate it without a merge commit, record the tracking branch, and publish the rewritten history in a way that refuses to overwrite a remote that moved.',
      'Ваша feature-ветка отстаёт от origin/main, а её история была переписана локально. Заберите состояние сервера, интегрируйте его без merge-коммита, запишите ветку отслеживания и опубликуйте переписанную историю так, чтобы отправка не перезаписала сервер, который сдвинулся.'
    ),
    hint: L(
      'git pull --rebase replays local commits on top of the fetched state, git push -u creates the tracking record, and --force-with-lease refuses to overwrite a remote that moved after the last fetch.',
      'git pull --rebase переигрывает локальные коммиты поверх забранного состояния, git push -u создаёт запись отслеживания, а --force-with-lease отказывается перезаписывать сервер, сдвинувшийся после последнего fetch.'
    ),
    solution: `git fetch origin --prune

# see what the remote has
git log --oneline HEAD..origin/main

# replay the local commits on top of it, no merge commit
git pull --rebase origin main

# publish the branch and remember the tracking record
git push -u origin feature/checkout-validation

# the rewritten history: the push fails if the remote moved
git fetch origin
git push --force-with-lease origin feature/checkout-validation

# what is still only local
git log --oneline origin/feature/checkout-validation..HEAD`,
    explanation: L(
      'Fetch only updates the remote-tracking refs, so the integration step is where the strategy is chosen. The lease makes the rewrite conditional: the push goes through only while the remote branch still points where the last fetch left it.',
      'Fetch обновляет только ссылки отслеживания, поэтому стратегия выбирается на шаге интеграции. Lease делает перезапись условной: отправка проходит, только пока удалённая ветка указывает туда, куда её оставил последний fetch.'
    ),
  },
  {
    id: 'ch-git-ch6-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch6',
    level: 'intermediate',
    title: L('Cut a hotfix from a release tag', 'Вырезать хотфикс из тега релиза'),
    brief: L(
      'Version 1.4.0 is released and tagged, and a payment bug appears in production. Cut the hotfix branch from the tag, commit the fix together with its regression test, tag the patch release, push the branch and the tag, and merge the fix back into main with a merge commit.',
      'Версия 1.4.0 выпущена и помечена тегом, а в продакшене появился баг с оплатой. Вырежьте ветку хотфикса из тега, закоммитьте исправление вместе с регрессионным тестом, поставьте тег патч-релиза, отправьте ветку и тег и слейте исправление обратно в main merge-коммитом.'
    ),
    hint: L(
      'A branch cut from a tag starts from the released code, not from the trunk. git merge --no-ff keeps the hotfix visible in the history of the trunk.',
      'Ветка, вырезанная из тега, стартует из выпущенного кода, а не из основной линии. git merge --no-ff оставляет хотфикс видимым в истории основной ветки.'
    ),
    solution: `git fetch origin --tags

# cut the hotfix from the released version, not from the trunk
git switch -c hotfix/1.4.1 v1.4.0

# the fix and its regression test go in together
git add src/payments.ts test/payments.spec.ts
git commit -m "fix: reject a retry with the same idempotency key"

# release the patch
git tag -a v1.4.1 -m "Release 1.4.1"
git push origin hotfix/1.4.1 v1.4.1

# bring the fix back into the trunk
git switch main
git merge --no-ff hotfix/1.4.1
git push origin main`,
    explanation: L(
      'A hotfix cut from the release tag ships exactly the code that is running in production. The patch gets its own tag, and the merge commit with two parents keeps the fix visible in the trunk instead of hiding it behind a fast-forward.',
      'Хотфикс, вырезанный из тега релиза, выпускает ровно тот код, который работает в продакшене. Патч получает собственный тег, а merge-коммит с двумя родителями оставляет исправление видимым в основной ветке, а не прячет его за fast-forward.'
    ),
  },
  {
    id: 'ch-git-ch7-1',
    moduleId: 'git',
    topic: 'git',
    chapterId: 'git-ch7',
    level: 'intermediate',
    title: L('Bisect a regression and annotate the culprit', 'Найти регрессию через bisect и пометить виновника'),
    brief: L(
      'The test suite started failing somewhere between v1.3.0 and HEAD. Let git bisect find the first bad commit with the test command, record why that commit broke things in a note that travels with the repository, and return to the branch you started on.',
      'Тесты начали падать где-то между v1.3.0 и HEAD. Пусть git bisect найдёт первый плохой коммит через команду тестов, запишите в заметку, почему этот коммит всё сломал, и вернитесь на ветку, с которой начинали.'
    ),
    hint: L(
      'git bisect start takes the bad and the good endpoints, git bisect run answers with the exit code of a script, and notes live in refs/notes/commits until you push them.',
      'git bisect start принимает плохую и хорошую границы, git bisect run отвечает по коду возврата скрипта, а заметки живут в refs/notes/commits, пока их не отправили.'
    ),
    solution: `# mark the range and start the search
git bisect start
git bisect bad HEAD
git bisect good v1.3.0

# let the test command answer
git bisect run npm test
# -> a1b2c3d is the first bad commit

# record the context that the commit message has no room for
git notes add a1b2c3d -m "Ticket JIRA-1421: the retry lost its idempotency key"

# return to the branch you started on
git bisect reset
git status`,
    explanation: L(
      'Bisect halves the range on every step, so the number of test runs grows with the logarithm of the number of commits. A note is stored in a separate reference, so it adds context to a commit without changing the commit itself.',
      'Bisect делит диапазон пополам на каждом шаге, поэтому число запусков тестов растёт с логарифмом числа коммитов. Заметка лежит в отдельной ссылке и дополняет коммит контекстом, не меняя сам коммит.'
    ),
  },
];
