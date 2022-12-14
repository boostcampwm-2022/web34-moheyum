import { Controller, Post, Sse, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly alarmService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Sse()
  subscribe(@GetUser() user) {
    return this.alarmService.subscribe(user.userid);
  }

  @UseGuards(JwtAuthGuard)
  @Post('emit')
  async emit(@GetUser() user) {
    await this.alarmService.emit(user.userid, { data: true });
  }
}
