import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh06: Chapter = {
  id: 'htmlcss-ch6',
  title: L('Flexbox', 'Флексбокс'),
  summary: L(
    'How a flex container decides its main and cross axes, how free space is distributed, how items grow and shrink, and why gap replaced the margin hacks.',
    'Как флекс-контейнер определяет главную и поперечную оси, как распределяется свободное место, как элементы растут и сжимаются и почему gap заменил хаки с margin.'
  ),
  sections: [
    {
      id: 'htmlcss-ch6-s1',
      title: L('The flex container and its two axes', 'Флекс-контейнер и его две оси'),
      body: L(
        'display: flex turns an element into a flex container and makes its direct children flex items. Everything else about flexbox is described relative to two axes. The main axis is the direction the items are placed in and it is chosen by flex-direction: row means the inline direction of the writing mode, column means the block direction. The cross axis is perpendicular to it, and there is no horizontal and vertical in flexbox at all.\n\nThe row and column values are logical, not physical. In a right-to-left language, a row container lays the items out from right to left, while a column container still stacks downwards. That is why flexbox survives a change of writing mode and a layout written in top and bottom coordinates does not.\n\nA flex container establishes a new formatting context, and that has consequences: the margins of flex items never collapse with each other, float and clear stop working on flex items, and the container height is its content height unless something else sets it. Stretching items with align-items: stretch fills the cross axis, but it never makes the container grow, which surprises people who expect a row of boxes to define its own height.',
        'display: flex превращает элемент в флекс-контейнер, а его непосредственных детей — в флекс-элементы. Всё остальное в флексбоксе описывается относительно двух осей. Главная ось — направление, в котором выкладываются элементы, и её задаёт flex-direction: row означает строчное направление письма, column — блочное. Поперечная ось перпендикулярна главной, и в флексбоксе вообще нет понятий «горизонтально» и «вертикально».\n\nЗначения row и column логические, а не физические. В языке с письмом справа налево row-контейнер выкладывает элементы справа налево, а column-контейнер по-прежнему складывает их вниз. Поэтому флексбокс переживает смену направления письма, а раскладка, написанная в координатах «верх» и «низ», — нет.\n\nФлекс-контейнер создаёт новый контекст форматирования, и это даёт последствия: margin флекс-элементов не схлопываются между собой, float и clear на флекс-элементах перестают работать, а высота контейнера равна высоте содержимого, если её не задали иначе. Растягивание через align-items: stretch заполняет поперечную ось, но никогда не увеличивает сам контейнер, и это удивляет тех, кто ждёт, что ряд блоков задаст себе высоту.'
      ),
      bullets: [
        L('display: flex makes an element a container and its children flex items.', 'display: flex делает элемент контейнером, а его детей — флекс-элементами.'),
        L('flex-direction picks the main axis: row is inline, column is block.', 'flex-direction задаёт главную ось: row — строчная, column — блочная.'),
        L('The cross axis is always perpendicular to the main axis.', 'Поперечная ось всегда перпендикулярна главной.'),
        L('Flex item margins never collapse with each other.', 'Margin флекс-элементов не схлопываются между собой.'),
        L('align-items: stretch fills the cross axis but never grows the container.', 'align-items: stretch заполняет поперечную ось, но не увеличивает контейнер.'),
      ],
      code: `/* row: the main axis follows the inline direction */
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

/* column: the main axis follows the block direction */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* the container keeps the height of its content */
.toolbar__item {
  padding: 6px 10px;
}`,
      table: {
        caption: L('What changes when a container becomes a flex container', 'Что меняется, когда контейнер становится флекс-контейнером'),
        headers: [L('Aspect', 'Аспект'), L('Block layout', 'Блочная раскладка'), L('Flex layout', 'Флекс-раскладка')],
        rows: [
          [L('Margins between children', 'Margin между детьми'), L('Collapse', 'Схлопываются'), L('Never collapse', 'Не схлопываются')],
          [L('float and clear', 'float и clear'), L('Work', 'Работают'), L('Ignored', 'Игнорируются')],
          [L('Vertical alignment', 'Вертикальное выравнивание'), L('Needs a hack', 'Нужен хак'), L('align-items', 'align-items')],
          [L('Space distribution', 'Распределение места'), L('Manual margins', 'Ручные margin'), L('justify-content', 'justify-content')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Reverse changes the visual order only', 'Reverse меняет только визуальный порядок'),
          text: L(
            'flex-direction: row-reverse and column-reverse move the items visually but leave the DOM order untouched, so the tab order and the screen reader order no longer match what the eye sees. Use order on a single item only for decoration, and never for the primary navigation.',
            'flex-direction: row-reverse и column-reverse двигают элементы визуально, но порядок DOM не трогают, поэтому порядок перехода по Tab и порядок скринридера перестают совпадать с тем, что видно глазом. Используйте order для одного элемента только как украшение и никогда для основной навигации.'
          ),
        },
        {
          tone: 'tip',
          title: L('Write row and column, not left and right', 'Пишите row и column, а не left и right'),
          text: L(
            'Flexbox has no notion of a left edge. The same stylesheet serves a left-to-right language and a right-to-left one, which is exactly what you want from a layout system and exactly what left and right break.',
            'У флексбокса нет понятия левого края. Одни и те же стили работают и в языке с письмом слева направо, и в языке с письмом справа налево, и именно этого стоит ждать от системы раскладки, а вот left и right всё ломают.'
          ),
        },
      ],
      takeaway: L(
        'Flexbox is described by two axes, not by horizontal and vertical.',
        'Флексбокс описывается двумя осями, а не словами «горизонтально» и «вертикально».'
      ),
      seeAlso: [
        L('Section 6-2: justify-content distributes free space along the main axis', 'Секция 6-2: justify-content распределяет свободное место по главной оси'),
        L('Chapter 7: grid when you need two dimensions', 'Глава 7: грид, когда нужны два измерения'),
      ],
    },
    {
      id: 'htmlcss-ch6-s2',
      title: L('flex-direction, wrap and justify-content', 'flex-direction, перенос и justify-content'),
      body: L(
        'justify-content distributes the free space along the main axis of a line. flex-start packs the items at the start, flex-end pushes them to the end, center puts them in the middle, space-between puts the first item at the start and the last one at the end with the space distributed between them, space-around gives every item the same space around it so the edges get half, and space-evenly gives the edges exactly as much space as the gaps.\n\nThe difference between space-around and space-evenly is easy to miss and easy to see. With three items and space-around, the gaps between the items are twice as large as the space at the edges. With space-evenly all four gaps are equal, which is what most people picture when they say evenly spaced.\n\nflex-wrap decides what happens when the items do not fit: nowrap, the default, forces them onto one line and lets them shrink or overflow, wrap moves the overflow into a new line, and wrap-reverse does the same but stacks the lines in the opposite order. Wrapping only works when the items are allowed to shrink, and a flex item refuses to shrink below its content unless you give it min-width: 0.',
        'justify-content распределяет свободное место вдоль главной оси строки. flex-start прижимает элементы к началу, flex-end — к концу, center — к середине, space-between ставит первый элемент в начало, а последний в конец и распределяет место между ними, space-around даёт каждому элементу одинаковое место вокруг, так что у краёв остаётся половина, а space-evenly даёт краям ровно столько же места, сколько промежуткам.\n\nРазница между space-around и space-evenly легко упустить и легко заметить. При трёх элементах и space-around промежутки между элементами вдвое больше места у краёв. При space-evenly все четыре промежутка равны, и именно это большинство представляет, говоря «равномерно».\n\nflex-wrap решает, что делать, когда элементы не помещаются: nowrap, значение по умолчанию, держит их на одной строке и позволяет сжиматься или вылезать, wrap переносит лишнее на новую строку, а wrap-reverse делает то же, но складывает строки в обратном порядке. Перенос работает, только если элементам разрешено сжиматься, а флекс-элемент не сожмётся ниже своего содержимого без min-width: 0.'
      ),
      bullets: [
        L('justify-content moves the items inside the line along the main axis.', 'justify-content двигает элементы внутри строки вдоль главной оси.'),
        L('space-around gives the edges half of the space of the gaps.', 'space-around даёт краям половину промежутка между элементами.'),
        L('space-evenly makes the edges equal to the gaps.', 'space-evenly делает края равными промежуткам.'),
        L('flex-wrap needs items that are allowed to shrink.', 'flex-wrap требует, чтобы элементам разрешали сжиматься.'),
        L('justify-content does nothing when the line has no free space.', 'justify-content не делает ничего, когда свободного места нет.'),
      ],
      code: `.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.navbar__links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* long words must be allowed to shrink to wrap */
.navbar__link {
  min-width: 0;
  overflow-wrap: anywhere;
}`,
      table: {
        caption: L('What each justify-content value does', 'Что делает каждое значение justify-content'),
        headers: [L('Value', 'Значение'), L('Result', 'Результат')],
        rows: [
          [L('flex-start', 'flex-start'), L('Items packed at the start of the main axis', 'Элементы прижаты к началу главной оси')],
          [L('flex-end', 'flex-end'), L('Items packed at the end of the main axis', 'Элементы прижаты к концу главной оси')],
          [L('center', 'center'), L('Items centred, free space split equally', 'Элементы в центре, место делится поровну')],
          [L('space-between', 'space-between'), L('First and last item flush with the edges', 'Первый и последний у краёв')],
          [L('space-around', 'space-around'), L('Equal space around each item, the edges get half', 'Одинаковое место вокруг каждого, у краёв половина')],
          [L('space-evenly', 'space-evenly'), L('All gaps equal, including the edges', 'Все промежутки равны, включая края')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('justify-content does not distribute between items', 'justify-content не распределяет между элементами'),
          text: L(
            'It moves the whole group of items, it does not give each item a share of the space. If the goal is equal columns that fill the row, that is flex: 1 on the items, not space-around on the container.',
            'Он двигает всю группу элементов, а не выдаёт каждому свою долю места. Если нужны равные колонки на всю строку, это flex: 1 на элементах, а не space-around на контейнере.'
          ),
        },
        {
          tone: 'note',
          title: L('safe and unsafe', 'safe и unsafe'),
          text: L(
            'justify-content: safe center keeps the beginning of the content visible when it overflows, while unsafe center lets it overflow on both sides. The safe keyword is the right choice for anything that has to stay reachable.',
            'justify-content: safe center сохраняет начало содержимого видимым при переполнении, а unsafe center разрешает переполнение с обеих сторон. Ключевое слово safe — правильный выбор для всего, что должно оставаться достижимым.'
          ),
        },
      ],
      takeaway: L(
        'justify-content distributes the space around the items, and wrapping only works when shrinking is allowed.',
        'justify-content распределяет место вокруг элементов, а перенос работает только при разрешённом сжатии.'
      ),
      seeAlso: [
        L('Section 6-3: align-items works on the cross axis', 'Секция 6-3: align-items работает по поперечной оси'),
        L('Section 6-5: gap replaces the margin hacks', 'Секция 6-5: gap заменяет хаки с margin'),
      ],
    },
    {
      id: 'htmlcss-ch6-s3',
      title: L('align-items, align-content and align-self', 'align-items, align-content и align-self'),
      body: L(
        'align-items aligns the items on the cross axis inside their line: stretch, the default, makes every item fill the cross axis, flex-start and flex-end pin them to the edges, center centres them, and baseline aligns the first line of text of the items with each other, which is the right choice when the items use different font sizes.\n\nalign-self does the same job for one item and overrides align-items for it. The value auto means inherit the container setting. It has no effect on the main axis, so align-self: center does not centre an item along the direction the items flow, and mixing the two axes in one declaration is the most common misunderstanding in flexbox.\n\nalign-content is a different property with a different job: it distributes the whole set of lines along the cross axis, and it only has an effect when the container has more than one line, that is when flex-wrap produced a second line. With a single line align-content does nothing at all, which is why adding it changes nothing and gets blamed on the wrong property.',
        'align-items выравнивает элементы по поперечной оси внутри их строки: stretch, значение по умолчанию, заставляет каждый элемент заполнять поперечную ось, flex-start и flex-end прижимают их к краям, center центрирует, а baseline выравнивает первые строки текста элементов по базовым линиям, и это правильный выбор, когда у элементов разные размеры шрифта.\n\nalign-self делает то же самое для одного элемента и перекрывает align-items для него. Значение auto означает «унаследовать настройку контейнера». На главной оси align-self не действует, поэтому align-self: center не центрирует элемент вдоль направления, в котором идут элементы, и смешивание двух осей в одном объявлении — самая частая путаница в флексбоксе.\n\nalign-content — другое свойство с другой работой: оно распределяет весь набор строк по поперечной оси и имеет эффект, только когда строк больше одной, то есть когда flex-wrap создал вторую строку. При одной строке align-content не делает ничего, поэтому его добавление ничего не меняет, и виноват оказывается не тот селектор.'
      ),
      bullets: [
        L('align-items aligns the items inside a line on the cross axis.', 'align-items выравнивает элементы внутри строки по поперечной оси.'),
        L('stretch is the default and makes the items fill the cross axis.', 'stretch — умолчание, элементы заполняют поперечную ось.'),
        L('align-self overrides align-items for a single item.', 'align-self перекрывает align-items для одного элемента.'),
        L('align-self never affects the main axis.', 'align-self никогда не действует на главной оси.'),
        L('align-content moves whole lines and needs more than one line.', 'align-content двигает целые строки и требует больше одной строки.'),
        L('baseline aligns the text, not the boxes.', 'baseline выравнивает текст, а не блоки.'),
      ],
      code: `.card-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
  gap: 16px;
}

/* this item only */
.card-row__item--top {
  align-self: flex-start;
}

/* text of a different size lines up on the baseline */
.card-row__title {
  font-size: 1.25rem;
}`,
      table: {
        caption: L('Which property does what', 'Какое свойство что делает'),
        headers: [L('Property', 'Свойство'), L('Axis', 'Ось'), L('Works on', 'Действует на')],
        rows: [
          [L('justify-content', 'justify-content'), L('Main', 'Главная'), L('The group of items in a line', 'Группу элементов в строке')],
          [L('align-items', 'align-items'), L('Cross', 'Поперечная'), L('Each item inside its line', 'Каждый элемент внутри строки')],
          [L('align-self', 'align-self'), L('Cross', 'Поперечная'), L('One item, overriding align-items', 'Один элемент поверх align-items')],
          [L('align-content', 'align-content'), L('Cross', 'Поперечная'), L('The lines themselves, several lines only', 'Сами строки, только при нескольких строках')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('align-content on a single line container', 'align-content у контейнера с одной строкой'),
          text: L(
            'align-content is the property people reach for when the items are not centred, and it does nothing unless the container wrapped. Count the lines first; the fix is usually align-items.',
            'align-content — свойство, к которому тянутся, когда элементы не центрированы, но оно не делает ничего, пока контейнер не перенёсся. Сначала посчитайте строки: обычно нужен align-items.'
          ),
        },
        {
          tone: 'tip',
          title: L('baseline for mixed font sizes', 'baseline для разных размеров шрифта'),
          text: L(
            'align-items: baseline lines up the first line of text of every item, so a heading and a paragraph in the same row stand on one baseline instead of being centred against each other.',
            'align-items: baseline выравнивает первую строку текста каждого элемента, поэтому заголовок и абзац в одном ряду стоят на общей базовой линии, а не центрируются друг относительно друга.'
          ),
        },
      ],
      takeaway: L(
        'align-items works on items, align-content works on lines, and one of them is usually the answer.',
        'align-items работает с элементами, align-content — со строками, и обычно нужен один из них.'
      ),
      seeAlso: [
        L('Section 6-2: justify-content and the main axis', 'Секция 6-2: justify-content и главная ось'),
        L('Section 6-4: flex-basis decides the starting size', 'Секция 6-4: flex-basis задаёт начальный размер'),
      ],
    },
    {
      id: 'htmlcss-ch6-s4',
      title: L('flex-grow, flex-shrink and flex-basis', 'flex-grow, flex-shrink и flex-basis'),
      body: L(
        'Three longhand properties decide how an item is sized. flex-basis is the starting size along the main axis and it wins over width. flex-grow is the share of the positive free space the item takes, and flex-shrink is the share of the negative free space, the deficit, that it absorbs. The default is grow 0, shrink 1, basis auto, so items keep their content size but may shrink when the row is too narrow.\n\nThe shorthand flex writes all three at once, and the common values are worth memorising. flex: 1 means grow 1, shrink 1, basis 0, which makes the items equal regardless of their content. flex: 0 0 auto forbids both growing and shrinking and pins the item to its content, which is what a fixed toolbar button wants. flex: 1 1 auto starts from the content size and then shares whatever is left.\n\nThe base size has one subtlety: flex-basis is resolved against the content box, unless box-sizing is border-box, in which case it describes the border box. Shrinking is also proportional to the base size times the shrink factor, so a wide item loses more space than a narrow one, which is often not what the layout needs. The reliable cure for a row that refuses to shrink is min-width: 0 on the item.',
        'Размер элемента задают три длинных свойства. flex-basis — начальный размер вдоль главной оси, и он побеждает width. flex-grow — доля положительного свободного места, которое заберёт элемент, а flex-shrink — доля дефицита, который он поглотит. По умолчанию grow 0, shrink 1, basis auto, поэтому элементы сохраняют размер по содержимому, но могут сжиматься, когда строка слишком узкая.\n\nСокращение flex записывает все три сразу, и обычные значения стоит запомнить. flex: 1 означает grow 1, shrink 1, basis 0, из-за чего элементы равны независимо от содержимого. flex: 0 0 auto запрещает и рост, и усадку и прикапывает элемент к содержимому — этого хотят фиксированные кнопки тулбара. flex: 1 1 auto стартует от размера содержимого, а потом делит оставшееся.\n\nУ базового размера есть одна тонкость: flex-basis отсчитывается от контентной коробки, если только box-sizing не border-box, и тогда он описывает рамку целиком. Усадка также пропорциональна базовому размеру, умноженному на коэффициент, поэтому широкий элемент теряет больше места, чем узкий, и это часто не то, что нужно вёрстке. Надёжное лечение строки, которая отказывается сжиматься, — min-width: 0 на элементе.'
      ),
      bullets: [
        L('flex-basis is the starting size and beats width.', 'flex-basis — начальный размер, он побеждает width.'),
        L('flex-grow divides the free space, flex-shrink divides the deficit.', 'flex-grow делит свободное место, flex-shrink — дефицит.'),
        L('flex: 1 means grow 1, shrink 1, basis 0.', 'flex: 1 означает grow 1, shrink 1, basis 0.'),
        L('flex: 0 0 auto pins an item to its content size.', 'flex: 0 0 auto прикапывает элемент к размеру содержимого.'),
        L('Shrink is proportional to the base size, not to the number of items.', 'Усадка пропорциональна базовому размеру, а не числу элементов.'),
        L('min-width: 0 removes the content based floor of a flex item.', 'min-width: 0 убирает порог flex-элемента, заданный содержимым.'),
      ],
      code: `.row {
  display: flex;
  gap: 16px;
}

/* grows and shrinks, starts from the content */
.row__main {
  flex: 1 1 auto;
  min-width: 0;
}

/* fixed side panel */
.row__aside {
  flex: 0 0 240px;
}

/* equal columns regardless of the content length */
.row__cell {
  flex: 1 1 0;
}`,
      table: {
        caption: L('The flex shorthand values you will actually use', 'Значения сокращения flex, которые действительно пригодятся'),
        headers: [L('Value', 'Значение'), L('Grow', 'Grow'), L('Shrink', 'Shrink'), L('Basis', 'Basis')],
        rows: [
          [L('flex: 1', 'flex: 1'), L('1', '1'), L('1', '1'), L('0', '0')],
          [L('flex: 1 1 auto', 'flex: 1 1 auto'), L('1', '1'), L('1', '1'), L('auto', 'auto')],
          [L('flex: 0 0 auto', 'flex: 0 0 auto'), L('0', '0'), L('0', '0'), L('auto', 'auto')],
          [L('flex: 0 1 auto', 'flex: 0 1 auto'), L('0', '0'), L('1', '1'), L('auto', 'auto')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('flex: 1 is not width: 100%', 'flex: 1 — это не width: 100%'),
          text: L(
            'flex: 1 gives the item a share of the free space, so two of them split the row equally and a third one takes a third. If the items must keep their own proportions, set flex-grow only and leave the basis alone.',
            'flex: 1 даёт элементу долю свободного места, поэтому два делят строку поровну, а третий берёт треть. Если элементы должны сохранить свои пропорции, задавайте только flex-grow и не трогайте basis.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The automatic minimum size', 'Автоматический минимум элемента'),
          text: L(
            'A flex item refuses to shrink below its content, so a long word in a narrow column pushes the row past the viewport and produces a horizontal scroll on the whole page. min-width: 0 removes that floor.',
            'Флекс-элемент не сжимается ниже своего содержимого, поэтому длинное слово в узкой колонке выталкивает строку за пределы вьюпорта и даёт горизонтальную прокрутку всей страницы. min-width: 0 убирает этот порог.'
          ),
        },
      ],
      takeaway: L(
        'flex-basis sets the start, flex-grow and flex-shrink distribute what is left.',
        'flex-basis задаёт начало, а flex-grow и flex-shrink распределяют остаток.'
      ),
      seeAlso: [
        L('Section 6-1: the flex container and its two axes', 'Секция 6-1: флекс-контейнер и его две оси'),
        L('Chapter 4: the box model and box-sizing', 'Глава 4: бокс-модель и box-sizing'),
      ],
    },
    {
      id: 'htmlcss-ch6-s5',
      title: L('gap and the gap override', 'gap и его переопределение'),
      body: L(
        'gap puts space between the items of a flex or grid container and replaces the old tricks: negative margins on the first child, a margin on the last child, and a wrapper element whose only job was to carry the spacing. Unlike margin, gap never collapses, so the space is exactly what you wrote no matter what the neighbours do.\n\nTwo details are worth remembering. The space is only between items: there is no gap before the first one and none after the last one, so a container with a single item shows no gap at all. And the shorthand takes two values, where the first one is the row gap and the second one is the column gap, except in flexbox, where the meaning depends on flex-direction.\n\nThat flexbox exception is genuinely confusing. In a row container the first value is the gap between the wrapped lines and the second is the gap between the items inside a line. In a column container the first value is the gap between the items and the second is the gap between the lines. Use a single value unless you genuinely need different spacing per direction.',
        'gap задаёт промежуток между элементами флекс- или грид-контейнера и заменяет старые приёмы: отрицательные margin у первого ребёнка, margin у последнего и обёртку, чья единственная работа — носить отступы. В отличие от margin, gap не схлопывается, поэтому промежуток ровно такой, как записан, независимо от соседей.\n\nСтоит запомнить две детали. Промежуток есть только между элементами: перед первым и после последнего его нет, поэтому у контейнера с одним элементом видимого промежутка нет вообще. И сокращение принимает два значения, где первое — промежуток между строками, а второе — между колонками, кроме флексбокса, где смысл зависит от flex-direction.\n\nЭто исключение в флексбоксе действительно сбивает с толку. В row-контейнере первое значение — промежуток между перенесёнными строками, а второе — между элементами внутри строки. В column-контейнере первое значение — между элементами, а второе — между строками. Пользуйтесь одним значением, если действительно не нужны разные отступы по направлениям.'
      ),
      bullets: [
        L('gap replaces negative margins and the last-child rules.', 'gap заменяет отрицательные margin и правила для последнего ребёнка.'),
        L('gap never collapses, unlike margin.', 'gap никогда не схлопывается, в отличие от margin.'),
        L('There is no gap before the first item or after the last one.', 'Перед первым элементом и после последнего промежутка нет.'),
        L('In flexbox the two gap values swap meaning with flex-direction.', 'В флексбоксе два значения gap меняются местами вместе с flex-direction.'),
        L('gap is one property for flex, grid and multi-column layouts.', 'gap — одно свойство для флексбокса, грида и многоколоночной вёрстки.'),
      ],
      code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;   /* rows, then columns */
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* one value sets both directions */
.toolbar--wide {
  gap: 24px;
}`,
      table: {
        caption: L('The gap values in each layout', 'Значения gap в каждой раскладке'),
        headers: [L('Layout', 'Раскладка'), L('First value', 'Первое значение'), L('Second value', 'Второе значение')],
        rows: [
          [L('Grid', 'Грид'), L('Between rows', 'Между строками'), L('Between columns', 'Между колонками')],
          [L('Flex, row direction', 'Флекс, направление row'), L('Between flex lines', 'Между строками флекса'), L('Between items in a line', 'Между элементами строки')],
          [L('Flex, column direction', 'Флекс, направление column'), L('Between items in a line', 'Между элементами строки'), L('Between flex lines', 'Между строками флекса')],
          [L('Multi-column', 'Многоколоночная'), L('Between columns of text', 'Между колонками текста'), L('Between rows of columns', 'Между рядами колонок')],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Gap beats margin for the space between siblings', 'Gap лучше margin для промежутка между соседями'),
          text: L(
            'Margins on the last item leak outside the container and need last-child corrections. Gap belongs to the container, so a wrapped row keeps the same spacing and the container never grows an extra margin.',
            'Margin у последнего элемента вылезает за контейнер и требует правок для последнего ребёнка. Gap принадлежит контейнеру, поэтому перенесённая строка сохраняет ту же плотность, а контейнер не растёт на лишний margin.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('Two values in flexbox', 'Два значения во флексбоксе'),
          text: L(
            'gap: 12px 24px means different things in a row container and in a column container. When the direction changes, the two values swap roles, and the spacing that was between the items becomes the spacing between the lines.',
            'gap: 12px 24px означает разное в row-контейнере и в column-контейнере. Когда направление меняется, значения меняются ролями, и промежуток между элементами становится промежутком между строками.'
          ),
        },
      ],
      takeaway: L(
        'Use gap for the space between items, and remember that its two values swap roles in flexbox.',
        'Используйте gap для промежутков между элементами и помните, что в флексбоксе два значения меняются ролями.'
      ),
      seeAlso: [
        L('Section 6-2: justify-content distributes the rest of the space', 'Секция 6-2: justify-content распределяет остаток места'),
        L('Section 7-1: the grid container and its tracks', 'Секция 7-1: грид-контейнер и его дорожки'),
      ],
    },
  ],
};
