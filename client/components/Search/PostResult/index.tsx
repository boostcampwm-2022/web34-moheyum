import React from 'react';
import ReactLoading from 'react-loading';
import { Loader } from '../../../styles/common';
import COLORS from '../../../styles/color';
import usePaginator from '../../../hooks/usePaginator';
import { ArticleCard } from '../../MainSection/Articlecard';
import { renderMarkdownWithoutStyle } from '../../../utils/markdown';
import { ResultContainer, Footer, EmptyMessage, ErrorMessage } from '../index.style';

export default function PostResult({ keyword }: { keyword: string }) {
  const { loading, error, pages, lastFollowElementRef } = usePaginator(`/api/post/search?keyword=${keyword}`);

  return (
    <ResultContainer>
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
      {!loading && pages.length === 0 && <EmptyMessage>검색 결과 없음</EmptyMessage>}
      {loading && (
        <Footer>
          <Loader>
            <ReactLoading type="spin" color={COLORS.PRIMARY} />
          </Loader>
        </Footer>
      )}
      {error && <ErrorMessage>error</ErrorMessage>}
    </ResultContainer>
  );
}
