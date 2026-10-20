import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const domTasks: PracticeTask[] = [
  {
    id: 'topic-dom-1',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'basic',
    title: L('Handle list clicks with one delegated listener', 'Обработать клики в списке одним делегированным слушателем'),
    brief: L(
      'Write a function setupList(list, onSelect) that attaches a single click listener to the list element and reports clicks on its items. When the clicked element, or one of its ancestors inside the list, has a data-id attribute, call onSelect(id, element) with the value of that attribute and with the element itself. Clicks on elements without data-id and clicks on elements outside the list must be ignored, and no listener may be attached to the individual items. Example: clicking an li with data-id="42" calls onSelect("42", theLiElement), clicking the background of the list calls nothing.',
      'Напишите функцию setupList(list, onSelect), которая вешает один слушатель click на элемент списка и сообщает о кликах по его пунктам. Если кликнутый элемент или один из его предков внутри списка имеет атрибут data-id, вызовите onSelect(id, element) со значением этого атрибута и с самим элементом. Клики по элементам без data-id и клики по элементам вне списка должны игнорироваться, а к отдельным пунктам слушатели прикреплять нельзя. Пример: клик по li с data-id="42" вызывает onSelect("42", liElement), клик по фону списка не вызывает ничего.'
    ),
    hint: L(
      'Use event.target.closest("[data-id]") to find the closest item and check the result with list.contains(element), so that clicks on nested markup still work but clicks outside the list are ignored.',
      'Используйте event.target.closest("[data-id]"), чтобы найти ближайший пункт, и проверьте результат через list.contains(element): клики по вложенной разметке продолжат работать, а клики вне списка будут отброшены.'
    ),
    solution: `function setupList(list, onSelect) {
  list.addEventListener('click', (event) => {
    const item = event.target.closest('[data-id]');
    if (!item || !list.contains(item)) return;
    onSelect(item.dataset.id, item);
  });
}

const list = document.getElementById('todo-list');

setupList(list, (id, element) => {
  console.log('selected', id, element.tagName);
});`,
    explanation: L(
      'One listener on the list is enough for every item, because a click always travels up through the ancestors of the target. closest walks up from the clicked node and returns the first element that matches the selector, so a click on a span inside a li still finds the li. The contains check rejects a match that lives outside the list, for example an element with the same data-id somewhere else on the page. The listener is never attached to the items themselves, so items added later work without any extra code.',
      'Одного слушателя на списке достаточно для всех пунктов, потому что клик всегда поднимается по предкам целевого элемента. closest поднимается от кликнутого узла и возвращает первый подходящий под селектор элемент, поэтому клик по span внутри li всё равно найдёт li. Проверка contains отбрасывает совпадение, лежащее вне списка, например элемент с тем же data-id в другой части страницы. Слушатель ниогда не вешается на сами пункты, поэтому пункты, добавленные позже, работают без дополнительного кода.'
    ),
  },
  {
    id: 'topic-dom-2',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'basic',
    title: L('Stop the default action and the propagation', 'Остановить действие по умолчанию и всплытие события'),
    brief: L(
      'Write a function handleLinkClick(event, onClick) that protects a link from the browser and then reports the click. It must call event.preventDefault() so that the page does not follow the link, it must call event.stopPropagation() so that the click does not reach the ancestors of the link, and only after that it must call onClick(event) with the same event. Each of the two methods has to be called exactly once. Example: a fake event that records the calls produces the order ["preventDefault", "stopPropagation", "onClick"], and the browser never navigates to the target of the link.',
      'Напишите функцию handleLinkClick(event, onClick), которая защищает ссылку от браузера и только потом сообщает о клике. Она должна вызвать event.preventDefault(), чтобы страница не перешла по ссылке, вызвать event.stopPropagation(), чтобы клик не дошёл до предков ссылки, и только после этого вызвать onClick(event) с тем же событием. Каждый из двух методов должен быть вызван ровно один раз. Пример: поддельное событие, записывающее вызовы, даёт порядок ["preventDefault", "stopPropagation", "onClick"], и браузер никогда не переходит по адресу ссылки.'
    ),
    hint: L(
      'preventDefault cancels the browser action of the event, stopPropagation cancels the travel of the event through the tree. They solve different problems and both are needed here.',
      'preventDefault отменяет действие браузера по умолчанию, stopPropagation отменяет распространение события по дереву. Это разные задачи, и здесь нужны обе.'
    ),
    solution: `function handleLinkClick(event, onClick) {
  event.preventDefault();
  event.stopPropagation();
  onClick(event);
}

const link = document.querySelector('a#docs');

link.addEventListener('click', (event) => {
  handleLinkClick(event, (current) => {
    console.log('clicked', current.currentTarget.textContent);
  });
});`,
    explanation: L(
      'The two calls do different jobs. preventDefault tells the browser not to perform its own action, and for a link that action is the navigation, so the page stays where it is. stopPropagation tells the event not to travel further up the tree, so an outer click handler does not see this click. Neither of them stops the other listeners of the same element, so onClick still receives the event and can read the target of the click.',
      'Два вызова делают разную работу. preventDefault говорит браузеру не выполнять своё действие, а для ссылки это переход по адресу, поэтому страница остаётся на месте. stopPropagation говорит событию не подниматься дальше по дереву, поэтому внешний обработчик клика этот клик не увидит. Ни один из них не отменяет остальные слушатели того же элемента, поэтому onClick всё равно получает событие и может прочитать его цель.'
    ),
  },
  {
    id: 'topic-dom-3',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'basic',
    title: L('Debounce a search field', 'Дебаунс для поля поиска'),
    brief: L(
      'Write a function setupSearch(input, onSearch, delayMs) that listens to the "input" event of a text field and calls onSearch(query) only after the user has stopped typing for delayMs milliseconds. Every new keystroke cancels the pending call, so typing three characters in a row results in exactly one call with the final value. The value is trimmed before it is passed to onSearch, an empty value is still reported, and the function returns a cancel function that removes the pending call without triggering it. Example: with delayMs = 200, typing "a", then "ab", then "abc" without a pause produces one single call onSearch("abc").',
      'Напишите функцию setupSearch(input, onSearch, delayMs), которая слушает событие "input" текстового поля и вызывает onSearch(query) только после того, как пользователь перестал печатать на delayMs миллисекунд. Каждый новый ввод отменяет отложенный вызов, поэтому три символа подряд дают ровно один вызов с итоговым значением. Значение обрезается от пробелов перед передачей в onSearch, пустое значение тоже сообщается, а функция возвращает функцию отмены, которая убирает отложенный вызов, не вызывая его. Пример: при delayMs = 200 ввод "a", затем "ab", затем "abc" без пауз даёт единственный вызов onSearch("abc").'
    ),
    hint: L(
      'Keep the id of the pending timer in a variable, clear it on every keystroke, and start a new one. The returned cancel function does exactly the same clear without scheduling anything new.',
      'Храните id отложенного таймера в переменной, очищайте его при каждом вводе и запускайте новый. Возвращаемая функция отмены делает ровно то же очищение, но ничего не планирует.'
    ),
    solution: `function setupSearch(input, onSearch, delayMs = 300) {
  let timer = null;

  const cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  input.addEventListener('input', (event) => {
    const value = event.target.value;
    cancel();
    timer = setTimeout(() => {
      timer = null;
      onSearch(value.trim());
    }, delayMs);
  });

  return cancel;
}

const search = document.getElementById('search');
const cancelSearch = setupSearch(search, (query) => {
  console.log('search for', query);
}, 300);`,
    explanation: L(
      'A timer id is enough to model a pending call, because there is never more than one. Each keystroke clears the previous timer, so the callback of an old value can never run, and the closure of the newest timer keeps the newest value. The result is one request per pause instead of one request per letter, which is exactly what a search endpoint needs. The cancel function is the same clearTimeout call without a new timer, so a component can drop a pending search when it unmounts.',
      'id таймера достаточно, чтобы описать отложенный вызов, потому что он всегда только один. Каждый ввод очищает предыдущий таймер, поэтому колбэк старого значения уже не выполнится, а замыкание нового таймера хранит новое значение. В итоге один запрос на паузу вместо одного запроса на букву, и это именно то, что нужно поисковому эндпоинту. Функция отмены — тот же clearTimeout без нового таймера, поэтому компонент может сбросить отложенный поиск при размонтировании.'
    ),
  },
  {
    id: 'topic-dom-4',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'intermediate',
    title: L('Create, insert and remove a node', 'Создать, вставить и удалить узел'),
    brief: L(
      'Write three functions that manage a list of items without innerHTML. createTodoItem(text, id) creates an li element with the class "todo", the given text and the given id in the data-id attribute. insertItem(list, item, beforeId) puts the item at the end of the list, or right before the existing item whose data-id equals beforeId, and returns the inserted item. removeItem(list, id) removes the item with that data-id and returns true, or returns false when the list has no such item. Example: createTodoItem("Buy milk", 7) gives an element with className "todo", textContent "Buy milk" and dataset.id "7", and insertItem(list, item, 3) puts the item in front of the element with data-id "3".',
      'Напишите три функции для работы со списком без innerHTML. createTodoItem(text, id) создаёт элемент li с классом "todo", указанным текстом и указанным id в атрибуте data-id. insertItem(list, item, beforeId) добавляет элемент в конец списка или прямо перед существующим элементом, у которого data-id равен beforeId, и возвращает вставленный элемент. removeItem(list, id) удаляет элемент с таким data-id и возвращает true, либо возвращает false, если такого элемента в списке нет. Пример: createTodoItem("Buy milk", 7) даёт элемент с className "todo", textContent "Buy milk" и dataset.id "7", а insertItem(list, item, 3) ставит элемент перед элементом с data-id "3".'
    ),
    hint: L(
      'Create the element with document.createElement, find a child with Array.from(list.children).find(...), and remember that insertBefore(item, null) appends to the end.',
      'Создавайте элемент через document.createElement, ищите потомка через Array.from(list.children).find(...), и помните, что insertBefore(item, null) добавляет элемент в конец.'
    ),
    solution: `function createTodoItem(text, id) {
  const item = document.createElement('li');
  item.className = 'todo';
  item.textContent = text;
  item.dataset.id = String(id);
  return item;
}

function findItem(list, id) {
  return Array.from(list.children).find((child) => child.dataset.id === String(id));
}

function insertItem(list, item, beforeId = null) {
  if (beforeId === null) {
    list.appendChild(item);
    return item;
  }
  const before = findItem(list, beforeId);
  list.insertBefore(item, before ?? null);
  return item;
}

function removeItem(list, id) {
  const target = findItem(list, id);
  if (!target) return false;
  list.removeChild(target);
  return true;
}

const list = document.getElementById('todo-list');
insertItem(list, createTodoItem('Buy milk', 7));`,
    explanation: L(
      'Building nodes with createElement and textContent keeps the data out of the markup, so a title with a quote or a tag in it can never break the page. The data-id attribute is the identity of an item, and converting it with String makes the comparison work for numeric ids as well. insertBefore with a null reference appends, so one function covers both positions. removeItem reports whether something was really removed, which lets the caller show a message when the item was already gone.',
      'Сборка узлов через createElement и textContent держит данные вне разметки, поэтому заголовок с кавычкой или тегом внутри не может сломать страницу. Атрибут data-id — это идентичность пункта, и приведение к строке делает сравнение рабочим и для числовых id. insertBefore со ссылкой null добавляет элемент в конец, поэтому одна функция покрывает обе позиции. removeItem сообщает, действительно ли что-то удалили, и вызывающий код может показать сообщение, если пункта уже не было.'
    ),
  },
  {
    id: 'topic-dom-5',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'intermediate',
    title: L('Validate a form on submit', 'Проверить форму при отправке'),
    brief: L(
      'Write a function setupForm(form, onSubmit, onError) that handles the "submit" event of a form and never lets the page reload. The form exposes its fields through form.elements, an array of elements with a name and a value. The function reads the fields "name" and "email", trims their values and validates them: name must not be empty, email must not be empty and must contain "@". When everything is valid it calls onSubmit({ name, email }) with the trimmed values, otherwise it calls onError(errors) with an object that maps a field name to a message, for example { email: "Email is required" }. The default action of the submit event must always be prevented. Example: submitting with name "Ada" and email "ada@example.com" calls onSubmit({ name: "Ada", email: "ada@example.com" }), submitting with an empty email calls onError({ email: "Email is required" }).',
      'Напишите функцию setupForm(form, onSubmit, onError), которая обрабатывает событие "submit" формы и никогда не даёт странице перезагрузиться. Форма отдаёт свои поля через form.elements — массив элементов с именем и значением. Функция читает поля "name" и "email", обрезает значения и проверяет их: name не должно быть пустым, email не должен быть пустым и должен содержать "@". Если всё в порядке, вызывается onSubmit({ name, email }) с обрезанными значениями, иначе вызывается onError(errors) с объектом, который сопоставляет имя поля сообщению, например { email: "Email is required" }. Действие по умолчанию для submit всегда должно отменяться. Пример: отправка с name "Ada" и email "ada@example.com" вызывает onSubmit({ name: "Ada", email: "ada@example.com" }), отправка с пустым email вызывает onError({ email: "Email is required" }).'
    ),
    hint: L(
      'Call preventDefault first, collect the fields into an object, build an object with the error messages, and send the form to onSubmit only when that object is empty.',
      'Сначала вызовите preventDefault, соберите поля в объект, постройте объект с сообщениями об ошибках и отправляйте форму в onSubmit только тогда, когда этот объект пуст.'
    ),
    solution: `function setupForm(form, onSubmit, onError) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {};
    for (const field of form.elements) {
      data[field.name] = String(field.value).trim();
    }

    const errors = {};
    if (!data.name) {
      errors.name = 'Name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!data.email.includes('@')) {
      errors.email = 'Email must contain @';
    }

    if (Object.keys(errors).length > 0) {
      onError(errors);
      return;
    }

    onSubmit({ name: data.name, email: data.email });
  });
}

const form = document.getElementById('signup');

setupForm(
  form,
  (data) => console.log('submitting', data),
  (errors) => console.log('invalid', errors)
);`,
    explanation: L(
      'preventDefault goes first, so the browser never sends the form while the code decides what to do with it. Reading the fields into a plain object makes the validation independent of the markup, and trimming the values means a field with only spaces is treated as empty. The errors object collects every problem, so the user can see all of them at once instead of one per attempt. The early return keeps the happy path clean: the form is only handed over when the error object is empty.',
      'preventDefault вызывается первым, поэтому браузер никогда не отправит форму, пока код решает, что с ней делать. Чтение полей в обычный объект делает проверку независимой от разметки, а обрезка значений означает, что поле из одних пробелов считается пустым. Объект ошибок собирает все проблемы сразу, поэтому пользователь видит их все, а не по одной за попытку. Ранний выход оставляет успешный путь чистым: форму отдают обработчику, только когда объект ошибок пуст.'
    ),
  },
  {
    id: 'topic-dom-6',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'advanced',
    title: L('Build a store on top of localStorage', 'Сделать хранилище поверх localStorage'),
    brief: L(
      'Write a function createStore(storage, key) that returns a small store on top of a localStorage-like object with getItem, setItem and removeItem. All the values live in one JSON document under the given key. The returned object has get(name), set(name, value), remove(name) and subscribe(listener). get returns the stored value or undefined when the name is unknown. set writes the value, saves the whole document and calls every listener with { name, value }. remove deletes the name, saves the document and calls every listener with { name, value: undefined }. subscribe returns a function that unsubscribes the listener. A corrupted document must not break the store: get returns undefined and the next set overwrites it. Example: store.set("theme", "dark") makes store.get("theme") return "dark" and the listener receives { name: "theme", value: "dark" }.',
      'Напишите функцию createStore(storage, key), которая возвращает небольшое хранилище поверх объекта вроде localStorage с методами getItem, setItem и removeItem. Все значения лежат в одном JSON-документе под указанным ключом. Возвращаемый объект имеет get(name), set(name, value), remove(name) и subscribe(listener). get возвращает сохранённое значение или undefined, если имя неизвестно. set записывает значение, сохраняет весь документ и вызывает каждого слушателя с { name, value }. remove удаляет имя, сохраняет документ и вызывает каждого слушателя с { name, value: undefined }. subscribe возвращает функцию, отписывающую слушателя. Испорченный документ не должен ломать хранилище: get возвращает undefined, а следующий set перезаписывает его. Пример: store.set("theme", "dark") делает так, что store.get("theme") возвращает "dark", а слушатель получает { name: "theme", value: "dark" }.'
    ),
    hint: L(
      'Keep a Set of listeners, read and parse the document in one helper with a try and catch, and write the whole document back after every change.',
      'Держите слушателей в Set, читайте и разбирайте документ одной вспомогательной функцией с try и catch и записывайте документ целиком после каждого изменения.'
    ),
    solution: `function createStore(storage, key) {
  const listeners = new Set();

  const readAll = () => {
    try {
      const raw = storage.getItem(key);
      const parsed = raw === null ? {} : JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };

  const writeAll = (data) => {
    storage.setItem(key, JSON.stringify(data));
  };

  const notify = (name, value) => {
    for (const listener of listeners) {
      listener({ name, value });
    }
  };

  return {
    get(name) {
      return readAll()[name];
    },
    set(name, value) {
      const data = readAll();
      data[name] = value;
      writeAll(data);
      notify(name, value);
    },
    remove(name) {
      const data = readAll();
      delete data[name];
      writeAll(data);
      notify(name, undefined);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const store = createStore(localStorage, 'app');
const unsubscribe = store.subscribe((change) => console.log('changed', change));

store.set('theme', 'dark');
unsubscribe();`,
    explanation: L(
      'One JSON document keeps the whole state in a single storage entry, so nothing is ever half written and the state can be read back with one call. The read helper never throws: a damaged value from another tab or from an old version of the app is treated as an empty document, and the next write repairs it. A Set of listeners gives a cheap way to add and remove subscribers, and the notification is a single object so the listener does not need to know which kind of change happened.',
      'Один JSON-документ хранит всё состояние в единственной записи storage, поэтому данные никогда не пишутся наполовину и состояние читается одним вызовом. Вспомогательная функция чтения не бросает исключений: повреждённое значение из другой вкладки или из старой версии приложения считается пустым документом, и следующая запись его чинит. Set слушателей даёт дешёвый способ добавлять и убирать подписчиков, а уведомление — это один объект, поэтому слушателю не нужно знать, какое именно изменение произошло.'
    ),
  },
  {
    id: 'topic-dom-7',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'advanced',
    title: L('Register a keyboard shortcut', 'Зарегистрировать горячую клавишу'),
    brief: L(
      'Write a function registerShortcut(target, combo, handler) that listens to the "keydown" event of target, calls handler(event) when the pressed key matches the combo and returns a function that removes the listener. A combo is a plus separated list of tokens: the modifiers "ctrl", "meta", "shift" and "alt", the optional modifier "mod", and exactly one key token. The modifier "mod" means ctrl or meta, but never both. The key token is matched case insensitively, and the aliases "esc", "space", "enter", "up", "down", "left", "right" and "del" match the keys "Escape", " ", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight" and "Delete". The event must be prevented with preventDefault() only when the combo matched, and a combo with a modifier that is not pressed must not match. Example: registerShortcut(window, "ctrl+s", save) calls save when Ctrl+S is pressed, and the returned function stops the calls.',
      'Напишите функцию registerShortcut(target, combo, handler), которая слушает событие "keydown" элемента target, вызывает handler(event), когда нажатая клавиша совпадает с combo, и возвращает функцию, снимающую слушатель. Combo — это список токенов через плюс: модификаторы "ctrl", "meta", "shift" и "alt", необязательный модификатор "mod" и ровно один токен клавиши. Модификатор "mod" означает ctrl или meta, но не оба сразу. Токен клавиши сравнивается без учёта регистра, а псевдонимы "esc", "space", "enter", "up", "down", "left", "right" и "del" соответствуют клавишам "Escape", " ", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight" и "Delete". Событие нужно отменять через preventDefault() только при совпадении combo, и combo с модификатором, который не нажат, совпадать не должен. Пример: registerShortcut(window, "ctrl+s", save) вызывает save при нажатии Ctrl+S, а возвращаемая функция прекращает вызовы.'
    ),
    hint: L(
      'Split the combo into a set of modifiers and one key, normalise the key of the event with the same alias table, and compare the modifier sets exactly. Treat "mod" as "ctrl or meta, but not both".',
      'Разбейте combo на множество модификаторов и одну клавишу, нормализуйте клавишу события той же таблицей псевдонимов и сравните наборы модификаторов точно. Считайте "mod" как "ctrl или meta, но не оба".'
    ),
    solution: `const KEY_ALIASES = {
  esc: 'escape',
  space: ' ',
  enter: 'enter',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  del: 'delete',
};

function normalizeKey(key) {
  const lower = String(key).toLowerCase();
  return KEY_ALIASES[lower] ?? lower;
}

function parseCombo(combo) {
  const modifiers = new Set();
  let key = null;

  for (const token of combo.toLowerCase().split('+')) {
    const name = token.trim();
    if (name === '') continue;
    if (name === 'ctrl' || name === 'meta' || name === 'shift' || name === 'alt' || name === 'mod') {
      modifiers.add(name);
    } else {
      key = name;
    }
  }

  return { modifiers, key: normalizeKey(key) };
}

function matchesCombo(parsed, event) {
  const ctrl = event.ctrlKey === true;
  const meta = event.metaKey === true;
  const shift = event.shiftKey === true;
  const alt = event.altKey === true;

  if (parsed.modifiers.has('shift') !== shift) return false;
  if (parsed.modifiers.has('alt') !== alt) return false;

  if (parsed.modifiers.has('mod')) {
    if (ctrl === meta) return false;
  } else {
    if (parsed.modifiers.has('ctrl') !== ctrl) return false;
    if (parsed.modifiers.has('meta') !== meta) return false;
  }

  return normalizeKey(event.key) === parsed.key;
}

function registerShortcut(target, combo, handler) {
  const parsed = parseCombo(combo);

  const listener = (event) => {
    if (!matchesCombo(parsed, event)) return;
    event.preventDefault();
    handler(event);
  };

  target.addEventListener('keydown', listener);

  return () => {
    target.removeEventListener('keydown', listener);
  };
}

const unregister = registerShortcut(window, 'ctrl+s', () => console.log('saved'));
unregister();`,
    explanation: L(
      'The combo is parsed once at registration, so the keydown handler only compares values. The modifier sets are compared with the boolean operator, which means that a combo with a modifier only matches when that modifier is really pressed and no extra modifier is held. The special modifier "mod" is checked separately, because on a laptop the same shortcut must work with the command key and on a desktop with the control key, but never with both at once. The alias table maps the many names of a key onto one canonical name, so "esc" and "Escape" end up equal.',
      'Combo разбирается один раз при регистрации, поэтому обработчик keydown только сравнивает значения. Наборы модификаторов сравниваются булевым оператором, а это значит, что combo с модификатором совпадает только когда модификатор действительно нажат и лишних модификаторов нет. Специальный модификатор "mod" проверяется отдельно, потому что на ноутбуке одна и та же горячая клавиша должна работать и с командной клавишей, и с control, но никогда с обеими сразу. Таблица псевдонимов приводит разные имена одной клавиши к одному имени, поэтому "esc" и "Escape" становятся равными.'
    ),
  },
  {
    id: 'topic-dom-8',
    moduleId: 'js-core',
    topic: 'dom',
    level: 'advanced',
    title: L('Update a live region for screen readers', 'Обновлять live region для скринридеров'),
    brief: L(
      'Write a function createAnnouncer(region, delayMs) that returns an announce(message) function writing messages into an aria-live region. The announce function ignores an empty message, it replaces a message that is still waiting, and it writes the text into the region only delayMs milliseconds after the last call. Screen readers ignore a region whose text did not change, so when the same message is announced twice in a row the second announcement has to end with a zero width space (U+200B). The announce function returns true when a message was scheduled and false for an empty message, and it has a cancel method that drops the pending message. Example: announce("Saved") followed by announce("Saved") leaves the text "Saved" plus a zero width space in the region, while announce("Saved") after announce("Deleted") leaves the plain text "Saved".',
      'Напишите функцию createAnnouncer(region, delayMs), которая возвращает функцию announce(message), записывающую сообщения в область aria-live. Функция announce игнорирует пустое сообщение, заменяет сообщение, которое ещё ожидает, и записывает текст в область только через delayMs миллисекунд после последнего вызова. Скринридеры игнорируют область, текст в которой не изменился, поэтому при повторе одного и того же сообщения подряд второе объявление обязано заканчиваться пробелом нулевой ширины (U+200B). Функция announce возвращает true, когда сообщение запланировано, и false для пустого сообщения, а у неё есть метод cancel, который сбрасывает отложенное сообщение. Пример: announce("Saved"), а затем announce("Saved") оставляет в области текст "Saved" с пробелом нулевой ширины, а announce("Saved") после announce("Deleted") оставляет обычный текст "Saved".'
    ),
    hint: L(
      'Keep the last written text and the pending timer. When the new text equals the last one, append the zero width space, otherwise write the plain text.',
      'Храните последний записанный текст и отложенный таймер. Если новый текст совпадает с последним, дописывайте пробел нулевой ширины, иначе пишите обычный текст.'
    ),
    solution: `const ZERO_WIDTH_SPACE = '\\u200B';

function createAnnouncer(region, delayMs = 100) {
  let timer = null;
  let lastText = '';

  const announce = (message) => {
    const text = String(message ?? '').trim();
    if (text === '') return false;

    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      timer = null;
      const next = text === lastText ? text + ZERO_WIDTH_SPACE : text;
      lastText = next;
      region.textContent = next;
    }, delayMs);

    return true;
  };

  announce.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return announce;
}

const region = document.getElementById('live-region');
const announce = createAnnouncer(region, 100);

announce('Saved');
announce.cancel();`,
    explanation: L(
      'A live region is read out only when its text changes, so the same message twice in a row would be silent. The zero width space is invisible for a reader but changes the string, so the second announcement is spoken again. The debounce keeps a burst of messages from flooding the screen reader, and the last message wins. The cancel method lets a component drop a pending message when it unmounts, so nothing is written into a region that no longer exists.',
      'Область live читается вслух, только когда её текст меняется, поэтому одно и то же сообщение подряд прозвучало бы молча. Пробел нулевой ширины невидим для читателя, но меняет строку, и второе объявление снова произносится. Дебаунс не даёт очереди сообщений завалить скринридер, и побеждает последнее сообщение. Метод cancel позволяет компоненту сбросить отложенное сообщение при размонтировании, чтобы ничего не записалось в область, которой больше нет.'
    ),
  },
];
