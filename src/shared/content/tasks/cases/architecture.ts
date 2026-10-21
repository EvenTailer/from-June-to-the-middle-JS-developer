import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the architecture topic.
 *
 * The exemplars of the topic are TypeScript modules with export statements,
 * SQL scripts, a folder tree and a markdown document. The sandbox of the
 * runner compiles the code of a learner as the body of a function, where an
 * export statement is a syntax error and where a SQL script is not JavaScript
 * at all, so no case of this topic can run and the record stays empty.
 */
export const architectureCases: Record<string, TaskCaseInput[]> = {};
