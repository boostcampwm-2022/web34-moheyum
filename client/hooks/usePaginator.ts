import { useEffect, useState, useCallback, useRef } from 'react';
// original source code: https://www.youtube.com/watch?v=NZKUirTtxcg

export const NEXT = {
  START: 'START',
  END: '',
};

// export type NEXT = 'START' | 'END'

function getFetchUrlWidthNext(fetchUrl: string, next: string) {
  if (fetchUrl.includes('?')) return fetchUrl + `&next=${next}`;
  else return fetchUrl + `?next=${next}`;
}

function useFetchPage(fetchUrl: string, nextCursor: string) {
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
        setPages([...res.data.post]);
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

  return { loading, error, pages, next };
}

export default function usePaginator(url: string, nextStart: string = 'START') {
  const [nextCursor, setNextCursor] = useState(nextStart);
  const { loading, error, pages, next } = useFetchPage(url, nextCursor);

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
