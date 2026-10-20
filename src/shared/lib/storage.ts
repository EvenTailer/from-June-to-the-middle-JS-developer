import type { Locale, UiState } from '../store/uiSlice';
import type { ProgressState } from '../store/progressSlice';

export const STORAGE_KEY = 'js-tutorial:state:v1';

interface PersistedState {
  ui: UiState;
  progress: ProgressState;
}

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export function detectTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function loadState(): PersistedState | undefined {
  if (typeof localStorage === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const language = parsed.ui?.language === 'ru' || parsed.ui?.language === 'en' ? parsed.ui.language : detectLocale();
    const theme = parsed.ui?.theme === 'light' || parsed.ui?.theme === 'dark' ? parsed.ui.theme : detectTheme();
    const completedLessons = Array.isArray(parsed.progress?.completedLessons)
      ? parsed.progress.completedLessons.filter((id): id is string => typeof id === 'string')
      : [];
    const completedTasks = Array.isArray(parsed.progress?.completedTasks)
      ? parsed.progress.completedTasks.filter((id): id is string => typeof id === 'string')
      : [];
    const quizScores =
      parsed.progress?.quizScores && typeof parsed.progress.quizScores === 'object'
        ? Object.fromEntries(
            Object.entries(parsed.progress.quizScores).filter(
              (entry): entry is [string, number] => typeof entry[1] === 'number'
            )
          )
        : {};
    const readChapters = Array.isArray(parsed.progress?.readChapters)
      ? parsed.progress.readChapters.filter((id): id is string => typeof id === 'string')
      : [];
    return {
      ui: { language, theme },
      progress: { completedLessons, completedTasks, readChapters, quizScores },
    };
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage can be unavailable or full — learning still works in memory */
  }
}
