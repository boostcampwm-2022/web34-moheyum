import Router from 'next/router';
import React, { KeyboardEvent, useRef, useState } from 'react';
import { httpPost } from '../../utils/http';
import {
  BottomButtonConatiner,
  ButtonBack,
  EditorTabItem,
  EditorTabs,
  EditorTabTool,
  EditorTextBox,
  ToolbarContainer,
  TopButtonConatiner,
  Wrapper,
} from './index.style';

export default function Editor() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 Editor, 1 Preview

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    // const cursor = window.getSelection();
    const { key } = e;
    if (key === 'Backspace') {
      if (contentRef.current?.innerHTML === '') {
        contentRef.current.innerHTML = '<div><br></div>';
      }
    }
  };

  const goBack = () => {
    Router.back();
  };

  const submitHandler = async () => {
    const target = contentRef.current;
    if (!target) return;
    const result = await httpPost('/post', {
      author: 1,
      title: 'title',
      description: contentRef.current.innerText,
    });
    // if (!result.ok) {
    //   console.log('error');
    //   return;
    // }
    console.log(result);
    Router.push('/');
  };

  const selectTab = (index: number) => {
    if (index === 0) {
      setTabIndex(0);
    }
    if (index === 1) {
      setTabIndex(1);
    }
  };

  return (
    <Wrapper>
      <TopButtonConatiner>
        <ButtonBack onClick={goBack} />
        <h1>글쓰기</h1>
        <div>&nbsp;</div>
      </TopButtonConatiner>
      <ToolbarContainer>
        <EditorTabs>
          <EditorTabItem selected={tabIndex === 0} onClick={() => selectTab(0)}>
            MD
          </EditorTabItem>
          <EditorTabItem selected={tabIndex === 1} onClick={() => selectTab(1)}>
            Preview
          </EditorTabItem>
        </EditorTabs>
        <EditorTabs>
          &nbsp;
          <EditorTabTool style={{ fontWeight: 'bold' }}>B</EditorTabTool>
          <EditorTabTool style={{ fontStyle: 'italic' }}>I</EditorTabTool>
          <EditorTabTool style={{ textDecorationLine: 'underline' }}>U</EditorTabTool>
        </EditorTabs>
      </ToolbarContainer>
      <EditorTextBox
        contentEditable={tabIndex === 0}
        ref={contentRef}
        suppressContentEditableWarning
        onKeyUp={handleKeyUp}
      >
        <div>
          <br />
        </div>
      </EditorTextBox>
      <BottomButtonConatiner>
        <button type="button" onClick={submitHandler}>
          작성 완료
        </button>
      </BottomButtonConatiner>
    </Wrapper>
  );
}
