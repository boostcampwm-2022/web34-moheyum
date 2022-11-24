import React from 'react';
import { Wrapper } from './index.style';
import UserProfile from './Profile';
import PostList from './PostList';
import { PostProps } from '../../types/Post';

export default function UserSection({ userData }: { userData: PostProps | null }) {
  if (userData === null) return <Wrapper>존재하지 않는 계정입니다.</Wrapper>;
  // TODO : API 최신화
  if (userData?.state === true)
    return (
      <Wrapper>
        <UserProfile userData={userData} />
        <PostList userData={userData} />
      </Wrapper>
    );
  if (userData?.state === false) return <Wrapper>삭제된 계정입니다.</Wrapper>;
  return <Wrapper>서버 오류</Wrapper>;
}
