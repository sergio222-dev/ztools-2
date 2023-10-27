import { Schema } from 'mongoose';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { convertToSimpleEvent } from '@shared/infrastructure/mongo/convertToSimple';

export interface DomainEventSchemaType {
    _id: string;
    id: string;
    aggregateId: string;
    eventId: string;
    occurredOn: string;
    data: string;
}

export const EventSchema = new Schema<DomainEventSchemaType>(
    {
        _id: {
            type: String,
            required: false,
            default: v => v.id,
        },
        id: {
            type: String,
            required: true,
        },
        aggregateId: {
            type: String,
            required: true,
        },
        eventId: {
            type: String,
            required: true,
        },
        occurredOn: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: false,
        },
    },
    {
        _id: false,
    },
);

export function mapToSchema(value: DomainEvent): DomainEventSchemaType {
    const simpleEvent = convertToSimpleEvent(value);

    return {
        _id: value.id,
        id: value.id,
        aggregateId: simpleEvent.id,
        eventId: value.eventId,
        occurredOn: value.occurredOn,
        data: simpleEvent.data,
    };
}
