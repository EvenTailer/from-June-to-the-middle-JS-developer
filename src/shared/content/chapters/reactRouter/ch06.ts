import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const routerCh06: Chapter = {
  id: 'router-ch6',
  title: L('Data fetching patterns with routers', 'Паттерны загрузки данных в роутере'),
  summary: L(
    'How the router caches what the loaders returned, when it refetches it, how an interface can show a change before the server confirms it, and when a dedicated query library is the better tool.',
    'Как роутер кэширует то, что вернули загрузчики, когда он перезапрашивает данные, как интерфейс может показать изменение до подтверждения сервером и когда отдельная query-библиотека полезнее.'
  ),
  sections: [
    {
      id: 'router-ch6-s1',
      title: L('The loader cache and revalidation', 'Кэш загрузчиков и ревалидация'),
      body: L(
        'The router keeps the result of every loader in memory, keyed by the id of the route that produced it. That cache is the reason a back navigation shows the old page at once instead of flashing a spinner: the data of the previous entry is already there, and the router refetches it in the background while the screen shows the old content. The cache lives as long as the router instance, so a reload of the page starts from nothing.\n\nRevalidation is the moment when the router calls the loaders again. It happens after an action, because the action may have changed the data the loaders read, and it happens on a navigation to a route whose data was never loaded. The router decides which loaders to call, and by default it calls all of them for the routes that are currently matched.\n\nThe result of a revalidation is that the screen updates without a navigation, which is exactly what a user expects after saving a form. The default decision is coarse, though: a small change to one record refetches the whole page. The route property shouldRevalidate lets a route answer the question for itself, and the arguments it receives describe the transition in enough detail to make a precise decision.\n\nTwo mistakes follow from not knowing how the cache works. The first is reading the same resource in a loader and again in a component, which produces two requests and two copies of the data. The second is treating a revalidation as a bug: if the list updates itself after a save, that is the router keeping its promise and not a race condition.',
        'Роутер держит результат каждого загрузчика в памяти, ключуя его по id маршрута, который этот результат вернул. Именно из-за этого возврат назад показывает прежнюю страницу сразу, а не мигает спиннером: данные предыдущей записи уже на месте, и роутер перезапрашивает их в фоне, пока экран показывает старые данные. Кэш живёт столько же, сколько экземпляр роутера, поэтому перезагрузка страницы начинает с нуля.\n\nРевалидация — это момент, когда роутер снова вызывает загрузчики. Она происходит после action, потому что действие могло изменить данные, которые читают загрузчики, и она происходит при переходе к маршруту, чьи данные ещё не загружались. Роутер сам решает, какие загрузчики вызвать, и по умолчанию вызывает их все для маршрутов, которые сейчас совпали.\n\nРезультат ревалидации в том, что экран обновляется без навигации, и это ровно то, чего ждёт пользователь после сохранения формы. Но решение по умолчанию слишком грубое: маленькое изменение одной записи перезапрашивает всю страницу. Свойство маршрута shouldRevalidate позволяет маршруту ответить на этот вопрос за себя, а аргументы, которые он получает, описывают переход достаточно подробно, чтобы решение было точным.\n\nДве ошибки следуют из незнания того, как работает кэш. Первая — прочитать один и тот же ресурс в загрузчике и ещё раз в компоненте, что даёт два запроса и две копии данных. Вторая — считать ревалидацию багом: если список обновляется сам после сохранения, это роутер выполняет своё обещание, а не гонка.'
      ),
      bullets: [
        L('The loader cache is keyed by route id and lives as long as the router.', 'Кэш загрузчиков ключуется id маршрута и живёт столько же, сколько роутер.'),
        L('Revalidation runs after every action for the currently matched routes.', 'Ревалидация выполняется после каждого action для текущих совпавших маршрутов.'),
        L('The router revalidates in the background and keeps the old data on screen.', 'Роутер ревалидирует в фоне и оставляет старые данные на экране.'),
        L('shouldRevalidate lets a route narrow or skip the refetch.', 'shouldRevalidate позволяет маршруту сузить или отменить перезагрузку.'),
        L('Reading the same resource twice creates two copies of the data.', 'Двойное чтение одного ресурса создаёт две копии данных.'),
      ],
      code: `const router = createBrowserRouter([
  {
    path: '/users/:id',
    loader: ({ params }) => fetchUser(params.id),
    action: ({ request }) => saveUser(request.formData()),
    shouldRevalidate: ({ formMethod, defaultShouldRevalidate }) => {
      if (formMethod && formMethod !== 'GET') return true;   // after a write
      return defaultShouldRevalidate;                        // otherwise the default
    },
    element: <UserPage />,
  },
]);

function UserPage() {
  const user = useLoaderData();
  return <Profile user={user} />;
}`,
      table: {
        caption: L('What happens on each kind of navigation', 'Что происходит при разных навигациях'),
        headers: [L('Event', 'Событие'), L('Loaders called', 'Какие загрузчики вызваны'), L('Screen', 'Экран')],
        rows: [
          [
            L('First visit to a route', 'Первый заход на маршрут'),
            L('its loader', 'его загрузчик'),
            L('the route renders with the data', 'маршрут рисуется с данными'),
          ],
          [
            L('Back to a visited route', 'Возврат на посещённый маршрут'),
            L('its loader, in the background', 'его загрузчик, в фоне'),
            L('the old data shows immediately', 'старые данные видны сразу'),
          ],
          [
            L('After an action', 'После action'),
            L('all matched loaders', 'все совпавшие загрузчики'),
            L('the screen updates in place', 'экран обновляется на месте'),
          ],
          [
            L('shouldRevalidate returns false', 'shouldRevalidate вернул false'),
            L('none', 'ни один'),
            L('the screen keeps the old data', 'экран сохраняет старые данные'),
          ],
          [
            L('Reload of the page', 'Перезагрузка страницы'),
            L('every matched loader', 'все совпавшие загрузчики'),
            L('the application starts from scratch', 'приложение стартует с нуля'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two requests for one resource', 'Два запроса на один ресурс'),
          text: L(
            'A loader that fetches the user and a component that fetches the same user again produce two requests and two copies of the state. The loader is the only place that should read the data, and useLoaderData is the only way to get it.',
            'Загрузчик, который берёт пользователя, и компонент, который берёт его же ещё раз, дают два запроса и две копии состояния. Загрузчик — единственное место, где нужно читать данные, и useLoaderData — единственный способ их получить.'
          ),
        },
        {
          tone: 'note',
          title: L('The cache is not a cache', 'Этот кэш не переживает перезагрузку'),
          text: L(
            'Nothing in the loader cache survives a reload of the page, and nothing is written to disk. If a value must survive, it belongs in the server, in the URL, or in a storage of your own.',
            'Ничто из кэша загрузчиков не переживает перезагрузку страницы, и ничего не пишется на диск. Если значение должно пережить перезагрузку, ему место на сервере, в URL или в собственном хранилище.'
          ),
        },
      ],
      takeaway: L(
        'Read every resource in a loader, let the router own the copy, and use shouldRevalidate only to remove requests that are provably useless.',
        'Читайте каждый ресурс в загрузчике, отдайте копию во владение роутера, а shouldRevalidate используйте только чтобы убрать заведомо лишние запросы.'
      ),
      seeAlso: [
        L('Section 6-2: revalidation strategies', 'Секция 6-2: стратегии ревалидации'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
        L('Section 5-4: preloading on intent', 'Секция 5-4: предзагрузка по намерению'),
      ],
    },
    {
      id: 'router-ch6-s2',
      title: L('Revalidation strategies', 'Стратегии ревалидации'),
      body: L(
        'Revalidation is a question with one argument: should this route refetch its data right now. The router asks it on every navigation and after every action, and the default answer is yes. A route can answer for itself with shouldRevalidate, and the arguments describe the transition: the current and the next URL, the parameters, the form method and the form action, the result of the action, and the decision the router would have made by itself.\n\nThe common case is to skip the refetch when nothing could have changed. A route that renders a static form does not need to refetch after a mutation somewhere else, so it returns false for that case and true for everything else. The opposite case is just as common: a route that owns a resource and must be fresh after any write returns true for every form method other than GET. Both are one-line functions, and both save requests on every navigation.\n\nThe second lever is useRevalidator, which lets a component ask for a refresh on demand: a button labelled refresh, a filter that changed on the server, a message from a websocket that announced a new version. It returns the state of the request, so the button can show a spinner while the reload runs, and the component receives the fresh data without a navigation and without a new entry in the history.\n\nThe trap is fighting the router. If a loader refetches what the router is about to refetch, the request happens twice; if the component keeps its own copy of the data, the copy drifts away from the truth; if shouldRevalidate always returns false, the screen shows yesterday. Use the cycle the router already provides: a loader for the data, an action for the writes, shouldRevalidate for the exceptions and useRevalidator for the manual refresh.',
        'Ревалидация — это вопрос с одним аргументом: нужно ли этому маршруту сейчас перезапросить свои данные. Роутер спрашивает его при каждой навигации и после каждого action, а ответ по умолчанию — да. Маршрут может ответить за себя через shouldRevalidate, и аргументы описывают переход: текущий и следующий URL, параметры, метод и адрес формы, результат action и то решение, которое роутер принял бы сам.\n\nОбычный случай — пропустить перезагрузку, когда измениться ничего не могло. Маршрут со статичной формой не обязан перезапрашивать данные после мутации в другой ветке, поэтому он возвращает false для этого случая и true для всех остальных. Противоположный случай встречается не реже: маршрут, который владеет ресурсом и должен быть свежим после любой записи, возвращает true для всех методов формы, кроме GET. Оба случая — однострочные функции, и оба экономят запросы при каждой навигации.\n\nВторой рычаг — useRevalidator, который позволяет компоненту запросить обновление по требованию: кнопка «обновить», фильтр, изменившийся на сервере, сообщение из вебсокета о новой версии. Он возвращает состояние запроса, поэтому кнопка может показать спиннер, пока идёт перезагрузка, а компонент получает свежие данные без навигации и без новой записи в истории.\n\nЛовушка — бороться с роутером. Если загрузчик перезапрашивает то, что роутер собирается перезапросить, запрос произойдёт дважды; если компонент держит свою копию данных, копия разъедется с правдой; если shouldRevalidate всегда возвращает false, экран покажет вчерашнее. Пользуйтесь тем циклом, который роутер уже даёт: загрузчик для данных, action для записей, shouldRevalidate для исключений и useRevalidator для ручного обновления.'
      ),
      bullets: [
        L('shouldRevalidate receives the URLs, the form method, the action result and the default decision.', 'shouldRevalidate получает URL, метод формы, результат action и решение по умолчанию.'),
        L('Return false for the transitions that cannot change your data.', 'Возвращайте false для переходов, которые не могут изменить ваши данные.'),
        L('useRevalidator triggers a refresh without a navigation.', 'useRevalidator запускает обновление без навигации.'),
        L('The revalidation state tells you when the refresh is running.', 'Состояние ревалидации показывает, идёт ли обновление.'),
        L('Never keep a second copy of what the loader returned.', 'Никогда не держите вторую копию того, что вернул загрузчик.'),
      ],
      code: `function FilterBar() {
  const revalidator = useRevalidator();
  const busy = revalidator.state !== 'idle';

  return (
    <button type="button" onClick={() => revalidator.revalidate()} disabled={busy}>
      {busy ? 'Refreshing...' : 'Refresh'}
    </button>
  );
}

const routes = [
  {
    path: '/stats',
    loader: loadStats,
    shouldRevalidate: ({ formMethod, defaultShouldRevalidate }) => {
      if (formMethod && formMethod !== 'GET') return true;
      return defaultShouldRevalidate;
    },
    element: <StatsPage />,
  },
];`,
      table: {
        caption: L('When to revalidate', 'Когда перезапрашивать'),
        headers: [L('Situation', 'Ситуация'), L('Tool', 'Инструмент'), L('Effect', 'Эффект')],
        rows: [
          [
            L('A write happened on this route', 'Запись произошла на этом маршруте'),
            L('shouldRevalidate returns true', 'shouldRevalidate вернул true'),
            L('the data is refreshed', 'данные обновляются'),
          ],
          [
            L('A write happened elsewhere', 'Запись произошла в другом месте'),
            L('shouldRevalidate returns false', 'shouldRevalidate вернул false'),
            L('the screen keeps the old copy', 'экран сохраняет старую копию'),
          ],
          [
            L('The URL changed', 'Сменился URL'),
            L('defaultShouldRevalidate', 'defaultShouldRevalidate'),
            L('the usual behaviour', 'обычное поведение'),
          ],
          [
            L('The user pressed refresh', 'Пользователь нажал обновить'),
            L('useRevalidator', 'useRevalidator'),
            L('the data is refreshed in place', 'данные обновляются на месте'),
          ],
          [
            L('The last load failed', 'Последняя загрузка упала'),
            L('shouldRevalidate returns true', 'shouldRevalidate вернул true'),
            L('the error is not sticky', 'ошибка не залипает'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Revalidation is not free', 'Ревалидация не бесплатна'),
          text: L(
            'Every revalidation is a network request. A route that answers true to everything turns one save into a burst of requests to every matched route, and the slowest one decides how long the user waits.',
            'Каждая ревалидация это сетевой запрос. Маршрут, который всегда отвечает true, превращает одно сохранение в залп запросов ко всем совпавшим маршрутам, и длительность ожидания определяет самый медленный из них.'
          ),
        },
        {
          tone: 'tip',
          title: L('One owner per resource', 'У каждого ресурса один владелец'),
          text: L(
            'Let the route that owns a resource also answer the revalidation question for it. Spreading the decision across components makes the caching behaviour impossible to reason about.',
            'Пусть о вопросе ревалидации для ресурса отвечает тот маршрут, который этим ресурсом владеет. Если решение разбросано по компонентам, поведение кэша становится непредсказуемым.'
          ),
        },
      ],
      takeaway: L(
        'Answer the revalidation question in the route that owns the data, and use useRevalidator for the refresh the user asks for.',
        'Отвечайте на вопрос ревалидации в маршруте, который владеет данными, а useRevalidator оставляйте для обновления, о котором попросил пользователь.'
      ),
      seeAlso: [
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кэш загрузчиков и ревалидация'),
        L('Section 6-4: mutations and error handling', 'Секция 6-4: мутации и обработка ошибок'),
        L('Section 3-4: forms, fetchers and progressive enhancement', 'Секция 3-4: формы, fetcher и прогрессивное улучшение'),
      ],
    },
    {
      id: 'router-ch6-s3',
      title: L('Optimistic UI with actions', 'Оптимистичный UI с actions'),
      body: L(
        'An optimistic interface shows the result of a write before the server has confirmed it. The user clicks the star, the count goes up at once, and if the request fails the change is rolled back. The technique is not a router feature, but the router gives it exactly what it needs: while a submission is in flight, the navigation and the fetcher objects carry the form data of that request.\n\nTwo implementations are common. The navigation approach reads the form data of the navigation while its state is submitting and derives the pending state from it, and it fits a form that changes the route as a whole. The fetcher approach reads the form data of the fetcher for a background submission that does not navigate, and that is the right tool for a button inside a list.\n\nThe rollback is the hard part and it is where optimistic interfaces break. The optimistic state has to be derived from the confirmed data plus the pending change, so that when the action fails and the router revalidates, the confirmed data overwrites the optimistic one without any help. Keeping the optimistic value in component state and patching it by hand is the version that slowly drifts out of sync.\n\nReact 19 offers the primitive for the last piece: useOptimistic takes the confirmed value and a function that says how to add a pending change, and React drops the optimistic value as soon as the transition ends. The rule does not change: derive the optimistic value from the data the loader confirmed, and never from a copy you keep yourself.',
        'Оптимистичный интерфейс показывает результат записи раньше, чем сервер её подтвердил. Пользователь нажимает звезду, счётчик сразу растёт, и если запрос падает, изменение откатывается. Техника не является возможностью роутера, но роутер даёт ей ровно то, что нужно: пока отправка в полёте, объекты навигации и fetcher несут данные формы этого запроса.\n\nРаспространены две реализации. Подход через навигацию читает данные формы навигации, пока её состояние submitting, и выводит из них состояние ожидания; он подходит форме, меняющей маршрут целиком. Подход через fetcher читает данные формы fetcher для фоновой отправки, которая не навигирует, и это правильный инструмент для кнопки внутри списка.\n\nОткат — самая сложная часть, и именно на нём оптимистичные интерфейсы ломаются. Оптимистичное состояние нужно выводить из подтверждённых данных плюс ожидающее изменение, чтобы при падении action и последующей ревалидации подтверждённые данные перезаписали оптимистичные без всякой помощи. Хранение оптимистичного значения в состоянии компонента и правка его руками — это как раз та версия, которая постепенно рассинхронизируется.\n\nReact 19 даёт примитив для последней детали: useOptimistic принимает подтверждённое значение и функцию, которая описывает, как добавить ожидающее изменение, а React убирает оптимистичное значение, как только транзакция завершилась. Правило не меняется: выводите оптимистичное значение из данных, подтверждённых загрузчиком, и никогда из собственной копии.'
      ),
      bullets: [
        L('navigation.formData and fetcher.formData carry the request in flight.', 'navigation.formData и fetcher.formData несут запрос, который сейчас в полёте.'),
        L('A fetcher submits without navigating, and that is the point of it.', 'Fetcher отправляет без навигации, и в этом его смысл.'),
        L('Derive the optimistic value from the confirmed data.', 'Выводите оптимистичное значение из подтверждённых данных.'),
        L('When the action fails, the revalidation overwrites the optimistic state.', 'Когда action падает, ревалидация перезаписывает оптимистичное состояние.'),
        L('Optimistic UI is wrong for a destructive action with no undo.', 'Оптимистичный UI не подходит для необратимого действия без отмены.'),
      ],
      code: `function StarButton({ postId, starred }) {
  const fetcher = useFetcher();
  const pending = fetcher.formData?.get('intent') === 'star';

  // the confirmed value plus the pending change
  const isStarred = starred || pending;

  return (
    <fetcher.Form method="post" action="/posts/star">
      <input type="hidden" name="intent" value="star" />
      <input type="hidden" name="postId" value={postId} />
      <button type="submit" aria-pressed={isStarred}>
        {isStarred ? 'Starred' : 'Star'}
      </button>
    </fetcher.Form>
  );
}`,
      table: {
        caption: L('Two ways to see a pending submission', 'Два способа увидеть отправку в полёте'),
        headers: [L('Source', 'Источник'), L('Scope', 'Охват'), L('Data available', 'Какие данные доступны')],
        rows: [
          [
            L('useNavigation().formData', 'useNavigation().formData'),
            L('the whole navigation', 'вся навигация'),
            L('the FormData of the submitted form', 'FormData отправленной формы'),
          ],
          [
            L('useNavigation().state', 'useNavigation().state'),
            L('the whole navigation', 'вся навигация'),
            L('idle, submitting or loading', 'idle, submitting или loading'),
          ],
          [
            L('useFetcher().formData', 'useFetcher().formData'),
            L('one fetcher', 'один fetcher'),
            L('the FormData of that submission', 'FormData этой отправки'),
          ],
          [
            L('useFetcher().state', 'useFetcher().state'),
            L('one fetcher', 'один fetcher'),
            L('idle, submitting or loading', 'idle, submitting или loading'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Optimistic state kept by hand', 'Оптимистичное состояние в руках'),
          text: L(
            'If the optimistic value lives in component state, a failed action leaves the wrong number on screen until something else refreshes it. Derive it from the confirmed data plus the pending request, so the revalidation after a failure simply removes it.',
            'Если оптимистичное значение живёт в состоянии компонента, упавший action оставляет на экране неверное число, пока что-то другое не обновит страницу. Выводите его из подтверждённых данных плюс ожидающий запрос, тогда ревалидация после сбоя просто уберёт его.'
          ),
        },
        {
          tone: 'warning',
          title: L('Not every action can be optimistic', 'Не всякое действие может быть оптимистичным'),
          text: L(
            'A payment, a deletion and anything the user cannot undo should wait for the server. Optimistic UI for a destructive action means the interface claims a success that never happened.',
            'Оплата, удаление и любое действие, которое пользователь не может отменить, должны ждать сервер. Оптимистичный UI для разрушительного действия означает, что интерфейс рапортует об успехе, которого не было.'
          ),
        },
      ],
      takeaway: L(
        'Show the pending change from the request in flight, derive it from the confirmed data, and never keep it in your own state.',
        'Показывайте ожидающее изменение из запроса, который в полёте, выводите его из подтверждённых данных и никогда не храните в своём состоянии.'
      ),
      seeAlso: [
        L('Section 6-4: mutations and error handling', 'Секция 6-4: мутации и обработка ошибок'),
        L('Section 3-4: forms, fetchers and progressive enhancement', 'Секция 3-4: формы, fetcher и прогрессивное улучшение'),
        L('Section 5-2: Suspense and route-level fallbacks', 'Секция 5-2: Suspense и fallback на уровне маршрута'),
      ],
    },
    {
      id: 'router-ch6-s4',
      title: L('Mutations and error handling', 'Мутации и обработка ошибок'),
      body: L(
        'A mutation is a write, and a write is the only place where the interface and the server can disagree. The action has two ways to report a failure: return a data object with a status of 400 and a body describing the problem, or throw it. A returned error is data, so the component reads it and the form stays on screen. A thrown error is an exception, so the router renders the nearest error boundary instead of the route.\n\nThe distinction decides the whole user experience. A validation failure is not a crash: the user typed something wrong, the form must stay filled, and the message has to appear next to the field. A server failure is a failure of the request, and the boundary shows a retry. Mixing them up produces the worst of both, a red error page for a typo in a name field.\n\nThe action also decides what happens next. On success it usually returns a redirect, which ends the navigation and lands the user on the new state of the resource. Returning data instead keeps the user on the page, and the router revalidates the loaders anyway, so the list behind the form updates on its own. The choice between a redirect and data is a product decision and not a technical one.\n\nThere is one more failure mode that no amount of error handling fixes: a mutation that succeeds on the server and fails on the way back. The screen can only be corrected by a fresh load, so the recovery is a revalidation the user triggers, and the interface has to say clearly that the state might be stale instead of pretending that nothing happened.',
        'Мутация это запись, и запись — единственное место, где интерфейс и сервер могут разойтись. У action есть два способа сообщить об ошибке: вернуть объект данных со статусом 400 и телом, описывающим проблему, или бросить его. Возвращённая ошибка — это данные, поэтому компонент читает её, и форма остаётся на экране. Брошенная ошибка — это исключение, поэтому роутер рисует ближайшую границу ошибок вместо маршрута.\n\nРазница между ними определяет весь опыт пользователя. Ошибка валидации это не сбой: пользователь ввёл не то, форма должна остаться заполненной, а сообщение должно появиться рядом с полем. Сбой сервера — это провал запроса, и граница показывает кнопку повтора. Смешение двух случаев даёт худшее из обоих: красную страницу ошибки из-за опечатки в имени.\n\nAction решает и что будет дальше. При успехе он обычно возвращает redirect, который завершает навигацию и приводит пользователя на новое состояние ресурса. Возврат данных вместо этого оставляет пользователя на странице, а роутер всё равно ревалидирует загрузчики, так что список за формой обновится сам. Выбор между redirect и данными — продуктовое решение, а не техническое.\n\nЕсть ещё один вид сбоя, который не лечится никакой обработкой ошибок: мутация, которая на сервере прошла, но потерялась по дороге обратно. Экран можно исправить только свежей загрузкой, поэтому восстановление — это ревалидация, которую запускает пользователь, и интерфейс должен прямо сказать, что состояние может быть устаревшим, а не притворяться, что ничего не произошло.'
      ),
      bullets: [
        L('Return a 400 for validation, throw for a real failure.', 'Возвращайте 400 для валидации, бросайте для настоящего сбоя.'),
        L('A returned error is data and keeps the form on screen.', 'Возвращённая ошибка — это данные, и форма остаётся на экране.'),
        L('A thrown error reaches the nearest error boundary.', 'Брошенная ошибка попадает в ближайшую границу ошибок.'),
        L('After a successful action the router revalidates the loaders.', 'После успешного action роутер ревалидирует загрузчики.'),
        L('A redirect ends the navigation and replaces the history entry.', 'Redirect завершает навигацию и заменяет запись истории.'),
      ],
      code: `async function createUser({ request }) {
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  if (!name) {
    // validation: returned as data, the form stays on screen
    return data({ errors: { name: 'Name is required' } }, { status: 400 });
  }
  const user = await api.createUser({ name });
  return redirect('/users/' + user.id);   // success: end the navigation
}

function NewUserForm() {
  const actionData = useActionData();
  return (
    <Form method="post">
      <input name="name" />
      {actionData?.errors?.name && <p role="alert">{actionData.errors.name}</p>}
      <button type="submit">Create</button>
    </Form>
  );
}`,
      table: {
        caption: L('Two kinds of failure and two kinds of success', 'Два вида сбоя и два вида успеха'),
        headers: [L('Case', 'Случай'), L('The action does', 'Action делает'), L('The screen shows', 'Экран показывает')],
        rows: [
          [
            L('Validation', 'Валидация'),
            L('returns a 400 with the errors', 'возвращает 400 с ошибками'),
            L('the form with the messages', 'форму с сообщениями'),
          ],
          [
            L('Server error', 'Ошибка сервера'),
            L('throws a Response or an Error', 'бросает Response или Error'),
            L('the error boundary', 'границу ошибок'),
          ],
          [
            L('Success with a redirect', 'Успех с redirect'),
            L('returns a redirect', 'возвращает redirect'),
            L('the new page', 'новую страницу'),
          ],
          [
            L('Success without a redirect', 'Успех без redirect'),
            L('returns data', 'возвращает данные'),
            L('the same page, refreshed', 'ту же страницу, обновлённую'),
          ],
          [
            L('Network loss', 'Потеря сети'),
            L('throws', 'бросает'),
            L('the error boundary', 'границу ошибок'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A thrown 400 loses the form', 'Брошенный 400 теряет форму'),
          text: L(
            'Throwing a 400 for a validation error sends the user to the error boundary and throws the form data away. Return the error instead: the boundary is for failures of the request, not for a typo in a field.',
            'Брошенный 400 для ошибки валидации отправляет пользователя в границу ошибок и выбрасывает данные формы. Возвращайте ошибку вместо этого: граница нужна для отказов запроса, а не для опечатки в поле.'
          ),
        },
        {
          tone: 'tip',
          title: L('Let the boundary be small', 'Пусть граница будет маленькой'),
          text: L(
            'Put the error element on the route that can actually fail, not on the root. A root boundary turns a broken widget into a broken application.',
            'Ставьте элемент ошибки на маршрут, который действительно может упасть, а не на корень. Граница в корне превращает сломанный виджет в сломанное приложение.'
          ),
        },
      ],
      takeaway: L(
        'Return validation errors as data, throw real failures, and let the router revalidate the list after a successful write.',
        'Возвращайте ошибки валидации как данные, бросайте настоящие сбои и позвольте роутеру перепроверить список после успешной записи.'
      ),
      seeAlso: [
        L('Section 3-5: errorElement and error boundaries', 'Секция 3-5: errorElement и границы ошибок'),
        L('Section 7-4: nested error handling', 'Секция 7-4: вложенная обработка ошибок'),
        L('Section 6-3: optimistic UI with actions', 'Секция 6-3: оптимистичный интерфейс с actions'),
      ],
    },
    {
      id: 'router-ch6-s5',
      title: L('When to use a query library instead', 'Когда вместо роутера нужен query-библиотека'),
      body: L(
        'The router is a good cache for the data that belongs to a route. A loader runs when the route is entered, its result is stored per route, and the router knows when to throw it away. That model fits pages: a list, a detail view, a form. It fits badly everything else: a value that several unrelated components read, a background refresh on a timer, a resource that is polled while the user works.\n\nThe symptom of the mismatch is duplication. The same resource is fetched by a loader and by a component, or by two loaders of sibling routes, and each copy carries its own refresh logic. Another symptom is a loader that grew into a general purpose data manager with retries, cache invalidation and background synchronisation, which is a query library written badly inside a loader.\n\nA dedicated query library keeps a cache keyed by the identity of the query and not by the route, and it can serve many components at once, refetch on a schedule and write into the cache directly. React Query and SWR are the usual choices. The cost is a second source of truth: the loader cache and the query cache both exist, and the border between them has to be drawn on purpose.\n\nThe practical rule is about ownership. If the data is the reason the page exists and it is needed before the first render, it belongs in a loader. If the data is an enhancement that several parts of the interface share and that has to stay fresh on its own, it belongs in a query library. Keeping both for the same resource is the only real mistake, and it is a mistake of architecture and not of syntax.',
        'Роутер — хороший кэш для данных, которые принадлежат маршруту. Загрузчик выполняется при входе в маршрут, его результат хранится по маршруту, и роутер знает, когда его выбросить. Эта модель подходит страницам: списку, детальному виду, форме. Она плохо подходит всему остальному: значению, которое читают несколько несвязанных компонентов, фоновому обновлению по таймеру, ресурсу, который опрашивается, пока пользователь работает.\n\nСимптом несовпадения — дублирование. Один и тот же ресурс читают загрузчик и компонент или два загрузчика соседних маршрутов, и у каждой копии своя логика обновления. Другой симптом — загрузчик, который вырос в универсальный менеджер данных с повторами, инвалидацией кэша и фоновой синхронизацией, то есть плохо написанная query-библиотека внутри загрузчика.\n\nОтдельная query-библиотека держит кэш, ключуемый по идентичности запроса, а не по маршруту, и может обслуживать сразу много компонентов, перезапрашивать по расписанию и писать в кэш напрямую. React Query и SWR — обычные варианты. Цена — второй источник правды: кэш загрузчиков и кэш запросов существуют одновременно, и границу между ними приходится проводить осознанно.\n\nПрактическое правило касается владения. Если данные это причина существования страницы и они нужны до первого рендера, им место в загрузчике. Если данные это дополнение, которым делятся несколько частей интерфейса и которое должно оставаться свежим само по себе, им место в query-библиотеке. Держать и то и другое для одного ресурса — единственная настоящая ошибка, и это ошибка архитектуры, а не синтаксиса.'
      ),
      bullets: [
        L('The loader cache is keyed by the route, the query cache by the resource.', 'Кэш загрузчиков ключуется маршрутом, кэш запросов — ресурсом.'),
        L('A loader that grows a cache becomes a query library in disguise.', 'Загрузчик с собственным кэшем — это query-библиотека в худшем виде.'),
        L('Loaders serve the data the page cannot render without.', 'Загрузчики отдают данные, без которых страница не отрисуется.'),
        L('A query library serves shared data with its own lifecycle.', 'Query-библиотека отдаёт общие данные со своим жизненным циклом.'),
        L('Never keep the same resource in both caches.', 'Никогда не держите один ресурс в обоих кэшах.'),
      ],
      code: `// the route owns the data: the page cannot render without it
const router = createBrowserRouter([
  {
    path: '/projects/:id',
    loader: ({ params }) => api.getProject(params.id),
    element: <ProjectPage />,
  },
]);

// shared, self-refreshing data: the query library owns it
function useTeamPresence(teamId) {
  return useQuery({
    queryKey: ['presence', teamId],
    queryFn: () => api.getPresence(teamId),
    refetchInterval: 30000,
    staleTime: 10000,
  });
}`,
      table: {
        caption: L('Which owner fits the data', 'Кому принадлежит данные'),
        headers: [L('Signal', 'Признак'), L('Owner', 'Владелец')],
        rows: [
          [
            L('The page needs it before the first render', 'Странице нужно это до первого рендера'),
            L('a loader', 'загрузчик'),
          ],
          [
            L('Several unrelated components read it', 'Его читают несколько несвязанных компонентов'),
            L('a query library', 'query-библиотека'),
          ],
          [
            L('It must refresh on a timer', 'Оно должно обновляться по таймеру'),
            L('a query library', 'query-библиотека'),
          ],
          [
            L('A form in this route writes it', 'Его пишет форма этого маршрута'),
            L('an action', 'action'),
          ],
          [
            L('It must survive a reload', 'Оно должно пережить перезагрузку'),
            L('the server or the URL', 'сервер или URL'),
          ],
          [
            L('Both of them want it', 'Его хотят оба'),
            L('pick one owner', 'выберите одного владельца'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Two caches, two truths', 'Два кэша — две правды'),
          text: L(
            'When the same resource lives in the loader cache and in the query cache, the screen shows whichever finished last. Give every resource exactly one owner and let the other side read it through the router.',
            'Когда один ресурс лежит и в кэше загрузчиков, и в кэше запросов, экран показывает тот из них, который закончился позже. Дайте каждому ресурсу ровно одного владельца, а вторую сторону заставьте читать через роутер.'
          ),
        },
        {
          tone: 'note',
          title: L('The rule of thumb', 'Правило большого пальца'),
          text: L(
            'Data that a route needs in order to exist belongs in a loader. Data that exists on its own schedule belongs in a query library. The second category is rare, and pretending it does not exist is what produces duplicated requests.',
            'Данные, без которых маршруту не существовать, принадлежат загрузчику. Данные, живущие по своему расписанию, принадлежат query-библиотеке. Вторая категория редка, и именно её игнорирование порождает дублирующиеся запросы.'
          ),
        },
      ],
      takeaway: L(
        'Give every resource one owner: a loader when the page depends on it, a query library when the data has a life of its own.',
        'Давайте каждому ресурсу одного владельца: загрузчик, когда страница от него зависит, query-библиотека, когда данные живут по собственному расписанию.'
      ),
      seeAlso: [
        L('Section 6-1: the loader cache and revalidation', 'Секция 6-1: кэш загрузчиков и ревалидация'),
        L('Section 6-2: revalidation strategies', 'Секция 6-2: стратегии ревалидации'),
        L('Section 3-2: loaders and useLoaderData', 'Секция 3-2: загрузчики и useLoaderData'),
      ],
    },
  ],
};
