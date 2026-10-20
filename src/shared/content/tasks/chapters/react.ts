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
    solution: `function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function ItemList({ items, count }) {
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
    title: L('Find out what re-renders', 'Понять, что перерисовывается'),
    brief: L(
      'Build a parent with two pieces of state and a memoized child that logs every render. Changing the parent state must not re-render the memoized child, while changing the prop the child receives must.',
      'Соберите родителя с двумя состояниями и мемоизированного ребёнка, который логирует каждый рендер. Изменение состояния родителя не должно перерисовывать мемоизированного ребёнка, а изменение его пропа — должно.'
    ),
    hint: L(
      'React.memo skips the render when the props are the same. The child re-renders only when the prop it actually reads changes.',
      'React.memo пропускает рендер, если пропсы те же. Ребёнок перерисовывается только тогда, когда меняется проп, который он реально читает.'
    ),
    solution: `import { memo, useState } from 'react';

const Child = memo(function Child({ label }) {
  console.log('Child rendered with', label);
  return <span>{label}</span>;
});

export function Panel() {
  const [count, setCount] = useState(0);
  const [label, setLabel] = useState('first');

  return (
    <div>
      {/* count changes: the parent re-renders, the memoized child does not */}
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
      {/* label changes: the child re-renders with the new prop */}
      <button onClick={() => setLabel('second')}>change label</button>
      <Child label={label} />
    </div>
  );
}`,
    explanation: L(
      'React re-renders the parent whenever its own state changes, but a memoized child with unchanged props is skipped. The two buttons show both paths: the count changes only the parent, the label reaches the child.',
      'React перерисовывает родителя при изменении его состояния, но мемоизированного ребёнка с теми же пропсами пропускает. Две кнопки показывают оба пути: счёт меняет только родителя, а метка доходит до ребёнка.'
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
export function Cart({ items }) {
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
      'Implement a hook that subscribes to an event and removes the listener on cleanup, and a hook that keeps the document title in sync and restores the previous title when it is torn down. The listener must always call the newest handler.',
      'Реализуйте хук, который подписывается на событие и снимает слушатель при очистке, и хук, который держит заголовок документа в синхроне и возвращает прежний заголовок при размонтировании. Слушатель должен всегда вызывать самый свежий обработчик.'
    ),
    hint: L(
      'Store the handler in a ref and read it from the listener, so the subscription does not have to be recreated. The cleanup of a title effect restores the old value.',
      'Храните обработчик в ref и читайте его из слушателя, чтобы подписку не приходилось пересоздавать. Очистка эффекта заголовка возвращает старое значение.'
    ),
    solution: `import { useEffect, useRef } from 'react';

// The listener always calls the newest handler, without resubscribing
export function useEvent(name, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event) => handlerRef.current(event);
    window.addEventListener(name, listener);
    return () => window.removeEventListener(name, listener);
  }, [name]);
}

// The title is restored when the effect is cleaned up
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => { document.title = previous; };
  }, [title]);
}`,
    explanation: L(
      'The ref holds the newest handler while the effect keeps the same subscription, so the callback never goes stale. The title effect saves the previous value and puts it back, which keeps two mounted components from fighting over the document.',
      'Ref хранит самый свежий обработчик, а эффект держит ту же подписку, поэтому колбэк не устаревает. Эффект заголовка сохраняет прежнее значение и возвращает его, чтобы два смонтированных компонента не дрались за документ.'
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

type TextFieldProps = {
  label: string;
  ref?: Ref<{ focus: () => void; clear: () => void }>;
};

export function TextField({ label, ref }: TextFieldProps) {
  const inputRef = useRef(null);
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
      'Create two contexts: one for a value that changes rarely and one for a value that changes on every pointer move. The provider value must be memoised, and a consumer of the slow context must not re-render when the fast value changes.',
      'Создайте два контекста: для значения, которое меняется редко, и для значения, которое меняется при каждом движении указателя. Значение провайдера должно быть мемоизировано, а потребитель медленного контекста не должен перерисовываться, когда меняется быстрое значение.'
    ),
    hint: L(
      'A new object on every render changes the identity of the provider value and re-renders every consumer. useMemo keeps the identity stable.',
      'Новый объект при каждом рендере меняет идентичность значения провайдера и перерисовывает всех потребителей. useMemo удерживает идентичность.'
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
      <PositionContext.Provider value={position}>
        {children}
      </PositionContext.Provider>
    </ThemeContext.Provider>
  );
}

// Only the cursor subscribes to the fast value, the toolbar stays untouched
export function Cursor() {
  const { x, y } = useContext(PositionContext)!;
  return <span>{x}, {y}</span>;
}`,
    explanation: L(
      'The two contexts split the update frequency: only the cursor subscribes to the fast value, so the toolbar stays untouched while the pointer moves. The memoised provider value is what keeps the slow consumers from re-rendering for no reason.',
      'Два контекста разделяют частоту обновлений: быстрое значение читает только курсор, поэтому панель не трогается при движении указателя. Мемоизированное значение провайдера не даёт медленным потребителям перерисовываться без причины.'
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
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // the pending timer is cancelled
  }, [value, delay]);
  return debounced;
}`,
    explanation: L(
      'A hook is not a component: it shares logic, not markup, and several components may use it at once. The stable callback keeps memoized children from re-rendering, and the cleanup cancels the pending timer on every change.',
      'Хук — не компонент: он делится логикой, а не разметкой, и его могут использовать несколько компонентов сразу. Стабильный колбэк не даёт мемоизированным детям перерисовываться, а очистка отменяет висящий таймер при каждом изменении.'
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
      'Measure the renders with the Profiler, memoise a row component with React.memo and a stable callback, and render only a window of a long list instead of every row.',
      'Измерьте рендеры через Profiler, мемоизируйте компонент строки через React.memo и стабильный колбэк и отрисуйте только окно длинного списка вместо всех строк.'
    ),
    hint: L(
      'React.memo compares the props, so the callback has to keep its identity. useMemo keeps the computed slice stable while the items do not change.',
      'React.memo сравнивает пропсы, поэтому колбэк должен сохранять идентичность. useMemo удерживает вычисленный срез, пока элементы не меняются.'
    ),
    solution: `import { Profiler, memo, useCallback, useMemo, useState } from 'react';

const WINDOW = 50;

const Row = memo(function Row({ title, onPick }) {
  return <li><button onClick={() => onPick(title)}>{title}</button></li>;
});

export function Results({ items }) {
  const [picked, setPicked] = useState(null);
  // A stable callback keeps React.memo effective
  const handlePick = useCallback((id) => setPicked(id), []);
  // Only the visible slice of a long list is rendered
  const visible = useMemo(() => items.slice(0, WINDOW), [items]);

  return (
    <Profiler id="Results" onRender={(id, phase) => console.log(id, phase)}>
      <ul>
        {visible.map((item) => (
          <Row key={item.id} title={item.title} onPick={handlePick} />
        ))}
      </ul>
      <p>picked: {picked}</p>
    </Profiler>
  );
}`,
    explanation: L(
      'Memoisation only pays off when the props are stable, otherwise the comparison costs more than the render it saves. The Profiler tells you which part of the tree actually costs time, and the window keeps the DOM small.',
      'Мемоизация окупается только при стабильных пропсах, иначе сравнение стоит дороже сэкономленного рендера. Profiler показывает, какая часть дерева реально стоит времени, а окно держит DOM маленьким.'
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
      'Write a test for a component that receives a plain order object from a server component: render it inside a Suspense boundary, type into the field, click the button and assert what the user sees. Only serialisable data may cross the boundary.',
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

  await user.click(screen.getByRole('button', { name: 'Pay' }));
  expect(screen.getByRole('button', { name: 'Paid' })).toBeInTheDocument();
});`,
    explanation: L(
      'The test drives the component the way a user does, so it survives a refactoring of the internals. Serialisable props are the rule that keeps the server and the client in sync, and a function passed across the boundary would fail at render time.',
      'Тест управляет компонентом так же, как пользователь, поэтому переживает рефакторинг внутренностей. Сериализуемые пропсы — правило, которое держит сервер и клиент согласованными, а функция через границу упала бы во время рендера.'
    ),
  },
];
