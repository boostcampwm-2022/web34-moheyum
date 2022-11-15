import React from 'react';
import Image from 'next/image';

export default function Introduction() {
  return (
    <div>
      <Image src="/LogoWhite.svg" alt="Logo" width={300} height={80} />
      Introduction
    </div>
  );
}
