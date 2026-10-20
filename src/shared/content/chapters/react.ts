import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactChapters: Chapter[] = [
  {
    id: 'react-ch1',
    title: L('The Rendering Model', 'Модель рендеринга'),
    summary: L(
      'How JSX turns into element descriptions, how React reconciles a new tree against the old one, and how props and composition shape a component.',
      'Как JSX превращается в описания элементов, как React сверяет новое дерево со старым и как props и композиция формируют компонент.'
    ),
    sections: [
      {
        id: 'react-ch1-s1',
        title: L('JSX and elements', 'JSX и элементы'),
        body: L(
          'React is a library for describing what the screen should look like for a given state. JSX is a syntax extension that lets you write that description as markup inside JavaScript. It is not a template language and not a string: a JSX expression compiles into a call that creates a plain object describing the element, and that object is what React works with. This is why you can build elements with ordinary JavaScript, pass them as props and return them from functions.\n\nAn element is an immutable description, not a live thing on the screen. It carries a type, props and a key, and it is cheap to create. The type is either a lowercase string, which becomes a host DOM element, or a component function, which React calls while rendering. Rendering walks the tree, calls every component, compares the result with the previous render and updates the DOM only where something changed.\n\nBecause an element is only a description, creating one puts nothing on the screen. The screen changes in two phases: React renders the new tree, computes the minimal set of DOM mutations and applies them. This two-phase model is why React can run rendering work in the background, interrupt it and keep the visible tree consistent even when an update is interrupted halfway through.',
          'React — библиотека для описания того, как должен выглядеть экран при определённом состоянии. JSX — синтаксическое расширение, позволяющее писать это описание как разметку внутри JavaScript. Это не язык шаблонов и не строка: выражение JSX компилируется в вызов, создающий обычный объект-описание элемента, и работает React именно с этим объектом. Отсюда и возможность строить элементы обычным JavaScript, передавать их как props и возвращать из функций.\n\nЭлемент — неизменяемое описание, а не живая часть экрана. В нём есть тип, props и key, и создаётся он дёшево. Тип — либо строка в нижнем регистре, которая становится DOM-элементом, либо функция-компонент, которую React вызывает во время рендеринга. Рендеринг обходит дерево, вызывает каждый компонент, сравнивает результат с предыдущим рендером и обновляет DOM только там, где что-то действительно изменилось.\n\nПоскольку элемент — лишь описание, сам по себе он ничего не выводит на экран. Экран меняется в две фазы: React рендерит новое дерево, вычисляет минимальный набор изменений DOM и применяет их. Эта двухфазная модель — причина того, что React умеет выполнять рендеринг в фоне, прерывать его и сохранять видимое дерево согласованным, даже если обновление прервалось на середине.'
        ),
        bullets: [
          L('JSX compiles to a function call that creates a plain object.', 'JSX компилируется в вызов функции, создающей обычный объект.'),
          L('An element is an immutable description of what should be on screen.', 'Элемент — неизменяемое описание того, что должно быть на экране.'),
          L('Lowercase tags become DOM elements, uppercase tags become components.', 'Теги в нижнем регистре — DOM-элементы, в верхнем — компоненты.'),
          L('Rendering computes the tree, committing applies the minimal DOM changes.', 'Рендеринг вычисляет дерево, а commit применяет минимальные изменения DOM.'),
        ],
        code: `const element = (
  <button className="btn" onClick={handleClick}>
    Save
  </button>
);

// compiles roughly into:
React.createElement('button', { className: 'btn', onClick: handleClick }, 'Save');`,
        takeaway: L(
          'JSX produces element descriptions, and React turns descriptions into DOM.',
          'JSX создаёт описания элементов, а React превращает описания в DOM.'
        ),
      },
      {
        id: 'react-ch1-s2',
        title: L('Reconciliation and keys', 'Сверка дерева и ключи'),
        body: L(
          'React does not rebuild the DOM on every update. It re-renders the component tree into a new description of the UI and diffs it against the previous one, a process called reconciliation. The strategy is simple: elements of the same type at the same position are considered the same component, their state is preserved, and only changed attributes are written to the DOM. Elements of a different type are unmounted and replaced.\n\nThat positional rule is why lists need keys. When the order changes, React compares children by position, so without a stable key the state of an item follows the position, not the item: a reordered list shows the first row value in the second row, and inputs appear to jump between rows. A key tells React which item is which, so it can move the DOM nodes instead of recreating them.\n\nA good key is stable, unique among siblings and derived from the data, most often an id from the server. The index is tempting and wrong whenever the list can be reordered, filtered or inserted in the middle, because the index describes a position that no longer identifies the item. Keys must be unique only among siblings, and they are not props: a component cannot read its own key.',
          'React не перестраивает DOM при каждом обновлении. Он заново рендерит дерево компонентов в новое описание интерфейса и сверяет его с предыдущим — это и называется сверкой. Стратегия простая: элементы одного типа на одной позиции считаются тем же компонентом, их состояние сохраняется, и в DOM пишутся только изменившиеся атрибуты. Элементы другого типа размонтируются и заменяются.\n\nИменно из-за этого позиционного правила спискам нужны ключи. Когда порядок элементов меняется, React сравнивает детей по позиции, и без устойчивого ключа состояние переезжает за позицией, а не за элементом: в переставленном списке значение первой строки оказывается во второй, и поля ввода словно прыгают между строками. Ключ — подсказка React, какой элемент есть какой, чтобы он переносил DOM-узлы, а не создавал их заново.\n\nХороший ключ устойчив, уникален среди соседей и берётся из данных, чаще всего это id с сервера. Индекс массива — соблазнительный, но неверный выбор, как только список переставляют, фильтруют или вставляют в середину: индекс описывает позицию, а она больше не идентифицирует элемент. Уникальность ключа нужна только среди соседей, и ключ не является props: компонент не может прочитать свой ключ из props.'
        ),
        bullets: [
          L('React re-renders the tree and applies only the differences to the DOM.', 'React перерисовывает дерево и применяет к DOM только различия.'),
          L('Elements of the same type at the same position keep their state.', 'Элементы одного типа на одной позиции сохраняют своё состояние.'),
          L('A key identifies an item, not its position in the list.', 'Ключ идентифицирует элемент, а не его позицию в списке.'),
          L('The array index is only safe when the order never changes.', 'Индекс массива безопасен только тогда, когда порядок не меняется.'),
        ],
        code: `function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}`,
        takeaway: L(
          'A key is an identity for an item, and using the array index makes identity depend on position.',
          'Ключ — это идентичность элемента, а индекс массива привязывает идентичность к позиции.'
        ),
      },
      {
        id: 'react-ch1-s3',
        title: L('Props, composition and controlled inputs', 'Props, композиция и управляемые поля'),
        body: L(
          'Props are the inputs of a component: an immutable, one-way description of what the parent wants the child to render. A component never mutates its props and should not hold state that mirrors a prop: that duplicates the source of truth. The usual pattern is to lift the state to the closest common parent and pass down the value and the function that changes it, keeping one owner for each piece of data.\n\nComposition replaces configuration with children. Instead of a component that takes a dozen boolean flags and assembles a layout, you pass the pieces in and let the caller arrange them. The children prop, and props like renderItem or header, let a parent decide the structure while the child keeps the behaviour, and that is why components stay small enough to reason about.\n\nAn input is controlled when its value comes from props and a setter is called on every change; it is uncontrolled when the DOM keeps the value and you read it with a ref. Controlled inputs give a single source of truth, validation and programmatic control, but they need a value and an onChange together, and a controlled input without onChange is a read-only field that logs a warning. Uncontrolled inputs are simpler for a file field or a form you submit once.',
          'Props — это входные данные компонента: неизменяемое одностороннее описание того, что родитель хочет видеть от ребёнка. Компонент никогда не мутирует свои props и не должен хранить состояние, зеркалящее prop: это заводит второй источник истины. Обычная схема — поднять состояние к ближайшему общему родителю и передать вниз и значение, и функцию, которая его меняет, чтобы у каждой единицы данных оставался один владелец.\n\nКомпозиция заменяет конфигурирование детьми. Вместо компонента с десятком булевых флагов, который сам собирает разметку, вы передаёте куски внутрь и позволяете вызывающему их расставить. Проп children, а также пропсы вроде renderItem или header позволяют родителю решать структуру, а ребёнку — оставлять поведение, и это причина того, что компоненты React остаются достаточно маленькими, чтобы их можно было проследить.\n\nПоле ввода управляемое, когда значение приходит из props, а при каждом изменении вызывается сеттер, и неуправляемое, когда значение хранит сам DOM и вы читаете его через ref. Управляемое поле даёт единый источник истины, валидацию и программный контроль, но требует value и onChange вместе: управляемое поле без onChange — это поле только для чтения с предупреждением в консоли. Неуправляемые проще для выбора файла или формы, отправляемой один раз.'
        ),
        bullets: [
          L('Props are immutable and flow one way, from parent to child.', 'Props неизменяемы и передаются в одном направлении: от родителя к ребёнку.'),
          L('Lift state up instead of mirroring a prop inside the child.', 'Поднимай состояние вверх, а не дублируй prop внутри ребёнка.'),
          L('Composition through children beats a long list of mode flags.', 'Композиция через children лучше длинного списка флагов режима.'),
          L('A controlled input needs a value and an onChange handler together.', 'Управляемому полю нужны value и onChange вместе.'),
        ],
        code: `function SearchField({ value, onChange, children }) {
  return (
    <label>
      {children}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

// uncontrolled
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="text" />`,
        takeaway: L(
          'Keep one owner for each piece of state, and let the parent decide the structure through composition.',
          'У каждого состояния должен быть один владелец, а структуру задаёт родитель через композицию.'
        ),
      },
    ],
  },
  {
    id: 'react-ch2',
    title: L('State', 'Состояние'),
    summary: L(
      'How state is owned and updated, why a setter schedules rather than changes, and when to derive a value instead of storing it.',
      'Как состояние принадлежит компоненту и обновляется, почему сеттер планирует, а не меняет, и когда значение стоит вычислить, а не хранить.'
    ),
    sections: [
      {
        id: 'react-ch2-s1',
        title: L('useState and the rules of state', 'useState и правила состояния'),
        body: L(
          'useState returns a pair: the current value and a function that schedules an update. The component re-renders with the new value when React processes the update, and the setter captured by the current render is replaced by the one from the new render. State is per component instance: two components of the same type keep two independent copies, and a remounted component starts from the initial value.\n\nThe rules of state are short. Call useState only at the top level of a component or a custom hook, never inside a condition, a loop or a nested function. Never call it after an early return, because the number of hooks must be the same on every render. React identifies each hook by its position in the list, so skipping one shifts every hook after it and the state ends up attached to the wrong call.\n\nUpdates in React are not applied immediately. Calling a setter schedules a re-render, and React batches updates that happen in the same event handler into one render. That batching is why calling setCount twice in a handler does not produce two renders, and why reading the state right after a setter call still gives the old value: the variable belongs to the render on the screen and changes only when React commits the new one.',
          'useState возвращает пару: текущее значение и функцию, которая планирует обновление. Компонент перерисовывается с новым значением, когда React обработает обновление, а сеттер, захваченный текущим рендером, заменяется сеттером из нового. Состояние принадлежит экземпляру компонента: два компонента одного типа держат две независимые копии, а размонтированный и смонтированный заново компонент начинает с начального значения.\n\nПравил состояния немного. useState вызывают только на верхнем уровне компонента или кастомного хука, никогда внутри условия, цикла или вложенной функции. Нельзя вызывать его после раннего возврата: количество хуков должно быть одинаковым на каждом рендере. React опознаёт каждый хук по его позиции в списке, поэтому пропуск одного сдвигает все последующие, и состояние приклеивается не к тому вызову.\n\nОбновления в React применяются не сразу. Вызов сеттера планирует перерисовку, и React группирует несколько обновлений, случившихся в одном обработчике события, в один рендер. Из-за этой группировки два вызова setCount в одном обработчике не дают двух рендеров, и из-за неё же чтение переменной состояния сразу после вызова сеттера даёт старое значение: переменная принадлежит рендеру, который сейчас на экране, и меняется только тогда, когда React применяет новый.'
        ),
        bullets: [
          L('State belongs to a component instance, not to the component type.', 'Состояние принадлежит экземпляру компонента, а не типу.'),
          L('Hooks must be called unconditionally, in the same order, on every render.', 'Хуки вызываются безусловно, в одном порядке, на каждом рендере.'),
          L('Calling a setter schedules an update, it does not change the variable.', 'Вызов сеттера планирует обновление, а не меняет переменную.'),
          L('React batches updates that happen in the same event.', 'React группирует обновления, случившиеся в одном событии.'),
        ],
        code: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);   // scheduled with the current value
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
        takeaway: L(
          'State is a value owned by a component instance, and a setter schedules a render rather than changing anything on the spot.',
          'Состояние — это значение, принадлежащее экземпляру компонента, а сеттер планирует рендер, а не меняет всё немедленно.'
        ),
      },
      {
        id: 'react-ch2-s2',
        title: L('Functional updates and state as a snapshot', 'Функциональные обновления и состояние как снимок'),
        body: L(
          'Each render receives its own snapshot of the props and the state. The snapshot does not change while the component renders, nor when a setter is called: a new snapshot appears only when React renders the component again. This is why a closure over count captured in an event handler still sees the count from the render that created it, even if the state changed elsewhere.\n\nThe functional form of the setter exists for this situation. Instead of setCount(count + 1) you write setCount((c) => c + 1), and the function receives the latest queued value rather than the current one. The same rule applies to any state that depends on the previous one, including arrays and objects: setItems((prev) => [...prev, item]) always adds to the newest list, while setItems([...items, item]) adds to the list captured in the render that created the handler.\n\nObjects and arrays are replaced, not merged. Calling a setter with a new object creates a new reference, and React re-renders because the reference changed. Mutating the object in place keeps the same reference, React cannot notice the change, and the component does not re-render. Update the top level: setUser({ ...user, city: "Berlin" }) creates a new object and re-renders, whereas user.city = "Berlin" changes the old reference and does nothing.',
          'Каждый рендер получает свой снимок props и состояния. Во время рендера снимок не меняется и не меняется от вызова сеттера: новый снимок появляется только тогда, когда React рендерит компонент заново. Поэтому замыкание над count, захваченное в обработчике события, видит то значение, которое было в рендере, создавшем этот обработчик, даже если состояние уже изменилось в другом месте.\n\nФункциональная форма сеттера существует ровно для этого случая. Вместо setCount(count + 1) пишут setCount((c) => c + 1), и функция получает последнее значение из очереди, а не значение текущего рендера. То же правило действует для любого состояния, зависящего от предыдущего, включая массивы и объекты: setItems((prev) => [...prev, item]) всегда добавляет к самому свежему списку, а setItems([...items, item]) — к списку, захваченному в том рендере, который создал обработчик.\n\nОбъекты и массивы заменяются, а не сливаются. Вызов сеттера с новым объектом создаёт новую ссылку, и React перерисовывает компонент, потому что ссылка изменилась. Мутация объекта на месте оставляет ссылку прежней, React не может заметить изменение, и перерисовки не будет. Обновляйте верхний уровень: setUser({ ...user, city: "Berlin" }) создаёт новый объект и вызывает рендер, а user.city = "Berlin" меняет старую ссылку и не делает ничего.'
        ),
        bullets: [
          L('Every render gets its own snapshot of props and state.', 'Каждый рендер получает свой снимок props и состояния.'),
          L('The functional setter always sees the newest queued value.', 'Функциональный сеттер всегда видит последнее значение в очереди.'),
          L('State is replaced, never merged, so updates must spread the old value.', 'Состояние заменяется, а не сливается, поэтому обновляй через spread.'),
          L('Mutating an object in place does not trigger a re-render.', 'Мутация объекта на месте не вызывает повторный рендер.'),
        ],
        code: `const [items, setItems] = useState([]);

// stale: uses the array captured in this render
const addStale = () => setItems([...items, newItem]);

// correct: uses the latest array
const add = () => setItems((prev) => [...prev, newItem]);`,
        takeaway: L(
          'When a new value depends on the old one, use the functional form of the setter.',
          'Когда новое значение зависит от старого, используй функциональную форму сеттера.'
        ),
      },
      {
        id: 'react-ch2-s3',
        title: L('Derived state and useReducer', 'Производное состояние и useReducer'),
        body: L(
          'Some values should not be stored. A filtered list, a total, a validity flag: all of them can be computed from the state and props during the render. Storing them creates a second source of truth to sync by hand, and the classic bug is a filter showing a stale result because the state was not updated in the same place. The rule is simple: if a value can be derived, compute it in the component body.\n\nuseReducer is the alternative when several pieces of state change together. Instead of several setters, you describe a reducer: a pure function from state and action to the next state. The component dispatches actions, React applies the reducer during the next render, and the rules of the transition live there. Because it is a function and not an object, the state cannot be mutated by accident, and the reducer can be tested on its own.\n\nThe practical difference is the shape of the code. useState suits a single independent value; useReducer suits a state machine with several fields and clear transitions, where action names document the possible changes. Reducers also help when logic must be reused, since they can be exported and tested. The cost is indirection, and a reducer that is too big hides as much as it clarifies.',
          'Некоторые значения хранить вообще не нужно. Отфильтрованный список, сумма, флаг валидности — всё это вычисляется из состояния и props прямо во время рендера. Хранение создаёт второй источник истины, который приходится синхронизировать руками, а классическая ошибка — фильтр, показывающий устаревший результат, потому что состояние обновили не в том месте. Правило простое: если значение выводится из props и состояния, вычисляй его в теле компонента и передавай вниз.\n\nuseReducer — альтернатива, когда несколько частей состояния меняются вместе. Вместо нескольких сеттеров вы описываете reducer: чистую функцию, которая принимает текущее состояние и действие и возвращает следующее. Компонент отправляет действия, React применяет reducer во время следующего рендера, и в reducer живут правила перехода. Поскольку reducer — функция, а не объект, состояние нельзя случайно изменить, а сам reducer можно протестировать отдельно, без рендера.\n\nПрактическая разница — в форме кода. useState годится для одного независимого значения; useReducer — для машины состояний с несколькими полями и ясными переходами, где имена действий документируют возможные изменения. Reducer удобен и тогда, когда одну и ту же логику нужно переиспользовать: его можно вынести в отдельный модуль и покрыть юнит-тестами. Цена — лишняя косвенность, а слишком большой reducer прячет столько же, сколько проясняет, поэтому на одну машину состояний нужен один reducer.'
        ),
        bullets: [
          L('If a value can be computed during render, do not store it in state.', 'Если значение вычисляется во время рендера, не храни его в состоянии.'),
          L('A reducer is a pure function from state and action to the next state.', 'Reducer — чистая функция из состояния и действия в следующее состояние.'),
          L('Reducers can be tested without rendering the component.', 'Reducer можно протестировать без рендера компонента.'),
          L('Use useReducer when several fields change together and the transitions matter.', 'Используй useReducer, когда меняются несколько полей и важны переходы.'),
        ],
        code: `function reducer(state, action) {
  switch (action.type) {
    case 'added':
      return { ...state, items: [...state.items, action.item] };
    case 'removed':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { items: [] });`,
        takeaway: L(
          'Derive what you can and keep state for what you cannot compute; when several fields move together, describe the moves as a reducer.',
          'Вычисляй всё, что можно, и храни только то, что вычислить нельзя; а когда несколько полей меняются вместе, описывай переходы reducer-ом.'
        ),
      },
    ],
  },
  {
    id: 'react-ch3',
    title: L('Effects, Refs and Context', 'Эффекты, ref-ы и контекст'),
    summary: L(
      'What an effect is for, how cleanup and stale closures break things, and how context and custom hooks share data and behaviour down the tree.',
      'Зачем нужны эффекты, как ломают всё очистка и устаревшие замыкания, и как контекст и кастомные хуки делят данные и поведение по дереву.'
    ),
    sections: [
      {
        id: 'react-ch3-s1',
        title: L('The effect lifecycle and dependencies', 'Жизненный цикл эффекта и зависимости'),
        body: L(
          'An effect is a function React runs after the component is rendered to the DOM. It exists for synchronising with something outside React: a subscription, a timer, a DOM measurement, a request that writes to a component, a logger. The lifecycle is: render, commit to the DOM, run the effect, and before the next run, run its cleanup. An effect without a cleanup simply runs again.\n\nThe dependency array tells React what the effect depends on. React compares it with the array from the previous render, element by element, and re-runs the effect only if something changed. The comparison uses Object.is, so an object created inline during the render is a new reference every time and the effect re-runs every time. That is why the standard advice is to move such values outside the component or memoise them, not to suppress the warning.\n\nThe rule of thumb: an effect describes synchronisation, not computation. If a value can be calculated from props and state, calculate it while rendering. If the effect only sets state in response to a prop change, you usually do not need it: derive the value while rendering and adjust the state only when the user changed it. Effects that merely mirror props into state are the most common source of extra renders and subtle bugs.',
          'Эффект — это функция, которую React запускает после того, как компонет отрендерился в DOM. Он нужен для синхронизации с тем, что лежит вне React: подпиской, таймером, ручным измерением DOM, сетевым запросом, который пишет в компонент, подключением к логгеру. Жизненный цикл такой: рендер, применение в DOM, запуск эффекта, а перед следующим его запуском — запуск функции очистки. Эффект без очистки просто запускается заново.\n\nМассив зависимостей говорит React, от чего зависит эффект. React сравнивает его с массивом прошлого рендера поэлементно и перезапускает эффект, только если что-то изменилось. Сравнение идёт через Object.is, поэтому объект или массив, созданный прямо во время рендера, — новая ссылка каждый раз, и эффект перезапускается каждый раз. Отсюда стандартный совет: выносить такие значения за пределы компонента или мемоизировать, а не отключать предупреждение.\n\nПравило большого пальца: эффект описывает синхронизацию, а не вычисление. Если значение выводится из props и состояния, вычисляйте его во время рендера. Если эффект только ставит состояние в ответ на изменение prop, чаще всего он не нужен вовсе: выведите значение при рендере и скорректируйте состояние в редком случае, когда значение менял пользователь. Эффекты, которые просто зеркалят props в состояние, — самая частая причина лишних рендеров и неочевидных ошибок.'
        ),
        bullets: [
          L('An effect synchronises with something outside React.', 'Эффект синхронизирует React с чем-то вне него.'),
          L('React re-runs an effect only when a dependency changes by Object.is.', 'React перезапускает эффект, только если зависимость изменилась по Object.is.'),
          L('Objects created during the render are new references every time.', 'Объекты, созданные во время рендера, — новые ссылки каждый раз.'),
          L('If a value can be derived, derive it instead of storing it in an effect.', 'Если значение можно вычислить, вычисляй его, а не храни в эффекте.'),
        ],
        code: `useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(id);
}, []);   // empty: run once on mount, clean up on unmount`,
        takeaway: L(
          'An effect is for synchronising with the outside world; anything that can be computed belongs in the render.',
          'Эффект — для синхронизации с внешним миром; всё, что можно вычислить, считается прямо в рендере.'
        ),
      },
      {
        id: 'react-ch3-s2',
        title: L('Cleanup, stale closures and layout effects', 'Очистка, устаревшие замыкания и layout-эффекты'),
        body: L(
          'Every effect that starts something must return a function that stops it. The cleanup runs before the next execution of the effect and when the component unmounts, preventing duplicated subscriptions, timers that fire after the screen is gone, and requests that update a dead component. React 18 made this safer in development by running the cleanup an extra time in StrictMode, so a missing one surfaces at once.\n\nA stale closure is the classic effect bug: the function captured props or state from the render that created it and keeps using them after the state changed. There are three ways out. Add the value to the dependency array, the honest fix. Use a functional state update inside the effect, which reads the latest value without capturing it. Or keep the latest value in a ref and read it inside the effect: the right tool when the subscription must not be recreated but the handler must see fresh data.\n\nuseLayoutEffect runs like useEffect but before the browser paints. Use it when you must read a measurement and apply a change based on it: measuring a node and setting a height that would otherwise jump. It blocks painting, so keep it short. useEffect runs after the paint, the right choice for data fetching and work the user does not need to see.',
          'Каждый эффект, который что-то запускает, обязан вернуть функцию, которая это останавливает. Очистка выполняется перед следующим запуском того же эффекта и при размонтировании компонента, и это защищает от задвоенных подписок, таймеров, которые тикают после ухода с экрана, и запросов, обновляющих уже несуществующий компонент. React 18 в режиме разработки делает это настойчивее: в StrictMode функция очистки выполняется дополнительно, и забытая очистка обнаруживается сразу, а не в проде.\n\nУстаревшее замыкание — классическая ошибка эффекта: функция захватила props или состояние из того рендера, в котором была создана, и продолжает использовать их, даже когда состояние давно изменилось. Выходов три. Добавить значение в массив зависимостей — честное решение. Использовать функциональное обновление состояния внутри эффекта — оно читает последнее значение, ничего не захватывая. Или использовать ref, хранящий последнее значение, и читать ref внутри эффекта: это верный инструмент, когда сама подписка не должна пересоздаваться, а обработчик обязан видеть свежие данные.\n\nuseLayoutEffect работает так же, как useEffect, но до отрисовки браузером. Его применяют, когда нужно снять измерение и применить зависящее от него изменение, например измерить узел и задать высоту, иначе пользователь увидит заметный скачок. Он блокирует отрисовку, поэтому должен быть коротким. useEffect выполняется после отрисовки — это верный выбор для загрузки данных и любой работы, которую пользователю видеть не нужно.'
        ),
        bullets: [
          L('Every effect that starts something must return a cleanup function.', 'Каждый эффект, который что-то запускает, должен возвращать функцию очистки.'),
          L('A stale closure keeps the values from the render that created it.', 'Устаревшее замыкание хранит значения того рендера, который его создал.'),
          L('A ref keeps the latest value without recreating the subscription.', 'Ref хранит актуальное значение, не пересоздавая подписку.'),
          L('useLayoutEffect blocks painting, so keep it short.', 'useLayoutEffect блокирует отрисовку, поэтому держи его коротким.'),
        ],
        code: `const latest = useRef(null);
latest.current = value;

useEffect(() => {
  const handler = (e) => console.log(latest.current);
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}, []);   // the subscription is stable, the handler reads fresh data`,
        takeaway: L(
          'Clean up what you start, and when a callback must see fresh values, read them from a ref instead of capturing them.',
          'Убирай то, что запустил, и если колбэк должен видеть свежие значения, читай их из ref, а не захватывай.'
        ),
      },
      {
        id: 'react-ch3-s3',
        title: L('Context, custom hooks and the rules of hooks', 'Контекст, кастомные хуки и правила хуков'),
        body: L(
          'Context passes a value down the tree without threading it through every component as a prop. A provider puts the value where descendants can read it, and useContext reads the nearest above. The value is not reactive by itself: when it changes, React re-renders the consumers, and since the value usually lives in the provider state, the whole subtree re-renders too. That is why the provider should keep the value stable, for example with useMemo.\n\nA custom hook is a function that starts with use and calls hooks. It extracts a piece of behaviour so it can be reused and tested independently of the tree: useOnlineStatus, useLocalStorage, useFetch. Because it is an ordinary function, it obeys the same rules of hooks: call it unconditionally at the top level, never inside a condition, a loop or a callback.\n\nThe rules of hooks exist because React identifies hooks by position in the call order. The dispatcher must see the same number of hooks in the same order on every render, otherwise it cannot tell which state belongs to which call. A hook inside a condition would change that count, so React would keep the wrong state, and a hook in a loop would change the order between renders. The linter rule of exhaustive dependencies catches the most common of these mistakes.',
          'Контекст передаёт значение вниз по дереву, не протаскивая его через каждый компонент как prop. Провайдер кладёт значение туда, где его прочитает любой потомок, а useContext берёт ближайшего выше. Само по себе значение не реактивно: когда оно меняется, React перерисовывает потребителей, а поскольку значение обычно живёт в состоянии провайдера, перерисовывается всё поддерево. Поэтому провайдеру стоит держать значение стабильным, например обернув его в useMemo, и контекст не заменяет библиотеку состояния в большом приложении.\n\nКастомный хук — это функция, имя которой начинается с use и которая вызывает другие хуки. Он вытаскивает кусок поведения, чтобы его можно было переиспользовать и протестировать отдельно от дерева компонентов: useOnlineStatus, useLocalStorage, useFetch. Поскольку это обычная функция, на неё распространяются те же правила хуков: вызывайте безусловно на верхнем уровне, никогда внутри условия, цикла или колбэка. Имя с use — соглашение, но его проверяет линтер, и оно сообщает читателю, что функция может использовать хуки.\n\nПравила хуков существуют потому, что React опознаёт хуки по их позиции в порядке вызовов компонента. Диспетчер должен видеть одинаковое число хуков в одинаковом порядке на каждом рендере, иначе он не поймёт, какому вызову принадлежит состояние. Хук внутри условия изменил бы это число, и React оставил бы состояние у неверного вызова. Хук в цикле менял бы порядок между рендерами, а хук внутри обработчика события запрещён. Правило линтера про полный набор зависимостей ловит самые частые из этих ошибок.'
        ),
        bullets: [
          L('Context removes prop drilling, but consumers re-render when the value changes.', 'Context убирает prop drilling, но потребители перерисовываются при смене значения.'),
          L('Keep the context value stable with useMemo.', 'Держи значение контекста стабильным через useMemo.'),
          L('A custom hook is a function that calls hooks and starts with use.', 'Кастомный хук — функция, вызывающая хуки и начинающаяся с use.'),
          L('Hooks must be called unconditionally, in a stable order, at the top level.', 'Хуки вызываются безусловно, в стабильном порядке, на верхнем уровне.'),
        ],
        code: `const ThemeContext = createContext('light');

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);
  return online;
}`,
        takeaway: L(
          'Context shares a value down the tree, custom hooks share behaviour, and both work only when the rules of hooks are respected.',
          'Context делится значением по дереву, кастомные хуки — поведением, и обе вещи работают только при соблюдении правил хуков.'
        ),
      },
    ],
  },
  {
    id: 'react-ch4',
    title: L('Performance, Forms and Modern React', 'Производительность, формы и современный React'),
    summary: L(
      'When memoisation is worth it, how transitions and virtualisation keep the interface responsive, and how Suspense, error boundaries and server components change the picture.',
      'Когда мемоизация окупается, как transitions и виртуализация сохраняют отзывчивость, и что меняют Suspense, error boundary и серверные компоненты.'
    ),
    sections: [
      {
        id: 'react-ch4-s1',
        title: L('memo, useMemo and useCallback', 'memo, useMemo и useCallback'),
        body: L(
          'memo wraps a component so React re-renders it only when its props change. The comparison is shallow and uses Object.is, so an inline object or function in the props is a new reference on every render of the parent and defeats the optimisation. This is the classic mistake: wrapping a component in memo and passing it an inline arrow function.\n\nuseMemo and useCallback are the primitives under that hood. useMemo computes a value once and keeps it while the dependencies do not change; useCallback keeps the identity of a function stable, and is implemented as useMemo returning the function. Both are caches with a dependency list, and both cost something: they store the value, compare dependencies every render and make the code harder to follow. Use them when a value is expensive to compute or when its identity matters.\n\nBefore optimising, measure. The React DevTools profiler shows which components re-render and why, and most performance problems come from a state update high in the tree or an effect that runs too often, not from rendering itself. The order of work is: fix the architecture, move the state closer to where it is used, split a component so unrelated parts do not re-render together, and only then add memo.',
          'memo оборачивает компонент так, что React перерисовывает его только при изменении props. Сравнение поверхностное и идёт через Object.is, поэтому объект или функция, созданные прямо в props, — новая ссылка на каждом рендере родителя и полностью обесценивают оптимизацию. Это классическая ошибка: завернуть компонент в memo и тут же передать ему стрелочную функцию — обёртка бесполезна, а накладные расходы остались.\n\nuseMemo и useCallback — это кирпичики под ней. useMemo вычисляет значение один раз и хранит его, пока не поменяются зависимости; useCallback сохраняет стабильную идентичность функции и устроен как useMemo, возвращающий функцию. Оба — кэши со списком зависимостей, и у обоих есть цена: они занимают память, сравнивают зависимости на каждом рендере и делают код тяжелее для чтения. Применяйте их там, где значение действительно дорого вычислить или где важна идентичность, например при передаче мемоизированному ребёнку или как зависимости эффекта.\n\nПрежде чем оптимизировать, измерьте. Профилировщик React DevTools показывает, какие компоненты перерисовываются и почему, и большинство проблем с производительностью приходит от обновления состояния высоко по дереву или от эффекта, который срабатывает слишком часто, а не от самого рендеринга. Порядок работы такой: починить архитектуру, приблизить состояние к месту использования, разделить компонент так, чтобы несвязанные части не перерисовывались вместе, и только потом добавлять обёртки memo.'
        ),
        bullets: [
          L('memo compares props shallowly, so inline functions defeat it.', 'memo сравнивает props поверхностно, поэтому инлайн-функции его обесценивают.'),
          L('useCallback is useMemo for a function.', 'useCallback — это useMemo для функции.'),
          L('Both caches cost memory and a dependency comparison on every render.', 'Оба кэша стоят памяти и сравнения зависимостей на каждом рендере.'),
          L('Profile first: the problem is often the shape of the tree, not the rendering.', 'Сначала профилируй: проблема часто в форме дерева, а не в рендере.'),
        ],
        code: `const Row = memo(function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.title}</li>;
});

function List({ items, onSelect }) {
  const handleSelect = useCallback((id) => setOpen(id), []);
  return <ul>{items.map((i) => <Row key={i.id} item={i} onSelect={handleSelect} />)}</ul>;
}`,
        takeaway: L(
          'Optimise only what the profiler shows, and make sure the props you memoise have a stable identity.',
          'Оптимизируй только то, что показал профилировщик, и следи, чтобы у мемоизируемых props была стабильная ссылка.'
        ),
      },
      {
        id: 'react-ch4-s2',
        title: L('Transitions, deferred values and virtualization', 'Transitions, отложенные значения и виртуализация'),
        body: L(
          'Not every update has to block the user. useTransition marks an update as non-urgent: React keeps the current screen, renders the new one in the background and swaps it in when ready. Inside a transition the reading of the state is deferred, and useDeferredValue does the same for one value, exactly what a search field needs: the input stays responsive and the expensive list updates a moment later.\n\nOnly one transition can run at a time, and the state inside it is a snapshot that may lag behind. This is not a bug but the price of responsiveness: if the user types another character while the list is computed, React keeps the previous result and starts again with the new input. Transitions do not make computation faster, they make the interface feel fast, and they are useless for the update the user waits for.\n\nVirtualisation attacks a different problem: a list of ten thousand rows creates ten thousand DOM nodes, and the browser cannot lay them out quickly. A virtualised list renders only the visible rows plus a small buffer, and the container gets a total height with spacers above and below. The result is a list of any size that costs the same as a list of thirty rows, at the price of losing native scrolling.',
          'Не каждое обновление обязано блокировать пользователя. useTransition помечает обновление как неважное: React оставляет текущий экран на месте, рендерит новый в фоне и подменяет его, когда тот готов. Внутри transition чтение состояния откладывается, а useDeferredValue делает то же для одного значения — именно это и нужно поисковому полю: ввод остаётся отзывчивым, а дорогой список обновляется чуть позже.\n\nПравило: одновременно может идти только один transition, а состояние внутри него — снимок, который может отставать. Это не баг, а цена отзывчивости: если пользователь введёт ещё символ, пока считается список, React оставит прежний результат и начнёт заново с новым вводом. Transitions не ускоряют вычисления, они делают интерфейс быстрым на ощупь, и они бесполезны для того обновления, которого пользователь ждёт.\n\nВиртуализация бьёт по другой проблеме: список из десяти тысяч строк создаёт десять тысяч DOM-узлов, и браузер не может быстро их разместить. Виртуализированный список рисует только видимые строки плюс небольшой запас, а контейнеру задаёт общую высоту с распорками сверху и снизу. В итоге список любого размера стоит столько же, сколько список из тридцати строк, но ценой отказа от родной прокрутки и необходимости аккуратно измерять высоту строк.'
        ),
        bullets: [
          L('A transition keeps the current UI responsive while the next one is prepared.', 'Transition сохраняет отзывчивость текущего интерфейса, пока готовится следующий.'),
          L('State read inside a transition is a snapshot and may lag behind.', 'Состояние внутри transition — снимок, оно может отставать.'),
          L('Transitions do not speed up computation, they change its priority.', 'Transition не ускоряет вычисления, он меняет их приоритет.'),
          L('Virtualisation renders only the visible rows of a long list.', 'Виртуализация рисует только видимые строки длинного списка.'),
        ],
        code: `const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;

const results = useMemo(
  () => search(items, deferredQuery),
  [items, deferredQuery]
);

return <Results items={results} dimmed={isStale} />;`,
        takeaway: L(
          'Use a deferred value to keep the input responsive, and virtualise when the list itself is too long to render.',
          'Отложенное значение держит поле ввода отзывчивым, а виртуализация нужна, когда список слишком велик для рендера.'
        ),
      },
      {
        id: 'react-ch4-s3',
        title: L('Suspense, error boundaries, server components and testing', 'Suspense, error boundary, серверные компоненты и тесты'),
        body: L(
          'Suspense wraps a part of the tree that may not be ready. While the children load, React renders the fallback and the rest of the page stays interactive. React.lazy splits a component into a chunk fetched on demand, and the pair is the standard way to load code lazily: the chunk is requested on first render, and the fallback shows until it arrives.\n\nAn error boundary catches errors thrown while rendering its subtree and shows a fallback instead of unmounting the app. It must be a class component: error boundaries rely on legacy lifecycle methods. A boundary does not catch errors in event handlers or async code; those must be caught where they happen. In practice it is placed high enough to protect the page and low enough to keep the rest usable.\n\nServer components run on the server and produce output for the client, so they can read a database directly and ship no JavaScript. They cannot use hooks like useState or useEffect, nor pass functions to the client, so every prop crossing the boundary must be serialisable. A client component is marked with the use client directive, and that is where interactivity lives. Testing means two things: unit tests for hooks and pure functions, and integration tests that render the component and use it like a user.',
          'Suspense оборачивает часть дерева, которая может быть ещё не готова. Пока дети загружаются, React рисует fallback, а остальная страница остаётся интерактивной. React.lazy выносит компонент в отдельный чанк, который подгружается по требованию, и в сочетании это стандартный способ ленивой загрузки кода: чанк запрашивается при первом рендере компонента, а fallback показывается до его прихода. И то и другое работает и на сервере, и на клиенте.\n\nError boundary перехватывает ошибки, возникшие при рендере его поддерева, и показывает fallback вместо того, чтобы размонтировать всё приложение. Это обязан быть классовый компонент: error boundary опираются на устаревшие lifecycle-методы, которые хуки не заменяют. Boundary не ловит ошибки в обработчиках событий и в асинхронном коде, их надо ловить там, где они возникли. На практике boundary ставят достаточно высоко, чтобы защитить страницу, и достаточно низко, чтобы остальное приложение осталось рабочим.\n\nСерверные компоненты выполняются на сервере и производят вывод для клиента, поэтому могут напрямую читать базу и не отправляют JavaScript за себя. Они не могут использовать хуки вроде useState или useEffect и не могут передавать функции на клиент, так что любой prop через границу должен быть сериализуемым. Клиентский компонент помечается директивой use client, и именно в нём живёт интерактивность. Тестирование React-приложения — это две разные вещи: юнит-тесты хуков и чистых функций и интеграционные тесты, которые рендерят компонент и работают с ним как пользователь, проверяя то, что появилось на экране.'
        ),
        bullets: [
          L('Suspense shows a fallback while a part of the tree is not ready.', 'Suspense показывает заглушку, пока часть дерева не готова.'),
          L('An error boundary needs a class component and only catches render errors.', 'Error boundary требует классовый компонент и ловит только ошибки рендера.'),
          L('Server components ship no JavaScript and cannot hold interactive state.', 'Server-компоненты не отправляют JavaScript и не могут хранить интерактивное состояние.'),
          L('Integration tests assert on what the user sees, not on internal state.', 'Интеграционные тесты проверяют то, что видит пользователь, а не внутреннее состояние.'),
        ],
        code: `const Chart = lazy(() => import('./Chart'));

function Page() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Suspense fallback={<Spinner />}>
        <Chart data={data} />
      </Suspense>
    </ErrorBoundary>
  );
}`,
        takeaway: L(
          'Suspense handles waiting, error boundaries handle failures, and the two together keep one broken panel from taking down the page.',
          'Suspense отвечает за ожидание, error boundary — за сбои, а вместе они не дают одной сломанной части уронить всю страницу.'
        ),
      },
    ],
  },
];
