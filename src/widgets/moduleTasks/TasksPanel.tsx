import { useEffect, useState } from 'react';
import type { Module, PracticeTask } from '../../entities/module/model/types';
import { getModuleTaskTotal, loadModuleTopicTasks } from '../../shared/content/tasks';
import { taskModuleById } from '../../shared/content/tasks/taskIndex';
import { useLocale } from '../../shared/hooks/useLocale';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';
import { TaskCollection } from './TaskCollection';

interface TasksPanelProps {
  module: Module;
}

export function TasksPanel({ module }: TasksPanelProps) {
  const locale = useLocale();
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);
  const [loaded, setLoaded] = useState<{ moduleId: string; tasks: PracticeTask[] } | null>(null);

  useEffect(() => {
    let active = true;

    loadModuleTopicTasks(module.id).then((tasks) => {
      if (!active) return;
      setLoaded({ moduleId: module.id, tasks });
    });

    return () => {
      active = false;
    };
  }, [module.id]);

  const loading = loaded?.moduleId !== module.id;
  const tasks = [...(module.tasks ?? []), ...(loading ? [] : (loaded?.tasks ?? []))];
  const taskTotal = getModuleTaskTotal(module.id);
  const doneCount = completedTasks.filter((id) => taskModuleById[id] === module.id).length;

  return (
    <div className="practice">
      <section className="practice-intro">
        <span className="practice-intro__icon">
          <Icon name="spark" size={22} />
        </span>
        <div className="practice-intro__body">
          <h2>{t(locale, 'practice.title')}</h2>
          <p>{t(locale, 'practice.subtitle')}</p>
        </div>
        {taskTotal > 0 && (
          <div className="practice-intro__progress">
            <span>
              <b>{doneCount}</b> / {taskTotal} {t(locale, 'practice.solved')}
            </span>
            <ProgressBar
              value={doneCount}
              max={taskTotal}
              tone="success"
              label={t(locale, 'practice.progress')}
            />
          </div>
        )}
      </section>

      {loading ? (
        <div className="empty">
          <Icon name="reset" size={26} />
          <p>{t(locale, 'practice.loading')}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty">
          <Icon name="spark" size={26} />
          <p>{t(locale, 'practice.empty')}</p>
        </div>
      ) : (
        <TaskCollection tasks={tasks} />
      )}
    </div>
  );
}
