import { DomainEvent } from '../bus/event/DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public pullEvents(): DomainEvent[] {
    const { domainEvents } = this;
    this.domainEvents = [];

    return domainEvents;
  }

  protected record(event: DomainEvent) {
    this.domainEvents.push(event);
  }
}
