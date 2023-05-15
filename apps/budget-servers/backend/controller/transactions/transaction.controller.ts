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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionFindAllQuery } from '@budget/transactions/application/useCase/find/TransactionFindAll.query';
import { TransactionCreateCommand } from '@budget/transactions/application/useCase/create/TransactionCreate.command';
import { TransactionUpdateCommand } from '@budget/transactions/application/useCase/update/TransactionUpdate.command';
import { TransactionFindOneByIdQuery } from '@budget/transactions/application/useCase/findOne/TransactionFindOneById.query';
import { Transaction } from '@budget/transactions/domain/Transaction';
import { TransactionDeleteCommand } from '@budget/transactions/application/useCase/delete/TransactionDelete.command';
import { TransactionDeleteBatchCommand } from '@budget/transactions/application/useCase/deleteBatch/TransactionDeleteBatch.command';

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
  async findAll(): Promise<Transaction[]> {
    return await this.queryBus.execute<TransactionFindAllQuery, Transaction[]>(new TransactionFindAllQuery());
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async findOneById(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(
      new TransactionFindOneByIdQuery(id),
    );

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    return transaction;
  }

  @Post()
  @ApiResponse({
    status: 201,
  })
  async create(
    @Body() { id, date, outflow, payee, memo, category, inflow, cleared }: TransactionCreateCommand,
  ): Promise<void> {
    const command = new TransactionCreateCommand(id, inflow, outflow, payee, memo, category, date, cleared);
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiResponse({
    status: 201,
  })
  async update(
    @Body() { id, inflow, outflow, payee, memo, category, date, cleared }: TransactionUpdateCommand,
  ): Promise<void> {
    const query = new TransactionFindOneByIdQuery(id);

    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new TransactionUpdateCommand(id, inflow, outflow, payee, memo, category, date, cleared);

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
