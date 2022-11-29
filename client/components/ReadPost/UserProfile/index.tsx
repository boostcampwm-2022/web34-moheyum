import React from 'react';
import { calcTime } from '../../../utils/calctime';
import { Author, PostedAt, AuthorDetail } from './index.style';
import ProfileImg from './ProfileImg';
export default function UserProfile({
  profileimg,
  nickname,
  author,
  createdAt,
}: {
  profileimg: string;
  nickname: string;
  author: string;
  createdAt: string;
}) {
  return (
    <Author>
      <ProfileImg imgUrl={profileimg}></ProfileImg>
      <AuthorDetail>
        <div id="name">{nickname || '작성자 이름'}</div>
        <div id="user-id">@{author || '작성자 아이디'}</div>
      </AuthorDetail>
      <PostedAt>
        <div id="time">{calcTime(createdAt)}</div>
        <div>&nbsp;</div>
      </PostedAt>
    </Author>
  );
}
