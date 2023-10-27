import { v4 as uuid } from 'uuid';

import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export abstract class DomainEvent extends AggregateRoot {
    private readonly _eventId: string;
    private readonly _occurredOn: string;

    protected constructor(id: string, _eventId?: string, _occurredOn?: string) {
        super(id, new Date(), new Date());
        this._eventId = _eventId ?? uuid();
        this._occurredOn = _occurredOn ?? new Date().toISOString();
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
