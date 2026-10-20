import type { PracticeTask } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssTasks: PracticeTask[] = [
  {
    id: 'htmlcss-task-4',
    topic: 'markup',
    level: 'basic',
    title: L('Accessible email field', 'Доступное поле email'),
    brief: L(
      'Build an email input with a visible label, a hint and an error message. Screen readers must announce both messages, and the field must be marked invalid.',
      'Сверстайте поле email с видимым label, подсказкой и сообщением об ошибке. Скринридер должен озвучивать оба сообщения, а поле — быть помечено как невалидное.'
    ),
    hint: L(
      'Connect the label with for/id and reference both message ids through aria-describedby.',
      'Свяжите label с полем через for/id и укажите оба id сообщений в aria-describedby.'
    ),
    solution: `<div class="field">
  <label for="email">Email address</label>

  <input
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    required
    aria-describedby="email-hint email-error"
    aria-invalid="true"
  />

  <p id="email-hint" class="hint">We only use it for order updates.</p>
  <p id="email-error" class="error" role="alert">
    Enter a valid email address.
  </p>
</div>`,
    explanation: L(
      'for/id gives the input an accessible name. aria-describedby appends the hint and the error to that name, aria-invalid exposes the state, and role="alert" announces the error when it appears.',
      'for/id даёт полю доступное имя. aria-describedby добавляет к нему подсказку и ошибку, aria-invalid передаёт состояние, а role="alert" озвучивает ошибку при появлении.'
    ),
  },
  {
    id: 'htmlcss-task-5',
    topic: 'markup',
    level: 'basic',
    title: L('Sticky header without hidden anchors', 'Липкая шапка без перекрытых якорей'),
    brief: L(
      'Make the site header stick to the top. Anchor links must not hide section headings under it, and smooth scrolling must respect reduced-motion settings.',
      'Сделайте шапку сайта липкой. Якорные ссылки не должны прятать заголовки секций под ней, а плавная прокрутка должна учитывать настройку reduced-motion.'
    ),
    hint: L(
      'position: sticky keeps the header in flow. scroll-margin-top offsets the scroll target by the header height.',
      'position: sticky оставляет шапку в потоке. scroll-margin-top смещает цель прокрутки на высоту шапки.'
    ),
    solution: `.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #ffffff;
  border-bottom: 1px solid #e3e5ea;
}

section[id],
h2[id] {
  scroll-margin-top: 5rem;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}`,
    explanation: L(
      'sticky keeps the header visible without removing it from layout. scroll-margin-top reserves space above the target so the heading lands below the header instead of behind it. The media query disables smooth scrolling for users who ask for less motion.',
      'sticky удерживает шапку видимой, не убирая её из потока. scroll-margin-top резервирует место над целью, поэтому заголовок оказывается под шапкой, а не за ней. Медиазапрос отключает плавную прокрутку для тех, кто просил меньше движения.'
    ),
  },
  {
    id: 'htmlcss-task-6',
    topic: 'markup',
    level: 'basic',
    title: L('Theme tokens with CSS variables', 'Тема на CSS-переменных'),
    brief: L(
      'Define light and dark themes with CSS custom properties, switch them through a data attribute, and remember the choice in localStorage.',
      'Опишите светлую и тёмную темы через CSS-переменные, переключайте их через data-атрибут и сохраняйте выбор в localStorage.'
    ),
    hint: L(
      'Put the tokens on :root, override them on :root[data-theme="dark"], and set color-scheme so native controls follow the theme.',
      'Разместите токены на :root, переопределите их в :root[data-theme="dark"] и задайте color-scheme, чтобы нативные контролы следовали теме.'
    ),
    solution: `<style>
:root {
  color-scheme: light;
  --bg: #ffffff;
  --surface: #f4f5f7;
  --text: #16181d;
  --accent: #3b5bfd;
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --bg: #111318;
  --surface: #1c1f27;
  --text: #f2f4f8;
  --accent: #8fa4ff;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
}

.card {
  padding: 20px;
  border-radius: 16px;
  background: var(--surface);
}
</style>

<script>
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;

  document.querySelector('#theme-toggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>`,
    explanation: L(
      'Components consume tokens instead of hard-coded colors, so a theme switch changes one attribute, not every rule. color-scheme also themes scrollbars and form controls. The toggle only needs to write root.dataset.theme and localStorage.',
      'Компоненты используют токены вместо жёстко заданных цветов, поэтому переключение темы меняет один атрибут, а не каждое правило. color-scheme также оформляет скроллбары и поля формы. Переключателю достаточно записать root.dataset.theme и localStorage.'
    ),
  },
  {
    id: 'htmlcss-task-7',
    topic: 'markup',
    level: 'intermediate',
    title: L('Flexbox navigation bar', 'Навигация на flexbox'),
    brief: L(
      'Create a navigation bar with a brand on the left, links in the middle and a call-to-action on the right. Items must stay vertically centered and wrap cleanly on narrow screens.',
      'Создайте панель навигации: бренд слева, ссылки по центру, кнопка действия справа. Элементы должны быть выровнены по вертикали и аккуратно переноситься на узких экранах.'
    ),
    hint: L(
      'Use display: flex, align-items: center, gap and margin-left: auto for the group that should move right.',
      'Используйте display: flex, align-items: center, gap и margin-left: auto для группы, которую нужно сдвинуть вправо.'
    ),
    solution: `<nav class="nav" aria-label="Main">
  <a class="nav__brand" href="/">Acme</a>

  <ul class="nav__list">
    <li><a href="/docs">Docs</a></li>
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>

  <a class="nav__cta" href="/signup">Sign up</a>
</nav>

<style>
  .nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;
    padding: 16px 24px;
  }

  .nav__list {
    display: flex;
    gap: 20px;
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
  }

  .nav__brand {
    font-weight: 700;
  }
</style>`,
    explanation: L(
      'flex with align-items: center aligns every item on one axis. The list gets margin-left: auto to absorb free space, and flex-wrap lets the CTA move to a second row instead of overflowing on small screens.',
      'flex с align-items: center выравнивает элементы по одной оси. Список получает margin-left: auto и забирает свободное место, а flex-wrap переносит кнопку на вторую строку вместо переполнения на маленьких экранах.'
    ),
  },
  {
    id: 'htmlcss-task-8',
    topic: 'markup',
    level: 'intermediate',
    title: L('Responsive hero image', 'Адаптивное изображение в hero'),
    brief: L(
      'Serve the right hero image size for each viewport. Provide 480, 800, 1200 and 1600 px candidates, keep the aspect ratio reserved, and load the image lazily.',
      'Отдавайте подходящий размер hero-изображения для каждого экрана. Подготовьте варианты 480, 800, 1200 и 1600 px, зарезервируйте пропорции и загружайте изображение лениво.'
    ),
    hint: L(
      'srcset with w descriptors plus sizes tells the browser the real layout width. width and height prevent layout shift.',
      'srcset с дескрипторами w и sizes сообщают браузеру реальную ширину слота. width и height предотвращают сдвиг макета.'
    ),
    solution: `<img
  src="hero-800.jpg"
  srcset="
    hero-480.jpg   480w,
    hero-800.jpg   800w,
    hero-1200.jpg 1200w,
    hero-1600.jpg 1600w
  "
  sizes="(min-width: 1024px) 960px,
         (min-width: 640px) 80vw,
         100vw"
  width="1600"
  height="900"
  alt="Team planning a release on a whiteboard"
  loading="lazy"
  decoding="async"
/>`,
    explanation: L(
      'The browser combines sizes with the device pixel ratio and picks the smallest candidate that covers the slot. width and height give it an aspect ratio before download, so the page does not jump. loading="lazy" delays off-screen work.',
      'Браузер сопоставляет sizes с плотностью пикселей и выбирает наименьший вариант, покрывающий слот. width и height задают пропорции до загрузки, поэтому страница не прыгает. loading="lazy" откладывает работу для изображений вне экрана.'
    ),
  },
  {
    id: 'htmlcss-task-9',
    topic: 'markup',
    level: 'intermediate',
    title: L('Layout with named grid areas', 'Макет на именованных областях grid'),
    brief: L(
      'Build a page layout with header, sidebar, main content, aside and footer. Use named grid areas and collapse to a single column below 900 px.',
      'Соберите макет страницы с шапкой, сайдбаром, основным контентом, блоком aside и подвалом. Используйте именованные области grid и переходите в одну колонку при ширине меньше 900 px.'
    ),
    hint: L(
      'Describe the desktop layout as a grid-template-areas string matrix, then place children with grid-area.',
      'Опишите десктопный макет матрицей строк grid-template-areas, затем разместите дочерние элементы через grid-area.'
    ),
    solution: `<div class="layout">
  <header>Header</header>
  <nav aria-label="Sections">Sidebar</nav>
  <main>Content</main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr) 280px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header header header'
      'sidebar main aside'
      'footer footer footer';
    gap: 24px;
    min-height: 100vh;
  }

  .layout > header { grid-area: header; }
  .layout > nav    { grid-area: sidebar; }
  .layout > main   { grid-area: main; }
  .layout > aside  { grid-area: aside; }
  .layout > footer { grid-area: footer; }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        'header'
        'main'
        'aside'
        'sidebar'
        'footer';
    }
  }
</style>`,
    explanation: L(
      'The areas matrix documents the layout visually. Each child claims one named area, so markup order and visual order can differ without extra positioning. minmax(0, 1fr) prevents wide content from expanding the column.',
      'Матрица областей визуально документирует макет. Каждый дочерний элемент занимает именованную область, поэтому порядок разметки и визуальный порядок могут различаться без дополнительного позиционирования. minmax(0, 1fr) не даёт широкому контенту растягивать колонку.'
    ),
  },
  {
    id: 'htmlcss-task-10',
    topic: 'markup',
    level: 'intermediate',
    title: L('Skip link and focus-visible', 'Skip-ссылка и focus-visible'),
    brief: L(
      'Add a skip link that appears on keyboard focus and sends focus to the main content. Style keyboard focus clearly but do not draw outlines for mouse clicks.',
      'Добавьте skip-ссылку, которая появляется при фокусе с клавиатуры и переводит фокус в основной контент. Явно оформьте клавиатурный фокус, но не рисуйте обводку при кликах мышью.'
    ),
    hint: L(
      'Hide the link off-screen with top, not display: none. Give main tabindex="-1" so it can receive focus.',
      'Спрячьте ссылку за экран через top, а не display: none. Дайте main tabindex="-1", чтобы он мог принимать фокус.'
    ),
    solution: `<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">...</header>

<main id="main" tabindex="-1">
  ...
</main>

<style>
  .skip-link {
    position: absolute;
    left: 16px;
    top: -100px;
    z-index: 100;
    padding: 12px 20px;
    border-radius: 8px;
    background: #16181d;
    color: #ffffff;
    transition: top 150ms ease;
  }

  .skip-link:focus-visible {
    top: 16px;
  }

  :focus-visible {
    outline: 3px solid #3b5bfd;
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .skip-link {
      transition: none;
    }
  }
</style>`,
    explanation: L(
      'The link stays in the tab order because it is only moved off-screen. focus-visible matches keyboard focus, while :focus:not(:focus-visible) removes the ring after a pointer click. tabindex="-1" makes main a valid fragment target that receives focus.',
      'Ссылка остаётся в порядке табуляции, потому что она лишь сдвинута за экран. focus-visible срабатывает при клавиатурном фокусе, а :focus:not(:focus-visible) убирает обводку после клика мышью. tabindex="-1" делает main допустимой целью фрагмента, получающей фокус.'
    ),
  },
  {
    id: 'htmlcss-task-11',
    topic: 'markup',
    level: 'advanced',
    title: L('Fix padding and grid overflow', 'Исправить переполнение из-за padding и grid'),
    brief: L(
      'A card with 100% width, padding and a border overflows its container, and a long code block stretches a two-column grid. Fix both without hiding the overflow.',
      'Карточка с width: 100%, padding и рамкой выходит за контейнер, а длинный блок кода растягивает двухколоночную сетку. Исправьте оба случая, не скрывая переполнение.'
    ),
    hint: L(
      'Switch to border-box. Grid tracks with 1fr have an auto minimum, so use minmax(0, 1fr) or min-width: 0.',
      'Перейдите на border-box. У grid-треков 1fr автоматический минимум, поэтому используйте minmax(0, 1fr) или min-width: 0.'
    ),
    solution: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.page {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 24px;
}

.card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 24px;
  padding: 24px;
  border: 1px solid #d9dce3;
}

.card img {
  max-width: 100%;
  height: auto;
}

.card pre {
  margin: 0;
  overflow-x: auto;
}`,
    explanation: L(
      'border-box includes padding and border in the declared width, so 100% no longer adds extra pixels. A 1fr track is minmax(auto, 1fr); long unbreakable content raises that auto minimum. minmax(0, 1fr) allows the track to shrink, and the code block scrolls horizontally instead of widening the page.',
      'border-box включает padding и рамку в заданную ширину, поэтому 100% больше не добавляет лишние пиксели. Трек 1fr — это minmax(auto, 1fr); длинный неразрывный контент поднимает этот минимум. minmax(0, 1fr) позволяет треку сжиматься, а блок кода прокручивается по горизонтали вместо расширения страницы.'
    ),
  },
  {
    id: 'htmlcss-task-12',
    topic: 'markup',
    level: 'advanced',
    title: L('Animated accessible accordion', 'Доступный аккордеон с анимацией'),
    brief: L(
      'Build an accordion that animates its height, exposes aria-expanded and aria-controls, keeps closed content out of the tab order, and disables animation for reduced motion.',
      'Сделайте аккордеон с анимацией высоты, атрибутами aria-expanded и aria-controls, исключением закрытого контента из порядка табуляции и отключением анимации при reduced motion.'
    ),
    hint: L(
      'Animate grid-template-rows from 0fr to 1fr with overflow: hidden on the inner wrapper. Set panel.inert while closed.',
      'Анимируйте grid-template-rows от 0fr к 1fr с overflow: hidden на внутренней обёртке. Пока панель закрыта, задавайте panel.inert.'
    ),
    solution: `<div class="accordion">
  <h3>
    <button
      class="accordion__trigger"
      type="button"
      aria-expanded="false"
      aria-controls="panel-shipping"
      id="trigger-shipping"
    >
      Shipping and returns
      <span aria-hidden="true">+</span>
    </button>
  </h3>

  <div
    class="accordion__panel"
    id="panel-shipping"
    role="region"
    aria-labelledby="trigger-shipping"
  >
    <div class="accordion__content">
      <p>Orders ship within 24 hours. Returns are free for 30 days.</p>
    </div>
  </div>
</div>

<style>
  .accordion {
    border: 1px solid #d9dce3;
    border-radius: 12px;
    background: #ffffff;
  }

  .accordion__trigger {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 16px 20px;
    border: 0;
    background: none;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .accordion__panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 220ms ease;
  }

  .accordion__panel[data-open='true'] {
    grid-template-rows: 1fr;
  }

  .accordion__content {
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .accordion__panel {
      transition: none;
    }
  }
</style>

<script>
  const root = document.querySelector('.accordion');
  const trigger = root.querySelector('.accordion__trigger');
  const panel = root.querySelector('.accordion__panel');

  panel.inert = true;

  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';

    trigger.setAttribute('aria-expanded', String(!open));
    panel.dataset.open = String(!open);
    panel.inert = open;
  });
</script>`,
    explanation: L(
      'grid-template-rows: 0fr collapses the row and 1fr expands it to the content height, so no JavaScript measurement is needed. overflow: hidden on the inner element clips the text during the transition. inert removes links from the closed panel out of the tab order, and the media query keeps the change instant for reduced motion.',
      'grid-template-rows: 0fr схлопывает строку, а 1fr растягивает её до высоты контента, поэтому JavaScript-измерения не нужны. overflow: hidden на внутреннем элементе обрезает текст во время перехода. inert убирает ссылки закрытой панели из порядка табуляции, а медиазапрос делает изменение мгновенным при reduced motion.'
    ),
  },
  {
    id: 'htmlcss-task-13',
    topic: 'markup',
    level: 'advanced',
    title: L('Container query product card', 'Карточка товара на container query'),
    brief: L(
      'Create a product card that switches from stacked to horizontal when its own container is wide enough, independent of the viewport. The same card must work in a sidebar and in the main column.',
      'Создайте карточку товара, которая переключается с вертикальной на горизонтальную, когда достаточно широк её собственный контейнер, независимо от вьюпорта. Одна карточка должна работать и в сайдбаре, и в основной колонке.'
    ),
    hint: L(
      'Set container-type: inline-size on the wrapper, then use @container (min-width: ...) on the card.',
      'Задайте container-type: inline-size на обёртке, затем используйте @container (min-width: ...) для карточки.'
    ),
    solution: `.card-slot {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d9dce3;
  border-radius: 16px;
  background: #ffffff;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

@container (min-width: 420px) {
  .card {
    grid-template-columns: 160px minmax(0, 1fr);
    align-items: start;
  }
}

@container (min-width: 720px) {
  .card {
    grid-template-columns: 220px minmax(0, 1fr) auto;
  }
}`,
    explanation: L(
      'container-type: inline-size makes the wrapper a query container measured by its inline size. @container rules respond to that width, not the viewport, so the same component adapts correctly in a narrow sidebar and a wide main column.',
      'container-type: inline-size делает обёртку контейнером запросов, измеряемым по inline-размеру. Правила @container реагируют на эту ширину, а не на вьюпорт, поэтому один компонент корректно адаптируется и в узком сайдбаре, и в широкой колонке.'
    ),
  },
  {
    id: 'htmlcss-task-14',
    topic: 'markup',
    level: 'advanced',
    title: L('Semantic pricing table', 'Семантическая таблица тарифов'),
    brief: L(
      'Mark up a pricing comparison with a caption, column and row headers, a tfoot note and a call-to-action per plan. Make the table readable on mobile without breaking semantics.',
      'Сверстайте сравнение тарифов с caption, заголовками столбцов и строк, примечанием в tfoot и кнопкой для каждого тарифа. Сделайте таблицу читаемой на мобильных, не ломая семантику.'
    ),
    hint: L(
      'Use scope="col" and scope="row". Wrap the table in a scroll container instead of changing its display to block.',
      'Используйте scope="col" и scope="row". Оберните таблицу в контейнер с прокруткой вместо смены display на block.'
    ),
    solution: `<section class="pricing" aria-labelledby="pricing-title">
  <h2 id="pricing-title">Plans</h2>

  <div class="pricing__scroll">
    <table>
      <caption>Monthly prices in USD, billed annually</caption>

      <thead>
        <tr>
          <th scope="col">Feature</th>
          <th scope="col">Starter</th>
          <th scope="col">Team</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">Projects</th>
          <td>3</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <th scope="row">Seats</th>
          <td>1</td>
          <td>10</td>
        </tr>
        <tr>
          <th scope="row">Price</th>
          <td>$9</td>
          <td>$29</td>
        </tr>
        <tr>
          <th scope="row">Get started</th>
          <td><a class="button" href="/signup?plan=starter">Choose Starter</a></td>
          <td><a class="button" href="/signup?plan=team">Choose Team</a></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="3">Prices exclude local taxes.</td>
        </tr>
      </tfoot>
    </table>
  </div>
</section>

<style>
  .pricing__scroll {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  caption {
    padding-block: 8px;
    text-align: left;
    color: #5b6170;
  }

  th,
  td {
    padding: 12px 16px;
    border-bottom: 1px solid #e3e5ea;
    text-align: left;
  }

  thead th {
    background: #f4f5f7;
  }
</style>`,
    explanation: L(
      'caption names the table, scope tells screen readers which header applies to each cell, and tfoot holds the note. A wrapper with overflow-x: auto lets the table scroll on small screens while keeping table semantics; display: block on table would destroy the header relationships.',
      'caption называет таблицу, scope сообщает скринридеру, какой заголовок относится к ячейке, а tfoot хранит примечание. Обёртка с overflow-x: auto позволяет таблице прокручиваться на маленьких экранах, сохраняя семантику; display: block на table разрушил бы связи заголовков.'
    ),
  },
  {
    id: 'htmlcss-task-15',
    topic: 'markup',
    level: 'advanced',
    title: L('Responsive landing hero', 'Адаптивный hero лендинга'),
    brief: L(
      'Build a landing hero with an eyebrow, fluid heading, lead text and two actions. Stack it on mobile, use two columns from 860 px, and make type scale smoothly without media queries.',
      'Сверстайте hero лендинга с надзаголовком, плавно масштабируемым заголовком, лид-текстом и двумя действиями. Складывайте в одну колонку на мобильных, переходите на две колонки с 860 px и масштабируйте шрифт без медиазапросов.'
    ),
    hint: L(
      'clamp() handles fluid type. Use grid with a single-column default and add a two-column template in one media query.',
      'clamp() отвечает за плавный шрифт. Используйте grid с одной колонкой по умолчанию и добавьте двухколоночный шаблон в одном медиазапросе.'
    ),
    solution: `<section class="hero">
  <div class="hero__copy">
    <p class="hero__eyebrow">New release</p>
    <h1>Ship accessible interfaces faster</h1>
    <p class="hero__lead">
      A component library with sensible defaults and no lock-in.
    </p>

    <div class="hero__actions">
      <a class="button" href="/start">Get started</a>
      <a class="button button--ghost" href="/docs">Read the docs</a>
    </div>
  </div>

  <img
    class="hero__image"
    src="hero-800.jpg"
    srcset="hero-800.jpg 800w, hero-1600.jpg 1600w"
    sizes="(min-width: 860px) 45vw, 100vw"
    width="1600"
    height="1200"
    alt="Dashboard showing accessibility checks passing"
  />
</section>

<style>
  .hero {
    display: grid;
    gap: clamp(24px, 5vw, 64px);
    align-items: center;
    padding: clamp(32px, 6vw, 96px) clamp(20px, 5vw, 48px);
  }

  .hero h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw + 1rem, 4rem);
    line-height: 1.05;
    text-wrap: balance;
  }

  .hero__eyebrow {
    margin: 0 0 8px;
    font-size: 0.875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero__lead {
    max-width: 60ch;
    font-size: clamp(1rem, 1.2vw + 0.75rem, 1.25rem);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .hero__image {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }

  @media (min-width: 860px) {
    .hero {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    }
  }
</style>`,
    explanation: L(
      'The single-column grid is the mobile default; one media query adds the desktop split. clamp() ties font size to the viewport with min and max limits, so text grows smoothly without extra breakpoints. flex-wrap on the actions prevents the buttons from overflowing.',
      'Сетка с одной колонкой — мобильный вариант по умолчанию; один медиазапрос добавляет десктопное разделение. clamp() привязывает размер шрифта к вьюпорту с минимумом и максимумом, поэтому текст растёт плавно без лишних точек перелома. flex-wrap у действий не даёт кнопкам выходить за границы.'
    ),
  },
];
