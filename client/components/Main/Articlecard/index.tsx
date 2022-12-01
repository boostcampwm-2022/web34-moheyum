import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { calcTime } from '../../../utils/calctime';
import {
  ArticleContent,
  ArticleHeader,
  ArticleImage,
  Comments,
  Content,
  HeaderInfo,
  PostedAt,
  Wrapper,
} from './index.style';
import UserProfile from './UserProfile/index';

interface Props {
  id: string;
  description?: string;
  date: string;
  comments: number;
  profileimg: string;
  nickname: string;
  author?: string;
}

export const ArticleCard = React.forwardRef<HTMLInputElement, Props>(
  ({ id, description, author, nickname, date, comments, profileimg }: Props, ref) => (
    <Link href={`/post/${id}`}>
      <Wrapper ref={ref}>
        <ArticleHeader>
          <UserProfile profileimg={profileimg} nickname={nickname} author={author!} />
          <HeaderInfo>
            <Comments>
              <Image src="/ico_comment.svg" width={20} height={20} />
              <span>{comments}</span>
            </Comments>
            <PostedAt>{calcTime(date)}</PostedAt>
          </HeaderInfo>
        </ArticleHeader>
        <ArticleContent>
          <Content>{description || '글 내용이 없어용!'}</Content>
          <ArticleImage />
        </ArticleContent>
        <hr />
      </Wrapper>
    </Link>
  )
);

ArticleCard.defaultProps = {
  description: '',
  author: '',
};
