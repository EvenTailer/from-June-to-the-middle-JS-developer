import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the testing topic.
 *
 * The topic has no case yet. The runner of the app compiles the code of a task
 * as one program, and every exemplar of this topic imports the test runner:
 * "import { describe, expect, it } from 'vitest'". Such a program is not a
 * script, so it cannot be compiled and every case of it fails with "Cannot
 * use import statement outside a module". The code of a learner has the same
 * problem, so the tasks keep the read-only behaviour of the app until the
 * runner can load a module.
 */
export const testingCases: Record<string, TaskCaseInput[]> = {};
