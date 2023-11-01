export enum Operator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GT = '>',
    LT = '<',
    CONTAINS = 'CONTAINS',
    NOT_CONTAINS = 'NOT_CONTAINS',
    IN = 'IN',
}

export class FilterOperator {
    constructor(public readonly value: Operator) {}

    static fromValue(value: string): FilterOperator {
        for (const operator of Object.values(Operator)) {
            if (operator === value) {
                return new FilterOperator(operator);
            }
        }

        throw new Error('Invalid operator');
    }

    public isPositive(): boolean {
        return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
    }
}

export class Filter {
    constructor(
        public readonly field: string,
        public readonly operator: FilterOperator,
        public readonly value: string | string[],
    ) {}

    static fromValue(values: Map<string, string>) {
        const field = values.get('field');
        const operator = values.get('operator');
        const value = values.get('value');

        if (!field || !operator || !value) {
            throw new Error('Invalid filter');
        }

        return new Filter(field, FilterOperator.fromValue(operator), value);
    }
}
