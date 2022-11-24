import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import {
  ProfileAvatar,
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
import { httpGet } from '../../../utils/http';
import { PostProps } from '../../../types/Post';

function UserProfile({ userData }: { userData: PostProps }) {
  const authedUserInfo = useRecoilValue(authedUser);
  const [imFollowing, setImFollowing] = useState(false);
  const [imfLoading, setImfLoading] = useState(true);

  useEffect(() => {
    // fetch Following
    httpGet(`/follow/check/${userData.userid}`).then((res) => {
      if (res.message === 'success') {
        setImfLoading(false);
        setImFollowing(res.data.isFollow);
      }
    });
    // setImFollowing(false);
    // setImfLoading(false);
  }, []);

  const cancleFollow = () => {
    // fetch toggle following
    // Delete following/:targetID
    fetch(`/api/follow/following/${userData.userid}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === 'success') {
          setImFollowing(false);
        }
      });
    // const result = { data : {
    //   followCancel: 1
    // }};
    // if (result.data.followCancel >= 1)
    //   setImFollowing(false);
  };

  const submitFollow = () => {
    // fetch toggle following
    // Post following/:targetID
    fetch(`/api/follow/following/${userData.userid}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === 'success') setImFollowing(true);
      });
    // const result = { data : {
    //   followCount: 1
    // }};
    // if (result.data.followCount >= 1)
    //   setImFollowing(true);
  };

  return (
    <ProfileContainer>
      <ProfileAvatar src={userData.profileimg} />
      <ProfileDetail>
        <ProfileNames>
          <ProfileNickname>
            {userData.nickname}
            {authedUserInfo.logined && authedUserInfo.userid === userData.userid && (
              <Link href="/myAccount">
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
          <ProfileCounter href="" label="게시글" counter={userData.postcount} />
          <ProfileCounter href={`/user/${userData.userid}/follower`} label="팔로워" counter={userData.follower} />
          <ProfileCounter href={`/user/${userData.userid}/following`} label="팔로잉" counter={userData.following} />
        </ProfileCounters>
        <ProfileBio>{userData.bio}</ProfileBio>
      </ProfileDetail>
    </ProfileContainer>
  );
}

export default UserProfile;
