// Type-checks the solution code of every practice task.
//
// The content validator checks the shape of a task but never looks inside the
// solution string, so a task whose exemplar code does not compile passed every
// check. This script extracts each solution, compiles it together with the
// others, and reports the ones that fail.
//
// Samples that are not JavaScript at all (shell, SQL, HTTP transcripts) are
// detected and skipped.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.argv[2] ?? process.cwd();
const TASKS = join(ROOT, 'src/shared/content/tasks');

const TS_MARKERS = [
  /\binterface\s+\w+/,
  /\btype\s+\w+\s*[=<]/,
  /\bimport\s+[{'"]/,
  /\bconst\s+\w+\s*:/,
  /\bfunction\s+\w+\s*\(/,
  /=>/,
  /:\s*(string|number|boolean|void|never|unknown|any)\b/,
  /\bas\s+(const|[A-Z]\w*)/,
];

const NOT_TS_MARKERS = [/^#!/m, /^\s*#\s/m, /\bcurl\s+-/, /\bSELECT\b/i, /\bgit\s+\w+/];

function isProbablyTypeScript(code) {
  if (TS_MARKERS.some((marker) => marker.test(code))) return true;
  return !NOT_TS_MARKERS.some((marker) => marker.test(code));
}

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

  if (process.env.DEBUG_SOLUTIONS) {
    console.log(`${relative(ROOT, file)}: ${found.length} tasks`);
  }

  for (const task of found) {
    samples.push({ file, id: task.id, code: task.solution });
  }
}

// The samples are written inside the project so that module resolution finds
// node_modules and the real type definitions of react, redux and react-router.
const dir = join(ROOT, '.tmp-task-solutions');
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const included = [];
let index = 0;
for (const sample of samples) {
  if (!isProbablyTypeScript(sample.code)) {
    sample.skipped = 'not TypeScript';
    continue;
  }
  const name = `sample-${index}.tsx`;
  index += 1;
  writeFileSync(
    join(dir, name),
    `/* eslint-disable */\n${sample.code}\n`,
    'utf8'
  );
  sample.name = join(dir, name);
  included.push(sample);
}

let output = '';
if (included.length > 0) {
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
          module: 'esnext',
          moduleResolution: 'bundler',
          skipLibCheck: true,
          types: ['node', 'react'],
        },
        include: ['*.tsx'],
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
  if (process.env.DEBUG_SOLUTIONS) {
    console.log(`compiler output length ${output.length}`);
    console.log(output.slice(0, 3000));
  }
}

const failures = new Map();
for (const line of output.split(/\r?\n/)) {
  const match = line.match(/^(.+)\((\d+),\d+\): error (TS\d+): (.*)$/);
  if (!match) continue;
  const fileName = match[1].split(/[\\/]/).pop();
  const sample = included.find((item) => item.name.endsWith(fileName));
  if (!sample) continue;
  if (!failures.has(sample)) failures.set(sample, []);
  failures.get(sample).push({ line: Number(match[2]), code: match[3], message: match[4] });
}

if (output && failures.size === 0) {
  console.log('');
  console.log('The compiler reported problems that did not match a sample:');
  console.log(output.slice(0, 2000));
}

const skipped = samples.filter((sample) => sample.skipped);
const broken = [...failures.entries()];

console.log(`checked ${samples.length} task solutions, ${included.length} compiled as TypeScript`);
console.log(`skipped ${skipped.length} samples that are not TypeScript`);
console.log(`broken ${broken.length} solutions`);

for (const [sample, errors] of broken) {
  console.log('');
  console.log(`${relative(ROOT, sample.file)} > ${sample.id}`);
  for (const error of errors.slice(0, 6)) {
    console.log(`  line ${error.line} ${error.code}: ${error.message}`);
  }
  if (errors.length > 6) console.log(`  ... and ${errors.length - 6} more`);
}

if (!process.env.DEBUG_SOLUTIONS) rmSync(dir, { recursive: true, force: true });
process.exit(broken.length > 0 ? 1 : 0);