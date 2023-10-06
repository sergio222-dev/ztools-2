import { DomainEvent } from '../bus/event/DomainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected constructor(
    protected readonly _id: string,
    protected readonly _createdAt: Date,
    protected readonly _updatedAt: Date,
  ) {}

  public pullEvents(): DomainEvent[] {
    const { domainEvents } = this;
    this.domainEvents = [];

    return domainEvents;
  }

  protected eventExist<T extends DomainEvent>(eventType: new (...arguments_: never) => T): boolean {
    return this.domainEvents.some(event => event instanceof eventType);
  }

  protected record(event: DomainEvent) {
    this.domainEvents.push(event);
  }
}
