import { useMemo, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { getModule } from '../../shared/content';
import type { Lesson, Module } from '../../entities/module/model/types';
import type { Locale } from '../../shared/store/uiSlice';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { getModuleTaskTotal } from '../../shared/content/tasks';
import { taskModuleById } from '../../shared/content/tasks/taskIndex';
import { toggleLessonComplete } from '../../shared/store/progressSlice';
import { t } from '../../shared/lib/i18n';
import { metaFor } from '../../shared/lib/moduleMeta';
import type { ModuleMeta } from '../../shared/lib/moduleMeta';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';
import { CodeBlock } from '../../shared/ui/CodeBlock';
import { ModuleQuiz } from '../../widgets/moduleQuiz/ModuleQuiz';
import { TasksPanel } from '../../widgets/moduleTasks/TasksPanel';

type Filter = 'all' | 'todo' | 'done';
type ModuleTab = 'learn' | 'quiz' | 'tasks';
const tabOrder: ModuleTab[] = ['learn', 'quiz', 'tasks'];

function accentVars(meta: ModuleMeta): CSSProperties {
  return { '--accent': meta.accent, '--accent-2': meta.accent2 } as CSSProperties;
}

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  locale: Locale;
  open: boolean;
  done: boolean;
  hasNext: boolean;
  onToggle: () => void;
  onToggleDone: () => void;
  onNext: () => void;
}

function LessonCard({
  lesson,
  index,
  locale,
  open,
  done,
  hasNext,
  onToggle,
  onToggleDone,
  onNext,
}: LessonCardProps) {
  return (
    <article
      id={`lesson-${lesson.id}`}
      className={`lesson${open ? ' is-open' : ''}${done ? ' is-done' : ''}`}
    >
      <button
        type="button"
        className="lesson__head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`lesson-body-${lesson.id}`}
      >
        <span className="lesson__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="lesson__titles">
          <span className="lesson__title">{lesson.title[locale]}</span>
          <span className="lesson__question">{lesson.question[locale]}</span>
        </span>
        <span className="lesson__state">
          {done && (
            <span className="lesson__check" title={t(locale, 'lesson.completed')}>
              <Icon name="check" size={14} />
            </span>
          )}
          <Icon name="chevron" size={18} className="lesson__chevron" />
        </span>
      </button>

      <div
        id={`lesson-body-${lesson.id}`}
        className="lesson__body"
        inert={!open}
        aria-hidden={!open}
      >
        <div className="lesson__body-inner">
          <div className="lesson__answer">
            <span className="label">{t(locale, 'lesson.answer')}</span>
            <p>{lesson.answer[locale]}</p>
          </div>

          {lesson.code && <CodeBlock code={lesson.code} />}

          <div className="lesson__actions">
            <button
              type="button"
              className={`btn btn--sm ${done ? 'btn--soft' : 'btn--primary'}`}
              onClick={onToggleDone}
              aria-pressed={done}
            >
              <Icon name="check" size={15} />
              {done ? t(locale, 'lesson.completed') : t(locale, 'lesson.markComplete')}
            </button>
            {hasNext && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={onNext}>
                {t(locale, 'lesson.next')}
                <Icon name="arrow" size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ModulePage() {
  const { moduleId } = useParams();
  const locale = useLocale();
  const mod = moduleId ? getModule(moduleId) : undefined;

  if (!mod) {
    return (
      <main className="page">
        <div className="empty">
          <Icon name="book" size={26} />
          <p>{t(locale, 'module.notFound')}</p>
          <Link className="btn btn--primary btn--sm" to="/">
            {t(locale, 'module.back')}
          </Link>
        </div>
      </main>
    );
  }

  return <ModuleView key={mod.id} module={mod} />;
}

function ModuleView({ module: mod }: { module: Module }) {
  const locale = useLocale();
  usePageTitle(
    locale === 'en' ? `${mod.title.en} · JS to Middle` : `${mod.title.ru} · От новичка до middle`
  );
  const dispatch = useAppDispatch();
  const completedLessons = useAppSelector((s) => s.progress.completedLessons);
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const quizScores = useAppSelector((s) => s.progress.quizScores);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const tabParam = searchParams.get('tab');
  const tab: ModuleTab = tabParam === 'quiz' || tabParam === 'tasks' ? tabParam : 'learn';

  const completed = useMemo(() => new Set(completedLessons), [completedLessons]);

  const changeTab = (next: ModuleTab) => {
    const nextParams = new URLSearchParams(searchParams);
    if (next === 'learn') nextParams.delete('tab');
    else nextParams.set('tab', next);
    setSearchParams(nextParams, { replace: true });
    window.setTimeout(() => {
      document.getElementById('module-tabs')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 0);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const currentIndex = tabOrder.indexOf(tab);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabOrder[(currentIndex + offset + tabOrder.length) % tabOrder.length];
    changeTab(next);
    document.getElementById(`module-tab-${next}`)?.focus();
  };

  const meta = metaFor(mod.id);
  const doneCount = mod.lessons.filter((lesson) => completed.has(lesson.id)).length;
  const bestScore = quizScores[mod.id] ?? 0;
  const taskTotal = getModuleTaskTotal(mod.id);
  const doneTasks = completedTasks.filter((id) => taskModuleById[id] === mod.id).length;
  const theoryRatio = mod.lessons.length > 0 ? doneCount / mod.lessons.length : 0;
  const practiceRatio = taskTotal > 0 ? doneTasks / taskTotal : 0;
  const moduleProgress = Math.round((theoryRatio * 0.2 + practiceRatio * 0.8) * 100);

  const visibleLessons = mod.lessons
    .map((lesson, index) => ({ lesson, index }))
    .filter(({ lesson }) => {
      const done = completed.has(lesson.id);
      if (filter === 'todo' && done) return false;
      if (filter === 'done' && !done) return false;
      const needle = query.trim().toLowerCase();
      if (!needle) return true;
      const haystack = [
        lesson.title[locale],
        lesson.question[locale],
        lesson.answer[locale],
        lesson.code ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(visibleLessons.map(({ lesson }) => lesson.id)));
  };

  const goNext = (id: string) => {
    setOpenIds((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      document.getElementById(`lesson-${id}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 140);
  };

  const continueLearning = () => {
    const nextLesson = mod.lessons.find((lesson) => !completed.has(lesson.id));
    changeTab('learn');
    setQuery('');
    setFilter('all');
    if (!nextLesson) return;
    setOpenIds((prev) => new Set(prev).add(nextLesson.id));
    window.setTimeout(() => {
      document
        .getElementById(`lesson-${nextLesson.id}`)
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 240);
  };

  return (
    <main className="page" style={accentVars(meta)}>
      <div className="crumbs">
        <Link to="/">
          <Icon name="arrow" size={15} className="crumbs__back" />
          {t(locale, 'module.back')}
        </Link>
      </div>

      <section className="module-hero">
        <div className="module-hero__icon">{meta.code}</div>
        <div className="module-hero__body">
          <h1>{mod.title[locale]}</h1>
          <p>{mod.description[locale]}</p>
          <div className="chips">
            <span className="chip">
              {mod.lessons.length} {t(locale, 'module.lesson')}
            </span>
            <span className="chip">
              {t(locale, 'module.done')}: {doneCount}
            </span>
            {taskTotal > 0 && (
              <span className="chip">
                {t(locale, 'module.tasks.done')}: {doneTasks}/{taskTotal}
              </span>
            )}
            {bestScore > 0 && (
              <span className="chip chip--accent">
                {t(locale, 'module.quiz.best')}: {bestScore}/{mod.quiz.length}
              </span>
            )}
          </div>
          <div className="module-hero__progress">
            <ProgressBar
              value={moduleProgress}
              max={100}
              label={`${mod.title[locale]}: ${t(locale, 'progress')}`}
            />
            <span>{moduleProgress}%</span>
          </div>
        </div>
        <div className="module-hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => changeTab('tasks')}>
            <Icon name="spark" size={16} />
            {doneTasks > 0 ? t(locale, 'home.continuePractice') : t(locale, 'home.startPractice')}
          </button>
          <button type="button" className="btn btn--ghost" onClick={continueLearning}>
            <Icon name="book" size={16} />
            {doneCount > 0 ? t(locale, 'home.continue') : t(locale, 'module.learn')}
          </button>
        </div>
      </section>

      <div
        className="module-tabs"
        id="module-tabs"
        role="tablist"
        aria-label={t(locale, 'module.tabs')}
        onKeyDown={onTabKeyDown}
      >
        {[
          { id: 'learn' as const, icon: 'book' as const, label: t(locale, 'module.tab.learn'), count: mod.lessons.length },
          { id: 'quiz' as const, icon: 'quiz' as const, label: t(locale, 'module.tab.quiz'), count: mod.quiz.length },
          { id: 'tasks' as const, icon: 'spark' as const, label: t(locale, 'module.tab.tasks'), count: taskTotal },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`module-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`module-panel-${item.id}`}
            tabIndex={tab === item.id ? 0 : -1}
            className={`module-tab${tab === item.id ? ' is-active' : ''}`}
            onClick={() => changeTab(item.id)}
          >
            <Icon name={item.icon} size={17} />
            <span>{item.label}</span>
            <span className="module-tab__count">{item.count}</span>
          </button>
        ))}
      </div>

      <div
        className="module-panel"
        id={`module-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`module-tab-${tab}`}
      >
        {tab === 'quiz' && (
          <ModuleQuiz module={mod} onBackToModule={() => changeTab('learn')} />
        )}
        {tab === 'tasks' && <TasksPanel module={mod} />}
        {tab === 'learn' && (
          <>
            <div className="toolbar">
        <label className="search">
          <Icon name="search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(locale, 'module.search')}
            aria-label={t(locale, 'module.search')}
          />
        </label>

        <div className="filter-chips" role="group">
          {(['all', 'todo', 'done'] as Filter[]).map((value) => (
            <button
              key={value}
              type="button"
              className={`chip chip--button${filter === value ? ' is-active' : ''}`}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {t(locale, `module.filter.${value}`)}
            </button>
          ))}
        </div>

        <div className="toolbar__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={expandAll}>
            {t(locale, 'module.expandAll')}
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setOpenIds(new Set())}
          >
            {t(locale, 'module.collapseAll')}
          </button>
        </div>
      </div>

      <div className="lesson-list">
        {visibleLessons.map(({ lesson, index }, visibleIndex) => {
          const nextLesson = visibleLessons[visibleIndex + 1]?.lesson;
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              locale={locale}
              open={openIds.has(lesson.id)}
              done={completed.has(lesson.id)}
              hasNext={Boolean(nextLesson)}
              onToggle={() => toggleOpen(lesson.id)}
              onToggleDone={() => dispatch(toggleLessonComplete(lesson.id))}
              onNext={() => nextLesson && goNext(nextLesson.id)}
            />
          );
        })}
      </div>

      {visibleLessons.length === 0 && (
        <div className="empty">
          <Icon name="search" size={26} />
          <p>{t(locale, 'module.empty')}</p>
        </div>
      )}
          </>
        )}
      </div>
    </main>
  );
}
