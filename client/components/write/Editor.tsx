import styled from '@emotion/styled';
import React, { useRef } from 'react';

interface Props {
  content: string;
}

export default function Editor({ content }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  //   const inputHandler = () => {
  //     const target = contentRef.current;
  //     if (!target) return;
  //     console.log(target.innerHTML);
  //   };

  const test = (e) => {
    const cursor = window.getSelection();
    // cursor.
  };

  const submitHandler = () => {
    const target = contentRef.current;
    if (!target) return;
    const cursor = window.getSelection();
    console.log(cursor);
    // console.log(target.innerHTML);
    // console.log(target.innerText);
    // target.contentEditable = 'false';
  };
  return (
    <Wrapper>
      <TopButtonConatiner>Header</TopButtonConatiner>
      <div>Toolbar</div>
      <EditorTextBox
        contentEditable
        ref={contentRef}
        suppressContentEditableWarning
        onFocus={(e) => {
          if (e.target.innerHTML === '') {
            console.log('d');
            e.target.innerHTML = `<div></div>`;
          }
        }}
        onKeyDown={test}
      >
        <div>
          <br />
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
  flex: 1;
  /* display: inline-block; */
`;

const TopButtonConatiner = styled.div`
  width: 100%;
`;

const BottomButtonConatiner = styled.div`
  width: 100%;
  background-color: aliceblue;
`;
