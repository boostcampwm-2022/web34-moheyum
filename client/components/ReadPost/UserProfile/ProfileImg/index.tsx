import React from 'react';
import Image from 'next/legacy/image';
import styled from '@emotion/styled';
import COLORS from '../../../../styles/color';

export default function ProfileImg({ imgUrl }: { imgUrl: string }) {
  return (
    <Profile>
      {imgUrl ? (
        <Image src={imgUrl} alt="Logo" layout="fill" priority />
      ) : (
        <Image src="/favicon.svg" alt="Logo" layout="fill" priority />
      )}
    </Profile>
  );
}

export const Profile = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid ${COLORS.PRIMARY};
  margin: 15px;
  padding-right: 45px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;
