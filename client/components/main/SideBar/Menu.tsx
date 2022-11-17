import React from 'react';
import Image from 'next/legacy/image';
import styled from '@emotion/styled';
import { displayCenter } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

export default function Menu({ imgSrc, text }: { imgSrc: string; text: string }) {
  return (
    <Wrapper>
      <div className="imageBox">
        <Image src={imgSrc} alt="item" width={25} height={25} priority />
      </div>
      <div className="text">{text}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-left: 5%;
  border-bottom: 1px solid ${COLORS.PRIMARY};
  color: ${COLORS.BLACK};
  &:active {
    color: ${COLORS.PRIMARY_DARK};
  }
  &:hover {
    font-weight: bold;
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: 80%;
    margin-left: 10%;
  }
  .imageBox {
    width: 35%;
    ${displayCenter}
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      width: 100%;
    }
  }
  .text {
    margin-top: 8px;
    margin-right: 5px;
    width: 65%;
    text-align: center;
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      display: none;
    }
  }
`;
