export abstract class DomainEvent {
  protected constructor(
    public readonly aggregateId: string,
    public readonly eventId?: string,
    public readonly occurredOn?: string,
  ) {}
}
