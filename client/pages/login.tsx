import React from 'react';
import styled from '@emotion/styled';
import Introduction from '../components/Login/Introduction';
import Login from '../components/Login/Login';
import { SignFrame } from '../styles/frame';

export default function login() {
  return (
    <SignFrame>
      <Wrapper>
        <Introduction />
        <Login />
      </Wrapper>
    </SignFrame>
  );
}
const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    justify-content: center;
  }
`;
