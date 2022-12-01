import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import COLORS from '../../styles/color';
import { TopBar } from '../../styles/common';
import { mainSectionStyle } from '../../styles/mixin';
import PostResult from './PostResult';
import UserResult from './UserResult';

export default function SearchSection() {
  const router = useRouter();
  const initKeyword = router.query.keyword;
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 게시글, 1 사용자

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      if (!inputRef.current) return;
      setKeyword(inputRef.current.value);
    }
  };

  useEffect(() => {
    if (initKeyword) {
      if (Array.isArray(initKeyword)) setKeyword(initKeyword[0]);
      else setKeyword(initKeyword);
    }
  }, []);

  const changeTab = (idx: number) => {
    setTabIndex(idx);
  };

  return (
    <Wrapper>
      <TopBar>
        <TopBarContainer>
          <Image alt="search button" width={30} height={30} src="/search.svg" />
          <SearchInputBar type="text" placeholder="검색어를 입력하세요." onKeyDown={handleEnter} ref={inputRef} />
        </TopBarContainer>
      </TopBar>
      <TabContainer>
        <button type="button" className={tabIndex === 0 ? 'selected' : ''} onClick={() => changeTab(0)}>
          게시글 검색
        </button>
        <button type="button" className={tabIndex === 1 ? 'selected' : ''} onClick={() => changeTab(1)}>
          사용자 검색
        </button>
      </TabContainer>
      {tabIndex === 0 && <PostResult keyword={keyword} />}
      {tabIndex === 1 && <UserResult keyword={keyword} />}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  ${mainSectionStyle}
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    user-select: none;
    cursor: pointer;
    margin-left: 20px;
  }
`;

export const SearchInputBar = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  padding: 10px;
  font-size: 20px;
  color: ${COLORS.BLACK};
  font-weight: 500;

  &:focus {
    outline: none;
  }

  &:placeholder-shown {
    color: ${COLORS.GRAY4};
  }
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > button {
    flex: 1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px;
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.WHITE};
    font-size: 18px;
    border: none;

    &.selected {
      background-color: ${COLORS.WHITE};
      color: ${COLORS.BLACK};
      font-weight: 700;
    }
  }
`;
