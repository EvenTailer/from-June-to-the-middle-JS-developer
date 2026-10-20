import { Link } from 'react-router-dom';
import { useLocale } from '../../shared/hooks/useLocale';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import { t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';

export function NotFoundPage() {
  const locale = useLocale();
  usePageTitle(t(locale, 'notFound.title'));

  return (
    <main className="page">
      <section className="hero hero--compact">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <span className="eyebrow">
            <Icon name="search" size={15} />
            404
          </span>
          <h1 className="hero__title">{t(locale, 'notFound.title')}</h1>
          <p className="hero__subtitle">{t(locale, 'notFound.subtitle')}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/">
              {t(locale, 'notFound.home')}
              <Icon name="arrow" size={17} />
            </Link>
            <Link className="btn btn--ghost" to="/practice">
              {t(locale, 'nav.practice')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
