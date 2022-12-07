import doParse from './rules';

export default function renderMarkdown(source: string) {
  let processed = source.replace(/</g, '&lt;').replace(/</g, '&gt;');
  processed = processed.replace(/\r/g, '');
  processed += '\n\n&nbsp;';
  return doParse(processed);
}
