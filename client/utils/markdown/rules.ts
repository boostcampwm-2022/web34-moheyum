function emptyLines(str: string): string {
  const result = str.replace(/(?<=\n)\n/gm, '\n&nbsp;\n');
  return result;
}

function divideLines(str: string): string {
  const result = str.replace(/^([^<\n][\S \t]*)\n*$/gm, '<div>$1</div>');
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

function unorderedList(str: string): string {
  const result = str.replace(/^ *[-*+] (.*)$/gm, '<ul><li>$1</li></ul>').replace(/<\/ul>\n<ul>/gm, '');
  return result;
}

function orderedList(str: string): string {
  const result = str
    .replace(/^(\d+)[).] (.*)$/gm, '<ol start="$1"><li>$2</li></ol>')
    .replace(/<\/ol>\n<ol start="\d+">/gm, '');
  return result;
}

function code(str: string): string {
  const result = str.replace(/`([^`\n]+?)`/gm, '<code>$1</code>');
  return result;
}

function codeBlock(str: string): [string, string[]] {
  const result = str.replace(/^```(?:[^\n`]*)\n([\S\s]+?)\n```$/gm, '\u235e');
  let match = str.match(/^```(?:[^\n`]*)\n([\S\s]+?)\n```$/gm);
  if (match)
    match = match.map((e) =>
      e.replace(/^```(?:[^\n`]*)\n([\S\s]+?)\n```$/gm, '<pre>$1</pre>').replace(/\n/gm, '\n<br/>')
    );
  return [result, match ?? []];
}

function recoverPlaceholders(str: string, codes: string[], placeholder: string): string {
  if (codes.length === 0) return str;
  return codes.reduce((prev, curr) => prev.replace(placeholder, curr), str);
}

function blockQuote(str: string): string {
  const reg = /(?<=^|\n)\uff1e {0,3}([\s\S]*?)(?=\n\n|$)/g;
  let result = str;
  const blocks = str.match(reg);

  blocks?.forEach((item) => {
    let newBlock = item;
    while (newBlock.match(/(?<=^|\n|<blockquote>)\uff1e {0,3}/g)) {
      // console.log(newBlock.match(/(?<=^|\n|<blockquote>)> {0,3}/g));
      newBlock = newBlock.replace(
        /(?<=^|\n|<blockquote>)\uff1e {0,3}([\s\S]*?)(?=\n\n|$)/g,
        '<blockquote>$1</blockquote>'
      );
      newBlock = newBlock.replace(/(?<=^|\n)\uff1e? {0,3}/g, '');
    }
    result = result.replace(item, newBlock).replace(/<\/blockquote>\n\n/, '</blockquote>\n');
    console.log(result);
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

// TODO : href와 src도 codeBlock처럼 따로 빼두기
function link(str: string): [string, string[], string[]] {
  // let result = str.replace(
  //   /!\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
  //   '<img src="$2" alt="$1"/>'
  // );
  // result = result.replace(
  //   /\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
  //   '<a href="$2">$1</a>'
  // );
  let result = str.replace(
    /!\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
    '\u235f'
  );
  result = result.replace(
    /\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
    '\u2360'
  );

  let matchImg = str.match(
    /!\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm
  );
  if (matchImg) {
    matchImg = matchImg.map((e) =>
      e.replace(
        /!\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
        '<img src="$2" alt="$1"/>'
      )
    );
  }
  let matchLink = str.match(
    /\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm
  );
  if (matchLink) {
    matchLink = matchLink.map((e) =>
      e.replace(
        /\[(.+?)\]\(((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)))\)/gm,
        '<a href="$2">$1</a>'
      )
    );
  }

  return [result, matchImg ?? [], matchLink ?? []];
}

function hr(str: string): string {
  let result = str.replace(/^<div>[* ]+<\/div>$/gm, '<hr/>');
  result = result.replace(/^<div>[- ]+<\/div>$/gm, '<hr/>');
  result = result.replace(/^<div>[_ ]+<\/div>$/gm, '<hr/>');
  return result;
}

export function doParse(str: string): string {
  // console.log('parse start');
  // console.log(JSON.stringify(result));
  let result = str;
  let codes: string[] = [];
  let links: string[] = [];
  let imgs: string[] = [];
  [result, codes] = codeBlock(result);
  [result, links, imgs] = link(result);
  result = blockQuote(result);
  result = emptyLines(result);
  result = headers(result);
  result = code(result);
  result = unorderedList(result);
  result = orderedList(result);
  result = divideLines(result);
  result = hr(result);
  result = bold(result);
  result = italic(result);
  result = underline(result);
  result = strike(result);
  result = recoverPlaceholders(result, codes, '\u235e');
  result = recoverPlaceholders(result, links, '\u235f');
  result = recoverPlaceholders(result, imgs, '\u2360');
  // console.log(JSON.stringify(result));
  // console.log(codes);
  return result;
}

type MarkdownWithoutStyle = {
  content: string;
  thumbnail: string;
};

export function doParseForArticleCard(str: string): MarkdownWithoutStyle {
  const result: MarkdownWithoutStyle = { content: '', thumbnail: '' };
  const withStyle = doParse(str);

  result.content = withStyle.replace(/<\/?.+?>/g, '').replace(/&nbsp;/g, '');

  const img = /<img src="(.+?)".+?\/>/g.exec(withStyle);
  if (img) {
    [, result.thumbnail] = img;
  }

  return result;
}
