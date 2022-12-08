import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authedUser } from '../../../atom';
import useToast from '../../../hooks/useToast';
import { httpPost, httpDelete, httpGet } from '../../../utils/http';
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
    const toast = useToast();

    useEffect(() => {
      if (authedUserInfo.logined) {
        httpGet(`/follow/check/${userid}`).then((data) => {
          setFollowing(data.data.isFollow);
        });
      }
    }, []);

    const ToggleFollowing = async () => {
      try {
        const response = following
          ? await httpDelete(`/follow/following/${userid}`)
          : await httpPost(`/follow/following/${userid}`, {});
        if (response.message === 'success') setFollowing((prev) => !prev);
      } catch (e) {
        toast.addMessage(`Follow ERROR: ${e}`);
      }
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
