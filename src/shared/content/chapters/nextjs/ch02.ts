import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh02: Chapter = {
  id: 'next-ch2',
  title: L('Server and client components', 'Серверные и клиентские компоненты'),
  summary: L(
    'How the React Server Component model splits rendering between the server and the browser, what the "use client" directive really changes, and which values are allowed to cross the boundary.',
    'Как модель React Server Components делит рендеринг между сервером и браузером, что на самом деле меняет директива "use client" и какие значения проходят через границу.'
  ),
  sections: [
    {
      id: 'next-ch2-s1',
      title: L('The server component model', 'Модель серверных компонентов'),
      body: L(
        'In the App Router a component is a server component until it says otherwise. A server component runs on the server and its output never reaches the browser as JavaScript: it becomes HTML plus a serialized payload of the React tree. Two properties follow from that. A server component can read the database, call internal services and use Node APIs, because it never runs in a browser; and it costs nothing in the client bundle, because no code for it is shipped at all.\n\nThe flip side is that a server component has no state, no effects, no event handlers and no browser APIs. During server rendering there is no browser and no browser React runtime at all. React solves this with an interop layer: the client bundle holds a reference for the server subtree, and the server sends the real content as a payload that the client runtime merges into the tree. The bundle of a page is therefore not the list of its components, it is only the part that must run in the browser.\n\nThe model is defined per file and inherited through imports. A file with no directive is a server component, a file that starts with "use client" is a client component, and everything that file imports becomes a client component too unless a module in the tree explicitly uses "use server". The directive therefore belongs on the leaves of the tree, and opening any file tells you exactly which runtime it belongs to.\n\nThis is not a compile-time switch that patches React, it is a change of where the code executes. A server component cannot be turned into a client component by importing a client component, and the dependency direction is enforced by the compiler. Getting that direction right is the difference between an application that ships forty kilobytes of JavaScript and one that ships four hundred.',
        'В App Router компонент является серверным, пока не заявит обратное. Серверный компонент выполняется на сервере, и его вывод никогда не уезжает в браузер как JavaScript: он превращается в HTML плюс сериализованную полезную нагрузку React-дерева. Отсюда два свойства. Серверный компонент может читать базу, вызывать внутренние сервисы и пользоваться Node API, потому что в браузере он не выполняется. И он ничего не весит в клиентском бандле, потому что его код вообще не отправляется.\n\nОбратная сторона в том, что у серверного компонента нет состояния, эффектов, обработчиков событий и браузерных API. Во время серверного рендера нет ни браузера, ни браузерного рантайма React. React решает это прослойкой совместимости: в клиентском бандле лежит ссылка на серверное поддерево, а сервер присылает настоящее содержимое полезной нагрузкой, которую клиентский рантайм вклеивает в дерево. Поэтому бандл страницы — это не список её компонентов, а только та часть, которой действительно нужно выполняться в браузере.\n\nМодель задана на уровне файла и наследуется через импорты. Файл без директивы — серверный компонент, файл, начинающийся с "use client", — клиентский, и всё, что этот файл импортирует, тоже становится клиентским, если только какой-то модуль в дереве явно не использует "use server". Поэтому директиву и вешают на листья дерева, и по любому открытому файлу видно, к какому рантайму он относится.\n\nЭто не переключатель времени компиляции, который патчит React, это изменение того, где код выполняется. Серверный компонент не превращается в клиентский оттого, что импортирует клиентский, а направление зависимостей проверяет компилятор. Правильное направление — это разница между приложением, которое отправляет сорок килобайт JavaScript, и приложением, которое отправляет четыреста.'
      ),
      bullets: [
        L('A component is a server component unless the file says "use client".', 'Компонент является серверным, пока файл не говорит "use client".'),
        L('Server components ship no JavaScript and can touch data directly.', 'Серверные компоненты не отправляют JavaScript и напрямую обращаются к данным.'),
        L('No state, effects or event handlers in a server component.', 'В серверном компоненте нет состояния, эффектов и обработчиков событий.'),
        L('The directive is inherited by every module the file imports.', 'Директива наследуется всеми модулями, которые импортирует файл.'),
        L('The compiler enforces the direction of the dependency.', 'Направление зависимостей проверяет компилятор.'),
      ],
      code: `// app/products/page.tsx  - a server component, no directive
import { db } from '@/lib/db';

export default async function ProductsPage() {
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`,
      table: {
        caption: L('Server component and client component', 'Серверный и клиентский компонент'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Server component', 'Серверный компонент'),
          L('Client component', 'Клиентский компонент'),
        ],
        rows: [
          [
            L('Directive', 'Директива'),
            L('None needed', 'Не нужна'),
            L('"use client"', '"use client"'),
          ],
          [
            L('Runs on', 'Выполняется'),
            L('The server', 'На сервере'),
            L('The browser', 'В браузере'),
          ],
          [
            L('Ships to the browser', 'Отправляется в браузер'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('State and effects', 'Состояние и эффекты'),
            L('Not available', 'Недоступны'),
            L('Available', 'Доступны'),
          ],
          [
            L('Data access', 'Доступ к данным'),
            L('Direct, with Node APIs', 'Прямой, с Node API'),
            L('Through an HTTP endpoint', 'Через HTTP-эндпоинт'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('The default is the server', 'По умолчанию — сервер'),
          text: L(
            'Most components never need a directive. Start without one and add "use client" only where a hook, a browser API or an event handler makes it unavoidable. The absence of the directive is what keeps the bundle small.',
            'Большинству компонентов директива не нужна. Начните без неё и добавляйте "use client" только там, где без хука, браузерного API или обработчика не обойтись. Именно отсутствие директивы удерживает бандл маленьким.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('One directive at the top of a page', 'Одна директива вверху страницы'),
          text: L(
            'Because the directive is inherited by imports, a single "use client" on the first line of a route file turns the whole page into client code, including the data-access helpers that got dragged in with the imports. The page still works and the bundle quietly doubles.',
            'Поскольку директива наследуется импортами, одна строка "use client" в начале файла маршрута превращает в клиентский код всю страницу вместе со слоями доступа к данным, попавшими в импорты. Страница продолжит работать, а бандл тихо удвоится.'
          ),
        },
      ],
      takeaway: L(
        'Everything is a server component until a file opts out, so keep the opt-outs small and deep.',
        'Всё является серверным компонентом, пока файл не выйдет из этого режима, поэтому исключения держите мелкими и глубокими.'
      ),
      seeAlso: [
        L('Section 2-2: what runs where', 'Секция 2-2: что где выполняется'),
        L('Section 2-6: common "use client" mistakes', 'Секция 2-6: типичные ошибки с "use client"'),
        L('Chapter 1: the App Router', 'Глава 1: App Router'),
      ],
    },
    {
      id: 'next-ch2-s2',
      title: L('What runs where', 'Что где выполняется'),
      body: L(
        'Where is a question with two answers in a Next.js application: which machine executes the code, and which bundle the code ends up in. Server components and route handlers run on the Node.js runtime by default and can use the whole Node API surface. The interception layer runs before the request reaches the application and used to be pinned to the Edge runtime; since Next.js 15 it may use the Node runtime as well, and in Next.js 16 the proxy convention defaults to Node.\n\nClient components run in the browser, in the tab. They are the only code that hydrates, so they are the only code whose size the user waits for. A page built entirely from server components ships almost no JavaScript of its own; the framework still sends a small router runtime, but the page content is not part of it. Adding one client component at the bottom of a page adds that component and its dependency graph, and nothing else.\n\nThe consequence is that data fetching belongs on the server whenever possible. A server component can call the database directly, so the common shape of a page is: read on the server, render on the server, ship only the interactive leaves. The alternative, fetching from a client component after the page loads, costs a round trip, exposes the data to the browser and requires an API endpoint that exists only to serve the same page.\n\nThere is a third place worth naming, the build. Static generation runs the same server components ahead of time and stores the HTML and the RSC payload. That is why where it runs and when it runs are separate questions: the same component can execute during the build, during a request, or in the browser, depending on the rendering mode the route settles into.',
        'Вопрос «где» имеет в приложении Next.js два ответа: на какой машине выполняется код и в какой бандл он попадает. Серверные компоненты и обработчики маршрута выполняются по умолчанию на Node.js и могут пользоваться всем API Node. Слой перехвата запросов работает до того, как запрос дойдёт до приложения, и раньше был привязан к Edge runtime; начиная с Next.js 15 он может использовать и Node runtime, а в Next.js 16 соглашение proxy по умолчанию использует Node.\n\nКлиентские компоненты выполняются в браузере, во вкладке. Это единственный код, который гидратируется, а значит, единственный код, размер которого пользователь ждёт. Страница, целиком собранная из серверных компонентов, отправляет почти никакого своего JavaScript: фреймворк всё равно присылает небольшой рантайм роутера, но содержимое страницы в него не входит. Добавление одного клиентского компонента внизу страницы добавляет этот компонент и его граф зависимостей, и больше ничего.\n\nОтсюда следует, что получение данных должно оставаться на сервере, когда это возможно. Серверный компонент вызывает базу напрямую, поэтому обычная форма страницы выглядит так: прочитать на сервере, отрисовать на сервере, отправить только интерактивные листья. Альтернатива, загрузка данных из клиентского компонента после отрисовки страницы, стоит лишнего запроса, отдаёт данные браузеру и требует API-эндпоинта, существующего только ради этой же страницы.\n\nЕсть и третье место, о котором стоит сказать, — сборка. Статичная генерация выполняет те же серверные компоненты заранее и сохраняет HTML и RSC-полезную нагрузку. Поэтому «где выполняется» и «когда выполняется» — разные вопросы: один и тот же компонент может отработать во время сборки, во время запроса или в браузере, в зависимости от режима рендеринга, в который попал маршрут.'
      ),
      bullets: [
        L('Server components and route handlers run on the Node.js runtime by default.', 'Серверные компоненты и обработчики маршрута выполняются по умолчанию на Node.js.'),
        L('The interception layer defaults to the Node runtime in Next.js 16.', 'Слой перехвата в Next.js 16 по умолчанию использует Node runtime.'),
        L('Only client components hydrate, so only they add to the download.', 'Гидратируются только клиентские компоненты, и только они попадают в загрузку.'),
        L('Data belongs on the server, the browser should receive finished markup.', 'Данные принадлежат серверу, браузер должен получать готовую разметку.'),
        L('The same component can run at build time, at request time or in the browser.', 'Один и тот же компонент может отработать при сборке, при запросе или в браузере.'),
      ],
      code: `// app/dashboard/page.tsx - server: reads data directly
import { db } from '@/lib/db';

export default async function DashboardPage() {
  const total = await db.order.aggregate({ _sum: { amount: true } });
  return <p>Revenue: {total._sum.amount}</p>;
}

// app/dashboard/LiveClock.tsx - client: hydrates
'use client';

import { useEffect, useState } from 'react';

export function LiveClock() {
  const [now, setNow] = useState(() => new Date().toISOString());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toISOString()), 1000);
    return () => clearInterval(id);
  }, []);

  return <time>{now}</time>;
}`,
      table: {
        caption: L('Where the code runs and where it lands', 'Где выполняется код и куда он попадает'),
        headers: [
          L('Code', 'Код'),
          L('Runs on', 'Выполняется'),
          L('In the client bundle', 'В клиентском бандле'),
        ],
        rows: [
          [
            L('Server component', 'Серверный компонент'),
            L('The server', 'На сервере'),
            L('No', 'Нет'),
          ],
          [
            L('Client component', 'Клиентский компонент'),
            L('The browser', 'В браузере'),
            L('Yes', 'Да'),
          ],
          [
            L('Route handler', 'Обработчик маршрута'),
            L('The server', 'На сервере'),
            L('No', 'Нет'),
          ],
          [
            L('Server action', 'Серверное действие'),
            L('The server', 'На сервере'),
            L('A reference only', 'Только ссылка'),
          ],
          [
            L('Proxy', 'Прокси'),
            L('Before the request', 'До запроса'),
            L('No', 'Нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Keep data access next to the component', 'Держите доступ к данным рядом с компонентом'),
          text: L(
            'A server component that reads the database and renders the result needs no API, no client state library and no loading spinner for the initial payload. The complexity that the popular patterns add back is complexity you did not need.',
            'Серверный компонент, который читает базу и рисует результат, не требует ни API, ни клиентской библиотеки состояния, ни спиннера для первого ответа. Сложность, которую добавляют популярные подходы, — это сложность, которая не была нужна.'
          ),
        },
        {
          tone: 'note',
          title: L('A server action ships as a reference', 'Серверное действие уезжает ссылкой'),
          text: L(
            'The implementation of an action stays on the server. The client bundle receives an identifier and a dispatcher, which is why an action can be called from a form without pulling server code into the browser.',
            'Реализация действия остаётся на сервере. В клиентский бандл приходит идентификатор и диспетчер, поэтому действие можно вызвать из формы, не тащая серверный код в браузер.'
          ),
        },
      ],
      takeaway: L(
        'Server code is free and client code is paid for by every visitor, so the default belongs on the server.',
        'Серверный код бесплатен, а клиентский оплачивает каждый посетитель, поэтому по умолчанию всё живёт на сервере.'
      ),
      seeAlso: [
        L('Section 2-1: the server component model', 'Секция 2-1: модель серверных компонентов'),
        L('Section 2-5: composition patterns across the boundary', 'Секция 2-5: композиция через границу'),
        L('Section 5-1: what middleware can and cannot do', 'Секция 5-1: что может и чего не может промежуточное ПО'),
      ],
    },
    {
      id: 'next-ch2-s3',
      title: L('The client boundary and what can cross it', 'Клиентская граница и что через неё проходит'),
      body: L(
        '"use client" is a boundary marker, not an optimization switch. It says: from this line down, the code executes in the browser. Everything the file imports joins the client bundle, so a component that pulls in a charting library adds that library to the page even when the library renders in one branch that most visitors never open. The rule that follows is mechanical: push the directive down until it sits on the smallest interactive element.\n\nThe boundary also decides the direction of communication. A server component may import a client component and pass it data. A client component may not import a server component and call it during render, because the server code does not exist in the browser. The way to send work back to the server is not a callback prop but a server action, a function marked "use server" that the framework turns into an endpoint.\n\nThere is exactly one kind of value that crosses the boundary in the other direction without a request: a React element. `children` and any element passed as a prop are serialized as an element type and rendered on the server, then handed to the client component as finished markup. This is what makes the composition pattern work: expensive server rendering on the outside, a small interactive island on the inside.\n\nThe boundary is also where the React rules apply. A client component owns all the hooks, `useState` and `useEffect` exist only on that side of the line, and a client component that suspends during the initial render needs a Suspense boundary above it. Server components, by contrast, may be async and may read data, and none of the hooks are available to them.',
        '"use client" — это маркер границы, а не переключатель оптимизации. Он говорит: от этой строки вниз код выполняется в браузере. Всё, что импортирует файл, попадает в клиентский бандл, поэтому компонент, втягивающий тяжёлую библиотеку графиков, утяжеляет страницу, даже если библиотека рисуется в ветке, которую большинство посетителей не открывает. Отсюда механическое правило: опускайте директиву, пока она не ляжет на самый маленький интерактивный элемент.\n\nГраница задаёт и направление обмена. Серверный компонент может импортировать клиентский и передавать ему данные. Клиентский компонент не может импортировать серверный и вызывать его во время рендера, потому что серверного кода в браузере нет. Способ отправить работу на сервер — не колбэк-проп, а серверное действие: функция с директивой "use server", которую фреймворк превращает в эндпоинт.\n\nЧерез границу в обратную сторону без запроса проходит ровно один вид значения — React-элемент. `children` и любой элемент, переданный пропом, сериализуются как тип элемента, рендерятся на сервере и попадают в клиентский компонент уже готовой разметкой. Именно на этом держится схема композиции: дорогой серверный рендер снаружи, маленький интерактивный островок внутри.\n\nГраница — это ещё и место, где действуют правила React. Клиентский компонент владеет всеми хуками, `useState` и `useEffect` существуют только по эту сторону линии, а клиентский компонент, который приостанавливается при первом рендере, нуждается в границе Suspense над собой. Серверные компоненты, наоборот, могут быть асинхронными и могут читать данные, и ни одного хука у них нет.'
      ),
      bullets: [
        L('"use client" ships the file and its whole import subtree to the browser.', '"use client" отправляет в браузер файл и всё поддерево его импортов.'),
        L('Push the directive to the smallest interactive element.', 'Опускайте директиву до самого маленького интерактивного элемента.'),
        L('A server component may render a client component, not the other way round.', 'Серверный компонент может отрисовать клиентский, но не наоборот.'),
        L('React elements cross the boundary, plain functions do not.', 'React-элементы проходят через границу, обычные функции — нет.'),
        L('Hooks exist only on the client side of the boundary.', 'Хуки существуют только по клиентскую сторону границы.'),
      ],
      code: `// app/cart/CartShell.tsx  - the small client island
'use client';

import { useState } from 'react';

export function CartShell({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen((value) => !value)}>
        Total: {total}
      </button>
      {open ? children : null}
    </section>
  );
}`,
      table: {
        caption: L('What may cross the client boundary', 'Что проходит через клиентскую границу'),
        headers: [
          L('Value', 'Значение'),
          L('Allowed', 'Разрешено'),
          L('Notes', 'Заметки'),
        ],
        rows: [
          [
            L('Objects, arrays, strings, numbers', 'Объекты, массивы, строки, числа'),
            L('Yes', 'Да'),
            L('Plain data', 'Простые данные'),
          ],
          [
            L('Date, Map, Set, TypedArray', 'Date, Map, Set, TypedArray'),
            L('Yes', 'Да'),
            L('Supported by React', 'Поддержаны React'),
          ],
          [
            L('React elements and children', 'React-элементы и children'),
            L('Yes', 'Да'),
            L('Rendered on the server first', 'Сначала рендерятся на сервере'),
          ],
          [
            L('Functions and callbacks', 'Функции и колбэки'),
            L('No', 'Нет'),
            L('Use a server action', 'Используйте серверное действие'),
          ],
          [
            L('Class instances', 'Экземпляры классов'),
            L('No', 'Нет'),
            L('Behaviour lives on the prototype', 'Поведение живёт в прототипе'),
          ],
          [
            L('Promises', 'Промисы'),
            L('Yes', 'Да'),
            L('Awaited by the client runtime', 'Ожидаются клиентским рантаймом'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A callback prop', 'Колбэк в пропе'),
          text: L(
            'A prop typed as a function cannot cross the boundary. The usual workaround, making the parent a client component too, drags a whole subtree into the bundle to satisfy one handler. The right move is a server action, which keeps the parent on the server.',
            'Проп, типизированный как функция, через границу не проходит. Обычный обходной путь, сделать клиентским и родителя, утягивает в бандл целое поддерево ради одного обработчика. Правильный ход — серверное действие, которое оставляет родителя на сервере.'
          ),
        },
        {
          tone: 'tip',
          title: L('Move the directive down one file at a time', 'Опускайте директиву по одному файлу'),
          text: L(
            'When a file needs the directive, extract the interactive part into its own file and leave the rest alone. Repeating that move until nothing is left to extract is a reliable way to find the real minimum of client code.',
            'Когда файлу нужна директива, вынесите интерактивную часть в отдельный файл, а остальное оставьте как есть. Повторяя это перемещение, пока выносить больше нечего, вы находите настоящий минимум клиентского кода.'
          ),
        },
      ],
      takeaway: L(
        'The directive marks where the browser takes over, so put it on the leaf and let the server render the rest.',
        'Директива отмечает, где вступает браузер, поэтому вешайте её на лист, а остальное пусть рендерит сервер.'
      ),
      seeAlso: [
        L('Section 2-4: serialisation rules', 'Секция 2-4: правила сериализации'),
        L('Section 2-6: common "use client" mistakes', 'Секция 2-6: типичные ошибки с "use client"'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
    {
      id: 'next-ch2-s4',
      title: L('Serialisation rules', 'Правила сериализации'),
      body: L(
        'Every value that crosses from a server component to a client component is serialized with the React flight format, and only a restricted set of shapes survives the trip. Plain objects, arrays, strings, numbers, booleans, null and undefined are fine. Date, Map, Set, TypedArray and promises are supported by React itself. What is not supported is anything that carries behaviour: functions, class instances, symbols and everything that depends on a prototype chain.\n\nThe reason is structural, not a policy. The server has no way to ship a closure to the browser, because a closure captures variables that live in the server process and the browser has no access to them. The same applies to a class instance, whose methods live on the prototype. When the boundary is crossed, the value has to become plain data that can be reconstructed on the other side.\n\nPromises are the interesting case. A promise created on the server can be passed to a client component, and the client runtime suspends on it until it resolves. This is how a client component can await data that was started on the server without a second round trip, and it is also why the same promise must not be created anew during every render of the same component.\n\nThe practical rule for props is short: think JSON, then add the few exceptions React supports deliberately. When a prop must carry behaviour, it cannot be a prop. Either move the behaviour into a server action, or move the component that needs the behaviour to the client side and pass the data instead. A prop typed as a function is the smell that says the boundary sits in the wrong place.',
        'Каждое значение, переходящее из серверного компонента в клиентский, сериализуется форматом React flight, и выживает только ограниченный набор форм. Простые объекты, массивы, строки, числа, логические значения, null и undefined — без проблем. Date, Map, Set, TypedArray и промисы поддержаны самим React. Не поддержано всё, что несёт поведение: функции, экземпляры классов, символы и всё, что зависит от цепочки прототипов.\n\nПричина структурная, а не политическая. У сервера нет способа отправить замыкание в браузер: замыкание захватывает переменные, живущие в серверном процессе, и доступа к ним у браузера нет. То же самое с экземпляром класса, чьи методы живут в прототипе. Пересекая границу, значение обязано стать простыми данными, которые можно восстановить на другой стороне.\n\nПромисы — интересный случай. Промис, созданный на сервере, можно передать клиентскому компоненту, и клиентский рантайм приостановится на нём до разрешения. Так клиентский компонент дожидается данных, начатых на сервере, без второго запроса, и по той же причине один и тот же промис нельзя создавать заново при каждом рендере компонента.\n\nПрактическое правило для пропов короткое: думайте о JSON, а потом добавьте те немногие исключения, которые React поддерживает осознанно. Если проп должен нести поведение, он не может быть пропом. Либо поведение переносится в серверное действие, либо компонент, которому поведение нужно, переезжает на клиентскую сторону, а пропом идёт данные. Проп, типизированный как функция, — это запах, который говорит, что граница стоит не там.'
      ),
      bullets: [
        L('Only plain data and React elements cross the boundary.', 'Через границу проходят только простые данные и React-элементы.'),
        L('Functions and class instances are rejected because behaviour cannot be serialized.', 'Функции и экземпляры классов отклоняются: поведение не сериализуется.'),
        L('Promises cross and are awaited by the client runtime.', 'Промисы проходят и ожидаются клиентским рантаймом.'),
        L('Think JSON when you design a prop type.', 'Думайте о JSON, когда проектируете тип пропа.'),
        L('A callback prop means the behaviour belongs in an action.', 'Колбэк в пропе означает, что поведению место в действии.'),
      ],
      code: `// app/products/ProductList.tsx - server component, plain props only
export type Product = { id: string; name: string; price: number };

export function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// app/products/page.tsx
import { ProductList } from './ProductList';

export default async function ProductsPage() {
  const products = await db.product.findMany(); // plain data only
  return <ProductList products={products} />;
}`,
      table: {
        caption: L('Serializable across the boundary', 'Что сериализуется через границу'),
        headers: [
          L('Type', 'Тип'),
          L('Crosses?', 'Проходит?'),
          L('Reason', 'Причина'),
        ],
        rows: [
          [
            L('Object, array, string, number', 'Объект, массив, строка, число'),
            L('Yes', 'Да'),
            L('Plain data', 'Простые данные'),
          ],
          [
            L('Date, Map, Set', 'Date, Map, Set'),
            L('Yes', 'Да'),
            L('React has explicit support', 'У React есть явная поддержка'),
          ],
          [
            L('React element', 'React-элемент'),
            L('Yes', 'Да'),
            L('Serialized as an element', 'Сериализуется как элемент'),
          ],
          [
            L('Promise', 'Промис'),
            L('Yes', 'Да'),
            L('Awaited by the client', 'Ожидается клиентом'),
          ],
          [
            L('Function', 'Функция'),
            L('No', 'Нет'),
            L('Closes over server state', 'Замыкает серверное состояние'),
          ],
          [
            L('Class instance', 'Экземпляр класса'),
            L('No', 'Нет'),
            L('Behaviour lives on the prototype', 'Поведение живёт в прототипе'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The prop that must be a function', 'Проп, который обязан быть функцией'),
          text: L(
            'When a prop holds a callback, the compiler rejects the crossing. The tempting fix is to type the prop as any, which moves the failure from build time to runtime as an undefined is not a function at the moment the user clicks. Declare the callback as a server action instead.',
            'Когда проп содержит колбэк, компилятор отклоняет такое пересечение. Соблазнительное решение — типизировать проп как any, и тогда ошибка переезжает из времени сборки во время выполнения в виде «undefined is not a function» в момент клика пользователя. Объявите колбэк серверным действием.'
          ),
        },
        {
          tone: 'note',
          title: L('Return values travel too', 'Возвращаемые значения тоже передаются'),
          text: L(
            'The value a server action returns is serialized to the client with the same rules. Returning a whole record from the database sends every column into the browser, including the ones the interface never shows.',
            'Значение, возвращаемое серверным действием, сериализуется в браузер по тем же правилам. Возврат всей записи из базы отправляет каждую колонку в браузер, включая те, которых интерфейс никогда не показывает.'
          ),
        },
      ],
      takeaway: L(
        'Only data crosses the boundary, so behaviour has to become a server action or stay on the server.',
        'Через границу проходят только данные, поэтому поведение должно стать серверным действием или остаться на сервере.'
      ),
      seeAlso: [
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
        L('Section 2-5: composition patterns across the boundary', 'Секция 2-5: композиция через границу'),
        L('Section 4-1: what a server action is', 'Секция 4-1: что такое серверное действие'),
      ],
    },
    {
      id: 'next-ch2-s5',
      title: L('Composition patterns across the boundary', 'Композиция через границу'),
      body: L(
        'The pattern that makes the model usable is server outside, client inside. A server component reads the data, renders the parts that never change, and hands a finished subtree to a small client component as `children`. The client component owns the interaction, and it never needs the data itself, because the data is already in the markup it wraps.\n\nThis is how a component library stays a server library. A tabs component with a client implementation still receives its panels as server-rendered children: the tab headers and the panel contents are produced on the server, and only the state that tracks the selected tab lives in the browser. The heavy content never becomes client code, no matter how much of it there is.\n\nThe mirror pattern is the server-rendered shell with a client slot. A server component can render a client component with a `fallback` prop for the pending state, which is how a cart badge or a live ticker is embedded into an otherwise static page. The client slot receives plain props and renders its own loading state while its own data arrives, without touching the rest of the document.\n\nWhen the two sides genuinely need to talk, the conversation has to be explicit. Data flows down as props, events flow up as server actions or as calls to a route handler. A composition that tries to make a server component call a client function during render is a design error, and the compiler reports it. The rule that keeps it clean is simple: the parent decides what is data and what is behaviour, and the boundary follows that decision.',
        'Схема, которая делает модель пригодной для работы, — сервер снаружи, клиент внутри. Серверный компонент читает данные, рендерит то, что не меняется, и передаёт готовое поддерево маленькому клиентскому компоненту как `children`. Клиентский компонент владеет взаимодействием и самому данные не нужны: они уже в разметке, которую он оборачивает.\n\nТак библиотека компонентов остаётся серверной. Компонент вкладок с клиентской реализацией по-прежнему получает свои панели как серверные потомки: заголовки вкладок и их содержимое производятся на сервере, и только состояние выбранной вкладки живёт в браузере. Тяжёлое содержимое не становится клиентским кодом, сколько бы его ни было.\n\nОбратная схема — серверная оболочка с клиентским слотом. Серверный компонент может отрисовать клиентский компонент с пропом `fallback` для состояния ожидания, и так счётчик корзины или живой индикатор встраиваются в статичную страницу. Клиентский слот получает простые пропы и рисует своё состояние загрузки, пока приходят его данные, не трогая остальной документ.\n\nКогда двум сторонам действительно нужно поговорить, разговор должен быть явным. Данные текут вниз пропами, события текут вверх серверными действиями или вызовами обработчика маршрута. Композиция, в которой серверный компонент вызывает клиентскую функцию во время рендера, — это ошибка проектирования, и компилятор об этом сообщает. Правило, которое держит всё чистым, простое: родитель решает, что является данными, а что поведением, и граница следует за этим решением.'
      ),
      bullets: [
        L('Server outside, client inside, and the client receives rendered children.', 'Сервер снаружи, клиент внутри, а клиент получает отрендеренных потомков.'),
        L('A client library can keep its content server-rendered.', 'Клиентская библиотека может оставить содержимое серверным.'),
        L('A client slot with a fallback prop embeds interactivity into a static page.', 'Клиентский слот с пропом fallback встраивает интерактивность в статичную страницу.'),
        L('Data flows down as props, events flow up as actions.', 'Данные текут вниз пропами, события вверх — действиями.'),
        L('Mixing the direction of the flow is a design error.', 'Смешение направлений потока — это ошибка проектирования.'),
      ],
      code: `// app/products/AddToCart.tsx - client component
'use client';

import { useState } from 'react';

export function AddToCart({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? 'Added' : 'Add'}</button>;
}

// app/products/[id]/page.tsx - server component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });
  return (
    <article>
      <h1>{product.name}</h1>
      <AddToCart productId={id} />
    </article>
  );
}`,
      table: {
        caption: L('Two ways to combine the sides', 'Два способа соединить стороны'),
        headers: [
          L('Pattern', 'Схема'),
          L('Server provides', 'Даёт сервер'),
          L('Client owns', 'Владеет клиент'),
        ],
        rows: [
          [
            L('Children composition', 'Композиция через children'),
            L('Rendered content', 'Отрендеренное содержимое'),
            L('The interactive state', 'Интерактивное состояние'),
          ],
          [
            L('Client slot', 'Клиентский слот'),
            L('Plain props', 'Простые пропы'),
            L('Its own loading state', 'Своё состояние загрузки'),
          ],
          [
            L('Server action', 'Серверное действие'),
            L('The write', 'Запись данных'),
            L('The pending flag', 'Флаг ожидания'),
          ],
          [
            L('Route handler', 'Обработчик маршрута'),
            L('An HTTP answer', 'HTTP-ответ'),
            L('The fetch and the state', 'Запрос и состояние'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Pass children, not data', 'Передавайте children, а не данные'),
          text: L(
            'Passing rendered children keeps the content on the server and shrinks the client surface to the interaction. Passing the same content as data forces it through serialisation and puts a copy of it in the browser.',
            'Передача отрендеренных children оставляет содержимое на сервере и сокращает клиентскую поверхность до взаимодействия. Передача того же содержимого данными прогоняет его через сериализацию и кладёт копию в браузер.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Calling a client function from a server component', 'Вызов клиентской функции из серверного компонента'),
          text: L(
            'This looks like a harmless helper call and it fails at build time or produces a component that never hydrates. When the server needs the browser to do something, that something has to be a server action, not a function passed down.',
            'Это выглядит как безобидный вызов помощника, но он падает при сборке или даёт компонент, который никогда не гидратируется. Когда серверу нужно, чтобы браузер что-то сделал, это «что-то» должно быть серверным действием, а не переданной вниз функцией.'
          ),
        },
      ],
      takeaway: L(
        'Let the server render the content and the client own the interaction, and the two stop fighting each other.',
        'Пусть сервер рендерит содержимое, а клиент владеет взаимодействием — и они перестанут мешать друг другу.'
      ),
      seeAlso: [
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
        L('Section 4-5: progressive enhancement and errors', 'Секция 4-5: прогрессивное улучшение и ошибки'),
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
      ],
    },
    {
      id: 'next-ch2-s6',
      title: L('Common "use client" mistakes', 'Типичные ошибки с "use client"'),
      body: L(
        'The most expensive mistake is putting "use client" at the top of a page. The directive applies to the file and to everything it imports, so one line at the top of a route turns the entire subtree into client code: every component, every library, every data-access helper that came along with the imports. The page still works, the data still arrives, and the bundle quietly grows by hundreds of kilobytes.\n\nThe second mistake is marking a file that does not need it, because a hook was used three lines below. The fix is to extract the interactive part into its own file and let the rest stay on the server. A component that needs one toggle does not need to own the data-fetching component rendered next to it, and merging them for convenience merges their runtimes as well.\n\nThe third mistake is passing a callback. A prop typed as a function cannot cross the boundary, so either the build fails or the parent is pushed into the client bundle just to make the callback exist. The alternative is a server action: an async function marked "use server" that the framework exposes as an endpoint, which the client calls without shipping any server code.\n\nThe fourth mistake is assuming that "use client" makes a component fast. It does the opposite: it adds hydration work. A client component is rendered on the server, then rendered again in the browser and reconciled, so every line of client code costs download, parse and hydration time. The useful question is not whether the component is interactive but whether it needs the browser at all.',
        'Самая дорогая ошибка — поставить "use client" вверху страницы. Директива действует на файл и на всё, что он импортирует, поэтому одна строка в начале файла маршрута превращает в клиентский код всё поддерево: каждый компонент, каждую библиотеку, каждый помощник доступа к данным, попавший в импорты. Страница продолжает работать, данные приходят, а бандл тихо растёт на сотни килобайт.\n\nВторая ошибка — пометить файл, которому это не нужно, из-за того, что хук использовался тремя строками ниже. Лечение: вынести интерактивную часть в отдельный файл, а остальное оставить на сервере. Компоненту, которому нужен один переключатель, не нужно владеть ещё и компонентом, загружающим данные, который рисуется рядом, и объединение ради удобства объединяет и рантаймы.\n\nТретья ошибка — передать колбэк. Проп, типизированный как функция, через границу не проходит, поэтому либо сборка падает, либо родителя выталкивают в клиентский бандл только ради существования колбэка. Альтернатива — серверное действие: асинхронная функция с директивой "use server", которую фреймворк открывает как эндпоинт и которую клиент вызывает, не отправляя в браузер никакого серверного кода.\n\nЧетвёртая ошибка — считать, что "use client" делает компонент быстрым. Он делает наоборот, добавляет работу гидратации. Клиентский компонент рисуется на сервере, потом рисуется в браузере и сверяется, поэтому каждая его строка стоит времени на загрузку, разбор и гидратацию. Полезный вопрос не «интерактивен ли компонент», а «нужен ли ему браузер».'
      ),
      bullets: [
        L('One directive at the top of a page drags the whole subtree into the bundle.', 'Одна директива вверху страницы утягивает в бандл всё поддерево.'),
        L('Extract the interactive part instead of marking the whole file.', 'Выносите интерактивную часть, а не помечайте весь файл.'),
        L('A callback prop cannot cross the boundary, use a server action.', 'Колбэк в пропе не проходит через границу, нужен серверное действие.'),
        L('"use client" adds hydration cost, it does not remove it.', '"use client" добавляет стоимость гидратации, а не убирает её.'),
        L('The test is whether the component needs the browser, not whether it has a click handler.', 'Проверяйте, нужен ли компоненту браузер, а не есть ли у него обработчик клика.'),
      ],
      code: `// app/dashboard/page.tsx - stays a server component
import { Revenue } from './Revenue';
import { RevenueChart } from './RevenueChart';
export default async function DashboardPage() {
  const revenue = await getRevenue(); // server data access
  return (
    <section>
      <Revenue total={revenue.total} />
      <RevenueChart data={revenue.points} />
    </section>
  );
}

// app/dashboard/RevenueChart.tsx - the only client file
'use client';

import { useState } from 'react';

export function RevenueChart({ data }: { data: number[] }) {
  const [expanded, setExpanded] = useState(false);
  return <button onClick={() => setExpanded(!expanded)}>{data.length} points</button>;
}`,
      table: {
        caption: L('The mistake and the fix', 'Ошибка и её исправление'),
        headers: [
          L('Mistake', 'Ошибка'),
          L('Symptom', 'Симптом'),
          L('Fix', 'Исправление'),
        ],
        rows: [
          [
            L('Directive on the page', 'Директива на странице'),
            L('A bundle far larger than the UI', 'Бандл заметно больше, чем интерфейс'),
            L('Move it to the leaf', 'Перенести на лист'),
          ],
          [
            L('Directive on a data component', 'Директива на компоненте с данными'),
            L('The data layer ships to the browser', 'Слой данных уезжает в браузер'),
            L('Split the interactive part out', 'Вынести интерактивную часть'),
          ],
          [
            L('Callback passed as a prop', 'Колбэк передан пропом'),
            L('A build error or an any', 'Ошибка сборки или any'),
            L('Use a server action', 'Использовать серверное действие'),
          ],
          [
            L('Client fetch instead of server read', 'Клиентская загрузка вместо серверного чтения'),
            L('A round trip and a loading state', 'Лишний запрос и состояние загрузки'),
            L('Read on the server', 'Читать на сервере'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The directive is inherited, not local', 'Директива наследуется, а не действует локально'),
          text: L(
            'A file marked "use client" that imports a heavy library makes that library client code even when the import is only used in a branch. The import graph is what ships, not the lines that happen to be rendered.',
            'Файл с "use client", импортирующий тяжёлую библиотеку, делает её клиентским кодом, даже если импорт используется только в одной ветке. В бандл уезжает граф импортов, а не те строки, которые случайно отрисовались.'
          ),
        },
        {
          tone: 'warning',
          title: L('Check the bundle, not the intention', 'Проверяйте бандл, а не намерение'),
          text: L(
            'The build prints the size of the first load JavaScript for every route. Compare it before and after a refactor: a change that looks harmless in the diff is often visible in those numbers.',
            'Сборка печатает размер JavaScript первой загрузки для каждого маршрута. Сравните эти числа до и после рефакторинга: изменение, выглядящее безобидным в диффе, часто видно именно в них.'
          ),
        },
      ],
      takeaway: L(
        'Push "use client" down to the smallest interactive leaf and verify the bundle, not the intention.',
        'Опускайте "use client" до самого маленького интерактивного листа и проверяйте бандл, а не намерение.'
      ),
      seeAlso: [
        L('Section 2-1: the server component model', 'Секция 2-1: модель серверных компонентов'),
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
  ],
};
