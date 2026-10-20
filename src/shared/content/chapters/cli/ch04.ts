import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh04: Chapter = {
  id: 'cli-ch4',
  title: L('Processes, jobs and signals', 'Процессы, задачи и сигналы'),
  summary: L(
    'How a shell runs programs in the foreground and the background, how a terminal hands control between them, and how a service is asked to stop without losing work.',
    'Как оболочка запускает программы на переднем и заднем плане, как терминал передаёт управление между ними и как сервис просят остановиться, не теряя работу.'
  ),
  sections: [
    {
      id: 'cli-ch4-s1',
      title: L('Running processes in the background', 'Запуск процессов в фоне'),
      body: L(
        'Putting the ampersand at the end of a command tells the shell to start the command in the background and to continue immediately. The shell does not wait, it prints a job number and gives the prompt back. The process is a real child of the shell with its own identifier, and it keeps running while you type other commands; the shell stops waiting for it only when the shell itself exits.\n\nBackgrounding changes the connections of the streams, not the process itself. Standard output and standard error still point at the terminal, so the output of a background job interleaves with whatever else prints, which is why long jobs are redirected to a file. Standard input is still the terminal too, and that is the dangerous part: a background process that reads input competes with you for the keyboard and the characters you type go to it.\n\nThe command jobs lists the jobs of the current shell with their state, fg brings a job back to the foreground, bg sends it back to the background and wait blocks until every background job has finished. A job can be addressed by its number or by the start of its command, so a prefix with a percent sign means the job whose command begins with a given word.\n\nBecause a background job is a child of the shell, it dies with it. When the terminal closes, the shell receives a hangup and the children that did not handle it are killed along with it. For work that has to survive the session, the answer is nohup or a detached session manager, and those are a different mechanism from the ampersand operator.',
        'Знак амперсанда в конце команды говорит оболочке запустить команду в фоне и продолжить немедленно. Оболочка не ждёт, печатает номер задачи и возвращает приглашение. Процесс остаётся настоящим дочерним процессом оболочки со своим идентификатором и продолжает работать, пока вы печатаете другие команды; оболочка перестаёт ждать его только когда сама выходит.\n\nЗапуск в фоне меняет подключение потоков, а не сам процесс. Стандартный вывод и поток ошибок всё ещё указывают на терминал, поэтому вывод фоновой задачи перемешивается со всем, что печатается, — вот почему долгие задачи перенаправляют в файл. Стандартный ввод тоже остаётся терминалом, и это самая опасная часть: фоновый процесс, который читает ввод, конкурирует с вами за клавиатуру, и набранные символы уходят к нему.\n\nКоманда jobs показывает задачи текущей оболочки с их состоянием, fg возвращает задачу на передний план, bg отправляет её обратно в фон, а wait блокирует до завершения всех фоновых задач. Задачу можно адресовать по номеру или по началу её команды, так что префикс со знаком процента означает задачу, команда которой начинается с заданного слова.\n\nПоскольку фоновая задача — дочерний процесс оболочки, она умирает вместе с ней. Когда терминал закрывается, оболочка получает сигнал отключения, и дочерние процессы, не обработавшие его, гибнут вместе с ней. Для работы, которая должна пережить сессию, ответ — nohup или отдельный менеджер сессий, и это механизм, отличный от оператора амперсанда.'
      ),
      bullets: [
        L('The ampersand starts the command and returns the prompt at once.', 'Амперсанд запускает команду и сразу возвращает приглашение.'),
        L('Background jobs keep standard output on the terminal, so output interleaves.', 'Фоновые задачи оставляют вывод на терминале, поэтому он перемешивается.'),
        L('A background process that reads standard input competes for your keyboard.', 'Фоновый процесс, читающий стандартный ввод, конкурирует за клавиатуру.'),
        L('jobs, fg, bg and wait manage the jobs of the current shell.', 'jobs, fg, bg и wait управляют задачами текущей оболочки.'),
        L('A background job is a child of the shell and dies with it.', 'Фоновая задача — дочерний процесс оболочки и умирает вместе с ней.'),
      ],
      code: `# Start and continue
npm run watch &
jobs                  # shows the job and its state

# Redirect the output so it does not interleave
npm run watch > watch.log 2>&1 &

# Detach the input so the job cannot read your keyboard
npm run watch < /dev/null > watch.log 2>&1 &

# Come back to it
fg %1                 # bring job 1 to the foreground
bg %1                 # send it back to the background
wait                  # block until all background jobs finish`,
      table: {
        caption: L('Job control commands', 'Команды управления задачами'),
        headers: [L('Command', 'Команда'), L('Effect', 'Действие')],
        rows: [
          [L('&', '&'), L('start the command in the background and continue', 'запустить в фоне и продолжить')],
          [L('jobs', 'jobs'), L('list the jobs of the current shell with their state', 'показать задачи оболочки с их состоянием')],
          [L('fg %1', 'fg %1'), L('bring job 1 to the foreground', 'вернуть задачу 1 на передний план')],
          [L('bg %1', 'bg %1'), L('resume job 1 in the background', 'продолжить задачу 1 в фоне')],
          [L('wait', 'wait'), L('block until the background jobs have finished', 'ждать завершения фоновых задач')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The background job that steals your keyboard', 'Фоновая задача, крадущая клавиатуру'),
          text: L(
            'A background process keeps the terminal as its standard input, so the next thing you type is delivered to it and your command never appears. Redirect the input from the null device when the job is not supposed to read anything.',
            'Фоновый процесс сохраняет терминал своим стандартным вводом, поэтому следующий набранный вами символ уйдёт ему, а ваша команда не появится. Перенаправляйте ввод с устройства нуля, если задача ничего читать не должна.'
          ),
        },
      ],
      takeaway: L(
        'Backgrounding with the ampersand leaves the streams attached to the terminal, so redirect the output and the input before you walk away from the job.',
        'Запуск в фоне через амперсанд оставляет потоки подключёнными к терминалу, поэтому перенаправляйте и вывод, и вход, прежде чем уйти от задачи.'
      ),
      seeAlso: [
        L('Section 4-2: job control and terminal control', 'Секция 4-2: управление задачами и терминалом'),
        L('Section 4-5: nohup, disown and long-running jobs', 'Секция 4-5: nohup, disown и долгие задачи'),
      ],
    },
    {
      id: 'cli-ch4-s2',
      title: L('Job control and terminal control', 'Управление задачами и терминалом'),
      body: L(
        'A terminal session is not a window with a program in it. The kernel creates a pseudo terminal, and the shell becomes its session leader with that terminal as the controlling terminal. The shell then hands the terminal to whichever process is in the foreground, and the terminal has exactly one foreground process group at a time. That is why the interrupt character reaches the program you are looking at and not the ones running behind it.\n\nThe control characters are handled by the terminal driver, not by the shell and not by the program. The interrupt character raises SIGINT for the foreground process group, the suspend character raises SIGTSTP and stops it, the quit character raises SIGQUIT and dumps a core file, and the end-of-file character sends an end of file on the standard input. A program that handles the interrupt signal itself decides what happens next.\n\nStopping a foreground job with the suspend character hands the terminal back to the shell, which prints the job list and gives you a prompt. From there fg resumes the job in the foreground and bg resumes it in the background, where it tries to read the terminal and is stopped by SIGTTIN if it reads while it is not the foreground group.\n\nThe command stty shows and changes the settings of the terminal line, including whether the control characters are enabled, and tty prints the name of the terminal a process is attached to. Together with the terminal selection of ps they answer the question of which process actually owns this terminal, which is the first thing to check when a session behaves strangely.',
        'Терминальная сессия — это не окно с программой внутри. Ядро создаёт псевдотерминал, оболочка становится лидером сессии, а этот терминал — управляющим терминалом сессии. Дальше оболочка передаёт терминал тому процессу, который на переднем плане, и у терминала в каждый момент ровно одна группа процессов на переднем плане. Вот почему символ прерывания доходит до программы, которую вы видите, и не трогает те, что работают за ней.\n\nУправляющие символы обрабатывает драйвер терминала, а не оболочка и не программа. Символ прерывания посылает SIGINT группе процессов на переднем плане, символ приостановки посылает SIGTSTP и останавливает её, символ выхода посылает SIGQUIT и создаёт дамп ядра, а символ конца файла передаёт признак конца ввода по стандартному вводу. Программа, которая сама обрабатывает сигнал прерывания, решает, что будет дальше.\n\nОстановка задачи на переднем плане символом приостановки возвращает терминал оболочке, которая печатает список задач и даёт приглашение. Дальше fg возобновляет задачу на переднем плане, а bg — в фоне, где задача пытается читать терминал и получает SIGTTIN, если читает, не будучи группой на переднем плане.\n\nКоманда stty показывает и меняет настройки терминальной линии, включая то, включены ли управляющие символы, а tty печатает имя терминала, к которому подключён процесс. Вместе с выбором терминала в ps они отвечают на вопрос, какой процесс на самом деле владеет этим терминалом, — это первое, что стоит проверить, когда сессия ведёт себя странно.'
      ),
      bullets: [
        L('A session is a pseudo terminal with exactly one foreground process group.', 'Сессия — это псевдотерминал с ровно одной группой процессов на переднем плане.'),
        L('The terminal driver handles the control characters, not the program.', 'Управляющие символы обрабатывает драйвер терминала, а не программа.'),
        L('The suspend character stops the foreground job and returns the prompt.', 'Символ приостановки останавливает задачу и возвращает приглашение.'),
        L('A background job that reads the terminal is stopped by SIGTTIN.', 'Фоновая задача, читающая терминал, останавливается по SIGTTIN.'),
        L('tty and the terminal selection of ps show which process owns the terminal.', 'tty и выбор терминала в ps показывают, кто владеет терминалом.'),
      ],
      code: `# Who owns this terminal?
tty                       # /dev/pts/3
ps -t pts/3 -o pid,ppid,stat,cmd
stty -a                   # terminal settings

# Ctrl-Z stops the foreground job, then:
jobs                      # the stopped job
fg %1                     # resume it in the foreground
bg %1                     # resume it in the background

# Which process group is in front?
ps -o pid,pgid,tpgid,stat,cmd -p $$`,
      table: {
        caption: L('Control characters and the signals they raise', 'Управляющие символы и их сигналы'),
        headers: [L('Character', 'Символ'), L('Signal', 'Сигнал'), L('Effect', 'Действие')],
        rows: [
          [L('Ctrl-C', 'Ctrl-C'), L('SIGINT', 'SIGINT'), L('interrupt the foreground process group', 'прервать группу на переднем плане')],
          [L('Ctrl-Z', 'Ctrl-Z'), L('SIGTSTP', 'SIGTSTP'), L('stop the foreground job', 'остановить задачу на переднем плане')],
          [L('Ctrl-backslash', 'Ctrl-\\'), L('SIGQUIT', 'SIGQUIT'), L('quit and write a core dump', 'выйти и записать дамп ядра')],
          [L('Ctrl-D', 'Ctrl-D'), L('end of file', 'конец файла'), L('close the standard input', 'закрыть стандартный ввод')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('A catchable stop and an uncatchable one', 'Ловимая остановка и неловимая'),
          text: L(
            'The suspend character raises a signal a program may handle, so a server can clean up before it pauses. The stop signal used by kill cannot be caught at all, and it is the one to reach for when a process ignores the first request.',
            'Символ приостановки посылает сигнал, который программа может обработать, поэтому сервер может прибраться перед паузой. Сигнал остановки из kill не ловится вовсе, и к нему прибегают, когда процесс игнорирует первый запрос.'
          ),
        },
      ],
      takeaway: L(
        'One terminal has one foreground process group, and every control character is delivered by the terminal driver to that group alone.',
        'У одного терминала одна группа процессов на переднем плане, и каждый управляющий символ доставляется драйвером терминала только ей.'
      ),
      seeAlso: [
        L('Section 4-3: signals and graceful shutdown', 'Секция 4-3: сигналы и аккуратное завершение'),
        L('Section 4-1: running processes in the background', 'Секция 4-1: запуск процессов в фоне'),
      ],
    },
    {
      id: 'cli-ch4-s3',
      title: L('Signals and graceful shutdown', 'Сигналы и аккуратное завершение'),
      body: L(
        'A signal is a way for the kernel to deliver an event to a process without a call from that process. Most signals have a default action: the interrupt and the terminate signals kill the process, the kill signal cannot be caught or ignored at all, and the broken pipe signal kills a process that writes to a closed pipe. A program can install a handler for any signal except the kill and the stop signals, and the handler runs between system calls.\n\nThe distinction between the interrupt and the terminate signal is the difference between a user pressing the interrupt character and an administrator asking a service to stop. The interrupt signal is what the terminal sends to the foreground process group, the terminate signal is what an init system or a container runtime sends during a shutdown, and the handler for the terminate signal is where a graceful shutdown begins. The kill signal exists for the case where the process ignores everything else.\n\nA graceful shutdown has an order: stop accepting new work, let the work in flight finish, flush the state, close the connections and exit. A program that exits on the terminate signal without doing this loses the requests it was serving, and one that hangs while draining never exits, which is why the shutdown needs a deadline and a second, harder signal after it.\n\nThe kill command lists the signals by name and can send one to a process identifier. In a shell script the handler is installed with trap, and it must be installed before the event can arrive: a trap set after the risky command has already started may never run, because the signal may already have been delivered. The status of a process killed by a signal is 128 plus the signal number, so a process killed by the terminate signal reports 143, and that is a useful thing to see in a log.',
        'Сигнал — способ доставить процессу событие от ядра без вызова из этого процесса. У большинства сигналов есть умолчание: сигналы прерывания и завершения убивают процесс, сигнал принудительного завершения поймать или проигнорировать нельзя, а сигнал разрыва канала убивает процесс, пишущий в закрытый канал. Программа может установить обработчик для любого сигнала, кроме принудительного завершения и остановки, и обработчик выполняется между системными вызовами.\n\nРазница между сигналом прерывания и сигналом завершения — это разница между пользователем, нажавшим клавишу прерывания, и администратором, который просит сервис остановиться. Сигнал прерывания присылает терминал группе процессов на переднем плане, сигнал завершения шлёт система инициализации или среда выполнения контейнеров во время остановки, и именно обработчик сигнала завершения начинает аккуратное завершение. Сигнал принудительного завершения существует для случая, когда процесс игнорирует всё остальное.\n\nАккуратное завершение имеет порядок: перестать принимать новую работу, дать завершиться работе в полёте, сбросить состояние, закрыть соединения и выйти. Программа, которая выходит по сигналу завершения, не сделав этого, теряет обслуживаемые запросы, а программа, которая зависает при завершении, не выходит никогда — поэтому у завершения нужен предел времени и второй, более жёсткий сигнал после него.\n\nКоманда kill печатает список сигналов по именам и умеет отправить сигнал процессу по идентификатору. В скрипте оболочки обработчик ставится через trap, и его нужно установить до того, как событие может прийти: trap, поставленный после запуска рискованной команды, может не выполниться никогда, потому что сигнал уже доставлен. Код процесса, убитого сигналом, равен 128 плюс номер сигнала, поэтому процесс, убитый сигналом завершения, сообщает 143, и это полезно видеть в логах.'
      ),
      bullets: [
        L('Signals are asynchronous events delivered by the kernel.', 'Сигналы — асинхронные события, доставляемые ядром.'),
        L('The kill and stop signals cannot be caught or ignored.', 'Сигналы принудительного завершения и остановки нельзя поймать или проигнорировать.'),
        L('The interrupt signal comes from the terminal, the terminate signal from an init system.', 'Сигнал прерывания идёт от терминала, сигнал завершения — от системы инициализации.'),
        L('A graceful shutdown stops intake, drains, flushes and then exits.', 'Аккуратное завершение: прекратить приём, слить работу, сбросить состояние и выйти.'),
        L('A process killed by a signal reports 128 plus the signal number.', 'Процесс, убитый сигналом, сообщает 128 плюс номер сигнала.'),
      ],
      code: `# List the signals by name
kill -l

# Ask nicely first, insist second
kill -TERM 12345           # ask the process to stop
sleep 5
kill -0 12345 2>/dev/null && kill -KILL 12345

# In a shell script, install the handler before the risky part
trap 'echo "cleanup"; rm -f /tmp/work.lock' EXIT
trap 'echo "interrupted"; exit 130' INT

./long-job.sh
echo "done"`,
      table: {
        caption: L('The signals a terminal engineer meets', 'Сигналы, которые встречает инженер'),
        headers: [L('Signal', 'Сигнал'), L('Default action', 'Действие по умолчанию'), L('Typical source', 'Откуда')],
        rows: [
          [L('SIGINT', 'SIGINT'), L('terminate', 'завершение'), L('the interrupt character', 'символ прерывания')],
          [L('SIGTERM', 'SIGTERM'), L('terminate', 'завершение'), L('an init system or a container runtime', 'система инициализации или среда контейнеров')],
          [L('SIGHUP', 'SIGHUP'), L('terminate', 'завершение'), L('the terminal was closed', 'терминал закрыли')],
          [L('SIGKILL', 'SIGKILL'), L('terminate, uncatchable', 'завершение, не ловится'), L('the last resort', 'крайняя мера')],
          [L('SIGPIPE', 'SIGPIPE'), L('terminate', 'завершение'), L('writing to a closed pipe', 'запись в закрытый канал')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The handler installed too late', 'Обработчик, поставленный слишком поздно'),
          text: L(
            'A trap that is set after the risky command has already started may never run, because the signal can arrive before the handler exists. Install every handler at the top of the script, before anything that can fail.',
            'Trap, поставленный после запуска рискованной команды, может не выполниться никогда: сигнал может прийти раньше, чем появится обработчик. Ставьте все обработчики в начале скрипта, до всего, что может упасть.'
          ),
        },
      ],
      takeaway: L(
        'Handle the terminate signal as a request to drain, install the handler before the event, and keep the kill signal as the last resort.',
        'Воспринимайте сигнал завершения как просьбу слить работу, ставьте обработчик заранее, а принудительное завершение оставьте на крайний случай.'
      ),
      seeAlso: [
        L('Section 4-1: running processes in the background', 'Секция 4-1: запуск процессов в фоне'),
        L('Section 6-4: traps and cleanup', 'Секция 6-4: trap-ы и очистка'),
      ],
    },
    {
      id: 'cli-ch4-s4',
      title: L('ps, top, kill and process trees', 'ps, top, kill и дерево процессов'),
      body: L(
        'ps shows the process table. The classic form prints the user, the process identifier, the share of the processor, the share of memory, the virtual size, the resident size, the terminal, the start time and the command, and the other classic form prints the same information in a different layout. A request for named fields and one process identifier prints exactly what you asked for, which is what you want in a script or a health check.\n\nEvery process has a parent, and the parent identifier is what turns the flat table into a tree. The forest option of ps or the tree command shows the hierarchy, and it explains a lot: which process started the server, why a shell keeps running after one of its children died, and where a runaway process would show up. On Linux the same information lives in the proc filesystem, where every process has a directory named after its identifier.\n\ntop shows a live view and its interactive alternative is easier to read, with per-process processor and memory, sorting by the column you press and a tree view. The state column matters when a process misbehaves: R is running, S is sleeping, D is uninterruptible sleep and usually means waiting on a disk or a network device, Z is a zombie, a finished child whose parent has not collected it yet, and T is stopped.\n\nKilling is done by process identifier, and the useful variants send the terminate signal first, escalate to the kill signal as a last resort, match a whole command line, or match an exact name. Before killing anything, look at what the process actually is: the file listing of a process shows the files it holds open and the system call tracer shows what it is doing, and both tell you whether the identifier was recycled by an unrelated process.',
        'ps показывает таблицу процессов. Классическая форма печатает пользователя, идентификатор процесса, долю процессора, долю памяти, виртуальный размер, резидентный размер, терминал, время запуска и команду, а вторая классическая форма печатает те же данные в другой разметке. Запрос конкретных полей для одного идентификатора даёт ровно то, что попросили, — именно это и нужно в скрипте или в проверке состояния.\n\nУ каждого процесса есть родитель, и именно идентификатор родителя превращает плоскую таблицу в дерево. Опция леса у ps или команда построения дерева показывают иерархию, и она объясняет многое: какой процесс запустил сервер, почему оболочка продолжает работать после смерти одного из детей и где искать процесс, ушедший в зацикливание. В Linux та же информация лежит в файловой системе proc, где у каждого процесса есть каталог с его именем.\n\ntop показывает живую картину, а его интерактивный аналог читается легче: потребление процессора и памяти по каждому процессу, сортировка по нажатой колонке и вид дерева. Когда процесс ведёт себя странно, важна колонка состояния: R — работает, S — спит, D — непрерываемый сон и обычно означает ожидание диска или сетевого устройства, Z — зомби, то есть завершившийся ребёнок, которого родитель ещё не забрал, T — остановлен.\n\nУбийство делается по идентификатору процесса, а полезные варианты отправляют сначала сигнал завершения, затем переходят к принудительному как к крайней мере, либо matchят всю командную строку, либо точное имя. Прежде чем что-либо убивать, посмотрите, что это за процесс: список открытых файлов показывает, что процесс держит, а трассировка системных вызовов — что он делает, и оба отвечают, не переиспользовал ли идентификатор какой-то посторонний процесс.'
      ),
      bullets: [
        L('The two classic forms of ps show the same table in different layouts.', 'Две классические формы ps показывают одну таблицу в разной разметке.'),
        L('Asking for named fields and one identifier prints exactly what you need.', 'Запрос конкретных полей для одного идентификатора даёт ровно нужное.'),
        L('The forest option and the tree command show the parent-child hierarchy.', 'Опция леса и команда построения дерева показывают иерархию.'),
        L('The state letter explains a stuck process: D waits on the device, Z is a zombie.', 'Буква состояния объясняет зависший процесс: D ждёт устройство, Z — зомби.'),
        L('Check the command line before killing, the identifier may belong to another process.', 'Проверьте командную строку перед убийством: идентификатор мог достаться другому процессу.'),
      ],
      code: `# Who is running
ps aux
ps -ef | grep node
ps -o pid,ppid,stat,%cpu,%mem,cmd -p 1234

# The tree
ps -eo pid,ppid,cmd --forest | head -30
pstree -p | head -20

# Live view and signals
top -p 1234
kill -TERM 1234
pkill -f "node server.js"

# Before you kill it, look at it
lsof -p 1234`,
      table: {
        caption: L('Process inspection commands', 'Команды для изучения процессов'),
        headers: [L('Command', 'Команда'), L('Answers', 'Отвечает на вопрос')],
        rows: [
          [L('ps aux', 'ps aux'), L('what is running right now', 'что сейчас работает')],
          [L('ps -o fields -p PID', 'ps -o fields -p PID'), L('the details of one process', 'подробности одного процесса')],
          [L('ps --forest', 'ps --forest'), L('the parent-child tree', 'дерево родителей и детей')],
          [L('top', 'top'), L('who consumes the processor and the memory', 'кто ест процессор и память')],
          [L('lsof -p PID', 'lsof -p PID'), L('which files and sockets the process holds', 'какие файлы и сокеты держит процесс')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The recycled process identifier', 'Переиспользованный идентификатор процесса'),
          text: L(
            'Process identifiers are reused. A script that kills a saved identifier months later may kill an unrelated process, and the kill signal gives it no chance to finish its work or close its files. Always check the command line and the start time of the process before you send a signal.',
            'Идентификаторы процессов переиспользуются. Скрипт, который убивает сохранённый идентификатор спустя месяцы, может убить посторонний процесс, а сигнал завершения не даст ему закончить работу и закрыть файлы. Всегда проверяйте командную строку и время запуска перед отправкой сигнала.'
          ),
        },
      ],
      takeaway: L(
        'Read the process table before you act, and check the command line of a process before you kill it.',
        'Сначала прочитайте таблицу процессов, а перед убийством проверьте командную строку процесса.'
      ),
      seeAlso: [
        L('Section 4-3: signals and graceful shutdown', 'Секция 4-3: сигналы и аккуратное завершение'),
        L('Section 4-5: nohup, disown and long-running jobs', 'Секция 4-5: nohup, disown и долгие задачи'),
      ],
    },
    {
      id: 'cli-ch4-s5',
      title: L('nohup, disown and long-running jobs', 'nohup, disown и долгие задачи'),
      body: L(
        'A background job is a child of the shell, and when the shell exits it receives a hangup and the children die with it. nohup wraps a command so that the hangup signal is ignored, which is exactly what is needed for work that must outlive the session. It also redirects the standard output to a file in the current directory unless you redirect it yourself, which is a detail worth knowing because the log ends up in the directory where the command started.\n\ndisown removes a job from the shell job table. The job keeps running, but the shell no longer tracks it, so the shell will not send it a signal at exit and will not list it among the jobs. The combination of nohup with the ampersand and a redirect, or the ampersand followed by disown, covers most of the cases where a command has to run while the terminal is closed.\n\nA more robust answer is a new session. The setsid command starts the process in a new session with no controlling terminal, which means it cannot receive a hangup at all and it is not killed when the terminal disappears. That is the mechanism behind the terminal multiplexers, which keep a session alive on a server and let you attach to it and detach from it again.\n\nOn a modern server the right answer is usually the init system. Its units are restarted on failure, restarted on reboot and have their own logging. A container runtime does the same thing for containers. The shell-level tools are for the case where you have nothing but a terminal: nohup, disown, setsid and a multiplexer cover that case well, but they do not replace a supervisor that restarts a crashed process.',
        'Фоновая задача — дочерний процесс оболочки, и когда оболочка выходит, она получает сигнал отключения, а дети гибнут вместе с ней. nohup оборачивает команду так, что сигнал отключения игнорируется, — ровно то, что нужно для работы, которая должна пережить сессию. Он же перенаправляет стандартный вывод в файл текущего каталога, если вы не перенаправили его сами, и об этом стоит знать: журнал окажется в том каталоге, откуда запустилась команда.\n\ndisown убирает задачу из таблицы задач оболочки. Задача продолжает работать, но оболочка её больше не отслеживает: не пошлёт ей сигнал при выходе и не покажет в списке задач. Сочетание nohup с амперсандом и перенаправлением либо амперсанд с последующим disown покрывает почти все случаи, когда команда должна работать при закрытом терминале.\n\nБолее надёжный ответ — новая сессия. Команда setsid запускает процесс в новой сессии без управляющего терминала, а значит, он не может получить сигнал отключения и не гибнет, когда терминал исчезает. Именно на этом механизме построены мультиплексоры терминалов, которые держат сессию живой на сервере и позволяют то подключиться к ней, то отключиться.\n\nНа современном сервере правильный ответ — обычно система инициализации. Её юниты перезапускаются при сбое, перезапускаются после перезагрузки и ведут собственный журнал. Среда выполнения контейнеров делает то же самое для контейнеров. Инструменты уровня оболочки нужны для случая, когда у вас есть только терминал: nohup, disown, setsid и мультиплексор закрывают его хорошо, но не заменяют супервизора, который перезапустит упавший процесс.'
      ),
      bullets: [
        L('nohup ignores the hangup signal so the command survives the terminal closing.', 'nohup игнорирует сигнал отключения, поэтому команда переживает закрытие терминала.'),
        L('nohup redirects the output to a file unless you redirect it yourself.', 'nohup перенаправляет вывод в файл, если не перенаправили сами.'),
        L('disown removes the job from the shell job table without stopping it.', 'disown убирает задачу из таблицы задач, не останавливая её.'),
        L('setsid starts a new session with no controlling terminal.', 'setsid запускает новую сессию без управляющего терминала.'),
        L('A supervisor restarts a crashed process, nohup does not.', 'Супервизор перезапускает упавший процесс, nohup — нет.'),
      ],
      code: `# Survive the terminal
nohup npm run build > build.log 2>&1 &
disown                   # the shell forgets about the job

# No controlling terminal at all
setsid ./worker.sh < /dev/null > worker.log 2>&1 &

# Keep a session you can come back to
tmux new -s deploy
# detach with Ctrl-b d, come back with tmux attach -t deploy

# Check that it is still alive
ps -o pid,ppid,etime,cmd -p 1234
tail -f build.log`,
      table: {
        caption: L('What survives the terminal and what restarts', 'Что переживает терминал, а что перезапускается'),
        headers: [L('Mechanism', 'Механизм'), L('Survives the terminal closing', 'Переживает закрытие терминала'), L('Restarts after a crash', 'Перезапускается после сбоя')],
        rows: [
          [L('&', '&'), L('no', 'нет'), L('no', 'нет')],
          [L('nohup', 'nohup'), L('yes', 'да'), L('no', 'нет')],
          [L('disown', 'disown'), L('yes', 'да'), L('no', 'нет')],
          [L('setsid', 'setsid'), L('yes', 'да'), L('no', 'нет')],
          [L('an init system unit', 'юнит системы инициализации'), L('yes', 'да'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The log file in the wrong directory', 'Журнал в неправильном каталоге'),
          text: L(
            'nohup writes to a file with a fixed name in the directory where the command started, so the log can end up in a temporary directory or in the root of a repository. Always redirect the output yourself and use an absolute path for the log.',
            'nohup пишет в файл с фиксированным именем в каталоге, откуда запустилась команда, поэтому журнал может оказаться во временном каталоге или в корне репозитория. Всегда перенаправляйте вывод сами и указывайте для журнала абсолютный путь.'
          ),
        },
      ],
      takeaway: L(
        'Use nohup or setsid for work that must outlive the session, and a supervisor for work that must be restarted.',
        'Используйте nohup или setsid для работы, которая должна пережить сессию, а супервизора — для работы, которую нужно перезапускать.'
      ),
      seeAlso: [
        L('Section 4-1: running processes in the background', 'Секция 4-1: запуск процессов в фоне'),
        L('Section 4-4: ps, top, kill and process trees', 'Секция 4-4: ps, top, kill и дерево процессов'),
      ],
    },
  ],
};
