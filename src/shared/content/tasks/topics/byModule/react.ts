import type { PracticeTask } from '../../../../../entities/module/model/types';
import { testingTasks } from '../testing';
import { reactTasks } from '../react';
import { hooksTasks } from '../hooks';
import { formsTasks } from '../forms';
import { reactPerfTasks } from '../reactPerf';

const all: PracticeTask[] = [
  ...testingTasks,
  ...reactTasks,
  ...hooksTasks,
  ...formsTasks,
  ...reactPerfTasks,
];

export const reactTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'react'
);
