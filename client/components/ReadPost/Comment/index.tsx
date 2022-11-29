import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { calcTime } from '../../../utils/calctime';
import { Author, PostedAt, ProfileImg, AuthorDetail } from '../index.style';

export interface commentItem {
  _id: string;
  author: string;
  childPost: number;
  createdAt: string;
  description: string;
  parentPost: string;
  authorDetail: {
    bio: string;
    email: string;
    follower: number;
    following: number;
    nickname: string;
    postcount: number;
    profileimg: string;
    userState: boolean;
  };
}

interface CommentData {
  postData: commentItem;
}

const Comment = React.forwardRef<HTMLLIElement, CommentData>(({ postData }: CommentData, ref) => {
  return (
    <li ref={ref}>
      <Link href={`/${postData.author}`}>
        <Author>
          <ProfileImg>
            {postData.authorDetail.profileimg ? (
              <Image src={postData.authorDetail.profileimg} alt="Logo" layout="fill" priority />
            ) : (
              <Image src="/favicon.svg" alt="Logo" layout="fill" priority />
            )}
          </ProfileImg>
          <AuthorDetail>
            <div id="name">{postData.authorDetail.nickname || '작성자 이름'}</div>
            <div id="user-id">@{postData.author || '작성자 아이디'}</div>
          </AuthorDetail>
          <PostedAt>
            <div id="time">{calcTime(postData.createdAt)}</div>
            <div>&nbsp;</div>
          </PostedAt>
        </Author>
      </Link>
      <div id="text-box">
        <div id="content">{postData.description}</div>
      </div>
    </li>
  );
});

export default Comment;
