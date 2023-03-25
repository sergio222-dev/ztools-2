import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '@budget/transactions/infrastructure/mongo/schema';
import { MongoTransactionRepository } from '@budget/transactions/infrastructure/repository/MongoTransaction.repository';

const repositories = [
  {
    provide: 'TransactionRepository',
    useClass: MongoTransactionRepository,
  },
];

const schemas = [
  {
    name: 'Transaction',
    schema: TransactionSchema,
  },
];

const mongoSchemasModule = MongooseModule.forFeature(schemas);

const mongoConnectionModule = MongooseModule.forRoot(
  // TODO should be a env var
  'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    dbName: 'ztools',
  },
);

@Module({})
export class MongoModule {
  static register(): DynamicModule {
    return {
      module: MongoModule,
      imports: [mongoConnectionModule, mongoSchemasModule],
      providers: [...repositories],
      exports: [...repositories],
    };
  }
}
