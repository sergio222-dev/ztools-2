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

import { TransactionResult } from '../../dto/TransactionResult';
import { TransactionCreateCommand } from '@budget/transaction/application/useCase/create/TransactionCreate.command';
import { TransactionDeleteCommand } from '@budget/transaction/application/useCase/delete/TransactionDelete.command';
import { TransactionDeleteBatchCommand } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.command';
import { TransactionFindAllQuery } from '@budget/transaction/application/useCase/find/TransactionFindAll.query';
import { TransactionFindOneByIdQuery } from '@budget/transaction/application/useCase/findOne/TransactionFindOneById.query';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('transaction')
@ApiTags('transactions')
@Injectable()
export class TransactionController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all transactions',
  })
  async findAll(): Promise<TransactionResult[]> {
    const transactions = await this.queryBus.execute<TransactionFindAllQuery, Transaction[]>(
      new TransactionFindAllQuery(),
    );
    return transactions.map(
      t =>
        new TransactionResult(
          t.id,
          t.inflow.amount,
          t.outflow.amount,
          t.payee,
          t.memo,
          t.subCategoryId,
          t.date.toISOString(),
          t.cleared,
        ),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async findOneById(@Param('id') id: string): Promise<Transaction> {
    const query = new TransactionFindOneByIdQuery(id);
    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return transaction;
  }

  @Post()
  @ApiResponse({
    status: 201,
  })
  async create(
    @Body()
    { id, date, outflow, payee, memo, subCategoryId, inflow, cleared, accountId }: TransactionCreateCommand,
  ): Promise<void> {
    const command = new TransactionCreateCommand(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      date,
      cleared,
      accountId,
    );
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiResponse({
    status: 201,
  })
  async update(@Body() bodyCommand: TransactionUpdateCommand): Promise<void> {
    const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared, accountId } = bodyCommand;
    const query = new TransactionFindOneByIdQuery(id);

    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new TransactionUpdateCommand(
      id,
      inflow,
      outflow,
      payee,
      memo,
      subCategoryId,
      date,
      cleared,
      accountId,
    );

    await this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const query = new TransactionFindOneByIdQuery(id);

    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new TransactionDeleteCommand(id);

    await this.commandBus.execute(command);
  }

  @Post('/delete')
  async deleteBatch(@Body() { ids }: TransactionDeleteBatchCommand): Promise<void> {
    try {
      const command = new TransactionDeleteBatchCommand(ids);
      await this.commandBus.execute<TransactionDeleteBatchCommand>(command);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
