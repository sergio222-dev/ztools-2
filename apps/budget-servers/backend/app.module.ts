import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionsController } from './controller/transactions/transactions.controller';
import { BudgetModule } from '../src/budget.module';

const controllers = [TransactionsController];

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule, BudgetModule],
  controllers: [...controllers],
})
export class AppModule {}
