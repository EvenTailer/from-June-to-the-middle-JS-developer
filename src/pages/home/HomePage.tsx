import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../../shared/content';
import { getModuleTaskTotal, totalTaskCount } from '../../shared/content/tasks';
import { taskModuleById } from '../../shared/content/tasks/taskIndex';
import { practiceTopics } from '../../shared/content/tasks/topics';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { resetProgress } from '../../shared/store/progressSlice';
import { t, plural } from '../../shared/lib/i18n';
import { metaFor } from '../../shared/lib/moduleMeta';
import type { ModuleMeta } from '../../shared/lib/moduleMeta';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';

function accentVars(meta: ModuleMeta): CSSProperties {
  return { '--accent': meta.accent, '--accent-2': meta.accent2 } as CSSProperties;
}

export function HomePage() {
  const locale = useLocale();
  usePageTitle(
    locale === 'en' ? 'JS to Middle · Learning path' : 'От новичка до middle · JS → Middle'
  );
  const dispatch = useAppDispatch();
  const completedLessons = useAppSelector((s) => s.progress.completedLessons);
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const quizScores = useAppSelector((s) => s.progress.quizScores);
  const [query, setQuery] = useState('');

  const completed = useMemo(() => new Set(completedLessons), [completedLessons]);

  const totalLessons = useMemo(
    () => modules.reduce((sum, module) => sum + module.lessons.length, 0),
    []
  );

  const doneLessons = useMemo(
    () =>
      modules.reduce(
        (sum, module) => sum + module.lessons.filter((lesson) => completed.has(lesson.id)).length,
        0
      ),
    [completed]
  );

  const totalTasks = totalTaskCount;

  const doneTasks = useMemo(
    () => completedTasks.filter((id) => taskModuleById[id] !== undefined).length,
    [completedTasks]
  );

  const passedQuizzes = useMemo(
    () =>
      modules.filter((module) => (quizScores[module.id] ?? 0) >= Math.ceil(module.quiz.length * 0.6))
        .length,
    [quizScores]
  );

  const startedModule = modules.find((module) => {
    const done = module.lessons.filter((lesson) => completed.has(lesson.id)).length;
    const taskTotal = getModuleTaskTotal(module.id);
    const solved = completedTasks.filter((id) => taskModuleById[id] === module.id).length;
    return (
      (done > 0 && done < module.lessons.length) ||
      (solved > 0 && solved < taskTotal)
    );
  });

  const nextModule =
    startedModule ??
    modules.find((module) => module.lessons.some((lesson) => !completed.has(lesson.id))) ??
    modules[0];

  const theoryRatio = totalLessons > 0 ? doneLessons / totalLessons : 0;
  const practiceRatio = totalTasks > 0 ? doneTasks / totalTasks : 0;
  const theoryPercent = Math.round(theoryRatio * 100);
  const practicePercent = Math.round(practiceRatio * 100);
  const overall = Math.round((theoryRatio * 0.2 + practiceRatio * 0.8) * 100);

  const filteredModules = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return modules;
    return modules.filter((module) =>
      `${module.title[locale]} ${module.description[locale]} ${module.id}`
        .toLowerCase()
        .includes(needle)
    );
  }, [locale, query]);

  const handleReset = () => {
    if (window.confirm(t(locale, 'home.reset.confirm'))) {
      dispatch(resetProgress());
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <span className="eyebrow">
            <Icon name="spark" size={15} />
            {t(locale, 'home.eyebrow')}
          </span>
          <h1 className="hero__title">
            {locale === 'en' ? (
              <>
                JS to <span className="gradient-text">{t(locale, 'home.title.accent')}</span>
              </>
            ) : (
              <>
                От новичка до <span className="gradient-text">{t(locale, 'home.title.accent')}</span>
              </>
            )}
          </h1>
          <p className="hero__subtitle">{t(locale, 'home.subtitle')}</p>

          <div className="hero__actions">
            <Link className="btn btn--primary" to={`/module/${nextModule.id}?tab=tasks`}>
              {doneTasks > 0 ? t(locale, 'home.continuePractice') : t(locale, 'home.startPractice')}
              <Icon name="arrow" size={17} />
            </Link>
            <Link className="btn btn--ghost" to={`/module/${nextModule.id}`}>
              {t(locale, 'home.studyTheory')}
            </Link>
            <Link className="btn btn--ghost" to="/practice">
              {t(locale, 'nav.practice')}
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <dl className="hero__stats">
            <div>
              <dt>{t(locale, 'home.stats.theory')}</dt>
              <dd>{theoryPercent}%</dd>
            </div>
            <div>
              <dt>{t(locale, 'home.stats.practice')}</dt>
              <dd>{practicePercent}%</dd>
            </div>
            <div>
              <dt>{t(locale, 'home.stats.quizzes')}</dt>
              <dd>
                {passedQuizzes}/{modules.length}
              </dd>
            </div>
            <div>
              <dt>{t(locale, 'home.stats.tasks')}</dt>
              <dd>
                {doneTasks}/{totalTasks}
              </dd>
            </div>
          </dl>
        </div>

        <aside className="hero__panel" aria-label={t(locale, 'home.progress')}>
          <div
            className="ring"
            style={{
              background: `conic-gradient(var(--accent) ${overall}%, var(--ring-track) 0)`,
            }}
          >
            <div className="ring__inner">
              <strong>{overall}%</strong>
              <span>{t(locale, 'home.progress')}</span>
            </div>
          </div>
          <p className="hero__remaining">
            <b>{totalTasks - doneTasks}</b>{' '}
            {plural(locale, totalTasks - doneTasks, {
              one: { en: 'task left', ru: 'задача осталась' },
              few: { en: 'tasks left', ru: 'задачи осталось' },
              many: { en: 'tasks left', ru: 'задач осталось' },
            })}
          </p>
          <ProgressBar value={overall} max={100} label={t(locale, 'home.progress')} />
          <p className="hero__formula">{t(locale, 'home.progress.formula')}</p>
          <button type="button" className="link-button" onClick={handleReset}>
            <Icon name="reset" size={14} />
            {t(locale, 'home.reset')}
          </button>
        </aside>
      </section>

      <section id="trainer" className="section">
        <Link className="trainer-card" to="/practice">
          <span className="trainer-card__icon">
            <Icon name="spark" size={24} />
          </span>
          <div className="trainer-card__body">
            <h2>{t(locale, 'home.trainer.title')}</h2>
            <p>{t(locale, 'home.trainer.subtitle')}</p>
            <div className="trainer-card__stats">
              <span>
                <b>{practiceTopics.length}</b> {t(locale, 'home.trainer.blocks')}
              </span>
              <span>
                <b>{totalTasks}</b> {t(locale, 'home.trainer.tasks')}
              </span>
              <span>
                <b>{doneTasks}</b> {t(locale, 'home.trainer.solved')}
              </span>
            </div>
          </div>
          <span className="trainer-card__cta">
            {t(locale, 'home.trainer.cta')}
            <Icon name="arrow" size={18} />
          </span>
        </Link>
      </section>

      <section id="modules" className="section">
        <div className="section__head">
          <div>
            <h2>{t(locale, 'home.modules.title')}</h2>
            <p>{t(locale, 'home.modules.subtitle')}</p>
          </div>
          <label className="search">
            <Icon name="search" size={17} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(locale, 'home.search')}
              aria-label={t(locale, 'home.search')}
            />
          </label>
        </div>

        <div className="module-grid">
          {filteredModules.map((module) => {
            const meta = metaFor(module.id);
            const done = module.lessons.filter((lesson) => completed.has(lesson.id)).length;
            const bestScore = quizScores[module.id] ?? 0;
            const taskCount = getModuleTaskTotal(module.id);
            const solvedTasks = completedTasks.filter(
              (id) => taskModuleById[id] === module.id
            ).length;
            const moduleTheory =
              module.lessons.length > 0 ? done / module.lessons.length : 0;
            const modulePractice = taskCount > 0 ? solvedTasks / taskCount : 0;
            const moduleProgress = Math.round(
              (moduleTheory * 0.2 + modulePractice * 0.8) * 100
            );

            return (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className="module-card"
                style={accentVars(meta)}
              >
                <div className="module-card__top">
                  <span className="module-icon">{meta.code}</span>
                  <span className="module-card__count">{moduleProgress}%</span>
                </div>
                <h3>{module.title[locale]}</h3>
                <p className="module-card__description">{module.description[locale]}</p>
                <div className="module-card__meta">
                  <span>
                    {module.lessons.length} {t(locale, 'module.lesson')} · {solvedTasks}/
                    {taskCount}{' '}
                    {plural(locale, taskCount, {
                      one: { en: 'task', ru: 'задача' },
                      few: { en: 'tasks', ru: 'задачи' },
                      many: { en: 'tasks', ru: 'задач' },
                    })}
                  </span>
                  {bestScore > 0 && (
                    <span className="module-card__best">
                      <Icon name="quiz" size={14} />
                      {bestScore}/{module.quiz.length}
                    </span>
                  )}
                </div>
                <ProgressBar
                  value={moduleProgress}
                  max={100}
                  label={`${module.title[locale]}: ${t(locale, 'progress')}`}
                />
                <span className="module-card__cta">
                  {t(locale, 'home.open')}
                  <Icon name="arrow" size={15} />
                </span>
              </Link>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="empty">
            <Icon name="search" size={26} />
            <p>{t(locale, 'home.empty')}</p>
          </div>
        )}
      </section>
    </main>
  );
}
