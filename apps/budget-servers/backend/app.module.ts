import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionController } from './controller/transactions/transaction.controller';
import { BudgetModule } from '../src/budget.module';
import { CategoryController } from './controller/category/category.controller';

const controllers = [TransactionController, CategoryController];

const environmentFileName = `.${process.env.NODE_ENV || 'development'}.env`;

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
