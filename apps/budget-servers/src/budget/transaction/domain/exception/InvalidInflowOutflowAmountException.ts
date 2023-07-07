export class InvalidInflowOutflowAmountException extends Error {
  constructor(transactionId?: string) {
    super(
      transactionId
        ? `The transaction with id ${transactionId} has an invalid amount in inflow or outflow`
        : 'Invalid amount',
    );
  }
}
