import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';

import { TransactionAggregate } from '../../../../src/budget/transactions/domain/Transaction.aggregate';

function getSimpleSubject(subject, ignoreKeys) {
  const newSubject = structuredClone(subject);
  for (const k of ignoreKeys) delete newSubject[k];
  return newSubject;
}

const toBeCalledWithAndWithoutKeys: MatcherFunction<[received: any]> = function (
  actual,
  received,
  ignoreKeys: string[] = [],
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const actualMock = actual.mock;

  const lastCall = actualMock.calls[actualMock.calls.length - 1][0];

  const actualWithoutKeys = getSimpleSubject(lastCall, ignoreKeys);
  const receivedWithoutKeys = getSimpleSubject(received, ignoreKeys);

  return JSON.stringify(actualWithoutKeys) === JSON.stringify(receivedWithoutKeys)
    ? {
        message: () => {
          return `Expected: ${this.utils.printReceived(
            actualWithoutKeys,
          )} to be same that: ${this.utils.printExpected(receivedWithoutKeys)}`;
        },
        pass: true,
      }
    : {
        message: (): string => {
          return `Expected: ${this.utils.printReceived(
            actualWithoutKeys,
          )} to be same that: ${this.utils.printExpected(receivedWithoutKeys)}`;
        },
        pass: false,
      };
};

expect.extend({
  toBeCalledWithAndWithoutKeys,
});

declare module 'expect' {
  interface Matchers<R> {
    toBeCalledWithAndWithoutKeys(transaction: TransactionAggregate, ignoreKeys?: string[]): R;
  }
}
