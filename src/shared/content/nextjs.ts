import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextModule: Module = {
  id: 'nextjs',
  title: L('Next.js', 'Next.js'),
  description: L('App Router, SSR/SSG, data fetching, API routes.', 'App Router, SSR/SSG, загрузка данных, API-маршруты.'),
  lessons: [
    { id: 'next-001', title: L('App Router', 'App Router'), question: L('What is App Router?', 'Что такое App Router?'), answer: L('App Router uses app/ directory with file conventions. React Server Components by default.', 'App Router использует папку app/ с соглашениями по файлам. React Server Components по умолчанию.'), code: `// app/page.tsx\nexport default function Page() {\n  return <h1>Hello</h1>;\n}` },
    { id: 'next-002', title: L('File conventions', 'Соглашения по файлам'), question: L('Core file conventions?', 'Основные соглашения по файлам?'), answer: L('page.tsx renders, layout.tsx wraps, loading.tsx shows during load, error.tsx catches errors, not-found.tsx for 404.', 'page.tsx рендерит, layout.tsx оборачивает, loading.tsx показывается при загрузке, error.tsx ловит ошибки, not-found.tsx для 404.'), code: `// app/blog/page.tsx\nexport default function BlogPage() {\n  return <main>Blog</main>;\n}` },
    { id: 'next-003', title: L('page.tsx', 'page.tsx'), question: L('What does page.tsx do?', 'Что делает page.tsx?'), answer: L('Defines UI for a route segment. Default export React component. Must exist for route to be public.', 'Определяет UI для сегмента маршрута. Default export React-компонента. Должен существовать для публичности маршрута.') },
    { id: 'next-004', title: L('layout.tsx', 'layout.tsx'), question: L('What does layout.tsx do?', 'Что делает layout.tsx?'), answer: L('Shared UI for a segment and children. Persists across navigations. Receives children prop.', 'Общий UI для сегмента и потомков. Сохраняется при навигации. Получает проп children.'), code: `// app/dashboard/layout.tsx\nexport default function Layout({ children }) {\n  return <section>{children}</section>;\n}` },
    { id: 'next-005', title: L('loading.tsx', 'loading.tsx'), question: L('What does loading.tsx do?', 'Что делает loading.tsx?'), answer: L('Instant loading UI with Suspense. Wraps page. Shown during navigation/streaming. Good for skeleton screens.', 'Мгновенный UI загрузки через Suspense. Оборачивает page. Показывается при навигации/стриминге. Хорошо для скелетонов.'), code: `// app/dashboard/loading.tsx\nexport default function Loading() {\n  return <Skeleton />;\n}` },
    { id: 'next-006', title: L('error.tsx', 'error.tsx'), question: L('What does error.tsx do?', 'Что делает error.tsx?'), answer: L('Error boundary for segment. Must be client component. Receives error and reset props. Auto-recovers on navigation.', 'Граница ошибок для сегмента. Должен быть клиентским компонентом. Получает error и reset. Автовосстановление при навигации.'), code: `'use client';\n// app/error.tsx\nexport default function Error({ error, reset }) {\n  return <button onClick={reset}>Retry</button>;\n}` },
    { id: 'next-007', title: L('not-found.tsx', 'not-found.tsx'), question: L('What does not-found.tsx do?', 'Что делает not-found.tsx?'), answer: L('UI for unmatched routes. Global not-found at app level, segment-level for partial 404s. Triggers on notFound() call.', 'UI для несуществующих маршрутов. Глобальный на уровне app, сегментный для частичных 404. Срабатывает при вызове notFound().') },
    { id: 'next-008', title: L('template.tsx', 'template.tsx'), question: L('template.tsx vs layout.tsx?', 'template.tsx в отличие от layout.tsx?'), answer: L('template.tsx remounts on navigation (new instance). layout.tsx persists. Use for animations/fresh state on each nav.', 'template.tsx перемонтируется при навигации (новый экземпляр). layout.tsx сохраняется. Для анимаций/свежего состояния при каждой навигации.'), code: `// app/template.tsx\nexport default function Template({ children }) {\n  return <div className="slide-in">{children}</div>;\n}` },
    { id: 'next-009', title: L('default.tsx', 'default.tsx'), question: L('What is default.tsx?', 'Что такое default.tsx?'), answer: L('Parallel route fallback when no matching segment. Used with parallel/intercepting routes for soft navigation.', 'Запасной вариант параллельного маршрута при отсутствии совпадения. Используется с параллельными/перехватывающими маршрутами для мягкой навигации.') },
    { id: 'next-010', title: L('route.ts', 'route.ts'), question: L('What is route.ts?', 'Что такое route.ts?'), answer: L('Route Handler. API endpoint in app/api/. Exports HTTP method functions (GET, POST, PUT, DELETE, PATCH).', 'Route Handler. API-эндпоинт в app/api/. Экспортирует функции HTTP-методов (GET, POST, PUT, DELETE, PATCH).'), code: `// app/api/users/route.ts\nexport async function GET() {\n  return Response.json({ users: [] });\n}` },
    { id: 'next-011', title: L('Route groups', 'Route groups'), question: L('What are route groups?', 'Что такие route groups?'), answer: L('Parentheses (group) organize routes without affecting URL. Share layouts, separate loading states.', 'Круглые скобки (group) организуют маршруты без влияния на URL. Общие layouts, раздельные состояния загрузки.'), code: `// app/(marketing)/about/page.tsx\n// URL: /about (no /marketing)` },
    { id: 'next-012', title: L('Dynamic routes', 'Динамические маршруты'), question: L('How do dynamic routes work?', 'Как работают динамические маршруты?'), answer: L('[slug] creates dynamic segment. params prop in page/layout. generateStaticParams for SSG.', '[slug] создаёт динамический сегмент. Проп params в page/layout. generateStaticParams для SSG.'), code: `// app/blog/[slug]/page.tsx\nexport default function Post({ params }) {\n  return <h1>{params.slug}</h1>;\n}` },
    { id: 'next-013', title: L('Catch-all routes', 'Catch-all маршруты'), question: L('What are catch-all routes?', 'Что такие catch-all маршруты?'), answer: L('[...slug] catches all subsequent segments. Optional [[...slug]] matches even without segment.', '[...slug] ловит все последующие сегменты. Optional [[...slug]] совпадает даже без сегмента.'), code: `// app/docs/[...slug]/page.tsx\n// /docs/a/b/c -> params.slug = ['a','b','c']\n// app/docs/[[...slug]] matches /docs too` },
    { id: 'next-014', title: L('Parallel routes', 'Параллельные маршруты'), question: L('What are parallel routes?', 'Что такие параллельные маршруты?'), answer: L('@folder slots rendered simultaneously in layout. Independent loading/error. Dashboard pattern.', '@folder слоты, рендерящиеся одновременно в layout. Независимые loading/error. Паттерн дашборда.'), code: `// app/layout.tsx\nexport default function Layout({ children, team, analytics }) {\n  return <>{children}{team}{analytics}</>;\n}` },
    { id: 'next-015', title: L('Intercepting routes', 'Перехватывающие маршруты'), question: L('What are intercepting routes?', 'Что такие перехватывающие маршруты?'), answer: L('(.)folder intercepts same-level routes. (..) goes up one level. (..)(..) up two. (...) from root. Modals pattern.', '(.)folder перехватывает маршруты того же уровня. (..) на уровень выше. (..)(..) на два выше. (...) от корня. Паттерн модалок.'), code: `// app/@modal/(.)photo/[id]/page.tsx\n// Intercepts /photo/[id] from app/photo/[id]/page.tsx` },
    { id: 'next-016', title: L('Route Handlers intro', 'Route Handlers intro'), question: L('Route Handlers basics?', 'Основы Route Handlers?'), answer: L('app/api/route.ts with HTTP method exports. Request/Response Web APIs. Runtime node/edge.', 'app/api/route.ts с экспортом HTTP-методов. Web APIs Request/Response. Runtime node/edge.'), code: `export async function POST(request: Request) {\n  const body = await request.json();\n  return Response.json({ received: body });\n}` },
    { id: 'next-017', title: L('Middleware', 'Middleware'), question: L('What is middleware?', 'Что такое middleware?'), answer: L('Code running before request. Edge runtime. Auth, redirects, rewrites, headers, A/B tests.', 'Код, выполняющийся до запроса. Edge runtime. Авторизация, редиректы, перезаписи, заголовки, A/B тесты.'), code: `// middleware.ts\nexport function middleware(request: NextRequest) {\n  if (!request.cookies.get('token')) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n}` },
    { id: 'next-018', title: L('Server Components', 'Server Components'), question: L('What are Server Components?', 'Что такие Server Components?'), answer: L('Run on server. No browser APIs, state, effects. Direct DB access. Zero bundle size.', 'Выполняются на сервере. Без браузерных API, состояния, эффектов. Прямой доступ к БД. Нулевой размер бандла.') },
    { id: 'next-019', title: L('Client Components', 'Client Components'), question: L('What are Client Components?', 'Что такие Client Components?'), answer: L('Run on browser. Use "use client". Hooks, event handlers, browser APIs. Shipped to client.', 'Выполняются в браузере. Используют "use client". Хуки, обработчики событий, браузерные API. Отправляются клиенту.') },
    { id: 'next-020', title: L('"use client"', '"use client"'), question: L('What does "use client" do?', 'Что делает "use client"?'), answer: L('Marks client boundary. Everything below becomes client component. Place as deep as possible.', 'Помечает клиентскую границу. Всё ниже становится клиентским. Размещайте как можно глубже.'), code: `'use client';\nimport { useState } from 'react';\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}` },
    { id: 'next-021', title: L('"use server"', '"use server"'), question: L('What does "use server" do?', 'Что делает "use server"?'), answer: L('Marks Server Actions. Async functions callable from client. Progressive enhancement forms.', 'Помечает Server Actions. Асинхронные функции, вызываемые с клиента. Прогрессивное улучшение форм.'), code: `'use server';\nexport async function addItem(formData: FormData) {\n  await db.insert(...);\n  revalidatePath('/items');\n}` },
    { id: 'next-022', title: L('Server Actions', 'Server Actions'), question: L('What are Server Actions?', 'Что такое Server Actions?'), answer: L('"use server" async functions. Callable from forms/components. Mutations + revalidation + redirect.', 'Асинхронные функции с "use server". Вызываются из форм/компонентов. Мутации + ревалидация + редирект.'), code: `<form action={addItem}>\n  <input name="title" />\n  <button>Add</button>\n</form>` },
    { id: 'next-023', title: L('Data fetching basics', 'Загрузка данных — основы'), question: L('How to fetch in Server Components?', 'Как загружать данные в Server Components?'), answer: L('Async component + fetch directly. No useEffect needed. Next.js extends fetch with caching.', 'Асинхронный компонент + fetch напрямую. Без useEffect. Next.js расширяет fetch кэшированием.'), code: `export default async function Page() {\n  const data = await fetch('https://api.example.com/data');\n  const json = await data.json();\n  return <pre>{JSON.stringify(json)}</pre>;\n}` },
    { id: 'next-024', title: L('Full Route Cache', 'Full Route Cache'), question: L('What is Full Route Cache?', 'Что такое Full Route Cache?'), answer: L('Static HTML/RSC payload cached on server. Static by default in App Router. Bypassed with dynamic functions.', 'Статический HTML/RSC payload, кэшируемый на сервере. Статический по умолчанию в App Router. Обходится динамическими функциями.') },
    { id: 'next-025', title: L('Data Cache', 'Data Cache'), question: L('What is Data Cache?', 'Что такое Data Cache?'), answer: L('Caches fetch results server-side. Persists across requests. Keyed by URL + headers + body. Shared with Full Route Cache.', 'Кэширует результаты fetch на сервере. Сохраняется между запросами. Ключ: URL + заголовки + тело. Общий с Full Route Cache.') },
    { id: 'next-026', title: L('Router Cache', 'Router Cache'), question: L('What is Router Cache?', 'Что такое Router Cache?'), answer: L('Client-side cache of RSC payload. Segment-level. Enables instant navigation. Revalidated on focus/interval.', 'Клиентский кэш RSC payload. Уровень сегментов. Мгновенная навигация. Ревалидация при фокусе/интервале.') },
    { id: 'next-027', title: L('revalidate', 'revalidate'), question: L('How does revalidate work?', 'Как работает revalidate?'), answer: L('Time-based revalidation (seconds). Static pages regenerate after expiry. fetch revalidate for specific requests.', 'Временная ревалидация (секунды). Статические страницы регенерируются после истечения. revalidate в fetch для конкретных запросов.'), code: `// Page-level revalidate\nexport const revalidate = 3600;\n// Fetch-level\nfetch(url, { next: { revalidate: 60 } });` },
    { id: 'next-028', title: L('revalidatePath', 'revalidatePath'), question: L('What does revalidatePath do?', 'Что делает revalidatePath?'), answer: L('On-demand cache invalidation by path. Use after mutations. "layout" or "page" for scope.', 'Деманд-инвалидация кэша по пути. После мутаций. "layout" или "page" для области.'), code: `'use server';\nexport async function update() {\n  await db.update(...);\n  revalidatePath('/dashboard');\n}` },
    { id: 'next-029', title: L('revalidateTag', 'revalidateTag'), question: L('What does revalidateTag do?', 'Что делает revalidateTag?'), answer: L('On-demand invalidation by tag. Granular cache control. Tag fetches with next.tags.', 'Деманд-инвалидация по тегу. Гранулярный контроль кэша. Тегируйте fetch через next.tags.'), code: `fetch(url, { next: { tags: ['posts'] } });\nrevalidateTag('posts');` },
    { id: 'next-030', title: L('fetch no-store', 'fetch no-store'), question: L('What does cache: "no-store" do?', 'Что делает cache: "no-store"?'), answer: L('Bypasses all caching. Always fresh data. Disables static rendering (dynamic mode).', 'Обходит всё кэширование. Всегда свежие данные. Отключает статический рендеринг (динамический режим).'), code: `fetch(url, { cache: 'no-store' });` },
    { id: 'next-031', title: L('fetch force-cache', 'fetch force-cache'), question: L('What does cache: "force-cache" do?', 'Что делает cache: "force-cache"?'), answer: L('Always uses cache, never refetches. Useful for immutable data. Default for static pages.', 'Всегда использует кэш, никогда не обновляет. Для неизменяемых данных. По умолчанию для статических страниц.'), code: `fetch(url, { cache: 'force-cache' });` },
    { id: 'next-032', title: L('unstable_cache', 'unstable_cache'), question: L('What is unstable_cache?', 'Что такое unstable_cache?'), answer: L('Caches any async function result (not just fetch). Custom key + tags. wrap pattern.', 'Кэширует результат любой асинхронной функции (не только fetch). Кастомный ключ + теги. Паттерн wrap.'), code: `import { unstable_cache } from 'next/cache';\nconst getPosts = unstable_cache(\n  async () => db.posts.findMany(),\n  ['posts'],\n  { tags: ['posts'] }\n);` },
    { id: 'next-033', title: L('generateStaticParams', 'generateStaticParams'), question: L('What does generateStaticParams do?', 'Что делает generateStaticParams?'), answer: L('Pre-renders dynamic routes at build. Returns array of params objects. Required for SSG with dynamic segments.', 'Предрендерит динамические маршруты при сборке. Возвращает массив объектов params. Обязателен для SSG с динамическими сегментами.'), code: `export async function generateStaticParams() {\n  return [{ slug: 'a' }, { slug: 'b' }];\n}` },
    { id: 'next-034', title: L('generateMetadata', 'generateMetadata'), question: L('What does generateMetadata do?', 'Что делает generateMetadata?'), answer: L('Dynamic SEO metadata. Async function returning title, description, openGraph. Replaces <head> tags.', 'Динамические SEO-метаданные. Асинхронная функция, возвращающая title, description, openGraph. Заменяет теги <head>.'), code: `export async function generateMetadata({ params }) {\n  const post = await getPost(params.slug);\n  return { title: post.title, description: post.excerpt };\n}` },
    { id: 'next-035', title: L('generateViewport', 'generateViewport'), question: L('What does generateViewport do?', 'Что делает generateViewport?'), answer: L('Dynamic viewport settings. themeColor, width, initialScale. Separate from metadata.', 'Динамические настройки viewport. themeColor, width, initialScale. Отдельно от metadata.'), code: `export const viewport = {\n  themeColor: '#000000',\n  width: 'device-width',\n  initialScale: 1,\n};` },
    { id: 'next-036', title: L('SSR', 'SSR'), question: L('What is SSR?', 'Что такое SSR?'), answer: L('Server-Side Rendering. HTML generated per request. Fresh data. Slower than static. Dynamic by default when using headers/cookies.', 'Server-Side Rendering. HTML генерируется на каждый запрос. Свежие данные. Медленнее статического. Динамический по умолчанию при использовании headers/cookies.') },
    { id: 'next-037', title: L('SSG', 'SSG'), question: L('What is SSG?', 'Что такое SSG?'), answer: L('Static Site Generation. HTML generated at build time. Fastest. Use generateStaticParams for dynamic routes. Default in App Router.', 'Static Site Generation. HTML генерируется при сборке. Быстрейший. generateStaticParams для динамических маршрутов. По умолчанию в App Router.') },
    { id: 'next-038', title: L('ISR', 'ISR'), question: L('What is ISR?', 'Что такое ISR?'), answer: L('Incremental Static Regeneration. Static pages revalidate in background. revalidate option. Stale-while-revalidate pattern.', 'Incremental Static Regeneration. Статические страницы ревалидируются в фоне. Опция revalidate. Паттерн stale-while-revalidate.'), code: `export const revalidate = 60; // regenerate at most every 60s` },
    { id: 'next-039', title: L('PPR', 'PPR'), question: L('What is PPR?', 'Что такое PPR?'), answer: L('Partial Prerendering. Static shell + dynamic holes. Streaming. Best of SSG and SSR. Experimental in Next 14/15.', 'Partial Prerendering. Статическая оболочка + динамические отверстия. Стриминг. Лучшее из SSG и SSR. Экспериментальный в Next 14/15.') },
    { id: 'next-040', title: L('Streaming', 'Стриминг'), question: L('How does streaming work?', 'Как работает стриминг?'), answer: L('Suspense boundaries stream HTML progressively. Shell first, dynamic parts later. loading.tsx as fallback.', 'Границы Suspense стримят HTML прогрессивно. Сначала оболочка, потом динамические части. loading.tsx как запасной.') },
    { id: 'next-041', title: L('Suspense boundaries', 'Границы Suspense'), question: L('What are Suspense boundaries?', 'Что такие границы Suspense?'), answer: L('Wrap async components. Define streaming units. Show fallback while loading. Segment-level control.', 'Оборачивают асинхронные компоненты. Определяют единицы стриминга. Показывают fallback при загрузке. Управление на уровне сегментов.'), code: `<Suspense fallback={<Spinner />}>\n  <AsyncComponent />\n</Suspense>` },
    { id: 'next-042', title: L('loading.tsx deep', 'loading.tsx подробно'), question: L('loading.tsx best practices?', 'Лучшие практики loading.tsx?'), answer: L('Colocated with page. Segment-level granularity. Skeleton screens. Minimize to reduce layout shift.', 'Colocated с page. Гранулярность на уровне сегментов. Скелетоны. Минимизируйте для уменьшения сдвига макета.') },
    { id: 'next-043', title: L('error.tsx deep', 'error.tsx подробно'), question: L('error.tsx best practices?', 'Лучшие практики error.tsx?'), answer: L('Client component required. Error boundary per segment. reset() for retry. Log errors to monitoring.', 'Обязателен клиентский компонент. Граница ошибок на сегмент. reset() для повтора. Логируйте ошибки в мониторинг.'), code: `'use client';\nexport default function Error({ error, reset }) {\n  useEffect(() => { log(error); }, [error]);\n  return <button onClick={reset}>Try again</button>;\n}` },
    { id: 'next-044', title: L('Route Handler GET', 'Route Handler GET'), question: L('GET in Route Handlers?', 'GET в Route Handlers?'), answer: L('Read data. Cacheable by default. Return Response.json(). Handle query params via request.url.', 'Чтение данных. Кэшируемый по умолчанию. Возвращайте Response.json(). Query параметры через request.url.'), code: `export async function GET(request: Request) {\n  const { searchParams } = new URL(request.url);\n  const q = searchParams.get('q');\n  return Response.json({ query: q });\n}` },
    { id: 'next-045', title: L('Route Handler POST', 'Route Handler POST'), question: L('POST in Route Handlers?', 'POST в Route Handlers?'), answer: L('Create data. Parse JSON body. Return 201 on creation. Validate input.', 'Создание данных. Парсинг JSON тела. 201 при создании. Валидация ввода.'), code: `export async function POST(request: Request) {\n  const body = await request.json();\n  const created = await db.create(body);\n  return Response.json(created, { status: 201 });\n}` },
    { id: 'next-046', title: L('Request/Response APIs', 'Request/Response APIs'), question: L('Web APIs in Route Handlers?', 'Web APIs в Route Handlers?'), answer: L('Use native Request/Response. request.json(), request.formData(), request.headers. Response.json(), new Response().', 'Используйте нативные Request/Response. request.json(), request.formData(), request.headers. Response.json(), new Response().') },
    { id: 'next-047', title: L('Cookies in handlers', 'Cookies в обработчиках'), question: L('How to access cookies in Route Handlers?', 'Как получить cookies в Route Handlers?'), answer: L('request.cookies.get(name). set/delete via NextResponse. async cookies() in Next 15.', 'request.cookies.get(name). set/delete через NextResponse. async cookies() в Next 15.'), code: `export async function GET(request: NextRequest) {\n  const token = request.cookies.get('token')?.value;\n  return Response.json({ token });\n}` },
    { id: 'next-048', title: L('Headers in handlers', 'Заголовки в обработчиках'), question: L('How to access headers in Route Handlers?', 'Как получить заголовки в Route Handlers?'), answer: L('request.headers.get(name). Immutable. Set via NextResponse. Security headers pattern.', 'request.headers.get(name). Неизменяемые. Установка через NextResponse. Паттерн заголовков безопасности.'), code: `const auth = request.headers.get('authorization');\nreturn new Response(null, {\n  headers: { 'content-type': 'application/json' }\n});` },
    { id: 'next-049', title: L('redirect', 'redirect'), question: L('How to use redirect()?', 'Как использовать redirect()?'), answer: L('Server Components, Server Actions, Route Handlers. Throws NEXT_REDIRECT. Relative or absolute URLs.', 'Server Components, Server Actions, Route Handlers. Выбрасывает NEXT_REDIRECT. Относительные или абсолютные URL.'), code: `import { redirect } from 'next/navigation';\nexport default function Page() {\n  redirect('/dashboard');\n}` },
    { id: 'next-050', title: L('notFound', 'notFound'), question: L('How to use notFound()?', 'Как использовать notFound()?'), answer: L('Render not-found.tsx. Throws NEXT_NOT_FOUND. Use when data missing.', 'Рендерит not-found.tsx. Выбрасывает NEXT_NOT_FOUND. Когда данные отсутствуют.'), code: `import { notFound } from 'next/navigation';\nexport default async function Page({ params }) {\n  const post = await getPost(params.slug);\n  if (!post) notFound();\n  return <h1>{post.title}</h1>;\n}` },
    { id: 'next-051', title: L('permanentRedirect', 'permanentRedirect'), question: L('What does permanentRedirect() do?', 'Что делает permanentRedirect()?'), answer: L('308 permanent redirect. Search engines update index. Unlike 307 temporary.', '308 постоянный редирект. Поисковики обновляют индекс. В отличие от 307 временного.'), code: `import { permanentRedirect } from 'next/navigation';\npermanentRedirect('/new-page');` },
    { id: 'next-052', title: L('rewrite', 'rewrite'), question: L('What is a rewrite?', 'Что такое rewrite?'), answer: L('URL proxy. Server-side mask. User sees original URL, content from destination. next.config.js rewrites().', 'URL прокси. Маскировка на сервере. Пользователь видит оригинальный URL, контент из назначения. rewrites() в next.config.js.'), code: `// next.config.js\nasync rewrites() {\n  return [{ source: '/old', destination: '/new' }];\n}` },
    { id: 'next-053', title: L('next.config.js', 'next.config.js'), question: L('What is next.config.js?', 'Что такое next.config.js?'), answer: L('Configuration file. Experimental flags, rewrites, redirects, headers, images, webpack.', 'Файл конфигурации. Экспериментальные флаги, rewrites, redirects, headers, images, webpack.'), code: `/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.com' }] },\n};\nexport default nextConfig;` },
    { id: 'next-054', title: L('Environment variables', 'Переменные окружения'), question: L('How env vars work?', 'Как работают переменные окружения?'), answer: L('.env.local for local, .env.production for prod. Server-only by default. NEXT_PUBLIC_ for client.', '.env.local для локальной, .env.production для прода. Только сервер по умолчанию. NEXT_PUBLIC_ для клиента.'), code: `// .env.local\nDATABASE_URL=postgres://...\nNEXT_PUBLIC_API_URL=https://api.com` },
    { id: 'next-055', title: L('NEXT_PUBLIC_', 'NEXT_PUBLIC_'), question: L('What does NEXT_PUBLIC_ do?', 'Что делает NEXT_PUBLIC_?'), answer: L('Exposes var to client bundle. Inlined at build. Never secrets. Runtime override impossible.', 'Раскрывает переменную клиентскому бандлу. Инлайнится при сборке. Никогда секреты. Оверрайд в runtime невозможен.'), code: `// Client component\nconst url = process.env.NEXT_PUBLIC_API_URL;` },
  ],
  quiz: [
    {
      id: 'next-q01',
      question: L(
        'Where do the routes of a Next.js App Router application live?',
        'Где живут маршруты приложения на Next.js App Router?'
      ),
      options: [
        L(
          'In the pages/ directory, where every route is a separate .tsx file',
          'В каталоге pages/, где каждый маршрут — отдельный файл .tsx'
        ),
        L(
          'In a src/routes/ folder that is registered in next.config.js',
          'В каталоге src/routes/, который регистрируется в next.config.js'
        ),
        L(
          'In the public/ folder, where the HTML files are generated by hand',
          'В каталоге public/, где HTML-файлы генерируются вручную'
        ),
        L(
          'In the app/ directory, where each folder is a URL segment and the file names define the behaviour',
          'В каталоге app/, где каждая папка — сегмент URL, а имена файлов задают поведение'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The App Router is fully based on conventions: a folder is a segment and a page.tsx inside it turns that segment into a route. The pages/ directory belongs to the older Pages Router, src/routes does not exist in Next.js, and public/ only holds static assets that are served as they are.',
        'App Router полностью построен на соглашениях: папка — это сегмент, а page.tsx внутри неё превращает сегмент в маршрут. Каталог pages/ относится к старому Pages Router, src/routes в Next.js не существует, а public/ содержит только статические файлы, которые отдаются как есть.'
      ),
    },
    {
      id: 'next-q02',
      question: L(
        'How does the App Router replace getServerSideProps from the Pages Router?',
        'Как App Router заменяет getServerSideProps из Pages Router?'
      ),
      options: [
        L(
          'The data is still fetched in getServerSideProps, but the file moves to app/',
          'Данные всё ещё загружаются в getServerSideProps, но файл переносится в app/'
        ),
        L(
          'The data is fetched in a useEffect hook on the client',
          'Данные загружаются в useEffect на клиенте'
        ),
        L(
          'The page component becomes async and awaits the data directly in its body',
          'Компонент страницы становится async и ждёт данные прямо в своём теле'
        ),
        L(
          'The data is loaded by a route handler in app/api/ that the page calls',
          'Данные загружает route handler в app/api/, который вызывает страница'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'A Server Component can be async, so the page just awaits the request and renders the result that is already in the markup. useEffect would show an empty page first, and a route handler is only worth the extra hop when other clients need the same data. getServerSideProps has no equivalent in the App Router.',
        'Server Component может быть async, поэтому страница просто ждёт запрос и рендерит результат, который уже есть в разметке. useEffect сначала показал бы пустую страницу, а route handler оправдан только когда те же данные нужны другим клиентам. У getServerSideProps в App Router нет аналога.'
      ),
    },
    {
      id: 'next-q03',
      question: L(
        'What kind of component is a file in app/ by default?',
        'Каким компонентом по умолчанию является файл в app/?'
      ),
      options: [
        L(
          'A React Client Component, because the app/ folder is hydrated automatically',
          'React Client Component, потому что каталог app/ автоматически гидратируется'
        ),
        L(
          'A React Server Component',
          'React Server Component'
        ),
        L(
          'A plain React function that is rendered only at build time',
          'Обычная React-функция, которая рендерится только при сборке'
        ),
        L(
          'A Route Handler that answers with JSON',
          'Route Handler, который отвечает JSON-ом'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'Everything in app/ is a Server Component until a file opts out with the "use client" directive. Server Components run only on the server, so they can read a database and secrets and ship no JavaScript of their own to the browser. A client component is the exception, not the rule.',
        'Всё в app/ — это Server Component, пока файл явно не переключит себя директивой "use client". Server Components выполняются только на сервере, поэтому могут ходить в базу и читать секреты, и собственного JavaScript в браузер не отправляют. Клиентский компонент — исключение, а не правило.'
      ),
    },
    {
      id: 'next-q04',
      question: L(
        'What does the "use client" directive at the top of a file do?',
        'Что делает директива "use client" в начале файла?'
      ),
      options: [
        L(
          'It tells Next.js to render the file only on the server',
          'Она говорит Next.js рендерить файл только на сервере'
        ),
        L(
          'It marks the file as a Server Action that can be called from a form',
          'Она помечает файл как Server Action, вызываемый из формы'
        ),
        L(
          'It enables React Server Components inside that file',
          'Она включает React Server Components внутри файла'
        ),
        L(
          'It turns every component in that file into a Client Component, and everything they import as well',
          'Она превращает каждый компонент файла в Client Component, и всё, что они импортируют, тоже'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        '"use client" — это граница, а не переключатель для одного компонента: в клиентский бандл попадает весь файл вместе с его графом импортов. "use server" помечает Server Actions, а Server Component получается тогда, когда директивы нет вообще.',
        '"use client" — это граница, а не переключатель для одного компонента: в клиентский бандл попадает весь файл вместе с его графом импортов. "use server" помечает Server Actions, а Server Component получается тогда, когда директивы нет вообще.'
      ),
    },
    {
      id: 'next-q05',
      question: L(
        'Why should the "use client" directive be placed as deep in the tree as possible?',
        'Почему директиву "use client" стоит ставить как можно глубже в дереве?'
      ),
      options: [
        L(
          'Because Next.js refuses to compile a file with "use client" inside a folder that also has a layout',
          'Потому что Next.js не компилирует файл с "use client" в папке, где уже есть layout'
        ),
        L(
          'Because everything below the directive ships to the browser, and a smaller client bundle means less JavaScript to download and execute',
          'Потому что всё ниже директивы уезжает в браузер, а меньший клиентский бандл — это меньше JavaScript на загрузку и выполнение'
        ),
        L(
          'Because the directive only works in files that do not import other components',
          'Потому что директива работает только в файлах, которые ничего не импортируют'
        ),
        L(
          'Because a client component can only be rendered from the root layout',
          'Потому что клиентский компонент можно отрендерить только из корневого layout'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'The directive does not affect a single component, it marks the edge of the client bundle. If you push it down to the leaf that really needs state or a click handler, the parents stay Server Components and their code never reaches the browser. Putting it at the top of a shared file is the classic way to accidentally ship the whole tree to the client.',
        'Директива действует не на один компонент, а отмечает границу клиентского бандла. Если опустить её до листа, которому действительно нужны состояние или обработчик клика, родители останутся Server Components, и их код в браузер не попадёт. Директива наверху общего файла — классический способ случайно отправить всё дерево клиенту.'
      ),
    },
    {
      id: 'next-q06',
      question: L(
        'A Server Component tries to call useState. What happens?',
        'Server Component вызывает useState. Что произойдёт?'
      ),
      options: [
        L(
          'It works, but the state is kept on the server and sent to the browser as HTML',
          'Работает, но состояние хранится на сервере и приходит в браузер как HTML'
        ),
        L(
          'It works only in development mode',
          'Работает только в режиме разработки'
        ),
        L(
          'It is an error: hooks only work in Client Components',
          'Это ошибка: хуки работают только в Client Components'
        ),
        L(
          'It silently becomes a plain variable and the component never re-renders',
          'Тихо превращается в обычную переменную, и компонент никогда не перерисуется'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'Hooks need a React runtime that lives in the browser, and a Server Component has none. The fix is to move the interactive part into a small child component marked with "use client" and pass the server data into it as props. A silent fallback to a plain variable would hide the bug instead of fixing it.',
        'Хукам нужен React-рантайм в браузере, а у Server Component его нет. Правильный выход — вынести интерактивную часть в маленький дочерний компонент с директивой "use client" и передать серверные данные в него пропсами. Тихое превращение в обычную переменную спрятало бы баг, а не починило бы его.'
      ),
    },
    {
      id: 'next-q07',
      question: L(
        'Which of these can a Client Component do?',
        'Что из перечисленного может Client Component?'
      ),
      options: [
        L(
          'Use hooks, attach event handlers and call browser APIs such as window.localStorage',
          'Использовать хуки, вешать обработчики событий и вызывать браузерные API вроде window.localStorage'
        ),
        L(
          'Read a private database connection string without any extra configuration',
          'Прочитать приватную строку подключения к базе без дополнительной настройки'
        ),
        L(
          'Render on the server and stream the result without sending any JavaScript',
          'Отрендериться на сервере и отдать результат, не отправляя ни байта JavaScript'
        ),
        L(
          'Import a Server Component directly and render it inside the client bundle',
          'Импортировать Server Component напрямую и отрендерить его в клиентском бандле'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'Client Components run in the browser, so hooks, event handlers and browser APIs are exactly what they are for. Secrets and direct database access belong to Server Components, and a Server Component cannot be imported into a client file: you pass the already rendered element as a prop instead.',
        'Client Components выполняются в браузере, поэтому хуки, обработчики и браузерные API — это как раз их работа. Секреты и прямой доступ к базе остаются у Server Components, а Server Component нельзя импортировать в клиентский файл: вместо этого передают уже отрендеренный элемент пропом.'
      ),
    },
    {
      id: 'next-q08',
      question: L(
        'Why can a Server Component read a database directly instead of calling an API?',
        'Почему Server Component может ходить в базу напрямую, а не через API?'
      ),
      options: [
        L(
          'Because Next.js injects a database client into every component automatically',
          'Потому что Next.js сам подставляет клиент базы в каждый компонент'
        ),
        L(
          'Because the database driver is bundled for the browser and runs there as well',
          'Потому что драйвер базы собирается и для браузера, и работает там же'
        ),
        L(
          'Because route handlers proxy the query automatically',
          'Потому что route handlers автоматически проксируют запрос'
        ),
        L(
          'Because it runs on the server, so the database code and the credentials never leave the server',
          'Потому что он выполняется на сервере, и код базы вместе с учётными данными не покидают сервер'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The point of Server Components is that server-only code stays on the server. An API call from the browser would expose the query in the network tab and force a round trip for no reason. Next.js does not inject any database client, and a driver in the browser bundle would leak the connection string to everyone.',
        'Смысл Server Components в том, что серверный код остаётся на сервере. Запрос из браузера показал бы SQL во вкладке сети и добавил бы лишний круг без причины. Next.js не подставляет клиент базы сам, а драйвер в клиентском бандле выдал бы строку подключения всем желающим.'
      ),
    },
    {
      id: 'next-q09',
      question: L(
        'A Client Component receives a Server Component as its children prop. Is that allowed?',
        'Client Component получает Server Component пропом children. Это допустимо?'
      ),
      options: [
        L(
          'No: a Client Component can never receive anything but plain data',
          'Нет: Client Component может получить только простые данные'
        ),
        L(
          'Yes: the server component is rendered on the server and the finished element is passed into the client component as an opaque prop',
          'Да: серверный компонент рендерится на сервере, и готовый элемент передаётся в клиентский компонент как непрозрачный проп'
        ),
        L(
          'No: the whole page has to become a Client Component instead',
          'Нет: вместо этого вся страница должна стать Client Component'
        ),
        L(
          'Only if the server component is wrapped in a Suspense boundary',
          'Только если серверный компонент обёрнут в границу Suspense'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'Passing server-rendered content into a client component through children is the recommended pattern for a shared layout with client interactivity. What cannot cross the boundary is a server component imported as a module: functions and non-serialisable values cannot be sent to the browser, while already rendered elements can.',
        'Передача серверного контента в клиентский компонент через children — рекомендуемый приём для общего каркаса с клиентской интерактивностью. Через границу не проходит серверный компонент, импортированный как модуль: функции и несериализуемые значения в браузер не отправить, а уже отрендеренные элементы — можно.'
      ),
    },
    {
      id: 'next-q10',
      question: L(
        'What is the correct way to change a value that a component received as a prop?',
        'Как правильно изменить значение, полученное компонентом пропом?'
      ),
      options: [
        L(
          'Assign a new value to the prop inside the component, React will re-render',
          'Присвоить пропу новое значение внутри компонента, React перерисует всё сам'
        ),
        L(
          'Mutate the object that the prop points to, so the parent sees the change',
          'Изменить объект, на который указывает проп, чтобы родитель увидел правку'
        ),
        L(
          'Do not change the prop. Compute a new value or ask the parent to change it by calling a callback',
          'Не менять проп. Вычислить новое значение или попросить родителя изменить его через колбэк'
        ),
        L(
          'Store the prop in state on the first render and edit that copy later',
          'Сохранить проп в состояние при первом рендере и потом править копию'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'Props are read-only inputs: mutating them breaks the one-way data flow and React may not re-render at all. A copy in local state is a legitimate pattern, but it silently stops tracking the prop, so for values that come from the parent the right move is a callback or a new derived value.',
        'Пропы — это входные данные только для чтения: их мутация ломает односторонний поток данных, и React может вообще не перерисовать компонент. Копия в локальном состоянии — допустимый приём, но она тихо перестаёт следить за пропом, поэтому для значений от родителя правильный путь — колбэк или новое производное значение.'
      ),
    },
    {
      id: 'next-q11',
      question: L(
        'How does a Server Component load data?',
        'Как Server Component загружает данные?'
      ),
      options: [
        L(
          'By making the component async and awaiting the request in the body',
          'Делает компонент async и ждёт запрос прямо в теле функции'
        ),
        L(
          'By calling useEffect and fetching the data after the first paint',
          'Вызывает useEffect и грузит данные после первой отрисовки'
        ),
        L(
          'By wrapping the component in a client provider that owns the fetch',
          'Оборачивает компонент в клиентский провайдер, который владеет запросом'
        ),
        L(
          'By rendering a separate route handler and reading the response with fetch',
          'Рендерит отдельный route handler и читает ответ через fetch'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'Server Components are allowed to be async, so the request happens before the HTML is sent and the result is already in the markup. useEffect would send the user an empty page first, and a route handler is only worth the extra hop when the data is also needed by other clients.',
        'Server Components могут быть async, поэтому запрос происходит до отправки HTML, и результат уже находится в разметке. useEffect сначала показал бы пользователю пустую страницу, а route handler оправдан только когда данные нужны и другим клиентам.'
      ),
    },
    {
      id: 'next-q12',
      question: L(
        'A folder app/dashboard has a layout.tsx but no page.tsx. What happens when a user opens /dashboard?',
        'В папке app/dashboard есть layout.tsx, но нет page.tsx. Что будет, если открыть /dashboard?'
      ),
      options: [
        L(
          'The layout is rendered and its children prop is left empty',
          'Layout отрендерится, а его проп children останется пустым'
        ),
        L(
          'Next.js generates a default page with the folder name as the title',
          'Next.js сгенерирует страницу по умолчанию с названием папки в заголовке'
        ),
        L(
          'The request fails with a 500 error',
          'Запрос упадёт с ошибкой 500'
        ),
        L(
          'Nothing is rendered for that segment: a route needs page.tsx, and the parent not-found.tsx takes over',
          'Сегмент ничего не отрендерит: для маршрута нужен page.tsx, и сработает родительский not-found.tsx'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'page.tsx is what turns a segment into a public URL; a layout alone only wraps children that exist. Because the segment does not match, the request falls through to the nearest not-found boundary. An empty children prop would render a blank page, which is not what Next.js does here.',
        'Именно page.tsx превращает сегмент в публичный URL: layout сам по себе лишь оборачивает потомков, которых здесь нет. Поскольку сегмент не совпал, запрос уходит к ближайшей границе not-found. Пустой children дал бы белую страницу, а Next.js делает не так.'
      ),
    },
    {
      id: 'next-q13',
      question: L(
        'What happens to a layout.tsx between two navigations inside its segment?',
        'Что происходит с layout.tsx между двумя навигациями внутри его сегмента?'
      ),
      options: [
        L(
          'It is unmounted and mounted again, exactly like the page',
          'Он размонтируется и смонтируется заново, ровно как страница'
        ),
        L(
          'It persists: the component is not unmounted, so its state and open panels survive the navigation',
          'Он сохраняется: компонент не размонтируется, поэтому его состояние и открытые панели переживают навигацию'
        ),
        L(
          'It is rendered on the server only and never reaches the browser',
          'Он рендерится только на сервере и в браузер не попадает'
        ),
        L(
          'It is replaced by template.tsx as soon as the navigation starts',
          'Его заменяет template.tsx, как только начинается навигация'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'Layouts are the persistent shell of a segment, which is why sidebars and headers keep their state while the pages swap. Templates are the opposite: they remount on every navigation. A layout always reaches the browser, otherwise the shared UI would disappear.',
        'Layout — это постоянная оболочка сегмента, поэтому сайдбары и хедеры сохраняют состояние, пока страницы меняются. Template — наоборот, перемонтируется при каждой навигации. Layout всегда доходит до браузера, иначе общий интерфейс просто исчез бы.'
      ),
    },
    {
      id: 'next-q14',
      question: L(
        'Which prop does a layout.tsx receive to render the content of its segment?',
        'Какой проп получает layout.tsx, чтобы отрендерить содержимое своего сегмента?'
      ),
      options: [
        L('params', 'params'),
        L('searchParams', 'searchParams'),
        L('children', 'children'),
        L('segments', 'segments'),
      ],
      correctIndex: 2,
      explanation: L(
        'A layout is a React component that wraps its segment, so it receives the nested content as children. params and searchParams belong to pages, and there is no segments prop in the App Router. For a dynamic segment the layout also gets params, but that is not what it renders.',
        'Layout — это React-компонент, оборачивающий сегмент, поэтому вложенное содержимое приходит ему пропом children. params и searchParams — это данные страниц, а проп segments в App Router не существует. У layout динамического сегмента тоже есть params, но рендерит он именно children.'
      ),
    },
    {
      id: 'next-q15',
      question: L(
        'How does template.tsx differ from layout.tsx?',
        'Чем template.tsx отличается от layout.tsx?'
      ),
      options: [
        L(
          'A template is remounted on every navigation, a layout is not',
          'Template перемонтируется при каждой навигации, layout — нет'
        ),
        L(
          'A template is rendered on the server only, a layout is rendered on the client',
          'Template рендерится только на сервере, layout — на клиенте'
        ),
        L(
          'A template can only be used for error handling, a layout only for styling',
          'Template годится только для обработки ошибок, layout — только для стилей'
        ),
        L(
          'A template replaces layout.tsx completely and renders the whole segment alone',
          'Template полностью заменяет layout.tsx и рендерит сегмент в одиночку'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'A template is a sibling of the layout that wraps the same children, but React gives it a fresh instance on every navigation, which resets state and replays entry animations. A layout keeps its instance. Templates do not replace layouts, and both are normal React components.',
        'Template — сосед layout с тем же набором потомков, но React даёт ему свежий экземпляр при каждой навигации, из-за чего состояние сбрасывается, а анимация появления проигрывается заново. Layout сохраняет свой экземпляр. Template не заменяет layout, и оба — обычные React-компоненты.'
      ),
    },
    {
      id: 'next-q16',
      question: L(
        'What does loading.tsx in a segment do?',
        'Что делает loading.tsx в сегменте?'
      ),
      options: [
        L(
          'It is rendered after the page has loaded, to confirm the result',
          'Рендерится после загрузки страницы, чтобы подтвердить результат'
        ),
        L(
          'It disables caching for the whole segment',
          'Отключает кэширование всего сегмента'
        ),
        L(
          'It catches runtime errors of the segment',
          'Ловит ошибки времени выполнения в сегменте'
        ),
        L(
          'It wraps the segment in a Suspense boundary and is shown as the fallback while the data loads',
          'Оборачивает сегмент в границу Suspense и показывается как fallback, пока идут данные'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'loading.tsx is the file convention version of a Suspense boundary: Next.js wraps the segment in it and streams the fallback first. It is not an error boundary, that is error.tsx, and it does not change caching. Keeping the fallback close to the content it replaces avoids layout shift.',
        'loading.tsx — это файловая соглашение версия границы Suspense: Next.js оборачивает в неё сегмент и стримит fallback первым. Это не граница ошибок (это error.tsx) и на кэширование она не влияет. Если fallback лежит рядом с тем контентом, который он заменяет, страница меньше прыгает.'
      ),
    },
    {
      id: 'next-q17',
      question: L(
        'Why must error.tsx be a Client Component?',
        'Почему error.tsx обязан быть Client Component?'
      ),
      options: [
        L(
          'Because error.tsx is rendered by the router and never by the server',
          'Потому что error.tsx рендерит роутер, а не сервер'
        ),
        L(
          'Because it needs hooks such as useEffect for logging and the reset handler is a client side interaction',
          'Потому что ему нужны хуки вроде useEffect для логирования, а reset — это клиентское взаимодействие'
        ),
        L(
          'Because a file that exports an error boundary cannot export async functions',
          'Потому что файл с границей ошибок не может экспортировать async-функции'
        ),
        L(
          'Because Next.js only supports error boundaries in the pages directory',
          'Потому что Next.js поддерживает границы ошибок только в каталоге pages'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'The error boundary catches errors during the rendering of its segment, and the recovery UI needs a click handler plus hooks to report the error. Server Components cannot have event handlers, so the file has to be a client component. Nothing about the boundary works only in pages/.',
        'Граница ошибок ловит сбой во время рендера своего сегмента, а интерфейсу восстановления нужны обработчик клика и хуки для репортинга ошибки. У Server Components нет обработчиков событий, поэтому файл обязан быть клиентским. Ничто в этой границе не работает только в pages/.'
      ),
    },
    {
      id: 'next-q18',
      question: L(
        'Which props does an error.tsx component receive?',
        'Какие пропы получает компонент error.tsx?'
      ),
      options: [
        L('error and retry', 'error и retry'),
        L('message and stack', 'message и stack'),
        L('error and reset', 'error и reset'),
        L('params and searchParams', 'params и searchParams'),
      ],
      correctIndex: 2,
      explanation: L(
        'The component receives the error that was thrown and a reset function that re-renders the segment and retries the render. There is no retry prop, and message and stack are not passed in. The error message is redacted in production builds, so do not rely on it for debugging details.',
        'Компонент получает брошенную ошибку и функцию reset, которая перерисовывает сегмент и повторяет попытку рендера. Пропа retry нет, message и stack не передаются. В продакшен-сборке текст ошибки редактируется, поэтому для деталей отладки на него не полагаются.'
      ),
    },
    {
      id: 'next-q19',
      question: L(
        'What happens when a server component calls notFound()?',
        'Что произойдёт, если серверный компонент вызовет notFound()?'
      ),
      options: [
        L(
          'The nearest error.tsx is rendered and the response status is 500',
          'Рендерится ближайший error.tsx, а статус ответа — 500'
        ),
        L(
          'The nearest not-found.tsx is rendered and the response status is 404',
          'Рендерится ближайший not-found.tsx, а статус ответа — 404'
        ),
        L(
          'The function returns undefined and the page renders with empty data',
          'Функция вернёт undefined, и страница отрендерится с пустыми данными'
        ),
        L(
          'The request is redirected to the root layout',
          'Запрос будет перенаправлен на корневой layout'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'notFound() throws a special NEXT_NOT_FOUND signal that ends the render and hands over to the not-found boundary with a 404 status. error.tsx is for unexpected failures and gives a 500. The trick is to call notFound() after the data has actually been fetched and checked.',
        'notFound() бросает специальный сигнал NEXT_NOT_FOUND, который прерывает рендер и передаёт управление границе not-found со статусом 404. error.tsx — для неожиданных сбоев и даёт 500. Хитрость в том, чтобы вызывать notFound() уже после того, как данные загружены и проверены.'
      ),
    },
    {
      id: 'next-q20',
      question: L(
        'What is the effect of a route group such as app/(marketing)/about/page.tsx on the URL?',
        'Как группа маршрутов вроде app/(marketing)/about/page.tsx влияет на URL?'
      ),
      options: [
        L(
          'The URL becomes /marketing/about',
          'URL становится /marketing/about'
        ),
        L(
          'The URL becomes /(marketing)/about',
          'URL становится /(marketing)/about'
        ),
        L(
          'The group only works for dynamic segments and is ignored for static ones',
          'Группа работает только для динамических сегментов, а для статических игнорируется'
        ),
        L(
          'None: the group is only a folder for organisation, so the URL is /about',
          'Никакого: группа — это просто папка для организации, поэтому URL остаётся /about'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'Parentheses around a folder name mark it as a route group, and route groups are removed from the URL. They exist to share layouts, to separate loading and error boundaries, and to organise a growing app. Folders with brackets and dots do change the URL, that is how dynamic and parallel routes work.',
        'Скобки вокруг имени папки означают группу маршрутов, и из URL она убирается. Группы нужны, чтобы делить layouts, разделять состояния загрузки и ошибок и приводить в порядок растущее приложение. А вот папки в квадратных скобках и с точкой меняют URL — так работают динамические и параллельные маршруты.'
      ),
    },
    {
      id: 'next-q21',
      question: L(
        'How are parallel routes declared in the App Router?',
        'Как объявляются параллельные маршруты в App Router?'
      ),
      options: [
        L(
          'With folders named #slot, and the layout renders them with a children prop',
          'Папками с именем #slot, а layout рендерит их пропом children'
        ),
        L(
          'With folders named @slot, and the layout receives each slot as a prop',
          'Папками с именем @slot, а layout получает каждый слот отдельным пропом'
        ),
        L(
          'With folders named %slot, which are rendered automatically one after another',
          'Папками с именем %slot, которые рендерятся автоматически друг за другом'
        ),
        L(
          'With folders named $slot, which only work for dynamic segments',
          'Папками с именем $slot, которые работают только с динамическими сегментами'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'A folder whose name starts with @ is a slot: app/@team/page.tsx is passed to the parent layout as the team prop. The layout decides where each slot goes, which is what makes the dashboard pattern possible. The # sign marks an optional catch-all segment, $ is for dynamic segments, and % is not a thing.',
        'Папка, имя которой начинается с @, — это слот: app/@team/page.tsx приходит в родительский layout пропом team. Layout сам решает, куда поставить каждый слот, и на этом держится паттерн дашборда. Знак # означает необязательный catch-all сегмент, $ — динамический сегмент, а % в Next.js нет.'
      ),
    },
    {
      id: 'next-q22',
      question: L(
        'The pattern app/@modal/(.)photo/[id]/page.tsx is used for...',
        'Паттерн app/@modal/(.)photo/[id]/page.tsx используется для...'
      ),
      options: [
        L(
          'A catch-all route that catches every photo id',
          'catch-all маршрута, который ловит любой photo id'
        ),
        L(
          'A route that rewrites /photo/[id] to /modal/photo/[id] on the server',
          'Маршрута, который на сервере переписывает /photo/[id] в /modal/photo/[id]'
        ),
        L(
          'An intercepting route: it shows the photo page inside a modal when navigated to from the same level',
          'Перехватывающего маршрута: он показывает страницу фото в модалке при переходе с того же уровня'
        ),
        L(
          'A parallel route that always renders next to the photo page',
          'Параллельного маршрута, который всегда рендерится рядом со страницей фото'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'The (.) prefix means intercept the same level, so the route renders into the slot instead of replacing the page. It is the standard way to build a modal that keeps the underlying page visible. A full page load of the same URL still renders the normal page, because intercepting routes only apply to soft navigation.',
        'Префикс (.) означает «перехватить тот же уровень», поэтому маршрут рендерится в слот, а не заменяет страницу. Это стандартный способ сделать модалку, не убирая страницу из-под неё. При полной перезагрузке того же URL откроется обычная страница: перехват работает только при мягкой навигации.'
      ),
    },
    {
      id: 'next-q23',
      question: L(
        'Which exports does a file app/api/users/route.ts need to define a route handler?',
        'Какие экспорты нужны файлу app/api/users/route.ts, чтобы задать route handler?'
      ),
      options: [
        L(
          'One exported function per HTTP method, such as export async function GET(request)',
          'По одной экспортированной функции на HTTP-метод, например export async function GET(request)'
        ),
        L(
          'A single export default function that receives the method as an argument',
          'Одна функция export default, которая получает HTTP-метод аргументом'
        ),
        L(
          'A named export called handler plus an exported object with the methods',
          'Именованный экспорт handler и экспортируемый объект с методами'
        ),
        L(
          'A class that extends the RouteHandler base class from next/server',
          'Класс, наследующий базовый класс RouteHandler из next/server'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'Route handlers use the file name to define the path and the exported function name to define the HTTP method, exactly like a controller. An unsupported method returns 405 rather than falling through to a default export. The Web Request and Response objects are used inside, not a custom router type.',
        'Route handler определяет путь именем файла, а HTTP-метод — именем экспортированной функции, ровно как в контроллере. Неподдерживаемый метод получает 405, а не уходит в export default. Внутри используются веб-объекты Request и Response, а не какой-то свой тип роутера.'
      ),
    },
    {
      id: 'next-q24',
      question: L(
        'How does a GET handler read the q parameter of /api/search?q=next?',
        'Как GET-обработчик читает параметр q из /api/search?q=next?'
      ),
      options: [
        L('const q = request.query.q', 'const q = request.query.q'),
        L('const q = request.params.q', 'const q = request.params.q'),
        L('const q = request.body.q', 'const q = request.body.q'),
        L('const q = new URL(request.url).searchParams.get("q")', 'const q = new URL(request.url).searchParams.get("q")'),
      ],
      correctIndex: 3,
      explanation: L(
        'A Route Handler receives a standard Request, so the query string is parsed from the URL. request.query and request.params belong to Express, and request.body is for the request body, not the query string. The request argument is optional when the handler does not need the URL.',
        'Route Handler получает стандартный Request, поэтому query string разбирается прямо из URL. request.query и request.params — это API Express, а request.body относится к телу запроса, а не к строке запроса. Аргумент request можно не принимать, если URL не нужен.'
      ),
    },
    {
      id: 'next-q25',
      question: L(
        'A POST handler successfully creates a resource. Which status code should it return?',
        'POST-обработчик успешно создал ресурс. Какой статус-код он должен вернуть?'
      ),
      options: [
        L('200', '200'),
        L('201', '201'),
        L('204', '204'),
        L('302', '302'),
      ],
      correctIndex: 1,
      explanation: L(
        '201 Created is the code that says the request succeeded and a new resource was created, and the body of the response is that resource. 200 is for a plain success, 204 means success with no body, and 302 is a redirect that the browser follows with a GET.',
        '201 Created говорит, что запрос выполнен и создан новый ресурс, а тело ответа содержит этот ресурс. 200 — просто успех, 204 — успех без тела, а 302 — редирект, за которым браузер пойдёт методом GET.'
      ),
    },
    {
      id: 'next-q26',
      question: L(
        'A POST handler calls await request.json() and the body turns out not to be valid JSON. What is the best response?',
        'POST-обработчик вызывает await request.json(), а тело оказалось невалидным JSON. Какой ответ лучше?'
      ),
      options: [
        L(
          'Return 500, because the server failed to parse the body',
          'Вернуть 500, потому что сервер не смог разобрать тело'
        ),
        L(
          'Return 422, because the body is invalid',
          'Вернуть 422, потому что тело некорректно'
        ),
        L(
          'Return 400, because the request could not be understood',
          'Вернуть 400, потому что запрос не удалось понять'
        ),
        L(
          'Return 422, because the data is invalid',
          'Вернуть 422, потому что данные некорректны'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'A body that does not parse is a malformed request, so 400 is the accurate answer. 422 is for a body that parses but carries values the server refuses, such as a missing required field. Letting the exception escape would turn a client mistake into a 500.',
        'Тело, которое не разобралось, — это неправильно сформированный запрос, поэтому честный ответ 400. 422 — для тела, которое разобралось, но содержит неприемлемые значения, например отсутствующее обязательное поле. Если дать исключению вылететь наружу, ошибка клиента превратится в 500.'
      ),
    },
    {
      id: 'next-q27',
      question: L(
        'How is a route handler for /api/posts/42 written?',
        'Как пишется route handler для /api/posts/42?'
      ),
      options: [
        L(
          'As app/api/posts/[id]/route.ts, where the handler receives { params } as its second argument',
          'Как app/api/posts/[id]/route.ts, где обработчик получает { params } вторым аргументом'
        ),
        L(
          'As app/api/posts/[id]/page.tsx, which exports a GET function',
          'Как app/api/posts/[id]/page.tsx, который экспортирует функцию GET'
        ),
        L(
          'As app/api/posts/route.ts, where the id is read from the query string',
          'Как app/api/posts/route.ts, где id читается из строки запроса'
        ),
        L(
          'As app/api/posts/id/route.ts, where the id is the name of a header',
          'Как app/api/posts/id/route.ts, где id — это имя заголовка'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'A dynamic segment is a folder with square brackets, and the value arrives in the params argument. A route handler is always route.ts and never page.tsx, because a page renders UI while a handler answers with data. The id in the path is not a query parameter, it is part of the route.',
        'Динамический сегмент — это папка в квадратных скобках, и значение приходит аргументом params. Route handler — это всегда route.ts и никогда page.tsx: страница рисует интерфейс, а обработчик отвечает данными. id в пути — часть маршрута, а не параметр запроса.'
      ),
    },
    {
      id: 'next-q28',
      question: L(
        'How does a route handler read the token cookie?',
        'Как route handler читает cookie с именем token?'
      ),
      options: [
        L('const token = cookies().get("token").value', 'const token = cookies().get("token").value'),
        L('const token = request.headers.get("token")', 'const token = request.headers.get("token")'),
        L('const token = request.cookie("token")', 'const token = request.cookie("token")'),
        L('const token = request.cookies.get("token")?.value', 'const token = request.cookies.get("token")?.value'),
      ],
      correctIndex: 3,
      explanation: L(
        'On a NextRequest the cookies are a read only map, and get returns an object with the value, so the optional chaining is what keeps the code safe when the cookie is missing. cookies() is the async API for Server Components and Server Actions, not for a handler. A cookie is not a header either, although cookies do travel in the Cookie header.',
        'У NextRequest cookies — это карта только для чтения, а get возвращает объект со значением, поэтому именно optional chaining защищает код, когда cookie отсутствует. cookies() — асинхронный API для Server Components и Server Actions, а не для обработчика. Cookie, кстати, не заголовок, хотя и едет в заголовке Cookie.'
      ),
    },
    {
      id: 'next-q29',
      question: L(
        'How does a route handler add a response header such as X-Request-Id?',
        'Как route handler добавляет заголовок ответа вроде X-Request-Id?'
      ),
      options: [
        L(
          'By assigning request.headers.set("X-Request-Id", id)',
          'Вызвав request.headers.set("X-Request-Id", id)'
        ),
        L(
          'By building the response with new Response(body, { headers }) or by using NextResponse',
          'Собрав ответ через new Response(body, { headers }) или через NextResponse'
        ),
        L(
          'By returning an object with a headers field from the handler',
          'Вернув из обработчика объект с полем headers'
        ),
        L(
          'By adding a metadata export to the route file',
          'Добавив экспорт metadata в файл маршрута'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'Headers of the incoming request are immutable, so you cannot add to them. The response is where headers belong: a plain Response takes them in its init object and NextResponse offers a friendlier API. Returning a custom object is not how the handler protocol works.',
        'Заголовки входящего запроса неизменяемы, добавить к ним ничего нельзя. Заголовки принадлежат ответу: обычный Response принимает их в объекте инициализации, а NextResponse даёт более удобный API. Возврат собственного объекта — не часть протокола обработчика.'
      ),
    },
    {
      id: 'next-q30',
      question: L(
        'What is the main difference between a Route Handler and a Server Action?',
        'В чём главное различие между Route Handler и Server Action?'
      ),
      options: [
        L(
          'A Route Handler runs on the client, a Server Action runs on the server',
          'Route Handler выполняется на клиенте, а Server Action — на сервере'
        ),
        L(
          'They are the same thing with two different names',
          'Это одно и то же под двумя названиями'
        ),
        L(
          'A Route Handler is an HTTP endpoint that answers with a response, a Server Action is a function called from your own UI to mutate data',
          'Route Handler — это HTTP-эндпоинт, отвечающий ответом, а Server Action — функция, которую вызывает ваш интерфейс, чтобы изменить данные'
        ),
        L(
          'A Server Action must return JSON, a Route Handler must return HTML',
          'Server Action обязан возвращать JSON, а Route Handler — HTML'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'Route Handlers are for data that leaves your app, for example a webhook or a mobile client, and they follow HTTP semantics with status codes and headers. Server Actions are the internal mutation path of the application, called from forms and components. A Route Handler answers a request, while an action is invoked by your own code.',
        'Route Handlers — для данных, которые уходят наружу: вебхука, мобильного клиента; они живут по HTTP-семантике, со статус-кодами и заголовками. Server Actions — внутренний путь изменения данных, их вызывают формы и компоненты. Route Handler отвечает на запрос, а action вызывается вашим же кодом.'
      ),
    },
    {
      id: 'next-q31',
      question: L(
        'How do the catch-all segments [...slug] and [[...slug]] differ?',
        'Чем отличаются catch-all сегменты [...slug] и [[...slug]]?'
      ),
      options: [
        L(
          'The optional [[...slug]] also matches the parent route when there is no segment at all',
          'Необязательный [[...slug]] совпадает и с родительским маршрутом, когда сегмента вообще нет'
        ),
        L(
          'The optional [[...slug]] matches a single segment, while [...slug] matches any number of them',
          'Необязательный [[...slug]] ловит один сегмент, а [...slug] — любое их количество'
        ),
        L(
          'They behave identically, the extra brackets only change the shape of the params object',
          'Они работают одинаково, лишние скобки меняют только форму объекта params'
        ),
        L(
          'The optional [[...slug]] turns the segment into a route handler instead of a page',
          'Необязательный [[...slug]] превращает сегмент в route handler вместо страницы'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        '[...slug] matches one or more segments and gives params.slug as an array of strings, while the optional [[...slug]] also matches the parent path with an empty array. That is the difference between a route that always needs a segment and one that may work without it. The number of brackets does not change the type of the value and has nothing to do with route handlers.',
        '[...slug] ловит один или больше сегментов и отдаёт params.slug как массив строк, а необязательный [[...slug]] совпадает и с родительским путём, давая пустой массив. Разница — между маршрутом, которому сегмент всегда нужен, и тем, где сегмента может не быть. Число скобок не меняет тип значения и никак не превращает страницу в route handler.'
      ),
    },
    {
      id: 'next-q32',
      question: L(
        'How does Next.js decide whether an environment variable can be read in the browser?',
        'Как Next.js решает, какую переменную окружения можно прочитать в браузере?'
      ),
      options: [
        L(
          'Every variable from .env.local is exposed to the client automatically',
          'Любая переменная из .env.local автоматически доступна клиенту'
        ),
        L(
          'Variables are exposed only when they are read inside a Server Action',
          'Переменные доступны только там, где читаются внутри Server Action'
        ),
        L(
          'Only variables with the NEXT_PUBLIC_ prefix are exposed, and they are inlined into the bundle at build time',
          'Доступны только переменные с префиксом NEXT_PUBLIC_, и они встраиваются в бандл при сборке'
        ),
        L(
          'Variables are never exposed, the client always has to talk to a route handler',
          'Переменные не доступны никогда, клиенту всегда нужен route handler'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'A variable without the NEXT_PUBLIC_ prefix stays on the server and is readable only from Server Components, Server Actions and Route Handlers. With the prefix the value is inlined into the client bundle during the build, so it is baked in, cannot be changed at runtime, and is public to anyone who opens the bundle. Secrets never belong in a NEXT_PUBLIC_ variable.',
        'Переменная без префикса NEXT_PUBLIC_ остаётся на сервере и читается только из Server Components, Server Actions и Route Handlers. С префиксом значение встраивается в клиентский бандл при сборке: оно зашито в код, не может измениться в runtime и публично для всех, кто откроет бандл. Секреты в такую переменную не кладут.'
      ),
    },
    {
      id: 'next-q33',
      question: L(
        'What does the "use server" directive at the top of a file mark?',
        'Что помечает директива "use server" в начале файла?'
      ),
      options: [
        L(
          'The file as a Route Handler that answers POST requests',
          'Файл как Route Handler, отвечающий на POST-запросы'
        ),
        L(
          'Every exported async function of that file as a Server Action',
          'Каждую экспортированную async-функцию файла как Server Action'
        ),
        L(
          'The file as a Client Component, so it can use hooks',
          'Файл как Client Component, чтобы в нём можно было использовать хуки'
        ),
        L(
          'The file as a module that may only be imported by other server files',
          'Файл как модуль, который могут импортировать только другие серверные файлы'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        '"use server" turns the exported async functions into Server Actions that can be called from forms and components, and they run on the server with access to the database. It does not make the file a Route Handler, and it says nothing about hooks. Inline actions can also be marked with the directive inside a Client Component.',
        '"use server" превращает экспортированные async-функции в Server Actions, которые можно вызывать из форм и компонентов; выполняются они на сервере и имеют доступ к базе. Это не делает файл Route Handler и ничего не говорит про хуки. Встроенные actions можно помечать той же директивой внутри Client Component.'
      ),
    },
    {
      id: 'next-q34',
      question: L(
        'What does <form action={createPost}> do when createPost is a Server Action?',
        'Что делает <form action={createPost}>, если createPost — это Server Action?'
      ),
      options: [
        L(
          'The form is submitted with a GET request to the URL of the page',
          'Форма отправляется методом GET на URL страницы'
        ),
        L(
          'The action is called on the client, so the validation runs in the browser',
          'Action вызывается на клиенте, поэтому валидация идёт в браузере'
        ),
        L(
          'The browser posts the form data to the server action, and the page works even before the JavaScript has loaded',
          'Браузер отправляет данные формы в server action, и страница работает даже до загрузки JavaScript'
        ),
        L(
          'React intercepts the submit and calls the action without any network request',
          'React перехватывает submit и вызывает action без сетевого запроса'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'A Server Action used as the action attribute of a form is a real form post, so it works without JavaScript and then upgrades to a client side call once React hydrates. This is progressive enhancement. React does intercept the submit after hydration, but there is always a network request to the server.',
        'Server Action в атрибуте action формы — это настоящая отправка формы, поэтому всё работает и без JavaScript, а после гидрации React переключает её на клиентский вызов. Это прогрессивное улучшение. React действительно перехватывает submit после гидрации, но сетевой запрос к серверу в любом случае уходит.'
      ),
    },
    {
      id: 'next-q35',
      question: L(
        'What does useActionState return?',
        'Что возвращает useActionState?'
      ),
      options: [
        L(
          'A pair of the current state and a function that starts the action',
          'Пар из текущего состояния и функции, запускающей action'
        ),
        L(
          'Only the current state, the action is called with a plain event handler',
          'Только текущее состояние, action вызывается обычным обработчиком события'
        ),
        L(
          'A pair of the current state and an error object',
          'Пар из текущего состояния и объекта с ошибкой'
        ),
        L(
          'A ref to the form element that you have to submit manually',
          'Ссылку на элемент формы, которую надо отправить вручную'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'useActionState(action, initialState) returns [state, formAction]. The action itself has the shape (previousState, formData) and returns the new state, which is how validation errors reach the component. The action is still wrapped in a form, the hook only manages the state around it.',
        'useActionState(action, initialState) возвращает [state, formAction]. Сам action имеет форму (previousState, formData) и возвращает новое состояние — так ошибки валидации доезжают до компонента. Action по-прежнему оборачивается в форму, хук лишь управляет состоянием вокруг него.'
      ),
    },
    {
      id: 'next-q36',
      question: L(
        'What does the useFormStatus hook give you?',
        'Что даёт хук useFormStatus?'
      ),
      options: [
        L(
          'The values of every input of the form',
          'Значения всех полей формы'
        ),
        L(
          'The errors that the server action returned',
          'Ошибки, которые вернул server action'
        ),
        L(
          'The id of the form element, so it can be submitted programmatically',
          'Идентификатор элемента формы, чтобы отправить её программно'
        ),
        L(
          'The pending state of the form that the component belongs to',
          'Состояние ожидания той формы, которой принадлежит компонент'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'useFormStatus returns { pending, data, method, action } and pending tells you that the submission is in flight, which is what you use to disable the button. It is not the form values, and it does not carry the server errors, those come from useActionState. The hook must be called inside a component that is rendered as a child of the form.',
        'useFormStatus возвращает { pending, data, method, action }, и pending показывает, что отправка в процессе, — этим отключают кнопку. Это не значения полей и не ошибки сервера: ошибки приходят из useActionState. Хук нужно вызывать в компоненте, который отрисован внутри формы.'
      ),
    },
    {
      id: 'next-q37',
      question: L(
        'A component that renders the form also calls useFormStatus. Why is pending always false?',
        'Компонент, который рисует форму, сам вызывает useFormStatus. Почему pending всегда false?'
      ),
      options: [
        L(
          'Because the hook only sees the context of a parent form, and the component that renders the form is above it',
          'Потому что хук видит только контекст родительской формы, а компонент, рисующий форму, находится выше'
        ),
        L(
          'Because pending only becomes true for actions that come from a Route Handler',
          'Потому что pending становится true только для actions из Route Handler'
        ),
        L(
          'Because the hook needs a second argument with the form id',
          'Потому что хуку нужен второй аргумент с идентификатором формы'
        ),
        L(
          'Because the form has to use a controlled input to report its status',
          'Потому что форма должна использовать контролируемый input, чтобы сообщать статус'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'The hook reads the nearest form context from above it in the tree, so the component that renders the form itself is not inside that context. The usual fix is to extract a small child component, for example a SubmitButton, that calls the hook. Controlled inputs are irrelevant to the status.',
        'Хук читает контекст ближайшей формы выше себя по дереву, поэтому компонент, который сам рисует форму, внутрь этого контекста не попадает. Обычное решение — вынести маленький дочерний компонент, например SubmitButton, и вызвать хук в нём. Контролируемые input к статусу отношения не имеют.'
      ),
    },
    {
      id: 'next-q38',
      question: L(
        'Where should the validation of a form that posts to a Server Action live?',
        'Где должна жить валидация формы, которая отправляется в Server Action?'
      ),
      options: [
        L(
          'In the client component, so the user gets instant feedback',
          'В клиентском компоненте, чтобы пользователь сразу видел отклик'
        ),
        L(
          'In both places at the same time, because the client copy can be skipped',
          'Сразу в обоих местах, потому что клиентскую проверку можно пропустить'
        ),
        L(
          'On the server, inside the action, because the client can be modified',
          'На сервере, внутри action, потому что клиентскую часть можно изменить'
        ),
        L(
          'In the route handler, which validates the data before the action receives it',
          'В route handler, который проверяет данные до того, как action их получит'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'Client validation is a convenience for the user and can be removed or bypassed, so the action has to validate again and return the error as its state. The route handler is not in the path of a form that posts to an action. Checking the request body of the action is what actually protects the data.',
        'Клиентская проверка — удобство для пользователя, её можно убрать или обойти, поэтому action обязан проверять заново и возвращать ошибку в своём состоянии. Route handler не стоит на пути формы, отправляющейся в action. Данные реально защищает проверка тела запроса внутри самого action.'
      ),
    },
    {
      id: 'next-q39',
      question: L(
        'A Server Action deletes a row. Which sequence makes the list page show the change?',
        'Server Action удаляет строку. Какая последовательность покажет изменение на странице списка?'
      ),
      options: [
        L(
          'Delete the row, and only after the write succeeded call revalidatePath("/products")',
          'Удалить строку и только после успешной записи вызвать revalidatePath("/products")'
        ),
        L(
          'Call revalidatePath("/products") first, then delete the row',
          'Сначала вызвать revalidatePath("/products"), потом удалить строку'
        ),
        L(
          'Return the updated array from the action and let the page pick it up',
          'Вернуть из action обновлённый массив и надеяться, что страница его подхватит'
        ),
        L(
          'Call router.refresh() from inside the action, because it runs on the server',
          'Вызвать router.refresh() внутри action, потому что он выполняется на сервере'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'The rendered output of a segment is cached, so a mutation has to tell the cache that the old output is stale, and that is exactly what revalidatePath does for the given path. The order matters: invalidating first would throw the cache away even when the write fails. router.refresh() is a client side API and cannot be called from the server, and returning data does not update a cached page.',
        'Вывод сегмента кэшируется, поэтому мутация должна сказать кэшу, что старый вывод устарел, — именно это и делает revalidatePath для указанного пути. Порядок важен: инвалидация до записи выбросила бы кэш даже при неудачной записи. router.refresh() — клиентский API, с сервера его не вызвать, а возврат данных не обновляет закэшированную страницу.'
      ),
    },
    {
      id: 'next-q40',
      question: L(
        'What does redirect("/dashboard") do inside a Server Action?',
        'Что делает redirect("/dashboard") внутри Server Action?'
      ),
      options: [
        L(
          'It returns the URL as a string and the component decides what to do with it',
          'Возвращает URL строкой, а компонент сам решает, что с ней делать'
        ),
        L(
          'It throws an error that the nearest error.tsx renders',
          'Бросает ошибку, которую отрисует ближайший error.tsx'
        ),
        L(
          'It renders the dashboard page inside the current layout',
          'Рендерит страницу дашборда внутри текущего layout'
        ),
        L(
          'It ends the action and sends the user to the new URL',
          'Прекращает action и отправляет пользователя на новый URL'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'redirect throws a special NEXT_REDIRECT signal, so the code after it does not run and the response is a redirect to the target. Because it throws, the rest of the action body is skipped, which is what you want after a successful mutation. The target is not rendered inline, the browser gets a new URL.',
        'redirect бросает специальный сигнал NEXT_REDIRECT, поэтому код после него не выполняется, а ответом становится редирект на цель. Так как это исключение, остаток тела action пропускается — ровно то, что нужно после успешной мутации. Цель не рендерится внутри: браузер получает новый URL.'
      ),
    },
    {
      id: 'next-q41',
      question: L(
        'Is a fetch call inside a Server Component cached by default in the App Router?',
        'Кэшируется ли вызов fetch внутри Server Component в App Router по умолчанию?'
      ),
      options: [
        L(
          'No, every fetch in the App Router runs on every request',
          'Нет, каждый fetch в App Router выполняется на каждый запрос'
        ),
        L(
          'Yes, but only when the request has the method GET',
          'Да, но только если метод запроса GET'
        ),
        L(
          'Yes, unless the request opts out with cache: "no-store" or uses a dynamic API',
          'Да, если только запрос не отключит кэш через cache: "no-store" и не использует динамический API'
        ),
        L(
          'No, only fetch calls in Route Handlers are cached',
          'Нет, кэшируются только fetch в Route Handlers'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'The App Router extends fetch with caching, so a GET request is cached and reused until it is revalidated. It is not about the method alone: POST requests are never cached. A route that reads cookies or headers, or a fetch with no-store, switches to dynamic rendering.',
        'App Router расширяет fetch кэшированием, поэтому GET-запрос кэшируется и переиспользуется до ревалидации. Дело не только в методе: POST никогда не кэшируется. Маршрут, читающий cookies или headers, и fetch с no-store переключают рендеринг в динамический режим.'
      ),
    },
    {
      id: 'next-q42',
      question: L(
        'What does cache: "no-store" do in a fetch call?',
        'Что делает cache: "no-store" в вызове fetch?'
      ),
      options: [
        L(
          'It skips every cache and always asks the server for fresh data, which makes the route dynamic',
          'Обходит все кэши и всегда спрашивает сервер о свежих данных, а маршрут делает динамическим'
        ),
        L(
          'It stores the response in the Data Cache for the default revalidation period',
          'Складывает ответ в Data Cache на стандартный период ревалидации'
        ),
        L(
          'It caches the response in the browser cache only',
          'Кэширует ответ только в кэше браузера'
        ),
        L(
          'It caches the response and revalidates it in the background every hour',
          'Кэширует ответ и ревалидирует его в фоне каждый час'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'no-store means the request is never read from the Data Cache and never written to it, so the data is always fresh, and it opts the route out of static rendering. The opposite is force-cache. The browser cache is not what this option controls, and the background revalidation pattern is next: { revalidate }.',
        'no-store означает, что запрос не читается из Data Cache и не пишется в него, поэтому данные всегда свежие, а маршрут выходит из статического рендера. Противоположность — force-cache. Кэш браузера эта опция не трогает, а фоновая ревалидация — это уже next: { revalidate }.'
      ),
    },
    {
      id: 'next-q43',
      question: L(
        'What does cache: "force-cache" do?',
        'Что делает cache: "force-cache"?'
      ),
      options: [
        L(
          'It skips the Data Cache and fetches fresh data on every request',
          'Обходит Data Cache и каждый раз берёт свежие данные'
        ),
        L(
          'It caches the response in the browser for one hour',
          'Кэширует ответ в браузере на час'
        ),
        L(
          'It marks the response as stale so the next request regenerates it',
          'Помечает ответ как устаревший, чтобы следующий запрос его пересоздал'
        ),
        L(
          'It always serves the response from the cache and never revalidates it automatically, even when the route is dynamic',
          'Всегда отдаёт ответ из кэша и никогда не ревалидирует его автоматически, даже если маршрут динамический'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'force-cache tells Next.js to use the cached response and to keep it, which is the default behaviour for a static route. To make a cached entry expire after some time you need next: { revalidate: seconds }, otherwise the entry stays until it is invalidated by a tag or a path. It does not touch the browser cache.',
        'force-cache говорит Next.js использовать кэшированный ответ и держать его — для статического маршрута это поведение по умолчанию. Чтобы запись устаревала через какое-то время, нужен next: { revalidate: seconds }, иначе она живёт до сброса по тегу или пути. Кэш браузера опция не трогает.'
      ),
    },
    {
      id: 'next-q44',
      question: L(
        'How do you make a single fetch call revalidate every 60 seconds?',
        'Как заставить отдельный вызов fetch ревалидироваться каждые 60 секунд?'
      ),
      options: [
        L('fetch(url, { cache: 60 })', 'fetch(url, { cache: 60 })'),
        L('fetch(url, { next: { revalidate: 60 } })', 'fetch(url, { next: { revalidate: 60 } })'),
        L('fetch(url, { revalidate: 60 })', 'fetch(url, { revalidate: 60 })'),
        L('fetch(url, { next: { revalidate: "60s" } })', 'fetch(url, { next: { revalidate: "60s" } })'),
      ],
      correctIndex: 1,
      explanation: L(
        'The next option is the Next.js extension of fetch, and revalidate inside it sets the time based revalidation for that request. The revalidate option is not a standard fetch option, and the value is a number of seconds, not a duration string. A route level export const revalidate applies to the whole segment.',
        'Опция next — это расширение fetch в Next.js, и revalidate внутри неё задаёт временную ревалидацию для этого запроса. Опции revalidate у самого fetch нет, значение — число секунд, а не строка длительности. Экспорт export const revalidate на уровне маршрута действует на весь сегмент.'
      ),
    },
    {
      id: 'next-q45',
      question: L(
        'What does export const revalidate = 3600 do in a page?',
        'Что делает export const revalidate = 3600 на странице?'
      ),
      options: [
        L(
          'It makes the request wait 3600 seconds before it is sent',
          'Заставляет запрос ждать 3600 секунд перед отправкой'
        ),
        L(
          'It caches the page in the browser for an hour',
          'Кэширует страницу в браузере на час'
        ),
        L(
          'It regenerates the static page in the background at most once an hour',
          'Регенерирует статическую страницу в фоне не чаще одного раза в час'
        ),
        L(
          'It disables the cache of the segment for an hour',
          'Отключает кэш сегмента на час'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'That is the route level form of Incremental Static Regeneration: the page is served from the cache and regenerated in the background when the window of one hour has passed, so users still get the fast cached version. The unit is seconds. It does not make the page uncached.',
        'Это маршрутная форма Incremental Static Regeneration: страница отдаётся из кэша и пересобирается в фоне, когда часовое окно истекло, поэтому пользователи по-прежнему получают быструю кэшированную версию. Единица измерения — секунды. Кэш при этом не отключается.'
      ),
    },
    {
      id: 'next-q46',
      question: L(
        'What does revalidatePath("/dashboard") do?',
        'Что делает revalidatePath("/dashboard")?'
      ),
      options: [
        L(
          'It marks the cached output of that path as stale so the next visit renders it again',
          'Помечает закэшированный вывод этого пути как устаревший, чтобы следующий визит отрендерил его заново'
        ),
        L(
          'It deletes the page from the project and rebuilds it',
          'Удаляет страницу из проекта и пересобирает её'
        ),
        L(
          'It redirects the user to the given path',
          'Перенаправляет пользователя на указанный путь'
        ),
        L(
          'It clears the browser cache of the client that made the request',
          'Очищает кэш браузера клиента, который сделал запрос'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'revalidatePath is the on demand way to invalidate the Full Route Cache for a path, and it is what you call after a mutation. It also refreshes the Router Cache on the client for the pages the user visits next. It does not delete files, does not redirect and does not touch the browser cache.',
        'revalidatePath — это способ по требованию сбросить Full Route Cache для пути, и его вызывают после мутации. Заодно обновляется Router Cache на клиенте для страниц, на которые пользователь зайдёт дальше. Файлы не удаляются, редиректа нет, кэш браузера не трогается.'
      ),
    },
    {
      id: 'next-q47',
      question: L(
        'How do you invalidate every fetch that was tagged posts?',
        'Как сбросить все fetch, помеченные тегом posts?'
      ),
      options: [
        L('Call revalidatePath("/posts")', 'Вызвать revalidatePath("/posts")'),
        L('Call invalidate("posts")', 'Вызвать invalidate("posts")'),
        L('Call revalidateCache("posts")', 'Вызвать revalidateCache("posts")'),
        L('Call revalidateTag("posts")', 'Вызвать revalidateTag("posts")'),
      ],
      correctIndex: 3,
      explanation: L(
        'Tags are the granular version of revalidatePath: the fetch opts in with next: { tags: ["posts"] } and revalidateTag("posts") invalidates exactly those entries. revalidatePath works on paths, not tags, and invalidate and revalidateCache are not the names of the API.',
        'Теги — это гранулярная версия revalidatePath: fetch включает их через next: { tags: ["posts"] }, а revalidateTag("posts") сбрасывает ровно эти записи. revalidatePath работает с путями, а не с тегами, и invalidate с revalidateCache — не те названия API, которые есть в Next.js.'
      ),
    },
    {
      id: 'next-q48',
      question: L(
        'You need to cache the result of a database query that is not a fetch call. What do you use?',
        'Нужно кэшировать результат запроса в базу, который не fetch. Что использовать?'
      ),
      options: [
        L(
          'A React useMemo hook in a Client Component',
          'Хук React useMemo в Client Component'
        ),
        L(
          'unstable_cache from next/cache, with a key and optional tags',
          'unstable_cache из next/cache, с ключом и необязательными тегами'
        ),
        L(
          'The Data Cache with the option cache: "force-cache" on a fake fetch call',
          'Data Cache с опцией cache: "force-cache" на фиктивном fetch'
        ),
        L(
          'A route handler with the header Cache-Control: max-age=3600',
          'Route handler с заголовком Cache-Control: max-age=3600'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'unstable_cache wraps any async function, so it caches database queries and other server calls, and it accepts the key parts and the tags that revalidateTag later uses. A useMemo is a client side optimisation with nothing to do with the server cache. The name is still marked unstable while the API settles.',
        'unstable_cache оборачивает любую async-функцию, поэтому кэширует запросы в базу и другие серверные вызовы, и принимает части ключа и теги, которыми потом пользуется revalidateTag. useMemo — клиентская оптимизация, к серверному кэшу отношения не имеет. Название пока помечено как unstable, пока API устаканится.'
      ),
    },
    {
      id: 'next-q49',
      question: L(
        'Which statement about the three Next.js caches is correct?',
        'Какое утверждение о трёх кэшах Next.js верно?'
      ),
      options: [
        L(
          'The Data Cache lives in the browser and the Router Cache lives on the server',
          'Data Cache живёт в браузере, а Router Cache — на сервере'
        ),
        L(
          'All three caches are the same store and are cleared together',
          'Все три кэша — одно хранилище и очищаются вместе'
        ),
        L(
          'The Router Cache lives in the browser and holds the RSC payload, the Data Cache lives on the server and holds fetch results',
          'Router Cache живёт в браузере и хранит RSC payload, а Data Cache живёт на сервере и хранит результаты fetch'
        ),
        L(
          'The Full Route Cache holds the database rows, the Data Cache holds the HTML',
          'Full Route Cache хранит строки базы, а Data Cache — HTML'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'The Router Cache is a client side store of rendered React Server Component payloads, which makes navigation instant. The Data Cache is a server side store of fetch responses that survives across requests, and the Full Route Cache holds the rendered HTML and RSC payload of a static route. They are separate stores with separate invalidation rules.',
        'Router Cache — клиентское хранилище отрендеренных payload-ов React Server Components, благодаря чему навигация мгновенна. Data Cache — серверное хранилище ответов fetch, живущее между запросами, а Full Route Cache хранит готовый HTML и RSC payload статического маршрута. Это разные хранилища с разными правилами сброса.'
      ),
    },
    {
      id: 'next-q50',
      question: L(
        'What does generateStaticParams do?',
        'Что делает generateStaticParams?'
      ),
      options: [
        L(
          'It runs on every request and computes the possible values of the segment',
          'Выполняется на каждый запрос и вычисляет возможные значения сегмента'
        ),
        L(
          'It runs at build time and returns the values of the dynamic segments that must be pre-rendered',
          'Выполняется при сборке и возвращает значения динамических сегментов, которые нужно отрендерить заранее'
        ),
        L(
          'It returns the query parameters that the page accepts',
          'Возвращает query-параметры, которые принимает страница'
        ),
        L(
          'It generates the static assets of the page, such as images and fonts',
          'Генерирует статические ассеты страницы, например картинки и шрифты'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'generateStaticParams lists the concrete values of a dynamic segment so that Next.js can render those pages as static HTML at build time. The remaining values are rendered on demand and cached, unless the segment is fully dynamic. It has nothing to do with query parameters or with assets.',
        'generateStaticParams перечисляет конкретные значения динамического сегмента, чтобы Next.js отрендерил эти страницы как статический HTML при сборке. Остальные значения рендерятся по требованию и кэшируются, если только сегмент не полностью динамический. К query-параметрам и ассетам она отношения не имеет.'
      ),
    },
    {
      id: 'next-q51',
      question: L(
        'How does Incremental Static Regeneration work?',
        'Как работает Incremental Static Regeneration?'
      ),
      options: [
        L(
          'The cached page is served immediately and regenerated in the background when the revalidation window has passed',
          'Закэшированная страница отдаётся сразу, а в фоне пересобирается, когда истекло окно ревалидации'
        ),
        L(
          'The page is rebuilt from scratch on every request, so nothing is ever cached',
          'Страница пересобирается с нуля на каждый запрос, то есть ничего не кэшируется'
        ),
        L(
          'The build process runs again on every deployment to refresh the pages',
          'Сборка запускается заново при каждом деплое, чтобы обновить страницы'
        ),
        L(
          'The browser waits for the fresh page before it shows the cached one',
          'Браузер ждёт свежую страницу и только потом показывает кэшированную'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'ISR combines the speed of static output with fresh data: users get the cached version at once, and the regeneration happens in the background so the next visitor sees the new version. It is not a full rebuild per request, and the cache does not live in the browser. This is the stale-while-revalidate pattern.',
        'ISR соединяет скорость статики со свежими данными: пользователь сразу получает кэшированную версию, а пересборка идёт в фоне, и следующий посетитель видит новое. Это не пересборка на каждый запрос, и кэш живёт не в браузере. Это и есть паттерн stale-while-revalidate.'
      ),
    },
    {
      id: 'next-q52',
      question: L(
        'Which of these makes a route render dynamically instead of statically?',
        'Что из перечисленного заставляет маршрут рендериться динамически, а не статически?'
      ),
      options: [
        L(
          'Importing the Metadata type from next',
          'Импорт типа Metadata из next'
        ),
        L(
          'Adding a generateMetadata function',
          'Добавление функции generateMetadata'
        ),
        L(
          'Using a template.tsx instead of a layout.tsx',
          'Использование template.tsx вместо layout.tsx'
        ),
        L(
          'Reading cookies() or headers() in the component',
          'Чтение cookies() или headers() в компоненте'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'The dynamic APIs are the signal: cookies, headers and searchParams depend on the request, so the result cannot be known at build time and the route is rendered per request. Metadata functions and templates do not change the rendering mode. A route can also be forced with dynamic = "force-dynamic".',
        'Сигналом служат динамические API: cookies, headers и searchParams зависят от запроса, поэтому результат нельзя вычислить при сборке, и маршрут рендерится на каждый запрос. Функции метаданных и templates режим рендеринга не меняют. Принудительно маршрут делается динамическим через dynamic = "force-dynamic".'
      ),
    },
    {
      id: 'next-q53',
      question: L(
        'In Next.js 15, how do you read a cookie in a Server Component?',
        'В Next.js 15 как прочитать cookie в Server Component?'
      ),
      options: [
        L(
          'const token = cookies().get("token")',
          'const token = cookies().get("token")'
        ),
        L(
          'const cookieStore = await cookies(); const token = cookieStore.get("token")',
          'const cookieStore = await cookies(); const token = cookieStore.get("token")'
        ),
        L(
          'const token = request.cookies.get("token")',
          'const token = request.cookies.get("token")'
        ),
        L(
          'const token = document.cookie.split(";")[0]',
          'const token = document.cookie.split(";")[0]'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'In Next.js 15 cookies() is asynchronous, so it returns a Promise and has to be awaited, and the same applies to headers(), params and searchParams. Cookies are read-only there, and changes are made in a Server Action or a Route Handler. document.cookie is the browser side counterpart and is not available on the server.',
        'В Next.js 15 cookies() асинхронная: возвращает Promise, который нужно дождаться, и то же касается headers(), params и searchParams. Cookies там только для чтения, а меняют их в Server Action или Route Handler. document.cookie — браузерный аналог, на сервере его нет.'
      ),
    },
    {
      id: 'next-q54',
      question: L(
        'A Client Component calls useSearchParams in a statically rendered page. What is the problem?',
        'Client Component вызывает useSearchParams на статически отрендеренной странице. В чём проблема?'
      ),
      options: [
        L(
          'The page must be wrapped in a Suspense boundary, otherwise the whole route becomes dynamic',
          'Страницу надо обернуть в границу Suspense, иначе весь маршрут станет динамическим'
        ),
        L(
          'useSearchParams cannot be used in Client Components at all',
          'useSearchParams вообще нельзя использовать в Client Components'
        ),
        L(
          'The query string is available only in Route Handlers',
          'Строка запроса доступна только в Route Handlers'
        ),
        L(
          'The value is always undefined on the first render and never updates',
          'Значение всегда undefined при первом рендере и никогда не обновляется'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'useSearchParams opts the route out of static rendering, so Next.js asks for a Suspense boundary around the part that reads it, and the rest of the page can stay static. The hook works in Client Components, but it needs the boundary when the route is otherwise static. The alternative is to read the searchParams prop on the server.',
        'useSearchParams выводит маршрут из статического рендеринга, поэтому Next.js просит обернуть в Suspense часть, которая его читает, а остальная страница может остаться статической. В Client Components хук работает, но на статическом маршруте нужна граница. Альтернатива — читать проп searchParams на сервере.'
      ),
    },
    {
      id: 'next-q55',
      question: L(
        'What does permanentRedirect("/new-page") send to the browser?',
        'Что отправляет браузеру permanentRedirect("/new-page")?'
      ),
      options: [
        L(
          'A 307 temporary redirect that keeps the original HTTP method',
          'Временный редирект 307, сохраняющий исходный HTTP-метод'
        ),
        L(
          'A 404 response that renders the not-found page',
          'Ответ 404, который рисует страницу not-found'
        ),
        L(
          'A client side navigation performed by the router',
          'Клиентскую навигацию, которую выполняет роутер'
        ),
        L(
          'A 308 permanent redirect, so search engines can replace the old URL in their index',
          'Постоянный редирект 308, чтобы поисковики заменили старый URL в индексе'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'permanentRedirect throws the same kind of signal as redirect but with the status 308, which tells search engines that the move is permanent and the old address should be replaced in the index. redirect uses 307 and keeps the method, a 404 belongs to notFound, and a router navigation happens in the browser, which a server function cannot trigger.',
        'permanentRedirect бросает такой же сигнал, как redirect, но со статусом 308: поисковики понимают, что перенос постоянный, и должны заменить старый адрес в индексе. redirect использует 307 и сохраняет метод, 404 — это notFound, а навигация роутера происходит в браузере, и серверная функция её запустить не может.'
      ),
    },
    {
      id: 'next-q56',
      question: L(
        'How does Next.js produce the title and description of a page whose content depends on its params?',
        'Как Next.js формирует заголовок и описание страницы, содержимое которой зависит от params?'
      ),
      options: [
        L(
          'Export an async generateMetadata function that reads params and returns the title and description',
          'Экспортировать async-функцию generateMetadata, которая читает params и возвращает заголовок с описанием'
        ),
        L(
          'Add a useEffect in the page that sets document.title after the data has loaded',
          'Добавить в страницу useEffect, который ставит document.title после загрузки данных'
        ),
        L(
          'Export a static metadata object whose template reads the params of the page',
          'Экспортировать статический объект metadata, шаблон которого читает params страницы'
        ),
        L(
          'Add a title tag inside the JSX of the page component',
          'Добавить тег title прямо в JSX компонента страницы'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'Metadata is rendered on the server into the head of the document, so crawlers and social networks see it without running any JavaScript. generateMetadata runs during the render of the route and its result is awaited, which is exactly why the title can depend on params. A static metadata export covers the pages whose data is known in advance, a useEffect would set the title only after the page was painted, and a title tag inside the body is not the document title.',
        'Метаданные рендерятся на сервере в head документа, поэтому краулеры и социальные сети видят их без запуска JavaScript. generateMetadata выполняется во время рендера маршрута, и её результат дожидаются — именно поэтому заголовок может зависеть от params. Статический экспорт metadata покрывает страницы с заранее известными данными, useEffect поставил бы заголовок только после отрисовки, а тег title внутри body — это не заголовок документа.'
      ),
    },
    {
      id: 'next-q57',
      question: L(
        'What does next/image give you compared with a plain img tag?',
        'Что даёт next/image по сравнению с обычным тегом img?'
      ),
      options: [
        L(
          'It removes the need for an alt attribute',
          'Отменяет необходимость в атрибуте alt'
        ),
        L(
          'It loads every image in its original full size to keep the quality',
          'Загружает каждую картинку в полном исходном размере ради качества'
        ),
        L(
          'It works only with images that are stored in the public folder',
          'Работает только с картинками из каталога public'
        ),
        L(
          'It optimizes the image automatically, but it needs the dimensions and a configured remote host',
          'Автоматически оптимизирует картинку, но требует размеров и настроенного удалённого хоста'
        ),
      ],
      correctIndex: 3,
      explanation: L(
        'next/image serves modern formats in the right size for the device and blocks the layout shift, but it needs width and height or fill, and images from another host have to be allowed in images.remotePatterns. The alt attribute is still your responsibility, and the component works with remote images as well as with local ones.',
        'next/image отдаёт современные форматы в размере, подходящем устройству, и не даёт странице прыгать, но ему нужны width и height или fill, а для картинок с другого хоста требуется запись в images.remotePatterns. Атрибут alt всё равно ваша забота, а компонент работает и с удалёнными картинками.'
      ),
    },
    {
      id: 'next-q58',
      question: L(
        'Where does middleware.ts run in a Next.js application?',
        'Где выполняется middleware.ts в приложении Next.js?'
      ),
      options: [
        L(
          'In the browser, before the page is hydrated',
          'В браузере, до гидрации страницы'
        ),
        L(
          'On the Edge runtime, before the request reaches the router and the route handler',
          'На Edge runtime, до того как запрос дойдёт до роутера и route handler'
        ),
        L(
          'Inside every Server Component, before it renders',
          'Внутри каждого Server Component, до его рендера'
        ),
        L(
          'After the route handler returned, as a post-processing step',
          'После того как route handler отработал, как шаг постобработки'
        ),
      ],
      correctIndex: 1,
      explanation: L(
        'Middleware is the outermost layer of the request: it runs before the router decides which route to handle, which makes it the right place for redirects, rewrites and coarse auth checks. It runs on the Edge runtime, so it must stay cheap and avoid Node only APIs. It is not part of the render path of the components.',
        'Middleware — самый внешний слой обработки запроса: он работает до того, как роутер выберет маршрут, поэтому именно сюда кладут редиректы, рерайты и грубые проверки прав. Выполняется он на Edge runtime, так что должен быть дешёвым и без Node-only API. В путь рендеринга компонентов он не входит.'
      ),
    },
    {
      id: 'next-q59',
      question: L(
        'A middleware protects /admin and sends unauthenticated users to /login. How is it written?',
        'Middleware защищает /admin и отправляет неавторизованных на /login. Как он написан?'
      ),
      options: [
        L(
          'It throws a NextResponse.redirect inside a try/catch block',
          'Он бросает NextResponse.redirect внутри блока try/catch'
        ),
        L(
          'It returns a Response with the status 401 and the text of the login page',
          'Он возвращает Response со статусом 401 и текстом страницы входа'
        ),
        L(
          'It checks the request and returns NextResponse.redirect for the blocked paths, and NextResponse.next() otherwise',
          'Он проверяет запрос и возвращает NextResponse.redirect для заблокированных путей, а иначе NextResponse.next()'
        ),
        L(
          'It calls the notFound function from next/navigation',
          'Он вызывает функцию notFound из next/navigation'
        ),
      ],
      correctIndex: 2,
      explanation: L(
        'The two responses of the middleware protocol are NextResponse.redirect and NextResponse.next, and the matcher limits the paths it applies to. A 401 with HTML in the body is not a redirect, and notFound renders a 404 page. The real access control still belongs on the data server, not only in the middleware.',
        'Два ответа в протоколе middleware — это NextResponse.redirect и NextResponse.next, а matcher ограничивает список путей. 401 с HTML в теле — это не редирект, а notFound рисует страницу 404. Настоящий контроль доступа всё равно остаётся на сервере данных, а не только в middleware.'
      ),
    },
    {
      id: 'next-q60',
      question: L(
        'How does streaming with Suspense change what the user sees?',
        'Как стриминг через Suspense меняет то, что видит пользователь?'
      ),
      options: [
        L(
          'The server sends the shell of the page first and then the content of each Suspense boundary as it resolves',
          'Сервер сначала отправляет оболочку страницы, а затем содержимое каждой границы Suspense по мере готовности'
        ),
        L(
          'The server waits for every async component to finish and then sends the whole page at once',
          'Сервер ждёт завершения всех async-компонентов и отправляет страницу целиком за один раз'
        ),
        L(
          'The browser downloads the page in parts and renders them after the JavaScript has loaded',
          'Браузер скачивает страницу частями и рендерит их после загрузки JavaScript'
        ),
        L(
          'The page is rendered twice, once on the server and once on the client, in two steps',
          'Страница рендерится дважды: один раз на сервере, второй раз на клиенте, в два шага'
        ),
      ],
      correctIndex: 0,
      explanation: L(
        'With a Suspense boundary around every slow part, the server sends the shell with the fallbacks immediately and streams the finished sections into the same HTML stream, so the fastest section appears first. Without a boundary the page waits for the slowest request. The shell and the fallback should look alike, otherwise the layout jumps when the content replaces the placeholder.',
        'С границей Suspense вокруг каждой медленной части сервер сразу отправляет оболочку с fallback-ами и досылает готовые секции в тот же поток HTML, поэтому самая быстрая секция появляется первой. Без границы страница ждёт самый медленный запрос. Оболочка и fallback должны выглядеть одинаково, иначе при замене заглушки контентом страница дёрнется.'
      ),
    },
  ],
};
