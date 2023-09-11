import { SubCategory } from '@budget/subCategory/domain/SubCategory.aggregate';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from '@budget/account/domain/Account.aggregate';
import { AccountRepository } from '@budget/account/domain/Account.repository';
import { convertToSimple } from '@shared/infrastructure/mongo/convertToSimple';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';

@Injectable()
export class MongoAccountRepository implements AccountRepository {
  constructor(
    @InjectModel('Account')
    private readonly accountModel: Model<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    const document = await this.accountModel.find({}, {});

    return document.map(document => {
      return Account.RETRIEVE(
        document.id,
        document.name,
        document.balance,
        document.createdAt,
        document.updatedAt,
      );
    });
  }

  async findOneById(id: string): Promise<Account> {
    const account = await this.accountModel.findOne({ id });

    if (!account) {
      return Account.RETRIEVE(id, '', new SignedAmount(0), new Date(), new Date());
    }

    return Account.RETRIEVE(
      account.id,
      account.name,
      new SignedAmount(0),
      account.createdAt,
      account.updatedAt,
    );
  }

  async createOne(account: Account): Promise<void> {
    const accountSimple = convertToSimple(account);
    const accountModel = new this.accountModel(accountSimple);
    await accountModel.save();
  }

  async update(account: Account): Promise<void> {
    const accountSimple = convertToSimple(account);
    await this.accountModel.updateOne({ id: account.id }, accountSimple);
  }

  async delete(id: string): Promise<void> {
    await this.accountModel.deleteOne({ id });
  }
}
