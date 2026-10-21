import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh05: Chapter = {
  id: 'htmlcss-ch5',
  title: L('The cascade, specificity and inheritance', 'Каскад, специфичность и наследование'),
  summary: L(
    'Where every declaration comes from, how the browser picks the winner, which properties are inherited, and how custom properties and cascade layers replace specificity wars.',
    'Откуда берётся каждое объявление, как браузер выбирает победившее, какие свойства наследуются и как пользовательские свойства и слои каскада заменяют войны за специфичность.'
  ),
  sections: [
    {
      id: 'htmlcss-ch5-s1',
      title: L('Where a declaration comes from', 'Откуда берётся объявление'),
      body: L(
        'A browser never applies a single stylesheet. It combines three origins of declarations: the user-agent stylesheet written by the browser vendor, the user stylesheet written by the person reading the page, and the author stylesheet written by you. The origin alone decides who wins before specificity is even mentioned, and the order for normal declarations is author, then user, then user-agent. That is why a plain p rule from your CSS beats the browser default margin even when the browser rule is more specific.\n\nImportance inverts that order. Among important declarations the precedence is user-agent, then user, then author, so an important author declaration loses to an important user one. This is deliberate: a reader who needs bigger text or stronger contrast must always be able to override a site, and the same rule is why an important declaration in a component stylesheet beats an inline style.\n\nInline styles are a separate case. A style attribute is author origin, but it outranks every normal author rule no matter how specific the selector is. An important declaration in your stylesheet still beats it, and an important inline style beats an important id selector. Two more sources exist: running CSS animations and transitions, and both of them override normal declarations while they run, which is why an animation can move a box even though a rule says it cannot move.',
        'Браузер никогда не применяет один-единственный файл стилей. Он складывает объявления из трёх источников: таблица стилей пользовательского агента, написанная производителем браузера, стили пользователя, написанные тем, кто читает страницу, и стили автора, написанные вами. Источник сам по себе решает, кто победит, ещё до того, как заговорила специфичность, и для обычных объявлений порядок такой: автор, потом пользователь, потом пользовательский агент. Поэтому обычное правило p из вашего CSS побеждает браузерный margin по умолчанию, даже если браузерное правило более специфично.\n\nВажность переворачивает этот порядок. Среди важных объявлений приоритет такой: пользовательский агент, потом пользователь, потом автор, поэтому важное авторское объявление проигрывает важному пользовательскому. Это сделано намеренно: читателю, которому нужен крупный текст или выше контраст, автор сайта мешать не должен, и по той же причине важное объявление в компонентных стилях побеждает инлайновый стиль.\n\nИнлайновые стили — отдельный случай. Атрибут style относится к источнику автора, но он сильнее любого обычного авторского правила, как бы ни была специфична селектора. Объявление с !important в вашей таблице стилей всё равно его перебьёт, а важный инлайновый стиль сильнее важного id-селектора. Есть ещё два источника: анимации и переходы CSS, и во время работы оба они перекрывают обычные объявления, поэтому анимация может сдвинуть блок, даже если правило запрещает его двигать.'
      ),
      bullets: [
        L('Three origins: user-agent, user and author.', 'Три источника: пользовательский агент, пользователь и автор.'),
        L('Normal author declarations beat normal user declarations beat user-agent ones.', 'Обычные объявления автора побеждают пользовательские, а те — пользовательского агента.'),
        L('Important declarations reverse that order, so a user override survives.', 'Важные объявления переворачивают порядок, и пользовательское переопределение выживает.'),
        L('An inline style beats every normal author rule regardless of specificity.', 'Инлайновый стиль побеждает любое обычное авторское правило независимо от специфичности.'),
        L('Running animations and transitions override normal declarations.', 'Идущие анимации и переходы перекрывают обычные объявления.'),
      ],
      code: `/* origin: user-agent, the browser's own defaults - lowest priority */
input[type="text"] {
  padding: 1px 2px;
}

/* origin: author, your stylesheet - beats the user-agent rules */
p {
  margin: 1em 0;
}

/* inline style: author origin, strongest among normal author rules */
<p class="paragraph--flush" style="margin: 20px">The inline style wins here</p>

/* important flips the origin order and beats the inline style */
.paragraph--flush {
  margin: 0 !important;
}`,
      table: {
        caption: L('Where each declaration comes from', 'Откуда берётся каждое объявление'),
        headers: [L('Origin', 'Источник'), L('Normal priority', 'Обычный приоритет'), L('Important priority', 'Важный приоритет')],
        rows: [
          [
            L('User-agent, the browser defaults', 'Пользовательский агент, умолчания браузера'),
            L('Lowest', 'Низший'),
            L('Highest', 'Высший'),
          ],
          [
            L('User, the reader preferences', 'Пользователь, настройки читателя'),
            L('Middle', 'Средний'),
            L('Middle', 'Средний'),
          ],
          [
            L('Author, your stylesheet', 'Автор, ваша таблица стилей'),
            L('Highest', 'Высший'),
            L('Lowest', 'Низший'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('!important is not a tiebreaker', '!important не разрешает ничьи'),
          text: L(
            'It flips the origin order, so an author rule marked important will lose to a reader important rule and can never override a user accessibility setting. Use it for the rare case where you must beat a third-party stylesheet, and write down every use.',
            'Он переворачивает порядок источников, поэтому важное авторское правило проиграет важному пользовательскому и никогда не перебьёт настройки доступности читателя. Используйте его для редкого случая, когда нужно перебить чужую библиотеку, и записывайте каждое применение.'
          ),
        },
        {
          tone: 'note',
          title: L('Where inline styles come from', 'Откуда берутся инлайновые стили'),
          text: L(
            'Most inline style attributes in a modern project are written by JavaScript, and that makes them invisible in code review. A style attribute set by a script beats your specificity fight in the stylesheet, so prefer custom properties for values that a script must change.',
            'Большинство инлайновых style в современном проекте пишет JavaScript, и из-за этого они не видны на ревью кода. Инлайновый стиль из скрипта побеждает вашу борьбу за специфичность в таблице стилей, поэтому для значений, которые должен менять скрипт, лучше использовать пользовательские свойства.'
          ),
        },
      ],
      takeaway: L(
        'Origin comes first, importance flips it, and only then does specificity matter.',
        'Сначала источник, важность его переворачивает, и только потом значит специфичность.'
      ),
      seeAlso: [
        L('Section 5-2: the specificity tuple and the final order', 'Секция 5-2: тройка специфичности и итоговый порядок'),
        L('Chapter 4: the box model and layout fundamentals', 'Глава 4: бокс-модель и основы раскладки'),
      ],
    },
    {
      id: 'htmlcss-ch5-s2',
      title: L('Specificity and the cascade order', 'Специфичность и порядок каскада'),
      body: L(
        'Specificity is written as a tuple of three numbers, compared from left to right: the count of id selectors, then the count of class selectors, attribute selectors and pseudo-classes, then the count of type selectors and pseudo-elements. The first position where the two tuples differ decides the winner, and the third position is worth only one point. A single id therefore beats any number of classes, and twenty classes beat one type selector.\n\nTwo functional pseudo-classes changed the arithmetic. :where() always contributes zero specificity, which makes it the right tool for a base rule that any component should be able to override. :is(), :not() and :has() take the specificity of their most specific argument, so :is(.card, #card) counts as an id selector. Nesting inside :is() does not change that rule.\n\nWhen the tuples are equal, the order of appearance decides and the later rule wins. That is the only situation where the familiar advice about the last rule in the file is true. The order of classes inside one selector never matters: .a.b and .b.a have the same specificity, and so do .a .b and .b .a, because only the compound selector counts, not the whole chain.',
        'Специфичность записывается тройкой чисел, которую сравнивают слева направо: количество id-селекторов, затем количество классов, атрибутов и псевдоклассов, затем количество селекторов типа и псевдоэлементов. Решает первая позиция, в которой тройки различаются, а третья позиция стоит всего одного балла. Поэтому один id побеждает любое количество классов, а двадцать классов побеждают один селектор типа.\n\nДва функциональных псевдокласса изменили арифметику. :where() всегда даёт нулевую специфичность, и потому это правильный инструмент для базового правила, которое любой компонент должен переопределять. :is(), :not() и :has() берут специфичность своего самого специфичного аргумента, поэтому :is(.card, #card) считается как id-селектор. Вложенность внутрь :is() это правило не меняет.\n\nКогда тройки равны, решает порядок появления, и побеждает более позднее правило. Именно в этом случае работает известный совет про последнее правило в файле. Порядок классов внутри одного селектора не имеет значения: у .a.b и .b.a специфичность одинакова, как и у .a .b и .b .a, потому что считается составной селектор, а не вся цепочка.'
      ),
      bullets: [
        L('Specificity is the tuple of ids, classes with attributes, and type selectors.', 'Специфичность — тройка из id, классов с атрибутами и селекторов типа.'),
        L('The first differing position decides, and the last position counts one point.', 'Решает первая различающаяся позиция, а последняя весит одно очко.'),
        L(':where() adds zero specificity to the rule it contains.', ':where() добавляет нулевую специфичность правилу, которое содержит.'),
        L(':is(), :not() and :has() take the specificity of their strongest argument.', ':is(), :not() и :has() берут специфичность самого сильного аргумента.'),
        L('Equal specificity is broken by source order, the later rule wins.', 'Равную специфичность разрешает порядок в исходнике, побеждает поздний.'),
        L('The order of classes inside a selector never changes the tuple.', 'Порядок классов внутри селектора никогда не меняет тройку.'),
      ],
      code: `/* specificity (1, 0, 0): wins over every class and type rule */
#site-header { color: crimson; }

/* specificity (0, 1, 0): beats any type selector */
.header__title { color: teal; }

/* specificity (0, 0, 1): loses to any class rule */
h1 { color: olive; }

/* :where() contributes nothing, so any rule can override it */
:where(.theme) h1 { color: gray; }

/* :is() takes the strongest argument, here an id */
:is(.card, #card) { color: navy; }`,
      table: {
        caption: L('The same target matched by rules of different weight', 'Одна цель и правила разного веса'),
        headers: [L('Selector', 'Селектор'), L('Specificity', 'Специфичность'), L('Beats', 'Побеждает')],
        rows: [
          [L('#site-header', '#site-header'), L('(1, 0, 0)', '(1, 0, 0)'), L('Any class or type selector', 'Любой класс или селектор типа')],
          [L('.header__title', '.header__title'), L('(0, 1, 0)', '(0, 1, 0)'), L('Any type selector', 'Любой селектор типа')],
          [L('h1', 'h1'), L('(0, 0, 1)', '(0, 0, 1)'), L('Only a later rule of equal weight', 'Только более позднее правило того же веса')],
          [L(':where(.theme) h1', ':where(.theme) h1'), L('(0, 0, 1)', '(0, 0, 1)'), L('Only a later rule of equal weight', 'Только более позднее правило того же веса')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The escalation trap', 'Ловушка эскалации'),
          text: L(
            'When a rule stops working, the reflex is to add another class, then an id, then !important. Each step makes the next override harder, because the winner is now decided by a tuple nobody remembers. Change the layer or the order of the stylesheet instead, and if an id really seems necessary, ask why a class was not enough.',
            'Когда правило перестаёт работать, рефлекс — добавить ещё класс, потом id, потом !important. Каждый шаг усложняет следующее переопределение, потому что победителя теперь определяет тройка, которую никто не помнит. Меняйте слой или порядок таблиц стилей, а если id действительно нужен, спросите, почему не хватило класса.'
          ),
        },
        {
          tone: 'tip',
          title: L('One rule for a family of selectors', 'Одно правило на семейство селекторов'),
          text: L(
            'Putting the variants in :is(.button, .link) gives a single rule with one predictable specificity instead of two rules that have to be kept in sync. The specificity also stays the same when the list of variants changes.',
            'Собрав варианты в :is(.button, .link), вы получаете одно правило с одной предсказуемой специфичностью вместо двух правил, которые надо синхронизировать. Специфичность останется прежней и тогда, когда список вариантов изменится.'
          ),
        },
      ],
      takeaway: L(
        'Compare specificity as a tuple, and use :where() when you want the rule to stay overridable.',
        'Сравнивайте специфичность как тройку, а :where() используйте там, где правило должно переопределяться.'
      ),
      seeAlso: [
        L('Section 5-5: layers make the order explicit', 'Секция 5-5: слои делают порядок явным'),
        L('Section 5-1: origin and importance come first', 'Секция 5-1: сначала источник и важность'),
      ],
    },
    {
      id: 'htmlcss-ch5-s3',
      title: L('Inheritance and initial values', 'Наследование и начальные значения'),
      body: L(
        'Every property has an initial value, the value it takes when the cascade applies nothing. Most initial values are unsurprising: display is inline, margin is 0, border-style is none, color is the browser text colour. Each property is also flagged as inherited or not. Typography such as color, font, line-height, letter-spacing, text-align, list-style and cursor is inherited by default, while margin, padding, border, background, width, height, display and overflow are not.\n\nInheritance is a separate mechanism from the cascade. An inherited value is passed down from the parent and then takes part in the cascade on the child as if the child had declared it, with the specificity of the parent. That is why a plain .card rule can beat an inherited value, and why a value inherited from a deeply nested parent still loses to a rule that matches the element directly.\n\nThe keywords control this whole mechanism. inherit forces a normally non-inherited property to inherit, initial drops back to the initial value, unset means inherit for inherited properties and initial for the rest, revert goes back to the user-agent stylesheet and revert-layer goes back to the value from the previous cascade layer. A full reset is usually written as all: unset or all: revert.',
        'У каждого свойства есть начальное значение — то, которое применяется, когда каскад не дал ничего. Большинство начальных значений неудивительны: display — inline, margin — 0, border-style — none, color — браузерный цвет текста. У каждого свойства есть и признак наследуемости. Типографика — color, font, line-height, letter-spacing, text-align, list-style, cursor — наследуется по умолчанию, а margin, padding, border, background, width, height, display и overflow не наследуются.\n\nНаследование — механизм, отдельный от каскада. Унаследованное значение передаётся от родителя, а затем участвует в каскаде на дочернем элементе так, будто объявлено на нём, но со специфичностью родителя. Поэтому обычное правило .card побеждает унаследованное значение, а значение, унаследованное от глубоко вложенного родителя, всё равно проигрывает правилу, которое совпало с самим элементом.\n\nКлючевые слова управляют всем этим механизмом. inherit заставляет обычно не наследуемое свойство наследовать, initial возвращает начальное значение, unset означает inherit для наследуемых свойств и initial для остальных, revert откатывает к стилям пользовательского агента, а revert-layer — к значению из предыдущего слоя каскада. Полный сброс обычно пишут как all: unset или all: revert.'
      ),
      bullets: [
        L('Every property has an initial value and an inherited flag.', 'У каждого свойства есть начальное значение и признак наследуемости.'),
        L('color, font and line-height inherit, margin, border and background do not.', 'color, font и line-height наследуются, margin, border и background — нет.'),
        L('An inherited value joins the cascade with the specificity of the parent.', 'Унаследованное значение входит в каскад со специфичностью родителя.'),
        L('unset means inherit for inherited properties and initial for the others.', 'unset означает inherit для наследуемых и initial для остальных.'),
        L('revert returns a property to the user-agent stylesheet.', 'revert возвращает свойство к стилям пользовательского агента.'),
        L('A shorthand like all: revert resets every property at once.', 'Сокращение вроде all: revert сбрасывает сразу все свойства.'),
      ],
      code: `/* inherited by default */
body {
  color: #1f2328;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

/* not inherited: every card gets its own box */
.card {
  border: 1px solid #d0d7de;
  padding: 16px;
}

/* force inheritance where the default says no */
.card__title {
  color: inherit;
  margin: inherit;
}

/* roll the property back to the browser defaults */
.link { all: revert; }`,
      table: {
        caption: L('A quick reference of what flows down the tree', 'Быстрая шпаргалка: что передаётся вниз по дереву'),
        headers: [L('Inherited by default', 'Наследуется по умолчанию'), L('Not inherited', 'Не наследуется')],
        rows: [
          [L('color, font, line-height', 'color, font, line-height'), L('margin, padding', 'margin, padding')],
          [L('text-align, letter-spacing', 'text-align, letter-spacing'), L('border, background', 'border, background')],
          [L('list-style, cursor, visibility', 'list-style, cursor, visibility'), L('width, height', 'width, height')],
          [L('white-space, text-indent', 'white-space, text-indent'), L('display, position', 'display, position')],
          [L('direction, writing-mode', 'direction, writing-mode'), L('overflow, box-sizing', 'overflow, box-sizing')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Inherited values are hard to beat', 'Унаследованное значение трудно перебить'),
          text: L(
            'A value that arrives by inheritance cannot be beaten by a rule on the child whose specificity is lower than the parent rule, because it joins the cascade with the weight of the parent. When a component fights a parent rule, set the property explicitly instead of hoping for a match.',
            'Унаследованное значение нельзя перебить правилом на дочернем элементе с меньшей специфичностью, чем правило родителя, потому что оно входит в каскад с весом родителя. Когда компонент спорит с правилом родителя, задайте свойство явно, а не надейтесь на совпадение.'
          ),
        },
        {
          tone: 'tip',
          title: L('Reset with care', 'Сбрасывайте осторожно'),
          text: L(
            'all: revert is a blunt instrument: it also resets display and font-size on elements that rely on the browser defaults. Scope it to a component root rather than applying it to the whole page.',
            'all: revert — грубый инструмент: он сбрасывает ещё и display и font-size у элементов, зависящих от браузерных умолчаний. Ограничьте его корнем компонента, а не всем документом.'
          ),
        },
      ],
      takeaway: L(
        'Inheritance is not the cascade: it passes a value down, and the cascade decides whether a rule beats it.',
        'Наследование — не каскад: оно передаёт значение вниз, а каскад решает, победит ли правило.'
      ),
      seeAlso: [
        L('Section 5-4: custom properties inherit by default', 'Секция 5-4: пользовательские свойства наследуются по умолчанию'),
        L('Section 4-2: the containing block decides what percentages mean', 'Секция 4-2: содержащий блок определяет смысл процентов'),
      ],
    },
    {
      id: 'htmlcss-ch5-s4',
      title: L('Custom properties and theming', 'Пользовательские свойства и темы'),
      body: L(
        'A custom property stores a value under a name and is written with two dashes: --color-accent. The declaration --color-accent: #2563eb defines the variable on an element, and var(--color-accent) substitutes the value wherever a value is allowed. Because custom properties are inherited, the natural place to define them is the root element, and the natural place to override them is the subtree that needs a different value.\n\nA custom property holds an unparsed sequence of tokens rather than a typed value. That is what makes it powerful and what makes it surprising: a variable can carry a whole fragment, such as --shadow: 0 1px 2px rgb(0 0 0 / 0.2), and box-shadow: var(--shadow) expands it. The same property cannot take part in arithmetic, because there is no number in it, only tokens.\n\nTheming is the obvious use. Define the palette and the spacing scale as variables on the root, then redefine a subset of them inside a selector such as [data-theme="dark"], and every component that reads those names follows the theme without a rebuild and without JavaScript. The trap is that an unknown name inside var() is not an error: the declaration becomes invalid at computed-value time and the property falls back to its initial value, silently.',
        'Пользовательское свойство хранит значение под именем и записывается через два дефиса: --color-accent. Объявление --color-accent: #2563eb задаёт переменную на элементе, а var(--color-accent) подставляет значение всюду, где значение допустимо. Поскольку пользовательские свойства наследуются, естественное место для их определения — корневой элемент, а естественное место для переопределения — поддерево, которому нужно другое значение.\n\nПользовательское свойство хранит неразобранную последовательность токенов, а не типизированное значение. Именно поэтому оно мощное и именно поэтому оно удивляет: переменная может нести целый фрагмент, например --shadow: 0 1px 2px rgb(0 0 0 / 0.2), и box-shadow: var(--shadow) развернёт его в готовый результат. Зато в арифметике та же переменная не участвует, потому что в ней нет числа, есть токены.\n\nТема — очевидное применение. Определите палитру и шкалу отступов как переменные на корне, затем переопределите их часть внутри селектора вроде [data-theme="dark"], и каждый компонент, читающий эти имена, последует за темой без пересборки и без JavaScript. Ловушка в том, что неизвестное имя внутри var() не считается ошибкой: объявление становится невалидным на этапе вычисленного значения, и свойство молча откатывается к начальному.'
      ),
      bullets: [
        L('A custom property is declared with --name and read with var().', 'Пользовательское свойство объявляют через --name, а читают через var().'),
        L('Custom properties are inherited, so the root element defines the defaults.', 'Пользовательские свойства наследуются, поэтому умолчания задаёт корневой элемент.'),
        L('A variable holds raw tokens, so it can carry a whole declaration.', 'Переменная хранит сырые токены, поэтому в ней может быть целое объявление.'),
        L('An unknown name inside var() invalidates the declaration silently.', 'Неизвестное имя внутри var() молча делает объявление невалидным.'),
        L('var(--name, fallback) keeps the layout safe when a token is missing.', 'var(--name, запасное) уберегает вёрстку от ошибки, когда токена нет.'),
        L('@property adds an initial value, a type and animation support.', '@property добавляет начальное значение, тип и поддержку анимации.'),
      ],
      code: `:root {
  --color-bg: #ffffff;
  --color-text: #1f2328;
  --color-accent: #2563eb;
  --space: 1rem;
  --shadow: 0 1px 2px rgb(0 0 0 / 0.2);
}

/* a scoped theme: only the tokens change */
[data-theme="dark"] {
  --color-bg: #14161a;
  --color-text: #e8eaed;
  --color-accent: #7aa2f7;
}

.card {
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--space, 1rem);
  box-shadow: var(--shadow);
  border-left: 3px solid var(--color-accent);
}`,
      table: {
        caption: L('What var() does in each situation', 'Что делает var() в каждой ситуации'),
        headers: [L('Situation', 'Ситуация'), L('Result', 'Результат')],
        rows: [
          [L('The variable is set', 'Переменная задана'), L('The value replaces the reference', 'Значение заменяет ссылку целиком')],
          [L('The variable is missing and there is no fallback', 'Переменная не задана и запасного значения нет'), L('The declaration is invalid and the property keeps its initial value', 'Объявление невалидно, свойство сохраняет начальное значение')],
          [L('The variable is missing and a fallback is given', 'Переменная не задана, но есть запасное значение'), L('The fallback is used', 'Используется запасное значение')],
          [L('The fallback itself uses var()', 'Запасное значение тоже использует var()'), L('The chain is resolved until a value is found', 'Цепочка раскрывается, пока не найдётся значение')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Theme with tokens, not with a second set of rules', 'Тема — это токены, а не второй набор правил'),
          text: L(
            'A dark theme written as a separate set of rules doubles the stylesheet and drifts out of sync. A set of tokens keeps one rule per component and turns the theme into data: you change the values, not the selectors.',
            'Тёмная тема, написанная отдельным набором правил, удваивает таблицу стилей и рассинхронизируется. Набор токенов оставляет одно правило на компонент и превращает тему в данные: меняются значения, а не селекторы.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A typo is invisible', 'Опечатка незаметна'),
          text: L(
            'var(--colour-accent) with one l is not a build error in plain CSS. The declaration using it is dropped at computed-value time and the element falls back to the initial value, which looks like a missing style rather than a typo. A linter that knows about your custom properties is worth setting up.',
            'var(--colour-accent) с одной l не является ошибкой сборки в обычном CSS. Объявление, которое его использует, отбрасывается на этапе вычисленного значения, и элемент откатывается к начальному значению, что выглядит как отсутствие стиля, а не как опечатка. Линтер, знающий ваши пользовательские свойства, стоит настроить.'
          ),
        },
      ],
      takeaway: L(
        'Store design decisions in custom properties and swap the tokens to change the theme.',
        'Храните проектные решения в пользовательских свойствах и меняйте токены, чтобы сменить тему.'
      ),
      seeAlso: [
        L('Section 5-3: inheritance and initial values', 'Секция 5-3: наследование и начальные значения'),
        L('Section 8-6: dark mode and prefers-color-scheme', 'Секция 8-6: тёмная тема и prefers-color-scheme'),
      ],
    },
    {
      id: 'htmlcss-ch5-s5',
      title: L('Layers and @layer', 'Слои каскада и @layer'),
      body: L(
        'A cascade layer is a named group of rules with a fixed place in the priority order. The order of the layers is decided by the order in which they are first declared, and the earlier a layer is, the weaker it is. The rule that surprises everyone is that any style written outside of a layer beats every layered style, regardless of its specificity.\n\nThe useful pattern is to declare the whole order once, at the top of the stylesheet, and then use the layers as named stages of an architecture: reset, vendor, tokens, components, utilities. A utility class in the last layer can then override a component rule without a single !important, and a third-party stylesheet imported into the vendor layer can no longer win by specificity.\n\nTwo more details make layers practical. An @import can name the layer it belongs to, so third-party CSS never has to be edited. And the revert-layer keyword rolls a property back to the value that the previous layer would have given it, which is the clean way of saying: use the layer below instead of my value.',
        'Слой каскада — именованная группа правил с фиксированным местом в порядке приоритетов. Порядок слоёв задаётся тем, в каком порядке они впервые объявлены, и чем раньше объявлен слой, тем он слабее. Правило, удивляющее всех: любой стиль, написанный вне слоя, побеждает все стили внутри слоёв независимо от специфичности.\n\nПолезный приём — объявить весь порядок один раз в начале таблицы стилей, а слои использовать как именованные этапы архитектуры: reset, vendor, tokens, components, utilities. Тогда утилитарный класс в последнем слое перебивает правило компонента вообще без !important, а сторонняя таблица стилей, импортированная в слой vendor, больше не может выиграть за счёт специфичности.\n\nЕщё две детали делают слои пригодными для работы. В @import можно указать имя слоя, поэтому сторонний CSS не приходится править. А ключевое слово revert-layer откатывает свойство к значению, которое дал бы предыдущий слой, и это чистый способ сказать: возьми значение из слоя ниже, а не моё.'
      ),
      bullets: [
        L('A layer is a named group of rules with a fixed priority.', 'Слой — именованная группа правил с фиксированным приоритетом.'),
        L('Layers are compared in declaration order, the earlier ones lose.', 'Слои сравниваются по порядку объявления, ранние проигрывают.'),
        L('Unlayered styles beat every layered style.', 'Стили вне слоёв побеждают любые стили в слоях.'),
        L('Declare the layer order once, before any layer content.', 'Порядок слоёв объявляют один раз, до содержимого слоёв.'),
        L('revert-layer falls back to the value of the previous layer.', 'revert-layer возвращает значение предыдущего слоя.'),
        L('@import url(...) layer(name) assigns a sheet to a layer.', '@import url(...) layer(name) привязывает файл к слою.'),
      ],
      code: `@layer reset, vendor, tokens, components, utilities;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
}

@layer components {
  .button {
    padding: 8px 16px;
  }
}

@layer utilities {
  /* wins over the component rule without !important */
  .button {
    padding: 4px 8px;
  }
}`,
      table: {
        caption: L('Two ways to settle a priority conflict', 'Два способа разрешить конфликт приоритетов'),
        headers: [L('Approach', 'Подход'), L('Cost', 'Цена')],
        rows: [
          [L('Higher specificity', 'Более высокая специфичность'), L('Every future override needs one more class', 'Каждое следующее переопределение требует ещё одного класса')],
          [L('Inline style', 'Инлайновый стиль'), L('Not visible in the stylesheet and hard to remove', 'Не виден в таблице стилей и трудно убирается')],
          [L('!important', '!important'), L('Flips the origin order and blocks user overrides', 'Переворачивает порядок источников и мешает пользователю')],
          [L('Cascade layer', 'Слой каскада'), L('One declared order, no specificity inflation', 'Один объявленный порядок без раздувания специфичности')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('The layer order has to be declared first', 'Порядок слоёв надо объявить заранее'),
          text: L(
            'If the first mention of a layer happens inside a component file, the order of the layers follows the order in which the files are loaded, which is rarely what anyone intends. Declare the complete order in one place before the first @layer block.',
            'Если первое упоминание слоя случилось внутри файла компонента, порядок слоёв совпадёт с порядком загрузки файлов, чего никто не планировал. Объявите полный порядок в одном месте до первого блока @layer.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Layers do not cancel specificity', 'Слои не отменяют специфичность'),
          text: L(
            'Two rules inside the same layer are resolved by specificity and then by source order as usual. Layers reorder the comparison between groups of rules, they do not remove specificity inside a group.',
            'Два правила внутри одного слоя разрешаются по специфичности, а затем по порядку в исходнике, как обычно. Слои меняют порядок сравнения между группами правил, но не отменяют специфичность внутри группы.'
          ),
        },
      ],
      takeaway: L(
        'Declare the layer order up front and let the layers replace specificity wars.',
        'Объявляйте порядок слоёв заранее, а слоями замените войны за специфичность.'
      ),
      seeAlso: [
        L('Section 5-2: specificity and the cascade order', 'Секция 5-2: специфичность и порядок каскада'),
        L('Section 5-4: custom properties and theming', 'Секция 5-4: пользовательские свойства и темы'),
      ],
    },
  ],
};
