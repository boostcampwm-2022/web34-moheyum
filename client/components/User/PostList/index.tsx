import React, { useCallback, useRef, useState } from 'react';
import { ArticleCard } from '../../MainSection/Articlecard';
import { PostLabel, SectionDivider } from './index.style';
import Paginator, { NEXT } from '../../../utils/paginator';
import { UserPostProps } from '../../../types/Post';

export default function PostList({ userData }: { userData: UserPostProps }) {
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
              author={item.authorDetail.userid}
              profileimg={item.authorDetail.profileimg}
              id={item._id}
              description={item.description}
              date={item.createdAt}
              comments={item.childPosts}
              nickname={item.authorDetail.nickname}
              key={item._id}
              ref={lastFollowElementRef}
            />
          );
        return (
          <ArticleCard
            author={item.authorDetail.userid}
            profileimg={item.authorDetail.profileimg}
            id={item._id}
            description={item.description}
            date={item.createdAt}
            comments={item.childPosts}
            nickname={item.authorDetail.nickname}
            key={item._id}
          />
        );
      })}
    </>
  );
}
