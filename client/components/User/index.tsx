import React from 'react'
import { Wrapper } from './index.style'
import { Props } from '../../pages/user/[userid]'
import UserProfile from './Profile'
import PostList from './PostList'
export default function UserSection({ userData }: {userData: Props | null}) {

  if (userData === null)
    return (
      <Wrapper>
        존재하지 않는 계정입니다.
      </Wrapper>
    );
  // TODO : API 최신화
  userData.state = true; //API 테스트 후 제거해야 함
  if (userData?.state === true)
    return (
      <Wrapper>
        <UserProfile userData={userData}/>
        <PostList userData={userData}/>
      </Wrapper>
    );
  if (userData?.state === false)
    return (
      <Wrapper>
        삭제된 계정입니다.
      </Wrapper>
    )
  return (
    <Wrapper>
      서버 오류
    </Wrapper>
  )
}
