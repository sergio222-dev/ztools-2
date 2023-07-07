import { v4 as uuid } from 'uuid';

export abstract class DomainEvent {
  protected constructor(
    public readonly aggregateId: string,
    public readonly eventId?: string,
    public readonly occurredOn?: string,
  ) {
    this.eventId = this.eventId ?? uuid();
    this.occurredOn = this.occurredOn ?? new Date().toISOString();
  }

  static get eventName(): string {
    throw new Error('Method not implemented.');
  }
}
