import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.shema';
import { Model, FilterQuery } from 'mongoose';
import { SignUpDTO } from './dto/signUp.dto';
@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }
  async createSignUp(signUpDTO: SignUpDTO): Promise<User> {
    const createdUser = new this.userModel(signUpDTO);
    return createdUser.save();
  }
}
