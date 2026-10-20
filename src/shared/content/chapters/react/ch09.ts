import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh09: Chapter = {
  id: 'react-ch9',
  title: L('Forms', 'Формы'),
  summary: L(
    'How the native form semantics work, how controlled inputs and validation behave, what a form library actually buys you, how server actions enable progressive enhancement, and what a form must contain to be accessible.',
    'Как работает нативная семантика формы, как ведут себя контролируемые поля и валидация, что на самом деле даёт библиотека форм, как серверные действия дают прогрессивное улучшение и что форма обязана содержать, чтобы быть доступной.'
  ),
  sections: [
    {
      id: 'react-ch9-s1',
      title: L('Native form semantics', 'Нативная семантика формы'),
      body: L(
        'A form is not a layout element, it is a transaction boundary. The browser collects the values of the named controls inside it, validates what it can, and submits them as a key-value payload. React sits on top of that mechanism and does not replace it: the attributes name, method, action, required and the type attribute of buttons all keep their native meaning, and the browser behaviour you already know still applies.\n\nThe name attribute is what decides what gets submitted. A control without a name is not part of the payload, so a controlled input that has a value but no name sends nothing. The payload key is the name, the value is the current value of the control, and for checkboxes and radio groups the value is what the value attribute says when the control is checked. A select sends the value of the selected option, and a multi-select sends several keys.\n\nPressing Enter inside a text field submits the form, and no framework turns that off. The Enter key finds the default button of the form and activates it, which means the type attribute of your buttons decides what happens: a button without a type inside a form defaults to type submit, and a button with type button does nothing on Enter. Two buttons in a form need explicit types.\n\nThe submit event is the single place where the whole payload exists at once, and it is where you decide what happens next. Without preventDefault the browser navigates and reloads the page; with it, the handler runs and the page stays. React onSubmit is the same event with the same bubbling rules, so the handler belongs on the form, not on the button.',
        'Форма — не элемент вёрстки, а граница транзакции. Браузер собирает значения именованных контролов внутри неё, проверяет то, что умеет, и отправляет их как набор пар ключ-значение. React надстраивается над этим механизмом и не заменяет его: атрибуты name, method, action, required и атрибут type у кнопок сохраняют свой нативный смысл, и всё поведение браузера, которое вы и так знаете, продолжает работать.\n\nИменно атрибут name решает, что попадёт в отправку. Контрол без name в данные не входит, поэтому контролируемое поле со значением, но без name не отправит ничего. Ключ в данных — это name, значение — текущее значение контрола, а для чекбоксов и радиогрупп значение берётся из атрибута value, когда контрол отмечен. Select отправляет значение выбранной опции, а мультиселект — несколько ключей сразу.\n\nEnter в текстовом поле отправляет форму, и ни один фреймворк это не отключает. Клавиша Enter находит кнопку по умолчанию у формы и активирует её, поэтому решает атрибут type у кнопок: кнопка без type внутри формы по умолчанию имеет type submit, а кнопка с type button на Enter ничего не делает. Для двух кнопок в форме типы нужно указывать явно.\n\nСобытие submit — единственное место, где весь набор данных существует целиком, и именно там вы решаете, что будет дальше. Без preventDefault браузер перейдёт и перезагрузит страницу; с ним — выполнит обработчик, а страница останется на месте. React onSubmit — то же событие с теми же правилами всплытия, поэтому обработчик вешают на форму, а не на кнопку.'
      ),
      bullets: [
        L('A control without a name is not part of the submitted payload.', 'Контрол без name не попадает в отправляемые данные.'),
        L('Enter inside a text field submits the form.', 'Enter в текстовом поле отправляет форму.'),
        L('A button inside a form defaults to type submit.', 'Кнопка внутри формы по умолчанию имеет type submit.'),
        L('type button never submits, type submit always does.', 'type button не отправляет форму, type submit отправляет.'),
        L('The submit event carries the whole payload at once.', 'Событие submit несёт сразу все данные формы.'),
        L('Without preventDefault the browser navigates and reloads.', 'Без preventDefault браузер перейдёт и перезагрузит страницу.'),
      ],
      code: `function LoginForm() {
  const onSubmit = (event) => {
    event.preventDefault();               // keep the page, handle it here
    const data = new FormData(event.currentTarget);
    console.log('email:', data.get('email'));
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign in</button>
      <button type="button">Cancel</button>   {/* must not submit */}
    </form>
  );
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('The button that submits by accident', 'Кнопка, которая отправляет форму случайно'),
          text: L(
            'A second button in a form without an explicit type is a submit button, so clicking it sends the form while the user meant to cancel. Give every button in a form a type, and keep only one submit button.',
            'Вторая кнопка в форме без явного type — это кнопка отправки, поэтому нажатие отправляет форму, хотя пользователь хотел отменить. Указывайте type у каждой кнопки в форме и оставляйте только одну кнопку отправки.'
          ),
        },
        {
          tone: 'tip',
          title: L('Read the payload with FormData', 'Читайте данные через FormData'),
          text: L(
            'new FormData(event.currentTarget) collects every named control, including checkboxes and selects, in one object. Use event.currentTarget rather than event.target, which is the individual field the event came from.',
            'new FormData(event.currentTarget) собирает все именованные контролы, включая чекбоксы и select, в один объект. Используйте event.currentTarget, а не event.target: это отдельное поле, из которого пришло событие.'
          ),
        },
      ],
      takeaway: L(
        'Give every control a name, give every button an explicit type, and handle the form on its submit event.',
        'Дайте каждому контролу name, каждой кнопке явный type и обрабатывайте форму по её событию submit.'
      ),
      seeAlso: [
        L('js-core, Section 14-4: forms, validation and FormData', 'js-core, Секция 14-4: формы, валидация и FormData'),
        L('Section 9-4: server actions and progressive enhancement', 'Секция 9-4: серверные действия и прогрессивное улучшение'),
      ],
    },
    {
      id: 'react-ch9-s2',
      title: L('Controlled inputs and validation', 'Контролируемые поля и валидация'),
      body: L(
        'A controlled input is an input whose value lives in React state. You pass value and onChange, React writes the value into the DOM on every render, and the DOM cannot hold a value the state does not know about. That makes the input predictable: you can validate it, format it, disable it or reset it, because the truth is one value in one place.\n\nThe cost is a render per keystroke. Every character goes through setState, the component re-renders, and the value comes back through the DOM. For a short form this is irrelevant. For a large form with many controlled fields it is the difference between a form that feels instant and one that does not, which is why the uncontrolled alternative exists.\n\nValidation on the client is a convenience, not a guarantee. It saves the user a round trip and gives instant feedback, and it is the right place for the checks that depend only on the format of the value: is this an email, is it long enough, do the two passwords match. The checks that depend on data the client does not have, such as is this name already taken, must run on the server, and the client check is then only a hint.\n\nThe state of a form is more than its values. You usually need to know which fields the user has touched, so that an error appears only after a field was left, and not while the user is still typing the first character. That is what a touched flag is for. Keeping values, errors and touched flags in three separate pieces of state means three updates per interaction, which is where a reducer or a form library earns its place.',
        'Контролируемое поле — это поле, значение которого живёт в состоянии React. Вы передаёте value и onChange, React записывает значение в DOM при каждом рендере, и DOM не может хранить значение, о котором состояние не знает. Отсюда предсказуемость: поле можно валидировать, форматировать, отключать и сбрасывать, потому что истина в одном месте.\n\nЦена — рендер на каждый символ. Каждый знак проходит через setState, компонент перерендеривается, и значение возвращается через DOM. Для короткой формы это несущественно. Для большой формы с множеством контролируемых полей это разница между формой, которая ощущается мгновенной, и той, которая не ощущается, — и именно поэтому существует неконтролируемый вариант.\n\nКлиентская валидация — удобство, а не гарантия. Она экономит пользователю поход на сервер и даёт мгновенную обратную связь, и ей место там, где проверка зависит только от формата значения: похоже ли это на почту, достаточно ли длина, совпадают ли пароли. Проверки, зависящие от данных, которых у клиента нет, например «занято ли такое имя», выполняются на сервере, и клиентская проверка становится лишь подсказкой.\n\nСостояние формы — это больше, чем её значения. Обычно нужно знать, какие поля пользователь уже трогал, чтобы ошибка появлялась после ухода с поля, а не пока он печатает первый символ. Для этого и нужен флаг касания. Значения, ошибки и отметки о касании в трёх отдельных кусках состояния означают три обновления на одно взаимодействие — именно здесь окупается редьюдер или библиотека форм.'
      ),
      bullets: [
        L('A controlled input gets its value from React state.', 'Контролируемое поле получает значение из состояния React.'),
        L('Every keystroke in a controlled input causes a render.', 'Каждый символ в контролируемом поле вызывает рендер.'),
        L('Client validation checks the format, the server checks the facts.', 'Клиентская валидация проверяет формат, серверная — факты.'),
        L('Errors shown before the field is touched read as noise.', 'Ошибки до касания поля читаются как шум.'),
        L('Values, errors and touched flags are three pieces of state.', 'Значения, ошибки и отметки о касании — это три куска состояния.'),
        L('A reducer keeps the three in sync without a third source of truth.', 'Редьюдер держит их в синхроне без третьего источника истины.'),
      ],
      code: `function PasswordForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});

  const errors = {
    email: values.email && !values.email.includes('@') ? 'Enter a valid email' : null,
    password: values.password.length < 8 ? 'At least 8 characters' : null,
  };

  return (
    <form>
      <input
        name="email"
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
      />
      {touched.email && errors.email && <span role="alert">{errors.email}</span>}
    </form>
  );
}`,
      table: {
        caption: L('Controlled and uncontrolled inputs', 'Контролируемые и неконтролируемые поля'),
        headers: [L('Aspect', 'Аспект'), L('Controlled', 'Контролируемое'), L('Uncontrolled', 'Неконтролируемое')],
        rows: [
          [L('The value lives in', 'Значение живёт в'), L('React state', 'Состоянии React'), L('The DOM node', 'DOM-узле')],
          [L('Access to the value', 'Доступ к значению'), L('Anywhere in the component', 'Везде в компоненте'), L('Through a ref on submit', 'Через ссылку при отправке')],
          [L('Renders per keystroke', 'Рендеров на символ'), L('One', 'Один'), L('None', 'Ноль')],
          [L('Resetting the form', 'Сброс формы'), L('Set the state back', 'Вернуть состояние'), L('form.reset() through a ref', 'form.reset() через ссылку')],
          [L('Validation', 'Валидация'), L('Straightforward', 'Прямая'), L('Read the DOM at submit time', 'Чтение DOM при отправке')],
          [L('Fits', 'Подходит для'), L('Short forms, shared state', 'Коротких форм и общего состояния'), L('Large forms, simple input', 'Больших форм и простого ввода')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The value without onChange', 'Значение без onChange'),
          text: L(
            'An input with value and no onChange is a read-only field, and React warns about it in the console. If you want the field to be read-only, say so with the readOnly attribute; if you want it editable, wire the change handler.',
            'Поле с value и без onChange — это поле только для чтения, и React предупредит об этом в консоли. Если поле должно быть доступным только для чтения, укажите атрибут readOnly; если редактируемым — подключите обработчик изменения.'
          ),
        },
        {
          tone: 'warning',
          title: L('Client validation is not security', 'Клиентская валидация — не безопасность'),
          text: L(
            'Anything the client checks can be skipped by editing the payload by hand. Validate on the server with the same rules, treat the client check as a courtesy to the user, and never let the client decide whether a write is allowed.',
            'Любую клиентскую проверку можно обойти, изменив данные вручную. Проверяйте на сервере по тем же правилам, относитесь к клиентской проверке как к вежливости и никогда не поручайте клиенту решение, разрешена ли запись.'
          ),
        },
      ],
      takeaway: L(
        'Validate the format on the client for instant feedback and always validate on the server before you trust the data.',
        'Проверяйте формат на клиенте для мгновенной обратной связи и всегда проверяйте на сервере, прежде чем доверять данным.'
      ),
      seeAlso: [
        L('Section 3-3: controlled versus uncontrolled inputs', 'Секция 3-3: контролируемые и неконтролируемые поля'),
        L('Section 9-3: form libraries and what they buy you', 'Секция 9-3: библиотеки форм и что они дают'),
      ],
    },
    {
      id: 'react-ch9-s3',
      title: L('Form libraries and what they buy you', 'Библиотеки форм и что они дают'),
      body: L(
        'A form library is not a validation library. React Hook Form and Formik solve the same structural problem: a form with twenty fields has twenty values, twenty error messages and twenty touched flags, and keeping them in component state means twenty update paths and a re-render per keystroke. The libraries move the values out of React state, keep them in a mutable store, and re-render only the parts that must change.\n\nReact Hook Form registers fields through a ref and a name and reads them at submit time; it does not re-render on every keystroke. Formik keeps the values in React state and re-renders on change, which is simpler to reason about and heavier on large forms. Both give you a schema-based validation layer, either through a resolver such as zod or through their own validator functions, and both give you a submit handler that receives the values and the errors.\n\nThe uncontrolled alternative needs no dependency at all. Give the inputs a name, put a ref on the form, and read the payload on submit with new FormData(form). For a form that is submitted once and does not need live validation, that is a complete solution in three lines, and it is often the fastest thing to ship.\n\nThe cost of a library is real: bundle size, a second way of thinking about state, and a learning curve for whoever joins the project later. Before adding one, check whether your form needs live validation, cross-field rules, arrays of fields or a lot of them. If the answer is no, the native form plus FormData is smaller, faster and easier to delete later.',
        'Библиотека форм — это не библиотека валидации. React Hook Form и Formik решают одну и ту же структурную задачу: у формы с двадцатью полями двадцать значений, двадцать сообщений об ошибках и двадцать отметок о касании, и держать их в состоянии компонента — это двадцать путей обновления и рендер на каждый символ. Библиотеки выносят значения из состояния React, держат их в мутабельном хранилище и перерисовывают только то, что действительно изменилось.\n\nReact Hook Form регистрирует поля через ссылку и имя и читает их в момент отправки: он не перерендеривает на каждый символ. Formik держит значения в состоянии React и перерендеривает на каждое изменение, что проще рассуждать, но тяжелее на больших формах. Оба дают слой схемной валидации — либо через резолвер вроде zod, либо через собственные функции-валидаторы — и обработчик отправки, получающий значения и ошибки.\n\nНеконтролируемому варианту зависимость не нужна вовсе. Дайте полям имена, повесьте ссылку на форму и прочитайте данные при отправке через new FormData(form). Для формы, которая отправляется один раз и не нуждается в живой валидации, это готовое решение в три строки, и зачастую самое быстрое, что можно выпустить.\n\nЦена библиотеки реальна: размер бандла, второй способ думать о состоянии и кривая обучения для тех, кто придёт в проект позже. Перед добавлением проверьте, нужны ли форме живая валидация, правила между полями, массивы полей или их просто много. Если нет, нативная форма плюс FormData меньше, быстрее и её проще потом удалить.'
      ),
      bullets: [
        L('Form libraries move field values out of React state.', 'Библиотеки форм выносят значения полей из состояния React.'),
        L('React Hook Form uses uncontrolled fields and re-renders less.', 'React Hook Form использует неконтролируемые поля и рендерит меньше.'),
        L('Formik keeps values in state and re-renders on every change.', 'Formik держит значения в состоянии и рендерит на каждое изменение.'),
        L('Schema validation with zod is the part most teams keep.', 'Схемная валидация через zod — та часть, которую чаще всего оставляют.'),
        L('A form with no live validation needs no library at all.', 'Форме без живой валидации библиотека не нужна вовсе.'),
        L('Every dependency is a cost in size, concepts and exit.', 'Каждая зависимость — это затраты на размер, концепции и выход.'),
      ],
      code: `// No dependency: read the payload on submit
function Subscribe() {
  const formRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(formRef.current));
    console.log(values);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <input name="email" type="email" required />
      <input name="plan" type="text" defaultValue="free" />
      <button type="submit">Subscribe</button>
    </form>
  );
}`,
      callouts: [
        {
          tone: 'tip',
          title: L('Start with FormData', 'Начните с FormData'),
          text: L(
            'Three lines and no dependency cover a large part of real forms: read the payload on submit, validate it, send it. Reach for a library when the form outgrows that, not before.',
            'Три строки без зависимости покрывают большую часть реальных форм: прочитать данные при отправке, проверить, отправить. Обращайтесь к библиотеке, когда форма перерастёт это, а не раньше.'
          ),
        },
        {
          tone: 'warning',
          title: L('Do not mix paradigms', 'Не смешивайте подходы'),
          text: L(
            'A controlled field that is also registered with a form library fights over the same value: one side writes it to state, the other writes it to the DOM, and the result depends on which effect runs last. Pick one model per field.',
            'Контролируемое поле, которое одновременно зарегистрировано в библиотеке форм, бьётся за одно и то же значение: одна сторона пишет его в состояние, другая — в DOM, и результат зависит от того, чей эффект отработал последним. Выберите одну модель на поле.'
          ),
        },
      ],
      takeaway: L(
        'Add a form library when the form has live validation, many fields or arrays of fields, and not before.',
        'Добавляйте библиотеку форм, когда форме нужна живая валидация, много полей или массивы полей, и не раньше.'
      ),
      seeAlso: [
        L('Section 9-2: controlled inputs and validation', 'Секция 9-2: контролируемые поля и валидация'),
        L('Chapter 10: performance on large forms', 'Глава 10: производительность на больших формах'),
      ],
    },
    {
      id: 'react-ch9-s4',
      title: L('Server actions and progressive enhancement', 'Серверные действия и прогрессивное улучшение'),
      body: L(
        'A server action is a function marked with the use server directive and executed on the server. Passing one to the action attribute of a form turns the form into a real form submission: the browser posts the payload to the server, the server runs the action, and the result comes back. With JavaScript enabled React intercepts the submission, runs the action across the network boundary and applies the result without a page reload.\n\nuseActionState ties the action to a piece of state. It takes the action and an initial state, and returns the current state, a dispatch function and a pending flag. The action receives the previous state and the form data, so it can validate, fail with a message and return a new state, and the component re-renders with that state. The pending flag is what disables the button while the request is in flight, which is the difference between a form that feels safe and one that looks broken.\n\nProgressive enhancement means the form works without JavaScript. The action attribute points at a real URL, and the server handles a plain POST; with JavaScript the same handler runs through React and the page updates in place. The catch is the one that bites in practice: a server action wired only to onSubmit does nothing without JavaScript, so the action attribute and the handler must both be there. React 19 lets the action attribute take a function, and the form keeps working when the script does not load.\n\nThere is a catch worth stating plainly. Everything inside the form is what the browser sends, so a server action reads the form data, not the React state, and the two can disagree if the state was changed and not submitted. Also, an action is a public endpoint with the powers of the server, so it needs the same authorisation and validation as any other mutation. Never trust the payload because the button that produced it was disabled.',
        'Серверное действие — это функция, помеченная директивой use server и выполняемая на сервере. Если передать её в атрибут action формы, форма превращается в настоящую отправку: браузер постит данные на сервер, сервер выполняет действие, и результат возвращается. Когда JavaScript включён, React перехватывает отправку, выполняет действие через сетевую границу и применяет результат без перезагрузки страницы.\n\nuseActionState привязывает действие к состоянию. Он принимает действие и начальное состояние, а возвращает текущее состояние, функцию отправки и признак ожидания. Действие получает предыдущее состояние и данные формы, поэтому может проверить, вернуть ошибку и отдать новое состояние, и компонент перерисовывается с ним. Признак ожидания отключает кнопку на время запроса — это разница между формой, которая кажется надёжной, и формой, которая кажется сломанной.\n\nПрогрессивное улучшение означает, что форма работает без JavaScript. Атрибут action указывает на настоящий URL, и сервер обрабатывает обычный POST; с JavaScript тот же обработчик выполняется через React, а страница обновляется на месте. Ловушка, которая кусается на практике: серверное действие, подключённое только через onSubmit, без JavaScript не делает ничего, поэтому нужны и атрибут action, и обработчик. React 19 позволяет передать в action функцию, и форма продолжает работать, если скрипт не загрузился.\n\nЕсть ещё одна оговорка, которую стоит произнести прямо. На сервер уходит всё, что находится внутри формы, поэтому серверное действие читает данные формы, а не состояние React, и эти два источника могут разойтись, если состояние меняли, но не отправляли. Кроме того, действие — публичная точка входа с возможностями сервера, поэтому ему нужны те же авторизация и проверки, что и любой другой мутации. Не доверяйте данным только потому, что кнопка, их породившая, была отключена.'
      ),
      bullets: [
        L('use server marks a function to run on the server.', 'Директива use server помечает функцию для выполнения на сервере.'),
        L('useActionState returns the state, a dispatch function and a pending flag.', 'useActionState возвращает состояние, функцию отправки и признак ожидания.'),
        L('The action receives the previous state and the form data.', 'Действие получает предыдущее состояние и данные формы.'),
        L('A form with a real action attribute works without JavaScript.', 'Форма с настоящим атрибутом action работает без JavaScript.'),
        L('An action is a public endpoint and needs its own authorisation.', 'Серверное действие — публичная точка входа, ей нужна своя авторизация.'),
        L('Disable the submit button while the action is pending.', 'Отключайте кнопку отправки, пока действие в ожидании.'),
      ],
      code: `import { useActionState } from 'react';

async function submitProfile(prevState, formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Name is required' };
  await saveProfile({ name });
  return { error: null };
}

function ProfileForm() {
  const [state, formAction, isPending] = useActionState(submitProfile, { error: null });

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`,
      callouts: [
        {
          tone: 'pitfall',
          title: L('Only onSubmit', 'Только onSubmit'),
          text: L(
            'A form whose server action is reachable only from a React handler stops working the moment the script fails to load. Wire the action attribute as well, and let React enhance the native submission instead of replacing it.',
            'Форма, серверное действие которой доступно только из React-обработчика, перестаёт работать, как только скрипт не загрузился. Подключите и атрибут action, и позвольте React улучшать нативную отправку, а не заменять её.'
          ),
        },
        {
          tone: 'warning',
          title: L('The action is an endpoint', 'Действие — это точка входа'),
          text: L(
            'Anyone can call a server action, exactly like any other public endpoint. Check the session, check the permissions and validate the payload on the server. A disabled button is a hint to the user, not a protection.',
            'Серверное действие может вызвать кто угодно, как и любую другую публичную точку входа. Проверяйте сессию, права и данные на сервере. Отключённая кнопка — подсказка пользователю, а не защита.'
          ),
        },
      ],
      takeaway: L(
        'Give the form a real action, disable the button while it is pending, and validate on the server as if the client were hostile.',
        'Дайте форме настоящее действие, отключайте кнопку во время ожидания и проверяйте на сервере так, будто клиент враждебен.'
      ),
      seeAlso: [
        L('Section 11-4: React 19 APIs, use, actions and the form status', 'Секция 11-4: API React 19, use, действия и статус формы'),
        L('Section 9-5: accessibility of forms', 'Секция 9-5: доступность форм'),
      ],
    },
    {
      id: 'react-ch9-s5',
      title: L('Accessibility of forms', 'Доступность форм'),
      body: L(
        'A form is the part of an interface where accessibility failures hurt the most, because the person using it cannot see the label, cannot hear the error and does not know where the cursor is. The baseline is not ARIA, it is the native elements: a label element associated with the control, a real button, a real submit event, and the browser own error messages.\n\nThe association between a label and its field is made with htmlFor on the label and id on the control, or by nesting the control inside the label. A placeholder is not a label: it disappears the moment the user types, it is invisible to some screen readers, and browsers use placeholder colours for different purposes. A label that stays visible tells the user what the field is for and gives a larger click target.\n\nTo connect an error to its field, three things go together: aria-invalid on the control tells assistive technology that the value is not acceptable, aria-describedby points at the element holding the message, and the message element itself is announced when it appears. A message that is only a red border is invisible to a screen reader and invisible to anyone with low vision, and colour alone is never the signal.\n\nFocus is part of the form. When a submission fails, move the focus to the first invalid field so the person knows where to continue, and put a summary of the errors at the top of the form with links to the fields. The required and disabled attributes are the last pieces: required is a real constraint that the browser enforces and announces, and disabled removes the control from the tab order entirely, so a field that must be filled in later should be disabled with an explanation rather than silently skipped.',
        'Форма — та часть интерфейса, где сбои доступности бьют сильнее всего, потому что человек, который ею пользуется, не видит метку, не слышит ошибку и не понимает, где курсор. Базовая линия — не ARIA, а нативные элементы: элемент label, связанный с полем, настоящая кнопка, настоящее событие submit и собственные сообщения браузера об ошибках.\n\nСвязь метки и поля задаётся через htmlFor у label и id у контрола либо вложением контрола внутрь label. Placeholder — не метка: он исчезает, как только пользователь начинает печатать, его не читают некоторые скринридеры, а браузеры используют цвет placeholder для разных целей. Видимая метка говорит, для чего поле, и даёт увеличенную область клика.\n\nЧтобы связать ошибку с полем, нужны три вещи: aria-invalid на контроле сообщает вспомогательным технологиям, что значение неприемлемо, aria-describedby указывает на элемент с сообщением, а сам элемент сообщения объявляется при появлении. Сообщение, выраженное только красной рамкой, невидимо для скринридера и невидимо для человека со слабым зрением: цвет сам по себе никогда не является сигналом.\n\nФокус — часть формы. Если отправка не удалась, переведите фокус на первое невалидное поле, чтобы человек понял, где продолжать, и соберите сводку ошибок в начале формы со ссылками на поля. Атрибуты required и disabled — последние детали: required это настоящее ограничение, которое браузер проверяет и объявляет, а disabled полностью убирает контрол из порядка обхода, поэтому поле, которое предстоит заполнить позже, лучше отключить с пояснением, а не пропускать молча.'
      ),
      bullets: [
        L('A placeholder is not a label, use label with htmlFor.', 'Placeholder — не метка, используйте label с htmlFor.'),
        L('aria-invalid marks the control, aria-describedby points at the message.', 'aria-invalid помечает поле, aria-describedby указывает на сообщение.'),
        L('A red border alone says nothing to a screen reader.', 'Красная рамка сама по себе ничего не говорит скринридеру.'),
        L('Move the focus to the first invalid field after a failed submit.', 'После неудачной отправки переведите фокус на первое невалидное поле.'),
        L('required is enforced and announced by the browser.', 'required проверяется и объявляется браузером.'),
        L('disabled removes the control from the tab order.', 'disabled убирает поле из порядка обхода.'),
      ],
      code: `function EmailField({ value, error, onChange }) {
  const errorId = 'email-error';

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        required
      />
      {error && <p id={errorId} role="alert">{error}</p>}
    </div>
  );
}`,
      table: {
        caption: L('Attributes that carry form accessibility', 'Атрибуты доступности форм'),
        headers: [L('Attribute', 'Атрибут'), L('On', 'Где'), L('Purpose', 'Назначение')],
        rows: [
          [L('htmlFor and id', 'htmlFor и id'), L('label and control', 'label и поле'), L('Associates the label with the control', 'Связывает метку с полем')],
          [L('aria-invalid', 'aria-invalid'), L('input', 'input'), L('Marks the value as not acceptable', 'Помечает значение как неприемлемое')],
          [L('aria-describedby', 'aria-describedby'), L('input', 'input'), L('Points at the help or error text', 'Указывает на подсказку или текст ошибки')],
          [L('role="alert"', 'role="alert"'), L('message element', 'элемент сообщения'), L('Announces the message when it appears', 'Объявляет сообщение при появлении')],
          [L('required', 'required'), L('input', 'input'), L('Makes the field mandatory, the browser enforces it', 'Делает поле обязательным, браузер проверяет')],
          [L('disabled', 'disabled'), L('button and input', 'кнопка и поле'), L('Removes the control from the tab order', 'Убирает контрол из порядка обхода')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The placeholder as a label', 'Placeholder вместо метки'),
          text: L(
            'A placeholder vanishes as soon as the user types, so the field becomes unlabelled exactly when the person is checking what to enter. Many screen readers skip placeholders entirely, and the muted grey text is a poor contrast for a low-vision user.',
            'Placeholder исчезает, как только пользователь начинает печатать, и поле остаётся без метки ровно тогда, когда человек проверяет, что вводить. Многие скринридеры пропускают placeholder, а приглушённый серый текст даёт слабый контраст для человека со слабым зрением.'
          ),
        },
        {
          tone: 'tip',
          title: L('An error summary at the top', 'Сводка ошибок в начале формы'),
          text: L(
            'A short list of the problems with links to the fields saves the user from hunting for a red border. Move the focus to that summary after a failed submit, and let the links move the focus further.',
            'Короткий список проблем со ссылками на поля избавляет пользователя от поиска красной рамки. После неудачной отправки переведите фокус на эту сводку, а по ссылкам — на конкретные поля.'
          ),
        },
      ],
      takeaway: L(
        'Label every control, describe every error with aria-describedby, and move the focus to the first thing that needs fixing.',
        'Подпишите каждое поле, опишите каждую ошибку через aria-describedby и переведите фокус на первое, что нужно исправить.'
      ),
      seeAlso: [
        L('html-css, Chapter 3: accessibility and keyboard navigation', 'html-css, Глава 3: доступность и навигация с клавиатуры'),
        L('Section 9-2: controlled inputs and validation', 'Секция 9-2: контролируемые поля и валидация'),
      ],
    },
  ],
};
