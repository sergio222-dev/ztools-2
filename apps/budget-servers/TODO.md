## TODO

- [ ] Check if all handlers only handle commands data and not domain entities, sample:
  ```typescript
    // Correct handling of command
    @CommandHandler(TransactionUpdateCommand)
    export class TransactionUpdateHandler implements ICommandHandler<TransactionUpdateCommand> {
        constructor(private readonly transactionService: TransactionService) {}

        async execute(command: TransactionUpdateCommand): Promise<void> {
          const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared } = command;

          await this.transactionService.update(
            id,
            inflow,
            outflow,
            payee,
            memo,
            subCategoryId,
            date,
            cleared,
          );
        }
    }
  
    // Incorrect use of handling of command
    @CommandHandler(TransactionCreateCommand)
    export class TransactionCreateHandler implements ICommandHandler<TransactionCreateCommand> {
        constructor(private transactionService: TransactionService) {}

        async execute(command: TransactionCreateCommand): Promise<void> {
            const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared } = command;
            const inflowMoney = new Money(inflow);
            const outflowMoney = new Money(outflow);

            // @todo move the logic of creating the transaction to the application service
            const transaction = Transaction.CREATE(
              id,
              inflowMoney,
              outflowMoney,
              payee,
              memo,
              subCategoryId,
              new Date(date),
              cleared,
            );
            await this.transactionService.createOne(transaction);
        }
    }
    ```

