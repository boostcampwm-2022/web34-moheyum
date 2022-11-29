interface AuthorDetail {
  nickname: string;
  profileimg: string;
}
interface Parent {
  _id: string;
  description: string;
  author: string;
  createdAt: string;
  childPosts: number;
  authorDetail: AuthorDetail;
}
export default interface PostProps {
  _id: string;
  description: string;
  author: string;
  createdAt: string;
  parentPost: string;
  childPosts: [];
  authorDetail: AuthorDetail;
  parent: Parent;
}
