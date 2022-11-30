import Link from 'next/link';
import React from 'react';
import { calcTime } from '../../../utils/calctime';
import { Container, Message, NotificationAt } from './index.style';

interface NotificationData {
  url: string;
  message: string;
  createdAt: string;
}
export const NotificationCard = React.forwardRef<HTMLInputElement, NotificationData>(
  ({ url, message, createdAt }: NotificationData, ref) => (
    <div ref={ref}>
      <Link href={url}>
        <Container>
          <Message>{message}</Message>
          <NotificationAt>{calcTime(createdAt)}</NotificationAt>
        </Container>
      </Link>
    </div>
  )
);
