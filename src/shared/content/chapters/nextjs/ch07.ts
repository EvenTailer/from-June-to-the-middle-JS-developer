import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh07: Chapter = {
  id: 'next-ch7',
  title: L('Metadata, images and fonts', 'Метаданные, изображения и шрифты'),
  summary: L(
    'How the metadata API describes a page to browsers and crawlers, how social cards are produced, and what next/image and next/font do for performance.',
    'Как API метаданных описывает страницу браузерам и краулерам, как делаются социальные карточки и что дают производительности next/image и next/font.'
  ),
  sections: [
    {
      id: 'next-ch7-s1',
      title: L('The metadata API', 'API метаданных'),
      body: L(
        'Metadata is what a browser, a crawler and a social network read about a page: the title, the description, the canonical address, the icons and the social values. Next.js exposes it in two forms. A static export is a plain object with known values, and a generated function computes the values from the data of the page. Both forms are server-only, because the head of the response is built on the server while the page is rendered.\n\nThe title deserves special attention because it composes. A `title.template` in the parent layout, such as `%s | Shop`, applies to every child segment, `title.default` covers the segment that sets no title at all, and `title.absolute` ignores the template. A child that sets a plain string title therefore inherits the parent template, which is the behaviour most teams expect and few teams know about. A child that sets an object without a title keeps the parent title entirely.\n\nMetadata merges down the tree the same way layouts nest. A child adds fields to what the parent declared, and array fields such as `alternates.canonical` are replaced rather than concatenated. `metadataBase` must be set once in the root layout, because every relative address in the social values, the icons and the canonical link is resolved against it, and an unresolved relative address produces metadata that the crawlers quietly ignore.',
        'Метаданные — это то, что браузер, краулер и социальная сеть читают о странице: заголовок, описание, канонический адрес, иконки и социальные значения. Next.js даёт две формы. Статический экспорт — обычный объект с известными значениями, а сгенерированная функция вычисляет значения из данных страницы. Обе формы работают только на сервере, потому что голова ответа собирается на сервере во время рендера.\n\nЗаголовку стоит уделить отдельное внимание, потому что он собирается из частей. `title.template` в родительской компоновке, например `%s | Shop`, применяется ко всем дочерним сегментам, `title.default` покрывает сегмент, который не задал заголовок вовсе, а `title.absolute` игнорирует шаблон. Потомок, задавший обычный строковый заголовок, наследует родительский шаблон — это то поведение, которого ждут почти все команды и о котором знают единицы. Потомок, задавший объект без заголовка, сохраняет родительский заголовок целиком.\n\nМетаданные объединяются вниз по дереву так же, как вкладываются компоновки. Потомок дополняет объявленное родителем, а поля-массивы вроде `alternates.canonical` заменяются, а не склеиваются. `metadataBase` задают один раз в корневой компоновке, потому что каждый относительный адрес в социальных значениях, иконках и канонической ссылке разрешается относительно него, а неразрешённый относительный адрес даёт метаданные, которые краулеры тихо игнорируют.'
      ),
      bullets: [
        L('metadata is a static object, generateMetadata is an async function with the same shape.', 'metadata — статичный объект, generateMetadata — асинхронная функция с той же формой.'),
        L('A title template in the parent applies to children, title.absolute bypasses it.', 'Шаблон заголовка в родителе применяется к детям, а title.absolute его обходит.'),
        L('metadataBase in the root layout resolves every relative address in the metadata.', 'metadataBase в корневой компоновке разрешает все относительные адреса метаданных.'),
        L('viewport and themeColor are separate exports because they change per route.', 'viewport и themeColor — отдельные экспорты, потому что они меняются по маршрутам.'),
      ],
      code: `// app/layout.tsx
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://shop.example.com'),
  title: { default: 'Shop', template: '%s | Shop' },
  description: 'Everything for the workshop',
};

export const viewport: Viewport = {
  themeColor: '#111827',
};

// app/products/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  return { title: product?.name, description: product?.summary };
}`,
      table: {
        caption: L('Where each piece of metadata comes from', 'Откуда берётся каждая часть метаданных'),
        headers: [
          L('Source', 'Источник'),
          L('Applies to', 'Действует на'),
          L('Example', 'Пример'),
        ],
        rows: [
          [L('metadata in a layout', 'metadata в компоновке'), L('The segment and its children', 'Сегмент и его потомки'), L('Title template, metadataBase', 'Шаблон заголовка, metadataBase')],
          [L('metadata in a page', 'metadata на странице'), L('That page only', 'Только эта страница'), L('A product name', 'Название товара')],
          [L('generateMetadata', 'generateMetadata'), L('That page only', 'Только эта страница'), L('A title computed from data', 'Заголовок, вычисленный из данных')],
          [L('icon.tsx and opengraph-image.tsx', 'icon.tsx и opengraph-image.tsx'), L('The segment and its children', 'Сегмент и его потомки'), L('A generated favicon', 'Сгенерированная иконка')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A missing metadataBase breaks every relative address', 'Без metadataBase ломаются все относительные адреса'),
          text: L(
            'Without metadataBase a relative social image or a relative canonical link cannot be resolved, and the crawlers receive an address they cannot use. The failure is silent: the page renders, the metadata object is valid, and the sharing preview is simply missing.',
            'Без metadataBase относительное социальное изображение или каноническая ссылка не разрешаются, и краулеры получают адрес, которым нельзя воспользоваться. Сбой тихий: страница рендерится, объект метаданных валиден, а превью при отправке просто отсутствует.'
          ),
        },
        {
          tone: 'tip',
          title: L('The template applies to strings but not to absolute', 'Шаблон применяется к строкам, но не к absolute'),
          text: L(
            'A child title of "About" becomes "About | Shop", while a child title of { absolute: "About" } stays "About". The distinction is the way to opt out of a template for one page without rebuilding the whole segment.',
            'Дочерний заголовок "About" превращается в "About | Shop", а дочерний заголовок { absolute: "About" } остаётся "About". Это и есть способ выйти из шаблона на одной странице, не переделывая весь сегмент.'
          ),
        },
      ],
      takeaway: L(
        'Set metadataBase and the title template once in the root layout, and reach for generateMetadata only where the values depend on the data.',
        'Задайте metadataBase и шаблон заголовка один раз в корневой компоновке, а generateMetadata используйте только там, где значения зависят от данных.'
      ),
      seeAlso: [
        L('Section 7-2: Open Graph and social cards', 'Секция 7-2: Open Graph и социальные карточки'),
        L('Section 1-1: folder conventions and the route tree', 'Секция 1-1: соглашения по папкам и дерево маршрутов'),
        L('Chapter 6: rendering strategies', 'Глава 6: стратегии рендеринга'),
      ],
    },
    {
      id: 'next-ch7-s2',
      title: L('Open Graph and social cards', 'Open Graph и социальные карточки'),
      body: L(
        'A link shared in a chat or a network carries a card: a title, a description, an image and an address. The protocol behind it is Open Graph, and every platform that renders such a card reads those fields. The Twitter card protocol overlaps with it but has its own namespace and its own layout types, so a page that fills in only the Open Graph values usually ends up with a small card and no image, which looks like a bug and is not.\n\nThe metadata object carries both namespaces. `openGraph` holds `title`, `description`, `url`, `siteName`, `type` and `images`, and `twitter` holds `card`, `title`, `description` and `images`. The card type decides the layout: `summary` is a small thumbnail, `summary_large_image` is the wide image most teams want, and `player` is reserved for media. An image needs a width, a height and an alternative text, because the platform reserves the space with the dimensions and the text is what a screen reader announces.\n\nThe image itself is either a file in the `public` folder or a generated one. A file named `opengraph-image.png` is picked up from the folder it lives in, and a generated card is a component named `opengraph-image.tsx` that renders with `ImageResponse` from `next/og` at a default size of 1200 by 630 pixels. The component receives the same props as a page, so the card can show the product the link points at, and it is produced at build time for a static route and on demand otherwise.',
        'Ссылка, отправленная в чат или сеть, несёт карточку: заголовок, описание, изображение и адрес. Протокол за этим — Open Graph, и его поля читает любая платформа, рисующая такую карточку. Протокол карточек Twitter пересекается с ним, но имеет собственное пространство имён и собственные типы раскладки, поэтому страница, заполнившая только значения Open Graph, обычно получает маленькую карточку без картинки — это не баг, а следствие разных пространств имён.\n\nВ объекте метаданных есть оба пространства имён. `openGraph` содержит `title`, `description`, `url`, `siteName`, `type` и `images`, а `twitter` — `card`, `title`, `description` и `images`. Тип карточки определяет раскладку: `summary` — маленькая миниатюра, `summary_large_image` — широкая картинка, которую чаще всего и хотят, а `player` оставлен для медиа. Изображению нужны ширина, высота и альтернативный текст: платформа резервирует место по размерам, а текст читает программа экранного доступа.\n\nСамо изображение — это либо файл в папке `public`, либо сгенерированная картинка. Файл с именем `opengraph-image.png` подхватывается из папки, в которой лежит, а сгенерированная карточка — это компонент `opengraph-image.tsx`, который рендерится через `ImageResponse` из `next/og` с размером по умолчанию 1200 на 630 пикселей. Компонент получает те же пропсы, что и страница, поэтому карточка может показать именно тот товар, на который ведёт ссылка, и она производится во время сборки для статичного маршрута и по требованию в остальных случаях.'
      ),
      bullets: [
        L('Open Graph and Twitter are separate namespaces, and both have to be filled in for a full card.', 'Open Graph и Twitter — разные пространства имён, и для полной карточки нужны оба.'),
        L('The card type decides the layout: summary, summary_large_image or player.', 'Тип карточки определяет раскладку: summary, summary_large_image или player.'),
        L('An image needs a width, a height and an alternative text.', 'Изображению нужны ширина, высота и альтернативный текст.'),
        L('opengraph-image.tsx renders with ImageResponse at 1200 by 630 pixels by default.', 'opengraph-image.tsx рендерится через ImageResponse с размером 1200 на 630 пикселей по умолчанию.'),
      ],
      code: `// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const alt = 'Shop homepage';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  background: '#0f172a',
  color: 'white',
  fontSize: 64,
};

export default function OpengraphImage() {
  return new ImageResponse(<div style={style}>Everything for the workshop</div>, { ...size });
}`,
      table: {
        caption: L('The two namespaces side by side', 'Два пространства имён рядом'),
        headers: [
          L('Property', 'Свойство'),
          L('openGraph', 'openGraph'),
          L('twitter', 'twitter'),
        ],
        rows: [
          [L('Title', 'Заголовок'), L('title', 'title'), L('title', 'title')],
          [L('Description', 'Описание'), L('description', 'description'), L('description', 'description')],
          [L('Images', 'Изображения'), L('images', 'images'), L('images', 'images')],
          [L('Type', 'Тип'), L('type: website or article', 'type: website или article'), L('card: summary_large_image', 'card: summary_large_image')],
          [L('Address', 'Адрес'), L('url', 'url'), L('not used', 'не используется')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The card is cached by the platform', 'Карточку кэширует платформа'),
          text: L(
            'Social networks keep the card they fetched for a long time and rarely ask again for the same address. After a fix the preview can stay old for hours, so verify the new card with a debugger or a cache buster instead of a chat window.',
            'Социальные сети долго хранят скачанную карточку и редко запрашивают тот же адрес заново. После исправления превью может остаться старым на часы, поэтому проверяйте новую карточку отладчиком или обходом кэша, а не окном чата.'
          ),
        },
        {
          tone: 'note',
          title: L('A card with no image looks broken', 'Карточка без картинки выглядит сломанной'),
          text: L(
            'A page that only fills in the Open Graph namespace usually gets a small summary card, because the layout type and the image belong to the Twitter namespace. Set both and the preview stops depending on the default of every platform.',
            'Страница, заполнившая только пространство Open Graph, обычно получает маленькую summary-карточку, потому что тип раскладки и картинка принадлежат пространству Twitter. Заполните оба, и превью перестанет зависеть от умолчаний каждой платформы.'
          ),
        },
      ],
      takeaway: L(
        'Fill in both namespaces, give the image its dimensions and alternative text, and keep the card component next to the route.',
        'Заполняйте оба пространства имён, задавайте изображению размеры и альтернативный текст и держите компонент карточки рядом с маршрутом.'
      ),
      seeAlso: [
        L('Section 7-1: the metadata API', 'Секция 7-1: API метаданных'),
        L('Section 7-3: next/image and the loader', 'Секция 7-3: next/image и загрузчик'),
        L('Section 6-1: static generation', 'Секция 6-1: статическая генерация'),
      ],
    },
    {
      id: 'next-ch7-s3',
      title: L('next/image and the loader', 'next/image и загрузчик'),
      body: L(
        'The `Image` component produces an optimized address for a picture and a stable layout around it. It requires the width and the height, or `fill` with a positioned parent, because the browser has to reserve the space before the file arrives, and that reservation removes the layout shift. It also emits a `srcset` so the browser downloads a file that fits the screen, and loads lazily by default. What it does not do is compress the file: the optimization happens on the server, inside the image loader.\n\nThe default loader is a route on the application itself. It receives the original address, the requested width and the quality, then fetches the original, resizes it, encodes it and caches the result. That work happens on your server, and it has a price: a popular picture can be resized hundreds of times before the cache fills, and every request adds a round trip. For most applications the trade is worth it, because the delivered file is far smaller and matches the device that asked for it.\n\nA custom loader replaces that route with a function that returns an address. The loader receives `src`, `width` and `quality` and returns the file to load, so a team can point at an image service, at a CDN that already stores resized variants, or at a folder of static assets. With a custom loader the framework does no processing at all, it only builds the address, and the format and quality become the service problem. The same effect is available per image through the `loader` prop.',
        'Компонент `Image` производит оптимизированный адрес картинки и стабильный макет вокруг неё. Он требует ширину и высоту либо `fill` с позиционированным родителем, потому что браузер обязан зарезервировать место до прихода файла, и именно это резервирование убирает сдвиг макета. Он также выдаёт `srcset`, чтобы браузер скачал файл подходящего размера, и по умолчанию грузит лениво. Но сам по себе он файл не сжимает: оптимизация происходит на сервере, внутри загрузчика изображений.\n\nЗагрузчик по умолчанию — это маршрут самого приложения. Он получает исходный адрес, запрошенную ширину и качество, затем скачивает оригинал, меняет размер, кодирует и кэширует результат. Эта работа происходит на вашем сервере, и у неё есть цена: популярную картинку пережимают сотни раз, пока кэш не наполнится, и каждый запрос добавляет задержку, которой нет у картинки, отдаваемой напрямую с CDN. Для большинства приложений размен оправдан: доставленный файл заметно меньше и соответствует устройству, которое его запросило.\n\nКастомный загрузчик заменяет этот маршрут функцией, которая возвращает адрес. Загрузчик получает `src`, `width` и `quality` и отдаёт адрес файла, поэтому команда может указать на свой сервис изображений, на CDN, который уже хранит уменьшенные варианты, или на папку со статикой. С кастомным загрузчиком фреймворк ничего не обрабатывает, он только собирает адрес, а вопросы формата и качества становятся проблемой сервиса. Тот же эффект доступен на уровне одного изображения через проп `loader`, а `unoptimized` выключает оптимизацию для отдельного файла.'
      ),
      bullets: [
        L('Image needs the width and the height, or fill with a positioned parent, to reserve the space.', 'Image требует ширину и высоту либо fill с позиционированным родителем, чтобы зарезервировать место.'),
        L('The default loader resizes on your server and caches the result it produces.', 'Загрузчик по умолчанию меняет размер на вашем сервере и кэширует результат.'),
        L('A custom loader returns an address and moves the resizing to a service you control.', 'Кастомный загрузчик возвращает адрес и переносит изменение размера в сервис под вашим контролем.'),
        L('Remote hosts need images.remotePatterns, and a static export has no optimizer at all.', 'Удалённым хостам нужны images.remotePatterns, а в статичной сборке оптимизатора нет вовсе.'),
      ],
      code: `// app/products/[slug]/page.tsx
import Image from 'next/image';

export default function ProductPage() {
  return (
    <Image
      src="/shoes.png"
      alt="Running shoe"
      width={640}
      height={640}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  );
}

// next.config.ts
const nextConfig = {
  images: { remotePatterns: [{ hostname: 'cdn.example.com' }] },
};

export default nextConfig;`,
      table: {
        caption: L('Props that change the result', 'Пропсы, меняющие результат'),
        headers: [
          L('Prop', 'Проп'),
          L('Effect', 'Эффект'),
          L('Trap', 'Ловушка'),
        ],
        rows: [
          [L('width and height', 'width и height'), L('Reserves the space before the file arrives', 'Резервирует место до прихода файла'), L('Required unless fill is used', 'Обязательны, если не используется fill')],
          [L('fill', 'fill'), L('Fills the parent element', 'Заполняет родительский элемент'), L('The parent must be positioned', 'Родитель должен быть позиционирован')],
          [L('sizes', 'sizes'), L('Tells the browser the real width on screen', 'Сообщает браузеру реальную ширину на экране'), L('Missing it means the browser assumes 100vw', 'Без него браузер считает ширину равной 100vw')],
          [L('priority', 'priority'), L('Preloads the image', 'Предзагружает картинку'), L('Use it for the first screen only', 'Только для первого экрана')],
          [L('unoptimized', 'unoptimized'), L('Serves the original file', 'Отдаёт исходный файл'), L('No resizing and no format change', 'Без изменения размера и формата')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('sizes is what tells the browser the real width', 'sizes сообщает браузеру настоящую ширину'),
          text: L(
            'Without sizes the browser assumes the image spans the whole viewport and downloads the largest variant it can. The page looks correct and the transfer is three times larger than it has to be, which is why this prop is checked in every performance review.',
            'Без sizes браузер считает, что картинка занимает всю ширину окна, и скачивает самый большой доступный вариант. Страница выглядит правильно, а трафик втрое больше нужного — поэтому этот проп проверяют на каждом ревью производительности.'
          ),
        },
        {
          tone: 'warning',
          title: L('The optimizer is server work', 'Оптимизатор — это работа на сервере'),
          text: L(
            'Every resized variant is produced by the application itself, so a traffic spike on one image turns into CPU work on the origin. A custom loader that points at a service with its own resizing moves that cost away from the application.',
            'Каждый уменьшенный вариант производит само приложение, поэтому всплеск трафика на одну картинку превращается в нагрузку на процессор источника. Кастомный загрузчик, указывающий на сервис со своим ресайзом, уносит эту стоимость за пределы приложения.'
          ),
        },
      ],
      takeaway: L(
        'Always give Image the dimensions it needs, and treat the loader as the place where the cost of the pictures is decided.',
        'Всегда задавайте Image нужные размеры и относитесь к загрузчику как к месту, где решается стоимость картинок.'
      ),
      seeAlso: [
        L('Section 7-4: fonts and self-hosting', 'Секция 7-4: шрифты и самостоятельный хостинг'),
        L('Section 8-5: bundle size and the client boundary', 'Секция 8-5: размер бандла и клиентская граница'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
      ],
    },
    {
      id: 'next-ch7-s4',
      title: L('Fonts and self-hosting', 'Шрифты и самостоятельный хостинг'),
      body: L(
        'A font file is a network request, and a request that blocks rendering delays the first paint. The usual way to include a web font is a `link` to a font service in the head of the document, which means a third party connection, a stylesheet request, a font request and a layout that cannot be drawn until the font arrives. `next/font` removes the middle two steps: the font file is downloaded during the build and served from the domain of the application itself.\n\nThe API mirrors the two sources. `next/font/google` takes a family name and produces an optimized file at build time, and `next/font/local` takes the path to a file you already have. Both return an object with a `className` and a `variable`, and the variable is the interesting one: it exposes a CSS custom property, so the font can be applied through a stylesheet and reach every element without a class on every element.\n\nSelf-hosting also fixes two problems that a `link` tag cannot. The font is served from the same origin as the document, so there is no third party connection to establish and no privacy question to answer. And the framework writes the `font-display` behaviour and the fallback metrics itself: the fallback is adjusted to the metrics of the real font, so the moment the swap happens the text does not move.',
        'Файл шрифта — это сетевой запрос, а запрос, блокирующий рендеринг, откладывает первую отрисовку. Обычный способ подключить веб-шрифт — это `link` на сервис шрифтов в голове документа, а значит соединение с третьей стороной, запрос таблицы стилей, запрос шрифта и макет, который нельзя нарисовать, пока шрифт не придёт или браузер не сдастся. `next/font` убирает средние два шага: файл шрифта скачивается во время сборки и отдаётся с домена самого приложения.\n\nAPI повторяет два источника. `next/font/google` принимает имя семейства и создаёт оптимизированный файл во время сборки, а `next/font/local` — путь к файлу, который уже есть. Оба возвращают объект с `className` и `variable`, и интересен здесь `variable`: он отдаёт CSS-переменную, поэтому шрифт можно подключить через таблицу стилей и он дойдёт до каждого элемента без класса на каждом элементе.\n\nСамостоятельный хостинг решает и две проблемы, которые тег `link` решить не может. Шрифт отдаётся с того же источника, что и документ, поэтому нет соединения с третьей стороной и нет вопроса о приватности. А фреймворк сам пишет поведение `font-display` и метрики запасного шрифта: запасной шрифт подгоняется под метрики настоящего, и в момент подмены текст не сдвигается.'
      ),
      bullets: [
        L('next/font downloads the font at build time and serves it from your own domain.', 'next/font скачивает шрифт во время сборки и отдаёт его с вашего домена.'),
        L('The variable export gives a CSS custom property that reaches every element.', 'Экспорт variable даёт CSS-переменную, которая доходит до каждого элемента.'),
        L('The fallback font is adjusted to the real metrics, so the swap does not move the text.', 'Запасной шрифт подгоняется под метрики настоящего, поэтому подмена не двигает текст.'),
        L('preload is on by default, turn it off for the fonts that appear below the fold.', 'preload включён по умолчанию, выключайте его для шрифтов ниже первого экрана.'),
      ],
      code: `// app/layout.tsx
import { Inter, localFont } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const heading = localFont({
  src: './fonts/Heading.woff2',
  weight: '700',
  variable: '--font-heading',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable + ' ' + heading.variable}>
      <body>{children}</body>
    </html>
  );
}`,
      table: {
        caption: L('Two ways to load a font', 'Два способа подключить шрифт'),
        headers: [
          L('Aspect', 'Аспект'),
          L('A link to a font service', 'Ссылка на сервис шрифтов'),
          L('next/font', 'next/font'),
        ],
        rows: [
          [L('When the file arrives', 'Когда приходит файл'), L('During page load', 'Во время загрузки страницы'), L('During the build', 'Во время сборки')],
          [L('Origin', 'Источник'), L('A third party', 'Третья сторона'), L('The application domain', 'Домен приложения')],
          [L('Layout shift', 'Сдвиг макета'), L('Possible', 'Возможен'), L('The fallback metrics are adjusted', 'Метрики запасного подогнаны')],
          [L('Extra requests', 'Дополнительные запросы'), L('A stylesheet and the font', 'Таблица стилей и шрифт'), L('One font file', 'Один файл шрифта')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Preloading every font slows the first screen', 'Предзагрузка всех шрифтов замедляет первый экран'),
          text: L(
            'Each preloaded font competes for bandwidth with the images of the first screen, and a font that is only used far down the page has no business there. Keep preload for the one font the reader sees first and switch it off everywhere else.',
            'Каждый предзагруженный шрифт делит полосу с картинками первого экрана, а шрифту, нужному далеко внизу страницы, там не место. Оставьте preload для одного шрифта, который читатель видит первым, и выключите его для остальных.'
          ),
        },
        {
          tone: 'tip',
          title: L('Use the variable, not the class', 'Используйте переменную, а не класс'),
          text: L(
            'A CSS custom property reaches elements that a class cannot, including the ones rendered by a third party component. Set it once on the html element and the whole tree inherits the font.',
            'CSS-переменная доходит до элементов, до которых класс не дотягивается, в том числе до элементов стороннего компонента. Задайте её один раз на элементе html, и всё дерево унаследует шрифт.'
          ),
        },
      ],
      takeaway: L(
        'Load fonts with next/font, let the framework adjust the fallback metrics, and preload only the font the first screen needs.',
        'Подключайте шрифты через next/font, доверьте фреймворку метрики запасного шрифта и предзагружайте только шрифт первого экрана.'
      ),
      seeAlso: [
        L('Section 7-3: next/image and the loader', 'Секция 7-3: next/image и загрузчик'),
        L('Section 8-5: bundle size and the client boundary', 'Секция 8-5: размер бандла и клиентская граница'),
        L('Chapter 1: the App Router', 'Глава 1: App Router'),
      ],
    },
  ],
};
