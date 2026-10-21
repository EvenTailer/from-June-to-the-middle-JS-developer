import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the http topic.
 *
 * The tasks that mock a server with the node module http are left out: the
 * sandbox compiles the code of a learner as the body of a function, where an
 * import statement is a syntax error, and the mock server of the exemplar
 * would need a network anyway.
 */
export const httpCases: Record<string, TaskCaseInput[]> = {
  'topic-http-3': [
    { fn: 'describeStatus', input: '200', expect: 'result.category' },
    { fn: 'describeStatus', input: '404', expect: 'result.clientError' },
    { fn: 'describeStatus', input: '503', expect: 'result.retryable' },
    { fn: 'describeStatus', input: '429', expect: 'result.retryable' },
    { fn: 'describeStatus', input: '700', expect: 'result.category' },
    { fn: 'describeStatus', input: '0', expect: 'result.ok' },
  ],
  'topic-http-5': [
    { fn: 'parseCacheControl', input: '"public, max-age=60, no-store"', expect: 'result["max-age"]' },
    { fn: 'parseCacheControl', input: '"public, max-age=60, no-store"', expect: 'result["no-store"]' },
    { fn: 'parseCacheControl', input: '""', expect: 'Object.keys(result).length' },
    { fn: 'cacheLifetime', input: 'new Headers({ "cache-control": "max-age=60" })' },
    {
      fn: 'cacheLifetime',
      input: 'new Headers({ "cache-control": "public, max-age=60, s-maxage=300" }), { shared: true }',
    },
    { fn: 'cacheLifetime', input: 'new Headers({ "cache-control": "no-store" })' },
    { fn: 'isFresh', input: 'new Headers({ "cache-control": "no-store" })' },
    {
      fn: 'isFresh',
      input: 'new Headers({ "cache-control": "max-age=60", "date": "Thu, 01 Jan 1970 00:00:00 GMT" })',
    },
    {
      fn: 'isFresh',
      input: 'new Headers({ "cache-control": "max-age=60", "date": "Fri, 01 Jan 2100 00:00:00 GMT" })',
    },
  ],
  'topic-http-6': [
    { fn: 'toErrorResponse', input: 'new Error("boom"), "req-2"', expect: 'result.status' },
    { fn: 'toErrorResponse', input: 'new Error("boom"), "req-2"', expect: 'result.body.error.code' },
    { fn: 'toErrorResponse', input: 'new Error("boom"), "req-2"', expect: 'result.body.error.message' },
    { fn: 'toErrorResponse', input: 'new Error("boom"), "req-2"', expect: 'result.body.error.requestId' },
    { fn: 'toErrorResponse', input: 'new Error("boom")', expect: 'result.body.error.details' },
  ],
};
