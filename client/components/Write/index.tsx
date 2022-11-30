import React from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import Editor from './Editor';
import { mainSectionStyle } from '../../styles/mixin';
import { TopBar, ButtonBack } from '../../styles/common';

const goBack = () => {
  Router.back();
};
interface Props {
  postData: {
    _id: string;
  };
}
export default function EditorWrapper({ postData }: Props) {
  return (
    <Wrapper>
      {postData._id === '' && (
        <TopBar>
          <div>
            <div>
              <ButtonBack type="button" onClick={goBack} />
            </div>
            <h1>새 글 작성</h1>
          </div>
        </TopBar>
      )}
      <Editor postData={postData} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${mainSectionStyle}
`;
