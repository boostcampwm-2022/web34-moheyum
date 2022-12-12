import styled from '@emotion/styled';
import React, { useRef } from 'react';
import MainPost from '../ReadPost/MainPost';
import Editor from '../Write/Editor';
import type PostProps from '../../types/Post';
import COLORS from '../../styles/color';

interface Props {
  data: {
    post: PostProps;
  };
}

export default function CommentPost({ response }: { response: Props }) {
  const mainPostRef = useRef<HTMLDivElement>(null);
  return (
    <ContentWrapper>
      <MainPostWrapper ref={mainPostRef}>
        <MainPost postData={response.data.post} />
      </MainPostWrapper>
      <CommentEditor>
        <Editor parentPostData={response.data.post} />
      </CommentEditor>
    </ContentWrapper>
  );
}
const ContentWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const MainPostWrapper = styled.div`
  width: 100%;
  padding: 8px 15px;
`;

const CommentEditor = styled.div`
  overflow-y: scroll;
  width: 100%;
  min-height: 300px;
  flex: 1;
  border-top: 2px solid ${COLORS.GRAY3};
  margin-top: 20px;
  padding-top: 20px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
