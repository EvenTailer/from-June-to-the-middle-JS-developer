import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the oop topic.
 *
 * Only the decorator task can be called: the runner compiles the code of a
 * learner as the body of a function and calls one name of it, and a class
 * cannot be called without `new`, so a task whose answer is a class has no
 * callable entry point. The decorator is the only task of the topic that
 * exposes a plain function.
 */
export const oopCases: Record<string, TaskCaseInput[]> = {
  'topic-oop-6': [
    {
      fn: 'logged',
      input: '"order"',
      expect:
        '((descriptor) => { result(descriptor, "total", descriptor); return descriptor.value.call(null, 2, 3); })({ value: function (a, b) { return a + b; } })',
    },
    {
      fn: 'logged',
      input: '"order"',
      expect:
        '((descriptor) => { result(descriptor, "weight", descriptor); return descriptor.value.call({ factor: 3 }, 2); })({ value: function (n) { return this.factor * n; } })',
    },
    {
      fn: 'logged',
      input: '"shipping"',
      expect:
        '((descriptor) => { result(descriptor, "total", descriptor); return typeof descriptor.value; })({ value: function () { return 1; } })',
    },
  ],
};
