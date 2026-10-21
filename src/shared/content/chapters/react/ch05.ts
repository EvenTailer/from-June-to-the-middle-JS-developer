import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh05: Chapter = {
  id: 'react-ch5',
  title: L('Effects', 'Эффекты'),
  summary: L(
    'What effects are for, how the dependency array decides when they run, why cleanup is mandatory, when a layout effect is the right tool, which effects do not need to exist, and how the classic mistakes look.',
    'Для чего нужны эффекты, как массив зависимостей решает, когда они выполняются, почему очистка обязательна, когда нужен эффект раскладки, какие эффекты не нужны вовсе и как выглядят типичные ошибки.'
  ),
  sections: [
    {
      id: 'react-ch5-s1',
      title: L('What effects are for', 'Для чего нужны эффекты'),
      body: L(
        'An effect synchronises a component with something outside React: a subscription, a timer, a network connection, an imperative API of the browser. The name says it: an effect runs after React has committed the render and lets the outside world catch up with the new state. The component declares what it needs and what has to be undone when the need disappears.\n\nThe effect is not the place to compute what the screen shows. Values that can be derived from props and state are computed during render, because such a value has to be correct in the very first frame. An effect that copies a computed value into state always renders once with the stale value, so it produces a visible flicker and an extra render.\n\nEffects are also not the place for event handling. A click handler belongs in the handler, where it runs only when the user acts, and not in an effect that runs on every change of some state. If the logic only makes sense after a user action, put it in that action.\n\nThe shape is always the same: useEffect(() => { setup(); return () => cleanup(); }, [dependencies]). The setup may start something, the cleanup has to undo it, and the dependency array tells React when to run the pair again.',
        'Эффект синхронизирует компонент с чем-то за пределами React: подпиской, таймером, сетевым соединением, императивным API браузера. Имя говорит прямо: эффект выполняется после того, как React зафиксировал рендер, и позволяет внешнему миру догнать новое состояние. Компонент объявляет, что ему нужно, и что надо отменить, когда надобность исчезнет.\n\nЭффект — не место для вычисления того, что показывает экран. Значения, которые можно вывести из пропсов и состояния, считают во время рендера, потому что такое значение должно быть верным уже в первом кадре. Эффект, копирующий вычисленное значение в состояние, всегда один раз рендерит со старым значением, поэтому даёт заметное мерцание и лишний рендер.\n\nЭффекты — не место и для обработки событий. Обработчик клика живёт в обработчике, где он выполняется только когда пользователь действует, а не в эффекте, который срабатывает на каждое изменение состояния. Если логика имеет смысл только после действия пользователя, положите её в это действие.\n\nФорма всегда одинакова: useEffect(() => { setup(); return () => cleanup(); }, [dependencies]). Setup может что-то запустить, очистка обязана это отменить, а массив зависимостей говорит React, когда выполнять эту пару заново.'
      ),
      bullets: [
        L('An effect synchronises the component with a system outside React.', 'Эффект синхронизирует компонент с системой за пределами React.'),
        L('Values that can be derived from props and state are computed during render.', 'Значения, выводимые из пропсов и состояния, вычисляются во время рендера.'),
        L('Event logic belongs in the event handler, not in an effect.', 'Логика события живёт в обработчике, а не в эффекте.'),
        L('An effect returns a cleanup function that undoes the setup.', 'Эффект возвращает функцию очистки, которая отменяет setup.'),
        L('The dependency array decides when the effect is set up again.', 'Массив зависимостей решает, когда эффект настраивается заново.'),
      ],
      code: `function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    // Undo exactly what the setup did
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
}`,
      table: {
        caption: L('Effect or render', 'Эффект или рендер'),
        headers: [L('Task', 'Задача'), L('Where it belongs', 'Где место')],
        rows: [
          [L('Show a value computed from props', 'Показать значение, вычисленное из пропсов'), L('during render', 'во время рендера')],
          [L('Start a subscription', 'Запустить подписку'), L('effect', 'эффект')],
          [L('Handle a click', 'Обработать клик'), L('event handler', 'обработчик события')],
          [L('Send a request when the user submits', 'Отправить запрос по действию пользователя'), L('event handler', 'обработчик события')],
          [L('Copy a prop into state', 'Скопировать проп в состояние'), L('nowhere, that is a bug', 'нигде, это баг')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The effect that copies derived state', 'Эффект, копирующий производное состояние'),
          text: L(
            'The effect runs after the paint, so the component renders once with the old value and then again with the new one. The user sees a flash, the component renders twice and the real source of truth is now in two places. Compute the value during render instead.',
            'Эффект выполняется после отрисовки, поэтому компонент один раз рендерит со старым значением и только потом — с новым. Пользователь видит вспышку, компонент рендерится дважды, а источник истины теперь в двух местах. Считайте значение во время рендера.'
          ),
        },
        {
          tone: 'note',
          title: L('Effects are for the outside world', 'Эффекты — для внешнего мира'),
          text: L(
            'A quick test: does the code talk to something that lives outside the component, such as the DOM, a timer, a socket or a browser API? If not, the code most likely belongs in the render or in an event handler.',
            'Быстрый тест: общается ли код с чем-то, живущим вне компонента, — с DOM, таймером, сокетом или API браузера? Если нет, код скорее всего принадлежит рендеру или обработчику события.'
          ),
        },
      ],
      takeaway: L(
        'Use an effect only to synchronise with something outside React, and compute everything else during render.',
        'Используйте эффект только для синхронизации с тем, что вне React, а всё остальное вычисляйте во время рендера.'
      ),
      seeAlso: [
        L('Section 5-5: effects that should not be effects', 'Секция 5-5: эффекты, которые не должны быть эффектами'),
        L('Section 4-4: derived state and useReducer', 'Секция 4-4: производное состояние и useReducer'),
        L('Section 5-3: cleanup and stale closures', 'Секция 5-3: очистка и устаревшие замыкания'),
      ],
    },
    {
      id: 'react-ch5-s2',
      title: L('The dependency array and exhaustive deps', 'Массив зависимостей и exhaustive-deps'),
      body: L(
        'The dependency array tells React which values the effect reads. React compares each entry with the value from the previous render using Object.is, and if any of them changed, it runs the cleanup of the old effect and then the setup again. An array with no entries means the effect runs only after the first render, and an effect with no array at all runs after every render.\n\nThe lint rule react-hooks/exhaustive-deps exists because the array is easy to get wrong. It reads the body of the effect, finds every value from the component scope that the effect uses, and requires those values in the array. A missing dependency is a promise that the value will never change, and the rule reports it at the exact line where the problem lives.\n\nThe rule does not catch everything. It cannot know that a function created during the render is stable, and it cannot verify that a mutable object was not changed in place. It also does not understand custom hooks: the dependency arrays of the hooks inside a custom hook belong to that hook, and a caller has to follow the rules of the hook it calls.\n\nStability of the dependencies decides how often an effect reruns. A function declared in the body of the component is a new function on every render, so an effect that depends on it runs on every render too. Either move the function inside the effect, or wrap it in useCallback, or read the values it needs from the state instead.',
        'Массив зависимостей говорит React, какие значения читает эффект. React сравнивает каждый элемент со значением из предыдущего рендера через Object.is, и если что-то изменилось, выполняет очистку старого эффекта, а затем setup заново. Пустой массив означает, что эффект выполнится только после первого рендера, а эффект вообще без массива выполняется после каждого рендера.\n\nПравило линтера react-hooks/exhaustive-deps существует, потому что массив легко испортить. Оно читает тело эффекта, находит все значения из области компонента, которыми эффект пользуется, и требует их в массиве. Отсутствующая зависимость — это обещание, что значение никогда не изменится, и правило указывает ровно на строку с проблемой.\n\nПравило ловит не всё. Оно не знает, что функция, созданная во время рендера, стабильна, и не может проверить, что изменяемый объект не менялся на месте. Оно также не понимает собственные хуки: массивы зависимостей хуков внутри собственного хука принадлежат ему, а вызывающий обязан соблюдать правила вызываемого хука.\n\nСтабильность зависимостей решает, как часто перезапускается эффект. Функция, объявленная в теле компонента, новая при каждом рендере, поэтому эффект, зависящий от неё, выполняется после каждого рендера. Либо перенесите функцию внутрь эффекта, либо оберните её в useCallback, либо читайте нужные значения из состояния.'
      ),
      bullets: [
        L('React compares the entries with Object.is and reruns the effect when one changes.', 'React сравнивает элементы через Object.is и перезапускает эффект при изменении любого из них.'),
        L('An empty array runs the effect only after the first render.', 'Пустой массив выполняет эффект только после первого рендера.'),
        L('No array at all runs the effect after every render.', 'Отсутствие массива выполняет эффект после каждого рендера.'),
        L('exhaustive-deps lists every value from the component scope that the effect uses.', 'exhaustive-deps перечисляет все значения из области компонента, которыми пользуется эффект.'),
        L('A function declared in the component body is a new dependency on every render.', 'Функция, объявленная в теле компонента, — новая зависимость при каждом рендере.'),
      ],
      code: `function Search({ query, onSearch }) {
  // A function declared in the body is a new value on every render,
  // so an effect that depends on it would rerun on every render.
  // useCallback keeps the identity stable while the values stay the same.
  const handle = useCallback(() => onSearch(query), [onSearch, query]);

  // The effect reads handle, so handle belongs in the list, and query
  // belongs in the list of useCallback above. The request is debounced:
  // a new keystroke cancels the pending one, so onSearch never fires
  // twice in a row.
  useEffect(() => {
    const id = setTimeout(handle, 300);
    return () => clearTimeout(id);
  }, [handle]);

  return null;
}`,
      table: {
        caption: L('What the dependency array does', 'Что делает массив зависимостей'),
        headers: [L('Array', 'Массив'), L('When the effect runs', 'Когда выполняется эффект')],
        rows: [
          [L('[]', '[]'), L('only after the first render', 'только после первого рендера')],
          [L('[a, b]', '[a, b]'), L('after the first render and whenever a or b changes', 'после первого рендера и при изменении a или b')],
          [L('no array', 'без массива'), L('after every render', 'после каждого рендера')],
          [L('[{}]', '[{}]'), L('after every render, the literal is new each time', 'после каждого рендера, литерал новый при каждом разе')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Let the linter write the array', 'Пусть массив напишет линтер'),
          text: L(
            'Start from the array the rule suggests and remove entries only when you can explain why the value will never change. The rule knows the effect better than you remember it.',
            'Начните с массива, который предлагает правило, и убирайте элементы только тогда, когда можете объяснить, почему значение не изменится. Правило знает эффект лучше, чем помните вы.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A missing dependency is a promise', 'Отсутствующая зависимость — это обещание'),
          text: L(
            'Leaving a value out of the array tells React that the effect never needs the new one. The code keeps working with the value from the first render, and the bug appears much later, far from its cause.',
            'Оставить значение вне массива — значит сказать React, что эффекту новое значение никогда не понадобится. Код продолжает работать со значением из первого рендера, и баг всплывает сильно позже и далеко от причины.'
          ),
        },
      ],
      takeaway: L(
        'List every value the effect reads and make those values stable, so the effect runs when it must and not more often.',
        'Перечисляйте все значения, которые читает эффект, и делайте их стабильными, чтобы эффект выполнялся когда надо, а не чаще.'
      ),
      seeAlso: [
        L('Section 5-3: cleanup and stale closures', 'Секция 5-3: очистка и устаревшие замыкания'),
        L('Section 5-6: common effect mistakes', 'Секция 5-6: типичные ошибки в эффектах'),
        L('Chapter 10: performance', 'Глава 10: производительность'),
      ],
    },
    {
      id: 'react-ch5-s3',
      title: L('Cleanup and stale closures', 'Очистка и устаревшие замыкания'),
      body: L(
        'The function returned from an effect is its cleanup. React calls it before the effect runs again and when the component unmounts, and its job is to undo everything the setup did: remove the listener, clear the timer, abort the request, close the connection. An effect that starts something and returns nothing leaks it for the whole life of the page.\n\nThe cleanup captures the values of the render in which it was created, and that is where the stale closure enters. A subscription whose handler closes over the current user id keeps the id from the moment the subscription started, so the events that arrive later are processed with an outdated identity.\n\nThere are two ways to deal with it. The first is to make the effect depend on the value, which recreates the subscription when the value changes while the cleanup removes the old one. The second is to keep the value in a ref, which always holds the current value, and read the ref inside the handler. The first is simpler when the value rarely changes, the second is better for a long lived subscription.\n\nThe cleanup must be written as if the effect were about to run again, because that is exactly what happens. The pattern for every subscription is the same: add the listener in the setup, remove the same listener in the cleanup, with the same reference. A cleanup that removes a different function removes nothing.',
        'Функция, возвращаемая из эффекта, — это его очистка. React вызывает её перед следующим выполнением эффекта и при размонтировании компонента, и её работа — отменить всё, что сделал setup: снять слушатель, очистить таймер, прервать запрос, закрыть соединение. Эффект, который что-то запускает и ничего не возвращает, течёт весь срок жизни страницы.\n\nОчистка захватывает значения того рендера, в котором была создана, и именно здесь появляется устаревшее замыкание. Подписка, обработчик которой замкнут на текущий id пользователя, хранит id с момента старта подписки, и события, пришедшие позже, обрабатываются с устаревшей личностью.\n\nС этим можно поступить двумя способами. Первый — добавить значение в зависимости эффекта: подписка пересоздаётся при его изменении, а очистка снимает старую. Второй — хранить значение в ref, который всегда содержит актуальное, и читать ref в обработчике. Первый проще, когда значение меняется редко, второй лучше для долгоживущей подписки.\n\nОчистку надо писать так, будто эффект вот-вот выполнится снова, потому что именно так и будет. Схема для любой подписки одна: в setup добавить слушатель, в очистке снять тот же слушатель по той же ссылке. Очистка, которая снимает другую функцию, не снимает ничего.'
      ),
      bullets: [
        L('The cleanup undoes the setup and runs before the next run and on unmount.', 'Очистка отменяет setup и выполняется перед следующим запуском и при размонтировании.'),
        L('An effect that starts something and returns nothing leaks it.', 'Эффект, который что-то запускает и ничего не возвращает, течёт.'),
        L('The cleanup captures the values of the render that created it.', 'Очистка захватывает значения того рендера, который её создал.'),
        L('Recreate the effect when the value changes, or read it from a ref.', 'Пересоздавайте эффект при изменении значения или читайте его из ref.'),
        L('The cleanup must remove exactly what the setup added.', 'Очистка должна снимать ровно то, что добавил setup.'),
      ],
      code: `function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous; // restore the old value
    };
  }, [title]);
}

function useEvent(name, handler) {
  const handlerRef = useRef(handler);

  // The ref is updated in an effect, never during the render
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event) => handlerRef.current(event);
    window.addEventListener(name, listener);
    return () => window.removeEventListener(name, listener);
  }, [name]);
}`,
      table: {
        caption: L('Where the current value comes from', 'Откуда берётся актуальное значение'),
        headers: [L('Approach', 'Подход'), L('Effect reruns', 'Эффект перезапускается'), L('Cost', 'Цена')],
        rows: [
          [L('Add the value to the dependencies', 'Добавить значение в зависимости'), L('on every change of the value', 'при каждом изменении значения'), L('the subscription is recreated', 'подписка пересоздаётся')],
          [L('Keep the value in a ref', 'Хранить значение в ref'), L('never', 'никогда'), L('the handler reads the current value', 'обработчик читает актуальное значение')],
          [L('Move the handler inside the effect', 'Перенести обработчик внутрь эффекта'), L('when the effect reruns', 'когда перезапускается эффект'), L('nothing else can use the handler', 'другим кодом обработчик недоступен')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The cleanup that removes nothing', 'Очистка, которая ничего не снимает'),
          text: L(
            'Adding the listener with an inline arrow function and removing it with another inline arrow function removes a different function, so the original listener stays forever. Keep the reference in a variable and use it in both places.',
            'Если слушатель добавлен инлайновой стрелкой, а снимается другой инлайновой стрелкой, снимается другая функция, и исходный слушатель остаётся навсегда. Держите ссылку в переменной и используйте её в обоих местах.'
          ),
        },
        {
          tone: 'tip',
          title: L('Restore what you changed', 'Восстанавливайте то, что изменили'),
          text: L(
            'A cleanup that puts the previous value back is the general form of the pattern. Save the old value in the setup, apply the new one, and restore the old one in the cleanup.',
            'Очистка, которая возвращает прежнее значение, — общая форма этого приёма. Сохраните старое значение в setup, примените новое и верните старое в очистке.'
          ),
        },
      ],
      takeaway: L(
        'Return a cleanup that undoes the setup exactly, and remember that the cleanup closes over the values of its own render.',
        'Возвращайте очистку, которая точно отменяет setup, и помните, что очистка замыкается на значения своего рендера.'
      ),
      seeAlso: [
        L('Section 5-2: the dependency array and exhaustive deps', 'Секция 5-2: массив зависимостей и exhaustive-deps'),
        L('Section 4-3: functional updates and stale closures', 'Секция 4-3: функциональные обновления и устаревшие замыкания'),
        L('Section 5-6: common effect mistakes', 'Секция 5-6: типичные ошибки в эффектах'),
      ],
    },
    {
      id: 'react-ch5-s4',
      title: L('useLayoutEffect versus useEffect', 'useLayoutEffect против useEffect'),
      body: L(
        'Both hooks run after React has changed the DOM, but at different moments. useLayoutEffect runs synchronously inside the commit phase, before the browser paints, and React waits for it. useEffect runs after the paint, scheduled like an ordinary task, and React does not wait for it.\n\nBecause the layout effect runs before the paint, it can read the final geometry of the DOM and change it before the user sees anything. That makes it the right tool for measuring an element, for placing a tooltip next to its anchor and for preventing a visible jump when a value changes the size of a block.\n\nThe price is blocking. The browser cannot paint until the layout effect returns, so a slow layout effect delays the frame and can freeze the interface. Reserve it for measurements and for corrections that must happen before the paint, and use useEffect for everything else.\n\nThe rule of thumb is simple: if the user would see a wrong frame without the effect, use useLayoutEffect; if the work can happen a frame later, use useEffect. On the server there is no layout to measure, so useLayoutEffect warns during server rendering and the effect never runs there.',
        'Оба хука выполняются после того, как React изменил DOM, но в разные моменты. useLayoutEffect работает синхронно внутри фазы коммита, до отрисовки браузером, и React ждёт его. useEffect выполняется после отрисовки, планируется как обычная задача, и React его не ждёт.\n\nПоскольку эффект раскладки выполняется до отрисовки, он может прочитать итоговую геометрию DOM и изменить её до того, как пользователь что-либо увидит. Поэтому он подходит для измерения элемента, для размещения подсказки рядом с якорем и для предотвращения заметного скачка, когда значение меняет размер блока.\n\nЦена — блокировка. Браузер не может отрисовать кадр, пока эффект раскладки не вернётся, поэтому медленный эффект раскладки задерживает кадр и может подвесить интерфейс. Оставляйте его для измерений и правок, которые обязаны случиться до отрисовки, а для всего остального используйте useEffect.\n\nПравило простое: если без эффекта пользователь увидит неправильный кадр, берите useLayoutEffect; если работа может подождать кадр, берите useEffect. На сервере нет геометрии, поэтому useLayoutEffect предупреждает при серверном рендере и там не выполняется.'
      ),
      bullets: [
        L('useLayoutEffect runs before the paint and blocks it, useEffect runs after.', 'useLayoutEffect выполняется до отрисовки и блокирует её, useEffect — после.'),
        L('A layout effect can measure the DOM and fix the result before the user sees it.', 'Эффект раскладки может измерить DOM и исправить результат до того, как его увидит пользователь.'),
        L('A slow layout effect delays the frame and freezes the interface.', 'Медленный эффект раскладки задерживает кадр и подвешивает интерфейс.'),
        L('Use a layout effect only when a wrong frame would be visible.', 'Берите эффект раскладки только когда неправильный кадр был бы виден.'),
        L('On the server useLayoutEffect warns, because there is no layout to measure.', 'На сервере useLayoutEffect предупреждает, потому что измерять нечего.'),
      ],
      code: `function Tooltip({ anchorRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // The tooltip must be placed before the user sees the frame
  useLayoutEffect(() => {
    const anchor = anchorRef.current.getBoundingClientRect();
    setPosition({ top: anchor.bottom, left: anchor.left });
  }, [anchorRef, children]);

  return <div style={{ position: 'absolute', ...position }}>{children}</div>;
}

// The same measurement after the paint: one frame later, no blocking
useEffect(() => {
  const height = boxRef.current.offsetHeight;
  console.log('measured', height);
}, [items]);`,
      table: {
        caption: L('The two effects', 'Два эффекта'),
        headers: [L('Aspect', 'Аспект'), L('useLayoutEffect', 'useLayoutEffect'), L('useEffect', 'useEffect')],
        rows: [
          [L('When it runs', 'Когда выполняется'), L('before the paint', 'до отрисовки'), L('after the paint', 'после отрисовки')],
          [L('Blocks the frame', 'Блокирует кадр'), L('yes', 'да'), L('no', 'нет')],
          [L('Good for', 'Хорошо для'), L('measurement, positioning, avoiding a jump', 'измерений, позиционирования, защиты от скачка'), L('subscriptions, requests, logging', 'подписок, запросов, логов')],
          [L('Server rendering', 'Серверный рендер'), L('warns', 'предупреждает'), L('does not run', 'не выполняется')],
          [L('How often it is used', 'Как часто применяют'), L('rare', 'редко'), L('often', 'часто')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('The default is useEffect', 'По умолчанию — useEffect'),
          text: L(
            'Reach for useLayoutEffect only when a visible frame depends on the result. Every layout effect is a chance to slow the interface down for a problem nobody can see.',
            'Беритесь за useLayoutEffect только когда результат влияет на видимый кадр. Каждый эффект раскладки — это шанс замедлить интерфейс ради невидимой проблемы.'
          ),
        },
        {
          tone: 'warning',
          title: L('Blocking the frame', 'Блокировка кадра'),
          text: L(
            'A layout effect that performs a slow computation delays the paint of the whole page, because the browser cannot show anything until the effect returns. Measure, write and get out.',
            'Эффект раскладки с медленным вычислением задерживает отрисовку всей страницы: браузер не покажет ничего, пока эффект не вернётся. Измерьте, запишите и выходите.'
          ),
        },
      ],
      takeaway: L(
        'Use useLayoutEffect only when a wrong frame would be visible, and keep the body of it fast.',
        'Берите useLayoutEffect только когда был бы виден неправильный кадр, и держите его тело быстрым.'
      ),
      seeAlso: [
        L('Section 2-3: batching and when the DOM is touched', 'Секция 2-3: батчинг и момент изменения DOM'),
        L('Chapter 6: refs and the DOM', 'Глава 6: рефы и DOM'),
        L('Section 5-6: common effect mistakes', 'Секция 5-6: типичные ошибки в эффектах'),
      ],
    },
    {
      id: 'react-ch5-s5',
      title: L('Effects that should not be effects', 'Эффекты, которые не должны быть эффектами'),
      body: L(
        'Several very common effects do not need to exist at all. The most frequent is the effect that copies a derived value into state. The value can be computed during render, which is free, always consistent and produces no extra render. An effect that mirrors props into state is a bug with extra steps.\n\nThe second is the effect that handles a user action. If the logic belongs to a click, it belongs in the click handler. Running it in an effect means running it on the first render too, and then having to guard it with a flag, which is the same bug in a slower form.\n\nThe third is the effect that resets the state when a prop changes. The idiomatic way is the key: a change of the key remounts the component and gives it a fresh state without any effect. When the state has to be adjusted instead of reset, the adjustment can happen during render by comparing with the previous value, which React documents as the way to adjust state when a prop changes.\n\nThere is one more case: a value that has to be written back to a server. A request belongs in the event handler that caused it, because that is where the user intent is. If the request must happen because a prop changed, then the effect is the right place, and it needs an abort and a cleanup.',
        'Несколько очень частых эффектов не нужны вовсе. Самый частый — эффект, который копирует производное значение в состояние. Значение можно вычислить во время рендера: это бесплатно, всегда согласовано и не даёт лишнего рендера. Эффект, отражающий пропсы в состояние, — это баг с лишними шагами.\n\nВторой — эффект, обрабатывающий действие пользователя. Если логике место в клике, ей место в обработчике клика. Выполнение её в эффекте означает выполнение и на первом рендере, а потом требует защиты флагом, и это тот же баг в более медленной форме.\n\nТретий — эффект, сбрасывающий состояние при изменении пропа. Идиоматический способ — key: смена key перемонтирует компонент и даёт ему свежее состояние без всяких эффектов. Если состояние надо подстроить, а не сбросить, подстройка выполняется во время рендера сравнением с предыдущим значением, и React документирует это как способ подстроить состояние при смене пропа.\n\nОстаётся ещё случай — значение, которое надо записать обратно на сервер. Запрос принадлежит обработчику, который его вызвал, потому что там находится намерение пользователя. Если запрос должен случиться из-за изменения пропа, тогда эффект — правильное место, и ему нужны прерывание и очистка.'
      ),
      bullets: [
        L('Derived values are computed during render, not copied into state by an effect.', 'Производные значения вычисляются во время рендера, а не копируются в состояние эффектом.'),
        L('Logic that belongs to a user action belongs in the event handler.', 'Логика, относящаяся к действию пользователя, живёт в обработчике события.'),
        L('A change of the key resets the state without any effect.', 'Смена key сбрасывает состояние без всяких эффектов.'),
        L('Adjusting state during render is the documented alternative to an effect.', 'Подстройка состояния во время рендера — документированная альтернатива эффекту.'),
        L('A request caused by an action belongs in the handler, not in an effect.', 'Запрос, вызванный действием, принадлежит обработчику, а не эффекту.'),
      ],
      code: `// Not an effect: the total is derived from the items
function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <p>Total: {total}</p>;
}

// Not an effect: the reset happens through the key
function Profile({ userId }) {
  return <ProfileForm key={userId} userId={userId} />;
}

// Not an effect: the request belongs to the click
function SaveButton({ payload }) {
  function handleClick() {
    fetch('/api/save', { method: 'POST', body: JSON.stringify(payload) });
  }
  return <button onClick={handleClick}>Save</button>;
}`,
      table: {
        caption: L('Effect or not', 'Эффект или нет'),
        headers: [L('Task', 'Задача'), L('Effect?', 'Эффект?'), L('Better way', 'Лучший способ')],
        rows: [
          [L('Show a computed total', 'Показать вычисленный итог'), L('no', 'нет'), L('compute during render', 'вычислить во время рендера')],
          [L('Reset the form on a new id', 'Сбросить форму при новом id'), L('no', 'нет'), L('change the key', 'сменить key')],
          [L('Save on click', 'Сохранить по клику'), L('no', 'нет'), L('handle it in the click handler', 'обработать в обработчике клика')],
          [L('Subscribe to a store', 'Подписаться на хранилище'), L('yes', 'да'), L('effect with cleanup', 'эффект с очисткой')],
          [L('Fetch when the id changes', 'Загрузить при смене id'), L('yes', 'да'), L('effect with an abort', 'эффект с прерыванием')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The mirror effect', 'Эффект-зеркало'),
          text: L(
            'An effect that copies a prop into state is the most common unnecessary effect. The prop is already available during render, the copy adds a second source of truth and one more render for every change of the prop.',
            'Эффект, копирующий проп в состояние, — самый частый ненужный эффект. Проп и так доступен во время рендера, а копия добавляет второй источник истины и лишний рендер на каждое изменение пропа.'
          ),
        },
        {
          tone: 'tip',
          title: L('The key resets the state', 'key сбрасывает состояние'),
          text: L(
            'When a component has to start from scratch, remount it with a new key instead of writing an effect that clears a few fields. The remount also clears the focus, the scroll and the internal state of the child components.',
            'Когда компонент должен начать с нуля, перемонтируйте его новым key вместо эффекта, который чистит несколько полей. Перемонтирование заодно сбрасывает фокус, прокрутку и внутреннее состояние дочерних компонентов.'
          ),
        },
      ],
      takeaway: L(
        'Before writing an effect, check whether the value can be derived during render, whether the action has a handler, and whether the key can reset the state.',
        'Прежде чем писать эффект, проверьте: можно ли вывести значение во время рендера, есть ли обработчик у действия и не сбросит ли состояние смена key.'
      ),
      seeAlso: [
        L('Section 5-1: what effects are for', 'Секция 5-1: для чего нужны эффекты'),
        L('Section 1-2: elements versus component instances', 'Секция 1-2: элементы против инстансов компонентов'),
        L('Section 4-4: derived state and useReducer', 'Секция 4-4: производное состояние и useReducer'),
      ],
    },
    {
      id: 'react-ch5-s6',
      title: L('Common effect mistakes', 'Типичные ошибки в эффектах'),
      body: L(
        'The most common mistake is an effect without a dependency array. It runs after every render, and if it sets state, every render starts another one, which becomes an infinite loop. React logs the warning about too many re-renders, and the page freezes with a message that the fix is an array.\n\nThe second is a missing dependency. The effect reads a value that is not listed, so the effect keeps the value from the first render and behaves as if the value could never change. The lint rule catches this, and suppressing it with a comment turns a clear bug into a silent one.\n\nThe third is a side effect in the render. A request inside the component body runs on every render, including the renders that React throws away, so the server receives requests for versions of the screen that never appear. The fourth is an effect that writes to state it does not own, for example a global variable that several components read.\n\nThe fifth is a request without an abort. When the user types again, the previous request is still running, and its answer can arrive after the newer one, which shows stale data. An AbortController in the cleanup cancels the previous request, and a flag that ignores the answer of an outdated request works as well.',
        'Самая частая ошибка — эффект без массива зависимостей. Он выполняется после каждого рендера, а если он ставит состояние, то каждый рендер запускает следующий, и получается бесконечный цикл. React пишет предупреждение о слишком большом числе рендеров, а страница зависает с подсказкой, что решение — массив.\n\nВторая ошибка — отсутствующая зависимость. Эффект читает значение, которого нет в списке, поэтому сохраняет значение из первого рендера и ведёт себя так, будто значение никогда не меняется. Линтер это ловит, а отключение правила комментарием превращает явный баг в тихий.\n\nТретья ошибка — побочный эффект в рендере. Запрос в теле компонента выполняется при каждом рендере, включая те, которые React выбрасывает, поэтому сервер получает запросы для версий экрана, которых никогда не было. Четвёртая — эффект, пишущий в состояние, которым не владеет, например в глобальную переменную, которую читают несколько компонентов.\n\nПятая ошибка — запрос без прерывания. Когда пользователь печатает снова, предыдущий запрос ещё выполняется, и его ответ может прийти после нового, что показывает устаревшие данные. AbortController в очистке отменяет предыдущий запрос, и флаг, игнорирующий ответ устаревшего запроса, работает не хуже.'
      ),
      bullets: [
        L('An effect without a dependency array runs after every render and may loop forever.', 'Эффект без массива зависимостей выполняется после каждого рендера и может зациклиться.'),
        L('A missing dependency keeps the value of the first render.', 'Отсутствующая зависимость сохраняет значение из первого рендера.'),
        L('A request inside the render body runs for renders that never appear.', 'Запрос в теле рендера выполняется и для рендеров, которых не будет.'),
        L('A request without an abort can answer after a newer one and show stale data.', 'Запрос без прерывания может ответить позже нового и показать устаревшие данные.'),
        L('Never suppress the exhaustive-deps warning without writing down why.', 'Никогда не отключайте предупреждение exhaustive-deps, не записав почему.'),
      ],
      code: `// Broken: runs after every render and sets state, so it loops
useEffect(() => {
  setCount(count + 1);
});

// Broken: no abort, the old answer can arrive after the new one
useEffect(() => {
  fetch('/api/items/' + id)
    .then((response) => response.json())
    .then(setItems);
}, [id]);

// Correct: the previous request is cancelled on every change
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/items/' + id, { signal: controller.signal })
    .then((response) => response.json())
    .then(setItems)
    .catch((error) => {
      if (error.name !== 'AbortError') throw error;
    });
  return () => controller.abort();
}, [id]);`,
      table: {
        caption: L('Mistake and repair', 'Ошибка и починка'),
        headers: [L('Mistake', 'Ошибка'), L('Symptom', 'Симптом'), L('Repair', 'Починка')],
        rows: [
          [L('No dependency array', 'Нет массива зависимостей'), L('infinite loop', 'бесконечный цикл'), L('list the dependencies', 'перечислить зависимости')],
          [L('Missing dependency', 'Отсутствующая зависимость'), L('stale values', 'устаревшие значения'), L('add it or use the functional form', 'добавить её или использовать функциональную форму')],
          [L('Request in the render body', 'Запрос в теле рендера'), L('duplicate requests', 'дублирующиеся запросы'), L('move it into an effect or a handler', 'перенести в эффект или обработчик')],
          [L('No abort', 'Нет прерывания'), L('stale data arrives late', 'устаревшие данные приходят поздно'), L('AbortController in the cleanup', 'AbortController в очистке')],
          [L('Writing to a global', 'Запись в глобальную переменную'), L('mysterious updates', 'загадочные обновления'), L('lift the state and pass it down', 'поднять состояние и передать вниз')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Do not silence the linter', 'Не заглушайте линтер'),
          text: L(
            'A disabled exhaustive-deps rule means the effect has an undeclared dependency, and the failure appears as a stale value much later. If the dependency really must be ignored, write down the reason next to the comment.',
            'Отключённое правило exhaustive-deps означает незаявленную зависимость, а сбой проявится позже как устаревшее значение. Если зависимость действительно надо игнорировать, напишите причину рядом с комментарием.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The loop that never ends', 'Цикл, который не кончается'),
          text: L(
            'An effect that sets state on every run and has no dependency array produces an endless chain of renders. The screen freezes and the console explains that too many re-renders were triggered.',
            'Эффект, который ставит состояние при каждом запуске и не имеет массива зависимостей, даёт бесконечную цепочку рендеров. Экран замирает, а консоль сообщает о слишком большом числе рендеров.'
          ),
        },
      ],
      takeaway: L(
        'Give every effect a dependency array, never hide a missing dependency, and cancel the requests that a newer one replaces.',
        'Давайте каждому эффекту массив зависимостей, никогда не прячьте отсутствующую зависимость и отменяйте запросы, которые заменяются более новыми.'
      ),
      seeAlso: [
        L('Section 5-2: the dependency array and exhaustive deps', 'Секция 5-2: массив зависимостей и exhaustive-deps'),
        L('Section 5-3: cleanup and stale closures', 'Секция 5-3: очистка и устаревшие замыкания'),
        L('Chapter 9: forms', 'Глава 9: формы'),
      ],
    },
  ],
};
