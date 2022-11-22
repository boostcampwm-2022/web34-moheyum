function insertEOL(str: string): string {
  const result = str.replace(/([\S ]*) {2}$/gm, '$1<br/>');
  return result;
}

function headers(str: string): string {
  let result = str.replace(/^### ([\S ]+)$/gm, '<h3>$1</h3>');
  result = result.replace(/^## ([\S ]+)$/gm, '<h2>$1</h2>');
  result = result.replace(/^# ([\S ]+)$/gm, '<h1>$1</h1>');
  return result;
}

function code(str: string): string {
  const result = str.replace(/`([\S\n][^`\n]+)`/gm, '<code>$1</code>');
  return result;
}

function divideLines(str: string): string {
  const result = str.replace(/^[\n]?([\S ]*)$[\n]?/gm, '<div>$1</div>');
  return result;
}

export default function doParse(str: string): string {
  let result = str;
  result = headers(result);
  result = code(result);
  // result = insertEOL(result); // 오류있음
  result = divideLines(result);
  return result;
}
