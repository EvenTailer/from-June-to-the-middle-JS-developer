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

export interface PracticeTask {
  id: string;
  moduleId?: string;
  topic?: PracticeTopicId;
  level?: TaskLevel;
  title: LocalizedText;
  brief: LocalizedText;
  hint?: LocalizedText;
  solution: string;
  explanation?: LocalizedText;
}

export interface ChapterSection {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  bullets?: LocalizedText[];
  code?: string;
  takeaway?: LocalizedText;
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
