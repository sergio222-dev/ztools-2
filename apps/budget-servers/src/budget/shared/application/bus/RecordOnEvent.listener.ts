import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventRecorderService } from '@shared/domain/bus/EventRecorder.service';

@Injectable()
export class RecordOnEventListener {
  constructor(private readonly eventRecordService: EventRecorderService) {}

  @OnEvent('**')
  async handleEvent(event: DomainEvent) {
    let eventName: string;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { eventName: eventNameFromEvent } = event.constructor;
      eventName = eventNameFromEvent;
    } catch {
      eventName = 'no named event';
    }
    console.log(
      `[Budget] - ${new Date().toLocaleString()}      LOG [Event] ID: ${event.eventId} - Name: ${eventName}`,
    );
    await this.eventRecordService.save(event);
  }
}
