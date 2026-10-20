import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const cliCh07: Chapter = {
  id: 'cli-ch7',
  title: L('Networking and remote work', 'Сеть и удалённая работа'),
  summary: L(
    'The tools that connect a terminal to the rest of the world: curl for HTTP requests, ssh with a configuration file, rsync for transfers, tunnels for private services and database clients that need no graphical interface.',
    'Инструменты, которые связывают терминал с внешним миром: curl для HTTP-запросов, ssh с файлом конфигурации, rsync для передачи файлов, туннели для приватных сервисов и консольные клиенты к базам данных.'
  ),
  sections: [
    {
      id: 'cli-ch7-s1',
      title: L('curl and the HTTP verbs', 'curl и HTTP-методы'),
      body: L(
        'curl sends an HTTP request and prints the response, and most of its usefulness comes from a handful of options. The option -X selects the method, -H adds a header, -d sends a body, -o writes the body to a file and -i prints the response headers together with the body. Without any option curl performs a GET, which is the request a browser makes when you open a URL.\n\nThe options that decide whether the output is usable are the quiet ones. The option -s silences the progress meter, the option -S keeps the error message even in quiet mode, and the option -f makes curl fail with a non-zero status when the server answers with an error code, which is what turns a script into something that stops when the API is down. The option -w writes a template with the status code and the timings after the run, which is enough to build a health check.\n\nSecrets do not belong on the command line. A token written as a header argument is visible in the history file, in the process list and in the output of ps, so it should come from a file, from an environment variable the shell expands, or from a header file that is never committed. The options -b and -c read and write a cookie jar, which is how a session is kept between two calls.',
        'curl отправляет HTTP-запрос и печатает ответ, и вся его полезность держится на горстке опций. Опция -X выбирает метод, -H добавляет заголовок, -d отправляет тело, -o записывает тело в файл, а -i печатает заголовки ответа вместе с телом. Без опций curl выполняет GET — тот самый запрос, который делает браузер при открытии адреса.\n\nОпции, которые решают, пригоден ли вывод, относятся к тихим. Опция -s гасит счётчик прогресса, опция -S сохраняет сообщение об ошибке даже в тихом режиме, а опция -f заставляет curl завершиться с ненулевым кодом, когда сервер отвечает ошибкой, и именно это превращает скрипт в нечто, останавливающееся при падении API. Опция -w печатает шаблон с кодом ответа и таймингами после выполнения, чего достаточно для проверки живости сервиса.\n\nСекреты не должны попадать в командную строку. Токен, переданный как аргумент заголовка, виден в файле истории, в списке процессов и в выводе ps, поэтому он должен приходить из файла, из переменной окружения, которую раскрывает оболочка, или из файла заголовков, который не коммитится. Опции -b и -c читают и пишут cookie-jar, так сессия сохраняется между двумя вызовами.'
      ),
      bullets: [
        L('curl with no options sends a GET request.', 'curl без опций отправляет запрос GET.'),
        L('-f fails with a non-zero status on an HTTP error, -s silences the meter.', '-f завершается с ненулевым кодом при HTTP-ошибке, -s гасит счётчик прогресса.'),
        L('-S keeps the error message while the output stays quiet.', '-S сохраняет сообщение об ошибке при тихом выводе.'),
        L('-w prints a template with the status code and the timings.', '-w печатает шаблон с кодом ответа и таймингами.'),
        L('-L follows redirects, --max-time bounds the whole run.', '-L следует за перенаправлениями, --max-time ограничивает весь запуск.'),
        L('A token in an argument ends up in the history and in the process list.', 'Токен в аргументе попадает в историю и в список процессов.'),
      ],
      code: `# A plain request with the headers visible
curl -i https://example.com/api/health

# Send JSON and read the answer
curl -fsS https://api.example.com/items \\
  -H 'Authorization: Bearer \$API_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"demo"}'

# Download to a file, follow redirects, stop after 30 seconds
curl -fsSL --max-time 30 https://example.com/app.tgz -o app.tgz

# Print only the status code and the total time
curl -s -o /dev/null -w '%{http_code} %{time_total}\\n' https://example.com`,
      table: {
        caption: L('curl options that matter', 'Опции curl, которые действительно важны'),
        headers: [L('Option', 'Опция'), L('Effect', 'Действие'), L('Use it for', 'Для чего')],
        rows: [
          [L('-X', '-X'), L('choose the HTTP method', 'выбор HTTP-метода'), L('POST, PUT, DELETE', 'POST, PUT, DELETE')],
          [L('-H', '-H'), L('add a request header', 'добавление заголовка запроса'), L('authentication and content type', 'аутентификация и тип содержимого')],
          [L('-d', '-d'), L('send a request body', 'отправка тела запроса'), L('form and JSON payloads', 'форма и полезная нагрузка JSON')],
          [L('-o', '-o'), L('write the body to a file', 'запись тела в файл'), L('downloads', 'загрузки')],
          [L('-f', '-f'), L('fail on an HTTP error code', 'сбой при коде ошибки HTTP'), L('scripts and health checks', 'скрипты и проверки живости')],
          [L('-w', '-w'), L('print a template after the run', 'печать шаблона после запуска'), L('status code and timings', 'код ответа и тайминги')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The token in the process list', 'Токен в списке процессов'),
          text: L(
            'Any user on the machine can read the arguments of a running process through /proc or ps, and the shell keeps every command in the history file. Pass the token through the environment, or read the headers from a file with -H @file, and keep that file outside the repository.',
            'Любой пользователь машины может прочитать аргументы запущенного процесса через /proc или ps, а оболочка хранит каждую команду в файле истории. Передавайте токен через окружение или читайте заголовки из файла через -H @file, и держите этот файл вне репозитория.'
          ),
        },
        {
          tone: 'tip',
          title: L('A health check in one line', 'Проверка живости в одну строку'),
          text: L(
            'The combination of -f and -w turns a request into a check that any script can use: a non-zero status means the endpoint is not healthy, and the format string says how long it took. Wrap it in a function and the whole monitoring story is done.',
            'Сочетание -f и -w превращает запрос в проверку, пригодную для любого скрипта: ненулевой код означает, что эндпоинт не здоров, а строка формата сообщает, сколько это заняло времени. Оберните это в функцию, и вся история с мониторингом готова.'
          ),
        },
      ],
      takeaway: L(
        'Put -f into every script that talks to an API, and keep the token out of the command line.',
        'Добавляйте -f в каждый скрипт, который ходит в API, и не держите токен в командной строке.'
      ),
      seeAlso: [
        L('Section 3-1: stdin, stdout, stderr and redirection', 'Секция 3-1: стандартные потоки и перенаправление'),
        L('Section 8-6: CI pipelines from the command line', 'Секция 8-6: CI-пайплайны как команды'),
        L('Chapter 8: build and automation tooling', 'Глава 8: сборка и инструменты автоматизации'),
      ],
    },
    {
      id: 'cli-ch7-s2',
      title: L('ssh and the config file', 'ssh и файл конфигурации'),
      body: L(
        'ssh does two things: it authenticates you and it opens a channel. The channel can be an interactive shell, a single command or a tunnel, and the same key and the same configuration serve all three. The default keys live in ~/.ssh and are created by ssh-keygen, which is called once per machine with the algorithm named explicitly: ssh-keygen -t ed25519. The private key never leaves the machine and is protected by a passphrase.\n\nThe file ~/.ssh/config turns a long command into a short one. A Host block names a target and sets the user, the port, the identity file and the jump host, so that ssh prod becomes a full connection with the right key. The file is read in order and the first matching value for an option wins, which is why the first block of the file behaves differently from the last one, and why wildcards such as Host * belong at the bottom.\n\nTwo files decide whether the connection is trusted. The file known_hosts stores the public keys of the hosts you have seen, and ssh refuses to connect to a host whose key changed, because that is exactly what a man in the middle looks like. The option StrictHostKeyChecking=accept-new adds unknown hosts automatically, which is convenient for a fleet of machines you manage and wrong for a server you do not own.',
        'ssh делает две вещи: аутентифицирует вас и открывает канал. Каналом может быть интерактивная оболочка, одиночная команда или туннель, и один и тот же ключ с одной и той же конфигурацией годятся для всех трёх. Ключи по умолчанию лежат в ~/.ssh и создаются через ssh-keygen, который вызывают один раз на машину с явно названным алгоритмом: ssh-keygen -t ed25519. Приватный ключ никогда не покидает машину и защищён парольной фразой.\n\nФайл ~/.ssh/config превращает длинную команду в короткую. Блок Host называет цель и задаёт пользователя, порт, файл ключа и хост-переход, так что ssh prod становится полноценным подключением с нужным ключом. Файл читается по порядку, и первое совпавшее значение для опции побеждает, поэтому первый блок файла ведёт себя не так, как последний, и шаблоны вроде Host * должны стоять внизу.\n\nДва файла решают, доверен ли канал. Файл known_hosts хранит публичные ключи виденных хостов, и ssh отказывается подключаться к хосту с изменившимся ключом, потому что это выглядит ровно как атака посредника. Опция StrictHostKeyChecking=accept-new добавляет незнакомые хосты автоматически, что удобно для парка машин под вашим управлением и неверно для сервера, который вам не принадлежит.'
      ),
      bullets: [
        L('ssh-keygen -t ed25519 creates the key pair, the private key stays on the machine.', 'ssh-keygen -t ed25519 создаёт пару ключей, приватный остаётся на машине.'),
        L('~/.ssh/config holds Host blocks, the first matching option wins.', '~/.ssh/config хранит блоки Host, побеждает первое совпавшее значение.'),
        L('The agent keeps the unlocked key in memory, ssh-add puts it there.', 'Агент держит разблокированный ключ в памяти, ssh-add кладёт его туда.'),
        L('known_hosts protects against a changed host key.', 'known_hosts защищает от подмены ключа хоста.'),
        L('StrictHostKeyChecking=accept-new is a convenience, not a security policy.', 'StrictHostKeyChecking=accept-new — удобство, а не политика безопасности.'),
      ],
      code: `# ~/.ssh/config
# Host prod
#   HostName 10.0.1.20
#   User deploy
#   Port 2222
#   IdentityFile ~/.ssh/id_ed25519

# Create a key and load it into the agent
ssh-keygen -t ed25519 -C 'deploy@prod'
eval "\$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Use it
ssh prod 'uptime'
ssh -J bastion prod 'docker ps'`,
      table: {
        caption: L('Where the ssh settings live', 'Где лежат настройки ssh'),
        headers: [L('File', 'Файл'), L('Holds', 'Содержит'), L('Shared', 'Общий')],
        rows: [
          [L('~/.ssh/config', '~/.ssh/config'), L('your own shortcuts and defaults', 'ваши сокращения и умолчания'), L('no, per user', 'нет, для пользователя')],
          [L('~/.ssh/known_hosts', '~/.ssh/known_hosts'), L('the host keys you trust', 'ключи хостов, которым вы доверяете'), L('no, per user', 'нет, для пользователя')],
          [L('/etc/ssh/ssh_config', '/etc/ssh/ssh_config'), L('system defaults for the client', 'системные умолчания клиента'), L('yes, per host', 'да, для узла')],
          [L('/etc/ssh/sshd_config', '/etc/ssh/sshd_config'), L('the settings of the server', 'настройки сервера'), L('yes, per host', 'да, для узла')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Never disable the host key check', 'Никогда не отключайте проверку ключа хоста'),
          text: L(
            'Turning the check off removes the only warning you get when the identity of a machine changes. The attack it prevents is simple: the connection is redirected to a machine that reads the password and the key, then forwards the session to the real server.',
            'Отключение проверки убирает единственное предупреждение при смене личности машины. Атака, которую она предотвращает, проста: соединение перенаправляется на машину, которая читает пароль и ключ, а затем проксирует сессию настоящему серверу.'
          ),
        },
        {
          tone: 'tip',
          title: L('One Host block per target', 'По блоку Host на каждую цель'),
          text: L(
            'Naming the targets after what they are, instead of after their addresses, keeps the file readable and lets the address change in one place. A block named after the environment also documents which key belongs to which machine.',
            'Если называть цели по назначению, а не по адресам, файл остаётся читаемым, а адрес меняется в одном месте. Блок, названный по окружению, заодно документирует, какой ключ к какой машине относится.'
          ),
        },
      ],
      takeaway: L(
        'Put the user, the port and the key into ~/.ssh/config, keep the private key on your machine, and let ssh verify the host key.',
        'Заносите пользователя, порт и ключ в ~/.ssh/config, держите приватный ключ на своей машине и позвольте ssh проверять ключ хоста.'
      ),
      seeAlso: [
        L('Section 7-3: scp, rsync and transfers', 'Секция 7-3: scp, rsync и передача файлов'),
        L('Section 7-4: port forwarding and tunnels', 'Секция 7-4: проброс портов и туннели'),
        L('Section 5-4: su, sudo and privilege escalation', 'Секция 5-4: su, sudo и повышение привилегий'),
      ],
    },
    {
      id: 'cli-ch7-s3',
      title: L('scp, rsync and transfers', 'scp, rsync и передача файлов'),
      body: L(
        'scp copies files over ssh and is the simplest thing that works: scp file host:/path copies one file, scp -r dir host:/path copies a tree. It has no idea what changed, so the same directory transfers the same bytes every time, and a large copy over a slow link is a large copy every time.\n\nrsync compares the two sides before transferring and sends only the differences, which makes the second run of a deployment nearly free. The option -a preserves permissions, times and links, the option -v explains what happened and the option --progress shows the transfer. The important detail is the trailing slash: a source ending in a slash copies the contents of the directory, and a source without it copies the directory itself, so the difference decides the shape of the result on the other side.\n\nThe option --delete removes files on the receiving side that are gone on the sending side, which is what makes rsync a mirror rather than a copier, and which is also its most dangerous flag. Point it at the wrong path and it deletes the wrong directory. The option --exclude keeps patterns out of the transfer, and the option --dry-run shows what would happen without touching anything, which is the command to run before every first use.',
        'scp копирует файлы через ssh и это самое простое, что работает: scp file host:/path копирует один файл, scp -r dir host:/path копирует дерево. Он не знает, что изменилось, поэтому один и тот же каталог каждый раз передаёт одни и те же байты, а большая копия по медленному каналу остаётся большой копией.\n\nrsync сравнивает обе стороны перед передачей и отправляет только различия, поэтому второй прогон развёртывания почти ничего не стоит. Опция -a сохраняет права, времена и ссылки, опция -v объясняет, что произошло, а --progress показывает передачу. Важная деталь — завершающий слэш: источник со слэшем копирует содержимое каталога, а без него — сам каталог, и разница решает форму результата на другой стороне.\n\nОпция --delete убирает на принимающей стороне файлы, которых нет на отправляющей, и именно это делает rsync зеркалом, а не копировщиком, и именно она опаснее всего. Ошибитесь с путём — и удалится не тот каталог. Опция --exclude исключает шаблоны из передачи, а --dry-run показывает, что произойдёт, ничего не трогая, и вот эту команду надо запускать перед каждым первым применением.'
      ),
      bullets: [
        L('scp copies files over ssh and always transfers the whole file.', 'scp копирует файлы через ssh и всегда передаёт файл целиком.'),
        L('rsync transfers only the differences between the two sides.', 'rsync передаёт только различия между двумя сторонами.'),
        L('-a preserves permissions, times and symlinks.', '-a сохраняет права, времена и символические ссылки.'),
        L('A trailing slash on the source changes what lands on the target.', 'Завершающий слэш в источнике меняет то, что окажется на цели.'),
        L('--delete turns rsync into a mirror and is the flag that removes data.', '--delete превращает rsync в зеркало, и именно этот флаг удаляет данные.'),
        L('--dry-run shows the plan without touching the target.', '--dry-run показывает план, не трогая цель.'),
      ],
      code: `# Copy one file and one directory
scp report.pdf deploy@prod:/srv/app/
scp -r assets deploy@prod:/srv/app/

# Copy only what changed, keeping the attributes
rsync -av --progress ./dist/ deploy@prod:/srv/app/dist/

# Mirror the directory, excluding what must not travel
rsync -av --delete --exclude 'node_modules' --exclude '.git' ./site/ prod:/var/www/

# See the plan first
rsync -av --delete --dry-run ./site/ prod:/var/www/`,
      table: {
        caption: L('Copy or synchronise', 'Копировать или синхронизировать'),
        headers: [L('Property', 'Свойство'), L('scp', 'scp'), L('rsync', 'rsync')],
        rows: [
          [L('Transfers only the differences', 'Передаёт только различия'), L('no', 'нет'), L('yes', 'да')],
          [L('Deletes extra files on the target', 'Удаляет лишние файлы на цели'), L('no', 'нет'), L('yes, with --delete', 'да, с --delete')],
          [L('Shows a plan before running', 'Показывает план перед запуском'), L('no', 'нет'), L('yes, with --dry-run', 'да, с --dry-run')],
          [L('Preserves permissions and times', 'Сохраняет права и времена'), L('with -p', 'с -p'), L('yes, with -a', 'да, с -a')],
          [L('Runs over ssh', 'Работает через ssh'), L('yes', 'да'), L('yes, with -e ssh', 'да, с -e ssh')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The trailing slash decides the shape', 'Завершающий слэш решает форму'),
          text: L(
            'Copying the directory dist gives /srv/app/dist on the target, while copying dist/ puts its contents straight into /srv/app. The same one-character difference in a deploy script creates either a nested path that nothing expects or an overwrite of the wrong directory.',
            'Копирование каталога dist даст на цели /srv/app/dist, а копирование dist/ положит его содержимое прямо в /srv/app. Разница в одном символе в скрипте развёртывания создаёт либо вложенный путь, которого никто не ждёт, либо перезапись не того каталога.'
          ),
        },
        {
          tone: 'warning',
          title: L('--delete is a destructive flag', '--delete разрушительный флаг'),
          text: L(
            'With --delete rsync makes the target an exact copy of the source, and any file that exists only on the target disappears. Run it with --dry-run first, and keep the excluded patterns, because the build artefacts and the mounted configuration live only on the server side.',
            'С --delete rsync делает цель точной копией источника, и любой файл, существующий только на цели, исчезает. Сначала прогоняйте с --dry-run и держите список исключений, потому что артефакты сборки и подключённая конфигурация живут только на сервере.'
          ),
        },
      ],
      takeaway: L(
        'Use rsync for repeated transfers, check the trailing slash, and never run --delete without a dry run first.',
        'Используйте rsync для повторяющихся передач, проверяйте завершающий слэш и никогда не запускайте --delete без пробного прогона.'
      ),
      seeAlso: [
        L('Section 7-2: ssh and the config file', 'Секция 7-2: ssh и файл конфигурации'),
        L('Section 1-3: paths, the working directory and symlinks', 'Секция 1-3: пути, рабочий каталог и символические ссылки'),
        L('Section 5-5: hard links, symlinks and special files', 'Секция 5-5: жёсткие ссылки, символические ссылки и специальные файлы'),
      ],
    },
    {
      id: 'cli-ch7-s4',
      title: L('Port forwarding and tunnels', 'Проброс портов и туннели'),
      body: L(
        'A tunnel is a process that carries bytes from one place to another, and ssh is a convenient way to run one because the connection is already encrypted and already authenticated. The option -L opens a local port that forwards to a remote destination, the option -R opens a remote port that forwards back to your machine, and the option -D opens a SOCKS proxy for everything that speaks SOCKS.\n\nThe local forward is the one that earns its keep in daily work: a database that listens on a private interface becomes reachable on localhost, and a service that sits behind a jump host becomes reachable without changing its configuration. The remote forward is the way to expose a local development server to a colleague or to a webhook, and the dynamic proxy is the way to browse the network of a host you have no other access to.\n\nA tunnel is a process, and processes end. The option -N does nothing but forward and the option -f pushes the tunnel into the background, and together with ExitOnForwardFailure they turn a fragile command into a reliable one. The last flag makes ssh fail when the port cannot be bound, instead of pretending it worked, and that difference decides whether a deploy script reports the truth.',
        'Туннель — это процесс, который переносит байты из одного места в другое, и ssh удобен для этого, потому что соединение уже зашифровано и уже аутентифицировано. Опция -L открывает локальный порт, который пробрасывает к удалённому адресу, опция -R открывает удалённый порт, который пробрасывает обратно на вашу машину, а опция -D поднимает SOCKS-прокси для всего, что умеет говорить по SOCKS.\n\nЛокальный проброс — тот, что окупается в ежедневной работе: база данных, слушающая на приватном интерфейсе, становится доступна на localhost, а сервис за хостом-переходом становится доступен без изменения его конфигурации. Удалённый проброс — способ показать локальный сервер разработки коллеге или вебхуку, а динамический прокси — способ ходить в сеть хоста, в который другого доступа нет.\n\nТуннель — это процесс, а процессы заканчиваются. Опция -N ничего не делает, кроме проброса, опция -f уводит туннель в фон, и вместе с ExitOnForwardFailure они превращают хрупкую команду в надёжную. Последний флаг заставляет ssh упасть, когда порт занять не удалось, вместо того чтобы притворяться, что всё получилось, и именно эта разница решает, скажет ли скрипт развёртывания правду.'
      ),
      bullets: [
        L('-L forwards a local port to a remote destination.', '-L пробрасывает локальный порт к удалённому адресу.'),
        L('-R forwards a remote port back to your machine.', '-R пробрасывает удалённый порт обратно на вашу машину.'),
        L('-D opens a SOCKS proxy for the whole session.', '-D поднимает SOCKS-прокси на всю сессию.'),
        L('-N forwards nothing but the tunnel, -f puts it in the background.', '-N пробрасывает только туннель, -f уводит его в фон.'),
        L('ExitOnForwardFailure makes ssh fail when the port cannot be bound.', 'ExitOnForwardFailure заставляет ssh упасть, если порт не занят.'),
        L('A tunnel is a process and dies with the session or the machine.', 'Туннель — процесс и умирает вместе с сессией или машиной.'),
      ],
      code: `# Reach a database that only listens on the private interface of a host
ssh -N -f -L 5432:db.internal:5432 bastion
psql -h 127.0.0.1 -p 5432 -U app

# Expose a local dev server to a remote webhook
ssh -N -f -R 8080:localhost:3000 deploy@prod

# Route everything through a host as a SOCKS proxy
ssh -N -f -D 1080 bastion
curl --proxy socks5h://127.0.0.1:1080 https://example.com

# Fail loudly when the port is already taken
ssh -N -f -o ExitOnForwardFailure=yes -L 5432:db:5432 bastion`,
      table: {
        caption: L('The three kinds of tunnel', 'Три вида туннелей'),
        headers: [L('Option', 'Опция'), L('Direction', 'Направление'), L('Typical use', 'Типичное применение')],
        rows: [
          [L('-L', '-L'), L('local port to a remote address', 'локальный порт к удалённому адресу'), L('a private database or service', 'приватная база или сервис')],
          [L('-R', '-R'), L('remote port back to your machine', 'удалённый порт обратно на вашу машину'), L('a dev server or a webhook', 'сервер разработки или вебхук')],
          [L('-D', '-D'), L('any connection through a SOCKS proxy', 'любое соединение через SOCKS-прокси'), L('reaching a private network', 'доступ в приватную сеть')],
          [L('-W', '-W'), L('stdin and stdout to a remote host', 'stdin и stdout к удалённому хосту'), L('a jump host in the middle of a chain', 'хост-переход в середине цепочки')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A tunnel that silently does nothing', 'Туннель, который молча ничего не делает'),
          text: L(
            'Without ExitOnForwardFailure the ssh command returns successfully even when the port could not be bound, and the next command talks to whatever already listens on that port. The flag turns a silent misconfiguration into an error at the moment it happens.',
            'Без ExitOnForwardFailure команда ssh возвращает успех, даже если порт занять не удалось, и следующая команда стучится к тому, что уже слушает на этом порту. Флаг превращает молчаливую ошибку конфигурации в отказ в момент, когда это произошло.'
          ),
        },
        {
          tone: 'note',
          title: L('The tunnel is not a VPN', 'Туннель — это не VPN'),
          text: L(
            'A tunnel carries the connections you open and nothing else: no broadcast, no discovery, no other machine on the network. If you need the whole network of the host, the dynamic proxy or a real VPN is the right instrument, and a jump host on the route is the simplest of the three.',
            'Туннель переносит только те соединения, которые вы открыли, и больше ничего: ни широковещания, ни обнаружения, ни других машин сети. Нужна вся сеть хоста — берите динамический прокси или настоящий VPN, а хост-переход на маршруте — самый простой из вариантов.'
          ),
        },
      ],
      takeaway: L(
        'Use -L to reach a private service, -N -f to keep the tunnel out of the way, and always add ExitOnForwardFailure.',
        'Используйте -L для доступа к приватному сервису, -N -f чтобы туннель не мешал, и всегда добавляйте ExitOnForwardFailure.'
      ),
      seeAlso: [
        L('Section 7-2: ssh and the config file', 'Секция 7-2: ssh и файл конфигурации'),
        L('Section 7-5: talking to databases from the terminal', 'Секция 7-5: работа с базами данных из терминала'),
        L('Section 4-1: running processes in the background', 'Секция 4-1: запуск процессов в фоне'),
      ],
    },
    {
      id: 'cli-ch7-s5',
      title: L('Talking to databases from the terminal', 'Работа с базами данных из терминала'),
      body: L(
        'Every database ships a client, and the client is usually faster and more precise than a graphical tool. The command psql connects to PostgreSQL, mysql to MySQL and sqlite3 to a local file, and the options are similar everywhere: the host, the port, the user and the database name. The connection string in one variable keeps the command short and keeps the password out of the history.\n\nThe difference between a query typed at the prompt and a query given with -c is the difference between a session and a script. The interactive mode has a history, a pager and a set of backslash commands that describe the database itself, such as listing the tables and describing one of them. The option -c runs a single statement and exits, which is what a script wants, and the option -f runs a file of statements.\n\nPasswords deserve their own rule. A password in the command line is visible in the process list, and a password in an environment variable is visible in the environment of every child process, which in a container may be the whole pipeline. The files .pgpass and .my.cnf keep the secret in a file with restrictive permissions, the variable PGPASSWORD is the portable fallback for tools that insist on it, and a connection through a tunnel removes the need to expose the port at all.',
        'Вместе с каждой базой поставляется клиент, и он обычно быстрее и точнее графического инструмента. Команда psql подключается к PostgreSQL, mysql — к MySQL, sqlite3 — к локальному файлу, и опции у них похожие: узел, порт, пользователь и имя базы. Строка подключения в одной переменной делает команду короткой и убирает пароль из истории.\n\nРазница между запросом, набранным в приглашении, и запросом, переданным через -c, — это разница между сессией и скриптом. В интерактивном режиме есть история, постраничный вывод и набор команд со слэшем, которые описывают саму базу: показать таблицы, описать одну из них. Опция -c выполняет одно выражение и завершается, чего и хочет скрипт, а опция -f выполняет файл с выражениями.\n\nПаролям нужна отдельное правило. Пароль в командной строке виден в списке процессов, а пароль в переменной окружения виден в окружении каждого дочернего процесса, а в контейнере это может быть весь конвейер. Файлы .pgpass и .my.cnf хранят секрет в файле с ограниченными правами, переменная PGPASSWORD — переносимый запасной вариант для инструментов, которые требуют именно её, а подключение через туннель вообще снимает необходимость открывать порт.'
      ),
      bullets: [
        L('The client is usually faster than the graphical tool.', 'Консольный клиент обычно быстрее графического инструмента.'),
        L('-c runs one statement and exits, -f runs a file of statements.', '-c выполняет одно выражение и завершается, -f выполняет файл с выражениями.'),
        L('Backslash commands describe the schema: \\dt lists the tables.', 'Команды со слэшем описывают схему: \\dt показывает таблицы.'),
        L('A password in the command line is visible in the process list.', 'Пароль в командной строке виден в списке процессов.'),
        L('.pgpass and .my.cnf keep the secret in a file with tight permissions.', '.pgpass и .my.cnf хранят секрет в файле с жёсткими правами.'),
        L('A tunnel removes the need to expose the database port at all.', 'Туннель снимает необходимость открывать порт базы вообще.'),
      ],
      code: `# Connection string in one variable, password in a file
export PGHOST=db.internal
export PGUSER=app
export PGDATABASE=app

# One statement, straight from a script
psql -c 'select count(*) from orders;'

# A file of statements and an interactive session
psql -f migrations/001_init.sql
psql

# Look at the schema
psql -c '\\dt'
psql -c '\\d orders'

# SQLite needs no server at all
sqlite3 ./app.db 'select count(*) from orders;'`,
      table: {
        caption: L('The common client options', 'Общие опции клиентов'),
        headers: [L('Option', 'Опция'), L('Meaning', 'Значение'), L('Note', 'Замечание')],
        rows: [
          [L('-h', '-h'), L('the host to connect to', 'узел для подключения'), L('127.0.0.1 inside a tunnel', '127.0.0.1 внутри туннеля')],
          [L('-p', '-p'), L('the port', 'порт'), L('5432 for PostgreSQL, 3306 for MySQL', '5432 у PostgreSQL, 3306 у MySQL')],
          [L('-U', '-U'), L('the user to authenticate as', 'пользователь для аутентификации'), L('part of the connection string', 'часть строки подключения')],
          [L('-c', '-c'), L('run one statement and exit', 'выполнить одно выражение и выйти'), L('the right choice for scripts', 'правильный выбор для скриптов')],
          [L('-f', '-f'), L('run the statements of a file', 'выполнить выражения из файла'), L('migrations and seeds', 'миграции и начальные данные')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The password on the command line', 'Пароль в командной строке'),
          text: L(
            'A connection string with the password in it ends up in the history of every shell that ever ran it and in the process list for as long as the client runs. Put the secret in .pgpass or .my.cnf, or in a secret store that the environment reads from, and keep the command free of it.',
            'Строка подключения с паролем оседает в истории каждой оболочки, где её запускали, и в списке процессов на всё время работы клиента. Держите секрет в .pgpass или .my.cnf либо в хранилище секретов, из которого читается окружение, и оставьте команду чистой.'
          ),
        },
        {
          tone: 'tip',
          title: L('Query through a tunnel', 'Запрос через туннель'),
          text: L(
            'A database that is not exposed to the network can still be queried from the laptop: the tunnel carries the connection and the port on the database host stays closed. The same command then works locally and in the pipeline without a change.',
            'Базу, не открытую наружу, всё равно можно опрашивать с ноутбука: туннель несёт соединение, а порт на хосте базы остаётся закрытым. Одна и та же команда работает и локально, и в конвейере без изменений.'
          ),
        },
      ],
      takeaway: L(
        'Keep the password in a file with tight permissions, query through a tunnel, and use -c for scripts instead of an interactive session.',
        'Держите пароль в файле с жёсткими правами, ходите в базу через туннель и используйте -c в скриптах вместо интерактивной сессии.'
      ),
      seeAlso: [
        L('Section 7-4: port forwarding and tunnels', 'Секция 7-4: проброс портов и туннели'),
        L('Section 3-4: jq for structured data', 'Секция 3-4: jq для структурированных данных'),
        L('Section 1-5: exit codes and the shell as a program', 'Секция 1-5: коды возврата и оболочка как программа'),
      ],
    },
  ],
};
