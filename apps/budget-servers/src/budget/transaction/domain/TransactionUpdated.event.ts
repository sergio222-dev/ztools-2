import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionUpdatedEvent extends DomainEvent {
  constructor(
    id: string,
    public readonly inflow: string,
    public readonly previousInflow: string,
    public readonly outflow: string,
    public readonly previousOutflow: string,
    public readonly subCategoryId: string,
    public readonly previousSubCategoryId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static get eventName(): string {
    return 'transaction.updated';
  }
}
