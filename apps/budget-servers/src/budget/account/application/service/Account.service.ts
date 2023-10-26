import { Inject, Injectable } from '@nestjs/common';

import { Account } from '@budget/account/domain/Account.aggregate';
import { AccountRepository } from '@budget/account/domain/Account.repository';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
  ) {}

  async findAll(userId: string): Promise<Account[]> {
    const criteria = Criteria.aggregateOwnershipCriteria('', userId);

    return await this.accountRepository.matching(criteria);
  }

  async findOneById(id: string, userId: string): Promise<Account> {
    const criteria = Criteria.aggregateOwnershipCriteria(id, userId);

    const account = await this.accountRepository.matching(criteria);

    if (account.length !== 1) {
      throw new Error(`Account with id ${id} not found`);
    }

    return account[0];
  }

  async createOne(id: string, name: string, userId: string): Promise<void> {
    const account = Account.CREATE(id, name, userId);
    await this.accountRepository.save(account);
  }

  async update(id: string, name: string, userId: string): Promise<void> {
    const oldAccount = await this.findOneById(id, userId);

    // TODO: domain exception
    if (!oldAccount) throw new Error(`Account with id ${id} not found`);

    const account = Account.RETRIEVE(
      oldAccount.id,
      name,
      userId,
      new SignedAmount(0),
      oldAccount.createdAt,
      new Date(),
    );

    await this.accountRepository.save(account);
  }

  async delete(id: string, userId: string): Promise<void> {
    const account = await this.findOneById(id, userId);
    await this.accountRepository.delete([account]);
  }
}
