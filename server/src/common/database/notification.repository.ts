import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { Model } from 'mongoose';
import { NotificationListDto } from 'src/notification/dto/notification-list.dto';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(userid: string, message: string, url: string) {
    const newNotif = new this.notificationModel({
      userid,
      message,
      url,
    });
    try {
      return await newNotif.save();
    } catch (error) {
      // if (error.code === 11000) throw new ConflictException();
      // else {
      //   console.error(error);
      //   throw new InternalServerErrorException();
      // }
    }
  }

  // async createMass(docs) {
  //   try {
  //     this.notificationModel.insertMany(docs);
  //   } catch(e) {
  //     console.error(e);
  //   }
  // }

  findMany(userid: string, notificationListDto: NotificationListDto) {
    return this.notificationModel
      .find({ userid })
      .sort({ _id: -1 })
      .limit(notificationListDto.limit);
  }

  findManyWithNext(userid: string, notificationListDto: NotificationListDto) {
    return this.notificationModel
      .find({ userid, _id: { $lt: notificationListDto.next } })
      .sort({ _id: -1 })
      .limit(notificationListDto.limit);
  }

  findCount(userid: string) {
    return this.notificationModel.count({ userid });
  }

  deleteOne(userid: string, _id: string) {
    return this.notificationModel.deleteOne({ userid, _id });
  }

  deleteMany(userid: string) {
    return this.notificationModel.deleteMany({ userid });
  }
}
