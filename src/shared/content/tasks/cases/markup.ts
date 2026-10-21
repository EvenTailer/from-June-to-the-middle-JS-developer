import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the markup topic.
 *
 * The topic has no cases yet: every exemplar is a block of HTML or of CSS, and
 * the runner of the app calls a JavaScript function. The runner cannot lay out
 * a page, so there is nothing the runner could compare.
 */
export const markupCases: Record<string, TaskCaseInput[]> = {};
