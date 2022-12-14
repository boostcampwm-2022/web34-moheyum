import styled from '@emotion/styled';
import React from 'react';
import ReactLoading from 'react-loading';
import { Loader } from '../../../styles/common';
import COLORS from '../../../styles/color';
import usePaginator from '../../../hooks/usePaginator';
import { ArticleCard } from '../../MainSection/Articlecard';
import { renderMarkdownWithoutStyle } from '../../../utils/markdown';

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
      <Footer>
        <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
      </Footer>
      {error && <ErrorMessage>error</ErrorMessage>}
    </ResultContainer>
  );
}

export const ResultContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const ResultHeader = styled.h1`
  width: 100%;
  font-size: 24px;
  padding: 15px;
  border-bottom: 2px solid ${COLORS.GRAY4};
  margin-bottom: 30px;
  & > span {
    font-weight: 700;
    font-size: 28px;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 160px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 160px;
  color: ${COLORS.GRAY3};
`;

export const Footer = styled.footer`
  width: '100%';
  height: '50px';
  display: flex;
  justify-content: center;
  align-items: center;
`;
