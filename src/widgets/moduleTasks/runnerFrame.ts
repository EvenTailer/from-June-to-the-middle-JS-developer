/**
 * The sandbox that runs the code of a learner.
 *
 * The frame is mounted with `sandbox="allow-scripts"` and without
 * `allow-same-origin`, so the code of a learner runs in an opaque origin: it
 * cannot reach the DOM of the page, its cookies or its storage. The only
 * channel between the frame and the page is `postMessage`.
 *
 * The code itself runs in a worker inside the frame. A worker has a thread of
 * its own, so an endless loop of a learner blocks the worker and nothing else:
 * the page keeps its timers and can drop the frame when the run takes too
 * long.
 *
 * Nothing of the learner code is evaluated in the page. The page sends the
 * source as a string, the worker compiles it in its own realm.
 */

export const RUNNER_CHANNEL = 'js-tutorial.code-runner';

export interface RunnerCase {
  input: string;
  /** An expression that reads the result of the call, when the result is not the answer itself. */
  expect?: string;
  expected: string;
}

export interface RunnerCaseResult {
  index: number;
  /** The output the runner saw, ready to show. */
  actual: string;
  /** The returned value as JSON, null when the case threw. */
  value: string | null;
  /** The message of the exception the case threw, null when it did not. */
  error: string | null;
}

export interface RunnerRequest {
  channel: typeof RUNNER_CHANNEL;
  type: 'run';
  runId: number;
  code: string;
  cases: RunnerCase[];
  /** The name of the function the runner calls. */
  fn?: string;
}

export interface RunnerResponse {
  channel: typeof RUNNER_CHANNEL;
  type: 'ready' | 'result';
  runId?: number;
  results?: RunnerCaseResult[];
  /** A message for the whole run, `no-solution` when the code defines no `solution`. */
  error?: string | null;
  /** The name of the function the runner did not find. */
  missing?: string | null;
}

/**
 * The worker that compiles the code of a learner, calls the function with the
 * input of every case and posts the results back.
 *
 * The source is a string, because the worker is built from a blob inside the
 * frame. The generator of the tests runs the very same source in Node, so the
 * expected values of the cases cannot drift from the runner of the app.
 */
export const RUNNER_WORKER_SRC = String.raw`self.onmessage = function (event) {
  var request = event.data;
  var results = [];
  var error = null;
  var missing = null;
  var logs = [];
  var originalLog = console.log;

  function describe(value) {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
      return String(value);
    }
    if (typeof value === 'function') return 'function ' + (value.name || '');
    try {
      return JSON.stringify(value);
    } catch (failure) {
      return String(value);
    }
  }

  function serialize(value) {
    if (value === undefined) return null;
    try {
      return JSON.stringify(value);
    } catch (failure) {
      return null;
    }
  }

  // Splits the input of a case into the arguments of the call. A comma inside
  // brackets, parentheses, braces or a string does not split.
  function splitArguments(source) {
    var text = String(source === null || source === undefined ? '' : source).trim();
    if (text === '') return [''];
    var parts = [];
    var current = '';
    var depth = 0;
    var quote = '';
    for (var i = 0; i < text.length; i += 1) {
      var char = text.charAt(i);
      if (quote) {
        current += char;
        if (char === quote && text.charAt(i - 1) !== '\\') quote = '';
        continue;
      }
      if (char === '"' || char === "'" || char === String.fromCharCode(96)) {
        quote = char;
        current += char;
        continue;
      }
      if (char === '(' || char === '[' || char === '{') {
        depth += 1;
        current += char;
        continue;
      }
      if (char === ')' || char === ']' || char === '}') {
        depth -= 1;
        current += char;
        continue;
      }
      if (char === ',' && depth === 0) {
        parts.push(current.trim());
        current = '';
        continue;
      }
      current += char;
    }
    parts.push(current.trim());
    return parts;
  }

  // Compiles one argument of a case in the realm of the worker and returns
  // its value.
  function evaluate(part) {
    if (part === '') return '';
    var factory = new Function('return (' + part + ');');
    return factory();
  }

  console.log = function () {
    var parts = [];
    for (var i = 0; i < arguments.length; i += 1) parts.push(describe(arguments[i]));
    logs.push(parts.join(' '));
  };

  try {
    for (var c = 0; c < request.cases.length; c += 1) {
      var testCase = request.cases[c];
      logs = [];
      try {
        // The name of the function the case calls. A task names it, and the
        // name has to be a plain identifier, because it is read inside the
        // code of the learner.
        var entry =
          typeof testCase.fn === 'string' && testCase.fn !== ''
            ? testCase.fn
            : typeof request.fn === 'string' && request.fn !== ''
              ? request.fn
              : 'solution';
        if (!/^[A-Za-z_$][\w$]*$/.test(entry)) {
          error = 'bad-entry';
          break;
        }
        var factory = new Function(
          request.code +
            '\n;return typeof ' + entry + ' === "function" ? ' + entry +
            ' : (typeof solution === "function" ? solution : null);'
        );
        var solution = factory();
        if (typeof solution !== 'function') {
          error = 'no-solution';
          missing = entry;
          break;
        }
        var args = splitArguments(testCase.input).map(evaluate);
        var value = solution.apply(null, args);
        // A case can read the result of the call, for a task that returns
        // an object instead of the answer itself.
        if (testCase.expect) {
          var reader = new Function('result', 'return (' + testCase.expect + ');');
          value = reader(value);
        }
        var actual =
          value === undefined
            ? logs.length
              ? logs[logs.length - 1]
              : 'undefined'
            : describe(value);
        results.push({ index: c, actual: actual, value: serialize(value), error: null });
      } catch (caseError) {
        results.push({
          index: c,
          actual: '',
          value: null,
          error: String((caseError && caseError.message) || caseError),
        });
      }
    }
  } catch (runError) {
    error = String((runError && runError.message) || runError);
  } finally {
    console.log = originalLog;
  }

  self.postMessage({ results: results, error: error, missing: missing || null });
};
`;

/**
 * The document of the frame. It holds the worker that compiles the code of a
 * learner, calls the function with the input of every case and posts the
 * results back.
 */
export const RUNNER_FRAME_SRC = String.raw`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>runner</title></head>
<body>
<script type="javascript/worker" id="worker-source">
${RUNNER_WORKER_SRC}</script>
<script>
(function () {
  var CHANNEL = 'js-tutorial.code-runner';
  var worker = null;
  var workerUrl = '';

  function stopWorker() {
    if (worker) {
      worker.terminate();
      worker = null;
    }
    if (workerUrl) {
      URL.revokeObjectURL(workerUrl);
      workerUrl = '';
    }
  }

  function run(request) {
    stopWorker();

    var source = document.getElementById('worker-source').textContent;
    workerUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    worker = new Worker(workerUrl);

    worker.onmessage = function (event) {
      var data = event.data || {};
      stopWorker();
      parent.postMessage(
        {
          channel: CHANNEL,
          type: 'result',
          runId: request.runId,
          results: data.results || [],
          error: data.error || null,
          missing: data.missing || null,
        },
        '*'
      );
    };

    worker.onerror = function (event) {
      stopWorker();
      parent.postMessage(
        {
          channel: CHANNEL,
          type: 'result',
          runId: request.runId,
          results: [],
          error: String(event.message || 'the worker failed'),
        },
        '*'
      );
    };

    worker.postMessage({ code: request.code, cases: request.cases, fn: request.fn });
  }

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.channel !== CHANNEL || data.type !== 'run') return;
    run(data);
  });

  parent.postMessage({ channel: CHANNEL, type: 'ready' }, '*');
})();
</script>
</body>
</html>`;
