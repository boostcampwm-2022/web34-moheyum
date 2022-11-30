import Router from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { ButtonBack, TopBar } from '../../styles/common';
import Paginator, { NEXT } from '../../utils/paginator';
import { ExceptionPage, NotificationContainer, Wrapper } from './index.style';
import { NotificationCard } from './NotificationCard';

export default function Notification() {
  const goBack = () => {
    Router.back();
  };
  const [nextCursor, setNextCursor] = useState('START');
  const { loading, error, pages, next } = Paginator(`/api/notification/list/`, nextCursor);
  const observer = useRef<any>();
  const lastNotificationElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next !== NEXT.END) {
          setNextCursor(next);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, next !== NEXT.END]
  );
  return (
    <Wrapper>
      <TopBar>
        <div>
          <div>
            <ButtonBack type="button" onClick={goBack} />
          </div>
          <h1>알림</h1>
        </div>
      </TopBar>
      <NotificationContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <NotificationCard
                url={item.url}
                message={item.message}
                createdAt={item.createdAt}
                ref={lastNotificationElementRef}
              />
            );
          return (
            <NotificationCard url={item.url} message={item.message} createdAt={item.createdAt} />
          );
        })}
        {loading && <ExceptionPage>Loading</ExceptionPage>}
        {error && <ExceptionPage>error</ExceptionPage>}
      </NotificationContainer>
    </Wrapper>
  );
}
