import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(process.cwd());
const STRICT = process.argv.includes('--strict');
const WORD_RE = /[\p{L}\p{N}'’-]+/gu;

const MIN_PARAGRAPHS = 3;
const MIN_WORDS_PER_PARAGRAPH = 30;
const MIN_BULLETS = 3;
const MAX_BULLETS = 7;
const MIN_CODE_LINES = 5;
const MIN_SECTION_WORDS = 90;

const errors = [];
const warnings = [];
const stats = [];

function collectFiles(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectFiles(full, out);
    else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) out.push(full);
  }
  return out;
}

function words(text) {
  return (text.match(WORD_RE) ?? []).length;
}

function report(target, level, message) {
  const entry = { target, level, message };
  if (level === 'error') errors.push(entry);
  else warnings.push(entry);
}

function checkLocalized(target, field, value, { required = true } = {}) {
  if (value === undefined) {
    if (required) report(target, 'error', `missing ${field}`);
    return 0;
  }
  if (typeof value !== 'object' || value === null) {
    report(target, 'error', `${field} is not a LocalizedText`);
    return 0;
  }
  const en = value.en;
  const ru = value.ru;
  if (typeof en !== 'string' || !en.trim()) {
    report(target, 'error', `${field}.en is empty`);
    return 0;
  }
  if (typeof ru !== 'string' || !ru.trim()) {
    report(target, 'error', `${field}.ru is empty`);
    return 0;
  }
  if (en.includes('\uFFFD') || ru.includes('\uFFFD')) {
    report(target, 'error', `${field} contains a replacement character (broken encoding)`);
  }
  const enWords = words(en);
  const ruWords = words(ru);
  // Short cells ("+", "O(1)", "true") translate to a different number of words by
  // nature, so the ratio check only applies to prose-length values.
  if (enWords >= 8 && ruWords > 0 && (ruWords < enWords * 0.45 || ruWords > enWords * 1.9)) {
    report(target, 'warning', `${field} ru/en word ratio is ${(ruWords / enWords).toFixed(2)}`);
  }
  return enWords;
}

function checkChapter(target, chapter, seen) {
  if (typeof chapter.id !== 'string' || !chapter.id) {
    report(target, 'error', 'chapter has no id');
    return;
  }
  if (seen.chapters.has(chapter.id)) {
    report(target, 'error', `duplicate chapter id "${chapter.id}"`);
  }
  seen.chapters.add(chapter.id);

  checkLocalized(target, 'title', chapter.title);
  checkLocalized(target, 'summary', chapter.summary);

  const sections = chapter.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    report(target, 'error', `chapter "${chapter.id}" has no sections`);
    return;
  }

  let sectionWords = 0;
  const perSection = [];

  sections.forEach((section, index) => {
    const st = `${target} > ${section.id ?? `section ${index + 1}`}`;
    const expectedId = `${chapter.id}-s${index + 1}`;
    if (section.id !== expectedId) {
      report(st, 'error', `section id should be "${expectedId}"`);
    }
    if (seen.sections.has(section.id)) {
      report(st, 'error', `duplicate section id "${section.id}"`);
    }
    seen.sections.add(section.id);

    checkLocalized(st, 'title', section.title);

    const bodyWords = checkLocalized(st, 'body', section.body);
    sectionWords += bodyWords;

    const paragraphs = String(section.body?.en ?? '')
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length < MIN_PARAGRAPHS) {
      report(st, 'error', `body has ${paragraphs.length} paragraphs, expected at least ${MIN_PARAGRAPHS}`);
    }
    const ruParagraphs = String(section.body?.ru ?? '')
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);
    if (ruParagraphs.length !== paragraphs.length) {
      report(
        st,
        'error',
        `body has ${paragraphs.length} English paragraphs but ${ruParagraphs.length} Russian ones`
      );
    }
    for (const paragraph of paragraphs) {
      if (words(paragraph) < MIN_WORDS_PER_PARAGRAPH) {
        report(st, 'warning', `a body paragraph has only ${words(paragraph)} words`);
      }
    }

    if (!Array.isArray(section.bullets) || section.bullets.length < MIN_BULLETS) {
      report(st, 'error', `bullets: expected at least ${MIN_BULLETS}`);
    } else if (section.bullets.length > MAX_BULLETS) {
      report(st, 'warning', `bullets: ${section.bullets.length} items, expected at most ${MAX_BULLETS}`);
    } else {
      section.bullets.forEach((bullet, i) => checkLocalized(st, `bullets[${i}]`, bullet));
    }

    if (typeof section.code !== 'string' || !section.code.trim()) {
      report(st, 'error', 'code is missing');
    } else {
      const lines = section.code.trim().split('\n').length;
      if (lines < MIN_CODE_LINES) {
        report(st, 'warning', `code has only ${lines} lines`);
      }
    }

    checkLocalized(st, 'takeaway', section.takeaway);

    if (section.table) {
      const { caption, headers, rows } = section.table;
      if (!Array.isArray(headers) || headers.length < 2) {
        report(st, 'error', 'table.headers needs at least 2 columns');
      } else {
        headers.forEach((header, i) => checkLocalized(st, `table.headers[${i}]`, header));
      }
      if (!Array.isArray(rows) || rows.length === 0) {
        report(st, 'error', 'table.rows is empty');
      } else {
        rows.forEach((row, r) => {
          if (!Array.isArray(row) || row.length !== headers.length) {
            report(st, 'error', `table.rows[${r}] has ${row?.length} cells, expected ${headers.length}`);
            return;
          }
          row.forEach((cell, c) => checkLocalized(st, `table.rows[${r}][${c}]`, cell));
        });
      }
      if (caption) checkLocalized(st, 'table.caption', caption);
    }

    if (section.callouts) {
      if (!Array.isArray(section.callouts) || section.callouts.length === 0) {
        report(st, 'error', 'callouts is an empty array');
      } else {
        section.callouts.forEach((callout, i) => {
          const ct = `${st} > callouts[${i}]`;
          if (!['note', 'tip', 'warning', 'pitfall'].includes(callout.tone)) {
            report(ct, 'error', `unknown tone "${callout.tone}"`);
          }
          checkLocalized(ct, 'text', callout.text);
          if (callout.title) checkLocalized(ct, 'title', callout.title);
        });
      }
    }

    if (section.seeAlso) {
      if (!Array.isArray(section.seeAlso) || section.seeAlso.length < 2) {
        report(st, 'warning', 'seeAlso needs at least 2 entries');
      } else {
        section.seeAlso.forEach((item, i) => checkLocalized(st, `seeAlso[${i}]`, item));
      }
    }

    perSection.push({ id: section.id, words: bodyWords, bullets: section.bullets?.length ?? 0 });
  });

  const avg = Math.round(sectionWords / sections.length);
  if (avg < MIN_SECTION_WORDS) {
    report(target, 'warning', `average section body is ${avg} words, expected at least ${MIN_SECTION_WORDS}`);
  }

  stats.push({
    file: relative(ROOT, target).replace(/\\/g, '/'),
    chapterId: chapter.id,
    sections: sections.length,
    words: sectionWords,
    avg,
    tables: sections.filter((s) => s.table).length,
    callouts: sections.filter((s) => s.callouts?.length).length,
    seeAlso: sections.filter((s) => s.seeAlso?.length).length,
  });
}

const seen = { chapters: new Set(), sections: new Set() };
const chaptersDir = join(ROOT, 'src/shared/content/chapters');

/**
 * The localisation helper takes exactly two arguments, one string per language.
 * A body written as one argument pair per paragraph is a common slip and the
 * TypeScript compiler catches it, but the content linter should say it plainly.
 */
function checkLocalizedCallArity(file, source) {
  const pattern = /\bL\(/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const open = match.index + match[0].length - 1;
    let depth = 0;
    let quote = null;
    let commas = 0;
    for (let i = open; i < source.length; i += 1) {
      const ch = source[i];
      if (quote) {
        if (ch === '\\') i += 1;
        else if (ch === quote) quote = null;
        continue;
      }
      if (ch === "'" || ch === '"' || ch === '`') {
        quote = ch;
        continue;
      }
      if (ch === '(' || ch === '[' || ch === '{') depth += 1;
      if (ch === ')' || ch === ']' || ch === '}') {
        depth -= 1;
        if (depth === 0) {
          if (commas > 1) {
            const line = source.slice(0, match.index).split('\n').length;
            report(
              relative(ROOT, file),
              'error',
              `L() at line ${line} takes ${commas + 1} arguments, expected 2 (one per language)`
            );
          }
          pattern.lastIndex = i;
          break;
        }
      }
      if (ch === ',' && depth === 1) commas += 1;
    }
  }
}

for (const file of collectFiles(chaptersDir)) {
  checkLocalizedCallArity(file, readFileSync(file, 'utf8'));
}

/**
 * The chapter counter shown on the module tab must match what the module
 * actually loads, otherwise the UI advertises the wrong number of chapters.
 */
function checkChapterCounts() {
  const source = readFileSync(join(chaptersDir, 'index.ts'), 'utf8');
  const block = source.match(/chapterCountByModule[^=]*=\s*\{([\s\S]*?)\n\};/);
  const declared = new Map();
  if (block) {
    for (const line of block[1].split('\n')) {
      const match = line.match(/'([^']+)':\s*(\d+)|([\w-]+):\s*(\d+)/);
      if (match) declared.set(match[1] ?? match[3], Number(match[2] ?? match[4]));
    }
  }

  const loaders = new Map();
  const loaderBlock = source.match(/const loaders[\s\S]*?= \{([\s\S]*?)\n\};/);
  if (loaderBlock) {
    for (const line of loaderBlock[1].split('\n')) {
      const match = line.match(/(?:'([^']+)'|(\w[\w-]*)):\s*\(\)\s*=>\s*import\('\.\/([^']+)'\)/);
      if (match) loaders.set(match[1] ?? match[2], match[3]);
    }
  }

  for (const [moduleId, count] of declared) {
    const target = loaders.get(moduleId);
    if (!target) continue;

    let found = 0;
    if (target.endsWith('/index')) {
      const dir = join(chaptersDir, target.replace(/\/index$/, ''));
      try {
        found = readdirSync(dir).filter((name) => /^ch\d+\.ts$/.test(name)).length;
      } catch {
        found = 0;
      }
    } else {
      const file = join(chaptersDir, `${target}.ts`);
      found = stats.filter((entry) => entry.file === relative(ROOT, file).replace(/\\/g, '/')).length;
    }

    if (found !== count) {
      report(
        'src/shared/content/chapters/index.ts',
        'error',
        `chapterCountByModule says ${moduleId} has ${count} chapters but ${found} are loaded`
      );
    }
  }
}

// Barrels are checked statically because Node cannot resolve the extensionless
// relative imports that Vite and TypeScript accept.
for (const file of collectFiles(chaptersDir)) {
  if (!file.endsWith('index.ts')) continue;
  const dir = join(file, '..');
  const source = readFileSync(file, 'utf8');
  const imported = [...source.matchAll(/from '\.\/([^']+)'/g)].map((match) => match[1]);
  const available = new Set(
    readdirSync(dir)
      .filter((name) => name.endsWith('.ts') && name !== 'index.ts')
      .map((name) => name.replace(/\.ts$/, ''))
  );
  for (const name of imported) {
    if (!available.has(name)) {
      report(relative(ROOT, file), 'error', `imports "./${name}" but no such file exists`);
    }
  }
  const chapterFiles = [...available].filter((name) => /^ch\d+$/.test(name));
  const barrelChapterImports = imported.filter((name) => /^ch\d+$/.test(name));
  if (chapterFiles.length !== barrelChapterImports.length) {
    report(
      relative(ROOT, file),
      'error',
      `barrel exports ${barrelChapterImports.length} chapter files but ${chapterFiles.length} exist on disk`
    );
  }
}

const files = [
  ...collectFiles(chaptersDir).filter((file) => !file.endsWith('index.ts')),
  join(ROOT, 'src/shared/content/architecture.ts'),
];

for (const file of files) {
  let mod;
  try {
    mod = await import(pathToFileURL(file).href);
  } catch (error) {
    report(relative(ROOT, file), 'error', `cannot import: ${error.message}`);
    continue;
  }

  const found = [];
  for (const value of Object.values(mod)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === 'object' && Array.isArray(item.sections)) found.push(item);
      }
    } else if (value && typeof value === 'object') {
      if (Array.isArray(value.sections)) found.push(value);
      if (Array.isArray(value.chapters)) {
        for (const item of value.chapters) {
          if (item && typeof item === 'object' && Array.isArray(item.sections)) found.push(item);
        }
      }
    }
  }

  for (const chapter of found) {
    checkChapter(relative(ROOT, file).replace(/\\/g, '/'), chapter, seen);
  }
}

checkChapterCounts();

stats.sort((a, b) => a.file.localeCompare(b.file));

const totalChapters = stats.length;
const totalSections = stats.reduce((sum, s) => sum + s.sections, 0);
const totalWords = stats.reduce((sum, s) => sum + s.words, 0);

for (const entry of stats) {
  console.log(
    `${entry.file.padEnd(46)} ${String(entry.chapterId).padEnd(16)} sections=${String(entry.sections).padStart(2)} ` +
      `words=${String(entry.words).padStart(6)} avg=${String(entry.avg).padStart(4)} ` +
      `tables=${entry.tables} callouts=${entry.callouts} seeAlso=${entry.seeAlso}`
  );
}

console.log('');
console.log(
  `chapters=${totalChapters} sections=${totalSections} words=${totalWords} ` +
    `avgWordsPerSection=${Math.round(totalWords / Math.max(totalSections, 1))}`
);

const byFile = new Map();
for (const entry of stats) {
  const current = byFile.get(entry.file) ?? { chapters: 0, sections: 0 };
  current.chapters += 1;
  current.sections += entry.sections;
  byFile.set(entry.file, current);
}
console.log('');
for (const [file, value] of [...byFile.entries()].sort()) {
  console.log(`  ${file.padEnd(46)} chapters=${value.chapters} sections=${value.sections}`);
}

if (warnings.length) {
  console.log('');
  console.log(`WARNINGS (${warnings.length}):`);
  for (const entry of warnings.slice(0, 60)) {
    console.log(`  ${entry.target}: ${entry.message}`);
  }
  if (warnings.length > 60) console.log(`  ... and ${warnings.length - 60} more`);
}

if (errors.length) {
  console.log('');
  console.log(`ERRORS (${errors.length}):`);
  for (const entry of errors.slice(0, 60)) {
    console.log(`  ${entry.target}: ${entry.message}`);
  }
  if (errors.length > 60) console.log(`  ... and ${errors.length - 60} more`);
}

const failed = errors.length > 0 || (STRICT && warnings.length > 0);
console.log('');
console.log(failed ? 'FAILED' : 'OK');
process.exit(failed ? 1 : 0);
