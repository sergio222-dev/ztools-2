import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AccountController } from './controller/account/account.controller';
import { CategoryController } from './controller/category/category.controller';
import { SubCategoryController } from './controller/subCategory/subCategory.controller';
import { TransactionController } from './controller/transaction/transaction.controller';
import { BudgetModule } from '../src/budget.module';

const controllers = [TransactionController, CategoryController, SubCategoryController, AccountController];

const environmentFileName = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environmentFileName,
    }),
    CqrsModule,
    BudgetModule,
  ],
  controllers: [...controllers],
})
export class AppModule {}
