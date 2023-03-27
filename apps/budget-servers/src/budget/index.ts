// services
import { TransactionAll } from './transactions/application/useCase/find/TransactionAll';

// handlers
import { TransactionFindAllHandler } from './transactions/application/useCase/find/TransactionFindAll.handler';

// mongo schemas
import { TransactionSchema } from './transactions/infrastructure/mongo/schema';

// mongo repositories
import { MongoTransactionRepository } from '@budget/transactions/infrastructure/repository/MongoTransaction.repository';

const budget = {
  services: [TransactionAll],
  handlers: [TransactionFindAllHandler],
  schemas: [
    {
      name: 'Transaction',
      schema: TransactionSchema,
    },
  ],
  mongoRepositories: [
    {
      provide: 'TransactionRepository',
      useClass: MongoTransactionRepository,
    },
  ],
};

export default budget;
