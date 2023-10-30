import { Collection, Document, WithId } from 'mongodb';
import { Connection } from 'mongoose';

import { AggregateRoot } from '@shared/domain/aggregate/AggregateRoot';
import { AggregateRootOwnership } from '@shared/domain/aggregate/AggregateRootOwnership';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filter } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterById } from '@shared/domain/filter/FilterById';
import { FilterByIds } from '@shared/domain/filter/FilterByIds';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';
import { MongoCriteriaConverter } from '@shared/infrastructure/mongo/MongoCriteriaConverter';

export abstract class MongoRepository<T extends AggregateRootOwnership | AggregateRoot, S extends Document> {
    protected _criteriaConverter: MongoCriteriaConverter;

    protected constructor(protected readonly connection: Connection) {
        this._criteriaConverter = new MongoCriteriaConverter();
    }

    protected abstract collectionName(): string;

    protected abstract getMapperToSchema(): (value: T) => WithId<S>;

    protected abstract getMapperToDomain(): (value: S) => T;

    protected mapToSchema(value: T): WithId<S> {
        const mapper = this.getMapperToSchema();
        return mapper(value);
    }

    protected mapToEntity(value: S): T {
        const mapper = this.getMapperToDomain();
        return mapper(value);
    }

    protected collection<D extends Document>(): Collection<D> {
        return this.connection.db.collection<D>(this.collectionName());
    }

    protected async searchByCriteria(criteria: Criteria): Promise<WithId<S>[]> {
        const query = this._criteriaConverter.convert(criteria);

        const collection = this.collection<S>();

        // eslint-disable-next-line unicorn/no-array-callback-reference
        return await collection
            .find(query.filter)
            .sort(query.sort)
            .skip(query.skip)
            .limit(query.limit)
            .toArray();
    }

    protected async persist(value: T): Promise<void> {
        const collection = this.collection();
        const document = this.mapToSchema(value);
        const filters: Filter[] = [];

        if (AggregateRootOwnership.isAggregateRootOwnership(value)) {
            const byUserId = FilterByUser.fromValue(value.userId);
            filters.push(byUserId);
        }

        const byId = FilterById.fromValue(value.id);

        filters.push(byId);

        const criteria = this.createCriteriaWithFilters(filters);

        const query = this._criteriaConverter.convert(criteria);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete document._id;

        await collection.updateOne(query.filter, { $set: document }, { upsert: true });
    }

    protected async remove(entities: T[]): Promise<void> {
        const collection = this.collection();
        const filters: Filter[] = [];

        if (AggregateRootOwnership.isAggregateRootOwnership(entities[0])) {
            const byUserId = FilterByUser.fromValue(entities[0].userId);
            filters.push(byUserId);
        }

        const ids = entities.map(entity => entity.id);
        const byIds = FilterByIds.fromValue(ids);

        filters.push(byIds);

        const criteria = this.createCriteriaWithFilters(filters);

        const query = this._criteriaConverter.convert(criteria);

        await collection.deleteMany(query.filter);
    }

    private createCriteriaWithFilters(
        filters: Filter[],
        order = Order.fromValues(),
        limit = 0,
        skip = 0,
    ): Criteria {
        const objectFilters = new Filters(filters);

        return new Criteria(objectFilters, Order.fromValues(), 0, 0);
    }
}
