import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/database/user.repository';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
  ) {}

  followUser(targetid: string, user: User) {
    const follow = this.followRepository.create(targetid, user);
    this.userRepository.updateFollowingCount({ userid: user.userid }, 1);
    this.userRepository.updateFollowerCount({ userid: targetid }, 1);
    return follow;
  }
  followCancel(targetid: string, user: User) {
    const cancel = this.followRepository.delete({
      userid: user.userid,
      targetid,
    });
    this.userRepository.updateFollowingCount({ userid: user.userid }, -1);
    this.userRepository.updateFollowerCount({ userid: targetid }, -1);
    return cancel;
  }

  followCheck(targetid: string, user: User) {
    return this.followRepository.check({
      userid: user.userid,
      targetid,
    });
  }

  getFollowerList(user: User, page: number) {
    return this.followRepository.findFollowers({ targetid: user.userid }, page);
  }

  getFollowingList(user: User, page: number) {
    return this.followRepository.findFollowing({ userid: user.userid }, page);
  }
}
