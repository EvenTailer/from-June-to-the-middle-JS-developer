import type { LocalizedText, PracticeTask, TaskLevel } from '../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

const levelForBaseTask = (id: string): TaskLevel =>
  id.endsWith('-1') || id.endsWith('-2') ? 'basic' : 'intermediate';

const rawTasksByModule: Record<string, PracticeTask[]> = {
  'html-css': [
    {
      id: 'htmlcss-task-1',
      topic: 'markup',
      title: L('Semantic article card', 'Семантическая карточка статьи'),
      brief: L(
        'Build an article card with a semantic article, header, publication date, short text and a link. The date must use a machine-readable datetime attribute.',
        'Сверстайте карточку статьи с семантическим article, заголовком, датой публикации, коротким текстом и ссылкой. Дата должна использовать машиночитаемый атрибут datetime.'
      ),
      hint: L(
        'Use article, header, h2, time and footer. A screen reader should understand the structure without CSS.',
        'Используйте article, header, h2, time и footer. Структура должна быть понятна скринридеру без CSS.'
      ),
      solution: `<article class="card">
  <header>
    <h2>Semantic HTML</h2>
    <time datetime="2026-10-19">19 October 2026</time>
  </header>

  <p>Semantic tags describe the meaning of content.</p>

  <footer>
    <a href="/articles/semantic-html">Read more</a>
  </footer>
</article>`,
      explanation: L(
        'article marks a self-contained piece of content, time gives machines a real date, and header/footer create a clear document outline.',
        'article обозначает самостоятельный блок контента, time даёт машинам настоящую дату, а header/footer создают понятную структуру документа.'
      ),
    },
    {
      id: 'htmlcss-task-2',
      topic: 'markup',
      title: L('Responsive card grid', 'Адаптивная сетка карточек'),
      brief: L(
        'Make a grid of cards that shows one column on mobile, two on tablets and three on desktop without writing media queries.',
        'Сделайте сетку карточек: одна колонка на мобильных, две на планшетах и три на десктопе — без медиазапросов.'
      ),
      hint: L('Use repeat(auto-fit, minmax(...)) with a sensible minimum card width.', 'Используйте repeat(auto-fit, minmax(...)) с разумной минимальной шириной карточки.'),
      solution: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
}`,
      explanation: L(
        'auto-fit creates as many columns as fit. When there is not enough room, cards move to the next row automatically.',
        'auto-fit создаёт столько колонок, сколько помещается. Когда места не хватает, карточки автоматически переносятся на новую строку.'
      ),
    },
    {
      id: 'htmlcss-task-3',
      topic: 'markup',
      title: L('Square avatar without distortion', 'Квадратный аватар без искажений'),
      brief: L(
        'Make a round avatar that keeps a 1:1 ratio, fills its box and never stretches the image.',
        'Сделайте круглый аватар с соотношением 1:1, который заполняет блок и не растягивает изображение.'
      ),
      solution: `.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}`,
      explanation: L(
        'object-fit: cover crops the image to fill the box while preserving its aspect ratio. object-position chooses the visible part.',
        'object-fit: cover обрезает изображение под размер блока, сохраняя пропорции. object-position выбирает видимую часть.'
      ),
    },
  ],

  git: [
    {
      id: 'git-task-1',
      topic: 'git',
      title: L('Create a repository and first commit', 'Создать репозиторий и первый коммит'),
      brief: L(
        'Initialize a local repository, stage all files, make the first commit, rename the branch to main and push it to a remote.',
        'Инициализируйте локальный репозиторий, добавьте все файлы, сделайте первый коммит, переименуйте ветку в main и отправьте её на удалённый репозиторий.'
      ),
      solution: `git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main`,
      explanation: L(
        'git init creates .git, commit records the first snapshot, and -u connects the local main branch to origin/main.',
        'git init создаёт .git, commit сохраняет первый снимок, а -u связывает локальную ветку main с origin/main.'
      ),
    },
    {
      id: 'git-task-2',
      topic: 'git',
      title: L('Ship a feature branch', 'Довести feature-ветку до main'),
      brief: L(
        'Create a branch for a login form, commit the work, update main, merge the branch and keep the merge commit.',
        'Создайте ветку для формы входа, закоммитьте работу, обновите main, влейте ветку и сохраните merge-коммит.'
      ),
      hint: L('Switch branches with git switch. Use --no-ff to keep the branch history visible.', 'Переключайтесь через git switch. Используйте --no-ff, чтобы сохранить историю ветки.'),
      solution: `git switch -c feat/login-form
# edit files
git add src/LoginForm.tsx
git commit -m "feat: add login form"

git switch main
git pull --ff-only
git merge --no-ff feat/login-form
git push`,
      explanation: L(
        'A short-lived branch isolates unfinished work. --no-ff keeps an explicit merge commit, which makes the feature easy to find in history.',
        'Короткоживущая ветка изолирует незавершённую работу. --no-ff сохраняет явный merge-коммит, поэтому фичу легко найти в истории.'
      ),
    },
    {
      id: 'git-task-3',
      topic: 'git',
      title: L('Undo a commit but keep the work', 'Отменить коммит, сохранив изменения'),
      brief: L(
        'You committed too early. Undo the last commit but keep all changes staged so you can fix the commit message and files.',
        'Вы закоммитили слишком рано. Отмените последний коммит, но оставьте все изменения в индексе, чтобы исправить сообщение и файлы.'
      ),
      solution: `git reset --soft HEAD~1

# fix files
git add .
git commit -m "feat: corrected commit message"`,
      explanation: L(
        '--soft moves HEAD back one commit and leaves the index untouched. Use --mixed if you want the changes unstaged, and avoid --hard unless you really want to delete them.',
        '--soft отодвигает HEAD на один коммит и не трогает индекс. Используйте --mixed, чтобы снять изменения с индекса, и не используйте --hard, если не хотите их удалить.'
      ),
    },
  ],

  cli: [
    {
      id: 'cli-task-1',
      topic: 'cli',
      title: L('Find every TODO in the source', 'Найти все TODO в исходниках'),
      brief: L(
        'Search the src directory recursively for TODO comments in TypeScript files and show file names with line numbers.',
        'Рекурсивно найдите в каталоге src комментарии TODO в TypeScript-файлах и покажите имена файлов с номерами строк.'
      ),
      solution: `grep -rn --include='*.ts' --include='*.tsx' "TODO" src`,
      explanation: L(
        '-r searches recursively, -n prints line numbers, and --include limits the search to matching file types.',
        '-r ищет рекурсивно, -n печатает номера строк, а --include ограничивает поиск нужными типами файлов.'
      ),
    },
    {
      id: 'cli-task-2',
      topic: 'cli',
      title: L('Batch rename .txt to .md', 'Пакетно переименовать .txt в .md'),
      brief: L(
        'Rename every .txt file in the current directory to .md using a bash loop.',
        'Переименуйте все файлы .txt в текущем каталоге в .md с помощью цикла bash.'
      ),
      hint: L('Use parameter expansion ${file%.txt} to remove the old extension.', 'Используйте подстановку ${file%.txt}, чтобы убрать старое расширение.'),
      solution: `for file in *.txt; do
  mv "$file" "\${file%.txt}.md"
done`,
      explanation: L(
        'The loop handles every match. ${file%.txt} removes the shortest matching suffix, so notes.txt becomes notes.md.',
        'Цикл обрабатывает каждое совпадение. ${file%.txt} удаляет самый короткий подходящий суффикс, поэтому notes.txt станет notes.md.'
      ),
    },
    {
      id: 'cli-task-3',
    lang: 'shell',
      topic: 'cli',
      title: L('Find the ten largest items', 'Найти десять самых больших объектов'),
      brief: L(
        'Show the ten largest files and directories under the current folder, sorted from largest to smallest.',
        'Покажите десять самых больших файлов и каталогов в текущей папке, отсортированных от большего к меньшему.'
      ),
      solution: `du -ah . | sort -rh | head -n 10`,
      explanation: L(
        'du -ah prints human-readable sizes for files and folders, sort -rh sorts by size, and head keeps the first ten lines.',
        'du -ah печатает размеры файлов и папок в удобном виде, sort -rh сортирует по размеру, а head оставляет первые десять строк.'
      ),
    },
  ],

  oop: [
    {
      id: 'oop-task-1',
      topic: 'oop',
      title: L('Encapsulate a bank account', 'Инкапсулировать банковский счёт'),
      brief: L(
        'Create a BankAccount class with a private balance, deposit and withdraw methods, and a read-only balance getter. Reject invalid operations.',
        'Создайте класс BankAccount с приватным балансом, методами deposit и withdraw и геттером баланса только для чтения. Некорректные операции должны отклоняться.'
      ),
      hint: L('Use a private field (#balance) and throw errors for invalid amounts.', 'Используйте приватное поле (#balance) и выбрасывайте ошибки при некорректных суммах.'),
      solution: `class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error('Amount must be positive');
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error('Amount must be positive');
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
  }

  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
account.withdraw(30);
console.log(account.balance); // 70`,
      explanation: L(
        'The private field cannot be changed from outside the class. All rules live in one place, so the object can never enter an invalid state.',
        'Приватное поле нельзя изменить снаружи класса. Все правила находятся в одном месте, поэтому объект не может перейти в некорректное состояние.'
      ),
    },
    {
      id: 'oop-task-2',
      topic: 'oop',
      title: L('Polymorphic shapes', 'Полиморфные фигуры'),
      brief: L(
        'Create a Shape base class and Circle and Rectangle subclasses. Each subclass implements area(). Print the area of every shape in one array.',
        'Создайте базовый класс Shape и подклассы Circle и Rectangle. Каждый подкласс реализует area(). Выведите площадь каждой фигуры из одного массива.'
      ),
      solution: `class Shape {
  area() {
    throw new Error('area() must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const shapes = [new Circle(2), new Rectangle(3, 4)];
console.log(shapes.map((shape) => shape.area().toFixed(2)));`,
      explanation: L(
        'The caller works with Shape and does not care which concrete class it received. Adding a new shape does not change the loop.',
        'Вызывающий код работает с Shape и не знает, какой конкретный класс получил. Добавление новой фигуры не меняет цикл.'
      ),
    },
    {
      id: 'oop-task-3',
      topic: 'oop',
      title: L('Compose a notification service', 'Скомпоновать сервис уведомлений'),
      brief: L(
        'Create an OrderService that depends on a notifier object instead of creating it itself. Show how to swap email for SMS without changing the service.',
        'Создайте OrderService, который зависит от объекта-уведомителя, а не создаёт его сам. Покажите, как заменить email на SMS без изменения сервиса.'
      ),
      solution: `class EmailNotifier {
  send(message) {
    console.log('Email:', message);
  }
}

class SmsNotifier {
  send(message) {
    console.log('SMS:', message);
  }
}

class OrderService {
  constructor(notifier) {
    this.notifier = notifier;
  }

  placeOrder(order) {
    this.notifier.send('Order ' + order.id + ' created');
  }
}

const service = new OrderService(new EmailNotifier());
service.placeOrder({ id: 42 });

const smsService = new OrderService(new SmsNotifier());
smsService.placeOrder({ id: 43 });`,
      explanation: L(
        'This is dependency injection: OrderService depends on an interface (send) rather than a concrete implementation, so the transport can be replaced.',
        'Это внедрение зависимостей: OrderService зависит от интерфейса (send), а не от конкретной реализации, поэтому транспорт можно заменить.'
      ),
    },
  ],

  http: [
    {
      id: 'http-task-1',
      topic: 'http',
      title: L('Fetch JSON with status checks', 'Загрузить JSON с проверкой статуса'),
      brief: L(
        'Write an async function that fetches JSON, throws a useful error for non-2xx responses and returns parsed data.',
        'Напишите асинхронную функцию, которая загружает JSON, выбрасывает понятную ошибку при ответе не 2xx и возвращает разобранные данные.'
      ),
      solution: `async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ': ' + response.statusText);
  }

  return response.json();
}`,
      explanation: L(
        'fetch resolves even for 404 and 500 responses. Always check response.ok before reading the body.',
        'fetch завершается успешно даже при 404 и 500. Всегда проверяйте response.ok перед чтением тела.'
      ),
    },
    {
      id: 'http-task-2',
      topic: 'http',
      title: L('Add a request timeout', 'Добавить таймаут запроса'),
      brief: L(
        'Implement fetchWithTimeout that aborts the request after five seconds and always clears its timer.',
        'Реализуйте fetchWithTimeout, который прерывает запрос через пять секунд и всегда очищает таймер.'
      ),
      hint: L('Use AbortController and clearTimeout in a finally block.', 'Используйте AbortController и clearTimeout в блоке finally.'),
      solution: `async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}`,
      explanation: L(
        'The signal connects the timer to fetch. Without clearing the timer, the process keeps an unnecessary callback alive.',
        'Signal связывает таймер с fetch. Без очистки таймера процесс продолжает держать ненужный колбэк.'
      ),
    },
    {
      id: 'http-task-3',
    lang: 'http',
      topic: 'http',
      title: L('Design REST endpoints for tasks', 'Спроектировать REST-эндпоинты для задач'),
      brief: L(
        'Write the HTTP method and URL for listing, creating, reading, partially updating and deleting a task.',
        'Напишите HTTP-метод и URL для получения списка, создания, чтения, частичного обновления и удаления задачи.'
      ),
      solution: `GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id`,
      explanation: L(
        'Use nouns for resources and HTTP methods for actions. Return 201 for creation, 204 for deletion, 404 for a missing task and 422 for invalid input.',
        'Используйте существительные для ресурсов и HTTP-методы для действий. Возвращайте 201 при создании, 204 при удалении, 404 для отсутствующей задачи и 422 при неверных данных.'
      ),
    },
  ],

  'js-core': [
    {
      id: 'js-task-1',
      topic: 'functions',
      title: L('Implement debounce', 'Реализовать debounce'),
      brief: L(
        'Write debounce(fn, delay) that waits until calls stop for delay milliseconds, preserves this and passes the latest arguments.',
        'Напишите debounce(fn, delay), который ждёт прекращения вызовов в течение delay миллисекунд, сохраняет this и передаёт последние аргументы.'
      ),
      solution: `function debounce(fn, delay = 300) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const search = debounce((value) => {
  console.log('Search:', value);
}, 400);

search('rea');
search('react'); // only this call runs after 400 ms`,
      explanation: L(
        'Each new call cancels the previous timer. The last call survives, which is exactly what a search input needs.',
        'Каждый новый вызов отменяет предыдущий таймер. Выживает последний вызов — именно это нужно поисковому полю.'
      ),
    },
    {
      id: 'js-task-2',
      topic: 'arrays',
      title: L('Group an array by a property', 'Сгруппировать массив по свойству'),
      brief: L(
        'Implement groupBy(items, key) that returns an object whose keys are property values and whose values are arrays of items.',
        'Реализуйте groupBy(items, key), который возвращает объект: ключи — значения свойства, значения — массивы элементов.'
      ),
      solution: `function groupBy(items, key) {
  return items.reduce((result, item) => {
    const group = item[key];
    (result[group] ??= []).push(item);
    return result;
  }, {});
}

const users = [
  { name: 'Ann', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Eve', role: 'admin' },
];

console.log(groupBy(users, 'role'));
// { admin: [...], user: [...] }`,
      explanation: L(
        'reduce builds one result object. ??= creates the array only when the group is missing, so the first item is not lost.',
        'reduce собирает один объект результата. ??= создаёт массив только если группы ещё нет, поэтому первый элемент не теряется.'
      ),
    },
    {
      id: 'js-task-3',
      topic: 'async',
      title: L('Retry an async operation', 'Повторить асинхронную операцию'),
      brief: L(
        'Write retry(fn, attempts) that calls an async function again after a short pause and throws the last error after all attempts fail.',
        'Напишите retry(fn, attempts), который повторяет асинхронную функцию после короткой паузы и выбрасывает последнюю ошибку, когда попытки закончились.'
      ),
      solution: `async function retry(fn, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 200));
    }
  }

  throw lastError;
}

await retry(() => fetch('/api/profile'));`,
      explanation: L(
        'The loop stops on success and only reaches throw after every attempt has failed. Increasing delays reduce pressure on a failing service.',
        'Цикл останавливается при успехе и доходит до throw только после неудачи всех попыток. Растущая задержка снижает нагрузку на сбойный сервис.'
      ),
    },
  ],

  typescript: [
    {
      id: 'ts-task-1',
      topic: 'ts-advanced',
      title: L('Typed groupBy with generics', 'Типизированный groupBy на дженериках'),
      brief: L(
        'Write groupBy<T, K extends keyof T>(items, key) that keeps the item type and only accepts keys that exist on T.',
        'Напишите groupBy<T, K extends keyof T>(items, key), который сохраняет тип элемента и принимает только существующие ключи T.'
      ),
      hint: L('Use a Record<string, T[]> accumulator and String(item[key]) for the group key.', 'Используйте аккумулятор Record<string, T[]> и String(item[key]) для ключа группы.'),
      solution: `function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((result, item) => {
    const group = String(item[key]);
    (result[group] ??= []).push(item);
    return result;
  }, {});
}

const users = [
  { name: 'Ann', role: 'admin' },
  { name: 'Bob', role: 'user' },
];

const byRole = groupBy(users, 'role');
// byRole.admin[0].name is typed as string`,
      explanation: L(
        'K extends keyof T prevents typos such as groupBy(users, "rol"). The return type still contains full user objects, not unknown values.',
        'K extends keyof T предотвращает опечатки вроде groupBy(users, "rol"). Возвращаемый тип по-прежнему содержит полные объекты, а не unknown.'
      ),
    },
    {
      id: 'ts-task-2',
      topic: 'ts-advanced',
      title: L('Discriminated union for async state', 'Discriminated union для асинхронного состояния'),
      brief: L(
        'Model idle, loading, success and error states with one union type. Write a render function that handles every case.',
        'Опишите состояния idle, loading, success и error одним union-типом. Напишите функцию render, которая обрабатывает каждый случай.'
      ),
      solution: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render(state: AsyncState<string>): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting...';
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data;
    case 'error':
      return state.error.message;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}`,
      explanation: L(
        'The status field tells TypeScript which fields exist. The never check turns a forgotten case into a compile-time error.',
        'Поле status подсказывает TypeScript, какие поля существуют. Проверка never превращает забытый случай в ошибку компиляции.'
      ),
    },
    {
      id: 'ts-task-3',
      topic: 'ts-advanced',
      title: L('Pick fields by value type', 'Выбрать поля по типу значения'),
      brief: L(
        'Create a utility type PickByValue<T, V> that keeps only the keys whose values extend V.',
        'Создайте утилитный тип PickByValue<T, V>, который оставляет только ключи, значения которых расширяют V.'
      ),
      solution: `type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface User {
  id: number;
  name: string;
  active: boolean;
}

type BooleanFields = PickByValue<User, boolean>;
// { active: boolean }`,
      explanation: L(
        'Key remapping with "as" removes keys that do not match. The remaining fields keep their original types.',
        'Пересборка ключей через "as" удаляет неподходящие ключи. Оставшиеся поля сохраняют исходные типы.'
      ),
    },
  ],

  react: [
    {
      id: 'react-task-1',
      topic: 'hooks',
      title: L('Create a useLocalStorage hook', 'Создать хук useLocalStorage'),
      brief: L(
        'Build a generic hook that reads a value from localStorage on mount and writes it back whenever the value changes.',
        'Создайте дженерик-хук, который читает значение из localStorage при монтировании и записывает его при каждом изменении.'
      ),
      hint: L('Lazy initial state prevents reading localStorage on every render.', 'Ленивое начальное состояние избавляет от чтения localStorage на каждом рендере.'),
      solution: `import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// const [theme, setTheme] = useLocalStorage('theme', 'dark');`,
      explanation: L(
        'The initializer runs once, and the effect keeps storage in sync. "as const" returns a tuple instead of a loose array.',
        'Инициализатор выполняется один раз, а эффект синхронизирует хранилище. "as const" возвращает кортеж вместо свободного массива.'
      ),
    },
    {
      id: 'react-task-2',
      topic: 'react-perf',
      title: L('Filter a list without extra work', 'Фильтровать список без лишней работы'),
      brief: L(
        'Render a user list filtered by a query. Recompute the filtered array only when users or query change.',
        'Отрисуйте список пользователей с фильтром по запросу. Пересчитывайте отфильтрованный массив только при изменении users или query.'
      ),
      solution: `import { useMemo } from 'react';

interface Props {
  users: string[];
  query: string;
}

function UserList({ users, query }: Props) {
  const filtered = useMemo(
    () => users.filter((user) => user.toLowerCase().includes(query.toLowerCase())),
    [users, query]
  );

  return (
    <ul>
      {filtered.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}`,
      explanation: L(
        'useMemo caches the result between renders. Without it the filter runs on every parent render, even when nothing relevant changed.',
        'useMemo кэширует результат между рендерами. Без него фильтр выполняется при каждом рендере родителя, даже если ничего важного не изменилось.'
      ),
    },
    {
      id: 'react-task-3',
      topic: 'hooks',
      title: L('Fetch data in useEffect safely', 'Безопасно загрузить данные в useEffect'),
      brief: L(
        'Load a user by id, show loading, and ignore the response if the component unmounted or the id changed.',
        'Загрузите пользователя по id, покажите загрузку и игнорируйте ответ, если компонент размонтирован или id изменился.'
      ),
      solution: `import { useEffect, useState } from 'react';

function UserProfile({ id }: { id: number }) {
  const [state, setState] = useState<{ loading: boolean; name?: string }>({
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true });

    fetch('/api/users/' + id)
      .then((response) => response.json())
      .then((user) => {
        if (!cancelled) setState({ loading: false, name: user.name });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state.loading ? <p>Loading...</p> : <h2>{state.name}</h2>;
}`,
      explanation: L(
        'The cleanup flag prevents a stale response from overwriting newer data. The effect reruns whenever id changes.',
        'Флаг очистки не даёт устаревшему ответу перезаписать новые данные. Эффект перезапускается при изменении id.'
      ),
    },
  ],

  redux: [
    {
      id: 'redux-task-1',
      topic: 'redux',
      title: L('Write a todos slice', 'Написать slice для задач'),
      brief: L(
        'Create a Redux Toolkit slice with addTodo, toggleTodo and removeTodo. Use immutable-friendly reducers.',
        'Создайте slice Redux Toolkit с addTodo, toggleTodo и removeTodo. Используйте редьюсеры, дружелюбные к иммутабельности.'
      ),
      solution: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;`,
      explanation: L(
        'Immer lets you write mutable-looking code safely. Returning a new array from removeTodo is also valid.',
        'Immer позволяет безопасно писать код, похожий на мутацию. Вернуть новый массив из removeTodo тоже допустимо.'
      ),
    },
    {
      id: 'redux-task-2',
      topic: 'redux',
      title: L('Set up the store and typed hooks', 'Настроить store и типизированные хуки'),
      brief: L(
        'Configure the store with the todos reducer and create typed useAppDispatch and useAppSelector hooks.',
        'Настройте store с редьюсером todos и создайте типизированные хуки useAppDispatch и useAppSelector.'
      ),
      solution: `// store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: { todos: todosReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`,
      explanation: L(
        'The typed hooks remove repetitive generics from every component and keep state inference accurate.',
        'Типизированные хуки убирают повторяющиеся generic-параметры из компонентов и сохраняют точный вывод состояния.'
      ),
    },
    {
      id: 'redux-task-3',
      topic: 'redux',
      title: L('Fetch a user with createAsyncThunk', 'Загрузить пользователя через createAsyncThunk'),
      brief: L(
        'Create an async thunk that fetches a user by id and returns a readable error for a failed response.',
        'Создайте асинхронный thunk, который загружает пользователя по id и возвращает понятную ошибку при неудачном ответе.'
      ),
      solution: `import { createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

export const fetchUser = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>('users/fetch', async (id, { rejectWithValue }) => {
  const response = await fetch('/api/users/' + id);

  if (!response.ok) {
    return rejectWithValue('User not found');
  }

  return response.json();
});`,
      explanation: L(
        'rejectWithValue carries a predictable error payload. Handle pending, fulfilled and rejected in extraReducers.',
        'rejectWithValue передаёт предсказуемую ошибку. Обрабатывайте pending, fulfilled и rejected в extraReducers.'
      ),
    },
  ],

  'react-router': [
    {
      id: 'router-task-1',
      topic: 'router',
      title: L('Nested routes with a shared layout', 'Вложенные маршруты с общим layout'),
      brief: L(
        'Create a router with a Layout that renders a header and an Outlet. Add home, users and a catch-all 404 route.',
        'Создайте роутер с Layout, который рендерит шапку и Outlet. Добавьте маршруты home, users и catch-all 404.'
      ),
      solution: `import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>My App</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}`,
      explanation: L(
        'The layout mounts once and Outlet swaps only the child route, so the header does not remount on navigation.',
        'Layout монтируется один раз, а Outlet меняет только дочерний маршрут, поэтому шапка не перемонтируется при переходах.'
      ),
    },
    {
      id: 'router-task-2',
      topic: 'router',
      title: L('Read a route parameter', 'Прочитать параметр маршрута'),
      brief: L(
        'Create a page for /users/:id that reads the id from the URL and links back to the users list.',
        'Создайте страницу для /users/:id, которая читает id из URL и ссылается обратно на список пользователей.'
      ),
      solution: `import { Link, useParams } from 'react-router-dom';

function UserPage() {
  const { id } = useParams();

  return (
    <section>
      <h1>User {id}</h1>
      <Link to="/users">Back to users</Link>
    </section>
  );
}

// Route:
// { path: 'users/:id', element: <UserPage /> }`,
      explanation: L(
        'useParams returns strings from the URL. Convert them to numbers or validate them before using them as ids.',
        'useParams возвращает строки из URL. Преобразуйте их в числа или проверяйте перед использованием как id.'
      ),
    },
    {
      id: 'router-task-3',
      topic: 'router',
      title: L('Protect a private route', 'Защитить приватный маршрут'),
      brief: L(
        'Create a RequireAuth component that redirects unauthenticated users to /login and remembers where they came from.',
        'Создайте компонент RequireAuth, который перенаправляет неавторизованных на /login и запоминает, откуда они пришли.'
      ),
      solution: `import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage:
// <Route
//   path="/dashboard"
//   element={
//     <RequireAuth>
//       <Dashboard />
//     </RequireAuth>
//   }
// />`,
      explanation: L(
        'replace removes the protected URL from history. The saved location lets the login page navigate back after success.',
        'replace убирает защищённый URL из истории. Сохранённый location позволяет странице входа вернуть пользователя после успеха.'
      ),
    },
  ],

  nextjs: [
    {
      id: 'next-task-1',
      topic: 'next',
      title: L('Dynamic page with metadata', 'Динамическая страница с метаданными'),
      brief: L(
        'Create app/users/[id]/page.tsx that awaits params, loads a user and generates a page title from the user name.',
        'Создайте app/users/[id]/page.tsx, который ждёт params, загружает пользователя и генерирует заголовок страницы из имени.'
      ),
      hint: L('In the current App Router, params is a Promise and must be awaited.', 'В актуальном App Router params — это Promise, его нужно await.'),
      solution: `// app/users/[id]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

async function getUser(id: string) {
  const response = await fetch('https://api.example.com/users/' + id);
  if (!response.ok) notFound();
  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);
  return { title: user.name };
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);
  return <h1>{user.name}</h1>;
}`,
      explanation: L(
        'Server components can be async. generateMetadata runs on the server and gives each user page its own title.',
        'Серверные компоненты могут быть асинхронными. generateMetadata выполняется на сервере и даёт каждой странице пользователя свой заголовок.'
      ),
    },
    {
      id: 'next-task-2',
      topic: 'next',
      title: L('Server fetch with notFound', 'Серверная загрузка с notFound'),
      brief: L(
        'Build a product page that fetches data on the server, revalidates every 60 seconds and renders the 404 page for a missing product.',
        'Сделайте страницу товара, которая загружает данные на сервере, ревалидирует их каждые 60 секунд и показывает 404 для отсутствующего товара.'
      ),
      solution: `// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const response = await fetch(
    'https://api.example.com/products/' + slug,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) notFound();

  const product = await response.json();

  return (
    <article>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </article>
  );
}`,
      explanation: L(
        'The fetch runs on the server, so the browser never sees the API URL. revalidate enables incremental static regeneration.',
        'fetch выполняется на сервере, поэтому браузер не видит URL API. revalidate включает инкрементальную статическую регенерацию.'
      ),
    },
    {
      id: 'next-task-3',
      topic: 'next',
      title: L('Create a route handler', 'Создать route handler'),
      brief: L(
        'Add app/api/tasks/route.ts with GET and POST handlers. POST must return 422 when title is missing and 201 on success.',
        'Добавьте app/api/tasks/route.ts с обработчиками GET и POST. POST должен возвращать 422 без title и 201 при успехе.'
      ),
      solution: `// app/api/tasks/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([{ id: 1, title: 'Learn Next.js' }]);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 422 }
    );
  }

  return NextResponse.json(
    { id: Date.now(), title: body.title },
    { status: 201 }
  );
}`,
      explanation: L(
        'Route handlers are HTTP endpoints in the App Router. Use NextResponse for JSON and explicit status codes.',
        'Route handlers — это HTTP-эндпоинты в App Router. Используйте NextResponse для JSON и явных статус-кодов.'
      ),
    },
  ],
};

export const baseTasksByModule: Record<string, PracticeTask[]> = Object.fromEntries(
  Object.entries(rawTasksByModule).map(([moduleId, tasks]) => [
    moduleId,
    tasks.map((task) => ({ ...task, level: task.level ?? levelForBaseTask(task.id) })),
  ])
);
