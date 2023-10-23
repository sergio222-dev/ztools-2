import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Transaction } from '../../domain/Transaction.aggregate';
import { TransactionRepository } from '../../domain/Transaction.repository';
import {
  mapToDomain,
  mapToSchema,
  TransactionSchemaType,
} from '@budget/transaction/infrastructure/mongo/transaction.schema';
import { Criteria } from '@shared/domain/criteria/Criteria';
import { MongoRepository } from '@shared/infrastructure/mongo/MongoRepository';

@Injectable()
export class MongoTransactionRepository
  extends MongoRepository<Transaction, TransactionSchemaType>
  implements TransactionRepository
{
  constructor(@InjectConnection() connection: Connection) {
    super(connection);
  }

  protected collectionName(): string {
    return 'transactions';
  }

  protected getMapperToSchema(): (value: Transaction) => TransactionSchemaType {
    return mapToSchema;
  }

  protected getMapperToDomain(): (value: TransactionSchemaType) => Transaction {
    return mapToDomain;
  }

  async save(transaction: Transaction): Promise<void> {
    await this.persist(transaction);
  }

  async delete(transactions: Transaction[]): Promise<void> {
    await this.remove(transactions);
  }

  async matching(criteria: Criteria): Promise<Transaction[]> {
    const documents = await this.searchByCriteria(criteria);
    const mapper = this.getMapperToDomain();

    return documents.map(element => mapper(element));
  }
}
