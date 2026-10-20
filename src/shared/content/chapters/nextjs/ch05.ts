import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh05: Chapter = {
  id: 'next-ch5',
  title: L('Middleware and routing', 'Промежуточное ПО и маршрутизация'),
  summary: L(
    'What the request interception layer can and cannot do, how redirects, rewrites and headers work there, how the matcher decides where it runs, and why an edge authentication check is a fast filter rather than a security boundary.',
    'Что может и чего не может слой перехвата запросов, как там работают редиректы, переписывания и заголовки, как матчер решает, где слой работает, и почему проверка аутентификации на краю — это быстрый фильтр, а не граница безопасности.'
  ),
  sections: [
    {
      id: 'next-ch5-s1',
      title: L('What middleware can and cannot do', 'Что может и чего не может промежуточное ПО'),
      body: L(
        'Middleware is a piece of code that runs before a request reaches the application. It sees the request, and it can decide to continue, to redirect, to rewrite the URL, to add headers or to answer with a response of its own. The framework calls it for every request that matches, and the decision it returns decides which route handles the request.\n\nThe name is overloaded, which is why Next.js 16 renamed the file convention from `middleware.ts` to `proxy.ts` and the exported function from `middleware` to `proxy`. The old file still works but is deprecated, and a codemod performs the rename. The new name describes what the layer really is: a network boundary in front of the application, not a chain of Express-style middlewares.\n\nWhat it cannot do matters just as much. It cannot read the database in a reliable way, it cannot import modules that only exist in Node when it runs on the Edge runtime, and it cannot depend on the React tree or on anything a page renders. Its inputs are the request and the environment, and its output is a decision about the request.\n\nThere is also a scope limit: exactly one such file per project. That is deliberate, because every layer in front of the application is a layer that runs on every request. Instead of several files the convention is one file that imports small modules and composes them, which keeps the cost visible and the behaviour predictable.',
        'Промежуточное ПО — это код, который выполняется до того, как запрос дойдёт до приложения. Он видит запрос и может решить: продолжить, перенаправить, переписать URL, добавить заголовки или ответить собственным ответом. Фреймворк вызывает его для каждого подходящего запроса, и возвращённое решение определяет, какой маршрут обработает запрос.\n\nИмя перегружено, и поэтому в Next.js 16 соглашение файлов переименовали из `middleware.ts` в `proxy.ts`, а экспортируемую функцию — из `middleware` в `proxy`. Старый файл работает, но объявлен устаревшим, а переименование выполняет специальный codemod. Новое имя описывает то, чем слой является на самом деле: сетевой границей перед приложением, а не цепочкой middleware в стиле Express.\n\nЧего он не может, тоже важно. Он не может надёжно ходить в базу, не может импортировать модули, существующие только в Node, когда работает на Edge runtime, и не может зависеть от дерева React или от того, что отрисует страница. На входе у него запрос и окружение, на выходе — решение о запросе.\n\nЕсть ещё ограничение по области: такой файл в проекте ровно один. Это сделано намеренно, потому что каждый слой перед приложением — это слой, работающий на каждом запросе. Вместо нескольких файлов соглашение предполагает один файл, который импортирует небольшие модули и собирает их, и так стоимость видна, а поведение предсказуемо.'
      ),
      bullets: [
        L('The layer runs before the application and can decide the fate of the request.', 'Слой работает до приложения и может решить судьбу запроса.'),
        L('Next.js 16 renamed the convention to proxy.ts, and middleware.ts still works but is deprecated.', 'В Next.js 16 соглашение переименовали в proxy.ts, а middleware.ts работает, но устарел.'),
        L('It sees the request and the environment, not the React tree.', 'Он видит запрос и окружение, а не дерево React.'),
        L('One file per project, compose it from imported modules.', 'Один файл на проект, собирайте его из импортируемых модулей.'),
        L('It cannot be relied on to reach the database.', 'На него нельзя полагаться в обращении к базе.'),
      ],
      code: `// proxy.ts - Next.js 16, the file was middleware.ts before
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/app')) {
    const response = NextResponse.next();
    response.headers.set('x-app-surface', 'dashboard');
    return response;
  }

  return NextResponse.next();
}`,
      table: {
        caption: L('What the interception layer may do', 'Что может слой перехвата'),
        headers: [
          L('Action', 'Действие'),
          L('Result', 'Результат'),
          L('Changes the URL', 'Меняет URL'),
        ],
        rows: [
          [
            L('Continue', 'Продолжить'),
            L('The request proceeds', 'Запрос идёт дальше'),
            L('No', 'Нет'),
          ],
          [
            L('Redirect', 'Редирект'),
            L('The browser is sent elsewhere', 'Браузер отправляется в другое место'),
            L('Yes', 'Да'),
          ],
          [
            L('Rewrite', 'Переписывание'),
            L('A different route serves the request', 'Запрос обслуживает другой маршрут'),
            L('No', 'Нет'),
          ],
          [
            L('Set a header', 'Задать заголовок'),
            L('The request or the response carries it', 'Его несёт запрос или ответ'),
            L('No', 'Нет'),
          ],
          [
            L('Respond', 'Ответить самому'),
            L('The layer answers on its own', 'Слой отвечает сам'),
            L('No', 'Нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Treating middleware as a security boundary', 'Промежуточное ПО как граница безопасности'),
          text: L(
            'The layer sees an unauthenticated request and can send it to the login page. That is routing, not protection, because the same request can be sent directly to the action or the endpoint that does the real work.',
            'Слой видит неаутентифицированный запрос и может отправить его на страницу входа. Это маршрутизация, а не защита, потому что тот же запрос можно отправить напрямую в действие или в эндпоинт, который делает настоящую работу.'
          ),
        },
        {
          tone: 'note',
          title: L('One file per project', 'Один файл на проект'),
          text: L(
            'Only one interception file is supported, and the reason is performance rather than taste. Several layers in front of the application mean several passes over every request, so the framework keeps the entry point single and lets the file compose the logic.',
            'Поддерживается только один файл перехвата, и причина в производительности, а не в вкусе. Несколько слоёв перед приложением — это несколько проходов по каждому запросу, поэтому фреймворк держит точку входа единственной, а логику собирать оставляет файлу.'
          ),
        },
      ],
      takeaway: L(
        'The interception layer sees a request and decides; it cannot see the data or the React tree.',
        'Слой перехвата видит запрос и принимает решение; он не видит ни данных, ни дерева React.'
      ),
      seeAlso: [
        L('Section 5-2: redirects, rewrites and headers', 'Секция 5-2: редиректы, переписывания и заголовки'),
        L('Section 5-4: authentication at the edge', 'Секция 5-4: аутентификация на краю'),
        L('Section 2-2: what runs where', 'Секция 2-2: что где выполняется'),
      ],
    },
    {
      id: 'next-ch5-s2',
      title: L('Redirects, rewrites and headers', 'Редиректы, переписывания и заголовки'),
      body: L(
        'The three verbs of the layer are easy to confuse because they look the same in the browser address bar. A redirect sends a response with a location header, and the browser follows it, so the URL in the address bar changes and the history entry changes with it. A rewrite serves a different route while the URL stays exactly as the visitor typed it. Setting a header changes neither the route nor the URL.\n\nThe distinction decides how the feature should feel. A rewrite is for serving the same content under two addresses: a country prefix such as `/de/about` that internally maps to `/about`, a legacy path that points at its new home, an experiment that swaps the component. A redirect is for telling the browser that the address has changed, and the browser then updates its history.\n\nHeaders are the third instrument. A request header set before the route runs is visible to the page and to the server components, and a response header set on the way out is visible to the browser and to the CDN. Setting a request header is how a feature flag or a tenant identifier reaches the application without touching the URL.\n\nOne caution belongs with rewrites: a rewrite that points at a path the matcher also matches re-enters the layer, and the result is an infinite loop. The layer has to be written so that the rewritten path cannot match itself, and this is one of those bugs that only shows up in production, because the loop depends on the matcher and the rewrite target agreeing.',
        'Три глагола слоя легко перепутать, потому что в адресной строке браузера они выглядят одинаково. Редирект отдаёт ответ с заголовком location, браузер следует по нему, URL в адресной строке меняется, и запись в истории меняется вместе с ним. Переписывание отдаёт другой маршрут, а URL остаётся ровно таким, как его набрал посетитель. Заголовок не меняет ни маршрут, ни URL.\n\nРазличие определяет, как функция будет ощущаться. Переписывание — это один и тот же контент по двум адресам: префикс страны вида `/de/about`, который внутри отображается на `/about`, старый путь, указывающий на новое место, или эксперимент, подменяющий компонент. Редирект говорит браузеру, что адрес изменился, и браузер обновляет историю.\n\nЗаголовки — третий инструмент. Заголовок запроса, установленный до запуска маршрута, виден странице и серверным компонентам, а заголовок ответа на выходе виден браузеру и CDN. Установка заголовка запроса — это способ передать приложению флаг функции или идентификатор арендатора, не трогая URL.\n\nК переписываниям относится одна предосторожность: переписывание, нацеленное на путь, который матчер тоже ловит, снова заходит в слой, и результатом оказывается бесконечный цикл. Слой надо писать так, чтобы переписанный путь не мог совпасть сам с собой, и это как раз тот баг, который проявляется только в проде, потому что цикл зависит от согласия матчера и цели переписывания.'
      ),
      bullets: [
        L('A redirect changes the URL in the browser and adds a history entry.', 'Редирект меняет URL в браузере и добавляет запись в истории.'),
        L('A rewrite serves another route while the URL stays the same.', 'Переписывание отдаёт другой маршрут, а URL остаётся прежним.'),
        L('Request headers are visible to the route, response headers to the browser.', 'Заголовки запроса видит маршрут, заголовки ответа — браузер.'),
        L('A rewrite that matches the matcher again loops forever.', 'Переписывание, совпавшее с матчером, зацикливается.'),
        L('Rewrites are invisible to the client, so use them for content and not for navigation.', 'Переписывания не видны клиенту, поэтому их используют для контента, а не для навигации.'),
      ],
      code: `// proxy.ts
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // a rewrite serves another route, the address bar stays the same
  if (pathname.startsWith('/de/')) {
    return NextResponse.rewrite(new URL(pathname.slice(3), request.url));
  }

  // a redirect tells the browser the address has changed
  if (pathname === '/old-pricing') {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  // a request header reaches the route without touching the URL
  const headers = new Headers(request.headers);
  headers.set('x-tenant', 'acme');
  return NextResponse.next({ request: { headers } });
}`,
      table: {
        caption: L('Redirect, rewrite, header', 'Редирект, переписывание, заголовок'),
        headers: [
          L('Aspect', 'Аспект'),
          L('redirect', 'redirect'),
          L('rewrite', 'rewrite'),
        ],
        rows: [
          [
            L('Address bar changes', 'Адресная строка меняется'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('Browser follows', 'Браузер следует'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('History entry', 'Запись в истории'),
            L('Added', 'Добавляется'),
            L('Untouched', 'Не трогается'),
          ],
          [
            L('Typical status', 'Типичный статус'),
            L('307', '307'),
            L('200', '200'),
          ],
          [
            L('Best for', 'Лучше всего подходит для'),
            L('Moved content', 'Переехавшего контента'),
            L('The same content, another path', 'Того же контента по другому пути'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The rewrite loop', 'Цикл переписывания'),
          text: L(
            'A rewrite to a path that the matcher also matches sends the request through the layer again, and again, until the runtime gives up. Keep the matcher and the rewrite target disjoint, and test the pair rather than each part alone.',
            'Переписывание в путь, который ловит и матчер, отправляет запрос через слой снова и снова, пока рантайм не сдастся. Держите матчер и цель переписывания непересекающимися и проверяйте пару, а не каждую часть по отдельности.'
          ),
        },
        {
          tone: 'tip',
          title: L('Use a request header to pass context', 'Передавайте контекст заголовком запроса'),
          text: L(
            'A tenant identifier or a feature flag in a request header reaches every server component without touching the URL and without adding a query parameter that ends up in the cache key.',
            'Идентификатор арендатора или флаг функции в заголовке запроса доходит до каждого серверного компонента, не трогая URL и не добавляя query-параметр, который попал бы в ключ кэша.'
          ),
        },
      ],
      takeaway: L(
        'A redirect moves the address, a rewrite hides the move, and a header carries context.',
        'Редирект меняет адрес, переписывание скрывает перемещение, а заголовок передаёт контекст.'
      ),
      seeAlso: [
        L('Section 5-1: what middleware can and cannot do', 'Секция 5-1: что может и чего не может промежуточное ПО'),
        L('Section 5-3: matcher configuration', 'Секция 5-3: настройка матчера'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
      ],
    },
    {
      id: 'next-ch5-s3',
      title: L('Matcher configuration', 'Настройка матчера'),
      body: L(
        'By default the layer runs for every request that goes through the framework, including every static asset. That is wasteful and, for a layer that does real work, noticeable. The `config` export with a `matcher` restricts it to a set of paths, and the matcher is written as a path pattern.\n\nThe matcher syntax is a small language of its own: `:param` matches one segment, `:param*` matches zero or more, `:param+` matches one or more, and a `*` matches any part of a segment. A matcher is matched against the pathname, and the usual shape is an array of strings or of regular expressions.\n\nA matcher may also carry conditions on the request, expressed with `has` and `missing`, each a list of key and value pairs matched against headers, cookies, query parameters or the host. That is how a layer runs only for requests that carry a particular cookie, and it keeps the common case out of the code.\n\nThe cost of a broad matcher is paid on every request, including the ones the layer would have ignored. A matcher that covers the whole site and then filters inside the function does the same work as no matcher at all, plus the function call. Narrow the matcher to the paths that need the layer, and use `has` for the conditions that the path cannot express.',
        'По умолчанию слой выполняется для каждого запроса, проходящего через фреймворк, включая каждый статический файл. Это расточительно, а для слоя с реальной работой ещё и заметно. Экспорт `config` с полем `matcher` ограничивает его набором путей, а матчер пишется как шаблон пути.\n\nСинтаксис матчера — небольшой собственный язык: `:param` совпадает с одним сегментом, `:param*` с нулём или более, `:param+` с одним или более, а `*` совпадает с любой частью сегмента. Матчер применяется к pathname, и обычная форма — массив строк или регулярных выражений.\n\nМатчер может нести и условия на запрос, заданные через `has` и `missing`: каждый из них — список пар ключ и значение, которые сопоставляются с заголовками, cookie, query-параметрами или хостом. Так слой выполняется только для запросов с нужной cookie, и обычный случай не попадает в код.\n\nЦена широкого матчера платится на каждом запросе, включая те, которые слой всё равно проигнорировал бы. Матчер, покрывающий весь сайт, а потом фильтрующий внутри функции, делает ту же работу, что и отсутствие матчера, плюс вызов функции. Сужайте матчер до путей, которым слой действительно нужен, а условия, которые нельзя выразить путём, переносите в `has`.'
      ),
      bullets: [
        L('Without a matcher the layer runs for every request, assets included.', 'Без матчера слой выполняется на каждый запрос, включая статические файлы.'),
        L('The matcher syntax supports :param, :param*, :param+ and a wildcard.', 'Синтаксис матчера поддерживает :param, :param*, :param+ и звёздочку.'),
        L('has and missing add conditions on headers, cookies, query parameters and host.', 'has и missing добавляют условия по заголовкам, cookie, query-параметрам и хосту.'),
        L('A matcher that filters inside the function costs the same as no matcher.', 'Матчер, фильтрующий внутри функции, стоит столько же, сколько его отсутствие.'),
        L('Keep the matcher as narrow as the behaviour requires.', 'Держите матчер настолько узким, насколько требует поведение.'),
      ],
      code: `// proxy.ts
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (!request.cookies.get('session')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // one or more segments
    '/api/:path+',        // at least one segment
    {
      source: '/docs/:slug',
      missing: [{ type: 'cookie', key: 'preview' }],
    },
  ],
};`,
      table: {
        caption: L('Matcher patterns', 'Шаблоны матчера'),
        headers: [
          L('Pattern', 'Шаблон'),
          L('Matches', 'Совпадает с'),
          L('Example', 'Пример'),
        ],
        rows: [
          [
            L('/about', '/about'),
            L('Exactly one path', 'Ровно один путь'),
            L('/about', '/about'),
          ],
          [
            L('/blog/:slug', '/blog/:slug'),
            L('One segment', 'Один сегмент'),
            L('/blog/hello', '/blog/hello'),
          ],
          [
            L('/blog/:slug*', '/blog/:slug*'),
            L('Zero or more segments', 'Ноль или более сегментов'),
            L('/blog and /blog/a/b', '/blog и /blog/a/b'),
          ],
          [
            L('/api/:path+', '/api/:path+'),
            L('At least one segment', 'Хотя бы один сегмент'),
            L('/api/users', '/api/users'),
          ],
          [
            L('/files/*', '/files/*'),
            L('Any part of a segment', 'Любая часть сегмента'),
            L('/files/report.pdf', '/files/report.pdf'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The matcher that matches everything', 'Матчер, совпадающий со всем'),
          text: L(
            'A catch-all matcher plus a filter inside the function is the worst of both worlds: the layer runs on assets, prefetches and API calls, and the function does the filtering anyway. Move the condition into the matcher and the function runs only when it matters.',
            'Матчер на всё плюс фильтр внутри функции — худшее из двух: слой работает на статике, префетчах и API-вызовах, а фильтрация всё равно происходит в коде. Перенесите условие в матчер, и функция будет работать только когда это нужно.'
          ),
        },
        {
          tone: 'note',
          title: L('Static assets are requests too', 'Статические файлы — тоже запросы'),
          text: L(
            'Images, scripts and stylesheets pass through the same pipeline as pages. If the layer runs for them, every asset pays for the decision, and the pages that were supposed to be fast are waiting behind a function that does not care about them.',
            'Картинки, скрипты и стили проходят по тому же конвейеру, что и страницы. Если слой работает и для них, каждый статический файл платит за решение, а «быстрые» страницы ждут за функцией, которой они не нужны.'
          ),
        },
      ],
      takeaway: L(
        'The matcher is the first line of defence for performance, so make it narrow.',
        'Матчер — первая линия защиты слоя перехвата по производительности, поэтому держите его узким.'
      ),
      seeAlso: [
        L('Section 5-2: redirects, rewrites and headers', 'Секция 5-2: редиректы, переписывания и заголовки'),
        L('Section 5-5: middleware performance', 'Секция 5-5: производительность промежуточного ПО'),
        L('Section 1-1: folder conventions and the route tree', 'Секция 1-1: соглашения по папкам и дерево маршрутов'),
      ],
    },
    {
      id: 'next-ch5-s4',
      title: L('Authentication at the edge', 'Аутентификация на краю'),
      body: L(
        'The layer runs before the application, so it is the natural place for a cheap check: is there a session cookie at all, and does it look valid? If not, redirect to the login page. The check is fast, it does not touch the database, and it keeps unauthenticated traffic away from the expensive part of the system.\n\nIt is a filter, not a security boundary. The layer sees a cookie, and a cookie is a claim the client made. Verifying the signature of a session token is possible at the edge, but reading the database to check whether the account still exists, whether the role changed or whether the record was deleted is not what this layer is for. The definitive check belongs in the route, in the server component and in the server action.\n\nThe classic mistake is to hide the page instead of protecting the data. A layout that redirects when there is no session protects the rendering of a page, but the data the page fetches may still be reachable through an action, a route handler or a cached response produced while the session was still valid. The redirect is a user experience decision, and the check in the data path is the security decision.\n\nThe second mistake is trusting the layer to do the authorisation. It can tell whether a request carries a token, and it can even tell whether the token names an administrator, but deciding whether this particular administrator may edit this particular record requires the record. Authorisation that depends on data belongs next to the data.',
        'Слой работает до приложения, поэтому он естественное место для дешёвой проверки: есть ли вообще cookie сессии и похожа ли она на настоящую? Если нет, редирект на страницу входа. Проверка быстрая, она не ходит в базу и держит неаутентифицированный трафик подальше от дорогой части системы.\n\nЭто фильтр, а не граница безопасности. Слой видит cookie, а cookie — это заявление, сделанное клиентом. Проверить подпись токена сессии на краю можно, а вот сходить в базу и выяснить, существует ли аккаунт, не изменилась ли роль и не удалена ли запись, — не работа этого слоя. Окончательная проверка живёт в маршруте, в серверном компоненте и в серверном действии.\n\nКлассическая ошибка — спрятать страницу вместо защиты данных. Компоновка, которая редиректит при отсутствии сессии, защищает отрисовку страницы, но данные, которые страница загружает, всё ещё могут быть доступны через действие, обработчик маршрута или кэшированный ответ, полученный, пока сессия была жива. Редирект — это решение об интерфейсе, а проверка в пути данных — это решение о безопасности.\n\nВторая ошибка — доверить слою авторизацию. Он может сказать, несёт ли запрос токен, и даже сказать, что токен принадлежит администратору, но решить, может ли этот конкретный администратор редактировать эту конкретную запись, без самой записи невозможно. Авторизация, зависящая от данных, живёт рядом с данными.'
      ),
      bullets: [
        L('The edge check is fast and cheap, so it filters traffic before the expensive work.', 'Проверка на краю быстрая и дешёвая, поэтому фильтрует трафик до дорогой работы.'),
        L('It is not a security boundary, because a cookie is only a claim.', 'Это не граница безопасности, потому что cookie — лишь заявление.'),
        L('The definitive check belongs in the route, the server component and the action.', 'Окончательная проверка живёт в маршруте, серверном компоненте и действии.'),
        L('Hiding a page does not protect the data behind it.', 'Спрятать страницу не значит защитить данные за ней.'),
        L('Role decisions that depend on a record belong next to the record.', 'Решения о ролях, зависящие от записи, живут рядом с записью.'),
      ],
      code: `// proxy.ts
import { NextResponse, type NextRequest } from 'next/server';
export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get('session')?.value);
  const { pathname } = request.nextUrl;
  if (!hasSession && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// app/dashboard/page.tsx - the real check
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return <p>Welcome, {session.user.email}</p>;
}`,
      table: {
        caption: L('Where each check belongs', 'Где должна быть каждая проверка'),
        headers: [
          L('Check', 'Проверка'),
          L('In the layer', 'В слое'),
          L('In the route or the data path', 'В маршруте или в пути данных'),
        ],
        rows: [
          [
            L('Is there a session cookie', 'Есть ли cookie сессии'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('Is the token well formed', 'Корректен ли токен'),
            L('Yes', 'Да'),
            L('Optional', 'По желанию'),
          ],
          [
            L('Is the account still active', 'Активен ли аккаунт'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('Does this user own this record', 'Владеет ли пользователь записью'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('May this role edit this row', 'Может ли эта роль править строку'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The redirect that replaces the permission check', 'Редирект вместо проверки прав'),
          text: L(
            'Hiding the page makes the UI look protected while the endpoint behind it stays open. The data path needs its own check, and the layer redirect is only a shortcut for the browser.',
            'Спрятанная страница выглядит защищённой, а эндпоинт за ней остаётся открытым. Путь данных требует собственной проверки, а редирект в слое — лишь shortcuts для браузера.'
          ),
        },
        {
          tone: 'warning',
          title: L('A cached response that outlives the session', 'Кэшированный ответ, переживающий сессию'),
          text: L(
            'A page rendered for one visitor can be stored and served to the next one. That is exactly what the route cache is for, and it is why an authorisation decision must not be made once at render time and then reused.',
            'Страница, отрендеренная для одного посетителя, может попасть в кэш и достаться следующему. Для этого кэш маршрутов и существует, и именно поэтому решение о правах нельзя принять один раз при рендере и потом переиспользовать.'
          ),
        },
      ],
      takeaway: L(
        'The edge check filters traffic, the check next to the data decides.',
        'Проверка на краю фильтрует трафик, а проверка рядом с данными решает.'
      ),
      seeAlso: [
        L('Section 5-1: what middleware can and cannot do', 'Секция 5-1: что может и чего не может промежуточное ПО'),
        L('Section 4-2: validation and authorisation', 'Секция 4-2: валидация и авторизация'),
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
      ],
    },
    {
      id: 'next-ch5-s5',
      title: L('Middleware performance', 'Производительность промежуточного ПО'),
      body: L(
        'The layer sits in front of everything, so its cost is paid by every request that matches, including the ones that will never reach application code. That makes it the worst possible place for slow work: a database lookup, a signature verification against a key fetched over the network, a call to a third-party API. Every one of those milliseconds is added to every request.\n\nThe budget is easy to state and easy to break. The layer should do work proportional to the size of a cookie header and nothing more: read a cookie, check a claim, set a header. If it needs to talk to a database, that call belongs in the route where the data is already being read, and the result should be cached there.\n\nThe second cost is the matcher, and it is the one people forget. A layer whose matcher covers the entire site runs on asset requests, on prefetches and on every page, and the function call alone adds latency to requests that needed nothing. Narrow the matcher to the routes that need the behaviour and exclude static files and API routes explicitly when they are not needed.\n\nThe third cost is the deployment model. The layer used to be pinned to the Edge runtime and ran close to the visitor, which is fast for a simple check and awkward for anything that needs Node APIs; since Next.js 15 the Node runtime is supported and in Next.js 16 it is the default for the proxy convention. That removes the runtime limitation, but it does not remove the latency of a round trip to a database, so the rule stays the same.',
        'Слой стоит перед всем, поэтому его стоимость платит каждый подходящий запрос, включая те, которые до кода приложения не дойдут. Это худшее место для медленной работы: обращения к базе, проверки подписи по ключу, полученному по сети, вызова стороннего API. Каждая такая миллисекунда добавляется к каждому запросу.\n\nБюджет легко сформулировать и легко сломать. Слой должен делать работу, пропорциональную размеру заголовка cookie, и ничего больше: прочитать cookie, проверить заявление, задать заголовок. Если ему нужно ходить в базу, этот вызов принадлежит маршруту, где данные и так читаются, а результат должен кэшироваться там.\n\nВторая стоимость — матчер, и о ней забывают чаще всего. Слой, матчер которого покрывает весь сайт, работает на запросах статических файлов, на префетчах и на каждой странице, и один только вызов функции добавляет задержку запросам, которым ничего не нужно. Сужайте матчер до маршрутов, которым поведение нужно, и исключайте статику и API явно там, где они не нужны.\n\nТретья стоимость — модель развёртывания. Слой раньше был привязан к Edge runtime и выполнялся рядом с посетителем, что быстро для простой проверки и неудобно для всего, что требует Node API; с Next.js 15 поддерживается Node runtime, а в Next.js 16 он стал умолчанием для соглашения proxy. Это снимает ограничение по рантайму, но не снимает задержку кругового запроса в базу, и правило остаётся прежним.'
      ),
      bullets: [
        L('The layer runs before the application, so its cost is on every matched request.', 'Слой работает до приложения, и его стоимость ложится на каждый подходящий запрос.'),
        L('Keep it to cookie reads, claim checks and header writes.', 'Держите его на чтении cookie, проверке заявлений и записи заголовков.'),
        L('Database calls belong in the route, not in the layer.', 'Обращения к базе принадлежат маршруту, а не слою.'),
        L('A broad matcher taxes assets and prefetches too.', 'Широкий матчер облагает и статику, и префетчи.'),
        L('The Node runtime removed the runtime limit, not the latency.', 'Node runtime снял ограничение по рантайму, но не задержку.'),
      ],
      code: `// proxy.ts - keep the work local and cheap
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  if (!token) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set('x-session-present', '1');
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`,
      table: {
        caption: L('Where the time goes', 'Куда уходит время'),
        headers: [
          L('Work', 'Работа'),
          L('In the layer', 'В слое'),
          L('In the route', 'В маршруте'),
        ],
        rows: [
          [
            L('Read a cookie', 'Прочитать cookie'),
            L('Yes', 'Да'),
            L('Yes', 'Да'),
          ],
          [
            L('Check a claim in a token', 'Проверить заявление в токене'),
            L('Yes', 'Да'),
            L('Yes', 'Да'),
          ],
          [
            L('Verify a signature with a remote key', 'Проверить подпись по удалённому ключу'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('Read the database', 'Сходить в базу'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('Call a third-party API', 'Вызвать сторонний API'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Measure the layer, not the page', 'Измеряйте слой, а не страницу'),
          text: L(
            'The time the layer adds shows up on every page that matches, which makes it easy to miss in a page-level measurement. Look at the layer alone, with a request that hits it and one that does not.',
            'Время, которое добавляет слой, видно на каждой подходящей странице, и поэтому его легко пропустить в замерах страницы. Смотрите на слой отдельно: запрос, который попадает в него, и запрос, который не попадает.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A matcher that includes the assets', 'Матчер, включающий статику'),
          text: L(
            'Static files are served from a CDN and are usually the bulk of the traffic. When the layer matches them too, the cheapest requests in the system start paying for the most expensive part of it.',
            'Статические файлы раздаются с CDN и обычно составляют основную долю трафика. Если слой ловит и их, самые дешёвые запросы системы начинают платить за самую дорогую её часть.'
          ),
        },
      ],
      takeaway: L(
        'Keep the layer to cheap, local decisions and move everything that needs the network into the route.',
        'Держите слой на дешёвых локальных решениях, а всё, что требует сети, переносите в маршрут.'
      ),
      seeAlso: [
        L('Section 5-3: matcher configuration', 'Секция 5-3: настройка матчера'),
        L('Section 5-4: authentication at the edge', 'Секция 5-4: аутентификация на краю'),
        L('Section 2-2: what runs where', 'Секция 2-2: что где выполняется'),
      ],
    },
  ],
};
