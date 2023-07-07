import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionActivityCreatedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly amount: string,
    public readonly subCategoryId: string,
    public readonly date: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.activity.created';
  }
}
