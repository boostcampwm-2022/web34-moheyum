import { css } from '@emotion/react';

const globalStyle = css`
  @import url(https://cdn.jsdelivr.net/gh/joungkyun/font-d2coding/d2coding.css);
  @import url(https://cdn.jsdelivr.net/gh/snz-hayden/toolo/fonts/jua/jua.css);

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(/noto-sans-kr-v27-latin_korean-regular.eot); /* IE9 Compat Modes */
    src: local(''), url(/noto-sans-kr-v27-latin_korean-regular.eot?#iefix) format('embedded-opentype'),
      url(/noto-sans-kr-v27-latin_korean-regular.woff2) format('woff2'),
      url(/noto-sans-kr-v27-latin_korean-regular.woff) format('woff'),
      url(/noto-sans-kr-v27-latin_korean-regular.ttf) format('truetype'),
      url(/noto-sans-kr-v27-latin_korean-regular.svg#NotoSansKR) format('svg');
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    height: 100%;
    padding: 0;
  }

  * {
    box-sizing: border-box;

    /*
    Scrollbar from OnAirCode
    source: https://onaircode.com/html-css-custom-scrollbar-examples/
     */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    &::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.9);
    }
  }

  #__next {
    height: 100%;
  }

  *:link {
    text-decoration: none;
  }

  a:hover {
    color: #333;
  }
`;

export default globalStyle;
