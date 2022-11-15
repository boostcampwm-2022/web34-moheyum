import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="description" content="마크다운을 지원하는 SNS인 모헤윰으로 당신의 생각을 보기 좋게 전달하세요." />
          <link rel="icon" href="/LogoIcon.svg" />
        </Head>
        <body style={{ padding: 0, margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
