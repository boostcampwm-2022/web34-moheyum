import React from 'react';
import ReactLoading from 'react-loading';
import { Loader } from '../../../styles/common';
import COLORS from '../../../styles/color';
import usePaginator from '../../../hooks/usePaginator';
import { FollowMember } from '../../Follow/FollowMember';
import { ResultContainer, Footer, EmptyMessage, ErrorMessage } from '../index.style';

export default function UserResult({ keyword }: { keyword: string }) {
  const { loading, error, pages, lastFollowElementRef } = usePaginator(`/api/user/search?keyword=${keyword}`);

  return (
    <ResultContainer>
      {pages.map((item: any, index: number) => {
        if (pages.length === index + 1)
          return (
            <FollowMember
              userid={item.userid}
              nickname={item.nickname}
              profileimg={item.profileimg}
              displayButton
              key={item._id}
              ref={lastFollowElementRef}
            />
          );
        return (
          <FollowMember
            userid={item.userid}
            nickname={item.nickname}
            profileimg={item.profileimg}
            displayButton
            key={item._id}
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
