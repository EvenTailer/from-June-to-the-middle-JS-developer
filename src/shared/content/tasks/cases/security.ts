import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the security topic.
 *
 * Only the tasks whose exemplar is a plain function can be run: the runner of
 * the app compiles the code of a task as one program, so a task that imports a
 * package of Node, such as "node:crypto" or "node:path", cannot be loaded at
 * all.
 */
export const securityCases: Record<string, TaskCaseInput[]> = {
  'topic-security-2': [
    { fn: 'sanitizeUrl', input: '"https://example.com/page"' },
    { fn: 'sanitizeUrl', input: '"http://example.com"' },
    { fn: 'sanitizeUrl', input: '"/about"' },
    { fn: 'sanitizeUrl', input: '"javascript:alert(1)"' },
    { fn: 'sanitizeUrl', input: '"JavaScript:alert(1)"' },
    { fn: 'sanitizeUrl', input: '"java\\nscript:alert(1)"' },
    { fn: 'sanitizeUrl', input: '"//evil.com"' },
    { fn: 'sanitizeUrl', input: '"mailto:someone@example.com"' },
    { fn: 'sanitizeUrl', input: '""' },
  ],
  'topic-security-3': [
    { fn: 'serializeCookie', input: '"sid", "abc", { maxAge: 60 }' },
    {
      fn: 'serializeCookie',
      input: '"theme", "dark", { httpOnly: false, secure: false, sameSite: "None" }',
    },
    {
      fn: 'serializeCookie',
      input: '"k", "v", { path: "/app", domain: "example.com", sameSite: "Strict" }',
    },
    { fn: 'serializeCookie', input: '"a b", "x&y", {}' },
    { fn: 'serializeCookie', input: '"sid", "abc", { maxAge: 0 }' },
  ],
  'topic-security-6': [
    { fn: 'loadSecrets', input: '{ DB_URL: "postgres://localhost/app", JWT_SECRET: "s3cret" }' },
    { fn: 'loadSecrets', input: '{ DB_URL: "db", JWT_SECRET: "s", SESSION_TTL: "60" }' },
    { fn: 'loadSecrets', input: '{ DB_URL: "db", JWT_SECRET: "s", SESSION_TTL: "0.5" }' },
    {
      fn: 'loadSecrets',
      input: '{ DB_URL: "postgres://user:pass@host:5432/db", JWT_SECRET: "a b c" }',
    },
  ],
  'topic-security-7': [
    {
      fn: 'createRateLimiter',
      input: '{ windowMs: 60000, max: 3, now: () => 0 }',
      expect: 'result("user-1")',
    },
    {
      fn: 'createRateLimiter',
      input: '{ windowMs: 60000, max: 3, now: () => 0 }',
      expect: '(() => { result("user-1"); return result("user-1"); })()',
    },
    {
      fn: 'createRateLimiter',
      input: '{ windowMs: 60000, max: 3, now: () => 0 }',
      expect: '(() => { result("user-1"); result("user-1"); return result("user-1"); })()',
    },
    {
      fn: 'createRateLimiter',
      input: '{ windowMs: 60000, max: 1, now: () => 0 }',
      expect: '(() => { result("user-1"); result("user-1"); return result("user-2"); })()',
    },
  ],
};
