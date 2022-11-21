import { Injectable } from '@nestjs/common';
import { User } from 'src/common/database/user.schema';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UserRepository } from 'src/common/database/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(
    userid: string,
  ): Promise<{ userId: string; nickName: string; Email: string }> {
    const data = await this.userRepository.findOne({ userid });
    return Promise.resolve({
      userId: data.userid,
      nickName: data.nickname,
      Email: data.email,
    });
  }

  updateUserProfile(
    userid: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { userid: userid },
      userUpdateDto,
    );
  }
}
