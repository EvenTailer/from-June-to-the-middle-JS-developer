# Textbook plan

Target structure of the Learn > Textbook (Theory) tab for every module.

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
| html-css | markup | 5 | 4 | 8 | 36 |
| git | git | 5 | 4 | 7 | 30 |
| cli | cli, tooling | 5 | 4 | 8 | 35 |
| oop | oop | 5 | 4 | 8 | 36 |
| http | http, security | 5 | 4 | 9 | 40 |
| js-core | types, loops, functions, arrays, objects, strings, numbers, async, dom, errors, algorithms | 5 | 4 | 14 | 75 |
| typescript | typescript, ts-advanced | 6 | 4 | 10 | 48 |
| react | react, hooks, forms, react-perf | 6 | 4 | 11 | 55 |
| redux | redux | 5 | 4 | 7 | 31 |
| react-router | router | 5 | 4 | 7 | 30 |
| nextjs | next | 6 | 4 | 9 | 40 |
| architecture | architecture | 5 | 5 | 7 | 32 |

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


