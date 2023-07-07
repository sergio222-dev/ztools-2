import { mock, MockProxy } from 'jest-mock-extended';

export abstract class UnitTestCase {
  protected mock<T>(): MockProxy<T> & T {
    return mock<T>();
  }
}
