import Router from 'next/router';
import React from 'react';
import Link from 'next/link';
import {
  FollowContainer,
  NoFollowersMessage,
  TopFollowActivated,
  TopFollowContainer,
  TopFollowDeactivated,
  Wrapper,
} from './index.style';
import { FollowMember } from './FollowMember';
import { ButtonBack, TopBar } from '../../styles/common';
import usePaginator from '../../hooks/usePaginator';
import type { Props } from '../../pages/[userid]/following';

export default function FollowerSection({ userData }: { userData: Props }) {
  const goBack = () => {
    Router.push(`/${userData.userid}`);
  };
  const { pages, loading, error, lastFollowElementRef } = usePaginator(`/api/follow/list/follower/${userData.userid}`);

  return (
    <Wrapper>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>{userData.nickname || '유저 닉네임'}</h1>
      </TopBar>
      <TopFollowContainer>
        <TopFollowActivated>
          <Link passHref href={`/${userData.userid}/follower`}>
            팔로워
          </Link>
        </TopFollowActivated>
        <TopFollowDeactivated>
          <Link href={`/${userData.userid}/following`}>팔로잉</Link>
        </TopFollowDeactivated>
      </TopFollowContainer>
      <FollowContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <FollowMember
                userid={item.userid}
                nickname={item.nickname}
                profileimg={item.profileimg}
                displayButton
                key={item.userid}
                ref={lastFollowElementRef}
              />
            );
          return (
            <FollowMember
              userid={item.userid}
              nickname={item.nickname}
              profileimg={item.profileimg}
              displayButton
              key={item.userid}
            />
          );
        })}
        {loading && <NoFollowersMessage>Loading</NoFollowersMessage>}
        {error && <NoFollowersMessage>error</NoFollowersMessage>}
      </FollowContainer>
    </Wrapper>
  );
}
