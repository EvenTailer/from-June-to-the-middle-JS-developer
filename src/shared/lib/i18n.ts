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
  'home.trainer.title': { en: 'Practice trainer', ru: 'Тренажёр' },
  'home.trainer.subtitle': {
    en: 'Topic blocks with coding drills: loops, functions, arrays, DOM, async, architecture, React hooks and more. Write the code yourself, then compare with the solution.',
    ru: 'Блоки по темам: циклы, функции, массивы, DOM, асинхронность, архитектура, React-хуки и многое другое. Пишите код сами, потом сверяйтесь с решением.',
  },
  'home.trainer.cta': { en: 'Open trainer', ru: 'Открыть тренажёр' },
  'home.trainer.blocks': { en: 'blocks', ru: 'блоков' },
  'home.trainer.tasks': { en: 'tasks', ru: 'задач' },
  'home.trainer.solved': { en: 'solved', ru: 'решено' },
  'home.stats.completed': { en: 'questions learned', ru: 'вопросов изучено' },
  'home.stats.lessons': { en: 'total questions', ru: 'всего вопросов' },
  'home.stats.theory': { en: 'theory', ru: 'теория' },
  'home.stats.textbook': { en: 'textbook', ru: 'учебник' },
  'home.stats.chapters': { en: 'chapters read', ru: 'глав прочитано' },
  'home.stats.practice': { en: 'practice', ru: 'практика' },
  'home.stats.overall': { en: 'overall progress', ru: 'общий прогресс' },
  'home.stats.quizzes': { en: 'quizzes passed', ru: 'тестов пройдено' },
  'home.stats.tasks': { en: 'tasks solved', ru: 'задач решено' },
  'home.progress': { en: 'Overall progress', ru: 'Общий прогресс' },
  'home.progress.formula': {
    en: 'Overall progress = 15% questions + 35% textbook + 50% practice',
    ru: 'Общий прогресс = 15% вопросов + 35% учебника + 50% практики',
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
  'module.chapters.read': { en: 'Chapters read', ru: 'Глав прочитано' },
  'module.search': { en: 'Search questions…', ru: 'Поиск по вопросам…' },
  'module.filter.all': { en: 'All', ru: 'Все' },
  'module.filter.todo': { en: 'To learn', ru: 'Изучить' },
  'module.filter.done': { en: 'Learned', ru: 'Изучено' },
  'module.expandAll': { en: 'Expand all', ru: 'Раскрыть все' },
  'module.collapseAll': { en: 'Collapse all', ru: 'Свернуть все' },
  'module.empty': { en: 'Nothing matches these filters.', ru: 'Ничего не найдено по этим фильтрам.' },
  'module.quiz.best': { en: 'Best quiz', ru: 'Лучший тест' },
  'module.notFound': { en: 'Module not found.', ru: 'Модуль не найден.' },
  'module.loading': { en: 'Loading the module…', ru: 'Загружаем модуль…' },
  'module.learn': { en: 'Learn', ru: 'Обучение' },
  'module.tabs': { en: 'Module sections', ru: 'Разделы модуля' },
  'module.tab.learn': { en: 'Questions', ru: 'Вопросы' },
  'module.tab.theory': { en: 'Textbook', ru: 'Учебник' },
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
  'practice.runner.title': { en: 'Your code', ru: 'Ваш код' },
  'practice.runner.contract': {
    en: 'Define a function named solution. The runner calls solution(...) with the input of a case and compares the result with the expected output. Separate several arguments with a comma, an array stays a single argument. The code runs in a sandbox: no page, no DOM.',
    ru: 'Определите функцию с именем solution. Раннер вызывает solution(...) с входом из кейса и сравнивает результат с ожидаемым выводом. Несколько аргументов разделяйте запятой, массив остаётся одним аргументом. Код выполняется в песочнице: без страницы и без DOM.',
  },
  'practice.runner.editorLabel': { en: 'Code of the learner', ru: 'Код ученика' },
  'practice.runner.frameTitle': { en: 'Sandbox for the code of the learner', ru: 'Песочница для кода ученика' },
  'practice.runner.run': { en: 'Run', ru: 'Запустить' },
  'practice.runner.running': { en: 'Running…', ru: 'Запускаем…' },
  'practice.runner.reset': { en: 'Reset to the solution', ru: 'Вернуть решение' },
  'practice.runner.passedAll': { en: 'All cases passed', ru: 'Все кейсы пройдены' },
  'practice.runner.passedCount': {
    en: '{passed} of {total} cases passed',
    ru: 'Пройдено {passed} из {total} кейсов',
  },
  'practice.runner.case': { en: 'Case {n}', ru: 'Кейс {n}' },
  'practice.runner.expected': { en: 'Expected', ru: 'Ожидалось' },
  'practice.runner.actual': { en: 'Actual', ru: 'Получилось' },
  'practice.runner.error': { en: 'Error', ru: 'Ошибка' },
  'practice.runner.timeout': {
    en: 'The code did not finish in {seconds} seconds. Most likely an endless loop.',
    ru: 'Код не отработал за {seconds} с. Скорее всего бесконечный цикл.',
  },
  'practice.runner.noSolution': {
    en: 'The code does not define a function named solution.',
    ru: 'В коде нет функции с именем solution.',
  },
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
  'notFound.title': { en: 'Page not found', ru: 'Страница не найдена' },
  'notFound.subtitle': {
    en: 'The link is broken or the page was moved. Use the navigation to continue.',
    ru: 'Ссылка битая или страница переехала. Вернитесь через навигацию.',
  },
  'notFound.home': { en: 'Go home', ru: 'На главную' },
  'quiz.backToLearn': { en: 'Back to learning', ru: 'К обучению' },
  'quiz.blocks.title': { en: 'Quiz blocks', ru: 'Тесты по блокам' },
  'quiz.blocks.subtitle': {
    en: 'Each block is a short test of 10 questions on one topic. Pass a block to move on.',
    ru: 'Каждый блок — короткий тест из 10 вопросов по одной теме. Пройдите блок, чтобы идти дальше.',
  },
  'quiz.blocks.questions': { en: 'questions', ru: 'вопросов' },
  'quiz.blocks.start': { en: 'Start block', ru: 'Начать блок' },
  'quiz.blocks.passed': { en: 'Passed', ru: 'Пройдено' },
  'quiz.blocks.notStarted': { en: 'not started', ru: 'не начат' },
  'quiz.blocks.allBlocks': { en: 'All blocks', ru: 'Все блоки' },

  'lesson.question': { en: 'Question', ru: 'Вопрос' },
  'lesson.answer': { en: 'Answer', ru: 'Ответ' },
  'lesson.markComplete': { en: 'Mark as learned', ru: 'Отметить изученным' },
  'lesson.completed': { en: 'Learned', ru: 'Изучено' },
  'lesson.next': { en: 'Next question', ru: 'Следующий вопрос' },
  'lesson.showAnswer': { en: 'Show answer', ru: 'Показать ответ' },
  'code.copy': { en: 'Copy', ru: 'Копировать' },
  'code.copied': { en: 'Copied', ru: 'Скопировано' },

  'quiz.title': { en: 'Module Quiz', ru: 'Тест по модулю' },
  'theory.empty': { en: 'Chapters for this module are coming soon.', ru: 'Главы этого модуля скоро появятся.' },
  'theory.takeaway': { en: 'Remember', ru: 'Запомни' },
  'theory.seeAlso': { en: 'See also', ru: 'См. также' },
  'theory.chapters': { en: 'chapters', ru: 'глав' },
  'theory.search': { en: 'Search the textbook', ru: 'Поиск по учебнику' },
  'theory.searchEmpty': { en: 'Nothing found in this module', ru: 'В этом модуле ничего не найдено' },
  'theory.read': { en: 'Read', ru: 'Прочитано' },
  'theory.markRead': { en: 'Mark as read', ru: 'Отметить прочитанной' },
  'theory.readProgress': { en: 'Read', ru: 'Прочитано' },
  'theory.expandAll': { en: 'Expand all', ru: 'Развернуть все' },
  'theory.collapseAll': { en: 'Collapse all', ru: 'Свернуть все' },
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
