import {
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheEvict } from 'src/cache/cache-evict.decorator';
import { CachePagination } from 'src/cache/cache-next-ttl.decorator';
import { MoheyumInterceptor } from 'src/cache/cache.interceptor';
import { CacheIndividual } from 'src/cache/cahce-individual.decorator';
import { User } from 'src/database/user.schema';
import { GetUser } from 'src/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { NotificationListDto } from './dto/notification-list.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
@UseInterceptors(MoheyumInterceptor)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  @CacheIndividual('notification')
  @CachePagination(true)
  async notificationList(
    @GetUser() user: User,
    @Query() notificationListDto: NotificationListDto,
  ) {
    return await this.notificationService.findListByUserid(
      user,
      notificationListDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @CacheTTL(30 * 60)
  @CacheIndividual('notificationCount')
  @Get('/count')
  async notificationCount(@GetUser() user: User) {
    return await this.notificationService.findNumberByUserid(user);
  }

  @UseGuards(JwtAuthGuard)
  @CacheIndividual('notificationCount')
  @CacheEvict('/api/notification/count')
  @Delete('/id/:notifId')
  async notificationDeleteOne(
    @Param('notifId') notifId: string,
    @GetUser() user: User,
  ) {
    return await this.notificationService.deleteOne(user, notifId);
  }

  @UseGuards(JwtAuthGuard)
  @CacheIndividual('notificationCount')
  @CacheEvict('/api/notification/count')
  @Delete('/list')
  async notificationDeleteAll(@GetUser() user: User) {
    return await this.notificationService.deleteMany(user);
  }

  // @Post('/test')
  // @UseGuards(JwtAuthGuard)
  // _notifCreateForTest(@GetUser() user: User) {
  //   return this.notificationService._create(user.userid);
  // }

  // @Post('/mass-test')
  // async _notifMassCreateForTest() {
  //   return this.notificationService._createMass();
  // }
}
