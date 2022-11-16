import React from 'react';
import styled from '@emotion/styled';
import { displayCenter } from '../../styles/mixin';

export default function SideBar() {
  return <Wrapper>SideBar</Wrapper>;
}

const Wrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.width};
  height: 100%;
  ${displayCenter}
  background-color: ${({ theme }) => theme.sidebar.backgroundColor};
`;
