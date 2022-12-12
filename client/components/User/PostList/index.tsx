import React from 'react';
import { ArticleCard } from '../../MainSection/Articlecard';
import { PostLabel, SectionDivider } from './index.style';
import usePaginator from '../../../hooks/usePaginator';
import { UserPostProps } from '../../../types/Post';
import { renderMarkdownWithoutStyle } from '../../../utils/markdown';

export default function PostList({ userData }: { userData: UserPostProps }) {
  const { pages, lastFollowElementRef } = usePaginator(`/api/post/author/${userData.userid}`);
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
