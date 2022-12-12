import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ReactLoading from 'react-loading';
import { authedUser, scrollHandle } from '../../atom';
import COLORS from '../../styles/color';
import { ButtonBack, TopBar } from '../../styles/common';
import usePaginator from '../../hooks/usePaginator';
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
  const setHistoryBack = useSetRecoilState(scrollHandle);
  const goBack = () => {
    setHistoryBack((prevState) => ({ ...prevState, historyBack: true }));
    Router.back();
  };
  let commentCount = 0;
  if (postData.childPosts) {
    commentCount = postData.childPosts.length;
  }
  const { loading, pages, lastFollowElementRef } = usePaginator(`/api/post/comments/${postData._id}`);

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
