import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliChapters: Chapter[] = [
  {
    id: 'cli-ch1',
    title: L('Files, paths and the filesystem', 'Файлы, пути и файловая система'),
    summary: L(
      'How a path is resolved, how to find what you need in a large tree and how the Unix permission model decides who may read and write what.',
      'Как разрешается путь, как искать нужное в большом дереве и что решает модель прав Unix о том, кто что может читать и писать.'
    ),
    sections: [
      {
        id: 'cli-ch1-s1',
        title: L('Paths, the working directory and symlinks', 'Пути, рабочий каталог и симлинки'),
        body: L(
          'Every command starts in a working directory, and every relative path is resolved against it. `pwd` prints that directory as an absolute path, `cd` changes it, and the shell remembers where you came from, so `cd -` swaps back. The names `~`, `..` and `.` are expanded by the shell before the program runs, which is why `cd ~` and `cd /home/ilyag` are one and the same command.\n\nAn absolute path starts at the root and does not depend on where you stand. A relative path does, and that is exactly why scripts fail when they are launched from another directory. Command lookup works from the other side: the shell walks the directories listed in `PATH` and runs the first match, so a local tool has to be called as `./tool`, because the current directory is deliberately absent from `PATH`.\n\nA symlink is a pointer that the kernel resolves while it walks the path, and it may point to another symlink. The link keeps its own owner, permissions and timestamps, so `ls -l` on a link shows the size of the link and not of the target. When you need the physical location, ask for it explicitly with `readlink -f` or `realpath`.',
          'Любая команда стартует в рабочем каталоге, и любой относительный путь разрешается относительно него. `pwd` печатает этот каталог абсолютным путём, `cd` меняет его, а оболочка помнит предыдущий, поэтому `cd -` возвращает вас назад. Имена `~`, `..` и `.` разворачивает сама оболочка до запуска программы — вот почему `cd ~` и `cd /home/ilyag` это одна и та же команда.\n\nАбсолютный путь начинается от корня и не зависит от того, где вы находитесь. Относительный зависит, и именно поэтому скрипты ломаются, когда их запускают из другого каталога. Поиск команды работает с другой стороны: оболочка обходит каталоги из `PATH` и выполняет первое совпадение, поэтому локальный инструмент приходится звать как `./tool` — текущего каталога в `PATH` намеренно нет.\n\nСимлинк — это указатель, который ядро разрешает по дороге обхода пути, и он может указывать на другой симлинк. У самого симлинка свои владелец, права и метки времени, поэтому `ls -l` покажет размер ссылки, а не цели. Когда нужен физический адрес, спросите его явно: `readlink -f` или `realpath`.'
        ),
        bullets: [
          L('`pwd` prints the absolute working directory, `cd -` returns to the previous one.', '`pwd` печатает абсолютный рабочий каталог, `cd -` возвращает на предыдущий.'),
          L('The shell expands `~`, `..` and `.` before the program even starts.', 'Оболочка разворачивает `~`, `..` и `.` до запуска программы.'),
          L('`PATH` decides which binary runs, and the current directory is not on it.', '`PATH` решает, какой бинарник запустится, а текущего каталога там нет.'),
          L('`realpath` resolves symlinks, `readlink -f` prints the target.', '`realpath` разрешает симлинки, `readlink -f` печатает цель.'),
        ],
        code: `cd /var/log
cd -            # back to the previous directory
cd ~            # home
cd ../..       # two levels up
realpath ./link/to/file`,
        takeaway: L(
          'Relative paths depend on the working directory, absolute paths and `realpath` do not.',
          'Относительные пути зависят от рабочего каталога, абсолютные и `realpath` — нет.'
        ),
      },
      {
        id: 'cli-ch1-s2',
        title: L('Finding files: globbing, find and the right tool', 'Поиск файлов: глобы, find и подходящий инструмент'),
        body: L(
          'Globbing is the shell expanding a pattern into a list of paths: `*.log` matches every name ending in `.log` in the current directory, and `src/**/*.ts` reaches into subdirectories. It is fast and convenient, but it only sees what the shell can see, and a pattern that matches nothing stays a literal string, which is a classic source of silent bugs. `find` works the other way around: it walks a tree, tests every entry against expressions and can act on the results.\n\n`find` composes predicates such as `-name`, `-type`, `-size`, `-mtime` and `-path`, and combines them with `-and`, `-or` and `!`. The action runs through `-exec` or `-print0`. Always prefer the `+` form of `-exec` over the `;` form: it builds one command with many arguments instead of starting a process per file, and it survives names with spaces.\n\nThe trap is quoting. A pattern that reaches `find` through the shell has already been expanded, so `find . -name *.log` searches for a file literally called `*.log`. Quote it: `find . -name \'*.log\'`. When there are thousands of files, `fd` is easier to read and `rg --files` is faster, because both skip ignored directories by default.',
          'Глоббинг — это разворачивание шаблона оболочкой в список путей: `*.log` совпадает со всеми именами, заканчивающимися на `.log` в текущем каталоге, а `src/**/*.ts` заходит в подкаталоги. Это быстро и удобно, но видит только то, что видит оболочка, а шаблон без совпадений остаётся литеральной строкой — классический источник тихих ошибок. `find` устроен наоборот: обходит дерево, проверяет каждую запись выражениями и может действовать по результату.\n\n`find` собирает предикаты `-name`, `-type`, `-size`, `-mtime` и `-path` и комбинирует их через `-and`, `-or` и `!`. Действие выполняется через `-exec` или `-print0`. Форму `+` у `-exec` всегда предпочитайте форме `;`: она собирает одну команду со многими аргументами вместо запуска процесса на каждый файл и переживает имена с пробелами.\n\nГлавная ловушка — кавычки. Шаблон, дошедший до `find` через оболочку, уже развёрнут, поэтому `find . -name *.log` ищет файл, который буквально называется `*.log`. Берите кавычки: `find . -name \'*.log\'`. Когда файлов тысячи, `fd` читается проще, а `rg --files` работает быстрее: оба по умолчанию пропускают игнорируемые каталоги.'
        ),
        bullets: [
          L('The shell expands globs before `find` sees them, so patterns need quotes.', 'Оболочка разворачивает глобы до `find`, поэтому шаблоны нужно брать в кавычки.'),
          L('`-exec cmd {} +` runs one command, `-exec cmd {} ;` runs one per file.', '`-exec cmd {} +` запускает одну команду, `-exec cmd {} ;` — по одной на файл.'),
          L('`-print0` with `xargs -0` survives names containing spaces and newlines.', '`-print0` вместе с `xargs -0` переживает имена с пробелами и переводами строк.'),
          L('`fd` and `rg --files` skip ignored directories and are much faster on big trees.', '`fd` и `rg --files` пропускают игнорируемые каталоги и быстрее на больших деревьях.'),
        ],
        code: `find . -type f -name '*.ts' -not -path './node_modules/*'
find . -type f -name '*.log' -mtime +7 -exec rm {} +
find . -print0 | xargs -0 -r ls -l`,
        takeaway: L(
          'Quote every pattern you pass to `find`, or the shell eats it before `find` runs.',
          'Берите в кавычки любой шаблон для `find`, иначе оболочка съест его раньше.'
        ),
      },
      {
        id: 'cli-ch1-s3',
        title: L('The permission model', 'Модель прав доступа'),
        body: L(
          'Unix permissions are three bits for three groups: the owner, the group and everybody else, each of them read, write or execute. `chmod` sets them in two notations, symbolic like `u+x` and `go-w`, and numeric like `755` for `rwxr-xr-x`. A directory needs the execute bit to be traversable and the read bit to be listed, which is why a directory with mode `644` looks strange but is harmless, while `600` on a directory breaks everything inside it.\n\n`umask` is the mask applied to new files and directories: the default `022` turns `777` into `755` for a directory and `644` for a file. Change it for the duration of a session when you need a private workspace, and remember that it only affects what is created afterwards.\n\nOwnership and the permission bits are two different things. `sudo` runs a command as root and bypasses the check on files the owner cannot touch, while `chown` and `chgrp` move the owner and the group. Two special bits matter more often than expected: the setuid bit makes a binary run with the privileges of its owner, and the sticky bit on a shared directory lets only the owner of a file delete it.',
          'Права Unix — это три бита для трёх групп: владелец, группа и все остальные, у каждой чтение, запись или выполнение. `chmod` задаёт их в двух нотациях, символической вроде `u+x` и `go-w` и числовой вроде `755` для `rwxr-xr-x`. Каталогу нужен бит выполнения, чтобы его можно было пройти, и бит чтения, чтобы его можно было перечислить, поэтому каталог с правами `644` выглядит странно, но безвреден, а вот `600` на каталоге ломает всё внутри.\n\n`umask` — маска, применяемая к новым файлам и каталогам: умолчание `022` превращает `777` в `755` для каталога и `644` для файла. Меняйте её на время сессии, когда нужна приватная рабочая папка, и помните, что она влияет только на то, что создаётся после.\n\nВладение и биты прав — разные вещи. `sudo` запускает команду от root и обходит проверку на файлах, к которым у владельца нет доступа, а `chown` и `chgrp` меняют владельца и группу. Два особых бита важнее, чем кажется: setuid заставляет бинарник выполняться с правами владельца, а sticky на общем каталоге разрешает удалять файл только его владельцу.'
        ),
        bullets: [
          L('`755` for scripts and directories, `644` for ordinary files, `600` for secrets.', '`755` для скриптов и каталогов, `644` для обычных файлов, `600` для секретов.'),
          L('A directory without the execute bit cannot be entered at all.', 'В каталог без бита выполнения вообще нельзя зайти.'),
          L('`umask` subtracts bits from the mode of everything you create.', '`umask` вычитает биты из режима всего, что вы создаёте.'),
          L('The sticky bit on /tmp stops users from deleting the files of others.', 'Sticky-бит на /tmp не даёт пользователям удалять чужие файлы.'),
        ],
        code: `ls -l deploy.sh          # -rwxr-xr-x
chmod 755 deploy.sh
chmod u+x,go-rwx secret.env
umask 077                # everything new is private
id; stat -c '%U %G %a' deploy.sh`,
        takeaway: L(
          '`Permission denied` is almost always a missing execute bit or a foreign owner.',
          '`Permission denied` — почти всегда отсутствующий бит выполнения или чужой владелец.'
        ),
      },
    ],
  },
  {
    id: 'cli-ch2',
    title: L('Text processing pipelines', 'Конвейеры обработки текста'),
    summary: L(
      'How streams, redirection and the classic Unix toolbox turn raw output into exactly the data you need.',
      'Как потоки, перенаправление и классический инструментарий Unix превращают сырой вывод в нужные данные.'
    ),
    sections: [
      {
        id: 'cli-ch2-s1',
        title: L('Streams, redirection and exit codes', 'Потоки, перенаправление и коды возврата'),
        body: L(
          'Every process has three standard streams: stdin for input, stdout for results and stderr for diagnostics. That split is a deliberate decision: data flows through stdout and complaints flow through stderr, so the two can be redirected separately and the output of a tool stays clean enough to be piped into another tool. Redirection is the shell doing the plumbing: `>` truncates a file, `>>` appends, `<` feeds a file to stdin and `2>` sends stderr somewhere else.\n\nThe order of redirections matters because the shell processes them from left to right. `cmd > out.log 2>&1` points stderr at the same place as stdout, while `cmd 2>&1 > out.log` sends stderr to the old stdout, which is the terminal. `2>&1` duplicates a file descriptor, it does not name a file.\n\nExit codes are the second half of the contract: zero means success, anything else means failure, and a pipeline reports the code of the last command unless you ask for `pipefail`. One classic surprise: `find ... | head` ends with a broken pipe error, because `head` closes the read end after ten lines and the writer is killed by `SIGPIPE`.',
          'У каждого процесса три стандартных потока: stdin для ввода, stdout для результата и stderr для диагностики. Это осознанное решение: данные идут через stdout, а жалобы через stderr, поэтому их можно перенаправлять по отдельности и держать вывод инструмента чистым для следующей команды в пайпе. Перенаправление делает сама оболочка: `>` обрезает файл, `>>` дописывает, `<` подаёт файл на stdin, `2>` уводит stderr в сторону.\n\nПорядок перенаправлений важен, потому что оболочка обрабатывает их слева направо. `cmd > out.log 2>&1` отправляет stderr туда же, куда stdout, а `cmd 2>&1 > out.log` — в старый stdout, то есть в терминал. `2>&1` дублирует дескриптор, а не называет файл.\n\nКоды возврата — вторая половина контракта: ноль означает успех, всё остальное — ошибку, а пайп по умолчанию отдаёт код последней команды, если не попросить `pipefail`. Есть классический сюрприз: `find ... | head` заканчивается ошибкой broken pipe, потому что `head` закрывает конец чтения после десяти строк, и писателя убивает `SIGPIPE`.'
        ),
        bullets: [
          L('stdout carries data and stderr carries diagnostics: redirect them apart.', 'stdout несёт данные, stderr — диагностику: перенаправляйте их по отдельности.'),
          L('`2>&1` duplicates a descriptor, while `2>file` writes to a file.', '`2>&1` дублирует дескриптор, а `2>file` пишет в файл.'),
          L('A pipeline returns the code of the last command unless `pipefail` is set.', 'Пайп возвращает код последней команды, если не включён `pipefail`.'),
          L('`tee` duplicates the output to a file and to the next command at once.', '`tee` дублирует вывод в файл и в следующую команду одновременно.'),
        ],
        code: `npm run build > build.log 2>&1
cat access.log | grep -c ' 500 ' > errors.txt
command > out.log 2>&1        # both streams into the file
command 2>&1 | tee diag.log | less`,
        takeaway: L(
          'Data goes to stdout, diagnostics to stderr, and the exit code reports the outcome.',
          'Данные — в stdout, диагностика — в stderr, а код возврата сообщает исход.'
        ),
      },
      {
        id: 'cli-ch2-s2',
        title: L('The Unix text toolbox', 'Набор текстовых утилит Unix'),
        body: L(
          'The classic tools each solve one narrow job and compose well. `grep` finds lines by pattern, `sed` streams them through a sequence of editing commands, `awk` reads them as records and fields, `cut` selects columns, `sort` and `uniq` order and deduplicate, `tr` transliterates characters. They are cheap, they stream, and they never load the whole file into memory unless you make them.\n\n`grep` switches from basic to extended regular expressions with `-E`, ignores case with `-i`, inverts with `-v` and counts with `-c`. `sed` substitutes with `s/old/new/g` and edits in place with `-i`. `awk -F: \'{print $1, $3}\'` splits each line on a colon and prints two fields; a pattern before the action selects the lines, while `NR` and `NF` give the line number and the number of fields.\n\nThe tools break in predictable ways. `grep` on a binary file prints noise, so check the type first. `sort` compares bytes unless the locale says otherwise, and `sort -u` is not the same as `sort | uniq`. A greedy regular expression can swallow the delimiter, and `sed -i` without a backup turns a bad pattern into an unrecoverable file.',
          'Классические утилиты решают по одной узкой задаче и отлично состыковываются. `grep` находит строки по шаблону, `sed` прогоняет их через последовательность команд редактирования, `awk` читает их как записи и поля, `cut` выбирает колонки, `sort` и `uniq` сортируют и убирают дубли, `tr` переводит символы. Они дешёвые, работают потоково и не грузят файл в память целиком, если вы не попросите.\n\n`grep` переключается с базовых на расширенные регулярные выражения флагом `-E`, игнорирует регистр через `-i`, инвертирует через `-v` и считает через `-c`. `sed` подменяет через `s/old/new/g` и правит на месте флагом `-i`. `awk -F: \'{print $1, $3}\'` делит каждую строку по двоеточию и печатает два поля; шаблон перед действием отбирает строки, а `NR` и `NF` дают номер строки и число полей.\n\nИнструменты ломаются предсказуемо. `grep` по бинарному файлу выдаёт мусор, поэтому сначала проверьте тип. `sort` сравнивает байты, если локаль не говорит иного, и `sort -u` — не то же самое, что `sort | uniq`. Жадное регулярное выражение может съесть разделитель, а `sed -i` без бэкапа превращает ошибку в шаблоне в невосстановимый файл.'
        ),
        bullets: [
          L('`grep` selects lines, `sed` edits them and `awk` understands fields.', '`grep` выбирает строки, `sed` редактирует их, `awk` понимает поля.'),
          L('`sort -u` differs from `sort | uniq`, which only removes neighbours.', '`sort -u` отличается от `sort | uniq`, который убирает только соседние дубли.'),
          L('`awk -F` sets the field separator and `$1` is the first field.', '`awk -F` задаёт разделитель полей, а `$1` — первое поле.'),
          L('`sed -i` without a backup can destroy the file in a single run.', '`sed -i` без бэкапа способен уничтожить файл за один прогон.'),
        ],
        code: `grep -rn --include='*.ts' 'TODO' src/
sed -i.bak 's/http:/https:/g' config.yaml
awk -F: '$3 >= 1000 {print $1, $3}' /etc/passwd
cut -d, -f2,4 orders.csv | sort | uniq -c | sort -rn | head`,
        takeaway: L(
          'One tool per job, combined with pipes, beats one clever command.',
          'Одна утилита — одна задача, а комбинирует их пайп, а не одна хитрая команда.'
        ),
      },
      {
        id: 'cli-ch2-s3',
        title: L('jq and structured data', 'jq и структурированные данные'),
        body: L(
          'Once the data is JSON, `jq` becomes the most useful filter in the toolbox. A filter is a path expression: `.items[]` walks an array, `.items[] | select(.status == "failed")` keeps only the matching objects, and `.items | length` counts them. Filters compose with a pipe exactly like commands do, and the result is pretty-printed by default.\n\nText output that only looks like a string is not a string, so plain strings come out quoted. The flag `-r` gives raw output, which is what you want when the result is fed to another command. Variables come in with `--arg name value` and are referenced as `$name`, while `jq -n` builds a document from nothing, which is handy when constructing requests.\n\nFor big inputs `jq` streams with `--stream`, but it still parses the whole document, so a ten gigabyte file needs a different tool. Common recipes: `jq -s \'add\'` merges an array of documents, `jq \'group_by(.user)\'` groups by a key, `jq \'to_entries | map(.value)\'` turns an object into a list. When the data is JSON Lines, one document per line, `jq -c` works line by line and stays cheap.',
          'Как только данные оказались в JSON, `jq` становится самым полезным фильтром в наборе. Фильтр — это выражение пути: `.items[]` проходит по массиву, `.items[] | select(.status == "failed")` оставляет только подходящие объекты, а `.items | length` считает их. Фильтры складываются пайпом ровно так же, как команды, и по умолчанию результат печатается с отступами.\n\nСтроковый результат, похожий на строку, строкой не является, поэтому обычные строки выходят в кавычках. Флаг `-r` даёт сырой вывод — то, что нужно, когда результат уходит в следующую команду. Переменные передаются через `--arg name value` и используются как `$name`, а `jq -n` собирает документ с нуля, что удобно при формировании запросов.\n\nНа больших входах `jq` работает потоково с `--stream`, но разбирает документ целиком, поэтому десятигигабайтный файл требует другого инструмента. Частые рецепты: `jq -s \'add\'` объединяет массив документов, `jq \'group_by(.user)\'` группирует по ключу, `jq \'to_entries | map(.value)\'` превращает объект в список. Для JSON Lines, где документ занимает одну строку, `jq -c` работает построчно и остаётся дешёвым.'
        ),
        bullets: [
          L('`jq -r` prints raw strings, so the output can be piped further.', '`jq -r` печатает сырые строки, и вывод можно уводить дальше по пайпу.'),
          L('`--arg` passes a variable into the filter and `$name` reads it.', '`--arg` передаёт переменную в фильтр, а `$name` её читает.'),
          L('`jq -s` slurps the input into one array and `jq -n` builds a document.', '`jq -s` собирает вход в один массив, а `jq -n` строит документ.'),
          L('`jq` parses the whole document, so huge files need streaming tools.', '`jq` разбирает документ целиком, поэтому огромные файлы требуют потоковых инструментов.'),
        ],
        code: `curl -s https://api.example.com/orders | jq '.items[] | select(.status == "failed") | .id'
jq -r '.items[].name' orders.json
jq -n --arg id 42 '{orderId: $id, source: "cli"}'`,
        takeaway: L(
          'Filter JSON with `jq` instead of parsing it with `grep` and `sed`.',
          'Фильтруйте JSON через `jq`, а не разбирайте его grep-ом и sed-ом.'
        ),
      },
    ],
  },
  {
    id: 'cli-ch3',
    title: L('Processes, signals and networking', 'Процессы, сигналы и сеть'),
    summary: L(
      'How processes are started, controlled and stopped, how to talk to HTTP and remote hosts, and how configuration reaches a program.',
      'Как запускаются и останавливаются процессы, как говорить с HTTP и удалёнными хостами и как конфигурация попадает в программу.'
    ),
    sections: [
      {
        id: 'cli-ch3-s1',
        title: L('Processes, jobs and exit codes', 'Процессы, задачи и коды возврата'),
        body: L(
          'A shell runs a program as a child process and waits for it. `ps` shows the process table, `pgrep` finds a process by name or by a pattern in its command line, and `pstree` draws the parent-child relations. A process that prints its own PID with `$$` makes it easy to find the right tree when several instances run at once.\n\nA trailing `&` starts a command in the background and returns the prompt immediately; `fg` brings it back to the foreground, `bg` continues it in the background, and `jobs` lists what the shell is tracking. `wait` blocks until the background jobs finish, and `disown` detaches a job so that the shell does not send it a hangup when the session ends.\n\nLong-running work belongs to a service manager, not to a terminal. `systemd` units describe the process, its restart policy and its logs; `systemctl status`, `journalctl -u` and `systemctl enable` are the tools you will use every day. The difference matters: a service survives a logout and restarts after a crash, while a background job in your shell does not.',
          'Оболочка запускает программу как дочерний процесс и ждёт её. `ps` показывает таблицу процессов, `pgrep` находит процесс по имени или по шаблону в командной строке, а `pstree` рисует отношения родитель-потомок. Процесс, печатающий свой PID через `$$`, позволяет легко найти нужное дерево, когда запущено несколько экземпляров.\n\nЗнак `&` в конце запускает команду в фоне и сразу возвращает приглашение; `fg` возвращает её на передний план, `bg` продолжает в фоне, а `jobs` показывает, что оболочка отслеживает. `wait` блокируется до конца фоновых задач, а `disown` отвязывает задачу, чтобы оболочка не послала ей hangup при завершении сессии.\n\nДолгоживущая работа принадлежит менеджеру сервисов, а не терминалу. Юниты `systemd` описывают процесс, его политику перезапуска и его логи; `systemctl status`, `journalctl -u` и `systemctl enable` будут использоваться каждый день. Разница принципиальна: сервис переживает выход из сессии и поднимается после падения, а фоновая задача в вашей оболочке — нет.'
        ),
        bullets: [
          L('`&` backgrounds a job, `fg` and `bg` control it, `wait` waits for it.', '`&` отправляет задачу в фон, `fg` и `bg` управляют ею, `wait` ждёт.'),
          L('`pgrep -f` matches the whole command line, not only the process name.', '`pgrep -f` ищет по всей командной строке, а не только по имени процесса.'),
          L('`systemd` gives you restart policies and logs that survive a reboot.', '`systemd` даёт политики перезапуска и логи, которые переживают перезагрузку.'),
          L('A background job dies with the shell unless it is detached or managed.', 'Фоновая задача умирает вместе с оболочкой, если её не отвязать и не отдать менеджеру.'),
        ],
        code: `npm run dev &            # background
jobs; fg %1; wait %1
pgrep -f 'node server.js'
systemctl status nginx; journalctl -u nginx -n 50`,
        takeaway: L(
          'Interactive work belongs to the shell, reliable work belongs to a service unit.',
          'Интерактивная работа — в оболочке, надёжная — в юните сервиса.'
        ),
      },
      {
        id: 'cli-ch3-s2',
        title: L('Signals and graceful shutdown', 'Сигналы и аккуратное завершение'),
        body: L(
          'A signal is a message the kernel delivers to a process. `SIGINT` (Ctrl-C) asks for interruption, `SIGTERM` asks for termination and is the polite way to stop a daemon, `SIGHUP` means the terminal closed, `SIGKILL` cannot be caught or ignored, and `SIGSTOP` freezes the process. `kill -l` lists them all with their numbers.\n\n`kill` sends a signal by number or by name: `kill -TERM 4242` and `kill 4242` do the same thing, because the default signal is SIGTERM. The difference between SIGTERM and SIGKILL is the difference between a polite request and an execution: a program that handles SIGTERM can close connections, flush buffers and finish the request in flight, while SIGKILL leaves all of that undone.\n\nIn bash you catch signals with `trap`: `trap \'cleanup\' EXIT` runs `cleanup` when the script exits, whatever the reason, and `trap \'cleanup\' INT TERM` catches the interruption and the termination. This is where a temporary file gets removed and a lock gets released. The rule that keeps scripts predictable: any signal you ignore must be handled somewhere else, and `timeout` is the tool that sends a signal for you.',
          'Сигнал — это сообщение, которое ядро доставляет процессу. `SIGINT` (Ctrl-C) просит прерваться, `SIGTERM` просит завершиться и является вежливым способом остановить демона, `SIGHUP` означает, что терминал закрылся, `SIGKILL` нельзя перехватить или проигнорировать, а `SIGSTOP` замораживает процесс. `kill -l` печатает весь список с номерами.\n\n`kill` отправляет сигнал по номеру или по имени: `kill -TERM 4242` и `kill 4242` делают одно и то же, потому что сигнал по умолчанию это SIGTERM. Разница между SIGTERM и SIGKILL — разница между просьбой и приговором: программа, обрабатывающая SIGTERM, может закрыть соединения, сбросить буферы и доделать текущий запрос, а SIGKILL оставит всё это незавершённым.\n\nВ bash сигналы перехватывают через `trap`: `trap \'cleanup\' EXIT` выполняет `cleanup` при выходе из скрипта по любой причине, а `trap \'cleanup\' INT TERM` ловит прерывание и завершение. Именно здесь удаляют временный файл и освобождают блокировку. Правило, которое делает скрипты предсказуемыми: любой сигнал, который вы игнорируете, должен быть обработан где-то ещё, а `timeout` — инструмент, который отправляет сигнал за вас.'
        ),
        bullets: [
          L('SIGTERM can be caught, SIGKILL cannot: always stop a daemon with SIGTERM.', 'SIGTERM можно перехватить, SIGKILL — нет: демона всегда останавливайте через SIGTERM.'),
          L('`trap ... EXIT` guarantees cleanup on every exit path.', '`trap ... EXIT` гарантирует уборку на любом пути выхода.'),
          L('`kill -l` prints the signal table with the numbers.', '`kill -l` печатает таблицу сигналов с номерами.'),
          L('`timeout 30 cmd` sends the signal for you when a command hangs.', '`timeout 30 cmd` сам отправляет сигнал, если команда зависла.'),
        ],
        code: `trap 'echo "cleanup"; rm -f /tmp/job.lock' EXIT
trap 'echo "interrupted"; exit 130' INT TERM
timeout 30 curl -s https://example.com
kill -TERM 4242; kill -l`,
        takeaway: L(
          'Handle SIGTERM to shut down cleanly and reserve SIGKILL for a process that refuses to die.',
          'Ловите SIGTERM для аккуратного завершения, а SIGKILL оставьте для процесса, который не умирает.'
        ),
      },
      {
        id: 'cli-ch3-s3',
        title: L('Networking from the shell and environment variables', 'Сеть из консоли и переменные окружения'),
        body: L(
          '`curl` is the command line HTTP client. `-s` silences the progress meter, `-S` keeps the errors, `-I` fetches only the headers, `-X` picks the method, `-H` adds a header, `-d` sends a body and `-o` writes the body to a file. Add `-w \'%{http_code} %{time_total}\'` to print a metric template, and `--fail` to turn an HTTP error into a non-zero exit code, which is what a script needs.\n\nRemote access uses `ssh`, and copying uses `scp` or `rsync`. `rsync -avz --delete src/ user@host:/var/www/` transfers only the differences and mirrors deletions, but a trailing slash on the source means the contents, and without it means the directory itself. `dig` and `nslookup` answer DNS questions, `ping` checks reachability, and `ss -tulnp` shows which sockets are listening and which process owns them.\n\nEnvironment variables are the simplest configuration channel: `export PORT=3000` puts a value into the environment of every child process, and the program reads it with `process.env` in Node or `os.environ` in Python. A variable that is not set expands to an empty string, which is dangerous, so scripts use `${VAR:-default}` and check the mandatory ones explicitly. Secrets belong in the environment or in a mounted file, never in the command line, where every user on the machine can read them from the process list.',
          '`curl` — консональный HTTP-клиент. `-s` убирает полосу прогресса, `-S` оставляет ошибки, `-I` забирает только заголовки, `-X` выбирает метод, `-H` добавляет заголовок, `-d` отправляет тело, а `-o` пишет тело в файл. Добавьте `-w \'%{http_code} %{time_total}\'`, чтобы напечатать шаблон метрик, и `--fail`, чтобы HTTP-ошибка давала ненулевой код возврата — именно это нужно скрипту.\n\nУдалённый доступ — это `ssh`, а копирование — `scp` или `rsync`. `rsync -avz --delete src/ user@host:/var/www/` передаёт только различия и повторяет удаления, но помните: слеш в конце источника означает содержимое каталога, а без него — сам каталог. `dig` и `nslookup` отвечают на вопросы DNS, `ping` проверяет доступность, а `ss -tulnp` показывает слушающие сокеты и процессы, которым они принадлежат.\n\nПеременные окружения — простейший канал конфигурации: `export PORT=3000` кладёт значение в окружение всех дочерних процессов, а программа читает его через `process.env` в Node или `os.environ` в Python. Незаданная переменная разворачивается в пустую строку, и это опасно, поэтому в скриптах пишут `${VAR:-default}` и явно проверяют обязательные. Секреты живут в окружении или в подключённом файле, но никогда в командной строке, где их видно в списке процессов любому пользователю машины.'
        ),
        bullets: [
          L('`curl --fail` turns an HTTP error into a non-zero exit code.', '`curl --fail` превращает HTTP-ошибку в ненулевой код возврата.'),
          L('`${VAR:-default}` gives a fallback for an unset variable.', '`${VAR:-default}` задаёт запасное значение для незаданной переменной.'),
          L('The trailing slash in `rsync` decides between contents and the directory.', 'Слеш в конце в `rsync` решает: содержимое каталога или сам каталог.'),
          L('Command line secrets leak through the process list.', 'Секреты в командной строке утекают через список процессов.'),
        ],
        code: `curl -sS --fail -H "Authorization: Bearer $TOKEN" https://api.example.com/users | jq '.[0].email'
export PORT=3000 NODE_ENV=production
node -e 'console.log(process.env.PORT)'`,
        takeaway: L(
          'Read configuration from the environment and keep secrets out of the command line.',
          'Читайте конфигурацию из окружения и держите секреты вне командной строки.'
        ),
      },
    ],
  },
  {
    id: 'cli-ch4',
    title: L('Shell scripting and automation', 'Скрипты и автоматизация'),
    summary: L(
      'How to write a bash script that fails loudly, cleans up after itself and runs on a schedule without a human.',
      'Как написать bash-скрипт, который громко падает, убирает за собой и работает по расписанию без человека.'
    ),
    sections: [
      {
        id: 'cli-ch4-s1',
        title: L('Bash syntax that surprises people', 'Синтаксис bash, который удивляет'),
        body: L(
          'A script starts with a shebang that tells the kernel which interpreter to run: `#!/usr/bin/env bash`. The file must be executable, and the shell reads the script line by line, so quoting and word splitting matter everywhere. Single quotes keep a string literally, double quotes allow `$`, backticks and backslashes to be interpreted, and an unquoted variable is split on whitespace and glob-expanded, which is the source of most shell bugs.\n\nVariables are set with `NAME=value` without spaces around the equals sign and read as `$NAME` or `${NAME}`. Arithmetic happens inside `$(( ))`, and the shell has no floating point. Conditions use `if [ ... ]` or the bash-specific `[[ ... ]]`, which is safer because it does not word-split and understands regular expressions; `case` is the readable way to match many values at once.\n\nThree loops cover everything: `for x in list`, `for ((i=0; i<n; i++))` and `while read -r line`. Always read with `IFS= read -r`: the `-r` stops backslashes from being eaten, and setting `IFS=` keeps leading and trailing spaces in the line. Arrays are indexed from zero, and `set -u` later turns an accidental typo in an array name into an error instead of an empty string.',
          'Скрипт начинается со shebang, который говорит ядру, какой интерпретатор запускать: `#!/usr/bin/env bash`. Файл должен быть исполняемым, а оболочка читает скрипт построчно, поэтому кавычки и разбиение на слова важны везде. Одинарные кавычки сохраняют строку буквально, двойные позволяют интерпретировать `$`, обратные кавычки и обратные слэши, а незаключённая в кавычки переменная разбивается по пробелам и разворачивается как глоб — это источник большинства багов в шелле.\n\nПеременные задаются как `NAME=value` без пробелов вокруг знака равенства и читаются как `$NAME` или `${NAME}`. Арифметика делается внутри `$(( ))`, а плавающей точки в шелле нет. Условия пишут как `if [ ... ]` или специфичным для bash `[[ ... ]]`, который безопаснее, потому что не разбивает строку на слова и понимает регулярные выражения; `case` — читаемый способ сопоставить сразу много значений.\n\nТри цикла покрывают всё: `for x in list`, `for ((i=0; i<n; i++))` и `while read -r line`. Всегда читайте как `IFS= read -r`: флаг `-r` не даёт обратным слэшам пропасть, а `IFS=` сохраняет пробелы в начале и в конце строки. Массивы нумеруются с нуля, а `set -u` позже превратит опечатку в имени массива в ошибку вместо пустой строки.'
        ),
        bullets: [
          L('Quote every expansion: `"$var"`, never a bare `$var`.', 'Берите в кавычки каждое разворачивание: `"$var"`, а не голое `$var`.'),
          L('`[[ ]]` is safer than `[ ]` in bash: no word splitting, supports regex.', '`[[ ]]` безопаснее `[ ]` в bash: нет разбиения на слова, есть регулярные выражения.'),
          L('`IFS= read -r` keeps spaces and backslashes intact.', '`IFS= read -r` сохраняет пробелы и обратные слэши.'),
          L('A shebang plus the execute bit turns a file into a program.', 'Shebang плюс бит выполнения превращают файл в программу.'),
        ],
        code: `#!/usr/bin/env bash
set -euo pipefail

for file in *.csv; do
  printf '%s\\n' "$(basename "$file")"
done

while IFS= read -r line; do
  echo "line: $line"
done < input.txt`,
        takeaway: L(
          'Quoting and `IFS= read -r` are the two habits that keep shell scripts correct.',
          'Кавычки и `IFS= read -r` — две привычки, которые берегут шелл-скрипты от ошибок.'
        ),
      },
      {
        id: 'cli-ch4-s2',
        title: L('set -euo pipefail, functions and traps', 'Строгий режим, функции и trap-ы'),
        body: L(
          '`set -e` makes the script exit when a command fails, `-u` treats an unset variable as an error, and `-o pipefail` makes a pipeline fail if any stage fails instead of only the last one. Together they turn silent corruption into a loud stop. But `set -e` is a rule about the exit status of a command and not about errors: a command inside an `if` condition or an `&&` chain is expected to fail, and the script continues.\n\nA function is defined with `name() { ... }` and called like any command. `local` keeps a variable inside the function, which is what you want for anything the caller should not read; without it the variable leaks into the global scope and overwrites something else. A function returns the exit code of its last command, and any output it prints goes to stdout, so a function that computes a value should print it and the caller captures it with `$(...)`.\n\nErrors that are expected are handled explicitly with `if`, `||` and `&&`. Cleanup that must happen in every case belongs in a trap: `trap \'rm -f "$tmp"\' EXIT` removes the temporary file whether the script succeeded, failed or was interrupted. Logging goes to stderr, so that stdout keeps only the result the caller wants to use.',
          '`set -e` заставляет скрипт выйти при ошибке команды, `-u` считает незаданную переменную ошибкой, а `-o pipefail` заставляет пайп падать, если упал любой его этап, а не только последний. Вместе они превращают тихую порчу данных в громкую остановку. Но `set -e` — это правило про код возврата команды, а не про ошибки: команда в условии `if` или в цепочке `&&` ожидаемо может не сработать, и скрипт продолжится.\n\nФункция определяется как `name() { ... }` и вызывается как любая команда. `local` оставляет переменную внутри функции — это нужно всему, что не должно попасть к вызывающему; без неё переменная утечёт в глобальную область и затопчет что-то ещё. Функция возвращает код последней команды, а любой её вывод уходит в stdout, поэтому функция, которая вычисляет значение, должна печатать его, а вызывающий — забирать через `$(...)`.\n\nОжидаемые ошибки обрабатывают явно через `if`, `||` и `&&`. Уборку, которая должна случиться всегда, вешают на trap: `trap \'rm -f "$tmp"\' EXIT` удалит временный файл и при успехе, и при ошибке, и при прерывании. Логи пишут в stderr, чтобы stdout оставался только тем результатом, который нужен вызывающему.'
        ),
        bullets: [
          L('`set -euo pipefail` turns silent failures into loud ones.', '`set -euo pipefail` превращает тихие сбои в громкие.'),
          L('`set -e` does not fire inside `if` conditions or `&&` chains.', '`set -e` не срабатывает внутри условий `if` и цепочек `&&`.'),
          L('Use `local` for every variable a function owns.', 'Используйте `local` для каждой переменной, которой владеет функция.'),
          L('`trap ... EXIT` runs the cleanup on success, failure and interrupt.', '`trap ... EXIT` выполняет уборку при успехе, ошибке и прерывании.'),
        ],
        code: `set -euo pipefail
IFS=$'\\n\\t'

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

retry() {
  local attempt=1
  while ! "$@"; do
    [ "$attempt" -ge 3 ] && return 1
    sleep $((attempt * 2))
    attempt=$((attempt + 1))
  done
}`,
        takeaway: L(
          'Strict mode plus traps makes a script fail fast and leave nothing behind.',
          'Строгий режим плюс trap-ы заставляют скрипт падать рано и ничего за собой не оставлять.'
        ),
      },
      {
        id: 'cli-ch4-s3',
        title: L('xargs, scheduling and automation', 'xargs, расписание и автоматизация'),
        body: L(
          '`xargs` turns a list of items into arguments of a command: `find . -name \'*.log\' -print0 | xargs -0 -r rm` deletes every matching file safely, because the null separator keeps the names intact. `-r` skips the command entirely when the input is empty, `-n` limits how many arguments are passed at once and `-P` runs several instances in parallel.\n\nScheduling lives in `cron`. Each line of a crontab is five time fields followed by a command: `*/5 * * * * /usr/local/bin/collect.sh`. The minute field comes first, and the special strings `@daily` and `@reboot` exist too. Cron runs with a minimal environment and a different working directory, so an absolute path in the command is not optional. `at` runs a one-off job, and `systemd` timers are the modern alternative with logging and dependencies.\n\nAn automated job must be idempotent, because it will run again after a crash and it will overlap with the previous run if it takes longer than the interval. Write to a temporary file and rename it into place, take a lock with `flock`, log the start and the end with timestamps, and make the exit code meaningful. A cron job that fails silently is worse than no cron job at all, because it hides the problem from everyone.',
          '`xargs` превращает список элементов в аргументы команды: `find . -name \'*.log\' -print0 | xargs -0 -r rm` надёжно удалит все подходящие файлы, потому что нулевой разделитель сохраняет имена целыми. `-r` пропускает запуск, если ввод пуст, `-n` ограничивает число аргументов за раз, а `-P` запускает несколько экземпляров параллельно.\n\nРасписание живёт в `cron`. Каждая строка кронтаба — пять полей времени и команда: `*/5 * * * * /usr/local/bin/collect.sh`. Минуты идут первым полем, а ещё есть специальные строки `@daily` и `@reboot`. Cron работает с минимальным окружением и с другим рабочим каталогом, поэтому абсолютный путь в команде не опция. `at` запускает разовую задачу, а таймеры `systemd` — современная альтернатива с логами и зависимостями.\n\nАвтоматическая задача обязана быть идемпотентной: она запустится снова после падения и пересечётся с предыдущим прогоном, если он длится дольше интервала. Пишите во временный файл и переименовывайте его на место, берите блокировку через `flock`, логируйте начало и конец с метками времени и делайте код возврата осмысленным. Задание cron, которое молча падает, хуже, чем его отсутствие: оно прячет проблему от всех.'
        ),
        bullets: [
          L('`xargs -0` pairs with `-print0` and keeps names with spaces intact.', '`xargs -0` работает в паре с `-print0` и не ломает имена с пробелами.'),
          L('Cron fields: minute, hour, day of month, month, day of week.', 'Поля cron: минута, час, день месяца, месяц, день недели.'),
          L('`flock` prevents two runs of the same job from overlapping.', '`flock` не даёт двум прогонам одного задания пересечься.'),
          L('Write to a temporary file and rename it, so nobody reads a half-written file.', 'Пишите во временный файл и переименовывайте, чтобы никто не прочитал недописанный файл.'),
        ],
        code: `find . -name '*.log' -mtime +30 -print0 | xargs -0 -r rm --

crontab -e
*/5 * * * * /usr/local/bin/collect.sh >> /var/log/collect.log 2>&1

flock -n /var/lock/collect.lock /usr/local/bin/collect.sh`,
        takeaway: L(
          'An automated job must be idempotent, logged and locked, or it will ruin your night.',
          'Автоматическая задача должна быть идемпотентной, с логами и блокировкой, иначе она испортит вам ночь.'
        ),
      },
    ],
  },
];
