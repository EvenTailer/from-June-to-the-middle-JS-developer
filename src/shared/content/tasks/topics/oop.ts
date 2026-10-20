import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const oopTasks: PracticeTask[] = [
  {
    id: 'topic-oop-1',
    moduleId: 'oop',
    topic: 'oop',
    level: 'basic',
    title: L('A bank account with a private balance', 'Банковский счёт с приватным балансом'),
    brief: L(
      'Write a class BankAccount that keeps its money safe. The balance must be unreachable from the outside: use a private field, not a public property that anybody can overwrite. The constructor takes the initial balance and throws an Error when it is negative. The method deposit(amount) adds money and throws an Error when the amount is not positive. The method withdraw(amount) removes money, throws an Error when the amount is not positive and throws an Error with the text "Insufficient funds" when there is not enough money. Add a getter balance that returns the current amount and a toString that returns the balance with two decimals, for example "Balance: 120.50".',
      'Напишите класс BankAccount, который надёжно хранит деньги. Баланс должен быть недоступен снаружи: используйте приватное поле, а не публичное свойство, которое кто угодно перезапишет. Конструктор принимает начальный баланс и бросает Error, если он отрицательный. Метод deposit(amount) добавляет деньги и бросает Error, если сумма не положительная. Метод withdraw(amount) снимает деньги, бросает Error, если сумма не положительная, и бросает Error с текстом "Insufficient funds", если денег не хватает. Добавьте геттер balance, который возвращает текущую сумму, и toString, который возвращает баланс с двумя знаками, например "Balance: 120.50".'
    ),
    hint: L(
      'A field declared with # is private to the class body and cannot be read or written from outside, not even by a property with the same name. A getter without a setter makes a read only view of it.',
      'Поле, объявленное через #, приватно внутри тела класса, и его нельзя прочитать или записать снаружи, даже через одноимённое свойство. Геттер без сеттера даёт представление только для чтения.'
    ),
    solution: `class BankAccount {
  #balance;

  constructor(initialBalance = 0) {
    if (initialBalance < 0) {
      throw new Error('Initial balance cannot be negative');
    }
    this.#balance = initialBalance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    return this.#balance;
  }

  toString() {
    return 'Balance: ' + this.#balance.toFixed(2);
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.balance); // 150

try {
  account.withdraw(200);
} catch (error) {
  console.log(error.message); // Insufficient funds
}

console.log(String(account)); // Balance: 150.00`,
    explanation: L(
      'The #balance field is a real private field of the class, so it cannot be touched from the outside at all: there is no property with that name that somebody could assign to, and the object is safe from accidental or malicious changes. Everything that changes the money goes through deposit and withdraw, and both of them validate the input first, so the class guarantees the invariant that the balance is never negative. The getter balance exposes the value for reading, and the absence of a setter means there is no way to write it. A class that validates its own invariants is far easier to reason about than one whose fields everybody can overwrite, and that is the whole point of encapsulation.',
      'Поле #balance — настоящее приватное поле класса, к нему нельзя обратиться снаружи вообще: нет свойства с таким именем, кому-то можно было бы присвоить значение, и объект защищён от случайных и злонамеренных изменений. Все деньги меняются только через deposit и withdraw, и оба метода сначала проверяют входные данные, поэтому класс гарантирует инвариант: баланс никогда не отрицательный. Геттер balance открывает значение для чтения, а отсутствие сеттера означает, что записать его нельзя. Класс, который проверяет свои инварианты сам, гораздо проще рассуждать о нём, чем класс с изменяемыми извне полями, и в этом весь смысл инкапсуляции.'
    ),
  },
  {
    id: 'topic-oop-2',
    moduleId: 'oop',
    topic: 'oop',
    level: 'basic',
    title: L('A hierarchy of shapes with polymorphism', 'Иерархия фигур с полиморфизмом'),
    brief: L(
      'Build a small hierarchy of shapes. The base class Shape stores the name of the shape in a private field, exposes it with a getter type, declares the method area that throws an Error because a base class cannot know the area, and defines toString that returns the type and the rounded area. Circle extends Shape, takes a radius and computes Math.PI * radius ** 2. Rectangle extends Shape, takes a width and a height and computes width * height. Square extends Rectangle, takes one side, passes it as both the width and the height and overrides the getter type so that it reports "square" while reusing the formula of the rectangle. Print the area and the string form of a circle of radius 2, a rectangle of 3 and 4 and a square of 5.',
      'Постройте небольшую иерархию фигур. Базовый класс Shape хранит название фигуры в приватном поле, отдаёт его через геттер type, объявляет метод area, который бросает Error, потому что базовый класс не знает площадь, и задаёт toString, возвращающий тип и округлённую площадь. Circle extends Shape, принимает радиус и считает Math.PI * radius ** 2. Rectangle extends Shape, принимает ширину и высоту и считает width * height. Square extends Rectangle, принимает одну сторону, передаёт её и как ширину, и как высоту, и переопределяет геттер type, чтобы сообщать "square", переиспользуя формулу прямоугольника. Напечатайте площадь и строковый вид круга с радиусом 2, прямоугольника 3 на 4 и квадрата 5.'
    ),
    hint: L(
      'A subclass calls the constructor of the parent with super, and the parent constructor must be called before the subclass touches its own fields. Overriding a getter is exactly the same as overriding a method.',
      'Подкласс вызывает конструктор родителя через super, и конструктор родителя должен выполниться раньше, чем подкласс тронет свои поля. Переопределение геттера — это ровно то же, что переопределение метода.'
    ),
    solution: `class Shape {
  #type;

  constructor(type) {
    this.#type = type;
  }

  get type() {
    return this.#type;
  }

  area() {
    throw new Error('area() is not implemented in the base class');
  }

  toString() {
    return this.type + ' area=' + this.area().toFixed(2);
  }
}

class Circle extends Shape {
  #radius;

  constructor(radius) {
    super('circle');
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  area() {
    return Math.PI * this.#radius ** 2;
  }
}

class Rectangle extends Shape {
  #width;
  #height;

  constructor(width, height) {
    super('rectangle');
    this.#width = width;
    this.#height = height;
  }

  area() {
    return this.#width * this.#height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }

  get type() {
    return 'square';
  }
}

const shapes = [new Circle(2), new Rectangle(3, 4), new Square(5)];

for (const shape of shapes) {
  console.log(shape.area());
  console.log(String(shape));
}`,
    explanation: L(
      'The base class defines the contract: every shape has a type and an area, so the code that works with a shape does not care which shape it is. The base area throws, because a shape without a formula cannot pretend to have one, and every concrete subclass replaces it. Polymorphism is what makes the loop at the end work: the array holds three different classes, but the call shape.area() dispatches to the right implementation for each element, so the client code is written once. Square reuses the formula of the rectangle through inheritance and only changes the name, so there is no duplicated math, and the overridden getter type shows that a subclass may also change the behaviour it inherits.',
      'Базовый класс задаёт контракт: у любой фигуры есть тип и площадь, поэтому коду, который работает с фигурой, всё равно, какая это фигура. Базовый area бросает исключение, потому что фигура без формулы не может притвориться, что у неё есть площадь, и каждый конкретный подкласс его заменяет. Полиморфизм и делает рабочим цикл в конце: в массиве лежат три разных класса, но вызов shape.area() для каждого элемента уходит в свою реализацию, поэтому код клиента написан один раз. Square переиспользует формулу прямоугольника через наследование и меняет только имя, поэтому математика не дублируется, а переопределённый геттер type показывает, что подкласс может изменить и унаследованное поведение.'
    ),
  },
  {
    id: 'topic-oop-3',
    moduleId: 'oop',
    topic: 'oop',
    level: 'basic',
    title: L('Swap the pricing algorithm with a strategy', 'Менять алгоритм расчёта цены стратегией'),
    brief: L(
      'A cart must support different pricing rules without changing the cart itself. Define a strategy as an object with a single method apply(subtotal, items) that returns the final price. Write three strategies: FlatPrice returns the subtotal, PercentOffPrice(rate) subtracts the given percentage, and BuyTwoGetOnePrice gives the cheapest unit of every third item of the same product for free. The class Cart keeps the items and the current strategy, exposes add(item), setStrategy(strategy) and total(), and total() asks the current strategy for the price. A cart with the items { id: "book", price: 20, qty: 2 } and { id: "pen", price: 5, qty: 3 } has a subtotal of 55, gives 49.5 with a PercentOffPrice(10) and 50 with a BuyTwoGetOnePrice.',
      'Корзина должна поддерживать разные правила расчёта цены, не меняя саму корзину. Стратегия — это объект с единственным методом apply(subtotal, items), который возвращает итоговую цену. Напишите три стратегии: FlatPrice возвращает подытог, PercentOffPrice(rate) вычитает заданный процент, а BuyTwoGetOnePrice даёт самую дешёвую единицу каждого третьего товара одного наименования бесплатно. Класс Cart хранит товары и текущую стратегию, предоставляет add(item), setStrategy(strategy) и total(), а total() спрашивает итоговую цену у текущей стратегии. Корзина с товарами { id: "book", price: 20, qty: 2 } и { id: "pen", price: 5, qty: 3 } имеет подытог 55, даёт 49.5 со стратегией PercentOffPrice(10) и 50 со стратегией BuyTwoGetOnePrice.'
    ),
    hint: L(
      'The cart must not contain a single if or switch on the type of the discount. It only holds a reference to an object with the apply method, so a new rule is a new object and not a change in the cart.',
      'В корзине не должно быть ни одного if или switch по виду скидки. Она только держит ссылку на объект с методом apply, поэтому новое правило — это новый объект, а не правка корзины.'
    ),
    solution: `class FlatPrice {
  apply(subtotal) {
    return subtotal;
  }
}

class PercentOffPrice {
  #rate;

  constructor(rate) {
    this.#rate = rate;
  }

  apply(subtotal) {
    return subtotal * (1 - this.#rate / 100);
  }
}

class BuyTwoGetOnePrice {
  apply(subtotal, items) {
    const groups = new Map();

    for (const item of items) {
      const group = groups.get(item.id) || { qty: 0, minPrice: Infinity };
      group.qty += item.qty;
      group.minPrice = Math.min(group.minPrice, item.price);
      groups.set(item.id, group);
    }

    let discount = 0;
    for (const group of groups.values()) {
      discount += Math.floor(group.qty / 3) * group.minPrice;
    }

    return subtotal - discount;
  }
}

class Cart {
  #items = [];
  #strategy;

  constructor(strategy) {
    this.#strategy = strategy;
  }

  add(item) {
    this.#items.push(item);
    return this;
  }

  setStrategy(strategy) {
    this.#strategy = strategy;
    return this;
  }

  get subtotal() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  total() {
    return this.#strategy.apply(this.subtotal, this.#items);
  }
}

const cart = new Cart(new FlatPrice());
cart.add({ id: 'book', price: 20, qty: 2 });
cart.add({ id: 'pen', price: 5, qty: 3 });
console.log(cart.total()); // 55

cart.setStrategy(new PercentOffPrice(10));
console.log(cart.total()); // 49.5

cart.setStrategy(new BuyTwoGetOnePrice());
console.log(cart.total()); // 50`,
    explanation: L(
      'The cart asks a collaborator to make the decision, and the collaborator is any object with an apply method. Because the cart never checks the type of the strategy, a new pricing rule is a new class and nothing else: the open closed principle says the class is open for extension and closed for modification. The strategies are also trivially testable, because apply is a pure function of the subtotal and the items. The buy two get one rule shows why the strategy receives the items and not only the subtotal: the discount depends on the quantity of every product, and a number alone would not carry that information.',
      'Корзина спрашивает у коллеги решение, а коллега — это любой объект с методом apply. Поскольку корзина никогда не проверяет тип стратегии, новое правило расчёта — это новый класс и больше ничего: принцип открытости и закрытости говорит, что класс открыт для расширения и закрыт для изменения. Стратегии заодно тривиально тестируются, потому что apply — чистая функция от подытога и списка товаров. Правило "третий товар бесплатно" показывает, зачем стратегия получает товары, а не только подытог: скидка зависит от количества каждого товара, и одно число эту информацию не несёт.'
    ),
  },
  {
    id: 'topic-oop-4',
    moduleId: 'oop',
    topic: 'oop',
    level: 'intermediate',
    title: L('Hide a raw array behind a repository', 'Спрятать сырой массив за репозиторием'),
    brief: L(
      'A service must not know that the users live in an array. Write the class InMemoryUserRepository that owns a private array of rows, a private counter of the next id, and the methods findAll, findById, create, update and remove, all of them asynchronous and returning promises. create takes the fields of a user without an id, assigns the next id and returns the created row. update changes the fields of an existing row and returns null when there is no such id. remove returns true when the row was deleted and false when there was nothing to delete. Every method must return a copy of the row, so that the caller cannot change the storage from the outside. Then write the service UserService that takes the repository in the constructor and uses only the repository methods.',
      'Сервис не должен знать, что пользователи лежат в массиве. Напишите класс InMemoryUserRepository, который владеет приватным массивом строк, приватным счётчиком следующего id и методами findAll, findById, create, update и remove, причём все они асинхронные и возвращают промисы. create принимает поля пользователя без id, присваивает следующий id и возвращает созданную строку. update меняет поля существующей строки и возвращает null, если такого id нет. remove возвращает true, когда строка удалена, и false, когда удалять было нечего. Каждый метод должен возвращать копию строки, чтобы вызывающий код не мог изменить хранилище снаружи. Затем напишите сервис UserService, который принимает репозиторий в конструкторе и использует только методы репозитория.'
    ),
    hint: L(
      'Copy the rows on the way out with the spread operator, so the storage keeps its own objects. The service depends on the methods of the repository, not on the class, so a database repository can be dropped in later.',
      'Копируйте строки на выходе через оператор расширения, чтобы в хранилище остались его собственные объекты. Сервис зависит от методов репозитория, а не от класса, поэтому позже можно подставить репозиторий на базе данных.'
    ),
    solution: `class InMemoryUserRepository {
  #rows = [];
  #nextId = 1;

  constructor(seed = []) {
    for (const row of seed) {
      this.#rows.push({ ...row });
    }
  }

  async findAll() {
    return this.#rows.map((row) => ({ ...row }));
  }

  async findById(id) {
    const found = this.#rows.find((row) => row.id === id);
    return found ? { ...found } : null;
  }

  async create(data) {
    const row = { id: this.#nextId++, ...data };
    this.#rows.push(row);
    return { ...row };
  }

  async update(id, data) {
    const index = this.#rows.findIndex((row) => row.id === id);
    if (index === -1) {
      return null;
    }
    this.#rows[index] = { ...this.#rows[index], ...data, id };
    return { ...this.#rows[index] };
  }

  async remove(id) {
    const index = this.#rows.findIndex((row) => row.id === id);
    if (index === -1) {
      return false;
    }
    this.#rows.splice(index, 1);
    return true;
  }
}

class UserService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async listActive() {
    const users = await this.#repository.findAll();
    return users.filter((user) => user.active === true);
  }

  async register(name, email) {
    return this.#repository.create({ name, email, active: true });
  }

  async deactivate(id) {
    return this.#repository.update(id, { active: false });
  }

  async delete(id) {
    return this.#repository.remove(id);
  }
}

const repository = new InMemoryUserRepository();
const service = new UserService(repository);

const created = await service.register('Ann', 'ann@example.com');
console.log(created);
console.log(await service.listActive());
await service.deactivate(created.id);
console.log(await service.listActive());`,
    explanation: L(
      'The repository is the only place that knows about the array, and it keeps it in a private field, so the shape of the storage can change without touching anybody else. The copies on the way out matter as much as the privacy of the field: without the spread operator the caller would receive the very object that lives in the storage and could modify it, which would break the guarantee that the repository controls its data. The service is written against the methods of the repository, so a SQL implementation with the same methods can replace the in memory one without a single change in the service. The methods are asynchronous even though the storage is an array, and that is on purpose: the contract of the service is a promise, and the contract does not change when the storage becomes a real database.',
      'Репозиторий — единственное место, которое знает про массив, и он держит его в приватном поле, поэтому форму хранилища можно менять, не трогая никого больше. Копии на выходе важны не меньше приватности поля: без оператора расширения вызывающий код получил бы тот самый объект, что лежит в хранилище, и мог бы его изменить, что сломало бы гарантию, что данными управляет репозиторий. Сервис написан против методов репозитория, поэтому реализация на SQL с теми же методами заменит реализацию в памяти без единого изменения в сервисе. Методы асинхронные, хотя хранилище — это массив, и это сделано намеренно: контракт сервиса это промис, и контракт не изменится, когда хранилищем станет настоящая база.'
    ),
  },
  {
    id: 'topic-oop-5',
    moduleId: 'oop',
    topic: 'oop',
    level: 'intermediate',
    title: L('A tiny event emitter', 'Минимальный эмиттер событий'),
    brief: L(
      'Write a class Emitter with a private map of handlers. The method on(event, handler) registers a handler and returns a function that unsubscribes it again. The method once(event, handler) registers a handler that is removed right after the first call. The method off(event, handler) removes a handler and returns true when something was removed. The method emit(event, payload) calls every handler of the event with the payload, returns the number of handlers that were called, and never lets an exception of one handler break the others: collect the error and rethrow it after all the handlers have run. The method listenerCount(event) returns the number of handlers of the event. A handler of the event "all" receives every event.',
      'Напишите класс Emitter с приватной картой обработчиков. Метод on(event, handler) регистрирует обработчик и возвращает функцию, которая его отписывает. Метод once(event, handler) регистрирует обработчик, который удаляется сразу после первого вызова. Метод off(event, handler) удаляет обработчик и возвращает true, если что-то было удалено. Метод emit(event, payload) вызывает все обработчики события с payload, возвращает число вызванных обработчиков и никогда не даёт исключению одного обработчика сломать остальные: соберите ошибку и перебросьте её после того, как отработали все обработчики. Метод listenerCount(event) возвращает количество обработчиков события. Обработчик события "all" получает любое событие.'
    ),
    hint: L(
      'A Map of arrays of handlers is enough. To implement once, wrap the handler in a function that removes itself before calling the original.',
      'Достаточно карты массивов обработчиков. Чтобы реализовать once, оберните обработчик в функцию, которая удаляет себя перед вызовом исходной.'
    ),
    solution: `class Emitter {
  #handlers = new Map();

  on(event, handler) {
    const list = this.#handlers.get(event) || [];
    list.push(handler);
    this.#handlers.set(event, list);
    return () => this.off(event, handler);
  }

  once(event, handler) {
    const wrapper = (payload) => {
      this.off(event, wrapper);
      handler(payload);
    };
    return this.on(event, wrapper);
  }

  off(event, handler) {
    const list = this.#handlers.get(event);
    if (!list) {
      return false;
    }
    const index = list.indexOf(handler);
    if (index === -1) {
      return false;
    }
    list.splice(index, 1);
    if (list.length === 0) {
      this.#handlers.delete(event);
    }
    return true;
  }

  listenerCount(event) {
    return (this.#handlers.get(event) || []).length;
  }

  emit(event, payload) {
    const list = [...(this.#handlers.get(event) || []), ...(this.#handlers.get('all') || [])];
    let called = 0;
    let failure = null;

    for (const handler of list) {
      called += 1;
      try {
        handler(payload);
      } catch (error) {
        failure = failure || error;
      }
    }

    if (failure) {
      throw failure;
    }
    return called;
  }
}

const emitter = new Emitter();
const stop = emitter.on('ping', (payload) => console.log('ping', payload));
emitter.once('ping', (payload) => console.log('once', payload));
emitter.on('all', (payload) => console.log('all', payload));

emitter.emit('ping', 1);
emitter.emit('ping', 2);
console.log(emitter.listenerCount('ping')); // 1
stop();
console.log(emitter.listenerCount('ping')); // 0`,
    explanation: L(
      'The emitter keeps a map from an event name to the list of its handlers, and every method is a small operation on that map. The copy of the list made in emit protects the iteration: a handler that subscribes or unsubscribes during the call must not change the list that is being walked. The try and catch around every handler is what makes the emitter predictable, because one broken listener cannot silently swallow the events of the others, and the first error is rethrown after all the listeners have run, so no listener is skipped. The once helper removes the wrapper before it calls the handler, so a second emission of the same event does not reach it.',
      'Эмиттер держит карту от имени события к списку его обработчиков, и каждый метод — небольшая операция над этой картой. Копия списка в emit защищает обход: обработчик, который подписывается или отписывается во время вызова, не должен менять список, по которому идёт обход. Try и catch вокруг каждого обработчика делают эмиттер предсказуемым, потому что один сломанный слушатель не может молча проглотить события остальных, а первая ошибка перебрасывается после того, как отработали все слушатели, так что ни один не будет пропущен. Хелпер once удаляет обёртку до вызова обработчика, поэтому второе событие до него уже не дойдёт.'
    ),
  },
  {
    id: 'topic-oop-6',
    moduleId: 'oop',
    topic: 'oop',
    level: 'advanced',
    title: L('A decorator that logs the calls', 'Декоратор, логирующий вызовы'),
    brief: L(
      'Write a decorator that prints every call of the decorated method: the name of the method, its arguments and its result. The decorator must have the shape of a method decorator, that is the function (target, propertyKey, descriptor), it must keep a reference to the original method from the descriptor, and it must replace descriptor.value with a function that logs, calls the original with the same this and the same arguments, and returns the result. Also write the simpler version for plain functions, a wrapper that takes a function and returns a new function with the same behaviour. Apply the decorator to the method total of the class Order and to the plain function calculateShipping. The file must run in plain Node without a transpiler, so apply the method decorator manually with Object.defineProperty and Object.getOwnPropertyDescriptor; in TypeScript the same decorator is written above the method as @logged("order").',
      'Напишите декоратор, который печатает каждый вызов декорируемого метода: имя метода, его аргументы и результат. Декоратор должен иметь форму декоратора метода, то есть функцию (target, propertyKey, descriptor), он должен сохранить ссылку на исходный метод из descriptor и заменить descriptor.value функцией, которая логирует, вызывает исходный метод с тем же this и теми же аргументами и возвращает результат. Напишите также простую версию для обычных функций: обёртку, которая принимает функцию и возвращает новую с тем же поведением. Примените декоратор к методу total класса Order и к обычной функции calculateShipping. Файл должен запускаться в обычном Node без транспилятора, поэтому примените декоратор метода вручную через Object.defineProperty и Object.getOwnPropertyDescriptor; в TypeScript тот же декоратор пишется над методом как @logged("order").'
    ),
    hint: L(
      'A decorator is a function that receives the target, the key of the property and its descriptor, and returns a new descriptor. The original method is always reachable through descriptor.value before you replace it.',
      'Декоратор — это функция, которая получает target, ключ свойства и его descriptor и возвращает новый descriptor. Исходный метод всегда доступен через descriptor.value до того, как вы его замените.'
    ),
    solution: `function logged(label) {
  return function (target, propertyKey, descriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args) {
      const shown = args.map((arg) => JSON.stringify(arg)).join(', ');
      console.log('[' + label + '] call ' + propertyKey + '(' + shown + ')');
      const result = original.apply(this, args);
      console.log('[' + label + '] return ' + propertyKey + ' ->', result);
      return result;
    };

    return descriptor;
  };
}

function withLogging(fn, label = fn.name) {
  return function (...args) {
    const shown = args.map((arg) => JSON.stringify(arg)).join(', ');
    console.log('[' + label + '] call ' + shown);
    const result = fn.apply(this, args);
    console.log('[' + label + '] return ->', result);
    return result;
  };
}

class Order {
  #items;

  constructor(items) {
    this.#items = items;
  }

  total() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }
}

// In TypeScript the same decorator is written above the method as @logged('order').
Object.defineProperty(
  Order.prototype,
  'total',
  logged('order')(Order.prototype, 'total', Object.getOwnPropertyDescriptor(Order.prototype, 'total'))
);

const calculateShipping = withLogging(function (weight) {
  return weight * 3;
}, 'shipping');

const order = new Order([{ price: 10 }, { price: 15 }]);
order.total();
calculateShipping(2);`,
    explanation: L(
      'A decorator is a function that receives the target, the key of the property and the descriptor of the property, and returns a descriptor. Because the decorator receives the descriptor and not the value, it can read the original method before it replaces it, and it can keep everything else about the property, such as the writability. The wrapper calls the original with original.apply(this, args), so the method keeps its own this and its arguments, and the wrapper returns the result unchanged, which means the decorated method still behaves exactly like the original one, only with a trace around it. The two versions differ only in the plumbing: the method decorator receives the descriptor, while the plain function decorator simply returns a new function.',
      'Декоратор — это функция, которая получает target, ключ свойства и descriptor свойства и возвращает descriptor. Так как декоратор получает descriptor, а не значение, он может прочитать исходный метод до замены и сохранить всё остальное о свойстве, например его записываемость. Обёртка вызывает исходный метод через original.apply(this, args), поэтому метод сохраняет свой this и свои аргументы, а обёртка возвращает результат без изменений, то есть декорированный метод ведёт себя точно как исходный, просто с трассировкой вокруг. Две версии отличаются только обвязкой: декоратор метода получает descriptor, а декоратор обычной функции просто возвращает новую функцию.'
    ),
  },
  {
    id: 'topic-oop-7',
    moduleId: 'oop',
    topic: 'oop',
    level: 'advanced',
    title: L('A value object for money', 'Объект-значение для денег'),
    brief: L(
      'Write a class Money that cannot be invalid. The constructor takes the amount as an integer number of minor units, for example 1250 for 12.50, and the currency code as a three letter string, and it throws an Error when the amount is not an integer or is negative, or when the currency is not three letters. Add the getters amount and currency, the method add(other) that returns a new Money with the summed amount and throws an Error when the currencies differ, the method multiply(factor) that returns a new Money with the multiplied amount, the method equals(other) that compares both the amount and the currency, and a toString that returns the amount with two decimals and the currency, for example "12.50 EUR". A static method zero(currency) returns a Money with the amount 0.',
      'Напишите класс Money, который не может быть неправильным. Конструктор принимает сумму целым числом в минорных единицах, например 1250 для 12.50, и код валюты из трёх букв, и бросает Error, если сумма не целая или отрицательная, а также если код валюты не из трёх букв. Добавьте геттеры amount и currency, метод add(other), который возвращает новый Money с суммированной суммой и бросает Error при разных валютах, метод multiply(factor), который возвращает новый Money с умноженной суммой, метод equals(other), который сравнивает и сумму, и валюту, и toString, который возвращает сумму с двумя знаками и валюту, например "12.50 EUR". Статический метод zero(currency) возвращает Money с нулевой суммой.'
    ),
    hint: L(
      'A value object is immutable: every operation returns a new object and never changes the old one. Store the amount in minor units, so that the arithmetic stays in integers and the rounding never appears.',
      'Объект-значение неизменяем: каждая операция возвращает новый объект и никогда не меняет старый. Храните сумму в минорных единицах, чтобы арифметика оставалась целочисленной и округление не появлялось.'
    ),
    solution: `class Money {
  #amount;
  #currency;

  constructor(amount, currency) {
    if (!Number.isInteger(amount)) {
      throw new Error('Amount must be an integer number of minor units');
    }
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error('Currency must be a three letter code');
    }
    this.#amount = amount;
    this.#currency = currency;
  }

  static zero(currency) {
    return new Money(0, currency);
  }

  get amount() {
    return this.#amount;
  }

  get currency() {
    return this.#currency;
  }

  add(other) {
    if (other.currency !== this.#currency) {
      throw new Error('Cannot add ' + this.#currency + ' to ' + other.currency);
    }
    return new Money(this.#amount + other.amount, this.#currency);
  }

  subtract(other) {
    if (other.currency !== this.#currency) {
      throw new Error('Cannot subtract ' + other.currency + ' from ' + this.#currency);
    }
    if (other.amount > this.#amount) {
      throw new Error('Not enough money');
    }
    return new Money(this.#amount - other.amount, this.#currency);
  }

  multiply(factor) {
    return new Money(Math.round(this.#amount * factor), this.#currency);
  }

  equals(other) {
    return other instanceof Money && other.amount === this.#amount && other.currency === this.#currency;
  }

  toString() {
    return (this.#amount / 100).toFixed(2) + ' ' + this.#currency;
  }
}

const price = new Money(1250, 'EUR');
const tax = new Money(230, 'EUR');

console.log(price.add(tax).toString()); // 14.80 EUR
console.log(price.multiply(1.2).toString()); // 15.00 EUR
console.log(price.equals(new Money(1250, 'EUR'))); // true
console.log(price.equals(new Money(1250, 'USD'))); // false
console.log(Money.zero('EUR').toString()); // 0.00 EUR`,
    explanation: L(
      'The class takes the amount in minor units, so the arithmetic stays in integers and no rounding error can creep into the middle of a calculation. The constructor is the only place that validates, so every Money object that exists is valid, and add, subtract and multiply are safe by construction because they always go through the constructor. The class is immutable: the fields are private, there are no setters, and every operation returns a new object, so a Money can be shared and passed around without the risk that somebody changes it. The equals method compares the value and not the identity, which is what a value object needs, and the currency check in add and subtract refuses to mix euros and dollars instead of silently producing a meaningless number.',
      'Класс принимает сумму в минорных единицах, поэтому арифметика остаётся целочисленной и ошибка округления не может затесаться в середину расчёта. Проверки живут только в конструкторе, значит любой существующий Money валиден, а add, subtract и multiply безопасны по построению, потому что всегда проходят через конструктор. Класс неизменяем: поля приватные, сеттеров нет, каждая операция возвращает новый объект, поэтому Money можно свободно передавать и разделять, не опасаясь, что его кто-то изменит. Метод equals сравнивает значение, а не идентичность, и это именно то, что нужно объекту-значению, а проверка валюты в add и subtract отказывается складывать евро с долларами вместо того, чтобы молча получить бессмысленное число.'
    ),
  },
  {
    id: 'topic-oop-8',
    moduleId: 'oop',
    topic: 'oop',
    level: 'advanced',
    title: L('A registry of plugins', 'Реестр плагинов'),
    brief: L(
      'Write a class PluginRegistry that keeps the plugins in a private map. The method register(name, plugin) adds a plugin and throws an Error when the name is already taken. The method unregister(name) removes the plugin and returns true or false. The method get(name) returns the plugin or undefined. The method has(name) returns a boolean. The method list() returns the names in the order of registration. The method run(context) calls the run method of every plugin in the order of registration and returns an array of the results, where every result is an object with the name of the plugin and its value. A plugin that throws must not stop the others: collect the error in the result as the field error and continue.',
      'Напишите класс PluginRegistry, который хранит плагины в приватной карте. Метод register(name, plugin) добавляет плагин и бросает Error, если имя уже занято. Метод unregister(name) удаляет плагин и возвращает true или false. Метод get(name) возвращает плагин или undefined. Метод has(name) возвращает булево значение. Метод list() возвращает имена в порядке регистрации. Метод run(context) вызывает метод run у каждого плагина в порядке регистрации и возвращает массив результатов, где каждый результат — объект с именем плагина и его значением. Плагин, который бросил исключение, не должен останавливать остальные: соберите ошибку в результат в поле error и продолжайте.'
    ),
    hint: L(
      'A Map keeps the insertion order, so list() can return the keys directly. Wrap the call of every plugin in a try and catch to build a result object for both the success and the failure case.',
      'Map сохраняет порядок вставки, поэтому list() может вернуть ключи напрямую. Оберните вызов каждого плагина в try и catch, чтобы собрать объект результата и для успеха, и для ошибки.'
    ),
    solution: `class PluginRegistry {
  #plugins = new Map();

  register(name, plugin) {
    if (this.#plugins.has(name)) {
      throw new Error('Plugin already registered: ' + name);
    }
    this.#plugins.set(name, plugin);
    return this;
  }

  unregister(name) {
    return this.#plugins.delete(name);
  }

  get(name) {
    return this.#plugins.get(name);
  }

  has(name) {
    return this.#plugins.has(name);
  }

  list() {
    return [...this.#plugins.keys()];
  }

  run(context) {
    const results = [];

    for (const [name, plugin] of this.#plugins) {
      try {
        results.push({ name, value: plugin.run(context) });
      } catch (error) {
        results.push({ name, error: error.message });
      }
    }

    return results;
  }
}

const registry = new PluginRegistry();

registry.register('upper', {
  run: (context) => context.text.toUpperCase(),
});

registry.register('boom', {
  run: () => {
    throw new Error('plugin failed');
  },
});

registry.register('exclaim', {
  run: (context) => context.text + '!',
});

console.log(registry.list()); // [ 'upper', 'boom', 'exclaim' ]
console.log(registry.run({ text: 'hello' }));
console.log(registry.has('upper')); // true`,
    explanation: L(
      'A Map is the right container here, because it keeps the insertion order, so the plugins always run in the order they were registered, and the name is the key that makes the lookup cheap. The register method refuses a duplicate name, so two plugins cannot silently replace each other and break the order of the others. The run method builds a result object for every plugin instead of returning raw values, which lets the caller see which plugin produced which result. The try and catch inside the loop is what makes the registry robust: a broken plugin becomes one failed result, the remaining plugins still run, and the caller receives the full picture and can decide what to do with the error.',
      'Map подходит здесь лучше всего, потому что он сохраняет порядок вставки, поэтому плагины всегда выполняются в порядке регистрации, а имя служит ключом и даёт быстрый поиск. Метод register отказывает в дубликате имени, поэтому два плагина не могут молча заменить друг друга и сломать порядок остальных. Метод run собирает объект результата для каждого плагина вместо того, чтобы возвращать голые значения, и благодаря этому вызывающий код видит, какой плагин какой результат дал. Try и catch внутри цикла делают реестр устойчивым: сломанный плагин превращается в один неуспешный результат, остальные плагины всё равно выполняются, а вызывающий код получает полную картину и решает, что делать с ошибкой.'
    ),
  },
];
