# Textbook plan

The structure of the Learn > Textbook (Theory) tab for every module, as
built. The chapter counts below are the counts in the code, and
`npm run validate:content` fails if they drift apart.

## Why the rewrite

The textbook was the thinnest layer of the product. Per module it had 4 chapters
with 3 sections each, while the same module shipped 40-90 Q&A lessons, 50-60 quiz
questions and per-topic practice tasks. A chapter title promised a whole topic
("Types, values and coercion") but gave three dense sections, so the learner was
left with far more questions than answers.

The fix follows the shape that `architecture` already used: one chapter per
practice topic or quiz block, 4-5 sections per chapter, and every section
carrying prose, a bullet list, a runnable code sample, a takeaway, and where it
helps a comparison table, a callout and cross references.


| Module | Practice topics | Quiz blocks | Chapters before | Chapters after | Sections after |
| --- | --- | --- | --- | --- | --- |
| html-css | markup | 8 | 4 | 8 | 36 |
| git | git | 7 | 4 | 7 | 30 |
| cli | cli, tooling | 8 | 4 | 8 | 35 |
| oop | oop | 8 | 4 | 8 | 36 |
| http | http, security | 9 | 4 | 9 | 40 |
| js-core | types, loops, functions, arrays, objects, strings, numbers, async, dom, errors, algorithms | 14 | 4 | 14 | 75 |
| typescript | typescript, ts-advanced | 10 | 4 | 10 | 48 |
| react | react, hooks, forms, react-perf | 11 | 4 | 11 | 55 |
| redux | redux | 7 | 4 | 7 | 31 |
| react-router | router | 7 | 4 | 7 | 30 |
| nextjs | next | 9 | 4 | 9 | 40 |
| architecture | architecture | 7 | 5 | 7 | 32 |

One quiz block per chapter: the blocks of a module follow the chapters of the
textbook one to one and carry the title of their chapter.

## Section format

```ts
interface ChapterSection {
  id: string;
  title: LocalizedText;
  body: LocalizedText;          // 3-4 paragraphs, separated by \n\n
  bullets?: LocalizedText[];    // 4-6 concrete claims
  code?: string;                // 10-22 lines of runnable code
  takeaway?: LocalizedText;     // one rule, not a slogan
  table?: ChapterTable;         // comparisons worth tabulating
  callouts?: ChapterCallout[];  // note | tip | warning | pitfall
  seeAlso?: LocalizedText[];    // 2-3 cross references
}
```

Every text is bilingual: `en` and `ru` must carry the same technical precision
and the same length within 45 percent.

## Rules for the writing

1. Teach, not list. A section is a set of paragraphs that explains why a
   mechanism behaves the way it does, what breaks it and what to write instead.
2. Every section names the trap it exists to prevent. A section that could be
   deleted without losing anything should be deleted.
3. Code samples are real and runnable. Comments in English. No Markdown syntax
   inside a code string.
4. Tables only where a comparison carries information that prose would blur.
5. Callouts only where there is a genuine pitfall, risk or practical tip.
6. Cross references point at real chapters and sections.
7. No invented APIs. If a detail is uncertain, state the safe general rule.

## Structural rules

- One chapter file per chapter: `src/shared/content/chapters/<module>/chNN.ts`,
  exporting `export const <module>ChNN: Chapter`.
- A barrel `src/shared/content/chapters/<module>/index.ts` composes them in
  order, so agents can write chapters in parallel without merge conflicts.
- `chapterCountByModule` in `src/shared/content/chapters/index.ts` stays in sync
  with the barrel.
- `npm run validate:content` checks ids, bilingual completeness, paragraph and
  bullet minimums, table shape, cross references and broken encoding.

## Practice follows the textbook

The practice layer used to be the thinnest: 117 tasks against 144 theory
sections. The rule now is one task per textbook chapter, attached to the
chapter it drills through the `chapterId` field of `PracticeTask`.

- Task files live in `src/shared/content/tasks/chapters/<module>.ts` and export
  `<module>ChapterTasks`.
- The task id is `ch-<chapterId>-<n>`, the level follows the chapter number
  (1-3 basic, 4-7 intermediate, 8 and up advanced), and the topic is the
  practice topic that matches the chapter, so the task lands in the right group
  of the practice tab.
- `src/shared/content/tasks/taskIndex.ts` and `counts.ts` are generated:
  `npm run generate:task-index` rebuilds them from the task files. Never edit
  them by hand.
- `npm run validate:content` checks the task files too.

Result: 502 tasks across the twelve modules, one for every chapter.


## Chapter blueprints

Each line is `N. Chapter title` with its sections listed underneath. Section
ids follow `chapter N, section M`.

### js-core (14 chapters, 75 sections)

1. Values, types and coercion
   - Primitives, references and the typeof hole
   - Strict and loose equality
   - Truthiness and the eight falsy values
   - null, undefined, NaN and -0
   - Number precision, safe integers and money
2. Operators and control flow
   - Arithmetic operators and the plus trap
   - Increment, decrement and compound assignment
   - Logical operators and short-circuit evaluation
   - Optional chaining and nullish coalescing
   - Branching: if, ternary and switch
3. Variables, scope and hoisting
   - var, let and const
   - Hoisting and the temporal dead zone
   - Lexical scope and the scope chain
   - The global object and module scope
   - Shadowing and naming things well
4. Functions, arguments and closures
   - Function declarations, expressions and arrows
   - Parameters, defaults and destructuring
   - Rest arguments and the arguments object
   - this binding, call, apply and bind
   - Closures and the classic loop bug
   - Higher-order functions and pure functions
5. Objects, descriptors and the prototype chain
   - Object literals and property access
   - Property descriptors, accessors and enumerability
   - The prototype chain and property lookup
   - Object statics: assign, entries, freeze and seal
   - Symbols and well-known symbols
   - Iterables, the iterator protocol and spread
6. Classes, encapsulation and immutability
   - Classes are syntax over prototypes
   - Methods, static members and the prototype property
   - Private fields and real encapsulation
   - extends, super and the class hierarchy
   - Freezing, immutability and value equality
7. Arrays and collection methods
   - Creating arrays, length and holes
   - Iterating: forEach, map and filter
   - Searching: find, includes, some and every
   - reduce and fold patterns
   - Sorting, copying and mutating methods
   - Flattening, grouping and nested data
8. Loops, iterators and generators
   - for, while and do...while
   - break, continue and labels
   - for...of and the iterable protocol
   - for...in and its traps
   - Generators and async generators
9. Strings, regex and parsing
   - String primitives, UTF-16 and length
   - Template literals and tagged templates
   - The string methods that matter
   - Regular expression syntax and flags
   - Groups, lookaround and named groups
   - Parsing in practice: split, match and replace
10. Numbers, math, dates and Intl
    - Number parsing and conversion
    - Rounding and fixed precision
    - The Math object and randomness
    - Dates, timezones and the Date pitfalls
    - Intl: formatting numbers, dates and relative time
11. The event loop, promises and async/await
    - The call stack, tasks and microtasks
    - Promises: states and the executor
    - Promise chaining and error propagation
    - async/await and the async function model
    - Parallelism: all, allSettled, any and race
    - Cancellation, timeouts and AbortController
12. Errors, debugging and defensive coding
    - The Error types and the stack trace
    - try, catch, finally and error propagation
    - Custom error classes and error causes
    - Common runtime errors and their causes
    - Logging, debugging and defensive coding
13. Algorithms and data structures
    - Complexity and Big-O
    - Stacks and queues
    - Hash maps: Map and Set
    - Searching and sorting from scratch
    - Recursion, memoization and common patterns
14. The DOM and browser APIs
    - The document tree and selecting elements
    - Creating, changing and removing nodes
    - Events: phases, delegation and preventDefault
    - Forms, validation and FormData
    - Timers, requestAnimationFrame and observers

### typescript (10 chapters, 48 sections)

1. What TypeScript adds and what it erases
   - Compile time versus run time
   - Annotations, inference and contextual typing
   - Primitives, arrays, tuples and readonly
   - Literal types and widening
   - any, unknown, never and void
2. Unions, intersections and narrowing
   - Union types and discriminant properties
   - Narrowing with typeof, in and instanceof
   - Control flow analysis and exhaustiveness
   - Intersections and conflicting members
   - Type predicates and assertion functions
3. Interfaces, type aliases and generics
   - Interfaces versus type aliases
   - Optional properties and exactOptionalPropertyTypes
   - Index signatures and excess property checks
   - Generic functions and inference
   - Generic constraints and defaults
   - Generics in interfaces and classes
4. keyof, mapped types and utility types
   - keyof and indexed access
   - Mapped types and their modifiers
   - Homomorphic mapped types and key remapping
   - Built-in utility types: Partial, Pick, Omit, Record
   - ReturnType, Parameters and Awaited
5. Conditional types, infer and template literal types
   - Conditional types and distributivity
   - infer and the patterns it enables
   - Template literal types
   - Recursive conditional types
   - Where type-level programming stops paying off
6. Branded types and safe APIs
   - Nominal typing with brands
   - Parsing at the boundary
   - satisfies and literal validation
   - const assertions and as const
7. Classes, interfaces and modifiers
   - Class members and structural compatibility
   - Parameter properties and readonly
   - private, protected and public
   - Abstract classes and implements
   - Declaration merging and overloads
8. Modules, imports and project structure
   - ES modules and module resolution
   - Type-only imports and verbatimModuleSyntax
   - Declaration files and ambient types
   - Barrels and their cost
9. tsconfig and strictness
   - Compiler options and how to read them
   - The strict family
   - noUncheckedIndexedAccess and exactOptionalPropertyTypes
   - Path aliases and project references
   - Build modes and incremental compilation
10. Typing React, DOM and third-party code
    - Typing props and children
    - Events and refs
    - Hooks and generic components
    - Discriminated unions for component state
    - Typing untyped dependencies

### react (11 chapters, 55 sections)

1. JSX and elements
   - What JSX compiles to
   - Elements versus component instances
   - Keys and list rendering
   - Conditional rendering and composition
2. The rendering model
   - Rendering as a recursive walk of the tree
   - Reconciliation and the fiber tree
   - Batching and when the DOM is touched
   - Strict mode and double rendering
   - Concurrent rendering and transitions
3. Components and props
   - Function components and purity
   - Props, children and composition
   - Controlled versus uncontrolled inputs
   - Lifting state up
   - Choosing the component boundary
4. State
   - useState and the rules of state
   - State as a snapshot
   - Functional updates and stale closures
   - Derived state and useReducer
   - Batching and multiple updates
   - Colocation and normalised state
5. Effects
   - What effects are for
   - The dependency array and exhaustive deps
   - Cleanup and stale closures
   - useLayoutEffect versus useEffect
   - Effects that should not be effects
   - Common effect mistakes
6. Refs and the DOM
   - useRef for values and for DOM nodes
   - Reading and writing the DOM
   - Forwarding refs
   - useImperativeHandle
7. Context
   - Creating and reading context
   - Provider value identity and re-renders
   - Splitting contexts by update frequency
   - Context versus composition
   - useContext inside custom hooks
8. Custom hooks
   - Extracting logic
   - The rules of hooks and why the linter enforces them
   - Return shapes: object versus tuple
   - Sharing state versus sharing behaviour
9. Forms
   - Native form semantics
   - Controlled inputs and validation
   - Form libraries and what they buy you
   - Server actions and progressive enhancement
   - Accessibility of forms
10. Performance
    - Measuring before optimising
    - memo, useMemo and useCallback
    - React.memo and prop stability
    - List virtualisation and windowing
    - Code splitting, lazy and Suspense
    - Common performance traps
11. Server components, Suspense and testing
    - Server components and the client boundary
    - RSC data flow and serialisation
    - Suspense and error boundaries
    - React 19 APIs: use, actions and the form status
    - Testing React components

### html-css (8 chapters, 43 sections)

1. Semantic markup and document structure
   - Why semantics come first
   - Landmarks and the document outline
   - Headings and the heading outline
   - Lists, tables and their semantics
   - Metadata: title, description and social cards
2. Forms and native interactivity
   - Form controls and their attributes
   - Labels, fieldsets and legends
   - Native validation
   - Buttons and link semantics
   - Progressive enhancement
3. Accessibility
   - Why accessibility is a requirement
   - Keyboard navigation and focus order
   - ARIA and what it is actually for
   - Colour, contrast and visual design
   - Alt text, captions and media
   - Screen reader semantics and how to test them
4. The box model and layout fundamentals
   - The box model and box-sizing
   - Width, height and the containing block
   - Margin collapsing
   - Positioning schemes
   - Overflow and stacking contexts
5. The cascade, specificity and inheritance
   - Where a declaration comes from
   - Specificity and the cascade order
   - Inheritance and initial values
   - Custom properties and theming
   - Layers and @layer
6. Flexbox
   - The flex container and its two axes
   - flex-direction, wrap and justify-content
   - align-items, align-content and align-self
   - flex-grow, flex-shrink and flex-basis
   - gap and the gap override
7. Grid
   - The grid container and its tracks
   - repeat, minmax and fr
   - Placing items and named lines
   - Areas and templates
   - auto-fit, auto-fill and responsive grids
   - Subgrid and alignment across grids
8. Responsive design, animation and rendering cost
   - Media queries and container queries
   - Fluid sizing with clamp and min
   - Mobile first and progressive enhancement
   - Transitions and keyframes
   - will-change, content-visibility and render cost
   - Dark mode and prefers-color-scheme

What each chapter must cover:

1. Why a div soup is not a layout; how the browser builds the accessibility tree from the DOM; main, nav, header, footer, aside and their rules; heading levels as an outline that screen readers navigate by; why tables need captions and headers; title and meta description as the first thing a reader and a crawler see.
2. The full control inventory: input types, name, value, placeholder versus label, autocomplete; the label element and why a placeholder is not a label; fieldset and legend for grouped controls; the constraint validation API and when the browser message is enough; button versus a versus role=button and keyboard behaviour; a form that works without JavaScript and is enhanced with it.
3. WCAG as a contract, not a checklist; tab order and focus order are different things; the visible focus indicator; the first rule of ARIA is not to use ARIA; when role and aria-* are the right answer; contrast ratios and why colour is not the only signal; meaningful alt text, empty alt for decorative images, captions for video; testing with a keyboard and a screen reader.
4. content-box versus border-box and why box-sizing: border-box is the sane default; the containing block decides what percentage width means; collapsing margins, why they collapse and how to stop it; static, relative, absolute, fixed, sticky; overflow hidden creating a scroll container and a stacking context.
5. Origins, importance, specificity, inheritance, order; the specificity tuple and why inline styles and !important win; initial versus inherited values; custom properties are inherited and can hold anything; theming with custom properties and fallbacks; @layer makes the cascade order explicit instead of a specificity war.
6. main axis and cross axis; the flex properties as a shorthand for three values; justify-content versus align-items; align-content only matters with multiple lines; the flex basis decides the starting size and free space is distributed afterwards; gap replaced margins and does not collapse.
7. explicit versus implicit tracks, the line numbers, fr as a fraction of the free space; minmax and why it prevents overflow; placing items by line number or by name; grid-template-areas as a layout description; auto-fit collapses empty tracks and auto-fill keeps them; subgrid for aligning a nested grid with its parent.
8. Media queries by width, height, orientation and prefers-reduced-motion; container queries measure the component, not the viewport; clamp for fluid type and spacing; mobile first means the base styles are the small case; transitions for small state changes and keyframes for sequences; will-change costs memory, content-visibility skips rendering offscreen work; prefers-color-scheme and how to combine it with a manual toggle.

### http (9 chapters, 46 sections)

1. The HTTP protocol
   - Anatomy of a request and a response
   - Methods, idempotency and safety
   - Status codes and what they mean
   - HTTP versions and keep-alive
   - The origin and the request pipeline
2. Headers and content negotiation
   - Request headers that matter
   - Response headers that matter
   - Content types and negotiation
   - Content encoding versus content type
   - CORS and the preflight request
3. Caching
   - Cache-Control and freshness
   - max-age, s-maxage and stale-while-revalidate
   - Validators: ETag and Last-Modified
   - Conditional requests and the 304
   - CDNs and edge caching
   - Cache invalidation strategies
4. Connections, compression and transfer
   - Keep-alive and connection pools
   - HTTP/2 multiplexing and HPACK
   - HTTP/3 and QUIC
   - Compression: gzip and brotli
5. Identity and authentication
   - Cookies: attributes and scope
   - Sessions versus tokens
   - JWT and what it does not solve
   - OAuth 2 and OpenID Connect
   - CSRF and XSS in the auth context
6. Security on the wire
   - TLS and certificates
   - HSTS and secure cookie flags
   - CSP, XSS and output encoding
   - CSRF tokens and SameSite
   - Clickjacking and framing policy
   - Injection, SSRF and path traversal
7. REST resource modelling
   - Resources, URIs and methods
   - Status codes in practice
   - Versioning strategies
   - Pagination: offset, cursor and keyset
   - Idempotency keys and safe retries
8. API design
   - Request and response shapes
   - Naming and field conventions
   - Error formats
   - Filtering, sorting and search
   - Long-running operations and webhooks
9. Performance and observability
   - Measuring latency and TTFB
   - Payload size and compression
   - Rate limiting and backpressure
   - Health checks and readiness
   - Tracing, logs and metrics

What each chapter must cover:

1. The request line, headers and body and the response status line, headers and body; GET, POST, PUT, PATCH, DELETE and HEAD and their safety and idempotency semantics; the status code classes and which code to return for which outcome; HTTP/1.1 keep-alive versus HTTP/2; what happens between a click and a response: DNS, TCP, TLS, request, response.
2. Request headers that change behaviour: Host, Origin, Referer, User-Agent, Cookie, Accept, Authorization; response headers: Content-Type, Content-Length, Cache-Control, ETag, Location, Set-Cookie; content negotiation through Accept and Content-Type; content encoding (gzip, br) versus content type; the CORS preflight, which requests are simple and which trigger OPTIONS.
3. Cache-Control directives and what each one forbids or permits: no-store, no-cache, private, public, max-age, s-maxage, immutable; freshness versus validation; stale-while-revalidate; validators ETag and Last-Modified; conditional requests with If-None-Match and If-Modified-Since and the 304 response; CDN edge caching and cache keys; invalidation by purge, versioned URLs or TTL.
4. Connection reuse and the cost of a handshake; HTTP/2 multiplexing and HPACK header compression and the head-of-line blocking it removes; HTTP/3 over QUIC and what 0-RTT means; which content compresses well and what to exclude.
5. Cookie attributes and their scope: Domain, Path, Expires, Max-Age, Secure, HttpOnly, SameSite; session cookies versus persistent ones; opaque server-side tokens versus self-contained tokens; what a JWT actually proves and what it does not (revocation, storage, size, audience); OAuth 2 roles and the authorization code flow with PKCE; OpenID Connect and the ID token; how CSRF and XSS interact with the auth mechanism.
6. TLS in brief: handshake, certificate chain and validation; HSTS and preload; Content Security Policy as an XSS mitigation and why output encoding is still required; CSRF tokens and SameSite=Lax/Strict/None; X-Frame-Options and frame-ancestors; SQL and command injection, SSRF and path traversal as a family of unvalidated input bugs.
7. Resources as nouns and URLs as identifiers; the cost of deep hierarchies; status codes in practice including 201 with Location, 204, 409, 422 and 429; versioning by URI, header or date and their trade-offs; pagination by offset, cursor and keyset and the skip problem of offset; idempotency keys for safe retries.
8. Request and response envelopes; naming and field conventions including dates, money, enums and nulls; error formats and the problem details shape; filtering, sorting and search parameters; long-running work with 202, polling and webhooks.
9. TTFB and where the time actually goes; payload size as the cheapest performance lever; rate limiting with 429 and Retry-After and token buckets; backpressure; health checks versus readiness probes; request ids, structured logs and the three pillars of observability.

### oop (8 chapters, 41 sections)

1. The object model in JavaScript
   - Objects, properties and the prototype chain
   - Classes are syntax over prototypes
   - Encapsulation in practice: private fields, getters and closures
   - Identity, equality and value objects
   - Copying, mutation and immutability
2. Encapsulation and abstraction
   - Where the rules live
   - Modules as encapsulation
   - Information hiding and the public surface
   - Data clumps and value objects
   - When a class is the wrong tool
3. Inheritance and polymorphism
   - Inheritance and the fragile base class
   - Polymorphism through interfaces
   - Template method and the protected hook
   - Composition over inheritance
   - Mixins and trait-like composition
4. SOLID in practice
   - Single responsibility
   - Open-closed
   - Liskov substitution
   - Interface segregation
   - Dependency inversion
   - SOLID in a React codebase
5. Design patterns
   - Strategy and factory
   - Observer and subscriber
   - Repository and unit of work
   - Decorator, adapter and facade
   - Command and state
   - Which patterns survive in modern frontend code
6. Domain building blocks
   - Entities, aggregates and invariants
   - Value objects
   - Domain events
   - Application context and use cases
   - Anemic versus rich domain models
7. Functional patterns
   - Pure functions and referential transparency
   - Function composition and pipes
   - Currying and partial application
   - Point-free style and when it hurts
   - Immutable data structures in practice
8. Failure handling in object-oriented code
   - Exceptions versus result types
   - Error boundaries and recovery
   - Retries, idempotency and failure modes
   - Logging and observability in the domain layer

What each chapter must cover:

1. Objects as maps of properties with hidden classes behind them; prototypes and the chain of lookups; class as syntax over a constructor function and a prototype; real encapsulation with private fields, with getters and with closures; identity versus equality and why === compares references for objects; value objects that compare by value; shallow versus deep copying and immutability as the way out.
2. Where the rules live: in the class, in the module or in the type system; module privacy as the cheap form of encapsulation; information hiding and the deliberately small public surface; data clumps and the value object that removes them; when a class is the wrong tool and plain data with functions is better.
3. The fragile base class problem and what actually breaks when a base class changes; polymorphism through interfaces and structural typing; the template method with a protected hook and why it is still inheritance; composition over inheritance with a worked example; mixins and trait-like composition in TypeScript.
4. Single responsibility as one reason to change; open-closed as extending without touching; Liskov substitution and how to break it with a mutable base state; interface segregation and the fat interface problem; dependency inversion at the API boundary; how all five look in a React codebase where hooks replace inheritance and feature folders replace packages.
5. Strategy for a replaceable algorithm; factory for creation; observer for event subscription; repository for the persistence boundary; unit of work for the transaction; decorator for wrapping; adapter for interface translation; facade for a simplified entry point; command and state; which patterns still pay off in modern frontend code and which are cargo cult.
6. Entity with identity, value object without it, aggregate as the consistency boundary and the rule that only the aggregate root is modified from outside; domain events named in the past tense and published after the fact; application service or use case as the orchestrator; application context as the place where collaborators are wired; anemic versus rich domain models and the tell for each.
7. Purity and referential transparency; composition and pipe; currying and partial application; point-free style and when it hurts readability; immutable data structures and how JavaScript approximates them; Object.freeze and the conventions that make immutability real.
8. Exceptions versus result types and the trade-off between them; error boundaries and recovery; retries with backoff and why idempotency is the precondition; failure modes and circuit breakers; logging inside the domain layer and what never belongs in a log.

### git (7 chapters, 38 sections)

1. The object model and the three trees
   - Blobs, trees and commits
   - The three trees: working directory, index, HEAD
   - References, HEAD and the reflog
   - The commit graph and ancestry
   - Hashes, SHAs and content addressing
2. Staging and committing
   - git add, the index and partial staging
   - git commit and what it records
   - Writing commit messages that explain why
   - Amending and fixing the last commit
   - Pre-commit hooks and linting
3. Branches, merges and conflicts
   - Branches are pointers
   - The merge base and the three-way merge
   - Merge strategies and fast-forward
   - Rebase and history rewriting
   - Resolving conflicts
   - Interactive rebase
4. Undoing changes safely
   - git reset and its three modes
   - git restore and git revert
   - git stash
   - The reflog as a safety net
   - Recovering lost commits
   - Cleaning untracked files
5. Remotes and collaboration
   - Remotes, fetch and push
   - Pull strategies: merge, rebase and pull --rebase
   - Tracking branches and upstream
   - Force push and --force-with-lease
   - Submodules and worktrees
6. Pull requests and releases
   - Branch naming and workflow
   - Pull requests and review
   - Tags, annotated tags and semver
   - Changelogs and release automation
   - Hotfixes on production
7. Advanced git
   - Git bisect
   - Git notes and blame
   - Cherry-pick and revert
   - Sparse checkout and partial clone
   - Signing commits and tags
   - Hooks, CI and monorepos

What each chapter must cover:

1. Blobs, trees and commits as the three object types and what each stores; a commit as a snapshot plus pointers to a tree and to parent commits; the working directory, the index and HEAD as three separate places a change can live; HEAD as a symbolic ref and the reflog as the local history of HEAD; the commit graph and how ancestry is computed; SHA-1 hashes as content addresses and what that guarantees.
2. git add writing to the index and what the index really is; partial staging with git add -p; what a commit records: the tree, the parent and the message; commit messages that explain why and not what; git commit --amend and the rule about never amending a public commit; pre-commit hooks and why linting belongs before the commit rather than in CI alone.
3. A branch as a movable pointer to a commit; the merge base and the three-way merge; fast-forward versus a real merge commit; when to merge and when to rebase; interactive rebase with reword, squash, fixup and drop and why it rewrites history; resolving conflicts and the stages of the index; merge versus rebase and why the rule "rebase your own work, merge shared work" exists.
4. git reset with soft, mixed and hard and exactly what each one moves; git restore for both the working tree and the index; git revert as a new commit that undoes an old one; git stash and the stash stack; the reflog as the safety net that recovers work nobody committed; git clean and how dangerous it is; the recovery playbook for the three common accidents.
5. Remotes as named URLs; fetch versus pull; pull strategies: merge, rebase and pull --rebase; upstream tracking and git push -u; force push and why --force-with-lease is the safe form; submodules and worktrees and when each is the right tool.
6. Branch naming conventions that encode intent; pull requests as a review artefact rather than a git feature; review comments and how to respond to them; lightweight versus annotated tags and semver; changelogs and release automation; hotfix branches released straight to production.
7. git bisect and automating the search with git bisect run; git blame and reading it correctly, with the caveats about moved lines; cherry-pick for selective changes and why it duplicates commits; revert versus cherry-pick for undoing; sparse checkout and partial clone for huge repositories; signing commits and tags and verifying them; hooks of every kind and how CI fits around them.

### cli (8 chapters, 43 sections)

1. The shell and the command line
   - What a shell is and how it parses a command
   - Quoting, escaping and expansion
   - Paths, the working directory and symlinks
   - The environment and variables
   - Exit codes and the shell as a program
2. Finding files and text
   - Globbing and shell expansion
   - find and its predicates
   - grep, fgrep and rg
   - fd and ripgrep versus the classic tools
   - Piping search results into other tools
3. Text processing pipelines
   - stdin, stdout, stderr and redirection
   - The Unix text toolbox: cat, sort, uniq, cut, tr
   - sed and awk
   - jq for structured data
   - tee and process substitution
   - Pipes, exit statuses and pipefail
4. Processes, jobs and signals
   - Running processes in the background
   - Job control and terminal control
   - Signals and graceful shutdown
   - ps, top, kill and process trees
   - nohup, disown and long-running jobs
5. Permissions and the file system
   - Users, groups and ownership
   - The permission bits
   - umask and default permissions
   - su, sudo and privilege escalation
   - Hard links, symlinks and special files
6. Shell scripting
   - Variables, tests and quoting
   - set -euo pipefail and safe scripts
   - Functions, arguments and exit codes
   - traps and cleanup
   - Arrays, globbing and parameter expansion
   - Reading files and processing lines
7. Networking and remote work
   - curl and the HTTP verbs
   - ssh and the config file
   - scp, rsync and transfers
   - Port forwarding and tunnels
   - Talking to databases from the terminal
8. Build and automation tooling
   - Node, npm and the lockfile
   - Package managers and workspaces
   - Task runners and npm scripts
   - Bundlers, transpilers and what each one does
   - Linters, formatters and pre-commit
   - CI pipelines from the command line

What each chapter must cover:

1. What a shell actually is and how it turns a line into a process: lexing, tokenising, expansion, then execution; quoting rules that decide whether a string is a word or a glob; the difference between the shell's own glob expansion and a program's argument parsing; the working directory, absolute versus relative paths and how a symlink changes what a path means; exporting variables versus shell variables; exit codes as the contract between programs.
2. Shell expansion of globs and what happens when nothing matches; find with its predicates and the difference from globbing; grep, fgrep and rg with the options that matter; fd and ripgrep against the classic tools and why the modern ones are faster; chaining a search into another tool.
3. stdin, stdout, stderr and the three redirections plus the append forms; the Unix philosophy of one tool per job; cat, sort, uniq, cut, tr and head and tail as the core set; sed for stream edits and awk as a programming language over lines; jq for JSON as a structured alternative to text munging; tee and process substitution; pipefail and why the exit status of a pipeline is only the last command by default.
4. Running a command in the background with & and with nohup; job control with jobs, fg and bg; what a terminal session actually is and how the shell and the child process share it; signals: SIGINT, SIGTERM, SIGHUP and what a process should do on SIGTERM; ps, top and kill and reading a process tree; disown and why a background job dies with the shell.
5. Users, groups and ownership and how the kernel checks them; the nine permission bits and how they combine into rwx for the owner, the group and others; umask and where default permissions come from; su, sudo and the principle of least privilege; hard links versus symlinks versus device and fifo files.
6. Variables, quoting and the difference between "$var" and $var; test and its failure modes under set -e; set -euo pipefail and what each flag protects against and what it does not; functions, positional parameters and returning codes; traps for cleanup and why exit codes must be preserved; arrays, globbing, parameter expansion and command substitution; reading a file line by line safely.
7. curl for each HTTP verb, headers and saving responses; ssh with the config file, keys and agent forwarding; scp and rsync and why rsync transfers only differences; local and remote port forwarding and when each is used; talking to a database and to a container runtime from the terminal.
8. Node as the runtime and npm as the package manager; the lockfile and why it is committed; the difference between dependencies, devDependencies and peerDependencies; workspaces for a monorepo; npm scripts, the pre and post hooks and cross-platform problems with shell syntax in scripts; what a bundler, a transpiler and a type checker each do and in which order they run; linters, formatters and pre-commit hooks; a CI pipeline expressed as commands you can run locally.

### redux (7 chapters, 38 sections)

1. The mental model of Redux
   - The store and the state tree
   - Actions and the reducer contract
   - dispatch and the unidirectional flow
   - Why reducers must be pure
   - Immer and immutable updates
2. Slices and the shape of a domain
   - createSlice and its parts
   - extraReducers and cross-slice reactions
   - prepare and payload normalisation
   - Selecting a domain
   - Organising slices per feature
3. Reading state: selectors and memoisation
   - Writing selectors
   - Parameterised selectors and factories
   - Memoisation with createSelector
   - Reselect and reference equality
   - When memoisation pays off
4. Asynchronous data flow
   - The createAsyncThunk lifecycle
   - Handling pending, fulfilled and rejected
   - unwrapResult and error handling
   - Polling and cancellation
   - Race conditions and the last request wins
   - Normalising a request inside a slice
5. RTK Query
   - Endpoints and the cache
   - Tags and invalidation
   - Optimistic updates
   - Mutations and invalidation strategies
   - The generated hooks
   - When RTK Query is the wrong tool
6. Collections and the entity adapter
   - Normalised state
   - The entity adapter API
   - Sorting, filtering and selectors over an adapter
   - Pagination with an adapter
   - Deduplicating by id
7. Side effects, persistence and testing
   - Listener middleware
   - Persistence and rehydration
   - DevTools and time travel
   - Testing slices, thunks and selectors
   - Testing components with a store
   - Common state architecture mistakes

What each chapter must cover:

1. The store as a single object holding the whole state tree; actions as plain descriptions of what happened and why nothing else belongs in them; the reducer as a pure function from state and action to state; dispatch as the only way to change anything; why reducers must be pure and what breaks when they are not; Immer producing a new state and how that fits the immutability contract.
2. createSlice and the three things it generates: actions, action creators and the reducer; extraReducers for reacting to actions from other slices and the action type strings behind it; prepare for normalising a payload before it reaches the reducer; choosing the shape of one slice; how to organise slices per feature rather than per type.
3. Selectors as the read side and why components should not reach into state directly; parameterised selectors built as factories so the memoisation is per argument set; createSelector and how it caches the last result; Reselect and the reference equality that makes memoisation work; when memoisation pays off and when it is pure overhead.
4. The three states of a thunk and the action types they produce; handling pending, fulfilled and rejected in extraReducers; unwrapResult and the alternative of try and catch around unwrap; polling and cancelling a thunk; the race condition when two requests for the same resource overlap and the last one to start is not the last one to finish; normalising the request lifecycle inside one slice.
5. RTK Query as a data layer inside Redux; endpoints and the cache that the library owns; tags for describing which entries an endpoint invalidates; optimistic updates and the rollback when the request fails; mutations and choosing between invalidation, optimistic update and manual patching; the generated hooks and why they are better than raw thunks for data; when RTK Query is the wrong tool.
6. Normalised state as ids in an array and entities in a map; the entity adapter and the operations it provides; sorting, filtering and selectors over an adapter; pagination with an adapter and the cursor bookkeeping; deduplicating by id and what happens when the server changes the id.
7. Listener middleware as the place for side effects that are not thunks; persistence and rehydration and the hydration edge cases; the DevTools and time travel and what it is actually good for; testing slices, thunks and selectors in isolation; testing components with a real store and a mocked API; the common architecture mistakes, including state duplication, fetching the same data twice and business logic in components.

### react-router (7 chapters, 35 sections)

1. Route trees and navigation
   - Nested routes, layout routes and index routes
   - Pathless routes and splat routes
   - Outlet and the layout hierarchy
   - Link, NavLink and relative navigation
   - Programmatic navigation
2. Data in the URL
   - Path parameters with useParams
   - Query strings with useSearchParams
   - Search parameter helpers and filters
   - Location state and its limits
   - Choosing what lives in the URL
3. The data router
   - createBrowserRouter and the router object
   - Loaders and useLoaderData
   - Actions and useActionData
   - Forms, fetchers and progressive enhancement
   - errorElement and error boundaries
   - defer and streaming data
4. Protection and authorisation
   - Redirects and route guards
   - Authentication versus authorisation
   - Protecting server loaders
   - Handling unauthenticated responses
   - Role-based access control in the router
5. Lazy loading and performance
   - Lazy route segments
   - Suspense and route-level fallbacks
   - Scroll restoration and focus management
   - Preloading on intent
6. Data fetching patterns with routers
   - The loader cache and revalidation
   - Revalidation strategies
   - Optimistic UI with actions
   - Mutations and error handling
   - When to use a query library instead
7. Testing and advanced routing
   - createMemoryRouter in tests
   - Asserting on loaders and actions
   - useMatches and breadcrumbs
   - Nested error handling
   - Custom history and file-based routing

What each chapter must cover:

1. The route tree as data: path, element, children, index; layout routes that add no path segment; index routes and the index prop; pathless routes for grouping without a segment; splat routes for the not-found case; Outlet and how the layout hierarchy renders; Link, NavLink and the active state; navigate and the difference between push and replace.
2. Path parameters and useParams and the rules for optional and catch-all segments; query strings as serialised state with useSearchParams; helper functions that wrap search parameter access; location state and its defining weakness, that it disappears on refresh; the rule that anything shareable belongs in the URL.
3. createBrowserRouter and what the router object actually is; loaders and useLoaderData and why the data arrives before the component renders; actions and useActionData; forms and fetcher and progressive enhancement without JavaScript; errorElement and how error boundaries work in the router; defer and streaming data with Suspense.
4. Redirects as a return value from a loader and when to use them instead of rendering; authentication versus authorisation and why a guard is not a security boundary; protecting loaders on the server where the decision can be trusted; handling a 401 versus a 403 and the different UI each needs; role-based access control expressed in the route tree.
5. Lazy route segments and code splitting per route; Suspense and route-level fallbacks so the layout does not blink; scroll restoration and moving focus to the new page heading after navigation; preloading on intent so the route is ready before the click lands.
6. The loader cache and what revalidation means; revalidation strategies and when the router refetches after an action; optimistic UI with actions and how to keep the UI consistent when the action fails; handling errors in mutations; when a dedicated query library is the better choice.
7. createMemoryRouter for tests with a controlled history; asserting on what the loader was called with and what the action returned; useMatches and building breadcrumbs from the matched routes; nested error handling and which boundary catches what; custom history implementations; file-based routing and how it maps onto the same route objects.

### nextjs (9 chapters, 47 sections)

1. The App Router
   - Folder conventions and the route tree
   - Layouts, templates and groups
   - Dynamic and catch-all segments
   - Loading, error and not-found boundaries
   - Route handlers versus pages
2. Server and client components
   - The server component model
   - What runs where
   - The client boundary and what can cross it
   - Serialisation rules
   - Composition patterns across the boundary
   - Common "use client" mistakes
3. Data fetching and caching
   - fetch and the request memoisation cache
   - The full route cache
   - The data cache and revalidation
   - Dynamic versus static rendering
   - Tags and on-demand revalidation
   - Cache components and the new model
4. Server actions
   - What a server action is
   - Validation and authorisation
   - useActionState and form state
   - Revalidation after a mutation
   - Progressive enhancement and errors
5. Middleware and routing
   - What middleware can and cannot do
   - Redirects, rewrites and headers
   - Matcher configuration
   - Authentication at the edge
   - Middleware performance
6. Rendering strategies
   - Static generation
   - Dynamic rendering
   - Incremental static regeneration
   - Streaming and Suspense
   - Partial prerendering
   - Choosing a strategy per route
7. Metadata, images and fonts
   - The metadata API
   - Open Graph and social cards
   - next/image and the loader
   - Fonts and self-hosting
8. Production concerns
   - Environment variables
   - Deployment targets and adapters
   - Caching headers and the CDN
   - Observability and error reporting
   - Bundle size and the client boundary
9. Data layer patterns
   - Server-side data access
   - Route handlers as an API
   - tRPC and typed APIs
   - Background jobs and webhooks
   - Migrations and schema changes

What each chapter must cover:

1. The App Router conventions and how a folder becomes a URL; layout, template and page and the difference between them; route groups with parentheses and their effect on the URL; dynamic, catch-all and optional segments; loading, error and not-found boundaries and where they may be placed; route handlers and when a page and a handler are different things.
2. The server component model and the rule that a component is a server component unless it opts out; what runs where and why it matters for bundle size; the client boundary and the rules about what may cross it; serialisation of props across the boundary and the values that cannot be passed; passing server-rendered children into client components; the most common use client mistakes and their cost.
3. The fetch request memoisation cache and how it differs from the data cache; the full route cache for pages and the separate cache for route handlers; the data cache and the tags attached to it; dynamic versus static rendering and what opts a route into dynamic; on-demand revalidation with revalidateTag and revalidatePath; the cache components model and what changes when nothing is cached by default.
4. What a server action is and how the framework turns a function into an endpoint; the security requirement that every action validates its input and authorises the caller; useActionState and the pending and error state of a form; revalidation after a mutation and how the client learns about it; progressive enhancement and the no-JavaScript path.
5. What middleware runs on and what it cannot reach; redirects, rewrites and header modification; the matcher configuration and the cost of a broad matcher; authentication at the edge and why it is a fast check and not a substitute for a real one; the performance budget of middleware and where it runs.
6. Static generation and what it means for a build; dynamic rendering and the cost per request; incremental static regeneration with a revalidate window and the on-demand variant; streaming and Suspense and what reaches the browser first; partial prerendering and what it suspends; choosing a strategy per route instead of one global setting.
7. The metadata API and static versus generated metadata; Open Graph and Twitter cards and the images they need; next/image and what the loader does for you; fonts and why self-hosting removes a render-blocking request.
8. Environment variables and the split between server and client; deployment targets and the adapters; cache headers and how the CDN is configured; error reporting and observability in production; bundle size and the cost of the client boundary.
9. Server-side data access and keeping the database connection on the server; route handlers as an API and their limits; tRPC and end-to-end type safety; background jobs and webhooks and why a request should not wait for slow work; migrations and the rule that a schema change ships separately from the code that depends on it.

### architecture (7 chapters, 39 sections)

1. Layers and dependency direction
   - What a layer is
   - Two axes of organisation
   - Why dependencies point inward
   - Presentation, application and data layers
   - Layer violations and how to spot them
2. Clean architecture and ports and adapters
   - Entities and domain rules
   - Use cases as the application core
   - Ports and adapters
   - Dependency inversion in practice
   - Mapping between layers
   - When clean architecture is overkill
3. Module boundaries and feature-based architecture
   - Folders by feature
   - The public API of a module
   - Barrels and their downsides
   - Cycles and enforced boundaries
   - Shared code versus feature code
4. Service architecture
   - Monolith and modular monolith
   - Microservices and splitting criteria
   - Communication and the API gateway
   - Data ownership
   - What distribution costs you
   - Testing a distributed system
5. Cross-cutting concerns
   - Configuration and feature flags
   - Errors, logging and observability
   - Transactions, outbox and idempotency
   - Timeouts, retries and circuit breakers
   - Caching layers
   - Testing the architecture
6. Frontend architecture in depth
   - State ownership and where state lives
   - Server state versus client state
   - Design systems and component contracts
   - Routing as an application boundary
   - Micro-frontends and their costs
   - Migrating a legacy frontend
7. Architecture decisions and trade-offs
   - ADRs and why they exist
   - Making and recording decisions
   - Cost of a decision and reversibility
   - Quality attributes and scenarios
   - Reviewing an architecture over time

What each chapter must cover:

1. A layer as a ring of code that may only depend on the ring inside it; the two axes of organisation, by technical layer and by feature; why dependencies point inward, because the policy should not depend on the mechanism; the presentation, application and data layers with a concrete example each; how layer violations look in a real codebase and how to spot them.
2. Entities and the domain rules that belong to them; use cases as the application core and why the core has no framework in it; ports as the interfaces the core declares and adapters as the implementations the outside world provides; dependency inversion applied to a fetch call and to a clock; mapping between layers and the cost of translation; when clean architecture is overkill and plain functions are better.
3. Folders by feature versus folders by type; the public API of a module and why an explicit index is what enforces it; barrels and the two problems they cause, cycles and lost tree shaking; detecting cycles and enforcing boundaries with tooling; deciding what is shared code and what stays inside a feature.
4. Monolith and modular monolith and the difference that matters is the deployment unit; microservices and the criteria that justify the split; communication between services and the API gateway; data ownership and why a shared database couples services silently; what distribution costs in operations, latency and debugging; testing a distributed system and why it is harder than it looks.
5. Configuration and feature flags and how a flag lets you separate deployment from release; errors, logging and observability as cross-cutting concerns; transactions and the outbox pattern for reliable events; timeouts, retries with backoff and circuit breakers; caching layers and the invalidation problem; testing the architecture itself with dependency rules.
6. State ownership and the rule that a piece of state has exactly one owner; server state versus client state and the different tools for each; design systems and the contract between a component and its consumers; routing as an application boundary that divides the codebase; micro-frontends and what they cost in runtime and in organisation; migrating a legacy frontend incrementally.
7. ADRs, what they are and why the decision matters more than the implementation; making a decision, recording it and reviewing it later; the cost of a decision and the question of reversibility; quality attributes expressed as scenarios with stimuli and responses; reviewing an architecture over time and letting it evolve without rewriting it.


