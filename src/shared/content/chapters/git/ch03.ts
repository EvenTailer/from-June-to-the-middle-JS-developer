import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh03: Chapter = {
  id: 'git-ch3',
  title: L('Branches, merges and conflicts', 'Ветки, слияния и конфликты'),
  summary: L(
    'Why a branch is only a pointer, how Git decides what to combine during a merge, what a rebase actually rewrites, and how to read and resolve a conflict.',
    'Почему ветка — это просто указатель, как Git решает, что объединять при слиянии, что на самом деле переписывает перебазирование и как читать и разрешать конфликт.'
  ),
  sections: [
    {
      id: 'git-ch3-s1',
      title: L('Branches are pointers', 'Ветки — это указатели'),
      body: L(
        'A branch is a file under .git/refs/heads that contains the hash of one commit. Creating a branch writes forty bytes, switching to it rewrites the working tree to match that commit, and merging into it moves the file. There is no copy of the code attached to a branch and nothing is duplicated when you make ten of them, which is why branching in Git is cheap enough to do constantly.\n\nThe modern commands are git switch and git switch -c, which took over the branch part of git checkout. git switch refuses to switch when the working tree holds changes that would be overwritten, and that refusal is a feature: it is Git telling you that you would lose work. git switch -f discards those changes and should be used only where losing them is the plan.\n\nThe rest of the branch vocabulary follows from the file model. git branch -m renames, git branch -f moves a branch to another commit, and git branch -d deletes a branch, refusing while the branch is unmerged. git branch -D deletes it anyway, and it is the flag that turns a small mistake into an unrecoverable one unless the reflog still remembers the commit. git branch -vv adds the upstream and the ahead-behind count.\n\nNames outlive the code they point at. A name like feature/checkout-validation still means something to a reader six months later, while a name made of a ticket number forces everybody to open the tracker. And a branch exists on the remote only after a push: until then it lives in your repository alone, and no amount of collaboration makes it visible.',
        'Ветка — это файл в .git/refs/heads, в котором лежит хеш одного коммита. Создание ветки записывает сорок байт, переключение на неё переписывает рабочее дерево под этот коммит, а слияние в неё двигает сам файл. Никакой копии кода ветка не держит и при создании десяти веток ничего не дублируется — поэтому ветвление в Git настолько дёшево, что им пользуются постоянно.\n\nСовременные команды — git switch и git switch -c, пришедшие на смену ветвячной части git checkout. git switch отказывается переключаться, если в рабочем дереве есть изменения, которые пришлось бы перезаписать, и этот отказ — не помеха, а защита: Git говорит, что вы потеряете работу. git switch -f выбрасывает эти изменения и уместен только там, где потеря запланирована.\n\nОстальной словарь веток следует из модели файла. git branch -m переименовывает, git branch -f переставляет ветку на другой коммит, а git branch -d удаляет, отказываясь, пока ветка не слита. git branch -D удаляет без вопросов, и именно этот флаг превращает маленькую ошибку в необратимую, если только reflog ещё помнит коммит. git branch -vv добавляет upstream и счётчик «вперёд/назад».\n\nИмя ветки переживает свой код. Имя вида feature/checkout-validation что-то значит и для читателя через полгода, а имя из номера задачи заставляет всех открывать трекер. И ветка появляется на сервере только после push: до этого она живёт в вашем репозитории одна, и никакая совместная работа её не покажет.'
      ),
      bullets: [
        L('A branch is a file containing a hash, not a copy of the code.', 'Ветка — это файл с хешем, а не копия кода.'),
        L('Creating a branch writes forty bytes and takes no measurable time.', 'Создание ветки записывает сорок байт и не занимает заметного времени.'),
        L('git switch refuses to lose uncommitted changes.', 'git switch отказывается терять незакоммиченные изменения.'),
        L('git branch -d refuses to delete an unmerged branch, -D does not care.', 'git branch -d отказывается удалять не слитую ветку, -D удаляет без вопросов.'),
        L('A branch exists on the remote only after it has been pushed.', 'Ветка появляется на сервере только после отправки.'),
      ],
      code: `# create and switch in one step
git switch -c feature/checkout-validation
git switch main

# rename, move and delete
git branch -m feature/validation
git branch -f feature/validation main
git branch -d feature/validation
git branch -D feature/old-experiment

# what tracks what, and who is ahead
git branch -vv
git branch --list "feature/*"`,
      table: {
        caption: L('Branch commands', 'Команды работы с ветками'),
        headers: [
          L('Command', 'Команда'),
          L('What it does', 'Что делает'),
        ],
        rows: [
          [L('git switch -c name', 'git switch -c name'), L('Creates the branch and checks it out', 'Создаёт ветку и переключается на неё')],
          [L('git switch name', 'git switch name'), L('Checks out an existing branch', 'Переключается на существующую ветку')],
          [L('git branch -m new', 'git branch -m new'), L('Renames the current branch', 'Переименовывает текущую ветку')],
          [L('git branch -f name commit', 'git branch -f name commit'), L('Moves the branch to another commit', 'Переставляет ветку на другой коммит')],
          [L('git branch -d name', 'git branch -d name'), L('Deletes a merged branch, refuses otherwise', 'Удаляет слитую ветку, иначе отказывает')],
          [L('git branch -D name', 'git branch -D name'), L('Deletes the branch whatever the state', 'Удаляет ветку в любом случае')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('-D is not a stronger -d', '-D — это не более строгий -d'),
          text: L(
            'The capital flag skips the safety check that the branch was merged. Use it only when the commit is already reachable from another branch or from a tag, and check that first with git branch --merged.',
            'Заглавный флаг пропускает проверку, что ветка была слита. Применяйте его, только когда коммит уже достижим из другой ветки или тега, и проверьте это заранее через git branch --merged.'
          ),
        },
      ],
      takeaway: L(
        'A branch is a hash in a file, so creating one is free and deleting one loses nothing that the reflog cannot name.',
        'Ветка — это хеш в файле, поэтому создание бесплатно, а удаление не теряет ничего, чего не назовёт reflog.'
      ),
      seeAlso: [
        L('Section 3-3: merge strategies and fast-forward', 'Секция 3-3: стратегии слияния и fast-forward'),
        L('Section 1-3: references, HEAD and the reflog', 'Секция 1-3: ссылки, HEAD и reflog'),
      ],
    },
    {
      id: 'git-ch3-s2',
      title: L('The merge base and the three-way merge', 'База слияния и трёхстороннее слияние'),
      body: L(
        'Merging is not a diff between two files. Git compares three versions of every path: the common ancestor, the version on your branch and the version on the other branch. The ancestor is found automatically and is called the merge base, and it is the point where the two histories stopped being the same. Because the comparison is against the ancestor and not against the other side directly, a change made on one branch is not treated as a conflict just because the other branch did not touch that file.\n\nConcretely, if the base has ten lines, your branch changed line three and the other branch changed line nine, the result contains both changes and there is no conflict. A conflict appears only when both sides changed the same region in ways that cannot be combined automatically. Git then writes the three versions into the file with markers and stops, leaving the merge unfinished.\n\nThe base matters for another reason: it defines what "already changed" means. If both branches changed the same line to the same value, the merge is still clean, because the two results are identical. If both changed the same line to different values, only a human can decide, and Git refuses to guess. The diff you see while resolving a conflict is always between your version and their version, and the base version is what tells you which of the two edits came first.\n\nTo look at the base yourself, use git merge-base. git show :1:path prints the base version of a file, :2 the yours version and :3 the theirs version, and git diff --merge shows the combined diff while a conflict is open. Understanding the base is what turns conflict resolution from guesswork into a decision.',
        'Слияние — это не дифф двух файлов. Git сравнивает три версии каждого пути: общий предок, версию из вашей ветки и версию из чужой ветки. Предок находится автоматически и называется базой слияния, и это та точка, где истории перестали быть одинаковыми. Именно потому, что сравнение идёт с предком, а не с другой стороной напрямую, изменение на одной ветке не считается конфликтом только из-за того, что другая ветка этот файл не трогала.\n\nКонкретно: если в базе десять строк, ваша ветка изменила третью, а чужая — девятую, результат содержит оба изменения, и конфликта нет. Конфликт возникает только тогда, когда обе стороны изменили один и тот же участок так, что их нельзя объединить автоматически. Git записывает в файл три версии с маркерами и останавливается, оставляя слияние незавершённым.\n\nБаза важна и по другой причине: она определяет, что считать «уже изменённым». Если обе ветки изменили одну строку на одно и то же значение, слияние всё равно чистое, потому что результаты совпадают. Если обе изменили её по-разному, решить может только человек, и Git отказывается угадывать. Дифф, который вы видите при разрешении конфликта, — это всегда сравнение вашей версии с их, а версия базы показывает, какая из двух правок пришла раньше.\n\nБазу можно посмотреть самому: git merge-base её находит, git show :1:path печатает версию базы, :2 — вашу, :3 — их, а git diff --merge показывает сводный дифф, пока конфликт открыт. Понимание базы превращает разрешение конфликта из гадания в решение.'
      ),
      bullets: [
        L('A merge compares the base, ours and theirs, not two sides.', 'Слияние сравнивает базу, нашу и их версии, а не две стороны.'),
        L('The merge base is the best common ancestor of the two commits.', 'База слияния — наилучший общий предок двух коммитов.'),
        L('Changes to different regions merge without any conflict.', 'Изменения в разных участках сливаются без конфликта.'),
        L('Identical edits on both sides are not a conflict.', 'Одинаковые правки с обеих сторон конфликтом не считаются.'),
        L('Git stops the merge and writes conflict markers into the files.', 'Git останавливает слияние и записывает в файлы маркеры конфликта.'),
      ],
      code: `# where the two branches diverged
git merge-base main feature/login

# the three versions of a file during a conflict
git show :1:src/app.ts   # base
git show :2:src/app.ts   # ours
git show :3:src/app.ts   # theirs

# the combined diff
git diff --merge src/app.ts

# what is still unresolved
git diff --name-only --diff-filter=U`,
      table: {
        caption: L('The three inputs of a three-way merge', 'Три входа трёхстороннего слияния'),
        headers: [
          L('Version', 'Версия'),
          L('Where it comes from', 'Откуда берётся'),
          L('Meaning', 'Что значит'),
        ],
        rows: [
          [L('Stage 1, base', 'Стадия 1, база'), L('The merge base commit', 'Коммит базы слияния'), L('What both branches started from', 'Общая исходная версия')],
          [L('Stage 2, ours', 'Стадия 2, наша'), L('The current branch', 'Текущая ветка'), L('What you have now', 'Что есть у вас')],
          [L('Stage 3, theirs', 'Стадия 3, их'), L('The branch being merged', 'Сливаемая ветка'), L('What the other side has', 'Что есть у другой стороны')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Ask for the merge base explicitly', 'Запросите базу слияния явно'),
          text: L(
            'When a merge produces a surprising result, print the base and compare it with both sides before touching anything. A surprising merge is almost always a surprise about the base, not about the merge algorithm.',
            'Когда слияние даёт неожиданный результат, напечатайте базу и сравните её с обеими сторонами, прежде чем что-то менять. Неожиданное слияние почти всегда означает неожиданность в базе, а не в алгоритме.'
          ),
        },
      ],
      takeaway: L(
        'Git merges three versions, not two: find the merge base, and a conflict only appears when both sides changed the same lines differently.',
        'Git сливает три версии, а не две: найдите базу слияния, и конфликт возникает только когда обе стороны изменили одни и те же строки по-разному.'
      ),
      seeAlso: [
        L('Section 3-5: resolving conflicts', 'Секция 3-5: разрешение конфликтов'),
        L('Section 1-4: the commit graph and ancestry', 'Секция 1-4: граф коммитов и родство'),
      ],
    },
    {
      id: 'git-ch3-s3',
      title: L('Merge strategies and fast-forward', 'Стратегии слияния и fast-forward'),
      body: L(
        'When you merge a branch into the current one, Git first checks whether the current branch is an ancestor of the branch being merged. If it is, there is nothing to combine: the merge can simply move the pointer forward, and that is called a fast-forward. No commit is created, so the history stays a straight line and the fact that the two branches met is recorded nowhere.\n\nThe other case is a real merge. Git computes the merge base, performs the three-way merge, and creates a commit with two parents. A merge commit always exists in that case, so the graph shows where the lines of work converged. git merge --no-ff forces this behaviour even where a fast-forward would be possible, and for a shared trunk that is the better default: it keeps the merge visible in the history and makes reverting it possible as a single unit.\n\nWhich one you get is decided by the graph, not by your wishes, and that has a practical consequence: after a fast-forward, git reflog shows a move with no new commit, and reverting it is a reset rather than a revert. The safety net for the shared case is git merge --ff-only, which refuses to integrate unless the merge can be a fast-forward, turning an accidental divergence into a clear error instead of a surprise merge commit in the middle of the trunk.\n\nModern Git also supports the ort strategy by default, which does a three-way merge with smarter rename detection than the old diff3 strategy. The names of the strategies are rarely what you need, but the behaviour you do need is predictable: identical changes on both sides never conflict, and unrelated edits never conflict.',
        'Когда вы сливаете ветку в текущую, Git сначала проверяет, является ли текущая ветка предком сливаемой. Если да, то объединять нечего: слияние может просто сдвинуть указатель вперёд, и это называется fast-forward. Коммит не создаётся, история остаётся прямой линией, а факт встречи двух веток нигде не записан.\n\nДругой случай — настоящее слияние. Git находит базу слияния, выполняет трёхстороннее слияние и создаёт коммит с двумя родителями. В этом случае merge-коммит существует всегда, поэтому граф показывает, где сошлись линии работы. git merge --no-ff заставляет вести себя так даже там, где возможен fast-forward, и для общей основной ветки это обычно лучший вариант по умолчанию: слияние остаётся видимым в истории, а его можно откатить одним действием.\n\nКакой случай сработает, решает граф, а не ваши желания, и из этого следует практическое следствие: после fast-forward в git reflog нет нового коммита, а отмена такого слияния — это reset, а не revert. Страховкой для общего случая служит git merge --ff-only: он отказывается интегрировать, если слияние не может быть fast-forward, и превращает случайное расхождение в явную ошибку вместо неожиданного merge-коммита посреди основной ветки.\n\nСовременный Git по умолчанию использует стратегию ort, которая делает трёхстороннее слияние с более умным распознаванием переименований, чем старая стратегия diff3. Имена стратегий вам нужны редко, а вот поведение предсказуемо: одинаковые изменения с обеих сторон не конфликтуют, и не связанные между собой правки тоже не конфликтуют.'
      ),
      bullets: [
        L('A fast-forward moves the pointer and creates no commit.', 'Fast-forward двигает указатель и не создаёт коммит.'),
        L('A real merge creates a commit with two parents.', 'Настоящее слияние создаёт коммит с двумя родителями.'),
        L('git merge --no-ff keeps the merge visible in a shared trunk.', 'git merge --no-ff сохраняет слияние видимым в общей основной ветке.'),
        L('git merge --ff-only refuses to merge when it cannot fast-forward.', 'git merge --ff-only отказывается сливать, если fast-forward невозможен.'),
        L('After a fast-forward, undoing the merge means a reset, not a revert.', 'После fast-forward отмена слияния — это reset, а не revert.'),
      ],
      code: `# integrate a branch into the trunk
git switch main
git merge feature/checkout-validation

# always record the merge, even when a fast-forward is possible
git merge --no-ff feature/long-lived

# refuse anything but a fast-forward
git merge --ff-only origin/main

# look at the result
git log --graph --oneline --all --decorate
git log --merges --oneline`,
      table: {
        caption: L('Merge outcomes', 'Исходы слияния'),
        headers: [
          L('Outcome', 'Исход'),
          L('New commit', 'Новый коммит'),
          L('History shape', 'Форма истории'),
        ],
        rows: [
          [L('Fast-forward', 'Fast-forward'), L('None', 'Нет'), L('A straight line', 'Прямая линия')],
          [L('Merge commit', 'Merge-коммит'), L('Two parents', 'Два родителя'), L('A junction', 'Развилка')],
          [L('Conflict', 'Конфликт'), L('None until resolved', 'Нет до разрешения'), L('Merge paused mid-way', 'Слияние приостановлено')],
          [L('Already up to date', 'Уже актуально'), L('None', 'Нет'), L('Unchanged', 'Без изменений')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Pick the default per branch', 'Выберите умолчание для ветки'),
          text: L(
            'A trunk where merges are fast-forward hides the fact that work was integrated, and a trunk where every merge is recorded gets noisy after a few dozen branches. Many teams set pull.ff to false for the shared trunk and keep the default for personal branches.',
            'В основной ветке, где слияния всегда fast-forward, прячется сам факт интеграции работы, а в ветке, где каждое слияние записывается, после пары десятков веток становится шумно. Многие команды задают pull.ff false для общей основной ветки и оставляют умолчание для личных.'
          ),
        },
      ],
      takeaway: L(
        'Fast-forward moves a pointer and hides the merge, a merge commit records it: choose deliberately for a shared trunk.',
        'Fast-forward двигает указатель и прячет слияние, merge-коммит его записывает: для общей ветки выбирайте осознанно.'
      ),
      seeAlso: [
        L('Section 3-1: branches are pointers', 'Секция 3-1: ветки — это указатели'),
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
      ],
    },
    {
      id: 'git-ch3-s4',
      title: L('Rebase and history rewriting', 'Перебазирование и переписывание истории'),
      body: L(
        'A rebase replays your commits on top of another branch. For each commit Git computes the difference against its parent, applies that difference to the new base, and builds a new commit object with the same message and a new parent. Because the parent changed, the hash changes too, even though the content of the diff is identical. The result looks like the work was written directly on top of the target branch, and that is the whole point of the operation.\n\nThe cost is ownership. A rebased commit is a different commit from the original, so if the original was already published, the published history still exists on the remote and your rewritten copy is a duplicate of it. The next push is rejected, and forcing it leaves everybody with two copies of the same change. This is why the rule exists: rebase work that only exists on your machine, merge work that other people already have.\n\nAnother trap is the rebase that hits the same conflict twice. Git applies your commits one by one and stops at the first conflict, so resolving it and continuing may produce a second conflict on the next commit. The repeated fights are a signal, not bad luck: they mean the two branches changed the same region in ways that a merge would have handled once. At that point, aborting the rebase and merging is usually faster than replaying ten commits one conflict at a time.\n\nBefore you rebase, fetch, so that you are rebasing onto the current state of the remote branch and not onto a stale copy of it. git rebase --abort returns to the starting point at any moment, and git rebase --continue resumes after you have resolved a conflict.',
        'Перебазирование переносит ваши коммиты поверх другой ветки. Для каждого коммита Git считает разницу с его родителем, применяет эту разницу к новой базе и собирает новый объект коммита с тем же сообщением и новым родителем. Поскольку родитель изменился, меняется и хеш, хотя содержимое диффа то же самое. Результат выглядит так, будто работа сразу писалась поверх целевой ветки, и в этом весь смысл операции.\n\nЦена — это владение историей. Перебазированный коммит это другой коммит, нежели исходный, поэтому если исходный уже опубликован, опубликованная история никуда не денется, а ваша переписанная копия станет её дубликатом. Следующий push отклонят, а force оставит у всех по две копии одного изменения. Именно поэтому и существует правило: перебазируйте то, что есть только на вашей машине, сливайте то, что уже есть у других.\n\nДругая ловушка — перебазирование, которое дважды натыкается на один и тот же конфликт. Git применяет ваши коммиты по одному и останавливается на первом конфликте, так что после разрешения следующий коммит может дать второй конфликт. Повторяющиеся бои — это сигнал, а не невезение: значит, обе ветки меняли один и тот же участок так, что слияние справилось бы с этим один раз. В такой момент прервать перебазирование и сделать слияние обычно быстрее, чем переигрывать десять коммитов, конфликтуя с каждым.\n\nПеред перебазированием сделайте fetch, чтобы переносить коммиты на актуальное состояние удалённой ветки, а не на устаревшую копию. git rebase --abort в любой момент возвращает к началу, а git rebase --continue продолжает после разрешения конфликта.'
      ),
      bullets: [
        L('A rebase creates new commits with new hashes for the same changes.', 'Перебазирование создаёт новые коммиты с новыми хешами для тех же изменений.'),
        L('Rebase only what is local, merge what is already published.', 'Перебазируйте только локальное, сливайте опубликованное.'),
        L('Fetch before rebasing, so the base is the current remote state.', 'Сделайте fetch перед перебазированием, чтобы база была актуальной.'),
        L('Repeated conflicts during a rebase mean a merge would be cheaper.', 'Повторяющиеся конфликты при перебазировании означают, что дешевле слить.'),
        L('git rebase --abort returns to the state before the rebase.', 'git rebase --abort возвращает к состоянию до перебазирования.'),
      ],
      code: `# update the remote state, then replay local commits on top of it
git fetch origin
git rebase origin/main

# the commits that were moved
git log --oneline origin/main..HEAD

# inside a conflict during the replay
git status
git add src/app.ts
git rebase --continue

# give up and go back
git rebase --abort`,
      table: {
        caption: L('Merge against rebase', 'Слияние против перебазирования'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Merge', 'Merge'),
          L('Rebase', 'Rebase'),
        ],
        rows: [
          [L('History', 'История'), L('Keeps both, adds a merge commit', 'Сохраняет обе, добавляет merge-коммит'), L('Rewrites into a straight line', 'Переписывает в прямую линию')],
          [L('Hashes', 'Хеши'), L('Unchanged', 'Не меняются'), L('All new', 'Все новые')],
          [L('Published work', 'Опубликованная работа'), L('Safe', 'Безопасно'), L('Dangerous', 'Опасно')],
          [L('Conflicts', 'Конфликты'), L('Resolved once', 'Решаются один раз'), L('May repeat per commit', 'Могут повторяться по коммитам')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Rebase rewrites what others already have', 'Перебазирование переписывает чужое'),
          text: L(
            'Rebasing a branch that was already pushed forces everybody to reconcile two copies of the same commits. The safe order is: fetch, rebase only local commits, push normally. If a rewrite is unavoidable, --force-with-lease refuses to overwrite work that arrived in the meantime.',
            'Перебазирование ветки, которую уже отправили, заставляет всех разбираться с двумя копиями одних и тех же коммитов. Безопасный порядок: fetch, перебазировать только локальные коммиты, отправить как обычно. Если перезапись всё же неизбежна, --force-with-lease не даст затереть то, что пришло за это время.'
          ),
        },
      ],
      takeaway: L(
        'Rebase rewrites hashes, so it belongs on unpublished commits; everything shared is merged.',
        'Перебазирование переписывает хеши, поэтому оно для неопубликованных коммитов, а всё опубликованное сливают.'
      ),
      seeAlso: [
        L('Section 3-6: interactive rebase', 'Секция 3-6: интерактивное перебазирование'),
        L('Section 4-2: git restore and git revert', 'Секция 4-2: git restore и git revert'),
      ],
    },
    {
      id: 'git-ch3-s5',
      title: L('Resolving conflicts', 'Разрешение конфликтов'),
      body: L(
        'When a merge stops, the conflicted files contain markers with the three versions: HEAD, the other branch, and the common ancestor. The state is stored in the index as three stages, one per version, and the same information is available through git show :1:file, :2:file and :3:file. The working tree holds the markers; the index holds the stages; nothing is decided until you decide it.\n\nThe resolution itself is editing: open the file, keep the lines that are right, delete the markers, and leave a file that contains what you actually want. Then git add the file. That call replaces the three stages with a single stage zero entry, which is how Git learns that the conflict is resolved, and git commit finishes the merge with the two parents intact. git status is the honest report of where you are: it names the unresolved paths, and git diff --name-only --diff-filter=U lists exactly the files that still need attention.\n\nThere are two ways out of a stuck merge. git merge --abort returns the repository to the state before the merge started, and it is the correct answer when the merge was a mistake. git merge --continue commits the resolved result when the merge was right and the conflict was simply work. During a rebase the equivalents are git rebase --abort and git rebase --continue, and choosing the wrong one is how people end up with a half-finished operation that nobody wants to touch.\n\nA useful habit is to resolve conflicts in small chunks with git checkout --ours and git checkout --theirs for whole files, then hand-fix the remaining ones. The two flags take an entire side, which is right for generated files, lock files and large refactors where one side is simply better, and wrong for code, where the point of the merge is to have both.',
        'Когда слияние останавливается, в конфликтных файлах лежат маркеры с тремя версиями: HEAD, чужая ветка и общий предок. Состояние хранится в индексе в трёх стадиях, по одной на версию, и та же информация доступна через git show :1:file, :2:file и :3:file. В рабочем дереве лежат маркеры, в индексе — стадии, и ничего не решено, пока вы не решите.\n\nСамо разрешение — это правка: откройте файл, оставьте нужные строки, удалите маркеры и получите файл с тем, что вам действительно нужно. Затем сделайте git add этого файла. Вызов заменяет три стадии одной записью стадии ноль, и именно так Git узнаёт, что конфликт разрешён, а git commit завершает слияние с двумя родителями на месте. git status — честный отчёт о текущем состоянии: он называет неразрешённые пути, а git diff --name-only --diff-filter=U перечисляет ровно те файлы, до которых ещё нужно дойти.\n\nИз застрявшего слияния есть два выхода. git merge --abort возвращает репозиторий в состояние до слияния, и это правильный ответ, когда слияние было ошибкой. git merge --continue коммитит разрешённый результат, когда слияние было нужным, а конфликт — просто работа. При перебазировании аналоги это git rebase --abort и git rebase --continue, и выбор не того варианта приводит к полузавершённой операции, к которой никто не хочет прикасаться.\n\nПолезная привычка — решать конфликты по частям, применяя git checkout --ours и git checkout --theirs к файлам целиком, а оставшиеся трогая руками. Эти флаги берут целую сторону, что правильно для сгенерированных файлов, файлов блокировок и больших рефакторингов, где одна сторона просто лучше, и неправильно для кода, где смысл слияния как раз в том, чтобы взять обе.'
      ),
      bullets: [
        L('A conflict is stored in the index as three stages, one per version.', 'Конфликт хранится в индексе в трёх стадиях, по одной на версию.'),
        L('git add on the resolved file replaces the stages with stage zero.', 'git add разрешённого файла заменяет стадии стадией ноль.'),
        L('git status names the files that are still unresolved.', 'git status называет файлы, которые ещё не разрешены.'),
        L('git merge --abort undoes the merge, git merge --continue finishes it.', 'git merge --abort отменяет слияние, git merge --continue завершает его.'),
        L('git checkout --ours and --theirs take a whole side of a file.', 'git checkout --ours и --theirs берут целую сторону файла.'),
      ],
      code: `# what is unresolved
git status
git diff --name-only --diff-filter=U

# look at the three versions
git show :1:src/app.ts
git show :2:src/app.ts
git show :3:src/app.ts

# take one side entirely, then finish by hand
git checkout --ours src/generated.ts
git checkout --theirs package-lock.json

# mark resolved and finish
git add src/app.ts
git commit
git merge --abort`,
      table: {
        caption: L('Commands available inside an unfinished merge', 'Команды в незавершённом слиянии'),
        headers: [
          L('Command', 'Команда'),
          L('What it does', 'Что делает'),
        ],
        rows: [
          [L('git status', 'git status'), L('Reports the unresolved paths', 'Показывает неразрешённые пути')],
          [L('git show :1:file', 'git show :1:file'), L('Prints the base version', 'Печатает версию базы')],
          [L('git show :2:file', 'git show :2:file'), L('Prints your version', 'Печатает вашу версию')],
          [L('git show :3:file', 'git show :3:file'), L('Prints the other side version', 'Печатает версию другой стороны')],
          [L('git add file', 'git add file'), L('Marks the file resolved', 'Помечает файл разрешённым')],
          [L('git merge --abort', 'git merge --abort'), L('Returns to the state before the merge', 'Возвращает к состоянию до слияния')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Forgetting git add', 'Забытый git add'),
          text: L(
            'A file can be edited until it is perfect and still be treated as unresolved, because Git only learns that the conflict is settled when the file is added to the index. If a merge refuses to finish, check git status for the list of paths that are still unmerged.',
            'Файл можно выправить до идеала, и Git всё равно будет считать его неразрешённым, потому что узнаёт, что конфликт снят, только когда файл попадёт в индекс. Если слияние не завершается, посмотрите в git status список путей, которые остались неразрешёнными.'
          ),
        },
      ],
      takeaway: L(
        'A conflict is three versions and three index stages: edit the file, git add it, then commit or abort.',
        'Конфликт — это три версии и три стадии индекса: правьте файл, добавляйте его через git add, а потом коммитьте или отменяйте.'
      ),
      seeAlso: [
        L('Section 3-2: the merge base and the three-way merge', 'Секция 3-2: база слияния и трёхстороннее слияние'),
        L('Section 4-1: git reset and its three modes', 'Секция 4-1: git reset и его три режима'),
      ],
    },
    {
      id: 'git-ch3-s6',
      title: L('Interactive rebase', 'Интерактивное перебазирование'),
      body: L(
        'git rebase -i opens a list of the commits that are about to be replayed and lets you change what happens to each of them. The list is a text file, one line per commit, and the command in front of the line is the instruction. pick keeps the commit as it is, reword keeps it but opens the editor for a new message, edit stops the replay so you can change the commit, squash merges the commit into the previous one and combines the messages, fixup merges it and keeps only the first message, and drop removes the commit entirely.\n\nThe point of the tool is to shape a history before it is shared. A commit that only fixes a typo can be folded into the commit it belongs to. Two commits that do one thing can become one. A commit that turned out to be the wrong approach can be dropped without touching the rest. The result is a branch whose history reads as a sequence of decisions instead of a sequence of keystrokes, and that is worth an hour of rewriting before a pull request rather than after.\n\nThe editor also accepts reordering: moving a line changes the order in which the commits are replayed, and the reordering is applied to the whole sequence, not only to the selected commit. A commit moved earlier is applied earlier, and if it depended on something that comes later, the replay stops with a conflict. The whole file is also a place for comments, and lines starting with a hash sign are ignored, which is a convenient way to leave notes for your future self.\n\nAutosquash automates the folding. A commit made with git commit --fixup targets another commit, and git rebase -i --autosquash marks it as fixup automatically. The squash and fixup commands have one subtle difference worth remembering: squash stops and lets you edit the combined message, fixup does not.',
        'git rebase -i открывает список коммитов, которые вот-вот будут переиграны, и позволяет решить судьбу каждого. Список — это текстовый файл, по одной строке на коммит, а команда в начале строки и есть инструкция. pick оставляет коммит как есть, reword оставляет, но открывает редактор для нового сообщения, edit останавливает переигрывание, чтобы вы изменили коммит, squash сливает коммит с предыдущим и объединяет сообщения, fixup сливает его и оставляет только первое сообщение, а drop удаляет коммит целиком.\n\nСмысл инструмента — придать истории форму до того, как она станет общей. Коммит, который только правит опечатку, можно втянуть в тот коммит, к которому он относится. Два коммита, делающих одно дело, можно объединить в один. Коммит с неверным подходом можно выбросить, не трогая остального. Результат — ветка, история которой читается как последовательность решений, а не как последовательность нажатий клавиш, и это стоит потратить час переписывания до pull request, а не после.\n\nРедактор принимает и перестановку: перенос строки меняет порядок переигрывания, причём переставляется вся последовательность, а не только выбранный коммит. Перемещённый выше коммит применится раньше, и если он зависел от того, что идёт позже, переигрывание остановится конфликтом. Весь файл ещё и место для комментариев: строки, начинающиеся с решётки, игнорируются, и это удобный способ оставить заметку самому себе в будущем.\n\nAutosquash автоматизирует сквош. Коммит, сделанный через git commit --fixup, указывает на другой коммит, а git rebase -i --autosquash сам помечает его как fixup. У squash и fixup есть одна тонкая разница, которую стоит помнить: squash останавливается и даёт отредактировать объединённое сообщение, а fixup — нет.'
      ),
      bullets: [
        L('The interactive rebase list has one line per commit and one command per line.', 'Список интерактивного перебазирования — по строке на коммит и команда в начале строки.'),
        L('squash combines the messages, fixup keeps only the first one.', 'squash объединяет сообщения, fixup оставляет только первое.'),
        L('Reordering a line reorders the whole replay.', 'Перенос строки меняет порядок всего переигрывания.'),
        L('Lines starting with a hash sign are comments.', 'Строки, начинающиеся с решётки, считаются комментариями.'),
        L('--autosquash turns fixup commits into fixup instructions.', '--autosquash превращает fixup-коммиты в инструкции fixup.'),
      ],
      code: `# open the list of commits to replay
git rebase -i HEAD~5
# pick    keep the commit
# reword  change its message
# edit    stop and change the commit
# squash  merge with the previous one, combine messages
# fixup   merge with the previous one, keep the first message
# drop    remove the commit

# mark a commit for folding, then let git fold it
git commit --fixup <commit-hash>
git rebase -i --autosquash HEAD~5`,
      table: {
        caption: L('The commands of the interactive rebase', 'Команды интерактивного перебазирования'),
        headers: [
          L('Command', 'Команда'),
          L('Effect', 'Действие'),
        ],
        rows: [
          [L('pick', 'pick'), L('Replays the commit unchanged', 'Переигрывает коммит без изменений')],
          [L('reword', 'reword'), L('Replays it and opens the message editor', 'Переигрывает и открывает редактор сообщения')],
          [L('edit', 'edit'), L('Stops so you can change the commit', 'Останавливает, чтобы изменить коммит')],
          [L('squash', 'squash'), L('Folds it into the previous commit and combines messages', 'Втягивает в предыдущий и объединяет сообщения')],
          [L('fixup', 'fixup'), L('Folds it into the previous commit, keeps the first message', 'Втягивает в предыдущий, оставляя первое сообщение')],
          [L('drop', 'drop'), L('Removes the commit from the replay', 'Убирает коммит из переигрывания')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Rebase only unpublished commits', 'Перебазируйте только неопубликованные коммиты'),
          text: L(
            'Every command in this list rewrites the commits it touches, which means new hashes and a broken agreement with the remote. If the commits are already shared, the equivalent shaping has to happen in the merge request instead, where the history stays immutable.',
            'Каждая команда из этого списка переписывает затрагиваемые коммиты, то есть даёт новые хеши и разрывает договорённость с сервером. Если коммиты уже опубликованы, то же самое делают в pull request, где история остаётся неизменной.'
          ),
        },
      ],
      takeaway: L(
        'Shape the history before it is shared: fold, rename and reorder commits while they are still local.',
        'Придайте истории форму до того, как она станет общей: сворачивайте, переименовывайте и переставляйте коммиты, пока они локальные.'
      ),
      seeAlso: [
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
        L('Section 2-4: amending and fixing the last commit', 'Секция 2-4: правка последнего коммита'),
      ],
    },
  ],
};
