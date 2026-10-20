import type { Chapter } from '../../../entities/module/model/types';

const loaders: Record<string, () => Promise<Chapter[]>> = {
  'html-css': () => import('./htmlCss').then((m) => m.htmlCssChapters),
  git: () => import('./git').then((m) => m.gitChapters),
  cli: () => import('./cli').then((m) => m.cliChapters),
  oop: () => import('./oop').then((m) => m.oopChapters),
  http: () => import('./http').then((m) => m.httpChapters),
  'js-core': () => import('./jsCore').then((m) => m.jsCoreChapters),
  typescript: () => import('./typescript').then((m) => m.typescriptChapters),
  react: () => import('./react').then((m) => m.reactChapters),
  redux: () => import('./redux').then((m) => m.reduxChapters),
  'react-router': () => import('./reactRouter').then((m) => m.reactRouterChapters),
  nextjs: () => import('./nextjs').then((m) => m.nextjsChapters),
  architecture: () => import('../architecture').then((m) => m.architectureModule.chapters ?? []),
};

export const chapterCountByModule: Record<string, number> = {
  'html-css': 4,
  git: 4,
  cli: 4,
  oop: 4,
  http: 4,
  'js-core': 4,
  typescript: 4,
  react: 4,
  redux: 4,
  'react-router': 4,
  nextjs: 4,
  architecture: 5,
};

export function loadChapters(moduleId: string): Promise<Chapter[]> {
  const loader = loaders[moduleId];
  return loader ? loader() : Promise.resolve([]);
}
