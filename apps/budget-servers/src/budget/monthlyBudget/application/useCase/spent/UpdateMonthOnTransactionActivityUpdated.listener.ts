import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MonthActivityService } from '@budget/monthlyBudget/application/service/MonthActivity.service';
import { SignedAmount } from '@budget/shared/domain/valueObject/SignedAmount';
import { TransactionActivityUpdatedEvent } from '@budget/transaction/domain/event/TransactionActivityUpdated.event';

@Injectable()
export class UpdateMonthOnTransactionActivityUpdatedListener {
  constructor(private readonly monthActivityService: MonthActivityService) {}

  @OnEvent(TransactionActivityUpdatedEvent.eventName)
  async handleEvent(event: TransactionActivityUpdatedEvent) {
    const newAmount = new SignedAmount(event.amount);
    const previousAmount = new SignedAmount(event.previousAmount);
    console.log('event', event);
    console.log('newAmount', newAmount.amount);
    console.log('previousAmount', previousAmount.amount);

    if (newAmount.isPositive() && previousAmount.isPositive()) {
      const difference = previousAmount.minus(newAmount);

      if (difference.isPositive()) {
        await this.monthActivityService.decrementActivity(difference, event.subCategoryId, event.date);
      } else {
        const positiveDifference = difference.negated();
        await this.monthActivityService.incrementActivity(
          positiveDifference,
          event.subCategoryId,
          event.date,
        );
      }
    }

    if (newAmount.isNegative() && previousAmount.isNegative()) {
      const difference = previousAmount.negated().minus(newAmount.negated());

      if (difference.isPositive()) {
        await this.monthActivityService.incrementActivity(difference, event.subCategoryId, event.date);
      } else {
        const positiveDifference = difference.negated();
        await this.monthActivityService.decrementActivity(
          positiveDifference,
          event.subCategoryId,
          event.date,
        );
      }
    }

    if (newAmount.isNegative() && previousAmount.isPositive()) {
      const difference = previousAmount.plus(newAmount.negated());
      await this.monthActivityService.decrementActivity(difference, event.subCategoryId, event.date);
    }

    if (newAmount.isPositive() && previousAmount.isNegative()) {
      const difference = previousAmount.negated().plus(newAmount);
      await this.monthActivityService.incrementActivity(difference, event.subCategoryId, event.date);
    }
  }
}
