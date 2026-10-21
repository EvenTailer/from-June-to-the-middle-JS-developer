import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  completedLessons: string[];
  completedTasks: string[];
  readChapters: string[];
  quizScores: Record<string, number>;
}

/**
 * Chapters are stored under their module so the home page can show how much of
 * each module has been read without loading every chapter bundle.
 */
export const chapterProgressKey = (moduleId: string, chapterId: string): string =>
  `${moduleId}::${chapterId}`;

export const isChapterProgressKey = (key: string, moduleId: string): boolean =>
  key.startsWith(`${moduleId}::`);

const initialState: ProgressState = {
  completedLessons: [],
  completedTasks: [],
  readChapters: [],
  quizScores: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markLessonComplete: (state, action: PayloadAction<string>) => {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
    toggleLessonComplete: (state, action: PayloadAction<string>) => {
      const index = state.completedLessons.indexOf(action.payload);
      if (index >= 0) {
        state.completedLessons.splice(index, 1);
      } else {
        state.completedLessons.push(action.payload);
      }
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const index = state.completedTasks.indexOf(action.payload);
      if (index >= 0) {
        state.completedTasks.splice(index, 1);
      } else {
        state.completedTasks.push(action.payload);
      }
    },
    /**
     * Marks a task as solved after its cases passed. A task that can be run
     * cannot be marked by hand, so the progress means something.
     */
    markTaskSolved: (state, action: PayloadAction<string>) => {
      if (!state.completedTasks.includes(action.payload)) {
        state.completedTasks.push(action.payload);
      }
    },
    toggleChapterRead: (state, action: PayloadAction<string>) => {
      const index = state.readChapters.indexOf(action.payload);
      if (index >= 0) {
        state.readChapters.splice(index, 1);
      } else {
        state.readChapters.push(action.payload);
      }
    },
    setQuizScore: (state, action: PayloadAction<{ blockId: string; score: number }>) => {
      const best = state.quizScores[action.payload.blockId] ?? 0;
      state.quizScores[action.payload.blockId] = Math.max(best, action.payload.score);
    },
    resetProgress: () => initialState,
  },
});

export const {
  markLessonComplete,
  toggleLessonComplete,
  toggleTaskComplete,
  markTaskSolved,
  toggleChapterRead,
  setQuizScore,
  resetProgress,
} = progressSlice.actions;
export default progressSlice.reducer;
