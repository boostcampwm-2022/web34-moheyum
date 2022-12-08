import React, { useCallback, useRef, useState } from 'react';
import { ArticleCard } from '../../MainSection/Articlecard';
import { PostLabel, SectionDivider } from './index.style';
import usePaginator, { NEXT } from '../../../hooks/usePaginator';
import { UserPostProps } from '../../../types/Post';
import { renderMarkdownWithoutStyle } from '../../../utils/markdown';

export default function PostList({ userData }: { userData: UserPostProps }) {
  const [nextCursor, setNextCursor] = useState('START');

  const { loading, pages, next } = usePaginator(`/api/post/author/${userData.userid}`, nextCursor);

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
    </>
  );
}
