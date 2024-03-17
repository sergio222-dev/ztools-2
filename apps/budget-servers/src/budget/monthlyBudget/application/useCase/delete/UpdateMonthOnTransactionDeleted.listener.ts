import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MonthActivityService } from '@budget/monthlyBudget/application/service/MonthActivity.service';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { TransactionDeletedEvent } from '@budget/transaction/domain/event/TransactionDeleted.event';

@Injectable()
export class UpdateMonthOnTransactionDeletedListener {
  constructor(private readonly monthActivityService: MonthActivityService) {}

  @OnEvent(TransactionDeletedEvent.eventName)
  async handleEvent(event: TransactionDeletedEvent) {
    const amount = new SignedAmount(event.amount);

    if (amount.isPositive()) {
      await this.monthActivityService.incrementActivity(
        amount,
        event.subCategoryId,
        event.date,
        event.userId,
      );
    }

    if (amount.isNegative()) {
      await this.monthActivityService.decrementActivity(
        amount.negated(),
        event.subCategoryId,
        event.date,
        event.userId,
      );
    }
  }
}
