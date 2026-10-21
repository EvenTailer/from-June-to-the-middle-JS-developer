import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the arrays topic. */
export const arraysCases: Record<string, TaskCaseInput[]> = {
  'topic-arrays-1': [
    { fn: 'flatten', input: '[1, [2, [3, [4]]]]' },
    { fn: 'flatten', input: '[1, [2, 3], 4]' },
    { fn: 'flatten', input: '[]' },
    { fn: 'flatten', input: '[[], [[]], 1]' },
  ],
  'topic-arrays-2': [
    { fn: 'chunk', input: '[1, 2, 3, 4, 5], 2' },
    { fn: 'chunk', input: '[1, 2, 3], 5' },
    { fn: 'chunk', input: '[], 2' },
    { fn: 'chunk', input: '[1, 2], 0' },
    { fn: 'chunk', input: '[1, 2, 3], -1' },
  ],
  'topic-arrays-3': [
    { fn: 'unique', input: '[1, 2, 2, 3, 1]' },
    { fn: 'unique', input: '["b", "a", "b"]' },
    { fn: 'unique', input: '[]' },
    { fn: 'unique', input: '[7, 7, 7]' },
  ],
  'topic-arrays-4': [
    { fn: 'groupBy', input: '[{ g: "x" }, { g: "y" }, { g: "x" }], item => item.g' },
    { fn: 'groupBy', input: '[{ n: 1 }, { n: 2 }], item => item.n' },
    { fn: 'groupBy', input: '[], item => item.g' },
  ],
  'topic-arrays-5': [
    { fn: 'rotate', input: '[1, 2, 3, 4, 5], 2' },
    { fn: 'rotate', input: '[1, 2, 3], -1' },
    { fn: 'rotate', input: '[1, 2, 3], 0' },
    { fn: 'rotate', input: '[], 3' },
    { fn: 'rotate', input: '[1, 2, 3], 4' },
  ],
  'topic-arrays-6': [
    { fn: 'topN', input: '[3, 1, 5, 2, 4], 3' },
    { fn: 'topN', input: '[3, 1, 2], 5' },
    { fn: 'topN', input: '[3, 1, 2], 0' },
    { fn: 'topN', input: '[-3, -1, -2], 2' },
  ],
  'topic-arrays-7': [
    { fn: 'transpose', input: '[[1, 2, 3], [4, 5, 6]]' },
    { fn: 'transpose', input: '[[1]]' },
    { fn: 'transpose', input: '[]' },
    { fn: 'transpose', input: '[[1, 2], [3, 4], [5, 6]]' },
  ],
  'topic-arrays-8': [
    {
      fn: 'dedupeBy',
      input: '[{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }], item => item.id',
    },
    { fn: 'dedupeBy', input: '[{ t: "x" }, { t: "y" }], item => item.t' },
    { fn: 'dedupeBy', input: '[], item => item.id' },
  ],
};
