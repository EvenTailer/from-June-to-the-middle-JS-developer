// Builds the test cases of the practice tasks.
//
// The author of a task writes the inputs of the cases and the name of the
// function the runner calls. This script runs the exemplar of the task in the
// very same harness as the browser runner and writes the output of every case
// as the expected value, so the expected value cannot drift from the runner.
//
// The harness is not written twice: the worker of the runner frame is reused
// here, so a change of the runner changes the expected values with it.
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { RUNNER_WORKER_SRC } from '../src/widgets/moduleTasks/runnerFrame.ts';
import { languageOf } from './lib/sample-language.mjs';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const ROOT = args.find((arg) => !arg.startsWith('--')) ?? process.cwd();
const TASKS = join(ROOT, 'src/shared/content/tasks');
const CASES = join(TASKS, 'cases.ts');
const OUT = join(TASKS, 'generated/tests.ts');

/** The languages the runner can execute. */
const RUNNABLE = new Set(['js']);

/**
 * Runs the worker of the runner frame in Node and returns what it posts back.
 */
function runHarness(code, cases, fn) {
  const posted = [];
  const scope = {
    onmessage: null,
    postMessage: (data) => posted.push(data),
  };

  // eslint-disable-next-line no-new-func
  const build = new Function('self', RUNNER_WORKER_SRC);
  build(scope);
  scope.onmessage({ data: { code, cases, fn } });

  return posted[0] ?? { results: [], error: 'the worker posted nothing' };
}

/**
 * The JavaScript of an exemplar. A sample of TypeScript is transpiled, the
 * learner writes plain JavaScript in the browser.
 */
function toJavaScript(code, lang) {
  if (lang !== 'ts' && lang !== 'tsx') return code;
  const result = ts.transpileModule(code, {
    fileName: lang === 'tsx' ? 'sample.tsx' : 'sample.ts',
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  return result.outputText;
}

/** Every task of the course. */
async function collectTasks() {
  const found = [];

  const collect = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry === 'byModule' || entry === 'generated') continue;
        collect(full);
      } else if (entry.endsWith('.ts')) {
        found.push(full);
      }
    }
  };
  collect(TASKS);

  const skip = new Set(['index.ts', 'taskIndex.ts', 'counts.ts', 'registry.ts', 'topics.ts', 'cases.ts']);
  const tasks = [];
  for (const file of found) {
    if (skip.has(file.replace(TASKS + '\\', '').replace(/\.ts$/, ''))) continue;
    let mod;
    try {
      mod = await import(pathToFileURL(file).href);
    } catch {
      continue;
    }
    const walk = (value) => {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') {
        if (typeof value.id === 'string' && typeof value.solution === 'string') {
          tasks.push({ file: relative(ROOT, file), id: value.id, code: value.solution });
        } else Object.values(value).forEach(walk);
      }
    };
    Object.values(mod).forEach(walk);
  }
  return tasks;
}

const taskList = await collectTasks();
const byId = new Map(taskList.map((task) => [task.id, task]));

const caseModule = await import(pathToFileURL(CASES).href);
const taskCases = caseModule.taskCases ?? {};

const generated = {};
const problems = [];
let count = 0;

for (const [taskId, cases] of Object.entries(taskCases)) {
  const task = byId.get(taskId);
  if (!task) {
    problems.push(`${taskId}: there is no task with this id`);
    continue;
  }
  const lang = languageOf(task);
  if (!RUNNABLE.has(lang) && lang !== 'ts') {
    problems.push(`${taskId}: the exemplar is written in ${lang}, the runner cannot run it`);
    continue;
  }

  let code = '';
  try {
    code = toJavaScript(task.code, lang);
  } catch (error) {
    problems.push(`${taskId}: the exemplar does not transpile: ${error.message}`);
    continue;
  }

  const list = [];
  for (const testCase of cases) {
    const fn = testCase.fn ?? task.fn ?? 'solution';
    const outcome = runHarness(
      code,
      [{ input: testCase.input, expect: testCase.expect }],
      fn
    );
    if (outcome.error) {
      problems.push(`${taskId}: the exemplar does not run: ${outcome.error}`);
      break;
    }
    const result = outcome.results[0];
    if (!result) {
      problems.push(`${taskId}: the case ${testCase.input} has no result`);
      break;
    }
    if (result.error) {
      problems.push(`${taskId}: the case ${testCase.input} throws: ${result.error}`);
      break;
    }
    list.push({ fn, input: testCase.input, expected: result.actual });
    count += 1;
  }
  if (list.length > 0) generated[taskId] = list;
}

const body = Object.entries(generated)
  .map(([taskId, list]) => {
    const cases = list
      .map(
        (item) =>
          `    { fn: ${JSON.stringify(item.fn)}, input: ${JSON.stringify(item.input)}, expected: ${JSON.stringify(item.expected)} },`
      )
      .join('\n');
    return `  ${JSON.stringify(taskId)}: [\n${cases}\n  ],`;
  })
  .join('\n');

mkdirSync(join(TASKS, 'generated'), { recursive: true });
const content = `// Generated by scripts/generate-task-tests.mjs. Do not edit by hand.
//
// The expected value of every case is the output of the exemplar of the task,
// computed with the worker of the runner frame, so the cases of the app and
// the runner of the app always agree.

import type { PracticeTest } from '../../../../entities/module/model/types';

/** The cases of every task that can be run. */
export const taskTests: Record<string, PracticeTest[]> = {
${body}
};
`;

// With the flag --check the file is not written, the script only tells whether
// the committed file still holds the values of the current runner.
if (checkOnly) {
  let current = '';
  try {
    current = readFileSync(OUT, 'utf8');
  } catch {
    current = '';
  }
  if (current !== content) {
    console.log('');
    console.log(`${relative(ROOT, OUT)} is not up to date.`);
    console.log('Run npm run generate:task-tests and commit the result.');
    process.exit(1);
  }
  console.log(`${relative(ROOT, OUT)} is up to date`);
  process.exit(0);
}

writeFileSync(OUT, content, 'utf8');

console.log(`wrote ${Object.keys(generated).length} tasks and ${count} cases`);
console.log(`wrote ${relative(ROOT, OUT)}`);

if (problems.length > 0) {
  console.log('');
  console.log(`${problems.length} problems:`);
  for (const problem of problems) console.log(`  ${problem}`);
}
