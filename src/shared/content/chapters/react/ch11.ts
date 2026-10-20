import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactCh11: Chapter = {
  id: 'react-ch11',
  title: L('Server components, Suspense and testing', 'Серверные компоненты, Suspense и тестирование'),
  summary: L(
    'How server components split rendering between the server and the browser, how data crosses the client boundary, how Suspense and error boundaries contain failures, what React 19 added, and how to test components by behaviour instead of by implementation.',
    'Как серверные компоненты делят рендеринг между сервером и браузером, как данные пересекают клиентскую границу, как Suspense и границы ошибок локализуют сбои, что добавил React 19 и как тестировать компоненты по поведению, а не по реализации.'
  ),
  sections: [
    {
      id: 'react-ch11-s1',
      title: L('Server components and the client boundary', 'Серверные компоненты и клиентская граница'),
      body: L(
        'The server component model splits rendering into two environments. A server component runs only on the server, in a module that never reaches the browser. It has no state, no effects and no event handlers, and what it returns is a description of the tree that the server streams to the client. The point is not a faster server: it is that the code which produces a page never has to be downloaded to display that page.\n\nThe directive use client marks the boundary. It is a statement at the top of a module, and everything that module imports below the boundary becomes part of the client bundle. Below the line you get the full React feature set: hooks, state, effects and event handlers. Above it you get the server-only set: async components, direct database access and secrets that must not leave the machine.\n\nBecause the directive applies to a module and not to a function, you cannot turn one component inside a server file into a client component. You move it into its own file, mark that file, and import it from the server component. The practical rule is to fetch and format on the server and to keep interactivity behind small client islands, so the bundle ships the buttons rather than the page.',
        'Модель серверных компонентов делит рендеринг на две среды. Серверный компонент выполняется только на сервере, в модуле, который никогда не попадает в браузер. У него нет состояния, эффектов и обработчиков событий, а возвращает он описание дерева, которое сервер отправляет клиенту потоком. Дело не в том, чтобы сервер стал быстрее, а в том, что код, который создаёт страницу, не нужно скачивать, чтобы её показать.\n\nДиректива use client отмечает границу. Это оператор в начале модуля, и всё, что этот модуль импортирует ниже границы, попадает в клиентский бандл. Ниже черты доступен полный набор возможностей React: хуки, состояние, эффекты и обработчики событий. Выше черты — только серверные возможности: async-компоненты, прямой доступ к базе данных и секреты, которым нельзя покидать машину.\n\nПоскольку директива действует на модуль, а не на функцию, превратить один компонент внутри серверного файла в клиентский нельзя. Его переносят в отдельный файл, помечают этот файл и импортируют из серверного компонента. Практическое правило: данные получать и форматировать на сервере, а интерактивность держать в маленьких клиентских островках, чтобы в бандл уезжали кнопки, а не вся страница.'
      ),
      bullets: [
        L('A server component runs only on the server and its code never reaches the browser bundle.', 'Серверный компонент выполняется только на сервере, и его код не попадает в бандл браузера.'),
        L('use client is a module-level directive, not a per-component switch.', 'use client — это директива уровня модуля, а не переключатель на уровне компонента.'),
        L('Everything a client module imports ends up in the client bundle.', 'Всё, что импортирует клиентский модуль, попадает в клиентский бандл.'),
        L('Server components cannot use state, effects or event handlers.', 'Серверные компоненты не могут использовать состояние, эффекты и обработчики событий.'),
        L('Keep interactivity in small client islands and data access on the server.', 'Держите интерактивность в маленьких клиентских островках, а доступ к данным — на сервере.'),
      ],
      code: `// app/products/page.jsx - a server component, no directive needed
import { getProducts } from '../db';
import AddToCart from './AddToCart';

export default async function Page() {
  const products = await getProducts();
  return products.map((p) => (
    <li key={p.id}>{p.title} <AddToCart productId={p.id} /></li>
  ));
}

// app/products/AddToCart.jsx - a client component
'use client';

import { useState } from 'react';

export default function AddToCart({ productId }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Added' : 'Add to cart'}
    </button>
  );
}`,
      table: {
        caption: L('Where the code runs', 'Где выполняется код'),
        headers: [L('Feature', 'Возможность'), L('Server component', 'Серверный компонент'), L('Client component', 'Клиентский компонент')],
        rows: [
          [
            L('useState and useReducer', 'useState и useReducer'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('useEffect', 'useEffect'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('Event handlers', 'Обработчики событий'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('await and direct data access', 'await и прямой доступ к данным'),
            L('Yes', 'Да'),
            L('Limited to the browser APIs', 'Ограничены браузерными API'),
          ],
          [
            L('Code shipped to the browser', 'Код, отправляемый в браузер'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('use client at the top of a shared file', 'use client в начале общего файла'),
          text: L(
            'The directive applies to the whole module, so putting it on a shared file drags that file and everything it imports into the client bundle. The bundle then grows with every dependency of a file that only needed one button to be interactive.',
            'Директива действует на весь модуль, поэтому, если поставить её на общий файл, в клиентский бандл уедут и сам файл, и всё, что он импортирует. Бандл разрастается всеми зависимостями файла, которому нужно было сделать интерактивной одну кнопку.'
          ),
        },
        {
          tone: 'tip',
          title: L('Push the boundary down', 'Опускайте границу ниже'),
          text: L(
            'Every module below the directive is client code, and every module above it is server code. Move the directive into the smallest file that needs state or handlers, and the rest of the page stays on the server where it costs nothing to download.',
            'Каждый модуль ниже директивы — клиентский код, а каждый выше — серверный. Опустите директиву в самый маленький файл, которому нужно состояние или обработчики, и остальная страница останется на сервере, где её не нужно скачивать.'
          ),
        },
      ],
      takeaway: L(
        'Put the use client directive on the smallest module that needs interactivity; everything above it stays on the server.',
        'Ставьте директиву use client на самый маленький модуль, которому нужна интерактивность: всё выше неё остаётся на сервере.'
      ),
      seeAlso: [
        L('Section 11-2: RSC data flow and serialisation', 'Секция 11-2: поток данных в RSC и сериализация'),
        L('Section 3-5: choosing the component boundary', 'Секция 3-5: как выбрать границу компонента'),
        L('Section 9-4: server actions and progressive enhancement', 'Секция 9-4: серверные действия и прогрессивное улучшение'),
      ],
    },
    {
      id: 'react-ch11-s2',
      title: L('RSC data flow and serialisation', 'Поток данных в RSC и сериализация'),
      body: L(
        'Data flows down the tree in one direction. A server component awaits its data directly, with await, without an effect and without a loading state the component has to manage by hand. The result is passed to children as props. Children that are server components receive it as an ordinary prop, and children that are client components receive it through the serialisation boundary.\n\nProps that cross that boundary are serialised, which means they must be plain data. Objects, arrays, strings, numbers, booleans, null and undefined cross safely. Functions, class instances, symbols and DOM nodes do not, because there is no way to turn them into bytes and back. A server component that passes an onClick handler to a client component fails at render time, and the error points at the boundary rather than at the cause.\n\nThat constraint is why server actions exist as a separate mechanism. A server action is a function on the server that the client can call by name, so the client asks the server to do something without the server handing over a callback. The same rule applies inside the tree: a client component may pass plain data to a server component, but behaviour travels in one direction only.',
        'Данные текут по дереву в одном направлении. Серверный компонент ждёт их напрямую, через await, без эффекта и без состояния загрузки, которое пришлось бы вести руками. Результат передаётся детям как пропы. Дети-серверные компоненты получают их как обычные пропы, а дети-клиентские — через границу сериализации.\n\nПропы, которые пересекают эту границу, сериализуются, а значит, должны быть простыми данными. Объекты, массивы, строки, числа, логические значения, null и undefined проходят без проблем. Функции, экземпляры классов, символы и узлы DOM — нет, потому что их нельзя превратить в байты и обратно. Серверный компонент, который передаёт обработчик onClick клиентскому, падает во время рендера, и ошибка указывает на границу, а не на причину.\n\nИменно этим ограничением объясняется отдельный механизм серверных действий. Серверное действие — это функция на сервере, которую клиент может вызвать по имени, поэтому клиент просит сервер что-то сделать, а сервер не передаёт колбэк. То же правило действует внутри дерева: клиентский компонент может передать серверному простые данные, но поведение движется только в одну сторону.'
      ),
      bullets: [
        L('A server component awaits data directly: no effect, no manual loading state.', 'Серверный компонент ждёт данные напрямую: без эффекта и без ручного состояния загрузки.'),
        L('Props that cross the client boundary are serialised and must be plain data.', 'Пропы, пересекающие клиентскую границу, сериализуются и должны быть простыми данными.'),
        L('Plain objects, arrays and primitives cross; functions and class instances do not.', 'Простые объекты, массивы и примитивы проходят, а функции и экземпляры классов — нет.'),
        L('A server component cannot pass a callback to a client component.', 'Серверный компонент не может передать колбэк клиентскому компоненту.'),
        L('Server actions are the sanctioned way for the client to call the server.', 'Серверные действия — официальный способ вызвать сервер из клиента.'),
      ],
      code: `// app/order/page.jsx - a server component
export default async function OrderPage({ orderId }) {
  const order = await db.order.findUnique({ where: { id: orderId } });
  return <OrderSummary order={order} />; // a plain object, serialisable
}

// app/order/OrderSummary.jsx - a client component
'use client';

export default function OrderSummary({ order }) {
  return <p>{order.id}: {order.total} EUR</p>;
}

// This throws at render time: a function cannot be serialised
// <PayButton onPay={() => charge(order.id)} />`,
      table: {
        caption: L('What may cross the client boundary', 'Что может пересечь клиентскую границу'),
        headers: [L('Value', 'Значение'), L('Crosses?', 'Проходит?'), L('Note', 'Замечание')],
        rows: [
          [
            L('Plain object or array', 'Простой объект или массив'),
            L('Yes', 'Да'),
            L('Serialised into the response', 'Сериализуется в ответ'),
          ],
          [
            L('String, number, boolean, null', 'Строка, число, логическое значение, null'),
            L('Yes', 'Да'),
            L('Always safe', 'Всегда безопасно'),
          ],
          [
            L('Function', 'Функция'),
            L('No', 'Нет'),
            L('Use a server action instead', 'Используйте серверное действие'),
          ],
          [
            L('Class instance', 'Экземпляр класса'),
            L('No', 'Нет'),
            L('Only its plain fields survive', 'Сохраняются лишь его простые поля'),
          ],
          [
            L('Symbol or DOM node', 'Символ или узел DOM'),
            L('No', 'Нет'),
            L('Not expressible as data', 'Невыразимо в виде данных'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The callback that cannot travel', 'Колбэк, который не уезжает'),
          text: L(
            'Passing onClick from a server component to a client component is the most common RSC mistake. The error appears in the client component, but the cause is in the server one: a function has no serialised form. Move the handler into the client module or call the server with a server action.',
            'Передача onClick из серверного компонента в клиентский — самая частая ошибка в RSC. Ошибка всплывает в клиентском компоненте, а причина в серверном: у функции нет сериализуемой формы. Перенесите обработчик в клиентский модуль или вызывайте сервер серверным действием.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the payload small', 'Держите полезную нагрузку небольшой'),
          text: L(
            'Every prop that crosses the boundary is written into the response payload and parsed again on the client. Passing a whole table to show three rows of it costs bandwidth and time on both ends, so select the fields the client actually needs.',
            'Каждый проп, пересекающий границу, попадает в полезную нагрузку ответа и разбирается на клиенте заново. Передать целую таблицу ради трёх строк — это трафик и время на обеих сторонах, поэтому выбирайте только те поля, которые клиенту действительно нужны.'
          ),
        },
      ],
      takeaway: L(
        'Only plain data crosses the client boundary; behaviour belongs in a client module or in a server action.',
        'Через клиентскую границу проходят только простые данные, а поведение живёт в клиентском модуле или в серверном действии.'
      ),
      seeAlso: [
        L('Section 11-1: server components and the client boundary', 'Секция 11-1: серверные компоненты и клиентская граница'),
        L('Section 9-4: server actions and progressive enhancement', 'Секция 9-4: серверные действия и прогрессивное улучшение'),
        L('Section 5-1: what effects are for', 'Секция 5-1: для чего нужны эффекты'),
      ],
    },
    {
      id: 'react-ch11-s3',
      title: L('Suspense and error boundaries', 'Suspense и границы ошибок'),
      body: L(
        'Suspense marks a boundary where React can pause the rendering of a subtree while a promise is pending and show a fallback instead. When the promise resolves, React retries that subtree and swaps the fallback for the real content. This single mechanism powers lazy loading, streaming server rendering and data fetching through the use hook, which is why the fallback and the position of the boundary matter more than the mechanism itself.\n\nAn error boundary is the other half. It catches errors thrown while rendering the subtree below it and shows a fallback instead of letting the whole application unmount. The implementation is a class component with a static getDerivedStateFromError, or the react-error-boundary package; there is no hook for it, and that is deliberate, because the boundary has to hold state and a hook cannot.\n\nPlace boundaries close to what can fail. One broken widget should replace one widget, not the whole page. Two things do not work the way people expect: an error boundary does not catch errors thrown in event handlers or in asynchronous callbacks, and it does not reset itself. Both need explicit handling, a try and catch in the handler and a change of key or a reset call to clear the boundary.',
        'Suspense отмечает границу, на которой React может приостановить рендер поддерева, пока промис в ожидании, и показать fallback. Когда промис разрешается, React повторяет рендер этого поддерева и подменяет fallback настоящим содержимым. Этот один механизм покрывает ленивую загрузку, потоковый серверный рендеринг и загрузку данных через хук use, и потому важнее самих деталей механизма оказываются fallback и место границы.\n\nГраница ошибок — вторая половина. Она ловит ошибки, брошенные во время рендера поддерева под ней, и показывает fallback вместо того, чтобы уронить всё приложение. Реализуется она классом компонентом со статическим getDerivedStateFromError или пакетом react-error-boundary; хука для этого нет, и это сделано намеренно: границе нужно хранить состояние, а хук на это не способен.\n\nСтавьте границы рядом с тем, что может сломаться. Сломанный виджет должен заменять один виджет, а не всю страницу. Две вещи не работают так, как ожидают: граница ошибок не ловит ошибки из обработчиков событий и из асинхронных колбэков, и сама она не сбрасывается. И то и другое требует явной обработки: try и catch в обработчике и смена ключа или вызов reset, чтобы очистить границу.'
      ),
      bullets: [
        L('Suspense pauses rendering and shows a fallback until the promise settles.', 'Suspense приостанавливает рендер и показывает fallback, пока промис не разрешится.'),
        L('An error boundary must be a class component with getDerivedStateFromError.', 'Граница ошибок обязана быть классом компонентом с getDerivedStateFromError.'),
        L('Place the boundary next to the part that can fail, not at the root.', 'Ставьте границу рядом с тем, что может сломаться, а не в корне.'),
        L('Error boundaries do not catch errors from event handlers or async callbacks.', 'Границы ошибок не ловят ошибки из обработчиков событий и асинхронных колбэков.'),
        L('A boundary keeps its error state until it is reset or its key changes.', 'Граница хранит состояние ошибки, пока её не сбросят или не сменят ключ.'),
      ],
      code: `import { Component, Suspense } from 'react';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <p role="alert">This widget failed to render.</p>;
    }
    return this.props.children;
  }
}

export function Page() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="skeleton" />}>
        <Chart />
      </Suspense>
    </ErrorBoundary>
  );
}`,
      table: {
        caption: L('What each boundary catches', 'Что ловит каждая граница'),
        headers: [L('Source', 'Источник'), L('Suspense', 'Suspense'), L('Error boundary', 'Граница ошибок')],
        rows: [
          [
            L('A lazy component loading its chunk', 'Ленивый компонент грузит чанк'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('A promise read through use', 'Промис, прочитанный через use'),
            L('Yes', 'Да'),
            L('No', 'Нет'),
          ],
          [
            L('A component that throws while rendering', 'Компонент бросает исключение при рендере'),
            L('No', 'Нет'),
            L('Yes', 'Да'),
          ],
          [
            L('An error in an event handler', 'Ошибка в обработчике события'),
            L('No', 'Нет'),
            L('No', 'Нет'),
          ],
          [
            L('An error in an unawaited request', 'Ошибка в не-awaited запросе'),
            L('No', 'Нет'),
            L('No', 'Нет'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The boundary that never resets', 'Граница, которая не сбрасывается'),
          text: L(
            'Once an error boundary shows its fallback, it keeps showing it: the component below is unmounted and never retried. A retry button inside the boundary therefore has nothing to retry. Give the boundary a key that changes, or use the reset method of a class boundary or of react-error-boundary.',
            'Как только граница ошибок показала fallback, она показывает его дальше: компонент под ней размонтирован и не повторяется. Поэтому кнопка «повторить» внутри границы повторять нечего. Дайте границе меняющийся ключ или используйте метод reset у классовой границы либо у react-error-boundary.'
          ),
        },
        {
          tone: 'warning',
          title: L('A fallback is not an error message', 'Fallback — это не сообщение об ошибке'),
          text: L(
            'The Suspense fallback announces that content is on the way, so it should keep the layout stable and stay quiet for screen readers. An error fallback is the opposite: it tells the user that something failed and offers a way out. Using the same component for both confuses the user and the assistive technology.',
            'Fallback в Suspense сообщает, что содержимое уже в пути, поэтому он должен сохранять вёрстку и не шуметь для скринридеров. Fallback ошибки — наоборот: он сообщает пользователю, что что-то сломалось, и предлагает выход. Один компонент на оба случая путает и пользователя, и вспомогательные технологии.'
          ),
        },
      ],
      takeaway: L(
        'Every dynamic subtree needs a Suspense fallback above it, and every fallible subtree needs an error boundary next to it.',
        'Каждому динамическому поддереву нужен fallback Suspense над ним, а каждому уязвимому поддереву — граница ошибок рядом.'
      ),
      seeAlso: [
        L('Section 10-5: code splitting, lazy and Suspense', 'Секция 10-5: разделение кода, lazy и Suspense'),
        L('Section 2-5: concurrent rendering and transitions', 'Секция 2-5: конкурентный рендеринг и переходы'),
        L('Section 11-4: React 19 APIs', 'Секция 11-4: API React 19'),
      ],
    },
    {
      id: 'react-ch11-s4',
      title: L('React 19 APIs: use, actions and the form status', 'API React 19: use, действия и состояние формы'),
      body: L(
        'React 19 added use, a hook that reads a promise directly. You pass it a promise and React suspends until it settles; inside a Suspense boundary it needs neither await nor state. In a client component it can also read a promise from a context, which is how frameworks hand server-fetched data to the client without turning it into a client fetch.\n\nServer actions are functions marked with the use server directive. They run on the server, the client calls them as if they were local, and React takes care of the request, the revalidation and the pending state. Because a server action is an ordinary endpoint, a form that posts to it still works when the JavaScript bundle fails to load, which is what progressive enhancement means in practice.\n\nuseActionState takes an action and an initial state and returns the new state, a dispatch function and a pending flag. useOptimistic shows the result the user expects while the action is in flight and rolls it back if the action fails. useFormStatus, read in a component rendered inside the form, exposes the pending flag and the returned data without prop drilling. The manual isSubmitting state and the try and catch around the submit handler are no longer needed.\n\nTwo smaller changes matter for everyday code. ref is a regular prop for function components, so forwardRef is no longer required to pass a ref down, and children can now be passed as an ordinary prop. Both changes remove wrapper components that existed only to satisfy the old API.',
        'React 19 добавил use — хук, который читает промис напрямую. Вы передаёте ему промис, и React подвешивает рендер до его разрешения; внутри границы Suspense ему не нужен ни await, ни состояние. В клиентском компоненте он умеет читать промис из контекста — именно так фреймворки передают полученные на сервере данные клиенту, не превращая это в клиентский запрос.\n\nСерверные действия — это функции, помеченные директивой use server. Они выполняются на сервере, клиент вызывает их как локальные, а React берёт на себя запрос, перевалидацию и состояние ожидания. Поскольку серверное действие — обычная конечная точка, форма, отправляющая в него данные, работает даже тогда, когда бандл не загрузился: вот что прогрессивное улучшение означает на практике.\n\nuseActionState принимает действие и начальное состояние и возвращает новое состояние, функцию вызова и флаг ожидания. useOptimistic показывает результат, который пользователь ожидает, пока действие в полёте, и откатывает его, если действие провалилось. useFormStatus, прочитанный в компоненте, отрисованном внутри формы, отдаёт флаг ожидания и возвращённые данные без прокидывания пропов. Ручное состояние isSubmitting и try с catch вокруг обработчика отправки больше не нужны.\n\nЕщё два небольших изменения важны в ежедневной работе. ref стал обычным пропом для функциональных компонентов, поэтому forwardRef больше не нужен, чтобы передать ref вниз, а children теперь можно передать как обычный проп. Оба изменения убирают обёрточные компоненты, существовавшие только ради старого API.'
      ),
      bullets: [
        L('use(promise) reads a promise directly and suspends until it settles.', 'use(promise) читает промис напрямую и подвешивает рендер до его разрешения.'),
        L('A server action is a function marked with use server and runs on the server.', 'Серверное действие — функция, помеченная use server, и выполняется на сервере.'),
        L('useActionState returns the state, the dispatch function and a pending flag.', 'useActionState возвращает состояние, функцию вызова и флаг ожидания.'),
        L('useOptimistic shows the expected result and rolls it back when the action fails.', 'useOptimistic показывает ожидаемый результат и откатывает его при ошибке действия.'),
        L('useFormStatus must be called in a component rendered inside the form.', 'useFormStatus вызывается в компоненте, отрисованном внутри формы.'),
        L('In React 19 ref is a regular prop for function components and forwardRef is optional.', 'В React 19 ref — обычный проп функционального компонента, а forwardRef необязателен.'),
      ],
      code: `'use client';
import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';

async function createTodo(formData) {
  'use server';
  const title = formData.get('title');
  await db.todo.create({ data: { title } });
  return { title };
}

function Submit() {
  const { pending } = useFormStatus(); // only valid inside a <form>
  return <button disabled={pending}>{pending ? 'Saving' : 'Save'}</button>;
}

export function TodoForm({ initialTodos }) {
  const [state, formAction] = useActionState(createTodo, { title: '' });
  const [todos, setTodos] = useOptimistic(initialTodos, (l, title) => [...l, { id: 'tmp', title }]);
  return (
    <form action={async (fd) => { setTodos(String(fd.get('title'))); await formAction(fd); }}>
      {todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      <input name="title" />
      <Submit />
    </form>
  );
}`,
      table: {
        caption: L('The new APIs in one table', 'Новые API в одной таблице'),
        headers: [L('API', 'API'), L('What it does', 'Что делает'), L('Note', 'Замечание')],
        rows: [
          [
            L('use', 'use'),
            L('Reads a promise and suspends', 'Читает промис и подвешивает рендер'),
            L('Needs a Suspense boundary', 'Нужна граница Suspense'),
          ],
          [
            L('Server actions', 'Серверные действия'),
            L('Call server code from the client', 'Вызов серверного кода из клиента'),
            L('Work without JavaScript', 'Работают без JavaScript'),
          ],
          [
            L('useActionState', 'useActionState'),
            L('Holds the state of an action', 'Хранит состояние действия'),
            L('Returns state, action, pending', 'Возвращает состояние, действие, ожидание'),
          ],
          [
            L('useOptimistic', 'useOptimistic'),
            L('Shows the expected result early', 'Показывает ожидаемый результат сразу'),
            L('Rolls back on failure', 'Откатывается при ошибке'),
          ],
          [
            L('useFormStatus', 'useFormStatus'),
            L('Exposes the pending state of a form', 'Отдаёт состояние ожидания формы'),
            L('Only inside a form', 'Только внутри формы'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The order of the tuple', 'Порядок в тройке'),
          text: L(
            'useActionState returns a triple in the order state, action, pending. Swapping the last two gives you a boolean where the action should be, and the failure appears only when the user clicks: the form then tries to call true. Name the three values on separate lines and the mistake becomes obvious.',
            'useActionState возвращает тройку в порядке состояние, действие, ожидание. Если поменять последние два местами, вместо действия получится логическое значение, и ошибка всплывёт только по клику: форма попытается вызвать true. Выносите три значения на отдельные строки, и ошибка станет очевидной.'
          ),
        },
        {
          tone: 'tip',
          title: L('Server actions survive a broken bundle', 'Серверные действия переживают сломанный бандл'),
          text: L(
            'A form whose action attribute points at a server action posts normally when the JavaScript has not loaded yet. That is the cheapest kind of progressive enhancement: the same markup works with and without the bundle.',
            'Форма, у которой атрибут action указывает на серверное действие, отправляется обычным порядком, даже если JavaScript ещё не загрузился. Это самый дешёвый вид прогрессивного улучшения: одна и та же разметка работает и с бандлом, и без него.'
          ),
        },
      ],
      takeaway: L(
        'Let React own the pending state: useActionState, useOptimistic and useFormStatus remove the manual isSubmitting flag.',
        'Отдайте состояние ожидания React: useActionState, useOptimistic и useFormStatus убирают ручной флаг isSubmitting.'
      ),
      seeAlso: [
        L('Section 9-2: controlled inputs and validation', 'Секция 9-2: контролируемые поля и валидация'),
        L('Section 9-4: server actions and progressive enhancement', 'Секция 9-4: серверные действия и прогрессивное улучшение'),
        L('Section 11-3: Suspense and error boundaries', 'Секция 11-3: Suspense и границы ошибок'),
      ],
    },
    {
      id: 'react-ch11-s5',
      title: L('Testing React components', 'Тестирование React-компонентов'),
      body: L(
        'React Testing Library renders your component into a DOM and gives you queries that ask the way a user does: getByRole, getByLabelText, getByText. The rule that follows from this is simple: test the behaviour a user can observe, not the internals. A component that shows the right text and calls back with the right value is tested by typing into it and clicking a button, never by reading a state variable or a ref.\n\nuser-event reproduces what a browser does: it fires the sequence of events a real interaction produces and waits for React to re-render between them. fireEvent dispatches exactly the event you name and leaves the rest of the sequence to you, which is why fireEvent.change on a text field and fireEvent.click on a checkbox behave differently from a real user, and why such tests pass in isolation and fail in the browser.\n\nMock the boundary of the system, not the code under test. Replacing your API module with a mock proves that the component calls the module you mocked; mocking the network with MSW keeps the component code real and still makes the test deterministic. For time, install fake timers before the component renders and let the testing library advance them, so React can flush the updates before you assert.',
        'React Testing Library рендерит компонент в DOM и даёт запросы, которые спрашивают так, как спрашивает пользователь: getByRole, getByLabelText, getByText. Из этого следует простое правило: тестируйте поведение, которое пользователь может наблюдать, а не внутренности. Компонент, который показывает правильный текст и вызывает колбэк с правильным значением, проверяют вводом текста и кликом по кнопке, а не чтением переменной состояния или ref.\n\nuser-event воспроизводит то, что делает браузер: выстреливает последовательность событий настоящего взаимодействия и ждёт ререндера React между ними. fireEvent отправляет ровно то событие, которое вы назвали, и остальную последовательность оставляет на вас, поэтому fireEvent.change у текстового поля и fireEvent.click у чекбокса ведут себя не так, как настоящий пользователь, и такие тесты проходят в изоляции и падают в браузере.\n\nМокайте границу системы, а не код под тестом. Замена вашего API-модуля заглушкой доказывает лишь то, что компонент вызывает именно замоканный модуль; перехват сети через MSW оставляет код компонента настоящим и при этом делает тест детерминированным. Со временем: ставьте поддельные таймеры до рендера компонента и позволяйте тестовой библиотеке прокручивать их, чтобы React успел применить обновления до ваших проверок.'
      ),
      bullets: [
        L('Query by role and label first: getByRole, getByLabelText, getByText.', 'Сначала ищите по роли и подписи: getByRole, getByLabelText, getByText.'),
        L('user-event fires the whole event sequence, fireEvent fires one event.', 'user-event выстреливает всю последовательность событий, а fireEvent — одно событие.'),
        L('Await asynchronous content with findBy or waitFor, never with a fixed sleep.', 'Асинхронное содержимое ждите через findBy или waitFor, а не через фиксированную паузу.'),
        L('Mock the network with MSW instead of mocking your own API module.', 'Мокайте сеть через MSW, а не свой собственный API-модуль.'),
        L('Install fake timers before rendering and let the library advance them.', 'Ставьте поддельные таймеры до рендера и позволяйте библиотеке их прокручивать.'),
        L('Assert what the user sees; the internals are free to change.', 'Проверяйте то, что видит пользователь: внутренности менять можно свободно.'),
      ],
      code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/todos', () => HttpResponse.json([{ id: 1, title: 'Write tests' }]))
);

test('adds a todo through the form', async () => {
  const user = userEvent.setup();
  render(<TodoForm />);

  await user.type(screen.getByLabelText('Title'), 'Write tests');
  await user.click(screen.getByRole('button', { name: 'Add' }));

  expect(await screen.findByText('Write tests')).toBeInTheDocument();
});

afterAll(() => server.close());`,
      table: {
        caption: L('How to do the common test tasks', 'Как решать типовые задачи тестирования'),
        headers: [L('Task', 'Задача'), L('Prefer', 'Предпочитайте'), L('Instead of', 'А не')],
        rows: [
          [
            L('Find an element', 'Найти элемент'),
            L('screen.getByRole with a name', 'screen.getByRole с именем'),
            L('container.querySelector', 'container.querySelector'),
          ],
          [
            L('Simulate typing', 'Имитировать ввод'),
            L('user.type', 'user.type'),
            L('fireEvent.change', 'fireEvent.change'),
          ],
          [
            L('Wait for async text', 'Дождаться текста'),
            L('await screen.findByText', 'await screen.findByText'),
            L('A fixed setTimeout', 'Фиксированный setTimeout'),
          ],
          [
            L('Mock the network', 'Замокать сеть'),
            L('An MSW handler', 'Обработчик MSW'),
            L('jest.mock of your API module', 'jest.mock вашего API-модуля'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('fireEvent does not behave like a user', 'fireEvent ведёт себя не как пользователь'),
          text: L(
            'React listens for the events a browser really fires, so a checkbox toggles on click and not on change. A test written with fireEvent.change on a checkbox silently asserts nothing. Use user-event and let it produce the whole sequence.',
            'React слушает те события, которые браузер действительно отправляет, поэтому чекбокс переключается по клику, а не по change. Тест с fireEvent.change на чекбоксе молча проверяет ничто. Используйте user-event и дайте ему выдать всю последовательность.'
          ),
        },
        {
          tone: 'tip',
          title: L('Keep the test environment honest', 'Держите тестовое окружение честным'),
          text: L(
            'Assert on what a user can perceive: a role, a name, a visible message. Assertions on class names or DOM depth turn every refactor into a broken test and teach the team to distrust the suite. A test that fails on a rename but passes on a broken button is testing the wrong thing.',
            'Проверяйте то, что воспринимает пользователь: роль, имя, видимое сообщение. Проверки имён классов или глубины DOM превращают любой рефакторинг в упавший тест и учат команду не доверять тестам. Тест, который падает после переименования, но проходит при сломанной кнопке, проверяет не то.'
          ),
        },
      ],
      takeaway: L(
        'Test what the user sees and does: query by role, drive it with user-event, and mock the network instead of your own code.',
        'Тестируйте то, что пользователь видит и делает: ищите по роли, работайте через user-event и мокайте сеть, а не собственный код.'
      ),
      seeAlso: [
        L('Section 9-1: native form semantics', 'Секция 9-1: нативная семантика форм'),
        L('Section 11-4: React 19 APIs', 'Секция 11-4: API React 19'),
        L('Section 5-6: common effect mistakes', 'Секция 5-6: типичные ошибки в эффектах'),
      ],
    },
  ],
};
