import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh04: Chapter = {
  id: 'git-ch4',
  title: L('Undoing changes safely', 'Безопасная отмена изменений'),
  summary: L(
    'The difference between reset, restore and revert, how to park work in progress with stash, and how the reflog brings back a commit that looks long gone.',
    'Чем reset отличается от restore и revert, как отложить текущую работу через stash и как reflog возвращает коммит, который кажется давно потерянным.'
  ),
  sections: [
    {
      id: 'git-ch4-s1',
      title: L('git reset and its three modes', 'git reset и его три режима'),
      body: L(
        'git reset moves HEAD, and what happens to the index and the working tree depends on the mode. The three modes form a ladder from gentle to destructive. --soft moves HEAD only, so the changes that were committed stay in the index, which is exactly what you want after a commit with a wrong message. --mixed, the default, moves HEAD and resets the index to match it, so the changes remain in the working tree but are no longer staged. --hard moves HEAD, resets the index and overwrites the working tree, discarding whatever was not committed.\n\nThe ladder maps onto three different mistakes. A wrong message needs --soft, because you want to write the message again and keep the content. A commit that should not have happened at all needs --mixed, because the content belongs in the working tree where you can decide about it. A commit that should never have existed needs --hard, and this is the mode where the loss becomes permanent.\n\nReset is also the tool for moving a branch pointer to an earlier commit, and it takes the same three modes. The reference for "one commit back" is HEAD~1, and HEAD@{1} means the position HEAD held one move ago according to the reflog. Neither form rewrites history by itself: the commit objects stay in the repository, and only the pointer moves.\n\nThe rule that keeps this safe is short: reset moves a pointer, so it belongs to commits that only exist on your machine. A commit that somebody else already pulled must be undone with git revert, which adds a new commit instead of moving anything.',
        'git reset двигает HEAD, а что происходит с индексом и рабочей директорией, зависит от режима. Три режима образуют лестницу от мягкого к разрушительному. --soft двигает только HEAD, и изменения из коммита остаются в индексе — ровно то, что нужно после коммита с неверным сообщением. --mixed, режим по умолчанию, двигает HEAD и сбрасывает индекс под него, так что изменения остаются в рабочей директории, но больше не проиндексированы. --hard двигает HEAD, сбрасывает индекс и перезаписывает рабочую директорию, уничтожая всё незакоммиченное.\n\nЛестница отвечает трём разным ошибкам. Неверное сообщение требует --soft, потому что сообщение надо написать заново, а содержимое сохранить. Коммит, которого вообще не должно было быть, требует --mixed, потому что содержимое должно вернуться в рабочую директорию, где вы сами решите его судьбу. Коммит, которого не должно было существовать вовсе, требует --hard, и вот здесь потеря становится окончательной.\n\nReset также средство переставить указатель ветки на более ранний коммит, и режимы у него те же. Ссылка на «один коммит назад» — это HEAD~1, а HEAD@{1} означает положение HEAD на один шаг назад по reflog. Ни одна из этих форм сама по себе не переписывает историю: объекты коммитов остаются в репозитории, двигается только указатель.\n\nПравило, которое удерживает это в безопасности, короткое: reset двигает указатель, поэтому он для коммитов, существующих только на вашей машине. Коммит, который кто-то уже забрал, отменяют через git revert, добавляющим новый коммит вместо перемещения чего бы то ни было.'
      ),
      bullets: [
        L('--soft moves HEAD only and keeps the changes staged.', '--soft двигает только HEAD и оставляет изменения проиндексированными.'),
        L('--mixed also resets the index, leaving the changes in the working tree.', '--mixed сбрасывает ещё и индекс, оставляя изменения в рабочей директории.'),
        L('--hard overwrites the working tree and discards uncommitted work.', '--hard перезаписывает рабочую директорию и выбрасывает незакоммиченную работу.'),
        L('HEAD~1 is one commit back, HEAD@{1} is one move back in the reflog.', 'HEAD~1 — один коммит назад, HEAD@{1} — одно перемещение назад по reflog.'),
        L('Never reset a commit that somebody else has already fetched.', 'Никогда не делайте reset для коммита, который кто-то уже забрал.'),
      ],
      code: `# undo the last commit and keep the changes staged
git reset --soft HEAD~1

# undo the last commit and keep the changes in the working tree
git reset HEAD~1

# move the branch to an earlier commit, discarding the rest
git reset --hard HEAD~3

# see what you are about to lose before you lose it
git log --oneline -3
git diff HEAD@{1} --stat`,
      table: {
        caption: L('What each reset mode moves', 'Что двигает каждый режим reset'),
        headers: [
          L('Mode', 'Режим'),
          L('HEAD', 'HEAD'),
          L('Index', 'Индекс'),
          L('Working tree', 'Рабочая директория'),
        ],
        rows: [
          [L('--soft', '--soft'), L('Moves', 'Двигается'), L('Keeps', 'Остаётся'), L('Keeps', 'Остаётся')],
          [L('--mixed (default)', '--mixed (по умолчанию)'), L('Moves', 'Двигается'), L('Resets', 'Сбрасывается'), L('Keeps', 'Остаётся')],
          [L('--hard', '--hard'), L('Moves', 'Двигается'), L('Resets', 'Сбрасывается'), L('Overwrites', 'Перезаписывается')],
          [L('--merge', '--merge'), L('Moves', 'Двигается'), L('Resets', 'Сбрасывается'), L('Keeps unmerged files', 'Сохраняет конфликтные файлы')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('--hard is the only truly destructive mode', 'Только --hard по-настоящему разрушителен'),
          text: L(
            'The other two modes can be walked back, because the content is still somewhere. --hard overwrites files that were never committed, and nothing in Git keeps a copy of them. Before running it on a machine with unsaved work, check git status and read the diff.',
            'Остальные два режима можно откатить, потому что содержимое ещё где-то осталось. --hard перезаписывает файлы, которые никогда не коммитились, и в Git нет их копии. Перед запуском на машине с несохранённой работой проверьте git status и прочитайте дифф.'
          ),
        },
      ],
      takeaway: L(
        'Pick the reset mode by intent: --soft to fix a message, --mixed to uncommit, --hard only when the work is already saved somewhere else.',
        'Выбирайте режим reset по намерению: --soft — поправить сообщение, --mixed — снять коммит, --hard — только когда работа сохранена где-то ещё.'
      ),
      seeAlso: [
        L('Section 4-2: git restore and git revert', 'Секция 4-2: git restore и git revert'),
        L('Section 4-4: the reflog as a safety net', 'Секция 4-4: reflog как страховочная сетка'),
      ],
    },
    {
      id: 'git-ch4-s2',
      title: L('git restore and git revert', 'git restore и git revert'),
      body: L(
        'git restore is the tool for undoing changes to files, and it separates the two questions that reset mixes together. Without a source flag it takes the file from the index, so git restore src/app.ts throws away your uncommitted edits to that file and puts back the staged version. With --staged it does the opposite: the file leaves the index and stays in the working tree, which is how you unstage a file without losing it. Adding --source names any commit as the version to restore from.\n\ngit revert is the tool for undoing something that is already published. It computes the inverse of a commit and creates a new commit that applies it, so the original stays in the history and the record shows that the change was backed out on purpose. git revert HEAD undoes the last commit, git revert a1b2c3d undoes a specific one, and git revert a1b2c3d..HEAD undoes a whole range of commits, newest first.\n\nThe difference between the two is not a matter of taste but of consequences. A restore touches only your machine and rewrites nothing; a revert touches shared history by adding to it. Choosing revert where restore would do adds noise to the log for no benefit, and choosing restore where revert is required simply deletes the record of a change that other people have already seen.\n\nOne more difference: a revert can fail to apply cleanly. If the lines a commit touched have changed since, Git stops and asks you to resolve it, and the conflict is the same kind you meet during a merge, with the three versions available through git show :1:file, :2:file and :3:file. A restore never fails in that way, because it copies a version over the file rather than applying a difference.',
        'git restore — инструмент для отмены изменений в файлах, и он разделяет два вопроса, которые reset смешивает. Без указания источника он берёт файл из индекса, поэтому git restore src/app.ts выбрасывает ваши незакоммиченные правки и возвращает проиндексированную версию. С флагом --staged происходит обратное: файл уходит из индекса и остаётся в рабочей директории — так снимают файл с индексации, не теряя его. Флаг --source называет любой коммит, из которого брать версию.\n\ngit revert — инструмент для отмены уже опубликованного. Он вычисляет обратное действие к коммиту и создаёт новый коммит, который его применяет, поэтому оригинал остаётся в истории, а в записи видно, что изменение намеренно отозвали. git revert HEAD отменяет последний коммит, git revert a1b2c3d — конкретный, а git revert a1b2c3d..HEAD — целый диапазон, начиная с самого нового.\n\nРазница между ними — не вопрос вкуса, а вопрос последствий. Restore трогает только вашу машину и ничего не переписывает; revert трогает общую историю, добавляя к ней. Выбрать revert там, где хватило бы restore, значит добавить шум в лог без всякой пользы, а выбрать restore там, где нужен revert, — просто стереть след изменения, которое уже видели другие.\n\nЕсть ещё одна разница: revert может не примениться начисто. Если строки, которых касался коммит, с тех пор изменились, Git останавливается и просит разрешить конфликт, и конфликт этот того же рода, что и при слиянии, с тремя версиями доступными через git show :1:file, :2:file и :3:file. Restore так не падает: он копирует версию поверх файла, а не применяет разницу.'
      ),
      bullets: [
        L('git restore takes the file from the index by default.', 'git restore по умолчанию берёт файл из индекса.'),
        L('git restore --staged unstage the file and keep it on disk.', 'git restore --staged снимает файл с индекса, оставляя на диске.'),
        L('git restore --source commit takes the file from that commit.', 'git restore --source commit берёт файл из указанного коммита.'),
        L('git revert adds a commit, it never rewrites the past.', 'git revert добавляет коммит и никогда не переписывает прошлое.'),
        L('git revert a1b2c3d..HEAD undoes a range of commits.', 'git revert a1b2c3d..HEAD отменяет диапазон коммитов.'),
      ],
      code: `# undo changes to one file, keep the staged version
git restore src/app.ts

# unstage a file, keep it in the working tree
git restore --staged src/app.ts

# take a file from another commit
git restore --source HEAD~2 src/app.ts

# undo a published commit by adding a new one
git revert a1b2c3d
git revert a1b2c3d..HEAD
git revert --no-edit a1b2c3d`,
      table: {
        caption: L('Choosing the right undo command', 'Выбор команды отмены'),
        headers: [
          L('What you want', 'Что нужно'),
          L('Command', 'Команда'),
          L('History', 'История'),
        ],
        rows: [
          [L('Discard edits to a file', 'Выбросить правки файла'), L('git restore file', 'git restore file'), L('Untouched', 'Не трогается')],
          [L('Unstage a file', 'Снять файл с индекса'), L('git restore --staged file', 'git restore --staged file'), L('Untouched', 'Не трогается')],
          [L('Undo an unpublished commit', 'Отменить неопубликованный коммит'), L('git reset --soft HEAD~1', 'git reset --soft HEAD~1'), L('Rewritten', 'Переписывается')],
          [L('Undo a published commit', 'Отменить опубликованный коммит'), L('git revert <hash>', 'git revert <hash>'), L('Extended', 'Дополняется')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Restoring overwrites without asking', 'Restore перезаписывает без вопросов'),
          text: L(
            'git restore has no confirmation and no undo. If the edits you are about to lose exist nowhere else, stage them instead with git stash, or at least copy the diff with git diff > changes.patch before restoring.',
            'У git restore нет ни подтверждения, ни отмены. Если правки, которые вы сейчас потеряете, больше нигде нет, сначала отложите их через git stash или хотя бы сохраните дифф командой git diff > changes.patch.'
          ),
        },
      ],
      takeaway: L(
        'Restore moves files, revert adds history: use restore for your own uncommitted work and revert for anything already shared.',
        'Restore двигает файлы, revert добавляет историю: restore — для своей незакоммиченной работы, revert — для всего, что уже опубликовано.'
      ),
      seeAlso: [
        L('Section 4-1: git reset and its three modes', 'Секция 4-1: git reset и его три режима'),
        L('Section 3-5: resolving conflicts', 'Секция 3-5: разрешение конфликтов'),
      ],
    },
    {
      id: 'git-ch4-s3',
      title: L('git stash: parking work in progress', 'git stash: отложить текущую работу'),
      body: L(
        'git stash saves the working tree and the index, resets both, and keeps the result as a commit in a stack of its own. It exists for one situation: you need to change something else right now, but the work in front of you is not ready to be a commit yet. Because the stash entry is a real commit object, it survives a branch switch and shows up in git log --all --reflog.\n\nThe commands form a small vocabulary. git stash push -m wip names the entry, and without the message the entry is called "WIP on main". git stash list shows the stack, newest first. git stash apply brings the top entry back but keeps it in the stack, git stash pop applies it and removes it, and git stash drop deletes an entry without applying it. git stash show -p stash@{0} prints the difference the entry holds, which is the first thing to check when an entry does not contain what you expected.\n\nThe trap is untracked files. A stash built from tracked files only leaves new files exactly where they were, and after the reset they are still on disk but no longer in the index, so a later stash or checkout can quietly lose them. git stash push -u includes untracked files, and -a includes ignored ones as well. The general rule is that a stash is not a backup: it is a parking place for tracked work, and anything untracked needs its own care.\n\nA stash can be applied on a different branch, and Git will attempt a three-way merge when the context moved. If the same lines changed on the target branch, the apply stops with a conflict that you resolve like any other. And because a stash is a commit, a forgotten entry is not lost: git stash branch feature-x stash@{0} creates a branch and applies the entry onto it in one step.',
        'git stash сохраняет рабочую директорию и индекс, сбрасывает оба и хранит результат как коммит в отдельном стеке. Он существует ради одной ситуации: нужно прямо сейчас заняться другим, а работа перед вами ещё не готова стать коммитом. Поскольку запись stash — настоящий объект коммита, она переживает переключение ветки и видна в git log --all --reflog.\n\nКоманды образуют небольшой словарь. git stash push -m wip подписывает запись, а без сообщения она называется «WIP on main». git stash list показывает стек, от новых к старым. git stash apply приносит верхнюю запись обратно и оставляет её в стеке, git stash pop применяет и удаляет, а git stash drop удаляет без применения. git stash show -p stash@{0} печатает разницу, которую хранит запись, и это первое, что стоит проверить, если запись содержит не то, что ожидалось.\n\nЛовушка — неотслеживаемые файлы. Stash, собранный только из отслеживаемых файлов, оставляет новые файлы ровно там, где они были, и после сброса они по-прежнему лежат на диске, но больше не в индексе, так что более поздний stash или checkout может их тихо потерять. git stash push -u включает неотслеживаемые файлы, а -a — ещё и игнорируемые. Общее правило: stash не является резервной копией, это стоянка для отслеживаемой работы, а всё неотслеживаемое требует отдельной заботы.\n\nЗапись stash можно применить на другой ветке, и Git попытается сделать трёхстороннее слияние, если контекст сдвинулся. Если на целевой ветке менялись те же строки, применение остановится конфликтом, который разрешается как любой другой. И поскольку stash — это коммит, забытая запись не пропадает: git stash branch feature-x stash@{0} создаёт ветку и применяет запись на неё одним шагом.'
      ),
      bullets: [
        L('A stash entry is a commit, so it survives branch switches.', 'Запись stash — это коммит, поэтому она переживает переключение ветки.'),
        L('git stash apply keeps the entry, git stash pop removes it.', 'git stash apply оставляет запись, git stash pop удаляет её.'),
        L('git stash push -u is needed to include untracked files.', 'Для неотслеживаемых файлов нужен git stash push -u.'),
        L('A stash is not a backup: it is a parking place for tracked work.', 'Stash — не резервная копия, а стоянка для отслеживаемой работы.'),
        L('git stash branch creates a branch and applies the entry onto it.', 'git stash branch создаёт ветку и применяет запись на неё.'),
      ],
      code: `# park the work in progress
git stash push -m "wip: parser rewrite"
git stash push -u -m "wip with new files"

# look before you pop
git stash list
git stash show -p stash@{0}

# bring it back
git stash apply
git stash pop
git stash drop stash@{1}

# a forgotten stash becomes a branch
git stash branch feature-parser stash@{0}`,
      table: {
        caption: L('The stash vocabulary', 'Словарь stash'),
        headers: [
          L('Command', 'Команда'),
          L('What it does', 'Что делает'),
        ],
        rows: [
          [L('git stash push -m note', 'git stash push -m note'), L('Saves the state and resets the tree', 'Сохраняет состояние и сбрасывает дерево')],
          [L('git stash list', 'git stash list'), L('Shows the stack of entries', 'Показывает стек записей')],
          [L('git stash show -p', 'git stash show -p'), L('Prints the difference the entry holds', 'Печатает разницу, хранимую записью')],
          [L('git stash apply', 'git stash apply'), L('Applies the entry and keeps it', 'Применяет запись и оставляет её')],
          [L('git stash pop', 'git stash pop'), L('Applies the entry and drops it', 'Применяет запись и удаляет её')],
          [L('git stash branch name', 'git stash branch name'), L('Creates a branch and applies the entry onto it', 'Создаёт ветку и применяет запись на неё')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The file that stayed behind', 'Файл, который остался позади'),
          text: L(
            'git stash reset the working tree but never removed untracked files, so a new module you just created is still on disk after the stash. It is also no longer staged, which makes it invisible to the next diff and easy to lose. Use -u when the stash is meant to hold everything.',
            'git stash сбросил рабочее дерево, но никогда не удалял неотслеживаемые файлы, поэтому только что созданный новый модуль остался на диске и после stash. При этом он больше не проиндексирован, из-за чего не виден в следующем диффе и легко теряется. Используйте -u, когда в stash должны попасть все файлы.'
          ),
        },
      ],
      takeaway: L(
        'Stash parks tracked work, add -u when new files matter, and remember that pop throws the entry away while apply keeps it.',
        'Stash припарковывает отслеживаемую работу, добавляйте -u, когда важны новые файлы, и помните: pop удаляет запись, apply оставляет.'
      ),
      seeAlso: [
        L('Section 4-1: git reset and its three modes', 'Секция 4-1: git reset и его три режима'),
        L('Section 4-6: cleaning untracked files', 'Секция 4-6: очистка неотслеживаемых файлов'),
      ],
    },
    {
      id: 'git-ch4-s4',
      title: L('The reflog as a safety net', 'Reflog как страховочная сетка'),
      body: L(
        'The reflog is the reason a Git accident is usually recoverable. Every time HEAD or a branch moves, Git appends a line recording the old hash, the new hash, who moved it and when. The log lives in .git/logs, it is local, it is never pushed, and it is what the Russian community calls the корзина: the bin where dropped commits are kept for a while before the garbage collector empties it.\n\nReading it is simple. git reflog shows the history of HEAD, git reflog show main shows the history of a branch, and the notation HEAD@{1} means the position HEAD held one move ago. Each line names the command that caused the move, so the log reads as a diary: "checkout: moving from main to feature/x", "reset: moving to abc1234", "commit: parser rewrite".\n\nThe entries expire on a schedule, and the schedule is the limit of the safety net. Reflog entries are kept for about ninety days by default for reachable commits and thirty days for unreachable ones, and unreachable objects are pruned after roughly two weeks by git gc. The configuration keys gc.reflogExpire and gc.pruneExpire control both windows, so a team that cares about recovery can extend them, and a team that wants a small repository can shorten them.\n\nWhat never expires is a branch that points at the commit. Naming a commit is the cheapest insurance in Git: a branch, a tag or even a note keeps it reachable, and reachability is what the garbage collector checks before it removes anything.',
        'Reflog — причина, по которой аварию в Git обычно можно откатить. Каждый раз, когда двигается HEAD или ветка, Git дописывает строку со старым хешем, новым хешем, тем, кто это сделал, и временем. Журнал лежит в .git/logs, он локальный, никогда не отправляется и в русской терминологии называется корзиной: тем местом, где брошенные коммиты лежат какое-то время, пока сборщик мусора не опустошит корзину.\n\nЧитать его просто. git reflog показывает историю HEAD, git reflog show main — историю ветки, а запись HEAD@{1} означает положение HEAD на один шаг назад. Каждая строка называет команду, вызвавшую перемещение, поэтому журнал читается как дневник: «checkout: moving from main to feature/x», «reset: moving to abc1234», «commit: parser rewrite».\n\nЗаписи истекают по расписанию, и это расписание — предел страховочной сетки. Записи reflog хранятся по умолчанию около девяноста дней для достижимых коммитов и тридцати дней для недостижимых, а недостижимые объекты git gc удаляет примерно через две недели. Оба окна настраиваются ключами gc.reflogExpire и gc.pruneExpire, поэтому команда, которой важно восстановление, может их продлить, а команда, которой важен размер репозитория, — сократить.\n\nНе истекает никогда только то, на что указывает ветка. Именование коммита — самая дешёвая страховка в Git: ветка, тег или даже заметка делают его достижимым, а именно достижимость проверяет сборщик мусора, прежде чем что-то удалить.'
      ),
      bullets: [
        L('The reflog records every move of HEAD and of every branch.', 'Reflog записывает каждое перемещение HEAD и каждой ветки.'),
        L('It is local, it is never pushed and it survives rebase and reset.', 'Он локальный, не отправляется и переживает rebase и reset.'),
        L('HEAD@{1} means the position HEAD held one move ago.', 'HEAD@{1} — положение HEAD на одно перемещение назад.'),
        L('Entries expire, roughly ninety days for reachable commits.', 'Записи истекают: для достижимых коммитов это около девяноста дней.'),
        L('A named branch keeps a commit reachable forever.', 'Именованная ветка навсегда оставляет коммит достижимым.'),
      ],
      code: `# the diary of HEAD
git reflog
git reflog show main
git reflog show --date=iso HEAD

# what happened at a given moment
git show HEAD@{1}
git diff HEAD@{1} HEAD

# keep a commit reachable by naming it
git branch rescue HEAD@{2}
git tag keep-me HEAD@{2}`,
      table: {
        caption: L('What expires and what does not', 'Что истекает, а что нет'),
        headers: [
          L('Item', 'Что'),
          L('Default lifetime', 'Срок по умолчанию'),
          L('Controlled by', 'Настраивается'),
        ],
        rows: [
          [L('Reflog entry for a reachable commit', 'Запись reflog достижимого коммита'), L('About 90 days', 'Около 90 дней'), L('gc.reflogExpire', 'gc.reflogExpire')],
          [L('Reflog entry for an unreachable commit', 'Запись reflog недостижимого коммита'), L('About 30 days', 'Около 30 дней'), L('gc.reflogExpireUnreachable', 'gc.reflogExpireUnreachable')],
          [L('Unreachable objects', 'Недостижимые объекты'), L('About 2 weeks', 'Около 2 недель'), L('gc.pruneExpire', 'gc.pruneExpire')],
          [L('A commit named by a branch or a tag', 'Коммит, названный веткой или тегом'), L('Forever', 'Навсегда'), L('Nothing', 'Ничем')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The bin is not a backup', 'Корзина — это не резервная копия'),
          text: L(
            'Everything in the reflog exists only on the machine that created it. Copying .git/refs and .git/logs to a backup is the way to keep that diary, but the real backup is a remote: a commit that was pushed exists on somebody else machine even if yours is lost.',
            'Всё, что есть в reflog, живёт только на машине, где он появился. Копирование .git/refs и .git/logs в бэкап сохранит этот дневник, но настоящий бэкап — это сервер: отправленный коммит есть на чужой машине, даже если ваша пропала.'
          ),
        },
      ],
      takeaway: L(
        'The reflog keeps every past position of HEAD for about three months: read it before you panic, and name the commit you want to keep.',
        'Reflog хранит все прошлые положения HEAD около трёх месяцев: читайте его до паники и давайте имя коммиту, который хотите сохранить.'
      ),
      seeAlso: [
        L('Section 4-5: recovering lost commits', 'Секция 4-5: восстановление потерянных коммитов'),
        L('Section 1-3: references, HEAD and the reflog', 'Секция 1-3: ссылки, HEAD и reflog'),
      ],
    },
    {
      id: 'git-ch4-s5',
      title: L('Recovering lost commits', 'Восстановление потерянных коммитов'),
      body: L(
        'A lost commit is rarely deleted. A hard reset or an amend makes a commit unreachable, but the object stays in the database until the garbage collector removes it, and the reflog still holds a pointer to it. Recovery therefore has two steps: find the commit, then give it a name.\n\nTo find it, read the reflog of the branch and of HEAD, and look for the entry that describes the moment things went wrong. git reflog show HEAD and git reflog show main print the same information in two scopes. When the reflog no longer covers the commit, git fsck --unreachable lists the objects that nothing points at, and git fsck --lost-found additionally writes them into .git/lost-found so they can be inspected directly.\n\nTo give it a name, move a branch to it. git branch rescue <hash> creates a new branch pointing at the commit and changes nothing else, which is the safest of the moves because the current branch is untouched. git reset --hard <hash> moves the current branch and overwrites the working tree, which is right when you are sure the commit is the one you want and want the branch to be there. git cherry-pick <hash> applies the change as a new commit on top of the current branch, which is the option when the commit belongs somewhere else in the history.\n\nThree accidents cover almost every case. A reset that swallowed a commit: find it in the reflog and reset back to it. An amend that swallowed a file or a message: the old commit is in the reflog under HEAD@{1}. A rebase that went wrong: git rebase --abort returns to the start, and if the rebase already finished, the original commits are still in the reflog of the branch.',
        'Потерянный коммит редко удаляется по-настоящему. Hard reset или amend делают коммит недостижимым, но объект остаётся в базе, пока её не очистит сборщик мусора, а в reflog остаётся указатель на него. Поэтому восстановление идёт в два шага: найти коммит и дать ему имя.\n\nЧтобы найти, прочитайте reflog ветки и HEAD и найдите запись, описывающую момент, когда всё пошло не так. git reflog show HEAD и git reflog show main печатают одну и ту же информацию в двух срезах. Когда reflog уже не покрывает коммит, git fsck --unreachable перечисляет объекты, на которые никто не ссылается, а git fsck --lost-found дополнительно складывает их в .git/lost-found, чтобы можно было посмотреть их напрямую.\n\nЧтобы дать имя, переставьте ветку. git branch rescue <hash> создаёт новую ветку на коммите и ничего больше не меняет — это самое безопасное из перемещений, потому что текущая ветка не затронута. git reset --hard <hash> двигает текущую ветку и перезаписывает рабочую директорию, и это правильно, когда вы уверены, что коммит тот, и хотите, чтобы ветка указывала на него. git cherry-pick <hash> применяет изменение новым коммитом поверх текущей ветки — вариант, когда коммиту место в другом месте истории.\n\nТри аварии покрывают почти все случаи. Reset, проглотивший коммит: найдите его в reflog и вернитесь к нему reset-ом. Amend, проглотивший файл или сообщение: старый коммит лежит в reflog под HEAD@{1}. Перебазирование, пошедшее не туда: git rebase --abort возвращает к началу, а если перебазирование уже завершилось, исходные коммиты всё ещё в reflog ветки.'
      ),
      bullets: [
        L('A lost commit is unreachable, not deleted.', 'Потерянный коммит недостижим, а не удалён.'),
        L('git reflog is the first place to look.', 'Первое, куда стоит смотреть, — git reflog.'),
        L('git fsck --lost-found lists objects that nothing points at.', 'git fsck --lost-found перечисляет объекты, на которые никто не ссылается.'),
        L('git branch rescue <hash> restores a commit without touching the branch.', 'git branch rescue <hash> возвращает коммит, не трогая текущую ветку.'),
        L('git cherry-pick <hash> brings the change into the current history.', 'git cherry-pick <hash> вносит изменение в текущую историю.'),
      ],
      code: `# look for the commit
git reflog show HEAD
git reflog show main
git log -g --oneline

# objects that nothing points at
git fsck --unreachable
git fsck --lost-found

# name it and keep it
git branch rescue <hash>
git show rescue

# or put the change back where it belongs
git cherry-pick <hash>`,
      table: {
        caption: L('The recovery playbook', 'Схема восстановления'),
        headers: [
          L('Accident', 'Авария'),
          L('Where the commit is', 'Где коммит'),
          L('Command', 'Команда'),
        ],
        rows: [
          [L('Reset --hard swallowed a commit', 'Hard reset проглотил коммит'), L('The reflog of the branch', 'Reflog ветки'), L('git reset --hard HEAD@{1}', 'git reset --hard HEAD@{1}')],
          [L('Amend lost a file or a message', 'Amend потерял файл или сообщение'), L('HEAD@{1}', 'HEAD@{1}'), L('git commit --amend --no-edit', 'git commit --amend --no-edit')],
          [L('Rebase went wrong', 'Перебазирование пошло не туда'), L('The rebase state', 'Состояние перебазирования'), L('git rebase --abort', 'git rebase --abort')],
          [L('The reflog no longer covers it', 'Reflog уже не покрывает коммит'), L('The object database', 'База объектов'), L('git fsck --lost-found', 'git fsck --lost-found')],
          [L('The change is needed elsewhere', 'Изменение нужно в другом месте'), L('The commit itself', 'Сам коммит'), L('git cherry-pick <hash>', 'git cherry-pick <hash>')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Recover in two steps', 'Восстанавливайте в два шага'),
          text: L(
            'First make the commit reachable again, then decide what to do with it. Creating a branch with git branch rescue is the first step; resetting, cherry-picking or deleting the branch is the second, and it can wait until you have looked at the commit.',
            'Сначала сделайте коммит снова достижимым, а потом решайте, что с ним делать. Создание ветки через git branch rescue — первый шаг; reset, cherry-pick или удаление ветки — второй, и его можно отложить, пока вы не посмотрите на коммит.'
          ),
        },
      ],
      takeaway: L(
        'Recover in two steps: find the commit in the reflog, name it with a branch, and only then decide where it belongs.',
        'Восстанавливайте в два шага: найдите коммит в reflog, дайте ему имя через ветку и только потом решайте, где ему место.'
      ),
      seeAlso: [
        L('Section 4-4: the reflog as a safety net', 'Секция 4-4: reflog как страховочная сетка'),
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
      ],
    },
    {
      id: 'git-ch4-s6',
      title: L('Cleaning untracked files', 'Очистка неотслеживаемых файлов'),
      body: L(
        'git clean removes files that Git does not track, and nothing else. It never touches a tracked file, which sounds safe and is exactly why it is dangerous: build output, a downloaded archive, an editor backup and a file you have not added yet all look the same to it. The rule for this command is that you always run the dry run first.\n\nThe dry run is git clean -n, which prints what would be deleted without deleting anything. Read that list as carefully as you would read a diff. Then git clean -f performs the deletion, and -d extends it to untracked directories, which is where the real damage usually is: an untracked node_modules is one directory, and removing it is a different act from removing one file.\n\nBy default, ignored files are protected, and this is the setting that keeps the command survivable. git clean -f without -x leaves .gitignore alone, so your node_modules and your .env survive even though they are untracked. Adding -x removes ignored files too, and adding -a removes everything untracked including ignored ones. A safer form is git clean -i, which asks about each path before removing it.\n\nThe pattern of use that survives is: git status --ignored to see what is there, git clean -nd to preview, git clean -fd to act. And before any of it, check that the files you are about to lose contain nothing unique. A directory of local configuration, an exported database, a scratch file with the answer to a hard question: none of that is in Git, and the command does not know the difference.',
        'git clean удаляет файлы, которые Git не отслеживает, и больше ничего. Он никогда не трогает отслеживаемый файл, и это звучит безопасно, но именно поэтому он опасен: сборочный вывод, скачанный архив, резервная копия редактора и файл, который вы ещё не добавили, выглядят для него одинаково. Правило для этой команды простая: всегда сначала выполняйте пробный запуск.\n\nПробный запуск — это git clean -n, который печатает, что было бы удалено, ничего не удаляя. Читайте этот список так же внимательно, как читали бы дифф. Затем git clean -f выполняет удаление, а -d расширяет его на неотслеживаемые директории, и вот тут обычно и живут настоящие потери: неотслеживаемый node_modules — это одна директория, и её удаление — не то же самое, что удаление одного файла.\n\nПо умолчанию игнорируемые файлы защищены, и именно эта настройка делает команду пригодной для использования. git clean -f без -x не трогает .gitignore, поэтому node_modules и .env уцелеют, хотя они не отслеживаются. Флаг -x удаляет и игнорируемые файлы, а -a — вообще всё неотслеживаемое вместе с игнорируемым. Безопаснее форма git clean -i, которая спрашивает разрешение на каждый путь.\n\nРабочая последовательность, которая уцелеет: git status --ignored, чтобы увидеть, что там есть, git clean -nd для предпросмотра, git clean -fd для действия. И перед всем этим проверьте, что в удаляемых файлах нет ничего уникального. Директория с локальной конфигурацией, выгруженная база, черновик с ответом на трудный вопрос: ничто из этого не в Git, и команда не знает разницы.'
      ),
      bullets: [
        L('git clean only removes untracked files, never tracked ones.', 'git clean удаляет только неотслеживаемые файлы и никогда — отслеживаемые.'),
        L('Always run git clean -n first and read the list.', 'Всегда сначала выполняйте git clean -n и читайте список.'),
        L('-d extends the deletion to untracked directories.', '-d расширяет удаление на неотслеживаемые директории.'),
        L('Ignored files are protected unless -x or -a is used.', 'Игнорируемые файлы защищены, пока не добавлены -x или -a.'),
        L('git clean -i asks before every path.', 'git clean -i спрашивает разрешение на каждый путь.'),
      ],
      code: `# what is there
git status --ignored

# preview, then act
git clean -n
git clean -nd
git clean -fd

# ask about every path
git clean -i

# also remove ignored files, if you really mean it
git clean -fdx`,
      table: {
        caption: L('What each flag of git clean adds', 'Что добавляет каждый флаг git clean'),
        headers: [
          L('Flag', 'Флаг'),
          L('Effect', 'Действие'),
          L('Risk', 'Риск'),
        ],
        rows: [
          [L('-n', '-n'), L('Prints the list and deletes nothing', 'Печатает список и ничего не удаляет'), L('None', 'Нет')],
          [L('-f', '-f'), L('Deletes the listed untracked files', 'Удаляет перечисленные неотслеживаемые файлы'), L('Real', 'Реальный')],
          [L('-d', '-d'), L('Adds untracked directories', 'Добавляет неотслеживаемые директории'), L('Real', 'Реальный')],
          [L('-x', '-x'), L('Adds ignored files', 'Добавляет игнорируемые файлы'), L('High', 'Высокий')],
          [L('-i', '-i'), L('Asks before every path', 'Спрашивает перед каждым путём'), L('Low', 'Низкий')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The directory you did not know about', 'Директория, о которой вы не знали'),
          text: L(
            'Without -d, git clean removes files but leaves the directories, so an untracked build directory survives with its contents. Adding -d removes the whole tree at once, and a local .env inside such a directory disappears with it. Preview with -nd every single time.',
            'Без -d команда удаляет файлы, но оставляет директории, поэтому неотслеживаемая директория сборки уцелеет вместе с содержимым. С добавленным -d удаляется всё дерево разом, и локальный .env внутри такой директории исчезает вместе с ним. Предпросмотр через -nd — каждый раз.'
          ),
        },
      ],
      takeaway: L(
        'Preview with git clean -nd before deleting anything: untracked files are the only ones Git cannot restore for you.',
        'Предпросматривайте через git clean -nd перед удалением: неотслеживаемые файлы — единственные, которые Git не восстановит за вас.'
      ),
      seeAlso: [
        L('Section 4-3: git stash', 'Секция 4-3: git stash'),
        L('Section 2-1: git add and partial staging', 'Секция 2-1: git add и частичная индексация'),
      ],
    },
  ],
};
