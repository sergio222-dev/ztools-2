import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionActivityUpdatedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly amount: string,
    public readonly previousAmount: string,
    public readonly subCategoryId: string,
    public readonly date: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.activity.updated';
  }
}
