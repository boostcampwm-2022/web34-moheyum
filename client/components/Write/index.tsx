import React from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import Editor from './Editor';
import { mainSectionStyle } from '../../styles/mixin';
import { TopBar, ButtonBack } from '../../styles/common';
import PostProps from '../../types/Post';

const goBack = () => {
  Router.back();
};
interface Props {
  postData?: {
    _id?: string;
  };
  modifyPostData?: PostProps | null;
}
export default function EditorWrapper({ postData, modifyPostData }: Props) {
  return (
    <Wrapper>
      {!postData && (
        <TopBar>
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>새 글 작성</h1>
        </TopBar>
      )}
      {modifyPostData ? <Editor modifyPostData={modifyPostData} /> : <Editor parentPostData={postData} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${mainSectionStyle}
`;

EditorWrapper.defaultProps = {
  postData: {
    _id: '',
  },
  modifyPostData: null,
};
