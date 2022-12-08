import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ArticleCard } from './Articlecard';
import { ArticlesSection, FakeButton, NewArticleSection, Placeholder, Wrapper, Newsfeed } from './index.style';
import { MainTopBar } from '../../styles/common';

import usePaginator, { NEXT } from '../../hooks/usePaginator';
import { renderMarkdownWithoutStyle } from '../../utils/markdown';

export default function MainSection() {
  const [nextCursor, setNextCursor] = useState(NEXT.START);
  const { loading, pages, next } = usePaginator(`/api/post/newsfeed`, nextCursor);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next !== NEXT.END) {
          setNextCursor(next);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );

  return (
    <Wrapper>
      <MainTopBar>
        <div>홈</div>
      </MainTopBar>
      <Newsfeed>
        <Link href="/write">
          <NewArticleSection>
            <Placeholder>무슨 생각 하세요?</Placeholder>
            <hr />
            <FakeButton type="button">글쓰기</FakeButton>
          </NewArticleSection>
        </Link>
        <ArticlesSection>
          {pages.map((item: any, index: number) => {
            const parsed = renderMarkdownWithoutStyle(item.description);
            if (pages.length === index + 1)
              return (
                <ArticleCard
                  author={item.authorDetail.userid}
                  profileimg={item.authorDetail.profileimg}
                  id={item._id}
                  description={parsed.content}
                  date={item.createdAt}
                  comments={item.childPosts}
                  nickname={item.authorDetail.nickname}
                  key={item._id}
                  thumbnail={parsed.thumbnail}
                  ref={lastFollowElementRef}
                />
              );
            return (
              <ArticleCard
                author={item.authorDetail.userid}
                profileimg={item.authorDetail.profileimg}
                id={item._id}
                description={parsed.content}
                date={item.createdAt}
                comments={item.childPosts}
                nickname={item.authorDetail.nickname}
                key={item._id}
                thumbnail={parsed.thumbnail}
              />
            );
          })}
        </ArticlesSection>
      </Newsfeed>
    </Wrapper>
  );
}
