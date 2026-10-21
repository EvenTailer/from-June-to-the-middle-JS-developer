import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh06: Chapter = {
  id: 'redux-ch6',
  title: L('Collections and the entity adapter', 'Коллекции и адаптер сущностей'),
  summary: L(
    'Why a collection belongs in a normalised shape, what the entity adapter gives you, how to sort and filter over it without breaking memoisation, how to paginate without duplicating entities, and what happens when the server changes an id.',
    'Почему коллекция должна быть нормализована, что даёт адаптер сущностей, как по нему сортировать и фильтровать, не ломая мемоизацию, как делать пагинацию без дублирования сущностей и что происходит, когда сервер меняет id.'
  ),
  sections: [
    {
      id: 'redux-ch6-s1',
      title: L('Normalised state', 'Нормализованное состояние'),
      body: L(
        'A collection can be stored in two shapes. The plain shape is an array of objects: [{ id: "a", title: "First" }, ...]. The normalised shape splits it in two: ids is an array of identifiers and entities is a map from an identifier to the object. The array keeps the order, the map keeps the data, and every entity exists in exactly one place.\n\nThe difference shows up in the operations. Finding an entity in the array is a search that costs a comparison per element, while the map gives it in a single property access. Updating one entity in the array means copying the array and rebuilding the objects around it, while in the normalised shape only the changed entity gets a new reference and the others keep theirs, so a memoised selector or a memoised component does not re-render for data that did not change.\n\nThe normalised shape also removes a whole family of bugs. As soon as the same entity appears in two places, such as in a list and in a detail view, one of the copies is stale the moment the other one changes. With one map there is nothing to synchronise.\n\nThe cost is verbosity: the shape is not what the API returns, so something has to convert between them. Redux Toolkit ships that converter as the entity adapter, which is the subject of the next section.',
        'Коллекцию можно хранить в двух видах. Обычный вид — массив объектов: [{ id: "a", title: "First" }, ...]. Нормализованный вид делит её на две части: ids — массив идентификаторов, entities — карта от идентификатора к объекту. Массив хранит порядок, карта хранит данные, и каждая сущность существует ровно в одном месте.\n\nРазница проявляется на операциях. Найти сущность в массиве — это перебор со сравнением на каждый элемент, а карта даёт её одним обращением к свойству. Обновить одну сущность в массиве — значит скопировать массив и пересобрать объекты вокруг неё, а в нормализованном виде новую ссылку получает только изменённая сущность, остальные сохраняют свои, поэтому мемоизированный селектор или компонент не перерисовывается из-за данных, которые не менялись.\n\nНормализованный вид заодно убирает целое семейство багов. Как только одна и та же сущность появляется в двух местах, например в списке и в детальном экране, одна из копий устаревает в тот же момент, когда меняется другая. С одной картой синхронизировать нечего.\n\nЦена — многословность: этот вид не совпадает с тем, что возвращает API, значит, кто-то должен переводить одно в другое. Redux Toolkit поставляет такой переводчик в виде адаптера сущностей, которому посвящена следующая секция.'
      ),
      bullets: [
        L('Normalised state is an array of ids plus a map of entities.', 'Нормализованное состояние — это массив id плюс карта сущностей.'),
        L('The array holds the order, the map holds the data.', 'Массив хранит порядок, карта хранит данные.'),
        L('A lookup by id becomes a property access instead of a search.', 'Поиск по id превращается в обращение к свойству вместо перебора.'),
        L('Updating one entity keeps the identity of all the others.', 'Обновление одной сущности сохраняет идентичность остальных.'),
        L('The same entity in two places is a guaranteed stale copy.', 'Одна и та же сущность в двух местах — это гарантированно устаревшая копия.'),
      ],
      code: `interface Post { id: string; title: string }
interface PostsState { ids: string[]; entities: Record<string, Post> }

const posts: PostsState = {
  ids: ['a', 'b'],
  entities: {
    a: { id: 'a', title: 'First' },
    b: { id: 'b', title: 'Second' },
  },
};

// The lookup is a property access, not a search.
posts.entities['a'].title;

// Updating one entity leaves the reference of the other one alone.
const updated: PostsState = {
  ...posts,
  entities: { ...posts.entities, a: { ...posts.entities.a, title: 'Renamed' } },
};
updated.entities.b === posts.entities.b; // true`,
      table: {
        caption: L('The same operations in two shapes', 'Одни и те же операции в двух видах'),
        headers: [L('Operation', 'Операция'), L('Array of objects', 'Массив объектов'), L('Normalised', 'Нормализовано')],
        rows: [
          [
            L('Find by id', 'Найти по id'),
            L('a search over the array', 'перебор массива'),
            L('one property access', 'одно обращение к свойству'),
          ],
          [
            L('Update one item', 'Обновить один элемент'),
            L('a new array and new objects around it', 'новый массив и новые объекты вокруг'),
            L('one new entity, the rest keep their reference', 'одна новая сущность, остальные сохраняют ссылку'),
          ],
          [
            L('Insert the same item twice', 'Вставить один и тот же элемент дважды'),
            L('two copies that drift apart', 'две копии, которые расходятся'),
            L('one entry', 'одна запись'),
          ],
          [
            L('Serialise for the network', 'Сериализовать для сети'),
            L('the array is ready', 'массив уже готов'),
            L('the map has to be rebuilt', 'карту надо пересобрать'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The same entity in two slices', 'Одна сущность в двух слайсах'),
          text: L(
            'Keeping the list of posts in one slice and the opened post in another means the opened post is a copy. Update the list and the detail view keeps showing the old title until the user reopens it.',
            'Если список постов лежит в одном слайсе, а открытый пост — в другом, открытый пост оказывается копией. Обновите список, и детальный экран продолжит показывать старый заголовок, пока пользователь не откроет его заново.'
          ),
        },
      ],
      takeaway: L(
        'Store a collection in one place: an array of ids and a map of entities.',
        'Храните коллекцию в одном месте: массив id и карта сущностей.'
      ),
      seeAlso: [
        L('Section 6-2: the entity adapter API', 'Секция 6-2: API адаптера сущностей'),
        L('Section 6-5: deduplicating by id', 'Секция 6-5: дедупликация по id'),
        L('Chapter 3: selectors and memoisation', 'Глава 3: селекторы и мемоизация'),
      ],
    },
    {
      id: 'redux-ch6-s2',
      title: L('The entity adapter API', 'API адаптера сущностей'),
      body: L(
        'createEntityAdapter is a factory that takes the type of the entity and gives you three things: the shape of the state, a set of pure reducers that operate on that shape, and a factory of selectors that read it. The adapter knows nothing about your domain: it works with an id and an object. The id comes from the id field of the entity, and when the field is called something else you name the type of the id as well and point the adapter at it with selectId.\n\nThe state it produces has two fields, ids and entities, and it has to come from getInitialState. The reducers are the whole API: addOne, addMany, setOne, setAll, setMany, updateOne, updateMany, upsertOne, upsertMany, removeOne, removeMany and removeAll. Every one of them is a pure function of the state and returns a new state, so they fit inside a case reducer without any ceremony.\n\nThe selectors come from getSelectors, which takes a function that picks the slice out of the root state. It returns selectAll, selectIds, selectEntities, selectTotal and selectById. They read the state without copying it, which matters because a selector that allocates a new array on every call defeats the memoisation of every component above it.\n\nTwo traps. An adapter only understands the state it created, so a hand-written initial state with a different shape fails at runtime with a confusing message. And the id has to be the identity of the entity: if two entities share an id, one of them silently disappears.',
        'createEntityAdapter — это фабрика, которая принимает тип сущности и возвращает три вещи: форму состояния, набор чистых редьюсеров, работающих с этой формой, и фабрику селекторов, которые её читают. Адаптер ничего не знает о вашем домене: он работает с id и объектом. Id берётся из поля id сущности, а если поле называется иначе, тип id надо назвать явно и указать адаптеру через selectId.\n\nСостояние, которое он создаёт, состоит из двух полей, ids и entities, и обязано приходить из getInitialState. Редьюсеры — это весь API: addOne, addMany, setOne, setAll, setMany, updateOne, updateMany, upsertOne, upsertMany, removeOne, removeMany и removeAll. Каждый из них — чистая функция состояния, возвращающая новое состояние, поэтому они без всяких церемоний помещаются в case-редьюсер.\n\nСелекторы приходят из getSelectors, которому передаётся функция, достающая слайс из корневого состояния. Она возвращает selectAll, selectIds, selectEntities, selectTotal и selectById. Они читают состояние, ничего не копируя, и это важно: селектор, создающий новый массив при каждом вызове, обнуляет мемоизацию всех компонентов над ним.\n\nДве ловушки. Адаптер понимает только то состояние, которое создал сам, поэтому рукописное начальное состояние другой формы падает во время выполнения с запутанным сообщением. И id обязан быть идентичностью сущности: если у двух сущностей один id, одна из них молча исчезает.'
      ),
      bullets: [
        L('createEntityAdapter returns the state shape, the reducers and a selector factory.', 'createEntityAdapter возвращает форму состояния, редьюсеры и фабрику селекторов.'),
        L('The state must come from getInitialState.', 'Состояние должно приходить из getInitialState.'),
        L('updateOne takes { id, changes } and returns a new state.', 'updateOne принимает { id, changes } и возвращает новое состояние.'),
        L('getSelectors returns selectAll, selectIds, selectEntities, selectTotal and selectById.', 'getSelectors возвращает selectAll, selectIds, selectEntities, selectTotal и selectById.'),
        L('selectId decides the identity, so it has to be unique and stable.', 'Id берётся из поля id, а selectId нужен только для другого имени поля.'),
      ],
      code: `import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Post { id: string; title: string; archived?: boolean }

// The id comes from the id field of the entity.
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    postAdded: (state, action: PayloadAction<Post>) =>
      postsAdapter.addOne(state, action.payload),
    postArchived: (state, action: PayloadAction<{ id: string; changes: Partial<Post> }>) =>
      postsAdapter.updateOne(state, action.payload),
  },
});`,
      table: {
        caption: L('The reducers of the adapter', 'Редьюсеры адаптера'),
        headers: [L('Method', 'Метод'), L('What it does', 'Что делает'), L('When it is right', 'Когда уместен')],
        rows: [
          [
            L('addOne', 'addOne'),
            L('adds an entity, ignoring a duplicate id', 'добавляет сущность, игнорируя дубликат id'),
            L('the entity is new', 'сущность новая'),
          ],
          [
            L('setOne', 'setOne'),
            L('adds or replaces an entity', 'добавляет или заменяет сущность'),
            L('the server is the source of truth', 'источник правды — сервер'),
          ],
          [
            L('upsertOne', 'upsertOne'),
            L('adds an entity or updates it', 'добавляет сущность или обновляет её'),
            L('you do not know whether it exists', 'неизвестно, есть ли она уже'),
          ],
          [
            L('updateOne', 'updateOne'),
            L('changes the fields of an entity', 'меняет поля сущности'),
            L('the change is partial and known', 'изменение частичное и известное'),
          ],
          [
            L('removeOne', 'removeOne'),
            L('deletes an entity by id', 'удаляет сущность по id'),
            L('the entity is gone', 'сущности больше нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Do not hand-write the initial state', 'Не пишите начальное состояние руками'),
          text: L(
            'The adapter checks the shape of the state it receives and fails with a message about missing fields. The fix is getInitialState, not a hand-made object that looks similar enough.',
            'Адаптер проверяет форму переданного состояния и падает с сообщением про недостающие поля. Лечится это getInitialState, а не самодельным объектом, который выглядит похоже.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A non-unique id', 'Неуникальный id'),
          text: L(
            'If selectId returns the title of the post, two posts with the same title share an id and the second one overwrites the first. Nothing throws, the list simply loses an item.',
            'Если selectId возвращает заголовок поста, два поста с одинаковым заголовком получают один id, и второй затирает первого. Ничего не падает, список просто теряет элемент.'
          ),
        },
      ],
      takeaway: L(
        'Let the adapter create the state and write every change through its methods, otherwise the map stops being consistent.',
        'Пусть состояние создаёт адаптер, а все изменения идут через его методы, иначе карта перестаёт быть согласованной.'
      ),
      seeAlso: [
        L('Section 6-1: normalised state', 'Секция 6-1: нормализованное состояние'),
        L('Section 6-3: sorting, filtering and selectors over an adapter', 'Секция 6-3: сортировка, фильтрация и селекторы поверх адаптера'),
        L('Section 2-1: createSlice and its parts', 'Секция 2-1: createSlice и его части'),
      ],
    },
    {
      id: 'redux-ch6-s3',
      title: L('Sorting, filtering and selectors over an adapter', 'Сортировка, фильтрация и селекторы поверх адаптера'),
      body: L(
        'sortComparer is the opinion of the adapter about the order of the collection. It is applied on every write, so the ids are always sorted and the order becomes a property of the data rather than of the view. That is the right default when the list has one canonical order, such as an alphabetically sorted list of names.\n\nA view often needs another order: newest first, most commented first, grouped by the day. Two options exist. Keep a second adapter for the same entities with a different comparer, which duplicates the data and the state, or sort in a selector, which keeps one copy of the entities and computes the order when it is read.\n\nSorting in a selector has to be memoised. createSelector caches the last result and recomputes it only when the inputs change, so the array keeps its reference between the store updates that do not touch the collection. A plain sort inside a component body allocates a new array on every render, which re-renders the whole list and defeats the memoisation of every row.\n\nFiltering follows the same rule: selectAll gives the entities, the selector filters them, and the component reads the result of the selector rather than the raw state. The component then contains no logic about the collection at all.',
        'sortComparer — это мнение адаптера о порядке коллекции. Он применяется при каждой записи, поэтому id всегда отсортированы, а порядок становится свойством данных, а не представления. Это правильное поведение по умолчанию, когда у списка есть один канонический порядок, например алфавитный.\n\nПредставлению часто нужен другой порядок: сначала новые, сначала самые обсуждаемые, сгруппированные по дню. Вариантов два. Держать второй адаптер для тех же сущностей с другим компаратором — тогда данные и состояние дублируются. Или сортировать в селекторе — тогда копия сущностей одна, а порядок вычисляется при чтении.\n\nСортировка в селекторе должна быть мемоизированной. createSelector кэширует последний результат и пересчитывает его только когда изменились входные данные, поэтому массив сохраняет ссылку между теми изменениями хранилища, которые не трогают коллекцию. Обычная сортировка в теле компонента создаёт новый массив при каждом рендере, перерисовывает весь список и обнуляет мемоизацию каждой строки.\n\nФильтрация работает по тому же правилу: selectAll даёт сущности, селектор их фильтрует, а компонент читает результат селектора, а не сырое состояние. Тогда в компоненте вообще не остаётся логики о коллекции.'
      ),
      bullets: [
        L('sortComparer is applied on every write and keeps the ids sorted.', 'sortComparer применяется при каждой записи и держит id отсортированными.'),
        L('A second order needs either a second adapter or a sorted selector.', 'Второй порядок требует либо второго адаптера, либо селектора с сортировкой.'),
        L('createSelector keeps the result reference stable between changes.', 'createSelector сохраняет ссылку на результат между изменениями.'),
        L('Sorting in the render body allocates a new array every time.', 'Сортировка в теле рендера создаёт новый массив при каждом рендере.'),
        L('Filter in a selector, not in the component.', 'Фильтруйте в селекторе, а не в компоненте.'),
      ],
      code: `import { createSelector } from '@reduxjs/toolkit';
import { postsAdapter } from './postsSlice';
import type { RootState } from './store';

const postsSelectors = postsAdapter.getSelectors<RootState>(
  (state) => state.posts,
);

// The array keeps its reference until the collection really changes.
const selectActivePosts = createSelector(
  [postsSelectors.selectAll],
  (posts) => posts.filter((post) => !post.archived),
);

// Another order for another view, without a second copy of the data.
const selectRecentPosts = createSelector(
  [postsSelectors.selectAll],
  (posts) => [...posts].sort((a, b) => b.id.localeCompare(a.id)),
);`,
      table: {
        caption: L('Where to sort a normalised collection', 'Где сортировать нормализованную коллекцию'),
        headers: [L('Approach', 'Подход'), L('Copies of the data', 'Копии данных'), L('Cost', 'Цена')],
        rows: [
          [
            L('sortComparer in the adapter', 'sortComparer в адаптере'),
            L('one', 'одна'),
            L('the order is fixed at write time', 'порядок фиксируется при записи'),
          ],
          [
            L('a sorted selector', 'селектор с сортировкой'),
            L('one', 'одна'),
            L('the order is computed on read', 'порядок вычисляется при чтении'),
          ],
          [
            L('a second adapter', 'второй адаптер'),
            L('two', 'две'),
            L('the same entity lives in two places', 'одна сущность живёт в двух местах'),
          ],
          [
            L('sorting in the component', 'сортировка в компоненте'),
            L('one', 'одна'),
            L('a new array on every render', 'новый массив при каждом рендере'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Sorting in the render body', 'Сортировка в теле рендера'),
          text: L(
            'rows.sort(...) inside a component returns a new array on every render, so every row sees a changed prop and the list re-renders completely. Move the sort into a memoised selector and the problem disappears.',
            'rows.sort(...) внутри компонента возвращает новый массив при каждом рендере, поэтому каждая строка видит изменившийся проп и весь список перерисовывается целиком. Перенесите сортировку в мемоизированный селектор, и проблема исчезнет.'
          ),
        },
        {
          tone: 'tip',
          title: L('One adapter, many selectors', 'Один адаптер, много селекторов'),
          text: L(
            'Views disagree about the order far more often than they disagree about the data. Keep one adapter for the entities and let every view derive its own list with a selector.',
            'Представления расходятся во мнении о порядке куда чаще, чем о самих данных. Держите один адаптер для сущностей, а каждое представление пусть выводит свой список селектором.'
          ),
        },
      ],
      takeaway: L(
        'Sort and filter in memoised selectors, and let the component read a ready list instead of computing one.',
        'Сортируйте и фильтруйте в мемоизированных селекторах, а компонент пусть читает готовый список, а не вычисляет его.'
      ),
      seeAlso: [
        L('Section 3-3: memoisation with createSelector', 'Секция 3-3: мемоизация через createSelector'),
        L('Section 6-2: the entity adapter API', 'Секция 6-2: API адаптера сущностей'),
        L('Section 5-5: the generated hooks', 'Секция 5-5: сгенерированные хуки'),
      ],
    },
    {
      id: 'redux-ch6-s4',
      title: L('Pagination with an adapter', 'Пагинация с адаптером'),
      body: L(
        'Pagination and normalised state are two separate problems, and mixing them is where the duplication starts. The entities belong in one shared map, because the same post can appear on page one and on page three. The pages belong to their own slice, because every page has its own cursor, its own status and its own list of ids.\n\nThe usual shape is a record keyed by the serialised query parameters: { posts: { "page=1": { ids: ["a", "b"], nextCursor: "xyz", status: "loaded" } } }. The page stores ids and never objects. The entities are written into the map of the adapter with setAll or upsertMany when the response arrives, and the page only remembers which ids belong to it.\n\nThe cursor comes from the server. Offset pagination can be derived from the length of the array, but it breaks as soon as the collection changes between two requests, because the rows shift and a row is read twice or skipped entirely. A cursor is stable: it points at a position in the data, not at a number.\n\nThe trap here is the id. If the client invents the id from the position in the page, the same row gets a different id on the next page and the map fills with duplicates. The id has to be the one the server sent, and the page has to be keyed by the parameters that produced it.',
        'Пагинация и нормализованное состояние — две разные задачи, и путаница между ними и есть начало дублирования. Сущности принадлежат одной общей карте, потому что один и тот же пост может встретиться на первой и на третьей странице. Страницы принадлежат своему слайсу, потому что у каждой страницы свой курсор, свой статус и свой список id.\n\nОбычная форма — запись, ключом которой служат сериализованные параметры запроса: { posts: { "page=1": { ids: ["a", "b"], nextCursor: "xyz", status: "loaded" } } }. Страница хранит id и никогда — объекты. Сущности попадают в карту адаптера через setAll или upsertMany, когда приходит ответ, а страница запоминает только, какие id ей принадлежат.\n\nКурсор приходит с сервера. Пагинацию по смещению можно вывести из длины массива, но она ломается, как только коллекция меняется между двумя запросами: строки сдвигаются, и строка читается дважды или пропускается целиком. Курсор стабилен: он указывает на позицию в данных, а не на число.\n\nЛовушка здесь — id. Если клиент придумывает id из позиции в странице, одна и та же строка на следующей странице получит другой id, и карта наполнится дубликатами. id должен быть тем, что прислал сервер, а страница должна ключиваться теми параметрами, которые её породили.'
      ),
      bullets: [
        L('Entities live in the shared map, pages store ids and a cursor.', 'Сущности живут в общей карте, страницы хранят id и курсор.'),
        L('The page key is the serialised query parameters.', 'Ключ страницы — сериализованные параметры запроса.'),
        L('The cursor comes from the server, not from the length of the array.', 'Курсор приходит с сервера, а не из длины массива.'),
        L('Offset pagination shifts rows as soon as the collection changes.', 'Пагинация по смещению сдвигает строки, как только коллекция меняется.'),
        L('A position is not an id, so pages must not invent one.', 'Позиция — не id, поэтому страницам нельзя его придумывать.'),
      ],
      code: `import { type EntityState } from '@reduxjs/toolkit';
import { postsAdapter, type Post } from './postsSlice';

interface Page { ids: string[]; nextCursor: string | null; status: 'idle' | 'loading' | 'loaded' }
type PagesState = Record<string, Page>;

// A page holds ids and a cursor, the adapter holds the entities.
function storePage(
  pages: PagesState,
  entities: EntityState<Post, string>,
  key: string,
  received: Post[],
  nextCursor: string | null,
) {
  return {
    entities: postsAdapter.setAll(entities, received),
    pages: {
      ...pages,
      [key]: { ids: received.map((post) => post.id), nextCursor, status: 'loaded' },
    },
  };
}`,
      table: {
        caption: L('Offset pagination against cursor pagination', 'Пагинация по смещению и по курсору'),
        headers: [L('Approach', 'Подход'), L('Cursor', 'Курсор'), L('Stable under changes', 'Стабилен при изменениях'), L('Cost', 'Цена')],
        rows: [
          [
            L('offset', 'смещение'),
            L('no', 'нет'),
            L('no', 'нет'),
            L('the count of the skipped rows', 'подсчёт пропущенных строк'),
          ],
          [
            L('page number', 'номер страницы'),
            L('no', 'нет'),
            L('no', 'нет'),
            L('the count of the skipped rows', 'подсчёт пропущенных строк'),
          ],
          [
            L('cursor', 'курсор'),
            L('yes', 'да'),
            L('yes', 'да'),
            L('one extra value in the query', 'одно лишнее значение в запросе'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The index as an id', 'Индекс как id'),
          text: L(
            'ids: rows.map((row, index) => String(index)) makes the id of a row depend on its position. The same row gets another id after an insertion, so the map holds two copies and the update reaches only one of them.',
            'ids: rows.map((row, index) => String(index)) делает id строки зависимым от её позиции. После вставки у той же строки меняется id, поэтому в карте оказываются две копии, а обновление доходит только до одной.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the pages next to the entities', 'Держите страницы рядом с сущностями'),
          text: L(
            'The two live in different slices of the same feature: the adapter with the entities, the pages with the cursors. Same feature folder, same file if you like, but two separate pieces of state with two separate rules.',
            'Они живут в разных слайсах одной фичи: адаптер с сущностями, страницы с курсорами. Одна папка фичи, даже один файл, но два отдельных куска состояния с двумя отдельными правилами.'
          ),
        },
      ],
      takeaway: L(
        'Let the pages hold ids and cursors and let the adapter hold the entities, so a page never stores a second copy of an object.',
        'Пусть страницы хранят id и курсоры, а адаптер — сущности, чтобы страница никогда не хранила вторую копию объекта.'
      ),
      seeAlso: [
        L('Section 6-5: deduplicating by id', 'Секция 6-5: дедупликация по id'),
        L('Section 6-1: normalised state', 'Секция 6-1: нормализованное состояние'),
        L('Section 5-4: mutations and invalidation strategies', 'Секция 5-4: мутации и стратегии инвалидации'),
      ],
    },
    {
      id: 'redux-ch6-s5',
      title: L('Deduplicating by id', 'Дедупликация по id'),
      body: L(
        'The map is keyed by the id, so an entity is stored once by construction. addOne ignores an entity whose id is already in the map, setOne replaces what is there, and upsertOne does either of those depending on what it finds. The same post that arrives in two responses updates one entry of the map, and the array of ids keeps a single reference to it.\n\nThat is what makes the adapter safe with overlapping pages, with a websocket message that repeats a record, and with a refetch that returns the same data as the cached copy. The deduplication is not a feature you implement, it is a consequence of the shape.\n\nThe failure mode is the id. If the client creates the id before the server answers, and the server answers with a different id, the map now holds two entries for one post: the temporary one and the real one. The fix is to treat the server id as the only identity: remove the temporary entry, or, better, never put a temporary entry in the map and keep the pending item in the local state of the form that is being submitted.\n\nA second failure mode is the selectId function. If it returns a value that is not unique, for example the title of the post, the second entity silently replaces the first one, and no error is thrown anywhere.',
        'Карта построена по id, поэтому сущность хранится один раз по построению. addOne игнорирует сущность, чей id уже есть в карте, setOne заменяет то, что там лежит, а upsertOne делает одно из двух в зависимости от того, что нашёл. Один и тот же пост, пришедший в двух ответах, обновляет одну запись карты, и массив id хранит ровно одну ссылку на него.\n\nИменно поэтому адаптер безопасен при пересекающихся страницах, при сообщении из вебсокета, повторяющем запись, и при перезапросе, который возвращает те же данные, что лежат в кэше. Дедупликация — не функция, которую вы реализуете, а следствие формы.\n\nФорма отказа — это id. Если клиент создаёт id до ответа сервера, а сервер отвечает другим id, в карте оказываются две записи об одном посте: временная и настоящая. Лечится это тем, что единственной идентичностью считается серверный id: временную запись удаляют. Лучше — вообще не класть временную запись в карту, а держать ожидающий элемент в локальном состоянии отправляемой формы.\n\nВторая форма отказа — функция selectId. Если она возвращает неуникальное значение, например заголовок поста, вторая сущность молча заменяет первую, и нигде не возникает ошибки.'
      ),
      bullets: [
        L('The map is keyed by the id, so an entity is stored once.', 'Карта построена по id, поэтому сущность хранится один раз.'),
        L('addOne ignores a duplicate, setOne replaces, upsertOne does both.', 'addOne игнорирует дубликат, setOne заменяет, upsertOne делает и то и другое.'),
        L('Overlapping pages and repeated messages are safe by construction.', 'Пересекающиеся страницы и повторные сообщения безопасны по построению.'),
        L('The server id is the only identity, a temporary id duplicates the entity.', 'id сервера — единственная идентичность, временный id дублирует сущность.'),
        L('selectId must return a unique value or entities overwrite each other.', 'selectId должен возвращать уникальное значение, иначе сущности затирают друг друга.'),
      ],
      code: `import { createEntityAdapter } from '@reduxjs/toolkit';
import type { Post } from './postsSlice';

// The id type is named explicitly when the field is called something else.
const postsAdapter = createEntityAdapter<Post, string>({
  selectId: (post) => post.id,
});

// The same id updates one entry instead of adding a second one.
const state = postsAdapter.upsertOne(
  postsAdapter.getInitialState(),
  { id: 'a', title: 'First' },
);
const renamed = postsAdapter.upsertOne(state, { id: 'a', title: 'Renamed' });

renamed.ids.length;   // 1 - one entry, not two
renamed.entities.a.title; // 'Renamed'

// A client id that the server does not know duplicates the entity.
const withTemp = postsAdapter.addOne(state, { id: 'tmp-1', title: 'Draft' });
withTemp.ids.length; // 2 - two entries for the same post`,
      table: {
        caption: L('What happens when the id already exists', 'Что происходит, когда id уже существует'),
        headers: [L('Method', 'Метод'), L('The entity in the map', 'Сущность в карте'), L('Result', 'Результат')],
        rows: [
          [
            L('addOne', 'addOne'),
            L('is already there', 'уже есть'),
            L('nothing changes', 'ничего не меняется'),
          ],
          [
            L('setOne', 'setOne'),
            L('is already there', 'уже есть'),
            L('the entity is replaced', 'сущность заменяется'),
          ],
          [
            L('upsertOne', 'upsertOne'),
            L('is already there', 'уже есть'),
            L('the entity is updated', 'сущность обновляется'),
          ],
          [
            L('removeOne', 'removeOne'),
            L('is already there', 'уже есть'),
            L('the entity is deleted', 'сущность удаляется'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two entries for one post', 'Две записи об одном посте'),
          text: L(
            'The temporary id and the server id both stay in the map, so the list shows the draft and the saved copy. Removing the temporary entry right after the answer arrives is what keeps the collection clean.',
            'Временный id и серверный id остаются в карте обе, и список показывает и черновик, и сохранённую копию. Чистит коллекцию удаление временной записи сразу после ответа.'
          ),
        },
        {
          tone: 'note',
          title: L('Deduplication is a shape, not a check', 'Дедупликация — это форма, а не проверка'),
          text: L(
            'Nothing in the adapter compares the fields of the entity to decide whether it is the same one. The id is the whole answer, which is why the id has to come from the same place on both sides.',
            'Ничто в адаптере не сравнивает поля сущности, чтобы понять, та ли она. Ответ целиком в id, поэтому id должен приходить с одной и той же стороны.'
          ),
        },
      ],
      takeaway: L(
        'Let the server own the id and let the adapter deduplicate, because a client-side id is a second identity for the same thing.',
        'Отдайте id серверу, а дедупликацию поручите адаптеру: клиентский id — это вторая идентичность одной сущности.'
      ),
      seeAlso: [
        L('Section 6-4: pagination with an adapter', 'Секция 6-4: пагинация с адаптером'),
        L('Section 6-2: the entity adapter API', 'Секция 6-2: API адаптера сущностей'),
        L('Section 5-3: optimistic updates', 'Секция 5-3: оптимистичные обновления'),
      ],
    },
  ],
};
