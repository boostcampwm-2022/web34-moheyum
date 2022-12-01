import React from 'react';
import { Author, AuthorDetail } from './index.style';
import ProfileImg from '../../../ProfileImg';

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
        <div id="name">{nickname || '작성자 이름'}</div>
        <div id="user-id">@{author || '작성자 아이디'}</div>
      </AuthorDetail>
    </Author>
  );
}
