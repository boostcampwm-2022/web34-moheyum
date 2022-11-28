import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema'
import mongoose, { Model, FilterQuery } from 'mongoose';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(userid: string, message: string, url: string) {
    const newNotif = new this.notificationModel({
      userid,
      message,
      url
    });
    try {
      return await newNotif.save();
    } catch (error) {
      if (error.code === 11000) throw new ConflictException();
      else {
        console.error(error);
        throw new InternalServerErrorException;
      }
    }
  }
  
  findMany(userid: string) {
    //TODO: 페이지네이션
    return this.notificationModel.find({userid});
  }

  findCount(userid: string) {
    return this.notificationModel.count({userid});
  }

  deleteOne(userid:string, _id: string) {
    return this.notificationModel.deleteOne({userid, _id});
  }
  
  deleteMany(userid: string){
    return this.notificationModel.deleteMany({userid});
  }
}
