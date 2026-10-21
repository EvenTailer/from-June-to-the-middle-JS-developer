import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the hooks topic.
 *
 * There are none yet: every task of the topic is a React hook, and the runner
 * of the app compiles the code of a learner with `new Function`, so a sample
 * that imports React cannot run in the sandbox at all. The hooks also need the
 * DOM, a network and a render, none of which the sandbox has.
 */
export const hooksCases: Record<string, TaskCaseInput[]> = {};
