import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh03: Chapter = {
  id: 'redux-ch3',
  title: L('Reading state: selectors and memoisation', 'Чтение состояния: селекторы и мемоизация'),
  summary: L(
    'Why components read the state through selectors, how a parameterised selector is built as a factory, how createSelector caches the last result, why reference equality is the whole trick, and when memoisation pays for itself.',
    'Почему компоненты читают состояние через селекторы, как устроена фабрика параметризованного селектора, как createSelector кэширует последний результат, почему сравнение по ссылке — это весь фокус и когда мемоизация окупается.'
  ),
  sections: [
    {
      id: 'redux-ch3-s1',
      title: L('Writing selectors', 'Написание селекторов'),
      body: L(
        'A selector is a function that takes the state and returns a value from it. That is the whole definition. A selector that returns state.todos.items is trivial, and a selector that returns the number of open todos is a derivation, and both are the same kind of thing: a named function that the store can be asked for. The difference matters only when the result is compared, and that is what the next sections are about.\n\nThe reason to write them is that reading and computing must live apart from rendering. A component that asks the store for a value through a selector does not know where the value came from, so the same component keeps working when the shape of the state changes, and the same value is available to every component that needs it. The component becomes a function of its props and of the selected value, and of nothing else.\n\nThe trap is the shortcut. Writing const items = useSelector((state) => state.todos.items.filter((todo) => !todo.done)) inside a component works, but the filter runs on every store update, the result is a new array every time, and every subscriber of that array re-renders on every action in the application. Naming the derivation and memoising it solves all three problems at once.',
        'Селектор — это функция, которая принимает состояние и возвращает значение из него. Вот и всё определение. Селектор, возвращающий state.todos.items, тривиален, а селектор, возвращающий число открытых задач, — это производное значение, и то и другое — один и тот же вид вещи: именованная функция, у которой можно спросить значение у хранилища. Разница проявляется только там, где результат сравнивают, и об этом — следующие секции.\n\nПисать селекторы нужно потому, что чтение и вычисление должны жить отдельно от рендера. Компонент, который просит у хранилища значение через селектор, не знает, откуда оно взялось, поэтому тот же компонент продолжит работать, когда форма состояния изменится, и то же значение доступно каждому, кому оно нужно. Компонент становится функцией своих пропсов и выбранного значения, и больше ничего.\n\nЛовушка — сокращение. Запись const items = useSelector((state) => state.todos.items.filter((todo) => !todo.done)) внутри компонента работает, но фильтр выполняется при каждом обновлении хранилища, результат каждый раз новый массив, и любой подписчик этого массива перерисовывается на каждое действие в приложении. Имя для производного значения и мемоизация решают все три задачи сразу.'
      ),
      bullets: [
        L('A selector is a plain function from state to a value.', 'Селектор — обычная функция от состояния к значению.'),
        L('Reading and computing belong outside the component.', 'Чтение и вычисление живут вне компонента.'),
        L('A selector that filters returns a new array on every call.', 'Селектор с фильтром возвращает новый массив на каждый вызов.'),
        L('useSelector compares the result with the previous one by reference.', 'useSelector сравнивает результат с предыдущим по ссылке.'),
        L('A named derivation can be reused and tested on its own.', 'Именованное производное значение можно переиспользовать и проверить отдельно.'),
      ],
      code: `import { useSelector } from 'react-redux';

interface RootState {
  todos: { items: { id: string; text: string; done: boolean }[] };
}

// A selector is a function from state to a value.
export const selectTodos = (state: RootState) => state.todos.items;

export const selectOpenTodos = (state: RootState) =>
  state.todos.items.filter((todo) => !todo.done);

// A component reads a value, it never walks the tree itself.
export const useOpenTodos = () => useSelector(selectOpenTodos);`,
      table: {
        caption: L('Three ways to read the same value', 'Три способа прочитать одно значение'),
        headers: [L('Approach', 'Подход'), L('Reference stability', 'Стабильность ссылки'), L('Cost', 'Цена')],
        rows: [
          [
            L('useSelector((state) => state.todos.items)', 'useSelector((state) => state.todos.items)'),
            L('Stable, the same array', 'Стабильна, тот же массив'),
            L('Almost nothing', 'Почти ничего'),
          ],
          [
            L('useSelector((state) => state.todos.items.filter(...))', 'useSelector((state) => state.todos.items.filter(...))'),
            L('A new array every time', 'Новый массив каждый раз'),
            L('A re-render on every action', 'Перерисовка на каждое действие'),
          ],
          [
            L('useSelector(selectOpenTodos), memoised', 'useSelector(selectOpenTodos), мемоизированный'),
            L('Stable while the input is unchanged', 'Стабильна, пока вход не изменился'),
            L('One comparison per call', 'Одно сравнение за вызов'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('A selector returns, it does not react', 'Селектор возвращает, а не реагирует'),
          text: L(
            'A selector is called every time the store changes, so it must be cheap and free of side effects. If your selector starts to log, fetch or dispatch, it is not a selector any more.',
            'Селектор вызывается при каждом изменении хранилища, поэтому он должен быть дешёвым и без побочных эффектов. Если селектор начинает логировать, ходить в сеть или отправлять действия, он перестаёт быть селектором.'
          ),
        },
      ],
      takeaway: L(
        'A selector is a named function from state to a value, and it must stay free of side effects.',
        'Селектор — это именованная функция от состояния к значению, и в нём не должно быть побочных эффектов.'
      ),
      seeAlso: [
        L('Section 3-3: memoisation with createSelector', 'Секция 3-3: мемоизация через createSelector'),
        L('Section 2-4: selecting a domain', 'Секция 2-4: чтение домена'),
      ],
    },
    {
      id: 'redux-ch3-s2',
      title: L('Parameterised selectors and factories', 'Параметризованные селекторы и фабрики'),
      body: L(
        'Some questions have arguments: the todo with this id, the items of this order, the totals for this month. A parameterised selector cannot be a single function of the state, because the parameter changes between calls while the state stays the same. The standard solution is a factory: a function that takes the parameter and returns the selector. The component calls the factory with its argument and hands the result to useSelector.\n\nThe factory runs during the render, so a new selector function is created on every render. That is harmless for a plain selector, because it only reads the state and creates nothing that is compared. It stops being harmless the moment the selector is memoised, because every call would create a new cache and the memoisation would never hit. That is why the memoised version of a parameterised selector is built with a dedicated factory, which the next section shows.\n\nThere is a second form: React Redux accepts extra arguments and passes them to the selector, so useSelector((state, id) => ...) works. The selector is still recreated on every render unless it is stable, and the cache of a memoised selector is keyed by the arguments, so the shape of the cache follows the way the selector is written. The factory is easier to reason about because the parameter is closed over.',
        'Некоторые вопросы имеют аргументы: задача с таким id, позиции такого заказа, суммы за этот месяц. Параметризованный селектор не может быть одной функцией от состояния, потому что аргумент меняется между вызовами, а состояние остаётся прежним. Стандартное решение — фабрика: функция, которая принимает параметр и возвращает селектор. Компонент вызывает фабрику со своим аргументом и передаёт результат в useSelector.\n\nФабрика выполняется во время рендера, поэтому функция селектора создаётся заново на каждом рендере. Для обычного селектора это безобидно, ведь он только читает состояние и не создаёт ничего, с чем сравнивают. Но как только селектор мемоизирован, это перестаёт быть безобидным: каждый вызов создаёт новый кэш, и мемоизация никогда не срабатывает. Поэтому мемоизированную версию параметризованного селектора собирают через отдельную фабрику, о чём и пойдёт речь дальше.\n\nЕсть и вторая форма: React Redux принимает дополнительные аргументы и передаёт их селектору, так что useSelector((state, id) => ...) работает. Селектор всё равно пересоздаётся на каждом рендере, если он не стабилен, а кэш мемоизированного селектора ключуется аргументами, то есть форма кэша следует из того, как написан селектор. С фабрикой проще разобраться, потому что параметр закрыт внутри неё.'
      ),
      bullets: [
        L('A parameterised selector is a factory that returns a selector.', 'Параметризованный селектор — это фабрика, возвращающая селектор.'),
        L('The factory runs on every render, the selector reads the state.', 'Фабрика выполняется на каждом рендере, селектор читает состояние.'),
        L('A new selector function per render is fine only for plain selectors.', 'Новая функция селектора на каждый рендер допустима только для обычных селекторов.'),
        L('A memoised parameterised selector needs its own factory.', 'Мемоизированный параметризованный селектор требует своей фабрики.'),
        L('Passing the parameter as a second argument shifts the caching question.', 'Передача параметра вторым аргументом переносит вопрос о кэшировании в другое место.'),
      ],
      code: `import { useSelector } from 'react-redux';

interface RootState {
  todos: { items: { id: string; text: string; done: boolean }[] };
}

// The factory takes the parameter and returns the selector.
export const selectTodoById = (id: string) => (state: RootState) =>
  state.todos.items.find((todo) => todo.id === id);

// The factory runs during the render, the selector reads the state.
export const useTodoById = (id: string) => useSelector(selectTodoById(id));`,
      table: {
        caption: L('Two ways to parameterise a selector', 'Два способа параметризовать селектор'),
        headers: [L('Form', 'Форма'), L('Where the parameter lives', 'Где живёт параметр'), L('Cache', 'Кэш')],
        rows: [
          [
            L('Factory', 'Фабрика'),
            L('Closed over by the selector', 'Закрыт селектором'),
            L('One per factory instance', 'По одному на экземпляр фабрики'),
          ],
          [
            L('Second argument of useSelector', 'Второй аргумент useSelector'),
            L('Passed by React Redux on every call', 'Передаётся React Redux на каждый вызов'),
            L('Keyed by the arguments', 'Ключуется аргументами'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not memoise inside a render', 'Не мемоизируйте во время рендера'),
          text: L(
            'Calling createSelector inside a component body creates a new cache on every render, so the memoised selector recomputes every time and the code is slower than the plain version while looking optimised. Build the selector once, outside the component.',
            'Вызов createSelector в теле компонента создаёт новый кэш на каждом рендере, поэтому мемоизированный селектор пересчитывается каждый раз, и код медленнее простого варианта, хотя выглядит оптимизированным. Собирайте селектор один раз, вне компонента.'
          ),
        },
      ],
      takeaway: L(
        'Build a parameterised selector as a factory, and build the memoised version with a factory of its own.',
        'Строите параметризованный селектор как фабрику, а мемоизированную версию — через отдельную фабрику.'
      ),
      seeAlso: [
        L('Section 3-3: memoisation with createSelector', 'Секция 3-3: мемоизация через createSelector'),
        L('Section 3-5: when memoisation pays off', 'Секция 3-5: когда мемоизация окупается'),
      ],
    },
    {
      id: 'redux-ch3-s3',
      title: L('Memoisation with createSelector', 'Мемоизация через createSelector'),
      body: L(
        'createSelector takes a list of input selectors and one result function. It calls the inputs, compares their results with the results of the previous call and, if all of them are unchanged, returns the cached result instead of calling the result function again. That is the entire mechanism, and the cached value keeps its reference, so React sees the same object and skips the re-render.\n\nThe rule that makes this work is that the inputs must be cheap and stable. The usual mistake is to pass a selector that creates a new array, for example one that filters, as the input of a memoised selector: the result of the input is a new reference on every call, the cache never hits, and the memoisation becomes pure overhead while the code still looks perfectly correct.\n\nThe second rule concerns the result function. It must be a pure computation of its inputs. If it reads the state directly, or reads the clock, or returns an object built from something outside the inputs, the cache will happily keep a stale value, because the cache has no way of knowing that something else changed.',
        'createSelector принимает список входных селекторов и одну функцию результата. Он вызывает входные селекторы, сравнивает их результаты с результатами прошлого вызова и, если все они не изменились, возвращает закэшированный результат, не вызывая функцию результата заново. Это весь механизм, и закэшированное значение сохраняет ссылку, поэтому React видит тот же объект и пропускает перерисовку.\n\nПравило, которое делает это работающим: входные селекторы должны быть дешёвыми и стабильными. Типичная ошибка — передать в качестве входа селектор, создающий новый массив, например фильтрующий: результат входа каждый раз новая ссылка, кэш не срабатывает, и мемоизация становится чистым накладным расходом, хотя код выглядит совершенно правильным.\n\nВторое правило касается функции результата. Она должна быть чистым вычислением своих входов. Если она читает состояние напрямую, читает часы или возвращает объект, собранный из чего-то за пределами входов, кэш спокойно сохранит устаревшее значение, потому что у него нет способа узнать, что что-то изменилось.'
      ),
      bullets: [
        L('createSelector caches the last result of the result function.', 'createSelector кэширует последний результат функции результата.'),
        L('The cache hits only when every input selector returns the same reference.', 'Кэш срабатывает, только когда все входные селекторы вернули ту же ссылку.'),
        L('An input that creates a new array on every call defeats the cache.', 'Вход, создающий новый массив каждый раз, ломает кэш.'),
        L('The result function must depend on its inputs only.', 'Функция результата зависит только от своих входов.'),
        L('The cached value keeps its reference, so React can skip the re-render.', 'Кэшированное значение сохраняет ссылку, поэтому React может пропустить перерисовку.'),
      ],
      code: `import { createSelector } from '@reduxjs/toolkit';

interface Todo { id: string; text: string; done: boolean }
interface RootState { todos: { items: Todo[] } }

const selectItems = (state: RootState) => state.todos.items;

// The input must be stable, the result is cached while the input is unchanged.
export const selectOpenTodos = createSelector(
  [selectItems],
  (items) => items.filter((todo) => !todo.done),
);

export const selectTodoCount = createSelector(
  [selectOpenTodos],
  (open) => open.length,
);`,
      table: {
        caption: L('What breaks the cache', 'Что ломает кэш'),
        headers: [L('Input selector', 'Входной селектор'), L('Result of the input', 'Результат входа'), L('Cache hits', 'Кэш срабатывает')],
        rows: [
          [
            L('(state) => state.todos.items', '(state) => state.todos.items'),
            L('The same array', 'Тот же массив'),
            L('yes', 'да'),
          ],
          [
            L('(state) => state.todos.items.filter(...)', '(state) => state.todos.items.filter(...)'),
            L('A new array every call', 'Новый массив каждый вызов'),
            L('no', 'нет'),
          ],
          [
            L('(state) => state.todos.items.map(...)', '(state) => state.todos.items.map(...)'),
            L('A new array every call', 'Новый массив каждый вызов'),
            L('no', 'нет'),
          ],
          [
            L('(state) => state.todos.items.length', '(state) => state.todos.items.length'),
            L('A number', 'Число'),
            L('yes', 'да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Filtering inside the input selector', 'Фильтрация внутри входного селектора'),
          text: L(
            'An input selector that filters produces a new array on every call, so the cache of the memoised selector never hits. Filter inside the result function instead, and keep the input selector a plain property read.',
            'Входной селектор с фильтрацией создаёт новый массив на каждый вызов, поэтому кэш мемоизированного селектора не срабатывает никогда. Фильтруйте внутри функции результата, а вход оставьте простым чтением свойства.'
          ),
        },
      ],
      takeaway: L(
        'A memoised selector only works when its inputs return the same reference, and its result function uses nothing else.',
        'Мемоизированный селектор работает, только если входы возвращают ту же ссылку, а функция результата не использует ничего другого.'
      ),
      seeAlso: [
        L('Section 3-4: reselect and reference equality', 'Секция 3-4: reselect и сравнение по ссылке'),
        L('Section 3-5: when memoisation pays off', 'Секция 3-5: когда мемоизация окупается'),
      ],
    },
    {
      id: 'redux-ch3-s4',
      title: L('Reselect and reference equality', 'Reselect и сравнение по ссылке'),
      body: L(
        'The memoisation in createSelector comes from Reselect, a small library whose only job is to cache the results of a computation. The cache is keyed by the arguments of the call: when the arguments are equal to the ones of an earlier call, the cached result is returned unchanged, and when they differ the computation runs again and the result is stored under the new arguments. Nothing is invalidated explicitly, and the entries live as long as the arguments that key them.\n\nEquality here means reference equality for objects and arrays and value equality for primitives. That is the whole trick, and it is also the limit: two structurally equal but freshly created arrays are different inputs, so the cache misses and the result is recomputed. Reselect 5, the version behind Redux Toolkit, uses a weak map based cache for the inputs, so several parameter sets can keep their own entry instead of fighting over one slot.\n\nBecause the cache is keyed on references, the discipline that keeps the selectors fast is the same one that keeps the state tree cheap: do not create new objects while reading. Deriving a value is fine, as long as the derivation happens inside the memoised result function and the inputs stay untouched.',
        'Мемоизация в createSelector приходит из Reselect — небольшой библиотеки, у которой единственная задача: кэшировать результаты вычисления. Кэш ключуется аргументами вызова: когда аргументы равны аргументам более раннего вызова, кэшированный результат возвращается как есть, а когда они отличаются, вычисление выполняется снова, и результат сохраняется под новыми аргументами. Ничего не сбрасывается вручную, а записи живут столько же, сколько живут ключащие их аргументы.\n\nРавенство здесь — это равенство по ссылке для объектов и массивов и по значению для примитивов. В этом весь фокус, и в этом же его предел: два структурно равных, но только что созданных массива — это разные входы, кэш не срабатывает, и результат считается заново. Reselect 5 — та версия, что стоит за Redux Toolkit, — использует кэш на основе слабой карты для входов, поэтому несколько наборов параметров могут держать свои записи, а не бороться за одну.\n\nПоскольку кэш ключуется ссылками, дисциплина, которая ускоряет селекторы, та же, что бережёт дерево состояния: не создавайте новые объекты во время чтения. Производное значение допустимо, если вычисление происходит внутри мемоизированной функции результата, а входы остаются нетронутыми.'
      ),
      bullets: [
        L('Reselect caches the result per set of arguments.', 'Reselect кэширует результат для каждого набора аргументов.'),
        L('Equality for objects is reference equality.', 'Для объектов равенство — это равенство по ссылке.'),
        L('A new array with the same content is a different input.', 'Новый массив с тем же содержимым — это другой вход.'),
        L('Reselect 5 keeps a separate cache entry per parameter set.', 'Reselect 5 хранит отдельную запись кэша на каждый набор параметров.'),
        L('The result keeps its reference, which is exactly what React needs.', 'Результат сохраняет ссылку — именно это и нужно React.'),
      ],
      code: `import { createSelector } from '@reduxjs/toolkit';

interface RootState { todos: { items: { id: string; done: boolean }[] } }

const selectItems = (state: RootState) => state.todos.items;

export const selectOpenIds = createSelector(
  [selectItems],
  (items) => items.filter((todo) => !todo.done).map((todo) => todo.id),
);

const state: RootState = { todos: { items: [{ id: 'a', done: false }] } };

const first = selectOpenIds(state);
const second = selectOpenIds(state);
console.log(first === second); // true - the result is cached

// A new state object with the same content is a different input.
const copy: RootState = { todos: { items: [{ id: 'a', done: false }] } };
console.log(selectOpenIds(copy) === first); // false - the cache missed`,
      table: {
        caption: L('Cache hit or miss', 'Кэш сработал или нет'),
        headers: [L('Call', 'Вызов'), L('Input reference', 'Ссылка на вход'), L('Result', 'Результат')],
        rows: [
          [
            L('The same state, twice', 'То же состояние, дважды'),
            L('The same', 'Та же'),
            L('The cached one, same reference', 'Кэшированный, та же ссылка'),
          ],
          [
            L('A new state object, same content', 'Новый объект состояния, то же содержимое'),
            L('Different', 'Другая'),
            L('Recomputed, new reference', 'Пересчитан, новая ссылка'),
          ],
          [
            L('The state was mutated in place', 'Состояние изменили на месте'),
            L('The same', 'Та же'),
            L('The stale result, a bug', 'Устаревший результат, это баг'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('A stale cache is a symptom', 'Устаревший кэш — это симптом'),
          text: L(
            'If a memoised selector returns a value that does not match the state, the cause is almost never in Reselect. It is a reducer that mutated the state, so the reference stayed the same while the content changed.',
            'Если мемоизированный селектор возвращает значение, не совпадающее с состоянием, причина почти никогда не в Reselect. Это редьюсер, изменивший состояние на месте: ссылка осталась прежней, а содержимое поменялось.'
          ),
        },
      ],
      takeaway: L(
        'The cache is keyed on references, so a stable input reference is the price of a stable result reference.',
        'Кэш ключуется ссылками, поэтому стабильная ссылка на вход — цена стабильной ссылки на результат.'
      ),
      seeAlso: [
        L('Section 1-4: why reducers must be pure', 'Секция 1-4: почему редьюсеры должны быть чистыми'),
        L('Section 3-5: when memoisation pays off', 'Секция 3-5: когда мемоизация окупается'),
      ],
    },
    {
      id: 'redux-ch3-s5',
      title: L('When memoisation pays off', 'Когда мемоизация окупается'),
      body: L(
        'Memoisation is not free. Every memoised selector keeps its inputs, its result and a cache entry alive, and it adds a comparison to every call. For a selector that returns a boolean or a number, or one that filters a list of ten items, the cost of the memoisation is larger than the cost of the computation. Memoise where the computation is expensive, or where the result is an object that components compare by reference.\n\nThe measurable case is a derived object or an array. If a component subscribes to a selector that returns a new array each time, useSelector sees a new reference after every dispatch and re-renders the component, even though the data never changed. A memoised selector returns the same reference and the re-render disappears. That is the case where memoisation pays for itself immediately, and it is the case you will meet first.\n\nThe other measurable case is a chain. When several selectors build on one expensive computation, memoising the base selector means the work happens once per state change instead of once per subscriber. The rule is simple: memoise the expensive base and let the cheap derivations read from it.',
        'Мемоизация не бесплатна. Каждый мемоизированный селектор удерживает свои входы, результат и запись кэша, и добавляет сравнение к каждому вызову. Для селектора, возвращающего логическое значение или число, или фильтрующего список из десяти элементов, цена мемоизации больше цены самого вычисления. Мемоизируйте там, где вычисление дорогое, или там, где результат — объект, с которым компоненты сравнивают по ссылке.\n\nИзмеримый случай — производный объект или массив. Если компонент подписан на селектор, возвращающий новый массив каждый раз, useSelector после каждого dispatch видит новую ссылку и перерисовывает компонент, хотя данные не менялись. Мемоизированный селектор возвращает ту же ссылку, и перерисовка исчезает. Именно в этом случае мемоизация окупается сразу, и именно этот случай встретится первым.\n\nВторой измеримый случай — цепочка. Когда несколько селекторов строятся поверх одного дорогого вычисления, мемоизация базового селектора означает, что работа выполняется один раз на изменение состояния, а не один раз на подписчика. Правило простое: мемоизируйте дорогую базу, а дешёвые производные читайте из неё.'
      ),
      bullets: [
        L('Memoisation costs memory, comparisons and extra code.', 'Мемоизация стоит памяти, сравнений и лишнего кода.'),
        L('Memoise a result that is an object or an array compared by reference.', 'Мемоизируйте результат-объект или массив, с которым сравнивают по ссылке.'),
        L('A primitive result rarely needs memoisation.', 'Примитивному результату мемоизация почти никогда не нужна.'),
        L('Memoise the expensive base of a chain, not every selector.', 'Мемоизируйте дорогую базу цепочки, а не каждый селектор.'),
        L('Measure before adding a cache.', 'Измеряйте, прежде чем добавлять кэш.'),
      ],
      code: `import { createSelector } from '@reduxjs/toolkit';

interface RootState { cart: { items: { id: string; price: number }[] } }

const selectItems = (state: RootState) => state.cart.items;

// The expensive base: one pass over the cart.
export const selectTotal = createSelector([selectItems], (items) =>
  items.reduce((sum, item) => sum + item.price, 0),
);

// Cheap derivations read from the cached base.
export const selectCount = createSelector([selectItems], (items) => items.length);

export const selectIsEmpty = createSelector([selectTotal], (total) => total === 0);`,
      table: {
        caption: L('Memoise or not', 'Мемоизировать или нет'),
        headers: [L('The selector returns', 'Селектор возвращает'), L('Verdict', 'Вердикт'), L('Why', 'Почему')],
        rows: [
          [
            L('A boolean', 'Логическое значение'),
            L('Usually no', 'Обычно нет'),
            L('Cheap, and primitives compare by value', 'Дёшево, а примитивы сравниваются по значению'),
          ],
          [
            L('A filtered array', 'Отфильтрованный массив'),
            L('Yes', 'Да'),
            L('A new reference on every call', 'Новая ссылка на каждый вызов'),
          ],
          [
            L('A sorted copy', 'Отсортированная копия'),
            L('Yes', 'Да'),
            L('A new reference and extra work', 'Новая ссылка и лишняя работа'),
          ],
          [
            L('A count', 'Количество'),
            L('Rarely', 'Редко'),
            L('A number, cheap to recompute', 'Число, дешёво пересчитать'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Measure with the profiler', 'Измеряйте профилировщиком'),
          text: L(
            'React DevTools shows which components re-rendered and why. A component that re-renders on every dispatch while nothing changed is almost always a subscriber to a selector that returns a new object, and that is where a memoised selector belongs.',
            'React DevTools показывает, какие компоненты перерисовались и почему. Компонент, который перерисовывается на каждый dispatch, хотя ничего не изменилось, почти всегда подписан на селектор, возвращающий новый объект, — вот там и нужен мемоизированный селектор.'
          ),
        },
      ],
      takeaway: L(
        'Memoise a selector when its result is a new object or array that components compare by reference, and leave the cheap primitives alone.',
        'Мемоизируйте селектор, когда его результат — новый объект или массив, с которым сравнивают по ссылке, а дешёвые примитивы оставьте как есть.'
      ),
      seeAlso: [
        L('Section 3-3: memoisation with createSelector', 'Секция 3-3: мемоизация через createSelector'),
        L('Chapter 4: asynchronous data flow', 'Глава 4: асинхронный поток данных'),
      ],
    },
  ],
};
