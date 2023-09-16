import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export interface EventRepository {
  save(event: DomainEvent): Promise<void>;
}
