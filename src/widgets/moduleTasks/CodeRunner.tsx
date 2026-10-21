import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PracticeTest } from '../../entities/module/model/types';
import { useLocale } from '../../shared/hooks/useLocale';
import { plural, t } from '../../shared/lib/i18n';
import { Icon } from '../../shared/ui/Icon';
import {
  RUNNER_CHANNEL,
  RUNNER_FRAME_SRC,
  type RunnerCaseResult,
  type RunnerResponse,
} from './runnerFrame';

/** How long the code of a learner may run before the frame is dropped. */
const RUN_TIMEOUT_MS = 2000;

type RunnerState =
  | { kind: 'idle' }
  | { kind: 'running' }
  | { kind: 'timeout' }
  | { kind: 'failed'; message: string }
  | { kind: 'done'; results: RunnerCaseResult[] };

interface CodeRunnerProps {
  /** The cases of the task. */
  tests: PracticeTest[];
  /** The code the editor starts with, the exemplar solution of the task. */
  initialCode: string;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, index) => deepEqual(item, b[index]));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const left = a as Record<string, unknown>;
    const right = b as Record<string, unknown>;
    const keys = Object.keys(left);
    return (
      keys.length === Object.keys(right).length &&
      keys.every((key) => deepEqual(left[key], right[key]))
    );
  }
  return false;
}

/** The output of a case matches the expectation when the texts are equal or when both hold the same value. */
function matches(expected: string, result: RunnerCaseResult): boolean {
  if (result.error) return false;

  const wanted = expected.trim();
  const got = result.actual.trim();
  if (wanted === got) return true;
  if (result.value === null) return false;

  const wantedValue = parseJson(wanted);
  const gotValue = parseJson(result.value);
  if (wantedValue === undefined || gotValue === undefined) return false;

  return deepEqual(wantedValue, gotValue);
}

function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function CodeRunner({ tests, initialCode }: CodeRunnerProps) {
  const locale = useLocale();
  const [code, setCode] = useState(initialCode);
  const [state, setState] = useState<RunnerState>({ kind: 'idle' });
  const [frameKey, setFrameKey] = useState(0);
  /** The key of the frame that reported itself ready. */
  const [readyKey, setReadyKey] = useState(-1);

  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const frameKeyRef = useRef(0);
  const runIdRef = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;

      const data = event.data as RunnerResponse | undefined;
      if (!data || data.channel !== RUNNER_CHANNEL) return;

      if (data.type === 'ready') {
        setReadyKey(frameKeyRef.current);
        return;
      }
      if (data.type !== 'result' || data.runId !== runIdRef.current) return;

      window.clearTimeout(timerRef.current);
      if (data.error === 'no-solution') {
        setState({ kind: 'failed', message: t(locale, 'practice.runner.noSolution') });
      } else if (data.error) {
        setState({ kind: 'failed', message: data.error });
      } else {
        setState({ kind: 'done', results: data.results ?? [] });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timerRef.current);
    };
  }, [locale]);

  const ready = readyKey === frameKey;

  const run = useCallback(() => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;

    runIdRef.current += 1;
    const runId = runIdRef.current;

    setState({ kind: 'running' });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // The frame is stuck, most likely in an infinite loop. Drop it and mount
      // a fresh one, so the next run starts from a clean sandbox.
      runIdRef.current += 1;
      setState({ kind: 'timeout' });
      frameKeyRef.current += 1;
      setFrameKey(frameKeyRef.current);
    }, RUN_TIMEOUT_MS);

    frame.contentWindow.postMessage(
      { channel: RUNNER_CHANNEL, type: 'run', runId, code, cases: tests },
      '*',
    );
  }, [code, tests]);

  const cases = useMemo(() => {
    if (state.kind !== 'done') return [];
    return state.results.map((result) => {
      const test = tests[result.index];
      const expected = test ? test.expected : '';
      return { ...result, expected, passed: matches(expected, result) };
    });
  }, [state, tests]);

  const failed = cases.filter((item) => !item.passed);
  const passedCount = cases.length - failed.length;

  return (
    <div className="task-runner">
      <div className="task-runner__head">
        <span className="label">{t(locale, 'practice.runner.title')}</span>
        <span className="task-runner__count">
          {tests.length}{' '}
          {plural(locale, tests.length, {
            one: { en: 'case', ru: 'кейс' },
            few: { en: 'cases', ru: 'кейса' },
            many: { en: 'cases', ru: 'кейсов' },
          })}
        </span>
      </div>

      <p className="task-runner__contract">{t(locale, 'practice.runner.contract')}</p>

      <textarea
        className="task-runner__editor"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        spellCheck={false}
        aria-label={t(locale, 'practice.runner.editorLabel')}
      />

      <div className="task-runner__actions">
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={run}
          disabled={!ready || state.kind === 'running'}
        >
          <Icon name="spark" size={15} />
          {state.kind === 'running'
            ? t(locale, 'practice.runner.running')
            : t(locale, 'practice.runner.run')}
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setCode(initialCode)}
        >
          {t(locale, 'practice.runner.reset')}
        </button>
      </div>

      <div className="task-runner__result" aria-live="polite">
        {state.kind === 'running' && (
          <p className="task-runner__status">{t(locale, 'practice.runner.running')}</p>
        )}

        {state.kind === 'timeout' && (
          <p className="task-runner__alert task-runner__alert--warning">
            {format(t(locale, 'practice.runner.timeout'), {
              seconds: RUN_TIMEOUT_MS / 1000,
            })}
          </p>
        )}

        {state.kind === 'failed' && (
          <div className="task-runner__alert task-runner__alert--error">
            <span className="label">{t(locale, 'practice.runner.error')}</span>
            <p>{state.message}</p>
          </div>
        )}

        {state.kind === 'done' && failed.length === 0 && (
          <p className="task-runner__alert task-runner__alert--ok">
            <Icon name="check" size={15} />
            {t(locale, 'practice.runner.passedAll')}
          </p>
        )}

        {state.kind === 'done' && failed.length > 0 && (
          <>
            <p className="task-runner__status">
              {format(t(locale, 'practice.runner.passedCount'), {
                passed: passedCount,
                total: cases.length,
              })}
            </p>
            <ul className="task-runner__cases">
              {failed.map((item) => (
                <li key={item.index} className="task-runner__case">
                  <div className="task-runner__case-head">
                    <span className="task-runner__case-name">
                      {format(t(locale, 'practice.runner.case'), { n: item.index + 1 })}
                    </span>
                    <code className="task-runner__case-input">
                      {tests[item.index] ? tests[item.index].input : ''}
                    </code>
                  </div>
                  {item.error ? (
                    <div className="task-runner__row">
                      <span>{t(locale, 'practice.runner.error')}</span>
                      <pre>{item.error}</pre>
                    </div>
                  ) : (
                    <>
                      <div className="task-runner__row">
                        <span>{t(locale, 'practice.runner.expected')}</span>
                        <pre>{item.expected}</pre>
                      </div>
                      <div className="task-runner__row">
                        <span>{t(locale, 'practice.runner.actual')}</span>
                        <pre>{item.actual}</pre>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <iframe
        key={frameKey}
        ref={frameRef}
        className="task-runner__frame"
        title={t(locale, 'practice.runner.frameTitle')}
        sandbox="allow-scripts"
        srcDoc={RUNNER_FRAME_SRC}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
