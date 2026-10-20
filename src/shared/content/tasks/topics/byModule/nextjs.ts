import type { PracticeTask } from '../../../../../entities/module/model/types';
import { nextTasks } from '../next';

const all: PracticeTask[] = [
  ...nextTasks,
];

export const nextjsTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'nextjs'
);
