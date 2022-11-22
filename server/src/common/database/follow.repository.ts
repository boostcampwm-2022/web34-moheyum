import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './follow.schema';
import { Model, FilterQuery } from 'mongoose';
import { FollowCreateDto } from 'src/follow/dto/follow-create-dto';

@Injectable()
export class FollowRepository {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}
  create(followCreateDto: FollowCreateDto): Promise<Follow> {
    const { userid, targetid } = followCreateDto;
    const newFollow = new this.followModel({
      userid,
      targetid,
    });
    try {
      return newFollow.save();
    } catch (error) {
      if (error.code === 11000) throw new ConflictException();
      else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
