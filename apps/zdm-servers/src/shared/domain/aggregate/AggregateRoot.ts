import { DomainEvent } from '../bus/event/DomainEvent';
import { DateValueObject } from '@shared/domain/valueObject/DateValueObject';
import { IdObject } from '@shared/domain/valueObject/IdObject';

export abstract class AggregateRoot {
  get id(): IdObject {
    return this._id;
  }
  get createdAt(): DateValueObject {
    return this._createdAt;
  }

  get updatedAt(): DateValueObject {
    return this._updatedAt;
  }

  protected domainEvents: DomainEvent[] = [];

  protected constructor(
    protected readonly _id: IdObject,
    protected readonly _createdAt: DateValueObject,
    protected readonly _updatedAt: DateValueObject,
  ) {}

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
