import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh03: Chapter = {
  id: 'react-ch3',
  title: L('Components and props', 'Компоненты и пропсы'),
  summary: L(
    'What makes a component function pure, how children and slots shape a reusable component, the difference between a controlled and an uncontrolled input, when to lift state up, and how to draw a component boundary.',
    'Что делает функцию компонента чистой, как потомки и слоты формируют переиспользуемый компонент, чем контролируемый ввод отличается от неконтролируемого, когда поднимать состояние и как провести границу компонента.'
  ),
  sections: [
    {
      id: 'react-ch3-s1',
      title: L('Function components and purity', 'Функциональные компоненты и чистота'),
      body: L(
        'A function component is a function that takes props and returns an element. React calls it, takes the result and moves on; the function itself is not an object and stores nothing on itself. The name starts with a capital letter so that JSX reads it as a component and not as a host tag, and one file may export as many components as it needs.\n\nThe function has to be pure: the same props and the same state must give the same result every time. That means no mutation of the props, no mutation of the state object, no writing to a variable declared outside the component and no side effects such as requests, timers or storage writes. A component that reads Date.now() or Math.random() during render returns different output for the same inputs, and it breaks the assumption that a render can be replayed.\n\nProps are frozen in development, so mutating them corrupts the tree and React logs a warning naming the component. The same applies to state: the value returned by useState is a snapshot, and changing it in place does not trigger a render, so the interface keeps showing the old data. A component must also return an element or null; anything else is not a valid result.',
        'Функциональный компонент — это функция, которая принимает пропсы и возвращает элемент. React вызывает её, забирает результат и идёт дальше; сама функция не объект и ничего не хранит на себе. Имя начинается с заглавной буквы, чтобы JSX воспринимал её как компонент, а не как тег, и в одном файле может быть сколько угодно компонентов.\n\nФункция должна быть чистой: одни и те же пропсы и состояние обязаны давать один и тот же результат каждый раз. Значит, никаких мутаций пропсов, никаких мутаций объекта состояния, никаких записей во внешнюю переменную и никаких побочных эффектов вроде запросов, таймеров или записи в хранилище. Компонент, читающий Date.now() или Math.random() во время рендера, возвращает разный результат для одних и тех же входных данных и ломает предположение, что рендер можно повторить.\n\nПропсы в разработке заморожены, поэтому их мутация портит дерево, а React пишет предупреждение с именем компонента. То же со состоянием: значение из useState — снимок, и его изменение на месте не вызывает рендер, поэтому интерфейс продолжает показывать старые данные. Компонент обязан вернуть элемент или null — всё остальное невалидный результат.'
      ),
      bullets: [
        L('A component is a function of its props, and the same inputs must give the same output.', 'Компонент — это функция пропсов, и одни входные данные должны давать один результат.'),
        L('Never mutate props or state, both are frozen snapshots in development.', 'Никогда не мутируйте пропсы и состояние — в разработке это замороженные снимки.'),
        L('Do not read Date.now() or Math.random() during render.', 'Не читайте Date.now() или Math.random() во время рендера.'),
        L('Side effects belong in effects, not in the body of a component.', 'Побочные эффекты живут в эффектах, а не в теле компонента.'),
        L('A component returns an element or null, and its name starts with a capital letter.', 'Компонент возвращает элемент или null, а его имя начинается с заглавной буквы.'),
      ],
      code: `function Greeting({ name, tone }) {
  // Pure: the output depends on props only
  const prefix = tone === 'formal' ? 'Good day' : 'Hi';
  return <p>{prefix}, {name}!</p>;
}

// Not pure: the output changes between two calls with the same props
function BadGreeting({ name }) {
  return <p>Hello at {new Date().toLocaleTimeString()}, {name}</p>;
}

// The impure part belongs in an effect
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time>{now.toLocaleTimeString()}</time>;
}`,
      table: {
        caption: L('Pure and impure expressions during render', 'Чистые и нечистые выражения во время рендера'),
        headers: [L('Expression', 'Выражение'), L('Pure?', 'Чисто?'), L('Why', 'Почему')],
        rows: [
          [L('<p>{name}</p>', '<p>{name}</p>'), L('yes', 'да'), L('depends on props only', 'зависит только от пропсов')],
          [L('new Date().toLocaleTimeString()', 'new Date().toLocaleTimeString()'), L('no', 'нет'), L('different on every call', 'разное при каждом вызове')],
          [L('Math.random()', 'Math.random()'), L('no', 'нет'), L('different on every call', 'разное при каждом вызове')],
          [L('items.sort()', 'items.sort()'), L('no', 'нет'), L('mutates the array it was given', 'мутирует полученный массив')],
          [L('items.filter((i) => i.done).length', 'items.filter((i) => i.done).length'), L('yes', 'да'), L('creates a new array, input untouched', 'создаёт новый массив, вход не тронут')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Mutating a prop is not a shortcut', 'Мутация пропса — не сокращение'),
          text: L(
            'Changing props.items.push(newItem) inside a component modifies the object owned by the parent. The parent does not know about the change, so nothing re-renders and the interface shows the old list. Raise the change instead: ask the parent to update its own state.',
            'Вызов props.items.push(newItem) внутри компонента меняет объект, принадлежащий родителю. Родитель об изменении не знает, поэтому ничего не перерисовывается и интерфейс показывает старый список. Поднимайте изменение: просите родителя обновить своё состояние.'
          ),
        },
        {
          tone: 'tip',
          title: L('Freeze the moment', 'Зафиксируйте момент'),
          text: L(
            'When a component needs the current time, read it once in a state initialiser and keep it in state. The value stays stable for the whole render and the component remains pure.',
            'Если компоненту нужно текущее время, прочитайте его один раз в инициализаторе состояния и храните в состоянии. Значение стабильно на весь рендер, и компонент остаётся чистым.'
          ),
        },
      ],
      takeaway: L(
        'A component must be a pure function of its props: no mutation, no randomness and no side effects in the body.',
        'Компонент должен быть чистой функцией пропсов: без мутаций, случайности и побочных эффектов в теле.'
      ),
      seeAlso: [
        L('Section 2-4: strict mode and double rendering', 'Секция 2-4: строгий режим и двойной рендер'),
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропсы, потомки и композиция'),
        L('Section 5-1: what effects are for', 'Секция 5-1: для чего нужны эффекты'),
      ],
    },
    {
      id: 'react-ch3-s2',
      title: L('Props, children and composition', 'Пропсы, потомки и композиция'),
      body: L(
        'Props are the input of a component: a plain object that React builds from the JSX attributes and passes as the first argument. Every attribute lands in it, and the nested elements land in props.children. The object is created fresh on every render, so comparing props by identity tells you nothing about whether anything changed; React compares the values shallowly when it decides whether a memoized child has to re-render.\n\nChildren is not a special syntax, it is an ordinary prop that happens to be filled with elements. The component decides where to render it. When one slot is not enough, the component accepts named props such as header or footer and the caller fills them. That is composition: the parent controls the content, the child controls the layout.\n\nThe alternative is configuration: a component that knows every variant through boolean props. Such a component grows a new prop for every use case and multiplies the branches inside it. Composition pushes those branches into the caller, where they belong to a screen instead of to a reusable component. Children can also be a function, which is a render prop: the parent passes a function and the child calls it with its own state.',
        'Пропсы — это вход компонента: обычный объект, который React собирает из атрибутов JSX и передаёт первым аргументом. Туда попадает каждый атрибут, а вложенные элементы попадают в props.children. Объект создаётся заново на каждом рендере, поэтому сравнение пропсов по ссылке ничего не говорит об изменениях; React сравнивает значения поверхностно, когда решает, нужно ли перерисовывать мемоизированного потомка.\n\nПотомки — не особый синтаксис, а обычный проп, который просто наполнен элементами. Компонент сам решает, где его отрисовать. Если одного слота мало, компонент принимает именованные пропсы вроде header или footer, а вызывающий код их заполняет. Это композиция: родитель управляет содержимым, ребёнок — вёрсткой.\n\nАльтернатива — конфигурация: компонент, который знает все варианты по булевым пропсам. Такой компонент обрастает новым пропом под каждый случай, а ветки внутри множатся. Композиция выносит эти ветки в вызывающий код, где они принадлежат конкретному экрану, а не переиспользуемому компоненту. Потомком может быть и функция — это render prop: родитель передаёт функцию, а ребёнок вызывает её со своим состоянием.'
      ),
      bullets: [
        L('Props are a plain object built from the JSX attributes, children included.', 'Пропсы — обычный объект из атрибутов JSX, включая потомков.'),
        L('A new props object is created on every render, so compare values rather than identity.', 'Новый объект пропсов создаётся каждый рендер, сравнивайте значения, а не ссылки.'),
        L('children is an ordinary prop, and the component decides where it is rendered.', 'children — обычный проп, и компонент решает, где его отрисовать.'),
        L('Named slots such as header and footer keep the layout inside the component.', 'Именованные слоты вроде header и footer оставляют вёрстку внутри компонента.'),
        L('Configuration props grow with every variant, composition keeps the branching in the caller.', 'Конфигурационные пропсы растут с каждым вариантом, композиция оставляет ветвление вызывающему коду.'),
      ],
      code: `function Card({ title, children, footer }) {
  return (
    <article>
      <header>{title}</header>
      <div className="body">{children}</div>
      {footer && <footer>{footer}</footer>}
    </article>
  );
}

// The parent decides the content, the card decides the layout
function Page({ user }) {
  return (
    <Card title={user.name} footer={<button>Save</button>}>
      <p>{user.bio}</p>
    </Card>
  );
}

// children can also be a function
function List({ items, children }) {
  return <ul>{items.map((item) => children(item))}</ul>;
}`,
      table: {
        caption: L('Composition against configuration', 'Композиция против конфигурации'),
        headers: [L('Aspect', 'Аспект'), L('Configuration', 'Конфигурация'), L('Composition', 'Композиция')],
        rows: [
          [L('API shape', 'Форма API'), L('a boolean prop per variant', 'булев проп на каждый вариант'), L('children and named slots', 'потомки и именованные слоты')],
          [L('Who decides the layout', 'Кто решает вёрстку'), L('the component', 'компонент'), L('the component', 'компонент')],
          [L('Who decides the content', 'Кто решает содержимое'), L('the component', 'компонент'), L('the caller', 'вызывающий код')],
          [L('How it grows', 'Как растёт'), L('a new prop per request', 'новый проп под каждый запрос'), L('new call sites', 'новые места вызова')],
          [L('Branching inside', 'Ветвление внутри'), L('grows with the component', 'растёт вместе с компонентом'), L('stays in the caller', 'остаётся у вызывающего кода')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('children is just a prop', 'children — просто проп'),
          text: L(
            'JSX nests the elements into props.children, and nothing more. A component that accepts children can be used with any content, and a component that accepts named props can be used with several kinds of content at once.',
            'JSX складывает элементы в props.children, и ничего больше. Компонент, принимающий потомков, работает с любым содержимым, а компонент с именованными пропсами — сразу с несколькими видами содержимого.'
          ),
        },
      ],
      takeaway: L(
        'Accept children and named slots instead of adding a prop for every variant, and treat props as read-only values.',
        'Принимайте потомков и именованные слоты вместо нового пропа на каждый вариант и относитесь к пропсам только для чтения.'
      ),
      seeAlso: [
        L('Section 1-4: conditional rendering and composition', 'Секция 1-4: условный рендер и композиция'),
        L('Section 3-3: controlled versus uncontrolled inputs', 'Секция 3-3: контролируемые и неконтролируемые вводы'),
        L('Section 3-5: choosing the component boundary', 'Секция 3-5: как выбрать границу компонента'),
      ],
    },
    {
      id: 'react-ch3-s3',
      title: L('Controlled versus uncontrolled inputs', 'Контролируемые и неконтролируемые вводы'),
      body: L(
        'A controlled input takes its value from React state. The value attribute is bound to a state variable, and every keystroke travels through the onChange handler that updates that variable. The state is the single source of truth, so the field always shows exactly what the state holds. A controlled input without an onChange handler is a read-only field, and React warns about it in development.\n\nAn uncontrolled input lets the DOM own the value. The initial value comes from defaultValue, and the current value is read from the DOM through a ref when it is needed. Nothing is stored in React state, so typing does not re-render the component, and the field works even before the JavaScript bundle has loaded.\n\nThe controlled form is the default in React, because the value of the field becomes a normal value you can validate, format, reset and send. The uncontrolled form is right when the value matters only at submit time, and for file inputs, whose value cannot be set from JavaScript at all. A controlled input whose value never changes is a bug: the caret jumps to the end and the field looks frozen.\n\nThe two forms can be mixed inside one form, but each field must have exactly one owner. If a field is controlled by a state variable and also written by the DOM, the two fight and the field flickers. Decide who owns the value before writing the handler.',
        'Контролируемый ввод берёт значение из состояния React. Атрибут value связан с переменной состояния, а каждое нажатие клавиши проходит через обработчик onChange, который эту переменную обновляет. Состояние — единственный источник истины, поэтому поле всегда показывает ровно то, что лежит в состоянии. Контролируемый ввод без обработчика onChange — это поле только для чтения, и React предупредит об этом в разработке.\n\nНеконтролируемый ввод оставляет значение у DOM. Начальное значение приходит через defaultValue, а текущее читается из DOM через ref, когда оно понадобится. В состоянии React ничего не лежит, поэтому ввод не вызывает рендер компонента, а поле работает даже до загрузки бандла.\n\nКонтролируемая форма — умолчание в React, потому что значение поля становится обычным значением, которое можно проверить, отформатировать, сбросить и отправить. Неконтролируемая форма уместна, когда значение важно только в момент отправки, и для полей выбора файлов, значение которых вообще нельзя задать из JavaScript. Контролируемый ввод, значение которого никогда не меняется, — это баг: каретка прыгает в конец и поле выглядит замороженным.\n\nОбе формы можно смешивать в одной, но у каждого поля должен быть ровно один владелец. Если поле контролируется переменной состояния и одновременно пишется из DOM, они конфликтуют, и поле мерцает. Решите, кто владеет значением, ещё до написания обработчика.'
      ),
      bullets: [
        L('Controlled: the value comes from state, onChange writes the new value back.', 'Контролируемый: значение из состояния, onChange пишет новое значение обратно.'),
        L('Uncontrolled: defaultValue seeds the DOM, a ref reads the current value.', 'Неконтролируемый: defaultValue задаёт DOM, ref читает текущее значение.'),
        L('A controlled input without onChange is read-only and React warns about it.', 'Контролируемый ввод без onChange — поле только для чтения, React предупредит об этом.'),
        L('Controlled inputs re-render on every keystroke, uncontrolled ones do not.', 'Контролируемые вводы перерисовываются на каждое нажатие, неконтролируемые — нет.'),
        L('Never give one field two owners, the value and the DOM will fight.', 'Никогда не отдавайте одно поле двум владельцам: значение и DOM начнут конфликтовать.'),
      ],
      code: `function Controlled() {
  const [name, setName] = useState('');
  return (
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}

function Uncontrolled() {
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputRef.current.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="Ada" />
    </form>
  );
}`,
      table: {
        caption: L('Two ways to own the value of a field', 'Два способа владеть значением поля'),
        headers: [L('Aspect', 'Аспект'), L('Controlled', 'Контролируемый'), L('Uncontrolled', 'Неконтролируемый')],
        rows: [
          [L('Value owner', 'Владелец значения'), L('React state', 'состояние React'), L('the DOM element', 'элемент DOM')],
          [L('Initial value', 'Начальное значение'), L('value', 'value'), L('defaultValue', 'defaultValue')],
          [L('Read the current value', 'Прочитать текущее значение'), L('the state variable', 'переменная состояния'), L('ref.current.value', 'ref.current.value')],
          [L('Re-render on typing', 'Рендер при вводе'), L('yes', 'да'), L('no', 'нет')],
          [L('Reset', 'Сброс'), L('set the state back', 'вернуть состояние'), L('reset the form', 'сбросить форму')],
          [L('Good for', 'Хорошо для'), L('validation and formatting', 'валидации и форматирования'), L('submit time values, file inputs', 'значений на момент отправки, полей файлов')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A frozen field', 'Замороженное поле'),
          text: L(
            'A controlled input whose value never changes, or one without an onChange handler, gives the user no way to type. The field accepts focus and the caret moves, but the characters do not appear, and the mistake looks like a browser problem.',
            'Контролируемый ввод, значение которого никогда не меняется, или ввод без обработчика onChange не даёт пользователю ничего вводить. Поле принимает фокус, каретка двигается, а символы не появляются, и ошибка выглядит как проблема браузера.'
          ),
        },
        {
          tone: 'tip',
          title: L('One owner per field', 'Один владелец на поле'),
          text: L(
            'Pick either controlled or uncontrolled for a field and stay with it. A field that is bound to state and also read from the DOM will flicker between two sources of truth.',
            'Для каждого поля выберите либо контролируемый, либо неконтролируемый вариант и не меняйте решение. Поле, связанное со состоянием и одновременно читаемое из DOM, будет мерцать между двумя источниками истины.'
          ),
        },
      ],
      takeaway: L(
        'Prefer controlled inputs, give every field exactly one owner and read an uncontrolled value through a ref at the moment you need it.',
        'Предпочитайте контролируемые вводы, давайте каждому полю ровно одного владельца и читайте неконтролируемое значение через ref в момент надобности.'
      ),
      seeAlso: [
        L('Chapter 9: forms', 'Глава 9: формы'),
        L('Section 3-4: lifting state up', 'Секция 3-4: подъём состояния'),
        L('Section 4-2: state as a snapshot', 'Секция 4-2: состояние как снимок'),
      ],
    },
    {
      id: 'react-ch3-s4',
      title: L('Lifting state up', 'Подъём состояния'),
      body: L(
        'Lifting state up means moving a state variable to the closest common ancestor of the components that need it. React has no shared mutable state between components, so the only way for two siblings to agree on a value is for the parent to own it and pass it down. The parent passes the value as a prop and receives the changes through a callback prop.\n\nThe rule behind it is one source of truth. If the same value lives in two places, the copies drift apart and the interface shows two different answers to the same question. Lifting the state to the parent removes the duplication: one variable, one place that writes it, and every reader receives the same value.\n\nThe pattern behind this is the controlled component. A child that accepts a value and an onChange callback is controlled by the parent and can be reused for any field, because the parent decides what the value means and when it changes. This is the same pattern as a controlled input, applied to any piece of state, and it is what makes forms with validation possible.\n\nDo not lift state further than needed. The state belongs in the closest ancestor that needs it, and moving it higher adds re-renders of the whole subtree and longer prop chains. If two distant parts of the tree need the same value, the answer is usually a dedicated state container or a context, not a state variable in the root.',
        'Подъём состояния означает перенос переменной состояния в ближайшего общего предка тех компонентов, которым она нужна. У React нет общего изменяемого состояния между компонентами, поэтому единственный способ двум соседям договориться — это владелец в родителе, который передаёт значение вниз. Родитель отдаёт значение пропсом и получает изменения через колбэк-проп.\n\nЗа этим стоит правило единственного источника истины. Если одно и то же значение живёт в двух местах, копии расходятся, и интерфейс даёт два разных ответа на один вопрос. Подъём состояния в родителя убирает дублирование: одна переменная, одно место, где её пишут, и все читатели получают одно значение.\n\nЗа этим стоит паттерн контролируемого компонента. Ребёнок, принимающий значение и колбэк onChange, управляется родителем и подходит для любого поля, потому что родитель решает, что значит значение и когда оно меняется. Это тот же паттерн, что и у контролируемого ввода, но применённый к любому состоянию, и именно он делает возможными формы с валидацией.\n\nНе поднимайте состояние дальше, чем нужно. Состояние принадлежит ближайшему предку, которому оно нужно, а подъём выше добавляет перерисовки всего поддерева и удлиняет цепочки пропсов. Если далёкие части дерева нуждаются в одном значении, ответом обычно становится отдельный контейнер состояния или контекст, а не переменная в корне.'
      ),
      bullets: [
        L('Two siblings that must agree need a common owner, the nearest common parent.', 'Два соседа, которые должны согласоваться, нуждаются в общем владельце — ближайшем общем родителе.'),
        L('One source of truth: never store the same value in two places.', 'Единственный источник истины: никогда не храните одно значение в двух местах.'),
        L('The controlled pattern passes the value down and the change up through a callback.', 'Паттерн контролируемого компонента передаёт значение вниз, а изменение — вверх через колбэк.'),
        L('Lift only as far as the closest ancestor that needs the value.', 'Поднимайте только до ближайшего предка, которому значение нужно.'),
        L('Distant consumers of the same value are a case for a store or a context.', 'Далёкие потребители одного значения — случай для контейнера состояния или контекста.'),
      ],
      code: `function App() {
  // One owner, two readers
  const [temperature, setTemperature] = useState(20);

  return (
    <section>
      <TemperatureInput
        value={temperature}
        onChange={setTemperature}
      />
      <TemperatureOutput value={temperature} />
    </section>
  );
}

function TemperatureInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}`,
      table: {
        caption: L('Where the state belongs', 'Где должно жить состояние'),
        headers: [L('Situation', 'Ситуация'), L('Owner', 'Владелец'), L('Note', 'Замечание')],
        rows: [
          [L('One component uses it', 'Его использует один компонент'), L('that component', 'этот компонент'), L('keep it local', 'держите локально')],
          [L('Two siblings use it', 'Его используют два соседа'), L('nearest common parent', 'ближайший общий родитель'), L('pass it down, lift changes up', 'вниз значение, вверх изменения')],
          [L('Two distant parts need it', 'Нужны далёкие части дерева'), L('a store or a context', 'контейнер состояния или контекст'), L('do not lift to the root', 'не поднимайте в корень')],
          [L('The value is derived', 'Значение производное'), L('nobody', 'никто'), L('compute it during render', 'считайте во время рендера')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('One source of truth', 'Единственный источник истины'),
          text: L(
            'Two copies of the same value always drift. When a form shows an error and a summary that disagree, the cause is usually a duplicated value rather than a bug in the validation.',
            'Две копии одного значения всегда расходятся. Когда форма показывает ошибку и сводку, которые противоречат друг другу, причина обычно в продублированном значении, а не в ошибке валидации.'
          ),
        },
        {
          tone: 'warning',
          title: L('Lifting too far', 'Подъём слишком высоко'),
          text: L(
            'A state variable in the root re-renders the whole application on every keystroke. That is the price of lifting, and it is why the state belongs in the closest ancestor that needs it.',
            'Переменная состояния в корне перерисовывает всё приложение на каждое нажатие клавиши. Это цена подъёма, и именно поэтому состояние принадлежит ближайшему нужному предку.'
          ),
        },
      ],
      takeaway: L(
        'Move state to the closest common ancestor that needs it and pass the value down with a callback for the change.',
        'Переносите состояние в ближайшего общего предка, которому оно нужно, и передавайте значение вниз, а изменение — вверх через колбэк.'
      ),
      seeAlso: [
        L('Section 3-5: choosing the component boundary', 'Секция 3-5: как выбрать границу компонента'),
        L('Section 4-6: colocation and normalised state', 'Секция 4-6: колокация и нормализация состояния'),
        L('Chapter 7: context', 'Глава 7: контекст'),
      ],
    },
    {
      id: 'react-ch3-s5',
      title: L('Choosing the component boundary', 'Как выбрать границу компонента'),
      body: L(
        'A component boundary is a decision about what belongs to which piece of code. The useful test is the reason to change: if two parts of a component change for different reasons and at different rates, they are separate components. Reuse is a reason as well, but a weak one, because a component extracted for a hypothetical reuse often ends up carrying a set of configuration props that nobody needs yet.\n\nThe opposite mistake is over-fragmentation. Splitting a form into fifteen components that each receive four props makes the data flow harder to follow than the original form, and every prop chain becomes another place where a value can be forgotten. A component that has one job and a short prop list is a good component; a component that needs a map of props to explain itself is not.\n\nProp drilling is the symptom of a boundary drawn in the wrong place. When a value passes through three components that never use it, either those components should not exist in that shape, or the value should reach its user by another route. The classic pair of shapes is the container component that owns the data and the presentational component that receives it, but the rule of thumb is simpler: keep the state and the logic where they are used and pass only what crosses the boundary.\n\nWhat to keep in the parent is a smaller question than it looks. The parent keeps the state that several children share and the callbacks that change that state; everything else belongs to the child. If a prop can be deleted by moving the code that used it, the boundary was drawn badly.',
        'Граница компонента — это решение о том, что к какому куску кода относится. Полезный критерий — причина изменения: если две части компонента меняются по разным причинам и с разной частотой, это разные компоненты. Повторное использование тоже причина, но слабая: компонент, выделенный ради гипотетического переиспользования, часто тащит набор конфигурационных пропсов, которые пока никому не нужны.\n\nОбратная ошибка — избыточное дробление. Разбив форму на пятнадцать компонентов, каждый из которых получает четыре пропа, вы делаете поток данных сложнее исходной формы, и каждая цепочка пропсов становится ещё одним местом, где можно забыть значение. Хорош компонент с одной задачей и коротким списком пропсов; плох тот, который требует карты пропсов, чтобы объяснить себя.\n\nProp drilling — это симптом неверно проведённой границы. Когда значение проходит сквозь три компонента, которые его не используют, либо эти компоненты не должны существовать в таком виде, либо значение должно попасть к своему потребителю иным путём. Классическая пара форм — контейнерный компонент, владеющий данными, и презентационный, который их получает, но простое правило звучит так: держите состояние и логику там, где они используются, и передавайте только то, что пересекает границу.\n\nВопрос о том, что оставить родителю, проще, чем кажется. Родитель держит состояние, которым пользуются несколько детей, и колбэки, которые это состояние меняют; всё остальное принадлежит ребёнку. Если проп можно удалить, перенеся код, который его использовал, граница проведена неудачно.'
      ),
      bullets: [
        L('Split when the parts change for different reasons or at different rates.', 'Делите, когда части меняются по разным причинам или с разной частотой.'),
        L('Reuse alone is a weak reason to extract a component.', 'Одно лишь переиспользование — слабая причина выделять компонент.'),
        L('Over-fragmentation produces long prop chains and a hidden data flow.', 'Избыточное дробление даёт длинные цепочки пропсов и скрытый поток данных.'),
        L('Prop drilling means the boundary is in the wrong place.', 'Prop drilling означает, что граница проведена не там.'),
        L('Keep the shared state and the change callbacks in the parent, everything else in the child.', 'Общее состояние и колбэки изменений оставляйте родителю, всё остальное — ребёнку.'),
      ],
      code: `// The parent owns the shared state and the callbacks
function OrderPage({ order }) {
  const [status, setStatus] = useState('new');
  const total = computeTotal(order.items);

  return (
    <main>
      <OrderStatus status={status} onAdvance={() => setStatus('paid')} />
      <OrderLines items={order.items} />
      <OrderTotal total={total} />
    </main>
  );
}

// The child owns everything about its own appearance
function OrderStatus({ status, onAdvance }) {
  return (
    <div>
      <span>{status}</span>
      <button onClick={onAdvance}>Advance</button>
    </div>
  );
}`,
      table: {
        caption: L('Signals for splitting and for keeping together', 'Сигналы разделять и держать вместе'),
        headers: [L('Signal', 'Сигнал'), L('Action', 'Действие')],
        rows: [
          [L('Two parts change for different reasons', 'Две части меняются по разным причинам'), L('split them', 'разделить')],
          [L('A prop list grows with every variant', 'Список пропсов растёт с каждым вариантом'), L('split and pass children', 'разделить и передать потомков')],
          [L('A value passes through components that ignore it', 'Значение проходит через компоненты, которые его не используют'), L('move the state closer', 'перенести состояние ближе')],
          [L('One part is reused elsewhere', 'Одна часть переиспользуется в другом месте'), L('maybe split', 'возможно, разделить')],
          [L('The parent passes more than five props', 'Родитель передаёт больше пяти пропсов'), L('look for a missing boundary', 'искать пропущенную границу')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Prefer a clear parent with plain children', 'Предпочитайте понятного родителя с простыми детьми'),
          text: L(
            'A parent that owns the data and renders plain children is easy to follow and easy to test. Split the children when they gain their own state, and not one render earlier.',
            'Родитель, который владеет данными и рисует простых детей, легко читается и легко тестируется. Делите детей, когда у них появляется своё состояние, и не на рендер раньше.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Prop drilling is a signal', 'Prop drilling — это сигнал'),
          text: L(
            'Passing a value through components that never read it is not free. Those components re-render whenever the value changes and every reader has to look further to find where the value comes from.',
            'Передача значения через компоненты, которые его никогда не читают, не бесплатна. Эти компоненты перерисовываются при каждом изменении значения, а читателю приходится искать, откуда оно взялось.'
          ),
        },
      ],
      takeaway: L(
        'Split a component when its parts change for different reasons, and keep the shared state and the callbacks in the parent.',
        'Делите компонент, когда части меняются по разным причинам, и оставляйте общее состояние и колбэки родителю.'
      ),
      seeAlso: [
        L('Section 3-4: lifting state up', 'Секция 3-4: подъём состояния'),
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропсы, потомки и композиция'),
        L('Chapter 10: performance', 'Глава 10: производительность'),
      ],
    },
  ],
};
