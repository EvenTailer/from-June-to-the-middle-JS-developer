import type { PracticeTask, PracticeTopicId } from '../../../entities/module/model/types';
import { baseTasksByModule } from './base';
import { htmlCssTasks } from './htmlCss';
import { gitTasks } from './git';
import { cliTasks } from './cli';
import { oopTasks } from './oop';
import { httpTasks } from './http';
import { jsCoreTasks } from './jsCore';
import { typescriptTasks } from './typescript';
import { reactTasks } from './react';
import { reduxTasks } from './redux';
import { reactRouterTasks } from './reactRouter';
import { nextjsTasks } from './nextjs';
import { moduleTopicTaskCounts, topicTaskCounts } from './counts';

export { loadModuleTopicTasks, loadTopicTasks } from './topics/registry';
export { moduleTopicTaskCounts, topicTaskCounts } from './counts';

const moduleTasks: Record<string, PracticeTask[]> = {
  'html-css': htmlCssTasks,
  git: gitTasks,
  cli: cliTasks,
  oop: oopTasks,
  http: httpTasks,
  'js-core': jsCoreTasks,
  typescript: typescriptTasks,
  react: reactTasks,
  redux: reduxTasks,
  'react-router': reactRouterTasks,
  nextjs: nextjsTasks,
};

export const tasksByModule: Record<string, PracticeTask[]> = Object.fromEntries(
  [...Object.keys(baseTasksByModule), 'architecture'].map((moduleId) => [
    moduleId,
    [...(baseTasksByModule[moduleId] ?? []), ...(moduleTasks[moduleId] ?? [])],
  ])
);

export function getModuleTaskTotal(moduleId: string): number {
  return (tasksByModule[moduleId]?.length ?? 0) + (moduleTopicTaskCounts[moduleId] ?? 0);
}

export function getTopicTaskTotal(topicId: PracticeTopicId): number {
  return topicTaskCounts[topicId] ?? 0;
}

export const totalTaskCount = Object.keys(tasksByModule).reduce(
  (sum, moduleId) => sum + getModuleTaskTotal(moduleId),
  0
);
