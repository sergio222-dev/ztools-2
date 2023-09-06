import { CategoryDeleteCommand } from '@budget/category/application/useCase/delete/CategoryDelete.command';
import { CategoryFindOneQuery } from '@budget/category/application/useCase/findOne/CategoryFindOne.query';
import { SubCategoryDeleteBatchCommand } from '@budget/subCategory/application/useCase/deleteBatch/SubCategoryDeleteBatch.command';
import { TransactionDeleteBatchCommand } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.command';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Schema } from 'mongoose';

import { CategoryDTO } from '../../dto/CategoryDto';
import { SubCategoryDto } from '../../dto/SubCategoryDto';
import { isValidMonth, isValidYear } from '../../utils/date.utils';
import { CategoryCreateCommand } from '@budget/category/application/useCase/create/CategoryCreate.command';
import { CategoryFindAllQuery } from '@budget/category/application/useCase/find/CategoryFindAll.query';
import { Category } from '@budget/category/domain/Category.aggregate';
import { MonthlyBudgetFindOneQuery } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindOne.query';
import { MonthlyBudget } from '@budget/monthlyBudget/domain/MonthlyBudget.aggregate';
import { SubCategoryFindAllByCategoryIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAllByCategoryId.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@Controller('category')
@ApiTags('categories')
@Injectable()
export class CategoryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
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
        new SubCategoryFindAllByCategoryIdQuery(category.id, month, year),
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
  @ApiResponse({
    status: 201,
  })
  async create(@Body() bodyCommand: CategoryCreateCommand) {
    const command = new CategoryCreateCommand(bodyCommand.id, bodyCommand.name);
    await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const query = new CategoryFindOneQuery(id);

    const category = await this.queryBus.execute<CategoryFindOneQuery, Category>(query);

    if (category.id === '')
      throw new HttpException(`the category with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new CategoryDeleteCommand(id);

    const subCategories = await this.queryBus.execute<SubCategoryFindAllByCategoryIdQuery, SubCategory[]>(
      new SubCategoryFindAllByCategoryIdQuery(
        id,
        String(new Date().getMonth()),
        String(new Date().getFullYear()),
      ),
    );

    const ids = subCategories.map(subCategory => subCategory.id);

    try {
      const command = new SubCategoryDeleteBatchCommand(ids);
      await this.commandBus.execute<SubCategoryDeleteBatchCommand>(command);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await this.commandBus.execute(command);
  }
}
