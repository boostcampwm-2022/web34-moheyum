import React from 'react';
import { ErrorMessage, Wrapper } from './index.style';
import UserProfile from './Profile';
import PostList from './PostList';
import { UserPostProps } from '../../types/Post';

export default function UserSection({ userData }: { userData: UserPostProps | null }) {
  return (
    <Wrapper>
      {userData?.state ? (
        <>
          <UserProfile userData={userData} />
          <PostList userData={userData} />
        </>
      ) : (
        <ErrorMessage>존재하지 않는 계정입니다.</ErrorMessage>
      )}
    </Wrapper>
  );
}
