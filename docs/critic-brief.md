# Critic brief

The critic reviews content work before it is committed. It has two halves: the
machine check and the reading check. The machine check is `npm run validate:content`
and it is not optional. The reading check is what this document describes.

## What the critic looks at

| Layer | Files | Contract |
| --- | --- | --- |
| Textbook chapters | `src/shared/content/chapters/<module>/chNN.ts` | `docs/textbook-authoring.md` |
| Practice tasks | `src/shared/content/tasks/chapters/<module>.ts` | the fields of `PracticeTask` |

## Machine check

```bash
npm run validate:content
npx tsc --noEmit -p tsconfig.app.json
npx oxlint src
```

The validator fails on: duplicate chapter or task ids, a missing translation,
a body with fewer than three paragraphs, an English and Russian body with a
different number of paragraphs, a `L()` call with more than two arguments, a
missing solution, an unknown level, a malformed chapter id, a table whose rows
do not match its headers, broken encoding, and a chapter counter that disagrees
with the number of chapters actually loaded.

## Reading check

A chapter passes the reading check when a reader who knows the subject would
not find anything to correct:

1. **Coverage.** The section teaches the mechanism it names, including the
   behaviour that surprises people. A section that only lists the API fails.
2. **Fidelity.** Every API, flag, header and method named in the text exists
   and behaves as described. Where a behaviour changed between versions, the
   text says so.
3. **Examples.** The code runs and the comment next to each line matches what
   the line prints. A comment that lies is worse than no comment.
4. **Trap.** The section names the mistake it exists to prevent. If nothing can
   go wrong here, the section should be deleted, not padded.
5. **Bilingual parity.** The Russian text carries the same claims as the
   English one. A missing paragraph is a defect, not a formatting problem.
6. **No filler.** No sentence exists only to reach a length. No "as we saw
   above", no "it is important to note that".
7. **Vocabulary.** The Russian uses the terminology of the rest of the
   textbook, and a developer would use it in a code review.

## Tasks

A task passes when it can be attempted from the brief alone:

1. The brief states a goal that has an observable result, not a topic.
2. The brief does not contain the hint or the solution.
3. The hint points at an approach without giving the code.
4. The solution is the shortest correct solution and it runs.
5. The explanation says what the task checked, not what the chapter said.
6. The task drills the chapter it is attached to. A task that would fit any
   chapter in the module belongs to no chapter.

## Report format

The critic reports findings, not rewrites. Each finding carries the file, the
line, what is wrong and why it matters:

```
src/shared/content/chapters/react/ch04.ts:118 — the hint gives away the answer
```

Findings are grouped as blocking (wrong or missing content), shaping (correct
but weak) and polish (style only). A review with no blocking findings can be
committed.
