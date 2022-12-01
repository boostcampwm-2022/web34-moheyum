import styled from '@emotion/styled';
import React, { useCallback, useRef, useState } from 'react';
import COLORS from '../../../styles/color';
import Paginator, { NEXT } from '../../../utils/paginator';
import { ArticleCard } from '../../Main/Articlecard';

export default function PostResult({ keyword }: { keyword: string }) {
  const [nextCursor, setNextCursor] = useState('START');
  const { loading, error, pages, next } = Paginator(`/api/post/search?keyword=${keyword}`, nextCursor);

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
    <ResultContainer>
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
      {!loading && pages.length === 0 && <EmptyMessage>검색 결과 없음</EmptyMessage>}
      {loading && <ErrorMessage>Loading</ErrorMessage>}
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
