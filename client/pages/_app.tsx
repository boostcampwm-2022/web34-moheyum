import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { displayCenter } from '../styles/mixin';
import COLORS from '../styles/color';
import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppStyle>
        <Head>
          <title>Moheyum</title>
        </Head>
        <Component {...pageProps} />
      </AppStyle>
    </ThemeProvider>
  );
}
const AppStyle = styled.div`
  background-color: ${COLORS.GRAY3};
  width: 100vw;
  height: 100vh;
  ${displayCenter}
`;
