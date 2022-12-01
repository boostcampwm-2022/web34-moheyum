import { useCallback, useRef, useState } from 'react';
import Paginator, { NEXT } from '../../utils/paginator';
import { ExceptionPage, NotificationContainer, TopBar, Wrapper } from './index.style';
import { NotificationCard } from './NotificationCard';

export default function Notification() {
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
        <h1>알림</h1>
      </TopBar>
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
