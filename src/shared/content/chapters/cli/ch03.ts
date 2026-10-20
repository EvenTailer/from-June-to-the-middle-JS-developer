import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh03: Chapter = {
  id: 'cli-ch3',
  title: L('Text processing pipelines', 'Конвейеры обработки текста'),
  summary: L(
    'How programs exchange data through the three standard streams, and how a pipeline of small tools becomes the practical toolkit of a terminal engineer.',
    'Как программы обмениваются данными через три стандартных потока и как конвейер из маленьких инструментов становит рабочим набором инженера, который живёт в терминале.'
  ),
  sections: [
    {
      id: 'cli-ch3-s1',
      title: L('stdin, stdout, stderr and redirection', 'Стандартный ввод, вывод, ошибка и перенаправление'),
      body: L(
        'A process talks to the world through three standard streams: standard input for reading, standard output for results and standard error for diagnostics. They are file descriptors 0, 1 and 2, and by default all three point at the terminal. Every tool in this chapter assumes that it reads lines from the input and writes results to the output, and that assumption is exactly what makes them composable.\n\nRedirection changes where a stream points. The greater-than sign sends output to a file and truncates it, the doubled sign appends to the file, and the less-than sign reads the input from a file. The 2 prefix redirects the error stream instead of the output stream, and the order of the two redirections decides the result: sending the errors first and the output second leaves the errors on the terminal and puts the output in the file, while the other order puts both in the file.\n\nThe shorthand that sends both streams to one place works by copying one stream onto the other, and the difference between copying the error stream to the output and copying the output to the error is a frequent typo that produces a message about a bad file descriptor. A here-document feeds a literal block of text to the standard input of a command, and quoting the delimiter stops the shell from expanding anything inside it, which matters when the text contains dollar signs.\n\nThe input can also come from a file or be replaced by nothing. Redirecting the input from the null device gives a program an empty input instead of the terminal, and that is the standard way to make it stop waiting for a keypress. Reading from a file is the other half of the same idea: the program does not know or care whether its words arrived from a file, a pipe or a keyboard.',
        'Процесс общается с миром через три стандартных потока: стандартный ввод для чтения, стандартный вывод для результатов и стандартный вывод ошибок для диагностики. Это файловые дескрипторы 0, 1 и 2, и по умолчанию все три указывают на терминал. Каждый инструмент в этой главе рассчитан на то, что читает строки со входа и пишет результаты в выход, и именно это предположение делает их соединяемыми.\n\nПеренаправление меняет, куда указывает поток. Знак больше отправляет вывод в файл и обрезает его, удвоенный знак дописывает в файл, а знак меньше читает вход из файла. Префикс 2 перенаправляет поток ошибок вместо вывода, и порядок двух перенаправлений решает исход: если сначала ошибки, а потом вывод, ошибки остаются в терминале, а вывод попадает в файл; при обратном порядке в файле оказывается и то и другое.\n\nСокращение, отправляющее оба потока в одно место, работает через копирование одного потока в другой, и разница между копированием потока ошибок в вывод и копированием вывода в поток ошибок — частая опечатка, дающая сообщение о неверном дескрипторе. Здесь-документ подаёт буквальный блок текста на стандартный ввод команды, а кавычки вокруг разделителя запрещают оболочке разворачивать что-либо внутри, что важно, когда в тексте есть знаки доллара.\n\nВход можно взять из файла или заменить пустотой. Перенаправление входа с устройства нуля даёт программе пустой ввод вместо терминала, и это стандартный способ перестать ждать нажатия клавиши. Чтение из файла — вторая половина той же идеи: программа не знает и не интересуется, пришли слова из файла, из канала или с клавиатуры.'
      ),
      bullets: [
        L('Standard input is descriptor 0, standard output is 1, standard error is 2.', 'Стандартный ввод — дескриптор 0, вывод — 1, ошибка — 2.'),
        L('The greater-than sign truncates the file, the doubled sign appends to it.', 'Знак больше обрезает файл, удвоенный — дописывает в него.'),
        L('The order of the redirections decides where the errors end up.', 'Порядок перенаправлений решает, куда попадут ошибки.'),
        L('A here-document feeds literal text to the input of a command.', 'Здесь-документ подаёт буквальный текст на вход команды.'),
        L('An input redirected from the null device is empty instead of the keyboard.', 'Ввод с устройства нуля пуст, а не идёт с клавиатуры.'),
      ],
      code: `# Capture everything, errors included
./build.sh > build.log 2>&1

# Keep errors on the terminal, log only the results
./build.sh > build.log

# Errors only
./build.sh 2> errors.log

# Append instead of truncating
echo "run at \$(date)" >> run.log

# Feed literal text in
cat <<'EOF'
line with \$DOLLAR and \`backticks\` left untouched
EOF

# An empty input instead of the keyboard
./deploy.sh < /dev/null`,
      table: {
        caption: L('Redirections and their effect', 'Перенаправления и их действие'),
        headers: [L('Redirection', 'Перенаправление'), L('Effect', 'Действие')],
        rows: [
          [L('> file', '> file'), L('send the output to the file, truncating it', 'отправить вывод в файл с обрезкой')],
          [L('>> file', '>> file'), L('append the output to the file', 'дописать вывод в файл')],
          [L('< file', '< file'), L('read the input from the file', 'читать вход из файла')],
          [L('2> file', '2> file'), L('send the error stream to the file', 'отправить поток ошибок в файл')],
          [L('2>&1', '2>&1'), L('point the error stream where the output points', 'направить ошибки туда же, куда вывод')],
          [L('<< EOF', '<< EOF'), L('feed a literal block of text to the input', 'подать буквальный блок текста на вход')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The order of the redirections', 'Порядок перенаправлений'),
          text: L(
            'The command ./build.sh 2>&1 > build.log sends the errors to the terminal and the output to the file, because the second redirection copies the destination that was in place at that moment. Put the output first and the errors second to capture both.',
            'Команда ./build.sh 2>&1 > build.log отправит ошибки в терминал, а вывод в файл, потому что второе перенаправление копирует то место, которое было указано на тот момент. Поставьте вывод первым, а ошибки вторым, чтобы захватить и то и другое.'
          ),
        },
      ],
      takeaway: L(
        'Redirect with the output first and the errors second when you want both streams, because the order decides where each one lands.',
        'Когда нужны оба потока, ставьте вывод первым, а ошибки вторым: именно порядок решает, куда попадёт каждый из них.'
      ),
      seeAlso: [
        L('Section 3-6: pipes, exit statuses and pipefail', 'Секция 3-6: конвейеры, коды возврата и pipefail'),
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
      ],
    },
    {
      id: 'cli-ch3-s2',
      title: L('The Unix text toolbox: cat, sort, uniq, cut, tr', 'Текстовый набор Unix: cat, sort, uniq, cut, tr'),
      body: L(
        'The toolbox is small and the tools are deliberately dull, which is exactly what makes them composable. cat concatenates files or copies the input to the output, sort orders lines, uniq collapses repeated adjacent lines, cut selects fields or characters, tr translates or deletes characters, and head and tail trim the ends. Each tool reads lines and writes lines, and each one has a flag that decides what a line is to it.\n\nuniq is the tool people misuse. It removes only the duplicates that sit next to each other, so the sorted form gives a count per distinct value while the unsorted form gives the count of adjacent runs. The sort has to come first, and the count comes from the counting option of uniq, which prints the number in front of the line. The same rule explains why uniq is useless on unsorted data and why sort and uniq are a fixed pair.\n\ncut works on delimiters or on character positions, and it knows nothing about quoting: splitting on the comma turns the value Doe, John into two fields. Taking the first ten characters is safe for fixed-width data. tr works on characters rather than strings: the translation form changes case, the delete form removes carriage returns from a file that came from Windows, and the squeeze form collapses repeated spaces.\n\nSorting has its own flags: numeric sorting compares values as numbers instead of as text, the unique flag keeps only the first occurrence of each line, the key flag sorts by a chosen field and the separator flag sets what a field is. The lexicographic default is the trap, because the number ten comes before the number nine as text and after it as a number.',
        'Набор небольшой, и инструменты намеренно простые — именно это делает их соединяемыми. cat склеивает файлы или копирует вход в выход, sort упорядочивает строки, uniq схлопывает повторяющиеся соседние строки, cut выбирает поля или символы, tr переводит или удаляет символы, а head и tail обрезают края. Каждый инструмент читает строки и пишет строки, и у каждого есть флаг, который решает, что для него строка.\n\nuniq — инструмент, которым пользуются неправильно чаще всего. Он убирает только те повторы, что стоят рядом, поэтому отсортированная форма даёт количество по каждому различному значению, а неотсортированная — количество соседних серий. Сортировка обязана идти первой, а количество даёт опция подсчёта uniq, которая печатает число перед строкой. То же правило объясняет, почему uniq бесполезен на несортированных данных и почему sort и uniq — неразлучная пара.\n\ncut работает по разделителям или по позициям символов, и о кавычках он ничего не знает: разделение по запятой превращает значение Doe, John в два поля. Взять первые десять символов безопасно для данных фиксированной ширины. tr работает с символами, а не со строками: форма перевода меняет регистр, форма удаления вычищает возвраты каретки из файла, пришедшего с Windows, а форма сжатия убирает повторяющиеся пробелы.\n\nУ сортировки свои флаги: числовая сортировка сравнивает значения как числа, а не как текст, флаг уникальности оставляет только первое вхождение строки, флаг ключа сортирует по выбранному полю, а флаг разделителя задаёт, что считается полем. Ловушка — умолчание по алфавиту, потому что десять попадает раньше девяти как текст и позже как число.'
      ),
      bullets: [
        L('uniq collapses only adjacent duplicates, so the sort comes first.', 'uniq схлопывает только соседние повторы, поэтому сортировка идёт первой.'),
        L('The counting option of uniq turns the pipeline into a frequency report.', 'Опция подсчёта uniq превращает конвейер в отчёт по частотам.'),
        L('cut splits on every delimiter and ignores quoting inside the fields.', 'cut делит по каждому разделителю и не учитывает кавычки внутри полей.'),
        L('tr operates on characters, not on strings.', 'tr работает с символами, а не со строками.'),
        L('sort compares text by default and numbers only with the numeric flag.', 'sort по умолчанию сравнивает текст, а числа — только с числовым флагом.'),
      ],
      code: `# Count occurrences, most frequent first
sort access.log | uniq -c | sort -rn | head -5

# Take the second column of a comma separated file
cut -d, -f2 data.csv

# Remove carriage returns from a Windows file
tr -d '\\r' < windows.txt > unix.txt

# Sort numerically by the third field
sort -t: -k3 -n /etc/passwd

# Count lines, words and bytes
wc -l access.log`,
      table: {
        caption: L('Core text tools and their options', 'Основные текстовые инструменты и их опции'),
        headers: [L('Tool', 'Инструмент'), L('Purpose', 'Назначение'), L('Key option', 'Ключевая опция')],
        rows: [
          [L('sort', 'sort'), L('order the lines', 'упорядочить строки'), L('-n numeric, -k field, -u unique', '-n числовая, -k поле, -u уникальная')],
          [L('uniq', 'uniq'), L('collapse adjacent duplicates', 'схлопнуть соседние повторы'), L('-c prints the count', '-c печатает количество')],
          [L('cut', 'cut'), L('select fields or characters', 'выбрать поля или символы'), L('-d delimiter, -f field, -c characters', '-d разделитель, -f поле, -c символы')],
          [L('tr', 'tr'), L('translate or delete characters', 'перевести или удалить символы'), L('-d delete, -s squeeze', '-d удалить, -s сжать')],
          [L('head / tail', 'head / tail'), L('trim the ends of the stream', 'обрезать края потока'), L('-n count, -f follow', '-n количество, -f следить')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Sorting numbers as text', 'Сортировка чисел как текста'),
          text: L(
            'The default order of sort is lexicographic, so the number ten comes before the number nine and a list of versions reads as 10, 2, 1. Pass the numeric flag whenever the column holds numbers, and the key flag whenever it does not start at the first field.',
            'По умолчанию sort упорядочивает лексикографически, поэтому десять попадает раньше девяти, а список версий читается как 10, 2, 1. Ставьте числовой флаг, когда в колонке числа, и флаг ключа, когда поле не первое.'
          ),
        },
      ],
      takeaway: L(
        'uniq needs sorted input, cut ignores quoting inside fields, and sort compares text until you pass the numeric flag.',
        'uniq требует отсортированный вход, cut не учитывает кавычки внутри полей, а sort сравнивает текст, пока не указан числовой флаг.'
      ),
      seeAlso: [
        L('Section 3-3: sed and awk', 'Секция 3-3: sed и awk'),
        L('Section 3-5: tee and process substitution', 'Секция 3-5: tee и подстановка процессов'),
      ],
    },
    {
      id: 'cli-ch3-s3',
      title: L('sed and awk', 'sed и awk'),
      body: L(
        'sed is a stream editor: it reads a line, applies a sequence of commands and writes the result, so it can sit in the middle of a pipeline. Its best known command is the substitution, where the flags matter: without the global flag only the first occurrence on a line changes, the ignore-case flag makes the match case insensitive, and the delimiter is yours to choose, which saves you when the text contains slashes.\n\nsed can also select lines. The quiet option suppresses the automatic printing of every line, so a print command on the fifth line prints only that line. Address ranges work the same way, and a range of lines can be printed on its own. The commands for delete, substitute, append and insert cover most real edits, and the in-place option edits the file while leaving a backup behind.\n\nawk is a programming language applied line by line. It splits each line into fields by whitespace, so the first field, the whole line and the number of fields each have their own variable. A rule is a pattern, optionally followed by an action in braces, and the action runs for every line that matches. The print action is what makes awk useful for selecting columns, and the comparison operators work on the fields directly.\n\nawk keeps state between lines, which is what makes it more than a filter: an array counts occurrences, the end block prints the summary after the last line, and the begin block runs before any input is read. The rule of thumb is simple. sed rewrites text, awk reshapes records, and if the task needs more than that, the language has outgrown the tool and a real program is the better answer.',
        'sed — потоковый редактор: он читает строку, применяет последовательность команд и пишет результат, поэтому его можно поставить в середину конвейера. Самая известная его команда — подстановка, и здесь важны флаги: без глобального флага меняется только первое вхождение в строке, флаг регистронезависимости делает сопоставление нечувствительным к регистру, а разделитель выбираете вы, и это спасает, когда в тексте есть слэши.\n\nsed умеет и выбирать строки. Тихий флаг отключает автоматическую печать каждой строки, поэтому команда печати для пятой строки напечатает только её. Диапазоны адресов работают так же, и диапазон строк можно вывести отдельно. Команды удаления, подстановки, добавления и вставки покрывают почти все реальные правки, а опция изменения на месте правит файл и оставляет рядом резервную копию.\n\nawk — язык программирования, применяемый построчно. Он делит каждую строку на поля по пробелам, поэтому у первого поля, у всей строки и у количества полей есть свои переменные. Правило состоит из образца и, необязательно, действия в фигурных скобках, и действие выполняется для каждой подошедшей строки. Именно действие печати делает awk полезным для выбора колонок, а операторы сравнения работают прямо по полям.\n\nawk сохраняет состояние между строками, и это превращает его в нечто большее, чем фильтр: массив считает вхождения, блок завершения печатает итог после последней строки, а блок начала выполняется до чтения входа. Правило простое: sed переписывает текст, awk меняет форму записей, а если задача требует большего, язык перерос инструмент и правильнее написать настоящую программу.'
      ),
      bullets: [
        L('sed reads, transforms and writes line by line, so it fits in a pipeline.', 'sed читает, преобразует и пишет построчно, поэтому встаёт в конвейер.'),
        L('A substitution without the global flag changes only the first occurrence.', 'Подстановка без глобального флага меняет только первое вхождение.'),
        L('The quiet option plus a print command shows only the selected lines.', 'Тихий флаг вместе с командой печати показывает только выбранные строки.'),
        L('awk splits lines into fields and gives each of them a variable.', 'awk делит строки на поля и даёт каждому свою переменную.'),
        L('awk keeps state between lines, which is what makes it a language.', 'awk сохраняет состояние между строками — поэтому это язык, а не фильтр.'),
      ],
      code: `# Substitute text in every line
sed 's|http://|https://|g' config.ini

# Print a range of lines only
sed -n '10,20p' huge.log

# Edit in place and keep a backup
sed -i.bak 's/DEBUG/INFO/' app.conf

# awk: first column of a colon separated file
awk -F: '{print $1}' /etc/passwd

# awk: count and report
awk '{ count[$1]++ } END { for (k in count) print count[k], k }' access.log`,
      table: {
        caption: L('Choosing between sed and awk', 'Что выбрать между sed и awk'),
        headers: [L('Task', 'Задача'), L('sed', 'sed'), L('awk', 'awk')],
        rows: [
          [L('replace text in a line', 'заменить текст в строке'), L('the substitution command', 'команда подстановки'), L('the global substitution function', 'функция глобальной подстановки')],
          [L('filter lines', 'отфильтровать строки'), L('an address plus a print', 'адрес и печать'), L('a pattern with no action', 'образец без действия')],
          [L('pick a column', 'выбрать колонку'), L('not its job', 'не его задача'), L('the field variables', 'переменные полей')],
          [L('state between lines', 'состояние между строками'), L('limited to the hold space', 'ограниченно, через hold space'), L('arrays that persist', 'массивы, которые живут')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('In-place editing is not portable', 'Правка на месте не переносима'),
          text: L(
            'The in-place option without a backup suffix works in GNU sed but not in the BSD sed of macOS, which expects an empty argument after the option. Write the option with a suffix, so the same command works on both and leaves a backup file.',
            'Опция изменения на месте без суффикса работает в GNU sed, но не в BSD sed из macOS, который ждёт пустой аргумент после опции. Пишите опцию с суффиксом: команда будет работать на обеих системах и оставит резервный файл.'
          ),
        },
      ],
      takeaway: L(
        'Reach for sed to rewrite lines and awk to reshape records, and remember that awk keeps state between lines.',
        'Берите sed, чтобы переписывать строки, и awk — чтобы менять форму записей, и помните: awk сохраняет состояние между строками.'
      ),
      seeAlso: [
        L('Section 3-2: the Unix text toolbox', 'Секция 3-2: текстовый набор Unix'),
        L('Section 3-4: jq for structured data', 'Секция 3-4: jq и структурированные данные'),
      ],
    },
    {
      id: 'cli-ch3-s4',
      title: L('jq for structured data', 'jq для структурированных данных'),
      body: L(
        'Text tools work on lines and know nothing about structure. JSON is structured, so it deserves a tool that understands it. jq takes a JSON document, applies a filter to it and prints the result. The filter language is small and composable: a leading dot reads a field, the iteration suffix walks an array, and the pipe feeds one result into the next filter.\n\nThe filters that do real work are select, which keeps only the values that satisfy a condition, and the comparison operators that work on numbers inside the document. A filter that walks an array, keeps the expensive entries and prints their names is three filters joined by pipes, and the aggregate that reduces an array of numbers to a total is a single filter too.\n\nThe flags change how the output looks and how the input is read. The raw flag prints strings without the surrounding quotes, which is what makes jq usable in a pipeline with the text tools. The compact flag removes the extra whitespace, the slurp flag reads a stream of documents into one array, and the argument options inject values from the command line so a filter can be parameterised.\n\njq is also a validator and a converter. A malformed document makes jq exit with a non-zero code and print a parse error, which turns it into a cheap check in a script. And because it reads and writes JSON, it converts between formats: a filter can produce CSV, and jq reads JSON Lines, one document per line, which is the format most logs and stream APIs use.',
        'Текстовые инструменты работают со строками и ничего не знают о структуре. JSON структурирован, поэтому ему нужен инструмент, который эту структуру понимает. jq берёт документ JSON, применяет к нему фильтр и печатает результат. Язык фильтров маленький и составной: ведущая точка читает поле, суффикс обхода проходит по массиву, а вертикальная черта передаёт результат в следующий фильтр.\n\nФильтры, которые делают настоящую работу, это select, оставляющий только значения, удовлетворяющие условию, и операторы сравнения, работающие по числам внутри документа. Фильтр, который проходит по массиву, оставляет дорогие записи и печатает их названия, — это три фильтра, соединённые чертами, а агрегат, сводящий массив чисел к сумме, — это один фильтр.\n\nФлаги меняют вид вывода и способ чтения входа. Флаг сырого вывода печатает строки без обрамляющих кавычек, и именно он делает jq пригодным для конвейера с текстовыми инструментами. Флаг компактности убирает лишние пробелы, флаг slurp читает поток документов в один массив, а опции аргументов подставляют значения из командной строки, чтобы фильтр можно было параметризовать.\n\njq — ещё и валидатор, и конвертер. Некорректный документ заставляет jq выйти с ненулевым кодом и напечатать ошибку разбора, что превращает его в дешёвую проверку в скрипте. А поскольку он читает и пишет JSON, он конвертирует форматы: фильтр может выдать CSV, а jq читает JSON Lines, по одному документу в строке, — формат, который используют большинство логов и потоковых API.'
      ),
      bullets: [
        L('A leading dot reads a field, the iteration suffix walks an array.', 'Ведущая точка читает поле, суффикс обхода проходит по массиву.'),
        L('select keeps the values that satisfy a condition.', 'select оставляет значения, удовлетворяющие условию.'),
        L('The raw flag prints strings without quotes, so the output can be piped.', 'Флаг сырого вывода печатает строки без кавычек, и вывод можно передать дальше.'),
        L('The slurp flag reads a stream of documents into one array.', 'Флаг slurp читает поток документов в один массив.'),
        L('A malformed document makes jq exit non-zero, which makes it a validator.', 'Некорректный документ даёт ненулевой код выхода, поэтому jq работает и как валидатор.'),
      ],
      code: `# Read a field
curl -fsSL https://api.example.com/user | jq -r '.name'

# Filter and format
jq '.items[] | select(.price > 100) | .name' orders.json

# Aggregate
jq '[.items[].amount] | add' invoice.json

# Parameters and formats
jq -r --arg status "failed" '.[] | select(.status == \$status)' jobs.json
jq -c '.items[]' orders.json
jq -r '.[] | @csv' rows.json > rows.csv`,
      table: {
        caption: L('Common jq filters', 'Частые фильтры jq'),
        headers: [L('Task', 'Задача'), L('Filter', 'Фильтр'), L('Note', 'Замечание')],
        rows: [
          [L('read a field', 'прочитать поле'), L('.name', '.name'), L('the dot means the current value', 'точка означает текущее значение')],
          [L('iterate an array', 'пройти по массиву'), L('.items[]', '.items[]'), L('the empty brackets mean every element', 'пустые скобки — каждый элемент')],
          [L('keep what matches', 'оставить подходящее'), L('select(.price > 100)', 'select(.price > 100)'), L('works inside a pipe', 'работает внутри конвейера')],
          [L('aggregate numbers', 'свести числа'), L('add', 'add'), L('also min, max and length', 'также min, max и length')],
          [L('print plain text', 'напечатать обычный текст'), L('-r with a string filter', '-r со строковым фильтром'), L('without it you get quoted JSON', 'без него получаете JSON в кавычках')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('jq as a pretty printer and a checker', 'jq как pretty-printer и проверка'),
          text: L(
            'Running jq with a filter of a single dot pretty-prints a document and shows its real structure, which is the fastest way to learn an unfamiliar API. The same command on a broken file prints a parse error and exits non-zero, so it doubles as a validation step in a script.',
            'Запуск jq с фильтром из одной точки pretty-печатает документ и показывает его настоящую структуру — самый быстрый способ разобраться в незнакомом API. Та же команда на сломанном файле напечатает ошибку разбора и выйдет с ненулевым кодом, то есть работает и как проверка в скрипте.'
          ),
        },
      ],
      takeaway: L(
        'Reach for jq when the data has structure: it filters, validates and converts JSON, and the raw flag is what makes its output usable by the text tools.',
        'Берите jq, когда данные имеют структуру: он фильтрует, проверяет и конвертирует JSON, а флаг сырого вывода делает его результат пригодным для текстовых инструментов.'
      ),
      seeAlso: [
        L('Section 3-3: sed and awk', 'Секция 3-3: sed и awk'),
        L('Section 7-5: talking to databases from the terminal', 'Секция 7-5: работа с базами данных из терминала'),
      ],
    },
    {
      id: 'cli-ch3-s5',
      title: L('tee and process substitution', 'tee и подстановка процессов'),
      body: L(
        'Sometimes a pipeline needs to go to two places at once: into the next tool and into a file. That is what tee does. It copies its input to its output and to every file named on the command line, so downloading a page through tee saves the page and still lets the next filter work on it. The append option adds to the file instead of replacing it, and tee with no file names is a pure pass-through that still shows the data.\n\nProcess substitution goes the other way: it makes the output of a command look like a file. The input form gives you a path that reads from the command, and the output form gives you a path you can write to. Comparing two sorted versions without creating temporary files is the classic use, and a command that compresses what you write is the other.\n\nUnderneath, process substitution creates a named pipe or a file descriptor in a special directory, so the data never touches the disk in the ordinary case. It is powerful, but it is not POSIX: it works in bash, ksh and zsh, and not in dash or in a script that has to run under the plain shell. The shebang line decides which shell runs the script and therefore which features are available.\n\nWhen several processes need to read the same stream, a FIFO is the tool. The command that creates it makes a special file in the filesystem, and any process can open it for reading or writing, which turns a pipeline into something that can be split across separate commands or even separate terminals. The classic mistake is opening a FIFO for writing before a reader exists, because the open call blocks until someone reads.',
        'Иногда конвейеру нужно попасть сразу в два места: и в следующий инструмент, и в файл. Для этого и нужен tee: он копирует вход в выход и во все файлы, перечисленные в командной строке, так что загрузка страницы через tee сохраняет страницу и одновременно позволяет следующему фильтру с ней работать. Опция дописывания добавляет в файл вместо замены, а tee без имён файлов — чистый транзит, который всё равно показывает данные.\n\nПодстановка процессов работает в другую сторону: она делает вывод команды похожим на файл. Форма для чтения даёт путь, который читает из команды, а форма для записи — путь, в который можно писать. Классическое применение — сравнить две отсортированные версии без временных файлов, а второе — команда, сжимающая всё записанное.\n\nПод капотом подстановка процессов создаёт именованный канал или файловый дескриптор в специальном каталоге, так что в обычном случае данные не попадают на диск. Мощно, но это не POSIX: работает в bash, ksh и zsh и не работает в dash или в скрипте, который обязан выполняться обычной оболочкой. Строка shebang решает, какая оболочка запустит скрипт, а значит и какие возможности доступны.\n\nКогда один и тот же поток нужен нескольким процессам, инструментом становится FIFO. Команда создания делает в файловой системе особый файл, и его может открыть на чтение или запись любой процесс, что превращает конвейер в нечто, разделённое между отдельными командами или даже отдельными терминалами. Классическая ошибка — открыть FIFO на запись раньше, чем появился читатель, потому что вызов open блокируется до появления читателя.'
      ),
      bullets: [
        L('tee copies the input to the output and to every file it is given.', 'tee копирует вход в вывод и во все указанные файлы.'),
        L('The append option adds to the file instead of replacing it.', 'Опция дописывания добавляет в файл вместо замены.'),
        L('Process substitution makes the output of a command look like a file.', 'Подстановка процессов делает вывод команды похожим на файл.'),
        L('It is not POSIX and needs bash, ksh or zsh.', 'Это не POSIX, нужны bash, ksh или zsh.'),
        L('A FIFO blocks on open until the other side appears.', 'FIFO блокируется на open, пока не появится другая сторона.'),
      ],
      code: `# See the data and keep a copy
curl -fsSL https://example.com | tee page.html | grep -c "<a "

# Append to the log instead of replacing it
./deploy.sh 2>&1 | tee -a deploy.log

# Compare without temporary files
diff <(sort old.txt) <(sort new.txt)

# Compress what you write
tar -c -f - ./data | tee >(gzip > data.tar.gz) > /dev/null

# A FIFO shared between two commands
mkfifo events
tail -f app.log > events &
while read -r line; do echo "got: \$line"; done < events`,
      table: {
        caption: L('Ways to duplicate and to fake a file', 'Способы размножить поток и сыграть в файл'),
        headers: [L('Mechanism', 'Механизм'), L('Direction', 'Направление'), L('Use', 'Когда применять')],
        rows: [
          [L('tee', 'tee'), L('input to output and files', 'вход в выход и в файлы'), L('save the data and display it', 'сохранить и показать')],
          [L('<(command)', '<(command)'), L('read', 'чтение'), L('a file that is really a command', 'файл, который на самом деле команда')],
          [L('>(command)', '>(command)'), L('write', 'запись'), L('a file that is really a command', 'файл, который на самом деле команда')],
          [L('FIFO', 'FIFO'), L('both', 'в обе стороны'), L('sharing one stream between processes', 'общий поток между процессами')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Process substitution is not POSIX', 'Подстановка процессов — не POSIX'),
          text: L(
            'A script that starts with the plain shell shebang runs under dash on many systems, where process substitution does not exist and the script fails with a syntax error. Use the bash shebang when you rely on it, or rewrite the construct with temporary files.',
            'Скрипт со строкой shebang обычной оболочки на многих системах выполняется под dash, где подстановки процессов нет, и скрипт падает с синтаксической ошибкой. Указывайте shebang с bash, если на неё опираетесь, либо перепишите конструкцию через временные файлы.'
          ),
        },
      ],
      takeaway: L(
        'Use tee when the data must go to a file and to the next tool at once, and process substitution when a command output has to look like a file.',
        'Используйте tee, когда данные должны попасть и в файл, и в следующий инструмент, и подстановку процессов, когда вывод команды должен выглядеть как файл.'
      ),
      seeAlso: [
        L('Section 3-6: pipes, exit statuses and pipefail', 'Секция 3-6: конвейеры, коды возврата и pipefail'),
        L('Section 6-6: reading files and processing lines', 'Секция 6-6: чтение файлов и обработка строк'),
      ],
    },
    {
      id: 'cli-ch3-s6',
      title: L('Pipes, exit statuses and pipefail', 'Конвейеры, коды возврата и pipefail'),
      body: L(
        'A pipe connects the output of one process to the input of the next, and the shell runs the stages concurrently, not one after another. That concurrency is the point: the sorting of a big file overlaps with the counting and the trimming. The price is that the stages lose the ability to see each other status codes, because the shell reports only the status of the last command in the list.\n\nThat default is a trap in scripts. A pipeline whose first stage fails but whose last stage succeeds exits with zero, so the pipeline looks successful to whatever called it. The pipefail option changes the rule: the status of the pipeline becomes the last non-zero status of any stage, so the failure propagates. The PIPESTATUS variable holds the individual statuses in bash right after the pipeline, and it is how you learn which stage broke.\n\nThe other end of the contract is that a stage which stops reading closes the pipe, and the writer receives the broken pipe signal. Piping a search into head is the normal case: the search process is killed after the first few lines, which is why some tools print a broken pipe message when you stop reading early. It is not a bug in the search, and pipefail turns that kill into a reported failure, which is worth knowing before you add the option to a script.\n\nA pipeline is only as good as its weakest stage, and the stages should be independent. A classic mistake is counting the lines that match a pattern in a file that does not exist: with the default rules the pipeline succeeds with the count zero, because the counting stage had nothing to count. The habit worth building is to check the inputs, not to rely on the output of the last stage to reveal that something upstream failed.',
        'Конвейер соединяет выход одного процесса со входом следующего, и оболочка выполняет стадии параллельно, а не по очереди. В этом и смысл: сортировка большого файла идёт одновременно с подсчётом и обрезкой. Цена в том, что стадии теряют доступ к кодам возврата друг друга, потому что оболочка сообщает только код последней команды в списке.\n\nЭто умолчание — ловушка в скриптах. Конвейер, у которого первая стадия упала, а последняя прошла, выходит с нулём, и для вызывающей стороны он выглядит успешным. Опция pipefail меняет правило: код конвейера становится последним ненулевым кодом любой стадии, и сбой распространяется дальше. Переменная PIPESTATUS хранит коды отдельных стадий в bash сразу после конвейера, и по ней видно, какая стадия сломалась.\n\nДругой конец контракта: стадия, которая перестала читать, закрывает канал, и писатель получает сигнал разрыва канала. Конвейер из поиска в head — обычный случай: процесс поиска убивается после первых строк, поэтому некоторые инструменты печатают сообщение о разрыве канала, когда вы прекращаете читать. Это не баг поиска, а pipefail превращает такое убийство в сообщаемую ошибку — стоит знать это, прежде чем включать опцию в скрипте.\n\nКонвейер хорош настолько, насколько хороша его слабейшая стадия, и стадии должны быть независимы. Классическая ошибка — посчитать строки, подходящие под образец, в несуществующем файле: по умолчанию конвейер завершится успешно с нулём, потому что считать было нечего. Полезная привычка — проверять входные данные, а не ждать, что вывод последней стадии выдаст сбой выше по конвейеру.'
      ),
      bullets: [
        L('A pipe runs the stages concurrently and connects output to input.', 'Конвейер выполняет стадии параллельно и соединяет вывод со входом.'),
        L('Without pipefail a pipeline reports only the status of the last command.', 'Без pipefail конвейер сообщает только код последней команды.'),
        L('pipefail makes any failing stage fail the whole pipeline.', 'pipefail заставляет любую упавшую стадию провалить весь конвейер.'),
        L('PIPESTATUS holds the individual stage statuses in bash.', 'PIPESTATUS хранит коды отдельных стадий в bash.'),
        L('A producer killed by a closed pipe may report a broken pipe.', 'Производитель, убитый закрытым каналом, может сообщить о разрыве канала.'),
      ],
      code: `# The default hides the failure
false | true
echo \$?          # 0

# pipefail propagates it
set -o pipefail
false | true
echo \$?          # 1

# Which stage failed
grep -c pattern file.txt | sort -rn
echo "\${PIPESTATUS[@]}"   # status of each stage`,
      table: {
        caption: L('Who decides the status of a pipeline', 'Кто определяет код конвейера'),
        headers: [L('Setting', 'Настройка'), L('Status of the pipeline', 'Код конвейера')],
        rows: [
          [L('default', 'по умолчанию'), L('the status of the last command', 'код последней команды')],
          [L('set -o pipefail', 'set -o pipefail'), L('the last non-zero status of any stage', 'последний ненулевой код любой стадии')],
          [L('PIPESTATUS', 'PIPESTATUS'), L('the status of every stage, one element each', 'код каждой стадии по элементу')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The pipeline that always succeeds', 'Конвейер, который всегда успешен'),
          text: L(
            'The command curl -fsSL url | jq . reports the status of jq, not of curl, so a failed download produces an empty result and a zero exit code. With pipefail the pipeline reports the real failure, and that is the version to put in a script.',
            'Команда curl -fsSL url | jq . сообщает код jq, а не curl, поэтому неудачная загрузка даёт пустой результат и нулевой код выхода. С pipefail конвейер сообщит настоящий сбой — именно такую версию и стоит класть в скрипт.'
          ),
        },
      ],
      takeaway: L(
        'Add set -o pipefail to every script, because a pipeline that reports only the last status hides the failure you care about.',
        'Добавляйте set -o pipefail в каждый скрипт: конвейер, сообщающий только последний код, скрывает именно тот сбой, который вас интересует.'
      ),
      seeAlso: [
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
        L('Section 6-2: set -euo pipefail and safe scripts', 'Секция 6-2: set -euo pipefail и безопасные скрипты'),
      ],
    },
  ],
};
