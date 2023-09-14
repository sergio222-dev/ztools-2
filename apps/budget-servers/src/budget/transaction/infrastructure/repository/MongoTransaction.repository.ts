import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transaction } from '../../domain/Transaction.aggregate';
import { TransactionRepository } from '../../domain/Transaction.repository';
import { UnsignedAmount } from '@budget/shared/domain/valueObject/UnsignedAmount';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoTransactionRepository extends MongoRepository implements TransactionRepository {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<Transaction>,
  ) {
    super();
  }

  async findAll(): Promise<Transaction[]> {
    const transactionDocuments = await this.transactionModel.find().exec();
    const transactions: Transaction[] = [];

    for (const transactionDocument of transactionDocuments) {
      const transaction = Transaction.RETRIEVE(
        transactionDocument.id,
        transactionDocument.inflow,
        transactionDocument.outflow,
        transactionDocument.payee,
        transactionDocument.memo,
        transactionDocument.subCategoryId,
        transactionDocument.date,
        transactionDocument.cleared,
        transactionDocument.accountId,
        transactionDocument.createdAt,
        transactionDocument.updatedAt,
      );

      transactions.push(transaction);
    }

    return transactions;
  }

  async findByIds(ids: string[]): Promise<Transaction[]> {
    const transactionDocuments = await this.transactionModel.find({
      id: {
        $in: ids,
      },
    });

    const transactions: Transaction[] = [];

    for (const transactionDocument of transactionDocuments) {
      const transaction = Transaction.RETRIEVE(
        transactionDocument.id,
        transactionDocument.inflow,
        transactionDocument.outflow,
        transactionDocument.payee,
        transactionDocument.memo,
        transactionDocument.subCategoryId,
        transactionDocument.date,
        transactionDocument.cleared,
        transactionDocument.accountId,
        transactionDocument.createdAt,
        transactionDocument.updatedAt,
      );

      transactions.push(transaction);
    }

    return transactions;
  }

  async save(transaction: Transaction): Promise<void> {
    const simpleTransaction = this.convertToSimple(transaction);
    const createdTransaction = new this.transactionModel(simpleTransaction);
    await createdTransaction.save();
  }

  async update(transaction: Transaction): Promise<void> {
    const simpleTransaction = this.convertToSimple(transaction);
    await this.transactionModel.updateOne({ id: transaction.id }, simpleTransaction).exec();
  }

  async findOneById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();

    if (!transaction) {
      return Transaction.RETRIEVE(
        '',
        new UnsignedAmount('0'),
        new UnsignedAmount('0'),
        '',
        '',
        '',
        new Date(),
        true,
        '',
        new Date(),
        new Date(),
      );
    }

    return Transaction.RETRIEVE(
      id,
      transaction.inflow,
      transaction.outflow,
      transaction.payee,
      transaction.memo,
      transaction.subCategoryId,
      new Date(transaction.date),
      transaction.cleared,
      transaction.accountId,
      transaction.createdAt,
      transaction.updatedAt,
    );
  }

  async findAllByAccountId(id: string): Promise<Transaction[]> {
    const transactionsDocuments = await this.transactionModel.find({
      accountId: id,
    });

    return transactionsDocuments.map(t => {
      return Transaction.RETRIEVE(
        t.id,
        t.inflow,
        t.outflow,
        t.payee,
        t.memo,
        t.subCategoryId,
        new Date(t.date),
        t.cleared,
        t.accountId,
        t.createdAt,
        t.updatedAt,
      );
    });
  }

  async delete(id: string): Promise<void> {
    await this.transactionModel.findByIdAndDelete(id).exec();
  }

  async deleteBatch(ids: string[]): Promise<void> {
    await this.transactionModel.deleteMany({
      id: {
        $in: ids,
      },
    });
  }
}
