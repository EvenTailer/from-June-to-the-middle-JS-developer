import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the ts-advanced topic. */
export const tsAdvancedCases: Record<string, TaskCaseInput[]> = {
  'topic-ts-advanced-4': [
    { fn: 'getUserId', input: '"/users/42/posts/7"' },
    { fn: 'getUserId', input: '"/users/42"' },
    { fn: 'getUserId', input: '"/users/abc/posts/9"' },
    { fn: 'getUserId', input: '"/posts/7"' },
  ],
  'topic-ts-advanced-5': [
    { fn: 'loadUsers', input: '', expect: 'result instanceof Promise' },
    { fn: 'loadUsers', input: '', expect: 'typeof result.then === "function"' },
  ],
  'topic-ts-advanced-6': [
    { fn: 'userId', input: '42' },
    { fn: 'userId', input: '1' },
    { fn: 'findUser', input: '42' },
  ],
  'topic-ts-advanced-8': [
    { fn: 'head', input: '[1, "a"]' },
    { fn: 'head', input: '[5]' },
    { fn: 'tail', input: '[1, "a", true]' },
    { fn: 'tail', input: '[7]' },
  ],
};
