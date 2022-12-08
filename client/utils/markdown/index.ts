import { doParse, doParseForArticleCard } from './rules';

export function renderMarkdown(source: string) {
  let processed = source.replace(/</g, '&lt;').replace(/</g, '&gt;');
  processed = processed.replace(/\r/g, '');
  processed += '\n\n&nbsp;';
  return doParse(processed);
}

export function renderMarkdownWithoutStyle(source: string) {
  let processed = source.replace(/</g, '&lt;').replace(/</g, '&gt;');
  processed = processed.replace(/\r/g, '');
  processed += '\n\n&nbsp;';
  return doParseForArticleCard(processed);
}
