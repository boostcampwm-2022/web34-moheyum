import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Request,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/database/user.schema';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async notificationList(@GetUser() user: User, @Query('next') next: string) {
    return {
      message: 'success',
      data: await this.notificationService.findListByUserid(user, next),
    };
  }

  @Get('/count')
  @UseGuards(JwtAuthGuard)
  async notificationCount(@GetUser() user: User) {
    return {
      message: 'success',
      data: await this.notificationService.findNumberByUserid(user),
    };
  }

  @Delete('/id/:notifId')
  @UseGuards(JwtAuthGuard)
  async notificationDeleteOne(
    @Param('notifId') notifId: string,
    @GetUser() user: User,
  ) {
    return {
      message: 'success',
      data: await this.notificationService.deleteOne(user, notifId),
    };
  }

  @Delete('/list')
  @UseGuards(JwtAuthGuard)
  async notificationDeleteAll(@GetUser() user: User) {
    return {
      message: 'success',
      data: await this.notificationService.deleteMany(user),
    };
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
