// services
import { TransactionService } from '@budget/transactions/application/services/TransactionService';

// handlers
import { TransactionFindAllHandler } from './transactions/application/useCase/find/TransactionFindAll.handler';
import { TransactionCreateHandler } from '@budget/transactions/application/useCase/create/TransactionCreate.handler';

// mongo schemas
import { TransactionSchema } from './transactions/infrastructure/mongo/transaction.schema';

// mongo repositories
import { MongoTransactionRepository } from '@budget/transactions/infrastructure/repository/MongoTransaction.repository';

const budget = {
  services: [TransactionService],
  handlers: [TransactionFindAllHandler, TransactionCreateHandler],
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
