import { Injectable } from '@nestjs/common';
import { NotificationRepository } from 'src/common/database/notification.repository';
import { User } from 'src/common/database/user.schema';

const pageSize = 2;

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findListByUserid(user: User, next: string) {
    let result;
    if (next)
      result = await this.notificationRepository.findManyWithNext(
        user.userid,
        pageSize,
        next,
      );
    else
      result = await this.notificationRepository.findMany(
        user.userid,
        pageSize,
      );
    return {
      post: result,
      next: result.length < pageSize ? '' : result.at(-1)._id,
    };
  }

  findNumberByUserid(user: User) {
    return this.notificationRepository.findCount(user.userid);
  }

  deleteOne(user: User, notif_id: string) {
    return this.notificationRepository.deleteOne(user.userid, notif_id);
  }

  deleteMany(user: User) {
    return this.notificationRepository.deleteMany(user.userid);
  }

  // _create(userid: string) {
  //   return this.notificationRepository.create(userid, "TEST NOTIFICATION", '/');
  // }

  // _createMass() {
  //   const userList = [
  //     'namhyo00', 'rkskekfk', 'poa9065', 'namhyo', 'namhyo01', 'namhyo02', 'namhyo03', 'namhyo04', 'namhyo05', 'namhyodd', 'namhyo07', 'dldnwo99'
  //   ];
  //   const docs = [];
  //   for (let i=0; i<500000; i++) {
  //     let idx = Math.floor( Math.random() * userList.length );
  //     docs.push({userid: userList[idx], message: "TEST BULK", url: "/"});
  //   }
  //   return this.notificationRepository.createMass(docs);
  // }
}
