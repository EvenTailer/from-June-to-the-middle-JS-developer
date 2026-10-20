import { useEffect, useState } from 'react';
import type { Chapter } from '../../entities/module/model/types';
import { loadChapters } from '../../shared/content/chapters';
import { useLocale } from '../../shared/hooks/useLocale';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { CodeBlock } from '../../shared/ui/CodeBlock';

interface ModuleTheoryProps {
  moduleId: string;
}

export function ModuleTheory({ moduleId }: ModuleTheoryProps) {
  const locale = useLocale();
  const [loaded, setLoaded] = useState<{ moduleId: string; chapters: Chapter[] } | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    loadChapters(moduleId).then((chapters) => {
      if (!active) return;
      setLoaded({ moduleId, chapters });
      setOpenId(chapters[0]?.id ?? null);
    });

    return () => {
      active = false;
    };
  }, [moduleId]);

  const loading = loaded?.moduleId !== moduleId;
  const chapters = loading ? [] : (loaded?.chapters ?? []);

  if (loading) {
    return (
      <div className="empty">
        <Icon name="reset" size={26} />
        <p>{t(locale, 'practice.loading')}</p>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="empty">
        <Icon name="book" size={26} />
        <p>{t(locale, 'theory.empty')}</p>
      </div>
    );
  }

  return (
    <div className="theory">
      {chapters.map((chapter, chapterIndex) => {
        const open = openId === chapter.id;

        return (
          <section key={chapter.id} className={`theory-chapter${open ? ' is-open' : ''}`}>
            <button
              type="button"
              className="theory-chapter__head"
              onClick={() => setOpenId(open ? null : chapter.id)}
              aria-expanded={open}
            >
              <span className="theory-chapter__num">
                {String(chapterIndex + 1).padStart(2, '0')}
              </span>
              <span className="theory-chapter__titles">
                <strong>{chapter.title[locale]}</strong>
                <span>{chapter.summary[locale]}</span>
              </span>
              <Icon name="chevron" size={18} className="theory-chapter__chevron" />
            </button>

            {open && (
              <div className="theory-chapter__body">
                {chapter.sections.map((section) => (
                  <article key={section.id} className="theory-section">
                    <h3>{section.title[locale]}</h3>

                    <div className="theory-section__text">
                      {section.body[locale]
                        .split('\n\n')
                        .filter(Boolean)
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="theory-section__list">
                        {section.bullets.map((bullet, index) => (
                          <li key={index}>{bullet[locale]}</li>
                        ))}
                      </ul>
                    )}

                    {section.code && (
                      <div className="theory-section__code">
                        <CodeBlock code={section.code} />
                      </div>
                    )}

                    {section.takeaway && (
                      <div className="theory-takeaway">
                        <span className="label">{t(locale, 'theory.takeaway')}</span>
                        <p>{section.takeaway[locale]}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
