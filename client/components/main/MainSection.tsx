import React from 'react';
import styled from '@emotion/styled';
import { displayCenter } from '../../styles/mixin';

export default function MainSection() {
  return <Wrapper>MainSection</Wrapper>;
}
const Wrapper = styled.section`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  ${displayCenter}
  background-color: ${({ theme }) => theme.mainSection.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
`;
