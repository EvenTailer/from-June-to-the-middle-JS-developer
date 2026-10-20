import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { PracticeTask } from '../../entities/module/model/types';
import { getTopicTaskTotal, loadTopicTasks } from '../../shared/content/tasks';
import { taskTopicById } from '../../shared/content/tasks/taskIndex';
import { practiceTopics } from '../../shared/content/tasks/topics';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { t, plural } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';
import { TaskCollection } from '../../widgets/moduleTasks/TaskCollection';

export function TopicPage() {
  const { topicId } = useParams();
  const locale = useLocale();
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const [loaded, setLoaded] = useState<{ topicId: string; tasks: PracticeTask[] } | null>(null);

  const meta = practiceTopics.find((item) => item.id === topicId);
  usePageTitle(
    meta
      ? locale === 'en'
        ? `${meta.title.en} · Practice trainer`
        : `${meta.title.ru} · Тренажёр`
      : locale === 'en'
        ? 'Practice trainer'
        : 'Тренажёр'
  );

  useEffect(() => {
    if (!meta) return;

    let active = true;

    loadTopicTasks(meta.id).then((tasks) => {
      if (!active) return;
      setLoaded({ topicId: meta.id, tasks });
    });

    return () => {
      active = false;
    };
  }, [meta]);

  const loading = meta ? loaded?.topicId !== meta.id : false;

  if (!meta) {
    return (
      <main className="page">
        <div className="empty">
          <Icon name="spark" size={26} />
          <p>{t(locale, 'practice.blocks.empty')}</p>
        </div>
      </main>
    );
  }

  const total = getTopicTaskTotal(meta.id);
  const doneCount = completedTasks.filter((id) => taskTopicById[id] === meta.id).length;
  const tasks = loading ? [] : (loaded?.tasks ?? []);

  return (
    <main className="page">
      <div className="crumbs">
        <Link to="/practice">
          <Icon name="arrow" size={15} className="crumbs__back" />
          {t(locale, 'practice.blocks.back')}
        </Link>
      </div>

      <section className="topic-head">
        <div className="topic-head__main">
          <span className="topic-head__code">{meta.code}</span>
          <div className="topic-head__text">
            <h1>{meta.title[locale]}</h1>
            <p>{meta.description[locale]}</p>
          </div>
        </div>

        <div className="topic-head__side">
          <div className="topic-head__stats">
            <span className="chip">
              {total}{' '}
              {plural(locale, total, {
                one: { en: 'task', ru: 'задача' },
                few: { en: 'tasks', ru: 'задачи' },
                many: { en: 'tasks', ru: 'задач' },
              })}
            </span>
            <span className="chip">
              {t(locale, 'module.tasks.done')}: {doneCount}/{total}
            </span>
          </div>
          <div className="topic-head__progress">
            <ProgressBar
              value={doneCount}
              max={total}
              tone="success"
              label={`${meta.title[locale]}: ${t(locale, 'practice.progress')}`}
            />
            <span>{total > 0 ? Math.round((doneCount / total) * 100) : 0}%</span>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="empty">
          <Icon name="reset" size={26} />
          <p>{t(locale, 'practice.loading')}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty">
          <Icon name="spark" size={26} />
          <p>{t(locale, 'practice.blocks.empty')}</p>
        </div>
      ) : (
        <TaskCollection tasks={tasks} groupMode="level" showModuleBadge />
      )}
    </main>
  );
}
