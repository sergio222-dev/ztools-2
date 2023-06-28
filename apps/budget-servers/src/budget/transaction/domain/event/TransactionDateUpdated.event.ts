import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionDateUpdatedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly subCategoryId: string,
    public readonly date: string,
    public readonly previousDate: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.date.updated';
  }
}
