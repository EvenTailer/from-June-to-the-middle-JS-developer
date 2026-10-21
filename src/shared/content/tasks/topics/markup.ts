import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const markupTasks: PracticeTask[] = [
  {
    id: 'topic-markup-1',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'basic',
    title: L('An accessible subscription form', 'Доступная форма подписки'),
    brief: L(
      'Write a newsletter form that works with a keyboard and with a screen reader. The form has the action "/subscribe" and the method "post". Inside it put a fieldset with a legend whose text is "Newsletter". The form has three fields. The first is the email: a label with the htmlFor "email" and the text "Email", and an input with the id "email", the name "email", the type "email", the attribute autocomplete with the value "email" and the attribute required. The second is the topic: a label with the htmlFor "topic" and the text "Topic", and a select with the id "topic" and the name "topic" that has two options, one with the value "js" and the text "JavaScript" and one with the value "css" and the text "CSS". The third is the agreement: a checkbox with the id "terms", the name "terms" and the attribute required, followed by a label with the htmlFor "terms" and the text "I accept the terms". The form ends with a button of the type "submit" and the text "Subscribe". Every input must have a label, and the label must point to the input with the htmlFor attribute. Example: pressing the Tab key moves through the email field, the topic list, the checkbox and the button, and each of them announces its label.',
      'Напиши форму подписки, которая работает с клавиатурой и со скринридером. Форма имеет action "/subscribe" и method "post". Внутри помести fieldset с legend, текст которого — "Newsletter". В форме три поля. Первое — email: label с htmlFor "email" и текстом "Email", и input с id "email", именем "email", типом "email", атрибутом autocomplete со значением "email" и атрибутом required. Второе — тема: label с htmlFor "topic" и текстом "Topic", и select с id "topic" и именем "topic", у которого два варианта: один со значением "js" и текстом "JavaScript", другой со значением "css" и текстом "CSS". Третье — согласие: чекбокс с id "terms", именем "terms" и атрибутом required, после которого идёт label с htmlFor "terms" и текстом "I accept the terms". Форма заканчивается кнопкой типа "submit" с текстом "Subscribe". У каждого поля ввода должна быть подпись, и подпись должна указывать на поле через атрибут htmlFor. Пример: нажатие Tab переводит фокус на поле email, на список тем, на чекбокс и на кнопку, и каждый из них объявляет свою подпись.'
    ),
    hint: L(
      'The attribute htmlFor of a label holds the id of the field it describes, and that is what connects them. The attribute name of a field is what the server receives, and the id is what the label points to. Wrapping related fields into a fieldset with a legend gives the group a name.',
      'Атрибут htmlFor у label содержит id описываемого поля, и именно это их связывает. Атрибут name поля — это то, что сервер получает, а id — то, на что указывает подпись. Обёртывание связанных полей в fieldset с legend даёт группе имя.'
    ),
    solution: `<form action="/subscribe" method="post">
  <fieldset>
    <legend>Newsletter</legend>

    <div class="field">
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
      />
    </div>

    <div class="field">
      <label for="topic">Topic</label>
      <select id="topic" name="topic">
        <option value="js">JavaScript</option>
        <option value="css">CSS</option>
      </select>
    </div>

    <div class="field">
      <input id="terms" name="terms" type="checkbox" required />
      <label for="terms">I accept the terms</label>
    </div>

    <button type="submit">Subscribe</button>
  </fieldset>
</form>`,
    explanation: L(
      'A form is not a set of boxes, it is a set of named values, and the markup has to say both. The id identifies the field inside the page, the name identifies it inside the submitted data, and the htmlFor of the label ties the visible text to the field. When that link exists, clicking the label focuses the field, the screen reader announces the label together with the field, and the error is shown next to the text the user heard. The type of the input is not decoration: type "email" gives the right keyboard on a phone and the built in check of the format, and autocomplete lets the browser fill the field without typing. The fieldset with a legend names the group of controls, which is what a screen reader reads when the user enters the form.',
      'Форма — это не набор коробочек, а набор именованных значений, и разметка должна говорить и то, и другое. id идентифицирует поле на странице, name идентифицирует его в отправленных данных, а htmlFor у label связывает видимый текст с полем. Когда эта связь есть, клик по подписи фокусирует поле, скринридер объявляет подпись вместе с полем, а ошибка показывается рядом с текстом, который пользователь услышал. Тип поля не украшение: type "email" даёт нужную клавиатуру на телефоне и встроенную проверку формата, а autocomplete позволяет браузеру заполнить поле без набора. Fieldset с legend называет группу элементов управления, и именно это читает скринридер при входе в форму.'
    ),
  },
  {
    id: 'topic-markup-2',
    lang: 'css',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'basic',
    title: L('A sticky header that does not hide the anchors', 'Липкий header, не прячущий якоря'),
    brief: L(
      'Make a header stick to the top of the page without covering the section that the user jumped to. Declare a custom property --header-height with the value 64px on the root element. The header has the class "site-header" and must be sticky at the top with a z-index of 10, a height equal to the custom property, a dark background and white text. Declare the property scroll-margin-top on the root selector as the sum of the height of the header and 16px, so that every anchored section keeps that gap above it. The page contains a header, a main element with two sections, the first with the id "intro" and the second with the id "details", and each section has a heading and a paragraph. Example: clicking the link to the section with the id "details" scrolls the page so that the heading of that section is 80px below the top of the viewport, and the header does not cover it.',
      'Сделай так, чтобы header прилипал к верху страницы, но не закрывал секцию, к которой перешёл пользователь. Объяви кастомное свойство --header-height со значением 64px на корневом элементе. Header имеет класс "site-header" и должен быть липким вверху с z-index 10, высотой, равной кастомному свойству, тёмным фоном и белым текстом. Объяви свойство scroll-margin-top в селекторе root как сумму высоты header и 16px, чтобы у каждой секции с якорем оставался такой зазор сверху. Страница содержит header, элемент main с двумя секциями, первая с id "intro" и вторая с id "details", и в каждой секции есть заголовок и абзац. Пример: переход по ссылке на секцию с id "details" прокручивает страницу так, что заголовок этой секции оказывается на 80px ниже верха окна, и header его не закрывает.'
    ),
    hint: L(
      'The property scroll-margin-top is applied to the target of the anchor, not to the header. A custom property is defined once on the root and reused with the function var.',
      'Свойство scroll-margin-top применяется к цели якоря, а не к header. Кастомное свойство задаётся один раз на корне и переиспользуется через функцию var.'
    ),
    solution: `:root {
  --header-height: 64px;
  --header-offset: calc(var(--header-height) + 16px);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: #1f2933;
  color: #ffffff;
}

main {
  padding: 24px;
}

section {
  scroll-margin-top: var(--header-offset);
}

section + section {
  margin-top: 48px;
}`,
    explanation: L(
      'A sticky header stays in the flow of the page, so it only takes part of the screen while the content scrolls under it, and the content below it must account for the space it covers. The scroll-margin-top property is the tool for that: the browser scrolls the target of the anchor to the position given by that property, and the margin is counted from the top of the viewport, so the space of the header has to be added to it. The value is built from the custom property, which means that changing the height of the header in one place moves the offset of every anchor with it. Without scroll-margin-top the heading ends up exactly under the header, and the user sees the section but not its title, which is the classic symptom of this bug.',
      'Липкий header остаётся в потоке страницы, поэтому он занимает часть экрана только пока контент скроллится под ним, и контент под ним должен учитывать закрываемое им место. Для этого и нужен scroll-margin-top: браузер прокручивает цель якоря в позицию, заданную этим свойством, а отступ считается от верха окна, поэтому к нему нужно прибавить высоту header. Значение собрано из кастомного свойства, значит, изменив высоту header в одном месте, мы сдвинем и отступ всех якорей. Без scroll-margin-top заголовок оказывается ровно под header, и пользователь видит секцию, но не её заголовок — это классический признак такой ошибки.'
    ),
  },
  {
    id: 'topic-markup-3',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'basic',
    title: L('A card grid', 'Сетка карточек'),
    brief: L(
      'Lay out a list of cards with CSS grid. The container has the class "cards" and must be a grid with the columns repeating automatically so that the number of columns depends on the width of the container: every column must be at least 240px wide and at most one part of the free space, and the gap between the cards must be 16px. The cards must be aligned to the start of the row so that cards of different heights do not stretch each other. Every card has the class "card" and is itself a grid with three rows: the first row holds the title and takes the size of the content, the second row holds the text and takes all the free space, and the third row holds the button and takes the size of the content. The gap inside a card is 8px, the padding is 16px, the border is a solid line of one pixel in the color #d0d7de and the border radius is 8px. On a screen of at least 900 pixels of width the grid must have exactly three columns. Example: at a width of 1200 pixels the grid shows three columns, and at a width of 500 pixels it shows two columns of 240 pixels and a bit of free space.',
      'Расположи список карточек с помощью CSS grid. Контейнер имеет класс "cards" и должен быть гридом, где число колонок зависит от ширины контейнера: колонки повторяются автоматически, каждая колонка не уже 240px и занимает не больше одной доли свободного места, а промежуток между карточками равен 16px. Карточки должны быть выровнены по началу строки, чтобы карточки разной высоты не растягивали друг друга. Каждая карточка имеет класс "card" и сама является гридом из трёх строк: первая строка содержит заголовок и имеет размер по содержимому, вторая содержит текст и забирает всё свободное место, третья содержит кнопку и имеет размер по содержимому. Внутренний промежуток карточки равен 8px, внутренний отступ 16px, граница сплошная в один пиксель цвета #d0d7de, скругление 8px. На экране шириной не меньше 900px в гриде должно быть ровно три колонки. Пример: при ширине 1200px грид показывает три колонки, а при ширине 500px — две колонки по 240px и немного свободного места.'
    ),
    hint: L(
      'The function repeat with the value auto-fill creates as many tracks as fit, and minmax sets the lower and the upper bound of a track. The rows of the card are sized with auto, 1fr and auto.',
      'Функция repeat со значением auto-fill создаёт столько дорожек, сколько помещается, а minmax задаёт нижнюю и верхнюю границу дорожки. Строки карточки задаются значениями auto, 1fr и auto.'
    ),
    solution: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  align-items: start;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #ffffff;
}

.card__title {
  margin: 0;
  font-size: 1.125rem;
}

.card__text {
  margin: 0;
  color: #52606d;
}

.card__action {
  justify-self: start;
  padding: 8px 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #f6f8fa;
  cursor: pointer;
}

@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
    explanation: L(
      'Grid is the right tool for a gallery of cards, because the number of columns is not known in advance and depends on the space available. The function repeat with auto-fill creates as many tracks as fit, and minmax says that a track is at least 240px and takes up to one part of the free space, so the tracks grow evenly and never become narrower than the minimum. The value auto-fill keeps the empty space on the right, while auto-fit would collapse the empty tracks and stretch the cards. The media query pins the layout to exactly three columns on a wide screen, where the automatic rule would already give that result but the intent is clearer. Inside the card the middle row is 1fr, so the text takes the free height and the button stays at the bottom, and align-items start keeps the cards of different heights from stretching each other.',
      'Grid — правильный инструмент для галереи карточек, потому что число колонок заранее неизвестно и зависит от доступного места. Функция repeat с auto-fill создаёт столько дорожек, сколько помещается, а minmax говорит, что дорожка не уже 240px и занимает до одной доли свободного места, поэтому дорожки растут равномерно и не становятся уже минимума. Значение auto-fill оставляет пустое место справа, а auto-fit схлопнул бы пустые дорожки и растянул карточки. Медиазапрос фиксирует раскладку ровно в три колонки на широком экране, где автоматическое правило и так дало бы тот же результат, но намерение видно яснее. Внутри карточки средняя строка — это 1fr, поэтому текст забирает свободную высоту, а кнопка остаётся внизу, и align-items start не даёт карточкам разной высоты растягивать друг друга.'
    ),
  },
  {
    id: 'topic-markup-4',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'intermediate',
    title: L('A navigation bar that wraps', 'Навигационная панель, которая переносится'),
    brief: L(
      'Build a navigation bar with flexbox that stays on one line as long as it can and wraps when it must. The nav has the class "nav" and must be a flex container with the wrapping enabled, the items aligned in the center and a gap of 8px vertically and 20px horizontally. Its background is #f6f8fa and its padding is 12px vertically and 16px horizontally. The links have the class "nav__link", the color #0969da, no underline under the text and a padding of 6px vertically and 8px horizontally with a border radius of 6px; on hover the link must be underlined. The last item of the bar has the class "nav__spacer" and must push the rest of the bar to the left, and on a screen narrower than 600px the spacer must stop pushing, take the whole width of the row and the links must go to a new line. Example: at a width of 900px the links and the button are on one line with the button on the right, and at a width of 480px the links wrap onto two lines and the button moves below them.',
      'Построй навигационную панель на флексбоксе, которая остаётся в одну строку, пока может, и переносится, когда приходится. Элемент nav имеет класс "nav" и должен быть флекс-контейнером с включённым переносом, выравниванием элементов по центру и промежутком 8px по вертикали и 20px по горизонтали. Его фон — #f6f8fa, внутренний отступ 12px по вертикали и 16px по горизонтали. Ссылки имеют класс "nav__link", цвет #0969da, без подчёркивания текста и с внутренним отступом 6px по вертикали и 8px по горизонтали со скруглением 6px; при наведении ссылка должна подчёркиваться. Последний элемент панели имеет класс "nav__spacer" и должен прижимать остальные элементы влево, а на экране уже 600px спейсер не должен прижимать, должен занимать всю ширину строки, и ссылки должны перейти на новую строку. Пример: при ширине 900px ссылки и кнопка в одной строке, кнопка справа, а при ширине 480px ссылки переносятся на две строки и кнопка уходит под них.'
    ),
    hint: L(
      'The property flex-wrap with the value wrap allows the items to go to the next line when they do not fit. An element with the property margin-left set to auto absorbs the free space, and inside a media query that rule can be cancelled.',
      'Свойство flex-wrap со значением wrap разрешает перенос элементов на следующую строку, когда они не помещаются. Элемент с margin-left в auto забирает свободное место, и внутри медиазапроса это правило можно отменить.'
    ),
    solution: `.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  padding: 12px 16px;
  background: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
}

.nav__link {
  color: #0969da;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 6px;
}

.nav__link:hover {
  text-decoration: underline;
}

.nav__link:focus-visible {
  outline: 2px solid #0969da;
  outline-offset: 2px;
}

.nav__spacer {
  margin-left: auto;
}

@media (max-width: 600px) {
  .nav__spacer {
    margin-left: 0;
    width: 100%;
  }
}`,
    explanation: L(
      'Flexbox distributes the space along the main axis, and the value wrap lets the items move to the next line when the line runs out of room, so the same markup works on a wide screen and on a narrow one without any extra elements. The spacer is the trick that keeps the last item on the right: an element with margin-left set to auto absorbs all the free space that is left on the line, and everything before it is pushed to the left. On a narrow screen that rule is cancelled, because a full width spacer would push the button to a line of its own, and the wrapped links then fill the row naturally. The gap with two values sets the vertical and the horizontal distance separately, which saves a margin on every item and keeps the rhythm of the bar even when the items wrap.',
      'Флексбокс распределяет место вдоль главной оси, а значение wrap позволяет элементам перейти на следующую строку, когда места в строке не хватает, поэтому одна и та же разметка работает и на широком, и на узком экране без лишних элементов. Спейсер — приём, который держит последний элемент справа: элемент с margin-left в auto забирает всё оставшееся свободное место строки, и всё, что перед ним, прижимается влево. На узком экране это правило отменяется, потому что спейсер на всю ширину отправил бы кнопку на отдельную строку, и перенесённые ссылки тогда сами заполняют строку. Промежуток с двумя значениями задаёт вертикальное и горизонтальное расстояние по отдельности, что избавляет от отступов на каждом элементе и сохраняет ровный ритм панели даже при переносе.'
    ),
  },
  {
    id: 'topic-markup-5',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'intermediate',
    title: L('A responsive picture', 'Адаптивное изображение'),
    brief: L(
      'Serve a picture that fits the screen it is shown on. Put the image inside a figure element with a figcaption that holds the text "The city skyline at sunset". The img has the src "/images/hero-800.jpg", the srcset attribute that lists three files with their widths: "/images/hero-400.jpg 400w", "/images/hero-800.jpg 800w" and "/images/hero-1600.jpg 1600w", the sizes attribute with the value "(min-width: 1024px) 50vw, 100vw", the width attribute 1600 and the height attribute 900, the loading attribute "lazy" and the decoding attribute "async". The alt attribute must describe the image in words: "A wide panorama of the city skyline at sunset". The srcset must list the smallest file first and the widths must have the letter w after them, and the src attribute must point to the file of the middle size. Example: on a screen of 1200px wide the browser picks the file of 1600px, because the image takes half of the viewport and the density of the screen asks for more pixels, and on a phone the file of 400px is enough.',
      'Отдавай картинку, подходящую под экран, на котором она показана. Помести изображение в элемент figure с figcaption, содержащим текст "The city skyline at sunset". У img должен быть src "/images/hero-800.jpg", атрибут srcset, перечисляющий три файла с их ширинами: "/images/hero-400.jpg 400w", "/images/hero-800.jpg 800w" и "/images/hero-1600.jpg 1600w", атрибут sizes со значением "(min-width: 1024px) 50vw, 100vw", атрибуты width со значением 1600 и height со значением 900, атрибут loading со значением "lazy" и атрибут decoding со значением "async". Атрибут alt должен описывать изображение словами: "A wide panorama of the city skyline at sunset". В srcset самый маленький файл должен идти первым, после ширин должна стоять буква w, а атрибут src должен указывать на файл среднего размера. Пример: на экране шириной 1200px браузер возьмёт файл 1600px, потому что картинка занимает половину окна, а плотность экрана требует больше пикселей, а на телефоне хватит файла 400px.'
    ),
    hint: L(
      'The attribute srcset lists the variants with the width descriptor w, and the browser picks the one that fits the layout described in sizes. The width and the height attributes let the browser reserve the space before the file is loaded.',
      'Атрибут srcset перечисляет варианты с дескриптором ширины w, и браузер выбирает подходящий под раскладку, описанную в sizes. Атрибуты width и height позволяют браузеру зарезервировать место до загрузки файла.'
    ),
    solution: `<figure class="hero">
  <img
    src="/images/hero-800.jpg"
    srcset="/images/hero-400.jpg 400w,
            /images/hero-800.jpg 800w,
            /images/hero-1600.jpg 1600w"
    sizes="(min-width: 1024px) 50vw, 100vw"
    width="1600"
    height="900"
    loading="lazy"
    decoding="async"
    alt="A wide panorama of the city skyline at sunset"
  />
  <figcaption>The city skyline at sunset</figcaption>
</figure>`,
    explanation: L(
      'The srcset tells the browser which files exist and how wide each of them is, and the browser itself decides which one to download after it knows the size of the element and the density of the screen. The sizes attribute describes the layout, in other words how much of the viewport the image takes, and it is a promise about the design that the browser believes. The src attribute stays as the fallback for the browsers that do not understand srcset, and it points to the middle size, which is the safe choice. The width and the height attributes are not for styling, they let the browser reserve the box before the file arrives, so the page does not jump while the picture loads. The alt attribute describes what the image shows, and for a decorative picture the attribute must be empty instead of repeating the caption.',
      'Атрибут srcset сообщает браузеру, какие файлы есть и какой ширины каждый из них, и браузер сам решает, что скачать, когда узнаёт размер элемента и плотность экрана. Атрибут sizes описывает раскладку, то есть какую долю окна занимает картинка, и это обещание дизайна, в которое верит браузер. Атрибут src остаётся запасным вариантом для браузеров, не понимающих srcset, и указывает на средний размер, что является безопасным выбором. Атрибуты width и height нужны не для оформления: они позволяют браузеру зарезервировать место до загрузки файла, и страница не прыгает, пока картинка грузится. Атрибут alt описывает, что изображено, а для чисто декоративной картинки он должен быть пустым, а не повторять подпись.'
    ),
  },
  {
    id: 'topic-markup-6',
    lang: 'css',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'advanced',
    title: L('A theme built on custom properties', 'Тема на кастомных свойствах'),
    brief: L(
      'Build a light and a dark theme with custom properties. On the root element declare the following custom properties: --color-bg with the value #ffffff, --color-text with the value #1f2933, --color-accent with the value #2563eb, --color-border with the value #d0d7de, --space-1 with the value 4px, --space-2 with the value 8px, --space-3 with the value 16px, --radius with the value 8px and --font-body with the value "system-ui, -apple-system, Segoe UI, sans-serif". On the selector that matches the attribute data-theme with the value "dark" declare the same four color properties with the values --color-bg #0b1220, --color-text #e6edf3, --color-accent #60a5fa and --color-border #24303f, and do not touch the spacing and the font. The body uses the background, the text color and the font from the properties and has a padding of --space-3. The card has a border of one pixel in the color --color-border, a border radius of --radius and a padding of --space-3. The button has the background --color-accent, the white text color, no border, a border radius of --radius, a padding of --space-2 vertically and --space-3 horizontally, and the pointer cursor. No component may contain a hard coded color. Example: adding the attribute data-theme="dark" to the html element switches the whole page to the dark palette without touching a single component.',
      'Построй светлую и тёмную темы на кастомных свойствах. На корневом элементе объяви следующие кастомные свойства: --color-bg со значением #ffffff, --color-text со значением #1f2933, --color-accent со значением #2563eb, --color-border со значением #d0d7de, --space-1 со значением 4px, --space-2 со значением 8px, --space-3 со значением 16px, --radius со значением 8px и --font-body со значением "system-ui, -apple-system, Segoe UI, sans-serif". На селекторе, который матчит атрибут data-theme со значением "dark", объяви те же четыре цветовых свойства со значениями --color-bg #0b1220, --color-text #e6edf3, --color-accent #60a5fa и --color-border #24303f, а интервалы и шрифт не трогай. Body использует фон, цвет текста и шрифт из свойств и имеет внутренний отступ --space-3. Карточка имеет границу в один пиксель цвета --color-border, скругление --radius и внутренний отступ --space-3. Кнопка имеет фон --color-accent, белый цвет текста, без границы, скругление --radius, внутренний отступ --space-2 по вертикали и --space-3 по горизонтали и курсор-указатель. Ни в одном компоненте не должно быть жёстко заданного цвета. Пример: добавление атрибута data-theme="dark" к элементу html переключает всю страницу на тёмную палитру, не трогая ни одного компонента.'
    ),
    hint: L(
      'A custom property is inherited by the descendants, so redefining it in a nested scope changes the theme for everything inside. The function var reads the value, and the fallback argument of var is used when the property is not defined.',
      'Кастомное свойство наследуется потомками, поэтому переопределение во вложенной области меняет тему для всего, что внутри. Функция var читает значение, а запасной аргумент var используется, если свойство не задано.'
    ),
    solution: `:root {
  --color-bg: #ffffff;
  --color-text: #1f2933;
  --color-accent: #2563eb;
  --color-border: #d0d7de;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --radius: 8px;
  --font-body: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

[data-theme='dark'] {
  --color-bg: #0b1220;
  --color-text: #e6edf3;
  --color-accent: #60a5fa;
  --color-border: #24303f;
}

body {
  margin: 0;
  padding: var(--space-3);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  transition: background-color 200ms ease, color 200ms ease;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-3);
  background: var(--color-bg);
}

.button {
  background: var(--color-accent);
  color: #ffffff;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
}`,
    explanation: L(
      'Custom properties are the layer between the values and the components. The components never mention a color, they only ask for the color by name, so a theme is nothing more than a different set of values for the same names. Because the properties are inherited, redefining them on a nested scope changes the whole subtree, and the selector on the data-theme attribute switches the theme of the page by a single change of one attribute on the html element. The spacing and the font are defined only on the root, because they are the same in both themes, and the dark theme redefines only what actually differs. This is also why the palette is a set of names rather than a set of hex codes scattered across the stylesheet: when the design changes, the change happens in one place.',
      'Кастомные свойства — это слой между значениями и компонентами. Компоненты никогда не называют цвет, а только запрашивают его по имени, поэтому тема — это просто другой набор значений для тех же имён. Так как свойства наследуются, их переопределение во вложенной области меняет всё поддерево, а селектор по атрибуту data-theme переключает тему страницы одним изменением одного атрибута на элементе html. Интервалы и шрифт заданы только на корне, потому что в обеих темах они одинаковы, и тёмная тема переопределяет только то, что действительно отличается. Поэтому палитра — это набор имён, а не набор шестнадцатеричных кодов, разбросанных по таблице стилей: при смене дизайна изменение происходит в одном месте.'
    ),
  },
  {
    id: 'topic-markup-7',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'advanced',
    title: L('Focus styles that only show for the keyboard', 'Стили фокуса только для клавиатуры'),
    brief: L(
      'Make the focus visible for the keyboard and quiet for the mouse. The styles must cover the elements a, button, input, select and textarea and any element with the tabindex attribute, and the outline must be 3 pixels solid with the color #2563eb, with an offset of 2 pixels, and the border radius of the elements must be 4 pixels. The rule must use the pseudo class focus-visible, so that the outline appears only when the focus came from the keyboard, and there must be a separate rule that removes the outline from the links for the focus that did not come from the keyboard, using the pseudo class focus with the negation not. Add a skip link with the class "skip-link" that is placed outside the visible area with the position absolute, the left offset -9999px, the top offset 0, the padding of 8px vertically and 16px horizontally, a white background, the color #0969da and a z-index of 100. When the skip link receives the focus it must move into the visible area with the left offset of 8px and the top offset of 8px. Example: pressing the Tab key shows the blue outline around the focused element, and clicking a link with the mouse shows no outline at all.',
      'Сделай так, чтобы фокус был виден с клавиатуры и незаметен от мыши. Стили должны покрывать элементы a, button, input, select и textarea и любой элемент с атрибутом tabindex, а обводка должна быть сплошной в 3 пикселя цвета #2563eb со смещением 2 пикселя и скруглением элементов 4 пикселя. Правило должно использовать псевдокласс focus-visible, чтобы обводка появлялась только когда фокус пришёл с клавиатуры, и должен быть отдельный правило, убирающее обводку у ссылок для фокуса, который не пришёл с клавиатуры, с помощью псевдокласса focus и отрицания not. Добавь ссылку-обход с классом "skip-link", которая размещена вне видимой области через position absolute, отступ left -9999px, отступ top 0, внутренний отступ 8px по вертикали и 16px по горизонтали, белый фон, цвет #0969da и z-index 100. Когда ссылка-обход получает фокус, она должна переместиться в видимую область с отступом left 8px и top 8px. Пример: нажатие Tab показывает синюю обводку вокруг сфокусированного элемента, а клик по ссылке мышью вообще не показывает обводку.'
    ),
    hint: L(
      'The pseudo class focus-visible matches only when the browser decides that the focus should be visible, and the pseudo class focus matches every focus. The link that skips the content is the first element on the page, so it is the first thing the Tab key reaches.',
      'Псевдокласс focus-visible срабатывает только тогда, когда браузер решил, что фокус должен быть виден, а псевдокласс focus срабатывает на любой фокус. Ссылка, пропускающая содержимое, стоит первым на странице, поэтому клавиша Tab достигает её первой.'
    ),
    solution: `a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
  border-radius: 4px;
}

a:focus:not(:focus-visible) {
  outline: none;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  padding: 8px 16px;
  background: #ffffff;
  color: #0969da;
  z-index: 100;
}

.skip-link:focus {
  left: 8px;
  top: 8px;
}`,
    explanation: L(
      'Focus is the only indicator a keyboard user has, so it must never be removed, and the outline is the only indicator that works on every background and in every browser. The pseudo class focus-visible is what separates the two cases: the browser shows it when the focus came from the keyboard and hides it when the focus came from a click, so the page is quiet for the mouse and clear for the keyboard. The rule with focus and not focus-visible removes the leftover outline of the links that the browser itself does not hide, and it never touches the keyboard case. The skip link is hidden far to the left, but it is still the first focusable element on the page, so the very first press of the Tab key brings it into the view and lets the user jump straight to the content.',
      'Фокус — единственный индикатор, который есть у пользователя клавиатуры, поэтому его нельзя убирать, а обводка — единственный индикатор, работающий на любом фоне и в любом браузере. Псевдокласс focus-visible разделяет два случая: браузер показывает обводку, когда фокус пришёл с клавиатуры, и прячет её, когда фокус поставил клик, поэтому страница тихая для мыши и ясная для клавиатуры. Правило с focus и not focus-visible убирает остаточную обводку у ссылок, которую сам браузер не прячет, и никогда не трогает клавиатурный случай. Ссылка-обход спрятана далеко влево, но остаётся первым фокусируемым элементом страницы, поэтому первое же нажатие Tab выводит её на экран и позволяет сразу перейти к содержимому.'
    ),
  },
  {
    id: 'topic-markup-8',
    moduleId: 'html-css',
    topic: 'markup',
    level: 'advanced',
    title: L('A semantic table of results', 'Семантическая таблица результатов'),
    brief: L(
      'Mark up a table of quarterly results so that a screen reader can read it properly. The table has a caption with the text "Quarterly results for 2026". The head of the table has a row with three column headers, each with the scope "col": the text "Quarter", the text "Revenue" and the text "Growth". The body has three rows. The first row has a row header with the scope "row" and the text "Q1", a cell with the text "120000" and a cell with the text "+8%". The second row has the row header "Q2", the cell "145000" and the cell "+11%". The third row has the row header "Q3", the cell "175000" and the cell "+21%". The foot of the table has a row with a row header with the scope "row" and the text "Total", a cell with the text "440000" and a cell with the text "+14%". The row header of every row must be the first cell of that row and must carry the scope "row", so that the screen reader announces the name of the row together with the value of the cell. Example: when the cursor is on the cell with the text "+11%", the screen reader announces the column "Growth" and the row "Q2".',
      'Разметь таблицу квартальных результатов так, чтобы скринридер читал её правильно. У таблицы есть caption с текстом "Quarterly results for 2026". В head таблицы строка с тремя заголовками колонок, у каждого scope "col": текст "Quarter", текст "Revenue" и текст "Growth". В tbody три строки. Первая строка имеет заголовок строки с scope "row" и текстом "Q1", ячейку с текстом "120000" и ячейку с текстом "+8%". Вторая строка имеет заголовок строки "Q2", ячейку "145000" и ячейку "+11%". Третья строка имеет заголовок строки "Q3", ячейку "175000" и ячейку "+21%". В tfoot строка с заголовком строки со scope "row" и текстом "Total", ячейкой с текстом "440000" и ячейкой с текстом "+14%". Заголовок строки должен быть первой ячейкой этой строки и должен нести scope "row", чтобы скринридер объявлял имя строки вместе со значением ячейки. Пример: когда курсор на ячейке с текстом "+11%", скринридер объявляет колонку "Growth" и строку "Q2".'
    ),
    hint: L(
      'The scope attribute on a header cell tells the assistive technology how many cells the header covers. A header in the head of the table describes a column, a header inside a row describes that row.',
      'Атрибут scope у ячейки заголовка говорит вспомогательной технологии, сколько ячеек охватывает заголовок. Заголовок в head таблицы описывает колонку, а заголовок внутри строки описывает эту строку.'
    ),
    solution: `<table class="results">
  <caption>Quarterly results for 2026</caption>

  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>120000</td>
      <td>+8%</td>
    </tr>
    <tr>
      <th scope="row">Q2</th>
      <td>145000</td>
      <td>+11%</td>
    </tr>
    <tr>
      <th scope="row">Q3</th>
      <td>175000</td>
      <td>+21%</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>440000</td>
      <td>+14%</td>
    </tr>
  </tfoot>
</table>`,
    explanation: L(
      'A table is a two dimensional structure, and a screen reader navigates it by coordinates, so it needs to know which header belongs to which cell. The scope attribute provides exactly that link: scope "col" marks a header that covers a column, and scope "row" marks a header that covers the row it starts. Without the scope the reader can only guess, and the user hears a bare number with no idea what it means. The row header has to be the first cell of the row, otherwise the association is broken. The caption names the table for the user who comes to it from a list of many tables, and the thead, tbody and tfoot sections let the reader jump straight to the headers, to the data or to the summary.',
      'Таблица — двумерная структура, и скринридер ходит по ней координатами, поэтому ему нужно знать, какой заголовок относится к какой ячейке. Именно такую связь и задаёт атрибут scope: scope "col" помечает заголовок, покрывающий колонку, а scope "row" — заголовок, покрывающий строку, в которой он стоит. Без scope читатель только гадает, и пользователь слышит голое число, не понимая, что оно значит. Заголовок строки должен быть первой ячейкой строки, иначе связь рвётся. Caption даёт таблице имя для того, кто приходит к ней из списка многих таблиц, а секции thead, tbody и tfoot позволяют читателю сразу перейти к заголовкам, к данным или к итогу.'
    ),
  },
];
