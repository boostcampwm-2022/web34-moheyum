import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/legacy/image';
import ReactLoading from 'react-loading';
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
import Paginator, { NEXT } from '../../utils/paginator';
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
  let commentCount = 0;
  if (postData.childPosts) {
    commentCount = postData.childPosts.length;
  }
  const [nextCursor, setNextCursor] = useState(NEXT.START);
  const { loading, error, pages, next } = Paginator(`/api/post/comments/${postData._id}`, nextCursor);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && next !== NEXT.END) {
            setNextCursor(next);
          }
        },
        {
          threshold: 0.4,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );
  console.log(pages);
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
          <div id="title">답글: {commentCount}개</div>
          <div id="list">
            {pages.map((item: any, index: number) => {
              if (pages.length === index + 1) return <li ref={lastFollowElementRef}>{item.description}</li>;
              return <li>{item.description}</li>;
            })}
            {loading && <ReactLoading type="spin" color="#A593E0" />}
          </div>
          <div>끝</div>
        </CommentBox>
      </PostContent>
    </Wrapper>
  );
}
