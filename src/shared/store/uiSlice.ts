import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { detectLocale, detectTheme } from '../lib/storage';

export type Locale = 'en' | 'ru';
export type Theme = 'light' | 'dark';

export interface UiState {
  language: Locale;
  theme: Theme;
}

const initialState: UiState = {
  language: detectLocale(),
  theme: detectTheme(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.language = action.payload;
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'en' ? 'ru' : 'en';
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setLanguage, toggleLanguage, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
