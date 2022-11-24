import {
  UseGuards,
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';

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

  @Get('/list/follower/:targetid')
  async targetFollowerList(
    @Query() followListDTO: FollowListDto,
    @Param('targetid') targetid: string,
  ) {
    const list = await this.followService.getFollowerList(
      targetid,
      followListDTO,
    );
    return {
      message: 'success',
      data: list,
    };
  }

  @Get('/list/following/:targetid')
  async targetFollowingList(
    @Query() followListDTO: FollowListDto,
    @Param('targetid') targetid: string,
  ) {
    const list = await this.followService.getFollowingList(
      targetid,
      followListDTO,
    );
    return {
      message: 'success',
      data: list,
    };
  }
}
