import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the react topic.
 *
 * The topic has no cases yet: every exemplar is a React component written in
 * TSX, and the runner of the app compiles the code of a learner as a plain
 * script. The components need a React tree, a DOM and, for the hooks, a
 * storage that the sandbox does not have, so there is nothing the runner could
 * compare.
 */
export const reactCases: Record<string, TaskCaseInput[]> = {};
