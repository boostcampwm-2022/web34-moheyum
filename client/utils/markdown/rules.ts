function emptyLines(str: string): string {
  const result = str.replace(/(?<=\n)\n/gm, '\n&nbsp;\n');
  return result;
}

function divideLines(str: string): string {
  const result = str.replace(/^([^<\n][\S \t]*)[\n]*$/gm, '<div>$1</div>');
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

function codeBlock(str: string): string {
  const result = str.replace(/<div>```<\/div>\n([\S\s]+?)\n<div>```<\/div>/gm, '<pre>$1</pre>');
  return result;
}

function blockQuote(str: string): string {
  let result = str.replace(/^> ([\s\S]+?)\n\n/gm, '<blockquote>$1</blockquote>\n');
  result = result.replace(/^> /gm, '');
  result = result.replace(/<blockquote>(.+?)\n/gm, '<blockquote><div>$1</div>\n'); // 첫줄 div 보정
  return result;
}

export default function doParse(str: string): string {
  // console.log('parse start');
  let result = str;
  console.log(JSON.stringify(result));
  result = blockQuote(result);
  result = emptyLines(result);
  console.log(JSON.stringify(result));
  result = headers(result);
  result = code(result);
  result = divideLines(result);
  result = codeBlock(result);
  return result;
}
