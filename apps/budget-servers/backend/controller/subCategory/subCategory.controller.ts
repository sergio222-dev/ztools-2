import { CategoryCreateCommand } from '@budget/category/application/useCase/create/CategoryCreate.command';
import { CategoryFindOneQuery } from '@budget/category/application/useCase/findOne/CategoryFindOne.query';
import { CategoryUpdateCommand } from '@budget/category/application/useCase/update/CategoryUpdate.command';
import { Category } from '@budget/category/domain/Category.aggregate';
import { SubCategoryDeleteCommand } from '@budget/subCategory/application/useCase/delete/SubCategoryDelete.command';
import { SubCategoryFindOneByIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindOneById.query';
import { SubCategoryUpdateCommand } from '@budget/subCategory/application/useCase/update/SubCategoryUpdate.command';
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
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SubCategoryDto } from '../../dto/SubCategoryDto';
import { MonthlyBudgetAssignOneCommand } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.command';
import { SubCategoryCreateCommand } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.command';
import { SubCategoryFindAllQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindAll.query';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { MonthlyBudgetDeleteAllBySubCategoryIdCommand } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.command';
import { TransactionFindAllBySubCategoryIdQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllBySubCategoryId.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';
import { SubCategoryDeleteRequest } from '../../dto/SubCategoryDeleteRequest';

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

  @Put()
  @ApiResponse({
    status: 201,
  })
  async update(@Body() bodyCommand: SubCategoryCreateCommand): Promise<void> {
    const { name, id, categoryId } = bodyCommand;
    const query = new SubCategoryFindOneByIdQuery(id);
    const subCategory = await this.queryBus.execute<SubCategoryFindOneByIdQuery, SubCategory>(query);

    if (subCategory.id === '') {
      throw new HttpException(`the subcategory with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);
    }

    const command = new SubCategoryUpdateCommand(id, name, categoryId);

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

    await this.commandBus.execute(command);
  }

  @Post('/delete')
  async delete(@Body() bodyCommand: SubCategoryDeleteRequest): Promise<void> {
    const { id, subCategoryId } = bodyCommand;

    const query = new SubCategoryFindOneByIdQuery(id);
    const subCategory = await this.queryBus.execute<SubCategoryFindOneByIdQuery, SubCategory>(query);

    if (subCategory.id === '')
      throw new HttpException(`the subcategory with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const commandForDeleteMonthlyBudgetBySubCategoryId = new MonthlyBudgetDeleteAllBySubCategoryIdCommand(id);

    await this.commandBus.execute(commandForDeleteMonthlyBudgetBySubCategoryId);

    const queryForAllTransactions = new TransactionFindAllBySubCategoryIdQuery(id);

    const transactions = await this.queryBus.execute<TransactionFindAllBySubCategoryIdQuery, Transaction[]>(
      queryForAllTransactions,
    );

    for (const transaction of transactions) {
      const commandForUpdateTransaction = new TransactionUpdateCommand(
        transaction.id,
        transaction.inflow.amount,
        transaction.outflow.amount,
        transaction.payee,
        transaction.memo,
        subCategoryId,
        transaction.date.toISOString(),
        transaction.cleared,
        transaction.accountId,
      );

      await this.commandBus.execute(commandForUpdateTransaction);
    }

    const command = new SubCategoryDeleteCommand(id);

    await this.commandBus.execute(command);
  }
}
