import { SubCategoryDeleteCommand } from '@budget/subCategory/application/useCase/delete/SubCategoryDelete.command';
import { SubCategoryFindOneByIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindOneById.query';
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SubCategoryDto } from '../../dto/SubCategoryDto';
import { MonthlyBudgetAssignOneCommand } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.command';
import { SubCategoryCreateCommand } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.command';
import { SubCategoryFindAllQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAll.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';

@Controller('subCategory')
@ApiTags('subCategories')
@Injectable()
export class SubCategoryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a sub category',
  })
  async create(@Body() bodyCommand: SubCategoryCreateCommand): Promise<void> {
    const command = new SubCategoryCreateCommand(bodyCommand.id, bodyCommand.name, bodyCommand.categoryId);

    await this.commandBus.execute(command);
  }

  @Post('/assign')
  @ApiResponse({
    status: 201,
    description: 'Assign budget to sub category',
  })
  async assignBudget(@Body() bodyCommand: MonthlyBudgetAssignOneCommand): Promise<void> {
    const command = new MonthlyBudgetAssignOneCommand(
      bodyCommand.amount,
      bodyCommand.subCategoryId,
      bodyCommand.month,
      bodyCommand.year,
    );

    console.log('monthly command', bodyCommand, command);

    await this.commandBus.execute(command);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all sub categories',
  })
  async findAll(): Promise<SubCategoryDto[]> {
    const query = new SubCategoryFindAllQuery();

    const subCategories = await this.queryBus.execute<SubCategoryFindAllQuery, SubCategory[]>(query);

    const subCategoriesDTO = subCategories.map(async subCategory => {
      return new SubCategoryDto(subCategory.id, subCategory.name, subCategory.categoryId, '0', '0', '0');
    });

    return await Promise.all(subCategoriesDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const query = new SubCategoryFindOneByIdQuery(id);

    const subCategory = await this.queryBus.execute<SubCategoryFindOneByIdQuery, SubCategory>(query);

    if (subCategory.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new SubCategoryDeleteCommand(id);

    await this.commandBus.execute(command);
  }
}
