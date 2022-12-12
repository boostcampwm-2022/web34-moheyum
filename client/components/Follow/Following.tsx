import Router from 'next/router';
import React from 'react';
import Link from 'next/link';
import ReactLoading from 'react-loading';
import { Loader } from '../../styles/common';
import COLORS from '../../styles/color';
import {
  FollowContainer,
  NoFollowersMessage,
  TopFollowActivated,
  TopFollowContainer,
  TopFollowDeactivated,
  Wrapper,
  Footer,
} from './index.style';
import { FollowMember } from './FollowMember';
import { ButtonBack, TopBar } from '../../styles/common';
import usePaginator from '../../hooks/usePaginator';

import type { Props } from '../../pages/[userid]/following';

export default function FollowingSection({ userData }: { userData: Props }) {
  const goBack = () => {
    Router.push(`/${userData.userid}`);
  };

  const { loading, error, pages, lastFollowElementRef } = usePaginator(`/api/follow/list/following/${userData.userid}`);

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
        <Footer>
          <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
        </Footer>
        {error && <NoFollowersMessage>error</NoFollowersMessage>}
      </FollowContainer>
    </Wrapper>
  );
}
