import type { PracticeTask } from '../../../../../entities/module/model/types';
import { httpTasks } from '../http';
import { securityTasks } from '../security';

const all: PracticeTask[] = [
  ...httpTasks,
  ...securityTasks,
];

export const httpTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'http'
);
