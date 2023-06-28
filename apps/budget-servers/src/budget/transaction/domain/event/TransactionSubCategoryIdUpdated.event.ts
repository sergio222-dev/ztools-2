import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionSubCategoryIdUpdatedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly subCategoryId: string,
    public readonly previousSubCategoryId: string,
    public readonly date: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.subcategory.id.updated';
  }
}
