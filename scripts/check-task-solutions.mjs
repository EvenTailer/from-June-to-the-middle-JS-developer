// Checks the solution code of every practice task.
//
// The content validator checks the shape of a task but never looks inside the
// solution string, so a task whose exemplar code does not compile passed every
// check.
//
// The samples are of two kinds:
//
//   - A sample of JavaScript is parsed. The compiler would report the
//     parameters of a JavaScript function as "implicitly any" and the
//     properties of a JavaScript class as missing, which is noise: what
//     matters is that the sample is valid JavaScript.
//   - A sample of TypeScript is type-checked with the strict mode on, the
//     same way the compiler of the project checks the code of the app.
//
// The samples that are not JavaScript at all (shell, SQL, HTML, CSS, HTTP
// transcripts) are detected and skipped, and so are the samples that import a
// file of the course, because they cannot be compiled on their own.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import {
  CHECKABLE_LANGUAGES,
  SAMPLE_LANGUAGE,
  hasJsx,
  languageOf,
} from './lib/sample-language.mjs';

const ROOT = process.argv[2] ?? process.cwd();
const TASKS = join(ROOT, 'src/shared/content/tasks');

function collect(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'byModule') continue;
      collect(full, out);
    } else if (entry.endsWith('.ts')) {
      out.push(full);
    }
  }
  return out;
}

const skip = new Set(['index.ts', 'taskIndex.ts', 'counts.ts', 'registry.ts', 'topics.ts']);
const files = collect(TASKS).filter(
  (file) => !skip.has(file.replace(TASKS + '\\', '').replace(/\.ts$/, ''))
);

const samples = [];
for (const file of files) {
  let mod;
  try {
    mod = await import(pathToFileURL(file).href);
  } catch {
    continue;
  }
  const found = [];
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') {
      if (typeof value.id === 'string' && typeof value.solution === 'string') found.push(value);
      else Object.values(value).forEach(walk);
    }
  };
  Object.values(mod).forEach(walk);

  for (const task of found) {
    samples.push({ file, id: task.id, code: task.solution, lang: languageOf(task) });
  }
}

/** The diagnostics of the compiler for one sample, with the line of the message. */
function describe(diagnostic) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ');
  const line =
    diagnostic.file && diagnostic.start !== undefined
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line + 1
      : 0;
  const code = `TS${diagnostic.code}`;
  return { line, code, message };
}

/**
 * Parses a sample of JavaScript. The compiler reports the syntax errors of
 * the sample and nothing else.
 */
function parseSample(code, withJsx) {
  const result = ts.transpileModule(code, {
    fileName: withJsx ? 'sample.tsx' : 'sample.ts',
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      allowJs: true,
    },
  });
  return (result.diagnostics ?? []).map(describe);
}

/**
 * A sample that shows several files at once. The files are marked either with
 * `// file: name.ts` or with a comment that holds the path of the file, as in
 * `// app/posts/loading.tsx`. Such a sample cannot be compiled as one
 * program, so it is split into the files it shows.
 */
function splitTranscript(code) {
  const parts = [];
  let current = null;
  const preamble = [];

  for (const line of code.split(/\r?\n/)) {
    const marker = line.match(/^\s*\/\/\s*file:\s*(.+?)\s*$/);
    const path = line.match(/^\s*\/\/\s*([\w.][\w./-]*\.[a-z]{1,5})\s*$/i);
    const name = marker ? marker[1] : path ? path[1] : null;
    if (name !== null) {
      current = { name, lines: [] };
      parts.push(current);
      continue;
    }
    if (current) current.lines.push(line);
    else preamble.push(line);
  }

  if (parts.length === 0) return null;
  if (preamble.some((line) => line.trim() !== '')) {
    parts.unshift({ name: 'preamble', lines: preamble });
  }
  return parts;
}

/**
 * Writes the sample to disk. A sample that shows several files becomes
 * several files in a folder of their own, so the imports between the files
 * keep working, and every file is a module of its own, so the declarations of
 * one sample do not clash with the declarations of another.
 */
function writeSample(sample, dir, index) {
  const parts = splitTranscript(sample.code);
  const withJsx =
    sample.lang === SAMPLE_LANGUAGE.JSX || sample.lang === SAMPLE_LANGUAGE.TSX;
  const extension = withJsx ? 'tsx' : 'ts';
  const written = [];

  if (!parts) {
    const name = `sample-${index}.${extension}`;
    writeFileSync(join(dir, name), `/* eslint-disable */\nexport {};\n${sample.code}\n`, 'utf8');
    written.push(join(dir, name));
    return written;
  }

  const folder = join(dir, `sample-${index}`);
  mkdirSync(folder, { recursive: true });
  parts.forEach((part) => {
    const relativeName = part.name.replace(/\\/g, '/');
    const safe = relativeName.replace(/\.\./g, '_');
    const body = part.lines.join('\n');
    const declaresExtension = /\.(tsx?|jsx?)$/i.test(safe);
    // A part with JSX needs the .tsx extension, otherwise the compiler reads
    // the tag as a comparison.
    const needsJsx = hasJsx(body);
    const extension = needsJsx
      ? 'tsx'
      : declaresExtension
        ? safe.match(/\.(tsx?|jsx?)$/i)[0].slice(1).toLowerCase()
        : withJsx
          ? 'tsx'
          : 'ts';
    const withExtension = declaresExtension
      ? safe.replace(/\.(tsx?|jsx?)$/i, `.${extension}`)
      : `${safe}.${extension}`;
    const target = join(folder, withExtension);
    mkdirSync(join(target, '..'), { recursive: true });
    writeFileSync(target, `/* eslint-disable */\nexport {};\n${body}\n`, 'utf8');
    written.push(join(folder, withExtension));
  });

  return written;
}

/**
 * The imports of a sample, the plain ones and the dynamic ones. A sample that
 * imports a file of the course or a package that is not installed cannot be
 * compiled on its own, so it is reported as a sample that cannot be checked
 * instead of a broken one.
 */
function importsOf(code) {
  const found = [];
  const pattern =
    /(?:^|[^\w$])(?:import\s+(?:[^'"]*from\s*)?|import\s*\(\s*)['"]([^'"]+)['"]/g;
  let match = pattern.exec(code);
  while (match) {
    found.push(match[1]);
    match = pattern.exec(code);
  }
  return found;
}

/**
 * Tells whether every import of a sample can be resolved inside the project.
 * A sample that imports a file of the course cannot be compiled on its own,
 * unless it shows the file itself.
 */
function canBeCompiled(code) {
  const parts = splitTranscript(code);
  const shown = new Set();
  if (parts) {
    for (const part of parts) {
      const name = part.name.replace(/\\/g, '/');
      const base = name.split('/').pop();
      for (const candidate of [name, base]) {
        shown.add(candidate);
        shown.add(candidate.replace(/\.(tsx?|jsx?)$/i, ''));
      }
    }
  }

  for (const specifier of importsOf(code)) {
    if (specifier.startsWith('@/') || specifier.startsWith('~/')) return false;
    if (specifier.startsWith('.')) {
      if (!parts) return false;
      const target = specifier.replace(/^\.\//, '').replace(/\.(tsx?|jsx?)$/i, '');
      const base = target.split('/').pop();
      if (!shown.has(target) && !shown.has(base)) return false;
      continue;
    }
    const packageName = specifier.startsWith('@')
      ? specifier.split('/').slice(0, 2).join('/')
      : specifier.split('/')[0];
    if (!existsSync(join(ROOT, 'node_modules', packageName))) return false;
  }
  return true;
}

const failures = new Map();
const record = (sample, errors) => {
  if (errors.length === 0) return;
  failures.set(sample, errors);
};

// The JavaScript samples are parsed here, the TypeScript samples are checked
// by the compiler below.
const skippedByLanguage = new Map();
const skippedByImport = [];
const jsSamples = [];
const tsSamples = [];

for (const sample of samples) {
  if (!CHECKABLE_LANGUAGES.has(sample.lang)) {
    skippedByLanguage.set(sample.lang, (skippedByLanguage.get(sample.lang) ?? 0) + 1);
    continue;
  }
  if (!canBeCompiled(sample.code)) {
    skippedByImport.push(sample);
    continue;
  }
  if (sample.lang === SAMPLE_LANGUAGE.JS || sample.lang === SAMPLE_LANGUAGE.JSX) {
    jsSamples.push(sample);
  } else {
    tsSamples.push(sample);
  }
}

for (const sample of jsSamples) {
  const withJsx = sample.lang === SAMPLE_LANGUAGE.JSX;
  record(sample, parseSample(sample.code, withJsx));
}

// The TypeScript samples are written inside the project so that module
// resolution finds node_modules and the real type definitions of react, redux
// and react-router.
const dir = join(ROOT, '.tmp-task-solutions');
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

let output = '';
const included = [];
const foreignSamples = new Set();
if (tsSamples.length > 0) {
  tsSamples.forEach((sample, index) => {
    const names = writeSample(sample, dir, index);
    sample.names = names;
    included.push(sample);
  });

  // A tsconfig keeps the command line short: hundreds of sample paths do not
  // fit into the Windows command line limit.
  writeFileSync(
    join(dir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          noEmit: true,
          strict: true,
          jsx: 'react-jsx',
          target: 'es2022',
          lib: ['ES2022', 'DOM'],
          module: 'esnext',
          moduleResolution: 'bundler',
          skipLibCheck: true,
          experimentalDecorators: true,
          types: ['node', 'react'],
        },
        include: ['**/*.ts', '**/*.tsx'],
      },
      null,
      2
    ),
    'utf8'
  );

  try {
    // Node refuses to spawn a .cmd without a shell, and the local TypeScript
    // is right here, so the compiler is started through node directly.
    execFileSync(
      process.execPath,
      [join(ROOT, 'node_modules/typescript/bin/tsc'), '-p', relative(ROOT, dir)],
      {
        cwd: ROOT,
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    );
  } catch (error) {
    output = `${error.stdout ?? ''}${error.stderr ?? ''}`;
  }

const reported = [];
for (const line of output.split(/\r?\n/)) {
  const match = line.match(/^(.+)\((\d+),\d+\): error (TS\d+): (.*)$/);
  if (!match) continue;
  const path = match[1].replace(/\\/g, '/');
  const sample = included.find((item) =>
    item.names.some((name) => relative(ROOT, name).replace(/\\/g, '/') === path)
  );
  if (!sample) continue;
  reported.push({ sample, line: Number(match[2]), code: match[3], message: match[4] });
}

// A name that the sample does not declare comes from another file, so the
// sample is not a program of its own and the rest of its types cannot be
// trusted either.
for (const item of reported) {
  if (item.code === 'TS2304' || item.code === 'TS2552') foreignSamples.add(item.sample);
}
for (const item of reported) {
  if (foreignSamples.has(item.sample)) continue;
  if (!failures.has(item.sample)) failures.set(item.sample, []);
  failures.get(item.sample).push({ line: item.line, code: item.code, message: item.message });
}

  if (output && failures.size === 0 && foreignSamples.size === 0) {
    console.log('');
    console.log('The compiler reported problems that did not match a sample:');
    console.log(output.slice(0, 2000));
  }
}

const broken = [...failures.entries()];

console.log(`checked ${samples.length} task solutions`);
console.log(
  `parsed ${jsSamples.length} samples of JavaScript, checked ${tsSamples.length} samples of TypeScript`
);
console.log(
  `skipped ${samples.length - jsSamples.length - tsSamples.length} samples that cannot be checked` +
    (skippedByLanguage.size
      ? ` (${[...skippedByLanguage]
          .map(([lang, count]) => `${lang}: ${count}`)
          .join(', ')})`
      : '')
);
console.log(
  `skipped ${skippedByImport.length} samples that import a file of the course`
);
const foreign = [...foreignSamples];
console.log(
  `skipped ${foreign.length} samples that use a name of another file` +
    (foreign.length ? ` (${foreign.map((sample) => sample.id).join(', ')})` : '')
);
console.log(`broken ${broken.length} solutions`);

for (const [sample, errors] of broken) {
  console.log('');
  console.log(`${relative(ROOT, sample.file)} > ${sample.id} [${sample.lang}]`);
  for (const error of errors.slice(0, 6)) {
    console.log(`  line ${error.line} ${error.code}: ${error.message}`);
  }
  if (errors.length > 6) console.log(`  ... and ${errors.length - 6} more`);
}

if (!process.env.DEBUG_SOLUTIONS) rmSync(dir, { recursive: true, force: true });
process.exit(broken.length > 0 ? 1 : 0);
