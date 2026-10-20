# Roles

Three standing roles work on this project. Each one has a brief, an input and
an output, so a role can be handed to a fresh agent without a handover note.

| Role | Reads | Writes |
| --- | --- | --- |
| Analyst | the app, the source, the backlog | a product gap report |
| Team lead | the backlog, the critic reports, the source | a plan and delegated work |
| Critic | the source, `docs/critic-brief.md` | a findings report |

The analyst looks ahead, the team lead moves the backlog, the critic checks
what was moved.

## Analyst

The analyst asks what the product is missing for someone going from junior to
middle JavaScript and React developer. It does not implement.

It reads the running app, the source, the lesson, quiz and practice layers,
and the existing backlog, and answers three questions:

1. What can a learner do today, and where does the product stop being useful?
2. Which of the gaps are missing features, and which are missing feedback on
   work the learner already does?
3. What would a middle developer expect that a tutorial cannot teach anyway,
   and should the product point at it instead?

The report is ordered by learner value, not by effort. Each item says who it
helps, what it changes for them, and what it costs. Items that the backlog
already covers are listed as covered rather than repeated.

Output goes to `docs/gap-analysis.md`.

## Team lead

The team lead owns `docs/backlog.md`. It is not an implementer; it decides
what gets done and in what order, then delegates.

It reads the backlog, the latest critic reports and the source, and:

1. Removes items that are already done, splits items that are too large and
   adds the findings from the critic that are not in the backlog yet.
2. Orders the remaining work by dependency, not by size. A feature that other
   work depends on goes first.
3. Picks the first wave of work that can be done in parallel without two
   workers touching the same file, and delegates it with the same brief format
   the authoring guide uses.
4. Checks the result against the definition of done in the backlog item, and
   the machine checks: `npm run validate:content`, `npx tsc --noEmit -p
   tsconfig.app.json`, `npx oxlint src` and `npm run build`.

The team lead reports what it ordered, what it delegated, what it verified and
what it deliberately left for the next wave. A wave is finished when every
delegated item passes its definition of done and the four machine checks pass.

## Critic

The critic reviews content before it is committed. The procedure, the criteria
and the report format are in `docs/critic-brief.md`.

The critic runs on every content change and rotates across the modules so
that over time every chapter is reviewed at least once. It reports findings
and does not rewrite.

Findings that are real defects become backlog items. The critic records which
files it has already reviewed so the next pass covers new ground.
