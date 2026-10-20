# Backlog

Open work for the tutorial. The team lead triages this list, orders it by
dependency and delegates it to workers. New findings from the critic are
appended here with the same shape.

Each item carries a definition of done that a worker can check without asking.

## B1. Verify a learner's own code

The practice tab shows an exemplar solution. Nothing lets a learner submit
their own code and find out whether it works.

- A code editor next to the solution, prefilled with the exemplar.
- The task file gains an optional `tests` field: an array of `{ input, expected }`
  pairs or a single `test` source string that runs against the learner's code.
- The check runs in a sandboxed iframe with `postMessage`; the page never
  evaluates learner code in the main realm.
- The result lists the cases that failed, with the expected and the actual
  value.
- A task without tests keeps the current read-only behaviour.

Done when a learner can write code, run it and see which cases fail.

## B2. Quiz blocks follow the chapters

`quizBlockTitles` in `src/shared/content/quizBlocks.ts` lists 5 to 6 fixed
titles per module while the module now has 7 to 14 chapters.

- One quiz block per chapter, titled with the chapter title.
- The block count follows the chapter count.
- Questions stay where they are; only the grouping and the titles change.

Done when the quiz tab shows one block per chapter and the titles match.

## B3. The Questions tab no longer repeats the textbook

`lessons` holds 40 to 90 question cards per module that overlap heavily with
the new chapters. Decide and implement one of:

- shrink `lessons` to the 15 to 20 questions that carry the most value, or
- fold the questions into the sections and remove the tab.

Done when the four tabs say four different things.

## B4. The main bundle is 2 MB

`src/shared/content/index.ts` statically imports all twelve modules, so every
lesson and quiz question ships in the entry chunk.

- Keep module metadata eager, load `lessons` and `quiz` per module.
- The module route uses `React.lazy`.

Done when the entry chunk is under 700 kB and the module page still loads its
questions.

## B5. The content validator runs in the build

`npm run validate:content` is never run automatically.

- `npm run build` runs the validator first and fails on a content error.

Done when a bad chapter id breaks the build.

## B6. Code samples in the textbook are checked

A code block can claim an output that the code does not produce.

- A script extracts every `code` field from the chapters and checks that it
  parses.
- For samples that are self contained, it runs them and compares the output
  with the comments.

Done when `npm run validate:content` fails on a sample that does not parse.

## B7. The plan document describes the current state

`docs/textbook-plan.md` was written as a target and now matches what exists.

- Rewrite it as a description of the current textbook.

Done when the chapter counts in the document are the counts in the code.

## B8. The app-wide search

Each tab has its own search, or none. The theory tab has one, the questions
tab has one, the practice tab has none.

- One search field in the header that searches modules, chapters, questions and
  tasks.
- Results grouped by kind, each result links to where it lives.

Done when a search for a term finds the chapter, the question and the task
that mention it.

## B9. The chapter a task drills is visible

`PracticeTask.chapterId` is set but never shown.

- The practice card links to the chapter it belongs to.
- The theory tab links back to the tasks of the chapter.

Done when a learner can move between a chapter and its task in both
directions.

## B10. The module page shows the textbook progress

The module hero shows questions and tasks but not chapters.

- Show chapters read next to the other two counters.

Done when the hero shows the three layers.
