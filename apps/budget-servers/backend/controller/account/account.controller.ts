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
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

import { AccountBalanceResponse } from '../../dto/Account/AccountBalanceResponse';
import { AccountCreateRequest } from '../../dto/Account/AccountCreateRequest';
import { AccountFindAllResponse } from '../../dto/Account/AccountFindAllResponse';
import { AccountUpdateRequest } from '../../dto/Account/AccountUpdateRequest';
import { AuthenticatedRequest } from '../../routes/AuthenticatedRequest';
import { AccountCreateCommand } from '@budget/account/application/useCase/create/AccountCreate.command';
import { AccountDeleteCommand } from '@budget/account/application/useCase/delete/AccountDelete.command';
import { AccountFindAllQuery } from '@budget/account/application/useCase/find/AccountFindAll.query';
import { AccountFindByIdQuery } from '@budget/account/application/useCase/find/AccountFindById.query';
import { AccountFindOneByIdQuery } from '@budget/account/application/useCase/find/AccountFindOneById.query';
import { AccountUpdateCommand } from '@budget/account/application/useCase/update/AccountUpdate.command';
import { Account } from '@budget/account/domain/Account.aggregate';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { GetSubCategorySystemIdQuery } from '@budget/subCategory/application/useCase/bootstrap/GetSubCategorySystemId.query';
import { TransactionCreateCommand } from '@budget/transaction/application/useCase/create/TransactionCreate.command';
import { TransactionFindAllByAccountQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.query';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('account')
@ApiTags('accounts')
@Injectable()
export class AccountController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all accounts',
    type: [AccountFindAllResponse],
  })
  @ApiBearerAuth('JWT')
  async findAll(@Req() request: AuthenticatedRequest): Promise<AccountFindAllResponse[]> {
    const { user } = request;
    const queryAllAccount = new AccountFindAllQuery(user.sub);
    const accounts = await this.queryBus.execute<AccountFindAllQuery, Account[]>(queryAllAccount);

    const results: AccountFindAllResponse[] = [];

    for (const account of accounts) {
      const total = await this.calculateBalance(account, user.sub);

      results.push({
        id: account.id,
        name: account.name,
        balance: total.amount,
      });
    }

    return results;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get an account by id',
    type: AccountBalanceResponse,
  })
  @ApiBearerAuth('JWT')
  async balance(
    @Param('id') accountId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<AccountBalanceResponse> {
    const { user } = request;
    const accountFindByIdQuery = new AccountFindByIdQuery(accountId, user.sub);

    const account = await this.queryBus.execute<AccountFindByIdQuery, Account>(accountFindByIdQuery);
    const total = await this.calculateBalance(account, user.sub);

    return {
      id: account.id,
      name: account.name,
      balance: total.amount,
    };
  }

  // TODO this should be stored in the database
  private async calculateBalance(account: Account, userId: string): Promise<SignedAmount> {
    const queryAllTransactionByAccountId = new TransactionFindAllByAccountQuery(account.id, userId);
    const transactions = await this.queryBus.execute<TransactionFindAllByAccountQuery, Transaction[]>(
      queryAllTransactionByAccountId,
    );

    let total = new SignedAmount(0);

    for (const transaction of transactions) {
      total = total.plus(transaction.inflow).minus(transaction.outflow);
    }

    return total;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create an account',
  })
  @ApiBearerAuth('JWT')
  async create(@Body() body: AccountCreateRequest, @Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;
    const command = new AccountCreateCommand(body.id, body.name, user.sub, body.balance);
    await this.commandBus.execute(command);

    const query = new GetSubCategorySystemIdQuery(user.sub);
    const subCategorySystemId = await this.queryBus.execute<GetSubCategorySystemIdQuery, string>(query);

    if (!subCategorySystemId) {
      throw new HttpException('subCategorySystemId not found', HttpStatus.NOT_FOUND);
    }

    // create initial transaction
    const transactionId = uuid();

    const newTransactionCommand = new TransactionCreateCommand(
      transactionId,
      body.balance,
      '0',
      'Initial Balance',
      '',
      subCategorySystemId,
      new Date().toISOString(),
      true,
      body.id,
      user.sub,
    );

    await this.commandBus.execute(newTransactionCommand);
  }

  @Put()
  @ApiResponse({
    description: 'Update an account',
  })
  @ApiBearerAuth('JWT')
  async update(@Body() body: AccountUpdateRequest, @Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;
    const { id, name, balance } = body;
    const query = new AccountFindOneByIdQuery(id, user.sub);

    const account = await this.queryBus.execute<AccountFindOneByIdQuery, Account>(query);

    if (account.id === '') {
      throw new HttpException(`the account with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);
    }

    const command = new AccountUpdateCommand(id, name, user.sub, balance);

    await this.commandBus.execute(command);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'Delete an account',
  })
  @ApiBearerAuth('JWT')
  async delete(@Param('id') id: string, @Req() request: AuthenticatedRequest): Promise<void> {
    const { user } = request;
    const query = new AccountFindOneByIdQuery(id, user.sub);

    const account = await this.queryBus.execute<AccountFindOneByIdQuery, Account>(query);

    if (account.id === '')
      throw new HttpException(`the account with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

    const command = new AccountDeleteCommand(account.id, user.sub);

    await this.commandBus.execute(command);
  }
}
