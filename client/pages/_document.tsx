import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="description" content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요." />
          <link rel="icon" href="/favicon.svg" />
          {/* <link rel="stylesheet" type="text/css" href="/global.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
