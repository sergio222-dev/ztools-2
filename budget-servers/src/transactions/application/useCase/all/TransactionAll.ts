import { Transaction } from '../../../domain/Transaction';
import { faker } from '@faker-js/faker';

export class TransactionAll {
  getAll(): Transaction[] {
    const response: Transaction[] = [];

    for (let index = 0; index < 10; index++) {
      response.push(
        Transaction.CREATE(
          faker.datatype.uuid(),
          faker.finance.amount(),
          faker.finance.amount(),
          faker.company.name(),
          '',
          faker.date.recent(),
        ),
      );
    }

    return response;
  }
}
