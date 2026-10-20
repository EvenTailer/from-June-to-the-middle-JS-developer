import type { Module, QuizBlock } from '../../entities/module/model/types';
import { useLocale } from '../../shared/hooks/useLocale';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';

interface QuizBlockListProps {
  module: Module;
  onSelect: (block: QuizBlock) => void;
}

export function QuizBlockList({ module, onSelect }: QuizBlockListProps) {
  const locale = useLocale();
  const quizScores = useAppSelector((s) => s.progress.quizScores);

  const blocks = module.quizBlocks ?? [];
  const passedCount = blocks.filter(
    (block) => (quizScores[block.id] ?? 0) >= Math.ceil(block.questions.length * 0.6)
  ).length;

  return (
    <div className="quiz-blocks">
      <section className="quiz-blocks__head">
        <div>
          <h2>{t(locale, 'quiz.blocks.title')}</h2>
          <p>{t(locale, 'quiz.blocks.subtitle')}</p>
        </div>
        <span className="chip chip--accent">
          {t(locale, 'quiz.blocks.passed')}: {passedCount}/{blocks.length}
        </span>
      </section>

      <div className="quiz-blocks__grid">
        {blocks.map((block, index) => {
          const best = quizScores[block.id] ?? 0;

          return (
            <button
              key={block.id}
              type="button"
              className={`quiz-block${best > 0 ? ' is-started' : ''}`}
              onClick={() => onSelect(block)}
            >
              <div className="quiz-block__top">
                <span className="quiz-block__num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="quiz-block__count">
                  {block.questions.length} {t(locale, 'quiz.blocks.questions')}
                </span>
              </div>
              <h3>{block.title[locale]}</h3>
              <div className="quiz-block__progress">
                <ProgressBar
                  value={best}
                  max={block.questions.length}
                  tone="success"
                  label={block.title[locale]}
                />
                <span>{best > 0 ? `${best}/${block.questions.length}` : t(locale, 'quiz.blocks.notStarted')}</span>
              </div>
              <span className="quiz-block__cta">
                {t(locale, 'quiz.blocks.start')}
                <Icon name="arrow" size={16} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
