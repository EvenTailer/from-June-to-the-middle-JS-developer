import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const nextjsChapterTasks: PracticeTask[] = [
  {
    id: 'ch-next-ch1-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch1',
    level: 'basic',
    title: L('Route group with a catch-all segment', 'Группа маршрутов с catch-all сегментом'),
    brief: L(
      'Build two segments of a site: a marketing group whose layout wraps /about and /pricing without adding a URL segment, and a catch-all docs segment at /docs/[...path] that reads the first path segment. Name the URL that each page answers on.',
      'Соберите два сегмента сайта: группа marketing, чья компоновка оборачивает /about и /pricing, не добавляя сегмент в URL, и catch-all сегмент docs по адресу /docs/[...path], который читает первый элемент пути. Назовите URL, на который отвечает каждая страница.'
    ),
    hint: L(
      'Parentheses in a folder name only organise the tree. The name inside square brackets is the parameter, and three dots turn it into an array with the rest of the path.',
      'Скобки в имени папки только организуют дерево. Имя в квадратных скобках — это параметр, а три точки превращают его в массив с остатком пути.'
    ),
    solution: `// file: app/(marketing)/layout.tsx
// no URL segment is added
import type { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className="marketing">{children}</div>;
}

// file: app/(marketing)/about/page.tsx
// answers on /about
export default function AboutPage() {
  return <h1>About us</h1>;
}

// file: app/docs/[...path]/page.tsx
// answers on /docs/any/deep/path
type Props = { params: Promise<{ path: string[] }> };

export default async function DocsPage({ params }: Props) {
  const { path } = await params;
  return <article>Section: {path[0]}</article>;
}`,
    explanation: L(
      'A route group changes the layout of a subtree without touching the URL space, so /about stays /about. The catch-all segment collects every remaining segment into an array, and the params promise has to be awaited before that array can be read.',
      'Группа маршрутов меняет компоновку поддерева, не трогая пространство URL, поэтому /about остаётся /about. Catch-all сегмент собирает все оставшиеся сегменты в массив, а промис params нужно дождаться, прежде чем читать этот массив.'
    ),
  },
  {
    id: 'ch-next-ch2-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch2',
    level: 'basic',
    title: L('Server page with a client leaf', 'Серверная страница, клиентский лист'),
    brief: L(
      'The product page reads the database on the server and shows an interactive quantity picker. Keep the page a server component, move the picker into its own client file and pass only plain data across the boundary.',
      'Страница товара читает базу на сервере и показывает интерактивный выбор количества. Оставьте страницу серверным компонентом, вынесите выбор в отдельный клиентский файл и передавайте через границу только простые данные.'
    ),
    hint: L(
      'Only the file that carries the directive is a client component. Props crossing the boundary must be plain data, so a number is fine and a function is not.',
      'Клиентским становится только файл с директивой. Пропы через границу должны быть простыми данными: число подходит, а функция — нет.'
    ),
    solution: `// file: app/products/[id]/page.tsx
// stays a server component
import { db } from '@/lib/db';
import { QuantityPicker } from './QuantityPicker';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });
  return (
    <article>
      <h1>{product?.name}</h1>
      <QuantityPicker max={product?.stock ?? 0} />
    </article>
  );
}

// file: app/products/[id]/QuantityPicker.tsx
// the only client file
'use client';
import { useState } from 'react';

export function QuantityPicker({ max }: { max: number }) {
  const [count, setCount] = useState(1);
  return <button onClick={() => setCount((c) => Math.min(c + 1, max))}>Add {count}</button>;
}`,
    explanation: L(
      'The page keeps its data access on the server and ships no JavaScript of its own. The directive sits on the smallest interactive file, and the only value that crosses the boundary is a number, which serialises without trouble.',
      'Страница оставляет доступ к данным на сервере и сама не отправляет ни байта JavaScript. Директива стоит на самом маленьком интерактивном файле, а через границу проходит только число, которое сериализуется без проблем.'
    ),
  },
  {
    id: 'ch-next-ch3-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch3',
    level: 'basic',
    title: L('Memoised fetch with a tagged cache entry', 'Мемоизированный fetch с меткой кэша'),
    brief: L(
      'Two pages need the same list of posts. Fetch it once per render pass with the request memoisation cache, opt the response into the Data Cache with a sixty second lifetime and the tag "posts", and invalidate that tag from a server action right after a write.',
      'Двум страницам нужен один и тот же список статей. Заберите его один раз за проход рендера через кэш мемоизации запросов, включите ответ в Data Cache со временем жизни шестьдесят секунд и меткой posts, затем сбросьте эту метку из server action сразу после записи.'
    ),
    hint: L(
      'The cache function from react wraps the fetch call. Cache options go into the next property of the fetch options, and the tag string has to be identical where the data is produced and where it is invalidated.',
      'Функция cache из react оборачивает вызов fetch. Параметры кэша живут в свойстве next у опций fetch, и строка метки должна совпадать там, где данные создаются, и там, где метка сбрасывается.'
    ),
    solution: `// app/lib/posts.ts
import { cache } from 'react';

export const getPosts = cache(async () => {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['posts'] },
  });
  return res.json();
});

// app/posts/actions.ts
'use server';
import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';

export async function publishPost(id: string) {
  await db.post.update({ where: { id }, data: { status: 'published' } });
  revalidateTag('posts');
}`,
    explanation: L(
      'Memoisation removes the duplicate call inside one render, while force-cache keeps the response in the Data Cache between requests. The tag is written where the data is produced and read where it is invalidated, and the two strings must match exactly.',
      'Мемоизация убирает повторный вызов внутри одного рендера, а force-cache хранит ответ в Data Cache между запросами. Метка пишется там, где данные создаются, и читается там, где сбрасывается, и обе строки должны совпадать точно.'
    ),
  },
  {
    id: 'ch-next-ch4-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch4',
    level: 'intermediate',
    title: L('Authorised server action with a form state', 'Авторизованное server action с состоянием формы'),
    brief: L(
      'Write a server action that marks an item as done. It must read the session, refuse an anonymous caller, check that the item belongs to that user and return the error as state instead of throwing. Bind it to a form with useActionState, so the form shows the error and disables the button while the request is running.',
      'Напишите server action, который отмечает задачу выполненной. Он должен читать сессию, отклонять анонимного посетителя, проверять, что задача принадлежит этому пользователю, и возвращать ошибку как состояние, а не бросать исключение. Свяжите его с формой через useActionState, чтобы форма показывала ошибку и отключала кнопку, пока идёт запрос.'
    ),
    hint: L(
      'The item id travels in a hidden field, the session decides who the caller is, and the record decides what the caller may touch. The hook that binds the action to the form changes the signature of the action and reports whether the request is still running.',
      'id задачи едет в скрытом поле, сессия определяет, кто звонит, а запись определяет, что ему можно менять. Хук, который связывает действие с формой, меняет сигнатуру действия и сообщает, идёт ли ещё запрос.'
    ),
    solution: `// file: app/items/actions.ts
'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export type CompleteState = { error?: string; done?: boolean };

// The action returns the state instead of throwing, so the form can show it
export async function completeItem(prev: CompleteState, formData: FormData): Promise<CompleteState> {
  const session = await auth();
  if (!session?.user) return { error: 'Unauthorized' };
  const item = await db.item.findFirst({ where: { id: String(formData.get('itemId')), ownerId: session.user.id } });
  if (!item) return { error: 'Not found' };
  await db.item.update({ where: { id: item.id }, data: { completed: true } });
  return { done: true };
}

// file: app/items/complete-form.tsx
// the only client file
'use client';
import { useActionState } from 'react';
import { completeItem, type CompleteState } from './actions';

export function CompleteForm({ itemId }: { itemId: string }) {
  const [state, formAction, pending] = useActionState<CompleteState, FormData>(completeItem, {});
  return (
    <form action={formAction}>
      <input type="hidden" name="itemId" value={itemId} />
      <button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Mark as done'}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`,
    explanation: L(
      'Every action is a public endpoint, so it authenticates from the session and authorises by ownership instead of trusting the form data. A validation problem is an expected answer, so the action returns it as state and the form renders it next to the field, while a genuine failure is still thrown.',
      'Каждое действие — публичный эндпоинт, поэтому оно аутентифицирует по сессии и авторизует по владению, а не доверяет данным формы. Ошибка проверки — ожидаемый ответ, поэтому действие возвращает её как состояние, а форма рисует её рядом с полем, а настоящий сбой по-прежнему бросается.'
    ),
  },
  {
    id: 'ch-next-ch5-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch5',
    level: 'intermediate',
    title: L('Rewrite, redirect and request header at the edge', 'Переписывание, редирект и заголовок на краю'),
    brief: L(
      'The site serves /de/pricing from the same page as /pricing, /old-pricing must send the visitor to /pricing, and every request that passes the interception layer must carry an x-tenant header into the route. Implement all three in the interception layer and keep the matcher narrow: only the paths listed in it are intercepted.',
      'Сайт отдаёт /de/pricing той же страницей, что и /pricing, /old-pricing должен отправлять посетителя на /pricing, а каждый запрос, прошедший слой перехвата, должен нести в маршрут заголовок x-tenant. Реализуйте все три в слое перехвата и держите матчер узким: перехватываются только перечисленные в нём пути.'
    ),
    hint: L(
      'A rewrite keeps the address bar, a redirect changes it, and a request header travels with NextResponse.next({ request: { headers } }). The matcher decides which requests the layer sees at all.',
      'Переписывание сохраняет адресную строку, редирект меняет её, а заголовок запроса едет вместе с NextResponse.next({ request: { headers } }). Матчер решает, какие запросы вообще видит слой.'
    ),
    solution: `// proxy.ts - the file was called middleware.ts before Next.js 16
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
}

export const config = { matcher: ['/pricing/:path*', '/old-pricing', '/de/:path*'] };`,
    explanation: L(
      'The interception layer sees the request before the application does, so it can answer with a different route or with a redirect. The matcher lists only the paths that need the behaviour, which keeps the cost of the layer off every other request.',
      'Слой перехвата видит запрос раньше приложения, поэтому он может отдать другой маршрут или редирект. Матчер перечисляет только те пути, где поведение нужно, и потому не нагружает каждый прочий запрос.'
    ),
  },
  {
    id: 'ch-next-ch6-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch6',
    level: 'intermediate',
    title: L('Cached shell with a live region', 'Кэшированная оболочка и живая часть'),
    brief: L(
      'The catalog page has a slow stock widget that depends on the visitor cookie. Keep the product list inside the prerendered shell with a cached data function, put the widget behind its own Suspense boundary and give the cached function a lifetime and a tag.',
      'На странице каталога есть медленный виджет остатков, который зависит от cookie посетителя. Оставьте список товаров внутри пререндеренной оболочки через кэшированную функцию данных, вынесите виджет за отдельную границу Suspense и задайте кэшированной функции время жизни и метку.'
    ),
    hint: L(
      'The "use cache" directive turns one function into a cached unit, cacheLife and cacheTag describe that unit, and cacheComponents has to be enabled in next.config.ts. A cached unit is a function that returns data, not a component that returns markup.',
      'Директива "use cache" превращает одну функцию в кэшированную единицу, cacheLife и cacheTag описывают эту единицу, а cacheComponents надо включить в next.config.ts. Кэшированная единица — это функция, которая возвращает данные, а не компонент с разметкой.'
    ),
    solution: `// file: app/catalog/products.ts
// the cached data function of the shell
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '@/lib/db';

export async function getProducts(): Promise<{ id: string; name: string }[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('catalog');
  return db.product.findMany();
}

// file: app/catalog/catalog.tsx
// the cached part of the shell
import { getProducts } from './products';

export async function CatalogList() {
  const products = await getProducts();
  return <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
}

// file: app/catalog/live-stock.tsx
// the live part, it reads the request
import { cookies } from 'next/headers';

export async function LiveStock() {
  const visitor = (await cookies()).get('visitor');
  return <p>Stock for {visitor?.value ?? 'guest'}</p>;
}

// file: app/catalog/page.tsx
import { Suspense } from 'react';
import { CatalogList } from './catalog';
import { LiveStock } from './live-stock';

export default function CatalogPage() {
  return (
    <>
      <CatalogList />
      <Suspense fallback={<p>Loading stock...</p>}><LiveStock /></Suspense>
    </>
  );
}

// file: next.config.ts
const nextConfig = {
  // the cached parts of the shell need the flag
  cacheComponents: true,
};

export default nextConfig;`,
    explanation: L(
      'Partial prerendering splits the page into a shell that is built ahead of time and a hole that is filled per request. The cached list stays in the shell, and the widget that reads request data resolves behind its own boundary without delaying the rest.',
      'Частичный пререндеринг делит страницу на оболочку, которую собирают заранее, и дыру, которую заполняют на каждый запрос. Кэшированный список остаётся в оболочке, а виджет с данными запроса дорисовывается за своей границей и не задерживает остальное.'
    ),
  },
  {
    id: 'ch-next-ch7-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch7',
    level: 'intermediate',
    title: L('Metadata template, dynamic title and product image', 'Шаблон метаданных, динамический заголовок и картинка'),
    brief: L(
      'The shop needs one title template for all pages, a product title that comes from the database and a product photo from a remote host. Set the base address and the template in the root layout, build the product title with generateMetadata, render the photo with next/image and list the remote host in images.remotePatterns.',
      'Магазину нужен общий шаблон заголовка для всех страниц, заголовок товара из базы и фотография товара с удалённого хоста. Задайте базовый адрес и шаблон в корневой компоновке, соберите заголовок товара через generateMetadata, отрисуйте фотографию через next/image и укажите удалённый хост в images.remotePatterns.'
    ),
    hint: L(
      'metadataBase resolves every relative address in the metadata, title.template applies to children, and a remote host must be listed in images.remotePatterns.',
      'metadataBase разрешает все относительные адреса в метаданных, title.template применяется к дочерним страницам, а удалённый хост нужно указать в images.remotePatterns.'
    ),
    solution: `// file: app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://shop.example.com'),
  title: { default: 'Shop', template: '%s | Shop' },
};

// file: next.config.ts
const nextConfig = {
  images: {
    // the remote host of the product photo has to be listed
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },
};

export default nextConfig;

// file: app/lib/products.ts
import { db } from '@/lib/db';

export async function getProduct(slug: string) {
  return db.product.findUnique({ where: { slug } });
}

// file: app/products/[slug]/page.tsx
import Image from 'next/image';
import { getProduct } from '../../lib/products';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name, description: product?.summary };
}

export default function ProductPage() {
  return (
    <Image src="https://cdn.example.com/shoes.png" alt="Running shoe" width={640} height={640} priority />
  );
}`,
    explanation: L(
      'The root layout owns the title template and the base address, so every route inherits them without repeating the setup. generateMetadata produces the same object shape for the values that depend on data, and next/image reserves the space and serves a resized variant, but only for the host listed in images.remotePatterns.',
      'Корневая компоновка владеет шаблоном заголовка и базовым адресом, поэтому каждый маршрут наследует их без повторов. generateMetadata даёт ту же форму объекта для значений, зависящих от данных, а next/image резервирует место и отдаёт уменьшенный вариант, но только для хоста, перечисленного в images.remotePatterns.'
    ),
  },
  {
    id: 'ch-next-ch8-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch8',
    level: 'advanced',
    title: L('Server-only secret and a shared cache header', 'Серверный секрет и заголовок общего кэша'),
    brief: L(
      'The app connects to a database with a password and publishes the site address to the browser. Keep the connection in a server-only module, expose only the public value, and answer the catalog API with a Cache-Control header that lets a shared cache keep the answer for a minute and refresh it in the background.',
      'Приложение подключается к базе по паролю и публикует адрес сайта в браузер. Держите подключение в серверном модуле, отдавайте наружу только публичное значение и отвечайте на API каталога заголовком Cache-Control, который разрешает общему кэшу хранить ответ минуту и обновлять его в фоне.'
    ),
    hint: L(
      'The server-only package turns an accidental client import into a build error, the NEXT_PUBLIC_ prefix inlines a value into the client bundle, and s-maxage with stale-while-revalidate belong in the header of the response.',
      'Пакет server-only превращает случайный клиентский импорт в ошибку сборки, префикс NEXT_PUBLIC_ встраивает значение в клиентский бандл, а s-maxage вместе со stale-while-revalidate живут в заголовке ответа.'
    ),
    solution: `// lib/db.ts - server only
import 'server-only';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const query = (text: string, values: unknown[]) => pool.query(text, values);

// app/site-config.ts - a public value, inlined at build time
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// app/api/catalog/route.ts
import { db } from '@/lib/db';

export async function GET() {
  const items = await db.item.findMany();

  return Response.json(items, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}`,
    explanation: L(
      'A module marked server-only fails the build if a client component imports it, so the database password cannot leak into the bundle. The public variable is inlined at build time, and the header tells a shared cache how long it may serve the answer and when to refresh it.',
      'Модуль с server-only роняет сборку, если его импортирует клиентский компонент, поэтому пароль базы не попадёт в бандл. Публичная переменная встраивается во время сборки, а заголовок говорит общему кэшу, сколько хранить ответ и когда обновлять.'
    ),
  },
  {
    id: 'ch-next-ch9-1',
    moduleId: 'nextjs',
    topic: 'next',
    chapterId: 'next-ch9',
    level: 'advanced',
    title: L('Server data access without N+1 and a validated route', 'Доступ к данным без N+1 и валидируемый маршрут'),
    brief: L(
      'The orders page must show every order with its customer without running one query per row, and the order API must reject an invalid status. Hold a single pooled client per instance and answer a bad body with status 400.',
      'Страница заказов должна показывать каждый заказ с его клиентом, не делая по запросу на строку, а API заказов должен отклонять неверный статус. Держите один пул на инстанс и отвечайте на некорректное тело статусом 400.'
    ),
    hint: L(
      'The global cache pattern keeps one client across hot reloads, a relation include fetches the customer in the same query, and the body has to be parsed before the database is touched.',
      'Паттерн с global сохраняет один клиент между перезагрузками, include отношения подтягивает клиента тем же запросом, а тело нужно разобрать до обращения к базе.'
    ),
    solution: `// lib/db.ts - one pooled client per instance
import 'server-only';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// app/orders/page.tsx - one query, not one query per row
export default async function OrdersPage() {
  const orders = await db.order.findMany({ include: { customer: true } });
  return <ul>{orders.map((o) => <li key={o.id}>{o.customer.name}</li>)}</ul>;
}

// app/api/orders/[id]/route.ts
import { schema } from '@/lib/schema';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: 'invalid body' }, { status: 400 });
  const order = await db.order.update({ where: { id }, data: parsed.data });
  return Response.json(order);
}`,
    explanation: L(
      'A relation include loads the customer in the same query, so the page cost does not grow with the number of rows. The handler validates the body before it writes and returns 400 for a malformed request, which keeps the API honest for every client.',
      'Include отношения подтягивает клиента тем же запросом, поэтому цена страницы не растёт вместе с числом строк. Обработчик проверяет тело до записи и отвечает 400 на некорректный запрос, и API остаётся честным для любого клиента.'
    ),
  },
];
