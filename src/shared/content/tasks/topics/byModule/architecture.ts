import type { PracticeTask } from '../../../../../entities/module/model/types';
import { architectureTasks } from '../architecture';

const all: PracticeTask[] = [
  ...architectureTasks,
];

export const architectureTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'architecture'
);
