import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AccountResult } from '../../dto/AccountResult';
import { AccountFindAllQuery } from '@budget/account/application/useCase/find/AccountFindAll.query';
import { AccountFindByIdQuery } from '@budget/account/application/useCase/find/AccountFindById.query';
import { Account } from '@budget/account/domain/Account.aggregate';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { TransactionFindAllByAccountQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('account')
@ApiTags('accounts')
@Injectable()
export class AccountController {
  constructor(private readonly queryBus: QueryBus) {}

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
}
