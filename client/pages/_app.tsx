import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import { Global, ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/router';
import { displayCenter, mainSectionStyle } from '../styles/mixin';
import COLORS from '../styles/color';
import AppTheme from '../styles/theme';
import globalStyle from '../styles/global';
import Frame from '../styles/frame';
import SideBar from '../components/SideBar';
import ToastController from '../components/Toast';

const NoSideBar = ['/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ThemeProvider theme={AppTheme}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <AppStyle>
          <Head>
            <title>Moheyum</title>
          </Head>
          <Frame>
            {!NoSideBar.includes(router.pathname) && <SideBar />}
            <ComponentWrapper>
              <Component {...pageProps} />
            </ComponentWrapper>
          </Frame>
          <ToastController />
        </AppStyle>
      </RecoilRoot>
    </ThemeProvider>
  );
}
const AppStyle = styled.div`
  background-color: ${COLORS.BACKGROUND};
  height: 100%;
  ${displayCenter}
`;

const ComponentWrapper = styled.div`
  ${mainSectionStyle}
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
`;
