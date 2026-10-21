import { useMemo } from 'react';
import { modules } from '../content';
import { quizBlockMeta } from '../content/quizBlocks';
import { useAppSelector } from './useAppSelector';
import { overallProgress, type LayerProgress } from '../lib/progress';

/**
 * The three layers of the progress of the course and the number behind every
 * one of them. The home page and the header read the same numbers, so the
 * ring and the bar of the header always tell the same story.
 */
export interface ProgressLayers {
  /** The lessons and the chapters of the textbook. */
  theory: LayerProgress;
  /** The quizzes that were passed. */
  questions: LayerProgress;
  /** The tasks that were solved. */
  practice: LayerProgress;
}

export interface CourseProgress {
  layers: ProgressLayers;
  /** The progress of the whole course in percent. */
  overall: number;
}

/**
 * The score a quiz needs to count as passed: three of five questions.
 */
export const QUIZ_PASS_RATIO = 0.6;

/**
 * The progress of the course, read from the store and from the content.
 */
export function useCourseProgress(): CourseProgress {
  const completedLessons = useAppSelector((s) => s.progress.completedLessons);
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const readChapters = useAppSelector((s) => s.progress.readChapters);
  const quizScores = useAppSelector((s) => s.progress.quizScores);

  return useMemo(() => {
    const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0);
    const totalTasks = modules.reduce((sum, module) => sum + module.taskCount, 0);
    const totalChapters = modules.reduce((sum, module) => sum + module.chapterCount, 0);

    const blocks = modules.flatMap((module) => quizBlockMeta(module.id, module.quizCount));
    const passedBlocks = blocks.filter(
      (block) => (quizScores[block.id] ?? 0) >= Math.ceil(block.length * QUIZ_PASS_RATIO),
    ).length;

    const doneLessons = completedLessons.length;
    const doneChapters = readChapters.filter((key) => key.includes('::')).length;

    const layers: ProgressLayers = {
      theory: {
        done: doneLessons + doneChapters,
        total: totalLessons + totalChapters,
      },
      questions: { done: passedBlocks, total: blocks.length },
      practice: { done: completedTasks.length, total: totalTasks },
    };

    return { layers, overall: overallProgress(layers) };
  }, [completedLessons, completedTasks, readChapters, quizScores]);
}
