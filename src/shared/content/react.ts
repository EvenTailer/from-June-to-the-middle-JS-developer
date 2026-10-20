import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactModule: Module = {
  id: 'react',
  title: L('React', 'React'),
  description: L('Components, props, state, hooks, effects.', 'Компоненты, пропсы, состояние, хуки, эффекты.'),
  lessons: [
    { id: 'react-001', title: L('JSX & components', 'JSX и компоненты'), question: L('What is JSX?', 'Что такое JSX?'), answer: L('JSX is syntactic sugar for React.createElement; lets write HTML-like UI in JS.', 'JSX — синтаксический сахар для React.createElement; позволяет писать HTML-подобный UI в JS.'), code: `const el = <h1>Hello</h1>;` },
    { id: 'react-002', title: L('JSX expressions', 'JSX выражения'), question: L('How to embed expressions in JSX?', 'Как встроить выражения в JSX?'), answer: L('Wrap any JS expression in curly braces.', 'Любое JS-выражение оборачивайте в фигурные скобки.'), code: `<div>{user.name.toUpperCase()}</div>` },
    { id: 'react-003', title: L('JSX attributes', 'Атрибуты JSX'), question: L('How do JSX attributes differ from HTML?', 'Чем атрибуты JSX отличаются от HTML?'), answer: L('Use camelCase names (className, htmlFor); spread props with {...obj}.', 'Используйте имена в camelCase (className, htmlFor); пропсы через spread {...obj}.'), code: `<div className="box" {...rest} />` },
    { id: 'react-004', title: L('Single root & fragments', 'Единственный корень и фрагменты'), question: L('Why must a component return one root?', 'Почему компонент должен возвращать один корень?'), answer: L('JSX compiles to one element; wrap siblings in div or fragment.', 'JSX компилируется в один элемент; оберните соседей в div или фрагмент.'), code: `return <><h1>Title</h1><p>Text</p></>;` },
    { id: 'react-005', title: L('Fragments', 'Фрагменты'), question: L('What are fragments?', 'Что такое фрагменты?'), answer: L('Group children without extra DOM node; short syntax <>...</>.', 'Группируют детей без лишнего DOM-узла; краткий синтаксис <>...</>.'), code: `return <><ChildA /><ChildB /></>;` },
    { id: 'react-006', title: L('Function components', 'Функциональные компоненты'), question: L('How to define a function component?', 'Как определить функциональный компонент?'), answer: L('A function returning JSX; name in PascalCase.', 'Функция, возвращающая JSX; имя в PascalCase.'), code: `function Welcome() { return <h1>Hello</h1>; }` },
    { id: 'react-007', title: L('Class components', 'Классовые компоненты'), question: L('When are class components still used?', 'Когда классовые компоненты ещё используются?'), answer: L('Legacy; still needed for error boundaries and some lifecycle cases.', 'Legacy; нужны для error boundaries и некоторых случаев жизненного цикла.'), code: `class ErrorBoundary extends React.Component { render() { return this.props.children; } }` },
    { id: 'react-008', title: L('Props basics', 'Основы пропсов'), question: L('What are props?', 'Что такое пропсы?'), answer: L('Read-only inputs passed from parent to child.', 'Входные данные только для чтения от родителя к ребёнку.'), code: `function Greeting({ name }) { return <h1>{name}</h1>; }` },
    { id: 'react-009', title: L('Props rules', 'Правила пропсов'), question: L('Can a component mutate its props?', 'Может ли компонент мутировать свои пропсы?'), answer: L('No; props are read-only.', 'Нет; пропсы только для чтения.'), code: `// Never: props.name = 'x';` },
    { id: 'react-010', title: L('Destructuring props', 'Деструктуризация пропсов'), question: L('How to destructure props?', 'Как деструктурировать пропсы?'), answer: L('Destructure in function params.', 'Деструктурируйте в параметрах функции.'), code: `function User({ name, age }) { return <p>{name} {age}</p>; }` },
    { id: 'react-011', title: L('Default props', 'Пропсы по умолчанию'), question: L('How to set default prop values?', 'Как задать значения пропсов по умолчанию?'), answer: L('Use destructuring defaults.', 'Используйте значения по умолчанию при деструктуризации.'), code: `function Btn({ label = 'Click' }) { return <button>{label}</button>; }` },
    { id: 'react-012', title: L('Passing prop types', 'Передача типов пропсов'), question: L('How to pass different types as props?', 'Как передавать разные типы в пропсы?'), answer: L('Strings in quotes, other values in braces.', 'Строки в кавычках, остальные значения в фигурных скобках.'), code: `<User age={25} active={true} items={['a','b']} />` },
    { id: 'react-013', title: L('children prop', 'Проп children'), question: L('What is the children prop?', 'Что такое проп children?'), answer: L('Nested elements between component tags; enables composition.', 'Вложенные элементы между тегами компонента; включает композицию.'), code: `<Card><p>Content</p></Card>` },
    { id: 'react-014', title: L('Composition', 'Композиция'), question: L('Composition vs inheritance?', 'Композиция vs наследование?'), answer: L('React favors composition; build from smaller pieces.', 'React предпочитает композицию; стройте из меньших частей.'), code: `function Layout({ sidebar, content }) { return <div>{sidebar}{content}</div>; }` },
    { id: 'react-015', title: L('State basics', 'Основы состояния'), question: L('What is state?', 'Что такое состояние?'), answer: L('Internal mutable data; changes trigger re-render.', 'Внутренние изменяемые данные; изменения вызывают ререндер.'), code: `const [count, setCount] = useState(0);` },
    { id: 'react-016', title: L('useState', 'useState'), question: L('How does useState work?', 'Как работает useState?'), answer: L('Returns [value, setter]; state persists between renders.', 'Возвращает [значение, сеттер]; состояние сохраняется между рендерами.'), code: `const [count, setCount] = useState(0);` },
    { id: 'react-017', title: L('Functional updates', 'Функциональные обновления'), question: L('When to use functional state updates?', 'Когда использовать функциональные обновления?'), answer: L('When new state depends on previous; avoids stale closures.', 'Когда новое состояние зависит от предыдущего; избегает устаревших замыканий.'), code: `setCount(prev => prev + 1);` },
    { id: 'react-018', title: L('State objects', 'Объекты в состоянии'), question: L('How to update object state?', 'Как обновлять объект в состоянии?'), answer: L('Create new object with spread; never mutate directly.', 'Создавайте новый объект через spread; никогда не мутируйте напрямую.'), code: `setUser(prev => ({ ...prev, age: 26 }));` },
    { id: 'react-019', title: L('State arrays', 'Массивы в состоянии'), question: L('How to update array state?', 'Как обновлять массив в состоянии?'), answer: L('Use map/filter/slice to create new arrays.', 'Используйте map/filter/slice для создания новых массивов.'), code: `setItems(prev => prev.filter(i => i.id !== id));` },
    { id: 'react-020', title: L('Lifting state up', 'Подъём состояния'), question: L('What is lifting state up?', 'Что такое подъём состояния?'), answer: L('Move shared state to common parent; pass via props.', 'Переместите общее состояние к общему родителю; передавайте через пропсы.'), code: `function Parent() { const [v, setV] = useState(''); return <Child value={v} onChange={setV} />; }` },
    { id: 'react-021', title: L('Events', 'События'), question: L('How are events handled in React?', 'Как обрабатываются события в React?'), answer: L('camelCase handlers receiving function (not call).', 'Обработчики в camelCase, передаётся функция (не вызов).'), code: `<button onClick={handleClick}>Click</button>` },
    { id: 'react-022', title: L('Event object', 'Объект события'), question: L('How to access event data?', 'Как получить данные события?'), answer: L('Event passed as argument; use e.target.value.', 'Событие передаётся аргументом; используйте e.target.value.'), code: `const handleChange = (e) => setValue(e.target.value);` },
    { id: 'react-023', title: L('preventDefault', 'preventDefault'), question: L('How to prevent default browser behavior?', 'Как отменить стандартное поведение браузера?'), answer: L('Call e.preventDefault() in handler.', 'Вызовите e.preventDefault() в обработчике.'), code: `const handleSubmit = (e) => { e.preventDefault(); };` },
    { id: 'react-024', title: L('Conditional rendering if', 'Условный рендеринг if'), question: L('How to conditionally render with if?', 'Как условно рендерить через if?'), answer: L('Return different JSX based on condition outside JSX.', 'Возвращайте разный JSX в зависимости от условия вне JSX.'), code: `if (isLoggedIn) return <UserMenu />; return <Login />;` },
    { id: 'react-025', title: L('Conditional ternary', 'Тернарный оператор'), question: L('How to conditionally render inline?', 'Как условно рендерить инлайн?'), answer: L('Use ternary operator inside JSX.', 'Используйте тернарный оператор внутри JSX.'), code: `{isLoggedIn ? <UserMenu /> : <LoginButton />}` },
    { id: 'react-026', title: L('Logical &&', 'Логическое &&'), question: L('How to render only when condition true?', 'Как рендерить только при истинном условии?'), answer: L('Use && operator; renders element if condition truthy.', 'Используйте оператор &&; элемент рендерится при истинном условии.'), code: `{isLoggedIn && <UserMenu />}` },
    { id: 'react-027', title: L('Lists map', 'Списки через map'), question: L('How to render lists?', 'Как рендерить списки?'), answer: L('Use array.map to produce elements.', 'Используйте array.map для создания элементов.'), code: `{items.map(item => <li key={item.id}>{item.text}</li>)}` },
    { id: 'react-028', title: L('Keys purpose', 'Назначение ключей'), question: L('Why are keys important?', 'Зачем нужны ключи?'), answer: L('Help React identify items across renders for efficient reconciliation.', 'Помогают React идентифицировать элементы между рендерами для эффективной сверки.'), code: `<li key={item.id}>{item.text}</li>` },
    { id: 'react-029', title: L('Key pitfalls', 'Ошибки с ключами'), question: L('Why is array index a bad key?', 'Почему индекс массива — плохой ключ?'), answer: L('Reordering changes indices, causing wrong DOM reuse and state bugs.', 'Переупорядочивание меняет индексы, вызывая неправильное переиспользование DOM и баги состояния.'), code: `// Bad: key={index}; Good: key={item.id}` },
    { id: 'react-030', title: L('Controlled inputs', 'Controlled inputs'), question: L('What are controlled inputs?', 'Что такое controlled inputs?'), answer: L('Input value controlled by state; onChange updates state.', 'Значение инпута контролируется состоянием; onChange обновляет состояние.'), code: `<input value={name} onChange={e => setName(e.target.value)} />` },
    { id: 'react-031', title: L('Uncontrolled inputs', 'Uncontrolled inputs'), question: L('What are uncontrolled inputs?', 'Что такое uncontrolled inputs?'), answer: L('DOM holds value; access via ref.', 'DOM хранит значение; доступ через ref.'), code: `const ref = useRef(null); ref.current?.value` },
    { id: 'react-032', title: L('Forms', 'Формы'), question: L('How to handle forms?', 'Как обрабатывать формы?'), answer: L('Controlled inputs + onSubmit; libraries reduce boilerplate.', 'Controlled inputs + onSubmit; библиотеки снижают шаблонность.'), code: `<form onSubmit={handleSubmit}><input {...register('email')} /></form>` },
    { id: 'react-033', title: L('useEffect purpose', 'Назначение useEffect'), question: L('What does useEffect do?', 'Что делает useEffect?'), answer: L('Runs side effects after render; deps control when; cleanup on unmount/deps change.', 'Выполняет побочные эффекты после рендера; зависимости контролируют запуск; очистка при размонтировании/изменении зависимостей.'), code: `useEffect(() => { document.title = count; }, [count]);` },
    { id: 'react-034', title: L('Effect no deps', 'Эффект без зависимостей'), question: L('What happens with no dependency array?', 'Что происходит без массива зависимостей?'), answer: L('Effect runs after every render.', 'Эффект выполняется после каждого рендера.'), code: `useEffect(() => { console.log('every render'); });` },
    { id: 'react-035', title: L('Effect empty deps', 'Пустые зависимости'), question: L('What does empty [] mean?', 'Что означает пустой []?'), answer: L('Effect runs once after initial render.', 'Эффект выполняется один раз после первоначального рендера.'), code: `useEffect(() => { console.log('mount'); }, []);` },
    { id: 'react-036', title: L('Effect deps array', 'Массив зависимостей'), question: L('How do effect dependencies work?', 'Как работают зависимости эффекта?'), answer: L('Effect runs when any dep changes.', 'Эффект запускается при изменении любой зависимости.'), code: `useEffect(() => { fetchData(id); }, [id]);` },
    { id: 'react-037', title: L('Effect cleanup', 'Очистка эффекта'), question: L('When does cleanup run?', 'Когда выполняется очистка?'), answer: L('Before next effect run and on unmount.', 'Перед следующим запуском эффекта и при размонтировании.'), code: `useEffect(() => { const id = setInterval(tick,1000); return () => clearInterval(id); }, []);` },
    { id: 'react-038', title: L('Stale closures', 'Устаревшие замыкания'), question: L('What are stale closures in effects?', 'Что такое устаревшие замыкания в эффектах?'), answer: L('Effect captures old values; missing deps cause stale data.', 'Эффект захватывает старые значения; пропущенные зависимости вызывают устаревшие данные.'), code: `useEffect(() => { console.log(count); }, []); // stale` },
    { id: 'react-039', title: L('Data fetching', 'Загрузка данных'), question: L('How to fetch data in React?', 'Как загружать данные в React?'), answer: L('Fetch in useEffect; track data/error/loading; cleanup with AbortController.', 'Загружайте в useEffect; отслеживайте данные/ошибку/загрузку; очищайте через AbortController.'), code: `useEffect(() => { const ctrl=new AbortController(); fetch(url,{signal:ctrl.signal}); return ()=>ctrl.abort(); }, [url]);` },
    { id: 'react-040', title: L('AbortController', 'AbortController'), question: L('What is AbortController?', 'Что такое AbortController?'), answer: L('Cancels fetch requests; prevents updates on unmounted components.', 'Отменяет fetch-запросы; предотвращает обновления на размонтированных компонентах.'), code: `const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal });` },
    { id: 'react-041', title: L('Lifecycle mapping', 'Отображение жизненного цикла'), question: L('How do hooks replace lifecycle methods?', 'Как хуки заменяют методы жизненного цикла?'), answer: L('useEffect with [] = componentDidMount; with deps = componentDidUpdate; cleanup = componentWillUnmount.', 'useEffect с [] = componentDidMount; с зависимостями = componentDidUpdate; очистка = componentWillUnmount.'), code: `useEffect(() => { /* mount */ return () => /* unmount */; }, []);` },
    { id: 'react-042', title: L('Lifting state deep', 'Подъём состояния углублённо'), question: L('When to lift state?', 'Когда поднимать состояние?'), answer: L('When siblings need same data; parent stores state and passes props.', 'Когда соседи нуждаются в одних данных; родитель хранит состояние и передаёт пропсы.'), code: `function Parent(){const[text,setText]=useState('');return <><A text={text} onChange={setText}/><B text={text}/></>;}` },
    { id: 'react-043', title: L('Prop drilling', 'Проброс пропсов'), question: L('What is prop drilling?', 'Что такое prop drilling?'), answer: L('Passing props through many levels; use context to avoid.', 'Передача пропсов через много уровней; используйте контекст, чтобы избежать.'), code: `// Many levels of passing same prop` },
    { id: 'react-044', title: L('Context create', 'Создание контекста'), question: L('What is React Context?', 'Что такое React Context?'), answer: L('Provides values to tree without prop drilling; consumers re-render on value change.', 'Передаёт значения в дерево без prop drilling; потребители ререндерятся при изменении значения.'), code: `const ThemeContext = createContext('light');` },
    { id: 'react-045', title: L('Context provider', 'Провайдер контекста'), question: L('How to provide context?', 'Как предоставить контекст?'), answer: L('Wrap tree with Provider and pass value.', 'Оберните дерево в Provider и передайте значение.'), code: `<ThemeContext.Provider value="dark"><App /></ThemeContext.Provider>` },
    { id: 'react-046', title: L('useContext', 'useContext'), question: L('How to consume context?', 'Как использовать контекст?'), answer: L('Call useContext with context object.', 'Вызовите useContext с объектом контекста.'), code: `const theme = useContext(ThemeContext);` },
    { id: 'react-047', title: L('Context performance', 'Производительность контекста'), question: L('Context performance pitfalls?', 'Подводные камни производительности контекста?'), answer: L('All consumers re-render on value change; split contexts or memoize value.', 'Все потребители ререндерятся при изменении значения; разделяйте контексты или мемоизируйте значение.'), code: `const value = useMemo(() => ({ theme, toggle }), [theme]);` },
    { id: 'react-048', title: L('Context when to use', 'Когда использовать контекст'), question: L('When to use context?', 'Когда использовать контекст?'), answer: L('Global data (theme, language, auth); not every state.', 'Глобальные данные (тема, язык, аутентификация); не для каждого состояния.'), code: `const AuthContext = createContext(null);` },
    { id: 'react-049', title: L('React.memo', 'React.memo'), question: L('What does React.memo do?', 'Что делает React.memo?'), answer: L('Skips re-render if props shallowly equal.', 'Пропускает ререндер при поверхностном равенстве пропсов.'), code: `const MemoComp = React.memo(function Comp({ data }) { return <div>{data}</div>; });` },
    { id: 'react-050', title: L('useMemo', 'useMemo'), question: L('When to use useMemo?', 'Когда использовать useMemo?'), answer: L('Cache expensive computed values; recompute on deps change.', 'Кэшируйте дорогие вычисления; пересчитывайте при изменении зависимостей.'), code: `const total = useMemo(() => compute(items), [items]);` },
    { id: 'react-051', title: L('useCallback', 'useCallback'), question: L('When to use useCallback?', 'Когда использовать useCallback?'), answer: L('Cache function identity for memoized children or effect deps.', 'Кэшируйте идентичность функции для мемоизированных детей или зависимостей эффекта.'), code: `const handleClick = useCallback(() => doSomething(id), [id]);` },
    { id: 'react-052', title: L('Memoization combos', 'Комбинации мемоизации'), question: L('How to combine memoization tools?', 'Как комбинировать инструменты мемоизации?'), answer: L('React.memo child + useCallback/useMemo for stable props.', 'React.memo для ребёнка + useCallback/useMemo для стабильных пропсов.'), code: `<MemoChild onClick={memoizedHandler} />` },
    { id: 'react-053', title: L('Memoization pitfalls', 'Ошибки мемоизации'), question: L('Common memoization mistakes?', 'Частые ошибки мемоизации?'), answer: L('Over-memoizing cheap values, unstable deps, memo without measuring.', 'Избыточная мемоизация дешёвых значений, нестабильные зависимости, memo без измерений.'), code: `// Bad: useMemo(() => a + b, [a, b])` },
    { id: 'react-054', title: L('React Router basics', 'Основы React Router'), question: L('What is React Router?', 'Что такое React Router?'), answer: L('Standard routing library; BrowserRouter, Routes, Route, Link.', 'Стандартная библиотека маршрутизации; BrowserRouter, Routes, Route, Link.'), code: `<BrowserRouter><Routes><Route path="/" element={<Home />} /></Routes></BrowserRouter>` },
    { id: 'react-055', title: L('Link & NavLink', 'Link и NavLink'), question: L('Link vs NavLink?', 'Link vs NavLink?'), answer: L('Link navigates without reload; NavLink adds active styling.', 'Link навигирует без перезагрузки; NavLink добавляет активные стили.'), code: `<NavLink to="/about" style={({isActive})=>({color:isActive?'red':'blue'})}>About</NavLink>` },
    { id: 'react-056', title: L('useParams', 'useParams'), question: L('How to read route params?', 'Как читать параметры маршрута?'), answer: L('useParams returns object with param values.', 'useParams возвращает объект со значениями параметров.'), code: `const { userId } = useParams(); // /user/:userId` },
    { id: 'react-057', title: L('useNavigate', 'useNavigate'), question: L('How to navigate programmatically?', 'Как навигировать программно?'), answer: L('useNavigate returns function; call with path.', 'useNavigate возвращает функцию; вызовите с путём.'), code: `const navigate = useNavigate(); navigate('/profile');` },
    { id: 'react-058', title: L('Nested routes', 'Вложенные маршруты'), question: L('How do nested routes work?', 'Как работают вложенные маршруты?'), answer: L('Parent renders Outlet for child routes.', 'Родитель рендерит Outlet для дочерних маршрутов.'), code: `<Route path="/dashboard" element={<Dashboard />}><Route path="stats" element={<Stats />} /></Route>` },
    { id: 'react-059', title: L('Portals', 'Порталы'), question: L('What are portals?', 'Что такое порталы?'), answer: L('Render children into DOM node outside parent hierarchy.', 'Рендерят детей в DOM-узел вне иерархии родителя.'), code: `createPortal(<Modal />, document.body)` },
    { id: 'react-060', title: L('Portal use cases', 'Применение порталов'), question: L('Why use portals?', 'Зачем использовать порталы?'), answer: L('Avoid z-index/overflow issues for modals/tooltips.', 'Избегайте проблем с z-index/overflow для модалок/тултипов.'), code: `return createPortal(<div className="modal">{children}</div>, document.getElementById('modal-root'));` },
    { id: 'react-061', title: L('useRef DOM', 'useRef для DOM'), question: L('How to access DOM with useRef?', 'Как получить доступ к DOM через useRef?'), answer: L('Create ref, attach to element, read .current.', 'Создайте ref, прикрепите к элементу, читайте .current.'), code: `const ref = useRef(null); ref.current?.focus();` },
    { id: 'react-062', title: L('useRef mutable', 'useRef для изменяемых значений'), question: L('How to store mutable value without re-render?', 'Как хранить изменяемое значение без ререндера?'), answer: L('useRef persists value across renders without triggering re-render.', 'useRef сохраняет значение между рендерами без вызова ререндера.'), code: `const ref = useRef(0); ref.current += 1;` },
    { id: 'react-063', title: L('forwardRef', 'forwardRef'), question: L('What is forwardRef?', 'Что такое forwardRef?'), answer: L('Passes ref from parent to child DOM node.', 'Пробрасывает ref от родителя к DOM-узлу ребёнка.'), code: `const Input = forwardRef((props, ref) => <input ref={ref} />);` },
    { id: 'react-064', title: L('useImperativeHandle', 'useImperativeHandle'), question: L('What is useImperativeHandle?', 'Что такое useImperativeHandle?'), answer: L('Customizes ref exposed by forwardRef.', 'Кастомизирует ref, экспонируемый через forwardRef.'), code: `useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus() }));` },
    { id: 'react-065', title: L('Virtual DOM', 'Виртуальный DOM'), question: L('What is Virtual DOM?', 'Что такое Virtual DOM?'), answer: L('In-memory copy of DOM; React diffs and updates changed parts.', 'Копия DOM в памяти; React сравнивает и обновляет изменённые части.'), code: `// React compares old vs new vDOM` },
    { id: 'react-066', title: L('Reconciliation', 'Сверка'), question: L('What is reconciliation?', 'Что такое сверка?'), answer: L('React diffs virtual DOM trees to minimize real DOM updates.', 'React сравнивает виртуальные DOM-деревья для минимизации реальных обновлений.'), code: `// Key-based matching for lists` },
    { id: 'react-067', title: L('Hooks rules', 'Правила хуков'), question: L('What are rules of hooks?', 'Каковы правила хуков?'), answer: L('Call at top level only; only from React functions; never in loops/conditions.', 'Вызывайте только на верхнем уровне; только из React-функций; никогда в циклах/условиях.'), code: `// Bad: if (x) useEffect(...)` },
    { id: 'react-068', title: L('Custom hooks', 'Кастомные хуки'), question: L('What are custom hooks?', 'Что такое кастомные хуки?'), answer: L('Functions starting with use that call other hooks; reuse stateful logic.', 'Функции, начинающиеся с use, вызывающие другие хуки; переиспользуют логику с состоянием.'), code: `function useWindowWidth() { const [w,setW]=useState(window.innerWidth); return w; }` },
    { id: 'react-069', title: L('useReducer', 'useReducer'), question: L('When to use useReducer?', 'Когда использовать useReducer?'), answer: L('Complex state with multiple sub-values; easier to test.', 'Сложное состояние с несколькими под-значениями; проще тестировать.'), code: `const [state, dispatch] = useReducer(reducer, initialState);` },
    { id: 'react-070', title: L('useLayoutEffect', 'useLayoutEffect'), question: L('useLayoutEffect vs useEffect?', 'useLayoutEffect vs useEffect?'), answer: L('Runs sync after DOM mutations before paint; use for measurements.', 'Выполняется синхронно после мутаций DOM до отрисовки; используйте для измерений.'), code: `useLayoutEffect(() => { const rect = ref.current?.getBoundingClientRect(); }, []);` },
    { id: 'react-071', title: L('useId', 'useId'), question: L('What is useId?', 'Что такое useId?'), answer: L('Generates stable unique ids for accessibility attributes.', 'Генерирует стабильные уникальные id для атрибутов доступности.'), code: `const id = useId(); <label htmlFor={id}><input id={id} /></label>` },
    { id: 'react-072', title: L('StrictMode', 'StrictMode'), question: L('What does StrictMode do?', 'Что делает StrictMode?'), answer: L('Double-invokes effects in dev to surface bugs.', 'Дважды вызывает эффекты в dev для выявления багов.'), code: `<StrictMode><App /></StrictMode>` },
    { id: 'react-073', title: L('Synthetic events', 'Синтетические события'), question: L('What are synthetic events?', 'Что такое синтетические события?'), answer: L('Cross-browser wrappers around native events.', 'Кросс-браузерные обёртки над нативными событиями.'), code: `onClick={e => console.log(e)}` },
    { id: 'react-074', title: L('Hydration', 'Гидратация'), question: L('What is hydration?', 'Что такое гидратация?'), answer: L('React attaches event listeners to server-rendered HTML.', 'React прикрепляет обработчики событий к серверному HTML.'), code: `hydrateRoot(document.getElementById('root'), <App />);` },
    { id: 'react-075', title: L('HOC', 'HOC'), question: L('What is a Higher-Order Component?', 'Что такое Higher-Order Component?'), answer: L('Function taking component, returning enhanced component.', 'Функция, принимающая компонент и возвращающая улучшенный компонент.'), code: `const withAuth = (Comp) => (props) => isAuthed ? <Comp {...props} /> : <Login />;` },
    { id: 'react-076', title: L('Render props', 'Render props'), question: L('What are render props?', 'Что такое render props?'), answer: L('Function prop returning JSX to share behavior.', 'Функция-проп, возвращающая JSX, для разделения поведения.'), code: `<DataProvider render={data => <div>{data}</div>} />` },
    { id: 'react-077', title: L('Compound components', 'Составные компоненты'), question: L('What are compound components?', 'Что такое составные компоненты?'), answer: L('Components sharing implicit state via context.', 'Компоненты, разделяющие неявное состояние через контекст.'), code: `<Tabs><TabList><Tab /></TabList><TabPanel /></Tabs>` },
    { id: 'react-078', title: L('Common mistakes', 'Частые ошибки'), question: L('Common React mistakes?', 'Частые ошибки React?'), answer: L('Direct state mutation, missing deps, missing cleanup, conditional hooks.', 'Прямая мутация состояния, пропущенные зависимости, пропущенная очистка, условные хуки.'), code: `// Avoid: count = count + 1; use setCount` },
    { id: 'react-079', title: L('Error boundaries', 'Границы ошибок'), question: L('What are error boundaries?', 'Что такое границы ошибок?'), answer: L('Class components catching render errors in subtree; show fallback.', 'Классовые компоненты, ловящие ошибки рендера в поддереве; показывают fallback.'), code: `class Boundary extends React.Component { static getDerivedStateFromError(){return{hasError:true};} }` },
    { id: 'react-080', title: L('Performance basics', 'Основы производительности'), question: L('Common performance optimizations?', 'Частые оптимизации производительности?'), answer: L('Memoization, virtualization, code splitting, avoid unnecessary state; profile first.', 'Мемоизация, виртуализация, разделение кода, избегание лишнего состояния; профилируйте сначала.'), code: `import { FixedSizeList } from 'react-window';` },
  ],
  quiz: [
    {
      id: 'react-q01',
      question: L(
        'What does JSX compile to?',
        'Во что компилируется JSX?'
      ),
      options: [
        L(
          'Calls that produce plain objects describing what should be rendered',
          'Вызовы, создающие обычные объекты, описывающие то, что должно быть отрисовано'
        ),
        L('HTML strings that the browser parses on its own', 'HTML-строки, которые браузер разбирает сам'),
        L('A call to document.createElement for every tag', 'Вызов document.createElement для каждого тега'),
        L('Nothing at all, JSX is only a notation on the type level', 'Ничего, JSX — это только нотация на уровне типов'),
      ],
      correctIndex: 0,
      explanation: L(
        'JSX is syntax sugar: the compiler turns it into calls that return element descriptions, and React later reconciles those descriptions with the real DOM. The browser never sees JSX, and it is not HTML strings either, because that would throw away the component model.',
        'JSX — это синтаксический сахар: компилятор превращает его в вызовы, возвращающие описания элементов, а React потом сверяет эти описания с настоящим DOM. Браузер никогда не видит JSX, и это не HTML-строки, потому что тогда пришлось бы отказаться от модели компонентов.'
      ),
    },
    {
      id: 'react-q02',
      question: L(
        'What are props?',
        'Что такое пропсы?'
      ),
      options: [
        L('Values the component is free to change during its lifetime', 'Значения, которые компонент свободно меняет в течение своей жизни'),
        L('Read-only inputs that the parent passes down to the child', 'Данные только для чтения, которые родитель передаёт ребёнку'),
        L('A copy of the state that the component itself owns', 'Копия состояния, которым владеет сам компонент'),
        L('Global values shared by the whole application', 'Глобальные значения, общие для всего приложения'),
      ],
      correctIndex: 1,
      explanation: L(
        'Props flow in one direction, from the parent to the child, and the child must not mutate them. To change a prop the parent has to update its own state, and that is what keeps the data flow predictable and the component reusable.',
        'Пропсы текут в одну сторону, от родителя к ребёнку, и ребёнок не должен их мутировать. Чтобы изменить проп, родителю надо обновить своё состояние, и именно это делает поток данных предсказуемым, а компонент переиспользуемым.'
      ),
    },
    {
      id: 'react-q03',
      question: L(
        'How does a parent put content into a child component?',
        'Как родитель передаёт содержимое внутрь дочернего компонента?'
      ),
      options: [
        L('By assigning the content to a global variable', 'Присваивая содержимое глобальной переменной'),
        L('By calling the parent component from inside the child', 'Вызывая компонент родителя изнутри ребёнка'),
        L(
          'By placing the content between the component tags, where it arrives as the children prop',
          'Размещая содержимое между тегами компонента, где оно приходит как проп children'
        ),
        L('By passing it through a ref', 'Передавая его через ref'),
      ],
      correctIndex: 2,
      explanation: L(
        'The children prop is what makes composition possible: the parent decides what goes inside the child, and the child decides where to render it. That is why React prefers composition to inheritance, because a wrapper stays reusable with any content.',
        'Проп children и делает композицию возможной: родитель решает, что положить внутрь ребёнка, а ребёнок решает, где это отрисовать. Поэтому React предпочитает композицию наследованию: обёртка остаётся переиспользуемой с любым содержимым.'
      ),
    },
    {
      id: 'react-q04',
      question: L(
        'What does a fragment written as <>...</> add to the DOM?',
        'Что фрагмент, записанный как <>...</>, добавляет в DOM?'
      ),
      options: [
        L('A div element', 'Элемент div'),
        L('A comment node', 'Узел-комментарий'),
        L('A span element', 'Элемент span'),
        L('Nothing, no extra DOM node is created', 'Ничего, лишний DOM-узел не создаётся'),
      ],
      correctIndex: 3,
      explanation: L(
        'A fragment groups several siblings without a wrapper node, which matters when the parent is a flex or a grid container, because a wrapper div would become a flex item of its own. Fragments still need a key when they appear inside a list.',
        'Фрагмент группирует несколько соседей без обёртки, и это важно, когда родитель — flex- или grid-контейнер: обёртка div стала бы отдельным элементом раскладки. Фрагментам всё равно нужен ключ, если они встречаются внутри списка.'
      ),
    },
    {
      id: 'react-q05',
      question: L(
        'What is the purpose of the key prop in a list?',
        'Для чего нужен проп key в списке?'
      ),
      options: [
        L('It gives the element a stable CSS id', 'Он задаёт элементу постоянный CSS-идентификатор'),
        L('It tells React to render the item only once', 'Он говорит React отрисовать элемент только один раз'),
        L(
          'It tells React which item of the list every element belongs to, so the right DOM nodes can be reused',
          'Он говорит React, к какому элементу списка относится каждый узел, чтобы переиспользовать правильные DOM-узлы'
        ),
        L('It sorts the array before it is rendered', 'Он сортирует массив перед отрисовкой'),
      ],
      correctIndex: 2,
      explanation: L(
        'Reconciliation matches the old tree with the new one, and a stable key tells React that the same key means the same item, so the existing DOM node can be moved instead of rebuilt. That is what keeps the state of a row attached to the row when the list is reordered.',
        'Сверка сопоставляет старое дерево с новым, и стабильный ключ говорит React, что один и тот же ключ означает один и тот же элемент, поэтому существующий DOM-узел можно перенести, а не создавать заново. Именно так состояние строки остаётся привязанным к строке при перестановке списка.'
      ),
    },
    {
      id: 'react-q06',
      question: L(
        'Why is using the array index as a key risky?',
        'Почему использовать индекс массива как ключ рискованно?'
      ),
      options: [
        L(
          'After a reorder the index no longer matches the item, so React reuses the wrong nodes and the state follows the position',
          'После перестановки индекс больше не соответствует элементу, поэтому React переиспользует чужие узлы, а состояние следует за позицией'
        ),
        L('Numbers are not allowed as keys', 'Числа не разрешены в качестве ключей'),
        L('The index changes on every render', 'Индекс меняется при каждом рендере'),
        L('Keys have to be unique across the whole application', 'Ключи должны быть уникальны во всём приложении'),
      ],
      correctIndex: 0,
      explanation: L(
        'Keys are compared between renders, so with an index key React sees the same keys and assumes the same items. Reordering then moves the DOM nodes and their state around with the index, which produces bugs such as an input that keeps the text of another item.',
        'Ключи сравниваются между рендерами, поэтому при ключе-индексе React видит те же ключи и считает, что элементы те же. Перестановка тогда переносит DOM-узлы и их состояние вместе с индексом, и получаются баги вроде поля ввода, сохраняющего чужой текст.'
      ),
    },
    {
      id: 'react-q07',
      question: L(
        'What does a React portal do?',
        'Что делает портал React?'
      ),
      options: [
        L('It moves the component into a different React root', 'Он переносит компонент в другой корень React'),
        L(
          'It renders the children into a DOM node outside the parent DOM hierarchy, while they stay in the React tree',
          'Он рендерит детей в DOM-узел за пределами DOM-иерархии родителя, оставляя их в дереве React'
        ),
        L('It renders a copy of the children in both places', 'Он рендерит копию детей в обоих местах'),
        L('It delays the rendering until the next animation frame', 'Он откладывает отрисовку до следующего кадра анимации'),
      ],
      correctIndex: 1,
      explanation: L(
        'createPortal renders the children into another DOM container, which is how a modal escapes the overflow and z-index rules of its parents. Events still bubble through the React tree and not through the DOM tree, so a click inside the modal still reaches the parent that owns it.',
        'createPortal рендерит детей в другой DOM-контейнер, и так модальное окно выходит за пределы правил overflow и z-index своих родителей. События при этом всплывают по дереву React, а не по дереву DOM, поэтому клик внутри модалки всё равно доходит до владельца.'
      ),
    },
    {
      id: 'react-q08',
      question: L(
        'What makes a component re-render?',
        'Что заставляет компонент перерисоваться?'
      ),
      options: [
        L('Changing a property of an object that is stored in state', 'Изменение свойства объекта, который лежит в состоянии'),
        L('Calling setTimeout', 'Вызов setTimeout'),
        L('Reading a prop', 'Чтение пропа'),
        L('Calling the setter returned by useState with a new value', 'Вызов сеттера, который вернул useState, с новым значением'),
      ],
      correctIndex: 3,
      explanation: L(
        'React schedules a re-render when a state setter is called with a value that differs from the current one. Reading a prop does not re-render anything by itself, because the parent has to re-render for the child to see a new value.',
        'React планирует перерисовку, когда сеттер состояния вызывается со значением, отличным от текущего. Чтение пропа само по себе ничего не перерисовывает: для этого родителю надо перерисоваться, чтобы ребёнок увидел новое значение.'
      ),
    },
    {
      id: 'react-q09',
      question: L(
        'Why does `user.age = 26` not update the screen when user is state?',
        'Почему `user.age = 26` не обновляет экран, когда user находится в состоянии?'
      ),
      options: [
        L('Because age is a reserved word in strict mode', 'Потому что age — зарезервированное слово в строгом режиме'),
        L(
          'Because React compares state by identity, so the mutated object is the same reference and no re-render is scheduled',
          'Потому что React сравнивает состояние по ссылке, поэтому изменённый объект остаётся той же ссылкой и перерисовка не планируется'
        ),
        L('Because a setter only accepts primitive values', 'Потому что сеттер принимает только примитивные значения'),
        L('Because the object was created outside of the component', 'Потому что объект был создан вне компонента'),
      ],
      correctIndex: 1,
      explanation: L(
        'State is treated as immutable, so the correct way is to replace the object: setUser(prev => ({ ...prev, age: 26 })). The spread creates a new reference, React notices the change and re-renders.',
        'Состояние считается неизменяемым, поэтому правильный способ — заменить объект: setUser(prev => ({ ...prev, age: 26 })). Spread создаёт новую ссылку, React замечает изменение и перерисовывает компонент.'
      ),
    },
    {
      id: 'react-q10',
      question: L(
        'Which form of a state update is safe when the new value depends on the old one?',
        'Какая форма обновления состояния безопасна, когда новое значение зависит от старого?'
      ),
      options: [
        L('count = count + 1', 'count = count + 1'),
        L('setCount(count + 1)', 'setCount(count + 1)'),
        L('setCount(prev => prev + 1)', 'setCount(prev => prev + 1)'),
        L('setState(count + 1)', 'setState(count + 1)'),
      ],
      correctIndex: 2,
      explanation: L(
        'The updater function receives the latest state, so several updates in one handler do not overwrite each other. The plain value form captures the count from the render in which the handler was created, which is exactly the stale closure problem.',
        'Функция-обновщик получает самое свежее состояние, поэтому несколько обновлений в одном обработчике не затирают друг друга. Форма со значением захватывает count из того рендера, где был создан обработчик, — это и есть проблема устаревшего замыкания.'
      ),
    },
    {
      id: 'react-q11',
      question: L(
        'How many re-renders happen when two state setters are called in the same event handler?',
        'Сколько перерисовок будет, если вызвать два сеттера состояния в одном обработчике события?'
      ),
      options: [
        L('One, because React batches the updates of one event handler', 'Одна, потому что React группирует обновления одного обработчика'),
        L('Two, one for each setter', 'Две, по одной на каждый сеттер'),
        L('As many as there are state variables in the component', 'Столько, сколько в компоненте переменных состояния'),
        L('None, the re-render happens on the next animation frame', 'Ни одной, перерисовка произойдёт на следующем кадре анимации'),
      ],
      correctIndex: 0,
      explanation: L(
        'React collects the updates of one event handler and applies them together, so the component renders once with the final values. Since React 18 this batching also covers updates coming from promises, timeouts and native event handlers.',
        'React собирает обновления одного обработчика и применяет их вместе, поэтому компонент рисуется один раз с итоговыми значениями. Начиная с React 18 такое группирование действует и для обновлений из промисов, таймеров и нативных обработчиков.'
      ),
    },
    {
      id: 'react-q12',
      question: L(
        'What is useId used for?',
        'Для чего используется useId?'
      ),
      options: [
        L('Storing the id of the last rendered element in the DOM', 'Для хранения id последнего отрисованного элемента в DOM'),
        L('Generating a random key for a list', 'Для генерации случайного ключа списка'),
        L('Caching the result of an expensive computation', 'Для кэширования результата дорогого вычисления'),
        L(
          'Generating a stable unique id, for example for the htmlFor and id pair of a label and an input',
          'Для генерации стабильного уникального id, например для пары htmlFor и id у метки и поля ввода'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'useId returns an id that is stable across renders and unique inside the tree, which is exactly what accessibility attributes need, because a label points at its input by id. Unlike a counter it also survives server rendering, where the ids of the server and the client have to match.',
        'useId возвращает id, стабильный между рендерами и уникальный в дереве, — именно это и нужно атрибутам доступности, ведь метка указывает на поле по id. В отличие от счётчика он работает и при серверном рендере, где id сервера и клиента должны совпадать.'
      ),
    },
    {
      id: 'react-q13',
      question: L(
        'Two sibling components need the same value. What is the usual solution?',
        'Два соседних компонентам нужен одно и то же значение. Какое решение обычно применяют?'
      ),
      options: [
        L('Duplicate the state in both components and keep the copies in sync by hand', 'Дублировать состояние в обоих компонентах и синхронизировать копии вручную'),
        L('Store the value in a module-level variable', 'Хранить значение в переменной уровня модуля'),
        L('Move the state to the closest common parent and pass it down as props', 'Перенести состояние в ближайшего общего родителя и передавать его пропсами'),
        L('Keep the value in the URL of the page', 'Хранить значение в URL страницы'),
      ],
      correctIndex: 2,
      explanation: L(
        'When siblings need the same value, the state belongs in their closest common parent, and the parent passes the value and the setter down. A global store is only worth it when the value really is global.',
        'Когда соседям нужно одно значение, состояние живёт в их ближайшем общем родителе, а родитель передаёт вниз и значение, и сеттер. Глобальное хранилище оправдано только тогда, когда значение действительно глобальное.'
      ),
    },
    {
      id: 'react-q14',
      question: L(
        'A component stores a list of items and also needs the total price of that list. Where should the total live?',
        'Компонент хранит список товаров и ещё ему нужна их общая сумма. Где должно жити это значение?'
      ),
      options: [
        L('In a second useState variable that an effect keeps in sync', 'В второй переменной useState, которую синхронизирует эффект'),
        L('Computed during the render from the items that are already in state', 'Вычисляется прямо при рендере из товаров, которые уже лежат в состоянии'),
        L('In a ref, because it does not have to trigger a re-render', 'В ref, потому что ему не нужно вызывать перерисовку'),
        L('In a module-level variable', 'В переменной уровня модуля'),
      ],
      correctIndex: 1,
      explanation: L(
        'Duplicating derived data in state creates two sources of truth that can drift apart, and the effect that synchronises them runs one render too late. Computing the value during render is cheaper and always consistent.',
        'Дублирование производных данных в состоянии создаёт два источника истины, которые могут разойтись, а эффект, их синхронизирующий, выполняется на рендер позже нужного. Вычисление при рендере дешевле и всегда согласовано.'
      ),
    },
    {
      id: 'react-q15',
      question: L(
        'When is useReducer a better fit than useState?',
        'Когда useReducer подходит лучше, чем useState?'
      ),
      options: [
        L('When several state fields have to change together in response to the same event', 'Когда несколько полей состояния должны меняться вместе в ответ на одно событие'),
        L('When the component only needs a single boolean', 'Когда компоненту нужен всего один boolean'),
        L('When the component needs a reference to a DOM node', 'Когда компоненту нужна ссылка на DOM-узел'),
        L('When the component has no props at all', 'Когда у компонента вообще нет пропов'),
      ],
      correctIndex: 0,
      explanation: L(
        'useReducer keeps the state transitions in one pure function, which makes complicated logic easier to read and to test, and it scales when the state has several interdependent fields. For a single independent value useState stays simpler.',
        'useReducer держит переходы состояния в одной чистой функции, отчего сложная логика становится читабельнее и легче тестируется, и он хорошо масштабируется, когда полей состояния несколько и они связаны. Для одного независимого значения useState проще.'
      ),
    },
    {
      id: 'react-q16',
      question: L(
        'When does the body of a useEffect callback run?',
        'Когда выполняется тело функции, переданной в useEffect?'
      ),
      options: [
        L('During the render, before the DOM is updated', 'Во время рендера, до обновления DOM'),
        L('Only when the component unmounts', 'Только когда компонент размонтируется'),
        L('Before every render', 'Перед каждым рендером'),
        L('After React has committed the rendered output to the DOM', 'После того, как React зафиксировал отрисованный вывод в DOM'),
      ],
      correctIndex: 3,
      explanation: L(
        'useEffect is for synchronising with things outside React, and it runs after the paint. If a value has to be read or changed before the browser paints, that is the job of useLayoutEffect.',
        'useEffect нужен для синхронизации с тем, что находится вне React, и он выполняется после отрисовки. Если значение надо прочитать или изменить до того, как браузер нарисует кадр, это работа useLayoutEffect.'
      ),
    },
    {
      id: 'react-q17',
      question: L(
        'What does `useEffect(() => { ... }, [])` do?',
        'Что делает `useEffect(() => { ... }, [])`?'
      ),
      options: [
        L('Runs the effect after every render', 'Выполняет эффект после каждого рендера'),
        L('Runs the effect once, when the component unmounts', 'Выполняет эффект один раз, при размонтировании'),
        L('Runs the effect once, after the initial render', 'Выполняет эффект один раз, после первого рендера'),
        L('Never runs the effect', 'Никогда не выполняет эффект'),
      ],
      correctIndex: 2,
      explanation: L(
        'An empty dependency array means the effect has no reactive values, so React runs it once after the first render and never again. The cleanup function that the effect returns still runs before the next execution and on unmount.',
        'Пустой массив зависимостей означает, что у эффекта нет реактивных значений, поэтому React выполняет его один раз после первого рендера и больше никогда. Функция очистки, которую эффект возвращает, всё равно выполняется перед следующим запуском и при размонтировании.'
      ),
    },
    {
      id: 'react-q18',
      question: L(
        'When does `useEffect(() => { ... }, [id])` run the effect again?',
        'Когда `useEffect(() => { ... }, [id])` выполняет эффект заново?'
      ),
      options: [
        L('Only when the component unmounts', 'Только при размонтировании компонента'),
        L('Whenever the value of id differs from the value in the previous render', 'Когда значение id отличается от значения в предыдущем рендере'),
        L('On every render', 'При каждом рендере'),
        L('Whenever any state of the component changes', 'Когда меняется любое состояние компонента'),
      ],
      correctIndex: 1,
      explanation: L(
        'React compares the entries of the dependency array with the previous render and re-runs the effect when one of them changed. The comparison uses Object.is, so an object created inline during the render is a new dependency on every render.',
        'React сравнивает элементы массива зависимостей с предыдущим рендером и перезапускает эффект, если что-то изменилось. Сравнение идёт через Object.is, поэтому объект, созданный прямо в рендере, является новой зависимостью при каждом рендере.'
      ),
    },
    {
      id: 'react-q19',
      question: L(
        'What happens if the dependency array of a useEffect call is omitted?',
        'Что произойдёт, если массив зависимостей у useEffect опустить?'
      ),
      options: [
        L('The effect runs after every render', 'Эффект выполняется после каждого рендера'),
        L('The effect never runs', 'Эффект никогда не выполняется'),
        L('The effect runs only on mount', 'Эффект выполняется только при монтировании'),
        L('The compiler removes the effect as unused', 'Компилятор удаляет эффект как неиспользуемый'),
      ],
      correctIndex: 0,
      explanation: L(
        'Without the array React has no way to tell what the effect depends on, so it re-runs it after every commit. That is rarely what you want and it is the usual cause of an endless request loop.',
        'Без массива React не может понять, от чего зависит эффект, поэтому выполняет его после каждого коммита. Это редко бывает нужно и обычно становится причиной бесконечного цикла запросов.'
      ),
    },
    {
      id: 'react-q20',
      question: L(
        'When does the cleanup function returned by an effect run?',
        'Когда выполняется функция очистки, которую возвращает эффект?'
      ),
      options: [
        L('Only when the component unmounts', 'Только при размонтировании компонента'),
        L('Before every render', 'Перед каждым рендером'),
        L('Right before the body of the effect runs the first time', 'Непосредственно перед первым запуском тела эффекта'),
        L('Before the effect runs again and when the component unmounts', 'Перед следующим запуском эффекта и при размонтировании компонента'),
      ],
      correctIndex: 3,
      explanation: L(
        'React runs the cleanup before the next execution of the same effect and on unmount, so it is the right place to cancel a request, remove an event listener or clear a timer. Without it the previous subscription keeps working with stale values.',
        'React выполняет очистку перед следующим запуском того же эффекта и при размонтировании, поэтому именно там отменяют запрос, снимают слушатель события или чистят таймер. Без неё прежняя подписка продолжает работать с устаревшими значениями.'
      ),
    },
    {
      id: 'react-q21',
      question: L(
        'An effect with an empty dependency array logs the counter, and it always shows the first value. Why?',
        'Эффект с пустым массивом зависимостей логирует счётчик и всегда показывает первое значение. Почему?'
      ),
      options: [
        L('Because console.log is asynchronous and prints an old snapshot', 'Потому что console.log асинхронный и печатает старый снимок'),
        L(
          'Because the effect captured the counter from the render it was created in, and the empty dependency array prevents a re-run',
          'Потому что эффект захватил счётчик из того рендера, где был создан, а пустой массив зависимостей не даёт перезапуститься'
        ),
        L('Because useState does not store numbers', 'Потому что useState не хранит числа'),
        L('Because StrictMode blocks the second run of an effect', 'Потому что StrictMode блокирует второй запуск эффекта'),
      ],
      correctIndex: 1,
      explanation: L(
        'Every render creates new functions, and the effect closes over the one from the render in which it ran. Listing the counter in the dependency array, or reading it through a ref, makes the effect see the current value.',
        'Каждый рендер создаёт новые функции, и эффект замыкается на той, что была создана в рендере выполнения. Если добавить счётчик в массив зависимостей или читать его через ref, эффект увидит актуальное значение.'
      ),
    },
    {
      id: 'react-q22',
      question: L(
        'What does the eslint react-hooks/exhaustive-deps rule check?',
        'Что проверяет правило eslint react-hooks/exhaustive-deps?'
      ),
      options: [
        L('Whether the component has too many props', 'Слишком ли много у компонента пропов'),
        L('Whether the effect is asynchronous', 'Является ли эффект асинхронным'),
        L('Whether the effect reads values that are not listed in its dependency array', 'Читает ли эффект значения, не перечисленные в его массиве зависимостей'),
        L('Whether the initial state is correct', 'Корректно ли инициализировано состояние'),
      ],
      correctIndex: 2,
      explanation: L(
        'The rule compares the values the effect reads with the ones in its dependency array and reports the difference. The usual fix is to add the missing dependency or to move the logic out of the effect, but the rule cannot see values that are deliberately left out.',
        'Правило сравнивает значения, которые читает эффект, с перечисленными в массиве зависимостей и сообщает о расхождении. Обычное решение — добавить недостающую зависимость или вынести логику из эффекта, но правило не видит значений, которые намеренно исключили.'
      ),
    },
    {
      id: 'react-q23',
      question: L(
        'Why abort the request in the cleanup of a fetching effect?',
        'Зачем отменять запрос в функции очистки эффекта загрузки?'
      ),
      options: [
        L('To make the request faster', 'Чтобы запрос выполнялся быстрее'),
        L('To retry the request automatically', 'Чтобы запрос автоматически повторялся'),
        L('To release the memory used by the response body', 'Чтобы освободить память, занятую телом ответа'),
        L('To stop a late response from updating state after the component is gone', 'Чтобы поздний ответ не обновлял состояние уже размонтированного компонента'),
      ],
      correctIndex: 3,
      explanation: L(
        'The cleanup aborts the request, so a response that arrives after the unmount cannot call a setter on a component that no longer exists. The signal is passed through the fetch options, and the abort surfaces as a rejection, so the error has to be handled.',
        'Очистка отменяет запрос, поэтому ответ, пришедший после размонтирования, не сможет вызвать сеттер у несуществующего компонента. Сигнал передаётся через опции fetch, а отмена выглядит как отклонённый промис, поэтому ошибку надо обработать.'
      ),
    },
    {
      id: 'react-q24',
      question: L(
        'What happens if an effect registers a window event listener and never removes it?',
        'Что будет, если эффект навешивает слушатель события window и никогда его не снимает?'
      ),
      options: [
        L('The listener and everything it captured stay in memory and keep firing after the component unmounts', 'Слушатель и всё, что он захватил, остаются в памяти и продолжают срабатывать после размонтирования'),
        L('React removes the listener automatically', 'React снимает слушатель автоматически'),
        L('The browser throws an error as soon as the component unmounts', 'Браузер бросает ошибку сразу при размонтировании'),
        L('The component re-renders in an endless loop', 'Компонент уходит в бесконечный цикл перерисовок'),
      ],
      correctIndex: 0,
      explanation: L(
        'A listener registered on window or document outlives the component unless the effect returns a cleanup that removes it. The same applies to timers, subscriptions and observers, and it is one of the most common sources of memory leaks.',
        'Слушатель на window или document переживает компонент, если эффект не возвращает очистку, которая его снимает. То же касается таймеров, подписок и наблюдателей, и это один из самых частых источников утечек памяти.'
      ),
    },
    {
      id: 'react-q25',
      question: L(
        'When should useLayoutEffect be preferred over useEffect?',
        'Когда лучше использовать useLayoutEffect вместо useEffect?'
      ),
      options: [
        L('When the effect has to send data to a server', 'Когда эффект должен отправить данные на сервер'),
        L('When the DOM has to be measured or adjusted before the browser paints', 'Когда DOM надо измерить или поправить до того, как браузер нарисует кадр'),
        L('When the effect subscribes to an external store', 'Когда эффект подписывается на внешнее хранилище'),
        L('When the effect has to run on every render', 'Когда эффект должен выполняться при каждом рендере'),
      ],
      correctIndex: 1,
      explanation: L(
        'useLayoutEffect runs synchronously after the DOM is mutated but before the paint, so a measurement taken there is correct and the user never sees the intermediate state. It blocks the paint, so it should stay rare and short.',
        'useLayoutEffect выполняется синхронно после изменения DOM, но до отрисовки, поэтому измерение в этот момент верное, и пользователь не видит промежуточного состояния. Он блокирует отрисовку, поэтому его применяют редко и ненадолго.'
      ),
    },
    {
      id: 'react-q26',
      question: L(
        'Does changing ref.current trigger a re-render?',
        'Вызывает ли изменение ref.current перерисовку?'
      ),
      options: [
        L('Yes, but only when the ref is attached to a DOM node', 'Да, но только если ref привязан к DOM-узлу'),
        L('Yes, on the next render cycle', 'Да, на следующем цикле рендера'),
        L('No, a ref is a mutable box whose changes do not schedule a re-render', 'Нет, ref — это мутабельная коробка, изменения которой не планируют перерисовку'),
        L('Yes, but only in React 18 and earlier', 'Да, но только в React 18 и раньше'),
      ],
      correctIndex: 2,
      explanation: L(
        'State is for data that has to appear on the screen, and a ref is for data that does not. Changing ref.current is silent, which makes a ref the right tool for the latest value of a callback, for a DOM node and for any object that already holds mutable data.',
        'Состояние — для данных, которые должны появиться на экране, а ref — для данных, которые не должны. Изменение ref.current происходит молча, и это делает ref правильным инструментом для последнего значения колбэка, для DOM-узла и для любого мутабельного объекта.'
      ),
    },
    {
      id: 'react-q27',
      question: L(
        'How do you focus an input with a ref?',
        'Как сфокусировать поле ввода через ref?'
      ),
      options: [
        L('By querying the document inside the component', 'Запрашивая документ внутри компонента'),
        L('By attaching the ref to the element and calling ref.current.focus()', 'Привязав ref к элементу и вызвав ref.current.focus()'),
        L('By keeping the element in state', 'Храня элемент в состоянии'),
        L('By calling element.focus() during the render', 'Вызвав element.focus() во время рендера'),
      ],
      correctIndex: 1,
      explanation: L(
        'The ref object is filled with the DOM node after the commit, so the node is available in effects and in event handlers. Calling focus during the render would run before the node exists, and querying the document bypasses the React tree entirely.',
        'Объект ref наполняется DOM-узлом после коммита, поэтому узел доступен в эффектах и в обработчиках. Вызов focus во время рендера случился бы раньше, чем узел появится, а запрос документа вообще обходит дерево React.'
      ),
    },
    {
      id: 'react-q28',
      question: L(
        'What does forwardRef do?',
        'Что делает forwardRef?'
      ),
      options: [
        L('It lets a parent pass a ref through the child to the DOM node inside it', 'Он позволяет родителю передать ref через ребёнка к DOM-узлу внутри него'),
        L('It makes the child render on the server', 'Он заставляет ребёнка рендериться на сервере'),
        L('It creates a new state variable inside the child', 'Он создаёт новую переменную состояния внутри ребёнка'),
        L('It memoises the child component', 'Он мемоизирует дочерний компонент'),
      ],
      correctIndex: 0,
      explanation: L(
        'A function component cannot receive a ref by default, because a ref is not an ordinary prop. forwardRef is the explicit way of saying that this component is willing to hand the ref it receives to something inside it.',
        'Функциональный компонент по умолчанию не может получить ref, потому что ref — не обычный проп. forwardRef — это явное способ сказать, что компонент готов передать полученный ref кому-то внутри себя.'
      ),
    },
    {
      id: 'react-q29',
      question: L(
        'What does `useImperativeHandle(ref, () => ({ ... }))` expose to the parent?',
        'Что открывает родителю `useImperativeHandle(ref, () => ({ ... }))`?'
      ),
      options: [
        L('Every property of the underlying DOM node', 'Все свойства лежащего под ним DOM-узла'),
        L('The current state of the component', 'Текущее состояние компонента'),
        L('A promise that resolves once the component is mounted', 'Промис, который разрешается после монтирования'),
        L('Only the members that are returned, and they become the public handle of the component', 'Только те члены, что возвращены, и они становятся публичной ручкой компонента'),
      ],
      correctIndex: 3,
      explanation: L(
        'useImperativeHandle replaces the default behaviour of exposing the DOM node and lets the component publish a small, deliberate API. That keeps the internals of the component out of the contract with the parent.',
        'useImperativeHandle отменяет поведение по умолчанию с выставлением DOM-узла и позволяет компоненту опубликовать небольшой, намеренно ограниченный API. Так внутренности компонента не попадают в контракт с родителем.'
      ),
    },
    {
      id: 'react-q30',
      question: L(
        'What problem does React Context solve?',
        'Какую проблему решает React Context?'
      ),
      options: [
        L('Storing state that no component reads', 'Хранение состояния, которое никто не читает'),
        L('Replacing props completely', 'Полную замену пропсов'),
        L(
          'Passing a value deep in the tree without threading it through every intermediate component',
          'Передачу значения глубоко по дереву без прокидывания его через каждую промежуточную компоненту'
        ),
        L('Preventing components from re-rendering', 'Предотвращение перерисовок компонентов'),
      ],
      correctIndex: 2,
      explanation: L(
        'Context removes prop drilling, the chain of components that only pass a value down. The price is that every consumer re-renders when the value changes, so a context that changes often is worth splitting into several smaller ones.',
        'Context убирает prop drilling, то есть цепочку компонентов, которые только передают значение вниз. Цена в том, что каждый потребитель перерисовывается при изменении значения, поэтому часто меняющийся контекст стоит разделить на несколько меньших.'
      ),
    },
    {
      id: 'react-q31',
      question: L(
        'When do components that call useContext re-render?',
        'Когда перерисовываются компоненты, вызывающие useContext?'
      ),
      options: [
        L('On every render of the whole application', 'При каждом рендере всего приложения'),
        L('When the value provided by the Provider changes', 'Когда значение, которое даёт Provider, меняется'),
        L('Only when the context object itself is created again', 'Только когда заново создаётся сам объект контекста'),
        L('Never, the consumers of a context are static', 'Никогда, потребители контекста статичны'),
      ],
      correctIndex: 1,
      explanation: L(
        'React compares the value of the provider with the previous one and re-renders the consumers when it differs. A new object literal in the provider is a new value on every render, which is why the value is usually memoized with useMemo.',
        'React сравнивает значение провайдера с предыдущим и перерисовывает потребителей, когда оно отличается. Новый объектный литерал в провайдере — это новое значение при каждом рендере, поэтому значение обычно мемоизируют через useMemo.'
      ),
    },
    {
      id: 'react-q32',
      question: L(
        'How do you stop one changing context value from re-rendering unrelated consumers?',
        'Как не дать одному меняющемуся значению контекста перерисовывать посторонних потребителей?'
      ),
      options: [
        L('Wrap every consumer in React.memo', 'Обернуть каждого потребителя в React.memo'),
        L('Store the value in a module-level variable', 'Хранить значение в переменной уровня модуля'),
        L('Replace the context with useLayoutEffect', 'Заменить контекст на useLayoutEffect'),
        L('Split the context into several smaller ones and memoise the value object', 'Разделить контекст на несколько меньших и мемоизировать объект значения'),
      ],
      correctIndex: 3,
      explanation: L(
        'Every consumer of a context re-renders when the value changes, so one frequently changing value drags the whole tree along with it. Splitting the state into several contexts lets each consumer subscribe only to the part it needs.',
        'Каждый потребитель контекста перерисовывается при изменении значения, поэтому одно часто меняющееся значение тянет за собой всё дерево. Разделение состояния на несколько контекстов позволяет каждому потребителю подписаться только на нужную часть.'
      ),
    },
    {
      id: 'react-q33',
      question: L(
        'What can the use hook do that useState cannot?',
        'Что умеет хук use, чего не умеет useState?'
      ),
      options: [
        L(
          'It can be called conditionally and it can read a promise or a context inside a component',
          'Его можно вызывать условно, и он умеет читать промис или контекст внутри компонента'
        ),
        L('It can store a value without causing a re-render', 'Он умеет хранить значение без вызова перерисовки'),
        L('It can be called outside of a component', 'Его можно вызывать вне компонента'),
        L('It can replace the dependency array of an effect', 'Он умеет заменять массив зависимостей эффекта'),
      ],
      correctIndex: 0,
      explanation: L(
        'use unwraps a promise or reads a context, and unlike the other hooks it may be called conditionally. It cannot be used inside an effect or an event handler, and the value it produces cannot be passed around as a plain value.',
        'use разворачивает промис или читает контекст, и в отличие от остальных хуков его можно вызывать условно. Его нельзя использовать внутри эффекта или обработчика события, а полученное значение нельзя передать как обычное значение.'
      ),
    },
    {
      id: 'react-q34',
      question: L(
        'Where may a hook be called?',
        'Где можно вызывать хук?'
      ),
      options: [
        L('Anywhere, including inside conditions and loops', 'Везде, в том числе внутри условий и циклов'),
        L('Only at the top level of a React component or of another hook', 'Только на верхнем уровне React-компонента или другого хука'),
        L('Only inside the body of an effect', 'Только внутри тела эффекта'),
        L('Only inside event handlers', 'Только внутри обработчиков событий'),
      ],
      correctIndex: 1,
      explanation: L(
        'React identifies hooks by the order of their calls and not by their names, so a hook has to sit at the top level of a component or of a custom hook. The lint rule exists because a conditional hook silently breaks that order.',
        'React опознаёт хуки по порядку вызовов, а не по именам, поэтому хук должен стоять на верхнем уровне компонента или кастомного хука. Правило линтера существует именно потому, что условный хук молча ломает этот порядок.'
      ),
    },
    {
      id: 'react-q35',
      question: L(
        'Why must a hook never be called inside a condition or a loop?',
        'Почему хук нельзя вызывать внутри условия или цикла?'
      ),
      options: [
        L('Hooks are slower inside conditions', 'Хуки работают медленнее внутри условий'),
        L('It is only a style recommendation', 'Это только рекомендация по стилю'),
        L('React matches hooks by call order, so the order has to be the same on every render', 'React сопоставляет хуки по порядку вызовов, поэтому порядок должен быть одинаковым при каждом рендере'),
        L('Conditions are not allowed inside components', 'Условия запрещены внутри компонентов'),
      ],
      correctIndex: 2,
      explanation: L(
        'React keeps an array of hook states and addresses it by the call order. If the number of hooks changes between renders, the state of one hook is handed over to another, and the mistake surfaces much later as an impossible value.',
        'React хранит массив состояний хуков и обращается к нему по порядку вызовов. Если число хуков меняется между рендерами, состояние одного хука попадает к другому, и ошибка всплывает намного позже как невозможное значение.'
      ),
    },
    {
      id: 'react-q36',
      question: L(
        'In a controlled input, where does the displayed value come from?',
        'В контролируемом поле ввода откуда берётся отображаемое значение?'
      ),
      options: [
        L('From React state', 'Из состояния React'),
        L('From the DOM, read at submit time', 'Из DOM, прочитанного при отправке'),
        L('From the query string of the URL', 'Из строки запроса URL'),
        L('From the browser cache', 'Из кэша браузера'),
      ],
      correctIndex: 0,
      explanation: L(
        'In a controlled input the value prop and the state are the single source of truth, and onChange writes the new value back into the state. Every keystroke therefore produces a render, which is fine for a short form and too expensive for a large one.',
        'В контролируемом поле источником истины являются проп value и состояние, а onChange записывает новое значение обратно в состояние. Каждое нажатие клавиши значит перерисовку, что нормально для короткой формы и слишком дорого для большой.'
      ),
    },
    {
      id: 'react-q37',
      question: L(
        'How do you read the value of an uncontrolled input?',
        'Как прочитать значение неконтролируемого поля ввода?'
      ),
      options: [
        L('Through React state, updated on every keystroke', 'Через состояние React, обновляемое на каждом нажатии клавиши'),
        L('By calling the setter inside onChange', 'Вызовом сеттера внутри onChange'),
        L('Through a ref, or from the FormData of the submit event', 'Через ref или из FormData события отправки'),
        L('Through the props of the component', 'Через пропсы компонента'),
      ],
      correctIndex: 2,
      explanation: L(
        'In an uncontrolled input the DOM keeps the value and React does not re-render on every keystroke. The value is read when it is really needed, through the ref or through FormData on submit, which makes uncontrolled forms the cheaper option for large forms.',
        'В неконтролируемом поле значение хранит DOM, и React не перерисовывается на каждом нажатии клавиши. Значение читают, когда оно действительно нужно, — через ref или через FormData при отправке, поэтому для больших форм неконтролируемый вариант дешевле.'
      ),
    },
    {
      id: 'react-q38',
      question: L(
        'What does React Compiler change about memoization?',
        'Что меняет React Compiler в части мемоизации?'
      ),
      options: [
        L('It removes the need for React.memo', 'Он убирает необходимость в React.memo'),
        L(
          'It applies memoization automatically, so manual useMemo and useCallback are often unnecessary',
          'Он применяет мемоизацию автоматически, поэтому ручные useMemo и useCallback часто не нужны'
        ),
        L('It makes the production build faster than the development build', 'Он делает продакшен-сборку быстрее дев-сборки'),
        L('It forbids the use of useMemo in a component', 'Он запрещает использовать useMemo в компоненте'),
      ],
      correctIndex: 1,
      explanation: L(
        'The compiler analyses the component and inserts the memoization itself, which removes most of the manual work and the bugs that come from unstable dependency arrays. Manual useMemo still works, but the compiler drops it when it is not needed.',
        'Компилятор анализирует компонент и расставляет мемоизацию сам, что снимает почти всю ручную работу и ошибки из-за нестабильных массивов зависимостей. Ручной useMemo по-прежнему работает, но компилятор убирает его там, где он не нужен.'
      ),
    },
    {
      id: 'react-q39',
      question: L(
        'Why call preventDefault inside the submit handler of a form?',
        'Зачем вызывать preventDefault в обработчике отправки формы?'
      ),
      options: [
        L('To keep the focus inside the first field', 'Чтобы фокус остался в первом поле'),
        L('To clear the validation messages of the browser', 'Чтобы очистить сообщения валидации браузера'),
        L('To make the form submit with fetch instead of the browser', 'Чтобы форма отправлялась через fetch, а не браузером'),
        L('To stop the browser default submission, which would reload the page', 'Чтобы остановить стандартную отправку браузера, которая перезагрузила бы страницу'),
      ],
      correctIndex: 3,
      explanation: L(
        'A submit event without preventDefault makes the browser navigate away and reload the page. Calling it inside the handler keeps the page in place, so the data can be sent with fetch or to a server action.',
        'Событие отправки без preventDefault заставляет браузер уйти со страницы и перезагрузить её. Вызов внутри обработчика оставляет страницу на месте, и данные можно отправить через fetch или в server action.'
      ),
    },
    {
      id: 'react-q40',
      question: L(
        'How do you make a screen reader announce an error that belongs to a specific field?',
        'Как заставить скринридер объявить ошибку, относящуюся к конкретному полю?'
      ),
      options: [
        L(
          'Render the message with role="alert" and point the input at it with aria-describedby',
          'Отрисовать сообщение с role="alert" и указать на него через aria-describedby у поля ввода'
        ),
        L('Give the input a red border and rely on the colour', 'Оставить красную рамку у поля и положиться на цвет'),
        L('Put the error text into the placeholder of the input', 'Поместить текст ошибки в placeholder поля'),
        L('Throw the error and let an error boundary render it', 'Бросить ошибку и позволить границе ошибок её отрисовать'),
      ],
      correctIndex: 0,
      explanation: L(
        'The role alert makes the message announce itself as soon as it appears, and aria-describedby ties it to the input so the screen reader reads the error right after the name of the field. The placeholder disappears as soon as the user types, so it cannot carry an error.',
        'Роль alert заставляет сообщение объявить себя сразу при появлении, а aria-describedby связывает его с полем, так что скринридер читает ошибку сразу после имени поля. Placeholder исчезает, как только пользователь начинает печатать, поэтому ошибку он нести не может.'
      ),
    },
    {
      id: 'react-q41',
      question: L(
        'What does React.memo compare to decide whether to skip a re-render?',
        'Что сравнивает React.memo, чтобы решить, пропускать ли перерисовку?'
      ),
      options: [
        L('The props deeply, field by field', 'Пропсы глубоко, поле за полем'),
        L('The props and the state of the component', 'Пропсы и состояние компонента'),
        L('The props, one level deep', 'Пропсы на один уровень вглубь'),
        L('The produced markup, before it is sent to the DOM', 'Сгенерированную разметку, до отправки в DOM'),
      ],
      correctIndex: 2,
      explanation: L(
        'memo does a shallow comparison of the props with Object.is, so a new object literal on every render defeats it just as a changed primitive does. It is a tool for expensive subtrees that receive stable props, not a default for every component.',
        'memo делает поверхностное сравнение пропсов через Object.is, поэтому новый объектный литерал при каждом рендере ломает его так же, как изменившийся примитив. Это инструмент для дорогих поддеревьев со стабильными пропсами, а не правило по умолчанию.'
      ),
    },
    {
      id: 'react-q42',
      question: L(
        'What does useMemo cache?',
        'Что кэширует useMemo?'
      ),
      options: [
        L('The state of the component between renders', 'Состояние компонента между рендерами'),
        L(
          'The result of a computation, which is recalculated only when the dependencies change',
          'Результат вычисления, который пересчитывается только при изменении зависимостей'
        ),
        L('A reference to a DOM node', 'Ссылку на DOM-узел'),
        L('The props of the component', 'Пропсы компонента'),
      ],
      correctIndex: 1,
      explanation: L(
        'useMemo keeps a value between renders so that an expensive calculation runs again only when its inputs change. It pays off for a genuinely expensive calculation or where the identity of the value has to stay stable, for example as a dependency of an effect.',
        'useMemo сохраняет значение между рендерами, так что дорогое вычисление выполняется заново только при изменении его входных данных. Это окупается при действительно дорогом вычислении или там, где важна стабильность идентичности значения, например как зависимости эффекта.'
      ),
    },
    {
      id: 'react-q43',
      question: L(
        'What does useCallback give you?',
        'Что даёт useCallback?'
      ),
      options: [
        L('A function that runs only once for the whole life of the component', 'Функцию, которая выполняется один раз за всю жизнь компонента'),
        L('A function that runs after the browser has painted', 'Функцию, которая выполняется после отрисовки браузером'),
        L('A memoised version of the component', 'Мемоизированную версию компонента'),
        L(
          'A function whose identity stays the same between renders, as long as its dependencies do not change',
          'Функцию, чья идентичность сохраняется между рендерами, пока не меняются её зависимости'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The function is recreated on every render, but useCallback hands back the previous one when the dependencies are unchanged. That stable identity is what lets the function serve as a dependency of an effect or as a prop of a memoised child.',
        'Функция создаётся заново при каждом рендере, но useCallback возвращает предыдущую, если зависимости не изменились. Именно эта стабильная идентичность позволяет использовать функцию как зависимость эффекта или как проп мемоизированного ребёнка.'
      ),
    },
    {
      id: 'react-q44',
      question: L(
        'What does useSyncExternalStore protect against?',
        'От чего защищает useSyncExternalStore?'
      ),
      options: [
        L(
          'Tearing, the situation where two components render the same external store and see different values',
          'От tearing, ситуации, когда два компонента читают одно внешнее хранилище и видят разные значения'
        ),
        L('Memory leaks in effects', 'От утечек памяти в эффектах'),
        L('Stale closures in callbacks', 'От устаревших замыканий в колбэках'),
        L('Unnecessary re-renders of memoised children', 'От лишних перерисовок мемоизированных детей'),
      ],
      correctIndex: 0,
      explanation: L(
        'An external store can change while React is rendering, and without the hook two components can see different versions of the same value. useSyncExternalStore subscribes to the store and checks it again when the render is committed, so the values stay consistent.',
        'Внешнее хранилище может измениться прямо во время рендера, и без этого хука два компонента увидят разные версии одного значения. useSyncExternalStore подписывается на хранилище и проверяет его ещё раз при фиксации рендера, поэтому значения остаются согласованы.'
      ),
    },
    {
      id: 'react-q45',
      question: L(
        'What does startTransition do?',
        'Что делает startTransition?'
      ),
      options: [
        L('It cancels the render that is already in progress', 'Он отменяет уже идущий рендер'),
        L(
          'It marks the update inside it as non-urgent, so React can keep the interface responsive and prepare the new result in the background',
          'Он помечает обновление внутри как несрочное, чтобы React мог держать интерфейс отзывчивым и готовить новый результат в фоне'
        ),
        L('It performs the update synchronously, before the paint', 'Он выполняет обновление синхронно, до отрисовки'),
        L('It stores the state in localStorage', 'Он сохраняет состояние в localStorage'),
      ],
      correctIndex: 1,
      explanation: L(
        'A transition does not make the work faster, it makes it interruptible: if the user types again, React drops the unfinished background render and starts a new one. The isPending flag tells the application that the work is running, and it is the right place for a spinner.',
        'Переход не делает работу быстрее, он делает её прерываемой: если пользователь печатает снова, React отбрасывает незаконченный фоновый рендер и начинает новый. Флаг isPending сообщает приложению, что работа идёт, и это правильное место для спиннера.'
      ),
    },
    {
      id: 'react-q46',
      question: L(
        'How does useDeferredValue help a search field?',
        'Как useDeferredValue помогает полю поиска?'
      ),
      options: [
        L('It adds a delay before the input value is applied', 'Он добавляет задержку, прежде чем значение ввода применится'),
        L('It caches the result of the last search', 'Он кэширует результат последнего поиска'),
        L(
          'It returns the previous value while React prepares the new one, so the input stays responsive',
          'Он возвращает предыдущее значение, пока React готовит новое, поэтому поле остаётся отзывчивым'
        ),
        L('It moves the expensive calculation into a web worker', 'Он переносит дорогое вычисление в веб-воркер'),
      ],
      correctIndex: 2,
      explanation: L(
        'The hook wraps a single value instead of an update, so it fits a slow computation that reads one value, such as filtering a long list. The input keeps the current value and the list uses the deferred one, and comparing the two tells the application that the results are behind.',
        'Хук оборачивает одно значение, а не обновление, поэтому он подходит для медленного вычисления, читающего одно значение, например для фильтрации длинного списка. Поле держит текущее значение, список использует отложенное, а сравнение двух значений показывает, что результаты отстают.'
      ),
    },
    {
      id: 'react-q47',
      question: L(
        'What does a component loaded with React.lazy need?',
        'Что нужно компоненту, загруженному через React.lazy?'
      ),
      options: [
        L('A router', 'Роутер'),
        L('An error boundary and nothing else', 'Только границу ошибок'),
        L('A server-side render', 'Серверный рендер'),
        L('A Suspense boundary above it, which shows the fallback while the code is loading', 'Границу Suspense над собой, которая показывает заглушку, пока код грузится'),
      ],
      correctIndex: 3,
      explanation: L(
        'lazy splits the code of a component into a separate chunk that is downloaded on demand. While the chunk is loading the component suspends, and the nearest Suspense boundary shows its fallback, which is why a lazy component always needs one above it.',
        'lazy выносит код компонента в отдельный чанк, который скачивается по требованию. Пока чанк грузится, компонент приостанавливается, и ближайшая граница Suspense показывает заглушку, поэтому lazy-компоненту такая граница нужна всегда.'
      ),
    },
    {
      id: 'react-q48',
      question: L(
        'What does a virtualized list render?',
        'Что рендерит виртуализированный список?'
      ),
      options: [
        L('Only the rows that are visible, plus a small buffer around them', 'Только видимые строки плюс небольшой буфер вокруг них'),
        L('All rows, hidden with CSS', 'Все строки, скрытые через CSS'),
        L('All rows, rendered as plain text', 'Все строки, отрисованные как обычный текст'),
        L('One row per page of the list', 'По одной строке на страницу списка'),
      ],
      correctIndex: 0,
      explanation: L(
        'A virtualized list keeps the height of the whole list in a spacer but renders only the visible rows, so a list of ten thousand items costs about a dozen DOM nodes. The scroll position decides what is rendered, and the offset is applied with a transform.',
        'Виртуализированный список держит всю высоту в распорке, но рисует только видимые строки, поэтому список из десяти тысяч элементов стоит около дюжины DOM-узлов. Позиция прокрутки решает, что рисовать, а сдвиг задаётся через transform.'
      ),
    },
    {
      id: 'react-q49',
      question: L(
        'Which errors does an error boundary catch?',
        'Какие ошибки ловит граница ошибок?'
      ),
      options: [
        L('Errors in event handlers and in asynchronous callbacks', 'Ошибки в обработчиках событий и в асинхронных колбэках'),
        L(
          'Errors thrown while rendering the subtree below it, in its lifecycle methods and in its constructors',
          'Ошибки, брошенные при рендере поддерева под ней, в его методах жизненного цикла и в его конструкторах'
        ),
        L('Only errors that come from the network', 'Только ошибки, пришедшие из сети'),
        L('Every error in the whole application', 'Все ошибки во всём приложении'),
      ],
      correctIndex: 1,
      explanation: L(
        'An error boundary is a class component that catches the render errors of its descendants and shows a fallback instead of an unmounted tree. It never catches errors in event handlers, in promises or in its own code, so those need separate handling.',
        'Граница ошибок — это класс-компонент, который ловит ошибки рендера своих потомков и показывает заглушку вместо размонтированного дерева. Она никогда не ловит ошибки в обработчиках событий, в промисах и в собственном коде, поэтому их обрабатывают отдельно.'
      ),
    },
    {
      id: 'react-q50',
      question: L(
        'Why is an error boundary written as a class component?',
        'Почему граница ошибок пишется как класс-компонент?'
      ),
      options: [
        L('Class components render faster than function components', 'Классы рендерятся быстрее функциональных компонентов'),
        L('Hooks cannot hold an error in their state', 'Хуки не могут хранить ошибку в состоянии'),
        L(
          'It relies on the static method getDerivedStateFromError, which hooks do not provide',
          'Она опирается на статический метод getDerivedStateFromError, которого у хуков нет'
        ),
        L('Only a class component is allowed to render a fallback', 'Только класс-компонент имеет право рисовать заглушку'),
      ],
      correctIndex: 2,
      explanation: L(
        'React calls getDerivedStateFromError while rendering the failed subtree and hands the error to the boundary, and there is no hook equivalent of that lifecycle. The instance method componentDidCatch is used to log the error, and resetting the state renders the children again.',
        'React вызывает getDerivedStateFromError при рендере упавшего поддерева и передаёт ошибку границе, а хука-аналога этой жизни нет. Экземплярный метод componentDidCatch используется для логирования, а сброс состояния снова рисует потомков.'
      ),
    },
    {
      id: 'react-q51',
      question: L(
        'Why does React hand a synthetic event to your handler instead of the native browser event?',
        'Почему React передаёт в обработчик синтетическое событие, а не нативное событие браузера?'
      ),
      options: [
        L(
          'It normalizes the differences between browsers and gives one consistent interface',
          'Он нормализует различия между браузерами и даёт единый интерфейс'
        ),
        L('It makes the event object immutable, so a handler cannot change it', 'Он делает объект события неизменяемым, чтобы обработчик не мог его изменить'),
        L('It queues the event and delivers it after the render is finished', 'Он ставит событие в очередь и доставляет его после завершения рендера'),
        L('It copies the native event so that the browser can release the original immediately', 'Он копирует нативное событие, чтобы браузер мог сразу освободить оригинал'),
      ],
      correctIndex: 0,
      explanation: L(
        'React wraps the native event in its own SyntheticEvent, which hides the differences between browsers and offers the same API everywhere. The price is that the handler receives a React wrapper, so a handler that expects a DOM node has to read target or currentTarget.',
        'React оборачивает нативное событие в свой SyntheticEvent, который прячет различия между браузерами и даёт одинаковый API везде. Плата в том, что обработчик получает обёртку React, поэтому обработчику, ожидающему DOM-узел, приходится читать target или currentTarget.'
      ),
    },
    {
      id: 'react-q52',
      question: L(
        'What can a React Server Component not do?',
        'Чего не может делать React Server Component?'
      ),
      options: [
        L('Read data from a database', 'Читать данные из базы данных'),
        L('Be an async function', 'Быть async-функцией'),
        L('Render without shipping any JavaScript to the browser', 'Рендериться, не отправляя в браузер ни байта JavaScript'),
        L('Use useState and the other client-side state hooks', 'Использовать useState и другие клиентские хуки состояния'),
      ],
      correctIndex: 3,
      explanation: L(
        'A server component runs on the server and produces HTML, so it has no state, no effects and no event handlers. Anything that needs the browser has to live in a client component, which is marked with the "use client" directive.',
        'Серверный компонент выполняется на сервере и производит HTML, поэтому у него нет состояния, эффектов и обработчиков событий. Всё, что требует браузера, живёт в клиентском компоненте, помеченном директивой "use client".'
      ),
    },
    {
      id: 'react-q53',
      question: L(
        'Where should the "use client" directive be placed?',
        'Где нужно размещать директиву "use client"?'
      ),
      options: [
        L('In the root layout, to turn the whole application into a client application', 'В корневом layout, чтобы превратить всё приложение в клиентское'),
        L('Inside the body of the component that needs it', 'Внутри тела компонента, которому она нужна'),
        L(
          'At the top of the file of the component that really needs browser features, so that the rest of the tree stays on the server',
          'В начале файла того компонента, которому действительно нужны возможности браузера, чтобы остальное дерево осталось на сервере'
        ),
        L('In the package.json of the project', 'В package.json проекта'),
      ],
      correctIndex: 2,
      explanation: L(
        'The directive marks a boundary: everything below it in the tree is sent to the browser and becomes a client component. Placing it as deep as possible keeps the bundle small, because a client component cannot import a server component.',
        'Директива отмечает границу: всё ниже неё в дереве отправляется в браузер и становится клиентским. Чем глубже она стоит, тем меньше бандл, потому что клиентский компонент не может импортировать серверный.'
      ),
    },
    {
      id: 'react-q54',
      question: L(
        'What happens during hydration?',
        'Что происходит во время гидратации?'
      ),
      options: [
        L('The server HTML is thrown away and rebuilt from scratch in the browser', 'HTML с сервера выбрасывается и полностью перестраивается в браузере'),
        L(
          'React attaches its event handlers to the server-rendered HTML and matches it with the client tree',
          'React навешивает обработчики на отрисованный сервером HTML и сопоставляет его с клиентским деревом'
        ),
        L('The browser turns the HTML into a virtual DOM on its own', 'Браузер сам превращает HTML в виртуальный DOM'),
        L('The server sends the whole state and React replaces the page', 'Сервер отправляет всё состояние, и React заменяет страницу'),
      ],
      correctIndex: 1,
      explanation: L(
        'Hydration reuses the markup the server already sent and makes it interactive. The markup of the first client render has to match the server output exactly, otherwise React reports a hydration mismatch and re-renders the tree.',
        'Гидратация использует разметку, которую сервер уже прислал, и делает её интерактивной. Разметка первого клиентского рендера должна в точности совпадать с серверной, иначе React сообщает о несовпадении при гидратации и перерисовывает дерево.'
      ),
    },
    {
      id: 'react-q55',
      question: L(
        'What does StrictMode do in the development build?',
        'Что делает StrictMode в dev-сборке?'
      ),
      options: [
        L(
          'It double-invokes render functions and effects to surface impure code and missing cleanup',
          'Он дважды вызывает функции рендера и эффекты, чтобы выявлять нечистый код и отсутствующую очистку'
        ),
        L('It removes all warnings from the console', 'Он убирает все предупреждения из консоли'),
        L('It makes the application run in production mode', 'Он переводит приложение в продакшен-режим'),
        L('It forbids the use of useEffect', 'Он запрещает использовать useEffect'),
      ],
      correctIndex: 0,
      explanation: L(
        'The extra run is not a bug in React but a deliberate probe: an effect that starts a request sends it twice, and an effect without a cleanup shows the leak right away. Code that survives the double run is usually correct.',
        'Двойной запуск — не баг React, а намеренная проверка: эффект, запускающий запрос, отправит его дважды, а эффект без очистки сразу покажет утечку. Код, переживший двойной запуск, обычно написан верно.'
      ),
    },
  ],
};
