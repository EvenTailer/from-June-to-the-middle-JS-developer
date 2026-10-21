import type { TaskCaseInput } from './caseInput';

/**
 * The cases of the tasks of the types topic.
 *
 * The file `types.ts` of this folder holds the shape of a case, so the cases
 * of the topic live in `typesCases.ts`.
 */
export const typesCases: Record<string, TaskCaseInput[]> = {
  'topic-types-1': [
    { fn: 'describeType', input: 'null' },
    { fn: 'describeType', input: 'undefined' },
    { fn: 'describeType', input: '[]' },
    { fn: 'describeType', input: '{}' },
    { fn: 'describeType', input: '"hi"' },
    { fn: 'describeType', input: '42' },
    { fn: 'describeType', input: 'true' },
  ],
  'topic-types-2': [
    { fn: 'toBoolean', input: '0' },
    { fn: 'toBoolean', input: '""' },
    { fn: 'toBoolean', input: 'NaN' },
    { fn: 'toBoolean', input: 'null' },
    { fn: 'toBoolean', input: 'undefined' },
    { fn: 'toBoolean', input: '[]' },
    { fn: 'toBoolean', input: '{}' },
    { fn: 'toBoolean', input: '"0"' },
  ],
  'topic-types-3': [
    { fn: 'toNumber', input: '"42"' },
    { fn: 'toNumber', input: '" 3.5 "' },
    { fn: 'toNumber', input: '"12px"' },
    { fn: 'toNumber', input: '"abc", -1' },
    { fn: 'toNumber', input: 'null' },
    { fn: 'toNumber', input: 'undefined, 7' },
    { fn: 'toNumber', input: 'true' },
  ],
  'topic-types-4': [
    { fn: 'isSameJson', input: '{ b: 1, a: [1, { d: 4, c: 3 }] }, { a: [1, { c: 3, d: 4 }], b: 1 }' },
    { fn: 'isSameJson', input: '[1, 2], [2, 1]' },
    { fn: 'isSameJson', input: '{ a: 1 }, { a: 1, b: undefined }' },
    { fn: 'isSameJson', input: '1, "1"' },
  ],
  'topic-types-5': [
    { fn: 'addValues', input: '"1", "2"' },
    { fn: 'addValues', input: '1, "2"' },
    { fn: 'addValues', input: '"a", 2' },
    { fn: 'compareNumbers', input: '"10", "9"' },
    { fn: 'compareNumbers', input: '"10", "10"' },
    { fn: 'compareNumbers', input: '"b", 1' },
  ],
  'topic-types-6': [
    { fn: 'isString', input: '"a"' },
    { fn: 'isString', input: 'new String("a")' },
    { fn: 'isNumber', input: '5' },
    { fn: 'isNumber', input: '"5"' },
    { fn: 'isNumber', input: 'NaN' },
    { fn: 'isPlainObject', input: '{}' },
    { fn: 'isPlainObject', input: '[]' },
    { fn: 'isPlainObject', input: 'new Date()' },
  ],
  'topic-types-7': [
    { fn: 'parseUser', input: '{ id: 1, name: "Ann", email: "ann@example.com" }' },
    { fn: 'parseUser', input: '{ id: 2, name: "Bo" }' },
    { fn: 'parseUser', input: '{ id: 3, name: "Cy", email: "cy@example.com" }' },
  ],
  'topic-types-8': [
    { fn: 'describeEvent', input: '{ type: "user:created", payload: { id: 1, name: "Ann" } }' },
    { fn: 'describeEvent', input: '{ type: "user:deleted", payload: { id: 7 } }' },
    { fn: 'describeEvent', input: '{ type: "system:ping" }' },
    { fn: 'describeEvent', input: '{ type: "other" }' },
  ],
};
