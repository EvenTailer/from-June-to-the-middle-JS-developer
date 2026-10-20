import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const formsTasks: PracticeTask[] = [
  {
    id: 'topic-forms-1',
    moduleId: 'react',
    topic: 'forms',
    level: 'basic',
    title: L('Field level error messages', 'Сообщения об ошибках у полей'),
    brief: L(
      'Write a controlled login form with the error message shown next to the field that caused it. The form has two fields: email of type string and password of type string, both kept in the state. On submit the form must not reload the page, so call preventDefault on the event. The email is valid when it contains the symbol @, and the password is valid when it is at least 8 characters long. Each invalid field must show its own p element with the role "alert" and the text "Enter a valid email" or "Password must be at least 8 characters". The input of an invalid field must have the attribute aria-invalid set to "true" and the attribute aria-describedby pointing to the id of its message. Example: the email "ann" and the password "123" show both messages, and the email "ann@example.com" with the password "12345678" shows none.',
      'Напишите контролируемую форму входа, где сообщение об ошибке показывается у того поля, которое её вызвало. У формы два поля: email типа string и password типа string, оба в состоянии. При отправке форма не должна перезагружать страницу, поэтому у события вызывается preventDefault. Email корректен, если содержит символ @, а пароль корректен, если содержит не меньше 8 символов. Каждое некорректное поле показывает свой элемент p с ролью "alert" и текстом "Enter a valid email" или "Password must be at least 8 characters". У некорректного поля атрибут aria-invalid равен "true", а атрибут aria-describedby указывает на id его сообщения. Пример: почта "ann" и пароль "123" показывают оба сообщения, а почта "ann@example.com" с паролем "12345678" не показывают ни одного.'
    ),
    hint: L(
      'Keep the errors in a separate state object, fill it in a validate function that returns the errors, and render each message only when the field has one. Linking the input and the message with aria-describedby lets a screen reader read the error together with the field.',
      'Храните ошибки в отдельном объекте состояния, заполняйте его в функции validate, которая возвращает ошибки, и выводите каждое сообщение только когда у поля оно есть. Связка поля и сообщения через aria-describedby позволяет скринридеру прочитать ошибку вместе с полем.'
    ),
    solution: `import { useState, type FormEvent } from 'react';

interface Errors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};

    if (!email.includes('@')) {
      next.email = 'Enter a valid email';
    }

    if (password.length < 8) {
      next.password = 'Password must be at least 8 characters';
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('submit', { email, password });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email ? (
        <p id="email-error" role="alert">
          {errors.email}
        </p>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-invalid={Boolean(errors.password)}
        aria-describedby={errors.password ? 'password-error' : undefined}
      />
      {errors.password ? (
        <p id="password-error" role="alert">
          {errors.password}
        </p>
      ) : null}

      <button type="submit">Sign in</button>
    </form>
  );
}`,
    explanation: L(
      'The validate function returns an object of errors instead of writing them into the state itself, which keeps the rule of validation separate from the rule of rendering and makes the function easy to test. The attribute noValidate turns off the built-in browser validation, so that the messages of the application are the only ones the user sees. The role "alert" makes the message announce itself as soon as it appears, and aria-describedby ties it to the input, so a screen reader reads the error right after the name of the field. The state of the errors is separate from the state of the values, and it is updated only on submit, so the form does not shout at the user while they are still typing the first letter.',
      'Функция validate возвращает объект ошибок, а не пишет их в состояние сама, и это отделяет правило проверки от правила отображения и делает функцию легко тестируемой. Атрибут noValidate отключает встроенную проверку браузера, чтобы сообщениями приложения были только одни. Роль "alert" заставляет сообщение объявить себя сразу при появлении, а aria-describedby связывает его с полем, так что скринридер читает ошибку сразу после имени поля. Состояние ошибок отделено от состояния значений и обновляется только при отправке, поэтому форма не ругается на пользователя, пока он печатает первую букву.'
    ),
  },
  {
    id: 'topic-forms-2',
    moduleId: 'react',
    topic: 'forms',
    level: 'basic',
    title: L('An uncontrolled form that reads FormData', 'Неконтролируемая форма с чтением FormData'),
    brief: L(
      'Write an uncontrolled profile form that reads its values from the FormData of the submit event instead of keeping them in the React state. The form has a text input with the name "name", an input of type email with the name "email", and a select with the name "role" and the options "admin", "editor" and "viewer", where the default value is "viewer". The submit handler must call preventDefault and must read the values with the method get of the FormData, and a missing value must be read as an empty string. The handler must build an object with the fields name, email and role, where every value is a string, and log it. Example: for the name "Ann", the email "ann@example.com" and the role "admin" the logged object is { name: "Ann", email: "ann@example.com", role: "admin" }.',
      'Напишите неконтролируемую форму профиля, которая читает значения из FormData события отправки, а не хранит их в состоянии React. У формы есть текстовое поле с именем "name", поле типа email с именем "email" и select с именем "role" и вариантами "admin", "editor" и "viewer", где значение по умолчанию "viewer". Обработчик отправки должен вызвать preventDefault и читать значения методом get у FormData, а отсутствующее значение должно читаться как пустая строка. Обработчик должен собрать объект с полями name, email и role, где каждое значение — строка, и залогировать его. Пример: для имени "Ann", почты "ann@example.com" и роли "admin" залогированный объект равен { name: "Ann", email: "ann@example.com", role: "admin" }.'
    ),
    hint: L(
      'The method get of FormData returns a FormDataEntryValue, which is either a string or a File, so the result has to be converted to a string. The name of the field is the key of the entry, and it is the name attribute of the input.',
      'Метод get у FormData возвращает FormDataEntryValue, то есть строку или File, поэтому результат нужно привести к строке. Имя поля — это ключ записи, и это атрибут name у input.'
    ),
    solution: `import type { FormEvent } from 'react';

export function ProfileForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      role: String(data.get('role') ?? 'viewer'),
    };

    console.log(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" defaultValue="" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" defaultValue="" />

      <label htmlFor="role">Role</label>
      <select id="role" name="role" defaultValue="viewer">
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>

      <button type="submit">Save</button>
    </form>
  );
}`,
    explanation: L(
      'The FormData object is created from the form element itself, and the name attribute of each field is the key of the entry, so no state is needed and no re-render happens while the user types. The value of get is a FormDataEntryValue, which may be a File, so the result is converted with String, and the nullish coalescing operator protects the case when a field is missing from the form. A form created this way is also the easiest one to submit as a file or to send to the server as multipart data, because the browser already knows how to serialize it. The price of the uncontrolled approach is that the values of the fields cannot be used for live validation, since the application does not know them.',
      'Объект FormData создаётся из самой формы, и атрибут name каждого поля — это ключ записи, поэтому состояние не нужно и рендера при вводе не происходит. Значение get — это FormDataEntryValue, то есть строка или File, поэтому результат приводится через String, а оператор ?? защищает случай, когда поля нет в форме. Форма, созданная так, — ещё и самая простая для отправки файла или для передачи на сервер как multipart-данные, потому что браузер уже умеет её сериализовать. Цена неконтролируемого подхода в том, что значения полей нельзя использовать для живой валидации, потому что приложение их не знает.'
    ),
  },
  {
    id: 'topic-forms-3',
    moduleId: 'react',
    topic: 'forms',
    level: 'basic',
    title: L('Resetting a form after the submit', 'Сброс формы после отправки'),
    brief: L(
      'Write a contact form that clears itself after a successful submit. The form has a text input with the name "name", an input of type email with the name "email" and a textarea with the name "message". The submit handler must call preventDefault, read the values with the FormData of the event, log them, and then clear the form. The form element must be reachable through a ref of the type RefObject<HTMLFormElement | null>, because the reset method of the form clears the fields and the default values of the inputs. A second button with the text "Clear" of type "button" must clear the form without submitting it, and it must call the same reset method through the ref. After a successful submit the component must also show the text "Sent" in a p element with the role "status". Example: after sending a message the three fields are empty again and the p element contains "Sent".',
      'Напишите форму обратной связи, которая очищает себя после успешной отправки. У формы есть текстовое поле с именем "name", поле типа email с именем "email" и textarea с именем "message". Обработчик отправки должен вызвать preventDefault, прочитать значения через FormData события, залогировать их и затем очистить форму. Элемент формы должен быть доступен через ref типа RefObject<HTMLFormElement | null>, потому что метод reset у формы очищает поля и возвращает им значения по умолчанию. Вторая кнопка с текстом "Clear" типа "button" должна очищать форму без отправки, вызывая тот же метод reset через ref. После успешной отправки компонент также должен показывать текст "Sent" в элементе p с ролью "status". Пример: после отправки сообщения три поля снова пусты, а в элементе p написано "Sent".'
    ),
    hint: L(
      'The reset method of the form is the only way to clear the uncontrolled fields, and it needs a reference to the form element. The button that only clears must have the type "button", otherwise the browser submits the form by default.',
      'Метод reset у формы — единственный способ очистить неконтролируемые поля, и ему нужна ссылка на элемент формы. Кнопка, которая только очищает, должна иметь тип "button", иначе браузер по умолчанию отправит форму.'
    ),
    solution: `import { useRef, useState, type FormEvent } from 'react';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(Object.fromEntries(data.entries()));

    event.currentTarget.reset();
    setStatus('sent');
  }

  function handleClear() {
    formRef.current?.reset();
    setStatus('idle');
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" defaultValue="" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" defaultValue="" />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" defaultValue="" />

      <button type="submit">Send</button>
      <button type="button" onClick={handleClear}>
        Clear
      </button>

      {status === 'sent' ? <p role="status">Sent</p> : null}
    </form>
  );
}`,
    explanation: L(
      'The reset method of the form element restores the default values of the fields, so it only makes sense for an uncontrolled form, and it is the shortest way to clear three fields at once. The ref is needed for the button that clears the form without submitting it, because in that case there is no submit event and no event.currentTarget to take the form from. The button carries the type "button", since a button inside a form defaults to the type submit and would send the form on every click. The message with the role "status" is announced politely, so a screen reader user learns that the message was sent without the alert interrupting whatever was being read.',
      'Метод reset у элемента формы возвращает полям значения по умолчанию, поэтому он осмыслен только для неконтролируемой формы и это самый короткий способ очистить три поля сразу. Ref нужен кнопке, которая очищает форму без отправки, потому что в этом случае нет события отправки и нет event.currentTarget, у которого можно взять форму. У кнопки указан тип "button", потому что кнопка внутри формы по умолчанию имеет тип submit и отправляла бы форму при каждом клике. Сообщение с ролью "status" объявляется вежливо, поэтому пользователь скринридера узнает об отправке, и alert не прервал бы то, что читалось.'
    ),
  },
  {
    id: 'topic-forms-4',
    moduleId: 'react',
    topic: 'forms',
    level: 'intermediate',
    title: L('A form in a reducer with validation', 'Форма в редьюсере с валидацией'),
    brief: L(
      'Write a sign in form whose whole state lives in a reducer. The state has three fields: values, an object with the strings email and password; errors, an object where both keys are optional strings; and submitted, a boolean. The reducer handles three actions: change with the field name and the new value, submit, and reset. On the action change the new value is written into values, and the errors are recalculated only if the form was already submitted, so that the form does not shout before the first attempt. On the action submit the errors are calculated and the flag submitted becomes true. On the action reset the state returns to the initial state. The email must match the pattern of a simple address and the password must be at least 8 characters long. The component must render the values as the value of the inputs, the errors under the fields, and the buttons with the text "Sign in" and "Reset". Example: after the first attempt with the empty fields both errors are shown, and after that typing a valid email removes only the error of the email.',
      'Напишите форму входа, у которой всё состояние живёт в редьюсере. У состояния три поля: values, объект со строками email и password; errors, объект, где оба ключа необязательные строки; и submitted, логическое значение. Редьюсер обрабатывает три действия: change с именем поля и новым значением, submit и reset. При действии change новое значение записывается в values, а ошибки пересчитываются только если форма уже была отправлена, чтобы форма не ругалась до первой попытки. При действии submit ошибки вычисляются и флаг submitted становится истинным. При действии reset состояние возвращается к начальному. Email должен соответствовать шаблону простого адреса, а пароль должен содержать не меньше 8 символов. Компонент должен выводить значения как value у полей, ошибки под полями, и кнопки с текстами "Sign in" и "Reset". Пример: после первой попытки с пустыми полями показаны обе ошибки, и после этого ввод корректного email убирает только ошибку email.'
    ),
    hint: L(
      'Type the action as a union of the three variants and narrow it in the switch. A reducer must return a new object instead of mutating the state, and the switch must return from every branch.',
      'Типизируйте действие как объединение трёх вариантов и сужайте его в switch. Редьюсер должен возвращать новый объект, а не менять состояние, и switch должен возвращать значение из каждой ветки.'
    ),
    solution: `import { useReducer, type FormEvent } from 'react';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface FormState {
  values: FormValues;
  errors: FormErrors;
  submitted: boolean;
}

type FormAction =
  | { type: 'change'; field: keyof FormValues; value: string }
  | { type: 'submit' }
  | { type: 'reset' };

const initialState: FormState = {
  values: { email: '', password: '' },
  errors: {},
  submitted: false,
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email';
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'change': {
      const values =
        action.field === 'email'
          ? { ...state.values, email: action.value }
          : { ...state.values, password: action.value };

      return {
        ...state,
        values,
        errors: state.submitted ? validate(values) : state.errors,
      };
    }

    case 'submit': {
      return {
        ...state,
        errors: validate(state.values),
        submitted: true,
      };
    }

    case 'reset': {
      return initialState;
    }
  }
}

export function SignInForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: 'submit' });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={state.values.email}
        onChange={(event) =>
          dispatch({ type: 'change', field: 'email', value: event.target.value })
        }
        aria-invalid={Boolean(state.errors.email)}
      />
      {state.errors.email ? <p role="alert">{state.errors.email}</p> : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={state.values.password}
        onChange={(event) =>
          dispatch({ type: 'change', field: 'password', value: event.target.value })
        }
        aria-invalid={Boolean(state.errors.password)}
      />
      {state.errors.password ? <p role="alert">{state.errors.password}</p> : null}

      <button type="submit">Sign in</button>
      <button type="button" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </form>
  );
}`,
    explanation: L(
      'A reducer keeps the changes of the form in one place, so the component only describes what happened instead of how the state is patched, and the rules of the form can be tested without rendering anything. The union of the actions is what makes the reducer safe: after the check on action.type the fields of that action are known, and an action that does not exist cannot be dispatched. The flag submitted is what separates the first attempt from the later ones, because the errors are only interesting after the user has tried to send the form. The reducer never mutates the state, it returns a new object, and the switch returns from every branch, because a fallthrough would silently reuse the state of another branch.',
      'Редьюсер собирает изменения формы в одном месте, поэтому компонент описывает только что произошло, а не как патчится состояние, и правила формы можно тестировать без рендера. Объединение действий делает редьюсер безопасным: после проверки action.type поля этого действия известны, а несуществующее действие отправить нельзя. Флаг submitted отделяет первую попытку от последующих, потому что ошибки становятся интересны только после попытки отправки. Редьюсер никогда не меняет состояние, а возвращает новый объект, и switch возвращает значение из каждой ветки, потому что проваливание молча использовало бы состояние другой ветки.'
    ),
  },
  {
    id: 'topic-forms-5',
    moduleId: 'react',
    topic: 'forms',
    level: 'intermediate',
    title: L('A multi step wizard', 'Многошаговый мастер'),
    brief: L(
      'Write a sign up wizard with three steps: Account, Plan and Confirm. The component keeps the index of the current step in the state, starting from 0, and the data of the form in another state, with the strings name, email and plan, where the plan is "free" by default. Each step renders only its own fields and the active step is marked in a list of three items, where the active one has the attribute aria-current set to "page" and the other ones do not have it. The button "Next" moves to the next step, and the button "Back" moves to the previous one; on the last step the button "Next" is replaced by the button "Finish", and clicking it logs the collected data. The button "Back" must be disabled on the first step, and the button "Next" must be disabled on the second step when the email field is empty. Example: with the name "Ann" and the email "ann@example.com" the wizard reaches the third step and the Finish button logs the object with these values and the plan "free".',
      'Напишите мастер регистрации из трёх шагов: Account, Plan и Confirm. Компонент хранит индекс текущего шага в состоянии, начиная с 0, и данные формы в другом состоянии, со строками name, email и plan, где plan по умолчанию "free". Каждый шаг выводит только свои поля, а активный шаг отмечен в списке из трёх элементов, где у активного атрибут aria-current равен "page", а у остальных его нет. Кнопка "Next" переходит к следующему шагу, кнопка "Back" к предыдущему; на последнем шаге кнопка "Next" заменяется кнопкой "Finish", и её нажатие логирует собранные данные. Кнопка "Back" должна быть отключена на первом шаге, а кнопка "Next" на втором шаге отключена, если поле email пустое. Пример: с именем "Ann" и почтой "ann@example.com" мастер доходит до третьего шага, и кнопка Finish логирует объект с этими значениями и планом "free".'
    ),
    hint: L(
      'Keep the index of the step and the data in two separate states, and derive the visible step from the index instead of storing the rendered step. The steps can be an array of objects with a title and a render function.',
      'Держите индекс шага и данные в двух отдельных состояниях, а видимый шаг выводите из индекса, вместо того чтобы хранить его. Шаги могут быть массивом объектов с заголовком и функцией рендера.'
    ),
    solution: `import { useState, type ReactNode } from 'react';

interface WizardData {
  name: string;
  email: string;
  plan: 'free' | 'pro';
}

const stepTitles = ['Account', 'Plan', 'Confirm'];

export function SignupWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({ name: '', email: '', plan: 'free' });

  const isLast = step === stepTitles.length - 1;
  const canGoNext = step !== 1 || data.email.trim() !== '';

  function renderStep(): ReactNode {
    if (step === 0) {
      return (
        <>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={data.name}
            onChange={(event) =>
              setData((current) => ({ ...current, name: event.target.value }))
            }
          />
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(event) =>
              setData((current) => ({ ...current, email: event.target.value }))
            }
          />
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            value={data.plan}
            onChange={(event) =>
              setData((current) => ({
                ...current,
                plan: event.target.value === 'pro' ? 'pro' : 'free',
              }))
            }
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
        </>
      );
    }

    return (
      <dl>
        <dt>Name</dt>
        <dd>{data.name}</dd>
        <dt>Email</dt>
        <dd>{data.email}</dd>
        <dt>Plan</dt>
        <dd>{data.plan}</dd>
      </dl>
    );
  }

  function handleNext() {
    if (isLast) {
      console.log(data);
      return;
    }

    setStep((current) => current + 1);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleNext();
      }}
    >
      <ol>
        {stepTitles.map((title, index) => (
          <li key={title} aria-current={index === step ? 'page' : undefined}>
            {title}
          </li>
        ))}
      </ol>

      <section aria-label={stepTitles[step]}>{renderStep()}</section>

      <button type="button" onClick={() => setStep((current) => current - 1)} disabled={step === 0}>
        Back
      </button>
      <button type="submit" disabled={!canGoNext}>
        {isLast ? 'Finish' : 'Next'}
      </button>
    </form>
  );
}`,
    explanation: L(
      'The index of the step and the data of the form are two different kinds of information, and keeping them in two states makes each of them simple. The visible step is derived from the index instead of being stored, so there is no way for the two to disagree. The rule of the step is a single boolean called canGoNext, computed from the data, so the button and the logic cannot drift apart. The data is updated with the functional form of the setter, so two quick changes of the same field do not overwrite each other. The wizard keeps all the data in one state object, so the last step can show a summary without the form having to be submitted at every step.',
      'Индекс шага и данные формы — это два разных вида информации, и в двух состояниях каждый из них остаётся простым. Видимый шаг выводится из индекса, а не хранится, поэтому им разойтись невозможно. Правило шага — это один логический флаг canGoNext, вычисленный из данных, поэтому кнопка и логика не разойдутся. Данные обновляются функциональной формой сеттера, поэтому два быстрых изменения одного поля не затирают друг друга. Мастер держит все данные в одном объекте состояния, поэтому последний шаг может показать сводку, не отправляя форму на каждом шаге.'
    ),
  },
  {
    id: 'topic-forms-6',
    moduleId: 'react',
    topic: 'forms',
    level: 'advanced',
    title: L('An async submit with a pending state', 'Асинхронная отправка с состоянием ожидания'),
    brief: L(
      'Write a subscribe form that sends the data to the server and shows the progress, the success and the failure. The component keeps the status in the state as a string that is one of "idle", "pending", "done" and "error", and keeps the message of the error in another state. On submit the handler must call preventDefault, set the status to "pending" and clear the previous error, then send a request with fetch using the method POST, the header Content-Type set to application/json and the body as a JSON string with the field email. When the answer arrives with the status ok the component must set the status to "done", otherwise it must throw an Error with the message "Request failed with status " and the code of the answer. A thrown error must be caught, and the caught value must set the status to "error" and show the message of the error. While the status is "pending" the button must be disabled and its text must be "Sending", otherwise the text is "Subscribe". The success message must be rendered in a p element with the role "status" and the error message in a p element with the role "alert". Example: when the server answers with the code 500 the page shows the text "Request failed with status 500".',
      'Напишите форму подписки, которая отправляет данные на сервер и показывает прогресс, успех и сбой. Компонент хранит статус в состоянии в виде строки, которая равна одной из "idle", "pending", "done" и "error", и хранит сообщение об ошибке в другом состоянии. При отправке обработчик должен вызвать preventDefault, выставить статус "pending" и очистить прежнюю ошибку, затем отправить запрос через fetch методом POST, заголовком Content-Type со значением application/json и телом в виде JSON-строки с полем email. Когда ответ приходит с успешным статусом, компонент должен выставить статус "done", иначе он должен выбросить Error с сообщением "Request failed with status " и кодом ответа. Выброшенная ошибка перехватывается, и перехваченное значение должно выставить статус "error" и показать сообщение ошибки. Пока статус "pending", кнопка отключена и её текст "Sending", иначе текст "Subscribe". Сообщение об успехе выводится в элемент p с ролью "status", а сообщение об ошибке в элемент p с ролью "alert". Пример: когда сервер отвечает кодом 500, страница показывает текст "Request failed with status 500".'
    ),
    hint: L(
      'A fetch that answers with the code 500 does not throw by itself, so the code of the answer has to be checked explicitly. The catch block receives a value of the unknown type, so the message is taken with a check for the Error type.',
      'Ответ fetch с кодом 500 сам по себе не бросает исключение, поэтому код ответа нужно проверить явно. Блок catch получает значение типа unknown, поэтому сообщение берётся с проверкой на тип Error.'
    ),
    solution: `import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'pending' | 'done' | 'error';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('pending');
    setError(null);

    try {
      const response = await fetch('https://api.example.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(\`Request failed with status \${response.status}\`);
      }

      setStatus('done');
    } catch (cause) {
      setStatus('error');
      setError(cause instanceof Error ? cause.message : 'Unknown error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === 'pending'}
      />

      <button type="submit" disabled={status === 'pending'}>
        {status === 'pending' ? 'Sending' : 'Subscribe'}
      </button>

      {status === 'done' ? <p role="status">Subscribed</p> : null}
      {status === 'error' ? <p role="alert">{error}</p> : null}
    </form>
  );
}`,
    explanation: L(
      'The status is a single field with a closed set of values, so the component cannot be in two states at once, which is what happens when a boolean flag for the loading and another one for the error are used together. The check on response.ok is needed because a fetch only rejects on a network failure, and a server that answers with the code 500 is a perfectly successful request from the point of view of the network. The value caught by the catch block has the type unknown, so the message is taken after a check for the Error type, otherwise a rejected string would produce the message "Unknown error" for no reason. The disabled button prevents a second submit while the first one is still running, and the two roles distinguish a polite confirmation from an urgent failure.',
      'Статус — это одно поле с закрытым набором значений, поэтому компонент не может оказаться в двух состояниях сразу, а это и случается, когда используют отдельный флаг загрузки и отдельный флаг ошибки. Проверка response.ok нужна потому, что fetch отклоняется только при сетевом сбое, а сервер с кодом 500 — совершенно успешный запрос с точки зрения сети. Перехваченное значение имеет тип unknown, поэтому сообщение берётся после проверки на тип Error, иначе отклонённая строка дала бы "Unknown error" без причины. Отключённая кнопка не даёт отправить форму повторно, пока первый запрос ещё идёт, а две роли различают вежливое подтверждение и срочный сбой.'
    ),
  },
  {
    id: 'topic-forms-7',
    moduleId: 'react',
    topic: 'forms',
    level: 'advanced',
    title: L('A file upload with a preview', 'Загрузка файла с предпросмотром'),
    brief: L(
      'Write a component AvatarUpload that shows a preview of the chosen image. The component keeps the preview in the state as an object with the fields name of type string, size of type number and url of type string, or null when nothing is chosen, and keeps the message of the error in another state. The file input has the attribute accept with the value "image/*" and its change handler must read the file from the files of the event. The file is rejected with the message "Only image files are allowed" when its type does not start with "image/", and with the message "File must be smaller than 1 MB" when its size is bigger than 1048576 bytes. When the file is accepted, the url of the preview is created with the function URL.createObjectURL, and the preview renders an img element with the url as the source and the name of the file as the alternative text, plus a p element with the name of the file and its size in kilobytes. The button "Remove" must call URL.revokeObjectURL with the url of the preview, clear the preview and reset the value of the input through a ref, otherwise the same file cannot be chosen again. Example: choosing the file photo.png of 2048 bytes shows the image and the text "photo.png (2 KB)".',
      'Напишите компонент AvatarUpload, показывающий предпросмотр выбранного изображения. Компонент хранит предпросмотр в состоянии в виде объекта с полями name типа string, size типа number и url типа string, либо null, если ничего не выбрано, и хранит сообщение об ошибке в другом состоянии. Поле выбора файла имеет атрибут accept со значением "image/*", а его обработчик изменения должен читать файл из files события. Файл отклоняется с сообщением "Only image files are allowed", если его тип не начинается с "image/", и с сообщением "File must be smaller than 1 MB", если его размер больше 1048576 байт. Когда файл принят, url предпросмотра создаётся функцией URL.createObjectURL, а предпросмотр выводит элемент img с этим url в качестве источника и именем файла в качестве альтернативного текста, а также элемент p с именем файла и его размером в килобайтах. Кнопка "Remove" должна вызвать URL.revokeObjectURL с url предпросмотра, очистить предпросмотр и сбросить значение поля через ref, иначе тот же файл нельзя будет выбрать снова. Пример: выбор файла photo.png размером 2048 байт показывает картинку и текст "photo.png (2 KB)".'
    ),
    hint: L(
      'The object URL keeps the file in the memory of the browser, and it has to be released with revokeObjectURL when it is no longer needed. The value of the input has to be reset by hand, because the browser does not allow the same file to be chosen twice in a row.',
      'Object URL держит файл в памяти браузера, и его нужно освободить через revokeObjectURL, когда он больше не нужен. Значение поля приходится сбрасывать вручную, потому что браузер не даёт выбрать один и тот же файл дважды подряд.'
    ),
    solution: `import { useRef, useState, type ChangeEvent } from 'react';

interface Preview {
  name: string;
  size: number;
  url: string;
}

const MAX_SIZE = 1024 * 1024;

export function AvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('File must be smaller than 1 MB');
      return;
    }

    setError(null);
    setPreview({ name: file.name, size: file.size, url: URL.createObjectURL(file) });
  }

  function handleRemove() {
    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div>
      <label htmlFor="avatar">Avatar</label>
      <input
        id="avatar"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {error ? <p role="alert">{error}</p> : null}

      {preview ? (
        <div>
          <img src={preview.url} alt={preview.name} width={96} height={96} />
          <p>
            {preview.name} ({Math.round(preview.size / 1024)} KB)
          </p>
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}`,
    explanation: L(
      'The object URL is a temporary address of the file inside the browser, and it keeps the file in the memory until it is revoked, so a component that shows previews and forgets to release them leaks memory. The size check happens before the object URL is created, so a rejected file never occupies anything. The type check relies on the type of the file, which comes from the extension and from the header of the file, and the accept attribute of the input is only a filter for the dialog of the file system, not a protection, so the check in the code is the one that matters. Resetting the value of the input by hand is required, because the browser keeps the chosen file and would not fire the change event for the same file again. The alternative text of the image is the name of the file, which tells a screen reader user what they are looking at.',
      'Object URL — это временный адрес файла внутри браузера, и он держит файл в памяти до тех пор, пока его не отозвали, поэтому компонент с предпросмотром, который забывает это сделать, течёт по памяти. Проверка размера идёт до создания object URL, поэтому отклонённый файл ничего не занимает. Проверка типа опирается на тип файла, который определяется по расширению и по заголовку файла, а атрибут accept у поля — это лишь фильтр диалога файловой системы, а не защита, поэтому важна именно проверка в коде. Значение поля приходится сбрасывать вручную, потому что браузер сохраняет выбранный файл и не выстрелит событием change для того же файла снова. Альтернативный текст картинки — имя файла, и это сообщает пользователю скринридера, что он видит.'
    ),
  },
  {
    id: 'topic-forms-8',
    moduleId: 'react',
    topic: 'forms',
    level: 'advanced',
    title: L('A search input with a debounced request', 'Поиск с отложенным запросом'),
    brief: L(
      'Write a user search that does not send a request on every keystroke. The component keeps the text in the input in one state, the debounced text in another state, the results in a third state, the flag of the loading in a fourth state and the message of the error in a fifth state. The debounced text is updated by a timer of 300 milliseconds that is restarted on every change of the text and that is cancelled when the component unmounts. The request is sent only when the debounced text changes, it goes to the address https://api.example.com/users with the parameter q equal to the debounced text, and it is cancelled with an AbortController when the debounced text changes again or when the component unmounts. The answer is an array of objects with the fields id of type number and name of type string. A response that arrives after a newer request was started must be ignored, which is checked with a counter of the requests kept in a ref. Example: after the text "ann" has been typed and 300 milliseconds have passed, the request with the parameter q equal to "ann" is sent, and typing more characters does not send a request until the timer expires again.',
      'Напишите поиск пользователей, который не отправляет запрос на каждый введённый символ. Компонент хранит текст поля ввода в одном состоянии, отложенный текст в другом, результаты в третьем, флаг загрузки в четвёртом и сообщение об ошибке в пятом. Отложенный текст обновляется таймером на 300 миллисекунд, который перезапускается при каждом изменении текста и который отменяется при размонтировании компонента. Запрос отправляется только при изменении отложенного текста, он идёт на адрес https://api.example.com/users с параметром q, равным отложенному тексту, и отменяется через AbortController, когда отложенный текст меняется снова или когда компонент размонтируется. Ответ — это массив объектов с полями id типа number и name типа string. Ответ, пришедший после начала более нового запроса, должен быть проигнорирован, и это проверяется счётчиком запросов, который хранится в ref. Пример: после ввода текста "ann" и через 300 миллисекунд отправляется запрос с параметром q равным "ann", и дальнейший набор символов не отправляет запрос, пока таймер снова не истечёт.'
    ),
    hint: L(
      'Two things guard the order of the answers: the AbortController cancels the outdated request, and the counter of the requests in the ref tells whether the answer belongs to the latest request. The timer of the debounce is a separate effect from the effect of the request.',
      'Порядок ответов охраняют две вещи: AbortController отменяет устаревший запрос, а счётчик запросов в ref сообщает, принадлежит ли ответ последнему запросу. Таймер дебаунса — это отдельный эффект, не тот же, что и эффект запроса.'
    ),
    solution: `import { useEffect, useRef, useState } from 'react';

interface User {
  id: number;
  name: string;
}

export function UserSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    const currentId = ++requestId.current;

    if (debouncedQuery.trim() === '') {
      setResults([]);
      setLoading(false);
      return () => controller.abort();
    }

    setLoading(true);
    setError(null);

    fetch(\`https://api.example.com/users?q=\${debouncedQuery}\`, {
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<User[]>)
      .then((data) => {
        if (currentId !== requestId.current) {
          return;
        }

        setResults(data);
        setLoading(false);
      })
      .catch((cause: unknown) => {
        if (currentId !== requestId.current) {
          return;
        }

        setError(cause instanceof Error ? cause.message : 'Search failed');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {loading ? <p role="status">Searching</p> : null}
      {error ? <p role="alert">{error}</p> : null}

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: L(
      'The input stays controlled by the immediate value, so the letters appear without a delay, and only the network reacts to the debounced value. Two effects are used on purpose: one owns the timer of the debounce, the other owns the request, and each of them cleans up after itself. The AbortController stops the outdated request, but the network is not the only thing that can reorder the answers, so the counter of the requests in the ref is the second guard: a response whose id is not the latest one is dropped without touching the state. The check of the counter also protects the flag of the loading, because an outdated answer must not switch the indicator off while the fresh request is still running. This is the shape of almost every production search field.',
      'Поле остаётся под контролем мгновенного значения, поэтому буквы появляются без задержки, а на сеть реагирует только отложенное значение. Два эффекта выбраны намеренно: один владеет таймером дебаунса, другой — запросом, и каждый убирает за собой. AbortController останавливает устаревший запрос, но сеть не единственное, что может переставить ответы, поэтому счётчик запросов в ref — вторая защита: ответ с не последним id отбрасывается, не трогая состояние. Проверка счётчика защищает и флаг загрузки, потому что устаревший ответ не должен выключать индикатор, пока свежий запрос ещё идёт. Это и есть форма почти каждого боевого поиска.'
    ),
  },
];
