import type { PracticeTask, PracticeTopicId } from '../../../../entities/module/model/types';

const moduleLoaders: Record<string, () => Promise<PracticeTask[]>> = {
  'html-css': () => import('./byModule/htmlCss').then((m) => m.htmlCssTopicTasks),
  git: () => import('./byModule/git').then((m) => m.gitTopicTasks),
  cli: () => import('./byModule/cli').then((m) => m.cliTopicTasks),
  oop: () => import('./byModule/oop').then((m) => m.oopTopicTasks),
  http: () => import('./byModule/http').then((m) => m.httpTopicTasks),
  'js-core': () => import('./byModule/jsCore').then((m) => m.jsCoreTopicTasks),
  typescript: () => import('./byModule/typescript').then((m) => m.typescriptTopicTasks),
  react: () => import('./byModule/react').then((m) => m.reactTopicTasks),
  redux: () => import('./byModule/redux').then((m) => m.reduxTopicTasks),
  'react-router': () => import('./byModule/reactRouter').then((m) => m.reactRouterTopicTasks),
  nextjs: () => import('./byModule/nextjs').then((m) => m.nextjsTopicTasks),
  architecture: () => import('./byModule/architecture').then((m) => m.architectureTopicTasks),
};

export function loadModuleTopicTasks(moduleId: string): Promise<PracticeTask[]> {
  const loader = moduleLoaders[moduleId];
  return loader ? loader() : Promise.resolve([]);
}

const topicLoaders: Record<PracticeTopicId, () => Promise<PracticeTask[]>> = {
  loops: () => import('./loops').then((m) => m.loopsTasks),
  functions: () => import('./functions').then((m) => m.functionsTasks),
  arrays: () => import('./arrays').then((m) => m.arraysTasks),
  objects: () => import('./objects').then((m) => m.objectsTasks),
  strings: () => import('./strings').then((m) => m.stringsTasks),
  numbers: () => import('./numbers').then((m) => m.numbersTasks),
  types: () => import('./types').then((m) => m.typesTasks),
  async: () => import('./async').then((m) => m.asyncTasks),
  dom: () => import('./dom').then((m) => m.domTasks),
  errors: () => import('./errors').then((m) => m.errorsTasks),
  algorithms: () => import('./algorithms').then((m) => m.algorithmsTasks),
  git: () => import('./git').then((m) => m.gitTasks),
  cli: () => import('./cli').then((m) => m.cliTasks),
  oop: () => import('./oop').then((m) => m.oopTasks),
  http: () => import('./http').then((m) => m.httpTasks),
  security: () => import('./security').then((m) => m.securityTasks),
  typescript: () => import('./typescript').then((m) => m.typescriptTasks),
  'ts-advanced': () => import('./tsAdvanced').then((m) => m.tsAdvancedTasks),
  testing: () => import('./testing').then((m) => m.testingTasks),
  react: () => import('./react').then((m) => m.reactTasks),
  hooks: () => import('./hooks').then((m) => m.hooksTasks),
  forms: () => import('./forms').then((m) => m.formsTasks),
  'react-perf': () => import('./reactPerf').then((m) => m.reactPerfTasks),
  redux: () => import('./redux').then((m) => m.reduxTasks),
  router: () => import('./router').then((m) => m.routerTasks),
  next: () => import('./next').then((m) => m.nextTasks),
  markup: () => import('./markup').then((m) => m.markupTasks),
  tooling: () => import('./tooling').then((m) => m.toolingTasks),
  architecture: () => import('./architecture').then((m) => m.architectureTasks),
};

export function loadTopicTasks(topicId: string): Promise<PracticeTask[]> {
  const loader = topicLoaders[topicId as PracticeTopicId];
  return loader ? loader() : Promise.resolve([]);
}
