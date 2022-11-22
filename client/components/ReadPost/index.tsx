import Router from 'next/router';
import React from 'react';
import {
  Author,
  ButtonBack,
  ContentBox,
  PostContent,
  PostedAt,
  PostHeader,
  Profile,
  TopButtonConatiner,
  Wrapper,
} from './index.style';

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
