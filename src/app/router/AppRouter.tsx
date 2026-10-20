import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '../../widgets/header/Header';
import { HomePage } from '../../pages/home/HomePage';
import { ModulePage } from '../../pages/module/ModulePage';
import { QuizPage } from '../../pages/quiz/QuizPage';
import { PracticePage } from '../../pages/practice/PracticePage';
import { TopicPage } from '../../pages/practice/TopicPage';
import { NotFoundPage } from '../../pages/notFound/NotFoundPage';
import { ErrorBoundary } from '../providers/ErrorBoundary';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { t } from '../../shared/lib/i18n';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function Footer() {
  const locale = useAppSelector((s) => s.ui.language);
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>{t(locale, 'footer.tagline')}</p>
        <p className="site-footer__meta">© {new Date().getFullYear()} JS → Middle</p>
      </div>
    </footer>
  );
}

function AppShell() {
  const theme = useAppSelector((s) => s.ui.theme);
  const locale = useAppSelector((s) => s.ui.language);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="app-shell">
      <Header />
      <ScrollToTop />
      <div className="app-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/module/:moduleId" element={<ModulePage />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/:topicId" element={<TopicPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
