import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliTasks: PracticeTask[] = [
  {
    id: 'cli-task-4',
    topic: 'cli',
    level: 'basic',
    title: L('Find recently modified files', 'Найти недавно изменённые файлы'),
    brief: L(
      'List every file under src that changed during the last two hours and show its modification time, newest first. Also show how the same filter works in days.',
      'Перечислите все файлы в src, изменённые за последние два часа, с временем изменения, сначала новые. Покажите также, как тот же фильтр работает в днях.'
    ),
    hint: L(
      'find has -mmin for minutes and -mtime for days. Combine it with ls -lt to see timestamps.',
      'У find есть -mmin для минут и -mtime для дней. Добавьте ls -lt, чтобы увидеть время изменения.'
    ),
    solution: `# modified in the last 120 minutes
find src -type f -mmin -120 -exec ls -lt {} +

# modified in the last 2 days
find src -type f -mtime -2`,
    explanation: L(
      '-mmin counts minutes and -mtime counts 24-hour periods. A leading minus means "less than", so -mtime -2 is the last 48 hours, while +7 would mean older than a week.',
      '-mmin считает минуты, а -mtime — сутки. Минус перед числом означает "меньше", поэтому -mtime -2 — это последние 48 часов, а +7 — старше недели.'
    ),
  },
  {
    id: 'cli-task-5',
    topic: 'cli',
    level: 'basic',
    title: L('Rename a symbol with sed', 'Переименовать символ через sed'),
    brief: L(
      'Rename every occurrence of getUser to fetchUser in src/config.ts. Create a .bak backup first and verify the result with grep.',
      'Переименуйте все вхождения getUser в fetchUser в src/config.ts. Сначала создайте резервную копию .bak и проверьте результат через grep.'
    ),
    hint: L(
      'sed -i edits in place; on macOS the argument of -i is the backup suffix. The g flag replaces every match on a line.',
      'sed -i меняет файл на месте; в macOS аргумент -i задаёт суффикс резервной копии. Флаг g заменяет все совпадения в строке.'
    ),
    solution: `sed -i.bak 's/getUser/fetchUser/g' src/config.ts
grep -n 'fetchUser' src/config.ts

# macOS / BSD sed uses an explicit empty suffix
sed -i '' 's/getUser/fetchUser/g' src/config.ts`,
    explanation: L(
      'The address is omitted, so sed applies the substitution to every line. g repeats it for every match, and the backup suffix gives you a quick way to roll back a bad edit.',
      'Адрес не указан, поэтому sed применяет замену ко всем строкам. g повторяет её для каждого совпадения, а суффикс резервной копии позволяет быстро откатить неудачное изменение.'
    ),
  },
  {
    id: 'cli-task-6',
    topic: 'cli',
    level: 'basic',
    title: L('Filter the tail of a log', 'Отфильтровать хвост лога'),
    brief: L(
      'Show the last 200 lines of logs/app.log, keep only errors and exceptions, and display the last 20 matches. Then follow the log live with the same filter.',
      'Покажите последние 200 строк logs/app.log, оставьте только ошибки и исключения и выведите последние 20 совпадений. Затем следите за логом в реальном времени с тем же фильтром.'
    ),
    hint: L(
      'Chain tail and grep with a pipe. grep -E allows alternation, and --line-buffered keeps live output responsive.',
      'Соедините tail и grep через pipe. grep -E поддерживает альтернативу, а --line-buffered сохраняет отзывчивость живого вывода.'
    ),
    solution: `tail -n 200 logs/app.log | grep -iE 'error|exception' | tail -n 20

# follow new lines as they are written
tail -f logs/app.log | grep --line-buffered -i 'error'`,
    explanation: L(
      'The first tail limits how much history is read, grep filters it, and the second tail keeps only the latest matches. Without --line-buffered, grep may batch output when stdout is a pipe.',
      'Первый tail ограничивает объём истории, grep фильтрует, а второй tail оставляет только последние совпадения. Без --line-buffered grep может буферизовать вывод, когда stdout — это pipe.'
    ),
  },
  {
    id: 'cli-task-7',
    topic: 'cli',
    level: 'intermediate',
    title: L('Count lines of code and rank files', 'Посчитать строки кода и отсортировать файлы'),
    brief: L(
      'Count the total number of lines in all TypeScript files under src and show the five files with the most lines.',
      'Посчитайте общее число строк во всех TypeScript-файлах в src и покажите пять файлов с наибольшим числом строк.'
    ),
    hint: L(
      'wc -l prints a total line when it receives several files. sort -nr orders by number and head keeps the top five.',
      'wc -l печатает итоговую строку, когда получает несколько файлов. sort -nr сортирует по числу, а head оставляет первые пять.'
    ),
    solution: `# total lines across .ts and .tsx files
find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -n 1

# five files with the most lines
wc -l src/*.ts | sort -nr | head -n 5`,
    explanation: L(
      'wc adds a total line at the end, so tail -n 1 extracts the summary. sort -nr sorts numerically in reverse, which puts the largest files first.',
      'wc добавляет итоговую строку в конце, поэтому tail -n 1 берёт сводку. sort -nr сортирует численно по убыванию и ставит самые большие файлы первыми.'
    ),
  },
  {
    id: 'cli-task-8',
    topic: 'cli',
    level: 'intermediate',
    title: L('Configure a CLI app with environment variables', 'Настроить CLI-приложение через переменные окружения'),
    brief: L(
      'Set NODE_ENV and API_URL for the current shell, read one value back, load a local .env file into the shell, and remove a variable when it is no longer needed.',
      'Задайте NODE_ENV и API_URL для текущей оболочки, прочитайте одно значение, загрузите локальный .env в оболочку и удалите переменную, когда она больше не нужна.'
    ),
    hint: L(
      'export makes a variable visible to child processes. set -a exports every assignment until set +a, which makes it easy to load .env files.',
      'export делает переменную видимой для дочерних процессов. set -a экспортирует все присваивания до set +a, что удобно для загрузки .env.'
    ),
    solution: `export NODE_ENV=production
export API_URL=https://api.example.com
printenv API_URL

# load local secrets into the current shell only
set -a
. ./.env
set +a

unset API_URL`,
    explanation: L(
      'A plain assignment creates a shell variable; export also passes it to commands you start. Keep .env out of version control and pass secrets through the environment instead of hardcoding them.',
      'Обычное присваивание создаёт переменную оболочки; export дополнительно передаёт её запускаемым командам. Не добавляйте .env в репозиторий и передавайте секреты через окружение, а не в коде.'
    ),
  },
  {
    id: 'cli-task-9',
    topic: 'cli',
    level: 'intermediate',
    title: L('Stop a process gracefully', 'Остановить процесс корректно'),
    brief: L(
      'Find the process running "node server.js", send SIGTERM, wait two seconds and check whether it exited. Use SIGKILL only as a last resort.',
      'Найдите процесс "node server.js", отправьте SIGTERM, подождите две секунды и проверьте, завершился ли он. Используйте SIGKILL только в крайнем случае.'
    ),
    hint: L(
      'pgrep -af prints the PID and the full command line. ps -p checks whether a specific PID still exists.',
      'pgrep -af печатает PID и полную командную строку. ps -p проверяет, существует ли конкретный PID.'
    ),
    solution: `pgrep -af 'node server.js'
# 4821 node server.js

kill -TERM 4821
sleep 2

if ps -p 4821 > /dev/null; then
  echo 'still running, inspect before force kill'
else
  echo 'stopped gracefully'
fi

# last resort only: no cleanup, no flushing
kill -9 4821`,
    explanation: L(
      'SIGTERM asks the process to shut down and lets it close connections and release resources. SIGKILL cannot be caught, so it should never be the first choice.',
      'SIGTERM просит процесс завершиться и позволяет закрыть соединения и освободить ресурсы. SIGKILL нельзя перехватить, поэтому его не стоит использовать первым.'
    ),
  },
  {
    id: 'cli-task-10',
    topic: 'security',
    level: 'intermediate',
    title: L('Set safe file permissions', 'Настроить безопасные права доступа'),
    brief: L(
      'Make deploy.sh executable by the owner and the group but not by others. Make config.json readable by everyone and writable only by the owner. Restrict the .ssh directory to its owner.',
      'Сделайте deploy.sh исполняемым для владельца и группы, но не для остальных. Сделайте config.json читаемым всем и записываемым только владельцем. Ограничьте каталог .ssh только владельцем.'
    ),
    hint: L(
      'Numeric mode uses three digits: owner, group, others. 7 is rwx, 6 is rw-, 5 is r-x, 0 is no access.',
      'Числовой режим использует три цифры: владелец, группа, остальные. 7 — rwx, 6 — rw-, 5 — r-x, 0 — нет доступа.'
    ),
    solution: `chmod 750 deploy.sh    # rwxr-x---
chmod 644 config.json  # rw-r--r--
chmod 700 ~/.ssh       # rwx------

ls -l deploy.sh config.json
ls -ld ~/.ssh`,
    explanation: L(
      'Each digit is a bit mask: read is 4, write is 2, execute is 1. 750 gives the group read and execute so teammates can run the script, while others get nothing.',
      'Каждая цифра — битовая маска: чтение 4, запись 2, выполнение 1. 750 даёт группе чтение и выполнение, чтобы коллеги могли запускать скрипт, а остальные не получают ничего.'
    ),
  },
  {
    id: 'cli-task-11',
    topic: 'cli',
    level: 'advanced',
    title: L('Archive a release and extract it elsewhere', 'Собрать релиз в архив и распаковать в другом месте'),
    brief: L(
      'Create a gzip tar archive of /srv/app without node_modules and .git, list its contents, and extract it into /srv/app-next.',
      'Создайте gzip-архив tar каталога /srv/app без node_modules и .git, покажите его содержимое и распакуйте в /srv/app-next.'
    ),
    hint: L(
      'tar -c creates, -x extracts, -z filters through gzip, -f names the archive and -C changes the directory.',
      'tar -c создаёт, -x распаковывает, -z сжимает через gzip, -f задаёт архив, а -C меняет каталог.'
    ),
    solution: `mkdir -p releases

tar -czf "releases/app-$(date +%F).tar.gz" --exclude='node_modules' --exclude='.git' -C /srv/app .
tar -tzf releases/app-2026-10-19.tar.gz | head

mkdir -p /srv/app-next
tar -xzf releases/app-2026-10-19.tar.gz -C /srv/app-next`,
    explanation: L(
      'Excludes keep the archive small and avoid shipping dependencies or history. -C makes the paths relative to the chosen directory, so extraction does not depend on where you run the command.',
      'Исключения уменьшают архив и не дают упаковать зависимости и историю. -C делает пути относительными выбранного каталога, поэтому распаковка не зависит от места запуска.'
    ),
  },
  {
    id: 'cli-task-12',
    topic: 'cli',
    level: 'advanced',
    title: L('Call an API with headers and parse JSON', 'Вызвать API с заголовками и разобрать JSON'),
    brief: L(
      'Request a user from an API with a bearer token, save the headers and body separately, print the HTTP status and extract the name with jq.',
      'Запросите пользователя из API с bearer-токеном, сохраните заголовки и тело отдельно, выведите HTTP-статус и извлеките имя через jq.'
    ),
    hint: L(
      'curl -D writes response headers to a file, -o writes the body, and -w prints a value such as %{http_code} after the request.',
      'curl -D записывает заголовки ответа в файл, -o — тело, а -w печатает значение вроде %{http_code} после запроса.'
    ),
    solution: `status=$(curl -sS -D /tmp/headers.txt -o /tmp/user.json -w '%{http_code}' -H 'Accept: application/json' -H "Authorization: Bearer $API_TOKEN" 'https://api.example.com/users/42')

head -n 1 /tmp/headers.txt
echo "HTTP $status"
jq -r '.name' /tmp/user.json
jq 'has("email")' /tmp/user.json`,
    explanation: L(
      'Splitting headers and body keeps the JSON valid for jq. -sS hides the progress bar but still prints errors, and jq -r returns a raw string without quotes.',
      'Разделение заголовков и тела сохраняет JSON корректным для jq. -sS скрывает прогресс, но показывает ошибки, а jq -r возвращает строку без кавычек.'
    ),
  },
  {
    id: 'cli-task-13',
    topic: 'cli',
    level: 'advanced',
    title: L('Batch-process files with xargs', 'Пакетно обработать файлы через xargs'),
    brief: L(
      'Compress application logs older than seven days in batches, then optimize PNG files four at a time. File names may contain spaces.',
      'Сожмите логи приложения старше семи дней пакетами, затем оптимизируйте PNG-файлы по четыре одновременно. В именах файлов могут быть пробелы.'
    ),
    hint: L(
      'find -print0 and xargs -0 preserve spaces. -n limits arguments per command and -P sets parallelism.',
      'find -print0 и xargs -0 сохраняют пробелы. -n ограничивает число аргументов на команду, а -P задаёт параллельность.'
    ),
    solution: `# compress old logs, safe with spaces in names
find /var/log/myapp -type f -name '*.log' -mtime +7 -print0 | xargs -0 -r -n 20 gzip

# four conversions in parallel, one file per process
find assets -type f -name '*.png' -print0 | xargs -0 -P 4 -n 1 optipng -quiet`,
    explanation: L(
      '-print0 emits a null byte after each path, and xargs -0 reads that format, so spaces and newlines cannot split a file name. -r skips the command when no input matches.',
      '-print0 добавляет нулевой байт после каждого пути, а xargs -0 читает этот формат, поэтому пробелы и переводы строк не разрывают имя файла. -r не запускает команду, если совпадений нет.'
    ),
  },
  {
    id: 'cli-task-14',
    topic: 'cli',
    level: 'advanced',
    title: L('Write a small backup script', 'Написать небольшой скрипт резервного копирования'),
    brief: L(
      'Create a bash script that archives /srv/app into /var/backups/app with a timestamp, fails fast on errors, and deletes backups older than 14 days.',
      'Создайте bash-скрипт, который архивирует /srv/app в /var/backups/app с временной меткой, падает при первой ошибке и удаляет копии старше 14 дней.'
    ),
    hint: L(
      'Use set -euo pipefail at the top, quote every path, and build the timestamp with date before the archive name.',
      'Используйте set -euo pipefail в начале, заключайте пути в кавычки и получите временную метку через date до формирования имени архива.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

SRC=/srv/app
DEST=/var/backups/app
STAMP=$(date +%Y-%m-%d_%H%M)

mkdir -p "$DEST"
tar -czf "$DEST/app-$STAMP.tar.gz" -C "$SRC" .
find "$DEST" -name 'app-*.tar.gz' -mtime +14 -delete

echo "backup written: $DEST/app-$STAMP.tar.gz"`,
    explanation: L(
      '-e stops on a failed command, -u rejects unset variables and pipefail catches failures inside pipelines. The timestamp gives every run a unique name, and the retention line removes only old archives.',
      '-e останавливает работу при ошибке, -u запрещает неопределённые переменные, а pipefail ловит сбои внутри конвейеров. Метка времени делает имя уникальным, а строка retention удаляет только старые архивы.'
    ),
  },
  {
    id: 'cli-task-15',
    topic: 'cli',
    level: 'advanced',
    title: L('Turn JSON into CSV with jq', 'Преобразовать JSON в CSV через jq'),
    brief: L(
      'Fetch a list of users, convert the id, name and active fields into a CSV file with a header row, and inspect the first lines.',
      'Загрузите список пользователей, преобразуйте поля id, name и active в CSV-файл с заголовком и проверьте первые строки.'
    ),
    hint: L(
      'jq -r prints raw strings. The @csv filter quotes and escapes values, and a comma expression can emit the header before the rows.',
      'jq -r печатает сырые строки. Фильтр @csv экранирует значения, а выражение с запятой выводит заголовок перед строками.'
    ),
    solution: `curl -sS 'https://api.example.com/users' | jq -r '(["id","name","active"] | @csv), (.[] | [.id, .name, .active] | @csv)' > users.csv

head -n 3 users.csv
wc -l users.csv`,
    explanation: L(
      'The array literal is the header, .[] iterates the response and builds one row per user. @csv handles commas and quotes, which is safer than joining fields by hand.',
      'Литерал массива задаёт заголовок, .[] перебирает ответ и создаёт строку на пользователя. @csv сам обрабатывает запятые и кавычки, это надёжнее ручного соединения полей.'
    ),
  },
];
