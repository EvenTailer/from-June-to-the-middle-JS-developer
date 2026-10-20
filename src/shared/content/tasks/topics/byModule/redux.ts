import type { PracticeTask } from '../../../../../entities/module/model/types';
import { reduxTasks } from '../redux';

const all: PracticeTask[] = [
  ...reduxTasks,
];

export const reduxTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'redux'
);
