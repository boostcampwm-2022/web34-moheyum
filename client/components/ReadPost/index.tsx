import Link from 'next/link';
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
        <h1>{postData.title || '글 제목'}</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <ContentBox>
        <PostHeader>
          <Link href={`/user/${postData.author}`}>
          <Author>
            <Profile />
            {postData.author || '작성자 이름'}
          </Author>
          </Link>
          <PostedAt>2시간 전</PostedAt>
        </PostHeader>
        <PostContent>{postData.description || '글 내용'}</PostContent>
      </ContentBox>
    </Wrapper>
  );
}
