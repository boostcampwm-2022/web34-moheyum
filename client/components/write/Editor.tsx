import styled from '@emotion/styled';
import Router from 'next/router';
import React, { KeyboardEvent, useRef, useState } from 'react';
import COLORS from '../../styles/color';

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
    Router.push('/');
  };

  const submitHandler = async () => {
    const target = contentRef.current;
    if (!target) return;
    const result = await fetch(`${process.env.NEXT_PUBLIC_TEST_API}/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: 1,
        title: 'title',
        article: contentRef.current.innerText,
        date: new Date(),
      }),
    });
    console.log(await result.json());
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
          fasfasgfs
          <br />
        </div>
        <div>
          <span>dzzzz</span>dd
        </div>
      </EditorTextBox>
      <BottomButtonConatiner>
        <button type="button" onClick={submitHandler}>
          submit
        </button>
      </BottomButtonConatiner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const EditorTextBox = styled.div`
  width: 100%;
  overflow-y: scroll;
  padding: 10px;
  font-size: 12px;
  flex: 1;
  /* display: inline-block; */
  &:focus {
    outline: none;
  }
`;

const TopButtonConatiner = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY1};
  padding: 15px;
  display: flex;
  flex-direction: row;
  & > h1 {
    flex: 1;
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  & > div {
    width: 30px;
    height: 30px;
  }
`;

const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  width: 15px;
  height: 15px;
  margin: 15px 15px;
  background-image: url('/ico_chveron_left.svg');
  background-size: contain;
  background-repeat: no-repeat;
`;

const ToolbarContainer = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.GRAY3};
  border-bottom: 1px solid ${COLORS.PRIMARY};
`;

const EditorTabs = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0 20px;
  user-select: none;
`;

interface CanBeSelected {
  selected?: boolean;
}

const EditorTabItem = styled.li<CanBeSelected>`
  /* box-sizing: border-box; */
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.PRIMARY};
  ${(props) =>
    props.selected &&
    `border-bottom: 1px solid white;
  margin-bottom: -1px;`}
  border-radius: 5px 5px 0 0;
  background-color: ${(props) => (props.selected ? `${COLORS.WHITE}` : `${COLORS.GRAY3}`)};
  cursor: pointer;
`;

const EditorTabTool = styled.li`
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 5px;
  background-color: ${COLORS.WHITE};
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  cursor: pointer;
`;

const BottomButtonConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
