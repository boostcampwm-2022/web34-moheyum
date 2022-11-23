import { atom, RecoilState } from 'recoil';

interface newsfeedType {
  _id: string;
  title: string;
  description: string;
  author: string;
}
export const newsfeedState = atom({
  key: 'newsfeed',
  default: [] as newsfeedType[],
});

interface AuthedUser {
  logined: boolean;
  userid: string;
  profileimg: string;
  nickname: string;
}

export const defaultAuthedUser: AuthedUser = {
  logined: false,
  userid: "",
  profileimg: "/default-profile.png",
  nickname: ""
}

export const authedUser = atom<AuthedUser>({
  key: "authedUser",
  default: defaultAuthedUser
})

