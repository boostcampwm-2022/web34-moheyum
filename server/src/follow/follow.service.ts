import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from 'src/common/database/user.repository';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
  ) {}

  followUser(targetid: string, user: User) {
    const follow = this.followRepository
      .create(targetid, user)
      .then(() => {
        this.userRepository.updateFollowingCount({ userid: user.userid }, 1);
        this.userRepository.updateFollowerCount({ userid: targetid }, 1);
      })
      .catch((err) => {
        console.error(err);
        throw new BadRequestException({
          message: '팔로우 실패. 요청 값 확인 바람',
        });
      });
    return follow;
  }
  followCancel(targetid: string, user: User) {
    const cancel = this.followRepository
      .delete({
        userid: user.userid,
        targetid,
      })
      .then(() => {
        this.userRepository.updateFollowingCount({ userid: user.userid }, -1);
        this.userRepository.updateFollowerCount({ userid: targetid }, -1);
      })
      .catch((err) => {
        console.error(err);
        throw new BadRequestException({
          message: '팔로우 취소 실패. 요청 값 확인 바람',
        });
      });
    return cancel;
  }

  followCheck(targetid: string, user: User) {
    return this.followRepository.check({
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
