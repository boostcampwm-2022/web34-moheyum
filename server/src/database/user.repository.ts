import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, FilterQuery } from 'mongoose';
import { UserCreateDto } from '../domain/auth/dto/user-create.dto';
import { UserException } from '../exeception/user.exception';
import { SearchUserListDto } from 'src/domain/user/dto/search-user-list.dto';
import { SEARCH_USER_LIMIT } from '../constants/pagination.constants';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const { userid, nickname, email, password, profileimg, bio } =
      userCreateDto;

    const newUser = new this.userModel({
      userid,
      nickname,
      email,
      password,
      profileimg,
      bio,
    });
    try {
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        if (!!error.keyValue.userid) throw UserException.userDuplicateId();
        else if (!!error.keyValue.nickname)
          throw UserException.userDuplicateNickname();
        else if (!!error.keyValue.email)
          throw UserException.userDuplicateEmail();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ) {
    const result = this.userModel.findOneAndUpdate(
      userFilterQuery,
      {
        $set: user,
      },
      { new: true },
    );
    if (!result) throw UserException.userNotFound();
    return result;
  }

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne(userFilterQuery);
    if (!user) throw UserException.userNotFound();
    return user;
  }

  async findOneProfile(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery, { password: 0 });
  }

  async findOneAndUpdatePW(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    const result = await this.userModel.findOneAndUpdate(userFilterQuery, user);
    if (!result) throw UserException.userNotFound();
    return result;
  }

  // post 감소, 증가 둘다 이 함수 사용
  async updatePostCount(userFilterQuery: FilterQuery<User>, postCount: number) {
    const result = this.userModel.findOneAndUpdate(
      userFilterQuery,
      {
        $inc: { postcount: postCount },
      },
      { new: true },
    );
    if (!result) throw UserException.userNotFound();
    return result;
  }

  async updateFollowerCount(
    userFilterQuery: FilterQuery<User>,
    followerCount: number,
  ) {
    const result = this.userModel.findOneAndUpdate(
      userFilterQuery,
      {
        $inc: { follower: followerCount },
      },
      { new: true },
    );
    if (!result) throw UserException.userNotFound();
    return result;
  }

  async updateFollowingCount(
    userFilterQuery: FilterQuery<User>,
    followingCount: number,
  ) {
    const result = this.userModel.findOneAndUpdate(
      userFilterQuery,
      {
        $inc: { following: followingCount },
      },
      { new: true },
    );
    if (!result) throw UserException.userNotFound();
    return result;
  }

  searchUserWithNext(searchUserListDto: SearchUserListDto) {
    return this.userModel
      .find(
        {
          state: true,
          _id: { $gt: searchUserListDto.next },
          $or: [
            { userid: { $regex: `^${searchUserListDto.keyword}` } },
            { nickname: { $regex: `^${searchUserListDto.keyword}` } },
          ],
        },
        { userid: 1, nickname: 1, profileimg: 1 },
      )
      .sort({ _id: 1 })
      .limit(SEARCH_USER_LIMIT);
  }

  searchUser(searchUserListDto: SearchUserListDto) {
    return this.userModel
      .find(
        {
          state: true,
          $or: [
            { userid: { $regex: `^${searchUserListDto.keyword}` } },
            { nickname: { $regex: `^${searchUserListDto.keyword}` } },
          ],
        },
        { userid: 1, nickname: 1, profileimg: 1 },
      )
      .sort({ _id: 1 })
      .limit(SEARCH_USER_LIMIT);
  }

  searchUsersForSuggestion(userList: string[]) {
    return this.userModel
      .find(
        { userid: { $in: userList }, state: true },
        { _id: 0, userid: 1, nickname: 1, profileimg: 1 },
      )
      .lean();
  }
}
