import { convertToSimple } from './convertToSimple';

export abstract class MongoRepository {
  convertToSimple<T>(value: T): T {
    return convertToSimple<T>(value);
  }
}
