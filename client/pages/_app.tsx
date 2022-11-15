import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStyle>
      <Head>
        <title>Moheyum</title>
      </Head>
      <Component {...pageProps} />
    </AppStyle>
  );
}
const AppStyle = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
