import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { QuizBlock } from '../../entities/module/model/types';
import { getModuleEntry, loadModule } from '../../shared/content';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ModuleQuiz } from '../../widgets/moduleQuiz/ModuleQuiz';
import { QuizBlockList } from '../../widgets/moduleQuiz/QuizBlockList';

export function QuizPage() {
  const { moduleId } = useParams();
  const locale = useLocale();
  const entry = moduleId ? getModuleEntry(moduleId) : undefined;
  const [blocks, setBlocks] = useState<QuizBlock[] | null>(null);
  const [activeBlock, setActiveBlock] = useState<QuizBlock | null>(null);

  usePageTitle(
    entry
      ? locale === 'en'
        ? `Quiz · ${entry.title.en}`
        : `Тест · ${entry.title.ru}`
      : locale === 'en'
        ? 'Quiz · JS to Middle'
        : 'Тест · От новичка до middle'
  );

  useEffect(() => {
    if (!entry) return;

    let active = true;

    loadModule(entry.id).then((loaded) => {
      if (!active || !loaded) return;
      setBlocks(loaded.quizBlocks ?? []);
    });

    return () => {
      active = false;
    };
  }, [entry]);

  if (!entry) {
    return (
      <main className="page">
        <div className="empty">
          <Icon name="quiz" size={26} />
          <p>{t(locale, 'quiz.notFound')}</p>
          <Link className="btn btn--primary btn--sm" to="/">
            {t(locale, 'module.back')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page page--narrow">
      <div className="crumbs">
        <Link to={`/module/${entry.id}`}>
          <Icon name="arrow" size={15} className="crumbs__back" />
          {t(locale, 'quiz.backToModule')}
        </Link>
      </div>

      {activeBlock ? (
        <ModuleQuiz
          moduleId={entry.id}
          moduleTitle={entry.title[locale]}
          questions={activeBlock.questions}
          blockId={activeBlock.id}
          blockTitle={activeBlock.title[locale]}
          onBackToBlocks={() => setActiveBlock(null)}
        />
      ) : blocks === null ? (
        <div className="empty">
          <Icon name="reset" size={26} />
          <p>{t(locale, 'module.loading')}</p>
        </div>
      ) : (
        <QuizBlockList blocks={blocks} onSelect={setActiveBlock} />
      )}
    </main>
  );
}
