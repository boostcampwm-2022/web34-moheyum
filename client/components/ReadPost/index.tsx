import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import renderMarkdown from '../../utils/markdown';
import { Author, ContentBox, PostContent, PostedAt, PostHeader, Profile, Wrapper } from './index.style';
import { ButtonBack, TopBar } from '../../styles/common';

interface Props {
  postData: {
    _id: string;
    title: string;
    description: string;
    author: string;
  };
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
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>{postData.title || '글 제목'}</h1>
        </div>
      </TopBar>
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
        <PostContent ref={contentRef}>{postData.description || '글 내용'}</PostContent>
      </ContentBox>
    </Wrapper>
  );
}
