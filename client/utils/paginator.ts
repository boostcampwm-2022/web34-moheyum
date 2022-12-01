import { useEffect, useState } from 'react';
// original source code: https://www.youtube.com/watch?v=NZKUirTtxcg

export const NEXT = {
  START: 'START',
  END: '',
};

// export type NEXT = 'START' | 'END'

export default function Paginator(fetchUrl: string, nextCursor: string) {
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
    if (next !== NEXT.START && next !== NEXT.END && nextCursor !== 'START') {
      if (fetchUrlwithNext.includes('?')) fetchUrlwithNext += `&next=${next}`;
      else fetchUrlwithNext += `?next=${next}`;
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
        setPages((prevPages: any[]) => [...prevPages, ...res.data.post]);
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
