import type { PracticeTask } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const testingTasks: PracticeTask[] = [
  {
    id: 'topic-testing-1',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'basic',
    title: L('Unit test for a pure function', 'Юнит-тест чистой функции'),
    brief: L(
      'Write the function slugify(title) and a test file for it. The function turns a title into a slug: it lowercases the title, trims it, replaces every run of characters that are not letters or digits with a single dash, and removes the dashes at the start and at the end. The result of an empty title is an empty string. The test file must import describe, it and expect from vitest, group the tests in a describe block named "slugify", and contain three separate it blocks: one for a title with spaces, one for a title with punctuation, and one for an empty title. Example: slugify("Hello World") returns "hello-world", slugify("Hello, World!") returns "hello-world", slugify("  --Hello--  ") returns "hello".',
      'Напишите функцию slugify(title) и тестовый файл для неё. Функция превращает заголовок в слаг: приводит его к нижнему регистру, обрезает пробелы, заменяет любую последовательность символов, кроме букв и цифр, одним дефисом и убирает дефисы в начале и в конце. Результат пустого заголовка — пустая строка. Тестовый файл должен импортировать describe, it и expect из vitest, группировать проверки в блоке describe с именем "slugify" и содержать три отдельных блока it: один для заголовка с пробелами, один для заголовка с пунктуацией и один для пустого заголовка. Пример: slugify("Hello World") возвращает "hello-world", slugify("Hello, World!") возвращает "hello-world", slugify("  --Hello--  ") возвращает "hello".'
    ),
    hint: L(
      'One describe block per function, one it block per behaviour, and one expect per it block. The name of an it block is the specification, so it should read as a sentence.',
      'Один блок describe на функцию, один блок it на поведение и одно expect на блок it. Имя блока it — это спецификация, поэтому читается как предложение.'
    ),
    solution: `// --- src/slugify.test.ts ---
import { describe, expect, it } from 'vitest';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

describe('slugify', () => {
  it('joins the words with a dash', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces punctuation with a dash', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('returns an empty string for an empty title', () => {
    expect(slugify('')).toBe('');
  });
});`,
    explanation: L(
      'A test file is a small program that states a fact about the code, and the structure of vitest mirrors that: describe is the group of related facts, it is one fact, and expect is the check that decides whether the fact holds. The name of the it block is part of the specification, so "joins the words with a dash" tells a reader what is guaranteed, while the assertion says how it is measured. The three cases are chosen on purpose: a normal case, a case with unusual input, and a boundary case with the empty string. Testing a pure function like this is fast, needs no setup and fails with a message that points at the exact behaviour that broke.',
      'Тестовый файл — маленькая программа, утверждающая факт о коде, и структура vitest это отражает: describe это группа связанных фактов, it — один факт, а expect — проверка, решающая, держится ли факт. Имя блока it часть спецификации, поэтому «joins the words with a dash» говорит читателю, что гарантируется, а утверждение показывает, как это измеряется. Три случая выбраны намеренно: обычный, случай с необычным вводом и граничный случай с пустой строкой. Тестирование такой чистой функции быстрое, не требует подготовки и падает с сообщением, указывающим на точное сломанное поведение.'
    ),
  },
  {
    id: 'topic-testing-2',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'basic',
    title: L('Table driven parametrized test', 'Табличный параметризованный тест'),
    brief: L(
      'Write a test that checks many cases of the same function with one parametrized block. The function add(a, b) returns the sum of two numbers. The test must use it.each with a table of rows, where every row holds the two operands and the expected result, and it must run the same assertion for every row. Use the printf placeholders of vitest in the title of the test, so the title of a row mentions the two operands and the expected sum. Example: the table contains the rows [1, 2, 3], [0, 0, 0], [-4, 4, 0] and [2.5, 0.5, 3], and the assertion inside the test body is expect(add(a, b)).toBe(expected).',
      'Напишите тест, который проверяет много случаев одной функции одним параметризованным блоком. Функция add(a, b) возвращает сумму двух чисел. Тест должен использовать it.each с таблицей строк, где в каждой строке лежат два операнда и ожидаемый результат, и выполнять одно и то же утверждение для каждой строки. Используйте плейсхолдеры printf из vitest в названии теста, чтобы в названии строки были видны оба операнда и ожидаемая сумма. Пример: таблица содержит строки [1, 2, 3], [0, 0, 0], [-4, 4, 0] и [2.5, 0.5, 3], а утверждение внутри тела теста — expect(add(a, b)).toBe(expected).'
    ),
    hint: L(
      'Pass the array of rows directly to it.each and read the placeholders %i for the numbers in the title. Each row becomes a separate test case.',
      'Передайте массив строк прямо в it.each и используйте плейсхолдеры %i для чисел в названии. Каждая строка становится отдельным тест-кейсом.'
    ),
    solution: `import { describe, expect, it } from 'vitest';

function add(a: number, b: number): number {
  return a + b;
}

describe('add', () => {
  it.each([
    [1, 2, 3],
    [0, 0, 0],
    [-4, 4, 0],
    [2.5, 0.5, 3],
  ])('adds %i and %i to get %i', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });
});`,
    explanation: L(
      'it.each turns every row of the table into a separate test case, so a failure names the exact row that broke instead of a generic message. The printf placeholders in the title are filled from the row values, which makes the report readable without opening the source. The data and the expectation are separated, so adding a case never means copying a test block. A table is also a good place for the awkward values: zero, negative numbers and fractions catch the mistakes that a single happy-path example hides.',
      'it.each превращает каждую строку таблицы в отдельный тест-кейс, поэтому при падении сообщение называет именно сломанную строку, а не что-то общее. Плейсхолдеры printf в названии подставляются из значений строки, благодаря чему отчёт читается без открытия исходника. Данные отделены от ожидания, поэтому добавление случая не означает копирования блока теста. Таблица — хорошее место и для неудобных значений: ноль, отрицательные числа и дробные части ловят ошибки, которые скрывает единственный «счастливый» пример.'
    ),
  },
  {
    id: 'topic-testing-3',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'basic',
    title: L('Test the error path of an async function', 'Тест ветки с ошибкой асинхронной функции'),
    brief: L(
      'Write tests for both paths of the async function loadUser(id), which resolves with the object { id } for the id "1" and rejects with an Error whose message is "User <id> not found" for any other id. The test must use the async assertions of vitest: resolves and rejects. The success case checks the resolved value with toEqual, the error case checks the message with toThrow. Both tests must await the assertion. Example: the test of loadUser("1") expects the value { id: "1" }, and the test of loadUser("99") expects the error message "User 99 not found".',
      'Напишите тесты для обеих веток асинхронной функции loadUser(id), которая для id "1" разрешается с объектом { id }, а для любого другого id отклоняется с Error, у которого сообщение "User <id> not found". Тест должен использовать асинхронные утверждения vitest: resolves и rejects. Успешный случай проверяет разрешённое значение через toEqual, а случай с ошибкой — сообщение через toThrow. Оба теста должны ожидать утверждение через await. Пример: тест loadUser("1") ожидает значение { id: "1" }, а тест loadUser("99") — сообщение об ошибке "User 99 not found".'
    ),
    hint: L(
      'await expect(promise).resolves.toEqual(value) and await expect(promise).rejects.toThrow("message") check both paths without a try/catch.',
      'await expect(promise).resolves.toEqual(value) и await expect(promise).rejects.toThrow("message") проверяют обе ветки без try/catch.'
    ),
    solution: `import { describe, expect, it } from 'vitest';

async function loadUser(id: string): Promise<{ id: string }> {
  if (id !== '1') {
    throw new Error('User ' + id + ' not found');
  }

  return { id };
}

describe('loadUser', () => {
  it('resolves with the user for a known id', async () => {
    await expect(loadUser('1')).resolves.toEqual({ id: '1' });
  });

  it('rejects with a message for an unknown id', async () => {
    await expect(loadUser('99')).rejects.toThrow('User 99 not found');
  });
});`,
    explanation: L(
      'The error path of an async function is the part that breaks silently in production, because the promise simply stops resolving and the caller waits forever. The rejects assertion makes that path a first class citizen of the suite. The resolves and rejects helpers return a promise that has to be awaited, otherwise the test finishes before the assertion is checked and the failure is reported in the wrong test. The message is checked with toThrow and a string, which is a substring match, so the test does not break when the message later gains a prefix.',
      'Ветка с ошибкой асинхронной функции — та часть, которая тихо ломается в продакшене: промис просто перестаёт разрешаться, и вызывающий ждёт вечно. Утверждение rejects делает эту ветку полноправной частью набора тестов. Хелперы resolves и rejects возвращают промис, который нужно ожидать через await, иначе тест завершится раньше, чем утверждение будет проверено, и ошибка попадёт не в тот тест. Сообщение проверяется через toThrow со строкой, а это проверка подстроки, поэтому тест не сломается, когда позже сообщение получит префикс.'
    ),
  },
  {
    id: 'topic-testing-4',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'intermediate',
    title: L('Mock a fetch call', 'Мок вызова fetch'),
    brief: L(
      'Write a test for the function getUser(id), which requests the address https://api.example.com/users/<id>, throws an Error with the message "Request failed" when the response is not ok, and otherwise returns the parsed body. In the test, replace the global fetch with a mock created by vi.fn and installed with vi.stubGlobal, and restore the original fetch afterwards with vi.unstubAllGlobals in an afterEach block. The mock must resolve with an object that has ok set to true and a json method that returns the body { id: 1, name: "Ann" }. The test must check the returned value and check that fetch was called with the address of the user. Example: the mock is called as fetchMock and the assertion on the call is expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/users/1").',
      'Напишите тест для функции getUser(id), которая запрашивает адрес https://api.example.com/users/<id>, выбрасывает Error с сообщением "Request failed", когда ответ не ok, и иначе возвращает разобранное тело. В тесте замените глобальный fetch моком, созданным через vi.fn и установленным через vi.stubGlobal, а после теста восстановите исходный fetch через vi.unstubAllGlobals в блоке afterEach. Мок должен разрешаться с объектом, у которого ok равно true и есть метод json, возвращающий тело { id: 1, name: "Ann" }. Тест должен проверить возвращённое значение и проверить, что fetch был вызван с адресом пользователя. Пример: мок называется fetchMock, а проверка вызова — expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/users/1").'
    ),
    hint: L(
      'vi.stubGlobal("fetch", mock) replaces the global for the duration of the test, and vi.unstubAllGlobals() in afterEach puts the original one back so the other tests are not affected.',
      'vi.stubGlobal("fetch", mock) заменяет глобальный на время теста, а vi.unstubAllGlobals() в afterEach возвращает исходный, чтобы остальные тесты не пострадали.'
    ),
    solution: `import { afterEach, describe, expect, it, vi } from 'vitest';

interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  const response = await fetch('https://api.example.com/users/' + id);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return (await response.json()) as User;
}

describe('getUser', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the user from the response body', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: 'Ann' }),
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(getUser(1)).resolves.toEqual({ id: 1, name: 'Ann' });
    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  it('throws when the response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getUser(1)).rejects.toThrow('Request failed');
  });
});`,
    explanation: L(
      'A unit test must not touch the network, so the boundary is replaced with a mock that answers instantly and behaves exactly like the real thing for the case under test. vi.stubGlobal swaps the global fetch for the duration of the test, and the cleanup in afterEach puts the original back, so the mock cannot leak into the next test. The mock is a function, so it also records the calls, and toHaveBeenCalledWith checks the exact address that the code built, which catches a wrong id in the url. The second test shows the point of the mock: the error branch is now reachable without arranging a real server failure.',
      'Юнит-тест не должен ходить в сеть, поэтому граница подменяется моком, который отвечает мгновенно и ведёт себя как настоящая ровно в проверяемом случае. vi.stubGlobal меняет глобальный fetch на время теста, а уборка в afterEach возвращает исходный, чтобы мок не утекал в следующий тест. Мок — это функция, поэтому она ещё и записывает вызовы, а toHaveBeenCalledWith проверяет точный адрес, который собрал код, и ловит неверный id в url. Второй тест показывает смысл мока: ветку с ошибкой теперь можно получить без настоящего сбоя сервера.'
    ),
  },
  {
    id: 'topic-testing-5',
    moduleId: 'react',
    topic: 'testing',
    level: 'intermediate',
    title: L('Test a React component', 'Тест React-компонента'),
    brief: L(
      'Write a test for the Counter component, which renders a button with the text "Count: 0" and increases the counter by one on every click. Use render to put the component on the page, screen to find the button by its role, and fireEvent to click it. The test must check the text before the click and after the click, and it must find the button with getByRole("button", { name: /count: 0/i }) rather than by a class name or a test id. Do not use snapshot files. Example: after the click the button with the accessible name matching /count: 1/i must be found and its text must contain "Count: 1".',
      'Напишите тест для компонента Counter, который рисует кнопку с текстом "Count: 0" и увеличивает счётчик на единицу при каждом клике. Используйте render, чтобы вывести компонент на страницу, screen, чтобы найти кнопку по её роли, и fireEvent, чтобы по ней кликнуть. Тест должен проверять текст до клика и после клика и должен находить кнопку через getByRole("button", { name: /count: 0/i }), а не по имени класса или тест-айдентификатору. Файлы снимков не используйте. Пример: после клика должна находиться кнопка с доступным именем, совпадающим с /count: 1/i, и её текст должен содержать "Count: 1".'
    ),
    hint: L(
      'Query by role and by accessible name, because that is how a user finds the element. The name of the button is its text, so the regular expression /count: 0/i matches it.',
      'Ищите по роли и доступному имени, потому что именно так элемент находит пользователь. Имя кнопки — её текст, поэтому регулярное выражение /count: 0/i совпадает с ним.'
    ),
    solution: `// --- src/Counter.tsx ---
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}

// --- src/Counter.test.tsx ---
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increases the counter when the button is clicked', () => {
    render(<Counter />);

    const button = screen.getByRole('button', { name: /count: 0/i });
    expect(button.textContent).toContain('Count: 0');

    fireEvent.click(button);

    expect(screen.getByRole('button', { name: /count: 1/i }).textContent).toContain('Count: 1');
  });
});`,
    explanation: L(
      'Testing Library is built around the idea that the user does not know the implementation, so the test queries the rendered page the way a person would: by role and by visible name. A test that finds the button by its class name breaks as soon as the markup is restyled, while a test that finds it by role keeps working. fireEvent.click simulates the click and lets React run its state update, so after it the accessible name of the button has changed and the new query finds it. Snapshots are avoided on purpose: a snapshot records the markup and then fails on every cosmetic change, while a check of the text states what the user must see.',
      'Testing Library построен на идее, что пользователь не знает деталей реализации, поэтому тест обращается к отрисованной странице так, как обращался бы человек: по роли и по видимому имени. Тест, который находит кнопку по имени класса, ломается при первом же переоформлении, а тест по роли продолжает работать. fireEvent.click имитирует нажатие и позволяет React выполнить обновление состояния, поэтому после него доступное имя кнопки меняется и новый запрос находит её. Снимки не используются намеренно: снимок фиксирует разметку и падает при любом косметическом изменении, а проверка текста формулирует, что именно пользователь должен увидеть.'
    ),
  },
  {
    id: 'topic-testing-6',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'advanced',
    title: L('Cover every branch of a function', 'Покрытие всех ветвей функции'),
    brief: L(
      'Write a test suite that covers every branch of the function classifyAge(age), which returns "invalid" for a negative age, "minor" for an age below 18 and "adult" for everything else. The suite must contain at least two it blocks: one that calls the function for all three branches, and one that checks the boundary values 0 and 18. The branch coverage report of the file must show that every if and every else is executed. Example: classifyAge(-1) returns "invalid", classifyAge(10) returns "minor", classifyAge(30) returns "adult", classifyAge(0) returns "minor" and classifyAge(18) returns "adult".',
      'Напишите набор тестов, покрывающий все ветви функции classifyAge(age), которая возвращает "invalid" для отрицательного возраста, "minor" для возраста меньше 18 и "adult" во всех остальных случаях. Набор должен содержать минимум два блока it: один вызывает функцию для всех трёх ветвей, второй проверяет граничные значения 0 и 18. В отчёте о покрытии ветвей файла должно быть видно, что выполнены все if и все else. Пример: classifyAge(-1) возвращает "invalid", classifyAge(10) возвращает "minor", classifyAge(30) возвращает "adult", classifyAge(0) возвращает "minor" и classifyAge(18) возвращает "adult".'
    ),
    hint: L(
      'List the branches as a table of cases in your head first: every condition needs a case where it is true and a case where it is false, and the boundary value belongs to the branch on one side of the comparison.',
      'Сначала представьте ветви как таблицу случаев: у каждого условия нужен случай, где оно истинно, и случай, где оно ложно, а граничное значение принадлежит ветке по одну сторону сравнения.'
    ),
    solution: `import { describe, expect, it } from 'vitest';

function classifyAge(age: number): string {
  if (age < 0) {
    return 'invalid';
  }

  if (age < 18) {
    return 'minor';
  }

  return 'adult';
}

describe('classifyAge', () => {
  it('covers every branch of the function', () => {
    expect(classifyAge(-1)).toBe('invalid');
    expect(classifyAge(10)).toBe('minor');
    expect(classifyAge(30)).toBe('adult');
  });

  it('treats the boundary values as minor and adult', () => {
    expect(classifyAge(0)).toBe('minor');
    expect(classifyAge(18)).toBe('adult');
  });
});`,
    explanation: L(
      'Statement coverage only tells that a line ran, while branch coverage tells that both sides of every condition were taken, and a condition that is never false is usually a missing guard. Each if needs a case where it is true and a case where it is false, so the two conditions of classifyAge need a negative age, an age between 0 and 17, and an adult age. The boundary values deserve their own test because comparisons are where off-by-one bugs live: 0 must be minor and 18 must be adult, so the code cannot use a smaller or a larger comparison by accident. The second it block is also a specification, because it names the exact edge of the rule.',
      'Покрытие операторов говорит только, что строка выполнилась, а покрытие ветвей — что обе стороны каждого условия были taken, и условие, которое никогда не ложно, обычно означает пропущенную проверку. Каждому if нужен случай, где он истинен, и случай, где он ложен, поэтому двум условиям classifyAge нужны отрицательный возраст, возраст между 0 и 17 и взрослый возраст. Граничные значения заслуживают отдельного теста, потому что сравнения — место ошибок на единицу: 0 должен быть minor, а 18 adult, поэтому код не может случайно использовать меньшее или большее сравнение. Второй блок it заодно служит спецификацией, потому что называет точную границу правила.'
    ),
  },
  {
    id: 'topic-testing-7',
    moduleId: 'react',
    topic: 'testing',
    level: 'advanced',
    title: L('Test a component that loads data', 'Тест компонента, который загружает данные'),
    brief: L(
      'Write a test for the UserPanel component, which loads a user in an effect and shows the text "Loading" while the request is running, the text "Hello, <name>" when the data arrives, and the text "Failed to load" when the request fails. In the test, replace the global fetch with a mock that resolves with a json method returning the object { name: "Ann" }, and check the loading text first, then wait for the name to appear with waitFor. Restore the original fetch in an afterEach block. The test must also check that fetch was called with the address https://api.example.com/users/1. Example: the mock is installed with vi.stubGlobal and the waiting is done with await waitFor(() => { expect(screen.getByText("Hello, Ann")).toBeTruthy(); }).',
      'Напишите тест для компонента UserPanel, который в эффекте загружает пользователя и показывает текст "Loading" во время запроса, текст "Hello, <name>" когда данные пришли, и текст "Failed to load" при сбое запроса. В тесте замените глобальный fetch моком, который разрешается с методом json, возвращающим объект { name: "Ann" }, сначала проверьте текст загрузки, затем дождитесь появления имени через waitFor. Восстановите исходный fetch в блоке afterEach. Тест должен также проверить, что fetch был вызван с адресом https://api.example.com/users/1. Пример: мок устанавливается через vi.stubGlobal, а ожидание выполняется через await waitFor(() => { expect(screen.getByText("Hello, Ann")).toBeTruthy(); }).'
    ),
    hint: L(
      'The data arrives after the first render, so the assertion on the name has to wait. waitFor retries the callback until it stops throwing, and the loading text is checked synchronously before that.',
      'Данные приходят после первого рендера, поэтому утверждение по имени должно ждать. waitFor повторяет колбэк, пока тот не перестанет бросать, а текст загрузки проверяется синхронно до этого.'
    ),
    solution: `// --- src/UserPanel.tsx ---
import { useEffect, useState } from 'react';

type Status = 'loading' | 'ready' | 'error';

export function UserPanel({ userId }: { userId: number }) {
  const [status, setStatus] = useState<Status>('loading');
  const [name, setName] = useState('');

  useEffect(() => {
    let active = true;

    fetch('https://api.example.com/users/' + userId)
      .then((response) => response.json())
      .then((data: { name: string }) => {
        if (!active) {
          return;
        }
        setName(data.name);
        setStatus('ready');
      })
      .catch(() => {
        if (active) {
          setStatus('error');
        }
      });

    return () => {
      active = false;
    };
  }, [userId]);

  if (status === 'loading') {
    return <p>Loading</p>;
  }

  if (status === 'error') {
    return <p>Failed to load</p>;
  }

  return <p>Hello, {name}</p>;
}

// --- src/UserPanel.test.tsx ---
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { UserPanel } from './UserPanel';

describe('UserPanel', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the loading text and then the loaded name', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ name: 'Ann' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<UserPanel userId={1} />);

    expect(screen.getByText('Loading')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Hello, Ann')).toBeTruthy();
    });

    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/users/1');
  });
});`,
    explanation: L(
      'The component renders twice: once with the loading state and once with the data, so the test has to observe both. The loading text is checked right after render, while the name does not exist yet and can only be found after the promise resolves, which is why the second assertion waits inside waitFor, which retries the callback until it stops throwing. The mock replaces fetch so the test never touches the network and runs instantly. The active flag in the effect guards against setting the state after the component was unmounted, which is the classic warning about updating an unmounted component in a test.',
      'Компонент рендерится дважды: сначала с состоянием загрузки, затем с данными, поэтому тест должен увидеть оба состояния. Текст загрузки проверяется сразу после render, а имени ещё нет, и его можно найти только после разрешения промиса — поэтому второе утверждение ждёт внутри waitFor, который повторяет колбэк, пока тот не перестанет бросать. Мок подменяет fetch, поэтому тест не ходит в сеть и выполняется мгновенно. Флаг active в эффекте защищает от обновления состояния после размонтирования компонента — это классическое предупреждение об обновлении размонтированного компонента в тестах.'
    ),
  },
  {
    id: 'topic-testing-8',
    moduleId: 'js-core',
    topic: 'testing',
    level: 'advanced',
    title: L('TDD: the failing test first', 'TDD: сначала падающий тест'),
    brief: L(
      'Work through the red-green-refactor cycle for a small utility. First write the test file for the function calculateDiscount(price, percent) that lives in a separate file: the function returns the price with the discount applied, rounded to two decimals, and never returns a value below zero. The test file must contain three it blocks: a price of 100 with 10 percent gives 90, a price of 19.99 with 15 percent gives 16.99, and a price of 10 with 200 percent gives 0. Run the test and see it fail because the module does not exist yet, and only then write the implementation that makes it pass. Example: the first run of the test fails with an error about the missing module, and the second run passes all three cases.',
      'Пройди цикл red-green-refactor на маленькой утилите. Сначала напиши тестовый файл для функции calculateDiscount(price, percent), которая живёт в отдельном файле: функция возвращает цену со скидкой, округлённую до двух знаков, и никогда не возвращает значение меньше нуля. Тестовый файл должен содержать три блока it: цена 100 со скидкой 10 процентов даёт 90, цена 19.99 со скидкой 15 процентов даёт 16.99, цена 10 со скидкой 200 процентов даёт 0. Запусти тест и увидь, что он падает, потому что модуля ещё нет, и только потом напиши реализацию, которая заставит его пройти. Пример: первый запуск теста падает с ошибкой о недостающем модуле, а второй запуск проходит все три случая.'
    ),
    hint: L(
      'The red step is the point of the cycle: the test must fail for the right reason, a missing implementation, not because of a typo in the test itself. Then the green step is the smallest code that passes.',
      'Красный шаг — смысл цикла: тест обязан падать по правильной причине, из-за отсутствующей реализации, а не из-за опечатки в самом тесте. Затем зелёный шаг — самый маленький код, который проходит.'
    ),
    solution: `// --- step 1 (red): src/discount.test.ts ---
import { describe, expect, it } from 'vitest';
import { calculateDiscount } from './discount';

describe('calculateDiscount', () => {
  it('applies a percentage discount', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  it('rounds the result to two decimals', () => {
    expect(calculateDiscount(19.99, 15)).toBe(16.99);
  });

  it('never returns a negative price', () => {
    expect(calculateDiscount(10, 200)).toBe(0);
  });
});

// --- step 2 (green): src/discount.ts ---
export function calculateDiscount(price: number, percent: number): number {
  const discounted = price - (price * percent) / 100;
  return Math.max(0, Math.round(discounted * 100) / 100);
}

// --- step 3 (refactor): the test stays exactly the same ---`,
    explanation: L(
      'TDD inverts the order: the test is the specification, and the code is written to satisfy it. The red step proves two things at once, that the test really runs and that it fails for the expected reason, a missing module, and not because of a mistake in the test. Only then comes the green step, the smallest implementation that makes the test pass, usually a couple of lines, and the refactor step, where the structure is improved while the test keeps passing unchanged. The test never changes during the refactor, so it keeps its value as a specification. In this example the three cases also pin down the two edge cases that are easy to get wrong: the rounding of 16.9915 and the clamp at zero.',
      'TDD меняет порядок: тест — это спецификация, а код пишется под него. Красный шаг доказывает сразу две вещи, что тест действительно выполняется и что падает по ожидаемой причине, из-за недостающего модуля, а не из-за ошибки в самом тесте. Только потом идёт зелёный шаг — минимальная реализация, которая заставляет тест проходить, обычно пара строк, — и шаг рефакторинга, где структура улучшается, а тест продолжает проходить без изменений. Во время рефакторинга тест не меняется, поэтому сохраняет свою ценность как спецификация. В этом примере три случая фиксируют и два граничных, которые легко упустить: округление 16.9915 и обрезку в ноль.'
    ),
  },
];
