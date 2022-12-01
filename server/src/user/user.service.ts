import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserRepository } from 'src/common/database/user.repository';
import { FollowRepository } from 'src/common/database/follow.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { GetUserUpdatePasswordDto } from './dto/get-update-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
    private readonly configService: ConfigService,
  ) {}

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

  async getMentionList(userid: string): Promise<
    {
      userid: string;
      nickname: string;
      profileimg: string;
    }[]
  > {
    const data = await this.followRepository.findUserToMention(userid);
    return await this.userRepository.searchUsersForSuggestion(data);
  }

  async searchUser(keyword: string, next: string) {
    let result;
    if (next)
      result = await this.userRepository.searchUserWithNext(keyword, next);
    else result = await this.userRepository.searchUser(keyword);
    return {
      post: result,
      next: result.length < 2 ? '' : result.at(-1)._id,
    };
  }
  updateUserAvatar(userid: string, url: string) {
    return this.userRepository.findOneAndUpdate(
      { userid },
      { profileimg: url },
    );
  }

  private hashPw(pw: string): Promise<string> {
    return bcrypt.hash(pw, +this.configService.get('saltOrRounds'));
  }

  private async checkPw(userid: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ userid });
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    throw new BadRequestException({
      message: '패스워드 오류',
    });
  }

  async changePassword(
    userid: string,
    getUserUpdatePasswordDto: GetUserUpdatePasswordDto,
  ) {
    await this.checkPw(userid, getUserUpdatePasswordDto.prevPassword);
    const hashPw = await this.hashPw(getUserUpdatePasswordDto.newPassword);
    return this.userRepository.findOneAndUpdatePW(
      { userid: userid },
      { password: hashPw },
    );
  }

  deleteUserWithState(userid: string) {
    return this.userRepository.findOneAndUpdate(
      { userid: userid },
      { state: false },
    );
  }
}
