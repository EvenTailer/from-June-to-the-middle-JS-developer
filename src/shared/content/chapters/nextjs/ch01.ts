import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh01: Chapter = {
  id: 'next-ch1',
  title: L('The App Router', 'App Router'),
  summary: L(
    'How the folder tree becomes the URL structure, how layouts, templates and groups differ, and how the special files give every segment its own loading, error and not-found behaviour.',
    'Как дерево папок превращается в структуру URL, чем отличаются компоновки, шаблоны и группы и как служебные файлы дают каждому сегменту собственное поведение загрузки, ошибок и 404.'
  ),
  sections: [
    {
      id: 'next-ch1-s1',
      title: L('Folder conventions and the route tree', 'Соглашения по папкам и дерево маршрутов'),
      body: L(
        'The App Router derives the URL structure from the folder tree under `app/`. Every folder is one segment of the path, and a folder becomes addressable only when it contains a `page.tsx` file: `app/blog/page.tsx` serves `/blog`, while `app/blog/[slug]/page.tsx` serves `/blog/anything`. A folder with no `page.tsx` is not a route at all, it holds a layout, a loading state or files that only make sense next to their neighbours. This is the main structural difference from the old `pages/` router, where the path to a file was the route itself.\n\nThree file names carry the whole model. `layout.tsx` is the persistent shell of a segment: it wraps that segment and everything nested inside it, it renders once and stays mounted while the user navigates inside it, which makes it the right place for navigation, sidebars and providers. `page.tsx` is the leaf that renders actual content. `route.ts` defines an HTTP endpoint instead of a page. A layout receives a `children` prop and must render it, a page never does, and the same folder may hold both, in which case the layout wraps the page.\n\nThe root layout is special. `app/layout.tsx` must exist and must render the `<html>` and `<body>` tags, because the document shell is produced there and nowhere else. Metadata files follow the same convention: `icon.tsx`, `opengraph-image.tsx`, `sitemap.ts` and `robots.ts` are picked up from the folder they live in and merged with the metadata of the parent segment.\n\nBecause the tree is data, the framework can reason about it. It knows that `/blog/a` and `/blog/b` share a layout and therefore share rendered output, that a segment is dynamic because its name contains brackets, and that a subtree can be streamed on its own. Understanding the tree is the whole job, because routing here is not a lookup table you configure, it is a structure you declare.',
        'App Router выводит структуру URL из дерева папок внутри `app/`. Каждая папка — это один сегмент пути, и папка становится доступной только тогда, когда в ней есть файл `page.tsx`: `app/blog/page.tsx` отдаёт `/blog`, а `app/blog/[slug]/page.tsx` — `/blog/что-угодно`. Папка без `page.tsx` маршрутом не является: в ней лежат компоновка, состояние загрузки или файлы, осмысленные только рядом с соседями. Это главное отличие от старого роутера `pages/`, где путь к файлу и был маршрутом.\n\nВсю модель несут три имени файлов. `layout.tsx` — постоянная оболочка сегмента: она оборачивает сам сегмент и всё вложенное в него, рендерится один раз и остаётся смонтированной, пока пользователь ходит внутри, поэтому именно сюда кладут навигацию, сайдбары и провайдеры. `page.tsx` — лист с реальным содержимым. `route.ts` задаёт HTTP-эндпоинт вместо страницы. Компоновка получает проп `children` и обязана его отрисовать, страница — нет, а в одной папке могут лежать оба файла, и тогда компоновка оборачивает страницу.\n\nКорневая компоновка особенная. Файл `app/layout.tsx` обязан существовать и обязан содержать теги `<html>` и `<body>`, потому что оболочка документа создаётся там и больше нигде. Файлы метаданных подчиняются тому же соглашению: `icon.tsx`, `opengraph-image.tsx`, `sitemap.ts` и `robots.ts` подхватываются из папки, где они лежат, и объединяются с метаданными родительского сегмента.\n\nПоскольку дерево — это данные, фреймворк умеет о нём рассуждать. Он знает, что `/blog/a` и `/blog/b` делят компоновку, а значит, делят и отрендеренный вывод, что сегмент динамический, если в имени есть квадратные скобки, и что поддерево можно стримить отдельно. Понять дерево — и есть вся задача, потому что маршрутизация здесь не настраиваемая таблица, а объявляемая структура.'
      ),
      bullets: [
        L('A folder is a URL segment, and only page.tsx makes it addressable.', 'Папка — это сегмент URL, и только page.tsx делает её доступной.'),
        L('layout.tsx survives navigation, page.tsx renders the leaf.', 'layout.tsx переживает навигацию, page.tsx рендерит лист.'),
        L('The root layout must render html and body exactly once.', 'Корневая компоновка обязана отрисовать html и body ровно один раз.'),
        L('route.ts replaces the page for HTTP endpoints at that segment.', 'route.ts заменяет страницу для HTTP-эндпоинтов в этом сегменте.'),
        L('Metadata files are inherited from the folder they live in.', 'Файлы метаданных наследуются от папки, в которой лежат.'),
      ],
      code: `// app/layout.tsx - the root layout is required
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/blog/page.tsx - this folder becomes /blog
export default function BlogPage() {
  return <main>All posts</main>;
}`,
      table: {
        caption: L('What each special file contributes', 'Что даёт каждый служебный файл'),
        headers: [
          L('File', 'Файл'),
          L('Produces', 'Даёт'),
          L('On navigation', 'При навигации'),
        ],
        rows: [
          [
            L('layout.tsx', 'layout.tsx'),
            L('Persistent wrapper around the segment', 'Постоянная обёртка сегмента'),
            L('Stays mounted', 'Остаётся смонтированной'),
          ],
          [
            L('template.tsx', 'template.tsx'),
            L('Wrapper recreated for every visit', 'Обёртка, создаваемая заново при каждом визите'),
            L('Remounts', 'Перемонтируется'),
          ],
          [
            L('page.tsx', 'page.tsx'),
            L('The content of one URL', 'Содержимое одного URL'),
            L('Remounts', 'Перемонтируется'),
          ],
          [
            L('route.ts', 'route.ts'),
            L('An HTTP endpoint for one URL', 'HTTP-эндпоинт для одного URL'),
            L('Runs per request', 'Выполняется на каждый запрос'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The root layout is not optional', 'Корневая компоновка не опциональна'),
          text: L(
            'The document shell with html and body is generated exactly once, in app/layout.tsx. A layout without those tags does not compile, and a second root layout in a route group is the documented way to give one part of the application its own document.',
            'Оболочка документа с тегами html и body создаётся ровно один раз, в app/layout.tsx. Компоновка без этих тегов не собирается, а вторая корневая компоновка внутри группы маршрутов — это штатный способ дать части приложения собственный документ.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A page and a handler in one folder', 'Страница и обработчик в одной папке'),
          text: L(
            'page.tsx and route.ts claim the same URL, so Next.js refuses to build the project when both live in the same segment. Move one of them into a subfolder and the conflict disappears.',
            'page.tsx и route.ts претендуют на один и тот же URL, поэтому Next.js откажется собирать проект, если оба лежат в одном сегменте. Перенесите один из них в подпапку, и конфликт исчезнет.'
          ),
        },
      ],
      takeaway: L(
        'The folder tree is the route table: page.tsx makes a folder public, layout.tsx wraps it, and the root layout owns the HTML document.',
        'Дерево папок и есть таблица маршрутов: page.tsx делает папку публичной, layout.tsx её оборачивает, а корневая компоновка владеет HTML-документом.'
      ),
      seeAlso: [
        L('Section 1-2: layouts, templates and route groups', 'Секция 1-2: компоновки, шаблоны и группы маршрутов'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
        L('Chapter 2: server and client components', 'Глава 2: серверные и клиентские компоненты'),
      ],
    },
    {
      id: 'next-ch1-s2',
      title: L('Layouts, templates and route groups', 'Компоновки, шаблоны и группы маршрутов'),
      body: L(
        'A layout is the difference between a component and a shell. It wraps its segment and every segment nested inside it, it renders once on the server, and it stays mounted while the user navigates inside it. That is why navigation, sidebars and providers live in layouts and not in pages: a page is replaced on every navigation and would tear them down and rebuild them. The practical consequence is that state placed in a layout survives navigation, while anything that must be recomputed per page belongs in the page.\n\nA template has the same shape but a different lifetime. `template.tsx` is remounted on every navigation, so state inside it resets and effects inside it run again. It is the right place for things that must be recreated per visit: an entrance animation, a fresh key on a list, a provider that should not keep its state. When a layout and a template sit in the same folder, the template is rendered inside the layout, so you get persistence from the layout and freshness from the template.\n\nA folder in parentheses is a route group. `(marketing)` and `(shop)` reorganise the tree without adding a segment to the URL: pages inside them are reachable at `/` and `/products`, exactly as if the group folders did not exist. Groups exist to give different parts of the application different layouts without duplicating the URL space, and to split one feature across several folders. Two groups cannot define the same path, and the build fails on such a conflict instead of picking a winner.\n\nGroups also solve the multiple root layout problem. By putting each group under its own `layout.tsx` that renders `<html>` and `<body>`, a marketing site and an application shell can live in the same project, with `/` belonging to one and `/dashboard` to the other. Moving between them is a full document load rather than a client transition, because there is no shared layout above them.',
        'Компоновка — это разница между компонентом и оболочкой. Она оборачивает свой сегмент и все вложенные в него, рендерится один раз на сервере и остаётся смонтированной, пока пользователь ходит внутри. Именно поэтому навигация, сайдбары и провайдеры живут в компоновках, а не в страницах: страница заменяется при каждой навигации, и всё это разрушилось бы и собиралось заново. Практическое следствие: состояние в компоновке переживает навигацию, а то, что должно пересчитываться на каждой странице, живёт в странице.\n\nУ шаблона та же форма, но другая продолжительность жизни. `template.tsx` перемонтируется при каждой навигации, поэтому состояние внутри сбрасывается, а эффекты выполняются заново. Это правильное место для вещей, которые должны пересоздаваться при каждом визите: анимации появления, свежего ключа у списка, провайдера, который не должен хранить состояние. Когда компоновка и шаблон лежат в одной папке, шаблон рендерится внутри компоновки, так что постоянство даёт компоновка, а свежесть — шаблон.\n\nПапка в круглых скобках — это группа маршрутов. `(marketing)` и `(shop)` перестраивают дерево, не добавляя сегмент к URL: страницы внутри них доступны по `/` и `/products`, ровно так, как будто групповых папок нет. Группы нужны, чтобы дать разным частям приложения разные компоновки, не дублируя пространство URL, и чтобы разложить одну фичу по нескольким папкам. Две группы не могут задать один и тот же путь, и сборка падает на таком конфликте, а не выбирает победителя.\n\nГруппы решают и проблему нескольких корневых компоновок. Если каждую группу положить под собственный `layout.tsx` с тегами `<html>` и `<body>`, маркетинговый сайт и оболочка приложения могут жить в одном проекте: `/` принадлежит одному, `/dashboard` — другому. Переход между ними — полная загрузка документа, а не клиентский переход, потому что над ними нет общей компоновки.'
      ),
      bullets: [
        L('A layout persists across navigation, a template remounts on every visit.', 'Компоновка переживает навигацию, шаблон перемонтируется при каждом визите.'),
        L('Route groups use parentheses and never appear in the URL.', 'Группы маршрутов пишутся в скобках и никогда не попадают в URL.'),
        L('Two groups cannot own the same path, the build fails instead.', 'Две группы не могут занять один путь, вместо этого падает сборка.'),
        L('A group can hold its own root layout with html and body.', 'Группа может содержать собственную корневую компоновку с html и body.'),
        L('State in a layout survives navigation, state in a template is reset.', 'Состояние в компоновке переживает навигацию, в шаблоне — сбрасывается.'),
      ],
      code: `// app/(marketing)/layout.tsx - no URL segment is added
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing">
      <SiteHeader />
      {children}
    </div>
  );
}

// app/(marketing)/about/page.tsx -> /about
export default function AboutPage() {
  return <h1>About us</h1>;
}`,
      table: {
        caption: L('Layout, template and page side by side', 'Компоновка, шаблон и страница рядом'),
        headers: [
          L('Aspect', 'Аспект'),
          L('layout.tsx', 'layout.tsx'),
          L('template.tsx', 'template.tsx'),
          L('page.tsx', 'page.tsx'),
        ],
        rows: [
          [
            L('Rendered', 'Рендерится'),
            L('Once per segment', 'Один раз на сегмент'),
            L('On every navigation', 'При каждой навигации'),
            L('On every navigation', 'При каждой навигации'),
          ],
          [
            L('Adds a URL segment', 'Добавляет сегмент URL'),
            L('No', 'Нет'),
            L('No', 'Нет'),
            L('No', 'Нет'),
          ],
          [
            L('Receives children', 'Получает children'),
            L('Yes', 'Да'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('Keeps state between visits', 'Хранит состояние между визитами'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
            L('No', 'Нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A group adds no segment, a folder does', 'Группа не добавляет сегмент, а папка добавляет'),
          text: L(
            'The group name never reaches the URL, and a group nested in another group adds nothing either: app/(shop)/(marketing)/about still serves /about. Only the folders that are not groups count, so moving app/about into app/(marketing)/about keeps the address /about, while a dynamic segment or a catch-all folder placed next to the group would add a segment.',
            'Имя группы в URL не попадает, и группа, вложенная в другую группу, тоже ничего не добавляет: app/(shop)/(marketing)/about всё равно отдаёт /about. В счёт идут только те папки, которые не группами, поэтому перенос app/about в app/(marketing)/about сохраняет адрес /about, а динамический сегмент или catch-all рядом с группой добавил бы сегмент.'
          ),
        },
        {
          tone: 'tip',
          title: L('Use a template for a fresh key', 'Шаблон даёт свежий ключ'),
          text: L(
            'Putting a template next to a layout is the cheapest way to reset a subtree: the layout keeps its state, the template remounts the children with a new identity, and list transitions replay without any extra code.',
            'Шаблон рядом с компоновкой — самый дешёвый способ перезапустить поддерево: компоновка хранит состояние, а шаблон перемонтирует потомков с новой идентичностью, и переходы в списках проигрываются без дополнительного кода.'
          ),
        },
      ],
      takeaway: L(
        'Layouts persist, templates remount, and parentheses only reorganise the tree.',
        'Компоновки переживают навигацию, шаблоны перемонтируются, а скобки только перестраивают дерево.'
      ),
      seeAlso: [
        L('Section 1-1: folder conventions and the route tree', 'Секция 1-1: соглашения по папкам и дерево маршрутов'),
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
        L('Chapter 3: data fetching and caching', 'Глава 3: получение данных и кэширование'),
      ],
    },
    {
      id: 'next-ch1-s3',
      title: L('Dynamic and catch-all segments', 'Динамические и catch-all сегменты'),
      body: L(
        'Square brackets in a folder name mark a dynamic segment. `app/blog/[slug]/page.tsx` matches `/blog/anything` and hands the value over as `params.slug`. The name inside the brackets is arbitrary, but it must match the property that is read. Two dynamic segments can sit next to each other, and then the URL must contain both values in that order, which is how `/users/[id]/posts/[postId]` works.\n\nTwo more forms cover the rest. A catch-all segment `[...slug]` matches one or more path segments and delivers them as an array, so `/docs/a/b/c` gives `slug = ["a", "b", "c"]`. The optional catch-all `[[...slug]]` also matches the bare parent path, giving `slug = undefined` for `/docs` and an array for `/docs/a`. The distinction matters in code: a plain catch-all always yields an array, an optional one can be empty.\n\nIn the current App Router `params` is a promise, and a page receives `params` and `searchParams` as async values that must be awaited before use. The reason is streaming: the framework can render the shell of a segment before the parameter values are known, and a promise lets the render continue while the value is being resolved. Awaiting `params` also tells the framework that the segment depends on the URL, so its output is never shared between different parameter values.\n\nBecause the parameter is part of the identity of the route, a dynamic segment is a cache boundary. The same component can serve thousands of URLs, and the framework must know whether one rendering may be reused for another. `generateStaticParams` names the values to pre-render at build time, and `dynamicParams` decides what happens to the rest: they are generated on the first request and then cached.',
        'Квадратные скобки в имени папки означают динамический сегмент. `app/blog/[slug]/page.tsx` совпадает с `/blog/что-угодно` и отдаёт значение как `params.slug`. Имя внутри скобок произвольное, но оно должно совпадать со свойством, которое читается. Два динамических сегмента могут стоять рядом, и тогда URL должен содержать оба значения в этом порядке — так работает `/users/[id]/posts/[postId]`.\n\nОстальные случаи закрывают ещё две формы. Catch-all сегмент `[...slug]` совпадает с одним или несколькими сегментами пути и отдаёт их массивом, поэтому `/docs/a/b/c` даёт `slug = ["a", "b", "c"]`. Необязательный catch-all `[[...slug]]` совпадает и с голым родительским путём: для `/docs` получается `slug = undefined`, а для `/docs/a` — массив. Различие важно в коде: у обычного catch-all массив есть всегда, у необязательного он может быть пустым.\n\nВ текущем App Router `params` — это промис, и страница получает `params` и `searchParams` как асинхронные значения, которые нужно дождаться. Причина в стриминге: фреймворк умеет отрисовать оболочку сегмента до того, как известны значения параметров, и промис позволяет рендеру продолжиться, пока значение разрешается. Ожидание `params` заодно сообщает фреймворку, что сегмент зависит от URL, поэтому его вывод не переиспользуется между разными значениями параметра.\n\nПоскольку параметр входит в идентичность маршрута, динамический сегмент — это граница кэша. Один и тот же компонент может обслуживать тысячи URL, и фреймворку нужно знать, можно ли переиспользовать один рендер для другого. `generateStaticParams` называет значения для пререндера при сборке, а `dynamicParams` решает судьбу остальных: они генерируются при первом запросе и затем кэшируются.'
      ),
      bullets: [
        L('Square brackets capture one segment, and the name must match the property read.', 'Квадратные скобки захватывают один сегмент, и имя должно совпадать с читаемым свойством.'),
        L('A catch-all segment always produces an array with at least one element.', 'Catch-all сегмент всегда даёт массив хотя бы с одним элементом.'),
        L('The optional catch-all also matches the parent URL and may produce undefined.', 'Необязательный catch-all совпадает и с родительским путём и может дать undefined.'),
        L('params and searchParams are promises and must be awaited.', 'params и searchParams — промисы, их нужно дождаться.'),
        L('generateStaticParams names the parameter values that are pre-rendered.', 'generateStaticParams называет значения параметров для пререндера.'),
      ],
      code: `// app/docs/[[...path]]/page.tsx
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ path?: string[] }>;
};

export default async function DocsPage({ params }: Props) {
  const { path } = await params;
  if (!path) {
    return <main>Documentation index</main>;
  }

  const [section] = path;
  const doc = await findDoc(section);
  if (!doc) notFound();

  return <article>{doc.title}</article>;
}`,
      table: {
        caption: L('Segment forms and the values they produce', 'Формы сегментов и значения, которые они дают'),
        headers: [
          L('Folder', 'Папка'),
          L('Matches', 'Совпадает с'),
          L('params', 'params'),
        ],
        rows: [
          [
            L('[slug]', '[slug]'),
            L('/blog/one', '/blog/one'),
            L("{ slug: 'one' }", "{ slug: 'one' }"),
          ],
          [
            L('[...slug]', '[...slug]'),
            L('/docs/a/b', '/docs/a/b'),
            L("{ slug: ['a', 'b'] }", "{ slug: ['a', 'b'] }"),
          ],
          [
            L('[[...slug]]', '[[...slug]]'),
            L('/docs and /docs/a/b', '/docs и /docs/a/b'),
            L('undefined or an array', 'undefined или массив'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The empty optional catch-all', 'Пустой необязательный catch-all'),
          text: L(
            'With the optional form the parameter is undefined when the parent URL is requested, so code that assumes an array crashes on the index page. Normalise it once, right after the await, and every consumer can rely on the same shape.',
            'С необязательной формой параметр равен undefined, когда запрошен родительский URL, и код, ожидающий массив, падает на странице указателя. Нормализуйте значение один раз сразу после ожидания, и все потребители будут работать с одной формой.'
          ),
        },
        {
          tone: 'note',
          title: L('notFound is not an exception you catch', 'notFound — это не исключение, которое ловят'),
          text: L(
            'Calling notFound() renders the closest not-found boundary and returns a 404 status. Let it propagate instead of wrapping it in a try/catch, otherwise the segment renders its own error page for a missing record.',
            'Вызов notFound() рендерит ближайшую границу 404 и возвращает статус 404. Дайте ему выйти наружу, а не оборачивайте в try/catch, иначе сегмент покажет страницу ошибки вместо страницы отсутствующей записи.'
          ),
        },
      ],
      takeaway: L(
        'Brackets parameterise a segment, three dots collect several, and params must be awaited before use.',
        'Квадратные скобки параметризуют сегмент, три точки собирают несколько, а params нужно дождаться перед использованием.'
      ),
      seeAlso: [
        L('Section 1-1: folder conventions and the route tree', 'Секция 1-1: соглашения по папкам и дерево маршрутов'),
        L('Section 3-4: dynamic versus static rendering', 'Секция 3-4: динамический рендеринг против статичной генерации'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
    {
      id: 'next-ch1-s4',
      title: L('Loading, error and not-found boundaries', 'Границы загрузки, ошибок и 404'),
      body: L(
        'A route is not only a page, it is also a set of states. Next.js defines files that give a segment its own loading, error and not-found behaviour, and each one applies to the segment it lives in and to everything nested inside it. `loading.tsx` becomes the Suspense fallback for that segment, `error.tsx` becomes its error boundary, `not-found.tsx` becomes its 404 view. The scoping is the part that matters: an `error.tsx` in `app/dashboard` catches failures in that segment and below, and nowhere else.\n\n`error.tsx` has to be a client component, because it receives two props: the `error` and a `reset` function. `reset` re-renders the segment and repeats the server work that failed, which makes it the right control for a transient network failure and the wrong one for a bug that will fail identically every time. `global-error.tsx` is the last resort: it replaces the root layout when even that fails, and it must render its own `<html>` and `<body>`.\n\n`not-found.tsx` renders for URLs that match nothing and for every call to `notFound()` from a server component. Calling `notFound()` when a record is missing is the correct behaviour, because it renders the closest not-found boundary and returns a 404 status instead of throwing a generic error into the error boundary.\n\nBecause a failure stops at the closest boundary above it, placement decides how far a crash spreads. Putting an `error.tsx` next to a heavy dashboard segment contains the damage to that segment, while putting it only at the root turns every failure into a full-page error. The same logic applies to `loading.tsx`: a boundary close to the slow part gives a local skeleton, while a boundary at the root replaces the whole page with a spinner each time a child suspends.',
        'Маршрут — это не только страница, у него есть ещё и набор состояний. Next.js определяет файлы, которые дают сегменту собственное поведение загрузки, ошибок и 404, и каждый действует на свой сегмент и на всё, что вложено в него. `loading.tsx` становится запасным UI для Suspense этого сегмента, `error.tsx` — границей ошибок, `not-found.tsx` — видом для 404. Важнее всего область действия: `error.tsx` в `app/dashboard` ловит сбои в этом сегменте и ниже, и больше нигде.\n\n`error.tsx` обязан быть клиентским компонентом, потому что получает два пропа: `error` и функцию `reset`. `reset` перерендеривает сегмент и повторяет упавшую серверную работу — правильный контрол для случайной сетевой ошибки и неправильный для бага, который упадёт точно так же. `global-error.tsx` — последний рубеж: он заменяет корневую компоновку, когда и та не отрисовалась, и обязан содержать собственные `<html>` и `<body>`.\n\n`not-found.tsx` рендерится для URL, которым ничего не соответствует, и для каждого вызова `notFound()` из серверного компонента. Вызывать `notFound()`, когда запись не найдена, — правильное поведение: отрисовывается ближайшая граница 404 и возвращается статус 404, а не летит общее исключение в границу ошибок.\n\nПоскольку сбой останавливается на ближайшей границе выше по дереву, размещение решает, насколько далеко разлетется поломка. `error.tsx` рядом с тяжёлым сегментом дашборда сдерживает урон в его пределах, а `error.tsx` только в корне превращает каждую ошибку в ошибку всей страницы. Та же логика у `loading.tsx`: граница рядом с медленной частью даёт локальный скелет, а граница в корне заменяет всю страницу спиннером каждый раз, когда дочерний сегмент приостанавливается.'
      ),
      bullets: [
        L('Each special file applies to its own segment and everything below it.', 'Каждый служебный файл действует на свой сегмент и всё, что ниже.'),
        L('error.tsx must be a client component and receives error and reset.', 'error.tsx обязан быть клиентским компонентом и получает error и reset.'),
        L('global-error.tsx replaces the root layout and must render html and body.', 'global-error.tsx заменяет корневую компоновку и обязан отрисовать html и body.'),
        L('notFound() renders the closest not-found boundary and returns a 404.', 'notFound() рендерит ближайшую границу 404 и возвращает статус 404.'),
        L('reset repeats the failed server work, so it does not fix a deterministic bug.', 'reset повторяет упавшую серверную работу, поэтому детерминированный баг он не чинит.'),
      ],
      code: `// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <section className="skeleton">Loading dashboard...</section>;
}

// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <p>Could not load the dashboard.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
      table: {
        caption: L('Which boundary catches what', 'Какая граница что ловит'),
        headers: [
          L('File', 'Файл'),
          L('Catches', 'Ловит'),
          L('Scope', 'Область'),
        ],
        rows: [
          [
            L('loading.tsx', 'loading.tsx'),
            L('A suspended render', 'Приостановленный рендер'),
            L('Its segment and below', 'Свой сегмент и ниже'),
          ],
          [
            L('error.tsx', 'error.tsx'),
            L('A thrown error', 'Выброшенное исключение'),
            L('Its segment and below, but not the layout above it', 'Свой сегмент и ниже, но не компоновку над ним'),
          ],
          [
            L('global-error.tsx', 'global-error.tsx'),
            L('A failure in the root layout', 'Сбой корневой компоновки'),
            L('The whole application', 'Всё приложение'),
          ],
          [
            L('not-found.tsx', 'not-found.tsx'),
            L('notFound() and unmatched URLs', 'notFound() и несуществующие URL'),
            L('Its segment and below', 'Свой сегмент и ниже'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A boundary cannot protect its own layout', 'Граница не защищает собственную компоновку'),
          text: L(
            'The error boundary lives inside the layout it is meant to protect, so an error thrown while that layout renders is not caught by it. When the shell itself is broken, the only remaining catch is global-error.tsx.',
            'Граница ошибок живёт внутри той компоновки, которую защищает, поэтому ошибка при рендере самой компоновки ею не ловится. Когда ломается оболочка, единственная оставшаяся ловушка — global-error.tsx.'
          ),
        },
        {
          tone: 'warning',
          title: L('Do not offer reset for a deterministic bug', 'Не предлагайте reset для детерминированного бага'),
          text: L(
            'The reset button re-runs the same code with the same inputs. For a timeout it is the correct control, for a null dereference it produces a retry loop that hides the real stack trace from the user.',
            'Кнопка reset повторяет тот же код с теми же входными данными. Для таймаута это правильный контрол, а для обращения по null получится цикл повторов, скрывающий от пользователя настоящий стек-трейс.'
          ),
        },
      ],
      takeaway: L(
        'Boundaries are scoped to their segment, so place them close to the code that can fail.',
        'Границы действуют в пределах своего сегмента, поэтому ставьте их ближе к коду, который может упасть.'
      ),
      seeAlso: [
        L('Section 1-2: layouts, templates and route groups', 'Секция 1-2: компоновки, шаблоны и группы маршрутов'),
        L('Section 1-3: dynamic and catch-all segments', 'Секция 1-3: динамические и catch-all сегменты'),
        L('Section 2-3: the client boundary and what can cross it', 'Секция 2-3: клиентская граница и что через неё проходит'),
      ],
    },
    {
      id: 'next-ch1-s5',
      title: L('Route handlers versus pages', 'Обработчики маршрута против страниц'),
      body: L(
        '`route.ts` defines an HTTP endpoint at the segment where it lives. It exports one function per method, GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS, and each receives a standard `Request` and returns a standard `Response`. There is no body parser to configure and no separate API folder to remember: `app/api/orders/route.ts` answers `/api/orders`. This is the right tool for webhooks, small public APIs, and anything whose natural answer is JSON rather than HTML.\n\nA segment may hold a page or a route handler, never both, because they claim the same URL, and the build fails with a conflict if both files exist. The two answer different questions: a page is something a browser renders, a handler is something a program calls. Mixing them tends to produce a route that returns HTML to an API client or JSON to a browser, and the fix is usually to move one of them into a subfolder.\n\nA GET handler is dynamic by default since Next.js 15, so it runs on every request and is not cached. A handler becomes cached only when it opts in, either through the segment config `export const dynamic = "force-static"` or through a `revalidate` value. This differs from the older `pages/api` convention, where GET handlers were cached, and it is the reason many old codebases start returning fresh data after an upgrade.\n\nHandlers have their own scope. They do not participate in the Full Route Cache of pages, they do not render layouts, and they have no access to the client router. Inside a handler the request is read with the Web APIs or with `NextRequest`, the answer is built as a `Response`, redirects use `redirect()` from `next/navigation`, and cache invalidation uses `revalidatePath` or `revalidateTag` from `next/cache`.',
        'Файл `route.ts` задаёт HTTP-эндпоинт в том сегменте, где он лежит. Он экспортирует по одной функции на метод: GET, POST, PUT, PATCH, DELETE, HEAD и OPTIONS, и каждая принимает стандартный `Request` и возвращает стандартный `Response`. Настраивать парсер тела не нужно, отдельная папка API тоже: `app/api/orders/route.ts` отвечает на `/api/orders`. Это правильный инструмент для вебхуков, небольших публичных API и всего, чей естественный ответ — JSON, а не HTML.\n\nВ одном сегменте может быть страница или обработчик маршрута, но не оба: они претендуют на один URL, и при наличии обоих файлов сборка падает с конфликтом. Это разные ответы на разные вопросы: страницу рендерит браузер, обработчик вызывает программа. Смешивать их приводит к маршруту, который отдаёт HTML клиенту API или JSON браузеру, и обычно лечится переносом одного файла в подпапку.\n\nGET-обработчик по умолчанию динамический начиная с Next.js 15, поэтому он выполняется на каждый запрос и не кэшируется. Обработчик становится кэшируемым, только если сам это объявит: либо через конфиг сегмента `export const dynamic = "force-static"`, либо через значение `revalidate`. Это отличие от старого соглашения `pages/api`, где GET-обработчики кэшировались, и именно поэтому во многих старых проектах после обновления данные начинают приходить свежими.\n\nУ обработчиков своя область. Они не участвуют в Full Route Cache страниц, не рендерят компоновки и не имеют доступа к клиентскому роутеру. Внутри обработчика запрос читается через Web API или через `NextRequest`, ответ собирается как `Response`, редирект делается через `redirect()` из `next/navigation`, а сброс кэша — через `revalidatePath` или `revalidateTag` из `next/cache`.'
      ),
      bullets: [
        L('route.ts exports one function per HTTP method and works with Request and Response.', 'route.ts экспортирует по функции на HTTP-метод и работает с Request и Response.'),
        L('A page and a route handler cannot share a segment.', 'Страница и обработчик маршрута не могут жить в одном сегменте.'),
        L('GET handlers are dynamic by default since Next.js 15.', 'GET-обработчики динамические по умолчанию начиная с Next.js 15.'),
        L('A handler is cached only when it opts in with force-static or revalidate.', 'Обработчик кэшируется, только если сам объявит force-static или revalidate.'),
        L('Handlers do not render layouts and have no access to the client router.', 'Обработчики не рендерят компоновки и не видят клиентский роутер.'),
      ],
      code: `// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const order = await db.order.create({ data: body });

  return NextResponse.json({ id: order.id }, { status: 201 });
}

export async function GET() {
  const orders = await db.order.findMany({ take: 20 });
  return NextResponse.json(orders);
}`,
      table: {
        caption: L('Page or route handler', 'Страница или обработчик маршрута'),
        headers: [
          L('Question', 'Вопрос'),
          L('page.tsx', 'page.tsx'),
          L('route.ts', 'route.ts'),
        ],
        rows: [
          [
            L('What it answers', 'Что отвечает'),
            L('A browser request', 'Запрос браузера'),
            L('A program request', 'Запрос программы'),
          ],
          [
            L('Result', 'Результат'),
            L('A React tree rendered to HTML', 'Дерево React, отрендеренное в HTML'),
            L('A Response you build', 'Собранный вручную Response'),
          ],
          [
            L('Caching', 'Кэширование'),
            L('Full Route Cache', 'Full Route Cache'),
            L('Dynamic by default', 'Динамический по умолчанию'),
          ],
          [
            L('Renders layouts', 'Рендерит компоновки'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('Coexists with the other file', 'Сосуществует с другим файлом'),
            L('No', 'Нет'),
            L('No', 'Нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('GET handlers stopped being cached', 'GET-обработчики перестали кэшироваться'),
          text: L(
            'Since Next.js 15 a GET route handler runs on every request unless it opts in. Code that relied on the old caching of pages/api now hits the database on every call, which shows up as a sudden drop in throughput after an upgrade.',
            'С Next.js 15 GET-обработчик выполняется на каждый запрос, если он сам не объявит кэширование. Код, полагавшийся на старое кэширование pages/api, теперь ходит в базу на каждый вызов, и после обновления это видно как резкое падение пропускной способности.'
          ),
        },
        {
          tone: 'tip',
          title: L('Use a handler for machines', 'Используйте обработчик для машин'),
          text: L(
            'If the consumer is a script, a mobile client or a webhook provider, a route handler is the honest interface: it speaks HTTP, returns a status code and does not depend on the router.',
            'Если потребитель — скрипт, мобильный клиент или провайдер вебхуков, обработчик маршрута — честный интерфейс: он говорит на HTTP, возвращает код статуса и не зависит от роутера.'
          ),
        },
      ],
      takeaway: L(
        'A page renders for a browser, a handler answers a program, and the two can never share a segment.',
        'Страница рендерится для браузера, обработчик отвечает программе, и вдвоём они не живут в одном сегменте.'
      ),
      seeAlso: [
        L('Section 1-1: folder conventions and the route tree', 'Секция 1-1: соглашения по папкам и дерево маршрутов'),
        L('Section 3-6: cache components and the new model', 'Секция 3-6: cache components и новая модель'),
        L('Chapter 4: server actions', 'Глава 4: серверные действия'),
      ],
    },
  ],
};
