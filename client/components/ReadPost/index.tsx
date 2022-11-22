import styled from '@emotion/styled';
import Router from 'next/router';
import React from 'react';
import COLORS from '../../styles/color';

interface Props {
  postData: {
    _id: string;
    title: string;
    description: string;
    author: string;
  };
}

export default function ReadPost({ postData }: Props) {
  const goBack = () => {
    Router.back();
  };
  return (
    <Wrapper>
      <TopButtonConatiner>
        <ButtonBack type="button" onClick={goBack} />
        <h1>글 제목{postData.title}</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <ContentBox>
        <PostHeader>
          <Author>
            <Profile />
            작성자 이름
          </Author>
          <PostedAt>2시간 전</PostedAt>
        </PostHeader>
        <PostContent>
          글 내용
          {postData.description}
        </PostContent>
      </ContentBox>
    </Wrapper>
  );
}

export const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
`;

export const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid ${COLORS.GRAY2};
  background-color: ${COLORS.GRAY3};
  margin: 15px;
`;

export const PostedAt = styled.div`
  color: ${COLORS.GRAY3};
  display: flex;
  align-items: center;
  margin: 15px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TopButtonConatiner = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY1};
  padding: 15px;
  display: flex;
  flex-direction: row;
  & > h1 {
    flex: 1;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  & > div {
    width: 30px;
    height: 30px;
  }
`;

export const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  width: 15px;
  height: 15px;
  margin: 15px 15px;
  background-image: url('/ico_chveron_left.svg');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PostContent = styled.div`
  width: 100%;
  flex: 1;
  margin: 20px;
`;
