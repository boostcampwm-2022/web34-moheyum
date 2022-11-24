import { Injectable } from '@nestjs/common';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';

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

  getFollowerList(targetid: string, followListDTO: FollowListDto) {
    return followListDTO.next === ''
      ? this.followRepository.findFollowers(
          { targetid: targetid },
          followListDTO,
        )
      : this.followRepository.findFollowersWithNext(
          { targetid: targetid },
          followListDTO,
        );
  }

  getFollowingList(targetid: string, followListDTO: FollowListDto) {
    return followListDTO.next === ''
      ? this.followRepository.findFollowing({ userid: targetid }, followListDTO)
      : this.followRepository.findFollowingWithNext(
          { userid: targetid },
          followListDTO,
        );
  }
}
