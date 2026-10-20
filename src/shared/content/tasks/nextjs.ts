import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextjsTasks: PracticeTask[] = [
  {
    id: 'next-task-4',
    topic: 'next',
    level: 'basic',
    title: L('Nested layout with metadata', 'Вложенный layout с метаданными'),
    brief: L(
      'Create a dashboard section with its own layout: shared navigation, a metadata title template and child pages that only set a short title.',
      'Создайте раздел dashboard с собственным layout: общая навигация, шаблон заголовка в metadata и дочерние страницы, которые задают только короткий заголовок.'
    ),
    hint: L(
      'Export metadata from layout.tsx with a title.template, and export a plain title object from each page.',
      'Экспортируйте metadata из layout.tsx с title.template, а из каждой страницы — простой объект title.'
    ),
    solution: `// app/dashboard/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
  description: 'Account overview and settings',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard">
      <nav>
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/page.tsx
export const metadata = { title: 'Overview' };

export default function OverviewPage() {
  return <h1>Overview</h1>;
}

// app/dashboard/settings/page.tsx
export const metadata = { title: 'Settings' };

export default function SettingsPage() {
  return <h1>Settings</h1>;
}`,
    explanation: L(
      'A layout wraps every page in its segment and stays mounted during navigation, so the nav does not re-render. The title template in the layout is applied to child page titles, which keeps metadata consistent.',
      'Layout оборачивает все страницы своего сегмента и остаётся смонтированным при переходах, поэтому навигация не перерисовывается. Шаблон заголовка из layout применяется к заголовкам дочерних страниц, что делает метаданные единообразными.'
    ),
  },
  {
    id: 'next-task-5',
    topic: 'next',
    level: 'basic',
    title: L('Loading and error UI for a segment', 'Loading и error UI для сегмента'),
    brief: L(
      'Add instant loading feedback and an error boundary to the /posts route. The boundary must let the user retry the failed render.',
      'Добавьте мгновенную индикацию загрузки и error boundary для маршрута /posts. Boundary должен позволять повторить неудачный рендер.'
    ),
    hint: L(
      'loading.tsx wraps the segment in Suspense automatically. error.tsx must start with the use client directive and receives reset.',
      'loading.tsx автоматически оборачивает сегмент в Suspense. error.tsx должен начинаться с директивы use client и получает reset.'
    ),
    solution: `// app/posts/loading.tsx
export default function Loading() {
  return <p>Loading posts...</p>;
}

// app/posts/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/posts/page.tsx
export default async function PostsPage() {
  const response = await fetch('https://api.example.com/posts', {
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Failed to load posts');

  const posts = await response.json();
  return <ul>{posts.map((post: { id: string; title: string }) => (
    <li key={post.id}>{post.title}</li>
  ))}</ul>;
}`,
    explanation: L(
      'loading.tsx is a Suspense fallback for the whole segment, so navigation feels instant. error.tsx catches render and data errors below it, and reset re-renders the segment. Errors thrown in the layout are not caught by a child error.tsx.',
      'loading.tsx — это Suspense-fallback для всего сегмента, поэтому переход ощущается мгновенным. error.tsx перехватывает ошибки рендера и данных ниже себя, а reset перерисовывает сегмент. Ошибки из layout не перехватываются дочерним error.tsx.'
    ),
  },
  {
    id: 'next-task-6',
    topic: 'next',
    level: 'basic',
    title: L('Server action form', 'Форма на server action'),
    brief: L(
      'Build a notes page whose form submits through a server action. The action reads FormData, ignores empty input and refreshes the rendered list.',
      'Сделайте страницу заметок, форма которой отправляется через server action. Action читает FormData, игнорирует пустой ввод и обновляет отрисованный список.'
    ),
    hint: L(
      'Pass the action directly to form action. Call revalidatePath after changing server data.',
      'Передайте action напрямую в form action. Вызывайте revalidatePath после изменения серверных данных.'
    ),
    solution: `// app/notes/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

const notes: string[] = [];

export async function createNote(formData: FormData) {
  const text = String(formData.get('text') ?? '').trim();
  if (!text) return;

  notes.push(text);
  revalidatePath('/notes');
}

export async function getNotes() {
  return notes;
}

// app/notes/page.tsx
import { createNote, getNotes } from './actions';

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <section>
      <form action={createNote}>
        <label htmlFor="text">Note</label>
        <input id="text" name="text" required />
        <button type="submit">Add note</button>
      </form>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </section>
  );
}`,
    explanation: L(
      'A server action marked with use server runs only on the server, so the mutation code never reaches the browser. revalidatePath invalidates the cached /notes segment so the list is rendered again with fresh data.',
      'Server action с директивой use server выполняется только на сервере, поэтому код изменения данных не попадает в браузер. revalidatePath инвалидирует кэш сегмента /notes, и список рендерится заново с новыми данными.'
    ),
  },
  {
    id: 'next-task-7',
    topic: 'next',
    level: 'intermediate',
    title: L('Dynamic route handler for one product', 'Динамический route handler для товара'),
    brief: L(
      'Add app/api/products/[id]/route.ts with GET, PATCH and DELETE. Return 404 for unknown ids and 204 after a successful delete.',
      'Добавьте app/api/products/[id]/route.ts с GET, PATCH и DELETE. Возвращайте 404 для неизвестного id и 204 после успешного удаления.'
    ),
    hint: L(
      'The second handler argument is an object with params, and params is a Promise in the current App Router.',
      'Второй аргумент обработчика — объект с params, причём params в актуальном App Router является Promise.'
    ),
    solution: `// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

type Product = { id: string; title: string; price: number };
type Context = { params: Promise<{ id: string }> };

const products = new Map<string, Product>();

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const product = products.get(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const product = products.get(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const patch = await request.json();
  const updated = { ...product, ...patch, id };
  products.set(id, updated);

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;

  if (!products.delete(id)) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}`,
    explanation: L(
      'A route handler file maps HTTP methods to exported functions. Awaited params gives the validated id from the URL, and returning a Response without a body is the correct way to send 204. In production the Map is replaced by a real database.',
      'Файл route handler сопоставляет HTTP-методы с экспортированными функциями. Await params даёт id из URL, а Response без тела — правильный способ отправить 204. В продакшене Map заменяется реальной базой данных.'
    ),
  },
  {
    id: 'next-task-8',
    topic: 'next',
    level: 'intermediate',
    title: L('Pre-render dynamic routes', 'Предрендер динамических маршрутов'),
    brief: L(
      'Pre-build every blog post at build time from the posts API and reject slugs that were not generated.',
      'Соберите все статьи блога на этапе сборки из API и отклоняйте slug, которых не было в списке.'
    ),
    hint: L(
      'Export generateStaticParams returning objects that match the dynamic segment. Set dynamicParams to false to block unknown slugs.',
      'Экспортируйте generateStaticParams, возвращающий объекты с динамическим сегментом. Установите dynamicParams в false, чтобы блокировать неизвестные slug.'
    ),
    solution: `// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };
type Post = { slug: string; title: string; body: string };

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch('https://api.example.com/posts');
  const posts: Post[] = await response.json();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const response = await fetch('https://api.example.com/posts/' + slug);
  if (!response.ok) notFound();

  const post: Post = await response.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
    explanation: L(
      'generateStaticParams runs during the build and returns one params object per page. With dynamicParams set to false, a request for any other slug returns 404 instead of rendering on demand. The same fetch URLs are reused, so the data can be cached between build steps.',
      'generateStaticParams выполняется во время сборки и возвращает по объекту params на страницу. При dynamicParams в false запрос любого другого slug возвращает 404 вместо рендера по требованию. Те же URL fetch используются повторно, поэтому данные могут кэшироваться между шагами сборки.'
    ),
  },
  {
    id: 'next-task-9',
    topic: 'next',
    level: 'intermediate',
    title: L('Revalidate after a mutation', 'Ревалидация после мутации'),
    brief: L(
      'Add a publish button to a post page. Publishing must refresh both the post page and the posts list without a full reload.',
      'Добавьте кнопку публикации на страницу статьи. Публикация должна обновлять и страницу статьи, и список статей без полной перезагрузки.'
    ),
    hint: L(
      'Call revalidatePath for both routes inside the server action, then submit the action from a client form.',
      'Вызовите revalidatePath для обоих маршрутов внутри server action, затем отправьте action из клиентской формы.'
    ),
    solution: `// app/posts/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function publishPost(id: string) {
  const response = await fetch(
    'https://api.example.com/posts/' + id + '/publish',
    { method: 'POST' }
  );

  if (!response.ok) throw new Error('Publish failed');

  revalidatePath('/posts');
  revalidatePath('/posts/' + id);
}

// app/posts/[id]/publish-button.tsx
'use client';

import { publishPost } from '../actions';

export function PublishButton({ id }: { id: string }) {
  return (
    <form action={() => publishPost(id)}>
      <button type="submit">Publish</button>
    </form>
  );
}`,
    explanation: L(
      'The action mutates server data and then invalidates the two affected paths. The next visit to either route renders fresh data instead of the cached copy. Calling only one path would leave the list stale.',
      'Action изменяет серверные данные, а затем инвалидирует два затронутых пути. Следующее посещение любого из маршрутов отрисует свежие данные вместо кэша. Вызов только одного пути оставил бы список устаревшим.'
    ),
  },
  {
    id: 'next-task-10',
    topic: 'security',
    level: 'intermediate',
    title: L('Middleware auth redirect', 'Редирект авторизации в middleware'),
    brief: L(
      'Protect /dashboard and /settings with middleware. Requests without a session cookie must be redirected to /login with the original path in the from query parameter.',
      'Защитите /dashboard и /settings через middleware. Запросы без cookie сессии должны перенаправляться на /login с исходным путём в параметре from.'
    ),
    hint: L(
      'Use request.cookies.get and NextResponse.redirect. Limit execution with the matcher config.',
      'Используйте request.cookies.get и NextResponse.redirect. Ограничьте выполнение через конфиг matcher.'
    ),
    solution: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`,
    explanation: L(
      'Middleware runs before the route is rendered, so unauthenticated users never reach protected server components. The matcher keeps it off public assets, and the from parameter lets the login page send the user back after signing in.',
      'Middleware выполняется до рендера маршрута, поэтому неавторизованные пользователи не доходят до защищённых серверных компонентов. Matcher исключает публичные ресурсы, а параметр from позволяет странице входа вернуть пользователя после авторизации.'
    ),
  },
  {
    id: 'next-task-11',
    topic: 'next',
    level: 'advanced',
    title: L('Optimized remote image', 'Оптимизированное удалённое изображение'),
    brief: L(
      'Render a remote product photo with next/image: explicit dimensions, a responsive sizes hint, priority for the hero image and an allowed remote host.',
      'Отрисуйте удалённое фото товара через next/image: явные размеры, подсказка sizes для адаптивности, priority для главного изображения и разрешённый удалённый хост.'
    ),
    hint: L(
      'Unknown remote hosts must be listed in images.remotePatterns in next.config.ts. width and height prevent layout shift.',
      'Неизвестные удалённые хосты нужно указать в images.remotePatterns в next.config.ts. width и height предотвращают сдвиг вёрстки.'
    ),
    solution: `// app/products/[id]/page.tsx
import Image from 'next/image';

const product = {
  title: 'Trail backpack',
  image: 'https://images.example.com/products/backpack.jpg',
  width: 1200,
  height: 900,
};

export default function ProductPage() {
  return (
    <article>
      <Image
        src={product.image}
        alt={product.title}
        width={product.width}
        height={product.height}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="product-image"
      />
      <h1>{product.title}</h1>
    </article>
  );
}

// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.example.com' },
    ],
  },
};

export default nextConfig;`,
    explanation: L(
      'next/image generates resized srcset variants and serves modern formats. sizes tells the browser which variant to download, while width and height reserve space. priority disables lazy loading for the element visible on first paint.',
      'next/image создаёт уменьшенные варианты srcset и отдаёт современные форматы. sizes подсказывает браузеру, какой вариант скачать, а width и height резервируют место. priority отключает ленивую загрузку для элемента, видимого при первом рендере.'
    ),
  },
  {
    id: 'next-task-12',
    topic: 'next',
    level: 'advanced',
    title: L('Stream a slow dashboard section', 'Стриминг медленного блока dashboard'),
    brief: L(
      'The dashboard has a fast header and a slow revenue widget. Stream the widget so the header appears immediately instead of waiting for the API.',
      'На dashboard есть быстрый заголовок и медленный виджет выручки. Стримьте виджет, чтобы заголовок появлялся сразу, не дожидаясь API.'
    ),
    hint: L(
      'Wrap the async server component in Suspense with a meaningful fallback. Do not await it in the parent.',
      'Оберните асинхронный серверный компонент в Suspense с осмысленным fallback. Не ждите его в родителе.'
    ),
    solution: `// app/dashboard/page.tsx
import { Suspense } from 'react';

async function Revenue() {
  const response = await fetch('https://api.example.com/revenue', {
    cache: 'no-store',
  });
  const data = await response.json();

  return <p>Revenue: {data.total}</p>;
}

export default function DashboardPage() {
  return (
    <section>
      <h1>Dashboard</h1>
      <p>Welcome back</p>

      <Suspense fallback={<p>Loading revenue...</p>}>
        <Revenue />
      </Suspense>
    </section>
  );
}`,
    explanation: L(
      'The static parts are sent in the first HTML chunk. Suspense streams the fallback immediately and replaces it when Revenue resolves, so one slow request does not block the whole page. A segment-level loading.tsx does the same for a whole route.',
      'Статичные части отправляются в первом HTML-чанке. Suspense сразу отправляет fallback и заменяет его, когда Revenue завершится, поэтому один медленный запрос не блокирует всю страницу. loading.tsx на уровне сегмента делает то же для всего маршрута.'
    ),
  },
  {
    id: 'next-task-13',
    topic: 'next',
    level: 'advanced',
    title: L('Read cookies and headers on the server', 'Чтение cookies и headers на сервере'),
    brief: L(
      'Render an account page using the theme cookie and the Accept-Language header. Add a server action that persists a new theme cookie.',
      'Отрисуйте страницу аккаунта, используя cookie темы и заголовок Accept-Language. Добавьте server action, который сохраняет новую cookie темы.'
    ),
    hint: L(
      'cookies() and headers() are async. A cookie written from a server action must set path and sameSite.',
      'cookies() и headers() асинхронны. Cookie, записываемая из server action, должна задавать path и sameSite.'
    ),
    solution: `// app/account/page.tsx
import { cookies, headers } from 'next/headers';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const headerList = await headers();

  const theme = cookieStore.get('theme')?.value ?? 'light';
  const language = headerList.get('accept-language') ?? 'en';

  return (
    <section data-theme={theme}>
      <h1>Account</h1>
      <p>Language: {language}</p>
    </section>
  );
}

// app/preferences/actions.ts
'use server';

import { cookies } from 'next/headers';

export async function setTheme(theme: 'light' | 'dark') {
  const cookieStore = await cookies();

  cookieStore.set('theme', theme, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}`,
    explanation: L(
      'These APIs exist only in server code, so secrets and raw request data never reach the client bundle. Reading cookies or headers opts the route into dynamic rendering, which is correct for per-user output. Setting httpOnly keeps the theme cookie away from JavaScript.',
      'Эти API доступны только на сервере, поэтому секреты и сырые данные запроса не попадают в клиентский бандл. Чтение cookies или headers переводит маршрут в динамический рендеринг, что правильно для персонального вывода. httpOnly скрывает cookie темы от JavaScript.'
    ),
  },
  {
    id: 'next-task-14',
    topic: 'next',
    level: 'advanced',
    title: L('Validated server action with useActionState', 'Валидация server action через useActionState'),
    brief: L(
      'Create a sign-up form whose server action validates email and password, returns field errors and disables the button while pending. No client-side validation library.',
      'Создайте форму регистрации: server action проверяет email и пароль, возвращает ошибки полей и блокирует кнопку на время отправки. Без клиентской библиотеки валидации.'
    ),
    hint: L(
      'The action signature is (previousState, formData). useActionState returns state, the form action and an isPending flag.',
      'Сигнатура action — (previousState, formData). useActionState возвращает состояние, action для формы и флаг isPending.'
    ),
    solution: `// app/signup/actions.ts
'use server';

export type FormState = { error?: string; ok?: boolean };

export async function signUp(
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email.includes('@')) {
    return { error: 'Enter a valid email' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' };
  }

  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { error: 'Could not create the account' };
  }

  return { ok: true };
}

// app/signup/signup-form.tsx
'use client';

import { useActionState } from 'react';
import { signUp, type FormState } from './actions';

const initialState: FormState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />

      {state.error && <p role="alert">{state.error}</p>}
      {state.ok && <p>Account created</p>}

      <button type="submit" disabled={pending}>
        {pending ? 'Creating...' : 'Sign up'}
      </button>
    </form>
  );
}`,
    explanation: L(
      'Validation runs on the server, so the client cannot bypass it. useActionState keeps the returned state between submissions and gives a pending flag for the disabled button, all without a manual loading state.',
      'Валидация выполняется на сервере, поэтому клиент не может её обойти. useActionState сохраняет возвращённое состояние между отправками и даёт флаг pending для блокировки кнопки — без ручного состояния загрузки.'
    ),
  },
  {
    id: 'next-task-15',
    topic: 'next',
    level: 'advanced',
    title: L('Choose the right rendering strategy', 'Выбрать правильную стратегию рендеринга'),
    brief: L(
      'Configure three routes: an about page that is fully static, a product list rebuilt at most every five minutes and a cart rendered per request. Explain why each mode fits.',
      'Настройте три маршрута: полностью статичная страница about, список товаров с обновлением не чаще раза в пять минут и корзина, рендерящаяся на каждый запрос. Объясните, почему подходит каждый режим.'
    ),
    hint: L(
      'Use the default for static, revalidate for ISR and force-dynamic plus cache no-store for per-request data.',
      'Используйте режим по умолчанию для статики, revalidate для ISR и force-dynamic вместе с cache no-store для данных на каждый запрос.'
    ),
    solution: `// app/about/page.tsx
// Static: no dynamic APIs and no uncached fetch, so it is built once.
export default function AboutPage() {
  return <h1>About us</h1>;
}

// app/products/page.tsx
// ISR: serve the cached page and rebuild at most every 300 seconds.
export const revalidate = 300;

export default async function ProductsPage() {
  const response = await fetch('https://api.example.com/products');
  const products = await response.json();

  return (
    <ul>
      {products.map((product: { id: string; title: string }) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// app/cart/page.tsx
// Dynamic: depends on the visitor cookie, so it cannot be shared.
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartId = (await cookies()).get('cart')?.value ?? 'guest';

  const response = await fetch(
    'https://api.example.com/carts/' + cartId,
    { cache: 'no-store' }
  );
  const cart = await response.json();

  return <p>{cart.items.length} items</p>;
}`,
    explanation: L(
      'Static output is cheapest and fastest for content that is the same for everyone. revalidate trades freshness for speed by rebuilding on a schedule or on demand. A route that reads cookies is dynamic anyway, and force-dynamic makes that explicit so caching cannot serve one user data to another.',
      'Статический вывод дешевле и быстрее для контента, одинакового для всех. revalidate обменивает свежесть на скорость, пересобирая страницу по расписанию или по требованию. Маршрут, читающий cookies, и так динамический, а force-dynamic делает это явным, чтобы кэш не отдал данные одного пользователя другому.'
    ),
  },
];
