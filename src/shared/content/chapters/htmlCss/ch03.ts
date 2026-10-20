import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh03: Chapter = {
  id: 'htmlcss-ch3',
  title: L('Accessibility', 'Доступность'),
  summary: L(
    'Why accessibility is a contract rather than a checklist, how the keyboard and the focus order work, what ARIA is actually for, the numeric rules of contrast and colour, how to write alt text and captions, and how to test a page the way a screen reader reads it.',
    'Почему доступность — это контракт, а не чек-лист, как работают клавиатура и порядок фокуса, для чего на самом деле нужен ARIA, какие числа задают контраст и цвет, как писать alt-текст и титры и как проверять страницу так, как её читает скринридер.'
  ),
  sections: [
    {
      id: 'htmlcss-ch3-s1',
      title: L('Why accessibility is a requirement', 'Почему доступность — это требование'),
      body: L(
        'Accessibility is a contract, not a checklist. WCAG is the shared definition of what a product owes its users, and conformance is measured against it. Level A is the floor, level AA is what a public service or a consumer product normally has to reach, and level AAA goes further in ways that some kinds of content can never satisfy at all. The version to design against today is WCAG 2.2, which added criteria for a focus indicator that is not covered by other content and for target sizes.\n\nThe legal pressure exists independently of the technical argument. In the European Union the European Accessibility Act has applied to a wide range of products and services since June 2025, and in the United States the 2024 rule from the Department of Justice requires state and local governments and their vendors to meet WCAG level AA. A design that misses the standard is not merely unfriendly, it is out of compliance in whole categories of business.\n\nThe audience is wider than the people who would call themselves disabled. A user on a slow phone, on an old laptop, in bright sunlight, on a noisy train, or simply getting older, benefits from exactly the same things: text that can be zoomed, a form that can be filled with a keyboard, colours that can be told apart, a video that has captions. Most accessibility work is performance work under awkward conditions.\n\nThe cheapest path is semantic HTML. A native button, a real label, a heading level that reflects the structure and an alt text that says something already satisfy most of the criteria that teams struggle with after they rebuild widgets from scratch. Accessibility failures in a codebase are usually caused by missing semantics rather than by missing effort.',
        'Доступность — это контракт, а не чек-лист. WCAG — общее определение того, что продукт должен своей аудитории, и соответствие измеряется по нему. Уровень A — нижняя граница, уровень AA — то, до которого обычно обязаны дотягивать государственный сервис или потребительский продукт, а уровень AAA идёт дальше так, что некоторые виды контента ему не поддаются в принципе. Проектировать сегодня стоит под WCAG 2.2, где добавились критерии про не перекрытый фокус и про размер целей.\n\nЮридическое давление существует независимо от технических доводов. В Европейском союзе Европейский акт о доступности действует для широкого круга товаров и услуг с июня 2025 года, а в США правило Министерства юстиции 2024 года требует от государственных органов власти штатов и местных сообществ и их подрядчиков соответствия уровню AA. Дизайн, не дотягивающий до стандарта, не просто неудобен — он нарушает требования в целых категориях бизнеса.\n\nАудитория гораздо шире людей, которые назвали бы себя инвалидами. Пользователь на медленном телефоне, на старом ноутбуке, на ярком солнце, в шумном поезде или просто стареющий получает ровно то же самое: текст, который можно увеличить, форму, которую можно заполнить с клавиатуры, цвета, которые можно различить, видео с титрами. Большая часть работы над доступностью — это работа о производительности в неудобных условиях.\n\nСамый дешёвый путь — семантический HTML. Нативная кнопка, настоящая метка, уровень заголовка, отражающий структуру, и осмысленный alt-текст уже закрывают большинство критериев, над которыми команды мучаются после того, как пересобирают виджеты с нуля. Провалы доступности в кодовой базе вызваны обычно отсутствием семантики, а не отсутствием усилий.'
      ),
      bullets: [
        L('WCAG is the contract, and conformance is measured against it.', 'WCAG — это контракт, и соответствие измеряется по нему.'),
        L('Level AA is the usual legal target for consumer products and public services.', 'Уровень AA — обычная юридическая цель для потребительских продуктов и госсервисов.'),
        L('WCAG 2.2 is the version to design against today.', 'WCAG 2.2 — версия, под которую проектируют сегодня.'),
        L('The audience includes slow devices, bright sunlight and ageing users.', 'Аудитория включает медленные устройства, яркое солнце и стареющих пользователей.'),
        L('Most accessibility failures come from missing semantics, not missing effort.', 'Большинство провалов доступности вызвано отсутствием семантики, а не усилий.'),
      ],
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Support</title>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>
    <h1>Support</h1>
  </header>

  <main id="main">
    <p>Reach us by phone, email or the form below.</p>
  </main>

  <footer>
    <p>Support is available from 09:00 to 18:00 CET.</p>
  </footer>
</body>
</html>`,
      table: {
        caption: L('The three conformance levels', 'Три уровня соответствия'),
        headers: [L('Level', 'Уровень'), L('What it asks for', 'Что требует'), L('Typical expectation', 'Обычное ожидание')],
        rows: [
          [
            L('A', 'A'),
            L('No barrier that blocks the content completely', 'Ни одного барьера, полностью блокирующего содержимое'),
            L('The floor, required almost everywhere', 'Нижняя граница, требуется почти везде'),
          ],
          [
            L('AA', 'AA'),
            L('Adds contrast, visible focus, target size, full keyboard access', 'Добавляет контраст, видимый фокус, размер целей, полный доступ с клавиатуры'),
            L('The usual legal target', 'Обычная юридическая цель'),
          ],
          [
            L('AAA', 'AAA'),
            L('Adds stricter contrast and more alternatives for content', 'Добавляет более строгий контраст и больше альтернатив для контента'),
            L('Not required and unreachable for some content', 'Не требуется и недостижим для части контента'),
          ],
        ],
      },
      takeaway: L(
        'Treat accessibility as a requirement with a number attached, and start from semantics instead of from patches.',
        'Относитесь к доступности как к требованию с числом и начинайте с семантики, а не с заплаток.'
      ),
      seeAlso: [
        L('Chapter 1: semantic markup and document structure', 'Глава 1: семантическая разметка и структура документа'),
        L('Section 3-6: screen reader semantics and how to test them', 'Секция 3-6: семантика скринридера и как её проверять'),
      ],
    },
    {
      id: 'htmlcss-ch3-s2',
      title: L('Keyboard navigation and focus order', 'Навигация с клавиатуры и порядок фокуса'),
      body: L(
        'Every interactive element is focusable, and Tab moves the focus between them in DOM order. That order is the order in the source, and CSS cannot change it: reordering with the order property or with grid areas changes the paint order but not the focus order, so a keyboard user walks the page in one arrangement while the screen shows another. The rule is that the source order has to be the reading order, and the layout adapts to it.\n\nThe tabindex attribute is where this gets broken. A positive tabindex pushes an element ahead of everything that has none, so a single tabindex="1" on a wrapper reorders the entire page and everybody pays for it. tabindex="0" makes a custom element focusable in its natural place, and tabindex="-1" keeps it out of the tab order while still allowing a script to focus it. That second value is what focus management is built on.\n\nFocus order and tab order are not the same thing. An element can be focusable and stay outside the tab order, which is exactly what tabindex="-1" is for, and an element can be in the tab order while being invisible, which is a bug: a hidden control that still takes focus makes the keyboard user disappear for a moment with no explanation at all.\n\nThe focus indicator has to be visible. The default outline is ugly and many projects delete it, but removing it without a replacement makes the page unusable with a keyboard. The modern replacement is the :focus-visible pseudo-class, which paints the ring only when the user is navigating with the keyboard, so the ring can be bold and obvious without flashing on every mouse click.',
        'Любой интерактивный элемент получает фокус, а Tab переносит фокус между элементами в порядке DOM. Этот порядок — это порядок исходника, и CSS его не меняет: перестановка через свойство order или через области grid меняет порядок отрисовки, но не порядок фокуса, поэтому пользователь клавиатуры обходит страницу по одной схеме, а на экране видит другую. Правило: порядок исходника должен быть порядком чтения, а раскладка подстраивается под него.\n\nАтрибут tabindex — место, где всё это ломается. Положительный tabindex выталкивает элемент перед всеми, у кого такого атрибута нет, поэтому единственный tabindex="1" на обёртке переставляет всю страницу, и платят за это все. tabindex="0" делает кастомный элемент фокусируемым на своём месте, а tabindex="-1" оставляет его вне порядка обхода, но позволяет скрипту поставить в него фокус. Именно на втором значении построено управление фокусом.\n\nПорядок фокуса и порядок обхода — не одно и то же. Элемент может быть фокусируемым и оставаться вне порядка обхода, и именно для этого нужен tabindex="-1", а элемент может быть в порядке обхода и при этом быть невидимым, и это уже баг: скрытый элемент, который всё равно берёт фокус, заставляет пользователя клавиатуры исчезнуть на секунду без всякого объяснения.\n\nИндикатор фокуса должен быть виден. Собственный outline некрасив, и многие проекты его удаляют, но удаление без замены делает страницу непригодной для работы с клавиатуры. Современная замена — псевдокласс :focus-visible, который рисует кольцо только при навигации с клавиатуры, так что кольцо может быть заметным и без мигания при каждом клике мышью.'
      ),
      bullets: [
        L('Tab follows DOM order, and CSS reordering does not change it.', 'Tab идёт по порядку DOM, и перестановка в CSS его не меняет.'),
        L('A positive tabindex reorders the whole page, so never use one.', 'Положительный tabindex переставляет всю страницу, поэтому не используйте его.'),
        L('tabindex="0" puts a custom element into the natural order.', 'tabindex="0" встраивает кастомный элемент в естественный порядок.'),
        L('tabindex="-1" allows programmatic focus and skips the tab order.', 'tabindex="-1" разрешает программную установку фокуса и убирает элемент из обхода.'),
        L('A focus indicator must stay visible on every interactive element.', 'Индикатор фокуса должен оставаться видимым на каждом интерактивном элементе.'),
        L(':focus-visible styles the ring for keyboard use without hurting mouse clicks.', ':focus-visible стилизует кольцо для клавиатуры, не мешая кликам мышью.'),
      ],
      code: `<!-- the order is the order of the source -->
<nav>
  <a href="/home">Home</a>
  <a href="/help">Help</a>
</nav>

<!-- focusable by script only, never reached with Tab -->
<div tabindex="-1" id="search-results">Results appear here</div>

<!-- a labelled control for the keyboard path -->
<input type="search" name="q" aria-label="Search">

:focus-visible {
  outline: 3px solid #0b57d0;
  outline-offset: 2px;
}`,
      table: {
        caption: L('What each tabindex value does', 'Что делает каждое значение tabindex'),
        headers: [L('Value', 'Значение'), L('Effect', 'Эффект'), L('Use it for', 'Для чего')],
        rows: [
          [L('omitted', 'нет атрибута'), L('Focusable if the platform says so', 'Фокусируется, если платформа так решила'), L('Normal controls', 'Обычные элементы')],
          [L('0', '0'), L('Joins the tab order in its natural place', 'Включается в порядок обхода на своём месте'), L('Custom widgets that must be reachable', 'Кастомные виджеты, до которых надо дойти')],
          [L('-1', '-1'), L('Focusable by script, skipped by Tab', 'Фокусируется скриптом, пропускается Tab'), L('Dialogs, menus, error summaries', 'Диалоги, меню, сводки ошибок')],
          [L('positive', 'положительное'), L('Jumps ahead of everything without it', 'Выталкивает вперёд всех, у кого его нет'), L('Never', 'Никогда')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Deleting the outline', 'Удаление outline'),
          text: L(
            'The rule outline: none removes the focus indicator for keyboard users and nothing else. Replace it with a custom :focus-visible style instead of leaving the element without any indication of focus.',
            'Правило outline: none убирает индикатор фокуса у пользователей клавиатуры и ни у кого другого. Замените его своим стилем :focus-visible, а не оставляйте элемент вообще без признака фокуса.'
          ),
        },
      ],
      takeaway: L(
        'Keep the DOM order equal to the reading order, use tabindex="-1" for script focus, and never delete the focus indicator.',
        'Держите порядок DOM равным порядку чтения, используйте tabindex="-1" для программного фокуса и никогда не удаляйте индикатор фокуса.'
      ),
      seeAlso: [
        L('Section 1-2: landmarks and the document outline', 'Секция 1-2: лендмарки и структура документа'),
        L('Section 3-6: screen reader semantics and how to test them', 'Секция 3-6: семантика скринридера и как её проверять'),
      ],
    },
    {
      id: 'htmlcss-ch3-s3',
      title: L('ARIA and what it is actually for', 'ARIA и для чего он на самом деле нужен'),
      body: L(
        'ARIA is a set of roles, states and properties that describe a widget to the accessibility tree when the HTML vocabulary does not cover it. The first rule of ARIA is not to use ARIA, and the usual shorthand for the reason is that no ARIA is better than bad ARIA. A native element already carries a role, a name, the keyboard behaviour and the focus behaviour, and all four of them are hard to reproduce by hand.\n\nARIA changes what assistive technology announces and nothing else. role="button" on a div makes a screen reader call it a button, but the div still does not activate on Enter and Space, still has no disabled state and still is not in the tab order. The role promises behaviour that the markup does not deliver, and that promise is worse than no promise at all.\n\nThere are cases where ARIA is the right answer, and they are narrow. A custom widget with no native equivalent needs a role, a name and the state attributes that describe it: aria-expanded on a disclosure, aria-pressed on a toggle button, aria-current="page" on the active item of a navigation list, aria-live on a region whose content changes on its own. The state attributes mean nothing without the role.\n\naria-hidden removes a subtree from the accessibility tree, which is right for an icon that carries no information next to a text label and wrong for a control, because hiding a control from the tree does not hide it from the keyboard. The rule of thumb is short: ARIA changes what is announced, the markup changes what works.',
        'ARIA — это набор ролей, состояний и свойств, которые описывают виджет в дереве доступности там, где словаря HTML не хватает. Первое правило ARIA — не использовать ARIA, и обычно это объясняют формулой «отсутствие ARIA лучше плохого ARIA». Нативный элемент уже несёт роль, имя, клавиатурное поведение и поведение фокуса, и все четыре воспроизвести вручную непросто.\n\nARIA меняет то, что произносит вспомогательная технология, и больше ничего. role="button" на div заставляет скринридер назвать div кнопкой, но div по-прежнему не активируется по Enter и Space, по-прежнему не имеет состояния disabled и по-прежнему не попадает в порядок обхода. Роль обещает поведение, которого в разметке нет, и такое обещание хуже, чем никакого.\n\nСлучаи, где ARIA — правильный ответ, немногочисленны. Кастомный виджет без нативного аналога требует роли, имени и атрибутов состояния: aria-expanded у раскрывающейся панели, aria-pressed у кнопки-переключателя, aria-current="page" у активного пункта навигации, aria-live у области, содержимое которой меняется само. Атрибуты состояния без роли не значат ничего.\n\naria-hidden убирает поддерево из дерева доступности — это правильно для иконки без информации рядом с текстовой меткой и неправильно для элемента управления, потому что скрытие из дерева не скрывает его от клавиатуры. Правило короткое: ARIA меняет то, что произносится, а разметка — то, что работает.'
      ),
      bullets: [
        L('The first rule of ARIA is not to use ARIA when a native element exists.', 'Первое правило ARIA — не использовать его, когда есть нативный элемент.'),
        L('ARIA changes what is announced, not what works.', 'ARIA меняет то, что произносится, а не то, что работает.'),
        L('role="button" does not add Enter and Space activation.', 'role="button" не добавляет активацию по Enter и Space.'),
        L('aria-expanded, aria-pressed and aria-current describe state, not behaviour.', 'aria-expanded, aria-pressed и aria-current описывают состояние, а не поведение.'),
        L('State attributes are meaningless without a role on the same element.', 'Атрибуты состояния бессмысленны без роли на том же элементе.'),
        L('aria-hidden removes a subtree from the tree, not from the tab order.', 'aria-hidden убирает поддерево из дерева, а не из порядка обхода.'),
      ],
      code: `<!-- the current page in a navigation list -->
<nav aria-label="Primary">
  <a href="/catalog" aria-current="page">Catalog</a>
  <a href="/pricing">Pricing</a>
</nav>

<!-- a disclosure: the state has to be announced -->
<button type="button" aria-expanded="false" aria-controls="filters">
  Filters
</button>
<div id="filters" hidden>
  <label for="price">Max price</label>
  <input id="price" name="price" type="number">
</div>

<!-- a message that appears without a page reload -->
<p role="status" aria-live="polite">Saved</p>`,
      table: {
        caption: L('Native markup first, ARIA only where there is no native equivalent', 'Сначала нативная разметка, ARIA только там, где аналога нет'),
        headers: [L('Need', 'Задача'), L('Native markup', 'Нативная разметка'), L('ARIA version', 'ARIA-версия')],
        rows: [
          [L('Disclosure', 'Раскрывающаяся панель'), L('details and summary', 'details и summary'), L('aria-expanded plus aria-controls', 'aria-expanded плюс aria-controls')],
          [L('Toggle button', 'Кнопка-переключатель'), L('button with aria-pressed', 'button с aria-pressed'), L('aria-pressed', 'aria-pressed')],
          [L('Current page', 'Текущая страница'), L('none', 'нет'), L('aria-current="page"', 'aria-current="page"')],
          [L('Live message', 'Живое сообщение'), L('output', 'output'), L('role="status" or aria-live', 'role="status" или aria-live')],
          [L('Group of controls', 'Группа элементов'), L('fieldset and legend', 'fieldset и legend'), L('role="group" plus aria-labelledby', 'role="group" плюс aria-labelledby')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Redundant roles', 'Избыточные роли'),
          text: L(
            'Adding role="button" to a real button, role="navigation" to a nav or role="list" to a ul changes nothing for the user and only adds a place for the markup to rot. Redundant ARIA is not harmless documentation, it is an extra promise.',
            'Добавление role="button" к настоящей кнопке, role="navigation" к nav или role="list" к ul ничего не меняет для пользователя и только создаёт место, где разметка со временем разъедется. Избыточный ARIA — не безобидная документация, а лишнее обещание.'
          ),
        },
      ],
      takeaway: L(
        'Use a native element when one exists, and reach for ARIA only to describe a custom widget you had to build.',
        'Берите нативный элемент, когда он есть, а ARIA подключайте только для описания собственного кастомного виджета.'
      ),
      seeAlso: [
        L('Section 2-4: buttons and link semantics', 'Секция 2-4: кнопки и семантика ссылок'),
        L('Section 3-2: keyboard navigation and focus order', 'Секция 3-2: навигация с клавиатуры и порядок фокуса'),
        L('Section 2-2: labels, fieldsets and legends', 'Секция 2-2: метки, fieldset и legend'),
      ],
    },
    {
      id: 'htmlcss-ch3-s4',
      title: L('Colour, contrast and visual design', 'Цвет, контраст и визуальный дизайн'),
      body: L(
        'Colour carries meaning in almost every interface, and for a person with reduced vision or a screen in sunlight it may carry none at all. The contrast requirements are numeric for a reason: text needs a ratio of at least 4.5 to 1 against its background, large text needs 3 to 1, and non-text elements such as input borders, icons and focus indicators need 3 to 1 as well. Those numbers are the success criteria of WCAG, not folklore.\n\nColour is also never the only signal. A form error drawn as a red border tells a person who cannot tell red from grey that the field is fine. Add an icon, a message, a text or a change of border thickness, and the state survives without colour. The same applies to links inside a paragraph: an underline is what distinguishes them from the surrounding text.\n\nForced colours mode is the platform answer to users who need a specific palette. In that mode the operating system overrides the colours of the page, and any meaning that lived only in a background colour disappears. Borders, underlines, icons and system colours are what survive, so a design that already does not rely on colour alone works there with no changes at all.\n\nTesting contrast is a numbers problem, and there are tools for it: the contrast section of the browser developer tools, and a contrast checker extension that reads the computed styles of the page. The measurement needs the real background colour, which is where a gradient or a transparent background produces a misleading number, so a design has to keep a solid colour behind the text.',
        'Цвет несёт смысл почти в каждом интерфейсе, а для человека со сниженным зрением или с экраном на солнце он может не нести никакого. Требования к контрасту числовые, и это не каприз: для текста нужен контраст не меньше 4,5 к 1 с фоном, для крупного текста 3 к 1, а для нетекстовых элементов вроде границ полей, иконок и индикаторов фокуса тоже 3 к 1. Это критерии WCAG, а не народное предание.\n\nЦвет никогда не единственный сигнал. Ошибка формы, нарисованная красной рамкой, скажет человеку, который не отличает красный от серого, что поле в порядке. Добавьте иконку, сообщение, текст или измените толщину рамки, и состояние сохранится без цвета. То же и со ссылками внутри абзаца: их отличает подчёркивание.\n\nРежим принудительных цветов — ответ платформы пользователям, которым нужна своя палитра. В нём операционная система переопределяет цвета страницы, и любой смысл, живший только в фоновом цвете, исчезает. Выживают границы, подчёркивания, иконки и системные цвета, поэтому дизайн, который и так не зависит от одного цвета, работает там без изменений.\n\nПроверка контраста — это задача с числами, и инструменты для неё есть: раздел контраста в инструментах разработчика браузера и расширения, читающие вычисленные стили страницы. Измерению нужен реальный фоновый цвет, и вот тут градиент или прозрачный фон дают обманчивое число, поэтому за текстом должен оставаться сплошной цвет.'
      ),
      bullets: [
        L('Body text needs a contrast ratio of at least 4.5 to 1.', 'Для основного текста нужен контраст не меньше 4,5 к 1.'),
        L('Large text needs 3 to 1, and so do borders, icons and focus indicators.', 'Крупному тексту и границам, иконкам и индикаторам фокуса нужно 3 к 1.'),
        L('Colour must never be the only signal of an error or a state.', 'Цвет никогда не должен быть единственным сигналом ошибки или состояния.'),
        L('Links inside a paragraph need an underline, not only a colour.', 'Ссылки внутри абзаца нужно подчёркивание, а не только цвет.'),
        L('Forced colours mode removes background colours from the meaning.', 'Режим принудительных цветов убирает из смысла фоновые цвета.'),
        L('Contrast tools need a solid background behind the text to measure.', 'Инструментам проверки контраста нужен сплошной фон за текстом.'),
      ],
      code: `<label for="email">Email</label>
<input id="email" name="email" type="email" aria-describedby="email-error" required>
<p id="email-error">Enter an email address like name@example.com</p>

:root {
  --text: #1a1a1a;     /* over 16 to 1 on white */
  --muted: #595959;    /* 7.0 to 1 on white */
  --focus: #0b57d0;
}

:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 2px;
}

.field-error {
  border: 2px solid #b3261e;  /* thicker border, not only a colour */
}`,
      table: {
        caption: L('Minimum contrast ratios', 'Минимальные отношения контраста'),
        headers: [L('Element', 'Элемент'), L('Minimum ratio', 'Минимум'), L('Criterion', 'Критерий')],
        rows: [
          [L('Body text', 'Основной текст'), L('4.5 to 1', '4,5 к 1'), L('1.4.3 Contrast (Minimum)', '1.4.3 Contrast (Minimum)')],
          [L('Large text (24px, or 18.66px bold)', 'Крупный текст (24px или 18,66px полужирный)'), L('3 to 1', '3 к 1'), L('1.4.3 Contrast (Minimum)', '1.4.3 Contrast (Minimum)')],
          [L('Icons and control borders', 'Иконки и границы элементов'), L('3 to 1', '3 к 1'), L('1.4.11 Non-text Contrast', '1.4.11 Non-text Contrast')],
          [L('Focus indicator against the background', 'Индикатор фокуса к фону'), L('3 to 1', '3 к 1'), L('1.4.11 Non-text Contrast', '1.4.11 Non-text Contrast')],
          [L('Disabled controls', 'Отключённые элементы'), L('no requirement', 'не требуется'), L('excluded from the criteria', 'исключены из критериев')],
        ],
      },
      takeaway: L(
        'Check the numbers with a tool, and never let a state survive only as a colour.',
        'Проверяйте числа инструментом и никогда не оставляйте состояние, выраженное только цветом.'
      ),
      seeAlso: [
        L('Section 3-5: alt text, captions and media', 'Секция 3-5: alt-текст, титры и медиа'),
        L('Chapter 8: responsive design, animation and rendering cost', 'Глава 8: адаптивность, анимация и стоимость отрисовки'),
      ],
    },
    {
      id: 'htmlcss-ch3-s5',
      title: L('Alt text, captions and media', 'Alt-текст, титры и медиа'),
      body: L(
        'The alt attribute is the text alternative of an image, and it describes the purpose of the image in its context, not its appearance. A chart next to a paragraph needs an alt that says what the chart shows. A photograph of a product usually needs a description of the product. An image that only decorates, a background pattern or a spacer, takes an empty alt attribute and nothing else, which tells assistive technology to skip it.\n\nWriting image of before the description is the most common mistake, because the reader already knows from the announcement that it is an image. An alt that repeats the file name or repeats the visible caption adds nothing. When the image is the only content of a link, the alt becomes the name of the link, so it has to describe the destination rather than the picture.\n\nVideo and audio need the same treatment. A track element with kind="captions" and a srclang attribute attaches a subtitle track, and the track file has to be referenced from the markup rather than uploaded separately to the video host. A description track kind="descriptions" covers the audio description for blind viewers, and a transcript on the page covers everything else, including search and translation.\n\nGive every image its dimensions. The width and height attributes let the browser reserve the space before the file arrives, which removes the layout shift that pushes the text down the page, and the loading="lazy" attribute keeps offscreen images from competing with the content the reader is actually looking at. The figure and figcaption elements pair an image with its caption and own their own margins, which removes the last reason for a wrapper div.',
        'Атрибут alt — это текстовая альтернатива изображения, и он описывает назначение картинки в её контексте, а не её вид. У графика рядом с абзацем alt должен говорить, что на графике. У фотографии товара alt обычно описывает товар. Изображение, которое только украшает, фоновая текстура или распорка, получает пустой alt и больше ничего, и это говорит вспомогательной технологии пропустить его.\n\nСамая частая ошибка — начать alt со слов «изображение», потому что читатель и так знает из объявления, что перед ним изображение. Alt, повторяющий имя файла или видимую подпись, не добавляет ничего. Когда изображение — единственное содержимое ссылки, alt становится именем ссылки, поэтому он должен описывать адрес назначения, а не картинку.\n\nС видео и аудио нужно то же самое. Элемент track с kind="captions" и атрибутом srclang подключает дорожку субтитров, и файл дорожки должен быть указан в разметке, а не загружен отдельно на видеохостинг. Дорожка kind="descriptions" описывает звуковое описание для незрячих, а транскрипт на странице покрывает всё остальное, включая поиск и перевод.\n\nКаждому изображению нужны размеры. Атрибуты width и height позволяют браузеру зарезервировать место до загрузки файла, и это убирает скачок раскладки, который сдвигает текст вниз по странице, а loading="lazy" не даёт изображениям за экраном конкурировать с содержимым, которое читатель смотрит прямо сейчас. Элементы figure и figcaption связывают картинку с подписью и владеют своими отступами, и это снимает последнюю причину для обёртки div.'
      ),
      bullets: [
        L('alt describes the purpose of the image in context, not its appearance.', 'alt описывает назначение изображения в контексте, а не его вид.'),
        L('A decorative image takes alt="" so that it is skipped.', 'Декоративное изображение получает alt="", чтобы его пропускали.'),
        L('The alt of an image inside a link becomes the name of the link.', 'alt изображения внутри ссылки становится именем ссылки.'),
        L('Captions travel in the markup with a track element and a srclang.', 'Титры едут в разметке: элемент track и атрибут srclang.'),
        L('A transcript covers search, translation and every unsupported player.', 'Транскрипт покрывает поиск, перевод и любой неподдерживаемый плеер.'),
        L('width and height on an image remove the layout shift when it loads.', 'width и height на изображении убирают скачок раскладки при загрузке.'),
      ],
      code: `<figure>
  <img src="/chart.png" alt="Revenue grew from 1.2 to 1.9 million euros between 2024 and 2026"
       width="640" height="360" loading="lazy">
  <figcaption>Revenue by quarter, in euros</figcaption>
</figure>

<!-- decorative: the empty alt says skip it -->
<img src="/divider.svg" alt="" aria-hidden="true">

<video controls width="640" poster="/poster.jpg">
  <source src="/demo.mp4" type="video/mp4">
  <track kind="captions" src="/captions-en.vtt" srclang="en" label="English" default>
  Your browser does not support the video. <a href="/transcript">Read the transcript</a>.
</video>`,
      table: {
        caption: L('What to put in alt, and what to leave out', 'Что писать в alt, а что оставить пустым'),
        headers: [L('Image', 'Изображение'), L('alt value', 'Значение alt'), L('Reason', 'Причина')],
        rows: [
          [L('Informative', 'Информативное'), L('Describes the content', 'Описывает содержимое'), L('The reader misses the information otherwise', 'Иначе читатель не получит информацию')],
          [L('Decorative', 'Декоративное'), L('alt=""', 'alt=""'), L('Nothing to announce', 'Произносить нечего')],
          [L('Only content of a link', 'Единственное содержимое ссылки'), L('Describes the destination', 'Описывает назначение'), L('The alt becomes the link name', 'Alt становится именем ссылки')],
          [L('Already has a visible caption', 'Уже есть видимая подпись'), L('alt="" plus a figcaption', 'alt="" и figcaption'), L('The caption carries the text', 'Текст несёт подпись')],
          [L('Icon next to a text label', 'Иконка рядом с текстовой меткой'), L('alt="" and aria-hidden', 'alt="" и aria-hidden'), L('The label carries the meaning', 'Смысл несёт метка')],
        ],
      },
      takeaway: L(
        'Write alt for the purpose of the image, leave it empty when the image carries nothing, and attach captions in the markup.',
        'Пишите alt о назначении изображения, оставляйте его пустым, когда смысла нет, и подключайте титры в разметке.'
      ),
      seeAlso: [
        L('Section 3-6: screen reader semantics and how to test them', 'Секция 3-6: семантика скринридера и как её проверять'),
        L('Section 1-1: why semantics come first', 'Секция 1-1: почему начинают с семантики'),
      ],
    },
    {
      id: 'htmlcss-ch3-s6',
      title: L('Screen reader semantics and how to test them', 'Семантика скринридера и как её проверять'),
      body: L(
        'A screen reader announces four things about any element: its role, its name, its state and its value. The role comes from the element and its ARIA attributes, the name from the content, from a label or from an aria-label, the state from attributes such as aria-expanded or aria-checked, and the value from the current contents of the control. When something is announced badly, the reason is almost always that one of those four is missing.\n\nThe screen reader is not the voice of the browser, it is an application that reads the accessibility tree and speaks it. That distinction matters because the tree is what the tests should look at. A page can pass a screen reader test and still have a wrong tree, and it can have a right tree and still read badly because of the way the screen reader is configured. The tree is the contract, the reading is one implementation of it.\n\nTesting has two layers and the first one is free. Put the mouse aside and use the page: Tab and Shift+Tab to walk through everything, watch where the focus goes, check that the order matches the visual order, open every disclosure, submit every form and look for traps. Then turn on a screen reader and read the page once from the top without looking at the screen, and note every phrase that does not make sense.\n\nThe tools help with the second layer and they cannot replace it. The browser developer tools have an accessibility panel with the computed properties, an accessibility tree viewer that shows the tree as the screen reader receives it, and automated audits from Lighthouse or axe that catch the mechanical problems such as a missing label or a broken contrast pair. An audit reports what it can check, and a human still has to decide whether the page makes sense when it is heard.',
        'Скринридер произносит четыре вещи о любом элементе: роль, имя, состояние и значение. Роль приходит от элемента и его ARIA-атрибутов, имя — от содержимого, от метки или от aria-label, состояние — от атрибутов вроде aria-expanded или aria-checked, а значение — от текущего содержимого элемента управления. Когда что-то произносится плохо, причина почти всегда в том, что одно из четырёх отсутствует.\n\nСкринридер — не голос браузера, а приложение, которое читает дерево доступности и озвучивает его. Различие важно, потому что проверять надо именно дерево. Страница может пройти проверку скринридером и всё равно иметь неверное дерево, а может иметь верное дерево и всё равно читаться плохо из-за настроек скринридера. Дерево — это контракт, а чтение — одна из его реализаций.\n\nПроверка состоит из двух слоёв, и первый бесплатный. Отложите мышь и пользуйтесь страницей: Tab и Shift+Tab обходят всё, смотрите, куда уходит фокус, сверяйте порядок с визуальным, открывайте все раскрывающиеся панели, отправляйте все формы и ищите ловушки. Потом включите скринридер и прочитайте страницу с начала до конца, не глядя на экран, и отмечайте каждую фразу, которая не имеет смысла.\n\nИнструменты помогают со вторым слоем и не заменяют его. В инструментах разработчика есть панель доступности с вычисленными свойствами, просмотрщик дерева доступности, показывающий дерево таким, каким его получает скринридер, и автоматические проверки от Lighthouse или axe, ловящие механические проблемы вроде отсутствующей метки или сломанной пары контраста. Автопроверка сообщает только о том, что умеет, а решение, понятна ли страница на слух, остаётся за человеком.'
      ),
      bullets: [
        L('Every element is announced with a role, a name, a state and a value.', 'Любой элемент произносится как роль, имя, состояние и значение.'),
        L('A bad announcement almost always means one of those four is missing.', 'Плохое объявление почти всегда означает, что одно из четырёх отсутствует.'),
        L('The accessibility tree is the contract, the screen reader is one implementation.', 'Дерево доступности — контракт, скринридер — одна из реализаций.'),
        L('The keyboard-only pass is free and finds most focus bugs.', 'Проход только с клавиатуры бесплатен и находит большинство багов с фокусом.'),
        L('Automated audits catch mechanical issues, not meaning.', 'Автопроверки ловят механические проблемы, а не смысл.'),
        L('Read the page aloud once without the screen to hear what a user hears.', 'Прочитайте страницу вслух без экрана — так вы услышите то, что слышит пользователь.'),
      ],
      code: `<!-- role, name, state and value in one place -->
<button type="button" aria-expanded="false" aria-controls="panel">
  Details
</button>

<div id="panel">
  <label for="size">Size</label>
  <select id="size" name="size">
    <option value="s">Small</option>
    <option value="l" selected>Large</option>
  </select>
</div>

<!-- a live region for messages that appear on their own -->
<p role="status">3 results found</p>`,
      table: {
        caption: L('Where each part of the announcement comes from', 'Откуда берётся каждая часть объявления'),
        headers: [L('Announced part', 'Часть объявления'), L('Source', 'Источник'), L('Typical failure', 'Типичный провал')],
        rows: [
          [L('Role', 'Роль'), L('The element, or a role attribute', 'Элемент или атрибут role'), L('A div used instead of a button', 'Вместо кнопки поставлен div')],
          [L('Name', 'Имя'), L('The content, a label, alt or aria-label', 'Содержимое, метка, alt или aria-label'), L('A field with no label', 'Поле без метки')],
          [L('State', 'Состояние'), L('aria-expanded, aria-checked, disabled', 'aria-expanded, aria-checked, disabled'), L('A toggle with no aria-pressed', 'Переключатель без aria-pressed')],
          [L('Value', 'Значение'), L('The current content of the control', 'Текущее содержимое элемента'), L('A custom widget that does not expose it', 'Кастомный виджет не отдаёт значение')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Read it out loud', 'Читайте вслух'),
          text: L(
            'The cheapest test of an accessible name is to read the label and the announcement of a control together. If the pair says "Email, edit text, blank" the name works; if it says "Edit, blank" the label is missing.',
            'Самый дешёвый тест доступного имени — прочитать метку и объявление элемента вместе. Если получается «Почта, править текст, пусто», имя работает; если «Править, пусто», метки нет.'
          ),
        },
      ],
      takeaway: L(
        'Test with the keyboard first and with a screen reader second, and read the announcements out loud to yourself.',
        'Сначала проверяйте с клавиатуры, потом со скринридером и читайте объявления вслух самому себе.'
      ),
      seeAlso: [
        L('Section 3-2: keyboard navigation and focus order', 'Секция 3-2: навигация с клавиатуры и порядок фокуса'),
        L('Section 3-3: ARIA and what it is actually for', 'Секция 3-3: ARIA и для чего он на самом деле нужен'),
        L('Chapter 1: semantic markup and document structure', 'Глава 1: семантическая разметка и структура документа'),
      ],
    },
  ],
};
