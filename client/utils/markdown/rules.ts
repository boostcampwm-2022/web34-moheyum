// // 공백 두칸으로 줄바꿈 - 일단 비활성화
// function insertEOL(str: string): string {
//   const result = str.replace(/([\S ]*) {2}$/gm, '$1<br/>');
//   return result;
// }
function divideLines(str: string): string {
  // const result = str.replace(/^[\n]?([\S ]*)$[\n]?/gm, '<div>$1</div>');
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
  const result = str.replace(/```\n([\S\s]+?)\n```/gm, '<pre>$1</pre>');
  return result;
}

export default function doParse(str: string): string {
  console.log('parse start');
  let result = str;
  result = codeBlock(result);
  result = headers(result);
  result = code(result);
  console.log(JSON.stringify(result));
  // result = insertEOL(result); // 오류있음
  result = divideLines(result);
  console.log(JSON.stringify(result));
  return result;
}
