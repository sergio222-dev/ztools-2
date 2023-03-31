import { Body, Controller, Get, Injectable, Param, Post, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Transaction } from 'mongodb';
import { TransactionFindAllQuery } from '@budget/transactions/application/useCase/find/TransactionFindAll.query';
import { TransactionCreateCommand } from '@budget/transactions/application/useCase/create/TransactionCreate.command';

@Controller('transactions')
@Injectable()
export class TransactionsController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('all')
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
  async findAll(): Promise<Transaction[]> {
    console.log(process.env.asd);
    return await this.queryBus.execute<TransactionFindAllQuery, Transaction[]>(new TransactionFindAllQuery());
  }

  @Post('create')
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
  async createAction(@Body() body: TransactionCreateCommand): Promise<void> {
    const command = new TransactionCreateCommand(
      body.id,
      body.inflow,
      body.outflow,
      body.payee,
      body.memo,
      body.date,
    );
    await this.commandBus.execute(command);
  }
}
