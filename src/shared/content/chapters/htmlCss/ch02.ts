import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const htmlCssCh02: Chapter = {
  id: 'htmlcss-ch2',
  title: L('Forms and native interactivity', 'Формы и нативная интерактивность'),
  summary: L(
    'The full inventory of form controls and their attributes, why a label is not a placeholder, how native constraint validation works, when to reach for a button and when for a link, and how to enhance a form without taking it away from the browser.',
    'Полный инвентарь элементов формы и их атрибутов, почему метка — это не placeholder, как работает нативная валидация ограничений, когда нужен button, а когда ссылка, и как улучшить форму, не отнимая её у браузера.'
  ),
  sections: [
    {
      id: 'htmlcss-ch2-s1',
      title: L('Form controls and their attributes', 'Элементы формы и их атрибуты'),
      body: L(
        'A form is a unit of work sent to a server, and the input element covers most of it. The type attribute picks the on-screen keyboard, the built-in validation and the way the value is entered on a phone, so the correct type is a decision about the data, not about the design. type email gives an email keyboard and rejects malformed addresses, type number gives a numeric keypad and rejects letters, type date opens a date picker in every current browser.\n\nTwo attributes decide whether the control exists for the server at all. The name attribute is the key under which the value is submitted, and a control without a name is never sent, no matter what the user typed into it. The value attribute is the initial value, which the user may change; for a checkbox it is the value sent when the box is checked, and for a radio button it is the identity of the option.\n\nAutocomplete deserves attention, because it is the difference between a form that takes ten seconds and one that takes a minute. The tokens are semantic, not free text: given-name, family-name, street-address, address-level2, email, tel, cc-number, one-time-code, new-password. Browsers store these values, so a form that asks for the same address twice is an autofill bug rather than a user problem.\n\nA few attributes behave differently from what their names suggest. readonly keeps the value visible and copyable but forbids editing, while disabled greys the field out and removes it from the submission together with its name. A placeholder is only a hint about the format, and a field left with its placeholder in place submits that hint when the user forgets to type.',
        'Форма — это единица работы, уходящая на сервер, и элемент input покрывает большую часть её. Атрибут type определяет экранную клавиатуру, встроенную валидацию и способ ввода значения на телефоне, поэтому правильный тип — это решение о данных, а не о дизайне. type email даёт клавиатуру для почты и отбрасывает некорректные адреса, type number — цифровую клавиатуру и не пропускает буквы, type date открывает выбор даты в любом современном браузере.\n\nДва атрибута решают, существует ли элемент для сервера вообще. Атрибут name — это ключ, под которым отправляется значение, и элемент без name не отправляется никогда, что бы пользователь в него ни ввёл. Атрибут value — начальное значение, которое пользователь может изменить; у чекбокса это значение, отправляемое при отметке, а у радиокнопки — идентификатор варианта.\n\nAutocomplete заслуживает внимания, потому что это разница между формой на десять секунд и формой на минуту. Токены семантические, а не произвольные: given-name, family-name, street-address, address-level2, email, tel, cc-number, one-time-code, new-password. Браузеры сохраняют эти значения, поэтому форма, дважды спрашивающая один адрес, — это баг автозаполнения, а не проблема пользователя.\n\nНекоторые атрибуты ведут себя не так, как читается их имя. readonly оставляет значение видимым и копируемым, но запрещает правку, а disabled гасит поле и убирает его из отправки вместе с именем. Placeholder — только подсказка о формате, и если пользователь забудет что-то ввести, отправится именно подсказка.'
      ),
      bullets: [
        L('name is the key in the submitted data; a control without it is never sent.', 'name — ключ в отправляемых данных; без него элемент не отправляется.'),
        L('type decides the keyboard, the picker and the built-in validation.', 'type определяет клавиатуру, выбор значения и встроенную валидацию.'),
        L('value is the initial value and, for checkboxes, the value sent when checked.', 'value — начальное значение, а для чекбокса ещё и отправляемое при отметке.'),
        L('autocomplete tokens are semantic and drive the autofill behaviour.', 'Токены autocomplete семантические и управляют автозаполнением.'),
        L('readonly keeps the value, disabled removes the control from submission.', 'readonly сохраняет значение, disabled убирает элемент из отправки.'),
        L('A placeholder is a hint and must never be the only label.', 'Placeholder — подсказка и никогда не единственная метка.'),
      ],
      code: `<form action="/profile" method="post">
  <input type="text" name="first_name" autocomplete="given-name" required>
  <input type="email" name="email" autocomplete="email" required>
  <input type="tel" name="phone" autocomplete="tel" inputmode="tel">
  <input type="number" name="quantity" min="1" max="99" step="1" value="1">
  <input type="date" name="due" required>
  <input type="file" name="avatar" accept="image/png,image/jpeg">
  <input type="hidden" name="source" value="settings">
  <textarea name="bio" maxlength="280"></textarea>
  <select name="plan">
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>
</form>`,
      table: {
        caption: L('The input types that earn their place', 'Типы input, которые действительно нужны'),
        headers: [L('Type', 'Тип'), L('What it gives', 'Что даёт'), L('Use it for', 'Для чего')],
        rows: [
          [L('text', 'text'), L('Plain one-line text', 'Однострочный текст'), L('Names, titles', 'Имена, заголовки')],
          [L('email', 'email'), L('Email keyboard and format check', 'Клавиатура почты и проверка формата'), L('Addresses of accounts', 'Адреса учётных записей')],
          [L('tel', 'tel'), L('Phone keyboard, no format check', 'Клавиатура телефона без проверки формата'), L('Phone numbers', 'Телефоны')],
          [L('number', 'number'), L('Numeric keypad, min, max, step', 'Цифровая клавиатура, min, max, step'), L('Quantities and amounts', 'Количество и суммы')],
          [L('date', 'date'), L('Date picker and a sortable value', 'Выбор даты и сортируемое значение'), L('Deadlines and birthdays', 'Сроки и даты рождения')],
          [L('checkbox, radio', 'checkbox, radio'), L('Boolean or one-of-many choice', 'Логический выбор или выбор из многих'), L('Options and toggles', 'Флажки и переключатели')],
          [L('file', 'file'), L('File picker, accept filters the choice', 'Выбор файла, accept фильтрует'), L('Uploads', 'Загрузка файлов')],
          [L('search', 'search'), L('Search semantics and a clear button', 'Семантика поиска и кнопка очистки'), L('Query fields', 'Поля поиска')],
        ],
      },
      takeaway: L(
        'Give every control a name, pick the type that matches the data, and use autocomplete tokens the browser already understands.',
        'Дайте каждому элементу имя, подберите тип под данные и используйте токены autocomplete, которые браузер уже понимает.'
      ),
      seeAlso: [
        L('Section 2-2: labels, fieldsets and legends', 'Секция 2-2: метки, fieldset и legend'),
        L('Section 2-3: native validation', 'Секция 2-3: нативная валидация'),
        L('Section 1-4: lists, tables and their semantics', 'Секция 1-4: списки, таблицы и их семантика'),
      ],
    },
    {
      id: 'htmlcss-ch2-s2',
      title: L('Labels, fieldsets and legends', 'Метки, fieldset и legend'),
      body: L(
        'The label is the accessible name of a control and a click target that focuses it. It is tied to the field either by the for attribute holding the id of the control, or by wrapping the control, and wrapping is the only form that works for a control that has no id. A field with no label has no name at all, so a screen reader announces the type of the control and nothing more.\n\nA placeholder is not a label. It disappears the moment the user types anything, it is allowed to be rendered in a faint colour, and it is not announced reliably across screen readers. It is a hint about the format of the value, not a substitute for the name of the field. The rule that survives review is simple: every control has a visible label, and a placeholder is an optional extra.\n\nRelated controls that belong together need a group, and fieldset with a legend is that group. A radio group is the classic case: the legend names the question, and the screen reader announces that name before every option, which is the difference between "Standard" and a meaningless "Standard" in a list of five unrelated items.\n\nThere is one more grouping mechanism for things that are not form controls. A div with role group and aria-labelledby pointing at the heading of the block gives the same result for a custom widget, and role radiogroup with aria-label or aria-labelledby is the equivalent for custom radio buttons. Use them only when fieldset does not apply, because a real fieldset also carries the disabled state of the whole group.',
        'Метка label — это доступное имя элемента управления и цель клика, которая ставит в него фокус. Связь задаётся либо атрибутом for со значением id элемента, либо обёртыванием самого элемента, и обёртывание — единственный способ для элемента без id. У поля без метки нет имени вовсе, поэтому скринридер произносит только тип элемента.\n\nPlaceholder — не метка. Он исчезает, как только пользователь что-то напечатает, ему разрешено быть блёклым по контрасту, и произносится он разными скринридерами по-разному. Это подсказка о формате значения, а не замена имени поля. Правило, переживающее ревью, простое: у каждого элемента есть видимая метка, а placeholder — необязательное дополнение.\n\nСвязанные элементы, которые принадлежат друг другу, образуют группу, и fieldset с legend — это и есть группа. Классический случай — набор радиокнопок: legend называет вопрос, и скринридер произносит это название перед каждым вариантом, и это разница между «Стандарт» и бессмысленным «Стандарт» в списке из пяти несвязанных пунктов.\n\nЕсть ещё один механизм группировки для того, что не является элементами формы. Div с role group и aria-labelledby, указывающим на заголовок блока, даёт тот же результат для кастомного виджета, а role radiogroup с aria-label или aria-labelledby — эквивалент для кастомных радиокнопок. Применяйте их только там, где fieldset не подходит, потому что настоящий fieldset ещё и несёт состояние disabled всей группы.'
      ),
      bullets: [
        L('A label is tied to its control by for and id, or by wrapping it.', 'Метка связана со своим элементом через for и id либо через обёртывание.'),
        L('Every control needs a visible label; a placeholder is not a label.', 'У каждого элемента нужна видимая метка; placeholder ею не является.'),
        L('Clicking a label focuses the control it points at.', 'Клик по метке ставит фокус в связанный элемент.'),
        L('fieldset groups related controls and legend names the group.', 'fieldset группирует связанные элементы, а legend называет группу.'),
        L('role="group" with aria-labelledby is the equivalent for custom widgets.', 'role="group" с aria-labelledby — эквивалент для кастомных виджетов.'),
        L('A disabled fieldset disables every control inside it.', 'Отключённый fieldset отключает все элементы внутри себя.'),
      ],
      code: `<fieldset>
  <legend>Delivery address</legend>

  <label for="street">Street</label>
  <input id="street" name="street" autocomplete="street-address" required>

  <label for="city">City</label>
  <input id="city" name="city" autocomplete="address-level2" required>
</fieldset>

<fieldset>
  <legend>Shipping speed</legend>

  <input type="radio" id="standard" name="speed" value="standard" checked>
  <label for="standard">Standard</label>

  <input type="radio" id="express" name="speed" value="express">
  <label for="express">Express</label>
</fieldset>`,
      table: {
        caption: L('Three ways to name a control, and what each one costs', 'Три способа назвать элемент и цена каждого'),
        headers: [L('Mechanism', 'Механизм'), L('Visible', 'Видимо'), L('Keeps a name when the field has a value', 'Сохраняет имя, когда в поле есть значение')],
        rows: [
          [L('label for="id"', 'label for="id"'), L('yes', 'да'), L('yes', 'да')],
          [L('placeholder', 'placeholder'), L('until the first keystroke', 'до первого нажатия'), L('no', 'нет')],
          [L('aria-label', 'aria-label'), L('no', 'нет'), L('yes', 'да')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The label that points nowhere', 'Метка, которая никуда не указывает'),
          text: L(
            'A for attribute with a typo in the id creates no relationship, and the browser silently ignores it. The field loses its name, the click on the label does nothing, and nothing in the markup looks broken.',
            'Опечатка в id внутри атрибута for не создаёт связи, и браузер молча её игнорирует. Поле теряет имя, клик по метке ничего не делает, и в разметке ничего не выглядит сломанным.'
          ),
        },
      ],
      takeaway: L(
        'Every control gets a real label, and every group of related controls gets a fieldset with a legend.',
        'У каждого элемента есть настоящая метка, а у каждой группы связанных элементов — fieldset с legend.'
      ),
      seeAlso: [
        L('Section 3-3: ARIA and what it is actually for', 'Секция 3-3: ARIA и для чего он на самом деле нужен'),
        L('Section 1-1: why semantics come first', 'Секция 1-1: почему начинают с семантики'),
      ],
    },
    {
      id: 'htmlcss-ch2-s3',
      title: L('Native validation', 'Нативная валидация'),
      body: L(
        'Constraint validation is the browser checking the form against the constraints you declared. required, minlength, maxlength, pattern, min, max, step and the type attribute itself all take part, and the outcome is readable from scripts through the validity object. validity.valid is the boolean answer, validity.valueMissing and validity.typeMismatch name the rule that failed, and validationMessage holds the localized text the browser is about to show.\n\nYou rarely need to write the message yourself. The browser already knows the language of the user, already knows how to phrase the rule, and already places the message next to the field the way the platform expects. Custom validation is justified when the rule cannot be expressed in HTML, and setCustomValidity then accepts one string that replaces the browser text for that field.\n\nTwo details catch people. The browser message appears only after the first submit attempt or after the user has interacted with the field, and until then the form looks perfectly valid, which is the intended behaviour rather than a bug. And the constraint check does not replace server validation, because the server receives whatever a crafted request sends, so every rule has to be repeated on the backend.\n\nFor a search box a validation rule is usually wrong. The novalidate attribute on the form turns off the browser checks for the whole form, and for a query field that is usually the right call, because an empty query is a legitimate request rather than an error.',
        'Валидация ограничений — это проверка браузером формы на соответствие объявленным ограничениям. Участвуют required, minlength, maxlength, pattern, min, max, step и сам атрибут type, а результат читается из объекта validity. validity.valid — это логический ответ, validity.valueMissing и validity.typeMismatch называют нарушенное правило, а validationMessage содержит локализованный текст, который браузер собирается показать.\n\nПисать сообщение самому приходится редко. Браузер уже знает язык пользователя, уже умеет сформулировать правило и уже показывает сообщение рядом с полем так, как ожидает платформа. Своя валидация оправдана, когда правило не выражается в HTML, и тогда setCustomValidity принимает одну строку, которая заменяет браузерный текст этого поля.\n\nДве детали сбивают с толку. Браузерное сообщение появляется только после первой попытки отправки или после взаимодействия с полем, и до тех пор форма выглядит совершенно валидной — это задуманное поведение, а не баг. И проверка ограничений не заменяет серверную валидацию: сервер получает то, что прислал сконструированный запрос, поэтому каждое правило приходится повторять на бэкенде.\n\nДля поискового поля правило валидации обычно вообще лишнее. Атрибут novalidate у формы отключает браузерные проверки целиком, и для поля запроса это чаще всего верное решение, потому что пустой запрос — легитимный запрос, а не ошибка.'
      ),
      bullets: [
        L('required, pattern, min, max, step, minlength and maxlength are the constraint sources.', 'required, pattern, min, max, step, minlength и maxlength — источники ограничений.'),
        L('validity.valid, validity.valueMissing and validationMessage read the result.', 'validity.valid, validity.valueMissing и validationMessage дают результат.'),
        L('The browser message is localized and correctly placed, so do not rewrite it by default.', 'Браузерное сообщение локализовано и размещено верно, поэтому по умолчанию не переписывайте его.'),
        L('setCustomValidity is for rules that HTML cannot express.', 'setCustomValidity — для правил, которые HTML не выражает.'),
        L('Browser messages appear after the first submit attempt, not before.', 'Браузерные сообщения появляются после первой отправки, а не раньше.'),
        L('Server validation is mandatory, the browser check is only a convenience.', 'Серверная валидация обязательна, браузерная — лишь удобство.'),
      ],
      code: `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required maxlength="254">

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="18" max="120" step="1" required>

  <label for="code">Promo code</label>
  <input id="code" name="code" type="text" pattern="[A-Z]{3}-\\d{4}">

  <button type="submit">Sign up</button>
</form>

<!-- the browser paints its own message, no extra markup needed -->`,
      table: {
        caption: L('Constraints and the validity flags that report them', 'Ограничения и флаги validity, которые о них сообщают'),
        headers: [L('Attribute', 'Атрибут'), L('Constraint', 'Ограничение'), L('Validity flag', 'Флаг validity')],
        rows: [
          [L('required', 'required'), L('The value must not be empty', 'Значение не должно быть пустым'), L('valueMissing', 'valueMissing')],
          [L('type="email"', 'type="email"'), L('The value must look like an email', 'Значение должно быть похоже на почту'), L('typeMismatch', 'typeMismatch')],
          [L('min, max', 'min, max'), L('The number stays in the range', 'Число остаётся в диапазоне'), L('rangeUnderflow, rangeOverflow', 'rangeUnderflow, rangeOverflow')],
          [L('minlength, maxlength', 'minlength, maxlength'), L('The text length stays in the range', 'Длина текста остаётся в диапазоне'), L('tooShort, tooLong', 'tooShort, tooLong')],
          [L('pattern', 'pattern'), L('The value must match the expression', 'Значение должно совпадать с выражением'), L('patternMismatch', 'patternMismatch')],
          [L('step', 'step'), L('The value must land on a step', 'Значение должно попадать на шаг'), L('stepMismatch', 'stepMismatch')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('The browser message is not a security check', 'Браузерное сообщение — не проверка безопасности'),
          text: L(
            'Constraint validation runs in the browser and the user can bypass it. Treat the messages as guidance for the person filling the form, and repeat every rule on the server where it has to hold.',
            'Валидация ограничений выполняется в браузере, и пользователь может её обойти. Считайте сообщения подсказкой заполняющему форму, а каждое правило повторяйте на сервере, где оно обязано выполняться.'
          ),
        },
      ],
      takeaway: L(
        'Declare constraints in the attributes and let the browser report them, then repeat the rules on the server.',
        'Описывайте ограничения в атрибутах и поручите браузеру их проверять, а правила повторите на сервере.'
      ),
      seeAlso: [
        L('Section 2-1: form controls and their attributes', 'Секция 2-1: элементы формы и их атрибуты'),
        L('Section 2-5: progressive enhancement', 'Секция 2-5: прогрессивное улучшение'),
      ],
    },
    {
      id: 'htmlcss-ch2-s4',
      title: L('Buttons and link semantics', 'Кнопки и семантика ссылок'),
      body: L(
        'A button performs an action; a link navigates to a URL. That single sentence decides the element for most interactive cases, and getting it wrong costs more than appearance. An anchor with an href can be opened in a new tab, copied, printed and indexed by a crawler, and it shows up in the list of links that a screen reader user can pull up. A button shows up in the list of buttons.\n\nThe keyboard behaviour differs as well. A button activates on Enter and on Space, an anchor activates on Enter only, and Space scrolls the page. Reimplementing a button with role="button" on a div gives you neither of those, unless you also write the key handling, the focus management and the disabled state. The first rule of ARIA applies here: a native element beats an ARIA version every time.\n\nThe type attribute on a button decides what happens inside a form, and the default is submit. A button written without a type inside a form submits it on click, which is the classic bug where a Cancel or a Delete button posts the order. Write the type explicitly every time and use type="button" for anything that is not the submit action.\n\nThe disabled attribute deserves a warning. A disabled button is removed from the tab order and is poorly announced, so a user who never notices it cannot tell why the form does not proceed. The better pattern is to keep the control enabled and explain what is missing, or to use aria-disabled when the control has to look inactive but must stay reachable by the keyboard.',
        'Кнопка выполняет действие, ссылка ведёт по URL. Это одно предложение решает выбор элемента в большинстве интерактивных случаев, и ошибка здесь стоит дороже, чем внешний вид. Ссылка с href открывается в новой вкладке, копируется, печатается и индексируется роботом, а ещё попадает в список ссылок, который пользователь скринридера может вывести. Кнопка попадает в список кнопок.\n\nРазличается и клавиатурное поведение. Кнопка активируется по Enter и по Space, ссылка — только по Enter, а Space прокручивает страницу. Собственная реализация кнопки через role="button" на div не даёт ни того ни другого, пока вы не напишете обработку клавиш, управление фокусом и состояние disabled. Первое правило ARIA работает и здесь: нативный элемент всегда лучше ARIA-версии.\n\nАтрибут type у кнопки решает, что происходит внутри формы, а значение по умолчанию — submit. Кнопка, написанная без type внутри формы, отправляет её по клику, и это классический баг, где кнопка Cancel или Delete отправляет заказ. Всегда пишите type явно и используйте type="button" для всего, что не является отправкой.\n\nАтрибут disabled заслуживает предупреждения. Отключённая кнопка выпадает из порядка обхода и объявляется плохо, поэтому пользователь, который её не заметил, не понимает, почему форма не идёт дальше. Лучше оставить элемент активным и объяснить, чего не хватает, либо использовать aria-disabled, если кнопка должна выглядеть неактивной, но оставаться доступной с клавиатуры.'
      ),
      bullets: [
        L('A button performs an action, an anchor with href navigates.', 'Кнопка выполняет действие, ссылка с href ведёт по адресу.'),
        L('Buttons activate on Enter and Space, links on Enter only.', 'Кнопки активируются по Enter и Space, ссылки — только по Enter.'),
        L('Inside a form the default button type is submit, so always write it.', 'Внутри формы тип кнопки по умолчанию submit, поэтому пишите его явно.'),
        L('role="button" changes the accessibility tree but not the keyboard behaviour.', 'role="button" меняет дерево доступности, но не клавиатурное поведение.'),
        L('A disabled button leaves the tab order and is announced poorly.', 'Отключённая кнопка выпадает из порядка обхода и объявляется плохо.'),
        L('Prefer aria-disabled plus an explanation over a hard disabled state.', 'Лучше aria-disabled с объяснением, чем жёсткий disabled.'),
      ],
      code: `<!-- a link navigates to a URL -->
<a href="/orders">All orders</a>

<!-- a button performs an action inside the page -->
<button type="button" id="open-filter">Filter</button>

<!-- a button inside a form submits it -->
<form action="/subscribe" method="post">
  <input type="email" name="email" required>
  <button type="submit">Subscribe</button>
</form>

<!-- never: a link that pretends to be a button -->
<a href="#" role="button" onclick="openFilter()">Filter</a>`,
      table: {
        caption: L('What each choice gives the user', 'Что каждый выбор даёт пользователю'),
        headers: [L('Element', 'Элемент'), L('Activates with', 'Активируется'), L('Appears in the list of', 'Попадает в список')],
        rows: [
          [L('<button type="button">', '<button type="button">'), L('Enter and Space', 'Enter и Space'), L('buttons', 'кнопок')],
          [L('<a href="/page">', '<a href="/page">'), L('Enter', 'Enter'), L('links', 'ссылок')],
          [L('<div role="button">', '<div role="button">'), L('nothing, unless you add handlers', 'ничем, без своих обработчиков'), L('buttons, but broken', 'кнопок, но сломанных')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The button that submits by accident', 'Кнопка, которая отправляет форму случайно'),
          text: L(
            'A button without a type attribute inside a form is a submit button. The Delete button in a dialog therefore posts the form behind it, and the cancel action destroys data instead of closing the dialog.',
            'Кнопка без атрибута type внутри формы — это кнопка отправки. Поэтому кнопка Delete в диалоге отправляет форму под собой, и отмена действия уничтожает данные вместо закрытия диалога.'
          ),
        },
      ],
      takeaway: L(
        'Use a button for actions and a link for navigation, and write the type attribute on every button.',
        'Используйте button для действий и ссылку для навигации, а атрибут type пишите у каждой кнопки.'
      ),
      seeAlso: [
        L('Section 3-3: ARIA and what it is actually for', 'Секция 3-3: ARIA и для чего он на самом деле нужен'),
        L('Section 2-1: form controls and their attributes', 'Секция 2-1: элементы формы и их атрибуты'),
      ],
    },
    {
      id: 'htmlcss-ch2-s5',
      title: L('Progressive enhancement', 'Прогрессивное улучшение'),
      body: L(
        'Progressive enhancement means the page works before the script arrives. For a form that means a real action attribute, a real method and real names on the controls, so a submit sends an ordinary request to the server and the server answers with the next page. Everything else is an improvement layered on top of that baseline, and the baseline is what keeps the page usable when the script fails.\n\nThe order of the work follows from this. Markup first, so the content exists and is navigable without CSS and without JavaScript. Styles second, so the layout degrades into a readable document rather than a blank screen. Behaviour last, so the script enhances a page that already works instead of being the only reason it works at all.\n\nWhen the script does take over the submission, keep the baseline intact: the action stays in the markup, the script intercepts the submit event, sends the data and renders the answer in place. If the script never loads, the form still submits and the server still handles the request. That is also why a noscript block describing the essential difference is worth writing.\n\nFeature detection is the practical form of the same idea. Check for the capability you are about to use, not for the browser you think is out there: if the form element has a reportValidity method, use it, otherwise fall back to a server round trip. The alternative, sniffing the user agent, breaks silently and permanently, and no amount of testing brings it back.',
        'Прогрессивное улучшение означает, что страница работает ещё до прихода скрипта. Для формы это значит настоящий атрибут action, настоящий method и настоящие имена у элементов, чтобы отправка уходила обычным запросом на сервер, а сервер отвечал следующей страницей. Всё остальное — улучшения поверх этой базы, и именно база держит страницу работоспособной, когда скрипт не загрузился.\n\nПорядок работы следует из этого. Сначала разметка, чтобы контент существовал и был доступен для навигации без CSS и без JavaScript. Затем стили, чтобы раскладка деградировала в читаемый документ, а не в пустой экран. И последним поведение, чтобы скрипт улучшал уже работающую страницу, а не был единственной причиной её работы.\n\nКогда скрипт всё же перехватывает отправку, базу ломать нельзя: action остаётся в разметке, скрипт перехватывает событие submit, отправляет данные и показывает ответ на месте. Если скрипт не загрузится, форма всё равно отправится, и сервер всё равно обработает запрос. Именно поэтому стоит писать блок noscript, описывающий существенное отличие.\n\nПроверка возможностей — практическая форма той же идеи. Проверяйте способность, которой собираетесь пользоваться, а не браузер, который, по вашему мнению, открыл страницу: если у элемента формы есть метод reportValidity, используйте его, иначе откатитесь к серверному запросу. Альтернатива, разбор строки user agent, ломается молча и навсегда, и тестами это не вернуть.'
      ),
      bullets: [
        L('The baseline form posts to a real action with real names.', 'Базовая форма отправляется на настоящий action с настоящими именами.'),
        L('Markup first, then styles, then behaviour.', 'Сначала разметка, потом стили, потом поведение.'),
        L('An enhanced submission keeps the action attribute as the fallback.', 'Улучшенная отправка сохраняет action как запасной путь.'),
        L('A noscript block covers the case where the script never loads.', 'Блок noscript покрывает случай, когда скрипт не загрузился.'),
        L('Feature detection checks capabilities, never the user agent.', 'Проверка возможностей смотрит на возможности, а не на user agent.'),
        L('A page that only works with JavaScript has no baseline at all.', 'Страница, работающая только с JavaScript, вообще не имеет базы.'),
      ],
      code: `<!-- works with JavaScript disabled: the browser sends the form -->
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Subscribe</button>
</form>

<!-- the same form, enhanced: the script intercepts the submit -->
<form action="/subscribe" method="post" data-enhanced="true">
  <label for="email-js">Email</label>
  <input id="email-js" name="email" type="email" required>
  <button type="submit">Subscribe</button>
  <p role="status" aria-live="polite"></p>
</form>

<noscript>
  <p>JavaScript is off, so the page reloads after sending the form.</p>
</noscript>`,
      callouts: [
        {
          tone: 'tip',
          title: L('Server first, always', 'Сначала сервер, всегда'),
          text: L(
            'The strongest check of a form design is whether it can be submitted with the script disabled and the server answering. If the only path to the data is a fetch call, the form is not a form yet, it is a widget that happens to look like one.',
            'Сильнейшая проверка дизайна формы — суметь отправить её при отключённом скрипте и ответе сервера. Если единственный путь к данным — вызов fetch, это ещё не форма, а виджет, который на неё похож.'
          ),
        },
      ],
      takeaway: L(
        'The form must work without JavaScript, and every enhancement keeps that path intact.',
        'Форма должна работать без JavaScript, а каждое улучшение сохраняет этот путь.'
      ),
      seeAlso: [
        L('Section 2-3: native validation', 'Секция 2-3: нативная валидация'),
        L('Chapter 8: responsive design, animation and rendering cost', 'Глава 8: адаптивность, анимация и стоимость отрисовки'),
      ],
    },
  ],
};
