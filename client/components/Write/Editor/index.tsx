import Image from 'next/image';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';
import { authedUser } from '../../../atom';
import React, { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState, useCallback, DragEvent } from 'react';
import { httpPost } from '../../../utils/http';
import renderMarkdown from '../../../utils/markdown';
import {
  Author,
  BottomButtonConatiner,
  CommentTopBar,
  EditorContainer,
  EditorTabItem,
  EditorTabs,
  EditorTabTool,
  EditorTextBox,
  PostHeader,
  PreviewTextBox,
  Profile,
  ToolbarContainer,
  Wrapper,
} from './index.style';

interface Props {
  postData: {
    _id?: string;
  };
}

export default function Editor({ postData }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 Editor, 1 Preview
  const [content, setContent] = useState<string>('');
  const [contentHTML, setContentHTML] = useState<string>('<div><br></div>'); // 탭 전환용
  const authedUserInfo = useRecoilValue(authedUser);
  // 프리뷰 전환했다가 마크다운 돌아올 때 쓰는거
  const pasteAction = (data: string) => {
    // console.log(JSON.stringify(data));
    const cursor = window.getSelection();
    if (!cursor) return;
    if (!contentRef.current) return;
    const collapseNode = cursor.anchorNode;
    if (cursor.type === 'Caret') {
      if (!cursor.anchorNode) return;
      const position = cursor.anchorNode.nodeType === 3 ? cursor.anchorOffset + data.length : 1;
      cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
        0,
        cursor.anchorOffset
      )}${data}${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;

      window.getSelection()?.collapse(collapseNode, position);
    }
    if (cursor.type === 'Range') {
      if (!cursor.anchorNode || !cursor.focusNode) return;
      cursor.deleteFromDocument();
      const position = cursor.anchorNode.nodeType === 3 ? cursor.anchorOffset + data.length : 1;
      cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
        0,
        cursor.anchorOffset
      )}${data}${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
      window.getSelection()?.collapse(collapseNode, position);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.clipboardData?.getData('Text');
    pasteAction(data);
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
    if (!contentRef.current) return;
    const { key } = e;
    const cursor = window.getSelection();
    if (!cursor) return;
    const collapseNode = cursor.anchorNode;

    if (key === 'Backspace' || key === 'Delete') {
      if (contentRef.current.innerHTML === '<div><br></div>') {
        e.preventDefault();
        return;
      }
    }
    if (key === 'Tab') {
      e.preventDefault();
      if (cursor.type === 'Caret') {
        if (!cursor.anchorNode) return;
        const position = cursor.anchorNode.nodeType === 3 ? cursor.anchorOffset + 2 : 1;
        cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
          0,
          cursor.anchorOffset
        )}\xa0\xa0${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;

        window.getSelection()?.collapse(collapseNode, position);
      }
      if (cursor.type === 'Range') {
        if (!cursor.anchorNode || !cursor.focusNode) return;
        cursor.deleteFromDocument();
        const position = cursor.anchorNode.nodeType === 3 ? cursor.anchorOffset + 2 : 1;
        cursor.anchorNode.textContent = `${cursor.anchorNode?.textContent?.slice(
          0,
          cursor.anchorOffset
        )}\xa0\xa0${cursor.anchorNode?.textContent?.slice(cursor.anchorOffset)}`;
        window.getSelection()?.collapse(cursor.anchorNode, position);
      }
    }
  };

  const submitHandler = async () => {
    const target = contentRef.current;
    if (!target) return;
    const result = await httpPost('/post', {
      author: 1,
      title: 'title',
      description: contentRef.current.innerText,
      parentPost: postData._id === '' ? null : postData._id,
    });
    if (result.statusCode !== 200) {
      alert(`글 작성에 실패했습니다.\nERROR statusCode: ${result.statusCode}\nERROR message: ${result.message}`);
      return;
    }
    Router.back();
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


  // ---------------------------------------------------------------------------------------------------------

  const dragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFiles = (files: FileList) => {
    const fetchImage = async () => {
      const response = await fetch(`/api/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      return response.json();
    };

    const formData = new FormData();
    formData.append('file', files[0]);

    if (contentRef.current) {
      const format: string = `${files[0].name.split('.').slice(-1)}`.toUpperCase();
      if (format === 'JPG' || format === 'JPEG' || format === 'PNG') {
        fetchImage()
          .then((imageData) => {
            const data = `![${files[0].name as string}](${imageData.imageLink})`;
            pasteAction(data);
            setContent(data); // setContent를 안하면 프리뷰에 반영이 안됩니다..
          })
          .catch((e) => alert(`이미지 업로드에 실패하였습니다. Error Message: ${e}`));
      } else {
        alert(`이미지 포맷을 확인해주세요.업로드 된 파일 이름 ${files[0].name} / 포맷 ${format}`);
      }
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, []);

  // ---------------------------------------------------------------------------------------------------------

  return (
    <Wrapper>
      <CommentTopBar>
        <PostHeader>
          <Author>
            <Profile>
              {authedUserInfo.profileimg ? (
                <Image src={authedUserInfo.profileimg} alt="" layout="fill" priority />
              ) : (
                <Image src="/favicon.svg" alt="Logo" layout="fill" priority />
              )}
            </Profile>
            {authedUserInfo.nickname || 'ananymous'}
          </Author>
        </PostHeader>
      </CommentTopBar>
      <ToolbarContainer>
        <EditorTabs>
          {/* &nbsp; */}
          <EditorTabTool style={{ fontWeight: 'bold' }}>B</EditorTabTool>
          <EditorTabTool style={{ fontStyle: 'italic' }}>I</EditorTabTool>
          <EditorTabTool style={{ textDecorationLine: 'underline' }}>U</EditorTabTool>
        </EditorTabs>
        <EditorTabs>
          <EditorTabItem selected={tabIndex === 0} onClick={() => selectTab(0)}>
            마크다운
          </EditorTabItem>
          <EditorTabItem selected={tabIndex === 1} onClick={() => selectTab(1)}>
            미리보기
          </EditorTabItem>
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
            onDrop={handleDrop}
            onDragOver={dragOver}
            suppressContentEditableWarning
          >
            <div>
              <br />
            </div>
          </EditorTextBox>
        ) : (
          <PreviewTextBox ref={previewRef} />
        )}
        <input type="file" id="fileUpload" style={{ display: 'none' }} />
      </EditorContainer>
      <BottomButtonConatiner>
        <button type="button" onClick={submitHandler}>
          작성 완료
        </button>
      </BottomButtonConatiner>
    </Wrapper>
  );
}
