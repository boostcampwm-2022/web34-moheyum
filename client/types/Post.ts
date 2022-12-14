interface AuthorDetail {
  nickname: string;
  profileimg: string;
}
export interface Parent {
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
  parent: Parent[];
}

export interface UserPostProps {
  userid: string;
  nickname: string;
  email: string;
  bio: string;
  profileimg: string;
  state: boolean;
  following: number;
  follower: number;
  postcount: number;
}
