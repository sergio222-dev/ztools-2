import { Inject, Injectable } from '@nestjs/common';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventRepository } from '@shared/domain/bus/Event.repository';

@Injectable()
export class EventRecorderService {
  constructor(
    @Inject('EventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async save(event: DomainEvent): Promise<void> {
    await this.eventRepository.save(event);
  }
}
