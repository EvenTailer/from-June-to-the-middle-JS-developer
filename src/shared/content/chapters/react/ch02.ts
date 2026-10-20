import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh02: Chapter = {
  id: 'react-ch2',
  title: L('The rendering model', 'Модель рендера'),
  summary: L(
    'How React walks the tree, what a fiber is, when the DOM is actually changed, what strict mode double rendering is for, and how transitions keep the interface responsive.',
    'Как React обходит дерево, что такое волокно, когда на самом деле меняется DOM, зачем строгий режим вызывает рендер дважды и как переходы сохраняют отзывчивость интерфейса.'
  ),
  sections: [
    {
      id: 'react-ch2-s1',
      title: L('Rendering as a recursive walk of the tree', 'Рендер как рекурсивный обход дерева'),
      body: L(
        'Rendering is a recursive walk that starts at the root. React calls the root component, takes the element it returns, and for every child element it repeats the same step. A host element such as a div has no children to call, so the walk stops there and the walk continues with the next sibling. A component element is not a node in the final tree: it is a function to be called, and the elements it returns become part of the tree that React builds.\n\nCalling a component is an ordinary function call with two exceptions. The function may call hooks, and React collects those hook calls in the order they happen and attaches the results to the instance. The function must not do anything outside its own body: no network requests, no timers, no mutation of anything it does not own. Everything the component needs must arrive through props or live in its own state.\n\nThe output of the walk is a description, not a screen. During the render phase nothing in the DOM changes, and React is free to throw the result away and compute it again if an update with a higher priority arrives. That is what makes rendering a pure computation, and it is the property that the rest of the model relies on: React can always start the walk again from the root without leaving half of the screen in a broken state.',
        'Рендер — это рекурсивный обход, который начинается с корня. React вызывает корневой компонент, берёт возвращённый им элемент и для каждого дочернего элемента повторяет тот же шаг. У хост-элемента вроде div нет потомков для вызова, поэтому обход там заканчивается и переходит к следующему соседу. Элемент-компонент не является узлом итогового дерева: это функция, которую нужно вызвать, а элементы, которые она вернёт, становятся частью строящегося дерева.'
      ),
      bullets: [
        L('Rendering starts at the root and recurses through the returned elements.', 'Рендер начинается с корня и рекурсивно обходит возвращённые элементы.'),
        L('A component element is a function to call, not a node of the final tree.', 'Элемент-компонент — это функция для вызова, а не узел итогового дерева.'),
        L('Hooks are collected in call order and attached to the component instance.', 'Вызовы хуков собираются по порядку и прикрепляются к инстансу компонента.'),
        L('The render phase touches no DOM and produces a description only.', 'Фаза рендера не трогает DOM и даёт только описание.'),
        L('Because rendering is pure, React can discard it and render again from the root.', 'Поскольку рендер чист, React может выбросить его и посчитать заново от корня.'),
      ],
      code: `// What React does when the root renders
function App() {
  return (
    <Layout>
      <Article />
    </Layout>
  );
}

// The walk: App() returns an element, Layout() is called,
// the result of Layout() contains Article(), and Article() is called too.
function Layout({ children }) {
  return <main>{children}</main>;
}

function Article() {
  const [open, setOpen] = useState(false);
  // Reading state here is fine, changing anything outside is not
  return <button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</button>;
}`,
      callouts: [
        {
          tone: 'note',
          title: L('Rendering is a pure function call', 'Рендер — чистый вызов функции'),
          text: L(
            'React calls your component the way you would call any function and expects a plain result. The moment a component starts a timer or writes to an external variable, the result stops being a function of props and state, and the behaviour of the whole tree becomes unpredictable.',
            'React вызывает компонент так же, как вы вызвали бы любую функцию, и ждёт простой результат. Как только компонент запускает таймер или пишет во внешнюю переменную, результат перестаёт быть функцией пропсов и состояния, и поведение всего дерева становится непредсказуемым.'
          ),
        },
      ],
      takeaway: L(
        'Rendering is a recursive call of pure functions that produces a description, so it can be repeated or thrown away.',
        'Рендер — это рекурсивный вызов чистых функций, дающий описание, поэтому его можно повторить или выбросить.'
      ),
      seeAlso: [
        L('Section 2-2: reconciliation and the fiber tree', 'Секция 2-2: согласование и дерево волокон'),
        L('Section 3-1: function components and purity', 'Секция 3-1: функциональные компоненты и чистота'),
        L('Section 2-5: concurrent rendering and transitions', 'Секция 2-5: конкурентный рендер и переходы'),
      ],
    },
    {
      id: 'react-ch2-s2',
      title: L('Reconciliation and the fiber tree', 'Согласование и дерево волокон'),
      body: L(
        'Reconciliation is the algorithm that decides what to do with a freshly computed tree. React does not compare two JavaScript trees line by line and does not rebuild the DOM. Every element in the tree is represented by a fiber: a lightweight node that holds the type, the key, the props, the state and links to the parent, the first child and the next sibling. The fibers form a second tree that mirrors the element tree and carries the bookkeeping the render phase needs.\n\nThe render phase builds a work in progress tree while the current tree stays on the screen. This double buffering means the visible interface never shows a half finished state: when the new tree is ready, the commit phase swaps it in and applies the DOM mutations. Because the work in progress tree is built separately, React can pause in the middle, walk away to handle a more urgent update, and come back later without having damaged anything.\n\nOn each level of the tree React compares the new element with the old one. The type and the key decide the outcome. The same type and the same key mean an update: the instance, the state and the DOM node are kept and only the changed parts are touched. A different type or a different key means the old node is unmounted and a new one is mounted. The comparison descends into the children, which is why the key matters so much for lists.',
        'Согласование — это алгоритм, который решает, что делать с только что посчитанным деревом. React не сравнивает два дерева JavaScript построчно и не перестраивает DOM. Каждому элементу дерева соответствует волокно: лёгкий узел, который хранит тип, key, пропсы, состояние и ссылки на родителя, первого потомка и следующего соседа. Волокна образуют второе дерево, отражающее дерево элементов и несущее служебные данные, нужные фазе рендера.'
      ),
      bullets: [
        L('A fiber holds the type, the key, the props, the state and the links to the neighbours.', 'Волокно хранит тип, key, пропсы, состояние и ссылки на соседей.'),
        L('The render phase builds a work in progress tree while the current tree stays visible.', 'Фаза рендера строит дерево в работе, а текущее дерево остаётся на экране.'),
        L('The commit phase swaps the finished tree in and applies the DOM changes.', 'Фаза коммита подставляет готовое дерево и применяет изменения DOM.'),
        L('Same type and same key mean update in place, different ones mean remount.', 'Одинаковые тип и key — обновление на месте, разные — пересоздание.'),
        L('Reconciliation updates changed attributes and text instead of recreating nodes.', 'Согласование меняет изменившиеся атрибуты и текст, а не пересоздаёт узлы.'),
      ],
      code: `// Reconciliation compares old and new children position by position
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // Same key: the li node is reused, only its text changes
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// React does not rebuild the DOM. It applies the smallest set of mutations:
// set textContent on the changed li, insert or remove the added rows,
// and leave every untouched node exactly as it was.`,
      table: {
        caption: L('What happens at one position of the tree', 'Что происходит на одной позиции дерева'),
        headers: [L('Type', 'Тип'), L('Key', 'Key'), L('Result', 'Результат')],
        rows: [
          [L('same', 'тот же'), L('same', 'тот же'), L('update in place, state survives', 'обновление на месте, состояние сохраняется')],
          [L('same', 'тот же'), L('different', 'другой'), L('unmount and mount, state is lost', 'размонтирование и монтирование, состояние теряется')],
          [L('different', 'другой'), L('any', 'любой'), L('unmount and mount, state is lost', 'размонтирование и монтирование, состояние теряется')],
          [L('removed', 'удалён'), L('any', 'любой'), L('unmount, cleanup runs', 'размонтирование, выполняется очистка')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Why fibers', 'Зачем нужны волокна'),
          text: L(
            'A fiber is a unit of work. Its size lets React interrupt the walk between fibers, jump to a more urgent update and come back to the same place. Without that granularity a big tree would have to be finished in one piece.',
            'Волокно — это единица работы. Её размер позволяет React прервать обход между волокнами, переключиться на более срочное обновление и вернуться на то же место. Без такой детализации большое дерево пришлось бы завершать целиком.'
          ),
        },
      ],
      takeaway: L(
        'React keeps a fiber tree, compares type and key at every position and updates the existing DOM instead of rebuilding it.',
        'React хранит дерево волокон, сравнивает тип и key на каждой позиции и обновляет существующий DOM, а не перестраивает его.'
      ),
      seeAlso: [
        L('Section 1-3: keys and list rendering', 'Секция 1-3: ключи и рендер списков'),
        L('Section 2-3: batching and when the DOM is touched', 'Секция 2-3: батчинг и момент изменения DOM'),
        L('Section 2-5: concurrent rendering and transitions', 'Секция 2-5: конкурентный рендер и переходы'),
      ],
    },
    {
      id: 'react-ch2-s3',
      title: L('Batching and when the DOM is touched', 'Батчинг и момент изменения DOM'),
      body: L(
        'An update is not applied the moment it is requested. React collects the updates that happen in the same tick into one queue and processes them together, which is called batching. Since React 18 the batching is automatic: updates coming from event handlers, promise callbacks, timeouts and native event sources are all grouped, and there is no API to switch it off. A component that calls three setters in one handler triggers one render, not three.\n\nThe DOM is touched in the commit phase, and only there. The render phase computes the tree, the commit phase walks the finished tree and applies the changes: text content, attributes, styles, insertion and removal of nodes. Everything the commit phase does is synchronous, and React does not interleave other work into it, so a user never sees a partially updated page from a single commit.\n\nDOM меняется в фазе коммита, и только там. Фаза рендера считает дерево, фаза коммита обходит готовое дерево и применяет изменения: текст, атрибуты, стили, вставку и удаление узлов. Всё, что делает фаза коммита, синхронно, и React не вмешивает туда другую работу, поэтому пользователь никогда не видит наполовину обновлённую страницу.',
        'Обновление применяется не в момент запроса. React собирает обновления, случившиеся за один тик, в очередь и обрабатывает их вместе — это называется батчингом. Начиная с React 18 батчинг автоматический: обновления из обработчиков событий, из промисов, из таймеров и из нативных источников событий группируются одинаково, и API для отключения нет. Компонент, вызвавший три сеттера в одном обработчике, вызывает один рендер, а не три.\n\nLayout effects run inside the commit phase, right after the DOM was mutated and before the browser has painted anything. A useLayoutEffect callback that measures an element therefore reads the final geometry, and a change it makes is visible in the very same frame. Passive effects run later, after the paint, and they are scheduled with a normal priority, which is why they must not block the screen.\n\nЭффекты раскладки выполняются внутри фазы коммита, сразу после изменения DOM и до отрисовки браузером. Значит, колбэк useLayoutEffect, измеряющий элемент, читает итоговую геометрию, а его изменения видны в том же кадре. Пассивные эффекты выполняются позже, после отрисовки, с обычным приоритетом, поэтому они не должны блокировать экран.'
      ),
      bullets: [
        L('Updates in the same tick are grouped into one render.', 'Обновления за один тик группируются в один рендер.'),
        L('Batching is automatic since React 18 for events, promises and timers.', 'С React 18 батчинг автоматический для событий, промисов и таймеров.'),
        L('Only the commit phase mutates the DOM.', 'Только фаза коммита меняет DOM.'),
        L('Layout effects run after the DOM mutation and before the paint.', 'Эффекты раскладки выполняются после изменения DOM и до отрисовки.'),
        L('Passive effects run after the paint and must not block the screen.', 'Пассивные эффекты выполняются после отрисовки и не должны блокировать экран.'),
      ],
      code: `function Panel({ items }) {
  const [a, setA] = useState(0);
  const [height, setHeight] = useState(0);
  const boxRef = useRef(null);

  // Three updates in one handler, one render, one commit
  function handleClick() {
    setA(1);
    setA((prev) => prev + 1);
  }

  // Measure after the DOM changed but before the browser painted
  useLayoutEffect(() => {
    setHeight(boxRef.current.getBoundingClientRect().height);
  }, [items]);

  // The same measurement, but after the paint: cheaper, one frame later
  useEffect(() => {
    console.log('painted', boxRef.current.offsetHeight);
  }, [items]);

  return <button ref={boxRef} onClick={handleClick}>a={a} h={height}</button>;
}`,
      table: {
        caption: L('The three phases of an update', 'Три фазы обновления'),
        headers: [L('Phase', 'Фаза'), L('When', 'Когда'), L('Touches the DOM', 'Трогает DOM')],
        rows: [
          [L('Render', 'Рендер'), L('after the update is queued', 'после постановки обновления в очередь'), L('no', 'нет')],
          [L('Commit', 'Коммит'), L('when the tree is finished', 'когда дерево готово'), L('yes, synchronously', 'да, синхронно')],
          [L('Effects', 'Эффекты'), L('layout before paint, passive after', 'раскладки до отрисовки, пассивные после'), L('layout only', 'только раскладки')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Batching is not a promise of one render', 'Батчинг не гарантирует одного рендера'),
          text: L(
            'Batching groups updates, but React may still render more than once, for example in strict mode or when a suspended component needs a fallback. Never count the number of renders, and never rely on a render happening after every setter call.',
            'Батчинг группирует обновления, но React всё равно может отрендерить несколько раз — например в строгом режиме или когда приостановленному компоненту нужен запасной вариант. Не считайте количество рендеров и не рассчитывайте, что рендер случится после каждого вызова сеттера.'
          ),
        },
      ],
      takeaway: L(
        'Updates are batched into one render, and the DOM changes only in the synchronous commit phase.',
        'Обновления батчатся в один рендер, а DOM меняется только в синхронной фазе коммита.'
      ),
      seeAlso: [
        L('Section 4-5: batching and multiple updates', 'Секция 4-5: батчинг и несколько обновлений'),
        L('Section 5-4: useLayoutEffect versus useEffect', 'Секция 5-4: useLayoutEffect против useEffect'),
        L('Section 2-2: reconciliation and the fiber tree', 'Секция 2-2: согласование и дерево волокон'),
      ],
    },
    {
      id: 'react-ch2-s4',
      title: L('Strict mode and double rendering', 'Строгий режим и двойной рендер'),
      body: L(
        'Strict mode is a wrapper that changes how React behaves in development only. In development it calls every component function twice, calls reducers twice, and mounts, unmounts and remounts every effect. The second call is not a second pass over the same tree: React discards the result of the first call and uses the second one. Production builds have none of this, so the double rendering never reaches the users of your application.\n\nThe purpose is to surface bugs that a single pass hides. A component that writes to an external variable, mutates a prop or performs a request during render produces different results in the two calls, and React logs a warning about it. An effect with a broken cleanup produces a visible leak when React mounts, unmounts and mounts it again. A reducer that mutates its state argument shows the mutation directly.\n\nThe double invocation is also the reason side effects in render are forbidden. Anything that happens during rendering should be a pure computation, because React may call the function again, may discard the result, or may render a different tree entirely. Code that survives strict mode is code that can be interrupted, replayed and thrown away without leaving anything behind.',
        'Строгий режим — это обёртка, меняющая поведение React только в разработке. В dev-режиме он вызывает каждую функцию компонента дважды, вызывает редьюсеры дважды, а каждый эффект монтирует, размонтирует и монтирует заново. Второй вызов — это не второй проход по тому же дереву: React отбрасывает результат первого вызова и берёт второй. В production-сборке этого нет, поэтому двойной рендер никогда не доходит до пользователей вашего приложения.'
      ),
      bullets: [
        L('Strict mode changes behaviour only in development builds.', 'Строгий режим меняет поведение только в dev-сборках.'),
        L('Component functions and reducers are called twice, and the first result is discarded.', 'Функции компонентов и редьюсеры вызываются дважды, результат первого вызова отбрасывается.'),
        L('Effects are mounted, unmounted and mounted again to test the cleanup.', 'Эффекты монтируются, размонтируются и монтируются снова — проверяется очистка.'),
        L('Impure renders, mutated props and broken cleanups surface as warnings.', 'Нечистый рендер, мутация пропсов и сломанная очистка всплывают как предупреждения.'),
        L('Production builds run every component exactly once.', 'В production-сборке каждый компонент выполняется ровно один раз.'),
      ],
      code: `// Strict mode is a wrapper, it adds no markup
<StrictMode>
  <App />
</StrictMode>

// This component renders twice in development
function Report({ rows }) {
  console.log('render'); // logged twice in dev, once in production
  return <table>{rows.map((r) => <tr key={r.id}><td>{r.title}</td></tr>)}</table>;
}

// This effect is mounted, cleaned up and mounted again in development
useEffect(() => {
  const socket = connect();
  return () => socket.close(); // the cleanup is verified here
}, []);`,
      callouts: [
        {
          tone: 'warning',
          title: L('Do not fight the double render', 'Не боритесь с двойным рендером'),
          text: L(
            'Code that needs to run once per mount belongs in an effect with a cleanup, not in a flag that remembers the first render. The flag looks like a fix and hides the real problem: the render is not pure.',
            'Коду, который должен выполняться один раз при монтировании, место в эффекте с очисткой, а не в флаге, который помнит первый рендер. Такой флаг выглядит как решение и прячет настоящую проблему: рендер не чист.'
          ),
        },
      ],
      takeaway: L(
        'Strict mode renders twice in development to expose impure renders and broken cleanups, so keep render functions pure.',
        'Строгий режим рендерит дважды в разработке, вскрывая нечистый рендер и сломанную очистку, поэтому держите функции рендера чистыми.'
      ),
      seeAlso: [
        L('Section 3-1: function components and purity', 'Секция 3-1: функциональные компоненты и чистота'),
        L('Section 5-3: cleanup and stale closures', 'Секция 5-3: очистка и устаревшие замыкания'),
        L('Section 2-1: rendering as a recursive walk of the tree', 'Секция 2-1: рендер как рекурсивный обход дерева'),
      ],
    },
    {
      id: 'react-ch2-s5',
      title: L('Concurrent rendering and transitions', 'Конкурентный рендер и переходы'),
      body: L(
        'Concurrent rendering means React can stop a render, do something more urgent and come back. Because rendering is pure, an interrupted render can be discarded without damage, and the walk can restart from the root later. The visible result is that an expensive update no longer has to be finished before the browser responds to a keystroke, and the interface stays responsive while a large tree is recomputed.\n\nThe API for this is startTransition. Wrapping a state update in it marks the update as non urgent: React renders the new input value immediately, then renders the expensive result in the background and swaps it in when it is ready. The hook useTransition returns a pair with the pending flag and the transition function, and the pending flag is what you use to show a spinner or dim the area that is being recomputed.\n\nA transition is not a way to make slow code fast. It is a way to keep the interaction responsive while slow code runs. If the work inside the transition takes ten seconds, the user still waits ten seconds, only now they can keep typing, and the pending state is visible. Code that must finish before the user proceeds belongs in a mutation, not in a transition.',
        'Конкурентный рендер означает, что React может остановить рендер, сделать что-то более срочное и вернуться. Поскольку рендер чист, прерванный результат можно выбросить без вреда, а обход позже начинается заново от корня. На практике это значит, что дорогое обновление не обязано завершиться до того, как браузер отреагирует на нажатие клавиши, и интерфейс остаётся отзывчивым, пока пересчитывается большое дерево.'
      ),
      bullets: [
        L('Concurrent rendering lets React interrupt a render and restart it later.', 'Конкурентный рендер позволяет React прервать рендер и начать его заново.'),
        L('Interrupting is safe because rendering is pure and its output can be discarded.', 'Прерывание безопасно, потому что рендер чист и его результат можно выбросить.'),
        L('startTransition marks an update as non urgent so urgent work runs first.', 'startTransition помечает обновление как несрочное, чтобы срочная работа шла первой.'),
        L('useTransition returns the pending flag together with the transition function.', 'useTransition возвращает флаг ожидания вместе с функцией перехода.'),
        L('A transition keeps the interface responsive, it does not shorten the work.', 'Переход сохраняет отзывчивость интерфейса, но не сокращает объём работы.'),
      ],
      code: `function Search({ query, setQuery }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  function onChange(event) {
    const value = event.target.value;
    setQuery(value); // urgent: the input must update right now
    startTransition(() => {
      setResults(computeResults(value)); // expensive: can wait
    });
  }

  return (
    <div>
      <input value={query} onChange={onChange} />
      {isPending && <span>Updating</span>}
      <List items={results} />
    </div>
  );
}`,
      table: {
        caption: L('Urgent work and transition work', 'Срочная работа и работа в переходе'),
        rows: [
          [L('Typing in a controlled input', 'Ввод в контролируемое поле'), L('urgent', 'срочная'), L('the caret must not jump', 'каретка не должна прыгать')],
          [L('Filtering a large list', 'Фильтрация большого списка'), L('transition', 'переход'), L('the list may arrive a frame later', 'список может прийти кадром позже')],
          [L('Saving a form', 'Сохранение формы'), L('mutation', 'мутация'), L('the result must be awaited', 'результат нужно дождаться')],
          [L('Showing a spinner', 'Показ спиннера'), L('pending flag', 'флаг ожидания'), L('the spinner is honest', 'спиннер показывает правду')],
        ],
        headers: [L('Case', 'Случай'), L('Kind', 'Вид'), L('Why', 'Почему')],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A transition is not a delay', 'Переход — это не задержка'),
          text: L(
            'Transitions do not make the work shorter and they do not queue it forever. If the expensive computation cannot be split, the user waits for it anyway, and the pending state is the only honest thing you can show.',
            'Переходы не сокращают работу и не откладывают её навсегда. Если дорогое вычисление нельзя разделить, пользователь всё равно ждёт, и единственное честное, что можно показать, — это состояние ожидания.'
          ),
        },
      ],
      takeaway: L(
        'Wrap expensive updates in startTransition so typing stays responsive, and show the pending flag while they run.',
        'Оборачивайте дорогие обновления в startTransition, чтобы ввод оставался отзывчивым, и показывайте флаг ожидания.'
      ),
      seeAlso: [
        L('Section 2-1: rendering as a recursive walk of the tree', 'Секция 2-1: рендер как рекурсивный обход дерева'),
        L('Section 4-2: state as a snapshot', 'Секция 4-2: состояние как снимок'),
        L('Chapter 10: performance', 'Глава 10: производительность'),
      ],
    },
  ],
};
