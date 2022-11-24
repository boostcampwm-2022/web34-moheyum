import React, { useCallback, useRef, useState } from 'react'
import { ArticleCard } from '../../Main/Articlecard'
import { PostLabel, SectionDivider } from './index.style';
import { Props } from '../../../pages/user/[userid]'
import paginator, {NEXT} from '../../../utils/paginator';

export default function PostList({ userData }: {userData: Props}) {

  const [nextCursor, setNextCursor] = useState("START") 

  const {
    loading,
    error,
    pages,
    next,
  } = paginator(`/api/post/author/${userData.userid}`, nextCursor)

  const observer = useRef<any>();
  const lastFollowElementRef = useCallback( (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && next !== NEXT.END) {
        setNextCursor(next);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, next !== NEXT.END]);

  return (
    <>
    <PostLabel>
      게시글
    </PostLabel>
    <SectionDivider />
    {
      pages.map((item: any, index:number) => {
        if (pages.length === index + 1)
          return <ArticleCard
            author={item.author}
            key={item._id}
            id={item._id}
            description={item.description}
            title={item.title}
            ref={lastFollowElementRef}
          />
        return <ArticleCard
          author={item.author}
          key={item._id}
          id={item._id}
          description={item.description}
          title={item.title}
        />
      })
    }
    {/* <ArticlesSection> */}
        {/* {Array.isArray(newsfeedList) &&
          newsfeedList.map((item) => (
            <ArticleCard
              author={item.author}
              key={item._id}
              id={item._id}
              description={item.description}
              title={item.title}
            />
          ))} */}
      {/* </ArticlesSection> */}
    </>
  )
}


let _i = 0;
const newsfeedList = [
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
  {
    author: 'rkskekfk',
    key: String(++_i),
    _id: String(_i),
    description: "끼얏호우동해물과백두산이마르고닳도록하느님이보우하사우리나라만세".repeat(10),
    title: "제목제제제목제제제제제목"
  },
]