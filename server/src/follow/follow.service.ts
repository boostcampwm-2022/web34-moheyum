import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/database/user.repository';
import { FollowRepository } from 'src/common/database/follow.repository';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';
import { UserService } from 'src/user/user.service';
import { NotificationRepository } from 'src/common/database/notification.repository';
import { EventService } from 'src/event/event.service';
import { FollowException } from 'src/common/exeception/follow.exception';
import { UserException } from 'src/common/exeception/user.exception';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly notificationRepository: NotificationRepository,
    private readonly eventService: EventService,
  ) {}

  async followUser(targetid: string, user: User) {
    const data = await this.userService.getUserData(targetid);
    if (targetid === user.userid) throw FollowException.followMyId();
    if (!data) throw UserException.userNotFound();

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
        this.eventService.emit(targetid, { data: true });
        return res;
      })
      .catch((err) => {
        if (err.status === 409) throw FollowException.followAlready();
        throw FollowException.followError();
      });
    return follow;
  }
  async followCancel(targetid: string, user: User) {
    const data = await this.userService.getUserData(targetid);
    if (targetid === user.userid) throw FollowException.followCancelMyId();
    if (!data) throw UserException.userNotFound();
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
        if (err.status === 404) throw FollowException.followCancelAlready();
        throw FollowException.followCancelError();
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
      ? this.followRepository.findFollowers({ targetid: targetid })
      : this.followRepository.findFollowersWithNext(
          { targetid: targetid },
          followListDTO,
        );
  }

  getFollowingList(targetid: string, followListDTO: FollowListDto) {
    return followListDTO.next === ''
      ? this.followRepository.findFollowing({ userid: targetid })
      : this.followRepository.findFollowingWithNext(
          { userid: targetid },
          followListDTO,
        );
  }
}
