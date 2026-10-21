import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh05: Chapter = {
  id: 'cli-ch5',
  title: L('Permissions and the file system', 'Права доступа и файловая система'),
  summary: L(
    'How the kernel decides who may touch a file: users, groups and ownership, the nine permission bits, where default permissions come from, how to escalate privileges without becoming root, and what a link really is on disk.',
    'Как ядро решает, кому доступен файл: пользователи, группы и владение, девять битов прав, откуда берутся права по умолчанию, как повышать привилегии без прав root и что такое ссылка на диске.'
  ),
  sections: [
    {
      id: 'cli-ch5-s1',
      title: L('Users, groups and ownership', 'Пользователи, группы и владение'),
      body: L(
        'The kernel does not know names. It knows numbers: every process runs under a numeric user identifier and a numeric group identifier, and every file on disk records the identifier of the user who owns it and the identifier of the group that owns it. Names are a convenience that lives in /etc/passwd and /etc/group, and the command id translates between the two views. The kernel compares numbers, so a user renamed in /etc/passwd keeps the same files and the same processes.\n\nGroups exist to avoid listing hundreds of names in every file. A user belongs to a primary group and to any number of additional groups, and a file has exactly one owning group. When a user creates a file, the file gets that user\'s identifier and the identifier of the directory\'s group, not the process primary group, unless the directory carries the setgid bit. That rule surprises people who expect the group to follow the user.\n\nOwnership changes are how you hand work over and take it back. chown sets a user, a group or both; chgrp sets only the group. Both accept a name or a numeric identifier, and a numeric identifier is often the safer choice in scripts, because a name that is missing on the machine produces an error at the worst moment. Only the owner or a privileged process can change ownership, and on most systems only a privileged process can give a file away to another user.',
        'Ядро не знает имён. Оно знает числа: каждый процесс работает под числовым идентификатором пользователя и числовым идентификатором группы, а каждый файл на диске хранит идентификатор владельца и идентификатор владеющей группы. Имена — удобство, которое лежит в /etc/passwd и /etc/group, а команда id переводит между двумя видами. Ядро сравнивает числа, поэтому переименованный в /etc/passwd пользователь сохраняет и свои файлы, и свои процессы.\n\nГруппы существуют, чтобы в каждом файле не пришлось перечислять сотни имён. У пользователя есть основная группа и любое число дополнительных, а у файла ровно одна владеющая группа. Когда пользователь создаёт файл, тот получает идентификатор пользователя и идентификатор группы каталога, а не группы процесса, если только на каталоге не стоит бит setgid. Это правило удивляет тех, кто ждёт, что группа следует за пользователем.\n\nСмена владельца — это способ передать работу и забрать её обратно. Команда chown задаёт пользователя, группу или обоих сразу, а chgrp задаёт только группу. Обе принимают имя или числовой идентификатор, и числовой идентификатор в скриптах надёжнее: отсутствующее имя выдаст ошибку в худший момент. Менять владельца может сам владелец или привилегированный процесс, и на большинстве систем отдать файл другому пользователю может только привилегированный процесс.'
      ),
      bullets: [
        L('The kernel compares numeric ids, names live in /etc/passwd and /etc/group.', 'Ядро сравнивает числовые идентификаторы, имена лежат в /etc/passwd и /etc/group.'),
        L('A file has one owner and one owning group, a user has many groups.', 'У файла один владелец и одна владеющая группа, у пользователя групп может быть много.'),
        L('New files inherit the group of the parent directory, not of the process.', 'Новые файлы наследуют группу каталога, а не группу процесса.'),
        L('Only a privileged process can hand a file over to another user.', 'Отдать файл другому пользователю может только привилегированный процесс.'),
        L('id prints the ids of the current user and of its groups.', 'id печатает идентификаторы текущего пользователя и его групп.'),
      ],
      code: `# Who am I, in numbers and in names
id
id -u                 # numeric user id
id -gn                # primary group name

# The owner and group recorded on a file
ls -l package.json
ls -ln package.json   # numeric ids instead of names

# Change the group, then the owner
chgrp developers build.log
chown alice:developers build.log

# Give it away, which only a privileged process may do
sudo chown deploy:deploy /srv/app/release.tar`,
      table: {
        caption: L('Where the numbers come from', 'Откуда берутся числа'),
        headers: [L('Source', 'Источник'), L('Contains', 'Содержит'), L('Used for', 'Для чего')],
        rows: [
          [L('/etc/passwd', '/etc/passwd'), L('user name, id, home, shell', 'имя, идентификатор, домашний каталог, оболочка'), L('login and name resolution', 'вход и разрешение имён')],
          [L('/etc/group', '/etc/group'), L('group name, id, member list', 'имя группы, идентификатор, список участников'), L('group membership', 'членство в группах')],
          [L('id', 'id'), L('ids of the current process', 'идентификаторы текущего процесса'), L('checking who you are', 'проверка, кто вы')],
          [L('ls -ln', 'ls -ln'), L('numeric owner and group', 'числовой владелец и группа'), L('scripts without a name lookup', 'скрипты без поиска по имени')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Deleting a user without freeing the files', 'Удаление пользователя без освобождения файлов'),
          text: L(
            'The files keep the numeric id of the deleted user. When that id is later reused for a new account, the new person silently inherits everything the old one owned. Reassign the files with chown before removing the account, and keep the id reserved if you cannot.',
            'Файлы сохраняют числовой идентификатор удалённого пользователя. Когда этот идентификатор позже выдадут новому аккаунту, новый человек молча унаследует всё, что принадлежало старому. Сначала переназначьте файлы через chown и только потом удаляйте аккаунт, а если это невозможно, оставьте идентификатор зарезервированным.'
          ),
        },
        {
          tone: 'note',
          title: L('setgid on a shared directory', 'setgid на общем каталоге'),
          text: L(
            'A directory with the setgid bit keeps its group for every new file inside it, which is how a shared project directory stays writable by the group. Without that bit, a file created by one member belongs to that member personal group and the others cannot change it.',
            'Каталог с битом setgid сохраняет свою группу для каждого нового файла внутри, так общий каталог проекта остаётся доступным группе на запись. Без этого бита файл, созданный одним участником, принадлежит его личной группе, и остальные не могут его изменить.'
          ),
        },
      ],
      takeaway: L(
        'Ownership is numeric on disk and named on screen: use ids in scripts and reassign the files before you delete a user.',
        'Владение на диске числовое, а на экране именованное: в скриптах используйте идентификаторы и освобождайте файлы до удаления пользователя.'
      ),
      seeAlso: [
        L('Section 1-3: paths, the working directory and symlinks', 'Секция 1-3: пути, рабочий каталог и символические ссылки'),
        L('Section 5-2: the permission bits', 'Секция 5-2: биты прав'),
        L('Section 5-5: hard links, symlinks and special files', 'Секция 5-5: жёсткие ссылки, символические ссылки и специальные файлы'),
      ],
    },
    {
      id: 'cli-ch5-s2',
      title: L('The permission bits', 'Биты прав'),
      body: L(
        'Every file carries nine permission bits: read, write and execute for the owner, for the group and for everyone else. The kernel applies them in that order and stops at the first match, so a file owned by somebody else is decided by the group bits when your group matches and by the other bits otherwise. That is why a mode of 640 can still deny you access: you are neither the owner nor a member of the group.\n\nThe letters r, w and x are only a notation over a small integer. Read is 4, write is 2 and execute is 1, so the numeric form of 644 is 4 plus 4 plus 2 for the owner, 4 for the group and 4 for the others. The symbolic form spells the same permissions out: chmod u=rw,g=r,o=r is exactly 644, the classes have to be separated by commas, and chmod reads every further word as another file name, so the form without commas fails with cannot access g-w. The symbolic form is the safer one to type because it touches only the classes you name.\n\nExecute means different things for a file and for a directory. On a directory it is the right to enter it and to reach the names inside, and without it you cannot list the directory either, no matter what read says. On a regular file it means the file may be run, which is what the kernel refuses to do for a text file with no interpreter line. Setting the execute bit on a data file helps only if the file really has a shebang.',
        'У каждого файла девять битов прав: чтение, запись и выполнение для владельца, для группы и для всех остальных. Ядро применяет их по порядку и останавливается на первом совпадении, поэтому файл, принадлежащий другому человеку, решается битами группы, если вы в ней состоите, и битами остальных в противном случае. Именно поэтому режим 640 всё ещё может закрыть вам доступ: вы не владелец и не участник группы.\n\nБуквы r, w и x — лишь обозначения над небольшим целым числом. Чтение это 4, запись 2 и выполнение 1, поэтому числовая форма 644 это 4 плюс 4 плюс 2 для владельца, 4 для группы и 4 для остальных. Символическая форма расписывает те же права словами: chmod u=rw,g=r,o=r это ровно 644, классы обязательно разделяются запятыми, а chmod читает каждое следующее слово как ещё одно имя файла, поэтому форма без запятых падает с сообщением cannot access g-w. Символическая форма безопаснее, потому что трогает только те классы, которые названы.\n\nВыполнение означает разные вещи для файла и для каталога. На каталоге это право войти в него и добраться до имён внутри, и без него вы не сможете и перечислить каталог, что бы ни говорил бит чтения. На обычном файле это разрешение запустить его, и именно в этом ядро отказывает текстовому файлу без строки интерпретатора. Установка бита выполнения на файле данных помогает только тогда, когда в файле действительно есть shebang.'
      ),
      bullets: [
        L('Nine bits: read, write and execute for owner, group and others.', 'Девять битов: чтение, запись и выполнение для владельца, группы и остальных.'),
        L('The kernel checks the owner class first, then the group, then the others.', 'Ядро проверяет сначала владельца, потом группу, потом остальных.'),
        L('Read is 4, write is 2 and execute is 1 in octal notation.', 'Чтение это 4, запись 2, выполнение 1 в восьмеричной записи.'),
        L('chmod 644 and chmod u=rw,go=r mean exactly the same thing.', 'chmod 644 и chmod u=rw,go=r значат ровно одно и то же.'),
        L('The classes of a symbolic mode are separated by commas.', 'Классы символической формы разделяются запятыми.'),
        L('Execute on a directory is the right to enter it, not a bonus.', 'Выполнение на каталоге — это право войти, а не бонус.'),
      ],
      code: `# Read the mode of a file and change it
ls -l app.log
chmod 640 app.log              # owner reads and writes, group reads
chmod u=rw,g=r,o= app.log     # exactly 640, spelled out

# Execute on a directory is the right to enter it
chmod 755 /srv/app            # r-x for owner, r-x for group, r-x for others
chmod 700 ~/.ssh              # private directory

# Read the mode in a script
mode=$(stat -c '%a' app.log)
echo "mode is $mode"`,
      table: {
        caption: L('What each class and bit controls', 'Что контролирует каждый класс и бит'),
        headers: [L('Class or bit', 'Класс или бит'), L('On a regular file', 'Для обычного файла'), L('On a directory', 'Для каталога')],
        rows: [
          [L('u (owner)', 'u (владелец)'), L('the user who owns the file', 'пользователь, которому файл принадлежит'), L('the same, for the directory', 'то же, для каталога')],
          [L('g (group)', 'g (группа)'), L('every member of the owning group', 'все участники владеющей группы'), L('the same, for the directory', 'то же, для каталога')],
          [L('o (others)', 'o (остальные)'), L('everyone else', 'все остальные'), L('the same, for the directory', 'то же, для каталога')],
          [L('r', 'r'), L('read the content', 'прочитать содержимое'), L('list the names inside', 'перечислить имена внутри')],
          [L('w', 'w'), L('change the content', 'изменить содержимое'), L('create and remove names', 'создать и удалить имена')],
          [L('x', 'x'), L('run it as a program', 'запустить как программу'), L('enter it and reach the files', 'войти и добраться до файлов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('chmod 777 hides the mistake', 'chmod 777 прячет ошибку'),
          text: L(
            'Making a file world writable does not fix the reason it was not writable, it only removes the evidence. A configuration file that must be readable by a service account and nobody else should be 640, and a directory that must not be touched by other users should be 750. A permissive mode also survives into the next copy of the file, where nobody looks at it again.',
            'Делая файл доступным всем, вы не устраняете причину, по которой он не был доступен, а просто убираете улику. Конфигурационный файл, который читает сервисный аккаунт и никто больше, должен иметь режим 640, а каталог, в который не должны писать посторонние, — 750. Щедрый режим к тому же переживает копирование файла, где его уже никто не смотрит.'
          ),
        },
        {
          tone: 'warning',
          title: L('Read without execute is useless', 'Чтение без выполнения бесполезно'),
          text: L(
            'A directory with the read bit and no execute bit can be listed but not entered, and a program that reads the names and then fails to open the files underneath produces an error that points at the wrong thing. Set both bits or neither.',
            'Каталог с битом чтения и без бита выполнения можно перечислить, но нельзя войти, и программа, которая читает имена и не может открыть файлы под ними, выдаёт ошибку не туда. Ставьте оба бита или ни одного.'
          ),
        },
      ],
      takeaway: L(
        'Nine bits and one order of evaluation: owner first, then group, then the others, and the execute bit on a directory is what lets you enter it.',
        'Девять битов и одна очередность проверки: сначала владелец, потом группа, потом остальные, а бит выполнения на каталоге — это право в него войти.'
      ),
      seeAlso: [
        L('Section 5-1: users, groups and ownership', 'Секция 5-1: пользователи, группы и владение'),
        L('Section 5-3: umask and default permissions', 'Секция 5-3: umask и права по умолчанию'),
        L('Section 5-4: su, sudo and privilege escalation', 'Секция 5-4: su, sudo и повышение привилегий'),
      ],
    },
    {
      id: 'cli-ch5-s3',
      title: L('umask and default permissions', 'umask и права по умолчанию'),
      body: L(
        'The kernel creates a file with mode 666 and a directory with mode 777, then removes everything the umask forbids. The umask is a mask and not a set of permissions: a bit that is set in the umask is cleared in the result. The usual 022 therefore leaves 644 for files and 755 for directories, and the stricter 077 leaves 600 and 700, which is what a private key in a home directory needs.\n\nThe umask is a property of the shell, inherited from the login session and passed on to every child process, so it travels with a deployment script into a CI job and into a container. It is a filter and not a lock: it can only remove permissions, never add them, and it applies to the files the kernel creates. An editor that rewrites an existing file keeps the old mode, and a tool that sets the mode itself ignores the umask entirely.\n\nTwo habits prevent most surprises. Set the umask explicitly at the top of any script that writes files for other users, because the ambient value comes from whoever started the shell. And check the result rather than the intent: ls -l prints the mode that was actually applied, while a command that was supposed to create a private file quietly created a readable one if the umask was wrong.',
        'Ядро создаёт файл с режимом 666 и каталог с режимом 777, а затем убирает всё, что запрещает umask. umask — это маска, а не набор прав: бит, установленный в маске, обнуляется в результате. Обычный 022 поэтому оставляет 644 для файлов и 755 для каталогов, а более строгий 077 оставляет 600 и 700 — именно это нужно приватному ключу в домашнем каталоге.\n\numask — свойство оболочки: он наследуется от сессии входа и передаётся каждому дочернему процессу, поэтому уезжает вместе со скриптом развёртывания в задачу CI и в контейнер. Это фильтр, а не замок: он умеет только убирать права, никогда их не добавляет, и применяется к файлам, которые создаёт ядро. Редактор, перезаписывающий существующий файл, сохраняет старый режим, а инструмент, который сам задаёт режим, umask игнорирует.\n\nДве привычки снимают большинство сюрпризов. Задавайте umask явно в начале любого скрипта, который пишет файлы для других пользователей, потому что окружающее значение пришло от того, кто запустил оболочку. И проверяйте результат, а не намерение: ls -l печатает фактически применённый режим, тогда как команда, которая должна была создать приватный файл, тихо создала читаемый, если umask был неверным.'
      ),
      bullets: [
        L('The kernel starts from 666 for files and 777 for directories, the umask removes bits.', 'Ядро начинает с 666 для файлов и 777 для каталогов, umask убирает биты.'),
        L('umask 022 gives 644 and 755, umask 077 gives 600 and 700.', 'umask 022 даёт 644 и 755, umask 077 даёт 600 и 700.'),
        L('A bit set in the umask is cleared in the new file, never added.', 'Бит, установленный в umask, обнуляется у нового файла и никогда не добавляется.'),
        L('The umask is inherited by every child process, including CI jobs.', 'umask наследуется всеми дочерними процессами, включая задачи CI.'),
        L('The umask does not change the mode of a file that already existed.', 'umask не меняет режим уже существовавшего файла.'),
      ],
      code: `# The current mask and what it produces
umask                 # 0022
umask 022             # default: files 644, directories 755
umask 077             # private: files 600, directories 700

# Verify what was actually applied
touch secret.txt
ls -l secret.txt     # -rw------- with umask 077

# Set it inside a script, not in the ambient environment
(
  umask 077
  tar czf backup.tgz ./data
)`,
      table: {
        caption: L('Common umask values', 'Частые значения umask'),
        headers: [L('umask', 'umask'), L('Files', 'Файлы'), L('Directories', 'Каталоги'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('022', '022'), L('644', '644'), L('755', '755'), L('a personal account', 'личный аккаунт')],
          [L('002', '002'), L('664', '664'), L('775', '775'), L('shared group work', 'общая работа в группе')],
          [L('027', '027'), L('640', '640'), L('750', '750'), L('readable by the group only', 'читаемо только группой')],
          [L('077', '077'), L('600', '600'), L('700', '700'), L('private files and keys', 'приватные файлы и ключи')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The umask does not protect what already exists', 'umask не защищает то, что уже есть'),
          text: L(
            'The mask only applies at creation time. A file created earlier keeps the mode it had, and a copy that preserves the attributes of the source brings the old mode with it. Check the mode of the artefact you publish, not the umask of the shell that produced it.',
            'Маска действует только в момент создания. Файл, созданный раньше, сохраняет прежний режим, а копирование с сохранением атрибутов приносит с собой старый режим источника. Проверяйте права у того артефакта, который публикуете, а не umask у оболочки, которая его произвела.'
          ),
        },
        {
          tone: 'tip',
          title: L('Set the mask where the work happens', 'Задавайте маску там, где идёт работа'),
          text: L(
            'A umask set in the login profile applies to everything you start, including the interactive shell, and it is easy to forget there. A umask set at the top of a script is local, visible and forgotten by nothing.',
            'umask, заданный в профиле входа, действует на всё, что вы запускаете, включая интерактивную оболочку, и там его легко забыть. umask в начале скрипта локален, виден и ничего не забывает.'
          ),
        },
      ],
      takeaway: L(
        'The umask can only remove bits and only at creation time, so set it inside the script and verify the mode of the file you produced.',
        'umask умеет только убирать биты и только в момент создания, поэтому задавайте его в скрипте и проверяйте режим получившегося файла.'
      ),
      seeAlso: [
        L('Section 5-2: the permission bits', 'Секция 5-2: биты прав'),
        L('Section 5-4: su, sudo and privilege escalation', 'Секция 5-4: su, sudo и повышение привилегий'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
      ],
    },
    {
      id: 'cli-ch5-s4',
      title: L('su, sudo and privilege escalation', 'su, sudo и повышение привилегий'),
      body: L(
        'su replaces the current session with a shell of another user, which is why the old session has to be closed by hand and why the environment mostly disappears. sudo runs a single command as another user and returns you to your own shell afterwards, recording what was done in a log. The difference in risk is small: both give a full session of the target user, and the real control lives in the rules that decide what may be run.\n\nThose rules live in /etc/sudoers and are edited through visudo, so that a broken file never replaces a working one. A rule names the user, the host, the command and the privileges, and the keyword NOPASSWD removes the password prompt. The classic mistake is a rule that grants NOPASSWD on a command with a wildcard, because the shell of the target user can then be started without a password, and the rule means nothing.\n\nLeast privilege is the practical rule: grant the exact command that is needed, not a shell and not a directory of scripts. The option sudo -u deploy runs as another user without changing your own, sudo -i starts a login shell for the target user, and sudo -E keeps a selected environment variable. Running the whole session as root is easy and wrong, because every file the process touches becomes owned by root and the next ordinary user cannot clean up after it.',
        'su подменяет текущую сессию оболочкой другого пользователя, поэтому старую сессию надо закрывать руками и окружение почти исчезает. sudo выполняет одну команду от имени другого пользователя и возвращает вас в свою оболочку, записывая сделанное в журнал. Разница в риске невелика: и то и другое даёт полную сессию целевого пользователя, а настоящий контроль живёт в правилах, которые решают, что разрешено запускать.\n\nЭти правила лежат в /etc/sudoers, и правят их через visudo, чтобы сломанный файл не заменил рабочий. Правило называет пользователя, узел, команду и полномочия, а ключевое слово NOPASSWD убирает запрос пароля. Классическая ошибка — правило, выдающее NOPASSWD на команду с шаблоном: оболочку целевого пользователя тогда можно запустить без пароля, и правило не значит ничего.\n\nНаименьшие полномочия — это практическое правило: выдавайте точную нужную команду, а не оболочку и не каталог скриптов. Опция sudo -u deploy запускает от имени другого пользователя, не меняя вашего, sudo -i открывает сессию входа целевого пользователя, а sudo -E сохраняет выбранную переменную окружения. Работать всей сессией от root легко и неверно: каждый файл, к которому прикасается процесс, становится собственностью root, и следующий обычный пользователь не сможет за собой убрать.'
      ),
      bullets: [
        L('su swaps the session, sudo runs one command and returns you back.', 'su меняет сессию, sudo выполняет одну команду и возвращает обратно.'),
        L('Rules live in /etc/sudoers and must be edited with visudo.', 'Правила лежат в /etc/sudoers, их правят только через visudo.'),
        L('NOPASSWD on a command with a wildcard is equivalent to a root shell.', 'NOPASSWD на команде с шаблоном равносилен оболочке root.'),
        L('sudo -u runs as another user, sudo -i starts a login shell for it.', 'sudo -u запускает от имени другого пользователя, sudo -i открывает его сессию входа.'),
        L('Work done as root leaves root-owned files nobody else can clean up.', 'Работа от root оставляет файлы, принадлежащие root, которые никто больше не уберёт.'),
      ],
      code: `# One command as another user
sudo -u deploy /srv/app/bin/release --dry-run
sudo -i                      # login shell for the target user

# Inspect and edit the rules
sudo -l                      # what am I allowed to run
sudo visudo                  # edit /etc/sudoers safely

# Never put this in sudoers
# deploy  ALL=(ALL) NOPASSWD: /usr/bin/docker *

# Grant one exact command instead
# deploy  ALL=(root) NOPASSWD: /usr/bin/systemctl reload nginx`,
      table: {
        caption: L('Choosing an escalation path', 'Выбор способа повышения прав'),
        headers: [L('Tool', 'Инструмент'), L('Gives', 'Даёт'), L('Use when', 'Когда применять')],
        rows: [
          [L('sudo -u user cmd', 'sudo -u user cmd'), L('one command as that user', 'одну команду от его имени'), L('a deploy step needs another identity', 'шаг развёртывания требует другой учётной записи')],
          [L('sudo -i', 'sudo -i'), L('a full login session', 'полную сессию входа'), L('the environment must be fixed by hand', 'окружение надо чинить вручную')],
          [L('su - user', 'su - user'), L('a login session without sudo rules', 'сессию входа без правил sudo'), L('the system has no sudo at all', 'на системе вообще нет sudo')],
          [L('a dedicated service account', 'отдельная сервисная учётная запись'), L('the rights of one narrow account', 'права одной узкой учётной записи'), L('a daemon must not run as root', 'служба не должна работать от root')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A wildcard in sudoers is a root shell', 'Шаблон в sudoers — это оболочка root'),
          text: L(
            'A rule such as deploy ALL=(ALL) NOPASSWD: /usr/bin/docker * lets the target user run docker, and docker can mount the host filesystem and start a root shell. Any wildcard that can reach an interpreter is a full escalation, whatever the intent was.',
            'Правило вида deploy ALL=(ALL) NOPASSWD: /usr/bin/docker * позволяет целевому пользователю запускать docker, а docker умеет монтировать файловую систему узла и поднять оболочку root. Любой шаблон, который ведёт к интерпретатору, — это полное повышение прав, каким бы ни было намерение.'
          ),
        },
        {
          tone: 'tip',
          title: L('Give the tool the narrowest rights it needs', 'Дайте инструменту самые узкие права'),
          text: L(
            'A separate deploy account with a passwordless rule for exactly one script beats any general sudo access: the script can be reviewed, the rule cannot be widened by accident, and the audit log names the real work.',
            'Отдельная учётная запись для развёртывания с правилом без пароля ровно на один скрипт лучше любых общих прав sudo: скрипт можно проверить, правило не расширится случайно, а журнал аудита называет настоящую работу.'
          ),
        },
      ],
      takeaway: L(
        'Escalate one exact command as one exact user, and treat a wildcard rule in sudoers as a root shell.',
        'Повышайте права для одной точной команды от имени одного точного пользователя и считайте правило с шаблоном в sudoers оболочкой root.'
      ),
      seeAlso: [
        L('Section 5-1: users, groups and ownership', 'Секция 5-1: пользователи, группы и владение'),
        L('Section 5-2: the permission bits', 'Секция 5-2: биты прав'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
      ],
    },
    {
      id: 'cli-ch5-s5',
      title: L('Hard links, symlinks and special files', 'Жёсткие ссылки, символические ссылки и специальные файлы'),
      body: L(
        'A file is an inode: a record on disk holding the type, the owner, the mode, the timestamps and the list of data blocks. The name in a directory is only a pointer to that inode. A hard link is a second name for the same inode, which is why both names show the same content, the same owner and the same link count, and why removing one name leaves the data intact until the last name disappears.\n\nA symbolic link is a small file of its own that stores a path. It can point across file systems, it can point at a directory, and it can point at nothing at all, in which case it is dangling and every access through it fails. The kernel follows the link on every use, which is also what makes a link to a file that somebody else can rewrite a security problem: the link grants access to whatever the target becomes later.\n\nThe special files under /dev are neither regular files nor links. A device file is a doorway into the kernel, a named pipe is a buffer that joins two processes without a file behind it, and a socket is an endpoint that the network layer uses. They behave like files for every tool, which is why /dev/null swallows output and why mkfifo can connect two commands that were never meant to meet.',
        'Файл — это inode: запись на диске с типом, владельцем, режимом, отметками времени и списком блоков данных. Имя в каталоге — лишь указатель на этот inode. Жёсткая ссылка это второе имя того же inode, поэтому у обоих имён одинаковое содержимое, одинаковый владелец и одинаковое число ссылок, и удаление одного имени оставляет данные на месте, пока не исчезнет последнее имя.\n\nСимволическая ссылка — маленький собственный файл, в котором хранится путь. Она может указывать в другую файловую систему, может указывать на каталог, а может не указывать ни на что: тогда ссылка битая и любое обращение через неё падает. Ядро следует по ссылке при каждом обращении, и именно поэтому ссылка на файл, который кто-то может переписать, становится проблемой безопасности: ссылка даёт доступ к тому, чем цель станет позже.\n\nСпециальные файлы в /dev — не обычные файлы и не ссылки. Файл устройства — это вход в ядро, именованный канал — буфер, который соединяет два процесса без файла под ними, а сокет — конечная точка, которой пользуется сетевой уровень. Для любого инструмента они ведут себя как файлы, поэтому /dev/null съедает вывод, а mkfifo может связать две команды, которые никогда не должны были встретиться.'
      ),
      bullets: [
        L('A hard link is another name for the same inode, a symlink stores a path.', 'Жёсткая ссылка — другое имя того же inode, символическая ссылка хранит путь.'),
        L('Hard links cannot cross file systems and cannot point at a directory.', 'Жёсткие ссылки не пересекают границы файловой системы и не указывают на каталог.'),
        L('A dangling symlink fails at use time, not at creation time.', 'Битая символическая ссылка ломается при обращении, а не при создании.'),
        L('ls -i shows the inode number, ls -l shows the link count.', 'ls -i показывает номер inode, ls -l — число ссылок.'),
        L('Device files, named pipes and sockets live in /dev and behave like files.', 'Файлы устройств, именованные каналы и сокеты живут в /dev и ведут себя как файлы.'),
      ],
      code: `# Two names, one inode
ln notes.txt notes-copy.txt
ls -i notes.txt notes-copy.txt   # the same inode number
ls -l notes.txt                   # the link count is 2
rm notes-copy.txt                  # the data survives under notes.txt

# A link that stores a path
ln -s /srv/app/current release
readlink -f release                # where it really points
ln -s missing-target dangling     # breaks only when used

# Special files
ls -l /dev/null                    # character device
mkfifo pipe                        # named pipe between two processes`,
      table: {
        caption: L('Hard link, symlink or copy', 'Жёсткая ссылка, символическая ссылка или копия'),
        headers: [L('Property', 'Свойство'), L('Hard link', 'Жёсткая ссылка'), L('Symlink', 'Символическая ссылка'), L('Copy', 'Копия')],
        rows: [
          [L('Same inode', 'Тот же inode'), L('yes', 'да'), L('no', 'нет'), L('no', 'нет')],
          [L('Crosses file systems', 'Пересекает файловые системы'), L('no', 'нет'), L('yes', 'да'), L('yes', 'да')],
          [L('Can point at a directory', 'Может указывать на каталог'), L('no', 'нет'), L('yes', 'да'), L('no', 'нет')],
          [L('Breaks when the target disappears', 'Ломается, когда цель исчезает'), L('no', 'нет'), L('yes', 'да'), L('no', 'нет')],
          [L('Costs disk space', 'Стоит места на диске'), L('nothing', 'нисколько'), L('one block', 'один блок'), L('the whole file', 'весь файл')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A symlink is resolved on every use', 'Символическая ссылка разрешается при каждом обращении'),
          text: L(
            'If a link points at a file inside a directory that other users can write, they can replace the target and the link will happily open whatever they put there. Point links at directories you own, and treat a writable path in the chain as a hole in the design.',
            'Если ссылка указывает на файл в каталоге, куда могут писать другие, они заменят цель, и ссылка спокойно откроет то, что они туда положили. Ссылайтесь на каталоги, которыми владеете вы, и относитесь к доступному для записи пути в цепочке как к дыре в конструкции.'
          ),
        },
        {
          tone: 'tip',
          title: L('Switch releases with a symlink', 'Переключайте релизы символической ссылкой'),
          text: L(
            'A deployment that points a link at a versioned directory can roll back by pointing it back. The operation is atomic, it takes no space and it does not touch the files that are already running.',
            'Развёртывание, которое направляет ссылку на каталог с версией, откатывается простым возвратом ссылки на прежний каталог. Операция атомарна, места не занимает и не трогает файлы, которые уже работают.'
          ),
        },
      ],
      takeaway: L(
        'A hard link is the same inode under a second name, a symlink is a stored path resolved on every use, and neither one copies data.',
        'Жёсткая ссылка — тот же inode под вторым именем, символическая — сохранённый путь, который разрешается при каждом обращении; ни одна из них не копирует данные.'
      ),
      seeAlso: [
        L('Section 1-3: paths, the working directory and symlinks', 'Секция 1-3: пути, рабочий каталог и символические ссылки'),
        L('Section 5-2: the permission bits', 'Секция 5-2: биты прав'),
        L('Section 6-5: arrays, globbing and parameter expansion', 'Секция 6-5: массивы, подстановка шаблонов и раскрытие параметров'),
      ],
    },
  ],
};
