import { ValueObject } from '@shared/domain/valueObject/ValueObject';
import { dateToUtc } from '../../../../backend/utils/dates';

export class DateValueObject extends ValueObject<Date> {
  constructor(date: Date) {
    super(dateToUtc(date));
  }
}
