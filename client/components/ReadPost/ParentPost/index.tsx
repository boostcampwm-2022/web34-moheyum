import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { calcTime } from '../../../utils/calctime';
import {
  Author,
  AuthorDetail,
  Wrapper,
  ContentBox,
  HeaderBox,
  ParentTree,
  ParentTreeContainer,
  ParentFilter,
  BlurredAuthor,
  NoContent,
} from './index.style';
import ProfileImg from '../../UserProfile/ProfileImg';
import type { Parent } from '../../../types/Post';
import { renderMarkdown } from '../../../utils/markdown';

export default function ParentPost({ post }: { post: Parent }) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current || !post) return;
    contentRef.current.innerHTML = renderMarkdown(post.description);
  }, [post?.description]);
  return (
    <Wrapper>
      {post ? (
        <Link href={`/post/${post._id}`}>
          <ParentFilter />
          <HeaderBox>
            <Author>
              <ProfileImg imgUrl={post.authorDetail.profileimg} />
              <AuthorDetail>
                <div className="name">{post.authorDetail.nickname || '작성자 이름'}</div>
                <div className="user-id">@{post.author || '작성자 아이디'}</div>
                <div className="time">· {calcTime(post.createdAt)}</div>
              </AuthorDetail>
            </Author>
          </HeaderBox>
          <ContentBox>
            <ParentTreeContainer>
              <ParentTree />
            </ParentTreeContainer>
            <div className="content" ref={contentRef}>
              {post.description}
            </div>
          </ContentBox>
        </Link>
      ) : (
        <>
          <HeaderBox>
            <BlurredAuthor>
              <ProfileImg imgUrl="" />
              <AuthorDetail>
                <div className="name">ㅇㅇ</div>
              </AuthorDetail>
            </BlurredAuthor>
          </HeaderBox>
          <NoContent>존재하지 않는 게시글입니다.</NoContent>
        </>
      )}
    </Wrapper>
  );
}
