import Router from 'next/router';
import React from 'react';
import { calcTime } from '../../../utils/calctime';
import { httpDelete } from '../../../utils/http';
import useToast from '../../../hooks/useToast';
import { Container, Message, NotificationAt } from './index.style';

interface NotificationData {
  url: string;
  message: string;
  createdAt: string;
  notifId: string;
}
export const NotificationCard = React.forwardRef<HTMLInputElement, NotificationData>(
  ({ notifId, url, message, createdAt }: NotificationData, ref) => {
    const toast = useToast();
    const routeHandler = async () => {
      const response = await httpDelete(`/notification/id/${notifId}`);
      if (response.statusCode !== 200) {
        toast.addMessage('해당 알림 내용이 존재하지 않습니다.');
        return;
      }
      Router.push(url);
    };
    return (
      <Container ref={ref} onClick={routeHandler}>
        <Message>{message}</Message>
        <NotificationAt>{calcTime(createdAt)}</NotificationAt>
      </Container>
    );
  }
);
