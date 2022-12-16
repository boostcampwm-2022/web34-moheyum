import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="description" content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요." />
          <meta name="og:site_name" content="mo:heyum" />
          <meta name="og:title" content="mo:heyum" />
          <meta name="og:url" content="https://moheyum.ga/" />
          <meta
            name="og:description"
            content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요."
          />
          <meta property="og:url" content="https://moheyum.ga/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="mo:heyum" />
          <meta
            property="og:description"
            content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요."
          />
          <meta property="og:image" content="https://moheyum.ga/og_image.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="moheyum.ga" />
          <meta property="twitter:url" content="https://moheyum.ga/" />
          <meta name="twitter:title" content="mo:heyum" />
          <meta
            name="twitter:description"
            content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요."
          />
          <meta name="twitter:image" content="https://moheyum.ga/og_image.png" />

          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.svg" />
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
