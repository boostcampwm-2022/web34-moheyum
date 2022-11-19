import React from 'react';
import Image from 'next/legacy/image';
import styled from '@emotion/styled';
import { displayCenter } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

export default function Menu({ imgSrc, text }: { imgSrc: string; text: string }) {
  return (
    <Wrapper>
      <div>
        <div className="imageBox">
          <Image src={imgSrc} alt="item" width={25} height={25} priority />
        </div>
        <div className="text">{text}</div>
      </div>
      <span />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;

  color: ${COLORS.BLACK};
  user-select: none;
  background-color: ${COLORS.PRIMARY_LIGHT};
  & > div {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
  }
  & > span {
    width: 85%;
    border-bottom: 1px solid ${COLORS.PRIMARY};
    transition: all 0.3s ease;
  }

  &:hover > span {
    width: 100%;
  }

  &:active {
    color: ${COLORS.PRIMARY_DARK};
    font-weight: 600;
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
    margin-right: 5px;
    width: 65%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      display: none;
    }
  }
`;
