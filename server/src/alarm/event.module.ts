import { Module } from '@nestjs/common';
import { EventController } from './event.contoller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
