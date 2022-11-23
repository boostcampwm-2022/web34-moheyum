import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../database/user.schema';
import { Model, FilterQuery } from 'mongoose';
import { UserCreateDto } from '../../auth/dto/user-create.dto';
import { UserUpdateDto } from 'src/user/dto/user-Update-dto';

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
      if (error.code === 11000) throw new ConflictException();
      else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    userUpdateDto: UserUpdateDto,
  ) {
    const result = this.userModel.findOneAndUpdate(
      userFilterQuery,
      {
        $set: userUpdateDto,
      },
      { new: true },
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }
}
