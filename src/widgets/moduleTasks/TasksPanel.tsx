import { useEffect, useState } from 'react';
import type { PracticeTask } from '../../entities/module/model/types';
import { loadModuleTasks, loadModuleTopicTasks } from '../../shared/content/tasks';
import { useLocale } from '../../shared/hooks/useLocale';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { TaskCollection } from './TaskCollection';

interface TasksPanelProps {
  moduleId: string;
  taskTotal: number;
}

export function TasksPanel({ moduleId, taskTotal }: TasksPanelProps) {
  const locale = useLocale();
  const [loaded, setLoaded] = useState<{ moduleId: string; tasks: PracticeTask[] } | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([loadModuleTasks(moduleId), loadModuleTopicTasks(moduleId)]).then(
      ([moduleTasks, topicTasks]) => {
        if (!active) return;
        setLoaded({ moduleId, tasks: [...moduleTasks, ...topicTasks] });
      }
    );

    return () => {
      active = false;
    };
  }, [moduleId]);

  const loading = loaded?.moduleId !== moduleId;
  const tasks = loading ? [] : (loaded?.tasks ?? []);

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
              <b>{taskTotal}</b> {t(locale, 'module.tasksShort')}
            </span>
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
