import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the next topic.
 *
 * The topic has no cases yet: every exemplar is a Next.js file, so it is
 * written in TSX or in TypeScript with imports, and the runner of the app
 * compiles the code of a learner as a plain script. The page components, the
 * route handlers, the server actions and the middleware cannot be called from
 * the sandbox, so there is nothing the runner could compare.
 */
export const nextCases: Record<string, TaskCaseInput[]> = {};
