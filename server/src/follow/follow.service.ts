import { Injectable } from '@nestjs/common';
import { Follow } from 'src/common/database/follow.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async followUser(targetid: string, user: User) {
    return this.followRepository.create(targetid, user);
  }
  async followCancel(targetid: string, user: User) {
    return this.followRepository.delete({
      userid: user.userid,
      targetid,
    });
  }
}
