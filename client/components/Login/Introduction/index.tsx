import React from 'react';
import Image from 'next/image';
import { Wrapper, IntroBox, Text, Highlight } from './index.style';

export default function Introduction() {
  return (
    <Wrapper>
      <IntroBox>
        <Image src="/logo_white.svg" alt="Logo" width={310} height={90} />
        <Text>
          헤윰은 <Highlight>생각</Highlight>을 의미하는
          <br />순 우리말입니다.
          <br />
          <br />
          <Highlight>마크다운</Highlight>을 지원하는<Highlight>SNS</Highlight>인<br />
          모헤윰으로 당신의 생각을
          <br />
          보기 좋게 전달하세요.
        </Text>
      </IntroBox>
    </Wrapper>
  );
}
