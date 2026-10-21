import type { LocalizedText, Module } from '../../entities/module/model/types';
import { moduleIndex } from './moduleIndex';
import { chapterCountByModule } from './chapters';
import { moduleTaskCounts } from './tasks/counts';
import { buildQuizBlocks } from './quizBlocks';

/**
 * Everything the shell needs about a module before its content is loaded:
 * the name, the description and the counts of every layer. The lessons, the
 * quiz and the tasks stay in their own chunks and arrive on demand.
 */
export interface ModuleEntry {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  lessonCount: number;
  quizCount: number;
  taskCount: number;
  chapterCount: number;
}

export const modules: ModuleEntry[] = moduleIndex.map((entry) => ({
  ...entry,
  taskCount: moduleTaskCounts[entry.id] ?? 0,
  chapterCount: chapterCountByModule[entry.id] ?? 0,
}));

const moduleLoaders: Record<string, () => Promise<Module>> = {
  'html-css': () => import('./htmlCss').then((m) => m.htmlCssModule),
  git: () => import('./git').then((m) => m.gitModule),
  cli: () => import('./cli').then((m) => m.cliModule),
  oop: () => import('./oop').then((m) => m.oopModule),
  http: () => import('./http').then((m) => m.httpModule),
  'js-core': () => import('./jsCore').then((m) => m.jsCoreModule),
  typescript: () => import('./typescript').then((m) => m.tsModule),
  react: () => import('./react').then((m) => m.reactModule),
  redux: () => import('./redux').then((m) => m.reduxModule),
  'react-router': () => import('./reactRouter').then((m) => m.routerModule),
  nextjs: () => import('./nextjs').then((m) => m.nextModule),
  architecture: () => import('./architecture').then((m) => m.architectureModule),
};

export function getModuleEntry(id: string): ModuleEntry | undefined {
  return modules.find((module) => module.id === id);
}

/**
 * Loads the lessons and the quiz of one module. Both live in the chunk of
 * that module, so opening a module page downloads one file instead of twelve.
 */
export async function loadModule(id: string): Promise<Module | undefined> {
  const loader = moduleLoaders[id];
  if (!loader) return undefined;

  const mod = await loader();
  return { ...mod, quizBlocks: buildQuizBlocks(id, mod.quiz) };
}
