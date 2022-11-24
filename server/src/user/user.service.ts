import { Injectable } from '@nestjs/common';
import { User } from 'src/common/database/user.schema';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UserRepository } from 'src/common/database/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(userid: string): Promise<{
    userid: string;
    nickname: string;
    email: string;
    bio: string;
    profileimg: string;
  }> {
    const data = await this.userRepository.findOne({ userid });
    return Promise.resolve({
      userid: data.userid,
      nickname: data.nickname,
      email: data.email,
      bio: data.bio,
      profileimg: data.profileimg,
    });
  }

  async updateUserProfile(
    userid: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<{
    userId: string;
    nickName: string;
    bio: string;
    profileImg: string;
  }> {
    const data = await this.userRepository.findOneAndUpdate(
      { userid: userid },
      userUpdateDto,
    );
    return Promise.resolve({
      userId: data.userid,
      nickName: data.nickname,
      bio: data.bio,
      profileImg: data.profileimg,
    });
  }
}
