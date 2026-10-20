import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh04: Chapter = {
  id: 'react-ch4',
  title: L('State', 'Состояние'),
  summary: L(
    'How useState works and why the order of hook calls matters, why state is a snapshot of the render, how functional updates fix stale closures, when a reducer is the better tool, how updates are batched, and where the state belongs.',
    'Как работает useState и почему важен порядок вызовов хуков, почему состояние — это снимок рендера, как функциональные обновления лечат устаревшие замыкания, когда лучше редьюсер, как батчатся обновления и где должно жить состояние.'
  ),
  sections: [
    {
      id: 'react-ch4-s1',
      title: L('useState and the rules of state', 'useState и правила состояния'),
      body: L(
        'useState returns a pair: the current value and a function that updates it. The value is a snapshot taken when the render started, and the setter is a stable function whose identity never changes during the life of the instance. Calling the setter asks React to schedule an update; it does not change the variable in the current scope, which is why the code right after the call still sees the old value.\n\nThe rules of hooks exist because React identifies a hook by its position in the list of calls and not by its name. The calls must happen in the same order in every render, at the top level of a component or of a custom hook, never inside a condition, a loop or a nested function. React keeps an array of hook states per instance and reads them by index, so one conditional hook shifts all the hooks after it and mixes up the state.\n\nThe state belongs to the instance and not to the function. Two instances of the same component keep two separate sets of hook states, and the same component rendered twice has two independent counters. Unmounting the component discards the state completely, and that is why the key prop exists: a change of the key creates a new instance and resets the state.\n\nThe setter accepts a value or a function. The function form is not the value itself but a recipe: React calls it with the latest state and uses the result. That form is required whenever the next value depends on the previous one, because the variable in scope is a snapshot and may already be outdated.',
        'useState возвращает пару: текущее значение и функцию, которая его обновляет. Значение — это снимок, снятый в начале рендера, а сеттер — стабильная функция, чья идентичность не меняется за время жизни инстанса. Вызов сеттера просит React запланировать обновление; он не меняет переменную в текущей области, поэтому код сразу после вызова всё ещё видит старое значение.\n\nПравила хуков существуют потому, что React опознаёт хук по его позиции в списке вызовов, а не по имени. Вызовы должны идти в одном и том же порядке при каждом рендере, на верхнем уровне компонента или собственного хука, и никогда внутри условия, цикла или вложенной функции. React хранит массив состояний хуков для каждого инстанса и читает их по индексу, поэтому один условный хук сдвигает все последующие и путает состояние.\n\nСостояние принадлежит инстансу, а не функции. Два инстанса одного компонента держат два отдельных набора состояний хуков, и один и тот же компонент, отрисованный дважды, даёт два независимых счётчика. Размонтирование компонента полностью уничтожает состояние, и именно ради этого существует проп key: смена key создаёт новый инстанс и сбрасывает состояние.\n\nСеттер принимает значение или функцию. Функциональная форма — это не значение, а рецепт: React вызывает её с последним состоянием и использует результат. Эта форма обязательна, когда следующее значение зависит от предыдущего, потому что переменная в области видимости — снимок и может быть устаревшей.'
      ),
      bullets: [
        L('useState returns the current value and a setter whose identity never changes.', 'useState возвращает текущее значение и сеттер с неизменной идентичностью.'),
        L('Calling a setter schedules an update, it does not change the value in scope.', 'Вызов сеттера планирует обновление, но не меняет значение в области видимости.'),
        L('Hooks are matched by call order, so they cannot live in a condition or a loop.', 'Хуки сопоставляются по порядку вызовов, поэтому им нельзя жить в условии или цикле.'),
        L('State belongs to the instance: two instances of the same component are independent.', 'Состояние принадлежит инстансу: два инстанса одного компонента независимы.'),
        L('Unmounting discards the state, and changing the key creates a new instance.', 'Размонтирование уничтожает состояние, а смена key создаёт новый инстанс.'),
      ],
      code: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // count is 0 in this render, the setter does not change it
    setCount(count + 1);
    console.log(count); // still 0
  }

  return <button onClick={handleClick}>{count}</button>;
}

// The order of the hook calls must never change
function Bad({ enabled }) {
  const [a, setA] = useState(0);
  if (enabled) {
    const [b, setB] = useState(0); // breaks the order of the hooks
  }
  return null;
}`,
      table: {
        caption: L('What useState gives you', 'Что даёт useState'),
        headers: [L('Aspect', 'Аспект'), L('Value', 'Значение'), L('Note', 'Замечание')],
        rows: [
          [L('First element', 'Первый элемент'), L('current value', 'текущее значение'), L('a snapshot of this render', 'снимок этого рендера')],
          [L('Second element', 'Второй элемент'), L('setter', 'сеттер'), L('stable identity', 'стабильная идентичность')],
          [L('Setter argument', 'Аргумент сеттера'), L('a value or a function', 'значение или функция'), L('the function form reads the latest state', 'функциональная форма читает последнее состояние')],
          [L('Scope of the state', 'Область состояния'), L('one component instance', 'один инстанс компонента'), L('two instances are independent', 'два инстанса независимы')],
          [L('Lifetime', 'Время жизни'), L('until unmount', 'до размонтирования'), L('a new key starts from scratch', 'новый key начинает с нуля')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The setter does not assign', 'Сеттер не присваивает'),
          text: L(
            'The value in scope is frozen for the render, so setCount(count + 1) followed by console.log(count) prints the old number. The component is not broken: the update belongs to the next render, and the code of this render still sees the snapshot.',
            'Значение в области видимости заморожено на время рендера, поэтому setCount(count + 1), а затем console.log(count) напечатает старое число. Компонент не сломан: обновление относится к следующему рендеру, а код текущего рендера всё ещё видит снимок.'
          ),
        },
        {
          tone: 'warning',
          title: L('Conditional hooks break the order', 'Условные хуки ломают порядок'),
          text: L(
            'React keeps the hook states in an array and reads them by index. A hook inside a condition makes the array longer or shorter, and every later hook then reads the state of the wrong hook.',
            'React хранит состояния хуков в массиве и читает их по индексу. Хук внутри условия делает массив длиннее или короче, и все последующие хуки читают состояние чужого хука.'
          ),
        },
      ],
      takeaway: L(
        'Call the hooks in the same order in every render, read the value as a snapshot and remember that the setter schedules rather than assigns.',
        'Вызывайте хуки в одном порядке при каждом рендере, читайте значение как снимок и помните: сеттер планирует, а не присваивает.'
      ),
      seeAlso: [
        L('Section 4-2: state as a snapshot', 'Секция 4-2: состояние как снимок'),
        L('Section 4-3: functional updates and stale closures', 'Секция 4-3: функциональные обновления и устаревшие замыкания'),
        L('Chapter 8: custom hooks and the rules of hooks', 'Глава 8: собственные хуки и правила хуков'),
      ],
    },
    {
      id: 'react-ch4-s2',
      title: L('State as a snapshot', 'Состояние как снимок'),
      body: L(
        'The value returned by useState is a snapshot of the state at the moment the render started. React does not keep a live variable that updates itself; every render produces a new snapshot, and the code of the render reads that snapshot. The state variable never changes during the life of the render, and two reads of it in the same render always give the same thing.\n\nThe classic bug follows from that. Calling setCount(count + 1) twice in one handler queues two updates, and both are computed from the same snapshot, so the counter grows by one instead of two. With the functional form setCount((prev) => prev + 1) the second update receives the result of the first, and the counter grows by two.\n\nThe same snapshot explains why an asynchronous callback sees the old value. A setTimeout registered during a render closes over that render and keeps the count it saw then, so the callback adds one to a count that no longer exists on the screen.\n\nThe snapshot also explains the double click case: two clicks are two separate events and two separate renders, so the second click already sees the count produced by the first. Nothing is lost there. The loss happens only inside one event handler or one batch of updates.',
        'Значение, возвращаемое useState, — это снимок состояния на момент начала рендера. React не хранит живую переменную, которая меняет себя сама; каждый рендер даёт новый снимок, и код рендера читает именно его. Переменная состояния не меняется за время жизни рендера, и два чтения в одном рендере всегда дают одно и то же.\n\nИз этого следует классический баг. Два вызова setCount(count + 1) в одном обработчике ставят в очередь два обновления, и оба считаются от одного и того же снимка, поэтому счётчик вырастает на единицу, а не на два. С функциональной формой setCount((prev) => prev + 1) второе обновление получает результат первого, и счётчик вырастает на два.\n\nТот же снимок объясняет, почему асинхронный колбэк видит старое значение. Таймер, зарегистрированный во время рендера, замыкается на тот рендер и хранит тот счётчик, который видел тогда, поэтому прибавляет единицу к значению, которого на экране уже нет.\n\nСнимок объясняет и случай с двойным кликом: два клика — это два события и два рендера, поэтому второй клик уже видит счётчик, полученный после первого. Там ничего не теряется. Потеря случается только внутри одного обработчика или одной пачки обновлений.'
      ),
      bullets: [
        L('The state variable is a snapshot fixed for the whole render.', 'Переменная состояния — снимок, зафиксированный на весь рендер.'),
        L('Two reads of the same state in one render always give the same value.', 'Два чтения одного состояния в одном рендере всегда дают одно значение.'),
        L('setCount(count + 1) twice in one handler adds one, not two.', 'Два вызова setCount(count + 1) в одном обработчике прибавляют единицу, а не два.'),
        L('setCount((prev) => prev + 1) twice in one handler adds two.', 'Два вызова setCount((prev) => prev + 1) в одном обработчике прибавляют два.'),
        L('Two separate clicks are two renders, so the second one sees the first result.', 'Два отдельных клика — это два рендера, и второй видит результат первого.'),
      ],
      code: `function Counter() {
  const [count, setCount] = useState(0);

  function broken() {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count); // 0, the snapshot of this render
  }

  function fixed() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <button onClick={broken}>broken {count}</button>
      <button onClick={fixed}>fixed {count}</button>
    </>
  );
}`,
      table: {
        caption: L('One render, two updates', 'Один рендер, два обновления'),
        headers: [L('Calls', 'Вызовы'), L('Queued values', 'Значения в очереди'), L('Counter after', 'Счётчик после')],
        rows: [
          [L('setCount(count + 1) twice', 'setCount(count + 1) дважды'), L('1, 1', '1, 1'), L('count + 1', 'count + 1')],
          [L('setCount((p) => p + 1) twice', 'setCount((p) => p + 1) дважды'), L('1, 2', '1, 2'), L('count + 2', 'count + 2')],
          [L('setCount(5) then setCount(7)', 'setCount(5), затем setCount(7)'), L('5, 7', '5, 7'), L('7', '7')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two increments, one result', 'Два инкремента, один результат'),
          text: L(
            'The counter that grows by one when you expected two is not a lost update in the queue but two updates computed from one snapshot. The functional form is the fix, and it works for every state, not only for counters.',
            'Счётчик, выросший на единицу вместо двух, — это не потерянное обновление в очереди, а два обновления, посчитанные от одного снимка. Исправление — функциональная форма, и работает она с любым состоянием, а не только со счётчиками.'
          ),
        },
      ],
      takeaway: L(
        'Read the state as a snapshot and use the functional form whenever the next value depends on the previous one.',
        'Читайте состояние как снимок и используйте функциональную форму, когда следующее значение зависит от предыдущего.'
      ),
      seeAlso: [
        L('Section 4-1: useState and the rules of state', 'Секция 4-1: useState и правила состояния'),
        L('Section 4-3: functional updates and stale closures', 'Секция 4-3: функциональные обновления и устаревшие замыкания'),
        L('Section 2-3: batching and when the DOM is touched', 'Секция 2-3: батчинг и момент изменения DOM'),
      ],
    },
    {
      id: 'react-ch4-s3',
      title: L('Functional updates and stale closures', 'Функциональные обновления и устаревшие замыкания'),
      body: L(
        'Every render creates a new set of functions, and each of them closes over the values that were current in that render. A callback registered during a render keeps the values of that render forever, and that is what a stale closure is: the code is correct, but it works with data that has already been replaced.\n\nThe typical case is a timer or a subscription. An interval created during the first render closes over the count of the first render, so it keeps setting the count to the same old value no matter how many times it fires. The effect that owns the interval must be restarted when the value it uses changes, or it must read the value through a function instead of through the closed variable.\n\nThe functional update solves the problem without extra machinery. setCount((prev) => prev + 1) does not read the closed variable at all: React calls the recipe with the latest state at the moment it processes the update. The same pattern works for any state, and it is the reason the functional form exists.\n\nA callback prop follows the same dependency rules as an effect. If the callback reads props or state, the component that receives it has to be told what it depends on, otherwise the parent keeps an old function and the child keeps old data. The rule of thumb is to list every value the callback reads and to recreate the callback when one of them changes.',
        'Каждый рендер создаёт новый набор функций, и каждая из них замыкается на значения, актуальные в том рендере. Колбэк, зарегистрированный во время рендера, навсегда хранит значения именно того рендера, и это и есть устаревшее замыкание: код написан верно, но работает с данными, которые уже заменили.\n\nТипичный случай — таймер или подписка. Интервал, созданный во время первого рендера, замыкается на счётчик первого рендера, поэтому он снова и снова ставит одно и то же старое значение, сколько бы раз ни сработал. Эффект, владеющий интервалом, должен перезапускаться, когда меняется используемое значение, либо читать значение через функцию, а не через замкнутую переменную.\n\nФункциональное обновление решает задачу без лишних механизмов. setCount((prev) => prev + 1) вообще не читает замкнутую переменную: React вызывает рецепт с последним состоянием в момент обработки обновления. Тот же приём работает с любым состоянием, и именно ради него существует функциональная форма.\n\nКолбэк-проп подчиняется тем же правилам зависимостей, что и эффект. Если колбэк читает пропсы или состояние, принимающий компонент должен знать, от чего он зависит, иначе родитель держит старую функцию, а ребёнок — старые данные. Правило простое: перечислите все значения, которые читает колбэк, и пересоздавайте колбэк, когда одно из них меняется.'
      ),
      bullets: [
        L('Every render produces new functions that close over the values of that render.', 'Каждый рендер даёт новые функции, замкнутые на значения своего рендера.'),
        L('A stale closure keeps working with data that has already been replaced.', 'Устаревшее замыкание продолжает работать с уже заменёнными данными.'),
        L('An interval created once keeps setting the value it captured.', 'Созданный один раз интервал продолжает ставить захваченное значение.'),
        L('The functional update reads the latest state when the update is processed.', 'Функциональное обновление читает последнее состояние в момент обработки.'),
        L('A callback that reads props or state must list what it depends on.', 'Колбэк, читающий пропсы или состояние, обязан перечислить свои зависимости.'),
      ],
      code: `function BrokenTimer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // The interval keeps the count of this render: 0 forever
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{count}</p>;
}

function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // The recipe receives the latest state when React applies the update
    const id = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{count}</p>;
}`,
      table: {
        caption: L('Fresh values and stale ones', 'Свежие и устаревшие значения'),
        headers: [L('Case', 'Случай'), L('Fresh', 'Свежий'), L('Stale', 'Устаревший')],
        rows: [
          [L('Event handler of the current render', 'Обработчик текущего рендера'), L('reads current props and state', 'читает актуальные пропсы и состояние'), L('reads the values of an older render', 'читает значения старого рендера')],
          [L('Timer registered in an older render', 'Таймер из старого рендера'), L('reads the value at call time', 'читает значение в момент вызова'), L('reads the captured value', 'читает захваченное значение')],
          [L('Functional update', 'Функциональное обновление'), L('receives the latest state', 'получает последнее состояние'), L('never reads a captured value', 'не читает захваченное значение')],
          [L('Effect dependency list', 'Список зависимостей эффекта'), L('recreated when a value changes', 'пересоздаётся при изменении значения'), L('keeps old values when a dependency is missing', 'хранит старые значения при пропущенной зависимости')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The timer that never changes', 'Таймер, который никогда не меняется'),
          text: L(
            'An interval created once with an empty dependency list writes the same value on every tick. The counter stays at zero and the code looks correct, because it is correct for the render that created it.',
            'Интервал, созданный один раз с пустым списком зависимостей, пишет одно и то же значение на каждом тике. Счётчик остаётся на нуле, а код выглядит верным, потому что он верен тому рендеру, который его создал.'
          ),
        },
        {
          tone: 'tip',
          title: L('Functional updates read the latest state', 'Функциональные обновления читают последнее состояние'),
          text: L(
            'Whenever a callback needs the previous value, use the functional form. It removes the dependency on the closure and it survives a long-lived callback such as an interval or a subscription.',
            'Когда колбэку нужно предыдущее значение, используйте функциональную форму. Она снимает зависимость от замыкания и переживает долгоживущий колбэк вроде интервала или подписки.'
          ),
        },
      ],
      takeaway: L(
        'When a callback or a timer reads state, use the functional form or list the value as a dependency, otherwise it keeps stale data.',
        'Когда колбэк или таймер читает состояние, используйте функциональную форму или укажите значение в зависимостях, иначе останутся старые данные.'
      ),
      seeAlso: [
        L('Section 5-2: the dependency array and exhaustive deps', 'Секция 5-2: массив зависимостей и exhaustive-deps'),
        L('Section 4-2: state as a snapshot', 'Секция 4-2: состояние как снимок'),
        L('Chapter 8: custom hooks', 'Глава 8: собственные хуки'),
      ],
    },
    {
      id: 'react-ch4-s4',
      title: L('Derived state and useReducer', 'Производное состояние и useReducer'),
      body: L(
        'Derived state is a value that can be computed from other state. The first question is where the computation happens: during render, as a plain constant, or in an effect that copies the result into another state variable. The second option is almost always wrong. It renders with the old value, it needs an extra dependency and it can produce a state where the two copies disagree.\n\nComputing during render is free and always consistent. A total computed with reduce inside the component gives a value that matches the items in the very same render. The only case where a copy is needed is when the derived value must be adjustable by the user, for example a draft that starts from the value of a prop and is allowed to differ from it afterwards.\n\nuseReducer is the tool for state that moves between several shapes. The reducer is a pure function that takes the current state and an action and returns the next state. The action describes what happened and not how to compute the result, and the reducer must not read anything outside its arguments.\n\nA reducer has one advantage over several useState calls: the transitions are written in one place, so adding a new action does not scatter logic across the component. It also gives a predictable history, which is why reducers work well with forms, wizards and anything that has an explicit list of states.',
        'Производное состояние — это значение, которое можно вычислить из другого состояния. Первый вопрос: где происходит вычисление — во время рендера как обычная константа или в эффекте, который копирует результат в другую переменную состояния. Второй вариант почти всегда неверен: он рендерит со старым значением, требует лишней зависимости и может дать состояние, в котором две копии противоречат друг другу.\n\nВычисление во время рендера бесплатно и всегда согласовано. Итог, посчитанный через reduce внутри компонента, соответствует элементам того же самого рендера. Копия нужна только тогда, когда производное значение должен менять пользователь: например, черновик, который начинается со значения пропа и потом от него отличается.\n\nuseReducer — инструмент для состояния, которое меняет форму. Редьюсер — чистая функция, которая берёт текущее состояние и действие и возвращает следующее. Действие описывает, что произошло, а не как посчитать результат, и редьюсер не должен читать ничего за пределами своих аргументов.\n\nУ редьюсера есть преимущество перед несколькими вызовами useState: переходы написаны в одном месте, поэтому новое действие не разбрасывает логику по компоненту. Он же даёт предсказуемую историю, поэтому редьюсеры хорошо работают с формами, пошаговыми сценариями и всем, у чего есть явный список состояний.'
      ),
      bullets: [
        L('Derived state is computed during render, not copied into another state variable.', 'Производное состояние вычисляется во время рендера, а не копируется в другую переменную.'),
        L('An effect that synchronises two states can render with inconsistent values.', 'Эффект, синхронизирующий два состояния, может отрендерить несогласованные значения.'),
        L('useReducer moves complex state transitions into one pure function.', 'useReducer переносит сложные переходы состояния в одну чистую функцию.'),
        L('The action describes the event, the reducer decides the next state.', 'Действие описывает событие, а редьюсер решает, каким будет следующее состояние.'),
        L('The reducer must not read anything outside its arguments.', 'Редьюсер не должен читать ничего за пределами своих аргументов.'),
      ],
      code: `// Derived state: computed during render, always consistent
function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <p>Total: {total}</p>;
}

// A reducer keeps the transitions of a multi step form in one place
function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.value };
    case 'reset':
      return { name: '', step: 0 };
    default:
      return state;
  }
}

function Wizard() {
  const [state, dispatch] = useReducer(reducer, { name: '', step: 0 });
  return <button onClick={() => dispatch({ type: 'name', value: 'Ada' })}>{state.name}</button>;
}`,
      table: {
        caption: L('useState or useReducer', 'useState или useReducer'),
        headers: [L('Aspect', 'Аспект'), L('useState', 'useState'), L('useReducer', 'useReducer')],
        rows: [
          [L('State shape', 'Форма состояния'), L('a few independent values', 'несколько независимых значений'), L('one object with a shape', 'один объект определённой формы')],
          [L('Transitions', 'Переходы'), L('written in the component', 'написаны в компоненте'), L('written in the reducer', 'написаны в редьюсере')],
          [L('Best for', 'Хорошо для'), L('simple flags and inputs', 'простых флагов и полей'), L('forms, wizards, multi step flows', 'форм, пошаговых сценариев')],
          [L('Debugging', 'Отладка'), L('look at the setter calls', 'смотреть на вызовы сеттеров'), L('look at the action sequence', 'смотреть на последовательность действий')],
          [L('Testability', 'Тестируемость'), L('needs a rendered component', 'нужен отрисованный компонент'), L('the reducer is a pure function', 'редьюсер — чистая функция')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The state that copies another state', 'Состояние, копирующее другое состояние'),
          text: L(
            'An effect that copies a prop into state renders once with the old value and needs the prop in its dependency list. Every change of the prop runs the effect, and the two values can disagree for a frame.',
            'Эффект, копирующий проп в состояние, один раз рендерит со старым значением и требует пропа в списке зависимостей. Каждое изменение пропа запускает эффект, и на кадр значения могут разойтись.'
          ),
        },
        {
          tone: 'tip',
          title: L('Actions describe events', 'Действия описывают события'),
          text: L(
            'Dispatch an action named "nameChanged" instead of "setNameToAda". The first one survives a new requirement, the second one has to be rewritten when the value comes from somewhere else.',
            'Отправляйте действие "nameChanged", а не "setNameToAda". Первое переживёт новое требование, второе придётся переписывать, когда значение начнёт приходить откуда-то ещё.'
          ),
        },
      ],
      takeaway: L(
        'Compute derived values during render and move complex transitions into a pure reducer.',
        'Вычисляйте производные значения во время рендера, а сложные переходы переносите в чистый редьюсер.'
      ),
      seeAlso: [
        L('Section 5-5: effects that should not be effects', 'Секция 5-5: эффекты, которые не должны быть эффектами'),
        L('Section 4-6: colocation and normalised state', 'Секция 4-6: колокация и нормализация состояния'),
        L('Chapter 9: forms', 'Глава 9: формы'),
      ],
    },
    {
      id: 'react-ch4-s5',
      title: L('Batching and multiple updates', 'Батчинг и несколько обновлений'),
      body: L(
        'React 18 batches every update that happens in the same tick. Three setters called in one handler produce one render with the final values and not three renders with intermediate ones. Before React 18 only the updates from React events were batched, while the ones from promises or timeouts were not, and that produced renders nobody asked for.\n\nInside one batch the updates are applied in order to the same queue. The value form of the setter is resolved against the state at the moment of the call, so two updates that compute the same value overwrite each other: setCount(count + 1) followed by setCount(count + 1) leaves the counter one step higher and not two.\n\nThe functional form resolves against the result of the previous update in the same queue, so the values accumulate. This is the difference between reading a variable and reading the state, and it is why the functional form is the default recommendation whenever the next value depends on the previous one.\n\nBatching does not change how many renders happen in total. A component may still render several times in one batch, for example when it uses a reducer, when a state update happens during render or in strict mode in development. Never count renders as a measure of correctness, and never put a side effect in the render to observe them.',
        'React 18 батчит каждое обновление, случившееся за один тик. Три сеттера, вызванные в одном обработчике, дают один рендер с итоговыми значениями, а не три рендера с промежуточными. До React 18 батчились только обновления из событий React, а обновления из промисов и таймеров — нет, и это порождало лишние рендеры, о которых никто не просил.\n\nВнутри одной пачки обновления применяются по очереди к одной и той же очереди. Форма со значением разрешается относительно состояния на момент вызова, поэтому два обновления, посчитанные одинаково, затирают друг друга: setCount(count + 1), а затем setCount(count + 1) оставляют счётчик на единицу выше, а не на два.\n\nФункциональная форма разрешается относительно результата предыдущего обновления в той же очереди, поэтому значения накапливаются. Это разница между чтением переменной и чтением состояния, и именно поэтому функциональная форма — рекомендация по умолчанию, когда следующее значение зависит от предыдущего.\n\nБатчинг не меняет общее количество рендеров. Компонент всё равно может отрендериться несколько раз за одну пачку: например, при использовании редьюсера, при обновлении состояния во время рендера или в строгом режиме при разработке. Никогда не считайте рендеры мерой корректности и никогда не ставьте в рендер побочный эффект, чтобы их наблюдать.'
      ),
      bullets: [
        L('Since React 18 every update in the same tick is batched into one render.', 'С React 18 каждое обновление за один тик батчится в один рендер.'),
        L('Updates from promises and timeouts are batched as well.', 'Обновления из промисов и таймеров тоже батчатся.'),
        L('Two value updates computed from the same snapshot overwrite each other.', 'Два обновления значения от одного снимка затирают друг друга.'),
        L('Two functional updates accumulate on top of each other.', 'Два функциональных обновления накапливаются друг на друге.'),
        L('Batching groups updates, it does not guarantee a single render.', 'Батчинг группирует обновления, но не гарантирует единственный рендер.'),
      ],
      code: `function Counter() {
  const [count, setCount] = useState(0);

  function broken() {
    setCount(count + 1);
    setCount(count + 1); // both read the same snapshot, one update is lost
  }

  function fixed() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // the second reads the result of the first
  }

  // Batching also works outside React events
  useEffect(() => {
    Promise.resolve().then(() => {
      setCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    });
  }, []);

  return <button onClick={fixed}>{count}</button>;
}`,
      table: {
        caption: L('Two updates in one batch', 'Два обновления в одной пачке'),
        headers: [L('Updates', 'Обновления'), L('Queued result', 'Результат в очереди'), L('Note', 'Замечание')],
        rows: [
          [L('setCount(count + 1) twice', 'setCount(count + 1) дважды'), L('count + 1', 'count + 1'), L('the second overwrites the first', 'второе затирает первое')],
          [L('setCount((p) => p + 1) twice', 'setCount((p) => p + 1) дважды'), L('count + 2', 'count + 2'), L('the values accumulate', 'значения накапливаются')],
          [L('setCount(5) then setCount(7)', 'setCount(5), затем setCount(7)'), L('7', '7'), L('the last value wins', 'побеждает последнее значение')],
          [L('setText("a") then setText("b")', 'setText("a"), затем setText("b")'), L('"b"', '"b"'), L('the last value wins', 'побеждает последнее значение')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('Automatic batching since React 18', 'Автоматический батчинг с React 18'),
          text: L(
            'The change removed the need for unstable_batchedUpdates and for manual workarounds around promises. If an update still causes a separate render, look for a call from outside React, such as a third party library that calls flushSync.',
            'Изменение убрало необходимость в unstable_batchedUpdates и в ручных обходных путях вокруг промисов. Если обновление всё ещё вызывает отдельный рендер, ищите вызов извне React, например от сторонней библиотеки, вызывающей flushSync.'
          ),
        },
      ],
      takeaway: L(
        'Use the functional form whenever an update depends on the previous value, because a batch resolves value updates against one snapshot.',
        'Используйте функциональную форму, когда обновление зависит от предыдущего значения: пачка разрешает обновления значения относительно одного снимка.'
      ),
      seeAlso: [
        L('Section 2-3: batching and when the DOM is touched', 'Секция 2-3: батчинг и момент изменения DOM'),
        L('Section 4-2: state as a snapshot', 'Секция 4-2: состояние как снимок'),
        L('Section 4-3: functional updates and stale closures', 'Секция 4-3: функциональные обновления и устаревшие замыкания'),
      ],
    },
    {
      id: 'react-ch4-s6',
      title: L('Colocation and normalised state', 'Колокация и нормализация состояния'),
      body: L(
        'Colocation means keeping a piece of state in the component that uses it and moving it only when a second component needs it. A search input in a toolbar does not belong in the application root: the root re-renders on every keystroke and every other component re-renders with it. The state belongs next to the input until somebody else needs it.\n\nThe same rule applies to data that comes from the server. The list of posts does not have to live in a global store if only one screen shows it. Fetching in the component that shows the data keeps the data and the code that needs it in the same file, and the state disappears when the user leaves the screen.\n\nDo not store the same fact twice. If the screen needs the total of the cart and the list of the cart items, keep the items and compute the total during render. Two copies of the same fact always drift, and the interface ends up showing a total that does not match the rows.\n\nWhen the data is large and shared, normalise it. Instead of an array of objects each carrying its author, keep the authors in a map by id and the posts in a map by id, and store only the ids in the relations. Updating an author becomes a single write, and the same author cannot exist in two versions.',
        'Колокация означает, что состояние живёт в том компоненте, который его использует, и переезжает только тогда, когда оно понадобится второму. Поле поиска в панели инструментов не место в корне приложения: корень перерисовывается на каждое нажатие клавиши, и вместе с ним перерисовывается всё остальное. Состояние живёт рядом с полем, пока оно кому-то ещё не понадобилось.\n\nТо же правило касается данных с сервера. Список постов не обязан жить в глобальном хранилище, если его показывает только один экран. Загрузка в компоненте, который показывает данные, держит данные и код, который они нужны, в одном файле, а состояние исчезает, когда пользователь уходит с экрана.\n\nНе храните один и тот же факт дважды. Если экрану нужен итог корзины и список позиций корзины, храните позиции и считайте итог во время рендера. Две копии одного факта всегда расходятся, и интерфейс показывает итог, не совпадающий со строками.\n\nКогда данные большие и общие, нормализуйте их. Вместо массива объектов, каждый из которых несёт своего автора, держите авторов в отображении по id и посты в отображении по id, а в связях храните только идентификаторы. Обновление автора становится одной записью, и один автор не может существовать в двух версиях.'
      ),
      bullets: [
        L('Keep state in the component that uses it and move it only when a second consumer appears.', 'Держите состояние в компоненте, который его использует, и переносите только при появлении второго потребителя.'),
        L('A global store for data that one screen shows is a needless re-render source.', 'Глобальное хранилище для данных одного экрана — лишний источник перерисовок.'),
        L('Never store the same fact twice, derive the second copy during render.', 'Никогда не храните один факт дважды, вторую копию вычисляйте во время рендера.'),
        L('Normalised data keeps one copy of every entity under its id.', 'Нормализованные данные хранят одну копию каждой сущности под её id.'),
        L('Relations store ids, so an update touches a single place.', 'Связи хранят идентификаторы, поэтому обновление затрагивает одно место.'),
      ],
      code: `// Colocated: the state lives next to the input that uses it
function Toolbar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// Normalised: one copy of every author, posts keep the id
const authors = {
  a1: { id: 'a1', name: 'Ada' },
  a2: { id: 'a2', name: 'Grace' },
};
const posts = {
  p1: { id: 'p1', title: 'Notes', authorId: 'a1' },
};

function Post({ post }) {
  const author = authors[post.authorId]; // one source, no duplicates
  return <p>{author.name}: {post.title}</p>;
}`,
      table: {
        caption: L('How the data is shaped', 'Форма данных'),
        headers: [L('Shape', 'Форма'), L('Lookup', 'Поиск'), L('Update', 'Обновление')],
        rows: [
          [L('Array of objects', 'Массив объектов'), L('find by id', 'поиск по id'), L('rewrite every copy of the entity', 'переписать все копии сущности')],
          [L('Map by id', 'Отображение по id'), L('authors[id]', 'authors[id]'), L('one write to one entry', 'одна запись в одну ячейку')],
          [L('Duplicated fields', 'Дублируемые поля'), L('read the field directly', 'читать поле напрямую'), L('every copy has to be updated', 'все копии надо обновить')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two copies of the same fact', 'Две копии одного факта'),
          text: L(
            'A summary stored next to the list it summarises can disagree with the list. When the source changes, only one of the two is updated, and the user sees a total that belongs to another moment in time.',
            'Сводка, хранящаяся рядом со списком, который она суммирует, может разойтись со списком. Когда источник меняется, обновляется только один из двоих, и пользователь видит итог от другого момента времени.'
          ),
        },
        {
          tone: 'tip',
          title: L('Colocate first, lift later', 'Сначала рядом, потом поднимать'),
          text: L(
            'Start with the state in the component that uses it. Moving it up is cheap, because the value and the setter travel together as a prop and a callback.',
            'Начните с состояния в том компоненте, который его использует. Поднять его потом дёшево: значение и сеттер уезжают вместе как проп и колбэк.'
          ),
        },
      ],
      takeaway: L(
        'Keep state next to the code that uses it, never store the same fact twice and normalise shared entities by id.',
        'Держите состояние рядом с кодом, который его использует, не храните один факт дважды и нормализуйте общие сущности по id.'
      ),
      seeAlso: [
        L('Section 3-4: lifting state up', 'Секция 3-4: подъём состояния'),
        L('Section 4-4: derived state and useReducer', 'Секция 4-4: производное состояние и useReducer'),
        L('Chapter 7: context', 'Глава 7: контекст'),
      ],
    },
  ],
};
