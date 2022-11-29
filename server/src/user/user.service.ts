import { Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile-dto';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UserRepository } from 'src/common/database/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(userid: string): Promise<UserProfileDto> {
    return this.userRepository.findOneProfile({ userid });
  }

  async updateUserProfile(
    userid: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<{
    userid: string;
    nickname: string;
    bio: string;
    profileImg: string;
  }> {
    const data = await this.userRepository.findOneAndUpdate(
      { userid: userid },
      userUpdateDto,
    );
    return Promise.resolve({
      userid: data.userid,
      nickname: data.nickname,
      bio: data.bio,
      profileImg: data.profileimg,
    });
  }

  async searchUser(keyword: string, next: string) {
    let result;
    if (next)
      result = await this.userRepository.searchUserWithNext(keyword, next);
    else
      result = await this.userRepository.searchUser(keyword);
    return {
      post: result,
      next: result.length < 2 ? '' : result.at(-1)._id,
    }
  }
  updateUserAvatar(userid: string, url: string) {
    return this.userRepository.findOneAndUpdate(
      {userid},
      {profileimg: url}
    )
  }
}
