import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon, SmallIcon, Wrapper } from './index.style';

export default function Title() {
  return (
    <Wrapper>
      <Link href="/">
        <Icon>
          <Image src="/moheyum.svg" alt="Logo" width={200} height={53} priority />
        </Icon>
        <SmallIcon>
          <Image src="/small_logo.svg" alt="Logo" width={37} height={37} priority />
        </SmallIcon>
      </Link>
    </Wrapper>
  );
}
