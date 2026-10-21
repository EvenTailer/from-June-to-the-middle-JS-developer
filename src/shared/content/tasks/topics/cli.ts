import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliTasks: PracticeTask[] = [
  {
    id: 'topic-cli-1',
    lang: 'shell',
    moduleId: 'cli',
    topic: 'cli',
    level: 'basic',
    title: L('Find the big files on the disk', 'Найти большие файлы на диске'),
    brief: L(
      'A build folder grew to 40 GB and you must find the reason. Write a single find command that prints the path and the human readable size of every file bigger than 100 MB, skipping the node_modules folder. Use -type f to take only regular files, -size +100M for the size limit, -not -path with the pattern ./node_modules/* to skip the dependency folder, and run ls -lh on the results with -exec ... {} + so that the files are passed to ls in batches.',
      'Папка сборки выросла до 40 ГБ, и нужно найти причину. Напишите одну команду find, которая печатает путь и читаемый размер каждого файла больше 100 МБ, пропуская папку node_modules. Используйте -type f, чтобы взять только обычные файлы, -size +100M для ограничения размера, -not -path с шаблоном ./node_modules/* для пропуска зависимостей и запустите ls -lh на результат через -exec ... {} +, чтобы файлы передавались в ls пачками.'
    ),
    hint: L(
      'The -exec ... {} + form is preferred over the older -exec ... {} ; because it builds one command with many arguments instead of starting a process per file.',
      'Форма -exec ... {} + предпочтительнее старого -exec ... {} \\;, потому что она собирает одну команду с кучей аргументов, а не запускает процесс на каждый файл.'
    ),
    solution: `find . -type f -size +100M -not -path './node_modules/*' -exec ls -lh {} +`,
    explanation: L(
      'find walks the tree and evaluates the expression for every entry. -type f keeps only regular files, so directories, symlinks and sockets never reach the size check. The size test -size +100M uses the 1024 based units of find, and the plus sign means strictly greater than 100 blocks. -not -path inverts the pattern match, which excludes everything under node_modules without skipping the walk. The final -exec ls -lh {} + runs ls once with all the found files, and -h turns the byte counts into human readable values. If you want the biggest files first, pipe the result through sort -h.',
      'find обходит дерево и вычисляет выражение для каждой записи. -type f оставляет только обычные файлы, поэтому каталоги, симлинки и сокеты не доходят до проверки размера. Проверка размера -size +100M использует двоичные единицы find, а плюс означает строго больше 100 блоков. -not -path инвертирует проверку по шаблону и исключает всё внутри node_modules, не прерывая обход. Финальный -exec ls -lh {} + запускает ls один раз со всеми найденными файлами, а -h превращает байты в читаемые значения. Если нужны самые большие файлы первыми, добавьте в конвейер sort -h.'
    ),
  },
  {
    id: 'topic-cli-2',
    moduleId: 'cli',
    topic: 'cli',
    level: 'basic',
    title: L('Rename a batch of files safely', 'Безопасно переименовать пачку файлов'),
    brief: L(
      'Every .txt file in the current folder has to become a .md file. Do it in two steps. The first step is a dry run: a for loop over *.txt that only prints what would happen and changes nothing. The second step is the real rename and it must use mv -n, so an existing target is never overwritten, plus -v, so every rename is printed. Use the shell parameter expansion that removes the .txt suffix and appends .md, and guard the loop with a test for an existing file, because the glob stays literal when nothing matches.',
      'Каждый файл .txt в текущей папке должен стать файлом .md. Сделайте это в два шага. Первый шаг — пробный прогон: цикл for по *.txt, который только печатает, что произойдёт, и ничего не меняет. Второй шаг — настоящее переименование, и в нём обязательно mv -n, чтобы существующий файл не перезаписать, плюс -v, чтобы печатать каждое переименование. Используйте расширение параметра оболочки, которое убирает суффикс .txt и дописывает .md, и защитите цикл проверкой существования файла, потому что при отсутствии совпадений глоб остаётся буквальным.'
    ),
    hint: L(
      'The expansion ${name%.txt} removes the .txt suffix from the end of the variable, and the option -n of mv makes the command do nothing when the target already exists.',
      'Расширение ${имя%.txt} убирает суффикс .txt с конца переменной, а опция -n у mv заставляет команду ничего не делать, если цель уже существует.'
    ),
    solution: `# dry run: print the plan, change nothing
for f in *.txt; do
  [ -e "$f" ] || continue
  echo "mv -n '$f' '\${f%.txt}.md'"
done

# real run: never overwrite an existing file
for f in *.txt; do
  [ -e "$f" ] || continue
  mv -nv "$f" "\${f%.txt}.md"
done`,
    explanation: L(
      'A bulk rename is the classic place where a mistake touches hundreds of files, so it is always done twice: first as a plan, then for real. The dry run prints the exact command instead of running it, and the real run reads the same loop, so what you have seen is what will happen. The parameter expansion ${f%.txt} cuts the shortest matching suffix .txt from the end of the name, and the .md is appended in its place. The option -n of mv is the safety belt: when the target already exists, mv says nothing and does nothing instead of destroying the old file. The test [ -e "$f" ] || continue protects the loop, because when the glob matches nothing bash leaves the pattern itself in the variable and mv would fail on a file called literally *.txt.',
      'Массовое переименование — классическое место, где одна ошибка задевает сотни файлов, поэтому его всегда делают дважды: сначала как план, потом по-настоящему. Пробный прогон печатает точную команду вместо её выполнения, а настоящий прогон читает тот же цикл, то есть вы видели именно то, что произойдёт. Расширение параметра ${f%.txt} срезает самый короткий подходящий суффикс .txt с конца имени, и на его место дописывается .md. Опция -n у mv — это страховка: если цель уже существует, mv не делает ничего и ничего не затирает. Проверка [ -e "$f" ] || continue защищает цикл, потому что когда глоб ничего не находит, bash оставляет в переменной сам шаблон, и mv упал бы на файле, который буквально называется *.txt.'
    ),
  },
  {
    id: 'topic-cli-3',
    moduleId: 'cli',
    topic: 'cli',
    level: 'basic',
    title: L('Count the lines of the project by extension', 'Посчитать строки проекта по расширениям'),
    brief: L(
      'Measure the size of the codebase. Write a bash loop over the list of extensions js, ts and css that prints one line per extension in the form "js: 12045", where the number is the total number of lines in all the files of that extension. The files must be found with find -type f -name, the folders node_modules and dist must be excluded with two -not -path options, and the lines must be counted by piping the found files into wc -l. Use -exec cat {} + so that the file list never becomes too long for the command line.',
      'Измерьте размер кодовой базы. Напишите bash-цикл по списку расширений js, ts и css, который печатает по строке на каждое расширение в виде "js: 12045", где число — суммарное количество строк во всех файлах этого расширения. Файлы ищутся через find -type f -name, папки node_modules и dist исключаются двумя опциями -not -path, а строки считаются пайпом найденных файлов в wc -l. Используйте -exec cat {} +, чтобы список файлов никогда не стал длиннее командной строки.'
    ),
    hint: L(
      'wc -l counts the newlines of everything it reads, so the content of the files has to be piped into it. The + form of -exec batches the arguments.',
      'wc -l считает переводы строк во всём, что читает, поэтому содержимое файлов надо подать в него пайпом. Форма + у -exec собирает аргументы пачками.'
    ),
    solution: `for ext in js ts css; do
  count=$(find . -type f -name "*.$ext" \\
    -not -path './node_modules/*' \\
    -not -path './dist/*' \\
    -exec cat {} + | wc -l)
  echo "$ext: $count"
done`,
    explanation: L(
      'The loop gives one line of output per extension, and the command substitution $( ) captures the result of the pipeline so that it can be printed together with the label. Inside the pipeline wc -l counts the newlines of the concatenated content, and the last line of a file without a trailing newline is still counted because the missing newline only affects the very last line of the whole stream. The two -not -path options are the important part of the find: without them the count would include the compiled output and the installed packages. The + form of -exec passes the files in batches, so the command works on a project with tens of thousands of files without hitting the limit of the command line.',
      'Цикл даёт по строке вывода на расширение, а подстановка команды $( ) захватывает результат конвейера, чтобы напечатать его вместе с меткой. Внутри конвейера wc -l считает переводы строк в склеенном содержимом, причём последняя строка файла без завершающего перевода тоже учитывается: отсутствующий перевод влияет только на самую последнюю строку всего потока. Важнее всего две опции -not -path: без них в счёт попадут собранный вывод и установленные пакеты. Форма + у -exec передаёт файлы пачками, поэтому команда работает на проекте с десятками тысяч файлов и не упирается в длину командной строки.'
    ),
  },
  {
    id: 'topic-cli-4',
    lang: 'shell',
    moduleId: 'cli',
    topic: 'cli',
    level: 'intermediate',
    title: L('Watch a log file and filter the lines', 'Следить за лог-файлом и фильтровать строки'),
    brief: L(
      'Follow the file app.log in real time and print only the lines that mention ERROR or timeout, ignoring the case, and prefix every printed line with the current time in the format HH:MM:SS. Build the pipeline from tail -f, then grep with the extended regex -E, the option --line-buffered and the option -i, and finally a while read loop that prints the timestamp with date and the line with printf. The --line-buffered option is required: without it grep collects the output in a block and nothing appears on the screen until the buffer is full.',
      'Следи за файлом app.log в реальном времени и печатай только строки со словом ERROR или timeout, не различая регистр, и добавляй к каждой строке текущее время в формате HH:MM:SS. Собери конвейер из tail -f, затем grep с расширенной регуляркой -E, опцией --line-buffered и опцией -i, и в конце цикла while read, который печатает время через date, а строку через printf. Опция --line-buffered обязательна: без неё grep собирает вывод блоком, и на экране ничего не появится, пока буфер не переполнится.'
    ),
    hint: L(
      'grep buffers its output when it writes into a pipe instead of a terminal. The option --line-buffered turns the buffering off so that every matched line is flushed immediately.',
      'grep буферизует вывод, когда пишет в конвейер, а не в терминал. Опция --line-buffered отключает буферизацию, и каждая подошедшая строка сразу уходит на вывод.'
    ),
    solution: `tail -f app.log \\
  | grep -E --line-buffered -i 'error|timeout' \\
  | while IFS= read -r line; do
      printf '%s %s\\n' "$(date '+%H:%M:%S')" "$line"
    done`,
    explanation: L(
      'tail -f keeps the file open and streams whatever is appended to it, so the pipeline is a live filter and not a one time search. grep -E treats the pattern as an extended regular expression, so the alternation error|timeout works without escaping the pipe, and -i makes the match case insensitive. The critical flag is --line-buffered: when grep writes to a pipe it switches to block buffering, and the first match would stay invisible for seconds or even forever. The while loop reads the lines one by one, IFS= read -r keeps the spaces and does not interpret the backslashes, and printf prints the timestamp taken from date together with the original line. Press Ctrl+C to stop the whole pipeline.',
      'tail -f держит файл открытым и отдаёт всё, что в него дописывают, поэтому конвейер — это живой фильтр, а не разовый поиск. grep -E трактует шаблон как расширенную регулярку, поэтому чередование error|timeout работает без экранирования вертикальной черты, а -i делает сравнение регистронезависимым. Критический флаг — --line-buffered: когда grep пишет в конвейер, он переключается на блочную буферизацию, и первое совпадение осталось бы невидимым на секунды или вообще навсегда. Цикл while читает строки по одной, IFS= read -r сохраняет пробелы и не трактует обратные слэши, а printf печатает время из date вместе с исходной строкой. Нажмите Ctrl+C, чтобы остановить весь конвейер.'
    ),
  },
  {
    id: 'topic-cli-5',
    moduleId: 'cli',
    topic: 'cli',
    level: 'intermediate',
    title: L('Write a process management script', 'Написать скрипт управления процессами'),
    brief: L(
      'Write a bash script proc.sh with two subcommands. The subcommand list takes a pattern and prints the pid and the command line of every running process whose command matches the pattern, using pgrep -f to find the processes and ps -p to print them. The subcommand stop takes the same pattern, sends SIGTERM to every matched process with kill -TERM, waits up to five seconds for them to disappear, and then sends SIGKILL to the ones that are still alive with kill -KILL. Because pgrep -f compares the whole command line, the pattern is also part of the command line of the script itself, so the script must filter out its own pid. The script must start with set -euo pipefail, must not fail when nothing is found, and must print a usage line and exit with 1 for an unknown subcommand.',
      'Напишите bash-скрипт proc.sh с двумя подкомандами. Подкоманда list принимает шаблон и печатает pid и командную строку каждого запущенного процесса, чья команда подходит под шаблон, находя процессы через pgrep -f и печатая их через ps -p. Подкоманда stop принимает тот же шаблон, отправляет каждому найденному процессу SIGTERM через kill -TERM, ждёт до пяти секунд, пока они не исчезнут, и затем посылает SIGKILL тем, кто ещё жив, через kill -KILL. Так как pgrep -f сравнивает всю командную строку, шаблон входит и в командную строку самого скрипта, поэтому скрипт обязан отбрасывать собственный pid. Скрипт должен начинаться с set -euo pipefail, не падать, когда ничего не найдено, и печатать строку использования с кодом выхода 1 для неизвестной подкоманды.'
    ),
    hint: L(
      'pgrep exits with 1 when no process matches, which under set -e would kill the script, so the call has to be guarded with || true. The pattern is passed to pgrep -f, which matches the whole command line.',
      'pgrep завершается с кодом 1, когда ничего не нашлось, а под set -e это убьёт скрипт, поэтому вызов надо защитить через || true. Шаблон передаётся в pgrep -f, который ищет по всей командной строке.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: $0 list|stop <pattern>" >&2
}

pattern=""
case "\${1:-}" in
  list|stop) pattern="\${2:-}" ;;
  *) usage; exit 1 ;;
esac

if [ -z "$pattern" ]; then
  usage
  exit 1
fi

find_pids() {
  # the pattern matches the whole command line, so the script itself is filtered out
  pgrep -f "$pattern" | grep -v -x "$$" || true
}

case "$1" in
  list)
    find_pids | while read -r pid; do
      ps -p "$pid" -o pid=,args=
    done
    ;;
  stop)
    find_pids | while read -r pid; do
      echo "stopping $pid"
      kill -TERM "$pid" || true
    done

    for _ in 1 2 3 4 5; do
      sleep 1
      if [ -z "$(find_pids)" ]; then
        break
      fi
    done

    find_pids | while read -r pid; do
      echo "force killing $pid"
      kill -KILL "$pid" || true
    done
    ;;
esac`,
    explanation: L(
      'The script is organised as a small command line tool: the first argument selects the subcommand, the second is the pattern, and everything else is an error with a usage line. The helper function find_pids wraps pgrep and adds || true, because pgrep exits with 1 when nothing matches and under set -e that single non zero code would abort the whole script. The pattern is matched with pgrep -f, so it is compared against the full command line, and that is also why the script filters out its own pid with grep -v -x: the pattern is part of the command line of the script itself, and without the filter the stop branch would send a signal to the script that is running it. The stop branch is written as a two step escalation: SIGTERM asks the process to quit and lets it clean up, the loop waits five seconds, and only the processes that are still alive receive SIGKILL.',
      'Скрипт построен как маленькая утилита командной строки: первый аргумент выбирает подкоманду, второй — шаблон, а всё остальное считается ошибкой со строкой использования. Функция find_pids оборачивает pgrep и добавляет || true, потому что pgrep завершается с кодом 1, когда ничего не нашлось, и под set -e этот единственный ненулевой код прервал бы весь скрипт. Шаблон сопоставляется через pgrep -f, то есть со всей командной строкой, и поэтому же скрипт отбрасывает свой собственный pid через grep -v -x: шаблон входит в командную строку самого скрипта, и без этой фильтрации ветка stop отправила бы сигнал самому себе. Ветка stop сделана как двухуровневая эскалация: SIGTERM просит процесс завершиться и даёт ему прибраться, цикл ждёт пять секунд, и только выжившие получают SIGKILL.'
    ),
  },
  {
    id: 'topic-cli-6',
    moduleId: 'cli',
    topic: 'cli',
    level: 'advanced',
    title: L('Audit the permissions of the project', 'Провести аудит прав доступа проекта'),
    brief: L(
      'Audit the permissions of a project. First print every regular file that is writable by anyone: use find with the symbolic mode -perm -0002, which matches the files where the write bit for others is set, and exclude the .git folder with -not -path. Then fix the found files with chmod o-w, again through find -exec so that the file names with spaces are handled correctly. Finally print the numeric mode and the name of every file in the bin folder with stat -c and the format "%a %n", and add 2>/dev/null to the stat call so that a missing bin folder does not break the script.',
      'Проведите аудит прав доступа проекта. Сначала напечатайте все обычные файлы, доступные на запись кому угодно: используйте find с символическим режимом -perm -0002, который находит файлы, у которых установлен бит записи для остальных, и исключите папку .git через -not -path. Затем исправьте найденные файлы командой chmod o-w, тоже через find -exec, чтобы корректно обрабатывались имена с пробелами. В конце напечатайте числовой режим и имя каждого файла в папке bin через stat -c и формат "%a %n", и добавьте 2>/dev/null к вызову stat, чтобы отсутствующая папка bin не ломала скрипт.'
    ),
    hint: L(
      'The number after -perm is a bit mask, and the minus sign in front of it means that all the listed bits must be set in the file mode, while the other bits do not matter.',
      'Число после -perm — это битовая маска, а минус перед ней означает, что все перечисленные биты должны быть установлены в режиме файла, а остальные биты значения не имеют.'
    ),
    solution: `# files that anybody can write to
find . -type f -perm -0002 -not -path './.git/*' -print

# fix them
find . -type f -perm -0002 -not -path './.git/*' -exec chmod o-w {} +

# numeric mode of the scripts
find ./bin -type f -exec stat -c '%a %n' {} + 2>/dev/null`,
    explanation: L(
      'The mask 0002 is the write bit for the group others, and the leading minus in -perm -0002 means that this bit has to be set while every other bit of the mode is ignored, which is exactly what an audit needs: a file that is 600 does not match, and a file that is 602 does. World writable files are dangerous, because any account on the machine can replace their content, and for scripts that is a direct way to run code as another user. The fix uses chmod o-w, and it goes through find -exec rather than a shell loop, so the names with spaces and the names that start with a dash are passed as arguments instead of being parsed by the shell. stat -c "%a %n" prints the octal mode and the path, and the redirect to /dev/null keeps a missing bin folder from stopping the script.',
      'Маска 0002 — это бит записи для группы others, а ведущий минус в -perm -0002 означает, что этот бит должен быть установлен, а остальные биты режима не важны, и именно это нужно для аудита: файл с правами 600 не подходит, а файл с правами 602 подходит. Файлы, доступные на запись всем, опасны, потому что любой аккаунт на машине может подменить их содержимое, а для скриптов это прямой путь выполнить код от имени другого пользователя. Исправление — chmod o-w, и оно идёт через find -exec, а не через цикл в оболочке, поэтому имена с пробелами и имена, начинающиеся с дефиса, передаются аргументами, а не разбираются оболочкой. stat -c "%a %n" печатает восьмеричный режим и путь, а перенаправление в /dev/null не даёт отсутствующей папке bin остановить скрипт.'
    ),
  },
  {
    id: 'topic-cli-7',
    moduleId: 'cli',
    topic: 'cli',
    level: 'advanced',
    title: L('Write a rotating tar backup script', 'Написать скрипт резервного копирования с ротацией'),
    brief: L(
      'Write a bash script backup.sh that creates a gzipped tar archive of the data folder, puts it into the backups folder, names it backup-YYYY-MM-DD.tar.gz with the current date, and keeps only the seven most recent archives. The script must create the target folder with mkdir -p, exclude the backups folder itself from the archive with the --exclude option of tar, remove the old archives with ls -1t, tail -n +8 and xargs, and must not fail when there is nothing to delete, which is why xargs needs the -r option. The script must start with set -euo pipefail and print the path of the archive it has created.',
      'Напишите bash-скрипт backup.sh, который создаёт сжатый gzip tar-архив папки data, кладёт его в папку backups, называет его backup-YYYY-MM-DD.tar.gz с текущей датой и хранит только семь самых свежих архивов. Скрипт должен создавать папку назначения через mkdir -p, исключать саму папку backups из архива опцией --exclude у tar, удалять старые архивы связкой ls -1t, tail -n +8 и xargs и не падать, когда удалять нечего, поэтому xargs нужен с опцией -r. Скрипт должен начинаться с set -euo pipefail и печатать путь созданного архива.'
    ),
    hint: L(
      'The number after + in tail -n +8 tells tail to start with the eighth line, and the files are listed from the newest to the oldest by ls -1t, so the tail of that list is exactly the set of archives to delete.',
      'Число после + в tail -n +8 говорит tail начать с восьмой строки, а ls -1t перечисляет файлы от новых к старым, поэтому хвост этого списка — ровно те архивы, которые надо удалить.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

src="data"
dest="backups"
keep=7

mkdir -p "$dest"

stamp="$(date +%F)"
archive="$dest/backup-$stamp.tar.gz"

tar -czf "$archive" --exclude="$dest" "$src"

ls -1t "$dest"/backup-*.tar.gz 2>/dev/null \\
  | tail -n +$((keep + 1)) \\
  | xargs -r rm -f

echo "created $archive"`,
    explanation: L(
      'The rotation is done with three commands that hand the file list from one to the other. ls -1t prints the archives one per line, newest first, because -t sorts by modification time. tail -n +8 then cuts off the first seven lines and keeps the rest, which are exactly the archives older than the limit, and the count is computed as keep + 1 so that the number of kept archives is a single variable. The pipe closes the list with xargs rm -f, and the -r option of xargs tells it to do nothing when the input is empty, otherwise rm would be called without arguments and would fail. The --exclude option of tar keeps the backup folder out of the archive it creates, otherwise every run would archive the previous archives and the folder would grow forever.',
      'Ротация сделана тремя командами, которые передают список файлов друг другу. ls -1t печатает архивы по одному в строке, сначала новые, потому что -t сортирует по времени изменения. Затем tail -n +8 отрезает первые семь строк и оставляет остальные, а это ровно архивы старше лимита, причём число считается как keep + 1, чтобы количество хранимых архивов задавалось одной переменной. Список закрывается связкой xargs rm -f, а опция -r у xargs говорит ничего не делать при пустом входе, иначе rm вызвался бы без аргументов и упал бы. Опция --exclude у tar не пускает папку с бэкапами в создаваемый архив, иначе каждый запуск архивировал бы предыдущие архивы и папка росла бы бесконечно.'
    ),
  },
  {
    id: 'topic-cli-8',
    lang: 'shell',
    moduleId: 'cli',
    topic: 'cli',
    level: 'advanced',
    title: L('Build a report with jq', 'Собрать отчёт с помощью jq'),
    brief: L(
      'The file users.json holds an array of users with the fields id, name, role and age. Build a report with jq and print it as tab separated columns: role, count, avg_age. The rules are: group the users by role, count the users of every role, compute the average age of the role rounded to one decimal, sort the groups by the count in descending order and by the role in ascending order for the ties, and print one line per role. Use group_by, map, sort_by and the string interpolation with the @tsv format so that the numbers are printed as text. For the input [{id:1,role:"dev",age:31},{id:2,role:"ops",age:45},{id:3,role:"dev",age:27},{id:4,role:"qa",age:38},{id:5,role:"ops",age:51},{id:6,role:"dev",age:24}] the report must be the three lines "dev 3 27.3", "ops 2 48" and "qa 1 38", each of them separated by a tab.',
      'Файл users.json содержит массив пользователей с полями id, name, role и age. Соберите отчёт через jq и напечатайте его в виде колонок, разделённых табуляцией: role, count, avg_age. Правила: сгруппировать пользователей по role, посчитать количество пользователей в каждой роли, вычислить средний возраст роли с округлением до одного знака, отсортировать группы по количеству в порядке убывания, а при равенстве — по role в порядке возрастания, и напечатать по строке на роль. Используйте group_by, map, sort_by и строковую интерполяцию с форматом @tsv, чтобы числа печатались как текст. Для входа [{id:1,role:"dev",age:31},{id:2,role:"ops",age:45},{id:3,role:"dev",age:27},{id:4,role:"qa",age:38},{id:5,role:"ops",age:51},{id:6,role:"dev",age:24}] отчёт должен состоять из трёх строк "dev 3 27.3", "ops 2 48" и "qa 1 38", разделённых табуляцией.'
    ),
    hint: L(
      'Inside map the dot is one group, that is an array of users, so the role of the group is taken from the first element and the count is the length of the array. The sort key is an array of two values, so sort_by([-.count, .role]) sorts by the count first.',
      'Внутри map точка — это одна группа, то есть массив пользователей, поэтому роль группы берётся у первого элемента, а количество равно длине массива. Ключ сортировки — массив из двух значений, поэтому sort_by([-.count, .role]) сортирует сначала по количеству.'
    ),
    solution: `jq -r '
  group_by(.role)
  | map({
      role: .[0].role,
      count: length,
      avg_age: ((map(.age) | add / length) * 10 | round / 10)
    })
  | sort_by([-.count, .role])
  | .[]
  | [.role, .count, .avg_age]
  | @tsv
' users.json`,
    explanation: L(
      'group_by(.role) sorts the users by the role and cuts the array into one sub array per role, so the rest of the filter works with groups. The map step turns every group into one report row: inside it the dot is the group, the role is the role of the first element and the count is the length of the array. The average is computed as the sum of the ages divided by the number of users, and the multiplication by 10 with round and another division by 10 keeps one decimal without losing the digits. The sort key is an array, sort_by([-.count, .role]), and because the first value is negative the count is sorted in descending order while the role breaks the ties in ascending order. The last step builds an array of three values per row and @tsv prints it as a tab separated line, while the -r option of jq prints the result raw, without the quotes it would add by default.',
      'group_by(.role) сортирует пользователей по роли и режет массив на подмассивы по одной группе на роль, поэтому дальше фильтр работает с группами. Шаг map превращает каждую группу в одну строку отчёта: внутри него точка — это группа, роль берётся у первого элемента, а количество равно длине массива. Среднее считается как сумма возрастов, делённая на число пользователей, а умножение на 10 с округлением и повторным делением на 10 оставляет один знак, не теряя цифры. Ключ сортировки — массив sort_by([-.count, .role]), и так как первое значение отрицательное, количество сортируется по убыванию, а роль разруливает равенства по возрастанию. Последний шаг собирает массив из трёх значений в строке, а @tsv печатает его через табуляцию, при этом опция -r у jq печатает результат как есть, без кавычек, которые добавляются по умолчанию.'
    ),
  },
];
