import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh08: Chapter = {
  id: 'react-ch8',
  title: L('Custom hooks', 'Кастомные хуки'),
  summary: L(
    'How to pull logic out of a component without turning the hook into a second component, why the rules of hooks exist and what the linter checks, whether a hook should return an object or a tuple, and how a hook can share behaviour without sharing state.',
    'Как вынести логику из компонента, не превратив хук во второй компонент, зачем нужны правила хуков и что проверяет линтер, должен ли хук возвращать объект или кортеж, и как хук может разделять поведение, не разделяя состояние.'
  ),
  sections: [
    {
      id: 'react-ch8-s1',
      title: L('Extracting logic', 'Выделение логики'),
      body: L(
        'A custom hook is a function whose name starts with use that may call other hooks. The name is a promise to the reader and to the linter: this function uses hooks, so it must be called from a component or another hook, and only from the top level of that function. The implementation is ordinary JavaScript, but the contract wrapped around it is not.\n\nWhat belongs in a hook is the part of a component that is not about markup: a subscription, a derived value, a piece of state together with its handlers, a timer, an intersection observer. What stays in the component is what describes this particular piece of screen: which variant is shown, which class names are applied, what copy is displayed. If you can delete the JSX and the hook still makes sense on its own, the extraction was right.\n\nThere is a limit to the extraction. A hook that takes five arguments and returns five values, or a hook that needs the caller to pass in five pieces of state it could own itself, is no longer a tool: it is the component moved one level up with extra steps. Good hooks take one or two parameters, usually the ones that cannot be known inside, and they hide one concern.\n\nThe reward is that the logic becomes testable and reusable, but the reuse part is often overestimated. A hook used by exactly one component is still worth extracting when it isolates a concern, because the component becomes easier to read. A hook used by three components with three slightly different shapes is a sign that the shapes should have been unified first, and the hook is papering over the difference instead.',
        'Кастомный хук — функция, имя которой начинается с use и которая может вызывать другие хуки. Имя — это обещание читателю и линтеру: эта функция использует хуки, поэтому её вызывают из компонента или другого хука и только с верхнего уровня. Реализация — обычный JavaScript, но контракт вокруг неё — нет.\n\nВ хук переносится та часть компонента, которая не про разметку: подписка, производное значение, состояние вместе с его обработчиками, таймер, наблюдатель пересечений. В компоненте остаётся то, что описывает именно этот кусок экрана: какой вариант показан, какие классы применены, какой текст выводится. Если JSX можно удалить, а хук всё ещё имеет смысл сам по себе, выделение сделано правильно.\n\nУ выделения есть предел. Хук, который принимает пять аргументов и возвращает пять значений, или хук, от которого вызывающий обязан передать пять кусков состояния, которые хук вполне мог бы владеть сам, — уже не инструмент, а компонент, поднятый на уровень выше с лишними шагами. Хорошие хуки принимают один-два параметра, обычно те, которые нельзя узнать изнутри, и прячут одну заботу.\n\nНаграда — логика становится тестируемой и переиспользуемой, но переиспользование обычно переоценивают. Хук, который использует ровно один компонент, всё равно стоит выделить, если он изолирует заботу: компонент становится понятнее. Хук, который используют три компонента с тремя слегка разными формами, — это сигнал, что формы надо было унифицировать сначала, а хук лишь замазывает различие.'
      ),
      bullets: [
        L('A custom hook is a function that calls hooks and starts with use.', 'Кастомный хук — функция, вызывающая хуки и начинающаяся с use.'),
        L('Move the logic, keep the markup in the component.', 'Логику переносите, разметку оставляйте в компоненте.'),
        L('Good hooks take one or two parameters and hide one concern.', 'Хорошие хуки принимают один-два параметра и прячут одну заботу.'),
        L('A hook used once is still worth extracting when it isolates a concern.', 'Хук, используемый один раз, всё равно стоит выделять, если он изолирует заботу.'),
        L('Hooks that need many parameters are components in disguise.', 'Хуки с кучей параметров — это компоненты под другим именем.'),
        L('The use prefix is a contract with the linter and the reader.', 'Префикс use — контракт с линтером и читателем.'),
      ],
      code: `import { useEffect, useState } from 'react';

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return online;
}

function StatusBadge() {
  const online = useOnlineStatus();
  return <span>{online ? 'online' : 'offline'}</span>;
}`,
      callouts: [
        {
          tone: 'tip',
          title: L('Name the concern', 'Называйте заботу'),
          text: L(
            'A hook called useSomething hides what it does. A hook called useOnlineStatus or useDebouncedValue tells the reader what problem it solves before they open the file, and that name is also the reason the linter accepts the call.',
            'Хук с именем useSomething прячет то, что делает. Хук с именем useOnlineStatus или useDebouncedValue ещё до открытия файла говорит читателю, какую задачу решает, и это же имя объясняет линтеру, почему вызов допустим.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The hook that drags the component along', 'Хук, который утащил компонент за собой'),
          text: L(
            'If the hook needs the component state as arguments and returns what the component renders, you have not extracted anything: you have written the same component twice. Extract a concern, not a rendering.',
            'Если хук требует состояние компонента аргументами и возвращает то, что компонент отрисовывает, вы ничего не вынесли: один и тот же компонент написан дважды. Выносите заботу, а не отрисовку.'
          ),
        },
      ],
      takeaway: L(
        'Extract the concern, keep the markup, and keep the hook narrow enough to explain in one sentence.',
        'Извлекайте заботу, оставляйте разметку и держите хук настолько узким, чтобы его можно было объяснить одним предложением.'
      ),
      seeAlso: [
        L('Section 8-2: the rules of hooks and why the linter enforces them', 'Секция 8-2: правила хуков и зачем их проверяет линтер'),
        L('Chapter 5: effects, cleanup and the dependency array', 'Глава 5: эффекты, очистка и массив зависимостей'),
      ],
    },
    {
      id: 'react-ch8-s2',
      title: L('The rules of hooks and why the linter enforces them', 'Правила хуков и зачем их проверяет линтер'),
      body: L(
        'React identifies state by call order, not by name. During the first render your component is called, and each useState call takes the next free slot in a list attached to that component. On the next render React calls the component again and reads the slots in the same order. If the number or the order of the calls changes between renders, the state that belonged to one hook ends up in the slot of another, and the component starts remembering the wrong things.\n\nTwo rules follow from that. Hooks must be called at the top level of a component or a custom hook, never inside a condition, a loop, a try block or a nested function. And the order of the calls must be the same on every render. The second rule is the reason the first one exists: a conditional hook changes the order, so the two rules are one rule expressed twice.\n\nThe rules exist so that React can be clever about rendering. Because the shape of the hooks is fixed, React can skip calling a component entirely when its props and state have not changed, and it can pause a render in the middle of the tree and resume it later. Conditional hooks would make the shape unpredictable and destroy both abilities. The rules are not a style preference, they are the contract that makes the renderer safe.\n\nThe eslint-plugin-react-hooks package checks exactly two things. The rules-of-hooks rule reports a hook called in a condition, a loop, a callback or a nested function, including a violation hidden inside a custom hook. The exhaustive-deps rule warns when the dependency array of an effect does not list everything the effect reads, which catches the stale closure that hides behind a wrong dependency list. The linter cannot prove your code is correct, but it catches the two mistakes that are invisible in review.',
        'React сопоставляет состояние с хуком по порядку вызовов, а не по имени. При первом рендере компонент вызывается, и каждый вызов useState занимает следующий свободный слот в списке, привязанном к этому компоненту. При следующем рендере React вызывает компонент снова и читает слоты в том же порядке. Если количество или порядок вызовов меняется между рендерами, состояние одного хука оказывается в слоте другого, и компонент начинает помнить не то.\n\nОтсюда два правила. Хуки вызываются на верхнем уровне компонента или кастомного хука, никогда внутри условия, цикла, блока try или вложенной функции. И порядок вызовов должен быть одинаковым при каждом рендере. Второе правило — причина первого: условный хук меняет порядок, поэтому это одно правило, сказанное дважды.\n\nПравила существуют, чтобы React мог быть умным при рендеринге. Поскольку форма хуков фиксирована, React может вообще не вызывать компонент, если его пропсы и состояние не менялись, и может приостановить рендер посреди дерева, а потом продолжить. Условные хуки сделали бы форму непредсказуемой и уничтожили обе способности. Правила — не стилистическое предпочтение, а контракт, который делает рендерер безопасным.\n\nПакет eslint-plugin-react-hooks проверяет ровно две вещи. Правило rules-of-hooks сообщает о вызове хука внутри условия, цикла, колбэка или вложенной функции, включая нарушение, спрятанное внутри кастомного хука. Правило exhaustive-deps предупреждает, когда в массив зависимостей эффекта не попало всё, что эффект читает, и этим ловит устаревшее замыкание, спрятанное за неверным списком зависимостей. Линтер не докажет корректность кода, но ловит две ошибки, невидимые при ревью.'
      ),
      bullets: [
        L('React matches state to a hook by call order, not by name.', 'React сопоставляет состояние хуку по порядку вызовов, а не по имени.'),
        L('Hooks run at the top level of a component or a custom hook.', 'Хуки вызываются на верхнем уровне компонента или кастомного хука.'),
        L('The order of hook calls must be identical on every render.', 'Порядок вызовов хуков должен быть одинаковым при каждом рендере.'),
        L('A conditional hook makes state follow the wrong slot.', 'Условный хук привязывает состояние к чужому слоту.'),
        L('Fixed hook order is what lets React skip and pause renders.', 'Фиксированный порядок хуков позволяет React пропускать и приостанавливать рендеры.'),
        L('eslint-plugin-react-hooks checks call order and dependency completeness.', 'eslint-plugin-react-hooks проверяет порядок вызовов и полноту зависимостей.'),
      ],
      code: `function Counter({ enabled }) {
  const [count, setCount] = useState(0);
  const [extra, setExtra] = useState(0);   // always called, same order

  const step = enabled ? extra : 1;

  return (
    <>
      <button onClick={() => setCount((c) => c + step)}>{count}</button>
      <button onClick={() => setExtra((e) => e + 1)}>extra: {extra}</button>
    </>
  );
}

// A conditional hook changes the order of the calls:
// if (enabled) { const [extra] = useState(0); }   // never do this`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The hook inside the condition', 'Хук внутри условия'),
          text: L(
            'When a hook appears only on some renders, React still expects the same number of slots. The state of the conditional hook slides into the slot of the next hook, and the value you read belongs to a different piece of state. The bug only appears on the render where the condition flips.',
            'Если хук появляется не на каждом рендере, React всё равно ждёт того же числа слотов. Состояние условного хука сдвигается в слот следующего хука, и значение, которое вы читаете, принадлежит другой части состояния. Баг проявляется только на том рендере, где условие переключилось.'
          ),
        },
        {
          tone: 'warning',
          title: L('Do not silence exhaustive-deps', 'Не отключайте exhaustive-deps'),
          text: L(
            'Disabling the dependency check turns a lint warning into a stale closure that appears weeks later. If the dependency really cannot be listed, restructure the effect so that it does not read anything volatile.',
            'Отключение проверки зависимостей превращает предупреждение линтера в устаревшее замыкание, которое всплывёт через несколько недель. Если зависимость действительно нельзя указать, перестройте эффект так, чтобы он не читал ничего изменчивого.'
          ),
        },
      ],
      takeaway: L(
        'Call hooks unconditionally and in the same order, because React stores state by call position.',
        'Вызывайте хуки безусловно и в одном порядке, потому что React хранит состояние по позиции вызова.'
      ),
      seeAlso: [
        L('Section 8-3: return shapes and stability of returned functions', 'Секция 8-3: форма возврата и стабильность функций'),
        L('Section 4-1: useState and the rules of state', 'Секция 4-1: useState и правила состояния'),
      ],
    },
    {
      id: 'react-ch8-s3',
      title: L('Return shapes: object versus tuple', 'Форма возврата: объект или кортеж'),
      body: L(
        'A hook returns whatever you make it return, and the choice of shape is an API decision. A tuple of two or three values is compact and destructures cleanly: const [value, setValue] = useToggle(). An object is self-documenting: const { value, toggle } = useToggle(). The object costs a little more to write and to destructure, and it survives a change in the number of returned values, because nobody depends on the order.\n\nThere is one trap with the tuple: consumers remember positions. If you later insert a value in the middle, every caller that used the old order silently reads the wrong slot, and nothing complains if the types happen to line up. Objects do not have this problem, which is why many libraries prefer them and why a hook that returns more than three or four values is usually better as an object.\n\nThe functions a hook returns raise the same identity question as any other function. A new function on every render breaks memoisation for every component that receives it, and it makes the dependency arrays of the effects that use it fire on every render. When the function is passed to a memoised child, or used inside an effect, wrap it in useCallback and list its real dependencies.\n\nDo not memoise everything. useCallback and useMemo cost a comparison on every render and create a place where stale dependencies can hide. Memoise a value when it is expensive to compute, or when its identity is observed by something that compares references. A handler attached to a plain button is observed by nothing, and useCallback on it is pure overhead.',
        'Хук возвращает то, что вы задумали вернуть, и выбор формы — это решение об API. Кортеж из двух-трёх значений компактен и красиво деструктурируется: const [value, setValue] = useToggle(). Объект самодокументирован: const { value, toggle } = useToggle(). Объект обходится чуть дороже при написании и деструктуризации, но переживает изменение количества возвращаемых значений, потому что никто не зависит от порядка.\n\nУ кортежа есть одна ловушка: вызывающие запоминают позиции. Если позже вставить значение в середину, каждый вызывающий, работавший по старому порядку, молча прочитает не тот слот, и ничего не пожалуется, если типы случайно совпадут. У объектов такой проблемы нет, поэтому многие библиотеки выбирают их, а хук, возвращающий больше трёх-четырёх значений, обычно лучше сделать объектом.\n\nФункции, которые возвращает хук, поднимают тот же вопрос об идентичности, что и любые другие функции. Новая функция при каждом рендере ломает мемоизацию у каждого получателя и заставляет срабатывать массивы зависимостей во всех эффектах, где она используется. Если функция передаётся в мемоизированный потомок или используется внутри эффекта, оберните её в useCallback и перечислите настоящие зависимости.\n\nНе мемоизируйте всё подряд. useCallback и useMemo стоят сравнения на каждом рендере и создают место, где прячутся устаревшие зависимости. Мемоизируйте значение, когда его вычислять дорого или когда его идентичность наблюдает кто-то, сравнивающий ссылки. Обработчик на обычной кнопке не наблюдает никто, и useCallback на нём — чистые накладные расходы.'
      ),
      bullets: [
        L('A tuple is compact but binds callers to the order of the values.', 'Кортеж компактен, но привязывает вызывающих к порядку значений.'),
        L('An object return survives adding or reordering values.', 'Объектный возврат переживает добавление и перестановку значений.'),
        L('A new function identity on every render defeats memoisation.', 'Новая идентичность функции на каждом рендере ломает мемоизацию.'),
        L('useCallback matters when the identity is compared by someone.', 'useCallback важен, когда идентичность сравнивает кто-то снаружи.'),
        L('Memoising everything adds cost and hides stale dependencies.', 'Мемоизация всего подряд добавляет затраты и прячет устаревшие зависимости.'),
        L('Prefer an object once a hook returns more than three values.', 'Когда хук возвращает больше трёх значений, лучше объект.'),
      ],
      code: `import { useCallback, useState } from 'react';

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle };
}

function Panel() {
  const { on, toggle } = useToggle();   // names, not positions
  return (
    <div>
      <button onClick={toggle}>{on ? 'hide' : 'show'}</button>
      {on && <Content />}
    </div>
  );
}`,
      table: {
        caption: L('Object or tuple', 'Объект или кортеж'),
        headers: [L('Aspect', 'Аспект'), L('Object', 'Объект'), L('Tuple', 'Кортеж')],
        rows: [
          [L('The caller reads it by', 'Вызывающий читает'), L('Name', 'Имя'), L('Position', 'Позиция')],
          [L('Adding a value later', 'Добавление значения позже'), L('Safe', 'Безопасно'), L('Breaks the callers', 'Ломает вызывающих')],
          [L('Typical mistake', 'Типичная ошибка'), L('Misspelled key', 'Опечатка в ключе'), L('Wrong slot', 'Не тот слот')],
          [L('Typical size', 'Типичный размер'), L('Three or more values', 'Три значения и больше'), L('Two or three values', 'Два-три значения')],
          [L('Cost', 'Цена'), L('A little more syntax', 'Чуть больше синтаксиса'), L('Minimal', 'Минимальная')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The tuple that grew', 'Кортеж, который вырос'),
          text: L(
            'Inserting a value in the middle of a tuple return breaks every caller that used the old order, and the failure is silent when the types match. When a hook starts returning three or four values, switch it to an object before the third one arrives.',
            'Вставка значения в середину кортежа ломает каждого вызывающего, работавшего по старому порядку, и при совпадении типов отказ проходит молча. Когда хук начинает возвращать три-четыре значения, переходите на объект до прихода третьего.'
          ),
        },
        {
          tone: 'tip',
          title: L('Memoise only what is observed', 'Мемоизируйте только то, за чем следят'),
          text: L(
            'useCallback earns its keep when the identity is compared by React.memo, by a dependency array or by a store subscription. A plain onClick handler on a plain button is compared by nobody.',
            'useCallback окупается, когда идентичность сравнивают React.memo, массив зависимостей или подписка на хранилище. Обычный onClick на обычной кнопке не сравнивает никто.'
          ),
        },
      ],
      takeaway: L(
        'Return an object once the values get ambiguous, and memoise a function only when its identity is compared.',
        'Возвращайте объект, когда значения становятся неоднозначными, и мемоизируйте функцию только тогда, когда её идентичность кто-то сравнивает.'
      ),
      seeAlso: [
        L('Section 10-2: memo, useMemo and useCallback', 'Секция 10-2: memo, useMemo и useCallback'),
        L('Section 8-4: sharing state versus sharing behaviour', 'Секция 8-4: общее состояние против общего поведения'),
      ],
    },
    {
      id: 'react-ch8-s4',
      title: L('Sharing state versus sharing behaviour', 'Общее состояние против общего поведения'),
      body: L(
        'A hook that calls useState gives every caller its own state. Two components that both call useCounter() have two independent counters, two separate pieces of state and two separate setters, and no amount of calling the hook in more places will make them share. State lives inside the component instance that created it, and a hook is just a piece of code that runs inside that instance.\n\nSharing behaviour is different. A hook that reads from a module-level store, or that subscribes to an external source such as a websocket, gives every caller the same behaviour without sharing React state. The state stays outside React, and the hook is a subscription to it. This is the pattern behind most global state libraries and behind the useSyncExternalStore approach.\n\nIf you want shared state inside React, you need a shared owner. A provider with useState at the top of the tree and a context that publishes it is the standard way: the state is created once by the provider and every consumer reads the same value through the context. The alternative is a module-level store with a subscription, which avoids re-rendering the whole tree but adds machinery of its own.\n\nChoose by what the state is. A counter in a dialog is local. The current user is global. A draft that three sibling panels edit is shared but small, and a context provider is a reasonable answer. A high-frequency value such as a cursor position or a drag offset belongs in a store with selectors, because a context update would repaint the whole subtree. Ask how many components read the value and how often it changes, and the answer follows.',
        'Хук, вызывающий useState, даёт каждому вызывающему своё состояние. Два компонента, вызывающие useCounter(), имеют два независимых счётчика, два отдельных куска состояния и два отдельных сеттера, и никакое количество вызовов хука в других местах не заставит их делиться. Состояние живёт внутри того экземпляра компонента, который его создал, а хук — просто код, выполняющийся внутри этого экземпляра.\n\nОбщее поведение — другое дело. Хук, читающий из хранилища на уровне модуля или подписанный на внешний источник вроде веб-сокета, даёт всем вызывающим одинаковое поведение, не разделяя состояние React. Состояние остаётся вне React, а хук оказывается подпиской на него. На этом построено большинство библиотек глобального состояния и подход useSyncExternalStore.\n\nЕсли нужно общее состояние внутри React, у него должен быть общий владелец. Провайдер с useState наверху дерева и контекст, который его публикует, — стандартный способ: состояние создаётся один раз провайдером, и все потребители читают одно и то же значение через контекст. Альтернатива — хранилище на уровне модуля с подпиской: оно не перерисовывает всё дерево, но требует собственной машинерии.\n\nВыбирайте по природе состояния. Счётчик в диалоге локальный. Текущий пользователь глобальный. Черновик, который правят три соседние панели, общий, но небольшой, и провайдер контекста здесь разумный ответ. Значение с высокой частотой — позиция курсора или смещение перетаскивания — живёт в хранилище с селекторами, потому что обновление контекста перерисовало бы всё поддерево. Спросите, сколько компонентов читают значение и как часто оно меняется, и ответ последует сам.'
      ),
      bullets: [
        L('Every caller of a hook with useState gets its own state.', 'Каждый вызывающий хука с useState получает своё состояние.'),
        L('A hook cannot make two component instances share state.', 'Хук не может сделать состояние общим для двух экземпляров компонента.'),
        L('A module-level store plus a subscription shares behaviour, not React state.', 'Хранилище на уровне модуля плюс подписка даёт общее поведение, а не общее состояние React.'),
        L('A provider owns shared state inside React and publishes it through context.', 'Провайдер владеет общим состоянием внутри React и публикует его через контекст.'),
        L('Local UI state belongs as close to its component as possible.', 'Локальное состояние интерфейса должно быть как можно ближе к своему компоненту.'),
        L('The update rate decides context versus a store with selectors.', 'Частота обновлений решает: контекст или хранилище с селекторами.'),
      ],
      code: `// Each caller of this hook gets its own counter
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, inc: () => setCount((c) => c + 1) };
}

// A module-level store shares one value between all callers
const store = {
  value: 0,
  listeners: new Set(),
  set(next) {
    this.value = next;
    this.listeners.forEach((fn) => fn());
  },
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  },
};`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The hook that was supposed to share', 'Хук, который должен был делиться'),
          text: L(
            'Two components calling the same stateful hook do not share its state, and no amount of moving the hook to another file changes that. If they must share, the state has to live in a provider or in a store, and the hook has to read it from there.',
            'Два компонента, вызывающие один и тот же хук с состоянием, не делятся этим состоянием, и перенос хука в другой файл тут ничего не меняет. Если им нужно общее состояние, оно должно жить в провайдере или в хранилище, а хук — читать его оттуда.'
          ),
        },
        {
          tone: 'tip',
          title: L('Move the state down before moving it up', 'Сначала опустите состояние, потом поднимайте'),
          text: L(
            'Most state that ends up in a global store started as state that was one level too high. If only two siblings need it, lifting it to their parent is enough, and no provider is required.',
            'Почти всё состояние, которое в итоге оказывается в глобальном хранилище, начиналось как состояние, поднятое на уровень выше нужного. Если оно нужно двум соседям, достаточно поднять его к их общему родителю, и провайдер не потребуется.'
          ),
        },
      ],
      takeaway: L(
        'A hook with useState gives every caller its own state; shared state needs a provider or a module-level store.',
        'Хук с useState даёт каждому вызывающему своё состояние; общее состояние требует провайдера или хранилища на уровне модуля.'
      ),
      seeAlso: [
        L('Section 7-3: splitting contexts by update frequency', 'Секция 7-3: разделение контекстов по частоте обновлений'),
        L('Section 4-6: colocation and normalised state', 'Секция 4-6: колокация и нормализованное состояние'),
      ],
    },
  ],
};
