import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh02: Chapter = {
  id: 'redux-ch2',
  title: L('Slices and the shape of a domain', 'Слайсы и форма домена'),
  summary: L(
    'How createSlice generates a reducer, action creators and type strings, how extraReducers reacts to actions from other slices, how prepare normalises a payload before the reducer sees it, how a slice exposes the way it is read, and how to organise slices per feature.',
    'Как createSlice генерирует редьюсер, создателей действий и строки типов, как extraReducers реагирует на чужие действия, как prepare нормализует payload до редьюсера, как слайс объявляет способ чтения своих данных и как организовать слайсы по фичам.'
  ),
  sections: [
    {
      id: 'redux-ch2-s1',
      title: L('createSlice and its parts', 'createSlice и его части'),
      body: L(
        'createSlice is a code generator. You give it a name, an initial state and a map of case reducers, and it gives you back three things: the reducer itself, one action creator per case reducer, and the type strings behind them. The name is the prefix of every generated type, so a slice called todos produces the type todos/addTodo. Nothing else changes underneath: the generated reducer is the same pure function of state and action that the first chapter described.\n\nA generated action creator is an ordinary function that returns a plain action object. Calling addTodo("buy milk") gives back { type: "todos/addTodo", payload: "buy milk" }, and dispatching that object is the only way it reaches the store. Because the type strings are derived from the name of the slice, two slices cannot collide as long as their names differ, which removes a whole family of typos that hand-written type constants invite.\n\nRedux Toolkit also fills in the details the bare contract leaves to you. The initial state is typed from the value you pass, the state parameter of a case reducer is an Immer draft, and the action parameter is typed from the payload you declare. The result is a slice that fits on one screen and that the compiler checks against the shape of the state.',
        'createSlice — это генератор кода. Вы передаёте ему имя, начальное состояние и набор case-редьюсеров, а он возвращает три вещи: сам редьюсер, по одному создателю действия на каждый case-редьюсер и строки типов за ними. Имя становится префиксом каждого сгенерированного типа, поэтому слайс todos даёт тип todos/addTodo. Под всем этим ничего не меняется: сгенерированный редьюсер остаётся той же чистой функцией состояния и действия, о которой шла первая глава.\n\nСгенерированный создатель действия — обычная функция, возвращающая обычный объект действия. Вызов addTodo("buy milk") даёт { type: "todos/addTodo", payload: "buy milk" }, и отправить этот объект в хранилище — единственный способ доставить его туда. Поскольку строки типов выводятся из имени слайса, два слайса не могут столкнуться, пока их имена различаются, а это снимает целый класс опечаток, которые провоцируют рукописные константы типов.\n\nRedux Toolkit закрывает и те детали, которые голый контракт оставляет на вас. Начальное состояние типизируется по переданному значению, параметр state в case-редьюсере — это черновик Immer, а параметр action типизируется по объявленному payload. На выходе слайс, который помещается на один экран и который компилятор сверяет с формой состояния.'
      ),
      bullets: [
        L('createSlice returns a reducer, action creators and the type strings behind them.', 'createSlice возвращает редьюсер, создателей действий и строки типов за ними.'),
        L('The slice name prefixes every generated action type.', 'Имя слайса становится префиксом каждого сгенерированного типа действия.'),
        L('An action creator returns a plain action object.', 'Создатель действия возвращает обычный объект действия.'),
        L('The state parameter is an Immer draft, the action is typed from the payload.', 'Параметр state — черновик Immer, а action типизирован по payload.'),
        L('The reducer is wired into the store through the root reducer map.', 'Редьюсер подключается к хранилищу через карту корневого редьюсера.'),
      ],
      code: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TodosState {
  items: { id: string; text: string; done: boolean }[];
}

const initialState: TodosState = { items: [] };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      state.items.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
  },
});

// Three things come out of createSlice.
export const { todoAdded, todoToggled } = todosSlice.actions;
export default todosSlice.reducer;`,
      table: {
        caption: L('What createSlice gives you', 'Что даёт createSlice'),
        headers: [L('Part', 'Часть'), L('Example', 'Пример'), L('Use', 'Применение')],
        rows: [
          [
            L('actions', 'actions'),
            L('todosSlice.actions.todoAdded', 'todosSlice.actions.todoAdded'),
            L('Dispatching the action', 'Отправка действия'),
          ],
          [
            L('reducer', 'reducer'),
            L('todosSlice.reducer', 'todosSlice.reducer'),
            L('The branch of the state tree', 'Ветвь дерева состояния'),
          ],
          [
            L('type strings', 'строки типов'),
            L("'todos/todoAdded'", "'todos/todoAdded'"),
            L('Matching an action by type', 'Сопоставление действия по типу'),
          ],
          [
            L('selectors', 'selectors'),
            L('todosSlice.selectors.selectItems', 'todosSlice.selectors.selectItems'),
            L('Reading the domain', 'Чтение домена'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Name slices after the domain', 'Называйте слайсы по домену'),
          text: L(
            'The name of a slice is part of every action type it generates, so it appears in the log, in the DevTools and in every file that reacts to it. A name like userSlice tells nobody what the branch of the tree contains; a name like session tells everybody.',
            'Имя слайса входит в каждый сгенерированный тип действия, поэтому оно мелькает в логе, в DevTools и во всех файлах, которые на него реагируют. Имя вроде userSlice не говорит никому, что лежит в ветви дерева, а имя вроде session говорит всем.'
          ),
        },
      ],
      takeaway: L(
        'createSlice generates the reducer, the action creators and the type strings from one declaration.',
        'createSlice генерирует редьюсер, создателей действий и строки типов из одного объявления.'
      ),
      seeAlso: [
        L('Section 1-2: actions and the reducer contract', 'Секция 1-2: действия и контракт редьюсера'),
        L('Section 2-4: selecting a domain', 'Секция 2-4: чтение домена'),
      ],
    },
    {
      id: 'redux-ch2-s2',
      title: L('extraReducers and cross-slice reactions', 'extraReducers и реакции между слайсами'),
      body: L(
        'A slice owns the actions it generates. extraReducers is where it reacts to actions that come from somewhere else: another slice, a thunk, or an action creator you received from a library. Redux Toolkit offers two ways to write that. The builder callback with addCase is type safe and is the one to prefer, because the action creator carries its payload type into the reducer, so the payload is typed for you.\n\nThe older object form, where extraReducers is a map from a type string to a reducer, still works, and it is the only way to react to an action whose creator you do not own, for example an action defined by a third-party package. The type string is built from the name of the slice and the name of the case with a slash between them, so the string behind articlesSlice.actions.articleRemoved is "articles/articleRemoved".\n\nThe rule for cross-slice reactions is narrow: a slice may react to a foreign action, but it must never write into the foreign branch of the tree. A reducer that reads another slice of the state couples the two domains and makes the order of the updates hard to reason about. An explicit action is always cheaper than an implicit dependency.',
        'Слайс владеет действиями, которые сам генерирует. extraReducers — это место, где он реагирует на действия извне: другого слайса, thunk или создателя действия, полученного от библиотеки. Redux Toolkit предлагает два способа записи. Колбэк builder с addCase типизирован и предпочтителен, потому что создатель действия приносит с собой тип payload, и payload типизируется за вас.\n\nСтарая объектная форма, где extraReducers — это карта из строки типа в редьюсер, до сих пор работает, и это единственный способ отреагировать на действие, чей создатель вам не принадлежит, например на действие из стороннего пакета. Строка типа собирается из имени слайса и имени случая через косую черту, поэтому строка за articlesSlice.actions.articleRemoved — это "articles/articleRemoved".\n\nПравило реакций между слайсами узкое: слайс может реагировать на чужое действие, но он не должен писать в чужую ветвь дерева. Редьюсер, читающий состояние другого слайса, связывает два домена и делает порядок обновлений трудноразборчивым. Явное действие всегда дешевле неявной зависимости.'
      ),
      bullets: [
        L('extraReducers is where a slice reacts to actions it did not create.', 'extraReducers — место, где слайс реагирует на чужие действия.'),
        L('builder.addCase carries the payload type into the reducer.', 'builder.addCase приносит тип payload в редьюсер.'),
        L('The object form matches by type string, such as "articles/articleRemoved".', 'Объектная форма сопоставляет по строке типа, например "articles/articleRemoved".'),
        L('A slice must not write into another slice of the tree.', 'Слайс не должен писать в чужую ветвь дерева.'),
        L('Cross-slice reactions are explicit events, not hidden dependencies.', 'Реакции между слайсами — это явные события, а не скрытые зависимости.'),
      ],
      code: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: [] as { id: string; authorId: string }[],
  reducers: {
    articleRemoved(state, action: PayloadAction<{ id: string; authorId: string }>) {
      return state.filter((article) => article.id !== action.payload.id);
    },
  },
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { lastRemovedAuthor: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    // The action creator comes from another slice, the payload type with it.
    builder.addCase(articlesSlice.actions.articleRemoved, (state, action) => {
      state.lastRemovedAuthor = action.payload.authorId;
    });
  },
});`,
      table: {
        caption: L('Two ways to react to a foreign action', 'Два способа отреагировать на чужое действие'),
        headers: [L('Form', 'Форма'), L('Matches by', 'Сопоставляет по'), L('Type safety', 'Типобезопасность')],
        rows: [
          [
            L('builder.addCase', 'builder.addCase'),
            L('The action creator', 'Создателю действия'),
            L('Full, the payload type comes along', 'Полная, тип payload приходит вместе'),
          ],
          [
            L('builder.addMatcher', 'builder.addMatcher'),
            L('A predicate function', 'Предикатной функции'),
            L('Full, for a family of actions', 'Полная, для семейства действий'),
          ],
          [
            L('Object map of type strings', 'Объектная карта строк типов'),
            L('The type string', 'Строке типа'),
            L('Manual, you write the payload type', 'Ручная, тип payload пишете вы'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not write into a foreign slice', 'Не пишите в чужой слайс'),
          text: L(
            'A reducer that assigns to another slice of the state has two owners for one branch, and the result depends on which reducer ran first. If two slices must change together, dispatch one action and let each slice react to it.',
            'Редьюсер, пишущий в чужой слайс состояния, создаёт двух владельцев одной ветви, и результат зависит от того, кто отработал первым. Если два слайса должны меняться вместе, отправьте одно действие и пусть на него отреагирует каждый.'
          ),
        },
      ],
      takeaway: L(
        'React to foreign actions with builder.addCase, and never write into another slice of the tree.',
        'Реагируйте на чужие действия через builder.addCase и никогда не пишите в чужую ветвь дерева.'
      ),
      seeAlso: [
        L('Section 4-2: handling pending, fulfilled and rejected', 'Секция 4-2: обработка pending, fulfilled и rejected'),
        L('Section 2-5: organising slices per feature', 'Секция 2-5: организация слайсов по фичам'),
      ],
    },
    {
      id: 'redux-ch2-s3',
      title: L('prepare and payload normalisation', 'prepare и нормализация payload'),
      body: L(
        'The generated action creator passes its arguments straight into the payload. Sometimes the data that reaches the reducer should not be exactly what the caller passed: an id has to be generated, a timestamp has to be added, a single value has to be expanded into an object with several fields. The prepare callback of a case reducer is the place to do that, once, at the boundary of the action.\n\nWith prepare, the creator takes whatever arguments the component has and returns a ready-made payload. The reducer then receives exactly the shape it declared and never has to guess where the id came from. Doing the transformation inside the reducer works too, but it repeats the work on every dispatch and hides the real shape of the event inside the logic that applies it.\n\nprepare is also the right place to normalise a payload that arrives from an untyped source, such as a JSON body or a form. The action then always carries a checked shape, and every consumer of that action can rely on it. This is one of the cheapest ways to keep a boundary honest, because the check happens once, in one place, before the data is allowed into the state.',
        'Сгенерированный создатель действия передаёт свои аргументы в payload как есть. Иногда данные, доходящие до редьюсера, должны быть не совсем тем, что передал вызывающий: нужно сгенерировать id, добавить метку времени, развернуть одно значение в объект из нескольких полей. Колбэк prepare в case-редьюсере — место, где это делается один раз, на границе действия.\n\nС prepare создатель принимает те аргументы, которые есть у компонента, и возвращает готовый payload. Редьюсер получает ровно ту форму, которую объявил, и ему не нужно гадать, откуда взялся id. Делать преобразование внутри редьюсера тоже можно, но работа повторяется на каждом dispatch, а настоящая форма события прячется в логике, которая его применяет.\n\nprepare — ещё и правильное место для нормализации payload из нетипизированного источника, например из JSON-тела или формы. Тогда действие всегда несёт проверенную форму, и на неё можно положиться в любом потребителе. Это один из самых дешёвых способов сделать границу честной: проверка происходит один раз, в одном месте, до того как данные попадут в состояние.'
      ),
      bullets: [
        L('prepare normalises the arguments of the action creator.', 'prepare нормализует аргументы создателя действия.'),
        L('The reducer receives the payload shape it declared.', 'Редьюсер получает ту форму payload, которую объявил.'),
        L('Ids and timestamps are generated once, at the boundary.', 'Id и метка времени генерируются один раз, на границе.'),
        L('An untyped payload is checked before it enters the state.', 'Нетипизированный payload проверяется до попадания в состояние.'),
        L('prepare and reducer live together in the same case.', 'prepare и редьюсер живут рядом в одном случае.'),
      ],
      code: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Post { id: string; text: string; createdAt: number }

const feedSlice = createSlice({
  name: 'feed',
  initialState: { posts: [] as Post[] },
  reducers: {
    postAdded: {
      // The creator takes a plain string and returns a ready-made post.
      prepare(text: string) {
        return { payload: { id: crypto.randomUUID(), text, createdAt: Date.now() } };
      },
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
    },
  },
});

export const { postAdded } = feedSlice.actions;`,
      table: {
        caption: L('Where the transformation happens', 'Где происходит преобразование'),
        headers: [L('Place', 'Место'), L('When', 'Когда'), L('Cost', 'Цена')],
        rows: [
          [
            L('At the call site', 'В месте вызова'),
            L('Every caller repeats it', 'Каждый вызывающий повторяет'),
            L('Duplication and drift', 'Дублирование и расхождения'),
          ],
          [
            L('Inside the reducer', 'Внутри редьюсера'),
            L('On every dispatch', 'На каждом dispatch'),
            L('Repeated work, hidden shape', 'Повторная работа, спрятанная форма'),
          ],
          [
            L('In prepare', 'В prepare'),
            L('Once, when the action is created', 'Один раз, при создании действия'),
            L('One place to look', 'Одно место, где искать'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('prepare is the cheapest validation point', 'prepare — самое дешёвое место для проверки'),
          text: L(
            'Because prepare runs before the reducer, it is the last place where the shape of the incoming data can still be fixed. A check that lives in a component is skipped the moment a second component dispatches the same action.',
            'Поскольку prepare выполняется до редьюсера, это последнее место, где форму входящих данных ещё можно исправить. Проверка в компоненте будет пропущена, как только тот же action отправит второй компонент.'
          ),
        },
      ],
      takeaway: L(
        'Put the transformation of the arguments into prepare, so the reducer only ever sees the final shape.',
        'Преобразование аргументов выносите в prepare, чтобы редьюсер видел только готовую форму.'
      ),
      seeAlso: [
        L('Section 2-1: createSlice and its parts', 'Секция 2-1: createSlice и его части'),
        L('Section 6-1: normalised state', 'Секция 6-1: нормализованное состояние'),
      ],
    },
    {
      id: 'redux-ch2-s4',
      title: L('Selecting a domain', 'Чтение домена'),
      body: L(
        'A slice knows its own state better than anybody else, so it can declare the way its data is read. The selectors option of createSlice takes functions that receive the state and return a value, and createSlice attaches them to the slice, so the domain and the way it is queried live in one file. A component then asks for what it needs instead of walking the tree itself.\n\nThe trap this prevents is the opposite habit: a component that writes state.todos.items.filter((todo) => !todo.done).length directly in the render. The computation is correct, but it lives in the component, it is duplicated in every place that needs the same number, and it cannot be memoised, because the derivation is not a value the store knows about. Moving it into a selector puts it under the control of the store.\n\nThese slice level selectors are the simple case: a function that picks a value out of the state of the slice. The moment the value has to be computed, or has to depend on another slice, you need a memoised selector, and that is the subject of the next chapter.',
        'Слайс знает своё состояние лучше всех, поэтому он может объявить способ чтения своих данных. Опция selectors у createSlice принимает функции, которые получают состояние и возвращают значение, а createSlice прикрепляет их к слайсу, так что домен и способ запроса к нему живут в одном файле. Компонент тогда запрашивает нужное, а не бродит по дереву сам.\n\nЛовушка, которую это предотвращает, — обратная привычка: компонент, который прямо в рендере пишет state.todos.items.filter((todo) => !todo.done).length. Вычисление верное, но оно живёт в компоненте, дублируется в каждом месте, которому нужно то же число, и его нельзя мемоизировать, потому что производное значение не знакомо хранилищу. Перенос в селектор отдаёт его под контроль хранилища.\n\nСлайсовые селекторы — простой случай: функция, выбирающая значение из состояния слайса. Как только значение нужно вычислить или оно зависит от другого слайса, нужен мемоизированный селектор, и этому посвящена следующая глава.'
      ),
      bullets: [
        L('A slice can declare its own selectors next to its reducer.', 'Слайс может объявить свои селекторы рядом с редьюсером.'),
        L('The slice selector receives the state of the slice, not the whole tree.', 'Слайсовый селектор получает состояние слайса, а не всё дерево.'),
        L('Components should ask for a value instead of walking the tree.', 'Компонент должен запрашивать значение, а не бродить по дереву.'),
        L('A derivation inside a component cannot be memoised.', 'Производное значение внутри компонента нельзя мемоизировать.'),
        L('Computed values need a memoised selector.', 'Вычисляемые значения требуют мемоизированного селектора.'),
      ],
      code: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TodosState { items: { id: string; text: string; done: boolean }[] }

const initialState: TodosState = { items: [] };

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      state.items.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
  },
  // The slice declares the way it is read.
  selectors: {
    selectItems: (state) => state.items,
    selectOpenCount: (state) => state.items.filter((todo) => !todo.done).length,
  },
});

export const { todoAdded } = todosSlice.actions;
export const { selectItems, selectOpenCount } = todosSlice.selectors;
export default todosSlice.reducer;`,
      table: {
        caption: L('Two ways to ask the same question', 'Два способа задать один и тот же вопрос'),
        headers: [L('Approach', 'Подход'), L('Where the logic lives', 'Где живёт логика'), L('Memoisable', 'Мемоизируется')],
        rows: [
          [
            L('useSelector((state) => state.todos.items)', 'useSelector((state) => state.todos.items)'),
            L('In the component', 'В компоненте'),
            L('Not needed, the reference is stable', 'Не нужна, ссылка стабильна'),
          ],
          [
            L('useSelector((state) => state.todos.items.filter(...))', 'useSelector((state) => state.todos.items.filter(...))'),
            L('In the component', 'В компоненте'),
            L('No, a new array on every call', 'Нет, новый массив на каждый вызов'),
          ],
          [
            L('useSelector(todosSlice.selectors.selectOpenCount)', 'useSelector(todosSlice.selectors.selectOpenCount)'),
            L('In the slice', 'В слайсе'),
            L('Possible, see the next chapter', 'Возможно, см. следующую главу'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Keep the derivation in one place', 'Держите вычисление в одном месте'),
          text: L(
            'When the same number is needed in a header, in a badge and in a notification, a shared selector makes the three agree by construction. Three copies of the same filter will drift apart the first time one of them changes.',
            'Если одно и то же число нужно в шапке, в бейдже и в уведомлении, общий селектор заставит их совпадать по построению. Три копии одного фильтра разойдутся при первом же изменении любой из них.'
          ),
        },
      ],
      takeaway: L(
        'Components ask for values through selectors, and the derivation lives in the slice, not in the render.',
        'Компоненты запрашивают значения селекторами, а вычисление живёт в слайсе, а не в рендере.'
      ),
      seeAlso: [
        L('Chapter 3: reading state, selectors and memoisation', 'Глава 3: чтение состояния, селекторы и мемоизация'),
        L('Section 2-5: organising slices per feature', 'Секция 2-5: организация слайсов по фичам'),
      ],
    },
    {
      id: 'redux-ch2-s5',
      title: L('Organising slices per feature', 'Организация слайсов по фичам'),
      body: L(
        'A common mistake is to organise the code by technical type: one folder for slices, one for selectors, one for thunks and one for types. The alternative is to organise it by feature, so everything that belongs to one domain lives in one folder, with the slice, its selectors, its thunks and its types inside it. Adding a feature then means adding one folder, and removing it means removing one folder.\n\nThe rule that makes this work is that a feature folder is a module with a public surface. Other parts of the application import from the index of that folder, which re-exports the actions, the selectors and the reducer, and nothing else. This explicit boundary is what stops the tree of imports from turning into a web, and it makes the offer of a domain visible from the outside, like the interface of a class.\n\nThe store stays the composition root. It imports the reducer of each feature and puts them into one map, and that map is the single description of the shape of the state tree. Because the tree is described in one file, every branch has exactly one owner, and a reader of the store file knows the whole shape of the application state without opening a single feature.',
        'Частая ошибка — организовывать код по техническому типу: одна папка под слайсы, другая под селекторы, третья под thunk и четвёртая под типы. Альтернатива — организовать по фиче, чтобы всё, что относится к одному домену, лежало в одной папке: слайс, его селекторы, его thunk и его типы. Добавление фичи означает добавление одной папки, а удаление — удаление одной папки.\n\nПравило, которое делает это рабочим: папка фичи — это модуль с публичной поверхностью. Остальные части приложения импортируют из index этой папки, который переэкспортирует действия, селекторы и редьюсер, и больше ничего. Именно эта явная граница не даёт дереву импортов превратиться в паутину и делает предложение домена видимым снаружи, как интерфейс класса.\n\nХранилище остаётся точкой сборки. Оно импортирует редьюсер каждой фичи и складывает их в одну карту, и эта карта — единственное описание формы дерева состояния. Поскольку дерево описано в одном файле, у каждой ветви ровно один владелец, а читатель файла хранилища знает всю форму состояния приложения, не открывая ни одной фичи.'
      ),
      bullets: [
        L('One folder per feature, not one folder per technical type.', 'Одна папка на фичу, а не на технический тип.'),
        L('The index of the folder is the public surface of the domain.', 'Index папки фичи — это публичная поверхность домена.'),
        L('The store is the composition root and describes the tree.', 'Хранилище — точка сборки и описание дерева.'),
        L('Every branch of the tree has exactly one reducer.', 'У каждой ветви дерева ровно один редьюсер.'),
        L('The type of the state tree is derived from the store.', 'Тип дерева состояния выводится из хранилища.'),
      ],
      code: `// src/store.ts - the composition root of the application
import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './features/cart';
import { catalogSlice } from './features/catalog';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
      table: {
        caption: L('Organised by type and organised by feature', 'Организация по типу и по фиче'),
        headers: [L('Question', 'Вопрос'), L('By type', 'По типу'), L('By feature', 'По фиче')],
        rows: [
          [
            L('Where is the cart slice?', 'Где лежит слайс корзины?'),
            L('slices/cartSlice.ts', 'slices/cartSlice.ts'),
            L('features/cart/cartSlice.ts', 'features/cart/cartSlice.ts'),
          ],
          [
            L('What changes when a feature is added?', 'Что меняется при добавлении фичи?'),
            L('Four folders', 'Четыре папки'),
            L('One folder', 'Одна папка'),
          ],
          [
            L('Who may import the slice?', 'Кто может импортировать слайс?'),
            L('Anyone, from anywhere', 'Любой, откуда угодно'),
            L('Through the index of the folder', 'Через index папки'),
          ],
          [
            L('Where is the domain logic?', 'Где доменная логика?'),
            L('Split across folders', 'Размазана по папкам'),
            L('Next to the slice', 'Рядом со слайсом'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Barrels can hide cycles', 'Barrel-файлы могут скрывать циклы'),
          text: L(
            'An index that re-exports everything makes it easy for two features to import each other, and the cycle only shows up when the bundler complains. When a cycle appears, the fix is to import the specific module inside the feature instead of its index.',
            'Index, который переэкспортирует всё, позволяет двум фичам импортировать друг друга, и цикл обнаруживается только когда на него жалуется сборщик. Когда цикл появился, импортируйте конкретный модуль внутри фичи, а не её index.'
          ),
        },
      ],
      takeaway: L(
        'One folder per feature, one index that declares the public surface, one store that lists the branches.',
        'Одна папка на фичу, один index с публичной поверхностью, одно хранилище со списком ветвей.'
      ),
      seeAlso: [
        L('Section 2-1: createSlice and its parts', 'Секция 2-1: createSlice и его части'),
        L('Section 3-1: writing selectors', 'Секция 3-1: написание селекторов'),
      ],
    },
  ],
};
