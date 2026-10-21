import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const reactChapterTasks: PracticeTask[] = [
  {
    id: 'ch-react-ch1-1',
    moduleId: 'react',
    topic: 'react',
    chapterId: 'react-ch1',
    level: 'basic',
    title: L('A list with keys and an empty state', 'Список с ключами и пустым состоянием'),
    brief: L(
      'Render a list of items with a stable key, show an empty state when there is nothing to render, and compose the list inside a panel that takes a title and children. A count of zero must not put the character 0 on the screen.',
      'Отрисуйте список элементов со стабильным ключом, покажите пустое состояние, когда рисовать нечего, и вложите список в панель с заголовком и потомками. Нулевой счёт не должен выводить на экран символ 0.'
    ),
    hint: L(
      'Key the rows by the item id, not by the index. A logical AND renders its left side when that side is falsy, so compare the count explicitly.',
      'Ключуйте строки по id элемента, а не по индексу. Логическое И выводит левую часть, когда она ложная, поэтому сравнивайте счёт явно.'
    ),
    solution: `import { type ReactNode } from 'react';

type Item = { id: string; title: string };

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function ItemList({ items, count }: { items: Item[]; count: number }) {
  return (
    <Panel title="Items">
      {items.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {/* The key is the item id, the index would shift on insert */}
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      {/* count > 0 avoids rendering the character "0" */}
      {count > 0 && <span>{count} new</span>}
    </Panel>
  );
}`,
    explanation: L(
      'A stable key lets React match the rows between renders, so inserting an item at the top does not shift the state of every row. The explicit comparison keeps a zero count from leaking the character 0 into the markup.',
      'Стабильный ключ позволяет React сопоставлять строки между рендерами, поэтому вставка в начало не сдвигает состояние всех строк. Явное сравнение не даёт нулевому счёту вывести символ 0 в разметку.'
    ),
  },
  {
    id: 'ch-react-ch2-1',
    moduleId: 'react',
    topic: 'react',
    chapterId: 'react-ch2',
    level: 'basic',
    title: L('The rendering model in three properties', 'Модель рендера в трёх свойствах'),
    brief: L(
      'Build a tree of three components where the root renders a layout and the layout renders a list of rows. Show three properties of the rendering model: a component element is a description with a type and props rather than a node of the tree, two state updates issued in one event handler are batched into a single re-render, and StrictMode calls the component function twice in development to expose impure code.',
      'Соберите дерево из трёх компонентов, где корень рендерит layout, а layout — список строк. Покажите три свойства модели рендера: элемент компонента — это описание с типом и пропсами, а не узел дерева; два обновления состояния, вызванные в одном обработчике, батчатся в один перерендер; а StrictMode в режиме разработки вызывает функцию компонента дважды, чтобы найти нечистый код.'
    ),
    hint: L(
      'The element JSX produces can be inspected before it is ever rendered: it carries the component function and its props. An event handler that changes the state twice leads to one re-render, not two. StrictMode is a wrapper around the tree, and the second call is a development-only probe.',
      'Элемент, который даёт JSX, можно осмотреть до того, как он отрисуется: в нём лежит функция компонента и её пропсы. Обработчик, меняющий состояние дважды, приводит к одному перерендеру, а не к двум. StrictMode — это обёртка над деревом, а второй вызов — это проверка только в режиме разработки.'
    ),
    solution: `import { StrictMode, useState } from 'react';

// The walk: App calls Layout, Layout calls Article.
function Article({ title }: { title: string }) {
  return <li>{title}</li>;
}

function Layout({ titles }: { titles: string[] }) {
  return (
    <section>
      <h2>Latest</h2>
      <ul>{titles.map((title) => <Article key={title} title={title} />)}</ul>
    </section>
  );
}

export function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* Two updates in one handler are batched into a single re-render */}
      <button onClick={() => { setCount((c) => c + 1); setCount((c) => c + 1); }}>
        count: {count}
      </button>
      <Layout titles={['first', 'second']} />
    </div>
  );
}

// A component element is a description: the type and the props, not a node.
const element = <Article title="Hello" />;
console.log(element.type === Article); // true
console.log(element.props.title);      // 'Hello'

// StrictMode calls the component twice in development to expose impure code.
export function StrictTree() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}`,
    explanation: L(
      'Rendering is a pure walk of the tree, so the element React receives is a description it may throw away and compute again. Batching means the two updates issued in one handler lead to a single re-render, and StrictMode repeats the render in development, where a component that mutates something outside itself shows its impurity.',
      'Рендер — чистый обход дерева, поэтому элемент, который получает React, — это описание, которое можно выбросить и посчитать заново. Батчинг означает, что два обновления из одного обработчика дают один перерендер, а StrictMode повторяет рендер в разработке, где компонент, меняющий что-то снаружи себя, показывает свою нечистоту.'
    ),
  },
  {
    id: 'ch-react-ch3-1',
    moduleId: 'react',
    topic: 'react',
    chapterId: 'react-ch3',
    level: 'basic',
    title: L('A card component with slots', 'Компонент-карточка со слотами'),
    brief: L(
      'Build a Card component that takes a title, children and an optional footer, and a controlled text field that reports every change to the parent. The parent owns the value, and the component must never mutate its props.',
      'Соберите компонент Card с заголовком, потомками и необязательным футером и контролируемое текстовое поле, которое сообщает родителю о каждом изменении. Значение принадлежит родителю, и компонент не должен менять свои пропсы.'
    ),
    hint: L(
      'Children and footer are slots: the parent decides the content, the card decides the layout. A controlled input gets its value from the props.',
      'Потомки и футер — это слоты: родитель решает содержимое, карточка отвечает за раскладку. Контролируемый вход получает значение из пропсов.'
    ),
    solution: `import { type ReactNode } from 'react';

export function Card({ title, footer, children }: {
  title: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article>
      <header>{title}</header>
      {children}
      {footer && <footer>{footer}</footer>}
    </article>
  );
}

// A controlled field: the parent owns the value, the child only reports changes
export function NameField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(event) => onChange(event.target.value)} />;
}`,
    explanation: L(
      'The card owns only the markup, so the same component serves any content. Lifting the value up keeps a single source of truth, and a component that only reads its props stays pure and predictable.',
      'Карточка отвечает только за разметку, поэтому один и тот же компонент подходит любому содержимому. Подъём значения вверх оставляет один источник правды, а компонент, который только читает пропсы, остаётся чистым и предсказуемым.'
    ),
  },
  {
    id: 'ch-react-ch4-1',
    moduleId: 'react',
    topic: 'hooks',
    chapterId: 'react-ch4',
    level: 'intermediate',
    title: L('A counter that does not lose updates', 'Счётчик, который не теряет обновления'),
    brief: L(
      'Implement a counter whose three increments inside one handler all count, and a cart whose total is derived during render instead of being stored in state. Explain why the first version of the handler loses one update.',
      'Реализуйте счётчик, у которого все три увеличения внутри одного обработчика засчитываются, и корзину, чей итог вычисляется во время рендера, а не хранится в состоянии. Объясните, почему первая версия обработчика теряет одно обновление.'
    ),
    hint: L(
      'A functional update receives the latest state, so the second call reads the result of the first. A value computed from props does not need a state field.',
      'Функциональное обновление получает самое свежее состояние, поэтому второй вызов читает результат первого. Значение, вычисленное из пропсов, не нуждается в поле состояния.'
    ),
    solution: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // A functional update reads the latest state, so all three count
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}

// The total is derived during render, there is no state to keep in sync
export function Cart({ items }: { items: { price: number }[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <p>Total: {total}</p>;
}`,
    explanation: L(
      'Two calls of setCount(count + 1) read the same snapshot of the render, so one update is lost, while the functional form applies both. The cart total is derived during render, so it can never disagree with the items.',
      'Два вызова setCount(count + 1) читают один и тот же снимок рендера, поэтому одно обновление теряется, а функциональная форма применяет оба. Итог корзины выводится во время рендера, поэтому он не может разойтись с товарами.'
    ),
  },
  {
    id: 'ch-react-ch5-1',
    moduleId: 'react',
    topic: 'hooks',
    chapterId: 'react-ch5',
    level: 'intermediate',
    title: L('A subscription and a title that restores itself', 'Подписка и заголовок, который восстанавливается'),
    brief: L(
      'Implement a hook that subscribes to an event and removes the listener on cleanup, and a hook that keeps the document title in sync and restores the previous title when it is torn down. The listener must always call the newest handler, so the subscription has to be set up again whenever the handler changes.',
      'Реализуйте хук, который подписывается на событие и снимает слушатель при очистке, и хук, который держит заголовок документа в синхроне и возвращает прежний заголовок при размонтировании. Слушатель должен всегда вызывать самый свежий обработчик, поэтому подписку приходится настраивать заново при каждой смене обработчика.'
    ),
    hint: L(
      'The dependency array decides when the effect runs again: a handler that is missing from it leaves the listener calling the version from the first render. The cleanup of a title effect restores the old value.',
      'Массив зависимостей решает, когда эффект выполнится заново: обработчик, которого в нём нет, оставляет слушателю версию из первого рендера. Очистка эффекта заголовка возвращает старое значение.'
    ),
    solution: `import { useEffect } from 'react';

// The effect is set up again when the handler changes, so the listener
// always calls the newest one.
export function useEvent(name: string, handler: (event: Event) => void) {
  useEffect(() => {
    const listener = (event: Event) => handler(event);
    window.addEventListener(name, listener);
    return () => window.removeEventListener(name, listener);
  }, [name, handler]);
}

// The title is restored when the effect is cleaned up
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);
}`,
    explanation: L(
      'The dependency array decides when the effect is set up again, so putting the handler into it resubscribes on every change and the callback never goes stale. The title effect saves the previous value and puts it back, which keeps two mounted components from fighting over the document.',
      'Массив зависимостей решает, когда эффект настраивается заново, поэтому обработчик в нём переподписывает слушатель при каждой смене, и колбэк не устаревает. Эффект заголовка сохраняет прежнее значение и возвращает его, чтобы два смонтированных компонента не дрались за документ.'
    ),
  },
  {
    id: 'ch-react-ch6-1',
    moduleId: 'react',
    topic: 'hooks',
    chapterId: 'react-ch6',
    level: 'intermediate',
    title: L('An input with an imperative handle', 'Поле ввода с императивным handle'),
    brief: L(
      'Implement a text field that lets the parent call focus() and clear() through the ref. The component must expose exactly those two methods and nothing else.',
      'Реализуйте текстовое поле, через которое родитель вызывает focus() и clear() по ref. Компонент должен отдавать ровно эти два метода и больше ничего.'
    ),
    hint: L(
      'useImperativeHandle builds the object the parent sees. The DOM node itself stays in a ref inside the component.',
      'useImperativeHandle собирает объект, который видит родитель. Сам DOM-узел остаётся во внутреннем ref компонента.'
    ),
    solution: `import { type Ref, useImperativeHandle, useRef } from 'react';

type TextFieldHandle = { focus: () => void; clear: () => void };

type TextFieldProps = {
  label: string;
  ref?: Ref<TextFieldHandle>;
};

export function TextField({ label, ref }: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { if (inputRef.current) inputRef.current.value = ''; },
  }), []);
  return (
    <label>
      {label}
      <input ref={inputRef} type="text" />
    </label>
  );
}`,
    explanation: L(
      'The handle defines the whole public contract of the component, so the parent cannot reach the DOM node by accident. Keeping the node in an inner ref is what makes the handle small and stable across renders.',
      'Handle задаёт весь публичный контракт компонента, поэтому родитель случайно не достанет DOM-узел. Узел остаётся во внутреннем ref — именно это делает handle маленьким и стабильным между рендерами.'
    ),
  },
  {
    id: 'ch-react-ch7-1',
    moduleId: 'react',
    topic: 'react',
    chapterId: 'react-ch7',
    level: 'intermediate',
    title: L('Split a context by update frequency', 'Разделить контекст по частоте обновлений'),
    brief: L(
      'Create two contexts: one for a value that changes rarely and one for a value that changes on every pointer move. The provider value must be memoised, the fast provider must sit deep around the only consumer that needs it, and a consumer of the slow context must not re-render when the fast value changes.',
      'Создайте два контекста: для значения, которое меняется редко, и для значения, которое меняется при каждом движении указателя. Значение провайдера должно быть мемоизировано, быстрый провайдер должен стоять глубоко, вокруг единственного потребителя, которому он нужен, а потребитель медленного контекста не должен перерисовываться, когда меняется быстрое значение.'
    ),
    hint: L(
      'A new object on every render changes the identity of the provider value and re-renders every consumer. useMemo keeps the identity stable, and a provider placed deep wraps only the small part of the tree that reads it.',
      'Новый объект при каждом рендере меняет идентичность значения провайдера и перерисовывает всех потребителей. useMemo удерживает идентичность, а провайдер, поставленный глубоко, оборачивает только ту маленькую часть дерева, которая его читает.'
    ),
    solution: `import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

// Two contexts: the theme changes rarely, the position changes on every move
const ThemeContext = createContext<{ theme: string } | null>(null);
const PositionContext = createContext<{ x: number; y: number } | null>(null);

type ProviderProps = { position: { x: number; y: number }; children: ReactNode };

export function AppProvider({ position, children }: ProviderProps) {
  const [theme] = useState('dark');
  // A memoised value keeps the identity stable between renders
  const value = useMemo(() => ({ theme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      {/* the slow consumers live outside the fast provider */}
      {children}
      {/* the fast provider sits deep, around the only subscriber */}
      <PositionContext.Provider value={position}>
        <Cursor />
      </PositionContext.Provider>
    </ThemeContext.Provider>
  );
}

// The toolbar reads the slow context, it is not a subscriber to the fast value
export function Toolbar() {
  const { theme } = useContext(ThemeContext)!;
  return <nav data-theme={theme}>Menu</nav>;
}

// Only the cursor subscribes to the fast value, the toolbar stays untouched
export function Cursor() {
  const { x, y } = useContext(PositionContext)!;
  return <span>{x}, {y}</span>;
}`,
    explanation: L(
      'The two contexts split the update frequency: only the cursor subscribes to the fast value, so the toolbar stays untouched while the pointer moves. The memoised provider value is what keeps the slow consumers from re-rendering for no reason, and the deep fast provider makes sure the re-render stops at the small subtree.',
      'Два контекста разделяют частоту обновлений: быстрое значение читает только курсор, поэтому панель не трогается при движении указателя. Мемоизированное значение провайдера не даёт медленным потребителям перерисовываться без причины, а глубоко поставленный быстрый провайдер останавливает перерендер на маленьком поддереве.'
    ),
  },
  {
    id: 'ch-react-ch8-1',
    moduleId: 'react',
    topic: 'hooks',
    chapterId: 'react-ch8',
    level: 'advanced',
    title: L('Extract a toggle and a debounced value', 'Вынести toggle и отложенное значение'),
    brief: L(
      'Extract a useToggle hook that returns an object with a named flag and a stable toggle function, and a useDebouncedValue hook that returns the value only after the user stopped typing. The hooks must call the React hooks in a fixed order.',
      'Вынесите хук useToggle, который возвращает объект с именованным флагом и стабильной функцией переключения, и хук useDebouncedValue, который отдаёт значение только после того, как пользователь перестал печатать. Хуки должны вызывать хуки React в фиксированном порядке.'
    ),
    hint: L(
      'An object return reads better than a tuple because the caller sees names. useCallback keeps the identity of the toggle stable across renders.',
      'Объект читается лучше кортежа, потому что вызывающий видит имена. useCallback удерживает идентичность toggle между рендерами.'
    ),
    solution: `import { useCallback, useEffect, useState } from 'react';

// An object return, so the caller reads names instead of positions
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((value) => !value), []);
  return { on, toggle };
}

// The value only changes after the user stopped typing
export function useDebouncedValue(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // the pending timer is cancelled
  }, [value, delay]);
  return debounced;
}`,
    explanation: L(
      'A hook is not a component: it shares logic, not markup, and several components may use it at once. The stable callback keeps memoized children from re-rendering, and the cleanup cancels the pending timer on every change.',
      'Хук — не компонент: он делится логикой, а не разметкой, и его могут использовать несколько компонентов сразу. Стабильный колбэк не даёт мемоизированным дочерним компонентам перерисовываться, а очистка отменяет висящий таймер при каждом изменении.'
    ),
  },
  {
    id: 'ch-react-ch9-1',
    moduleId: 'react',
    topic: 'forms',
    chapterId: 'react-ch9',
    level: 'advanced',
    title: L('A signup form with native semantics', 'Форма регистрации с нативной семантикой'),
    brief: L(
      'Build a signup form with a controlled email field, the native email input and required attribute, an error message announced with role=alert, and a submit handler that reads the payload with FormData.',
      'Соберите форму регистрации с контролируемым полем email, нативными type=email и required, сообщением об ошибке с role=alert и обработчиком отправки, который читает данные через FormData.'
    ),
    hint: L(
      'The input keeps its name attribute so FormData can find it. Tie the error message to the field with aria-describedby and aria-invalid.',
      'У поля должен остаться атрибут name, чтобы FormData его нашёл. Свяжите сообщение об ошибке с полем через aria-describedby и aria-invalid.'
    ),
    solution: `import { useState, type FormEvent } from 'react';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // FormData reads the payload without a state field per input
    const value = String(new FormData(event.currentTarget).get('email') ?? '');
    if (!value.includes('@')) {
      setError('Enter a valid email');
      return;
    }
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email" name="email" type="email" required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && <p id="email-error" role="alert">{error}</p>}
      <button type="submit">Sign up</button>
    </form>
  );
}`,
    explanation: L(
      'The native attributes give the browser its own validation and keyboard behaviour, while React adds the live error message tied to the field. FormData reads the same fields the browser would submit, so the payload cannot drift from the markup.',
      'Нативные атрибуты дают браузеру его собственную валидацию и поведение с клавиатуры, а React добавляет живое сообщение об ошибке, связанное с полем. FormData читает те же поля, которые отправил бы браузер, поэтому payload не разойдётся с разметкой.'
    ),
  },
  {
    id: 'ch-react-ch10-1',
    moduleId: 'react',
    topic: 'react-perf',
    chapterId: 'react-ch10',
    level: 'advanced',
    title: L('Memoised rows and a measured list', 'Мемоизированные строки и измеренный список'),
    brief: L(
      'Measure the renders with the Profiler, memoise a row component with React.memo and a stable callback, and render only a window of a long list: the rows outside of the window must stay unreachable in the DOM while the list is scrolled.',
      'Измерьте рендеры через Profiler, мемоизируйте компонент строки через React.memo и стабильный колбэк и отрисуйте только окно длинного списка: строки за пределами окна не должны попадать в DOM, пока список прокручивается.'
    ),
    hint: L(
      'React.memo compares the props, so the callback has to keep its identity. A window is a slice that follows the scroll position, and the rows before and after it are never rendered.',
      'React.memo сравнивает пропсы, поэтому колбэк должен сохранять идентичность. Окно — это срез, который следует за позицией прокрутки, а строки до и после него не рендерятся вовсе.'
    ),
    solution: `import { Profiler, memo, useCallback, useMemo, useState, type UIEvent } from 'react';

const ROW_HEIGHT = 32;
const WINDOW = 50;

type Item = { id: string; title: string };

const Row = memo(function Row({ title, onPick }: { title: string; onPick: (id: string) => void }) {
  return <li><button onClick={() => onPick(title)}>{title}</button></li>;
});

export function Results({ items }: { items: Item[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [start, setStart] = useState(0);
  // A stable callback keeps React.memo effective
  const handlePick = useCallback((id: string) => setPicked(id), []);
  // Only the visible window of a long list is rendered
  const visible = useMemo(() => items.slice(start, start + WINDOW), [items, start]);
  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    setStart(Math.floor(event.currentTarget.scrollTop / ROW_HEIGHT));
  }, []);

  return (
    <Profiler id="Results" onRender={(id, phase) => console.log(id, phase)}>
      <div style={{ height: ROW_HEIGHT * WINDOW, overflow: 'auto' }} onScroll={handleScroll}>
        {/* the full height keeps the scrollbar honest */}
        <div style={{ height: items.length * ROW_HEIGHT, position: 'relative' }}>
          <ul style={{ position: 'absolute', top: start * ROW_HEIGHT, left: 0, right: 0 }}>
            {visible.map((item) => (
              <Row key={item.id} title={item.title} onPick={handlePick} />
            ))}
          </ul>
        </div>
      </div>
      <p>picked: {picked}</p>
    </Profiler>
  );
}`,
    explanation: L(
      'Memoisation only pays off when the props are stable, otherwise the comparison costs more than the render it saves. The Profiler tells you which part of the tree actually costs time, and the window follows the scroll position, so the DOM holds the visible rows instead of the whole list.',
      'Мемоизация окупается только при стабильных пропсах, иначе сравнение стоит дороже сэкономленного рендера. Profiler показывает, какая часть дерева реально стоит времени, а окно следует за позицией прокрутки, поэтому в DOM живут только видимые строки, а не весь список.'
    ),
  },
  {
    id: 'ch-react-ch11-1',
    moduleId: 'react',
    topic: 'testing',
    chapterId: 'react-ch11',
    level: 'advanced',
    title: L('Test a form across the client boundary', 'Протестировать форму через клиентскую границу'),
    brief: L(
      'Write a test for a component that receives a plain order object from a server component: render it inside a Suspense boundary, type a value into the field, click the button and assert what the user sees. Only serialisable data may cross the boundary.',
      'Напишите тест для компонента, который получает обычный объект заказа от серверного компонента: отрендерите его внутри Suspense, введите значение в поле, нажмите кнопку и проверьте, что видит пользователь. Через границу могут проходить только сериализуемые данные.'
    ),
    hint: L(
      'Query by role and by label instead of by test id. A server component passes plain objects and primitives, never a function.',
      'Ищите по роли и по подписи, а не по test id. Серверный компонент передаёт обычные объекты и примитивы, но никогда функцию.'
    ),
    solution: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import OrderSummary from './OrderSummary';

test('shows the order total and marks it as paid', async () => {
  const user = userEvent.setup();

  // The order is a plain object, so it survives the server/client boundary
  render(
    <Suspense fallback={<p>Loading...</p>}>
      <OrderSummary order={{ id: 'A-1', total: 42 }} />
    </Suspense>
  );

  expect(screen.getByText(/42 EUR/)).toBeInTheDocument();

  // The field is filled in by the user, the summary follows the input
  await user.type(screen.getByLabelText('Amount'), '7');
  expect(screen.getByText(/7 EUR/)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Pay' }));
  expect(screen.getByRole('button', { name: 'Paid' })).toBeInTheDocument();
});

// file: OrderSummary.tsx
import { useState } from 'react';

type Order = { id: string; total: number };

export default function OrderSummary({ order }: { order: Order }) {
  const [amount, setAmount] = useState('');
  const [paid, setPaid] = useState(false);
  const shown = amount === '' ? String(order.total) : amount;
  return (
    <section>
      <label htmlFor="amount">Amount</label>
      <input id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
      <p>Total: {shown} EUR</p>
      <button type="button" onClick={() => setPaid(true)} disabled={paid}>
        {paid ? 'Paid' : 'Pay'}
      </button>
    </section>
  );
}`,
    explanation: L(
      'The test drives the component the way a user does, so it survives a refactoring of the internals. Serialisable props are the rule that keeps the server and the client in sync, and a function passed across the boundary would fail at render time.',
      'Тест управляет компонентом так же, как пользователь, поэтому переживает рефакторинг внутренностей. Сериализуемые пропсы — правило, которое держит сервер и клиент согласованными, а функция через границу упала бы во время рендера.'
    ),
  },
];
