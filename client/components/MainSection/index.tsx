import React, { useCallback, useRef, useEffect, RefObject } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import ReactLoading from 'react-loading';
import { ArticleCard } from './Articlecard';
import COLORS from '../../styles/color';
import { ArticlesSection, FakeButton, NewArticleSection, Placeholder, Wrapper, Newsfeed, Footer } from './index.style';
import { MainTopBar, Loader } from '../../styles/common';
import { scrollHandle, newsfeedList } from '../../atom';
import usePaginator from '../../hooks/usePaginator';
import { renderMarkdownWithoutStyle } from '../../utils/markdown';

export default function MainSection() {
  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [scrollhandler, setScrollHandler] = useRecoilState(scrollHandle);
  const [currentNewsfeed, setCurrentNewsfeed] = useRecoilState(newsfeedList);
  const { pages, next, loading, lastFollowElementRef } = usePaginator(
    `/api/post/newsfeed`,
    scrollhandler.historyBack ? scrollhandler.nextPageId : 'START'
  );
  const onScroll = useCallback(() => {
    setScrollHandler((prevState) => ({ ...prevState, scrollY: scrollRef.current ? scrollRef.current.scrollTop : 0 }));
  }, []);
  useEffect(() => {
    if (pages.length !== 0 && scrollhandler.nextPageId !== '') {
      setCurrentNewsfeed((prevState) => prevState.concat(pages));
      setScrollHandler((prevState) => ({ ...prevState, nextPageId: next }));
    }
  }, [pages]);
  useEffect(() => {
    if (!scrollhandler.historyBack) {
      setScrollHandler((prevState) => ({ ...prevState, historyBack: false, scrollY: 0, nextPageId: 'START' }));
      setCurrentNewsfeed([]);
    } else {
      if (scrollRef.current) {
        scrollRef.current.scrollTo(0, scrollhandler.scrollY);
      }
      setScrollHandler((prevState) => ({ ...prevState, historyBack: false }));
    }
  }, []);
  return (
    <Wrapper>
      <MainTopBar>
        <div>홈</div>
      </MainTopBar>
      <Newsfeed onScroll={onScroll} ref={scrollRef}>
        <Link href="/write">
          <NewArticleSection>
            <Placeholder>무슨 생각 하세요?</Placeholder>
            <hr />
            <FakeButton type="button">글쓰기</FakeButton>
          </NewArticleSection>
        </Link>
        <ArticlesSection>
          {currentNewsfeed.map((item: any, index: number) => {
            const parsed = renderMarkdownWithoutStyle(item.description);
            if (currentNewsfeed.length === index + 1)
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
        </ArticlesSection>
      </Newsfeed>
      <Footer>
        <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
      </Footer>
    </Wrapper>
  );
}
