import React from 'react';
import Link from 'next/link';
import UserProfile from '../UserProfile';

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
        <UserProfile
          profileimg={postData.authorDetail.profileimg}
          nickname={postData.authorDetail.nickname}
          author={postData.author}
          createdAt={postData.createdAt}
        />
      </Link>
      <div id="text-box">
        <div id="content">{postData.description}</div>
      </div>
    </li>
  );
});

export default Comment;
