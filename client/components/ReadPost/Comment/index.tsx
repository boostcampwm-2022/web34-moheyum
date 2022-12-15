import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserProfile from '../../UserProfile';
import { renderMarkdown } from '../../../utils/markdown';
import { CommentItem, CommentContentBox, CommentHeader, Comments } from './index.style';

export interface commentItem {
  _id: string;
  author: string;
  childPosts: number;
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
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(postData.description);
  }, []);
  return (
    <CommentItem ref={ref}>
      <CommentHeader>
        <Link href={`/${postData.author}`}>
          <UserProfile
            profileimg={postData.authorDetail.profileimg}
            nickname={postData.authorDetail.nickname}
            author={postData.author}
            createdAt={postData.createdAt}
          />
        </Link>
        <Comments>
          <Image src="/ico_comment.svg" alt="commentIcon" width={18} height={18} />
          <span>{postData.childPosts}</span>
        </Comments>
      </CommentHeader>
      <CommentContentBox>
        <Link href={`/post/${postData._id}`}>
          <div className="text-box" ref={contentRef}>
            {postData.description}
          </div>
        </Link>
      </CommentContentBox>
    </CommentItem>
  );
});
export default Comment;
