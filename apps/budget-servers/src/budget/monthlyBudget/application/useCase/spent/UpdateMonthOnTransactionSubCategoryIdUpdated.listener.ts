import { Injectable } from '@nestjs/common';
import { MonthActivityService } from '@budget/monthlyBudget/application/service/MonthActivity.service';
import { TransactionDateUpdatedEvent } from '@budget/transaction/domain/event/TransactionDateUpdated.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UpdateMonthOnTransactionSubCategoryIdUpdatedListener {
  constructor(private readonly monthActivityService: MonthActivityService) {}

  @OnEvent(TransactionDateUpdatedEvent.eventName)
  async handleEvent(event: TransactionDateUpdatedEvent) {}
}
