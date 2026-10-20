# Writing a textbook chapter

This is the authoring guide for the Theory tab. Follow it exactly: an agent
writes one chapter per file and the result must pass `npm run validate:content`.

## File layout

```
src/shared/content/chapters/<module>/chNN.ts
```

```ts
import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const <module>ChNN: Chapter = {
  id: '<module>-chNN',
  title: L('Chapter title', 'Название главы'),
  summary: L('One sentence on what the chapter covers.', 'Одно предложение о том, что покрывает глава.'),
  sections: [ /* ... */ ],
};
```

The barrel `src/shared/content/chapters/<module>/index.ts` imports the chapter
files in order. It is the only file that knows the chapter order, so chapters
can be written in parallel.

## Section shape

```ts
{
  id: '<module>-chNN-sM',
  title: L('Section title', 'Название секции'),
  body: L('Paragraph one.\n\nParagraph two.\n\nParagraph three.', 'Абзац один.\n\nАбзац два.\n\nАбзац три.'),
  bullets: [L('One concrete claim.', 'Одно конкретное утверждение.'), /* 4 to 6 items */],
  code: `real, runnable JavaScript`,
  takeaway: L('One rule, not a slogan.', 'Одно правило, а не лозунг.'),
  table: {
    caption: L('What the table shows.', 'Что показывает таблица.'),
    headers: [L('Column', 'Колонка'), L('Column', 'Колонка')],
    rows: [[L('Cell', 'Ячейка'), L('Cell', 'Ячейка')]],
  },
  callouts: [
    { tone: 'pitfall', title: L('Short label', 'Короткая метка'), text: L('What goes wrong and why.', 'Что ломается и почему.') },
  ],
  seeAlso: [L('Chapter 4: where property lookup happens', 'Глава 4: где ищется свойство')],
}
```

## Rules

1. **Bilingual, always.** Every `en` has a `ru`. The Russian text must carry the
   same technical precision and stay within 45 percent of the English length.
   Write natural Russian with the established terminology, not a word-for-word
   translation.
2. **Prose, not bullets.** `body` is 3 to 4 paragraphs of 45 to 90 English words
   each, separated by `\n\n` inside a single string. No Markdown, no headings,
   no lists, no emoji. Never open with "In this chapter we will".
   `L()` takes exactly two arguments, one string for `en` and one for `ru`:
   the paragraphs live inside those two strings, not as extra arguments.
3. **A section earns its place.** Name the trap it prevents. If a section could
   be deleted without losing anything, delete it.
4. **Bullets are claims.** 4 to 6 items, each one specific and checkable.
5. **Code runs.** 10 to 22 lines of real JavaScript with English comments. No
   Markdown inside a code string. Escape `${` as `\${` and regex backslashes as
   `\\d` inside template literals.
6. **Takeaway is a rule.** One sentence a reader can apply tomorrow.
7. **Tables compare.** Include one only where a comparison carries information
   prose would blur. Two to four columns, three to six rows.
8. **Callouts warn.** One or two per section, only for a genuine pitfall,
   warning, tip or note. Tones: `note`, `tip`, `warning`, `pitfall`.
9. **Cross references are real.** Two or three entries pointing at chapters and
   sections that exist, written as `Chapter N: ...` or `Section N-M: ...`.
10. **No invented APIs.** Only real, current JavaScript and platform APIs. When
    a detail is uncertain, state the safe general rule instead.
11. **Touch only your own files.** Do not edit the barrel, other chapters,
    shared types or the UI.

## Before you finish

Run `npm run validate:content` from the project root and make sure your files
produce no errors. Warnings about a missing table or callout are acceptable when
the content does not need one.
