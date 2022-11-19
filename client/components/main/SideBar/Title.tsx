import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import Link from 'next/link';
import COLORS from '../../../styles/color';
import { displayCenter } from '../../../styles/mixin';

export default function Title() {
  return (
    <Wrapper>
      <Link href="/main">
        <Icon>
          <Image src="/logo_purple.svg" alt="Logo" width={175} height={75} priority />
        </Icon>
        <SmallIcon>
          <Image src="/small_logo.svg" alt="Logo" width={43} height={43} priority />
        </SmallIcon>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px ridge ${COLORS.PRIMARY};
  user-select: none;
  ${displayCenter}
`;

const Icon = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

const SmallIcon = styled.div`
  width: 100%;
  height: 41px;
  display: none;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: flex;
  }
`;
