import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the functions topic. */
export const functionsCases: Record<string, TaskCaseInput[]> = {
  'topic-functions-1': [
    { fn: 'cartTotal', input: '[{ name: "pen", price: 10, qty: 2 }, { name: "book", price: 3, qty: 3 }]' },
    { fn: 'cartTotal', input: '[]' },
    { fn: 'cartTotal', input: '[{ name: "apple", price: 2.5, qty: 4 }]' },
    { fn: 'cartTotal', input: '[{ name: "refund", price: -5, qty: 2 }]' },
  ],
  'topic-functions-2': [
    { fn: 'joinParts', input: '"fruits", "apple", "pear"' },
    { fn: 'joinParts', input: '"numbers"' },
    { fn: 'joinParts', input: 'undefined, "x"' },
    { fn: 'joinParts', input: '"a", "b"' },
  ],
  'topic-functions-4': [
    { fn: 'once', input: '() => 42', expect: 'result()' },
    { fn: 'once', input: '(a, b) => a + b', expect: 'result(2, 3)' },
    { fn: 'once', input: '() => 42', expect: 'result() + "," + result()' },
  ],
  'topic-functions-5': [
    { fn: 'curry', input: '(a, b, c) => a + b + c', expect: 'result(1)(2)(3)' },
    { fn: 'curry', input: '(a, b, c) => a + b + c', expect: 'result(1, 2)(3)' },
    { fn: 'curry', input: '(a, b) => a * b', expect: 'result(3)(4)' },
  ],
  'topic-functions-6': [
    { fn: 'memoize', input: '(a, b) => a + b', expect: 'result(2, 3)' },
    { fn: 'memoize', input: '(a, b) => a + b', expect: 'result(2, 3) + "," + result(2, 3)' },
    { fn: 'memoize', input: '(a) => a * 2', expect: 'result(5)' },
  ],
  'topic-functions-7': [
    { fn: 'compose', input: '(x) => x + 1, (x) => x * 2', expect: 'result(5)' },
    { fn: 'pipe', input: '(x) => x + 1, (x) => x * 2', expect: 'result(5)' },
    { fn: 'compose', input: '(x) => x * 3', expect: 'result(2)' },
  ],
  'topic-functions-8': [
    { fn: 'factorial', input: '5' },
    { fn: 'factorial', input: '0' },
    { fn: 'factorial', input: '1' },
    { fn: 'fib', input: '10' },
    { fn: 'fib', input: '30' },
    { fn: 'fib', input: '0' },
  ],
};
