import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliModule: Module = {
  id: 'cli',
  title: L('Command Line', 'Командная строка'),
  description: L('Linux/bash essentials.', 'Основы Linux/bash.'),
  lessons: [
    { id: 'cli-001', title: L('Current directory', 'Текущая директория'), question: L('How to print working directory?', 'Как вывести текущую директорию?'), answer: L('pwd prints absolute path of current working directory.', 'pwd выводит абсолютный путь текущей рабочей директории.'), code: 'pwd' },
    { id: 'cli-002', title: L('List files', 'Список файлов'), question: L('How to list directory contents?', 'Как вывести содержимое директории?'), answer: L('ls lists entries; -l long format, -a include hidden, -h human sizes.', 'ls выводит записи; -l подробный формат, -a скрытые, -h человекочитаемые размеры.'), code: 'ls -lah' },
    { id: 'cli-003', title: L('Change directory', 'Смена директории'), question: L('How to change directory?', 'Как сменить директорию?'), answer: L('cd <path>. cd ~ home, cd - previous, cd .. parent.', 'cd <path>. cd ~ домой, cd - предыдущая, cd .. родительская.'), code: 'cd /var/log\ncd ~\ncd -' },
    { id: 'cli-004', title: L('Create directory', 'Создание директории'), question: L('How to create directories?', 'Как создать директории?'), answer: L('mkdir <dir>; -p creates parents; -m sets mode.', 'mkdir <dir>; -p создаёт родителей; -m задаёт права.'), code: 'mkdir -p project/src/components' },
    { id: 'cli-005', title: L('Create file', 'Создание файла'), question: L('How to create empty file or update timestamp?', 'Как создать пустой файл или обновить метку времени?'), answer: L('touch creates file or updates mtime/atime.', 'touch создаёт файл или обновляет mtime/atime.'), code: 'touch notes.txt' },
    { id: 'cli-006', title: L('Remove files', 'Удаление файлов'), question: L('How to remove files safely?', 'Как безопасно удалять файлы?'), answer: L('rm <file>; -r recursive, -f force, -i interactive. Use trash-cli to avoid permanent delete.', 'rm <file>; -r рекурсивно, -f принудительно, -i интерактивно. Используйте trash-cli, чтобы избежать необратимого удаления.'), code: 'rm -i *.log' },
    { id: 'cli-007', title: L('Find files', 'Поиск файлов'), question: L('How to find files by name/type?', 'Как искать файлы по имени/типу?'), answer: L('find <path> -name "*.log" -type f. -mtime, -size filters. -exec runs command.', 'find <path> -name "*.log" -type f. Фильтры -mtime, -size. -exec выполняет команду.'), code: 'find . -type f -name "*.ts"\nfind /var/log -name "*.log" -mtime +7' },
    { id: 'cli-008', title: L('View file', 'Просмотр файла'), question: L('How to view file contents?', 'Как просмотреть содержимое файла?'), answer: L('cat prints whole file; less pager for large; more basic pager.', 'cat выводит весь файл; less для больших; more базовый пейджер.'), code: 'cat README.md\nless /var/log/syslog' },
    { id: 'cli-009', title: L('chmod symbolic', 'chmod символически'), question: L('How to change permissions symbolically?', 'Как менять права символически?'), answer: L('chmod u+x,g-w,o=r file. u/g/o/a, +/-/=, r/w/x.', 'chmod u+x,g-w,o=r file. u/g/o/a, +/-/=, r/w/x.'), code: 'chmod u+x script.sh' },
    { id: 'cli-010', title: L('chmod numeric', 'chmod численно'), question: L('How to change permissions numerically?', 'Как менять права численно?'), answer: L('chmod 755 file: 7=rwx,5=r-x,5=r-x. 664 common for files.', 'chmod 755 file: 7=rwx,5=r-x,5=r-x. 664 часто для файлов.'), code: 'chmod 644 config.yml\nchmod 755 script.sh' },
    { id: 'cli-011', title: L('umask', 'umask'), question: L('What is umask?', 'Что такое umask?'), answer: L('umask sets default permission mask for new files/dirs.', 'umask задаёт маску прав по умолчанию для новых файлов/каталогов.'), code: 'umask\numask 022' },
    { id: 'cli-012', title: L('id/whoami', 'id/whoami'), question: L('How to inspect current user?', 'Как проверить текущего пользователя?'), answer: L('whoami username; id uid/gid/groups.', 'whoami имя; id uid/gid/группы.'), code: 'id\nwhoami' },
    { id: 'cli-013', title: L('Process list', 'Список процессов'), question: L('How to list processes?', 'Как вывести процессы?'), answer: L('ps aux all processes; ps -ef. Filter with grep.', 'ps aux все процессы; ps -ef. Фильтруйте grep.'), code: 'ps aux | grep nginx' },
    { id: 'cli-014', title: L('kill', 'kill'), question: L('How to terminate process?', 'Как завершить процесс?'), answer: L('kill <pid> SIGTERM; kill -9 SIGKILL; kill -HUP reload.', 'kill <pid> SIGTERM; kill -9 SIGKILL; kill -HUP перезагрузка.'), code: 'kill 1234\nkill -9 1234' },
    { id: 'cli-015', title: L('nohup', 'nohup'), question: L('How to keep process after logout?', 'Как сохранить процесс после выхода?'), answer: L('nohup <cmd> & ignores SIGHUP; output to nohup.out.', 'nohup <cmd> & игнорирует SIGHUP; вывод в nohup.out.'), code: 'nohup python app.py > app.log 2>&1 &' },
    { id: 'cli-016', title: L('xargs', 'xargs'), question: L('How to build commands from stdin?', 'Как строить команды из stdin?'), answer: L('xargs passes input as args; -0 for null-delimited; -P parallel.', 'xargs передаёт ввод как аргументы; -0 для null; -P параллельно.'), code: 'find . -name "*.log" -print0 | xargs -0 rm' },
    { id: 'cli-017', title: L('Pipe', 'Пайп'), question: L('What does pipe do?', 'Что делает пайп?'), answer: L('| connects stdout of left command to stdin of right.', '| соединяет stdout левой команды со stdin правой.'), code: 'ls | grep .ts\ncat file | sort | uniq' },
    { id: 'cli-018', title: L('Redirect stdout', 'Перенаправление stdout'), question: L('How to redirect output to file?', 'Как перенаправить вывод в файл?'), answer: L('> overwrite, >> append.', '> перезапись, >> добавление.'), code: 'echo hi > out.txt\necho hi >> out.txt' },
    { id: 'cli-019', title: L('Redirect stderr', 'Перенаправление stderr'), question: L('How to redirect stderr?', 'Как перенаправить stderr?'), answer: L('2> file; 2>&1 merge stderr into stdout.', '2> file; 2>&1 объединить stderr со stdout.'), code: 'cmd 2> err.log\ncmd > out.log 2>&1' },
    { id: 'cli-020', title: L('grep', 'grep'), question: L('How to search text in files?', 'Как искать текст в файлах?'), answer: L('grep pattern file; -r recursive, -i ignore case, -n line nums, -v invert, -E regex.', 'grep pattern file; -r рекурсивно, -i без регистра, -n номера, -v инверсия, -E regex.'), code: 'grep -rn "TODO" src/' },
    { id: 'cli-021', title: L('ripgrep', 'ripgrep'), question: L('What is rg?', 'Что такое rg?'), answer: L('ripgrep fast recursive grep honoring .gitignore; rg pattern.', 'ripgrep быстрый рекурсивный grep с учётом .gitignore; rg pattern.'), code: 'rg "TODO" --type ts' },
    { id: 'cli-022', title: L('sed substitute', 'sed подстановка'), question: L('How to replace text with sed?', 'Как заменить текст sed?'), answer: L('sed "s/old/new/g" file. -i in-place.', 'sed "s/old/new/g" file. -i на месте.'), code: 'sed -i "s/foo/bar/g" file.txt' },
    { id: 'cli-023', title: L('awk fields', 'awk поля'), question: L('How to process columns with awk?', 'Как обрабатывать колонки awk?'), answer: L('awk "{print $1, $3}" file; -F delimiter.', 'awk "{print $1, $3}" file; -F разделитель.'), code: 'awk -F: "{print $1, $3}" /etc/passwd' },
    { id: 'cli-024', title: L('sort', 'sort'), question: L('How to sort lines?', 'Как сортировать строки?'), answer: L('sort file; -n numeric, -r reverse, -u unique, -k key.', 'sort file; -n числовой, -r обратный, -u уникальный, -k ключ.'), code: 'sort -n -k2 data.txt' },
    { id: 'cli-025', title: L('SSH connect', 'SSH подключение'), question: L('How to connect via SSH?', 'Как подключиться по SSH?'), answer: L('ssh user@host; -p port; -i key.', 'ssh user@host; -p порт; -i ключ.'), code: 'ssh alice@192.168.1.10 -p 2222' },
    { id: 'cli-026', title: L('rsync', 'rsync'), question: L('How to sync directories efficiently?', 'Как эффективно синхронизировать каталоги?'), answer: L('rsync -avz src/ dst/; --delete remove extras; -e ssh.', 'rsync -avz src/ dst/; --delete удаляет лишнее; -e ssh.'), code: 'rsync -avz --delete ./site/ user@host:/var/www/' },
    { id: 'cli-027', title: L('ping', 'ping'), question: L('How to test connectivity?', 'Как проверить связность?'), answer: L('ping host sends ICMP; -c count; -i interval.', 'ping host шлёт ICMP; -c количество; -i интервал.'), code: 'ping -c 4 google.com' },
    { id: 'cli-028', title: L('curl', 'curl'), question: L('How to make HTTP requests?', 'Как делать HTTP-запросы?'), answer: L('curl URL; -I headers; -X method; -d data; -H header; -o file.', 'curl URL; -I заголовки; -X метод; -d данные; -H заголовок; -o файл.'), code: 'curl -s https://api.example.com | jq .\ncurl -X POST -H "Content-Type: application/json" -d \'{"a":1}\' URL' },
    { id: 'cli-029', title: L('ss/netstat', 'ss/netstat'), question: L('How to inspect sockets?', 'Как проверять сокеты?'), answer: L('ss -tulnp shows listening TCP/UDP with processes; netstat legacy.', 'ss -tulnp показывает слушающие TCP/UDP с процессами; netstat устарел.'), code: 'ss -tulnp' },
    { id: 'cli-030', title: L('DNS lookup', 'DNS-запрос'), question: L('How to query DNS?', 'Как делать DNS-запросы?'), answer: L('dig domain; nslookup; host. dig +short concise.', 'dig domain; nslookup; host. dig +short кратко.'), code: 'dig example.com +short\nnslookup example.com' },
    { id: 'cli-031', title: L('tar create', 'tar создание'), question: L('How to create tar archive?', 'Как создать tar-архив?'), answer: L('tar -czf archive.tar.gz dir; -c create, -z gzip, -f file.', 'tar -czf archive.tar.gz dir; -c создать, -z gzip, -f файл.'), code: 'tar -czf backup.tar.gz project/' },
    { id: 'cli-032', title: L('apt', 'apt'), question: L('How to manage packages on Debian/Ubuntu?', 'Как управлять пакетами в Debian/Ubuntu?'), answer: L('apt update; apt install pkg; apt remove; apt search; apt upgrade.', 'apt update; apt install pkg; apt remove; apt search; apt upgrade.'), code: 'sudo apt update && sudo apt install nginx' },
    { id: 'cli-033', title: L('systemctl status', 'systemctl status'), question: L('How to check service status?', 'Как проверить статус сервиса?'), answer: L('systemctl status nginx; is-active; is-enabled.', 'systemctl status nginx; is-active; is-enabled.'), code: 'systemctl status ssh' },
    { id: 'cli-034', title: L('Environment variables', 'Переменные окружения'), question: L('How to set and use env vars?', 'Как задавать и использовать env vars?'), answer: L('export VAR=value; echo $VAR; unset VAR. env/printenv list.', 'export VAR=value; echo $VAR; unset VAR. env/printenv список.'), code: 'export API_KEY=secret\necho $API_KEY' },
    { id: 'cli-035', title: L('PATH', 'PATH'), question: L('What is PATH?', 'Что такое PATH?'), answer: L('Colon-separated dirs searched for commands. Add with export PATH=$PATH:/new.', 'Каталоги через двоеточие для поиска команд. Добавляйте export PATH=$PATH:/new.'), code: 'echo $PATH\nexport PATH="$HOME/bin:$PATH"' },
    { id: 'cli-036', title: L('history', 'history'), question: L('How to use command history?', 'Как использовать историю команд?'), answer: L('history list; !n run; !! last; Ctrl+R search; HISTSIZE/HISTFILE.', 'history список; !n выполнить; !! последняя; Ctrl+R поиск; HISTSIZE/HISTFILE.'), code: 'history | tail -20\n!!' },
    { id: 'cli-037', title: L('at', 'at'), question: L('How to run one-time task later?', 'Как запланировать одноразовую задачу?'), answer: L('at 14:00 then commands; atq list; atrm remove.', 'at 14:00 затем команды; atq список; atrm удалить.'), code: 'echo "/script.sh" | at 23:30' },
    { id: 'cli-038', title: L('Disk usage df', 'Использование диска df'), question: L('How to check free disk space?', 'Как проверить свободное место на диске?'), answer: L('df -h filesystem usage; df -i inodes.', 'df -h использование ФС; df -i inodes.'), code: 'df -h' },
    { id: 'cli-039', title: L('Directory size du', 'Размер директории du'), question: L('How to check directory size?', 'Как проверить размер директории?'), answer: L('du -sh dir; du -h --max-depth=1.', 'du -sh dir; du -h --max-depth=1.'), code: 'du -sh /var/log\ndu -h --max-depth=1 /' },
    { id: 'cli-040', title: L('blkid', 'blkid'), question: L('How to get UUID?', 'Как получить UUID?'), answer: L('blkid shows UUID and filesystem type.', 'blkid показывает UUID и тип ФС.'), code: 'blkid' },
    { id: 'cli-041', title: L('Shell variables', 'Переменные шелла'), question: L('How to use shell variables?', 'Как использовать переменные шелла?'), answer: L('VAR=value (no spaces); $VAR or ${VAR}; readonly; local in functions.', 'VAR=value (без пробелов); $VAR или ${VAR}; readonly; local в функциях.'), code: 'name="Alice"\necho "Hello, $name"' },
    { id: 'cli-042', title: L('Quoting', 'Кавычки'), question: L('Single vs double quotes?', 'Одинарные vs двойные кавычки?'), answer: L('Single quotes preserve literal; double allow expansion ($, `, \\).', 'Одинарные сохраняют буквально; двойные позволяют расширение ($, `, \\).'), code: 'echo \'$HOME\'\necho "$HOME"' },
    { id: 'cli-043', title: L('Test command', 'Команда test'), question: L('How to test conditions?', 'Как проверять условия?'), answer: L('test or [ ]; [[ ]] bash. -f file, -d dir, -z str, -eq num.', 'test или [ ]; [[ ]] bash. -f файл, -d каталог, -z строка, -eq число.'), code: 'if [ -f file.txt ]; then echo yes; fi' },
    { id: 'cli-044', title: L('Exit codes', 'Коды выхода'), question: L('How to check exit status?', 'Как проверять код выхода?'), answer: L('$? holds last exit code; 0 success. set -e exits on error.', '$? хранит последний код; 0 успех. set -e выход при ошибке.'), code: 'cmd\nif [ $? -ne 0 ]; then echo fail; fi' },
    { id: 'cli-045', title: L('read input', 'read ввод'), question: L('How to read user input?', 'Как читать ввод пользователя?'), answer: L('read -p "prompt" var; read -s secret; IFS= read -r.', 'read -p "prompt" var; read -s secret; IFS= read -r.'), code: 'read -p "Name: " name\necho "Hi $name"' },

  ],
  quiz: [
    {
      id: 'cli-q01',
      question: L('What does `cd -` do in bash?', 'Что делает `cd -` в bash?'),
      options: [
        L('Goes to the home directory of the current user', 'Переходит в домашний каталог текущего пользователя'),
        L('Goes up one level to the parent directory', 'Поднимается на уровень выше, в родительский каталог'),
        L('Returns to the directory you were in before the last cd', 'Возвращает в каталог, где вы были до последнего cd'),
        L('Lists the directories that are listed in PATH', 'Показывает каталоги, перечисленные в PATH')
      ],
      correctIndex: 2,
      explanation: L(
        'The shell remembers the previous working directory and `cd -` swaps the current one with it, which makes it the fastest way back. `cd ~` goes home, `cd ..` goes to the parent, and PATH has nothing to do with navigating directories.',
        'Оболочка помнит предыдущий рабочий каталог, и `cd -` меняет текущий местами — это самый быстрый способ вернуться. `cd ~` идёт домой, `cd ..` — в родительский каталог, а PATH к навигации по каталогам отношения не имеет.'
      ),
    },
    {
      id: 'cli-q02',
      question: L(
        'Which command shows the directory entries with the permissions, including the hidden files, and with the sizes in a human readable form?',
        'Какая команда показывает содержимое каталога с правами, включая скрытые файлы, и с размерами в человекочитаемом виде?'
      ),
      options: [
        L('ls -lah', 'ls -lah'),
        L('ls -l', 'ls -l'),
        L('ls -a', 'ls -a'),
        L('ls -lh', 'ls -lh')
      ],
      correctIndex: 0,
      explanation: L(
        'The -l flag gives the long format with the permissions and the owner, -a adds the entries whose name starts with a dot, and -h prints the sizes as 12K instead of a number of bytes. None of the other combinations shows all three at once.',
        'Флаг -l даёт подробный формат с правами и владельцем, -a добавляет записи, имя которых начинается с точки, а -h печатает размеры как 12K, а не число байтов. Ни одна из других комбинаций не показывает всё сразу.'
      ),
    },
    {
      id: 'cli-q03',
      question: L(
        'What does `mkdir -p project/src/components` do when the directories already exist?',
        'Что делает `mkdir -p project/src/components`, если каталоги уже существуют?'
      ),
      options: [
        L('It creates the missing parent directories and finishes without an error', 'Создаёт недостающие родительские каталоги и завершается без ошибки'),
        L('It fails with an error because the target directory is already there', 'Падает с ошибкой, потому что целевой каталог уже есть'),
        L('It removes the old directories and creates them from scratch', 'Удаляет старые каталоги и создаёт их заново'),
        L('It asks whether the existing directories should be overwritten', 'Спрашивает, нужно ли перезаписать существующие каталоги')
      ],
      correctIndex: 0,
      explanation: L(
        'The -p flag creates every missing parent directory and does not fail when the target is already there, which makes it safe to run in a script. A plain mkdir exits with an error in that case.',
        'Флаг -p создаёт все недостающие родительские каталоги и не падает, если цель уже существует, поэтому его безопасно звать в скрипте. Обычный mkdir в таком случае завершается с ошибкой.'
      ),
    },
    {
      id: 'cli-q04',
      question: L('What does `touch notes.txt` do when the file already exists?', 'Что делает `touch notes.txt`, если файл уже есть?'),
      options: [
        L('It deletes the content of the file', 'Удаляет содержимое файла'),
        L('It appends an empty line to the end of the file', 'Дописывает пустую строку в конец файла'),
        L('It adds the execute permission to the file', 'Добавляет к файлу право на выполнение'),
        L('It updates the access and modification times and leaves the content alone', 'Обновляет время доступа и изменения, а содержимое не трогает')
      ],
      correctIndex: 3,
      explanation: L(
        'touch creates the file when it is missing and otherwise only refreshes the timestamps, which is exactly what a build script wants in order to trigger a rebuild. It never truncates the file — that is what the single angle bracket does.',
        'touch создаёт файл, если его нет, а иначе только обновляет метки времени — именно это нужно сборочному скрипту, чтобы пересобрать проект. Он никогда не обрезает файл, это делает одиночный знак «больше».'
      ),
    },
    {
      id: 'cli-q05',
      question: L(
        'You need to read a two gigabyte log file without flooding the terminal. Which command fits?',
        'Вам нужно прочитать двухгигабайтный лог, не завалив терминал выводом. Какая команда подходит?'
      ),
      options: [
        L('cat /var/log/app.log', 'cat /var/log/app.log'),
        L('less /var/log/app.log', 'less /var/log/app.log'),
        L('head -n 100 /var/log/app.log', 'head -n 100 /var/log/app.log'),
        L('sort -r /var/log/app.log', 'sort -r /var/log/app.log')
      ],
      correctIndex: 1,
      explanation: L(
        'less is a pager: it shows the file screen by screen, you can search inside it with the slash key and quit with q. cat would push the whole file into the terminal, head would only show the beginning, and sort reorders the lines instead of letting you read them.',
        'less — это пейджер: показывает файл по экранам, внутри можно искать клавишей слэш и выходить по q. cat вывалил бы весь файл в терминал, head дал бы только начало, а sort меняет порядок строк вместо того, чтобы дать их прочитать.'
      ),
    },
    {
      id: 'cli-q06',
      question: L('What does `mv -n old.txt new.txt` do when new.txt already exists?', 'Что делает `mv -n old.txt new.txt`, если new.txt уже существует?'),
      options: [
        L('It leaves the existing new.txt untouched and does nothing', 'Оставляет существующий new.txt нетронутым и ничего не делает'),
        L('It overwrites new.txt with the content of old.txt', 'Перезаписывает new.txt содержимым old.txt'),
        L('It renames new.txt to new.txt.bak and moves old.txt into its place', 'Переименовывает new.txt в new.txt.bak и переносит на его место old.txt'),
        L('It asks a question on the terminal and waits for an answer', 'Задаёт вопрос в терминале и ждёт ответа')
      ],
      correctIndex: 0,
      explanation: L(
        '-n means no clobber: the move is silently skipped when the target exists, which makes it the safe way to rename inside a script. The plain mv is the one that asks before it overwrites, and the backup copy is not created for you.',
        '-n означает no clobber: перемещение молча пропускается, если цель существует, поэтому это безопасный способ переименовывать в скрипте. Обычный mv как раз спрашивает перед перезаписью, и резервную копию за вас никто не делает.'
      ),
    },
    {
      id: 'cli-q07',
      question: L('What does the -i flag of rm change?', 'Что меняет флаг -i у rm?'),
      options: [
        L('It deletes the files without asking anything', 'Удаляет файлы, ничего не спрашивая'),
        L('It moves the files to the trash directory', 'Перемещает файлы в папку корзины'),
        L('It asks for a confirmation before every removal', 'Спрашивает подтверждение перед каждым удалением'),
        L('It deletes the directory together with everything inside it', 'Удаляет каталог вместе со всем, что внутри')
      ],
      correctIndex: 2,
      explanation: L(
        '-i makes rm ask before every file it removes, which is the safety belt for destructive commands. -f is the exact opposite and forces the deletion without any questions, while -r is the flag that makes the command recurse into the directories.',
        '-i заставляет rm спрашивать перед удалением каждого файла — это страховка для разрушительных команд. -f — полная противоположность, удаляет без вопросов, а -r отвечает за рекурсивный обход каталогов.'
      ),
    },
    {
      id: 'cli-q08',
      question: L('Why is `rm -rf /` or `rm -rf /*` treated as a catastrophic mistake?', 'Почему `rm -rf /` или `rm -rf /*` считают катастрофической ошибкой?'),
      options: [
        L('It follows the symbolic links and deletes the content of the other file systems', 'Идёт по симлинкам и удаляет содержимое других файловых систем'),
        L('It recursively removes the whole file system with no confirmation and no way back', 'Рекурсивно удаляет всю файловую систему без подтверждения и без возможности вернуть'),
        L('It only works as root and refuses to run otherwise', 'Работает только под root и отказывается запускаться иначе'),
        L('It moves the files to the trash, so the disk space is not actually freed', 'Переносит файлы в корзину, поэтому место на диске на самом деле не освобождается')
      ],
      correctIndex: 1,
      explanation: L(
        '-r walks into every subdirectory and -f removes the questions, so the entire tree disappears in one command. There is no undo, which is why the habit that saves you is to print the path with pwd or ls first and to keep a possibly empty variable out of rm.',
        '-r заходит в каждый подкаталог, а -f убирает вопросы, поэтому всё дерево исчезает одной командой. Отмены нет, поэтому спасает привычка сначала напечатать путь через pwd или ls и не подставлять в rm переменную, которая может оказаться пустой.'
      ),
    },
    {
      id: 'cli-q09',
      question: L('Why is `rm -rf $TARGET/` dangerous when the variable TARGET is not set?', 'Почему `rm -rf $TARGET/` опасно, если переменная TARGET не задана?'),
      options: [
        L('The shell refuses to run rm with a variable that is not set', 'Оболочка отказывается запускать rm с незаданной переменной'),
        L('The expansion collapses to nothing, so rm receives a bare slash and starts deleting the root', 'Развёртка схлопывается в пустоту, поэтому rm получает один слэш и начинает удалять корень'),
        L('The command is put on hold and runs as soon as TARGET gets a value', 'Команда откладывается и выполняется, как только у TARGET появится значение'),
        L('rm deletes the home directory of the current user instead of the root', 'rm удаляет домашний каталог текущего пользователя вместо корня')
      ],
      correctIndex: 1,
      explanation: L(
        'An unset variable expands to an empty string, so the command turns into `rm -rf /`. Quoting does not save you here, the danger is the missing value and not word splitting, so the real fix is to check that the variable is not empty before you use it.',
        'Незаданная переменная разворачивается в пустую строку, и команда превращается в `rm -rf /`. Кавычки тут не спасают: опасность в отсутствующем значении, а не в разбиении на слова, поэтому правильное решение — проверить, что переменная не пуста, перед использованием.'
      ),
    },
    {
      id: 'cli-q10',
      question: L('What is trash-cli for?', 'Для чего нужен trash-cli?'),
      options: [
        L('It deletes the files permanently and instantly', 'Удаляет файлы навсегда и мгновенно'),
        L('It shows which files take the most disk space', 'Показывает, какие файлы занимают больше всего места на диске'),
        L('It compresses the home directory into a backup archive', 'Сжимает домашний каталог в резервный архив'),
        L('It moves the deleted files to a trash directory, so they can still be restored', 'Переносит удалённые файлы в папку корзины, чтобы их можно было восстановить')
      ],
      correctIndex: 3,
      explanation: L(
        'trash-cli sends the file to a trash folder instead of unlinking it, so an accidental deletion can be undone. The plain rm removes the data for good, and the trash is only a safety net as long as the disk is not encrypted.',
        'trash-cli отправляет файл в папку корзины вместо удаления, поэтому случайное удаление можно отменить. Обычный rm стирает данные навсегда, а корзина — лишь страховка, пока диск не зашифрован.'
      ),
    },
    {
      id: 'cli-q11',
      question: L(
        'What is the real risk of running `sudo rm -rf /var/data` instead of `rm -rf /var/data`?',
        'В чём настоящий риск `sudo rm -rf /var/data` по сравнению с `rm -rf /var/data`?'
      ),
      options: [
        L('The command runs with root privileges, so a mistake in the path destroys protected data with no chance to recover', 'Команда выполняется с правами root, поэтому ошибка в пути уничтожает защищённые данные без шанса на восстановление'),
        L('sudo deletes the files without asking, while rm always asks', 'sudo удаляет файлы не спрашивая, а rm всегда спрашивает'),
        L('sudo cannot delete directories, only regular files', 'sudo не умеет удалять каталоги, только обычные файлы'),
        L('sudo makes the deletion permanent, while rm keeps a backup copy', 'sudo делает удаление окончательным, а rm сохраняет резервную копию')
      ],
      correctIndex: 0,
      explanation: L(
        'sudo only changes the privileges the command runs with, the command itself stays exactly the same. That means the dangerous part, the path, is not protected by anything, and root is able to remove files that the ordinary user could not touch at all.',
        'sudo меняет только привилегии, под которыми выполняется команда, сама команда остаётся точно такой же. Значит, опасная часть, а именно путь, ничем не защищена, а root способен удалить файлы, до которых обычный пользователь не дотянется.'
      ),
    },
    {
      id: 'cli-q12',
      question: L('What does `find . -type f -name "*.ts"` select?', 'Что выбирает `find . -type f -name "*.ts"`?'),
      options: [
        L('Every entry whose name ends with .ts, including the directories', 'Все записи, имя которых заканчивается на .ts, включая каталоги'),
        L('Every entry under the current directory, sorted by name', 'Все записи текущего каталога, отсортированные по имени'),
        L('Only the files whose content contains the text *.ts', 'Только файлы, содержимое которых содержит текст *.ts'),
        L('Only the regular files whose name ends with .ts', 'Только обычные файлы, имя которых заканчивается на .ts')
      ],
      correctIndex: 3,
      explanation: L(
        '-name matches the name of the entry with a shell pattern, and -type f keeps only the regular files, so a directory called something.ts is skipped. Without -type the directories come into the result as well.',
        '-name сопоставляет имя записи с шаблоном оболочки, а -type f оставляет только обычные файлы, поэтому каталог с именем вроде something.ts пропускается. Без -type в результат попадут и каталоги.'
      ),
    },
    {
      id: 'cli-q13',
      question: L('What does `find /var/log -name "*.log" -mtime +7` match?', 'Что находит `find /var/log -name "*.log" -mtime +7`?'),
      options: [
        L('The log files modified during the last seven days', 'Логи, изменённые за последние семь дней'),
        L('The log files that were last modified more than seven days ago', 'Логи, которые последний раз менялись больше семи дней назад'),
        L('The log files modified exactly seven days ago', 'Логи, изменённые ровно семь дней назад'),
        L('The log files modified during the last seven minutes', 'Логи, изменённые за последние семь минут')
      ],
      correctIndex: 1,
      explanation: L(
        '-mtime counts full 24 hour periods and the plus sign means strictly more than the given number, so +7 is older than a week. A leading minus means newer: -mtime -2 is the last 48 hours, and -mmin counts the minutes.',
        '-mtime считает полные сутки, а плюс означает строго больше указанного числа, поэтому +7 — старше недели. Минус означает «новее»: -mtime -2 — это последние 48 часов, а -mmin считает минуты.'
      ),
    },
    {
      id: 'cli-q14',
      question: L('In `find . -type f -size +100M`, what does +100M mean?', 'В `find . -type f -size +100M` что означает +100M?'),
      options: [
        L('The files that are larger than 100 megabytes', 'Файлы, которые больше 100 мегабайт'),
        L('The files that are smaller than 100 megabytes', 'Файлы, которые меньше 100 мегабайт'),
        L('The files that were modified 100 minutes ago', 'Файлы, изменённые 100 минут назад'),
        L('The first 100 files of every directory', 'Первые 100 файлов каждого каталога')
      ],
      correctIndex: 0,
      explanation: L(
        '-size compares the size of the entry and the plus sign means strictly greater than the threshold, so +100M selects the big files. Without a sign find reports exactly that size, and -mmin and -mtime have nothing to do with the size.',
        '-size сравнивает размер записи, а плюс означает строго больше порога, поэтому +100M выбирает большие файлы. Без знака find сообщает ровно такой размер, а -mmin и -mtime к размеру отношения не имеют.'
      ),
    },
    {
      id: 'cli-q15',
      question: L(
        'What is the difference between `find . -name "*.log" -exec rm {} +` and `-exec rm {} ;`?',
        'Чем отличается `find . -name "*.log" -exec rm {} +` от `-exec rm {} ;`?'
      ),
      options: [
        L('The + form builds one command with all the matches, the ; form starts a separate process for every file', 'Форма + собирает одну команду со всеми совпадениями, а форма ; запускает отдельный процесс на каждый файл'),
        L('The + form moves the files to the trash, the ; form deletes them for good', 'Форма + переносит файлы в корзину, а форма ; удаляет их навсегда'),
        L('The + form only lists the files, the ; form deletes them', 'Форма + только перечисляет файлы, а форма ; удаляет их'),
        L('There is no difference, both forms behave in exactly the same way', 'Разницы нет, обе формы ведут себя одинаково')
      ],
      correctIndex: 0,
      explanation: L(
        'With {} + find appends all the paths to a single command, which is much faster on thousands of files, while {} ; runs the command once per file. The + form is also the right one when the names contain spaces, because the paths stay separate arguments.',
        'С {} + find дописывает все пути в одну команду — это намного быстрее на тысячах файлов, тогда как {} ; запускает команду отдельно для каждого файла. Форма + подходит и для имён с пробелами: пути остаются отдельными аргументами.'
      ),
    },
    {
      id: 'cli-q16',
      question: L('What does the -r flag of grep do?', 'Что делает флаг -r у grep?'),
      options: [
        L('It prints the number of the matching lines instead of the lines', 'Печатает количество подошедших строк вместо самих строк'),
        L('It searches the given directory and all its subdirectories', 'Ищет в указанном каталоге и во всех его подкаталогах'),
        L('It inverts the match, so only the lines without the pattern are printed', 'Инвертирует совпадение, печатая только строки без шаблона'),
        L('It treats the pattern as a regular expression', 'Трактует шаблон как регулярное выражение')
      ],
      correctIndex: 1,
      explanation: L(
        '-r makes grep walk the directory tree, and -R additionally follows the symbolic links. The regular expression switch is -E, the counter is -c and the inversion is -v.',
        '-r заставляет grep обходить дерево каталогов, а -R вдобавок идёт по симлинкам. Переключатель на регулярные выражения — это -E, счётчик — -c, а инверсия — -v.'
      ),
    },
    {
      id: 'cli-q17',
      question: L('What does `grep -i "error" app.log` change compared to a plain grep?', 'Что меняет `grep -i "error" app.log` по сравнению с обычным grep?'),
      options: [
        L('It prints only the number of the matched lines', 'Печатает только количество подошедших строк'),
        L('It ignores the case of the letters', 'Игнорирует регистр букв'),
        L('It searches the file starting from the end', 'Ищет по файлу, начиная с конца'),
        L('It inverts the match and prints the lines without the word error', 'Инвертирует совпадение и печатает строки без слова error')
      ],
      correctIndex: 1,
      explanation: L(
        '-i makes the comparison case insensitive, so ERROR, Error and error all match. Counting the lines is -c, the inversion is -v, and grep never searches from the end of a file.',
        '-i делает сравнение регистронезависимым, поэтому подходят ERROR, Error и error. Считать строки — это -c, инверсия — -v, а с конца файла grep не ищет никогда.'
      ),
    },
    {
      id: 'cli-q18',
      question: L('What does `grep -v "DEBUG" app.log` print?', 'Что печатает `grep -v "DEBUG" app.log`?'),
      options: [
        L('Only the lines that contain DEBUG', 'Только строки, содержащие DEBUG'),
        L('Only the lines that do NOT contain DEBUG', 'Только строки, которые НЕ содержат DEBUG'),
        L('The number of the lines without DEBUG', 'Количество строк без DEBUG'),
        L('Only the lines that contain DEBUG, prefixed with their line numbers', 'Только строки с DEBUG и номерами этих строк')
      ],
      correctIndex: 1,
      explanation: L(
        '-v inverts the match, so you get everything except the pattern, which is the usual way to filter the noise out of a log. Printing the line numbers is -n and printing a count is -c.',
        '-v инвертирует совпадение, поэтому вы получаете всё, кроме шаблона, — обычный способ убрать шум из лога. Номера строк печатает -n, а количество — -c.'
      ),
    },
    {
      id: 'cli-q19',
      question: L(
        'Which flag lets grep use an alternation such as `error|timeout` without escaping the bar?',
        'Какой флаг позволяет grep использовать чередование вида `error|timeout` без экранирования черты?'
      ),
      options: [
        L('grep -r', 'grep -r'),
        L('grep -E', 'grep -E'),
        L('grep -c', 'grep -c'),
        L('grep -w', 'grep -w')
      ],
      correctIndex: 1,
      explanation: L(
        '-E switches grep to the extended regular expressions, where the alternation bar needs no escaping. In the basic mode the same pattern has to be written as `error\\|timeout`.',
        '-E переключает grep на расширенные регулярные выражения, где чередование через черту экранировать не нужно. В базовом режиме тот же шаблон пришлось бы писать как `error\\|timeout`.'
      ),
    },
    {
      id: 'cli-q20',
      question: L('What is the main difference between ripgrep (rg) and grep -r?', 'В чём главное отличие ripgrep (rg) от grep -r?'),
      options: [
        L('rg is much faster and respects .gitignore, so it skips the build and the dependency folders', 'rg намного быстрее и уважает .gitignore, поэтому пропускает сборочные и dependency-папки'),
        L('rg searches only the text files, while grep searches everything it meets', 'rg ищет только по текстовым файлам, а grep по всему, что встречает'),
        L('rg can search inside the binary files, while grep cannot', 'rg умеет искать внутри бинарных файлов, а grep нет'),
        L('rg always searches the whole file system, while grep stays inside one directory', 'rg всегда ищет по всей файловой системе, а grep остаётся в одном каталоге')
      ],
      correctIndex: 0,
      explanation: L(
        'ripgrep is a recursive searcher written in Rust: it is fast, it skips the hidden files and it honours .gitignore by default, so node_modules and dist stay out of the result. grep -r walks everything it is pointed at unless you filter it yourself.',
        'ripgrep — рекурсивный поисковик на Rust: он быстрый, пропускает скрытые файлы и по умолчанию уважает .gitignore, поэтому node_modules и dist в результат не попадают. grep -r обходит всё, куда его направили, если не фильтровать самому.'
      ),
    },
    {
      id: 'cli-q21',
      question: L('What does `sed -i "s/old/new/g" file.txt` do?', 'Что делает `sed -i "s/old/new/g" file.txt`?'),
      options: [
        L('It prints the file with the replacements and leaves the file on disk untouched', 'Печатает файл с заменами и оставляет файл на диске нетронутым'),
        L('It creates a copy of the file named file.txt.bak', 'Создаёт копию файла с именем file.txt.bak'),
        L('It deletes every line that contains old', 'Удаляет каждую строку, содержащую old'),
        L('It replaces every occurrence of old with new directly in the file', 'Заменяет каждое вхождение old на new прямо в файле')
      ],
      correctIndex: 3,
      explanation: L(
        's stands for substitute, the g flag replaces all the occurrences on a line, and -i edits the file in place instead of printing the result to the terminal. Without -i sed only writes to stdout, so the file stays exactly as it was.',
        's означает substitute, флаг g заменяет все вхождения в строке, а -i правит файл на месте, а не печатает результат в терминал. Без -i sed лишь пишет в stdout, и файл остаётся точно таким же.'
      ),
    },
    {
      id: 'cli-q22',
      question: L('How do you print the five lines with the largest numbers from data.txt?', 'Как напечатать пять строк с самыми большими числами из data.txt?'),
      options: [
        L('sort -nr data.txt | head -n 5', 'sort -nr data.txt | head -n 5'),
        L('sort -r data.txt | tail -n 5', 'sort -r data.txt | tail -n 5'),
        L('head -n 5 data.txt | sort -nr', 'head -n 5 data.txt | sort -nr'),
        L('sort -n data.txt | tail -n 5', 'sort -n data.txt | tail -n 5')
      ],
      correctIndex: 0,
      explanation: L(
        'The order matters: sort first, cut the head afterwards. -n makes the comparison numeric and -r reverses it, so the biggest values end up on top, and head -n 5 takes the first five of them. Sorting only the first five lines or keeping the last five gives you the wrong answer.',
        'Порядок важен: сначала сортировка, потом отсечение. -n делает сравнение числовым, а -r разворачивает его, поэтому наибольшие значения оказываются сверху, и head -n 5 берёт первые пять. Сортировка только первых пяти строк или выбор последних пяти дают неверный ответ.'
      ),
    },
    {
      id: 'cli-q23',
      question: L('In `ls | grep .ts`, what does the pipe character do?', 'В `ls | grep .ts` что делает символ пайпа?'),
      options: [
        L('It writes the output of ls into a file named grep.ts', 'Пишет вывод ls в файл с именем grep.ts'),
        L('It runs grep inside the process of ls', 'Запускает grep внутри процесса ls'),
        L('It compares the two commands and prints only the lines that differ', 'Сравнивает две команды и печатает только отличающиеся строки'),
        L('It connects the standard output of ls with the standard input of grep', 'Соединяет стандартный вывод ls со стандартным вводом grep')
      ],
      correctIndex: 3,
      explanation: L(
        'A pipe is a one way channel between two processes: what the first command writes to its standard output becomes the standard input of the second. That is why the order inside a pipeline matters, the first command produces and the last one consumes.',
        'Пайп — односторонний канал между двумя процессами: то, что первая команда пишет в стандартный вывод, становится стандартным вводом второй. Поэтому порядок в конвейере важен: первая команда производит, последняя потребляет.'
      ),
    },
    {
      id: 'cli-q24',
      question: L('What does `echo hi > out.txt` do when out.txt already exists?', 'Что делает `echo hi > out.txt`, если out.txt уже существует?'),
      options: [
        L('It appends the line to the end of the file', 'Дописывает строку в конец файла'),
        L('It prints the line to the terminal and leaves the file alone', 'Печатает строку в терминал и не трогает файл'),
        L('It replaces the whole content of the file with the new line', 'Заменяет всё содержимое файла новой строкой'),
        L('It writes the line to the file only when the file does not exist yet', 'Пишет строку в файл, только если файла ещё нет')
      ],
      correctIndex: 2,
      explanation: L(
        'The single angle bracket truncates the target and writes the new content, so everything that was in the file is lost. To append you need two of them, and to write to the terminal and to the file at the same time you use the tee command.',
        'Один знак «больше» обрезает файл и записывает новое содержимое, поэтому всё, что было внутри, теряется. Чтобы дописывать, нужен второй знак, а чтобы писать одновременно в терминал и в файл, используют команду tee.'
      ),
    },
    {
      id: 'cli-q25',
      question: L('How does `>>` differ from `>`?', 'Чем `>>` отличается от `>`?'),
      options: [
        L('It sends the output to the standard error stream', 'Отправляет вывод в стандартный поток ошибок'),
        L('It appends the output to the end of the file instead of replacing the content', 'Дописывает вывод в конец файла вместо замены содержимого'),
        L('It merges the output of two commands into one', 'Объединяет вывод двух команд в один'),
        L('It writes the output to the file only when the file does not exist yet', 'Пишет вывод в файл, только если файла ещё нет')
      ],
      correctIndex: 1,
      explanation: L(
        'Two angle brackets mean append, so a log file keeps growing from run to run, while one angle bracket replaces everything. None of them touches the streams, that is what 2> and 2>&1 do.',
        'Два знака «больше» означают дописывание, поэтому лог растёт от запуска к запуску, а один знак заменяет всё. Ни один из них не трогает потоки — это делают 2> и 2>&1.'
      ),
    },
    {
      id: 'cli-q26',
      question: L('What does `curl https://example.com 2> err.log` do?', 'Что делает `curl https://example.com 2> err.log`?'),
      options: [
        L('It sends the standard output of curl to err.log', 'Отправляет стандартный вывод curl в err.log'),
        L('It merges the standard output and the standard error into err.log', 'Объединяет стандартный вывод и поток ошибок в err.log'),
        L('It runs curl with the standard error stream disabled', 'Запускает curl с отключённым потоком ошибок'),
        L('It sends the standard error of curl to err.log and leaves the standard output on the terminal', 'Отправляет стандартный поток ошибок curl в err.log, а вывод остаётся в терминале')
      ],
      correctIndex: 3,
      explanation: L(
        'The 2 in front of the redirection is the file descriptor of the standard error, so only the error messages go into err.log while the normal output still reaches the terminal. 2>&1 merges the two streams, and 1> or a plain angle bracket redirects the output.',
        'Двойка перед перенаправлением — это дескриптор стандартного потока ошибок, поэтому в err.log уходят только сообщения об ошибках, а обычный вывод остаётся в терминале. 2>&1 объединяет потоки, а 1> или просто «больше» перенаправляют вывод.'
      ),
    },
    {
      id: 'cli-q27',
      question: L('What does `cmd > out.log 2>&1` do?', 'Что делает `cmd > out.log 2>&1`?'),
      options: [
        L('It sends the standard error to the terminal and the standard output to out.log', 'Отправляет поток ошибок в терминал, а вывод в out.log'),
        L('It sends the standard error to out.log and the standard output to the terminal', 'Отправляет поток ошибок в out.log, а вывод в терминал'),
        L('It sends the standard output to out.log and discards the standard error', 'Отправляет вывод в out.log, а поток ошибок отбрасывает'),
        L('It sends both the standard output and the standard error to out.log', 'Отправляет и стандартный вывод, и поток ошибок в out.log')
      ],
      correctIndex: 3,
      explanation: L(
        'The order matters: out.log is opened for the output first, and 2>&1 then says that the error stream must point wherever the output points now, which is the file. That is how you capture everything, the errors included, in a single log.',
        'Здесь важен порядок: сначала out.log открывается для вывода, а 2>&1 говорит, что поток ошибок должен указывать туда же, куда теперь указывает вывод, то есть в файл. Так в один лог попадает всё, включая ошибки.'
      ),
    },
    {
      id: 'cli-q28',
      question: L('Why is `cmd 2>&1 > out.log` different from `cmd > out.log 2>&1`?', 'Почему `cmd 2>&1 > out.log` отличается от `cmd > out.log 2>&1`?'),
      options: [
        L('They are exactly the same, the order of the redirections does not matter', 'Они полностью одинаковы, порядок перенаправлений не важен'),
        L('In the first one the error messages go to the file and the output stays on the terminal', 'В первой команде ошибки уходят в файл, а вывод остаётся в терминале'),
        L('In the first one the error stream still points to the terminal, because the output is redirected afterwards', 'В первой команде поток ошибок всё ещё указывает на терминал, потому что вывод перенаправляют позже'),
        L('The first one is a syntax error and the shell refuses to run it', 'Первая команда — синтаксическая ошибка, и оболочка откажется её выполнять')
      ],
      correctIndex: 2,
      explanation: L(
        'The redirections are processed from left to right. In the first command 2>&1 is applied while the output still points to the terminal, so the errors keep going there, and only then is the output sent to the file. Swap the two parts and both streams land in the file.',
        'Перенаправления обрабатываются слева направо. В первой команде 2>&1 применяется, пока вывод ещё указывает на терминал, поэтому ошибки идут туда же, и только потом вывод уходит в файл. Поменяйте части местами — и оба потока окажутся в файле.'
      ),
    },
    {
      id: 'cli-q29',
      question: L('What does the numeric mode 755 mean?', 'Что означает числовой режим 755?'),
      options: [
        L('Only the owner may read, write and execute, nobody else has any access', 'Только владелец может читать, писать и выполнять, у остальных нет никакого доступа'),
        L('The owner may read and write, everybody else may only read', 'Владелец может читать и писать, все остальные — только читать'),
        L('The owner may read, write and execute, the group and the others may read and execute', 'Владелец может читать, писать и выполнять, группа и остальные — читать и выполнять'),
        L('Everybody may read, write and execute', 'Все могут читать, писать и выполнять')
      ],
      correctIndex: 2,
      explanation: L(
        'Every digit is a bit mask where 4 is read, 2 is write and 1 is execute. 7 is rwx for the owner and 5 is r-x for the group and for the others, so 755 is rwxr-xr-x, the usual mode for an executable script.',
        'Каждая цифра — битовая маска, где 4 это чтение, 2 запись и 1 выполнение. 7 — это rwx для владельца, а 5 — r-x для группы и остальных, поэтому 755 это rwxr-xr-x, обычный режим для исполняемого скрипта.'
      ),
    },
    {
      id: 'cli-q30',
      question: L('What does `chmod 600 secret.txt` produce?', 'Что даёт `chmod 600 secret.txt`?'),
      options: [
        L('rwxr-xr-x — everybody can read and execute the file', 'rwxr-xr-x — все могут читать и выполнять файл'),
        L('rw-rw-rw- — everybody can read and write the file', 'rw-rw-rw- — все могут читать и писать файл'),
        L('rw------- — only the owner can read and write the file', 'rw------- — только владелец может читать и писать файл'),
        L('r--r--r-- — everybody can only read the file', 'r--r--r-- — все могут только читать файл')
      ],
      correctIndex: 2,
      explanation: L(
        '6 is read plus write and 0 gives the group and the others nothing at all, so 600 is the classic mode for a private key or a file with a password in it. 644 is the usual mode for a config file that everybody is allowed to read.',
        '6 — это чтение плюс запись, а 0 не даёт группе и остальным вообще ничего, поэтому 600 — классический режим для приватного ключа или файла с паролем. 644 обычно ставят конфигу, который все могут прочитать.'
      ),
    },
    {
      id: 'cli-q31',
      question: L('What does `chmod u+x script.sh` do?', 'Что делает `chmod u+x script.sh`?'),
      options: [
        L('It removes the execute permission from the owner', 'Снимает право на выполнение у владельца'),
        L('It adds the execute permission for the owner only', 'Добавляет право на выполнение только владельцу'),
        L('It gives the execute permission to the owner, to the group and to the others', 'Даёт право на выполнение владельцу, группе и остальным'),
        L('It makes the file writable for everybody', 'Делает файл доступным на запись для всех')
      ],
      correctIndex: 1,
      explanation: L(
        'The symbolic form names who (u, g, o, a), what (r, w, x) and how to change it (+, -, =). Here u+x adds the execute bit for the owner alone, while u+x,g+x,o+x would open the file up to everybody.',
        'Символическая форма задаёт кто (u, g, o, a), что (r, w, x) и как менять (+, -, =). Здесь u+x добавляет бит выполнения только владельцу, а u+x,g+x,o+x открыл бы файл всем.'
      ),
    },
    {
      id: 'cli-q32',
      question: L('What does `chmod o-w file` do?', 'Что делает `chmod o-w file`?'),
      options: [
        L('It removes the write permission from the owner', 'Снимает право на запись у владельца'),
        L('It adds the write permission for the group', 'Добавляет право на запись для группы'),
        L('It removes the write permission for the others', 'Снимает право на запись для остальных'),
        L('It makes the file executable for everybody', 'Делает файл исполняемым для всех')
      ],
      correctIndex: 2,
      explanation: L(
        'The o stands for others and the minus takes that bit away, so a world writable file becomes safe. This is exactly the fix for an audit finding that flags the files whose write bit is set for others, and it is what you do to a config file nobody but the owner may edit.',
        'Буква o — это others, а минус снимает этот бит, поэтому файл, доступный на запись всем, становится безопасным. Это ровно то исправление, которое требует аудит файлов с битом записи для остальных, и так делают с конфигом, который не должен менять никто, кроме владельца.'
      ),
    },
    {
      id: 'cli-q33',
      question: L('With a umask of 022, what permissions do the new files and the new directories get?', 'При umask 022 какие права получают новые файлы и новые каталоги?'),
      options: [
        L('Files get 022 and directories get 022', 'Файлы получают 022 и каталоги тоже 022'),
        L('The umask only affects the files that are created by root', 'umask влияет только на файлы, созданные под root'),
        L('The umask sets the permissions of the files that already exist in the directory', 'umask задаёт права файлов, которые уже лежат в каталоге'),
        L('The mask is subtracted from the defaults, so files get 644 and directories get 755', 'Маска вычитается из значений по умолчанию, поэтому файлы получают 644, а каталоги 755')
      ],
      correctIndex: 3,
      explanation: L(
        'The umask is the part of the default mode that gets removed: a file starts from 666 and a directory from 777, and 022 takes the write bit away from the group and from the others. That is why you end up with 644 and 755.',
        'umask — это часть режима по умолчанию, которая вычитается: файл начинается с 666, каталог с 777, а 022 забирает бит записи у группы и у остальных. Поэтому и получаются 644 и 755.'
      ),
    },
    {
      id: 'cli-q34',
      question: L('You are about to create a file with a secret token. Which umask should you set first?', 'Вы собираетесь создать файл с секретным токеном. Какой umask поставить перед этим?'),
      options: [
        L('umask 022', 'umask 022'),
        L('umask 002', 'umask 002'),
        L('umask 777', 'umask 777'),
        L('umask 077', 'umask 077')
      ],
      correctIndex: 3,
      explanation: L(
        '077 leaves the owner with everything and gives the group and the others nothing, so the file is created as 600 and the directory as 700. With 022 every other user on the machine could still read the token, and 002 would even hand write access to the group.',
        '077 оставляет владельцу всё, а группе и остальным ничего, поэтому файл создаётся как 600, а каталог как 700. При 022 токен всё равно прочитал бы любой пользователь машины, а 002 дал бы группе ещё и запись.'
      ),
    },
    {
      id: 'cli-q35',
      question: L(
        'You run `ps aux | grep node` and you see a line with `grep node` in the output. What is happening?',
        'Вы выполнили `ps aux | grep node` и увидели в выводе строку с `grep node`. Что происходит?'
      ),
      options: [
        L('The system has two different versions of grep installed', 'В системе установлены две разные версии grep'),
        L('ps prints the pattern of the last command it ran', 'ps печатает шаблон последней выполненной команды'),
        L('The grep process itself matches the pattern and therefore shows up in the list', 'Сам процесс grep совпадает с шаблоном и поэтому попадает в список'),
        L('The node process has forked a child process that is called grep', 'Процесс node форкнул дочерний процесс с именем grep')
      ],
      correctIndex: 2,
      explanation: L(
        'While it searches, grep is a running process itself, and its own command line contains the word node, so it matches itself. The usual fixes are to filter it out with `grep -v grep` or to use pgrep -af node, which does not have the same problem.',
        'Пока grep ищет, он сам является работающим процессом, и в его собственной командной строке есть слово node, поэтому он совпадает сам с собой. Обычные решения — отфильтровать его через `grep -v grep` или использовать pgrep -af node, у которого такой проблемы нет.'
      ),
    },
    {
      id: 'cli-q36',
      question: L('What is the difference between SIGTERM and SIGKILL?', 'В чём разница между SIGTERM и SIGKILL?'),
      options: [
        L('SIGTERM kills the process immediately, SIGKILL asks it to shut down cleanly', 'SIGTERM убивает процесс мгновенно, а SIGKILL просит его завершиться корректно'),
        L('SIGTERM asks the process to shut down, SIGKILL terminates it and cannot be caught or handled', 'SIGTERM просит процесс завершиться, а SIGKILL убивает его, и перехватить его нельзя'),
        L('They are the same signal with two different names', 'Это один и тот же сигнал под двумя именами'),
        L('SIGTERM only works on the system processes, SIGKILL only on the user processes', 'SIGTERM работает только с системными процессами, а SIGKILL только с пользовательскими')
      ],
      correctIndex: 1,
      explanation: L(
        'SIGTERM is a request the process can handle: it closes the sockets, flushes the buffers and exits. SIGKILL is delivered by the kernel, the process gets no chance to do anything, so the data stays in whatever state it was at that moment.',
        'SIGTERM — это просьба, которую процесс может обработать: закрыть сокеты, сбросить буферы и выйти. SIGKILL доставляет ядро, процесс ничего не успевает сделать, поэтому данные остаются в том состоянии, в котором были в этот момент.'
      ),
    },
    {
      id: 'cli-q37',
      question: L('Why is `kill -9` normally the last resort and not the first one?', 'Почему `kill -9` обычно последнее средство, а не первое?'),
      options: [
        L('The process cannot clean up or flush its buffers, because the signal cannot be handled', 'Процесс не может прибраться и сбросить буферы, потому что сигнал не перехватывается'),
        L('It is slower than SIGTERM and takes much longer to work', 'Он медленнее SIGTERM и срабатывает намного дольше'),
        L('It needs the root privileges, so it usually fails', 'Ему нужны права root, поэтому обычно он не срабатывает'),
        L('The signal is delivered to every process of the current user', 'Сигнал доставляется каждому процессу текущего пользователя')
      ],
      correctIndex: 0,
      explanation: L(
        'A process that receives SIGKILL gets no chance to close the connections, to release the locks or to flush the writes, and the leftover state is exactly what the next run has to deal with. Send SIGTERM first, wait a few seconds, and only then escalate.',
        'Процесс, получивший SIGKILL, не успевает закрыть соединения, освободить блокировки и дописать данные, и остаточное состояние достанется следующему запуску. Сначала отправляйте SIGTERM, подождите несколько секунд и только потом переходите к SIGKILL.'
      ),
    },
    {
      id: 'cli-q38',
      question: L('How do you keep a long running command alive after you log out of the server?', 'Как оставить долгую команду работать после выхода с сервера?'),
      options: [
        L('command && — the second command starts as soon as the first one fails', 'command && — вторая команда стартует, как только первая завершится ошибкой'),
        L('command | — the output of the command is piped into the next one', 'command | — вывод команды уходит в пайп в следующую'),
        L('nohup command & — the command ignores the hangup signal and the shell puts it in the background', 'nohup command & — команда игнорирует сигнал завершения сессии, а оболочка уводит её в фон'),
        L('command &> file — the output of the command is written to the file', 'command &> file — вывод команды пишется в файл')
      ],
      correctIndex: 2,
      explanation: L(
        'nohup makes the process ignore SIGHUP, the signal the terminal sends when the session closes, and the ampersand puts it in the background so the shell can return right away. The redirect to a log file keeps the output away from the terminal, and the double ampersand is a completely different thing.',
        'nohup заставляет процесс игнорировать SIGHUP, сигнал, который терминал шлёт при закрытии сессии, а амперсанд уводит его в фон, чтобы оболочка сразу вернула управление. Перенаправление в файл лога убирает вывод из терминала, а двойной амперсанд — это совсем другая история.'
      ),
    },
    {
      id: 'cli-q39',
      question: L(
        'Why do people write `find . -print0 | xargs -0 rm` when the file names may contain spaces?',
        'Почему пишут `find . -print0 | xargs -0 rm`, если в именах файлов могут быть пробелы?'
      ),
      options: [
        L('It passes the paths separated by a null byte, so a name with a space stays one argument', 'Передаёт пути, разделённые нулевым байтом, поэтому имя с пробелом остаётся одним аргументом'),
        L('It makes the removal faster, because the files are deleted in one go', 'Это ускоряет удаление, потому что файлы удаляются за один раз'),
        L('It tells xargs to run the command without any arguments when the input is empty', 'Говорит xargs запускать команду без аргументов, если вход пуст'),
        L('It searches the files for the text 0 before deleting them', 'Ищет в файлах текст 0 перед удалением')
      ],
      correctIndex: 0,
      explanation: L(
        'A normal find prints the paths separated by newlines and xargs splits them by whitespace, so a name like My Report.txt would arrive as two arguments. The null byte cannot appear in a file name, so the -print0 and -0 pair keeps every path in one piece.',
        'Обычный find печатает пути, разделённые переводами строк, а xargs делит их по пробельным символам, поэтому имя My Report.txt пришло бы двумя аргументами. Нулевой байт не может встретиться в имени файла, поэтому связка -print0 и -0 сохраняет каждый путь целиком.'
      ),
    },
    {
      id: 'cli-q40',
      question: L('What do the flags in `tar -czf backup.tar.gz project/` mean?', 'Что означают флаги в `tar -czf backup.tar.gz project/`?'),
      options: [
        L('The archive is extracted, compressed with zip and written to the file', 'Архив распаковывается, сжимается через zip и пишется в файл'),
        L('The archive is created, verified and written to the file', 'Архив создаётся, проверяется и пишется в файл'),
        L('The archive is listed, compressed with gzip and written to the file', 'Архив перечисляется, сжимается через gzip и пишется в файл'),
        L('The archive is created, compressed with gzip and written to the file', 'Архив создаётся, сжимается через gzip и пишется в файл')
      ],
      correctIndex: 3,
      explanation: L(
        '-c creates a new archive, -z filters it through gzip and -f says which file the archive goes to. The order of the flags does not matter, but the file name has to follow the -f flag, otherwise tar does not know where to write.',
        '-c создаёт новый архив, -z пропускает его через gzip, а -f указывает файл, куда архив попадёт. Порядок флагов не важен, но имя файла должно идти после -f, иначе tar не знает, куда писать.'
      ),
    },
    {
      id: 'cli-q41',
      question: L('Which command extracts an existing tar.gz archive?', 'Какая команда распаковывает существующий архив tar.gz?'),
      options: [
        L('tar -czf archive.tar.gz', 'tar -czf archive.tar.gz'),
        L('tar -tf archive.tar.gz', 'tar -tf archive.tar.gz'),
        L('tar -xzf archive.tar.gz', 'tar -xzf archive.tar.gz'),
        L('tar -tzf archive.tar.gz', 'tar -tzf archive.tar.gz')
      ],
      correctIndex: 2,
      explanation: L(
        '-x extracts, -z decompresses the gzip stream and -f names the archive. The -c flag does the opposite and creates the archive, and the -t flag only lists the contents without touching the disk.',
        '-x распаковывает, -z распаковывает поток gzip, а -f задаёт имя архива. Флаг -c делает обратное и создаёт архив, а -t только показывает содержимое, не трогая диск.'
      ),
    },
    {
      id: 'cli-q42',
      question: L(
        'You want to see what is inside an archive without unpacking it. Which command do you use?',
        'Вы хотите посмотреть, что внутри архива, не распаковывая его. Какую команду использовать?'
      ),
      options: [
        L('tar -tf archive.tar.gz', 'tar -tf archive.tar.gz'),
        L('tar -xzf archive.tar.gz', 'tar -xzf archive.tar.gz'),
        L('tar -czf archive.tar.gz', 'tar -czf archive.tar.gz'),
        L('tar -df archive.tar.gz', 'tar -df archive.tar.gz')
      ],
      correctIndex: 0,
      explanation: L(
        '-t lists the table of contents and works together with the extraction flags -x or -z, so the full form is tar -tzf for a gzipped archive. The -c flag is the one that creates a new archive.',
        '-t печатает таблицу содержимого и работает вместе с флагами распаковки -x или -z, поэтому полная форма для gzip-архива — tar -tzf. Флаг -c создаёт новый архив.'
      ),
    },
    {
      id: 'cli-q43',
      question: L('How do you keep the node_modules folder out of a tar archive?', 'Как не положить папку node_modules в tar-архив?'),
      options: [
        L('tar -czf backup.tar.gz --remove=node_modules project/', 'tar -czf backup.tar.gz --remove=node_modules project/'),
        L('tar -czf backup.tar.gz --ignore=node_modules project/', 'tar -czf backup.tar.gz --ignore=node_modules project/'),
        L('tar -czf backup.tar.gz --exclude=node_modules project/', 'tar -czf backup.tar.gz --exclude=node_modules project/'),
        L('tar -czf backup.tar.gz -exclude node_modules project/', 'tar -czf backup.tar.gz -exclude node_modules project/')
      ],
      correctIndex: 2,
      explanation: L(
        '--exclude takes a pattern and drops the matching entries while the archive is built, which keeps the archive small and stops you from shipping the installed dependencies. The same idea is available in rsync with --exclude and in zip with -x.',
        '--exclude принимает шаблон и выбрасывает подходящие записи во время сборки архива, поэтому архив остаётся маленьким и установленные зависимости не уезжают наружу. Та же идея есть у rsync с --exclude и у zip с -x.'
      ),
    },
    {
      id: 'cli-q44',
      question: L('What is the difference between `NAME=Alice` and `export NAME=Alice` in bash?', 'В чём разница между `NAME=Alice` и `export NAME=Alice` в bash?'),
      options: [
        L('export also makes the variable read only', 'export дополнительно делает переменную доступной только для чтения'),
        L('The plain assignment is not allowed in bash', 'Обычное присваивание в bash запрещено'),
        L('They are completely identical', 'Они полностью идентичны'),
        L('export also makes the variable visible to the child processes', 'export дополнительно делает переменную видимой для дочерних процессов')
      ],
      correctIndex: 3,
      explanation: L(
        'A plain assignment creates a shell variable that only the current shell can see, while export also passes it to every command you start, which is what you need for an API key or a NODE_ENV value. The variable is still a plain string, export does not type it.',
        'Обычное присваивание создаёт переменную оболочки, которую видит только текущая оболочка, а export дополнительно передаёт её каждой запускаемой команде — это нужно для API-ключа или значения NODE_ENV. Переменная при этом остаётся строкой, export не задаёт ей тип.'
      ),
    },
    {
      id: 'cli-q45',
      question: L('What does the PATH variable contain and how is it used?', 'Что содержит переменная PATH и как её используют?'),
      options: [
        L('The home directory of the current user', 'Домашний каталог текущего пользователя'),
        L('A list of directories separated by colons, searched in order until the command is found', 'Список каталогов через двоеточие, который просматривается по порядку, пока команда не найдётся'),
        L('The list of the processes that are currently running', 'Список процессов, которые сейчас выполняются'),
        L('The history of the commands you have typed', 'История команд, которые вы набирали')
      ],
      correctIndex: 1,
      explanation: L(
        'When you type a bare command, the shell looks through the directories of PATH from left to right and runs the first match it finds, so a script is started with its full path or after you add its directory to PATH. An empty entry in PATH means the current directory.',
        'Когда вы пишете команду без пути, оболочка просматривает каталоги PATH слева направо и запускает первое же совпадение, поэтому скрипт приходится запускать с полным путём или после добавления его каталога в PATH. Пустой элемент в PATH означает текущий каталог.'
      ),
    },
    {
      id: 'cli-q46',
      question: L(
        'How do you inspect and remove an environment variable in the current shell?',
        'Как посмотреть и удалить переменную окружения в текущей оболочке?'
      ),
      options: [
        L('printenv shows the variables and unset removes one, while export only sets a new value', 'printenv показывает переменные, unset удаляет одну, а export только задаёт новое значение'),
        L('echo $VAR shows the value and export VAR removes the variable', 'echo $VAR показывает значение, а export VAR удаляет переменную'),
        L('env -l removes every variable at once, and set -a lists them', 'env -l удаляет все переменные разом, а set -a их перечисляет'),
        L('There is no standard way, you have to restart the shell', 'Стандартного способа нет, приходится перезапускать оболочку')
      ],
      correctIndex: 0,
      explanation: L(
        'printenv or env list the variables of the process, and unset NAME removes one from the current shell. To load a local .env file use `set -a`, then `. ./.env`, then `set +a`, which exports every assignment made by the file.',
        'printenv или env показывают переменные процесса, а unset NAME удаляет одну из них в текущей оболочке. Чтобы подгрузить локальный .env, используют `set -a`, затем `. ./.env`, затем `set +a` — так все присваивания из файла экспортируются.'
      ),
    },
    {
      id: 'cli-q47',
      question: L('What is the difference between `[ -f file.txt ]` and `[[ -f file.txt ]]` in bash?', 'В чём разница между `[ -f file.txt ]` и `[[ -f file.txt ]]` в bash?'),
      options: [
        L('[[ ]] also accepts the logical operators and the pattern matching, while [ ] is a plain external command', '[[ ]] принимает ещё и логические операторы, и сопоставление по шаблону, а [ ] — обычная внешняя команда'),
        L('They are exactly the same, only the style is different', 'Они полностью одинаковы, различается только стиль'),
        L('[[ ]] can only be used in interactive mode', '[[ ]] работает только в интерактивном режиме'),
        L('[ ] can only test the numbers, [[ ]] only tests the files', '[ ] умеет только проверять числа, а [[ ]] — только файлы')
      ],
      correctIndex: 0,
      explanation: L(
        '[ ] is really the external command test, so everything has to be quoted and the logic is limited. [[ ]] is a keyword of bash, it supports &&, || and the pattern matching like the == with a glob, and it does not split the words.',
        '[ ] — это на самом деле внешняя команда test, поэтому всё приходится кавычить и логика ограничена. [[ ]] — ключевое слово bash: оно поддерживает &&, || и сопоставление по шаблону, например == с глобом, и не разбивает слова.'
      ),
    },
    {
      id: 'cli-q48',
      question: L('How do you find out whether the previous command succeeded?', 'Как узнать, завершилась ли предыдущая команда успешно?'),
      options: [
        L('The variable $! holds the exit code of the last command, and 1 means success', 'Переменная $! хранит код выхода последней команды, и 1 означает успех'),
        L('The variable $? holds the exit code of the last command, and 0 means success', 'Переменная $? хранит код выхода последней команды, и 0 означает успех'),
        L('The command exit prints the result of the previous command', 'Команда exit печатает результат предыдущей команды'),
        L('The variable $$ holds the exit code of the last command', 'Переменная $$ хранит код выхода последней команды')
      ],
      correctIndex: 1,
      explanation: L(
        'Every command returns an exit code, and the shell keeps the last one in $?. Zero means success and anything else means a failure, so the usual check is `if [ $? -ne 0 ]; then ...`. Note that $? has to be read right away, because the next command overwrites it.',
        'Каждая команда возвращает код выхода, и оболочка хранит последний в $?. Ноль означает успех, всё остальное — ошибку, поэтому обычная проверка выглядит как `if [ $? -ne 0 ]; then ...`. Учтите, что $? нужно читать сразу: следующая команда его перезапишет.'
      ),
    },
    {
      id: 'cli-q49',
      question: L('What does the header `set -euo pipefail` of a bash script buy you?', 'Что даёт заголовок `set -euo pipefail` в bash-скрипте?'),
      options: [
        L('The script runs the commands in the background and writes the output to a log', 'Скрипт выполняет команды в фоне и пишет вывод в лог'),
        L('The script runs with the privileges of the user who owns the file', 'Скрипт выполняется с правами пользователя, которому принадлежит файл'),
        L('The script stops on a failed command, refuses to work with an unset variable and fails when a command inside a pipeline fails', 'Скрипт останавливается при ошибке, отказывается работать с незаданной переменной и падает, если упала команда внутри конвейера'),
        L('The script echoes every command before it runs it', 'Скрипт печатает каждую команду перед её выполнением')
      ],
      correctIndex: 2,
      explanation: L(
        '-e exits on a failed command, -u treats an undefined variable as an error instead of an empty string, and pipefail makes a pipeline fail when any of its commands fails, not only the last one. That header is the usual first line of a production script, and it is not a replacement for checking the exit codes by hand.',
        '-e останавливает работу при ошибке, -u считает неопределённую переменную ошибкой, а не пустой строкой, и pipefail заставляет конвейер падать, если упала любая его команда, а не только последняя. Такой заголовок — обычная первая строка продакшн-скрипта, и он не заменяет ручную проверку кодов выхода.'
      ),
    },
    {
      id: 'cli-q50',
      question: L(
        'Why does a `for f in *.txt` loop need a check that the file exists before it touches the file?',
        'Почему циклу `for f in *.txt` нужна проверка существования файла, прежде чем что-то с ним делать?'
      ),
      options: [
        L('Because the loop runs only the last match', 'Потому что цикл выполняет только последнее совпадение'),
        L('Because the glob is expanded only once, before the loop starts', 'Потому что глоб разворачивается только один раз, до запуска цикла'),
        L('Because the shell sorts the matches in the reverse order', 'Потому что оболочка сортирует совпадения в обратном порядке'),
        L('Because when the glob matches nothing, bash leaves the pattern itself in the variable', 'Потому что когда глоб ничего не находит, bash оставляет в переменной сам шаблон')
      ],
      correctIndex: 3,
      explanation: L(
        'When no file matches the pattern, bash does not leave the variable empty, it puts the literal text *.txt there, and the command would fail on a file with that strange name. The usual guard is `[ -e "$f" ] || continue`, and the expansion ${f%.txt} is what turns the name into the new one.',
        'Когда шаблону не соответствует ни один файл, bash не оставляет переменную пустой, а кладёт туда буквальный текст *.txt, и команда упадёт на файле с таким странным именем. Обычная защита — `[ -e "$f" ] || continue`, а расширение ${f%.txt} превращает имя в новое.'
      ),
    },
  ],
};
