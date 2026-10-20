import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const jsCoreCh14: Chapter = {
  id: 'js-core-ch14',
  title: L('The DOM and browser APIs', 'DOM и API браузера'),
  summary: L(
    'How the DOM models a document as a tree of nodes, how to select and mutate elements safely, how events travel and delegate, how forms are validated and serialized, and how timers, animation frames and observers schedule work in the browser.',
    'Как DOM представляет документ как дерево узлов, как безопасно выбирать и изменять элементы, как распространяются и делегируются события, как проверяются и сериализуются формы, а также как таймеры, кадры анимации и наблюдатели планируют работу в браузере.'
  ),
  sections: [
    {
      id: 'js-core-ch14-s1',
      title: L('The document tree and selecting elements', 'Дерево документа и выбор элементов'),
      body: L(
        'The Document Object Model is a tree of node objects, not a tree of elements. An element such as <p> is one kind of node, and its text content, its attributes and its comments are separate nodes living inside it. Every node exposes nodeType and a numeric constant such as Node.ELEMENT_NODE or Node.TEXT_NODE, and the childNodes collection contains all of them while children contains elements only. document is the root node, document.documentElement is the <html> element and document.body is the body element.\n\nSelection comes in two generations. getElementById, getElementsByClassName and getElementsByTagName are older, narrower and faster in specific cases, while querySelector and querySelectorAll accept any CSS selector the browser supports and return the first match or a collection of all matches. The important difference is liveness: getElementsByClassName returns a live HTMLCollection that updates itself when the DOM changes, and querySelectorAll returns a static NodeList that is a snapshot of the moment it was called.\n\nYou do not need a selector to walk the tree. parentElement, children, firstElementChild, nextElementSibling and previousElementSibling are enough to move in any direction, and closest(selector) walks from a node up through its ancestors until the selector matches, which is the shortest way to ask which card or which row a click landed in. matches(selector) answers the same question for a single element without walking anywhere. The dataset property reads data-* attributes, so element.dataset.userId and element.getAttribute("data-user-id") return the same string.\n\ntextContent and innerHTML are not interchangeable. textContent returns and writes plain text: reading it gives the raw character data including text inside hidden elements, and writing it escapes every angle bracket, so user data can never become markup. innerHTML reads and writes HTML, so assigning it parses a string into a subtree, and any attacker controlled value placed there runs as script. Reading innerHTML is usually fine, writing untrusted data into it is the classic cross site scripting hole.',
        'Document Object Model — это дерево узлов, а не дерево элементов. Элемент вроде <p> — лишь один вид узла, а его текстовое содержимое, атрибуты и комментарии живут внутри него отдельными узлами. У каждого узла есть nodeType и числовая константа вроде Node.ELEMENT_NODE или Node.TEXT_NODE, а коллекция childNodes содержит их все, тогда как children — только элементы. document — корневой узел, document.documentElement — элемент <html>, а document.body — элемент body.\n\nВыбор элементов пришёл в двух поколениях. getElementById, getElementsByClassName и getElementsByTagName старше, ограниченнее и быстрее в отдельных случаях, а querySelector и querySelectorAll принимают любой CSS-селектор, который поддерживает браузер, и возвращают первый элемент или коллекцию всех совпадений. Важное различие — живость: getElementsByClassName отдаёт живую HTMLCollection, которая сама обновляется при изменении DOM, а querySelectorAll отдаёт статичный NodeList, то есть снимок на момент вызова.\n\nЧтобы обойти дерево, селектор не нужен. parentElement, children, firstElementChild, nextElementSibling и previousElementSibling позволяют двигаться в любую сторону, а closest(selector) поднимается от узла к предкам, пока селектор не совпадёт, — это кратчайший способ узнать, в какую карточку или строку попал клик. matches(selector) отвечает на тот же вопрос про один элемент, никуда не поднимаясь. Свойство dataset читает атрибуты data-*, поэтому element.dataset.userId и element.getAttribute("data-user-id") возвращают одну и ту же строку.\n\ntextContent и innerHTML — не взаимозаменяемые вещи. textContent читает и пишет обычный текст: чтение даёт сырые символы, включая текст внутри скрытых элементов, а запись экранирует все угловые скобки, и данные пользователя никогда не станут разметкой. innerHTML читает и пишет HTML, поэтому присваивание разбирает строку в поддерево, и любое значение, подконтрольное атакующему, выполнится как скрипт. Чтение innerHTML обычно безопасно, а запись недоверенных данных в него — классическая дыра для межсайтового скриптинга.'
      ),
      bullets: [
        L('The DOM is a tree of node objects, not a tree of elements.', 'DOM — это дерево объектов-узлов, а не дерево элементов.'),
        L('childNodes contains text and comment nodes, children contains elements only.', 'childNodes содержит текстовые и комментарии, children — только элементы.'),
        L('document.documentElement is the html element and document.body is the body element.', 'document.documentElement — элемент html, document.body — элемент body.'),
        L('getElementsByClassName returns a live HTMLCollection, querySelectorAll a static NodeList.', 'getElementsByClassName возвращает живую HTMLCollection, querySelectorAll — статичный NodeList.'),
        L('closest walks up through the ancestors, matches tests the element itself.', 'closest идёт вверх по предкам, matches проверяет сам элемент.'),
        L('dataset.userId and getAttribute("data-user-id") return the same string.', 'dataset.userId и getAttribute("data-user-id") возвращают одну и ту же строку.'),
      ],
      code: `const html = document.documentElement;
html.nodeType;                  // 1 - Node.ELEMENT_NODE
html.childNodes.length;        // text nodes are counted too
html.children.length;          // elements only

document.querySelector('#app');     // first match, any CSS selector
document.querySelectorAll('.row');   // static NodeList

const rows = document.getElementsByClassName('row');
rows.length;                    // live: always the current count
rows[0].classList.add('active');

const button = document.querySelector('.buy');
button.closest('.card');           // nearest matching ancestor
button.matches('.buy.primary');    // true or false

button.dataset.productId;          // 'sku-42', same as data-product-id`,
      table: {
        caption: L('Ways to select elements', 'Способы выбрать элемент'),
        headers: [
          L('Method', 'Метод'),
          L('Returns', 'Возвращает'),
          L('Live?', 'Живая?'),
          L('CSS selectors', 'CSS-селекторы'),
        ],
        rows: [
          [L('querySelector', 'querySelector'), L('First match or null', 'Первое совпадение или null'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('querySelectorAll', 'querySelectorAll'), L('Static NodeList', 'Статичный NodeList'), L('No', 'Нет'), L('Yes', 'Да')],
          [L('getElementById', 'getElementById'), L('Element or null', 'Элемент или null'), L('No', 'Нет'), L('No', 'Нет')],
          [L('getElementsByClassName', 'getElementsByClassName'), L('Live HTMLCollection', 'Живая HTMLCollection'), L('Yes', 'Да'), L('No', 'Нет')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('innerHTML is an XSS hole', 'innerHTML — дыра для XSS'),
          text: L(
            'Assigning a string to innerHTML parses it as HTML and executes any script inside it. If any part of that string comes from a user, a query parameter or an API response, use textContent instead, or build the nodes with createElement and append them. Removing the string <script> does not help, because the payload can arrive as an img onerror attribute.',
            'Присваивание строки в innerHTML разбирает её как HTML и выполняет содержащийся в ней скрипт. Если хоть часть этой строки пришла от пользователя, из query-параметра или ответа API, используйте textContent либо собирайте узлы через createElement и добавляйте их. Удаление подстроки <script> не помогает: полезная нагрузка может прийти как атрибут img onerror.'
          ),
        },
        {
          tone: 'note',
          title: L('A live collection changes under you', 'Живая коллекция меняется на ходу'),
          text: L(
            'getElementsByClassName returns a live HTMLCollection: the object you stored still reflects the current DOM, so a cached length or a cached index can point somewhere else after the page changes. Copy it with Array.from(collection) when you need a stable snapshot, and especially before you start removing elements while iterating over them.',
            'getElementsByClassName возвращает живую HTMLCollection: сохранённый объект продолжает отражать текущий DOM, поэтому запомненная длина или индекс после изменения страницы укажут совсем в другое место. Копируйте через Array.from(collection), когда нужен стабильный снимок, и особенно перед тем, как начать удалять элементы во время обхода.'
          ),
        },
      ],
      takeaway: L(
        'Select with querySelector, read data-* through dataset, and never write user data into innerHTML.',
        'Выбирайте через querySelector, читайте data-* через dataset и никогда не пишите пользовательские данные в innerHTML.'
      ),
      seeAlso: [
        L('Section 14-2: creating, changing and removing nodes', 'Секция 14-2: создание, изменение и удаление узлов'),
        L('Chapter 5: Objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
        L('Section 1-1: Primitives, references and the typeof hole', 'Секция 1-1: примитивы, ссылки и дыра в typeof'),
      ],
    },
    {
      id: 'js-core-ch14-s2',
      title: L('Creating, changing and removing nodes', 'Создание, изменение и удаление узлов'),
      body: L(
        'New nodes are created detached from the document and enter it only when you insert them. document.createElement("div") gives you an element, document.createTextNode("hello") gives you a text node, and both live in memory until you attach them. The insertion methods differ in what they accept: append and prepend take several nodes and plain strings at once, appendChild takes a single node, insertBefore puts a node at a specific position, and replaceChild swaps one node for another in place.\n\nRemoving is simple and replacing the whole content is one call: remove() detaches a node, and replaceChildren(...nodes) empties an element and inserts the new children in a single operation. For text, textContent writes raw text and escapes it, while innerText writes what the user sees and reading it forces the browser to recompute the layout. That difference is why innerText is expensive in a loop and why textContent is the safer default when the value comes from a user.\n\nStyles can be set through the style object, where cssText accepts a whole declaration string and setProperty handles custom properties and names with dashes, such as style.setProperty("--accent", "tomato"). The classList API is the better tool for anything reusable: add, remove, toggle and contains operate on class names without touching the class attribute as a string. A class rule in a stylesheet is also cheaper for the browser than an inline style, because it can be cached and it keeps the presentation out of the script.\n\nBuilding a subtree one element at a time and inserting every element separately is slow, because each insertion can trigger a recalculation and a repaint. A DocumentFragment is a lightweight container that holds nodes without a parent in the document: you append into the fragment, and inserting the fragment into the page performs one update for the whole batch. cloneNode(true) makes a deep copy of a node with its descendants, and the general rule of thumb is to separate reads from writes, so the browser calculates the layout once instead of after every single change.',
        'Новые узлы создаются вне документа и попадают в него только при вставке. document.createElement("div") даёт элемент, document.createTextNode("hello") — текстовый узел, и до присоединения оба живут в памяти. Методы вставки отличаются тем, что принимают: append и prepend берут сразу несколько узлов и строки, appendChild — ровно один узел, insertBefore ставит узел в конкретное место, а replaceChild заменяет один узел другим на его месте.\n\nУдаление простое, а заменить содержимое целиком можно одним вызовом: remove() отсоединяет узел, а replaceChildren(...nodes) очищает элемент и вставляет новых детей одной операцией. Для текста textContent пишет сырой текст и экранирует его, а innerText пишет то, что видит пользователь, и чтение его заставляет браузер пересчитать вёрстку. Именно поэтому innerText дорогой в цикле, а textContent — безопасный выбор по умолчанию, когда значение пришло от пользователя.\n\nСтили задаются через объект style, где cssText принимает целую строку объявлений, а setProperty работает с кастомными свойствами и именами через дефис, например style.setProperty("--accent", "tomato"). Для всего, что переиспользуется, лучше подходит classList: add, remove, toggle и contains меняют набор классов, не трогая атрибут class как строку. Правило класса из таблицы стилей ещё и дешевле для браузера, чем встроенный стиль, потому что его можно кэшировать и оно не смешивает представление со скриптом.\n\nСобирать поддерево по одному элементу и вставлять каждый отдельно медленно: каждая вставка может вызвать пересчёт раскладки и перерисовку. DocumentFragment — лёгкий контейнер, который держит узлы без родителя в документе: вы добавляете в фрагмент, а вставка фрагмента в страницу выполняет одно обновление для всей партии. cloneNode(true) делает глубокую копию узла вместе с потомками, а общее правило звучит так: разделяйте чтение и запись, чтобы браузер посчитал раскладку один раз, а не после каждого изменения.'
      ),
      bullets: [
        L('createElement creates a detached element, it enters the document only when inserted.', 'createElement создаёт элемент вне документа, в дерево он попадает только при вставке.'),
        L('append and prepend accept several nodes and strings, appendChild accepts one node.', 'append и prepend принимают несколько узлов и строки, appendChild — только один узел.'),
        L('replaceChildren empties an element and inserts the new children in one operation.', 'replaceChildren очищает элемент и вставляет новых детей одной операцией.'),
        L('textContent returns raw text including hidden nodes, innerText returns rendered text and forces a layout.', 'textContent возвращает сырой текст вместе со скрытыми узлами, innerText — видимый текст и заставляет пересчитать раскладку.'),
        L('classList.toggle with a second argument adds or removes the class depending on the current state.', 'classList.toggle со вторым аргументом добавляет или убирает класс в зависимости от текущего состояния.'),
        L('A DocumentFragment lets you insert a whole batch of nodes with a single update.', 'DocumentFragment позволяет вставить сразу несколько узлов одним обновлением.'),
      ],
      code: `const list = document.querySelector('#items');

const fragment = document.createDocumentFragment();
for (const name of ['Ada', 'Grace', 'Alan']) {
  const li = document.createElement('li');
  li.textContent = name;              // text, never markup
  li.classList.add('item');
  li.dataset.index = String(fragment.childNodes.length);
  fragment.append(li);                 // the fragment batches the work
}
list.replaceChildren(fragment);        // one insertion, one layout pass

const card = document.querySelector('.card');
card.style.setProperty('--accent', 'tomato');
card.style.color = 'white';
card.classList.toggle('is-open', true);
card.classList.contains('is-open');    // true

const copy = card.cloneNode(true);     // deep copy with descendants`,
      table: {
        caption: L('Reading and writing content of an element', 'Чтение и запись содержимого элемента'),
        headers: [
          L('Property', 'Свойство'),
          L('Reads', 'Чтение'),
          L('Writes', 'Запись'),
          L('Cost', 'Цена'),
        ],
        rows: [
          [L('textContent', 'textContent'), L('Raw text, hidden nodes included', 'Сырой текст, включая скрытые узлы'), L('Plain text, always escaped', 'Обычный текст, всегда экранирован'), L('Cheap', 'Дёшево')],
          [L('innerText', 'innerText'), L('Rendered visible text', 'Видимый отрендеренный текст'), L('Plain text', 'Обычный текст'), L('Forces a layout', 'Пересчитывает раскладку')],
          [L('innerHTML', 'innerHTML'), L('Parsed HTML', 'Разобранный HTML'), L('Parses HTML', 'Разбирает HTML'), L('Expensive, unsafe with user data', 'Дорого, небезопасно для данных пользователя')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Mixed reads and writes cause layout thrashing', 'Чтение и запись вперемешку бьют по раскладке'),
          text: L(
            'Reading offsetHeight, scrollTop or getBoundingClientRect() forces the browser to compute the layout. If a write happened just before that read, the layout has to be recalculated, and doing this inside a loop means recalculating once per iteration. Read all the values first, then apply all the changes.',
            'Чтение offsetHeight, scrollTop или getBoundingClientRect() заставляет браузер посчитать раскладку. Если запись была прямо перед этим чтением, раскладку приходится пересчитывать, а внутри цикла это пересчёт на каждой итерации. Сначала прочитайте все значения, потом применяйте все изменения.'
          ),
        },
        {
          tone: 'tip',
          title: L('Fragments make bulk inserts cheap', 'Фрагменты делают массовую вставку дешёвой'),
          text: L(
            'A DocumentFragment is not in the document, so appending into it does not trigger layout work, and appending the fragment itself inserts the whole subtree in one step. Moving nodes is also safer through a fragment: appending them there first detaches them from the old parent, which avoids the bug where a moved node is visited twice.',
            'DocumentFragment не находится в документе, поэтому добавление в него не вызывает пересчёт раскладки, а вставка самого фрагмента добавляет всё поддерево за один шаг. Перенос узлов через фрагмент тоже безопаснее: сначала они отсоединяются от старого родителя, иначе перемещённый узел можно обойти дважды.'
          ),
        },
      ],
      takeaway: L(
        'Build in a DocumentFragment, insert it once, and keep text handling on textContent instead of innerHTML.',
        'Собирайте поддерево в DocumentFragment, вставляйте его одним разом и держите текст на textContent, а не на innerHTML.'
      ),
      seeAlso: [
        L('Section 14-1: the document tree and selecting elements', 'Секция 14-1: дерево документа и выбор элементов'),
        L('Chapter 13: Algorithms and data structures', 'Глава 13: алгоритмы и структуры данных'),
        L('Chapter 5: Objects, descriptors and the prototype chain', 'Глава 5: объекты, дескрипторы и цепочка прототипов'),
      ],
    },
    {
      id: 'js-core-ch14-s3',
      title: L('Events: phases, delegation and preventDefault', 'События: фазы, делегирование и preventDefault'),
      body: L(
        'addEventListener takes a type, a handler and an options object. The options control how the handler runs: capture decides whether it fires on the way down to the target or on the way back up, once removes the listener after the first call, passive promises that the handler will not cancel the default action, and signal ties the listener to an AbortSignal so it can be removed later. The third argument may also be a boolean, and true there means capture.\n\nEvery event travels through three phases. In the capture phase it moves from window down through document, html and body to the parents of the target. In the target phase the listeners registered on the target itself run. In the bubble phase it climbs back up through the ancestors to window. event.target is always the deepest element the event happened on, while event.currentTarget is the element whose handler is currently running, and the two differ for every ancestor in the chain.\n\nTwo methods stop the travel and one cancels the behaviour. stopPropagation stops the event from continuing to the next element in the chain, and the event still reaches the other listeners on the current element. stopImmediatePropagation stops those as well, and the handlers that would have run after it never run at all. preventDefault does something different: it cancels the action the browser would take by default, such as following a link or toggling a checkbox, while the event keeps travelling normally.\n\nDelegation removes the need for one handler per item. Attach a single click listener to a list, then read event.target.closest("[data-action]") to find the actionable element and act on it, which works for items added later without any extra wiring. The rule that makes delegation reliable is that the anchor must be stable: data attributes and ids survive re-rendering, while positional selectors like li:nth-child(2) do not. Passive listeners matter for scroll and touch, where the browser can skip waiting for the handler if it only reads values.',
        'addEventListener принимает тип, обработчик и объект опций. Опции определяют, как отработает обработчик: capture решает, сработает ли он на пути вниз к цели или на пути обратно вверх, once удаляет слушатель после первого вызова, passive обещает, что обработчик не отменит поведение по умолчанию, а signal привязывает слушателя к AbortSignal, чтобы его потом можно было снять. Третий аргумент может быть и булевым, и true в нём означает capture.\n\nЛюбое событие проходит три фазы. На фазе захвата оно идёт от window вниз через document, html и body к предкам цели. На фазе цели срабатывают слушатели, зарегистрированные на самой цели. На фазе всплытия событие поднимается обратно по предкам до window. event.target — всегда самый глубокий элемент, на котором произошло событие, а event.currentTarget — элемент, чей обработчик выполняется сейчас, и для каждого предка в цепочке это разные значения.\n\nДва метода останавливают распространение, а один отменяет поведение. stopPropagation не даёт событию перейти к следущему элементу цепочки, и остальные слушатели на текущем элементе всё равно сработают. stopImmediatePropagation останавливает и их, и обработчики, которые должны были выполниться после него, не выполнятся вообще. preventDefault работает иначе: он отменяет действие, которое браузер совершил бы по умолчанию, например переход по ссылке или переключение чекбокса, а само событие продолжает идти.\n\nДелегирование избавляет от обработчика на каждый пункт. Вешайте один слушатель click на список, а затем читайте event.target.closest("[data-action]"), чтобы найти нужный элемент и отработать по нему, — так работает и с пунктами, добавленными позже, без дополнительной обвязки. Надёжность делегирования держится на стабильном якоре: data-атрибуты и id переживают перерисовку, а позиционные селекторы вроде li:nth-child(2) — нет. Пассивные слушатели важны для scroll и touch, где браузер может не ждать окончания обработчика, если тот только читает значения.'
      ),
      bullets: [
        L('An event travels through three phases: capture, target and bubble.', 'Событие проходит три фазы: захват, цель и всплытие.'),
        L('event.target is the deepest element, event.currentTarget is the one whose handler runs.', 'event.target — самый глубокий элемент, event.currentTarget — тот, чей обработчик выполняется.'),
        L('stopPropagation stops the travel but not the other listeners on the same element.', 'stopPropagation останавливает распространение, но не остальных слушателей на этом же элементе.'),
        L('stopImmediatePropagation also suppresses the remaining listeners on the same element.', 'stopImmediatePropagation отменяет и остальных слушателей на том же элементе.'),
        L('preventDefault cancels the default browser action and leaves the propagation alone.', 'preventDefault отменяет действие браузера по умолчанию и не влияет на распространение.'),
        L('The signal option removes the listener when the AbortSignal is aborted.', 'Опция signal снимает слушатель, когда AbortSignal абортится.'),
      ],
      code: `const list = document.querySelector('#todos');

list.addEventListener('click', (event) => {
  const remove = event.target.closest('[data-remove]');
  if (!remove) return;                 // not our business, let it bubble
  event.preventDefault();
  remove.closest('li').remove();
});

document.addEventListener('scroll', onScroll, { passive: true });

const controller = new AbortController();
window.addEventListener('resize', onResize, { signal: controller.signal });
controller.abort();                     // removes the resize listener

document.querySelector('#link').addEventListener('click', (event) => {
  event.preventDefault();              // cancel the navigation
  openModal();                         // the event still bubbles up
}, { capture: true });`,
      table: {
        caption: L('addEventListener options', 'Опции addEventListener'),
        headers: [L('Option', 'Опция'), L('Type', 'Тип'), L('Effect', 'Эффект')],
        rows: [
          [L('capture', 'capture'), L('boolean', 'boolean'), L('Run the handler while the event travels down', 'Выполнить обработчик на пути вниз')],
          [L('once', 'once'), L('boolean', 'boolean'), L('Remove the handler after the first call', 'Удалить обработчик после первого вызова')],
          [L('passive', 'passive'), L('boolean', 'boolean'), L('The browser need not wait for preventDefault', 'Браузеру не нужно ждать preventDefault')],
          [L('signal', 'signal'), L('AbortSignal', 'AbortSignal'), L('Aborting the signal removes the listener', 'Аборт сигнала снимает слушатель')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Two different stops', 'Два разных способа остановить'),
          text: L(
            'stopPropagation only stops the event from continuing up the tree, and the other listeners on the same element still run. stopImmediatePropagation also suppresses those, and its effect is permanent for that event, so a listener that was supposed to run afterwards never will. Most code needs only preventDefault, which cancels the default action and leaves the propagation untouched.',
            'stopPropagation лишь не даёт событию идти дальше вверх, и остальные слушатели на том же элементе всё равно срабатывают. stopImmediatePropagation отменяет и их, причём навсегда для этого события: обработчик, который должен был выполниться позже, не выполнится. Обычному коду нужен только preventDefault, он отменяет действие по умолчанию и не трогает распространение.'
          ),
        },
        {
          tone: 'tip',
          title: L('Listen passively when you only read', 'Слушайте пассивно, если только читаете'),
          text: L(
            'For scroll, touchstart and wheel, add { passive: true }. The browser can then start scrolling without waiting for your handler to return, which removes a visible delay on touch devices. The only rule is that a passive listener must not call preventDefault, and the browser reports an error if it tries.',
            'Для scroll, touchstart и wheel добавляйте { passive: true }. Браузер тогда начнёт прокрутку, не дожидаясь возврата из обработчика, и на сенсорных устройствах пропадёт заметная задержка. Правило одно: пассивный слушатель не должен вызывать preventDefault, и браузер сообщит об ошибке, если он это сделает.'
          ),
        },
      ],
      takeaway: L(
        'Delegate events on the container with closest, keep the anchor in a data attribute, and use preventDefault only to cancel the default action.',
        'Делегируйте события на контейнере через closest, держите якорь в data-атрибуте и используйте preventDefault только для отмены действия по умолчанию.'
      ),
      seeAlso: [
        L('Section 14-5: timers, requestAnimationFrame and observers', 'Секция 14-5: таймеры, requestAnimationFrame и наблюдатели'),
        L('Chapter 11: The event loop, promises and async/await', 'Глава 11: цикл событий, промисы и async/await'),
        L('Chapter 4: Functions, arguments and closures', 'Глава 4: функции, аргументы и замыкания'),
      ],
    },
    {
      id: 'js-core-ch14-s4',
      title: L('Forms, validation and FormData', 'Формы, валидация и FormData'),
      body: L(
        'A form is a collection of controls, and the browser submits it as a set of name and value pairs. The name attribute is what makes a control part of that set: an input without a name is never submitted, and a control with a disabled attribute is not submitted either. The id attribute is a separate concern, it identifies the element for labels, for links and for form.elements lookups, and a label with a for attribute pointing at the id is what makes the control clickable and accessible.\n\nFormData reads the current state of a form and gives you the same pairs the browser would send. It has get for the first value of a name, getAll for every value of a repeated name, has for existence, append and set for building the data yourself, and entries for iterating it as name and value pairs. Only checked checkboxes and the checked radio of a group contribute, so a group of checkboxes sharing one name needs getAll to see more than one value.\n\nThe browser validates forms natively. required, min, max, step, pattern and the type attribute, with email, url, number and date among the types, all produce a validity state that the browser turns into a message on submit. checkValidity() returns a boolean without showing anything, reportValidity() shows the browser own bubble on the first invalid control, and the :invalid pseudo-class lets you style invalid fields. Adding the novalidate attribute to the form switches the native check off when you want your own message instead.\n\nThe submit event fires when the form is submitted, and calling preventDefault on it stops the browser page navigation so you can send the data with fetch instead. The native check still runs before the event fires, unless a control is invalid or novalidate is set, so the sequence is validate, preventDefault, then send. Client side validation is a convenience for the user, never a guarantee: the server receives a request from anyone and must check the same rules again, because the client can be modified by hand.',
        'Форма — это набор полей, и браузер отправляет её как набор пар имя и значение. В этот набор поле попадает благодаря атрибуту name: input без name не отправляется никогда, и поле с атрибутом disabled тоже не отправляется. Атрибут id решает другую задачу — он идентифицирует элемент для меток, ссылок и обращений через form.elements, и именно label с атрибутом for, указывающим на id, делает поле кликабельным и доступным.\n\nFormData читает текущее состояние формы и отдаёт те же пары, которые отправил бы браузер. У него есть get для первого значения имени, getAll для всех значений повторяющегося имени, has для проверки наличия, append и set для сборки данных вручную и entries для обхода как пар имя и значение. Отмечают себя только выбранные чекбоксы и выбранная радиокнопка группы, поэтому группу чекбоксов с общим именем нужно читать через getAll, иначе видно будет только одно значение.\n\nБраузер валидирует формы сам. Атрибуты required, min, max, step, pattern и тип элемента, среди которых email, url, number и date, формируют состояние валидности, которое браузер превращает в сообщение при отправке. checkValidity() возвращает булево значение и ничего не показывает, reportValidity() выводит собственную подсказку браузера на первом невалидном поле, а псевдокласс :invalid позволяет подсветить некорректные поля. Атрибут novalidate на форме отключает нативную проверку, когда вы хотите показать своё сообщение.\n\nСобытие submit возникает при отправке формы, и preventDefault на нём отменяет навигацию страницы, чтобы отправить данные через fetch. Нативная проверка при этом всё равно выполняется до срабатывания события, если поле невалидно или стоит novalidate, поэтому порядок такой: проверить, отменить навигацию, отправить. Проверка на клиенте — это удобство для пользователя, а не гарантия: запрос может прийти от кого угодно, и сервер обязан проверить те же правила заново, потому что клиент можно изменить руками.'
      ),
      bullets: [
        L('A control is submitted only if it has a name attribute and is not disabled.', 'Поле отправляется только при наличии атрибута name и отсутствии disabled.'),
        L('FormData(form) collects the current values of the controls of that form.', 'FormData(form) собирает текущие значения полей этой формы.'),
        L('get returns the first value of a name, getAll returns every value of a repeated name.', 'get возвращает первое значение имени, getAll — все значения повторяющегося имени.'),
        L('An unchecked checkbox contributes nothing to FormData.', 'Неотмеченный чекбокс не попадает в FormData.'),
        L('checkValidity returns a boolean, reportValidity shows the browser own message.', 'checkValidity возвращает булево значение, reportValidity показывает подсказку браузера.'),
        L('A disabled control is not submitted, a readonly control still is.', 'Поле с disabled не отправляется, а поле с readonly отправляется.'),
      ],
      code: `const form = document.querySelector('#signup');

form.addEventListener('submit', (event) => {
  event.preventDefault();               // no page reload
  if (!form.checkValidity()) {
    form.reportValidity();              // show the native messages
    return;
  }
  const data = new FormData(form);
  const payload = Object.fromEntries(data.entries());
  fetch('/api/signup', { method: 'POST', body: data });
});

form.elements.email.required = true;
form.elements.email.pattern = '^[a-z]+@example\\\\.com$';
form.elements.age.min = 18;

const tags = new FormData(form).getAll('tags'); // every checked value`,
      table: {
        caption: L('readonly against disabled', 'readonly против disabled'),
        headers: [
          L('State', 'Состояние'),
          L('Editable by the user', 'Редактируется пользователем'),
          L('Submitted', 'Отправляется'),
          L('Focusable', 'Фокусируемо'),
        ],
        rows: [
          [L('default', 'по умолчанию'), L('Yes', 'Да'), L('Yes', 'Да'), L('Yes', 'Да')],
          [L('readonly', 'readonly'), L('No', 'Нет'), L('Yes', 'Да'), L('Yes', 'Да')],
          [L('disabled', 'disabled'), L('No', 'Нет'), L('No', 'Нет'), L('No', 'Нет')],
        ],
      },
      callouts: [
        {
          tone: 'warning',
          title: L('Client validation is not a security boundary', 'Проверка на клиенте — не граница безопасности'),
          text: L(
            'Every rule in the form can be bypassed: the request can be sent with curl, the required attribute can be removed from the DOM, and the submit handler can be skipped entirely. The client check exists to give the user a quick answer, and the server must validate the same fields again on every request, treating the client values as untrusted input.',
            'Любое правило формы можно обойти: запрос можно отправить из curl, атрибут required можно выкинуть из DOM, обработчик отправки — проигнорировать. Клиентская проверка нужна, чтобы дать пользователю быстрый ответ, а сервер обязан проверять те же поля на каждом запросе, считая клиентские значения недоверенным вводом.'
          ),
        },
        {
          tone: 'pitfall',
          title: L('name and id do different jobs', 'name и id делают разную работу'),
          text: L(
            'A control is submitted because of its name attribute, not because of its id. An input with an id but no name never appears in FormData, and the for attribute of a label must point to the id, not to the name. When a field disappears from the submitted data, check the name first.',
            'Поле отправляется благодаря атрибуту name, а не из-за id. Input с id, но без name никогда не попадёт в FormData, а атрибут for у метки должен указывать на id, а не на name. Когда поле пропало из отправляемых данных, проверяйте в первую очередь name.'
          ),
        },
      ],
      takeaway: L(
        'Read the form with FormData, rely on the native validation for fast feedback, and repeat every rule on the server.',
        'Читайте форму через FormData, используйте нативную валидацию для быстрой обратной связи и повторяйте каждое правило на сервере.'
      ),
      seeAlso: [
        L('Section 14-3: events, phases, delegation and preventDefault', 'Секция 14-3: события, фазы, делегирование и preventDefault'),
        L('Chapter 9: Strings, regex and parsing', 'Глава 9: строки, регулярные выражения и разбор'),
        L('Chapter 12: Errors, debugging and defensive coding', 'Глава 12: ошибки, отладка и защитное программирование'),
      ],
    },
    {
      id: 'js-core-ch14-s5',
      title: L('Timers, requestAnimationFrame and observers', 'Таймеры, requestAnimationFrame и наблюдатели'),
      body: L(
        'setTimeout schedules a callback to run after a delay, and setInterval repeats it. Both delays are minimums, not promises about exact timing, and browsers clamp a timeout to about four milliseconds once it is nested more than five levels deep. Timers are also throttled in a background tab, where a once per second ceiling applies, so a poll that looks instant on screen may look frozen in another tab. The handles returned by both functions are what clearTimeout and clearInterval expect.\n\nsetInterval has a failure mode that surprises beginners: if the callback takes longer than the interval, the browser does not wait, it queues the next call anyway, so slow work piles up. A nested setTimeout replaces it cleanly, because the next call is scheduled only after the previous one has finished. requestAnimationFrame serves a different purpose: the callback runs right before the next repaint, receives a high resolution timestamp, and repeats at the display refresh rate, which is why animations belong there and not in a timer.\n\nObservers solve the same problem as polling, but they push. IntersectionObserver reports when an element enters or leaves the visible area of a root, with a configurable threshold and rootMargin, which is exactly what lazy loading images and infinite scroll need. ResizeObserver reports size changes of an element, MutationObserver reports changes to the subtree, and PerformanceObserver reports timing entries from the browser itself. Each of them fires only when something real changed, instead of running your check thousands of times to find nothing.\n\nThe pattern that pays off most is infinite scroll. You mark the last item of the list with a sentinel element, observe it with an IntersectionObserver, and when the sentinel becomes visible you fetch the next page and append it, then keep observing the new last item. Nothing polls the scroll position, no scroll handler measures geometry, and the work happens exactly when more content is needed, which also keeps the main thread free during the rest of the scroll.',
        'setTimeout назначает обратный вызов на запуск после задержки, а setInterval повторяет его. Обе задержки — минимумы, а не обещание точного времени, и браузер ограничивает таймаут примерно четырьмя миллисекундами, если вложенность превысила пять уровней. В фоновой вкладке таймеры дополнительно прореживают, там действует потолок примерно один вызов в секунду, поэтому опрос, выглядящий мгновенным на экране, может казаться замершим в другой вкладке. clearTimeout и clearInterval ждут именно тех дескрипторов, которые вернули эти функции.\n\nУ setInterval есть режим отказа, который удивляет новичков: если обратный вызов работает дольше интервала, браузер не ждёт, а всё равно ставит следующий вызов в очередь, и медленная работа накапливается. Вложенный setTimeout заменяет его чисто, потому что следующий вызов планируется только после завершения предыдущего. У requestAnimationFrame другая роль: обратный вызов выполняется прямо перед следующей перерисовкой, получает высокоточный timestamp и повторяется с частотой обновления экрана, поэтому анимации живут там, а не в таймере.\n\nНаблюдатели решают ту же задачу, что и опрос, но по-другому: они толкают события. IntersectionObserver сообщает, когда элемент входит в видимую область корня или выходит из неё, с настраиваемым порогом и rootMargin, — ровно то, что нужно ленивой загрузке изображений и бесконечной прокрутке. ResizeObserver сообщает об изменении размера элемента, MutationObserver — об изменениях в поддереве, а PerformanceObserver — о записях времени, которые выдаёт сам браузер. Каждый из них срабатывает только при реальном изменении, а не выполняет вашу проверку тысячи раз вхолостую.\n\nСхема, которая окупается сильнее всего, — бесконечная прокрутка. Последний пункт списка помечают служебным элементом, наблюдают его через IntersectionObserver, и когда он становится видимым, загружают следующую страницу и добавляют её в список, продолжая наблюдать новый последний пункт. Никто не опрашивает позицию прокрутки, обработчик scroll не измеряет геометрию, а работа происходит ровно тогда, когда контент действительно нужен, что заодно освобождает главный поток на всё время прокрутки.'
      ),
      bullets: [
        L('setTimeout guarantees a minimum delay, not an exact one.', 'setTimeout гарантирует минимальную задержку, а не точное время.'),
        L('setInterval piles up calls when the callback is slower than the interval.', 'setInterval накапливает вызовы, если обработчик работает дольше интервала.'),
        L('Background tabs throttle timers to roughly one run per second.', 'В фоновой вкладке таймеры прореживают до примерно одного вызова в секунду.'),
        L('requestAnimationFrame runs before every repaint and receives a high resolution timestamp.', 'requestAnimationFrame выполняется перед каждой перерисовкой и получает высокоточный timestamp.'),
        L('IntersectionObserver fires when an element crosses the visibility threshold, not on every scroll.', 'IntersectionObserver срабатывает при пересечении порога видимости, а не на каждом scroll.'),
        L('ResizeObserver reports size changes of the observed element.', 'ResizeObserver сообщает об изменении размера наблюдаемого элемента.'),
      ],
      code: `let timerId;
function schedule() {
  timerId = setTimeout(() => {
    doWork();
    schedule();                       // next run starts after this one
  }, 200);
}
let frameId;
function animate(timestamp) {
  box.style.transform = \`translateX(\${timestamp % 1000}px)\`;
  frameId = requestAnimationFrame(animate);
}
frameId = requestAnimationFrame(animate);
cancelAnimationFrame(frameId);
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
  }
}, { rootMargin: '200px' });
document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));`,
      table: {
        caption: L('Polling against observers', 'Опрос против наблюдателей'),
        headers: [L('Approach', 'Подход'), L('Runs', 'Когда выполняется'), L('Cost', 'Цена')],
        rows: [
          [L('setInterval polling', 'опрос через setInterval'), L('On a fixed timer', 'По таймеру с фиксированным шагом'), L('Runs even when nothing changed', 'Работает, даже когда ничего не изменилось')],
          [L('scroll handler with getBoundingClientRect', 'обработчик scroll с getBoundingClientRect'), L('On every scroll event', 'На каждом событии прокрутки'), L('Forces a layout on each event', 'Пересчитывает раскладку на каждом событии')],
          [L('IntersectionObserver', 'IntersectionObserver'), L('When the element crosses the threshold', 'Когда элемент пересекает порог'), L('Fires only on a real change', 'Срабатывает только при реальном изменении')],
          [L('ResizeObserver', 'ResizeObserver'), L('When the observed element changes size', 'Когда наблюдаемый элемент меняет размер'), L('Fires only on a real change', 'Срабатывает только при реальном изменении')],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('setInterval piles up slow work', 'setInterval копит медленную работу'),
          text: L(
            'If the callback takes longer than the interval, the browser queues the next call immediately, so slow requests accumulate and the queue keeps growing. Schedule the next run inside the callback with setTimeout instead, which guarantees that only one run is in flight.',
            'Если обратный вызов работает дольше интервала, браузер сразу ставит следующий вызов в очередь, поэтому медленные запросы накапливаются и очередь растёт. Планируйте следующий запуск внутри самого вызова через setTimeout, тогда одновременно выполняется ровно один проход.'
          ),
        },
        {
          tone: 'note',
          title: L('Timers are throttled in background tabs', 'В фоновых вкладках таймеры прореживают'),
          text: L(
            'A hidden tab clamps timers to roughly one run per second, and deeply nested timeouts are clamped to about four milliseconds. Neither is a bug, and both are reasons to treat a timer as a hint rather than a schedule, and to move work that must keep a steady rhythm into a Web Worker.',
            'Скрытая вкладка ограничивает таймеры примерно одним запуском в секунду, а глубоко вложенные таймауты — примерно четырьмя миллисекундами. Ни то, ни другое не баг, и обе причины считать таймер подсказкой, а не расписанием, а работу с постоянным ритмом переносить в Web Worker.'
          ),
        },
      ],
      takeaway: L(
        'Use a nested setTimeout instead of setInterval, drive animations with requestAnimationFrame, and let observers push instead of polling.',
        'Используйте вложенный setTimeout вместо setInterval, анимации ведите через requestAnimationFrame, а наблюдателям позвольте толкать события вместо опроса.'
      ),
      seeAlso: [
        L('Section 14-3: events, phases, delegation and preventDefault', 'Секция 14-3: события, фазы, делегирование и preventDefault'),
        L('Chapter 11: The event loop, promises and async/await', 'Глава 11: цикл событий, промисы и async/await'),
        L('Chapter 10: Numbers, math, dates and Intl', 'Глава 10: числа, математика, даты и Intl'),
      ],
    },
  ],
};
