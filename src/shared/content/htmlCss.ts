import type { Module } from '../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssModule: Module = {
  id: 'html-css',
  title: L('HTML & CSS', 'HTML и CSS'),
  description: L('Markup, styling, layout, responsiveness.', 'Разметка, стили, вёрстка, адаптивность.'),
  lessons: [
    { id: 'htmlcss-001', title: L('Semantic HTML', 'Семантический HTML'), question: L('Why semantic tags matter?', 'Зачем семантические теги?'), answer: L('Semantic tags convey meaning to browsers, screen readers and SEO. Prefer them over div soup.', 'Семантические теги передают смысл браузерам, скринридерам и SEO. Предпочитайте их div-супу.') },
    { id: 'htmlcss-002', title: L('Document landmarks', 'Ландмарки документа'), question: L('Core landmark elements?', 'Основные ландмарки?'), answer: L('header, nav, main, aside, footer, section, article. One main per page. Landmarks aid navigation.', 'header, nav, main, aside, footer, section, article. Один main на страницу. Ландмарки помогают навигации.') },
    { id: 'htmlcss-003', title: L('article vs section', 'article vs section'), question: L('When to use article vs section?', 'Когда article, а когда section?'), answer: L('article is self-contained reusable content. section groups thematic content with a heading.', 'article - самодостаточный переиспользуемый контент. section группирует тематический контент с заголовком.') },
    { id: 'htmlcss-004', title: L('figure & figcaption', 'figure и figcaption'), question: L('figure/figcaption usage?', 'Использование figure/figcaption?'), answer: L('Wrap media with optional caption. Self-contained, referenced from main flow.', 'Оборачивайте медиа с необязательной подписью. Самодостаточный, ссылается из основного потока.'), code: '<figure>\n  <img src="chart.png" alt="Sales">\n  <figcaption>Q1 sales</figcaption>\n</figure>' },
    { id: 'htmlcss-005', title: L('details & summary', 'details и summary'), question: L('details/summary pattern?', 'Паттерн details/summary?'), answer: L('Native disclosure widget. No JS needed. summary is clickable toggle.', 'Нативный виджет раскрытия. Без JS. summary - кликабельный переключатель.'), code: '<details>\n  <summary>More</summary>\n  <p>Hidden content</p>\n</details>' },
    { id: 'htmlcss-006', title: L('dialog element', 'Элемент dialog'), question: L('dialog element benefits?', 'Преимущества dialog?'), answer: L('Native modal with showModal, backdrop, focus trap, Escape close. Accessible by default.', 'Нативная модалка с showModal, backdrop, ловушкой фокуса, закрытием по Escape. Доступна по умолчанию.'), code: 'const d = document.querySelector("dialog");\nd.showModal();' },
    { id: 'htmlcss-007', title: L('Heading hierarchy', 'Иерархия заголовков'), question: L('Heading best practice?', 'Лучшая практика заголовков?'), answer: L('One h1 per page, logical order h1-h6. Do not skip levels for styling; use CSS.', 'Один h1 на страницу, логический порядок h1-h6. Не пропускайте уровни ради стилизации; используйте CSS.') },
    { id: 'htmlcss-008', title: L('Input types', 'Типы input'), question: L('Why correct input types matter?', 'Почему важны правильные типы input?'), answer: L('email, tel, url, number, date etc trigger mobile keyboards and validation. Better UX and a11y.', 'email, tel, url, number, date и т.д. вызывают мобильные клавиатуры и валидацию. Лучше UX и a11y.') },
    { id: 'htmlcss-009', title: L('Label association', 'Связь label'), question: L('How to associate label?', 'Как связать label?'), answer: L('Use for/id matching. Wrapping input also works. Avoid placeholder as label.', 'Используйте совпадение for/id. Оборачивание input тоже работает. Избегайте placeholder как label.'), code: '<label for="email">Email</label>\n<input id="email" type="email">' },
    { id: 'htmlcss-010', title: L('Validation attributes', 'Атрибуты валидации'), question: L('HTML5 validation attributes?', 'Атрибуты валидации HTML5?'), answer: L('required, min, max, minlength, maxlength, pattern, step. Combine with JS for UX.', 'required, min, max, minlength, maxlength, pattern, step. Комбинируйте с JS для UX.') },
    { id: 'htmlcss-011', title: L('button types', 'Типы button'), question: L('button type values?', 'Значения type у button?'), answer: L('submit (default in form), button, reset. Set type="button" for non-submit to avoid accidental submit.', 'submit (по умолчанию в форме), button, reset. Ставьте type="button" для неотправки, чтобы избежать случайной отправки.') },
    { id: 'htmlcss-012', title: L('Alt text', 'Alt-текст'), question: L('Good alt text?', 'Хороший alt-текст?'), answer: L('Describe purpose/function, not "image of". Empty alt for decorative. Avoid keyword stuffing.', 'Описывайте цель/функцию, не "изображение". Пустой alt для декоративных. Избегайте набивки ключевиками.') },
    { id: 'htmlcss-013', title: L('Keyboard navigation', 'Навигация с клавиатуры'), question: L('Keyboard a11y basics?', 'Основы клавиатурной a11y?'), answer: L('All functionality via keyboard. Logical tab order. No keyboard traps. Enter/Space activate.', 'Весь функционал с клавиатуры. Логичный порядок tab. Без ловушек фокуса. Enter/Space активируют.') },
    { id: 'htmlcss-014', title: L('Focus styles', 'Стили фокуса'), question: L('focus vs focus-visible?', 'focus vs focus-visible?'), answer: L('focus-visible shows focus ring for keyboard only. Never remove outline without replacement.', 'focus-visible показывает кольцо фокуса только для клавиатуры. Никогда не удаляйте outline без замены.'), code: ':focus-visible { outline: 2px solid #005fcc; }' },
    { id: 'htmlcss-015', title: L('ARIA roles', 'ARIA-роли'), question: L('When to use ARIA roles?', 'Когда использовать ARIA-роли?'), answer: L('Only when native semantics insufficient. Prefer native elements. First rule of ARIA: do not use ARIA.', 'Только когда нативной семантики недостаточно. Предпочитайте нативные элементы. Первое правило ARIA: не используйте ARIA.') },
    { id: 'htmlcss-016', title: L('Skip link', 'Skip-ссылка'), question: L('Skip link purpose?', 'Назначение skip-ссылки?'), answer: L('First focusable link jumps to main content. Helps keyboard/screen reader users skip nav.', 'Первая фокусируемая ссылка переносит к основному контенту. Помогает пользователям клавиатуры/скринридеров пропустить навигацию.'), code: '<a href="#main" class="skip">Skip to content</a>' },
    { id: 'htmlcss-017', title: L('Box model', 'Блочная модель'), question: L('Box model layers?', 'Слои блочной модели?'), answer: L('Content, padding, border, margin from inside out. Total width = content+padding+border (unless border-box).', 'Content, padding, border, margin изнутри наружу. Общая ширина = content+padding+border (кроме border-box).') },
    { id: 'htmlcss-018', title: L('box-sizing', 'box-sizing'), question: L('border-box benefit?', 'Польза border-box?'), answer: L('Includes padding and border in width/height. Easier layouts. Set globally.', 'Включает padding и border в width/height. Упрощает вёрстку. Задавайте глобально.'), code: '* { box-sizing: border-box; }' },
    { id: 'htmlcss-019', title: L('Margin collapsing', 'Схлопывание margin'), question: L('When margins collapse?', 'Когда margin схлопываются?'), answer: L('Vertical margins of block siblings collapse to larger. Prevent with padding/border, flex/grid, or BFC.', 'Вертикальные margin блочных соседей схлопываются до большего. Предотвращайте padding/border, flex/grid или BFC.') },
    { id: 'htmlcss-020', title: L('Specificity weights', 'Веса специфичности'), question: L('Specificity order?', 'Порядок специфичности?'), answer: L('Inline (1,0,0,0) > ID (0,1,0,0) > class/attr/pseudo-class (0,0,1,0) > element/pseudo-element (0,0,0,1).', 'Inline (1,0,0,0) > ID (0,1,0,0) > class/attr/pseudo-class (0,0,1,0) > element/pseudo-element (0,0,0,1).') },
    { id: 'htmlcss-021', title: L('Cascade order', 'Порядок каскада'), question: L('Cascade resolution steps?', 'Шаги разрешения каскада?'), answer: L('Origin/importance, then specificity, then source order. Later equal specificity wins.', 'Происхождение/важность, затем специфичность, затем порядок источника. При равной специфичности побеждает позднейший.') },
    { id: 'htmlcss-022', title: L('Inheritance', 'Наследование'), question: L('Inherited properties?', 'Наследуемые свойства?'), answer: L('color, font-*, line-height, text-* inherit. Box properties do not. Use inherit keyword.', 'color, font-*, line-height, text-* наследуются. Box-свойства нет. Используйте ключевое слово inherit.') },
    { id: 'htmlcss-023', title: L('!important', 'Важность !important'), question: L('!important guidance?', 'Рекомендации по !important?'), answer: L('Avoid in app CSS. Use for utilities/overrides. Increases maintenance and specificity wars.', 'Избегайте в прикладном CSS. Используйте для утилит/переопределений. Увеличивает обслуживание и войны специфичности.') },
    { id: 'htmlcss-024', title: L('Custom properties cascade', 'Каскад custom properties'), question: L('Do CSS variables inherit?', 'Наследуются ли CSS-переменные?'), answer: L('Custom properties are inherited by default and cascaded. Scope with selector. Fallback via var(--x, default).', 'Пользовательские свойства наследуются по умолчанию и каскадируются. Область через селектор. Запасной через var(--x, default).') },
    { id: 'htmlcss-025', title: L('Flex container', 'Flex-контейнер'), question: L('display: flex effects?', 'Эффекты display: flex?'), answer: L('Children become flex items. Main/cross axes. Enables alignment, distribution, wrapping. 1D layout.', 'Дети становятся flex-элементами. Главная/поперечная оси. Включает выравнивание, распределение, перенос. 1D-вёрстка.'), code: '.container { display: flex; }' },
    { id: 'htmlcss-026', title: L('flex-direction', 'flex-direction'), question: L('flex-direction values?', 'Значения flex-direction?'), answer: L('row, row-reverse, column, column-reverse. Changes main axis direction.', 'row, row-reverse, column, column-reverse. Меняет направление главной оси.') },
    { id: 'htmlcss-027', title: L('flex shorthand', 'Сокращение flex'), question: L('flex: 1 meaning?', 'Что значит flex: 1?'), answer: L('flex: 1 1 0% (grow, shrink, basis). Items share space equally. Prefer over width percentages.', 'flex: 1 1 0% (grow, shrink, basis). Элементы делят пространство поровну. Предпочтительнее процентов width.') },
    { id: 'htmlcss-028', title: L('Grid container', 'Grid-контейнер'), question: L('display: grid effects?', 'Эффекты display: grid?'), answer: L('2D layout with rows and columns. Children placed into cells. Powerful for page layouts.', '2D-вёрстка со строками и колонками. Дети размещаются в ячейки. Мощно для макетов страниц.'), code: '.layout { display: grid; }' },
    { id: 'htmlcss-029', title: L('template columns/rows', 'template columns/rows'), question: L('grid-template-columns?', 'grid-template-columns?'), answer: L('Define track sizes: px, fr, auto, minmax. repeat() for DRY.', 'Задаёт размеры треков: px, fr, auto, minmax. repeat() для DRY.'), code: 'grid-template-columns: repeat(3, 1fr);' },
    { id: 'htmlcss-030', title: L('auto-fit & minmax', 'auto-fit и minmax'), question: L('Responsive grid without media queries?', 'Адаптивная сетка без media queries?'), answer: L('repeat(auto-fit, minmax(200px, 1fr)) creates fluid columns. auto-fill keeps empty tracks.', 'repeat(auto-fit, minmax(200px, 1fr)) создаёт fluid-колонки. auto-fill сохраняет пустые треки.') },
    { id: 'htmlcss-031', title: L('Absolute positioning', 'Абсолютное позиционирование'), question: L('absolute behavior?', 'Поведение absolute?'), answer: L('Removed from flow, positioned relative to nearest positioned ancestor. No space reserved.', 'Убирается из потока, позиционируется относительно ближайшего positioned-предка. Место не резервируется.') },
    { id: 'htmlcss-032', title: L('Sticky positioning', 'Липкое позиционирование'), question: L('sticky requirements?', 'Требования sticky?'), answer: L('Needs threshold (top/left). Acts relative until threshold, then fixed within parent. Parent must allow scroll.', 'Нужен порог (top/left). Ведёт себя как relative до порога, затем fixed внутри родителя. Родитель должен позволять скролл.') },
    { id: 'htmlcss-033', title: L('Containing block', 'Containing block'), question: L('What is containing block?', 'Что такое containing block?'), answer: L('Reference rectangle for absolute/fixed positioning and percentage sizes. Depends on position/transform.', 'Опорный прямоугольник для абсолютного/фиксированного позиционирования и процентных размеров. Зависит от position/transform.') },
    { id: 'htmlcss-034', title: L('Media queries', 'Media queries'), question: L('Media query syntax?', 'Синтаксис media query?'), answer: L('@media (min-width: 768px) { ... }. Combine with and/or/not. Test breakpoints.', '@media (min-width: 768px) { ... }. Комбинируйте через and/or/not. Тестируйте брейкпоинты.'), code: '@media (min-width: 768px) {\n  .nav { display: flex; }\n}' },
    { id: 'htmlcss-035', title: L('Mobile-first', 'Mobile-first'), question: L('Mobile-first approach?', 'Подход mobile-first?'), answer: L('Base styles for small screens, enhance with min-width queries. Progressive enhancement.', 'Базовые стили для маленьких экранов, улучшение через min-width. Прогрессивное улучшение.') },
    { id: 'htmlcss-036', title: L('Fluid typography', 'Fluid typography'), question: L('clamp() for responsive text?', 'clamp() для адаптивного текста?'), answer: L('font-size: clamp(min, preferred, max). Scales smoothly without many breakpoints.', 'font-size: clamp(min, preferred, max). Масштабируется плавно без множества брейкпоинтов.'), code: 'h1 { font-size: clamp(1.5rem, 4vw, 3rem); }' },
    { id: 'htmlcss-037', title: L('Viewport units', 'Viewport-единицы'), question: L('vw/vh vs dvw/dvh?', 'vw/vh vs dvw/dvh?'), answer: L('vw/vh may include scrollbar/dynamic toolbars. dvh/dvw account for dynamic viewport. Use for mobile full-height.', 'vw/vh могут включать скроллбар/динамические тулбары. dvh/dvw учитывают динамический вьюпорт. Используйте для полной высоты на мобилке.') },
    { id: 'htmlcss-038', title: L('srcset & sizes', 'srcset и sizes'), question: L('srcset for resolution?', 'srcset для разрешения?'), answer: L('Provide multiple files and sizes. Browser picks based on DPR and viewport. Saves bandwidth.', 'Предоставляйте несколько файлов и размеров. Браузер выбирает по DPR и вьюпорту. Экономит трафик.') },
    { id: 'htmlcss-039', title: L('Prefers color scheme', 'Предпочтение цветовой схемы'), question: L('Dark mode via CSS?', 'Тёмная тема через CSS?'), answer: L('@media (prefers-color-scheme: dark). Also toggle class/data-attribute for manual switch.', '@media (prefers-color-scheme: dark). Также переключайте class/data-attribute для ручного выбора.') },
    { id: 'htmlcss-040', title: L('rem & em', 'rem и em'), question: L('rem vs em?', 'rem vs em?'), answer: L('rem relative to root font-size (predictable). em relative to element font-size (compounds in nesting).', 'rem относительно корневого font-size (предсказуемо). em относительно font-size элемента (накапливается при вложенности).') },
    { id: 'htmlcss-041', title: L('Custom properties syntax', 'Синтаксис custom properties'), question: L('Define and use CSS variable?', 'Определить и использовать CSS-переменную?'), answer: L('--name: value; use var(--name). Names case-sensitive, must start with --.', '--name: value; используйте var(--name). Имена чувствительны к регистру, должны начинаться с --.'), code: ':root { --brand: #005fcc; }\na { color: var(--brand); }' },
    { id: 'htmlcss-042', title: L('Variable fallback', 'Запасное значение переменной'), question: L('var() fallback?', 'Запасное значение var()?'), answer: L('var(--x, fallback) and nested var. Fallback only if variable undefined, not invalid.', 'var(--x, fallback) и вложенные var. Запасное срабатывает только если переменная не определена, не если невалидна.') },
    { id: 'htmlcss-043', title: L('Theming with variables', 'Темизация через переменные'), question: L('Theme via custom properties?', 'Темизация через custom properties?'), answer: L('Define tokens on :root and override under [data-theme]. Switch attribute. Runtime changeable.', 'Определяйте токены на :root и переопределяйте под [data-theme]. Переключайте атрибут. Изменяемо в runtime.') },
    { id: 'htmlcss-044', title: L('Updating variables via JS', 'Обновление переменных через JS'), question: L('Change CSS var from JS?', 'Изменить CSS-переменную из JS?'), answer: L('element.style.setProperty("--x", value). Great for dynamic theming/animation.', 'element.style.setProperty("--x", value). Отлично для динамической темизации/анимации.'), code: 'el.style.setProperty("--hue", "200");' },
    { id: 'htmlcss-045', title: L('@property rule', 'Правило @property'), question: L('@property for typed variables?', '@property для типизированных переменных?'), answer: L('Registers custom property with syntax, inherits, initial-value. Enables animating variables.', 'Регистрирует пользовательское свойство с syntax, inherits, initial-value. Позволяет анимировать переменные.'), code: '@property --angle {\n  syntax: "<angle>";\n  inherits: false;\n  initial-value: 0deg;\n}' },
    { id: 'htmlcss-046', title: L('Transitions', 'Переходы'), question: L('transition syntax?', 'Синтаксис transition?'), answer: L('transition: property duration timing-function delay. Use for state changes. Animate transform/opacity.', 'transition: property duration timing-function delay. Используйте для изменения состояния. Анимируйте transform/opacity.'), code: 'button { transition: background 200ms ease; }' },
    { id: 'htmlcss-047', title: L('Keyframes', 'Ключевые кадры'), question: L('@keyframes usage?', 'Использование @keyframes?'), answer: L('Define animation stages. Apply via animation property. Use for complex/looping motion.', 'Определяйте этапы анимации. Применяйте через свойство animation. Используйте для сложного/циклического движения.'), code: '@keyframes spin { to { transform: rotate(360deg); } }' },
    { id: 'htmlcss-048', title: L('Transform', 'Трансформации'), question: L('transform property?', 'Свойство transform?'), answer: L('translate, rotate, scale, skew. GPU-accelerated. Does not affect layout. Combine functions.', 'translate, rotate, scale, skew. Ускоряется GPU. Не влияет на layout. Комбинируйте функции.'), code: '.card { transform: translateY(-4px) scale(1.02); }' },
    { id: 'htmlcss-049', title: L('Timing functions', 'Функции времени'), question: L('Easing functions?', 'Функции плавности?'), answer: L('ease, linear, ease-in/out, cubic-bezier(). Use ease-out for entrances, ease-in for exits.', 'ease, linear, ease-in/out, cubic-bezier(). Используйте ease-out для появления, ease-in для исчезновения.') },
    { id: 'htmlcss-050', title: L('Transition performance', 'Производительность переходов'), question: L('Cheap properties to animate?', 'Дешёвые для анимации свойства?'), answer: L('transform and opacity are compositor-only. Avoid animating layout (width, top, margin).', 'transform и opacity только композитор. Избегайте анимации layout (width, top, margin).') },
    { id: 'htmlcss-051', title: L('Hover & focus pseudo', 'Псевдоклассы hover/focus'), question: L(':hover/:focus/:focus-visible?', ':hover/:focus/:focus-visible?'), answer: L(':hover mouse hover. :focus any focus. :focus-visible keyboard focus. Use for accessible focus rings.', ':hover наведение мыши. :focus любой фокус. :focus-visible фокус с клавиатуры. Используйте для доступных колец фокуса.') },
    { id: 'htmlcss-052', title: L(':not & :has', 'Псевдоклассы :not и :has'), question: L(':has parent selection?', ':has выбор родителя?'), answer: L(':not excludes. :has selects parent containing matching child. Powerful, replaces JS in many cases.', ':not исключает. :has выбирает родителя, содержащего подходящего потомка. Мощно, заменяет JS во многих случаях.') },
    { id: 'htmlcss-053', title: L('Pseudo-elements', 'Псевдоэлементы'), question: L('::before/::after?', '::before/::after?'), answer: L('Insert generated content. Requires content property. Great for decorations/icons. Not in DOM.', 'Вставляют генерируемый контент. Требуют свойство content. Отлично для декора/иконок. Не в DOM.') },
    { id: 'htmlcss-054', title: L('State pseudo classes', 'Состояния псевдоклассов'), question: L(':checked/:disabled/:valid?', ':checked/:disabled/:valid?'), answer: L('Style based on form state. :valid/:invalid for validation. :checked for toggles.', 'Стилизация по состоянию формы. :valid/:invalid для валидации. :checked для переключателей.') },
    { id: 'htmlcss-055', title: L('Stacking context creation', 'Создание контекста наложения'), question: L('What creates stacking context?', 'Что создаёт контекст наложения?'), answer: L('position+ z-index, opacity<1, transform, filter, will-change, isolation:isolate, flex/grid child with z-index, contain.', 'position+z-index, opacity<1, transform, filter, will-change, isolation:isolate, ребёнок flex/grid с z-index, contain.') },
    { id: 'htmlcss-056', title: L('Container type', 'Тип контейнера'), question: L('container-type values?', 'Значения container-type?'), answer: L('inline-size for width queries, size for width+height. Set on parent to enable @container.', 'inline-size для запросов по ширине, size для ширины+высоты. Задавайте на родителе для включения @container.') },
    { id: 'htmlcss-057', title: L('@container query', 'Запрос @container'), question: L('@container syntax?', 'Синтаксис @container?'), answer: L('@container (min-width: 400px) { ... }. Styles based on container size.', '@container (min-width: 400px) { ... }. Стили по размеру контейнера.'), code: '@container (min-width: 400px) {\n  .card { flex-direction: row; }\n}' },
    { id: 'htmlcss-058', title: L('Utility-first', 'Utility-first'), question: L('Utility-first CSS?', 'Utility-first CSS?'), answer: L('Compose styles from small utility classes. Tailwind. Fast, consistent, but verbose markup.', 'Собирайте стили из маленьких utility-классов. Tailwind. Быстро, последовательно, но многословная разметка.') },
    { id: 'htmlcss-059', title: L('Tailwind responsive prefixes', 'Адаптивные префиксы Tailwind'), question: L('Tailwind responsive prefixes?', 'Адаптивные префиксы Tailwind?'), answer: L('sm:, md:, lg:, xl:, 2xl: apply at breakpoints. Mobile-first by default.', 'sm:, md:, lg:, xl:, 2xl: применяются на брейкпоинтах. Mobile-first по умолчанию.') },
    { id: 'htmlcss-060', title: L('Critical CSS', 'Критический CSS'), question: L('Critical CSS concept?', 'Концепция критического CSS?'), answer: L('Inline above-the-fold CSS in head, defer rest. Improves first paint. Automate extraction.', 'Встраивайте above-the-fold CSS в head, откладывайте остальное. Улучшает first paint. Автоматизируйте извлечение.') },
  ],
  quiz: [
    {
      id: 'htmlcss-q01',
      question: L('Why use semantic elements such as nav, section and article instead of generic div wrappers?', 'Почему семантические элементы nav, section и article лучше обычных обёрток div?'),
      options: [
        L('They carry meaning for screen readers, search engines and browser features', 'Они несут смысл для скринридеров, поисковиков и возможностей браузера'),
        L('They load faster because the browser parses fewer attributes', 'Они грузятся быстрее, потому что браузер разбирает меньше атрибутов'),
        L('They automatically apply the styles of your CSS framework', 'Они автоматически применяют стили вашего CSS-фреймворка'),
        L('They remove the need for headings, labels and alt text', 'Они снимают необходимость в заголовках, подписях и alt-тексте'),
      ],
      correctIndex: 0,
      explanation: L(
        'A div only describes layout, while a semantic element also tells assistive technology what the content is, and that is what screen readers, search engines and browser features rely on. Parsing speed is not the reason, the CSS still has to be written by hand, and headings, labels and alt text do not disappear.',
        'div описывает только раскладку, а семантический элемент ещё и сообщает вспомогательным технологиям, что это за содержимое — на это опираются скринридеры, поисковики и возможности браузера. Скорость разбора тут ни при чём, стили всё равно пишутся вручную, а заголовки, подписи и alt-текст никуда не исчезают.'
      ),
    },
    {
      id: 'htmlcss-q02',
      question: L('How many main elements should a normal page contain, and what does main give you?', 'Сколько элементов main должно быть на обычной странице и что он даёт?'),
      options: [
        L('As many as needed, since main is only a styling hook', 'Сколько угодно, ведь main — это просто крючок для стилей'),
        L('None, because header already covers the page content', 'Ни одного, ведь header уже покрывает содержимое страницы'),
        L('Exactly one, acting as the main landmark for skipping to the page content', 'Ровно один: это ландмарк основного содержимого, на который можно перескочить'),
        L('One per section, so screen readers can skip between them', 'По одному на секцию, чтобы скринридер мог перепрыгивать между ними'),
      ],
      correctIndex: 2,
      explanation: L(
        'main is a landmark that marks the unique primary content of the document, so a page should have exactly one. Several main elements create several main landmarks and confuse navigation, none leaves the page without the main landmark, and header is a banner, not a content wrapper.',
        'main — это ландмарк, который отмечает единственное основное содержимое документа, поэтому на странице он должен быть один. Несколько main создают несколько одинаковых ландмарков и путают навигацию, их отсутствие оставляет страницу без главного ландмарка, а header — это баннер, а не обёртка контента.'
      ),
    },
    {
      id: 'htmlcss-q03',
      question: L('When should you use article rather than section?', 'Когда нужно использовать article, а не section?'),
      options: [
        L('For any group of content that has a heading, regardless of reuse', 'Для любой группы содержимого с заголовком, независимо от переиспользования'),
        L('For self-contained, reusable content such as a blog post that could be syndicated alone', 'Для самодостаточного переиспользуемого контента, например поста, который можно опубликовать отдельно'),
        L('For the main content area of the page, as an alias of main', 'Для основного содержимого страницы, как замена main'),
        L('For navigation links, as a replacement for nav', 'Для навигационных ссылок, как замена nav'),
      ],
      correctIndex: 1,
      explanation: L(
        'article means a standalone unit that makes sense on its own and can be reused elsewhere, while section is a thematic grouping with a heading that depends on its context. Using section for everything turns the page into a flat list of sections, and article does not replace main or nav.',
        'article — это самодостаточная единица, которая имеет смысл отдельно и может быть переиспользована, а section — тематическая группа с заголовком, зависящая от контекста. Если использовать section для всего, страница превратится в плоский список секций, а article не заменяет main и nav.'
      ),
    },
    {
      id: 'htmlcss-q04',
      question: L('What is figure with figcaption used for?', 'Для чего используется figure вместе с figcaption?'),
      options: [
        L('Grouping a form and its validation messages', 'Для группировки формы и её сообщений валидации'),
        L('Marking up a table that repeats on scroll', 'Для разметки таблицы, которая повторяется при прокрутке'),
        L('Adding a visible tooltip to an image', 'Для добавления видимой подсказки к изображению'),
        L('Wrapping media or a self-contained illustration together with its caption', 'Чтобы обернуть медиа или самостоятельную иллюстрацию вместе с подписью'),
      ],
      correctIndex: 3,
      explanation: L(
        'figure is a self-contained referenced unit such as an image, a diagram or a code sample, and figcaption provides its caption. It has nothing to do with forms, scrolling tables or tooltips, and the caption itself stays optional.',
        'figure — это самодостаточный упомянутый элемент вроде изображения, диаграммы или примера кода, а figcaption даёт его подпись. К формам, прокручиваемым таблицам и подсказкам он отношения не имеет, а сама подпись необязательна.'
      ),
    },
    {
      id: 'htmlcss-q05',
      question: L('What do details and summary give you that a custom accordion built from div and button does not?', 'Что дают details и summary по сравнению с самодельным аккордеоном на div и button?'),
      options: [
        L('A built-in disclosure widget with a native toggle that works without JavaScript', 'Встроенный виджет раскрытия с нативным переключателем, работающим без JavaScript'),
        L('Animated height transitions between the open and closed states', 'Анимированные переходы высоты между открытым и закрытым состоянием'),
        L('Persistent state between page reloads', 'Сохранение состояния между перезагрузками страницы'),
        L('A single open section enforced across the whole page', 'Гарантию, что по всей странице открыта только одна секция'),
      ],
      correctIndex: 0,
      explanation: L(
        'details and summary are native disclosure widgets: the browser renders the toggle, exposes the open state to assistive technology and everything works with zero JavaScript. They do not animate, they do not remember their state between reloads and they do not enforce exclusive opening.',
        'details и summary — нативные виджеты раскрытия: браузер сам рисует переключатель, отдаёт состояние открытия вспомогательным технологиям, и всё работает вообще без JavaScript. Они не анимируются, не помнят состояние между перезагрузками и не делают открытие взаимоисключающим.'
      ),
    },
    {
      id: 'htmlcss-q06',
      question: L('What does showModal on a dialog element add over the open attribute?', 'Что даёт showModal у элемента dialog по сравнению с атрибутом open?'),
      options: [
        L('A slide-in animation from the side of the screen', 'Анимацию выезда сбоку экрана'),
        L('A modal top layer with a backdrop, focus trapping and closing on Escape', 'Модальный верхний слой с подложкой, ловушкой фокуса и закрытием по Escape'),
        L('The ability to render the dialog inside a form without a form element', 'Возможность показать диалог внутри формы без самого элемента form'),
        L('Automatic serialization of the values inside the dialog', 'Автоматическую сериализацию значений внутри диалога'),
      ],
      correctIndex: 1,
      explanation: L(
        'showModal puts the dialog into the top layer: it becomes modal, the background goes inert, a backdrop appears, focus stays inside and Escape closes it. The open attribute only shows the dialog in the normal flow without any of that behaviour.',
        'showModal помещает dialog в верхний слой: окно становится модальным, фон уходит в inert, появляется подложка, фокус остаётся внутри, а Escape закрывает окно. Атрибут open просто показывает диалог в обычном потоке без всего этого.'
      ),
    },
    {
      id: 'htmlcss-q07',
      question: L('What is the correct practice for headings on a page?', 'Какая практика заголовков на странице правильная?'),
      options: [
        L('Use h1, h2 and h3 in any order, because the level only controls the font size', 'Использовать h1, h2 и h3 в любом порядке, ведь уровень задаёт только размер шрифта'),
        L('Use an h1 for every section so each one is styled independently', 'Использовать h1 в каждой секции, чтобы каждая стилизовалась отдельно'),
        L('One h1 per page and no skipped levels; use CSS for visual size, not heading tags', 'Один h1 на страницу и без пропусков уровней; визуальный размер задаёт CSS, а не тег заголовка'),
        L('Skip levels to match the visual hierarchy of the design', 'Пропускать уровни, чтобы повторить визуальную иерархию дизайна'),
      ],
      correctIndex: 2,
      explanation: L(
        'The heading level describes the structure of the document, so a page has one h1 and levels that never skip, while the visual size is a styling decision made in CSS. Skipping levels or repeating h1 for each section breaks the outline that screen readers use to navigate.',
        'Уровень заголовка описывает структуру документа: на странице один h1, уровни не пропускаются, а визуальный размер решается в CSS. Пропуск уровней или повторный h1 в каждой секции ломают структуру, по которой скринридер навигирует.'
      ),
    },
    {
      id: 'htmlcss-q08',
      question: L('Why prefer input type="email" over type="text" for an email field?', 'Почему для поля email лучше input type="email", а не type="text"?'),
      options: [
        L('It makes the value impossible to spoof in JavaScript', 'Он делает значение невозможно подменить в JavaScript'),
        L('It automatically sanitizes the value before it is sent to the server', 'Он сам очищает значение перед отправкой на сервер'),
        L('It prevents the field from being autofilled by the browser', 'Он запрещает браузеру автозаполнять поле'),
        L('It gives mobile users the right keyboard and enables built-in format validation', 'Он даёт мобильным пользователям нужную клавиатуру и включает встроенную проверку формата'),
      ],
      correctIndex: 3,
      explanation: L(
        'A specific type tells the browser what the value is: it shows the matching mobile keyboard and lets the browser check the format natively, together with attributes like required or pattern. It does not sanitize the value, cannot stop spoofing and does not block autofill.',
        'Конкретный type сообщает браузеру, что за значение: показывается подходящая мобильная клавиатура и работает встроенная проверка формата вместе с атрибутами required и pattern. Значение он не санитизирует, подмену в JavaScript не предотвращает и автозаполнение не блокирует.'
      ),
    },
    {
      id: 'htmlcss-q09',
      question: L('How do you correctly associate a label with an input field?', 'Как правильно связать label с полем ввода?'),
      options: [
        L('Give the label a for attribute with the id of the input, or wrap the input inside the label', 'Задать label атрибут for с id поля или обернуть само поле в label'),
        L('Give the label a name attribute matching the input name', 'Задать label атрибут name, совпадающий с name поля'),
        L('Place a placeholder with the same text as the label', 'Поставить placeholder с тем же текстом, что и подпись'),
        L('Give both elements the same class attribute', 'Задать обоим элементам одинаковый атрибут class'),
      ],
      correctIndex: 0,
      explanation: L(
        'The link between a label and its control is the for/id pair, and wrapping the control inside the label works too. name identifies the value in the submitted data and has nothing to do with labelling, a placeholder disappears while typing and is not a reliable accessible name, and a class is not an association.',
        'Связь label и его поля — это пара for/id, а обёртка поля в label тоже работает. name идентифицирует значение в отправленных данных и к подписи отношения не имеет, placeholder исчезает при вводе и ненадёжен как доступное имя, а class связью не является.'
      ),
    },
    {
      id: 'htmlcss-q10',
      question: L('A button inside a form defaults to type="submit". Why is it worth setting the type explicitly?', 'Кнопка внутри формы по умолчанию имеет type="submit". Почему стоит задавать тип явно?'),
      options: [
        L('Because type="submit" is not supported by modern browsers', 'Потому что type="submit" не поддерживается современными браузерами'),
        L('Because a click would submit the form, which is wrong for buttons that only trigger JavaScript', 'Потому что клик отправит форму, а это неверно для кнопок, которые только запускают JavaScript'),
        L('Because only type="button" can be styled with CSS', 'Потому что стилизовать через CSS можно только type="button"'),
        L('Because submit buttons are excluded from the tab order', 'Потому что submit-кнопки выпадают из порядка табуляции'),
      ],
      correctIndex: 1,
      explanation: L(
        'Inside a form the default type is submit, so any extra button (a toggle, a delete icon, a reveal control) submits the page by accident. Set type="button" on those. The type attribute is fully supported, and styling and focus order do not depend on it.',
        'Внутри формы тип по умолчанию — submit, поэтому любая лишняя кнопка (переключатель, иконка удаления, раскрытие) по нажатию случайно отправляет страницу. Таким кнопкам ставят type="button". Атрибут type полностью поддерживается, а от него не зависят ни стили, ни порядок фокуса.'
      ),
    },
    {
      id: 'htmlcss-q11',
      question: L('What should the alt attribute contain for an image that carries information?', 'Что должно содержать свойство alt у изображения, несущего информацию?'),
      options: [
        L('A list of keywords to help search engines rank the page', 'Список ключевых слов, чтобы повысить позиции страницы в поиске'),
        L('The file name and the pixel dimensions of the image', 'Имя файла и размеры изображения в пикселях'),
        L('A description of the purpose or meaning of the image in that context', 'Описание назначения или смысла изображения в данном контексте'),
        L('The text "image" so screen readers announce that an image is present', 'Слово "изображение", чтобы скринридер сообщил о наличии картинки'),
      ],
      correctIndex: 2,
      explanation: L(
        'alt is the accessible name of the image and should say what it communicates in context, or be empty for purely decorative images. Keyword stuffing, file names and pixel sizes are not descriptions, and "image" adds nothing for a screen reader user.',
        'alt — это доступное имя изображения, и в нём нужно сказать, что картинка сообщает в этом контексте; для чисто декоративных alt пустой. Набивка ключевиками, имена файлов и размеры в пикселях — не описание, а слово "изображение" ничего не добавляет пользователю скринридера.'
      ),
    },
    {
      id: 'htmlcss-q12',
      question: L('Which practice guarantees that a custom widget can be used with a keyboard?', 'Что гарантирует, что кастомный виджет можно использовать с клавиатуры?'),
      options: [
        L('Attach click handlers only, because a mouse is always available', 'Только обработчики клика, ведь мышь всегда доступна'),
        L('Use div elements with cursor: pointer, since they are focusable by default', 'Элементы div с cursor: pointer, ведь они и так получают фокус'),
        L('Add a click handler on the parent, so it works for all child elements', 'Обработчик клика на родителе, чтобы работало для всех дочерних элементов'),
        L('Make it focusable, show a visible focus indicator and handle Enter and Space', 'Сделать его фокусируемым, показать видимый индикатор фокуса и обработать Enter и Space'),
      ],
      correctIndex: 3,
      explanation: L(
        'A keyboard-operable widget must be reachable with Tab, show where the focus is and respond to Enter and Space; div elements are not focusable without tabindex and do not emit activation key events. Mouse-only handlers make the feature unreachable for keyboard and screen reader users.',
        'Виджет, управляемый с клавиатуры, должен получать фокус по Tab, показывать его и реагировать на Enter и Space; div без tabindex не фокусируется и не выдаёт клавиши активации. Обработчики только мыши делают функцию недоступной для пользователей клавиатуры и скринридера.'
      ),
    },
    {
      id: 'htmlcss-q13',
      question: L('What is the difference between :focus and :focus-visible?', 'Чем отличаются :focus и :focus-visible?'),
      options: [
        L(':focus matches any focused element, :focus-visible matches mainly keyboard-driven focus', ':focus срабатывает на любом сфокусированном элементе, :focus-visible — в основном на клавиатурном фокусе'),
        L('They are identical, and :focus-visible is only an older name for :focus', 'Они одинаковые, а :focus-visible — просто старое имя :focus'),
        L(':focus-visible applies only to links, and :focus applies to form fields', ':focus-visible работает только на ссылках, а :focus — на полях формы'),
        L(':focus-visible works in every browser, and :focus is deprecated', ':focus-visible работает во всех браузерах, а :focus устарел'),
      ],
      correctIndex: 0,
      explanation: L(
        ':focus applies whenever an element has focus, including after a mouse click, while :focus-visible matches when the browser decides to show the focus ring, which is typically for keyboard interaction. That keeps the ring for keyboard users without flashing it after every click, and neither selector is deprecated.',
        ':focus срабатывает, когда элемент получил фокус, в том числе после клика мышью, а :focus-visible — когда браузер решил показать кольцо фокуса, обычно при работе с клавиатурой. Так кольцо остаётся для клавиатуры и не мигает после каждого клика, и ни один из селекторов не устарел.'
      ),
    },
    {
      id: 'htmlcss-q14',
      question: L('According to the first rule of ARIA, when should you add ARIA roles and attributes?', 'Согласно первому правилу ARIA, когда стоит добавлять роли и атрибуты ARIA?'),
      options: [
        L('On every interactive element, to be explicit about its behaviour', 'На каждый интерактивный элемент, чтобы явно описать его поведение'),
        L('Only when no native element provides the semantics you need', 'Только когда ни один нативный элемент не даёт нужной семантики'),
        L('Only on custom elements, because native elements ignore ARIA', 'Только на кастомных элементах, потому что нативные игнорируют ARIA'),
        L('Whenever the design calls for a custom widget, to describe it fully', 'Когда дизайн требует кастомного виджета, чтобы описать его полностью'),
      ],
      correctIndex: 1,
      explanation: L(
        'The first rule of ARIA is: do not use ARIA if a native element gives you the role and behaviour you need, because native semantics are always better supported. Native elements do accept ARIA, and ARIA is a last resort for genuinely custom widgets, not a way to describe standard ones.',
        'Первое правило ARIA: не используйте ARIA, если нативный элемент даёт нужную роль и поведение — нативная семантика поддерживается всегда лучше. Нативные элементы ARIA принимают, и ARIA — последнее средство для действительно кастомных виджетов, а не способ описывать стандартные.'
      ),
    },
    {
      id: 'htmlcss-q15',
      question: L('What is the purpose of a skip link at the top of the page?', 'Для чего нужна skip-ссылка в начале страницы?'),
      options: [
        L('It hides the navigation from users who have not logged in', 'Она прячет навигацию от пользователей, которые не вошли в аккаунт'),
        L('It loads the main content faster by prefetching it', 'Она ускоряет загрузку основного содержимого за счёт предзагрузки'),
        L('It lets keyboard and screen reader users jump straight to the main content', 'Она позволяет пользователям клавиатуры и скринридера сразу перейти к основному содержимому'),
        L('It provides a fallback for pages where main is missing', 'Она служит запасным вариантом для страниц без элемента main'),
      ],
      correctIndex: 2,
      explanation: L(
        'A skip link is the first focusable element and jumps to the main landmark, so users do not have to tab through the whole navigation on every page. It does not hide navigation, it does not prefetch anything and it is not a substitute for a correct main element.',
        'Skip-ссылка — первый фокусируемый элемент, который переводит к ландмарку main, чтобы пользователю не приходилось каждый раз проходить всю навигацию табом. Она не прячет навигацию, ничего не предзагружает и не заменяет корректный элемент main.'
      ),
    },
    {
      id: 'htmlcss-q16',
      question: L('With the default content-box sizing, a div with width: 200px, padding: 10px and border: 2px occupies how much horizontal space?', 'При стандартном content-box блок div с width: 200px, padding: 10px и border: 2px займёт сколько по горизонтали?'),
      options: [
        L('200px, because width always covers the whole border box', '200px, потому что width всегда описывает весь блок с рамкой'),
        L('220px, because the border is included but the padding is not', '220px, потому что рамка входит в ширину, а padding нет'),
        L('180px, because the padding is subtracted from the declared width', '180px, потому что padding вычитается из заданной ширины'),
        L('224px, because padding and border are added on top of the declared width', '224px, потому что padding и border добавляются к заданной ширине'),
      ],
      correctIndex: 3,
      explanation: L(
        'With content-box the width applies to the content area only, so the border box is 200 + 10 + 10 + 2 + 2 = 224px. Setting box-sizing: border-box makes the declared width include padding and border, which is why most projects apply it globally.',
        'При content-box ширина относится только к содержимому, поэтому внешний размер равен 200 + 10 + 10 + 2 + 2 = 224px. При box-sizing: border-box в ширину входят padding и border — поэтому в большинстве проектов его задают глобально.'
      ),
    },
    {
      id: 'htmlcss-q17',
      question: L('Two block siblings have margin-bottom: 20px and margin-top: 30px. What is the gap between them?', 'У двух блочных соседей margin-bottom: 20px и margin-top: 30px. Каким будет промежуток между ними?'),
      options: [
        L('30px, because the vertical margins collapse to the larger value', '30px, потому что вертикальные margin схлопываются до большего значения'),
        L('50px, because margins always add up', '50px, потому что margin всегда складываются'),
        L('20px, because only the bottom margin of the first element counts', '20px, потому что учитывается только нижний margin первого элемента'),
        L('10px, because the smaller margin is subtracted from the larger', '10px, потому что меньший margin вычитается из большего'),
      ],
      correctIndex: 0,
      explanation: L(
        'Vertical margins of block-level siblings collapse into a single gap equal to the larger of the two, so 20 and 30 become 30. Margin collapsing does not happen between flex and grid items, and it can be prevented with padding, a border, or by establishing a new block formatting context.',
        'Вертикальные margin блочных соседей схлопываются в один разрыв, равный большему из них, поэтому 20 и 30 превращаются в 30. Между элементами flex и grid схлопывания нет, а предотвратить его можно padding, рамкой или новым блочным контекстом форматирования.'
      ),
    },
    {
      id: 'htmlcss-q18',
      question: L('Which selector has the highest specificity?', 'У какого селектора самая высокая специфичность?'),
      options: [
        L('.card p', '.card p'),
        L('#main .card p', '#main .card p'),
        L('main p', 'main p'),
        L('p', 'p'),
      ],
      correctIndex: 1,
      explanation: L(
        'Specificity is compared as a tuple of ids, then classes, attributes and pseudo-classes, then elements and pseudo-elements: #main .card p is 1-1-1, .card p is 0-1-1, main p is 0-0-2 and p is 0-0-1. A single id outweighs any number of classes.',
        'Специфичность сравнивается как набор: сначала id, затем классы с атрибутами и псевдоклассами, затем элементы с псевдоэлементами: #main .card p — это 1-1-1, .card p — 0-1-1, main p — 0-0-2, p — 0-0-1. Один id перевешивает любое количество классов.'
      ),
    },
    {
      id: 'htmlcss-q19',
      question: L('Two rules have the same specificity and both apply to the same element. Which one wins?', 'Два правила имеют одинаковую специфичность и оба подходят к элементу. Какое побеждает?'),
      options: [
        L('The one that appears first in the source order', 'То, которое стоит раньше в исходном коде'),
        L('The one that comes from the inline style attribute', 'То, которое пришло из атрибута style'),
        L('The one that appears later in the source order', 'То, которое стоит позже в исходном коде'),
        L('The one with the shorter selector', 'То, у которого селектор короче'),
      ],
      correctIndex: 2,
      explanation: L(
        'The cascade resolves origin and importance first, then specificity, then source order, so with equal specificity the later declaration wins. An inline style is not part of that tie: it has a higher specificity by definition.',
        'Каскад сначала учитывает происхождение и важность, затем специфичность, затем порядок в исходниках, поэтому при равной специфичности побеждает более позднее объявление. Inline-стиль в это равенство не входит: у него специфичность выше по определению.'
      ),
    },
    {
      id: 'htmlcss-q20',
      question: L('Which of these properties is inherited by default?', 'Какое из этих свойств наследуется по умолчанию?'),
      options: [
        L('padding', 'padding'),
        L('border', 'border'),
        L('margin', 'margin'),
        L('color', 'color'),
      ],
      correctIndex: 3,
      explanation: L(
        'Text-related properties such as color, font-family, line-height and text-align are inherited, while box properties like padding, border and margin are not: a child starts with its own value. You can always force inheritance with the inherit keyword.',
        'Текстовые свойства — color, font-family, line-height, text-align — наследуются, а блочные вроде padding, border и margin нет: у дочернего элемента своё значение. Принудительно наследовать можно ключевым словом inherit.'
      ),
    },
    {
      id: 'htmlcss-q21',
      question: L('What is the main reason to avoid !important in application CSS?', 'Почему в прикладном CSS стоит избегать !important?'),
      options: [
        L('It overrides specificity and author intent, so later fixes stop working and debugging gets harder', 'Он перебивает специфичность и замысел автора, поэтому последующие правки перестают работать, а отладка усложняется'),
        L('It is not supported by any browser engine', 'Его не поддерживает ни один движок браузера'),
        L('It prevents transitions and animations from running', 'Он мешает переходам и анимациям выполняться'),
        L('It makes the element ignore the box model', 'Он заставляет элемент игнорировать блочную модель'),
      ],
      correctIndex: 0,
      explanation: L(
        '!important lifts a declaration above the normal cascade, so a later and more specific rule cannot override it, and there is no easy way to undo it later. It is fully supported, does not touch animations or layout, and it has legitimate uses such as utility overrides and third-party widget styling.',
        '!important поднимает объявление над обычным каскадом, поэтому более специфичное правило позже его уже не перебьёт, и отменить это тяжело. Он полностью поддерживается, на анимации и раскладку не влияет, а законные применения есть — утилиты и стили сторонних виджетов.'
      ),
    },
    {
      id: 'htmlcss-q22',
      question: L('Which statement about CSS custom properties is correct?', 'Какое утверждение о пользовательских свойствах CSS верно?'),
      options: [
        L('They are inherited only when declared on :root, and the name is case-insensitive', 'Они наследуются только если объявлены на :root, а имя нечувствительно к регистру'),
        L('They are inherited by default, are case-sensitive, and must be declared with a -- prefix', 'Они наследуются по умолчанию, чувствительны к регистру и объявляются с префиксом --'),
        L('They are not inherited at all and must be redeclared for every element', 'Они вообще не наследуются и должны быть объявлены для каждого элемента'),
        L('They must be declared with a var() wrapper and a fallback value', 'Их нужно объявлять с обёрткой var() и запасным значением'),
      ],
      correctIndex: 1,
      explanation: L(
        'Custom properties are ordinary inherited properties: a value declared on an ancestor reaches every descendant unless it is overridden, the names are case-sensitive and the -- prefix is mandatory. var() is used to read them and a fallback value is optional.',
        'Пользовательские свойства — обычные наследуемые: значение предка доступно всем потомкам, пока его не переопределили, имена чувствительны к регистру, а префикс -- обязателен. var() нужен для чтения, а запасное значение необязательно.'
      ),
    },
    {
      id: 'htmlcss-q23',
      question: L('What does color: var(--brand, #005fcc) do when --brand is not defined?', 'Что делает color: var(--brand, #005fcc), когда --brand не определено?'),
      options: [
        L('Falls back to #005fcc', 'Подставляет запасное значение #005fcc'),
        L('Renders the color as invalid and the declaration is dropped', 'Цвет считается недопустимым и объявление отбрасывается'),
        L('Falls back to #005fcc, and also when --brand is defined but holds an invalid value', 'Подставляет #005fcc, и в случае, когда --brand определено, но содержит недопустимое значение'),
        L('Uses the value of the --brand property defined in any stylesheet', 'Берёт значение свойства --brand из любого подключённого файла стилей'),
      ],
      correctIndex: 2,
      explanation: L(
        'The fallback in var() applies when the custom property is not defined at all. If --brand is defined but its value cannot be parsed as a color, the declaration becomes invalid at computed-value time and the property falls back to its inherited or initial value instead of the var() fallback.',
        'Запасное значение в var() применяется, когда свойство вообще не определено. Если --brand определено, но его значение не разбирается как цвет, объявление становится некорректным на этапе вычисленного значения и свойство берёт унаследованное или начальное значение, а не запасное из var().'
      ),
    },
    {
      id: 'htmlcss-q24',
      question: L('How do you usually implement a runtime theme switch with custom properties?', 'Как обычно реализуют переключение темы во время работы приложения через custom properties?'),
      options: [
        L('Rewrite every rule of the stylesheet in JavaScript when the theme changes', 'Переписывать в JavaScript каждое правило таблицы стилей при смене темы'),
        L('Set the theme through an inline style on each individual element', 'Задавать тему инлайновым стилем на каждом отдельном элементе'),
        L('Use the color property on the body and rely on inheritance to change every element', 'Задать color на body и положиться на наследование, чтобы изменить все элементы'),
        L('Define tokens on :root, override them under a selector such as [data-theme="dark"], and toggle that attribute', 'Определить токены на :root, переопределить их под селектором вроде [data-theme="dark"] и переключать этот атрибут'),
      ],
      correctIndex: 3,
      explanation: L(
        'Define the tokens once on :root, add a second block that redefines them under a theme selector, and switch that attribute on the root element from JavaScript. Everything downstream follows automatically, whereas rewriting rules or setting inline styles per element is fragile and heavy.',
        'Определите токены на :root, добавьте блок, который переопределяет их под селектором темы, и переключайте этот атрибут на корневом элементе из JavaScript. Всё остальное подхватится само, а переписывание правил и инлайновые стили на каждом элементе хрупки и тяжелы.'
      ),
    },
    {
      id: 'htmlcss-q25',
      question: L('How do you change a custom property of an element from JavaScript?', 'Как изменить пользовательское свойство элемента из JavaScript?'),
      options: [
        L('el.style.setProperty("--brand", "#ff0066")', 'el.style.setProperty("--brand", "#ff0066")'),
        L('el.style["--brand"] = "#ff0066"', 'el.style["--brand"] = "#ff0066"'),
        L('el.setAttribute("style", "--brand: #ff0066")', 'el.setAttribute("style", "--brand: #ff0066")'),
        L('el.style.brand = "#ff0066"', 'el.style.brand = "#ff0066"'),
      ],
      correctIndex: 0,
      explanation: L(
        'Custom properties are not regular style properties, so assignment through the style object does not work for them; setProperty is the API that understands custom property names. Replacing the whole style attribute throws away every other inline style, and style.brand is just an expando property.',
        'Пользовательские свойства — не обычные свойства стиля, поэтому присваивание через объект style для них не работает; нужный API — setProperty. Замена всего атрибута style затирает остальные инлайновые стили, а style.brand — просто новое поле в объекте.'
      ),
    },
    {
      id: 'htmlcss-q26',
      question: L('What does the @property rule add that a plain custom property declaration does not?', 'Что добавляет правило @property по сравнению с обычным объявлением пользовательского свойства?'),
      options: [
        L('It makes the custom property available in JavaScript without getComputedStyle', 'Делает пользовательское свойство доступным из JavaScript без getComputedStyle'),
        L('It registers the property with a syntax, an initial value and inheritance behaviour, which makes it typed and animatable', 'Регистрирует свойство с синтаксисом, начальным значением и правилом наследования, делая его типизированным и анимируемым'),
        L('It compiles the value at build time into a static CSS file', 'Компилирует значение на этапе сборки в статический CSS-файл'),
        L('It allows a custom property to be used inside a selector', 'Позволяет использовать пользовательское свойство внутри селектора'),
      ],
      correctIndex: 1,
      explanation: L(
        '@property registers the custom property: it declares a syntax type, an initial value and whether it inherits, so the browser can type-check the value and interpolate it during an animation. Plain custom properties are untyped strings and cannot be animated smoothly.',
        '@property регистрирует пользовательское свойство: объявляет тип синтаксиса, начальное значение и наследование, поэтому браузер проверяет тип и может интерполировать значение при анимации. Обычные custom properties — это безтиповые строки, и плавно анимировать их нельзя.'
      ),
    },
    {
      id: 'htmlcss-q27',
      question: L('In a flex container, what do the main axis and the cross axis depend on?', 'В flex-контейнере от чего зависят главная и поперечная оси?'),
      options: [
        L('The main axis is always horizontal and the cross axis is always vertical', 'Главная ось всегда горизонтальная, а поперечная всегда вертикальная'),
        L('Both axes follow the writing mode and ignore flex-direction', 'Обе оси следуют направлению письма и игнорируют flex-direction'),
        L('The main axis follows flex-direction, and the cross axis is perpendicular to it', 'Главная ось следует flex-direction, а поперечная идёт перпендикулярно ей'),
        L('The cross axis is defined by justify-content and the main axis by align-items', 'Поперечную ось задаёт justify-content, а главную align-items'),
      ],
      correctIndex: 2,
      explanation: L(
        'flex-direction decides the main axis and the cross axis runs perpendicular to it, which is why the same code behaves differently in row and column mode. justify-content distributes along the main axis and align-items along the cross axis, so the axis names always follow the direction, not the screen.',
        'flex-direction задаёт главную ось, а поперечная идёт перпендикулярно ей — поэтому в row и column код ведёт себя по-разному. justify-content распределяет по главной оси, align-items — по поперечной, то есть названия осей следуют за направлением, а не за экраном.'
      ),
    },
    {
      id: 'htmlcss-q28',
      question: L('What does flex: 1 expand to, and how do the flex items behave?', 'Во что раскрывается flex: 1 и как ведут себя flex-элементы?'),
      options: [
        L('flex: 1 0 auto, so items keep their content width and only grow', 'flex: 1 0 auto, поэтому элементы сохраняют ширину по содержимому и только растут'),
        L('flex: 1 1 100%, so every item is forced to the full container width', 'flex: 1 1 100%, поэтому каждый элемент растягивается на всю ширину контейнера'),
        L('flex: 0 1 auto, so items can shrink but never grow', 'flex: 0 1 auto, поэтому элементы могут сжиматься, но никогда не растут'),
        L('flex: 1 1 0%, so items share the free space equally and start from a zero basis', 'flex: 1 1 0%, поэтому элементы поровну делят свободное место и начинают с нулевой базы'),
      ],
      correctIndex: 3,
      explanation: L(
        'The one-value flex shorthand sets grow to 1, shrink to 1 and basis to 0%, so the items divide the available space equally regardless of their content. flex: 0 1 auto would forbid growing, and a basis of 100% would make every item as wide as the container.',
        'Одно-значительный flex задаёт grow: 1, shrink: 1 и basis: 0%, поэтому элементы поровну делят свободное место независимо от содержимого. flex: 0 1 auto запретил бы рост, а basis 100% сделал бы каждый элемент во всю ширину контейнера.'
      ),
    },
    {
      id: 'htmlcss-q29',
      question: L('What is the main difference between grid and flexbox?', 'В чём главное различие между grid и flexbox?'),
      options: [
        L('Grid lays out in two dimensions, rows and columns, while flexbox is one-dimensional', 'Grid раскладывает в двух измерениях, по строкам и колонкам, а flexbox одномерный'),
        L('Grid is only for page layouts and flexbox is only for components', 'Grid только для макетов страниц, а flexbox только для компонентов'),
        L('Grid items are always equal in size, while flex items are always flexible', 'Элементы grid всегда равны по размеру, а flex всегда гибкие'),
        L('Flexbox supports overlapping items, while grid does not', 'Flexbox поддерживает перекрывающиеся элементы, а grid нет'),
      ],
      correctIndex: 0,
      explanation: L(
        'Grid is a two-dimensional layout system: tracks are defined for rows and columns and items are placed into cells. Flexbox is one-dimensional and distributes items along a single axis. Grid also supports overlapping items, and flex items are not automatically equal in size.',
        'Grid — двумерная система: треки задаются для строк и колонок, элементы раскладываются по ячейкам. Flexbox одномерный и распределяет элементы вдоль одной оси. В grid элементы ещё и могут перекрываться, а размер flex-элементов не обязан быть одинаковым.'
      ),
    },
    {
      id: 'htmlcss-q30',
      question: L('What does grid-template-columns: repeat(3, 1fr) create?', 'Что создаёт grid-template-columns: repeat(3, 1fr)?'),
      options: [
        L('Three columns of 1px each with the rest of the space left empty', 'Три колонки по 1px, а всё остальное место остаётся пустым'),
        L('Three equal columns that share the available width', 'Три равные колонки, делящие доступную ширину'),
        L('Three columns sized by their content', 'Три колонки, размер которых определяется содержимым'),
        L('Three rows, because fr describes rows', 'Три строки, потому что fr описывает строки'),
      ],
      correctIndex: 1,
      explanation: L(
        'repeat(3, 1fr) declares three tracks of one fraction each, so the free space of the container is divided equally between them. The fr unit stands for a fraction of the free space, not a pixel amount, and the axis is the column axis because the property is grid-template-columns.',
        'repeat(3, 1fr) объявляет три трека по одной доле каждый, и свободное место контейнера делится между ними поровну. Единица fr — доля свободного места, а не пиксели, и ось здесь колоночная, потому что свойство называется grid-template-columns.'
      ),
    },
    {
      id: 'htmlcss-q31',
      question: L('How do auto-fit and auto-fill differ in repeat(auto-fill, minmax(200px, 1fr))?', 'Чем отличаются auto-fit и auto-fill в repeat(auto-fill, minmax(200px, 1fr))?'),
      options: [
        L('auto-fit keeps the empty tracks and auto-fill collapses them', 'auto-fit сохраняет пустые треки, а auto-fill схлопывает их'),
        L('They are aliases of each other with no behavioural difference', 'Это синонимы без разницы в поведении'),
        L('auto-fit collapses the empty tracks and stretches the remaining columns, auto-fill keeps them', 'auto-fit схлопывает пустые треки и растягивает оставшиеся колонки, auto-fill сохраняет их'),
        L('auto-fit works only with px, and auto-fill only with fr', 'auto-fit работает только с px, а auto-fill только с fr'),
      ],
      correctIndex: 2,
      explanation: L(
        'Both create as many tracks of at least 200px as fit, but auto-fill keeps the leftover empty tracks so the column count stays stable, while auto-fit collapses the empty tracks and stretches the real ones to fill the row. That is why auto-fit is the usual choice for a card grid that should grow with one card.',
        'Оба создают столько треков от 200px, сколько помещается, но auto-fill сохраняет пустые треки и число колонок не гуляет, а auto-fit схлопывает их и растягивает оставшиеся колонки на всю строку. Поэтому auto-fit обычно и выбирают для сетки карточек, которая растёт вместе с числом карточек.'
      ),
    },
    {
      id: 'htmlcss-q32',
      question: L('What does position: absolute do to an element?', 'Что делает position: absolute с элементом?'),
      options: [
        L('Keeps it in the normal flow but offsets it from its static position', 'Оставляет в потоке, но смещает относительно статической позиции'),
        L('Positions it relative to the viewport and keeps a placeholder in the flow', 'Позиционирует относительно вьюпорта и оставляет место в потоке'),
        L('Centers it in its parent both horizontally and vertically', 'Центрирует его в родителе по горизонтали и вертикали'),
        L('Takes it out of the normal flow and positions it relative to the nearest positioned ancestor', 'Вынимает из потока и позиционирует относительно ближайшего позиционированного предка'),
      ],
      correctIndex: 3,
      explanation: L(
        'An absolutely positioned element is removed from the flow, so no space is reserved for it, and its offsets are resolved against the nearest ancestor that is itself positioned. position: relative is the one that keeps the placeholder and offsets from the static position, and fixed is the one tied to the viewport.',
        'Абсолютно позиционированный элемент вынимается из потока, место под него не резервируется, а смещения считаются от ближайшего позиционированного предка. position: relative — как раз оставляет место и смещает от статической позиции, а fixed — привязан к вьюпорту.'
      ),
    },
    {
      id: 'htmlcss-q33',
      question: L('Why does position: sticky sometimes not work?', 'Почему position: sticky иногда не работает?'),
      options: [
        L('It needs a threshold such as top: 0 and an ancestor whose height allows the element to stick', 'Ему нужен порог вроде top: 0 и предок, высота которого позволяет элементу прилипать'),
        L('It only works on elements with a fixed width', 'Оно работает только у элементов с фиксированной шириной'),
        L('It requires the element to be a direct child of the body', 'Оно требует, чтобы элемент был прямым потомком body'),
        L('It is not supported by Safari', 'Его не поддерживает Safari'),
      ],
      correctIndex: 0,
      explanation: L(
        'Sticky behaves like relative until the element reaches its threshold, then it sticks inside its scrolling ancestor. Without a threshold it never triggers, and if the parent is exactly as tall as the content there is nothing to scroll past, so the element never appears to stick.',
        'Sticky ведёт себя как relative, пока элемент не достиг порога, а потом прилипает внутри прокручиваемого предка. Без порога он не срабатывает, а если родитель ровно такой же высоты, как содержимое, прокручивать мимо нечего и прилипание не видно.'
      ),
    },
    {
      id: 'htmlcss-q34',
      question: L('What determines the containing block for an absolutely positioned element?', 'Что определяет содержащий блок для абсолютно позиционированного элемента?'),
      options: [
        L('Always the body element, regardless of positioning', 'Всегда элемент body, независимо от позиционирования'),
        L('The nearest ancestor with a position other than static, and the viewport if there is none', 'Ближайший предок с position, отличным от static, а если такого нет — вьюпорт'),
        L('The parent element, even when that parent has position: static', 'Родительский элемент, даже если у него position: static'),
        L('The element that has a transform or filter applied to it', 'Элемент, к которому применены transform или filter'),
      ],
      correctIndex: 1,
      explanation: L(
        'The containing block of an absolutely positioned element is the nearest positioned ancestor, and the initial containing block (the viewport) when there is none. A plain static parent never becomes the containing block, which is why absolutely positioned children often appear to be placed against an unexpected element.',
        'Содержащим блоком абсолютно позиционированного элемента становится ближайший позиционированный предок, а если такого нет — исходный содержащий блок (вьюпорт). Обычный статический родитель им не становится, поэтому absolute-дети часто цепляются не к тому элементу.'
      ),
    },
    {
      id: 'htmlcss-q35',
      question: L('What does a mobile-first CSS setup look like?', 'Как выглядит CSS, написанный по подходу mobile-first?'),
      options: [
        L('Base styles target desktop and max-width queries override them for phones', 'Базовые стили под десктоп, а max-width запросы переопределяют их для телефонов'),
        L('One set of styles with fixed pixel widths that works on every screen', 'Один набор стилей с фиксированными пикселями, работающий на любом экране'),
        L('Base styles target small screens and min-width queries add enhancements for larger ones', 'Базовые стили под маленькие экраны, а min-width запросы добавляют улучшения для больших'),
        L('Separate stylesheets loaded conditionally for each device type', 'Отдельные таблицы стилей, подключаемые по типу устройства'),
      ],
      correctIndex: 2,
      explanation: L(
        'Mobile-first means writing the small-screen layout as the base and layering larger-screen enhancements with min-width queries, which is progressive enhancement and usually needs fewer overrides. Desktop-first with max-width queries is the opposite approach and tends to produce more overrides.',
        'Mobile-first — это базовые стили под маленькие экраны и доработка через min-width запросы для больших: прогрессивное улучшение и меньше переопределений. Desktop-first с max-width — обратный подход, в котором переопределений заметно больше.'
      ),
    },
    {
      id: 'htmlcss-q36',
      question: L('What does font-size: clamp(1.5rem, 4vw, 3rem) do?', 'Что делает font-size: clamp(1.5rem, 4vw, 3rem)?'),
      options: [
        L('It cycles the font size between 1.5rem and 3rem every four seconds', 'Он циклически меняет кегль между 1.5rem и 3rem каждые четыре секунды'),
        L('It uses 4vw as a hard maximum and ignores the other two values', 'Он берёт 4vw как жёсткий максимум и игнорирует остальные значения'),
        L('It sets exactly 4vw on every screen size', 'Он ставит ровно 4vw на любом размере экрана'),
        L('It picks a size between 1.5rem and 3rem, scaling with the viewport width at 4vw', 'Он выбирает размер между 1.5rem и 3rem, масштабируясь по ширине вьюпорта как 4vw'),
      ],
      correctIndex: 3,
      explanation: L(
        'clamp takes a minimum, a preferred value and a maximum: the font size follows 4vw while that stays between 1.5rem and 3rem and is clamped at both ends. That gives fluid typography without a breakpoint for every screen size.',
        'clamp принимает минимум, предпочтительное значение и максимум: кегль следует за 4vw, пока он в границах от 1.5rem до 3rem, и зажимается на концах. Так получается плавная типографика без брейкпоинта на каждый экран.'
      ),
    },
    {
      id: 'htmlcss-q37',
      question: L('Why do mobile layouts prefer dvh over vh for a full-height section?', 'Почему в мобильных раскладках для секции на всю высоту предпочитают dvh, а не vh?'),
      options: [
        L('dvh reflects the dynamic viewport, so the height updates as mobile browser toolbars show and hide', 'dvh отражает динамический вьюпорт, поэтому высота меняется вместе с панелями браузера'),
        L('dvh is expressed in pixels, so it never changes while scrolling', 'dvh задан в пикселях, поэтому при прокрутке не меняется'),
        L('vh ignores the safe area, while dvh adds padding for the notch', 'vh игнорирует безопасную зону, а dvh добавляет отступ под вырез'),
        L('vh does not work in mobile browsers at all', 'vh вообще не работает в мобильных браузерах'),
      ],
      correctIndex: 0,
      explanation: L(
        'vh is based on the large viewport and can include space that is actually covered by a collapsing mobile toolbar, which makes content jump. dvh tracks the viewport as it is right now, so a full-height section fits the screen; the safe area insets are a separate concern handled by env().',
        'vh считается от большого вьюпорта и может включать место, перекрытое сворачивающейся панелью браузера, из-за чего контент прыгает. dvh отражает текущий вьюпорт, поэтому секция на всю высоту помещается в экран; безопасная зона — отдельная тема, её решает env().'
      ),
    },
    {
      id: 'htmlcss-q38',
      question: L('How does srcset help with images on a responsive page?', 'Как srcset помогает с изображениями на адаптивной странице?'),
      options: [
        L('The server is forced to send every candidate and the CSS hides the rest', 'Сервер отправляет все кандидаты, а CSS прячет лишние'),
        L('The browser picks the most appropriate candidate based on device pixel ratio and viewport width', 'Браузер выбирает подходящий кандидат по плотности пикселей и ширине вьюпорта'),
        L('The browser downloads the smallest image and upscales it for high-DPI screens', 'Браузер скачивает самую маленькую картинку и растягивает её на экранах с высоким DPI'),
        L('srcset changes the image format automatically to a modern codec', 'srcset сам меняет формат картинки на современный кодек'),
      ],
      correctIndex: 1,
      explanation: L(
        'srcset lists candidate files with their widths or pixel densities and the browser downloads only the one that fits the current screen and device pixel ratio, which saves bandwidth. The sizes attribute tells it how wide the image will be displayed, so it can choose correctly before layout; the format is not changed by srcset.',
        'srcset перечисляет файлы-кандидаты с их шириной или плотностью, и браузер скачивает только подходящий под текущий экран и DPR, экономя трафик. Атрибут sizes подсказывает, какой шириной картинка будет отрисована, чтобы выбор был верным ещё до раскладки; формат srcset не меняет.'
      ),
    },
    {
      id: 'htmlcss-q39',
      question: L('What does @media (prefers-color-scheme: dark) let you do?', 'Что позволяет @media (prefers-color-scheme: dark)?'),
      options: [
        L('Detect whether the page is shown on a device with a dark screen', 'Определить, показывается ли страница на устройстве с тёмным экраном'),
        L('Force dark colours on every visitor regardless of their settings', 'Навязать тёмные цвета каждому посетителю вопреки его настройкам'),
        L('Adapt the styles to the colour scheme the user configured in the operating system', 'Подстроить стили под цветовую схему, выбранную пользователем в операционной системе'),
        L('Convert light colours into dark ones automatically', 'Автоматически преобразовать светлые цвета в тёмные'),
      ],
      correctIndex: 2,
      explanation: L(
        'prefers-color-scheme reports the operating system preference, so you can offer a dark palette that respects the user setting. It does not detect the physical screen, it does not force anything on the visitor and it does not transform colours automatically.',
        'prefers-color-scheme сообщает о настройке цветовой схемы в ОС, поэтому можно уважить выбор пользователя. Он не определяет физический экран, ничего не навязывает посетителю и не преобразует цвета сам.'
      ),
    },
    {
      id: 'htmlcss-q40',
      question: L('What is the difference between rem and em?', 'Чем rem отличается от em?'),
      options: [
        L('rem is relative to the element font size, and em is relative to the viewport width', 'rem считается от font-size элемента, а em — от ширины вьюпорта'),
        L('They are interchangeable, and the browser picks the more precise one', 'Они взаимозаменяемы, и браузер выбирает более точный'),
        L('rem only works inside media queries, and em only works inside flex containers', 'rem работает только в медиазапросах, а em только во flex-контейнерах'),
        L('rem is relative to the root font size, and em is relative to the font size of the element itself', 'rem считается от корневого font-size, а em — от font-size самого элемента'),
      ],
      correctIndex: 3,
      explanation: L(
        'rem resolves against the font size of the root element, so it stays predictable at any nesting depth, while em resolves against the font size of the element and compounds when nested. That predictability is why rem is preferred for spacing and type scales.',
        'rem считается от font-size корневого элемента и остаётся предсказуемым на любой глубине вложенности, а em — от font-size самого элемента и при вложенности накапливается. Предсказуемость rem — причина, по которой его предпочитают для отступов и шкалы текста.'
      ),
    },
    {
      id: 'htmlcss-q41',
      question: L('What is the correct order of values in the transition shorthand?', 'В каком порядке идут значения в сокращении transition?'),
      options: [
        L('property duration timing-function delay', 'property duration timing-function delay'),
        L('duration property timing-function delay', 'duration property timing-function delay'),
        L('property timing-function duration delay', 'property timing-function duration delay'),
        L('delay property duration timing-function', 'delay property duration timing-function'),
      ],
      correctIndex: 0,
      explanation: L(
        'The shorthand is transition: property duration timing-function delay, for example transition: background 200ms ease. The values are order sensitive, so a wrong order invalidates the whole declaration, and the delay is optional.',
        'Сокращение имеет вид transition: property duration timing-function delay, например transition: background 200ms ease. Значения чувствительны к порядку: неверный порядок обесценивает всё объявление, а задержка необязательна.'
      ),
    },
    {
      id: 'htmlcss-q42',
      question: L('How is a keyframes animation applied to an element?', 'Как анимация из @keyframes применяется к элементу?'),
      options: [
        L('Through the transition property, pointing at the keyframes name', 'Через свойство transition с указанием имени keyframes'),
        L('Through the animation property, naming the keyframes rule and its duration', 'Через свойство animation с именем правила keyframes и длительностью'),
        L('By adding a class that matches the selector inside the @keyframes block', 'Добавлением класса, совпадающего с селектором внутри блока @keyframes'),
        L('By setting the keyframes name as the id of the element', 'Указанием имени keyframes в качестве id элемента'),
      ],
      correctIndex: 1,
      explanation: L(
        'You define the stages in a @keyframes rule and attach them with the animation property, for example animation: spin 2s linear infinite. The transition property does not reference keyframes, and the selectors inside the block are percentages or from/to, not class names.',
        'Этапы задаются в правиле @keyframes, а подключаются через свойство animation, например animation: spin 2s linear infinite. Свойство transition на @keyframes не ссылается, а селекторы внутри блока — это проценты или from/to, а не имена классов.'
      ),
    },
    {
      id: 'htmlcss-q43',
      question: L('What happens to the layout when you apply transform: translateX(20px) to an element?', 'Что происходит с раскладкой, когда элементу задают transform: translateX(20px)?'),
      options: [
        L('The element is removed from the flow and the other elements move up', 'Элемент вынимается из потока, и остальные элементы поднимаются'),
        L('The element becomes a flex item and is redistributed', 'Элемент становится flex-элементом и перераспределяется'),
        L('The element is visually shifted but the layout space for it stays the same', 'Элемент визуально сдвигается, но занимаемое им место в раскладке остаётся прежним'),
        L('The document flow is recalculated, so the surrounding elements move as well', 'Поток документа пересчитывается, и соседние элементы тоже сдвигаются'),
      ],
      correctIndex: 2,
      explanation: L(
        'A transform changes the painted result, not the layout: the element is drawn 20px to the side while its box keeps its original place in the flow. That is exactly why transform is cheap to animate compared to properties such as left or margin.',
        'transform меняет отрисовку, а не раскладку: элемент рисуется на 20px в стороне, но его место в потоке остаётся прежним. Именно поэтому transform дешёв в анимации по сравнению со свойствами вроде left или margin.'
      ),
    },
    {
      id: 'htmlcss-q44',
      question: L('Which properties should you avoid animating in a frequently triggered UI animation?', 'Какие свойства не стоит анимировать в часто повторяющейся UI-анимации?'),
      options: [
        L('transform and opacity, because they are hard to composite', 'transform и opacity, потому что их сложно композитить'),
        L('color and background-color, because they are never accelerated', 'color и background-color, потому что их никогда не ускоряют'),
        L('box-shadow and filter, because they are always the most expensive', 'box-shadow и filter, потому что они всегда самые дорогие'),
        L('width, top, margin and height, because they trigger layout on every frame', 'width, top, margin и height, потому что они пересчитывают раскладку каждый кадр'),
      ],
      correctIndex: 3,
      explanation: L(
        'Animating width, top, margin or height forces the browser to recalculate layout on every frame, which is the most expensive kind of animation. transform and opacity can be handled by the compositor without touching layout, while color and background-color are cheap enough for occasional use.',
        'Анимация width, top, margin или height заставляет браузер пересчитывать раскладку каждый кадр — это самый дорогой вид анимации. transform и opacity композитор обрабатывает без пересчёта раскладки, а color и background-color достаточно дёшевы для редких случаев.'
      ),
    },
    {
      id: 'htmlcss-q45',
      question: L('What does the selector .card:has(.card__title) match?', 'Что выбирает селектор .card:has(.card__title)?'),
      options: [
        L('Every .card that contains a descendant matching .card__title', 'Каждую .card, внутри которой есть потомок, подходящий под .card__title'),
        L('Every .card__title inside a .card', 'Каждый .card__title внутри .card'),
        L('Every .card that is immediately followed by a .card__title', 'Каждую .card, сразу за которой идёт .card__title'),
        L('Every .card__title that is the first child of a .card', 'Каждый .card__title, который первый ребёнок в .card'),
      ],
      correctIndex: 0,
      explanation: L(
        ':has looks at the descendants of the element being matched, so .card:has(.card__title) selects cards that contain a matching descendant. :not excludes instead, and :has has nothing to do with sibling or child position, which is what the child and adjacent combinators are for.',
        ':has смотрит на потомков выбираемого элемента, поэтому .card:has(.card__title) выбирает карточки, содержащие подходящего потомка. :not, наоборот, исключает, а :has никак не связан с позицией среди соседей или детей — это зона комбинаторов потомка и соседа.'
      ),
    },
    {
      id: 'htmlcss-q46',
      question: L('Why does ::before render nothing unless you set the content property?', 'Почему ::before ничего не рисует, пока не задан content?'),
      options: [
        L('Because pseudo-elements only work on elements with a src attribute', 'Потому что псевдоэлементы работают только у элементов с атрибутом src'),
        L('Because content is what inserts the generated content into the box', 'Потому что именно content вставляет сгенерированное содержимое в блок'),
        L('Because the browser needs the content value to compute the specificity', 'Потому что браузеру нужно значение content, чтобы вычислить специфичность'),
        L('Because content must be set to block for the pseudo-element to appear', 'Потому что content должен быть равен block, чтобы псевдоэлемент появился'),
      ],
      correctIndex: 1,
      explanation: L(
        '::before and ::after generate content inside the element, and the content property is what actually inserts that content; without it nothing is rendered. It is also why generated content is not in the DOM and should not carry essential text.',
        '::before и ::after генерируют содержимое внутри элемента, и именно свойство content вставляет это содержимое — без него ничего не рисуется. Поэтому сгенерированного контента нет в DOM и важный текст на него класть не стоит.'
      ),
    },
    {
      id: 'htmlcss-q47',
      question: L('Which selector styles a checkbox only while it is checked?', 'Какой селектор стилизует checkbox только пока он отмечен?'),
      options: [
        L('input:valid', 'input:valid'),
        L('input:enabled', 'input:enabled'),
        L('input:checked', 'input:checked'),
        L('input:required', 'input:required'),
      ],
      correctIndex: 2,
      explanation: L(
        ':checked matches radio buttons and checkboxes in the checked state, while :valid and :invalid reflect constraint validation, and :enabled simply means the control is not disabled. :required means the attribute is present, not that the field is filled in.',
        ':checked срабатывает на отмеченные checkbox и radio, а :valid и :invalid отражают проверку ограничений, и :enabled значит лишь, что элемент не заблокирован. :required означает наличие атрибута, а не то, что поле заполнено.'
      ),
    },
    {
      id: 'htmlcss-q48',
      question: L('Which of these creates a stacking context?', 'Что из этого создаёт контекст наложения?'),
      options: [
        L('Setting a large z-index on an element with position: static', 'Большой z-index у элемента с position: static'),
        L('Setting position: relative with a negative z-index on the root', 'position: relative с отрицательным z-index на корневом элементе'),
        L('Using display: inline-block', 'Использование display: inline-block'),
        L('Applying a transform or a filter to an element', 'Применение transform или filter к элементу'),
      ],
      correctIndex: 3,
      explanation: L(
        'A transform, filter, opacity below 1, will-change, isolation: isolate or position with a z-index all create a stacking context and become the new painting root for their descendants. z-index has no effect on static elements, inline-block alone does not create a context, and a negative z-index on the root is not how contexts are made.',
        'transform, filter, opacity меньше 1, will-change, isolation: isolate или position с z-index создают контекст наложения и становятся новым корнем отрисовки для потомков. z-index не действует на статические элементы, inline-block сам по себе контекст не создаёт, а отрицательный z-index на корне — не способ их создавать.'
      ),
    },
    {
      id: 'htmlcss-q49',
      question: L('How do container queries differ from media queries?', 'Чем контейнерные запросы отличаются от медиазапросов?'),
      options: [
        L('They respond to the size of a designated container instead of the viewport', 'Они реагируют на размер указанного контейнера, а не на вьюпорт'),
        L('They respond to the viewport, but only inside a container element', 'Они реагируют на вьюпорт, но только внутри элемента-контейнера'),
        L('They respond to the user agent and the pointer type', 'Они реагируют на пользовательский агент и тип указателя'),
        L('They replace media queries in print stylesheets', 'Они заменяют медиазапросы в стилях для печати'),
      ],
      correctIndex: 0,
      explanation: L(
        'A container query is scoped to an ancestor marked with container-type (usually inline-size) and reacts to that container width, which lets a component adapt to the space it is given. Media queries always react to the viewport, and prefers-* queries react to user preferences, not to sizes.',
        'Контейнерный запрос привязан к предку с container-type (обычно inline-size) и реагирует на ширину этого контейнера, поэтому компонент подстраивается под отведённое ему место. Медиазапросы всегда реагируют на вьюпорт, а prefers-запросы — на предпочтения пользователя, а не на размеры.'
      ),
    },
    {
      id: 'htmlcss-q50',
      question: L('A form field has id="email" but no name attribute. What happens on submit?', 'У поля формы есть id="email", но нет атрибута name. Что произойдёт при отправке?'),
      options: [
        L('The field is submitted using its id as the key', 'Поле отправится под ключом, равным его id'),
        L('The field is not included in the submitted data, because the server reads name attributes', 'Поле не попадёт в отправленные данные, потому что сервер читает атрибуты name'),
        L('The browser refuses to submit the form until a name is added', 'Браузер откажется отправлять форму, пока не добавлен name'),
        L('The value is submitted as an empty string under the key "id"', 'Значение отправится пустой строкой под ключом "id"'),
      ],
      correctIndex: 1,
      explanation: L(
        'The name attribute is what the form sends to the server, while the id is only the identifier used inside the page and for label associations. Without a name the control is excluded from the submission, and the browser will not stop you from sending such a form.',
        'Именно name уходит на сервер вместе со значением, а id — это внутренний идентификатор страницы и связь с label. Без name контрол не попадает в отправленные данные, и браузер не помешает отправить такую форму.'
      ),
    },
  ],
};
