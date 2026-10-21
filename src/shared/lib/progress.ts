import { chapterCountByModule } from '../content/chapters';

/**
 * The product has three layers a learner can work through: questions, the
 * textbook and the practice tasks. They are weighted the same everywhere, so
 * the ring on the home page and the bar in the header always agree.
 */
export const PROGRESS_WEIGHTS = {
  questions: 0.15,
  textbook: 0.35,
  practice: 0.5,
} as const;

export interface LayerProgress {
  done: number;
  total: number;
}

export interface ProgressInput {
  questions: LayerProgress;
  chapters: LayerProgress;
  tasks: LayerProgress;
}

const ratio = (layer: LayerProgress): number =>
  layer.total > 0 ? layer.done / layer.total : 0;

export function overallProgress(input: ProgressInput): number {
  const value =
    ratio(input.questions) * PROGRESS_WEIGHTS.questions +
    ratio(input.chapters) * PROGRESS_WEIGHTS.textbook +
    ratio(input.tasks) * PROGRESS_WEIGHTS.practice;
  return Math.round(value * 100);
}

export function totalChapterCount(modules: readonly { id: string }[]): number {
  return modules.reduce((sum, module) => sum + (chapterCountByModule[module.id] ?? 0), 0);
}

export function moduleChapterCount(moduleId: string): number {
  return chapterCountByModule[moduleId] ?? 0;
}
