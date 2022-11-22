import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  HttpCode,
  Post,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowCreateDto } from './dto/follow-create-dto';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}
  @HttpCode(200)
  @Post('/:userid/following/:targetid')
  async followUser(
    @Param('userid') userid: string,
    @Param('targetid') targetid: string,
  ) {
    return {
      message: 'success',
      data: await this.followService.followUser(userid, targetid),
    };
  }
}
