import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh01: Chapter = {
  id: 'react-ch1',
  title: L('JSX and elements', 'JSX и элементы'),
  summary: L(
    'What JSX compiles to, how an element differs from a component instance, why the key decides how a list is matched, and how conditional rendering and composition shape a component tree.',
    'Что превращается в JSX, чем элемент отличается от инстанса компонента, почему key определяет сопоставление элементов списка и как условный рендер с композицией формируют дерево компонентов.'
  ),
  sections: [
    {
      id: 'react-ch1-s1',
      title: L('What JSX compiles to', 'Что превращается в JSX'),
      body: L(
        'JSX is a syntax extension for JavaScript, and it is transformed at build time by a compiler plugin. The browser never sees a tag. The transform rewrites every tag into a function call that returns a plain object with three meaningful fields: a type, a key and a props object. The modern automatic runtime emits calls to jsx() from react/jsx-runtime, while the older classic runtime emitted React.createElement. The result is deliberately boring data rather than a live thing, which is exactly why it can be created, compared and thrown away cheaply.\n\nThe markup only looks like HTML. A lowercase tag such as div becomes a string type and React creates a host component; a capitalised name such as Widget becomes a reference to your function and React calls it later. Attributes are props, so class becomes className, for becomes htmlFor and style is an object rather than a string. Every tag must be closed, expressions go inside curly braces, and there are no directives: there is no v-if and no ng-show, only JavaScript.\n\nFragments exist for the case where a component must return more than one node. The shorthand <> ... </> compiles to a call with the Fragment symbol, and React groups the children without adding a wrapper element to the DOM. The shorthand cannot take a key, so when a fragment appears inside a list you use the explicit <Fragment key={id}> form from React itself.\n\nThe practical consequence is that debugging happens on compiled output. A stack frame points at the transformed file, so source maps decide whether an error message names your source line or a generated one. React error messages also talk about element types such as "div" or "MyComponent" rather than about markup, and the React DevTools panel is often faster than a console.log because it shows the props and the state of the tree as it is right now.',
        'JSX — это расширение синтаксиса JavaScript, и оно преобразуется на этапе сборки плагином компилятора. Браузер никогда не видит тега. Преобразование переписывает каждый тег в вызов функции, который возвращает обычный объект с тремя значимыми полями: type, key и props. Современный автоматический рантайм порождает вызовы jsx() из react/jsx-runtime, а старый классический рантайм — React.createElement. Результат намеренно прост: это данные, а не живая сущность, и именно поэтому элемент можно дёшево создать, сравнить и выбросить.\n\nРазметка только похожа на HTML. Тег со строчной буквы вроде div становится строкой и создаёт хост-компонент, а имя с заглавной буквы вроде Widget становится ссылкой на вашу функцию, которую React вызовет позже. Атрибуты — это пропсы, поэтому class превращается в className, for в htmlFor, а style является объектом, а не строкой. Каждый тег нужно закрывать, выражения пишутся в фигурных скобках, а директив нет: ни v-if, ни ng-show, только обычный JavaScript.\n\nФрагменты существуют для случая, когда компонент обязан вернуть больше одного узла. Сокращение <> ... </> превращается в вызов с символом Fragment, и React группирует потомков, не добавляя обёртку в DOM. У сокращения нет ключа, поэтому внутри списка приходится писать явную форму <Fragment key={id}> из самой библиотеки React.\n\nПрактическое следствие всего этого — отладка идёт по скомпилированному коду: кадр стека указывает на сгенерированный файл, и исходные карты решат, увидите ли вы в ошибке свою строку. Сообщения React говорят о типах элементов, таких как "div" или "MyComponent", а не о разметке, и панель React DevTools часто быстрее обычного console.log, потому что показывает пропсы и состояние дерева прямо сейчас.'
      ),
      bullets: [
        L('JSX compiles into a call that returns a plain object with type, key and props.', 'JSX компилируется в вызов, возвращающий обычный объект с type, key и props.'),
        L('Lowercase tags create host components, capitalised names create component elements.', 'Теги со строчной буквы создают хост-компоненты, имена с заглавной — элементы компонентов.'),
        L('The automatic runtime calls jsx() from react/jsx-runtime, the classic one called React.createElement.', 'Автоматический рантайм вызывает jsx() из react/jsx-runtime, классический — React.createElement.'),
        L('Attributes are props: className, htmlFor and a style object replace the HTML spellings.', 'Атрибуты — это пропсы: className, htmlFor и объект style вместо HTML-написаний.'),
        L('Fragments return several siblings without adding a wrapper node to the DOM.', 'Фрагменты возвращают несколько соседей, не добавляя обёртку в DOM.'),
      ],
      code: `// JSX is compiled at build time, never interpreted by the browser
const element = (
  <button className="btn" onClick={handleClick}>
    Save
  </button>
);

// with the automatic runtime this becomes roughly:
// jsx('button', { className: 'btn', onClick: handleClick, children: 'Save' })

// the result is data, not a DOM node
element.type;    // 'button' - a host component
element.props;  // { className: 'btn', onClick: fn, children: 'Save' }

// fragments need no wrapper element
const pair = (
  <>
    <dt>name</dt>
    <dd>Ada</dd>
  </>
);`,
      table: {
        caption: L('JSX and the call it compiles to', 'JSX и вызов, в который он превращается'),
        headers: [L('JSX', 'JSX'), L('Compiled call', 'Скомпилированный вызов'), L('Meaning', 'Смысл')],
        rows: [
          [L('<div />', '<div />'), L("jsx('div', {})", "jsx('div', {})"), L('host element', 'хост-элемент')],
          [L('<Widget a={1} />', '<Widget a={1} />'), L('jsx(Widget, { a: 1 })', 'jsx(Widget, { a: 1 })'), L('component element', 'элемент компонента')],
          [L('<></>', '<></>'), L('jsx(Fragment, { children })', 'jsx(Fragment, { children })'), L('no DOM node', 'без узла DOM')],
          [L('<div key="k" />', '<div key="k" />'), L("jsx('div', {}, 'k')", "jsx('div', {}, 'k')"), L('key is passed apart', 'key передаётся отдельно')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('JSX is not HTML', 'JSX — это не HTML'),
          text: L(
            'The syntax resembles HTML, so the differences look like typos. Tags must be closed, attributes use JavaScript names, style takes an object, and there is no way to write a raw HTML attribute. Reading JSX as HTML is the fastest way to write code the compiler rejects.',
            'Синтаксис напоминает HTML, поэтому отличия выглядят как опечатки. Теги нужно закрывать, атрибуты используют имена JavaScript, style принимает объект, и написать «сырой» HTML-атрибут невозможно. Чтение JSX как HTML — самый быстрый способ написать код, который компилятор не примет.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep source maps on', 'Не выключайте исходные карты'),
          text: L(
            'Stack traces point at the transformed output. With source maps configured, an error names your own file and line; without them it names generated code and the debugging session turns into archaeology.',
            'Кадры стека указывают на преобразованный результат. С исходными картами ошибка называет ваш файл и строку, без них — сгенерированный код, и отладка превращается в раскопки.'
          ),
        },
      ],
      takeaway: L(
        'JSX is a build-time syntax that produces plain objects, so React only ever sees type, key and props.',
        'JSX — это синтаксис, который на этапе сборки даёт обычные объекты, поэтому React видит только type, key и props.'
      ),
      seeAlso: [
        L('Section 1-2: elements versus component instances', 'Секция 1-2: элементы против инстансов компонентов'),
        L('Chapter 2: the rendering model', 'Глава 2: модель рендера'),
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропсы, потомки и композиция'),
      ],
    },
    {
      id: 'react-ch1-s2',
      title: L('Elements versus component instances', 'Элементы против инстансов компонентов'),
      body: L(
        'An element is a description, a component instance is a live object. Writing <Counter /> produces an element: an immutable value with a type and a props object. React then mounts that element, and mounting creates a component instance that holds the state, the refs and the effects belonging to that particular placement in the tree. One element object may be rendered in several places, and each placement gets its own instance with its own independent state.\n\nThe instance is what remembers. What useState wrote, the current value of a ref and the running effects all live on the instance. The element itself is frozen: you cannot push a new prop into it after creation, which is the reason props are treated as read-only everywhere. React freezes elements in development to catch exactly this mistake, so mutating element.props throws instead of failing quietly.\n\nIdentity of a position is decided by two things: the type of the element and its key. While both stay the same, React updates the existing instance in place and its state survives the update. Change either one and React has no choice but to unmount the old instance and mount a new one, so the new instance starts with no state, no refs and no effects.\n\nThis is why a conditional that swaps the type of a component behaves like a reset. Rendering <UserCard /> in one branch and <UserPanel /> in the other does not switch views, it destroys one component and creates another. When you want a reset on purpose, change the key instead and let the identity change do the work.',
        'Элемент — это описание, инстанс компонента — живой объект. Запись <Counter /> создаёт элемент: неизменяемое значение с типом и объектом пропсов. Затем React монтирует этот элемент, и при монтировании создаётся инстанс компонента, который хранит состояние, рефы и эффекты именно этого места в дереве. Один и тот же объект элемента можно отрисовать в нескольких местах, и каждое место получит собственный инстанс с собственным независимым состоянием.\n\nИнстанс — это то, что помнит. То, что записал useState, текущее значение рефа и работающие эффекты живут на инстансе. Сам элемент заморожен: после создания в него нельзя записать новый проп, и именно поэтому пропсы всюду считаются доступными только для чтения. В dev-режиме React замораживает элементы, чтобы ловить именно такую ошибку, поэтому попытка изменить element.props бросает исключение, а не тихо ломает дерево.\n\nИдентичность позиции определяется двумя вещами: типом элемента и его key. Пока оба остаются прежними, React обновляет существующий инстанс на месте, и его состояние переживает обновление. Смените что-то одно, и у React не остаётся выбора, кроме как размонтировать старый инстанс и смонтировать новый, а значит, новый инстанс начинается без состояния, без рефов и без эффектов.\n\nИменно поэтому условие, меняющее тип компонента, ведёт себя как сброс. Отрисовка <UserCard /> в одной ветке и <UserPanel /> в другой не переключает вид, а уничтожает один компонент и создаёт другой. Когда сброс нужен намеренно, меняйте key, и тогда всю работу сделает смена идентичности.'
      ),
      bullets: [
        L('An element is an immutable description, an instance is the live holder of state, refs and effects.', 'Элемент — неизменяемое описание, инстанс — живой хранитель состояния, рефов и эффектов.'),
        L('The same element rendered twice produces two independent instances.', 'Один элемент, отрисованный в двух местах, даёт два независимых инстанса.'),
        L('Props are read-only: the element object is frozen after creation.', 'Пропсы доступны только для чтения: объект элемента заморожен после создания.'),
        L('Same type and same key update the instance in place and keep its state.', 'Тот же тип и тот же key обновляют инстанс на месте и сохраняют его состояние.'),
        L('A different type or a different key unmounts and remounts, discarding the state.', 'Другой тип или другой key приводят к размонтированию и новому инстансу, состояние теряется.'),
      ],
      code: `// An element is data, not a live thing
const element = <Counter start={0} />;
element.type;    // the Counter function
element.props;  // { start: 0 }

// The same element can be rendered twice,
// and each placement gets its own instance with its own state.
function App() {
  return (
    <>
      <Counter start={0} />
      <Counter start={0} />
    </>
  );
}

// A different type at the same position remounts the component
function Panel({ mode }) {
  return mode === 'card' ? <UserCard /> : <UserPanel />;
}`,
      table: {
        caption: L('Element and instance side by side', 'Элемент и инстанс рядом'),
        headers: [L('Aspect', 'Аспект'), L('Element', 'Элемент'), L('Instance', 'Инстанс')],
        rows: [
          [L('What it is', 'Что это'), L('plain immutable object', 'обычный неизменяемый объект'), L('live object tied to a position', 'живой объект на месте в дереве')],
          [L('Holds', 'Что хранит'), L('type, key, props', 'type, key, props'), L('state, refs, effects', 'состояние, рефы, эффекты')],
          [L('Created by', 'Кто создаёт'), L('your JSX code', 'ваш JSX-код'), L('React, when mounting', 'React при монтировании')],
          [L('Lifetime', 'Время жизни'), L('immutable, reusable', 'неизменяем, переиспользуем'), L('destroyed on unmount', 'уничтожается при размонтировании')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Swapping the type resets the component', 'Смена типа сбрасывает компонент'),
          text: L(
            'Rendering UserCard in one branch and UserPanel in the other does not switch a view, it destroys one component and creates another, and every piece of state inside is lost. To change the data instead, keep the type stable and change the props.',
            'Отрисовка UserCard в одной ветке и UserPanel в другой не переключает вид, а уничтожает один компонент и создаёт другой, теряя всё состояние внутри. Чтобы менять данные, держите тип постоянным и меняйте пропсы.'
          ),
        },
      ],
      takeaway: L(
        'Elements are immutable descriptions and state lives on instances, so changing the type or the key at a position resets the component.',
        'Элементы — неизменяемые описания, а состояние живёт на инстансах, поэтому смена типа или key на позиции сбрасывает компонент.'
      ),
      seeAlso: [
        L('Section 1-3: keys and list rendering', 'Секция 1-3: ключи и рендер списков'),
        L('Section 2-2: reconciliation and the fiber tree', 'Секция 2-2: согласование и дерево волокон'),
        L('Section 4-1: useState and the rules of state', 'Секция 4-1: useState и правила состояния'),
      ],
    },
    {
      id: 'react-ch1-s3',
      title: L('Keys and list rendering', 'Ключи и рендер списков'),
      body: L(
        'When React renders an array of children it has to decide which new child continues which previous child, because the children of a component are positional and the DOM has no names. The key is the only identifier React accepts for that decision. Keys are compared between the previous render and the next one with Object.is, and a child whose key is unchanged keeps the same instance, the same state and the same DOM node.\n\nThe index is the key that breaks this. With key={index}, inserting a row at the top shifts every index, so the item that used to be row two is now row three, and React concludes that row two changed rather than that a new row appeared. The state follows the index, and the user sees the checkbox of one row ticked while typing in another. The DOM is also rebuilt more than necessary.\n\nA good key comes from the data itself: a database id, a slug, a UUID. It must be stable across renders, unique among the siblings of the same list, and it must not change when the list is reordered. Keys are compared only between siblings, so the same key may safely appear in two different lists, and a key is not a prop: it does not arrive inside props and cannot be read inside the child.\n\nThere is one acceptable use of the index: a static list that never reorders, never inserts and never removes. Even then, using an explicit key documents that the positions are fixed. When the list can change, the cost of a wrong key is a reset of state, a lost focus and a wrong selection, while the cost of a proper key is one property on your data model.',
        'Когда React отрисовывает массив потомков, он решает, какой новый потомок продолжает какого прежнего: потомки компонента позиционны, а у DOM нет имён. Единственный идентификатор, который React принимает для такого решения, — это key. Ключи сравниваются между предыдущим и следующим рендером через Object.is, и потомок с неизменившимся ключом сохраняет тот же инстанс, то же состояние и тот же узел DOM.\n\nИндекс — как раз тот ключ, который всё ломает. С key={index} вставка строки в начало сдвигает все индексы, и пункт, который был вторым, становится третьим, а React заключает, что второй пункт изменился, а не что появился новый. Состояние едет за индексом, и пользователь видит, как отметка одной строки переезжает в другую, а DOM перестраивается лишний раз.\n\nХороший ключ берётся из самих данных: идентификатор из базы, слаг, UUID. Он должен быть стабильным между рендерами, уникальным среди соседей одного списка и не меняться при перестановке. Ключи сравниваются только между соседями, поэтому один и тот же ключ спокойно встречается в двух разных списках, а сам ключ не является пропсом: он не приходит внутрь props и недоступен внутри компонента.\n\nДопустимое применение индекса одно — статичный список, который никогда не переставляется, не пополняется и не сокращается. И тогда явный ключ всё равно полезен: он документирует, что позиции фиксированы. Когда список меняется, цена неверного ключа — сброс состояния, потеря фокуса и неверное выделение, а цена правильного ключа — одно поле в модели данных.'
      ),
      bullets: [
        L('Keys tell React which previous child a new child continues, compared with Object.is.', 'Ключи говорят React, какой прежний потомок продолжается, и сравниваются через Object.is.'),
        L('An index key shifts identity when rows are inserted or removed, so state lands on the wrong row.', 'Индексный ключ сдвигает идентичность при вставке и удалении, и состояние попадает не на ту строку.'),
        L('Use an id from the data: stable across renders, unique among siblings, unchanged by reordering.', 'Берите id из данных: стабильный между рендерами, уникальный среди соседей, не меняется при перестановке.'),
        L('Keys are compared between siblings only, and a key never arrives inside props.', 'Ключи сравниваются только между соседями, и ключ никогда не приходит внутрь props.'),
        L('An index key is only safe for a list that never reorders, inserts or removes.', 'Индексный ключ безопасен только для списка, который не переставляется, не пополняется и не сокращается.'),
      ],
      code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        // Never key by index: inserting at the top shifts every key
        <li key={todo.id}>
          <input defaultChecked={todo.done} />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

// Same key at the same position: React keeps the instance and its state
// Different key at the same position: React remounts and the state is lost
function Panel({ userId }) {
  return <Profile key={userId} userId={userId} />;
}`,
      table: {
        caption: L('What the key decides', 'Что решает key'),
        headers: [L('Situation', 'Ситуация'), L('Same key', 'Одинаковый key'), L('Different key', 'Другой key')],
        rows: [
          [L('Row reordered', 'Строка переставлена'), L('instance travels with the row', 'инстанс едет вместе со строкой'), L('instances stay in place', 'инстансы остаются на местах')],
          [L('Row inserted at the top', 'Строка вставлена в начало'), L('existing rows keep their state', 'существующие строки сохраняют состояние'), L('state shifts with index keys', 'с индексными ключами состояние съезжает')],
          [L('Row removed', 'Строка удалена'), L('remaining rows keep their state', 'оставшиеся строки сохраняют состояние'), L('the last row is reused', 'последняя строка переиспользуется')],
          [L('Type changed', 'Сменился тип'), L('not applicable', 'неприменимо'), L('instance is remounted', 'инстанс пересоздаётся')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Index keys move the state', 'Индексные ключи двигают состояние'),
          text: L(
            'With a list of inputs keyed by index, typing in the second row and then inserting a new first row puts the text into the wrong input. The rows did not change, only their positions did, and the state followed the positions.',
            'В списке полей ввода с ключом по индексу ввод во вторую строку, а затем вставка новой первой строки переносит текст не в то поле. Строки не менялись, изменились только позиции, и состояние поехало за позициями.'
          ),
        },
        {
          tone: 'note',
          title: L('A key is not a prop', 'Key — это не проп'),
          text: L(
            'Inside the child, key is not available through props and cannot be read. If a component needs the identifier, pass it a second time as a normal prop.',
            'Внутри дочернего компонента key недоступен через props и не читается. Если компоненту нужен идентификатор, передайте его вторым обычным пропом.'
          ),
        },
      ],
      takeaway: L(
        'Key every list item by a stable id taken from the data, never by the array index.',
        'Ключуйте каждый элемент списка стабильным id из данных, а не индексом массива.'
      ),
      seeAlso: [
        L('Section 1-2: elements versus component instances', 'Секция 1-2: элементы против инстансов компонентов'),
        L('Section 4-6: colocation and normalised state', 'Секция 4-6: колокация и нормализация состояния'),
        L('Chapter 2: the rendering model', 'Глава 2: модель рендера'),
      ],
    },
    {
      id: 'react-ch1-s4',
      title: L('Conditional rendering and composition', 'Условный рендер и композиция'),
      body: L(
        'A component returns one of several trees depending on its state. The usual tools are the conditional operator, the logical AND and a null return. The conditional operator picks between two branches and stays the clearest when both branches are real elements. The logical AND is shorter but carries a trap: if the left side is the number 0, React renders the character 0 on the screen, because 0 is a valid renderable child and not a boolean.\n\nThe trap comes from the type of the value rather than from its truthiness. An empty string is also renderable, and a guard that returns it paints an empty label. The guard has to produce null or undefined instead. The reliable options are a ternary that ends with null, a comparison such as count > 0 && <Badge />, or the nullish coalescing operator, which falls back only for null and undefined and therefore keeps a legitimate zero.\n\nReturning null is the standard way to render nothing, and undefined is treated the same way. Neither creates a DOM node, so a component that returns null still occupies a position in the tree and its state survives as long as the component itself stays mounted. A component that returns false renders nothing as well, but null is clearer to read and matches the type of the branch.\n\nComposition is the other half of conditional rendering. Instead of a component that grows props such as showHeader, showFooter and headerText, you accept children and render them where they belong, and you let the parent decide what to put there. A wrapper with a children prop accepts any content, while a component with named slots such as header and footer accepts structured content and keeps control of the layout.',
        'Компонент возвращает одно из нескольких деревьев в зависимости от состояния. Обычные инструменты — тернарный оператор, логическое И и возврат null. Тернарный оператор выбирает одну из двух веток и остаётся самым ясным, когда обе ветки — настоящие элементы. Логическое И короче, но несёт ловушку: если слева число 0, React отрисует символ 0, потому что 0 — допустимый потомок, а не логическое значение.\n\nЛовушка приходит от типа значения, а не от его ложности. Пустая строка тоже рисуется, и guard, возвращающий её, оставит пустую подпись. Guard должен давать null или undefined. Надёжные варианты — тернарный оператор, заканчивающийся null, сравнение вида count > 0 && <Badge />, либо оператор ??, который срабатывает только на null и undefined и потому сохраняет законный ноль.\n\nВозврат null — стандартный способ ничего не рисовать, и undefined трактуется так же. Ни то, ни другое не создаёт узел DOM, поэтому компонент, возвращающий null, всё равно занимает позицию в дереве, и его состояние переживает рендеры, пока сам компонент смонтирован. Компонент, возвращающий false, тоже ничего не рисует, но null читается понятнее и соответствует типу ветки.\n\nКомпозиция — вторая половина условного рендера. Вместо компонента, у которого растут пропсы showHeader, showFooter и headerText, вы принимаете потомков и рендерите их там, где им место, а решение о содержимом оставляете родителю. Обёртка со свойством children принимает любое содержимое, а компонент с именованными слотами вроде header и footer принимает структурированное содержимое и сохраняет контроль над вёрсткой.'
      ),
      bullets: [
        L('The conditional operator is the clearest form when both branches are elements.', 'Тернарный оператор — самая ясная форма, когда обе ветки являются элементами.'),
        L('count && <Badge /> paints a zero when count is 0, so make the guard produce null.', 'count && <Badge /> рисует ноль, когда count равен 0, поэтому guard должен давать null.'),
        L('null and undefined render nothing but still keep the component mounted.', 'null и undefined не рисуют ничего, но компонент остаётся смонтированным.'),
        L('Composition through children replaces configuration props such as showHeader.', 'Композиция через children вытесняет конфигурационные пропсы вроде showHeader.'),
        L('Named slots keep the layout inside the component while the parent supplies the content.', 'Именованные слоты оставляют вёрстку внутри компонента, а родитель даёт содержимое.'),
      ],
      code: `function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App({ items, isEmpty }) {
  return (
    <Panel title="Items">
      {isEmpty ? <EmptyState /> : items.map((item) => <Row key={item.id} item={item} />)}
    </Panel>
  );
}

// The zero trap: renders the character 0
function Bad({ count }) {
  return <div>{count && <Badge value={count} />}</div>;
}`,
      table: {
        caption: L('Guards and what they actually render', 'Guard-ы и что они на самом деле рисуют'),
        headers: [L('Expression', 'Выражение'), L('count is 0', 'count равен 0'), L('count is 5', 'count равен 5')],
        rows: [
          [L('count && <Badge />', 'count && <Badge />'), L('renders "0"', 'рисует "0"'), L('renders the badge', 'рисует бейдж')],
          [L('count > 0 && <Badge />', 'count > 0 && <Badge />'), L('renders nothing', 'ничего не рисует'), L('renders the badge', 'рисует бейдж')],
          [L('count ? <Badge /> : null', 'count ? <Badge /> : null'), L('renders nothing', 'ничего не рисует'), L('renders the badge', 'рисует бейдж')],
          [L('count ?? <Badge />', 'count ?? <Badge />'), L('renders "0"', 'рисует "0"'), L('renders the badge', 'рисует бейдж')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The zero trap', 'Ловушка с нулём'),
          text: L(
            'The number 0 is a valid child, so a logical AND that guards a badge with count paints a stray zero on the page. The rule is simple: the guard must return null or undefined, never a falsy number.',
            'Число 0 — допустимый потомок, поэтому логическое И, охраняющее бейдж через count, рисует на странице лишний ноль. Правило простое: guard должен возвращать null или undefined, а не ложное число.'
          ),
        },
        {
          tone: 'tip',
          title: L('Composition beats configuration', 'Композиция вместо конфигурации'),
          text: L(
            'When a component asks for showHeader and headerText, every new variation adds a prop. When it accepts children and named slots, the caller decides the content and the component keeps control of the layout.',
            'Когда компонент просит showHeader и headerText, каждое новое использование добавляет проп. Когда он принимает children и именованные слоты, вызывающий код решает содержимое, а компонент сохраняет контроль над вёрсткой.'
          ),
        },
      ],
      takeaway: L(
        'Make every conditional guard produce null, and accept children instead of growing configuration props.',
        'Пусть каждый условный guard даёт null, а вместо растущих конфигурационных пропсов принимайте потомков.'
      ),
      seeAlso: [
        L('Section 3-2: props, children and composition', 'Секция 3-2: пропсы, потомки и композиция'),
        L('Section 1-2: elements versus component instances', 'Секция 1-2: элементы против инстансов компонентов'),
        L('Chapter 3: components and props', 'Глава 3: компоненты и пропсы'),
      ],
    },
  ],
};
