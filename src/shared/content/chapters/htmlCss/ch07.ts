import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh07: Chapter = {
  id: 'htmlcss-ch7',
  title: L('Grid', 'Грид'),
  summary: L(
    'How a grid container defines its tracks, how items are placed into them by line number or by name, how areas describe a layout, and how auto-fit with minmax builds responsive grids.',
    'Как грид-контейнер задаёт дорожки, как элементы попадают в них по номеру линии или по имени, как области описывают раскладку и как auto-fit с minmax строит адаптивные сетки.'
  ),
  sections: [
    {
      id: 'htmlcss-ch7-s1',
      title: L('The grid container and its tracks', 'Грид-контейнер и его дорожки'),
      body: L(
        'display: grid makes an element a grid container. What separates grid from flexbox is that the container defines the tracks before the items arrive: grid-template-columns and grid-template-rows describe the columns and the rows, and every item is then placed into the cells of that matrix. The container knows the geometry first, so the layout does not depend on how much text an item contains.\n\nLines are numbered from 1, and they count along the inline axis for the columns and along the block axis for the rows. The number of lines is one more than the number of tracks, so three columns produce four vertical lines, and -1 refers to the last line, which is how you say span to the end without counting.\n\nTracks that you did not declare are created implicitly, and their size comes from grid-auto-rows and grid-auto-columns, which default to auto. That is why a long list in a grid container grows the rows to fit the content, and why an explicit grid-auto-rows with a fixed value and a minmax is often needed to keep a long list from becoming enormous.',
        'display: grid делает элемент грид-контейнером. Грид отличается от флексбокса тем, что контейнер задаёт дорожки раньше, чем приходят элементы: grid-template-columns и grid-template-rows описывают колонки и строки, и каждый элемент потом попадает в ячейку этой матрицы. Контейнер знает геометрию первым, поэтому раскладка не зависит от того, сколько текста в элементе.\n\nЛинии нумеруются с единицы: колонки считаются по строчной оси, строки — по блочной. Линий на одну больше, чем дорожек, поэтому три колонки дают четыре вертикальные линии, а -1 означает последнюю линию — так говорят «протянуть до конца», не считая вручную.\n\nДорожки, которые не объявили, создаются неявно, и их размер задают grid-auto-rows и grid-auto-columns, по умолчанию равные auto. Поэтому длинный список в грид-контейнере растягивает строки под содержимое, и часто нужен явный grid-auto-rows с фиксированным значением и minmax, чтобы длинный список не вырос чудовищным.'
      ),
      bullets: [
        L('display: grid makes a container whose tracks exist before the items.', 'display: grid делает контейнер, у которого дорожки есть до элементов.'),
        L('grid-template-columns and grid-template-rows define the explicit tracks.', 'grid-template-columns и grid-template-rows задают явные дорожки.'),
        L('There is one more line than tracks, and -1 is the last line.', 'Линий на одну больше, чем дорожек, а -1 — последняя линия.'),
        L('Undeclared tracks are implicit and sized by grid-auto-rows.', 'Необъявленные дорожки неявные, их размер задаёт grid-auto-rows.'),
        L('Grid places items into a known matrix, so content cannot break the layout.', 'Грид раскладывает элементы по известной матрице, содержимое не ломает раскладку.'),
      ],
      code: `.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  gap: 24px;
}

/* lines are numbered from 1 */
.layout__header {
  grid-column: 1 / -1;
  grid-row: 1;
}

/* implicit rows get their size from grid-auto-rows */
.layout__list {
  display: grid;
  grid-auto-rows: minmax(48px, auto);
}`,
      table: {
        caption: L('Explicit and implicit tracks', 'Явные и неявные дорожки'),
        headers: [L('Concept', 'Понятие'), L('Defined by', 'Задаётся'), L('Sized by', 'Размер задаёт')],
        rows: [
          [L('Explicit column', 'Явная колонка'), L('grid-template-columns', 'grid-template-columns'), L('The track sizing function', 'Функция размера дорожки')],
          [L('Explicit row', 'Явная строка'), L('grid-template-rows', 'grid-template-rows'), L('The track sizing function', 'Функция размера дорожки')],
          [L('Implicit column', 'Неявная колонка'), L('Automatic placement', 'Авторазмещение'), L('grid-auto-columns', 'grid-auto-columns')],
          [L('Implicit row', 'Неявная строка'), L('Automatic placement', 'Авторазмещение'), L('grid-auto-rows', 'grid-auto-rows')],
        ],
      },
      callouts: [
        {
          tone: 'note',
          title: L('A grid container does not need a height', 'Грид-контейнеру не нужна высота'),
          text: L(
            'A grid container sizes its rows to the content unless you give it a definite height, and a row declared as 1fr only distributes the free space when the container has a definite height to distribute. Use min-height instead of height so the container can still grow.',
            'Грид-контейнер задаёт высоту строк по содержимому, если ему не задали определённую высоту, а строка 1fr получает свободное место только при определённой высоте контейнера. Пользуйтесь min-height вместо height, чтобы контейнер ещё мог расти.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('fr needs a definite size to divide', 'fr нужен определённый размер, чтобы делить'),
          text: L(
            'A row declared as 1fr only takes the leftover space when the container height is definite or the row is stretched by the grid algorithm. In a container with an automatic height, fr rows fall back to the size of their content.',
            'Строка 1fr получает свободное место только при определённой высоте контейнера или когда её растягивает алгоритм грида. У контейнера с авто-высотой fr-строки сводятся к размеру содержимого.'
          ),
        },
      ],
      takeaway: L(
        'Grid defines the matrix first, and the items fill the cells of that matrix.',
        'Грид сначала задаёт матрицу, а элементы заполняют её ячейки.'
      ),
      seeAlso: [
        L('Section 7-2: repeat, minmax and fr', 'Секция 7-2: repeat, minmax и fr'),
        L('Section 6-1: the flex container and its two axes', 'Секция 6-1: флекс-контейнер и его две оси'),
      ],
    },
    {
      id: 'htmlcss-ch7-s2',
      title: L('repeat, minmax and fr', 'repeat, minmax и fr'),
      body: L(
        'The track sizing functions are the vocabulary of grid. A plain length sets a fixed track. The fr unit divides the free space between the tracks, so 1fr 2fr means one part against two, and fr stands for the fractional part rather than a fixed length. repeat() removes the repetition: repeat(3, 1fr) is exactly the same as 1fr 1fr 1fr.\n\nminmax(min, max) describes a track that may grow but never gets smaller than its minimum. That is the standard protection against overflow: repeat(auto-fit, minmax(240px, 1fr)) creates as many columns as fit, each at least 240 pixels wide, so a card with a long word cannot squeeze the column into unreadability. The keywords min-content and max-content describe a track by the size its content wants.\n\nThe tracks are sized after the free space is known, and the algorithm has an order: first the fixed and the flexible tracks take what they need, then the remainder is distributed to the fr tracks. This is why minmax(0, 1fr) behaves differently from 1fr: the first gives the track a hard floor of zero and lets it shrink below its content, the second keeps an automatic minimum equal to the content.',
        'Функции размеров дорожек — словарь грида. Обычная длина задаёт фиксированную дорожку. Единица fr делит свободное место между дорожками, поэтому 1fr 2fr означает одна часть против двух, а fr означает долю, а не фиксированную длину. repeat() убирает повторы: repeat(3, 1fr) — это ровно то же, что 1fr 1fr 1fr.\n\nminmax(min, max) описывает дорожку, которая может расти, но никогда не меньше своего минимума. Это стандартная защита от переполнения: repeat(auto-fit, minmax(240px, 1fr)) создаёт столько колонок, сколько помещается, каждая не уже 240 пикселей, поэтому карточка с длинным словом не сожмёт колонку до нечитаемой. Ключевые слова min-content и max-content описывают дорожку по размеру, который нужен её содержимому.\n\nДорожки вычисляются, когда свободное место уже известно, и алгоритм идёт в определённом порядке: сначала фиксированные и гибкие дорожки берут, сколько нужно, потом остаток делится между fr-дорожками. Поэтому minmax(0, 1fr) ведёт себя иначе, чем 1fr: первая даёт дорожке жёсткий пол в ноль и позволяет ей сжиматься ниже содержимого, вторая сохраняет автоматический минимум, равный содержимому.'
      ),
      bullets: [
        L('fr divides the free space between the tracks.', 'fr делит свободное место между дорожками.'),
        L('repeat() is a shorthand for a repeated track list.', 'repeat() — сокращение для повторяющегося списка дорожек.'),
        L('minmax(min, max) sets a floor and a ceiling for a track.', 'minmax(min, max) задаёт полу и потолок дорожки.'),
        L('min-content and max-content size a track by its content.', 'min-content и max-content задают размер дорожки по содержимому.'),
        L('minmax(0, 1fr) lets a track shrink below its content, 1fr does not.', 'minmax(0, 1fr) позволяет сжаться ниже содержимого, 1fr — нет.'),
      ],
      code: `/* three equal columns */
.columns-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* a fixed sidebar and the rest */
.columns-sidebar {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

/* as many columns as fit, never narrower than 240px */
.columns-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}`,
      table: {
        caption: L('Track sizing functions', 'Функции размеров дорожек'),
        headers: [L('Function', 'Функция'), L('Meaning', 'Смысл'), L('Use it for', 'Для чего')],
        rows: [
          [L('120px', '120px'), L('A fixed track', 'Фиксированная дорожка'), L('Columns with a known width', 'Колонки известной ширины')],
          [L('1fr', '1fr'), L('A share of the free space', 'Доля свободного места'), L('Equal columns', 'Равные колонки')],
          [L('minmax(200px, 1fr)', 'minmax(200px, 1fr)'), L('Grow, but never below 200px', 'Растёт, но не ниже 200px'), L('Fluid columns with a floor', 'Текучие колонки с полом')],
          [L('auto', 'auto'), L('The size the content wants', 'Размер, который нужен содержимому'), L('Implicit tracks', 'Неявные дорожки')],
          [L('min-content', 'min-content'), L('The narrowest possible size', 'Наименьший возможный размер'), L('Preventing overflow', 'Предотвращение переполнения')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('1fr is not the same as minmax(0, 1fr)', '1fr — это не то же, что minmax(0, 1fr)'),
          text: L(
            'The shorthand 1fr is really minmax(auto, 1fr), and the automatic minimum is the size of the content. A column holding a long word therefore refuses to shrink and pushes the grid wider than the viewport. Write minmax(0, 1fr) when the column must be allowed to shrink.',
            'Сокращение 1fr — это на самом деле minmax(auto, 1fr), и автоматический минимум равен размеру содержимого. Поэтому колонка с длинным словом отказывается сжиматься и выталкивает грид за пределы вьюпорта. Пишите minmax(0, 1fr), когда колонке нужно уметь сжиматься.'
          ),
        },
        {
          tone: 'tip',
          title: L('Name the floor', 'Называйте пол явно'),
          text: L(
            'minmax() makes the intent explicit: the minimum is a hard floor that the layout never crosses, and the maximum is how much the track may take. Reading a grid definition with minmax is much easier than reading bare fr values.',
            'minmax() делает намерение явным: минимум — жёсткий пол, который раскладка не пересекает, а максимум — сколько дорожка может взять. Читать определение грида с minmax гораздо проще, чем голые значения fr.'
          ),
        },
      ],
      takeaway: L(
        'Use fr for shares, minmax for floors and ceilings, and 0 as the floor when the content must be allowed to shrink.',
        'Используйте fr для долей, minmax для пола и потолка, а 0 как пол, когда содержимому нужно позволить сжаться.'
      ),
      seeAlso: [
        L('Section 7-5: auto-fit, auto-fill and responsive grids', 'Секция 7-5: auto-fit, auto-fill и адаптивные гриды'),
        L('Section 7-6: subgrid and alignment across grids', 'Секция 7-6: subgrid и выравнивание между гридами'),
      ],
    },
    {
      id: 'htmlcss-ch7-s3',
      title: L('Placing items and named lines', 'Размещение элементов и именованные линии'),
      body: L(
        'Items are placed automatically, row by row, in the order they appear in the DOM, and grid-auto-flow: column switches the direction of that flow. When you want a specific position, you name the lines yourself: grid-column: 2 / 4 puts the item between the second and the fourth line, so it spans two columns. The value before the slash is the start line and the value after it is the end line.\n\nNegative numbers count from the end, so -1 is the last line and -2 the one before it, which is how you say from here to the end without knowing how many columns there are. The shorthand grid-area takes the four lines in one declaration as row-start / column-start / row-end / column-end, and grid-column and grid-row are the two-value shorthands for it.\n\nLines can also carry names, and that is where grids become readable. Declare the lines with square brackets in the template, give the item the name instead of the number, and the layout no longer depends on counting. The bracket names are arbitrary, but keeping the -start and -end convention pays off as soon as the template grows.',
        'Элементы размещаются автоматически, строка за строкой, в порядке появления в DOM, а grid-auto-flow: column меняет направление этого потока. Когда нужна конкретная позиция, линии называют сами: grid-column: 2 / 4 ставит элемент между второй и четвёртой линией, то есть он занимает две колонки. Значение до косой черты — начальная линия, после — конечная.\n\nОтрицательные числа считают с конца, поэтому -1 — последняя линия, а -2 — предпоследняя, и так говорят «отсюда до конца», не зная, сколько колонок. Сокращение grid-area задаёт четыре линии одним объявлением в порядке row-start / column-start / row-end / column-end, а grid-column и grid-row — сокращения для двух значений.\n\nУ линий могут быть имена, и именно тут грид становится читаемым. Объявите линии в квадратных скобках в шаблоне, дайте элементу имя вместо номера, и раскладка перестаёт зависеть от счёта. Имена в скобках произвольны, но соглашение с -start и -end окупается, как только шаблон разрастается.'
      ),
      bullets: [
        L('Items are auto-placed in DOM order unless you place them.', 'Элементы раскладываются автоматически в порядке DOM, если не размечены явно.'),
        L('grid-column: 2 / 4 spans from the second to the fourth line.', 'grid-column: 2 / 4 занимает от второй до четвёртой линии.'),
        L('Negative line numbers count from the end of the grid.', 'Отрицательные номера линий считают с конца грида.'),
        L('grid-area takes the four lines in one declaration.', 'grid-area задаёт четыре линии одним объявлением.'),
        L('Named lines make the placement independent of counting.', 'Именованные линии делают размещение независимым от счёта.'),
        L('grid-auto-flow: column changes the direction of auto-placement.', 'grid-auto-flow: column меняет направление авторазмещения.'),
      ],
      code: `.layout {
  display: grid;
  grid-template-columns:
    [full-start] minmax(0, 1fr)
    [content-start] minmax(0, 60ch)
    [content-end] minmax(0, 1fr)
    [full-end];
  grid-template-rows: auto 1fr;
}

.layout__header {
  grid-column: full-start / full-end;
}

.layout__main {
  grid-column: content-start / content-end;
  grid-row: 2;
}`,
      table: {
        caption: L('Ways to place an item', 'Способы разместить элемент'),
        headers: [L('Property', 'Свойство'), L('Value', 'Значение'), L('Result', 'Результат')],
        rows: [
          [L('grid-column', 'grid-column'), L('2 / 4', '2 / 4'), L('Spans two columns', 'Занимает две колонки')],
          [L('grid-column', 'grid-column'), L('1 / -1', '1 / -1'), L('Spans the full width', 'Занимает всю ширину')],
          [L('grid-area', 'grid-area'), L('header', 'header'), L('Placed in the named region', 'Помещается в именованную область')],
          [L('grid-row', 'grid-row'), L('2', '2'), L('Placed in the second row', 'Помещается во вторую строку')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Placing by number breaks when the template changes', 'Размещение по номеру ломается при смене шаблона'),
          text: L(
            'grid-column: 2 / 4 is precise and fragile: insert one column and the item lands in the wrong place, silently. Named lines survive the change, and they also carry the meaning of the rule, so the stylesheet explains itself.',
            'grid-column: 2 / 4 точен и хрупок: вставьте одну колонку, и элемент окажется не там, молча. Именованные линии переживают изменение и заодно несут смысл правила, поэтому таблица стилей объясняет себя сама.'
          ),
        },
        {
          tone: 'note',
          title: L('Automatic placement follows the DOM', 'Авторазмещение следует DOM'),
          text: L(
            'Auto-placement follows the DOM, not the visual order. If you want a different visual order, change the source order or place the items explicitly; do not rely on the placement to reorder what the keyboard reads.',
            'Авторазмещение следует DOM, а не визуальному порядку. Если нужен другой визуальный порядок, меняйте порядок в исходнике или размещайте элементы явно; не рассчитывайте, что размещение переставит то, что читает клавиатура.'
          ),
        },
      ],
      takeaway: L(
        'Place items by named lines when the template may change, and by number only when it cannot.',
        'Размещайте элементы по именованным линиям, если шаблон может меняться, и по номерам — только если он не меняется.'
      ),
      seeAlso: [
        L('Section 7-4: areas and templates', 'Секция 7-4: области и шаблоны'),
        L('Section 3-2: keyboard navigation and focus order', 'Секция 3-2: навигация с клавиатуры и порядок фокуса'),
      ],
    },
    {
      id: 'htmlcss-ch7-s4',
      title: L('Areas and templates', 'Области и шаблоны'),
      body: L(
        'grid-template-areas describes the layout as a picture. Each string is a row, each word is a cell, and the dots mark empty cells: grid-template-areas: "header header" "sidebar main" "footer footer". The item is then assigned to a region by name with grid-area: header, and the template and the assignment use the same vocabulary.\n\nThe names have to match exactly, and an item placed in a region that does not exist in the template is simply not placed, which is a silent failure. The keyword none inside the template removes a region, and regions that are not rectangular are not allowed: a region must be a rectangle, so a sidebar that starts on the second row cannot stretch back to the first.\n\nThe real advantage appears when the layout changes. A media query can redefine the areas for a narrow screen, and every item moves to its new region without a single selector being rewritten, because the items never referred to a line number. The same trick works for a print stylesheet or for a dark sidebar variant.',
        'grid-template-areas описывает раскладку как картинку. Каждая строка — это ряд, каждое слово — ячейка, а точки отмечают пустые ячейки: grid-template-areas: "header header" "sidebar main" "footer footer". Элемент затем закрепляется за областью по имени через grid-area: header, и шаблон с размещением говорят на одном языке.\n\nИмена должны совпадать точно, а элемент, попавший в область, которой нет в шаблоне, просто не размещается, и это молчаливая ошибка. Ключевое слово none внутри шаблона убирает область, а области неправильной формы запрещены: область должна быть прямоугольником, поэтому боковая колонка, начинающаяся со второго ряда, не может вытянуться вверх до первого.\n\nНастоящее преимущество проявляется, когда раскладка меняется. Медиазапрос может переопределить области для узкого экрана, и каждый элемент переедет в свою новую область, и ни один селектор при этом не переписывается, потому что элементы никогда не ссылались на номера линий. Тот же приём работает для стилей печати или для варианта с тёмной боковой колонкой.'
      ),
      bullets: [
        L('grid-template-areas draws the layout as a grid of names.', 'grid-template-areas рисует раскладку как сетку имён.'),
        L('A dot marks an empty cell in the template.', 'Точка отмечает пустую ячейку в шаблоне.'),
        L('grid-area: name assigns an item to a region.', 'grid-area: name закрепляет элемент за областью.'),
        L('Region names must match the template exactly.', 'Имена областей должны точно совпадать с шаблоном.'),
        L('A region must be a rectangle.', 'Область должна быть прямоугольником.'),
        L('Redefining the areas in a media query moves every item.', 'Переопределение областей в медиазапросе переносит все элементы.'),
      ],
      code: `.page {
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

@media (width < 60rem) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main" "footer";
  }
}`,
      table: {
        caption: L('Parts of an area template', 'Части шаблона областей'),
        headers: [L('Part', 'Часть'), L('Meaning', 'Смысл')],
        rows: [
          [L('header header', 'header header'), L('A row of two cells in the same region', 'Ряд из двух ячеек одной области')],
          [L('sidebar main', 'sidebar main'), L('Two regions side by side', 'Две области рядом')],
          [L('. .', '. .'), L('Two empty cells', 'Две пустые ячейки')],
          [L('none', 'none'), L('No region in this cell', 'Области в этой ячейке нет')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('A typo in an area name removes the item', 'Опечатка в имени области убирает элемент'),
          text: L(
            'If grid-area: sidebr matches no region, the item is not placed at all and the grid looks empty in that cell. There is no error message. The names are also case sensitive, and the region has to be a rectangle.',
            'Если grid-area: sidebr не совпадает ни с одной областью, элемент не размещается вовсе, и в ячейке выглядит пусто. Сообщения об ошибке не будет. Имена чувствительны к регистру, и область обязана быть прямоугольником.'
          ),
        },
        {
          tone: 'tip',
          title: L('Areas keep the markup and the layout in step', 'Области синхронизируют разметку и раскладку'),
          text: L(
            'Because the item names a region and not a line, the same markup can be rearranged for a narrow viewport or for print without touching a single selector. That is the cheapest responsive refactor CSS offers.',
            'Поскольку элемент называет область, а не линию, одну и ту же разметку можно перестроить для узкого экрана или для печати, не трогая ни одного селектора. Это самая дешёвая адаптивная перестройка, которую даёт CSS.'
          ),
        },
      ],
      takeaway: L(
        'Areas describe the layout, and redefining them moves the items without touching a single selector.',
        'Области описывают раскладку, а их переопределение переносит элементы без правки селекторов.'
      ),
      seeAlso: [
        L('Section 7-3: placing items and named lines', 'Секция 7-3: размещение элементов и именованные линии'),
        L('Section 8-1: media queries and container queries', 'Секция 8-1: медиазапросы и контейнерные запросы'),
      ],
    },
    {
      id: 'htmlcss-ch7-s5',
      title: L('auto-fit, auto-fill and responsive grids', 'auto-fit, auto-fill и адаптивные гриды'),
      body: L(
        'repeat(auto-fit, minmax(240px, 1fr)) is the standard recipe for a responsive card grid: it creates as many columns as fit in the available width, each at least 240 pixels, and shares the rest equally. The word that decides the behaviour is auto-fit. Its sibling auto-fill does the same counting but keeps the empty tracks, so the grid keeps the width it would have had with all the columns filled.\n\nThe difference is visible with one card. With auto-fit the single card stretches across the whole row, because the empty tracks collapse to zero. With auto-fill the three empty tracks stay, and the card keeps its 240 pixel column at the left. Most card grids want auto-fit; a gallery that must keep a fixed column width wants auto-fill.\n\nThere is a limit to the recipe. A grid cannot create fewer than one column, so at a viewport of 200 pixels you still get one column, and if the column has a minimum of 240 pixels it overflows. Combining the grid with a fluid track size, or with a media query that lowers the minimum, avoids the last few pixels of trouble.',
        'repeat(auto-fit, minmax(240px, 1fr)) — стандартный рецепт адаптивной сетки карточек: он создаёт столько колонок, сколько помещается в доступную ширину, каждая не уже 240 пикселей, а остаток делит поровну. Решающее слово здесь auto-fit. Его собрат auto-fill считает так же, но сохраняет пустые дорожки, поэтому грид удерживает ту ширину, которая была бы при полностью заполненных колонках.\n\nРазница заметна с одной карточкой. С auto-fit единственная карточка растягивается на всю строку, потому что пустые дорожки схлопываются в ноль. С auto-fill три пустые дорожки остаются, и карточка сохраняет колонку в 240 пикселей слева. Большинству сеток карточек нужен auto-fit, а галерее с фиксированной шириной колонки — auto-fill.\n\nУ рецепта есть предел. Грид не может создать меньше одной колонки, поэтому при вьюпорте в 200 пикселей всё равно получится одна колонка, а если у неё минимум 240 пикселей, будет переполнение. Сочетание грида с текучим размером дорожки или с медиазапросом, который снижает минимум, снимает эту последнюю проблему.'
      ),
      bullets: [
        L('auto-fit creates as many tracks as fit and collapses the empty ones.', 'auto-fit создаёт нужное число дорожек и схлопывает пустые.'),
        L('auto-fill keeps the empty tracks, so the grid keeps its width.', 'auto-fill сохраняет пустые дорожки, и грид удерживает ширину.'),
        L('minmax sets the floor that stops a column from becoming unreadable.', 'minmax задаёт пол, который не даёт колонке стать нечитаемой.'),
        L('A grid always creates at least one column.', 'Грид всегда создаёт хотя бы одну колонку.'),
        L('Combine the recipe with a media query for very narrow screens.', 'Сочетайте рецепт с медиазапросом для очень узких экранов.'),
      ],
      code: `/* one card fills the whole row, empty tracks collapse */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

/* the column width is kept even with one card */
.gallery--fixed {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

/* very narrow screens get a smaller floor */
@media (width < 30rem) {
  .gallery {
    grid-template-columns: 1fr;
  }
}`,
      table: {
        caption: L('auto-fit against auto-fill', 'auto-fit против auto-fill'),
        headers: [L('Case', 'Случай'), L('auto-fit', 'auto-fit'), L('auto-fill', 'auto-fill')],
        rows: [
          [L('Three cards on a wide screen', 'Три карточки на широком экране'), L('Three equal columns', 'Три равные колонки'), L('Three equal columns', 'Три равные колонки')],
          [L('One card on a wide screen', 'Одна карточка на широком экране'), L('The card fills the row', 'Карточка занимает строку'), L('The card keeps one column width', 'Карточка сохраняет ширину колонки')],
          [L('The empty space', 'Пустое место'), L('Removed', 'Убрано'), L('Kept as empty tracks', 'Осталось пустыми дорожками')],
          [L('Best for', 'Лучше всего для'), L('Card grids and galleries', 'Сеток карточек и галерей'), L('Fixed width columns', 'Колонок фиксированной ширины')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('auto-fill is not a fallback', 'auto-fill — не запасной вариант'),
          text: L(
            'Choosing between auto-fit and auto-fill is a design decision, not a robustness measure. A grid of cards where a single card must stretch needs auto-fit, and a grid of columns where every column must keep the same width needs auto-fill.',
            'Выбор между auto-fit и auto-fill — решение о дизайне, а не мера надёжности. Сетке карточек, где единственная карточка должна растянуться, нужен auto-fit, а сетке колонок, где ширина каждой колонки обязана сохраниться, нужен auto-fill.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('The minimum wins over the viewport', 'Минимум побеждает вьюпорт'),
          text: L(
            'minmax(240px, 1fr) guarantees 240 pixels, so on a 200 pixel viewport the grid overflows instead of shrinking. Add a media query or use a fluid minimum such as min(240px, 100%).',
            'minmax(240px, 1fr) гарантирует 240 пикселей, поэтому при вьюпорте в 200 пикселей грид переполнится, а не сожмётся. Добавьте медиазапрос или используйте текучий минимум вида min(240px, 100%).'
          ),
        },
      ],
      takeaway: L(
        'auto-fit collapses the empty tracks, auto-fill keeps them, and the choice is a design decision.',
        'auto-fit схлопывает пустые дорожки, auto-fill сохраняет, и выбор — это решение о дизайне.'
      ),
      seeAlso: [
        L('Section 7-2: repeat, minmax and fr', 'Секция 7-2: repeat, minmax и fr'),
        L('Section 8-2: fluid sizing with clamp and min', 'Секция 8-2: текучие размеры через clamp и min'),
      ],
    },
    {
      id: 'htmlcss-ch7-s6',
      title: L('Subgrid and alignment across grids', 'Subgrid и выравнивание между гридами'),
      body: L(
        'subgrid lets a nested grid adopt the tracks of its parent instead of defining its own. The child declares grid-template-columns: subgrid and inherits the column tracks of the parent grid, so the inner cells line up with the outer ones. It is the answer to a problem that used to be solved with fixed heights and negative margins: making the content of one cell align with the content of another.\n\nRows can be subgridded too, which is what makes the trick useful for cards: the card header, the body and the footer all share the row heights of the parent grid, so three cards of different text height still line up along their internal borders. The rules are strict: the parent must be a grid, the subgrid must be a direct child of it, and the spans have to match the parent tracks.\n\nAlignment between the two levels is done with the normal alignment properties, justify-self and align-self on the items and justify-items and align-items on the container. What subgrid adds is the shared geometry, not new alignment values. Where subgrid is unavailable, the fallback is to align the content manually or to accept a small mismatch, so it is worth treating it as an enhancement.',
        'subgrid позволяет вложенному гриду взять дорожки родителя вместо собственных. Ребёнок объявляет grid-template-columns: subgrid и наследует колонки родительского грида, поэтому внутренние ячейки совпадают с внешними. Это ответ на задачу, которую раньше решали фиксированными высотами и отрицательными margin: выровнять содержимое одной ячейки по содержимому другой.\n\nСтроки тоже можно отдать в подчинение родителю, и именно это делает приём полезным для карточек: заголовок, тело и подвал карточки делят высоты строк родительского грида, поэтому три карточки с разным объёмом текста всё равно выравниваются по внутренним границам. Правила строгие: родитель должен быть гридом, subgrid — прямым его ребёнком, а охватываемые дорожки должны совпадать с родительскими.\n\nВыравнивание между двумя уровнями делают обычные свойства: justify-self и align-self на элементах, justify-items и align-items на контейнере. subgrid добавляет общую геометрию, а не новые значения выравнивания. Там, где subgrid недоступен, запасной вариант — выровнять содержимое вручную или смириться с небольшим расхождением, поэтому к нему стоит относиться как к улучшению.'
      ),
      bullets: [
        L('subgrid makes a child grid reuse the tracks of its parent.', 'subgrid заставляет дочерний грид использовать дорожки родителя.'),
        L('It aligns the content of different cells without fixed heights.', 'Он выравнивает содержимое разных ячеек без фиксированных высот.'),
        L('The parent must be a grid and the subgrid must be a direct child.', 'Родитель должен быть гридом, а subgrid — прямым ребёнком.'),
        L('Alignment still uses justify-items, align-items and the self properties.', 'Выравнивание по-прежнему делают justify-items, align-items и свойства self.'),
        L('subgrid is an enhancement, the layout must work without it.', 'subgrid — улучшение, раскладка должна работать и без него.'),
      ],
      code: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;   /* share the row heights of .cards */
  grid-row: span 3;
}

.card__title { grid-row: 1; }
.card__body { grid-row: 2; }
.card__footer { grid-row: 3; }`,
      table: {
        caption: L('What subgrid changes', 'Что меняет subgrid'),
        headers: [L('Aspect', 'Аспект'), L('Without subgrid', 'Без subgrid'), L('With subgrid', 'С subgrid')],
        rows: [
          [L('Card internals', 'Внутренности карточки'), L('Own heights, misaligned borders', 'Свои высоты, разъезжающиеся границы'), L('Shared row heights, aligned borders', 'Общие высоты строк, ровные границы')],
          [L('CSS needed', 'Нужен CSS'), L('Fixed heights or a measurement script', 'Фиксированные высоты или скрипт измерения'), L('One declaration on the child', 'Одно объявление на ребёнке')],
          [L('Row subgrid', 'Subgrid по строкам'), L('Needs a hack', 'Нужен хак'), L('Supported in current browsers', 'Поддерживается в современных браузерах')],
          [L('Fallback', 'Запасной вариант'), L('Align by eye', 'Выравнивать на глаз'), L('Same layout with a small mismatch', 'Та же раскладка с небольшим расхождением')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The parent must be a grid', 'Родитель должен быть гридом'),
          text: L(
            'grid-template-rows: subgrid on a child of a flex container or of a plain block does nothing at all, and the child keeps its own rows. The rule is not a fallback, it is a no-op, so check the parent before debugging the child.',
            'grid-template-rows: subgrid у ребёнка flex-контейнера или обычного блока не делает вообще ничего, и ребёнок сохраняет свои строки. Это не запасной вариант, а пустая операция, поэтому проверяйте родителя, а не ребёнка.'
          ),
        },
        {
          tone: 'tip',
          title: L('subgrid replaces the height hack', 'subgrid заменяет хак с высотами'),
          text: L(
            'A page that used a JavaScript measurement pass to line up card sections can delete that pass entirely: the shared rows give the alignment for free and stay correct when the content changes.',
            'Страница, которая измеряла высоты скриптом, чтобы выровнять секции карточек, может удалить этот код целиком: общие строки дают выравнивание бесплатно и остаются верными, когда содержимое меняется.'
          ),
        },
      ],
      takeaway: L(
        'subgrid shares the parent tracks, and that removes the fixed-height hack.',
        'subgrid делит дорожки с родителем, и это убирает хак с фиксированными высотами.'
      ),
      seeAlso: [
        L('Section 7-4: areas and templates', 'Секция 7-4: области и шаблоны'),
        L('Section 8-5: will-change, content-visibility and render cost', 'Секция 8-5: will-change, content-visibility и цена рендеринга'),
      ],
    },
  ],
};
