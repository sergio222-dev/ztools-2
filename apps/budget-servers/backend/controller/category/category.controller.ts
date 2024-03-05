import { CategoryBootstrapCommand } from '@budget/category/application/useCase/bootstrap/CategoryBootstrap.command';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoryCreateRequest } from '../../dto/Category/CategoryCreateRequest';
import { CategoryDeleteRequest } from '../../dto/Category/CategoryDeleteRequest';
import { CategoryFindAllResponse } from '../../dto/Category/CategoryFindAllResponse';
import { AuthenticatedRequest } from '../../routes/AuthenticatedRequest';
import { isValidMonth, isValidYear } from '../../utils/date.utils';
import { CategoryCreateCommand } from '@budget/category/application/useCase/create/CategoryCreate.command';
import { CategoryDeleteCommand } from '@budget/category/application/useCase/delete/CategoryDelete.command';
import { CategoryFindAllQuery } from '@budget/category/application/useCase/find/CategoryFindAll.query';
import { CategoryFindOneQuery } from '@budget/category/application/useCase/findOne/CategoryFindOne.query';
import { CategoryUpdateCommand } from '@budget/category/application/useCase/update/CategoryUpdate.command';
import { Category } from '@budget/category/domain/Category.aggregate';
import { MonthlyBudgetDeleteAllBySubCategoryIdCommand } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.command';
import { MonthlyBudgetFindByMonthYearQuery } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindByMonthYear.query';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { SubCategoryDeleteBatchCommand } from '@budget/subCategory/application/useCase/deleteBatch/SubCategoryDeleteBatch.command';
import { SubCategoryFindAllByCategoryIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAllByCategoryId.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { TransactionFindAllBySubCategoryIdQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllBySubCategoryId.query';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('category')
@ApiTags('categories')
@Injectable()
export class CategoryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 200,
    description: 'Get this month categories',
  })
  async findAll(
    @Query('month') month: string,
    @Query('year') year: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<CategoryFindAllResponse> {
    const { user } = request;
    if (!isValidMonth(month) || !isValidYear(year))
      throw new HttpException('invalid month or year', HttpStatus.BAD_REQUEST);

    const queryCategories = new CategoryFindAllQuery(user.sub);
    const categories = await this.queryBus.execute<CategoryFindAllQuery, Category[]>(queryCategories);

    const queryMonthlyBudgets = new MonthlyBudgetFindByMonthYearQuery(month, year, user.sub);
    const monthlyBudgets = await this.queryBus.execute<MonthlyBudgetFindByMonthYearQuery, MonthlyBudget[]>(
      queryMonthlyBudgets,
    );

    const categoriesResponsePromise = categories.map(async category => {
      const subCategories = await this.queryBus.execute<SubCategoryFindAllByCategoryIdQuery, SubCategory[]>(
        new SubCategoryFindAllByCategoryIdQuery(category.id),
      );
      const subCategoriesDtoPromises = subCategories.map(subCategory => {
        const monthlyBudget = monthlyBudgets.find(
          monthlyBudget => monthlyBudget.subCategoryId === subCategory.id,
        );
        return {
          id: subCategory.id,
          name: subCategory.name,
          categoryId: subCategory.categoryId,
          assigned: monthlyBudget?.assigned?.amount ?? '0',
          activity: monthlyBudget?.activity?.amount ?? '0',
          available: monthlyBudget?.available?.amount ?? '0',
        };
      });

      const subCategoriesDto = await Promise.all(subCategoriesDtoPromises);

      return {
        id: category.id,
        name: category.name,
        subCategories: subCategoriesDto,
      };
    });

    return await Promise.all(categoriesResponsePromise);
  }

  @Post('/bootstrap')
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
  })
  async bootstrapUser(@Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;

    const command = new CategoryBootstrapCommand(user.sub);
    await this.commandBus.execute(command);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
  })
  async create(@Body() body: CategoryCreateRequest, @Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;
    const command = new CategoryCreateCommand(body.id, body.name, user.sub);
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
  })
  async update(@Body() body: CategoryCreateRequest, @Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;
    const { name, id } = body;
    const query = new CategoryFindOneQuery(id, user.sub);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '') {
      throw new HttpException(`the category with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);
    }

    const command = new CategoryUpdateCommand(id, name, user.sub);

    await this.commandBus.execute(command);
  }

  @Post('/delete')
  @ApiBearerAuth('JWT')
  async delete(
    @Body() deleteCategoryRequest: CategoryDeleteRequest,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    const { user } = request;
    const { id: categoryId, subCategoryId: moveToSubCategoryId } = deleteCategoryRequest;
    const query = new CategoryFindOneQuery(categoryId, user.sub);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '')
      throw new HttpException(`the category with id ${categoryId} doesn't exists`, HttpStatus.NOT_FOUND);

    const queryForAllSubCategories = new SubCategoryFindAllByCategoryIdQuery(categoryId);

    const subCategories = await this.queryBus.execute<SubCategoryFindAllByCategoryIdQuery, SubCategory[]>(
      queryForAllSubCategories,
    );

    const subCategoriesId = subCategories.map(subCategory => subCategory.id);

    for (const subCategoryId of subCategoriesId) {
      const commandForDeleteMonthlyBudgetBySubCategoryId = new MonthlyBudgetDeleteAllBySubCategoryIdCommand(
        subCategoryId,
        user.sub,
      );

      await this.commandBus.execute(commandForDeleteMonthlyBudgetBySubCategoryId);

      const queryForTransactions = new TransactionFindAllBySubCategoryIdQuery(subCategoryId, user.sub);

      const transactions = await this.queryBus.execute<TransactionFindAllBySubCategoryIdQuery, Transaction[]>(
        queryForTransactions,
      );

      for (const transaction of transactions) {
        const commandForUpdateTransaction = new TransactionUpdateCommand(
          transaction.id,
          transaction.userId,
          transaction.inflow.amount,
          transaction.outflow.amount,
          transaction.payee,
          transaction.memo,
          moveToSubCategoryId,
          transaction.date.toISOString(),
          transaction.cleared,
          transaction.accountId,
        );

        await this.commandBus.execute(commandForUpdateTransaction);
      }
    }

    const commandForDeleteSubCategories = new SubCategoryDeleteBatchCommand(subCategoriesId);

    await this.commandBus.execute(commandForDeleteSubCategories);

    const commandForDeleteCategory = new CategoryDeleteCommand(categoryId, user.sub);

    await this.commandBus.execute(commandForDeleteCategory);
  }
}
