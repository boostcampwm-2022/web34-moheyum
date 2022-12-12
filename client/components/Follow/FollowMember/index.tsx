import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authedUser } from '../../../atom';
import { Avatar, Button, ButtonArea, Container, Information, UserId, UserNickname } from './index.style';

interface UserData {
  userid: string;
  nickname: string;
  profileimg: string;
  displayButton?: boolean;
}

export const FollowMember = React.forwardRef<HTMLInputElement, UserData>(
  ({ userid, nickname, profileimg, displayButton }: UserData, ref) => {
    const [following, setFollowing] = useState(false);
    const authedUserInfo = useRecoilValue(authedUser);

    useEffect(() => {
      if (authedUserInfo.logined)
        fetch(`/api/follow/following/${userid}`, {
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            setFollowing(data.data.isFollow);
          });
    }, []);

    const ToggleFollowing = () => {
      let method = 'POST';
      if (following) method = 'DELETE';

      fetch(`/api/follow/following/${userid}`, {
        credentials: 'include',
        method,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'success') setFollowing((prev) => !prev);
        })
        .catch((e) => console.error(e));
    };

    return (
      <div ref={ref}>
        <Container>
          <Avatar src={profileimg} />
          <Information>
            <UserNickname>
              <Link href={`/${userid}`}>{nickname}</Link>
            </UserNickname>
            <UserId>{userid}</UserId>
            {/* <UserBio>
          BIOBIOBIO
        </UserBio> */}
          </Information>
          {displayButton && authedUserInfo.logined && userid !== authedUserInfo.userid && (
            <ButtonArea>
              <Button onClick={ToggleFollowing}>{following ? '취소' : '팔로우'}</Button>
            </ButtonArea>
          )}
        </Container>
      </div>
    );
  }
);

FollowMember.defaultProps = {
  displayButton: false,
};
