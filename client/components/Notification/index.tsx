import { useCallback, useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import Paginator, { NEXT } from '../../utils/paginator';
import { ExceptionPage, NotificationContainer, TopBar, Wrapper, NewNoti } from './index.style';
import { NotificationCard } from './NotificationCard';

export default function Notification() {
  const [nextCursor, setNextCursor] = useState('START');
  let { loading, error, pages, next } = Paginator(`/api/notification/list/`, nextCursor);
  const [newNoti, setNewNoti] = useState<boolean>(false);
  const observer = useRef<any>();
  const updateNotification = () => {
    Router.reload();
  };
  useEffect(() => {
    const eventSource = new EventSource('/api/alarm');
    eventSource.onmessage = (event) => {
      setNewNoti(event.data);
    };
    eventSource.onerror = (error) => {
      console.error('SSE error', error);
    };
    return () => eventSource.close();
  });
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
        <h1>알림</h1>
      </TopBar>
      {newNoti && (
        <NewNoti onClick={updateNotification}>
          <div>새 소식</div>
        </NewNoti>
      )}
      <NotificationContainer>
        {pages.map((item: any, index: number) => {
          if (pages.length === index + 1)
            return (
              <NotificationCard
                url={item.url}
                message={item.message}
                createdAt={item.createdAt}
                key={item._id}
                ref={lastNotificationElementRef}
              />
            );
          return <NotificationCard url={item.url} message={item.message} createdAt={item.createdAt} key={item._id} />;
        })}
        {loading && <ExceptionPage>Loading</ExceptionPage>}
        {error && <ExceptionPage>error</ExceptionPage>}
      </NotificationContainer>
    </Wrapper>
  );
}
