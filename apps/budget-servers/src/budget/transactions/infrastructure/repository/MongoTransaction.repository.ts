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
    return await this.transactionModel.find().exec();
  }

  async save(transaction: Transaction): Promise<void> {
    const createdTransaction = new this.transactionModel(transaction);
    await createdTransaction.save();
  }

  async update(transaction: Transaction): Promise<void> {
    const oldTransaction = await this.transactionModel.findById(transaction.id).exec();

    oldTransaction?.$set('isNew', false);

    oldTransaction?.set('inflow', transaction.inflow);
    oldTransaction?.set('outflow', transaction.outflow);
    oldTransaction?.set('payee', transaction.payee);
    oldTransaction?.set('memo', transaction.memo);
    oldTransaction?.set('date', transaction.date);
    oldTransaction?.set('category', transaction.category);
    oldTransaction?.set('updatedAt', new Date());
    await oldTransaction?.save();
  }

  async findOneById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();

    if (!transaction) {
      return Transaction.CREATE('', '0', '0', '', '', '', new Date(), true);
    }

    return Transaction.CREATE(
      id,
      transaction.inflow,
      transaction.outflow,
      transaction.payee,
      transaction.memo,
      transaction.category,
      transaction.date,
      transaction.cleared,
    );
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
