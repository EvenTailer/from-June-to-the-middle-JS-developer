# Critic report — textbook chapters (remaining modules)

Seven modules, 50 chapters, 286 sections: html-css (8/43), cli (8/43), oop (8/41),
nextjs (9/47), redux (7/38), react-router (7/35), architecture (7/39).

Machine checks passed (`validate:content`, `tsc --noEmit`). Facts were verified
against Git Bash 5.x and the installed packages (`react-router-dom` 7.18.4).

Totals: 35 findings — 19 blocking, 9 shaping, 7 polish.

## Blocking

1. `chapters/cli/ch01.ts:17` — «The command `ls -l /tmp` delivers exactly three arguments»: there are two (`-l` and `/tmp`), checked with `set -- -l /tmp; echo $#` = 2. The comment in the code (`ch01.ts:29`) repeats the error and contradicts itself.
2. `chapters/cli/ch02.ts:17` — «The result of a variable expansion is not subject to pathname expansion, so a variable holding a pattern is not re-globbed» is plainly wrong in bash: the result of an unquoted parameter expansion IS globbed. Checked: `pattern='*.log'; echo $pattern` prints `a.log b.log`. The error is repeated in the bullet (`ch02.ts:25`) and in the code comments (`ch02.ts:37`, `:40`) — this is the core trap of the section, so the reader is taught the opposite.
3. `chapters/cli/ch05.ts:84` — «The symbolic form `chmod u+x g-w o=r` says the same thing in words»: the form without commas is invalid (`chmod: cannot access 'g-w'`), and the correct `u+x,g-w,o=r` gives 744, not 640. The comment at `ch05.ts:97` («the same thing, spelled out») lies too.
4. `chapters/cli/ch06.ts:86` — «The options are inherited by every child shell»: `set -euo pipefail` is NOT inherited by child shells (checked: errexit/nounset/pipefail are off in `bash -c`); only `SHELLOPTS` carries them over. The error is repeated in the bullet (`:86`) and in the callout (`:135`, «covers the whole script tree») — three places.
5. `chapters/cli/ch07.ts:33` — `-H 'Authorization: Bearer $API_TOKEN'` in single quotes: the variable is not expanded and the literal `$API_TOKEN` goes out. It contradicts the section's own text (`ch07.ts:41`, «from an environment variable the shell expands»).
6. `chapters/htmlCss/ch04.ts:132` — the comment «adjacent margins collapse: 24px wins over 16px» describes a different example: in the code shown `.title` has `margin-bottom: 0` and `.paragraph` has `margin-top: 0`, so there is nothing to collapse and 24px never appears.
7. `chapters/htmlCss/ch05.ts:27` — the comment «origin: user-agent» sits above `p { margin: 1em 0 }`: that is an author rule from an author stylesheet, not a user agent rule. The same error is in the «inline style» block (`ch05.ts:38`), where an ordinary class is used, so the demonstration of where a declaration comes from does not work at all.
8. `chapters/htmlCss/ch04.ts:179` — «The position property chooses one of six schemes»: CSS has five values (static/relative/absolute/fixed/sticky), and the table at `ch04.ts:211` is titled «The six positioning schemes» while containing five rows.
9. `chapters/htmlCss/ch06.ts:333` — the gap table row for multi-column is reversed: `gap` is `row-gap column-gap`, so the first value is the gap between column rows and the second is the gap between text columns. The table has it the other way round.
10. `chapters/nextjs/ch01.ts:174` — «a nested group such as `(shop)/(marketing)` does add one [a URL segment]»: a route group adds no URL segment at any depth. It contradicts the bullet of the same section («Route groups use parentheses and never appear in the URL»).
11. `chapters/nextjs/ch06.ts:326` — `// 'use cache' keeps it in the prerendered shell` sits in the position of JSX children: `//` in JSX is text, the comment renders on the page as a visible line.
12. `chapters/redux/ch01.ts:278` — `console.log(after === before); // true - no new object was created`: `badReducer` returns `{ ...state, at: Date.now() }`, a NEW object, so the comparison is false. The comment lies and contradicts the section's own prose (`ch01.ts:68`) about returning the same object.
13. `chapters/redux/ch06.ts:407` — `withTemp.ids.length; // 2 - two entries for the same post`: the data has 'a' and 'tmp-1', different posts with different ids, so two entries for one post are not shown. The section text (`ch06.ts:660`) describes the temporary id scenario the code does not contain.
14. `chapters/oop/ch02.ts:108` — `console.log(formatPrice(parsePrice('19,99'))); // '20.00 EUR'`: `parsePrice('19,99')` is 1999 cents, the output is '19.99 EUR'. The stated result is wrong.
15. `chapters/oop/ch04.ts:180` — `settle(new OverdraftAccount(), 200); // succeeds - the caller cannot tell`: the caller does notice the difference (one throws, the other does not). The comment asserts the opposite of what the section is about, which is a violation of LSP.
16. `chapters/reactRouter/ch03.ts:327` — «defer stays available for the code that still uses it» and the bullet at `:334` («defer still works»): `defer` was removed in React Router v7 (there is no `defer` export in the installed 7.18.4, verified against the package types). A non-existent API is named.
17. `chapters/architecture/ch07.ts:354` — `needsAttention` filters `metric.actual < metric.target`: on the section's own data this marks a healthy metric as a problem (p95 640 < 800) and misses the problem one (modules without coordination 7 > 3). The comparison direction is confused for metrics with different polarity.
18. `chapters/cli/ch08.ts:91` — the bullet «npm run --workspace runs a script in one package» is not a valid command; npm wants `npm run <script> --workspace <name>`. The code at `:112` gets it right.

## Shaping

1. `chapters/reactRouter/ch01.ts:226`, `:282` — references like «Chapter 7: useMatches and breadcrumbs» and «Chapter 5: scroll restoration and focus management» describe SECTIONS, not chapters (ch7 is «Testing and advanced routing», useMatches is 7-3). A reader following the index lands in a chapter with a different topic. The same defect: `reactRouter/ch03.ts:320`, `:384`, `ch04.ts:320`, `ch05.ts:176`.
2. `chapters/architecture/ch01.ts:344`, `ch02.ts:73`, `ch03.ts:267`, `ch04.ts:222`, `:309`, `:385`, `:459`, `ch05.ts:92` — the same defect: «Chapter 5: timeouts, retries and circuit breakers» and similar, while ch5 is «Cross-cutting concerns» and the described topic is section 5-4.
3. `chapters/oop/ch05.ts:147`, `:275`, `:405`, `ch06.ts:270`, `:335` — the same defect: «Chapter 1: encapsulation and private fields» (that is 1-3), «Chapter 3: composition over inheritance» (3-4), «Chapter 4: dependency inversion at the API boundary» (4-5), «Chapter 2: when a class is the wrong tool» (2-5).
4. `chapters/redux/ch05.ts:177` — «Chapter 7: listener middleware and side effects», while ch7 is «Side effects, persistence and testing» and listener middleware is 7-1.
5. `chapters/htmlCss/ch03.ts:176` — in the ARIA table the row «Toggle button» is identical in the «Native markup» and «ARIA version» columns («button with aria-pressed» / «aria-pressed»), so the comparison yields nothing.
6. `chapters/cli/ch06.ts:33` — the guard `if [[ -z "$target" ]]` can never fire: `target="${1:-world}"` already yields a non-empty value. The reader copies a check that never runs.
7. `chapters/cli/ch06.ts:318` — `path="${path#/home/}"` and `ext="${file##*.}"` (`ch06.ts:319`) run under `set -u` with uninitialised `path`/`file`, so the script dies with «unbound variable».
8. `chapters/architecture/ch06.ts:96` — `useEffect(..., [key, load])` with `load` as a function prop: an inline arrow recreates the effect on every render, a request loop. The section teaches the stale window and shows the trap at the same time.
9. `chapters/htmlCss/ch05.ts:120` — in the specificity example all four rules set the same `color: black`, so the cascade result is not observable. The example does not demonstrate what it is about.

## Polish

1. `chapters/cli/ch01.ts:50` — the callout heading «which is not the answer» is not a meaningful heading (the text inside is about `which` versus `type -a`).
2. `chapters/htmlCss/ch03.ts:259` — «Writing image of before the description»: the sentence is broken, the quotes around «image of» are missing.
3. `chapters/cli/ch08.ts:153` — «the portable separator is the command chaining operator instead of && in some cases» does not read; `&&` is the chaining operator.
4. `chapters/htmlCss/ch08.ts:17` — the prose says `@container (width > 30rem)` while the code and the table say 24rem.
5. `chapters/oop/ch07.ts:94` — the function is named `slugify` but returns 'HELLO WORLD'; no slug is produced.
6. `chapters/redux/ch03.ts:222` — «Its cache holds one entry by default» contradicts the next paragraph about the Reselect 5 weak-map cache with an entry per argument set.
7. `chapters/redux/ch05.ts:267` — 32 sections across the modules exceed the 10 to 22 line limit for code in `docs/textbook-authoring.md` (maximum 31 lines at `redux/ch05.ts:267`; 30 at `architecture/ch02.ts:147`; 29 at `architecture/ch02.ts:14`).

## Strongest sections

1. `chapters/cli/ch03.ts` (ch03-s6, «Pipes, exit statuses and pipefail») — every command and status was re-checked in bash: `false | true` gives 0, with `set -o pipefail` it gives 1, `PIPESTATUS` gives the status per stage. The section takes on exactly the trap it exists for and does not restate a reference.
2. `chapters/nextjs/ch03.ts` (ch03-s5, «Tags and on-demand revalidation») — tells `updateTag` (immediate expiry, read-your-own-writes), `revalidateTag` (stale-while-revalidate) and `revalidatePath` apart precisely, tied to Next.js 15/16, and names the real failure point: a tag string that differs between the write and the invalidation.
3. `chapters/reactRouter/ch05.ts` (ch05-s3, «Scroll restoration and focus management») — names a concrete trap (`tabIndex={-1}` is required or `focus()` silently does nothing, `preventScroll` is needed so the restored scroll is not cancelled) and divides responsibility clearly: the router restores the scroll, the page moves the focus.

## Criteria that came out clean

- **Language parity** — clean. An automatic comparison of EN/RU over all 286 sections (bullets, callouts, tables, body) found no API token, flag or name missing from the Russian text; the paragraph count matches everywhere. The only difference is 4.5 → «4,5», which is correct Russian typography.
- **No filler** — clean. No sentence that exists only for length, no «as we saw above», no «it is important to note that» in any of the checked sections; every section names a specific mistake or a specific behaviour.
- **Trap** — clean. Every checked section has a concrete mistake it prevents; no padded sections.
- **Terminology** — clean. The Russian text uses the vocabulary of the rest of the textbook («лендмарк», «редьюсер», «порт», «адаптер», «слой», «кеш», «стейл-while-ревалидация») rather than calques.
- **Cross-module references oop → js-core / typescript** — clean: all 13 references («Chapter 5 (js-core): objects, descriptors and the prototype chain», «Section 6-3 (js-core): private fields and real encapsulation», «Chapter 6 (typescript): branded types and safe APIs» and so on) resolve to real chapters and sections.
- **Existence of APIs, flags and commands** — clean except for the cases listed above: `proxy.ts`/`proxy` (Next.js 16), `cacheComponents`, `updateTag`, `cacheLife`, `cacheTag`, `use cache`, `revalidatePath`/`revalidateTag`, `after`, `instrumentation.ts`/`onRequestError`, `createMemoryRouter`/`initialEntries`/`initialIndex`, the `lazy` route property, `data()` from v7, `useActionState`/`useFormStatus`, `createRoutesStub`, `patchRoutesOnNavigation`, `createEntityAdapter`/`upsertOne`, `createSelector`/`weakMapMemoize`, `unwrapResult`, `isAnyOf`, `createListenerMiddleware` all exist and behave as described.
