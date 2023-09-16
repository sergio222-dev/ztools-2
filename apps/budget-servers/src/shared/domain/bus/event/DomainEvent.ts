import { v4 as uuid } from 'uuid';

export abstract class DomainEvent {
  private readonly _eventId: string;
  private readonly _occurredOn: string;

  protected constructor(private readonly _aggregateId: string, _eventId?: string, _occurredOn?: string) {
    this._eventId = _eventId ?? uuid();
    this._occurredOn = _occurredOn ?? new Date().toISOString();
  }

  get aggregateId(): string {
    return this._aggregateId;
  }

  get eventId(): string {
    return this._eventId;
  }

  get occurredOn(): string {
    return this._occurredOn;
  }

  static get eventName(): string {
    throw new Error('Method not implemented.');
  }
}
