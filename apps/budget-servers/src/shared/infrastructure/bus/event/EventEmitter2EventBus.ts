import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import { getEventNameFromEvent } from '@shared/domain/bus/event/utils';

@Injectable()
export class EventEmitter2EventBus implements EventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      console.log(`publishing this event ${getEventNameFromEvent(event)}`);
      const eventName = getEventNameFromEvent(event);
      this.eventEmitter.emit(eventName, event);
    }
  }
}
