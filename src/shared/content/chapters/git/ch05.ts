import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const gitCh05: Chapter = {
  id: 'git-ch5',
  title: L('Remotes and collaboration', 'Удалённые репозитории и совместная работа'),
  summary: L(
    'What a remote really is, why fetch and push are not symmetric, how the upstream decides where a plain push goes, and when a force push destroys the work of somebody else.',
    'Что такое удалённый репозиторий на самом деле, почему fetch и push несимметричны, как ветка отслеживания определяет, куда уйдёт обычный push, и когда принудительная отправка уничтожает чужую работу.'
  ),
  sections: [
    {
      id: 'git-ch5-s1',
      title: L('Remotes, fetch and push', 'Удалённые репозитории, fetch и push'),
      body: L(
        'A remote is nothing more than a name Git gives to a URL. git remote add origin git@github.com:team/project.git writes that name and the address into .git/config, and git remote -v prints every remote with its URLs for fetching and pushing. The name is entirely local: origin is a convention, not a rule, and a single repository can hold several remotes at once, for example upstream for the original project and origin for your own fork.\n\nTwo commands move objects between your machine and a remote, and they are not symmetric. git fetch downloads commits, trees and blobs and updates the remote-tracking branches under refs/remotes, leaving your working tree and your current branch completely untouched. git push sends your local commits to a remote branch and moves that branch forward. Fetch is a read of shared state, push is a write to it, and the difference shows up the moment somebody else pushes in between.\n\nA push is rejected when the remote branch holds commits you do not have, and the rejection is information rather than an obstacle. The remote moved first, so the honest order is: git fetch to learn what arrived, then integrate it with a merge or a rebase, and push again. Forcing the push past a rejection removes the commits of the other person from the branch, and the damage stays invisible until somebody pulls and finds their work missing.\n\nBecause push writes to shared state, its preconditions matter. A branch that others have already pulled must never be rewritten, and a branch that does not exist on the remote yet needs the -u flag so that Git records which remote branch it corresponds to. The rest of this chapter deals with exactly these two questions: where the push goes, and when a rewrite is allowed at all.',
        'Удалённый репозиторий — это просто имя, которое Git даёт URL-адресу. Команда git remote add origin git@github.com:team/project.git записывает это имя и адрес в .git/config, а git remote -v печатает все удалённые репозитории с их адресами для получения и отправки. Имя целиком локальное: origin — соглашение, а не правило, и в одном репозитории может быть несколько удалённых репозиториев, например upstream для исходного проекта и origin для вашего форка.\n\nДве команды перемещают объекты между вашей машиной и удалённым репозиторием, и они несимметричны. git fetch скачивает коммиты, деревья и блобы и обновляет отслеживающие ветки в refs/remotes, не трогая ни рабочее дерево, ни текущую ветку. git push отправляет ваши локальные коммиты в удалённую ветку и двигает её вперёд. Fetch — чтение общего состояния, push — запись в него, и разница проявляется ровно тогда, когда кто-то отправит свои коммиты между этими шагами.\n\nPush отклоняется, когда в удалённой ветке есть коммиты, которых нет у вас, и отклонение — это информация, а не препятствие. Первым сдвинулся сервер, поэтому честный порядок такой: git fetch, чтобы узнать, что пришло, затем встроить это слиянием или перебазированием и отправить снова. Форсирование push в обход отклонения убирает чужие коммиты из ветки, и ущерб остаётся незаметным, пока кто-нибудь не заберёт изменения и не обнаружит, что его работу потеряли.\n\nПоскольку push пишет в общее состояние, его предусловия имеют значение. Ветку, которую уже забрали другие, переписывать нельзя, а ветке, которой на сервере ещё нет, нужен флаг -u, чтобы Git записал, какой удалённой ветке она соответствует. Остальная часть главы посвящена ровно этим двум вопросам: куда уходит push и когда перезапись вообще допустима.'
      ),
      bullets: [
        L('A remote is a local name for a URL stored in .git/config.', 'Удалённый репозиторий — локальное имя для URL из .git/config.'),
        L('git fetch updates refs/remotes and never touches your working tree.', 'git fetch обновляет refs/remotes и не трогает рабочее дерево.'),
        L('git push writes to the remote and is rejected when it would drop commits.', 'git push пишет на сервер и отклоняется, если пришлось бы отбросить коммиты.'),
        L('origin is a convention, and one repository can hold several remotes.', 'origin — соглашение, и в репозитории может быть несколько удалённых.'),
        L('A rejected push means the remote moved first, not that your push is broken.', 'Отклонённый push означает, что сервер сдвинулся первым, а не что ваш push сломан.'),
      ],
      code: `# list the remotes and their addresses
git remote -v

# add a remote under a local name
git remote add origin git@github.com:team/project.git
git remote add upstream https://github.com/original/project.git

# download commits without touching the working tree
git fetch origin --prune

# publish a branch and remember what it tracks
git push -u origin feature/checkout-validation`,
      table: {
        caption: L('Fetch and push from both sides', 'Fetch и push с двух сторон'),
        headers: [L('Aspect', 'Аспект'), L('fetch', 'fetch'), L('push', 'push')],
        rows: [
          [L('Direction', 'Направление'), L('Remote to local', 'С сервера на машину'), L('Local to remote', 'С машины на сервер')],
          [L('Working tree', 'Рабочее дерево'), L('Untouched', 'Не трогается'), L('Rewritten on checkout of the remote branch', 'Переписывается при переключении на удалённую ветку')],
          [L('Shared state', 'Общее состояние'), L('Read only', 'Только чтение'), L('Written', 'Запись')],
          [L('Typical failure', 'Типичный сбой'), L('Rare, network only', 'Редко, только сеть'), L('Rejected when the remote moved ahead', 'Отклонение, если сервер ушёл вперёд')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A rejected push is a message', 'Отклонённый push — это сообщение'),
          text: L(
            'The error says non-fast-forward and it means the remote branch holds commits your branch does not have. Integrating them is not optional: a forced push deletes them for everybody, and the colleague who wrote them finds out only at their next pull.',
            'Ошибка говорит non-fast-forward, то есть в удалённой ветке есть коммиты, которых нет в вашей. Встроить их обязательно: принудительный push удалит их у всех, а коллега, который их написал, узнает об этом только при следующей отправке изменений.'
          ),
        },
      ],
      takeaway: L(
        'Fetch before you push, integrate what arrived, and treat a rejected push as information rather than as an obstacle.',
        'Делайте fetch перед push, встраивайте пришедшее и относитесь к отклонению как к информации, а не как к препятствию.'
      ),
      seeAlso: [
        L('Section 3-4: rebase and history rewriting', 'Секция 3-4: перебазирование и переписывание истории'),
        L('Section 5-3: tracking branches and upstream', 'Секция 5-3: ветки отслеживания и upstream'),
        L('Chapter 6: pull requests and releases', 'Глава 6: pull request и релизы'),
      ],
    },
    {
      id: 'git-ch5-s2',
      title: L('Pull strategies: merge, rebase and pull --rebase', 'Стратегии pull: merge, rebase и pull --rebase'),
      body: L(
        'A pull is a fetch followed by an integration step, and the integration step is where teams argue. git pull --merge runs a merge commit when the two histories diverged, which keeps the record of both sides and matches the merge policy of a shared trunk. git pull --rebase takes your local commits and replays them on top of what was just fetched, so the branch stays a straight line and the integration leaves no extra commit behind.\n\nThe third strategy is git pull --ff-only, which refuses to integrate unless a fast-forward is possible. It is not a strategy for everyday work, it is a guard: it turns the assumption that the update will be clean into an explicit error instead of a surprise merge commit in the middle of a feature branch. The same guard exists for push, as git push --force-with-lease, and the two protect the same thing from opposite sides.\n\nChoose per branch, not per person. A long-lived shared branch such as main is usually merged, because merge commits record that two lines of work came together and they are cheap to read in the log. A personal branch that nobody else has pulled is usually rebased, because nobody has to reconcile the rewritten hashes afterwards. What matters is that the whole team uses the same strategy for the same branch, since alternating between merge and rebase on one branch produces duplicate commits and a history nobody can read.\n\nThe strategy can also be configured so that you stop choosing by hand. git config --global pull.rebase true sets the default for every repository on the machine, and git config pull.ff only makes a fast-forward the only permitted outcome. Set these once, deliberately, and check what they are with git config --get pull.rebase.',
        'Pull — это fetch плюс шаг интеграции, и именно на шаге интеграции команды спорят. Команда git pull --merge создаёт merge-коммит, когда истории разошлись, и тем самым сохраняет запись о обеих сторонах и соответствует политике слияния общей основной ветки. Команда git pull --rebase берёт ваши локальные коммиты и переносит их поверх только что полученного, так что ветка остаётся прямой линией и интеграция не оставляет после себя лишнего коммита.\n\nТретья стратегия — git pull --ff-only: она отказывается интегрировать, если fast-forward невозможен. Это не стратегия для повседневной работы, а страховка: она превращает предположение «обновление будет чистым» в явную ошибку вместо неожиданного merge-коммита посреди feature-ветки. Такая же страховка есть и у push, это git push --force-with-lease, и обе защищают одно и то же с разных сторон.\n\nВыбирайте стратегию для ветки, а не для человека. Долгоживущая общая ветка вроде main обычно сливается, потому что merge-коммиты записывают, где сошлись две линии работы, и читаются в логе дёшево. Личная ветка, которую никто не забирал, обычно перебазируется, потому что никому потом не придётся разбираться с переписанными хешами. Важно, чтобы вся команда использовала одну и ту же стратегию для одной ветки: чередование merge и rebase на одной ветке даёт дублирующиеся коммиты и историю, которую не прочитать.\n\nСтратегию можно зафиксировать в конфигурации, чтобы не выбирать каждый раз руками. git config --global pull.rebase true задаёт умолчание для всех репозиториев на машине, а git config pull.ff only делает единственным допустимым исходом fast-forward. Настройте это один раз, осознанно, и проверяйте результат командой git config --get pull.rebase.'
      ),
      bullets: [
        L('A pull is fetch plus an integration step, and the step is where the strategies differ.', 'Pull — это fetch плюс шаг интеграции, и различия стратегий именно в нём.'),
        L('--merge records the meeting point with a merge commit, --rebase keeps the line straight.', '--merge записывает точку встречи merge-коммитом, --rebase сохраняет прямую линию.'),
        L('--ff-only is a guard that turns a divergence into an explicit error.', '--ff-only — страховка, превращающая расхождение в явную ошибку.'),
        L('Rebase personal branches, merge shared branches, and never mix them on one branch.', 'Перебазируйте личные ветки, сливайте общие и никогда не смешивайте на одной ветке.'),
        L('git config pull.rebase sets the default for every repository.', 'git config pull.rebase задаёт умолчание для всех репозиториев.'),
      ],
      code: `# see what the remote has before integrating it
git fetch origin
git log --oneline HEAD..origin/main

# merge the fetched state
git pull --no-rebase origin main

# replay local commits on top of it instead
git pull --rebase origin main

# refuse to integrate unless a fast-forward is possible
git pull --ff-only origin main

# make one strategy the default for every repository
git config --global pull.rebase true
git config --get pull.rebase`,
      table: {
        caption: L('The two ways to integrate the fetched state', 'Два способа встроить полученное состояние'),
        headers: [L('Aspect', 'Аспект'), L('--merge', '--merge'), L('--rebase', '--rebase')],
        rows: [
          [L('Result', 'Результат'), L('A merge commit appears', 'Появляется merge-коммит'), L('No extra commit, commits are replayed', 'Лишнего коммита нет, коммиты переносятся')],
          [L('History', 'История'), L('Keeps both lines and their junction', 'Сохраняет обе линии и точку их схождения'), L('Rewritten into one straight line', 'Переписывается в одну прямую линию')],
          [L('Best for', 'Лучше для'), L('Shared, long-lived branches', 'Общих долгоживущих веток'), L('Personal branches nobody has pulled', 'Личных веток, которые никто не забирал')],
          [L('Cost', 'Цена'), L('Extra commit in the log', 'Лишний коммит в логе'), L('New hashes for the replayed commits', 'Новые хеши у перенесённых коммитов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two strategies on one branch', 'Две стратегии на одной ветке'),
          text: L(
            'Merging once and rebasing later leaves the same change in the history twice: once as a merge commit and once as replayed commits. Nobody can tell which one is the real one, and the next conflict appears twice. Pick the strategy for the branch and write it down where the whole team can see it.',
            'Одно слияние и последующее перебазирование оставят одно и то же изменение в истории дважды: один раз как merge-коммит и один раз как перенесённые коммиты. Понять, какой из них настоящий, не сможет никто, а следующий конфликт появится дважды. Выберите стратегию для ветки и запишите её там, где её увидит вся команда.'
          ),
        },
      ],
      takeaway: L(
        'Pick one integration strategy per branch, configure it in the repository, and keep the whole team on it.',
        'Выберите одну стратегию интеграции для ветки, зафиксируйте её в репозитории и держите всю команду на ней.'
      ),
      seeAlso: [
        L('Section 3-3: merge strategies and fast-forward', 'Секция 3-3: стратегии слияния и fast-forward'),
        L('Section 5-1: remotes, fetch and push', 'Секция 5-1: удалённые репозитории, fetch и push'),
      ],
    },
    {
      id: 'git-ch5-s3',
      title: L('Tracking branches and upstream', 'Ветки отслеживания и upstream'),
      body: L(
        'A local branch can record the remote branch it corresponds to. That record is two pieces: the name of the remote and the name of the branch on it. git branch -vv prints both, marked with [origin/feature/x], and next to them the numbers of commits the branch is ahead or behind. The record is what allows a bare git push and a bare git pull to do the right thing instead of guessing.\n\nThe record is created by git push -u origin feature/x, or later by git branch --set-upstream-to=origin/main main. After it exists, git status starts telling you that your branch is behind origin/main by three commits instead of leaving you to guess, and the push and pull commands work without arguments. The record is stored in .git/config, so it is local, it is never pushed, and every collaborator has to create it for their own branches.\n\nThe remote-tracking branch is a different thing from the upstream. refs/remotes/origin/main is your local copy of what origin/main looked like at the last fetch, and it is what the tracking information points at. When somebody else pushes, your copy does not move until you fetch, so the phrase up to date with origin/main can be hours out of date. That is why a green pipeline on a stale remote branch is not evidence of anything.\n\nThe trap is that a plain git push pushes to the tracked upstream, which is not always the branch you had in mind. On a branch that tracks origin/main, git push sends main to the server and leaves your feature branch behind. The habit that removes the ambiguity is to look at git branch -vv before every push, or to name the refspec explicitly: git push origin feature/x.',
        'Локальная ветка может записывать, какой удалённой ветке она соответствует. Запись состоит из двух частей: имени удалённого репозитория и имени ветки на нём. Команда git branch -vv печатает и то и другое в виде [origin/feature/x], а рядом — число коммитов, на сколько ветка опережает или отстаёт. Именно эта запись позволяет голым git push и голым git pull сделать правильное, а не угадывать.\n\nЗапись создаётся командой git push -u origin feature/x или позже командой git branch --set-upstream-to=origin/main main. После этого git status начинает сообщать, что ваша ветка отстаёт от origin/main на три коммита, а не заставляет вас гадать, и push с pull работают без аргументов. Запись хранится в .git/config, то есть она локальная, никогда не отправляется, и каждому участнику команды нужно создать свою для своих веток.\n\nОтслеживающая ветка на сервере — это не то же самое, что upstream. refs/remotes/origin/main — ваша локальная копия того, как origin/main выглядел при последнем fetch, и именно на неё указывает запись отслеживания. Когда кто-то другой отправляет свои коммиты, ваша копия не двигается до следующего fetch, поэтому фраза «в курсе origin/main» может на несколько часов отставать от реальности. Именно поэтому зелёная сборка на устаревшей ветке не является доказательством ничего.\n\nЛовушка в том, что обычный git push отправляет изменения в отслеживаемый upstream, и это не всегда та ветка, которая имелась в виду. На ветке, отслеживающей origin/main, git push отправит main на сервер, а вашу feature-ветку оставит на месте. Привычка, снимающая неоднозначность: смотреть git branch -vv перед каждым push или указывать refspec явно — git push origin feature/x.'
      ),
      bullets: [
        L('Tracking records a remote name and a branch name, and git branch -vv shows it.', 'Отслеживание хранит имя удалённого репозитория и имя ветки, и git branch -vv это показывает.'),
        L('git push -u origin branch creates the tracking record.', 'git push -u origin branch создаёт запись отслеживания.'),
        L('refs/remotes/origin/main is your local copy, refreshed only by fetch.', 'refs/remotes/origin/main — ваша локальная копия, обновляемая только через fetch.'),
        L('A branch may track a branch on a different remote.', 'Ветка может отслеживать ветку на другом удалённом репозитории.'),
        L('A plain git push goes to the tracked upstream, so check it before pushing.', 'Обычный git push идёт в отслеживаемый upstream, поэтому проверяйте его перед отправкой.'),
      ],
      code: `# what tracks what
git branch -vv
git rev-parse --abbrev-ref feature/x@{upstream}

# create the tracking record
git push -u origin feature/checkout-validation
git branch --set-upstream-to=origin/main main

# the record is local configuration
git config --get branch.feature/checkout-validation.remote

# refresh the remote-tracking copy before trusting it
git fetch origin
git log --oneline origin/main..main`,
      table: {
        caption: L('The four names you meet in a Git repository', 'Четыре имени, которые встречаются в репозитории'),
        headers: [L('Name', 'Имя'), L('Points at', 'Указывает на'), L('Updated by', 'Обновляется')],
        rows: [
          [L('refs/heads/main', 'refs/heads/main'), L('Your local branch', 'Ваша локальная ветка'), L('git commit, git merge, git reset', 'git commit, git merge, git reset')],
          [L('refs/remotes/origin/main', 'refs/remotes/origin/main'), L('Your copy of the remote branch', 'Ваша копия удалённой ветки'), L('git fetch only', 'только git fetch')],
          [L('main@{upstream}', 'main@{upstream}'), L('The branch the local one tracks', 'Ветку, которую отслеживает локальная'), L('The fetch that refreshed it', 'Тот fetch, который её обновил')],
          [L('HEAD', 'HEAD'), L('The current branch, or a commit', 'Текущую ветку или коммит'), L('git switch, git checkout, git commit', 'git switch, git checkout, git commit')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Tracking is not the remote state', 'Отслеживание — это не состояние сервера'),
          text: L(
            'The tracking record says where your branch points, not what is on the server right now. Until you fetch, origin/main in your repository is a snapshot from the last fetch, and a pipeline that passed against it says nothing about the current tip of the branch.',
            'Запись отслеживания говорит, куда указывает ваша ветка, а не что сейчас лежит на сервере. До очередного fetch origin/main в вашем репозитории — это снимок с прошлого fetch, и успешная сборка на нём ничего не говорит о текущем конце ветки.'
          ),
        },
      ],
      takeaway: L(
        'Run git branch -vv before every push: the tracking record tells you exactly where a plain git push will go.',
        'Проверяйте git branch -vv перед каждым push: запись отслеживания точно скажет, куда уйдёт обычный git push.'
      ),
      seeAlso: [
        L('Section 5-1: remotes, fetch and push', 'Секция 5-1: удалённые репозитории, fetch и push'),
        L('Section 1-3: references, HEAD and the reflog', 'Секция 1-3: ссылки, HEAD и reflog'),
      ],
    },
    {
      id: 'git-ch5-s4',
      title: L('Force push and --force-with-lease', 'Принудительная отправка и --force-with-lease'),
      body: L(
        'A force push overwrites the remote branch with your local version, whatever it contains. It is the only way to send a rewritten history, and it is also the only way to destroy the commits of somebody else without them noticing until their next pull. A normal push refuses to do this, and --force removes that refusal. The flag is one character wide and it takes with it the guarantee that the work of others does not disappear.\n\n--force-with-lease keeps the refusal but makes it precise. It pushes only if the remote branch is still where you last saw it, and Git knows where you last saw it from your remote-tracking copy. If somebody pushed in the meantime, the lease is broken and the push is rejected. You fetch, look at what arrived, and decide again whether your rewrite is still the right thing to do.\n\nThe rule that keeps this safe is short: never force push a branch that somebody else has pulled. Force push is for your own branch after a rebase or an amend, and even there --force-with-lease is the form to use. If you are certain that the remote has nothing you do not have, the lease will pass and the push will go through.\n\nThere is a second, stricter form for scripts. --force-with-lease=refs/heads/main:abc1234 names the exact commit you expect to find on the remote, and the push succeeds only if main is still at abc1234. It removes the dependency on the freshness of your remote-tracking copy, which is what makes it the right choice in automation. The server side matters too: many hosts block force pushes on protected branches, and a rejection there is a policy decision rather than a technical failure.',
        'Принудительная отправка перезаписывает удалённую ветку вашей локальной версией, что бы там ни было. Это единственный способ отправить переписанную историю и одновременно единственный способ уничтожить чужие коммиты, не дав их владельцу это заметить до следующей отправки изменений. Обычный push на это не пойдёт, а --force снимает запрет. Флаг занимает один символ, а вместе с ним исчезает гарантия, что чужая работа не пропадёт.\n\n--force-with-lease оставляет запрет, но делает его точным. Он отправляет изменения, только если удалённая ветка всё ещё там, где вы её видели в последний раз, а Git знает это по вашей отслеживающей копии. Если кто-то успел отправить своё, аренда нарушена и push отклоняется. Тогда вы делаете fetch, смотрите, что пришло, и решаете заново, правильно ли переписывать историю.\n\nПравило, удерживающее это в безопасности, короткое: никогда не форсируйте push в ветку, которую уже забрали другие. Принудительная отправка — для своей ветки после перебазирования или amend, и даже там правильной формой остаётся --force-with-lease. Если вы уверены, что на сервере нет ничего, чего нет у вас, аренда пройдёт и push отправится.\n\nДля скриптов есть вторая, более строгая форма. --force-with-lease=refs/heads/main:abc1234 называет ровно тот коммит, который вы ожидаете увидеть на сервере, и push проходит, только если main всё ещё стоит на abc1234. Это снимает зависимость от свежести отслеживающей копии, и именно поэтому такая форма правильна в автоматизации. Важна и сторона сервера: многие хостинги блокируют принудительную отправку в защищённые ветки, и отклонение там — это решение о политике, а не технический сбой.'
      ),
      bullets: [
        L('A force push replaces the remote branch regardless of what is there.', 'Принудительная отправка заменяет удалённую ветку, что бы там ни было.'),
        L('--force-with-lease pushes only if the remote is still where you last saw it.', '--force-with-lease отправляет, только если сервер всё там же, где вы его видели.'),
        L('Never force push a branch that somebody else has already pulled.', 'Никогда не форсируйте push в ветку, которую уже забрали другие.'),
        L('--force-with-lease=ref:hash names the exact commit you expect to find.', '--force-with-lease=ref:hash называет ровно тот коммит, который вы ожидаете найти.'),
        L('Protected branches reject force pushes on the server, by design.', 'Защищённые ветки отклоняют принудительную отправку на сервере, и это по замыслу.'),
      ],
      code: `# rewrite a branch you own and publish the rewrite
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/checkout-validation

# the precise form: only if the remote is at this commit
git push --force-with-lease=refs/heads/main:abc1234 origin main

# what the remote has that you do not
git log --oneline origin/main..main

# never this on a shared branch
git push --force origin main`,
      table: {
        caption: L('The four ways to push', 'Четыре способа отправить изменения'),
        headers: [L('Form', 'Форма'), L('Effect on the remote', 'Действие на сервере'), L('When it is right', 'Когда уместно')],
        rows: [
          [L('git push', 'git push'), L('Fast-forward only', 'Только fast-forward'), L('The normal case', 'Обычный случай')],
          [L('--force', '--force'), L('Overwrites everything', 'Перезаписывает всё'), L('Almost never', 'Почти никогда')],
          [L('--force-with-lease', '--force-with-lease'), L('Overwrites only if the remote did not move', 'Перезаписывает, только если сервер не двигался'), L('Your own branch after a rebase', 'Своя ветка после перебазирования')],
          [L('--force-with-lease=ref:hash', '--force-with-lease=ref:hash'), L('Overwrites only at that exact commit', 'Перезаписывает только при этом точном коммите'), L('Scripts and automation', 'Скрипты и автоматизация')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The force that deletes history', 'Сила, которая удаляет историю'),
          text: L(
            'A forced push does not merge and does not warn: it makes the remote branch point at your history, and the commits that were there stop being reachable from that branch. If those commits were not pushed anywhere else, they survive only in the reflog of the remote, which is not a backup anybody should rely on.',
            'Принудительная отправка не сливает и не предупреждает: она заставляет удалённую ветку указывать на вашу историю, и коммиты, которые были там, перестают быть достижимыми из этой ветки. Если их не отправляли больше никуда, они живут только в reflog сервера, а это не тот бэкап, на который стоит рассчитывать.'
          ),
        },
      ],
      takeaway: L(
        'Use --force-with-lease instead of --force, and only on branches that nobody else has pulled.',
        'Используйте --force-with-lease вместо --force и только для веток, которые никто другой не забирал.'
      ),
      seeAlso: [
        L('Section 5-2: pull strategies', 'Секция 5-2: стратегии pull'),
        L('Section 4-5: recovering lost commits', 'Секция 4-5: восстановление потерянных коммитов'),
      ],
    },
    {
      id: 'git-ch5-s5',
      title: L('Submodules and worktrees', 'Подмодули и рабочие деревья'),
      body: L(
        'A submodule is a second repository recorded inside your repository. The parent stores a pointer to one specific commit of the child, not a copy of its files, and git clone --recurse-submodules fetches the children as well. Submodules answer one question: this project depends on that project at exactly this commit. When the dependency is published as a library, a package manager is usually the better answer, and a submodule makes sense when the dependency is edited together with the project.\n\nThe workflow has sharp edges. The child repository is a full repository with its own history, its own remotes and its own working tree, and the parent only ever remembers which commit was selected. Editing a file in the child and committing the pointer in the parent without committing it in the child produces the confusing state where the parent points at a commit that does not exist in the child yet, and the next clone fails. The rule is simple: commit in the child first, then commit the updated pointer in the parent.\n\nWorktrees solve a different problem. They let one repository have several working trees at once: git worktree add ../hotfix hotfix-branch creates a second directory on the same repository, with its own branch and its own files, while both directories share one object database and one reflog. This is the modern answer to the request to check out another branch without disturbing the work in progress in the current one.\n\nA worktree also replaces the stash in the situation stash was invented for. Instead of parking the changes, you open a second working tree, do the other job there, and come back to the first one with everything exactly as it was. Two limitations are worth remembering: two worktrees cannot check out the same branch at the same time, and git worktree list is the command that tells you what exists.',
        'Подмодуль — это второй репозиторий, записанный внутрь вашего. Родитель хранит указатель на один конкретный коммит дочернего, а не копию его файлов, и git clone --recurse-submodules забирает дочерние репозитории тоже. Подмодули отвечают на один вопрос: этот проект зависит от того проекта ровно на этом коммите. Если зависимость публикуется как библиотека, обычно лучше менеджер пакетов, а подмодуль уместен, когда зависимость правят вместе с проектом.\n\nУ этого процесса есть острые углы. Дочерний репозиторий — полноценный репозиторий со своей историей, своими удалёнными репозиториями и своим рабочим деревом, а родитель помнит только выбранный коммит. Если отредактировать файл в дочернем и закоммитить указатель в родительском, не закоммитив в дочернем, получится путаное состояние, где родитель указывает на несуществующий в дочернем коммит, и следующий клон падает. Правило простое: сначала коммит в дочернем, потом обновлённый указатель в родительском.\n\nРабочие деревья решают другую задачу. Они позволяют одному репозиторию иметь сразу несколько рабочих деревьев: git worktree add ../hotfix hotfix-branch создаёт вторую директорию на том же репозитории, со своей веткой и своими файлами, а обе директории делят одну базу объектов и один reflog. Это современный ответ на просьбу переключиться на другую ветку, не трогая работу, которая уже идёт в текущей.\n\nРабочее дерево заменяет и stash в той ситуации, для которой stash придуман. Вместо того чтобы припарковывать изменения, вы открываете второе рабочее дерево, делаете там другую работу и возвращаетесь к первому, где всё осталось ровно как было. Ограничений стоит запомнить два: два рабочих дерева не могут проверить одну и ту же ветку одновременно, и git worktree list — команда, которая показывает, что вообще существует.'
      ),
      bullets: [
        L('A submodule stores a commit pointer to another repository, not its files.', 'Подмодуль хранит указатель на коммит другого репозитория, а не его файлы.'),
        L('git clone --recurse-submodules fetches the child repositories too.', 'git clone --recurse-submodules забирает и дочерние репозитории.'),
        L('Commit inside the child before committing the updated pointer in the parent.', 'Сначала коммит в дочернем, потом обновлённый указатель в родительском.'),
        L('A worktree gives one repository several working trees and one object database.', 'Рабочее дерево даёт одному репозиторию несколько рабочих деревьев и одну базу объектов.'),
        L('git worktree list shows every working tree attached to the repository.', 'git worktree list показывает все рабочие деревья репозитория.'),
      ],
      code: `# clone with the children
git clone --recurse-submodules git@github.com:team/project.git

# add and update a submodule
git submodule add git@github.com:team/shared-lib.git libs/shared
git submodule update --init --recursive

# a second working tree for the same repository
git worktree add ../hotfix hotfix
git worktree list
git worktree remove ../hotfix`,
      table: {
        caption: L('Submodule and worktree are different tools', 'Подмодуль и рабочее дерево — разные инструменты'),
        headers: [L('Aspect', 'Аспект'), L('Submodule', 'Подмодуль'), L('Worktree', 'Рабочее дерево')],
        rows: [
          [L('Stores', 'Хранит'), L('A pointer to a commit of another repository', 'Указатель на коммит другого репозитория'), L('Nothing extra, only a second directory', 'Ничего лишнего, только вторая директория')],
          [L('Separate history', 'Отдельная история'), L('Yes, the child has its own', 'Да, у дочернего своя'), L('No, one shared history', 'Нет, история общая')],
          [L('Purpose', 'Назначение'), L('Depending on a repository as a whole', 'Зависимость от репозитория целиком'), L('Working on two branches at the same time', 'Работа над двумя ветками одновременно')],
          [L('Extra fetch', 'Дополнительная закачка'), L('Yes, for every child', 'Да, для каждого дочернего'), L('No, the objects are shared', 'Нет, объекты общие')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The submodule commit that does not exist yet', 'Коммит подмодуля, которого ещё нет'),
          text: L(
            'If you commit the pointer in the parent before committing the change in the child, the parent references a commit that nobody can fetch. The next person who clones the project gets an error that looks like a network problem and is not one.',
            'Если закоммитить указатель в родительском раньше, чем изменение в дочернем, родитель будет ссылаться на коммит, который никто не может получить. Следующий человек, клонирующий проект, получит ошибку, похожую на проблему с сетью, хотя это не она.'
          ),
        },
      ],
      takeaway: L(
        'Use a worktree to work on two branches at once, and a submodule only when the dependency must be a repository of its own.',
        'Используйте рабочее дерево, чтобы работать над двумя ветками сразу, а подмодуль — только когда зависимость должна быть отдельным репозиторием.'
      ),
      seeAlso: [
        L('Section 5-1: remotes, fetch and push', 'Секция 5-1: удалённые репозитории, fetch и push'),
        L('Chapter 4: undoing changes safely', 'Глава 4: безопасная отмена изменений'),
      ],
    },
  ],
};
