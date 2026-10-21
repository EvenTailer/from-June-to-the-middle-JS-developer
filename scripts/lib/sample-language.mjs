// Detects the language of a code sample.
//
// The content of the course holds shell commands, HTML pages, CSS blocks,
// HTTP transcripts, SQL and JSON next to JavaScript. A checker that compiles
// every sample as TypeScript reports errors that have nothing to do with the
// correctness of the sample, so both the checker and the test generator ask
// this module what a sample really is.

/** A language a sample can be written in. */
export const SAMPLE_LANGUAGE = {
  JS: 'js',
  JSX: 'jsx',
  TS: 'ts',
  TSX: 'tsx',
  HTML: 'html',
  CSS: 'css',
  SHELL: 'shell',
  HTTP: 'http',
  JSON: 'json',
  SQL: 'sql',
  MARKDOWN: 'markdown',
  TEXT: 'text',
};

/** The languages the browser can run in the task runner. */
export const RUNNABLE_LANGUAGES = new Set([SAMPLE_LANGUAGE.JS]);

/** The languages the TypeScript compiler can check. */
export const CHECKABLE_LANGUAGES = new Set([
  SAMPLE_LANGUAGE.JS,
  SAMPLE_LANGUAGE.JSX,
  SAMPLE_LANGUAGE.TS,
  SAMPLE_LANGUAGE.TSX,
]);

const CSS_PROPERTIES =
  /\b(?:color|background|background-color|font|font-size|font-family|margin|padding|border|display|position|top|left|right|bottom|width|height|max-width|min-height|opacity|z-index|transition|transform|box-shadow|flex|grid|align-items|justify-content|gap|overflow|content|cursor|outline|list-style|text-align|line-height|letter-spacing|white-space|--[a-z-]+)\s*:/i;

const JS_MARKERS = [
  /\bfunction\b/,
  /\bconst\b/,
  /\blet\b/,
  /\bvar\b/,
  /\breturn\b/,
  /=>/,
  /\bclass\s+\w+/,
];

/** A comment that stands in front of the code of a sample. */
const LEADING_COMMENT = /^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*$)+/;

/**
 * The markers of a TypeScript sample. Every one of them is a syntax that
 * JavaScript does not have. The markers of the other languages win: a CSS
 * block can hold `=>` inside a comment.
 */
const TS_MARKERS = [
  /\binterface\s+\w+/,
  /\btype\s+\w+\s*[=<]/,
  /\bexport\s+(?:type|interface|enum)\b/,
  /\b(?:const|let)\s+\w+\s*:\s*(?!=)/,
  /\bfunction\s+\w+\s*\([^)]*:\s*[A-Za-z_$]/,
  /\)\s*:\s*[A-Za-z_$][\w$<>[\]|&.]*\s*\{/,
  /\bas\s+(?:const|[A-Z]\w*)/,
  /\bsatisfies\s+[A-Z]/,
  /\bimplements\b/,
  /\b(?:public|private|protected|readonly)\s+\w+\s*[:(]/,
  /\benum\s+\w+/,
  /\babstract\s+class\b/,
  /\bdeclare\s+(?:const|function|module|global)\b/,
  /<\w+(?:\s*,\s*\w+)*>\s*\(/,
];

/**
 * A JSX tag: a name that is followed by a space, a slash or a closing angle
 * bracket. The name must not follow a word, so that `Array<T>` and `f<T>(x)`
 * stay a generic signature.
 */
const JSX_TAG_ANY = /(?:^|[^\w$.])<([A-Za-z][\w.]*)(?=[\s/>])/;

/**
 * The same tag, but not the tags of HTML. A sample without JavaScript that
 * holds `<style>` is a style block, not JSX.
 */
const HTML_TAG_NAMES =
  'div|span|article|section|html|head|body|main|header|footer|nav|p|ul|ol|li|table|tbody|thead|tr|td|th|form|input|button|select|option|textarea|label|h[1-6]|img|a|strong|em|pre|code|script|style|meta|link|svg|path';

const JSX_TAG_NOT_HTML = new RegExp(
  `(?:^|[^\\w$.])<(?!(?:${HTML_TAG_NAMES})\\b)([A-Za-z][\\w.]*)(?=[\\s/>])`,
);

const HTML_TAG =
  /<\/?(?:div|span|article|section|html|head|body|main|header|footer|nav|p|ul|ol|li|table|tbody|thead|tr|td|th|form|input|button|select|option|textarea|label|h[1-6]|img|a|strong|em|pre|code|script|style|meta|link|svg|path)\b[^>]*>/i;

const SHELL_COMMAND =
  /^\s*(?:git\s+(?:commit|rebase|merge|checkout|log|status|add|push|pull|branch|tag|stash|reset|restore|bisect|blame|cherry-pick|worktree|switch|diff|show|init|clone|config|remote|revert|apply|show)\b|npm\s+(?:run|install|ci|test|create|publish)\b|npx\s+\w|node\s+\S|pnpm\s+\S|yarn\s+\S|cd\s+\S|ls\b|mkdir\b|cp\s|mv\s|rm\s|echo\s|cat\s|grep\s|curl\s|docker\s|kubectl\s|terraform\s)/m;

/**
 * A generic arrow function such as `<T>(value: T) => value`. A tag of JSX is
 * never followed by an opening bracket, so this is a type, not a tag.
 */
const GENERIC_ARROW = /<\s*[A-Z]\w*\s*>\s*\(/;
const GENERIC_ARROW_ALL = /<\s*[A-Z]\w*\s*>\s*\(/g;

/**
 * Tells whether a sample holds JSX. Inside a sample that holds JavaScript
 * every tag is a JSX tag, so the `<div>` of a component counts. A sample
 * without JavaScript holds markup instead.
 */
export function hasJsx(code) {
  const holdsJavaScript = JS_MARKERS.some((marker) => marker.test(code));
  const pattern = holdsJavaScript ? JSX_TAG_ANY : JSX_TAG_NOT_HTML;
  if (!pattern.test(code)) return false;
  if (GENERIC_ARROW.test(code)) {
    return pattern.test(code.replace(GENERIC_ARROW_ALL, ''));
  }
  return true;
}

/**
 * Tells whether a sample is a TypeScript sample. The markers of the other
 * languages win: a CSS block can hold `=>` inside a comment.
 */
export function isTypeScript(code) {
  return TS_MARKERS.some((marker) => marker.test(code));
}

/**
 * Returns the language of a sample. The result is one of the values of
 * SAMPLE_LANGUAGE.
 */
export function detectSampleLanguage(code) {
  const text = String(code ?? '');
  const trimmed = text.trim();
  if (trimmed === '') return SAMPLE_LANGUAGE.JS;

  // A shebang marks a shell script.
  if (/^#!\s*\//.test(trimmed)) return SAMPLE_LANGUAGE.SHELL;

  // An HTTP transcript: a request line or a status line.
  if (
    /^\s*(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S+\s+HTTP\/\d/m.test(text) ||
    /^\s*HTTP\/\d(?:\.\d)?\s+\d{3}/m.test(text) ||
    /^\s*(?:Host|Content-Type|Content-Length|Authorization|Accept|Cookie|Set-Cookie|User-Agent|Location|Cache-Control|ETag|Vary|X-[A-Za-z-]+):\s*\S/m.test(text)
  ) {
    return SAMPLE_LANGUAGE.HTTP;
  }

  // A SQL statement.
  if (/^\s*(?:SELECT\b|INSERT\s+INTO\b|UPDATE\s+\w+\s+SET\b|DELETE\s+FROM\b|CREATE\s+TABLE\b|ALTER\s+TABLE\b|DROP\s+TABLE\b)/im.test(text)) {
    return SAMPLE_LANGUAGE.SQL;
  }

  // A whole JSON document. A comment may stand in front of it.
  const withoutComment = text.replace(LEADING_COMMENT, '').trim();
  if (withoutComment.startsWith('{') || withoutComment.startsWith('[')) {
    try {
      JSON.parse(withoutComment);
      return SAMPLE_LANGUAGE.JSON;
    } catch {
      // Not a JSON document, carry on.
    }
  }

  // A shell session: the commands of the sample are shell commands.
  if (SHELL_COMMAND.test(text) && !/\bfunction\b|=>/.test(text)) {
    return SAMPLE_LANGUAGE.SHELL;
  }

  // A style block on its own is CSS, a page around it is HTML.
  const withoutStyle = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').trim();
  if (withoutStyle === '' && /<style[\s>]/i.test(text)) {
    return SAMPLE_LANGUAGE.CSS;
  }

  // An HTML document or a fragment of markup.
  if (/^\s*<!DOCTYPE\s+html/i.test(trimmed) || /^\s*<html[\s>]/i.test(trimmed)) {
    return SAMPLE_LANGUAGE.HTML;
  }
  if (HTML_TAG.test(text) && !/\bfunction\b|=>/.test(text)) {
    return SAMPLE_LANGUAGE.HTML;
  }

  // A CSS block: property lines and a rule, but no JavaScript.
  if (
    CSS_PROPERTIES.test(text) &&
    /\{/.test(text) &&
    !JS_MARKERS.some((marker) => marker.test(text))
  ) {
    return SAMPLE_LANGUAGE.CSS;
  }

  // A markdown document.
  if (/^#{1,3}\s+\S/m.test(text) && !/\bfunction\b|=>/.test(text)) {
    return SAMPLE_LANGUAGE.MARKDOWN;
  }

  // JavaScript and TypeScript.
  if (isTypeScript(text)) {
    return hasJsx(text) ? SAMPLE_LANGUAGE.TSX : SAMPLE_LANGUAGE.TS;
  }
  if (hasJsx(text)) return SAMPLE_LANGUAGE.JSX;
  if (JS_MARKERS.some((marker) => marker.test(text))) return SAMPLE_LANGUAGE.JS;

  return SAMPLE_LANGUAGE.JS;
}

/**
 * The language a task declares. The field of the task wins over the guess of
 * the detector, so a sample that the detector reads wrong can be corrected.
 */
export function languageOf(sample) {
  const declared = typeof sample?.lang === 'string' ? sample.lang.trim().toLowerCase() : '';
  if (declared !== '' && Object.values(SAMPLE_LANGUAGE).includes(declared)) {
    return declared;
  }
  return detectSampleLanguage(sample?.solution ?? '');
}
