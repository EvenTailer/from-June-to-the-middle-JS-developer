import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh01: Chapter = {
  id: 'cli-ch1',
  title: L('The shell and the command line', 'Оболочка и командная строка'),
  summary: L(
    'How a shell turns a line of text into a running process: parsing, quoting, expansion, paths, the environment and the exit codes that let programs cooperate.',
    'Как оболочка превращает строку текста в работающий процесс: разбор, кавычки, подстановки, пути, переменные окружения и коды возврата, благодаря которым программы работают вместе.'
  ),
  sections: [
    {
      id: 'cli-ch1-s1',
      title: L('What a shell is and how it parses a command', 'Что такое оболочка и как она разбирает команду'),
      body: L(
        'A shell is a program, not a window and not a terminal. Bash, zsh and fish are programs that read a line of text, split it into words and ask the operating system to start other programs with those words as arguments. The terminal emulator you type into is only the device that connects a keyboard and a screen to that program, which is why the same command runs unchanged over SSH, inside a script or inside a container.\n\nTurning a line into a process takes a fixed sequence. The shell lexes characters into tokens, tokenises them into words and operators, and expands each word: quotes come off, variables and command substitutions are substituted, patterns are matched against file names. Only then does it execute, either a builtin inside the shell process or a separate process for an external command. Because expansion happens first, the shell decides how many arguments a program receives, and the program parses those arguments with its own rules.\n\nThat split explains two behaviours that look contradictory. The command ls -l /tmp delivers exactly two arguments, and the shell has no idea that -l is a flag: the meaning of an argument belongs to the program that receives it. The command grep "a b" delivers one argument with a space inside, because the quotes stopped the shell from splitting it. Quoting and splitting belong to the shell, flag parsing belongs to the program.\n\nBuiltins run inside the shell process, so cd can change the state of the shell you are sitting in and export can change the environment of every later child. External commands run as separate processes with their own identifiers and their own exit codes. The command type -a node tells you which of the two you are about to run and where the file lives, and it is the first thing to check when the same command behaves differently in two shells.',
        'Оболочка — это программа, а не окно и не терминал. Bash, zsh и fish читают строку текста, делят её на слова и просят операционную систему запустить другие программы с этими словами в качестве аргументов. Эмулятор терминала, в который вы печатаете, — лишь устройство, соединяющее клавиатуру и экран с этой программой, поэтому одна и та же команда одинаково работает по SSH, в скрипте и внутри контейнера.\n\nПревращение строки в процесс идёт по фиксированной схеме. Оболочка разбирает символы на лексемы, лексемы — на слова и операторы, а затем разворачивает каждое слово: снимаются кавычки, подставляются переменные и подстановки команд, шаблоны сопоставляются с именами файлов. И только потом выполняется команда — либо встроенная внутри процесса оболочки, либо отдельный процесс для внешней программы. Поскольку разворачивание происходит первым, число аргументов определяет оболочка, а разбирает их уже сама программа.\n\nЭто разделение объясняет два поведения, которые кажутся противоречивыми. Команда ls -l /tmp передаёт ровно два аргумента, и оболочка не знает, что -l это флаг: смысл аргумента принадлежит программе, которая его получает. А команда grep "a b" передаёт один аргумент с пробелом внутри, потому что кавычки не дали оболочке его разбить. Кавычки и разбиение — сторона оболочки, разбор флагов — сторона программы.\n\nВстроенные команды выполняются внутри процесса оболочки, поэтому cd может изменить состояние вашей оболочки, а export — окружение всех следующих дочерних процессов. Внешние команды запускаются отдельными процессами со своими идентификаторами и своими кодами возврата. Команда type -a node показывает, что именно будет выполнено и где лежит файл, и это первое, что стоит проверить, когда одна и та же команда ведёт себя по-разному в двух оболочках.'
      ),
      bullets: [
        L('The shell splits a line into words; the program decides what each word means.', 'Оболочка делит строку на слова; смысл каждого слова определяет программа.'),
        L('Bash, zsh and fish are programs, a terminal is only the device they talk to.', 'Bash, zsh и fish — программы, а терминал лишь устройство, с которым они работают.'),
        L('Builtins run inside the shell process, external commands in a child process.', 'Встроенные команды работают внутри процесса оболочки, внешние — в дочернем.'),
        L('The order is lex, tokenise, expand, execute.', 'Порядок: разбор символов, разбор на слова, разворачивание, выполнение.'),
        L('type -a name shows whether a name is a builtin, a function or a file on PATH.', 'type -a имя показывает, встроенная это команда, функция или файл в PATH.'),
      ],
      code: `# Trace what the shell does before running anything
set -x
ls -l /tmp          # the shell passes two arguments: -l and /tmp
echo "a b"          # one argument with a space inside
echo a b            # two separate arguments

# Builtin, function or program?
type -a cd          # cd is a shell builtin
type -a node        # node is a file on PATH
command -v ls       # prints the path that would be executed`,
      table: {
        caption: L('Which side owns which decision', 'Что принадлежит оболочке, а что программе'),
        headers: [L('Decision', 'Решение'), L('Owner', 'Владелец'), L('Example', 'Пример')],
        rows: [
          [L('Splitting into words', 'Разбиение на слова'), L('shell', 'оболочка'), L('unquoted whitespace separates arguments', 'пробел без кавычек разделяет аргументы')],
          [L('Quoting', 'Кавычки'), L('shell', 'оболочка'), L('"a b" stays one argument', '"a b" остаётся одним аргументом')],
          [L('Expansion', 'Разворачивание'), L('shell', 'оболочка'), L('$HOME, *.ts, $(cmd)', '$HOME, *.ts, $(cmd)')],
          [L('Flag parsing', 'Разбор флагов'), L('program', 'программа'), L('ls treats -l as an option', 'ls считает -l опцией')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('type -a, not which', 'type -a, а не which'),
          text: L(
            'which is a script found on PATH, not a shell builtin, so its output depends on what happens to be installed. Use type -a or command -v, which are part of the shell and always answer about the shell you are actually using.',
            'which — это скрипт, найденный в PATH, а не встроенная команда оболочки, поэтому его вывод зависит от того, что случайно установлено. Используйте type -a или command -v: они часть оболочки и всегда отвечают про ту оболочку, в которой вы работаете.'
          ),
        },
      ],
      takeaway: L(
        'The shell decides where one argument ends and the next begins; the program decides what each argument means.',
        'Оболочка решает, где кончается один аргумент и начинается следующий; смысл аргумента определяет программа.'
      ),
      seeAlso: [
        L('Section 1-2: quoting, escaping and expansion', 'Секция 1-2: кавычки, экранирование и разворачивание'),
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
      ],
    },
    {
      id: 'cli-ch1-s2',
      title: L('Quoting, escaping and expansion', 'Кавычки, экранирование и разворачивание'),
      body: L(
        'Quoting is the only way to tell the shell that a piece of text is one single argument. Single quotes are completely literal: nothing inside them is expanded, not a dollar sign and not a backslash. Double quotes are weaker, because variables, command substitutions and backslashes are still processed inside them, but the whitespace is protected and the text is not split into several words. Text with no quotes at all is exposed to both word splitting and globbing, and that is where most shell bugs are born.\n\nThe escape character is the backslash. It removes the special meaning of the next character, so a\\ b is one word and a dollar sign stops being a dollar sign. A backslash at the end of a line continues the command onto the next line, but inside single quotes it is an ordinary character with no special meaning at all.\n\nExpansion is the set of transformations applied to a word before it becomes an argument, and the order is fixed: brace expansion first, then tilde expansion, then parameter and command substitution, then word splitting, and globbing last. Brace expansion turns one word into several, {a,b} becoming a and b. Tilde expansion turns the home shortcut into a home directory. Parameter expansion reads a variable, command substitution runs a command and inserts its output, and globbing replaces a pattern with the names of matching files.\n\nThe practical rule is to quote everything that is not meant to be a pattern or an expansion. Inside double quotes a variable stays one word, and a quoted command substitution stays one word even when the output of the command contains spaces. The single-quoted pattern *.ts stays a literal string for a program such as find, which does its own matching and expects the pattern to arrive untouched.',
        'Кавычки — единственный способ сказать оболочке, что кусок текста это один аргумент. Одинарные кавычки полностью буквальны: внутри них ничего не разворачивается, ни знак доллара, ни обратный слэш. Двойные кавычки слабее, потому что переменные, подстановки команд и обратные слэши внутри них всё ещё обрабатываются, но пробелы защищены и текст не разбивается на несколько слов. Текст без кавычек подвержен и разбиению на слова, и подстановке шаблонов — именно здесь рождается большинство багов в shell.\n\nЭкранирующий символ — обратный слэш. Он снимает специальное значение следующего символа, поэтому a\\ b это одно слово, а знак доллара перестаёт быть знаком доллара. Обратный слэш в конце строки продолжает команду на следующей строке, но внутри одинарных кавычек это обычный символ без какого-либо специального значения.\n\nРазворачивание — это набор преобразований, которые применяются к слову до того, как оно станет аргументом, и порядок фиксирован: сперва разворачивание фигурных скобок, потом домашний каталог, потом подстановка параметров и команд, потом разбиение на слова и в конце подстановка шаблонов. Фигурные скобки превращают одно слово в несколько: {a,b} становится a и b. Домашний каталог разворачивается из сокращения. Подстановка параметров читает переменную, подстановка команды запускает команду и вставляет её вывод, а подстановка шаблона заменяет шаблон именами подходящих файлов.\n\nПрактическое правило: берите в кавычки всё, что не должно быть шаблоном или разворачиванием. В двойных кавычках переменная остаётся одним словом, а кавычки вокруг подстановки команды не дают разбить её вывод по пробелам. Шаблон *.ts в одинарных кавычках остаётся буквальной строкой для программы вроде find, которая сопоставляет шаблоны сама и ждёт их в нетронутом виде.'
      ),
      bullets: [
        L('Single quotes are literal, double quotes still expand variables and command substitutions.', 'Одинарные кавычки буквальны, в двойных всё ещё разворачиваются переменные и подстановки команд.'),
        L('Unquoted text is subject to word splitting and to globbing.', 'Текст без кавычек подвержен разбиению на слова и подстановке шаблонов.'),
        L('A backslash escapes one character and continues a command at the end of a line.', 'Обратный слэш экранирует один символ и продолжает команду в конце строки.'),
        L('The expansion order is brace, tilde, parameter and command substitution, splitting, globbing.', 'Порядок разворачивания: фигурные скобки, домашний каталог, параметры и команды, разбиение, шаблоны.'),
        L('A quoted command substitution stays one word even when its output contains spaces.', 'Кавычки вокруг подстановки команды сохраняют одно слово даже при пробелах в выводе.'),
      ],
      code: `# One argument or two?
echo "hello world"      # one argument
echo hello world        # two arguments

# What the quotes protect
echo '$HOME'             # literal $HOME
echo "$HOME"             # expanded to the home directory
echo "a  b"              # two spaces kept, still one argument

# Escaping
echo a\\ b                # one argument: a b
echo \\$HOME              # literal $HOME

# Expansion happens before the program starts
echo "$(printf 'a\\nb')"   # one argument containing a newline`,
      table: {
        caption: L('Quoting forms and what they allow', 'Формы кавычек и что они допускают'),
        headers: [L('Form', 'Форма'), L('Expansion inside', 'Что разворачивается'), L('Use it for', 'Когда применять')],
        rows: [
          [L('single quotes', 'одинарные кавычки'), L('nothing at all', 'ничего'), L('literal text with $ and *', 'буквальный текст с $ и *')],
          [L('double quotes', 'двойные кавычки'), L('variables and command substitution', 'переменные и подстановки команд'), L('almost every string', 'почти любая строка')],
          [L('backslash', 'обратный слэш'), L('escapes the next character', 'экранирует следующий символ'), L('one special character', 'один спецсимвол')],
          [L('no quotes', 'без кавычек'), L('everything, including globs', 'всё, включая шаблоны'), L('patterns and plain words', 'шаблоны и простые слова')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A name with a space in it', 'Имя файла с пробелом'),
          text: L(
            'A variable holding a file name must always be quoted when it is used. The command rm $file removes every argument the value expands to, while rm "$file" removes exactly the one file, and the difference is invisible until a directory contains a file called My Report.txt.',
            'Переменную с именем файла всегда нужно брать в кавычки при использовании. Команда rm $file удаляет все аргументы, во которые значение развернулось, а rm "$file" удаляет ровно один файл, и разница незаметна, пока в каталоге не появится файл My Report.txt.'
          ),
        },
      ],
      takeaway: L(
        'Quote every expansion; unquoted text is split and globbed before the program ever sees it.',
        'Берите в кавычки каждое разворачивание: текст без кавычек делится на слова и превращается в шаблоны ещё до запуска программы.'
      ),
      seeAlso: [
        L('Section 1-1: what a shell is and how it parses a command', 'Секция 1-1: что такое оболочка и как она разбирает команду'),
        L('Section 2-1: globbing and shell expansion', 'Секция 2-1: подстановка шаблонов и разворачивание оболочки'),
      ],
    },
    {
      id: 'cli-ch1-s3',
      title: L('Paths, the working directory and symlinks', 'Пути, рабочий каталог и символические ссылки'),
      body: L(
        'Every process has a working directory, and every relative path is resolved against it. pwd prints it, cd changes it and cd - returns to the previous one. A path that starts with a slash is absolute and means the same thing from anywhere; anything else is relative and only makes sense next to a working directory. That single fact explains why a script that works when you run it by hand fails in a pipeline or in continuous integration: the process starts somewhere else.\n\nThe shell also decides where to look for the command itself. It walks the directories listed in PATH and runs the first match, and the current directory is deliberately not on that list, so a program sitting in the current directory has to be called as ./program. Builtins are the exception: they live inside the shell and are always found.\n\nA symbolic link is a separate directory entry that stores the path of another entry. The kernel resolves it while it walks the tree, so a path may end at a file that lives somewhere completely different. Because the link keeps the logical path, pwd -L prints the path you typed while pwd -P prints the physical one, and realpath or readlink -f gives the physical target of any path.\n\nA hard link is a different thing: it is another name for the same inode, with no path stored inside it. Removing one name leaves the other intact, and the link survives even after the original name is deleted. A symbolic link can dangle, that is, point at something that does not exist, and it can point across file systems, which a hard link cannot.',
        'У каждого процесса есть рабочий каталог, и любой относительный путь разрешается относительно него. pwd печатает его, cd меняет, а cd - возвращает на предыдущий. Путь, начинающийся со слэша, абсолютный и означает одно и то же откуда угодно; всё остальное относительное и имеет смысл только рядом с рабочим каталогом. Именно этим объясняется, почему скрипт, работающий при ручном запуске, падает в конвейере или в непрерывной интеграции: процесс стартует в другом месте.\n\nОболочка заодно решает, где искать саму команду. Она обходит каталоги из PATH и выполняет первое совпадение, а текущего каталога в этом списке намеренно нет, поэтому программу из текущего каталога приходится звать как ./program. Исключение — встроенные команды: они живут внутри оболочки и находятся всегда.\n\nСимволическая ссылка — это отдельная запись каталога, в которой хранится путь к другой записи. Ядро разрешает её по ходу обхода дерева, поэтому путь может привести к файлу, лежащему совсем в другом месте. Поскольку ссылка сохраняет логический путь, pwd -L печатает введённый вами путь, а pwd -P физический, а realpath или readlink -f даёт физическую цель любого пути.\n\nЖёсткая ссылка — это другое: ещё одно имя для того же inode, без пути внутри. Удаление одного имени не трогает другое, и ссылка переживает удаление исходного имени. Символическая ссылка может быть битой, то есть указывать на несуществующее, и может указывать через границу файловых систем, что жёсткой ссылке недоступно.'
      ),
      bullets: [
        L('Relative paths depend on the working directory, absolute paths do not.', 'Относительные пути зависят от рабочего каталога, абсолютные — нет.'),
        L('The current directory is not on PATH, so a local program needs the ./ prefix.', 'Текущего каталога нет в PATH, поэтому локальной программе нужен префикс ./.'),
        L('pwd -L is the logical path, pwd -P is the physical one.', 'pwd -L — логический путь, pwd -P — физический.'),
        L('A symbolic link stores a path, a hard link is a second name for the same inode.', 'Символическая ссылка хранит путь, жёсткая — второе имя для того же inode.'),
        L('A dangling symbolic link is legal and fails only when it is opened.', 'Битая символическая ссылка законна и падает только при обращении.'),
      ],
      code: `pwd
cd /var/log && cd -        # jump back to the previous directory
cd ~                       # the home directory
cd ../project              # one level up, relative to the current directory

# Logical versus physical path
cd /tmp
ln -s /var/log current     # create a symbolic link
cd current && pwd -L       # logical path: /tmp/current
pwd -P                     # physical path: /var/log
realpath ./current         # /var/log`,
      table: {
        caption: L('Kinds of path', 'Виды путей'),
        headers: [L('Kind', 'Вид'), L('Meaning', 'Значение'), L('Resolves to', 'Приводит к')],
        rows: [
          [L('/etc/hosts', '/etc/hosts'), L('absolute', 'абсолютный'), L('the same file from anywhere', 'тому же файлу откуда угодно')],
          [L('./build/app.js', './build/app.js'), L('relative', 'относительный'), L('a path under the working directory', 'пути внутри рабочего каталога')],
          [L('~/projects', '~/projects'), L('home shortcut', 'сокращение домашнего'), L('the home directory of the user', 'домашнему каталогу пользователя')],
          [L('symbolic link', 'символическая ссылка'), L('a pointer to another path', 'указатель на другой путь'), L('the target entry, resolved at run time', 'цели, разрешённой в момент запуска')],
          [L('hard link', 'жёсткая ссылка'), L('a second name for an inode', 'второе имя для inode'), L('the very same file data', 'тем же данным файла')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The script that only works in one place', 'Скрипт, который работает только в одном месте'),
          text: L(
            'A script that opens files by relative path depends on the directory it was started from. Change into the directory of the script itself, or resolve every path against the location of the script, so the behaviour does not depend on the caller.',
            'Скрипт, который открывает файлы по относительному пути, зависит от каталога, из которого его запустили. Переходите в каталог самого скрипта или вычисляйте пути относительно его расположения, чтобы поведение не зависело от вызывающей стороны.'
          ),
        },
      ],
      takeaway: L(
        'A relative path only means something together with a working directory, and a symbolic link resolves to a different place than it prints.',
        'Относительный путь имеет смысл только вместе с рабочим каталогом, а символическая ссылка ведёт в другое место, чем показывает.'
      ),
      seeAlso: [
        L('Section 1-4: the environment and variables', 'Секция 1-4: переменные окружения'),
        L('Chapter 6: shell scripting', 'Глава 6: скрипты командной строки'),
      ],
    },
    {
      id: 'cli-ch1-s4',
      title: L('The environment and variables', 'Переменные окружения'),
      body: L(
        'A variable in a shell is a name bound to a string inside the shell process. It is invisible to the programs the shell starts until it is exported. The command export NAME=value puts the name and the value into the environment of every child process, and env prints the environment a child would receive. This is the mechanism behind the classic failure where a variable is set in a script but the program the script calls cannot see it.\n\nExpansion reads a variable with the dollar sign, and with braces around the name when the name is followed by characters that could be part of it or when a default is needed. The default forms are a readable alternative to scattering emptiness checks around a script: the :- form uses a fallback when the variable is unset or empty, the := form also assigns it, and the :? form aborts with a message when the variable is missing.\n\nThe environment is a copy made when a process is created. A child cannot change the environment of its parent, so exporting a variable inside a subshell is lost as soon as the subshell ends. To give one command a different environment, use the form VAR=value command, which applies to that command only, or export the variable when every later command should see it.\n\nPATH is an ordinary environment variable, and it is the one that decides which binary runs. Prepending a directory to it is how a project pins the version of a tool for the duration of a session. The same mechanism carries secrets, and that is the risk: anything in the environment is visible to every child process and often ends up in logs, crash reports and process listings.',
        'Переменная в оболочке — это имя, связанное со строкой внутри процесса оболочки. Программы, которые запускает оболочка, её не видят, пока переменная не экспортирована. Команда export NAME=value помещает имя и значение в окружение каждого дочернего процесса, а env печатает то окружение, которое получит дочерний процесс. Именно с этим механизмом связана классическая ошибка: переменная задана в скрипте, а вызываемая программа её не видит.\n\nЧитается переменная со знаком доллара, а в фигурных скобках — когда после имени идут символы, которые могут попасть в имя, либо когда нужно значение по умолчанию. Формы с умолчанием удобнее, чем россыпь проверок на пустоту: форма :- подставляет запасное значение, если переменная не задана или пуста, форма := ещё и присваивает, а форма :? прерывает выполнение с сообщением, когда переменной нет.\n\nОкружение копируется в момент создания процесса. Дочерний процесс не может изменить окружение родителя, поэтому экспорт переменной внутри подоболочки теряется вместе с ней. Чтобы дать отдельной команде другое окружение, используют форму VAR=value command, которая действует только на эту команду, либо экспортируют переменную, если её должны видеть все последующие команды.\n\nPATH — обычная переменная окружения, и именно она решает, какой бинарник запустится. Добавление каталога в начало PATH — способ зафиксировать версию инструмента на время сессии. Тем же механизмом переносят секреты, и в этом и заключается риск: всё, что лежит в окружении, видно каждому дочернему процессу и часто попадает в логи, отчёты о сбоях и список процессов.'
      ),
      bullets: [
        L('Shell variables are private until exported, children only see exported names.', 'Переменные оболочки приватны до экспорта, дочерние процессы видят только экспортированные.'),
        L('export NAME=value publishes the variable to every child process.', 'export NAME=value публикует переменную каждому дочернему процессу.'),
        L('The :- form substitutes a default, the := form assigns it, the :? form aborts.', 'Форма :- подставляет умолчание, := присваивает, :? прерывает выполнение.'),
        L('The environment is copied at creation time, a child cannot change its parent.', 'Окружение копируется при создании процесса, дочерний не может изменить родительский.'),
        L('VAR=value command changes the environment for that command only.', 'VAR=value command меняет окружение только для этой команды.'),
      ],
      code: `# A variable the child never sees
NAME=ilyag
bash -c 'echo \$NAME'        # empty: NAME was not exported
export NAME=ilyag
bash -c 'echo \$NAME'        # ilyag

# Defaults and required values
echo \${MISSING:-fallback}   # fallback
echo \${REQUIRED:?not set}   # aborts with the message

# One command, one environment
NODE_ENV=production npm run build

# What a child would see
env | grep -i '^PATH='`,
      table: {
        caption: L('Variable forms', 'Формы записи переменных'),
        headers: [L('Form', 'Форма'), L('Meaning', 'Значение'), L('Typical use', 'Типовое применение')],
        rows: [
          [L('$NAME', '$NAME'), L('the value, empty when unset', 'значение, пусто если не задано'), L('ordinary reads', 'обычное чтение')],
          [L('${NAME}', '${NAME}'), L('the value with an explicit boundary', 'значение с явной границей'), L('names followed by text', 'имена рядом с текстом')],
          [L('${NAME:-default}', '${NAME:-default}'), L('the fallback when unset or empty', 'запасное значение, если не задано или пусто'), L('optional settings', 'необязательные настройки')],
          [L('${NAME:?message}', '${NAME:?message}'), L('abort with a message when unset', 'прерывание с сообщением, если не задано'), L('required settings', 'обязательные настройки')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Secrets do not belong on the command line', 'Секреты не должны попадать в командную строку'),
          text: L(
            'A password passed as an argument is visible in the process listing of every user on the machine and usually ends up in the shell history. Pass it through the environment, read it from a file with restrictive permissions, or use a dedicated secret store.',
            'Пароль, переданный аргументом, виден в списке процессов любого пользователя машины и обычно попадает в историю команд. Передавайте его через окружение, читайте из файла с ограниченными правами или используйте специальное хранилище секретов.'
          ),
        },
      ],
      takeaway: L(
        'A variable only reaches the programs you start when it is exported, and the environment is a copy, never a shared channel.',
        'Переменная доходит до запускаемых программ только после экспорта, а окружение — это копия, а не общий канал.'
      ),
      seeAlso: [
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
        L('Section 6-1: variables, tests and quoting', 'Секция 6-1: переменные, проверки и кавычки'),
      ],
    },
    {
      id: 'cli-ch1-s5',
      title: L('Exit codes and the shell as a program', 'Коды возврата и оболочка как программа'),
      body: L(
        'Every process reports its result with an exit code, a small integer that the kernel hands to the parent. Zero means success by convention and any non-zero value means failure, but the exact number is chosen by the program: 1 for a generic error, 2 for a usage mistake, 126 when a file is found but is not executable, 127 when the command is not found at all. The value is the contract between programs, and it is the only result a pipeline can rely on without parsing text.\n\nThe shell exposes the code of the last command as a special variable, and the exit builtin ends the shell with a chosen code. Because every command overwrites that value, it has to be read immediately: reading it into a variable right after the command is correct, while printing it in between is not, because the print command itself resets the code to zero before anybody uses it.\n\nThe same value drives conditional execution. The form cmd1 && cmd2 runs the second command only when the first succeeded, cmd1 || cmd2 runs it only when the first failed, and the if form is the readable version of the same idea. The trap is chaining: a && b && c stops at the first failure, but a; b; c runs everything regardless, and a script that checks only the last command reports success even when the first one failed.\n\nThe option set -e makes the shell exit when a command fails, which removes a lot of manual error handling. It does not fire inside a condition, in a negated command, or in the middle of a pipeline, so it is a safety net rather than a guarantee. The exit status of a pipeline is the status of its last command by default, which is a separate trap with a separate fix.',
        'Каждый процесс сообщает о результате кодом возврата — небольшим целым числом, которое ядро передаёт родителю. Ноль по соглашению означает успех, любое другое значение — ошибку, но конкретную цифру выбирает сама программа: 1 для общей ошибки, 2 для неверного вызова, 126 когда файл найден, но не исполняем, 127 когда команда не найдена вовсе. Это значение и есть контракт между программами, и это единственный результат, на который конвейер может положиться, не разбирая текст.\n\nОболочка отдаёт код последней команды через специальную переменную, а встроенная команда exit завершает оболочку с выбранным кодом. Поскольку любая команда это значение перезаписывает, его надо читать сразу: считать код в переменную сразу после команды правильно, а печатать его между командами — нет, потому что сама печать сбрасывает код в ноль раньше, чем его используют.\n\nТем же значением управляется условное выполнение. Форма cmd1 && cmd2 запускает вторую команду только при успехе первой, cmd1 || cmd2 — только при её неудаче, а форма if читается как то же самое, только понятнее. Ловушка в цепочках: a && b && c останавливается на первой неудаче, а a; b; c выполняет всё независимо от результата, и скрипт, проверяющий только последнюю команду, сообщает об успехе даже после провала первой.\n\nОпция set -e заставляет оболочку завершаться при ошибке команды, что убирает много ручной обработки. Она не срабатывает внутри условия, в команде с отрицанием и в середине конвейера, поэтому это страховка, а не гарантия. Код возврата конвейера по умолчанию равен коду его последней команды — это отдельная ловушка с отдельным решением.'
      ),
      bullets: [
        L('Zero means success and any non-zero value means failure.', 'Ноль означает успех, любое другое значение — ошибку.'),
        L('127 means the command was not found, 126 means it was not executable.', '127 означает, что команда не найдена, 126 — что она не исполняема.'),
        L('Read the status of the last command immediately, the next command overwrites it.', 'Код последней команды читайте сразу, следующая команда его перезапишет.'),
        L('The && and || operators short-circuit, the semicolon runs everything regardless.', 'Операторы && и || работают по короткому замыканию, а точка с запятой выполняет всё подряд.'),
        L('set -e does not fire in conditions, in negated commands or inside a pipeline.', 'set -e не срабатывает в условиях, в отрицаниях и внутри конвейера.'),
      ],
      code: `# Check a result before doing anything else
grep -q error app.log
if [ \$? -ne 0 ]; then
  echo "no errors found"
fi

# Short-circuit chains
mkdir -p build && cd build && npm run package
curl -fsSL https://example.com || echo "download failed"

# Preserve the status of a script
./deploy.sh || exit 1
exit 0`,
      table: {
        caption: L('Exit codes you will meet', 'Коды возврата, которые встретятся'),
        headers: [L('Code', 'Код'), L('Meaning', 'Значение'), L('Typical source', 'Откуда')],
        rows: [
          [L('0', '0'), L('success', 'успех'), L('a command that finished its work', 'команда, выполнившая работу')],
          [L('1', '1'), L('generic failure', 'общая ошибка'), L('most programs on any error', 'большинство программ при любой ошибке')],
          [L('2', '2'), L('usage error', 'ошибка вызова'), L('a wrong flag or missing argument', 'неверный флаг или отсутствующий аргумент')],
          [L('126', '126'), L('found but not executable', 'найдено, но не исполняемо'), L('wrong permissions on the file', 'неверные права на файле')],
          [L('127', '127'), L('command not found', 'команда не найдена'), L('a typo or a missing PATH entry', 'опечатка или каталог не в PATH')],
          [L('128 + n', '128 + n'), L('killed by signal n', 'убит сигналом n'), L('SIGTERM means 143, SIGKILL means 137', 'SIGTERM — 143, SIGKILL — 137')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('set -e is not a guarantee', 'set -e — не гарантия'),
          text: L(
            'The option is skipped in a condition, in a negated command and for every stage of a pipeline except the last. Treat it as a net that catches obvious mistakes and keep explicit checks for the failures that matter.',
            'Опция не срабатывает внутри условия, в команде с отрицанием и для всех стадий конвейера, кроме последней. Считайте её сеткой, ловящей очевидные ошибки, и добавляйте явные проверки там, где важна каждая неудача.'
          ),
        },
      ],
      takeaway: L(
        'Treat the exit code as a contract: read it immediately and never let a later command overwrite it before you have used it.',
        'Относитесь к коду возврата как к контракту: читайте его сразу и не давайте следующей команде перезаписать его раньше времени.'
      ),
      seeAlso: [
        L('Section 3-6: pipes, exit statuses and pipefail', 'Секция 3-6: конвейеры, коды возврата и pipefail'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
      ],
    },
  ],
};
