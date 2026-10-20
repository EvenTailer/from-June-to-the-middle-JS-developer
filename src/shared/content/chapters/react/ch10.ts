import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh10: Chapter = {
  id: 'react-ch10',
  title: L('Performance', 'Производительность'),
  summary: L(
    'How to measure what React actually costs, when memoisation pays for itself, how to keep long lists smooth, and how to split a bundle so the browser downloads only what the first screen needs.',
    'Как измерить реальную стоимость React, когда мемоизация окупается, как сделать длинные списки плавными и как разделить бандл, чтобы браузер скачивал только то, что нужно первому экрану.'
  ),
  sections: [
    {
      id: 'react-ch10-s1',
      title: L('Measuring before optimising', 'Сначала измерить, потом оптимизировать'),
      body: L(
        'React is fast enough that intuition is a poor profiler. The DevTools profiler records every commit React makes: which components rendered, why they rendered, how long the render phase took and how long the browser needed to paint the result. Two numbers matter more than the rest. actualDuration is the time React spent rendering the commit, and baseDuration is the same subtree measured as if nothing had been memoised.\n\nOptimising by feel leads to code that reads worse and runs no faster. Wrapping a cheap component in memo adds a props comparison to every parent update. Wrapping a trivial computation in useMemo adds a dependency comparison and a closure. Both are pure overhead when the component was never the bottleneck, and they make the next reader reason about identity instead of behaviour.\n\nThe profiler also exposes waterfalls, which cost more wall-clock time than any render. A component that fetches in an effect and renders a child that fetches again produces sequential round trips where parallel requests would take the time of the slowest one. Before touching component code, look at the network panel and at the why-did-this-render column: the biggest win is often a different request order, not a faster render.',
        'React настолько быстр, что интуиция — плохой профилировщик. Профилировщик в DevTools записывает каждый коммит React: какие компоненты отрисовались, почему они отрисовались, сколько длилась фаза рендеринга и сколько браузеру понадобилось на отрисовку. Важнее остального два числа: actualDuration — время, потраченное React на рендеринг коммита, а baseDuration — то же поддерево, измеренное так, будто ничего не было мемоизировано.\n\nОптимизация на глаз приводит к коду, который читается хуже и работает ничуть не быстрее. Оборачивать дешёвый компонент в memo — значит добавить сравнение пропов к каждому обновлению родителя. Оборачивать тривиальное вычисление в useMemo — значит добавить сравнение зависимостей и лишнее замыкание. И то и другое — чистые накладные расходы, если компонент никогда не был узким местом, и они заставляют следующего читателя думать об идентичности вместо поведения.\n\nПрофилировщик показывает и водопады запросов, которые стоят больше календарного времени, чем любой рендеринг. Компонент, который грузит данные в эффекте, и ребёнок, который грузит их ещё раз, дают цепочку последовательных обращений там, где параллельные запросы заняли бы время самого медленного. Прежде чем трогать код компонентов, посмотрите на вкладку сети и на колонку «почему отрисовалось»: главный выигрыш часто даёт другой порядок запросов, а не более быстрый рендер.'
      ),
      bullets: [
        L('The profiler records commits, not individual renders: one commit can contain many component renders.', 'Профилировщик записывает коммиты, а не отдельные рендеры: один коммит может содержать много рендеров компонентов.'),
        L('actualDuration is the render time, baseDuration is the same subtree without memoisation.', 'actualDuration — время рендеринга, baseDuration — то же поддерево без мемоизации.'),
        L('Memoisation adds a comparison to every update, so it is pure overhead on a cheap component.', 'Мемоизация добавляет сравнение к каждому обновлению, то есть на дешёвом компоненте это чистые накладные расходы.'),
        L('The why-did-this-render column separates prop, state, context and hook triggers.', 'Колонка «почему отрисовалось» разделяет причины: пропы, состояние, контекст и хуки.'),
        L('A waterfall of requests costs more wall-clock time than any single render.', 'Водопад запросов стоит больше календарного времени, чем любой отдельный рендер.'),
      ],
      code: `import { Profiler, useRef } from 'react';

// Counts renders so you can see which parts of the tree re-render
function RenderCount({ label, children }) {
  const count = useRef(0);
  count.current += 1;
  console.log(label, 'rendered', count.current, 'times');
  return children;
}

function onRender(id, phase, actualDuration, baseDuration) {
  // phase: "mount" | "update" | "nested-update"
  console.log(id, phase, actualDuration.toFixed(2), 'ms', 'of', baseDuration.toFixed(2));
}

export default function App() {
  return (
    <Profiler id="App" onRender={onRender}>
      <RenderCount label="Sidebar">
        <nav />
      </RenderCount>
    </Profiler>
  );
}`,
      table: {
        caption: L('What the profiler shows', 'Что показывает профилировщик'),
        headers: [L('Column', 'Колонка'), L('Meaning', 'Значение'), L('How to use it', 'Как использовать')],
        rows: [
          [
            L('Commit', 'Коммит'),
            L('One completed update of the tree', 'Одно завершённое обновление дерева'),
            L('Count commits per interaction', 'Считайте коммиты на одно действие'),
          ],
          [
            L('Duration', 'Длительность'),
            L('Time spent rendering the commit', 'Время рендеринга коммита'),
            L('Find the expensive subtree', 'Найдите дорогое поддерево'),
          ],
          [
            L('baseDuration', 'baseDuration'),
            L('The same subtree without memoisation', 'То же поддерево без мемоизации'),
            L('See what memoisation already saves', 'Оцените, что уже сэкономила мемоизация'),
          ],
          [
            L('Why did this render', 'Почему отрисовалось'),
            L('The trigger: props, state, context, hook', 'Причина: пропы, состояние, контекст, хук'),
            L('Fix the trigger, not the component', 'Чините причину, а не компонент'),
          ],
          [
            L('Ranked components', 'Ранжирование компонентов'),
            L('Every commit, sorted by cost', 'Все коммиты, отсортированные по стоимости'),
            L('Start at the top, not at the one you suspect', 'Начинайте с верхушки, а не с подозреваемого'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Development numbers are not production numbers', 'Цифры в разработке — не цифры в проде'),
          text: L(
            'Under StrictMode React renders every component twice in development, and the development build of React is noticeably slower than the production one. Use the profiler to rank components, not to predict milliseconds in production, and compare a change against the baseline recorded right before it.',
            'В StrictMode React рендерит каждый компонент дважды в режиме разработки, а отладочная сборка React заметно медленнее production-сборки. Используйте профилировщик, чтобы ранжировать компоненты, а не чтобы предсказать миллисекунды в проде, и сравнивайте изменение с замером, сделанным прямо перед ним.'
          ),
        },
      ],
      takeaway: L(
        'Profile first and change one thing: find the most expensive commit instead of the component that looks heavy.',
        'Сначала измерьте и меняйте что-то одно: ищите самый дорогой коммит, а не компонент, который выглядит тяжёлым.'
      ),
      seeAlso: [
        L('Chapter 2: the rendering model, from the tree walk to the DOM', 'Глава 2: модель рендеринга, от обхода дерева до DOM'),
        L('Section 2-3: batching and when the DOM is touched', 'Секция 2-3: пакетные обновления и когда трогается DOM'),
        L('Section 10-6: common performance traps', 'Секция 10-6: типичные ловушки производительности'),
      ],
    },
    {
      id: 'react-ch10-s2',
      title: L('memo, useMemo and useCallback', 'memo, useMemo и useCallback'),
      body: L(
        'All three caching tools exist for the same reason: to keep a value referentially stable so React can skip repeating work. useMemo caches the result of a computation, useCallback caches a function, and memo caches the rendered output of a component. None of them makes code faster by itself; each one only avoids repeating something that already works.\n\nuseMemo takes a factory and a dependency array. On every render React compares each dependency with the previous one using Object.is; if nothing changed, the cached value is returned and the factory never runs. The comparison itself is not free: it costs one comparison per dependency on every render, and the factory always runs at least once, on mount.\n\nuseCallback is exactly useMemo(() => fn, deps) with the function as the result. The two are used together for a reason: a memoised child only skips the render when its props keep the same identity, so the callback passed to it has to be stable. Memoising a value that nothing else observes, and a component that was never slow, adds bookkeeping to every update.',
        'Все три инструмента кэширования существуют по одной причине: они сохраняют ссылочную стабильность значения, чтобы React мог не повторять уже сделанную работу. useMemo кэширует результат вычисления, useCallback кэширует функцию, а memo кэширует вывод компонента. Ни один из них сам по себе не делает код быстрее — каждый лишь избавляет от повторения того, что и так работает.\n\nuseMemo принимает фабрику и массив зависимостей. При каждом рендере React сравнивает каждую зависимость с предыдущей через Object.is; если ничего не изменилось, возвращается кэшированное значение, а фабрика не запускается. Само сравнение не бесплатно: оно стоит по одной операции на зависимость при каждом рендере, а фабрика в любом случае выполняется один раз — при монтировании.\n\nuseCallback — это в точности useMemo(() => fn, deps), у которого результатом является функция. Эти два хука применяют вместе по делу: мемоизированный ребёнок пропускает рендер только тогда, когда идентичность его пропов не меняется, значит переданная ему функция должна быть стабильной. Мемоизация значения, которое больше никто не наблюдает, и компонента, который никогда не был медленным, добавляет бухгалтерию к каждому обновлению.'
      ),
      bullets: [
        L('useMemo(factory, deps) returns the cached value only when every dependency is unchanged by Object.is.', 'useMemo(factory, deps) возвращает кэшированное значение, только если ни одна зависимость не изменилась по Object.is.'),
        L('The dependency array is compared on every render, so a long list of dependencies is not free.', 'Массив зависимостей сравнивается при каждом рендере, поэтому длинный список зависимостей — не бесплатно.'),
        L('useCallback(fn, deps) is the same thing as useMemo(() => fn, deps).', 'useCallback(fn, deps) — это то же самое, что useMemo(() => fn, deps).'),
        L('An empty dependency array means the value is produced once per mount of the component.', 'Пустой массив зависимостей означает, что значение создаётся один раз за монтирование компонента.'),
        L('Memoising a value nobody else observes only adds bookkeeping.', 'Мемоизация значения, которое никто не наблюдает, добавляет только бухгалтерию.'),
      ],
      code: `import { memo, useCallback, useMemo, useState } from 'react';

const Toolbar = memo(function Toolbar({ onExport }) {
  return <button onClick={onExport}>Export</button>;
});

export function Panel({ items }) {
  const [total, setTotal] = useState(0);

  // Recomputed only when items really change
  const sum = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);

  // Stable identity keeps the memoised child from re-rendering
  const handleExport = useCallback(() => setTotal(sum), [sum]);

  return (
    <div>
      <p>Total: {sum}</p>
      <Toolbar onExport={handleExport} />
    </div>
  );
}`,
      table: {
        caption: L('Three caches with one idea', 'Три кэша с одной идеей'),
        headers: [L('Tool', 'Инструмент'), L('What it caches', 'Что кэширует'), L('What it costs', 'Что стоит')],
        rows: [
          [
            L('useMemo', 'useMemo'),
            L('The result of a computation', 'Результат вычисления'),
            L('A dependency comparison per render', 'Сравнение зависимостей при каждом рендере'),
          ],
          [
            L('useCallback', 'useCallback'),
            L('A function identity', 'Идентичность функции'),
            L('The same comparison, plus a closure', 'То же сравнение плюс замыкание'),
          ],
          [
            L('memo', 'memo'),
            L('The rendered output of a component', 'Вывод компонента'),
            L('A props comparison per parent update', 'Сравнение пропов при каждом обновлении родителя'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Memoising everything', 'Мемоизация всего подряд'),
          text: L(
            'Wrapping every component in memo and every value in useMemo produces code that looks careful and behaves worse: every update now pays for comparisons that save nothing, and a future reader has to reason about identity before changing a line. Memoise the one thing the profiler named.',
            'Если обернуть в memo каждый компонент, а в useMemo каждое значение, код будет выглядеть аккуратнее, а работать станет хуже: каждое обновление теперь платит за сравнения, которые ничего не экономят, и следующему читателю приходится думать об идентичности прежде, чем менять хоть строку. Мемоизируйте то, что назвал профилировщик.'
          ),
        },
        {
          tone: 'tip',
          title: L('Look at the dependency list first', 'Сначала посмотрите на список зависимостей'),
          text: L(
            'Before adding useMemo, check whether the dependencies are stable. If a dependency is a new object on every render, the cache never hits and the hook only adds overhead. Fixing the dependency at its source is usually cheaper than caching around it.',
            'Прежде чем добавлять useMemo, проверьте, стабильны ли зависимости. Если зависимость — новый объект при каждом рендере, кэш не срабатывает никогда, а хук добавляет только накладные расходы. Обычно дешевле починить зависимость в источнике, чем кэшировать поверх неё.'
          ),
        },
      ],
      takeaway: L(
        'Memoise only values that are expensive to produce or whose identity another hook or memoised component depends on.',
        'Мемоизируйте только те значения, которые дорого создавать или чья идентичность важна другому хуку или мемоизированному компоненту.'
      ),
      seeAlso: [
        L('Section 10-3: React.memo and prop stability', 'Секция 10-3: React.memo и стабильность пропов'),
        L('Section 5-2: the dependency array and exhaustive deps', 'Секция 5-2: массив зависимостей и exhaustive deps'),
        L('Section 4-3: functional updates and stale closures', 'Секция 4-3: функциональные обновления и устаревшие замыкания'),
      ],
    },
    {
      id: 'react-ch10-s3',
      title: L('React.memo and prop stability', 'React.memo и стабильность пропов'),
      body: L(
        'React.memo(Component) lets React skip re-rendering a component when its props are shallowly equal to the previous ones. The comparison is Object.is on every prop, so primitives compare by value while objects and functions compare by identity. That single rule explains most of the cases where a memo appears not to work: a parent that builds a new object during render produces a new identity on every render.\n\nA custom comparator receives the previous props and the next props and returns true to skip the render. The comparator becomes part of the correctness of the component: compare too little and real changes are swallowed, compare too much and the memo costs more than the render it avoided. The usual mistake is to write a comparator that treats objects as equal by a few fields while ignoring the field that actually changes.\n\nChildren are props too. A memoised wrapper renders children as part of its props, and any parent re-render that recreates those elements invalidates the memo even though nothing visible changed. Inline arrow functions and object literals in props behave the same way. When memo hurts, it is usually because the component is cheap, its children always change, or the comparator is more expensive than the render.',
        'React.memo(Component) позволяет React пропустить рендер компонента, когда его пропы поверхностно равны предыдущим. Сравнение — это Object.is по каждому пропу, поэтому примитивы сравниваются по значению, а объекты и функции — по идентичности. Одно это правило объясняет большинство случаев, когда memo «не работает»: родитель, который строит новый объект прямо во время рендера, создаёт новую идентичность при каждом рендере.\n\nКастомный компаратор получает предыдущие и следующие пропы и возвращает true, чтобы пропустить рендер. Такой компаратор становится частью корректности компонента: сравнить слишком мало — и настоящие изменения будут проглочены, сравнить слишком много — и мемоизация будет стоить дороже, чем сэкономленный рендер. Частая ошибка — компаратор, который считает объекты равными по нескольким полям, забыв про то поле, которое на самом деле меняется.\n\nДети — это тоже пропы. Мемоизированная обёртка рендерит children как часть своих пропов, и любой ререндер родителя, который пересоздаёт эти элементы, аннулирует мемоизацию, даже если видимых изменений не было. Инлайновые стрелочные функции и объектные литералы в пропсах ведут себя так же. Когда memo мешает, это обычно значит, что компонент дешёвый, его дети меняются всегда, а компаратор дороже самого рендера.'
      ),
      bullets: [
        L('React.memo compares props with Object.is, so objects and functions compare by identity.', 'React.memo сравнивает пропы через Object.is, поэтому объекты и функции сравниваются по идентичности.'),
        L('A custom comparator replaces that comparison and becomes part of the component correctness.', 'Кастомный компаратор заменяет это сравнение и становится частью корректности компонента.'),
        L('children is a prop: recreating the children elements invalidates the memo.', 'children — это проп: пересоздание дочерних элементов аннулирует мемоизацию.'),
        L('Inline objects and arrow functions in props defeat the memo of the child.', 'Инлайновые объекты и стрелочные функции в пропсах ломают мемоизацию ребёнка.'),
        L('Memoising a cheap component adds work to every parent update.', 'Мемоизация дешёвого компонента добавляет работу к каждому обновлению родителя.'),
      ],
      code: `import { memo, useCallback, useState } from 'react';

// Custom comparator: skip the render when the visible fields are unchanged
const Row = memo(
  function Row({ item, onPick }) {
    return <button onClick={() => onPick(item.id)}>{item.title}</button>;
  },
  (prev, next) =>
    prev.item.id === next.item.id && prev.item.title === next.item.title
);

export function Table({ items }) {
  const [picked, setPicked] = useState(null);

  // Stable identity keeps the memo effective
  const handlePick = useCallback((id) => setPicked(id), []);

  return items.map((item) => (
    <Row key={item.id} item={item} onPick={handlePick} />
  ));
}`,
      table: {
        caption: L('What you pass and what React compares', 'Что вы передаёте и что сравнивает React'),
        headers: [L('Prop', 'Проп'), L('Identity between renders', 'Идентичность между рендерами'), L('Memo works?', 'Memo работает?')],
        rows: [
          [
            L('A primitive value', 'Примитивное значение'),
            L('Same value', 'То же значение'),
            L('Yes', 'Да'),
          ],
          [
            L('An object literal in JSX', 'Объектный литерал в JSX'),
            L('A new object every render', 'Новый объект при каждом рендере'),
            L('No', 'Нет'),
          ],
          [
            L('An inline arrow function', 'Инлайновая стрелочная функция'),
            L('A new function every render', 'Новая функция при каждом рендере'),
            L('No', 'Нет'),
          ],
          [
            L('Elements passed as children', 'Элементы, переданные как children'),
            L('New elements every render', 'Новые элементы при каждом рендере'),
            L('No', 'Нет'),
          ],
          [
            L('A useCallback result', 'Результат useCallback'),
            L('The same function', 'Та же функция'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('children break the memo', 'children ломают мемоизацию'),
          text: L(
            'A memoised wrapper receives children as an ordinary prop. If the parent recreates those elements on every render, the identity changes and the memo never hits, even though the visible result is identical. Pass stable data down and let the wrapper build its own elements.',
            'Мемоизированная обёртка получает children как обычный проп. Если родитель пересоздаёт эти элементы при каждом рендере, идентичность меняется и memo не срабатывает, хотя видимый результат тот же. Передавайте вниз стабильные данные, а элементы пусть строит сама обёртка.'
          ),
        },
        {
          tone: 'warning',
          title: L('The comparator is your responsibility', 'За компаратор отвечаете вы'),
          text: L(
            'A custom comparator that returns true too eagerly silently drops real updates, and one that always returns false is memo without any benefit plus the cost of the comparison. When the props are a few primitives, the default shallow comparison is usually the right one.',
            'Кастомный компаратор, который слишком часто возвращает true, молча теряет настоящие обновления, а тот, что всегда возвращает false, — это memo без пользы плюс стоимость сравнения. Когда пропов немного и они примитивные, обычное поверхностное сравнение обычно и есть правильный выбор.'
          ),
        },
      ],
      takeaway: L(
        'A memo only survives while every prop keeps its identity, so fix the identity at the source instead of memoising deeper.',
        'Memo выживает, только пока каждый проп сохраняет идентичность, поэтому чините идентичность в источнике, а не мемоизируйте глубже.'
      ),
      seeAlso: [
        L('Section 10-2: memo, useMemo and useCallback', 'Секция 10-2: memo, useMemo и useCallback'),
        L('Section 7-2: provider value identity and re-renders', 'Секция 7-2: идентичность значения провайдера и ререндеры'),
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропы, children и композиция'),
      ],
    },
    {
      id: 'react-ch10-s4',
      title: L('List virtualisation and windowing', 'Виртуализация списка и скроллинг'),
      body: L(
        'Rendering ten thousand rows means ten thousand React elements, ten thousand fibers and ten thousand DOM nodes, and the DOM is where the cost lands: layout, paint and memory all scale with the number of nodes. Virtualisation renders only the rows that are visible plus a small overscan and reuses the same DOM nodes while the user scrolls, so the price of a long list becomes the price of a screenful.\n\nThe browser already offers a cheap version of this. The rule content-visibility: auto lets the browser skip layout and paint for content that is off screen, which removes most of the jank of a long page with one CSS rule and no JavaScript. It does not reduce the number of React elements, so it helps a static list and does not help a list where every row subscribes to state.\n\nLibraries such as react-window do the whole job: they compute the visible range from the scroll position and the item height, render that slice and pad it so the scrollbar keeps its true length. The price is a list model with known row heights and a library that owns scrolling. Short lists need none of this. Below a few hundred simple rows the browser copes, and a virtualisation library brings its own bugs: lost focus, broken scroll restoration, rows measured wrongly.',
        'Рендер десяти тысяч строк — это десять тысяч элементов React, десять тысяч файберов и десять тысяч узлов DOM, и стоимость приходится именно на DOM: layout, paint и память растут вместе с числом узлов. Виртуализация списка рендерит только видимые строки плюс небольшой запас и переиспользует одни и те же узлы DOM, пока пользователь скроллит, так что цена длинного списка становится ценой одного экрана.\n\nУ браузера уже есть дешёвая версия этого приёма. Правило content-visibility: auto позволяет браузеру не делать layout и paint для содержимого, которое находится за пределами экрана, и убирает большую часть дёрганья длинной страницы одним CSS-правилом без единой строки на JavaScript. Оно не уменьшает число элементов React, поэтому помогает статическому списку и не помогает списку, где каждая строка подписана на состояние.\n\nБиблиотеки вроде react-window делают всю работу целиком: они вычисляют видимый диапазон по позиции скролла и высоте строки, рендерят этот кусок и добавляют распорки, чтобы полоса прокрутки сохраняла настоящую длину. Плата — модель списка с известными высотами строк и библиотека, которой принадлежит скролл. Коротким спискам ничего из этого не нужно: браузер справляется с сотнями простых строк, а виртуализация приносит своих баги — потерянный фокус, сломанное восстановление позиции, неверно измеренные строки.'
      ),
      bullets: [
        L('Virtualisation renders the visible rows only, so the DOM size stops growing with the data.', 'Виртуализация рендерит только видимые строки, поэтому размер DOM перестаёт расти вместе с данными.'),
        L('react-window 2 exposes List with rowComponent, rowCount, rowHeight and rowProps.', 'react-window 2 предоставляет List с пропсами rowComponent, rowCount, rowHeight и rowProps.'),
        L('content-visibility: auto skips layout and paint off screen with no JavaScript.', 'content-visibility: auto пропускает layout и paint за пределами экрана вообще без JavaScript.'),
        L('A virtualised list needs a known row height, or the library must measure the rows itself.', 'Виртуализированному списку нужна известная высота строки, иначе библиотека измеряет строки сама.'),
        L('Short lists do not need virtualisation: the complexity costs more than the jank it removes.', 'Коротким спискам виртуализация не нужна: сложность обходится дороже, чем снимаемое дёрганье.'),
      ],
      code: `import { List } from 'react-window';

function Row({ index, style, items }) {
  return <div style={style} className="row">{items[index].title}</div>;
}

export function Results({ items }) {
  return (
    <List
      rowComponent={Row}
      rowCount={items.length}
      rowHeight={56}
      rowProps={{ items }}
      overscanCount={4}
    />
  );
}

// Plain CSS alternative for a simple scrolling page:
// .long-list li { content-visibility: auto; contain-intrinsic-size: 0 56px; }`,
      table: {
        caption: L('Three ways to handle a long list', 'Три способа справиться с длинным списком'),
        headers: [L('Approach', 'Подход'), L('What it fixes', 'Что исправляет'), L('What it costs', 'Что стоит')],
        rows: [
          [
            L('content-visibility: auto', 'content-visibility: auto'),
            L('Layout and paint off screen', 'Layout и paint за пределами экрана'),
            L('One CSS rule, no JavaScript', 'Одно CSS-правило, без JavaScript'),
          ],
          [
            L('A virtualisation library', 'Библиотека виртуализации'),
            L('The number of DOM nodes and elements', 'Число узлов DOM и элементов'),
            L('A list model with fixed row heights', 'Модель списка с фиксированными высотами'),
          ],
          [
            L('Pagination or load more', 'Пагинация или «показать ещё»'),
            L('The amount of data per screen', 'Количество данных на экране'),
            L('Navigation and lost context', 'Навигация и потеря контекста'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Rows that do not exist are rows nobody can find', 'Строк, которых нет, не найти вовсе'),
          text: L(
            'A virtualised row is not in the DOM, so browser find-in-page cannot see it and a screen reader only announces the rendered slice. Search, selection and accessibility all have to be designed around the fact that most of the list is not there.',
            'Виртуализированной строки нет в DOM, поэтому поиск по странице в браузере её не видит, а скринридер объявляет только отрисованный кусок. Поиск, выделение и доступность приходится проектировать с учётом того, что большей части списка физически нет.'
          ),
        },
        {
          tone: 'tip',
          title: L('Check the profiler first', 'Сначала проверьте профилировщик'),
          text: L(
            'Virtualisation is a real change to the rendering model of the page. Look for a list that actually costs time in the profiler, and remember that the cost of a slow list is usually the DOM, not the React elements.',
            'Виртуализация — это серьёзное изменение модели рендеринга страницы. Найдите в профилировщике список, который действительно стоит времени, и помните: медленный список обычно стоит на DOM, а не на элементах React.'
          ),
        },
      ],
      takeaway: L(
        'Virtualise only when the profiler shows the list is the cost, and remember that unrendered rows are invisible to find-in-page.',
        'Виртуализируйте, только когда профилировщик показывает, что стоит именно список, и помните: неотрисованных строк нет и для поиска по странице.'
      ),
      seeAlso: [
        L('Section 10-1: measuring before optimising', 'Секция 10-1: сначала измерить, потом оптимизировать'),
        L('Section 1-3: keys and list rendering', 'Секция 1-3: ключи и рендер списков'),
        L('Section 10-6: common performance traps', 'Секция 10-6: типичные ловушки производительности'),
      ],
    },
    {
      id: 'react-ch10-s5',
      title: L('Code splitting, lazy and Suspense', 'Разделение кода, ленивая загрузка и Suspense'),
      body: L(
        'A bundle is the JavaScript the browser must download, parse and execute before the app is usable. Splitting it means moving the code the first screen does not need into separate chunks that load on demand. A router already splits at route boundaries, and that split exists only if each route is imported lazily rather than eagerly.\n\nReact.lazy turns a dynamic import into a component. The line const Settings = lazy(() => import("./Settings")) creates a component that suspends until its chunk arrives, and a lazy component must be rendered inside a Suspense boundary, because until the chunk is there React has nothing to show. Without the boundary the render throws and the nearest error boundary takes the whole page down.\n\nThe fallback is what the user sees while the chunk downloads, so it should be small and shaped like the content it replaces. Prefetching removes the wait before the click: start the import on hover or on focus and the chunk is usually already there by the time the navigation happens.\n\nAnalyse the bundle before splitting it. A build report or a source map explorer shows which modules dominate the size, and splitting a forty kilobyte page while a nine hundred kilobyte vendor chunk stays whole changes nothing. Split at route boundaries first, then at heavy widgets, then look at the numbers again.',
        'Бандл — это тот JavaScript, который браузер должен скачать, разобрать и выполнить, прежде чем приложение станет рабочим. Разделение кода означает перенос того, что первому экрану не нужно, в отдельные чанки, которые грузятся по требованию. Роутер уже делит код по границам маршрутов, и это деление существует только тогда, когда каждый маршрут импортируется лениво, а не целиком.\n\nReact.lazy превращает динамический импорт в компонент. Строка const Settings = lazy(() => import("./Settings")) создаёт компонент, который подвешивает рендер до загрузки чанка, и ленивый компонент обязан находиться внутри границы Suspense: пока чанка нет, React нечего показать. Без границы рендер бросает исключение, и ближайшая граница ошибок уронит всю страницу.\n\nFallback — это то, что пользователь видит во время загрузки чанка, поэтому он должен быть маленьким и повторять форму заменяемого содержимого. Предзагрузка убирает ожидание перед кликом: начать импорт на наведении или на фокусе, и к моменту перехода чанк обычно уже на месте.\n\nАнализируйте бандл до того, как делить его. Отчёт сборки или просмотр исходных карт показывают, какие модули съедают объём, и разделение страницы в сорок килобайт при целом вендорном чанке в девятьсот килобайт меняет ровно ничего. Сначала делите по границам маршрутов, потом по тяжёлым виджетам, потом снова смотрите на цифры.'
      ),
      bullets: [
        L('A bundle is everything the browser must parse before the app works, so split it at route boundaries first.', 'Бандл — это всё, что браузер обязан разобрать до работы приложения, поэтому сначала делите по границам маршрутов.'),
        L('React.lazy wraps a dynamic import and suspends until the chunk arrives.', 'React.lazy оборачивает динамический импорт и подвешивает рендер до прихода чанка.'),
        L('A lazy component without a Suspense boundary above it throws during render.', 'Ленивый компонент без границы Suspense над ним бросает исключение во время рендера.'),
        L('Prefetching on hover or focus removes the wait before the navigation happens.', 'Предзагрузка при наведении или фокусе убирает ожидание перед переходом.'),
        L('Splitting a small page while a huge vendor chunk stays whole changes nothing.', 'Разделение маленькой страницы при целом вендорном чанке меняет ровно ничего.'),
      ],
      code: `import { lazy, Suspense } from 'react';

const dashboardChunk = import('./Dashboard');
const editorChunk = import('./Editor');

const Dashboard = lazy(() => dashboardChunk);
const Editor = lazy(() => editorChunk); // the editor route renders it

// Prefetch on intent: the chunk is ready before the click
function preloadEditor() {
  return editorChunk;
}

export function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard />
      <a href="/editor" onMouseEnter={preloadEditor} onFocus={preloadEditor}>
        Open the editor
      </a>
    </Suspense>
  );
}`,
      table: {
        caption: L('The pieces of code splitting', 'Составные части разделения кода'),
        headers: [L('Tool', 'Инструмент'), L('What it does', 'Что делает'), L('Note', 'Замечание')],
        rows: [
          [
            L('Dynamic import', 'Динамический импорт'),
            L('Loads a module on demand', 'Грузит модуль по требованию'),
            L('Returns a promise, not a module', 'Возвращает промис, а не модуль'),
          ],
          [
            L('React.lazy', 'React.lazy'),
            L('Turns that promise into a component', 'Превращает промис в компонент'),
            L('Needs a Suspense boundary above', 'Нужна граница Suspense над ним'),
          ],
          [
            L('Suspense', 'Suspense'),
            L('Shows a fallback while it loads', 'Показывает fallback, пока грузится'),
            L('Also covers data fetching', 'Покрывает и загрузку данных'),
          ],
          [
            L('Prefetch on intent', 'Предзагрузка по намерению'),
            L('Starts the import early', 'Начинает импорт заранее'),
            L('Removes the wait on click', 'Убирает ожидание по клику'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('lazy without Suspense', 'lazy без Suspense'),
          text: L(
            'A lazy component rendered without a Suspense boundary above it throws during the render, and the nearest error boundary replaces the page with its error state. The boundary is not optional decoration: it is what React renders while the chunk is on its way.',
            'Ленивый компонент без границы Suspense над ним бросает исключение во время рендера, и ближайшая граница ошибок заменяет страницу своим состоянием ошибки. Граница — не украшение: именно её React рисует, пока чанк в пути.'
          ),
        },
        {
          tone: 'tip',
          title: L('Look at the bundle report', 'Посмотрите отчёт по бандлу'),
          text: L(
            'A source map explorer shows which modules dominate the download. Split the biggest ones first and re-measure after each split: the number that matters is the size of the first chunk the browser downloads, not the total size of the repository.',
            'Просмотр исходных карт показывает, какие модули съедают объём загрузки. Сначала делите самые крупные и перемеряйте после каждого шага: важна размер первого чанка, который скачает браузер, а не общий размер репозитория.'
          ),
        },
      ],
      takeaway: L(
        'Split at route boundaries, wrap every lazy component in Suspense, and check the bundle report after each split.',
        'Делите по границам маршрутов, оборачивайте каждый ленивый компонент в Suspense и проверяйте отчёт по бандлу после каждого разделения.'
      ),
      seeAlso: [
        L('Section 11-3: Suspense and error boundaries', 'Секция 11-3: Suspense и границы ошибок'),
        L('Section 2-5: concurrent rendering and transitions', 'Секция 2-5: конкурентный рендеринг и переходы'),
        L('Section 10-1: measuring before optimising', 'Секция 10-1: сначала измерить, потом оптимизировать'),
      ],
    },
    {
      id: 'react-ch10-s6',
      title: L('Common performance traps', 'Типичные ловушки производительности'),
      body: L(
        'The same mistakes show up in every slow React application. A context provider that builds a new value object on every render re-renders every consumer, however deep in the tree it sits. Inline objects and arrow functions in props break the memo of the child that receives them. A long list rendered at once makes scrolling stutter.\n\nTwo more traps are about placement. State kept too high in the tree re-renders siblings that do not use it, and requests fired one after another create a waterfall of round trips where Promise.all would take as long as the slowest single request. The fix for all of them is the same: keep state close to the component that uses it, keep the identity of the values you pass stable, and start independent requests at the same time.\n\nThe trap that hides best is a render loop: an effect that writes to state and also depends on that state, so the effect runs again and again. React warns about it, and the fix is usually to derive the value during render instead of storing it in state. Measure first: a component that re-renders but costs two milliseconds is not your problem.',
        'Одни и те же ошибки встречаются в каждом медленном React-приложении. Провайдер контекста, который собирает новый объект значения при каждом рендере, перерендеривает всех потребителей, на какой бы глубине дерева они ни находились. Инлайновые объекты и стрелочные функции в пропсах ломают мемоизацию ребёнка, который их получает. Длинный список, отрисованный целиком, заставляет скролл дёргаться.\n\nЕщё две ловушки — про размещение. Состояние, поднятое слишком высоко по дереву, перерендеривает соседей, которые его не читают, а запросы, запущенные один за другим, создают водопад обращений там, где Promise.all занял бы время самого медленного запроса. Лечение у всех одно: держите состояние рядом с компонентом, который его использует, сохраняйте идентичность передаваемых значений и запускайте независимые запросы одновременно.\n\nЛовушка, которую хуже всего заметить, — цикл рендера: эффект пишет в состояние и одновременно зависит от него, поэтому эффект выполняется снова и снова. React пишет об этом предупреждение, и лечится обычно одно: вычислять значение прямо во время рендера вместо хранения в состоянии. И сначала измерьте: компонент, который перерендеривается, но стоит две миллисекунды, вашей проблемой не является.'
      ),
      bullets: [
        L('A context value built inline re-renders every consumer of that context.', 'Значение контекста, собранное на месте, перерендеривает всех потребителей этого контекста.'),
        L('State placed too high re-renders siblings that never read it.', 'Состояние, поднятое слишком высоко, перерендеривает соседей, которые его не читают.'),
        L('Inline objects and functions in props defeat the memo of the child.', 'Инлайновые объекты и функции в пропсах ломают мемоизацию ребёнка.'),
        L('Sequential requests create a waterfall, Promise.all makes them parallel.', 'Последовательные запросы создают водопад, Promise.all делает их параллельными.'),
        L('An effect that writes the state it depends on is a render loop.', 'Эффект, пишущий в состояние, от которого зависит, — это цикл рендера.'),
        L('A component that re-renders but costs two milliseconds is not worth optimising.', 'Компонент, который перерендеривается, но стоит две миллисекунды, оптимизировать не стоит.'),
      ],
      code: `import { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Anti-pattern: a new object every render re-renders every consumer
  // const unstable = { theme, setTheme };

  // Memoised: consumers re-render only when the theme really changes
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}`,
      table: {
        caption: L('Traps, symptoms and fixes', 'Ловушки, симптомы и лечение'),
        headers: [L('Trap', 'Ловушка'), L('Symptom', 'Симптом'), L('Fix', 'Лечение')],
        rows: [
          [
            L('Context value recreated', 'Значение контекста пересоздаётся'),
            L('The whole subtree re-renders', 'Перерендеривается всё поддерево'),
            L('Memoise the value or split contexts', 'Мемоизируйте значение или разделите контексты'),
          ],
          [
            L('State too high in the tree', 'Состояние слишком высоко'),
            L('Unrelated siblings re-render', 'Перерендериваются несвязанные соседи'),
            L('Colocate the state', 'Опустите состояние ближе к использованию'),
          ],
          [
            L('Inline object or function in props', 'Инлайновый объект или функция в пропсах'),
            L('The memo never hits', 'Memo не срабатывает'),
            L('Hoist it or wrap it in useCallback', 'Вынесите наружу или оберните в useCallback'),
          ],
          [
            L('A long list rendered at once', 'Длинный список отрисован целиком'),
            L('Scrolling stutters', 'Скролл дёргается'),
            L('Virtualise the list', 'Виртуализируйте список'),
          ],
          [
            L('Requests fired in a chain', 'Запросы идут цепочкой'),
            L('Seconds of waiting', 'Секунды ожидания'),
            L('Start them in parallel', 'Запускайте их параллельно'),
          ],
          [
            L('An effect writes the state it depends on', 'Эффект пишет в состояние, от которого зависит'),
            L('A render loop', 'Цикл рендера'),
            L('Derive the value during render', 'Вычисляйте значение во время рендера'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The render loop', 'Цикл рендера'),
          text: L(
            'An effect that stores a value in state and also depends on that state re-runs on every commit, and each run schedules another update. React warns about it in development. The fix is almost always to compute the value during render instead of mirroring it into state.',
            'Эффект, который кладёт значение в состояние и одновременно зависит от этого состояния, выполняется на каждом коммите, и каждое выполнение планирует новое обновление. React предупреждает об этом в разработке. Лечится почти всегда одно: вычислять значение во время рендера, а не дублировать его в состояние.'
          ),
        },
        {
          tone: 'tip',
          title: L('Split contexts by update frequency', 'Делите контексты по частоте обновлений'),
          text: L(
            'One context for the theme and one for the current user means a theme change re-renders only the components that read the theme. A single context holding both makes every consumer pay for every change, which is the same defect as an unmemoised value with a longer name.',
            'Один контекст для темы и другой для текущего пользователя означают, что смена темы перерендеривает только читателей темы. Единый контекст на оба значения заставляет каждого потребителя платить за каждое изменение — это тот же дефект, что и немемоизированное значение, только под длинным именем.'
          ),
        },
      ],
      takeaway: L(
        'Most performance bugs are state in the wrong place and unstable identities, so fix those before adding memo.',
        'Большинство проблем с производительностью — это состояние не там и нестабильные идентичности, поэтому чините их до того, как добавлять memo.'
      ),
      seeAlso: [
        L('Section 7-3: splitting contexts by update frequency', 'Секция 7-3: деление контекстов по частоте обновлений'),
        L('Section 5-6: common effect mistakes', 'Секция 5-6: типичные ошибки в эффектах'),
        L('Section 4-6: colocation and normalised state', 'Секция 4-6: колокация и нормализация состояния'),
      ],
    },
  ],
};
