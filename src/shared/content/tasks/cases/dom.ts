import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the dom topic.
 *
 * The topic has no case yet. The runner of the app compiles the code of a task
 * as one program and runs it in a worker that has no page, so the exemplars of
 * these tasks cannot even load: the last lines of every one of them reach for
 * `document`, `window` or `localStorage`. A case would fail for every
 * implementation, including the exemplar, so the tasks keep the read-only
 * behaviour of the app until the runner gets a document to work with.
 */
export const domCases: Record<string, TaskCaseInput[]> = {};
