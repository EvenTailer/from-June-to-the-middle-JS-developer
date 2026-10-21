import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the errors topic. */
export const errorsCases: Record<string, TaskCaseInput[]> = {
  'topic-errors-2': [
    { fn: 'safeParse', input: '"{\\"a\\":1}"', expect: 'result.ok' },
    { fn: 'safeParse', input: '"{\\"a\\":1}"', expect: 'result.value.a' },
    { fn: 'safeParse', input: '"{oops}", []', expect: 'result.ok' },
    { fn: 'safeParse', input: '"{oops}", []', expect: 'result.value' },
    { fn: 'safeParse', input: '"null"', expect: 'result.value' },
  ],
  'topic-errors-3': [
    { fn: 'runWithBoundary', input: '() => { throw new Error("boom"); }, (error) => error.message, null' },
    { fn: 'runWithBoundary', input: '() => 42, (error) => error.message, null' },
  ],
  'topic-errors-4': [
    { fn: 'withFallback', input: '() => "ok", "default", 3', expect: 'result.value' },
    { fn: 'withFallback', input: '() => "ok", "default", 3', expect: 'result.attempts' },
    { fn: 'withFallback', input: '() => { throw new Error("nope"); }, "default", 3', expect: 'result.value' },
    { fn: 'withFallback', input: '() => { throw new Error("nope"); }, "default", 3', expect: 'result.failed' },
  ],
  'topic-errors-5': [
    { fn: 'runAll', input: '[() => 1, () => 2]', expect: 'result.ok' },
    { fn: 'runAll', input: '[() => 1, () => 2]', expect: 'result.values' },
    { fn: 'runAll', input: '[() => 1, () => { throw new Error("bad"); }]', expect: 'result.ok' },
    { fn: 'aggregateError', input: '[new Error("a"), new Error("b")]', expect: 'result.message' },
    { fn: 'aggregateError', input: '[new Error("a")]', expect: 'result.message' },
    { fn: 'aggregateError', input: '[new Error("a"), new Error("b")]', expect: 'result.name' },
  ],
  'topic-errors-6': [
    { fn: 'formatError', input: 'new TypeError("bad type")', expect: 'result.split("\\n")[0]' },
    { fn: 'formatError', input: '"just a string"' },
    { fn: 'formatError', input: '42' },
    {
      fn: 'formatError',
      input: 'Object.assign(new TypeError("bad type"), { cause: new ReferenceError("inner") })',
      expect: 'result.includes("Caused by: ReferenceError: inner")',
    },
  ],
  'topic-errors-7': [
    { fn: 'createValidator', input: '', expect: 'result.validate({}).valid' },
    { fn: 'createValidator', input: '', expect: 'result.validate({}).errors' },
    {
      fn: 'createValidator',
      input: '',
      expect:
        '(() => { const validator = result; validator.rule("email", "Email is required", (value) => String(value ?? "").trim().length > 0); validator.rule("email", "Email must contain @", (value) => String(value ?? "").includes("@")); return validator.validate({ email: "" }).errors.email.join(", "); })()',
    },
  ],
  'topic-errors-8': [
    { fn: 'describeError', input: 'new Error("boom")', expect: 'result.kind' },
    { fn: 'describeError', input: 'new Error("boom")', expect: 'result.message' },
    { fn: 'describeError', input: '"boom"', expect: 'result.kind' },
    { fn: 'describeError', input: '{ message: "hi" }', expect: 'result.kind' },
    { fn: 'describeError', input: '42', expect: 'result.kind' },
    { fn: 'describeError', input: '42', expect: 'result.message' },
    { fn: 'isNotFound', input: 'Object.assign(new Error("Not Found"), { code: "E_NOT_FOUND" })' },
    { fn: 'isNotFound', input: 'new Error("boom")' },
  ],
};
