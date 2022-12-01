import Image from 'next/image';
import React from 'react';
import { Author, AuthorDetail, Profile } from './index.style';

export default function UserProfile({
  profileimg,
  nickname,
  author,
}: {
  profileimg: string;
  nickname: string;
  author: string;
}) {
  return (
    <Author>
      <Profile>
        {profileimg ? (
          <Image src={profileimg} alt="Logo" layout="fill" priority />
        ) : (
          <Image src="/favicon.svg" alt="Logo" layout="fill" priority />
        )}
      </Profile>
      {/* <ProfileImg imgUrl={profileimg} /> */}
      <AuthorDetail>
        <div className="name">{nickname || '작성자 이름'}</div>
        <div className="user-id">@{author || '작성자 아이디'}</div>
      </AuthorDetail>
    </Author>
  );
}
