import type { LocalizedText, QuizBlock, QuizQuestion } from '../../entities/module/model/types';

const L = (en: string, ru: string): LocalizedText => ({ en, ru });

export const QUIZ_BLOCK_SIZE = 10;

export const quizBlockTitles: Record<string, LocalizedText[]> = {
  'html-css': [
    L('Semantics and landmarks', 'Семантика и ландмарки'),
    L('Accessibility and forms', 'Доступность и формы'),
    L('Box model and cascade', 'Бокс-модель и каскад'),
    L('Flexbox, grid, positioning', 'Флекс, грид и позиционирование'),
    L('Responsive, animation, stacking', 'Адаптивность, анимация, стек'),
  ],
  git: [
    L('Working tree, index, commits', 'Рабочее дерево, индекс, коммиты'),
    L('Branches and merging', 'Ветки и слияние'),
    L('Rebase and history rewriting', 'Rebase и переписывание истории'),
    L('Undoing changes and stash', 'Отмена изменений и stash'),
    L('Remotes, tags, recovery', 'Удалённые репозитории, теги, восстановление'),
  ],
  cli: [
    L('Navigation and files', 'Навигация и файлы'),
    L('Permissions and processes', 'Права доступа и процессы'),
    L('Search: grep, find, rg', 'Поиск: grep, find, rg'),
    L('Pipes, redirects, scripts', 'Паипы, перенаправления, скрипты'),
    L('Archives, env, automation', 'Архивы, окружение, автоматизация'),
  ],
  oop: [
    L('Encapsulation and abstraction', 'Инкапсуляция и абстракция'),
    L('Inheritance and polymorphism', 'Наследование и полиморфизм'),
    L('Composition over inheritance', 'Композиция вместо наследования'),
    L('SOLID in practice', 'SOLID на практике'),
    L('Patterns and value objects', 'Паттерны и value objects'),
  ],
  http: [
    L('Methods and idempotency', 'Методы и идемпотентность'),
    L('Status codes and headers', 'Коды ответов и заголовки'),
    L('Caching: ETag, Cache-Control', 'Кэширование: ETag, Cache-Control'),
    L('HTTPS, TLS, CORS', 'HTTPS, TLS, CORS'),
    L('Auth, REST design, errors', 'Auth, проектирование REST, ошибки'),
  ],
  'js-core': [
    L('Types, coercion, truthy', 'Типы, приведение, truthy'),
    L('Variables, scope, this', 'Переменные, область видимости, this'),
    L('Prototypes, classes, objects', 'Прототипы, классы, объекты'),
    L('Arrays, strings, numbers', 'Массивы, строки, числа'),
    L('Async, promises, event loop', 'Асинхронность, промисы, event loop'),
  ],
  typescript: [
    L('Base types and inference', 'Базовые типы и вывод типов'),
    L('Unions, intersections, narrowing', 'Union, intersection, сужение'),
    L('Interfaces, aliases, generics', 'Интерфейсы, type, дженерики'),
    L('keyof, mapped, conditional', 'keyof, mapped, conditional типы'),
    L('Utility types, satisfies, const', 'Utility types, satisfies, const'),
    L('Classes, modules, strict flags', 'Классы, модули, strict-флаги'),
  ],
  react: [
    L('JSX, components, keys', 'JSX, компоненты, ключи'),
    L('Props, state, re-renders', 'Пропсы, состояние, ререндеры'),
    L('Effects, dependencies, cleanup', 'Эффекты, зависимости, cleanup'),
    L('Refs, context, custom hooks', 'Refs, контекст, кастомные хуки'),
    L('Forms and accessibility', 'Формы и доступность'),
    L('Performance, Suspense, RSC', 'Производительность, Suspense, RSC'),
  ],
  redux: [
    L('Store, actions, reducers', 'Store, actions, редьюсеры'),
    L('createSlice and prepared actions', 'createSlice и prepare-действия'),
    L('Selectors and memoization', 'Селекторы и мемоизация'),
    L('createAsyncThunk and RTK Query', 'createAsyncThunk и RTK Query'),
    L('Entity adapter, listeners, persistence', 'Entity adapter, листенеры, персистентность'),
  ],
  'react-router': [
    L('Routes, nesting, Outlet', 'Маршруты, вложенность, Outlet'),
    L('Navigation hooks', 'Хуки навигации'),
    L('Link, NavLink, forms', 'Link, NavLink, формы'),
    L('Loaders, actions, errorElement', 'Loaders, actions, errorElement'),
    L('Guards, Suspense, breadcrumbs', 'Гарды, Suspense, хлебные крошки'),
  ],
  nextjs: [
    L('App Router: layouts and templates', 'App Router: layouts и templates'),
    L('Server and client components', 'Server и client компоненты'),
    L('Route handlers and server actions', 'Route handlers и server actions'),
    L('Caching, revalidation, ISR', 'Кэш, ревалидация, ISR'),
    L('Metadata, next/image, middleware', 'Метаданные, next/image, middleware'),
    L('Streaming and dynamic rendering', 'Стриминг и динамический рендеринг'),
  ],
  architecture: [
    L('Layers and dependency direction', 'Слои и направление зависимостей'),
    L('Clean architecture, ports and adapters', 'Чистая архитектура, порты и адаптеры'),
    L('Module boundaries and feature structure', 'Границы модулей и структура по фичам'),
    L('Monolith, modular monolith, microservices', 'Монолит, модульный монолит, микросервисы'),
    L('Cross-cutting: events, resilience, observability', 'Сквозные аспекты: события, отказоустойчивость, наблюдаемость'),
  ],
};

export function buildQuizBlocks(moduleId: string, quiz: QuizQuestion[]): QuizBlock[] {
  const titles = quizBlockTitles[moduleId] ?? [];
  const blocks: QuizBlock[] = [];

  for (let i = 0; i < quiz.length; i += QUIZ_BLOCK_SIZE) {
    const questions = quiz.slice(i, i + QUIZ_BLOCK_SIZE);
    const index = blocks.length;

    blocks.push({
      id: `${moduleId}-b${index + 1}`,
      title: titles[index] ?? L(`Part ${index + 1}`, `Часть ${index + 1}`),
      questions,
    });
  }

  return blocks;
}
