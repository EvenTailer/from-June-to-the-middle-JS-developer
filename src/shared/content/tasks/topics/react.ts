import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactTasks: PracticeTask[] = [
  {
    id: 'topic-react-1',
    moduleId: 'react',
    topic: 'react',
    level: 'basic',
    title: L('A component with typed props', 'Компонент с типизированными пропсами'),
    brief: L(
      'Write a component UserCard that takes typed props. The props are: name of type string, role of the union type "admin" | "editor" | "viewer", an optional email of type string, and an optional children of type ReactNode. The component must render the name in an h3 element, the role in a p element prefixed with the text "Role: ", and the email in a p element only when the email prop is present. The children must be rendered after the email. Example: with the props name "Ann", role "admin" and email "ann@example.com" the component renders the h3 with "Ann", the p with "Role: admin" and the p with the email, and without the email prop the email paragraph must not appear at all.',
      'Напишите компонент UserCard с типизированными пропсами. Пропсы: name типа string, role типа-объединения "admin" | "editor" | "viewer", необязательный email типа string и необязательный children типа ReactNode. Компонент должен выводить имя в элементе h3, роль в элементе p с префиксом "Role: ", а email в элементе p только когда пропс email передан. Children рендерятся после email. Пример: с пропсами name "Ann", role "admin" и email "ann@example.com" компонент выводит h3 с "Ann", p с "Role: admin" и p с email, а без пропса email абзац с email не появляется вовсе.'
    ),
    hint: L(
      'Declare an interface for the props and use the type ReactNode for children, imported with "import type { ReactNode } from \'react\'". A prop becomes optional only when you add the question mark to its name, and its type then includes undefined.',
      'Объявите интерфейс для пропсов и используйте тип ReactNode для children, импортированный через "import type { ReactNode } from \'react\'". Пропс становится необязательным только тогда, когда к его имени добавлен знак вопроса, и тогда его тип включает undefined.'
    ),
    solution: `import type { ReactNode } from 'react';

interface UserCardProps {
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  email?: string;
  children?: ReactNode;
}

export function UserCard({ name, role, email, children }: UserCardProps) {
  return (
    <article className="user-card">
      <h3>{name}</h3>
      <p className="user-card__role">Role: {role}</p>
      {email ? <p className="user-card__email">{email}</p> : null}
      {children}
    </article>
  );
}`,
    explanation: L(
      'The interface is the contract of the component: it states which props exist, which of them are required, and what type each value has. The union "admin" | "editor" | "viewer" is stricter than string, because a typo in the role is caught by the compiler instead of reaching the screen. The question mark on email makes the prop optional, and the type of email then includes undefined, which is why the value is checked before it is rendered. Rendering children from props is what makes the component composable: the parent decides what goes inside, and the component only decides where.',
      'Интерфейс — это контракт компонента: он задаёт, какие пропсы существуют, какие обязательны и какого типа каждое значение. Объединение "admin" | "editor" | "viewer" строже, чем string, потому что опечатку в роли ловит компилятор, а не пользователь. Знак вопроса у email делает пропс необязательным, и тогда тип email включает undefined, поэтому значение проверяется перед выводом. Вывод children из пропсов делает компонент композиционным: родитель решает, что внутри, а компонент решает только где.'
    ),
  },
  {
    id: 'topic-react-2',
    moduleId: 'react',
    topic: 'react',
    level: 'basic',
    title: L('A list with stable keys', 'Список со стабильными ключами'),
    brief: L(
      'Write a component TodoList that renders a list of todos. The props are todos, an array of objects with the fields id of type string, label of type string and done of type boolean, and two callbacks: onToggle, called with the id of the todo that was clicked, and onRemove, also called with the id. Render each todo as an li element that contains a checkbox with the label as its accessible name, a span with the label text, and a button with the text "Remove". The key of each li must be the id of the todo, never the index of the array. When the array is empty the component must render the text "Nothing to do" instead of the list. Example: for the todo with the id "a" and the label "Buy milk" the li has the key "a" and the checkbox has the accessible name "Buy milk".',
      'Напишите компонент TodoList, выводящий список задач. Пропсы: todos — массив объектов с полями id типа string, label типа string и done типа boolean, и два колбэка: onToggle, вызываемый с id задачи, по которой кликнули, и onRemove, тоже вызываемый с id. Каждую задачу выводите как li, внутри которого чекбокс с label в качестве доступного имени, span с текстом label и кнопка с текстом "Remove". Ключом каждого li должен быть id задачи, и никогда индекс массива. Если массив пуст, компонент должен вывести текст "Nothing to do" вместо списка. Пример: для задачи с id "a" и label "Buy milk" у li ключ "a", а у чекбокса доступное имя "Buy milk".'
    ),
    hint: L(
      'Use the map method and put the key attribute on the outermost element of each iteration. The key must identify the item itself, so that React can match the old element with the new one when the array is reordered.',
      'Используйте метод map и повесьте атрибут key на самый внешний элемент каждой итерации. Ключ должен идентифицировать сам элемент, чтобы React смог сопоставить старый элемент с новым при перестановке массива.'
    ),
    solution: `interface Todo {
  id: string;
  label: string;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Nothing to do</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
            aria-label={todo.label}
          />
          <span>{todo.label}</span>
          <button type="button" onClick={() => onRemove(todo.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}`,
    explanation: L(
      'The key tells React which element of the previous render corresponds to which element of the new one. With the id as the key, React keeps the DOM node of a todo attached to that todo when the list is reordered, so the checked state and the focus stay where they belong. With the array index as the key, the first position keeps the first node, and after removing the first todo every remaining todo inherits the state of its neighbour, which is why checkboxes jump. The key must also be unique among the siblings, and the id of the item is the natural candidate for it.',
      'Ключ говорит React, какой элемент предыдущего рендера соответствует какому элементу нового. С ключом id React оставляет DOM-узел задачи привязанным к этой задаче при перестановке списка, поэтому отметка и фокус остаются на месте. С индексом массива первая позиция сохраняет первый узел, и после удаления первой задачи каждая оставшаяся задача наследует состояние соседа, и чекбоксы «прыгают». Ключ должен быть уникален среди соседей, и id элемента — естественный кандидат.'
    ),
  },
  {
    id: 'topic-react-3',
    moduleId: 'react',
    topic: 'react',
    level: 'basic',
    title: L('Controlled and uncontrolled input', 'Контролируемый и неконтролируемый ввод'),
    brief: L(
      'Write two components for the same field. The first one, ControlledName, keeps the value in the React state: the input has a value prop and an onChange handler that stores the new text, and the component shows the current value in a p element. The second one, UncontrolledName, lets the DOM own the value: the input has a defaultValue and no state, and a button with the text "Read value" reads the current text through a ref and shows it in a p element. Example: typing "Ann" into ControlledName shows "Value: Ann" immediately, and in UncontrolledName the text appears only after the button is pressed.',
      'Напишите два компонента для одного и того же поля. Первый, ControlledName, хранит значение в состоянии React: у input есть пропс value и обработчик onChange, который сохраняет новый текст, а компонент показывает текущее значение в элементе p. Второй, UncontrolledName, отдаёт значение DOM: у input есть defaultValue и нет состояния, а кнопка с текстом "Read value" читает текущий текст через ref и показывает его в элементе p. Пример: ввод "Ann" в ControlledName сразу показывает "Value: Ann", а в UncontrolledName текст появляется только после нажатия кнопки.'
    ),
    hint: L(
      'A controlled input always receives its value from React, so it must have both a value and an onChange, otherwise the field would be frozen. An uncontrolled input keeps its value in the DOM, and the ref gives access to that value when you really need it.',
      'Контролируемый ввод всегда получает значение от React, поэтому у него должны быть и value, и onChange, иначе поле будет «заморожено». Неконтролируемый ввод хранит значение в DOM, и ref даёт доступ к нему, когда это действительно нужно.'
    ),
    solution: `import { useRef, useState } from 'react';

export function ControlledName() {
  const [value, setValue] = useState('');

  return (
    <div>
      <label htmlFor="controlled-name">Name</label>
      <input
        id="controlled-name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p>Value: {value}</p>
    </div>
  );
}

export function UncontrolledName() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [readValue, setReadValue] = useState('');

  function handleRead() {
    setReadValue(inputRef.current?.value ?? '');
  }

  return (
    <div>
      <label htmlFor="uncontrolled-name">Name</label>
      <input id="uncontrolled-name" ref={inputRef} defaultValue="Ann" />
      <button type="button" onClick={handleRead}>
        Read value
      </button>
      <p>Value: {readValue}</p>
    </div>
  );
}`,
    explanation: L(
      'The difference is who owns the value. In the controlled input React owns it: the state is the single source of truth, the DOM only displays what the state says, and every keystroke goes through a re-render. That makes validation, formatting and resetting trivial, at the price of a render on each character. In the uncontrolled input the DOM owns the value, the input works even without React, and the state is only touched when the value is actually needed, which is the cheap way to handle a long form. Mixing the two in one field is the classic bug: a value prop without an onChange freezes the field, and a defaultValue together with a value produces a warning.',
      'Разница в том, кто владеет значением. В контролируемом вводе владеет React: состояние — единственный источник истины, DOM только показывает то, что говорит состояние, и каждый набор символов проходит через рендер. Это делает валидацию, форматирование и сброс простыми, но заставляет рендериться на каждый символ. В неконтролируемом вводе владеет DOM: поле работает и без React, а состояние затрагивается только когда значение действительно нужно, и это дешёвый способ для длинной формы. Смешивание двух подходов в одном поле — классическая ошибка: value без onChange замораживает поле, а defaultValue вместе с value даёт предупреждение.'
    ),
  },
  {
    id: 'topic-react-4',
    moduleId: 'react',
    topic: 'react',
    level: 'intermediate',
    title: L('A compound component with context', 'Составной компонент с контекстом'),
    brief: L(
      'Build a compound component Tabs that shares its state between several child components through a context. The context must hold the id of the active tab, a function that switches the active tab, and a base id used to build unique identifiers. Export three parts: Tabs, which takes the props defaultTab of type string and children of type ReactNode and provides the context; TabsList, which renders a div with the role "tablist"; TabsTrigger, which takes the props id of type string and children of type ReactNode and renders a button with the role "tab" and the aria-selected attribute; TabsPanel, which takes the same props and renders a div with the role "tabpanel" only when its id equals the active tab, and renders nothing otherwise. The identifiers of the trigger and of the panel must be linked through aria-controls and aria-labelledby. Example: with defaultTab "one" the trigger with the id "one" has aria-selected equal to true and the panel with the id "one" is visible, while the panel with the id "two" is not rendered.',
      'Постройте составной компонент Tabs, который делится состоянием между несколькими дочерними компонентами через контекст. Контекст должен хранить id активной вкладки, функцию переключения активной вкладки и базовый id для построения уникальных идентификаторов. Экспортируйте три части: Tabs, который принимает пропсы defaultTab типа string и children типа ReactNode и предоставляет контекст; TabsList, который выводит div с ролью "tablist"; TabsTrigger, который принимает пропсы id типа string и children типа ReactNode и выводит кнопку с ролью "tab" и атрибутом aria-selected; TabsPanel, который принимает те же пропсы и выводит div с ролью "tabpanel" только когда его id равен активной вкладке, и ничего иначе. Идентификаторы триггера и панели должны быть связаны через aria-controls и aria-labelledby. Пример: при defaultTab "one" триггер с id "one" имеет aria-selected равный true, а панель с id "one" видима, тогда как панель с id "two" не выводится.'
    ),
    hint: L(
      'Create the context with createContext, read it with useContext, and throw a clear error when the context is missing, because that always means the part was used outside of the root. The base id can be produced by the useId hook, which guarantees uniqueness even when the component is rendered twice on the page.',
      'Создайте контекст через createContext, читайте его через useContext и выбрасывайте понятную ошибку, когда контекста нет: это всегда означает, что часть использовали вне корня. Базовый id можно получить из хука useId, который гарантирует уникальность даже если компонент отрисован на странице дважды.'
    ),
    solution: `import { createContext, useContext, useId, useState, type ReactNode } from 'react';

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs parts must be rendered inside <Tabs>');
  }

  return context;
}

interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

export function Tabs({ defaultTab, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

export function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs();

  return (
    <button
      type="button"
      role="tab"
      id={\`\${baseId}-tab-\${id}\`}
      aria-selected={active === id}
      aria-controls={\`\${baseId}-panel-\${id}\`}
      onClick={() => setActive(id)}
    >
      {children}
    </button>
  );
}

export function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active, baseId } = useTabs();

  if (active !== id) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={\`\${baseId}-panel-\${id}\`}
      aria-labelledby={\`\${baseId}-tab-\${id}\`}
    >
      {children}
    </div>
  );
}`,
    explanation: L(
      'The context carries the state down to the parts without passing it through the props of every intermediate element, and the provider is the single place that owns the state. The value of the context is an object, so a new object is created on every render of the provider, and that is exactly the reason to keep the state as small as possible inside the context. The check for a missing context turns a confusing "cannot read property of null" into a message that names the mistake. The tab and the panel are linked with aria-controls and aria-labelledby, so a screen reader can jump from a tab to its panel and back.',
      'Контекст передаёт состояние частям, не протаскивая его через пропсы всех промежуточных элементов, и провайдер — единственное место, которое владеет состоянием. Значение контекста это объект, поэтому на каждом рендере провайдера создаётся новый объект, и именно поэтому состояние внутри контекста стоит держать минимальным. Проверка на отсутствие контекста превращает невнятное "cannot read property of null" в сообщение, называющее ошибку. Вкладка и панель связаны через aria-controls и aria-labelledby, поэтому скринридер умеет переходить от вкладки к панели и обратно.'
    ),
  },
  {
    id: 'topic-react-5',
    moduleId: 'react',
    topic: 'react',
    level: 'intermediate',
    title: L('An error boundary with a reset', 'Граница ошибок со сбросом'),
    brief: L(
      'Write an error boundary as a class component named ErrorBoundary, because catching render errors in a descendant is the one job that hooks cannot do. The props are children of type ReactNode and an optional fallback, which is a function that receives the error and a reset function and returns a ReactNode. The state holds the caught error. Implement the static method getDerivedStateFromError so that the error goes into the state, and the method componentDidCatch so that the error is logged. When there is no error the component must render the children. When there is an error and no fallback prop is given, the component must render a div with the role "alert", a paragraph with the text "Something went wrong: " followed by the message of the error, and a button with the text "Try again" that clears the error and renders the children again. Example: when a child throws the Error with the message "boom", the boundary shows "Something went wrong: boom" and the button removes it.',
      'Напишите границу ошибок в виде класса ErrorBoundary, потому что перехват ошибок рендера потомков — единственная задача, которую не могут решить хуки. Пропсы: children типа ReactNode и необязательный fallback — функция, получающая ошибку и функцию сброса и возвращающая ReactNode. Состояние хранит пойманную ошибку. Реализуйте статический метод getDerivedStateFromError, чтобы ошибка попадала в состояние, и метод componentDidCatch, чтобы ошибка логировалась. Когда ошибки нет, компонент рендерит children. Когда ошибка есть и пропс fallback не передан, компонент рендерит div с ролью "alert", абзац с текстом "Something went wrong: " и сообщением ошибки, и кнопку с текстом "Try again", которая очищает ошибку и снова рендерит children. Пример: когда потомок бросает Error с сообщением "boom", граница показывает "Something went wrong: boom", а кнопка убирает её.'
    ),
    hint: L(
      'getDerivedStateFromError is static and returns the next state, while componentDidCatch is an instance method that receives the error and the component stack. The reset is just setState with the error set back to null.',
      'getDerivedStateFromError — статический метод, возвращающий следующее состояние, а componentDidCatch — метод экземпляра, получающий ошибку и стек компонентов. Сброс — это просто setState, в котором ошибка снова становится null.'
    ),
    solution: `import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Render error caught', error, info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      if (this.props.fallback) {
        return this.props.fallback(error, this.handleReset);
      }

      return (
        <div role="alert">
          <p>Something went wrong: {error.message}</p>
          <button type="button" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`,
    explanation: L(
      'An error boundary is the only component that must be a class, because it relies on the static method getDerivedStateFromError, which React calls while rendering the failed subtree. The boundary catches errors thrown during rendering, in lifecycle methods and in the constructors of the descendants, but it never catches errors in event handlers or in asynchronous code, and it does not catch its own errors, so the boundary is placed around the subtree that may fail. The reset clears the state, and the children are rendered again from scratch, which is why the button is called "Try again" rather than "Dismiss". The optional fallback prop lets the application decide how the failure looks while the default keeps the message visible.',
      'Граница ошибок — единственный компонент, который обязан быть классом, потому что он опирается на статический метод getDerivedStateFromError, который React вызывает во время рендера упавшего поддерева. Граница ловит ошибки, брошенные при рендере, в методах жизненного цикла и в конструкторах потомков, но никогда не ловит ошибки в обработчиках событий или в асинхронном коде, и не ловит собственные ошибки, поэтому границу ставят вокруг поддерева, которое может упасть. Сброс очищает состояние, и children рендерятся заново с нуля, поэтому кнопка называется "Try again", а не "Dismiss". Необязательный пропс fallback позволяет приложению решать, как выглядит сбой, а значение по умолчанию оставляет сообщение на экране.'
    ),
  },
  {
    id: 'topic-react-6',
    moduleId: 'react',
    topic: 'react',
    level: 'advanced',
    title: L('A modal rendered in a portal', 'Модальное окно в портале'),
    brief: L(
      'Write a component Modal that renders a dialog into document.body with the function createPortal, so that the dialog is not clipped by the overflow of its parent. The props are title of type string, onClose of type () => void, and children of type ReactNode. The dialog is a div with the role "dialog", the attribute aria-modal set to "true" and the accessible name equal to the title. Behind the dialog there must be an overlay div that closes the dialog when it is clicked, but a click inside the dialog must not close it, so the handler has to compare the event target with the current target of the overlay. The component must also close the dialog when the Escape key is pressed, and the listener must be removed when the component unmounts. Example: clicking the overlay calls onClose, clicking inside the dialog does not, and pressing Escape calls onClose.',
      'Напишите компонент Modal, который выводит диалог в document.body через функцию createPortal, чтобы диалог не обрезался переполнением родителя. Пропсы: title типа string, onClose типа () => void и children типа ReactNode. Диалог — это div с ролью "dialog", атрибутом aria-modal со значением "true" и доступным именем, равным title. За диалогом должен быть слой-подложка, который закрывает диалог по клику, но клик внутри диалога закрывать его не должен, поэтому обработчик сравнивает event.target с currentTarget подложки. Компонент также должен закрываться по нажатию клавиши Escape, а слушатель должен сниматься при размонтировании. Пример: клик по подложке вызывает onClose, клик внутри диалога — нет, а нажатие Escape вызывает onClose.'
    ),
    hint: L(
      'The overlay closes only when the click landed on the overlay itself, so compare event.target with event.currentTarget. The keyboard listener belongs in a useEffect, and the cleanup function returned from that effect removes the listener.',
      'Подложка закрывается только если клик пришёл по самой подложке, поэтому сравнивайте event.target с event.currentTarget. Слушатель клавиатуры живёт в useEffect, а функция очистки, которую эффект возвращает, снимает слушатель.'
    ),
    solution: `import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ background: '#fff', padding: 16, maxWidth: 480, margin: '10vh auto' }}
      >
        <h2>{title}</h2>
        {children}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}`,
    explanation: L(
      'A portal moves the DOM node of the component to another place of the document while the React tree stays intact, so the state and the context of the parent keep working. It is the standard way to render an overlay, because the overlay escapes the overflow hidden and the z-index of any ancestor. The click on the overlay is handled by comparing the target with the current target: a click on the dialog bubbles up to the overlay, but its target is the inner element, so the comparison fails and the dialog stays open. The Escape listener lives in an effect whose cleanup removes it, so nothing is left behind after the unmount.',
      'Портал переносит DOM-узел компонента в другое место документа, а дерево React остаётся прежним, поэтому состояние и контекст родителя продолжают работать. Это стандартный способ отрисовать оверлей: он не попадает под overflow hidden и z-index любого предка. Клик по подложке обрабатывается сравнением цели с текущей целью: клик по диалогу всплывает до подложки, но его цель — внутренний элемент, поэтому сравнение не проходит и диалог остаётся открытым. Слушатель Escape живёт в эффекте, а его очистка снимает слушатель, поэтому после размонтирования ничего не остаётся.'
    ),
  },
  {
    id: 'topic-react-7',
    moduleId: 'react',
    topic: 'react',
    level: 'advanced',
    title: L('A hook that stores a value in localStorage', 'Хук, хранящий значение в localStorage'),
    brief: L(
      'Write a custom hook useLocalStorage that keeps a value in the React state and mirrors it into the browser storage. The hook takes the key of type string and an initial value of any type T, and returns an object with the current value, a function set that stores a new value, a function update that receives the current value and returns the next one, and a function remove that deletes the record and returns the value to the initial one. The stored value must be serialized with JSON.stringify and read back with JSON.parse, and a broken record must not crash the hook: when parsing fails the initial value must be used. Reading from the storage must happen only once, in the lazy initializer of useState, not in an effect. Example: for the key "theme" and the initial value "light", calling set("dark") makes the value "dark" and the storage contains the string with "dark" in it, and calling update removes the last character of the current value.',
      'Напишите кастомный хук useLocalStorage, который хранит значение в состоянии React и зеркалит его в хранилище браузера. Хук принимает ключ типа string и начальное значение любого типа T, а возвращает объект с текущим значением, функцией set, которая сохраняет новое значение, функцией update, которая получает текущее значение и возвращает следующее, и функцией remove, которая удаляет запись и возвращает значение к начальному. Значение должно сериализоваться через JSON.stringify и читаться обратно через JSON.parse, а испорченная запись не должна ломать хук: если разбор не удался, используется начальное значение. Чтение из хранилища должно происходить ровно один раз, в ленивом инициализаторе useState, а не в эффекте. Пример: для ключа "theme" и начального значения "light" вызов set("dark") даёт значение "dark", а в хранилище лежит строка с "dark", и вызов update убирает последний символ текущего значения.'
    ),
    hint: L(
      'Pass a function to useState so that the storage is read only on the first render, and write to the storage inside the setter callbacks, where the current value is already known. A try and catch around JSON.parse handles a record that was written by another program or corrupted.',
      'Передайте функцию в useState, чтобы хранилище читалось только при первом рендере, а запись выполняйте внутри сеттеров, где текущее значение уже известно. Блок try и catch вокруг JSON.parse обрабатывает запись, написанную другой программой или испорченную.'
    ),
    solution: `import { useCallback, useState } from 'react';

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initialValue));

  const set = useCallback(
    (next: T) => {
      setValue(next);

      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // the storage may be disabled or full: keep the value in memory only
      }
    },
    [key]
  );

  const update = useCallback(
    (updater: (current: T) => T) => {
      setValue((current) => {
        const next = updater(current);

        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // the storage may be disabled or full
        }

        return next;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    setValue(initialValue);

    try {
      window.localStorage.removeItem(key);
    } catch {
      // the storage may be disabled
    }
  }, [key, initialValue]);

  return { value, set, update, remove } as const;
}`,
    explanation: L(
      'The lazy initializer of useState runs once, on the first render, so the storage is read exactly once and not on every render of every consumer. The write happens inside the setter, where the next value is already known, so the storage and the state never disagree. JSON is used because the storage holds strings only, and the try and catch around the parse keeps a corrupted record from crashing the whole tree, which is a real risk when the same key is shared with another program. A hook that hides a whole feature behind a single call is much easier to reuse than a component that is copied from project to project, and the returned object is the public contract of the hook.',
      'Ленивый инициализатор useState выполняется один раз, при первом рендере, поэтому хранилище читается ровно один раз, а не на каждом рендере каждого потребителя. Запись происходит внутри сеттера, где следующее значение уже известно, так что хранилище и состояние никогда не расходятся. JSON используется потому, что в хранилище лежат только строки, а блок try и catch вокруг разбора не даёт испорченной записи уронить всё дерево, что вполне реальный риск, когда ключ общий с другой программой. Хук, скрывающий целую функциональность за одним вызовом, переиспользуется намного легче, чем компонент, который копируют из проекта в проект, и возвращаемый объект — это публичный контракт хука.'
    ),
  },
  {
    id: 'topic-react-8',
    moduleId: 'react',
    topic: 'react',
    level: 'advanced',
    title: L('An accessible list with an empty state', 'Доступный список с пустым состоянием'),
    brief: L(
      'Write a component FilterableList that receives the props items, an array of objects with the fields id of type string and label of type string, the prop query of type string with the current search text, and the callback onSelect that receives the id of the chosen item. The component must show only the items whose label contains the query, comparing in lower case and ignoring the spaces around the query. The list must be a ul with the accessible name "Search results", and every item must be an li that contains a button with the label of the item, and the button calls onSelect with the id. When nothing matches, the component must render a div with the role "status" and the attribute aria-live set to "polite", containing a p with the text "No items match" and the query in quotes. Example: with the items "Apple" and "Banana" and the query "an", the list shows the "Banana" button, and with the query "zzz" the empty state appears with the text "No items match" followed by the query in quotes.',
      'Напишите компонент FilterableList, получающий пропсы items — массив объектов с полями id типа string и label типа string, пропс query типа string с текущим поисковым текстом, и колбэк onSelect, получающий id выбранного элемента. Компонент должен показывать только те элементы, чей label содержит query, сравнивая в нижнем регистре и игнорируя пробелы вокруг запроса. Список должен быть ul с доступным именем "Search results", а каждый элемент — li, содержащим кнопку с label элемента, и кнопка вызывает onSelect с id. Когда ничего не подошло, компонент должен отрисовать div с ролью "status" и атрибутом aria-live со значением "polite", содержащий p с текстом "No items match" и запросом в кавычках. Пример: при элементах "Apple" и "Banana" и запросе "an" список показывает кнопку "Banana", а при запросе "zzz" появляется пустое состояние с текстом "No items match" и запросом в кавычках.'
    ),
    hint: L(
      'A screen reader must learn that the result of the search appeared, so the empty state announces itself politely instead of interrupting the user. Compare the lower case strings, and trim the query so that a stray space does not hide every item.',
      'Скринридер должен узнать, что результат поиска появился, поэтому пустое состояние объявляет себя вежливо, а не прерывает пользователя. Сравнивайте строки в нижнем регистре и обрезайте запрос, чтобы лишний пробел не скрыл все элементы.'
    ),
    solution: `interface Item {
  id: string;
  label: string;
}

interface FilterableListProps {
  items: Item[];
  query: string;
  onSelect: (id: string) => void;
}

export function FilterableList({ items, query, onSelect }: FilterableListProps) {
  const needle = query.trim().toLowerCase();
  const visible = items.filter((item) => item.label.toLowerCase().includes(needle));

  if (visible.length === 0) {
    return (
      <div role="status" aria-live="polite">
        <p>No items match "{query}"</p>
      </div>
    );
  }

  return (
    <ul aria-label="Search results">
      {visible.map((item) => (
        <li key={item.id}>
          <button type="button" onClick={() => onSelect(item.id)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}`,
    explanation: L(
      'Accessibility here is about the semantics of the markup, not about the colors. A list is a ul with li items, and the name of the list comes from the aria-label attribute, so the user hears what the list contains before entering it. Each item is a button, because the item is an action: a button is reachable by the keyboard and announced as a button, while a div with a click handler is neither. The empty state uses the role status with aria-live set to polite, so the update is announced after the current sentence instead of interrupting it, and the polite value matters: an assertive region would cut off whatever the screen reader was saying. The key is the id of the item, and the comparison is done in the lower case so that the search does not depend on the case of the query.',
      'Доступность здесь — это семантика разметки, а не цвета. Список это ul с элементами li, а имя списка приходит из атрибута aria-label, поэтому пользователь слышит, что внутри, ещё до перехода. Каждый элемент это кнопка, потому что элемент является действием: кнопка доступна с клавиатуры и объявляется как кнопка, а div с обработчиком клика — нет. Пустое состояние использует роль status с aria-live в значении polite, поэтому обновление объявляется после текущей фразы, а не прерывает её, и значение polite важно: assertive-регион оборвал бы то, что скринридер читал в этот момент. Ключ — id элемента, а сравнение идёт в нижнем регистре, чтобы поиск не зависел от регистра запроса.'
    ),
  },
];
