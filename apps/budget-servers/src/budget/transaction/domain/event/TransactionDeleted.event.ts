import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export class TransactionDeletedEvent extends DomainEvent {
    get amount(): string {
        return this._amount;
    }

    get subCategoryId(): string {
        return this._subCategoryId;
    }

    get accountId(): string {
        return this._accountId;
    }

    get userId(): string {
        return this._userId;
    }

    get date(): string {
        return this._date;
    }
    constructor(
        id: string,
        private readonly _amount: string,
        private readonly _subCategoryId: string,
        private readonly _accountId: string,
        private readonly _date: string,
        private readonly _userId: string,
        eventId?: string,
        occurredOn?: string,
    ) {
        super(id, eventId, occurredOn);
    }

    static get eventName(): string {
        return 'transaction.deleted';
    }
}
