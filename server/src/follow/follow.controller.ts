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
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';
import { FollowListDto } from './dto/follow-list.dto';
import { MoheyumInterceptor } from 'src/common/cache/cache.interceptor';
import { CacheEvict } from 'src/common/cache/cache-evict.decorator';
import { CacheIndividual } from 'src/common/cache/cahce-individual.decorator';
import { CachePagination } from 'src/common/cache/cache-next-ttl.decorator';

@Controller('follow')
@UseInterceptors(MoheyumInterceptor)
export class FollowController {
  constructor(private followService: FollowService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheEvict('', 'checkFollow')
  @CacheIndividual('userid')
  @Post('/following/:targetid')
  async followUser(@Param('targetid') targetid: string, @GetUser() user: User) {
    return {
      followCount: await this.followService.followUser(targetid, user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @CacheIndividual('checkFollow')
  @CacheTTL(30 * 60)
  @Get('/check/:targetid')
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
  @CacheEvict('', 'checkFollow')
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
  @CacheTTL(300)
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
  @CacheTTL(300)
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
