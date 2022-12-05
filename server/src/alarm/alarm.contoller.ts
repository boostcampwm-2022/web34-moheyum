import { Controller, Post, Request, Sse, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { AlarmService } from './alarm.service';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @UseGuards(JwtAuthGuard)
  @Sse()
  subscribe(@GetUser() user) {
    return this.alarmService.subscribe(user.userid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('emit')
  async emit(@GetUser() user) {
    await this.alarmService.emit(user.userid, true);
  }
}
