import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Module, QuizQuestion } from '../../entities/module/model/types';
import { useLocale } from '../../shared/hooks/useLocale';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { setQuizScore } from '../../shared/store/progressSlice';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { ProgressBar } from '../../shared/ui/ProgressBar';

interface ModuleQuizProps {
  module: Module;
  questions: QuizQuestion[];
  blockId: string;
  blockTitle?: string;
  onBackToModule?: () => void;
  onBackToBlocks?: () => void;
}

function shuffle(length: number): number[] {
  const order = Array.from({ length }, (_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function ModuleQuiz({
  module,
  questions,
  blockId,
  blockTitle,
  onBackToModule,
  onBackToBlocks,
}: ModuleQuizProps) {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const quizScores = useAppSelector((s) => s.progress.quizScores);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState(() => shuffle(questions.length));

  const ordered = useMemo(
    () => order.map((item) => questions[item]).filter(Boolean),
    [order, questions]
  );

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const total = questions.length;
  const bestScore = quizScores[blockId] ?? 0;

  if (total === 0) {
    return (
      <div className="empty">
        <Icon name="quiz" size={26} />
        <p>{t(locale, 'quiz.empty')}</p>
      </div>
    );
  }

  const retry = () => {
    setIndex(0);
    setAnswers({});
    setChecked({});
    setOrder(shuffle(questions.length));
    setFinished(false);
  };

  const exit = () => {
    if (onBackToBlocks) onBackToBlocks();
    else if (onBackToModule) onBackToModule();
  };

  if (finished) {
    const percent = Math.round((score / total) * 100);
    const resultKey =
      percent >= 80 ? 'quiz.result.excellent' : percent >= 60 ? 'quiz.result.good' : 'quiz.result.practice';

    return (
      <div className="quiz-panel">
        <section className="result-card">
          <div
            className="score-ring"
            style={{
              background: `conic-gradient(var(--accent) ${percent}%, var(--ring-track) 0)`,
            }}
          >
            <div className="score-ring__inner">
              <strong>{percent}%</strong>
              <span>
                {score}/{total}
              </span>
            </div>
          </div>
          <h2>{t(locale, 'quiz.result.title')}</h2>
          <p className="result-card__lead">{t(locale, resultKey)}</p>
          <div className="result-card__actions">
            <button type="button" className="btn btn--primary" onClick={retry}>
              <Icon name="reset" size={16} />
              {t(locale, 'quiz.retry')}
            </button>
            <button type="button" className="btn btn--ghost" onClick={exit}>
              {t(locale, 'quiz.blocks.allBlocks')}
            </button>
            {onBackToModule ? (
              <button type="button" className="btn btn--ghost" onClick={onBackToModule}>
                {t(locale, 'quiz.backToLearn')}
              </button>
            ) : (
              <Link className="btn btn--ghost" to={`/module/${module.id}`}>
                {t(locale, 'quiz.backToModule')}
              </Link>
            )}
          </div>
        </section>

        <section className="review">
          <h2>{t(locale, 'quiz.review')}</h2>
          <div className="review__list">
            {ordered.map((question, questionIndex) => {
              const userAnswer = answers[question.id];
              const correct = userAnswer === question.correctIndex;
              return (
                <details key={question.id} className={`review-item${correct ? ' is-correct' : ' is-wrong'}`}>
                  <summary>
                    <span className="review-item__mark">
                      <Icon name={correct ? 'check' : 'close'} size={15} />
                    </span>
                    <span className="review-item__text">
                      {questionIndex + 1}. {question.question[locale]}
                    </span>
                    <span className="review-item__verdict">
                      {correct ? t(locale, 'quiz.correct') : t(locale, 'quiz.wrong')}
                    </span>
                  </summary>
                  <div className="review-item__body">
                    <p>
                      <span className="label">{t(locale, 'quiz.yourAnswer')}</span>{' '}
                      {userAnswer === undefined ? '—' : question.options[userAnswer]?.[locale]}
                    </p>
                    {!correct && (
                      <p>
                        <span className="label">{t(locale, 'quiz.correctAnswer')}</span>{' '}
                        {question.options[question.correctIndex]?.[locale]}
                      </p>
                    )}
                    {question.explanation && (
                      <p className="review-item__explanation">
                        <span className="label">{t(locale, 'quiz.explanation')}</span>{' '}
                        {question.explanation[locale]}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  const question = ordered[index];
  const selected = answers[question.id];
  const isChecked = Boolean(checked[question.id]);
  const isLast = index === total - 1;
  const progress = Math.round(((index + (isChecked ? 1 : 0)) / total) * 100);

  const advance = () => {
    if (isLast) {
      dispatch(setQuizScore({ blockId, score }));
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <div className="quiz-panel">
      <section className="quiz-head">
        <div>
          <h2>{blockTitle ?? t(locale, 'quiz.title')}</h2>
          <p>{module.title[locale]}</p>
        </div>
        <div className="quiz-head__meta">
          {bestScore > 0 && (
            <span className="chip chip--accent">
              {t(locale, 'quiz.best')}: {bestScore}/{total}
            </span>
          )}
          <span className="chip">
            {index + 1} {t(locale, 'quiz.of')} {total}
          </span>
        </div>
      </section>

      <div className="quiz-progress">
        <ProgressBar value={index + (isChecked ? 1 : 0)} max={total} label={t(locale, 'progress')} />
        <span>{progress}%</span>
      </div>

      <section className="quiz-card">
        <p className="quiz-card__question">
          <span className="label">
            {t(locale, 'quiz.question')} {index + 1}
          </span>
          {question.question[locale]}
        </p>

        <div className="options">
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            const isCorrect = isChecked && optionIndex === question.correctIndex;
            const isWrong = isChecked && isSelected && optionIndex !== question.correctIndex;
            const className = [
              'option',
              isSelected ? 'is-selected' : '',
              isCorrect ? 'is-correct' : '',
              isWrong ? 'is-wrong' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={optionIndex}
                type="button"
                className={className}
                onClick={() => {
                  if (isChecked) return;
                  setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
                }}
                disabled={isChecked}
                aria-pressed={isSelected}
              >
                <span className="option__key">{String.fromCharCode(65 + optionIndex)}</span>
                <span className="option__text">{option[locale]}</span>
                {isCorrect && <Icon name="check" size={17} className="option__icon" />}
              </button>
            );
          })}
        </div>

        {isChecked && (
          <div className={`quiz-feedback ${selected === question.correctIndex ? 'is-correct' : 'is-wrong'}`}>
            <strong>
              {selected === question.correctIndex
                ? t(locale, 'quiz.correct')
                : t(locale, 'quiz.wrong')}
            </strong>
            {question.explanation && <p>{question.explanation[locale]}</p>}
          </div>
        )}

        <div className="quiz-card__actions">
          {!isChecked ? (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setChecked((current) => ({ ...current, [question.id]: true }))}
              disabled={selected === undefined}
            >
              {t(locale, 'quiz.check')}
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={advance}>
              {isLast ? t(locale, 'quiz.results') : t(locale, 'quiz.next')}
              <Icon name="arrow" size={16} />
            </button>
          )}
          <button type="button" className="btn btn--ghost" onClick={exit}>
            {t(locale, 'quiz.blocks.allBlocks')}
          </button>
        </div>
      </section>
    </div>
  );
}
