import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { calcTime } from '../../../utils/calctime';
import {
  ArticleContent,
  ArticleHeader,
  ArticleImageContainer,
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
  thumbnail?: string | null;
}

export const ArticleCard = React.forwardRef<HTMLInputElement, Props>(
  ({ id, description, author, nickname, date, comments, profileimg, thumbnail }: Props, ref) => (
    <Link href={`/post/${id}`}>
      <Wrapper ref={ref}>
        <ArticleHeader>
          <UserProfile profileimg={profileimg} nickname={nickname} author={author!} />
          <HeaderInfo>
            <Comments>
              <Image src="/ico_comment.svg" alt="comment" width={18} height={18} />
              <span>{comments}</span>
            </Comments>
            <PostedAt>{calcTime(date)}</PostedAt>
          </HeaderInfo>
        </ArticleHeader>
        <ArticleContent>
          <Content>{description || '글 내용이 없어용!'}</Content>
          {thumbnail && (
            <ArticleImageContainer>
              <Image src={thumbnail} fill sizes="100%, 100%" alt="post thumbnail" />
            </ArticleImageContainer>
          )}
        </ArticleContent>
        <hr />
      </Wrapper>
    </Link>
  )
);

ArticleCard.defaultProps = {
  description: '',
  author: '',
  thumbnail: null,
};
