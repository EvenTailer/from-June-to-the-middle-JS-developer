import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh04: Chapter = {
  id: 'htmlcss-ch4',
  title: L('The box model and layout fundamentals', 'Бокс-модель и основы раскладки'),
  summary: L(
    'How content-box and border-box change every size you write, what the containing block decides about percentages and heights, why margins collapse and how to stop it, the five positioning schemes and their containing blocks, and what overflow and stacking contexts really do.',
    'Как content-box и border-box меняют любой размер, который вы пишете, что содержащий блок решает про проценты и высоты, почему схлопываются отступы и как это остановить, пять схем позиционирования и их содержащие блоки и что на самом деле делают overflow и контексты наложения.'
  ),
  sections: [
    {
      id: 'htmlcss-ch4-s1',
      title: L('The box model and box-sizing', 'Бокс-модель и box-sizing'),
      body: L(
        'Every element in CSS is a rectangle of four nested boxes: content, padding, border and margin. Padding is the space inside the border, the border sits between padding and margin, and the margin is the space outside it that never takes a background colour. The box model is the reason a width of 200 pixels produces a visible element of 234 pixels, and the reason is the padding and the border.\n\nThe box-sizing property decides what the width property measures. With the default content-box the width sets the content width only, so the real outer size is that width plus the padding plus the border. With border-box the width sets the outer edge of the border, and the padding and the border are subtracted from the inside. The second behaviour is what a written width almost always means, which is why every project starts with a global reset.\n\nThe reset is one declaration, and it is worth knowing which elements it does not touch. Table cells and several form controls, such as checkboxes, radio buttons and buttons, already use border-box in the browser stylesheet, while textarea and select keep content-box. A global border-box therefore changes the sizing of the elements you write rules for and leaves the rest of the page alone.\n\nTwo constraints sit on top of the width. min-width and max-width beat width, so a fluid element with max-width: 60ch still shrinks on a narrow screen. And the width property does not touch the margin, which is why a box with width 100% and a horizontal margin overflows its container and gives the page a horizontal scrollbar.',
        'Любой элемент в CSS — это прямоугольник из четырёх вложенных боксов: содержимое, внутренние отступы, рамка и внешний отступ. Padding — это пространство внутри рамки, рамка стоит между padding и margin, а margin — это пространство снаружи, которое никогда не получает фоновый цвет. Именно бокс-модель объясняет, почему ширина 200 пикселей даёт видимый элемент шириной 234 пикселя: потому что добавились padding и рамка.\n\nСвойство box-sizing решает, что именно измеряет свойство width. При значении content-box по умолчанию width задаёт ширину содержимого, и реальный внешний размер равен этой ширине плюс padding плюс рамка. При border-box width задаёт внешнюю границу рамки, а padding и рамка вычитаются изнутри. Второе поведение — это почти всегда то, что имеется в виду записанной шириной, и поэтому каждый проект начинается с глобального сброса.\n\nСброс — это одно объявление, и полезно знать, какие элементы оно не затрагивает. Ячейки таблиц и несколько элементов формы вроде чекбоксов, радиокнопок и кнопок уже используют border-box в стилях браузера, а textarea и select сохраняют content-box. Глобальный border-box меняет размер именно тех элементов, для которых вы пишете правила, и не трогает остальную страницу.\n\nПоверх ширины накладываются два ограничения. min-width и max-width сильнее width, поэтому элемент с max-width: 60ch всё равно сжимается на узком экране. И свойство width не касается margin, поэтому бокс с width 100% и горизонтальным отступом выходит за пределы контейнера и добавляет странице горизонтальную полосу прокрутки.'
      ),
      bullets: [
        L('Every element is a content box, a padding box, a border box and a margin box.', 'Любой элемент — это бокс содержимого, бокс padding, бокс рамки и бокс отступа.'),
        L('content-box measures width on the content, border-box measures it on the border.', 'content-box измеряет width по содержимому, border-box — по рамке.'),
        L('A global border-box reset is one declaration and keeps every width honest.', 'Глобальный сброс border-box — одно объявление, и ширины перестают врать.'),
        L('min-width and max-width override the width property.', 'min-width и max-width перекрывают свойство width.'),
        L('The margin is outside the box and is never affected by width.', 'Отступ находится снаружи бокса, и width его не касается.'),
      ],
      code: `<div class="card">
  <h2>Delivery</h2>
  <p>Every order leaves the warehouse within two working days.</p>
</div>

*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 16px;
  border: 1px solid #d0d0d0;
}`,
      table: {
        caption: L('What width: 200px means with 16px padding and a 1px border', 'Что значит width: 200px при padding 16px и рамке 1px'),
        headers: [L('Property', 'Свойство'), L('content-box', 'content-box'), L('border-box', 'border-box')],
        rows: [
          [L('width: 200px sets', 'width: 200px задаёт'), L('the content width', 'ширину содержимого'), L('the outer width', 'внешнюю ширину')],
          [L('Padding adds', 'Padding добавляет'), L('32px', '32px'), L('nothing, it is taken from the inside', 'ничего, берётся изнутри')],
          [L('Border adds', 'Рамка добавляет'), L('2px', '2px'), L('nothing, it is taken from the inside', 'ничего, берётся изнутри')],
          [L('Resulting outer width', 'Итоговая внешняя ширина'), L('234px', '234px'), L('200px', '200px')],
        ],
      },
      takeaway: L(
        'Reset box-sizing to border-box once, and every width you write becomes the width you meant.',
        'Один раз сбросьте box-sizing в border-box, и любая записанная ширина станет той, которую вы имели в виду.'
      ),
      seeAlso: [
        L('Section 4-2: width, height and the containing block', 'Секция 4-2: ширина, высота и содержащий блок'),
        L('Section 4-3: margin collapsing', 'Секция 4-3: схлопывание отступов'),
        L('Chapter 7: grid for two-dimensional layout', 'Глава 7: grid для двумерной раскладки'),
      ],
    },
    {
      id: 'htmlcss-ch4-s2',
      title: L('Width, height and the containing block', 'Ширина, высота и содержащий блок'),
      body: L(
        'The keyword auto is not the same as no width. For a block in normal flow it resolves to the width of the containing block minus the margins, the padding and the border, so the element fills the line. For an inline-block, a float or a table cell the same keyword resolves to shrink-to-fit: the width of the preferred content, limited by the space available in the container.\n\nA percentage width is resolved against the width of the containing block, and that definition changes with the position of the element. For a static or relative element the containing block is the content box of the nearest block container ancestor. For an absolutely positioned element it is the padding box of the nearest positioned ancestor. For a fixed element it is the viewport, and for a flex or grid item it is the content box of the flex container or the grid area.\n\nHeight is the harder half of the story. The height of an element with auto resolves to the content height, and a percentage height can only be resolved when the containing block has a definite height. A child with height 50% inside a parent with height auto therefore computes to auto, which is the classic surprise behind a collapsed parent and a page that grows with the content.\n\nTwo intrinsic keywords are worth knowing, because they are the honest way to size text that should not wrap. The min-content width is the width of the longest unbreakable word, and the max-content width is the width the text would take if it never wrapped. Together they describe the range a piece of text can occupy, and they are what you use when a column must not be squeezed below its longest word.',
        'Ключевое слово auto — не то же самое, что отсутствие ширины. Для блочного элемента в обычном потоке оно вычисляется как ширина содержащего блока за вычетом отступов, padding и рамки, то есть элемент занимает всю строку. Для inline-block, плавающего элемента или ячейки таблицы то же ключевое слово даёт shrink-to-fit: ширину предпочтительного содержимого, ограниченную местом в контейнере.\n\nПроцентная ширина вычисляется относительно ширины содержащего блока, и это определение меняется в зависимости от позиционирования элемента. Для статического или относительно позиционированного элемента содержащим блоком служит бокс содержимого ближайшего блочного предка. Для абсолютно позиционированного — бокс padding ближайшего позиционированного предка. Для фиксированного — вьюпорт, а для элемента flex или grid — бокс содержимого flex-контейнера или область сетки.\n\nВысота — вторая, более трудная половина истории. Высота элемента со значением auto вычисляется по содержимому, а процентная высота разрешается только тогда, когда у содержащего блока определённая высота. Поэтому потомок с height 50% внутри родителя с height auto вычисляется как auto, и это классическое удивление за скрытым схлопыванием родителя и страницей, которая растёт вместе с содержимым.\n\nСтоит знать два встроенных ключевых слова, потому что это честный способ задать размер тексту, который не должен переноситься. min-content — это ширина самого длинного неразрывного слова, а max-content — ширина, которую текст занял бы, если бы никогда не переносился. Вместе они описывают диапазон, который может занимать текст, и ими пользуются, когда колонка не должна сжиматься ниже самого длинного слова.'
      ),
      bullets: [
        L('auto means fill the line for a block and shrink-to-fit for an inline-block or float.', 'auto — занять строку для блока и ужаться по содержимому для inline-block или float.'),
        L('A percentage width resolves against the containing block, not the viewport.', 'Процентная ширина считается от содержащего блока, а не от вьюпорта.'),
        L('An absolute element measures against the padding box of the positioned ancestor.', 'Абсолютный элемент считает от бокса padding позиционированного предка.'),
        L('A percentage height needs a definite height in the containing block.', 'Процентной высоте нужна определённая высота у содержащего блока.'),
        L('min-content and max-content describe the range a text can occupy.', 'min-content и max-content описывают диапазон, который может занимать текст.'),
      ],
      code: `.card {
  width: 100%;        /* a percentage of the containing block */
  max-width: 40rem;
}

.badge {
  position: absolute;
  inset-inline-start: 0;
  width: 25%;         /* of the padding box of the positioned ancestor */
}

.label {
  display: inline-block;
  width: max-content; /* as wide as the text needs, never wrapping */
}`,
      table: {
        caption: L('The containing block of each position type', 'Содержащий блок для каждого типа позиционирования'),
        headers: [L('Element', 'Элемент'), L('Containing block', 'Содержащий блок')],
        rows: [
          [L('static or relative', 'static или relative'), L('The content box of the nearest block container ancestor', 'Бокс содержимого ближайшего блочного предка')],
          [L('absolute', 'absolute'), L('The padding box of the nearest positioned ancestor', 'Бокс padding ближайшего позиционированного предка')],
          [L('fixed', 'fixed'), L('The viewport, unless a transformed ancestor creates one', 'Вьюпорт, если содержащий блок не создал трансформированный предок')],
          [L('flex item', 'элемент flex'), L('The content box of the flex container', 'Бокс содержимого flex-контейнера')],
          [L('grid item', 'элемент grid'), L('The grid area it is placed in', 'Область сетки, в которую он помещён')],
        ],
      },
      takeaway: L(
        'Percentages always mean a share of the containing block, and a percentage height needs a definite height to resolve.',
        'Проценты всегда означают долю содержащего блока, а процентной высоте нужна определённая высота, чтобы разрешиться.'
      ),
      seeAlso: [
        L('Section 4-1: the box model and box-sizing', 'Секция 4-1: бокс-модель и box-sizing'),
        L('Section 4-4: positioning schemes', 'Секция 4-4: схемы позиционирования'),
        L('Chapter 6: flexbox for one-dimensional layout', 'Глава 6: flexbox для одномерной раскладки'),
      ],
    },
    {
      id: 'htmlcss-ch4-s3',
      title: L('Margin collapsing', 'Схлопывание отступов'),
      body: L(
        'Adjacent vertical margins collapse. The bottom margin of one block and the top margin of the next become a single margin, and the result is the larger of the two positive values rather than their sum. This is why a 40 pixel margin above a heading and a 40 pixel margin below the previous paragraph produce 40 pixels of space and not 80, and it is also why the gap between two elements is easy to change by accident from either side.\n\nThe collapsing also happens between a parent and its first child, and between a parent and its last child, when the parent has no padding, no border, no inline content, no height or min-height, and its overflow is visible. That is the bug where the first heading pushes the whole card down and leaves a gap above the card that nothing seems to own. Padding the parent, giving it a border, or setting display to flow-root stops the collapse.\n\nMargins only collapse in normal flow. Flex items and grid items never collapse their margins with each other or with the container, because a flex or grid container establishes a new formatting context where the margins are simply distances. That difference surprises people who move a layout into grid and find that the spacing between the items has doubled.\n\nCollapsing is also why the classic habit of putting a margin-top on the first child of a card is fragile. The margin belongs to the card in the visual result but to the child in the code, so any change to the structure silently changes the spacing. The predictable version puts the spacing on the card itself, or uses the gap property in a flex or grid container, where it never collapses.',
        'Соседние вертикальные отступы схлопываются. Нижний отступ одного блока и верхний отступ следующего превращаются в один отступ, и результат равен большему из двух положительных значений, а не их сумме. Поэтому отступ 40 пикселей над заголовком и отступ 40 пикселей под предыдущим абзацем дают 40 пикселей, а не 80, и поэтому расстояние между двумя элементами легко изменить случайно с любой стороны.\n\nСхлопывание происходит и между родителем и его первым потомком, и между родителем и последним, если у родителя нет padding, нет рамки, нет строчного содержимого, нет height и min-height, а overflow остаётся visible. Это баг, где первый заголовок выталкивает всю карточку вниз и над ней остаётся пустота, не принадлежащая никому. Padding у родителя, рамка или display: flow-root останавливают схлопывание.\n\nОтступы схлопываются только в обычном потоке. Элементы flex и grid никогда не схлопывают свои отступы ни друг с другом, ни с контейнером, потому что flex- и grid-контейнеры создают новый контекст форматирования, где отступы — просто расстояния. Это отличие удивляет тех, кто переносит раскладку в grid и обнаруживает, что расстояние между элементами удвоилось.\n\nСхлопывание — и причина того, почему привычка вешать margin-top на первого потомка карточки хрупка. Визуально отступ принадлежит карточке, а в коде — потомку, поэтому любое изменение структуры молча меняет расстояние. Надёжный вариант задаёт отступ самой карточке или использует свойство gap в flex- или grid-контейнере, где отступы не схлопываются.'
      ),
      bullets: [
        L('Adjacent vertical margins collapse to the larger of the two, not the sum.', 'Соседние вертикальные отступы схлопываются в больший из них, а не в сумму.'),
        L('A parent collapses with its first and last child when it has no padding, border or height.', 'Родитель схлопывается с первым и последним потомком, если у него нет padding, рамки и высоты.'),
        L('Padding, a border, a definite height or overflow other than visible stop the collapse.', 'Padding, рамка, определённая высота или overflow, отличный от visible, останавливают схлопывание.'),
        L('Flex and grid items never collapse their margins.', 'Элементы flex и grid никогда не схлопывают свои отступы.'),
        L('display: flow-root contains the margins without any side effects.', 'display: flow-root удерживает отступы без побочных эффектов.'),
      ],
      code: `<section class="card">
  <h2 class="title">Delivery</h2>
  <p class="paragraph">The order leaves the warehouse within two working days.</p>
</section>

/* adjacent margins collapse: 24px wins over 16px */
.title {
  margin-block: 0 24px;      /* the bottom margin of the title */
}

.paragraph {
  margin-block: 16px 0;      /* the top margin of the paragraph */
}

/* display: flow-root stops the parent-child collapse */
.card {
  display: flow-root;
}`,
      table: {
        caption: L('Which margins collapse', 'Какие отступы схлопываются'),
        headers: [L('Situation', 'Ситуация'), L('Collapses', 'Схлопывается')],
        rows: [
          [L('Adjacent siblings in normal flow', 'Соседние элементы в обычном потоке'), L('yes', 'да')],
          [L('Parent and its first or last child', 'Родитель и первый или последний потомок'), L('yes, when the parent has no padding, border, inline content or height', 'да, если у родителя нет padding, рамки, строчного содержимого и высоты')],
          [L('Flex items with each other', 'Элементы flex между собой'), L('never', 'никогда')],
          [L('Grid items with each other', 'Элементы grid между собой'), L('never', 'никогда')],
          [L('Margins around a floated element', 'Отступы вокруг плавающего элемента'), L('no', 'нет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The gap that belongs to nobody', 'Промежуток, который не принадлежит никому'),
          text: L(
            'A collapsed margin between a parent and its child leaves space above the parent that no rule in the parent seems to explain. The fix is on the parent: a padding, a border or display: flow-root.',
            'Схлопывавшийся отступ между родителем и потомком оставляет над родителем место, которое ни одно правило родителя не объясняет. Лечится это на родителе: padding, рамка или display: flow-root.'
          ),
        },
      ],
      takeaway: L(
        'Assume vertical margins collapse, and put spacing on the parent or in a gap property when you need it to be predictable.',
        'Считайте, что вертикальные отступы схлопываются, и задавайте расстояние на родителе или через gap, когда важна предсказуемость.'
      ),
      seeAlso: [
        L('Section 4-1: the box model and box-sizing', 'Секция 4-1: бокс-модель и box-sizing'),
        L('Chapter 6: flexbox and the gap property', 'Глава 6: flexbox и свойство gap'),
      ],
    },
    {
      id: 'htmlcss-ch4-s4',
      title: L('Positioning schemes', 'Схемы позиционирования'),
      body: L(
        'The position property chooses one of five schemes. static is the default: the element stays in the flow and the offsets top, left, right and bottom do nothing at all. relative keeps the element in the flow and shifts it away from its normal place, which moves the painted box without moving the space it occupies, so the neighbours stay exactly where they were.\n\nabsolute removes the element from the flow and positions it against the containing block, which is the padding box of the nearest positioned ancestor. fixed removes it from the flow and positions it against the viewport, which is what a fixed header uses. A fixed element becomes relative to a transformed ancestor instead, because a transform creates a containing block for fixed descendants, and that is a classic source of a header that scrolls away unexpectedly.\n\nsticky is a hybrid: the element stays in the flow until its threshold is reached, and then it behaves like fixed inside the bounds of its nearest scrolling ancestor. It is the right tool for a table header that stops at the end of the table, and it needs a scroll container to stick to, otherwise it only works against the viewport.\n\nThe z-index property only applies to positioned elements and to flex and grid items, and it only orders elements inside the same stacking context. Raising the z-index of a tooltip to 9999 does nothing if the tooltip sits inside a container that creates its own stacking context, because that whole container is painted as one unit and the tooltip can never rise above it.',
        'Свойство position выбирает одну из пяти схем. static — значение по умолчанию: элемент остаётся в потоке, а смещения top, left, right и bottom не делают ровно ничего. relative оставляет элемент в потоке и сдвигает его от обычного места, то есть двигает нарисованный бокс, не двигая место, которое он занимает, поэтому соседи остаются ровно на месте.\n\nabsolute убирает элемент из потока и позиционирует его по содержащему блоку, то есть по боксу padding ближайшего позиционированного предка. fixed убирает его из потока и позиционирует по вьюпорту, и именно это использует фиксированная шапка. Но фиксированный элемент становится относительным трансформированного предка, потому что transform создаёт содержащий блок для fixed-потомков, и это классический источник шапки, которая неожиданно уезжает при прокрутке.\n\nsticky — это гибрид: элемент остаётся в потоке, пока не достигнут его порог, а затем ведёт себя как fixed в границах ближайшего прокручиваемого предка. Это правильный инструмент для заголовка таблицы, который останавливается у конца таблицы, и ему нужен прокручиваемый контейнер, иначе он работает только относительно вьюпорта.\n\nСвойство z-index работает только у позиционированных элементов и у элементов flex и grid и только упорядочивает их внутри одного контекста наложения. Поднять z-index подсказки до 9999 бесполезно, если подсказка лежит внутри контейнера, создающего собственный контекст наложения: весь контейринг рисуется как единое целое, и подсказка не сможет подняться над ним.'
      ),
      bullets: [
        L('static ignores the offsets, relative shifts the box without moving the space.', 'static игнорирует смещения, relative сдвигает бокс, не двигая место.'),
        L('absolute positions against the padding box of the nearest positioned ancestor.', 'absolute позиционируется по боксу padding ближайшего позиционированного предка.'),
        L('fixed positions against the viewport, unless a transform takes over.', 'fixed позиционируется по вьюпорту, если только не вмешается transform.'),
        L('sticky stays in the flow and needs a scroll container to stick to.', 'sticky остаётся в потоке и требует прокручиваемого контейнера.'),
        L('z-index applies to positioned elements and flex or grid items only.', 'z-index работает только у позиционированных элементов и элементов flex или grid.'),
      ],
      code: `.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.badge {
  position: absolute;
  inset-block-start: 8px;
  inset-inline-end: 8px;
}

.modal {
  position: fixed;
  inset: 0;
}

.tooltip {
  position: relative;
  top: -4px;   /* the box shifts, the space in the flow stays */
}`,
      table: {
        caption: L('The five positioning schemes', 'Пять схем позиционирования'),
        headers: [L('Value', 'Значение'), L('In the flow', 'В потоке'), L('Positioned against', 'Позиционируется относительно')],
        rows: [
          [L('static', 'static'), L('yes', 'да'), L('Nothing, the offsets are ignored', 'Ничего, смещения игнорируются')],
          [L('relative', 'relative'), L('yes', 'да'), L('Its own normal position', 'Своего обычного места')],
          [L('absolute', 'absolute'), L('no', 'нет'), L('The padding box of the positioned ancestor', 'Бокса padding позиционированного предка')],
          [L('fixed', 'fixed'), L('no', 'нет'), L('The viewport', 'Вьюпорта')],
          [L('sticky', 'sticky'), L('yes, until it sticks', 'да, пока не прилипнет'), L('Its normal position, then the scrollport', 'Своего обычного места, затем области прокрутки')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Transform hijacks fixed positioning', 'Transform перехватывает fixed'),
          text: L(
            'Any ancestor with a transform, a filter or a backdrop-filter becomes the containing block for its fixed descendants. A modal dialog inside a transformed card then scrolls with the card instead of covering the viewport.',
            'Любой предок с transform, filter или backdrop-filter становится содержащим блоком для своих fixed-потомков. Модальный диалог внутри трансформированной карточки уезжает вместе с карточкой, а не перекрывает вьюпорт.'
          ),
        },
      ],
      takeaway: L(
        'Use relative for small nudges, absolute for elements anchored to a parent, fixed only for viewport-level overlays, and sticky for headers.',
        'Используйте relative для небольших сдвигов, absolute для элементов, привязанных к родителю, fixed только для оверлеев на весь вьюпорт, а sticky для шапок.'
      ),
      seeAlso: [
        L('Section 4-5: overflow and stacking contexts', 'Секция 4-5: overflow и контексты наложения'),
        L('Section 1-4: lists, tables and their semantics', 'Секция 1-4: списки, таблицы и их семантика'),
      ],
    },
    {
      id: 'htmlcss-ch4-s5',
      title: L('Overflow and stacking contexts', 'Overflow и контексты наложения'),
      body: L(
        'The overflow property controls what happens to the content that does not fit. The values are visible, hidden, scroll, clip and auto. visible is the default and lets the content spill out of the box. hidden clips it and, more importantly, turns the element into a scroll container, so the content can be scrolled by script even though the user never sees a scrollbar.\n\nThe overflow shorthand has one trap that everybody hits once. If one axis is visible and the other is not, the visible value computes to auto. Setting overflow-x to hidden to stop a horizontal scrollbar therefore makes overflow-y auto, and the element quietly gains a vertical scrollbar or swallows the wheel. Use overflow clip when the intent is to clip without creating a scroll container.\n\nA stacking context is a group of elements that is painted as one unit, and the z-index values inside it only matter relative to each other. Many properties create one: the root element, position fixed and sticky, a positioned element with a z-index other than auto, an element with opacity below 1, and any element with transform, filter, backdrop-filter, perspective, will-change, isolation isolate, mix-blend-mode other than normal, or contain set to layout, paint, strict or content.\n\nInside a stacking context the painting order is fixed. Elements with a negative z-index paint first, then the in-flow block boxes, then the floats, then the inline content, then the positioned elements with a z-index of zero or auto, and finally the elements with a positive z-index. Knowing this order is the difference between fixing a layering bug and guessing z-index values until the symptom disappears.',
        'Свойство overflow управляет тем, что происходит с содержимым, которое не помещается. Значения — visible, hidden, scroll, clip и auto. visible — значение по умолчанию, и содержимое вываливается за пределы бокса. hidden обрезает его и, что важнее, превращает элемент в прокручиваемый контейнер, так что содержимое можно прокрутить скриптом, хотя пользователь полосы прокрутки не увидит.\n\nУ сокращённого overflow есть одна ловушка, в которую попадает каждый. Если по одной оси стоит visible, а по другой нет, значение visible вычисляется как auto. Поэтому overflow-x: hidden, поставленный ради остановки горизонтальной полосы, делает overflow-y равным auto, и элемент тихо получает вертикальную полосу прокрутки или перехватывает колесо мыши. Когда нужно просто обрезать без прокручиваемого контейнера, используйте overflow: clip.\n\nКонтекст наложения — это группа элементов, которую рисуют как единое целое, и z-index внутри неё имеет смысл только по отношению к соседям внутри неё же. Создают контекст наложения многие свойства: корневой элемент, position fixed и sticky, позиционированный элемент с z-index, отличным от auto, элемент с opacity меньше 1 и любой элемент с transform, filter, backdrop-filter, perspective, will-change, isolation: isolate, mix-blend-mode, отличным от normal, либо contain со значением layout, paint, strict или content.\n\nВнутри контекста наложения порядок отрисовки фиксирован. Сначала рисуются элементы с отрицательным z-index, затем блочные боксы в потоке, затем плавающие элементы, затем строчное содержимое, затем позиционированные элементы с z-index: 0 или auto и в конце элементы с положительным z-index. Знание этого порядка отличает починку слоёв от подбора z-index до исчезновения симптома.'
      ),
      bullets: [
        L('overflow: hidden clips the content and creates a scroll container.', 'overflow: hidden обрезает содержимое и создаёт прокручиваемый контейнер.'),
        L('overflow: clip clips without creating a scroll container.', 'overflow: clip обрезает, не создавая прокручиваемого контейнера.'),
        L('A visible axis computes to auto when the other axis is not visible.', 'Видимая ось вычисляется как auto, когда другая не visible.'),
        L('transform, filter, opacity and z-index all create stacking contexts.', 'transform, filter, opacity и z-index создают контексты наложения.'),
        L('z-index inside a stacking context only compares siblings within it.', 'z-index внутри контекста наложения сравнивает только соседей внутри него.'),
        L('The painting order inside a context is fixed and predictable.', 'Порядок отрисовки внутри контекста фиксирован и предсказуем.'),
      ],
      code: `.panel {
  overflow: hidden;    /* clips the content and creates a scroll container */
}

.gallery {
  overflow-x: hidden;  /* overflow-y computes to auto, watch out */
}

.stage {
  overflow: clip;      /* clips without a scroll container */
}

.badge {
  position: relative;
  z-index: 1;          /* only orders inside the same stacking context */
}`,
      table: {
        caption: L('What creates a stacking context', 'Что создаёт контекст наложения'),
        headers: [L('Property', 'Свойство'), L('Creates a context when', 'Создаёт контекст, когда')],
        rows: [
          [L('The root element', 'Корневой элемент'), L('always', 'всегда')],
          [L('position', 'position'), L('it is fixed or sticky', 'значение fixed или sticky')],
          [L('position with z-index', 'position и z-index'), L('the element is positioned and z-index is not auto', 'элемент позиционирован и z-index не auto')],
          [L('opacity', 'opacity'), L('the value is below 1', 'значение меньше 1')],
          [L('transform, filter, backdrop-filter, perspective', 'transform, filter, backdrop-filter, perspective'), L('always', 'всегда')],
          [L('isolation', 'isolation'), L('the value is isolate', 'значение isolate')],
          [L('mix-blend-mode', 'mix-blend-mode'), L('the value is not normal', 'значение не normal')],
          [L('contain', 'contain'), L('the value is layout, paint, strict or content', 'значение layout, paint, strict или content')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The horizontal scrollbar that was supposed to disappear', 'Горизонтальная полоса, которая должна была исчезнуть'),
          text: L(
            'overflow-x: hidden on a wrapper does not only hide the horizontal overflow. It forces overflow-y to auto, and the element becomes scrollable vertically, which cuts off the mouse wheel and hides content nobody can reach.',
            'overflow-x: hidden на обёртке убирает не только горизонтальное переполнение. Он переводит overflow-y в auto, и элемент становится прокручиваемым по вертикали: колесо мыши пропадает, а контент становится недоступен.'
          ),
        },
      ],
      takeaway: L(
        'Use overflow clip to cut content without a scroll container, and remember that transform and opacity create stacking contexts.',
        'Используйте overflow clip, чтобы обрезать контент без прокручиваемого контейнера, и помните, что transform и opacity создают контексты наложения.'
      ),
      seeAlso: [
        L('Section 4-4: positioning schemes', 'Секция 4-4: схемы позиционирования'),
        L('Chapter 8: responsive design, animation and rendering cost', 'Глава 8: адаптивность, анимация и стоимость отрисовки'),
      ],
    },
  ],
};
