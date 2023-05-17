// services
import { TransactionService } from '@budget/transactions/application/services/Transaction.service';
import { CategoryService } from '@budget/categories/application/service/Category.service';

// handlers
import { TransactionFindAllHandler } from './transactions/application/useCase/find/TransactionFindAll.handler';
import { TransactionCreateHandler } from '@budget/transactions/application/useCase/create/TransactionCreate.handler';
import { TransactionUpdateHandler } from '@budget/transactions/application/useCase/update/TransactionUpdate.handler';
import { TransactionFindOneByIdHandler } from '@budget/transactions/application/useCase/findOne/TransactionFindOneById.handler';
import { TransactionDeleteHandler } from '@budget/transactions/application/useCase/delete/TransactionDelete.handler';
import { TransactionDeleteBatchHandler } from '@budget/transactions/application/useCase/deleteBatch/TransactionDeleteBatch.handler';
import { CategoryCreateHandler } from '@budget/categories/application/useCase/create/CategoryCreate.handler';
import { CategoryFindAllHandler } from '@budget/categories/application/useCase/find/CategoryFindAll.handler';
import { CategoryUpdateHandler } from '@budget/categories/application/useCase/update/CategoryUpdate.handler';
import { CategoryFindOneHandler } from '@budget/categories/application/useCase/findOne/CategoryFindOne.handler';

// mongo schemas
import { TransactionSchema } from './transactions/infrastructure/mongo/transaction.schema';
import { CategorySchema } from '@budget/categories/infrastructure/mongo/category.schema';

// mongo repositories
import { MongoTransactionRepository } from '@budget/transactions/infrastructure/repository/MongoTransaction.repository';
import { MongoCategoryRepository } from '@budget/categories/infrastructure/repository/MongoCategory.repository';

const budget = {
  services: [TransactionService, CategoryService],
  handlers: [
    TransactionFindAllHandler,
    TransactionCreateHandler,
    TransactionUpdateHandler,
    TransactionFindOneByIdHandler,
    TransactionDeleteHandler,
    TransactionDeleteBatchHandler,
    CategoryCreateHandler,
    CategoryFindAllHandler,
    CategoryUpdateHandler,
    CategoryFindOneHandler,
  ],
  schemas: [
    {
      name: 'Transaction',
      schema: TransactionSchema,
    },
    {
      name: 'Category',
      schema: CategorySchema,
    },
  ],
  mongoRepositories: [
    {
      provide: 'TransactionRepository',
      useClass: MongoTransactionRepository,
    },
    {
      provide: 'CategoryRepository',
      useClass: MongoCategoryRepository,
    },
  ],
};

export default budget;
