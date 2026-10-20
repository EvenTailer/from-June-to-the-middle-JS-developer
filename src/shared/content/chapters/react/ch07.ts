import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh07: Chapter = {
  id: 'react-ch7',
  title: L('Context', 'Контекст'),
  summary: L(
    'How a context carries a value down the tree, why the identity of the provider value decides when consumers re-render, how to split contexts by update frequency, when composition is the better tool, and how to read a context inside a custom hook.',
    'Как контекст передаёт значение вниз по дереву, почему идентичность значения провайдера определяет, когда перерендерятся потребители, как делить контексты по частоте обновлений, когда композиция лучше и как читать контекст внутри кастомного хука.'
  ),
  sections: [
    {
      id: 'react-ch7-s1',
      title: L('Creating and reading context', 'Создание и чтение контекста'),
      body: L(
        'A context is a named channel through which a value reaches every component below a provider without being passed as a prop. You create it with createContext, which returns a provider component and a reader: const ThemeContext = createContext("light") gives you <ThemeContext.Provider value={theme}> and useContext(ThemeContext). The provider must be rendered as a component, and the value lives in its value prop.\n\nAny component rendered under that provider, at any depth, can read the value, and the read does not follow the source structure: what matters is the position in the rendered tree. A reader gets the value of the closest provider above it, so providers nest and an inner provider shadows an outer one for its own subtree. The component that reads the context does not have to be a descendant of the provider in your source files, it has to be a descendant in the tree that React actually renders.\n\nThe default value passed to createContext is used only when there is no provider above the reader. It is not a fallback for a broken provider: if a provider exists but renders nothing or throws, the default does not appear. Keep the default neutral, an empty array or a no-op function, so a component rendered in a test without any provider still behaves predictably.\n\nWhere the context object lives matters more than it looks. A module-level context is shared by every component that imports it, which is exactly what you want for a theme or a locale. A context created inside a component function is a new object on every render, so every consumer below it reads a different context, its value is ignored, and useContext returns the default instead. Contexts are module-level constants and should be created once.',
        'Контекст — именованный канал, по которому значение доходит до любого компонента под провайдером, не передаваясь пропом. Создаётся он через createContext, который возвращает и компонент-провайдер, и способ чтения: const ThemeContext = createContext("light") даёт нам <ThemeContext.Provider value={theme}> и useContext(ThemeContext). Провайдер должен рендериться как компонент, а значение живёт в его пропе value.\n\nЛюбой компонент, отрисованный под провайдером, на любой глубине может прочитать значение, и чтение это не следует по структуре исходников: важна позиция в отрисованном дереве. Читатель получает значение ближайшего провайдера над собой, поэтому провайдеры вкладываются, и внутренний перекрывает внешний для своего поддерева. Компонент, читающий контекст, не обязан быть потомком провайдера в исходниках — он должен быть потомком в дереве, которое React действительно рисует.\n\nЗначение по умолчанию, переданное в createContext, используется только тогда, когда над читателем нет провайдера. Это не запасной вариант для сломанного провайдера: если провайдер есть, но ничего не отрисовывает или падает, значение по умолчанию не появится. Держите значение по умолчанию нейтральным — пустой массив или функция-заглушка, — чтобы компонент, отрисованный в тесте без провайдера, вёл себя предсказуемо.\n\nТо, где живёт объект контекста, важнее, чем кажется. Контекст на уровне модуля разделяется всеми компонентами, которые его импортируют, и именно это нужно для темы или локали. Контекст, созданный внутри функции компонента, — новый объект при каждом рендере, поэтому любой потребитель под ним читает другой контекст, его значение игнорируется, а useContext возвращает значение по умолчанию. Контексты — это константы уровня модуля, и создавать их нужно один раз.'
      ),
      bullets: [
        L('createContext returns a provider and a reader hook.', 'createContext возвращает провайдер и хук для чтения.'),
        L('useContext reads the value of the nearest provider above.', 'useContext читает значение ближайшего провайдера выше.'),
        L('The default value applies only when no provider exists.', 'Значение по умолчанию действует, только когда провайдера нет.'),
        L('A context created inside a component is recreated on every render.', 'Контекст, созданный внутри компонента, пересоздаётся при каждом рендере.'),
        L('Context travels down the rendered tree, not the source tree.', 'Контекст распространяется по отрисованному дереву, а не по исходному.'),
        L('Providers can be nested, and the inner one wins for its subtree.', 'Провайдеры вкладываются, и для своего поддерева побеждает внутренний.'),
      ],
      code: `import { createContext, useContext, useState } from 'react';

// Module level, never inside a component
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      {children}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        theme: {theme}
      </button>
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Send</button>;
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The context created inside a component', 'Контекст, созданный внутри компонента'),
          text: L(
            'A context created in the body of a function component is a different object on every render. Consumers see a context they have never been given, so they fall back to the default value, and the provider appears to do nothing.',
            'Контекст, созданный в теле функционального компонента, — разный объект при каждом рендере. Потребители видят контекст, который им никогда не передавали, поэтому получают значение по умолчанию, а провайдер выглядит бесполезным.'
          ),
        },
        {
          tone: 'note',
          title: L('useContext is a hook', 'useContext — это хук'),
          text: L(
            'Reading a context is a hook call, so it must sit at the top level of a component or a custom hook. Calling it inside a condition or a loop changes the order of the hooks and breaks the state slots.',
            'Чтение контекста — вызов хука, поэтому он должен находиться на верхнем уровне компонента или кастомного хука. Вызов внутри условия или цикла меняет порядок хуков и ломает слоты состояния.'
          ),
        },
      ],
      takeaway: L(
        'Create the context once at module level, read it with useContext, and treat the default as a neutral value rather than a fallback.',
        'Создавайте контекст один раз на уровне модуля, читайте через useContext, а значение по умолчанию считайте нейтральным, а не запасным.'
      ),
      seeAlso: [
        L('Section 7-2: provider value identity and re-renders', 'Секция 7-2: идентичность значения провайдера и перерендеры'),
        L('Section 7-5: useContext inside custom hooks', 'Секция 7-5: useContext внутри кастомных хуков'),
      ],
    },
    {
      id: 'react-ch7-s2',
      title: L('Provider value identity and re-renders', 'Идентичность значения провайдера и перерендеры'),
      body: L(
        'React decides whether a context consumer must re-render by comparing the provider value with the previous one using Object.is. Identity is the whole test. A primitive such as a string or a number compares by value, so a provider that publishes the same string does not wake its consumers up. An object or a function compares by reference, so a provider that writes value={{ user, theme }} on every render hands out a new object every time and every consumer of that context re-renders, whether or not the fields inside it changed.\n\nThis is the most common performance complaint about context, and the fix is to keep the value identity stable. Wrap the object in useMemo and list the real dependencies: const value = useMemo(() => ({ user, theme }), [user, theme]). Now the provider still re-renders on every keystroke, but the value it publishes only changes when user or theme changes, and the consumers stay still.\n\nBe precise about what a context update does. When the value changes, React re-renders the components that consume that context, and that is the whole guarantee: it is not a targeted update, and it is not "the component that reads theme re-renders". Every consumer of the context re-renders, including one that reads a single field, because the hook hands it the whole value.\n\nA provider re-render also re-renders its children, because the children are its props and the elements are recreated. Memoising the value does not stop that, it only stops the propagation through the context. If the subtree is expensive, the fix is to split the context so that the rarely changing part has its own channel, or to memoise the children.',
        'React решает, нужно ли перерендерить потребителя контекста, сравнивая значение провайдера с предыдущим через Object.is. Идентичность — это весь тест. Примитив вроде строки или числа сравнивается по значению, поэтому провайдер, публикующий ту же строку, потребителей не будит. Объект или функция сравниваются по ссылке, поэтому провайдер, который на каждом рендере пишет value={{ user, theme }}, выдаёт новый объект каждый раз, и все потребители этого контекста перерендеряются независимо от того, изменились ли поля внутри.\n\nЭто самая частая жалоба на производительность контекста, и лечится она стабильностью идентичности значения. Оберните объект в useMemo и перечислите настоящие зависимости: const value = useMemo(() => ({ user, theme }), [user, theme]). Теперь провайдер по-прежнему перерендеривается на каждый символ, но публикуемое значение меняется только при изменении user или theme, и потребители остаются на месте.\n\nТочнее сформулируйте, что делает обновление контекста. Когда значение меняется, React перерендеривает компоненты, которые потребляют этот контекст, и это вся гарантия: это не точечное обновление и не «перерендерится компонент, читающий theme». Перерендериваются все потребители контекста, включая того, кто читает одно поле, потому что хук отдаёт им всё значение целиком.\n\nПеререндер провайдера перерендеривает и его детей, потому что дети — это его пропы, а элементы создаются заново. Мемоизация значения этого не останавливает, она лишь прекращает распространение через контекст. Если поддерево дорогое, решение — разделить контекст так, чтобы редко меняющаяся часть получила свой канал, либо мемоизировать детей.'
      ),
      bullets: [
        L('Consumers re-render when the provider value changes by Object.is.', 'Потребители перерендеряются, когда значение провайдера меняется по Object.is.'),
        L('A fresh object literal on every render breaks memoisation.', 'Новый объектный литерал при каждом рендере ломает мемоизацию.'),
        L('useMemo with the real dependencies keeps the value identity stable.', 'useMemo с настоящими зависимостями сохраняет идентичность значения.'),
        L('A context update re-renders every consumer of that context.', 'Обновление контекста перерендеряет всех его потребителей.'),
        L('A provider re-render also re-renders its children.', 'Перерендер провайдера перерендеряет и его детей.'),
        L('Memoising the value does not memoise the children.', 'Мемоизация значения не мемоизирует детей.'),
      ],
      code: `function AppProvider({ user, theme, children }) {
  // Without useMemo this object is new on every render,
  // so every consumer re-renders on every parent update.
  const value = useMemo(() => ({ user, theme }), [user, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function UserBadge() {
  const { user } = useContext(AppContext);
  return <span>{user.name}</span>;
}`,
      table: {
        caption: L('What wakes a consumer up', 'Что будит потребителя'),
        headers: [L('Change', 'Изменение'), L('Consumers re-render?', 'Перерендерят ли потребители?'), L('Why', 'Почему')],
        rows: [
          [L('The value is the same string', 'Значение — та же строка'), L('No', 'Нет'), L('Object.is finds no change', 'Object.is не находит изменений')],
          [L('The value is a new object', 'Значение — новый объект'), L('Yes', 'Да'), L('New reference, Object.is is false', 'Новая ссылка, Object.is ложно')],
          [L('The value is memoised', 'Значение мемоизировано'), L('Only when a dependency changes', 'Только при изменении зависимости'), L('The identity survives unrelated renders', 'Идентичность переживает посторонние рендеры')],
          [L('The provider re-renders', 'Провайдер перерендерился'), L('Children re-render unless memoised', 'Дети перерендерятся, если не мемоизированы'), L('Children are props of the provider', 'Дети — это пропы провайдера')],
          [L('A consumer reads one field', 'Потребитель читает одно поле'), L('Still re-renders', 'Всё равно перерендерится'), L('The hook returns the whole value', 'Хук отдаёт значение целиком')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The inline object as a value', 'Объектный литерал как значение'),
          text: L(
            'value={{ user, theme }} looks like a small optimisation detail, but it publishes a new object on every render of the provider, and every consumer re-renders with it. Build the object once per change of its fields.',
            'value={{ user, theme }} кажется мелочью, но публикует новый объект при каждом рендере провайдера, и вместе с ним перерендериваются все потребители. Собирайте объект один раз на каждое изменение его полей.'
          ),
        },
        {
          tone: 'tip',
          title: L('Depend on values, not on the object', 'Зависитесь от значений, а не от объекта'),
          text: L(
            'When you memoise a context value, list the primitive fields in the dependency array. Listing the parent object instead re-creates the value whenever that object changes, even if the fields you publish did not.',
            'Когда мемоизируете значение контекста, перечисляйте в зависимостях примитивные поля. Если вместо них указать родительский объект, значение пересоздастся при любом изменении объекта, даже если публикуемые поля не изменились.'
          ),
        },
      ],
      takeaway: L(
        'Keep the context value referentially stable with useMemo, or every provider render becomes a consumer render.',
        'Держите значение контекста стабильным по ссылке через useMemo, иначе каждый рендер провайдера станет рендером потребителей.'
      ),
      seeAlso: [
        L('Section 10-2: memo, useMemo and useCallback', 'Секция 10-2: memo, useMemo и useCallback'),
        L('Section 7-3: splitting contexts by update frequency', 'Секция 7-3: разделение контекстов по частоте обновлений'),
      ],
    },
    {
      id: 'react-ch7-s3',
      title: L('Splitting contexts by update frequency', 'Разделение контекстов по частоте обновлений'),
      body: L(
        'If one context carries both a rarely changing theme and a fast changing cursor position, every consumer of it re-renders on every mouse move. The fix is structural: split the state into two contexts, one for the slow part and one for the fast part, and let each consumer subscribe only to the channel it needs. A component that reads the theme no longer wakes up when the position changes.\n\nSplitting is not enough when the values themselves are entangled. The standard shape is a store that lives outside React plus a hook that subscribes to a slice of it. The store keeps the state in a mutable object, and the subscription uses useSyncExternalStore, which asks the store for the current snapshot on every render and notifies only the subscribers whose selected value actually changed.\n\nThat is the mechanism behind most state libraries: a mutable store outside React, a subscription with a selector, and a hook that exposes the selected slice. useSyncExternalStore also solves the tearing problem, where React reads a store in one component and another component sees a different value because the store changed in between. React calls getSnapshot during rendering and guarantees that the value it returns is the one it commits.\n\nThe trade-off is real. A split set of contexts means more files, more providers and more ceremony, and each consumer has to know which channel to read. Reach for the split when the update frequencies are genuinely different, when one channel is visibly hot, and not because context is generally slow. A context with a stable value and a handful of consumers is fine as it is.',
        'Если один контекст несёт и редко меняющуюся тему, и быстро меняющуюся позицию курсора, то перерендериваются все его потребители при каждом движении мыши. Лечится это структурно: состояние делится на два контекста, один для медленной части и один для быстрой, и каждый потребитель подписывается только на нужный канал. Компонент, читающий тему, больше не просыпается, когда меняется позиция.\n\nРазделения мало, когда сами значения связаны. Стандартная форма — хранилище, живущее вне React, и хук, подписанный на его срез. Хранилище держит состояние в мутабельном объекте, а подписка использует useSyncExternalStore, которая спрашивает у хранилища текущий снимок при каждом рендере и уведомляет только тех подписчиков, у которых изменилось выбранное значение.\n\nНа этом построено большинство библиотек состояния: мутабельное хранилище вне React, подписка с селектором и хук, отдающий выбранный срез. useSyncExternalStore заодно решает проблему tearing, когда React читает хранилище в одном компоненте, а другой компонент видит другое значение, потому что хранилище изменилось между чтениями. React вызывает getSnapshot во время рендера и гарантирует, что зафиксирует именно то значение, которое вернул.\n\nПлата за это реальна. Набор разделённых контекстов означает больше файлов, больше провайдеров и больше возни, и каждый потребитель должен знать, из какого канала читать. Прибегайте к разделению, когда частоты обновлений действительно разные, когда один канал явно горячий, а не потому что «контекст вообще медленный». Контекст со стабильным значением и десятком потребителей вполне работоспособен как есть.'
      ),
      bullets: [
        L('One context for fast values and slow values wakes every consumer.', 'Один контекст для быстрых и медленных значений будит всех потребителей.'),
        L('Split the state so each consumer reads only the channel it needs.', 'Делите состояние так, чтобы каждый потребитель читал только нужный канал.'),
        L('A store outside React plus a selector removes the context update.', 'Хранилище вне React плюс селектор убирают обновление контекста.'),
        L('useSyncExternalStore guarantees a consistent snapshot during render.', 'useSyncExternalStore гарантирует согласованный снимок во время рендера.'),
        L('Splitting costs extra providers and extra ceremony.', 'Разделение стоит дополнительных провайдеров и возни.'),
        L('Do not split contexts that always change together.', 'Не делите контексты, которые всегда меняются вместе.'),
      ],
      code: `function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [theme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />                    {/* reads only the theme */}
      <PositionContext.Provider value={position}>
        <Cursor />                   {/* the only subscriber to the fast value */}
      </PositionContext.Provider>
    </ThemeContext.Provider>
  );
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Split, but keep the fast provider high', 'Разделили, но быстрый провайдер остался высоко'),
          text: L(
            'Two contexts with a fast provider around the whole tree change nothing: the provider re-render still recreates every child. The split only pays off when the fast channel is placed deep, around the small part of the tree that actually needs it.',
            'Два контекста с быстрым провайдером вокруг всего дерева ничего не меняют: перерендер провайдера по-прежнему пересоздаёт всех детей. Разделение окупается, только когда быстрый канал вложен глубоко, вокруг маленькой части дерева, которой он действительно нужен.'
          ),
        },
        {
          tone: 'tip',
          title: L('The store plus a selector', 'Хранилище плюс селектор'),
          text: L(
            'When the value changes faster than the frame rate, a context update is the wrong mechanism. Keep the value in a store outside React and read it through useSyncExternalStore with a selector: only the components whose slice changed re-render.',
            'Когда значение меняется быстрее, чем частота кадров, обновление контекста — не тот механизм. Держите значение в хранилище вне React и читайте через useSyncExternalStore с селектором: перерендерятся только те компоненты, чей срез изменился.'
          ),
        },
      ],
      takeaway: L(
        'Split the context when the update rates differ, and nest the fast provider deep so its subtree stays small.',
        'Делите контекст, когда частоты обновлений разные, и вкладывайте быстрый провайдер глубже, чтобы его поддерево оставалось маленьким.'
      ),
      seeAlso: [
        L('Section 7-2: provider value identity and re-renders', 'Секция 7-2: идентичность значения провайдера и перерендеры'),
        L('Chapter 10: performance, measuring before optimising', 'Глава 10: производительность, сначала измерения'),
      ],
    },
    {
      id: 'react-ch7-s4',
      title: L('Context versus composition', 'Контекст против композиции'),
      body: L(
        'Every use of context is a decision to stop passing something explicitly. Props travel down the tree by hand, which costs typing at every level but shows the data flow in the code: the reader of a component can see where a value comes from and who is able to change it. Context replaces that visible chain with an invisible subscription, which is convenient for values that are genuinely global, such as a theme, a locale or the current user.\n\nComposition solves the same problem differently. Instead of a provider above and a hook below, you pass the rendered piece as a prop: <Layout sidebar={<Sidebar user={user} />}. The data still flows down, but the component that owns the data decides who receives it, and the receiver never learns that a context exists. Nothing is global, so nothing can be read in the wrong place or overridden by accident.\n\nThe cost of context is that it hides dependencies. A component that reads three contexts has three invisible inputs, and whoever reads that file has to search the tree to find out who provides them. That is a real maintenance cost in a large application, and it grows with the number of contexts. Composition puts the same information into a prop, where it is visible in the signature, and it keeps the component reusable in any position.\n\nThe practical rule: use context for values that are global by nature and change rarely, and use composition for anything a specific subtree needs. A modal that needs the current user, a table that needs a filter, a form that needs a submit handler: all of those are props. When in doubt, prop drilling for two or three levels is a small price compared with a component whose inputs nobody can list.',
        'Каждое использование контекста — это решение перестать передавать что-то явно. Пропы идут вниз по дереву вручную, и это стоит повторений на каждом уровне, но зато поток данных виден в коде: читатель компонента видит, откуда пришло значение и кто вправе его изменить. Контекст заменяет эту видимую цепочку невидимой подпиской, что удобно для действительно глобальных значений: темы, локали, текущего пользователя.\n\nКомпозиция решает ту же задачу иначе. Вместо провайдера сверху и хука снизу вы передаёте готовый кусок разметки пропом: <Layout sidebar={<Sidebar user={user} />}. Данные по-прежнему идут вниз, но компонент, владеющий данными, решает, кто их получит, а получатель вообще не узнаёт, что существует контекст. Ничто не глобально, значит, ничего нельзя прочитать не из того места и случайно переопределить.\n\nЦена контекста в том, что он прячет зависимости. У компонента, читающего три контекста, три невидимых входа, и чтобы понять, кто их предоставляет, приходится искать по дереву. В большом приложении это настоящая стоимость сопровождения, и она растёт с числом контекстов. Композиция кладёт ту же информацию в проп, где она видна в сигнатуре, и сохраняет компонент пригодным в любом месте.\n\nПрактическое правило: контекст — для значений, глобальных по природе и меняющихся редко, композиция — для всего, что нужно конкретному поддереву. Модальному окну нужен текущий пользователь, таблице — фильтр, форме — обработчик отправки: всё это пропы. Если сомневаетесь, протаскивание пропов на два-три уровня — небольшая цена по сравнению с компонентом, чьи входы никто не может перечислить.'
      ),
      bullets: [
        L('Context hides the data flow, props show it in the signature.', 'Контекст прячет поток данных, пропсы показывают его в сигнатуре.'),
        L('Global and rarely changing values are the natural fit for context.', 'Глобальные и редко меняющиеся значения — естественное место для контекста.'),
        L('Composition passes a rendered subtree instead of a subscription.', 'Композиция передаёт поддерево, а не подписку.'),
        L('A component reading three contexts has three invisible inputs.', 'У компонента с тремя контекстами три невидимых входа.'),
        L('Composition keeps a component reusable in any position.', 'Композиция сохраняет пригодность компонента в любом месте.'),
        L('Prop drilling for two or three levels is cheaper than a global channel.', 'Протаскивание пропов на два-три уровня дешевле глобального канала.'),
      ],
      code: `// Composition: the owner decides who gets the data
function Page({ user }) {
  return (
    <Layout
      header={<Header user={user} />}
      sidebar={<Sidebar user={user} />}
    >
      <Profile user={user} />
    </Layout>
  );
}

// Context: a global channel read deep in the tree
function Profile() {
  const user = useContext(UserContext);
  return <h2>{user.name}</h2>;
}`,
      table: {
        caption: L('Context or composition', 'Контекст или композиция'),
        headers: [L('Question', 'Вопрос'), L('Context', 'Контекст'), L('Composition', 'Композиция')],
        rows: [
          [L('Who may read the value', 'Кто может прочитать значение'), L('Anyone under the provider', 'Любой под провайдером'), L('Only the components you pass it to', 'Только те, кому вы передали')],
          [L('Where the dependency is visible', 'Где видна зависимость'), L('Nowhere, it is implicit', 'Нигде, она неявна'), L('In the props of the receiver', 'В пропсах получателя')],
          [L('Overriding for one subtree', 'Переопределение для поддерева'), L('Nest another provider', 'Вложить ещё провайдер'), L('Render a different element', 'Отрисовать другой элемент')],
          [L('Testing', 'Тестирование'), L('Needs a provider wrapper', 'Нужна обёртка-провайдер'), L('Render it with the props', 'Отрисовать с пропсами')],
          [L('Best for', 'Лучше всего подходит для'), L('Theme, locale, current user', 'Тема, локаль, текущий пользователь'), L('A specific subtree needs the data', 'Данные нужны конкретному поддереву')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Reach for props first', 'Сначала пробуйте пропсы'),
          text: L(
            'Prop drilling for two or three levels is not a failure of design. It shows up in the component signature, it makes the component testable without any wrapper, and it is easy to refactor later if the same data is needed somewhere else.',
            'Протаскивание пропов на два-три уровня — не провал дизайна. Оно видно в сигнатуре компонента, делает его тестируемым без всяких обёрток и легко переделывается, если те же данные понадобятся ещё где-то.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The hidden dependency', 'Скрытая зависимость'),
          text: L(
            'A component that reads a context cannot be used without the matching provider, and nothing in its props says so. The failure appears at runtime, in a subtree that nobody thought was connected to the provider.',
            'Компонент, читающий контекст, нельзя использовать без соответствующего провайдера, и в его пропсах это не отражено. Ошибка всплывает во время выполнения в поддереве, которое никто не считал связанным с провайдером.'
          ),
        },
      ],
      takeaway: L(
        'Context for global values that change rarely, composition for anything a specific subtree needs.',
        'Контекст — для глобальных редко меняющихся значений, композиция — для всего, что нужно конкретному поддереву.'
      ),
      seeAlso: [
        L('Section 3-5: choosing the component boundary', 'Секция 3-5: выбор границы компонента'),
        L('Section 8-4: sharing state versus sharing behaviour', 'Секция 8-4: общее состояние против общего поведения'),
      ],
    },
    {
      id: 'react-ch7-s5',
      title: L('useContext inside custom hooks', 'useContext внутри кастомных хуков'),
      body: L(
        'A custom hook that reads a context hides that dependency from every component that uses the hook, and that is exactly why it is worth doing. The hook becomes the single place that knows the context exists, the component that uses it deals with plain values, and a test can provide the context once instead of every component having to know what it reads.\n\nThe mechanics are simple: call useContext inside the hook body, unconditionally, and return what the caller needs. The rules of hooks apply to hooks, so a useContext call inside a custom hook obeys the same rules as any other hook call. It must not sit inside a condition, a loop or a nested function, and the order of the calls must be identical on every render.\n\nProvider order matters because the value a reader gets is the one from the closest provider above it in the rendered tree. If a component reads a context but the provider sits below it in the source, the reader gets the default value and nothing warns you. When a value looks wrong, check the position of the provider first, then check that the context object was created once and not inside a component.\n\nComposing contexts in a hook is powerful and easy to misuse. A hook that reads three contexts and merges them into one object creates a new object on every render, and if you publish that object through another context you have reintroduced the unstable value problem one level down. Memoise the merged object, or return the parts separately and let the caller decide.',
        'Кастомный хук, читающий контекст, прячет эту зависимость от всех, кто его вызывает, и именно поэтому это стоит делать. Хук становится единственным местом, которое знает о существовании контекста, компонент работает с обычными значениями, а тест может предоставить контекст один раз, вместо того чтобы каждый компонент знал, что он читает.\n\nМеханика простая: вызовите useContext в теле хука, безусловно, и верните то, что нужно вызывающему. Правила хуков распространяются и на хуки, поэтому вызов useContext внутри кастомного хука подчиняется тем же правилам, что и любой другой вызов хука. Он не должен стоять внутри условия, цикла или вложенной функции, и порядок вызовов должен быть одинаковым при каждом рендере.\n\nПорядок провайдеров важен, потому что читатель получает значение ближайшего провайдера над ним в отрисованном дереве. Если компонент читает контекст, а провайдер в исходниках расположен ниже, читатель получит значение по умолчанию, и никто об этом не предупредит. Когда значение выглядит неверным, сначала проверьте положение провайдера, потом — что объект контекста создан один раз, а не внутри компонента.\n\nСобирать контексты внутри хука мощно и легко сделать неправильно. Хук, читающий три контекста и сливающий их в один объект, создаёт новый объект при каждом рендере, и если вы опубликуете этот объект через другой контекст, проблема нестабильного значения вернётся на уровень глубже. Мемоизируйте слитый объект или возвращайте части по отдельности и дайте вызывающему решать.'
      ),
      bullets: [
        L('A hook that reads a context hides the dependency from its callers.', 'Хук, читающий контекст, прячет зависимость от вызывающих.'),
        L('useContext inside a hook obeys the rules of hooks.', 'useContext внутри хука подчиняется правилам хуков.'),
        L('The closest provider above in the rendered tree wins.', 'Побеждает ближайший провайдер выше в отрисованном дереве.'),
        L('A provider below the reader means the reader gets the default value.', 'Провайдер ниже читателя означает, что читатель получит значение по умолчанию.'),
        L('Merging contexts into one object requires memoisation.', 'Слияние контекстов в один объект требует мемоизации.'),
        L('A hook may read several contexts and expose one shape.', 'Хук может читать несколько контекстов и отдавать один интерфейс.'),
      ],
      code: `import { useContext, useMemo } from 'react';

function useUserSettings() {
  const user = useContext(UserContext);
  const prefs = useContext(PrefsContext);

  // Memoise: a new object on every render would break memoised children
  return useMemo(() => ({ user, theme: prefs.theme }), [user, prefs.theme]);
}

function SettingsBadge() {
  const { user, theme } = useUserSettings();
  return <span className={theme}>{user.name}</span>;
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The provider sits below the reader', 'Провайдер оказался ниже читателя'),
          text: L(
            'Context follows the rendered tree, not the source order. A provider written after the component in the same file is still above it in the tree if it wraps it, and still below it if it does not.',
            'Контекст следует за отрисованным деревом, а не за порядком в исходниках. Провайдер, написанный ниже компонента в том же файле, всё равно окажется выше в дереве, если обернёт его, и ниже, если не обернёт.'
          ),
        },
        {
          tone: 'note',
          title: L('Hooks inside hooks are still hooks', 'Хуки внутри хуков — тоже хуки'),
          text: L(
            'A hook that calls useContext must call it on every render, in the same order, at the top level of the hook body. A conditional read is the same class of bug as a conditional useState, only quieter.',
            'Хук, вызывающий useContext, обязан вызывать его на каждом рендере, в одном порядке, на верхнем уровне тела хука. Условное чтение — тот же класс бага, что условный useState, только более тихий.'
          ),
        },
      ],
      takeaway: L(
        'Read contexts inside the hook, not in every consumer, and memoise anything you merge into a new object.',
        'Читайте контексты внутри хука, а не в каждом потребителе, и мемоизируйте всё, что сливаете в новый объект.'
      ),
      seeAlso: [
        L('Chapter 8: custom hooks', 'Глава 8: кастомные хуки'),
        L('Section 8-2: the rules of hooks and the linter', 'Секция 8-2: правила хуков и линтер'),
      ],
    },
  ],
};
