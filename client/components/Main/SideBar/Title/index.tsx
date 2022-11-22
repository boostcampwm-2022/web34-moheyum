import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Icon, SmallIcon, Wrapper } from './index.style';

export default function Title() {
  return (
    <Wrapper>
      <Link href="/">
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
