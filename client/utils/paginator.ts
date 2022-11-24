import { useEffect, useState } from 'react'
//original source code: https://www.youtube.com/watch?v=NZKUirTtxcg

export enum NEXT {
  START="START",
  END="",
}

export default function paginator(fetchUrl: string, nextCursor: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState<any>([]);
  const [next, setNext] = useState(NEXT.START);
  
  useEffect(() => {
    setPages([]);
  }, [fetchUrl]);
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    let fetchUrlwithNext = fetchUrl;
    if (next !== NEXT.START && next !== NEXT.END)
      fetchUrlwithNext += `?next=${next}`;
    fetch(`${fetchUrlwithNext}`, {
      method: 'GET',
      credentials: "include"
    }).then(res => res.json()).then(res => {
      if (res.data?.post === undefined) //데이터 끝
        res.data = {
          post: [],
          next: NEXT.END
        }
      setPages((prevPages: any[]) => {
        return [...new Set([...prevPages, ...res.data.post])];
      });
      setNext(res.data?.next ?? "");
      setLoading(false);
    }).catch(e => {
      setError(true)
    })
  }, [fetchUrl, nextCursor]);
  
  return { loading, error, pages, next}
}
