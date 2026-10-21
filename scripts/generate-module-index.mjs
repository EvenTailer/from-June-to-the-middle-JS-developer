// Regenerates src/shared/content/moduleIndex.ts from the module content files.
// The generated file holds the eager metadata and the counts the UI needs
// before any module content is loaded. Do not edit the generated file by hand:
// run `npm run generate:module-index` after the content changes.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.argv[2] ?? process.cwd();
const CONTENT = join(ROOT, 'src/shared/content');
const CHAPTERS = join(CONTENT, 'chapters');

const MODULE_FILES = {
  'html-css': 'htmlCss.ts',
  git: 'git.ts',
  cli: 'cli.ts',
  oop: 'oop.ts',
  http: 'http.ts',
  'js-core': 'jsCore.ts',
  typescript: 'typescript.ts',
  react: 'react.ts',
  redux: 'redux.ts',
  'react-router': 'reactRouter.ts',
  nextjs: 'nextjs.ts',
  architecture: 'architecture.ts',
};

/**
 * The chapter directory of every module. The map is read from the loaders of
 * src/shared/content/chapters/index.ts, so the generator and the runtime always
 * cut the same chapters.
 */
function readChapterDirs() {
  const source = readFileSync(join(CHAPTERS, 'index.ts'), 'utf8');
  const block = source.match(/const loaders[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (!block) throw new Error('chapters/index.ts has no loaders map');

  const dirs = {};
  for (const line of block[1].split('\n')) {
    const match = line.match(/(?:'([^']+)'|([\w-]+)):\s*\(\)\s*=>\s*import\('\.\/([^']+)\/index'\)/);
    if (match) dirs[match[1] ?? match[2]] = match[3];
  }
  if (!Object.keys(dirs).length) throw new Error('chapters/index.ts loads no chapters');

  return dirs;
}

/**
 * The chapters of a module, read from the chapter files the same way the
 * module files are read: the file is imported and the chapter is the exported
 * object that carries an id and sections. The title of a chapter is published
 * so that a quiz block can be titled without loading the chapter itself.
 */
async function readChapters(dir) {
  const files = readdirSync(join(CHAPTERS, dir))
    .filter((name) => /^ch\d+\.ts$/.test(name))
    .sort((a, b) => Number(a.slice(2, -3)) - Number(b.slice(2, -3)));

  const chapters = [];
  for (const file of files) {
    const mod = await import(pathToFileURL(join(CHAPTERS, dir, file)).href);
    const chapter = Object.values(mod).find(
      (value) =>
        value &&
        typeof value === 'object' &&
        typeof value.id === 'string' &&
        Array.isArray(value.sections) &&
        value.title &&
        typeof value.title.en === 'string' &&
        typeof value.title.ru === 'string'
    );

    if (!chapter) throw new Error(`chapters/${dir}/${file} exports no chapter`);
    chapters.push(chapter);
  }

  return chapters;
}

const modules = [];
const lessonModuleById = {};
const chapterIdsByModule = {};
const chapterTitleById = {};

const chapterDirs = readChapterDirs();
const { chapterCountByModule } = await import(pathToFileURL(join(CHAPTERS, 'index.ts')).href);

for (const id of Object.keys(MODULE_FILES)) {
  if (!chapterDirs[id]) throw new Error(`no chapter directory for module "${id}"`);
}
for (const id of Object.keys(chapterDirs)) {
  if (!MODULE_FILES[id]) throw new Error(`chapters/index.ts loads chapters of unknown module "${id}"`);
}

for (const [id, dir] of Object.entries(chapterDirs)) {
  const chapters = await readChapters(dir);
  const ids = [];

  for (const chapter of chapters) {
    if (chapterTitleById[chapter.id]) throw new Error(`duplicate chapter id "${chapter.id}"`);
    ids.push(chapter.id);
    chapterTitleById[chapter.id] = { en: chapter.title.en, ru: chapter.title.ru };
  }

  const declared = chapterCountByModule[id];
  if (declared === undefined) throw new Error(`chapterCountByModule has no entry for "${id}"`);
  if (declared !== ids.length) {
    throw new Error(
      `chapterCountByModule says "${id}" has ${declared} chapters but ${ids.length} chapter files were found`
    );
  }

  chapterIdsByModule[id] = ids;
}

for (const [id, file] of Object.entries(MODULE_FILES)) {
  const mod = await import(pathToFileURL(join(CONTENT, file)).href);
  const source = Object.values(mod).find(
    (value) => value && typeof value === 'object' && Array.isArray(value.lessons)
  );

  if (!source) throw new Error(`${file} exports no module with lessons`);
  if (source.id !== id) throw new Error(`${file} declares id "${source.id}", expected "${id}"`);

  for (const lesson of source.lessons) lessonModuleById[lesson.id] = id;

  modules.push({
    id,
    title: source.title,
    description: source.description,
    lessonCount: source.lessons.length,
    quizCount: source.quiz.length,
  });
}

const entries = modules
  .map(
    (entry) => `  {
    id: '${entry.id}',
    title: { en: ${JSON.stringify(entry.title.en)}, ru: ${JSON.stringify(entry.title.ru)} },
    description: { en: ${JSON.stringify(entry.description.en)}, ru: ${JSON.stringify(entry.description.ru)} },
    lessonCount: ${entry.lessonCount},
    quizCount: ${entry.quizCount},
  },`
  )
  .join('\n');

const chapterIdEntries = Object.entries(chapterIdsByModule)
  .map(([id, ids]) => `  ${JSON.stringify(id)}: ${JSON.stringify(ids)},`)
  .join('\n');

const chapterTitleEntries = Object.entries(chapterTitleById)
  .map(([id, title]) => `  ${JSON.stringify(id)}: ${JSON.stringify(title)},`)
  .join('\n');

const file = `// Generated by scripts/generate-module-index.mjs. Do not edit by hand.
import type { LocalizedText } from '../../entities/module/model/types';

export interface ModuleIndexEntry {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  lessonCount: number;
  quizCount: number;
}

export const moduleIndex: ModuleIndexEntry[] = [
${entries}
];

export const lessonModuleById: Record<string, string> = ${JSON.stringify(lessonModuleById)};

/** The chapters of every module, in the order the textbook shows them. */
export const chapterIdsByModule: Record<string, string[]> = {
${chapterIdEntries}
};

/** The title of every chapter, published so that it needs no chapter chunk. */
export const chapterTitleById: Record<string, LocalizedText> = {
${chapterTitleEntries}
};
`;

writeFileSync(join(CONTENT, 'moduleIndex.ts'), file, 'utf8');

console.log(
  `moduleIndex.ts: ${modules.length} modules, ` +
    `${Object.keys(lessonModuleById).length} lessons, ` +
    `${Object.keys(chapterTitleById).length} chapters, ` +
    `${modules.reduce((sum, entry) => sum + entry.quizCount, 0)} quiz questions`
);
