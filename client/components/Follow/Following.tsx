import Router from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
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
import usePaginator, { NEXT } from '../../hooks/usePaginator';

import type { Props } from '../../pages/[userid]/following';

export default function FollowingSection({ userData }: { userData: Props }) {
  const goBack = () => {
    Router.push(`/${userData.userid}`);
  };

  const [nextCursor, setNextCursor] = useState('START');

  const { loading, error, pages, next } = usePaginator(`/api/follow/list/following/${userData.userid}`, nextCursor);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next !== NEXT.END) {
          setNextCursor(next);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );

  return (
    <Wrapper>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>{userData.nickname || '유저 닉네임'}</h1>
      </TopBar>
      <TopFollowContainer>
        <TopFollowDeactivated>
          <Link passHref href={`/${userData.userid}/follower`}>
            팔로워
          </Link>
        </TopFollowDeactivated>
        <TopFollowActivated>
          <Link href={`/${userData.userid}/following`}>팔로잉</Link>
        </TopFollowActivated>
      </TopFollowContainer>
      <FollowContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <FollowMember
                userid={item.targetid}
                nickname={item.nickname}
                profileimg={item.profileimg}
                displayButton
                key={item.targetid}
                ref={lastFollowElementRef}
              />
            );
          return (
            <FollowMember
              userid={item.targetid}
              nickname={item.nickname}
              profileimg={item.profileimg}
              displayButton
              key={item.targetid}
            />
          );
        })}
        {loading && <NoFollowersMessage>Loading</NoFollowersMessage>}
        {error && <NoFollowersMessage>error</NoFollowersMessage>}
      </FollowContainer>
    </Wrapper>
  );
}
