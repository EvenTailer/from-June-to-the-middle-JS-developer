import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reduxCh05: Chapter = {
  id: 'redux-ch5',
  title: L('RTK Query', 'RTK Query'),
  summary: L(
    'What RTK Query is, how the endpoints fill a cache that the library owns, how tags describe what a mutation invalidates, how an optimistic update rolls back when the request fails, and when a data layer is the wrong tool for the job.',
    'Что такое RTK Query, как эндпоинты наполняют кэш, которым владеет библиотека, как теги описывают, что именно инвалидирует мутация, как откатывается оптимистичное обновление при ошибке запроса и когда слой данных вообще не нужен.'
  ),
  sections: [
    {
      id: 'redux-ch5-s1',
      title: L('Endpoints and the cache', 'Эндпоинты и кэш'),
      body: L(
        'RTK Query is a data layer that lives inside Redux Toolkit. You describe the endpoints of your API with createApi: a query endpoint reads data and a mutation endpoint writes it. Under the hood the library keeps its own slice in the store, and that slice is the cache. Every request produces a cache entry that holds the data, the status of the request and the moment the entry was filled.\n\nThe cache key is built from the endpoint name and the arguments, serialised into a string, so the same request always lands on the same entry. fetchBaseQuery performs the actual HTTP call and returns a discriminated result: { data } when the server answered with a body, { error } when it answered with a failure, and the meta information about the request in both cases. The endpoint never touches your slice; the data lands in the cache and nowhere else.\n\nThat ownership is the point of the library and also its main trap. Two pieces have to be wired into the store: the reducer of the api object, which holds the cache, and its middleware, which runs the requests. Miss the reducer and the cache is thrown away on every action. Miss the middleware and the requests never leave the browser.',
        'RTK Query — это слой данных, который живёт внутри Redux Toolkit. Эндпоинты вашего API описываются через createApi: эндпоинт-запрос читает данные, эндпоинт-мутация пишет их. Под капотом библиотека держит собственный слайс в хранилище, и этот слайс и есть кэш. Каждый запрос создаёт запись кэша, в которой лежат данные, статус запроса и момент, когда запись наполнилась.\n\nКлюч кэша собирается из имени эндпоинта и аргументов, сериализованных в строку, поэтому один и тот же запрос всегда попадает в одну и ту же запись. fetchBaseQuery выполняет сам HTTP-вызов и возвращает размеченный результат: { data }, когда сервер ответил телом, { error }, когда ответил ошибкой, и метаданные запроса в обоих случаях. Эндпоинт никогда не трогает ваш слайс: данные попадают в кэш и больше никуда.\n\nЭто владение и есть смысл библиотеки, но одновременно и главная ловушка. В хранилище нужно подключить две вещи: редьюсер объекта api, который держит кэш, и его middleware, который выполняет запросы. Без редьюсера кэш выбрасывается при каждом действии. Без middleware запросы вообще не уходят из браузера.'
      ),
      bullets: [
        L('RTK Query owns a cache slice, so server data lives there and not in your own slice.', 'RTK Query владеет своим слайсом с кэшем: серверные данные лежат там, а не в вашем слайсе.'),
        L('A query endpoint reads, a mutation endpoint writes.', 'Эндпоинт-запрос читает, эндпоинт-мутация пишет.'),
        L('The cache key is the endpoint name plus the serialised arguments.', 'Ключ кэша — имя эндпоинта плюс сериализованные аргументы.'),
        L('fetchBaseQuery returns { data } or { error } and never throws for a failed request.', 'fetchBaseQuery возвращает { data } или { error } и не бросает исключение при ошибке ответа.'),
        L('Both the api reducer and the api middleware must be wired into the store.', 'И редьюсер api, и его middleware нужно подключить к хранилищу.'),
      ],
      code: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';

interface Post { id: string; title: string }

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'] as const,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
  }),
});

// The api owns the cache: its reducer and its middleware go into the store.
export const postsApiReducer = postsApi.reducer;
export const postsApiMiddleware = postsApi.middleware;`,
      table: {
        caption: L('What a cache entry holds', 'Что хранит запись кэша'),
        headers: [L('Field', 'Поле'), L('Value', 'Значение'), L('Why it matters', 'Зачем это нужно')],
        rows: [
          [
            L('data', 'data'),
            L('the last successful payload', 'последний успешный ответ'),
            L('What the components read', 'То, что читают компоненты'),
          ],
          [
            L('status', 'status'),
            L('uninitialized, pending, fulfilled or rejected', 'uninitialized, pending, fulfilled или rejected'),
            L('Which state the hook exposes', 'Какое состояние отдаёт хук'),
          ],
          [
            L('error', 'error'),
            L('the serialised failure', 'сериализованная ошибка'),
            L('The shape of a rejected result', 'Форма отклонённого результата'),
          ],
          [
            L('startedTimeStamp', 'startedTimeStamp'),
            L('when the request began', 'когда начался запрос'),
            L('Used to compute the age of the entry', 'Нужен, чтобы посчитать возраст записи'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two owners of the same data', 'Два владельца одних и тех же данных'),
          text: L(
            'Copying the data out of the cache into a slice of your own creates two sources of truth. The copy is refreshed only when you remember to refresh it, so the two versions drift apart and every bug report becomes a question about which one is real.',
            'Копирование данных из кэша в собственный слайс создаёт два источника правды. Копия обновляется только тогда, когда вы вспомнили её обновить, поэтому версии расходятся, а каждый баг-репорт превращается в вопрос, какая из них настоящая.'
          ),
        },
      ],
      takeaway: L(
        'The api object owns the cache, so mount its reducer and its middleware and never copy the cached data into a slice.',
        'Кэшем владеет объект api: подключите его редьюсер и его middleware и никогда не копируйте кэш в слайс.'
      ),
      seeAlso: [
        L('Chapter 4: asynchronous data flow with thunks', 'Глава 4: асинхронный поток данных через thunk'),
        L('Section 5-2: tags and invalidation', 'Секция 5-2: теги и инвалидация'),
        L('Section 6-1: normalised state', 'Секция 6-1: нормализованное состояние'),
      ],
    },
    {
      id: 'redux-ch5-s2',
      title: L('Tags and invalidation', 'Теги и инвалидация'),
      body: L(
        'A tag is a label attached to a cache entry. It answers one question: which part of the data does this entry represent? A query declares the tags it provides, a mutation declares the tags it invalidates. When a mutation invalidates a tag, every cache entry carrying that tag becomes stale, and every query that is currently subscribed to such an entry refetches it. The tag types are declared once, in the tagTypes option of createApi.\n\nTags come in two shapes. A general tag such as "Post" covers the whole collection, and a specific tag such as { type: "Post", id: "42" } covers a single entity. A list endpoint usually provides a general tag plus one specific tag per returned entity, so that a mutation of one post invalidates exactly that post and leaves the rest of the list alone.\n\nTwo traps live here. Invalidating a tag that nobody provides does nothing at all, silently. And an invalidation only refetches the queries that have a subscriber: if no component has the hook mounted, the entry stays marked as invalid until the next mount triggers a request.\n\nThe invalidatesTags option accepts a list of tags or a function that receives the result of the mutation, the error and the arguments of the mutation, so the tags can be computed from what the server actually returned.',
        'Тег — это метка, прикреплённая к записи кэша. Она отвечает на один вопрос: какую часть данных представляет эта запись? Запрос объявляет теги, которые он предоставляет, мутация — теги, которые она инвалидирует. Когда мутация инвалидирует тег, все записи кэша с этим тегом становятся устаревшими, а все запросы, у которых сейчас есть подписчик, перезапрашиваются. Типы тегов объявляются один раз, в опции tagTypes у createApi.\n\nУ тегов две формы. Общий тег вида "Post" покрывает всю коллекцию, а конкретный тег вида { type: "Post", id: "42" } — одну сущность. Список обычно предоставляет общий тег и по одному конкретному тегу на каждый элемент, чтобы мутация одного поста инвалидировала ровно этот пост и не трогала остальные записи.\n\nЗдесь живут две ловушки. Инвалидация тега, который никто не предоставляет, не делает вообще ничего, и делает это молча. И инвалидация перезапрашивает только те запросы, у которых есть подписчик: если ни один компонент не держит хук смонтированным, запись остаётся помеченной как невалидная, пока следующий mount не вызовет запрос.\n\nОпция invalidatesTags принимает список тегов или функцию, которая получает результат мутации, ошибку и аргументы мутации, поэтому теги можно вычислить по тому, что сервер вернул на самом деле.'
      ),
      bullets: [
        L('A query provides tags, a mutation invalidates tags.', 'Запрос предоставляет теги, мутация инвалидирует их.'),
        L('A general tag covers a collection, a tag with an id covers one entity.', 'Общий тег покрывает коллекцию, тег с id — одну сущность.'),
        L('Invalidating a tag that nobody provides does nothing.', 'Инвалидация тега, который никто не предоставляет, ничего не делает.'),
        L('Only the queries with a subscriber refetch after an invalidation.', 'После инвалидации перезапрашиваются только запросы с подписчиком.'),
        L('invalidatesTags can be a function of the result, the error and the arguments.', 'invalidatesTags может быть функцией от результата, ошибки и аргументов.'),
      ],
      code: `export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'] as const,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      // A general tag for the list and one specific tag per post.
      providesTags: (result) =>
        result
          ? [{ type: 'Post', id: 'LIST' }, ...result.map((post) => ({ type: 'Post' as const, id: post.id }))]
          : [],
    }),
    deletePost: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: '/posts/' + id, method: 'DELETE' }),
      // The tags are computed from the arguments of the mutation.
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
  }),
});`,
      table: {
        caption: L('What each tag shape invalidates', 'Что инвалидирует каждая форма тега'),
        headers: [L('Tag', 'Тег'), L('Covers', 'Покрывает'), L('Refetched by', 'Перезапрашивается')],
        rows: [
          [
            L('"Post"', '"Post"'),
            L('the whole collection', 'всю коллекцию'),
            L('a mutation that changes the list', 'мутацией, меняющей список'),
          ],
          [
            L('{ type: "Post", id: "42" }', '{ type: "Post", id: "42" }'),
            L('one entity', 'одну сущность'),
            L('a mutation of that entity', 'мутацией этой сущности'),
          ],
          [
            L('no tag at all', 'тега нет'),
            L('nothing', 'ничего'),
            L('never, the entry is never invalidated', 'никогда, запись не инвалидируется'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A tag nobody provides', 'Тег, который никто не предоставляет'),
          text: L(
            'The library does not check that the tags you invalidate exist. A typo in a tag type means the cache is never refreshed, and the symptom is a list that stays stale after a successful write with no error anywhere.',
            'Библиотека не проверяет, что инвалидируемые теги вообще существуют. Опечатка в типе тега означает, что кэш не обновится, а симптом — список, который остаётся устаревшим после успешной записи, без единой ошибки.'
          ),
        },
        {
          tone: 'tip',
          title: L('Invalidate instead of patching', 'Инвалидируйте, а не правьте вручную'),
          text: L(
            'As long as every mutation invalidates the tags it affects, the cache can repair itself after any sequence of writes. Manual patching of the cache is faster but leaves the library unable to tell that something changed.',
            'Пока каждая мутация инвалидирует затрагиваемые теги, кэш сам себя восстанавливает после любой последовательности записей. Ручная правка кэша быстрее, но библиотека перестаёт понимать, что что-то изменилось.'
          ),
        },
      ],
      takeaway: L(
        'A tag says what a cache entry contains, and invalidating a tag is the only reliable way to tell the cache that the data changed.',
        'Тег говорит, что содержит запись кэша, и только инвалидация тега надёжно сообщает кэшу, что данные изменились.'
      ),
      seeAlso: [
        L('Section 5-4: mutations and invalidation strategies', 'Секция 5-4: мутации и стратегии инвалидации'),
        L('Section 5-1: endpoints and the cache', 'Секция 5-1: эндпоинты и кэш'),
        L('Chapter 7: listener middleware and side effects', 'Глава 7: middleware с листенерами и побочные эффекты'),
      ],
    },
    {
      id: 'redux-ch5-s3',
      title: L('Optimistic updates', 'Оптимистичные обновления'),
      body: L(
        'An optimistic update shows the result of a write before the server has confirmed it. RTK Query gives you the hook for it: onQueryStarted on a mutation. It runs when the mutation begins and receives the arguments of the mutation plus an api object with dispatch, queryFulfilled, getState and signal. queryFulfilled is a promise that settles with the result of the request or rejects with the error.\n\nThe optimistic part is a patch of the cache. api.util.updateQueryData(endpoint, args, recipe) changes the cached entry immediately, and the recipe receives a draft you may mutate like any Immer draft. The patch is temporary: it is the rollback that makes the whole trick safe.\n\nThe rollback is driven by the promise you return from onQueryStarted. While the promise is pending, the patched value is in the cache. If the request fails and you let the promise reject, RTK Query restores the entry to the state it had before the patch. If you catch the error inside the callback and resolve the promise instead, the rollback never happens and the optimistic value stays in the cache for good.\n\nThe same promise is the place to undo the patch explicitly, because dispatch returns a handle with an undo method. A manual rollback is one call away and works even when the failure is handled by the caller.',
        'Оптимистичное обновление показывает результат записи до того, как сервер его подтвердил. RTK Query даёт для этого хук: onQueryStarted у мутации. Он выполняется в начале мутации и получает аргументы мутации и объект api с dispatch, queryFulfilled, getState и signal. queryFulfilled — это промис, который разрешается результатом запроса или отклоняется ошибкой.\n\nОптимистичная часть — это правка кэша. api.util.updateQueryData(endpoint, args, recipe) меняет запись кэша сразу, а recipe получает черновик, который можно мутировать как любой черновик Immer. Правка временная: именно откат делает весь приём безопасным.\n\nОткатом управляет промис, который вы возвращаете из onQueryStarted. Пока промис в ожидании, исправленное значение лежит в кэше. Если запрос падает и вы позволяете промису отклониться, RTK Query восстанавливает запись в то состояние, которое было до правки. Если же вы перехватите ошибку внутри колбэка и разрешите промис, отката не будет, и оптимистичное значение навсегда останется в кэше.\n\nТот же промис — место для ручного отката, потому что dispatch возвращает объект с методом undo. Ручной отказ откатывает правку явно и работает даже тогда, когда ошибку обрабатывает вызывающий код.'
      ),
      bullets: [
        L('onQueryStarted runs when the mutation starts and receives an api object.', 'onQueryStarted выполняется в начале мутации и получает объект api.'),
        L('updateQueryData patches the cache before the server answers.', 'updateQueryData правит кэш до ответа сервера.'),
        L('The promise you return from onQueryStarted drives the rollback.', 'Промис, который вы возвращаете из onQueryStarted, управляет откатом.'),
        L('Letting that promise reject restores the cache entry.', 'Если промис отклонён, запись кэша восстанавливается.'),
        L('Catching the error inside the callback disables the rollback.', 'Обработка ошибки внутри колбэка отключает откат.'),
      ],
      code: `addPost: builder.mutation<Post, { title: string }>({
  query: (body) => ({ url: '/posts', method: 'POST', body }),
  async onQueryStarted(body, { dispatch, queryFulfilled }) {
    // Patch the cache before the server has answered.
    const patch = dispatch(
      postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
        draft.push({ id: 'tmp', title: body.title });
      }),
    );
    try {
      await queryFulfilled;
    } catch (error) {
      // Undo the optimistic patch, then let the caller see the failure.
      patch.undo();
      throw error;
    }
  },
}),`,
      table: {
        caption: L('What the api object gives to an optimistic update', 'Что объект api даёт оптимистичному обновлению'),
        headers: [L('Member', 'Член'), L('What it is', 'Что это'), L('Typical use', 'Типичное применение')],
        rows: [
          [
            L('dispatch', 'dispatch'),
            L('the store dispatch', 'отправка в хранилище'),
            L('patching the cache', 'правка кэша'),
          ],
          [
            L('queryFulfilled', 'queryFulfilled'),
            L('a promise for the request', 'промис запроса'),
            L('awaiting the result and catching the failure', 'ожидание результата и перехват ошибки'),
          ],
          [
            L('getState', 'getState'),
            L('reads the current state', 'чтение текущего состояния'),
            L('reading the state after the change', 'чтение состояния после изменения'),
          ],
          [
            L('signal', 'signal'),
            L('an abort signal', 'сигнал отмены'),
            L('stopping the work when the component unmounts', 'остановка работы при размонтировании'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The swallowed error', 'Съеденная ошибка'),
          text: L(
            'Catching the error inside onQueryStarted and resolving the promise keeps the optimistic value in the cache. The interface shows an item that was never created, and nothing in the logs says why.',
            'Перехват ошибки внутри onQueryStarted с разрешением промиса оставляет оптимистичное значение в кэше. Интерфейс показывает элемент, который никогда не создавался, и в логах нет ни слова о причине.'
          ),
        },
        {
          tone: 'tip',
          title: L('Optimistic only for reversible writes', 'Оптимистично — только для обратимых записей'),
          text: L(
            'An optimistic update is a promise that you will be able to take the change back. If the operation cannot be undone or is expensive to undo, invalidate the tags and let the server decide what the screen shows.',
            'Оптимистичное обновление — это обещание, что изменение получится отозвать. Если операцию нельзя отменить или отмена дорогая, инвалидируйте теги и дайте серверу решить, что покажет экран.'
          ),
        },
      ],
      takeaway: L(
        'An optimistic update is safe only while the promise you return can still reject, because that rejection is what rolls the cache back.',
        'Оптимистичное обновление безопасно, только пока возвращённый промис ещё может отклониться: именно отказ откатывает кэш.'
      ),
      seeAlso: [
        L('Section 5-2: tags and invalidation', 'Секция 5-2: теги и инвалидация'),
        L('Section 1-5: Immer and immutable updates', 'Секция 1-5: Immer и иммутабельные обновления'),
        L('Section 6-5: deduplicating by id', 'Секция 6-5: дедупликация по id'),
      ],
    },
    {
      id: 'redux-ch5-s4',
      title: L('Mutations and invalidation strategies', 'Мутации и стратегии инвалидации'),
      body: L(
        'Every write ends with the same question: how does the rest of the application learn about it? RTK Query offers three answers, and the choice is a trade-off between one extra network request and the risk of showing stale data. Invalidation is the simplest: the mutation declares the tags it invalidates, and the queries that use them refetch. It is always correct, because the server is the source of truth, and it costs a round trip.\n\nAn optimistic update avoids the round trip by patching the cache in the optimistic phase and rolling back on failure. It gives instant feedback, which matters for a button that has to feel alive, and it moves the complexity into the rollback path, which is the path that is rarely tested.\n\nA manual patch is the third option: the mutation writes the answer it got from the server straight into the cache with updateQueryData, and nothing is refetched. It is the cheapest option and the most dangerous one, because the client has to know exactly what the server did, and any other entry that depends on the same fact goes stale without a warning.\n\nA practical rule: start with invalidation, because it is correct by construction. Move to an optimistic update when the latency hurts and the write is easy to reverse. Patch the cache manually only when you know the server response exactly and the mutation is the only writer of that fact.',
        'Каждая запись заканчивается одним и тем же вопросом: как остальная часть приложения узнает о ней? RTK Query предлагает три ответа, и выбор — это размен между одним лишним сетевым запросом и риском показать устаревшие данные. Инвалидация — самый простой ответ: мутация объявляет инвалидируемые теги, а запросы, которые их используют, перезапрашиваются. Это всегда корректно, потому что источник правды — сервер, и стоит это одного кругового пути.\n\nОптимистичное обновление обходит круговой путь: правка кэша в оптимистичной фазе и откат при ошибке. Оно даёт мгновенную обратную связь, что важно для кнопки, которая должна ощущаться живой, и переносит сложность в путь отката — а вот его тестируют реже всего.\n\nРучная правка — третий вариант: мутация записывает ответ сервера прямо в кэш через updateQueryData, и ничего не перезапрашивается. Это самый дешёвый и самый опасный вариант, потому что клиент обязан точно знать, что сделал сервер, а любая другая запись о том же факте устаревает без предупреждения.\n\nПрактическое правило: начните с инвалидации, потому что она корректна по построению. Переходите к оптимистичному обновлению, когда задержка мешает, а запись легко отменить. Правьте кэш вручную только тогда, когда вы точно знаете ответ сервера и мутация — единственный писатель этого факта.'
      ),
      bullets: [
        L('Invalidation is correct by construction and costs one extra request.', 'Инвалидация корректна по построению и стоит одного лишнего запроса.'),
        L('An optimistic update gives instant feedback and needs a rollback path.', 'Оптимистичное обновление даёт мгновенную обратную связь и требует пути отката.'),
        L('A manual patch is free, but only you know what the server did.', 'Ручная правка кэша бесплатна, но только вы знаете, что сделал сервер.'),
        L('A mutation without invalidation leaves the cache stale until the next refetch.', 'Мутация без инвалидации оставляет кэш устаревшим до следующего перезапроса.'),
        L('Prefer correctness first and latency second.', 'Сначала корректность, потом задержка.'),
      ],
      code: `export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'] as const,
  endpoints: (builder) => ({
    // The simplest strategy: the server decides, the cache refetches.
    addPost: builder.mutation<Post, { title: string }>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: ['Post'],
    }),
    // The precise strategy: the answer of the server goes into the cache.
    renamePost: builder.mutation<Post, { id: string; title: string }>({
      query: (body) => ({ url: '/posts/' + body.id, method: 'PUT', body }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        dispatch(
          postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((item) => item.id === body.id);
            if (post) post.title = result.data.title;
          }),
        );
      },
    }),
  }),
});`,
      table: {
        caption: L('Three ways to tell the cache about a write', 'Три способа сообщить кэшу о записи'),
        headers: [L('Strategy', 'Стратегия'), L('Extra request', 'Лишний запрос'), L('Feedback', 'Обратная связь'), L('On failure', 'При ошибке')],
        rows: [
          [
            L('Invalidation', 'Инвалидация'),
            L('yes', 'да'),
            L('after the refetch', 'после перезапроса'),
            L('the old data stays', 'старые данные остаются'),
          ],
          [
            L('Optimistic update', 'Оптимистичное обновление'),
            L('no', 'нет'),
            L('immediate', 'мгновенная'),
            L('the patch is rolled back', 'правка откатывается'),
          ],
          [
            L('Manual patch', 'Ручная правка'),
            L('no', 'нет'),
            L('after the response', 'после ответа'),
            L('you undo it yourself', 'откат делаете вы'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Start with invalidation', 'Начните с инвалидации'),
          text: L(
            'Invalidation keeps the client honest: the screen shows what the server returned, not what the client guessed. Optimise the round trip later, when you can measure that the latency is what users actually feel.',
            'Инвалидация оставляет клиента честным: экран показывает то, что вернул сервер, а не то, что предположил клиент. Оптимизируйте круговой путь позже, когда измерите, что задержка действительно чувствуется пользователем.'
          ),
        },
        {
          tone: 'warning',
          title: L('The list and the item are different facts', 'Список и элемент — разные факты'),
          text: L(
            'Invalidating a general tag refetches the whole list. If only one entity changed, invalidate its specific tag as well, otherwise the list is refetched for nothing and the user pays for the extra request.',
            'Инвалидация общего тега перезапрашивает весь список. Если изменилась одна сущность, инвалидируйте и её конкретный тег, иначе список перезапрашивается впустую и лишний запрос оплачивает пользователь.'
          ),
        },
      ],
      takeaway: L(
        'Start with invalidation and switch to an optimistic update only after the rollback path is written and tested.',
        'Начните с инвалидации и переходите к оптимистичному обновлению, только когда путь отката написан и проверен.'
      ),
      seeAlso: [
        L('Section 5-3: optimistic updates', 'Секция 5-3: оптимистичные обновления'),
        L('Section 5-2: tags and invalidation', 'Секция 5-2: теги и инвалидация'),
        L('Section 6-1: normalised state', 'Секция 6-1: нормализованное состояние'),
      ],
    },
    {
      id: 'redux-ch5-s5',
      title: L('The generated hooks', 'Сгенерированные хуки'),
      body: L(
        'For every endpoint createApi generates a React hook: a query hook and a mutation hook. The query hook takes the arguments of the endpoint plus an options object and returns the state of the cache entry: data, error, isLoading, isFetching, isSuccess. The mutation hook returns a trigger function and a result object; the trigger takes the arguments and returns a promise that resolves with the data and rejects with the error.\n\nThe options object is where the behaviour is configured. skip avoids the request entirely, refetchOnMountOrArgChange refetches when the component mounts or when the arguments change, pollingInterval repeats the request on a timer, and select transforms the cached data before the component sees it.\n\nTwo traps. The arguments are serialised into the cache key, so passing a fresh object literal on every render creates a new key, a new request and a loop of fetching that never stops. And select runs on every change of the store, so it has to be a memoised selector; a plain filter inside select allocates a new array each time and defeats every memo below it.\n\nThe trigger rejects when the request fails, so the caller can handle the error where it happens. The unwrap method turns the result into a promise that rejects with the error itself instead of resolving with an object that carries it.',
        'Для каждого эндпоинта createApi генерирует React-хуки: хук запроса и хук мутации. Хук запроса принимает аргументы эндпоинта и объект опций и возвращает состояние записи кэша: data, error, isLoading, isFetching, isSuccess. Хук мутации возвращает функцию-триггер и объект результата; триггер принимает аргументы и возвращает промис, который разрешается данными и отклоняется ошибкой.\n\nОбъект опций — это место, где настраивается поведение. skip полностью отменяет запрос, refetchOnMountOrArgChange перезапрашивает при монтировании компонента или при смене аргументов, pollingInterval повторяет запрос по таймеру, а select преобразует кэшированные данные до того, как их увидит компонент.\n\nДве ловушки. Аргументы сериализуются в ключ кэша, поэтому свежий объектный литерал при каждом рендере создаёт новый ключ, новый запрос и цикл запросов, который не заканчивается. И select выполняется при каждом изменении хранилища, поэтому он должен быть мемоизированным селектором: обычный filter внутри select создаёт новый массив каждый раз и обнуляет всю мемоизацию ниже по дереву.\n\nТриггер отклоняется, когда запрос падает, поэтому вызывающий код может обработать ошибку на месте. Метод unwrap превращает результат в промис, который отклоняется самой ошибкой, а не разрешается объектом, её содержащим.'
      ),
      bullets: [
        L('Every endpoint gets a query hook and a mutation hook.', 'Каждому эндпоинту соответствует хук запроса и хук мутации.'),
        L('The query hook returns data, error, isLoading, isFetching and isSuccess.', 'Хук запроса возвращает data, error, isLoading, isFetching и isSuccess.'),
        L('The arguments are serialised, so a new object literal means a new request.', 'Аргументы сериализуются, поэтому новый объектный литерал означает новый запрос.'),
        L('select runs on every store change and must be memoised.', 'select выполняется при каждом изменении хранилища и должен быть мемоизирован.'),
        L('The mutation trigger rejects on failure and unwrap gives the raw error.', 'Триггер мутации отклоняется при ошибке, а unwrap отдаёт исходную ошибку.'),
      ],
      code: `import { useGetPostsQuery, useAddPostMutation } from './postsApi';

export function usePostsPanel() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const [addPost, { isLoading: isSaving }] = useAddPostMutation();

  async function onSubmit(title: string) {
    try {
      // unwrap turns the failure into a rejection with the real error.
      await addPost({ title }).unwrap();
    } catch (error) {
      console.error('the post was not saved', error);
    }
  }

  return { posts, isLoading, isError, isSaving, onSubmit };
}

// The request is not sent until the argument is known.
export function useUserPanel(userId: string) {
  return useGetUserQuery(userId, { skip: !userId });
}`,
      table: {
        caption: L('What the options object changes', 'Что меняет объект опций'),
        headers: [L('Option', 'Опция'), L('Effect', 'Эффект'), L('Typical reason', 'Типичная причина')],
        rows: [
          [
            L('skip', 'skip'),
            L('the request is not sent', 'запрос не отправляется'),
            L('the argument is not known yet', 'аргумент ещё неизвестен'),
          ],
          [
            L('refetchOnMountOrArgChange', 'refetchOnMountOrArgChange'),
            L('the entry is refetched', 'запись перезапрашивается'),
            L('the data must be fresh on screen', 'данные на экране должны быть свежими'),
          ],
          [
            L('pollingInterval', 'pollingInterval'),
            L('the request repeats on a timer', 'запрос повторяется по таймеру'),
            L('the server pushes nothing', 'сервер ничего не присылает'),
          ],
          [
            L('select', 'select'),
            L('the cached data is transformed', 'кэшированные данные преобразуются'),
            L('the component needs a projection', 'компоненту нужна проекция'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A new object on every render', 'Новый объект при каждом рендере'),
          text: L(
            'useGetPostQuery({ id: 1 }) creates a new cache key on every render, so the hook starts a new request every time and the component never settles. Pass the primitive argument, or a value whose reference is stable.',
            'useGetPostQuery({ id: 1 }) создаёт новый ключ кэша при каждом рендере, поэтому хук начинает новый запрос каждый раз и компонент никогда не приходит в покой. Передавайте примитивный аргумент или значение со стабильной ссылкой.'
          ),
        },
        {
          tone: 'tip',
          title: L('Handle the failure at the trigger', 'Обрабатывайте ошибку у триггера'),
          text: L(
            'The trigger is the place where the user made the request, so it is the place where the message about the failure belongs. A global error handler turns a failed save into a mystery.',
            'Триггер — это место, где пользователь инициировал запрос, значит, и сообщение об ошибке должно быть здесь. Глобальный обработчик превращает неудачную запись в загадку.'
          ),
        },
      ],
      takeaway: L(
        'Pass stable, serialisable arguments to a query hook, and handle the failure of a mutation where the trigger is called.',
        'Передавайте в хук запроса стабильные сериализуемые аргументы и обрабатывайте ошибку мутации там, где вызывается триггер.'
      ),
      seeAlso: [
        L('Chapter 3: reading state with selectors', 'Глава 3: чтение состояния селекторами'),
        L('Section 5-1: endpoints and the cache', 'Секция 5-1: эндпоинты и кэш'),
        L('Section 3-3: memoisation with createSelector', 'Секция 3-3: мемоизация через createSelector'),
      ],
    },
    {
      id: 'redux-ch5-s6',
      title: L('When RTK Query is the wrong tool', 'Когда RTK Query не нужен'),
      body: L(
        'RTK Query is a data layer for a remote server, and it is a bad fit for anything else. Client state such as the text in a form field, the open state of a modal, the current step of a wizard or a pending drag belongs in a slice or in React state, not in the cache of a library that assumes every entry came from an HTTP response.\n\nThe cache also assumes a request and a response. A websocket stream, a server-sent event or a subscription needs a custom baseQuery and careful work to keep the cache honest, and the tag model starts to strain. If the application already has a data layer that works, adding a second one splits the truth: two caches, two places to look for the same fact and two sets of loading flags.\n\nThe clearest sign that you reached for the wrong tool is the need to write data into the cache by hand. Every manual write into a cache entry is a promise that you will invalidate it correctly later, and that promise is easy to forget.\n\nSo use RTK Query when the data lives on a server, when it is worth caching and when several components read it. Use a slice when the data is produced inside the browser, and use plain React state when only one component cares.',
        'RTK Query — это слой данных для удалённого сервера, и ко всему остальному он подходит плохо. Клиентское состояние: текст в поле формы, открытое модальное окно, текущий шаг визарда, перетаскиваемый элемент — должно жить в слайсе или в состоянии React, а не в кэше библиотеки, которая считает, что каждая запись пришла из HTTP-ответа.\n\nКэш также предполагает запрос и ответ. Вебсокет, server-sent event или подписка требуют кастомного baseQuery и аккуратной работы, чтобы кэш оставался честным, а модель тегов начинает натягиваться. Если в приложении уже есть работающий слой данных, второй слой делит правду пополам: два кэша, два места, где ищут один и тот же факт, и два набора флагов загрузки.\n\nСамый явный признак того, что инструмент выбран неверно, — необходимость вручную записывать данные в кэш. Каждая такая запись — обещание, что вы потом корректно её инвалидируете, а такие обещания легко забывают.\n\nИтак: RTK Query — когда данные лежат на сервере, когда их стоит кэшировать и когда их читают несколько компонентов. Слайс — когда данные производятся в браузере. Обычное состояние React — когда значение читает один компонент.'
      ),
      bullets: [
        L('RTK Query is for server state, client state belongs in a slice.', 'RTK Query — для серверного состояния, клиентское состояние живёт в слайсе.'),
        L('A websocket or an event stream does not fit the request and response model.', 'Вебсокет или поток событий не вписываются в модель запрос-ответ.'),
        L('Two data layers mean two caches and two sources of truth.', 'Два слоя данных — это два кэша и два источника правды.'),
        L('Writing into the cache by hand is a promise to invalidate later.', 'Ручная запись в кэш — это обещание потом инвалидировать запись.'),
        L('Use plain React state when only one component reads the value.', 'Используйте состояние React, когда значение читает один компонент.'),
      ],
      code: `import { useState } from 'react';
import { useGetPostsQuery } from './postsApi';
import { useAppSelector } from './store';

// Server state: RTK Query owns the cache, the tags and the refetching.
const { data: posts, isLoading } = useGetPostsQuery();

// Client state: a slice owns the draft until it is sent.
const draft = useAppSelector((state) => state.editor.draft);
const draftChanged = useAppSelector((state) => state.editor.draftChanged);

// Local state: nothing else reads it, so React state is enough.
const [isOpen, setIsOpen] = useState(false);

// The wrong place for any of the three: the cache of a data library.
const cached = useGetPostsQuery(undefined, {
  selectFromResult: () => ({ isOpen: false }),
});`,
      table: {
        caption: L('Where a piece of state belongs', 'Где должно жить состояние'),
        headers: [L('State', 'Состояние'), L('Home', 'Где живёт'), L('Why', 'Почему')],
        rows: [
          [
            L('a list of posts from the server', 'список постов с сервера'),
            L('the RTK Query cache', 'кэш RTK Query'),
            L('it is cached, tagged and refetched', 'он кэшируется, тегируется и перезапрашивается'),
          ],
          [
            L('the text in the form field', 'текст в поле формы'),
            L('a slice or React state', 'слайс или состояние React'),
            L('it is never fetched and never invalidated', 'его никогда не запрашивают и не инвалидируют'),
          ],
          [
            L('the open state of a modal', 'открытое модальное окно'),
            L('React state', 'состояние React'),
            L('only one component reads it', 'его читает один компонент'),
          ],
          [
            L('the current user', 'текущий пользователь'),
            L('a slice', 'слайс'),
            L('it comes from the session, not from an endpoint', 'он приходит из сессии, а не из эндпоинта'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two layers, two truths', 'Два слоя — две правды'),
          text: L(
            'Keeping the same list in the RTK Query cache and in a slice of your own is the most common way to end up with two versions of one screen. The components that read the cache show fresh data, the ones that read the slice show the data from the last time somebody remembered to copy it.',
            'Хранение одного и того же списка в кэше RTK Query и в собственном слайсе — самый частый способ получить две версии одного экрана. Компоненты, читающие кэш, показывают свежие данные, а читающие слайс — то, что было при последнем копировании.'
          ),
        },
        {
          tone: 'note',
          title: L('A custom baseQuery is still possible', 'Кастомный baseQuery всё же возможен'),
          text: L(
            'The transport is replaceable: a baseQuery can talk to GraphQL, to a local mock or to a worker. What does not change is the model of the cache, the tags and the hooks, so pick the library by the shape of your data, not by the shape of your transport.',
            'Транспорт заменяем: baseQuery может говорить с GraphQL, с локальным моком или с воркером. Не меняется модель кэша, тегов и хуков, поэтому выбирайте библиотеку по форме данных, а не по форме транспорта.'
          ),
        },
      ],
      takeaway: L(
        'Use RTK Query for server data and a slice for client data, because a value that lives in both places will eventually disagree with itself.',
        'Используйте RTK Query для серверных данных, а слайс — для клиентских: значение, живущее в обоих местах, рано или поздно разойдётся с самим собой.'
      ),
      seeAlso: [
        L('Chapter 2: slices and the shape of a domain', 'Глава 2: слайсы и форма домена'),
        L('Section 7-6: common state architecture mistakes', 'Секция 7-6: типичные ошибки в организации состояния'),
        L('Section 5-1: endpoints and the cache', 'Секция 5-1: эндпоинты и кэш'),
      ],
    },
  ],
};
