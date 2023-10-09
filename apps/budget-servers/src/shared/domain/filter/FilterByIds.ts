import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';

export const FilterByIds = {
  fromValue(value: string[]): Filter {
    const operator = new FilterOperator(Operator.IN);
    return new Filter('_id', operator, value);
  },
};
