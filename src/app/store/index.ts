import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../../shared/store/uiSlice';
import progressReducer from '../../shared/store/progressSlice';
import { loadState, saveState } from '../../shared/lib/storage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    progress: progressReducer,
  },
  preloadedState,
});

let lastSaved = JSON.stringify(store.getState());

store.subscribe(() => {
  const state = store.getState();
  const snapshot = JSON.stringify(state);
  if (snapshot === lastSaved) return;
  lastSaved = snapshot;
  saveState(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
