import {
  UseGuards,
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
  CacheTTL,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';
import { MoheyumInterceptor } from 'src/cache/cache.interceptor';
import { CacheEvict } from 'src/cache/cache-evict.decorator';
import { CacheIndividual } from 'src/cache/cahce-individual.decorator';
import { CachePagination } from 'src/cache/cache-next-ttl.decorator';

@Controller('follow')
@UseInterceptors(MoheyumInterceptor)
export class FollowController {
  constructor(private followService: FollowService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheEvict('', 'checkFollow', 'deleteMyID', 'deleteFollowID')
  @CacheIndividual('userid')
  @Post('/following/:targetid')
  async followUser(@Param('targetid') targetid: string, @GetUser() user: User) {
    return {
      followCount: await this.followService.followUser(targetid, user),
    };
  }

  @Get('/following/:targetid')
  @UseGuards(JwtAuthGuard)
  @CacheIndividual('checkFollow')
  @CacheTTL(30 * 60)
  @Get('/following/:targetid')
  async followCheck(
    @Param('targetid') targetid: string,
    @GetUser() user: User,
  ) {
    return {
      isFollow: await this.followService.followCheck(targetid, user),
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheEvict('', 'checkFollow', 'deleteFollowID', 'deleteMyID')
  @CacheIndividual('userid')
  @Delete('/following/:targetid')
  async followCancel(
    @Param('targetid') targetid: string,
    @GetUser() user: User,
  ) {
    return {
      followCancel: await this.followService.followCancel(targetid, user),
    };
  }

  @CachePagination(true)
  @CacheTTL(10)
  @Get('/list/follower/:targetid')
  async targetFollowerList(
    @Query() followListDTO: FollowListDto,
    @Param('targetid') targetid: string,
  ) {
    const list = await this.followService.getFollowerList(
      targetid,
      followListDTO,
    );
    return list;
  }

  @CachePagination(true)
  @CacheTTL(10)
  @Get('/list/following/:targetid')
  async targetFollowingList(
    @Query() followListDTO: FollowListDto,
    @Param('targetid') targetid: string,
  ) {
    const list = await this.followService.getFollowingList(
      targetid,
      followListDTO,
    );
    return list;
  }
}
