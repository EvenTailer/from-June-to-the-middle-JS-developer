import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <main className="page">
        <section className="hero hero--compact">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__content">
            <span className="eyebrow">Ошибка</span>
            <h1 className="hero__title">Что-то пошло не так</h1>
            <p className="hero__subtitle">{error.message}</p>
            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={this.handleReset}>
                Попробовать снова
              </button>
              <a className="btn btn--ghost" href="/">
                На главную
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
