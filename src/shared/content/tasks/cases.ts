/**
 * The cases of the practice tasks.
 *
 * The author writes the name of the function the runner calls and the input.
 * The expected output is computed by scripts/generate-task-tests.mjs from the
 * exemplar of the task, so it cannot drift from the runner of the app.
 *
 * A case of a task that returns an object instead of the answer itself reads
 * the result of the call with the field `expect`, where `result` is the value
 * the function returned.
 */
export interface TaskCaseInput {
  /** The name of the function the runner calls. */
  fn: string;
  /** The arguments of the call, as JavaScript expressions. */
  input: string;
  /** The expression that reads the result of the call. */
  expect?: string;
}

/** The cases of the tasks, by the id of the task. */
export const taskCases: Record<string, TaskCaseInput[]> = {
  'topic-algorithms-1': [
    { fn: 'isBalanced', input: '"(a + b) [c]"' },
    { fn: 'isBalanced', input: '"([)]"' },
    { fn: 'findMismatch', input: '"([)]"' },
  ],
  'topic-algorithms-2': [
    { fn: 'createQueue', input: '', expect: 'result.enqueue(1)' },
    { fn: 'createQueue', input: '', expect: 'result.enqueue(1) + result.enqueue(2)' },
    { fn: 'createQueue', input: '', expect: 'result.isEmpty()' },
  ],
  'topic-algorithms-3': [
    { fn: 'binarySearch', input: '[1, 3, 5, 7, 9], 5' },
    { fn: 'binarySearch', input: '[1, 3, 5], 4' },
    { fn: 'binarySearch', input: '[], 1' },
  ],
  'topic-algorithms-4': [
    { fn: 'bubbleSort', input: '[3, -1, 3, 2]' },
    { fn: 'quickSort', input: '[5, 2, 9, 1]' },
  ],
  'topic-algorithms-5': [
    {
      fn: 'searchBST',
      input: '{ value: 8, left: { value: 3, left: null, right: null }, right: { value: 10, left: null, right: null } }, 8',
      expect: 'result.value',
    },
    {
      fn: 'inorder',
      input: '{ value: 8, left: { value: 3, left: null, right: null }, right: { value: 10, left: null, right: null } }',
    },
  ],
  'topic-algorithms-6': [
    { fn: 'rotate90', input: '[[1, 2], [3, 4]]' },
    { fn: 'rotate90', input: '[[1, 2, 3], [4, 5, 6]]' },
  ],
  'topic-algorithms-7': [
    { fn: 'indexOfSubstring', input: '"hello world", "world"' },
    { fn: 'indexOfSubstring', input: '"abc", "d"' },
    { fn: 'indexOfSubstring', input: '"abc", ""' },
  ],
  'topic-algorithms-8': [
    { fn: 'countPairs', input: '4' },
    { fn: 'hasDuplicates', input: '[1, 2, 1]' },
    { fn: 'hasDuplicatesQuadratic', input: '[1, 2, 3, 4], (a, b) => a === b' },
  ],
};
