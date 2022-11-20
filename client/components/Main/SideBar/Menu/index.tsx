import React from 'react';
import Image from 'next/legacy/image';
import { Wrapper } from './index.style';

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
