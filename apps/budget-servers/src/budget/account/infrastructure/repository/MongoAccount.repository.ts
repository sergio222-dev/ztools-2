import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Account } from '@budget/account/domain/Account.aggregate';
import { AccountRepository } from '@budget/account/domain/Account.repository';
import {
  AccountSchemaType,
  mapToAccountDomain,
  mapToAccountSchema,
} from '@budget/account/infrastructure/mongo/account.schema';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoAccountRepository
  extends MongoRepository<Account, AccountSchemaType>
  implements AccountRepository
{
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    @InjectConnection() connection: Connection,
  ) {
    super(connection);
  }

  protected collectionName(): string {
    return 'accounts';
  }

  protected getMapperToSchema() {
    return mapToAccountSchema;
  }

  protected getMapperToDomain() {
    return mapToAccountDomain;
  }

  async findOneById(id: string): Promise<Account> {
    const account = await this.accountModel.findOne({ id });

    if (!account) {
      return Account.RETRIEVE(id, '', '', new SignedAmount(0), new Date(), new Date());
    }

    return Account.RETRIEVE(
      account.id,
      account.name,
      '',
      new SignedAmount(0),
      account.createdAt,
      account.updatedAt,
    );
  }

  async matching(criteria: Criteria) {
    const documents = await this.searchByCriteria(criteria);
    const mapper = this.getMapperToDomain();

    return documents.map(element => mapper(element));
  }

  async save(account: Account): Promise<void> {
    await this.persist(account);
  }

  async delete(accounts: Account[]): Promise<void> {
    await this.remove(accounts);
  }
}
