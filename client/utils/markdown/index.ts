import { doParse, doParseForArticleCard } from './rules';

export function renderMarkdown(source: string) {
  let processed = smartypants(source);
  processed = processed.replace(/\r/g, '').replace(/\n\n/g, '\n');
  processed += '\n\n&nbsp;';
  return doParse(processed);
}

export function renderMarkdownWithoutStyle(source: string) {
  let processed = smartypants(source);
  processed = processed.replace(/\r/g, '');
  processed += '\n\n&nbsp;';
  return doParseForArticleCard(processed);
}

// code from : https://github.com/markedjs/marked
//
export function smartypants(text: string): string {
  return (
    text
      // opening singles
      .replace(/(^|[-\u2014/([{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/([{\u2018\s])"/g, '$1\u201c')
      // closing doubles
      .replace(/"/g, '\u201d')
      // ellipses
      .replace(/\.{3}/g, '\u2026')
      // lt & gt sign
      .replace(/(<|&lt;)/g, '\uff1c')
      .replace(/(>|&gt;)/g, '\uff1e')
  );
}
