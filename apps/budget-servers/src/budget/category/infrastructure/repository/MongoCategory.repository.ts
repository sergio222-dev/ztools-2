import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Connection } from 'mongoose';

import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import {
    CategorySchemaType,
    mapToCategoryDomain,
    mapToCategorySchema,
} from '@budget/category/infrastructure/mongo/category.schema';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoCategoryRepository
    extends MongoRepository<Category, CategorySchemaType>
    implements CategoryRepository
{
    constructor(@InjectConnection() connection: Connection) {
        super(connection);
    }

    protected collectionName(): string {
        return 'categories';
    }

    protected getMapperToSchema() {
        return mapToCategorySchema;
    }

    protected getMapperToDomain() {
        return mapToCategoryDomain;
    }

    async save(category: Category): Promise<void> {
        await this.persist(category);
    }

    async delete(categories: Category[]): Promise<void> {
        await this.remove(categories);
    }

    async matching(criteria: Criteria): Promise<Category[]> {
        const documents = await this.searchByCriteria(criteria);
        const mapper = this.getMapperToDomain();

        return documents.map(element => mapper(element));
    }
}
