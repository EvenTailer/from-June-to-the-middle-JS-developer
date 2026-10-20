import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const hooksTasks: PracticeTask[] = [
  {
    id: 'topic-hooks-1',
    moduleId: 'react',
    topic: 'hooks',
    level: 'basic',
    title: L('A hook that toggles a boolean', 'Хук, переключающий логическое значение'),
    brief: L(
      'Write a custom hook useToggle that keeps a boolean in the state. The hook takes an optional initial value of type boolean, which defaults to false, and returns an object with four fields: value, the current boolean; toggle, a function that inverts the current value; setTrue, a function that sets the value to true; and setFalse, a function that sets the value to false. The functions must be stable, so wrap each of them in useCallback with an empty dependency array, and the state must be updated through the function form of the setter, that is through setValue with a function that receives the current value. Example: after calling toggle twice the value is back to false, and setTrue makes the value true regardless of the previous value.',
      'Напишите кастомный хук useToggle, хранящий логическое значение в состоянии. Хук принимает необязательное начальное значение типа boolean, равное false по умолчанию, и возвращает объект с четырьмя полями: value — текущее логическое значение; toggle — функция, инвертирующая текущее значение; setTrue — функция, устанавливающая значение в true; и setFalse — функция, устанавливающая значение в false. Функции должны быть стабильными, поэтому каждую оберните в useCallback с пустым массивом зависимостей, а состояние обновляйте через функциональную форму сеттера, то есть setValue с функцией, получающей текущее значение. Пример: после двух вызовов toggle значение снова false, а setTrue делает значение true независимо от предыдущего.'
    ),
    hint: L(
      'The functional form of the setter is what makes the toggle correct: setValue((current) => !current) reads the freshest value, while setValue(!value) would read the value captured at the render that created the callback.',
      'Функциональная форма сеттера делает toggle корректным: setValue((current) => !current) читает самое свежее значение, тогда как setValue(!value) прочитало бы значение, захваченное в том рендере, где был создан колбэк.'
    ),
    solution: `import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((current) => !current);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse } as const;
}`,
    explanation: L(
      'A custom hook is just a function whose name starts with use, and inside it the usual rules apply: the hooks must be called unconditionally and in the same order on every render. The functional form of the setter matters here, because the toggle callback never changes and therefore never sees a fresh value prop; reading the current value through the callback argument is what keeps it correct even when several toggles happen in one batch. The empty dependency array is correct for the three functions because none of them reads a changing value, and it makes them stable, so a component that receives them as props does not re-render on every keystroke of the parent. The returned object is typed as a constant tuple of names, so the consumer gets the exact fields.',
      'Кастомный хук — это просто функция, имя которой начинается с use, и внутри неё действуют обычные правила: хуки должны вызываться безусловно и в одном и том же порядке на каждом рендере. Функциональная форма сеттера здесь важна, потому что колбэк toggle никогда не меняется и потому никогда не видит свежее значение из пропсов; чтение текущего значения через аргумент колбэка остаётся корректным, даже если несколько переключений попали в один пакет обновлений. Пустой массив зависимостей для трёх функций верен, потому что ни одна из них не читает меняющееся значение, и он делает их стабильными, так что компонент, получающий их пропсами, не перерендеривается на каждый ввод родителя. Возвращаемый объект типизирован как константа с именами полей, поэтому потребитель получает ровно те поля, что есть.'
    ),
  },
  {
    id: 'topic-hooks-2',
    moduleId: 'react',
    topic: 'hooks',
    level: 'basic',
    title: L('A hook that remembers the previous value', 'Хук, запоминающий предыдущее значение'),
    brief: L(
      'Write a custom hook usePrevious that takes a value of any type and returns the value this hook received on the previous render. On the very first render there is no previous value, so the hook must return undefined. Use a ref to store the value and update that ref inside an effect that depends on the value, and return the current content of the ref. The effect must not have an empty dependency array, otherwise the ref would freeze at the first value. Example: when the value changes from 1 to 2, the hook returns 1 on the render that shows 2, and on the first render it returns undefined.',
      'Напишите кастомный хук usePrevious, который принимает значение любого типа и возвращает значение, полученное хуком на предыдущем рендере. На самом первом рендере предыдущего значения нет, поэтому хук должен вернуть undefined. Используйте ref для хранения значения и обновляйте этот ref внутри эффекта, зависящего от значения, и возвращайте текущее содержимое ref. У эффекта не должно быть пустого массива зависимостей, иначе ref замерзнет на первом значении. Пример: когда значение меняется с 1 на 2, хук возвращает 1 на том рендере, где показано 2, а на первом рендере он возвращает undefined.'
    ),
    hint: L(
      'The effect must run after every change of the value, and the value must be written into the ref there. Reading the ref during the render is allowed, because reading a ref does not subscribe the component to it.',
      'Эффект должен выполняться после каждого изменения значения, и значение записывается в ref именно там. Читать ref во время рендера можно: чтение ref не подписывает компонент на него.'
    ),
    solution: `import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}`,
    explanation: L(
      'The trick is the order of the operations: the effect that writes the ref runs after the render has finished, so during that render the ref still holds the value from the previous cycle and the hook returns it. The dependency array with the value is what keeps the ref in sync, and an empty array would freeze it on the very first value forever. A ref is the right tool because writing to it does not trigger a render, while the state would cause an extra render on every change. The same pattern with an object instead of a single value gives a hook that returns the previous props, which is handy for comparing the old and the new data of a request.',
      'Суть приёма в порядке операций: эффект, пишущий в ref, выполняется после того, как рендер завершился, поэтому во время этого рендера в ref ещё лежит значение предыдущего цикла, и хук возвращает его. Массив зависимостей со значением держит ref в синхроне, и пустой массив заморозил бы его навсегда на первом значении. Ref здесь — правильный инструмент, потому что запись в него не вызывает рендер, тогда как состояние давало бы лишний рендер на каждое изменение. Тот же приём с объектом вместо одного значения даёт хук, возвращающий предыдущие пропсы, что удобно для сравнения старых и новых данных запроса.'
    ),
  },
  {
    id: 'topic-hooks-3',
    moduleId: 'react',
    topic: 'hooks',
    level: 'basic',
    title: L('A debounced value hook', 'Хук с задержкой значения'),
    brief: L(
      'Write a custom hook useDebounce that delays the propagation of a value. The hook takes a value of any type and a delay in milliseconds, which defaults to 300, and returns the value that should be used right now. The returned value must change only after the delay has passed without the input value changing, and when the input value changes during the waiting time, the previous timer must be cancelled and the countdown must start again. The timer must be created inside an effect that depends on the value and the delay, and the effect must return a function that clears the timer. Example: with a delay of 300 the value "a" produces the debounced value "a" immediately, but a fast sequence "a", "ab", "abc" produces the debounced value "abc" and only 300 milliseconds after the last change.',
      'Напишите кастомный хук useDebounce, откладывающий передачу значения. Хук принимает значение любого типа и задержку в миллисекундах, равную 300 по умолчанию, и возвращает значение, которое нужно использовать прямо сейчас. Возвращаемое значение должно меняться только после того, как задержка истекла без изменения входного значения, а если входное значение изменилось во время ожидания, прежний таймер должен быть отменён и отсчёт должен начаться заново. Таймер создаётся внутри эффекта, зависящего от значения и задержки, а эффект возвращает функцию, которая очищает таймер. Пример: при задержке 300 значение "a" даёт отложенное значение "a" сразу, но быстрая последовательность "a", "ab", "abc" даёт отложенное значение "abc" и только через 300 миллисекунд после последнего изменения.'
    ),
    hint: L(
      'Each change of the value starts a new timer, so the timer of the previous effect must be cleared. Returning the cleanup from the effect is exactly what cancels it.',
      'Каждое изменение значения запускает новый таймер, поэтому таймер предыдущего эффекта нужно очистить. Возврат функции очистки из эффекта — это и есть отмена.'
    ),
    solution: `import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}`,
    explanation: L(
      'Debouncing is a matter of restarting a countdown, and the cleanup function of the effect is the mechanism that stops the previous countdown. The state is initialized with the incoming value so that the first render does not show an empty result while waiting for the first timer. The delay belongs in the dependency array next to the value, because changing the delay must also restart the timer. A debounced value is what a search field should react to, while the input itself must stay controlled by the immediate value, otherwise the letters appear with a delay. The same pattern with a function instead of a value produces a debounced callback.',
      'Дебаунс — это перезапуск отсчёта, а функция очистки эффекта и есть механизм, который останавливает предыдущий отсчёт. Состояние инициализируется входным значением, чтобы первый рендер не показывал пустой результат в ожидании первого таймера. Задержка стоит в массиве зависимостей рядом со значением, потому что изменение задержки тоже должно перезапускать таймер. Отложенное значение — это то, на что должен реагировать поиск, тогда как само поле ввода остаётся под контролем мгновенного значения, иначе буквы появлялись бы с задержкой. Тот же приём с функцией вместо значения даёт отложенный колбэк.'
    ),
  },
  {
    id: 'topic-hooks-4',
    moduleId: 'react',
    topic: 'hooks',
    level: 'intermediate',
    title: L('Fetch with a cleanup that aborts the request', 'Загрузка с очисткой, отменяющей запрос'),
    brief: L(
      'Write a hook useUser that loads a user by the id it receives and cancels the previous request when the id changes. The hook takes the userId of type number and returns an object with the fields user of type User | null and error of type string | null, where User has the fields id of type number and name of type string. The request must be made with the function fetch and the address https://api.example.com/users/ followed by the id, and the signal of the request must come from an AbortController created inside the effect. The effect must return a cleanup function that calls abort on that controller, so that a request of a previous id is not applied to the state after the id has changed. When the request was aborted, the catch block must not set the error. Example: for the id 1 the hook loads the user with the id 1, and when the id changes to 2 before the first answer arrives, the answer for the id 1 is ignored.',
      'Напишите хук useUser, который загружает пользователя по полученному id и отменяет предыдущий запрос при смене id. Хук принимает userId типа number и возвращает объект с полями user типа User | null и error типа string | null, где User имеет поля id типа number и name типа string. Запрос выполняется функцией fetch по адресу https://api.example.com/users/ и далее id, а сигнал запроса должен приходить из AbortController, созданного внутри эффекта. Эффект должен возвращать функцию очистки, которая вызывает abort у этого контроллера, чтобы ответ по предыдущему id не применился к состоянию после смены id. Если запрос был отменён, блок catch не должен выставлять ошибку. Пример: для id 1 хук загружает пользователя с id 1, а если id сменился на 2 до прихода первого ответа, ответ для id 1 игнорируется.'
    ),
    hint: L(
      'The AbortController is created inside the effect, so every run of the effect gets its own controller, and the cleanup of the effect aborts exactly that controller. The aborted signal is checked in the catch block, because an abort also rejects the promise.',
      'AbortController создаётся внутри эффекта, поэтому каждый его прогон получает свой контроллер, а очистка эффекта отменяет именно этот контроллер. Признак отмены проверяется в блоке catch, потому что отмена тоже приводит к отклонению промиса.'
    ),
    solution: `import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

export function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(
          \`https://api.example.com/users/\${userId}\`,
          { signal: controller.signal }
        );
        const data = (await response.json()) as User;

        setUser(data);
        setError(null);
      } catch (cause) {
        if (controller.signal.aborted) {
          return;
        }

        setError(cause instanceof Error ? cause.message : 'Unknown error');
      }
    }

    load();

    return () => {
      controller.abort();
    };
  }, [userId]);

  return { user, error };
}`,
    explanation: L(
      'Every effect run owns its own AbortController, and the cleanup of the effect aborts exactly that controller, so the request of the previous id is cancelled the moment the id changes. Without the cancellation, the answers can arrive out of order and the state of an old user can overwrite the state of a new one. The abort rejects the promise, so the catch block runs, and the check on the aborted signal is what keeps the cancellation from being reported as a failure. The controller also frees the connection and lets the browser drop the response body, which is why the API of fetch takes a signal instead of a plain timeout. This pattern is the base of every "search as you type" and every "load on scroll" hook.',
      'Каждый прогон эффекта владеет своим AbortController, а очистка эффекта отменяет именно этот контроллер, поэтому запрос по предыдущему id отменяется в момент смены id. Без отмены ответы могут приходить не по порядку, и состояние старого пользователя перезапишет состояние нового. Отмена отклоняет промис, поэтому блок catch выполняется, и проверка признака отмены не даёт отмене выглядеть как сбоем. Контроллер заодно освобождает соединение и позволяет браузеру сбросить тело ответа, и именно поэтому API fetch принимает сигнал, а не просто таймаут. Этот приём — основа каждого хука «поиск по мере ввода» и каждого хука «догрузка при скролле».'
    ),
  },
  {
    id: 'topic-hooks-5',
    moduleId: 'react',
    topic: 'hooks',
    level: 'intermediate',
    title: L('A hook that attaches a DOM event listener', 'Хук, навешивающий слушатель события DOM'),
    brief: L(
      'Write a hook useEventListener that attaches a listener to a DOM event and removes it automatically. The hook takes the type of the event, a generic parameter limited to the keys of WindowEventMap, so that the handler receives the correctly typed event; the handler itself takes the event of the matching type; and an optional target of type Window | Document | HTMLElement, which defaults to the window object. The hook must keep the latest handler in a ref that is updated in an effect, so that a new function passed on every render does not cause the listener to be removed and added again. The effect that attaches the listener must depend only on the type of the event and the target, and it must return a function that removes the listener. Example: for the type "resize" the handler receives an event of type UIEvent, and for the type "keydown" it receives a KeyboardEvent.',
      'Напишите хук useEventListener, который навешивает слушатель DOM-события и сам его снимает. Хук принимает тип события, обобщённый параметр, ограниченный ключами WindowEventMap, чтобы обработчик получал корректно типизированное событие; сам обработчик принимает событие соответствующего типа; и необязательный target типа Window | Document | HTMLElement, по умолчанию — объект window. Хук должен хранить последний обработчик в ref, который обновляется в эффекте, чтобы новая функция, передаваемая на каждом рендере, не приводила к снятию и повторному навешиванию слушателя. Эффект, который навешивает слушатель, должен зависеть только от типа события и от target, и возвращать функцию, которая снимает слушатель. Пример: для типа "resize" обработчик получает событие типа UIEvent, а для типа "keydown" — KeyboardEvent.'
    ),
    hint: L(
      'The generic parameter constrained to keyof WindowEventMap gives the mapped type of the event for free, and the ref keeps the handler fresh without adding it to the dependency array of the attaching effect.',
      'Обобщённый параметр, ограниченный keyof WindowEventMap, бесплатно даёт отображаемый тип события, а ref сохраняет обработчик свежим, не добавляя его в массив зависимостей эффекта, который навешивает слушатель.'
    ),
    solution: `import { useEffect, useRef } from 'react';

type EventTargetLike = Window | Document | HTMLElement;

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  target: EventTargetLike | null =
    typeof window === 'undefined' ? null : window
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!target) {
      return;
    }

    const node = target as EventTarget;
    const listener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    node.addEventListener(type, listener as EventListener);

    return () => {
      node.removeEventListener(type, listener as EventListener);
    };
  }, [type, target]);
}`,
    explanation: L(
      'The generic parameter constrained to keyof WindowEventMap ties the name of the event to the type of its event object, so the handler of "keydown" receives a KeyboardEvent and can read the key without a cast. The ref separates the freshness of the handler from the lifetime of the listener: the handler is replaced on every render, but the listener is attached once per type and per target, and it always calls the current handler through the ref. If the handler were in the dependency array, the listener would be removed and attached again on every render, which is both wasteful and, for some events, visibly broken. The cleanup removes the listener, so nothing survives the unmount of the component.',
      'Обобщённый параметр, ограниченный keyof WindowEventMap, связывает имя события с типом его объекта, поэтому обработчик "keydown" получает KeyboardEvent и читает key без приведений. Ref отделяет свежесть обработчика от времени жизни слушателя: обработчик заменяется на каждом рендере, а слушатель навешивается один раз на тип и на цель и всегда вызывает актуальный обработчик через ref. Если бы обработчик был в массиве зависимостей, слушатель снимался бы и навешивался заново на каждом рендере, что и неэффективно, и для некоторых событий заметно ломает поведение. Очистка снимает слушатель, поэтому после размонтирования ничего не остаётся.'
    ),
  },
  {
    id: 'topic-hooks-6',
    moduleId: 'react',
    topic: 'hooks',
    level: 'intermediate',
    title: L('A hook that detects a click outside', 'Хук, отслеживающий клик вне элемента'),
    brief: L(
      'Write a hook useOnClickOutside that calls a handler when the user clicks outside of an element. The hook takes a handler of type (event: MouseEvent) => void and returns a ref that must be attached to that element. The ref has the generic parameter T that extends HTMLElement. The listener must be attached to the document for the event "mousedown", and the handler must be called only when the click happened outside the element, so the check uses the method contains of the element with the target of the event. The handler must be kept in a ref that is updated in an effect, so that a new function on every render does not cause the listener to be reattached. The effect that attaches the listener must return a function that removes it. Example: with the ref attached to a div, a click inside the div does not call the handler, and a click on the page outside the div calls it with the mouse event.',
      'Напишите хук useOnClickOutside, который вызывает обработчик, когда пользователь кликает вне элемента. Хук принимает обработчик типа (event: MouseEvent) => void и возвращает ref, который нужно навесить на этот элемент. У ref обобщённый параметр T, расширяющий HTMLElement. Слушатель навешивается на document на событие "mousedown", а обработчик вызывается только если клик произошёл вне элемента, поэтому проверка использует метод contains элемента с целью события. Обработчик хранится в ref, который обновляется в эффекте, чтобы новая функция на каждом рендере не приводила к повторному навешиванию слушателя. Эффект, который навешивает слушатель, должен возвращать функцию, которая его снимает. Пример: если ref навешен на div, клик внутри div не вызывает обработчик, а клик по странице вне div вызывает его с событием мыши.'
    ),
    hint: L(
      'The element contains the target of the event when the click landed inside it, so the handler must run only when contains returns false. Use the ref of the element to ask that question.',
      'Элемент содержит цель события, когда клик пришёлся внутрь него, поэтому обработчик должен выполняться только когда contains возвращает false. Задать этот вопрос можно через ref элемента.'
    ),
    solution: `import { useEffect, useRef, type RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent) => void
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const element = ref.current;

      if (!element) {
        return;
      }

      if (element.contains(event.target as Node)) {
        return;
      }

      savedHandler.current(event);
    }

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  return ref;
}`,
    explanation: L(
      'The listener lives on the document, not on the element, because a click outside the element never reaches the element itself, and this is the reason the hook returns a ref instead of accepting an id or a selector. The check with contains is what separates the click inside from the click outside, and the cast of the target to Node is needed because the target of a mouse event is an EventTarget, while contains expects a node. The event "mousedown" is used on purpose: it fires before the focus changes, so the dropdown is already closed when the field below loses the focus, whereas "click" would let the focus move first. The handler is stored in a ref, so a new function on every render does not reattach the listener.',
      'Слушатель живёт на document, а не на элементе, потому что клик вне элемента до элемента вообще не доходит, и именно поэтому хук возвращает ref, а не принимает id или селектор. Проверка через contains отделяет клик внутри от клика снаружи, а приведение цели к Node нужно потому, что цель мышиного события — это EventTarget, а contains ждёт узел. Событие "mousedown" выбрано намеренно: оно срабатывает раньше, чем сменится фокус, поэтому выпадающий список уже закрыт, когда поле ниже потеряет фокус, тогда как "click" сначала сменил бы фокус. Обработчик хранится в ref, поэтому новая функция на каждом рендере не приводит к повторному навешиванию слушателя.'
    ),
  },
  {
    id: 'topic-hooks-7',
    moduleId: 'react',
    topic: 'hooks',
    level: 'advanced',
    title: L('A hook that returns the previous props', 'Хук, возвращающий предыдущие пропсы'),
    brief: L(
      'Write a hook usePreviousProps that returns the props object of the previous render. The hook takes a props object of a generic type P that extends object, and returns that object or undefined when there was no previous render. The props must be stored in a ref, and the ref must be updated in an effect that runs after every render, so the effect must have no dependency array at all. Then write a small component Profile that takes the props name and email, both of type string, uses the hook, and renders a p element with the text "Name changed" when the name differs from the previous one, and a p element with the text "Email changed" when the email differs. Example: when the name changes from "Ann" to "Bob", the component renders the p with "Name changed" and does not render the p with "Email changed".',
      'Напишите хук usePreviousProps, возвращающий объект пропсов предыдущего рендера. Хук принимает объект пропсов обобщённого типа P, расширяющего object, и возвращает этот объект или undefined, если предыдущего рендера не было. Пропсы должны храниться в ref, а ref обновляться в эффекте, который выполняется после каждого рендера, поэтому у этого эффекта не должно быть массива зависимостей вовсе. Затем напишите небольшой компонент Profile, принимающий пропсы name и email типа string, использующий хук и выводящий элемент p с текстом "Name changed", когда имя отличается от предыдущего, и элемент p с текстом "Email changed", когда почта отличается. Пример: когда имя меняется с "Ann" на "Bob", компонент выводит p с "Name changed" и не выводит p с "Email changed".'
    ),
    hint: L(
      'An effect without a dependency array runs after every render, which is exactly the semantics of "previous". The component has to build a new object of the changed props on every render, otherwise the effect would not see the new values.',
      'Эффект без массива зависимостей выполняется после каждого рендера, и это ровно семантика «предыдущее». Компонент обязан собирать новый объект изменённых пропсов на каждом рендере, иначе эффект не увидит новые значения.'
    ),
    solution: `import { useEffect, useRef } from 'react';

export function usePreviousProps<P extends object>(props: P): P | undefined {
  const ref = useRef<P | undefined>(undefined);

  useEffect(() => {
    ref.current = props;
  });

  return ref.current;
}

interface ProfileProps {
  name: string;
  email: string;
}

export function Profile({ name, email }: ProfileProps) {
  const previous = usePreviousProps({ name, email });

  const nameChanged = previous !== undefined && previous.name !== name;
  const emailChanged = previous !== undefined && previous.email !== email;

  return (
    <div>
      {nameChanged ? <p>Name changed</p> : null}
      {emailChanged ? <p>Email changed</p> : null}
    </div>
  );
}`,
    explanation: L(
      'The difference from the hook that remembers one value is the missing dependency array: the effect must run after every render, because "the previous props" means the props of the previous render whatever changed in them. The object literal passed to the hook is created on every render, and the effect without dependencies sees that new object each time, so the ref always holds the props of the render before the current one. The checks against undefined matter, because on the first render there is nothing to compare with and the component would otherwise report a change of both fields. Comparing the fields one by one is more useful than comparing the objects, because two objects with the same content are different references, and a reference comparison would report a change on every render.',
      'Отличие от хука, запоминающего одно значение, — в отсутствии массива зависимостей: эффект должен выполняться после каждого рендера, потому что «предыдущие пропсы» — это пропсы предыдущего рендера, что бы ни изменилось. Объектный литерал, передаваемый в хук, создаётся на каждом рендере, и эффект без зависимостей каждый раз видит этот новый объект, так что ref всегда хранит пропсы рендера, предшествующего текущему. Проверки на undefined важны, потому что при первом рендере сравнивать не с чем и компонент иначе сообщил бы об изменении обоих полей. Сравнивать поля по одному полезнее, чем сравнивать объекты: два объекта с одинаковым содержимым — разные ссылки, и сравнение по ссылке сообщало бы об изменении на каждом рендере.'
    ),
  },
  {
    id: 'topic-hooks-8',
    moduleId: 'react',
    topic: 'hooks',
    level: 'advanced',
    title: L('An effect that survives the double run of StrictMode', 'Эффект, переживающий двойной запуск StrictMode'),
    brief: L(
      'Write a hook useMetric that loads a number from the server and stays correct when React runs the effect twice in the StrictMode of the development build. The hook takes a key of type string and returns the loaded number or null. The request must be made with fetch to the address https://api.example.com/metrics/ followed by the key, and the response is an object with the field value of type number. To avoid two identical requests, the promise of the request must be kept in a module level Map that lives outside the component, keyed by the key of the metric, so that the second run of the effect reuses the promise of the first one and no second request is sent. The effect must also guard the state update with a flag that tells whether the component is still mounted. Example: in the StrictMode the network panel shows one request for the key "visits", not two.',
      'Напишите хук useMetric, который загружает число с сервера и остаётся корректным, когда React выполняет эффект дважды в StrictMode режима разработки. Хук принимает ключ типа string и возвращает загруженное число или null. Запрос выполняется через fetch по адресу https://api.example.com/metrics/ и далее ключ, а ответ — это объект с полем value типа number. Чтобы не было двух одинаковых запросов, промис запроса должен храниться в Map на уровне модуля, живущей вне компонента, с ключом по ключу метрики, чтобы второй прогон эффекта переиспользовал промис первого и второй запрос не отправлялся. Эффект также должен защищать обновление состояния флагом, который показывает, что компонент ещё смонтирован. Пример: в StrictMode в панели сети виден один запрос по ключу "visits", а не два.'
    ),
    hint: L(
      'State inside the component is created again when the component is mounted a second time, but a variable on the module level survives, because the module is evaluated once. A promise stored in that variable is shared by both runs of the effect.',
      'Состояние внутри компонента создаётся заново при повторном монтировании, а переменная на уровне модуля переживает это, потому что модуль вычисляется один раз. Промис, сохранённый в этой переменной, разделяется обоими прогонами эффекта.'
    ),
    solution: `import { useEffect, useState } from 'react';

const metricCache = new Map<string, Promise<number>>();

function loadMetric(key: string): Promise<number> {
  const cached = metricCache.get(key);

  if (cached) {
    return cached;
  }

  const request = fetch(\`https://api.example.com/metrics/\${key}\`)
    .then((response) => response.json() as Promise<{ value: number }>)
    .then((data) => data.value);

  metricCache.set(key, request);

  return request;
}

export function useMetric(key: string) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    loadMetric(key).then((next) => {
      if (!active) {
        return;
      }

      setValue(next);
    });

    return () => {
      active = false;
    };
  }, [key]);

  return value;
}`,
    explanation: L(
      'In the development build the StrictMode mounts the component, runs the effect, unmounts it, runs the cleanup and mounts it again, so an effect that starts a request sends it twice. The cleanup cannot prevent the second request, because the second mount is a new run of the effect, and aborting the first request would only trade a duplicate for a wasted request. The cache on the module level is the durable answer: the module is evaluated once, so both runs of the effect get the same promise and the network sees one request. The flag that tracks whether the component is still mounted protects the state update, because the first run of the effect resolves after the component was already unmounted, and writing to the state of an unmounted component is a warning in React. The cache is a module level variable on purpose, and in a real application it would also need a way to expire the entries.',
      'В режиме разработки StrictMode монтирует компонент, выполняет эффект, размонтирует его, выполняет очистку и монтирует снова, поэтому эффект, запускающий запрос, отправляет его дважды. Очистка не может помешать второму запросу, потому что второе монтирование — это новый прогон эффекта, а отмена первого запроса лишь заменила бы дублирование на бесполезный запрос. Кэш на уровне модуля — это надёжный ответ: модуль вычисляется один раз, поэтому оба прогона эффекта получают один и тот же промис, и сеть видит один запрос. Флаг, отслеживающий, что компонент ещё смонтирован, защищает обновление состояния, потому что первый прогон эффекта разрешается уже после размонтирования, а запись в состояние размонтированного компонента — это предупреждение React. Кэш намеренно живёт на уровне модуля, и в настоящем приложении ему понадобится ещё и способ устаревать записи.'
    ),
  },
];
