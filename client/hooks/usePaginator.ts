import { useEffect, useState, useCallback, useRef } from 'react';
// original source code: https://www.youtube.com/watch?v=NZKUirTtxcg

export const NEXT = {
  START: 'START',
  END: '',
};

// export type NEXT = 'START' | 'END'

function getFetchUrlWidthNext(fetchUrl: string, next: string) {
  if (fetchUrl.includes('?')) return `${fetchUrl}&next=${next}`;
  return `${fetchUrl}?next=${next}`;
}

function useFetchPage(fetchUrl: string, nextCursor: string, nextStart: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState<any>([]);
  const [next, setNext] = useState(NEXT.START);

  useEffect(() => {
    setPages([]);
  }, [fetchUrl]);

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);
    setError(false);
    let fetchUrlwithNext = fetchUrl;
    if (next === NEXT.START && nextCursor !== '' && nextCursor !== NEXT.START) {
      fetchUrlwithNext = getFetchUrlWidthNext(fetchUrl, nextCursor);
    } else if (next !== NEXT.START && next !== NEXT.END && nextCursor !== 'START') {
      fetchUrlwithNext = getFetchUrlWidthNext(fetchUrl, next);
    }
    fetch(`${fetchUrlwithNext}`, {
      signal: abortController.signal,
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.post === undefined)
          // 데이터 끝
          res.data = {
            post: [],
            next: NEXT.END,
          };
        if (nextStart === '') setPages((prevPages: any[]) => [...prevPages, ...res.data.post]);
        else setPages([...res.data.post]);
        setNext(res.data?.next ?? '');
        setLoading(false);
      })
      .catch(() => {
        if (abortController.signal.aborted) return;
        setError(true);
      });

    return () => {
      abortController.abort();
    };
  }, [fetchUrl, nextCursor]);

  return { loading, error, pages, next, setPages };
}

export default function usePaginator(url: string, nextStart: string = '') {
  const [nextCursor, setNextCursor] = useState(nextStart);
  const { loading, error, pages, next } = useFetchPage(url, nextCursor, nextStart);

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback(
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
  return { loading, error, pages, next, lastFollowElementRef };
}
