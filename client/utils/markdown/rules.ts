function emptyLines(str: string): string {
  const result = str.replace(/(?<=\n)\n/gm, '\n&nbsp;\n');
  return result;
}

function divideLines(str: string): string {
  const result = str.replace(/^([^<\n][\S \t]*)[\n]*$/gm, '<div>$1</div>');
  return result;
}

function headers(str: string): string {
  let result = str;
  result = result.replace(/^###### ([\S ]+)$/gm, '<h6>$1</h6>');
  result = result.replace(/^##### ([\S ]+)$/gm, '<h5>$1</h5>');
  result = result.replace(/^#### ([\S ]+)$/gm, '<h4>$1</h4>');
  result = result.replace(/^### ([\S ]+)$/gm, '<h3>$1</h3>');
  result = result.replace(/^## ([\S ]+)$/gm, '<h2>$1</h2>');
  result = result.replace(/^# ([\S ]+)$/gm, '<h1>$1</h1>');
  return result;
}

function code(str: string): string {
  const result = str.replace(/`([\S\n][^`\n]+)`/gm, '<code>$1</code>');
  return result;
}

function codeBlock(str: string): string {
  const result = str.replace(/<div>```(?:.*)<\/div>\n([\S\s]+?)\n<div>```<\/div>/gm, '<pre>$1</pre>');
  return result;
}

function blockQuote(str: string): string {
  const reg = /(?<=^|\n)> {0,3}([\s\S]*?)(?=\n\n|$)/g;
  let result = str;
  const blocks = str.match(reg);

  blocks?.forEach((item) => {
    let newBlock = item;
    while (newBlock.match(/(?<=^|\n|<blockquote>)> {0,3}/g)) {
      // console.log(newBlock.match(/(?<=^|\n|<blockquote>)> {0,3}/g));
      newBlock = newBlock.replace(/(?<=^|\n|<blockquote>)> {0,3}([\s\S]*?)(?=\n\n|$)/g, '<blockquote>$1</blockquote>');
      newBlock = newBlock.replace(/(?<=^|\n)>? {0,3}/g, '');
    }
    result = result.replace(item, newBlock);
  });

  return result;
}

function bold(str: string): string {
  const result = str.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  return result;
}

function italic(str: string): string {
  const result = str.replace(/\*(.+?)\*/g, '<i>$1</i>');
  return result;
}

function underline(str: string): string {
  let result = str.replace(/__([^_\n]+?)__/g, '<u>$1</u>');
  result = result.replace(/_([^_\n]+?)_/g, '<u>$1</u>');
  return result;
}

function strike(str: string): string {
  let result = str.replace(/--(.+?)--/g, '<s>$1</s>');
  result = result.replace(/~~(.+?)~~/g, '<s>$1</s>');
  return result;
}

function link(str: string): string {
  let result = str.replace(
    /!\[(.+)\]\((http[s]?:\/\/(?:(?:[\dA-z]*)(?:\.[\dA-z]*)*)(?::[\d]+)?(?:\/.*)?)\)/gm,
    '<img src="$2" alt="$1"/>'
  );
  result = result.replace(
    /\[(.+)\]\((http[s]?:\/\/(?:(?:[\dA-z]*)(?:\.[\dA-z]*)*)(?::[\d]+)?(?:\/.*)?)\)/gm,
    '<a href="$2">$1</a>'
  );
  return result;
}

function hr(str: string): string {
  let result = str.replace(/^<div>[* ]+<\/div>$/gm, '<hr/>');
  result = result.replace(/^<div>[- ]+<\/div>$/gm, '<hr/>');
  result = result.replace(/^<div>[_ ]+<\/div>$/gm, '<hr/>');
  return result;
}

export default function doParse(str: string): string {
  // console.log('parse start');
  let result = str;
  // console.log(JSON.stringify(result));
  result = blockQuote(result);
  // console.log(JSON.stringify(result));
  result = emptyLines(result);
  result = headers(result);
  result = code(result);
  result = divideLines(result);
  result = codeBlock(result);
  result = hr(result);
  result = bold(result);
  result = italic(result);
  result = underline(result);
  result = strike(result);
  result = link(result);
  // console.log(JSON.stringify(result));
  return result;
}
