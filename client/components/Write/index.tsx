import React from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import Editor from './Editor';
import { mainSectionStyle } from '../../styles/mixin';
import { TopBar, ButtonBack } from '../../styles/common';

const goBack = () => {
  Router.back();
};
export default function EditorWrapper() {
  return (
    <Wrapper>
      <TopBar>
        <div>
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>게시글</h1>
        </div>
      </TopBar>
      <Editor />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${mainSectionStyle}
`;
