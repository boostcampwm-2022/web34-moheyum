import Router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authedUser } from '../../atom';
import { httpGet } from '../../utils/http';
import {
  ButtonBack,

  TopButtonConatiner,

  ProfileAndImgContainer,
  Wrapper,
  Avatar,
  ProfileArea,
  ProfileUserid,
  ProfileEmail,
  ChangeAvatarButton,
  InputsContainer,
  NicknameEditArea,
  BioEditArea,
  SubmitButton,
  NicknameInput,
  BioInput,
} from './index.style';

interface ProfileEditable {
  nickname: string;
  bio: string;
  profileimg: string;
}

interface Profile extends ProfileEditable {
  userid: string;
  email: string;
}

export default function MyAccountSection() {
  const goBack = () => {
    Router.back();
  };


  const authedUserInfo = useRecoilValue(authedUser);
  const [myProfile, setMyProfile] = useState<Profile>({
    userid: authedUserInfo.userid,
    email: "",
    nickname: authedUserInfo.nickname,
    bio: "",
    profileimg: authedUserInfo.profileimg
  });
  
  useEffect(() => {
    httpGet(`/user/${authedUserInfo.userid}`).then(
      (res: { message: string, data: Profile}) => {
        if (res.message === "success") {
          setMyProfile(res.data)
        }
      }
    )
  }, [])

  const handleNicknameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setMyProfile( prevProfile => {
      return {...prevProfile, nickname: e.target.value}
    })
  }

  const handleBioChange = (e:ChangeEvent<HTMLInputElement>) => {
    setMyProfile( prevProfile => {
      return {...prevProfile, bio: e.target.value}
    })
  }

  const handleProfileSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //TODO : 별명, 소개로 밀어넣을 수 있는 값이 유효한지 확인해야 함..
    fetch(`/api/user/${myProfile.userid}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        nickname: myProfile.nickname,
        bio: myProfile.bio,
        profileimg: myProfile.profileimg
      })
    })
    .catch(e => {
      alert("프로필 편집에 실패했습니다.");
      console.error(e);
    })
    .finally(() => {
      Router.reload();
    })
  }

  return (
    <Wrapper>
      <TopButtonConatiner>
        <ButtonBack type="button" onClick={goBack} />
        <h1>프로필 편집</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <ProfileAndImgContainer>
        <Avatar src={myProfile.profileimg}/>
        <ProfileArea>
          <ProfileUserid>
            {myProfile.userid}
          </ProfileUserid>
          <ProfileEmail>
            {myProfile.email}
          </ProfileEmail>
          <ChangeAvatarButton>
            프로필 사진 바꾸기
          </ChangeAvatarButton>
        </ProfileArea>
      </ProfileAndImgContainer>
      <InputsContainer>
        <div style={{"width":"500px"}}>
          <NicknameEditArea>
            별명: 
            <NicknameInput value={myProfile.nickname} onChange={handleNicknameChange}/>
          </NicknameEditArea>
          <BioEditArea>
            소개: 
            <BioInput value={myProfile.bio} onChange={handleBioChange} />
          </BioEditArea>
          <SubmitButton onClick={handleProfileSubmit}>
            저장
          </SubmitButton>
        </div>
      </InputsContainer>
    </Wrapper>
  );
}
