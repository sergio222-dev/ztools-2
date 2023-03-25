import { Module } from '@nestjs/common';
import { ImplementationModule } from './shared/infrastructure/implementation.module';
import { Implementation } from './shared/infrastructure/enum';
import { TransactionAll } from '@budget/transactions/application/useCase/find/TransactionAll';
import { TransactionFindAllHandler } from '@budget/transactions/application/useCase/find/TransactionFindAll.handler';

const services = [TransactionAll];

const handlers = [TransactionFindAllHandler];

@Module({
  imports: [ImplementationModule.register(Implementation.mongo)],
  providers: [...services, ...handlers],
})
export class BudgetModule {}
