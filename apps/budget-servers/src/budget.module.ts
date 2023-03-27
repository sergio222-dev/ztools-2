import { Module } from '@nestjs/common';
import { ImplementationModule } from './shared/infrastructure/implementation.module';
import { Implementation } from './shared/infrastructure/enum';
import budget from '@budget/index';

@Module({
  imports: [ImplementationModule.register(Implementation.mongo)],
  providers: [...budget.services, ...budget.handlers],
})
export class BudgetModule {}
