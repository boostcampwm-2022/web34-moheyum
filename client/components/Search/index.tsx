import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TopBar } from '../../styles/common';
import PostResult from './PostResult';
import UserResult from './UserResult';
import { Wrapper, TopBarContainer, SearchInputBar, TabContainer } from './index.style';

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
    if (!inputRef.current) return;
    if (initKeyword) {
      if (Array.isArray(initKeyword)) {
        setKeyword(initKeyword[0]);
        [inputRef.current.value] = initKeyword;
      } else {
        setKeyword(initKeyword);
        inputRef.current.value = initKeyword;
      }
    }
  }, [inputRef.current]);

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
