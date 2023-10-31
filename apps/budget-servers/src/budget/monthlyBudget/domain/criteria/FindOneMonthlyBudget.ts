import { Filter, FilterOperator, Operator } from '@shared/domain/criteria/Filter';

export const FindOneMonthlyBudget = {
    fromValues(subCategoryId: string, month: string, year: string): Filter[] {
        const operator = new FilterOperator(Operator.EQUAL);
        return [
            new Filter('subCategoryId', operator, subCategoryId),
            new Filter('month', operator, month),
            new Filter('year', operator, year),
        ];
    },
};
