import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';
import { httpDelete } from '../../../utils/http';
import { authedUser } from '../../../atom';
import type PostProps from '../../../types/Post';
import renderMarkdown from '../../../utils/markdown';
import UserProfile from '../../UserProfile';
import {
  ContentBox,
  HeaderBox,
  MainContentBox,
  MenuDropDown,
  ButtonConatiner,
  DropDown,
  PostButton,
} from './index.style';

export default function MainPost({ postData }: { postData: PostProps }) {
  const authedUserInfo = useRecoilValue(authedUser);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dropDownDisplay, setDropDownDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = renderMarkdown(postData.description);
  }, [contentRef.current?.textContent]);
  const menuHandler = () => {
    dropDownDisplay ? setDropDownDisplay(false) : setDropDownDisplay(true);
  };
  const deleteHandler = async () => {
    setDropDownDisplay(false);
    const response = await httpDelete(`/post/${postData._id}`);
    if (response.statusCode !== 200) {
      alert(`게시글 삭제에 실패하였습니다. ${response.message}`);
    } else {
      Router.push('/');
    }
  };

  const modifyHandler = async () => {
    setDropDownDisplay(false);
    Router.push(`/post/${postData._id}/modify`);
  };
  return (
    <MainContentBox>
      <HeaderBox>
        <Link href={`/${postData.author}`}>
          <UserProfile
            profileimg={postData.authorDetail.profileimg}
            nickname={postData.authorDetail.nickname}
            author={postData.author}
            createdAt={postData.createdAt}
          />
        </Link>
        <ButtonConatiner>
          <MenuDropDown
            style={{ display: authedUserInfo.userid === postData.author ? 'block' : 'none' }}
            onClick={menuHandler}
          >
            <Image src="/menu.svg" alt="Logo" width={30} height={30} priority></Image>
          </MenuDropDown>
          {dropDownDisplay && (
            <DropDown>
              <PostButton onClick={modifyHandler}>수정</PostButton>
              <PostButton onClick={deleteHandler}>삭제</PostButton>
            </DropDown>
          )}
        </ButtonConatiner>
      </HeaderBox>
      <ContentBox ref={contentRef}>{postData.description || '글 내용'}</ContentBox>
    </MainContentBox>
  );
}
