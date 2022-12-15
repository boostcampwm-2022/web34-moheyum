import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class EventService {
  //   constructor(private readonly emitter: EventEmitter) {}
  private readonly emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(0);
  }

  subscribe(userid: string) {
    return fromEvent(this.emitter, userid);
  }

  async emit(userid: string, data) {
    this.emitter.emit(userid, { data });
  }
}
