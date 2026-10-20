import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh08: Chapter = {
  id: 'htmlcss-ch8',
  title: L('Responsive design, animation and rendering cost', 'Адаптивный дизайн, анимация и цена рендеринга'),
  summary: L(
    'How media queries and container queries react to different conditions, how fluid sizing replaces most breakpoints, how transitions and keyframes animate state, and what the browser pays for each of it.',
    'Как медиазапросы и контейнерные запросы реагируют на разные условия, как текучие размеры заменяют большинство брейкпоинтов, как переходы и ключевые кадры анимируют состояние и сколько браузер за это платит.'
  ),
  sections: [
    {
      id: 'htmlcss-ch8-s1',
      title: L('Media queries and container queries', 'Медиазапросы и контейнерные запросы'),
      body: L(
        'A media query tests the environment of the device and applies a block of CSS when the test passes. The width test is the most common: @media (width >= 48rem) means the viewport is at least 48 rem wide. The other media features cover the height, the orientation, the pointer type, the hover capability and the user preferences such as prefers-reduced-motion and prefers-color-scheme.\n\nA container query tests the size of an element instead of the size of the screen. The element has to be a query container, which means container-type: inline-size on the wrapper, and then the children ask about it with @container (width > 30rem) or name it with container-name. That difference matters: the same card can be narrow in a sidebar and wide in a main column, and only a container query can react to it.\n\nContainer queries make components portable. Without them a card has to know where it lives, and the same component has to be written twice for the sidebar and for the grid. The price is that the container must have a size that can be measured, and inline-size leaves the block direction free, which is what you want for a card in a horizontal list.',
        'Медиазапрос проверяет условия окружения устройства и применяет блок CSS, когда проверка проходит. Проверка ширины самая частая: @media (width >= 48rem) означает, что вьюпорт не уже 48 rem. Другие медиа-функции описывают высоту, ориентацию, тип указателя, наличие наведения и предпочтения пользователя, например prefers-reduced-motion и prefers-color-scheme.\n\nКонтейнерный запрос проверяет размер элемента, а не размер экрана. Элемент должен быть контейнером запроса, то есть на обёртке стоит container-type: inline-size, а дети спрашивают про него через @container (width > 30rem) или называют его через container-name. Разница существенна: одна и та же карточка может быть узкой в боковой колонке и широкой в основной, и отреагировать на это может только контейнерный запрос.\n\nКонтейнерные запросы делают компоненты переносимыми. Без них карточка должна знать, где она живёт, и один и тот же компонент приходится писать дважды: для боковой колонки и для сетки. Цена в том, что у контейнера должен быть измеримый размер, а inline-size оставляет блочное направление свободным, и это как раз то, что нужно карточке в горизонтальном списке.'
      ),
      bullets: [
        L('Media queries test the viewport, container queries test an element.', 'Медиазапросы проверяют вьюпорт, контейнерные — элемент.'),
        L('container-type: inline-size makes an element a query container.', 'container-type: inline-size делает элемент контейнером запроса.'),
        L('A component should not know the size of the screen it lives on.', 'Компонент не должен знать размер экрана, на котором он живёт.'),
        L('prefers-reduced-motion and prefers-color-scheme are media features too.', 'prefers-reduced-motion и prefers-color-scheme — тоже медиа-функции.'),
        L('container-name lets several containers coexist on one page.', 'container-name позволяет нескольким контейнерам уживаться на странице.'),
      ],
      code: `/* the viewport decides */
@media (width >= 48rem) {
  .layout {
    grid-template-columns: 240px 1fr;
  }
}

/* the component decides */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (width > 24rem) {
  .card {
    grid-template-columns: 12rem 1fr;
  }
}`,
      table: {
        caption: L('What each query measures', 'Что измеряет каждый запрос'),
        headers: [L('Query', 'Запрос'), L('Measures', 'Измеряет'), L('Good for', 'Для чего')],
        rows: [
          [L('@media (width >= 48rem)', '@media (width >= 48rem)'), L('The viewport', 'Вьюпорт'), L('Page level layout changes', 'Изменения раскладки уровня страницы')],
          [L('@media (prefers-reduced-motion)', '@media (prefers-reduced-motion)'), L('The user preference', 'Предпочтение пользователя'), L('Disabling animation', 'Отключение анимации')],
          [L('@container (width > 24rem)', '@container (width > 24rem)'), L('The query container', 'Контейнер запроса'), L('Component level changes', 'Изменения уровня компонента')],
          [L('@container card (width > 24rem)', '@container card (width > 24rem)'), L('The named container', 'Именованный контейнер'), L('Several containers on one page', 'Несколько контейнеров на странице')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Query the component, not the page', 'Спрашивайте компонент, а не страницу'),
          text: L(
            'The moment a component reacts to the viewport it becomes tied to the place it happens to live. A container query keeps the decision inside the component, so the same card works in a narrow sidebar and in a wide column without a second stylesheet.',
            'Как только компонент реагирует на вьюпорт, он привязывается к месту, где оказался. Контейнерный запрос оставляет решение внутри компонента, и одна и та же карточка работает и в узкой боковой колонке, и в широкой без второй таблицы стилей.'
          ),
        },
        {
          tone: 'warning',
          title: L('A container needs a measurable size', 'Контейнеру нужен измеримый размер'),
          text: L(
            'container-type: inline-size stops the element from being sized by its content in the inline direction, because that size is now needed for the query. If the wrapper has width: auto and no constraint, the layout can collapse.',
            'container-type: inline-size запрещает элементу определять свой размер по содержимому в строчном направлении, потому что размер теперь нужен для запроса. Если у обёртки width: auto и нет ограничений, раскладка может схлопнуться.'
          ),
        },
      ],
      takeaway: L(
        'Query the component with container queries and keep the viewport for page level changes.',
        'Задавайте компоненту вопросы контейнерными запросами, а вьюпорт оставьте для изменений уровня страницы.'
      ),
      seeAlso: [
        L('Section 8-3: mobile first and progressive enhancement', 'Секция 8-3: сначала мобильные и прогрессивное улучшение'),
        L('Section 8-6: dark mode and prefers-color-scheme', 'Секция 8-6: тёмная тема и prefers-color-scheme'),
      ],
    },
    {
      id: 'htmlcss-ch8-s2',
      title: L('Fluid sizing with clamp and min', 'Текучие размеры через clamp и min'),
      body: L(
        'clamp(min, preferred, max) picks the preferred value but keeps it inside the two limits, and it works with any comparable values, not only with lengths. It is the cleanest way to write fluid typography: font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem) grows with the viewport, stops at 1.5 rem and never becomes smaller than 1 rem, all in one declaration without a single breakpoint.\n\nThe middle value has to be able to exceed the minimum and to fall below the maximum, and a viewport unit is the usual way to do it, because it is continuous. A percentage of the parent is also continuous but depends on the parent, so the same text would be a different size in a sidebar and in a main column.\n\nThe same idea works for spacing, for a container width, for a font size inside a card and for a border radius. The functions min() and max() are the simpler cousins: min(100%, 40rem) means the smaller of the container and 40 rem, and it is exactly the right value for a media block that must never overflow its column.',
        'clamp(min, preferred, max) выбирает предпочтительное значение, но держит его между двумя границами, и работает с любыми сравнимыми значениями, а не только с длинами. Это самый чистый способ написать текучую типографику: font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem) растёт с вьюпортом, останавливается на 1.5 rem и никогда не опускается ниже 1 rem, и всё это одним объявлением без единого брейкпоинта.\n\nСреднее значение должно уметь превышать минимум и опускаться ниже максимума, и обычно для этого используют единицу вьюпорта, потому что она непрерывна. Процент от родителя тоже непрерывен, но зависит от родителя, поэтому один и тот же текст будет разного размера в боковой колонке и в основной.\n\nТа же идея работает для отступов, ширины контейнера, размера шрифта внутри карточки и радиуса скругления. Функции min() и max() — их простые родственники: min(100%, 40rem) означает меньшее из ширины контейнера и 40 rem, и это ровно то значение, которое нужно медиаблоку, который не должен вылезать за колонку.'
      ),
      bullets: [
        L('clamp(min, preferred, max) keeps a value inside two limits.', 'clamp(min, preferred, max) держит значение между двумя границами.'),
        L('A viewport unit makes the middle value continuous.', 'Единица вьюпорта делает среднее значение непрерывным.'),
        L('Fluid type replaces most breakpoints.', 'Текучий шрифт заменяет большинство брейкпоинтов.'),
        L('min() and max() pick the smallest or the largest value.', 'min() и max() выбирают наименьшее или наибольшее значение.'),
        L('Percentages depend on the parent, viewport units do not.', 'Проценты зависят от родителя, единицы вьюпорта — нет.'),
      ],
      code: `:root {
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.15rem);
  --step-2: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
}

body {
  font-size: var(--step-0);
  line-height: 1.5;
}

h1 {
  font-size: var(--step-2);
}

/* never wider than the column */
.embed {
  width: min(100%, 40rem);
}

/* never narrower than the padding */
.panel {
  padding: max(1rem, 3vw);
}`,
      table: {
        caption: L('The sizing functions of CSS', 'Функции размеров в CSS'),
        headers: [L('Function', 'Функция'), L('Result', 'Результат'), L('Example', 'Пример')],
        rows: [
          [L('clamp(a, b, c)', 'clamp(a, b, c)'), L('b, limited to a and c', 'b, ограниченное a и c'), L('clamp(1rem, 2.5vw, 2rem)', 'clamp(1rem, 2.5vw, 2rem)')],
          [L('min(a, b)', 'min(a, b)'), L('The smaller value', 'Меньшее значение'), L('min(100%, 40rem)', 'min(100%, 40rem)')],
          [L('max(a, b)', 'max(a, b)'), L('The larger value', 'Большее значение'), L('max(1rem, 3vw)', 'max(1rem, 3vw)')],
          [L('calc(a + b)', 'calc(a + b)'), L('An arithmetic expression', 'Арифметическое выражение'), L('calc(100% - 2rem)', 'calc(100% - 2rem)')],
          [L('1fr', '1fr'), L('A share of the free space', 'Доля свободного места'), L('grid-template-columns: 1fr 2fr', 'grid-template-columns: 1fr 2fr')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Fluid text and long words', 'Текучий текст и длинные слова'),
          text: L(
            'A viewport unit keeps growing with the window, so a long word in a fluid heading can overflow the column at exactly the wrong moment. Pair the fluid size with overflow-wrap: anywhere or hyphens: auto on the heading.',
            'Единица вьюпорта растёт вместе с окном, поэтому длинное слово в текучем заголовке может вылезти за колонку в самый неподходящий момент. Добавьте к текучему размеру overflow-wrap: anywhere или hyphens: auto.'
          ),
        },
        {
          tone: 'tip',
          title: L('One scale, many steps', 'Одна шкала — много шагов'),
          text: L(
            'Define the steps once as custom properties on the root and use them everywhere. The scale then reacts to the viewport for every component at once, and a designer can retune the whole rhythm by changing one value.',
            'Определите шаги один раз как пользовательские свойства на корне и используйте их везде. Шкала отреагирует на вьюпорт сразу для всех компонентов, а дизайнер сможет перенастроить весь ритм, изменив одно значение.'
          ),
        },
      ],
      takeaway: L(
        'clamp replaces a breakpoint with a range, and min() keeps a block inside its column.',
        'clamp заменяет брейкпоинт диапазоном, а min() удерживает блок в колонке.'
      ),
      seeAlso: [
        L('Section 8-3: mobile first and progressive enhancement', 'Секция 8-3: сначала мобильные и прогрессивное улучшение'),
        L('Section 5-4: custom properties and theming', 'Секция 5-4: пользовательские свойства и темы'),
      ],
    },
    {
      id: 'htmlcss-ch8-s3',
      title: L('Mobile first and progressive enhancement', 'Сначала мобильные и прогрессивное улучшение'),
      body: L(
        'Mobile first means the base styles describe the small case and the media queries only add what a wider screen needs. The direction of the rules is the whole point: with min-width queries the browser applies the base rules by default and overrides them for larger screens, so the CSS that always runs is the simplest one. With max-width queries every enhancement has to fight the desktop rules that come first.\n\nThe same idea works for features. Put the working version in the plain CSS and add the enhanced version inside @supports (display: grid) or @supports (container-type: inline-size). A browser that does not understand the feature ignores the block and keeps the base layout, so the enhancement is genuinely optional.\n\nContent decides the breakpoint, not the other way round. Measure the narrowest width at which the content stops fitting, pick that as the first query, and let the layout grow from there. Teams that copy device widths from a spreadsheet end up with three breakpoints for four real devices, while the content only ever needed two.',
        'Подход «сначала мобильные» означает, что базовые стили описывают малый случай, а медиазапросы только добавляют то, что нужно широкому экрану. Направление правил — главное: с запросами min-width браузер применяет базовые правила по умолчанию и перекрывает их для больших экранов, поэтому CSS, который работает всегда, остаётся самым простым. С запросами max-width каждое улучшение вынуждено спорить с десктопными правилами, объявленными раньше.\n\nТа же идея работает и для возможностей. Работающую версию кладите в обычный CSS, а улучшенную — внутрь @supports (display: grid) или @supports (container-type: inline-size). Браузер, который не понимает возможность, пропустит блок и оставит базовую раскладку, так что улучшение действительно необязательно.\n\nБрейкпоинт задаёт контент, а не наоборот. Измерьте самую узкую ширину, на которой контент перестаёт помещаться, возьмите её первым запросом и дайте раскладке расти оттуда. Команды, которые копируют ширины устройств из таблицы, получают три брейкпоинта на четыре реальных устройства, хотя контенту хватало двух.'
      ),
      bullets: [
        L('The base styles describe the small screen, the queries add the rest.', 'Базовые стили описывают малый экран, запросы добавляют остальное.'),
        L('min-width queries let the base rules apply by default.', 'Запросы min-width позволяют базовым правилам применяться по умолчанию.'),
        L('@supports makes an enhancement genuinely optional.', '@supports делает улучшение действительно необязательным.'),
        L('Content sets the breakpoint, not a table of device widths.', 'Брейкпоинт задаёт контент, а не таблица ширин устройств.'),
        L('An enhancement that breaks the base layout is not an enhancement.', 'Улучшение, ломающее базовую раскладку, улучшением не является.'),
      ],
      code: `/* base: one column, works everywhere */
.layout {
  display: grid;
  gap: 16px;
}

/* enhancement for wider screens */
@media (width >= 48rem) {
  .layout {
    grid-template-columns: 240px 1fr;
    gap: 24px;
  }
}

/* optional enhancement, ignored where unsupported */
@supports (container-type: inline-size) {
  .card-wrapper {
    container-type: inline-size;
  }
}`,
      table: {
        caption: L('Two directions of media queries', 'Два направления медиазапросов'),
        headers: [L('Approach', 'Подход'), L('Base rules', 'Базовые правила'), L('Queries', 'Запросы')],
        rows: [
          [L('Mobile first', 'Сначала мобильные'), L('The small layout', 'Малая раскладка'), L('min-width, they add', 'min-width, добавляют')],
          [L('Desktop first', 'Сначала десктоп'), L('The large layout', 'Большая раскладка'), L('max-width, they subtract', 'max-width, вычитают')],
          [L('Feature query', 'Запрос возможности'), L('The working layout', 'Рабочая раскладка'), L('@supports, they replace', '@supports, заменяют')],
          [L('Container query', 'Контейнерный запрос'), L('The component layout', 'Раскладка компонента'), L('@container, they adapt', '@container, адаптируют')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('max-width queries stack in the wrong order', 'Запросы max-width складываются не в ту сторону'),
          text: L(
            'With max-width queries the desktop rules come first and the mobile overrides come later, so the mobile rules win by source order and the desktop ones never apply. That is the opposite of what the author intended.',
            'С запросами max-width десктопные правила идут первыми, а мобильные переопределения — позже, поэтому мобильные выигрывают по порядку в исходнике, а десктопные не применяются никогда. Это ровно противоположно замыслу автора.'
          ),
        },
        {
          tone: 'tip',
          title: L('Enhancement for layout and for features', 'Улучшение для раскладки и для возможностей'),
          text: L(
            'Layout can be enhanced with media queries, features with @supports, and both keep the base version working. The same habit applies to JavaScript: the page works without it and the script adds the extra behaviour.',
            'Раскладку улучшают медиазапросами, возможности — @supports, и то и другое оставляет базовую версию рабочей. Та же привычка применима к JavaScript: страница работает без него, а скрипт добавляет поведение.'
          ),
        },
      ],
      takeaway: L(
        'Write the small case first, then let the queries and @supports add the rest.',
        'Сначала пишите малый случай, а запросы и @supports добавляют остальное.'
      ),
      seeAlso: [
        L('Section 8-1: media queries and container queries', 'Секция 8-1: медиазапросы и контейнерные запросы'),
        L('Section 2-5: progressive enhancement', 'Секция 2-5: прогрессивное улучшение'),
      ],
    },
    {
      id: 'htmlcss-ch8-s4',
      title: L('Transitions and keyframes', 'Переходы и ключевые кадры'),
      body: L(
        'A transition animates a property between two states, and the browser computes the intermediate values. The declaration names the property, the duration, the timing function and the delay: transition: color 150ms ease-in-out. Nothing happens until the value actually changes, so a transition on hover works without any JavaScript, and it also fires when a script adds a class.\n\nKeyframes describe a sequence. You name the animation, write the states with percentages and give it a duration, applied with the animation shorthand. Unlike a transition, an animation runs on its own, can repeat, can be paused and can have several steps with intermediate percentages.\n\nTwo rules keep animation cheap and polite. Animate transform and opacity, because they do not trigger layout, and respect the user preference for less motion with a prefers-reduced-motion query. A transition on width, height, top or left forces the browser to lay out the page on every frame, which is where the jank comes from.',
        'Переход анимирует свойство между двумя состояниями, а промежуточные значения вычисляет браузер. Объявление называет свойство, длительность, функцию плавности и задержку: transition: color 150ms ease-in-out. Ничего не происходит, пока значение действительно не изменится, поэтому переход по наведению работает вообще без JavaScript, а срабатывает он и тогда, когда скрипт добавляет класс.\n\nКлючевые кадры описывают последовательность. Вы задаёте имя анимации, пишете состояния в процентах и указываете длительность, а применяете через сокращение animation. В отличие от перехода, анимация идёт сама, может повторяться, может ставиться на паузу и может иметь несколько шагов с промежуточными процентами.\n\nДва правила делают анимацию дешёвой и приличной. Анимируйте transform и opacity, потому что они не вызывают перерасчёт раскладки, и учитывайте предпочтение пользователя в меньшем движении через запрос prefers-reduced-motion. Переход по width, height, top или left заставляет браузер пересчитывать раскладку на каждом кадре, и вот откуда берутся рывки.'
      ),
      bullets: [
        L('A transition animates between two states, a keyframe animation runs on its own.', 'Переход анимирует между двумя состояниями, анимация по кадрам идёт сама.'),
        L('transition names the property, the duration, the easing and the delay.', 'transition задаёт свойство, длительность, плавность и задержку.'),
        L('Animate transform and opacity, not layout properties.', 'Анимируйте transform и opacity, а не свойства раскладки.'),
        L('prefers-reduced-motion: reduce is a media feature, not a guess.', 'prefers-reduced-motion: reduce — медиа-функция, а не догадка.'),
        L('A transition needs a real change of value to start.', 'Переходу нужно настоящее изменение значения, чтобы начаться.'),
      ],
      code: `.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.card:hover {
  transform: translateY(-2px);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.card--enter {
  animation: fade-in 300ms ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
    animation: none;
  }
}`,
      table: {
        caption: L('Transition against keyframes', 'Переход против ключевых кадров'),
        headers: [L('Aspect', 'Аспект'), L('Transition', 'Переход'), L('Keyframes', 'Ключевые кадры')],
        rows: [
          [L('Trigger', 'Запуск'), L('A change of the value', 'Изменение значения'), L('Runs on its own', 'Идёт сама')],
          [L('States', 'Состояния'), L('Two, the start and the end', 'Два, начало и конец'), L('Any number of steps', 'Любое число шагов')],
          [L('Control', 'Управление'), L('Cannot be paused', 'Нельзя поставить на паузу'), L('Can be paused and replayed', 'Можно поставить на паузу и перезапустить')],
          [L('Typical use', 'Типичное применение'), L('Hover, focus, open state', 'Наведение, фокус, открытое состояние'), L('Entrance, loading indicator', 'Появление, индикатор загрузки')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('transition: all is a trap', 'transition: all — ловушка'),
          text: L(
            'transition: all animates every property that happens to change, including the ones a framework or a layout engine changes by accident, and each animated property costs a frame of work. Name the properties you mean.',
            'transition: all анимирует любое изменившееся свойство, включая те, что случайно меняет фреймворк или движок раскладки, и каждое такое свойство стоит кадра работы. Перечисляйте свойства явно.'
          ),
        },
        {
          tone: 'tip',
          title: L('Transitions are state changes, keyframes are sequences', 'Переход — это состояние, ключевые кадры — это последовательность'),
          text: L(
            'A transition fits a hover, a focus or an open state, because something has to change for it to start. Keyframes fit a sequence that has to run on its own, such as an entrance or a loading indicator.',
            'Переход подходит для наведения, фокуса или открытого состояния, потому что ему нужно изменение, чтобы начаться. Ключевые кадры подходят для последовательности, которая идёт сама: появление элемента или индикатор загрузки.'
          ),
        },
      ],
      takeaway: L(
        'Transitions react to a state change, keyframes run a sequence, and both should stay cheap.',
        'Переход реагирует на изменение состояния, ключевые кадры исполняют последовательность, и обе вещи должны быть дешёвыми.'
      ),
      seeAlso: [
        L('Section 8-5: will-change, content-visibility and render cost', 'Секция 8-5: will-change, content-visibility и цена рендеринга'),
        L('Section 8-6: dark mode and prefers-color-scheme', 'Секция 8-6: тёмная тема и prefers-color-scheme'),
      ],
    },
    {
      id: 'htmlcss-ch8-s5',
      title: L('will-change, content-visibility and render cost', 'will-change, content-visibility и цена рендеринга'),
      body: L(
        'Rendering is a pipeline: the browser parses the styles, computes the layout, paints the pixels and composites the layers. Animating a property that only changes the paint, such as color or opacity, is cheap. Animating one that changes the geometry, such as width, height, top or margin, forces a new layout on every frame, and that is what users feel as jank.\n\nwill-change tells the browser which properties are about to change so it can prepare in advance, usually by promoting the element to its own layer. The preparation costs memory, so will-change is a promise about the next moment, not a permanent setting. Applying it to hundreds of elements turns a smooth page into a memory hog, and the browser keeps those layers alive long after the animation ends.\n\ncontent-visibility: auto is the opposite move. It lets the browser skip the rendering work for the parts of the page that are off screen, and the layout is estimated from contain-intrinsic-size until the element becomes visible. It is the cheapest way to make a long page with many sections feel instant, and it needs a sensible intrinsic size, otherwise the scrollbar jumps while you scroll.',
        'Рендеринг — это конвейер: браузер разбирает стили, считает раскладку, красит пиксели и собирает слои. Анимировать свойство, которое меняет только картинку, вроде цвета или прозрачности, дёшево. Анимировать то, что меняет геометрию, вроде width, height, top или margin, заставляет пересчитывать раскладку на каждом кадре, и это пользователь ощущает как рывки.\n\nwill-change сообщает браузеру, какие свойства скоро изменятся, чтобы тот подготовился заранее, обычно вынося элемент в свой слой. Подготовка стоит памяти, поэтому will-change — обещание про следующий момент, а не постоянная настройка. Если применить его к сотням элементов, плавная страница превратится в пожирателя памяти, и браузер держит эти слои живыми намного дольше конца анимации.\n\ncontent-visibility: auto — противоположный ход. Он позволяет браузеру пропускать работу по отрисовке для частей страницы за пределами экрана, а раскладка оценивается по contain-intrinsic-size, пока элемент не стал видимым. Это самый дешёвый способ сделать длинную страницу со множеством секций отзывчивой, но нужен разумный внутренний размер, иначе полоса прокрутки дёргается при прокрутке.'
      ),
      bullets: [
        L('Animating geometry forces a layout on every frame.', 'Анимация геометрии пересчитывает раскладку на каждом кадре.'),
        L('transform and opacity are the cheap properties to animate.', 'transform и opacity — дешёвые для анимации свойства.'),
        L('will-change costs memory and should be temporary.', 'will-change тратит память и должен быть временным.'),
        L('content-visibility: auto skips the work for off-screen content.', 'content-visibility: auto пропускает работу для закадрового содержимого.'),
        L('contain-intrinsic-size keeps the scrollbar stable.', 'contain-intrinsic-size удерживает полосу прокрутки ровной.'),
      ],
      code: `/* prepare for a transform animation, briefly */
.card {
  will-change: transform;
}

/* skip the rendering of the parts that are off screen */
.article-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 480px;
}

/* cheap properties only */
.card {
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}`,
      table: {
        caption: L('What each property costs to animate', 'Сколько стоит анимация каждого свойства'),
        headers: [L('Property', 'Свойство'), L('Work per frame', 'Работа за кадр'), L('Note', 'Замечание')],
        rows: [
          [L('opacity', 'opacity'), L('Paint only', 'Только краска'), L('Cheapest, safe to animate', 'Самое дешёвое, безопасно анимировать')],
          [L('transform', 'transform'), L('Composite only', 'Только композиция'), L('Safe to animate', 'Безопасно анимировать')],
          [L('color, background-color', 'color, background-color'), L('Paint only', 'Только краска'), L('Usually fine', 'Обычно нормально')],
          [L('width, height, top, left', 'width, height, top, left'), L('Layout, paint, composite', 'Раскладка, краска, композиция'), L('Expensive on a large page', 'Дорого на большой странице')],
          [L('box-shadow', 'box-shadow'), L('Paint only', 'Только краска'), L('Expensive when large and blurred', 'Дорого, когда большой и размытый')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('will-change left on forever', 'will-change, оставленный навсегда'),
          text: L(
            'The usual bug is a will-change that nobody removes. The promoted layers stay in memory for the whole session, and on a low end phone that is the difference between a smooth scroll and a stuttering one. Set it just before the animation and remove it after.',
            'Обычный баг — will-change, который никто не снимает. Поднятые слои остаются в памяти всю сессию, и на слабом телефоне это разница между плавной прокруткой и заиканием. Задавайте его перед анимацией и снимайте после.'
          ),
        },
        {
          tone: 'tip',
          title: L('Measure before you optimise', 'Измеряйте, прежде чем оптимизировать'),
          text: L(
            'content-visibility and contain are real wins on a long page, but they cost a little on a short one. Check the rendering cost in the browser profiler before adding machinery to a page that was fine.',
            'content-visibility и contain дают реальный выигрыш на длинной странице, но чуть стоят на короткой. Проверьте стоимость рендеринга в профайлере браузера, прежде чем добавлять механику странице, которой и так было хорошо.'
          ),
        },
      ],
      takeaway: L(
        'Animate cheap properties, use will-change briefly, and skip the rendering of what is off screen.',
        'Анимируйте дешёвые свойства, используйте will-change недолго и пропускайте рендеринг закадрового содержимого.'
      ),
      seeAlso: [
        L('Section 8-4: transitions and keyframes', 'Секция 8-4: переходы и ключевые кадры'),
        L('Section 4-5: overflow and stacking contexts', 'Секция 4-5: переполнение и контексты наложения'),
      ],
    },
    {
      id: 'htmlcss-ch8-s6',
      title: L('Dark mode and prefers-color-scheme', 'Тёмная тема и prefers-color-scheme'),
      body: L(
        'The system tells the page which colour scheme the user prefers, and prefers-color-scheme is the media feature that reads it. The straightforward implementation is a media query that swaps the tokens: @media (prefers-color-scheme: dark) { :root { --color-bg: #14161a; --color-text: #e8eaed } }. The page then follows the operating system without a single line of JavaScript.\n\nDeclare the colour scheme on the root as well, with the color-scheme property. It tells the browser which palette to use for the scrollbars, the form controls and the default canvas, and it makes the page look right before any of your own styles are applied. The light-dark() function does the same thing in one value: it picks the first colour in light mode and the second in dark mode.\n\nA manual toggle has to be combined with the system preference, not replace it. The usual pattern sets the theme attribute on the root element and gives the explicit choice a higher priority than the media query, with the system preference as the fallback for the case where the user never chose anything. The choice has to survive a page reload, and the only reliable place to keep it is the browser itself.',
        'Система сообщает странице, какую цветовую схему предпочитает пользователь, и prefers-color-scheme — медиа-функция, которая это читает. Простейшая реализация — медиазапрос, меняющий токены: @media (prefers-color-scheme: dark) { :root { --color-bg: #14161a; --color-text: #e8eaed } }. Страница следует за операционной системой без единой строки JavaScript.\n\nЗаодно объявите цветовую схему на корне через свойство color-scheme. Оно говорит браузеру, какую палитру использовать для полос прокрутки, элементов формы и фона по умолчанию, и делает страницу правильной ещё до применения ваших стилей. Функция light-dark() делает то же одним значением: она берёт первый цвет в светлой теме и второй в тёмной.\n\nРучной переключатель надо сочетать с системным предпочтением, а не заменять им. Обычная схема ставит атрибут темы на корневой элемент и даёт явному выбору приоритет над медиазапросом, а системное предпочтение оставляет запасным вариантом для случая, когда пользователь ничего не выбирал. Выбор должен переживать перезагрузку страницы, и надёжное место для этого — сам браузер.'
      ),
      bullets: [
        L('prefers-color-scheme reads the operating system preference.', 'prefers-color-scheme читает предпочтение операционной системы.'),
        L('color-scheme tells the browser which palette to use.', 'color-scheme сообщает браузеру, какую палитру использовать.'),
        L('light-dark() picks a colour from the active scheme.', 'light-dark() выбирает цвет по активной схеме.'),
        L('A manual toggle must not drop the system preference.', 'Ручной переключатель не должен выбрасывать системное предпочтение.'),
        L('The choice has to survive a reload, so store it in the browser.', 'Выбор должен переживать перезагрузку, значит храните его в браузере.'),
      ],
      code: `:root {
  color-scheme: light dark;
  --color-bg: #ffffff;
  --color-text: #1f2328;
}

/* follow the system */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #14161a;
    --color-text: #e8eaed;
  }
}

/* an explicit choice wins over the system */
:root[data-theme="dark"] {
  --color-bg: #14161a;
  --color-text: #e8eaed;
}`,
      table: {
        caption: L('Where the colour scheme comes from', 'Откуда берётся цветовая схема'),
        headers: [L('Source', 'Источник'), L('Priority', 'Приоритет'), L('How it is set', 'Как задаётся')],
        rows: [
          [L('Data attribute on the root', 'Атрибут данных на корне'), L('Highest', 'Высший'), L('The explicit choice of the user', 'Явный выбор пользователя')],
          [L('prefers-color-scheme', 'prefers-color-scheme'), L('Middle', 'Средний'), L('The operating system setting', 'Настройка операционной системы')],
          [L('The default values in :root', 'Умолчания в :root'), L('Lowest', 'Низший'), L('The fallback in your stylesheet', 'Запасной вариант в вашей таблице стилей')],
          [L('color-scheme property', 'Свойство color-scheme'), L('Not a colour', 'Не цвет'), L('Tells the browser which palette to use', 'Сообщает браузеру, какую палитру использовать')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The toggle that ignores the system', 'Переключатель, игнорирующий систему'),
          text: L(
            'If the manual switch only sets data-theme on the root and never tells the browser which scheme is active, the scrollbars and the form controls keep the light palette in dark mode. Set color-scheme together with the tokens.',
            'Если ручной переключатель только ставит data-theme на корне и не сообщает браузеру активную схему, полосы прокрутки и элементы формы остаются светлыми в тёмной теме. Задавайте color-scheme вместе с токенами.'
          ),
        },
        {
          tone: 'tip',
          title: L('Test both schemes on one page', 'Проверяйте обе схемы на одной странице'),
          text: L(
            'Dark mode breaks the contrast, the shadows and the gradients that were never designed for it. Check the page in both schemes before shipping the toggle, and treat the two palettes as a pair that has to be tuned together.',
            'Тёмная тема ломает контраст, тени и градиенты, которые никогда не проектировались под неё. Проверьте страницу в обеих схемах до запуска переключателя и относитесь к двум палитрам как к паре, которую настраивают вместе.'
          ),
        },
      ],
      takeaway: L(
        'Follow the system by default, let an explicit choice win, and declare the scheme.',
        'По умолчанию следуйте системе, дайте явному выбору первенство и объявите схему.'
      ),
      seeAlso: [
        L('Section 5-4: custom properties and theming', 'Секция 5-4: пользовательские свойства и темы'),
        L('Section 8-4: transitions and keyframes', 'Секция 8-4: переходы и ключевые кадры'),
      ],
    },
  ],
};
