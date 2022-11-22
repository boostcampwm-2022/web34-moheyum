import {
  UseGuards,
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Post,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}
  @HttpCode(200)
  @Post('/following/:targetid')
  @UseGuards(JwtAuthGuard)
  async followUser(@Param('targetid') targetid: string, @GetUser() user: User) {
    return {
      message: 'success',
      data: {
        followCount: await this.followService.followUser(targetid, user),
      },
    };
  }

  @HttpCode(200)
  @Delete('/following/:targetid')
  @UseGuards(JwtAuthGuard)
  async followCancel(
    @Param('targetid') targetid: string,
    @GetUser() user: User,
  ) {
    return {
      message: 'success',
      data: {
        followCancel: await this.followService.followCancel(targetid, user),
      },
    };
  }

  @HttpCode(200)
  @Get('/list/follower')
  @UseGuards(JwtAuthGuard)
  async followerList(@GetUser() user: User) {
    const list = await this.followService.getFollowerList(user);
    console.log(list);
    return {
      message: 'success',
      data: list,
    };
  }
}
