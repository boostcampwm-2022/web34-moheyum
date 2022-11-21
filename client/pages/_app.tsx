import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { displayCenter } from '../styles/mixin';
import COLORS from '../styles/color';
import theme from '../styles/theme';
import '../styles/global.css';
import '../styles/reset.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <AppStyle>
          <Head>
            <title>Moheyum</title>
          </Head>
          <Component {...pageProps} />
        </AppStyle>
      </RecoilRoot>
    </ThemeProvider>
  );
}
const AppStyle = styled.div`
  background-color: ${COLORS.GRAY3};
  height: 100%;
  ${displayCenter}
`;
