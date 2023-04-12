import { TransactionRepository } from '../../domain/Transaction.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../domain/Transaction';

@Injectable()
export class MongoTransactionRepository implements TransactionRepository {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<Transaction>,
  ) {}
  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find().exec();

    // const transactionsWithId = transactions.map((transaction) => {
    //   return transaction.$set({
    //     id: transaction._id
    //   });
    // });

    return transactions;
  }

  async save(transaction: Transaction): Promise<void> {
    const createdTransaction = new this.transactionModel(transaction);
    // createdTransaction.$set({
    //   _id: createdTransaction.id,
    //   id: undefined,
    // });
    await createdTransaction.save();
  }
}
