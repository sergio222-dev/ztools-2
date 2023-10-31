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

        if (newAmount.isPositive() && previousAmount.isPositive()) {
            const difference = previousAmount.minus(newAmount);

            if (difference.isPositive()) {
                await this.monthActivityService.decrementActivity(
                    difference,
                    event.previousSubCategoryId,
                    event.previousDate,
                    event.userId,
                );
            } else {
                const positiveDifference = difference.negated();
                await this.monthActivityService.incrementActivity(
                    positiveDifference,
                    event.previousSubCategoryId,
                    event.previousDate,
                    event.userId,
                );
            }
        }

        if (newAmount.isNegative() && previousAmount.isNegative()) {
            const difference = previousAmount.negated().minus(newAmount.negated());

            if (difference.isPositive()) {
                await this.monthActivityService.incrementActivity(
                    difference,
                    event.previousSubCategoryId,
                    event.previousDate,
                    event.userId,
                );
            } else {
                const positiveDifference = difference.negated();
                await this.monthActivityService.decrementActivity(
                    positiveDifference,
                    event.previousSubCategoryId,
                    event.previousDate,
                    event.userId,
                );
            }
        }

        if (newAmount.isNegative() && previousAmount.isPositive()) {
            const difference = previousAmount.plus(newAmount.negated());
            await this.monthActivityService.decrementActivity(
                difference,
                event.previousSubCategoryId,
                event.previousDate,
                event.userId,
            );
        }

        if (newAmount.isPositive() && previousAmount.isNegative()) {
            const difference = previousAmount.negated().plus(newAmount);
            await this.monthActivityService.incrementActivity(
                difference,
                event.previousSubCategoryId,
                event.previousDate,
                event.userId,
            );
        }

        if (event.subCategoryId !== event.previousSubCategoryId && event.date !== event.previousDate) {
            await this.monthActivityService.moveActivity(
                event.previousSubCategoryId,
                event.subCategoryId,
                event.previousDate,
                event.date,
                newAmount,
                event.userId,
            );
            return;
        }

        if (event.subCategoryId !== event.previousSubCategoryId) {
            await this.monthActivityService.moveActivity(
                event.previousSubCategoryId,
                event.subCategoryId,
                event.date,
                event.date,
                newAmount,
                event.userId,
            );
            return;
        }

        if (event.date !== event.previousDate) {
            await this.monthActivityService.moveActivity(
                event.subCategoryId,
                event.subCategoryId,
                event.previousDate,
                event.date,
                newAmount,
                event.userId,
            );
            return;
        }
    }
}
