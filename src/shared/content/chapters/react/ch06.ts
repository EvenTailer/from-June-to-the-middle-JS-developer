import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh06: Chapter = {
  id: 'react-ch6',
  title: L('Refs and the DOM', 'Ссылки и DOM'),
  summary: L(
    'What a ref really is, why writing to ref.current never re-renders, how to read and change DOM nodes, how a ref reaches a child component, and when an imperative handle is the right last resort.',
    'Что такое ссылка на самом деле, почему запись в ref.current никогда не вызывает перерендер, как читать и менять DOM-узлы, как ссылка доходит до дочернего компонента и когда императивный handle — правильное последнее средство.'
  ),
  sections: [
    {
      id: 'react-ch6-s1',
      title: L('useRef for values and for DOM nodes', 'useRef для значений и для DOM-узлов'),
      body: L(
        'A ref is a mutable box that React keeps for the whole life of the component. useRef(initialValue) returns an object with one property, current, and the value inside that box survives every re-render: the same object comes back on the next render, with whatever was written into it still there. The contract is asymmetric on purpose. setState replaces state and schedules a render, while ref.current = value changes the box silently and React re-renders nothing.\n\nThe silence is the whole point of the distinction. State is for values that the UI has to show; a ref is for values that the UI must not show. A timeout id, the previous value of a prop, a flag telling an async callback that the component has unmounted, a handle to an imperative third-party widget: none of these belong in the render output, and putting any of them in state causes render loops that are hard to trace.\n\nA ref also survives unmount in a specific sense: the object is not recreated, but React sets current back to null when the component is removed, so a stale ref is a real possibility for code that outlives the component. The common mistake is to assume a ref is a snapshot. It is not: after a re-render, ref.current holds the newest value you wrote, and reading it inside a stale closure gives you the newest value too, not the one from the render the closure was created in.\n\nChoosing between a ref and state comes down to one question: does a change to this value have to produce new pixels on screen? If yes, it is state and the render must follow it. If no, it is a ref and nothing should re-render. If you are not sure, ask what would break if the component re-rendered a hundred times a second: whatever would break belongs in a ref.',
        'Ссылка — это мутабельный объект, который React хранит всё время жизни компонента. useRef(initialValue) возвращает объект с единственным свойством current, и значение внутри этой коробки переживает любой перерендер: при следующем рендере возвращается тот же самый объект, и записанное в него значение на месте. Контракт намеренно асимметричен. setState заменяет состояние и планирует рендер, а ref.current = value меняет коробку молча, и React не перерисовывает ничего.\n\nИменно в этом молчании и состоит весь смысл разграничения. Состояние — для значений, которые интерфейс должен показать; ссылка — для значений, которые он показывать не должен. Идентификатор таймера, предыдущее значение пропса, флаг, сообщающий асинхронному колбэку, что компонент размонтирован, ссылка на императивный виджет из сторонней библиотеки: ничто из этого не принадлежит выводу рендера, а помещение любого из этих значений в состояние порождает циклы рендера, которые непросто отследить.\n\nУ ссылки есть ещё одна особенность: при размонтировании React сбрасывает current в null, поэтому «протухшая» ссылка — вполне реальная ситуация для кода, который живёт дольше компонента. Частая ошибка — считать ссылку снимком. Это не так: после перерендера ref.current содержит последнее записанное значение, и чтение ссылки внутри устаревшего замыкания даст тоже последнее значение, а не то, что было на рендере, когда замыкание создалось.\n\nВыбор между ссылкой и состоянием сводится к одному вопросу: обязательно ли изменение этого значения должно привести к новым пикселям на экране? Если да, это состояние, и рендер обязан за ним последовать. Если нет, это ссылка, и перерисовывать ничего не нужно. Если сомневаетесь, спросите, что сломается, если компонент будет перерисовываться сто раз в секунду: всё, что сломается, должно жить в ссылке.'
      ),
      bullets: [
        L('useRef returns one object that keeps its identity across renders.', 'useRef возвращает один объект, сохраняющий идентичность между рендерами.'),
        L('Writing to ref.current never schedules a re-render.', 'Запись в ref.current никогда не планирует перерендер.'),
        L('State drives the output, a ref carries what the output does not show.', 'Состояние управляет выводом, ссылка несёт то, что вывод не показывает.'),
        L('React resets current to null when the component unmounts.', 'React сбрасывает current в null при размонтировании компонента.'),
        L('A ref is not a snapshot: reading it later gives the newest written value.', 'Ссылка — не снимок: чтение позже даёт последнее записанное значение.'),
        L('The initial value of useRef is used on the first render only.', 'Начальное значение useRef используется только при первом рендере.'),
      ],
      code: `import { useEffect, useRef, useState } from 'react';

function Timer() {
  const idRef = useRef(null);          // one box, the same object every render
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    idRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(idRef.current);
  }, []);

  const stop = () => {
    clearInterval(idRef.current);      // a ref write: nothing re-renders
    idRef.current = null;
  };

  return <button onClick={stop}>stop after {seconds}s</button>;
}`,
      table: {
        caption: L('State or ref: what the difference is really about', 'Состояние или ссылка: в чём настоящая разница'),
        headers: [L('Aspect', 'Аспект'), L('useState', 'useState'), L('useRef', 'useRef')],
        rows: [
          [L('Triggers a re-render', 'Вызывает перерендер'), L('Yes, on every set', 'Да, при каждом set'), L('No, never', 'Нет, никогда')],
          [L('Identity across renders', 'Идентичность между рендерами'), L('A new value every render', 'Новое значение каждый рендер'), L('Always the same object', 'Всегда тот же объект')],
          [L('Write API', 'API записи'), L('setState(value)', 'setState(value)'), L('ref.current = value', 'ref.current = value')],
          [L('On unmount', 'При размонтировании'), L('State is dropped', 'Состояние теряется'), L('current becomes null', 'current становится null')],
          [L('Typical use', 'Типичное применение'), L('Counters, form values, UI flags', 'Счётчики, значения формы, флаги интерфейса'), L('Timers, DOM nodes, previous values', 'Таймеры, DOM-узлы, предыдущие значения')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A ref is not a snapshot', 'Ссылка — не снимок'),
          text: L(
            'Closures capture variables, and ref.current is a property of an object, not a captured value. A callback created during an old render still sees the newest contents of the box, which is why a ref inside a stale closure is not the value from that render.',
            'Замыкания захватывают переменные, а ref.current — это свойство объекта, а не захваченное значение. Колбэк, созданный на старом рендере, всё равно видит самое свежее содержимое коробки, поэтому ref внутри устаревшего замыкания — это не то значение, которое было на том рендере.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep DOM writes out of render', 'Держите записи в DOM вне рендера'),
          text: L(
            'Reading a ref during render is allowed only for values that never affect the output. Writing to it during render is a bug: React may render the same component twice, and the second pass would start from a different box than the first.',
            'Чтение ссылки во время рендера допустимо только для значений, которые не влияют на вывод. Запись во время рендера — это баг: React может отрендерить компонент дважды, и второй проход начнётся с уже изменённой коробки.'
          ),
        },
      ],
      takeaway: L(
        'State is for values the screen shows; a ref is for values it must not show.',
        'Состояние — для значений, которые видит экран; ссылка — для тех, которые он видеть не должен.'
      ),
      seeAlso: [
        L('Chapter 4: state, snapshots and derived values', 'Глава 4: состояние, снимки и производные значения'),
        L('Section 5-3: cleanup and stale closures', 'Секция 5-3: очистка и устаревшие замыкания'),
      ],
    },
    {
      id: 'react-ch6-s2',
      title: L('Reading and writing the DOM', 'Чтение и запись в DOM'),
      body: L(
        'A DOM ref is the most common kind of ref, and it is the one place where React hands you the browser itself. When you attach a ref to a host element, React sets current to the real node after the commit phase, which means the node exists but the render function has already returned. Reading it during render therefore gives null, and code that assumes otherwise fails on the first pass and works on later renders, which is the most confusing bug shape in this whole area.\n\nThe operations that justify a DOM ref are the ones React has no model for: moving focus, restoring the scroll position, placing the caret inside a text field, reading the measured size of an element, driving a video element or a canvas. React describes what the screen should look like, while these operations concern the browser state behind the screen, and pushing them through state would mean re-rendering to express something that is not a visual change.\n\nMeasurement is where the timing matters. Calling getBoundingClientRect inside a layout effect runs after React has written the DOM but before the browser paints, so the size you read is the size the user will see and your correction lands in the same frame. The same work in a passive effect lets a frame with the wrong layout go out first, which shows up as a visible jump. For sizes that change without a re-render, ResizeObserver is the right tool instead of a window resize listener.\n\nWrites are more dangerous than reads. Assigning to node.style or node.textContent from an effect fights the declarative model: the next render overwrites what you wrote, and you spend an afternoon chasing a value that keeps reverting. Use the DOM when the browser owns the state, and reach for it through an effect with a cleanup that puts the DOM back the way you found it.',
        'Ссылка на DOM-узел — самый частый вид ссылки, и именно здесь React отдаёт вам сам браузер. Когда вы вешаете ref на DOM-элемент, React проставляет current настоящим узлом после фазы commit: узел уже существует, но функция рендера к этому моменту вернулась. Поэтому чтение ссылки во время рендера даёт null, и код, который рассчитывает на узел, спотыкается на первом проходе и работает на следующих — это самая запутанная форма бага во всей теме.\n\nЗадачи, ради которых DOM-ссылка оправдана, — те, у которых нет модели в React: перевод фокуса, восстановление позиции прокрутки, установка каретки в текстовом поле, измерение размера элемента, управление видео или canvas. React описывает, как должен выглядеть экран, а эти операции касаются состояния браузера за экраном, и протаскивать их через состояние значило бы перерисовывать интерфейс ради того, что визуальным изменением не является.\n\nИзмерения — вот где важна timing. Вызов getBoundingClientRect в layout-эффекте выполняется после того, как React записал DOM, но до отрисовки, поэтому прочитанный размер совпадает с тем, что увидит пользователь, и поправка попадает в тот же кадр. Та же работа в обычном эффекте выпускает кадр с неверной разметкой наружу, и это видно как скачок. Для размеров, меняющихся без перерендера, правильный инструмент — ResizeObserver, а не слушатель resize на окне.\n\nЗаписи опаснее чтений. Присваивание в node.style или node.textContent из эффекта борется с декларативной моделью: следующий рендер перезапишет написанное, и вы потратите день на значение, которое постоянно возвращается назад. Пользуйтесь DOM там, где состоянием владеет браузер, и обращайтесь к нему через эффект с очисткой, которая возвращает DOM в исходное состояние.'
      ),
      bullets: [
        L('A host element ref is filled in after the commit, not during render.', 'Ссылка на DOM-узел заполняется после commit, а не во время рендера.'),
        L('Reading ref.current during the first render gives null.', 'Чтение ref.current при первом рендере даёт null.'),
        L('Focus, scroll, caret and measurement are the legitimate DOM ref jobs.', 'Фокус, скролл, каретка и измерение — законные задачи DOM-ссылки.'),
        L('Measure in a layout effect to avoid a frame with the wrong layout.', 'Измеряйте в layout-эффекте, чтобы не выпустить кадр с неверной разметкой.'),
        L('ResizeObserver beats a window resize listener for element sizes.', 'Для размеров элементов лучше ResizeObserver, чем слушатель resize.'),
        L('Direct DOM writes are overwritten by the next render.', 'Прямые записи в DOM перезаписываются следующим рендером.'),
      ],
      code: `function Panel({ resultsRef }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();            // the node exists after the commit
  }, []);

  const reveal = () => {
    const node = resultsRef.current;
    const { height } = node.getBoundingClientRect();   // read the layout
    console.log('results height', height);
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <input ref={inputRef} type="search" placeholder="Search" />
      <button onClick={reveal}>Show results</button>
    </>
  );
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The first render has no node', 'На первом рендере узла ещё нет'),
          text: L(
            'A ref is filled in after the commit, so code that reads it during render sees null on the first pass and a node on every later pass. Read and write nodes in effects and in event handlers, never in the body of the component.',
            'Ссылка заполняется после commit, поэтому код, читающий её во время рендера, увидит null на первом проходе и узел на всех следующих. Читайте и меняйте узлы в эффектах и обработчиках, а не в теле компонента.'
          ),
        },
        {
          tone: 'tip',
          title: L('Put the DOM back in the cleanup', 'Возвращайте DOM в очистке'),
          text: L(
            'Every DOM write your effect performs should have a matching undo in the cleanup function: restore the scroll position, remove the listener, clear the inline style. An effect that leaves the DOM in a different state is a leak that only shows up on the next mount.',
            'Каждой записи в DOM, которую делает эффект, должно соответствовать отменяющее действие в функции очистки: вернуть позицию прокрутки, снять слушатель, убрать инлайновый стиль. Эффект, оставляющий DOM в изменённом состоянии, — это утечка, которая всплывает только при следующем монтировании.'
          ),
        },
      ],
      takeaway: L(
        'Use a DOM ref for what the browser owns: focus, scroll, caret and measurements, never for what the screen should show.',
        'Используйте DOM-ссылку для того, что принадлежит браузеру: фокус, скролл, каретка и измерения, и никогда для того, что должно показывать экран.'
      ),
      seeAlso: [
        L('Section 5-4: useLayoutEffect versus useEffect', 'Секция 5-4: useLayoutEffect против useEffect'),
        L('js-core, Chapter 14: the DOM and browser APIs', 'js-core, Глава 14: DOM и браузерные API'),
      ],
    },
    {
      id: 'react-ch6-s3',
      title: L('Forwarding refs', 'Передача ссылок вниз'),
      body: L(
        'A ref attached to a custom component does not reach the DOM inside it. React attaches refs to host elements, and a function component is not a host element, so passing a ref to one used to produce a warning and a ref that stayed empty. forwardRef exists to bridge that gap: it wraps the component so the ref arrives as a second argument, and the component can attach it to whatever node it wants.\n\nReact 19 changes the shape of this. A function component may now take ref as an ordinary prop, so <Input ref={ref} /> simply works, and the special forwarding path is only needed for class components and for libraries that must keep supporting older React versions. The React team has said that forwardRef will be deprecated eventually, so new code should accept the ref as a prop and keep forwardRef only where compatibility demands it.\n\nThe reason ref was never an ordinary prop is mechanical. Before React 19 the element had a separate ref field, and React pulled it out of props before calling the component, so a component could not read it and a spread could not forward it. That design created two channels for the same data, and React 19 merged them into one.\n\nForwarding a ref is not the same as sharing state. The parent keeps ownership of the node and the child only lends its markup to it. If the child must tell the parent something about the node, a callback prop is the better channel, because a raw node handed to a parent is an invitation to mutate markup that React believes it owns.',
        'Ссылка, повешенная на пользовательский компонент, не доходит до DOM внутри него. React вешает ссылки на DOM-элементы, а функциональный компонент — не DOM-элемент, поэтому передача ссылки в него раньше давала предупреждение и пустую ссылку. forwardRef существует именно ради этого разрыва: он оборачивает компонент так, что ссылка приходит вторым аргументом, и компонент может прикрепить её к любому нужному узлу.\n\nReact 19 меняет форму этого механизма. Функциональный компонент теперь может принимать ref как обычный проп, поэтому <Input ref={ref} /> просто работает, а отдельный путь пересылки нужен только для классовых компонентов и для библиотек, которые обязаны поддерживать старые версии React. Команда React заявляла, что forwardRef со временем устареет, поэтому новый код должен принимать ссылку как проп, а forwardRef оставлять только там, где нужна совместимость.\n\nПричина, по которой ссылка долго не была обычным пропом, механическая. До React 19 у элемента было отдельное поле ref, и React извлекал его из props до вызова компонента, поэтому компонент не мог его прочитать, а spread не мог его переслать. Такая конструкция заводила два канала для одних и тех же данных, и React 19 объединил их в один.\n\nПередача ссылки вниз — не то же самое, что общее состояние. Родитель сохраняет владение узлом, а ребёнок лишь предоставляет ему свою разметку. Если ребёнку нужно сообщить родителю что-то об узле, лучший канал — колбэк-проп: сырой узел в руках родителя приглашение мутировать разметку, которой, по мнению React, владеет он сам.'
      ),
      bullets: [
        L('A ref on a function component does not reach the DOM by itself.', 'Ссылка на функциональный компонент сама по себе не доходит до DOM.'),
        L('React 19 lets a function component accept ref as a regular prop.', 'В React 19 функциональный компонент может принять ref как обычный проп.'),
        L('forwardRef stays useful for class components and older React versions.', 'forwardRef остаётся нужным для классовых компонентов и старых версий React.'),
        L('A ref callback may return a cleanup function in React 19.', 'В React 19 колбэк-ссылка может возвращать функцию очистки.'),
        L('Forwarding a node is not the same as sharing it with the parent.', 'Передать узел вниз — не то же самое, что поделиться им с родителем.'),
        L('A callback prop communicates better than a raw node.', 'Колбэк-проп сообщает лучше, чем сырой узел.'),
      ],
      code: `// React 19: ref is a regular prop of a function component
function TextInput({ ref, label }) {
  return (
    <label>
      {label}
      <input ref={ref} type="text" />
    </label>
  );
}

function Form() {
  const inputRef = useRef(null);

  return (
    <>
      <TextInput ref={inputRef} label="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus the field</button>
    </>
  );
}`,
      table: {
        caption: L('Passing a ref down', 'Передача ссылки вниз'),
        headers: [L('Aspect', 'Аспект'), L('React 18 and earlier', 'React 18 и раньше'), L('React 19', 'React 19')],
        rows: [
          [L('Function component receives the ref', 'Функциональный компонент получает ссылку'), L('Only through forwardRef', 'Только через forwardRef'), L('As a regular prop', 'Как обычный проп')],
          [L('Class component', 'Классный компонент'), L('forwardRef wrapper', 'Обёртка forwardRef'), L('forwardRef wrapper', 'Обёртка forwardRef')],
          [L('A library supporting both versions', 'Библиотека, поддерживающая обе версии'), L('forwardRef', 'forwardRef'), L('forwardRef', 'forwardRef')],
          [L('Ref callback cleanup', 'Очистка в колбэке ссылки'), L('Not supported', 'Не поддерживается'), L('Return a cleanup function', 'Вернуть функцию очистки')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('How forwardRef looks', 'Как выглядит forwardRef'),
          text: L(
            'The wrapper takes a render function with two parameters: the props and the forwarded ref. The ref then has to be attached to a real node inside, otherwise the parent receives null.',
            'Обёртка принимает функцию рендера с двумя параметрами: пропсы и перенаправленную ссылку. Ссылку затем нужно прикрепить к настоящему узлу внутри, иначе родитель получит null.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The ref lost in a spread', 'Ссылка, потерянная в spread'),
          text: L(
            'Spreading props does not attach a ref to the DOM node: in React 18 and earlier the ref never reaches the props at all, and in React 19 a ref inside a spread arrives at a function component as an ordinary prop value rather than being applied to the node. Attach the ref explicitly.',
            'Spread пропсов не прикрепляет ссылку к DOM-узлу: в React 18 и раньше ссылка вообще не доходит до пропсов, а в React 19 ссылка внутри spread приходит в функциональный компонент как обычное значение пропа, а не как прикрепление к узлу. Прикрепляйте ссылку явно.'
          ),
        },
      ],
      takeaway: L(
        'A ref reaches a child only when the child accepts it: in React 19 as a prop, before that through forwardRef.',
        'Ссылка доходит до дочернего компонента, только если он её принимает: в React 19 как проп, раньше — через forwardRef.'
      ),
      seeAlso: [
        L('Section 6-4: useImperativeHandle as the last resort', 'Секция 6-4: useImperativeHandle как последнее средство'),
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропсы, потомки и композиция'),
      ],
    },
    {
      id: 'react-ch6-s4',
      title: L('useImperativeHandle', 'useImperativeHandle'),
      body: L(
        'useImperativeHandle lets a component decide what a parent is allowed to do with it. The hook runs during the layout phase, after the DOM has been committed, and it replaces whatever the parent would otherwise receive through the ref. Whatever you return becomes the ref value: a small object with a couple of methods and nothing else. The parent can call those methods and cannot touch what you did not expose.\n\nThe temptation is to use the hook as a general escape hatch, and that is where it goes wrong. A component that exposes setValue, getValue, renderRow and focus ends up with two sources of truth: the props that render it and the imperative calls that quietly change it. The next render overwrites whatever the parent poked in, and the mismatch shows up as a field that resets itself for no visible reason.\n\nThe honest use case is a component that wraps something React cannot describe, and even there the API should be as small as possible. A media player that exposes play, pause and seek, a chart that exposes update, a virtualised list that exposes scrollToIndex: these are real objects with real methods, and the parent genuinely needs to drive them. The pattern is the same in every case: the imperative handle exposes commands, the props carry data, and the component owns the state in between.\n\nTwo rules keep this honest. The handle should be built with useMemo or useCallback inside the layout effect so its identity is stable, and the dependency list of that effect must cover everything the handle closes over, otherwise the parent keeps calling a method that works on stale data. And when the same job can be done with a prop, a callback or a ref forwarded to a DOM node, take that route instead: an imperative handle is the last resort, not the first.',
        'useImperativeHandle позволяет компоненту решить, что именно родитель имеет право с ним делать. Хук выполняется на фазе layout, после того как DOM зафиксирован, и заменяет собой то, что родитель иначе получил бы через ссылку. Возвращённый объект становится значением ссылки: маленький объект с парой методов и больше ничем. Родитель может вызывать эти методы и не имеет доступа к тому, что вы не открыли.\n\nСоблазн применить хук как универсальный выход из тупика велик, и именно здесь он чаще всего и ломается. Компонент, открывающий setValue, getValue, renderRow и focus, получает два источника истины: пропсы, по которым его рисуют, и императивные вызовы, которые тихо его меняют. Следующий рендер перезаписывает то, во что родитель вмешался, и расхождение проявляется как поле, которое само по себе сбрасывается без видимой причины.\n\nЧестный случай применения — компонент, оборачивающий то, что React описать не может, и даже там API должен быть минимальным. Плеер, открывающий play, pause и seek, график с методом update, виртуализированный список со scrollToIndex: это настоящие объекты с настоящими методами, и родителю действительно нужно ими управлять. Схема одна и та же: императивный handle открывает команды, пропсы несут данные, а состояние между ними принадлежит компоненту.\n\nДва правила удерживают это в рамках. Handle нужно собирать через useMemo или useCallback внутри layout-эффекта, чтобы его идентичность была стабильной, и список зависимостей этого эффекта должен покрывать всё, что handle замыкает, иначе родитель продолжит вызывать метод, работающий со stale-данными. А если ту же задачу можно решить пропом, колбэком или переданной вниз ссылкой на DOM-узел, выбирайте этот путь: императивный handle — последнее средство, а не первое.'
      ),
      bullets: [
        L('useImperativeHandle runs after the commit, during the layout phase.', 'useImperativeHandle выполняется после commit, на фазе layout.'),
        L('The returned object becomes the ref value the parent receives.', 'Возвращённый объект становится значением ссылки у родителя.'),
        L('Expose commands, not data: props carry data, the handle carries verbs.', 'Открывайте команды, а не данные: данные — в пропсах, команды — в handle.'),
        L('Keep the handle identity stable with useMemo or useCallback.', 'Держите идентичность handle стабильной через useMemo или useCallback.'),
        L('A wide imperative API creates a second source of truth.', 'Широкий императивный API создаёт второй источник истины.'),
        L('Prefer props, callbacks and forwarded refs over an imperative handle.', 'Пропсы, колбэки и переданные вниз ссылки лучше императивного handle.'),
      ],
      code: `function VideoPlayer({ src, ref }) {
  const videoRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      play: () => videoRef.current.play(),
      pause: () => videoRef.current.pause(),
      seek: (time) => { videoRef.current.currentTime = time; },
    }),
    [],
  );

  return <video ref={videoRef} src={src} controls />;
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two sources of truth', 'Два источника истины'),
          text: L(
            'A parent that mutates a component through an imperative handle and also passes it props is editing the same component from two directions. The props win on the next render, so the imperative change disappears for no visible reason.',
            'Родитель, который меняет компонент через императивный handle и одновременно передаёт пропсы, редактирует один и тот же компонент с двух сторон. Пропсы побеждают на следующем рендере, и императивное изменение исчезает без видимой причины.'
          ),
        },
        {
          tone: 'warning',
          title: L('The handle needs its dependencies', 'У handle должны быть зависимости'),
          text: L(
            'The handle closes over the values it uses. If the dependency array omits them, the parent keeps a method that operates on the data from the first render. List every value the handle reads, and memoise the handle so its identity does not change on every render.',
            'Handle замыкает значения, которые использует. Если в списке зависимостей их нет, у родителя остаётся метод, работающий с данными первого рендера. Перечислите все значения, которые читает handle, и мемоизируйте его, чтобы идентичность не менялась на каждом рендере.'
          ),
        },
      ],
      takeaway: L(
        'Expose the smallest possible imperative API, and only when props and callbacks cannot do the job.',
        'Открывайте минимальный императивный API и только тогда, когда пропсов и колбэков не хватает.'
      ),
      seeAlso: [
        L('Section 6-3: forwarding refs', 'Секция 6-3: передача ссылок вниз'),
        L('Chapter 11: server components, Suspense and testing', 'Глава 11: серверные компоненты, Suspense и тестирование'),
      ],
    },
  ],
};
