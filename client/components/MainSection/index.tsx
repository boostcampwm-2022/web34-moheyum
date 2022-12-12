import React, { useCallback, useRef, useEffect, RefObject } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { ArticleCard } from './Articlecard';
import { ArticlesSection, FakeButton, NewArticleSection, Placeholder, Wrapper, Newsfeed } from './index.style';
import { MainTopBar } from '../../styles/common';
import { scrollY, newsfeedList } from '../../atom';
import usePaginator from '../../hooks/usePaginator';
import { renderMarkdownWithoutStyle } from '../../utils/markdown';

export default function MainSection() {
  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useRecoilState(scrollY);
  const [currentNewsfeed, setCurrentNewsfeed] = useRecoilState(newsfeedList);
  const { pages, lastFollowElementRef } = usePaginator(`/api/post/newsfeed`);
  const onScroll = useCallback(() => {
    if (scrollRef.current) {
      setScroll(scrollRef.current.scrollTop);
    }
  }, []);
  useEffect(() => {
    if (pages.length !== 0) {
      setCurrentNewsfeed((prevState) => prevState.concat(pages));
    }
  }, [pages]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scroll);
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
    </Wrapper>
  );
}
