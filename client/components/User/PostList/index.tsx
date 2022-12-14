import React from 'react';
import ReactLoading from 'react-loading';
import { Loader } from '../../../styles/common';
import COLORS from '../../../styles/color';
import { ArticleCard } from '../../MainSection/Articlecard';
import { PostLabel, SectionDivider, Footer } from './index.style';
import usePaginator from '../../../hooks/usePaginator';
import { UserPostProps } from '../../../types/Post';
import { renderMarkdownWithoutStyle } from '../../../utils/markdown';

export default function PostList({ userData }: { userData: UserPostProps }) {
  const { pages, loading, lastFollowElementRef } = usePaginator(`/api/post/author/${userData.userid}`);
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
      <Footer>
        <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
      </Footer>
    </>
  );
}
