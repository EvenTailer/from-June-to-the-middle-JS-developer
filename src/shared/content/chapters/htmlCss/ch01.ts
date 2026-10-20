import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh01: Chapter = {
  id: 'htmlcss-ch1',
  title: L('Semantic markup and document structure', 'Семантическая разметка и структура документа'),
  summary: L(
    'Why the element you choose is an API call to the browser, how landmarks and headings shape a document that assistive technology can navigate, which list and table semantics carry real meaning, and what the metadata in the head is for.',
    'Почему выбор элемента — это вызов API браузера, как лендмарки и заголовки формируют документ, доступный для вспомогательных технологий, какую смысловую нагрузку несут списки и таблицы и для чего нужны метаданные в head.'
  ),
  sections: [
    {
      id: 'htmlcss-ch1-s1',
      title: L('Why semantics come first', 'Почему начинают с семантики'),
      body: L(
        'Choosing an element is an API call to the browser, not a styling decision. A button arrives with keyboard activation, a place in the tab order, a disabled state, participation in form submission and a slot in the accessibility tree, all of it implemented by the browser vendor. A div with a click handler arrives with none of it, so every one of those behaviours has to be rebuilt by hand, and every rebuild is a chance to get one of them subtly wrong.\n\nThe browser turns the DOM into a platform accessibility tree, and it derives roles and names from the elements it finds, not from the class names it sees. A div with class "card" is a generic group with no role and no name. A section with an accessible name is a region that a screen reader can list and jump to. That tree is what assistive technology actually reads, which means it is built from semantics and completely ignores your visual design.\n\nHTML5 formalises the idea with content categories. Every element belongs to flow, phrasing, sectioning, embedded or interactive content, and the category decides which elements may be nested inside which and which may legally contain a control. The classification is what lets a parser, a validator and a screen reader agree on what the document means, and it is why a link cannot wrap a button.\n\nThe rule that survives every refactor is short: pick the element that names what the content is, and let classes describe how it should look. A paragraph is a p, a self-contained unit of content is an article, a set of navigation links is a nav, a control that triggers an action is a button. When no native element fits, add the role and the attributes it needs, but treat that as the fallback path rather than the starting point.',
        'Выбор элемента — это вызов API браузера, а не решение о стиле. Кнопка button приходит с активацией с клавиатуры, местом в порядке обхода, состоянием disabled, участием в отправке формы и слотом в дереве доступности, и всё это делает вендор браузера. Div с обработчиком click не приходит ни с чем из этого, поэтому каждое поведение приходится воспроизводить вручную, и каждое воспроизведение — шанс ошибиться в одной из деталей.\n\nБраузер превращает DOM в платформенное дерево доступности и берёт роли и имена из найденных элементов, а не из имён классов. Div с классом "card" — это безымянная группа без роли. Section с доступным именем — это регион, который скринридер умеет перечислить и перейти в него. Именно это дерево читают вспомогательные технологии, то есть оно строится из семантики и полностью игнорирует ваш визуальный дизайн.\n\nHTML5 формализует эту идею через категории содержимого. Каждый элемент принадлежит одной из категорий: flow, phrasing, sectioning, embedded или interactive content, и категория определяет, какие элементы могут вкладываться друг в друга и какой элемент может содержать управляющий. Именно благодаря этой классификации парсер, валидатор и скринридер сходятся во мнении о смысле документа, и именно поэтому ссылка не может содержать кнопку.\n\nПравило, которое переживает любой рефакторинг, короткое: берите элемент, который называет суть содержимого, а классы оставляйте для того, как оно должно выглядеть. Текст абзацем — это p, самостоятельный фрагмент контента — article, набор ссылок навигации — nav, элемент управления, вызывающий действие, — button. Когда нативного элемента нет, добавьте нужные role и атрибуты, но относитесь к этому как к запасному пути, а не как к отправной точке.'
      ),
      bullets: [
        L('An element choice is an API call to the browser, not a styling decision.', 'Выбор элемента — это вызов API браузера, а не решение о стиле.'),
        L('Native elements bring keyboard, focus, state and form behaviour for free.', 'Нативные элементы бесплатно дают клавиатуру, фокус, состояние и поведение в форме.'),
        L('The accessibility tree is built from elements, not from class names.', 'Дерево доступности строится по элементам, а не по именам классов.'),
        L('Content categories decide which elements may nest inside which.', 'Категории содержимого определяют, что во что может вкладываться.'),
        L('Reach for a div plus role only when no native element fits.', 'До div с role стоит опускаться, только если нативного элемента нет.'),
      ],
      code: `<!-- div soup: no role, no name, no behaviour -->
<div class="header">
  <div class="title">Blog</div>
</div>

<!-- semantic markup: the browser gets a role and a name -->
<header>
  <h1>Blog</h1>
</header>

<article>
  <h2>Shipping a design system</h2>
  <p>The card is a self-contained piece of content.</p>
</article>`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Class names do nothing for assistive technology', 'Имена классов ничего не значат для вспомогательных технологий'),
          text: L(
            'A class is a hook for CSS and nothing else. Naming a div "button" or "nav" changes no role and no accessible name, because the browser never reads class attributes when it builds the accessibility tree.',
            'Класс — это крючок для CSS и больше ничего. Имя класса "button" или "nav" не меняет ни роль, ни доступное имя: браузер не читает атрибут class при построении дерева доступности.'
          ),
        },
      ],
      takeaway: L(
        'Pick the element that names what the content is, and keep classes for looks only.',
        'Берите элемент, который называет суть содержимого, а классы оставьте для внешнего вида.'
      ),
      seeAlso: [
        L('Chapter 3: accessibility, the contract rather than the checklist', 'Глава 3: доступность как контракт, а не как чек-лист'),
        L('Section 1-2: landmarks and the document outline', 'Секция 1-2: лендмарки и структура документа'),
        L('Chapter 2: forms and native interactivity', 'Глава 2: формы и нативная интерактивность'),
      ],
    },
    {
      id: 'htmlcss-ch1-s2',
      title: L('Landmarks and the document outline', 'Лендмарки и структура документа'),
      body: L(
        'Landmarks are the regions a screen reader user jumps between, and a small set of elements defines them: header, nav, main, aside and footer. The main element matters most, because it marks the part of the document that is unique to the page. A page with two main elements, or with none, gives the user no reliable entry point and no way to skip the rest.\n\nThe mapping to platform roles is not one to one. A header that sits at the top of the body becomes the banner landmark, and a footer at the bottom becomes contentinfo, but the same elements nested inside an article stay generic and create no landmark at all. A nav element becomes a navigation landmark, and a page may have several of them, which is why distinct ones are given distinct names through aria-label so that a screen reader can tell them apart.\n\nEvery page should also offer a skip link as its first focusable element. It is a single anchor that jumps straight to the main content, it is invisible until it receives focus, and it saves a keyboard user from tabbing through the same navigation on every single page. The anchor needs a real target, which is why the main element carries an id.\n\nLandmarks also have to be reachable by keyboard, and that is where DOM order and visual order must agree. When CSS moves a navigation column into a sidebar, the keyboard still walks the document in source order. If the visual arrangement genuinely differs from the source, fix the source and let the layout adapt rather than reordering the document for the sake of a picture.',
        'Лендмарки — это области, между которыми перемещается пользователь скринридера, и задаёт их небольшой набор элементов: header, nav, main, aside и footer. Важнее всех main, потому что он помечает часть документа, уникальную для страницы. Страница с двумя main или вовсе без него не даёт пользователю надёжной точки входа и способа пропустить остальное.\n\nСоответствие платформенным ролям не взаимно однозначное. Header в начале body становится лендмарком banner, а footer в конце — contentinfo, но те же элементы внутри article остаются безымянными и не создают лендмарка вообще. Nav становится лендмарком navigation, и на странице их может быть несколько, поэтому разным лендмаркам дают разные имена через aria-label, чтобы скринридер различал их.\n\nНа каждой странице должен быть ещё и ссылка-переход как самый первый фокусируемый элемент. Это одна ссылка, которая сразу уводит к основному содержимому, невидимая до получения фокуса и экономящая пользователю клавиатуры обход одного и того же меню на каждой странице. Ссылке нужна настоящая цель, поэтому у элемента main есть id.\n\nЛендмарки должны быть доступны с клавиатуры, и здесь важно, чтобы порядок DOM совпадал с визуальным. Когда CSS переносит колонку навигации в боковую панель, клавиатура по-прежнему обходит документ в порядке исходника. Если визуальная раскладка действительно отличается от исходной, исправляйте исходник и подстраивайте вёрстку, а не переставляйте документ ради картинки.'
      ),
      bullets: [
        L('There must be exactly one main per page.', 'На странице должен быть ровно один main.'),
        L('A header or footer inside an article is not a landmark.', 'Header или footer внутри article не создаёт лендмарк.'),
        L('Several nav landmarks need distinct accessible names.', 'Несколько лендмарков navigation должны иметь разные доступные имена.'),
        L('The skip link is the first focusable element and needs a real target.', 'Ссылка-переход — первый фокусируемый элемент, и у неё должна быть настоящая цель.'),
        L('DOM order and visual order must agree, or the page gets a skip link.', 'Порядок DOM и визуальный порядок должны совпадать, иначе нужна ссылка-переход.'),
      ],
      code: `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>
    <nav aria-label="Primary">
      <a href="/catalog">Catalog</a>
      <a href="/pricing">Pricing</a>
    </nav>
  </header>

  <main id="main">
    <h1>Checkout</h1>
    <section>
      <h2>Payment</h2>
    </section>
  </main>

  <aside aria-label="Order summary">
    <p>Total: 42 EUR</p>
  </aside>

  <footer><p>2026</p></footer>
</body>`,
      table: {
        caption: L('Elements and the landmark roles they produce', 'Элементы и создаваемые ими роли лендмарков'),
        headers: [L('Element', 'Элемент'), L('Landmark role', 'Роль лендмарка'), L('Notes', 'Заметки')],
        rows: [
          [
            L('main', 'main'),
            L('main', 'main'),
            L('Exactly one per page', 'Ровно один на странице'),
          ],
          [
            L('nav', 'nav'),
            L('navigation', 'navigation'),
            L('May repeat, name each one', 'Может повторяться, каждому дайте имя'),
          ],
          [
            L('header at the top of body', 'header в начале body'),
            L('banner', 'banner'),
            L('Generic inside article or section', 'Безымянный внутри article или section'),
          ],
          [
            L('footer at the bottom of body', 'footer в конце body'),
            L('contentinfo', 'contentinfo'),
            L('Generic inside article or section', 'Безымянный внутри article или section'),
          ],
          [
            L('aside', 'aside'),
            L('complementary', 'complementary'),
            L('Give it a name if there are several', 'Дайте имя, если их несколько'),
          ],
        ],
      },
      takeaway: L(
        'One main per page, named landmarks, and a skip link as the first focusable element.',
        'Один main на странице, именованные лендмарки и ссылка-переход как первый фокусируемый элемент.'
      ),
      seeAlso: [
        L('Section 1-3: headings and the heading outline', 'Секция 1-3: заголовки и структура заголовков'),
        L('Section 3-2: keyboard navigation and focus order', 'Секция 3-2: навигация с клавиатуры и порядок фокуса'),
      ],
    },
    {
      id: 'htmlcss-ch1-s3',
      title: L('Headings and the heading outline', 'Заголовки и структура заголовков'),
      body: L(
        'Headings are the second way a document is navigated. A screen reader user can pull up a list of every heading on the page and jump straight to the section they need, but that list is built from the heading levels, not from the visual weight of the text. An h2 that looks like a title is still an h2, and an h4 that looks like a caption is still an h4 to everyone who does not read the screen.\n\nThe number on a heading expresses the depth of the section, nothing else. Level one is the page title, and each following level nests one step deeper. Levels should not be skipped, because a jump from h2 to h4 tells the screen reader that a level is missing and breaks the outline that the user navigates by. Choose the level from the document structure first and only then correct the size in CSS.\n\nThe most common mistake is treating the heading level as a font size. A design that wants a small bold line in the middle of a card produces an h4, and the page now announces a fourth-level heading in the middle of its content. The fix is to keep the heading level correct and control the appearance with a class or a custom property, so the visual design never influences the outline.\n\nA page normally has one h1 that names its subject, and sectioning content such as article and section is expected to carry its own heading. A document with two h1 elements is not invalid, but it makes the outline ambiguous, and assistive technology users lose the single most reliable entry point into the page.',
        'Заголовки — второй способ навигации по документу. Пользователь скринридера может вывести список всех заголовков страницы и перейти сразу к нужному разделу, но этот список строится по уровням заголовков, а не по визуальному весу текста. H2, который выглядит как заголовок, всё равно h2, а h4, похожий на подпись, останется h4 для всех, кто не читает экран.\n\nЧисло в заголовке выражает глубину раздела и ничего больше. Первый уровень — заголовок страницы, и каждый следующий вкладывается на шаг глубже. Уровни нельзя пропускать: переход от h2 к h4 говорит скринридеру, что уровень потерян, и ломает ту самую структуру, по которой пользователь ходит. Сначала выберите уровень по структуре документа и только потом поправьте размер средствами CSS.\n\nСамая частая ошибка — считать уровень заголовка размером шрифта. Дизайн, которому нужна мелкая жирная строчка посреди карточки, порождает h4, и страница теперь объявляет заголовок четвёртого уровня посреди контента. Правильное решение — оставить уровень корректным, а вид задать классом или пользовательским свойством, чтобы визуальный дизайн никогда не влиял на структуру.\n\nОбычно на странице один h1, который называет её тему, а секционное содержимое вроде article и section, как правило, несёт собственный заголовок. Документ с двумя h1 не invalid, но делает структуру неоднозначной, и пользователь вспомогательных технологий теряет самую надёжную точку входа в страницу.'
      ),
      bullets: [
        L('A heading level expresses nesting depth, never font size.', 'Уровень заголовка выражает глубину вложенности, а не размер шрифта.'),
        L('Do not skip levels: an h2 followed by an h4 breaks the outline.', 'Не пропускайте уровни: h2 сразу за h4 ломает структуру.'),
        L('Control the appearance with CSS, never by changing the tag.', 'Управляйте видом через CSS, а не сменой тега.'),
        L('One h1 per page is the convention that keeps the outline unambiguous.', 'Один h1 на странице — соглашение, которое делает структуру однозначной.'),
      ],
      code: `<h1>Account settings</h1>

<section>
  <h2>Profile</h2>
  <p>Name, photo and the public profile text.</p>

  <section>
    <h3>Email addresses</h3>
    <p>Where the notifications are sent.</p>
  </section>
</section>

<!-- levels express nesting, appearance comes from CSS -->
<h2 class="minor-heading">Related articles</h2>`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Styling a heading into a paragraph', 'Заголовок, превращённый в абзац'),
          text: L(
            'Replacing a heading with a styled div because the default size is wrong removes it from the heading list of every screen reader. Keep the heading element and reset its size instead.',
            'Замена заголовка на div с нужным оформлением, потому что размер по умолчанию не подходит, убирает его из списка заголовков любого скринридера. Оставьте элемент заголовка и сбросьте его размер.'
          ),
        },
      ],
      takeaway: L(
        'Choose the heading level from the document structure, then control the size in CSS.',
        'Выбирайте уровень заголовка по структуре документа, а размер задавайте в CSS.'
      ),
      seeAlso: [
        L('Section 1-2: landmarks and the document outline', 'Секция 1-2: лендмарки и структура документа'),
        L('Section 1-4: lists, tables and their semantics', 'Секция 1-4: списки, таблицы и их семантика'),
      ],
    },
    {
      id: 'htmlcss-ch1-s4',
      title: L('Lists, tables and their semantics', 'Списки, таблицы и их семантика'),
      body: L(
        'A list is not a row of divs with a bullet image. The ul, ol and dl elements tell the reader that the content is a collection of items, a sequence with a defined order, or a set of terms with their definitions, and that difference is announced by assistive technology and used by search engines. If the visual design cannot express the order, the document still can.\n\nLists bring one real trap with them. Setting display flex or grid on the ul removes the list semantics in WebKit browsers, because the element stops being a list box, and the items are announced without any indication of how many there are. The fix is to add role="list" to the container, which restores the semantics without changing the layout.\n\nTables are the strongest semantic structure in HTML and the most misused. A table is for tabular data, where each column holds values of the same kind. The caption names the table, the th element marks a header cell, and the scope attribute tells assistive technology whether that header describes a column, a row, or a group. Without those, a screen reader user has to guess what each number means.\n\nThe old habit of building page layout with tables is gone for good. Grid and flexbox do the job properly, and a layout table exposes nonsense to the accessibility tree: cells without headers, rows that are not related, and a reading order that follows the visual grid instead of the content. If a table is only arranging boxes, it should be a div with CSS.',
        'Список — это не ряд div с картинкой-буллитом. Элементы ul, ol и dl говорят читателю, что содержимое является набором элементов, последовательностью с заданным порядком или набором терминов с определениями, и assistive technology это произносит, а поисковики это учитывают. Если визуальный дизайн не выражает порядок, документ всё равно его выражает.\n\nУ списков есть одна настоящая ловушка. Установка display flex или grid на ul убирает семантику списка в браузерах WebKit, потому что элемент перестаёт быть списком, и пункты объявляются без указания на их количество. Решение — добавить контейнеру role="list", который восстанавливает семантику, не меняя раскладку.\n\nТаблицы — самая сильная семантическая структура в HTML и самая частая цель злоупотреблений. Таблица — это табличные данные, где в каждом столбце лежат значения одного рода. Caption называет таблицу, th помечает ячейку заголовка, а атрибут scope сообщает вспомогательной технологии, описывает ли этот заголовок столбец, строку или группу. Без них пользователь скринридера вынужден угадывать, что означает каждое число.\n\nСтарая привычка верстать страницу таблицами ушла в прошлое. Свою работу отлично делают grid и flexbox, а таблица для раскладки засоряет дерево доступности: ячейки без заголовков, не связанные между собой строки и порядок чтения, который следует за визуальной сеткой, а не за содержимым. Если таблица только расставляет блоки, это должен быть div с CSS.'
      ),
      bullets: [
        L('ul, ol and dl carry order and grouping that divs cannot express.', 'ul, ol и dl несут порядок и группировку, которых не выразить div-ами.'),
        L('display flex on a ul removes list semantics in WebKit; add role="list".', 'display flex на ul убирает семантику списка в WebKit; добавьте role="list".'),
        L('A data table needs a caption and th cells with scope.', 'Таблице с данными нужны caption и ячейки th со scope.'),
        L('Layout tables pollute the accessibility tree, so use grid instead.', 'Таблицы для раскладки засоряют дерево доступности, используйте grid.'),
      ],
      code: `<table>
  <caption>Quarterly revenue by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Europe</th>
      <td>1 240 000 EUR</td>
    </tr>
  </tbody>
</table>

<dl>
  <dt>Latency</dt>
  <dd>Time between the request and the first byte of the answer.</dd>
</dl>`,
      table: {
        caption: L('Values of the scope attribute on a header cell', 'Значения атрибута scope у ячейки заголовка'),
        headers: [L('Value', 'Значение'), L('The header applies to', 'Заголовок относится к')],
        rows: [
          [L('scope="col"', 'scope="col"'), L('One column of the body', 'Одному столбцу тела таблицы')],
          [L('scope="row"', 'scope="row"'), L('One row of the body', 'Одной строке тела таблицы')],
          [L('scope="colgroup"', 'scope="colgroup"'), L('A group of columns', 'Группе столбцов')],
          [L('scope="rowgroup"', 'scope="rowgroup"'), L('A group of rows', 'Группе строк')],
        ],
      },
      takeaway: L(
        'Use ul, ol and dl for collections, table with caption and th scope for tabular data, and grid for layout.',
        'Для коллекций используйте ul, ol и dl, для табличных данных — table с caption и th scope, для раскладки — grid.'
      ),
      seeAlso: [
        L('Chapter 6: flexbox for one-dimensional layout', 'Глава 6: flexbox для одномерной раскладки'),
        L('Chapter 7: grid for two-dimensional layout', 'Глава 7: grid для двумерной раскладки'),
        L('Section 3-6: screen reader semantics and how to test them', 'Секция 3-6: семантика скринридера и как её проверять'),
      ],
    },
    {
      id: 'htmlcss-ch1-s5',
      title: L('Metadata: title, description and social cards', 'Метаданные: title, description и социальные карточки'),
      body: L(
        'The head of the document is where the page describes itself to everything that is not the rendered page: the browser tab, the history entry, the search result, the link preview in a messenger. The title element is the most important of them, because it is the accessible name of the whole page and the first thing a screen reader announces when it loads.\n\nThe title has to be unique per page and to describe what is on the page right now, not what the site is in general. "Acme Store" is a site name, and the title is "Checkout — Acme Store". The meta description is the snippet under a search result, so it has to make sense without the page around it, but no ranking system uses it, and stuffing keywords into it changes nothing.\n\nTwo attributes of the html element matter more than they look. The lang attribute tells the browser which language the text is in, and that decides the pronunciation of a screen reader, the hyphenation and the spellcheck rules. The viewport meta tag tells mobile browsers how to measure the layout, and without it they assume a desktop width and then shrink the result.\n\nSocial cards are ordinary meta tags with a different consumer. The Open Graph properties describe a link preview, and the Twitter card tags describe the same preview for Twitter, where twitter:card="summary_large_image" asks for the large image variant. Both are plain markup in the head, and both are read from the page URL by the messenger or social network, not by the browser.',
        'В head документ описывает себя всему, что не является отрисованной страницей: вкладке браузера, записи в истории, результату поиска, превью ссылки в мессенджере. Элемент title — самый важный из них, потому что он является доступным именем всей страницы и первым, что произносит скринридер при её загрузке.\n\nTitle должен быть уникальным для каждой страницы и описывать то, что на ней сейчас, а не сайт в целом. "Acme Store" — это название сайта, а title — это "Checkout — Acme Store". Meta description — это сниппет под результатом поиска, поэтому он должен быть понятен без страницы вокруг, но ни одна система ранжирования его не использует, и напихивание ключевых слов ничего не меняет.\n\nДва атрибута элемента html значат больше, чем кажется. Атрибут lang сообщает браузеру, на каком языке написан текст, и от этого зависят произношение скринридера, переносы и правила проверки орфографии. Мета-тег viewport сообщает мобильным браузерам, как измерять раскладку, и без него они считают шириной десктопную и потом ужимают результат.\n\nСоциальные карточки — это обычные мета-теги с другим потребителем. Свойства Open Graph описывают превью ссылки, а теги Twitter card описывают то же превью для Twitter, где twitter:card="summary_large_image" просит вариант с большой картинкой. И то и другое — обычная разметка в head, и читают её мессенджер или соцсеть по адресу страницы, а не браузер.'
      ),
      bullets: [
        L('The title is the accessible name of the page and the first thing announced.', 'Title — доступное имя страницы и первое, что произносится.'),
        L('The title must be unique per page and describe the current page.', 'Title должен быть уникальным для страницы и описывать именно её.'),
        L('The meta description is a snippet, not a ranking factor.', 'Meta description — это сниппет, а не фактор ранжирования.'),
        L('The lang attribute drives screen reader pronunciation and hyphenation.', 'Атрибут lang управляет произношением скринридера и переносами.'),
        L('Without a viewport meta tag, mobile browsers lay out at desktop width.', 'Без viewport мобильные браузеры считают шириной десктопную.'),
        L('Open Graph and Twitter card tags are metadata for link previews.', 'Теги Open Graph и Twitter card — метаданные для превью ссылки.'),
      ],
      code: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Checkout — Acme Store</title>
  <meta name="description" content="Pay for your order and download the invoice.">

  <link rel="canonical" href="https://acme.example/checkout">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Checkout — Acme Store">
  <meta property="og:description" content="Pay for your order and download the invoice.">
  <meta property="og:image" content="https://acme.example/og.png">
</head>`,
      callouts: [
        {
          tone: 'tip',
          title: L('Keep the title and the h1 different but related', 'Title и h1 — разные, но связанные'),
          text: L(
            'A common pattern is a generic title with the specific h1 below it, which reads well in a search result but gives the screen reader the same words twice. Prefer a title that names the page and an h1 that names the current task.',
            'Частый приём — общий title и конкретный h1 под ним: так красиво в выдаче поиска, но скринридер произносит одни и те же слова дважды. Лучше title называет страницу, а h1 — текущую задачу.'
          ),
        },
      ],
      takeaway: L(
        'A unique title, a real description and a lang attribute do more for a page than any meta tag invented later.',
        'Уникальный title, настоящее описание и атрибут lang дают странице больше, чем любой придуманный позже мета-тег.'
      ),
      seeAlso: [
        L('Section 1-1: why semantics come first', 'Секция 1-1: почему начинают с семантики'),
        L('Section 3-1: why accessibility is a requirement', 'Секция 3-1: почему доступность — это требование'),
      ],
    },
  ],
};
