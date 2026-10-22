import { useEffect, useMemo, useState } from 'react';
import type { Chapter, ChapterCallout, ChapterSection } from '../../entities/module/model/types';
import { loadChapters } from '../../shared/content/chapters';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useLocale } from '../../shared/hooks/useLocale';
import { toggleChapterRead, chapterProgressKey } from '../../shared/store/progressSlice';
import { plural, t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import { CodeBlock } from '../../shared/ui/CodeBlock';

interface ModuleTheoryProps {
  moduleId: string;
}

const CALLOUT_LABELS: Record<ChapterCallout['tone'], { en: string; ru: string }> = {
  note: { en: 'Note', ru: 'Заметка' },
  tip: { en: 'Tip', ru: 'Совет' },
  warning: { en: 'Warning', ru: 'Внимание' },
  pitfall: { en: 'Pitfall', ru: 'Ловушка' },
};

function sectionHaystack(section: ChapterSection, locale: 'en' | 'ru'): string {
  return [
    section.title[locale],
    section.body[locale],
    section.bullets?.map((bullet) => bullet[locale]) ?? [],
    section.takeaway?.[locale] ?? '',
    section.code ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

export function ModuleTheory({ moduleId }: ModuleTheoryProps) {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const readChapters = useAppSelector((s) => s.progress.readChapters);
  const [loaded, setLoaded] = useState<{ moduleId: string; chapters: Chapter[] } | null>(null);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;

    loadChapters(moduleId).then((chapters) => {
      if (!active) return;
      setLoaded({ moduleId, chapters });
      setOpenIds(chapters.length > 0 ? [chapters[0].id] : []);
      setQuery('');
    });

    return () => {
      active = false;
    };
  }, [moduleId]);

  const loading = loaded?.moduleId !== moduleId;
  const chapters = useMemo(
    () => (loading ? [] : (loaded?.chapters ?? [])),
    [loading, loaded]
  );
  const read = useMemo(
    () =>
      new Set(
        readChapters
          .filter((key) => key.startsWith(`${moduleId}::`))
          .map((key) => key.slice(moduleId.length + 2))
      ),
    [readChapters, moduleId]
  );

  const needle = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!needle) {
      return chapters.map((chapter) => ({ chapter, sections: chapter.sections }));
    }
    return chapters
      .map((chapter) => {
        const matches =
          `${chapter.title[locale]} ${chapter.summary[locale]}`.toLowerCase().includes(needle);
        const sections = matches
          ? chapter.sections
          : chapter.sections.filter((section) => sectionHaystack(section, locale).includes(needle));
        return { chapter, sections };
      })
      .filter((entry) => entry.sections.length > 0);
  }, [chapters, locale, needle]);

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

  const readCount = chapters.filter((chapter) => read.has(chapter.id)).length;
  const allOpen = visible.length > 0 && visible.every((entry) => openIds.includes(entry.chapter.id));

  const toggleChapter = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setOpenIds(allOpen ? [] : visible.map((entry) => entry.chapter.id));
  };

  const openChapter = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    window.setTimeout(() => {
      document.getElementById(`chapter-${id}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 140);
  };

  /**
   * Closes a chapter and brings the reader back to its head, so a long
   * chapter can be closed from the bottom without scrolling up.
   */
  const collapseChapter = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : prev));
    window.setTimeout(() => {
      document.getElementById(`chapter-${id}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 140);
  };

  return (
    <div className="theory">
      <div className="toolbar">
        <label className="search">
          <Icon name="search" size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(locale, 'theory.search')}
            aria-label={t(locale, 'theory.search')}
          />
        </label>

        <div className="theory-toolbar__actions">
          <span className="theory-progress">
            {t(locale, 'theory.readProgress')} {readCount} / {chapters.length}
          </span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={toggleAll}>
            {allOpen ? t(locale, 'theory.collapseAll') : t(locale, 'theory.expandAll')}
          </button>
        </div>
      </div>

      {visible.length === 0 && (
        <div className="empty">
          <Icon name="search" size={26} />
          <p>{t(locale, 'theory.searchEmpty')}</p>
        </div>
      )}

      {visible.map(({ chapter, sections }, chapterIndex) => {
        const open = openIds.includes(chapter.id);
        const isRead = read.has(chapter.id);
        const position = chapters.findIndex((item) => item.id === chapter.id);
        const previous = position > 0 ? chapters[position - 1] : null;
        const next = position < chapters.length - 1 ? chapters[position + 1] : null;

        return (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className={`theory-chapter${open ? ' is-open' : ''}${isRead ? ' is-read' : ''}`}
          >
            <button
              type="button"
              className="theory-chapter__head"
              onClick={() => toggleChapter(chapter.id)}
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

            <div className="theory-chapter__bar">
              <button
                type="button"
                className={`theory-read${isRead ? ' is-on' : ''}`}
                onClick={() => dispatch(toggleChapterRead(chapterProgressKey(moduleId, chapter.id)))}
                aria-pressed={isRead}
              >
                <Icon name="check" size={15} />
                {isRead ? t(locale, 'theory.read') : t(locale, 'theory.markRead')}
              </button>
              <span className="theory-chapter__count">
                {sections.length}{' '}
                {plural(locale, sections.length, {
                  one: { en: 'section', ru: 'секция' },
                  few: { en: 'sections', ru: 'секции' },
                  many: { en: 'sections', ru: 'секций' },
                })}
              </span>
            </div>

            {open && (
              <div className="theory-chapter__body">
                {sections.map((section) => (
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

                    {section.table && (
                      <div className="theory-table-wrap">
                        {section.table.caption && (
                          <p className="theory-table__caption">{section.table.caption[locale]}</p>
                        )}
                        <table className="theory-table">
                          <thead>
                            <tr>
                              {section.table.headers.map((header, index) => (
                                <th key={index}>{header[locale]}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex}>{cell[locale]}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.callouts && section.callouts.length > 0 && (
                      <div className="theory-callouts">
                        {section.callouts.map((callout, index) => (
                          <aside
                            key={index}
                            className={`theory-callout theory-callout--${callout.tone}`}
                          >
                            <span className="theory-callout__label">
                              {callout.title
                                ? callout.title[locale]
                                : CALLOUT_LABELS[callout.tone][locale]}
                            </span>
                            <p>{callout.text[locale]}</p>
                          </aside>
                        ))}
                      </div>
                    )}

                    {section.seeAlso && section.seeAlso.length > 0 && (
                      <div className="theory-seealso">
                        <span className="theory-seealso__label">{t(locale, 'theory.seeAlso')}</span>
                        <ul>
                          {section.seeAlso.map((item, index) => (
                            <li key={index}>{item[locale]}</li>
                          ))}
                        </ul>
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

                <nav className="theory-nav">
                  {previous ? (
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => openChapter(previous.id)}
                    >
                      <Icon name="arrow" size={15} className="theory-nav__prev" />
                      {previous.title[locale]}
                    </button>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => openChapter(next.id)}
                    >
                      {next.title[locale]}
                      <Icon name="arrow" size={15} />
                    </button>
                  ) : (
                    <span />
                  )}
                </nav>

                <div className="theory-chapter__foot">
                  <button
                    type="button"
                    className={`theory-read${isRead ? ' is-on' : ''}`}
                    onClick={() =>
                      dispatch(toggleChapterRead(chapterProgressKey(moduleId, chapter.id)))
                    }
                    aria-pressed={isRead}
                  >
                    <Icon name="check" size={15} />
                    {isRead ? t(locale, 'theory.read') : t(locale, 'theory.markRead')}
                  </button>

                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => collapseChapter(chapter.id)}
                  >
                    <Icon name="chevron" size={15} className="theory-chapter__foot-chevron" />
                    {t(locale, 'theory.collapse')}
                  </button>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
