import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class AlarmService {
  //   constructor(private readonly emitter: EventEmitter) {}
  private readonly emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(userid: string) {
    return fromEvent(this.emitter, userid);
  }

  async emit(userid: string, data: boolean) {
    this.emitter.emit(userid, data);
  }
}
