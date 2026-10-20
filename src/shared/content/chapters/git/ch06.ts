import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh06: Chapter = {
  id: 'git-ch6',
  title: L('Pull requests and releases', 'Pull request и релизы'),
  summary: L(
    'How branch names encode intent, what a pull request is and is not, how tags and semver describe a version, how a changelog and a release pipeline fit together, and how a hotfix reaches production without breaking the trunk.',
    'Как имена веток кодируют намерение, чем pull request является и чем не является, как теги и семвер описывают версию, как устроены changelog и релизный конвейер и как хотфикс доходит до продакшена, не ломая основную ветку.'
  ),
  sections: [
    {
      id: 'git-ch6-s1',
      title: L('Branch naming and workflow', 'Именование веток и рабочий процесс'),
      body: L(
        'A branch name is metadata that every human in the project will read, and the popular convention splits it into a type, a scope and often a ticket: feature/checkout-validation, fix/duplicate-invoice, chore/bump-dependencies. The type says what kind of change this is, the scope says where it lives, and the ticket connects the branch to the tracker so that the history can be read without opening a second tool.\n\nThe reason to name branches this way is not aesthetics but automation. A release script that must collect the user-visible changes of a version needs to know which commits are worth listing, and a name like release/1.4.0 or feat/ gives it more than a name like work-in-progress. The same names let a CI pipeline decide whether to run the fast checks or the whole suite, and let a hotfix be found without asking a human where it lives.\n\nA branch also has a lifetime, and the workflow should say what ends it. A feature branch lives until it is merged and deleted. A release branch lives until the next minor version ships, because it still carries fixes for the previous line. A hotfix branch is cut from the tag of a released version, patched, released on its own and merged back into both the trunk and the release branch.\n\nThe rule that keeps the list readable is to delete branches when their work is done. A merged branch costs nothing to keep, but a list of two hundred branches hides the few that are still open. git branch --merged main and git branch --no-merged main tell you which is which, and the second list is the real work queue.',
        'Имя ветки — это метаданные, которые прочитает каждый человек в проекте, и популярное соглашение разбивает имя на тип, область и часто номер задачи: feature/checkout-validation, fix/duplicate-invoice, chore/bump-dependencies. Тип говорит, какого рода изменение это, область — где оно живёт, а номер задачи связывает ветку с трекером, чтобы историю можно было читать, не открывая второй инструмент.\n\nИменовать ветки так полезно не ради эстетики, а ради автоматизации. Релизный скрипт, который должен собрать заметные для пользователя изменения версии, должен понимать, какие коммиты стоит перечислить, и имя вроде release/1.4.0 или feat/ говорит ему больше, чем work-in-progress. Те же имена позволяют конвейеру CI решить, запускать быстрые проверки или весь набор, и позволяют найти хотфикс, не спрашивая человека, где он.\n\nУ ветки есть и срок жизни, и рабочий процесс должен говорить, чем он заканчивается. Feature-ветка живёт до слияния и удаления. Release-ветка живёт до выхода следующей минорной версии, потому что на ней ещё живут фиксы предыдущей линии. Ветка хотфикса вырезается из тега уже выпущенной версии, правится, выпускается отдельно и затем сливается и в основную ветку, и в release-ветку.\n\nПравило, которое держит список читаемым, — удалять ветки, когда работа закончена. Слитая ветка ничего не стоит, но список из двухсот веток прячет те немногочисленные, что ещё открыты. git branch --merged main и git branch --no-merged main показывают, что есть что, и второй список — это настоящая очередь работы.'
      ),
      bullets: [
        L('A branch name has a type, a scope and often a ticket number.', 'Имя ветки состоит из типа, области и часто номера задачи.'),
        L('Structured names let release scripts and CI decide what to run.', 'Структурированные имена позволяют релизным скриптам и CI решать, что запускать.'),
        L('Cut hotfix branches from a release tag, not from the branch under development.', 'Ветку хотфикса вырезают из тега релиза, а не из ветки в разработке.'),
        L('Merge-and-delete keeps the branch list readable.', 'Слияние с удалением держит список веток читаемым.'),
        L('A release branch carries fixes until the next minor version ships.', 'Release-ветка несёт фиксы до выхода следующей минорной версии.'),
      ],
      code: `# create a branch that says what it is for
git switch -c feature/checkout-validation
git switch -c fix/duplicate-invoice JIRA-1421

# a release branch cut from the current version
git switch -c release/1.4.0 v1.3.0

# what is still open
git branch --merged main
git branch --no-merged main`,
      table: {
        caption: L('Prefixes that describe the kind of work', 'Префиксы, описывающие вид работы'),
        headers: [L('Prefix', 'Префикс'), L('Meaning', 'Значение'), L('Example', 'Пример')],
        rows: [
          [L('feature/', 'feature/'), L('New behaviour', 'Новое поведение'), L('feature/checkout-validation', 'feature/checkout-validation')],
          [L('fix/', 'fix/'), L('A bug fix', 'Исправление бага'), L('fix/duplicate-invoice', 'fix/duplicate-invoice')],
          [L('chore/', 'chore/'), L('Maintenance with no user-visible effect', 'Обслуживание без заметного пользователю эффекта'), L('chore/bump-dependencies', 'chore/bump-dependencies')],
          [L('release/', 'release/'), L('Maintenance of a released line', 'Обслуживание выпущенной линии'), L('release/1.4', 'release/1.4')],
          [L('hotfix/', 'hotfix/'), L('A fix that ships immediately', 'Фикс, который уходит немедленно'), L('hotfix/1.3.1', 'hotfix/1.3.1')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Name the work, not the author', 'Называйте работу, а не автора'),
          text: L(
            'A branch named after a person tells the reader nothing six months later, and it breaks the moment the work changes hands. A branch named after the change stays meaningful for as long as the change matters, and it reads the same in a log, in a CI matrix and in a release script.',
            'Ветка, названная по имени человека, ничего не говорит читателю через полгода и ломается, как только работа переходит к другому. Ветка, названная по изменению, остаётся осмысленной, пока важно само изменение, и читается одинаково в логе, в матрице CI и в релизном скрипте.'
          ),
        },
      ],
      takeaway: L(
        'Name a branch for the change it carries, because the name is read by scripts, by reviewers and by the person who comes back in six months.',
        'Называйте ветку по изменению, которое она несёт: имя читают скрипты, ревьюеры и тот, кто вернётся к проекту через полгода.'
      ),
      seeAlso: [
        L('Section 6-2: pull requests and review', 'Секция 6-2: pull request и ревью'),
        L('Section 6-5: hotfixes on production', 'Секция 6-5: хотфиксы в продакшене'),
      ],
    },
    {
      id: 'git-ch6-s2',
      title: L('Pull requests and review', 'Pull request и ревью'),
      body: L(
        'A pull request is not a Git feature. Git knows nothing about it: it is a request to merge one branch into another, hosted by the server, usually with a discussion attached to it. What makes it useful is the ordering it enforces. The review happens before the merge, and the conversation lives next to the change instead of in a chat window that scrolls away and leaves no trace of why a decision was made.\n\nA good pull request is small. The reviewer job is to understand the diff, so a change that touches eight hundred lines is a change nobody reads line by line, and the comments drift towards style while the real mistake goes unnoticed. Splitting the work by concern is not bureaucracy, it is the condition that makes review work at all. When the pieces cannot be separated, that is a sign the design is wrong, and the review is where it shows up.\n\nThe description carries what the diff cannot: what problem is being solved, why this approach and not another, what was tried and rejected, and how the change was tested. A reviewer who has to reconstruct that from the commits alone will either fail to review the change or approve it without understanding it, and the second outcome is much worse than the first.\n\nReview comments are attached to lines, so they travel with the code through every later commit. Answer a comment with a reply or with a commit that fixes it, and resolve the thread when it is settled. Do not resolve a comment you did not answer, because the person who wrote it may be the only one who understands whether it was handled. And merge the branch only when the pipeline is green: a review that passed against an earlier commit says nothing about the code that is actually being merged.\n\nThere are three ways to merge. A merge commit keeps the branch history and records the integration as an event. A squash merge folds the branch into a single commit with a clean message. A rebase merge replays the commits linearly on top of the target. For a shared trunk the merge commit is the most informative, because the log shows where the two lines of work met, and the extra commit costs nothing.',
        'Pull request — не функция Git. Git ничего о нём не знает: это запрос на слияние одной ветки в другую, который живёт на сервере и обычно несёт рядом обсуждение. Полезен он тем, что задаёт порядок действий. Ревью происходит до слияния, а разговор живёт рядом с изменением, а не в чате, который прокручивается и не оставляет следа, почему было принято то или иное решение.\n\nХороший pull request небольшой. Работа ревьюера — понять дифф, поэтому изменение на восемьсот строк читают построчно единицы, комментарии уходят в стиль, а настоящая ошибка остаётся незамеченной. Разделение работы по смыслу — не бюрократия, это условие, при котором ревью вообще работает. Если части не разделяются, это признак неправильной архитектуры, и ревью — то самое место, где это проявится.\n\nОписание несёт то, чего не может нести дифф: какую проблему решают, почему выбран именно этот подход, что пробовали и отвергли и как изменение проверялось. Ревьюер, которому приходится собирать это по коммитам, либо не проверит изменение вовсе, либо одобрит его, не разобравшись, а второй исход куда хуже первого.\n\nКомментарии ревью привязаны к строкам, поэтому они едут вместе с кодом через все последующие коммиты. Отвечайте на комментарий ответом или коммитом с исправлением и закрывайте ветку обсуждения, когда вопрос решён. Не закрывайте комментарий, на который не ответили: автор может быть единственным, кто понимает, решён вопрос или нет. И сливайте ветку только при зелёном конвейере: ревью, прошедшее против более раннего коммита, ничего не говорит о коде, который реально сливается.\n\nСпособы слияния их три. Merge-коммит сохраняет историю ветки и записывает интеграцию как событие. Squash-слияние складывает ветку в один коммит с чистым сообщением. Rebase-слияние переносит коммиты линейно поверх целевой ветки. Для общей основной ветки информативнее merge-коммит: в логе видно, где сошлись две линии работы, а лишний коммит ничего не стоит.'
      ),
      bullets: [
        L('A pull request is a hosting feature, not a Git feature.', 'Pull request — это функция хостинга, а не Git.'),
        L('Small changes get reviewed, large changes get approved.', 'Небольшие изменения ревьюят, большие — одобряют.'),
        L('The description carries the why and the testing, the diff cannot.', 'Описание несёт зачем и как проверяли, дифф этого не несёт.'),
        L('Comments stay attached to the lines through every later commit.', 'Комментарии остаются привязанными к строкам через все последующие коммиты.'),
        L('A merge commit keeps the history, a squash merge keeps one commit.', 'Merge-коммит сохраняет историю, squash-слияние — один коммит.'),
      ],
      code: `# prepare the branch before asking for a review
git fetch origin
git rebase origin/main
git push -u origin feature/checkout-validation

# answer the review comments
git add src/app.ts
git commit -m "fix: validate the card number before charging"
git push

# what the reviewer looks at
git log --oneline origin/main..HEAD
git diff origin/main...HEAD --stat`,
      table: {
        caption: L('Three ways to merge a branch', 'Три способа слить ветку'),
        headers: [L('Style', 'Способ'), L('History', 'История'), L('Result', 'Результат')],
        rows: [
          [L('Merge commit', 'Merge-коммит'), L('Keeps the branch and the junction', 'Сохраняет ветку и точку схождения'), L('One extra commit on the target', 'Один лишний коммит в целевой ветке')],
          [L('Squash merge', 'Squash-слияние'), L('The branch disappears', 'Ветка исчезает'), L('One commit with the message you wrote', 'Один коммит с вашим сообщением')],
          [L('Rebase merge', 'Rebase-слияние'), L('Commits replayed linearly, hashes change', 'Коммиты переносятся линейно, хеши меняются'), L('A straight line, no junction recorded', 'Прямая линия, схождение не записано')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Read your own diff first', 'Сначала прочитайте свой дифф'),
          text: L(
            'Open the diff of the pull request yourself before you send the link. Most embarrassing review comments are about a stray console.log, a commented-out block or a debug file, and every one of them costs the reviewer a minute and the author a round trip.',
            'Откройте дифф pull request сами, до того как отправить ссылку. Большинство неловких замечаний ревью — это забытый console.log, закомментированный блок или отладочный файл, и каждое стоит ревьюеру минуты, а автору — лишнего раунда переписки.'
          ),
        },
      ],
      takeaway: L(
        'Keep the pull request small, put the why and the testing into the description, and answer every comment before merging.',
        'Держите pull request небольшим, выносите зачем и проверку в описание и отвечайте на каждый комментарий до слияния.'
      ),
      seeAlso: [
        L('Section 6-1: branch naming and workflow', 'Секция 6-1: именование веток и рабочий процесс'),
        L('Section 5-2: pull strategies', 'Секция 5-2: стратегии pull'),
      ],
    },
    {
      id: 'git-ch6-s3',
      title: L('Tags, annotated tags and semver', 'Теги, аннотированные теги и семвер'),
      body: L(
        'A tag is a name for a specific commit, and there are two kinds. A lightweight tag is a plain reference: it points at a commit and carries no message, no author and no date of its own. An annotated tag is an object with its own author, its own timestamp and a message, and it points at a commit, a tree or another tag. The first is a label, the second is a record.\n\nThe difference matters for tooling, because git describe and the release scripts need to know when a version was cut and why. A lightweight tag gives them nothing but a name, while an annotated tag can also be signed, and a signed tag is verifiable: it proves the tag came from the key holder and that the object it points at has not changed since.\n\nSemantic versioning gives the tag name a contract. MAJOR.MINOR.PATCH means that the major number changes when the public contract breaks, the minor number changes when functionality is added in a compatible way, and the patch number changes when a fix ships that changes nothing else. The v prefix is a convention, and the numbers are the part that carries the promise. A tag named v1.2.3 that means something different from semver is worse than no tag at all, because it teaches people to distrust the numbers.\n\nThe practical rule for a release: the tag is annotated, signed, and cut on a commit rather than on a branch. A tag on a branch is a promise that does not hold, because the branch moves every day. The commit behind the tag is frozen, so the tag keeps meaning the same thing for the whole life of the release, and a build from that tag can be reproduced years later.',
        'Тег — это имя для конкретного коммита, и бывают они двух видов. Лёгкий тег — обычная ссылка: она указывает на коммит и не несёт ни сообщения, ни автора, ни своей даты. Аннотированный тег — объект со своим автором, своим временем и сообщением, и он указывает на коммит, на дерево или на другой тег. Первый — это ярлык, второй — запись.\n\nРазница важна для инструментов, потому что git describe и релизные скрипты должны знать, когда была вырезана версия и зачем. Лёгкий тег не даёт им ничего, кроме имени, а аннотированный можно ещё и подписать, и подписанный тег проверяем: он доказывает, что тег выпущен владельцем ключа и что объект, на который он указывает, с тех пор не менялся.\n\nСемвер задаёт имени тега контракт. MAJOR.MINOR.PATCH означает, что мажорная часть меняется при ломке публичного контракта, минорная — при добавлении совместимой функциональности, а патч — при выходе фикса, который ничего больше не меняет. Префикс v — соглашение, а обещание несут числа. Тег v1.2.3 со значением, отличным от семвера, хуже, чем никакого тега: он учит людей не доверять цифрам.\n\nПрактическое правило для релиза: тег аннотированный, подписанный и поставленный на коммит, а не на ветку. Тег на ветке — обещание, которое не сдерживается, потому что ветка двигается каждый день. Коммит за тегом заморожен, поэтому тег сохраняет смысл на всю жизнь релиза, а сборку с этого тега можно воспроизвести спустя годы.'
      ),
      bullets: [
        L('A lightweight tag is a reference, an annotated tag is an object with a message.', 'Лёгкий тег — ссылка, аннотированный — объект с сообщением.'),
        L('An annotated tag carries an author and a date of its own.', 'Аннотированный тег несёт собственного автора и дату.'),
        L('A signed tag proves who cut the release and that it was not changed.', 'Подписанный тег доказывает, кто выпустил релиз и что его не меняли.'),
        L('Semver: major for a broken contract, minor for features, patch for fixes.', 'Семвер: мажор для ломки контракта, минор для функций, патч для фиксов.'),
        L('Tag a commit, not a branch: a branch moves and the tag stops meaning anything.', 'Ставьте тег на коммит, а не на ветку: ветка двигается, и тег перестаёт что-то значить.'),
      ],
      code: `# annotated tag with a message
git tag -a v1.4.0 -m "Release 1.4.0"

# lightweight tag, no message and no author
git tag v1.4.0-rc1

# signed tag with your GPG or SSH key
git tag -s v1.4.0 -m "Release 1.4.0"

# check what the tag points at and verify the signature
git show v1.4.0
git verify-tag v1.4.0

# what version is this commit
git describe --tags --always`,
      table: {
        caption: L('Lightweight and annotated tags', 'Лёгкие и аннотированные теги'),
        headers: [L('Aspect', 'Аспект'), L('Lightweight', 'Лёгкий'), L('Annotated', 'Аннотированный')],
        rows: [
          [L('Stored as', 'Хранится как'), L('A plain reference', 'Обычная ссылка'), L('A tag object', 'Объект тега')],
          [L('Carries a message', 'Несёт сообщение'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('Has its own author and date', 'Свой автор и дата'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('Can be signed', 'Может быть подписан'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('git describe reports a version', 'git describe показывает версию'), L('Only with --tags', 'Только с --tags'), L('Always', 'Всегда')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A tag on a branch is not a version', 'Тег на ветке — это не версия'),
          text: L(
            'Pointing a tag at a branch freezes nothing: the tag follows the branch, and the build you call v1.4.0 today may contain different code tomorrow. Cut the tag on the commit that was actually built and tested, and treat that commit as the definition of the release.',
            'Тег на ветке ничего не замораживает: тег следует за веткой, и сборка, которую сегодня называют v1.4.0, завтра может содержать другой код. Ставьте тег на тот коммит, который действительно собрали и протестировали, и считайте этот коммит определением релиза.'
          ),
        },
      ],
      takeaway: L(
        'Release tags are annotated, signed and cut on a commit, and their names follow semver.',
        'Теги релизов аннотированные, подписанные и ставятся на коммит, а их имена следуют семверу.'
      ),
      seeAlso: [
        L('Section 6-4: changelogs and release automation', 'Секция 6-4: changelog и автоматизация релизов'),
        L('Section 7-5: signing commits and tags', 'Секция 7-5: подпись коммитов и тегов'),
      ],
    },
    {
      id: 'git-ch6-s4',
      title: L('Changelogs and release automation', 'Changelog и автоматизация релизов'),
      body: L(
        'A changelog is a file, but the value is in the convention that produces it. The entries are grouped by version and read as a list of changes a user can notice: added, changed, fixed, removed. The rule that keeps it useful is that every entry says what the user gets, not which files were touched. "Fixed the crash when the cart was emptied twice" is a changelog entry; "refactored cart.ts" is not.\n\nKeep A Changelog defines the shape of the file and the semantics of the version headings, and the convention is worth following exactly, because tooling depends on it. Unreleased holds the changes that are not published yet, and every version heading holds the changes of that release. Keeping the Unreleased section alive between releases is what lets the changelog be written as the work happens rather than reconstructed afterwards from memory.\n\nThe changelog is best generated from the commits, and that requires the commits to carry the information. Conventional Commits gives every commit a type, a scope and a subject, so a script can group the fixes under Fixed and the features under Added without reading a single diff. When the commit message says nothing about the user-visible effect, the entry has to be written by hand, and that is where most changelogs become fiction.\n\nRelease automation applies the same idea to the whole release. A tag triggers a workflow that bumps the version, updates the changelog, builds the artefacts, publishes them and creates the release page with the notes. The important part is that the tag is the trigger and the version number lives in exactly one place, so a release becomes a single command instead of a checklist somebody keeps in their head. The build that the tag produces should be reproducible from the tagged commit alone.',
        'Changelog — это файл, но ценность в соглашении, которое его порождает. Записи группируются по версиям и читаются как список изменений, заметных пользователю: добавлено, изменено, исправлено, удалено. Правило, которое делает файл полезным: каждая запись говорит, что получит пользователь, а не какие файлы поменялись. «Исправлен краш при двойном опустошении корзины» — это запись в changelog, а «переработан cart.ts» — нет.\n\nKeep A Changelog задаёт форму файла и смысл заголовков версий, и этому соглашению стоит следовать буквально, потому что от него зависят инструменты. Unreleased хранит изменения, которые ещё не опубликованы, а заголовок каждой версии — изменения этого релиза. Живой раздел Unreleased между релизами позволяет писать changelog по ходу работы, а не восстанавливать его по памяти задним числом.\n\nЛучше всего changelog генерируется из коммитов, и для этого коммиты должны нести информацию. Conventional Commits даёт каждому коммиту тип, область и тему, поэтому скрипт может разложить фиксы по Fixed, а новые возможности по Added, не читая ни одного диффа. Если в сообщении коммита нет ничего о том, что заметит пользователь, запись приходится писать руками, и именно здесь большинство changelog превращается в вымысел.\n\nАвтоматизация релизов применяет ту же идею ко всему релизу. Тег запускает конвейер, который поднимает версию, обновляет changelog, собирает артефакты, публикует их и создаёт страницу релиза с заметками. Важная часть в том, что тег служит триггером, а номер версии живёт ровно в одном месте, поэтому релиз превращается в одну команду вместо чек-листа, который кто-то держит в голове. Сборка, которую даёт тег, должна воспроизводиться из помеченного коммита.'
      ),
      bullets: [
        L('A changelog entry describes the user-visible effect, not the files.', 'Запись changelog описывает заметный пользователю эффект, а не файлы.'),
        L('Keep A Changelog keeps unreleased work in one section above the versions.', 'Keep A Changelog держит невыпущенное в одном разделе над версиями.'),
        L('Conventional Commits give the generator the type and the scope.', 'Conventional Commits дают генератору тип и область.'),
        L('Without structured messages the changelog has to be written by hand.', 'Без структурированных сообщений changelog приходится писать руками.'),
        L('A tag is the trigger for the release pipeline, so a release is reproducible.', 'Тег служит триггером релизного конвейера, поэтому релиз воспроизводим.'),
      ],
      code: `# collect the commits for the next version
git log --oneline v1.3.0..HEAD
git log --pretty=format:"%s" v1.3.0..HEAD

# the changelog lives in CHANGELOG.md and has one section per version
# ## [Unreleased]
# - Added: card validation before charging
#
# ## [1.4.0] - 2026-03-14
# - Fixed: duplicate invoice on a retried payment

# cut the version, then let the tag trigger the pipeline
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin v1.4.0

# publish the branch the release was cut from
git push origin main`,
      table: {
        caption: L('Where a changelog entry comes from', 'Откуда берётся запись в changelog'),
        headers: [L('Source', 'Источник'), L('What it gives', 'Что даёт'), L('Needs', 'Требует')],
        rows: [
          [L('Commit subject', 'Тема коммита'), L('One line per change', 'Одна строка на изменение'), L('A structured message format', 'Структурированный формат сообщений')],
          [L('Pull request description', 'Описание pull request'), L('The why behind the change', 'Зачем это изменение'), L('A description that was written', 'Написанное описание')],
          [L('Manual entry', 'Ручная запись'), L('Anything the automation cannot see', 'То, чего автоматизация не видит'), L('A person who remembers', 'Человек, который помнит')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Write the entry as the user would report it', 'Пишите запись так, как её описал бы пользователь'),
          text: L(
            'A changelog is read by people deciding whether to upgrade. "Fixed a null dereference in the parser" helps them; "Fixed the crash when an empty file was parsed" helps them decide. The second one costs nothing extra to write and answers the only question the reader has.',
            'Changelog читают люди, решающие, обновляться ли. «Исправлен разыменование null в парсере» помогает им, а «исправлен краш при разборе пустого файла» помогает им решить. Второе стоит ноль усилий и отвечает на единственный вопрос читателя.'
          ),
        },
      ],
      takeaway: L(
        'Structured commit messages make the changelog a byproduct; unstructured ones turn it into a chore you will skip.',
        'Структурированные сообщения коммитов делают changelog побочным продуктом, неструктурированные превращают его в рутину, которую будут пропускать.'
      ),
      seeAlso: [
        L('Section 2-3: writing commit messages that explain why', 'Секция 2-3: сообщения коммитов, объясняющие зачем'),
        L('Section 6-3: tags, annotated tags and semver', 'Секция 6-3: теги, аннотированные теги и семвер'),
      ],
    },
    {
      id: 'git-ch6-s5',
      title: L('Hotfixes on production', 'Хотфиксы в продакшене'),
      body: L(
        'A hotfix is a change that cannot wait for the next release. The code it repairs is running in production, so the fix has to ship on its own, and the release line has to stay open while it exists. That is the reason release branches exist: they carry the fixes for an older version until somebody decides that version is no longer supported and closes the line.\n\nThe procedure has a fixed shape. Cut the branch from the tag of the released version, not from the branch under development: git switch -c hotfix/1.3.1 v1.3.0. Write the fix, write the test that was missing, commit both, tag the result as v1.3.1 and push the tag. The tag is what tells the pipeline which version to build and which package to publish.\n\nThen merge the hotfix back into the trunk. The trunk already contains the same change in a different form, because the fix was written against the older code, so this is a real merge and it may conflict. This is the classic case for a merge commit rather than a rebase: the history of a release must keep the fix visible, and a rebase would rewrite commits that other people have already pulled.\n\nA hotfix also needs a regression test and, often, a change in the monitoring. The bug reached production, which means it survived the review, the tests and the staging environment. The test that arrives with the fix is the part that makes it not happen twice, and writing it later is writing it never. The release notes of a hotfix should also say what changed, because a patch version that silently alters behaviour is a patch version nobody installs.',
        'Хотфикс — это изменение, которое не может ждать следующего релиза. Код, который он чинит, работает в продакшене, поэтому фикс должен уйти отдельно, а линия релиза должна оставаться открытой, пока он существует. Именно ради этого и существуют release-ветки: они несут фиксы для старой версии, пока кто-то не решит, что версия больше не поддерживается, и не закроет линию.\n\nПроцедура имеет фиксированную форму. Ветку вырезают из тега выпущенной версии, а не из ветки в разработке: git switch -c hotfix/1.3.1 v1.3.0. Пишут фикс, пишут недостающий тест, коммитят оба, помечают результат тегом v1.3.1 и отправляют тег. Именно тег говорит конвейеру, какую версию собирать и какой пакет публиковать.\n\nЗатем хотфикс сливают обратно в основную ветку. Там то же изменение уже есть в другой форме, потому что фикс писался под старый код, так что это настоящее слияние, и оно может дать конфликт. Это классический случай для merge-коммита, а не для перебазирования: история релиза должна сохранять фикс видимым, а перебазирование переписало бы коммиты, которые другие уже забрали.\n\nХотфиксу нужен ещё и регрессионный тест, а часто и правка мониторинга. Баг дошёл до продакшена, то есть прошёл ревью, тесты и стенд. Тест, приезжающий вместе с фиксом, — это и есть часть, которая не даст ему повториться, а написание теста позже равносильно его не написанию. В заметках к релизу хотфикса тоже надо сказать, что изменилось: патч-версия, молча меняющая поведение, — это патч-версия, которую никто не поставит.'
      ),
      bullets: [
        L('Cut the hotfix branch from the release tag, not from the trunk.', 'Ветку хотфикса вырезают из тега релиза, а не из основной ветки.'),
        L('Keep the release branch open while the hotfix is supported.', 'Пока хотфикс поддерживается, release-ветка остаётся открытой.'),
        L('Merge the hotfix back into the trunk with a merge commit.', 'Сливайте хотфикс обратно в основную ветку merge-коммитом.'),
        L('Add the regression test with the fix, not in a later ticket.', 'Добавляйте регрессионный тест вместе с фиксом, а не позже отдельной задачей.'),
        L('The hotfix release gets its own patch version and its own tag.', 'Хотфикс получает собственную патч-версию и собственный тег.'),
      ],
      code: `# cut the hotfix from the released version
git fetch origin --tags
git switch -c hotfix/1.3.1 v1.3.0

# write the fix and the regression test, then commit
git add src/payments.ts test/payments.spec.ts
git commit -m "fix: reject a retry with the same idempotency key"

# release the patch
git tag -a v1.3.1 -m "Release 1.3.1"
git push origin hotfix/1.3.1 v1.3.1

# bring the fix back into the trunk
git switch main
git merge --no-ff hotfix/1.3.1
git push origin main`,
      table: {
        caption: L('The three long-lived branches', 'Три долгоживущие ветки'),
        headers: [L('Branch', 'Ветка'), L('Cut from', 'Вырезана из'), L('Ends when', 'Заканчивается, когда')],
        rows: [
          [L('main', 'main'), L('The previous release', 'Предыдущего релиза'), L('Never, it is the trunk', 'Никогда, это основная ветка')],
          [L('release/1.3', 'release/1.3'), L('The tag v1.3.0', 'Тега v1.3.0'), L('Version 1.3 is no longer supported', 'Версия 1.3 больше не поддерживается')],
          [L('hotfix/1.3.1', 'hotfix/1.3.1'), L('The tag v1.3.0', 'Тега v1.3.0'), L('The patch is released and merged back', 'Патч выпущен и слит обратно')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A hotfix that skips the trunk comes back as a conflict', 'Хотфикс, миновавший основную ветку, вернётся конфликтом'),
          text: L(
            'Fixing production and merging the fix into the trunk later means the trunk and the release line drift apart, and the next merge has to reconcile two versions of the same problem. Merge the hotfix back into the trunk as soon as the patch is released, while the context is still fresh.',
            'Починить продакшен и слить фикс в основную ветку позже значит развести основную ветку и линию релиза, и следующее слияние будет разбирать две версии одной и той же проблемы. Сливайте хотфикс в основную ветку сразу после выпуска патча, пока контекст ещё свежий.'
          ),
        },
      ],
      takeaway: L(
        'Cut a hotfix from the release tag, tag the patch, and merge it back into the trunk with a merge commit.',
        'Вырезайте хотфикс из тега релиза, помечайте патч тегом и сливайте его обратно в основную ветку merge-коммитом.'
      ),
      seeAlso: [
        L('Section 6-3: tags, annotated tags and semver', 'Секция 6-3: теги, аннотированные теги и семвер'),
        L('Section 3-2: the merge base and the three-way merge', 'Секция 3-2: база слияния и трёхстороннее слияние'),
      ],
    },
  ],
};
