import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';

export class Category extends AggregateRootOwnership {
    private constructor(
        id: string,
        public readonly name: string,
        userId: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super(id, userId, createdAt, updatedAt);
    }

    static CREATE(id: string, name: string, userId: string, createdAt: Date, updatedAt: Date) {
        console.log(`category with id ${id} CREATED`);
        return new Category(id, name, userId, createdAt, updatedAt);
    }

    static RETRIEVE(id: string, name: string, userId: string, createdAt: Date, updatedAt: Date) {
        console.log(`category with id ${id} RETRIEVED`);
        return new Category(id, name, userId, createdAt, updatedAt);
    }
}
