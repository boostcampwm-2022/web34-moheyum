import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ArticleCard } from '../Articlecard';
import { ArticlesSection, FakeButton, NewArticleSection, Placeholder, Wrapper } from './index.style';

import Paginator, { NEXT } from '../../../utils/paginator';

export default function MainSection() {
  const [nextCursor, setNextCursor] = useState(NEXT.START);
  const { loading, pages, next } = Paginator(`/api/post/newsfeed`, nextCursor);

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
      <Link href="/write">
        <NewArticleSection>
          <Placeholder>무슨 생각 하세요?</Placeholder>
          <hr />
          <FakeButton type="button">글쓰기</FakeButton>
        </NewArticleSection>
      </Link>
      <ArticlesSection>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <ArticleCard
                author={item.author.author}
                key={item.author._id}
                id={item.author._id}
                description={item.author.description}
                title={item.author.title}
                ref={lastFollowElementRef}
              />
            );
          return (
            <ArticleCard
              author={item.author.author}
              key={item.author._id}
              id={item.author._id}
              description={item.author.description}
              title={item.author.title}
            />
          );
        })}
      </ArticlesSection>
    </Wrapper>
  );
}
