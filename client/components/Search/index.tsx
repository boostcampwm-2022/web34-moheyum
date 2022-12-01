import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import COLORS from '../../styles/color';
import { TopBar } from '../../styles/common';
import { mainSectionStyle } from '../../styles/mixin';
import PostResult from './PostResult';

export default function SearchSection() {
  const router = useRouter();
  const initKeyword = router.query.keyword;
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <Wrapper>
      <TopBar>
        <TopBarContainer>
          <SearchInputBar type="text" placeholder="검색어를 입력하세요." onKeyDown={handleEnter} ref={inputRef} />
          <Image alt="search button" width={30} height={30} src="/search.svg" />
        </TopBarContainer>
      </TopBar>
      <PostResult keyword={keyword} />
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
    margin-right: 30px;
  }
`;

export const SearchInputBar = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  padding: 5px 30px;
  font-size: 20px;
  color: ${COLORS.BLACK};
  font-weight: 500;

  &:focus {
    outline: none;
  }

  &:placeholder-shown {
    color: ${COLORS.GRAY3};
  }
`;
