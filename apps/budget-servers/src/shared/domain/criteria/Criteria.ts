import { Filter } from '@shared/domain/criteria/Filter';
import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';
import { FilterById } from '@shared/domain/filter/FilterById';
import { FilterByUser } from '@shared/domain/filter/FilterByUser';

export class Criteria {
  constructor(
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly limit: number,
    public readonly offset: number,
  ) {}

  hasFilter(): boolean {
    return this.filters.filters.length > 0;
  }

  static aggregateOwnershipCriteria(id?: string, userId?: string): Criteria {
    const filterList: Filter[] = [];

    if (id) {
      const byId = FilterById.fromValue(id);
      filterList.push(byId);
    }

    if (userId) {
      const byUserId = FilterByUser.fromValue(userId);
      filterList.push(byUserId);
    }

    const filters = new Filters(filterList);
    return new Criteria(filters, Order.fromValues(), 0, 0);
  }
}
