import type { LocalizedText, PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const htmlCssChapterTasks: PracticeTask[] = [
  {
    id: 'ch-htmlcss-ch1-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch1',
    level: 'basic',
    title: L('Build a page from landmarks', 'Собрать страницу из лендмарков'),
    brief: L(
      'Build the skeleton of a product page: a skip link as the first focusable element, a header with a labelled nav, exactly one main with an h1 and nested sections, an aside with its own label and a footer. The heading levels must follow the nesting, not the font size.',
      'Соберите скелет страницы товара: skip link первым фокусируемым элементом, header с подписанным nav, ровно один main с h1 и вложенными секциями, aside со своей меткой и footer. Уровни заголовков должны следовать вложенности, а не размеру шрифта.'
    ),
    hint: L(
      'Landmarks are header, nav, main, aside and footer. Give every nav an aria-label when there is more than one, tie the skip link to the id of main, and nest the heading levels without skipping a step.',
      'Лендмарки — это header, nav, main, aside и footer. Каждому nav нужен aria-label, если их больше одного, skip link привязывается к id элемента main, а уровни заголовков идут без пропусков.'
    ),
    solution: `<a class="skip-link" href="#main">Skip to content</a>
<header>
  <nav aria-label="Primary">
    <a href="/catalog">Catalog</a>
    <a href="/pricing">Pricing</a>
  </nav>
</header>
<main id="main">
  <h1>Acme keyboard</h1>
  <section>
    <h2>Overview</h2>
    <p>Mechanical keyboard with hot-swap switches.</p>
    <section>
      <h3>Box contents</h3>
      <ul><li>Keyboard</li><li>USB cable</li></ul>
    </section>
  </section>
</main>
<aside aria-label="Related products"><p>Keycaps set</p></aside>
<footer><p>2026</p></footer>`,
    explanation: L(
      'The browser builds the accessibility tree from the elements, so the landmarks and the heading levels give a screen reader the structure of the page. The skip link is the first focusable element and points at a real target inside main.',
      'Дерево доступности браузер строит по элементам, поэтому лендмарки и уровни заголовков задают структуру страницы для скринридера. Skip link — первый фокусируемый элемент, и он указывает на реальную цель внутри main.'
    ),
  },
  {
    id: 'ch-htmlcss-ch2-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch2',
    level: 'basic',
    title: L('Write a signup form that works without JavaScript', 'Написать форму регистрации, работающую без JavaScript'),
    brief: L(
      'Build a signup form that posts to a real endpoint: every control has a visible label tied by for and id, the address controls live in a fieldset with a legend, the constraints are declared with the native attributes, and the submit button carries an explicit type.',
      'Соберите форму регистрации, которая отправляется на настоящий endpoint: у каждого поля есть видимая метка, связанная через for и id, адресные поля лежат в fieldset с legend, ограничения заданы нативными атрибутами, а у кнопки отправки указан явный type.'
    ),
    hint: L(
      'name is the key in the submitted data, autocomplete tokens drive the autofill, and required, type, min and max are the constraint sources. Inside a form the default button type is submit, so write it explicitly.',
      'name — это ключ в отправляемых данных, токены autocomplete управляют автозаполнением, а required, type, min и max задают ограничения. Внутри формы тип кнопки по умолчанию равен submit, поэтому укажите его явно.'
    ),
    solution: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required maxlength="254">
  <fieldset>
    <legend>Delivery address</legend>
    <label for="street">Street</label>
    <input id="street" name="street" autocomplete="street-address" required>
    <label for="city">City</label>
    <input id="city" name="city" autocomplete="address-level2" required>
  </fieldset>
  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="18" max="120" step="1" required>
  <label for="plan">Plan</label>
  <select id="plan" name="plan">
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>
  <button type="submit">Sign up</button>
</form>`,
    explanation: L(
      'The form posts the named controls even when the script never loads, and the browser reports the constraint violations in its own localized wording. The server still has to repeat the checks, the browser only saves the user a trip.',
      'Форма отправляет именованные поля даже без скрипта, а браузер сообщает об ошибках ограничений своим локализованным текстом. Сервер всё равно должен повторить проверки — браузер лишь экономит пользователю путь.'
    ),
  },
  {
    id: 'ch-htmlcss-ch3-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch3',
    level: 'basic',
    title: L('Make a filter panel accessible', 'Сделать панель фильтров доступной'),
    brief: L(
      'The filter panel must work with the keyboard alone: the toggle exposes its expanded state and controls the panel, the price field is described by its error message, the focus ring stays visible, and the image carries a meaningful alt with its dimensions.',
      'Панель фильтров должна работать только с клавиатуры: переключатель отдаёт своё состояние и управляет панелью, поле цены описано сообщением об ошибке, кольцо фокуса остаётся видимым, а у изображения есть осмысленный alt и размеры.'
    ),
    hint: L(
      'A state attribute only means something on an element that has a role, aria-describedby points at the message, and :focus-visible paints the ring for keyboard users without punishing mouse clicks.',
      'Атрибут состояния осмыслен только на элементе с ролью, aria-describedby указывает на сообщение, а :focus-visible рисует кольцо для клавиатуры, не мешая кликам мышью.'
    ),
    solution: `<button type="button" aria-expanded="false" aria-controls="filters">
  Filters
</button>

<div id="filters">
  <label for="price">Max price</label>
  <input id="price" name="price" type="number" aria-describedby="price-error" required>
  <p id="price-error">Enter a number below 10000</p>

  <img src="/keyboard.png" alt="Mechanical keyboard with brown keycaps"
       width="640" height="360">
</div>

:is(button, input):focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}`,
    explanation: L(
      'aria-expanded and aria-controls let a screen reader announce the state of the disclosure, and aria-describedby attaches the error to the field. The visible focus ring and the explicit alt are what a keyboard user and a screen reader user both need.',
      'aria-expanded и aria-controls позволяют скринридеру озвучить состояние раскрытия, а aria-describedby привязывает ошибку к полю. Видимое кольцо фокуса и явный alt нужны и пользователю клавиатуры, и пользователю скринридера.'
    ),
  },
  {
    id: 'ch-htmlcss-ch4-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch4',
    level: 'intermediate',
    title: L('Make the card layout predictable', 'Сделать раскладку карточки предсказуемой'),
    brief: L(
      'The card must never grow wider than its column, its title and paragraph must keep a predictable distance, and the badge must sit in the corner of the card instead of the corner of the page. Fix the CSS.',
      'Карточка не должна выходить за пределы колонки, заголовок и абзац должны сохранять предсказуемый отступ, а бейдж должен стоять в углу карточки, а не страницы. Исправьте CSS.'
    ),
    hint: L(
      'box-sizing: border-box makes the width include the padding and the border, display: flow-root stops the parent-child margin collapse, and an absolute element positions against the nearest positioned ancestor.',
      'box-sizing: border-box включает padding и border в ширину, display: flow-root останавливает схлопывание отступов с родителем, а абсолютный элемент позиционируется по ближайшему позиционированному предку.'
    ),
    solution: `*, *::before, *::after { box-sizing: border-box; }

.card {
  position: relative;      /* the badge anchors to the card */
  display: flow-root;      /* stops the margin collapse */
  width: 100%;
  max-width: 24rem;
  padding: 16px;
  border: 1px solid #d0d0d0;
}

.card__title {
  margin-block: 0 12px;    /* predictable spacing, no collapsing */
}

.card__badge {
  position: absolute;
  inset-block-start: 8px;
  inset-inline-end: 8px;
}`,
    explanation: L(
      'The border-box reset makes every width mean what it says, flow-root keeps the vertical margins of the card from collapsing with the title, and position: relative on the card gives the absolute badge the card as its containing block.',
      'Сброс border-box делает каждую ширину ровно такой, как написано, flow-root не даёт вертикальным отступам карточки схлопнуться с заголовком, а position: relative на карточке делает её содержащим блоком для абсолютного бейджа.'
    ),
  },
  {
    id: 'ch-htmlcss-ch5-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch5',
    level: 'intermediate',
    title: L('Replace specificity wars with layers', 'Заменить битву за специфичность слоями'),
    brief: L(
      'The theme rules keep beating the component rules because of their selectors. Put the design tokens, the components and the utilities into named cascade layers, give the low priority rule zero specificity, and let a dark theme swap only the tokens.',
      'Правила темы постоянно перебивают правила компонентов из-за своих селекторов. Разложите токены дизайна, компоненты и утилиты по именованным слоям каскада, дайте правилу с низким приоритетом нулевую специфичность и позвольте тёмной теме менять только токены.'
    ),
    hint: L(
      'Layers are compared in declaration order and beat specificity, :where() adds nothing to the specificity of the rule it contains, and custom properties are inherited, so a theme only has to redefine them.',
      'Слои сравниваются в порядке объявления и сильнее специфичности, :where() ничего не добавляет к специфичности правила, а пользовательские свойства наследуются — теме достаточно переопределить их.'
    ),
    solution: `@layer tokens, components, utilities;

@layer tokens {
  :root { --surface: #ffffff; --text: #1f2328; }
  [data-theme='dark'] { --surface: #14161a; --text: #e8eaed; }
}

@layer components {
  .card {
    background: var(--surface);
    color: var(--text);
  }
  :where(.theme) h1 { color: var(--text); }
}
@layer utilities {
  .card--flush { padding: 0; }
}`,
    explanation: L(
      'Inside @layer the priority comes from the order of the layer names, not from the selectors, so the utility class wins without !important. The theme swaps a handful of custom properties, and every component picks the change up through inheritance.',
      'Внутри @layer приоритет задаёт порядок имён слоёв, а не селекторы, поэтому утилита побеждает без !important. Тема меняет несколько пользовательских свойств, а компоненты подхватывают переменные через наследование.'
    ),
  },
  {
    id: 'ch-htmlcss-ch6-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch6',
    level: 'intermediate',
    title: L('Build a product row with flexbox', 'Собрать строку товаров на флексбоксе'),
    brief: L(
      'Build a row where the main column takes the remaining space and is allowed to shrink, the side panel keeps a fixed width, the cells share the space equally whatever their content length, and the items are separated by a gap instead of margins.',
      'Соберите строку, где основная колонка забирает оставшееся место и может сжиматься, боковая панель сохраняет фиксированную ширину, ячейки делят место поровну независимо от длины содержимого, а отступ между элементами задаёт gap, а не margins.'
    ),
    hint: L(
      'flex-basis sets the starting size, flex: 1 1 auto grows and shrinks from the content, min-width: 0 removes the automatic floor of a flex item, and gap never collapses.',
      'flex-basis задаёт начальный размер, flex: 1 1 auto растягивает и сжимает элемент от размера содержимого, min-width: 0 убирает автоматический минимум флекс-элемента, а gap никогда не схлопывается.'
    ),
    solution: `.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.row__main {
  flex: 1 1 auto;
  min-width: 0;      /* the title may shrink below its content size */
}

.row__aside {
  flex: 0 0 240px;  /* a fixed side panel */
}

.row__cell {
  flex: 1 1 0;      /* equal columns whatever the content length */
}

.row__title {
  overflow-wrap: anywhere;
}`,
    explanation: L(
      'flex-basis and flex-grow decide who gets the free space, and min-width: 0 lets the long title shrink below its content size instead of pushing the row out of the column. gap replaces the margin hacks and stays the same on every axis.',
      'flex-basis и flex-grow решают, кому достанется свободное место, а min-width: 0 позволяет длинному заголовку сжаться меньше размера контента и не вытолкнуть строку из колонки. gap заменяет margin-хаки и одинаков по всем осям.'
    ),
  },
  {
    id: 'ch-htmlcss-ch7-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch7',
    level: 'intermediate',
    title: L('Lay out a dashboard with grid areas', 'Разложить дашборд областями грида'),
    brief: L(
      'Lay out the dashboard with a header, a sidebar, a content area and a footer. Describe the layout with named areas and redefine the areas in a media query so the columns stack on a narrow screen. The card gallery must fit as many 240 pixel columns as the width allows.',
      'Разложите дашборд: header, sidebar, основная область и footer. Опишите раскладку именованными областями и переопределите их в медиазапросе, чтобы колонки складывались на узком экране. Галерея карточек должна вмещать столько колонок по 240 пикселей, сколько позволяет ширина.'
    ),
    hint: L(
      'grid-template-areas names the regions, a dot marks an empty cell, and grid-area places an item. repeat(auto-fit, minmax(240px, 1fr)) builds the gallery, and auto-fit collapses the empty tracks.',
      'grid-template-areas именует области, точка отмечает пустую ячейку, а grid-area размещает элемент. Галерею собирает repeat(auto-fit, minmax(240px, 1fr)), и auto-fit схлопывает пустые дорожки.'
    ),
    solution: `.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 24px;
}

.page__header { grid-area: header; }
.page__sidebar { grid-area: sidebar; }
.page__main { grid-area: main; }
.page__footer { grid-area: footer; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

@media (width < 60rem) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "sidebar" "main" "footer";
  }
}`,
    explanation: L(
      'The areas describe the layout once, so the media query moves every item by redefining the template and no selector has to change. The auto-fit gallery keeps a readable floor of 240 pixels and collapses the empty columns when only one card is left.',
      'Области описывают раскладку один раз, поэтому медиазапрос перемещает все элементы переопределением шаблона, и ни один селектор менять не нужно. Галерея на auto-fit держит читаемый минимум в 240 пикселей и схлопывает пустые колонки, когда осталась одна карточка.'
    ),
  },
  {
    id: 'ch-htmlcss-ch8-1',
    moduleId: 'html-css',
    topic: 'markup',
    chapterId: 'htmlcss-ch8',
    level: 'advanced',
    title: L('Make the layout fluid and cheap to render', 'Сделать раскладку текучей и дешёвой по рендерингу'),
    brief: L(
      'The heading must scale smoothly between two sizes, the card must adapt to its own container instead of the viewport, the animation must respect the reduced motion preference, the off screen sections must not be rendered, and the page must follow the system colour scheme.',
      'Заголовок должен плавно масштабироваться между двумя размерами, карточка должна подстраиваться под свой контейнер, а не под вьюпорт, анимация должна уважать настройку уменьшения движения, закадровые секции не должны рендериться, а страница должна следовать системной цветовой схеме.'
    ),
    hint: L(
      'clamp sets a range with a fluid middle, container-type turns an element into a query container, prefers-reduced-motion and prefers-color-scheme are media features, and content-visibility: auto skips the off screen work.',
      'clamp задаёт диапазон с текучей серединой, container-type превращает элемент в контейнер запросов, prefers-reduced-motion и prefers-color-scheme — это медиафункции, а content-visibility: auto пропускает закадровую работу.'
    ),
    solution: `:root {
  color-scheme: light dark;
  --step-2: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
}
h1 { font-size: var(--step-2); }
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
@container card (width > 24rem) {
  .card { grid-template-columns: 12rem 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; animation: none; }
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #14161a; --fg: #e8eaed; }
}
.article-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 480px;
}`,
    explanation: L(
      'The fluid clamp removes most breakpoints, and the container query lets the component react to the space it really has. The reduced motion query switches the animation off, and content-visibility keeps the off screen sections out of the rendering budget.',
      'Текучий clamp убирает большую часть брейкпоинтов, а контейнерный запрос даёт компоненту реакцию на реально доступное место. Медиазапрос уменьшения движения выключает анимацию, а content-visibility не пускает закадровые секции в бюджет рендеринга.'
    ),
  },
];
