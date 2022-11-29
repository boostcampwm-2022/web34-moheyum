import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import Image from 'next/legacy/image';
import { calcTime } from '../../utils/calctime';
import renderMarkdown from '../../utils/markdown';
import {
  Author,
  ContentBox,
  PostContent,
  PostedAt,
  HeaderBox,
  ProfileImg,
  Wrapper,
  AuthorDetail,
  CommentBox,
} from './index.style';
import { ButtonBack, TopBar } from '../../styles/common';
import type PostProps from '../../types/Post';

interface PostData {
  postData: PostProps;
}

export default function ReadPost({ postData }: PostData) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(postData.description);
  }, []);
  const goBack = () => {
    Router.back();
  };
  console.log('sid', postData);
  return (
    <Wrapper>
      <TopBar>
        <div>
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>게시글</h1>
        </div>
      </TopBar>
      <PostContent>
        <HeaderBox>
          <Link href={`/${postData.author}`}>
            <Author>
              <ProfileImg>
                <Image src={postData.authorDetail.profileimg} alt="Logo" layout="fill" priority />
              </ProfileImg>
              <AuthorDetail>
                <div id="name">{postData.authorDetail.nickname || '작성자 이름'}</div>
                <div id="user-id">@{postData.author || '작성자 아이디'}</div>
              </AuthorDetail>
              <PostedAt>
                <div id="time">{calcTime(postData.createdAt)}</div>
                <div>&nbsp;</div>
              </PostedAt>
            </Author>
          </Link>
        </HeaderBox>
        <ContentBox ref={contentRef}>{postData.description || '글 내용'}</ContentBox>
        <CommentBox>
          <div id="title">답글: {postData.childPosts}개</div>
        </CommentBox>
      </PostContent>
    </Wrapper>
  );
}
