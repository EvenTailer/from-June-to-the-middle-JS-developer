import type { TaskCaseInput } from './caseInput';

/**
 * A fake fetch for the API client. It records the call of the client in a
 * global, so a case can read the address, the header and the body of the
 * request without waiting for the answer of the promise.
 */
const FAKE_FETCH =
  '(url, init) => { const headers = init && init.headers; globalThis.__call = { url: url, body: init && init.body, type: headers ? (typeof headers.get === "function" ? headers.get("content-type") : headers["content-type"] || headers["Content-Type"]) : "" }; return { ok: true, status: 200, statusText: "OK", json: () => ({ id: 1, name: "Ann" }) }; }';

/** The cases of the tasks of the typescript topic. */
export const typescriptCases: Record<string, TaskCaseInput[]> = {
  'topic-typescript-1': [
    { fn: 'reducer', input: '{ count: 2, lastAction: "reset" }, { type: "increment", amount: 3 }' },
    { fn: 'reducer', input: '{ count: 10, lastAction: "increment" }, { type: "decrement", amount: 4 }' },
    { fn: 'reducer', input: '{ count: 7, lastAction: "increment" }, { type: "reset" }' },
    { fn: 'reducer', input: '{ count: 0, lastAction: "reset" }, { type: "increment", amount: 0 }' },
  ],
  'topic-typescript-2': [
    {
      fn: 'createApiClient',
      input: `"https://api.example.com", ${FAKE_FETCH}`,
      expect: 'result.get("/users/1"), (globalThis.__call || {}).url',
    },
    {
      fn: 'createApiClient',
      input: `"https://api.example.com", ${FAKE_FETCH}`,
      expect: 'result.get("/users/1"), (globalThis.__call || {}).type',
    },
    {
      fn: 'createApiClient',
      input: `"https://api.example.com", ${FAKE_FETCH}`,
      expect: 'result.post("/users", { id: 1 }), (globalThis.__call || {}).body',
    },
  ],
  'topic-typescript-3': [
    { fn: 'isSuccess', input: '{ status: "success", data: 1 }' },
    { fn: 'isSuccess', input: '{ status: "loading" }' },
    { fn: 'isIdle', input: '{ status: "idle" }' },
    { fn: 'isIdle', input: '{ status: "success", data: 5 }' },
    { fn: 'isError', input: '{ status: "error", error: "boom" }' },
    { fn: 'isError', input: '{ status: "idle" }' },
  ],
  'topic-typescript-5': [
    { fn: 'format', input: '1234.5' },
    { fn: 'format', input: '1234.5, { currency: "USD" }' },
    { fn: 'format', input: '"  hello  "' },
    { fn: 'format', input: '"  hello  ", { uppercase: true }' },
    { fn: 'format', input: '0' },
    { fn: 'format', input: '-1234.567' },
  ],
  'topic-typescript-7': [
    { fn: 'getPort', input: 'undefined' },
    {
      fn: 'getPort',
      input: '{ appName: "Other", port: 3000, features: { beta: true, maxUploadMb: 5 } }',
    },
    {
      fn: 'getPort',
      input: '{ appName: "Demo", port: 8080, features: { beta: false, maxUploadMb: 1 } }',
    },
  ],
  'topic-typescript-8': [
    { fn: 'move', input: '"up"' },
    { fn: 'move', input: '"down"' },
    { fn: 'move', input: '"left"' },
    { fn: 'move', input: '"right"' },
  ],
};
