import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import COLORS from '../../../styles/color';

export default function Title() {
  return (
    <Wrapper>
      <Icon>
        <Image src="/logo_purple.svg" alt="Logo" layout="fill" priority />
      </Icon>
      <SmallIcon>
        <Image src="/small_logo.svg" alt="Logo" layout="fill" priority />
      </SmallIcon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
`;

const Icon = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

const SmallIcon = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
  margin-top: 8px;
  margin-bottom: 7px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: block;
  }
`;
