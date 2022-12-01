import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import { ButtonBack, TopBar } from '../../styles/common';
import PostProps from '../../types/Post';
import { calcTime } from '../../utils/calctime';
import renderMarkdown from '../../utils/markdown';
import ProfileImg from '../ReadPost/UserProfile/ProfileImg';
import { Author, AuthorDetail, ContentBox, HeaderBox, PostContent, Wrapper } from './index.style';

interface Props {
  postData: PostProps;
}

export default function ReadPost({ postData }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(postData.description);
  }, []);
  const goBack = () => {
    Router.back();
  };
  return (
    <Wrapper>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>답글 작성</h1>
      </TopBar>
      <ContentBox>
        <HeaderBox>
          <Link href={`/${postData.author}`}>
            <Author>
              <ProfileImg imgUrl={postData.authorDetail.profileimg} />
              <AuthorDetail>
                <div id="name">{postData.authorDetail.nickname || '작성자 이름'}</div>
                <div id="user-id">@{postData.author || '작성자 아이디'}</div>
                <div id="time">· {calcTime(postData.createdAt)}</div>
              </AuthorDetail>
            </Author>
          </Link>
        </HeaderBox>
        <PostContent ref={contentRef}>{postData.description || '글 내용'}</PostContent>
      </ContentBox>
    </Wrapper>
  );
}
