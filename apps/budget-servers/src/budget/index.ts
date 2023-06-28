/* eslint import/order: 0 */
// services
import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { CategoryService } from '@budget/category/application/service/Category.service';
import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { MonthActivityService } from '@budget/monthlyBudget/application/service/MonthActivity.service';

// handlers
import { TransactionFindAllHandler } from './transaction/application/useCase/find/TransactionFindAll.handler';
import { CategoryFindAllHandler } from '@budget/category/application/useCase/find/CategoryFindAll.handler';
import { CategoryUpdateHandler } from '@budget/category/application/useCase/update/CategoryUpdate.handler';
import { CategoryFindOneHandler } from '@budget/category/application/useCase/findOne/CategoryFindOne.handler';
import { SubCategoryCreateHandler } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.handler';
import { SubCategoryFindAllByCategoryIdHandler } from '@budget/subCategory/application/useCase/find/SubCategoryFindAllByCategoryId.handler';
import { MonthlyBudgetAssignOneHandler } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.handler';
import { MonthlyBudgetFindOneHandler } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindOne.handler';
import { CategoryCreateHandler } from '@budget/category/application/useCase/create/CategoryCreate.handler';
import { TransactionCreateHandler } from '@budget/transaction/application/useCase/create/TransactionCreate.handler';
import { TransactionDeleteHandler } from '@budget/transaction/application/useCase/delete/TransactionDelete.handler';
import { TransactionDeleteBatchHandler } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.handler';
import { TransactionFindOneByIdHandler } from '@budget/transaction/application/useCase/findOne/TransactionFindOneById.handler';
import { TransactionUpdateHandler } from '@budget/transaction/application/useCase/update/TransactionUpdate.handler';

// mongo schemas
import { TransactionSchema } from './transaction/infrastructure/mongo/transaction.schema';
import { CategorySchema } from '@budget/category/infrastructure/mongo/category.schema';
import { MonthlyBudgetSchema } from '@budget/monthlyBudget/infrastructure/mongo/monthlyBudget.schema';
import { SubCategorySchema } from '@budget/subCategory/infrastructure/mongo/subCategory.schema';

// mongo repositories
import { MongoTransactionRepository } from '@budget/transaction/infrastructure/repository/MongoTransaction.repository';
import { MongoCategoryRepository } from '@budget/category/infrastructure/repository/MongoCategory.repository';
import { MongoSubCategoryRepository } from '@budget/subCategory/infrastructure/repository/MongoSubCategory.repository';
import { MongoMonthlyBudgetRepository } from '@budget/monthlyBudget/infrastructure/repository/MongoMonthlyBudget.repository';

// bus
import { EventEmitter2EventBus } from '@shared/infrastructure/bus/event/EventEmitter2EventBus';

// listeners
import { UpdateMonthOnTransactionActivityUpdatedListener } from '@budget/monthlyBudget/application/useCase/spent/UpdateMonthOnTransactionActivityUpdated.listener';
import { UpdateMonthOnTransactionActivityCreatedListener } from '@budget/monthlyBudget/application/useCase/spent/UpdateMonthOnTransactionActivityCreated.listener';

const budget = {
  services: [
    TransactionService,
    CategoryService,
    SubCategoryService,
    MonthlyBudgetService,
    MonthActivityService,
  ],
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
    SubCategoryFindAllByCategoryIdHandler,
    SubCategoryCreateHandler,
    MonthlyBudgetAssignOneHandler,
    MonthlyBudgetFindOneHandler,
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
    {
      name: 'SubCategory',
      schema: SubCategorySchema,
    },
    {
      name: 'MonthlyBudget',
      schema: MonthlyBudgetSchema,
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
    {
      provide: 'SubCategoryRepository',
      useClass: MongoSubCategoryRepository,
    },
    {
      provide: 'MonthlyBudgetRepository',
      useClass: MongoMonthlyBudgetRepository,
    },
  ],
  bus: [
    {
      provide: 'EventBus',
      useClass: EventEmitter2EventBus,
    },
  ],
  listeners: [
    UpdateMonthOnTransactionActivityUpdatedListener,
    UpdateMonthOnTransactionActivityCreatedListener,
  ],
};

export default budget;
