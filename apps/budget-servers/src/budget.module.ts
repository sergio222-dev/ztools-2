import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import budget from '@budget/index';
import { Implementation } from '@shared/infrastructure/enum';
import { ImplementationModule } from '@shared/infrastructure/implementation.module';

@Module({
  imports: [ImplementationModule.register(Implementation.mongo), EventEmitterModule.forRoot()],
  providers: [...budget.services, ...budget.handlers, ...budget.bus, ...budget.listeners],
})
export class BudgetModule {}
