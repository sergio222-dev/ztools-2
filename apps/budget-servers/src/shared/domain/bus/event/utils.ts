import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export function getEventNameFromEvent(event: DomainEvent): string {
  return Object.getPrototypeOf(event).constructor.eventName;
}
