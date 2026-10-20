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
import { htmlCssChapterTasks } from './chapters/htmlCss';
import { gitChapterTasks } from './chapters/git';
import { cliChapterTasks } from './chapters/cli';
import { oopChapterTasks } from './chapters/oop';
import { httpChapterTasks } from './chapters/http';
import { jsCoreChapterTasks } from './chapters/jsCore';
import { typescriptChapterTasks } from './chapters/typescript';
import { reactChapterTasks } from './chapters/react';
import { reduxChapterTasks } from './chapters/redux';
import { reactRouterChapterTasks } from './chapters/reactRouter';
import { nextjsChapterTasks } from './chapters/nextjs';
import { architectureChapterTasks } from './chapters/architecture';

export { loadModuleTopicTasks, loadTopicTasks } from './topics/registry';
export { moduleTopicTaskCounts, topicTaskCounts } from './counts';

const moduleTasks: Record<string, PracticeTask[]> = {
  'html-css': [...htmlCssTasks, ...htmlCssChapterTasks],
  git: [...gitTasks, ...gitChapterTasks],
  cli: [...cliTasks, ...cliChapterTasks],
  oop: [...oopTasks, ...oopChapterTasks],
  http: [...httpTasks, ...httpChapterTasks],
  'js-core': [...jsCoreTasks, ...jsCoreChapterTasks],
  typescript: [...typescriptTasks, ...typescriptChapterTasks],
  react: [...reactTasks, ...reactChapterTasks],
  redux: [...reduxTasks, ...reduxChapterTasks],
  'react-router': [...reactRouterTasks, ...reactRouterChapterTasks],
  nextjs: [...nextjsTasks, ...nextjsChapterTasks],
  architecture: architectureChapterTasks,
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
