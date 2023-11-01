import { Filter } from '@shared/domain/criteria/Filter';

export class Filters {
    constructor(public readonly filters: Filter[]) {}

    static fromValues(filters: Array<Map<string, string>>) {
        return new Filters(filters.map(element => Filter.fromValue(element)));
    }
}
