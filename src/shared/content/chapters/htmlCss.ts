import type { Chapter } from '../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssChapters: Chapter[] = [
  {
    id: 'htmlcss-ch1',
    title: L('Semantic markup and landmarks', 'Семантическая разметка и лендмарки'),
    summary: L(
      'How to choose elements that describe the meaning of content, how landmarks and headings shape the document outline, and why native forms and buttons beat reimplemented ones.',
      'Как выбирать элементы, описывающие смысл содержимого, как лендмарки и заголовки формируют структуру документа и почему нативные формы и кнопки лучше самописных.'
    ),
    sections: [
      {
        id: 'htmlcss-ch1-s1',
        title: L('Why semantics come first', 'Почему начинают с семантики'),
        body: L(
          'The HTML element you choose is an API call to the browser, not a styling decision. A button brings keyboard activation, focus behaviour, a disabled state, participation in form submission and a place in the accessibility tree, all of it implemented by the browser vendor. A div with a click handler brings none of it: every behaviour has to be reimplemented, and each reimplementation is a place where the browser conventions go missing.\n\nHTML5 turned this into a classification problem. The specification defines categories of content, and every element belongs to one: flow, phrasing, sectioning, embedded and interactive content. The classification is not academic, it decides which elements may contain which, and it is what lets a parser, a validator and a screen reader agree on what a document means.\n\nThe rule that follows is short: pick the element that describes what the content is, and let classes describe how it should look. A paragraph is a p, a self-contained unit of content is an article, a set of navigation links is a nav, a control that triggers an action is a button. When a div is unavoidable, add the role and attributes it needs, but treat that as the fallback path, not the starting point.',
          'HTML-элемент, который вы выбираете, — это вызов API браузера, а не решение о стиле. Тег button приносит активацию с клавиатуры, поведение фокуса, состояние disabled, участие в отправке формы и место в дереве доступности, и всё это реализовано вендором браузера. Div с обработчиком click не приносит ничего из этого: каждое поведение приходится писать заново, и в каждой реализации может не хватать того, что браузер даёт бесплатно.\n\nHTML5 превратил это в задачу классификации. Спецификация определяет категории содержимого, и каждый элемент принадлежит одной из них: flow, phrasing, sectioning, embedded и interactive content. Классификация не академическая: она определяет, какие элементы могут содержать какие, и именно благодаря ей парсер, валидатор и скринридер сходятся во мнении о смысле документа.\n\nИз этого следует простое правило: берите элемент, который описывает, чем является содержимое, а классы оставляйте для того, как оно должно выглядеть. Текст абзацем — это p, самостоятельный фрагмент контента — article, набор ссылок навигации — nav, элемент управления, вызывающий действие, — button. Когда div неизбежен, добавьте нужные role и атрибуты, но относитесь к этому как к запасному пути, а не к отправной точке.'
        ),
        bullets: [
          L('An element choice is an API call to the browser, not a styling decision.', 'Выбор элемента — это вызов API браузера, а не решение о стиле.'),
          L('The native element brings keyboard, focus, state and form behaviour for free.', 'Нативный элемент бесплатно даёт клавиатуру, фокус, состояние и поведение в форме.'),
          L('Content categories decide which elements may nest inside which.', 'Категории содержимого определяют, что во что может вкладываться.'),
          L('Reach for div plus role only when no native element fits.', 'До div с role стоит опускаться, только если нативного элемента нет.'),
        ],
        code: `<!-- instead of <div class="btn" onclick="submit()"> -->
<button type="submit" class="btn">Save changes</button>

<!-- the element tells the browser what it is -->
<article class="post">
  <h2>Shipping a design system</h2>
  <p>The card is a self-contained piece of content.</p>
</article>`,
        takeaway: L(
          'Choose the element that names what the content is; classes are for looks, never for meaning.',
          'Выбирайте элемент, который называет суть содержимого; классы — для внешнего вида, никогда для смысла.'
        ),
      },
      {
        id: 'htmlcss-ch1-s2',
        title: L('Landmarks and the document outline', 'Лендмарки и структура документа'),
        body: L(
          'Landmarks are the regions a screen reader user jumps between, and a small set of elements defines them: header, nav, main, aside and footer. The main element matters most, because it marks the part of the document that is unique to that page. A page with two main elements, or with none at all, gives the user no reliable entry point.\n\nHeadings form the outline. The h1 is the top-level heading of the page, h2 and h3 nest under it, and the number describes the depth of the section rather than the visual size. Heading levels must never be chosen by appearance: a heading that merely looks like an h1 still announces itself as an h4, and the outline the screen reader builds will be wrong. A small bold line is a p with a class.\n\nOne more thing has to be right: the order of elements in the source. Visual order and DOM order should match. When CSS reorders a navigation column and a main column, a keyboard user tabs in DOM order while seeing a different arrangement on screen. If the visual order genuinely differs, fix the source order and let the layout adapt, or offer a skip link that jumps straight to the main content.',
          'Лендмарки — это области, между которыми перемещается пользователь скринридера, и задаёт их небольшой набор элементов: header, nav, main, aside и footer. Важнее всех main, потому что он помечает часть документа, уникальную для этой страницы. Страница с двумя main или вовсе без него не даёт пользователю надёжной точки входа и возможности пропустить остальное.\n\nЗаголовки формируют структуру. h1 — заголовок верхнего уровня страницы, h2 и h3 вложены в него, а число описывает глубину раздела, а не визуальный размер. Уровень заголовка никогда не выбирают по внешнему виду: заголовок, который лишь выглядит как h1, всё равно объявляется как h4, и структура, которую строит скринридер, окажется неверной. Мелкая жирная строка — это p с классом.\n\nЕщё одно требование — порядок элементов в исходнике. Визуальный порядок и порядок DOM должны совпадать. Когда CSS переставляет колонку навигации и основную колонку, пользователь клавиатуры перебирает их в порядке DOM, видя на экране другую расстановку, и несоответствие дезориентирует. Если визуальный порядок действительно отличается, исправляйте порядок в исходнике и подстраивайте вёрстку либо предложите ссылку-переход, которая сразу уводит к основному содержимому.'
        ),
        bullets: [
          L('There must be exactly one main per page.', 'На странице должен быть ровно один main.'),
          L('Heading level expresses nesting depth, never font size.', 'Уровень заголовка выражает глубину вложенности, а не размер шрифта.'),
          L('DOM order and visual order must agree, or the page gets a skip link.', 'Порядок DOM и визуальный порядок должны совпадать, иначе нужна ссылка-переход.'),
          L('Landmarks are the navigation of a screen reader, not decoration.', 'Лендмарки — это навигация скринридера, а не украшение.'),
        ],
        code: `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>
    <nav aria-label="Primary">
      <a href="/catalog">Catalog</a>
    </nav>
  </header>

  <main id="main">
    <h1>Checkout</h1>
    <section>
      <h2>Payment</h2>
      <h3>Card</h3>
    </section>
  </main>

  <footer><p>2026</p></footer>
</body>`,
        takeaway: L(
          'One main, a truthful heading outline and matching DOM and visual order make a document navigable without sight.',
          'Один main, честная структура заголовков и совпадение DOM и визуального порядка делают документ navigable без зрения.'
        ),
      },
      {
        id: 'htmlcss-ch1-s3',
        title: L('Forms, buttons and native behaviour', 'Формы, кнопки и нативное поведение'),
        body: L(
          'A form is a unit of interaction with a server, and the form element makes the browser treat it as one. It gives submission on Enter, the link between a label and its field, the validation messages and the encoding of the data. Everything assembled by hand from divs and key handlers is already there, consistent across browsers.\n\nThe label is not decoration. A label is tied to its control by the for attribute or by wrapping it, and that tie lets a screen reader announce the field name and makes a click on the label focus the control. A placeholder is not a substitute: it disappears the moment the user types, and contrast rules for it are weaker than for real text.\n\nFor actions use a button. A button has a type, a disabled state, activation on Enter and Space, and submits its form when the type is submit. An anchor with an href navigates, and it should navigate: links point at URLs, can be opened in a new tab and crawled. A button disguised as a link is an accessibility regression for keyboard users.\n\nDo not disable the submit button until the form is valid: it hides the reason the user cannot continue. Validate on submit, show the error next to the field, keep the button enabled.',
          'Форма — это единица взаимодействия с сервером, и именно элемент form заставляет браузер воспринимать её так. Он даёт отправку по Enter, связь между label и его полем, сообщения валидации и кодирование отправляемых данных. Всё, что иначе собиралось бы руками из div и обработчиков клавиш, уже есть и уже согласовано между браузерами.\n\nLabel — не украшение. Метка связана с полем через атрибут for или через обёртывание, и именно эта связь позволяет скринридеру произнести название поля, а клику по метке — перевести фокус в поле. Placeholder не заменяет метку: он исчезает, как только пользователь начинает печатать, произносится ненадёжно, а требования к контрасту для него намного слабее, чем для обычного текста.\n\nДля действий используйте button. У кнопки есть type, состояние disabled, активация и по Enter, и по Space, а при type=submit она отправляет свою форму. Anchor с href переходит, и переходить ей и надо: ссылки ведут на URL, их можно открыть в новой вкладке, скопировать и проиндексировать. Кнопка, выданная за ссылку, — небольшая регрессия доступности для всех, кто работает с клавиатурой.\n\nНе делайте кнопку отправки disabled, пока форма невалидна. Так вы прячете причину, по которой пользователь не может продолжить, и ломаете сценарий для пользователя скринридера, который так и не узнает, что кнопка стала активной. Валидируйте по отправке, показывайте ошибку рядом с полем и оставляйте кнопку активной.'
        ),
        bullets: [
          L('A label is linked to its field and doubles as a click target.', 'Метка связана со своим полем и работает как цель клика.'),
          L('A placeholder is not a label: it vanishes on the first keystroke.', 'Placeholder — не метка: он исчезает после первого нажатия клавиши.'),
          L('Buttons perform actions, links navigate to URLs.', 'Кнопки выполняют действия, ссылки ведут на URL.'),
          L('Keep the submit button enabled and show the reason for the error.', 'Кнопку отправки держите активной и показывайте причину ошибки.'),
        ],
        code: `<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email" />

  <label for="plan">Plan</label>
  <select id="plan" name="plan">
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>

  <button type="submit">Subscribe</button>
</form>`,
        takeaway: L(
          'Native forms already contain the keyboard, validation and submission behaviour, so reimplementing it only loses ground.',
          'Нативные формы уже содержат клавиатурное поведение, валидацию и отправку, поэтому своя реализация только теряет.'
        ),
      },
    ],
  },
  {
    id: 'htmlcss-ch2',
    title: L('Box model, cascade and custom properties', 'Бокс-модель, каскад и кастомные свойства'),
    summary: L(
      'How the box model computes every size, how the cascade decides which declaration wins, and how custom properties build themes without a build step.',
      'Как бокс-модель считает любой размер, как каскад выбирает победившее объявление и как кастомные свойства строят темы без сборки.'
    ),
    sections: [
      {
        id: 'htmlcss-ch2-s1',
        title: L('The box model', 'Бокс-модель'),
        body: L(
          'Every element in CSS is a rectangle of four nested boxes: content, padding, border and margin. Padding is the space inside the border, the border sits between padding and margin, and the margin is the space outside it, which never takes a background colour.\n\nThe width property means different things depending on box-sizing. With the default content-box, width sets the content width only, so the element ends up wider than written by its padding and borders. With border-box, width sets the border edge, and padding and border are subtracted from the inside. The second behaviour is what the author almost always meant, which is why every project resets box-sizing: border-box everywhere.\n\nMargins collapse: two vertical margins between siblings meet and the larger one wins, and a margin can collapse through a parent with no padding. That is the classic bug where the first child pushes the container down, and the workaround is padding the parent. Padding, border, overflow and any flex or grid container stop the collapsing.\n\nSizes also have floors and ceilings. min-width and max-width beat width, and the automatic minimum size of a flex item equals its content, so a long word can push a flex row wider than the screen. min-width: 0 removes that floor, the standard fix for truncation with an ellipsis.',
          'Любой элемент в CSS — это прямоугольник из четырёх вложенных коробок: контент, padding, рамка и margin. Контентная коробка содержит текст или заменяемый элемент, padding — пространство внутри рамки, рамка рисуется между padding и margin, а margin — пространство снаружи рамки, и фон для margin не рисуется никогда.\n\nСвойство width означает разные вещи в зависимости от box-sizing. По умолчанию content-box задаёт ширину только содержимого, поэтому элемент оказывается шире записанного на сумму padding и рамок. При border-box width задаёт внешнюю границу рамки, а padding и рамка вычитаются изнутри. Второе поведение почти всегда и есть то, что имел в виду автор, поэтому почти в каждом проекте есть сброс стилей, ставящий box-sizing: border-box всем элементам.\n\nВнешние отступы схлопываются: вертикальные margin соседей встречаются, и побеждает больший; margin может схлопнуться и через родителя без padding и без рамки. Отсюда классический баг, когда первый ребёнок контейнера сдвигает сам контейнер, и классическое лечение — добавить padding родителю. Схлопыванию мешают padding, рамка, overflow, а также контейнеры flex и grid, поэтому одна и та же вёрстка внутри flex-родителя ведёт себя иначе.\n\nУ размеров есть нижняя и верхняя границы. min-width и max-width побеждают width, а автоматический минимум flex-элемента равен его содержимому, поэтому длинное слово может растянуть flex-строку шире экрана. min-width: 0 на flex-элементах убирает этот порог, и это стандартное решение для обрезки текста с многоточием.'
        ),
        bullets: [
          L('Every element is content plus padding plus border plus margin.', 'Любой элемент — это контент плюс padding плюс рамка плюс margin.'),
          L('border-box makes width mean what most authors expect.', 'border-box делает width таким, как его ожидает большинство.'),
          L('Adjacent vertical margins collapse, and the larger one wins.', 'Соседние вертикальные margin схлопываются, побеждает больший.'),
          L('min-width: 0 removes the content-based floor of a flex item.', 'min-width: 0 убирает порог flex-элемента, заданный его содержимым.'),
        ],
        code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 16px;
  border: 1px solid #d0d7de;
}

.flex-item {
  min-width: 0;      /* allows shrinking below the content width */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
        takeaway: L(
          'Set border-box globally, remember that margins collapse, and give flex items min-width: 0 before you debug a broken row.',
          'Включайте border-box глобально, помните про схлопывание margin и ставьте min-width: 0 flex-элементам до отладки сломанной строки.'
        ),
      },
      {
        id: 'htmlcss-ch2-s2',
        title: L('The cascade, specificity and inheritance', 'Каскад, специфичность и наследование'),
        body: L(
          'When several declarations target the same element, the browser picks one, and the rules apply in a fixed order: origin and importance first, then cascade layers, then specificity, then source order. Origin means author styles beat user-agent styles, and user styles sit between the two. An important declaration beats an unimportant one regardless of specificity, which is why !important serves accessibility overrides and, more often, acts as an escape hatch.\n\nSpecificity is a tuple of three numbers: the count of id selectors, then of class and attribute selectors, then of element and pseudo-element selectors. They are compared left to right and the first difference decides. Inline styles beat everything not important, and important inline styles beat important id selectors.\n\nInheritance is a separate mechanism from the cascade. Typographic properties are inherited by default, others such as margin are not. Inherited values take part in the cascade as if declared on the element itself, at the specificity of the parent.\n\nModern CSS adds cascade layers, which change the priority order before specificity is considered. Code inside a layer always loses to code outside any layer, and among layers the later declaration wins. This is the clean way to build a design system: put resets and third-party CSS in low layers, the design system in the middle, component overrides on top.',
          'Когда несколько объявлений относятся к одному элементу, браузер выбирает одно. Правила применяются в фиксированном порядке: сначала источник и важность, затем каскадные слои, затем специфичность, затем порядок в исходнике. Источник означает, что стили автора побеждают стили пользовательского агента, а пользовательские стили — те, что человек добавил в своём браузере, — находятся между ними. Важное объявление побеждает неважное независимо от специфичности, поэтому !important служит и переопределениям ради доступности, и гораздо чаще работает как костыль, который потом приходится отменять.\n\nСпецифичность — тройка чисел: количество id-селекторов, затем классов и атрибутов, затем элементов и псевдоэлементов. Сравнивают слева направо, и решает первое различие. Инлайновые стили сильнее всего, кроме !important, а важные инлайновые сильнее важных id-селекторов. Порядок классов внутри селектора ничего не значит: .a.b и .b.a имеют одинаковую специфичность.\n\nНаследование — отдельный механизм, не каскад. Некоторые свойства, в основном типографические, наследуются по умолчанию, другие, вроде margin, — нет. Унаследованные значения участвуют в каскаде так, будто объявлены на самом элементе, но со специфичностью родителя.\n\nСовременный CSS добавляет каскадные слои: они меняют порядок приоритетов ещё до учёта специфичности. Код внутри слоя всегда проигрывает коду вне слоёв, а между слоями побеждает объявленный позже. Это чистый способ собрать дизайн-систему: сбросы и сторонний CSS кладут в низкие слои, дизайн-систему — в средний, переопределения компонентов — в верхний, и тогда со специфичностью можно не бороться.'
        ),
        bullets: [
          L('The order is origin, layers, specificity, then source order.', 'Порядок: источник, слои, специфичность, затем порядок в исходнике.'),
          L('!important inverts specificity and is usually a debt, not a tool.', '!important переворачивает специфичность и обычно означает долг, а не инструмент.'),
          L('Inheritance is a separate mechanism from the cascade.', 'Наследование — механизм, отдельный от каскада.'),
          L('Cascade layers let you set the priority order once, globally.', 'Каскадные слои позволяют один раз задать порядок приоритетов глобально.'),
        ],
        code: `@layer reset, vendor, tokens, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
}

@layer components {
  .button {
    background: var(--color-accent);
    border: 1px solid transparent;
    border-radius: 6px;
  }
}

@layer utilities {
  .button--ghost { background: transparent; border-color: currentColor; }
}`,
        takeaway: L(
          'Use cascade layers to settle the priority order once, and keep !important for cases where nothing else can work.',
          'Каскадными слоями задавайте порядок приоритетов один раз, а !important оставляйте для случаев, где иначе никак.'
        ),
      },
      {
        id: 'htmlcss-ch2-s3',
        title: L('Custom properties', 'Кастомные свойства'),
        body: L(
          'Custom properties are the only way to store a value under a name and reuse it. A declaration such as --color-bg defines a variable on the element, and var(--color-bg) substitutes its value wherever a value is allowed. The name is case sensitive, the property is inherited, and redefining a variable on .card changes every use inside the card.\n\nBecause a custom property holds tokens rather than a typed value, it can hold an entire declaration, fallbacks included. var(--space, 1rem) uses 1rem when the variable is missing, and var(--space, var(--base-space)) falls back to another variable. That makes variables a natural fit for theming: a block that redefines the palette and the spacing scale restyles every component that uses those names.\n\nThe catch is that the value is resolved at use time, not at declaration time. That makes theming work, but a variable cannot hold a unitless number and be multiplied, and typos fail quietly: an undefined custom property inside var() makes the declaration invalid at computed-value time, so the property falls back to its initial value.\n\nRegistering a property with @property changes its behaviour: it gains an initial value, an explicit inheritance and a checked type. A registered property with the syntax "<length>" is animatable and validated, so a mistake in the unit becomes a warning, not a silent no-op.',
          'Кастомные свойства — единственный способ хранить значение под именем и переиспользовать его. Объявление --color-bg задаёт переменную на элементе, а var(--color-bg) подставляет её значение всюду, где значение допустимо. Имя чувствительно к регистру, свойство наследуется, переменная, объявленная на :root, доступна всему документу, а переопределение на .card меняет все использования внутри этой карточки.\n\nТак как кастомное свойство хранит токены, а не типизированное значение, в него можно положить целое объявление, включая запасное значение. var(--space, 1rem) возьмёт 1rem, если переменная не задана, а var(--space, var(--base-space)) откатится к другой переменной. Поэтому переменные естественно ложатся в основу тем: блок, переопределяющий палитру и шкалу отступов, перекрашивает все компоненты, ссылающиеся на эти имена, без сборки и без JavaScript.\n\nОбратная сторона: значение вычисляется в момент использования, а не объявления. Именно это делает темы рабочими, но по той же причине переменная не может хранить голое число и умножаться, а опечатки не дают ошибки: неопределённое кастомное свойство внутри var() делает объявление невалидным на этапе вычисленного значения, и свойство, где оно использовано, откатывается к унаследованному или начальному значению, часто незаметно. Линтер, отвергающий неизвестные кастомные свойства, в проекте не помешает.\n\nРегистрация свойства через @property меняет его поведение: у него появляется начальное значение, наследование объявляется явно, а тип проверяется. Зарегистрированное свойство с синтаксисом "<length>" анимируется и валидируется, поэтому ошибка в единицах становится предупреждением, а не тихим no-op.'
        ),
        bullets: [
          L('Custom properties are inherited and resolved at use time.', 'Кастомные свойства наследуются и вычисляются в момент использования.'),
          L('var() accepts a fallback, which makes theming safe by default.', 'var() принимает запасное значение, что делает темы безопасными по умолчанию.'),
          L('A typo in a variable name fails silently and falls back to the initial value.', 'Опечатка в имени переменной не даёт ошибки и откатывается к начальному значению.'),
          L('@property adds an initial value, a type and validation.', '@property добавляет начальное значение, тип и валидацию.'),
        ],
        code: `:root {
  --color-bg: #101418;
  --color-text: #e6edf3;
  --color-accent: #2f81f7;
  --space: 1rem;
}

.card {
  --color-accent: #d29922;     /* local override */
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--space, 1rem);
}

@property --radius {
  syntax: "<length>";
  inherits: false;
  initial-value: 0;
}`,
        takeaway: L(
          'Store design decisions in custom properties, override them per component, and register the ones you animate.',
          'Храните проектные решения в кастомных свойствах, переопределяйте их в компонентах, а те, что анимируете, регистрируйте.'
        ),
      },
    ],
  },
  {
    id: 'htmlcss-ch3',
    title: L('Flex and grid layout', 'Флексбокс и грид'),
    summary: L(
      'How flexbox distributes space along one axis, how grid defines tracks in two dimensions, and how to pick between them without nesting containers for no reason.',
      'Как флексбокс распределяет место вдоль одной оси, как грид задаёт дорожки в двух измерениях и как выбирать между ними без вложенности ради вложенности.'
    ),
    sections: [
      {
        id: 'htmlcss-ch3-s1',
        title: L('Flexbox', 'Флексбокс'),
        body: L(
          'Flexbox is a one-dimensional layout: it distributes space along one axis, a row or a column, and aligns the items along the cross axis. The container defines the main axis with flex-direction and the items follow it, and everything in flexbox is measured from that distinction.\n\nItem sizing is decided by three properties. flex-basis is the starting size, flex-grow is the share of leftover space the item takes, and flex-shrink is the share of the deficit it absorbs. The familiar flex: 1 means grow 1, shrink 1 and basis 0, making all items equal. flex: 0 0 auto keeps the content size and forbids growth.\n\nDistribution along the main axis is justify-content, alignment along the cross axis is align-items. gap sets the space between items without margin hacks and never collapses. align-items: stretch is the default, items fill the cross axis, and that is why a row of cards with different text still produces cards of equal height.\n\nTwo classic failures are worth knowing. A flex item has an automatic minimum size equal to its content, so a long unbroken string in a narrow column refuses to shrink and overflows the container; min-width: 0 fixes it. And flex-wrap works only when the items can shrink enough to fit the line, otherwise they overflow. Both problems disappear in grid.',
          'Флексбокс — одномерная раскладка: он распределяет пространство вдоль одной оси, строки или колонки, и выравнивает элементы по поперечной оси. Контейнер задаёт главную ось через flex-direction, и элементы следуют за ней. В флексбоксе всё считается от этого различия, поэтому систему трудно выучить, читая только названия свойств.\n\nРазмер элементов определяют три свойства. flex-basis задаёт начальную размер, flex-grow — долю свободного места, которое заберёт элемент, flex-shrink — долю дефицита, который он поглотит. Привычное flex: 1 означает grow 1, shrink 1 и basis 0, из-за чего все элементы равны независимо от содержимого. flex: 0 0 auto сохраняет размер по содержимому и запрещает расти.\n\nРаспределение по главной оси задаёт justify-content, выравнивание по поперечной — align-items. gap задаёт промежуток между элементами без прежних хаков с margin и, в отличие от margin, никогда не схлопывается. align-items: stretch — значение по умолчанию: элементы заполняют поперечную ось, поэтому ряд flex-карточек с разным объёмом текста всё равно даёт карточки одинаковой высоты.\n\nСтоит знать две классические поломки. У flex-элемента есть автоматический минимум, равный содержимому, поэтому длинная неразрывная строка в узкой колонке отказывается сжиматься и вылезает за контейнер; лечится min-width: 0. И flex-wrap работает, только если элементы могут достаточно сжаться, иначе они переполняют контейнер вместо переноса. Обе проблемы исчезают в гриде.'
        ),
        bullets: [
          L('Flexbox lays out one axis and asks the items about their content.', 'Флексбокс раскладывает одну ось и спрашивает у элементов про их содержимое.'),
          L('flex: 1 is grow 1, shrink 1, basis 0.', 'flex: 1 — это grow 1, shrink 1, basis 0.'),
          L('gap never collapses, unlike margin.', 'gap никогда не схлопывается, в отличие от margin.'),
          L('A flex item cannot shrink below its content without min-width: 0.', 'Flex-элемент не сожмётся ниже содержимого без min-width: 0.'),
        ],
        code: `.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar__spacer {
  flex: 1 1 auto;     /* takes the leftover space */
}

.toolbar__action {
  flex: 0 0 auto;     /* keeps its own size */
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}`,
        takeaway: L(
          'Flexbox is for distributing space along one axis, and min-width: 0 is the price of admission for shrinking items.',
          'Флексбокс распределяет место вдоль одной оси, а min-width: 0 — входной билет для сжимающихся элементов.'
        ),
      },
      {
        id: 'htmlcss-ch3-s2',
        title: L('Grid', 'Грид'),
        body: L(
          'Grid is a two-dimensional layout: it defines rows and columns at once and places items into a matrix of tracks. The container declares its tracks with grid-template-columns and grid-template-rows, and items are placed automatically in order unless positioned explicitly with grid-column and grid-row.\n\nThe track sizing functions are the core of the syntax. A plain length sets a fixed track. The fr unit divides leftover space between tracks, so 1fr 2fr means one part against two. minmax(min, max) describes a track that may grow but never falls below its minimum, which makes a layout resilient to long content. repeat() saves typing: repeat(auto-fit, minmax(240px, 1fr)) creates as many columns as fit, each at least 240 pixels wide.\n\nauto-fit and auto-fill differ in an easy-to-miss way. auto-fill keeps the empty tracks, so a grid designed for three columns keeps its width even when one card is present. auto-fit collapses the empty tracks, so the single card stretches across the whole row. Most responsive card grids want auto-fit.\n\nGrid has its own gap, which does not collide with the flex gap, and its own pair of alignment properties: justify-items and align-items align the items inside their cells, while justify-content and align-content distribute the whole grid inside the container. Confusing the two pairs is the most common source of grid frustration.',
          'Грид — двумерная раскладка: он задаёт строки и колонки разом и размещает элементы в матрице дорожек. Контейнер объявляет дорожки через grid-template-columns и grid-template-rows, а элементы раскладываются автоматически по порядку, если только их не позиционируют явно через grid-column и grid-row.\n\nВ основе синтаксиса — функции размеров дорожек. Обычная длина задаёт фиксированную дорожку. Единица fr делит свободное место между дорожками, поэтому 1fr 2fr означает одна часть против двух. minmax(min, max) описывает дорожку, которая может расти, но не опускается ниже минимума, и именно это делает раскладку устойчивой к длинному содержимому. repeat() избавляет от повторов: repeat(auto-fit, minmax(240px, 1fr)) создаёт столько колонок, сколько помещается, каждая не уже 240 пикселей.\n\nauto-fit и auto-fill отличаются тонко, и это легко упустить. auto-fill сохраняет пустые дорожки, поэтому сетка, рассчитанная на три колонки, сохраняет полную ширину, даже когда карточка всего одна. auto-fit схлопывает пустые дорожки, и единственная карточка растягивается на всю строку. Большинство адаптивных сеток карточек хотят именно auto-fit.\n\nУ грида есть собственный gap, не конфликтующий с flex-gap на том же элементе, и своя пара свойств выравнивания: justify-items и align-items выравнивают элементы внутри их ячеек, а justify-content и align-content распределяют всю сетку внутри контейнера. Путаница между этими парами — самый частый источник раздражения от грида.'
        ),
        bullets: [
          L('Grid knows its tracks before the items arrive, which is why it is predictable.', 'Грид знает свои дорожки до появления элементов, поэтому он предсказуем.'),
          L('fr divides leftover space, minmax protects against narrow columns.', 'fr делит свободное место, minmax защищает от слишком узких колонок.'),
          L('auto-fit collapses the empty tracks, auto-fill keeps them.', 'auto-fit схлопывает пустые дорожки, auto-fill сохраняет их.'),
          L('align-items works inside a cell, align-content positions the whole grid.', 'align-items работает внутри ячейки, align-content размещает всю сетку.'),
        ],
        code: `.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "sidebar main"
    "footer  footer";
}

.layout > aside { grid-area: sidebar; }
.layout > main   { grid-area: main; }`,
        takeaway: L(
          'Grid for anything with two dimensions, and use auto-fit with minmax when the column count should follow the available width.',
          'Грид — для всего, где два измерения, а auto-fit с minmax — когда число колонок должно следовать за шириной.'
        ),
      },
      {
        id: 'htmlcss-ch3-s3',
        title: L('Choosing between flex and grid', 'Флекс или грид'),
        body: L(
          'The difference is what the container knows before the items arrive. Flexbox lays out one axis and asks the items about their content, so it suits a row of buttons, a toolbar, or anything whose item count is unknown and should wrap. Grid knows its tracks up front, so it suits a page layout, a wall of cards, a form with aligned fields, anything needing two dimensions.\n\nA common mistake is to build a page layout out of nested flex containers: every level adds a rule to remember and a margin to reconcile, and the result becomes hard to change without rewriting the nesting. Grid with named areas makes the structure explicit and lets a media query move regions.\n\nBoth break in the same place, the intrinsic size of the content: grid has minmax and min-content, flex has min-width: 0, and both need the same trick with long words. A third-party widget inside a grid cell can impose its own width; the remedy is a wrapper with min-width: 0.\n\nWhen the two are mixed, keep the split clean: grid for the page and its panels, flex inside a panel for rows of controls. subgrid exists for a child that must align with the tracks of its parent, and earns its place when the alignment is shared.',
          'Две системы пересекаются, и практическая разница в том, что контейнер знает до появления элементов. Флексбокс раскладывает одну ось и спрашивает у элементов про их содержимое: он годится для ряда кнопок, тулбара и для всего, где число элементов заранее неизвестно и они должны переноситься. Грид знает дорожки заранее: он годится для раскладки страницы, сетки карточек, формы с выровненными полями и для всего, где важны сразу два измерения.\n\nЧастая ошибка — собрать раскладку страницы на вложенных flex-контейнерах. Это работает, но каждый уровень добавляет правило, которое надо помнить, и margin, который надо согласовывать, и результат становится непереносимым без переписывания вложенности. Грид с именованными областями делает структуру страницы явной и позволяет медиазапросу переставить целые регионы.\n\nОбе системы ломаются в одном месте — во внутреннем размере содержимого. У грида есть minmax и min-content, у флекса min-width: 0, и обоим нужен один и тот же приём с длинными словами. Сторонний виджет внутри ячейки грида тоже может навязать свою ширину, и обычное лечение — обёртка с min-width: 0 или overflow: hidden.\n\nКогда системы смешивают, держите разделение чистым: грид для страницы и её панелей, флекс внутри панели для рядов контролов. subgrid существует для случая, когда дочернему элементу нужно выравнивание по дорожкам родителя, и он оправдан, когда выравнивание действительно общее, а альтернатива — хак с фиксированной высотой.'
        ),
        bullets: [
          L('Flex when the items should decide their own size, grid when the tracks are known.', 'Флекс — когда размеры решают сами элементы, грид — когда дорожки заданы.'),
          L('Use grid for the page shell and flex for the rows inside a panel.', 'Грид — для оболочки страницы, флекс — для рядов внутри панели.'),
          L('Nested flex containers make a page hard to restructure.', 'Вложенные flex-контейнеры делают страницу трудно перестраиваемой.'),
          L('subgrid is for real cross-container alignment, not for convenience.', 'subgrid — для настоящего выравнивания между контейнерами, а не для удобства.'),
        ],
        code: `.page {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.panel__header > h2 {
  flex: 1 1 auto;
  min-width: 0;
}`,
        takeaway: L(
          'Grid owns the page, flex owns the rows inside a panel, and mixing them without nesting them into each other keeps both readable.',
          'Грид отвечает за страницу, флекс — за ряды внутри панели, и без вложенности друг в друга оба остаются читаемыми.'
        ),
      },
    ],
  },
  {
    id: 'htmlcss-ch4',
    title: L('Responsive design, accessibility and rendering', 'Адаптивность, доступность и рендеринг'),
    summary: L(
      'How media and container queries adapt a layout, what makes an interface accessible to keyboard and screen reader users, and how the browser pipeline turns DOM into pixels.',
      'Как медиа- и контейнерные запросы подстраивают раскладку, что делает интерфейс доступным для клавиатуры и скринридера и как браузер превращает DOM в пиксели.'
    ),
    sections: [
      {
        id: 'htmlcss-ch4-s1',
        title: L('Responsive layout', 'Адаптивная раскладка'),
        body: L(
          'A responsive layout adapts to the space available rather than to a list of devices. There are two mechanisms: media queries, which test the viewport, and container queries, which test the parent. Container queries suit components better: a card does not care whether the screen is 400 or 1400 pixels wide, it cares how wide its container is, so the same card works in a narrow sidebar and a wide main area.\n\nUnits decide how sizes scale. px is absolute. rem is relative to the root font size, so it follows the browser setting, the right unit for typography and most spacing. em is relative to the font size of the element: right for padding that scales with the text, dangerous for nested sizing. Percentages are relative to the containing block and differ for width and height.\n\nViewport units carry their own traps. vw includes the scrollbar width, so 100vw produces a horizontal scrollbar. dvh, svh and lvh describe the dynamic, small and large viewport heights: dvh tracks the height that changes as a mobile browser hides its toolbar, while svh is the safe minimum for content that must stay visible. Older browsers fall back to vh, so declare vh first. A breakpoint should come from the content, not from a device list.',
          'Адаптивная раскладка подстраивается под доступное место, а не под список устройств. Механизмов два: медиазапросы проверяют вьюпорт, а контейнерные запросы — размер родительского элемента. Контейнерные запросы — лучший инструмент для компонентов, потому что карточке всё равно, 400 или 1400 пикселей ширина экрана, ей важна ширина контейнера. Карточка, которая живёт и в узком сайдбаре, и в широкой основной области, раскладывается правильно в обоих случаях вообще без собственных брейкпоинтов.\n\nЕдиницы решают, как масштабируются размеры. px абсолютен. rem отсчитывается от корневого размера шрифта, поэтому уважает настройку браузера пользователя и подходит для типографики и для большинства отступов. em отсчитывается от размера шрифта самого элемента: это верно для padding, который должен масштабироваться с текстом, и опасно для вложенных размеров. Процент отсчитывается от содержащего блока и ведёт себя по-разному для ширины и для высоты.\n\nУ вьюпортных единиц свои ловушки. vw включает ширину полосы прокрутки, поэтому 100vw вызывает горизонтальную прокрутку. dvh, svh и lvh описывают динамическую, малую и большую высоты вьюпорта: dvh отслеживает высоту, меняющуюся при скрытии панели мобильного браузера, и именно она нужна полноэкранной раскладке, а svh — безопасный минимум для контента, который обязан оставаться видимым. Старые браузеры, не понимающие dvh, откатятся на vh, поэтому vh объявляют первым.\n\nБрейкпоинт должен следовать из контента, а не из списка устройств. Когда раскладка ломается, измерьте, что именно произошло, и поставьте брейкпоинт туда: устройства меняются, контент остаётся.'
        ),
        bullets: [
          L('Media queries test the viewport, container queries test the parent.', 'Медиазапросы проверяют вьюпорт, контейнерные — родителя.'),
          L('Use rem for type and spacing so the user setting is respected.', 'Используйте rem для шрифта и отступов, чтобы уважать настройку пользователя.'),
          L('100vw is wider than the viewport because of the scrollbar.', '100vw шире вьюпорта из-за полосы прокрутки.'),
          L('Put breakpoints where the content breaks, not where devices end.', 'Ставьте брейкпоинты там, где ломается контент, а не там, где кончаются устройства.'),
        ],
        code: `.card {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 420px) {
  .card__body {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
  }
}

@supports (height: 100dvh) {
  .hero {
    min-height: 100dvh;
  }
}`,
        takeaway: L(
          'Components should react to their container, and breakpoints should follow the content rather than a list of screens.',
          'Компоненты должны реагировать на свой контейнер, а брейкпоинты — следовать за контентом, а не за списком экранов.'
        ),
      },
      {
        id: 'htmlcss-ch4-s2',
        title: L('Accessibility', 'Доступность'),
        body: L(
          'Accessibility is mostly a question of using the platform. A page built from native elements, with a logical heading structure, labelled controls, a visible focus and sensible contrast, is accessible by default. Failures come from custom widgets that reimplement what the browser does well.\n\nFocus must be visible and move in a sensible order. Never remove the focus outline without replacing it with something as clear: focus-visible shows the ring for keyboard users without flashing it on mouse clicks. The focus order should follow the visual order, and a control that opens a dialog should move focus into it and back to the trigger.\n\nARIA is a supplement, not a replacement. The first rule of ARIA is not to use ARIA: when a native element exists, use it, because it already carries the role, state and keyboard behaviour. When ARIA is needed, set the role and the states that change and keep them in sync with reality: an aria-expanded left true after the menu closes is worse than no ARIA. Two checks are worth automating, a contrast checker and an audit of the accessibility tree with a tool such as axe. They catch missing labels, weak contrast and broken ARIA relationships, not a confusing flow.\n\nRespect user preferences too: prefers-reduced-motion removes animation and prefers-color-scheme gives a dark theme.',
          'Доступность — в основном вопрос использования возможностей платформы. Страница, собранная из нативных элементов, с логичной структурой заголовков, подписанными полями, видимым фокусом и разумным контрастом, доступна по умолчанию. Ошибки приходят из кастомных виджетов, которые заново реализуют то, что браузер уже делает хорошо.\n\nФокус должен быть виден и перемещаться в разумном порядке. Никогда не снимайте контур фокуса, не заменив его чем-то не менее заметным: focus-visible показывает кольцо клавиатурным пользователям, не заставляя его мигать при клике мышью. Порядок фокуса должен совпадать с визуальным, а элемент, открывающий диалог, должен перевести фокус внутрь диалога и вернуть его на кнопку при закрытии.\n\nARIA — дополнение, а не замена. Первое правило ARIA: не использовать ARIA. Когда есть нативный элемент, берите его, потому что в нём уже есть и роль, и состояние, и клавиатурное поведение. Когда ARIA всё же нужна, задайте роль и те состояния, которые меняются, и держите их в согласии с реальностью: aria-expanded, оставшаяся true после закрытия меню, хуже, чем никакой ARIA.\n\nСтоит автоматизировать две проверки: контраст и аудит дерева доступности инструментом вроде axe. Автоматика ловит отсутствующие подписи, слабый контраст и разорванные связи ARIA, но не скажет, что сценарий запутан. Это по-прежнему решает человек. Уважайте и настройки пользователя: prefers-reduced-motion убирает анимацию, prefers-color-scheme даёт тёмную тему.'
        ),
        bullets: [
          L('Native elements are accessible by default, custom widgets are not.', 'Нативные элементы доступны по умолчанию, кастомные — нет.'),
          L('Replace a removed focus outline with something at least as clear.', 'Заменяйте снятый контур фокуса чем-то не менее заметным.'),
          L('The first rule of ARIA is not to use ARIA.', 'Первое правило ARIA — не использовать ARIA.'),
          L('Automated audits catch labels and contrast, not confusing flows.', 'Автоматика ловит подписи и контраст, но не запутанный сценарий.'),
        ],
        code: `/* keyboard focus visible, mouse focus quiet */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* a dialog that manages focus */
dialog::backdrop {
  background: rgb(0 0 0 / 55%);
}

/* respecting the user */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
        takeaway: L(
          'Accessibility comes from the platform: native elements, a visible focus, honest ARIA and a person testing the flow.',
          'Доступность идёт от платформы: нативные элементы, видимый фокус, честная ARIA и человек, проверяющий сценарий.'
        ),
      },
      {
        id: 'htmlcss-ch4-s3',
        title: L('Rendering performance', 'Производительность рендеринга'),
        body: L(
          'The browser turns a DOM into pixels in three stages: style, layout and paint. Changing a class that affects geometry forces a layout, which recalculates the position and size of everything depending on it, while changing one that only affects colour stops at paint. Reading a layout property such as offsetWidth after writing a style forces the browser to flush the pending layout. A loop that alternates reads and writes recalculates layout many times in one frame, the most common cause of jank.\n\nThe fix is batching: read everything first, then write everything. When that is impossible, contain the damage with content-visibility: auto, which lets the browser skip off-screen content, and contain: layout style paint, which limits how far a change propagates.\n\nImages and fonts dominate the remaining cost. Set width and height so the browser reserves the space and avoids layout shift, use modern formats and responsive sizes, and lazy-load images below the fold. Fonts should be preloaded and served with font-display: swap, otherwise the text stays invisible until the file arrives. A large family of web fonts is a design decision with a price.\n\nFinally, measure instead of guessing. The performance panel shows what happened during a recording: long tasks, layout shifts, paint flashes. Optimising without a profile makes the code worse and the page no faster.',
          'Браузер превращает DOM в пиксели в три стадии: стиль, раскладка и отрисовка. Изменение класса, влияющего на геометрию, заставляет пересчитать раскладку — положение и размер всего, что от него зависит, — а изменение, затрагивающее только цвет, останавливается на отрисовке. Чтение геометрического свойства вроде offsetWidth после записи стиля заставляет браузер прямо здесь выполнить отложенную раскладку. Цикл, чередующий чтение и запись, пересчитывает раскладку много раз за один кадр, и это самая частая причина подтормаживаний в остальном простых страницах.\n\nЛечение — группировка: сначала прочитать всё, потом записать всё. Когда это невозможно, локализуйте урон: content-visibility: auto позволяет браузеру пропускать раскладку и отрисовку за пределами экрана, а contain: layout style paint ограничивает, как далеко расходится изменение.\n\nКартинки и шрифты съедают остаток времени. Всегда задавайте width и height, чтобы браузер зарезервировал место и не было сдвига макета, используйте современные форматы и размеры под разные экраны, а картинки ниже первого экрана грузите лениво. Шрифты стоит preload-ить и отдавать с font-display: swap, иначе текст остаётся невидимым до загрузки файла. Большое семейство веб-шрифтов — это дизайнерское решение с ценой по производительности, а не бесплатный выбор.\n\nИ в конце измеряйте, а не гадайте. Панель производительности показывает, что происходило во время записи: длинные задачи, сдвиги макета, перерисовки. Оптимизация без профиля обычно делает код хуже, а страницу — не быстрее.'
        ),
        bullets: [
          L('Changing geometry forces layout, changing colour only forces paint.', 'Изменение геометрии заставляет пересчитать раскладку, изменение цвета — только перерисовать.'),
          L('Reading a layout property after a write forces a synchronous reflow.', 'Чтение геометрического свойства после записи вызывает синхронный reflow.'),
          L('Batch reads and writes, or contain the work with content-visibility.', 'Группируйте чтение и запись или ограничивайте работу через content-visibility.'),
          L('Reserve space for images and swap fonts, or the layout jumps.', 'Резервируйте место под картинки и ставьте swap у шрифтов, иначе макет прыгает.'),
        ],
        code: `/* batch: all reads first, then all writes */
const width = panel.offsetWidth;
const height = panel.scrollHeight;

panel.style.width = width + 'px';
panel.style.height = height + 'px';

/* skip offscreen work */
.listing {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;
}

/* reserve space for media */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  loading: lazy;
}`,
        takeaway: L(
          'Batch the reads and the writes, reserve space for media, and profile before you optimise anything.',
          'Группируйте чтение и запись, резервируйте место под медиа и профилируйте до того, как что-то оптимизировать.'
        ),
      },
    ],
  },
];
