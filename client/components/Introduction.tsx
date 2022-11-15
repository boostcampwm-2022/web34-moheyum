import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import COLORS from '../styles/color';
import { displayCenter } from '../styles/mixin';

export default function Introduction() {
  return (
    <Wrapper>
      <IntroBox>
        <Image src="/LogoWhite.svg" alt="Logo" width={450} height={150} />
        <Text>
          헤윰은 <Highlight>생각</Highlight>을 의미하는
          <br></br>순 우리말입니다.
          <br></br>
          <br></br>
          <Highlight>마크다운</Highlight>을 지원하는<Highlight>SNS</Highlight>인<br></br>모헤윰으로 당신의 생각을
          <br></br>보기 좋게 전달하세요.
        </Text>
      </IntroBox>
    </Wrapper>
  );
}

const Highlight = styled.span`
  color: ${COLORS.PRIMARY_DARK};
`;

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  ${displayCenter}
`;

const IntroBox = styled.div`
  width: 90%;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  margin-bottom: 60px;
`;

const Text = styled.div`
  margin: 5%;
  font-size: 34px;
`;
