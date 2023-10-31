import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';

export class User extends AggregateRoot {
    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }
    private constructor(
        _id: string,
        private readonly _name: string,
        private readonly _email: string,
        _createdAt: Date,
        _updatedAt: Date,
    ) {
        super(_id, _createdAt, _updatedAt);
    }

    static CREATE(id: string, name: string, email: string) {
        return new User(id, name, email, new Date(), new Date());
    }

    static RETRIEVE(id: string, name: string, email: string, createdAt: Date, updatedAt: Date) {
        return new User(id, name, email, createdAt, updatedAt);
    }
}
