import React, { useCallback, useRef, useState } from 'react';
import { ArticleCard } from '../../Main/Articlecard';
import { PostLabel, SectionDivider } from './index.style';
import Paginator, { NEXT } from '../../../utils/paginator';
import { PostProps } from '../../../types/Post';

export default function PostList({ userData }: { userData: PostProps }) {
  const [nextCursor, setNextCursor] = useState('START');

  const { loading, pages, next } = Paginator(`/api/post/author/${userData.userid}`, nextCursor);

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
    <>
      <PostLabel>게시글</PostLabel>
      <SectionDivider />
      {pages.map((item: any, index: number) => {
        if (pages.length === index + 1)
          return (
            <ArticleCard
              author={item.author}
              key={item._id}
              id={item._id}
              description={item.description}
              title={item.title}
              ref={lastFollowElementRef}
            />
          );
        return (
          <ArticleCard
            author={item.author}
            key={item._id}
            id={item._id}
            description={item.description}
            title={item.title}
          />
        );
      })}
    </>
  );
}
