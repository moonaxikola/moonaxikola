import { Event, EventEmitter } from '@moona-backend/common/domain';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService implements EventEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  dispatch(event: Event): void {
    this.eventEmitter.emit(event.eventName, event);
  }
}
