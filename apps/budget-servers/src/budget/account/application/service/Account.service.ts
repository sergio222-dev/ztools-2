import { Inject, Injectable } from '@nestjs/common';

import { Account } from '@budget/account/domain/Account.aggregate';
import { AccountRepository } from '@budget/account/domain/Account.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }

  async findOneById(id: string): Promise<Account> {
    return await this.accountRepository.findOneById(id);
  }

  async createOne(id: string, name: string): Promise<void> {
    const account = Account.CREATE(id, name);
    await this.accountRepository.createOne(account);
  }

  async update(id: string, name: string): Promise<void> {
    const oldAccount = await this.accountRepository.findOneById(id);

    // TODO: domain exception
    if (!oldAccount) throw new Error(`Account with id ${id} not found`);

    const account = Account.RETRIEVE(
      oldAccount.id,
      name,
      new SignedAmount(0),
      oldAccount.createdAt,
      new Date(),
    );

    await this.accountRepository.update(account);
  }

  async delete(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
