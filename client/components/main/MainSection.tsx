import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import COLORS from '../../styles/color';
import { buttonStyle } from '../../styles/mixin';
import ArticleCard from './ArticleCard';
import { httpGet } from '../../utils/http';

export default function MainSection() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response: any = await httpGet('/api/post');
    setArticles(response);
  };

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
        <ArticleCard />
        {articles.map((item) => (
          // eslint-disable-next-line no-underscore-dangle
          <ArticleCard author={item.author} key={item._id} description={item.description} title={item.title} />
        ))}
      </ArticlesSection>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mainSection.backgroundColor};
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
`;

const NewArticleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 35px 30px 15px 30px;
  & > hr {
    margin-top: 20px;
    background-color: ${COLORS.GRAY4};
    height: 1px;
    border: none;
  }
  user-select: none;
  border-bottom: 2px solid ${COLORS.GRAY2};
`;

const Placeholder = styled.div`
  color: ${COLORS.GRAY3};
  font-size: 24px;
`;

const FakeButton = styled.button`
  ${buttonStyle}
  width: max-content;
  padding: 5px 10px;
  align-self: flex-end;
  margin: 10px 10px 0px 10px;
`;

const ArticlesSection = styled.div`
  background-color: ${COLORS.OFF_WHITE};
  flex: 1;
  overflow-y: scroll;
`;
