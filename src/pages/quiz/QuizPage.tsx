import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { QuizBlock } from '../../entities/module/model/types';
import { getModule } from '../../shared/content';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ModuleQuiz } from '../../widgets/moduleQuiz/ModuleQuiz';
import { QuizBlockList } from '../../widgets/moduleQuiz/QuizBlockList';

export function QuizPage() {
  const { moduleId } = useParams();
  const locale = useLocale();
  const mod = moduleId ? getModule(moduleId) : undefined;
  const [activeBlock, setActiveBlock] = useState<QuizBlock | null>(null);

  usePageTitle(
    mod
      ? locale === 'en'
        ? `Quiz · ${mod.title.en}`
        : `Тест · ${mod.title.ru}`
      : locale === 'en'
        ? 'Quiz · JS to Middle'
        : 'Тест · От новичка до middle'
  );

  if (!mod) {
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
        <Link to={`/module/${mod.id}`}>
          <Icon name="arrow" size={15} className="crumbs__back" />
          {t(locale, 'quiz.backToModule')}
        </Link>
      </div>

      {activeBlock ? (
        <ModuleQuiz
          module={mod}
          questions={activeBlock.questions}
          blockId={activeBlock.id}
          blockTitle={activeBlock.title[locale]}
          onBackToBlocks={() => setActiveBlock(null)}
        />
      ) : (
        <QuizBlockList module={mod} onSelect={setActiveBlock} />
      )}
    </main>
  );
}
