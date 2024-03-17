import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { BUDGET } from '../../../../../backend/etc/settings';
import { Category } from '@budget/category/domain/Category.aggregate';
import { CategoryRepository } from '@budget/category/domain/Category.repository';
import { GetSubCategorySystemIdQuery } from '@budget/subCategory/application/useCase/bootstrap/GetSubCategorySystemId.query';
import { SubCategoryCreateCommand } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.command';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
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

  async bootstrapUser(userId: string): Promise<void> {
    // check if category and subcategory names are configured
    const categoryName = this.configService.get<string>('SYSTEM_CATEGORY_NAME');
    const subCategoryName = this.configService.get<string>('SYSTEM_SUBCATEGORY_NAME');

    if (!categoryName || !subCategoryName) {
      // TODO: domain exception
      throw new Error('Internal configuration error in category and subcategory names');
    }

    const currentSystemCategoryId = await this.categoryRepository.getSystemCategoryId(userId, categoryName);

    console.log(this.commandBus);

    // fetch SYSTEM subs category id if
    const query = new GetSubCategorySystemIdQuery(userId);
    const currentSystemSubCategoryId = await this.queryBus.execute<GetSubCategorySystemIdQuery, string>(
      query,
    );

    // create system category
    if (currentSystemCategoryId && currentSystemSubCategoryId) {
      return;
    }

    const newCategoryId = uuid();
    const newCategory = Category.CREATE(newCategoryId, categoryName, userId, new Date(), new Date());

    await this.categoryRepository.save(newCategory);

    const subCategoryId = uuid();
    const createSubCategoryCommand = new SubCategoryCreateCommand(
      subCategoryId,
      subCategoryName,
      newCategoryId,
      userId,
    );

    await this.commandBus.execute(createSubCategoryCommand);
  }

  async getSystemCategoryId(userId: string): Promise<string> {
    const categoryName = this.configService.get<string>(BUDGET().SYSTEM_CATEGORY_NAME);

    if (!categoryName) {
      // TODO: domain exception
      throw new Error('Internal configuration error in category name');
    }

    return this.categoryRepository.getSystemCategoryId(userId, categoryName);
  }
}
