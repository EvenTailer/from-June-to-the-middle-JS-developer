import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh02: Chapter = {
  id: 'router-ch2',
  title: L('Data in the URL', 'Данные в URL'),
  summary: L(
    'How path parameters, query strings, helper functions and location state each carry a different kind of data, and the rule that decides which one a value belongs to.',
    'Как параметры пути, строка запроса, вспомогательные функции и состояние навигации несут разные виды данных и по какому правилу решается, где должно лежать значение.'
  ),
  sections: [
    {
      id: 'router-ch2-s1',
      title: L('Path parameters with useParams', 'Параметры пути и useParams'),
      body: L(
        'A path parameter names a resource inside the URL, as in /users/42/posts/7. The router captures the values and hands them to the component through useParams, as an object of strings keyed by the names in the pattern. The value is always a string, even when it looks like a number, so anything that needs a real number or a date must be parsed and validated before it is used.\n\nThe rule for choosing between a path and a query parameter is about identity. If two values must produce two pages that can be linked, bookmarked and shared, the value belongs in the path. If it only filters or configures the current view, it belongs in the query string. A profile at /users/42 is addressable, while the same profile filtered to posts only is a different view of it and belongs behind a parameter.\n\nChanging a path parameter is a navigation. The old route is unmounted, the new one is mounted, the loaders run again, and the local state of the previous parameter is discarded. That is a feature when the parameter names a genuinely different thing and a nuisance when it is only a filter, which is one more reason to keep filters out of the path.\n\nAn optional segment, written as path "search/:query?", lets a single route serve both the empty and the filled URL without a redirect, which keeps the links to a search page uniform.',
        'Параметр пути называет ресурс внутри URL, как в /users/42/posts/7. Роутер перехватывает значения и отдаёт их компоненту через useParams как объект строк, ключи которого совпадают с именами в шаблоне. Значение всегда строка, даже когда выглядит как число, поэтому всё, что требует настоящего числа или даты, нужно разобрать и проверить заранее.\n\nПравило выбора между путём и параметром запроса касается идентичности. Если два значения должны давать две страницы, на которые можно дать ссылку, добавить в закладки и поделиться, значение принадлежит пути. Если оно лишь фильтрует или настраивает текущий вид, оно принадлежит строке запроса. Профиль по адресу /users/42 адресуем, а тот же профиль, отфильтрованный до одних постов, — другой его вид, и ему место за параметром.\n\nСмена параметра пути — это навигация. Старый маршрут размонтируется, новый монтируется, загрузчики выполняются заново, а локальное состояние прежнего параметра теряется. Это преимущество, когда параметр называет действительно другое, и помеха, когда он лишь фильтр, и это ещё одна причина держать фильтры вне пути.\n\nНеобязательный сегмент, записанный как path "search/:query?", позволяет одному маршруту обслуживать и пустой, и заполненный URL без перенаправления, из-за чего ссылки на страницу поиска остаются единообразными.'
      ),
      bullets: [
        L('useParams returns strings keyed by the names in the route pattern.', 'useParams возвращает строки по именам из шаблона маршрута.'),
        L('Path parameters identify the resource, query parameters configure the view.', 'Параметры пути определяют ресурс, параметры запроса настраивают вид.'),
        L('Parse and validate path parameters, they always arrive as strings.', 'Параметры пути нужно разбирать и проверять, они приходят строками.'),
        L('Changing a path parameter remounts the route and drops its local state.', 'Смена параметра пути перемонтирует маршрут и теряет его локальное состояние.'),
        L('An optional segment serves the empty and the filled URL from one route.', 'Необязательный сегмент обслуживает пустой и заполненный URL одним маршрутом.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/users/:userId/posts/:postId',
    loader: async ({ params }) => {
      const postId = Number(params.postId);
      if (!Number.isInteger(postId)) {
        throw new Response('Bad post id', { status: 400 });
      }
      return fetchPost(params.userId, postId);
    },
    element: <PostPage />,
  },
]);

function PostPage() {
  const { userId, postId } = useParams();
  return <Post userId={userId} postId={Number(postId)} />;
}`,
      table: {
        caption: L('Where a value belongs', 'Где должно жить значение'),
        headers: [L('Question', 'Вопрос'), L('Path parameter', 'Параметр пути'), L('Query parameter', 'Параметр запроса')],
        rows: [
          [
            L('Does it name the resource?', 'Называет ли он ресурс?'),
            L('yes', 'да'),
            L('no', 'нет'),
          ],
          [
            L('Must two values give two pages?', 'Должны ли два значения давать две страницы?'),
            L('yes', 'да'),
            L('no', 'нет'),
          ],
          [
            L('Does it change the page when it changes?', 'Меняет ли он страницу при изменении?'),
            L('yes, the route is remounted', 'да, маршрут перемонтируется'),
            L('no, the route stays', 'нет, маршрут остаётся'),
          ],
          [
            L('Does it filter or sort?', 'Фильтрует или сортирует ли он?'),
            L('no', 'нет'),
            L('yes', 'да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The string that looks like a number', 'Строка, похожая на число'),
          text: L(
            'useParams returns strings, so Number(id) can be NaN and the check "if (!id)" will not catch it. Parse once, validate the result, and throw a 400 for a value the server could never accept.',
            'useParams возвращает строки, поэтому Number(id) может оказаться NaN, и проверка "if (!id)" это не поймает. Разберите значение один раз, проверьте результат и бросьте 400 для значения, которого сервер принять не может.'
          ),
        },
      ],
      takeaway: L(
        'Put what identifies the page in the path, parse every parameter before you trust it, and keep filters in the query string.',
        'Кладите в путь то, что определяет страницу, разбирайте каждый параметр и держите фильтры в строке запроса.'
      ),
      seeAlso: [
        L('Section 2-2: query strings with useSearchParams', 'Секция 2-2: строка запроса и useSearchParams'),
        L('Section 2-5: choosing what lives in the URL', 'Секция 2-5: что живёт в URL'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
      ],
    },
    {
      id: 'router-ch2-s2',
      title: L('Query strings with useSearchParams', 'Строка запроса и useSearchParams'),
      body: L(
        'The query string after the question mark in the URL is the natural home for the state of a view: the current page of a table, a search term, a sort order, a date range. useSearchParams returns a pair, an object with a get method for reading and a setSearchParams function for writing. Writing replaces the current history entry by default, which keeps the back button from walking through every keystroke of a search.\n\nsetSearchParams accepts either a plain object, which replaces the whole query string, or a function that receives the current parameters and returns the next ones. The callback form makes partial updates possible: one parameter changes while the rest stay untouched. Reading a missing parameter returns null and not undefined, so a default has to be written explicitly at the call site instead of being inherited from a loose equality check.\n\nFilters in the query string have two concrete advantages over component state: the URL can be shared and bookmarked, and the back button restores the previous filter set. The cost is that every change of the query string is a navigation, so writing to it on each keystroke produces many history entries and many loader runs. The usual compromise is to keep the text field in local state and push the value into the URL on submit or on a debounce.',
        'Строка запроса после знака вопроса в URL — естественное место для состояния вида: текущая страница таблицы, поисковый запрос, сортировка, диапазон дат. useSearchParams возвращает пару: объект с методом get для чтения и функцию setSearchParams для записи. Запись по умолчанию заменяет текущую запись истории, благодаря чему кнопка «назад» не проходит по каждому нажатию клавиши в поиске.\n\nsetSearchParams принимает либо обычный объект, который заменяет строку запроса целиком, либо функцию, получающую текущие параметры и возвращающую следующие. Именно форма с функцией позволяет менять часть параметров: один параметр меняется, остальные остаются нетронутыми. Чтение отсутствующего параметра возвращает null, а не undefined, поэтому значение по умолчанию приходится задавать явно на месте вызова, а не получать случайно из нестрогого сравнения.\n\nФильтры, живущие в строке запроса, дают два конкретных преимущества перед состоянием компонента: ссылку на URL можно переслать и добавить в закладки, а кнопка «назад» восстанавливает предыдущий набор фильтров. Цена в том, что каждое изменение строки запроса — навигация, поэтому запись в неё на каждое нажатие клавиши порождает множество записей истории и множество запусков загрузчиков. Обычный компромисс: текстовое поле держится в локальном состоянии, а в URL значение попадает по отправке или с задержкой.'
      ),
      bullets: [
        L('The query string holds the state of the view: page, sort, filters, search.', 'Строка запроса хранит состояние вида: страница, сортировка, фильтры, поиск.'),
        L('useSearchParams returns a pair of the parameters and the setter.', 'useSearchParams возвращает пару из параметров и функции записи.'),
        L('setSearchParams replaces the query string unless you pass a callback.', 'setSearchParams заменяет строку запроса, если не передан обратный вызов.'),
        L('A missing parameter reads as null and not as undefined.', 'Отсутствующий параметр читается как null, а не undefined.'),
        L('Writing to the URL on every keystroke pollutes the history.', 'Запись в URL на каждое нажатие засоряет историю.'),
      ],
      code: `function UsersTable() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') ?? '1');
  const sort = params.get('sort') ?? 'createdAt';

  function changeSort(next) {
    setParams(
      (current) => {
        current.set('sort', next);
        current.set('page', '1');   // a new sort starts from the first page
        return current;
      },
      { replace: true },
    );
  }

  return <button onClick={() => changeSort('name')}>Sort by name</button>;
}`,
      table: {
        caption: L('Reading and writing the query string', 'Чтение и запись строки запроса'),
        headers: [L('Call', 'Вызов'), L('Effect', 'Эффект'), L('Note', 'Замечание')],
        rows: [
          [L('params.get("page")', 'params.get("page")'), L('reads one value', 'читает одно значение'), L('returns null when missing', 'возвращает null, если нет')],
          [L('params.getAll("tag")', 'params.getAll("tag")'), L('reads a repeated value', 'читает повторяемое значение'), L('returns an array', 'возвращает массив')],
          [L('setParams(object)', 'setParams(object)'), L('replaces the whole query', 'заменяет всю строку запроса'), L('drops unknown parameters', 'теряет неизвестные параметры')],
          [L('setParams(callback)', 'setParams(callback)'), L('updates parts of it', 'обновляет часть параметров'), L('keeps the rest intact', 'остальное оставляет как есть')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Replace for filters, push for pages', 'Replace для фильтров, push для страниц'),
          text: L(
            'A filter that narrows the current list usually replaces the history entry, so the back button returns to the previous page and not to the previous keystroke. A link to another page pushes, so the user can come back.',
            'Фильтр, сужающий текущий список, обычно заменяет запись истории, и кнопка «назад» возвращает на предыдущую страницу, а не на предыдущее нажатие клавиши. Ссылка на другую страницу добавляет запись, чтобы пользователь смог вернуться.'
          ),
        },
      ],
      takeaway: L(
        'Put the state of the view in the query string, read it through the hook and write it with replace when it is a filter.',
        'Держите состояние вида в строке запроса, читайте его через хук и записывайте через replace, если это фильтр.'
      ),
      seeAlso: [
        L('Section 2-1: path parameters with useParams', 'Секция 2-1: параметры пути и useParams'),
        L('Section 2-3: search parameter helpers and filters', 'Секция 2-3: вспомогательные функции и фильтры'),
        L('Section 6-2: revalidation strategies', 'Секция 6-2: стратегии ревалидации'),
      ],
    },
    {
      id: 'router-ch2-s3',
      title: L('Search parameter helpers and filters', 'Вспомогательные функции и фильтры'),
      body: L(
        'Reading parameters directly inside components spreads the parsing rules across the codebase. One component defaults a missing page number to 1, another defaults it to 0, and the difference shows up as a bug in a report nobody can reproduce. A small helper module keeps the rules in one place: a function that reads a parameter with a default, a function that toggles a filter, and a function that serialises a filter object back into a query string.\n\nThe helper should also decide how the URL is written. Replacing the whole query string on every change makes the code predictable but drops the parameters that the component does not know about, while merging keeps them and can carry a stale filter forever. A helper that reads and writes in one shape removes the temptation to do it by hand in every component.\n\nA filter that lives in the URL changes the route, so the loader that serves the list has to read the same parameters. The parsing belongs in a shared function used by both the loader and the component, otherwise the list on screen and the list the server returned can disagree about what is being shown. One parser, used twice, is the whole trick.',
        'Чтение параметров прямо в компонентах разбрасывает правила разбора по всему проекту. Один компонент считает, что отсутствующая страница равна 1, другой — что 0, и разница всплывает как баг в отчёте, который никто не может воспроизвести. Небольшой модуль-помощник держит правила в одном месте: функция, читающая параметр со значением по умолчанию, функция, переключающая фильтр, и функция, превращающая объект фильтров обратно в строку запроса.\n\nПомощник должен решать и то, как пишется URL. Замена всей строки запроса при каждом изменении делает код предсказуемым, но теряет параметры, о которых компонент не знает, а слияние сохраняет их и может навсегда тащить за собой устаревший фильтр. Помощник, который читает и пишет в одной форме, снимает соблазн делать это руками в каждом компоненте.\n\nФильтр, живущий в URL, меняет маршрут, поэтому загрузчик, отдающий список, обязан читать те же параметры. Разбор должен лежать в общей функции, которой пользуются и загрузчик, и компонент, иначе список на экране и список, полученный от сервера, могут описывать разное. Один разборщик, использованный дважды, — это и есть весь приём.'
      ),
      bullets: [
        L('Helpers keep the defaults and the parsing of parameters in one module.', 'Помощники держат значения по умолчанию и разбор параметров в одном модуле.'),
        L('A missing page number must default the same way everywhere.', 'Отсутствующий номер страницы должен по умолчанию трактоваться одинаково везде.'),
        L('Choose between replace and merge once, inside the helper.', 'Выбор между заменой и слиянием делается один раз, внутри помощника.'),
        L('The loader and the component must parse filters with the same function.', 'Загрузчик и компонент должны разбирать фильтры одной функцией.'),
        L('A serialised filter object must round-trip to the same URL.', 'Сериализованный объект фильтров должен возвращаться в тот же URL.'),
      ],
      code: `// filters.js - one module that owns the filter contract
export function readFilters(params) {
  return {
    page: Math.max(1, Number(params.get('page') ?? '1')),
    query: params.get('q') ?? '',
    tags: params.getAll('tag'),        // a repeatable parameter
  };
}

export function writeFilters(filters) {
  const params = new URLSearchParams();
  params.set('page', String(filters.page));
  if (filters.query) params.set('q', filters.query);
  for (const tag of filters.tags) params.append('tag', tag);
  return params;
}`,
      table: {
        caption: L('What a helper module should contain', 'Что должно быть в модуле-помощнике'),
        headers: [L('Function', 'Функция'), L('Responsibility', 'Ответственность'), L('Used by', 'Кто использует')],
        rows: [
          [L('readFilters', 'readFilters'), L('parse and validate the parameters', 'разбор и проверка параметров'), L('loader and component', 'загрузчик и компонент')],
          [L('writeFilters', 'writeFilters'), L('serialise the filters back', 'сериализация фильтров обратно'), L('every control that changes a filter', 'каждый контрол, меняющий фильтр')],
          [L('toggleFilter', 'toggleFilter'), L('add or remove one value', 'добавить или убрать одно значение'), L('checkboxes and tags', 'чекбоксы и теги')],
          [L('isFilterActive', 'isFilterActive'), L('decide what is checked', 'решить, что отмечено'), L('the controls themselves', 'сами контролы')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The loader must parse too', 'Загрузчик тоже должен разбирать'),
          text: L(
            'If the component parses the filters and the loader parses them separately, the two can disagree and the screen shows a list the server never sent. Parse once and pass the result to both.',
            'Если компонент и загрузчик разбирают фильтры по-разному, они могут разойтись, и на экране окажется список, которого сервер не присылал. Разберите один раз и передайте результат обоим.'
          ),
        },
      ],
      takeaway: L(
        'Move the parsing and the writing of search parameters into one helper module and use it from both the loader and the component.',
        'Вынесите разбор и запись параметров в один модуль-помощник и используйте его и в загрузчике, и в компоненте.'
      ),
      seeAlso: [
        L('Section 2-2: query strings with useSearchParams', 'Секция 2-2: строка запроса и useSearchParams'),
        L('Section 2-5: choosing what lives in the URL', 'Секция 2-5: что живёт в URL'),
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кеш загрузчиков и ревалидация'),
      ],
    },
    {
      id: 'router-ch2-s4',
      title: L('Location state and its limits', 'Состояние навигации и его пределы'),
      body: L(
        'useLocation returns the current location: the pathname, the search string, the hash and a state object. The state is set by whoever performed the navigation, through the state prop of Link or the second argument of navigate. It is the one part of the URL the user cannot see, which makes it a good carrier for data about the transition rather than the destination: where the user came from, which row was clicked, a flash message.\n\nThe catch is that location state is not durable. It lives in the history entry, so it survives a reload of that entry in some browsers, but it disappears when the page is opened in a new tab, when the address is shared, and when the destination is reached in any other way. Anything the user must be able to see after a refresh or after copying the address cannot live there.\n\nThe decision comes down to a short checklist. Should a colleague who receives the link see the same screen? Then it belongs in the URL. Should the back button restore the previous variant of the screen? Then it belongs in the URL too. Is the data only useful for the navigation that just happened, such as a toast or a scroll target? Then it is state, and state is exactly the right tool.',
        'useLocation возвращает текущее местоположение: pathname, строку запроса, хеш и объект state. Состояние задаёт тот, кто выполнил навигацию, через проп state у Link или через второй аргумент navigate. Это единственная часть URL, которой пользователь не видит, а значит она удобный носитель данных о переходе, а не о назначении: откуда пришёл пользователь, какую строку нажали, всплывающее сообщение.\n\nЗагвоздка в том, что состояние местоположения недолговечно. Оно живёт в записи истории, поэтому в некоторых браузерах переживает перезагрузку той же записи, но исчезает, когда страницу открывают в новой вкладке, когда адрес передают другому и когда на страницу попадают любым другим путём. Всё, что пользователь должен увидеть после обновления или после копирования адреса, там жить не может.\n\nРешение сводится к короткому списку. Должен ли коллега, получивший ссылку, увидеть тот же экран? Тогда это место в URL. Должна ли кнопка «назад» восстанавливать предыдущий вариант экрана? Тоже в URL. Нужны ли данные только для того перехода, который только что произошёл, например тост или цель прокрутки? Тогда это состояние, и состояние здесь — ровно подходящий инструмент.'
      ),
      bullets: [
        L('Location state describes the transition and not the destination.', 'Состояние местоположения описывает переход, а не назначение.'),
        L('State travels in the history entry, not in the address.', 'Состояние живёт в записи истории, а не в адресе.'),
        L('State is lost when the URL is opened fresh, shared or bookmarked.', 'Состояние теряется, когда URL открывают заново, передают или добавляют в закладки.'),
        L('Anything that must survive a reload belongs in the URL.', 'Всё, что должно пережить перезагрузку, принадлежит URL.'),
        L('State suits toasts, return targets and scroll hints.', 'Состояние подходит для тостов, точки возврата и подсказок прокрутки.'),
      ],
      code: `<Link to={'/users/' + user.id} state={{ from: '/team', highlight: true }}>
  {user.name}
</Link>

function UserPage() {
  const location = useLocation();
  const state = location.state as { highlight?: boolean } | null;

  return <Profile highlighted={state?.highlight === true} />;
}`,
      table: {
        caption: L('Location state against the URL', 'Состояние навигации против URL'),
        headers: [L('Property', 'Свойство'), L('URL', 'URL'), L('Location state', 'Состояние навигации')],
        rows: [
          [L('Visible to the user', 'Видно пользователю'), L('yes', 'да'), L('no', 'нет')],
          [L('Survives a reload', 'Переживает перезагрузку'), L('yes', 'да'), L('not reliably', 'не гарантированно')],
          [L('Survives sharing the link', 'Переживает отправку ссылки'), L('yes', 'да'), L('no', 'нет')],
          [L('Reaches the user through the back button', 'Возвращается кнопкой «назад»'), L('yes', 'да'), L('no', 'нет')],
          [L('Cost of storing it', 'Цена хранения'), L('a visible URL', 'видимый URL'), L('a hidden entry', 'скрытая запись')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('State is not a cache', 'Состояние — это не кеш'),
          text: L(
            'Code that reads the value from the state and expects it to be there on the next visit will fail the first time the page is opened directly. If the value is required, read it from a loader or from the URL.',
            'Код, который читает значение из состояния и ждёт его при следующем визите, сломается при первом же прямом открытии страницы. Если значение обязательно, берите его из загрузчика или из URL.'
          ),
        },
      ],
      takeaway: L(
        'Location state decorates a transition, and anything that must survive a reload has to live in the URL.',
        'Состояние навигации украшает переход, а всё, что должно пережить перезагрузку, обязано жить в URL.'
      ),
      seeAlso: [
        L('Section 2-5: choosing what lives in the URL', 'Секция 2-5: что живёт в URL'),
        L('Section 1-5: programmatic navigation', 'Секция 1-5: программная навигация'),
        L('Section 4-4: handling unauthenticated responses', 'Секция 4-4: обработка неавторизованных ответов'),
      ],
    },
    {
      id: 'router-ch2-s5',
      title: L('Choosing what lives in the URL', 'Что живёт в URL'),
      body: L(
        'Everything that describes the page belongs in the URL: the resource in the path, the configuration of the view in the query string, the anchor in the hash. Everything else belongs in component state, in a store or on the server. The test is not whether the value is important, but whether the user can arrive at the same screen by other means: a link, a bookmark, a reload, the back button.\n\nPutting too much in the URL is not free. A long query string ends up in server logs, in the referer header and in the browser history, so a secret must never be there. Putting too little in it means the screen cannot be reproduced, and a support request that says the filter is wrong cannot be diagnosed if the filter was never in the address.\n\nThe practical convention is to keep the URL a complete description of the current view and keep transient interaction state out of it: an open panel, a hovered row, a draft in a text field. Those live in React state and are lost on reload by design, because nobody wants a button to still look pressed after a refresh.',
        'Всё, что описывает страницу, принадлежит URL: ресурс — пути, настройка вида — строке запроса, якорь — хешу. Всё остальное живёт в состоянии компонента, в сторе или на сервере. Проверка не в том, насколько значение важно, а в том, может ли пользователь попасть на тот же экран другими путями: по ссылке, из закладок, после перезагрузки, кнопкой «назад».\n\nКласть слишком много в URL тоже не бесплатно. Длинная строка запроса попадает в логи сервера, в заголовок referer и в историю браузера, поэтому секрет там находиться не должен. А слишком мало — значит, экран невозможно воспроизвести, и обращение в поддержку с жалобой на неверный фильтр невозможно разобрать, если фильтра не было в адресе.\n\nПрактическое соглашение: URL остаётся полным описанием текущего вида, а мимолётное состояние взаимодействия в него не попадает: открытая панель, подсвеченная строка, черновик в текстовом поле. Всё это живёт в состоянии React и теряется при перезагрузке намеренно, потому что никто не хочет, чтобы после обновления кнопка оставалась нажатой.'
      ),
      bullets: [
        L('The URL should fully describe the current view.', 'URL должен полностью описывать текущий вид.'),
        L('The path names the resource, the query string configures the view.', 'Путь называет ресурс, строка запроса настраивает вид.'),
        L('Never put a secret in the query string, it lands in logs and headers.', 'Никогда не кладите секрет в строку запроса, она попадает в логи и заголовки.'),
        L('Transient interaction state belongs in React state.', 'Мимолётное состояние взаимодействия принадлежит состоянию React.'),
        L('A screen that cannot be reproduced from the URL cannot be supported.', 'Экран, который нельзя воспроизвести по URL, нельзя поддержать.'),
      ],
      code: `// The URL describes the screen
<Link to="/users/42?tab=posts&sort=new">Posts</Link>

// The component state describes the interaction
const [isPanelOpen, setPanelOpen] = useState(false);
const [draft, setDraft] = useState('');

// The server holds what must never be in the address
const session = await loadSession(request);`,
      table: {
        caption: L('Where each kind of state belongs', 'Где живёт каждый вид состояния'),
        headers: [L('Kind of state', 'Вид состояния'), L('Where it lives', 'Где живёт'), L('Survives a reload', 'Переживает перезагрузку'), L('Shareable', 'Можно поделиться')],
        rows: [
          [L('The resource that is open', 'Открытый ресурс'), L('the path', 'путь'), L('yes', 'да'), L('yes', 'да')],
          [L('Filters and sorting', 'Фильтры и сортировка'), L('the query string', 'строка запроса'), L('yes', 'да'), L('yes', 'да')],
          [L('Details of a transition', 'Детали перехода'), L('location state', 'состояние навигации'), L('no', 'нет'), L('no', 'нет')],
          [L('An open panel, a draft', 'Открытая панель, черновик'), L('component state', 'состояние компонента'), L('no', 'нет'), L('no', 'нет')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The URL is a public document', 'URL — публичный документ'),
          text: L(
            'Everything in the address can end up in a screenshot, in a chat message and in the history of a shared computer. Treat the URL as something you would be comfortable seeing in a bug report.',
            'Всё, что попало в адрес, может оказаться на скриншоте, в сообщении в чате и в истории общего компьютера. Относитесь к URL как к документу, который не стыдно увидеть в отчёте об ошибке.'
          ),
        },
      ],
      takeaway: L(
        'Keep the URL a complete description of the current screen and keep transient interaction state out of it.',
        'Пусть URL полностью описывает текущий экран, а мимолётное состояние взаимодействия остаётся за его пределами.'
      ),
      seeAlso: [
        L('Section 2-1: path parameters with useParams', 'Секция 2-1: параметры пути и useParams'),
        L('Section 2-2: query strings with useSearchParams', 'Секция 2-2: строка запроса и useSearchParams'),
        L('Section 2-4: location state and its limits', 'Секция 2-4: состояние навигации и его пределы'),
      ],
    },
  ],
};
