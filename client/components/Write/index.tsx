import Router from 'next/router';
import React, { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { httpPost } from '../../utils/http';
import renderMarkdown from '../../utils/markdown';
import {
  BottomButtonConatiner,
  ButtonBack,
  EditorContainer,
  EditorTabItem,
  EditorTabs,
  EditorTabTool,
  EditorTextBox,
  PreviewTextBox,
  ToolbarContainer,
  TopButtonConatiner,
  Wrapper,
} from './index.style';

export default function Editor() {
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 Editor, 1 Preview
  const [content, setContent] = useState<string>('');
  const [contentHTML, setContentHTML] = useState<string>(''); // 탭 전환용

  // useEffect(() => { // test function
  //   if (!previewRef.current) return;
  //   previewRef.current.innerHTML = renderMarkdown(content);
  // }, [content]);

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.clipboardData?.getData('Text');
    // console.log(JSON.stringify(data));
    const cursor = window.getSelection();
    if (!cursor) return;
    if (cursor.type === 'Caret') {
      if (!cursor.anchorNode) return;
      const position = cursor.anchorOffset + data.length;
      cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
        0,
        cursor.anchorOffset
      )}${data}${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
      window.getSelection()?.collapse(cursor.anchorNode, position);
    }
    if (cursor.type === 'Range') {
      if (!cursor.anchorNode || !cursor.focusNode) return;
      cursor.deleteFromDocument();
      const position = cursor.anchorOffset + data.length;
      cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
        0,
        cursor.anchorOffset
      )}${data}${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
      window.getSelection()?.collapse(cursor.anchorNode, position);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const { key } = e;
    if (key === 'Backspace' || key === 'Delete') {
      if (contentRef.current.innerHTML === '' || contentRef.current.innerHTML === '<br>') {
        contentRef.current.innerHTML = '<div><br/></div>';
      }
    }
    setContent(contentRef.current.innerText.replace(/\n\n/g, '\n'));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    const cursor = window.getSelection();
    if (!cursor) return;
    if (key === 'Tab') {
      e.preventDefault();
      if (cursor.type === 'Caret') {
        if (!cursor.anchorNode) return;
        const position = cursor.anchorOffset + 2;
        cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
          0,
          cursor.anchorOffset
        )}\xa0\xa0${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
        window.getSelection()?.collapse(cursor.anchorNode, position);
      }
      if (cursor.type === 'Range') {
        if (!cursor.anchorNode || !cursor.focusNode) return;
        cursor.deleteFromDocument();
        const position = cursor.anchorOffset + 2;
        cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
          0,
          cursor.anchorOffset
        )}\xa0\xa0${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
        window.getSelection()?.collapse(cursor.anchorNode, position);
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
    if (result.statusCode !== 200) {
      alert(`글 작성에 실패했습니다.\nERROR statusCode: ${result.statusCode}\nERROR message: ${result.message}`);
      return;
    }
    Router.push('/');
  };

  const selectTab = (index: number) => {
    if (index === 0) {
      setTabIndex(0);
    }
    if (index === 1) {
      // preview
      if (!contentRef.current) return;
      setContentHTML(contentRef.current.innerHTML);
      setTabIndex(1);
    }
  };

  useEffect(() => {
    if (!contentRef.current) {
      if (!previewRef.current) return;
      previewRef.current.innerHTML = renderMarkdown(content);
    } else {
      contentRef.current.innerHTML = contentHTML;
    }
  }, [tabIndex]);

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
      <EditorContainer>
        {tabIndex === 0 ? (
          <EditorTextBox
            contentEditable={tabIndex === 0}
            ref={contentRef}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            suppressContentEditableWarning
          >
            <div>
              <br />
            </div>
          </EditorTextBox>
        ) : (
          <PreviewTextBox ref={previewRef} />
        )}
      </EditorContainer>
      <BottomButtonConatiner>
        <button type="button" onClick={submitHandler}>
          작성 완료
        </button>
      </BottomButtonConatiner>
    </Wrapper>
  );
}
