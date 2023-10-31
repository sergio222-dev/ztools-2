export class TransactionCreateCommand {
    constructor(
        private readonly _id: string,
        private readonly _inflow: string,
        private readonly _outflow: string,
        private readonly _payee: string,
        private readonly _memo: string,
        private readonly _subCategoryId: string,
        private readonly _date: string,
        private readonly _cleared = true,
        private readonly _accountId: string,
        private readonly _userId: string,
    ) {}

    get id(): string {
        return this._id;
    }

    get inflow(): string {
        return this._inflow;
    }

    get outflow(): string {
        return this._outflow;
    }

    get payee(): string {
        return this._payee;
    }

    get memo(): string {
        return this._memo;
    }

    get subCategoryId(): string {
        return this._subCategoryId;
    }

    get date(): string {
        return this._date;
    }

    get cleared(): boolean {
        return this._cleared;
    }

    get accountId(): string {
        return this._accountId;
    }

    get userId(): string {
        return this._userId;
    }
}
