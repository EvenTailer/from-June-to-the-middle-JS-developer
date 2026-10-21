import type { LocalizedText, QuizBlock, QuizQuestion } from '../../entities/module/model/types';
import { chapterIdsByModule, chapterTitleById } from './moduleIndex';

/**
 * The quiz of a module is cut into one block per chapter of the textbook. The
 * chapter titles live in the generated index, so a block carries the title of
 * its chapter without the chapter itself being loaded.
 */
export interface QuizBlockMeta {
  /** The id of the chapter the block belongs to. */
  id: string;
  title: LocalizedText;
  /** How many questions the block holds. */
  length: number;
}

/**
 * The questions of a module are spread over its chapters as evenly as the
 * count allows: the first blocks take the remainder, the questions keep the
 * order they have in the module and a chapter that gets no question still has
 * a block.
 */
function questionsPerBlock(total: number, count: number, index: number): number {
  if (count <= 0) return 0;
  return Math.floor(total / count) + (index < total % count ? 1 : 0);
}

/**
 * The shape of the quiz blocks of a module without the questions themselves.
 * The UI needs the block count and the block sizes to score a quiz, and it
 * needs them before the module content is loaded. The count follows the
 * chapter count, the sizes follow the question count.
 */
export function quizBlockMeta(moduleId: string, quizCount: number): QuizBlockMeta[] {
  const chapterIds = chapterIdsByModule[moduleId] ?? [];

  return chapterIds.map((chapterId, index) => ({
    id: chapterId,
    title: chapterTitleById[chapterId] ?? { en: chapterId, ru: chapterId },
    length: questionsPerBlock(quizCount, chapterIds.length, index),
  }));
}

export function buildQuizBlocks(moduleId: string, quiz: QuizQuestion[]): QuizBlock[] {
  const blocks: QuizBlock[] = [];
  let offset = 0;

  for (const meta of quizBlockMeta(moduleId, quiz.length)) {
    blocks.push({
      id: meta.id,
      title: meta.title,
      questions: quiz.slice(offset, offset + meta.length),
    });
    offset += meta.length;
  }

  return blocks;
}
