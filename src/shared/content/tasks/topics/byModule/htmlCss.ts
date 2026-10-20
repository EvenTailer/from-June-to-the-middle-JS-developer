import type { PracticeTask } from '../../../../../entities/module/model/types';
import { markupTasks } from '../markup';

const all: PracticeTask[] = [
  ...markupTasks,
];

export const htmlCssTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'html-css'
);
