import type { TaskCaseInput } from './caseInput';

/** The cases of the tasks of the strings topic. */
export const stringsCases: Record<string, TaskCaseInput[]> = {
  'topic-strings-1': [
    { fn: 'reverseWords', input: '"hello world"' },
    { fn: 'reverseWords', input: '"  the quick brown fox  "' },
    { fn: 'reverseWords', input: '"single"' },
    { fn: 'reverseWords', input: '"   "' },
    { fn: 'reverseWords', input: '""' },
  ],
  'topic-strings-2': [
    { fn: 'titleCase', input: '"hello WORLD"' },
    { fn: 'titleCase', input: '"the quick brown fox"' },
    { fn: 'titleCase', input: '"hello, world!"' },
    { fn: 'titleCase', input: '""' },
  ],
  'topic-strings-3': [
    { fn: 'slugify', input: '"Hello, World!"' },
    { fn: 'slugify', input: '"  React 18 in 2024  "' },
    { fn: 'slugify', input: '"C++ & Rust"' },
    { fn: 'slugify', input: '"---"' },
    { fn: 'slugify', input: '""' },
  ],
  'topic-strings-4': [
    { fn: 'truncate', input: '"Hello world", 8' },
    { fn: 'truncate', input: '"Hello", 5' },
    { fn: 'truncate', input: '"Hello world", 5' },
    { fn: 'truncate', input: '"Hello world", 3' },
    { fn: 'truncate', input: '"Hi", 0' },
  ],
  'topic-strings-5': [
    { fn: 'countVowels', input: '"Hello World"' },
    { fn: 'countVowels', input: '"AEIOU"' },
    { fn: 'countVowels', input: '"xyz"' },
    { fn: 'countVowels', input: '""' },
    { fn: 'countVowels', input: '"JavaScript 42!"' },
  ],
  'topic-strings-6': [
    { fn: 'isPalindrome', input: '"A man, a plan, a canal: Panama"' },
    { fn: 'isPalindrome', input: '"No \'x\' in Nixon"' },
    { fn: 'isPalindrome', input: '"hello"' },
    { fn: 'isPalindrome', input: '"12321"' },
    { fn: 'isPalindrome', input: '""' },
  ],
  'topic-strings-7': [
    { fn: 'parseQuery', input: '"a=1&b=2"' },
    { fn: 'parseQuery', input: '"q=hello+world&lang=ru"' },
    { fn: 'parseQuery', input: '"a=1&a=2"' },
    { fn: 'parseQuery', input: '"name=John%20Doe"' },
    { fn: 'parseQuery', input: '"flag"' },
    { fn: 'parseQuery', input: '""' },
  ],
  'topic-strings-8': [
    { fn: 'maskEmail', input: '"john.doe@example.com"' },
    { fn: 'maskEmail', input: '"a@b.co"' },
    { fn: 'maskEmail', input: '"bad"' },
    { fn: 'maskPhone', input: '"+7 (999) 123-45-67"' },
    { fn: 'maskPhone', input: '"1234"' },
    { fn: 'maskPhone', input: '"123"' },
    { fn: 'maskPhone', input: '"12345"' },
  ],
};
