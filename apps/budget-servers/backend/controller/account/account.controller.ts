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

import { AccountResult } from '../../dto/AccountResult';
import { AccountCreateCommand } from '@budget/account/application/useCase/create/AccountCreate.command';
import { AccountDeleteCommand } from '@budget/account/application/useCase/delete/AccountDelete.command';
import { AccountFindAllQuery } from '@budget/account/application/useCase/find/AccountFindAll.query';
import { AccountFindByIdQuery } from '@budget/account/application/useCase/find/AccountFindById.query';
import { AccountFindOneByIdQuery } from '@budget/account/application/useCase/find/AccountFindOneById.query';
import { AccountUpdateCommand } from '@budget/account/application/useCase/update/AccountUpdate.command';
import { Account } from '@budget/account/domain/Account.aggregate';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { TransactionFindAllByAccountQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('account')
@ApiTags('accounts')
@Injectable()
export class AccountController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  async findAll() {
    const queryAllAccount = new AccountFindAllQuery();
    const accounts = await this.queryBus.execute<AccountFindAllQuery, Account[]>(queryAllAccount);

    const results: AccountResult[] = [];

    for (const account of accounts) {
      const total = await this.calculateBalance(account);

      results.push(new AccountResult(account.id, account.name, total.amount));
    }

    return results;
  }

  @Get('/:id')
  async balance(@Param('id') accountId: string) {
    const accountFindByIdQuery = new AccountFindByIdQuery(accountId);

    const account = await this.queryBus.execute<AccountFindByIdQuery, Account>(accountFindByIdQuery);
    const total = await this.calculateBalance(account);

    return new AccountResult(account.id, account.name, total.amount);
  }

  private async calculateBalance(account: Account): Promise<SignedAmount> {
    const queryAllTransactionByAccountId = new TransactionFindAllByAccountQuery(account.id);
    const transactions = await this.queryBus.execute<TransactionFindAllByAccountQuery, Transaction[]>(
      queryAllTransactionByAccountId,
    );

    let total = new SignedAmount(0);

    for (const transaction of transactions) {
      const amount = transaction.inflow.isEqualTo(new SignedAmount(0))
        ? transaction.outflow
        : transaction.inflow;
      total = amount.isPositive() ? total.plus(amount) : total.minus(amount);
    }

    return total;
  }
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create an account',
  })
  async create(@Body() bodyCommand: AccountCreateCommand): Promise<void> {
    const command = new AccountCreateCommand(bodyCommand.id, bodyCommand.name);
    await this.commandBus.execute(command);
  }

  @Put()
  @ApiResponse({
    description: 'Update an account',
  })
  async update(@Body() bodyCommand: AccountCreateCommand): Promise<void> {
    const { id, name } = bodyCommand;
    const query = new AccountFindOneByIdQuery(id);

    const account = await this.queryBus.execute<AccountFindOneByIdQuery, Account>(query);

    if (account.id === ' ') {
      throw new HttpException(`the account with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);
    }

    const command = new AccountUpdateCommand(id, name);

    await this.commandBus.execute(command);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'Delete an account',
  })
  async delete(@Param('id') id: string): Promise<void> {
    const query = new AccountFindOneByIdQuery(id);

    const account = await this.queryBus.execute<AccountFindOneByIdQuery, Account>(query);

    if (account.id === '')
      throw new HttpException(`the account with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new AccountDeleteCommand(account.id);

    await this.commandBus.execute(command);
  }
}
