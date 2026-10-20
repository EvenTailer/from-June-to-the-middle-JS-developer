import { useAppSelector } from './useAppSelector';
import type { Locale } from '../store/uiSlice';

export function useLocale(): Locale {
  return useAppSelector((s) => s.ui.language);
}
