import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the loops topic. */
export const loopsCases: Record<string, TaskCaseInput[]> = {
  'topic-loops-1': [
    { fn: 'fizzBuzz', input: '5' },
    { fn: 'fizzBuzz', input: '3' },
    { fn: 'fizzBuzz', input: '15' },
  ],
  'topic-loops-2': [
    { fn: 'sumDigits', input: '1234' },
    { fn: 'sumDigits', input: '905' },
    { fn: 'sumDigits', input: '0' },
    { fn: 'sumDigits', input: '9' },
  ],
  'topic-loops-3': [
    { fn: 'isTriangular', input: '1' },
    { fn: 'isTriangular', input: '6' },
    { fn: 'isTriangular', input: '10' },
    { fn: 'isTriangular', input: '8' },
    { fn: 'isTriangular', input: '0' },
  ],
  'topic-loops-4': [
    { fn: 'multiplicationTable', input: '3' },
    { fn: 'multiplicationTable', input: '2' },
    { fn: 'multiplicationTable', input: '1' },
  ],
  'topic-loops-5': [
    { fn: 'isPrime', input: '2' },
    { fn: 'isPrime', input: '9' },
    { fn: 'isPrime', input: '97' },
    { fn: 'isPrime', input: '1' },
    { fn: 'isPrime', input: '0' },
  ],
  'topic-loops-6': [
    { fn: 'countDivisors', input: '12' },
    { fn: 'countDivisors', input: '13' },
    { fn: 'countDivisors', input: '16' },
    { fn: 'countDivisors', input: '1' },
    { fn: 'countDivisors', input: '0' },
  ],
  'topic-loops-7': [
    { fn: 'findDuplicates', input: '[1, 2, 3, 2, 4, 1, 5]' },
    { fn: 'findDuplicates', input: '[1, 2, 3]' },
    { fn: 'findDuplicates', input: '[]' },
  ],
  'topic-loops-8': [
    { fn: 'numberPyramid', input: '3' },
    { fn: 'numberPyramid', input: '1' },
  ],
};
