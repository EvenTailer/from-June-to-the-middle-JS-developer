import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh06: Chapter = {
  id: 'cli-ch6',
  title: L('Shell scripting', 'Скрипты командной строки'),
  summary: L(
    'How to write a script that behaves the same on a laptop and on a server: variables and quoting, the strict mode flags, functions and exit codes, traps for cleanup, arrays and parameter expansion, and safe line processing.',
    'Как написать скрипт, который ведёт себя одинаково на ноутбуке и на сервере: переменные и кавычки, строгий режим, функции и коды возврата, ловушки для очистки, массивы и раскрытие параметров, безопасная обработка строк.'
  ),
  sections: [
    {
      id: 'cli-ch6-s1',
      title: L('Variables, tests and quoting', 'Переменные, проверки и кавычки'),
      body: L(
        'A shell script is a file of commands read and executed by a shell, and the first line names that shell with a shebang such as #!/usr/bin/env bash. Variables are created by an assignment with no spaces around the equals sign, and the shell distinguishes three kinds: ordinary variables that live in the script, exported variables that also land in the environment of every child process, and read-only variables that refuse to change. A variable name is a word, and a name that contains a dash cannot be created at all.\n\nQuoting decides whether a value stays one word. The form "$name" is expanded and then protected from splitting on spaces and from globbing, while the bare form $name is expanded and then subjected to both. The difference is invisible when the value has no spaces and destructive when it has, which is why the bare form is only safe for constants you wrote yourself.\n\nTests come in two flavours. The square bracket form [ "$a" = "$b" ] is a command with arguments, and it needs careful quoting, because an empty value makes the test see too few arguments and it fails with a strange message. The double bracket form [[ "$a" = "$b" ]] is a keyword in bash, it understands the operators more naturally and it never word splits, so it is the form to prefer in any script that declares itself as bash.',
        'Shell-скрипт — это файл команд, который читает и выполняет оболочка, а первая строка называет эту оболочку через shebang вида #!/usr/bin/env bash. Переменные создаются присваиванием без пробелов вокруг знака равенства, и оболочка различает три вида: обычные переменные, живущие только в скрипте, экспортируемые переменные, которые попадают ещё и в окружение каждого дочернего процесса, и неизменяемые переменные, которые не меняются. Имя переменной — это слово, и имя с дефисом создать нельзя.\n\nКавычки решают, останется ли значение одним словом. Форма "$name" раскрывается и потом защищена от разбиения по пробелам и от разворачивания шаблонов, а голая форма $name раскрывается и подвергается и тому и другому. Разница незаметна, когда в значении нет пробелов, и разрушительна, когда они есть, поэтому голая форма безопасна только для констант, написанных вами.\n\nПроверки бывают двух видов. Форма в квадратных скобках [ "$a" = "$b" ] — это команда с аргументами, и ей нужны аккуратные кавычки: при пустом значении тест увидит недостаточно аргументов и упадёт с непонятным сообщением. Форма в двойных скобках [[ "$a" = "$b" ]] — ключевое слово bash, оно понимает операторы естественнее и никогда не разбивает слова, поэтому в любом скрипте, объявившем себя bash, предпочтительнее именно она.'
      ),
      bullets: [
        L('Assign without spaces around the equals sign.', 'Присваивайте без пробелов вокруг знака равенства.'),
        L('"$name" stays one word, $name splits on spaces and expands patterns.', '"$name" остаётся одним словом, $name разбивается по пробелам и разворачивает шаблоны.'),
        L('[[ ]] is a bash keyword, [ ] is a command with its own quoting rules.', '[[ ]] — ключевое слово bash, [ ] — команда со своими правилами кавычек.'),
        L('Quote the variables inside [ ] or the test sees the wrong number of arguments.', 'Кавычки нужны и внутри [ ], иначе тест увидит неверное число аргументов.'),
        L('export puts a variable into the environment of every child process.', 'export помещает переменную в окружение каждого дочернего процесса.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: $0 <target>" >&2
  exit 2
fi

target="$1"                      # the argument, checked above
greeting="\${GREETING:-world}"   # a default when the value is unset
readonly STAMP="$(date -u +%Y%m%d)"

for file in "$@"; do
  echo "checking $file"
done

echo "$greeting, checking $target, stamped $STAMP"`,
      table: {
        caption: L('Quoting forms and what they produce', 'Формы кавычек и что они дают'),
        headers: [L('Form', 'Форма'), L('Expands', 'Раскрывает'), L('Splits into words', 'Дробит на слова'), L('Expands patterns', 'Разворачивает шаблоны')],
        rows: [
          [L('"$var"', '"$var"'), L('yes', 'да'), L('no', 'нет'), L('no', 'нет')],
          [L('$var', '$var'), L('yes', 'да'), L('yes', 'да'), L('yes', 'да')],
          [L("'text'", "'текст'"), L('no', 'нет'), L('no', 'нет'), L('no', 'нет')],
          [L('"$@"', '"$@"'), L('yes', 'да'), L('one word per argument', 'по одному слову на аргумент'), L('no', 'нет')],
          [L('${var:-default}', '${var:-default}'), L('yes, with a fallback', 'да, с запасным значением'), L('no', 'нет'), L('no', 'нет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The unquoted variable that eats the list', 'Голая переменная, которая съедает список'),
          text: L(
            'A file name with a space turns into two words, and a name that contains a star turns into a list of files from the current directory. The command then does something with the wrong arguments and the error points at a path that never existed. Quote every expansion of a variable that holds data.',
            'Имя файла с пробелом распадается на два слова, а имя со звёздочкой превращается в список файлов текущего каталога. Команда потом делает что-то с неверными аргументами, и ошибка указывает на путь, которого никогда не было. Кавычки на каждое раскрытие переменной с данными.'
          ),
        },
        {
          tone: 'note',
          title: L('Only bash has the double brackets', 'Двойные скобки есть только у bash'),
          text: L(
            'The script is executed by the shell named in the shebang, not by the shell that happens to be running. If the shebang says /bin/sh, the portable form [ ] is the only option, and the features of bash will fail with a syntax error rather than a clear message.',
            'Скрипт выполняет оболочка, названная в shebang, а не та, что случайно запущена. Если в shebang указано /bin/sh, доступна только переносимая форма [ ], и возможности bash приведут к синтаксической ошибке, а не к внятному сообщению.'
          ),
        },
      ],
      takeaway: L(
        'Quote every expansion, prefer [[ ]] inside bash scripts, and give every variable a default value or a guard.',
        'Кавычки на каждое раскрытие, [[ ]] внутри bash-скриптов и значение по умолчанию либо проверка для каждой переменной.'
      ),
      seeAlso: [
        L('Section 1-2: quoting, escaping and expansion', 'Секция 1-2: кавычки, экранирование и разворачивание'),
        L('Section 1-4: the environment and variables', 'Секция 1-4: переменные окружения'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
      ],
    },
    {
      id: 'cli-ch6-s2',
      title: L('set -euo pipefail and safe scripts', 'set -euo pipefail и безопасные скрипты'),
      body: L(
        'Three options turn a silent script into a loud one. The option -e stops the script when a command fails, the option -u turns the use of an unset variable into an error, and the option -o pipefail makes a pipeline fail when any of its commands fail instead of only the last one. Together they close the three ways a shell script usually lies: a failed command nobody checked, a typo in a variable name that expands to nothing, and a broken step hidden in the middle of a pipeline.\n\nThe option -e is a promise with sharp edges. It does not fire for a command that is part of a condition, it does not fire for a command on the left of ||, and it does not fire for a command whose status is inverted by !. It also does not fire inside a function that is called from such a context, which means a helper can fail and the script keeps going unless the function checks its own status.\n\nThe options apply to the shell that sets them and to nothing else. A script that starts another script gets a fresh shell with the default options, so the strict block has to be repeated there or carried over with the exported variable SHELLOPTS, whose value lists the options that every child bash reads from the environment. Two more settings belong in the same place: IFS left alone so that splitting is predictable, and the option -x or the command set -o xtrace when you need to see the expanded commands in a failure report. None of this replaces reading the exit status of the commands that matter.',
        'Три опции превращают молчаливый скрипт в говорящий. Опция -e останавливает скрипт, когда команда падает, опция -u превращает использование неприсвоенной переменной в ошибку, а опция -o pipefail заставляет конвейер падать, если упала любая его часть, а не только последняя. Вместе они закрывают три способа, которыми shell-скрипт обычно врёт: упавшая команда, которую никто не проверил, опечатка в имени переменной, которая раскрывается в пустоту, и сломанный шаг, спрятанный в середине конвейера.\n\nОпция -e — обещание с острыми краями. Она не срабатывает для команды, входящей в условие, не срабатывает для команды слева от || и не срабатывает для команды, статус которой инвертирован знаком !. Она также не срабатывает внутри функции, вызванной из такого контекста, то есть помощник может упасть, а скрипт продолжит работу, если функция не проверит собственный статус.\n\nОпции действуют в той оболочке, где их задали, и больше нигде. Скрипт, запускающий другой скрипт, получает свежую оболочку с умолчаниями, поэтому строгий блок приходится повторять там или переносить через экспортированную переменную SHELLOPTS, значение которой перечисляет опции, читаемые любым дочерним bash из окружения. Туда же стоит положить IFS, оставленный как есть, чтобы разбиение было предсказуемым, и опцию -x или команду set -o xtrace, когда нужно увидеть раскрытые команды в отчёте об ошибке. Ничто из этого не заменяет проверку кодов возврата у команд, которые действительно важны.'
      ),
      bullets: [
        L('-e stops on a failing command, -u stops on an unset variable.', '-e останавливает на падающей команде, -u — на неприсвоенной переменной.'),
        L('pipefail makes a pipeline fail when any stage fails.', 'pipefail заставляет конвейер падать, если упала любая его часть.'),
        L('-e does not fire inside conditions, after || or under !.', '-e не срабатывает в условиях, после || и под !.'),
        L('The options belong to the current shell, export SHELLOPTS to carry them into the children.', 'Опции принадлежат текущей оболочке, а export SHELLOPTS переносит их в дочерние.'),
        L('set -x prints the expanded commands and is the first debugging step.', 'set -x печатает раскрытые команды и это первый шаг отладки.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'

# Any failing step now stops the script
curl -fsSL https://example.com/app.tgz -o /tmp/app.tgz
tar -xzf /tmp/app.tgz -C /srv/app

# An unset variable is an error, not an empty string
: "\${RELEASE_DIR:?release directory is not set}"

# pipefail catches a broken stage in the middle
tar -czf - ./data | gzip > data.tar.gz

# Turn the strict mode off for one command that may fail
grep -c "warn" app.log || true`,
      table: {
        caption: L('What each strict mode flag protects', 'От чего защищает каждая опция строгого режима'),
        headers: [L('Flag', 'Опция'), L('Protects against', 'Защищает от'), L('Does not protect', 'Не защищает')],
        rows: [
          [L('set -e', 'set -e'), L('a failing command nobody checks', 'падающей команды, которую никто не проверил'), L('failures inside conditions', 'сбоев внутри условий')],
          [L('set -u', 'set -u'), L('a misspelled variable name', 'опечатки в имени переменной'), L('a valid but empty value', 'корректного, но пустого значения')],
          [L('set -o pipefail', 'set -o pipefail'), L('a broken stage hidden in a pipeline', 'сломанного шага внутри конвейера'), L('a command that is meant to fail', 'команды, которая должна упасть')],
          [L('set -x', 'set -x'), L('nothing, it only reports', 'ничего, только показывает'), L('nothing', 'ничего')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('set -e inside a function called from a condition', 'set -e внутри функции, вызванной из условия'),
          text: L(
            'When a function is called as if deploy; then, the shell treats the whole call as a condition and errexit is suspended for everything inside it. The helper runs, its first command fails, and the script continues with half-done work. Check the status explicitly inside the function and return the failure.',
            'Когда функцию вызывают как if deploy; then, оболочка считает весь вызов условием и errexit приостанавливается для всего, что внутри. Помощник отработает, его первая команда упадёт, а скрипт продолжит с недоделанной работой. Проверяйте статус явно внутри функции и возвращайте ошибку.'
          ),
        },
        {
          tone: 'tip',
          title: L('Start every script with the strict block', 'Начинайте каждый скрипт со строгого блока'),
          text: L(
            'The block set -euo pipefail costs one line and covers the script it heads. Add export SHELLOPTS right after it when the script starts other bash scripts that have to be strict too, and set -o xtrace when the script fails and you need to see which command produced the error.',
            'Блок set -euo pipefail стоит одной строки и покрывает скрипт, который он возглавляет. Добавьте export SHELLOPTS сразу после него, когда скрипт запускает другие bash-скрипты, которым тоже нужен строгий режим, и set -o xtrace, когда скрипт падает и нужно увидеть, какая команда вызвала ошибку.'
          ),
        },
      ],
      takeaway: L(
        'set -euo pipefail turns silent failures into loud ones, but only if the script checks the statuses that errexit deliberately ignores.',
        'set -euo pipefail превращает тихие сбои в громкие, но только если скрипт проверяет статусы, которые errexit нарочно игнорирует.'
      ),
      seeAlso: [
        L('Section 3-6: pipes, exit statuses and pipefail', 'Секция 3-6: конвейеры, коды возврата и pipefail'),
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
        L('Section 6-3: functions, arguments and exit codes', 'Секция 6-3: функции, аргументы и коды возврата'),
      ],
    },
    {
      id: 'cli-ch6-s3',
      title: L('Functions, arguments and exit codes', 'Функции, аргументы и коды возврата'),
      body: L(
        'A shell function is a named block of commands stored in the shell itself. It takes arguments in the positional parameters $1, $2 and so on, $@ holds all of them as separate words, and shift drops the first one. The keyword local marks a variable as belonging to the function, which is what keeps a loop counter inside a helper from overwriting the variable of the same name in the caller.\n\nThe keyword return ends a function and sets its exit code, and the exit code of a function is what the caller sees. The keyword exit ends the whole script, which is right at the end of a script and wrong inside a function, and it is fatal in a sourced file, where it kills the shell that sourced it. A function that ends without an explicit return returns the status of its last command, so the last line of a function decides its result.\n\nArgument parsing is done with a case statement over the first argument, and getopts handles single letter options. Both patterns matter because a script that assumes a fixed order of arguments breaks the moment somebody passes the flags in a different order. The rule to remember: inside a function, pass the arguments on as "$@" and never as "$*", because the first form keeps the quoting of every argument and the second collapses them into one string.',
        'Функция оболочки — именованный блок команд, который хранится в самой оболочке. Аргументы она принимает через позиционные параметры $1, $2 и далее, $@ хранит их все как отдельные слова, а shift убирает первый. Ключевое слово local помечает переменную как принадлежащую функции, и благодаря этому счётчик цикла внутри помощника не затирает одноимённую переменную вызывающего кода.\n\nКлючевое слово return завершает функцию и задаёт её код возврата, и именно этот код видит вызывающий. Ключевое слово exit завершает весь скрипт: в самом конце скрипта это правильно, а внутри функции неверно, и в подключаемом файле оно смертельно, потому что убивает оболочку, которая этот файл подключила. Функция, завершившаяся без явного return, возвращает статус последней команды, поэтому последняя строка функции решает её результат.\n\nАргументы разбирают оператором case по первому аргументу, а короткие буквенные опции берёт getopts. Оба приёма важны, потому что скрипт, предполагающий фиксированный порядок аргументов, ломается, как только кто-то передаст флаги иначе. Правило, которое надо запомнить: внутри функции передавайте аргументы дальше как "$@" и никогда как "$*", потому что первая форма сохраняет кавычки каждого аргумента, а вторая сливает их в одну строку.'
      ),
      bullets: [
        L('return ends a function, exit ends the whole script.', 'return завершает функцию, exit — весь скрипт.'),
        L('local keeps a helper variable out of the scope of the caller.', 'local удерживает вспомогательную переменную вне области вызывающего кода.'),
        L('A function returns the status of its last command unless it returns explicitly.', 'Функция возвращает статус последней команды, если явно не вернула свой.'),
        L('"$@" passes the arguments on with their quoting, "$*" does not.', '"$@" передаёт аргументы с их кавычками, "$*" — нет.'),
        L('exit inside a sourced script kills the calling shell.', 'exit внутри подключаемого скрипта убивает вызывающую оболочку.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail

log() {
  local level="\${1:-info}"
  shift
  printf '%s: %s\\n' "$level" "$*" >&2
}

retry() {
  local attempts=3
  local attempt=1
  while (( attempt <= attempts )); do
    "$@" && return 0
    attempt=$(( attempt + 1 ))
  done
  return 1
}

retry curl -fsSL https://example.com/health
log info "health check passed"`,
      table: {
        caption: L('Positional parameters', 'Позиционные параметры'),
        headers: [L('Name', 'Имя'), L('Meaning', 'Значение'), L('How to write it', 'Как писать')],
        rows: [
          [L('$1, $2', '$1, $2'), L('the first and the second argument', 'первый и второй аргументы'), L('always "$1"', 'всегда "$1"')],
          [L('$@', '$@'), L('all arguments as separate words', 'все аргументы как отдельные слова'), L('always "$@"', 'всегда "$@"')],
          [L('$*', '$*'), L('all arguments as one word', 'все аргументы как одно слово'), L('avoid it', 'избегайте')],
          [L('$#', '$#'), L('the number of arguments', 'число аргументов'), L('no quotes needed', 'кавычки не нужны')],
          [L('$0', '$0'), L('the name the script was called with', 'имя, под которым вызвали скрипт'), L('no quotes needed', 'кавычки не нужны')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('exit in a sourced file', 'exit в подключаемом файле'),
          text: L(
            'A script that is meant to be included with source or . ends the shell that included it, so an interactive session disappears without a trace. Use return for the early exits of a sourced file and keep exit for the end of a script that runs on its own.',
            'Скрипт, который подключают через source или ., завершает оболочку, которая его подключила, и интерактивная сессия исчезает без следа. Для ранних выходов в подключаемом файле используйте return, а exit оставьте для конца самостоятельного скрипта.'
          ),
        },
        {
          tone: 'tip',
          title: L('Return early on the happy path', 'Выходите раньше на успешном пути'),
          text: L(
            'After the risky command succeeds, return 0 right away instead of nesting the rest of the function under a condition. The failure branch stays visible and the function reads from top to bottom.',
            'Как только рискованная команда отработала, сразу возвращайте 0, а не прячьте остаток функции в условие. Ветка с ошибкой остаётся на виду, а функция читается сверху вниз.'
          ),
        },
      ],
      takeaway: L(
        'Use return inside functions, exit only at the end of the script, and pass the arguments on as "$@".',
        'Внутри функций используйте return, exit — только в конце скрипта, а аргументы передавайте дальше как "$@".'
      ),
      seeAlso: [
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
        L('Section 6-4: traps and cleanup', 'Секция 6-4: ловушки и очистка'),
      ],
    },
    {
      id: 'cli-ch6-s4',
      title: L('traps and cleanup', 'Ловушки и очистка'),
      body: L(
        'A trap registers a command to run when a signal or an exit happens. The signal EXIT fires when the shell exits for any reason, including a failure or an explicit exit, which makes it the natural place for cleanup. The signals INT and TERM cover the interrupt and the termination requests that a supervisor sends, and the signal ERR fires when a command fails under the strict mode.\n\nThe trap on EXIT runs after the exit status has been decided, and the trap itself changes that status if it ends with a successful command. A cleanup that removes a temporary directory ends with the status zero, so a script that failed still reports success, and a pipeline in CI sees a green build for a broken deploy. The fix is one line: save the status at the start of the handler and exit with it at the end.\n\nCleanup code must also be safe to run twice. A handler that runs on TERM and then again on EXIT tries to remove the same directory twice, and rm on a missing path fails, which changes the status again. The pattern that survives is to make every cleanup step tolerant, to keep the resources in variables so that the handler can see them, and to reset the handler before doing the work when a second run would be harmful.',
        'Ловушка регистрирует команду, которая выполнится при сигнале или при выходе. Сигнал EXIT срабатывает при завершении оболочки по любой причине, включая ошибку и явный exit, поэтому это естественное место для очистки. Сигналы INT и TERM покрывают прерывание и запрос на завершение, который посылает супервизор, а сигнал ERR срабатывает, когда команда падает в строгом режиме.\n\nЛовушка на EXIT выполняется после того, как код возврата уже определён, и сама ловушка меняет этот код, если заканчивается успешной командой. Очистка, которая удаляет временный каталог, заканчивается статусом ноль, поэтому упавший скрипт всё равно сообщает об успехе, а конвейер в CI показывает зелёную сборку для сломанного развёртывания. Исправление занимает одну строку: сохраните статус в начале обработчика и выйдите с ним в конце.\n\nКод очистки должен быть безопасен при повторном запуске. Обработчик, который сработал по TERM, а затем по EXIT, попытается удалить один и тот же каталог дважды, а rm на отсутствующем пути падает, и статус снова меняется. Рабочая схема: сделать каждый шаг очистки tolerantным к ошибке, хранить ресурсы в переменных, чтобы обработчик их видел, и сбрасывать обработчик перед работой, когда повторный запуск во вред.'
      ),
      bullets: [
        L('trap on EXIT covers a normal exit, a failure and an explicit exit.', 'Ловушка на EXIT срабатывает и при нормальном выходе, и при ошибке, и при явном exit.'),
        L('INT and TERM are the signals a supervisor sends.', 'INT и TERM — сигналы, которые посылает супервизор.'),
        L('A trap on EXIT can overwrite the exit status of the script.', 'Ловушка на EXIT может переписать код возврата скрипта.'),
        L('Cleanup must be idempotent, it can run twice.', 'Очистка должна быть идемпотентной, она может выполниться дважды.'),
        L('The handler needs the values it cleans, so keep them in variables.', 'Обработчику нужны значения, которые он чистит, поэтому держите их в переменных.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail

workdir="$(mktemp -d)"
status=0

cleanup() {
  local code=$?                # remember the status before touching it
  rm -rf "$workdir" || true    # cleanup must not fail
  exit "$code"                 # report the original result
}
trap cleanup EXIT

curl -fsSL https://example.com/data.tgz -o "$workdir/data.tgz"
tar -xzf "$workdir/data.tgz" -C "$workdir"
echo "extracted into $workdir"`,
      table: {
        caption: L('Signals a script should handle', 'Сигналы, которые должен обрабатывать скрипт'),
        headers: [L('Signal', 'Сигнал'), L('Sent by', 'Кто посылает'), L('What the script should do', 'Что должен делать скрипт')],
        rows: [
          [L('EXIT', 'EXIT'), L('the shell itself', 'сама оболочка'), L('clean up and preserve the exit status', 'убрать за собой и сохранить код возврата')],
          [L('INT', 'INT'), L('Ctrl-C in a terminal', 'Ctrl-C в терминале'), L('stop and clean up', 'остановиться и убрать за собой')],
          [L('TERM', 'TERM'), L('kill and the init system', 'kill и система инициализации'), L('stop the work and exit', 'прекратить работу и выйти')],
          [L('HUP', 'HUP'), L('the terminal closing', 'закрытие терминала'), L('usually exit quietly', 'обычно тихо выйти')],
          [L('ERR', 'ERR'), L('a failing command under set -e', 'падающая команда при set -e'), L('log the failure and keep it', 'записать сбой и сохранить его')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The trap that hides the failure', 'Ловушка, которая прячет сбой'),
          text: L(
            'When the handler ends with a successful command, the script leaves with the status zero, the CI job goes green and the broken step is discovered by a human days later. Save the status first, exit with it at the end, and the pipeline reports what really happened.',
            'Если обработчик заканчивается успешной командой, скрипт выходит со статусом ноль, задача CI зеленеет, а сломанный шаг находит человек спустя несколько дней. Сохраните статус в начале, выйдите с ним в конце, и конвейер расскажет правду.'
          ),
        },
        {
          tone: 'note',
          title: L('The handler runs in the same shell', 'Обработчик выполняется в той же оболочке'),
          text: L(
            'The trap is not a separate process, so a bug in the handler breaks the exit path of the whole script. Keep the handler short, make every step tolerant of failure and let it do nothing but cleanup.',
            'Ловушка выполняется не в отдельном процессе, поэтому ошибка в обработчике ломает путь выхода всего скрипта. Держите обработчик коротким, сделайте каждый шаг tolerantным к сбоям и поручите ему только очистку.'
          ),
        },
      ],
      takeaway: L(
        'Trap EXIT for cleanup, capture the status before the handler runs and exit with it, and make every cleanup step idempotent.',
        'Ловушка EXIT для очистки, захват кода возврата до запуска обработчика и выход с ним, а каждый шаг очистки должен быть идемпотентным.'
      ),
      seeAlso: [
        L('Section 4-3: signals and graceful shutdown', 'Секция 4-3: сигналы и корректное завершение'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
        L('Section 6-3: functions, arguments and exit codes', 'Секция 6-3: функции, аргументы и коды возврата'),
      ],
    },
    {
      id: 'cli-ch6-s5',
      title: L('Arrays, globbing and parameter expansion', 'Массивы, подстановка шаблонов и раскрытие параметров'),
      body: L(
        'Bash arrays hold lists without splitting on spaces. The declaration declare -a names an array, the assignment names=(one two three) fills it, the reference ${items[@]} expands to every element as a separate word and ${#items[@]} gives the number of elements. Indexing starts at zero, and an index that does not exist expands to nothing under the strict mode, which is the strict mode doing its job.\n\nParameter expansion has a compact syntax for the operations that keep appearing in scripts. The form ${name:-default} yields a fallback when the variable is unset or empty, ${name:=default} stores the fallback in the variable itself, and ${name:?message} aborts with the message when the variable is missing. The operators # and %% remove a prefix and a suffix, and the operator /// replaces every occurrence of one string with another.\n\nGlobbing and parameter expansion are two different mechanisms that people mix up. The shell expands a pattern into names that exist on disk, while parameter expansion rewrites the text of a variable. A pattern that matches nothing stays as the pattern itself unless nullglob is set, and the result of an unquoted parameter expansion is globbed again, so a variable that holds a pattern hands the shell a fresh set of names unless you quote it.',
        'Массивы bash хранят списки, не разбивая их по пробелам. Объявление declare -a создаёт массив, присваивание names=(one two three) наполняет его, обращение ${items[@]} раскрывается в отдельное слово на каждый элемент, а ${#items[@]} даёт число элементов. Индексация начинается с нуля, и несуществующий индекс под строгим режимом раскрывается в пустоту, а это как раз работа строгого режима.\n\nУ раскрытия параметров есть компактный синтаксис для операций, которые постоянно встречаются в скриптах. Форма ${name:-default} даёт запасное значение, когда переменная не присвоена или пуста, ${name:=default} записывает запасное значение в саму переменную, а ${name:?message} прерывает скрипт с сообщением, если переменной нет. Операторы # и %% убирают префикс и суффикс, а оператор /// заменяет все вхождения одной строки на другую.\n\nПодстановка шаблонов и раскрытие параметров — два разных механизма, которые часто путают. Оболочка разворачивает шаблон в имена существующих на диске файлов, а раскрытие параметров переписывает текст переменной. Шаблон, которому ничего не соответствует, остаётся шаблоном, если не включён nullglob, а результат подстановки параметра без кавычек разворачивается шаблонами заново, поэтому переменная с шаблоном отдаёт оболочке свежий набор имён, если её не взять в кавычки.'
      ),
      bullets: [
        L('declare -a creates an array, ${items[@]} expands it into separate words.', 'declare -a создаёт массив, ${items[@]} раскрывает его в отдельные слова.'),
        L('${var:-default} falls back, ${var:=default} also assigns.', '${var:-default} даёт запасное значение, ${var:=default} ещё и присваивает.'),
        L('${var:?message} aborts the script with a message.', '${var:?сообщение} прерывает скрипт с сообщением.'),
        L('${var#prefix} and ${var%%suffix} trim the value.', '${var#префикс} и ${var%%суффикс} обрезают значение.'),
        L('A glob that matches nothing stays literal unless nullglob is on.', 'Шаблон, которому ничего не соответствует, остаётся буквальным, если не включён nullglob.'),
        L('The result of an unquoted parameter expansion is globbed again.', 'Результат раскрытия параметра без кавычек разворачивается шаблонами заново.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail

files=("config.yml" "notes file.txt" "data.csv")

printf '%s\\n' "\${files[@]}"          # one line per element, spaces intact
echo "count: \${#files[@]}"

# Parameter expansion
name="\${USER_NAME:-anonymous}"
full="/var/log/app/service.log"
dir="\${full%/*}"                # strip the last segment
base="\${full##*/}"              # keep only the last segment
ext="\${full##*.}"               # keep only the extension

# A glob that matches nothing
shopt -s nullglob
matches=(backup/*.tar.gz)
echo "\${#matches[@]} matches"

# Expand a list safely
printf 'arg: %s\\n' "\${files[@]}"`,
      table: {
        caption: L('Parameter expansion forms', 'Формы раскрытия параметров'),
        headers: [L('Form', 'Форма'), L('Meaning', 'Значение')],
        rows: [
          [L('${v}', '${v}'), L('the value of v', 'значение v')],
          [L('${v:-x}', '${v:-x}'), L('the value, or x when unset or empty', 'значение или x, если не присвоено или пусто')],
          [L('${v:=x}', '${v:=x}'), L('the value, or x assigned to v', 'значение или x, присвоенное в v')],
          [L('${v:?text}', '${v:?text}'), L('the value, or abort with text', 'значение или прерывание с текстом')],
          [L('${v#pre}', '${v#pre}'), L('the value without the prefix pre', 'значение без префикса pre')],
          [L('${v//a/b}', '${v//a/b}'), L('the value with every a replaced by b', 'значение, где каждое a заменено на b')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The empty array under set -u', 'Пустой массив при set -u'),
          text: L(
            'Expanding an empty array under the strict mode has bitten a lot of scripts, because the shell treats the missing elements as an unbound variable and aborts. Check the count before expanding, or use the form that tolerates an empty array.',
            'Раскрытие пустого массива в строгом режиме сбило немало скриптов: оболочка считает отсутствующие элементы неприсвоенной переменной и прерывает выполнение. Проверяйте количество элементов перед раскрытием или используйте форму, терпимую к пустому массиву.'
          ),
        },
        {
          tone: 'tip',
          title: L('Collect a glob into an array', 'Соберите шаблон в массив'),
          text: L(
            'With nullglob enabled, the assignment files=(*.log) produces an empty array instead of one literal word, so the count is trustworthy and the loop over the array runs zero times when nothing matches.',
            'С включённым nullglob присваивание files=(*.log) даёт пустой массив, а не одно буквальное слово, поэтому счётчику можно верить, а цикл по массиву не выполнится ни разу, если совпадений нет.'
          ),
        },
      ],
      takeaway: L(
        'Use arrays for lists that contain spaces, and parameter expansion instead of sed for defaulting, trimming and replacing.',
        'Используйте массивы для списков с пробелами, а раскрытие параметров вместо sed — для значений по умолчанию, обрезки и замены.'
      ),
      seeAlso: [
        L('Section 2-1: globbing and shell expansion', 'Секция 2-1: подстановка шаблонов и разворачивание оболочки'),
        L('Section 1-2: quoting, escaping and expansion', 'Секция 1-2: кавычки, экранирование и разворачивание'),
        L('Section 6-1: variables, tests and quoting', 'Секция 6-1: переменные, проверки и кавычки'),
      ],
    },
    {
      id: 'cli-ch6-s6',
      title: L('Reading files and processing lines', 'Чтение файлов и обработка строк'),
      body: L(
        'The safe way to read a file line by line is the read loop: while IFS= read -r line; do ... done < file. The assignment IFS= disables the splitting of the line into fields, and the option -r keeps the backslashes in the line instead of treating them as escape characters. Without them a line ending in a backslash loses it and a line with two spaces in a row collapses into one.\n\nThe redirection belongs on the loop and not on a pipe. The command cat file | while read does run the loop in a subshell, so every variable the loop assigns disappears when the loop ends, and the classic symptom is an empty result after a loop that clearly did its work. With the redirect on the loop the body runs in the current shell and the variables survive.\n\nThe read command returns a non-zero status at the end of the file, which is normal and not an error, and the loop ends because of that status rather than because of an explicit break. A file whose last line has no trailing newline is still delivered, but the status of the last read is non-zero, so a strict script may treat the file as failed. For records separated by null bytes, read -d "" reads until the null character instead of the newline.',
        'Безопасный способ читать файл построчно — цикл чтения: while IFS= read -r line; do ... done < file. Присваивание IFS= отключает разбиение строки на поля, а опция -r сохраняет обратные слэши в строке, не считая их escape-последовательностями. Без них строка, заканчивающаяся обратным слэшем, теряет его, а две пробела подряд схлопываются в один.\n\nПеренаправление должно быть на цикле, а не на конвейере. Команда cat file | while read действительно выполняет цикл в подпроцессе, поэтому все переменные, которые цикл присваивает, исчезают вместе с ним, а типичный симптом — пустой результат после цикла, который явно отработал. С перенаправлением на цикле тело выполняется в текущей оболочке, и переменные сохраняются.\n\nКоманда read возвращает ненулевой статус в конце файла, и это нормально, а не ошибка: цикл заканчивается именно из-за этого статуса, а не из-за явного break. Файл, у которого последняя строка не заканчивается переводом строки, всё равно читается, но статус последнего чтения ненулевой, поэтому строгий скрипт может принять файл за сбойный. Для записей, разделённых нулевым байтом, read -d "" читает до нулевого символа вместо перевода строки.'
      ),
      bullets: [
        L('while IFS= read -r line reads a file without touching its spaces or backslashes.', 'while IFS= read -r line читает файл, не трогая пробелы и обратные слэши.'),
        L('Redirect the file into the loop, never pipe into it, or the loop runs in a subshell.', 'Перенаправляйте файл в цикл, а не подставляйте в конвейер, иначе цикл идёт в подпроцессе.'),
        L('The final read returns a non-zero status, and that is how the loop ends.', 'Последнее чтение возвращает ненулевой статус, так цикл и заканчивается.'),
        L('read -d "" reads records separated by null bytes.', 'read -d "" читает записи, разделённые нулевым байтом.'),
        L('awk is the better tool when the line has fields.', 'awk лучше подходит, когда в строке есть поля.'),
      ],
      code: `#!/usr/bin/env bash
set -euo pipefail

# Read a file, keeping spaces and backslashes intact
while IFS= read -r line; do
  printf 'line: %s\\n' "$line"
done < "app.log"

# The same loop over the output of a command, without a subshell
while IFS= read -r path; do
  printf 'found: %s\\n' "$path"
done < <(find . -type f -name '*.log')

# Fields, counting and splitting, belong to awk
awk -F, '{ total += $2 } END { print total }' data.csv`,
      table: {
        caption: L('Ways to process a file', 'Способы обработки файла'),
        headers: [L('Method', 'Способ'), L('Keeps spaces', 'Сохраняет пробелы'), L('Survives null bytes', 'Переживает нулевые байты'), L('Good for', 'Подходит для')],
        rows: [
          [L('while read -r', 'while read -r'), L('yes', 'да'), L('no', 'нет'), L('plain text lines', 'обычных текстовых строк')],
          [L('while read -r -d ""', 'while read -r -d ""'), L('yes', 'да'), L('yes', 'да'), L('null separated records', 'записей с нулевым разделителем')],
          [L('awk', 'awk'), L('yes', 'да'), L('yes', 'да'), L('fields and totals', 'полей и сумм')],
          [L('for f in $(cat file)', 'for f in $(cat file)'), L('no', 'нет'), L('no', 'нет'), L('never', 'никогда')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The pipeline that loses your variables', 'Конвейер, который теряет переменные'),
          text: L(
            'The loop body of a pipeline runs in a subshell, so the counter that was carefully incremented stays at zero and the collected list stays empty. Redirect the file into the loop, or use a process substitution, which keeps the loop in the current shell.',
            'Тело цикла в конвейере выполняется в подпроцессе, поэтому аккуратно увеличенный счётчик остаётся нулём, а собранный список пустым. Перенаправляйте файл в цикл или используйте подстановку процесса, которая оставляет цикл в текущей оболочке.'
          ),
        },
        {
          tone: 'note',
          title: L('The last line without a newline', 'Последняя строка без перевода строки'),
          text: L(
            'Most tools write a trailing newline and most scripts assume it. When a file was written by something that does not, the final line is still read but the loop reports a failure at the end. Treat the status of the final read as the end of the file, not as an error.',
            'Большинство инструментов пишет завершающий перевод строки, и большинство скриптов на это рассчитывают. Если файл написан чем-то, кто этого не делает, последняя строка всё равно прочитается, но цикл в конце сообщит об ошибке. Считайте статус последнего чтения концом файла, а не сбоем.'
          ),
        },
      ],
      takeaway: L(
        'Read lines with while IFS= read -r and a redirect on the loop, and reach for awk when the line has fields.',
        'Читайте строки через while IFS= read -r с перенаправлением на цикл и беритесь за awk, когда в строке есть поля.'
      ),
      seeAlso: [
        L('Section 2-5: piping search results into other tools', 'Секция 2-5: передача результатов поиска в другие инструменты'),
        L('Section 3-3: sed and awk', 'Секция 3-3: sed и awk'),
        L('Section 6-5: arrays, globbing and parameter expansion', 'Секция 6-5: массивы, подстановка шаблонов и раскрытие параметров'),
      ],
    },
  ],
};
