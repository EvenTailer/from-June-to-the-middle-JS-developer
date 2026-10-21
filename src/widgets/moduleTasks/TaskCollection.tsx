import { useState } from 'react';
import type { PracticeTask, TaskLevel } from '../../entities/module/model/types';
import { practiceTopics } from '../../shared/content/tasks/topics';
import { useLocale } from '../../shared/hooks/useLocale';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { toggleTaskComplete, markTaskSolved } from '../../shared/store/progressSlice';
import { t } from '../../shared/lib/i18n';
import { metaFor } from '../../shared/lib/moduleMeta';
import { Icon } from '../../shared/ui/Icon';
import { CodeBlock } from '../../shared/ui/CodeBlock';
import { CodeRunner } from './CodeRunner';

type LevelFilter = 'all' | TaskLevel;

const levelOrder: TaskLevel[] = ['basic', 'intermediate', 'advanced'];

const levelKey = (level: TaskLevel) => `practice.level.${level}`;

const levelOf = (task: PracticeTask): TaskLevel => task.level ?? 'basic';

interface TaskGroup {
  key: string;
  title: string;
  code?: string;
  tone?: TaskLevel;
  tasks: PracticeTask[];
}

interface TaskCollectionProps {
  tasks: PracticeTask[];
  groupMode?: 'topic' | 'level';
  showModuleBadge?: boolean;
}

export function TaskCollection({
  tasks,
  groupMode = 'topic',
  showModuleBadge = false,
}: TaskCollectionProps) {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const [openHints, setOpenHints] = useState<Set<string>>(() => new Set());
  const [openSolutions, setOpenSolutions] = useState<Set<string>>(() => new Set());
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const completed = new Set(completedTasks);
  const doneCount = tasks.filter((task) => completed.has(task.id)).length;
  const moduleCount = new Set(tasks.map((task) => task.moduleId)).size;
  const showModules = showModuleBadge && moduleCount > 1;

  const counts = {
    all: tasks.length,
    basic: tasks.filter((task) => levelOf(task) === 'basic').length,
    intermediate: tasks.filter((task) => levelOf(task) === 'intermediate').length,
    advanced: tasks.filter((task) => levelOf(task) === 'advanced').length,
  };

  const filtered =
    levelFilter === 'all' ? tasks : tasks.filter((task) => levelOf(task) === levelFilter);

  const sortByLevel = (list: PracticeTask[]) =>
    [...list].sort((a, b) => levelOrder.indexOf(levelOf(a)) - levelOrder.indexOf(levelOf(b)));

  const groups: TaskGroup[] = [];

  if (groupMode === 'level') {
    for (const level of levelOrder) {
      const list = sortByLevel(filtered.filter((task) => levelOf(task) === level));
      if (list.length === 0) continue;
      groups.push({
        key: level,
        title: t(locale, levelKey(level)),
        tone: level,
        tasks: list,
      });
    }
  } else {
    for (const meta of practiceTopics) {
      const list = sortByLevel(filtered.filter((task) => task.topic === meta.id));
      if (list.length === 0) continue;
      groups.push({ key: meta.id, title: meta.title[locale], code: meta.code, tasks: list });
    }
    const other = sortByLevel(filtered.filter((task) => !task.topic));
    if (other.length > 0) {
      groups.push({ key: 'other', title: t(locale, 'practice.topic.other'), tasks: other });
    }
  }

  const toggleSet = (setter: typeof setOpenHints, id: string) => {
    setter((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filters: Array<{ id: LevelFilter; label: string; count: number }> = [
    { id: 'all', label: t(locale, 'practice.level.all'), count: counts.all },
    { id: 'basic', label: t(locale, levelKey('basic')), count: counts.basic },
    { id: 'intermediate', label: t(locale, levelKey('intermediate')), count: counts.intermediate },
    { id: 'advanced', label: t(locale, levelKey('advanced')), count: counts.advanced },
  ];

  const groupStarts = groups.reduce<number[]>((acc, _group) => {
    const previous = acc.length
      ? acc[acc.length - 1] + groups[acc.length - 1].tasks.length
      : 0;
    acc.push(previous);
    return acc;
  }, []);

  return (
    <>
      <div className="task-toolbar">
        <div className="practice-filters" role="group" aria-label={t(locale, 'practice.level.filter')}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`chip chip--button${levelFilter === filter.id ? ' is-active' : ''}`}
              onClick={() => setLevelFilter(filter.id)}
              aria-pressed={levelFilter === filter.id}
            >
              {filter.label}
              <span className="practice-filter__count">{filter.count}</span>
            </button>
          ))}
        </div>
        <span className="task-toolbar__progress">
          <b>{doneCount}</b> / {tasks.length} {t(locale, 'practice.solved')}
        </span>
      </div>

      <div className="task-list">
        {groups.map((group, groupIndex) => {
          const groupStart = groupStarts[groupIndex] ?? 0;

          return (
            <section key={group.key} className="task-group">
              <div className="task-group__head">
                {group.tone && <span className={`task-dot task-dot--${group.tone}`} />}
                {group.code && <span className="task-group__code">{group.code}</span>}
                <h3 className="task-group__title">{group.title}</h3>
                <span className="task-group__count">{group.tasks.length}</span>
                <span className="task-group__rule" />
              </div>

              <div className="task-group__list">
                {group.tasks.map((task, offset) => {
                  const done = completed.has(task.id);
                  const hintOpen = openHints.has(task.id);
                  const solutionOpen = openSolutions.has(task.id);
                  const index = groupStart + offset;
                  const level = levelOf(task);
                  const moduleCode = task.moduleId ? metaFor(task.moduleId).code : null;
                  /** A task with cases is checked by the runner and cannot be marked by hand. */
                  const runnable = Boolean(task.tests && task.tests.length > 0);

                  return (
                    <article key={task.id} className={`task-card${done ? ' is-done' : ''}`}>
                      <div className="task-card__top">
                        <span className="task-card__num">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="task-card__content">
                          <div className="task-card__titleline">
                            <h3>{task.title[locale]}</h3>
                            <span className={`task-level task-level--${level}`}>
                              {t(locale, levelKey(level))}
                            </span>
                            {showModules && moduleCode && (
                              <span className="task-card__module">{moduleCode}</span>
                            )}
                          </div>
                          <p className="task-card__brief">{task.brief[locale]}</p>
                        </div>
                      </div>

                      <div className="task-card__actions">
                        {task.hint && (
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            onClick={() => toggleSet(setOpenHints, task.id)}
                            aria-expanded={hintOpen}
                          >
                            <Icon name="spark" size={15} />
                            {hintOpen
                              ? t(locale, 'practice.hideHint')
                              : t(locale, 'practice.hint')}
                          </button>
                        )}
                        <button
                          type="button"
                          className={`btn btn--sm ${solutionOpen ? 'btn--ghost' : 'btn--soft'}`}
                          onClick={() => toggleSet(setOpenSolutions, task.id)}
                          aria-expanded={solutionOpen}
                          aria-controls={`task-solution-${task.id}`}
                        >
                          <Icon name="code" size={15} />
                          {solutionOpen
                            ? t(locale, 'practice.hideSolution')
                            : t(locale, 'practice.showSolution')}
                        </button>
                        {!runnable && (
                          <button
                            type="button"
                            className={`btn btn--ghost btn--sm task-card__done${done ? ' is-done' : ''}`}
                            onClick={() => dispatch(toggleTaskComplete(task.id))}
                            aria-pressed={done}
                          >
                            <Icon name="check" size={15} />
                            {done ? t(locale, 'practice.solvedState') : t(locale, 'practice.markSolved')}
                          </button>
                        )}
                        {runnable && done && (
                          <span className="task-card__done is-done">
                            <Icon name="check" size={15} />
                            {t(locale, 'practice.solvedState')}
                          </span>
                        )}
                      </div>

                      {runnable && (
                        <CodeRunner
                          tests={task.tests ?? []}
                          fn={task.fn}
                          onSolved={() => dispatch(markTaskSolved(task.id))}
                        />
                      )}

                      {hintOpen && task.hint && (
                        <div className="task-hint">
                          <span className="label">{t(locale, 'practice.hint')}</span>
                          <p>{task.hint[locale]}</p>
                        </div>
                      )}

                      {solutionOpen && (
                        <div className="task-solution" id={`task-solution-${task.id}`}>
                          <span className="label">{t(locale, 'practice.solution')}</span>
                          <CodeBlock code={task.solution} />
                          {task.explanation && (
                            <div className="task-explanation">
                              <span className="label">{t(locale, 'practice.explanation')}</span>
                              <p>{task.explanation[locale]}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
