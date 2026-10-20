import { Link } from 'react-router-dom';
import { getTopicTaskTotal, totalTaskCount } from '../../shared/content/tasks';
import { taskTopicById } from '../../shared/content/tasks/taskIndex';
import { practiceTopics } from '../../shared/content/tasks/topics';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';

export function PracticePage() {
  const locale = useLocale();
  usePageTitle(
    locale === 'en' ? 'Practice trainer · JS to Middle' : 'Тренажёр · От новичка до middle'
  );
  const completedTasks = useAppSelector((s) => s.progress.completedTasks);

  const blocks = practiceTopics.map((meta) => {
    const total = getTopicTaskTotal(meta.id);
    const done = completedTasks.filter((id) => taskTopicById[id] === meta.id).length;
    return { meta, total, done };
  });

  const doneTasks = blocks.reduce((sum, block) => sum + block.done, 0);

  return (
    <main className="page">
      <section className="hero hero--compact">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <span className="eyebrow">
            <Icon name="spark" size={15} />
            {t(locale, 'practice.blocks.title')}
          </span>
          <h1 className="hero__title">{t(locale, 'practice.blocks.title')}</h1>
          <p className="hero__subtitle">{t(locale, 'practice.blocks.subtitle')}</p>

          <div className="hero__panel hero__panel--slim">
            <div className="hero__panel-copy">
              <span className="hero__remaining">
                <b>{doneTasks}</b> {t(locale, 'practice.blocks.solvedOf')} {totalTaskCount}
              </span>
              <ProgressBar
                value={doneTasks}
                max={totalTaskCount}
                tone="success"
                label={t(locale, 'practice.blocks.progress')}
              />
            </div>
            <span className="block-count">
              <span>{t(locale, 'practice.blocks.countLabel')}</span>
              <b>{blocks.length}</b>
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="blocks-grid">
          {blocks.map((block) => (
            <Link key={block.meta.id} to={`/practice/${block.meta.id}`} className="block-card">
              <div className="block-card__top">
                <span className="block-card__code">{block.meta.code}</span>
                <span className="block-card__count">
                  {block.done}/{block.total}
                </span>
              </div>
              <h3>{block.meta.title[locale]}</h3>
              <p>{block.meta.description[locale]}</p>
              <ProgressBar
                value={block.done}
                max={block.total}
                tone="success"
                label={block.meta.title[locale]}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
