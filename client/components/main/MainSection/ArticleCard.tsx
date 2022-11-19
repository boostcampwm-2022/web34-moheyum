import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import React from 'react';
import COLORS from '../../../styles/color';

interface Props {
  title?: string;
  description?: string;
  author?: string;
}

ArticleCard.defaultProps = {
  title: '',
  description: '',
  author: '',
};

export default function ArticleCard({ title, description, author }: Props) {
  return (
    <Wrapper>
      <ArticleHeader>
        <Author>
          <div />
          {author || '작성자 이름'}
        </Author>
        <div>{title || '제목 없음'}</div>
        <HeaderInfo>
          <Comments>
            <Image src="/ico_comment.svg" width={20} height={20} />
            <span>2</span>
          </Comments>
          <PostedAt>2시간 전</PostedAt>
        </HeaderInfo>
      </ArticleHeader>
      <hr />
      <ArticleContent>
        <Content>{description || '글 내용이 없어용!'}</Content>
        <ArticleImage />
      </ArticleContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: inherit;
  margin: 10px 20px;
  background-color: ${COLORS.WHITE};
  border-radius: 10px;
  border: 2px solid ${COLORS.GRAY3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  cursor: pointer;

  & > hr {
    width: 100%;
    margin: 20px 0;
    background-color: ${COLORS.GRAY4};
    height: 1px;
    border: none;
  }
`;

const ArticleHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Author = styled.div`
  color: ${COLORS.BLACK};
  font-weight: 600;
  font-size: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${COLORS.GRAY4};
    border: 1px solid ${COLORS.GRAY3};
    margin-right: 10px;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
`;

const Comments = styled.div`
  color: ${COLORS.BLACK};
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > span {
    margin: 0 8px;
  }
`;

const PostedAt = styled.div`
  color: ${COLORS.GRAY2};
`;

const ArticleContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  flex: 1;
`;

const ArticleImage = styled.div`
  width: 130px;
  height: 130px;
  background-color: ${COLORS.GRAY4};
  border: 1px solid ${COLORS.GRAY3};
`;
