import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import UserProfile from '../UserProfile';
import renderMarkdown from '../../../utils/markdown';

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
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(postData.description);
  }, []);
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
      <div id="content">
        <Link href={`/post/${postData._id}`}>
          <div id="text-box" ref={contentRef}>
            {postData.description}
          </div>
        </Link>
      </div>
    </li>
  );
});
export default Comment;
