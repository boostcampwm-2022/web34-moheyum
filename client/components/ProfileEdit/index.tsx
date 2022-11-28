import Router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { authedUser } from '../../atom';
import { ResponseType, httpGet } from '../../utils/http';
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
  ErrorMessage,
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

const schema = yup.object().shape({
  nickname: yup
    .string()
    .matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/i, '영어, 숫자, 한글만 가능합니다.')
    .test({
      message: '16바이트 이내로 입력 가능합니다.',
      test: (value) => getByteLength(value as string) <= 16,
    }),
  bio: yup.string(),
});

const getByteLength = (s: string): number => {
  // 문제 : UTF-8 기준 한글 한 자가 사실은 3바이트였음
  const stringByteLength = s.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
  return stringByteLength;
};

export default function ProfileEditSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const goBack = () => {
    Router.back();
  };

  const authedUserInfo = useRecoilValue(authedUser);
  const [myProfile, setMyProfile] = useState<Profile>({
    userid: authedUserInfo.userid,
    email: '',
    nickname: authedUserInfo.nickname,
    bio: '',
    profileimg: authedUserInfo.profileimg,
  });

  useEffect(() => {
    httpGet(`/user/${authedUserInfo.userid}`).then((res: ResponseType) => {
      if (res.message === 'success') {
        setMyProfile(res.data);
      }
    });
  }, []);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyProfile((prevProfile) => ({ ...prevProfile, nickname: e.target.value }));
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyProfile((prevProfile) => ({ ...prevProfile, bio: e.target.value }));
  };

  const handleProfileSubmit = () => {
    // TODO : 별명, 소개로 밀어넣을 수 있는 값이 유효한지 확인해야 함..
    fetch(`/api/user/${myProfile.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        nickname: myProfile.nickname,
        bio: myProfile.bio,
        profileimg: myProfile.profileimg,
      }),
    })
      .catch((e) => {
        alert('프로필 편집에 실패했습니다.');
        console.error(e);
      })
      .finally(() => {
        // Router.reload();
        goBack();
      });
  };

  return (
    <Wrapper>
      <TopButtonConatiner>
        <ButtonBack type="button" onClick={goBack} />
        <h1>프로필 편집</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <ProfileAndImgContainer>
        <Avatar src={myProfile.profileimg} />
        <ProfileArea>
          <ProfileUserid>{myProfile.userid}</ProfileUserid>
          <ProfileEmail>{myProfile.email}</ProfileEmail>
          <ChangeAvatarButton>프로필 사진 바꾸기</ChangeAvatarButton>
        </ProfileArea>
      </ProfileAndImgContainer>
      <InputsContainer>
        <form onSubmit={handleSubmit(handleProfileSubmit)} style={{ width: '500px' }}>
          <NicknameEditArea>
            별명:
            <NicknameInput {...register('nickname')} value={myProfile.nickname} onChange={handleNicknameChange} />
            <ErrorMessage>{errors.nickname && (errors.nickname.message as string)}</ErrorMessage>
          </NicknameEditArea>
          <BioEditArea>
            소개:
            <BioInput {...register('bio')} value={myProfile.bio} onChange={handleBioChange} />
            <ErrorMessage>{errors.bio && (errors.bio.message as string)}</ErrorMessage>
          </BioEditArea>
          <SubmitButton type="submit">저장</SubmitButton>
        </form>
      </InputsContainer>
    </Wrapper>
  );
}
