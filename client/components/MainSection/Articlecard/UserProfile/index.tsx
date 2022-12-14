import React from 'react';
import { Author, AuthorDetail } from './index.style';
import ProfileImg from '../../../UserProfile/ProfileImg';

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
      <ProfileImg imgUrl={profileimg} />
      {/* <ProfileImg imgUrl={profileimg} /> */}
      <AuthorDetail>
        <div className="name">{nickname || '작성자 이름'}</div>
        <div className="user-id">@{author || '작성자 아이디'}</div>
      </AuthorDetail>
    </Author>
  );
}
