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
    return this.transactionModel.find().exec();
  }
}
