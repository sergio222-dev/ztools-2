import { AggregateSchema } from '@shared/infrastructure/mongo/AggregateSchema';

export interface OwnershipSchema extends AggregateSchema {
  userId: string;
}
