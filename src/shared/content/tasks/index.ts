import type { PracticeTask, PracticeTopicId } from '../../../entities/module/model/types';
import { moduleTaskCounts, topicTaskCounts } from './counts';

export { loadModuleTopicTasks, loadTopicTasks } from './topics/registry';
export { moduleTopicTaskCounts, moduleTaskCounts, topicTaskCounts } from './counts';

/**
 * The cases of the tasks. The file is generated, and it is loaded on its own,
 * so it does not weigh on the chunk of the content of a module.
 */
const testLoader = () => import('./generated/tests').then((m) => m.taskTests);

/** Puts the cases of a task into the task. */
export function withTests(
  tasks: PracticeTask[],
  tests: Record<string, PracticeTask['tests']>,
): PracticeTask[] {
  return tasks.map((task) => {
    const cases = tests[task.id];
    if (!cases) return task;
    return { ...task, tests: cases, fn: task.fn ?? cases[0]?.fn };
  });
}

const baseLoader = () => import('./base').then((m) => m.baseTasksByModule);

const moduleLoaders: Record<string, () => Promise<PracticeTask[]>> = {
  'html-css': () =>
    Promise.all([
      import('./htmlCss').then((m) => m.htmlCssTasks),
      import('./chapters/htmlCss').then((m) => m.htmlCssChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  git: () =>
    Promise.all([
      import('./git').then((m) => m.gitTasks),
      import('./chapters/git').then((m) => m.gitChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  cli: () =>
    Promise.all([
      import('./cli').then((m) => m.cliTasks),
      import('./chapters/cli').then((m) => m.cliChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  oop: () =>
    Promise.all([
      import('./oop').then((m) => m.oopTasks),
      import('./chapters/oop').then((m) => m.oopChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  http: () =>
    Promise.all([
      import('./http').then((m) => m.httpTasks),
      import('./chapters/http').then((m) => m.httpChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  'js-core': () =>
    Promise.all([
      import('./jsCore').then((m) => m.jsCoreTasks),
      import('./chapters/jsCore').then((m) => m.jsCoreChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  typescript: () =>
    Promise.all([
      import('./typescript').then((m) => m.typescriptTasks),
      import('./chapters/typescript').then((m) => m.typescriptChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  react: () =>
    Promise.all([
      import('./react').then((m) => m.reactTasks),
      import('./chapters/react').then((m) => m.reactChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  redux: () =>
    Promise.all([
      import('./redux').then((m) => m.reduxTasks),
      import('./chapters/redux').then((m) => m.reduxChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  'react-router': () =>
    Promise.all([
      import('./reactRouter').then((m) => m.reactRouterTasks),
      import('./chapters/reactRouter').then((m) => m.reactRouterChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  nextjs: () =>
    Promise.all([
      import('./nextjs').then((m) => m.nextjsTasks),
      import('./chapters/nextjs').then((m) => m.nextjsChapterTasks),
    ]).then(([moduleTasks, chapterTasks]) => [...moduleTasks, ...chapterTasks]),
  architecture: () =>
    import('./chapters/architecture').then((m) => m.architectureChapterTasks),
};

/**
 * The tasks of one module: the shared base tasks, the module tasks, the tasks
 * attached to a chapter and the topic tasks. Every group is a separate chunk.
 */
export async function loadModuleTasks(moduleId: string): Promise<PracticeTask[]> {
  const loader = moduleLoaders[moduleId];
  const [base, own, tests] = await Promise.all([
    baseLoader(),
    loader ? loader() : Promise.resolve([]),
    testLoader(),
  ]);

  return withTests([...(base[moduleId] ?? []), ...own], tests);
}

export function getModuleTaskTotal(moduleId: string): number {
  return moduleTaskCounts[moduleId] ?? 0;
}

export function getTopicTaskTotal(topicId: PracticeTopicId): number {
  return topicTaskCounts[topicId] ?? 0;
}

export const totalTaskCount = Object.values(moduleTaskCounts).reduce(
  (sum, count) => sum + count,
  0
);
