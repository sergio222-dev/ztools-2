import { UseCase } from '@core/shared/application/UseCase';
import { Account } from '@core/budget/account/domain/Account';
import { inject, injectable } from 'tsyringe';
import * as AccountRepository from '@core/budget/account/domain/AccountRepository';

@injectable()
export class AccountCreate implements UseCase<Account, void> {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository.AccountRepository,
  ) {}
  async execute(c: Account): Promise<void> {
    return await this.accountRepository.create(c);
  }
}
