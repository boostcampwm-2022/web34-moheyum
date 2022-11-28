import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { calcTime } from '../../../utils/calctime';
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
  description?: string;
  author?: string;
  date: string;
}

export const ArticleCard = React.forwardRef<HTMLInputElement, Props>(
  ({ id, description, author, date }: Props, ref) => (
    <div ref={ref}>
      <Link href={`/post/${id}`}>
        <Wrapper>
          <ArticleHeader>
            <Author>
              <div />
              {author || '작성자 이름'}
            </Author>
            <HeaderInfo>
              <Comments>
                <Image src="/ico_comment.svg" width={20} height={20} />
                <span>2</span>
              </Comments>
              <PostedAt>{calcTime(date)}</PostedAt>
            </HeaderInfo>
          </ArticleHeader>
          <hr />
          <ArticleContent>
            <Content>{description || '글 내용이 없어용!'}</Content>
            <ArticleImage />
          </ArticleContent>
        </Wrapper>
      </Link>
    </div>
  )
);

ArticleCard.defaultProps = {
  description: '',
  author: '',
};
