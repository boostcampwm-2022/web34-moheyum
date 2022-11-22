import React from 'react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import ArticleCard from '../Articlecard';
import newsfeedState from '../../../atom/newsfeedState';
import { ArticlesSection, FakeButton, NewArticleSection, Placeholder, Wrapper } from './index.style';

export default function MainSection() {
  const newsfeedList = useRecoilValue(newsfeedState);

  return (
    <Wrapper>
      <Link href="/write">
        <NewArticleSection>
          <Placeholder>무슨 생각 하세요?</Placeholder>
          <hr />
          <FakeButton type="button">글쓰기</FakeButton>
        </NewArticleSection>
      </Link>
      <ArticlesSection>
        {newsfeedList.map((item) => (
          <ArticleCard
            author={item.author}
            key={item._id}
            id={item._id}
            description={item.description}
            title={item.title}
          />
        ))}
      </ArticlesSection>
    </Wrapper>
  );
}
