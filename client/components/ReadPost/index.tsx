import React, { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';
import ReactLoading from 'react-loading';
import { authedUser } from '../../atom';
import COLORS from '../../styles/color';
import { ButtonBack, TopBar } from '../../styles/common';
import usePaginator, { NEXT } from '../../hooks/usePaginator';
import type PostProps from '../../types/Post';
import Comment, { commentItem } from './Comment';
import ProfileImg from '../UserProfile/ProfileImg';
import ParentPost from './ParentPost';
import type { Parent } from '../../types/Post';
import MainPost from './MainPost';
import { PostContent, Wrapper, CommentBox, Loader } from './index.style';

interface PostData {
  postData: PostProps;
  title: string;
}

export default function ReadPost({ postData, title }: PostData) {
  const authedUserInfo = useRecoilValue(authedUser);
  const goBack = () => {
    Router.back();
  };
  let commentCount = 0;
  if (postData.childPosts) {
    commentCount = postData.childPosts.length;
  }
  const [nextCursor, setNextCursor] = useState(NEXT.START);
  const { loading, error, pages, next } = usePaginator(`/api/post/comments/${postData._id}`, nextCursor);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (error) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && next !== NEXT.END) {
            setNextCursor(next);
          }
        },
        {
          threshold: 0.4,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );
  return (
    <Wrapper>
      <TopBar>
        <div>
          <ButtonBack aria-label="go-back" type="button" onClick={goBack} />
        </div>
        <h1>{title}</h1>
      </TopBar>
      <PostContent>
        {postData.parentPost ? <ParentPost post={postData.parent.at(0) as Parent} /> : <div />}
        <MainPost postData={postData} />
        <CommentBox>
          <div id="title">답글: {commentCount}개</div>
          <div id="comment">
            <Link href={`/post/${postData._id}/comment`}>
              <ProfileImg imgUrl={authedUserInfo.profileimg} />
              <div id="text">답글 쓰기</div>
            </Link>
          </div>
          <div id="list">
            {pages.map((item: commentItem, index: number) => {
              if (pages.length === index + 1)
                return <Comment key={item._id} postData={item} ref={lastFollowElementRef} />;
              return <Comment key={item._id} postData={item} />;
            })}
          </div>
          <Loader>{loading && <ReactLoading type="spin" color={COLORS.PRIMARY} />}</Loader>
        </CommentBox>
      </PostContent>
    </Wrapper>
  );
}
