import { Injectable } from '@nestjs/common';
import { Follow } from 'src/common/database/follow.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  followUser(targetid: string, user: User) {
    return this.followRepository.create(targetid, user);
  }
  followCancel(targetid: string, user: User) {
    return this.followRepository.delete({
      userid: user.userid,
      targetid,
    });
  }

  getFollowerList(user: User) {
    return this.followRepository.findFollowers({ targetid: user.userid });
  }

  getFollowingList(user: User) {
    return this.followRepository.findFollowing({ userid: user.userid });
  }
}
