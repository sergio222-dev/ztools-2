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

import { CategoryDeleteRequest } from '../../dto/CategoryDeleteRequest';
import { CategoryDTO } from '../../dto/CategoryDto';
import { SubCategoryDto } from '../../dto/SubCategoryDto';
import { AuthenticatedRequest } from '../../routes/AuthenticatedRequest';
import { isValidMonth, isValidYear } from '../../utils/date.utils';
import { CategoryCreateCommand } from '@budget/category/application/useCase/create/CategoryCreate.command';
import { CategoryDeleteCommand } from '@budget/category/application/useCase/delete/CategoryDelete.command';
import { CategoryFindAllQuery } from '@budget/category/application/useCase/find/CategoryFindAll.query';
import { CategoryFindOneQuery } from '@budget/category/application/useCase/findOne/CategoryFindOne.query';
import { CategoryUpdateCommand } from '@budget/category/application/useCase/update/CategoryUpdate.command';
import { Category } from '@budget/category/domain/Category.aggregate';
import { MonthlyBudgetDeleteAllBySubCategoryIdCommand } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.command';
import { MonthlyBudgetFindOneQuery } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindOne.query';
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
  async findAll(@Query('month') month: string, @Query('year') year: string): Promise<CategoryDTO[]> {
    if (!isValidMonth(month) || !isValidYear(year))
      throw new HttpException('invalid month or year', HttpStatus.BAD_REQUEST);

    const query = new CategoryFindAllQuery();

    const categories = await this.queryBus.execute<CategoryFindAllQuery, Category[]>(query);

    const categoriesDTO = categories.map(async category => {
      const subCategories = await this.queryBus.execute<SubCategoryFindAllByCategoryIdQuery, SubCategory[]>(
        new SubCategoryFindAllByCategoryIdQuery(category.id),
      );
      const subCategoriesDtoPromises = subCategories.map(async subCategory => {
        const queryMonthlyBudget = new MonthlyBudgetFindOneQuery(year, month, subCategory.id);

        const monthlyBudget = await this.queryBus.execute<
          MonthlyBudgetFindOneQuery,
          MonthlyBudget | undefined
        >(queryMonthlyBudget);

        return new SubCategoryDto(
          subCategory.id,
          subCategory.name,
          subCategory.categoryId,
          monthlyBudget?.assigned?.amount ?? '0',
          monthlyBudget?.activity?.amount ?? '0',
          monthlyBudget?.available?.amount ?? '0',
        );
      });

      const subCategoriesDto = await Promise.all(subCategoriesDtoPromises);

      return new CategoryDTO(category.id, category.name, subCategoriesDto);
    });

    return await Promise.all(categoriesDTO);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
  })
  async create(@Body() bodyCommand: CategoryCreateCommand) {
    const command = new CategoryCreateCommand(bodyCommand.id, bodyCommand.name);
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
  })
  async update(@Body() bodyCommand: CategoryCreateCommand): Promise<void> {
    const { name, id } = bodyCommand;
    const query = new CategoryFindOneQuery(id);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '') {
      throw new HttpException(`the category with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);
    }

    const command = new CategoryUpdateCommand(id, name);

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
    const query = new CategoryFindOneQuery(categoryId);

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
      );

      await this.commandBus.execute(commandForDeleteMonthlyBudgetBySubCategoryId);

      const queryForTransactions = new TransactionFindAllBySubCategoryIdQuery(subCategoryId, user.id);

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

    const commandForDeleteCategory = new CategoryDeleteCommand(categoryId);

    await this.commandBus.execute(commandForDeleteCategory);
  }
}
