import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import budget from '@budget/index';
import { Implementation } from '@shared/infrastructure/enum';
import { ImplementationModule } from '@shared/infrastructure/implementation.module';
import { initializeAmountType } from '@shared/infrastructure/mongo/plugins';

@Module({
  imports: [
    CqrsModule,
    ImplementationModule.register(Implementation.mongo),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  providers: [...budget.services, ...budget.handlers, ...budget.bus, ...budget.listeners],
})
export class BudgetModule {}
