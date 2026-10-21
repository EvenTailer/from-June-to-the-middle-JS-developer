import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../../shared/content';
import { lessonModuleById } from '../../shared/content/moduleIndex';
import { quizBlockMeta } from '../../shared/content/quizBlocks';
import { totalTaskCount } from '../../shared/content/tasks';
import { taskModuleById } from '../../shared/content/tasks/taskIndex';
import { practiceTopics } from '../../shared/content/tasks/topics';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useCourseProgress } from '../../shared/hooks/useCourseProgress';
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
  const readChapters = useAppSelector((s) => s.progress.readChapters);
  const quizScores = useAppSelector((s) => s.progress.quizScores);
  const [query, setQuery] = useState('');

  const doneLessonsOf = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id of completedLessons) {
      const moduleId = lessonModuleById[id];
      if (moduleId) counts[moduleId] = (counts[moduleId] ?? 0) + 1;
    }
    return counts;
  }, [completedLessons]);

  const totalTasks = totalTaskCount;

  const doneTasks = useMemo(
    () => completedTasks.filter((id) => taskModuleById[id] !== undefined).length,
    [completedTasks]
  );

  const { layers, overall: progress } = useCourseProgress();

  const startedModule = modules.find((module) => {
    const done = doneLessonsOf[module.id] ?? 0;
    const taskTotal = module.taskCount;
    const solved = completedTasks.filter((id) => taskModuleById[id] === module.id).length;
    return (
      (done > 0 && done < module.lessonCount) ||
      (solved > 0 && solved < taskTotal)
    );
  });

  const nextModule =
    startedModule ??
    modules.find((module) => (doneLessonsOf[module.id] ?? 0) < module.lessonCount) ??
    modules[0];

  const theoryPercent = Math.round(
    layers.theory.total > 0 ? (layers.theory.done / layers.theory.total) * 100 : 0,
  );
  const practicePercent = Math.round(
    layers.practice.total > 0 ? (layers.practice.done / layers.practice.total) * 100 : 0,
  );
  const questionsPercent = Math.round(
    layers.questions.total > 0 ? (layers.questions.done / layers.questions.total) * 100 : 0,
  );
  const overall = progress;

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
              <dt>{t(locale, 'home.stats.quizzes')}</dt>
              <dd>{questionsPercent}%</dd>
            </div>
            <div>
              <dt>{t(locale, 'home.stats.practice')}</dt>
              <dd>{practicePercent}%</dd>
            </div>
          </dl>
        </div>

        <aside className="hero__panel" aria-label={t(locale, 'home.progress')}>
          <div
            className="ring"
            title={t(locale, 'home.progressWeights')}
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
            const done = doneLessonsOf[module.id] ?? 0;
            const bestBlock = quizBlockMeta(module.id, module.quizCount).reduce<
              { id: string; length: number } | null
            >(
              (best, block) => {
                const score = quizScores[block.id] ?? 0;
                if (!best) return score > 0 ? block : null;
                return score > (quizScores[best.id] ?? 0) ? block : best;
              },
              null
            );
            const bestScore = bestBlock ? (quizScores[bestBlock.id] ?? 0) : 0;
            const taskCount = module.taskCount;
            const solvedTasks = completedTasks.filter(
              (id) => taskModuleById[id] === module.id
            ).length;
            const moduleTheory = module.lessonCount > 0 ? done / module.lessonCount : 0;
            const modulePractice = taskCount > 0 ? solvedTasks / taskCount : 0;
            const chapterCount = module.chapterCount;
            const readCount = readChapters.filter((key) =>
              key.startsWith(`${module.id}::`)
            ).length;
            const moduleTextbook = chapterCount > 0 ? readCount / chapterCount : 0;
            const moduleProgress = Math.round(
              (moduleTheory * 0.15 + moduleTextbook * 0.35 + modulePractice * 0.5) * 100
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
                    {chapterCount} {t(locale, 'theory.chapters')} · {readCount}/
                    {chapterCount}
                  </span>
                  <span>
                    {module.lessonCount} {t(locale, 'module.lesson')} · {solvedTasks}/
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
                      {bestScore}/{bestBlock?.length ?? 0}
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
