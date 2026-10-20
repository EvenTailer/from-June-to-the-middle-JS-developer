import type { PracticeTask } from '../../../../../entities/module/model/types';
import { routerTasks } from '../router';

const all: PracticeTask[] = [
  ...routerTasks,
];

export const reactRouterTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'react-router'
);
