import { DomainEvent } from '../bus/event/DomainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];

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