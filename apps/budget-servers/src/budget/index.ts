/* eslint import/order: 0 */
import { SubCategoryUpdateHandler } from '@budget/subCategory/application/useCase/update/SubCategoryUpdate.handler';
// services
import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { MonthlyBudgetService } from '@budget/monthlyBudget/application/service/MonthlyBudget.service';
import { CategoryService } from '@budget/category/application/service/Category.service';
import { SubCategoryService } from '@budget/subCategory/application/service/SubCategory.service';
import { MonthActivityService } from '@budget/monthlyBudget/application/service/MonthActivity.service';
import { AccountService } from '@budget/account/application/service/Account.service';
import { EventRecorderService } from '@shared/domain/bus/EventRecorder.service';

// handlers
import { AccountFindByIdHandler } from '@budget/account/application/useCase/find/AccountFindById.handler';
import { AccountFindOneByIdHandler } from '@budget/account/application/useCase/find/AccountFindOneById.handler';
import { CategoryDeleteHandler } from '@budget/category/application/useCase/delete/CategoryDelete.handler';
import { TransactionFindAllByAccountHandler } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.handler';
import { TransactionFindAllHandler } from './transaction/application/useCase/find/TransactionFindAll.handler';
import { CategoryFindAllHandler } from '@budget/category/application/useCase/find/CategoryFindAll.handler';
import { CategoryUpdateHandler } from '@budget/category/application/useCase/update/CategoryUpdate.handler';
import { CategoryFindOneHandler } from '@budget/category/application/useCase/findOne/CategoryFindOne.handler';
import { SubCategoryCreateHandler } from '@budget/subCategory/application/useCase/create/SubCategoryCreate.handler';
import { SubCategoryFindAllByCategoryIdHandler } from '@budget/subCategory/application/useCase/find/SubCategoryFindAllByCategoryId.handler';
import { MonthlyBudgetAssignOneHandler } from '@budget/monthlyBudget/application/useCase/assign/MonthlyBudgetAssignOne.handler';
import { SubCategoryDeleteHandler } from '@budget/subCategory/application/useCase/delete/SubCategoryDelete.handler';
import { SubCategoryDeleteBatchHandler } from '@budget/subCategory/application/useCase/deleteBatch/SubCategoryDeleteBatch.handler';
import { SubCategoryFindOneByIdHandler } from '@budget/subCategory/application/useCase/find/SubCategoryFindOneById.handler';
import { MonthlyBudgetFindOneHandler } from '@budget/monthlyBudget/application/useCase/find/MonthlyBudgetFindOne.handler';
import { CategoryCreateHandler } from '@budget/category/application/useCase/create/CategoryCreate.handler';
import { TransactionCreateHandler } from '@budget/transaction/application/useCase/create/TransactionCreate.handler';
import { TransactionDeleteHandler } from '@budget/transaction/application/useCase/delete/TransactionDelete.handler';
import { TransactionDeleteBatchHandler } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.handler';
import { TransactionFindOneByIdHandler } from '@budget/transaction/application/useCase/findOne/TransactionFindOneById.handler';
import { TransactionUpdateHandler } from '@budget/transaction/application/useCase/update/TransactionUpdate.handler';
import { AccountCreateHandler } from '@budget/account/application/useCase/create/AccountCreate.handler';
import { AccountDeleteHandler } from '@budget/account/application/useCase/delete/AccountDelete.handler';
import { AccountFindAllHandler } from '@budget/account/application/useCase/find/AccountFindAll.handler';
import { AccountUpdateHandler } from '@budget/account/application/useCase/update/AccountUpdate.handler';
import { TransactionFindAllBySubCategoryIdHandler } from '@budget/transaction/application/useCase/find/TransactionFindAllBySubCategoryId.handler';
import { MonthlyBudgetDeleteAllBySubCategoryIdHandler } from '@budget/monthlyBudget/application/useCase/delete/MonthlyBudgetDeleteAllBySubCategoryId.handler';
import { SubCategoryFindAllHandler } from '@budget/subCategory/application/useCase/find/SubCategoryFindAll.handler';

// mongo schemas
import { TransactionSchema } from './transaction/infrastructure/mongo/transaction.schema';
import { CategorySchema } from '@budget/category/infrastructure/mongo/category.schema';
import { MonthlyBudgetSchema } from '@budget/monthlyBudget/infrastructure/mongo/monthlyBudget.schema';
import { SubCategorySchema } from '@budget/subCategory/infrastructure/mongo/subCategory.schema';
import { AccountSchema } from '@budget/account/infrastructure/mongo/account.schema';
import { EventSchema } from '@shared/infrastructure/bus/event/mongo/event.schema';

// mongo repositories
import { MongoTransactionRepository } from '@budget/transaction/infrastructure/repository/MongoTransaction.repository';
import { MongoCategoryRepository } from '@budget/category/infrastructure/repository/MongoCategory.repository';
import { MongoSubCategoryRepository } from '@budget/subCategory/infrastructure/repository/MongoSubCategory.repository';
import { MongoMonthlyBudgetRepository } from '@budget/monthlyBudget/infrastructure/repository/MongoMonthlyBudget.repository';
import { MongoAccountRepository } from '@budget/account/infrastructure/repository/MongoAccount.repository';
import { MongoEventRepository } from '@shared/infrastructure/bus/MongoEvent.repository';

// bus
import { EventEmitter2EventBus } from '@shared/infrastructure/bus/event/EventEmitter2EventBus';

// listeners
import { UpdateMonthOnTransactionActivityUpdatedListener } from '@budget/monthlyBudget/application/useCase/spent/UpdateMonthOnTransactionActivityUpdated.listener';
import { UpdateMonthOnTransactionActivityCreatedListener } from '@budget/monthlyBudget/application/useCase/spent/UpdateMonthOnTransactionActivityCreated.listener';
import { UpdateMonthOnTransactionDeletedListener } from '@budget/monthlyBudget/application/useCase/delete/UpdateMonthOnTransactionDeleted.listener';
import { RecordOnEventListener } from '@budget/shared/application/bus/RecordOnEvent.listener';

const budget = {
  services: [
    TransactionService,
    CategoryService,
    SubCategoryService,
    MonthlyBudgetService,
    MonthActivityService,
    AccountService,
    EventRecorderService,
  ],
  handlers: [
    TransactionFindAllHandler,
    TransactionCreateHandler,
    TransactionUpdateHandler,
    TransactionFindOneByIdHandler,
    TransactionDeleteHandler,
    TransactionDeleteBatchHandler,
    TransactionFindAllBySubCategoryIdHandler,
    TransactionFindAllByAccountHandler,
    CategoryCreateHandler,
    CategoryFindAllHandler,
    CategoryUpdateHandler,
    CategoryFindOneHandler,
    CategoryDeleteHandler,
    SubCategoryFindAllByCategoryIdHandler,
    SubCategoryCreateHandler,
    MonthlyBudgetAssignOneHandler,
    MonthlyBudgetFindOneHandler,
    MonthlyBudgetDeleteAllBySubCategoryIdHandler,
    SubCategoryFindAllHandler,
    SubCategoryFindOneByIdHandler,
    SubCategoryUpdateHandler,
    SubCategoryDeleteHandler,
    SubCategoryDeleteBatchHandler,
    AccountCreateHandler,
    AccountFindAllHandler,
    AccountUpdateHandler,
    AccountDeleteHandler,
    AccountFindByIdHandler,
    AccountFindOneByIdHandler,
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
    {
      name: 'Account',
      schema: AccountSchema,
    },
    {
      name: 'Event',
      schema: EventSchema,
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
    {
      provide: 'AccountRepository',
      useClass: MongoAccountRepository,
    },
    {
      provide: 'EventRepository',
      useClass: MongoEventRepository,
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
    UpdateMonthOnTransactionDeletedListener,
    RecordOnEventListener,
  ],
};

export default budget;
