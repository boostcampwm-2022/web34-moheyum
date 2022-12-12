import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import defaultProfile from '../../../public/default-profile.png';

export default function ProfileImg({ imgUrl }: { imgUrl: string }) {
  return (
    <Profile>
      <Image src={imgUrl !== '' ? imgUrl : defaultProfile} alt="Logo" width={46} height={46} priority />
    </Profile>
  );
}

export const Profile = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid ${COLORS.PRIMARY};
  margin: 8px;
  padding-right: 45px;
  background-color: ${COLORS.WHITE};
  img {
    object-fit: cover;
    border-radius: 50px;
  }
`;
