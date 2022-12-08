import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { calcTime } from '../../../utils/calctime';
import { Author, AuthorDetail, Wrapper, ContentBox, HeaderBox, ParentTree, ParentTreeContainer } from './index.style';
import ProfileImg from '../../UserProfile/ProfileImg';
import type { Parent } from '../../../types/Post';
import { renderMarkdown } from '../../../utils/markdown';

export default function ParentPost({ post }: { post: Parent }) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(post.description);
  }, [post.description]);
  return (
    <Wrapper>
      <HeaderBox>
        <Link href={`/${post.author}`}>
          <Author>
            <ProfileImg imgUrl={post.authorDetail.profileimg} />
            <AuthorDetail>
              <div className="name">{post.authorDetail.nickname || '작성자 이름'}</div>
              <div className="user-id">@{post.author || '작성자 아이디'}</div>
              <div className="time">· {calcTime(post.createdAt)}</div>
            </AuthorDetail>
          </Author>
        </Link>
      </HeaderBox>
      <ContentBox>
        <ParentTreeContainer>
          <ParentTree />
        </ParentTreeContainer>
        <Link href={`/post/${post._id}`}>
          <div className="content" ref={contentRef}>
            {post.description}
          </div>
        </Link>
      </ContentBox>
    </Wrapper>
  );
}
