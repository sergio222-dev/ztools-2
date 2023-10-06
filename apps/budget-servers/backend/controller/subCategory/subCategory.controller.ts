import { Body, Controller, HttpException, HttpStatus, Injectable, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SubCategoryDeleteRequest } from '../../dto/SubCategoryDeleteRequest';
import { MonthlyBudgetAssignOneCommand } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.command';
import { MonthlyBudgetDeleteAllBySubCategoryIdCommand } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.command';
import { SubCategoryCreateCommand } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.command';
import { SubCategoryDeleteCommand } from '@budget/subCategory/application/useCase/delete/SubCategoryDelete.command';
import { SubCategoryFindOneByIdQuery } from '@budget/subCategory/application/useCase/find/SubCategoryFindOneById.query';
import { SubCategoryUpdateCommand } from '@budget/subCategory/application/useCase/update/SubCategoryUpdate.command';
import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { TransactionFindAllBySubCategoryIdQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllBySubCategoryId.query';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('subCategory')
@ApiTags('subCategories')
@Injectable()
export class SubCategoryController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiResponse({
    status: 201,
    description: 'Create a sub category',
  })
  async create(@Body() bodyCommand: SubCategoryCreateCommand): Promise<void> {
    const command = new SubCategoryCreateCommand(bodyCommand.id, bodyCommand.name, bodyCommand.categoryId);

    await this.commandBus.execute(command);
  }

  @Put()
  @ApiBearerAuth('JWT')
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
  @ApiBearerAuth('JWT')
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
  @ApiBearerAuth('JWT')
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
