import type { PracticeTask } from '../../../../../entities/module/model/types';
import { cliTasks } from '../cli';

const all: PracticeTask[] = [
  ...cliTasks,
];

export const cliTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'cli'
);
