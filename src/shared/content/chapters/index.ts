import type { Chapter } from '../../../entities/module/model/types';

const loaders: Record<string, () => Promise<Chapter[]>> = {
  'html-css': () => import('./htmlCss/index').then((m) => m.htmlCssChapters),
  git: () => import('./git').then((m) => m.gitChapters),
  cli: () => import('./cli').then((m) => m.cliChapters),
  oop: () => import('./oop').then((m) => m.oopChapters),
  http: () => import('./http').then((m) => m.httpChapters),
  'js-core': () => import('./jsCore/index').then((m) => m.jsCoreChapters),
  typescript: () => import('./typescript').then((m) => m.typescriptChapters),
  react: () => import('./react').then((m) => m.reactChapters),
  redux: () => import('./redux').then((m) => m.reduxChapters),
  'react-router': () => import('./reactRouter').then((m) => m.reactRouterChapters),
  nextjs: () => import('./nextjs').then((m) => m.nextjsChapters),
  architecture: () => import('./architecture/index').then((m) => m.architectureChapters),
};

export const chapterCountByModule: Record<string, number> = {
  'html-css': 8,
  'git': 7,
  cli: 4,
  'oop': 8,
  'http': 9,
  'js-core': 14,
  'typescript': 10,
  'react': 11,
  'redux': 7,
  'react-router': 4,
  'nextjs': 9,
  'architecture': 7,
};

export function loadChapters(moduleId: string): Promise<Chapter[]> {
  const loader = loaders[moduleId];
  return loader ? loader() : Promise.resolve([]);
}
