import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
