import type { PracticeTask } from '../../../../../entities/module/model/types';
import { gitTasks } from '../git';

const all: PracticeTask[] = [
  ...gitTasks,
];

export const gitTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'git'
);
