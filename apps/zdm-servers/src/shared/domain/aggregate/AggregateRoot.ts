import { DomainEvent } from '../bus/event/DomainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];

  public pullEvents(): DomainEvent[] {
    const { domainEvents } = this;
    this.domainEvents = [];

    return domainEvents;
  }

  protected eventExists<T extends DomainEvent>(
    eventType: new (...arguments_: never) => T,
  ): boolean {
    return this.domainEvents.some((event) => event.constructor === eventType);
  }

  protected record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}
