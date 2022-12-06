import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toastMessageList } from '../../atom';
import ToastMessageInstance from './ToastMessage';

export default function ToastController() {
  const [messageList, setMessageList] = useRecoilState(toastMessageList);

  useEffect(() => {
    if (messageList.length === 0) return undefined;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      closeToast();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [messageList]);

  const closeToast = () => {
    const newList = messageList.slice(1);
    setMessageList(newList);
  };

  return (
    <ToastMessageContainer>
      {messageList.map((msg) => (
        <ToastMessageInstance message={msg} key={msg.key} />
      ))}
    </ToastMessageContainer>
  );
}

const ToastMessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  padding: 20px;
  pointer-events: none;
`;
