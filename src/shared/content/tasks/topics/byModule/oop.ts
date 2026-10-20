import type { PracticeTask } from '../../../../../entities/module/model/types';
import { oopTasks } from '../oop';

const all: PracticeTask[] = [
  ...oopTasks,
];

export const oopTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'oop'
);
