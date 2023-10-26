import { Inject, Injectable } from '@nestjs/common';

import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import { SubCategoryRepository } from '@budget/subCategory/domain/SubCategory.repository';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CategoryRepository')
        private readonly categoryRepository: CategoryRepository,
        @Inject('SubCategoryRepository')
        private readonly subCategoryRepository: SubCategoryRepository,
    ) {}

    async createOne(category: Category): Promise<void> {
        await this.categoryRepository.save(category);
    }

    async findAll(userId: string): Promise<Category[]> {
        // return await this.categoryRepository.findAll();
        const filters = new Filters([FilterByUser.fromValue(userId)]);

        const criteria = new Criteria(filters, Order.fromValues(), 0, 0);

        return await this.categoryRepository.matching(criteria);
    }

    async findOneById(id: string, userId: string): Promise<Category> {
        const criteria = Criteria.aggregateOwnershipCriteria(id, userId);
        const categories = await this.categoryRepository.matching(criteria);

        if (categories.length !== 1) {
            // TODO: domain exception
            throw new Error(`Category with id ${id} not found`);
        }

        return categories[0];
    }

    async update(category: Category): Promise<void> {
        const criteria = Criteria.aggregateOwnershipCriteria(category.id, category.userId);

        const oldCategories = await this.categoryRepository.matching(criteria);

        if (oldCategories.length !== 1) {
            // TODO: domain exception
            throw new Error(`Category with id ${category.id} not found`);
        }

        await this.categoryRepository.save(category);
    }

    async deleteOneById(id: string, userId: string): Promise<void> {
        const category = await this.findOneById(id, userId);

        await this.categoryRepository.delete([category]);
    }
}
