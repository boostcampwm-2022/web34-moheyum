import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import Image from 'next/image';
import {
  AvatarBox,
  ProfileBio,
  ProfileContainer,
  ProfileCounters,
  ProfileDetail,
  ProfileEditButton,
  ProfileNames,
  ProfileNickname,
  ProfileUserid,
} from './index.style';
import ProfileCounter from './ProfileCounter';
import { authedUser } from '../../../atom';
import { httpGet, httpDelete, httpPost } from '../../../utils/http';
import { UserPostProps } from '../../../types/Post';
import defaultProfile from '../../../public/default-profile.png';

function UserProfile({ userData }: { userData: UserPostProps }) {
  const authedUserInfo = useRecoilValue(authedUser);
  const [imFollowing, setImFollowing] = useState(false);
  const [imfLoading, setImfLoading] = useState(true);

  useEffect(() => {
    httpGet(`/follow/check/${userData.userid}`).then((res) => {
      if (res.message === 'success') {
        setImfLoading(false);
        setImFollowing(res.data.isFollow);
      }
    });
  }, []);

  const cancleFollow = () => {
    httpDelete(`/follow/following/${userData.userid}`).then((result) => {
      if (result.message === 'success') {
        setImFollowing(false);
      }
    });
  };

  const submitFollow = () => {
    httpPost(`/follow/following/${userData.userid}`, {}).then((result) => {
      if (result.message === 'success') setImFollowing(true);
    });
  };

  return (
    <ProfileContainer>
      <AvatarBox>
        <Image src={userData.profileimg !== '' ? userData.profileimg : defaultProfile} alt="profile picture" fill />
      </AvatarBox>
      <ProfileDetail>
        <ProfileNames>
          <ProfileNickname>
            {userData.nickname}
            {authedUserInfo.logined && authedUserInfo.userid === userData.userid && (
              <Link href={`/${userData.userid}/profileEdit`}>
                <ProfileEditButton>프로필 편집</ProfileEditButton>
              </Link>
            )}
            {authedUserInfo.logined &&
              authedUserInfo.userid !== userData.userid &&
              !imfLoading &&
              imFollowing === false && <ProfileEditButton onClick={submitFollow}>팔로우</ProfileEditButton>}
            {authedUserInfo.logined &&
              authedUserInfo.userid !== userData.userid &&
              !imfLoading &&
              imFollowing === true && <ProfileEditButton onClick={cancleFollow}>팔로우 취소</ProfileEditButton>}
          </ProfileNickname>
          <ProfileUserid>{userData.userid}</ProfileUserid>
        </ProfileNames>
        <ProfileCounters>
          <ProfileCounter url="" label="게시글" counter={userData.postcount} />
          <ProfileCounter url={`/${userData.userid}/follower`} label="팔로워" counter={userData.follower} />
          <ProfileCounter url={`/${userData.userid}/following`} label="팔로잉" counter={userData.following} />
        </ProfileCounters>
        <ProfileBio>{userData.bio}</ProfileBio>
      </ProfileDetail>
    </ProfileContainer>
  );
}

export default UserProfile;
