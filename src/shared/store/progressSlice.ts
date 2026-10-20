import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  completedLessons: string[];
  completedTasks: string[];
  quizScores: Record<string, number>;
}

const initialState: ProgressState = {
  completedLessons: [],
  completedTasks: [],
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
  setQuizScore,
  resetProgress,
} = progressSlice.actions;
export default progressSlice.reducer;
