import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the objects topic. */
export const objectsCases: Record<string, TaskCaseInput[]> = {
  'topic-objects-1': [
    { fn: 'deepClone', input: '{ a: 1, b: { c: [1, 2] } }' },
    { fn: 'deepClone', input: '[1, [2, { d: 3 }]]' },
    { fn: 'deepClone', input: '"text"' },
    {
      fn: 'deepClone',
      input: '(globalThis.__deepCloneSource = { a: { b: 1 } }, globalThis.__deepCloneSource)',
      expect: 'result.a !== globalThis.__deepCloneSource.a',
    },
  ],
  'topic-objects-2': [
    { fn: 'merge', input: '{ a: 1, b: 2 }, { b: 3, c: 4 }' },
    { fn: 'merge', input: '{ a: 1 }, { a: 2 }, { a: 3 }' },
    { fn: 'merge', input: '{ x: 1 }' },
    { fn: 'merge', input: '{}, { y: 2 }' },
  ],
  'topic-objects-3': [
    { fn: 'pick', input: '{ a: 1, b: 2, c: 3 }, ["a", "c"]' },
    { fn: 'pick', input: '{ a: 1 }, ["z"]' },
    { fn: 'pick', input: '{}, []' },
    { fn: 'omit', input: '{ a: 1, b: 2, c: 3 }, ["b"]' },
    { fn: 'omit', input: '{ a: 1, b: 2 }, ["a", "b"]' },
  ],
  'topic-objects-4': [
    {
      fn: 'deepFreeze',
      input: '{ a: { b: 1 } }',
      expect: 'Object.isFrozen(result) && Object.isFrozen(result.a)',
    },
    { fn: 'deepFreeze', input: '{ a: { b: 1 }, list: [1, 2] }', expect: 'Object.isFrozen(result.list)' },
    { fn: 'deepFreeze', input: '{ a: { b: 1 } }', expect: '((result.a.b = 2), result.a.b)' },
  ],
  'topic-objects-5': [
    { fn: 'deepEqual', input: '{ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }' },
    { fn: 'deepEqual', input: '[1, 2], [1, 2, 3]' },
    { fn: 'deepEqual', input: 'NaN, NaN' },
    { fn: 'deepEqual', input: '1, 1' },
    { fn: 'deepEqual', input: '[1, 2], { 0: 1, 1: 2 }' },
    { fn: 'deepEqual', input: '"a", "a"' },
  ],
  'topic-objects-6': [
    { fn: 'groupByProperty', input: '[{ team: "a" }, { team: "b" }, { team: "a" }], "team"' },
    { fn: 'groupByProperty', input: '[{ name: "x" }], "team"' },
    { fn: 'groupByProperty', input: '[], "team"' },
  ],
};
