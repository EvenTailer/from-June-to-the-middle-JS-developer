import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the cli topic.
 *
 * The topic has no cases yet: every exemplar is a shell command or a shell
 * script, and the runner of the app calls a JavaScript function. The commands
 * work on a file system that the sandbox does not have, so there is nothing the
 * runner could compare.
 */
export const cliCases: Record<string, TaskCaseInput[]> = {};
