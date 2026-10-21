import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the redux topic.
 *
 * Every exemplar of the topic imports Redux Toolkit or react-redux. The
 * sandbox of the runner compiles the code of a learner as the body of a
 * function, and an import statement is a syntax error there, so no case of
 * this topic can run and the record stays empty.
 */
export const reduxCases: Record<string, TaskCaseInput[]> = {};
