import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import { ButtonBack, TopBar } from '../../styles/common';
import PostProps from '../../types/Post';
import renderMarkdown from '../../utils/markdown';
import UserProfile from '../ReadPost/UserProfile';
import { ContentBox, HeaderBox, PostContent, Wrapper } from './index.style';

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
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>답글 작성</h1>
        </div>
      </TopBar>
      <ContentBox>
        <HeaderBox>
          <Link href={`/${postData.author}`}>
            <UserProfile
              profileimg={postData.authorDetail.profileimg}
              nickname={postData.authorDetail.nickname}
              author={postData.author}
              createdAt={postData.createdAt}
            />
          </Link>
          {console.log(postData)}
        </HeaderBox>
        <PostContent ref={contentRef}>{postData.description || '글 내용'}</PostContent>
      </ContentBox>
    </Wrapper>
  );
}
