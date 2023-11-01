import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';

export const FilterByUser = {
    fromValue(value: string): Filter {
        const operator = new FilterOperator(Operator.EQUAL);
        return new Filter('userId', operator, value);
    },
};
