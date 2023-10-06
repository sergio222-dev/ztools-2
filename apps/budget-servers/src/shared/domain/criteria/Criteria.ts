import { Filters } from '@shared/domain/criteria/Filters';
import { Order } from '@shared/domain/criteria/Order';

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
}
