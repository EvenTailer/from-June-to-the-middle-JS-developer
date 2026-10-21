import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const cliChapterTasks: PracticeTask[] = [
  {
    id: 'ch-cli-ch1-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch1',
    level: 'basic',
    title: L('Quote the expansion and keep the exit code', 'Цитировать подстановку и сохранить код возврата'),
    brief: L(
      'Print the value of a variable that contains spaces as a single argument, show the difference between single and double quotes, and fall back to a default when the variable is unset. Then run a command and capture its exit code before any other command overwrites it.',
      'Выведите значение переменной с пробелами как один аргумент, покажите разницу между одинарными и двойными кавычками и подставьте значение по умолчанию, если переменная не задана. Затем запустите команду и сохраните её код возврата до того, как его перезапишет другая команда.'
    ),
    hint: L(
      'Single quotes are literal, double quotes still expand variables, and ${VAR:-fallback} supplies a default. The exit status lives in $? only until the next command runs, so read it immediately.',
      'Одинарные кавычки передают текст буквально, двойные всё ещё разворачивают переменные, а ${VAR:-fallback} подставляет значение по умолчанию. Код возврата живёт в $? только до следующей команды, поэтому читайте его сразу.'
    ),
    solution: `# one argument with spaces inside
NAME="Ada Lovelace"
echo "$NAME"          # Ada Lovelace

# literal text, nothing is expanded
echo '$NAME'          # $NAME

# a default when the variable is unset
echo "\${USERNAME:-guest}"   # guest

# read the status right away
grep -q error app.log
status=$?
if [ $status -ne 0 ]; then
  echo "no errors found"
fi`,
    explanation: L(
      'The shell splits unquoted text into separate words and globs it before the program starts, so quoting is what keeps one value one argument. The exit status must be captured in the same breath as the command, because the next command replaces it.',
      'Оболочка делит текст без кавычек на слова и разворачивает шаблоны до запуска программы, поэтому именно кавычки сохраняют одно значение одним аргументом. Код возврата нужно забрать сразу после команды, иначе его затрёт следующая.'
    ),
  },
  {
    id: 'ch-cli-ch2-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch2',
    level: 'basic',
    title: L('Find files and grep them safely', 'Найти файлы и безопасно грепнуть их'),
    brief: L(
      'Find every TypeScript file under src except the build output, search the whole tree for a fixed string with line numbers, and pass the matching paths to another command without breaking on file names that contain spaces.',
      'Найдите все TypeScript-файлы в src, кроме выходных данных сборки, найдите по всему дереву фиксированную строку с номерами строк и передайте найденные пути другой команде так, чтобы имена файлов с пробелами не сломали команду.'
    ),
    hint: L(
      'find walks the tree while a glob matches names inside one directory. Quote the pattern so the shell does not expand it first, use -print0 with xargs -0 for names with spaces, and grep -F for a literal pattern.',
      'find обходит дерево, а шаблон совпадает только с именами внутри одного каталога. Процитируйте образец, чтобы оболочка не развернула его первой, используйте -print0 с xargs -0 для имён с пробелами, а grep -F — для буквального шаблона.'
    ),
    solution: `# every TypeScript file, no build output
find src -type f -name '*.ts' -not -path './build/*'

# a literal string with line numbers
grep -rnF 'user_id' src/

# the same search with ripgrep
rg -F 'user_id'

# paths with spaces survive the pipe
find src -type f -name '*.ts' -print0 | xargs -0 -r wc -l

# the matching paths are passed to another command, still null separated
grep -rlZ --include='*.ts' -F 'user_id' src/ | xargs -0 -r wc -l`,
    explanation: L(
      'find applies its predicates as a conjunction, and the quoted pattern reaches find unchanged instead of being expanded by the shell. The null separated output from -print0 is the only safe way to hand paths to xargs when a name may contain a space or a newline.',
      'find соединяет свои предикаты по И, а процитированный образец доходит до find без изменений, вместо того чтобы быть развёрнутым оболочкой. Только null-разделённый вывод -print0 безопасно передаёт пути в xargs, если в имени есть пробел или перевод строки.'
    ),
  },
  {
    id: 'ch-cli-ch3-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch3',
    level: 'basic',
    title: L('Build a report out of a text pipeline', 'Собрать отчёт из текстового конвейера'),
    brief: L(
      'From an access log, count the most frequent request paths, take the fifth column of a CSV file, and turn the URL of a JSON answer into a plain string. The pipeline must fail when any stage in the middle fails, not only when the last one does.',
      'Из лога доступа посчитайте самые частые пути запросов, возьмите пятый столбец CSV-файла и превратите URL в JSON-ответе в обычную строку. Конвейер должен падать, когда падает любой промежуточный этап, а не только последний.'
    ),
    hint: L(
      'uniq collapses only adjacent duplicates, so sort first and then count with uniq -c. cut splits on a delimiter and ignores quoting. jq -r prints a string without quotes, and set -o pipefail makes a broken stage fail the whole pipeline.',
      'uniq схлопывает только соседние повторы, поэтому сначала отсортируйте, а затем посчитайте через uniq -c. cut делит по разделителю и игнорирует кавычки. jq -r печатает строку без кавычек, а set -o pipefail заставляет падать весь конвейер при сбое любого этапа.'
    ),
    solution: `# the pipefail flag has to be set before the first pipeline
set -o pipefail

# the most frequent paths in the log
awk '{ print $7 }' access.log | sort | uniq -c | sort -rn | head -5

# the fifth column of a comma separated file
cut -d, -f5 data.csv

# one URL out of a JSON answer
jq -r '.items[0].url' orders.json`,
    explanation: L(
      'The pipeline becomes a frequency report because sort puts the equal lines next to each other and uniq -c counts each run. Without pipefail the pipeline reports the status of head alone, so a failure in awk or sort would pass unnoticed.',
      'Конвейер превращается в отчёт по частотам, потому что sort ставит одинаковые строки рядом, а uniq -c считает каждую серию. Без pipefail конвейер сообщает только код head, и сбой в awk или sort прошёл бы незамеченным.'
    ),
  },
  {
    id: 'ch-cli-ch4-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch4',
    level: 'intermediate',
    title: L('Run a long job that survives the shell', 'Фоновая задача, переживающая оболочку'),
    brief: L(
      'Start a long running build in the background with its output in a log file, detach it so it keeps running after the terminal closes, and clean up its temporary directory when the script exits or fails. The cleanup must run exactly once and must not change the exit code.',
      'Запустите долгую сборку в фоне с выводом в лог-файл, отвяжите её так, чтобы она работала после закрытия терминала, и очищайте временный каталог при выходе или сбое скрипта. Очистка должна выполниться ровно один раз и не должна менять код возврата.'
    ),
    hint: L(
      'nohup ignores the hangup signal and setsid starts a new session with no controlling terminal. A trap on EXIT covers a normal exit, a failure and an explicit exit, so save the status with $? inside the handler and exit with it.',
      'nohup игнорирует сигнал завершения сессии, а setsid поднимает новую сессию без управляющего терминала. Ловушка на EXIT срабатывает при обычном выходе, при сбое и при явном exit, поэтому сохраните статус через $? внутри обработчика и выйдите с ним.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

workdir="$(mktemp -d)"

cleanup() {
  local code=$?          # the status before anything else runs
  rm -rf "$workdir" || true
  exit "$code"           # report the original result
}
trap cleanup EXIT

# detached from the terminal, output in a file
nohup ./build.sh > build.log 2>&1 < /dev/null &
build_pid=$!

# wait for that job, so the build has really finished
wait "$build_pid"
echo "build finished"`,
    explanation: L(
      'A background job that still owns the terminal keeps the streams attached, so the redirections detach it completely and setsid would go one step further. The trap on EXIT runs for a normal exit, a failure and an explicit exit, and the saved status keeps the original result intact.',
      'Фоновая задача, всё ещё владеющая терминалом, держит потоки привязанными, поэтому перенаправления отвязывают её полностью, а setsid пошёл бы ещё на шаг дальше. Ловушка на EXIT срабатывает при обычном выходе, при сбое и при явном exit, а сохранённый статус сохраняет исходный результат.'
    ),
  },
  {
    id: 'ch-cli-ch5-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch5',
    level: 'intermediate',
    title: L('Lock down a directory and link to a release', 'Закрыть каталог и сослаться на релиз'),
    brief: L(
      'Create a deployment directory that only its owner may enter, produce a file inside it that the group can read but nobody else can see, verify the resulting mode with stat, and publish the release as a symbolic link that points at the versioned directory.',
      'Создайте каталог развёртывания, в который может войти только его владелец, сделайте внутри файл, читаемый группой и недоступный остальным, проверьте получившийся режим через stat и опубликуйте релиз символической ссылкой на версионированный каталог.'
    ),
    hint: L(
      'The execute bit on a directory is the right to enter it, so 700 makes it private. chmod 640 gives the owner read and write and the group read, and a symlink stores a path that readlink -f resolves.',
      'Бит исполнения на каталоге — это право войти в него, поэтому 700 делает каталог приватным. chmod 640 даёт владельцу чтение и запись, группе чтение, а символическая ссылка хранит путь, который вычисляет readlink -f.'
    ),
    solution: `# a directory only the owner may enter
mkdir -p /srv/app
chmod 700 /srv/app

# owner reads and writes, group reads, others nothing
( umask 077
  touch /srv/app/secret.env
  chmod 640 /srv/app/secret.env )

# read the mode back
stat -c '%a %U:%G' /srv/app/secret.env   # 640 deploy:deploy

# publish the release as a link to the versioned directory
ln -sfn /srv/app/releases/v1.4.0 /srv/app/current
readlink -f /srv/app/current              # /srv/app/releases/v1.4.0`,
    explanation: L(
      'The nine permission bits are evaluated in the order owner, group, others, so the first matching class decides. The execute bit on a directory is the right to enter it and list it, and a symlink stores a path that is resolved on every use, which is why readlink -f shows the real target.',
      'Девять битов прав проверяются в порядке владелец, группа, остальные, и решает первая подошедшая категория. Бит исполнения на каталоге — это право войти в него и прочитать список, а символическая ссылка хранит путь, который вычисляется при каждом обращении, поэтому readlink -f показывает настоящую цель.'
    ),
  },
  {
    id: 'ch-cli-ch6-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch6',
    level: 'intermediate',
    title: L('Write a script that fails loudly', 'Написать скрипт, который громко падает'),
    brief: L(
      'Write a script that stops on the first failing command, refuses to run with an unset variable, fails when any stage of a pipeline fails, takes a list of file names with spaces as arguments and reports a readable error message when the required directory is missing.',
      'Напишите скрипт, который останавливается на первой упавшей команде, отказывается работать с незаданной переменной, падает при сбое любого этапа конвейера, принимает список имён файлов с пробелами аргументами и выводит понятное сообщение об ошибке, если нужного каталога нет.'
    ),
    hint: L(
      'set -euo pipefail covers the three failure modes, but errexit deliberately ignores commands inside a condition, so check those statuses yourself. Quote "$@" to pass the arguments on, and use ${1:?message} to demand the first one.',
      'set -euo pipefail закрывает три режима сбоя, но errexit намеренно игнорирует команды внутри условия, поэтому проверяйте такие статусы сами. Цитируйте "$@", чтобы передать аргументы дальше, и используйте ${1:?message}, чтобы потребовать первый из них.'
    ),
    solution: `#!/usr/bin/env bash
set -euo pipefail

target="\${1:?usage: report.sh <directory>}"

if [ ! -d "$target" ]; then
  echo "not a directory: $target" >&2
  exit 2
fi

count_lines() {
  local file="$1"
  [ -f "$file" ] || return 1
  wc -l < "$file"
}

# the first argument is the directory, the rest are the files
shift
for file in "$@"; do
  count_lines "$file" || echo "skipped: $file" >&2
done
echo "done"`,
    explanation: L(
      'The strict flags turn a silent failure into a loud one, but errexit never fires inside a condition or after ||, so the skipped file is handled explicitly. Quoting "$@" keeps the arguments one word each even when they contain spaces, and the parameter expansion aborts the script before any work starts.',
      'Строгие флаги превращают тихий сбой в громкий, но errexit не срабатывает внутри условия и после ||, поэтому пропущенный файл обрабатывается явно. Кавычки вокруг "$@" сохраняют каждый аргумент отдельным словом, даже если в нём есть пробелы, а разворачивание параметра прерывает скрипт до начала работы.'
    ),
  },
  {
    id: 'ch-cli-ch7-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch7',
    level: 'intermediate',
    title: L('Call an API and sync it to the server', 'Обратиться к API и синхронизировать'),
    brief: L(
      'Fetch a JSON document from an API with a bearer token, fail loudly on an HTTP error and print only the status code and the total time. Then copy the built site to a remote host with rsync, preview the plan with a dry run first and keep the trailing slash on the source.',
      'Заберите JSON-документ у API с bearer-токеном, громко падайте при HTTP-ошибке и выведите только код ответа и общее время. Затем скопируйте собранный сайт на удалённый хост через rsync, сначала посмотрев план пробным запуском и сохранив слеш в конце пути-источника.'
    ),
    hint: L(
      'curl -f turns an HTTP error into a non-zero exit, -w prints a template with the code and the timings, and rsync --dry-run shows the plan without touching the target. The trailing slash on the source decides whether the directory itself is copied.',
      'curl -f превращает HTTP-ошибку в ненулевой код возврата, -w печатает шаблон с кодом и таймингами, а rsync --dry-run показывает план, не трогая цель. Слеш в конце пути-источника решает, копируется ли сама директория.'
    ),
    solution: `# fetch and fail on an HTTP error
curl -fsS https://api.example.com/items \\
  -H "Authorization: Bearer $API_TOKEN" | jq -r '.items[].name'

# only the status code and the total time
curl -s -o /dev/null -w '%{http_code} %{time_total}\\n' \\
  https://api.example.com/health

# see the plan before anything is copied
rsync -av --delete --dry-run ./site/ deploy@prod:/var/www/

# copy only what changed, keeping the attributes
rsync -av --delete --exclude 'node_modules' ./site/ deploy@prod:/var/www/`,
    explanation: L(
      'Without -f a 404 body is delivered as a normal answer and the pipeline succeeds on broken data. rsync transfers only the differences and needs --dry-run before --delete, because that flag turns the copy into a mirror that removes data on the target.',
      'Без -f тело ответа 404 приходит как обычный ответ, и конвейер успешно отрабатывает на сломанных данных. rsync переносит только разницы и требует --dry-run перед --delete, потому что этот флаг превращает копирование в зеркало, удаляющее данные на цели.'
    ),
  },
  {
    id: 'ch-cli-ch8-1',
    moduleId: 'cli',
    topic: 'cli',
    chapterId: 'cli-ch8',
    level: 'advanced',
    title: L('Make one pipeline out of npm scripts', 'Собрать один пайплайн из npm-скриптов'),
    brief: L(
      'Describe the whole project as npm scripts: a type check that produces no output, a build that emits one file per module, a bundle, and one check script that runs the fast steps in order. The pipeline must call those same scripts, and the dependency install must never touch the lockfile.',
      'Опишите проект целиком в npm-скриптах: проверка типов без вывода, сборка с одним файлом на модуль, бандлинг и один скрипт check, который выполняет быстрые шаги по порядку. Пайплайн должен вызывать те же самые скрипты, а установка зависимостей не должна трогать lock-файл.'
    ),
    hint: L(
      'npm ci installs exactly what the lockfile records and fails when it disagrees with the manifest. A type checker produces no code, a transpiler rewrites the syntax and a bundler resolves the imports, so the order is check, then transpile, then bundle.',
      'npm ci ставит ровно то, что записано в lock-файле, и падает, если тот расходится с манифестом. Проверка типов не порождает код, транспайлер переписывает синтаксис, а бандлер разрешает импорты, поэтому порядок — проверка, потом транспляция, потом бандлинг.'
    ),
    solution: `# declare every task as one npm script
npm pkg set scripts.typecheck="tsc --noEmit -p tsconfig.app.json" \\
            scripts.transpile="tsc -p tsconfig.build.json" \\
            scripts.bundle="esbuild src/main.ts --bundle --minify --outfile=dist/app.js" \\
            scripts.check="npm run lint && npm run typecheck && npm run test" \\
            scripts.build="npm run typecheck && npm run transpile && npm run bundle"

# the pipeline calls the scripts, the scripts call the tools
npm ci
npm run check
npm run build

# the same chain on a laptop
npm ci && npm run check && npm run build`,
    explanation: L(
      'Every step of the pipeline is an npm script a developer can run on a laptop, and npm ci installs the resolved tree without updating the lockfile. The build script keeps the order of the tools honest: check the types, rewrite the syntax, then bundle the modules into one artefact.',
      'Каждый шаг пайплайна — это npm-скрипт, который разработчик запустит на ноутбуке, а npm ci ставит разрешённое дерево, не обновляя lock-файл. Скрипт сборки сохраняет честный порядок инструментов: проверить типы, переписать синтаксис, затем собрать модули в один артефакт.'
    ),
  },
];
