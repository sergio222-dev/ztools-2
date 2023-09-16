import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventRepository } from '@shared/domain/bus/Event.repository';
import { convertToSimpleEvent } from '@shared/infrastructure/mongo/convertToSimple';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

export class MongoEventRepository extends MongoRepository implements EventRepository {
  constructor(
    @InjectModel('Event')
    private readonly eventModel: Model<DomainEvent>,
  ) {
    super();
  }

  async save(event: DomainEvent): Promise<void> {
    const simpleEvent = convertToSimpleEvent(event);
    const eventDocument = new this.eventModel(simpleEvent);
    await eventDocument.save();
  }
}
