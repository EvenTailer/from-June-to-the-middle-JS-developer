import { Link, NavLink } from 'react-router-dom';
import { modules } from '../../shared/content';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { setLanguage, toggleTheme } from '../../shared/store/uiSlice';
import { overallProgress, totalChapterCount } from '../../shared/lib/progress';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';

const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0);
const totalTasks = modules.reduce((sum, module) => sum + module.taskCount, 0);
const totalChapters = totalChapterCount(modules);

export function Header() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((s) => s.ui.language);
  const theme = useAppSelector((s) => s.ui.theme);
  const completedLessons = useAppSelector((s) => s.progress.completedLessons.length);
  const completedTasks = useAppSelector((s) => s.progress.completedTasks.length);
  const readChapters = useAppSelector((s) => s.progress.readChapters.length);
  const overall = overallProgress({
    questions: { done: completedLessons, total: totalLessons },
    chapters: { done: readChapters, total: totalChapters },
    tasks: { done: completedTasks, total: totalTasks },
  });

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            JS
          </span>
          <span className="brand__text">
            <span>to</span> <strong>Middle</strong>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
          >
            {t(language, 'nav.home')}
          </NavLink>
          <Link to="/#modules" className="nav-link">
            {t(language, 'nav.modules')}
          </Link>
          <NavLink
            to="/practice"
            className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
          >
            {t(language, 'nav.practice')}
          </NavLink>
        </nav>

        <div className="header-actions">
          <span className="header-progress" title={t(language, 'home.progress')}>
            <Icon name="spark" size={15} />
            <b>{overall}%</b>
          </span>

          <div className="segmented" role="group" aria-label={t(language, 'lang.label')}>
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => dispatch(setLanguage('en'))}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={language === 'ru' ? 'is-active' : ''}
              onClick={() => dispatch(setLanguage('ru'))}
              aria-pressed={language === 'ru'}
            >
              RU
            </button>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={() => dispatch(toggleTheme())}
            aria-label={theme === 'dark' ? t(language, 'theme.toLight') : t(language, 'theme.toDark')}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
        </div>
      </div>
    </header>
  );
}
