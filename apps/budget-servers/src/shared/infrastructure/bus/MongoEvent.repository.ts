import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { EventRepository } from '@shared/domain/bus/Event.repository';
import { DomainEventSchemaType, mapToSchema } from '@shared/infrastructure/bus/event/mongo/event.schema';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

export class MongoEventRepository
    extends MongoRepository<DomainEvent, DomainEventSchemaType>
    implements EventRepository
{
    constructor(
        @InjectConnection()
        _connection: Connection,
    ) {
        super(_connection);
    }

    protected collectionName(): string {
        return 'events';
    }

    protected getMapperToSchema(): (value: DomainEvent) => DomainEventSchemaType {
        return mapToSchema;
    }

    protected getMapperToDomain(): (value: DomainEventSchemaType) => DomainEvent {
        throw new Error('this method should not be used');
    }

    async save(event: DomainEvent): Promise<void> {
        await this.persist(event);
    }
}
