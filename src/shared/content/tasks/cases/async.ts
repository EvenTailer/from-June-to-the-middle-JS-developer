import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the async topic.
 *
 * The topic has no case yet. Every function of these tasks returns a promise,
 * and the runner of the app compares the value the function returns with the
 * expected output right away, without waiting for a promise to settle: the
 * promise itself is what gets compared, and it is the same "{}" for every
 * implementation. A case would therefore pass for a wrong answer as well, and
 * the app would mark the task as solved. The tasks keep the read-only
 * behaviour of the app until the runner waits for a promise before it
 * compares the result.
 */
export const asyncCases: Record<string, TaskCaseInput[]> = {};
