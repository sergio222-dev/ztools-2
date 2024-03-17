import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransactionService } from '@budget/transaction/application/services/Transaction.service';
import { TransactionMoveSubCategoryCommand } from '@budget/transaction/application/useCase/update/TransactionMoveSubCategory.command';

@CommandHandler(TransactionMoveSubCategoryCommand)
export class TransactionMoveSubCategoryHandler implements ICommandHandler<TransactionMoveSubCategoryCommand> {
  constructor(private readonly transactionService: TransactionService) {}
  async execute(command: TransactionMoveSubCategoryCommand) {
    await this.transactionService.moveToSubCategory(
      command.oldSubCategoryId,
      command.newSubCategoryId,
      command.userId,
    );
  }
}
