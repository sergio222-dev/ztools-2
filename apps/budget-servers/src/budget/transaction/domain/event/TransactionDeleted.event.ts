import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionDeletedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly amount: string,
    public readonly subCategoryId: string,
    public readonly accountId: string,
    public readonly date: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.deleted';
  }
}
