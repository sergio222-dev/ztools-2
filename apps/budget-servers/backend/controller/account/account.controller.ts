import { AccountUpdateCommand } from '@budget/account/application/useCase/update/AccountUpdate.command';
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
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountDTO } from '../../dto/AccountDto';
import { AccountCreateCommand } from '@budget/account/application/useCase/create/AccountCreate.command';
import { AccountDeleteCommand } from '@budget/account/application/useCase/delete/AccountDelete.command';
import { AccountFindAllQuery } from '@budget/account/application/useCase/find/AccountFindAll.query';
import { AccountFindOneByIdQuery } from '@budget/account/application/useCase/find/AccountFindOneById.query';
import { Account } from '@budget/account/domain/Account.aggregate';

@Controller('account')
@ApiTags('accounts')
@Injectable()
export class AccountController {
  constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all accounts',
  })
  async findAll(): Promise<AccountDTO[]> {
    const query = new AccountFindAllQuery();

    const accounts = await this.queryBus.execute<AccountFindAllQuery, Account[]>(query);

    const accountsDTO = accounts.map(async account => {
      return new AccountDTO(account.id, account.name, account.balance);
    });

    return await Promise.all(accountsDTO);
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
