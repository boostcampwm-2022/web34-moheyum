import React, { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState, useCallback, DragEvent } from 'react';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';
import { authedUser } from '../../../atom';
import { httpPost, httpGet } from '../../../utils/http';
import renderMarkdown from '../../../utils/markdown';
import UserDropDown from './UserDropDown';
import { getLeftWidth } from '../../../styles/theme';
import ProfileImg from '../../ProfileImg';
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
  ToolbarContainer,
  Wrapper,
} from './index.style';

interface Props {
  postData: {
    _id?: string;
  };
}

interface followUser {
  userid: string;
  nickname: string;
  profileimg: string;
}

let allMentionList: followUser[] = [];

export default function Editor({ postData }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 Editor, 1 Preview
  const [content, setContent] = useState<string>('');
  const [dropDownDisplay, setDropDownDisplay] = useState<string>('none');
  const [dropDownPosition, setDropDownPosition] = useState<{ x: string; y: string }>({
    x: `${getLeftWidth(window.innerWidth) + 40}px`,
    y: '177.5px',
  });
  const [checkMentionActive, setCheckMentionActive] = useState<boolean>(false);
  const [mentionList, setMentionList] = useState<string[]>([]);
  const [followList, setFollowList] = useState<followUser[]>([]);
  const [inputUserId, setInputUserId] = useState<string>('');
  const [contentHTML, setContentHTML] = useState<string>('<div><br></div>'); // 탭 전환용
  const [selectUser, setSelectUser] = useState<number>(0);
  const authedUserInfo = useRecoilValue(authedUser);
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

    // 멘션 시작
    if (key === '@') {
      setCheckMentionActive(true);
      return;
    }

    // 멘션 모달 창 닫는 조건
    if (key === ' ' || key === 'Backspace') {
      if (checkMentionActive) {
        setCheckMentionActive(false);
        return;
      }
    }

    // 멘션 리스트 모달창 선택 대상 이동
    if (checkMentionActive && key === 'ArrowDown') {
      e.preventDefault();
      setSelectUser((prevState) => (prevState + 1 > followList.length - 1 ? 0 : prevState + 1));
      return;
    }
    if (checkMentionActive && key === 'ArrowUp') {
      e.preventDefault();
      setSelectUser((prevState) => (prevState - 1 < 0 ? followList.length - 1 : prevState - 1));
      return;
    }

    // 멘션 입력 완료, 멘션 active 종료
    if (checkMentionActive && key === 'Enter') {
      e.preventDefault();
      let word: string = '';
      if (followList.at(selectUser)) {
        const userId = followList.at(selectUser)?.userid;
        if (userId?.slice(inputUserId.length)) word = userId?.slice(inputUserId.length);
      }
      pasteAction(`${word} `);
      setCheckMentionActive(false);
      if (word) {
        setMentionList((prevState) => prevState.concat(word));
      }
      return;
    }

    // 멘션 키 active 상태일 때, 단어 입력하는 동안 발생하는 이벤트
    if (checkMentionActive && key.match(/^\w$/i)) {
      setInputUserId((prevState) => prevState + key);
      setSelectUser(0);
    } else if (key !== 'CapsLock' && key !== 'Shift') {
      setFollowList([]);
    }

    if (key !== 'CapsLock' && key !== 'Shift') {
      // 기능키 입력시 모달 이동 안함 (다른키 예외처리도 필요할 듯)
      moveModal(); // 기능키 제외 문자키 입력마다 모달창 위치 계속 갱신해줘야함
    }
  };

  const submitHandler = async () => {
    const removeDup = new Set(mentionList);
    const target = contentRef.current;
    if (!target) return;
    const result = await httpPost('/post', {
      author: 1,
      title: 'title',
      description: contentRef.current.innerText,
      parentPost: postData._id === '' ? null : postData._id,
      mentions: Array.from(removeDup),
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

  // 모달 위치 갱신
  const moveModal = useCallback(() => {
    const cursor = window.getSelection();
    if (cursor?.anchorNode?.nodeName !== '#text') return;
    const range = cursor?.getRangeAt(0);
    if (range) {
      const bounds = range.getBoundingClientRect();
      setDropDownPosition({ x: `${bounds.x + 20}px`, y: `${bounds.y + 5}px` });
    }
  }, []);

  const fetchMentionList = async () => {
    const response = await httpGet('/user/mentionlist');
    allMentionList = [...response.data];
  };

  // 처음 렌더 될때만 전체 멘션 리스트 가져옴
  useEffect(() => {
    fetchMentionList();
  }, []);

  // 사용자가 입력한 검색할 문자, 전체 mentionList에서 필터링
  useEffect(() => {
    if (inputUserId === '') {
      setFollowList([]);
      return;
    }
    const regex = new RegExp(`^${inputUserId}`, 'g');
    const filteredList = allMentionList.filter((user) => regex.test(user.userid) && user);
    setFollowList(filteredList.slice(0, 5));
  }, [inputUserId]);

  // 멘션 입력 시작,종료되었을 경우 (@키 누르면 멘션 시작, 종료: 엔터키로 입력 완료했거나, backspace 혹은 space 키로 취소했거나)
  useEffect(() => {
    if (!checkMentionActive) {
      setInputUserId('');
      setDropDownDisplay('none');
      setSelectUser(0);
    } else {
      setInputUserId('');
      moveModal();
      setFollowList(allMentionList.slice(0, 5));
      setDropDownDisplay('block');
      setSelectUser(0);
    }
  }, [checkMentionActive]);

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
            <ProfileImg imgUrl={authedUserInfo.profileimg} />
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
        {followList.length !== 0 && (
          <UserDropDown
            dropDownDisplay={dropDownDisplay}
            dropDownPosition={dropDownPosition}
            userList={followList}
            selectUser={selectUser}
          />
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
