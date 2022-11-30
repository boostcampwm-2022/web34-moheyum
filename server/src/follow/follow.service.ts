import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/database/user.repository';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';
import { UserService } from 'src/user/user.service';
import { NotificationRepository } from 'src/common/database/notification.repository';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async followUser(targetid: string, user: User) {
    const data = await this.userService.getUserData(targetid);
    if (targetid === user.userid)
      throw new BadRequestException({
        message: '자기 자신은 팔로우 할 수 없습니다',
      });
    if (!data)
      throw new BadRequestException({
        message: '존재하지 않는 사용자 입니다',
      });

    const follow = this.followRepository
      .create(targetid, user)
      .then((res) => {
        this.userRepository.updateFollowingCount({ userid: user.userid }, 1);
        this.userRepository.updateFollowerCount({ userid: targetid }, 1);
        this.notificationRepository.create(
          targetid,
          `${user.nickname}(${user.userid})님이 팔로우하였습니다.`,
          `/${user.userid}`,
        );
        return res;
      })
      .catch((err) => {
        if (err.status === 409)
          throw new BadRequestException({
            message: '이미 팔로우 된 사용자입니다',
          });
        throw new BadRequestException({
          message: '팔로우 실패. 요청 값 확인 바람',
        });
      });
    return follow;
  }
  async followCancel(targetid: string, user: User) {
    const data = await this.userService.getUserData(targetid);
    if (targetid === user.userid)
      throw new BadRequestException({
        message: '자기 자신은 팔로우 취소 할 수 없습니다',
      });
    if (!data)
      throw new BadRequestException({
        message: '존재하지 않는 사용자 입니다',
      });
    const cancel = this.followRepository
      .delete({
        userid: user.userid,
        targetid,
      })
      .then((res) => {
        this.userRepository.updateFollowingCount({ userid: user.userid }, -1);
        this.userRepository.updateFollowerCount({ userid: targetid }, -1);
        return res;
      })
      .catch((err) => {
        if (err.status === 404)
          throw new BadRequestException({
            message: '팔로우가 되어 있지 않는 사용자입니다',
          });
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
