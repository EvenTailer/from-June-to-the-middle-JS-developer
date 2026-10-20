import type { Locale } from '../store/uiSlice';
import type { LocalizedText } from '../../entities/module/model/types';

export interface LocalizedPluralForms {
  one: LocalizedText;
  few: LocalizedText;
  many: LocalizedText;
}

export function plural(locale: Locale, count: number, forms: LocalizedPluralForms): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  const key =
    locale === 'en'
      ? count === 1
        ? 'one'
        : 'many'
      : mod10 === 1 && mod100 !== 11
        ? 'one'
        : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
          ? 'few'
          : 'many';

  return forms[key][locale];
}

export const uiText: Record<string, { en: string; ru: string }> = {
  'nav.home': { en: 'Home', ru: 'Главная' },
  'nav.modules': { en: 'Modules', ru: 'Модули' },
  'theme.toLight': { en: 'Switch to light theme', ru: 'Светлая тема' },
  'theme.toDark': { en: 'Switch to dark theme', ru: 'Тёмная тема' },
  'lang.switch': { en: 'RU', ru: 'EN' },
  'lang.label': { en: 'Language', ru: 'Язык' },
  'footer.tagline': {
    en: 'A practice-first path: 20% theory, 80% hands-on tasks to middle level.',
    ru: 'Путь с фокусом на практику: 20% теории, 80% задач до уровня middle.',
  },

  'home.eyebrow': { en: 'Interactive learning path', ru: 'Интерактивный путь обучения' },
  'home.title': { en: 'JS to Middle Developer', ru: 'От новичка до Middle разработчика' },
  'home.title.accent': { en: 'Middle Developer', ru: 'Middle разработчика' },
  'home.subtitle': {
    en: '20% theory, 80% practice: short answers, quizzes and a large task library that takes you to middle level.',
    ru: '20% теории и 80% практики: короткие ответы, тесты и большая библиотека задач до уровня middle.',
  },
  'home.start': { en: 'Start learning', ru: 'Начать обучение' },
  'home.continue': { en: 'Continue learning', ru: 'Продолжить обучение' },
  'home.startPractice': { en: 'Start practice', ru: 'Начать практику' },
  'home.continuePractice': { en: 'Continue practice', ru: 'Продолжить практику' },
  'home.studyTheory': { en: 'Study theory', ru: 'Изучать теорию' },
  'home.browse': { en: 'Browse modules', ru: 'Все модули' },
  'home.stats.completed': { en: 'questions learned', ru: 'вопросов изучено' },
  'home.stats.lessons': { en: 'total questions', ru: 'всего вопросов' },
  'home.stats.theory': { en: 'theory', ru: 'теория' },
  'home.stats.practice': { en: 'practice', ru: 'практика' },
  'home.stats.overall': { en: 'overall progress', ru: 'общий прогресс' },
  'home.stats.quizzes': { en: 'quizzes passed', ru: 'тестов пройдено' },
  'home.stats.tasks': { en: 'tasks solved', ru: 'задач решено' },
  'home.progress': { en: 'Overall progress', ru: 'Общий прогресс' },
  'home.progress.formula': {
    en: 'Overall progress = 20% theory + 80% practice',
    ru: 'Общий прогресс = 20% теории + 80% практики',
  },
  'home.remaining': { en: 'left to explore', ru: 'осталось изучить' },
  'home.remainingTasks': { en: 'tasks left', ru: 'задач осталось' },
  'home.modules.title': { en: 'Choose a module', ru: 'Выберите модуль' },
  'home.modules.subtitle': {
    en: 'Eleven topics, from markup to Next.js. Open a question to reveal the answer.',
    ru: 'Одиннадцать тем — от вёрстки до Next.js. Открывайте вопрос, чтобы увидеть ответ.',
  },
  'home.search': { en: 'Search modules…', ru: 'Поиск модулей…' },
  'home.reset': { en: 'Reset progress', ru: 'Сбросить прогресс' },
  'home.reset.confirm': {
    en: 'Reset all learning progress? Learned questions, solved tasks and quiz scores will be cleared.',
    ru: 'Сбросить весь прогресс? Изученные вопросы, решённые задачи и результаты тестов будут удалены.',
  },
  'home.empty': { en: 'No modules match your search.', ru: 'По вашему запросу модулей не найдено.' },
  'home.open': { en: 'Open module', ru: 'Открыть модуль' },
  'home.done': { en: 'done', ru: 'изучено' },

  'module.lessons': { en: 'Questions', ru: 'Вопросов' },
  'module.lesson': { en: 'questions', ru: 'вопросов' },
  'module.quiz': { en: 'Take the quiz', ru: 'Пройти тест' },
  'module.back': { en: 'Back to modules', ru: 'К модулям' },
  'module.done': { en: 'Learned', ru: 'Изучено' },
  'module.search': { en: 'Search questions…', ru: 'Поиск по вопросам…' },
  'module.filter.all': { en: 'All', ru: 'Все' },
  'module.filter.todo': { en: 'To learn', ru: 'Изучить' },
  'module.filter.done': { en: 'Learned', ru: 'Изучено' },
  'module.expandAll': { en: 'Expand all', ru: 'Раскрыть все' },
  'module.collapseAll': { en: 'Collapse all', ru: 'Свернуть все' },
  'module.empty': { en: 'Nothing matches these filters.', ru: 'Ничего не найдено по этим фильтрам.' },
  'module.quiz.best': { en: 'Best quiz', ru: 'Лучший тест' },
  'module.notFound': { en: 'Module not found.', ru: 'Модуль не найден.' },
  'module.learn': { en: 'Learn', ru: 'Обучение' },
  'module.tabs': { en: 'Module sections', ru: 'Разделы модуля' },
  'module.tab.learn': { en: 'Learn', ru: 'Обучение' },
  'module.tab.quiz': { en: 'Quiz', ru: 'Тест' },
  'module.tab.tasks': { en: 'Practice', ru: 'Практика' },
  'module.tasks': { en: 'Practice tasks', ru: 'Задачи' },
  'module.tasksShort': { en: 'tasks', ru: 'задач' },
  'module.tasks.done': { en: 'Tasks solved', ru: 'Задач решено' },
  'practice.title': { en: 'Practice tasks', ru: 'Задачи для практики' },
  'practice.level.filter': { en: 'Filter tasks by difficulty', ru: 'Фильтр задач по сложности' },
  'practice.level.all': { en: 'All tasks', ru: 'Все задачи' },
  'practice.level.basic': { en: 'Basics', ru: 'База' },
  'practice.level.intermediate': { en: 'Intermediate', ru: 'Средний' },
  'practice.level.advanced': { en: 'Challenge', ru: 'Продвинутый' },
  'practice.subtitle': {
    en: 'Read the task, try to solve it yourself, then reveal the solution and compare your approach.',
    ru: 'Прочитайте задачу, попробуйте решить её сами, затем откройте решение и сравните подход.',
  },
  'practice.progress': { en: 'Practice progress', ru: 'Прогресс практики' },
  'practice.solved': { en: 'solved', ru: 'решено' },
  'practice.hint': { en: 'Hint', ru: 'Подсказка' },
  'practice.hideHint': { en: 'Hide hint', ru: 'Скрыть подсказку' },
  'practice.showSolution': { en: 'Show solution', ru: 'Показать решение' },
  'practice.hideSolution': { en: 'Hide solution', ru: 'Скрыть решение' },
  'practice.solution': { en: 'Solution', ru: 'Решение' },
  'practice.markSolved': { en: 'Mark as solved', ru: 'Отметить решённой' },
  'practice.solvedState': { en: 'Solved', ru: 'Решено' },
  'practice.explanation': { en: 'Why it works', ru: 'Почему это работает' },
  'practice.empty': { en: 'Practice tasks are coming soon.', ru: 'Задачи для этого модуля скоро появятся.' },
  'practice.loading': { en: 'Loading practice tasks...', ru: 'Загружаем задачи...' },
  'practice.topic.other': { en: 'General practice', ru: 'Общая практика' },
  'practice.blocks.title': { en: 'Practice blocks', ru: 'Блоки практики' },
  'practice.blocks.subtitle': {
    en: 'Coding drills grouped by topic. Pick a block and write the code yourself.',
    ru: 'Тренировочные задания по темам. Выберите блок и напишите код сами.',
  },
  'practice.blocks.stats': { en: 'tasks to write', ru: 'задач на код' },
  'practice.blocks.countLabel': { en: 'Practice blocks', ru: 'Блоков практики' },
  'practice.blocks.solvedOf': { en: 'solved of', ru: 'решено из' },
  'practice.blocks.open': { en: 'Open block', ru: 'Открыть блок' },
  'practice.blocks.back': { en: 'All blocks', ru: 'Все блоки' },
  'practice.blocks.progress': { en: 'Solved in blocks', ru: 'Решено в блоках' },
  'practice.blocks.empty': { en: 'No tasks in this block yet.', ru: 'В этом блоке пока нет задач.' },
  'nav.practice': { en: 'Practice', ru: 'Тренажёр' },
  'quiz.backToLearn': { en: 'Back to learning', ru: 'К обучению' },

  'lesson.question': { en: 'Question', ru: 'Вопрос' },
  'lesson.answer': { en: 'Answer', ru: 'Ответ' },
  'lesson.markComplete': { en: 'Mark as learned', ru: 'Отметить изученным' },
  'lesson.completed': { en: 'Learned', ru: 'Изучено' },
  'lesson.next': { en: 'Next question', ru: 'Следующий вопрос' },
  'lesson.showAnswer': { en: 'Show answer', ru: 'Показать ответ' },
  'code.copy': { en: 'Copy', ru: 'Копировать' },
  'code.copied': { en: 'Copied', ru: 'Скопировано' },

  'quiz.title': { en: 'Module Quiz', ru: 'Тест по модулю' },
  'quiz.submit': { en: 'Submit', ru: 'Проверить' },
  'quiz.score': { en: 'Your score', ru: 'Ваш результат' },
  'quiz.retry': { en: 'Retry', ru: 'Повторить' },
  'quiz.correct': { en: 'Correct', ru: 'Верно' },
  'quiz.wrong': { en: 'Wrong', ru: 'Неверно' },
  'quiz.question': { en: 'Question', ru: 'Вопрос' },
  'quiz.of': { en: 'of', ru: 'из' },
  'quiz.check': { en: 'Check answer', ru: 'Проверить ответ' },
  'quiz.next': { en: 'Next question', ru: 'Следующий вопрос' },
  'quiz.results': { en: 'See results', ru: 'Показать результат' },
  'quiz.best': { en: 'Best', ru: 'Лучший' },
  'quiz.explanation': { en: 'Explanation', ru: 'Пояснение' },
  'quiz.result.title': { en: 'Quiz complete', ru: 'Тест завершён' },
  'quiz.result.excellent': { en: 'Excellent — you own this topic.', ru: 'Отлично — тема освоена.' },
  'quiz.result.good': { en: 'Good job. A quick review will close the gaps.', ru: 'Хорошо. Быстрый разбор закроет пробелы.' },
  'quiz.result.practice': { en: 'Keep practicing — review the answers below.', ru: 'Продолжайте практику — разберите ответы ниже.' },
  'quiz.review': { en: 'Review answers', ru: 'Разобрать ответы' },
  'quiz.yourAnswer': { en: 'Your answer', ru: 'Ваш ответ' },
  'quiz.correctAnswer': { en: 'Correct answer', ru: 'Правильный ответ' },
  'quiz.backToModule': { en: 'Back to module', ru: 'К модулю' },
  'quiz.notFound': { en: 'Module not found.', ru: 'Модуль не найден.' },
  'quiz.empty': { en: 'This module has no quiz yet.', ru: 'В этом модуле пока нет теста.' },
  'progress': { en: 'Progress', ru: 'Прогресс' },
};

export function t(locale: Locale, key: string): string {
  const entry = uiText[key];
  if (!entry) return key;
  return entry[locale];
}
