import React, { useEffect } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import COLORS from '../styles/color';
import { displayCenter } from '../styles/mixin';

export default function Home() {
  useEffect(() => {
    const isLogin = false;
    if (isLogin) {
      Router.push({ pathname: '/main' });
    } else {
      Router.push({ pathname: '/login' });
    }
  }, []);
  return <Frame />;
}

const Frame = styled.div`
  background-color: ${COLORS.WHITE};
  width: 1280px;
  height: 100%;
  ${displayCenter}
`;
