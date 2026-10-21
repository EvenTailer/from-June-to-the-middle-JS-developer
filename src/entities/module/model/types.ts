export type Locale = 'en' | 'ru';

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface Lesson {
  id: string;
  title: LocalizedText;
  question: LocalizedText;
  answer: LocalizedText;
  code?: string;
}

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation?: LocalizedText;
}

export interface QuizBlock {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  questions: QuizQuestion[];
}

export type TaskLevel = 'basic' | 'intermediate' | 'advanced';

export type PracticeTopicId =
  | 'markup'
  | 'loops'
  | 'functions'
  | 'arrays'
  | 'objects'
  | 'strings'
  | 'numbers'
  | 'types'
  | 'async'
  | 'dom'
  | 'errors'
  | 'algorithms'
  | 'git'
  | 'cli'
  | 'oop'
  | 'http'
  | 'security'
  | 'typescript'
  | 'ts-advanced'
  | 'react'
  | 'hooks'
  | 'forms'
  | 'react-perf'
  | 'redux'
  | 'router'
  | 'next'
  | 'testing'
  | 'tooling'
  | 'architecture';

/** One runnable case of a practice task. */
export interface PracticeTest {
  /** JavaScript expression the runner passes to the learner function, as in "[1, 2, 3]". */
  input: string;
  /** Output the runner expects, as the solution prints it. */
  expected: string;
}

export interface PracticeTask {
  id: string;
  moduleId?: string;
  topic?: PracticeTopicId;
  /** Textbook chapter this task drills, as in "js-core-ch3". */
  chapterId?: string;
  level?: TaskLevel;
  title: LocalizedText;
  brief: LocalizedText;
  hint?: LocalizedText;
  solution: string;
  explanation?: LocalizedText;
  /** Cases to run against the code of a learner. A task without them stays read-only. */
  tests?: PracticeTest[];
}

export type CalloutTone = 'note' | 'tip' | 'warning' | 'pitfall';

export interface ChapterCallout {
  tone: CalloutTone;
  title?: LocalizedText;
  text: LocalizedText;
}

export interface ChapterTable {
  caption?: LocalizedText;
  headers: LocalizedText[];
  rows: LocalizedText[][];
}

export interface ChapterSection {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  bullets?: LocalizedText[];
  code?: string;
  takeaway?: LocalizedText;
  table?: ChapterTable;
  callouts?: ChapterCallout[];
  seeAlso?: LocalizedText[];
}

export interface Chapter {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  sections: ChapterSection[];
}

export interface Module {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  lessons: Lesson[];
  chapters?: Chapter[];
  quiz: QuizQuestion[];
  quizBlocks?: QuizBlock[];
  tasks?: PracticeTask[];
}
