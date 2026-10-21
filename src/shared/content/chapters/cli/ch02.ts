import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh02: Chapter = {
  id: 'cli-ch2',
  title: L('Finding files and text', 'Поиск файлов и текста'),
  summary: L(
    'How to find what is on disk and inside it: glob expansion, the predicates of find, the search tools and how to chain a search into another command.',
    'Как найти то, что лежит на диске и внутри файлов: подстановка шаблонов, предикаты find, поисковые инструменты и то, как передать результат поиска другой команде.'
  ),
  sections: [
    {
      id: 'cli-ch2-s1',
      title: L('Globbing and shell expansion', 'Подстановка шаблонов и разворачивание оболочки'),
      body: L(
        'A glob is a pattern that the shell expands into a list of file names before the program starts. The pattern *.log becomes every matching name in the current directory, ?.txt matches exactly one character, [0-9] matches one character from a set, and a double star reaches into subdirectories when the globstar option is enabled. The expansion happens in the shell, so the program receives a finished list of paths and never learns that a pattern was involved.\n\nThe dangerous case is a pattern that matches nothing. Then the shell leaves the pattern itself as a single literal argument, so rm *.log in an empty directory tries to delete a file called *.log and the error message mentions the pattern instead of the real problem. The nullglob option removes unmatched words entirely and failglob aborts the command, and either one turns a silent mistake into a clear message.\n\nExpansion also happens in unexpected places. The result of an unquoted variable expansion is subject to pathname expansion, so a variable that holds a pattern is expanded again into the matching names: a variable set to the text *.log expands into the list of matching file names, and rm $files removes every one of them. Quoting the variable stops that, and programs such as find, rsync and git implement their own matching and take the pattern as a literal argument, which is why their patterns must be quoted to survive the shell.\n\nThe rule that decides who matches what is simple. The shell matches names within one directory level at a time and knows nothing about the content of a directory, while a program such as find walks the hierarchy and can filter on properties a name does not carry: type, size, age or modification time.',
        'Шаблон — это конструкция, которую оболочка разворачивает в список имён файлов до запуска программы. Шаблон *.log становится всеми подходящими именами в текущем каталоге, ?.txt совпадает ровно с одним символом, [0-9] — с одним символом из набора, а двойная звёздочка заходит в подкаталоги, когда включена опция globstar. Разворачивание делает оболочка, поэтому программа получает готовый список путей и не знает, что в нём был шаблон.\n\nОпасный случай — шаблон, который ничего не находит. Тогда оболочка оставляет сам шаблон единственным буквальным аргументом, и rm *.log в пустом каталоге пытается удалить файл с именем *.log, а сообщение об ошибке упоминает шаблон вместо настоящей причины. Опция nullglob убирает несовпавшие слова целиком, а failglob прерывает команду, и любая из них превращает тихую ошибку в ясное сообщение.\n\nРазворачивание случается и там, где его не ждут. Результат подстановки переменной без кавычек подвергается подстановке шаблонов, поэтому переменная, в которой лежит шаблон, разворачивается заново в подходящие имена: переменная со значением *.log разворачивается в список подходящих файлов, и rm $files удаляет каждый из них. Кавычки это останавливают, а такие программы, как find, rsync и git, реализуют сопоставление сами и принимают шаблон буквальным аргументом, поэтому их шаблоны нужно брать в кавычки, чтобы оболочка их не съела.\n\nПравило, определяющее, кто и что сопоставляет, простое. Оболочка сопоставляет имена внутри одного уровня каталогов и ничего не знает о содержимом каталога, а программа вроде find обходит иерархию и умеет отбирать по свойствам, которых нет в имени: тип, размер, возраст, время изменения.'
      ),
      bullets: [
        L('Globs are expanded by the shell before the program runs.', 'Шаблоны разворачивает оболочка, и делает это до запуска программы.'),
        L('The star and the question mark match inside one directory level.', 'Звёздочка и вопросительный знак сопоставляются в пределах одного уровня каталогов.'),
        L('A pattern with no match stays a literal argument.', 'Шаблон без совпадений остаётся буквальным аргументом.'),
        L('nullglob drops unmatched patterns, failglob aborts the command.', 'nullglob убирает несовпавшие шаблоны, failglob прерывает команду.'),
        L('An unquoted variable expansion is globbed again, a quoted one is not.', 'Подстановка переменной без кавычек разворачивается шаблонами заново, а в кавычках — нет.'),
      ],
      code: `# The shell expands this into a list of names
ls *.log
ls report-?.txt
ls data[0-9].csv

# A pattern that matches nothing stays literal
shopt -s nullglob      # unmatched patterns disappear
shopt -s failglob      # unmatched patterns abort the command
shopt -u nullglob      # back to the default

# A variable holding a pattern is globbed when it is not quoted
pattern='*.log'
echo "$pattern"        # *.log: quoted, the pattern stays a pattern
echo $pattern          # a.log b.log: unquoted, the shell globs it again`,
      table: {
        caption: L('Glob patterns and what they match', 'Шаблоны и что они сопоставляют'),
        headers: [L('Pattern', 'Шаблон'), L('Matches', 'Совпадает с'), L('Note', 'Замечание')],
        rows: [
          [L('*', '*'), L('any sequence of characters', 'любой последовательностью символов'), L('never crosses a directory level', 'не пересекает уровень каталога')],
          [L('?', '?'), L('exactly one character', 'ровно одним символом'), L('report-?.txt matches one digit', 'report-?.txt совпадает с одной цифрой')],
          [L('[abc]', '[abc]'), L('one character from the set', 'одним символом из набора'), L('ranges work too: [a-z]', 'работают и диапазоны: [a-z]')],
          [L('**', '**'), L('zero or more directory levels', 'нулём или большим числом уровней'), L('needs the globstar option in bash', 'в bash нужна опция globstar')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('rm with an empty glob', 'rm и пустой шаблон'),
          text: L(
            'With the default settings the command rm *.tmp in a directory without such files tries to remove a file literally named *.tmp. In scripts prefer find with a delete action, or enable nullglob so the list is empty rather than wrong.',
            'По умолчанию команда rm *.tmp в каталоге без таких файлов пытается удалить файл, буквально названный *.tmp. В скриптах надёжнее find с действием удаления или опция nullglob, чтобы список был пустым, а не неверным.'
          ),
        },
      ],
      takeaway: L(
        'Globs belong to the shell, and an unmatched pattern is a literal string, so quote patterns meant for a program and enable nullglob in your own loops.',
        'Шаблоны принадлежат оболочке, а несовпавший шаблон — буквальная строка: берите в кавычки шаблоны для программ и включайте nullglob в своих циклах.'
      ),
      seeAlso: [
        L('Section 2-2: find and its predicates', 'Секция 2-2: find и его предикаты'),
        L('Section 1-2: quoting, escaping and expansion', 'Секция 1-2: кавычки, экранирование и разворачивание'),
      ],
    },
    {
      id: 'cli-ch2-s2',
      title: L('find and its predicates', 'find и его предикаты'),
      body: L(
        'find starts at a path and walks the tree, testing every entry against a list of expressions. It is the opposite of a glob: a glob asks the shell to match names inside one directory, while find walks the hierarchy and can filter on properties that a name does not carry, such as type, size, age or modification time. It exists on every system and never needs installation.\n\nPredicates combine with the and, or and negation operators, and an implicit and between two tests is the normal case: -type f -name *.ts means both must hold. Parentheses group them, and because the shell treats parentheses as syntax, they have to be escaped or quoted, otherwise the shell tries to start a subshell and the whole command fails with a syntax error.\n\nActions attach with the exec and delete options or with print0. The exec form comes in two shapes: one starts a process per file, the other batches many files into a single invocation. The batch form is dramatically faster on a large tree and it keeps names with spaces intact, because the shell never gets a chance to split them.\n\nThe rule that catches everybody is quoting. A pattern that reaches find through the shell has already been expanded by the shell, so the command find . -name *.log searches for a file literally named *.log. Always write the pattern in quotes, and use print0 with the null option of xargs when names can contain spaces or newlines.',
        'find стартует с пути и обходит дерево, проверяя каждую запись набором выражений. Это противоположность шаблона: шаблон просит оболочку сопоставить имена внутри одного каталога, а find обходит иерархию и умеет отбирать по свойствам, которых нет в имени: тип, размер, возраст, время изменения. Он есть в любой системе и не требует установки.\n\nПредикаты объединяются операторами и, или и отрицания, а неявное «и» между двумя проверками — обычный случай: -type f -name *.ts означает, что должны выполняться оба условия. Скобки группируют проверки, и поскольку скобки для оболочки — синтаксис, их приходится экранировать или брать в кавычки, иначе оболочка попытается запустить подоболочку и команда завершится синтаксической ошибкой.\n\nДействия подключаются через exec, delete или print0. У exec есть две формы: одна запускает процесс на каждый файл, другая собирает много файлов в один вызов. Пакетная форма на большом дереве заметно быстрее и сохраняет имена с пробелами целыми, потому что оболочка не успевает их разбить.\n\nПравило, которое ловит всех, — кавычки. Шаблон, дошедший до find через оболочку, уже развёрнут оболочкой, поэтому команда find . -name *.log ищет файл, буквально названный *.log. Всегда пишите шаблон в кавычках, а для имён с пробелами и переводами строк используйте print0 вместе с нулевой опцией xargs.'
      ),
      bullets: [
        L('find walks the tree, a glob matches names inside one directory.', 'find обходит дерево, шаблон сопоставляет имена внутри одного каталога.'),
        L('Two predicates are combined with an implicit and.', 'Два предиката объединяются неявным «и».'),
        L('The batch form of exec runs one command for many files.', 'Пакетная форма exec запускает одну команду на много файлов.'),
        L('Patterns must be quoted so the shell does not expand them first.', 'Шаблоны нужно брать в кавычки, иначе оболочка развернёт их первой.'),
        L('print0 with xargs -0 survives names with spaces and newlines.', 'print0 вместе с xargs -0 переживает имена с пробелами и переводами строк.'),
      ],
      code: `# Files changed in the last day, excluding build output
find . -type f -mtime -1 -not -path './node_modules/*'

# Larger than 100 megabytes
find /var/log -type f -size +100M

# One command for all matches, not one per file
find . -type f -name '*.log' -exec gzip {} +

# Null separated output for xargs
find . -type f -name '*.tmp' -print0 | xargs -0 rm -f

# Grouping with parentheses, escaped for the shell
find . -type f \\( -name '*.ts' -o -name '*.tsx' \\)`,
      table: {
        caption: L('The find predicates worth knowing', 'Предикаты find, которые стоит знать'),
        headers: [L('Predicate', 'Предикат'), L('Selects', 'Отбирает'), L('Example', 'Пример')],
        rows: [
          [L('-name', '-name'), L('names matching a pattern', 'имена по шаблону'), L("-name '*.log'", "-name '*.log'")],
          [L('-type', '-type'), L('the type of the entry', 'тип записи'), L('-type f for regular files', '-type f для обычных файлов')],
          [L('-size', '-size'), L('the size of the entry', 'размер записи'), L('-size +100M', '-size +100M')],
          [L('-mtime','-mtime'), L('the age in days', 'возраст в днях'), L('-mtime -1 for the last day', '-mtime -1 за последние сутки')],
          [L('-path', '-path'), L('the whole path', 'полный путь'), L("-path './node_modules/*'", "-path './node_modules/*'")],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The parentheses', 'Скобки'),
          text: L(
            'Parentheses are shell syntax. Escape them as \\( and \\) or quote them, otherwise the shell tries to start a subshell, find never sees the group and the command ends with a syntax error instead of a result.',
            'Скобки — это синтаксис оболочки. Экранируйте их как \\( и \\) или берите в кавычки, иначе оболочка попытается запустить подоболочку, find не увидит группу и команда закончится синтаксической ошибкой вместо результата.'
          ),
        },
      ],
      takeaway: L(
        'Quote every pattern for find and prefer the batch form of exec, because the shell expands your pattern before find can see it.',
        'Берите в кавычки любой шаблон для find и предпочитайте пакетную форму exec: оболочка развернёт шаблон раньше, чем его увидит find.'
      ),
      seeAlso: [
        L('Section 2-1: globbing and shell expansion', 'Секция 2-1: подстановка шаблонов и разворачивание оболочки'),
        L('Section 2-5: piping search results into other tools', 'Секция 2-5: передача результатов поиска другим инструментам'),
      ],
    },
    {
      id: 'cli-ch2-s3',
      title: L('grep, fgrep and rg', 'grep, fgrep и rg'),
      body: L(
        'grep scans files for lines that match a pattern and prints those lines. The pattern is a basic regular expression by default, where the plus sign, the question mark, the pipe, parentheses and braces are ordinary characters, so the pattern a+b matches the text a+b and not a run of letters. The -E option switches to extended regular expressions and the -F option switches to fixed strings.\n\nThe options that decide whether a search is usable are -r for recursion, -n for line numbers, -i for case insensitivity, -v for the inverse and -c for a count instead of the lines. The inverse option deserves care: grep -v ERROR prints every line that does not contain ERROR, which is a filter, but it also hides the very lines you were hunting for.\n\nfgrep is grep with the fixed string flag, so every character in the pattern is literal. That matters when the pattern comes from a user, a log message or a commit hash, because a regular expression metacharacter there turns a search into a syntax error or into a much wider match than intended.\n\nrg is a modern replacement written in Rust. It is fast because it walks the tree in parallel, it skips binary files, it honours the ignore rules of the repository and it prints coloured output with line numbers by default. The classic tools stay available everywhere, so rg is a habit you pick and grep is the fallback you keep.',
        'grep просматривает файлы в поисках строк, подходящих под шаблон, и печатает эти строки. По умолчанию шаблон — базовое регулярное выражение, в котором плюс, вопросительный знак, вертикальная черта, скобки и фигурные скобки являются обычными символами, поэтому шаблон a+b совпадёт с текстом a+b, а не с последовательностью букв. Опция -E включает расширенные регулярные выражения, а -F — фиксированные строки.\n\nОпции, которые решают, пригоден ли поиск, это -r для рекурсии, -n для номеров строк, -i для регистронезависимости, -v для инверсии и -c для подсчёта вместо печати строк. С инверсией надо быть аккуратным: grep -v ERROR печатает все строки, где ERROR нет, — это фильтр, но заодно он скрывает именно те строки, которые вы искали.\n\nfgrep — это grep с флагом фиксированной строки, поэтому каждый символ шаблона литерален. Это важно, когда шаблон приходит от пользователя, из сообщения в логе или из хеша коммита: метасимвол регулярного выражения превращает поиск либо в ошибку синтаксиса, либо в гораздо более широкое совпадение, чем задумано.\n\nrg — современная замена, написанная на Rust. Она быстра, потому что обходит дерево параллельно, пропускает двоичные файлы, учитывает правила игнорирования репозитория и печатает цветной вывод с номерами строк по умолчанию. Классические инструменты есть везде, поэтому rg — привычка, которую вы выбираете, а grep — запасной вариант, который вы оставляете.'
      ),
      bullets: [
        L('grep patterns are basic regular expressions unless -E is given.', 'Шаблоны grep — базовые регулярные выражения, если не задан -E.'),
        L('fgrep is grep with the fixed string flag and treats the pattern literally.', 'fgrep — это grep с флагом фиксированной строки, шаблон в нём буквален.'),
        L('-r searches recursively, -n adds line numbers, -c counts instead of printing.', '-r ищет рекурсивно, -n добавляет номера строк, -c считает вместо печати.'),
        L('-v prints the lines that do not match, which hides the interesting ones.', '-v печатает несовпавшие строки, а это прячет самое интересное.'),
        L('rg is faster, honours ignore rules and colours its output by default.', 'rg работает быстрее, учитывает правила игнорирования и печатает цветной вывод.'),
      ],
      code: `# The options that matter
grep -rn "TODO" src/            # recursive, with line numbers
grep -rni "timeout" src/        # case insensitive
grep -c "error" app.log         # count only, no output
grep -v "^\\s*#" config.ini      # drop comment lines

# Literal patterns from the outside world
git rev-parse HEAD | grep -F "$USER_INPUT"

# The faster alternative
rg "TODO"                      # respects .gitignore, coloured output
rg -g '*.ts' "useEffect" src/
rg --type js "console.log"`,
      table: {
        caption: L('Search tools and their pattern syntax', 'Поисковые инструменты и синтаксис шаблонов'),
        headers: [L('Tool', 'Инструмент'), L('Pattern syntax', 'Синтаксис шаблона'), L('Note', 'Замечание')],
        rows: [
          [L('grep', 'grep'), L('basic regular expression', 'базовое регулярное выражение'), L('available everywhere', 'есть везде')],
          [L('grep -E', 'grep -E'), L('extended regular expression', 'расширенное регулярное выражение'), L('plus, question mark, pipe, braces', 'плюс, вопросительный знак, черта, скобки')],
          [L('fgrep / grep -F', 'fgrep / grep -F'), L('fixed string', 'фиксированная строка'), L('every character is literal', 'каждый символ буквален')],
          [L('rg', 'rg'), L('regular expression', 'регулярное выражение'), L('fast, honours ignore rules', 'быстрый, учитывает правила игнорирования')],
          [L('git grep', 'git grep'), L('regular expression', 'регулярное выражение'), L('searches tracked files only', 'ищет только по отслеживаемым файлам')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('git grep inside a repository', 'git grep внутри репозитория'),
          text: L(
            'In a repository git grep searches only the files tracked by git, which is faster than a recursive grep and never matches build output that was never committed. It also understands the ignore rules of the repository and prints the file names by default.',
            'В репозитории git grep ищет только по файлам, отслеживаемым git: это быстрее рекурсивного grep и никогда не находит сборочные артефакты, которых не было в коммите. Он также понимает правила игнорирования репозитория и по умолчанию печатает имена файлов.'
          ),
        },
      ],
      takeaway: L(
        'Quote the pattern the way you mean it: use the fixed string flag for literal text, and remember that the inverse option hides the lines you were looking for.',
        'Передавайте шаблон в том виде, в каком имеете в виду: фиксированная строка для буквального текста, и помните, что инверсия прячет искомые строки.'
      ),
      seeAlso: [
        L('Section 2-4: fd and ripgrep versus the classic tools', 'Секция 2-4: fd и ripgrep против классических инструментов'),
        L('Section 2-5: piping search results into other tools', 'Секция 2-5: передача результатов поиска другим инструментам'),
      ],
    },
    {
      id: 'cli-ch2-s4',
      title: L('fd and ripgrep versus the classic tools', 'fd и ripgrep против классических инструментов'),
      body: L(
        'The modern replacements exist for one reason: the classic tools are slow and their defaults are wrong for a repository. find . descends into .git and node_modules, while fd skips hidden directories and everything listed in the ignore file unless you ask for it. find matches by name, while fd takes a regular expression and matches by extension with a short option.\n\nripgrep replaces grep the same way. It is parallel, it skips binary files, it reads the ignore files of the repository, and it can filter by glob or by file type. The glob filter selects only the files whose names match a pattern, the type filter selects by extension, and the fixed string flag switches the pattern to literal text. Configuration lives in a file pointed at by an environment variable, so the flags you always want become the defaults.\n\nThe classic tools keep their place. find exists on every POSIX system and understands predicates that nothing else does, grep is the command every script and every tutorial mentions, and both are predictable on a machine where you cannot install anything. The rule is not to replace them but to reach for the faster tool when the tree is large and the search spans the whole repository.\n\nA third tool fits between them. fzf is an interactive finder that turns a list of paths into a fuzzy search with a preview pane. It replaces nothing and filters everything: it changes the ergonomics of looking for a file you half remember into a few keystrokes instead of a walk through the directory tree.',
        'Современные замены существуют по одной причине: классические инструменты медленны, а их умолчания не подходят для репозитория. find . заходит в .git и node_modules, а fd пропускает скрытые каталоги и всё, что перечислено в файле игнорирования, пока вы не попросите обратного. find сопоставляет по имени, а fd принимает регулярное выражение и умеет сопоставлять по расширению короткой опцией.\n\nripgrep заменяет grep тем же способом. Он работает параллельно, пропускает двоичные файлы, читает файлы игнорирования репозитория и умеет фильтровать по шаблону имени или по типу файла. Фильтр по шаблону оставляет только файлы, имена которых совпадают с образцом, фильтр по типу отбирает по расширению, а флаг фиксированной строки переключает шаблон на буквальный текст. Настройки лежат в файле, на который указывает переменная окружения, поэтому флаги, которые вы всегда хотите, становятся умолчаниями.\n\nКлассические инструменты сохраняют своё место. find есть в любой POSIX-системе и понимает предикаты, которых нет ни у кого другого, grep — команда, которую упоминают все скрипты и все руководства, и оба предсказуемы на машине, где ничего нельзя установить. Правило не в том, чтобы их заменить, а в том, чтобы брать быстрый инструмент, когда дерево большое, а поиск идёт по всему репозиторию.\n\nТретий инструмент помещается между ними. fzf — интерактивный поисковик, превращающий список путей в нечёткий поиск с панелью предпросмотра. Он ничего не заменяет и фильтрует всё: он превращает поиск файла, который вы наполовину помните, в несколько нажатий клавиш вместо обхода дерева каталогов.'
      ),
      bullets: [
        L('fd matches by regular expression and skips hidden and ignored directories.', 'fd сопоставляет по регулярному выражению и пропускает скрытые и игнорируемые каталоги.'),
        L('rg is parallel, skips binary files and honours the ignore rules.', 'rg работает параллельно, пропускает двоичные файлы и учитывает правила игнорирования.'),
        L('A glob filter selects by file name, a type filter selects by extension.', 'Фильтр по шаблону отбирает по имени файла, фильтр по типу — по расширению.'),
        L('find and grep stay as the fallback on any machine.', 'find и grep остаются запасным вариантом на любой машине.'),
        L('fzf is a fuzzy filter, not a replacement for find or grep.', 'fzf — нечёткий фильтр, а не замена find или grep.'),
      ],
      code: `# Classic: slow and noisy
find . -type f -name '*.ts' -not -path './node_modules/*'
grep -rn "createServer" .

# Modern: fast and quiet by default
fd -e ts --exclude node_modules
fd -e log modified
rg "createServer"           # respects .gitignore, coloured output
rg -g '*.spec.ts' "describe\\("
rg --type ts "useState"

# Interactive picking
fd -e json | fzf | xargs -r cat`,
      table: {
        caption: L('The same job, two ways', 'Одна и та же задача двумя способами'),
        headers: [L('Task', 'Задача'), L('Classic', 'Классика'), L('Modern', 'Современный инструмент')],
        rows: [
          [L('find files by extension', 'найти файлы по расширению'), L("find . -name '*.ts'", "find . -name '*.ts'"), L('fd -e ts', 'fd -e ts')],
          [L('find files by pattern', 'найти файлы по образцу'), L("find . -name 'log*.ts'", "find . -name 'log*.ts'"), L("fd 'log.*[.]ts'", "fd 'log.*[.]ts'")],
          [L('search text', 'поиск по тексту'), L("grep -rn 'x' .", "grep -rn 'x' ."), L("rg 'x'", "rg 'x'")],
          [L('literal search', 'буквальный поиск'), L("grep -F 'x'", "grep -F 'x'"), L("rg -F 'x'", "rg -F 'x'")],
          [L('skip ignored files', 'пропуск игнорируемых файлов'), L('manual -not -path', 'вручную через -not -path'), L('by default', 'по умолчанию')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('A configuration file for ripgrep', 'Файл настроек ripgrep'),
          text: L(
            'Put the flags you always want into the file pointed at by RIPGREP_CONFIG_PATH and they become defaults for every search. Add the hidden flag when a dotfile really is the target, and keep the fixed string flag in mind for hashes and identifiers.',
            'Положите флаги, которые нужны всегда, в файл, на который указывает RIPGREP_CONFIG_PATH, и они станут умолчаниями для каждого поиска. Добавляйте флаг для скрытых файлов, когда цель действительно в dotfile, и помните про флаг фиксированной строки для хешей и идентификаторов.'
          ),
        },
      ],
      takeaway: L(
        'Reach for fd and rg on large repositories, and keep find and grep as the fallback for machines where nothing can be installed.',
        'Берите fd и rg на больших репозиториях, а find и grep оставьте запасным вариантом для машин, куда ничего нельзя поставить.'
      ),
      seeAlso: [
        L('Section 2-3: grep, fgrep and rg', 'Секция 2-3: grep, fgrep и rg'),
        L('Section 2-2: find and its predicates', 'Секция 2-2: find и его предикаты'),
      ],
    },
    {
      id: 'cli-ch2-s5',
      title: L('Piping search results into other tools', 'Передача результатов поиска другим инструментам'),
      body: L(
        'The output of a search is text, and text composes. find prints paths and rg prints matching lines, and both can be handed to another tool that knows what to do with paths or with lines. xargs is the bridge for paths: it reads a list, groups it into arguments and runs a command with them, and it accepts the null separated output of find -print0 through the matching option, so names with spaces survive intact.\n\nxargs also has limits that matter. By default it runs the command with everything that fits into one invocation and splits longer input into several, so a command that assumes a single set of files sees several. The option that skips the run when the input is empty keeps rm from complaining about missing files, and the parallel option runs several invocations at once, which turns a sequential loop into a fast one on a machine with several cores.\n\nLines are handled by a read loop instead. The pattern reads one line at a time, keeps the whole line in a variable and keeps backslashes literal, and it only works when the loop reads from the input and not from a command substitution, because command substitution splits on whitespace and throws the line structure away.\n\nOne more habit pays off: stopping a search early. Piping into head prints a few lines and stops, and the search process receives a broken pipe when it tries to write more, which is harmless for the reader but produces an error message in some pipelines. The tools that support a limit directly avoid the noise.',
        'Вывод поиска — это текст, а текст складывается. find печатает пути, rg печатает подходящие строки, и оба результата можно передать инструменту, который умеет работать с путями или со строками. xargs — мост для путей: он читает список, группирует его в аргументы и запускает с ними команду, а нулевой вариант вывода find -print0 он принимает через соответствующую опцию, так что имена с пробелами остаются целыми.\n\nУ xargs есть ограничения, которые важны. По умолчанию он запускает команду со всем, что помещается в один вызов, и делит длинный ввод на несколько, поэтому команда, рассчитывающая на один набор файлов, увидит их несколько. Опция, пропускающая запуск при пустом вводе, избавляет rm от жалоб на отсутствующие файлы, а опция параллельности выполняет несколько вызовов одновременно, превращая последовательный цикл в быстрый на машине с несколькими ядрами.\n\nСтроки обрабатываются циклом чтения. Схема читает по одной строке, держит всю строку в переменной и не трогает обратные слэши, и работает она только тогда, когда цикл читает из входа, а не из подстановки команды: подстановка разбивает результат по пробелам и выбрасывает строчную структуру.\n\nЕщё одна привычка окупается: остановить поиск пораньше. Конвейер в head печатает несколько строк и останавливается, а процесс поиска получает закрытый канал, когда пытается писать дальше, — для читателя это безвредно, но в некоторых конвейерах даёт сообщение об ошибке. Инструменты, у которых есть собственный предел, избавляют от этого шума.'
      ),
      bullets: [
        L('xargs -0 with find -print0 survives names with spaces and newlines.', 'xargs -0 вместе с find -print0 переживает имена с пробелами и переводами строк.'),
        L('The option that skips an empty run keeps rm from failing on nothing.', 'Опция, пропускающая запуск при пустом вводе, избавляет rm от ошибки вхолостую.'),
        L('The parallel option runs several invocations at once.', 'Опция параллельности выполняет несколько вызовов одновременно.'),
        L('Read lines with a read loop, never with a for loop over a command.', 'Читайте строки циклом чтения, а не циклом for по выводу команды.'),
        L('A producer killed by a closed pipe may print a broken pipe message.', 'Производитель, убитый закрытым каналом, может напечатать сообщение о разрыве канала.'),
      ],
      code: `# Paths into a command
find . -name '*.tmp' -print0 | xargs -0 -r rm -f
fd -e json | xargs -r -P4 jq -r '.name'

# Lines into a loop
rg "password" -l | while IFS= read -r file; do
  echo "found in $file"
done

# Stop early without a broken pipe
rg --max-count 1 "token" .`,
      table: {
        caption: L('Bridges between a search and the next tool', 'Мосты между поиском и следующим инструментом'),
        headers: [L('Bridge', 'Мост'), L('Carries', 'Переносит'), L('Use for', 'Когда применять')],
        rows: [
          [L('xargs -0', 'xargs -0'), L('null separated paths', 'пути через нулевой разделитель'), L('running a command over files', 'запуск команды по файлам')],
          [L('xargs -r', 'xargs -r'), L('the same list, empty input skipped', 'тот же список, пустой ввод пропускается'), L('destructive commands like rm', 'опасные команды вроде rm')],
          [L('xargs -P', 'xargs -P'), L('the same list, several at once', 'тот же список, сразу несколько'), L('many slow invocations', 'много медленных вызовов')],
          [L('while IFS= read -r', 'while IFS= read -r'), L('one line at a time', 'по одной строке'), L('per line processing', 'обработка построчно')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The loop that eats whitespace', 'Цикл, который съедает пробелы'),
          text: L(
            'A for loop over the output of a command splits the list on spaces and drops empty results, so a file name with a space breaks it and the error points at the wrong path. Use a read loop or xargs, both of which keep the names intact.',
            'Цикл for по выводу команды разбивает список по пробелам и выбрасывает пустые результаты, поэтому имя файла с пробелом ломает его, а ошибка указывает не на тот путь. Используйте цикл чтения или xargs — они сохраняют имена целыми.'
          ),
        },
      ],
      takeaway: L(
        'Feed paths to xargs with the null option and read lines with a read loop; never let command substitution carry a list of paths.',
        'Передавайте пути в xargs с нулевой опцией, а строки читайте циклом чтения и никогда не переносите список путей через подстановку команды.'
      ),
      seeAlso: [
        L('Section 3-1: stdin, stdout, stderr and redirection', 'Секция 3-1: стандартные потоки и перенаправление'),
        L('Section 2-2: find and its predicates', 'Секция 2-2: find и его предикаты'),
      ],
    },
  ],
};
