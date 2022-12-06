import styled from '@emotion/styled';
import React from 'react';
import COLORS from '../../styles/color';
import { ToastMessage } from '../../types/Toast';

interface ToastProps {
  message: ToastMessage;
}

function ToastMessageInstance({ message }: ToastProps) {
  return <MessageWrapper>{message.message}</MessageWrapper>;
}

export default React.memo(ToastMessageInstance, (prev, next) => prev.message.key === next.message.key);

const MessageWrapper = styled.div`
  max-width: 40%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  margin: 10px 30px;
  color: ${COLORS.WHITE};
  text-align: center;

  transition: all 0.3s ease;
  animation: popIn 0.3s;
  @keyframes popIn {
    from {
      transform: translateY(500%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
