import doParse from './rules';

export default function renderMarkdown(source: string) {
  const processed = source.replace(/</g, '&lt;').replace(/</g, '&gt;');
  return doParse(processed);
}
