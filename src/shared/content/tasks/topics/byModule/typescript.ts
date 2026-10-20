import type { PracticeTask } from '../../../../../entities/module/model/types';
import { typescriptTasks } from '../typescript';
import { tsAdvancedTasks } from '../tsAdvanced';

const all: PracticeTask[] = [
  ...typescriptTasks,
  ...tsAdvancedTasks,
];

export const typescriptTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'typescript'
);
