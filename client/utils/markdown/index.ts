import doParse from './rules';

export default function renderMarkdown(source: string) {
  let processed = source.replace(/</g, '&lt;').replace(/</g, '&gt;');
  processed = processed.replace(/\r/g, '');
  return doParse(processed);
}
