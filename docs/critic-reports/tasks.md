# Critic report — chapter practice tasks

105 tasks in `src/shared/content/tasks/chapters/*.ts`, one per textbook chapter.
Machine checks passed (`validate:content`, `tsc --noEmit`); the defects below
live inside the `solution` strings, which no machine check looked at.

Totals: 19 blocking, 28 shaping, 7 polish.

## Blocking

1. `chapters/typescript.ts:156` — `type Getters = { [K in keyof User as 'get' + Capitalize<K & string>]: ... }` — there is no `+` operator in types, this is a syntax error (TS1005). The key must be renamed with a template literal type: ``as `get${Capitalize<K & string>}` ``. As written the task cannot be solved at all.
2. `chapters/typescript.ts:246` — `[{ path: '/orders', method: 'GET' }] satisfies { method: 'GET' | 'POST' }[]` trips the excess property check: `path` is not in the target type (TS2353). The brief demands a strict build and the code does not build under strict.
3. `chapters/typescript.ts:262` — the Russian text keeps an English word: «подкласс не должен быть **able** его нарушить».
4. `chapters/react.ts:239-242` — `useRef(null)` plus `useImperativeHandle` leaves `inputRef.current` typed `null`, so `inputRef.current?.focus()` and `inputRef.current.value` give TS2339 «Property 'focus'/'value' does not exist on type 'never'». It needs `useRef<HTMLInputElement>(null)`.
5. `chapters/react.ts:416-418` — `useCallback((id) => setPicked(id), [])` gives TS7006 (parameter `id` is implicitly `any` under `noImplicitAny`); `useState(null)` without a generic infers `picked: null`, so the state physically cannot change.
6. `chapters/redux.ts:145` — `(await fetch(...)).json() as { id: string }` applies `as` to a non-awaited promise, so TS2352 «Conversion of type 'Promise<any>' to type '{ id: string; }' may be a mistake» and the payload creator returns `Promise<Promise<any>>`. The mechanism the task checks is itself broken.
7. `chapters/redux.ts:150,155,156` — `initialState: { status: 'idle', user: null, error: null }` infers `user: null` and `error: null`, so `state.user = action.payload` and `state.error = action.error.message` give TS2322. `status` is also inferred as `string` rather than the literal union the hint asks for.
8. `chapters/redux.ts:235` — `typeof postsSlice.initialState` — in RTK 2.13 a slice object has no `initialState` property (TS2551, «Did you mean 'getInitialState'?»). It needs `ReturnType<typeof postsAdapter.getInitialState>`.
9. `chapters/reactRouter.ts:189` — `import { createBrowserRouter, Suspense } from 'react-router-dom'` — `Suspense` is not exported from `react-router-dom` (TS2305); it comes from `react`.
10. `chapters/nextjs.ts:156` — `<form action={completeItem}>` where `completeItem` returns `Promise<{ error: string }>` — the React 19 `action` prop type is `string | ((formData: FormData) => void | Promise<void>)` → TS2322. Returning state from a form action needs `useActionState`, which the chapter itself teaches.
11. `chapters/nextjs.ts:63,231,242,279,320,365` — `db`, `getProduct`, `schema`, `LiveStock`, `CatalogList` are used but never imported or declared: the task code does not compile as written.
12. `chapters/nextjs.ts:22` — `React.ReactNode` is used as a type without an import; in a module file `React` is a UMD global and TS reports «refers to a UMD global, but the current file is a module». It needs `import type { ReactNode } from 'react'`.
13. `chapters/http.ts:363-377` — the brief asks for a 429 response with a `Retry-After` header and a liveness check next to the readiness check; the solution returns only a `boolean`, has neither the 429 nor the `Retry-After` nor a liveness function. Two thirds of the brief are unmet.
14. `chapters/architecture.ts:266-275` — the brief asks for a helper that picks one-way doors from a list of choices; the solution only has `draftRecord`. The explanation still talks about one-way doors that are not in the code.
15. `chapters/cli.ts:133-136` — `disown` removes the job from the shell job table, so the next `wait` returns immediately (checked in bash: 0 s instead of ~3 s). The script prints «build finished» while the build is still running, so the key behaviour the task asks for (surviving the shell) is not implemented.
16. `chapters/cli.ts:209` — `for file in "$@"` includes `$1`, and `$1` is the directory (`${1:?usage: ...}`), so the script always prints «skipped: <directory>». The file list must start at the second argument.
17. `chapters/react.ts:464-471` — the brief asks to type a value into the field, but the solution only clicks the button and types nothing; the check `getByText(/42 EUR/)` depends on an `OrderSummary` component that does not exist.
18. `chapters/oop.ts:70-71` — `readonly cents: number` is public, so `parsePrice('1,50').cents` reaches the internal representation; the brief requires that no caller can reach the internal state and the hint says to keep the constant and the conversion inside. The public field breaks both the brief and the hint.
19. `chapters/oop.ts:240-243` — `commit()` calls `repo.save` per item, so a failure in the middle still leaves half the records, which is exactly the problem the brief asks to remove; there is no atomicity and no in-memory repository proof in the solution.

## Shaping

1. `chapters/jsCore.ts:14` — the brief asks for a pair where `==` and `===` **agree**, but the solution only shows pairs where they differ (`'' == 0` true, `'' === 0` false); the explanation claims «agrees with === on NaN» but there is no NaN comparison in the code.
2. `chapters/jsCore.ts:226` — the brief requires the private value to stay invisible to JSON, but the solution exports it through `toJSON` (`JSON.stringify(t)` prints `{"celsius":100}`). Brief and solution contradict each other.
3. `chapters/jsCore.ts:59-61` — the hint names the exact set of techniques (`Number()`, `&&`, `??` «because || would also replace zero»), which with the brief determines the code. That is the answer, not a direction.
4. `chapters/react.ts:54-92` — the task is built on `React.memo`, which is react-ch10 material («memo, useMemo and useCallback», «React.memo and prop stability»); react-ch2 is the rendering model (batching, fiber, StrictMode, transitions). The task would fit any rendering chapter and duplicates ch-react-ch10-1.
5. `chapters/react.ts:264` — the brief asks to show that a slow context consumer does not re-render, but only the fast consumer (`Cursor`) is shown. There is nothing to check the claim against.
6. `chapters/react.ts:420` — `items.slice(0, WINDOW)` does not virtualise a list, it truncates everything after the 50th item, making the rest unreachable. The task promises a window, the solution gives a cut.
7. `chapters/react.ts:192-200` — the solution for react-ch5 is built on `useRef`; refs arrive in react-ch6, so a chapter 5 task requires a chapter 6 tool.
8. `chapters/http.ts:330-332` — `Math.min(Number(query.get('limit') ?? 20), 100)` does not guard against `NaN` and negative values, although the chapter demands «validate the limit before the query».
9. `chapters/http.ts:107` — «invalidate one path on the CDN» exists only as a comment line in a curl transcript; there is no PURGE request in the code.
10. `chapters/http.ts:228-249` — HSTS and the cookie flags exist only in a comment rather than in code, although the brief requires sending them; the comment also shows a CSP without `object-src 'none'` while the code sets one, so comment and code disagree.
11. `chapters/cli.ts:57-67` — the brief asks to «pass the found paths to another command», but the pipeline carries the output of `find`, not the matches of `grep`; the lesson about NUL-safe path passing is not shown.
12. `chapters/cli.ts:88-99` — `set -o pipefail` sits after the pipeline it is meant to protect, so the first pipeline runs without pipefail. The order is copied wrong.
13. `chapters/oop.ts:18` — the hint promises «a private constructor together with a static factory» while the solution has a public constructor; the hint points at a mechanism that is not there.
14. `chapters/oop.ts:288` — the brief asks that a zero amount order «is not creatable», but the order is created and the invariant is only checked in `place()`.
15. `chapters/oop.ts:293-297` — `pullEvents()` hands the caller the internal events array, which the caller can modify, so «aggregate pulls the events out so a caller can read them once» is not guaranteed.
16. `chapters/redux.ts:14` — the action type is a closed union, so the «unknown action» case the brief requires is unrepresentable and the `default` branch is unreachable to the compiler.
17. `chapters/reactRouter.ts:76-80` — `setParams((current) => { current.set(...); return current; })` mutates the received `URLSearchParams` instead of building a new one; the router contract requires returning a new object.
18. `chapters/reactRouter.ts:234` — the loader reads `params.range`, but the `/stats` route declares no parameter, so the value is always `undefined`, and `loadStats` is never declared.
19. `chapters/reactRouter.ts:282-288` — the «test» is an exported `checkLoader()` function rather than a test case: there is no `test(...)` call, the router is never mounted, the check never runs.
20. `chapters/architecture.ts:186-198` — the hint says «A timeout gives every remote call a deadline» and the explanation says «Every call without a deadline holds a worker», but the solution has no timeout or deadline at all; the lesson of the explanation is not backed by code.
21. `chapters/architecture.ts:228` — `load: () => import(path)` with a runtime variable cannot be resolved by any bundler; the adapter does not work in a real build.
22. `chapters/architecture.ts:111` — the same cycle comes back several times in different rotations (a→b→a and b→a→b), so «every cycle» arrives with duplicates.
23. `chapters/architecture.ts:34` — the regular expression only catches `from '...'` in single quotes; `import 'x'` and double quotes are missed, so the rule check is incomplete.
24. `chapters/nextjs.ts:174-203` — the brief requires that «every request carries the x-tenant header», but the matcher covers only three path patterns; two requirements of the brief contradict each other and the solution silently picks one without saying so.
25. `chapters/nextjs.ts:285` — the brief and the hint talk about a photo from a remote host and `images.remotePatterns`, but the solution renders a local `/shoes.png` and shows no remote host configuration.
26. `chapters/nextjs.ts:227-233` — the brief asks for a «cached data function» while the solution caches a component that returns JSX (`'use cache'` inside an async component) and never shows `cacheComponents: true` mentioned in the hint.
27. `chapters/typescript.ts:18-19` — the hint mentions a function that always throws, with a `never` return type, but the solution has no such function: `describe` ends with `throw` and an explicit `: string` return type.
28. `chapters/typescript.ts:97,114-117` — the brief asks for a `Record` type with literal keys **plus** an index signature, the solution gives two independent types (`Levels` and `Scores`) that never coexist.

## Polish

1. `chapters/jsCore.ts:403` — the comment shows `'19,99 €` with a normal space, Node prints a non-breaking space (U+00A0).
2. `chapters/react.ts:337` — «не даёт мемоизированным **детям** перерисовываться»: the textbook uses «дочерний компонент»/«ребёнок» (38 and 32 occurrences), «детям» is a calque.
3. `chapters/oop.ts:212` — «Репозиторий сохраняет собственную **лексику**»: «собственный язык» is more natural; in the textbook «лексика» only occurs in the sense of lexicographic sorting and naming conventions.
4. `chapters/http.ts:15` — «выбрасывает исключение с **заголовком** problem» confuses it with an HTTP header; the intent is the problem title (`problem.title`).
5. `chapters/typescript.ts:142` — «секция as»: in TypeScript this is an `as` expression or clause, «секция» is a calque.
6. `chapters/htmlCss.ts:9` — all eight module tasks are tagged `topic: 'markup'`, including the five that are purely CSS (ch4–ch8): the topic filter does not separate markup from styling.
7. `chapters/git.ts:257` — `git notes add <sha>` keeps a literal placeholder while the rest of the solution is executable commands.

## Criteria that came out clean

- **Level against chapter number** — clean in all 105 tasks: 1–3 `basic`, 4–7 `intermediate`, 8+ `advanced`.
- **Language parity** — structurally clean: every `title`, `brief`, `hint` and `explanation` has a Russian string, no missing Russian paragraph; the only short case (`redux.ts:274`, ratio 0.59) carries the same two claims as the English.
- **Ids and attachment** — every `chapterId` points at an existing chapter, `moduleId` values match the module ids, `topic` values are existing collections, no duplicate ids.
- **Explanations** — none of them restates the chapter; all say what was checked, except for the cases listed under shaping.
- **The task files themselves** — `tsc --noEmit -p tsconfig.app.json` passes; every compilation defect is inside a `solution` string.

## Strongest tasks in the sample

- `chapters/git.ts:6-43` — `ch-git-ch1-1`: the brief lists five observable commands, the solution is an executable set with exact output comments, the explanation answers what was checked.
- `chapters/git.ts:126-156` — `ch-git-ch4-1`: four different rollbacks (reset/restore/revert) are separated in the brief, each covers its own scenario, the explanation fixes why revert is the only safe option for a published commit.
- `chapters/architecture.ts:6-45` — `ch-architecture-ch1-1`: the architecture rule is expressed as code (`ALLOWED`) rather than a checklist, and the function returns a checkable list of violations.
- `chapters/htmlCss.ts:46-84` — `ch-htmlcss-ch2-1`: every point of the brief is checkable in the markup, and progressive enhancement is part of the task statement itself.
- `chapters/jsCore.ts:263-303` — `ch-js-core-ch7-1`: the observable invariant (the original array must stay exactly the same) is checked directly, the id order is preserved, the explanation names the rule «sort a copy» instead of repeating the chapter.
- `chapters/typescript.ts:48-88` — `ch-ts-ch2-1`: the promise of the task (a fourth state becomes a compile error) is checkable and really happens with the given code.
