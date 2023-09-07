import { UseCase } from '@core/shared/application/UseCase';
import { Account } from '@core/budget/account/domain/Account';
import { inject, injectable } from 'tsyringe';
import * as AccountRepository from '@core/budget/account/domain/AccountRepository';

@injectable()
export class AccountGetAll implements UseCase<unknown, Account[]> {
  constructor(
    @inject('AccountRepository')
    private accountRepository: AccountRepository.AccountRepository,
  ) {}
  async execute(): Promise<Account[]> {
    return await this.accountRepository.getAll();
  }
}
