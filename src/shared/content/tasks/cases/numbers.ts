import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the numbers topic. */
export const numbersCases: Record<string, TaskCaseInput[]> = {
  'topic-numbers-1': [
    { fn: 'clamp', input: '5, 0, 10' },
    { fn: 'clamp', input: '-3, 0, 10' },
    { fn: 'clamp', input: '42, 0, 10' },
    { fn: 'clamp', input: '5, 10, 0' },
    { fn: 'clamp', input: '0, 0, 0' },
  ],
  'topic-numbers-2': [
    { fn: 'roundMoney', input: '0.1 + 0.2' },
    { fn: 'roundMoney', input: '19.999' },
    { fn: 'roundMoney', input: '1.005' },
    { fn: 'roundMoney', input: '2.5' },
    { fn: 'roundMoney', input: '0' },
  ],
  'topic-numbers-3': [
    { fn: 'randomInt', input: '1, 6', expect: 'Number.isInteger(result) && result >= 1 && result <= 6' },
    { fn: 'randomInt', input: '5, 5', expect: 'result === 5' },
    {
      fn: 'randomInt',
      input: '3.2, 6.8',
      expect: 'Number.isInteger(result) && result >= 4 && result <= 6',
    },
    { fn: 'randomInt', input: '6, 1', expect: 'Number.isInteger(result) && result >= 1 && result <= 6' },
  ],
  'topic-numbers-4': [
    { fn: 'percent', input: '25, 200' },
    { fn: 'percent', input: '1, 3' },
    { fn: 'percent', input: '0, 10' },
    { fn: 'percent', input: '5, 0' },
    { fn: 'percentChange', input: '100, 150' },
    { fn: 'percentChange', input: '150, 100' },
    { fn: 'percentChange', input: '0, 10' },
  ],
  'topic-numbers-5': [
    { fn: 'gcd', input: '48, 18' },
    { fn: 'gcd', input: '7, 13' },
    { fn: 'gcd', input: '0, 5' },
    { fn: 'gcd', input: '-12, 8' },
    { fn: 'gcd', input: '8, 12' },
  ],
  'topic-numbers-6': [
    { fn: 'lcm', input: '4, 6' },
    { fn: 'lcm', input: '3, 5' },
    { fn: 'lcm', input: '21, 6' },
    { fn: 'lcm', input: '0, 5' },
    { fn: 'lcm', input: '6, 4' },
  ],
  'topic-numbers-7': [
    { fn: 'roundTo', input: '1.005, 2' },
    { fn: 'roundTo', input: '2.675, 2' },
    { fn: 'roundTo', input: '1.23456, 3' },
    { fn: 'roundTo', input: '0, 2' },
    { fn: 'sumMoney', input: '[0.1, 0.2]' },
    { fn: 'sumMoney', input: '[19.99, 0.01]' },
    { fn: 'sumMoney', input: '[]' },
  ],
  'topic-numbers-8': [
    { fn: 'formatBytes', input: '0' },
    { fn: 'formatBytes', input: '512' },
    { fn: 'formatBytes', input: '1536' },
    { fn: 'formatBytes', input: '1048576' },
    { fn: 'formatBytes', input: '-1' },
    { fn: 'formatDuration', input: '0' },
    { fn: 'formatDuration', input: '500' },
    { fn: 'formatDuration', input: '2000' },
    { fn: 'formatDuration', input: '65000' },
    { fn: 'formatDuration', input: '3661000' },
  ],
};
