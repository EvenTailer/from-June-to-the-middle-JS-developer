import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the tooling topic.
 *
 * Only the tasks whose exemplar is a plain function can be run: the runner of
 * the app compiles the code of a task as one program, so a task that is a
 * configuration file (package.json, tsconfig.json), a shell script or a
 * configuration that imports a package cannot be loaded at all.
 */
export const toolingCases: Record<string, TaskCaseInput[]> = {
  'topic-tooling-6': [
    { fn: 'loadConfig', input: '{ PORT: "8080", API_KEY: "secret" }' },
    { fn: 'loadConfig', input: '{ API_KEY: "secret", HOST: "example.com", DEBUG: "true" }' },
    { fn: 'loadConfig', input: '{ PORT: "0", API_KEY: "key", DEBUG: "0" }' },
    { fn: 'loadConfig', input: '{ API_KEY: "key", HOST: "", DEBUG: "1" }' },
  ],
  'topic-tooling-8': [
    {
      fn: 'checkDependencies',
      input: '{ dependencies: { react: "^19.0.0" }, devDependencies: { vite: "^8.0.0" } }',
    },
    { fn: 'checkDependencies', input: '{ dependencies: { react: "19.0.0" } }' },
    { fn: 'checkDependencies', input: '{ devDependencies: { vitest: "1.0.0" } }' },
    { fn: 'checkDependencies', input: '{ devDependencies: { eslint: "~9.0.0" } }' },
    { fn: 'checkDependencies', input: '{ dependencies: { lodash: "latest" } }' },
    { fn: 'checkDependencies', input: '{ dependencies: { local: "file:../local" } }' },
    {
      fn: 'checkDependencies',
      input: '{ dependencies: { react: "^19.0.0" }, devDependencies: { react: "^19.0.0" } }',
    },
  ],
};
