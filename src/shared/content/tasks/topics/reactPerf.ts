import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const reactPerfTasks: PracticeTask[] = [
  {
    id: 'topic-react-perf-1',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'basic',
    title: L('Derived data without a state copy', 'Производные данные без копии в состоянии'),
    brief: L(
      'Write a cart summary that does not keep a copy of the data it can calculate. The component takes the prop items, an array of objects with the fields id of type string, price of type number and quantity of type number, and keeps only the coupon code in the state. The total must be calculated during the render as the sum of price multiplied by quantity over all the items, and the discounted total must be 10 percent less than the total when the coupon code in upper case is "SAVE10", and equal to the total otherwise. The component must not store the total in the state and must not use an effect to calculate it, and the displayed total must have two digits after the decimal point. Example: with the items of price 10 and quantity 2 and the coupon "save10" the component shows "Total: 18.00", and without the coupon it shows "Total: 20.00".',
      'Напишите сводку корзины, которая не хранит копию данных, которые можно посчитать. Компонент принимает пропс items — массив объектов с полями id типа string, price типа number и quantity типа number, — и хранит в состоянии только код купона. Итог считается прямо во время рендера как сумма price, умноженного на quantity, по всем элементам, а итог со скидкой на 10 процентов меньше итога, когда код купона в верхнем регистре равен "SAVE10", и равен итогу иначе. Компонент не должен хранить итог в состоянии и не должен вычислять его в эффекте, а показанный итог должен содержать два знака после запятой. Пример: при элементах с ценой 10 и количеством 2 и купоне "save10" компонент показывает "Total: 18.00", а без купона — "Total: 20.00".'
    ),
    hint: L(
      'Everything that can be calculated from the props during the render must be calculated during the render. A state that mirrors a prop is a second source of truth, and an effect that fills it adds one more render to every change.',
      'Всё, что можно посчитать из пропсов во время рендера, нужно считать во время рендера. Состояние, зеркалящее пропс, — это второй источник истины, а эффект, который его заполняет, добавляет ещё один рендер на каждое изменение.'
    ),
    solution: `import { useMemo, useState } from 'react';

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

export function CartSummary({ items }: { items: CartItem[] }) {
  const [coupon, setCoupon] = useState('');

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const hasDiscount = coupon.trim().toUpperCase() === 'SAVE10';
  const finalTotal = hasDiscount ? total * 0.9 : total;

  return (
    <div>
      <label htmlFor="coupon">Coupon</label>
      <input
        id="coupon"
        value={coupon}
        onChange={(event) => setCoupon(event.target.value)}
      />

      <p>Total: {finalTotal.toFixed(2)}</p>
    </div>
  );
}`,
    explanation: L(
      'The state of a component should hold the facts that cannot be calculated, and the coupon code is such a fact while the total is not: the total is a pure function of the props and of the coupon. Copying the props into the state and then keeping them in sync with an effect is the classic source of the "one render too late" bug, because the effect runs after the render and the value is briefly wrong on the screen. The useMemo hook is not required here, but it is harmless and it pays off when the list is long, because the reduction runs only when the array really changes. The comparison of the coupon is done in the upper case, so the code does not depend on how the user typed it.',
      'Состояние компонента должно хранить факты, которые нельзя вычислить, и код купона — такой факт, а итог нет: итог это чистая функция пропсов и купона. Копирование пропсов в состояние и синхронизация через эффект — классический источник бага «на один рендер позже», потому что эффект выполняется после рендера и значение на экране на мгновение неверно. Хук useMemo здесь не обязателен, но он безвреден и окупается на длинном списке, потому что свёртка выполняется только когда массив действительно меняется. Сравнение купона идёт в верхнем регистре, поэтому код не зависит от того, как его набрали.'
    ),
  },
  {
    id: 'topic-react-perf-2',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'basic',
    title: L('useMemo for a value and useCallback for a function', 'useMemo для значения и useCallback для функции'),
    brief: L(
      'Write a component ProductList that remembers both an expensive value and a stable function. The props are products, an array of objects with the fields id of type number, title of type string and price of type number, and the component keeps the id of the selected product in the state. The total price must be calculated with useMemo so that it is recalculated only when the array of products changes, and the dependency array of useMemo must contain the array of products. The handler that selects a product must be created with useCallback with an empty dependency array, so that its identity does not change from render to render, and it must set the selected id. Example: when the products array is replaced by a new array with the same content, the total is calculated again, but the handler keeps the same identity.',
      'Напишите компонент ProductList, который запоминает и дорогое значение, и стабильную функцию. Пропс products — массив объектов с полями id типа number, title типа string и price типа number, — а компонент хранит id выбранного товара в состоянии. Итоговая цена должна считаться через useMemo, чтобы пересчитываться только при изменении массива товаров, и массив зависимостей useMemo должен содержать массив products. Обработчик выбора товара должен создаваться через useCallback с пустым массивом зависимостей, чтобы его идентичность не менялась от рендера к рендеру, и он должен записывать выбранный id. Пример: когда массив товаров заменяют новым массивом с тем же содержимым, итог считается заново, но обработчик сохраняет ту же идентичность.'
    ),
    hint: L(
      'useMemo remembers a value and useCallback remembers a function, and useCallback with an empty dependency array is only correct when the function reads nothing that changes. A function that reads a changing value must list that value in the dependencies.',
      'useMemo запоминает значение, а useCallback — функцию, и useCallback с пустым массивом зависимостей верен только тогда, когда функция не читает ничего меняющегося. Функция, читающая меняющееся значение, обязана перечислить его в зависимостях.'
    ),
    solution: `import { useCallback, useMemo, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

export function ProductList({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const total = useMemo(
    () => products.reduce((sum, product) => sum + product.price, 0),
    [products]
  );

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  return (
    <div>
      <p>Total: {total}</p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.title}</span>
            <span>{product.price}</span>
            <button type="button" onClick={() => handleSelect(product.id)}>
              Select
            </button>
          </li>
        ))}
      </ul>

      <p>Selected: {selectedId ?? 'none'}</p>
    </div>
  );
}`,
    explanation: L(
      'The two hooks solve different problems. useMemo keeps the result of a calculation, so the reduction over a long array does not run on every render, and the dependency array names the values the calculation reads, so a new array of products produces a new total. useCallback keeps the identity of a function, and the identity matters only when the function is given to a child component that is wrapped in memo, because then the child compares the props and re-renders when the identity changed. The empty dependency array is correct here because the handler only calls the setter, whose identity is stable. Wrapping everything in these hooks without a reason is a cost of its own, because the hooks have to compare the dependencies on every render.',
      'Два хука решают разные задачи. useMemo сохраняет результат вычисления, поэтому свёртка по длинному массиву не выполняется на каждом рендере, а массив зависимостей перечисляет значения, которые вычисление читает, и новый массив товаров даёт новый итог. useCallback сохраняет идентичность функции, а идентичность важна только когда функция передаётся дочернему компоненту, обёрнутому в memo, потому что тогда ребёнок сравнивает пропсы и перерендеривается при смене идентичности. Пустой массив зависимостей здесь верен, потому что обработчик вызывает только сеттер, у которого стабильная идентичность. Оборачивать всё в эти хуки без причины — тоже цена, ведь хукам приходится сравнивать зависимости на каждом рендере.'
    ),
  },
  {
    id: 'topic-react-perf-3',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'basic',
    title: L('A memoized row that counts its renders', 'Мемоизированная строка со счётчиком рендеров'),
    brief: L(
      'Write a memoized row component that shows how many times it was rendered. The component is named Row, it is wrapped in the function memo of React, and it takes the props id of type number, label of type string and onToggle of type (id: number) => void. Inside the component create a ref with the number 0, increase it by one on every render, and show the label and the current value of the ref in the markup. The row must also contain a button with the text "Toggle" that calls onToggle with its id. Example: when the parent renders the row for the first time, the markup shows "renders: 1", and after the parent renders again with the same props, the markup still shows "renders: 1" because the memoized row skipped the render.',
      'Напишите мемоизированный компонент строки, который показывает, сколько раз он отрисован. Компонент называется Row, он обёрнут в функцию memo из React и принимает пропсы id типа number, label типа string и onToggle типа (id: number) => void. Внутри компонента создай ref с числом 0, увеличивай его на единицу на каждом рендере и показывай в разметке label и текущее значение ref. Строка также должна содержать кнопку с текстом "Toggle", которая вызывает onToggle со своим id. Пример: когда родитель отрисовывает строку впервые, разметка показывает "renders: 1", а после повторного рендера родителя с теми же пропсами по-прежнему показывает "renders: 1", потому что мемоизированная строка пропустила рендер.'
    ),
    hint: L(
      'The memo function compares the props with a shallow comparison, so a new object or a new function among the props makes the row render again. A ref is the right place for a counter, because writing to a ref does not cause a render.',
      'Функция memo сравнивает пропсы поверхностно, поэтому новый объект или новая функция среди пропсов заставляют строку рендериться снова. Ref — правильное место для счётчика, потому что запись в ref не вызывает рендер.'
    ),
    solution: `import { memo, useRef } from 'react';

export interface RowProps {
  id: number;
  label: string;
  onToggle: (id: number) => void;
}

export const Row = memo(function Row({ id, label, onToggle }: RowProps) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <li>
      <span>{label}</span>
      <span>renders: {renderCount.current}</span>
      <button type="button" onClick={() => onToggle(id)}>
        Toggle
      </button>
    </li>
  );
});`,
    explanation: L(
      'The memo function makes the component compare its props with the props of the previous render and to skip the render when they are equal, but the comparison is shallow: an object or a function that was created anew is never equal, and the row renders again. That is why the counter in the ref is the real instrument of the lesson: it shows that the optimization works only as long as the props keep their identity. The counter is kept in a ref and not in the state on purpose, because writing to the state during the render would cause an infinite loop of renders, while writing to a ref is silent and does not schedule a render.',
      'Функция memo заставляет компонент сравнивать свои пропсы с пропсами предыдущего рендера и пропускать рендер, когда они равны, но сравнение поверхностное: заново созданный объект или функция никогда не равны, и строка рендерится снова. Именно поэтому счётчик в ref — настоящий инструмент урока: он показывает, что оптимизация работает только пока пропсы сохраняют идентичность. Счётчик хранится в ref, а не в состоянии, намеренно: запись в состояние во время рендера вызвала бы бесконечный цикл рендеров, а запись в ref проходит молча и не планирует рендер.'
    ),
  },
  {
    id: 'topic-react-perf-4',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'intermediate',
    title: L('A filter that runs in a transition', 'Фильтрация в переходе'),
    brief: L(
      'Write a filterable list where the expensive filtering runs in a transition, so that the input stays responsive. The component takes the prop items, an array of objects with the fields id of type number and name of type string. The current text of the input is kept in one state and the text used for the filtering in another state. The change handler of the input must set the first state right away, and set the second state inside the function that startTransition returns, together with the flag isPending that the hook useTransition returns. The visible list is filtered with the second state, and while the flag is true the component must render a p element with the text "Filtering". Example: while the user types into a list of ten thousand items, the letters appear immediately and the indicator "Filtering" is visible until the list catches up.',
      'Напишите фильтруемый список, где дорогая фильтрация идёт в переходе, чтобы поле ввода оставалось отзывчивым. Компонент принимает пропс items — массив объектов с полями id типа number и name типа string. Текущий текст поля хранится в одном состоянии, а текст для фильтрации в другом. Обработчик изменения поля должен сразу выставить первое состояние, а второе — внутри функции, которую возвращает startTransition, вместе с флагом isPending, который отдаёт хук useTransition. Видимый список фильтруется по второму состоянию, и пока флаг истинный, компонент должен выводить элемент p с текстом "Filtering". Пример: пока пользователь печатает в списке из десяти тысяч элементов, буквы появляются сразу, а надпись "Filtering" видна, пока список догоняет.'
    ),
    hint: L(
      'A transition marks the state update as not urgent, so React keeps the old list on the screen and renders the new one in the background. The input must stay a controlled field with the urgent state, otherwise the letters would be delayed too.',
      'Переход помечает обновление состояния как неважное, поэтому React оставляет старый список на экране и рисует новый в фоне. Поле ввода должно остаться контролируемым по срочному состоянию, иначе задерживались бы и буквы.'
    ),
    solution: `import { useState, useTransition, type ChangeEvent } from 'react';

interface Item {
  id: number;
  name: string;
}

export function FilterList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setQuery(value);

    startTransition(() => {
      setFilter(value);
    });
  }

  const visible = items.filter((item) =>
    item.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div>
      <label htmlFor="filter">Filter</label>
      <input id="filter" value={query} onChange={handleChange} />

      {isPending ? <p>Filtering</p> : null}

      <ul>
        {visible.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: L(
      'React splits the updates into urgent and non-urgent ones. The text of the input is urgent, so it is painted immediately, while the new filter is non-urgent, so React keeps the previous list on the screen and prepares the new one in the background, interrupting it if the user types again. The flag isPending tells the application that the background work is running, and it is the place to show a spinner or the text "Filtering". A transition does not make the work faster, it only makes it interruptible, and it is worth it exactly when the work is long enough to freeze the interface, because a slow filter that blocks the input is much more annoying than a list that catches up a moment later.',
      'React делит обновления на срочные и несрочные. Текст поля срочный, поэтому рисуется сразу, а новый фильтр несрочный, и React оставляет на экране прежний список, готовя новый в фоне, и прерывает его, если пользователь печатает снова. Флаг isPending сообщает приложению, что фоновая работа идёт, и это место для спиннера или надписи "Filtering". Переход не делает работу быстрее, он делает её прерываемой, и это оправдано ровно тогда, когда работа достаточно длинная, чтобы подвесить интерфейс, потому что медленный фильтр, блокирующий ввод, куда раздражает, чем список, догоняющий через мгновение.'
    ),
  },
  {
    id: 'topic-react-perf-5',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'intermediate',
    title: L('A deferred search value', 'Отложенное значение поиска'),
    brief: L(
      'Write a search field that keeps the results behind the input. The component takes the prop items, an array of strings, and keeps the text in the state. The value used for the filtering must come from the hook useDeferredValue, and the component must render a p element with the text "Updating results" while the deferred value is not equal to the current value. The visible list contains the items that include the deferred value in the lower case, and every item is an li with the item as its key. Example: with the items "Apple", "Banana" and "Cherry" and the text "an", the list shows "Banana", and while the deferred value is still empty the text "Updating results" is visible.',
      'Напишите поле поиска, которое оставляет результаты позади ввода. Компонент принимает пропс items — массив строк — и хранит текст в состоянии. Значение, по которому идёт фильтрация, должно приходить из хука useDeferredValue, а компонент должен выводить элемент p с текстом "Updating results", пока отложенное значение не равно текущему. Видимый список содержит те элементы, которые включают отложенное значение в нижнем регистре, и каждый элемент — это li с ключом, равным самому элементу. Пример: при элементах "Apple", "Banana" и "Cherry" и тексте "an" список показывает "Banana", а пока отложенное значение ещё пустое, видна надпись "Updating results".'
    ),
    hint: L(
      'useDeferredValue returns the previous value while React is busy with the new one, so the input never waits for the list. Compare the deferred value with the current one to know whether the results are catching up.',
      'useDeferredValue возвращает предыдущее значение, пока React занят новым, поэтому поле ввода никогда не ждёт список. Сравните отложенное значение с текущим, чтобы понять, догоняют ли результаты.'
    ),
    solution: `import { useDeferredValue, useState } from 'react';

export function SearchResults({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const visible = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.trim().toLowerCase())
  );

  return (
    <div>
      <label htmlFor="items">Search</label>
      <input
        id="items"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {isStale ? <p>Updating results</p> : null}

      <ul>
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: L(
      'The hook returns the value of the previous render while React prepares the new one, so the input, which is bound to the ordinary state, stays fast even when the list is long. The comparison of the two values tells the application that the results are behind, and that is where the hint for the user belongs, so that a pause is not read as a freeze. The difference from a transition is the shape: a transition wraps an update in a function, while a deferred value wraps a single value, and the deferred value is the right tool when the slow part is a computation that reads one value. The list here is filtered with the deferred value, not with the current one, otherwise the whole point of the hook would be lost.',
      'Хук возвращает значение предыдущего рендера, пока React готовит новое, поэтому поле ввода, привязанное к обычному состоянию, остаётся быстрым даже с длинным списком. Сравнение двух значений сообщает приложению, что результаты отстают, и именно туда и нужно поместить подсказку, чтобы пауза не читалась как зависание. Отличие от перехода в форме: переход оборачивает обновление в функцию, а отложенное значение оборачивает одно значение, и отложенное значение — правильный инструмент, когда медленная часть это вычисление, читающее одно значение. Список здесь фильтруется по отложенному значению, а не по текущему, иначе смысл хука был бы потерян.'
    ),
  },
  {
    id: 'topic-react-perf-6',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'advanced',
    title: L('A virtualized list', 'Виртуализированный список'),
    brief: L(
      'Write a VirtualList component that renders only the rows the user can see. The component takes the prop rows, an array of objects with the fields id of type number and label of type string. The height of one row is 32 pixels, the height of the visible area is 320 pixels, and four extra rows are rendered above and below. The component keeps the scroll position in the state and the height of the container in another state, and the height is measured with the ResizeObserver, which must be disconnected in the cleanup. The container is a div with the fixed height of 320 pixels and the overflow "auto". Inside it there is a div with the total height equal to the number of rows multiplied by 32, and inside that one a div shifted down by the number of the first visible row multiplied by 32, holding the visible rows. Every row is a div of the height of 32 pixels with the label of the row. Example: with ten thousand rows and the container scrolled to the top, the component renders about fourteen rows, not ten thousand.',
      'Напишите компонент VirtualList, который отрисовывает только те строки, которые пользователь видит. Компонент принимает пропс rows — массив объектов с полями id типа number и label типа string. Высота одной строки 32 пикселя, высота видимой области 320 пикселей, и ещё четыре строки отрисовываются сверху и снизу. Компонент хранит позицию прокрутки в состоянии и высоту контейнера в другом состоянии, а высоту измеряет через ResizeObserver, который нужно отключить в функции очистки. Контейнер — это div с фиксированной высотой 320 пикселей и переполнением "auto". Внутри него лежит div с суммарной высотой, равной числу строк, умноженному на 32, а внутри того — div, сдвинутый вниз на номер первой видимой строки, умноженный на 32, и в нём видимые строки. Каждая строка — это div высотой 32 пикселя с label строки. Пример: при десяти тысячах строк и прокрутке вверх компонент отрисовывает около четырнадцати строк, а не десять тысяч.'
    ),
    hint: L(
      'The inner spacer keeps the height of the whole list, so the scrollbar behaves as if all the rows were there, and the visible rows are moved with a transform instead of a margin, because a transform does not affect the layout of the parent.',
      'Внутренняя распорка держит высоту всего списка, чтобы полоса прокрутки вела себя так, будто все строки на месте, а видимые строки сдвигаются через transform, а не через margin, потому что transform не влияет на раскладку родителя.'
    ),
    solution: `import { useEffect, useRef, useState, type UIEvent } from 'react';

interface Row {
  id: number;
  label: string;
}

const ROW_HEIGHT = 32;
const CONTAINER_HEIGHT = 320;
const OVERSCAN = 4;

export function VirtualList({ rows }: { rows: Row[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(CONTAINER_HEIGHT);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    setHeight(element.clientHeight);

    const observer = new ResizeObserver(() => {
      setHeight(element.clientHeight);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = Math.ceil(height / ROW_HEIGHT) + OVERSCAN * 2;
  const endIndex = Math.min(rows.length, startIndex + visibleCount);
  const visibleRows = rows.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: CONTAINER_HEIGHT, overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: rows.length * ROW_HEIGHT, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleRows.map((row) => (
            <div key={row.id} style={{ height: ROW_HEIGHT }}>
              {row.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    explanation: L(
      'The trick of virtualization is the spacer: a div with the height of the whole list, so the browser thinks the list is long and the scrollbar behaves exactly as the user expects, while the real rows are only the visible slice. The slice is computed from the scroll position, and the extra rows above and below, the overscan, keep the content ready before the user scrolls to it and hide the tearing that would appear while the next rows are rendered. The visible rows are moved with a transform, which is cheap for the browser and does not move the other elements of the layout, and the height of the container is measured with the ResizeObserver, so the component survives a resize of the window. The cost of the approach is that the list is no longer a real list of elements, so the accessibility and the find in page of the browser work worse, and a production solution uses a real list markup with the rows hidden from the screen reader.',
      'Секрет виртуализации — в распорке: div с высотой всего списка, чтобы браузер считал список длинным и полоса прокрутки вела себя ровно так, как ожидает пользователь, а настоящие строки — только видимый кусок. Кусок считается из позиции прокрутки, а лишние строки сверху и снизу, то есть overscan, держат содержимое готовым до того, как пользователь доскроллит, и прямуют разрыв, который был бы виден во время отрисовки следующих строк. Видимые строки сдвигаются через transform, что дёшево для браузера и не двигает остальные элементы раскладки, а высота контейнера измеряется через ResizeObserver, поэтому компонент переживает изменение размера окна. Цена подхода в том, что список перестаёт быть настоящим списком элементов, и доступность и поиск по странице в браузере работают хуже, поэтому в боевом решении используют настоящую разметку списка, скрывая строки от скринридера.'
    ),
  },
  {
    id: 'topic-react-perf-7',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'advanced',
    title: L('Code splitting with a lazy import', 'Разделение кода через ленивый импорт'),
    brief: L(
      'Split a heavy part of the application into a separate chunk. Import the component SettingsPanel with the function lazy of React and the address "./SettingsPanel", so that the code of the panel is downloaded only when it is needed. The module "./SettingsPanel" must export the component as its default export, because lazy expects the module to have a default export. The component App keeps the flag showSettings in the state, which is false at the start. The button with the text "Open settings" sets the flag to true, and the panel is rendered only when the flag is true. The panel must be wrapped in the component Suspense with a fallback that is a p element with the text "Loading settings", because the lazy component has no content to show until its chunk is downloaded. Example: on the first render the page shows only the button, and the request for the chunk of the panel starts after the button is clicked.',
      'Раздели тяжёлую часть приложения на отдельный чанк. Импортируй компонент SettingsPanel через функцию lazy из React и адрес "./SettingsPanel", чтобы код панели скачивался только тогда, когда он нужен. Модуль "./SettingsPanel" должен экспортировать компонент как экспорт по умолчанию, потому что lazy ожидает, что у модуля есть default-экспорт. Компонент App хранит флаг showSettings в состоянии, который изначально равен false. Кнопка с текстом "Open settings" выставляет флаг в true, и панель отрисовывается только когда флаг истинный. Панель должна быть обёрнута в компонент Suspense с fallback, который является элементом p с текстом "Loading settings", потому что у ленивого компонента нет содержимого, пока его чанк не скачан. Пример: на первом рендере страница показывает только кнопку, а запрос чанка панели начинается после нажатия на кнопку.'
    ),
    hint: L(
      'The lazy function returns a component that suspends while the module is being downloaded, and the nearest Suspense boundary shows the fallback. The import inside lazy is a dynamic import, so the bundler puts that module into a separate file.',
      'Функция lazy возвращает компонент, который приостанавливает рендер на время загрузки модуля, и ближайшая граница Suspense показывает fallback. Импорт внутри lazy — это динамический импорт, поэтому сборщик кладёт этот модуль в отдельный файл.'
    ),
    solution: `import { lazy, Suspense, useState } from 'react';

// --- src/SettingsPanel.tsx ---
// export default function SettingsPanel() {
//   return <section>Settings</section>;
// }

const SettingsPanel = lazy(() => import('./SettingsPanel'));

export function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main>
      <h1>Dashboard</h1>

      <button type="button" onClick={() => setShowSettings(true)}>
        Open settings
      </button>

      {showSettings ? (
        <Suspense fallback={<p>Loading settings</p>}>
          <SettingsPanel />
        </Suspense>
      ) : null}
    </main>
  );
}`,
    explanation: L(
      'A dynamic import inside the lazy function returns a promise of a module, and the bundler puts that module into a separate chunk that is downloaded only when the component is rendered for the first time. While the chunk is on the way, the component suspends, and the nearest Suspense boundary above it shows the fallback, so the rest of the page stays alive and interactive. The panel is rendered only after the click, and the click is the moment when the download starts, so the first visit of the page costs the user only the code that is really needed. The boundary is placed as close to the lazy component as possible, because the whole subtree under the boundary is replaced by the fallback while the download is running, and a boundary around the whole application would blank the entire page.',
      'Динамический импорт внутри функции lazy возвращает промис модуля, и сборщик кладёт этот модуль в отдельный чанк, который скачивается только при первом рендере компонента. Пока чанк в пути, компонент приостанавливается, и ближайшая граница Suspense над ним показывает fallback, так что остальная страница остаётся живой и отзывчивой. Панель отрисовывается только после клика, и клик — это момент старта загрузки, поэтому первый визит страницы стоит пользователю только действительно нужного кода. Граница стоит как можно ближе к ленивому компоненту, потому что всё поддерево под границей заменяется fallback на время загрузки, и граница вокруг всего приложения гасила бы всю страницу.'
    ),
  },
  {
    id: 'topic-react-perf-8',
    moduleId: 'react',
    topic: 'react-perf',
    level: 'advanced',
    title: L('Profile and fix a re-render storm', 'Профилирование и починка шторма рендеров'),
    brief: L(
      'Fix a report screen that re-renders far more than it should. The component Report takes the prop rows, an array of objects with the fields id of type number and title of type string, and keeps the filter text in the state. The broken version copies the rows into a second state with an effect that depends on the rows and on the filter, and this effect pushes a new array into the state on every change, so the component renders twice and every row receives a new array. The fixed version must calculate the visible rows during the render with useMemo, with the dependency array containing the rows and the filter, and must not keep a copy of the rows in the state. The row component is wrapped in memo and takes a single prop row, so that a row is rendered again only when its own title changed. The report must be wrapped in the component Profiler of React, and its callback onRender must only log the phase, without changing any state, because a state change inside onRender would cause an endless loop of commits. Example: typing one character into the filter produces one commit of the report and re-renders only the rows whose title no longer matches.',
      'Почини экран отчёта, который перерендеривается намного чаще, чем должен. Компонент Report принимает пропс rows — массив объектов с полями id типа number и title типа string — и хранит текст фильтра в состоянии. Сломанная версия копирует rows во второе состояние эффектом, который зависит от rows и от filter, и этот эффект кладёт новый массив в состояние при каждом изменении, поэтому компонент рендерится дважды, и каждая строка получает новый массив. Починенная версия должна считать видимые строки прямо во время рендера через useMemo, с массивом зависимостей, содержащим rows и filter, и не должна хранить копию rows в состоянии. Компонент строки обёрнут в memo и принимает единственный пропс row, чтобы строка перерендеривалась только когда изменилось её собственное название. Отчёт должен быть обёрнут в компонент Profiler из React, а его колбэк onRender должен только логировать фазу, не меняя никакого состояния, потому что изменение состояния внутри onRender вызвало бы бесконечный цикл коммитов. Пример: ввод одного символа в фильтр даёт один коммит отчёта и перерендеривает только те строки, название которых больше не подходит.'
    ),
    hint: L(
      'Look for the effect that writes into the state: it always adds one extra render. The rule is that a value that can be calculated during the render must be calculated during the render, and the profiler shows the number of the commits.',
      'Ищите эффект, который пишет в состояние: он всегда добавляет один лишний рендер. Правило: значение, которое можно посчитать во время рендера, считается во время рендера, а профайлер показывает число коммитов.'
    ),
    solution: `import { Profiler, memo, useMemo, useState } from 'react';

interface RowData {
  id: number;
  title: string;
}

const Row = memo(function Row({ row }: { row: RowData }) {
  return <li>{row.title}</li>;
});

// The broken version, for comparison:
//
// export function Report({ rows }: { rows: RowData[] }) {
//   const [filter, setFilter] = useState('');
//   const [visible, setVisible] = useState(rows);
//
//   useEffect(() => {
//     setVisible(rows.filter((row) => row.title.includes(filter)));
//   }, [rows, filter]);
//
//   return (
//     <ul>
//       {visible.map((row) => (
//         <Row key={row.id} row={row} />
//       ))}
//     </ul>
//   );
// }

export function Report({ rows }: { rows: RowData[] }) {
  const [filter, setFilter] = useState('');

  const visible = useMemo(
    () =>
      rows.filter((row) =>
        row.title.toLowerCase().includes(filter.trim().toLowerCase())
      ),
    [rows, filter]
  );

  return (
    <Profiler
      id="report"
      onRender={(_id, phase) => {
        console.log('report committed', phase);
      }}
    >
      <div>
        <label htmlFor="filter">Filter</label>
        <input
          id="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />

        <ul>
          {visible.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </ul>
      </div>
    </Profiler>
  );
}`,
    explanation: L(
      'The storm has two sources. The effect that copies the rows into the state renders the component a second time on every change of the filter, and the array it puts into the state is a new object, so every row receives new props and re-renders even when its own title did not change. The fix is to calculate the visible rows during the render, so there is no copy, no effect and no extra commit, and to wrap the row in memo, so that a row re-renders only when its own title changed. The profiler is the instrument that shows the difference: one commit instead of two, and the phase tells whether the commit came from a render or from an effect. The callback of the profiler only logs, because a state change inside it would schedule another commit, which would call the callback again, and the application would spin in an endless loop.',
      'У шторма два источника. Эффект, копирующий rows в состояние, рендерит компонент второй раз при каждом изменении фильтра, и массив, который он кладёт в состояние, это новый объект, поэтому каждая строка получает новые пропсы и перерендеривается, даже если её собственное название не изменилось. Починка в том, чтобы считать видимые строки во время рендера: тогда нет копии, нет эффекта и нет лишнего коммита, а обёртка строки в memo оставляет перерендеривание только для строк, у которых изменилось своё название. Профайлер — прибор, который показывает разницу: один коммит вместо двух, а фаза сообщает, пришёл коммит от рендера или от эффекта. Колбэк профайлера только логирует, потому что изменение состояния внутри него запланировало бы ещё один коммит, который снова вызвал бы колбэк, и приложение крутилось бы в бесконечном цикле.'
    ),
  },
];
