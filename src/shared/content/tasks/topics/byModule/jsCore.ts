import type { PracticeTask } from '../../../../../entities/module/model/types';
import { loopsTasks } from '../loops';
import { functionsTasks } from '../functions';
import { arraysTasks } from '../arrays';
import { objectsTasks } from '../objects';
import { stringsTasks } from '../strings';
import { numbersTasks } from '../numbers';
import { typesTasks } from '../types';
import { asyncTasks } from '../async';
import { domTasks } from '../dom';
import { errorsTasks } from '../errors';
import { algorithmsTasks } from '../algorithms';
import { testingTasks } from '../testing';
import { toolingTasks } from '../tooling';

const all: PracticeTask[] = [
  ...loopsTasks,
  ...functionsTasks,
  ...arraysTasks,
  ...objectsTasks,
  ...stringsTasks,
  ...numbersTasks,
  ...typesTasks,
  ...asyncTasks,
  ...domTasks,
  ...errorsTasks,
  ...algorithmsTasks,
  ...testingTasks,
  ...toolingTasks,
];

export const jsCoreTopicTasks: PracticeTask[] = all.filter(
  (task) => task.moduleId === 'js-core'
);
