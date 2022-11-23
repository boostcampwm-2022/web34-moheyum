import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import {
  ArticleContent,
  ArticleHeader,
  ArticleImage,
  Author,
  Comments,
  Content,
  HeaderInfo,
  PostedAt,
  Wrapper,
} from './index.style';

interface Props {
  id: string;
  title?: string;
  description?: string;
  author?: string;
}

ArticleCard.defaultProps = {
  title: '',
  description: '',
  author: '',
};

export default function ArticleCard({ id, title, description, author }: Props) {
  return (
    <Link href={`/post/${id}`}>
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
    </Link>
  );
}
