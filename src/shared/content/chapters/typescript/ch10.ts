import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const tsCh10: Chapter = {
  id: 'ts-ch10',
  title: L('Typing React, DOM and third-party code', 'Типизация React, DOM и стороннего кода'),
  summary: L(
    'How to type a React component, a DOM event handler and a dependency that ships no types at all, so the compiler keeps checking the code you actually own.',
    'Как типизировать компонент React, обработчик DOM-события и зависимость, у которой нет типов, чтобы компилятор продолжал проверять код, который вам действительно принадлежит.'
  ),
  sections: [
    {
      id: 'ts-ch10-s1',
      title: L('Typing props and children', 'Типизация пропсов и children'),
      body: L(
        'The props of a component are its public surface: everything a caller is allowed to pass in. The type is usually an interface or a type alias that lists them, and the component takes that type as a parameter. What matters for the long run is where the type lives: written next to the component, it stays in step with the implementation, while a shared props file in a common folder drifts away from every copy of the component that uses it.\n\nChildren is special, because React passes it as an ordinary prop and its type is much wider than it looks. ReactNode covers elements, strings, numbers, arrays of nodes, portals, booleans, null and undefined, and in React 19 it also covers a promise of a node, because a component may await data inside Suspense. PropsWithChildren is the standard helper for it: the helper takes a props type and returns that type plus an optional children of type ReactNode. Use it when children is allowed, and leave the helper out when it is not.\n\nProps the component does not own should be readonly. A readonly prop stops the component from mutating an object that the caller still holds, and it makes the contract explicit at the call site. React props are immutable by convention: the same object is handed to every consumer, and a component that writes into it produces a bug that appears only in a particular order of rendering.\n\nWhen children must be a function, as in a render prop, type it as a function of the data the component provides and let it return ReactNode. Typing it as ReactNode hides the mistake where a caller passes an element to a component that intends to call it, and that mistake arrives at runtime as a call of a non-function.',
        'Пропсы компонента — это его публичная поверхность: всё, что вызывающая сторона имеет право передать. Тип обычно описывают интерфейсом или алиасом типа, а компонент принимает этот тип параметром. Для долгой жизни важно, где лежит тип: написанный рядом с компонентом, он остаётся в согласии с реализацией, тогда как общий файл пропсов в отдельной папке расходится с каждой копией компонента, которая его использует.\n\nChildren особенен: React передаёт его как обычный проп, а тип у него намного шире, чем кажется. ReactNode охватывает элементы, строки, числа, массивы узлов, порталы, логические значения, null и undefined, а в React 19 — ещё и промис с узлом, потому что компонент может ждать данные внутри Suspense. PropsWithChildren — стандартный помощник для этого: он берёт тип пропсов и возвращает тот же тип плюс необязательный children типа ReactNode. Применяйте его, когда children разрешён, и не применяйте, когда нет.\n\nПропсы, которыми не владеет компонент, стоит объявлять readonly. Readonly не даёт компоненту изменить объект, который остался у вызывающей стороны, и делает контракт явным в месте вызова. Пропы React неизменяемы по соглашению: один и тот же объект получают все потребители, и компонент, который пишет в него, создаёт баг, проявляющийся только при определённом порядке отрисовки.\n\nКогда children обязан быть функцией, как в render prop, типизируйте его как функцию от данных, которые предоставляет компонент, с возвратом ReactNode. Тип ReactNode скрывает ошибку, когда вызывающая сторона передаёт элемент в компонент, который собирается его вызвать, и эта ошибка приходит во время выполнения как попытка вызвать не-функцию.'
      ),
      bullets: [
        L('Props are the public contract of a component, so keep the type next to the component.', 'Пропсы — публичный контракт компонента, поэтому держите тип рядом с компонентом.'),
        L('ReactNode covers elements, strings, numbers, arrays, portals, booleans, null and undefined.', 'ReactNode охватывает элементы, строки, числа, массивы, порталы, логические значения, null и undefined.'),
        L('PropsWithChildren adds an optional children of type ReactNode to any props type.', 'PropsWithChildren добавляет необязательный children типа ReactNode к любому типу пропсов.'),
        L('Readonly props stop a component from mutating what the caller owns.', 'Readonly-пропсы не дают компоненту изменить то, чем владеет вызывающая сторона.'),
        L('A render prop must be typed as a function returning ReactNode.', 'Render prop нужно типизировать как функцию, возвращающую ReactNode.'),
        L('In React 19 types a promise of a node is a valid child.', 'В типах React 19 промис с узлом — допустимый child.'),
      ],
      code: `import { createElement } from 'react';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  readonly title: string;
  count?: number;
}>;

function Card({ title, count = 0, children }: CardProps) {
  const label = count > 0 ? title + ' (' + count + ')' : title;
  return createElement('section', null, label, children);
}`,
      table: {
        caption: L('How to type each part of a component', 'Как типизировать каждую часть компонента'),
        headers: [
          L('Part', 'Часть'),
          L('Type', 'Тип'),
          L('Why', 'Зачем'),
        ],
        rows: [
          [
            L('The props object', 'Объект пропсов'),
            L('An interface or a type alias', 'Интерфейс или алиас типа'),
            L('It is the contract the caller is checked against', 'Это контракт, по которому проверяется вызывающая сторона'),
          ],
          [
            L('Children', 'Children'),
            L('ReactNode', 'ReactNode'),
            L('The same shape for elements, text, arrays and nothing', 'Одна форма для элементов, текста, массивов и пустоты'),
          ],
          [
            L('A render prop', 'Render prop'),
            L('(data: Props) => ReactNode', '(data: Props) => ReactNode'),
            L('The caller gets the data and must return a node', 'Вызывающая сторона получает данные и обязана вернуть узел'),
          ],
          [
            L('Props the component only reads', 'Пропсы, которые компонент только читает'),
            L('readonly', 'readonly'),
            L('The component cannot change what the caller owns', 'Компонент не может изменить то, чем владеет вызывающая сторона'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Do not type children as ReactElement', 'Не типизируйте children как ReactElement'),
          text: L(
            'ReactElement excludes strings, numbers, arrays and null, so a component typed that way refuses ordinary usage such as a text child or a conditional that renders nothing. ReactNode is the type that matches what React actually accepts.',
            'ReactElement не включает строки, числа, массивы и null, поэтому компонент с таким типом откажет в обычном использовании: текстовый child или условие, которое ничего не рисует. ReactNode — это тот тип, который соответствует тому, что React действительно принимает.'
          ),
        },
        {
          tone: 'tip',
          title: L('The return type can stay inferred', 'Тип возврата можно не указывать'),
          text: L(
            'A function component that returns an element does not need an explicit return type, and writing one usually adds nothing. Annotate the props, and let inference describe the result.',
            'Функциональному компоненту, возвращающему элемент, явный тип возврата не нужен, и обычно он ничего не добавляет. Аннотируйте пропсы, а результат пусть описывает вывод типов.'
          ),
        },
      ],
      takeaway: L(
        'Type the props, let ReactNode cover the children, and mark every prop the component only reads as readonly.',
        'Типизируйте пропсы, отдайте children тип ReactNode и помечайте readonly каждый проп, который компонент только читает.'
      ),
      seeAlso: [
        L('Section 3-1: interfaces versus type aliases', 'Секция 3-1: интерфейсы против алиасов типов'),
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения типов и дискриминируемые свойства'),
        L('Section 1-3: primitives, arrays, tuples and readonly', 'Секция 1-3: примитивы, массивы, кортежи и readonly'),
      ],
    },
    {
      id: 'ts-ch10-s2',
      title: L('Events and refs', 'События и ссылки'),
      body: L(
        'React events are not DOM events. React wraps a browser event in a synthetic one, and the handler receives that synthetic event whose target is typed as the element that produced it. The pattern is ChangeEvent for a controlled input, FormEvent for a submit handler and MouseEvent for a click. The type parameter is the element type, and it is exactly what makes event.target.value a string instead of an EventTarget without properties.\n\nThe classic mistake is a handler that takes the platform event instead of the React one. The global MouseEvent carries a target of type EventTarget, so the code complains that value does not exist on type EventTarget, or worse, compiles after a cast. Annotating the handler with the React event type fixes it, and a named handler needs its own annotation: an inline arrow infers its parameter from the prop type, while a function declared elsewhere is checked against the same rules only if you write the type down.\n\nA ref is a mutable box that survives re-renders. The hook useRef returns a RefObject whose current property holds the value. In the React 19 types the current property is mutable and MutableRefObject is deprecated, so there is one ref type to learn instead of two. The value of a ref created with useRef and a null initialiser is typed with null in the union, because the element does not exist before the first render is committed.\n\nThere are two flavours of ref. A value ref holds anything that must survive a render, such as a timer id or the previous value of a prop. A DOM ref holds a real element and is attached through the ref prop, so every read of current has to handle the case where the element is not there yet. When a parent needs a handle on a child, forwardRef together with useImperativeHandle gives the parent a small typed API instead of the internals of the child.',
        'События React — это не DOM-события. React оборачивает браузерное событие в синтетическое, и обработчик получает именно его, причём target типизирован элементом, который событие породил. Обычная схема — ChangeEvent для контролируемого поля ввода, FormEvent для отправки формы и MouseEvent для клика. Параметр типа — это тип элемента, и именно он превращает event.target.value в строку, а не в EventTarget без свойств.\n\nКлассическая ошибка — обработчик, принимающий платформенное событие вместо события React. У глобального MouseEvent target имеет тип EventTarget, поэтому код жалуется, что value не существует у типа EventTarget, или, что хуже, компилируется после приведения типа. Аннотация типом события React решает задачу, и именованному обработчику нужна своя: у стрелки в строке параметр выводится из типа пропа, а функция, объявленная в другом месте, проверяется по тем же правилам, только если тип написан явно.\n\nСсылка — это изменяемая коробка, которая переживает перерисовки. Хук useRef возвращает RefObject, у которого свойство current хранит значение. В типах React 19 это свойство изменяемое, а MutableRefObject объявлен устаревшим, поэтому знать нужно один тип ссылки, а не два. Значение ссылки, созданной с null в качестве начального, входит в объединение вместе с null: элемента до фиксации первого рендера ещё нет.\n\nСсылок два вида. Ссылка на значение хранит всё, что должно пережить рендер: идентификатор таймера или предыдущее значение пропа. Ссылка на DOM хранит настоящий элемент и прикрепляется через проп ref, поэтому каждое чтение current обязано учесть случай, когда элемента ещё нет. Когда родителю нужен доступ к ребёнку, forwardRef вместе с useImperativeHandle дают родителю небольшой типизированный API вместо внутренностей ребёнка.'
      ),
      bullets: [
        L('React events are synthetic, and the type parameter names the element that produced them.', 'События React синтетические, а параметр типа называет элемент, который их породил.'),
        L('ChangeEvent<HTMLInputElement> makes event.target.value a string.', 'ChangeEvent<HTMLInputElement> делает event.target.value строкой.'),
        L('The platform MouseEvent carries an EventTarget with no value property.', 'У платформенного MouseEvent у target нет свойства value.'),
        L('useRef with a null initialiser gives a ref whose current may be null.', 'useRef с null в качестве начального даёт ссылку, у которой current может быть null.'),
        L('In the React 19 types RefObject is mutable and MutableRefObject is deprecated.', 'В типах React 19 RefObject изменяемый, а MutableRefObject устарел.'),
        L('forwardRef and useImperativeHandle expose a typed handle instead of the child internals.', 'forwardRef и useImperativeHandle дают типизированный доступ вместо внутренностей ребёнка.'),
      ],
      code: `import { useRef } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

function onNameChange(event: ChangeEvent<HTMLInputElement>): void {
  console.log(event.target.value);       // string, not EventTarget
}

function onSubmit(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
  console.log(event.currentTarget.elements);
}

function onClick(event: MouseEvent<HTMLButtonElement>): void {
  console.log(event.currentTarget.disabled);
}

const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();`,
      table: {
        caption: L('Which event type belongs to which element', 'Какой тип события соответствует какому элементу'),
        headers: [
          L('Handler', 'Обработчик'),
          L('Event type', 'Тип события'),
          L('What it gives', 'Что даёт'),
        ],
        rows: [
          [
            L('Change in an input', 'Change в поле ввода'),
            L('ChangeEvent<HTMLInputElement>', 'ChangeEvent<HTMLInputElement>'),
            L('target.value as a string', 'target.value строкой'),
          ],
          [
            L('Submit of a form', 'Отправка формы'),
            L('FormEvent<HTMLFormElement>', 'FormEvent<HTMLFormElement>'),
            L('currentTarget.elements for the fields', 'currentTarget.elements со списком полей'),
          ],
          [
            L('Click on a button', 'Клик по кнопке'),
            L('MouseEvent<HTMLButtonElement>', 'MouseEvent<HTMLButtonElement>'),
            L('currentTarget.disabled for the state', 'currentTarget.disabled для состояния'),
          ],
          [
            L('Key press in a field', 'Нажатие клавиши в поле'),
            L('KeyboardEvent<HTMLInputElement>', 'KeyboardEvent<HTMLInputElement>'),
            L('event.key and event.currentTarget.value', 'event.key и event.currentTarget.value'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The handler written as an arrow', 'Обработчик, написанный стрелкой'),
          text: L(
            'An inline arrow inside a prop gets its parameter type from the prop, so it is safe. The same arrow copied into a variable outside the component loses that context, and its parameter is no longer typed at all, which under noImplicitAny is an error. When a handler is declared separately, give it its own annotation.',
            'Стрелка прямо в пропе получает тип параметра из пропа, и это безопасно. Та же стрелка, вынесенная в переменную за пределами компонента, теряет этот контекст, и её параметр перестаёт быть типизированным, что при noImplicitAny является ошибкой. Вынесенному обработчику нужна собственная аннотация.'
          ),
        },
        {
          tone: 'note',
          title: L('A DOM ref is null until it is attached', 'DOM-ссылка равна null до прикрепления'),
          text: L(
            'The element does not exist while the component renders, so current starts as null and only becomes the element after the commit. Every read has to handle that, which is why the optional chaining is usually the right tool here.',
            'Элемента не существует во время рендера, поэтому current сначала равен null и становится элементом только после фиксации. Каждое чтение обязано это учесть, и поэтому опциональная цепочка обычно и есть правильный инструмент.'
          ),
        },
      ],
      takeaway: L(
        'Annotate every handler with the event type of the element it serves, and treat ref.current as a value that may still be null.',
        'Аннотируйте каждый обработчик типом события его элемента и считайте ref.current значением, которое ещё может быть null.'
      ),
      seeAlso: [
        L('Section 2-2: narrowing with typeof, in and instanceof', 'Секция 2-2: сужение через typeof, in и instanceof'),
        L('Section 8-3: declaration files and ambient types', 'Секция 8-3: файлы деклараций и внешние типы'),
        L('Chapter 1: what TypeScript adds and what it erases', 'Глава 1: что TypeScript добавляет и что стирает'),
      ],
    },
    {
      id: 'ts-ch10-s3',
      title: L('Hooks and generic components', 'Хуки и дженерик-компоненты'),
      body: L(
        'The state hook infers its type from the initial value, and the setter accepts nothing else. When the initial value is too narrow, the type comes from the generic argument: an empty array passed without a type argument is inferred as an array of never, which accepts nothing and then fails on the first push. The setter accepts either a value or a function of the previous value, and the second form is the correct one whenever the next value depends on the last one.\n\nThe reducer hook is the version with the transition logic in one place. The state type and the action type are written in the signature of the reducer, the compiler checks that every branch returns a state of the right type, and it checks that every action you dispatch is one the reducer handles. That check is the reason to prefer it over several state hooks when the values move together: the transitions are described once and cannot drift apart.\n\nA generic component keeps a relation between its props and its result. A list component that takes items of an arbitrary type together with a renderer for that type works with any item type, and the compiler infers the parameter from the items at the call site. The generic parameter is not decoration: it is what stops the component from accepting items of one type and a renderer that expects another. When the parameter cannot be inferred from the props, it is written at the call site, and that is the same mechanism as a type argument on a generic function.\n\nThe type assertion has a narrow job around components: telling the compiler that a value already has a more specific type than the compiler can see. A cast applied to data from the network, from local storage or from a query parameter is not a typing exercise but a promise the compiler stops checking. Assertions are acceptable where the compiler already knows the type and only loses the detail, and nowhere else.',
        'Хук состояния выводит тип из начального значения, а установщик принимает только его. Когда начальное значение слишком узкое, тип берётся из аргумента типа: пустой массив без аргумента типа выводится как массив never, который не принимает ничего и падает на первом добавлении. Установщик принимает либо значение, либо функцию от предыдущего значения, и вторая форма правильная всякий раз, когда новое значение зависит от старого.\n\nХук редьюсера — это версия, в которой логика переходов собрана в одном месте. Тип состояния и тип действия пишутся в сигнатуре редьюсера, компилятор проверяет, что каждая ветка возвращает состояние нужного типа, и проверяет, что каждое отправленное действие обрабатывается редьюсером. Именно эта проверка — причина предпочесть его нескольким хукам состояния, когда значения живут вместе: переходы описаны один раз и не могут разойтись.\n\nДженерик-компонент сохраняет связь между пропсами и результатом. Компонент списка, принимающий элементы произвольного типа вместе с функцией отрисовки этого типа, работает с любым типом, и компилятор выводит параметр из элементов в месте вызова. Параметр типа здесь не украшение: именно он не даёт компоненту принять элементы одного типа и отрисовщик, ждущий другой. Когда параметр нельзя вывести из пропсов, его пишут в месте вызова, и это тот же механизм, что аргумент типа у дженерик-функции.\n\nУ приведения типа в компонентах узкая работа: сообщить компилятору, что у значения уже есть более точный тип, которого компилятор не видит. Приведение, применённое к данным из сети, из локального хранилища или из параметра запроса, — это не упражнение в типизации, а обещание, которое компилятор перестаёт проверять. Приведения допустимы там, где компилятор уже знает тип и потерял только деталь, и больше нигде.'
      ),
      bullets: [
        L('useState infers from the initial value, so an empty array needs an explicit type.', 'useState выводит тип из начального значения, поэтому пустому массиву нужен явный тип.'),
        L('The updater form setState(prev => next) is correct when the next value depends on the old.', 'Форма с обновляющей функцией верна, когда новое значение зависит от старого.'),
        L('useReducer keeps the transitions in one place and checks every action type.', 'useReducer держит переходы в одном месте и проверяет тип каждого действия.'),
        L('A generic component ties the item type to the renderer type.', 'Дженерик-компонент связывает тип элемента с типом отрисовщика.'),
        L('A type argument at the call site is the same mechanism as on a generic function.', 'Аргумент типа в месте вызова — тот же механизм, что и у дженерик-функции.'),
        L('A cast is honest only where the compiler already knows the narrower type.', 'Приведение уместно лишь там, где компилятор уже знает более узкий тип.'),
      ],
      code: `import { useReducer, useState } from 'react';
import type { ReactNode } from 'react';

const [names, setNames] = useState<string[]>([]);
setNames((prev) => [...prev, 'Ada']);
console.log(names.length);

type Action = { type: 'add'; text: string } | { type: 'clear' };

function reducer(state: string[], action: Action): string[] {
  switch (action.type) {
    case 'add':
      return [...state, action.text];
    case 'clear':
      return [];
  }
}

type ListProps<T> = { items: T[]; render: (item: T) => ReactNode };
function List<T>({ items, render }: ListProps<T>): ReactNode {
  return items.map(render);
}`,
      table: {
        caption: L('Choosing between the state hooks', 'Выбор между хуками состояния'),
        headers: [
          L('Need', 'Задача'),
          L('Hook', 'Хук'),
          L('Reason', 'Причина'),
        ],
        rows: [
          [
            L('One independent value', 'Одно независимое значение'),
            L('useState', 'useState'),
            L('The setter and the value are enough', 'Значения и установщика достаточно'),
          ],
          [
            L('A value built from the previous one', 'Значение, зависящее от предыдущего'),
            L('useState with an updater', 'useState с обновляющей функцией'),
            L('The function form never sees a stale value', 'Функциональная форма не видит устаревшего значения'),
          ],
          [
            L('Several values that change together', 'Несколько значений, меняющихся вместе'),
            L('useReducer', 'useReducer'),
            L('The transitions are described and checked in one place', 'Переходы описаны и проверяются в одном месте'),
          ],
          [
            L('Actions that must not be forgotten', 'Действия, которые нельзя забыть'),
            L('useReducer', 'useReducer'),
            L('An unknown action is a compile error', 'Неизвестное действие — ошибка компиляции'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('An empty array infers never', 'Пустой массив выводится как never'),
          text: L(
            'Without a type argument an empty array is inferred as an array of never, so nothing can be put into it and the first push fails with a confusing message about the type never. Write the type of the elements, not the type of the array.',
            'Без аргумента типа пустой массив выводится как массив never, поэтому в него ничего нельзя положить, и первое добавление падает с непонятным сообщением про тип never. Пишите тип элементов, а не тип массива.'
          ),
        },
        {
          tone: 'warning',
          title: L('A cast on fetched data', 'Приведение типа на полученных данных'),
          text: L(
            'Writing the fetched payload as the response type removes the check exactly where the data is least trustworthy. The type of an unverified payload is unknown, and the check that turns it into a real type belongs at the boundary of the application.',
            'Запись полученной нагрузки в тип ответа убирает проверку именно там, где данным меньше всего стоит доверять. Тип непроверенной нагрузки — unknown, и проверка, превращающая её в настоящий тип, принадлежит границе приложения.'
          ),
        },
      ],
      takeaway: L(
        'Give the state hook an explicit type when the initial value cannot carry it, and keep the transitions of a machine in one reducer.',
        'Указывайте хуку состояния явный тип, когда начальное значение его не несёт, и держите переходы машины в одном редьюсере.'
      ),
      seeAlso: [
        L('Section 3-4: generic functions and inference', 'Секция 3-4: обобщённые функции и вывод типов'),
        L('Section 3-5: generic constraints and defaults', 'Секция 3-5: ограничения и значения типа по умолчанию'),
        L('Section 6-2: parsing at the boundary', 'Секция 6-2: разбор данных на границе'),
      ],
    },
    {
      id: 'ts-ch10-s4',
      title: L('Discriminated unions for component state', 'Дискриминируемые объединения для состояния компонента'),
      body: L(
        'A component that keeps several flags has states that cannot exist. isLoading and isError both true is not a state any interface should render, but with two booleans the type system accepts it without complaint and the branch that handles both has to be written by hand. A discriminated union replaces the flags with one value that names the state: a status field with a literal type, or a single object whose kind property is a literal.\n\nThe discriminant is the property that differs between the members of the union. When the component switches on it, the compiler narrows the whole object to that member, so the fields of the member are available and the fields of the other members are not. A switch over the union is checked for completeness, which means adding a new member turns every switch that forgot it into a compile error. That is the moment when a state machine pays for itself.\n\nThe pattern generalises to anything with a lifecycle. A request has idle, loading, success and failure states, and the data differs in each of them. A form has editing, submitting and failed states. Modelling them as a union of objects says exactly what is true at each moment and removes the impossible combinations from the vocabulary of the component. The check that the switch is complete is usually written as a final branch that assigns the value to never, so an unhandled case becomes an error instead of a blank screen.\n\nThe cost is a slightly wider type and a switch instead of a couple of conditions. It pays off as soon as the state is read in more than one place, as soon as the parts of the state change together, and as soon as data hangs on the state. A single boolean that nothing else depends on does not need a machine.',
        'Компонент, который держит несколько флагов, имеет состояния, которых быть не может. isLoading и isError одновременно равные true — это не состояние, которое стоит рисовать, но с двумя логическими значениями система типов принимает его без вопросов, и ветку, обрабатывающую оба случая, приходится писать руками. Дискриминируемое объединение заменяет флаги одним значением, называющим состояние: полем status с литеральным типом или одним объектом, у которого свойство kind — литерал.\n\nДискриминант — это свойство, различающее участников объединения. Когда компонент переключается по нему, компилятор сужает весь объект до одного участника, и поля этого участника доступны, а поля остальных — нет. Switch по объединению проверяется на полноту, то есть добавление нового участника превращает каждый забытый switch в ошибку компиляции. Вот в этот момент машина состояний и окупается.\n\nСхема обобщается на всё, у чего есть жизненный цикл. У запроса есть состояния покоя, загрузки, успеха и ошибки, и в каждом из них данные разные. У формы есть состояния правки, отправки и сбоя. Описание их объединением объектов точно говорит, что верно в каждый момент, и убирает невозможные сочетания из словаря компонента. Проверку полноты switch обычно пишут последней веткой, которая присваивает значение never, и тогда необработанный случай становится ошибкой, а не пустым экраном.\n\nЦена — чуть более широкий тип и switch вместо пары условий. Она окупается, как только состояние читают в нескольких местах, как только части состояния меняются вместе и как только к состоянию привязаны данные. Одинокий логический флаг, от которого ничего не зависит, машина состояний не требует.'
      ),
      bullets: [
        L('Two booleans allow combinations that no interface should render.', 'Два логических значения разрешают сочетания, которых не должно быть на экране.'),
        L('The discriminant is the property whose literal type differs between the members.', 'Дискриминант — это свойство, литеральный тип которого различается у участников.'),
        L('Switching on the discriminant narrows the whole object to that member.', 'Переключение по дискриминанту сужает весь объект до одного участника.'),
        L('Adding a member turns every incomplete switch into a compile error.', 'Добавление участника превращает каждый неполный switch в ошибку компиляции.'),
        L('A final branch that assigns the value to never proves the switch is complete.', 'Последняя ветка, присваивающая значение never, доказывает полноту switch.'),
        L('A single independent boolean does not need a state machine.', 'Одинокий независимый флаг не нуждается в машине состояний.'),
      ],
      code: `type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function render(state: RequestState): string {
  switch (state.status) {
    case 'idle':
      return 'Nothing loaded yet';
    case 'loading':
      return 'Loading';
    case 'success':
      return state.data.join(', ');   // narrowed: data exists here
    case 'error':
      return state.message;            // narrowed: message exists here
  }
}`,
      table: {
        caption: L('Flags against a discriminated union', 'Флаги против дискриминируемого объединения'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Two booleans', 'Два логических значения'),
          L('A discriminated union', 'Дискриминируемое объединение'),
        ],
        rows: [
          [
            L('Possible states', 'Возможные состояния'),
            L('Four, two of them impossible', 'Четыре, два из них невозможны'),
            L('Exactly the four that exist', 'Ровно те четыре, что существуют'),
          ],
          [
            L('Data of a state', 'Данные состояния'),
            L('Kept in separate optional fields', 'Разбросаны по отдельным необязательным полям'),
            L('Belongs to the member that has it', 'Принадлежат тому участнику, у которого они есть'),
          ],
          [
            L('Adding a state', 'Добавление состояния'),
            L('Another flag and another branch', 'Ещё флаг и ещё ветка'),
            L('One member and a compile error elsewhere', 'Один участник и ошибка компиляции в остальных местах'),
          ],
          [
            L('Reading the state', 'Чтение состояния'),
            L('A condition per flag', 'Условие на каждый флаг'),
            L('A switch with one case per member', 'Switch с одним случаем на участника'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'tip',
          title: L('Let the compiler write the last branch', 'Пусть последнюю ветку напишет компилятор'),
          text: L(
            'Ending the switch with a branch that assigns the value to never makes the compiler list the members you forgot. When the list is empty the branch is unreachable and can stay as documentation of the intent.',
            'Завершите switch веткой, которая присваивает значение never, и компилятор перечислит забытых участников. Когда список пуст, ветка недостижима и остаётся как документ намерения.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('A union without a discriminant', 'Объединение без дискриминанта'),
          text: L(
            'A union of two object types with different fields but no literal property is not discriminated. Narrowing then works only through type guards, and the switch on a shared property keeps the members mixed. One literal property is what makes the union usable.',
            'Объединение из двух объектных типов с разными полями, но без литерального свойства, не является дискриминируемым. Сужение работает только через проверки типов, а switch по общему свойству оставляет участников перемешанными. Одно литеральное свойство делает объединение пригодным.'
          ),
        },
      ],
      takeaway: L(
        'Model a component state as a union with a literal discriminant and let an exhaustive switch prove that every state is handled.',
        'Описывайте состояние компонента объединением с литеральным дискриминантом и дайте исчерпывающему switch доказать, что обработан каждый случай.'
      ),
      seeAlso: [
        L('Section 2-1: union types and discriminant properties', 'Секция 2-1: объединения типов и дискриминируемые свойства'),
        L('Section 2-3: control flow analysis and exhaustiveness', 'Секция 2-3: анализ потока управления и проверка полноты'),
        L('Section 1-4: literal types and widening', 'Секция 1-4: литеральные типы и расширение типа'),
      ],
    },
    {
      id: 'ts-ch10-s5',
      title: L('Typing untyped dependencies', 'Типизация зависимостей без типов'),
      body: L(
        'A dependency written in JavaScript ships no types of its own, and TypeScript then reports that the module has no declaration file. The first line of defence is the DefinitelyTyped project: most popular packages publish their types separately, under the @types scope, and installing the types of a package is usually all that it takes.\n\nFor a package nobody has typed, the declaration can be written by hand in a file with the .d.ts extension. A module declaration with the name of the package describes its exports and the type of each one. Such a file is a contract you maintain, and it has to be updated when the package changes. Declare only what the application uses: a narrow declaration is better than a wrong one, because a wrong one lets the compiler accept calls that do not exist at runtime.\n\nThe boundary is where untyped code enters the application, and that is where it should become typed. Wrap the import in one module of your own, check the data that comes out of it, and export a typed function to the rest of the codebase. Everything downstream then works with a type it can trust, and that single module is the only place that has to change when the package is upgraded or replaced.\n\nA type assertion is the weakest tool here and the most dangerous one. Writing the raw payload as the expected type tells the compiler to stop asking, and the error it was supposed to catch moves from the compiler to the browser console, where it appears as a failure to read a property of undefined. The rule is simple: an assertion is acceptable where the compiler already knows the type and only loses the detail, and never at a boundary where the data comes from outside the program.',
        'Зависимость, написанная на JavaScript, не приносит собственных типов, и TypeScript сообщает, что у модуля нет файла объявлений. Первая линия обороны — проект DefinitelyTyped: у большинства популярных пакетов типы выложены отдельно, в области @types, и обычно достаточно установить типы пакета.\n\nДля пакета, который никто не типизировал, объявление можно написать самому в файле с расширением .d.ts. Объявление модуля с именем пакета описывает его экспорты и тип каждого из них. Такой файл — контракт, который вы сопровождаете, и его приходится обновлять вместе с пакетом. Объявляйте только то, чем приложение пользуется: узкое объявление лучше неверного, потому что неверное позволяет компилятору принять вызовы, которых нет во время выполнения.\n\nГраница — это место, где нетипизированный код входит в приложение, и именно там он должен стать типизированным. Оберните импорт в один собственный модуль, проверьте данные, которые из него выходят, и отдайте остальному коду типизированную функцию. Всё, что ниже по потоку, работает с типом, которому можно доверять, а менять при обновлении пакета приходится только этот один модуль.\n\nПриведение типа — самый слабый инструмент здесь и самый опасный. Запись сырой нагрузки в ожидаемый тип говорит компилятору замолчать, и ошибка, которую он должен был поймать, переезжает из компилятора в консоль браузера, где выглядит как невозможность прочитать свойство у undefined. Правило простое: приведение допустимо там, где компилятор уже знает тип и потерял только деталь, и никогда на границе, где данные приходят извне программы.'
      ),
      bullets: [
        L('A package with types on DefinitelyTyped needs the matching @types package.', 'Пакет с типами в DefinitelyTyped требует установки соответствующего пакета @types.'),
        L('A .d.ts file with declare module describes the exports of an untyped package.', 'Файл .d.ts с declare module описывает экспорты нетипизированного пакета.'),
        L('Declare only the members the application uses, a narrow contract beats a wrong one.', 'Объявляйте только используемые члены: узкий контракт лучше неверного.'),
        L('The typed boundary of an untyped package is one module of your own.', 'Типизированной границей нетипизированного пакета служит один ваш модуль.'),
        L('An assertion at the boundary moves the error from the compiler to the runtime.', 'Приведение на границе переносит ошибку из компилятора в рантайм.'),
        L('unknown plus a check is the honest alternative to a cast.', 'unknown плюс проверка — честная альтернатива приведению типа.'),
      ],
      code: `// types/legacy-sdk.d.ts - the shape of the untyped package
declare module 'legacy-sdk' {
  export interface Report { id: string; total: number; }
  export function createReport(id: string): Report;
}

// src/legacy.ts - the typed boundary of the application
import { createReport } from 'legacy-sdk';
import type { Report } from 'legacy-sdk';

export function buildReport(raw: unknown): Report {
  if (!isReport(raw)) {
    throw new Error('unexpected payload');
  }
  return createReport(raw.id);
}

function isReport(value: unknown): value is Report {
  return typeof value === 'object' && value !== null && 'id' in value && 'total' in value;
}`,
      table: {
        caption: L('How to deal with an untyped import', 'Что делать с нетипизированным импортом'),
        headers: [
          L('Situation', 'Ситуация'),
          L('Tool', 'Инструмент'),
          L('Cost', 'Цена'),
        ],
        rows: [
          [
            L('The package publishes its own types', 'Пакет публикует свои типы'),
            L('Nothing to do', 'Ничего делать не нужно'),
            L('Zero', 'Нулевая'),
          ],
          [
            L('The types exist on DefinitelyTyped', 'Типы есть в DefinitelyTyped'),
            L('Install the @types package', 'Установить пакет @types'),
            L('One dev dependency', 'Одна зависимость для разработки'),
          ],
          [
            L('Nobody has typed the package', 'Пакет не типизирован никем'),
            L('A .d.ts file with declare module', 'Файл .d.ts с declare module'),
            L('You maintain the contract', 'Контракт сопровождаете вы'),
          ],
          [
            L('The data arrives from the network', 'Данные приходят из сети'),
            L('unknown plus a type guard', 'unknown плюс проверка типа'),
            L('One check at the boundary', 'Одна проверка на границе'),
          ],
          [
            L('You only want to silence the compiler', 'Нужно лишь замолчать компилятор'),
            L('An assertion', 'Приведение типа'),
            L('The error moves to the runtime', 'Ошибка переезжает в рантайм'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('An assertion is not a validation', 'Приведение типа — это не проверка'),
          text: L(
            'The parsed JSON of the wrong shape does not become the expected type because of a cast; it only stops being reported. The check that belongs at the boundary is the one that reads the value and decides, field by field, whether it is what the application expects.',
            'Разобранный JSON неверной формы не становится ожидаемым типом из-за приведения — он просто перестаёт попадать в отчёт. Проверка, которая нужна на границе, читает значение и решает, поле за полем, то ли это то, что ожидает приложение.'
          ),
        },
        {
          tone: 'tip',
          title: L('One module owns the untyped edge', 'Один модуль владеет нетипизированным краем'),
          text: L(
            'Keep the declaration file and the wrapper in one place in the repository, and let the rest of the codebase import only from the wrapper. When the package changes, one module and one declaration file have to be updated, and the compiler points at both.',
            'Держите файл объявлений и обёртку в одном месте репозитория, а остальной код пусть импортирует только из обёртки. Когда пакет меняется, обновить нужно один модуль и один файл объявлений, и компилятор укажет на оба.'
          ),
        },
      ],
      takeaway: L(
        'Type untyped code once at the boundary, with a declaration and a check, and never with an assertion.',
        'Типизируйте нетипизированный код один раз на границе — объявлением и проверкой, но никогда приведением типа.'
      ),
      seeAlso: [
        L('Section 6-2: parsing at the boundary', 'Секция 6-2: разбор данных на границе'),
        L('Section 8-3: declaration files and ambient types', 'Секция 8-3: файлы деклараций и внешние типы'),
        L('Section 1-5: any, unknown, never and void', 'Секция 1-5: any, unknown, never и void'),
      ],
    },
  ],
};
