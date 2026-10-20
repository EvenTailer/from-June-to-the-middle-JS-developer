# Critic report — textbook chapters (http and spot checks)

15 chapters / 78 sections read in full, plus the nine http tasks.
Machine checks passed (`validate:content`, `tsc --noEmit`).

Totals: 46 findings — 14 blocking, 18 shaping, 14 polish.

## Blocking

1. `chapters/http/ch01.ts:30` — `Content-Length: 27` but the body `{"id":42,"status":"paid"}` is 25 bytes; the header lies and a reader who copies it gets a broken response. The same error is duplicated at `ch01.ts:220`.
2. `chapters/http/ch02.ts:84` — `Content-Length: 46` but the body `{"id":1042,"sku":"A-1","qty":2,"status":"created"}` is 50 bytes.
3. `chapters/http/ch02.ts:189` — «if the client did not send Accept-Encoding, the server must return the body uncompressed» contradicts RFC 9110 §12.5.3 («any content coding is considered acceptable») and the next sentence of the same paragraph.
4. `chapters/http/ch04.ts:202` — the bullet «Compression happens only when the client sends Accept-Encoding» repeats the same wrong rule.
5. `chapters/http/ch02.ts:242` — «Only the headers listed in Access-Control-Expose-Headers become readable to JavaScript» is wrong: the CORS-safelisted response headers (Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified, Pragma) are always readable by a script.
6. `chapters/http/ch04.ts:103` — `response.httpVersion` does not exist on a WHATWG `Response` (it is a property of `http.IncomingMessage` in Node); the comment `// '2'` lies, the value printed is `undefined`. The same error is at `ch04.ts:156`.
7. `chapters/http/ch06.ts:96` — «Max-Age of zero or omit Expires» is presented as two equivalent options: `Max-Age=0` deletes the cookie at once while omitting `Expires` makes it a session cookie. The two advice lines are opposite.
8. `chapters/http/ch07.ts:280` — `if (!claimed) return respond(409, …)` answers 409 for any key that is already taken, although the section text (`ch07.ts:256`) requires 409 only when «the key repeats with a different body»; a legitimate repeat with the same body must get the stored response, not an error.
9. `chapters/http/ch08.ts:196` — the status comes from the query string without an allowlist (`ch08.ts:182` requires an allowlist for every value), and the limit is `Math.min(Number(…), 100)`: for `limit=abc` that is `NaN`, for `limit=-5` a negative value passes. The callout at `ch08.ts:206` demands «clamp on the server, every time».
10. `chapters/http/ch07.ts:249` — a cross reference points to «Section 3-5: cache invalidation strategies», but 3-5 is «CDNs and edge caching»; invalidation strategies are 3-6, so the pointer leads to the neighbouring section.
11. `chapters/jsCore/ch05.ts:17` — «delete arr.length is simply ignored»: the `length` of an array is non-configurable, so in strict mode `delete arr.length` throws a TypeError, and the paragraph is about strict mode throughout.
12. `chapters/jsCore/ch05.ts:93` — «writable: false … it can still be changed through a setter»: a data property cannot have a setter, `writable` belongs to a data descriptor while an accessor descriptor has get and set instead. The callout at `jsCore/ch05.ts:152` states the rule correctly, so the chapter contradicts itself.
13. `chapters/react/ch02.ts:145` — the comment «Three updates in one handler» sits next to two setter calls. A comment that does not match the code.
14. `chapters/react/ch05.ts:108` — the second effect calls `handle()` on mount and on every change of `query`, so it sends an undebounced `onSearch` around the debounce of the first effect. The example does exactly what the section warns against.

## Shaping

1. `chapters/http/ch02.ts:127` — `Accept-Charset` is presented as a live negotiation mechanism (also in the table at `ch02.ts:162`) with no note that RFC 9110 §12.5.2 deprecated it and no browser sends it.
2. `chapters/http/ch03.ts:304` — «Three strategies cover most systems» above a table with four rows, and stale-while-revalidate is not an invalidation strategy.
3. `chapters/http/ch04.ts:33` — the comment «destroy sockets that stayed idle for 5s» is imprecise: the agent timeout is a socket inactivity timeout and the socket is only destroyed when no request is pending on it, and the agent still emits `timeout`.
4. `chapters/http/ch04.ts:139` — «no congestion window to climb from scratch» is wrong for QUIC: QUIC has its own connection state and its own congestion controller with slow start; what disappears is the TCP handshake.
5. `chapters/http/ch06.ts:154` — «the difference is one character» is not what separates `textContent` from `innerHTML`; the claim is wrong and it motivates the rule wrongly.
6. `chapters/http/ch06.ts:192` — the cell «Misses: Script run through a DOM sink such as innerHTML» is wrong for a nonce policy: `script-src` without `unsafe-inline` blocks inline handlers and injected scripts alike.
7. `chapters/http/ch06.ts:233` — the bullet «A token in a second cookie does not help, the attacker page can read it too» contradicts the callout at `ch06.ts:282`: the attacker does not read a cookie of another origin, it forges one from a subdomain.
8. `chapters/http/ch08.ts:110` — the row «Empty value: avoid 0, use null» is wrong: 0 is a full value, not an empty one.
9. `chapters/http/ch08.ts:247` — the webhook signature example computes the same HMAC twice and compares nothing, although the comment at `ch08.ts:248` claims «compares in constant time».
10. `chapters/http/ch08.ts:82` — the comment lists the enum values `created | paid | cancelled | shipped` while the code assigns `awaiting_payment`, which is not in the list.
11. `chapters/http/ch09.ts:254` — `x-request-id` is taken from the client and returned unchecked, although the section warns against untrusted input; a client can put anything into the logs.
12. `chapters/http/ch01.ts:266` — «TLS negotiates keys and certificates»: the client verifies the server certificate, a client certificate only appears when the server asks for one.
13. `chapters/typescript/ch01.ts:296` — «every nested object is frozen as well» (and the bullet at `ts/ch01.ts:302`) reads as a runtime freeze; `as const` gives compile-time readonly only, which the callout at `ts/ch01.ts:378` states correctly.
14. `chapters/typescript/ch01.ts:104` — «it becomes never[] or an implicit any depending on the flags» is imprecise: the result depends on `const` versus `let` and on how the variable is used, not on compiler flags.
15. `chapters/react/ch05.ts:178` — `handlerRef.current = handler` writes to a ref during render, and `react/ch02.ts:17` in this same textbook forbids side effects in the component body.
16. `chapters/react/ch02.ts:169` — the column «Touches the DOM: layout only» is misleading: passive effects are free to change the DOM, the column mixes «before paint» with «touches the DOM».
17. `src/shared/content/tasks/chapters/http.ts:332` — the same broken limit bound (NaN and negative), and the explanation at `http.ts:335` claims «the limit is clamped so one request cannot ask for the whole table».
18. `src/shared/content/tasks/chapters/http.ts:248` — the solution issues an unsigned double-submit cookie, exactly the pattern that `ch06.ts:282` calls a trap, and the brief requirement «the client sends the token back in a header» is not shown in the solution.

## Polish

1. `chapters/http/ch01.ts:189` — the takeaway repeats the first bullet of the same section verbatim.
2. `chapters/http/ch04.ts:237` — the callout «Compressed twice is corrupt» duplicates `ch02.ts:224` word for word in both languages; sections 2-4 and 4-4 cover the same material.
3. `chapters/http/ch03.ts:99` — RU «Сколько свежее» is not a grammatical question («Сколько свежим он остаётся»).
4. `chapters/http/ch03.ts:130` — RU «дать устаревший попадание»: wrong agreement and a poor translation of «stale hit».
5. `chapters/http/ch03.ts:190` — RU «разделитель» instead of tiebreaker; also at `ch03.ts:197`.
6. `chapters/http/ch05.ts:224` — RU «Вызовов API» in an «Используется для» cell needs the genitive «Вызова API».
7. `chapters/http/ch02.ts:110` — RU «неASCII-символами»: needs a hyphen, «не-ASCII-символами».
8. `chapters/http/ch08.ts:127` — a second cross reference to the same 7-3 with the heading «where a renamed field breaks clients», which no section carries.
9. `chapters/http/ch06.ts:96` — «the preload token» is an odd wording for the `preload` directive; `max-age=31536000` is the minimum for preload, not «the shortest useful form».
10. `chapters/http/ch09.ts:242` — «The identifier has to be generated at the edge, because by the time the request reaches the first service it has already passed through something you do not control» does not follow from what was said.
11. `chapters/git/ch03.ts:17` — «Creating a branch writes forty bytes»: a loose ref is a 40 character hash plus a newline (41 bytes), and 65 in a SHA-256 repository. The number is presented as exact.
12. `chapters/typescript/ch05.ts:132` — «a template of the form prefix and string» describes type identifiers without a separator, so the syntax cannot be reconstructed from it.
13. `chapters/typescript/ch01.ts:257` — the row `string | number[]` in the «Array, tuple or readonly» table does not answer the table's questions (Length: any, Mutable: depends).
14. `chapters/jsCore/ch05.ts:72` — validator warning: the Russian callout heading is half the length of the English one, so the meaning is compressed in translation.

## Criteria that came out clean

- **Coverage** — clean. Every one of the 46 sections names a mechanism and explains the behaviour instead of listing the API; no list-shaped sections.
- **Trap** — clean. Every section has a meaningful mistake it exists to prevent and names it in a callout.
- **Language parity** — clean in substance: no difference in paragraph count or in the set of claims between EN and RU; the RU remarks are grammar and terminology only (`ch03.ts:99`, `ch03.ts:130`, `ch03.ts:190`, `ch05.ts:224`, `ch02.ts:110`).
- **No filler** — clean. A search across the whole http module for «as we saw», «it is important to note», «важно отметить», «как мы уже видели» and similar returned no match.
- **Terminology** — clean overall; the only deviation from the established vocabulary is «разделитель» instead of tiebreaker (`ch03.ts:190`, `ch03.ts:197`).

## Strongest sections

1. `chapters/http/ch03.ts` §3-3 «Validators: ETag and Last-Modified» — the only section that names the surprising behaviour exactly: strong and weak validators, the ban on a weak ETag in range requests, the one second granularity of `Last-Modified`, the precedence of `If-None-Match` over `If-Modified-Since`. The trap is named outright and the example is a real 200/304 exchange with correct headers.
2. `chapters/http/ch05.ts` §5-3 «JWT and what it does not solve» — states the subject precisely: what a JWT proves (aud, iat, exp, the signature) and what it does not (that the user is still current, revocation, rights at the moment of issue). The trap is named (the algorithm comes from the header, alg confusion) and the verification example matches the text: RS256 is pinned and aud and exp are checked.
3. `chapters/http/ch09.ts` §9-3 «Rate limiting and backpressure» — the only place that shows non-obvious mechanics: the token bucket against the fixed window counter (the double limit at the window boundary) and the `write() === false` to `pause()` to `drain` to `resume()` contract. The code matches the described algorithm and the callout about limiting per identity rather than per address adds what most textbooks leave out.
