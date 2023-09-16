import { Schema } from 'mongoose';

import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { ExtendOfDocument } from '@shared/infrastructure/mongo/utils';

export const EventSchema = new Schema<ExtendOfDocument<DomainEvent & { data: string }>>(
  {
    _id: {
      type: String,
      required: true,
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
