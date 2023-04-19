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

@Controller('transaction')
@ApiTags('transactions')
@Injectable()
export class TransactionController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '1' },
          inflow: { type: 'string', example: '0' },
          outflow: { type: 'string', example: '800' },
          payee: { type: 'string', example: 'Walmart' },
          memo: { type: 'string', example: '' },
          date: { type: 'string', example: new Date().toISOString() },
          updatedAt: { type: 'string', example: new Date().toISOString() },
          createdAt: { type: 'string', example: new Date().toISOString() },
        },
      },
    },
  })
  @ApiOperation({
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        inflow: { type: 'string', example: '0' },
        outflow: { type: 'string', example: '800' },
        payee: { type: 'string', example: 'Walmart' },
        memo: { type: 'string', example: '' },
        date: { type: 'string', example: new Date().toISOString() },
      },
    },
  })
  @ApiResponse({
    status: 201,
  })
  async create(
    @Body() { id, date, outflow, payee, memo, category, inflow }: TransactionCreateCommand,
  ): Promise<void> {
    const command = new TransactionCreateCommand(id, inflow, outflow, payee, memo, category, date);
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiResponse({
    status: 201,
  })
  async update(
    @Body() { id, inflow, outflow, payee, memo, category, date }: TransactionUpdateCommand,
  ): Promise<void> {
    const query = new TransactionFindOneByIdQuery(id);

    const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

    if (transaction.id === '')
      throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new TransactionUpdateCommand(id, inflow, outflow, payee, memo, category, date);

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
}
